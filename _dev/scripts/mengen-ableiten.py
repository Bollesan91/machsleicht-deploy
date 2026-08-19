#!/usr/bin/env python3
"""Setzt die Rechengrundlage der Einkaufsliste als ZAHL in die Daten.

Warum es das gibt (Bolle 19.08.2026, sinngemaess: "das haben wir doch tagelang
mit der Maschine gebaut, wo ist jetzt das Problem"):

Die Maschine leitet ab, was als Zahl vorliegt. Bei der Einkaufsliste lag nichts
als Zahl vor. Die Menge steckte im Fliesstext des Labels ("8 Pappschilde",
"Pool-Nudel-Schwerter (8er)"), und die Rechengrundlage steckte im Fliesstext von
costContext ("Geschaetzte Kosten (Standard, 8 Kinder)"). Deshalb konnte das Paket
mit 5 Zusagen nichts anfangen und druckte stattdessen eine Entschuldigung:
"Die Mengen unten sind fuer 8 Kinder gerechnet, du hast 5 Zusagen."

Dieses Skript macht aus dem Wort ein Feld:
  variants[].basisKinder : int   — fuer wie viele Kinder priceEur geschaetzt ist
Es RAET NICHTS. Wo costContext keine eindeutige Zahl nennt, bleibt das Feld leer
und der Fall wird gemeldet. Ein geratenes Feld waere schlimmer als keins: die
Summe auf Blatt 5 ist die Zahl, nach der jemand einkaufen geht.

Die zweite Haelfte — skaliert je Posten (proKind / fix / gebinde) — ist bewusst
NICHT hier automatisiert. "Pappschilde" skaliert, "Pappkarton-Drache" nicht, und
das steht in keinem Label. Diese Entscheidung faellt pro Motto von Hand; der
Renderer behandelt einen Posten ohne Angabe als 'fix' und laesst den
Entschuldigungssatz genau so lange stehen, wie die Liste nicht vollstaendig
entschieden ist.

Aufruf:  python _dev/scripts/mengen-ableiten.py [--schreiben]
Ohne --schreiben wird nur berichtet.
"""
import glob
import json
import os
import re
import sys

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# "Geschaetzte Kosten (Standard, 8 Kinder)" · "(Wow, bis 8 Kinder)" · "(Minimal, 6-8 Kinder)"
# Bei einer Spanne gilt die OBERE Zahl: priceEur ist die Schaetzung fuer den
# groesseren Fall, sonst faellt die hochgerechnete Summe zu hoch aus.
RX_SPANNE = re.compile(r"(\d{1,2})\s*(?:-|–|bis)\s*(\d{1,2})\s*Kinder", re.I)
RX_EINZEL = re.compile(r"(?:bis\s+)?(\d{1,2})\s*Kinder", re.I)


def basis_aus(text):
    """Gibt die Rechengrundlage zurueck oder None, wenn der Text keine nennt."""
    if not text:
        return None
    m = RX_SPANNE.search(text)
    if m:
        return max(int(m.group(1)), int(m.group(2)))
    m = RX_EINZEL.search(text)
    if m:
        return int(m.group(1))
    return None


def main():
    schreiben = "--schreiben" in sys.argv
    gesetzt = 0
    offen = []
    dateien = 0

    for pfad in sorted(glob.glob(os.path.join(REPO, "data", "motto", "*.json"))):
        with open(pfad, encoding="utf-8") as f:
            daten = json.load(f)
        geaendert = False
        for v in daten.get("variants", []):
            basis = basis_aus(v.get("costContext", ""))
            if basis is None:
                offen.append((os.path.basename(pfad), v.get("id", "?"),
                              (v.get("costContext") or "(leer)")[:60]))
                continue
            if v.get("basisKinder") != basis:
                v["basisKinder"] = basis
                geaendert = True
            gesetzt += 1
        if geaendert and schreiben:
            with open(pfad, "w", encoding="utf-8", newline="\n") as f:
                json.dump(daten, f, ensure_ascii=False, indent=2)
                f.write("\n")
            dateien += 1

    print("Rechengrundlage aus costContext gelesen: %d Varianten" % gesetzt)
    if schreiben:
        print("geschrieben in %d Dateien" % dateien)
    else:
        print("(Probelauf - nichts geschrieben, --schreiben zum Uebernehmen)")

    if offen:
        print("\nOHNE eindeutige Zahl (%d) - bleiben leer, kein Raten:" % len(offen))
        for datei, vid, txt in offen:
            print("  %-28s %-9s %s" % (datei, vid, txt))
    return 0


if __name__ == "__main__":
    sys.exit(main())
