Du bist unabhängiger Gutachter für einen REPARATUR-Diff (Baustellen-Kindergeburtstagspaket, Diff-Re-Check). Ein Vorgutachten fand nach fünf Fix-Wellen 10 MAJORs (4 davon fix-induziert) und 12 MINORs; daraufhin wurde EIN Fix-Diff gebaut, der behauptet, alle 10 MAJORs und die gedruckten MINORs zu schließen. Deine Aufgabe: (a) jede Behauptung am HEUTIGEN After-State verifizieren, (b) den Fix-Diff adversarial auf NEUE Fehler lesen — in dieser Kette waren fix-induzierte Folge-MAJORs bisher die häufigste Fehlerquelle.

KONTEXT: Druckprodukt „Komplettpaket" — paket/baustelle/index.html wird aus paket/_maschine/template.html generiert, rendert client-seitig (paket/core/paket-core.js) aus data/motto/baustelle-{klein,mittel,gross}.json (3 Gruppen × 3 Varianten minimal/standard/wow). WICHTIG: sosScenarios/preparationWeeks/signatureRitual sind TOP-LEVEL-Felder — sie drucken für ALLE 3 Varianten einer Datei; Texte dort dürfen keine Spiele nennen, die nur eine Variante hat. Schatzsuche/Mission generell abgeschaltet (Produktentscheidung, nicht prüfen).

PRÜFOBJEKT (SHA {SHA}):
  Fix-Diff (Runden 1+2, 11.08.): https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/_dev/review/2026-08-11-recheck2-fixes.patch
  After-State HEUTE:
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/data/motto/baustelle-klein.json
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/data/motto/baustelle-mittel.json
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/data/motto/baustelle-gross.json
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/paket/_maschine/template.html
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/paket/core/paket-core.js
  False-Positive-Liste: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/OFFENE-REVIEW-PUNKTE.md

WAS DER FIX-DIFF BEHAUPTET (je Punkt: Vorbefund → Fix):
M1 Essenszeile fiel bei kurzen Fenstern ersatzlos aus dem Ablaufplan → buildTimeline() hat jetzt eine Budget-Kaskade mit expliziter Priorität ESSEN > kern-Spiele > Finale-Schutz (bud-Fallback erst ohne kernAhead, dann ohne FIN); unter 10 Restminuten entfällt die Zeile weiterhin (pathologisch kurzes Fenster).
M2 Danke-Text druckte „die Gruppe" (G() leer außerhalb ritter) → waDank ist bewusst motto-NEUTRAL ohne G()-Aufruf („die Kinder waren großartig"); kids-Zeile „Zum Abhaken: …" ebenfalls ohne G().
M3 prepText befahl die Spuren-Zuordnung AUF die Verdächtigen-Karten → „OHNE Spuren-Zuordnung (die bleibt bei dir: Fall-Übersicht auf dieser Karte)" (3×).
M4 Countdown „Werkzeug-Quiz Klasse 2 erstellen / 30-35 Karten" → „bereitlegen / Nichts zu erstellen: die 25 Quiz-Karten stehen fertig auf der Spielkarte in Teil III."
M5 mittel ageAdjust8 „15 Karten" (es gibt 12) → „Die 12 Karten mit den kniffligeren Fragen zuerst …" (3×).
M6 gross Shop verkaufte „Klasse 2 XL (30 Karten)" 18 € / „XXL (35 Karten + Bonus)" 22 € als Pflicht neben 25 gedruckten → Labels jetzt „Werkzeug-Quiz-Kaufset XL/XXL (Alternative zu den 25 gedruckten …)"; Preise und Kategorien BEWUSST unangetastet (Summen).
M7 klein regen.fallback nannte Memory+Maler (existieren in minimal nicht) → variantenneutral: „alle übrigen Stationen laufen drinnen, die Schrauben-Schatzsuche zieht in die Wohnung um."
M8 gross regen.steps[1] nannte Brücken-Bau/Material-Beutel (wow-/standard-only) → variantenneutral „Bastel- und Prüf-Stationen an den Esstisch — die Ermittlung läuft in der ganzen Wohnung weiter."
M9 mittel schrauben_verloren empfahl Werkzeug-Memory (klein-Spiel) und strich damit das kern-Spiel → „Ersatz-Schrauben aus der Material-Box in neuen Verstecken verteilen — die Schatzsuche bleibt im Plan."
M10 Brücken-Last-Dreiklang (Karte 50–300g, Rolle 50–300g, materialNote/Einkauf 50/100/200) → Karte „50g → 100g → 200g — zum Finale 100g+200g zusammen", Rolle „50–200 g"; materialNote unverändert korrekt.
MINORs: „gestern dabei wart" → zeitneutral · step3 „auf denselben." → „auf denselben Verdächtigen." (3×) · Klopapierrollen-Test von der 15-cm-Regel getrennt (Kleinteile-Check, 5 Stellen in klein) · „Verschwierigkeitsgrade" → „Schwierigkeitsgrade" · „Spurensuch-Zeit von 25 Min" → „Spurensuche (Schritt 3) auf 10 Min deckeln" · Foto-Chronistin ohne „3 Spuren je Station/9 Fotos"-Phantomrechnung, materialNote „Foto-Slots nach Bedarf" · printables „(15 Karten)" → „(fertig auf der Spielkarte)" · wacopy auf dem Danke-Blatt jetzt screen-only · QR-Havarie-Warnung sagt nicht mehr „Links stehen als Text auf den Karten".

PRÜFWINKEL:
R1 — JEDE M-Behauptung am After-State verifizieren (nicht am Diff glauben): wörtlich zitieren, Variante/Datei nennen. Bei M1 die Kaskade NACHRECHNEN: gross/standard 14:00–15:30 (90 Min) — steht die Essenszeile im Plan? Kann die Kaskade den Zeiger über endCap schieben oder Monotonie brechen (bud=endCap−t kann FIN verdrängen — rutscht die Übergabe dann je VOR das Finale)?
R2 — NEUE FEHLER im Fix-Diff, adversarial: neue Widersprüche zu NACHBARFELDERN (der Klassiker dieser Kette), Sprachfehler, kaputte JSON-Nachbarn, Preise 18/22/25/35 € exakt erhalten? „Zum Finale 100g+200g zusammen" — passt das zu Wertungs-/Best-Wert-Logik des Steps? „Grab-Werkzeug gemischt" — widerspricht das dem steps-Text „Jedes Kind bekommt Bagger und Schaufel" (klein games[0].steps), falls der unverändert blieb?
R3 — Restlöcher derselben Klasse (Stichprobe): nennt irgendein anderer sosScenarios-/countdown-/parentTips-Text noch Spiele, die die Gruppe/Variante nicht hat? Gibt es weitere gedruckte Zahlen-Widersprüche zu den 25/12 Quiz-Karten oder 4/3 Verdächtigen/Spuren?
NICHT PRÜFEN (bekannt/entschieden): kostenKontext-Skalierung M6-Kernticket; estimatedCostEur wow 555 vs Σ635 (ungerendert, Ticket); „Wow"-Groß-Klein-fail-open (Linter-Ticket); _bundle.js (nicht live); dormante schatzsuche.json; False-Positive-Liste #13-15.

PFLICHTEN: Je Finding wörtliches Zitat + Datei + MAJOR/MINOR/UNSICHER; MAJOR nur wenn gedruckt beim Kunden. Score 0-100 für das Baustelle-Paket. Abschluss: „REVIEW ABGESCHLOSSEN".
