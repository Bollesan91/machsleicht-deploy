// #34 Wave 2: prepText -> steps fuer feen (10 Spiele). Format {n,name,content}.
const fs = require("fs");
const A = (c, m) => { if (!c) { console.error("ASSERT FAIL: " + m); process.exit(1); } };
const load = f => JSON.parse(fs.readFileSync("./data/motto/" + f + ".json", "utf8"));
const save = (f, d) => fs.writeFileSync("./data/motto/" + f + ".json", JSON.stringify(d, null, 2));
const S = (n, name, content) => ({ n, name, content });

// FARN-Quest-Schritte aus einer Variante holen, die sie schon hat
let questSteps = null;
for (const age of ["klein", "mittel", "gross"]) { const d = load("feen-" + age); for (const vk of Object.keys(d.variants||{})) for (const g of d.variants[vk].games||[]) if (/Codeknacker FARN/.test(g.name) && g.steps && g.steps.length) questSteps = JSON.parse(JSON.stringify(g.steps)); }
A(questSteps, "FARN-Quest-Schritte gefunden");

const T = [
  { re: /Schmetterlinge fangen/, steps: [
    S(1, "Aufbau", "Tüllbälle (oder Krepppapier-Schmetterlinge, min. 5 cm) durch den Raum werfen oder auf Stühle/Boden verteilen."),
    S(2, "Fangen", "Die Kinder „fliegen\" wie Feen durch den Raum und heben die Schmetterlinge auf."),
    S(3, "Sammeln", "Jeder gefangene Schmetterling kommt in den Blütenkorb."),
    S(4, "Gemeinsam", "Kein Punktezählen — alle helfen mit, bis alle Schmetterlinge im Korb sind.")
  ]},
  { re: /Magische Steine bemalen/, steps: [
    S(1, "Vorbereitung", "Steine waschen, trocknen und auf Zeitungspapier verteilen."),
    S(2, "Verteilen", "Jedes Kind bekommt 2–3 handtellergroße Steine und Stifte."),
    S(3, "Bemalen", "Punkte, Blüten, Smileys oder den Anfangsbuchstaben des Blütennamens aufmalen."),
    S(4, "Magischer Funke", "Optional einen Glitzer-Aufkleber als „magischen Funken\" draufkleben."),
    S(5, "Trocknen", "Steine 5 Min. an der Luft trocknen lassen.")
  ]},
  { re: /Glitzer-Staub-Suche/, steps: [
    S(1, "Aufbau", "Reis mit essbarem Glitzer in die Wanne füllen, Schmetterlinge und Marienkäfer (min. 4 cm) darin vergraben."),
    S(2, "Graben", "Jedes Kind bekommt einen Löffel und gräbt vorsichtig im Glitzer-Staub."),
    S(3, "Finden & behalten", "Wer einen Schmetterling findet, darf ihn behalten — er landet später in der Mitgebsel-Tüte.")
  ]},
  { re: /Blumenkranz-Werkstatt/, steps: [
    S(1, "Vorbereitung (Erwachsene)", "Stirnband-Streifen zuschneiden, Klett oder Tacker bereitlegen, Filz-Blüten (min. 3 cm) ausstanzen."),
    S(2, "Bekleben", "Jedes Kind klebt 6–8 Blüten auf seinen Streifen."),
    S(3, "Zusammenfügen", "Eine erwachsene Person tackert den Streifen am Ende zum Kranz zusammen."),
    S(4, "Krönung", "Aufsetzen: „Du bist eine Blüten-Königin / ein Wald-Wächter mit Blüten-Krone!\"")
  ]},
  { re: /Feentanz mit Schleier/, steps: [
    S(1, "Tanzen", "Musik an → die Kinder schwingen ihre Schleier und tanzen wie Feen und Schmetterlinge."),
    S(2, "Einfrieren", "Musik aus → einfrieren wie ein Schmetterling, der auf einer Blüte sitzt."),
    S(3, "Belohnen", "Wer sich noch bewegt, bekommt einen Blüten-Sticker auf den Schleier — Belohnung, kein Ausscheiden.")
  ]},
  { re: /Feenflügel-Stäbchen basteln/, steps: [
    S(1, "Vorbereitung (Erwachsene)", "Tüll-Schmetterlinge in Schleifenform mit Draht in der Mitte binden, Drahtenden umbiegen (Stichgefahr!), Doppelklebeband-Streifen am Stab vorbereiten."),
    S(2, "Schmetterling ankleben", "Die Kinder ziehen das Doppelklebeband ab und kleben den Schmetterling auf den Stab."),
    S(3, "Bänder knoten", "Bunte Bänder an den Stab knoten (eine erwachsene Person hilft)."),
    S(4, "Verzieren", "Glitzer-Aufkleber draufkleben — fertig ist das Feenflügel-Stäbchen.")
  ]},
  { re: /Schmetterling-Bestimmungs-Quiz/, steps: [
    S(1, "Erklär-Runde", "Die Bildkarten der Reihe nach zeigen und kurz erklären."),
    S(2, "Quiz-Runde", "Dieselben Karten erneut zeigen, jetzt mit Punkten abfragen."),
    S(3, "Bonus-Runde", "Lebensweise: Welcher Schmetterling überwintert? Welcher fliegt nachts? Welcher trinkt Brennnessel-Saft?")
  ]},
  { re: /Blumenkranz binden|Eichenlaub-Armband/, steps: [
    S(1, "Zwei Gruppen", "Feen-Gruppe bindet Kränze, Wächter-Gruppe flicht Armbänder."),
    S(2, "Feen-Kranz", "3 Pfeifenputzer zu einem Ring formen, Stoffblüten daran festwickeln."),
    S(3, "Wächter-Armband", "Eine Kordel als Basis nehmen, Eichenlaub und kleine Eicheln einflechten."),
    S(4, "Mitgeben", "Beide Bastel-Geschenke gehen als Mitgebsel mit nach Hause (für Mama oder Geschwister).")
  ]},
  { re: /Codeknacker FARN/, steps: questSteps }   // aus Schwester-Variante
];

let filled = 0;
for (const age of ["klein", "mittel", "gross"]) {
  const f = "feen-" + age; const d = load(f); let ch = false;
  for (const vk of Object.keys(d.variants||{})) for (const g of d.variants[vk].games||[]) {
    if (g.steps && g.steps.length) continue;
    const hit = T.find(t => t.re.test(g.name));
    if (!hit) continue;
    g.steps = JSON.parse(JSON.stringify(hit.steps)); filled++; ch = true;
  }
  if (ch) save(f, d);
}
console.log("feen steps gefuellt:", filled);
let rest = 0;
for (const age of ["klein", "mittel", "gross"]) { const d = load("feen-" + age); for (const vk of Object.keys(d.variants||{})) for (const g of d.variants[vk].games||[]) if (!(g.steps && g.steps.length) && g.prepText) { console.log("REST:", age, g.name); rest++; } }
A(rest === 0, "0 prepText-only in feen verbleibend");
console.log("✅ feen komplett auf steps.");
