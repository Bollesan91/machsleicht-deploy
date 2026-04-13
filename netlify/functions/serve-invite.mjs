export default async (req) => {
  const url = new URL(req.url);
  const slug = url.pathname.replace(/^\/e\//, "").replace(/\/$/, "");

  if (!slug) {
    return new Response("Einladung nicht gefunden", { status: 404 });
  }

  try {
    // Slug format: name-base64payload
    const dashIdx = slug.indexOf("-");
    if (dashIdx === -1) {
      return new Response("Einladung nicht gefunden", { status: 404 });
    }

    const encoded = slug.substring(dashIdx + 1);
    const data = JSON.parse(Buffer.from(encoded, "base64url").toString("utf-8"));

    if (!data.name || !data.date || !data.time || !data.ort || !data.tel) {
      return new Response("Ungueltige Einladung", { status: 400 });
    }

    // Redirect zur Einladung mit URL-Parametern
    const params = new URLSearchParams({
      name: data.name,
      date: data.date,
      time: data.time,
      ort: data.ort,
      tel: data.tel
    });

    // Foto-Thumbnail kommt als Query-Param, nicht im Slug
    const fotoParam = url.searchParams.get("foto");
    if (fotoParam) {
      params.set("foto", fotoParam);
    }

    // Motto-basierter Redirect (piraten = /einladung/, rest = /einladung/{motto}/)
    const VALID_MOTTOS = ["piraten", "dino", "safari", "weltraum", "detektiv", "superheld", "prinzessin", "einhorn", "meerjungfrau", "feuerwehr"];
    const motto = data.motto && VALID_MOTTOS.includes(data.motto) ? data.motto : "piraten";
    const basePath = motto === "piraten" ? "/einladung/" : `/einladung/${motto}/`;

    return new Response(null, {
      status: 302,
      headers: {
        Location: basePath + "?" + params.toString()
      }
    });
  } catch (err) {
    return new Response("Einladung nicht gefunden", { status: 404 });
  }
};
