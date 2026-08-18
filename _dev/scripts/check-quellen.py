# -*- coding: utf-8 -*-
"""Stufe 54: Keine Quelle ohne Beleg, kein Beleg ohne Fundstelle.

Befund 18.08.2026 (externer SEO-/E-E-A-T-Audit): Die freien Seiten treffen 691
gedruckte Sicherheitsaussagen — Groessengrenzen, Altersgrenzen, Erste-Hilfe-Schritte —
und nannten dafuer keine einzige Quelle. Google bewertet Inhalte, die Sicherheit
beruehren, ausdruecklich strenger und will erkennen koennen, wer etwas behauptet und
worauf es sich stuetzt. Der Quellen-Kasten (Maschine: regeln-drucken.py) schliesst das.

Die Gefahr einer Quellenangabe ist eine andere als die einer fehlenden: Eine erfundene,
veraltete oder nicht zutreffende Quelle ist schlimmer als gar keine, weil sie Sicherheit
vortaeuscht. Diese Stufe bewacht deshalb beide Richtungen.

Geprueft wird
-------------
1. **Registry vollstaendig**: Jede Quelle traegt thema, quelle, kern, geprueft, URL.
   Das Pruefdatum liegt nicht in der Zukunft und nicht mehr als ein Jahr zurueck.
2. **Gedruckte Felder tragen echte Umlaute** — dieselbe Regel wie Stufe 24, hier an der
   Datenquelle statt am Ergebnis, damit ASCII-Ersatz ("Nuesse") gar nicht erst auf eine
   Seite kommt.
3. **Kein Kasten ohne Deckung**: Jede Quelle, die auf einer Seite steht, muss dort auch
   ausgeloest worden sein — durch eine gedruckte Regel mit einem ihrer Trigger oder durch
   den Block, den sie belegt ("trigger_marke", z. B. der Notfall-Kasten). Eine Seite darf
   sich nicht mit einer Quelle schmuecken, die ihre Inhalte nicht beruehrt.
4. **Kein Thema ohne Kasten**: Loest eine Seite eine Quelle aus, muss sie sie auch drucken.
5. **URLs sind absolut und https** (erreichbar wird bewusst NICHT bei jedem Lauf geprueft —
   das waere ein Netzwerk-Gate; die Erreichbarkeit steht im Pruefprotokoll des Eintrags).

Bewusst NICHT geprueft: ob die Quelle inhaltlich stimmt. Das kann keine Maschine — das ist
Stufe 0 (Primaerverifikation vor dem Schreiben) und steht im Commit.

Aufruf
------
    python _dev/scripts/check-quellen.py
    python _dev/scripts/check-quellen.py --offen        # Themen ohne Beleg auflisten
    python _dev/scripts/check-quellen.py --gegenprobe   # ist das Gate noch scharf?
"""
import datetime
import glob
import io
import json
import os
import re
import sys

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
REGISTRY = os.path.join(REPO, "data", "quellen.json")
SEITEN = os.path.join(REPO, "kindergeburtstag", "*-jahre.html")

KASTEN = re.compile(r'<div class="quellen-kasten".*?</div>', re.S)
POSTEN_IM_KASTEN = re.compile(r"<li><strong>(.*?):</strong>", re.S)


def maschine():
    """Die Maschine als Modul — nicht nachgebaut.

    Gutachten 18.08. (§5.3) und Lektion L24: Der erste Entwurf dieser Stufe hat die
    Trigger-Regel ein zweites Mal implementiert. Damit rechnete das Gate SOLL nach
    derselben Vorschrift, nach der IST gedruckt wurde — es konnte auf Maschinen-Output
    strukturell nicht failen, und die Divergenz war schon da (der Renderer faellt bei
    fehlender trigger_marke auf die Wort-Trigger zurueck, die Kopie kehrte vorher
    zurueck). Jetzt gibt es genau eine Implementierung, und dieses Gate prueft, was die
    Maschine NICHT selbst bestaetigen kann: dass der gedruckte Kasten zum heutigen
    Ergebnis der Maschine passt und dass die Registry sauber ist.
    """
    import importlib.util
    fp = os.path.join(REPO, "_dev", "scripts", "regeln-drucken.py")
    spec = importlib.util.spec_from_file_location("regeln_drucken", fp)
    mod = importlib.util.module_from_spec(spec)
    merk, sys.argv = sys.argv, [fp]
    try:
        spec.loader.exec_module(mod)
    finally:
        sys.argv = merk
    return mod


