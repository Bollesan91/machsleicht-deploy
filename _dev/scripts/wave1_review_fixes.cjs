// Fixes aus dem Wave-1 Stufe-2-Review der prepText->steps-Konvertierung
const fs = require("fs");
const A = (c, m) => { if (!c) { console.error("ASSERT FAIL: " + m); process.exit(1); } };
const load = f => JSON.parse(fs.readFileSync("./data/motto/" + f + ".json", "utf8"));
const save = (f, d) => fs.writeFileSync("./data/motto/" + f + ".json", JSON.stringify(d, null, 2));

// pro Spiel: setStep(stepName-regex -> neuer content) + optional setSafety + optional insertStep
const setStepContent = (g, reName, content) => { const s = (g.steps || []).find(x => reName.test(x.name || "")); if (s) { s.content = content; return true; } return false; };

function patchMotto(motto, patchers) {
  let hits = 0;
  for (const age of ["klein", "mittel", "gross"]) {
    const f = motto + "-" + age; const d = load(f); let ch = false;
    for (const vk of Object.keys(d.variants || {})) for (const g of d.variants[vk].games || []) {
      const p = patchers.find(p => p.re.test(g.name));
      if (!p || !(g.steps && g.steps.length)) continue;
      if (p.fn(g)) { hits++; ch = true; }
    }
    if (ch) save(f, d);
  }
  return hits;
}

// ---------- FEUERWEHR ----------
const fHits = patchMotto("feuerwehr", [
  { re: /Schaum-Löschen/, fn: g => {
    let ok = setStepContent(g, /Aufbau/, "Für die Jüngsten (3–4 J.) Sahne oder speziellen Kinderschaum nehmen (NICHT Rasierschaum). Spielzeug-Tiere in die leere Wanne legen, Schaum/Sahne großzügig drüber. Alte Tischdecke unterlegen.");
    g.safetyRule = "Für 3–4-Jährige Sahne oder Kinderschaum statt Rasierschaum (Default!) — Hände wandern bei den Kleinen oft in Mund/Augen. Rasierschaum nur bei Älteren mit strikter Aufsicht. NICHT in Augen/Mund (reizt Schleimhäute). Nach dem Spiel Hände waschen. Durchgehende Aufsicht.";
    return ok;
  }},
  { re: /Spritz-Probe/, fn: g => {
    const a = setStepContent(g, /Löschen/, "Ziel: gemeinsam ALLE Flammen-Becher „löschen\" (nass spritzen). Wenn alle Becher nass sind, hat die ganze Crew zusammen gewonnen — kein Einzel-Wettbewerb.");
    const b = setStepContent(g, /neuen Versuch|Weiter/, "Wer einen Becher umwirft, stellt ihn wieder hin und spritzt weiter, bis alle „gelöscht\" sind.");
    return a || b;
  }},
  { re: /Bewertete Zeremonie/, fn: g => {
    const a = setStepContent(g, /Einzeln aufrufen/, "Vorbereitung: Trag vor der Zeremonie auf jedes Diplom ein Stichwort, was das Kind heute gemacht hat. Beim Aufrufen liest du es einfach ab — kein freies Improvisieren aus dem Gedächtnis.");
    const b = setStepContent(g, /Überreichen/, "Diplom übergeben, alle applaudieren. JEDES Kind wird gleichwertig gewürdigt — es geht nicht um den Besten, sondern darum, dass jede*r seinen Beitrag genannt bekommt.");
    return a || b;
  }}
]);

// ---------- EINHORN ----------
const eHits = patchMotto("einhorn", [
  { re: /Regenbogen-Milch-Experiment/, fn: g =>
    setStepContent(g, /Aufbau/, "Vollmilch (3,5 % Fett, Zimmertemperatur) in einen flachen Teller gießen, bis der Boden komplett bedeckt ist. WICHTIG: mit fettarmer Milch funktioniert der Effekt nicht. Schürze/alte Kleidung — Lebensmittelfarbe färbt.")
  },
  { re: /Einhorn-Seife gießen/, fn: g => {
    const a = setStepContent(g, /Schmelzen/, "Pro Kind einen Würfel in den Mikrowellen-Becher. In 15-Sekunden-Intervallen schmelzen (NICHT 30 Sek. am Stück — überhitzt je nach Watt), bis flüssig. Nur Erwachsene handhaben den heißen Becher (~60 °C).");
    const b = setStepContent(g, /Gestalten/, "Das Kind wählt eine Farbe (2 Tropfen), streut Glitzer dazu und rührt kurz um. Dann gießt eine ERWACHSENE PERSON die heiße Masse in das Silikon-Förmchen — das Kind gießt NICHT selbst.");
    return a && b;
  }},
  { re: /Schmuck-Workshop/, fn: g => {
    // Abläng-Schritt vorne ergänzen (falls noch nicht da)
    if (!g.steps.some(s => /Vorbereitung/.test(s.name || ""))) {
      g.steps.unshift({ name: "Vorbereitung (Erwachsene)", content: "Pro Kind ein Stück Elastikband ablängen (Schere nur durch Erwachsene) und ein Ende mit Klebeband am Tisch fixieren." });
    }
    const b = setStepContent(g, /Abschluss/, "Doppelknoten ans Ende, ein Tropfen Bastelkleber (KEIN Sekundenkleber!) drauf — hält. Selbstläufer-Spiel: 40 Min. ruhiges Basteln.");
    g.safetyRule = (g.safetyRule || "") + " Nur Bastelkleber/Klebepunkte verwenden, KEIN Sekundenkleber (Hautverklebungs-Risiko bei Kindern).";
    return b;
  }}
]);

console.log("Feuerwehr-Patches:", fHits, "| Einhorn-Patches:", eHits);

// Verify Seife: kein "Kind ... gießt" mehr, Erwachsene gießt
for (const age of ["klein", "mittel", "gross"]) { const d = load("einhorn-" + age); for (const vk of Object.keys(d.variants || {})) for (const g of d.variants[vk].games || []) if (/Einhorn-Seife/.test(g.name)) { const txt = JSON.stringify(g.steps); A(/ERWACHSENE PERSON die heiße Masse/.test(txt), "Seife: Erwachsene gießt"); A(!/Kind .{0,20}gießt in sein/.test(txt), "Seife: kein Kind-gießt mehr"); } }
A(fHits >= 3 && eHits >= 3, "alle 6 Spiele gepatcht (f=" + fHits + " e=" + eHits + ")");
console.log("✅ Wave-1-Review-Fixes durch + verifiziert.");
