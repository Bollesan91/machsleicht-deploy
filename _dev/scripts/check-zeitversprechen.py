# -*- coding: utf-8 -*-
"""Stufe 53: Ein Produkt, eine Zahl. Das Zeitversprechen darf sich nicht widersprechen.

Befund 18.08.2026 (externer SEO-/E-E-A-T-Audit, nachgemessen): Die Startseite
verspricht den fertigen Plan "in 5 Minuten" — Title, og:description, H1, Subline,
JSON-LD-Beschreibung und die FAQ-Antwort ("in der Regel 5 Minuten oder weniger").
Dieselbe Leistung heisst auf 49 anderen Seiten "in 10 Minuten". Ueber-uns sagt 10,
die Motto-Hubs sagen 10, die Startseite sagt 5.

Beide Zahlen koennen stimmen — aber nicht fuer dieselbe Sache. Wer auf der
Startseite fuenf Minuten liest und auf der Motto-Seite zehn, glaubt keiner von
beiden. Fuer ein Werkzeug, dessen ganzes Versprechen "spart dir Zeit" lautet, ist
das der teuerste Widerspruch im Bestand.

Was diese Stufe prueft
----------------------
Sie sammelt Zeitversprechen je **Leistungsklasse** und verlangt, dass eine Klasse
genau EINE Zahl traegt. Sie schreibt keine Zahl vor — welche gilt, ist eine
Produktentscheidung. Sie macht nur unmoeglich, dass zwei nebeneinander stehen.

Klassen (heute eine, absichtlich eng):
  PLAN — "in N Minuten" im selben Satz wie der fertige Geburtstagsplan.

Nicht erfasst und nicht erwuenscht: Zeitangaben im Ablauf ("Deko in 20 Minuten",
"Kuchen in 15 Minuten"), Spielregeln ("wer baut in 3 Minuten den hoechsten Turm")
und Troestungen ("bei 3-5 weint ein Kind in 90 Min"). Das sind Inhalte, keine
Versprechen — ein Gate, das die einsammelt, waere Laerm.

Aufruf
------
    python _dev/scripts/check-zeitversprechen.py              # prueft
    python _dev/scripts/check-zeitversprechen.py --liste      # alle Fundstellen zeigen
    python _dev/scripts/check-zeitversprechen.py --gegenprobe # ist das Gate noch scharf?
"""
import collections
import glob
import os
import re
import sys

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

MUSTER = ["*.html", "kindergeburtstag/*.html", "einladung/*.html", "einladung/*/*.html",
          "schatzsuche/*.html", "js/index.js"]

# Die Leistung selbst: der fertige Plan / der geplante Geburtstag.
LEISTUNG = (r"(?:komplette[rn]?\s+[\wÄÖÜäöüß-]*\s?geburtstag|kindergeburtstag(?:\s+planen)?|"
            r"geburtstag\s+planen|(?:de[rn]|eine[rn]|dein(?:en)?)\s+(?:[\wÄÖÜäöüß-]+\s+)?plan\b|"
            r"komplette[rn]?\s+plan\b|fertige[rn]?\s+plan\b|plan\s+steht|party\s+planen)")
ZEIT = r"(?:in|unter|binnen|nur)\s+(\d{1,2})\s*(?:Minuten|Min\.?|Minute)\b"

# Beide Richtungen: "Kindergeburtstag planen in 5 Minuten" und "in 10 Minuten einen kompletten Plan".
# Die Luecke dazwischen darf keinen Satz- UND keinen Blockwechsel (¶) enthalten: Sonst klebt
# beim Plattmachen des HTML die Zeitangabe der einen Kachel an der Leistung der naechsten
# ("Schatzsuche erstellen · In 5 Minuten" + "Outdoor-Geburtstag planen" = Scheinwiderspruch).
LUECKE = r"[^.!?;¶]{0,60}?"
VORWAERTS = re.compile(LEISTUNG + LUECKE + ZEIT, re.I)
RUECKWAERTS = re.compile(ZEIT + LUECKE + LEISTUNG, re.I)

# Ablauf-/Spielkontext schliesst aus: dort geht es um Bastelzeit, nicht um das Produkt.
# "erledigt ist (Einkauf)" gehoert dazu — kindergeburtstag-wenig-aufwand sagt "wenn der
# ganze Plan in 30 Minuten erledigt ist (Einkauf) + 1 Stunde Vorbereitung": das ist die
# Zeit, die der Elternteil im Supermarkt steht, nicht die, die das Werkzeug braucht.
AUSSCHLUSS = re.compile(r"deko|kuchen|backen|aufpusten|basteln|weint|station|runde|stoppuhr|"
                        r"aufbau|vorbereitungszeit\s+am\s+tag|erledigt\s+ist|supermarkt", re.I)


INLINE = r"(?:a|b|strong|em|i|span|small|u|mark|abbr|code)"


def sichtbarer_text(pfad):
    return text_aus(open(pfad, encoding="utf-8", errors="replace").read(),
                    ist_html=pfad.endswith(".html"))


