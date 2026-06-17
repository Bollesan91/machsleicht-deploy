# PLAN-ENGINE-SPEC — parametrisierter Plan-Renderer (machsleicht Wizard)

> Technische Referenz (wie WORKER-CONTRACT.md). Status: **Spec freigegeben 17.06.2026 (Bolle), Bau startet mit Piraten-Pilot.**
> Leitregel (Bolle): **Jede Wizard-Eingabe MUSS den Plan verändern.** Keine Deko-Eingaben.

## 1. Problem / Root Cause
Der bisherige `renderElitePlan()` ist ein **statischer Ersatz**: `planBody.innerHTML = <JSON-Inhalt>`. Er liest nur `state.motto` + `state.age` (+ Aufwand-Variante). Damit sterben **Zeit, Endzeit, Gäste, Ort, Spiel-Auswahl, eigene Programmpunkte** — sie werden überschrieben. Zwei aktive Widersprüche: Kopf „6 Gäste / 14:00" ↔ Body „für 8 Kinder / 15:00–17:30".
Zweit-Altlast: zwei parallele Spielquellen (hardcodierte `MOTTOS`-Spiele im Wizard ↔ Elite-JSON-Spiele) — die Picker-Auswahl floss in nichts Echtes.

## 2. Modell: 2 Sorten Eingaben
- **Matrix-Achsen (im JSON gespeichert, endlich kuratiert):** `Motto (15) × Alter (3) × Aufwand (3) = 135 Zellen`. Aufwand bleibt eine **kuratierte Achse** (Minimal/Standard/Wow = redaktionell verschieden), NICHT bloß ein Filter.
- **Laufzeit-Parameter (zur Render-Zeit auf die Zelle angewandt, erzeugen KEINE Dateien):** Ort, Gäste, Zeit/Endzeit, Spiel-Auswahl, eigene Programmpunkte.

Anti-Pattern: jede Eingabe als JSON-Dimension → Datei-Explosion (135 × 4 Orte × ∞ Gäste × ∞ Zeiten). Stattdessen: **JSON speichert skalierbare Primitive, die Engine rechnet.**

## 3. JSON-Schema v2 — „skalierbare Primitive"
Bestehende Felder (`_meta, motto, ageGroup, ageRange, title, metaDescription, introParagraph, ageInsight, faq[], cakeRecipe, parentTips, invitationTemplate, preparationWeeks[], sosScenarios[], signatureRitual`) bleiben. Geändert:

### 3a. variants[].games[] — Tags vervollständigen (Filter-Basis)
Pflichtfelder je Spiel (Elite hat die meisten schon; gemergte Wizard-Spiele nachziehen):
- `duration`: **Zahl in Minuten** (NICHT String „10 Min." — heutiger Bug in klein/gross, rendert „10 Min. Min").
- `indoor`: bool, `outdoor`: bool → **Ort-Filter**.
- `effort`: `"leicht"|"mittel"|"aufwendig"` , `loudness`, `minAge`.
- `indoorTip` / `outdoorTip`: String → **die Engine blendet je nach Ort den passenden ein** (heute authored, aber nie gerendert!).
- Voller Anleitungs-Block bleibt: `material, prepText, steps[], safetyRule, whyItWorks(+Title), ageAdjust6/8`.

### 3b. variants[].schedule[] — relativ statt fix
Heute: `{time:"15:00", title, description:"… 25 Min."}` (fixe Uhrzeit, Dauer im Text).
**v2:** `{durationMin: <Zahl>, title, desc}` — **keine Uhrzeit gespeichert**. Optional `gameRef` (Name eines Spiels) zur Kopplung an die Auswahl.
→ Engine rechnet Uhrzeiten aus `state.time`; passt proportional ins Fenster `[state.time, state.endTime]` (Logik existiert in `buildTimeline()`, wird in die Engine gezogen).

