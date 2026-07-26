// machsleicht Analytics Dashboard
// Zugriff: https://machsleicht.de/api/dashboard?key=<DASHBOARD_KEY>&days=7
//
// SICHERHEIT (26.07.2026): Der Schluessel stand hier als Literal im Code.
// Diese Datei liegt im Publish-Root und wurde als
// /netlify/functions/dashboard.js mit HTTP 200 statisch ausgeliefert —
// der Schluessel war also woertlich im Netz lesbar, zusaetzlich ueber das
// oeffentliche GitHub-Repo. Jeder Abruf mit dem Schluessel oeffnet das
// komplette Analytics-Dashboard.
// Jetzt: Schluessel kommt aus der Umgebung (Netlify-Env-Var DASHBOARD_KEY).
// Fehlt die Variable, wird NICHT auf einen Default zurueckgefallen, sondern
// der Endpunkt komplett geschlossen — ein Default waere derselbe Fehler nochmal.
// Der alte Schluessel ist als kompromittiert zu behandeln und darf nicht
// wiederverwendet werden.

export default async (request, context) => {
  const url = new URL(request.url);
  const key = url.searchParams.get("key");
  const days = parseInt(url.searchParams.get("days") || "7", 10);

  const expected = (typeof Netlify !== "undefined" && Netlify.env)
    ? Netlify.env.get("DASHBOARD_KEY")
    : (typeof process !== "undefined" && process.env ? process.env.DASHBOARD_KEY : undefined);

  if (!expected) {
    return new Response("Dashboard disabled: DASHBOARD_KEY not configured", { status: 503 });
  }

  // Laengenpruefung vorab, damit der Vergleich unten nicht ueber die Laenge verraet.
  const a = new TextEncoder().encode(String(key || ""));
  const b = new TextEncoder().encode(String(expected));
  let same = a.length === b.length;
  // Konstantzeit-Vergleich: immer ueber die volle Laenge von b iterieren,
  // damit die Antwortzeit nicht von der Zahl uebereinstimmender Zeichen abhaengt.
  let diff = 0;
  for (let i = 0; i < b.length; i++) diff |= (a[i] === undefined ? 256 : a[i]) ^ b[i];
  if (!same || diff !== 0) {
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
