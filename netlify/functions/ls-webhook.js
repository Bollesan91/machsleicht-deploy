// Lemon Squeezy Webhook Handler
// Empfaengt Zahlungsbestaetigungen und protokolliert sie.
//
// Setup:
// 1. In Lemon Squeezy -> Settings -> Webhooks -> Neuen Webhook erstellen
// 2. URL: https://machsleicht.de/api/ls-webhook
// 3. Events: order_created
// 4. Signing Secret eintragen (LS_WEBHOOK_SECRET)
// 5. In Netlify -> Site Settings -> Environment Variables:
//    - LS_WEBHOOK_SECRET = dein Webhook Signing Secret
//
// REPARATUR 06.09.2026 — zwei Fehler, die zusammengehoerten:
//
// (1) Die Funktion schrieb in `context.blobs`. Diese Eigenschaft gibt es in der
//     Netlify-Functions-API NICHT (das Paket `@netlify/blobs` steht auch in keiner
//     package.json). `store.get(...)` lief also auf `undefined` und warf, der aeussere
//     catch machte daraus 500 — bei JEDEM `order_created`. Lemon Squeezy wertet das
//     als Fehlzustellung und wiederholt sie. Die Zahlung selbst lief durch, verloren
//     ging der lokale Bestellsatz. Kurios: `hit.js:37` kommentiert diese Nichtexistenz
//     selbst und ruft sie trotzdem auf.
//
// (2) Die Signaturpruefung war ueberspringbar. `if (secret)` und `if (signature)`
//     hiessen: fehlt das Secret ODER der Header, wird NICHT geprueft und der Rumpf
//     trotzdem verarbeitet. Solange (1) alles in einen 500 laufen liess, war das
//     folgenlos. Wer nur (1) repariert, macht aus einem kaputten Endpunkt einen
//     OFFENEN — jeder koennte dann gefaelschte Bestellungen einwerfen. Deshalb
//     gehoeren beide Fixes in denselben Commit.
//
// Verhalten jetzt: fail-closed. Ohne konfiguriertes Secret oder ohne gueltige
// Signatur wird nichts verarbeitet. Nach bestandener Pruefung wird die Bestellung
// als eine JSON-Zeile ins Function-Log geschrieben (in den Netlify-Logs greppbar)
// und mit 200 quittiert — ein Speicherproblem darf NIE einen Retry ausloesen,
// sonst wiederholt Lemon Squeezy dieselbe Bestellung endlos.

import crypto from "crypto";

/** Zeitkonstanter Vergleich. Der alte `digest !== signature` war ein normaler
 *  String-Vergleich und verriet ueber die Laufzeit, wie weit ein geratenes
 *  Praefix stimmte. `timingSafeEqual` wirft bei ungleicher Laenge, deshalb der
 *  Laengen-Check davor. */
function signaturGueltig(erwartet, empfangen) {
  if (typeof empfangen !== "string" || empfangen.length !== erwartet.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(erwartet, "utf8"), Buffer.from(empfangen, "utf8"));
  } catch {
    return false;
  }
}

export default async (request) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const body = await request.text();

  // --- Signatur: ohne bestandene Pruefung wird nichts gelesen und nichts geglaubt.
  const secret = Netlify.env.get("LS_WEBHOOK_SECRET");
  if (!secret) {
    // Fehlkonfiguration, kein Angriff. 500 ist hier richtig: Lemon Squeezy zeigt die
    // Fehlzustellung an, statt dass wir ungeprueft Bestellungen annehmen.
    console.error("ls-webhook: LS_WEBHOOK_SECRET ist nicht gesetzt — Anfrage nicht verifizierbar, abgelehnt.");
    return new Response(JSON.stringify({ error: "Webhook not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const signature = request.headers.get("x-signature");
  const digest = crypto.createHmac("sha256", secret).update(body).digest("hex");
  if (!signaturGueltig(digest, signature)) {
    console.error("ls-webhook: ungueltige oder fehlende Signatur — abgelehnt.");
    return new Response(JSON.stringify({ error: "Invalid signature" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  // --- Ab hier ist der Rumpf echt. Fehler duerfen jetzt keinen Retry mehr ausloesen.
  let payload;
  try {
    payload = JSON.parse(body);
  } catch {
    console.error("ls-webhook: Rumpf ist kein gueltiges JSON.");
    return new Response(JSON.stringify({ error: "Malformed payload" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    if (payload.meta?.event_name === "order_created") {
      const order = payload.data || {};
      const attrs = order.attributes || {};
      const custom = payload.meta?.custom_data || {};

      const record = {
        orderId: order.id,
        email: attrs.user_email,
        total: attrs.total_formatted,
        currency: attrs.currency,
        status: attrs.status,
        productName: attrs.first_order_item?.product_name || "unknown",
        variantName: attrs.first_order_item?.variant_name || "unknown",
        motto: custom.motto || null,
        mode: custom.mode || null,
        source: custom.source || null,
        createdAt: attrs.created_at,
        receivedAt: new Date().toISOString(),
      };

      // Eine Zeile, maschinell lesbar: in den Netlify-Function-Logs nach
      // "ls-order" filtern, dann ist jede Bestellung als JSON da.
      console.log("ls-order " + JSON.stringify(record));
    }
  } catch (err) {
    // Bewusst verschluckt: die Signatur stimmte, also HABEN wir das Ereignis
    // angenommen. Ein 500 wuerde Lemon Squeezy zum Wiederholen bringen und
    // dieselbe Bestellung mehrfach zustellen.
    console.error("ls-webhook: Verarbeitung fehlgeschlagen, Ereignis trotzdem quittiert:", err);
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const config = { path: "/api/ls-webhook" };
