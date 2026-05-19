# HANDOFF — Planer-Frisur-Sprint, Phase A abgeschlossen

**Erstellt:** 2026-05-19
**Vorherige Session:** Claude.ai (Bolle + Claude)
**Ziel der nächsten Session:** Phase B starten + ggf. Skalierung auf andere Mottos

---

## TL;DR

Wir wollen den **Planer-Frisur-Sprint** (P3-12 bis P3-19 im BACKLOG-AUDIT) angehen. Der Planer-Output soll inhaltlich der Tiefe der Elite-Motto-Seiten standhalten.

**Strategie-Entscheidung getroffen:** Vor dem eigentlichen Sprint extrahieren wir die strukturierten Daten aus den 6 Elite-Motto-HTML-Seiten in JSON-Form, die der Planer dann konsumiert. Die anderen 3 Sprint-PBIs werden parallel zu der Datenextraktion entstehen.

**Was bereits getan ist (Phase A — Extraktion + Cleanup):**
- Neues Verzeichnis `_src/elite-motto-data/` angelegt mit:
  - `feuerwehr-mittel.json` (63 KB) — Golden Template für Feuerwehr 6-8 Jahre
  - `_extract.py` — HTML→JSON Extraktor (motto-spezifisch, als Template adaptierbar)
  - `_cleanup.py` — Strukturierungs-Schritt v1.0 (schedule split, roles list, cake parse, Müll raus)
  - `README.md` — Schema-Dokumentation und Sprint-PBI-Mapping
- **Aktuelle Qualität: ~75 %** — inhaltlich tief, strukturell sauber für 13 von 16 Top-Level-Feldern
- 3 von 7 Sprint-PBIs sind aktuell auf Daten-Ebene blockiert — siehe "Was noch fehlt" unten

**Was als Nächstes:**
- **Phase B:** preparationWeeks + sosScenarios + shoppingList.category für Feuerwehr 6-8 (= ~2h Arbeit, schreibend)
- **Schema-Validation:** Phase B + Bolle's Review zeigen ob das Schema trägt → erst dann skalieren
- **Phase C (später):** Skalierung auf 5 weitere Elite-Slots (Feuerwehr klein/gross, Einhorn × 3, Safari 6-8)

---

## Repository-Kontext

**Repo:** `Bollesan91/machsleicht-deploy`
**Branch:** `draft` (NICHT main — Netlify baut nur main, draft ist Arbeitsbranch)
**Worktree:** Der Stand wurde noch nicht committed — beim Session-Start als erstes die untracked-Files committen mit `[skip netlify]` (dann unten Details).

**Wichtige Pfade:**
- `_src/elite-motto-data/` — neue Datenebene (DIESE Session-Output)
- `_src/kindergeburtstag-data.js` — bestehende Planer-Daten (Schatzsuche-Stationen, alles 9 Mottos × 3 Altersgruppen, NICHT identisch mit Elite-Daten)
- `_src/kindergeburtstag.jsx` — Planer-Komponente (1513 LOC)
- `_src/build.sh` — esbuild pipeline
- `kindergeburtstag/<motto>-<alter>-jahre.html` — Elite-Motto-Quellseiten (nur 6 davon sind wirklich Elite)
- `BACKLOG-AUDIT.md` — Top-Level Sprint-Backlog (Top 10 lesen für Kontext)
- `AUDIT.md` §13/§15 — Fix-PBI-Liste + Offene Strategie-Entscheidungen
- `.claude/CLAUDE.md` — Repo-Konventionen (PBI-Impact-Check Pflicht)

**Quell-HTMLs (welche sind "Elite"):**
| Motto | klein 3-5 | mittel 6-8 | gross 9-12 |
|---|---|---|---|
| **Feuerwehr** | Elite (77k) | **Elite (99k) — extrahiert** | Elite (88k) |
| **Einhorn** | Elite (~85k) | Elite (~85k) | Elite (~85k) |
| **Safari** | Template (~22k) | Elite (~80k) | Template (~22k) |
| Piraten / Dschungel / Dino / Detektiv / Weltraum / Feen / Meerjungfrau | Template (~22k jeweils) | | |

