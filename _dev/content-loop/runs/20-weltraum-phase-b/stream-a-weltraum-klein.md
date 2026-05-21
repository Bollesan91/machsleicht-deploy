# Stream A — weltraum-klein.json bauen (Phase B Elite-Motto-Data)

Aufgabe: vollständige `_src/elite-motto-data/weltraum-klein.json` (Weltraum 3-5 Jahre) erstellen.

## Pflicht-Quellen (per Raw-URL)

1. **safari-klein.json (Pattern Score 97):** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/safari-klein.json
2. **piraten-klein.json (Pattern Score 96):** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/piraten-klein.json
3. **feuerwehr-klein.json:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/feuerwehr-klein.json
4. **einhorn-klein.json:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/einhorn-klein.json
5. **Schema:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/README.md
6. **Weltraum-HTML-Template (kein Elite-HTML verfügbar):** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/kindergeburtstag/weltraum-3-5-jahre.html

## Weltraum-Story-Anker für 3-5 (du baust den Content)

- **Setting:** Raumschiff (Pappkarton-Setup), Mond, Sterne, Planeten in Erdnähe (Mars rot, Saturn mit Ringen)
- **Rolle:** "Mini-Astronaut" / "kleine Sternen-Helfer" (KEIN Kommandant — zu komplex für 3-5)
- **Mission:** Sterne sammeln, Mond-Landung üben, freundliche Aliens treffen
- **Vermeiden:** Schwarze Löcher, Außerirdische-Attacken, "verloren im Weltraum" (gruselig)
- **Bolle-Ton:** lakonisch, mama-respektierend, Eltern aktiv begleitend bei 3-5
- **Outfit-Anker:** Astronauten-Stirnband (Pappe + Alufolie als Helm-Effekt) + selbst gemalter "Crew-Patch" (rundes Klebebild)

## Schema-Pflicht

```json
{
  "_meta": {"source_file":"kindergeburtstag/weltraum-3-5-jahre.html","extracted":"2026-05-21","schema_version":"1.0","purpose":"Phase-B Elite Daten"},
  "motto": "weltraum",
  "ageGroup": "klein",
  "ageRange": [3,5],
  "title": "🚀 Weltraum-Kindergeburtstag — 3–5 Jahre",
  ...
  "signatureRitual": {"name":"Das kleine Astronauten-Versprechen", ...},
  "variants": [
    {"id":"minimal","estimatedCostEur":35,...},
    {"id":"standard","estimatedCostEur":55,...},
    {"id":"wow","estimatedCostEur":80,...}
  ],
  "preparationWeeks": {6 Sektionen},
  "sosScenarios": {8 Szenarien},
  ...
}
```

## shoppingList[].category 3-5

- **pflicht:** Astronauten-Stirnband-Material, Crew-Patch-Kleber, Lebensmittel (Kuchen, Schorle), Urkunden-Vorlage "Mini-Astronaut"
- **sinnvoll:** Sterne-Stickerset, Planeten-Poster, Folien-Decke (für "Raumschiff-Wand"), Mond-Krater-Backform
- **habIchVielleicht:** Aufblasbarer Astronaut (Caveat: nur 5-Jährige, Lärm-Risiko!), Stern-Projektor (eher für ältere Kinder)

## Pflicht-Details

- **steps[] avg 4+ Schritte pro Spiel**, max 120c pro content
- **whyItWorks für JEDES Spiel** (1-2 Sätze)
- **safetyRule** wo relevant (Pappkarton-Kanten, Folie + Stolper-Gefahr)
- **indoorTip + outdoorTip** möglichst alle
- **parentTips.educationalValue** 350-500c (Sterne-Wissen, Mut-zu-Neuem als kindgerechte Werte)
- Score-Ziel: ≥85 (Vergleich: safari-klein 97, piraten-klein 96)

## Output

Vollständige `weltraum-klein.json` als Artifact mit Download-Button. Self-Score-Report (5 Zeilen) am Ende.

## Anti-Patterns

- TODO-Marker
- Gruselige Sci-Fi-Elemente (für 3-5 unpassend)
- Schul-Sprache
- "Anwärter"-Konzept (eliminiert)
- "1. Astronaut"-Tempo-Belohnung
