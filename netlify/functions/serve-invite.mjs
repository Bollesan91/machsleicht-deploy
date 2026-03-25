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

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/einladung/?" + params.toString()
      }
    });
  } catch (err) {
    return new Response("Einladung nicht gefunden", { status: 404 });
  }
};
