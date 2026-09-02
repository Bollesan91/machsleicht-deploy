# -*- coding: utf-8 -*-
"""machsleicht-Pruefstand · Faelle der Gruppe 'maschine'.

Der Pruefstand baut die Gates NICHT nach — die gibt es schon (validate-all.sh mit
63 Stufen, 50 Pruefskripte, der Render-Smoke). Er fuehrt sie zusammen und beantwortet
die eine Frage, die ein einzelnes Gate nicht beantworten kann:

    Ist der Stand, den diese Bau-Session abliefert, maschinell abgenommen —
    und sind die Gates, die das behaupten, ueberhaupt scharf?

Deshalb drei Fallgruppen:
  maschine   — laeuft der Linter durch, ist die Maschine idempotent?
  nachweis   — beissen die Stufen (Mutationsnachweis), sind alle Befunde erledigt?
  stand      — was der naechste Leser wissen muss, bevor er einer Zahl glaubt.
"""
from __future__ import annotations

import os
import re
import subprocess
import sys
from pathlib import Path

_HIER = Path(__file__).resolve().parent
if str(_HIER) not in sys.path:
    sys.path.insert(0, str(_HIER))

import kordon  # noqa: E402
from erwartung import Pruefer, fall  # noqa: E402

REPO = kordon.REPO


def _lauf(kommando, timeout=2400):
    """Unterprozess mit erzwungener UTF-8-Umgebung. Ohne LC_ALL bricht in
    validate-all.sh jedes `grep -P` mit einem Fehler ab, den das Skript selbst als
    'kein Treffer' liest — das Gate meldete dann gruen, ohne geprueft zu haben
    (26.07.2026). Der Linter faengt das inzwischen selbst ab; wir setzen die
    Umgebung trotzdem, damit der Pruefstand nicht der Grund fuer einen Abbruch ist."""
    roh = kordon._ORIG.get("run", subprocess.run)
    umgebung = dict(os.environ, PYTHONIOENCODING="utf-8", PYTHONUTF8="1",
                    LC_ALL="C.UTF-8", LANG="C.UTF-8")
    aus = roh(kommando, cwd=str(REPO), capture_output=True, timeout=timeout, env=umgebung)
    return aus.returncode, (aus.stdout + aus.stderr).decode("utf-8", "replace")


# ------------------------------------------------------------------ Gruppe maschine

@fall("linter-gruen",
      "0 FAIL ist die Eintrittskarte. Was der Linter faengt, ist kein Reviewer-Thema — "
      "und ein Befund, der schon deterministisch faellt, kostet einen Gegenpruefer-Lauf umsonst.",
      "maschine")
def f_linter(p: Pruefer) -> None:
    rc, aus = _lauf(["bash", "validate-all.sh"])
    fehler = re.search(r"FAILED: (\d+) Fehler, (\d+) Warnungen", aus)
    warnungen = re.search(r"PASSED MIT WARNUNGEN: (\d+)", aus)
    stufen = len(re.findall(r"── STUFE ", aus))
    p.ist(rc == 0, "validate-all.sh endet mit 0",
          ("Exit " + str(rc) + " · " + (fehler.group(0) if fehler else aus[-300:])))
    p.ist(stufen >= 60, "alle Stufen sind gelaufen (>= 60 Abschnitte)",
          str(stufen) + " Stufen-Abschnitte in der Ausgabe")
    p.nicht(fehler, "kein FAILED in der Ausgabe", fehler.group(0) if fehler else "keins")
    # Warnungen sind kein Fehlschlag, aber sie muessen SICHTBAR sein: eine Warnung,
    # die niemand liest, ist ein Fehler mit Aufschub.
    p.ist(True, "Warnungen: " + (warnungen.group(1) if warnungen else "0"),
          "informativ, kein Gate", schwere="MINOR")


@fall("maschine-idempotent",
      "Helfer V5, R2: reviewt wird nur, was aus der Maschine faellt. Ein Hand-Edit an einer "
      "generierten Seite verschwindet beim naechsten Lauf — und der Gutachter hat umsonst gelesen.",
      "maschine")
