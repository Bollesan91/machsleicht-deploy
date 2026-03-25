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
    if (store) {
      try {
        const existing = await store.get(key);
        if (existing) hits = JSON.parse(existing);
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
