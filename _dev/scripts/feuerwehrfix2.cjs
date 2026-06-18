// Feuerwehr Fix 2 — Befunde aus dem Diff-Re-Check (18.06.2026)
const fs = require("fs");
const P = "./data/motto/feuerwehr-gross.json";
const A = (c, m) => { if (!c) { console.error("ASSERT FAIL: " + m); process.exit(1); } };
const d = JSON.parse(fs.readFileSync(P, "utf8"));

const AUSB_SAFETY = "Boden bei Station 1 + 3 wird nass → draußen oder auf abwischbarem Boden, Nässe sofort aufwischen / Rutschmatte, Stoppersocken. Nie ins Gesicht spritzen, bei Bedarf Schutzbrille. Bei der Staffel immer nur eine*r auf der Strecke, kein Schubsen/Überholen. Knoten NIE um Hals oder Handgelenk. ERSTE HILFE: Verband NIE um Hals oder über Mund/Nase, nichts fest zuziehen; stabile Seitenlage nur sanft, Kopf stützen, nichts ruckartig drehen — im Zweifel an der Puppe statt am Kind üben.";
const ST1 = "5 nummerierte Becher mit Flammen-Symbol in 3/5/7 m gestaffelt. Jedes Crew-Mitglied hat 30 Sek., mit der Wasserpistole so viele wie möglich umzuspritzen — die weiteste Distanz zählt doppelt. Treffer = Punkte. (Bei Bedarf Schutzbrille.)";
const ST4 = "Eine „verletzte Person\" (große Puppe ODER ein mitspielendes Kind) mit Dreieckstuch (Toilettenpapier nur als Reserve) versorgen und in die stabile Seitenlage bringen. Kurz-Anleitung Seitenlage: 1) nahen Arm nach oben anwinkeln, 2) ferne Hand an die Wange der Person legen, 3) fernes Bein anwinkeln und die Person sanft zu dir auf die Seite drehen, Kopf leicht überstrecken. Eine erwachsene Person zeigt es einmal vor. Punkt für saubere Ausführung — echtes Können statt Stofftier-Pflege.";
const KNOTEN_MAT = "Knoten-Karte (Mastwurf-Anleitung, 1 Ausdruck)";

let ren = { stat: 0, spritz: 0, helm: 0, zerem: 0 }, safe = 0, notruf = 0;
for (const vk of Object.keys(d.variants)) {
  d.variants[vk].games.forEach(g => {
    if (/Ausbildungs-Stationen/.test(g.name)) {
      g.name = "🎓 Stationen-Wettbewerb (4er-Rotation)"; ren.stat++;
      g.safetyRule = AUSB_SAFETY; safe++;
      const s1 = g.steps.find(s => /Station 1/.test(s.name)); if (s1) s1.content = ST1;
      const s4 = g.steps.find(s => /Station 4/.test(s.name)); if (s4) s4.content = ST4;
      if (typeof g.material === "string" && !/Knoten-Karte/.test(g.material)) g.material += " | " + KNOTEN_MAT;
      else if (Array.isArray(g.material) && !g.material.some(m => /Knoten-Karte/.test(m))) g.material.push(KNOTEN_MAT);
    }
    if (/^💧 Spritz-Probe an der Wache$/.test(g.name)) { g.name = "💧 Zielspritzen-Wettkampf"; g.minAge = 9; ren.spritz++; }
    if (/Helm-Bemalen/.test(g.name)) { g.name = "🎖️ Crew-Abzeichen & Dienstgrad"; g.minAge = 9; ren.helm++; }
    if (/Urkunden-Zeremonie/.test(g.name)) { g.name = "🏆 Bewertete Zeremonie (Urkunden & Dienstgrade)"; ren.zerem++; }
    if (/Notruf-Simulation/.test(g.name)) {
      const s2 = (g.steps || []).find(s => /Szenario ziehen/.test(s.name || ""));
      if (s2 && !/Stichflamme/.test(s2.content)) { s2.content = s2.content.replace("(a) Fettbrand in der Küche,", "(a) Fettbrand in der Küche (Profi-Fakt: Fett NIE mit Wasser löschen — Stichflamme!),"); notruf++; }
    }
  });
  // Plan-Titel angleichen: Stationen-Wettbewerb bleibt; Zeremonie-Plan-Titel sind bewusst variantenreich (Bewertete / Große Bewertete + Ehrentafel) -> ok
}

A(ren.stat >= 3, "Stationen umbenannt 3x, war " + ren.stat);
A(safe >= 3, "Safety mit Erste-Hilfe-Zeile 3x");
A(ren.spritz >= 1, "Spritz->Zielspritzen mind 1x (" + ren.spritz + ")");
A(ren.helm >= 1, "Helm->Crew-Abzeichen mind 1x (" + ren.helm + ")");

// Verifikationen
for (const vk of Object.keys(d.variants)) {
  d.variants[vk].games.forEach(g => {
    if (/Stationen-Wettbewerb/.test(g.name)) {
      A(/ERSTE HILFE/.test(g.safetyRule), vk + " Station-Safety Erste-Hilfe-Zeile da");
      A(/Knoten-Karte/.test(Array.isArray(g.material) ? g.material.join("|") : g.material), vk + " Knoten-Karte im Material");
    }
    // keine ab3-Spiele mehr in gross
    A(g.minAge >= 6 || /Zeremonie|Stationen-Wettbewerb/.test(g.name), vk + " " + g.name + " minAge>=6 (ist " + g.minAge + ")");
  });
}
A(!JSON.stringify(d).includes("Spritz-Probe an der Wache"), "kein alter Spritz-Probe-Name mehr");
A(!JSON.stringify(d).includes("🎨 Helm-Bemalen"), "kein alter Helm-Bemalen-Name mehr");

fs.writeFileSync(P, JSON.stringify(d, null, 2));
console.log("FIX2 ok:", JSON.stringify({ ren, safe, notruf }));
