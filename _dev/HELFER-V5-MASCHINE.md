# Helfer V5 — Qualität durch Maschine statt durch Wellen

**Gültig ab 12.08.2026 für machsleicht.** Ersetzt für dieses Repo die Wellen-Praxis von V4.1;
die V4.1-Grundsätze (Primärverifikation, unabhängiger Reviewer, „fertig" ist maschinell)
gelten unverändert weiter. Was sich ändert, ist **wo** Qualität entsteht.

## Warum

Baustelle brauchte 6 Gutachten und pendelte 38 → 64 → 74 → 58 → 62 → 58. Die Findings der
späten Runden waren fast alle **strukturell**: eine Regeneration löschte einen Hand-Patch,
ein Sync trug fremde Zahlen ein, eine getippte Zahl brach die nächste Variante. Feuerwehr
(92) und Hygiene (91) kamen durch — aber mit demselben Aufwand pro Motto. Bei 15 Mottos ist
das kein Qualitätssystem, sondern ein Hamsterrad. Die Regel daraus:

> **Ein Reviewer, der eine Fehlerklasse zum zweiten Mal findet, hat ein Maschinen-Ticket
> gefunden, kein Content-Ticket.**

## Die vier Regeln

**R1 — Klasse vor Fall.** Ein bestätigtes Finding wird erst als Klasse gefragt („Wie konnte
das entstehen?"), dann gefixt. Ist die Klasse mechanisierbar, wird sie mechanisiert, bevor
der Einzelfall zugeht. Beispiel 11.08.: Rechtsfooter fehlte auf drei Seiten → nicht drei
Seiten patchen, sondern Footer in den Generator + Linter-Stufe, die ihn überall verlangt
(fing sofort zwei weitere Seiten, die niemand auf dem Zettel hatte).

**R2 — Kein Review auf Handarbeit, die die Maschine gleich überschreibt.** Reviewt wird das
Produkt, das aus der Maschine fällt. Wer eine generierte Datei von Hand editiert, baut einen
Fehler, der beim nächsten Lauf zurückkommt. Deshalb gilt vor jedem Review: Maschine laufen
lassen, `git diff` muss leer sein (Idempotenz-Beweis).

**R3 — Wahrheit hat genau einen Ort.** Jedes Feld lebt in genau einer Datei; alles andere ist
Ableitung. Zwei Kataloge, ein Sync-Skript, „bitte beide pflegen" — das ist der Defekt selbst,
nicht seine Behandlung. Ein Sync-Skript ist ein Krückstock mit Verfallsdatum, nie ein Zustand.

**R4 — Gedrucktes leitet sich ab.** Zahlen kommen aus Datenlängen (`{n:feld}`), Varianten-
Scope aus Feldern (`abVariante`), Kanäle aus Feld-Zugehörigkeit. Getippt wird nur, was keine
Datenquelle hat — und das muss sich erklären (umgekehrte Beweispflicht, Bolle 11.08.).

## Der Ablauf je Artefakt

1. **Maschine bauen/anpassen** (nicht das Artefakt).
2. **Gates schärfen**: neue Fehlerklasse = neue Linter-Stufe, mit Gegenprobe („fängt die Regel
   einen echt eingebauten Fehler?"). 0 FAIL ist Pflicht.
3. **Idempotenz beweisen**: Maschine zweimal laufen lassen → leerer Diff.
4. **Rundlauf am Produkt**: Browser-Smoke der betroffenen Ausprägungen (Demo-Modus), nicht nur
   Code-Lesen. Bei Spielen: echter Playtest.
5. **EIN unabhängiger Review** (frischer claude.ai-Tab, stärkstes Modell auf Max, target-blind,
   niemals WebFetch/Subagent als Gate). Der Prompt beschreibt **das Produkt und den Maschinen-
   Vertrag** — keine Diff-Archäologie, kein Vor-Score.
6. **Findings gegen R1 sortieren**: Klasse → Maschine + Gate; Einzelfall → Daten. Jedes Finding
   selbst an der Quelle verifizieren (Reviewer irren in beide Richtungen).
7. **Deploy** nur bei 0 offenen MAJORs + Linter grün + Live-Verify (curl-Greps auf neue UND
   entfernte Strings).

## Was das für den Loop heißt

- Pro Artefakt **ein** Review. Ein zweiter ist ein Alarmsignal, kein Normalfall: Er bedeutet,
  dass Runde 1 Klassen gefunden hat, die noch nicht mechanisiert waren.
- Während ein Review läuft, wird an der **Maschine** weitergebaut — nie idle, nie am selben
  Artefakt (sonst reviewt der Gutachter einen Stand, den es nicht mehr gibt).
- Fortschritt wird in **fertigen Artefakten** berichtet, nicht in Scores. Score ist Telemetrie
  innerhalb einer Konversation, kein Ziel.
- Stopp-Kriterium vorab fixieren; vor autonomem Stopp eine PushNotification mit Einzeiler.

## Stand der Maschine (12.08.2026)

| Mechanik | Zustand | Gate |
|---|---|---|
| Gate-Felder nur aus `data/motto` | ✅ Generator lädt hart, fail-loud | Idempotenz-Diff |
| Rechtsfooter + preconnect im Generator | ✅ | Stufe 35 |
| Planer-Kanal (kein „Teil III" auf freien Seiten) | ✅ Übersetzer | Stufe 35 |
| Varianten-Scope `abVariante` (SOS) | ✅ Paket filtert, Planer kennzeichnet | Stufe 34 |
| Zahlen als `{n:feld}` aus Array-Längen | ✅ 4 Felder, 7 Pakete | Stufe 34 + 35 |
| Paket-Rundlauf aus EINEM Template | ✅ `paket-bauen.py` | Byte-Beweis |

**Offen:** Vereinigung des Planer-Spielkatalogs mit `data/motto` (freie Seiten haben noch
eigene Spiele) · Spiel-Referenzen statt Freitext-Namen in Satelliten (#110) · Countdown-/
Stationszahlen als abgeleitete Größen · pferde/ritter-Seiten auf die Maschine ziehen (jeweils
mit eigenem Gate, weil ihre Regeneration neuen Content sichtbar macht).
