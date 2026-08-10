# -*- coding: utf-8 -*-
"""Stufe 29: Traegt jedes erzeugte Paket den aktuellen Vorlagen-Stand?

Anlass, 06.08. — der eine MAJOR des dritten Gutachtens: `paket/piraten/index.html`
war byte-identisch mit dem Stand von vor zwei Fix-Wellen. Der Generator trug
eine harte Sperre (`NICHT_SCHREIBEN = {'piraten'}`), gebaut am 05.08., um
handgeschriebene Kommentare vor einem blinden Ueberschreiben zu schuetzen. Sie
hat getan, wofuer sie gebaut war — und dabei fuenf Funktionen unterschlagen:

    allergieZeile · abholNote · kostenKontext · quizBlock · Band-Unterdrueckung

Der piraten-Kaeufer druckte deshalb keine Allergie-Zeile am Essen, keine
Abholzeiten und die Kosten-Widerspruchszeile. Das Bittere: der Zustand
passierte FUENF gruene Linter-Stufen. Keine einzige prueft, ob ein erzeugtes
Paket zu der Vorlage gehoert, aus der es erzeugt wurde.

Diese Stufe schliesst das. Sie vergleicht nicht Text (das taete der Rundlauf),
sondern die FUNKTIONS-OBERFLAECHE: jede Funktion, die die Vorlage definiert,
muss in jedem erzeugten Paket vorkommen. Das ist billig, robust gegen
Wortwahl-Unterschiede zwischen Mottos — und faengt genau die Drift, die
entsteht, wenn ein Paket aus der Regeneration faellt.
"""
import pathlib
import re
import sys

VORLAGE = pathlib.Path('paket/_maschine/template.html')
PAKETE = pathlib.Path('paket')

# Funktionen, die nur unter bestimmten Umstaenden erzeugt werden, gehoeren hier
# NICHT hin — die Vorlage definiert sie unbedingt, also muss jedes Paket sie haben.
FUNK = re.compile(r'^function\s+([A-Za-z_$][\w$]*)\s*\(', re.M)

if not VORLAGE.exists():
    print('    Vorlage nicht gefunden: %s' % VORLAGE)
    sys.exit(1)

soll = set(FUNK.findall(VORLAGE.read_text(encoding='utf-8')))
if not soll:
    print('    Vorlage definiert keine Funktionen — Muster pruefen')
    sys.exit(1)

treffer = []
geprueft = 0
for pfad in sorted(PAKETE.glob('*/index.html')):
    if pfad.parent.name.startswith('_'):
        continue                       # _maschine, Hilfsordner
    geprueft += 1
    ist = set(FUNK.findall(pfad.read_text(encoding='utf-8')))
    fehlt = sorted(soll - ist)
    if fehlt:
        treffer.append((pfad.parent.name, fehlt))

for motto, fehlt in treffer[:8]:
    print('    %-14s fehlen %d Vorlagen-Funktionen: %s'
          % (motto, len(fehlt), ', '.join(fehlt[:6]) + ('…' if len(fehlt) > 6 else '')))
print('    %d Pakete geprueft gegen %d Vorlagen-Funktionen, %d veraltet'
      % (geprueft, len(soll), len(treffer)))
sys.exit(1 if treffer else 0)
