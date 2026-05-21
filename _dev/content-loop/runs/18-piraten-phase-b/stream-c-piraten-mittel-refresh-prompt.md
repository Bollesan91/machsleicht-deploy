# Stream C — piraten-mittel.json Strukturelle Nachschärfung

Aufgabe: Existierende `_src/elite-motto-data/piraten-mittel.json` (Piraten 6-8) strukturell aufbohren — analog zum Safari-mittel-Refresh in Welle 2.

## Diagnose (Stand vor diesem Stream)

| Feld | Wert | Soll |
|---|---|---|
| games[].steps[] | 0 für alle 9 Spiele | 4-6 Schritte |
| games[].whyItWorks | null überall | gefüllt für alle |
| games[].safetyRule | überwiegend null | wo sinnvoll |
| games[].indoorTip + outdoorTip | überwiegend null | gefüllt |
| parentTips.educationalValue | 0c | 300-500 Zeichen |
| signatureRitual | null | "Die Piraten-Aufnahme & Schatzkisten-Übergabe" oder ähnlich |
| Datei-Größe | 38KB | sollte ~65-75KB nach Refresh |

## Pflicht-Quellen (per Raw-URL)

1. **Aktuelle piraten-mittel.json:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/piraten-mittel.json
2. **HTML-Quelle (Elite):** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/kindergeburtstag/piraten-6-8-jahre.html
3. **Strukturelles Vorbild safari-mittel (nach Welle 2, Score 92):** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/safari-mittel.json
4. **Pattern-Referenz feuerwehr-mittel:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/feuerwehr-mittel.json
5. **Pattern-Referenz einhorn-mittel:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/einhorn-mittel.json
6. **Schema:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/README.md

## Pflicht-Changes

Für **alle 9 Spiele** (bestehende Variants × Games):

1. **steps[]** aus prepText/HTML extrahieren: 4-6 nummerierte Schritte
   - max 120 Zeichen pro content
   - Schema: `[{"n":1,"name":"...","content":"..."}]`

2. **whyItWorks** schreiben (1-2 Sätze, pädagogische Begründung 6-8-spezifisch)

3. **safetyRule** wo sinnvoll (Wasser, scharfe Gegenstände, Allergien)

4. **indoorTip + outdoorTip** wo nicht null

5. **parentTips.educationalValue** (Top-Level): 300-500 Zeichen — was Kinder mitnehmen (Crew-Geist, Verantwortung, Pirate-Story als Wertvermittlung)

6. **signatureRitual ERGÄNZEN** (war null):
   - Vorschlag: **"Die Piraten-Aufnahme & Schatzkisten-Übergabe"**
   - Konzept: Crew-Auswahl + Captain-Versprechen am Anfang, Schatzkiste-Übergabe am Ende
   - Struktur analog safari-mittel "Der Ranger-Eid": setupSteps x 4-5, rolesList x 8-12 mit Pirate-Rollen (Kapitän, Steuermann, Ausguck, Schiffsjunge, Quartiermeister, etc.)

## Wichtig: Konsistenz zu klein + gross (Stream A + B parallel)

Stream A entwickelt `piraten-klein` mit Ritual "Das kleine Piraten-Versprechen" + simpler Helfer-Identität.
Stream B entwickelt `piraten-gross` mit Ritual "Die Crew-Aufnahme & Schatzkarten-Übergabe" + Spezialisierungen (Navigator/Quartiermeister/Spurenleser).

`piraten-mittel` muss die **Brücke** sein: zwischen Pirate-Versprechen (klein) und Crew-Aufnahme-mit-Spezialisierung (gross). Konkret:
- 6-8 ist Pirate-Crew-Aufnahme ohne hartes Spezialisierungs-System
- Rollen werden zugewiesen, aber spielerisch (Kapitän + Crew, keine Sonder-Codeknacker-Quadranten wie bei gross)
- Schatzsuche statt Codeknacker als Hauptaktivität

## Output

Vollständige neue `piraten-mittel.json` als Artifact mit Download-Button. ALLE bestehenden Felder + Phase-B-Sektionen (preparationWeeks, sosScenarios, shoppingList[].category) ERHALTEN — nur:
- signatureRitual: NEU
- games[].steps[]: NEU
- games[].whyItWorks: NEU
- games[].safetyRule: ggf. NEU
- games[].indoorTip + outdoorTip: ggf. NEU
- parentTips.educationalValue: NEU

Self-Score ≥85 anpeilen (Ziel: gleiche Detailtiefe wie safari-mittel Score 92).

## Anti-Patterns

- steps künstlich aufblasen mit leeren Schritten
- whyItWorks als Plattitüden
- Bestehende Phase-B-Sektionen umschreiben
- safetyRule erfinden wo keine Gefahr ist
