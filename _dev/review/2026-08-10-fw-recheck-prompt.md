Du bist unabhängiger Gutachter für einen REPARATUR-Diff (Feuerwehr-Kindergeburtstagspaket, Folgerunde). Das Vorgutachten (54/100, 51 Befunde) und ein Zwischen-Gutachten zu Welle 1 (62/100) liegen hinter uns; danach wurden die Wellen 1b, 2a, 2b und 2c gebaut, aber NIE unabhängig geprüft. Das ist deine Aufgabe. Prüfe: (a) schließen die Wellen ihre Befunde wirklich, (b) haben sie NEUE Fehler eingebaut. WICHTIG: Der Diff ist vom 04.08.; seither liefen weitere Wellen über dieselben Dateien (Hygiene-Kern). Verifiziere jede Behauptung am HEUTIGEN Stand (After-State-URLs unten), der Diff zeigt dir nur, WAS behauptet wird.

KONTEXT: Druckprodukt „Komplettpaket" — paket/feuerwehr/index.html rendert client-seitig aus data/motto/feuerwehr-{klein,mittel,gross}.json (3 Altersgruppen × 3 Varianten = 9 Ausprägungen). Die JSONs werden AUCH vom kostenlosen Planer live gerendert.

PRÜFOBJEKT (SHA {SHA}):
  Fix-Diff (Wellen 1b-2c, 04.08.): https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/_dev/review/2026-08-10-fw-recheck-1b2c.patch
  After-State HEUTE:
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/data/motto/feuerwehr-klein.json
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/data/motto/feuerwehr-mittel.json
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/data/motto/feuerwehr-gross.json
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/paket/feuerwehr/index.html
  False-Positive-Liste: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/OFFENE-REVIEW-PUNKTE.md

WAS DIE WELLEN BEHAUPTEN:
1. (1b) S1 wirklich geschlossen: Schaum-Löschen bei 3-5 kauft/nutzt durchgängig Sahne/Kinderschaum statt Rasierschaum — in material UND prepText UND Einkaufsliste (das Vorgutachten fand den Widerspruch nur VERSCHOBEN). Bei 6-8 (mittel) bleibt Rasierschaum bewusst erlaubt.
2. (1b) Spüldauer bei Schaum-im-Auge ≥10 Minuten (vorher zu kurz).
3. (1b) sosScenarios[].fallback wird jetzt GERENDERT (.sosfb im Kern-CSS) — die Eskalationszeile („Augenarzt", „Eltern entscheiden") war vorher unsichtbar.
4. (2a) V2: Atemschutz-Parcours-Anleitung existiert jetzt; gross hat eine echte Variantenleiter (3/4/5 Stationen statt 3× dieselbe 4er-Rotation; Augenbinden werden benutzt).
5. (2b) V1: Theorie-Briefing geschrieben (war load-bearing: Brandermittlung referenziert es); Fettbrand-Pointe verbindet Briefing und Finale. V4: doppelt gedruckte Brandermittlung dedupliziert.
6. (2c) V5: Escape-Room wow hat jetzt wirklich 6 Verdächtige / 6 Phasen.

PRÜFWINKEL:
V1 — RENDER-VERIFIKATION: Simuliere am heutigen paket/feuerwehr/index.html (Code lesen), ob .sosfb wirklich rendert und ob die Fallback-Zeile in allen 3 Altersgruppen erscheinen KANN.
V2 — S1 DREIFACH-CHECK am heutigen klein-JSON: material, prepText, shoppingList — steht irgendwo noch Rasierschaum für 3-5? Und: Hat die Hygiene-Welle (allergieTausch etc.) hier etwas zerschossen?
V3 — VARIANTENLEITER gross: zähle die Stationen je Variante am heutigen JSON. 3/4/5? Werden die Augenbinden im 5er benutzt?
V4 — THEORIE-BRIEFING: existiert als spielbare Anleitung (Schritte, Dauer, Material)? Referenziert die Brandermittlung es noch? Fettbrand fachlich korrekt (NIE Wasser — recherchiere kurz)?
V5 — ESCAPE-ROOM wow: 6 Verdächtige benannt + 6 Phasen mit Anleitung?
V6 — NEUE FEHLER: Lies die Diff-Hunks adversarial — Sprachfehler, Widersprüche zu Nachbarfeldern, kaputte Referenzen.
NICHT PRÜFEN (bekannt offen, spätere Wellen): V3-Einsatz-Alarm, Z1-Scheduler-Reserve, mittel==klein-Struktur, Zahlen M1-M4/K1-K3, Stationen D1/D2/F4, Gold-Kontrast.

PFLICHTEN: Je Finding wörtliches Zitat + Datei + MAJOR/MINOR/UNSICHER; MAJOR nur wenn gedruckt/live beim Kunden. Score 0-100 für die Wellen 1b-2c. Abschluss: „REVIEW ABGESCHLOSSEN".
