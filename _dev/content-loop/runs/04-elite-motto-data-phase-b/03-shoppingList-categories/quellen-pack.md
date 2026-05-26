# Quellen-Pack — Stream 04.03 — `shoppingList[].category` für Feuerwehr 6-8

## Was du machst

Du bist **Writer-Chat A** in einer 3-Chat-Pipeline (Writer / Reviewer / Adversarial). Deine Aufgabe: Klassifiziere **jedes** Item in den 3 `shoppingList`-Arrays (Minimal/Standard/Wow) von `_src/elite-motto-data/feuerwehr-mittel.json` in **eine** der drei Kategorien:

- `"pflicht"` — ohne das geht die Party in dieser Variante nicht
- `"sinnvoll"` — macht die Party deutlich besser, aber Variante funktioniert auch ohne
- `"habIchVielleicht"` — DIY-Alternative oder ohnehin in jedem Haushalt

Im Planer-UI (P3-17) werden Einkaufslisten in 3 Spalten gerendert. Eltern sehen sofort: "Muss ich kaufen vs. wäre nice vs. hab ich vielleicht schon".

## Output-Format (kritisch)

Gib am Ende deiner Antwort **genau ein** valides JSON-Objekt im folgenden Schema zurück. Kein Markdown-Wrapping um den JSON-Block.

```json
{
  "minimal": [
    { "label": "Wasserspritzpistolen (6er-Set)", "category": "pflicht", "reasoning": "1-Satz Begründung warum diese Kategorie." },
    { "label": "Feuerwehr-Tattoo-Set (30+ Motive)", "category": "pflicht", "reasoning": "..." },
    ... 10 items insgesamt
  ],
  "standard": [
    ... 13 items insgesamt
  ],
  "wow": [
    ... 17 items insgesamt
  ]
}
```

**Pflicht:**
- Genau 10 / 13 / 17 Items pro Variante (siehe Listen unten — Reihenfolge identisch zum Quell-JSON)
- `label` exakt wie im Quell-JSON (nicht umformulieren, sonst kann der Merge nicht matchen)
- `category` einer von genau drei Strings: `"pflicht"` / `"sinnvoll"` / `"habIchVielleicht"`
- `reasoning` 1 Satz max ~140 Zeichen — knapp, konkret, kein Lehrbuch

## Die zu klassifizierenden Listen (Quell-Reihenfolge, **label exakt übernehmen**)

### MINIMAL (10 items, 53 €)
1. 💧 Wasserspritzpistolen (6er-Set) — 10€ [AFF]
2. 💫 Feuerwehr-Tattoo-Set (30+ Motive) — 5€ [AFF]
3. 🚒 Mini-Feuerwehrautos (12er-Set) — 8€ [AFF]
4. 🚧 Absperrband rot/weiß (50 m) — 6€ [AFF]
5. 🫧 Rasierschaum (2 Dosen Drogerie-Eigenmarke) — 3€
6. 🥤 Apfelschorle + rote Becher — 5€
7. 🍿 Popcorn-Mais + Snacks — 5€
8. 🎂 Backmischung Kastenform + roter Zuckerguss — 6€
9. 📄 Ausmalbilder + Dienstausweis-Vorlage + Diplom — 0€
10. 🛍️ Papiertüten + Pappkarton-Helm (Bastelladen/DM) — 5€

### STANDARD (13 items, 99 €)
1. 💧 Wasserspritzpistolen (6er-Set) — 10€ [AFF]
2. ⛑️ Feuerwehr-Helme Plastik (6 Stk.) — 25€ [AFF]
3. 🚒 Mini-Feuerwehrautos (12er-Set) — 8€ [AFF]
4. 💫 Feuerwehr-Tattoo-Set (30+ Motive) — 5€ [AFF]
5. 🚧 Absperrband rot/weiß (50 m) — 6€ [AFF]
6. 🩹 Erste-Hilfe-Spielset für Station 4 — 10€ [AFF]
7. 🪢 Seilstücke + Knoten-Karte — 3€
8. 🫧 Rasierschaum (2 Dosen) — 3€
9. 🥤 Apfelschorle + rote Becher + Würstchen + Mini-Pizzen — 14€
10. 🎂 Backmischung Kastenform + roter Zuckerguss + Mini-Leiter aus Salzteig — 8€
11. 🎈 Rote Luftballons + Plakat (Wachen-Tafel) — 4€
12. 📄 Diplom-Vorlage + Dienstausweise + Knoten-Karte — 0€
13. 🛍️ Mitgebsel-Tüten + Bändchen für Diplom-Rollen — 3€

### WOW (17 items, 159 €)
1. 🌫️ Nebelmaschine + Wasserfluid — 30€ [AFF]
2. ⛑️ Feuerwehr-Helme Plastik (6 Stk.) — 25€ [AFF]
3. 💧 Wasserspritzpistolen (6er-Set) — 10€ [AFF]
4. 📌 Crew-Pins (6 Stk.) — 10€ [AFF]
5. 🚒 Mini-Feuerwehrautos (12er-Set) — 8€ [AFF]
6. 🚧 Absperrband rot/weiß (50 m) — 6€ [AFF]
7. 💫 Feuerwehr-Tattoo-Set (30+ Motive) — 5€ [AFF]
8. 🩹 Erste-Hilfe-Spielset für Station 4 — 10€ [AFF]
9. 🔍 Lupe für Brandermittlung — 3€ [AFF]
10. 🪢 Seile + Augenbinden (für Knoten + Atemschutz-Station) — 6€
11. 🫧 Rasierschaum (2 Dosen) — 3€
12. 📸 Polaroid-Film oder Sofortdruck (Rossmann/dm) — 5€
13. 🥤 Apfelschorle + Becher + Würstchen + Mini-Pizzen + Brezeln — 16€
14. 🎂 Backmischung + Zuckerguss + Wunderkerze — 9€
15. 🎈 Luftballons + Plakate (Wachen-Tafel + Ehrentafel) — 5€
16. 📄 Diplom + Dienstausweise + Verdächtigen-Karten + Fall-Akte — 0€
17. 🛍️ Mitgebsel-Tüten + Bändchen — 3€

