# -*- coding: utf-8 -*-
"""Stufe 11: Jede estimatedCostEur-Zahl muss in der Countdown-Prosa stehen.

Warum das eine eigene Regel braucht: estimatedCostEur wird NICHT gerendert.
Dieselben Zahlen stehen aber ein zweites Mal von Hand als Prosa in
preparationWeeks, und shCountdown() druckt die auf Seite 3 des Pakets
("Wow 150 EUR. Entscheidung jetzt."). Wer nur das Feld aendert, korrigiert die
unsichtbare Achse und laesst das sichtbare Versprechen falsch stehen.

Genau der Fehler ist am 04.08. passiert: meerjungfrau-Feld auf die Listensumme
gezogen, Prosa auf Seite 3 unveraendert -> Elternteil las 150 EUR und kaufte
fuer 220 EUR ein. Was der Linter faengt, ist kein Reviewer-Thema.
"""
import json, glob, os, re, sys

BEKANNT = {  # Altlasten, vor der Regel entstanden. Aufloesen -> Zeile streichen.
    ('einhorn-klein', 'wow'),
    ('feuerwehr-gross', 'standard'),
}


def texte(o, acc):
    if isinstance(o, dict):
        for v in o.values(): texte(v, acc)
    elif isinstance(o, list):
        for v in o: texte(v, acc)
    elif isinstance(o, str): acc.append(o)
    return acc


def geldzahlen(prosa):
    """Zahlen aus allen Saetzen, die ein Euro-Zeichen tragen.
       Satzweise, damit '35 / 55 / 80 EUR' alle drei liefert, nicht nur die letzte."""
    z = set()
    for satz in re.split(r'(?<=[.!?])\s+', prosa):
        if '€' in satz:
            z.update(int(x) for x in re.findall(r'\b(\d{1,4})\b', satz))
    return z


fehler, alt = [], []
for f in sorted(glob.glob('data/motto/*.json')):
    name = os.path.basename(f)[:-5]
    d = json.load(open(f, encoding='utf-8'))
    z = geldzahlen(' '.join(texte(d.get('preparationWeeks', {}), [])))
    if not z:
        continue   # Motto nennt keine Betraege im Countdown — nichts abzugleichen
    for v in d.get('variants', []):
        e = v.get('estimatedCostEur')
        if e is None:
            continue
        if e not in z:
            (alt if (name, v['id']) in BEKANNT else fehler).append(
                '%s/%s: estimatedCostEur %s steht nicht in der Countdown-Prosa' % (name, v['id'], e))

for a in alt:
    print('    (bekannt) ' + a)
for x in fehler:
    print('    ' + x)
sys.exit(1 if fehler else 0)
