Du bist unabhängiger Gutachter für einen REPARATUR-Diff (Baustellen-Kindergeburtstagspaket, Diff-Re-Check Runde 3). Das Vorgutachten (74/100) fand 6 MAJORs (1 fix-induziert) und ein MINOR-Bündel; daraufhin wurde EIN Fix-Diff gebaut, der behauptet, alle 6 MAJORs und die gedruckten MINORs zu schließen. Deine Aufgabe: (a) jede Behauptung am HEUTIGEN After-State verifizieren, (b) den Fix-Diff adversarial auf NEUE Fehler lesen — fix-induzierte Folgefehler durch unbeachtete NACHBARZEILEN derselben Karte waren die häufigste Fehlerquelle dieser Kette.

KONTEXT: Druckprodukt „Komplettpaket" — paket/baustelle/index.html rendert client-seitig (paket/core/paket-core.js) aus data/motto/baustelle-{klein,mittel,gross}.json (3 Gruppen × 3 Varianten minimal/standard/wow). sosScenarios/preparationWeeks/signatureRitual sind TOP-LEVEL (drucken für alle 3 Varianten — dürfen keine variantenexklusiven Spiele nennen). faq/parentTips/ageInsight/printables werden NICHT gedruckt. Schatzsuche generell abgeschaltet (nicht prüfen).

PRÜFOBJEKT (SHA {SHA}):
  Fix-Diff (Welle 3): https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/_dev/review/2026-08-11-recheck3-fixes.patch
  After-State HEUTE:
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/data/motto/baustelle-klein.json
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/data/motto/baustelle-mittel.json
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/data/motto/baustelle-gross.json
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/paket/_maschine/template.html
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/paket/core/paket-core.js
  False-Positive-Liste: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/OFFENE-REVIEW-PUNKTE.md

WAS DER FIX-DIFF BEHAUPTET:
F1 (Vorrunde MAJOR 1) klein Sand-Karte widersprach sich selbst → material, steps und prepText sprechen jetzt einheitlich von „je Kind 1 Grab-Werkzeug — Bagger oder Schaufel, nach jeder Runde wird getauscht" (3 Varianten); Klammer nennt „Bagger + Sand-Werkzeug aus der Einkaufsliste" (deckt minimal ‚Schaufeln' UND standard/wow ‚Sand-Spielzeug').
F2 (MAJOR 2) 300 g lebte in gross games[5].prepText und signatureRitual.introText weiter → prepText-Gewichts-Set jetzt 50g/100g/200g; der introText-Brücken-Satz ist ERSATZLOS GESTRICHEN (Brücke ist wow-only, introText druckt für alle). Das Kuchenrezept behält seine 300 g Zucker — das ist kein Sandsäckchen.
F3 (MAJOR 3) Statikerin-Rollenkarte (Minimal-4-Karte ohne abVariante) trug wow-only „Brücken-Last-Test" → Funktion jetzt „Statik-Wertung beim Bauklotz-Wettbewerb + Werkzeug-Quiz" (Bauklotz-Wettbewerb existiert in allen 3 gross-Varianten).
F4 (MAJOR 4) Quiz-Kaufposten ohne Alternative-Marker → gross/minimal „Werkzeug-Quiz-Kaufset Klasse 2 (Alternative zu den 25 gedruckten)", mittel/wow „Werkzeug-Quiz-Kaufset Großversion (Alternative zu den 12 gedruckten) + Bauplan-Karten XL"; Preise 15/18 € exakt unangetastet.
F5 (MAJOR 5) Schrauben-safetyRule „mind. 5 cm, Klopapierrollen-Test" (5-cm-Schraube fällt längs durch) → „Nur große Plastik-Schrauben — Kleinteile-Check: nichts verwenden, was komplett durch eine Klopapierrolle passt." (3× klein, 3× mittel; Aufsichts-/Metall-Sätze unverändert dahinter).
F6 (MAJOR 6) harte Stationszahlen in top-level-Feldern → regen „Zimmer-Ecken … (Anzahl wie im Ablaufplan)" (3 Dateien), minus2Days „Alle Stationen deiner Fassung vorbereiten — die Anzahl steht im Ablaufplan." (klein+mittel) bzw. gross-title „Stationen vorbereiten" + detail „… die Anzahl steht im Ablaufplan."
F7 (MINOR-Bündel) Essens-Kaskade eskaliert jetzt bereits unter ESSEN_MIN statt unter 10 (das 100→105-Min-Paradox „35 Min voll → 10 Min kompakt" ist weg; Monotonie-Behauptung!) · Z1-Kommentar an die Kaskaden-Realität angepasst · Danke-Blatt sagt gedruckt, dass die WhatsApp-Vorlage in der Bildschirm-Ansicht wohnt (kündigt nichts Fehlendes mehr an) · mittel-faq „12 Karten + ca. 20 Minuten" · schrauben_verloren-Schritt referenziert „die Ersatz-Schrauben aus Schritt 1" · materialNote nennt das Kombinations-Finale (100+200 g) · Cache-Bust v=20260814 in allen 6 Indizes.

PRÜFWINKEL:
R1 — Jede F-Behauptung am After-State wörtlich belegen (Datei + Zitat + Variante). Bei F7-Kaskade: buildTimeline() nachrechnen — mittel/standard bei 100 und 105 Min (druckt das längere Fenster jetzt ≥ Kuchen?), gross/standard 90 Min (Essenszeile da?), und adversarial: kann die frühere Eskalation (Schwelle ESSEN_MIN statt 10) jetzt ÖFTER das Finale oder kern-Spiel verdrängen als nötig — gibt es ein Fenster, wo ALT kompakt+Finale druckte und NEU voll+ohne Finale, und ist dieser Trade vertretbar/dokumentiert?
R2 — NEUE Fehler im Fix-Diff: Nachbarzeilen der angefassten Karten (klein Sand-Spiel: passt der Tausch-Satz zur Spieldauer/steps[0..n]? Statikerin: kollidiert „Statik-Wertung beim Bauklotz-Wettbewerb" mit der Maurerin-Rolle, die laut rolesList den Bauklotz-Wettbewerb bewertet?), Sprachfehler, JSON-Nachbarn, Preise exakt.
R3 — Restlöcher-Stichprobe derselben Klassen: verbleibende variantenexklusive Spielnamen in top-level-Texten? Verbleibende Zahlen-Widersprüche (Quiz 25/12, Verdächtige 4/3, Stationszahlen)?
NICHT PRÜFEN: kostenKontext-Skalierung (M6-Kernticket) · estimatedCostEur wow 555 vs Σ635 (Ticket) · „Wow"-fail-open (Linter-Ticket) · XL/XXL-Alternativen zählen weiter in die Σ (deklarierte Entscheidung) · ritter verliert G()-Wortschicht im Danke-Blatt (dokumentierte Nebenwirkung, Rückkehr via Manifest-Wort geplant) · ungedruckte Felder (faq/parentTips/ageInsight/printables) außer als MINOR-Hygiene · _bundle.js · schatzsuche.json · False-Positive-Liste #13-15.

PFLICHTEN: Je Finding wörtliches Zitat + Datei + MAJOR/MINOR/UNSICHER; MAJOR nur wenn gedruckt beim Kunden. Score 0-100. Abschluss: „REVIEW ABGESCHLOSSEN".
