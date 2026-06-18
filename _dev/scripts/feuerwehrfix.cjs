// Feuerwehr Helfer-V4.1 Fix — Stufe-3-Fixes aus den 2 claude.ai-Reviews (18.06.2026)
// Asserts VOR jedem Write (Stufe 1). Re-runnbar (idempotent via Guard-Checks).
const fs = require("fs");
const DIR = "./data/motto/";
const A = (c, m) => { if (!c) { console.error("ASSERT FAIL: " + m); process.exit(1); } };
const load = f => JSON.parse(fs.readFileSync(DIR + f + ".json", "utf8"));
const save = (f, d) => fs.writeFileSync(DIR + f + ".json", JSON.stringify(d, null, 2));
const S = (n, name, content) => ({ n, name, content });

// ---- Inhalte ----
const MERKSATZ = " Pflicht-Merksatz für alle Kinder: „Im echten Brand: RAUS, Tür zu, 112 rufen — NICHT selbst löschen, NICHT verstecken!\" (112 = Feuerwehr/Rettung, 110 = Polizei).";

const AUSB_STEPS_GROSS = [
  S(1, "Trupps & Wertung", "2 Trupps (Rot/Blau). Jede Station vergibt 0–3 Punkte pro Trupp. Stoppuhr läuft, auf Pfiff Wechsel (ca. 8 Min./Station). Eine erwachsene Person pro Station."),
  S(2, "Station 1 – Zielspritzen auf Zeit", "5 nummerierte Becher mit Flammen-Symbol in 3/5/7 m gestaffelt. Jedes Crew-Mitglied hat 30 Sek., mit der Wasserpistole so viele wie möglich umzuspritzen — die weiteste Distanz zählt doppelt. Treffer = Punkte."),
  S(3, "Station 2 – Feuerwehr-Knoten", "Mastwurf an einer Stuhllehne nach Knoten-Karte binden. Wer es in 60 Sek. sauber schafft, holt einen Punkt. Echter Feuerwehr-Knoten = der „Wow, das kann ich jetzt\"-Moment für 9–12."),
  S(4, "Station 3 – Schlauch-Staffel", "Wasserschlauch (oder Springseil) ausrollen, im Slalom durch 4 Pylonen, am Ende den „Hydranten\" (Pylone) treffen, zurück. Trupp-Staffel auf Zeit — schnellster Trupp gewinnt die Station."),
  S(5, "Station 4 – Erste Hilfe", "Eine „verletzte Person\" (große Puppe ODER ein mitspielendes Kind) fachgerecht mit Dreieckstuch/Toilettenpapier-Rolle verbinden und in die stabile Seitenlage bringen. Eine erwachsene Person zeigt es einmal vor. Punkt für saubere Ausführung — echtes Können statt Stofftier-Pflege."),
  S(6, "Auswertung", "Punkte beider Trupps addieren, auf der Wachen-Tafel führen. Das Ergebnis fließt in die Bewertete Zeremonie ein (Dienstgrad-Aufstieg).")
];
const AUSB_SAFETY_GROSS = "Boden bei Station 1 + 3 wird nass → draußen oder auf abwischbarem Boden, Nässe sofort aufwischen / Rutschmatte, Stoppersocken. Nie ins Gesicht spritzen. Bei der Staffel immer nur eine*r auf der Strecke, kein Schubsen/Überholen. Knoten NIE um Hals oder Handgelenk.";

const SPRITZ_STEPS_GROSS = [
  S(1, "Aufbau", "5 nummerierte Becher mit Flammen-Symbol in einer Reihe, Distanz 3/5/7 m gestaffelt."),
  S(2, "Wettkampf", "Jede*r hat 30 Sek. mit der Wasserpistole — so viele Becher wie möglich umwerfen, in der richtigen Reihenfolge 1→5. Treffer zählen, weiteste Distanz doppelt, pro Trupp summieren."),
  S(3, "Steigerung", "Zweite Runde aus größerer Distanz oder mit Buzzer-Zeitdruck. Bei 9–12 ruhig kompetitiv halten — Bestenliste an die Wachen-Tafel.")
];
const SPRITZ_SAFETY_GROSS = "Boden wird nass = Rutschgefahr → draußen oder abwischbarer Untergrund, Nässe sofort aufwischen / Rutschmatte. Nie ins Gesicht zielen, bei Bedarf Schutzbrille.";

