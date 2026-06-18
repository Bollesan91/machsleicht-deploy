// Stations-Aligner v2 — versions-bewusst.
// Gruppiert Spiele nach Basis-Namen (Difficulty-Tags gestrippt). Pro Plan-Station EINE Version:
// vorhandene behalten, fehlende tier-passend ergaenzen (vk0=Basis, vk2=Wow/Turnier/XL). Same-age-Pool
// primaer, motto-weiter Fallback nur fuer Stationen ohne Treffer im eigenen Tier (echte Phantoms).
// Usage: node align_stations2.cjs <motto> [apply]
const fs = require("fs");
const motto = process.argv[2]; const APPLY = process.argv[3] === "apply";
if (!motto) { console.error("Usage: <motto> [apply]"); process.exit(1); }

const STOP = new Set("der die das mit in und fuer für den dem am im ein eine zum auf an bei aus vom als los das".split(" "));
const DIFF = new Set("xl xxl gross grosse große klasse 2 version turnier wow ausführlich ausfuehrlich team finale kleine klein mittel mini profi light basis deluxe groß grosser".split(" "));
const allTok = s => String(s).toLowerCase().replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, "").replace(/station\s*\d+\s*:?/gi, " ").split(/[^a-zäöüß0-9]+/).filter(w => w.length > 1 && !STOP.has(w));
const baseTok = s => allTok(s).filter(w => !DIFF.has(w) && w.length > 2);
const baseKey = s => [...new Set(baseTok(s))].sort().join("|");
const SKIP = /ankunft|ankommen|empfang|eintreffen|begrüß|willkommen|snack|pause|kuchen|pizza|essen|getränk|punsch|trink|diplom|lizenz|urkund|zeremonie|verleihung|krönung|siegerehr|pokal|medaille|foto|briefing|helm|gürtel|spruch|anmeldung|video|film|funktion|rollen|abhol|mitgebsel|verabschied|ernennung|appell|pakt|einschreib|tattoo|pass|maske|beutel|umschlag|musik|freispiel|bewertung|abschluss|wanderpokal|kreis/i;
const ages = ["klein", "mittel", "gross"];

// motto-weiter Pool (fuer Fallback)
const wide = {};
for (const age of ages) { const fp = "./data/motto/" + motto + "-" + age + ".json"; if (!fs.existsSync(fp)) continue; const d = JSON.parse(fs.readFileSync(fp, "utf8")); for (const vk of Object.keys(d.variants || {})) for (const g of d.variants[vk].games || []) { const k = baseKey(g.name); if (!k) continue; (wide[k] = wide[k] || []).push({ g, age, steps: g.steps ? g.steps.length : 0 }); } }
const diffScore = name => allTok(name).filter(w => DIFF.has(w)).length;
function pick(members, vk) { // members: [{g,steps}]
  const sorted = [...members];
  if (vk === "2") sorted.sort((a, b) => diffScore(b.g.name) - diffScore(a.g.name) || b.steps - a.steps);
  else if (vk === "0") sorted.sort((a, b) => diffScore(a.g.name) - diffScore(b.g.name) || b.steps - a.steps);
  else sorted.sort((a, b) => b.steps - a.steps);
  return sorted[0].g;
}

const log = []; let changed = 0;
for (const age of ages) {
  const fp = "./data/motto/" + motto + "-" + age + ".json"; if (!fs.existsSync(fp)) continue;
  const d = JSON.parse(fs.readFileSync(fp, "utf8"));
  // same-age groups
  const groups = {};
  for (const vk of Object.keys(d.variants || {})) for (const g of d.variants[vk].games || []) { const k = baseKey(g.name); if (!k) continue; (groups[k] = groups[k] || []).push({ g, steps: g.steps ? g.steps.length : 0 }); }
  let fileCh = false;
  for (const vk of Object.keys(d.variants || {})) {
    const v = d.variants[vk];
    const curByGroup = {}; v.games.forEach(g => { curByGroup[baseKey(g.name)] = g; });
    const finalNames = []; const finalObjs = []; const probs = [];
    const usedKeys = new Set();
    for (const s of v.schedule || []) {
      if (SKIP.test(s.title)) continue; const stTok = new Set(baseTok(s.title)); if (!stTok.size) continue;
      // bestes Gruppen-Match (max base-token-overlap)
      let bestK = null, bestOv = 0;
      for (const k of Object.keys(groups)) { const ov = k.split("|").filter(t => stTok.has(t)).length; if (ov > bestOv) { bestOv = ov; bestK = k; } }
      let chosen = null;
      if (bestK && bestOv > 0) {
        if (curByGroup[bestK]) chosen = curByGroup[bestK];          // vorhandene Version behalten
        else chosen = pick(groups[bestK], vk);                       // fehlende: tier-passend
        if (!usedKeys.has(bestK)) { usedKeys.add(bestK); finalNames.push(chosen.name); finalObjs.push(chosen); }
      } else {
        // Fallback: motto-weit (echtes Phantom im eigenen Tier)
        let wK = null, wOv = 0; for (const k of Object.keys(wide)) { const ov = k.split("|").filter(t => stTok.has(t)).length; if (ov > wOv) { wOv = ov; wK = k; } }
        if (wK && wOv > 0) { const chosenW = pick(wide[wK].map(x => ({ g: x.g, steps: x.steps })), vk); if (!usedKeys.has("W:" + wK)) { usedKeys.add("W:" + wK); finalNames.push(chosenW.name + " [aus anderem Tier]"); finalObjs.push(chosenW); probs.push("CROSS-TIER:" + s.title.replace(/[^ -~äöüÄÖÜ]/g, "").trim()); } }
        else probs.push("NOMATCH:" + s.title.replace(/[^ -~äöüÄÖÜ]/g, "").trim());
      }
    }
    // current games, die zu keiner Plan-Station gehoeren -> behalten (append),
    // ABER Difficulty-Dubletten droppen (gleicher Leit-Basis-Token wie ein bereits gewaehltes Plan-Spiel + DIFF-Tag)
    const chosenLeads = new Set(finalObjs.map(g => baseTok(g.name)[0]).filter(Boolean));
    v.games.forEach(g => {
      if (finalObjs.includes(g) || finalNames.includes(g.name)) return;
      const lead = baseTok(g.name)[0];
      const isVersionDup = lead && chosenLeads.has(lead) && diffScore(g.name) > 0;
      if (isVersionDup) { probs.push("DROP-Dublette:" + g.name.replace(/[^ -~äöüÄÖÜ]/g, "").trim()); return; }
      finalNames.push(g.name + " [behalten]"); finalObjs.push(g);
    });
    const before = v.games.length;
    if (APPLY) v.games = finalObjs.map(g => JSON.parse(JSON.stringify(g)));
    if (finalObjs.length !== before) { fileCh = true; changed++; }
    log.push(`${age}/${vk}: ${before} -> ${finalObjs.length}: ${finalNames.map(n => n.replace(/[^ -~äöüÄÖÜ\[\]]/g, "").trim()).join(", ")}` + (probs.length ? "  ⚠" + probs.join(" | ") : ""));
  }
  if (APPLY && fileCh) fs.writeFileSync(fp, JSON.stringify(d, null, 2));
}
console.log((APPLY ? "APPLIED " : "DRY-RUN ") + motto + ":"); log.forEach(l => console.log("  " + l)); console.log(changed + " Varianten geaendert.");
