# -*- coding: utf-8 -*-
"""Stufe 24: ss, wo im Deutschen ein Eszett stehen muss.

Aus dem meerjungfrau-Review (Befund 7.1, gemeldet als "ein Drittel des
Produkts in Schweizer Orthografie"). Nachgemessen war es weder auf
meerjungfrau beschraenkt noch konsequent schweizerisch, sondern schlicht
INKONSISTENT — derselbe Satz traegt beides:

    "Draussen darf das Schwimmen grosszuegiger sein"   (ss)
    "Draussen darf das Schwimmen großzügiger sein"     (ß)

Beides im selben Feld derselben Datei. Fuer ein Produkt, das ausgedruckt auf
dem Kuechentisch liegt, ist das sichtbare Schludrigkeit.

Geprueft wird nur eine geschlossene Wortliste, bei der die Eszett-Schreibung
im Deutschen EINDEUTIG ist. Nicht dabei:
  - "Masse"  — Masse (Menge) und Maße (Abmessungen) sind beide richtig
  - "Fluss", "Schloss", "muss", "dass" — dort ist ss korrekt (kurzer Vokal)
Werte, die nur aus einem Slug bestehen (ageGroup "gross"), zaehlen nicht:
ohne diese Ausnahme waeren 60 von 158 Treffern Fehlalarme.
"""
import collections
import glob
import json
import pathlib
import re
import sys

PAARE = {
    'gross': 'groß', 'groesse': 'größe', 'groesser': 'größer',
    'spass': 'spaß', 'strasse': 'straße', 'draussen': 'draußen',
    'heiss': 'heiß', 'weiss': 'weiß', 'schliesslich': 'schließlich',
    'schliessen': 'schließen', 'giessen': 'gießen', 'fuesse': 'füße',
    'gemaess': 'gemäß', 'beissen': 'beißen', 'reissen': 'reißen',
    'schiessen': 'schießen', 'stossen': 'stoßen', 'suess': 'süß',
}
PAT = re.compile(r'\b(' + '|'.join(PAARE) + r')[a-zäöüß]*', re.I)

# Nicht geprueft, weil es kein gedruckter Satz ist:
#   url                        Amazon-Suchlinks ("bauklötze+gross+schaumstoff")
#   stream_c_note/refresh_note interne Notizen; "Bruecke zu klein/gross" meint
#                              dort die SLUGS der Altersgruppen, nicht das
#                              Adjektiv — mit ß waere die Notiz falsch
#   ageGroup u.a.              der Wert IST der Slug
KEIN_TEXT = {'id', 'slug', 'file', 'url', 'img', 'icon', 'gameId', 'ref',
             'group', 'ageGroup', 'variant', 'variantId', 'size',
             'stream_c_note', 'refresh_note'}
SLUGS = {'klein', 'mittel', 'gross', 'minimal', 'standard', 'wow'}


def strings(knoten, schluessel=None):
    if isinstance(knoten, dict):
        for k, v in knoten.items():
            yield from strings(v, k)
    elif isinstance(knoten, list):
        for v in knoten:
            yield from strings(v, schluessel)
    elif (isinstance(knoten, str) and schluessel not in KEIN_TEXT
            and knoten.strip().lower() not in SLUGS):
        yield schluessel, knoten


je_datei = collections.Counter()
beispiele = []
for f in sorted(glob.glob('data/motto/*.json')):
    d = json.loads(pathlib.Path(f).read_text(encoding='utf-8'))
    for schluessel, wert in strings(d):
        for m in PAT.finditer(wert):
            je_datei[pathlib.Path(f).name] += 1
            if len(beispiele) < 10:
                beispiele.append((pathlib.Path(f).name, schluessel, m.group(0)))

for datei, schluessel, wort in beispiele:
    print('    %-26s %-18s %s'
          % (datei, schluessel, wort.encode('ascii', 'replace').decode()))
gesamt = sum(je_datei.values())
if gesamt > len(beispiele):
    print('    ... und %d weitere' % (gesamt - len(beispiele)))
print('    %d Stellen mit ss statt Eszett, in %d Dateien' % (gesamt, len(je_datei)))
sys.exit(1 if gesamt else 0)
