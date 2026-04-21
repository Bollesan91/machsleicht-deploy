export default async (req) => {
  const url = new URL(req.url);
  const slug = url.pathname.replace(/^\/e\//, "").replace(/\/$/, "");

  if (!slug) {
    return new Response("Einladung nicht gefunden", { status: 404 });
  }

  try {
    const dashIdx = slug.indexOf("-");
    if (dashIdx === -1) {
      return new Response("Einladung nicht gefunden", { status: 404 });
    }

    const encoded = slug.substring(dashIdx + 1);
    const raw = JSON.parse(Buffer.from(encoded, "base64url").toString("utf-8"));

    // Kompakte Keys (n,d,t,o,p,m) oder alte Keys (name,date,time,ort,tel,motto)
    const data = {
      name: raw.n || raw.name,
      date: raw.d || raw.date,
      time: raw.t || raw.time,
      ort:  raw.o || raw.ort,
      tel:  raw.p || raw.tel,
      motto: raw.m || raw.motto
    };

    if (!data.name || !data.date || !data.time || !data.ort || !data.tel) {
      return new Response("Ungueltige Einladung", { status: 400 });
    }

    const params = new URLSearchParams({
      name: data.name,
      date: data.date,
      time: data.time,
      ort: data.ort,
      tel: data.tel
    });

    // Foto: aus Query-Param (neue Links) oder aus altem Slug-Payload
    const foto = url.searchParams.get("f") || url.searchParams.get("foto") || raw.foto;
    if (foto) {
      params.set("foto", foto);
    }

    const VALID_MOTTOS = ["piraten", "dino", "safari", "weltraum", "detektiv", "superheld", "prinzessin", "einhorn", "meerjungfrau", "feuerwehr"];
    const motto = data.motto && VALID_MOTTOS.includes(data.motto) ? data.motto : "piraten";
    // Einheitliches URL-Schema: /einladung/<motto>/ fuer alle Mottos (inkl. Piraten).
    // Piraten-Sonderfall entfaellt seit Migration nach /einladung/piraten/.
    const basePath = `/einladung/${motto}/`;

    return new Response(null, {
      status: 302,
      headers: {
        Location: basePath + "?" + par