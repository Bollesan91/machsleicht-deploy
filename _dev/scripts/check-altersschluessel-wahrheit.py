# -*- coding: utf-8 -*-
"""Stufe 28: Sagt der ageAdjust-Schluessel dasselbe wie sein Text?

Das ist die Regel, an der die ganze Altersstaffel-Architektur haengt. Der
Schluessel `ageAdjust6` bedeutet laut Datenmodell "Anpassung fuer ein
6-jaehriges Kind" — nicht "zweite Stufe" und nicht "Slot B".

Am 06.08. widersprachen 40 Schluessel ihrem eigenen Inhalt, und zwar
systematisch: `ageAdjust8` trug 20x einen Text, der mit "Bei 5-Jaehrigen"
beginnt, `ageAdjust6` 19x einen mit "Bei 3-Jaehrigen". Die klein-Dateien hatten
6 und 8 als blosse Slot-Nummern benutzt.

Solange niemand die Zahl las, war das folgenlos. Als sie gelesen wurde, kostete
es sofort: ageAdjustFor() waehlt die groesste Stufe <= Alter, und die Vorlage
druckt den Block nur, wenn die Stufe ins Altersband der Datei faellt. Fuer ein
3-5-Paket ist Stufe 6 nie im Band — das bezahlte klein-Paket druckte NULL
Altershinweise, darunter Sicherheitszeilen ("weiche Stoff-Baelle ohne harte
Kerne", "Kissen-Burg niedriger (max 80 cm)", "Schaumstoff-Kloetze pflicht").

Stufe 26 prueft nur, ob eine Stufe im Band liegt. Sie waere nach dem Umbenennen
gruen geworden, ohne dass jemand die Texte gegengelesen haette — der Gutachter
hat genau das als Durchrutscher konstruiert. Diese Stufe schliesst das: sie
vergleicht die Zahl im Schluessel mit der Zahl, die der Text selbst nennt.

Texte, die ihr Alter NICHT nennen, kann diese Regel nicht pruefen — dafuer ist
Stufe 26 zustaendig (Band-Abdeckung). Die beiden zusammen decken den Fall ab:
26 fragt "gibt es ueberhaupt eine passende Stufe?", 28 fragt "stimmt die Zahl?".
"""
import glob
import json
import pathlib
import re
import sys

# "Bei 3-Jaehrigen: ...", "Fuer 8-Jaehrige: ...", auch am Satzanfang ohne
# Doppelpunkt. Runde-4-Sandbox-Belege (10.08.): "Ab 3 Jahren ..." rutschte
# durch (nur Bei/Fuer), und "Für 3 Äpfel extra einplanen" schlug an — die
# Zeichenklasse [JjÄäae] frass das Ä von Äpfel. Jetzt: mehr Praefixe, aber
# nach der Zahl MUSS ein Jahr-/Jährig-Wort folgen; Altersspannen (3-4) ok.
NENNT_ALTER = re.compile(
    r'^\s*(?:Bei|Für|Fuer|Ab|Mit|Erst\s+ab)\s+(\d+)(?:\s*-\s*\d+)?\s*-?\s*'
    r'(?:[Jj](?:ahr|ähr|aehr)\w*)')

treffer = []
geprueft = 0
ungeprueft = 0

for pfad in sorted(glob.glob('data/motto/*.json')):
    datei = pathlib.Path(pfad).name
    d = json.loads(pathlib.Path(pfad).read_text(encoding='utf-8'))
    gesehen = set()
    for v in (d.get('variants') or []):
        for g in (v.get('games') or []):
            if not isinstance(g, dict):
                continue
            name = str(g.get('name') or '')
            if (datei, name) in gesehen:
                continue
            gesehen.add((datei, name))
            for k, t in g.items():
                m = re.match(r'^ageAdjust(\d+)$', k)
                if not m or not isinstance(t, str) or not t.strip():
                    continue
                s = NENNT_ALTER.match(t)
                if not s:
                    ungeprueft += 1
                    continue
                geprueft += 1
                if int(s.group(1)) != int(m.group(1)):
                    treffer.append((datei, name[:30], k, int(s.group(1)), t[:44]))

for datei, name, k, gesagt, text in treffer[:14]:
    print('    %-24s %-30s %s sagt "%d": %s'
          % (datei, name.encode('ascii', 'replace').decode(), k, gesagt,
             text.encode('ascii', 'replace').decode()))
if len(treffer) > 14:
    print('    ... und %d weitere' % (len(treffer) - 14))
print('    %d Schluessel widersprechen ihrem Text (%d geprueft, %d nennen kein Alter)'
      % (len(treffer), geprueft, ungeprueft))
if not geprueft:
    # Eine leere Pruefung ist kein Bestehen. Der Praefix-Strip vom 06.08. hat
    # dieser Stufe die Beweisbasis genommen (0 von 709 nennen ihr Alter noch) —
    # sie ist damit fuer den Bestand blind und nur noch fuer NEUE Inhalte
    # wirksam. Das muss sichtbar sein, sonst liest jemand Gruen als Beleg.
    print('    HINWEIS: kein einziger Schluessel war pruefbar — diese Stufe')
    print('    belegt fuer den Bestand nichts. Sie greift erst wieder bei neuen')
    print('    Texten, die ihr Alter selbst nennen ("Bei 3-Jaehrigen: ...").')

sys.exit(1 if treffer else 0)
