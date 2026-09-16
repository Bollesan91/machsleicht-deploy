// Baut aus story.src.html die fertige Seite: Muxer inline, Kopie ins Repo-Prototypen-Verzeichnis.
const fs = require('fs'), path = require('path');
const S = __dirname;
const REPO = 'C:/Users/Bolle/OneDrive - ADVERGY GmbH/Dokumente/Claude/Projects/machsleicht/machsleicht-deploy/_dev/prototypes/raketen-trailer';
let html = fs.readFileSync(path.join(S, 'story.src.html'), 'utf8');
const lib = fs.readFileSync(path.join(S, 'lib', 'mp4-muxer.js'), 'utf8');
const ph = '<script>/*__MUXER__*/</script>';
const n = html.split(ph).length - 1;
if (n !== 1) throw new Error('Platzhalter ' + n + 'x statt 1x');
if (/<\/script>/i.test(lib)) throw new Error('Lib enthaelt </script>');
html = html.replace(ph, '<script>\n/* mp4-muxer 5.2.2 (MIT, Vanilagy) — inline, damit die Seite ohne jede Fremd-Datei laeuft */\n' + lib + '\n</script>');
// Demo-Kinderfoto (Repo: bilder/demo/ida.jpg) als Data-URI ins Bullauge
const idaPh = "'/*__IDA__*/'";
const nIda = html.split(idaPh).length - 1;
if (nIda !== 1) throw new Error('Ida-Platzhalter ' + nIda + 'x statt 1x');
const ida = fs.readFileSync(path.join(S, 'ida.jpg')).toString('base64');
html = html.replace(idaPh, "'data:image/jpeg;base64," + ida + "'");
fs.writeFileSync(path.join(S, 'artifact.html'), html);
fs.mkdirSync(REPO, { recursive: true });
fs.writeFileSync(path.join(REPO, 'index.html'), html);
for (const f of ['baloo2.woff2', 'dmsans.woff2']) { fs.mkdirSync(path.join(REPO, 'fonts'), { recursive: true }); fs.copyFileSync(path.join(S, 'fonts', f), path.join(REPO, 'fonts', f)); }
console.log('ok · Bytes:', html.length, '· externe Skripte:', (html.match(/<script src=/g) || []).length, '· DUR-Konstante:', /const W=1080, H=1920, FPS=30, DUR=(\d+)/.exec(html)[1] + ' s');
