Du bist unabhängiger Gutachter für einen REPARATUR-Diff (Baustellen-Kindergeburtstagspaket, Diff-Re-Check Runde 4). Das Vorgutachten (58/100) fand 9 MAJORs (3 fix-induziert, Muster: unbeachtete Nachbarzeilen derselben Karte); daraufhin wurde EIN Fix-Diff gebaut, der jetzt GANZE Karten kohärent zieht statt Fundzeilen. Deine Aufgabe: (a) jede Behauptung am HEUTIGEN After-State verifizieren, (b) den Fix-Diff adversarial auf NEUE Fehler lesen.

KONTEXT: Druckprodukt „Komplettpaket" — paket/baustelle/index.html rendert client-seitig (paket/core/paket-core.js) aus data/motto/baustelle-{klein,mittel,gross}.json (3 Gruppen × 3 Varianten). sosScenarios/preparationWeeks/signatureRitual sind TOP-LEVEL (drucken für alle Varianten). rolesList-Filter: Rollen ohne abVariante drucken immer, abVariante standard|wow filtert. faq/parentTips werden im PAKET nicht gedruckt, aber auf der freien Planerseite gerendert (kindergeburtstag/baustelle-*-jahre) — dort zählen sie. Schatzsuche generell abgeschaltet (nicht prüfen). Ein Vorgutachten-MAJOR (dayOf-Stationszahlen) wurde bereits VOR diesem Diff durch die neue Linter-Stufe 34 gefangen und in Commit 5f498533 gefixt — der Diff enthält ihn deshalb nicht; prüfe ihn trotzdem am After-State.

PRÜFOBJEKT (SHA {SHA}):
  Fix-Diff (Wellen seit recheck3): https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/_dev/review/2026-08-11-recheck4-fixes.patch
  After-State HEUTE:
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/data/motto/baustelle-klein.json
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/data/motto/baustelle-mittel.json
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/data/motto/baustelle-gross.json
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/paket/_maschine/template.html
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/paket/core/paket-core.js
  Neue Linter-Stufe (Kontext): https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/_dev/scripts/check-feldkonsistenz.py
  False-Positive-Liste: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/OFFENE-REVIEW-PUNKTE.md

