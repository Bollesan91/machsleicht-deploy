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

## 3. WICHTIG: Engine leitet Primitive aus v1 ab — KEIN Massen-Rewrite
**Befund 17.06.:** Die 45 Dateien sind nicht schema-einheitlich (piraten + Original-13 reich mit signatureRitual/rolesList/savingsTip/categoryReasoning, `duration` als String „10 Min.", fixe `time`-Uhrzeiten; superheld/prinzessin schlanker). Ein v1→v2-Handrewrite aller 45 wäre riesig und fehleranfällig.

**Stattdessen: die Engine parametrisiert die VORHANDENEN v1-Daten zur Laufzeit.** Damit gehen alle toten Eingaben für alle 15 Mottos auf einmal an, ohne Daten-Migration:
- **Zeit/Endzeit:** Engine liest die vorhandenen `schedule[].time`-Strings → leitet relative Dauern ab (Delta zum nächsten Eintrag) → skaliert ins Fenster `[state.time, state.endTime]` (Logik aus `buildTimeline()`). Keine Datenänderung.
- **Dauer:** Engine parst `duration` (String „10 Min." ODER Zahl). Keine Datenänderung (Bug verschwindet im Renderer).
- **Ort:** `indoor`/`outdoor` + `indoorTip`/`outdoorTip` sind schon da → filtern + einblenden. Keine Datenänderung.
- **Gäste:** Engine liest Basis-Kinderzahl aus `costContext`/`estimatedCostEur` → skaliert Mengen/Preise proportional, rechnet `costContext` neu. Keine Datenänderung (für Grob-Skalierung).
- **Spiele/Auswahl:** Engine liest `variant.games` → Picker toggelt. Keine Datenänderung.

**Optionale Präzisierung (additiv, nicht Pflicht):** `qtyRule` je shoppingList-Item für exakte statt proportionale Gäste-Skalierung — kann pro Motto später nachgezogen werden; Engine fällt ohne `qtyRule` auf die Heuristik zurück.

→ **Daten-Arbeit reduziert sich auf den redaktionellen Spiele-Merge pro Motto** (Wizard-Klassiker in den Elite-Pool, Tags vervollständigen). Kein mechanischer Schema-Rewrite.

### (Referenz) Ziel-Primitive, falls doch additiv ergänzt
Bestehende Felder bleiben. Optionale v2-Ergänzungen:

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

## 9. Rollout (korrigiert)
1. **Engine zuerst** (motto-unabhängig): parametrisierter Renderer über die vorhandenen v1-Daten + tote Eingaben raus + Picker→Pool. Lichtet Ort/Zeit/Gäste/Auswahl/Programmpunkte für **alle 15 Mottos auf einmal** auf. Gate → Deploy → Live-Verify am Piraten. = Referenz.
2. **Spiele-Merge Motto für Motto** (redaktionell): Wizard-Klassiker in den Elite-Pool, je mit Bolle-Kurz-OK. Optional `qtyRule` nachziehen. Kein Schema-Rewrite.

---

## 10. V3 — GENERATIVER Tagesplan (beschlossen 19.06.2026, Bolle)

> **Entscheidung:** Variante **B** (generativ) statt **A** (kuratierter `schedule` pro Zelle). Grund: A hält die Zwei-Quellen-Ursache (Tagesplan-Array ↔ games-Array) und erzeugt damit dauerhaft Doppelung/Kollision (Befund-Session 19.06.). B entfernt die zweite Quelle: **die Engine ERZEUGT den Tagesplan aus dem getaggten Spiel-Pool + Standard-Beats.** Ein Engine-Fix lichtet alle 15 Mottos auf einmal.

### 10.1 Leitsatz
**Der Plan ist EINE geordnete Liste `activities[]`, zur Laufzeit GENERIERT.** Es gibt kein gespeichertes `schedule[]` mehr (deprecated, von der Engine ignoriert; später aus den JSONs entfernbar). Einzige Datenquelle für Spiele = `variant.games[]` (bereits getaggt).

### 10.2 Activity-Schema (Laufzeit, in `state.plan.activities`)
`{ id, kind:'beat'|'game'|'schatz'|'custom', title, emoji, durationMin, anchor?, gameName? }`
- `beat` = Engine-Standardpunkt (Ankommen, Kuchen, Abholung) — Konstanten, NICHT aus Daten.
- `game` = gewähltes Spiel; `gameName` referenziert das Pool-Objekt für die aufklappbare Anleitung (Quelle bleibt `variant.games`, NICHT kopiert → Datenfixes bleiben wirksam).
- `schatz` = Schatzsuche-Modul, **genau einmal** (eigener Render, kein Pool-Spiel — L6-Dedup).
- `custom` = User-Punkt; `durationMin` + Position, **keine Uhrzeit**.

### 10.3 Generierung (`buildPlan(d, v, params)`)
1. **Spiele wählen:** Pool = `v.games` → Ort-Filter (`indoor`/`outdoor` vs `state.location`) → nach Tags sortieren → Anzahl je Aufwand (L6: minimal ≥3 · standard 4–5 · wow 5–6; gross = Quest zählt als 1).
2. **Beats setzen (Konstanten):** `Ankommen & Verkleidung` (Start) · `Kuchen & Pause` (~Mitte) · `Mitgebsel & Abholung` (Ende). Optional `v.signature.{opener,closer}` als winziger Flavor-Hint (ein Feld, kein Schedule).
3. **Pacing-Regeln (der „gute Bogen"):** Start ruhig (Ankommen/Aufwärmen) → danach **laut/leise abwechseln, nie zwei laute hintereinander** → Schatzsuche als ein Mittel-Block → Kuchen nach ~50–60 % der Aktivzeit → ruhiger Ausklang vor Ende → Abholung. (`loudness`/`effort`-Tags steuern die Sortierung.)
4. **Zeiten RECHNEN:** `start = state.time`; jede Aktivität bekommt `time = start + Σ durationMin`, das Ganze proportional ins Fenster `[state.time, state.endTime]` skaliert. **Keine gespeicherten Zeiten → keine Kollision.**

### 10.4 Editieren = an der EINEN Liste (eine Stelle)
Pro Zeile: **× entfernen · ↑↓ umsortieren.** „+ Eigener Punkt" = `custom`-Block an Position. „+ weiteres Spiel" = ungenutztes Pool-Spiel einfügen. **Min. 1 Spiel.** Kein zweiter Schalter, kein `eliteOff`.

### 10.5 Design-Fallen — vorab entschieden (nicht mitten im Bau entdecken)
- **Snapshot vs. Quelle:** `state.plan` speichert die **Struktur/Reihenfolge + Custom-Punkte**, aber Spiel-**Inhalte** werden bei jedem Render frisch aus `v.games` per `gameName` geholt → **Datenfixes bleiben wirksam**, kein eingefrorener Inhalt. Bei Motto-/Alter-/Varianten-Wechsel wird `state.plan` neu generiert (alte Edits verfallen — gewollt, andere Spielmenge).
- **Kuratierung schützen:** **Ankommen bleibt erste, Abholung letzte** Aktivität (nicht raus-/umsortierbar). Alles dazwischen frei editierbar. Verhindert kaputt-editierte Pläne, ohne zu gängeln.
- **Nicht-uniforme Blöcke:** Schatzsuche + Kuchen-Rezept bleiben eigene Render-Bausteine (referenziert aus der Liste, aber eigener Look). Die „alles uniform"-Eleganz hat diese bewusten Ausnahmen.

### 10.6 Rollout
**Piraten-Pilot zuerst** (Engine generativ in `renderElitePlan`, `schedule`-Konsum raus, `eliteOff`/Inline-Toggle raus). Verify am echten Piraten-Render + Helfer-Gate (Stufe 0–3). Wird der generierte Plan so gut wie der handgeschriebene → **generalisiert gratis** auf alle 15 (alle haben den getaggten Pool). Erst dann `schedule[]` aus den Daten entfernen (additiv, später).
