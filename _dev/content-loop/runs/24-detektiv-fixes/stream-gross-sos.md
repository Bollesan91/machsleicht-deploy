# detektiv-gross.json — sosScenarios ergänzen

Aufgabe: Existierende `_src/elite-motto-data/detektiv-gross.json` (Score 88) hat `sosScenarios: null` — fehlende Sektion ergänzen.

## Materialien (Raw-URL)

- **Aktuelle detektiv-gross.json:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/detektiv-gross.json
- **Vorbild safari-gross sosScenarios:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/safari-gross.json
- **Vorbild piraten-gross:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/piraten-gross.json
- **Vorbild weltraum-gross:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/weltraum-gross.json

## Pflicht: 8 sosScenarios komplett

Liefere als JSON-Patch (oder vollständige Datei) — `sosScenarios` mit GENAU 8 Szenarien:
1. `regen` — Outdoor → Indoor-Plan B
2. `weniger_kinder_als_erwartet` — Crew-Größe runter
3. `mehr_kinder_als_erwartet` — Doppel-Teams
4. `kind_will_nicht_mitmachen` — Beobachter-Rolle
5. `kuchen_misslungen` — Bäcker-Alternative
6. `spielzeug_kaputt` — Ersatz-Material
7. `ein_kind_weint` — Auszeit + ruhige Rolle
8. `eltern_kommen_frueh` — Crew-Foto / Ergebnis-Präsentation

Plus 9-12-spezifisch je nach Story (z.B. `handy_abdriften`, `codeknacker_frust` — aber falls Pflicht-8 schon füllt: andere weglassen).

Jeder Szenario: `{situation, fix, signal}` (Format aus safari-gross übernehmen).

## Output

**Komplette aktualisierte detektiv-gross.json** als Artifact mit Download. Alle bestehenden Felder unverändert + sosScenarios neu mit 8 Szenarien Detektiv-spezifisch (Verbrechen-Light-Frame).

Score-Ziel nach Fix: 90-95 (von aktuell 88).
