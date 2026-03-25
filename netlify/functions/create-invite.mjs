import { getStore } from "@netlify/blobs";

export default async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "POST only" }), { status: 405 });
  }

  try {
    const { name, date, time, ort, tel } = await req.json();

    if (!name || !date || !time || !ort || !tel) {
      return new Response(JSON.stringify({ error: "Alle Felder ausfuellen" }), { status: 400 });
    }

    // Slug generieren: name + random 4 chars
    const clean = name.toLowerCase()
      .replace(/[äÄ]/g, "ae").replace(/[öÖ]/g, "oe").replace(/[üÜ]/g, "ue").replace(/[ß]/g, "ss")
      .replace(/[^a-z0-9]/g, "");
    const rand = Math.random().toString(36).slice(2, 6);
    const slug = clean + rand;

    const store = getStore("einladungen");
    await store.setJSON(slug, { name, date, time, ort, tel, created: new Date().toISOString() });

    return new Response(JSON.stringify({ slug, url: "/e/" + slug }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