### 3c. variants[].shoppingList[] — Mengen-Regel statt fixer Stückzahl
Heute: `priceEur` = Bundle-Preis, Label „8er-Set", `costContext` hart „für 8 Kinder".
**v2:** je Item `qtyRule`:
- `{type:"perChild"}` → Menge = Gästezahl
- `{type:"perN", n:4}` → Menge = ceil(Gäste / n)
- `{type:"fixed", n:1}` → feste Menge
- `unitPriceEur` = Preis pro Einheit/Pack. Engine: `menge = f(qtyRule, guests)`, `posten = unitPriceEur × menge`.
**`costContext` wird NICHT mehr gespeichert** — die Engine berechnet `Σ posten` + `pro Kind = Σ/guests`. (Damit verschwindet der „für 8 Kinder ↔ 6 Gäste"-Widerspruch.)

## 4. Render-Engine — Verantwortlichkeiten (ersetzt `renderElitePlan`)
Eingang: Zelle (motto, age, variant) + Parameter (location, guests, time, endTime, selectedGames, customEntries).
1. **Variante** wählen (`state.eliteVariant`, Aufwand).
2. **Spiele:** Pool = `variant.games`. **Ort-Filter** (indoor/outdoor). **Auswahl** = `state.games` (toggelt, Default = alle des Pools). Render mit passendem `indoorTip`/`outdoorTip`.
3. **Schedule:** aus `variant.schedule` (relative Dauern) + `customEntries` → Uhrzeiten ab `state.time`, ins Fenster skaliert.
4. **Einkauf:** `shoppingList` mit `qtyRule × guests` → Mengen/Preise; `costContext` berechnet.
5. Rest (Kuchen, Eltern-Tipps, FAQ) unverändert übernehmen.
6. **Schatzsuche:** genau **einmal** als eigener Block — nie als „Spiel" (heute bei piraten doppelt: als v.game UND als Modul).

## 5. Wizard-Eingabe → Wirkung (Soll-Matrix, Leitregel)
| Eingabe | Wirkung |
|---|---|
| Motto / Alter | wählt Zelle (Datei) |
| Aufwand | wählt Variante |
| Ort | Spiele-Filter + Tipp; Einladung zeigt echten Ort (nicht hart „Bei uns zuhause") |
| Gäste | Einkaufsmengen + Preise + pro-Kind |
| Zeit / Endzeit | Schedule-Uhrzeiten + Fenster-Skalierung |
| Spiel-Auswahl | welche Spiele im Plan (+ perspektivisch Share/Partyseite) |
| Eigene Programmpunkte | in den Schedule gemerged |
| Name/Datum/Adresse/Nachricht/Foto | Kopf + Einladung + `/api/create`-Payload (bleibt) |

## 6. Tote Eingaben — entfernen
- `state.partyseite.slug` ('lukas7') — Worker vergibt Random-ID, Slug ignoriert. UI-Rest raus.
- `state.partyseite.{rsvp,wish,photos,chat}` — nicht im Payload, ohne Wirkung. UI-Reste raus.
- Doppelquelle `MOTTOS[].games` (hardcodiert) — nach Migration **pensionieren** (Picker liest dann Elite-Pool).

## 7. Spiele-Merge-Regel (Motto für Motto)
Elite = Basis. Aus den `MOTTOS`-Wizard-Spielen nur **additive Lücken-Füller** übernehmen (im Elite-Schema neu, mit Tags). Redundante/generische streichen. Kein Aufblähen (~5–6 starke Spiele/Alter). Sicherheits-/Mechanik-Notizen der Wizard-Version in die Elite-Fassung portieren. Pilot-Entscheid piraten siehe SESSION-NOTES.

## 8. Gate — angepasster Helfer V4.1 (pro Motto + für die Engine)
- **Stufe 0:** `_dev/LEKTIONEN.md` lesen (L1–L5). Primitive-Mathe vor dem Schreiben durchdenken.
- **Stufe 1 (deterministisch, 0 FAIL):** JSON valide + Schema-v2-vollständig; `duration` numerisch; jede shoppingList-URL plain `&tag=machsleicht21-21`; **Skalier-Unit-Tests**: Schedule summiert ins Fenster, Einkauf skaliert mit Gästen, `minAge ≤ Gruppe`; Render-Kontrakt (Engine liest exakt die v2-Felder); `node --check` für Wizard/Worker.
- **Stufe 2:** EINE unabhängige Review-Welle = frischer **claude.ai-Tab, Opus 4.8 Hoch** (Fable 5 wenn verfügbar), Bolle-Device, target-blind. **Kein Subagent, kein WebFetch.** Für Code: Engine-Logik + Edge-Cases (leeres Fenster, 0 Spiele nach Filter, 1 Gast) reviewen lassen.
- **Stufe 3:** Jedes Finding gegen Primärquelle/Code verifizieren; Diff-Re-Check; **Browser-Smoke**: Wizard live durchklicken und beweisen, dass JEDE Eingabe (Ort/Gäste/Zeit/Auswahl/Programmpunkt) den Plan ändert.

## 9. Rollout
1. **Piraten-Pilot:** 3 Dateien → Schema v2 (inkl. Wizard-Merge) + Engine bauen + tote Eingaben raus → Gate → Deploy → Live-Verify. = Referenz.
2. **Motto für Motto (14):** nur noch Daten in Schema v2 + Spiele-Merge, je mit Bolle-Kurz-OK auf den Pool. Engine steht dann.
