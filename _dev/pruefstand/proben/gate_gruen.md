# Probe: so sieht eine erledigte Befund-Datei aus

Diese Datei ist kein echter Befund, sondern der **Gruen-Beleg** fuer `befund_gate.py`.
Sie muss durchlaufen. Wird sie rot, ist das Gate zu streng geworden — und ein Gate, das
korrekte Beleglage bestraft, erzieht zu weniger Beleg.

## 1. hand-edit-an-generiertem — kindergeburtstag/baustelle-3-5-jahre.html:1 (h1)
**Schwere:** MAJOR
**Zitat:** "Baustelle-Kindergeburtstag — 3–5 Jahre"
**Befund:** Die Ueberschrift war von Hand geaendert und wich vom Maschinen-Ergebnis ab.
**Ablauf:** `python _dev/scripts/check-maschinen-stand.py` → `FAIL ... weicht vom Maschinen-Ergebnis ab`
**Fix:** Seite neu bauen statt editieren.
**Status:** BEHOBEN
**Stufe:** 36

## 2. sonstiges — data/motto/baustelle-klein.json:1 (games)
**Schwere:** MAJOR
**Zitat:** "Sand-Bagger-Spiel"
**Befund:** Beispiel fuer einen begruendet widerlegten Befund.
**Ablauf:** `python _dev/scripts/check-interne-notizen.py` → `0 Fundstellen`
**Fix:** keiner noetig.
**Status:** WIDERLEGT
**Begruendung:** Der gemeldete Wortlaut steht nicht im Produkt, sondern im Kommentar des
Pruefskripts — der Pruefer hat die Fundstelle verwechselt.

## 3. unspielbar — kindergeburtstag/ritter.html:1 (Ablauf)
**Schwere:** MAJOR
**Zitat:** "Danach kommt die Schatzsuche"
**Befund:** Beispiel fuer einen Einzelfall ohne Regel — erstmalig, also zulaessig.
**Ablauf:** `bash validate-all.sh` → `0 FAIL` (die Klasse ist nicht mechanisierbar)
**Fix:** Satz umformuliert.
**Status:** BEHOBEN
**Einzelfall:** ja
**Klasse:** dramaturgie-formulierung

## Winkel ohne Befund

Winkel 4 (Adress-Gating) geprueft: 340 Dokumente aus 15 Party-Formen gerendert, keine
Adresse in einer Ansicht ohne Zusage. Unsicher bin ich bei prozent-kodierten Formen in
`mailto:`-Links — dort habe ich nur zwei Beispiele gesehen, nicht alle.