**Elite vs. Template** unterscheidet sich nicht nur in der Wortzahl, sondern in der Struktur: Elite-Seiten haben 3 Varianten (Minimal/Standard/Wow) mit jeweils Schedule, Spielen mit `<div class="game-meta/needs/rules">`, Einkaufslisten mit Affiliate-Links und Gesamtkosten. Template-Seiten sind dünn und mit der vorhandenen `_extract.py` NICHT direkt extrahierbar — die nicht-Elite-Mottos brauchen entweder neue Elite-Versionen oder bleiben außerhalb der elite-motto-data-Datenebene.

---

## Sprint-PBI-Kontext

Die 7 PBIs des Planer-Frisur-Sprints und wie die elite-motto-data sie bedienen sollen:

| PBI | Was es macht | Daten-Bedarf | Status nach Phase A |
|---|---|---|---|
| **P3-13 Cockpit** | Nach Planer-Output: 3 Next-Step-CTAs (Schatzsuche/Einladung/Partyseite) + Plan-Übersicht | `ageInsight` + `signatureRitual` + Variant-Headline | ✅ READY |
| **P3-14 Constraint-Solver** | Filtert Spiele nach Wohnsituation/Wetter/Lautstärke | `games[indoor/outdoor/loudness/effort/minAge]` + `games[ageAdjust6/8]` + `parentTips` | ✅ READY (`whyItWorks` als nice-to-have fehlt aber meistens) |
| **P3-15 Inputs (Datum/Erwachsene)** | 2 neue Inputs im Planer für Vorschläge | `parentTips["Plan B Regen", "Ab 6 Kindern Helfer"]` | ✅ READY |
| **P3-16 Vorbereitungskarte** | Datums-getriebene Wochenliste (4 Wochen / 2 Wochen / 1 Woche / Tag X) | `preparationWeeks[]` | ❌ TODO_PHASE_B |
| **P3-17 3-Gruppen-Einkaufsliste** | Items gruppiert in pflicht/sinnvoll/habIchVielleicht | `shoppingList[].category` | ❌ Heuristik unzureichend |
| **P3-18 SOS-Button** | Bei häufigen Pannen schnelle Antworten (Regen, weniger/mehr Kinder, Kind weint) | `sosScenarios{}` | ❌ TODO_PHASE_B |
| **P3-19 KI-Rätsel** | KI-generierte Schatzsuchen-Gedichte pro Motto | Stationen aus `_src/kindergeburtstag-data.js` | N/A (nicht hier) |

**Drei PBIs blockiert auf Daten-Ebene.** Phase B löst zwei davon (P3-16 + P3-18), Shopping-Kategorisierung löst den dritten.

---

## Was im JSON drinsteckt — Schema-Übersicht

Volldokumentation: `_src/elite-motto-data/README.md`. Kurz-Übersicht:

