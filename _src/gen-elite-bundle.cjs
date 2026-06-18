#!/usr/bin/env node
// gen-elite-bundle.cjs — regeneriert den ELITE_MOTTO_DATA-Block in js/kindergeburtstag.js
// QUELLE: data/motto/<motto>-<klein|mittel|gross>.json (alle 15 Mottos = single source of truth).
// Ersetzt den veralteten _src/elite-motto-data/_generate_bundle.py (las eine 3 Wochen alte Kopie).
// Aufruf: node _src/gen-elite-bundle.cjs   (vom Repo-Root)
const fs = require("fs");
const path = require("path");

const REPO = path.resolve(__dirname, "..");
const DATA_DIR = path.join(REPO, "data", "motto");
const TARGET = path.join(REPO, "js", "kindergeburtstag.js");
const AGES = ["klein", "mittel", "gross"];

// 1. Mottos aus dem Datenordner ableiten (alphabetisch, deterministisch).
const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith(".json"));
const mottos = [...new Set(files.map((f) => f.replace(/-(klein|mittel|gross)\.json$/, "")))].sort();

// 2. Bundle bauen — voller Pass-Through je Datei, Key = "<motto>-<age>".
const bundle = {};
for (const m of mottos) {
  for (const age of AGES) {
    const fp = path.join(DATA_DIR, `${m}-${age}.json`);
    if (!fs.existsSync(fp)) { console.warn(`  WARN fehlt: ${m}-${age}.json`); continue; }
    const obj = JSON.parse(fs.readFileSync(fp, "utf8")); // wirft bei kaputtem JSON -> Abbruch vor Write
    // Mindest-Schema-Assert: variants 0/1/2 mit games[]
    const vks = Object.keys(obj.variants || {});
    if (vks.join(",") !== "0,1,2") throw new Error(`${m}-${age}: variant-keys != 0,1,2 (${vks})`);
    for (const vk of vks) {
      if (!Array.isArray(obj.variants[vk].games)) throw new Error(`${m}-${age} v${vk}: games kein Array`);
    }
    bundle[`${m}-${age}`] = obj;
  }
}
const expected = mottos.length * AGES.length;
if (Object.keys(bundle).length !== expected) throw new Error(`Bundle hat ${Object.keys(bundle).length} keys, erwartet ${expected}`);

// 3. Header + serialisierter Block.
const header = `// js/kindergeburtstag.js :: ELITE_MOTTO_DATA
// AUTO-GENERIERT von _src/gen-elite-bundle.cjs — NICHT MANUELL EDITIEREN.
// Quelle: data/motto/<motto>-<klein|mittel|gross>.json (${mottos.length} Mottos, single source of truth).
// Regenerieren via: node _src/gen-elite-bundle.cjs
var ELITE_MOTTO_DATA = `;
const block = header + JSON.stringify(bundle, null, 2) + ";";

// 4. Ziel-Datei: alten Block (inkl. evtl. vorhandenem Kommentar-Header direkt davor) ersetzen.
const src = fs.readFileSync(TARGET, "utf8");
const varIdx = src.indexOf("var ELITE_MOTTO_DATA");
if (varIdx < 0) throw new Error("var ELITE_MOTTO_DATA nicht in Zieldatei gefunden");
// Start: ab der bekannten ersten Zeile des alten AUTO-GENERATED-Kommentar-Headers,
// sonst (kein bekannter Header) ab 'var'. Header liegt direkt vor 'var'.
const OLD_HEADER = "// _src/elite-motto-data/_bundle.js";
let start = src.indexOf(OLD_HEADER);
if (start < 0 || start > varIdx) start = varIdx;
// Ende: das ';' das das Objekt-Literal schliesst (Brace-Counter ab erstem '{' nach var).
const braceStart = src.indexOf("{", varIdx);
let depth = 0, end = -1, inStr = false, esc = false, q = "";
for (let i = braceStart; i < src.length; i++) {
  const c = src[i];
  if (inStr) { if (esc) esc = false; else if (c === "\\") esc = true; else if (c === q) inStr = false; continue; }
  if (c === '"' || c === "'") { inStr = true; q = c; continue; }
  if (c === "{") depth++;
  else if (c === "}") { depth--; if (depth === 0) { end = i; break; } }
}
if (end < 0) throw new Error("Objekt-Ende nicht gefunden");
let after = src.slice(end + 1);
if (after.startsWith(";")) after = after.slice(1);

const out = src.slice(0, start) + block + after;

// 5. Post-Asserts VOR dem Write: getEliteData muss erhalten bleiben, genau 1 ELITE_MOTTO_DATA-Deklaration.
if (!out.includes("function getEliteData")) throw new Error("getEliteData nach Replace verschwunden");
if ((out.match(/var ELITE_MOTTO_DATA/g) || []).length !== 1) throw new Error("nicht genau 1 ELITE_MOTTO_DATA-Deklaration");

fs.writeFileSync(TARGET, out);

// 6. Auch das Build-Intermediate _src/elite-motto-data/_bundle.js aus data/motto schreiben,
//    damit ein spaeterer `bash _src/build.sh` (kindergeburtstag-data + _bundle + compiled JSX)
//    NICHT die stale _src-Kopie wieder einbackt.
const BUNDLE_JS = path.join(REPO, "_src", "elite-motto-data", "_bundle.js");
if (fs.existsSync(path.dirname(BUNDLE_JS))) {
  fs.writeFileSync(BUNDLE_JS, block + "\n");
  console.log(`   + _bundle.js (Build-Intermediate) aus data/motto aktualisiert.`);
}

console.log(`OK: ${Object.keys(bundle).length} Slots (${mottos.length} Mottos) regeneriert.`);
console.log(`   Mottos: ${mottos.join(", ")}`);
console.log(`   Datei: ${(out.length / 1024).toFixed(0)} KB (vorher ${(src.length / 1024).toFixed(0)} KB)`);
