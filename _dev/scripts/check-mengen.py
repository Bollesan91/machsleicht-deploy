#!/usr/bin/env python3
"""Stufe 59: Die Einkaufsliste rechnet — und hoert nicht heimlich damit auf.

Seit dem 19.08.2026 rechnet das Paket die Mengen aus der echten Gaesteliste. Das
haengt an zwei Feldern: variants[].basisKinder (Rechengrundlage) und je Posten
skaliert (proKind | fix | gebinde). Der Renderer rechnet NUR, wenn beides
vollstaendig ist — sonst faellt er auf den alten Hinweissatz zurueck.

Genau darin liegt die Falle: Wer einen neuen Einkaufsposten eintraegt und das
Feld vergisst, macht keinen sichtbaren Fehler. Die Variante hoert einfach auf zu
rechnen, das Blatt entschuldigt sich wieder, und niemand merkt es — bis ein
Kaeufer es merkt. Diese Stufe macht den Rueckfall sichtbar.

Geprueft wird:
  1. skaliert traegt nur erlaubte Werte
  2. gebinde steht nur bei skaliert="gebinde" und ist eine sinnvolle Zahl
  3. basisKinder ist eine positive Zahl, wo eine dasteht
  4. keine Variante verliert ihre Rechenfaehigkeit (Abgleich gegen den Stand,
     der als erreicht dokumentiert ist)

Aufruf:  python _dev/scripts/check-mengen.py [--gegenprobe]
"""
import glob
import json
import os
import sys

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
ERLAUBT = {"proKind", "fix", "gebinde"}

# Stand vom 20.08.2026, mit _dev/scripts/mengen-entscheiden.py erreicht. Die Zahl
# darf steigen, nie fallen. Faellt sie, hat jemand einen Posten ohne Entscheidung
# eingetragen — dann entschuldigt sich das Blatt wieder statt zu rechnen.
SOLL_RECHNENDE_VARIANTEN = 133

# Die zwei Ausnahmen, die bewusst nicht rechnen: ihr costContext nennt keine Zahl,
# aus der sich eine Rechengrundlage lesen liesse (Fliesstext statt "(Wow, 8 Kinder)").
BEKANNT_OHNE_BASIS = {("einhorn-klein.json", "wow"), ("feen-klein.json", "wow")}


def pruefe(ordner=None, soll=None):
    fehler = []
    rechnende = 0
    varianten = 0
    posten = 0
    ordner = ordner or os.path.join(REPO, "data", "motto")
    soll = SOLL_RECHNENDE_VARIANTEN if soll is None else soll

    for pfad in sorted(glob.glob(os.path.join(ordner, "*.json"))):
        name = os.path.basename(pfad)
        with open(pfad, encoding="utf-8") as f:
            daten = json.load(f)
        for v in daten.get("variants", []):
            vid = v.get("id", "?")
            varianten += 1
            liste = v.get("shoppingList") or []
            basis = v.get("basisKinder")

            if basis is not None and (not isinstance(basis, int) or basis <= 0):
                fehler.append("%s/%s: basisKinder ist %r, erwartet eine positive Zahl"
                              % (name, vid, basis))

            alle_entschieden = bool(liste)
            for it in liste:
                posten += 1
                sk = it.get("skaliert")
                label = str(it.get("label", ""))[:40]
                if sk is None:
                    alle_entschieden = False
                    continue
                if sk not in ERLAUBT:
                    fehler.append("%s/%s: skaliert=%r bei \"%s\" — erlaubt sind %s"
                                  % (name, vid, sk, label, ", ".join(sorted(ERLAUBT))))
                    alle_entschieden = False
                geb = it.get("gebinde")
                if geb is not None and sk != "gebinde":
                    fehler.append("%s/%s: gebinde=%r bei skaliert=%r (\"%s\") — "
                                  "eine Packungsgroesse ohne Packung rechnet nie mit"
                                  % (name, vid, geb, sk, label))
                if sk == "gebinde" and (not isinstance(geb, int) or geb < 2):
                    fehler.append("%s/%s: skaliert=gebinde ohne brauchbare Packungsgroesse "
                                  "(gebinde=%r) bei \"%s\"" % (name, vid, geb, label))

            if alle_entschieden and isinstance(basis, int) and basis > 0:
                rechnende += 1
            elif (name, vid) not in BEKANNT_OHNE_BASIS and liste:
                offen = [str(i.get("label", ""))[:36] for i in liste if not i.get("skaliert")]
                if offen:
                    fehler.append("%s/%s rechnet nicht mehr — ohne Entscheidung: %s"
                                  % (name, vid, " | ".join(offen[:3])))

    if rechnende < soll:
        fehler.append("Nur %d von %d Varianten rechnen (dokumentiert: %d). Jede fehlende "
                      "druckt wieder den Hinweissatz statt einer Summe."
                      % (rechnende, varianten, soll))
    return fehler, rechnende, varianten, posten


