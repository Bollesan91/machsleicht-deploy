Du bist unabhängiger Gutachter für ein Druckprodukt: das „Komplettpaket" zum Baustellen-Kindergeburtstag (24,90 €). Ein Elternteil druckt es aus und richtet danach eine echte Party für echte Kinder aus — jede Zahl, jede Anweisung, jede Sicherheitsangabe landet physisch auf dem Küchentisch. Erstgutachten, es gab noch keins: Prüfe hart und vollständig.

ARCHITEKTUR: paket/baustelle/index.html rendert client-seitig aus data/motto/baustelle-{klein,mittel,gross}.json (3 Altersgruppen × 3 Varianten minimal/standard/wow = 9 Ausprägungen; die Altersgruppe kommt aus dem Kindalter, die Variante wählt der Käufer). Dieselben JSONs rendert auch der kostenlose Planer live. Schatzsuche-Daten: data/schatzsuche.json (Eintrag baustelle).

PRÜFOBJEKT (SHA {SHA}):
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/data/motto/baustelle-klein.json
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/data/motto/baustelle-mittel.json
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/data/motto/baustelle-gross.json
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/paket/baustelle/index.html
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/paket/core/paket-core.js
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/data/schatzsuche.json
  False-Positive-Liste (geprüfte Nicht-Findings, NICHT erneut melden): https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/OFFENE-REVIEW-PUNKTE.md

PRÜFWINKEL (nummeriert, alle abarbeiten — simuliere wo möglich in Node statt zu schätzen):
W1 ZEIT — buildTimeline() über alle 9 Ausprägungen: Fällt ein Kern-Spiel in die Reserve? Kommt die Schatzsuche im Zeitplan vor? Widersprechen Vorbereitungstexte dem Zeitfenster?
W2 MENGEN — Materialzeilen vs. Kinderzahl je Variante; Einkaufsliste vs. Spielkarten (wird gekauft, was die Karte verlangt — in richtiger Stückzahl und bemalbarer/richtiger Ausführung?).
W3 KOSTEN — summieren die shoppingLists exakt auf die genannten Summen? Widersprechen sich Einkaufs- und Vorbereitungs-Blatt bei Preisen?
W4 ALTER — 3-5-Anweisungen auf 6-8/9-12-Karten oder umgekehrt? Verlangt etwas Fähigkeiten, die die Gruppe nicht hat (Schreiben bei 3-Jährigen)?
W5 VERSPROCHEN, NIE GESCHRIEBEN — Material gekauft/referenziert, aber keine Anleitung existiert?
W6 SICHERHEIT — kauft eine Zeile, was eine Sicherheitsregel verbietet? Heißkleber/Werkzeug/Kleinteile bei Kleinen? Aufsichts-Regeln konsistent?
W7 STATIONEN — stehen Lösungen auf Karten, die an der Station hängen? Liefert hint, was desc verspricht?
W8 FINALE — Schatzsuche-Material auf den Einkaufslisten? Code-Logik stimmig?
W9 PAKET↔DATEN — werden erhebliche Datenmengen nie gedruckt? Zwei unvereinbare Systeme im selben Dossier?
W10 SPRACHE — Ersetzungs-Havarien, Satzbrüche, Ton gegenüber Eltern, ASCII-Reste (ae/oe/ue/ss).
W11 GRUPPEN-LÜCKEN — was hat eine Altersgruppe, das einer anderen mit höherem Risiko fehlt (Sicherheits-Karten)?
W12 KRIMI-KONSISTENZ — die Sabotage-Geschichte (Kanon: Maurer Frank, Polierin Rita, Elektriker Theo, Architekt Klaus): Besetzung, Verdächtigen-ZAHLEN und Hinweise konsistent über Intro/Stationen/Material/Hub?
W13 SPIELBARKEIT — kapiert ein Gastgeber ohne Vorwissen jede Karte beim ersten Lesen? Kapiert ein Kind 4-9 die Spiele in 5 Sekunden Erklärung?

PFLICHTEN:
- Je Finding: wörtliches Zitat + Datei/Feld + MAJOR/MINOR/UNSICHER. MAJOR nur, wenn es gedruckt/live beim Kunden landet.
- Bekannte offene Punkte NICHT melden: Gold-Kontrast .tag.gold (paketübergreifendes Ticket), Seitennummern-Drift, estimatedCostEur (wird nirgends gerendert), FP-Liste.
- Am Ende: Score 0-100 + die 3 wichtigsten Erst-Fixe + das Wort „REVIEW ABGESCHLOSSEN".
