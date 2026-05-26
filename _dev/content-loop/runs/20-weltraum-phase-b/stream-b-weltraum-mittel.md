# Stream B — weltraum-mittel.json bauen (Phase B Elite-Motto-Data)

Aufgabe: vollständige `_src/elite-motto-data/weltraum-mittel.json` (Weltraum 6-8 Jahre) erstellen.

## Pflicht-Quellen (per Raw-URL)

1. **safari-mittel.json (Pattern Score 92):** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/safari-mittel.json
2. **piraten-mittel.json (Pattern):** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/piraten-mittel.json
3. **feuerwehr-mittel.json + einhorn-mittel.json:** als Referenz
4. **Schema:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/README.md
5. **Weltraum-HTML-Template:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/kindergeburtstag/weltraum-6-8-jahre.html

## Weltraum-Story-Anker für 6-8

- **Setting:** Raumstation, Mond-Mission, Planeten-Erkundung. Sonnen-System als Karte.
- **Rolle:** "Astronauten-Crew" mit leichten Spezial-Rollen: **Pilot**, **Wissenschaftler**, **Funker**
- **Mission:** Mond-Landung üben + Crystals/Sterne sammeln + Crew-Foto
- **Ritual:** "Der Astronauten-Schwur & Lizenz-Übergabe" — Crew-Aufnahme am Anfang + Licence-Stempel am Ende
- **Codeknacker-Light:** kleine 3-Buchstaben-Codes wie MARS oder MOND
- **Bolle-Ton 6-8:** ehrlich, kein Verkindischen aber noch nicht so streng wie 9-12
- **Wow-Variante:** Optional Mond-Pizza-Backstation + Nacht-Sternen-Beobachtung mit Eltern-Opt-In

## Schema-Pflicht

```json
{
  "motto": "weltraum",
  "ageGroup": "mittel",
  "ageRange": [6,8],
  "title": "🚀 Weltraum-Kindergeburtstag — 6–8 Jahre",
  "signatureRitual": {"name":"Der Astronauten-Schwur & Lizenz-Übergabe", ...},
  "variants": [
    {"id":"minimal","estimatedCostEur":45,...},
    {"id":"standard","estimatedCostEur":75,...},
    {"id":"wow","estimatedCostEur":115,...}
  ],
  "preparationWeeks": {6 Sektionen 6-8-spezifisch},
  "sosScenarios": {8 Szenarien},
  ...
}
```

## shoppingList[].category 6-8

- **pflicht:** Astronauten-Helm-Material, Crew-Patches, Lebensmittel, Lizenz-Vorlagen
- **sinnvoll:** Planeten-Stickerbogen, Mond-Backstation (Kuchen-Set), Stern-Projektor
- **habIchVielleicht:** Walkie-Talkies (Crew-Funk), LED-Sterne-Schnur (Wow), aufblasbare Rakete (Pinterest-Maximum)

## Pflicht-Details

- **9 Spiele** über 3 Varianten verteilt (minimal 2-3, standard 5-6, wow 6+)
- **steps[] avg 4-5**, **whyItWorks 100%**, **safetyRule wo sinnvoll**, **indoorTip+outdoorTip**
- **parentTips.educationalValue** 400-600c (Sonnen-System-Wissen, Crew-Verantwortung, Pioniergeist)
- Score-Ziel: ≥85

## Output

Vollständige `weltraum-mittel.json` als Artifact mit Download-Button.

## Anti-Patterns

- Verkindischende Sprache
- "1. Astronaut"-Tempo
- Anwärter-Lizenz
- Marketing-Sound
