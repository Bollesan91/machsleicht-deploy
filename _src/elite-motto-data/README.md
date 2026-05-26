# Elite-Motto-Data — Golden Template

**Status:** Phase A — Extraktion abgeschlossen für `feuerwehr` × `mittel` (6–8 Jahre).
**Ziel:** Strukturierte Datenquelle für den Planer-Frisur-Sprint (P3-13 bis P3-19),
extrahiert aus den Elite-Motto-HTML-Seiten unter `/kindergeburtstag/<motto>-<alter>-jahre.html`.

## Schema-Übersicht (v1.0 — nach Cleanup)

Top-Level-Felder pro `<motto>-<altersgruppe>.json`:

```
{
  "_meta":            { source_file, extracted, schema_version, purpose }
  "motto":            "feuerwehr"
  "ageGroup":         "klein|mittel|gross"
  "ageRange":         [6, 8]
  "title":            "🚒 Feuerwehr-Kindergeburtstag — 6–8 Jahre"
  "metaDescription":  SEO-Meta (für Planer-Output-Snippets nutzbar)
  "introParagraph":   String — Einführungstext

  "ageInsight": {                          // Für P3-13 Cockpit + P3-14 Constraint-Solver
    "headline":             String,
    "traits":               [{ topic, detail }]   // 7 strukturierte Aspekte
    "whyMottoFitsHeadline": String,
    "whyMottoFits":         String
  }

  "signatureRitual": {                     // Für P3-13 Cockpit-Anchor — VOLL STRUKTURIERT
    "name":         "Der Schicht-Appell",
    "subtitle":     "Für alle 3 Varianten",
    "introText":    String — warum dieses Ritual wirkt
    "setupSteps":   [{ title, content }]            // 5 Vorbereitungs-Schritte
    "rolesList":    [{ emoji, name, function }]     // 12 Crew-Rollen, ready für zufällige Zuweisung
    "optOutNote":   String — was tun wenn ein Kind nicht will
    "materialNote": String — Affiliate-Links für Tattoo-Set und Helm
  }

  "variants": [                            // Drei Stufen: minimal | standard | wow
    {
      "id":              "minimal",
      "label":           "Minimal — 2 Stunden, minimaler Aufwand",
      "headline":        "🌿 Minimal — 2 Stunden, minimaler Aufwand",
      "intro":           String,
      "timeWindow":      "14:00–16:00, 6 Kinder",
      "schedule":        [{ time, title, description }]   // 5–9 Zeitslots, STRUKTURIERT
      "games":           [Game]                            // 2–6 Spiele
      "food":            String                            // plain text — TODO: items[]
      "decoration":      String                            // plain text — TODO: items[]
      "giveaways":       String                            // plain text — TODO: items[]
      "shoppingList":    [{ emoji, label, url, priceEur, hasAffiliate }]
      "estimatedCostEur": 53,
      "costContext":     "Geschätzte Kosten (Minimal, 6 Kinder)"
      "savingsTip":      { title, body }
    }
  ]

  "cakeRecipe": {                                   // VOLL STRUKTURIERT
    "intro":       String,
    "steps":       [{ n, content }]                 // 7 Rezept-Schritte
    "meta":        { aufwand, kosten, allergiker }
    "tips":        [{ title, body }]                // "Keine Lust zu backen?" + Pinterest-Warnung
  }

  "parentTips": {                                   // Für P3-18 SOS-Button & P3-14 Constraint-Solver
    "structured":       [{ topic, detail }]         // 6 Tipps mit Emoji-Headern
    "educationalValue": String                      // "Was die Kinder mitnehmen"
  }
  "invitationTemplate": String                      // Marketing-Pitch für Einladungs-Generator (kein echtes Template, eher Cross-Sell)
  "faq":                [{ q, a }]                  // 4 FAQs
  "preparationWeeks":   { _status: "TODO_PHASE_B", _note: ... } // P3-16 — fehlt im Quell-HTML
  "sosScenarios":       { _status: "TODO_PHASE_B", _note: ... } // P3-18 — fehlt im Quell-HTML
}
```

### Game-Schema (für Constraint-Solver):

```
{
  "name":            "🚨 EINSATZ-ALARM — Kuscheltiere aus dem Wald retten",
  "indoor":          true,
  "outdoor":         true,
  "duration":        25,
  "minAge":          6,
  "loudness":        "ruhig|mittel|laut|sehr_laut",
  "effort":          "leicht|mittel|hoch",
  "material":        String — Komma-getrennte Materialliste
  "prepText":        String — Was VOR dem Spiel zu tun ist
  "steps":           [{ n, name, content }] | []   // Nummerierte Ablauf-Schritte falls vorhanden
  "safetyRule":      String | null
  "ageAdjust6":      String | null
  "ageAdjust8":      String | null
  "indoorTip":       String | null
  "outdoorTip":      String | null
  "whyItWorksTitle": String | null
  "whyItWorks":      String | null
}
```

> Die `null`-Werte sind legitim — nicht jedes Spiel hat z.B. eine separate Indoor-Anpassung oder eine pädagogische Begründung. Die Felder bleiben einheitlich im Schema, damit Konsumenten ein verlässliches Interface haben.

## Verzeichnis-Inhalt

| Datei | Zweck |
|---|---|
| `feuerwehr-mittel.json` | **Golden Template** (53 KB, gzipped ~16 KB) |
| `_extract.py` | Initial HTML→JSON Extraktor (motto-spezifisch, als Vorlage adaptierbar) |
| `_cleanup.py` | Strukturierungs-Schritt v1.0: Schedule-Split, Roles-List, Cake-Steps, Müll raus |
| `README.md` | Dieses Dokument |