M = maschine()
# Umlaut-Ersatz laesst sich nicht raten: "misst", "Durchmesser" und "hineinpasst" tragen
# dieselben Buchstabenfolgen wie ein ASCII-Ersatz. Der erste Entwurf dieser Stufe meldete
# genau diese drei — die Gegenprobe war der eigene Lauf. Deshalb steht hier eine Liste der
# Woerter, die in diesem Repo tatsaechlich schon als ASCII-Ersatz aufgetaucht sind
# (LEKTIONEN L: "grossflaechige", "Kopfhoehe"), statt einer Heuristik. Das allgemeine Netz
# fuer gedruckten Text bleibt Stufe 24 am Ergebnis; diese Liste faengt es eine Stufe frueher.
ASCII_ERSATZ_WOERTER = [
    "nuesse", "fuer", "ueber", "koennen", "kraeftig", "rueckenschlaege", "druckstoesse",
    "saeugling", "groesse", "grosse", "maessig", "haengt", "waehrend", "muessen", "praegt",
    "erstickungsgefaehrdet", "flaeche", "hoehe", "gefaehrlich", "jahrgaenge", "aehnlich",
    "zurueck", "stuecke", "luftroehre", "gebaeck", "jugendaerzte", "naeherung", "pruefzylinder",
    "vollstaendig", "groessengrenze", "vierjaehrigen", "gehoeren",
]


def registry():
    with io.open(REGISTRY, encoding="utf-8") as f:
        return json.load(f)


def ausgeloest(quelle, gedruckter_text, seitentext=""):
    """Delegiert an die Maschine. Kein zweites Regelwerk (L24)."""
    marke = quelle.get("trigger_marke")
    if marke:
        return marke in seitentext
    return any(M.regel_traegt(quelle, r) for r in M.gedruckte_regeln(seitentext))


def pruefe_registry(reg, heute):
    fails = []
    for q in reg["quellen"]:
        for feld in ("id", "thema", "quelle", "kern", "geprueft", "url"):
            if not q.get(feld):
                fails.append("Registry: Quelle \"%s\" hat kein Feld %s" % (q.get("id", "?"), feld))
        for u in (q.get("url"), q.get("url2")):
            if u and not u.startswith("https://"):
                fails.append("Registry: %s hat eine URL ohne https: %s" % (q["id"], u))
        try:
            d = datetime.date.fromisoformat(q["geprueft"])
            if d > heute:
                fails.append("Registry: %s ist auf ein Datum in der Zukunft geprueft (%s)"
                             % (q["id"], q["geprueft"]))
            elif (heute - d).days > 365:
                fails.append("Registry: %s wurde zuletzt vor %d Tagen geprueft — nachziehen"
                             % (q["id"], (heute - d).days))
        except (ValueError, KeyError):
            fails.append("Registry: %s hat kein lesbares Pruefdatum" % q.get("id", "?"))
        # gedruckte Felder: echte Umlaute statt ASCII-Ersatz
        for feld in ("thema", "quelle", "kern"):
            wert = q.get(feld, "").lower()
            for wort in ASCII_ERSATZ_WOERTER:
                if wort in wert:
                    fails.append("Registry: %s.%s schreibt \"%s\" statt mit Umlaut — der Text "
                                 "wird gedruckt (Stufe 24)" % (q["id"], feld, wort))
    return fails


