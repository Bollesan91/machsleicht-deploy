#!/usr/bin/env python3
"""Entscheidet je Einkaufsposten, wie die Menge sich zur Kinderzahl verhaelt.

    skaliert: "proKind"  — waechst mit der Kinderzahl (Becher, Mitgebsel, Capes)
    skaliert: "fix"      — einmal pro Party (Torte, Truhe, Stoppuhr, Papier)
    skaliert: "gebinde"  — nur in Packungsschritten, dazu gebinde:<Packungsgroesse>

DIE SCHADENSASYMMETRIE BESTIMMT DIE VORSICHT: Ein Posten faelschlich als "fix"
markiert kostet den Kaeufer ein paar Euro zu viel auf dem Zettel. Ein Posten
faelschlich als "proKind" markiert laesst ihn ZU WENIG einkaufen — dann fehlen am
Partytag drei Augenklappen. Deshalb:
  * "gebinde" nur bei ausdruecklicher Packungsangabe im Label ("(8er)", "10er-Set")
  * "proKind" nur bei Woertern aus einer gepflegten Liste, die ohne Zweifel je Kind
    gebraucht werden — und NICHT, wenn im selben Label ein Einzelstueck mitsteckt
    ("Knappen-Hefte + Stempel": Hefte je Kind, Stempel einmal -> bleibt fix)
  * alles andere "fix"
Was die Liste nicht sicher entscheiden kann, wird gemeldet statt geraten.

Aufruf:  python _dev/scripts/mengen-entscheiden.py [motto|--alle] [--schreiben]
"""
import glob
import json
import os
import re
import sys

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Packungsangabe: "(8er)", "8er-Set", "10er Pack", "12 Stk.", "(10 Stk., fuer ...)"
# Erste Fassung verlangte die schliessende Klammer direkt hinter der Zahl und verpasste
# damit "Augenklappen 12 Stk." und "Bandanas (10 Stk., fuer Forscher-Mitgebsel)" — beide
# wurden dann als proKind hochgerechnet, obwohl man eine Packung kauft.
RX_GEBINDE = re.compile(r"\b(\d{1,3})\s*(?:er\b|St(?:k|ück|ueck)\b\.?)", re.I)
# Packung ohne Zahl ("Mehrfach-Pack"): man kauft eine, aber wie viele drin sind, steht
# nirgends. Hochrechnen waere geraten — bleibt fix.
RX_PACK_UNBEKANNT = re.compile(r"mehrfach-?pack|gro(ß|ss)packung|vorteilspack", re.I)

# Je Kind gebraucht — bewusst eng gehalten. Jedes Wort hier ist eine Zusage an den
# Kaeufer, dass diese Menge wirklich mit der Kinderzahl waechst.
PRO_KIND = [
    r"mitgebsel", r"give-?away", r"wundert(ü|ue)te", r"t(ü|ue)ten\b", r"gastgeschenk",
    r"becher", r"teller", r"serviette", r"strohhalm", r"trinkhalm", r"pappgeschirr",
    r"snack", r"buffet", r"spie(ß|ss)e", r"muffin", r"w(ü|ue)rstchen", r"brezel",
    r"cape", r"umhang", r"krone", r"hut\b", r"h(ü|ue)te\b", r"maske", r"augenklappe",
    r"stirnband", r"abzeichen", r"tattoo", r"armband", r"halstuch",
    # "schild" allein war zu gierig: es traf das VERKEHRSschild im Baustellen-Motto
    # ("Deko (Absperrband, Verkehrshuetchen, Schild)") und haette den Kaeufer fuenf
    # Verkehrsschilder kaufen lassen. Nur das Wappenschild ist ein Stueck je Kind.
    r"pappschild", r"wappenschild", r"ritterschild", r"premium-schild",
    r"bastel-?material", r"bastelset", r"medaille", r"urkundenpapier",
]
RX_PRO_KIND = re.compile("|".join(PRO_KIND), re.I)

# Steht eins dieser Woerter im selben Label, ist der Posten gemischt oder ein
# Einzelstueck — dann bleibt er fix, auch wenn ein proKind-Wort vorkommt.
EINZELSTUECK = [
    r"stempel", r"stoppuhr", r"musik", r"box\b", r"truhe", r"schloss", r"lampe",
    r"karton", r"drache\b", r"banner", r"girlande", r"plane", r"decke", r"eimer",
    r"pavillon", r"tisch\b", r"kuchen", r"torte", r"druckerpapier", r"papier\b",
    r"werkzeug", r"bogen\b", r"strohballen", r"kiste", r"koffer", r"zelt",
    # Aus der Durchsicht der ersten 287 proKind-Entscheidungen (19.08.):
    r"\bdeko\b",      # "Mini-Kronen + Mittelalter-Deko" ist gemischt, nicht je Kind.
                      # Faengt auch meine eigene Handentscheidung bei ritter/minimal ein,
                      # die genau deshalb falsch war.
    r"absperr", r"h(ü|ue)tchen",   # Baustellen-Deko, Einzelstuecke
    r"stapel",        # "Becher-Stapel-Set" ist ein Spiel, kein Trinkbecher je Kind
    r"girlande", r"wimpel", r"poster",
]
RX_EINZEL = re.compile("|".join(EINZELSTUECK), re.I)


