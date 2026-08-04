/* Stufe 12: Passt das Programm jeder Variante in ihr eigenes Zeitfenster?
 *
 * Warum das eine Regel braucht: Der gedruckte Ablaufplan entsteht zur Laufzeit aus
 * buildTimeline(). Was nicht hineinpasst, landet still in reserve[] und wird als
 * "falls noch Zeit ist" gedruckt. Ein Elternteil, der die Wow-Variante kauft, sieht
 * dann Spiele im Reserve-Kasten, fuer die er eingekauft hat.
 *
 * Der baustelle-Review (04.08.) fand: alle neun Varianten ueberziehen ihr Fenster.
 * Ich hatte den Simulator seit dem Feuerwehr-Gate im Scratchpad liegen und nie zum
 * Gate gemacht — also fand es ein Reviewer statt der Linter.
 *
 * Diese Datei SPIEGELT paket/core/paket-core.js buildTimeline(). Aendert sich dort
 * die Rechnung, muss sie hier mitgezogen werden. Konstanten stehen in beiden Dateien.
 */
import { readFileSync, readdirSync } from 'node:fs';

const UEBERGABE = 15, ESSEN = 40, ESSEN_MIN = 25, RIT = 20;

/* parseDur wie im Kern: erste Zahl der duration-Angabe */
const dauer = (s) => parseInt(String(s || '').replace(',', '.'), 10) || 0;

function plan(games, fenster) {
  const endCap = fenster - UEBERGABE;
  const reserve = [];
  let t = Math.min(RIT, Math.max(10, endCap));
  let essenDone = false;

  const finale = games.length > 2 ? games[games.length - 1] : null;
  const spielbar = finale ? games.slice(0, -1) : games;
  const FIN = finale ? finale.dur + 5 : 0;

  const queue = [
    ...spielbar.slice(0, 2).map((g) => ({ game: g })),
    { essen: true },
    ...spielbar.slice(2).map((g) => ({ game: g })),
  ];

  for (const item of queue) {
    if (item.essen) {
      const d = Math.max(Math.min(ESSEN, endCap - t - FIN), 0);
      if (d >= ESSEN_MIN) t += d;
      else if (endCap - t - FIN >= 10) t = endCap - FIN;
      essenDone = true;
      continue;
    }
    const need = item.game.dur + 5 + (essenDone ? 0 : ESSEN_MIN) + FIN;
    if (t + need <= endCap) t += item.game.dur + 5;
    else reserve.push(item.game.name);
  }
  if (finale) {
    if (t + FIN <= endCap) t += FIN;
    else reserve.push(finale.name);
  }
  return { reserve, belegt: t, endCap };
}

const BEKANNT = new Set([
  /* Altlasten vor der Regel. Aufloesen -> Zeile streichen, dann zieht die Regel. */
]);

let fehler = 0, alt = 0, geprueft = 0;
for (const f of readdirSync('data/motto').filter((x) => x.endsWith('.json')).sort()) {
  const name = f.slice(0, -5);
  const d = JSON.parse(readFileSync('data/motto/' + f, 'utf8'));
  for (const v of d.variants || []) {
    const mm = /(\d+):(\d+)\s*[–—-]\s*(\d+):(\d+)/.exec(v.timeWindow || '');
    if (!mm) continue;
    const fenster = (+mm[3] * 60 + +mm[4]) - (+mm[1] * 60 + +mm[2]);
    const games = (v.games || []).map((g) => ({ name: String(g.name || '').replace(/^\P{L}+/u, '').slice(0, 34), dur: dauer(g.duration) }));
    if (!games.length) continue;
    geprueft++;
    const { reserve } = plan(games, fenster);
    if (reserve.length) {
      const zeile = `    ${name}/${v.id}: ${reserve.length} von ${games.length} Spielen passen nicht ins Fenster (${v.timeWindow}) — ${reserve.join(' · ')}`;
      if (BEKANNT.has(`${name}/${v.id}`)) { alt++; console.log('    (bekannt)' + zeile.slice(4)); }
      else { fehler++; console.log(zeile); }
    }
  }
}
console.log(`    ${geprueft} Varianten geprueft, ${fehler} ueberziehen ihr Fenster` + (alt ? `, ${alt} bekannt` : ''));
process.exit(fehler ? 1 : 0);
