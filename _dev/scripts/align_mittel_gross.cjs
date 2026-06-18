// Re-Alignment mittel+gross fuer Feuerwehr + Einhorn (Score-Fixes 18.06.2026)
// Additiv: fehlende Plan-Spiele aus Geschwister-Varianten ergaenzen; gezielt falsch-einsortierte entfernen.
const fs = require("fs");
const A = (c, m) => { if (!c) { console.error("ASSERT FAIL: " + m); process.exit(1); } };
const load = f => JSON.parse(fs.readFileSync("./data/motto/" + f + ".json", "utf8"));
const save = (f, d) => fs.writeFileSync("./data/motto/" + f + ".json", JSON.stringify(d, null, 2));
const has = (games, re) => games.some(g => re.test(g.name));
// Pool: erstes Spiel das auf re matcht (mit steps/prepText bevorzugt), motto-weit
function find(motto, re) {
  let best = null, bs = -1;
  for (const age of ["klein", "mittel", "gross"]) {
    const d = load(motto + "-" + age);
    for (const vk of Object.keys(d.variants)) for (const g of d.variants[vk].games) {
      if (re.test(g.name)) { const s = (g.steps && g.steps.length ? 2 : 0) + (g.prepText ? 1 : 0); if (s > bs) { bs = s; best = g; } }
    }
  }
  return best ? JSON.parse(JSON.stringify(best)) : null;
}
const NEBEL = " SICHERHEIT Nebel: nur Disco-/Party-Nebelfluid (KEIN Trockeneis/keine Chemie), Maschine außer Kinder-Reichweite, Raum gut lüften, kurz einsetzen; Kinder mit Asthma/Atemwegsproblemen draußen lassen; Boden kann feucht/rutschig werden; Rauchmelder ggf. kurz abdecken und danach SOFORT wieder aktivieren.";

// ===================== FEUERWEHR =====================
{
  // Stationen-Schritte aus gross holen und in mittel-Ausbildungs-Stationen spiegeln
  const G = load("feuerwehr-gross");
  const grossStat = (() => { for (const vk of Object.keys(G.variants)) { const g = G.variants[vk].games.find(x => /Stationen-Wettbewerb|Ausbildungs/.test(x.name)); if (g && g.steps && g.steps.length) return g; } })();
  A(grossStat, "gross Stationen mit Steps gefunden");

  const M = load("feuerwehr-mittel");
  let statFilled = 0, nebel = 0;
  for (const vk of Object.keys(M.variants)) {
    M.variants[vk].games.forEach(g => {
      if (/Ausbildungs-Stationen/.test(g.name) && !(g.steps && g.steps.length)) {
        g.steps = JSON.parse(JSON.stringify(grossStat.steps));
        g.safetyRule = grossStat.safetyRule;
        statFilled++;
      }
    });
    // Nebel-Safety in schedule
    M.variants[vk].schedule.forEach(s => { if (/Nebel/i.test(s.title + (s.description || "")) && !/SICHERHEIT Nebel/.test(s.description || "")) { s.description = (s.description || "") + NEBEL; nebel++; } });
  }
  A(statFilled >= 1, "mittel Stationen mit Steps gefuellt (" + statFilled + ")");
  save("feuerwehr-mittel", M);

  // Nebel-Safety auch in gross/wow
  let gnebel = 0;
  for (const vk of Object.keys(G.variants)) G.variants[vk].schedule.forEach(s => { if (/Nebel/i.test(s.title + (s.description || "")) && !/SICHERHEIT Nebel/.test(s.description || "")) { s.description = (s.description || "") + NEBEL; gnebel++; } });
  save("feuerwehr-gross", G);
  console.log("FEUERWEHR: mittel-Stationen gefuellt=" + statFilled + ", Nebel-Safety mittel=" + nebel + " gross=" + gnebel);
}

// ===================== EINHORN =====================
{
  const chemie = find("einhorn", /Milch-Experiment/);
  const parcours = find("einhorn", /Regenbogen-Parcours/);
  const escape = find("einhorn", /Escape-Challenge/);
  const schmuck = find("einhorn", /Schmuck-Workshop/);
  A(chemie && parcours && escape && schmuck, "Einhorn Pool-Spiele gefunden");

  // mittel: fehlende Plan-Spiele ergaenzen
  const Mi = load("einhorn-mittel");
  let mAdd = 0;
  // mittel/0 + mittel/1: Parcours fehlt
  for (const vk of ["0", "1"]) { const v = Mi.variants[vk]; if (v && !has(v.games, /Parcours/)) { v.games.push(JSON.parse(JSON.stringify(parcours))); mAdd++; } }
  // mittel/2: Chemie fehlt
  { const v = Mi.variants["2"]; if (v && !has(v.games, /Milch|Chemie/)) { v.games.push(JSON.parse(JSON.stringify(chemie))); mAdd++; } }
  save("einhorn-mittel", Mi);

  // gross: Plan-Alignment
  const Gr = load("einhorn-gross");
  let gAdd = 0, gRem = 0;
  // gross/0 (minimal): Chemie fehlt (Plan: Chemie-Labor + Schmuck)
  { const v = Gr.variants["0"]; if (!has(v.games, /Milch|Chemie/)) { v.games.unshift(JSON.parse(JSON.stringify(chemie))); gAdd++; } }
  // gross/1 (standard): Chemie fehlt (Plan: Chemie-Labor, Parcours, Escape, Schmuck)
  { const v = Gr.variants["1"]; if (!has(v.games, /Milch|Chemie/)) { v.games.unshift(JSON.parse(JSON.stringify(chemie))); gAdd++; } }
  // gross/2 (wow): falsch-einsortierte Quiz+Raetselrallye raus, Plan-Spiele rein
  { const v = Gr.variants["2"];
    const before = v.games.length;
    v.games = v.games.filter(g => !/Wissens-Quiz|Wolkenwald|Rätselrallye|Raetselrallye/.test(g.name));
    gRem = before - v.games.length;
    for (const [re, obj] of [[/Milch|Chemie/, chemie], [/Parcours/, parcours], [/Escape-Challenge/, escape], [/Schmuck-Workshop/, schmuck]]) {
      if (!has(v.games, re)) { v.games.unshift(JSON.parse(JSON.stringify(obj))); gAdd++; }
    }
  }
  // Nebel-Safety (falls vorhanden)
  let enebel = 0;
  for (const vk of Object.keys(Gr.variants)) Gr.variants[vk].schedule.forEach(s => { if (/Nebelmaschine|echtem Nebel|Trockeneis/i.test(s.title + (s.description || "")) && !/SICHERHEIT Nebel/.test(s.description || "")) { s.description = (s.description || "") + NEBEL; enebel++; } });
  save("einhorn-gross", Gr);
  console.log("EINHORN: mittel-Adds=" + mAdd + ", gross-Adds=" + gAdd + ", gross/wow entfernt=" + gRem + ", Nebel=" + enebel);

  // Verify gross/wow matcht Plan
  const v2 = Gr.variants["2"];
  for (const re of [/Milch|Chemie/, /Parcours/, /Escape/, /Schmuck/, /Kurzfilm/, /Urkunde|Zeremonie/]) A(has(v2.games, re), "gross/wow hat " + re);
  A(!has(v2.games, /Wissens-Quiz|Wolkenwald/), "gross/wow ohne Quiz/Rallye");
  console.log("gross/wow games jetzt:", v2.games.map(g => g.name).join(" | "));
}
console.log("\nALIGNMENT DURCH.");