## Klassifikations-Heuristik (Bolles Startpunkt — DARF überschrieben werden mit Begründung)

**HANDOFF-Vorschlag (musst du kritisch challengen):**
- **`pflicht`:** Lebensmittel (Kuchen-Backmischung, Apfelschorle, Brand-Brötchen/Würstchen), die motto-zentralen Items (Helme, Tattoo-Set, Wasserspritzen) und alles Druck-/Print-Material (Diplom + Dienstausweise).
- **`sinnvoll`:** Absperrband, Wachen-Tafel-Plakat, Mitgebsel-Tüten, Mini-Feuerwehrautos, Crew-Pins.
- **`habIchVielleicht`:** Pappkarton+Stifte (DIY-Helme), Kuscheltiere für EINSATZ-ALARM (kommen aus Kinder-Bestand), Pappkarton als "Krankenhaus", Springseil/Wasserschlauch.

**ABER:** `hasAffiliate=true` ist KEIN Proxy. Apfelschorle ist Pflicht ohne Affiliate, Nebelmaschine ist nur Sinnvoll trotz Affiliate.

## Entscheidungs-Regeln (verwende konsistent über alle 3 Varianten)

1. **Pflicht-Test:** Wenn man dieses Item streicht — ist die Variante als Konzept noch erkennbar?
   - Streiche Tattoo-Set in Minimal → Schicht-Appell fällt teils flach → Pflicht
   - Streiche Mini-Feuerwehrautos → Party läuft trotzdem → Sinnvoll
   - Streiche Apfelschorle → Kinder dehydrieren, Eltern beschweren sich → Pflicht
2. **habIchVielleicht-Test:** Wäre das in einem 6-jährigen-Haushalt mit hoher Wahrscheinlichkeit schon da?
   - Kuscheltiere ja (Kinder-Bestand)
   - Pappkarton ja (Müll-Bestand)
   - Wachen-Pult-Stuhl ja (Möbel-Bestand)
   - Pylonen/Schuhe ja (Schuh-Bestand)
3. **Variant-Konsistenz:** Items, die in mehreren Varianten vorkommen, sollen identische Kategorie haben — ES SEI DENN die Variante macht sie kritischer. Beispiel: "Feuerwehr-Helme Plastik" ist in Standard `pflicht` (= Variante-Defining), in Wow ggf. dasselbe.
4. **Pflicht-Inflation vermeiden:** Wenn am Ende >70% Pflicht ist, hast du wahrscheinlich zu großzügig kategorisiert. Mama mit 80€-Budget braucht klare Minimal-Pflicht-Liste.

## Quasi-Anker aus dem Schema (Game-Material gibt's woraus)

- Minimal: 2 Spiele (Zielspritzen, Schaum-Löscheinsatz) → Wasserspritzen + Rasierschaum sind die zentralen Spiel-Materialien
- Standard: +EINSATZ-ALARM + Ausbildungs-Stationen → Knoten-Seile, Erste-Hilfe-Set, Kuscheltiere
- Wow: +Nebelmaschine + Brandermittlung → Verdächtigen-Karten, Lupe, Polaroid

## Score-Rubrik (zur Selbst-Einschätzung)

| Dimension | Punkte | Was zählt |
|---|---|---|
| Klassifikations-Logik | 30 | Pflicht/Sinnvoll/habIchVielleicht-Regeln konsistent angewandt |
| Bolle-Heuristik-Treue | 20 | HANDOFF-Startpunkt eingehalten; Abweichungen begründet |
| Variant-Konsistenz | 20 | Gleiche Items über Varianten haben Logik (gleich oder begründet anders) |
| Reasoning-Substanz | 15 | Begründungen konkret, kein "ist halt so" |
| Pflicht-Inflation-Check | 15 | <70% Pflicht-Anteil pro Variante |

**Akzeptanz:** Final-Score ≥ 85.

## Workflow

1. **Jetzt:** Schreibe v1 — kompletter JSON-Block + 2-3 Sätze Self-Assessment (Score-Estimat + 1 Schwäche).
2. Reviewer-Chat B challenged → v2-Review.
3. Du → v3 mit Fixes.
4. Adversarial-Chat C: "Würdest du das deiner Schwester so geben? Wo ist Pflicht-Inflation?" → v4.
5. v5-Final.

## Anti-Patterns

- "Sicherheit ist Pflicht" → bedeutet nichts
- "Wegen Atmosphäre" → leer, gib konkrete Funktion
- Pflicht-Inflation auf 90% — Variant-Defining Items sind <50% in der Regel
- Affilate-Items pauschal als pflicht behandeln — UNABHÄNGIG vom Affilate

## Output jetzt

Schreibe v1 — alle 40 Items (10+13+17) klassifiziert mit Reasoning. Direkt los. Am Ende: Self-Assessment + Pflicht-Anteil pro Variante (z.B. "Pflicht-Anteile: Min 60%, Std 54%, Wow 47%").
