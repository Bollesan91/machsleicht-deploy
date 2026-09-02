# -*- coding: utf-8 -*-
"""Stufe 67: Ein Cache-Buster, der aelter ist als die Datei, die er frisch halten soll.

ANLASS (02.09.2026, Kartierung machsleicht-36, vom Pruefstand nachgemessen)
Alle 60 core-Spiele laden `spiele/core/core.js?v=20260802`. Die Datei wurde zuletzt
am **27.08.2026** geaendert (Commit 280d82e9, "fuenf Blocker zu"). Der Buster ist
25 Tage aelter als der Code — wer die Seite schon einmal geladen hat, bekommt die
alte Fassung aus dem Browser-Cache und damit die fuenf Blocker zurueck, die laengst
gefixt sind. Das faellt niemandem auf, der die Seite zum ersten Mal oeffnet: genau
deshalb braucht es eine Maschine dafuer und kein Auge.

DIE REGEL
Fuer jede Referenz `<pfad>?v=<JJJJMMTT>`: das Datum im Buster darf nicht aelter sein
als die letzte Aenderung der referenzierten Datei. Gemessen wird gegen die
Versionsgeschichte, nicht gegen die Dateizeit — mtime aendert sich bei jedem Checkout.

    python _dev/scripts/check-cache-buster.py
    python _dev/scripts/check-cache-buster.py --gegenprobe

Exit 0 = jeder Buster ist mindestens so neu wie seine Datei. Exit 1 = mindestens einer haengt.
"""
import argparse
import collections
import io
import os
import re
import subprocess
import sys

try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

# ?v=20260802 — nur Tagesdaten, keine Hashes und keine Zaehler. Wer einen Hash nutzt,
# hat das Problem ohnehin nicht.
REF = re.compile(r"""["'(]([^"'()\s]+\.(?:js|css|mjs))\?v=(\d{8})""")
SUCHTYPEN = (".html", ".js", ".mjs", ".css")


def versioniert():
    aus = subprocess.run(["git", "ls-files"], capture_output=True, text=True, timeout=180)
    if aus.returncode != 0 or not aus.stdout.strip():
        return None
    return [z.strip() for z in aus.stdout.splitlines() if z.strip()]


def letzte_aenderung(pfad, cache={}):
    if pfad in cache:
        return cache[pfad]
    aus = subprocess.run(["git", "log", "-1", "--format=%cd", "--date=format:%Y%m%d",
                          "--", pfad], capture_output=True, text=True, timeout=120)
    cache[pfad] = aus.stdout.strip() if aus.returncode == 0 else ""
    return cache[pfad]


def aufloesen(quelle, ziel):
    """Referenzen sind absolut (/spiele/core/core.js) oder relativ zur Quelldatei."""
    if ziel.startswith("//") or ziel.startswith("http"):
        return None
    if ziel.startswith("/"):
        return ziel.lstrip("/")
    return os.path.normpath(os.path.join(os.path.dirname(quelle), ziel)).replace(os.sep, "/")


def sammeln():
    dateien = versioniert()
    if dateien is None:
        return None
    treffer = []
    for f in dateien:
        if not f.endswith(SUCHTYPEN):
            continue
        # `_dev/` wird nicht ausgeliefert (.netlifyignore). Ein eingefrorener
        # Vorher-Schnappschuss in _dev/review SOLL seinen alten Buster behalten —
        # ihn zu melden waere ein Fehlalarm, und Fehlalarme bringen bei, die Stufe
        # zu ignorieren.
        if f.startswith("_dev/"):
            continue
        try:
            text = io.open(f, encoding="utf-8", errors="replace").read()
        except Exception:
            continue
        for ziel, datum in REF.findall(text):
            pfad = aufloesen(f, ziel)
            if pfad and pfad in dateien:
                treffer.append((f, pfad, datum))
    return treffer


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--gegenprobe", action="store_true")
    args = ap.parse_args()

    treffer = sammeln()
    if treffer is None:
        print("    HINWEIS: kein Git-Stand abrufbar — Stufe 67 kann nicht messen.")
        return 1

    if args.gegenprobe:
        # Die Regel muss ein zu altes Datum erkennen und ein aktuelles durchlassen.
        if not treffer:
            print("    GEGENPROBE UNMOEGLICH: keine Referenz mit ?v= gefunden")
            return 1
        _q, ziel, _d = treffer[0]
        stand = letzte_aenderung(ziel)
        alt_erkannt = "19700101" < stand
        neu_ok = not ("99991231" < stand)
        print("    Gegenprobe: zu altes Datum -> %s | aktuelles Datum -> %s"
              % ("erkannt" if alt_erkannt else "NICHT ERKANNT",
                 "durchgelassen" if neu_ok else "FAELSCHLICH ROT"))
        return 0 if (alt_erkannt and neu_ok) else 1

    veraltet = collections.defaultdict(list)
    for quelle, ziel, datum in treffer:
        stand = letzte_aenderung(ziel)
        if stand and datum < stand:
            veraltet[(ziel, datum, stand)].append(quelle)

    ziele = sorted({t[1] for t in treffer})
    print("Stufe 67: %d Referenzen mit ?v=, %d verschiedene Dateien"
          % (len(treffer), len(ziele)))
    if not veraltet:
        print("\n    0 FAIL — jeder Cache-Buster ist mindestens so neu wie seine Datei.")
        return 0

    for (ziel, datum, stand), quellen in sorted(veraltet.items()):
        print("    FAIL %s?v=%s — Datei zuletzt geaendert am %s, in %d Datei(en) referenziert"
              % (ziel, datum, stand, len(quellen)))
        for q in quellen[:3]:
            print("         z. B. %s" % q)
        print("         Fix: ?v=%s setzen (in allen %d Referenzen)" % (stand, len(quellen)))
    print("\n    %d FAIL — ein Browser mit Cache bekommt hier die alte Fassung."
          % len(veraltet))
    return 1


if __name__ == "__main__":
    sys.exit(main())
