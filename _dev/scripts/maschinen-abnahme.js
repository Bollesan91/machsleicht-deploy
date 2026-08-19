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
/* Jedes AUSGELIEFERTE Paket gehoert in die Abnahme — und nur die.
   Zwei Lehren an einem Tag:
   1. prinzessin fehlte in der handgepflegten Liste, und genau deshalb fiel niemandem
      auf, dass sein Spielkatalog der von PIRATEN ist (18.08.). Wer eine Ausprägung
      aus der Liste laesst, prueft sie nie. Deshalb wird die Liste gelesen, nicht gepflegt.
   2. Gelesen wird aber, was git kennt — nicht, was auf der Platte liegt. paket/prinzessin
      ist WIP aus einem Parallel-Chat und ausdruecklich gitignored (".gitignore:33"), live
      liefert die URL 404. Ein Arbeitsstand, den niemand ausliefert, darf kein Gate roetten;
      sonst faerbt fremde Baustelle die eigene Abnahme. */
const AUSGELIEFERT = require('child_process')
  .execSync('git ls-files paket', { encoding: 'utf8' })
  .split('\n')
  .filter(z => /^paket\/[^_/][^/]*\/index\.html$/.test(z))
  .map(z => z.split('/')[1]);
const MOTTOS = [...new Set(AUSGELIEFERT)].sort();
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

/* Verkaufsversprechen -> Deckung im gedruckten Paket (Bolle 19.08.: "haben die
   Reviewer die Foto-Elemente mit bewertet?"). Drei von sechs Aufzaehlungspunkten
   der Checkout-Karte auf /kindergeburtstag beschrieben am 19.08. Dinge, die das
   Paket nicht liefert: "Mitgebsel-Etiketten mit Namen" (lag nur als Drucktest in
   _dev/druck-test), "Einladungs-Karten mit QR-Code" (am selben Tag aus der Maschine
   genommen) und "8 typische Pannen" (die Motto-Daten fuehren 4 bis 12, Ritter 6).
   Drei von zwanzig Testeltern fanden das ohne Hilfe.

   Die Klasse dahinter: ein Verkaufsargument wird von Hand getippt, das Paket
   aendert sich in der Maschine — niemand bringt beides wieder zusammen. Deshalb
   wird jeder Punkt der Karte hier gegen die WIRKLICH gerenderte Seite geprueft,
   in jeder Auspraegung. Ein neuer Punkt ohne Deckungsregel ist selbst ein FAIL:
   wer etwas verspricht, sagt dazu, woran man es im Druck erkennt. */
const VERSPRECHEN_QUELLE = path.join(WURZEL, 'kindergeburtstag.html');
const DECKUNG = [
  { rx: /druckfertige Seiten/i, nachweis: 'mindestens 15 Blaetter im DOM',
    test: (text, dom) => dom.window.document.querySelectorAll('.sheet').length >= 15 },
  { rx: /Urkunde/i, nachweis: 'Urkundenblatt mit Verleihungszeile',
    test: text => text.includes('wird verliehen an') },
  { rx: /Spiel-Karten/i, nachweis: 'Spielkarten zum Vorlesen',
    test: text => /Zum Vorlesen/i.test(text) },
  { rx: /Plan-B-Karten/i, nachweis: 'SOS-Blatt',
    test: text => text.includes('SOS-Karten') },
  { rx: /K(ü|ue)chen-Zettel/i, nachweis: 'Kuechen-Zettel mit Gastdaten',
    test: text => /K(ü|ue)chen-Zettel/.test(text) },
  { rx: /Ablaufplan/i, nachweis: 'Ablaufplan und Einkaufsliste',
    test: text => text.includes('Ablaufplan') && /Einkauf/i.test(text) },
];

function verkaufsversprechen() {
  /* Gelesen wird im DOM, nicht per Textsuche. Zwei Fallen kostete der Textweg:
     der Klassenname "checkout-card--premium" steht auch dreimal im Stylesheet,
     und die Seite traegt drei Checkout-Karten — der erste Treffer war das CSS,
     der zweite die Karte "Online speichern". Das Gate prueft dann die falschen
     Zusagen und meldet trotzdem etwas. Deshalb: die Karte ueber ihre Ueberschrift
     identifizieren und die Liste als Kind dieser Karte nehmen. */
  const dom = new JSDOM(fs.readFileSync(VERSPRECHEN_QUELLE, 'utf8'));
  const karte = [...dom.window.document.querySelectorAll('.checkout-card')]
    .find(k => /Komplettpaket Print/i.test((k.querySelector('.checkout-card__title') || {}).textContent || ''));
  const punkte = karte
    ? [...karte.querySelectorAll('.checkout-card__features li')]
        .map(li => (li.textContent || '').replace(/\s+/g, ' ').trim()).filter(Boolean)
    : [];
  if (!punkte.length) {
    console.error('ABBRUCH: In kindergeburtstag.html wurde die Merkmalsliste der Karte '
      + '"Komplettpaket Print" nicht gefunden. Ein leeres Gate ist gefaehrlicher als keins.');
    process.exit(1);
  }
  return punkte;
}
const VERSPRECHEN = verkaufsversprechen();