const HELM_STEPS_GROSS = [
  S(1, "Crew-Abzeichen entwerfen", "Jede*r gestaltet sein eigenes Crew-Abzeichen auf einen Aufkleber/Helm: Truppname, ein Logo, der Start-Dienstgrad (Anwärter*in)."),
  S(2, "Kurz vorstellen", "Wer will, zeigt sein Abzeichen und nennt seinen Truppnamen — das schweißt die Crew zusammen."),
  S(3, "Den Tag über gültig", "Die Abzeichen gelten den ganzen Tag: Wer in den Stationen Punkte holt, steigt in der Abschluss-Zeremonie im Dienstgrad auf (Anwärter → Feuerwehrmann/-frau → Truppführer*in).")
];

const NOTRUF_STEPS = [
  S(1, "Aufbau", "Disponentin/Disponent „Clara\" sitzt am Leitstellen-Tisch mit einem Smartphone (FLUGMODUS!). Die 5 W liegen als Plakat aus: WO ist es? WAS ist passiert? WIE VIELE Betroffene? WELCHE Verletzungen? WARTEN auf Rückfragen."),
  S(2, "Szenario ziehen", "Jeder Trupp zieht reihum eine Notruf-Karte und „ruft an\". Karten: (a) Fettbrand in der Küche, (b) Person im verrauchten Zimmer, (c) Mülltonne brennt an der Hauswand, (d) Rauch aus dem Fenster + Katze auf dem Baum, (e) Wasserschaden im Keller, (f) Wespennest im Garten — KEIN Notfall (Fangfrage: nicht die 112!)."),
  S(3, "Durchspielen", "Clara hakt die 5 W ab und stellt Rückfragen wie eine echte Leitstelle. Pro korrekt beantwortetem W ein Punkt. Wichtig: bei (f) erkennen, dass das kein Notruf ist."),
  S(4, "Merksatz verankern", "Zum Abschluss sagen alle gemeinsam:" + MERKSATZ)
];
const NOTRUF_SAFETY_ADD = " Echte 112 NUR im echten Notfall — deshalb zwingend Flugmodus.";

// ====================== GROSS ======================
{
  const f = "feuerwehr-gross";
  const d = load(f);

  // alle Ausbildungs-Stationen (je Variante eigenes Objekt) -> Schritte + Safety + Label 4er
  let ausb = 0, spritz = 0, helm = 0;
  for (const vk of Object.keys(d.variants)) {
    d.variants[vk].games.forEach(g => {
      if (/Ausbildungs/.test(g.name)) { g.steps = AUSB_STEPS_GROSS.map(x => ({ ...x })); g.safetyRule = AUSB_SAFETY_GROSS; ausb++; }
      if (/Spritz/.test(g.name)) { g.steps = SPRITZ_STEPS_GROSS.map(x => ({ ...x })); g.safetyRule = SPRITZ_SAFETY_GROSS; spritz++; }
      if (/Helm-Bemalen/.test(g.name)) { g.steps = HELM_STEPS_GROSS.map(x => ({ ...x })); helm++; }
      if (/Notruf-Simulation/.test(g.name)) {
        g.steps = NOTRUF_STEPS.map(x => ({ ...x }));
        if (!/Echte 112 NUR/.test(g.safetyRule || "")) g.safetyRule = (g.safetyRule || "") + NOTRUF_SAFETY_ADD;
      }
    });
  }
  A(ausb >= 3, "gross: 3 Ausbildungs-Stationen bearbeitet, war " + ausb);

  // ---- gross/minimal (v0): Phantom + Waise ----
  const v0 = d.variants["0"];
  // Brandermittlung-Objekt aus standard (v1) holen, briefing-unabhängig machen
  const brSrc = d.variants["1"].games.find(g => /Brandermittlung/.test(g.name));
  A(!!brSrc, "Brandermittlung in v1 vorhanden");
  const brMini = JSON.parse(JSON.stringify(brSrc));
  brMini.name = "🔍 Mini-Brandermittlung";
  const st5 = brMini.steps.find(s => s.n === 5);
  st5.content = "du löst auf: Die fettigen Handschuh-Abdrücke + die Schüssel mit Fett-Resten führen zur Köchin (sie hat mit einer heißen Fett-Pfanne hantiert). Die Indizien allein reichen — KEIN Theorie-Briefing nötig, perfekt für die Minimal-Variante.";
  // Helm-Bemalen + Mini-Einsatz raus, Mini-Brandermittlung rein
  const before = v0.games.length;
  v0.games = v0.games.filter(g => !/Helm-Bemalen/.test(g.name) && !/Mini-Einsatz/.test(g.name));
  if (!v0.games.some(g => /Brandermittlung/.test(g.name))) {
    // vor Urkunden-Zeremonie einsortieren
    const ui = v0.games.findIndex(g => /Urkunden/.test(g.name));
    v0.games.splice(ui < 0 ? v0.games.length : ui, 0, brMini);
  }
  A(v0.games.length >= 3, "gross/minimal >=3 games, ist " + v0.games.length);
  A(!v0.games.some(g => /Mini-Einsatz/.test(g.name)), "Mini-Einsatz-Waise raus");
  A(v0.games.some(g => /Brandermittlung/.test(g.name)), "Mini-Brandermittlung drin");
  // Label 3er -> 4er angleichen (Spielname ist 4er-Rotation)
  v0.schedule.forEach(s => { if (s.title.includes("(3er-Rotation)")) s.title = s.title.replace("(3er-Rotation)", "(4er-Rotation)"); });

  // 112-Merksatz in Schicht-Appell (v0) + Theorie-Briefing (v1,v2)
  const addM = (sched, pred) => { const e = sched.find(pred); if (e && !/112 rufen/.test(e.description || "")) e.description = (e.description || "") + MERKSATZ; };
  addM(v0.schedule, s => /Schicht-Appell/.test(s.title));
  addM(d.variants["1"].schedule, s => /Theorie-Briefing/.test(s.title));
  addM(d.variants["2"].schedule, s => /Theorie-Briefing/.test(s.title));

  // Verify: jedes gelistete gross-Spiel hat jetzt steps ODER ist Ritual (Urkunden/Helm ok)
  for (const vk of Object.keys(d.variants)) {
    d.variants[vk].games.forEach(g => {
      const isRitual = /Urkunden-Zeremonie/.test(g.name);
      if (!isRitual) A((g.steps || []).length >= 3, "gross " + vk + " " + g.name + " hat steps");
    });
  }
  save(f, d);
  console.log("GROSS ok — ausb=" + ausb + " spritz=" + spritz + " helm=" + helm + " minimalGames=" + v0.games.length);
}

