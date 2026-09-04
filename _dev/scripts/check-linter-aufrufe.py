#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Stufe 70 — der Linter ruft nichts auf, das es im Repo nicht gibt.

ANLASS (02.09.2026, ein Fehler von mir):
Zwei Sessions arbeiteten im selben Arbeitsbaum. Ich habe `validate-all.sh` committet, weil dort
ein Abbruch drinsteckte — aber die zwei Pruefskripte, die der neue Stand aufruft, lagen nur
untracked im Arbeitsverzeichnis. Bei mir lief alles gruen. Auf einem frischen Klon waere Stufe 69
ROT geworden, mit der Meldung "ein Pruefauftrag schickt den Gutachter gegen bereits verworfene
Befunde" — inhaltlich Unsinn, denn in Wahrheit fehlte nur die Datei. Eine Stufe, die aus dem
falschen Grund rot wird, ist schlimmer als eine, die schweigt: sie schickt jeden an die falsche
Stelle.

Verwandt mit Stufe 65 ("eine Liste im Code gegen die Wirklichkeit auf der Platte"), aber
bewusst NICHT dieselbe Stufe: dort heisst "existiert" ein Eintrag in einer anderen Liste, hier
eine versionierte Datei, und die gefaehrliche Richtung ist eine andere (dort "Ware ohne
Eintrag", hier "Aufruf ohne Datei"). Eine Stufe fuer beides waere unscharf.

ZUR GEGENPROBE (Nachtrag, nach einem Befund des Pruefstands):
Die erste Fassung hatte kein argparse und schluckte jedes Flag wortlos — `--gegenprobe` lief
durch und lieferte dasselbe Ergebnis wie der normale Lauf. Als `if X && X --gegenprobe`
verdrahtet haette die zweite Haelfte nichts bewiesen, aber wie ein Beweis ausgesehen. Genau die
Klasse, gegen die dieses Projekt seine Gegenproben baut, nur eine Ebene hoeher: ein Gegenbeweis,
den es nicht gibt. Jetzt schleust `--gegenprobe` einen Phantom-Aufruf IM SPEICHER ein (die Datei
auf der Platte wird nie angefasst) und verlangt, dass die Regel ihn faengt — und dass sie einen
versionierten Aufruf danebenstehen laesst.

NOCH NICHT IN validate-all.sh VERDRAHTET — und das ist Absicht, kein Vergessen.
Die Stufe ist heute zu Recht ROT: `validate-all.sh` ruft zwei Pruefskripte, die untracked im
gemeinsamen Arbeitsbaum liegen (mein Schaden, Commit f5089f65 — Aufrufer committet, Aufgerufenes
nicht). Sie jetzt zu verdrahten hiesse, den Linter ab der ersten Sekunde rot zu machen, ohne dass
das Verdrahten den Grund heilen kann. Die saubere Reihenfolge ist umgekehrt: erst die zwei
Skripte ins Repo, dann diese Stufe dazu — im selben Commit, damit es keinen Stand der Geschichte
gibt, in dem das eine ohne das andere existiert. Wer sie vorher verdrahtet, baut denselben
Fehler noch einmal, den sie fangen soll.

Aufruf:  python _dev/scripts/check-linter-aufrufe.py [--gegenprobe]
"""
import argparse, io, os, re, subprocess, sys

LINTER = "validate-all.sh"
MUSTER = re.compile(r"(?:python3?|node)\s+(_dev/scripts/[A-Za-z0-9._/-]+\.(?:py|mjs|js))")


def versionierte_dateien():
    try:
        aus = subprocess.run(["git", "ls-files", "_dev/scripts/"],
                             capture_output=True, text=True, timeout=60)
    except Exception as e:
        print(f"FEHLER: git nicht ausfuehrbar ({e}) — kein Freifahrtschein, die Stufe faellt aus.")
        sys.exit(2)
    if aus.returncode != 0:
        print("FEHLER: 'git ls-files' schlug fehl — kein Freifahrtschein, die Stufe faellt aus.")
        sys.exit(2)
    return {z.strip().replace("\\", "/") for z in aus.stdout.splitlines() if z.strip()}


def aufrufe_aus(quelle):
    """Nur echte Aufrufe: Zeilen ohne fuehrendes #, und python/node muss direkt vor dem Pfad
    stehen. Sonst wuerde jede Erwaehnung in einem Kommentar zum Treffer — dieselbe Falle, in die
    ein zu breites Muster heute schon einmal gelaufen ist."""
    treffer = set()
    for zeile in quelle.splitlines():
        for m in MUSTER.finditer(zeile.split("#", 1)[0]):
            treffer.add(m.group(1))
    return treffer


def fehlende(quelle, vorhanden):
    return sorted(a for a in aufrufe_aus(quelle) if a not in vorhanden)


def gegenprobe(quelle, vorhanden):
    """Zwei Richtungen, beide muessen stimmen. Die Datei auf der Platte wird nie beschrieben."""
    phantom = "_dev/scripts/check-phantom-gegenprobe-existiert-nicht.py"
    echt = sorted(vorhanden)[0] if vorhanden else None
    if echt is None:
        print("  FEHLER: keine versionierte Datei unter _dev/scripts/ — Gegenprobe nicht moeglich.")
        return 2

    mit_phantom = quelle + f"\npython {phantom}\n"
    gefangen = phantom in fehlende(mit_phantom, vorhanden)

    mit_echtem = quelle + f"\npython {echt}\n"
    fehlalarm = echt in fehlende(mit_echtem, vorhanden)

    print("Gegenprobe zu Stufe 70 (nur im Speicher, keine Datei wird angefasst):")
    print(f"  Phantom-Aufruf wird gefangen        : {'ja' if gefangen else 'NEIN'}")
    print(f"  versionierter Aufruf bleibt sauber  : {'ja' if not fehlalarm else 'NEIN (Fehlalarm)'}")
    if gefangen and not fehlalarm:
        print("\n  Gegenprobe bestanden — die Regel beisst und erfindet nichts.")
        return 0
    print("\n  Gegenprobe FEHLGESCHLAGEN — die Stufe beweist nicht, was sie behauptet.")
    return 1


def main():
    ap = argparse.ArgumentParser(description="Stufe 70: Linter-Aufrufe zeigen auf versionierte Dateien.")
    ap.add_argument("--gegenprobe", action="store_true",
                    help="beweist, dass die Regel einen erfundenen Aufruf faengt und einen echten nicht")
    a = ap.parse_args()          # unbekannte Flags -> Exit 2, statt sie zu schlucken

    if not os.path.exists(LINTER):
        print(f"FEHLER: {LINTER} nicht gefunden — laeuft die Stufe im Repo-Wurzelverzeichnis?")
        return 2
    quelle = io.open(LINTER, encoding="utf-8", errors="replace").read()
    vorhanden = versionierte_dateien()

    if a.gegenprobe:
        return gegenprobe(quelle, vorhanden)

    alle = aufrufe_aus(quelle)
    if not alle:
        print(f"FEHLER: kein einziger Skript-Aufruf in {LINTER} gefunden — Muster kaputt?")
        return 2

    fehlt = fehlende(quelle, vorhanden)
    print(f"Stufe 70: {len(alle)} Skript-Aufrufe in {LINTER}\n")
    if not fehlt:
        print(f"  0 FAIL — alle {len(alle)} aufgerufenen Skripte sind versioniert.")
        return 0
    for f in fehlt:
        lokal = " (liegt untracked im Arbeitsverzeichnis)" if os.path.exists(f) else " (existiert gar nicht)"
        print(f"  FAIL  {f} wird aufgerufen, ist aber nicht im Repo{lokal}")
    print(f"\n  {len(fehlt)} FAIL — auf einem frischen Klon laeuft dieser Linter nicht durch,")
    print("  und die betroffene Stufe meldet einen Grund, der nicht stimmt.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
