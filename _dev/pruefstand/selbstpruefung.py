# -*- coding: utf-8 -*-
"""machsleicht-Pruefstand · Selbstpruefung — beissen die Stufen ueberhaupt?

DAS PROBLEM
`validate-all.sh` hat 64 Stufen und meldet 0 FAIL. Das ist eine gute Nachricht nur
dann, wenn die Stufen einen echten Fehler auch WIRKLICH sehen wuerden. Eine Stufe,
die nie rot war, ist eine Behauptung, kein Gate. Helfer V5 verlangt zu jeder neuen
Stufe eine "Gegenprobe" — als Pflicht, die an Disziplin haengt. Eine Pflicht, die an
Disziplin haengt, ist keine Pflicht (L14). Hier wird sie zur Maschine.

WIE
Fuer jede Probe: eine ARBEITSKOPIE des Repos anlegen, dort GENAU EINE Zusage
absichtlich brechen, das zustaendige Gate laufen lassen und ROT erwarten. Danach
zuruecksetzen und wieder GRUEN erwarten. Vier Ausgaenge, alle vier ehrlich benannt:

  BEISST        vorher gruen -> mutiert rot -> zurueckgesetzt gruen. Das Gate lebt.
  STUMPF        Mutation griff, Gate blieb gruen. Die Stufe sieht ihren eigenen
                Fehlerfall nicht — der wertvollste Fund dieses Skripts.
  MUTATION-LEER Der Suchtext kam in der Datei nicht vor. KEIN Beweis in irgendeine
                Richtung: die Probe ist kaputt, nicht die Stufe. Nie als gruen zaehlen.
  BASIS-ROT     Das Gate war schon vor der Mutation rot. Erst reparieren, dann messen.

Mutiert wird ausschliesslich in der Arbeitskopie unter dem Scratch-Pfad; der Kordon
(kordon.nur_kopie) bricht ab, wenn eine Probe ins Repo zielt.

    python _dev/pruefstand/selbstpruefung.py                 # nur die schnellen Proben
    python _dev/pruefstand/selbstpruefung.py --voll          # auch die, die den ganzen Linter brauchen
    python _dev/pruefstand/selbstpruefung.py --probe eszett  # Namensfilter
    python _dev/pruefstand/selbstpruefung.py --behalten      # Arbeitskopie nicht loeschen

Exit 0 = jede gelaufene Probe beisst. Exit 1 = mindestens eine stumpf/leer/basis-rot.
"""
from __future__ import annotations

import argparse
import os
import re
import shutil
import subprocess
import sys
import tempfile
import time
from dataclasses import dataclass
from pathlib import Path

_HIER = Path(__file__).resolve().parent
if str(_HIER) not in sys.path:
    sys.path.insert(0, str(_HIER))

import kordon  # noqa: E402

REPO = kordon.REPO
try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:  # noqa: BLE001
    pass


# --------------------------------------------------------------------- Arbeitskopie

