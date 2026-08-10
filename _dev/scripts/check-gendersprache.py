# -*- coding: utf-8 -*-
"""Stufe 30: Doppelpunkt- und Stern-Genderformen in Produkt-Texten.

Bolle-Entscheidung 06.08.: "Set-weit nicht gendern!" — dieselbe Ansage wie am
06.07. ("Lass das komische gendern bitte"), diesmal mit Auftrag zum Aufraeumen.
759 Formen in 39 Dateien sind raus; diese Stufe haelt sie draussen.

Anlass war ein Vorlese-Text: "Die Tafelrunde sucht neue Ritter:innen" — der
Doppelpunkt wird beim Vorlesen mitgelesen, das Kind hoert "Ritter Doppelpunkt
innen". Der Rest kam beim Nachmessen dazu.

Geprueft werden nur PRODUKT-Dateien. Doku und Historie bleiben aussen vor:
SESSION-NOTES, _dev/handoff, _dev/review und _dev/archive ZITIEREN die Formen
teilweise als Befund — sie umzuschreiben wuerde den Bericht verfaelschen.

Das Muster greift bewusst nur auf grossgeschriebene deutsche Nomen und eine
geschlossene Pronomen-Liste. Die erste, groebere Fassung meldete `default:e`,
`props:e`, `lane:r` und `color:e` — React-Interna und CSS-Eigenschaften, kein
Gendern. Wer das Muster lockert, holt sich diese Fehlalarme zurueck.

Paarformen ("Knappen und Knappinnen", "Rittern und Ritterinnen") sind KEIN
Fund — sie sind ausgeschrieben, sprechbar und bewusst gesetzt.
"""
import pathlib
import re
import sys

MUSTER_DATEIEN = (
    'data/**/*.json', 'kindergeburtstag/**/*.html', 'kindergeburtstag.html',
    'js/*.js', '_src/elite-motto-data/**/*.json', '_src/elite-motto-data/*.js',
    'paket/**/*.html', '_dev/scripts/add-sz-themes.js',
)

NOMEN = re.compile(r'\b([A-ZÄÖÜ][A-Za-zÄÖÜäöüß]{2,})[:*](innen|in)\b')
PRONOMEN = re.compile(
    r'\b(?:[Ee]rwachsene|[Jj]ede|[Ee]ine|[Kk]leine|[Ee]in|[Kk]ein|[Ee]rste|'
    r'[Oo]ffizielle|[Kk]önigliche)[:*][re]\b')

dateien = []
for pat in MUSTER_DATEIEN:
    dateien += [p for p in pathlib.Path('.').glob(pat) if p.is_file()]
dateien = sorted(set(dateien))

treffer = []
for p in dateien:
    try:
        t = p.read_text(encoding='utf-8')
    except Exception:
        continue
    for m in list(NOMEN.finditer(t)) + list(PRONOMEN.finditer(t)):
        zeile = t[:m.start()].count('\n') + 1
        treffer.append((str(p).replace('\\', '/'), zeile, m.group(0)))

for pfad, zeile, form in treffer[:14]:
    print('    %-44s Z.%-6d %s' % (pfad, zeile, form))
if len(treffer) > 14:
    print('    ... und %d weitere' % (len(treffer) - 14))
print('    %d Genderformen in %d Produkt-Dateien geprueft'
      % (len(treffer), len(dateien)))
sys.exit(1 if treffer else 0)
