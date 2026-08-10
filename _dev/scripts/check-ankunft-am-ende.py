# -*- coding: utf-8 -*-
"""Stufe 21: Steht ein Ankunfts-Spiel an letzter Stelle?

buildTimeline() behandelt das LETZTE Spiel einer Variante als geschuetztes
Finale — so gewollt seit Gate Z1 (04.08.): "Das letzte Spiel ist der
Abschluss, Urkunden, Zeremonie. Es stand hinten in der Queue und fiel deshalb
als erstes in die Reserve."

Die Kehrseite fiel erst am 05.08. auf: In vier Varianten stand dort
"Helm-Bemalen (Schicht-Appell-Einstieg)" — eine ANKUNFTS-Aktivitaet. Der
Ablaufplan setzte sie ans Ende der Party, und weil das Paket die Spielkarten
in Array-Reihenfolge druckt, lag sie auch auf dem Kartenstapel hinten.

Die Reihenfolge im Array ist damit nicht bloss Kosmetik, sondern steuert den
gedruckten Ablauf. Diese Stufe prueft die eine Position, an der das
schiefgehen kann.

Bewusst weites Muster: es erzeugt heute ueber alle 45 Dateien und 135
Varianten NULL Fehlalarme (nachgemessen), schuetzt aber gegen Formulierungen,
die ein enges Muster verpassen wuerde.
"""
import json, glob, pathlib, re, sys

ANKUNFT = re.compile(r'Ankunft|Ankommen|Einstieg|Begr(ü|ue)ssung', re.I)

treffer = []
for f in sorted(glob.glob('data/motto/*.json')):
    d = json.loads(pathlib.Path(f).read_text(encoding='utf-8'))
    for v in (d.get('variants') or []):
        gs = v.get('games') or []
        if not gs:
            continue
        letztes = gs[-1]
        blob = ' '.join(str(letztes.get(k) or '') for k in ('name', 'prepText'))
        m = ANKUNFT.search(blob)
        if m:
            treffer.append((pathlib.Path(f).name, v.get('id'),
                            str(letztes.get('name'))[:34], m.group(0)))

for datei, vid, name, wort in treffer[:12]:
    print('    %-24s %-9s %-34s (%s)'
          % (datei, vid, name.encode('ascii', 'replace').decode(), wort))
if len(treffer) > 12:
    print('    ... und %d weitere' % (len(treffer) - 12))
print('    %d Ankunfts-Spiele an letzter Stelle (werden zum Finale)' % len(treffer))
sys.exit(1 if treffer else 0)