```
{
  "_meta":              { source_file, extracted, schema_version: "1.0", purpose }
  "motto":              "feuerwehr"
  "ageGroup":           "mittel"          // klein | mittel | gross
  "ageRange":           [6, 8]
  "title":              "🚒 Feuerwehr-Kindergeburtstag — 6–8 Jahre"
  "metaDescription":    SEO-Text
  "introParagraph":     Einleitung

  "ageInsight": {
    "headline":              String
    "traits":                [{topic, detail}] × 7   // Aufmerksamkeit, Regeln, Wettbewerb, Motorik, Dauer, Essen, Eltern
    "whyMottoFitsHeadline":  String
    "whyMottoFits":          String
  }

  "signatureRitual": {                                // "Der Schicht-Appell" — VOLL strukturiert
    "name":         "Der Schicht-Appell"
    "subtitle":     "Für alle 3 Varianten"
    "introText":    Warum dieses Ritual wirkt
    "setupSteps":   [{title, content}] × 5
    "rolesList":    [{emoji, name, function}] × 12    // Max·Wachleiter, Lina·Funkerin, etc.
    "optOutNote":   Was wenn Kind nicht will
    "materialNote": Affiliate-Links Tattoo-Set + Helm
  }

  "variants": [                                        // 3 Stufen
    {
      "id":             "minimal" | "standard" | "wow"
      "label":          "Minimal — 2 Stunden, minimaler Aufwand"
      "headline":       "🌿 Minimal — ..."
      "intro":          Beschreibung
      "timeWindow":     "14:00–16:00, 6 Kinder"
      "schedule":       [{time, title, description}] × 5–9
      "games":          [Game] × 2–6                   // siehe unten
      "food":           plainText  ⚠ unstrukturiert
      "decoration":     plainText  ⚠ unstrukturiert
      "giveaways":      plainText  ⚠ unstrukturiert
      "shoppingList":   [{emoji, label, url, priceEur, hasAffiliate}] × 10–17
      "estimatedCostEur": 53 / 99 / 159
      "costContext":    "Geschätzte Kosten (Minimal, 6 Kinder)"
      "savingsTip":     {title, body}
    }
  ]

  "cakeRecipe": {                                      // VOLL strukturiert
    "intro":   String
    "steps":   [{n, content}] × 7
    "meta":    {aufwand, kosten, allergiker}
    "tips":    [{title, body}] × 2
  }

  "parentTips": {
    "structured":       [{topic, detail}] × 6        // Allergien, Plan B Regen, Helfer, Lautstärke, etc.
    "educationalValue": "Was die Kinder mitnehmen" (5-W-Regel, Fett-Brand, Rauchverhalten)
  }

  "invitationTemplate": String   ⚠ ist Marketing-Pitch für Einladungs-Generator, KEINE echte Vorlage
  "faq":                [{q, a}] × 4

  "preparationWeeks":   { _status: "TODO_PHASE_B" }   // P3-16 — fehlt im Quell-HTML
  "sosScenarios":       { _status: "TODO_PHASE_B" }   // P3-18 — fehlt im Quell-HTML
}

// Game-Schema:
{
  name, indoor, outdoor, duration, minAge, loudness, effort, material,
  prepText, steps[{n,name,content}], safetyRule,
  ageAdjust6, ageAdjust8, indoorTip, outdoorTip,
  whyItWorksTitle, whyItWorks
}
```

---

## Was noch fehlt — priorisierte Restarbeit

### 🔴 BLOCKER für Sprint — Phase B

**1. `preparationWeeks` schreiben** (~30-45 Min)
Datums-getriebener Wochenplan, 6 Zeitfenster für Feuerwehr 6-8:
- `minus4Weeks` — Einladungen verschicken, Datum festlegen
- `minus2Weeks` — RSVP einsammeln, Variante festlegen
- `minus1Week` — Amazon-Bestellung (Tattoo-Set, Helme, Wasserspritzen — Lieferung 2-5 Tage), Dienstausweise drucken
- `minus2Days` — Kuchen backen, Helme vorschneiden falls DIY
- `minus1Day` — Kuchen verzieren, Kuscheltiere für EINSATZ-ALARM verstecken, Goodie-Bags packen
- `dayOf` — Tisch decken, Sirene-Sound checken, tief durchatmen

Material liegt zum großen Teil schon in den Spiel-Daten (Material-Listen → Einkaufsfristen), in `parentTips` (Allergien-Abfrage, Helfer organisieren) und in den Einladungs-Hinweisen. Es muss aber **konsolidiert + datiert** werden, nicht copy-paste.

