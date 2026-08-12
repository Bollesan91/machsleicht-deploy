/* Maschinen-Abnahme (Bolle 12.08.: "es geht nicht darum einzelne Mottos
   abzunehmen, sondern die Maschine").

   Rendert JEDES Paket in JEDER Altersgruppe und JEDER Variante echt im DOM
   (jsdom, derselbe Renderer wie im Browser) und prueft Invarianten, die fuer
   ALLE gelten muessen. Ein Motto ist damit kein Pruefobjekt mehr, sondern ein
   Datenpunkt: faellt eine Invariante, ist die MASCHINE nicht abgenommen.

   Aufruf:  node _dev/scripts/maschinen-abnahme.js
   Exit 1, sobald eine Invariante in irgendeiner Ausprägung bricht.
*/
const fs = require('fs');
const path = require('path');
const { JSDOM, VirtualConsole } = require('jsdom');

const WURZEL = process.cwd();
const MOTTOS = ['baustelle', 'dino', 'feuerwehr', 'meerjungfrau', 'piraten', 'ritter'];
const GRUPPEN = { klein: 4, mittel: 7, gross: 10 };
const VARIANTEN = ['minimal', 'standard', 'wow'];

// Was ein riskanter Einkaufsposten ist — gleiche Liste wie Linter-Stufe 39,
// inklusive der Substring-Fallen, die am 12.08. auffielen: "Feuer" matchte
// "Feuerwehr" (32 Fehlalarme), "Pins" matchte "Pinsel".
const RX_RISIKO = new RegExp([
  'echtes?\\s+Werkzeug', 'Werkzeug-Set', 'Werkzeug-Premium', 'Werkzeug\\s+Wow', 'Gravurwerkzeug',
  'Säge', 'Bohrer', 'Hammer', 'Nägel', 'Metall-Schrauben', 'Cutter', 'Messer', 'Sushi',
  'Heißkleb', 'Kerze', 'Wunderkerze', 'Lagerfeuer', 'Feuerzeug', 'Bügeleisen', 'Fackel',
  'Gips', 'Waschsoda', 'Natron', 'Essig', 'Glycerin', 'Spray', 'Farbpulver', 'Tinte',
  'Schutzbrille',
  'Luftballon', 'Goldmünzen', 'Schoko-Münzen', 'Murmeln', '\\bPerlen\\b', '\\bPins\\b', 'Magnet',
].join('|'), 'i');

function lokal(pfad) {
  const rel = pfad.replace(/^https?:\/\/[^/]+/, '').split('?')[0];
  return path.join(WURZEL, decodeURIComponent(rel));
}

async function render(motto, gruppe, alter) {
  const datei = path.join(WURZEL, 'paket', motto, 'index.html');
  let html = fs.readFileSync(datei, 'utf8');
  // <script src> VOR dem Parsen einsetzen — sonst laeuft das Inline-Skript,
  // bevor paket-core.js da ist ("PaketCore is not defined").
  html = html.replace(/<script\s+src="([^"]+)"[^>]*><\/script>/g, (treffer, src) => {
    const p = lokal(src);
    return fs.existsSync(p) ? '<script>' + fs.readFileSync(p, 'utf8') + '</script>' : treffer;
  });
  const vc = new VirtualConsole();
  const fehler = [];
  vc.on('jsdomError', e => fehler.push(String(e && e.message).slice(0, 200)));

  const dom = new JSDOM(html, {
    url: `http://localhost/paket/${motto}/index.html?demo=1&age=${alter}`,
    runScripts: 'dangerously',
    resources: undefined,
    virtualConsole: vc,
    beforeParse(win) {
      // Skripte und Daten von der Platte statt aus dem Netz
      win.fetch = async (u) => {
        const p = lokal(String(u));
        if (!fs.existsSync(p)) return { ok: false, status: 404, json: async () => ({}) };
        const txt = fs.readFileSync(p, 'utf8');
        return { ok: true, status: 200, json: async () => JSON.parse(txt), text: async () => txt };
      };
      win.matchMedia = () => ({ matches: false, addListener() {}, removeListener() {} });
      win.scrollTo = () => {};
    },
  });

  dom.window.document.dispatchEvent(new dom.window.Event('DOMContentLoaded', { bubbles: true }));
  await new Promise(r => setTimeout(r, 400));
  return { dom, fehler };
}

