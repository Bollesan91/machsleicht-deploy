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

# Welle 3 (19.08.): Vier von neunzehn fremden Eltern fanden den Widerspruch 5-gegen-10
# selbst — und sagten alle dasselbe: wer eine Behauptung prueft und sie stimmt nicht,
# prueft ab da auch alle anderen. Zwei Fundstellen, zwei verschiedene Loecher:
#  * party-worker.js:2030 verspricht auf der GAESTESEITE "in 5 Minuten". Die Stufe las
#    ueberhaupt kein Worker-JS — sie kannte nur js/index.js. Die Seite, die jede
#    eingeladene Familie sieht, lag damit ausserhalb jeder Zeitversprechen-Pruefung.
#  * einladung/erstellen/index.html:296 stand im Suchmuster, rutschte aber am Wortlaut
#    vorbei: "Komplett-Planer" ist kein "kompletter Plan", und bis zur Zeitangabe lagen
#    mehr als 60 Zeichen. Ein Muster, das nur die eigene Lieblingsformulierung kennt,
#    prueft die Formulierung, nicht das Versprechen.
MUSTER = ["*.html", "kindergeburtstag/*.html", "einladung/*.html", "einladung/*/*.html",
          "schatzsuche/*.html", "paket/*.html", "paket/*/*.html", "spiele/*.html",
          "js/index.js", "party-worker.js"]

# Die Leistung selbst: der fertige Plan / der geplante Geburtstag.
LEISTUNG = (r"(?:komplette[rn]?\s+[\wÄÖÜäöüß-]*\s?geburtstag|kindergeburtstag(?:\s+planen)?|"
            r"geburtstag\s+planen|(?:de[rn]|eine[rn]|dein(?:en)?)\s+(?:[\wÄÖÜäöüß-]+\s+)?plan\b|"
            r"komplette[rn]?\s+plan\b|fertige[rn]?\s+plan\b|plan\s+steht|party\s+planen|"
            # Welle 3: Das Produkt heisst an zwei Stellen "Komplett-Planer" bzw. "Party-Planer".
            # Wer den Namen des eigenen Produkts nicht als Leistung erkennt, prueft es nicht.
            r"[\wÄÖÜäöüß]*-?planer\b|partyseite\s*\+\s*den\s+kompletten\s+plan)")
# Gutachten 18.08. (§5.1): Der erste Entwurf verlangte die Ziffer unmittelbar hinter der
# Praeposition — und liess ausgerechnet die FAQ-Antwort des eigenen Gruendungsfalls durch
# ("In der Regel 5 Minuten oder weniger": drei Woerter dazwischen). Ebenso durchgerutscht
# sind "nach 5 Minuten", "5 Minuten bis zum fertigen Plan" (Zahl ohne Praeposition) und
# die ausgeschriebene Zahl. Alle vier stehen jetzt als Dauerproben in der Gegenprobe.
ZAHLWORT = {"zwei": 2, "drei": 3, "vier": 4, "fuenf": 5, "fünf": 5, "sechs": 6,
            "sieben": 7, "acht": 8, "neun": 9, "zehn": 10, "zwoelf": 12, "zwölf": 12,
            "fuenfzehn": 15, "fünfzehn": 15, "zwanzig": 20, "dreissig": 30, "dreißig": 30}
ZAHL = r"(\d{1,2}|" + "|".join(sorted(ZAHLWORT, key=len, reverse=True)) + r")"
EINHEIT = r"\s*(?:Minuten|Min\.?|Minute)\b"
# Die Zahl ohne Praeposition ("5 Minuten bis zum fertigen Plan") braucht ein eigenes
# Muster mit Anschluss. Ohne den Anschluss wurde jeder Zeitstempel ("zuletzt bearbeitet
# vor 5 Min") und jede Aktivitaetsdauer ("5 Min pro Aktivitaet: Dein Plan") zum
# Versprechen — im ersten Lauf nach der Haertung prompt dreimal passiert.
ZEIT = r"(?:in|unter|binnen|nur|nach)\s+(?:[\wÄÖÜäöüß]+\s+){0,3}?" + ZAHL + EINHEIT
ZEIT_NACHGESTELLT = ZAHL + EINHEIT + r"\s+bis\s+zu[mr]"

# Beide Richtungen: "Kindergeburtstag planen in 5 Minuten" und "in 10 Minuten einen kompletten Plan".
# Die Luecke dazwischen darf keinen Satz- UND keinen Blockwechsel (¶) enthalten: Sonst klebt
# beim Plattmachen des HTML die Zeitangabe der einen Kachel an der Leistung der naechsten
# ("Schatzsuche erstellen · In 5 Minuten" + "Outdoor-Geburtstag planen" = Scheinwiderspruch).
# 19.08. von 60 auf 100: "Der Komplett-Planer baut dir Spiele, Zeitplan & Einkaufsliste
# fuer den Partytag — kostenlos, in 5 Minuten" ist EIN Satz, aber 72 Zeichen breit. Der
# Schutz gegen zusammengeklebte Kacheln steckt ohnehin in der Zeichenklasse (kein Satz-
# und kein Blockwechsel dazwischen), nicht in der Laenge — die Laenge sortierte nur
# laengere Saetze aus, und ausgerechnet in einem davon stand der Widerspruch.
LUECKE = r"[^.!?;¶]{0,100}?"
# Zweite Klasse, Befund §4.1b aus dem Gutachten: Der Einladungs-Generator versprach auf
# einigen Seiten 2 Minuten und auf anderen 3 — derselbe Widerspruchstyp wie 5-gegen-10,
# nur ein Produkt weiter. Bolle-Entscheidung 18.08.: Einladung = 3 Minuten.
LEISTUNG_EINLADUNG = (r"(?:einladung(?:en|s-?karte|skarten)?|einladung\s+erstellen|"
                      r"einladung\s+gestalten)")