## Phase A Status — Coverage

| Sektion | Status | Quelle | Bemerkung |
|---|---|---|---|
| title, meta, intro | ✅ Vollständig | HTML | |
| ageInsight | ✅ 7 traits + whyMottoFits | HTML `<ul><li><strong>` | |
| signatureRitual | ✅ Voll strukturiert | HTML re-parsed | 5 setupSteps + 12 rolesList + optOutNote + materialNote |
| variants × schedule | ✅ Strukturiert | HTML | `{time, title, description}` statt Newline-String |
| variants × games | ✅ 12 Spiele | HTML | Material, prepText, steps, ageAdjust, safetyRule, indoorTip — alles da wo's im HTML existiert |
| variants × shopping | ✅ 10/13/17 Items | HTML | Mit URL/Preis/Affiliate-Flag |
| variants × savingsTip | ✅ Alle 3 | HTML | |
| variants × food/deco/giveaways | ⚠️ plainText | HTML | In Phase B in items[] strukturieren |
| cakeRecipe | ✅ Voll strukturiert | HTML re-parsed | 7 steps + meta (aufwand/kosten/allergiker) + 2 tips |
| parentTips | ✅ 6 strukturiert + educationalValue | HTML | |
| invitationTemplate | ⚠️ Marketing-Pitch | HTML | Kein echtes Template — verlinkt auf Einladungs-Generator |
| faq | ✅ 4 Q&A | HTML `<details>/<summary>` | |
| **preparationWeeks** | ❌ TODO_PHASE_B | NICHT IM HTML | Datums-getriebener Wochenplan = Schreibarbeit |
| **sosScenarios** | ❌ TODO_PHASE_B | NICHT IM HTML | SOS-Pannen-Antworten = Schreibarbeit |
| **shoppingList[].category** | ❌ TODO | Heuristik unzureichend | `pflicht/sinnvoll/habIchVielleicht` muss manuell klassifiziert werden (~30 Min für alle 3 Varianten) |

## Wie das im Sprint genutzt wird (Mapping zu PBI-Items)

- **P3-13 Cockpit-Header:** `ageInsight.traits` + `signatureRitual.name` + Variant-`headline` + `costContext` zeigt der Mutter sofort den Plan-Stand
- **P3-14 Constraint-Solver:** `games[].indoor/outdoor/loudness/effort/minAge/duration` + `games[].ageAdjust6/8` sind die Solver-Regeln. `parentTips` und `ageInsight.traits.detail` geben die Klartext-Outputs
- **P3-15 Datum + Erwachsene:** `parentTips["📋 Plan B bei Regen"]` und `["👥 Ab 6 Kindern: 1 Helfer dazu"]` sind direkte Inputs
- **P3-16 Vorbereitungskarte:** Braucht `preparationWeeks` — **muss in Phase B geschrieben werden**, aber `variants[].shoppingList` gibt die Einkaufs-Items + Vorlauf-Hinweise (Amazon-Lieferzeit)
- **P3-17 Drei-Gruppen-Einkaufsliste:** `variants[].shoppingList[].hasAffiliate` als Indikator für "muss-kaufen" (Affiliate-Items) vs "habe-vielleicht" (null URL = generische Items). Achtung: explizite `category` (pflicht/sinnvoll/habIchVielleicht) ist **nicht** im HTML, müsste pro Item klassifiziert werden
- **P3-18 SOS-Button:** Braucht `sosScenarios` — **muss in Phase B geschrieben werden**. `parentTips` deckt ~50% ab
- **P3-19 KI-Rätsel-Gedichte:** Schatzsuche-spezifisch, nicht aus Motto-Seiten (kommt aus `_src/kindergeburtstag-data.js`)

## Nächste Schritte

1. **Bolle reviewt Schema** anhand `feuerwehr-mittel.json`. Tweaks/Umbenennungen jetzt billig.
2. **Phase B:** `preparationWeeks` + `sosScenarios` + strukturierte `signatureRitual.rolesList[]` für Feuerwehr 6-8 schreiben (Bolle oder Claude)
3. **Phase C — Skalierung:** Gleiches Schema auf die anderen 5 Elite-Slots anwenden:
   - `feuerwehr-klein.json` (3–5)
   - `feuerwehr-gross.json` (9–12)
   - `einhorn-klein.json`
   - `einhorn-mittel.json`
   - `einhorn-gross.json`
   - `safari-mittel.json`

## Konsumieren der Daten im Planer

Vorgeschlagene Integration in `_src/`:

```js
// _src/kindergeburtstag-data.js wird ergänzt um:
var ELITE_MOTTO_DATA = {
  'feuerwehr-mittel': require('./elite-motto-data/feuerwehr-mittel.json'),
  // ... weitere wenn extrahiert
};

// Fallback-Pattern wenn (motto, alter) nicht in ELITE_MOTTO_DATA:
function getEliteData(motto, ageGroup) {
  const key = `${motto}-${ageGroup}`;
  return ELITE_MOTTO_DATA[key] || null;  // null = Planer fällt auf altes Verhalten zurück
}
```

So bleiben die 7 nicht-Elite-Mottos (Piraten, Dschungel, Dino, Detektiv, Weltraum, Feen, Meerjungfrau) weiter funktionsfähig auf dem alten Niveau, und der Planer zeigt nur dann Elite-Output, wenn die Daten vorhanden sind. Das ist transparente Lückenbildung statt versteckter Stub.