class Arbeitskopie:
    """Eine Kopie der GETRACKTEN Dateien. Bewusst nur getrackt: so misst die
    Selbstpruefung denselben Stand, den ein frischer Checkout haette — Zustand aus
    dem Arbeitsverzeichnis wuerde ein Ergebnis vortaeuschen, das anderswo nicht
    reproduzierbar ist (die Lehre aus ASKERs ZUSTANDSABHAENGIG.md)."""

    def __init__(self, ziel: Path | None = None, mit_git: bool = True) -> None:
        wurzel = ziel or Path(tempfile.gettempdir()) / "ml-pruefstand"
        self.pfad = wurzel
        self.mit_git = mit_git
        self.historie = False
        self._original: dict[str, str] = {}

    # Der Pruefstand muss sich selbst pruefen koennen, BEVOR er committet ist —
    # sonst waeren genau die Proben unmoeglich, die eine fehlende Kordon-Naht
    # nachweisen. Deshalb wandern diese Pfade zusaetzlich mit, getrennt gezaehlt,
    # damit niemand den Zusatz spaeter fuer "war im Checkout" haelt.
    # `_dev/scripts` ist mit drin, weil eine NEUE Stufe ihren Biss beweisen muss, bevor
    # sie committet wird — sonst waere die Reihenfolge "erst einchecken, dann pruefen".
    ZUSATZ = ("_dev/pruefstand", "_dev/scripts")

    def erstellen(self) -> "Arbeitskopie":
        # Ein EIGENES Verzeichnis je Lauf, statt einen festen Pfad wiederzuverwenden.
        # Am 03.09. blieb nach einem fehlgeschlagenen rmtree (Windows-Dateisperre) ein
        # Rest liegen; `git clone` verweigert ein nicht leeres Ziel, der Rueckfall auf
        # `git init` lief STILL, und die Kopie hatte keine Historie mehr. Die Proben,
        # die den Korpus brauchen, meldeten daraufhin BASIS-ROT — ein Defekt der
        # Messumgebung, der wie ein Defekt des Prueflings aussah. Ein frischer Pfad
        # kann nicht kollidieren.
        if self.pfad.exists():
            shutil.rmtree(self.pfad, ignore_errors=True)
        if self.pfad.exists():
            self.pfad = self.pfad.with_name(self.pfad.name + "-" + str(os.getpid()))
        roh = kordon._ORIG.get("run", subprocess.run)
        # Ohne Git ist die Kopie fuer mehrere Stufen kein gueltiger Pruefling: Stufe 9
        # meldet "0 Dateien geprueft", 23/40/45 fallen aus Umgebungsgruenden, und 65/66/67
        # koennen gar nicht messen. Gemessen am 02.09. beim Konstanten-Auftrag: vier rote
        # Stufen, die mit der Mutation nichts zu tun hatten. Ein Pruefstand, dessen
        # Grundrauschen so laut ist, hoert die kleinen Signale nicht mehr.
        if self.mit_git:
            # KLON statt `git init`: die Kopie bekommt die echte Versionsgeschichte.
            # Mit `init` war jede Datei "von heute", und jede Stufe, die gegen
            # `git log` misst, war in der Kopie blind — Stufe 67 meldete dort 60
            # falsche Treffer, und die Korpus-Gegenprobe von Stufe 71 konnte den
            # Stand vor der Reparatur gar nicht sehen. Ein Klon mit --shared kostet
            # fast nichts (die Objekte bleiben im Original) und hebt die Grenze auf,
            # statt sie zu dokumentieren.
            geklont = roh(["git", "clone", "--local", "--shared", "--quiet",
                           str(REPO), str(self.pfad)], capture_output=True, timeout=600)
            if geklont.returncode != 0:
                self.pfad.mkdir(parents=True, exist_ok=True)
                roh(["git", "init", "-q", str(self.pfad)], capture_output=True, timeout=120)
            # Kein stiller Rueckfall: die Kopie sagt, ob sie Historie hat. Proben, die
            # gegen einen alten Stand messen, koennen sich sonst nicht von einem echten
            # Fehlschlag unterscheiden.
            pruef = roh(["git", "-C", str(self.pfad), "rev-parse", "--verify", "HEAD~1"],
                        capture_output=True, timeout=120)
            self.historie = pruef.returncode == 0
            if not self.historie:
                print("    HINWEIS: Arbeitskopie ohne Versionsgeschichte "
                      "(Klon fehlgeschlagen: %s) — Proben gegen alte Staende koennen "
                      "hier nicht messen."
                      % (geklont.stderr or b"").decode("utf-8", "replace").strip()[:80])
        else:
            self.pfad.mkdir(parents=True, exist_ok=True)
        aus = roh(["git", "-C", str(REPO), "ls-files", "-z"],
                  capture_output=True, timeout=180)
        dateien = [d for d in aus.stdout.decode("utf-8", "replace").split("\0") if d]
        for rel in dateien:
            quelle = REPO / rel
            if not quelle.is_file():
                continue
            ziel = self.pfad / rel
            ziel.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(quelle, ziel)
        self.anzahl = len(dateien)

        self.zusatz = 0
        for rel in self.ZUSATZ:
            wurzel = REPO / rel
            if not wurzel.is_dir():
                continue
            for quelle in wurzel.rglob("*"):
                if not quelle.is_file() or "__pycache__" in quelle.parts:
                    continue
                ziel = self.pfad / quelle.relative_to(REPO)
                if ziel.exists():
                    continue                      # getrackte Fassung hat Vorrang
                ziel.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(quelle, ziel)
                self.zusatz += 1

        if self.mit_git:
            # -c statt globaler Identitaet: die Kopie soll nichts an der Umgebung aendern.
            roh(["git", "-C", str(self.pfad), "add", "-A", "-f"],
                capture_output=True, timeout=900)
            roh(["git", "-C", str(self.pfad),
                 "-c", "user.name=Pruefstand", "-c", "user.email=pruefstand@local",
                 "commit", "-q", "-m", "Arbeitskopie"], capture_output=True, timeout=900)
        return self

    def text(self, rel: str) -> str:
        return (self.pfad / rel).read_text(encoding="utf-8")

    def mutieren(self, rel: str, suchen: str, ersetzen: str, anzahl: int = 1,
                 anker: str | None = None) -> int:
        """Gibt zurueck, an WIE VIELEN Stellen die Mutation gegriffen hat. 0 heisst:
        Probe kaputt, nicht Stufe stumpf.

        `anker` beschraenkt auf Zeilen, die diesen Text enthalten. Das ist die Lehre
        aus dem ersten Lauf (02.09.2026): zwei Proben meldeten STUMPF, weil ihr
        Suchtext im Repo MEHRFACH vorkommt und die erste Fundstelle woanders lag —
        einmal in einer Variante, die das Gate gar nicht liest ('minimal' statt
        'standard'), einmal in einem doppelt gequoteten String statt im Template
        (Zeile 1855 statt 2094). Beide Male lief der Mechanismus und sein Ergebnis
        kam nie an. Ein Treffer irgendwo ist kein Treffer dort, wo es zaehlt."""
        ziel = kordon.nur_kopie(self.pfad / rel)
        alt = ziel.read_text(encoding="utf-8")
        self._original.setdefault(rel, alt)

        if anker is None:
            treffer = alt.count(suchen)
            if not treffer:
                return 0
            neu = alt.replace(suchen, ersetzen, anzahl)
            getroffen = treffer if anzahl < 0 else min(anzahl, treffer)
        else:
            zeilen, getroffen = [], 0
            for z in alt.split("\n"):
                if anker in z and suchen in z and (anzahl < 0 or getroffen < anzahl):
                    n = z.count(suchen) if anzahl < 0 else 1
                    zeilen.append(z.replace(suchen, ersetzen, n))
                    getroffen += n
                else:
                    zeilen.append(z)
            if not getroffen:
                return 0
            neu = "\n".join(zeilen)

        ziel.write_text(neu, encoding="utf-8")
        return getroffen

    def anhaengen(self, rel: str, text: str) -> bool:
        ziel = kordon.nur_kopie(self.pfad / rel)
        alt = ziel.read_text(encoding="utf-8")
        self._original.setdefault(rel, alt)
        ziel.write_text(alt + text, encoding="utf-8")
        return True

    def zuruecksetzen(self) -> None:
        for rel, alt in self._original.items():
            (self.pfad / rel).write_text(alt, encoding="utf-8")
        self._original.clear()

    def raeumen(self) -> None:
        shutil.rmtree(self.pfad, ignore_errors=True)