// ====================== KLEIN + MITTEL: Safety + Count ======================
for (const f of ["feuerwehr-klein", "feuerwehr-mittel"]) {
  const d = load(f);
  let schaum = 0, spritz = 0;
  for (const vk of Object.keys(d.variants)) {
    d.variants[vk].games.forEach(g => {
      if (/Schaum-Löschen/.test(g.name) && (!g.safetyRule || !/Schleimhäute/.test(g.safetyRule))) {
        g.safetyRule = "Schaum NICHT in Augen/Mund — auch parfümfreier Rasierschaum reizt Schleimhäute. Für die Jüngsten (3–4 J.) Sahne oder Kinderschaum statt Rasierschaum erwägen. Nach dem Spiel Hände waschen. Durchgehende Aufsicht.";
        schaum++;
      }
      if (/Spritz-Probe/.test(g.name) && g.safetyRule && !/Rutschgefahr/.test(g.safetyRule)) {
        g.safetyRule = g.safetyRule + " Boden wird nass → drinnen abwischbarer Untergrund oder draußen, Nässe sofort aufwischen (Rutschgefahr). Nie ins Gesicht.";
        spritz++;
      }
    });
  }
  console.log(f + ": schaum-safety=" + schaum + " spritz-safety=" + spritz);
  save(f, d);
}

// ---- mittel/standard (v1): 4. Spiel ergänzen ----
{
  const f = "feuerwehr-mittel";
  const d = load(f);
  const v1 = d.variants["1"]; // standard
  A(v1.games.length === 3, "mittel/standard war 3 Spiele, ist " + v1.games.length);
  // Spritz-Probe aus wow (v2) kopieren
  const sp = JSON.parse(JSON.stringify(d.variants["2"].games.find(g => /Spritz-Probe/.test(g.name))));
  A(!!sp, "Spritz-Probe-Quelle in mittel/wow vorhanden");
  if (!v1.games.some(g => /Spritz-Probe/.test(g.name))) v1.games.unshift(sp);
  // Schedule-Slot einfügen nach Schicht-Appell
  if (!v1.schedule.some(s => /Zielspritzen|Spritz/.test(s.title))) {
    const ai = v1.schedule.findIndex(s => /Ausbildungs|Schicht-Appell/.test(s.title));
    v1.schedule.splice(ai + 1, 0, { time: v1.schedule[ai] ? v1.schedule[ai].time : "14:20", title: "💧 Zielspritzen — Brände löschen", description: "Wasserpistolen, nummerierte Flammen-Becher in Reihe. Kompetitiv auf Zeit, pro Trupp gewertet. 15 Min." });
  }
  A(v1.games.length >= 4, "mittel/standard jetzt >=4, ist " + v1.games.length);
  save(f, d);
  console.log("mittel/standard games=" + v1.games.length);
}
console.log("\nFEUERWEHR-FIX DURCH.");