// body.textContent enthaelt auch den Quelltext der Inline-Skripte — darin
// stehen "undefined" und "NaN" als Code, nicht als Druckbild. Deshalb erst
// Skripte/Styles aus einer Kopie entfernen (Falle beim ersten Lauf 12.08.).
function sichtbar(dom) {
  const kopie = dom.window.document.body.cloneNode(true);
  kopie.querySelectorAll('script, style, template, noscript').forEach(e => e.remove());
  return kopie.textContent || '';
}

function pruefe(text, dom, motto, gruppe, variante, daten) {
  const m = [];
  const roh = text.match(/\{n:\w+\}/g);
  if (roh) m.push(`roher Platzhalter ${roh[0]}`);
  for (const gift of ['undefined', 'NaN', '[object Object]', 'null null']) {
    if (text.includes(gift)) m.push(`"${gift}" im Druck`);
  }
  const v = (daten.variants || []).find(x => x.id === variante) || {};

  // Summe der Pflichtposten == ausgewiesene Kostenangabe
  const liste = v.shoppingList || [];
  const optional = it => /^Optional:/.test(it.label || '') || /\(([^)]*\boptional\b[^)]*)\)/i.test(it.label || '');
  const pflicht = liste.filter(it => !optional(it))
    .reduce((s, it) => s + (typeof it.priceEur === 'number' ? it.priceEur : 0), 0);
  if (liste.length && typeof v.estimatedCostEur === 'number'
      && Math.abs(Math.round(pflicht) - v.estimatedCostEur) > 1) {
    m.push(`Einkauf ${Math.round(pflicht)} € vs. ausgewiesene ${v.estimatedCostEur} €`);
  }
  // Riskantes Material braucht seine Regel — und sie muss GEDRUCKT sein
  for (const it of liste) {
    if (!RX_RISIKO.test(it.label || '')) continue;
    if (!(it.safetyNote || '').trim()) { m.push(`"${(it.label || '').slice(0, 40)}" ohne safetyNote`); continue; }
    if (!text.includes((it.safetyNote || '').slice(0, 40))) {
      m.push(`safetyNote von "${(it.label || '').slice(0, 30)}" steht in den Daten, wird aber nicht gedruckt`);
    }
  }
  // Der Ablaufplan muss eine Party tragen
  const zeilen = [...dom.window.document.querySelectorAll('.trow, .timeline-row, .tl .row')].length;
  if (!text.includes('Ablaufplan') && !text.includes('Seite 2')) m.push('kein Ablaufplan-Blatt');
  return m;
}

(async () => {
  const zeilen = [];
  let fehlerhaft = 0;
  for (const motto of MOTTOS) {
    for (const [gruppe, alter] of Object.entries(GRUPPEN)) {
      const datenPfad = path.join(WURZEL, 'data', 'motto', `${motto}-${gruppe}.json`);
      if (!fs.existsSync(datenPfad)) continue;
      const daten = JSON.parse(fs.readFileSync(datenPfad, 'utf8'));
      let dom, fehler;
      try {
        ({ dom, fehler } = await render(motto, gruppe, alter));
      } catch (e) {
        zeilen.push([motto, gruppe, '-', `RENDER-ABBRUCH: ${String(e.message).slice(0, 90)}`]);
        fehlerhaft++;
        continue;
      }
      for (const variante of VARIANTEN) {
        const btn = [...dom.window.document.querySelectorAll('button')]
          .find(b => b.dataset && b.dataset.v === variante);
        if (btn) btn.click();
        const text = sichtbar(dom);
        if (text.length < 2000) {
          zeilen.push([motto, gruppe, variante, `nur ${text.length} Zeichen gerendert`]);
          fehlerhaft++;
          continue;
        }
        const m = pruefe(text, dom, motto, gruppe, variante, daten);
        if (fehler.length) m.push(`JS-Fehler: ${fehler[0]}`);
        if (m.length) { fehlerhaft++; zeilen.push([motto, gruppe, variante, m.join(' · ')]); }
        else zeilen.push([motto, gruppe, variante, 'OK']);
      }
      dom.window.close();
    }
  }
  const ok = zeilen.filter(z => z[3] === 'OK').length;
  console.log('\n=== MASCHINEN-ABNAHME ===');
  for (const z of zeilen) {
    if (z[3] !== 'OK') console.log(`  FAIL ${z[0]}/${z[1]}/${z[2]}: ${z[3]}`);
  }
  console.log(`\n  ${ok}/${zeilen.length} Ausprägungen sauber gerendert (${MOTTOS.length} Pakete × 3 Gruppen × 3 Varianten)`);
  process.exit(fehlerhaft ? 1 : 0);
})();
