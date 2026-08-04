/* Stufe 13: Ergibt ein Sortier-Raetsel wirklich sein versprochenes Loesungswort?
 *
 * Die Codeknacker-Stationen funktionieren so: eine Liste mit Zahlen, eine Regel
 * ("vom groessten zum kleinsten"), und die Anfangsbuchstaben der sortierten Reihe
 * ergeben ein Wort. Steht die Regel gegen die Zahlen, bekommt das Kind
 * Buchstabensalat — und der prepText sagt ihm dann, es habe falsch sortiert.
 *
 * meerjungfrau-gross hatte genau das (04.08.): 1800/600/1300/180/90 absteigend
 * ergibt PRELE, versprochen war PERLE. Gefunden hat es ein Reviewer, nicht der
 * Linter. Und beim Fixen habe ich nur eine der ZWEI identischen Kopien im selben
 * File erwischt — auch das faengt diese Regel.
 *
 * Geprueft wird ausserdem auf Gleichstand: zwei gleiche Zahlen machen die
 * Reihenfolge mehrdeutig, dann ist das Raetsel auch bei richtiger Regel nicht
 * eindeutig loesbar.
 */
import { readFileSync, readdirSync } from 'node:fs';

const LOESUNG = /→\s*([A-ZÄÖÜ](?:-[A-ZÄÖÜ]){2,})/;
/* "Name 1800 /" oder "Name (6) /" oder "Name 1 m /" — Zahl auch mit Komma/Vorzeichen */
/* Der Name beginnt am Listenanfang oder direkt nach einem Trenner — sonst
   gewinnt bei "Aurelia (Ohrenqualle) 10 cm" der Klammerinhalt und das Raetsel
   wird faelschlich als kaputt gemeldet (erster Trockenlauf, 04.08.). */
const PAAR = /(?:^|[/,])\s*([A-ZÄÖÜ][^/,(]*?)\s*(?:\([^)]*\))?\s*\(?\s*([+−-]?\d+(?:[.,]\d+)?)\s*(?:sm|cm|m|×|x)?\s*\)?\s*(?=[/,→])/g;

const ABSTEIGEND = /gr(ö|oe)ßten?\s+zum\s+kleinsten|absteigend|schwersten?\s+zum|l(ä|ae)ngsten?\s+zum|tiefsten?\s+zum\s+flachsten|hellsten?\s+zum/i;
const AUFSTEIGEND = /kleinsten?\s+zum\s+gr(ö|oe)ßten|aufsteigend|flachsten?\s+zum\s+tiefsten|leichtesten?\s+zum|k(ü|ue)rzesten?\s+zum|n(ä|ae)chsten?\s+zum/i;

function zahlenAus(s) {
  const raus = [];
  let m;
  PAAR.lastIndex = 0;
  while ((m = PAAR.exec(s + ' →')) !== null) {
    const name = m[1].trim().replace(/[—–-]\s*$/, '').trim();
    const z = parseFloat(m[2].replace('−', '-').replace(',', '.'));
    if (name && isFinite(z)) raus.push({ name, z });
  }
  return raus;
}

const BEKANNT = new Set([
  /* Altlasten vor der Regel. Aufloesen -> Zeile streichen. */
]);

let fehler = 0, alt = 0, geprueft = 0;
for (const f of readdirSync('data/motto').filter((x) => x.endsWith('.json')).sort()) {
  const name = f.slice(0, -5);
  const d = JSON.parse(readFileSync('data/motto/' + f, 'utf8'));
  const lauf = (o, pfad) => {
    if (Array.isArray(o)) return o.forEach((v, i) => lauf(v, `${pfad}[${i}]`));
    if (o && typeof o === 'object') return Object.entries(o).forEach(([k, v]) => lauf(v, `${pfad}.${k}`));
    if (typeof o !== 'string') return;
    const mm = LOESUNG.exec(o);
    if (!mm) return;
    const paare = zahlenAus(o);
    const soll = mm[1].replace(/-/g, '');
    if (paare.length !== soll.length) return;   /* keine Zahlen-Liste — z.B. Reihenfolge-Raetsel ohne Werte */
    geprueft++;

    const richtung = ABSTEIGEND.test(o) ? -1 : AUFSTEIGEND.test(o) ? 1 : 0;
    const probe = (r) => {
      const s = [...paare].sort((a, b) => r * (a.z - b.z));
      return { wort: s.map((x) => x.name[0].toUpperCase()).join(''), folge: s };
    };
    /* Steht die Richtung nicht in DIESEM Satz, gilt das Raetsel als loesbar,
       wenn EINE der beiden Richtungen aufgeht — die Regel steht dann im
       Nachbarschritt. Geht keine auf, ist es kaputt. */
    const kandidaten = richtung ? [probe(richtung)] : [probe(-1), probe(1)];
    const treffer = kandidaten.find((k) => k.wort === soll);

    const zahlen = (treffer || kandidaten[0]).folge.map((x) => x.z);
    const gleich = zahlen.some((z, i) => i && z === zahlen[i - 1]);

    const key = `${name}${pfad}`;
    if (!treffer || gleich) {
      const zeile = `    ${name}${pfad}: sortiert "${kandidaten.map(k=>k.wort).join('" oder "')}" — versprochen "${soll}"${gleich ? ' (Gleichstand: mehrdeutig)' : ''}`;
      if (BEKANNT.has(key)) { alt++; console.log('    (bekannt)' + zeile.slice(4)); }
      else { fehler++; console.log(zeile); }
    }
  };
  lauf(d, '');
}
console.log(`    ${geprueft} Sortier-Raetsel geprueft, ${fehler} ergeben ihr Loesungswort nicht` + (alt ? `, ${alt} bekannt` : ''));
process.exit(fehler ? 1 : 0);