def _muster(leistung):
    return (re.compile(leistung + LUECKE + ZEIT, re.I),
            re.compile(ZEIT + LUECKE + leistung, re.I),
            re.compile(ZEIT_NACHGESTELLT + LUECKE + leistung, re.I))


MUSTER_JE_KLASSE = {"PLAN": _muster(LEISTUNG), "EINLADUNG": _muster(LEISTUNG_EINLADUNG)}

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


def fundstellen(text, quelle, klasse="PLAN"):
    muster = MUSTER_JE_KLASSE[klasse]
    treffer = []
    for rx in muster:
        for m in rx.finditer(text):
            # Gutachten 18.08.: Das feste 50-Zeichen-Fenster war ein Selbstschuss — auf
            # einer Kindergeburtstagsseite steht "Deko" fast immer in der Naehe und
            # schaltete damit die Pruefung ab. Jetzt zaehlt nur der Satz, in dem das
            # Versprechen selbst steht.
            grenzen = [text.rfind(z, 0, m.start()) for z in ".!?;¶"]
            satz_start = max(grenzen) + 1
            enden = [p for p in (text.find(z, m.end()) for z in ".!?;¶") if p > 0]
            satz_ende = min(enden) if enden else len(text)
            if AUSSCHLUSS.search(text[satz_start:satz_ende]):
                continue
            roh = m.group(1).lower()
            minuten = int(roh) if roh.isdigit() else ZAHLWORT[roh]
            zitat = re.sub(r"\s+", " ", m.group(0)).strip()
            treffer.append((minuten, quelle, zitat[:120]))
    # Dubletten (beide Regexe treffen dieselbe Stelle) entfernen
    return sorted(set(treffer))


def sammeln(klasse="PLAN"):
    alle = []
    dateien = []
    for m in MUSTER:
        dateien.extend(glob.glob(os.path.join(REPO, m)))
    for pfad in sorted(set(dateien)):
        rel = os.path.relpath(pfad, REPO).replace(os.sep, "/")
        alle.extend(fundstellen(sichtbarer_text(pfad), rel, klasse))
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
    # Die Durchrutscher, die der Gutachter am 18.08. ausgefuehrt hat — ab jetzt Dauerproben:
    ("Wie lange dauert das? In der Regel 5 Minuten oder weniger, dann steht dein Plan.",
     5, "FAQ-Antwort mit Fuellwoertern — der eigene Gruendungsfall"),
    ("Dein kompletter Plan steht nach 5 Minuten", 5, "Praeposition 'nach'"),
    ("Kindergeburtstag planen in fuenf Minuten", 5, "ausgeschriebene Zahl"),
    ("5 Minuten bis zum fertigen Plan", 5, "Zahl ohne Praeposition"),
]

PROBEN_EINLADUNG = [
    ("Deine Einladung ist in 3 Minuten fertig", 3, "Einladungs-Versprechen"),
    ("Einladung erstellen — in zwei Minuten", 2, "Einladung mit ausgeschriebener Zahl"),
    ("Wer baut in 3 Minuten den hoechsten Turm?", None, "Spielregel bleibt still"),
]


def gegenprobe():
    print("── Gegenprobe Stufe 53 ──")
    kaputt = 0
    proben = [(s, e, w, "PLAN") for s, e, w in PROBEN] +             [(s, e, w, "EINLADUNG") for s, e, w in PROBEN_EINLADUNG]
    for satz, erwartet, warum, klasse in proben:
        gefunden = fundstellen(text_aus(satz), "<probe>", klasse)
        ist = gefunden[0][0] if gefunden else None
        ok = (ist == erwartet)
        kaputt += 0 if ok else 1
        print("   %-6s erwartet %-4s gefunden %-4s  %s" % (
            "OK" if ok else "BLIND", erwartet if erwartet else "—", ist if ist else "—", warum))
    print("Gegenprobe Stufe 53: %s" % ("alle %d Proben richtig beurteilt." % len(proben) if not kaputt
                                       else "%d von %d Proben falsch — das Gate ist blind." % (kaputt, len(proben))))
    return 1 if kaputt else 0


def main():
    if "--gegenprobe" in sys.argv:
        return gegenprobe()

    fails = 0
    bericht = []
    for klasse in sorted(MUSTER_JE_KLASSE):
        treffer = sammeln(klasse)
        zahlen = collections.Counter(t[0] for t in treffer)
        if "--liste" in sys.argv:
            for minuten, quelle, zitat in sorted(treffer):
                print("   [%s] %2d Min  %-42s %s" % (klasse, minuten, quelle, zitat))
        if len(zahlen) > 1:
            fails += 1
            haupt, _ = zahlen.most_common(1)[0]
            print("    FAIL Klasse %s traegt %d verschiedene Zahlen: %s" % (
                klasse, len(zahlen), ", ".join("%d Min (%dx)" % (n, c) for n, c in zahlen.most_common())))
            for minuten, quelle, zitat in sorted(treffer):
                if minuten != haupt:
                    print("         Abweichler: %-42s %d Min — \"%s\"" % (quelle, minuten, zitat))
        bericht.append("%s %d Versprechen%s" % (
            klasse, len(treffer),
            (" mit %d Minuten" % list(zahlen)[0]) if len(zahlen) == 1 else ""))
    print("Stufe 53: %d FAIL — %s" % (fails, " · ".join(bericht)))
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