def text_aus(t, ist_html=True):
    if ist_html:
        t = re.sub(r"(?is)<(style|noscript)[^>]*>.*?</\1>", " ¶ ", t)
        t = re.sub(r"(?s)<!--.*?-->", " ¶ ", t)
        # Inline-Auszeichnung faellt spurlos weg — "in <b>10 Minuten</b> einen Plan" ist EIN Satz.
        t = re.sub(r"(?is)</?%s\b[^>]*>" % INLINE, " ", t)
        # Jedes andere Tag ist ein Blockwechsel und bekommt eine Grenze, damit zwei
        # Kacheln nicht zu einem Satz verschmelzen.
        t = re.sub(r"<[^>]+>", " ¶ ", t)
    t = re.sub(r"&[a-z]+;|&#\d+;", " ", t)
    t = t.replace("\\xB7", " ¶ ").replace("\\u00b7", " ¶ ")
    return re.sub(r"[ \t]+", " ", t)


def fundstellen(text, quelle):
    treffer = []
    for rx in (VORWAERTS, RUECKWAERTS):
        for m in rx.finditer(text):
            umfeld = text[max(0, m.start() - 50):m.end() + 50]
            if AUSSCHLUSS.search(umfeld):
                continue
            minuten = int(m.group(1))
            zitat = re.sub(r"\s+", " ", m.group(0)).strip()
            treffer.append((minuten, quelle, zitat[:120]))
    # Dubletten (beide Regexe treffen dieselbe Stelle) entfernen
    return sorted(set(treffer))


def sammeln():
    alle = []
    dateien = []
    for m in MUSTER:
        dateien.extend(glob.glob(os.path.join(REPO, m)))
    for pfad in sorted(set(dateien)):
        rel = os.path.relpath(pfad, REPO).replace(os.sep, "/")
        alle.extend(fundstellen(sichtbarer_text(pfad), rel))
    return alle


PROBEN = [
    ("Kindergeburtstag planen — in 5 Minuten statt einem ganzen Abend", 5, "Startseiten-H1"),
    ("machsleicht erstellt dir in 10 Minuten einen kompletten Dino-Geburtstag", 10, "Motto-Hub"),
    ("in <b>10 Minuten</b> einen kompletten Plan", 10, "Versprechen mit Inline-Auszeichnung"),
    ("<div>Schatzsuche erstellen</div><div>In 5 Minuten</div><div>Outdoor-Geburtstag planen</div>",
     None, "zwei Kacheln nebeneinander — darf NICHT zu einem Widerspruch verkleben"),
    ("Luftballons aufpusten und Deko in 20 Minuten aufhaengen", None, "Ablauf, kein Versprechen"),
    ("Wer baut in 3 Minuten den hoechsten Turm?", None, "Spielregel, kein Versprechen"),
    ("Fertige Backmischung: in 15 Minuten ist der Kuchen fertig", None, "Rezept, kein Versprechen"),
]


def gegenprobe():
    print("── Gegenprobe Stufe 53 ──")
    kaputt = 0
    for satz, erwartet, warum in PROBEN:
        gefunden = fundstellen(text_aus(satz), "<probe>")
        ist = gefunden[0][0] if gefunden else None
        ok = (ist == erwartet)
        kaputt += 0 if ok else 1
        print("   %-6s erwartet %-4s gefunden %-4s  %s" % (
            "OK" if ok else "BLIND", erwartet if erwartet else "—", ist if ist else "—", warum))
    print("Gegenprobe Stufe 53: %s" % ("alle %d Proben richtig beurteilt." % len(PROBEN) if not kaputt
                                       else "%d von %d Proben falsch — das Gate ist blind." % (kaputt, len(PROBEN))))
    return 1 if kaputt else 0


def main():
    if "--gegenprobe" in sys.argv:
        return gegenprobe()

    treffer = sammeln()
    zahlen = collections.Counter(t[0] for t in treffer)
    if "--liste" in sys.argv:
        for minuten, quelle, zitat in sorted(treffer):
            print("   %2d Min  %-46s %s" % (minuten, quelle, zitat))

    if len(zahlen) > 1:
        haupt, _ = zahlen.most_common(1)[0]
        print("    FAIL Klasse PLAN traegt %d verschiedene Zahlen: %s" % (
            len(zahlen), ", ".join("%d Min (%dx)" % (n, c) for n, c in zahlen.most_common())))
        for minuten, quelle, zitat in sorted(treffer):
            if minuten != haupt:
                print("         Abweichler: %-42s %d Min — \"%s\"" % (quelle, minuten, zitat))
        print("Stufe 53: 1 FAIL — %d Versprechen der Klasse PLAN in %d Dateien geprueft"
              % (len(treffer), len(set(t[1] for t in treffer))))
        return 1

    print("Stufe 53: 0 FAIL — %d Versprechen der Klasse PLAN, alle mit %s"
          % (len(treffer), ("%d Minuten" % list(zahlen)[0]) if zahlen else "— (keine gefunden)"))
    return 0


if __name__ == "__main__":
    sys.exit(main())