# ---------------------------------------------------------------------------- Gates

@dataclass
class Lauf:
    gruen: bool
    ausgabe: str
    dauer_s: float


def _ausfuehren(kopie: Arbeitskopie, kommando, timeout: int) -> tuple[int, str, float]:
    roh = kordon._ORIG.get("run", subprocess.run)
    umgebung = dict(os.environ,
                    PYTHONIOENCODING="utf-8", PYTHONUTF8="1",
                    LC_ALL="C.UTF-8", LANG="C.UTF-8")
    t0 = time.time()
    aus = roh(kommando, cwd=str(kopie.pfad), capture_output=True,
              timeout=timeout, env=umgebung)
    text = (aus.stdout + aus.stderr).decode("utf-8", "replace")
    return aus.returncode, text, time.time() - t0


class Gate:
    """Ein Gate ist alles, was gruen oder rot werden kann — ein einzelnes
    Pruefskript oder eine benannte Stufe im grossen Linter."""

    def __init__(self, art: str, ziel: str, timeout: int = 900) -> None:
        self.art, self.ziel, self.timeout = art, ziel, timeout
        self.args: list = []

    @classmethod
    def skript(cls, pfad: str, timeout: int = 300, *args: str) -> "Gate":
        """Mit `args` laesst sich ein Skript in einem bestimmten Modus pruefen —
        insbesondere `--gegenprobe`. Damit gilt fuer Gegenproben dieselbe
        Beweispflicht wie fuer Stufen: eine Gegenprobe, die nie rot war, behauptet
        ihre Schaerfe nur. Zwei von zwei angesehenen waren am 02.09. defekt."""
        g = cls("skript", pfad, timeout)
        g.args = list(args)
        return g

    @classmethod
    def knoten(cls, pfad: str, timeout: int = 900) -> "Gate":
        return cls("knoten", pfad, timeout)

    @classmethod
    def linter(cls, stufe: str, timeout: int = 1800) -> "Gate":
        """stufe z. B. 'STUFE 36' — es reicht NICHT, dass der Linter rot wird:
        rot werden muss GENAU diese Stufe. Sonst beweist die Probe nur, dass
        irgendwo etwas kaputt ging."""
        return cls("linter", stufe, timeout)

    @property
    def name(self) -> str:
        if self.art == "linter":
            return self.ziel
        return Path(self.ziel).name + (" " + " ".join(self.args) if self.args else "")

    @property
    def schnell(self) -> bool:
        return self.art in ("skript", "knoten")

    def laufen(self, kopie: Arbeitskopie) -> Lauf:
        if self.art == "skript":
            rc, text, d = _ausfuehren(kopie, [sys.executable, self.ziel] + self.args,
                                      self.timeout)
            return Lauf(rc == 0, text[-2500:], d)
        if self.art == "knoten":
            rc, text, d = _ausfuehren(kopie, ["node", self.ziel], self.timeout)
            return Lauf(rc == 0, text[-2500:], d)
        rc, text, d = _ausfuehren(kopie, ["bash", "validate-all.sh"], self.timeout)
        return Lauf(self._stufe_gruen(text), self._abschnitt(text), d)

    def _abschnitt(self, ausgabe: str) -> str:
        teile = re.split(r"── (STUFE [0-9]+[a-z]?)[: ]", ausgabe)
        for i in range(1, len(teile) - 1, 2):
            if teile[i].strip() == self.ziel.strip():
                return (teile[i] + ":" + teile[i + 1])[:2500]
        return "Stufe '" + self.ziel + "' kam in der Ausgabe nicht vor"

    def _stufe_gruen(self, ausgabe: str) -> bool:
        abschnitt = self._abschnitt(ausgabe)
        if abschnitt.startswith("Stufe '"):
            return False          # Stufe nicht gelaufen ist nicht gruen, sondern grau
        return "❌" not in abschnitt


