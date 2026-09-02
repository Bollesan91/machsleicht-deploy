# -*- coding: utf-8 -*-
"""Stufe 65: Listen im Code gegen die Wirklichkeit auf der Platte.

ANLASS (02.09.2026, Kartierung machsleicht-36 + Pruefstand-Gegenprobe)
`paket/prinzessin/index.html` liegt fertig im Repo — 87.944 Bytes, dieselbe
Groessenklasse wie die sechs ausgelieferten Pakete. Erreichbar ist es nicht:
`PAKET_MOTTOS` in kindergeburtstag.html listet sechs Mottos, das Verzeichnis
enthaelt sieben. Keine der 64 bestehenden Stufen sah das, weil keine eine LISTE
gegen ein VERZEICHNIS haelt. Ein fertiges Produkt, das niemand aufrufen kann, ist
teurer als ein fehlendes: die Arbeit ist schon bezahlt.

DIE KLASSE, NICHT DER FALL (Helfer V5, R1)
Geprueft wird nicht "steht prinzessin in PAKET_MOTTOS". Geprueft wird die Klasse:
**jede Liste im Code, die etwas ueber die Platte behauptet, muss stimmen — in
beide Richtungen.** Ein Eintrag ohne Datei ist ein Link ins Leere; eine Datei ohne
Eintrag ist unerreichbare Ware. HERKUNFT.md Abschnitt 5 zaehlt sieben gespiegelte
Vertraege; drei davon behaupten etwas ueber Dateien und werden hier geprueft.

WIE DIE SPIEL-PFADE ENTSTEHEN — und warum das ehrlich bleibt
`GAME_CATALOG` baut seine Pfade aus zwei Literalen (`IND_GAMES`, Motto-Liste) und
drei Vorlagen. Die Literale werden hier GELESEN, nicht abgeschrieben. Die drei
Vorlagen sind der einzige gespiegelte Teil — deshalb prueft die Stufe zuerst, ob
sie im Worker noch woertlich so stehen. Aendert jemand die Bauregel, wird die Stufe
LAUT statt still weiterzupruefen, was es nicht mehr gibt.

    python _dev/scripts/check-freischaltlisten.py
    python _dev/scripts/check-freischaltlisten.py --gegenprobe   # faengt die Regel etwas?

Exit 0 = jede Liste deckt sich mit der Platte. Exit 1 = mindestens eine driftet.
"""
import argparse
import glob
import json
import os
import re
import subprocess
import sys

try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

WORKER = "party-worker.js"
WIZARD = "kindergeburtstag.html"

# Die drei Vorlagen, aus denen der Worker die Spiel-Pfade baut. Stehen sie nicht mehr
# woertlich da, ist die Bauregel geaendert und diese Stufe veraltet.
VORLAGEN = (
    "path:`/einladung/${m}/whatsapp/`",
    "path:`/spiele/game-${s}-${m}.html`",
    "path:`/spiele/game-schatzjagd-${m}.html`",
)


def versioniert():
    """Was auf der Platte liegt, ist nicht dasselbe wie das, was ausgeliefert wird.
    Gemessen am 02.09.2026 an genau diesem Fall: paket/prinzessin/index.html liegt
    lokal (87.944 Bytes) und steht in .gitignore Zeile 33 — es waere nie deployt
    worden. Wer gegen das Arbeitsverzeichnis prueft, meldet je nach Rechner etwas
    anderes. Deshalb ist die Wirklichkeit hier der VERSIONIERTE Stand."""
    try:
        aus = subprocess.run(["git", "ls-files"], capture_output=True, text=True, timeout=120)
    except Exception as e:
        aus = None
        grund = type(e).__name__
    else:
        grund = "Exit %d" % aus.returncode
    if aus is not None and aus.returncode == 0 and aus.stdout.strip():
        return set(z.strip() for z in aus.stdout.splitlines() if z.strip())

    # Kein Git — das ist der Fall in einer Arbeitskopie des Pruefstands, und dort ist der
    # Rueckfall korrekt: die Kopie enthaelt per Konstruktion nur versionierte Dateien.
    # Er wird trotzdem GEMELDET. Ein Gate, das lautlos die Messgrundlage wechselt, misst
    # irgendwann etwas anderes als das, was sein Satz verspricht.
    print("    HINWEIS: kein Git-Stand abrufbar (%s) — gemessen wird das "
          "Arbeitsverzeichnis." % grund)
    aus2 = set()
    for wurzel, _, dateien in os.walk("."):
        if any(teil in wurzel for teil in (".git", "node_modules", "__pycache__")):
            continue
        for d in dateien:
            aus2.add(os.path.join(wurzel, d).replace(os.sep, "/").lstrip("./"))
    return aus2


