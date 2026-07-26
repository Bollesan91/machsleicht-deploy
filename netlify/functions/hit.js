// machsleicht Analytics - Pageview Tracker (DSGVO-konform, keine Cookies)
// Speichert Pageviews in Netlify Blobs

export default async (request, context) => {
  // CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "https://machsleicht.de",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (request.method === "OPTIONS") {
    return new Response("", { status: 204, headers });
  }

  try {
    const body = await request.json();
    const { p, r, w } = body; // path, referrer, screen width

    // Blob Store für Pageviews
    const store = context.blobs ? await context.blobs("analytics") : null;

    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const key = `hits-${today}`;

    let hits = [];
    let isNewDay = true;
    if (store) {
      try {
        const existing = await store.get(key);
        if (existing) { hits = JSON.parse(existing); isNewDay = false; }
      } catch (e) {}
    }

    // Speicherbegrenzung (Art. 5 Abs. 1 lit. e DSGVO): Zaehldaten aelter als
    // 365 Tage loeschen. ACHTUNG: greift nur, wenn der Blob-Store ueberhaupt
    // erreichbar ist — `context.blobs` existiert in der Netlify-API NICHT
    // (verifiziert: /api/dashboard antwortet {"error":"No blob store"}),
    // und @netlify/blobs ist nicht als Dependency deklariert. Diese Funktion
    // speichert derzeit also gar nichts. Die Datenschutzerklaerung beschreibt
    // deshalb bewusst KEINE eigene Reichweitenmessung. Wer den Tracker in
    // Betrieb nehmen will, muss auf `import { getStore } from "@netlify/blobs"`
    // umbauen UND die Dependency ergaenzen — und danach die DSE nachziehen.
    // Vorher gab es KEINE Loeschlogik — die Blobs wuchsen unbegrenzt.
    // Laeuft nur beim ersten Treffer eines Tages, nicht bei jedem Aufruf,
    // und ist vollstaendig gekapselt: schlaegt das Aufraeumen fehl, wird der
    // Zaehlvorgang trotzdem normal zu Ende gefuehrt.
    if (store && isNewDay) {
      try {
        if (typeof store.list === "function" && typeof store.delete === "function") {
          const cutoff = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
            .toISOString().slice(0, 10);
          const listed = await store.list({ prefix: "hits-" });
          const blobs = (listed && listed.blobs) || [];
          for (const b of blobs) {
            const name = b && b.key;
            // Datumsteil aus "hits-YYYY-MM-DD" per Muster ziehen statt per
            // Zeichenposition — sonst bricht das Aufraeumen still, sobald
            // jemand das Schluesselschema aendert. String-Vergleich genuegt,
            // weil ISO-Datumsstrings lexikografisch chronologisch sortieren.
            const m = typeof name === "string" && name.match(/^hits-(\d{4}-\d{2}-\d{2})$/);
            if (m && m[1] < cutoff) {
              await store.delete(name);
            }
          }
        }
      } catch (e) {}
    }

    hits.push({
      p: p || "/",
      r: r || "",
      w: w || 0,
      t: Date.now(),
    });

    if (store) {
      await store.set(key, JSON.stringify(hits));
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...headers, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...headers, "Content-Type": "application/json" },
    });
  }
};

export const config = {
  path: "/api/hit",
};
