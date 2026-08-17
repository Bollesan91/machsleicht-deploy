# -*- coding: utf-8 -*-
"""Stufe 47: Eine harmlos-Begruendung darf sich nicht auf Text berufen, den der
Leser der freien Seite nie sieht.

Befund 17.08. (Selbstaudit an pferde-6-8, der einzigen der 45 freien Seiten OHNE
eine einzige gedruckte Regel — `pferde-mittel.json` hat 0 safetyNote und 24
safetyChecked): Ein Teil der Begruendungen argumentiert nicht, dass die Ware
harmlos ist, sondern verweist auf eine Regel an anderer Stelle:

    "…dessen Sicherheitsregeln bereits gedruckt sind."      (Steckenpferde)
    "Wurf-Verbot steht in der Spiel-safetyRule."            (Bauklötze)
    "Spot-Test-Regel steht bereits in der FAQ."             (Tattoo-Set)
    "Allergie-Abfrage im Paket verankert."                  (Mini-Pizza)

Gemessen: 59 der 787 Begruendungen (7 %) verweisen. Entscheidend ist, WOHIN:

  * `parentTips`, `cakeRecipe`, `faq` stehen auf den freien Seiten tatsaechlich
    (Stichprobe feen-3-5: 4/8, 7/8, 8/8 Textstuecke wiedergefunden) — ein Verweis
    dorthin ist zulaessig, der Leser kann die Stelle finden.
  * Die Spiel-`safetyRule` steht dort NICHT (Stichprobe pferde-6-8 und
    einhorn-6-8: **0 von 8**). Dasselbe gilt fuer "im Paket". Ein Verweis dorthin
    ist die Fehlerklasse E5 in neuem Gewand: die Auslassung auf der kostenlosen
    Seite wird mit Text begruendet, den nur der Kaeufer sieht.

Stufe 39 faengt das im Feld `safetyNote` (VERWEIS-Regex), im Feld `safetyChecked`
bisher nicht — genau diese Luecke schliesst diese Stufe.

Gegenprobe: einen erlaubten Verweis ("in parentTips") auf "in der Spiel-safetyRule"
aendern -> FAIL steigt um 1, zurueck -> alter Stand.
"""
import io
import json
import os
import re
import sys
import glob

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Verweise auf Stellen, die der Leser der freien Seite NICHT sieht
UNSICHTBAR = re.compile(
    r"(safetyRule|Spiel-?regel|Spielanleitung|Spielkarte|im Paket|Escape-safetyRule|"
    r"materialNote|auf der Karte|bereits gedruckt sind)", re.I)


def main():
    fails, geprueft = [], 0
    for pfad in sorted(glob.glob(os.path.join(REPO, "data", "motto", "*.json"))):
        daten = json.load(io.open(pfad, encoding="utf-8"))
        name = os.path.basename(pfad)[:-5]
        for variante in daten["variants"]:
            for posten in (variante.get("shoppingList") or []):
                grund = (posten.get("safetyChecked") or "").strip()
                if not grund:
                    continue
                geprueft += 1
                treffer = UNSICHTBAR.search(grund)
                if treffer:
                    fails.append((name, variante["id"], (posten.get("label") or "")[:38],
                                  treffer.group(0), grund))
    for name, vid, label, wort, grund in fails:
        print("    FAIL %s [%s] \"%s\": beruft sich auf \"%s\" — steht nicht auf der "
              "freien Seite: %s" % (name, vid, label, wort, grund[:95]))
    print("Stufe 47: %d FAIL — %d harmlos-Begruendungen geprueft" % (len(fails), geprueft))
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