# --------------------------------------------------------------------------- Proben

@dataclass
class Probe:
    name: str
    warum: str          # welche Zusage hier bricht
    gate: Gate
    datei: str
    suchen: str
    ersetzen: str
    anzahl: int = 1
    anker: str | None = None      # nur Zeilen mit diesem Text mutieren
    erwartete_treffer: int = 0    # 0 = egal; sonst muss die Mutation genau so oft greifen
    # Wenn gesetzt: diese Probe KANN in der Arbeitskopie nicht laufen, und der Grund
    # steht hier. Sie wird als GRAU gemeldet — nie als gruen, nie als rot. Ein
    # unbeweisbarer Fall darf nicht wie ein bestandener aussehen, und er darf auch
    # nicht als Defekt gezaehlt werden, den es nicht gibt.
    nicht_beweisbar: str | None = None


@dataclass
class Befund:
    probe: Probe
    urteil: str         # BEISST | STUMPF | MUTATION-LEER | BASIS-ROT
    beleg: str = ""
    dauer_s: float = 0.0


def probe_laufen(kopie: Arbeitskopie, p: Probe) -> Befund:
    t0 = time.time()
    if p.nicht_beweisbar:
        return Befund(p, "GRAU", p.nicht_beweisbar, 0.0)
    vorher = p.gate.laufen(kopie)
    if not vorher.gruen:
        return Befund(p, "BASIS-ROT",
                      "Gate war schon vor der Mutation rot:\n" + vorher.ausgabe[-800:],
                      time.time() - t0)

    getroffen = kopie.mutieren(p.datei, p.suchen, p.ersetzen, p.anzahl, p.anker)
    if not getroffen:
        kopie.zuruecksetzen()
        return Befund(p, "MUTATION-LEER",
                      "Suchtext kam in " + p.datei
                      + (" (Anker " + repr(p.anker) + ")" if p.anker else "")
                      + " nicht vor: " + repr(p.suchen[:120]),
                      time.time() - t0)
    if p.erwartete_treffer and getroffen != p.erwartete_treffer:
        kopie.zuruecksetzen()
        return Befund(p, "MUTATION-LEER",
                      "Mutation griff " + str(getroffen) + "-mal, erwartet waren "
                      + str(p.erwartete_treffer) + " — die Probe zielt nicht mehr dorthin, "
                      "wo sie zielen soll", time.time() - t0)
    try:
        nachher = p.gate.laufen(kopie)
    finally:
        kopie.zuruecksetzen()

    if nachher.gruen:
        return Befund(p, "STUMPF",
                      "Gate blieb gruen, obwohl die Zusage gebrochen war:\n"
                      + nachher.ausgabe[-800:], time.time() - t0)

    danach = p.gate.laufen(kopie)
    if not danach.gruen:
        return Befund(p, "BASIS-ROT",
                      "Nach dem Zuruecksetzen blieb das Gate rot — die Probe hat Spuren "
                      "hinterlassen:\n" + danach.ausgabe[-800:], time.time() - t0)

    erste = next((z for z in nachher.ausgabe.splitlines() if "❌" in z or "FAIL" in z),
                 nachher.ausgabe.strip().splitlines()[-1] if nachher.ausgabe.strip() else "")
    return Befund(p, "BEISST", erste.strip()[:300], time.time() - t0)


