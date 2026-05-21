# Stream A — safari-klein.json bauen (Phase B Elite-Motto-Data)

Du bist **Writer-Subagent im Helfer-v3-Loop**. Aufgabe: vollständige `_src/elite-motto-data/safari-klein.json` (Safari 3-5 Jahre) erstellen, parallel zu existierendem feuerwehr-klein/einhorn-klein.

## Output-Pfad
`_src/elite-motto-data/safari-klein.json`

## Pflicht-Quellen (alle per Raw-URL ziehen)

1. **HTML-Quelle:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/kindergeburtstag/safari-3-5-jahre.html
2. **Schema-Doku:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/README.md + https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/HANDOFF.md
3. **Safari-Style:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/safari-mittel.json (gleiches Motto, andere Altersgruppe; signatureRitual=null übernehmen)
4. **Klein-Pattern:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/feuerwehr-klein.json + https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/einhorn-klein.json

## Anforderungen

- **Detailtiefe:** ~50-65 KB JSON, vergleichbar zu feuerwehr-klein / einhorn-klein
- **Bolle-Ton:** lakonisch, ehrlich, mama-respektierend. KEINE Schul-Sprache, KEINE Pinterest-Phrasen ("Sweet Spot", "emotional wertvollsten")
- **Story-Anker:** Tier-Helfer / Reservat / Pirsch / Herde / Wasserstelle durchziehen
- **Schema-strikt:** 
  - `motto: "safari"`, `ageGroup: "klein"`, `ageRange: [3,5]`
  - `signatureRitual: null` (wie safari-mittel)
  - `variants: [minimal/standard/wow]` mit `estimatedCostEur: 33 / 52 / 76`
  - `preparationWeeks` alle 6 Sektionen ausgefüllt (minus4Weeks, minus2Weeks, minus1Week, minus2Days, minus1Day, dayOf) — KEIN TODO-Marker
  - `sosScenarios` alle 8 Szenarien (regen, weniger_kinder_als_erwartet, mehr_kinder_als_erwartet, kind_will_nicht_mitmachen, kuchen_misslungen, spielzeug_kaputt, ein_kind_weint, eltern_kommen_frueh)
  - `shoppingList[].category` pro Item: `"pflicht"` / `"sinnvoll"` / `"habIchVielleicht"`
- **steps ≤120 Zeichen** pro Step
- **Aus aktuellem HTML übernehmen:**
  - Wow-Ehrlichkeit-Box "80m²+/zweite Hand/5-Jahre-Kind"
  - Aufblas-Kostüm-Caveat "nur für 5-Jährige"
  - Pirsch-Raumannahme "60-75m² Alternative ein Raum mit verschachtelten Verstecken"
  - Story-Phrasen "Jede Pirsch beginnt leise." / "Die Urkunde bekommt jeder Helfer"
  - Wasserstelle (nicht Wasserloch), Herde (nicht Gruppe)

## Game-Schema

```json
{
  "name": "...",
  "indoor": true,
  "outdoor": true,
  "duration": "15 Min.",
  "minAge": 3,
  "loudness": "leise|halblaut|laut",
  "effort": "leicht|mittel",
  "material": "...",
  "prepText": "...",
  "steps": [{"n":1,"name":"...","content":"..."}],
  "safetyRule": "...",
  "ageAdjust3": "...",
  "ageAdjust5": "...",
  "indoorTip": "...",
  "outdoorTip": "...",
  "whyItWorksTitle": "...",
  "whyItWorks": "..."
}
```

## Output

Schreibe die finale JSON-Datei direkt nach `_src/elite-motto-data/safari-klein.json` via Write-Tool. Achte auf Encoding (UTF-8, keine NUL-Bytes). Liefere Status-Report (5 Zeilen): File-Größe in KB, variants×games, preparationWeeks/sosScenarios komplett?, Self-Score, bekannte Schwächen.

## Anti-Patterns

- TODO_PHASE_B-Marker (verboten)
- Generische Inhalte ohne Tier-Helfer-Frame
- shoppingList ohne `category` Field
- Schul-Sprache / Marketing-Sound
- Pirsch-Anleitung kopiert von 9-12 (3-5 ist anders)
