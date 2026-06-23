#!/usr/bin/env node
/**
 * generate-sitemap.js — Automatische Sitemap-Generierung für machsleicht.de
 *
 * Liest alle HTML-Dateien im Repo, gleicht mit _redirects ab,
 * und generiert eine saubere sitemap.xml mit korrekten URLs.
 *
 * Aufruf: node _dev/scripts/generate-sitemap.js
 * Wird automatisch bei jedem "Ende" ausgeführt.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '../..');
const DOMAIN = 'https://machsleicht.de';
const TODAY = new Date().toISOString().slice(0, 10);

// EHRLICHES lastmod: Datum der letzten ECHTEN inhaltlichen Git-Änderung pro Datei
// (statt pauschal TODAY -> Google entwertet gefälschte/uniforme lastmod-Stempel).
// Cache, damit nicht pro URL erneut git aufgerufen wird.
const _lastmodCache = {};
function getLastmod(filePath) {
  if (_lastmodCache[filePath] !== undefined) return _lastmodCache[filePath];
  let d = TODAY; // Fallback: neue/ungetrackte Datei
  try {
    const out = execSync(`git log -1 --format=%cs -- "${filePath}"`, { cwd: ROOT, encoding: 'utf-8' }).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(out)) d = out;
  } catch (e) { /* kein Git / kein History-Eintrag -> TODAY */ }
  _lastmodCache[filePath] = d;
  return d;
}

// Ordner/Dateien die NICHT in die Sitemap gehören
const IGNORE_DIRS = ['_dev', '.claude', 'node_modules', '.git', '_headers', '_redirects'];
const IGNORE_FILES = ['404.html'];

// Themenfremde „andere Anlässe" (Baby/Einschulung/Saisonal/Familie): existieren als 200,
// aber während der SEO-Erholung BEWUSST aus der Sitemap (thematischer Fokus = Kindergeburtstag).
// Nicht-destruktiv (kein noindex, Seiten bleiben erreichbar) -> später reversibel, falls sie
// ein eigenes Standbein werden. Entscheid Bolle 23.06.2026. Clean-URLs ohne Trailing-Slash.
const SITEMAP_EXCLUDE = new Set([
  '/adventskalender-fuellen', '/autofahrt-kinder-checkliste',
  '/baby', '/baby-erstausstattung-checkliste', '/babyparty-checkliste',
  '/einschulung', '/einschulung-checkliste',
  '/familienreise-packliste', '/kita-start-checkliste', '/kliniktasche-packen',
  '/oster-eiersuche', '/schultuete-fuellen', '/umzug-mit-kind-checkliste',
  '/wochenbett-was-braucht-man'
]);

// Priority-Regeln
function getPriority(urlPath) {
  if (urlPath === '/') return '1.0';
  if (urlPath === '/kindergeburtstag' || urlPath === '/schatzsuche') return '0.9';
  if (urlPath.match(/^\/kindergeburtstag\/(safari|piraten|weltraum|dino|einhorn|feuerwehr)$/)) return '0.8';
  if (urlPath.match(/^\/schatzsuche\/(piraten|dschungel|weltraum|detektiv|dino|feen)$/)) return '0.8';
  if (urlPath.match(/^\/kindergeburtstag\/.+/)) return '0.6';
  if (urlPath.match(/^\/einschulung|^\/baby$/)) return '0.8';
  if (urlPath.match(/guide$/)) return '0.7';
  if (urlPath.match(/checkliste|packliste/)) return '0.6';
  return '0.7';
}

// Changefreq-Regeln
function getChangefreq(urlPath) {
  if (urlPath === '/' || urlPath === '/kindergeburtstag' || urlPath === '/schatzsuche') return 'weekly';
  if (urlPath.match(/^\/einschulung$|^\/baby$/)) return 'weekly';
  return 'monthly';
}

// Alle HTML-Dateien finden (rekursiv, aber nur deployed Ordner)
function findHtmlFiles(dir, base = '') {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.join(base, entry.name);

    if (entry.isDirectory()) {
      if (IGNORE_DIRS.includes(entry.name) || entry.name.startsWith('.')) continue;
      results.push(...findHtmlFiles(fullPath, relPath));
    } else if (entry.name.endsWith('.html') && !IGNORE_FILES.includes(entry.name)) {
      // Windows-Fix: path.join liefert Backslashes -> URLs brauchen Forward-Slashes
      results.push(relPath.split(path.sep).join('/'));
    }
  }
  return results;
}