def main(argv=None) -> int:
    ap = argparse.ArgumentParser(description="machsleicht-Pruefstand · Selbstpruefung")
    ap.add_argument("--probe", default=None, help="Namensfilter (Teilstring)")
    ap.add_argument("--voll", action="store_true",
                    help="auch Proben, die den ganzen Linter brauchen (Minuten je Probe)")
    ap.add_argument("--behalten", action="store_true", help="Arbeitskopie nicht loeschen")
    a = ap.parse_args(argv)

    kordon.scharf("dicht")
    print(kordon.zusammenfassung())

    import proben  # noqa: PLC0415 — erst nach dem Kordon laden
    liste = proben.ALLE
    if a.probe:
        liste = [p for p in liste if a.probe.lower() in p.name.lower()]
    langsam = [p for p in liste if not p.gate.schnell]
    if not a.voll:
        liste = [p for p in liste if p.gate.schnell]
    if not liste:
        print("Keine Probe passt zum Filter.")
        return 1

    kopie = Arbeitskopie().erstellen()
    print("Arbeitskopie: " + str(kopie.pfad) + " (" + str(kopie.anzahl)
          + " getrackte Dateien"
          + (" + " + str(kopie.zusatz) + " noch nicht committete aus "
             + ", ".join(Arbeitskopie.ZUSATZ) if kopie.zusatz else "")
          + ")")

    befunde = []
    try:
        for p in liste:
            b = probe_laufen(kopie, p)
            befunde.append(b)
            marke = {"BEISST": "BEISST ", "STUMPF": "STUMPF!", "GRAU": "grau   ",
                     "MUTATION-LEER": "LEER!  ", "BASIS-ROT": "BASIS! "}[b.urteil]
            print(marke + " " + p.name.ljust(34) + " " + p.gate.name.ljust(30)
                  + ("%5.1fs" % b.dauer_s))
            if b.urteil != "BEISST":
                for zeile in b.beleg.splitlines()[:8]:
                    print("           " + zeile)
            elif b.beleg:
                print("           faengt: " + b.beleg)
    finally:
        if not a.behalten:
            kopie.raeumen()

    beissen = [b for b in befunde if b.urteil == "BEISST"]
    print("\n" + "=" * 68)
    grau = [b for b in befunde if b.urteil == "GRAU"]
    print(str(len(beissen)) + "/" + str(len(befunde) - len(grau))
          + " laufbare Proben beissen nachweislich"
          + ((" · " + str(len(grau)) + " GRAU: nicht beweisbar, nie gruen")
             if grau else ""))
    for b in grau:
        print("  grau " + b.probe.name + ": " + b.beleg[:200])
    if langsam and not a.voll:
        print(str(len(langsam)) + " Probe(n) uebersprungen (brauchen --voll): "
              + ", ".join(p.name for p in langsam))
        print("  Uebersprungen ist GRAU, nicht gruen — diese Stufen sind heute unbewiesen.")
    schlecht = [b for b in befunde if b.urteil not in ("BEISST", "GRAU")]
    if schlecht:
        print("\nNicht bewiesen:")
        for b in schlecht:
            print("  · " + b.probe.name + " [" + b.urteil + "] — " + b.probe.warum)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
