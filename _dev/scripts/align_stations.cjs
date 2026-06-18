// Generischer Stations-Aligner: games[] je Variante = die im schedule referenzierten Spiele,
// gematcht per Token-Overlap (meiste geteilte Stichwoerter), Pool NUR aus derselben Alters-Datei
// (alters-tier-sauber), include-all-at-max (kombinierte Stationen), SET in schedule-Reihenfolge.
// Usage: node align_stations.cjs <motto> [apply]
const fs = require("fs");
const motto = process.argv[2];
const APPLY = process.argv[3] === "apply";
if (!motto) { console.error("Usage: node align_stations.cjs <motto> [apply]"); process.exit(1); }

const STOP = new Set("der die das mit in und fuer für den dem am im xl gross grosse große klasse version spiel station ein eine zum auf an bei aus vom als die los".split(" "));
const toks = s => String(s).toLowerCase().replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, "").replace(/station\s*\d+\s*:?/gi, " ").split(/[^a-zäöüß]+/).filter(w => w.length > 2 && !STOP.has(w));
// Ritual-/Essens-/Zeremonie-Eintraege im Plan, die KEIN Spiel sind:
const SKIP = /ankunft|ankommen|empfang|eintreffen|begrüß|willkommen|snack|pause|kuchen|pizza|essen|getränk|punsch|trink|diplom|lizenz|urkund|zeremonie|verleihung|krönung|siegerehr|pokal|medaille|foto|briefing|helm|gürtel|spruch|anmeldung|video|film|funktion|rollen|abhol|mitgebsel|verabschied|ernennung|appell|pakt|einschreib|tattoo|pass|maske|beutel|umschlag|musik|freispiel|bewertung|abschluss/i;

const ages = ["klein", "mittel", "gross"];
let totalChanged = 0;
const log = [];
for (const age of ages) {
  const fp = "./data/motto/" + motto + "-" + age + ".json";
  if (!fs.existsSync(fp)) continue;
  const d = JSON.parse(fs.readFileSync(fp, "utf8"));
  // Pool aus dieser Alters-Datei (beste = meiste steps)
  const pool = {};
  for (const vk of Object.keys(d.variants || {})) for (const g of d.variants[vk].games || []) {
    const sc = (g.steps ? g.steps.length : 0);
    if (!pool[g.name] || sc > pool[g.name]._s) pool[g.name] = { obj: g, tok: toks(g.name), _s: sc };
  }
  const poolArr = Object.entries(pool).map(([name, p]) => ({ name, ...p }));
  let fileChanged = false;
  for (const vk of Object.keys(d.variants || {})) {
    const v = d.variants[vk];
    const wantNames = [], probs = [];
    for (const s of v.schedule || []) {
      if (SKIP.test(s.title)) continue;
      const st = new Set(toks(s.title)); if (!st.size) continue;
      let max = 0; poolArr.forEach(p => { const ov = p.tok.filter(t => st.has(t)).length; if (ov > max) max = ov; });
      if (max === 0) { probs.push("NOMATCH:" + s.title.replace(/[^ -~äöüÄÖÜ]/g, "").trim()); continue; }
      poolArr.forEach(p => { const ov = p.tok.filter(t => st.has(t)).length; if (ov === max && !wantNames.includes(p.name)) wantNames.push(p.name); });
    }
    // current names that the matcher would drop -> behalten (Sicherheit gegen Matcher-Lücken)
    const curNames = v.games.map(g => g.name);
    const dropped = curNames.filter(n => !wantNames.includes(n));
    const finalNames = [...wantNames, ...dropped];
    const before = curNames.length;
    if (APPLY) v.games = finalNames.map(n => JSON.parse(JSON.stringify(pool[n].obj)));
    if (finalNames.length !== before || finalNames.some((n, i) => n !== curNames[i])) { fileChanged = true; totalChanged++; }
    log.push(`${age}/${vk}: ${before} -> ${finalNames.length}` + (probs.length ? "  ⚠" + probs.join(" | ") : "") + (dropped.length ? "  (behalten, nicht im Plan: " + dropped.map(x=>x.replace(/[^ -~äöüÄÖÜ]/g,"").trim()).join(",") + ")" : ""));
  }
  if (APPLY && fileChanged) fs.writeFileSync(fp, JSON.stringify(d, null, 2));
}
console.log((APPLY ? "APPLIED " : "DRY-RUN ") + motto + ":");
log.forEach(l => console.log("  " + l));
console.log(totalChanged + " Varianten geaendert.");
