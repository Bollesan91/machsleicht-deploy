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
      motto: raw.m || raw.motto,
      game:  raw.g || raw.game
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

    // Foto: neue Links nutzen ?fid (kurze ID -> server-seitig im Worker-KV gespeichert).
    // Aeltere Links/Payloads nutzen base64 direkt (?f / ?foto / raw.foto) -> backward-compat.
    const fid = url.searchParams.get("fid");
    if (fid && /^[a-z0-9]{1,16}$/.test(fid)) {
      params.set("foto", "https://party.machsleicht.de/api/invimg/" + fid);
    } else {
      const foto = url.searchParams.get("f") || url.searchParams.get("foto") || raw.foto;
      if (foto) {
        params.set("foto", foto);
      }
    }

    const VALID_MOTTOS = ["piraten", "dino", "safari", "weltraum", "detektiv", "superheld", "prinzessin", "einhorn", "meerjungfrau", "feuerwehr", "baustelle", "dschungel", "feen", "pferde", "ritter"];
    const motto = data.motto && VALID_MOTTOS.includes(data.motto) ? data.motto : "piraten";
    // SEO-Refactor P6-1 (komplett seit 10.06.2026): Gast-App liegt bei allen Mottos
    // unter /whatsapp/, /einladung/<motto>/ ist der SEO-Hub.
    // Spiel-Wahl (erweitert 2026-07-13): Kurz-Slug je Motto, Whitelist-gebunden -> /spiele/game-<slug>-<motto>.html.
    // "schatzjagd" passt ins selbe Muster (rueckwaerts-kompatibel); unbekannt/leer -> Klassiker.
    const GAME_WL = {"piraten":["kanone","flaschenpost","memory","schatzjagd"],"dino":["ei","faehrte","fossil","schatzjagd"],"safari":["fotosafari","jeep","spuren","schatzjagd"],"weltraum":["funk","rakete","sternbild","schatzjagd"],"detektiv":["akte","fingerabdruck","wimmel","schatzjagd"],"superheld":["signal","stadt","strahl","schatzjagd"],"prinzessin":["tatort","tresor","uvschrift","schatzjagd"],"einhorn":["regenbogen","sternenstaub","turm","schatzjagd"],"meerjungfrau":["korallen","perlen","schatz","schatzjagd"],"feuerwehr":["drehleiter","loeschen","notruf","schatzjagd"],"baustelle":["bagger","hochhaus","rohre","schatzjagd"],"dschungel":["lianen","wildnis","puzzle","schatzjagd"],"feen":["gluehwuermchen","laterne","taunetz","schatzjagd"],"pferde":["huerden","hufeisen","striegeln","schatzjagd"],"ritter":["katapult","schwert","wappen","schatzjagd"]};
    const basePath = (data.game && (GAME_WL[motto] || []).includes(data.game))
      ? `/spiele/game-${data.game}-${motto}.html`
      : `/einladung/${motto}/whatsapp/`;

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
