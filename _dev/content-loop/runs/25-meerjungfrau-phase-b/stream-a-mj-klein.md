# Stream A — meerjungfrau-klein.json (Meerjungfrau 3-5 Jahre)

Pattern-Quellen (Raw-URL):
- safari-klein.json (97): https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/safari-klein.json
- detektiv-klein.json (95): https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/detektiv-klein.json
- weltraum-klein.json (90): https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/weltraum-klein.json
- einhorn-klein.json (Vorbild Mädchen-Fokus): https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/einhorn-klein.json
- Schema: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/README.md
- HTML-Template: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/kindergeburtstag/meerjungfrau-3-5-jahre.html

## Meerjungfrau-Story für 3-5

- **Setting:** Unterwasser-Welt, Korallenriff, Schatztruhe am Meeresboden, Muscheln + Perlen
- **Rolle:** "Mini-Meerjungfrau" / "kleine Meerjungfrau-Helfer" (auch Jungen — geschlechtsneutral als "Ozean-Helfer" oder ähnlich)
- **Mission:** Verlorene Perlen sammeln, Korallen-Garten bauen, Fisch-Freunde finden
- **Bolle-Ton:** lakonisch, mama-respektierend, geschlechts-inklusiv (Meerjungfrau funktioniert auch für Jungen mit "Tritonen"-Variante)
- **Outfit:** Meerjungfrau-Stirnband mit Muschel-Sticker (Pappe) oder einfache Krone aus Tonpapier
- **Ritual:** "Das kleine Meerjungfrau-Versprechen" — Muschel-Übergabe am Anfang, Perlen-Urkunde am Ende
- **Vermeiden:** Haie / gruselige Tiefsee, gefährliche Strudel

## Schema (analog safari-klein)

```json
{
  "motto": "meerjungfrau",
  "ageGroup": "klein",
  "ageRange": [3,5],
  "title": "🧜‍♀️ Meerjungfrau-Kindergeburtstag — 3–5 Jahre",
  "signatureRitual": {"name":"Das kleine Meerjungfrau-Versprechen", ...},
  "variants": [
    {"id":"minimal","estimatedCostEur":35,...},
    {"id":"standard","estimatedCostEur":55,...},
    {"id":"wow","estimatedCostEur":80,...}
  ],
  ...
}
```

## shoppingList[].category

- **pflicht:** Stirnband-Material (Pappe + Muschel-Sticker), Lebensmittel, Urkunden-Vorlage
- **sinnvoll:** Blaue Krepp-Papier-Rolle (Wellen), Muschel-Set (Dekoration), Perlen-Schoki
- **habIchVielleicht:** Meerjungfrau-Kostüm-Schwanzflosse (Wow, Caveat: nicht zum Laufen)

## Pflicht-Details

- 9-10 Spiele, steps[] avg 4+, whyItWorks 100%, eduValue 350-500c
- preparationWeeks 6 + sosScenarios 8 + shoppingList[].category
- Score-Ziel ≥85

## Output

Komplette meerjungfrau-klein.json als Artifact mit Download-Button.

## Anti-Patterns

- Verkindischende Sprache
- Gruselige Tiefsee-Themen
- "1. Meerjungfrau"-Tempo-Belohnung
- Schul-Sprache / Marketing
- Geschlechts-exklusive Sprache (alle Kinder willkommen)
