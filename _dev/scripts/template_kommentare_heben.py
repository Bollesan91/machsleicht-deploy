# -*- coding: utf-8 -*-
"""Template auf dinos ausfuehrlichere Kommentare heben.

Dinos zehn Restabweichungen sind ausnahmslos Kommentare — und die laengeren,
besseren. Sie nennen Datum, Symptom und Grund:

    "ein String-Item druckte '<b>undefined</b>' (ausgerechnet ein Sicherheits-Check)"

Das Template trug nur die Kurzfassung. Dino auf das Template herunterzuziehen
hiesse, Wissen wegzuwerfen, nur damit ein Zaehler auf null geht. Also andersrum.

Dass feuerwehr, baustelle und meerjungfrau danach abweichen, ist richtig: Sie
werden aus der Maschine neu gebaut und bekommen die besseren Kommentare mit.
"""
import pathlib, sys

TPL = pathlib.Path('paket/_maschine/template.html')

PAARE = [
 ("""  /* Gate-M4-Familie: Countdown-Items driften zwischen String und Objekt. */""",
  """  /* Gate-M4-Familie (01.08.): auch Countdown-Items driften zwischen String und Objekt —
     ein String-Item druckte '<b>undefined</b>' (ausgerechnet ein Sicherheits-Check). */"""),
 ("""    /* Gate-M4: Steps sind je nach Motto Strings ODER {name,content}-Objekte — Guard deckt beides. */""",
  """    /* Gate-M4 (01.08.): Dino-Steps sind Strings, Piraten-Steps {name,content}-Objekte — ohne
       diesen Guard druckten ALLE Dino-Spielkarten leere Anleitungen (esc(undefined)='').
       Der Ritual-Renderer unten toleriert beide Formen seit je; jetzt tut es der Spiel-Renderer auch. */"""),
]

s = TPL.read_text(encoding='utf-8')
fehlt = [k for k, _ in PAARE if k not in s]
if fehlt:
    print('ABBRUCH — Kurzfassung nicht im Template:')
    for f in fehlt: print('  ', f.strip()[:100])
    sys.exit(1)

for kurz, lang in PAARE:
    if s.count(kurz) != 1:
        print('ABBRUCH: Kommentar %dx statt 1x' % s.count(kurz)); sys.exit(1)
    s = s.replace(kurz, lang, 1)

# Der dritte Block (Vorleser-Begruendung) fehlt im Template ganz — er steht bei
# dino direkt vor der Spielkarten-Schleife und erklaert eine BEWUSSTE Entscheidung
# von Bolle. Eine Begruendung, die nur in einem von fuenf Paketen steht, ist so gut
# wie keine.
ANKER = "  const cards=(v.games||[]).map(g=>{"
VORLESER = """  /* Bolle 01.08.: KEIN Vorleser auf Spielkarten — Materiallisten und Schritte sind
     Erwachsenen-Lesestoff. Vorlesen gibt es nur an den Schatzsuche-Stationen,
     wo eine Aufgabe/Story fuer die Kinder erzaehlt wird (shStations/renderStation). */
"""
if ANKER not in s:
    print('ABBRUCH: Anker fuer den Vorleser-Kommentar fehlt'); sys.exit(1)
if 'KEIN Vorleser auf Spielkarten' not in s:
    s = s.replace(ANKER, VORLESER + ANKER, 1)

if 'schreib' not in sys.argv:
    print('TROCKENLAUF — nichts geschrieben.'); sys.exit(0)
TPL.write_text(s, encoding='utf-8')
print('Template auf die ausfuehrlichen Kommentare gehoben (2 ersetzt, 1 ergaenzt).')
