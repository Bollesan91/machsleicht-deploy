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

    // H-1(b): dieselbe Familienunterscheidung wie im Worker (party-worker.js:1877 ff.).
    // core (spiele/core/core.js) formatiert ein ISO-Datum selbst; die Legacy-Apps unter
    // /einladung/<motto>/whatsapp/ drucken den Parameter ROH und brauchen fertigen deutschen
    // Text. Bis heute ging der Freitext aus dem Formular unveraendert an beide.
    // Nicht-ISO wird unveraendert durchgereicht: alte Kurzlinks tragen noch Freitext, und
    // core druckt ihn seit 02.09. roh, statt einen Wochentag daraus zu rechnen.
    // Eigene Monats-/Wochentagsnamen statt toLocaleDateString: eine Netlify-Function ohne
    // vollstaendiges ICU faellt sonst stumm auf Englisch zurueck.
    // MAJOR aus dem Gutachten 03.09.: eine Regex prueft die FORM, nicht die GUELTIGKEIT.
    // "2026-02-29" besteht sie, V8 rollt still auf den 1. Maerz, isNaN ist FALSE — und die
    // WhatsApp-Zusage der Gaeste nennt dann einen Tag, an dem keine Party ist. Derselbe
    // Rueckrundungsvergleich wie in party-worker.js:336 (validDate, Fall "J9").
    const _istEchterTag = (s) => {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(s || "")) return false;
      const t = new Date(s + "T00:00:00Z");
      return !isNaN(t.getTime()) && t.toISOString().slice(0, 10) === s;
    };
    if (_istEchterTag(data.date) && !basePath.startsWith("/spiele/")) {
      const TAGE = ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];
      const MONATE = ["Januar","Februar","März","April","Mai","Juni","Juli","August",
                      "September","Oktober","November","Dezember"];
      const d = new Date(data.date + "T12:00:00Z");
      if (!isNaN(d)) {
        params.set("date", `${TAGE[d.getUTCDay()]}, ${d.getUTCDate()}. ${MONATE[d.getUTCMonth()]} ${d.getUTCFullYear()}`);
      }
    }

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
