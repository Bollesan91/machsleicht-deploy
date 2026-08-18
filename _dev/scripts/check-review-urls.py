# -*- coding: utf-8 -*-
"""Stufe 45: raw-URLs in Pruefauftraegen zeigen auf existierende Dateien.

Klasse statt Fall (Helfer V5 R1): Am 17.08. stand im Gate-B-Pruefauftrag der Pfad
`kindergeburtstag/piratengeburtstag-6-8-jahre.html` — die Datei heisst
`piraten-6-8-jahre.html`. Die Netz-Verifikation konnte das nicht fangen, weil
raw.githubusercontent.com zu dem Zeitpunkt 429 statt 404 lieferte: Ein rate-limiteter
Host beantwortet die Frage "gibt es den Pfad?" gar nicht. Ein Gutachter haette
stattdessen "Datei nicht gefunden" gemeldet und der halbe Auftrag waere verpufft.

Diese Stufe prueft ohne Netz gegen den Git-Baum: Jeder Pfad aus jeder
raw.githubusercontent.com-URL in `_dev/review/*.md` muss im Repo existieren.
Der SHA-Teil ist dabei egal (im Entwurf steht dort meist noch der Platzhalter SHA) —
geprueft wird der Pfad gegen HEAD, denn genau da liegt der Tippfehler.

Gegenprobe: einen Buchstaben im Dateinamen aendern -> FAIL.
"""
import io
import os
import re
import subprocess
import sys

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
RAW = re.compile(
    r"https://raw\.githubusercontent\.com/[^/\s]+/[^/\s]+/[0-9a-zA-Z_.-]+/([^\s)\"'>]+)")


def im_baum(pfad):
    """Existiert der Pfad in HEAD? (Datei im Arbeitsbaum reicht nicht — der
    Gutachter fetcht den Commit, nicht die Festplatte.)"""
    r = subprocess.run(["git", "-C", REPO, "cat-file", "-e", "HEAD:" + pfad],
                       capture_output=True)
    return r.returncode == 0


def main():
    ordner = os.path.join(REPO, "_dev", "review")
    if not os.path.isdir(ordner):
        print("Stufe 45: kein _dev/review — uebersprungen")
        return 0
    fails, geprueft, dateien = [], 0, 0
    for name in sorted(os.listdir(ordner)):
        if not name.endswith(".md"):
            continue
        pfad = os.path.join(ordner, name)
        text = io.open(pfad, encoding="utf-8", errors="replace").read()
        treffer = RAW.findall(text)
        if not treffer:
            continue
        dateien += 1
        for ziel in sorted(set(treffer)):
            # Platzhalter-URLs sind Absicht ("…/data/motto/<motto>.json") und
            # nicht pruefbar — nur echte Pfade zaehlen.
            if "<" in ziel or "{" in ziel:
                continue
            geprueft += 1
            if not im_baum(ziel):
                fails.append((name, ziel))
    for name, ziel in fails:
        print("    FAIL %s: raw-URL zeigt auf '%s' — existiert nicht in HEAD" % (name, ziel))
    print("Stufe 45: %d FAIL — %d raw-URL-Pfade in %d Pruefauftraegen geprueft"
          % (len(fails), geprueft, dateien))
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
