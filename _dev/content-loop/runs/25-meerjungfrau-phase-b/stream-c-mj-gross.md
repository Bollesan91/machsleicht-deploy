# Stream C — meerjungfrau-gross.json (Meerjungfrau 9-12 Jahre)

Quellen (Raw-URL):
- safari-gross (95), detektiv-gross (88), weltraum-gross (96), piraten-gross (90)
- Schema, HTML-Template

## Story 9-12 — Volle Tiefe

- **Setting:** Verlorenes Atlantis, Meeresgebiet kartieren, Krake als "Gegner"-Boss (nicht gruselig, sondern intelligenter Hüter)
- **Spezialisierungen** analog Safari/Piraten:
  - **Perlentaucher** (Tieftauchen, Schatz-Identifikation)
  - **Strömungs-Navigator** (Karten + Strömungs-Codes)
  - **Meeres-Biologe** (Tier-Bestimmung, Riff-Analyse)
- **Ritual:** "Die Meeres-Crew-Aufnahme & Lizenz-Übergabe"
- **Anerkennung:** "Sorgfalt-Spezialist"-Stempel
- **Wow:** Schatzsuche-Quest in Atlantis-Ruinen + Schlafparty mit Unterwasser-Sterne-Beobachtung

## KRITISCH: Codeknacker mit ECHTEN Wörtern

VOR Schreiben Math verifizieren! Vorschläge:
- **Perlentaucher → PERLE oder KORAL** (5 Items nach Tieftauch-Tiefe / Wert)
- **Navigator → MEERE oder STROM** (5 Items nach Strömungs-Stärke)
- **Biologe → KORALLE oder QUALLE** (6 Items nach Größe / Häufigkeit)

ODER kombiniere zu Pfad: PERLE → KORAL → MEERE = Weg zur Schatzkammer.

Items so wählen dass Anfangsbuchstaben + Sortier-Regel = echtes Wort. Math VORHER.

## Schema

```json
{
  "motto":"meerjungfrau",
  "ageGroup":"gross",
  "ageRange":[9,12],
  "title":"🧜‍♀️ Meerjungfrau-Kindergeburtstag — 9–12 Jahre",
  "signatureRitual":{"name":"Die Meeres-Crew-Aufnahme & Lizenz-Übergabe",...},
  "variants":[
    {"id":"minimal","estimatedCostEur":50,...},
    {"id":"standard","estimatedCostEur":100,...},
    {"id":"wow","estimatedCostEur":150,...}
  ],
  ...
}
```

## Pflicht-Details

- 11 Spiele
- steps[] avg 5+, whyItWorks 100%, eduValue 450-600c
- Spezialisierungs-Mechanik konsequent
- **sosScenarios MUST 8 Szenarien** (Detektiv-Bug nicht wiederholen!)
- Score ≥85

## Output

Komplette meerjungfrau-gross.json als Artifact mit Download-Button.

## Anti-Patterns

- Pseudo-Wörter (INSEL-Bug!)
- Verkindischung 9-12
- Gruselige Tiefsee
- "1. Meerjungfrau"-Tempo
- sosScenarios vergessen (Detektiv-Bug)