def f_idempotenz(p: Pruefer) -> None:
    rc, aus = _lauf([sys.executable, "_dev/scripts/check-maschinen-stand.py"], timeout=900)
    p.ist(rc == 0, "Stufe 36: jede generierte Datei ist das, was die Maschine heute erzeugt",
          aus[-400:])


# ------------------------------------------------------------------ Gruppe nachweis

@fall("stufen-beissen",
      "Eine Stufe, die nie rot war, ist eine Behauptung. Ohne diesen Fall misst '0 FAIL' "
      "nur, dass niemand hingesehen hat.",
      "nachweis")
def f_mutation(p: Pruefer) -> None:
    rc, aus = _lauf([sys.executable, "_dev/pruefstand/selbstpruefung.py"], timeout=2400)
    treffer = re.search(r"(\d+)/(\d+) Proben beissen", aus)
    if not treffer:
        p.ist(False, "Selbstpruefung hat eine Bilanz gemeldet", aus[-400:])
        return
    beissen, gesamt = int(treffer.group(1)), int(treffer.group(2))
    p.ist(rc == 0 and beissen == gesamt,
          "alle gelaufenen Proben beissen (" + treffer.group(0) + ")", aus[-500:])
    p.ist(gesamt >= 6, "genug Proben, um die Aussage zu tragen",
          str(gesamt) + " Proben", schwere="MINOR")


@fall("befunde-erledigt",
      "Jeder MAJOR eines Gegenpruefers endet als Stufe, als begruendetes WIDERLEGT oder als "
      "erstmaliger Einzelfall. Sonst ist Review-Ergebnis nur Prosa, die niemand mehr prueft.",
      "nachweis")
def f_befunde(p: Pruefer) -> None:
    rc, aus = _lauf([sys.executable, "_dev/pruefstand/befund_gate.py"], timeout=300)
    p.ist(rc == 0, "Befund-Gate gruen", aus[-500:])
    # Und das Gate selbst muss beissen — sonst ist "keine offenen Befunde" nur die
    # Aussage, dass niemand hingesehen hat.
    rc2, aus2 = _lauf([sys.executable, "_dev/pruefstand/befund_gate.py", "--selbsttest"],
                      timeout=300)
    p.ist(rc2 == 0, "Befund-Gate beisst (gate_rot.md 7/7, gate_gruen.md gruen)", aus2[-400:])


# --------------------------------------------------------------------- Gruppe stand

@fall("arbeitsstand-benannt",
      "Ein Befund ohne Stand ist nicht reproduzierbar. Wer die Tabelle spaeter liest, muss "
      "wissen, WELCHER Stand da gemessen wurde.",
      "stand")
def f_stand(p: Pruefer) -> None:
    roh = kordon._ORIG.get("run", subprocess.run)
    sha = roh(["git", "-C", str(REPO), "rev-parse", "--short", "HEAD"],
              capture_output=True, text=True, timeout=60).stdout.strip()
    zweig = roh(["git", "-C", str(REPO), "rev-parse", "--abbrev-ref", "HEAD"],
                capture_output=True, text=True, timeout=60).stdout.strip()
    schmutzig = roh(["git", "-C", str(REPO), "status", "--porcelain"],
                    capture_output=True, text=True, timeout=120).stdout.strip()
    p.ist(sha, "Stand ist benannt: " + zweig + " @ " + sha, sha)
    p.ist(zweig != "main", "nicht auf dem Deploy-Branch", zweig)
    # Unversionierte Aenderungen sind erlaubt (hier wird gebaut), aber sie muessen
    # in der Tabelle stehen — sonst misst der naechste Leser einen anderen Stand.
    p.ist(True, "unversionierte Aenderungen: "
          + str(len(schmutzig.splitlines())) + " Datei(en)",
          schmutzig[:400] or "keine", schwere="MINOR")
