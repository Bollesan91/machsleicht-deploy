# -*- coding: utf-8 -*-
"""Stufe 26: Decken die ageAdjust-Staffeln die Altersgruppe ihrer Datei ab?

Anlass, 06.08.: In allen drei ritter-Dateien tragen die Spiele ausschliesslich
`ageAdjust6` und `ageAdjust8`. ageAdjustFor() nimmt die groesste Stufe, die das
Kind schon erreicht hat — fuer ein 10-Jaehriges also die 8er-Stufe. Gedruckt
stand damit im bezahlten 9-12-Paket, auf den Karten der Spiele, die im Plan
stehen:

    "Bei 8-Jährigen: NICHT für 8 — siehe oben."
    "Bei 8-Jährigen: Auch zu schwer — Burgen-Quiz Klasse 1 aus mittel ist passender."

Das Paket erklaerte seinem Kaeufer, die gekauften Spiele seien ungeeignet, und
verwies auf eine Fassung, die er nicht gekauft hat. Bei klein spiegelbildlich:
"Bei 6-Jährigen: Bei 3-Jährigen: ..." — zwei widersprechende Altersangaben in
einer Zeile.

Die Vorlage unterdrueckt den Block seit dem 06.08., wenn die Stufe nicht in die
geladene Gruppe faellt. Das verhindert die Falschaussage, fuellt aber die Luecke
nicht: fuer klein und gross steht dann gar kein Rat. Diese Stufe macht die
Luecke sichtbar, statt sie schweigen zu lassen.

Geprueft wird je Datei gegen ihr eigenes Altersband. Ein Spiel ohne JEDE
Staffel ist in Ordnung (nicht jedes Spiel braucht eine Anpassung) — gemeldet
wird nur, wer Staffeln hat, aber keine passende.
"""
import json
import pathlib
import re
import sys

BAND = {'klein': (3, 5), 'mittel': (6, 8), 'gross': (9, 12)}
DATEN = pathlib.Path('data/motto')

treffer = []
dateien = 0

for pfad in sorted(DATEN.glob('*-*.json')):
    stem = pfad.stem
    if '-' not in stem:
        continue
    motto, gruppe = stem.rsplit('-', 1)
    if gruppe not in BAND:
        continue
    dateien += 1
    lo, hi = BAND[gruppe]
    d = json.loads(pfad.read_text(encoding='utf-8'))
    spiele = []
    for v in (d.get('variants') or []):
        spiele.extend(v.get('games') or [])
    # Spiele koennen ueber Varianten mehrfach vorkommen — je Name einmal pruefen.
    gesehen = set()
    for g in spiele:
        if not isinstance(g, dict):
            continue
        name = str(g.get('name') or '')
        if name in gesehen:
            continue
        gesehen.add(name)
        # Re-Check 06.08.: Schluessel mit leerem Wert zaehlten als "hat Staffeln"
        # — allein in den sechs Paket-Mottos 43 solcher Instanzen (dino:
        # "ageAdjust6": null). ageAdjustFor() gibt dort ohnehin null zurueck,
        # gedruckt haette da nie etwas. Sie blaehten die Zahl auf und stumpften
        # die Dauer-Warnung ab.
        stufen = sorted(int(m.group(1)) for m in
                        (re.match(r'^ageAdjust(\d+)$', k) for k in g
                         if isinstance(g.get(k), str) and g.get(k).strip()) if m)
        if not stufen:
            continue                      # keine Anpassung vorgesehen: in Ordnung
        if not any(lo <= s <= hi for s in stufen):
            treffer.append((stem, name[:40], stufen, '%d-%d' % (lo, hi)))

for stem, name, stufen, band in treffer[:16]:
    print('    %-22s %-40s Staffeln %s, Band %s'
          % (stem, name.encode('ascii', 'replace').decode(), stufen, band))
if len(treffer) > 16:
    print('    ... und %d weitere' % (len(treffer) - 16))
print('    %d Spiele mit Staffeln ausserhalb ihres Altersbands, in %d Dateien'
      % (len(treffer), dateien))
sys.exit(1 if treffer else 0)
