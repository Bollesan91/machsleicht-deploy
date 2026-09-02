# -*- coding: utf-8 -*-
"""machsleicht-Pruefstand · Befund-Gate — macht aus Gutachter-Meinung eine Tatsache.

DAS PROBLEM
Ein Gegenpruefer kann in beide Richtungen irren: erfinden und schmeicheln. Beides
merkt niemand, solange sein Text das Ergebnis ist. Ein Review, dessen Ausgabe Prosa
ist, ist nicht ueberpruefbar — er ist nur unterschiedlich ueberzeugend.

DIE REGEL — und der Unterschied zum ASKER-Gate
ASKER kennt zwei Ausgaenge (Fall oder WIDERLEGT). Fuer machsleicht reicht das nicht:
ein Teil der Befunde ist Inhalt ("der Ablauf klingt gestelzt"), und den in eine
Linter-Stufe zu pressen wuerde Regeln erzeugen, die niemand will. Also drei Ausgaenge
— und der dritte hat eine Sperre, die genau Bolles V5-Satz mechanisiert:

  > Ein Reviewer, der eine Fehlerklasse zum ZWEITEN Mal findet, hat ein
  > Maschinen-Ticket gefunden, kein Content-Ticket.

  · Stufe:      in die Maschine gegossen. Die Stufe muss es geben UND sie muss in
                proben.py als beissend nachgewiesen sein. Sonst ist sie Dekoration.
  · WIDERLEGT:  kein Befund, mit Begruendung — damit er in der naechsten Welle nicht
                als Neufund zurueckkommt.
  · Einzelfall: gefixt, ohne Regel — erlaubt GENAU EINMAL je Klasse. Taucht dieselbe
                Klasse ein zweites Mal ohne Stufe auf, ist das Gate rot. Das ist die
                Stelle, an der aus Handarbeit ein Maschinen-Ticket wird.

Fuer Lob gibt es kein Feld. Wer nichts findet, schreibt Winkel fuer Winkel auf, was
er geprueft hat — daraus wird kein Fall, aber auch kein Gruen.

    python _dev/pruefstand/befund_gate.py             # alle Befund-Dateien
    python _dev/pruefstand/befund_gate.py <datei.md>  # eine
"""
from __future__ import annotations

import re
import sys
from dataclasses import dataclass, field
from pathlib import Path

_HIER = Path(__file__).resolve().parent
REPO = _HIER.parent.parent
BEFUNDE = _HIER / "befunde"
PROBEN = _HIER / "proben.py"
LINTER = REPO / "validate-all.sh"

try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:  # noqa: BLE001
    pass

SCHWEREN = {"MAJOR", "MINOR", "UNSICHER"}
STATUS = {"OFFEN", "BEHOBEN", "WIDERLEGT"}

# Ein Feld reicht bis zum naechsten Feld oder zum Ende des Abschnitts; eine
# angehaengte Nummer ist erlaubt. Beides ist bei ASKER Lehrgeld gewesen: die erste
# Fassung las nur den REST DER ZEILE und meldete mehrzeilige Zitate als "kein
# Zitat", und sie verlangte exakt "Ablauf:", womit ein Befund mit ZWEI Laeufen als
# unbelegt galt. Ein Gate, das mehr Beleg bestraft, erzieht zu weniger Beleg.
_FELD = re.compile(r"^\*\*([A-Za-zÄÖÜäöüß]+)(?:[ \t]+\d+)?:?\*\*[ \t]*(.*?)"
                   r"(?=^\*\*[A-Za-zÄÖÜäöüß]+(?:[ \t]+\d+)?:?\*\*|\Z)",
                   re.MULTILINE | re.DOTALL)

# Abschnitte ohne jedes Befund-Feld sind der Winkel-fuer-Winkel-Bericht, den der
# Auftrag ausdruecklich verlangt. Den als unvollstaendigen Befund anzumeckern hiesse,
# genau den Teil zu bestrafen, der Vollstaendigkeit belegt.
_BEFUND_FELDER = {"Schwere", "Befund", "Fix"}


@dataclass
class Befund:
    datei: str
    titel: str
    felder: dict = field(default_factory=dict)
    maengel: list = field(default_factory=list)

    def feld(self, name: str) -> str:
        return (self.felder.get(name) or "").strip()

    @property
    def schwere(self) -> str:
        return self.feld("Schwere").upper()


