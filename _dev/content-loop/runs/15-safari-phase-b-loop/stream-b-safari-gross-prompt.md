# Stream B — safari-gross.json bauen (Phase B Elite-Motto-Data)

Du bist **Writer-Subagent im Helfer-v3-Loop**. Aufgabe: vollständige `_src/elite-motto-data/safari-gross.json` (Safari 9-12 Jahre) erstellen.

## Output-Pfad
`_src/elite-motto-data/safari-gross.json`

## Pflicht-Quellen (alle per Raw-URL ziehen)

1. **HTML-Quelle:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/kindergeburtstag/safari-9-12-jahre.html (mit aktuellen Tier-2/4-Edits)
2. **Schema-Doku:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/README.md + HANDOFF.md
3. **Safari-Style:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/safari-mittel.json (signatureRitual=null übernehmen)
4. **Gross-Pattern:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/feuerwehr-gross.json + einhorn-gross.json

## Anforderungen

- **Detailtiefe:** ~55-70 KB JSON (9-12 ist normalerweise größer als klein)
- **Bolle-Ton:** lakonisch, mama-respektierend, KEINE Verkindischung. KEIN "Sweet Spot", KEIN "emotional wertvollsten"
- **Story-Anker:** Reservat-Expedition / Spezialisierungen (Späher/Tierfotograf/Spurenleser) / Codeknacker / Pirsch / verborgener Tempel
- **Schema-strikt:**
  - `motto: "safari"`, `ageGroup: "gross"`, `ageRange: [9,12]`
  - `signatureRitual: null`
  - `variants: [minimal/standard/wow]` mit `estimatedCostEur: 41 / 92 / 142`
  - `preparationWeeks` alle 6 Sektionen
  - `sosScenarios` alle 8 (9-12-spezifisch: "Handy-Abdriften", "Codeknacker-Frust"...)
  - `shoppingList[].category` gesetzt
- **steps ≤120 Zeichen**

## KRITISCH — Codeknacker-Inhalte aus aktuellem HTML übernehmen:

- **Minimal-Codeknacker:** Drei Quadranten mit Lösungswörtern **WASSER / FELS / TEMPEL** mit eindeutigen Sortier-Regeln:
  - WASSER (Späher): 6 Tiere sortiert nach **Gewicht in kg** (Warzenschwein 100 / Antilope 60 / Schakal 15 / Strauß 12 / Erdmännchen 1 / Ratte 0,3 → W-A-S-S-E-R)
  - FELS (Tierfotograf): 4 Tiere an Felsen, **Reihenfolge links→rechts** (Fuchs-Elefant-Löwe-Schuppentier → F-E-L-S)
  - TEMPEL (Spurenleser): 6 Spuren in **Pfad-Reihenfolge** (Tiger-Attrappe / Elefant / Marabu / Pavian / Erdferkel / Leopard → T-E-M-P-E-L)
  - Eingebauter Selbst-Check
- **Standard-Codeknacker:** Drei Codes → **TOR** mit konsistenter Logik "Tiere im falschen Lebensraum" (Tiger=Asien, Orang-Utan=Asien, Renntier=Arktis → T-O-R)
- **Wow-Schatzsuche:** 5 Stationen → **TEMPEL** (Station 2 E, Station 3 M, Station 4 P, Station 5 T+EL)
- **Spezialisierungs-Mechanik:** Späher / Tierfotograf / Spurenleser mit Sonder-Aufgaben
- **"Sorgfalt-Spezialist"-Stempel** (NICHT "1. Spezialist"-Tempo) — alle bekommen volle Lizenz
- **Mini-Tierfigur** als Mitgebsel: `category: "habIchVielleicht"`, Hinweis "eher für jüngere Geschwister"
- **Schlafparty-Wow** mit Nacht-Safari (Stirnlampen, Eltern-Opt-In)
- **Story-Phrasen:** "Im Reservat zählt nicht, wer der Schnellste ist — sondern wer hinschaut.", "Jede Pirsch beginnt leise."

## Game-Schema

```json
{
  "name": "...",
  "indoor": true,
  "outdoor": true,
  "duration": "15 Min.",
  "minAge": 9,
  "loudness": "leise|halblaut|laut|konzentriert",
  "effort": "leicht|mittel|aufwendig",
  "material": "...",
  "prepText": "...",
  "steps": [{"n":1,"name":"...","content":"..."}],
  "safetyRule": "...",
  "ageAdjust9": "...",
  "ageAdjust12": "...",
  "indoorTip": "...",
  "outdoorTip": "...",
  "whyItWorksTitle": "...",
  "whyItWorks": "..."
}
```

## shoppingList[].category für 9-12

- `pflicht`: Lebensmittel, Codeknacker-Materialien (Karten, Umschläge), Lizenz-Vorlagen, Stempel, Bestimmungsschlüssel
- `sinnvoll`: Bandanas, Spezialisierungs-Patches, Stirnlampen (Wow-Schlafparty), Reservat-Schild
- `habIchVielleicht`: Mini-Tierfigur (mit Geschwister-Hinweis), Walkie-Talkies, Foto-Box

## Output

Schreibe die finale JSON-Datei direkt nach `_src/elite-motto-data/safari-gross.json` via Write-Tool. Encoding UTF-8. Status-Report (5 Zeilen): KB / variants×games / Sektionen komplett / Self-Score / Schwächen.

## Anti-Patterns

- TODO_PHASE_B-Marker
- Anwärter-Lizenz-Konzept (das wurde entfernt!)
- "1. Spezialist"-Stempel (Tempo) — stattdessen "Sorgfalt-Spezialist"
- Marketing-Sound
- Verkindischung
