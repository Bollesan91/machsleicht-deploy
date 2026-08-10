# -*- coding: utf-8 -*-
"""Stufe 19: Widersprechen sich Groessenangaben auf DERSELBEN Spielkarte?

Am 05.08. meldete der baustelle-Reviewer (SI1): "Vier verschiedene
Mindestgroessen fuer denselben Bauklotz — die Verschluck-Grenze widerspricht
sich selbst." Nachgeprueft, und die Widersprueche stehen nicht etwa verstreut,
sondern in drei Nachbarfeldern EINER Karte:

    material    "Grosse weiche Baukloetze ..., mindestens 15 cm"
    safetyRule  "Kloetze mind. 5 cm (Klopapierrollen-Test)"
    prepText    "20-30 grosse Schaumstoff-Baukloetze (mind. 4 cm Kantenlaenge,
                 DIN EN 71-1 verschluckbar...)"

Dazu die FAQ derselben Datei: "Mindestens 10 cm (besser 15 cm)".

Bei Drei- bis Fuenfjaehrigen ist das keine Formulierungsfrage. Ein Elternteil,
der 4 cm liest, kauft etwas anderes als einer, der 15 cm liest — und die
Karte, die ihn absichern soll, nennt die kleinste Zahl.

Diese Stufe meldet, wenn material/prepText/safetyRule/fallback EINER Karte
verschiedene Mindestmasse fuer dieselbe Sache nennen. Sie entscheidet NICHT,
welche Zahl richtig ist: eine Norm-Zahl mit Sicherheitsfolge gehoert
primaerverifiziert und von einem Menschen gesetzt, nicht von einem Skript
geraten.
"""
import json, glob, pathlib, re, sys

FELDER = ('material', 'prepText', 'safetyRule', 'fallback')
# "mind. 5 cm", "mindestens 15 cm", "min. 4cm", "5 cm lang"
MASS = re.compile(r'(?:mind(?:estens|\.)?|min\.)\s*(\d+(?:[.,]\d+)?)\s*(cm|mm)\b', re.I)


def in_cm(wert, einheit):
    z = float(str(wert).replace(',', '.'))
    return z / 10 if einheit.lower() == 'mm' else z


treffer = []
for f in sorted(glob.glob('data/motto/*.json')):
    d = json.loads(pathlib.Path(f).read_text(encoding='utf-8'))
    for vi, v in enumerate(d.get('variants') or []):
        for gi, g in enumerate(v.get('games') or []):
            masse = {}
            for feld in FELDER:
                t = g.get(feld)
                if not isinstance(t, str):
                    continue
                for m in MASS.finditer(t):
                    masse.setdefault(round(in_cm(m.group(1), m.group(2)), 1), []).append(feld)
            if len(masse) > 1:
                treffer.append((pathlib.Path(f).name, v.get('id'), g.get('name', '?'),
                                sorted(masse.items())))

for datei, vid, spiel, masse in treffer[:20]:
    zeile = ' · '.join('%g cm (%s)' % (cm, '/'.join(sorted(set(fs)))) for cm, fs in masse)
    print('    %-24s %-9s %-30s %s'
          % (datei, vid, str(spiel)[:30].encode('ascii', 'replace').decode(), zeile))
if len(treffer) > 20:
    print('    ... und %d weitere' % (len(treffer) - 20))
print('    %d Spielkarten mit widerspruechlichen Mindestmassen, in %d Dateien'
      % (len(treffer), len(set(t[0] for t in treffer))))
sys.exit(1 if treffer else 0)
