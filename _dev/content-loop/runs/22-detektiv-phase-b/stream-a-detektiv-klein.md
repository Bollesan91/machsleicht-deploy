# Stream A — detektiv-klein.json (Detektiv 3-5 Jahre)

Pattern-Quellen (Raw-URL):
- safari-klein.json (Score 97): https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/safari-klein.json
- piraten-klein.json (Score 96): https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/piraten-klein.json
- weltraum-klein.json (Score 90): https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/weltraum-klein.json
- Schema: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/README.md
- HTML-Template: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/kindergeburtstag/detektiv-3-5-jahre.html

## Detektiv-Story für 3-5

- **Setting:** Detektiv-Büro (Tisch mit Lupe + Notizbuch), Spuren-Suche im Haus/Garten, mysteriöse Geräusche
- **Rolle:** "Mini-Detektiv" / "kleine Spürnasen" (KEIN Inspektor / Kommissar — zu komplex)
- **Mission:** verschwundener Kuchen / verlorenes Lieblingstier / versteckte Schoko-Münzen finden
- **Vermeiden:** echte Verbrechen, gruselige Themen, Gefahr (für 3-5)
- **Outfit:** Detektiv-Mütze (Pappkappe), Lupe aus Pappe
- **Ritual:** "Das kleine Detektiv-Versprechen" — Lupen-Pflicht-Übergabe am Anfang, Detektiv-Urkunde am Ende

## Schema-Pflicht (analog safari-klein)

```json
{
  "motto": "detektiv",
  "ageGroup": "klein",
  "ageRange": [3,5],
  "title": "🔍 Detektiv-Kindergeburtstag — 3–5 Jahre",
  "signatureRitual": {"name":"Das kleine Detektiv-Versprechen", ...},
  "variants": [
    {"id":"minimal","estimatedCostEur":35,...},
    {"id":"standard","estimatedCostEur":55,...},
    {"id":"wow","estimatedCostEur":80,...}
  ],
  ...
}
```

## Pflicht-Details

- **9-10 Spiele** über 3 Varianten
- **steps[] avg 4+**, **whyItWorks 100%**, **safetyRule wo sinnvoll**, **indoorTip+outdoorTip**
- **parentTips.educationalValue** 350-500c (Beobachtungs-Gabe, Geduld, Selbstvertrauen)
- **preparationWeeks 6 + sosScenarios 8 + shoppingList[].category**
- Score-Ziel ≥85

## shoppingList[].category 3-5

- **pflicht:** Lupen-Material (Pappe + Folie), Detektiv-Mütze-Material, Lebensmittel, Urkunden-Vorlage
- **sinnvoll:** Fingerabdruck-Stempel, Spuren-Stickerset, Hinweis-Kärtchen
- **habIchVielleicht:** Plastik-Lupen-Set (Caveat), Notizbüchlein

## Output

Vollständige detektiv-klein.json als Artifact mit Download-Button. Self-Score ≥85.

## Anti-Patterns

- Gruselige Verbrechen-Themen
- Verkindischende Sprache
- "1. Detektiv"-Tempo-Belohnung
- Anwärter-Konzept
- Schul-Sprache / Marketing
