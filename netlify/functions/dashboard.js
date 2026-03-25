// machsleicht Analytics Dashboard
// Zugriff: https://machsleicht.de/api/dashboard?key=ml2026stats&days=7

const DASHBOARD_KEY = "ml2026stats";

export default async (request, context) => {
  const url = new URL(request.url);
  const key = url.searchParams.get("key");
  const days = parseInt(url.searchParams.get("days") || "7", 10);

  if (key !== DASHBOARD_KEY) {
    return new Response("Unauthorized", { status: 401 });
  }

  const store = context.blobs ? await context.blobs("analytics") : null;
  if (!store) {
    return new Response(JSON.stringify({ error: "No blob store" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const results = { hits: {}, events: {}, summary: {} };

  for (let i = 0; i < days; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);

    // Hits
    try {
      const hitsRaw = await store.get(`hits-${dateStr}`);
      if (hitsRaw) {
        const hits = JSON.parse(hitsRaw);
        results.hits[dateStr] = {
          total: hits.length,
          pages: {},
        };
        hits.forEach((h) => {
          results.hits[dateStr].pages[h.p] =
            (results.hits[dateStr].pages[h.p] || 0) + 1;
        });
      }
    } catch (e) {}

    // Events
    try {
      const eventsRaw = await store.get(`events-${dateStr}`);
      if (eventsRaw) {
        const events = JSON.parse(eventsRaw);
        results.events[dateStr] = {
          total: events.length,
          byType: {},
        };
        events.forEach((ev) => {
          results.events[dateStr].byType[ev.e] =
            (results.events[dateStr].byType[ev.e] || 0) + 1;
        });
      }
    } catch (e) {}
  }

  // Summary
  let totalHits = 0;
  let totalEvents = 0;
  const allPages = {};
  const allEventTypes = {};

  Object.values(results.hits).forEach((day) => {
    totalHits += day.total;
    Object.entries(day.pages).forEach(([p, c]) => {
      allPages[p] = (allPages[p] || 0) + c;
    });
  });

  Object.values(results.events).forEach((day) => {
    totalEvents += day.total;
    Object.entries(day.byType).forEach(([e, c]) => {
      allEventTypes[e] = (allEventTypes[e] || 0) + c;
    });
  });

  results.summary = {
    days,
    totalHits,
    totalEvents,
    topPages: Object.entries(allPages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20),
    eventBreakdown: Object.entries(allEventTypes)
      .sort((a, b) => b[1] - a[1]),
  };

  return new Response(JSON.stringify(results, null, 2), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const config = {
  path: "/api/dashboard",
};