**2. `sosScenarios` schreiben** (~30-45 Min)
6-8 Szenarien für häufige Party-Pannen, Feuerwehr-spezifisch wo möglich:
- `regen` (Schaum-Löscheinsatz fällt aus, alles drinnen — `parentTips["Plan B bei Regen"]` ist Startpunkt)
- `weniger_kinder_als_erwartet` (Crew-Größe runter, weniger Kuscheltiere im EINSATZ-ALARM)
- `mehr_kinder_als_erwartet` (Doppel-Crew bilden, 2 Trupps parallel)
- `kind_will_nicht_mitmachen` (`signatureRitual.optOutNote` ist Startpunkt — Rolle "Disponent" zuweisen ohne Action-Druck)
- `kuchen_misslungen` (Bäcker-Kasten-Variante aus `cakeRecipe.tips`)
- `spielzeug_kaputt` (Ersatz-Rollen wie "Wachen-Tafel-Schreiber")
- `ein_kind_weint` (Tattoo aufkleben, ruhige Rolle, 5 Min raus)
- `eltern_kommen_früh` (Crew-Foto-Moment, Wachen-Tafel zeigen)

**3. `shoppingList[].category` klassifizieren** (~20-30 Min für alle 3 Varianten)
Pro Item zuweisen: `"pflicht"` | `"sinnvoll"` | `"habIchVielleicht"`. **`hasAffiliate` ist KEIN korrekter Proxy** — Apfelschorle ist Pflicht aber hat keinen Affiliate-Link; Nebelmaschine ist nur Sinnvoll aber hat einen.

Heuristik-Vorschlag (zur Diskussion mit Bolle):
- `pflicht`: Lebensmittel (Kuchen, Schorle, Brand-Brötchen), Helme (Pappkarton oder Plastik), Tattoo-Set, Wasserspritzen
- `sinnvoll`: Absperrband, Wachen-Tafel-Plakat, Diplom-Vorlage, Mitgebsel-Tüten, Mini-Feuerwehrautos
- `habIchVielleicht`: Pappkarton+Stifte (DIY-Helme), Kuscheltiere, Pappkarton als "Krankenhaus", Springseil/Wasserschlauch

### 🟡 NICE-TO-HAVE — Strukturelle Verbesserungen

**4. `food/decoration/giveaways` strukturieren** (~30 Min, parser-Arbeit)
Aktuell konkatenierte Strings ohne Trennzeichen:
```
"🎂Feuerwehrauto-Kuchen1 Kastenform\n🥤„Lösch-Wasser\"3 l Apfelschorle"
```
Soll: `[{emoji, item, quantity}]`. Im Quell-HTML sind das `<table>`-Strukturen, die der `clean_text` zerlegt hat. Im `_extract.py` einen dedizierten Table-Parser einbauen, ähnlich zum `<recipe-step>`-Parser für cake.

**5. `whyItWorks` für die Spiele systematisch nachfüllen** (~45 Min)
Aktuell fast überall `None`. Im HTML steht das pädagogische Reasoning teils unter "💡 Warum funktioniert das" oder "Tieferer Sinn" — der Regex-Marker-Matcher in `_extract.py` fängt das nicht zuverlässig. Re-Parse pro Spiel mit explizitem Lookup.

**6. `safetyRule` für die Spiele systematisch nachfüllen** (~30 Min)
Ähnlich wie whyItWorks — bei Brandermittlung (Streichholz als Beweisstück) und Schaum-Löscheinsatz (Rasierschaum-Allergien) gibt's Sicherheitshinweise im HTML, die nicht alle ankommen.

**7. `invitationTemplate` ist Müll** (~20 Min)
Aktuell ist das ein Marketing-Pitch für den Einladungs-Generator. Entweder:
- a) Feld komplett entfernen aus dem Schema (CTAs gehen ins Cockpit nicht in Daten)
- b) Durch echte Einladungs-Vorlage ersetzen (Platzhalter `{datum}`, `{uhrzeit}`, `{treffpunkt}`, `{rsvp_deadline}`, `{allergien_abfrage}`)