def _lies(pfad):
    return open(pfad, encoding="utf-8", errors="replace").read()


def _literal(text, muster, was):
    m = re.search(muster, text, re.S)
    if not m:
        raise LookupError(was + " nicht gefunden — umbenannt? Diese Stufe prueft sonst nichts mehr")
    return json.loads(m.group(1))


# ---------------------------------------------------------------- die drei Listen

def liste_pakete():
    text = _lies(WIZARD)
    m = re.search(r"const PAKET_MOTTOS\s*=\s*\{(.*?)\};", text, re.S)
    if not m:
        raise LookupError("PAKET_MOTTOS in " + WIZARD + " nicht gefunden")
    return set(re.findall(r"(\w+)\s*:\s*\{\s*emoji", m.group(1)))


def platte_pakete():
    """Ausgeliefert wird ein Paket, wenn es eine index.html hat. `core`, `_maschine`
    und `_vergleich` sind Werkstatt, kein Produkt — die Ausnahme steht hier, statt
    stillschweigend zu wirken."""
    aus = set()
    for pfad in versioniert():
        teile = pfad.split("/")
        if len(teile) == 3 and teile[0] == "paket" and teile[2] == "index.html":
            if not teile[1].startswith("_") and teile[1] != "core":
                aus.add(teile[1])
    return aus


def _spiel_bauregel():
    text = _lies(WORKER)
    fehlend = [v for v in VORLAGEN if v.replace(" ", "") not in text.replace(" ", "")]
    if fehlend:
        raise LookupError("Die Bauregel der Spiel-Pfade hat sich geaendert (%s fehlt) — "
                          "Stufe 65 nachziehen" % fehlend[0])
    ind = _literal(text, r"const IND_GAMES\s*=\s*(\{.*?\});", "IND_GAMES")
    mottos = _literal(text, r"for \(const m of (\[[^\]]*\])\) c\[m\]", "Motto-Liste im GAME_CATALOG")
    return ind, mottos


def liste_spiele():
    ind, mottos = _spiel_bauregel()
    pfade = set()
    for m in mottos:
        pfade.add("einladung/%s/whatsapp/index.html" % m)
        for s in ind.get(m, []):
            pfade.add("spiele/game-%s-%s.html" % (s, m))
        pfade.add("spiele/game-schatzjagd-%s.html" % m)
    return pfade


def platte_spiele():
    v = versioniert()
    aus = set(p for p in v if p.startswith("spiele/game-") and p.endswith(".html"))
    # Genau vier Segmente: einladung/<motto>/whatsapp/index.html. Die erste Fassung
    # pruefte nur Anfang und Ende und fing damit auch einladung/whatsapp/index.html —
    # eine echte SEO-Landingpage, verlinkt von der Startseite. Ein Fehlalarm in einer
    # neuen Stufe ist teurer als eine Luecke: er bringt bei, die Stufe zu ignorieren.
    aus |= set(p for p in v
               if len(p.split("/")) == 4 and p.startswith("einladung/")
               and p.endswith("/whatsapp/index.html"))
    return aus


def liste_mottos():
    text = _lies(WORKER)
    return set(_literal(text, r"const GAME_MOTTOS\s*=\s*(\[[^\]]*\])", "GAME_MOTTOS"))


def platte_mottos():
    return set(p.split("/")[-1].rsplit("-", 1)[0] for p in versioniert()
               if p.startswith("data/motto/") and p.endswith(".json"))


# Bekannte, ENTSCHIEDENE Luecken. Kein Schweigen: jede steht mit Grund da und wird bei
# JEDEM Lauf genannt. Eine Ausnahme ohne Begruendung ist eine abgeschaltete Regel, und
# eine Ausnahmeliste, die still waechst, ist eine Regel, die niemand mehr liest.
BEKANNTE_LUECKEN = {
    # Leer, und das ist ein Ergebnis, keine Nachlaessigkeit: der prinzessin-Fall, der diese
    # Stufe ausgeloest hat, IST keine Luecke im ausgelieferten Stand — die Datei steht in
    # .gitignore (Zeile 33) und existiert nur lokal. Waere hier eine Ausnahme eingetragen
    # worden, haette sie eine Drift gedeckt, die es nie gab.
}