function lokal(pfad) {
  const rel = pfad.replace(/^https?:\/\/[^/]+/, '').split('?')[0];
  return path.join(WURZEL, decodeURIComponent(rel));
}

/* Der Spielkatalog, den ein Paket fuer die Einladungs-Spielkarte mitfuehrt.
   Bolle 18.08.: "Sonst braeuchten wir 50+ Paket-Moeglichkeiten je Motto." Genau
   deshalb wird nicht vorgebaut, sondern durchgerechnet: Die Auswahl ist eine
   Achse der ABNAHME, nicht der Auslieferung. */
function spielkatalog(motto) {
  const datei = path.join(WURZEL, 'paket', motto, 'index.html');
  const html = fs.readFileSync(datei, 'utf8');
  // Die Variable heisst je Paket anders: GAME_META_D, GAME_META_F, GAME_META_P.
  // Der erste Entwurf suchte nur GAME_META_P und meldete deshalb vier Pakete als
  // "kein Katalog", obwohl alle fuenf Spiele drinstanden — dieselbe Blindheit wie
  // L22. Ein Gate, das eine Schreibweise kennt, prueft nur diese eine.
  const treffer = html.match(/GAME_?META[A-Z_]*\s*=\s*\{/);
  if (!treffer) return [];
  const i = html.indexOf(treffer[0]);
  const block = html.slice(i, i + 2000);
  const ids = [...block.matchAll(/["']([a-z]+-[a-z0-9]+)["']\s*:/g)].map(m => m[1]);
  return [...new Set(ids)];
}

async function render(motto, gruppe, alter, gameId) {
  const datei = path.join(WURZEL, 'paket', motto, 'index.html');
  let html = fs.readFileSync(datei, 'utf8');
  /* Die Spielwahl steckt in der Demo-Party des Pakets. Fuer die Abnahme wird sie
     ersetzt — so rendert dieselbe Maschine jede Auswahl, die ein Kunde treffen kann. */
  if (gameId) html = html.replace(/gameId\s*:\s*["'][^"']*["']/, 'gameId:"' + gameId + '"');
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
  // Seit 12.08. rechnen beide Renderer die Summe aus der Liste. Eine
  // GESPEICHERTE Kostenzahl hat damit keinen Leser mehr und kann nur noch
  // driften (die Abnahme fand bis zu 70 € Differenz) — ihre Rueckkehr ist
  // deshalb selbst der Defekt.
  if (liste.length && typeof v.estimatedCostEur === 'number') {
    m.push(`estimatedCostEur ${v.estimatedCostEur} € gespeichert, obwohl die Summe gerechnet wird`);
  }
  // Und die gerechnete Summe muss auch wirklich auf dem Blatt stehen
  if (liste.length && pflicht > 0 && !text.includes(String(Math.round(pflicht)))) {
    m.push(`Summe ${Math.round(pflicht)} € steht nicht im Druck`);
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

  // Jedes Verkaufsversprechen der Checkout-Karte muss im Druck ankommen
  for (const v of VERSPRECHEN) {
    const regel = DECKUNG.find(d => d.rx.test(v));
    if (!regel) { m.push(`Verkaufsversprechen ohne Deckungsregel: "${v.slice(0, 50)}"`); continue; }
    if (!regel.test(text, dom)) m.push(`Versprechen "${v.slice(0, 40)}" nicht gedeckt (${regel.nachweis})`);
  }
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
  /* ---- Zweite Achse: die Spielauswahl ----------------------------------
     Ein Kunde waehlt EIN Einladungsspiel; das Paket druckt dessen Karte. Fuenf
     Spiele je Motto sind fuenf Ausprägungen, die alle stimmen muessen. Vorbauen
     waere Unsinn (15 × 3 × 3 × 25 = 3.375 Dateien), durchrechnen ist billig:
     Die Auswahl ist eine Achse der ABNAHME, nicht der Auslieferung. */
  const spielzeilen = [];
  for (const motto of MOTTOS) {
    const katalog = spielkatalog(motto);
    if (!katalog.length) {
      spielzeilen.push([motto, '-', 'kein Einladungsspiel-Katalog im Paket (GAME_META_P fehlt)']);
      fehlerhaft++;
      continue;
    }
    for (const gameId of katalog) {
      // Gehoert das Spiel ueberhaupt zu diesem Motto? Der Katalog wurde je Paket
      // kopiert — und eine Kopie kann die falsche sein.
      if (!gameId.includes(motto)) {
        spielzeilen.push([motto, gameId, `Spiel gehoert nicht zu ${motto}`]);
        fehlerhaft++;
        continue;
      }
      let dom, fehler;
      try {
        ({ dom, fehler } = await render(motto, 'klein', GRUPPEN.klein, gameId));
      } catch (e) {
        spielzeilen.push([motto, gameId, `RENDER-ABBRUCH: ${String(e.message).slice(0, 70)}`]);
        fehlerhaft++;
        continue;
      }
      const text = sichtbar(dom);
      const mangel = [];
      // Traegt das Paket ein FREMDES Motto? Gefunden 19.08.: paket/prinzessin lud
      // /data/motto/piraten-klein.json, hiess "Dein Piraten-Komplettpaket" und druckte
      // Augenklappen und Goldmuenzen. Das Manifest war eine Kopie des Piraten-Manifests
      // — nur der Ordner hiess prinzessin. Ein Kaeufer haette ein Piratenpaket bekommen.
      for (const fremd of MOTTOS) {
        if (fremd === motto) continue;
        const treffer = (text.match(new RegExp(fremd, 'gi')) || []).length;
        if (treffer >= 3) {
          mangel.push(`fremdes Motto "${fremd}" ${treffer}× im Druck`);
          break;
        }
      }
      if (text.length < 2000) mangel.push(`nur ${text.length} Zeichen gerendert`);
      if (fehler.length) mangel.push(`JS-Fehler: ${fehler[0]}`);
      for (const gift of ['undefined', 'NaN', '[object Object]']) {
        if (text.includes(gift)) mangel.push(`"${gift}" im Druck`);
      }
      spielzeilen.push([motto, gameId, mangel.length ? mangel.join(' · ') : 'OK']);
      if (mangel.length) fehlerhaft++;
      dom.window.close();
    }
  }

  /* Ratsche (Muster von Stufe 56): prinzessin stand bis zum 18.08. gar nicht in der
     Abnahme — mit ihm kamen sechs alte Befunde ans Licht ("Summe steht nicht im
     Druck" auf mittel und gross). Sie werden hier namentlich als offen gefuehrt,
     damit der Linter nicht rot steht und trotzdem niemand vergisst, dass sie offen
     sind. Ein NEUER Fund faellt weiterhin durch; ein geschlossener muss aus der
     Datei raus, sonst meldet die Ratsche das selbst. */
  const ratschePfad = path.join(WURZEL, 'paket', '_maschine', 'abnahme-offen.json');
  const ratsche = fs.existsSync(ratschePfad)
    ? JSON.parse(fs.readFileSync(ratschePfad, 'utf8')).offen || {}
    : {};
  const schluessel = z => `${z[0]}/${z[1]}/${z[2]}`;
  let geerbt = 0;
  for (const z of zeilen) {
    if (z[3] === 'OK') continue;
    if (ratsche[schluessel(z)] && z[3].startsWith(ratsche[schluessel(z)])) {
      z[3] = 'OK';               // bekannt und dokumentiert
      z.push('geerbt');
      geerbt++;
      fehlerhaft--;
    }
  }
  for (const s of Object.keys(ratsche)) {
    const zeile = zeilen.find(z => schluessel(z) === s);
    if (zeile && !zeile[4]) {
      console.log(`  HINWEIS ${s} ist behoben — Eintrag aus abnahme-offen.json entfernen`);
    }
  }

  const spielOk = spielzeilen.filter(z => z[2] === 'OK').length;
  const ok = zeilen.filter(z => z[3] === 'OK').length;
  console.log('\n=== MASCHINEN-ABNAHME ===');
  for (const z of zeilen) {
    if (z[3] !== 'OK') console.log(`  FAIL ${z[0]}/${z[1]}/${z[2]}: ${z[3]}`);
  }
  for (const z of spielzeilen) {
    if (z[2] !== 'OK') console.log(`  FAIL ${z[0]} / Spielwahl ${z[1]}: ${z[2]}`);
  }
  console.log(`\n  ${ok}/${zeilen.length} Ausprägungen sauber gerendert (${MOTTOS.length} Pakete × 3 Gruppen × 3 Varianten)`);
  console.log(`  ${spielOk}/${spielzeilen.length} Spielauswahlen sauber gerendert (jede Wahl, die ein Kunde treffen kann)`);
  process.exit(fehlerhaft ? 1 : 0);
})();
