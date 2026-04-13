export default async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "POST only" }), { status: 405, headers: { "Content-Type": "application/json" } });
  }

  try {
    const { name, date, time, ort, tel, motto, foto } = await req.json();

    if (!name || !date || !time || !ort || !tel) {
      return new Response(JSON.stringify({ error: "Alle Felder ausfuellen" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    // Erlaubte Mottos (Default: piraten fuer Rueckwaertskompatibilitaet)
    const VALID_MOTTOS = ["piraten", "dino", "safari", "weltraum", "detektiv", "superheld", "prinzessin", "einhorn", "meerjungfrau", "feuerwehr"];
    const safeMotto = VALID_MOTTOS.includes(motto) ? motto : "piraten";

    // Daten als Base64 in die URL kodieren (kein Storage noetig)
    // Foto wird NICHT im Slug gespeichert (zu lang fuer Netlify-Routing)
    const payload = { name, date, time, ort, tel, motto: safeMotto };
    const data = JSON.stringify(payload);
    const encoded = Buffer.from(data).toString("base64url");

    // Slug: kurzer Name + encoded payload
    const clean = name.toLowerCase()
      .replace(/[äÄ]/g, "ae").replace(/[öÖ]/g, "oe").replace(/[üÜ]/g, "ue").replace(/[ß]/g, "ss")
      .replace(/[^a-z0-9]/g, "");
    const slug = clean + "-" + encoded;

    // Foto als separaten Wert zurueckgeben (Client haengt es als ?foto= an)
    const result = { slug, url: "/e/" + slug };
    if (foto && typeof foto === "string" && foto.length < 4000) {
      result.fotoParam = foto;
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};
