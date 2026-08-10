Du bist unabhängiger Gutachter für einen REPARATUR-Diff (Feuerwehr-Kindergeburtstagspaket, Folgerunde 2). Das Vorgutachten (58/100) fand 7 MAJORs / 8 MINORs — Kernkritik: Spiele repariert, Satellitenfelder (Countdown/SOS/Eltern-Tipps/Deko/Einkauf) auf der alten Welt. Die Reparatur liegt als Diff vor (zwei Schübe: Sicherheit/Live + Struktur-Satelliten). Prüfe: (a) schließt jede Reparatur ihr Finding, (b) NEUE Fehler (fix-induzierte zuerst).

KONTEXT: paket/feuerwehr/index.html rendert client-seitig aus data/motto/feuerwehr-{klein,mittel,gross}.json; die JSONs rendert AUCH der kostenlose Planer live. _bundle.js spiegelt die elite-Quellen (nicht im Diff — gleiche Strings, von Hand nachgezogen).

PRÜFOBJEKT (SHA {SHA}):
  Diff: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/_dev/review/2026-08-10-fw-schub-ab.patch
  After-State: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/data/motto/feuerwehr-klein.json
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/data/motto/feuerwehr-gross.json
  False-Positive-Liste (NICHT erneut melden, v. a. #15 ageAdjust): https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/OFFENE-REVIEW-PUNKTE.md

BEHAUPTUNGEN:
A1 (M1): Kein Rasierschaum-KAUFAUFTRAG mehr in klein (Countdown „Kinderschaum/Sprühsahne", Sensorik „Duftstoff-Allergie", SOS „Schaum-Unverträglichkeit"); die 5-Jährigen-AUSNAHME bleibt bewusst als Aufsichtsregel in material/safetyRule/steps.
A2 (M2): whyItWorks klein = Kinderschaum/Sprühsahne-Logik („Sprühsahne erst direkt vor dem Spiel aufsprühen"); mittel behält Rasierschaum-Default + Sahne-Verbot, nur „Reagiert sich gut"→„Schmiert nicht, lässt sich gut abwaschen".
A3 (M7): ALLE Spüldauern ≥10 Minuten (auch Eltern-Checkliste + elite ageAdjust6 + SOS-headline) + Spülrichtung „vom inneren Augenwinkel nach außen".
B1 (M3): gross-Countdown/SOS variantenneutral („Die Stationen deiner Variante (3/4/5) — Liste auf der Spielkarte"; Atemschutz als Standard/Wow markiert; Erste-Hilfe-Verweis auf Haushalts-Set).
B2 (M4): UV INTEGRIERT — UV-Geheimbeweis in der Spurensicherung (Einkauf „UV-Taschenlampe + UV-Stift", Countdown, Deko, SOS-Ersatz, Wow-Moment im Spielschritt).
B3 (M5): 6 Alibi-Karten in material + prepText mit Formulierungs-Vorlage (4 halten / 2 nicht, Köchin brüchig).
B4 (M6): Standard hat jetzt eine echte Vernehmung (Vernehmungsstuhl, 3 Fragen, Köchin weicht aus) + Brandklassen-Verweis → Fett-Regel.
B5: Minors — Merksätze fünf/fünf/fünf, Briefing duration 10, „Die geschlossene Tür hält…", Seil-Satz, „das Ermittler-Team", Fachfrage („Was hat die Person dann getan — und warum wurde damit alles schlimmer?").

PRÜFWINKEL:
V1 — grep-artig am After-State: existiert noch IRGENDEIN Rasierschaum-Kaufauftrag in klein außerhalb der bewussten Ausnahme? Irgendeine Spüldauer <10 Min in klein/mittel/gross?
V2 — Konsistenz-Netz gross: Passen Countdown, SOS, Deko, Einkauf, prepText und Spielschritte jetzt zusammen (UV, Alibis, Stationszahlen, Erste-Hilfe)? Konstruiere den Weg eines Minimal-, Standard- und Wow-Käufers durch die gedruckten Blätter.
V3 — Vernehmung Standard: spielbar wie beschrieben? Kollidiert sie mit duration 25 des Spiels? (Zeiten-Scheduler ist bekannt offen — nur melden, wenn die Vernehmung das Problem VERSCHÄRFT.)
V4 — Sprache: alle neuen Sätze laut lesen (Alibi-Vorlagen, Vernehmung, UV-Sätze, Fachfrage).
V5 — Fix-induziert: haben die Ersetzungen Nachbarfelder/mittel beschädigt? (mittel behält Rasierschaum-Default — steht da jetzt versehentlich klein-Text?)
NICHT PRÜFEN (bekannt offen): V3-Einsatz-Alarm, Z1-Scheduler, mittel==klein-Reststruktur, Zahlen M1-M4/K1-K3 alt, Stationen D1/D2/F4 alt, Gold-Kontrast, FP-Liste.

PFLICHTEN: Zitat + Datei + MAJOR/MINOR/UNSICHER; MAJOR nur gedruckt/live. Score 0-100. „REVIEW ABGESCHLOSSEN".