def lesen(pfad: Path) -> list:
    text = pfad.read_text(encoding="utf-8")
    aus = []
    for block in re.split(r"^## ", text, flags=re.MULTILINE)[1:]:
        b = Befund(datei=pfad.name, titel=block.splitlines()[0].strip())
        for name, wert in _FELD.findall(block):
            if name in b.felder:
                b.felder[name] += "\n" + wert
            else:
                b.felder[name] = wert
        if _BEFUND_FELDER & set(b.felder):
            aus.append(b)
    return aus


def _bekannte_stufen() -> set:
    if not LINTER.exists():
        return set()
    text = LINTER.read_text(encoding="utf-8", errors="replace")
    return {m.upper() for m in re.findall(r"STUFE\s+([0-9]+[a-z]?)", text)}


def _bewiesene_proben() -> str:
    return PROBEN.read_text(encoding="utf-8") if PROBEN.exists() else ""


def pruefen(befunde: list) -> list:
    stufen = _bekannte_stufen()
    proben = _bewiesene_proben()
    klassen_ohne_stufe: dict = {}

    for b in befunde:
        if b.schwere not in SCHWEREN:
            b.maengel.append("Schwere fehlt oder unbekannt: " + repr(b.feld("Schwere"))
                             + " (erlaubt: " + str(sorted(SCHWEREN)) + ")")
        if not b.feld("Zitat"):
            b.maengel.append("kein woertliches Zitat — ohne Belegstelle nicht nachpruefbar")
        if not b.feld("Ablauf"):
            b.maengel.append("kein Ablauf — eine Behauptung ohne Lauf ist kein Befund")

        if b.schwere != "MAJOR":
            continue

        status = b.feld("Status").upper()
        if status not in STATUS:
            b.maengel.append("MAJOR ohne gueltigen Status: " + repr(status)
                             + " (erlaubt: " + str(sorted(STATUS)) + ")")
            continue

        if status == "WIDERLEGT":
            if not b.feld("Begruendung"):
                b.maengel.append("WIDERLEGT ohne Begruendung — so kommt er als Neufund zurueck")
            continue

        stufe = b.feld("Stufe")
        einzelfall = b.feld("Einzelfall")

        if stufe:
            nummer = re.search(r"([0-9]+[a-z]?)", stufe)
            skript = re.search(r"([\w./-]+\.(?:py|mjs|js|sh))", stufe)
            if nummer and nummer.group(1).upper() not in stufen:
                b.maengel.append("Stufe '" + stufe + "' kommt in validate-all.sh nicht vor")
            elif skript and not (REPO / skript.group(1)).exists():
                b.maengel.append("Stufe '" + stufe + "' — dieses Pruefskript gibt es nicht")
            elif not nummer and not skript:
                b.maengel.append("Stufe '" + stufe + "' nennt weder Stufennummer noch Skript")
            # Die Stufe muss beissen. Sonst ist der Befund nur umetikettiert.
            # Gesucht wird der Probenname "stufe-<nr>", NICHT die nackte Zahl: "5" kommt
            # in jeder Datei vor, und ein Gate, das man mit einer zufaelligen Ziffer
            # ueberlistet, ist genau der bequeme Weg, einen Befund loszuwerden.
            # Mit Ziffern-Grenze: die erste Fassung suchte "stufe-5" als Teilstring und
            # fand "stufe-58-werbekennzeichnung" — eine Stufe ohne jede Probe kam damit
            # durch. Gefunden von der eigenen Gegenprobe am 02.09.2026, keine Minute nach
            # dem Bau. Genau der Grund, warum ein Gate seinen eigenen Rot-Beleg braucht.
            if nummer:
                marke = "stufe-" + nummer.group(1).lower()
                bewiesen = re.search(re.escape(marke) + r"(?![0-9])", proben.lower())
            elif skript:
                marke = skript.group(1)
                bewiesen = marke in proben
            else:
                marke, bewiesen = "", True
            if marke and not bewiesen:
                b.maengel.append(
                    "Stufe '" + marke + "' ist in proben.py nicht als beissend nachgewiesen — "
                    "eine Stufe, die nie rot war, ist kein Gate")
            continue

        if einzelfall:
            klasse = b.feld("Klasse")
            if not klasse:
                b.maengel.append("Einzelfall ohne Klasse — ohne Klassennamen kann niemand "
                                 "sehen, ob derselbe Fehler wiederkommt")
                continue
            klassen_ohne_stufe.setdefault(klasse.lower(), []).append(b)
            continue

        b.maengel.append("MAJOR ohne Ausgang — weder Stufe noch WIDERLEGT noch Einzelfall")

    # Bolles V5-Regel, mechanisch: zweimal dieselbe Klasse von Hand = Maschinen-Ticket.
    for klasse, treffer in klassen_ohne_stufe.items():
        if len(treffer) > 1:
            for b in treffer:
                b.maengel.append(
                    "Klasse '" + klasse + "' kommt zum " + str(len(treffer)) + ". Mal als "
                    "Einzelfall (" + ", ".join(t.datei for t in treffer) + ") — ab dem "
                    "zweiten Mal ist das ein Maschinen-Ticket, kein Content-Ticket")
    return befunde


