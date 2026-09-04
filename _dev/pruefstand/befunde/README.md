# Befunde

Protokoll der Gegenpruefungen. **Diese Dateien sind das Ergebnis, nicht die
Zusammenfassung im Chat.** Wer referiert, kann weichspuelen — die Datei kann er nicht.

Eine Datei je Runde: `JJJJ-MM-TT-<pruefling>.md`.

## Aufbau eines Befunds

Der Gegenpruefer schreibt Titel, Schwere, Zitat, Befund, Ablauf, Fix. **Status und
Ausgang kommen erst bei der Triage dazu** — die macht nicht der Pruefer, sondern der,
der den Befund gegen die Primaerquelle nachprueft. Gegenpruefer irren in beide
Richtungen; beim ersten Lauf des Mutationsnachweises am 02.09.2026 waren zwei von sechs
Meldungen Fehlalarme der Pruefapparatur selbst.

```markdown
## 1. versprechen-ohne-deckung — kindergeburtstag/ritter.html:212 (Ablauf-Kasten)
**Schwere:** MAJOR
**Zitat:** "Danach kommt die Schatzsuche mit acht Stationen"
**Befund:** <was bricht, konkret>
**Ablauf:** <Kommando + echte Ausgabe>
**Fix:** <was zu tun ist>
**Status:** OFFEN
**Stufe:** 62
```

## Die Regel — drei Ausgaenge, einer davon mit Sperre

`befund_gate.py` erzwingt: jeder **MAJOR** endet in genau einem von drei Zustaenden.

| Ausgang | Bedeutung | Pflichtfelder |
|---|---|---|
| `Stufe:` | in die Maschine gegossen | Stufennummer aus `validate-all.sh` oder Pfad eines Pruefskripts — **und** in `proben.py` als beissend nachgewiesen |
| `WIDERLEGT` | kein Befund, dokumentiert | `Begruendung:` |
| `Einzelfall:` | gefixt ohne Regel | `Klasse:` — und die Klasse darf **genau einmal** so ausgehen |

Die Sperre auf dem dritten Ausgang ist Bolles V5-Satz als Code:

> Ein Reviewer, der eine Fehlerklasse zum **zweiten** Mal findet, hat ein
> Maschinen-Ticket gefunden, kein Content-Ticket.

Taucht dieselbe `Klasse:` ein zweites Mal als Einzelfall auf — egal in welcher
Befund-Datei — wird das Gate rot und verlangt eine Stufe. Ohne diese Sperre waere
`Einzelfall` das Schlupfloch, durch das jede Mechanisierung auf ewig verschoben wird.

Ein MAJOR ohne gueltigen Ausgang haelt das Gate rot. Ein Verweis auf eine Stufe, die es
nicht gibt oder die in `proben.py` nicht als beissend nachgewiesen ist, ebenfalls — das
waere der bequemste Weg, einen Befund loszuwerden.

Fuer Lob gibt es kein Feld. Wer nichts findet, schreibt Winkel fuer Winkel auf, was er
geprueft hat und wo er unsicher ist. Daraus wird kein Fall — aber auch kein Gruen.

```bash
python _dev/pruefstand/befund_gate.py
```
