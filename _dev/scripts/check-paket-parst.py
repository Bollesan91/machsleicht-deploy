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

# Das Template steht ABSICHTLICH nicht auf dieser Liste. Seine Platzhalter
# ersetzen ganze Bloecke ({{cfg}}, {{gamemeta}}), es ist eine Gussform und per
# Konstruktion kein gueltiges JavaScript. Abgesichert ist es trotzdem: der
# Generator baut daraus alle fuenf Pakete, und die stehen hier drauf. Ein
# Syntaxfehler im Template kann sich also nicht verstecken — er schlaegt beim
# naechsten Bauen in jedem einzelnen Paket durch.
dateien = sorted(glob.glob('paket/*/index.html'))

if not dateien:
    print('    keine Paket-Dateien gefunden')
    sys.exit(1)

kaputt = []

# Die externen Skripte, die jedes Paket per <script src> nachlaedt. Ein
# Syntaxfehler DORT toetet das Paket genauso wie einer im inline-Block — und
# die erste Fassung dieser Stufe hat sie uebersehen. Das ist exakt die Luecke,
# die den urspruenglichen Fehler durchgelassen hat: eine Pruefung, die gruen
# meldet, weil sie nicht ueberall hinsieht.
for js in sorted(glob.glob('paket/core/*.js')):
    r = subprocess.run(['node', '--check', js], capture_output=True, text=True)
    if r.returncode != 0:
        zeilen = [z.strip() for z in (r.stderr or '').split('\n') if z.strip()]
        kaputt.append((js, next((z for z in zeilen if 'Error' in z), zeilen[-1] if zeilen else '?')[:120]))

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
