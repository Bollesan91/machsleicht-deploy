# Probe: so sieht eine unerledigte Befund-Datei aus

Diese Datei ist kein echter Befund, sondern der **Rot-Beleg** fuer `befund_gate.py`.
Jeder Abschnitt hier bricht genau eine Regel des Gates. Wird diese Datei gruen, ist das
Gate stumpf — dann ist die Erledigungspflicht nur noch eine Bitte.

## 1. sonstiges — irgendwo.py:1 (nichts)
**Schwere:** MAJOR
**Zitat:** "egal"
**Befund:** MAJOR ganz ohne Ausgang — weder Stufe noch WIDERLEGT noch Einzelfall.
**Ablauf:** `echo` → nichts
**Fix:** keiner
**Status:** BEHOBEN

## 2. sonstiges — irgendwo.py:2 (nichts)
**Schwere:** MAJOR
**Befund:** Ohne Zitat und ohne Ablauf — eine Behauptung, kein Befund.
**Fix:** keiner
**Status:** BEHOBEN
**Stufe:** 36

## 3. sonstiges — irgendwo.py:3 (nichts)
**Schwere:** MAJOR
**Zitat:** "egal"
**Befund:** Verweist auf eine Stufe, die es nicht gibt.
**Ablauf:** `echo` → nichts
**Fix:** keiner
**Status:** BEHOBEN
**Stufe:** 999

## 4. sonstiges — irgendwo.py:4 (nichts)
**Schwere:** MAJOR
**Zitat:** "egal"
**Befund:** WIDERLEGT ohne Begruendung — so kommt er als Neufund zurueck.
**Ablauf:** `echo` → nichts
**Fix:** keiner
**Status:** WIDERLEGT

## 5. dramaturgie-formulierung — irgendwo.html:5 (Ablauf)
**Schwere:** MAJOR
**Zitat:** "egal"
**Befund:** Erster Einzelfall dieser Klasse in dieser Datei — noch zulaessig.
**Ablauf:** `echo` → nichts
**Fix:** keiner
**Status:** BEHOBEN
**Einzelfall:** ja
**Klasse:** wiederholte-klasse

## 6. dramaturgie-formulierung — irgendwo.html:6 (Ablauf)
**Schwere:** MAJOR
**Zitat:** "egal"
**Befund:** ZWEITER Einzelfall derselben Klasse — ab hier ist es ein Maschinen-Ticket.
**Ablauf:** `echo` → nichts
**Fix:** keiner
**Status:** BEHOBEN
**Einzelfall:** ja
**Klasse:** wiederholte-klasse

## 7. sonstiges — irgendwo.py:7 (nichts)
**Schwere:** MAJOR
**Zitat:** "egal"
**Befund:** Verweist auf Stufe 5 — die gibt es zwar, aber sie ist in proben.py nicht als
beissend nachgewiesen. Eine Stufe, die nie rot war, ist kein Gate.
**Ablauf:** `python _dev/pruefstand/befund_gate.py --selbsttest` → muss diesen Abschnitt faengen
**Fix:** keiner
**Status:** BEHOBEN
**Stufe:** 5
