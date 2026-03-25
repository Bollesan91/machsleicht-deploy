import { getStore } from "@netlify/blobs";

export default async (req) => {
  const url = new URL(req.url);
  const slug = url.pathname.replace(/^\/e\//, "").replace(/\/$/, "");

  if (!slug) {
    return new Response("Einladung nicht gefunden", { status: 404 });
  }

  try {
    const store = getStore("einladungen");
    const data = await store.get(slug, { type: "json" });

    if (!data) {
      return new Response("Einladung nicht gefunden", { status: 404 });
    }

    // Redirect zur Einladung mit URL-Parametern
    const params = new URLSearchParams({
      name: data.name,
      date: data.date,
      time: data.time,
      ort: data.ort,
      tel: data.tel
    });

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/einladung/?" + params.toString()
      }
    });
  } catch (err) {
    return new Response("Fehler: " + err.message, { status: 500 });
  }
};
