# -*- coding: utf-8 -*-
"""Stufe 15: Parst das Paket ueberhaupt?

Am 05.08. meldete ein Reviewer als Befund 0.1: "index.html parst nicht; das
Produkt zeigt nur den Ladetext." Er hatte recht — und zwar fuer ALLE FUENF
Pakete gleichzeitig. Ursache war eine einzige Zeile: beim Einbau von esclink
kam ein zweites `const` mitten in eine noch offene Deklarationsliste:

    const esc=_C.esc,
    const esclink = _C.esclink; poss=_C.poss, ...

Vierzehn Linter-Stufen liefen gruen dagegen. Alle pruefen Text — Preise,
Zeitfenster, Raetselwoerter, ungelesene Felder. Keine einzige hat je gefragt,
ob die Datei ueberhaupt JavaScript ist. Ein Paket kann jede inhaltliche
Pruefung bestehen und trotzdem beim Kaeufer nur "Lade ..." anzeigen.

Diese Stufe schliesst genau diese Luecke: inline-<script> ausschneiden,
node --check darueber. Braucht node im PATH; fehlt node, meldet sie das
laut statt still durchzuwinken.
"""
import pathlib, re, subprocess, sys, tempfile, os, glob, shutil

BLOCK = re.compile(r'<script(?![^>]*\bsrc=)[^>]*>(.*?)</script>', re.S | re.I)

if not shutil.which('node'):
    print('    node nicht im PATH — Stufe 15 kann nicht pruefen (das ist ein FAIL,')
    print('    kein Freifahrtschein: ungeprueft heisst nicht in Ordnung).')
    sys.exit(1)

dateien = sorted(glob.glob('paket/*/index.html'))
tpl = pathlib.Path('paket/_maschine/template.html')
if tpl.exists():
    dateien.append(str(tpl))

if not dateien:
    print('    keine Paket-Dateien gefunden')
    sys.exit(1)

kaputt = []
for f in dateien:
    s = pathlib.Path(f).read_text(encoding='utf-8')
    bloecke = BLOCK.findall(s)
    if not bloecke:
        kaputt.append((f, 'kein inline-<script> gefunden'))
        continue
    for i, b in enumerate(bloecke):
        # Das Template traegt {{platzhalter}} — die sind kein JS. Fuer die
        # Syntaxpruefung durch einen harmlosen Bezeichner ersetzen.
        quelle = re.sub(r'\{\{[^}]+\}\}', '0', b)
        fd, name = tempfile.mkstemp(suffix='.js')
        os.close(fd)
        pathlib.Path(name).write_text(quelle, encoding='utf-8')
        r = subprocess.run(['node', '--check', name], capture_output=True, text=True)
        os.unlink(name)
        if r.returncode != 0:
            zeilen = [z.strip() for z in (r.stderr or '').split('\n') if z.strip()]
            meldung = next((z for z in zeilen if 'Error' in z), zeilen[-1] if zeilen else '?')
            kaputt.append((f, 'Block %d: %s' % (i, meldung[:120])))

for f, warum in kaputt:
    print('    %-34s %s' % (f, warum))
print('    %d von %d Paket-Dateien geprueft, %d kaputt' % (len(dateien), len(dateien), len(kaputt)))
sys.exit(1 if kaputt else 0)
