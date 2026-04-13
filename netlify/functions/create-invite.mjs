import { getStore } from "@netlify/blobs";

export default async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "POST only" }), { status: 405, headers: { "Content-Type": "application/json" } });
  }

  try {
    const { name, date, time, ort, tel, motto, foto } = await req.json();

    if (!name || !date || !time || !ort || !tel) {
      return new Response(JSON.stringify({ error: "Alle Felder ausfuellen" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    const VALID_MOTTOS = ["piraten", "dino", "safari", "weltraum", "detektiv", "superheld", "prinzessin", "einhorn", "meerjungfrau", "feuerwehr"];
    const safeMotto = VALID_MOTTOS.includes(motto) ? motto : "piraten";

    // Kurze ID generieren (8 Zeichen)
    const id = Array.from(crypto.getRandomValues(new Uint8Array(6)))
      .map(b => b.toString(36).padStart(2, '0').slice(-1))
      .join('') + Math.random().toString(36).slice(2, 4);

    // Name fuer lesbaren Slug
    const clean = name.toLowerCase()
      .replace(/[äÄ]/g, "ae").replace(/[öÖ]/g, "oe").replace(/[üÜ]/g, "ue").replace(/[ß]/g, "ss")
      .replace(/[^a-z0-9]/g, "");
    const slug = clean + "-" + id;

    // Daten in Netlify Blobs speichern
    const store = getStore("invites");
    const payload = { name, date, time, ort, tel, motto: safeMotto };
    if (foto && typeof foto === "string" && foto.length < 6000) {
      payload.foto = foto;
    }
    await store.set(slug, JSON.stringify(payload));

    return new Response(JSON.stringify({ slug, url: "/e/" + slug }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};