# Wo die Wortliste an ihre Grenze kommt. Diese Posten werden NICHT entschieden —
# und weil der Renderer nur rechnet, wenn JEDER Posten einer Variante entschieden
# ist, bleibt die betroffene Variante beim alten Verhalten samt Hinweissatz.
# Lieber eine Variante, die noch nicht rechnet, als eine, die falsch rechnet.
# Gefunden in der Durchsicht der ersten 254 proKind-Entscheidungen:
#   "Wurfringe + Becher (Wettkampf)"        — Becher als Spielgeraet, nicht zum Trinken
#   "Spielzeug-Tauch-Maske (fuer Foto)"     — Einzahl: ein Requisit, keine Maske je Kind
#   "Pinsel + Wasserfarben + Memory + Olympiade-Medaillen" — geteiltes Material + je Kind
#   "Klett-Abzeichen 5 Farben"              — 5 Farben ist ein Set, keine Stueckzahl
RX_UNKLAR = re.compile(
    r"wurfring|wettkampf|\bmemory\b|pinsel|wasserfarbe|"
    r"\d+\s*Farben\b|"
    r"tauch-?maske|\bmaske\b(?!n)",           # Einzahl "Maske" = Requisit, "Masken" = je Kind
    re.I)


# Von Hand entschieden, weil keine Regel sie sicher trifft. Der Wortlaut ist der
# Schluessel — aendert sich das Label, faellt der Posten zurueck auf "unklar" und
# meldet sich wieder, statt still eine alte Entscheidung weiterzutragen.
HAND = {
    # Geteiltes Bastelmaterial: eine Packung reicht fuer den Tisch.
    "Pinsel + Wasserfarben + Memory-Karten": "fix",
    "Pinsel + Wasserfarben + Memory + Olympiade-Medaillen": "fix",
    "Acrylfarben + Pinsel + Pappkarton + Schablonen": "fix",
    "Acrylfarben Premium + Pinsel + Pappkarton XL": "fix",
    "Ausgrabungs-Zubehör (Pinsel, Sand)": "fix",
    "Glitzer-Kleber (6 Farben)": "fix",
    "Wolle 3 Farben + essbarer Glitzer": "fix",
    "Wolle 4 Farben + Glitzer-Stifte": "fix",
    "Tier-Memory-Karten (DM, Kaufland, oder selbst gestalten)": "fix",
    "Tier-Memory-Karten (DM, Kaufland, oder DIY)": "fix",
    # Spielgeraet: wird geteilt, nicht verteilt.
    "Plüsch-Hufeisen oder Wurfringe": "fix",
    "Wurfringe + Becher (Wettkampf)": "fix",
    "Spielzeug-Tauch-Maske (für Perlentaucher-Foto)": "fix",
    # Ein Abzeichen je Kind — die Farben sind die Auswahl, nicht die Stueckzahl.
    "Klett-Abzeichen 3 Farben (Spezialisierungs-Patches)": "proKind",
    "Klett-Abzeichen 5 Farben (Spezialisierungs-Patches)": "proKind",
    "Klett-Abzeichen 3-5 Farben (Spezialisierungs-Patches)": "proKind",
    "Klett-Abzeichen 3 Farben": "proKind",
    "Klett-Abzeichen 5 Farben": "proKind",
    # Packungen mit Stueckzahl.
    "Hufeisen / Wurfringe (8er)": ("gebinde", 8),
    "Hufeisen + Wurfringe (10er)": ("gebinde", 10),
}


