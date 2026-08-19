# -*- coding: utf-8 -*-
"""Stufe 50: Ein gedrucktes Datum muss stimmen — Wochentag und Zeitrichtung.

Befund 18.08.2026 (externer SEO-/E-E-A-T-Audit, Punkt selbst nachgerechnet):
Der Planer zeigt im oeffentlich gerenderten Beispiel

    <span id="planDate1">Sa, 21.06.2026, 14:00 Uhr</span>

Der 21.06.2026 war ein **Sonntag** — und lag am Prueftag bereits zwei Monate in der
Vergangenheit. Fuer ein Planungswerkzeug ist ein falscher Wochentag kein Schoenheits-
fehler: Es ist genau die Sorte Detail, an der ein Elternteil merkt, dass die Zahlen
auf der Seite niemand nachrechnet. Googlebot sieht denselben Text — im statischen
HTML, bevor irgendein JavaScript den Platzhalter ersetzt.

Was diese Stufe prueft
----------------------
1. **Wochentag stimmt** (hart, keine Ausnahme moeglich): Steht ein Wochentag direkt
   vor einem Datum ("Sa, 21.06.2026", "Samstag, 21.06.2026", "Sa. 21.06.2026"),
   muss er zum Datum gehoeren. Ein falscher Wochentag ist immer ein Fehler, egal
   in welchem Zusammenhang er steht.

2. **Beispieldaten liegen nicht in der Vergangenheit** (hart, eng gefasst): Ein
   Datum in einem Vorschau-Element — erkennbar an id/class wie `planDate`, `sumDate`,
   `demo`, `beispiel`, `preview`, `vorschau` — bewirbt einen Termin, der noch
   kommen soll. Liegt es hinter dem heutigen Tag, ist die Vorschau abgelaufen.

Bewusst NICHT geprueft: Datumsangaben im Fliesstext ausserhalb von Vorschau-
Elementen ("Stand: 27.07.2026", "zuletzt geprueft am …"). Die duerfen und sollen in
der Vergangenheit liegen — ein Gate, das die anmeckert, wuerde die eigene
Aktualitaets-Angabe bestrafen.

Skripte und Kommentare werden vor der Pruefung entfernt: `formatDateShort()` und
Beispieldaten in JS-Kommentaren sind kein gedruckter Text.

Gegenprobe
----------
Diese Stufe steht nach dem Fix auf sehr wenigen geprueften Stellen — genau die Lage,
in der "0 FAIL" nichts beweist (Lektion L22: ein Filter, der nichts mehr findet,
kann kaputt sein statt zufrieden). Deshalb faehrt `--gegenprobe` bei JEDEM Lauf
konstruierte Faelle durch dieselbe Logik: drei, die FAILen muessen, drei, die
durchgehen muessen. Schlaegt die Gegenprobe fehl, ist das Gate blind und meldet das.

    python _dev/scripts/check-datumsangaben.py --gegenprobe
"""
import datetime
import glob
import os
import re
import sys

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Verzeichnisse, die ausgeliefert werden. _dev/_src/_build sind per robots +
# _redirects gesperrt und tragen Entwuerfe — die pruefen wir nicht.
MUSTER = [
    "*.html",
    "kindergeburtstag/*.html",
    "einladung/*.html",
    "einladung/*/*.html",
    "schatzsuche/*.html",
    "spiele/*.html",
    "paket/*.html",
]

WOCHENTAGE = {
    "mo": 0, "montag": 0,
    "di": 1, "dienstag": 1,
    "mi": 2, "mittwoch": 2,
    "do": 3, "donnerstag": 3,
    "fr": 4, "freitag": 4,
    "sa": 5, "samstag": 5, "sonnabend": 5,
    "so": 6, "sonntag": 6,
}
NAME = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"]

MONATE = {"januar": 1, "februar": 2, "maerz": 3, "märz": 3, "april": 4, "mai": 5,
          "juni": 6, "juli": 7, "august": 8, "september": 9, "oktober": 10,
          "november": 11, "dezember": 12}

# Gutachten 18.08. (§5.2): Der erste Entwurf sah nur die Ziffernform. Durchgerutscht sind
# "Samstag, 21. Juni 2026" (ausgeschriebener Monat) und "<b>Sa</b>, <span>21.06.2026</span>"
# (Wochentag und Datum in getrennten Tags — nach dem Entfernen der Tags steht ein Leerzeichen
# vor dem Komma). Beides sind jetzt Dauerproben.
WOCHENTAG_VORSPANN = (r"\b(" + "|".join(sorted(WOCHENTAGE, key=len, reverse=True))
                      + r")\b\s*[.,]?\s*(?:den\s+)?")
