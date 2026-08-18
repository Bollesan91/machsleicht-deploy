# -*- coding: utf-8 -*-
"""Stufe 58: Keine Provisionslinks ohne Kennzeichnung auf derselben Seite.

Befund 18.08.2026, selbst gebaut und selbst gefangen: `einkauf-drucken.py` hat sechs
Seiten eine Einkaufsliste gegeben — mit **19 Affiliate-Links je Seite** auf Seiten, die
vorher gar keine Werbelinks trugen. Die Kennzeichnung fehlte. Aufgefallen ist es NICHT
durch ein Gate, sondern durch eine Handpruefung nach dem Einbau; der einzige Treffer fuer
"affiliate" auf diesen Seiten war das Tracking-JavaScript.

Genau die Sorte Fehler, die eine Maschine multipliziert: Ein vergessener Satz im Generator
wird zu sechs Seiten ohne Kennzeichnung, und niemand sieht es beim Lesen des Diffs, weil
der Diff die Links zeigt und nicht das Fehlende.

Geprueft wird
-------------
Jede ausgelieferte Seite mit mindestens einem Amazon-Partnerlink (`tag=machsleicht21-21`
oder `rel="sponsored"`) traegt im sichtbaren Text eine Kennzeichnung — "Werbung",
"Affiliate-Link" oder "Provision". Skripte zaehlen nicht: Der Hinweis muss gelesen werden
koennen, nicht ausgefuehrt.

Gegenprobe (laeuft bei jedem Aufruf mit --gegenprobe): eine Seite mit Link und Hinweis
muss sauber sein, dieselbe Seite ohne Hinweis muss FAILen, und ein Hinweis, der nur im
<script> steht, darf nicht als Kennzeichnung durchgehen.
"""
import glob
import os
import re
import sys

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MUSTER = ["*.html", "kindergeburtstag/*.html", "einladung/*.html", "einladung/*/*.html",
          "schatzsuche/*.html", "paket/*.html"]

PARTNERLINK = re.compile(r'tag=machsleicht21-21|rel="[^"]*sponsored', re.I)
KENNZEICHNUNG = re.compile(r"werbung|affiliate|provision|partnerlink|anzeige", re.I)


def sichtbarer_text(roh):
    """Ohne Skripte, Styles und Kommentare — der Hinweis muss lesbar sein, nicht ausfuehrbar."""
    t = re.sub(r"(?is)<(script|style|noscript)[^>]*>.*?</\1>", " ", roh)
    t = re.sub(r"(?s)<!--.*?-->", " ", t)
    return re.sub(r"<[^>]+>", " ", t)


PROBEN = [
    ('<a href="x?tag=machsleicht21-21">Lampe</a><p>Werbung: Affiliate-Links zu Amazon.</p>',
     False, "Link mit sichtbarer Kennzeichnung"),
    ('<a href="x?tag=machsleicht21-21">Lampe</a><p>Einfach kaufen.</p>',
     True, "Link ohne jede Kennzeichnung"),
    ('<a href="x?tag=machsleicht21-21">Lampe</a><script>p("affiliate-click")</script>',
     True, "Kennzeichnung nur im Skript zaehlt nicht"),
    ('<p>Kein Partnerlink weit und breit.</p>', False, "Seite ohne Partnerlinks"),
]


def gegenprobe():
    print("── Gegenprobe Stufe 58 ──")
    kaputt = 0
    for html, muss_failen, warum in PROBEN:
        hat_link = bool(PARTNERLINK.search(html))
        hat_hinweis = bool(KENNZEICHNUNG.search(sichtbarer_text(html)))
        failt = hat_link and not hat_hinweis
        ok = failt == muss_failen
        kaputt += 0 if ok else 1
        print("   %-6s %-9s %s" % ("OK" if ok else "BLIND",
                                   "FAIL" if muss_failen else "sauber", warum))
    print("Gegenprobe Stufe 58: %s"
          % ("alle %d Proben richtig beurteilt." % len(PROBEN) if not kaputt
             else "%d von %d Proben falsch — das Gate ist blind." % (kaputt, len(PROBEN))))
    return 1 if kaputt else 0


def main():
    if "--gegenprobe" in sys.argv:
        return gegenprobe()
    dateien = []
    for m in MUSTER:
        dateien.extend(glob.glob(os.path.join(REPO, m)))
    fails, mit_links = [], 0
    for pfad in sorted(set(dateien)):
        roh = open(pfad, encoding="utf-8", errors="replace").read()
        if not PARTNERLINK.search(roh):
            continue
        mit_links += 1
        if not KENNZEICHNUNG.search(sichtbarer_text(roh)):
            rel = os.path.relpath(pfad, REPO).replace(os.sep, "/")
            fails.append("%s: %d Partnerlink(s), keine sichtbare Kennzeichnung"
                         % (rel, len(PARTNERLINK.findall(roh))))
    for f in fails:
        print("    FAIL " + f)
    print("Stufe 58: %d FAIL — %d Seiten mit Partnerlinks geprueft" % (len(fails), mit_links))
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
