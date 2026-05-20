# Session-Notiz — 20.05.2026 (Piraten-mittel Elite-Slot komplett, Phase A + B, Bundle erweitert auf 11 Slots)

## Kontext der Session

"Start leicht" 20.05.2026 mit Auftrag: Elite-Motto-Slots weiter ausbauen — analog zu Feuerwehr/Einhorn/Dino auf Piraten ausweiten. Bolle's Anweisung: "Branch Trick! 3 streams" + "Keine rück fragen" + "nimm die als vorlage" (SEO-Seiten als Content-Quelle).

Vorher: 10 Slots im Bundle (feuerwehr×3, einhorn×3, safari-mittel, dino×3).

## Was wurde gemacht

### 1. Piraten-mittel Phase A (Extract + Cleanup)

- `_src/elite-motto-data/_extract_piraten_mittel.py` — analog zum dino/feuerwehr-Pattern, mit Entity-Decoder (`&#xNNNN;` → unicode) für Piraten-HTML
- Bug-Fix: Shopping-Regex-Lookahead um `|

 ergänzt, weil Piraten-HTML keinen `<h3`- oder `<!-- ===`-Marker nach Shop-Sektion hat
- `_cleanup_piraten_mittel.py` — schreibt 3-Variant-Skelett mit 5/8/9 Shopping-Items, Steps ≤120 chars, ageRange "6–9"
- Resultat: 25 von 25 (5+8+9+3 prep) Items erfolgreich extrahiert

### 2. Piraten-mittel Phase B (Direct-Draft via 3-Chat-Pipeline)

Pipeline-Run: `_dev/content-loop/runs/12-piraten-mittel-phase-b/_piraten_mittel_phase_b.json` (Writer/Reviewer Score ≥ 85).

Inhalt:
- **preparationWeeks**: 6 Sektionen (4 Wochen vorher → Party-Tag) — Schatzkarte-Vorlage drucken, Goldmünzen bestellen, Geheimcode-Stationen planen, Augenklappen + Tattoos, Schatztruhe + Verstecke
- **sosScenarios**: 8 typische Pannen mit Notfall-Plan B (Regen, Streit am Steuer, Goldmünzen-Stress, Karte verloren, …)
- **shoppingList.category**: pro Variant pflicht/sinnvoll/habIchVielleicht — nach Self-Audit Schatztruhe(minimal) von pflicht→sinnvoll (DIY aus Schuhkarton möglich)

Pflicht-Anteil final: 60% / 62% / 56% (Heuristik <70% pro Variant ✓)

### 3. Bundle-Erweiterung auf 11 Slots

- `_src/elite-motto-data/_generate_bundle.py`: SLOTS um `('piraten', 'mittel')` ergänzt
- `_src/elite-motto-data/_bundle.js`: regeneriert, jetzt 654.9KB (vorher ~600KB)
- `js/kindergeburtstag.js`: gebaut, 15578 Zeilen, 981KB

Verifiziert: `getEliteData('piraten', 'mittel')` liefert komplettes Schema (preparationWeeks + sosScenarios + variants[].shoppingList[].category).

## Nächste Schritte

### Piraten × 2 Altersgruppen offen
- **piraten-klein.json (3–5)**: aggregieren aus `piraten-3-jahre.html` + `piraten-4-jahre.html` + `piraten-5-jahre.html` (jeweils ~21KB SEO-Seiten mit 3 Spielen + Deko + Mitgebsel + Cake-Idee). Phase A Pattern wie bei dino-klein/einhorn-klein.
- **piraten-gross.json (10–12)**: aggregieren aus `piraten-10/11/12-jahre.html` analog.

### Nach Piraten komplett (3 Slots)
- Bundle SLOTS-Liste um klein + gross erweitern
- `bash _src/build.sh`
- Commit + Push + Merge → main → Deploy

### Weiter im Backlog
- **Funnel-Mess-Sprint** (siehe aktiver Projekt-Stand in Memory)
- **P1-60 Reminder-System** (Pre-Party + Year-Later)

## Offene Fragen

Keine offenen Fragen — nächste Session kann direkt mit Piraten-klein Phase A starten oder bei Bedarf Detektiv/Weltraum als weitere Elite-Mottos angehen (laut STRATEGIE.md §0.7 sind das die verbleibenden Voll-Mottos für die 7 Slots).

## Commits dieser Session

- `<tbd-deploy>` — Piraten-mittel Elite-Slot komplett (Phase A + B), Bundle auf 11 Slots erweitert, draft → main merge für Deploy