def gegenprobe():
    """Legt kaputte Motto-Dateien an und laesst DIE ECHTE Pruefung darueber laufen.

    Die erste Fassung baute die Pruefregeln in der Gegenprobe nach — und haette
    deshalb auch dann gruen gemeldet, wenn pruefe() gar nichts kann. Genau der
    Fehler, den L24 fuer Gates beschreibt: wer die Regel nachbaut, prueft seine
    eigene Kopie. Jetzt wird dieselbe Funktion aufgerufen, die im Ernstfall laeuft.
    """
    import shutil
    import tempfile

    faelle = [
        ("unbekannter Wert",        {"label": "X", "skaliert": "vielleicht"}, "skaliert="),
        ("gebinde ohne Packung",    {"label": "X", "skaliert": "fix", "gebinde": 8}, "gebinde=8"),
        ("Packung ohne Groesse",    {"label": "X", "skaliert": "gebinde"}, "Packungsgroesse"),
        ("Posten ohne Entscheidung", {"label": "X"}, "rechnet nicht mehr"),
        ("Rechengrundlage kaputt",  {"label": "X", "skaliert": "fix"}, "basisKinder ist"),
    ]
    schlecht = 0
    tmp = tempfile.mkdtemp(prefix="mengen-gegenprobe-")
    try:
        for titel, posten, erwartet in faelle:
            basis = "acht" if titel == "Rechengrundlage kaputt" else 8
            inhalt = {"variants": [{"id": "test", "basisKinder": basis,
                                    "shoppingList": [dict(posten)]}]}
            ziel = os.path.join(tmp, "probe.json")
            with open(ziel, "w", encoding="utf-8") as f:
                json.dump(inhalt, f, ensure_ascii=False)
            # soll=0, damit nur der eingebaute Fehler zaehlt und nicht die Coverage
            fehler, _, _, _ = pruefe(ordner=tmp, soll=0)
            treffer = [f for f in fehler if erwartet in f]
            ok = bool(treffer)
            print("  [%s] %s%s" % ("erkannt " if ok else "VERPASST", titel,
                                   "" if ok else "  -> %r nicht gemeldet" % erwartet))
            if not ok:
                schlecht += 1
        # Gegenprobe der Gegenprobe: eine SAUBERE Datei darf nichts melden.
        with open(os.path.join(tmp, "probe.json"), "w", encoding="utf-8") as f:
            json.dump({"variants": [{"id": "test", "basisKinder": 8,
                                     "shoppingList": [{"label": "X", "skaliert": "fix"}]}]},
                      f, ensure_ascii=False)
        fehler, _, _, _ = pruefe(ordner=tmp, soll=0)
        ok = not fehler
        print("  [%s] sauberer Datensatz bleibt still%s"
              % ("erkannt " if ok else "VERPASST", "" if ok else "  -> %s" % fehler[:1]))
        if not ok:
            schlecht += 1
    finally:
        shutil.rmtree(tmp, ignore_errors=True)
    return schlecht


def main():
    if "--gegenprobe" in sys.argv:
        print("Gegenprobe Stufe 59:")
        return 1 if gegenprobe() else 0

    fehler, rechnende, varianten, posten = pruefe()
    print("Stufe 59: %d FAIL — %d Posten in %d Varianten, davon %d mit echter Mengenrechnung"
          % (len(fehler), posten, varianten, rechnende))
    for f in fehler[:15]:
        print("    FAIL %s" % f)
    if len(fehler) > 15:
        print("    ... und %d weitere" % (len(fehler) - 15))
    return 1 if fehler else 0


if __name__ == "__main__":
    sys.exit(main())