MIT_WOCHENTAG = re.compile(WOCHENTAG_VORSPANN + r"(\d{1,2})\.\s?(\d{1,2})\.\s?(\d{4})", re.I)
MIT_WOCHENTAG_MONATSNAME = re.compile(
    WOCHENTAG_VORSPANN + r"(\d{1,2})\.\s*(" + "|".join(sorted(MONATE, key=len, reverse=True))
    + r")\s+(\d{4})", re.I)
# Wochentag ohne Jahr: der Wochentag ist dann nicht pruefbar — und genau so ist der
# Gruendungsfall einmal durchgerutscht.
MIT_WOCHENTAG_OHNE_JAHR = re.compile(WOCHENTAG_VORSPANN + r"(\d{1,2})\.\s?(\d{1,2})\.(?!\s?\d)", re.I)
NUR_DATUM = re.compile(r"\b(\d{1,2})\.\s?(\d{1,2})\.\s?(\d{4})\b")

# Vorschau-Elemente: <span id="planDate1">…</span>, <div class="demo-datum">…</div>
VORSCHAU_ATTRIBUT = re.compile(r"(?:id|class)\s*=\s*[\"'][^\"']*"
                               r"(plandate|sumdate|demo|beispiel|preview|vorschau)"
                               r"[^\"']*[\"']", re.I)
ELEMENT = re.compile(r"<(span|div|p|td|li|strong|b|em)\b([^>]*)>(.{0,400}?)</\1>", re.I | re.S)


def sichtbarer_text(roh):
    """HTML ohne Skripte, Styles und Kommentare — nur was gedruckt wird."""
    t = re.sub(r"(?is)<(script|style|noscript)[^>]*>.*?</\1>", " ", roh)
    t = re.sub(r"(?s)<!--.*?-->", " ", t)
    t = re.sub(r"<[^>]+>", " ", t)
    return re.sub(r"[ \t]+", " ", t)


def ohne_skripte(roh):
    t = re.sub(r"(?is)<(script|style|noscript)[^>]*>.*?</\1>", " ", roh)
    return re.sub(r"(?s)<!--.*?-->", " ", t)


def dateien():
    gefunden = []
    for m in MUSTER:
        gefunden.extend(glob.glob(os.path.join(REPO, m)))
    return sorted(set(gefunden))


def pruefe(rel, roh, heute):
    """Beide Pruefungen auf einem HTML-Text. Gibt (fails, gezaehlt_wochentag, gezaehlt_vorschau)."""
    fails = []
    n_wt = 0
    n_vs = 0

    # 1. Wochentag gegen Datum — Ziffernform und ausgeschriebener Monat
    text = sichtbarer_text(roh)
    for m in MIT_WOCHENTAG.finditer(text):
        wt = m.group(1).lower().rstrip(".")
        tag, monat, jahr = int(m.group(2)), int(m.group(3)), int(m.group(4))
        try:
            d = datetime.date(jahr, monat, tag)
        except ValueError:
            fails.append((rel, m.group(0).strip(), "dieses Datum gibt es nicht"))
            continue
        n_wt += 1
        if d.weekday() != WOCHENTAGE[wt]:
            fails.append((rel, m.group(0).strip(),
                          "ist in Wirklichkeit ein %s" % NAME[d.weekday()]))

    for m in MIT_WOCHENTAG_MONATSNAME.finditer(text):
        wt = m.group(1).lower().rstrip(".")
        tag, monat, jahr = int(m.group(2)), MONATE[m.group(3).lower()], int(m.group(4))
        try:
            d = datetime.date(jahr, monat, tag)
        except ValueError:
            fails.append((rel, m.group(0).strip(), "dieses Datum gibt es nicht"))
            continue
        n_wt += 1
        if d.weekday() != WOCHENTAGE[wt]:
            fails.append((rel, m.group(0).strip(),
                          "ist in Wirklichkeit ein %s" % NAME[d.weekday()]))

    for m in MIT_WOCHENTAG_OHNE_JAHR.finditer(text):
        n_wt += 1
        fails.append((rel, m.group(0).strip(),
                      "Wochentag ohne Jahr — so laesst er sich nicht nachrechnen"))

    # 2. Vorschau-Daten in der Vergangenheit
    for m in ELEMENT.finditer(ohne_skripte(roh)):
        attrs, inhalt = m.group(2), m.group(3)
        if not VORSCHAU_ATTRIBUT.search(attrs):
            continue
        klartext = re.sub(r"<[^>]+>", " ", inhalt)
        for t in NUR_DATUM.finditer(klartext):
            tag, monat, jahr = int(t.group(1)), int(t.group(2)), int(t.group(3))
            n_vs += 1
            try:
                d = datetime.date(jahr, monat, tag)
            except ValueError:
                # Gutachten 18.08. (§5.2): Hier stand ein stilles `continue` — ein
                # unmoegliches Datum verschwand, waehrend Regel 1 denselben Fall meldete.
                fails.append((rel, t.group(0), "Vorschau zeigt ein Datum, das es nicht gibt"))
                continue
            if d < heute:
                fails.append((rel, re.sub(r"\s+", " ", klartext).strip()[:80],
                              "Vorschau-Datum liegt %d Tage in der Vergangenheit"
                              % (heute - d).days))
    return fails, n_wt, n_vs