LISTEN = [
    {"name": "PAKET_MOTTOS -> paket/<motto>/index.html",
     "liste": liste_pakete, "platte": platte_pakete,
     "nur_platte": "liegt fertig im Repo, ist aber nicht freigeschaltet — unerreichbare Ware",
     "nur_liste": "ist freigeschaltet, aber die Datei fehlt — Link ins Leere"},
    {"name": "GAME_CATALOG -> Spieldateien",
     "liste": liste_spiele, "platte": platte_spiele,
     "nur_platte": "liegt im Repo, wird aber von keinem Katalogeintrag erreicht",
     "nur_liste": "steht im Katalog, die Datei fehlt — der Gast bekaeme einen 404-iframe"},
    {"name": "GAME_MOTTOS -> data/motto/<motto>-*.json",
     "liste": liste_mottos, "platte": platte_mottos,
     "nur_platte": "hat Daten, steht aber nicht in GAME_MOTTOS",
     "nur_liste": "steht in GAME_MOTTOS, hat aber keine Daten"},
]


def pruefe(nur=None):
    fails, bekannt = [], []
    print("Stufe 65: %d Listen im Code gegen die Platte" % len(LISTEN))
    for regel in LISTEN:
        if nur and regel is not nur:
            continue
        try:
            liste, platte = regel["liste"](), regel["platte"]()
        except LookupError as e:
            fails.append("%s: %s" % (regel["name"], e))
            print("    FAIL %s: %s" % (regel["name"], e))
            continue
        print("    %-42s Liste: %3d   Platte: %3d" % (regel["name"], len(liste), len(platte)))
        for n in sorted(platte - liste):
            if (regel["name"], n) in BEKANNTE_LUECKEN:
                bekannt.append((regel["name"], n))
                continue
            fails.append("%s: '%s' %s" % (regel["name"], n, regel["nur_platte"]))
            print("    FAIL '%s' %s" % (n, regel["nur_platte"]))
        for n in sorted(liste - platte):
            if (regel["name"], n) in BEKANNTE_LUECKEN:
                bekannt.append((regel["name"], n))
                continue
            fails.append("%s: '%s' %s" % (regel["name"], n, regel["nur_liste"]))
            print("    FAIL '%s' %s" % (n, regel["nur_liste"]))

    for schluessel in bekannt:
        print("    BEKANNT '%s': %s" % (schluessel[1], BEKANNTE_LUECKEN[schluessel]))
    # Eine Ausnahme, die es nicht mehr braucht, muss auffallen — sonst deckt die Liste
    # irgendwann einen Fall, den es gar nicht mehr gibt, und niemand raeumt sie auf.
    for schluessel, grund in BEKANNTE_LUECKEN.items():
        if schluessel not in bekannt and not nur:
            fails.append("Ausnahme '%s' greift nicht mehr — Eintrag loeschen" % (schluessel[1],))
            print("    FAIL Ausnahme '%s' greift nicht mehr (Fall behoben?) — Eintrag loeschen"
                  % (schluessel[1],))
    return fails


def gegenprobe():
    """Faengt die Regel einen echt eingebauten Fehler? Nur im Speicher — diese Stufe
    fasst das Repo nicht an. Geprueft werden BEIDE Richtungen je Liste; eine Regel,
    die nur eine Richtung sieht, laesst die halbe Fehlerklasse durch."""
    ok = True
    for regel in LISTEN:
        try:
            liste, platte = regel["liste"](), regel["platte"]()
        except LookupError as e:
            print("    GEGENPROBE UNMOEGLICH bei %s: %s" % (regel["name"], e))
            ok = False
            continue
        if not liste or not platte:
            print("    GEGENPROBE UNMOEGLICH bei %s: leere Menge" % regel["name"])
            ok = False
            continue
        weg = sorted(liste)[0]
        a = bool(platte - (liste - {weg}))          # Eintrag entfernt -> Platte-Ueberschuss?
        b = bool((liste | {"zzz-gibtesnicht"}) - platte)  # Phantom ergaenzt -> Listen-Ueberschuss?
        print("    %-42s Eintrag entfernt: %s   Phantom ergaenzt: %s"
              % (regel["name"], "erkannt" if a else "NICHT ERKANNT",
                 "erkannt" if b else "NICHT ERKANNT"))
        ok = ok and a and b
    print("    " + ("Die Regel greift in beide Richtungen." if ok
                    else "Die Regel greift nicht ueberall — sie ist teilweise Dekoration."))
    return 0 if ok else 1


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--gegenprobe", action="store_true",
                    help="einen echten Fehler einbauen und pruefen, ob die Regel greift")
    a = ap.parse_args()
    if a.gegenprobe:
        return gegenprobe()
    fails = pruefe()
    if fails:
        print("\n    %d FAIL — eine Liste im Code weicht von der Platte ab." % len(fails))
        return 1
    print("\n    0 FAIL — jede Liste deckt sich mit dem, was auf der Platte liegt.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
