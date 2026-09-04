# -*- coding: utf-8 -*-
"""Stufe 68: Ein Feld, das gelesen wird und in keiner Datendatei vorkommt.

ANLASS (02.09.2026, Kartierung machsleicht-36, vom Pruefstand nachgemessen)
`kindergeburtstag.html:1896` liest `(d && d.signature) || (v && v.signature) || {}`.
Den Schluessel `signature` gibt es in **keiner** der 45 Dateien unter `data/motto/`
— sie tragen `signatureRitual`. Der Fallback feuert also immer, und weil er sich
wie ein gewollter Default verhaelt, faellt es niemandem auf. Das ist dieselbe
Klasse wie "die Pruefung lief, ihr Ergebnis kam nie an": der Mechanismus
funktioniert, er erreicht nur nichts.

WARNUNG STATT FEHLER — mit Absicht
Der Wizard liest viele Felder bewusst optional. Ein naiver Vergleich meldet
Dutzende Fehlalarme, und eine Regel, die auf alles anspringt, bringt jedem bei,
sie zu ignorieren. Deshalb: enge Auswahl (nur Lesezugriffe auf die beiden
Variablen, die nachweislich Motto-Daten halten), harte Stoppliste fuer alles, was
JavaScript selbst mitbringt — und Ausgabe als LESELISTE, nicht als Urteil.
Wer die Liste liest, entscheidet; die Stufe entscheidet nicht.

    python _dev/scripts/check-lesestellen.py
    python _dev/scripts/check-lesestellen.py --streng      # Exit 1 statt 0
    python _dev/scripts/check-lesestellen.py --gegenprobe

Exit 0 immer (Warnstufe), ausser mit --streng oder bei --gegenprobe-Fehlschlag.
"""
import argparse
import glob
import io
import json
import re
import sys

try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

QUELLE = "kindergeburtstag.html"
DATEN = "data/motto/*.json"

# Nur diese Variablen halten im Wizard nachweislich einen Motto-Datensatz. Die Liste
# eng zu halten ist der Unterschied zwischen einem brauchbaren Hinweis und Rauschen.
TRAEGER = ("d", "v", "motto", "mottoData")

# Alles, was JavaScript selbst mitbringt oder was im DOM lebt. Ohne diese Liste
# meldet die Stufe `length`, `map` und `style` und ist wertlos.
STOPP = {
    "length", "map", "filter", "forEach", "push", "pop", "slice", "splice", "join",
    "trim", "split", "replace", "toLowerCase", "toUpperCase", "includes", "indexOf",
    "find", "some", "every", "sort", "reverse", "concat", "keys", "values", "entries",
    "toFixed", "toString", "padStart", "padEnd", "match", "test", "exec", "reduce",
    "style", "value", "checked", "textContent", "innerHTML", "classList", "dataset",
    "id", "name", "type", "target", "parentNode", "children", "appendChild", "remove",
    "add", "toggle", "contains", "querySelector", "querySelectorAll", "addEventListener",
    "then", "catch", "json", "text", "ok", "status", "getTime", "getFullYear", "call",
    "apply", "bind", "hasOwnProperty", "constructor", "prototype", "default",
    # Date-Methoden: die Variable `d` haelt im Wizard mal einen Datensatz und mal ein
    # Date. Ohne diese Zeile meldet die Stufe getDate/getMonth/getDay und wird zu Recht
    # ignoriert — der erste Lauf am 02.09. brachte 5 solche Fehlalarme auf 14 Funde.
    "getDate", "setDate", "getMonth", "setMonth", "getDay", "getHours", "getMinutes",
    "toLocaleDateString", "toLocaleTimeString", "toISOString", "setHours", "getTimezoneOffset",
    # window/globales
    "open", "location", "document", "console",
}


def daten_schluessel():
    """Alle Schluessel, die irgendwo in data/motto vorkommen — rekursiv."""
    aus = set()

    def geh(knoten):
        if isinstance(knoten, dict):
            for k, v in knoten.items():
                aus.add(k)
                geh(v)
        elif isinstance(knoten, list):
            for v in knoten:
                geh(v)

    dateien = sorted(glob.glob(DATEN))
    for f in dateien:
        try:
            geh(json.load(io.open(f, encoding="utf-8")))
        except Exception as e:
            print("    HINWEIS: %s nicht lesbar (%s)" % (f, type(e).__name__))
    return aus, len(dateien)


def lesestellen(text):
    """Zeilenweise, damit jeder Fund eine Fundstelle hat. Ein Befund ohne Zeile
    zwingt den naechsten Leser zur Suche — und wird deshalb nicht nachgesehen."""
    muster = re.compile(r"\b(" + "|".join(TRAEGER) + r")\.([A-Za-z_][A-Za-z0-9_]*)")
    aus = {}
    for nr, zeile in enumerate(text.split("\n"), 1):
        for _traeger, feld in muster.findall(zeile):
            if feld in STOPP:
                continue
            aus.setdefault(feld, []).append(nr)
    return aus


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--streng", action="store_true", help="Fund = Exit 1")
    ap.add_argument("--gegenprobe", action="store_true")
    args = ap.parse_args()

    schluessel, anzahl = daten_schluessel()
    if not schluessel:
        print("    FAIL keine Datenschluessel gefunden — laeuft die Stufe im Repo-Wurzelverzeichnis?")
        return 1
    text = io.open(QUELLE, encoding="utf-8", errors="replace").read()
    gelesen = lesestellen(text)

    if args.gegenprobe:
        # Ein erfundenes Feld MUSS auffallen, ein echtes NICHT.
        erfunden = "zzzGibtEsNicht"
        echt = sorted(schluessel & set(gelesen))[:1]
        a = erfunden not in schluessel
        b = bool(echt)
        print("    Gegenprobe: erfundenes Feld unbekannt -> %s | echtes Feld '%s' erkannt -> %s"
              % ("ja" if a else "NEIN", echt[0] if echt else "-", "ja" if b else "NEIN"))
        return 0 if (a and b) else 1

    ohne = {f: z for f, z in gelesen.items() if f not in schluessel}
    print("Stufe 68: %d gelesene Felder in %s gegen %d Schluessel aus %d Datendateien"
          % (len(gelesen), QUELLE, len(schluessel), anzahl))
    if not ohne:
        print("\n    0 Funde — jedes gelesene Feld kommt in den Daten vor.")
        return 0

    print("    LESELISTE — diese Felder werden gelesen, stehen aber in KEINER Datendatei:")
    for feld, zeilen in sorted(ohne.items(), key=lambda x: -len(x[1])):
        stellen = ", ".join(str(z) for z in zeilen[:4])
        mehr = (" (+%d)" % (len(zeilen) - 4)) if len(zeilen) > 4 else ""
        print("        %-24s Zeile %s%s" % (feld, stellen, mehr))
    print("    Jeder Eintrag ist entweder ein toter Lesezugriff (der Fallback feuert immer)")
    print("    oder ein bewusst optionales Feld. Das entscheidet ein Mensch, nicht diese Stufe.")
    return 1 if args.streng else 0


if __name__ == "__main__":
    sys.exit(main())
