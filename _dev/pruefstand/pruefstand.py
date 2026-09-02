# -*- coding: utf-8 -*-
"""machsleicht-Pruefstand — ein Kommando, eine Befund-Tabelle.

    python _dev/pruefstand/pruefstand.py                  # alles (dauert Minuten)
    python _dev/pruefstand/pruefstand.py --gruppe maschine # nur Linter + Idempotenz
    python _dev/pruefstand/pruefstand.py --gruppe nachweis # beissen die Stufen? Befunde offen?
    python _dev/pruefstand/pruefstand.py --fall linter     # Namensfilter
    python _dev/pruefstand/pruefstand.py --laut            # Belege auch bei gruenen Punkten

Exit 0 = alle Faelle gruen. Exit 1 = mindestens ein Pruefpunkt rot.
Der Kordon wird VOR dem ersten Fall scharf geschaltet und beweist sich selbst;
scheitert sein Selbsttest, laeuft kein einziger Fall.
"""
from __future__ import annotations

import argparse
import sys
from pathlib import Path

_HIER = Path(__file__).resolve().parent
for _p in (str(_HIER), str(_HIER.parent)):
    if _p not in sys.path:
        sys.path.insert(0, _p)

import erwartung  # noqa: E402
import kordon  # noqa: E402

try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:  # noqa: BLE001
    pass


def _faelle_laden() -> None:
    """Jede faelle_*.py in diesem Ordner registriert ihre Faelle beim Import."""
    import importlib
    for datei in sorted(_HIER.glob("faelle_*.py")):
        importlib.import_module(datei.stem)


def main() -> int:
    ap = argparse.ArgumentParser(description="machsleicht-Pruefstand")
    ap.add_argument("--gruppe", default=None)
    ap.add_argument("--fall", default=None, help="Namensfilter (Teilstring)")
    ap.add_argument("--profil", default="dicht", choices=sorted(kordon.PROFILE))
    ap.add_argument("--laut", action="store_true", help="Belege auch bei gruenen Punkten")
    ap.add_argument("--streng", action="store_true",
                    help="uebersprungene Faelle als Fehlschlag werten")
    a = ap.parse_args()

    kordon.scharf(a.profil)
    print(kordon.zusammenfassung() + "\n")

    _faelle_laden()
    faelle = erwartung.alle(a.gruppe, a.fall)
    if not faelle:
        print("Kein Fall passt zum Filter. Gruppen: " + ", ".join(erwartung.gruppen()))
        return 1

    ergebnisse = []
    for eintrag in faelle:
        erg = erwartung.laufen_lassen(eintrag)
        ergebnisse.append(erg)
        marke = "grau" if erg.uebersprungen else ("gruen" if erg.gruen else "ROT ")
        print("[" + marke + "] " + erg.name.ljust(24) + " "
              + str(len(erg.punkte)).rjust(2) + " Punkte  "
              + ("%6.1fs" % erg.dauer_s))
        if erg.uebersprungen:
            print("        uebersprungen: " + erg.uebersprungen)
        if erg.absturz:
            print("        ABSTURZ:\n" + _einrueckung(erg.absturz))
        for punkt in erg.punkte:
            if punkt.ok and not a.laut:
                continue
            zeichen = "   ok" if punkt.ok else ("  " + punkt.schwere)
            print("     " + zeichen + "  " + punkt.text)
            if punkt.beleg and not punkt.ok:
                print("            Beleg: " + punkt.beleg)

    grau = [e for e in ergebnisse if e.uebersprungen]
    rot = [e for e in ergebnisse if not e.gruen and not e.uebersprungen]
    gruen = [e for e in ergebnisse if e.gruen]
    punkte_gesamt = sum(len(e.punkte) for e in ergebnisse)
    punkte_rot = sum(len(e.rote()) for e in ergebnisse)
    print("\n" + "=" * 68)
    print(str(len(gruen)) + "/" + str(len(ergebnisse)) + " Faelle gruen · "
          + str(punkte_gesamt - punkte_rot) + "/" + str(punkte_gesamt) + " Pruefpunkte gruen"
          + ((" · " + str(len(grau)) + " uebersprungen (NICHT geprueft)") if grau else ""))
    if rot:
        print("\nRot:")
        for e in rot:
            grund = "ABSTURZ" if e.absturz else "; ".join(p.text for p in e.rote())
            print("  · " + e.name + ": " + grund)
            print("    warum der Fall existiert: " + e.warum)
    if grau:
        print("\nUebersprungen — diese Zusagen sind ungeprueft, nicht bestaetigt:")
        for e in grau:
            print("  · " + e.name + ": " + e.uebersprungen)
    if rot:
        return 1
    return 1 if (grau and a.streng) else 0


def _einrueckung(text: str) -> str:
    return "\n".join("          " + z for z in text.splitlines())


if __name__ == "__main__":
    raise SystemExit(main())
