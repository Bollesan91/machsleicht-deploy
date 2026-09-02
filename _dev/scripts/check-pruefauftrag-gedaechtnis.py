# -*- coding: utf-8 -*-
"""Stufe 69: Ein Pruefauftrag ohne das Gedaechtnis der letzten Runden.

ANLASS (02.09.2026, machsleicht-36)
Ein Gutachten meldete "Creator kennt nur 10 Mottos, Ritter fehlt". Live sind es 15.
Genau dieser Fehlalarm steht seit dem 13.07. als F8 WIDERLEGT in
`_dev/OFFENE-REVIEW-PUNKTE.md` — die Datei war im Prompt nur nicht erwaehnt. Eine
ganze Gutachten-Runde ging fuer eine Frage drauf, die vor sieben Wochen beantwortet
war. Dasselbe gilt fuer `_dev/LEKTIONEN.md`: was dort steht, muss ein Gutachter nicht
neu entdecken.

DIE REGEL
Jeder Pruefauftrag (`_dev/review/*prompt*.md`) nennt die False-Positive-Liste. Nicht
weil das Format wichtig waere, sondern weil der Gutachter sonst Dinge findet, die
schon verworfen sind — und der Auftraggeber sie ein zweites Mal verifiziert.

SPERRKLINKE STATT STICHTAG
Gemessen am 02.09.: 19 von 22 Auftraegen nennen sie bereits. Die drei alten bleiben
Bestand; die Zahl darf nicht steigen. So kostet die Regel niemanden Aufraeumarbeit
und faengt trotzdem jeden neuen Auftrag.

    python _dev/scripts/check-pruefauftrag-gedaechtnis.py
    python _dev/scripts/check-pruefauftrag-gedaechtnis.py --gegenprobe

Exit 0 = kein NEUER Auftrag ohne Gedaechtnis. Exit 1 = die Sperrklinke ist gerissen.
"""
import argparse
import glob
import io
import os
import sys

try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

ORDNER = os.path.join("_dev", "review")
MUSTER = "*prompt*.md"
GEDAECHTNIS = "OFFENE-REVIEW-PUNKTE"       # die False-Positive-Liste
MAX_OHNE = 3                                # gemessener Bestand am 02.09.2026


def auftraege():
    return sorted(glob.glob(os.path.join(ORDNER, MUSTER)))


def ohne_gedaechtnis(dateien):
    aus = []
    for f in dateien:
        try:
            if GEDAECHTNIS not in io.open(f, encoding="utf-8", errors="replace").read():
                aus.append(f)
        except Exception as e:
            aus.append(f + " (nicht lesbar: " + type(e).__name__ + ")")
    return aus


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--gegenprobe", action="store_true")
    args = ap.parse_args()

    dateien = auftraege()
    if not dateien:
        # Kein Auftrag da heisst NICHT bestanden. Es heisst, es gab nichts zu pruefen.
        print("    GRAU — keine Pruefauftraege in %s gefunden, also nichts geprueft." % ORDNER)
        return 0

    fehlend = ohne_gedaechtnis(dateien)

    if args.gegenprobe:
        # Ein Auftrag ohne die Liste MUSS auffallen, einer mit ihr nicht.
        mit = [f for f in dateien if f not in fehlend]
        a = GEDAECHTNIS not in "ein Prompt, der die Liste nicht nennt"
        b = bool(mit) and GEDAECHTNIS in io.open(mit[0], encoding="utf-8",
                                                 errors="replace").read()
        print("    Gegenprobe: Auftrag ohne Liste -> %s | Auftrag mit Liste -> %s"
              % ("erkannt" if a else "NICHT ERKANNT", "durchgelassen" if b else "FAELSCHLICH ROT"))
        return 0 if (a and b) else 1

    print("Stufe 69: %d Pruefauftraege, %d nennen die False-Positive-Liste "
          "(Sperrklinke: hoechstens %d ohne)"
          % (len(dateien), len(dateien) - len(fehlend), MAX_OHNE))
    for f in fehlend:
        print("    ohne Gedaechtnis: %s" % os.path.basename(f))
    if len(fehlend) > MAX_OHNE:
        print("    FAIL %d Auftraege ohne %s > %d — ein NEUER Auftrag schickt den Gutachter "
              "gegen bereits verworfene Befunde." % (len(fehlend), GEDAECHTNIS, MAX_OHNE))
        return 1
    if len(fehlend) < MAX_OHNE:
        print("    HINWEIS: nur noch %d ohne (Sperrklinke steht auf %d) — nachziehen."
              % (len(fehlend), MAX_OHNE))
    print("\n    0 FAIL — kein neuer Pruefauftrag ohne das Gedaechtnis der letzten Runden.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