# (HTML-Schnipsel, muss-FAILen?, Begruendung) — laeuft bei jedem Aufruf mit --gegenprobe
PROBEN = [
    ('<span id="planDate1">Sa, 21.06.2026, 14:00 Uhr</span>', True,
     "falscher Wochentag (21.06.2026 war ein Sonntag) — der Gruendungsfall"),
    ('<p>Termin: Montag, 15.08.2026</p>', True,
     "falscher Wochentag im Fliesstext (15.08.2026 war ein Samstag)"),
    ('<div class="demo-plan"><span>01.01.2020</span></div>', True,
     "Vorschau-Datum weit in der Vergangenheit"),
    ('<p>Termin: Sa, 12.09.2026</p>', False,
     "richtiger Wochentag, Datum in der Zukunft — darf nicht FAILen"),
    ('<span id="planDate1">Sa, 05.12.2026, 14:00 Uhr</span>', False,
     "Vorschau mit stimmigem Wochentag und Zukunftsdatum — darf nicht FAILen"),
    ('<span id="planDate1">So, 21.06.2026</span>', True,
     "Wochentag stimmt, aber die Vorschau ist abgelaufen — Regel 2 muss trotzdem greifen"),
    ('<p>Zuletzt geprueft: 27.07.2026</p>', False,
     "Aktualitaets-Angabe ausserhalb einer Vorschau — darf nicht FAILen"),
    ('<script>const d = "Sa, 21.06.2026";</script>', False,
     "dasselbe Datum in JavaScript — kein gedruckter Text, darf nicht FAILen"),
    # Die vier Durchrutscher, die der Gutachter am 18.08. ausgefuehrt hat:
    ('<span id="planDate1">Samstag, 21. Juni 2026, 14:00 Uhr</span>', True,
     "ausgeschriebener Monat — der Gruendungsfall in Worten"),
    ('<p>Dein Termin: <b>Sa</b>, <span>21.06.2026</span></p>', True,
     "Wochentag und Datum in getrennten Tags"),
    ('<span id="planDate1">Sa, 21.06.</span>', True,
     "Wochentag ohne Jahr — nicht nachrechenbar"),
    ('<span id="planDate1">31.11.2026</span>', True,
     "Vorschau mit einem Datum, das es nicht gibt (Regel 2 verwarf es still)"),
    ('<p>Sa, 12.09.2026 — der Termin steht</p>', False,
     "richtiger Wochentag, Zukunft, ausserhalb einer Vorschau"),
]


def gegenprobe(heute):
    print("── Gegenprobe Stufe 50 ──")
    kaputt = 0
    for html, muss_failen, warum in PROBEN:
        fails, _, _ = pruefe("<gegenprobe>", html, heute)
        hat = bool(fails)
        ok = (hat == muss_failen)
        if not ok:
            kaputt += 1
        print("   %s  %-9s %s" % ("OK  " if ok else "BLIND",
                                  "FAIL" if muss_failen else "sauber", warum))
    if kaputt:
        print("Gegenprobe Stufe 50: %d von %d Proben falsch beurteilt — das Gate ist blind."
              % (kaputt, len(PROBEN)))
    else:
        print("Gegenprobe Stufe 50: alle %d Proben richtig beurteilt." % len(PROBEN))
    return 1 if kaputt else 0


def main():
    heute = datetime.date.today()
    if "--gegenprobe" in sys.argv:
        return gegenprobe(heute)

    fails = []
    geprueft_wochentag = 0
    geprueft_vorschau = 0
    for pfad in dateien():
        rel = os.path.relpath(pfad, REPO).replace(os.sep, "/")
        roh = open(pfad, encoding="utf-8", errors="replace").read()
        f, a, b = pruefe(rel, roh, heute)
        fails.extend(f)
        geprueft_wochentag += a
        geprueft_vorschau += b

    for datei, zitat, grund in fails:
        print("    FAIL %s: \"%s\" — %s" % (datei, zitat, grund))
    print("Stufe 50: %d FAIL — %d Wochentag-Datum-Paare und %d Vorschau-Daten geprueft"
          % (len(fails), geprueft_wochentag, geprueft_vorschau))
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