Empfehlung: **(a)** — verlinkt den Einladungs-Generator-CTA in P3-13 Cockpit, dort gehört's hin. Datenebene bleibt sauber.

### 🟢 SKALIERUNG (Phase C, später)

**8. Auf weitere Elite-Slots ausweiten**

Reihenfolge nach Wahrscheinlichkeits-Treffer in der Zielgruppe:
1. `einhorn-mittel.json` (gleiche Altersgruppe, anderes Genre → testet Schema-Robustheit)
2. `feuerwehr-klein.json` (gleiches Motto, andere Altersgruppe → testet Alters-Skalierung)
3. `feuerwehr-gross.json`
4. `einhorn-klein.json`
5. `einhorn-gross.json`
6. `safari-mittel.json`

Pro Slot realistisch 1,5-2,5h (Extraktor anpassen + Phase B-Inhalte schreiben). `_extract.py` ist Feuerwehr-spezifisch und braucht pro Motto-HTML Regex-Anpassungen, weil die HTML-Strukturen leicht abweichen.

---

## Wie das im Planer eingebaut wird

Vorgeschlagene Integration in `_src/`:

```javascript
// _src/kindergeburtstag-data.js ergänzen um:
var ELITE_MOTTO_DATA = {
  'feuerwehr-mittel': require('./elite-motto-data/feuerwehr-mittel.json'),
  // ... weitere wenn extrahiert
};

// Fallback-Pattern:
function getEliteData(motto, ageGroup) {
  const key = `${motto}-${ageGroup}`;
  return ELITE_MOTTO_DATA[key] || null;  // null → Planer fällt auf altes Verhalten zurück
}
```

**Wichtig:** Die 7 nicht-Elite-Mottos (Piraten, Dschungel, Dino, Detektiv, Weltraum, Feen, Meerjungfrau) bleiben auf altem Niveau funktionsfähig. Der Planer zeigt nur Elite-Output, wenn die Daten vorhanden sind. Transparente Lückenbildung statt versteckter Stub — wir lügen die Kund:innen nicht an.

---

## Bewertung des Phase A Outputs

**Aktuelle Gesamt-Qualität: ~75 %**

Bewertung in 4 Dimensionen:
- **Inhaltliche Tiefe:** 90 % — echtes Erfahrungswissen, keine generischen Tipps, Rollen tauchen kohärent durch alle Sektionen wieder auf
- **Strukturelle Sauberkeit:** 75 % — schedule/signatureRitual/cake/parentTips sind sauber strukturiert, food/decoration/giveaways sind Roh-Strings
- **Sprint-Tauglichkeit:** 60 % — 3 von 7 PBIs auf Daten-Ebene blockiert
- **Skalierbarkeit auf andere Mottos:** 70 % — Extract-Script ist Feuerwehr-spezifisch

**Was Phase B + Punkte 3 + 4 auf ~90 % bringt.**
**Was Punkte 5 + 6 auf ~95 % bringt** (Polish, nicht Sprint-blockierend).

---

## Empfohlene nächste Session

1. **Erst commiten** — der Stand ist noch untracked. Vorschlag:
   ```bash
   git add _src/elite-motto-data/
   git commit -m "feat(elite-motto-data): Phase A complete — Feuerwehr 6-8 golden template

   - Add _src/elite-motto-data/ as new data layer for Planer-Frisur-Sprint
   - feuerwehr-mittel.json: 3 variants × 12 games, structured schedule, 12-role
     signature ritual, structured cake recipe, 6 parent tips
   - Cost: 53€/99€/159€ across variants, shopping list with affiliate URLs
   - 13 of 16 top-level fields fully structured
   - preparationWeeks + sosScenarios marked TODO_PHASE_B (must be written, not in source HTML)

   [skip netlify]"
   git push origin draft
   ```

