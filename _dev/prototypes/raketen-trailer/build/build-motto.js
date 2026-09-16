// Baut eine Motto-Seite aus Shell + Core + Drehbuch: node build-motto.js piraten
const fs = require('fs'), path = require('path');
const S = __dirname;
const REPO = 'C:/Users/Bolle/OneDrive - ADVERGY GmbH/Dokumente/Claude/Projects/machsleicht/machsleicht-deploy/_dev/prototypes/raketen-trailer';
const MOTTOS = {
  piraten: { title: 'Piraten-Trailer', emoji: '🏴‍☠️', dur: 24,
    lede: 'Kurs auf die Schatzinsel: 24 Sekunden Einladung, komplett auf deinem Gerät gerechnet, mit Ton. Tipp auf <b>MP4 erzeugen</b>, warte auf das Video und mach dann einen Screenshot vom Testprotokoll.',
    theme: '--ground:#0C2233; --panel:#12324A; --panel-2:#1A4258; --line:#2A5A6B; --ink:#F3E7C9; --muted:#CDB98F; --dim:#8A7A5A; --accent:#A5402B; --accent-deep:#7A2A1A; --star:#E4C567;',
    defaults: { name: 'Ida', age: '6', date: 'Sa, 17. Oktober', time: '15:00 Uhr', place: 'Sternenweg 7, Hamburg' } },
  feuerwehr: { title: 'Feuerwehr-Trailer', emoji: '🚒', dur: 24,
    lede: 'Alarm für die Party: 24 Sekunden Einladung, komplett auf deinem Gerät gerechnet, mit Ton. Tipp auf <b>MP4 erzeugen</b>, warte auf das Video und mach dann einen Screenshot vom Testprotokoll.',
    theme: '--ground:#0B172E; --panel:#16294A; --panel-2:#1E365E; --line:#2B4A78; --ink:#F4F0E6; --muted:#CFC5B0; --dim:#8A7F6A; --accent:#B32219; --accent-deep:#7E1710; --star:#E8C24E;',
    defaults: { name: 'Ida', age: '6', date: 'Sa, 17. Oktober', time: '15:00 Uhr', place: 'Sternenweg 7, Hamburg' } },
  ritter: { title: 'Ritter-Trailer', emoji: '⚔️', dur: 24,
    lede: 'Der Ritt zur Burg: 24 Sekunden Einladung, komplett auf deinem Gerät gerechnet, mit Ton. Tipp auf <b>MP4 erzeugen</b>, warte auf das Video und mach dann einen Screenshot vom Testprotokoll.',
    theme: '--ground:#12283F; --panel:#1B3A5C; --panel-2:#22456B; --line:#2F5A85; --ink:#F3E7C9; --muted:#D6C295; --dim:#8A7A5A; --accent:#8C2F26; --accent-deep:#6B2119; --star:#E4C567;',
    defaults: { name: 'Ida', age: '6', date: 'Sa, 17. Oktober', time: '15:00 Uhr', place: 'Sternenweg 7, Hamburg' } }
};
const id = process.argv[2]; const M = MOTTOS[id]; if (!M) throw new Error('Motto unbekannt: ' + id);
let html = fs.readFileSync(path.join(S, 'src', 'shell.html'), 'utf8');
const core = fs.readFileSync(path.join(S, 'src', 'core.js'), 'utf8');
let motto = fs.readFileSync(path.join(S, 'src', id + '.js'), 'utf8');
const lib = fs.readFileSync(path.join(S, 'lib', 'mp4-muxer.js'), 'utf8');
const ida = fs.readFileSync(path.join(S, 'ida.jpg')).toString('base64');
const once = (hay, needle) => { const n = hay.split(needle).length - 1; if (n !== 1) throw new Error(needle + ' ' + n + 'x statt 1x'); };
for (const s of [core, motto, lib]) if (/<\/script>/i.test(s)) throw new Error('Skript enthaelt </script>');
once(motto, "'/*__IDA__*/'"); motto = motto.replace("'/*__IDA__*/'", "'data:image/jpeg;base64," + ida + "'");
const rep = (ph, val) => { once(html, ph); html = html.replace(ph, () => val); };
html = html.split('__TITLE__').join(M.title);
rep('__EMOJI__', M.emoji); rep('__LEDE__', M.lede); rep('__THEME__', M.theme);
rep('__SCRUBMAX__', String(M.dur * 30 - 1)); rep('__DURTEXT__', String(M.dur));
for (const [k, v] of Object.entries(M.defaults)) rep('__' + k.toUpperCase() + '__', v);
// Platzhalter-Kontrolle VOR dem Einsetzen der Skripte (der Muxer traegt @__PURE__-Marken)
const rest = html.match(/__[A-Z]+__/g).filter(p => !['__MUXER__', '__CORE__', '__MOTTO__'].includes(p));
if (rest.length) throw new Error('Platzhalter uebrig: ' + rest.slice(0, 5));
rep('<script>/*__MUXER__*/</script>', '<script>\n/* mp4-muxer 5.2.2 (MIT, Vanilagy) — inline */\n' + lib + '\n</script>');
rep('<script>/*__CORE__*/</script>', '<script>\n' + core + '\n</script>');
rep('<script>/*__MOTTO__*/</script>', '<script>\n' + motto + '\n</script>');
fs.writeFileSync(path.join(S, id + '.html'), html);
fs.mkdirSync(path.join(REPO, 'fonts'), { recursive: true });
fs.writeFileSync(path.join(REPO, id + '.html'), html);
for (const f of ['baloo2.woff2', 'dmsans.woff2']) fs.copyFileSync(path.join(S, 'fonts', f), path.join(REPO, 'fonts', f));
console.log('ok ·', id + '.html', html.length, 'Bytes · externe Skripte:', (html.match(/<script src=/g) || []).length);
