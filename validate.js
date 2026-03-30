#!/usr/bin/env node
/**
 * machsleicht.de — Validate Script
 * Prüft alle HTML-Dateien vor dem Deploy auf Qualität.
 * Aufruf: node validate.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const IGNORE_DIRS = ["node_modules", ".git", ".claude", "_dev"];
const errors = [];
const warnings = [];
let fileCount = 0;

// ─── Helpers ───
function err(file, gate, msg) { errors.push({ file: path.relative(ROOT, file), gate, msg }); }
function warn(file, gate, msg) { warnings.push({ file: path.relative(ROOT, file), gate, msg }); }

function getAllHTML(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORE_DIRS.includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...getAllHTML(full));
    else if (entry.name.endsWith(".html") && !entry.name.startsWith("_")) results.push(full);
  }
  return results;
}

// ─── Gate 1: HTML-Grundlagen ───
function gate1(file, html) {
  if (!html.includes("<title>") && !html.includes("<title "))
    err(file, 1, "Kein <title> Tag");
  if (!html.includes('lang="de"'))
    err(file, 1, 'Kein lang="de" Attribut');
  if (!html.includes('rel="canonical"'))
    warn(file, 1, "Kein canonical Link");
  if (!html.includes('name="viewport"'))
    warn(file, 1, "Kein viewport Meta-Tag");

  // Doppelte H1 (React-Apps mit SEO-Fallback dürfen mehrere H1 haben)
  const h1Count = (html.match(/<h1[\s>]/gi) || []).length;
  const isReactApp = html.includes("ReactDOM");
  if (h1Count > 1 && !isReactApp) err(file, 1, `${h1Count} H1-Tags gefunden (max. 1 erlaubt)`);
  if (h1Count > 1 && isReactApp) warn(file, 1, `${h1Count} H1-Tags (React-App mit SEO-Fallback)`);
  if (h1Count === 0 && !isReactApp) warn(file, 1, "Kein H1 gefunden");
}

// ─── Gate 2: SEO & Schema ───
function gate2(file, html) {
  // Meta Description
  const descMatch = html.match(/name="description"\s+content="([^"]*)"/);
  if (!descMatch) {
    err(file, 2, "Keine Meta-Description");
  } else if (descMatch[1].length > 160) {
    warn(file, 2, `Meta-Description zu lang: ${descMatch[1].length} Zeichen (max 160)`);
  } else if (descMatch[1].length < 50) {
    warn(file, 2, `Meta-Description sehr kurz: ${descMatch[1].length} Zeichen`);
  }

  // Title length
  const titleMatch = html.match(/<title>([^<]*)<\/title>/);
  if (titleMatch && titleMatch[1].length > 65) {
    warn(file, 2, `Title zu lang: ${titleMatch[1].length} Zeichen (max 65)`);
  }

  // Schema.org JSON-LD validierung
  const ldMatches = html.match(/type="application\/ld\+json">\s*(\{[\s\S]*?\})\s*<\/script/g);
  if (ldMatches) {
    for (const m of ldMatches) {
      const jsonStr = m.replace(/type="application\/ld\+json">\s*/, "").replace(/\s*<\/script$/, "");
      try { JSON.parse(jsonStr); }
      catch (e) { err(file, 2, `Ungültiges JSON-LD: ${e.message.substring(0, 60)}`); }
    }
  }
}

// ─── Gate 3: Sitemap-Konsistenz ───
function gate3(htmlFiles) {
  const sitemapPath = path.join(ROOT, "sitemap.xml");
  if (!fs.existsSync(sitemapPath)) {
    errors.push({ file: "sitemap.xml", gate: 3, msg: "sitemap.xml fehlt!" });
    return;
  }
  const sitemap = fs.readFileSync(sitemapPath, "utf-8");
  const sitemapUrls = new Set();
  const urlMatches = sitemap.matchAll(/<loc>(.*?)<\/loc>/g);
  for (const m of urlMatches) sitemapUrls.add(m[1].replace("https://machsleicht.de", "").replace(/\/$/, "") || "/");

  // Prüfe ob öffentliche Seiten in Sitemap sind
  for (const file of htmlFiles) {
    const rel = path.relative(ROOT, file);
    // Skip non-public files
    if (rel.startsWith("_dev") || rel === "homepage.html") continue;

    let urlPath;
    if (rel === "index.html") urlPath = "/";
    else if (rel.endsWith("/index.html")) urlPath = "/" + rel.replace(/\/index\.html$/, "");
    else urlPath = "/" + rel.replace(/\.html$/, "");

    if (!sitemapUrls.has(urlPath)) {
      warn(file, 3, `Nicht in sitemap.xml: ${urlPath}`);
    }
  }
}

