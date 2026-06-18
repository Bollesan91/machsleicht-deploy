// Fixes aus dem feen Stufe-2-Review (#6 war False Positive: Quest hat real 5 Stationen)
const fs = require("fs");
const A = (c, m) => { if (!c) { console.error("ASSERT FAIL: " + m); process.exit(1); } };
const load = f => JSON.parse(fs.readFileSync("./data/motto/" + f + ".json", "utf8"));
const save = (f, d) => fs.writeFileSync("./data/motto/" + f + ".json", JSON.stringify(d, null, 2));
const setStep = (g, re, content) => { const s = (g.steps || []).find(x => re.test(x.name || "")); if (s) { s.content = content; return true; } return false; };

let n = { glitzer: 0, fluegel: 0, steine: 0, kranz: 0 };
for (const age of ["klein", "mittel", "gross"]) {
  const f = "feen-" + age; const d = load(f); let ch = false;
  for (const vk of Object.keys(d.variants || {})) for (const g of d.variants[vk].games || []) {
    if (!(g.steps && g.steps.length)) continue;

    // #3 MAJOR Glitzer-Staub: Figuren 4->6 cm (Verschluck-Zylinder ~3,2x5,7) + Safety
    if (/Glitzer-Staub-Suche/.test(g.name)) {
      if (setStep(g, /Aufbau/, "Reis mit essbarem Glitzer in die Wanne füllen, Schmetterlinge und Marienkäfer darin vergraben — bei 3-Jährigen NUR Figuren ab 6 cm (kleinere sind Verschluck-Teile und wandern als Mitgebsel in Kinderhände).")) n.glitzer++;
      g.safetyRule = "Reis-Wanne nur unter Sichtaufsicht. Für 3-Jährige: NUR essbaren Glitzer (kein Bastel-Glitzer — Atemweg/Augen). Figuren min. 6 cm (4 cm passt durch den Verschluck-Prüfzylinder). Kinder nicht alleine graben lassen. Reis nicht in die Augen — bei Augenkontakt mit Wasser spülen, ggf. Augenarzt.";
    }

    // #5 MAJOR Feenfluegel: Draht -> Pfeifenputzer (loest den 'keine Draehte'-Widerspruch aus Spiel 1)
    if (/Feenflügel-Stäbchen/.test(g.name)) {
      if (setStep(g, /Vorbereitung/, "Tüll-Schmetterlinge in Schleifenform mit einem PFEIFENPUTZER in der Mitte zusammenbinden (KEIN Draht — Pfeifenputzer ist biegsam, ohne scharfe oder strangulierende Enden), Doppelklebeband-Streifen am Stab vorbereiten.")) n.fluegel++;
      g.safetyRule = "Schere/Tacker NUR durch Erwachsene. Heißkleber KOMPLETT TABU — alle Klebeverbindungen mit Doppelklebeband oder Klebepunkten. Statt Draht IMMER Pfeifenputzer (keine scharfen Enden, kein Strangulations-Draht — konsistent zum Verbot bei den Tüll-Schmetterlingen). Bei 3-Jährigen: Stab außerhalb des Tanzes nicht schwingen lassen (Augenstoßgefahr).";
      if (typeof g.material === "string") g.material = g.material.replace(/Draht/g, "Pfeifenputzer");
      else if (Array.isArray(g.material)) g.material = g.material.map(m => m.replace(/Draht/g, "Pfeifenputzer"));
      if (g.prepText) g.prepText = g.prepText.replace(/mit Draht in der Mitte \(du!\) gebunden/g, "mit einem Pfeifenputzer in der Mitte (du!) gebunden").replace(/Drahtenden am Schmetterling vorher umbiegen — Stichgefahr\./g, "Pfeifenputzer statt Draht — keine scharfen Enden.");
    }

    // #2 MINOR Steine: 3-J. wasserbasierte Stifte explizit in den Schritt
    if (/Magische Steine bemalen/.test(g.name)) {
      if (setStep(g, /Verteilen/, "Jedes Kind bekommt 2–3 handtellergroße Steine und Stifte (für 3-Jährige wasserbasierte Filzstifte — KEINE Acrylstifte; Acryl nur mit Aufsicht bei Älteren).")) n.steine++;
    }

    // #4 MINOR Blumenkranz-Werkstatt: Klebe-Methode explizit
    if (/Blumenkranz-Werkstatt/.test(g.name)) {
      if (setStep(g, /Bekleben/, "Jedes Kind klebt 6–8 Blüten mit Doppelklebeband oder Klebepunkten auf seinen Streifen (KEIN Heißkleber für Kinder).")) n.kranz++;
    }
  }
  if (true) save(f, d);
}
console.log("feen-Fixes:", JSON.stringify(n));

// Verify
for (const age of ["klein", "mittel", "gross"]) {
  const d = load("feen-" + age);
  for (const vk of Object.keys(d.variants || {})) for (const g of d.variants[vk].games || []) {
    if (/Feenflügel-Stäbchen/.test(g.name)) { A(!/mit Draht in der Mitte binden/.test(JSON.stringify(g.steps)), "Feenflügel: kein Draht-Schritt mehr"); A(/PFEIFENPUTZER/.test(JSON.stringify(g.steps)), "Feenflügel: Pfeifenputzer drin"); }
    if (/Glitzer-Staub-Suche/.test(g.name)) A(/min\. 6 cm/.test(g.safetyRule), "Glitzer: 6cm in Safety");
  }
}
A(n.glitzer >= 1 && n.fluegel >= 1 && n.steine >= 1 && n.kranz >= 1, "alle 4 feen-Spiele gepatcht: " + JSON.stringify(n));
console.log("✅ feen-Review-Fixes durch + verifiziert.");
