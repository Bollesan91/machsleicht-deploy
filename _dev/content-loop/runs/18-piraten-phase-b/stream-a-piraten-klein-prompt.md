# Stream A — piraten-klein.json bauen (Phase B Elite-Motto-Data)

Aufgabe: vollständige `_src/elite-motto-data/piraten-klein.json` (Piraten 3-5 Jahre) erstellen.

## Output-Pfad
`_src/elite-motto-data/piraten-klein.json` — als Artifact mit Download-Button.

## Pflicht-Quellen (per Raw-URL)

1. **piraten-mittel.json (Pattern + Story-Anker):** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/piraten-mittel.json
2. **safari-klein.json (Altersgruppe-Pattern Score 97):** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/safari-klein.json
3. **feuerwehr-klein.json:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/feuerwehr-klein.json
4. **einhorn-klein.json:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/einhorn-klein.json
5. **Schema:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/README.md
6. **Piraten-HTML (Template-Stub):** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/kindergeburtstag/piraten-3-5-jahre.html (klein ist Template, nicht Elite — nutz nur als Tonalitäts-Referenz, Inhalte musst du selbst entwickeln aus piraten-mittel + Pirate-Story)

## Pirate-Story-Anker (durchziehen)

- **Setting:** Schiff, Insel, Schatzkiste, Kompass, Schatzkarte, Krähennest, Anker, Steuerrad
- **Rollen für 3-5:** Mini-Piraten / kleine Schatzsucher (KEIN "Anwärter" / "Kapitän in Ausbildung" — zu komplex für 3-5)
- **Vermeiden:** Säbel-Kampf, Kanonen-Schlachten, dunkle Themen (Skelett-Piraten, Geister) — bei 3-5 zu gruselig
- **Bolle-Ton 3-5:** lakonisch, mama-respektierend, Eltern aktiv begleitend

## Pflicht-Schema (analog safari-klein, Score 97)

```json
{
  "_meta": {"source_file":"kindergeburtstag/piraten-3-5-jahre.html","extracted":"2026-05-21","schema_version":"1.0","purpose":"Phase-B Elite Daten für Planer-Frisur-Sprint"},
  "motto": "piraten",
  "ageGroup": "klein",
  "ageRange": [3,5],
  "title": "🏴‍☠️ Piraten-Kindergeburtstag — 3–5 Jahre",
  "metaDescription": "...",
  "introParagraph": "...",
  "ageInsight": {"headline":"...","traits":[{"topic":"...","detail":"..."}]x7,"whyMottoFitsHeadline":"...","whyMottoFits":"..."},
  "signatureRitual": {
    "name":"Das kleine Piraten-Versprechen",
    "subtitle":"Eröffnet die Party + Schatzkisten-Übergabe am Ende",
    "introText":"...",
    "setupSteps":[{"title":"...","content":"..."}]x4-5,
    "rolesList":[{"emoji":"...","name":"...","function":"..."}]x6-8,
    "optOutNote":"...",
    "materialNote":"Pflicht: Augenklappen + Schatzkisten-Urkunde. Sinnvoll: Piraten-Hut + Karte."
  },
  "variants": [
    {"id":"minimal","label":"Minimal — 90 Min., minimaler Aufwand","headline":"...","intro":"...","timeWindow":"15:00-16:30, 6 Kinder","schedule":[...]x5-7,"games":[Game]x2-4,"food":"...","decoration":"...","giveaways":"...","shoppingList":[...]x10-15,"estimatedCostEur":35,"costContext":"...","savingsTip":{"title":"...","body":"..."}},
    {"id":"standard","label":"Standard — 2 Std., Sweet Spot","estimatedCostEur":55,...},
    {"id":"wow","label":"Wow — 2 Std., Bastel-Highlight","estimatedCostEur":80,...}
  ],
  "cakeRecipe": {"intro":"...","steps":[{"n":1,"content":"..."}]x5-7,"meta":{"aufwand":"...","kosten":"...","allergiker":"..."},"tips":[{"title":"...","body":"..."}]x2},
  "parentTips": {"structured":[{"topic":"...","detail":"..."}]x6,"educationalValue":"300-500 Zeichen über was Kinder mitnehmen"},
  "invitationTemplate":"",
  "faq": [{"q":"...","a":"..."}]x4-5,
  "preparationWeeks": {"minus4Weeks":"...","minus2Weeks":"...","minus1Week":"...","minus2Days":"...","minus1Day":"...","dayOf":"..."},
  "sosScenarios": {"regen":..."weniger_kinder_als_erwartet":...,"mehr_kinder_als_erwartet":...,"kind_will_nicht_mitmachen":...,"kuchen_misslungen":...,"spielzeug_kaputt":...,"ein_kind_weint":...,"eltern_kommen_frueh":...}
}
```

## Game-Schema (steps[] PFLICHT, vergleichbar safari-klein avgSteps 3.9)

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
  "steps": [{"n":1,"name":"...","content":"max 120 chars"}] x 4-6,
  "safetyRule": "...",
  "ageAdjust3": "...",
  "ageAdjust5": "...",
  "indoorTip": "...",
  "outdoorTip": "...",
  "whyItWorksTitle": "...",
  "whyItWorks": "..."
}
```

## shoppingList[].category Heuristik

- **pflicht:** Augenklappen, Piraten-Urkunden, Lebensmittel (Kuchen, Schorle), Schatzkarten-Vorlage
- **sinnvoll:** Piraten-Hüte (Filz oder Plastik), Schatzkiste (Schuhkarton OK), Goldmünzen-Schokolade, Piraten-Servietten
- **habIchVielleicht:** Aufblasbarer Säbel (eher für 5-Jährige, Caveat), Augenklappen-Sticker, Piraten-Bandana

## Schwerpunkt 3-5

- **Eltern bleiben dabei** — keine Absetz-Option
- Kein Wettbewerb, keine Wertung — alle finden den Schatz gemeinsam
- Spielzeit max 12 Min., dann Übergang
- Kuchen-Slot nach 45 Min Aktivität sonst Meltdown
- Mini-Pirat-Identität (Stirnband mit Pirate-Skull / einfache Augenklappe)

## Output

Vollständige `piraten-klein.json` als Artifact mit Download-Button. Self-Score ≥85 anpeilen (Ziel: gleiche Detailtiefe wie safari-klein Score 97).

## Anti-Patterns

- TODO-Marker
- Verkindischende Sprache ("Komm kleiner Pirat...")
- Gruselige Themen (Skelette, Geister)
- Wettbewerbs-Elemente (3-5 brauchen Kooperation)
- Schul-Sprache / Marketing-Sound
