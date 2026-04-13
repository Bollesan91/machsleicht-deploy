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

    // Kompakte Keys fuer kurze URLs
    const payload = { n: name, d: date, t: time, o: ort, p: tel, m: safeMotto };
    const data = JSON.stringify(payload);
    const encoded = Buffer.from(data).toString("base64url");

    const clean = name.toLowerCase()
      .replace(/[äÄ]/g, "ae").replace(/[öÖ]/g, "oe").replace(/[üÜ]/g, "ue").replace(/[ß]/g, "ss")
      .replace(/[^a-z0-9]/g, "");
    const slug = clean + "-" + encoded;

    // Foto separat zurueckgeben (Client haengt es als ?f= an)
    const result = { slug, url: "/e/" + slug };
    if (foto && typeof foto === "string" && foto.length < 6000) {
      result.foto = foto;
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};