// _redirects lesen für URL-Mapping
function loadRedirects() {
  const redirectsFile = path.join(ROOT, '_redirects');
  if (!fs.existsSync(redirectsFile)) return {};
  const map = {};
  const lines = fs.readFileSync(redirectsFile, 'utf-8').split('\n');
  for (const line of lines) {
    const parts = line.trim().split(/\s+/);
    if (parts.length >= 3 && parts[2] === '200') {
      // parts[1] = source file path, parts[0] = clean URL
      map[parts[1].replace(/^\//, '')] = parts[0];
    }
  }
  return map;
}

// Clean-URLs, die per 301/302/410 weiterleiten -> dürfen NICHT in die Sitemap
// (sonst landen die dünnen Einzeljahr-Doorway-Seiten wieder drin -> De-Index-Regress).
// Status-Code steht in parts[2] als 301, 301!, 302, 410 etc.
function loadRedirectSources() {
  const redirectsFile = path.join(ROOT, '_redirects');
  const set = new Set();
  if (!fs.existsSync(redirectsFile)) return set;
  for (const line of fs.readFileSync(redirectsFile, 'utf-8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const parts = t.split(/\s+/);
    if (parts.length >= 3 && /^(30[12]|410)!?$/.test(parts[2])) {
      set.add(parts[0].replace(/\/$/, '')); // Quelle als Clean-URL (ohne Trailing-Slash)
    }
  }
  return set;
}

// Prüft ob eine HTML-Datei noindex gesetzt hat
function isNoIndex(filePath) {
  const content = fs.readFileSync(path.join(ROOT, filePath), 'utf-8');
  return /meta\s+name=["']robots["'][^>]*content=["'][^"']*noindex/.test(content);
}

// HTML-Datei → URL konvertieren
function fileToUrl(filePath, redirects) {
  // Prüfe ob ein Redirect existiert
  const asRedirectKey = '/' + filePath;
  for (const [src, cleanUrl] of Object.entries(redirects)) {
    if (src === filePath) return cleanUrl;
  }

  // Fallback: .html entfernen
  let url = '/' + filePath.replace(/\.html$/, '');

  // index.html → Ordner-URL mit Trailing-Slash (konsistent mit Canonicals, s. GSC-Fix 08.06.2026)
  if (url.endsWith('/index')) {
    url = url.replace(/\/index$/, '/');
    if (url === '/') return '/';
  }

  // homepage.html → überspringen (Duplikat von index)
  if (filePath === 'homepage.html') return null;

  return url;
}

// Sitemap generieren
function generateSitemap() {
  const redirects = loadRedirects();
  const redirectSources = loadRedirectSources();
  const htmlFiles = findHtmlFiles(ROOT);

  const urls = new Map(); // URL → priority (dedupliziert)
  let skippedRedirect = 0;
  let skippedExclude = 0;

  for (const file of htmlFiles) {
    const url = fileToUrl(file, redirects);
    if (!url) continue;

    // 301/410-Quellen (z.B. dünne Einzeljahr-Doorway-Seiten) NICHT in die Sitemap
    if (redirectSources.has(url.replace(/\/$/, ''))) { skippedRedirect++; continue; }

    // Themenfremde „andere Anlässe" während der Erholung bewusst raus (s. SITEMAP_EXCLUDE)
    if (SITEMAP_EXCLUDE.has(url.replace(/\/$/, ''))) { skippedExclude++; continue; }

    // noindex-Seiten nicht in die Sitemap aufnehmen
    if (isNoIndex(file)) continue;

    const fullUrl = DOMAIN + url;
    if (!urls.has(fullUrl)) {
      urls.set(fullUrl, {
        loc: fullUrl,
        lastmod: getLastmod(file),
        changefreq: getChangefreq(url),
        priority: getPriority(url)
      });
    }
  }

  // Nach Priority sortieren (höchste zuerst), dann alphabetisch
  const sorted = [...urls.values()].sort((a, b) => {
    const prioDiff = parseFloat(b.priority) - parseFloat(a.priority);
    if (prioDiff !== 0) return prioDiff;
    return a.loc.localeCompare(b.loc);
  });

  // XML generieren
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const entry of sorted) {
    xml += '  <url>\n';
    xml += `    <loc>${entry.loc}</loc>\n`;
    xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
    xml += `    <priority>${entry.priority}</priority>\n`;
    xml += '  </url>\n';
  }

  xml += '</urlset>\n';

  const outPath = path.join(ROOT, 'sitemap.xml');
  fs.writeFileSync(outPath, xml);

  console.log(`Sitemap generiert: ${sorted.length} URLs → sitemap.xml (${TODAY}); ${skippedRedirect} 301/410-Quellen + ${skippedExclude} themenfremde übersprungen`);
}

generateSitemap();
