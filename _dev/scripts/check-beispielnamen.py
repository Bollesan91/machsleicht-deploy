# -*- coding: utf-8 -*-
"""Stufe 32: Beispielkinder-Namen in Paket-/Seiten-Daten.

Externes Audit 10.08.: Die Druckprodukte erfanden Kinder ("Burg-Waechter
Hanna", "Ich bin Tom, Schlauchfuehrer") — mit echter Gaesteliste kollidierten
die Namen, teils waren es sogar die Demo-Gastnamen selbst (Emma, Ben, Noah).
Rund 500 Stellen wurden getilgt: Rollen-Zettel bindet das Template jetzt an
echte Zusagen, Lehr-Saetze nutzen den [Name]-Platzhalter, Sprecher sind Rollen.

Diese Stufe haelt die Klasse draussen: Pool-Namen (26, inkl. Possessiv 'Toms')
in druckrelevanten Datenfeldern = FAIL. _meta ist ausgenommen (interne
Notizen), ebenso eine explizite Whitelist fuer Fiktion/Franchise/Historie
(z.B. 'Old Toms Huette', Bibi-&-Tina-Quizfrage, Maria Sibylla Merian).
Ein Whitelist-Eintrag entschuldigt NUR den Namen, den er selbst enthaelt.
'Max' vor Zahlen oder mit Abkuerzungspunkt ist "maximal", kein Kind.
"""
import glob
import json
import re
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..'))

POOL = re.compile(
    r'\b(Hannah?|Felix|Sofie|Sophie|Sophia|David|Lilly|Tom|Anna|Lina|Mia|'
    r'Jonas|Paul|Greta|Leo|Emma|Mats|Noah|Ida|Ben|Lea|Maria|Lisa|Max|Clara|Nina)s?\b')

WHITELIST = (
    'Old Toms Hütte',            # fiktiver Piraten-Spielort
    'Lillys Pferd in Bibi',      # Franchise-Quizfrage (Bibi & Tina)
    # Namens-ERFINDUNGS-Tipps: dort sind die Namen der Inhalt (lizenz-sichere
    # Alternativen zu Disney-Figuren, eigene Helden-Identitaeten) — kein Leak.
    'Prinzessin Lina', 'Königin Mia', 'Hoheit Lina', 'Lina, Mia, Anna',
    'Power-Lina',
    'Maria Sibylla Merian',      # historische Forscherin (Dschungel-Wissen)
    'Special Agent Lina',        # Namens-Erfindungs-Tipp (Detektiv)
)


def treffer_in(text):
    funde = []
    for m in POOL.finditer(text):
        wort = m.group(0)
        umfeld = text[max(0, m.start() - 30):m.end() + 30]
        # "Max 2h" / "Max. Teilnehmer" = maximal, kein Kind
        if m.group(1) == 'Max' and re.match(r'Max\.(?!\w)|Max\.?\s*\d', text[m.start():m.start() + 8]):
            continue
        # Whitelist-Eintrag muss im Umfeld stehen UND den Treffer selbst enthalten —
        # sonst entschuldigt "Prinzessin Lina" jedes andere Kind im selben Satz.
        if any(w in umfeld and wort in w for w in WHITELIST):
            continue
        funde.append((wort, umfeld.replace('\n', ' ').strip()))
    return funde


fails = []
for pfad in sorted(glob.glob('data/motto/*.json') + glob.glob('_src/elite-motto-data/*.json')
                   + ['data/schatzsuche.json']):
    d = json.load(open(pfad, encoding='utf-8'))
    if isinstance(d, dict):
        d.pop('_meta', None)   # schatzsuche.json ist top-level eine Liste
    for wort, umfeld in treffer_in(json.dumps(d, ensure_ascii=False)):
        fails.append('%s: %s (%r)' % (pfad, wort, umfeld[:70]))

for pfad in sorted(glob.glob('kindergeburtstag/*.html')):
    t = open(pfad, encoding='utf-8').read()
    for wort, umfeld in treffer_in(t):
        fails.append('%s: %s (%r)' % (pfad, wort, umfeld[:70]))

print('    %d Beispielnamen-Treffer (Pool: 26 Namen + Possessive, %d Whitelist-Einträge)'
      % (len(fails), len(WHITELIST)))
for f in fails[:12]:
    print('    FAIL', f)
sys.exit(1 if fails else 0)
