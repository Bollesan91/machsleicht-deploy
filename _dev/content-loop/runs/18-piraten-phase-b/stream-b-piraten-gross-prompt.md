# Stream B — piraten-gross.json bauen (Phase B Elite-Motto-Data)

Aufgabe: vollständige `_src/elite-motto-data/piraten-gross.json` (Piraten 9-12 Jahre) erstellen.

## Output-Pfad
`_src/elite-motto-data/piraten-gross.json` — als Artifact mit Download-Button.

## Pflicht-Quellen (per Raw-URL)

1. **piraten-mittel.json (Pattern + Story-Anker):** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/piraten-mittel.json
2. **safari-gross.json (Altersgruppe-Pattern Score 95, MIT Codeknacker/Spezialisten):** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/safari-gross.json
3. **feuerwehr-gross.json:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/feuerwehr-gross.json
4. **einhorn-gross.json:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/einhorn-gross.json
5. **Schema:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/README.md
6. **Piraten-HTML 9-12 (Template-Stub):** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/kindergeburtstag/piraten-9-12-jahre.html (Template-Stub, nutze als Tonalitäts-Hinweis, Inhalte selbst entwickeln aus mittel + Pirate-9-12-Story)

## Pirate-Story 9-12 (ernst nehmen, kein Verkindischen)

- **Setting:** Schiff, Insel, verschollene Schätze, Crew-Mission, Schatzkarte mit Koordinaten
- **Spezialisierungs-Mechanik analog Safari-gross** (Späher/Foto/Spuren):
  - **Navigator** (Schatzkarten + Kompass)
  - **Quartiermeister** (Crew-Logistik + Schatz-Bewertung)
  - **Spurenleser** (Hinweise + Codes)
- **Codeknacker-Logik analog Safari-Tier-4:**
  - Lösungswörter müssen ECHTE WÖRTER sein (nicht erfundene Buchstaben-Salate wie ELZA/FEK)
  - Vorschlag: SCHATZ / INSEL / KOMPASS (oder ähnliche eindeutige Pirate-Wörter) mit eindeutigen Sortier-Regeln
- **Anerkennung ohne Tempo:** "Beobachtungs-Spezialist" oder "Detail-Navigator" (NICHT "1. Pirat" / "schnellste Crew")
- **Wow-Variante:** Schatzsuche-Quest auf der Insel, optional mit Schlafparty-Anschluss
- **Vermeiden:** Verkindischende Anredung ("kleiner Pirat"), Marketing-Sound ("Sweet Spot", "emotional wertvollsten")

## Pflicht-Schema (analog safari-gross, Score 95)

Struktur identisch zu safari-gross.json. Spezifisch:
- `motto: "piraten"`, `ageGroup: "gross"`, `ageRange: [9,12]`
- 3 variants mit `estimatedCostEur` realistisch (Vorschlag: 45 / 95 / 145 — analog Safari aber Piraten-spezifisch anpassen)
- preparationWeeks 6 + sosScenarios 8 (9-12-spezifisch: "handy_abdriften", "codeknacker_frust", "kuchen_misslungen", etc.)
- shoppingList[].category gesetzt
- **signatureRitual: "Die Crew-Aufnahme & Schatzkarten-Übergabe"** mit echtem Rollen-System (Navigator/Quartiermeister/Spurenleser)

## Game-Schema (steps[] PFLICHT, ≥4 Schritte pro Spiel)

```json
{
  "name": "...",
  "indoor": true, "outdoor": true,
  "duration": "20 Min.",
  "minAge": 9,
  "loudness": "leise|halblaut|laut|konzentriert",
  "effort": "leicht|mittel|aufwendig",
  "material": "...",
  "prepText": "...",
  "steps": [{"n":1,"name":"...","content":"max 120c"}] x 4-7,
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

- **pflicht:** Lebensmittel (Kuchen, Schorle, Wraps), Schatzkarten-Material (Papier, Tinte), Schatzkisten-Vorlage, Augenklappen-Set
- **sinnvoll:** Piraten-Bandanas, Spezialisierungs-Patches (Navigator/Quartiermeister/Spurenleser), Kompass-Repliken, LED-Stirnlampen für Schatzsuche-im-Dunkeln (Wow)
- **habIchVielleicht:** Aufblasbares Piraten-Schiff (Pinterest-Maximum), Mini-Piratenfiguren (eher für jüngere Geschwister), Walkie-Talkies für Crew-Funk

## Erforderlich für Codeknacker (analog Safari-Tier-4)

3 Codeknacker-Quadranten mit echten Wörtern:
- **Navigator-Quadrant → Lösungswort SCHATZ** (oder ähnlich, mit eindeutiger Sortier-Regel z.B. nach Koordinaten/Karten-Position)
- **Quartiermeister-Quadrant → Lösungswort INSEL** (oder ähnlich, z.B. nach Wert-Hierarchie der Schatz-Items)
- **Spurenleser-Quadrant → Lösungswort KOMPASS** (oder ähnlich, z.B. nach Pfad-Reihenfolge der Hinweise)
- Eingebauter Selbst-Check: "Wenn kein echtes Wort → Regel falsch angewendet"

## Output

Vollständige `piraten-gross.json` als Artifact mit Download-Button. Self-Score ≥85 anpeilen (Ziel: gleiche Detailtiefe wie safari-gross Score 95).

## Anti-Patterns

- TODO-Marker
- Pseudo-Wörter als Codeknacker-Lösung (wie das ELZA/FEK-Problem aus Safari-Tier-1)
- "1. Pirat"-Stempel (Tempo widerspricht Hero-Botschaft)
- Verkindischende Sprache / Marketing-Sound
- Gleiche Codeknacker-Logik wie Safari (Story muss Piraten-spezifisch sein)
