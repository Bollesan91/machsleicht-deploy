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
    if (store) {
      try {
        const existing = await store.get(key);
        if (existing) events = JSON.parse(existing);
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
