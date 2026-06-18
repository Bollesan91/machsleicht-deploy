const fs = require("fs");
const edits = [
  { file: "data/motto/piraten-mittel.json", game: /^.*Seeungeheuer besiegen/, mode: "set-empty",
    val: "Nur weiche Sockenbälle werfen — niemals auf Personen, immer nur auf die Becher/Dosen zielen. Eine feste Wurflinie markieren, es wirft immer nur ein Kind, die anderen warten hinter der Linie." },
  { file: "data/motto/piraten-mittel.json", game: /^.*Schiff beladen/, mode: "set-empty",
    val: "Nur weiche Bälle oder Papierknäuel — nur in den Eimer werfen, nie auf Personen oder ins Gesicht. Feste Wurflinie, ein Kind nach dem anderen, niemand steht neben oder hinter dem Eimer." },
  { file: "data/motto/feen-gross.json", game: /Lichtweg-Vermessung \+ Wurzel-Pakt-Schluss/, mode: "append",
    val: " Bei Brandmalerei gut lüften (es qualmt) — Fenster auf oder Dunstabzug an, und Kinder mit Sicherheitsabstand zum heißen Stift." },
  { file: "data/motto/weltraum-gross.json", game: /Raumanzug-Werkstatt/, mode: "set-empty",
    val: "Beim Aufnähen: Nadel achtsam und nur unter Aufsicht — jüngere Kinder kleben statt nähen. Schere bei Bedarf nur durch Erwachsene. Alufolie-Kanten vorher umknicken." },
  { file: "data/motto/weltraum-gross.json", game: /Nächtliche Sternenbeobachtung/, mode: "append",
    val: " Balkon nur mit hohem, gesichertem Geländer — kein Klettern oder Lehnen am Geländer, immer ein Erwachsener in Armreichweite." },
];
// Group by file, apply all asserts BEFORE the single write per file.
const byFile = {};
for (const e of edits) (byFile[e.file] = byFile[e.file] || []).push(e);
for (const file of Object.keys(byFile)) {
  const d = JSON.parse(fs.readFileSync(file, "utf8"));
  const plan = [];
  for (const e of byFile[file]) {
    let target = null;
    for (const vk of Object.keys(d.variants || {})) {
      for (const g of (d.variants[vk].games || [])) {
        if (e.game.test(g.name)) { target = g; break; }
      }
      if (target) break;
    }
    if (!target) throw new Error("NOT FOUND: " + e.game + " in " + file);
    if (e.mode === "set-empty") {
      if (target.safetyRule && target.safetyRule.trim()) throw new Error("EXPECTED EMPTY safetyRule but found one: " + target.name + " :: " + target.safetyRule);
    } else if (e.mode === "append") {
      if (!target.safetyRule || !target.safetyRule.trim()) throw new Error("EXPECTED existing safetyRule to append to, none: " + target.name);
      if (target.safetyRule.includes(e.val.trim().slice(0, 25))) throw new Error("ALREADY appended: " + target.name);
    }
    plan.push({ target, e });
  }
  // all asserts passed → apply + single write
  for (const { target, e } of plan) {
    target.safetyRule = e.mode === "append" ? (target.safetyRule + e.val) : e.val;
    console.log("OK [" + file.split("/").pop() + "] " + target.name + " -> " + target.safetyRule.slice(0, 70) + "...");
  }
  fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
}
console.log("\nAll edits applied.");