// ─── Gate 4: Interne Links ───
function gate4(file, html, allPaths) {
  const linkMatches = html.matchAll(/href="(\/[^"#?]*?)"/g);
  for (const m of linkMatches) {
    let target = m[1];
    if (target === "/") continue; // Homepage always exists

    // Resolve to file path
    let candidates = [
      path.join(ROOT, target + ".html"),
      path.join(ROOT, target, "index.html"),
      path.join(ROOT, target),
    ];

    if (!candidates.some(c => allPaths.has(c))) {
      warn(file, 4, `Interner Link geht ins Leere: ${target}`);
    }
  }
}

// ─── Gate 5: Trust & Disclaimer ───
function gate5(file, html, rel) {
  // Kosten-Seiten brauchen Disclaimer
  const isKostenSeite = rel.includes("kosten") || rel.includes("mitgebsel") ||
    rel.includes("erstausstattung") || rel.includes("schultuete") ||
    rel.includes("torte") || rel.includes("adventskalender") ||
    rel.includes("babyparty") || rel.includes("essen");

  if (isKostenSeite && !html.includes("Richtwert") && !html.includes("Hinweis:")) {
    warn(file, 5, "Kosten-Seite ohne Disclaimer/Richtwert-Hinweis");
  }

  // Tool-Seiten brauchen Privacy-Hinweis
  if (html.includes("ReactDOM.createRoot") && html.includes('id="root"')) {
    if (!html.includes("bleiben auf deinem Ger") && !html.includes("nicht gespeichert")) {
      warn(file, 5, "Tool-Seite ohne Privacy-Hinweis");
    }
  }
}

// ─── Gate 6: Content-Qualität ───
function gate6(file, html) {
  // Unaufgelöste Platzhalter
  const placeholders = html.match(/\{\{[a-zA-Z_]+\}\}/g);
  if (placeholders) {
    err(file, 6, `Unaufgelöste Platzhalter: ${placeholders.join(", ")}`);
  }

  // Leere content-Attribute
  if (html.match(/content=""\s/)) {
    warn(file, 6, "Leeres content-Attribut gefunden");
  }

  // Word count (nur bei Content-Seiten, nicht bei React-Only)
  if (!html.includes("ReactDOM.createRoot") || html.includes("seo-content")) {
    const textOnly = html.replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ").trim();
    const wordCount = textOnly.split(/\s+/).length;
    if (wordCount < 200) {
      warn(file, 6, `Sehr wenig Text-Content: ~${wordCount} Wörter`);
    }
  }
}

// ─── Run ───
console.log("\n🔍 machsleicht.de — Validate\n" + "═".repeat(40));

const htmlFiles = getAllHTML(ROOT);
const allPaths = new Set(htmlFiles);
fileCount = htmlFiles.length;

console.log(`📄 ${fileCount} HTML-Dateien gefunden\n`);

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf-8");
  const rel = path.relative(ROOT, file);
  gate1(file, html);
  gate2(file, html);
  gate4(file, html, allPaths);
  gate5(file, html, rel);
  gate6(file, html);
}
gate3(htmlFiles);

// ─── Report ───
const gates = [
  "HTML-Grundlagen",
  "SEO & Schema",
  "Sitemap-Konsistenz",
  "Interne Links",
  "Trust & Disclaimer",
  "Content-Qualität"
];

for (let g = 1; g <= 6; g++) {
  const gateErrors = errors.filter(e => e.gate === g);
  const gateWarnings = warnings.filter(w => w.gate === g);
  const status = gateErrors.length ? "❌ FAIL" : gateWarnings.length ? "⚠️  WARN" : "✅ PASS";
  console.log(`Gate ${g} — ${gates[g-1]}: ${status}`);
  for (const e of gateErrors) console.log(`  ❌ ${e.file}: ${e.msg}`);
  for (const w of gateWarnings) console.log(`  ⚠️  ${w.file}: ${w.msg}`);
}

console.log("\n" + "═".repeat(40));
console.log(`Ergebnis: ${errors.length} Fehler, ${warnings.length} Warnungen`);

if (errors.length > 0) {
  console.log("\n🚫 DEPLOY BLOCKED — Fehler müssen behoben werden.\n");
  process.exit(1);
} else if (warnings.length > 0) {
  console.log("\n⚠️  Deploy möglich, aber Warnungen prüfen.\n");
  process.exit(0);
} else {
  console.log("\n✅ Alles sauber — Deploy frei!\n");
  process.exit(0);
}
