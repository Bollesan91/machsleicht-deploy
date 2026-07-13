export default async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "POST only" }), { status: 405, headers: { "Content-Type": "application/json" } });
  }

  try {
    const { name, date, time, ort, tel, motto, foto, game } = await req.json();

    if (!name || !date || !time || !ort || !tel) {
      return new Response(JSON.stringify({ error: "Alle Felder ausfuellen" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    const VALID_MOTTOS = ["piraten", "dino", "safari", "weltraum", "detektiv", "superheld", "prinzessin", "einhorn", "meerjungfrau", "feuerwehr", "baustelle", "dschungel", "feen", "pferde", "ritter"];
    const safeMotto = VALID_MOTTOS.includes(motto) ? motto : "piraten";

    // M7: Laengen begrenzen — sonst sprengt die base64-URL die WhatsApp-/Browser-Limits (~2000 Z.) und der Link bricht still.
    const nm = String(name).slice(0, 40), or = String(ort).slice(0, 80), te = String(tel).slice(0, 30);

    // Spiel-Wahl (erweitert 2026-07-13): Kurz-Slug je Motto (Datei /spiele/game-<slug>-<motto>.html).
    // Default (Klassiker) traegt KEINEN Key -> bestehende und Standard-Links bleiben kurz & unveraendert.
    const GAME_WL = {"piraten":["kanone","flaschenpost","memory","schatzjagd"],"dino":["ei","faehrte","fossil","schatzjagd"],"safari":["fotosafari","jeep","spuren","schatzjagd"],"weltraum":["funk","rakete","sternbild","schatzjagd"],"detektiv":["akte","fingerabdruck","wimmel","schatzjagd"],"superheld":["signal","stadt","strahl","schatzjagd"],"prinzessin":["tatort","tresor","uvschrift","schatzjagd"],"einhorn":["regenbogen","sternenstaub","turm","schatzjagd"],"meerjungfrau":["korallen","perlen","schatz","schatzjagd"],"feuerwehr":["drehleiter","loeschen","notruf","schatzjagd"],"baustelle":["bagger","hochhaus","rohre","schatzjagd"],"dschungel":["lianen","wildnis","schatzjagd"],"feen":["gluehwuermchen","laterne","taunetz","schatzjagd"],"pferde":["huerden","hufeisen","striegeln","schatzjagd"],"ritter":["katapult","schwert","schatzjagd"]};
    const safeGame = (GAME_WL[safeMotto] || []).includes(game) ? game : null;

    // Kompakte Keys fuer kurze URLs
    const payload = { n: nm, d: date, t: time, o: or, p: te, m: safeMotto };
    if (safeGame) payload.g = safeGame;
    const data = JSON.stringify(payload);
    const encoded = Buffer.from(data).toString("base64url");

    const clean = nm.toLowerCase()
      .replace(/[äÄ]/g, "ae").replace(/[öÖ]/g, "oe").replace(/[üÜ]/g, "ue").replace(/[ß]/g, "ss")
      .replace(/[^a-z0-9]/g, "");
    const slug = clean + "-" + encoded;

    // Foto separat zurueckgeben (Client haengt es als ?f= an)
    const result = { slug, url: "/e/" + slug };
    if (foto && typeof foto === "string") {
      if (foto.length < 6000) result.foto = foto;
      else result.fotoDropped = true; // M7: Client kann warnen statt stillem Foto-Verlust
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    // Keine err.message an den Client (Info-Leak) — generische Meldung, Details nur im Log.
    console.error("create-invite error:", err);
    return new Response(JSON.stringify({ error: "Einladung konnte nicht erstellt werden" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};
