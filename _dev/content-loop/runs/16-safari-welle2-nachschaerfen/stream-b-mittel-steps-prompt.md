# Stream B — safari-mittel.json Strukturelle Nachschärfung

Aufgabe: Existierende `_src/elite-motto-data/safari-mittel.json` (Safari 6-8) strukturell aufbohren — Game-Schema vollständig füllen, das aktuell überall lückenhaft ist.

## Diagnose (Stand vor diesem Stream)

| Feld | Wert | Soll |
|---|---|---|
| games[].steps[] | 0 für alle 9 Spiele | 4-6 Schritte pro Spiel |
| games[].whyItWorks | null für alle | gefüllt für alle |
| games[].safetyRule | überwiegend null | wo relevant gefüllt |
| games[].indoorTip + outdoorTip | überwiegend null | gefüllt |
| parentTips.educationalValue | leerer String | 300-600 Zeichen |

**Vergleich:** safari-klein und safari-gross haben diese Felder zu 80-100% gefüllt. safari-mittel hängt strukturell zurück.

## Materialien (Raw-URLs)

- **Aktuelle safari-mittel.json:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/safari-mittel.json
- **HTML-Quelle (alle Inhalte für 6-8):** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/kindergeburtstag/safari-6-8-jahre.html
- **Strukturelles Vorbild safari-klein:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/safari-klein.json
- **Strukturelles Vorbild safari-gross:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/safari-gross.json
- **Schema:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/README.md

## Pflicht-Changes — pro Spiel

Für **alle 9 Spiele** (aktuelle Variants × Games):

1. **steps[] extrahieren aus prepText:** Den Fließtext im `prepText` in 4-6 nummerierte Schritte zerlegen.
   - Schema: `[{"n":1,"name":"...","content":"..."}]`
   - Schritte aus dem HTML-Spielanleitungs-Block (sucht `<strong>So geht's:</strong>` etc.)
   - max 120 Zeichen pro content-Feld

2. **whyItWorks** schreiben (1-2 Sätze): warum dieses Spiel für 6-8-Jährige funktioniert
   - Pädagogische Begründung (kognitive Tiefe, Wettbewerb okay, Regeln verstehen)
   - Beispiel safari-klein "Tierspuren-Pirsch": *"Schleichen ist ein Spiel mit eingebauter Lautstärke-Bremse. Kein Wettbewerb, alle finden gemeinsam."*

3. **safetyRule** wo sinnvoll (nicht erzwingen): bei Wasser/scharfen Gegenständen/Allergierisiken

4. **indoorTip + outdoorTip** wo nicht null: spezifische Anpassungen für Wohnung vs. Garten

5. **parentTips.educationalValue** (Top-Level): 300-600 Zeichen ehrlicher Content über Was Kinder mitnehmen (Tier-Wissen, soziale Verantwortung, Ausdauer)

## Output

Neue komplette safari-mittel.json schreiben (Artifact + Download). Alle bestehenden Felder + Phase-B-Sektionen (preparationWeeks, sosScenarios) ERHALTEN. Nur:
- games[].steps[]: NEU
- games[].whyItWorks: NEU
- games[].safetyRule: ggf. NEU
- games[].indoorTip + outdoorTip: ggf. NEU
- parentTips.educationalValue: NEU

## Anti-Patterns

- steps künstlich aufblasen mit leeren Schritten
- whyItWorks als Plattitüden ("fördert Sozialverhalten") — sollen konkret sein
- Bestehende Inhalte komplett umschreiben (nur ergänzen wo lückenhaft)
- preparationWeeks/sosScenarios anfassen (die sind schon gut)
- safetyRule erfinden wo keine echte Gefahr ist