WAS DER FIX-DIFF BEHAUPTET:
G1 (M1) mittel-safetyRule-Trümmer „Plastik-Nur große…" → „Nur große Plastik-Schrauben — Kleinteile-Check: …" (3×).
G2 (M2) Das 5-cm-Kriterium ist RESTLOS aus beiden Dateien: klein material („15-20 XL-Plastik-Schrauben (Kleinteile-Check: …)", zugleich 10-15/15-20-Angleich), klein+mittel prepText, klein FAQ UND klein parentTips (Planerseite!) sprechen einheitlich Kleinteile-Check; klein prepText verliert den „(klein/mittel)…(mittel/groß)"-Datei-Leak.
G3 (M3, via Stufe 34 vorab) dayOf sagt in allen 3 Dateien „Alle Stationen deiner Variante klar getrennt aufbauen (Anzahl im Ablaufplan)…"; introText ohne „4-6"-Spanne.
G4 (M4) Essens-Kaskade final: Eskalation NUR, wenn das kern-Spiel nach einem Stufe-1-Essen ohnehin nicht mehr passt (Reserve sonst wertlos), und dann gedeckelt auf ESSEN_MIN. Deklarierte Garantien (kein Monotonie-Anspruch): (a) Essen fällt nie ganz weg, sobald ≥10 Min möglich; (b) KEIN Fenster verliert gegenüber dem 5-Min-kürzeren Fenster Essen UND Spielzahl zugleich; (c) 80-Min klein/minimal druckt Kompakt-Kuchen + Finale (der Vorrunden-Fall). Voll-Sim 9 Ausprägungen × Fenster 45–300 behauptet 0 Verstöße.
G5 (M5) mittel „Bei 10 von 12 richtig" (3×), Countdown „Werkzeug-Quiz bereitlegen / Nichts zu malen: die 12 Karten …"; Linter-Stufe 34 prüft „von N richtig" jetzt maschinell.
G6 (M6) gross-Rollen-Arbeitsteilung: Maurerin „misst die Höhe und macht den Wackel-Test", Statikerin „Vergibt die Statik-Note (1-10) …".
G7 (M7) materialNote-Brücken-Satz beginnt „(Nur Wow-Variante) Brücken-Last-Test: …"; minus2Weeks nennt das Brücken-Bau-Set nur noch für Wow und erklärt die Einkaufsliste für maßgeblich.
G8 (M8) mittel regen.fallback variantenneutral („alle Stationen laufen drinnen — die Schrauben-Schatzsuche zieht in die Wohnung um").
G9 (M9) klein: Maler abVariante standard, Schubkarren-Helfer wow, Kran-Fahrer standard, spielfreier „Bauplan-Hüter" → „Eimer-Chef — Verteilt Eimer und Grab-Werkzeug am Sand"; mittel: Architektin abVariante standard + „Betreut die Architekt-Station (Bauplan + Bau)", Bagger-Fahrer „Leitet die Schrauben-Schatzsuche".
G10 (MINORs) Sand-Karte kohärent („euer Werkzeug macht Berge", „zwischendurch wird getauscht"); gross-Quiz „5 Kategorien mit zusammen 25 Karten" + Bau-Berufe „5 Karten" (real 6/5/5/5/4=25); „deiner Variante" statt „deiner Fassung" (5 Stellen); Danke-Blatt ohne „musst du nicht drucken"-Paradox; Cache-Bust v=20260815 in allen 6 Indizes.

PRÜFWINKEL:
R1 — Jede G-Behauptung am After-State wörtlich belegen (Datei + Zitat + Variante). Bei G4: buildTimeline() nachrechnen — klein/minimal 80 Min (Kompakt + Finale?), mittel/standard 100 und 105 Min (105 darf kompaktes Essen + MEHR Spiele drucken — der Trade Programm > Essenslänge oberhalb des Minimums ist deklariert), gross/standard 90 Min. Adversarial: Konstruiere ein Fenster, in dem die neue kernPasstNoch-Bedingung falsch entscheidet (kern passt rechnerisch, wird aber trotzdem geopfert — oder umgekehrt).
R2 — NEUE Fehler im Fix-Diff: Nachbarzeilen der angefassten Karten (klein-Rollen: existieren „Eimer" wirklich in allen klein-Varianten? mittel Architekt-Station heißt real „Architekt-Aufgabe: Bauplan + Bau"?), Sprachfehler, Wort-Trümmer (die Lektion!), JSON-Nachbarn, Preise 15/18/25/35 € exakt.
R3 — Restlöcher-Stichprobe: verbleibt irgendwo „5 cm", ein variantenexklusiver Spielname in top-level-Texten, ein Zahlen-Widerspruch (Quiz 25/12, Verdächtige 4/3, Stationen), ein „Fassung"-Registerbruch?
NICHT PRÜFEN: kostenKontext-Skalierung (M6-Kernticket) · estimatedCostEur wow (Ticket) · „Wow"-fail-open (Linter-Ticket) · XL/XXL zählen in Σ (Entscheidung) · ritter-G()-Wortschicht (dokumentiert) · _bundle.js · schatzsuche.json · FP-Liste #13-15 · klein/wow Bagger-Set ohne Stückzahl (Einkaufs-Label-Klasse, M6-Ticket).

PFLICHTEN: Je Finding wörtliches Zitat + Datei + MAJOR/MINOR/UNSICHER; MAJOR nur wenn gedruckt beim Kunden (Paket ODER Planerseite). Score 0-100. Abschluss: „REVIEW ABGESCHLOSSEN".
