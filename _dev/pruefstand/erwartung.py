# -*- coding: utf-8 -*-
"""machsleicht-Pruefstand · Erwartungen — jede Behauptung mit Beleg.

Uebernommen aus dem ASKER-Pruefstand (Session sandbox-7e, 02.09.2026) und fuer
machsleicht gekuerzt. Die Idee bleibt: ein Fall besteht nicht aus einem Haekchen,
sondern aus einzeln benannten Pruefpunkten. "Fall rot" sagt nichts, "Stufe 36 hat
die Hand-Aenderung nicht gesehen, Ausgabe war {...}" sagt alles.

Zwei Ehrlichkeitsregeln sind hier verdrahtet:
  · Uebersprungen ist GRAU, nie gruen.
  · Ein Fall ohne Pruefpunkte gilt ebenfalls nicht als gruen.
"""
from __future__ import annotations

import traceback
from dataclasses import dataclass, field


@dataclass
class Punkt:
    text: str
    ok: bool
    beleg: str = ""
    schwere: str = "MAJOR"          # MAJOR = haelt nicht, was zugesagt ist; MINOR = Randfall


class Uebersprungen(Exception):
    """Der Fall konnte nicht laufen. NIE als gruen zaehlen — ein uebersprungener Fall
    ist ein ungeprueefter Fall."""


@dataclass
class Ergebnis:
    name: str
    warum: str
    punkte: list[Punkt] = field(default_factory=list)
    absturz: str | None = None
    uebersprungen: str | None = None
    dauer_s: float = 0.0

    @property
    def gruen(self) -> bool:
        return (self.absturz is None and self.uebersprungen is None
                and bool(self.punkte) and all(p.ok for p in self.punkte))

    def rote(self) -> list[Punkt]:
        return [p for p in self.punkte if not p.ok]


class Pruefer:
    """Sammelt Pruefpunkte eines Falls. Wirft nie — ein roter Punkt beendet den Fall
    nicht, sonst sieht man immer nur den ersten Fehler und nie das Bild."""

    def __init__(self, ergebnis: Ergebnis) -> None:
        self._e = ergebnis

    def ist(self, bedingung: object, text: str, beleg: object = "",
            schwere: str = "MAJOR") -> bool:
        ok = bool(bedingung)
        self._e.punkte.append(Punkt(text, ok, str(beleg)[:500], schwere))
        return ok

    def nicht(self, bedingung: object, text: str, beleg: object = "",
              schwere: str = "MAJOR") -> bool:
        return self.ist(not bedingung, text, beleg, schwere)

    def enthaelt(self, heuhaufen: object, nadel: str, text: str,
                 schwere: str = "MAJOR") -> bool:
        h = str(heuhaufen)
        return self.ist(nadel.lower() in h.lower(), text, f"...{h[-400:]}...", schwere)

    def fehlt(self, heuhaufen: object, nadel: str, text: str,
              schwere: str = "MAJOR") -> bool:
        h = str(heuhaufen)
        return self.ist(nadel.lower() not in h.lower(), text, f"...{h[-400:]}...", schwere)

    def ueberspringen(self, grund: str) -> None:
        """Voraussetzung fehlt (kein node, keine Arbeitskopie). Ehrlich grau, nie gruen."""
        raise Uebersprungen(grund)


# ------------------------------------------------------------------ Fall-Verzeichnis

_FAELLE: list[tuple[str, str, str, object]] = []


def fall(name: str, warum: str, gruppe: str = "allgemein"):
    """Registriert eine Pruef-Funktion. `warum` ist Pflicht — ein Fall ohne benannten
    Zweck wird beim ersten roten Lauf geloescht statt verstanden."""
    def deko(fn):
        _FAELLE.append((name, warum, gruppe, fn))
        return fn
    return deko


def alle(gruppe: str | None = None, muster: str | None = None) -> list:
    aus = _FAELLE
    if gruppe:
        aus = [f for f in aus if f[2] == gruppe]
    if muster:
        aus = [f for f in aus if muster.lower() in f[0].lower()]
    return aus


def gruppen() -> list[str]:
    return sorted({f[2] for f in _FAELLE})


def laufen_lassen(eintrag) -> Ergebnis:
    import time
    name, warum, _gruppe, fn = eintrag
    erg = Ergebnis(name=name, warum=warum)
    p = Pruefer(erg)
    t0 = time.time()
    try:
        fn(p)
    except Uebersprungen as u:
        erg.uebersprungen = str(u)
    except Exception:  # noqa: BLE001 — ein Absturz ist selbst der Befund
        erg.absturz = traceback.format_exc(limit=6)
    erg.dauer_s = time.time() - t0
    return erg
