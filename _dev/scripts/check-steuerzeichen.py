# -*- coding: utf-8 -*-
"""Stufe 51: Kein C1-Steuerzeichen im ausgelieferten HTML.

Befund 18.08.2026, Beifang beim Bau des Spielkarten-Kanals: Die Spielkarte
"Mini-Schatzsuche zur Perlen-Truhe" auf meerjungfrau-3-5 heisst im Quelltext
"<Karten-Emoji><U+008F> Mini-Schatzsuche …". Die Suche nach der Ursache fand 47
solcher Bytes auf derselben Seite — und eines davon steht im `og:title`:

    <meta property="og:title" content="<Meerjungfrau><U+200D><U+008D><U+2640><U+FE0F><U+008F> Meerjun…

Das ist der Text, den WhatsApp, Facebook und Signal in der Link-Vorschau zeigen.
Entstanden ist er, als eine Emoji-Sequenz einmal falsch dekodiert wurde: Von den
Mehrbyte-Zeichen U+200D (Zero Width Joiner) und U+FE0F (Variantenselektor) blieb das
letzte Byte als eigenes Zeichen stehen. Sichtbar wird das je nach Client als Kaestchen
oder als abgetrenntes Symbol.

C1-Steuerzeichen (U+0080 bis U+009F) haben in HTML-Text keinerlei gueltige Verwendung.
Diese Stufe verbietet sie deshalb rundheraus — inklusive der Emoji-Reste, die sonst
niemandem auffallen, weil sie meistens unsichtbar sind.

Gegenprobe: ein U+009F an beliebiger Stelle einfuegen -> FAIL.
"""
import collections
import glob
import io
import os
import sys
import unicodedata

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
ORDNER = ("kindergeburtstag", "einladung", "spiele", ".")
ERLAUBT = set("\t\n\r")


def dateien():
    for ordner in ORDNER:
        muster = os.path.join(REPO, ordner, "*.html")
        for pfad in sorted(glob.glob(muster)):
            yield pfad


def main():
    fails = []
    geprueft = 0
    for pfad in dateien():
        geprueft += 1
        text = io.open(pfad, encoding="utf-8", errors="replace").read()
        treffer = collections.Counter()
        stelle = {}
        for i, c in enumerate(text):
            if unicodedata.category(c) == "Cc" and c not in ERLAUBT:
                schluessel = "U+%04X" % ord(c)
                treffer[schluessel] += 1
                stelle.setdefault(schluessel, text[max(0, i - 30):i].strip()[-30:])
        if treffer:
            rel = os.path.relpath(pfad, REPO).replace(os.sep, "/")
            fails.append((rel, treffer, stelle))

    for rel, treffer, stelle in fails:
        art = ", ".join("%s %dx" % (k, v) for k, v in treffer.most_common())
        print("    FAIL %s: Steuerzeichen im HTML — %s" % (rel, art))
        for k in list(treffer)[:2]:
            print("         zuletzt vor: ...%s" % stelle[k])
    print("Stufe 51: %d FAIL — %d HTML-Dateien auf C1-Steuerzeichen geprueft"
          % (len(fails), geprueft))
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