def pruefe_seiten(reg):
    fails = []
    nach_id = {q["thema"]: q for q in reg["quellen"]}
    seiten = sorted(glob.glob(SEITEN))
    mit_kasten = 0
    for pfad in seiten:
        rel = os.path.basename(pfad)
        text = io.open(pfad, encoding="utf-8").read()
        gedruckt = " ".join(M.gedruckte_regeln(text)).lower()
        soll = set(q["thema"] for q in reg["quellen"] if ausgeloest(q, gedruckt, text))
        m = KASTEN.search(text)
        if not m:
            if soll:
                fails.append("%s loest %d Quelle(n) aus, druckt aber keinen Kasten"
                             % (rel, len(soll)))
            continue
        mit_kasten += 1
        if len(KASTEN.findall(text)) > 1:
            fails.append("%s hat %d Quellen-Kaesten — genau einer ist erlaubt"
                         % (rel, len(KASTEN.findall(text))))
        ist = set(POSTEN_IM_KASTEN.findall(m.group(0)))
        for thema in ist - soll:
            fails.append("%s nennt \"%s\", ohne dass eine gedruckte Regel das Thema beruehrt"
                         % (rel, thema))
        for thema in soll - ist:
            fails.append("%s beruehrt \"%s\", nennt die Quelle aber nicht" % (rel, thema))
        for thema in ist:
            if thema not in nach_id:
                fails.append("%s nennt \"%s\" — steht nicht in data/quellen.json" % (rel, thema))
    return fails, len(seiten), mit_kasten


PROBEN = [
    ('<span class="shop-safe">Nichts, was durch eine Klopapierrolle passt.</span>',
     "kleinteile", True, "Klopapierrollen-Regel loest die CPSC-Quelle aus"),
    ('<span class="shop-safe">Ganze Nuesse bleiben weg.</span>',
     "kleinteile", False, "Nuss-Regel loest NICHT die Kleinteil-Quelle aus"),
    ('<span class="shop-safe">Ganze N&uuml;sse bleiben weg.</span>',
     "lebensmittel-unter-vier", True, "Nuss-Regel loest die BfR-Quelle aus, auch als Entity"),
    ('<span class="shop-safe">Die Girlande haengt ausser Reichweite.</span>',
     "lebensmittel-unter-vier", False, "harmlose Deko-Regel loest keine Lebensmittel-Quelle aus"),
    ('<p>Popcorn steht im Fliesstext, nicht in einer Regel.</p>',
     "lebensmittel-unter-vier", False, "Fliesstext zaehlt nicht — nur gedruckte Regeln"),
    ('<div class="notfall-kasten" data-notfall="verschlucken">…</div>',
     "erste-hilfe-ersticken", True, "Notfall-Kasten auf der Seite zieht die DRK/GRC-Quelle"),
    ('<p>Eine Seite ohne Sicherheitsschicht — wie die drei Alters-Huebs.</p>',
     "erste-hilfe-ersticken", False, "ohne Notfall-Kasten keine Erste-Hilfe-Quelle"),
]


def gegenprobe(reg):
    print("── Gegenprobe Stufe 54 ──")
    nach_id = {q["id"]: q for q in reg["quellen"]}
    kaputt = 0
    for html, quelle_id, erwartet, warum in PROBEN:
        ist = ausgeloest(nach_id[quelle_id], "", html)
        ok = ist == erwartet
        kaputt += 0 if ok else 1
        print("   %-6s %-9s %s" % ("OK" if ok else "BLIND",
                                   "loest aus" if erwartet else "still", warum))
    print("Gegenprobe Stufe 54: %s"
          % ("alle %d Proben richtig beurteilt." % len(PROBEN) if not kaputt
             else "%d von %d Proben falsch — das Gate ist blind." % (kaputt, len(PROBEN))))
    return 1 if kaputt else 0


def main():
    reg = registry()
    if "--gegenprobe" in sys.argv:
        return gegenprobe(reg)
    if "--offen" in sys.argv:
        print("Themen mit gedruckten Regeln, aber ohne geprueften Beleg:")
        for t in reg["_offen"]["themen"]:
            print("   -", t)
        return 0

    fails = pruefe_registry(reg, datetime.date.today())
    seiten_fails, n_seiten, n_kasten = pruefe_seiten(reg)
    fails.extend(seiten_fails)
    for f in fails:
        print("    FAIL " + f)
    print("Stufe 54: %d FAIL — %d Quellen, %d von %d Seiten mit Kasten, %d Themen noch ohne Beleg"
          % (len(fails), len(reg["quellen"]), n_kasten, n_seiten, len(reg["_offen"]["themen"])))
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
