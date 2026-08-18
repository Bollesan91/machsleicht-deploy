# -*- coding: utf-8 -*-
"""Stufe 57: Eine Augenspuelung dauert nie weniger als zehn Minuten.

Befund aus dem Re-Check am 18.08. (zweiter unabhaengiger Gutachter, 61/100). Der erste
Gutachter hatte die Fuenf-Minuten-Angabe auf dino-3-5 gemeldet; behoben wurde genau diese
eine Stelle, weil nur sie gedruckt war. Der Re-Check fand die Klasse:

    data/motto/weltraum-gross.json — "Bei Augenkontakt mit Wasser spuelen (5 Min)."

Im uebrigen Bestand steht 74-mal "mindestens 10 Minuten" — die Fuenf war der Ausreisser,
und sie stand im Paket, das Eltern kaufen.

Zehn Minuten ist die uebereinstimmende Empfehlung fuer Spuelungen bei Reizstoffen im Auge
(DGUV Erste Hilfe, gesund.bund.de, Kinderaerzte im Netz); bei Laugen und starken Saeuren
wird laenger gespuelt. Kuerzer ist in keinem Fall richtig, und ein Elternteil, das
danebensteht, hoert nach fuenf Minuten auf, wenn dort fuenf steht.

Geprueft wird in beiden Katalogen UND auf den Seiten. Eine Zahl unter zehn im
Spuel-Kontext ist ein FAIL, ebenso eine Spuelanweisung ganz ohne Dauer.

Gegenprobe: "(5 Min)" wieder einsetzen -> FAIL.
"""
import glob
import io
import os
import re
import sys

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MINDESTENS = 10

# Nur echte Spuel-Anweisungen: das Auge muss im Satz vorkommen. "Nach dem Spuelen kurz
# hinsetzen" ist keine Dauerangabe (Fehlalarm im ersten Entwurf).
# Nicht [^.!?;]{0,200}[.!?;}: In den JSON-Katalogen stehen Saetze laenger als 200
# Zeichen, und das Muster fand sie dann gar nicht — die Stufe meldete 0 FAIL und liess
# den eingeschleusten Fuenf-Minuten-Satz durch. Aufgefallen nur durch die Gegenprobe
# (Lektion L26: eine stille Null ist kein Ergebnis).
SATZ_TEILER = re.compile(r"[.!?;]")
# sp[üu]l trifft "spülen", aber NICHT "spuelen" — nach dem u kommt dort ein e.
# Genau in dieser Luecke sass die Fuenf-Minuten-Angabe, und die erste Gegenprobe
# rutschte deshalb durch. Transliterierte Formen sind in diesem Repo Normalfall.
SPUELEN = re.compile(r"sp[üu]e?l", re.I)
AUGE = re.compile(r"(auge|augen|augenkontakt|augenwinkel|lid)", re.I)
DAUER = re.compile(r"(\d{1,3})\s*(?:Min\.?|Minuten?)", re.I)
TAG = re.compile(r"<[^>]+>")


def quellen():
    for p in sorted(glob.glob(os.path.join(REPO, "data", "motto", "*.json"))):
        yield p, io.open(p, encoding="utf-8", errors="replace").read()
    for p in sorted(glob.glob(os.path.join(REPO, "_src", "elite-motto-data", "*.json"))):
        yield p, io.open(p, encoding="utf-8", errors="replace").read()
    b = os.path.join(REPO, "_src", "elite-motto-data", "_bundle.js")
    if os.path.exists(b):
        yield b, io.open(b, encoding="utf-8", errors="replace").read()
    for p in sorted(glob.glob(os.path.join(REPO, "kindergeburtstag", "*.html"))):
        roh = io.open(p, encoding="utf-8", errors="replace").read()
        roh = re.sub(r"<(script|style)\b.*?</\1>", " ", roh, flags=re.S | re.I)
        yield p, TAG.sub(" ", roh)


def main():
    fails = []
    geprueft = 0
    for pfad, text in quellen():
        text = re.sub(r"\s+", " ", text)
        for satz in SATZ_TEILER.split(text):
            satz = satz.strip()
            if not (SPUELEN.search(satz) and AUGE.search(satz)):
                continue
            geprueft += 1
            dauern = [int(x) for x in DAUER.findall(satz)]
            rel = os.path.relpath(pfad, REPO).replace(os.sep, "/")
            if not dauern:
                continue  # Dauer kann im Nachbarsatz stehen — kein FAIL, nur nichts zu pruefen
            if min(dauern) < MINDESTENS:
                fails.append((rel, min(dauern), satz[:140]))
    for rel, n, satz in fails:
        print('    FAIL %s: Augenspuelung mit %d Minuten — "%s"' % (rel, n, satz))
    print("Stufe 57: %d FAIL — %d Spuel-Anweisungen mit Augenbezug geprueft"
          % (len(fails), geprueft))
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