2. **Mit Bolle die Phase B-Strategie klären:**
   - Schreibt Bolle die preparationWeeks + sosScenarios selbst (im eigenen Ton) und Claude liefert Struktur-Skeletons?
   - Oder schreibt Claude initial-Drafts und Bolle editiert?
   - Oder erst skalieren auf einhorn-mittel um Schema-Robustheit zu testen, bevor wir Schreibarbeit für 6 Slots machen?

3. **Schema-Validation:** Wenn die Phase-B-Sektionen sauber im Schema landen, ist es validiert. Dann Skalierung auf andere Mottos sinnvoll.

4. **Erst nach Schema-Validation:** Punkte 4-7 (food-Parser, whyItWorks, safetyRule, invitationTemplate cleanup) — das ist Polish, blockiert aktuell nichts.

---

## Bekannte Schwächen / Risiken / Caveats

- **Steps-Parsing funktioniert nur bei expliziten `<strong>Ablauf:</strong>`-Markern.** Spiele wo das fehlt (Zielspritzen, Schaum-Löscheinsatz, Stationen, Urkunden) haben `steps: []` und alles steht in `prepText`. Das ist OK für Render, aber `prepText` ist Fließtext statt nummerierter Schritte.
- **`whyItWorks` ist überall null bei den wichtigen Spielen.** Pädagogische Reasoning-Schicht fehlt für den Constraint-Solver, der das gerne hätte. Re-Parse möglich, ist aber nicht trivial weil Marker im HTML heterogen sind.
- **Extract-Script ist nicht reusable.** Pro Motto-HTML braucht's Regex-Anpassungen. Eine wirklich generische HTML→JSON-Pipeline würde diesen Sprint sprengen.
- **Datei-Größe:** Bei 6 Elite-Slots × ~60 KB = ~360 KB JSON, gzipped ~100 KB. Im Build per `require()` einlesbar, aber Datei-Größe im Auge behalten.
- **Schema-Version v1.0.** Wenn Phase B oder Skalierung Schema-Änderungen erzwingt, version bumpen und Migration definieren.

---

## Tooling / Konventionen

- **Branch:** `draft` (NICHT main, Netlify baut nur main)
- **Commits:** `[skip netlify]` Suffix außer bei expliziten Deploy-Commits (siehe Bolle's "Ende deploy"-Trigger)
- **Validation vor Commit:** `bash validate-all.sh` (3-stage validation Pflicht laut CLAUDE.md, aber für reine Daten-Files in `_src/` weniger kritisch — checken ob es überhaupt relevant ist)
- **PBI-Impact-Check Pflicht nach jedem PBI** (CLAUDE.md §...): nach Abschluss eines PBI checken: BACKLOG-AUDIT.md updaten, AUDIT.md ggf. anpassen.
- **Git Push:** PAT liegt in Bolle's Memory (rotiert 28.04.2026 — vor Push Gültigkeit prüfen). Bei abgelaufener PAT: Bolle bitten, neue zu erstellen auf github.com/settings/tokens. Push-Pattern: `git push https://Bollesan91:TOKEN@github.com/Bollesan91/machsleicht-deploy.git draft`

---

## Quick Sanity Check für die nächste Session

Nach `cd machsleicht-deploy && git checkout draft && git pull`:

```bash
# 1. Verzeichnis sichtbar?
ls _src/elite-motto-data/
# expected: README.md _cleanup.py _extract.py feuerwehr-mittel.json

# 2. JSON valide?
python3 -c "import json; data=json.load(open('_src/elite-motto-data/feuerwehr-mittel.json')); print('OK', len(json.dumps(data)), 'chars,', len(data['variants']), 'variants,', sum(len(v['games']) for v in data['variants']), 'games total')"
# expected: OK 63xxx chars, 3 variants, 12 games total

# 3. TODO-Marker zählen
grep -c "TODO_PHASE_B" _src/elite-motto-data/feuerwehr-mittel.json
# expected: 2 (preparationWeeks + sosScenarios)
```
