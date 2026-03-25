// Lemon Squeezy Webhook Handler
// Empfängt Zahlungsbestätigungen und speichert sie in Netlify Blobs
//
// Setup:
// 1. In Lemon Squeezy → Settings → Webhooks → Neuen Webhook erstellen
// 2. URL: https://machsleicht.de/api/ls-webhook
// 3. Events: order_created
// 4. Signing Secret eintragen (LS_WEBHOOK_SECRET)
// 5. In Netlify → Site Settings → Environment Variables:
//    - LS_WEBHOOK_SECRET = dein Webhook Signing Secret

import crypto from "crypto";

export default async (request, context) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const body = await request.text();

    // Verify webhook signature
    const secret = Netlify.env.get("LS_WEBHOOK_SECRET");
    if (secret) {
      const signature = request.headers.get("x-signature");
      if (signature) {
        const hmac = crypto.createHmac("sha256", secret);
        hmac.update(body);
        const digest = hmac.digest("hex");
        if (digest !== signature) {
          console.error("Invalid webhook signature");
          return new Response("Invalid signature", { status: 403 });
        }
      }
    }

    const payload = JSON.parse(body);
    const eventName = payload.meta?.event_name;

    if (eventName === "order_created") {
      const order = payload.data;
      const attrs = order.attributes;
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

      // Store in Netlify Blobs
      const store = context.blobs;
      const dateKey = new Date().toISOString().slice(0, 10);
      const key = `orders-${dateKey}`;

      let existing = [];
      try {
        const prev = await store.get(key);
        if (prev) existing = JSON.parse(prev);
      } catch (e) {}

      existing.push(record);
      await store.set(key, JSON.stringify(existing));

      console.log(`Order stored: ${record.orderId} - ${record.productName} - ${record.email}`);

      // Track as event too
      try {
        const eventKey = `events-${dateKey}`;
        let events = [];
        try {
          const prev = await store.get(eventKey);
          if (prev) events = JSON.parse(prev);
        } catch (e) {}
        events.push({
          p: "/kindergeburtstag",
          e: "purchase_completed",
          d: { tier: record.variantName, motto: record.motto, total: record.total },
          t: Date.now(),
        });
        await store.set(eventKey, JSON.stringify(events));
      } catch (e) {}
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Webhook error:", err);
    return new Response(JSON.stringify({ error: "Processing failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const config = { path: "/api/ls-webhook" };
