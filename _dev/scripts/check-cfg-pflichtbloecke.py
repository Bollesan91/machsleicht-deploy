# -*- coding: utf-8 -*-
"""Stufe 25: Traegt jedes Manifest die Pflicht-Bloecke seiner PAKET_CFG?

Anlass, 06.08.: ritter war das einzige der sechs Mottos OHNE `timeline`-Block.
Folge im Druck — der Kern faellt auf motto-neutrale Defaults zurueck:

    "Ankommen & Aufnahme"   statt  "Ankunft & Knappen-Aufnahme"
    "Kuchen & Snacks"       statt  "Burgküche: Kuchen & Ritter-Vorrat"
    "Übergabe & Urkunden"   statt  "Ritterschlag & Urkunden"

Der Ablaufplan — Blatt 2 eines bezahlten Motto-Pakets — war an keiner einzigen
Zeile Ritter. Und weil `ritualSub` eine Funktion in genau diesem Block ist,
blieb der Untertitel leer: der Name des Signatur-Rituals, fuer das die ganze
Dramaturgie gebaut ist, kam im Zeitplan nicht vor.

Nichts davon war kaputt im Sinne von "wirft einen Fehler". Es parste, der
Rundlauf war gruen, der Linter meldete 0 — es sah nur nach einem anderen
Produkt aus. Genau diese Sorte Fehler findet sonst nur ein Gutachter.

Die Pflichtliste ist bewusst die Schnittmenge dessen, was der Kern liest:
fehlt ein Schluessel, druckt der Kern still seinen neutralen Default.
"""
import json
import pathlib
import re
import sys

MANIFESTE = pathlib.Path('paket/_maschine/manifeste')
KERN = pathlib.Path('paket/core/paket-core.js')

# Schluessel, die der Kern aus PAKET_CFG.timeline liest. Fehlt einer, gibt es
# keinen Krach, sondern einen motto-neutralen Text.
TIMELINE_PFLICHT = (
    'ritualTit', 'ritualSub', 'essenTit', 'essenSub',
    'spielSub', 'freiTit', 'uebergabeTit', 'endeTit',
)
CFG_PFLICHT = ('id', 'dataLabel', 'roles', 'timeline')

fehler = []

# Gegenprobe: liest der Kern die Schluessel wirklich? Sonst waechst die Liste
# irgendwann an der Wirklichkeit vorbei und wir erzwingen totes Zeug.
kern = KERN.read_text(encoding='utf-8') if KERN.exists() else ''
for k in TIMELINE_PFLICHT:
    if kern and ('L.' + k) not in kern:
        fehler.append('Pflichtschluessel "%s" wird vom Kern gar nicht gelesen '
                      '— Liste anpassen, nicht das Manifest' % k)

def ohne_kommentare(t):
    """Blendet /* ... */ und // ... aus.

    Re-Check 06.08.: Die erste Fassung suchte im ROHEN cfg-String. Ein Manifest,
    dessen timeline-Block nur noch auskommentiert dastand, passierte damit mit
    exit 0 — genau die Ziel-Fehlerklasse ("parst, Rundlauf gruen, druckt
    neutrale Defaults") kehrte unbemerkt zurueck, sobald jemand den Block zum
    Debuggen wegkommentiert. Das (?<!:) haelt "https://" heraus.
    """
    t = re.sub(r'/\*.*?\*/', ' ', str(t), flags=re.S)
    return re.sub(r'(?<!:)//[^\n]*', ' ', t)


for pfad in sorted(MANIFESTE.glob('*.json')):
    motto = pfad.stem
    cfg = ohne_kommentare(json.loads(pfad.read_text(encoding='utf-8')).get('cfg') or '')
    for k in CFG_PFLICHT:
        if not re.search(r'(^|[\s{,])' + k + r'\s*:', cfg):
            fehler.append('%-13s cfg ohne "%s"' % (motto, k))
    m = re.search(r'timeline\s*:\s*\{', cfg)
    if not m:
        continue                      # oben schon als fehlend gemeldet
    rest = cfg[m.end():]
    for k in TIMELINE_PFLICHT:
        if not re.search(r'(^|[\s{,])' + k + r'\s*:', rest):
            fehler.append('%-13s timeline ohne "%s"' % (motto, k))

for f in fehler[:20]:
    print('    %s' % f)
if len(fehler) > 20:
    print('    ... und %d weitere' % (len(fehler) - 20))
print('    %d fehlende Pflicht-Bloecke/-Schluessel in %d Manifest(en)'
      % (len(fehler), len(list(MANIFESTE.glob('*.json')))))
sys.exit(1 if fehler else 0)
