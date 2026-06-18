#!/usr/bin/env node
// gen-elite-bundle.cjs — erzeugt _src/elite-motto-data/_bundle.js aus data/motto/.
// QUELLE: data/motto/<motto>-<klein|mittel|gross>.json (alle 15 Mottos = single source of truth).
// Ersetzt den veralteten _generate_bundle.py (las eine 3 Wochen alte Kopie mit altem Affiliate-Tag).
// _bundle.js enthaelt `var ELITE_MOTTO_DATA = {...}` + die Accessor-Funktionen und wird von
// _src/build.sh in js/kindergeburtstag.js einkonkateniert (data + _bundle + compiled JSX).
// Aufruf: node _src/gen-elite-bundle.cjs   (vom Repo-Root). Danach `bash _src/build.sh`.
const fs = require("fs");
const path = require("path");

const REPO = path.resolve(__dirname, "..");
const DATA_DIR = path.join(REPO, "data", "motto");
const BUNDLE_JS = path.join(REPO, "_src", "elite-motto-data", "_bundle.js");
const AGES = ["klein", "mittel", "gross"];

// Top-Level-Keys, die der Planer-Runtime NICHT liest (verifiziert: 0 eliteData-Reads im
// React-Teil; werden nur auf den statischen Motto-HTML-Seiten gerendert). Aus dem Bundle strippen.
const STRIP_KEYS = new Set([
  "_meta", "faq", "cakeRecipe", "invitationTemplate", "parentTips", "introParagraph",
  "metaDescription", "bonusGames", "bonusQuiz", "ecologyQuiz", "bonusActivities", "mythologyQuiz",
]);

// 1. Mottos aus dem Datenordner ableiten (alphabetisch, deterministisch).
const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith(".json"));
const mottos = [...new Set(files.map((f) => f.replace(/-(klein|mittel|gross)\.json$/, "")))].sort();

// 2. Bundle bauen — Pass-Through je Datei (minus STRIP_KEYS), Key = "<motto>-<age>".
const bundle = {};
for (const m of mottos) {
  for (const age of AGES) {
    const fp = path.join(DATA_DIR, `${m}-${age}.json`);
    if (!fs.existsSync(fp)) { console.warn(`  WARN fehlt: ${m}-${age}.json`); continue; }
    const obj = JSON.parse(fs.readFileSync(fp, "utf8")); // wirft bei kaputtem JSON -> Abbruch vor Write
    const vks = Object.keys(obj.variants || {});
    if (vks.join(",") !== "0,1,2") throw new Error(`${m}-${age}: variant-keys != 0,1,2 (${vks})`);
    for (const vk of vks) {
      if (!Array.isArray(obj.variants[vk].games)) throw new Error(`${m}-${age} v${vk}: games kein Array`);
    }
    for (const k of STRIP_KEYS) delete obj[k];
    bundle[`${m}-${age}`] = obj;
  }
}
const expected = mottos.length * AGES.length;
if (Object.keys(bundle).length !== expected) throw new Error(`Bundle hat ${Object.keys(bundle).length} keys, erwartet ${expected}`);

// 3. Accessor-Funktionen (MUESSEN im Bundle sein — der Planer ruft getEliteData; nicht in .jsx/data.js).
const ACCESSORS = `

function getEliteData(motto, ageGroup) {
  // Returns elite-motto JSON for a motto+ageGroup combination, or null if not available.
  // The Planer falls back to legacy SZ_THEMES/kindergeburtstag-data.js when null.
  if (!motto || !ageGroup) return null;
  var key = motto + '-' + ageGroup;
  return ELITE_MOTTO_DATA[key] || null;
}
function hasEliteData(motto, ageGroup) {
  return getEliteData(motto, ageGroup) !== null;
}
function listEliteSlots() {
  return Object.keys(ELITE_MOTTO_DATA);
}
`;

const header = `// js/kindergeburtstag.js :: ELITE_MOTTO_DATA + Accessoren
// AUTO-GENERIERT von _src/gen-elite-bundle.cjs aus data/motto/ — NICHT MANUELL EDITIEREN.
// Quelle: data/motto/<motto>-<klein|mittel|gross>.json (${mottos.length} Mottos, single source of truth).
// Regenerieren: node _src/gen-elite-bundle.cjs  (danach bash _src/build.sh)
var ELITE_MOTTO_DATA = `;
const block = header + JSON.stringify(bundle, null, 2) + ";" + ACCESSORS;

// 4. Selbst-Asserts VOR dem Write: Accessoren + genau 1 Deklaration.
if (!block.includes("function getEliteData")) throw new Error("ACCESSORS fehlen im Block");
if ((block.match(/var ELITE_MOTTO_DATA/g) || []).length !== 1) throw new Error("nicht genau 1 ELITE_MOTTO_DATA-Deklaration");

fs.writeFileSync(BUNDLE_JS, block + "\n");
console.log(`OK: _bundle.js geschrieben — ${Object.keys(bundle).length} Slots (${mottos.length} Mottos), ${(block.length / 1024).toFixed(0)} KB.`);
console.log(`   Mottos: ${mottos.join(", ")}`);
console.log(`   Naechster Schritt: bash _src/build.sh  (konkateniert data + _bundle + compiled JSX)`);