def entscheide(label):
    """(skaliert, gebinde|None, grund) — oder (None, None, grund) wenn unsicher."""
    l = str(label or "")
    h = HAND.get(l.strip())
    if h is not None:
        if isinstance(h, tuple):
            return (h[0], h[1], "von Hand entschieden")
        return (h, None, "von Hand entschieden")
    if RX_UNKLAR.search(l):
        return (None, None, "nicht sicher entscheidbar: %s" % RX_UNKLAR.search(l).group(0))
    if RX_PACK_UNBEKANNT.search(l):
        return ("fix", None, "Packung ohne Stueckzahl — Groesse unbekannt, nicht hochrechnen")
    m = RX_GEBINDE.search(l)
    if m:
        n = int(m.group(1))
        # Eine Literangabe ist keine Packungsgroesse: "Apfelschorle (3 L)" hat kein "er"
        # und kein "Stk.", faellt hier also gar nicht erst an. Aber "2er" bei einem
        # Getraenk waere Unsinn — deshalb bleibt die Untergrenze bei 3 Stueck.
        if n >= 3:
            return ("gebinde", n, "Packungsangabe im Label (%d)" % n)
    einzel = RX_EINZEL.search(l)
    prokind = RX_PRO_KIND.search(l)
    if prokind and not einzel:
        return ("proKind", None, "je Kind: %s" % prokind.group(0))
    if prokind and einzel:
        return ("fix", None, "gemischt (%s + %s) — konservativ fix" % (prokind.group(0), einzel.group(0)))
    if einzel:
        return ("fix", None, "Einzelstueck: %s" % einzel.group(0))
    return ("fix", None, "kein Hinweis auf Skalierung — Standardfall fix")


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    schreiben = "--schreiben" in sys.argv
    muster = "*" if (not args or "--alle" in sys.argv) else args[0] + "-*"

    zaehl = {"proKind": 0, "fix": 0, "gebinde": 0}
    ohne_basis = []
    unklar = []
    dateien = 0
    zeilen = []
    varianten_gesamt = 0
    varianten_fertig = 0

    for pfad in sorted(glob.glob(os.path.join(REPO, "data", "motto", muster + ".json"))):
        with open(pfad, encoding="utf-8") as f:
            daten = json.load(f)
        geaendert = False
        for v in daten.get("variants", []):
            varianten_gesamt += 1
            if not isinstance(v.get("basisKinder"), int):
                ohne_basis.append((os.path.basename(pfad), v.get("id", "?")))
            offen_hier = 0
            for it in v.get("shoppingList", []):
                sk, geb, grund = entscheide(it.get("label"))
                if sk is None:
                    offen_hier += 1
                    unklar.append((os.path.basename(pfad), v.get("id", "?"),
                                   str(it.get("label"))[:60], grund))
                    # Nichts schreiben — und eine frueher gesetzte Entscheidung
                    # zuruecknehmen, sonst rechnet die Variante auf altem Stand weiter.
                    if it.pop("skaliert", None) is not None:
                        geaendert = True
                    continue
                zaehl[sk] += 1
                zeilen.append((os.path.basename(pfad), v.get("id", "?"), sk,
                               str(it.get("label"))[:52], grund))
                if it.get("skaliert") != sk:
                    it["skaliert"] = sk
                    geaendert = True
                if geb is not None:
                    if it.get("gebinde") != geb:
                        it["gebinde"] = geb
                        geaendert = True
                elif "gebinde" in it:
                    del it["gebinde"]
                    geaendert = True
            if not offen_hier and isinstance(v.get("basisKinder"), int) and v.get("shoppingList"):
                varianten_fertig += 1
        if geaendert and schreiben:
            with open(pfad, "w", encoding="utf-8", newline="\n") as f:
                json.dump(daten, f, ensure_ascii=False, indent=2)
                f.write("\n")
            dateien += 1

    gesamt = sum(zaehl.values())
    print("%d Posten entschieden: %d proKind, %d gebinde, %d fix"
          % (gesamt, zaehl["proKind"], zaehl["gebinde"], zaehl["fix"]))
    if gesamt:
        print("Anteil, der mit der Kinderzahl rechnet: %.0f %%"
              % (100.0 * (zaehl["proKind"] + zaehl["gebinde"]) / gesamt))
    print("geschrieben in %d Dateien" % dateien if schreiben
          else "(Probelauf - nichts geschrieben, --schreiben zum Uebernehmen)")

    print("Varianten, die danach wirklich rechnen: %d von %d"
          % (varianten_fertig, varianten_gesamt))

    if ohne_basis:
        print("\nOhne basisKinder (rechnen nie, Hinweissatz bleibt): %d" % len(ohne_basis))
        for datei, vid in ohne_basis:
            print("  %-28s %s" % (datei, vid))

    if unklar:
        print("\nNICHT entschieden (%d) — diese Varianten rechnen bewusst nicht:" % len(unklar))
        for datei, vid, label, grund in unklar:
            print("  %-26s %-9s %-60s %s" % (datei, vid, label, grund))

    if "--zeigen" in sys.argv:
        print("\nEinzelentscheidungen:")
        for datei, vid, sk, label, grund in zeilen:
            print("  %-26s %-9s %-8s %-52s %s" % (datei, vid, sk, label, grund))
    return 0


if __name__ == "__main__":
    sys.exit(main())
