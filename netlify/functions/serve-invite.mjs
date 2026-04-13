import { getStore } from "@netlify/blobs";

export default async (req) => {
  const url = new URL(req.url);
  const slug = url.pathname.replace(/^\/e\//, "").replace(/\/$/, "");

  if (!slug) {
    return new Response("Einladung nicht gefunden", { status: 404 });
  }

  try {
    // Versuch 1: Aus Netlify Blobs lesen (neue kurze Slugs)
    const store = getStore("invites");
    const stored = await store.get(slug);
    
    let data;
    if (stored) {
      data = JSON.parse(stored);
    } else {
      // Fallback: Alte base64url-Slugs (Rueckwaertskompatibilitaet)
      const dashIdx = slug.indexOf("-");
      if (dashIdx === -1) {
        return new Response("Einladung nicht gefunden", { status: 404 });
      }
      const encoded = slug.substring(dashIdx + 1);
      try {
        data = JSON.parse(Buffer.from(encoded, "base64url").toString("utf-8"));
      } catch {
        return new Response("Einladung nicht gefunden", { status: 404 });
      }
    }

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

    // Foto durchreichen (aus Blob oder Query-Param fuer alte Links)
    const foto = data.foto || url.searchParams.get("foto");
    if (foto) {
      params.set("foto", foto);
    }

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