def selbsttest() -> int:
    """Beisst das Gate selbst? proben/gate_gruen.md muss durchlaufen, proben/gate_rot.md
    muss scheitern — und zwar an JEDER seiner sechs Regelverletzungen. Ein Gate, das man
    nicht rot bekommt, ist kein Gate; eines, das korrekte Beleglage rot macht, erzieht zu
    weniger Beleg."""
    proben = _HIER / "proben"
    gruen, rot = proben / "gate_gruen.md", proben / "gate_rot.md"
    fehler = []
    if not gruen.exists() or not rot.exists():
        print("Proben fehlen: " + str(proben))
        return 1

    b_gruen = pruefen(lesen(gruen))
    schlecht = [b for b in b_gruen if b.maengel]
    if schlecht:
        fehler.append("gate_gruen.md wurde rot — das Gate ist zu streng:")
        for b in schlecht:
            fehler.append("    " + b.titel + ": " + "; ".join(b.maengel))

    b_rot = pruefen(lesen(rot))
    getroffen = [b for b in b_rot if b.maengel]
    if len(getroffen) < 7:
        fehler.append("gate_rot.md: nur " + str(len(getroffen)) + " von 6 Verletzungen "
                      "erkannt — das Gate ist stumpf")
        for b in b_rot:
            if not b.maengel:
                fehler.append("    durchgelassen: " + b.titel)

    print("Selbsttest: gate_gruen.md " + ("GRUEN" if not schlecht else "ROT")
          + " · gate_rot.md " + str(len(getroffen)) + "/7 Verletzungen erkannt")
    for z in fehler:
        print("  " + z)
    return 1 if fehler else 0


def main(argv: list) -> int:
    if argv and argv[0] == "--selbsttest":
        return selbsttest()
    if argv:
        dateien = [Path(a) for a in argv]
    else:
        BEFUNDE.mkdir(exist_ok=True)
        dateien = sorted(p for p in BEFUNDE.glob("*.md") if p.name != "README.md")

    if not dateien:
        print("Keine Befund-Dateien — nichts zu pruefen.")
        return 0

    alle = []
    for d in dateien:
        alle += lesen(d)
    pruefen(alle)

    schlecht = [b for b in alle if b.maengel]
    nach_schwere: dict = {}
    for b in alle:
        nach_schwere[b.schwere or "?"] = nach_schwere.get(b.schwere or "?", 0) + 1

    print(str(len(alle)) + " Befunde aus " + str(len(dateien)) + " Datei(en): "
          + ", ".join(k + "=" + str(v) for k, v in sorted(nach_schwere.items())))
    for b in schlecht:
        print("\nROT  " + b.datei + " · " + b.titel)
        for m in b.maengel:
            print("       · " + m)

    offen = [b for b in alle if b.schwere == "MAJOR" and b.feld("Status").upper() == "OFFEN"]
    if offen:
        print("\n" + str(len(offen)) + " MAJOR offen (Ausgang benannt, Fix steht aus):")
        for b in offen:
            print("  · " + b.titel)

    print("\n" + "=" * 68)
    if schlecht:
        print("GATE ROT — " + str(len(schlecht)) + " Befund(e) unerledigt.")
        return 1
    print("GATE GRUEN — jeder MAJOR ist eine beissende Stufe, ein begruendetes "
          "WIDERLEGT oder ein erstmaliger Einzelfall.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
