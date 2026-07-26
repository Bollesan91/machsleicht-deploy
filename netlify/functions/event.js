// machsleicht Analytics - Event Tracker (DSGVO-konform, keine Cookies)
// Events: motto_selected, alter_set, theme_selected, plan_generated,
//         whatsapp_share, affiliate_click, cta_schatzsuche, cta_kindergeburtstag,
//         cta_ratgeber, scroll_depth

export default async (request, context) => {
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
    const { p, e, d, t } = body; // path, event, data, timestamp

    const store = context.blobs ? await context.blobs("analytics") : null;

    const today = new Date().toISOString().slice(0, 10);
    const key = `events-${today}`;

    let events = [];
    let isNewDay = true;
    if (store) {
      try {
        const existing = await store.get(key);
        if (existing) { events = JSON.parse(existing); isNewDay = false; }
      } catch (ex) {}
    }

    // Speicherbegrenzung analog hit.js (Art. 5 Abs. 1 lit. e DSGVO, in der
    // Datenschutzerklaerung §12 zugesagt): Event-Daten aelter als 365 Tage
    // loeschen. Vorher wuchsen die Blobs unbegrenzt. Nur beim ersten Event
    // eines Tages, vollstaendig gekapselt — schlaegt es fehl, wird der
    // Event trotzdem normal gespeichert.
    if (store && isNewDay) {
      try {
        if (typeof store.list === "function" && typeof store.delete === "function") {
          const cutoff = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
            .toISOString().slice(0, 10);
          const listed = await store.list({ prefix: "events-" });
          const blobs = (listed && listed.blobs) || [];
          for (const b of blobs) {
            const name = b && b.key;
            const m = typeof name === "string" && name.match(/^events-(\d{4}-\d{2}-\d{2})$/);
            if (m && m[1] < cutoff) {
              await store.delete(name);
            }
          }
        }
      } catch (ex) {}
    }

    events.push({
      p: p || "/",
      e: e || "unknown",
      d: d || {},
      t: t || Date.now(),
    });

    if (store) {
      await store.set(key, JSON.stringify(events));
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...headers, "Content-Type": "application/json" },
    });
  } catch (ex) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...headers, "Content-Type": "application/json" },
    });
  }
};

export const config = {
  path: "/api/event",
};
