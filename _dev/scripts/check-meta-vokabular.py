# -*- coding: utf-8 -*-
"""Stufe 33: Redaktions-/QA-Vokabular in druckrelevanten Daten.

Re-Check 10.08. (M3 + F5): In data/schatzsuche.json standen QA-Notizen im
gedruckten Text — "KEIN 'Maurer Frank' — Halluzination!" in einer Stations-
Beschreibung, "Berufsbild-Klarstellung ... Frauen-Berufe-Sichtbarkeit" in
einem hint, den das Paket als Vorleser-Zettel druckt. Der Gastgeber liest
dann eine Content-Policy-Begruendung an sich selbst.

Diese Stufe haelt die Klasse draussen: Meta-Woerter, die in einem Text FUER
ELTERN UND KINDER nichts verloren haben, = FAIL. Die Liste ist bewusst eng
(nur Begriffe ohne legitime Druck-Verwendung), damit sie nie falsch anschlaegt.
_meta ist ausgenommen (interne Notizen duerfen Meta-Sprache tragen).
"""
import glob
import json
import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..'))

META = re.compile(
    r'Halluzination|gender-offen|Berufsbild-Klarstellung|Frauen-Berufe-Sichtbarkeit|'
    r'Redaktionsnotiz|QA-Notiz|Content-Policy|Konsistenz-Sweep|Lektorat|'
    r'FIXME|\bTODO\b|Platzhaltertext|'
    # recheck5 (M1/M2): Korrektur-Notizen "(NICHT 'X' — ...)" und SEO-Arbeitssprache.
    # Nur das GROSS geschriebene "NICHT '" ist QA-Emphase — kleingeschriebenes
    # "nicht 'war schön'" ist legitimer Elterntext (case-sensitiv gescopet).
    # recheck6 MAJOR-1: Live-HTML escaped Apostrophe als &#x27;/&#39; — beide
    # Formen mitfangen, sonst ist das Muster auf der ganzen HTML-Klasse blind.
    r"(?-i:NICHT )(?:'|&apos;|&#0*39;|&#[xX]0*27;)|FAQ-VOLLTEXT|JSON-LD|\bdeployed\b|-Marketing\)", re.IGNORECASE)


def treffer_in(text):
    funde = []
    for m in META.finditer(text):
        umfeld = text[max(0, m.start() - 40):m.end() + 40]
        funde.append((m.group(0), umfeld.replace('\n', ' ').strip()))
    return funde


fails = []
for pfad in sorted(glob.glob('data/motto/*.json') + glob.glob('_src/elite-motto-data/*.json')
                   + ['data/schatzsuche.json']):
    d = json.load(open(pfad, encoding='utf-8'))
    if isinstance(d, dict):
        d.pop('_meta', None)
    for wort, umfeld in treffer_in(json.dumps(d, ensure_ascii=False)):
        fails.append('%s: %s (%r)' % (pfad, wort, umfeld[:80]))

for pfad in sorted(glob.glob('kindergeburtstag/*.html')):
    t = open(pfad, encoding='utf-8').read()
    for wort, umfeld in treffer_in(t):
        fails.append('%s: %s (%r)' % (pfad, wort, umfeld[:80]))

print('    %d Meta-Vokabular-Treffer in Druckdaten' % len(fails))
for f in fails[:12]:
    print('    FAIL', f)
sys.exit(1 if fails else 0)
