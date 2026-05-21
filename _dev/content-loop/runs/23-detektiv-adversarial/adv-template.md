# Adversarial Re-Review — Detektiv Phase-B JSONs

Du bist **Chat C (Adversarial-Reviewer)**.

## Stream
- **A:** detektiv-klein.json (3-5)
- **B:** detektiv-mittel.json (6-8)
- **C:** detektiv-gross.json (9-12)

## Materialien (Raw-URLs)
- Detektiv: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/detektiv-{klein|mittel|gross}.json
- Safari (Vorbild): https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/safari-{klein|mittel|gross}.json
- Piraten + Weltraum: analog
- Schema: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/README.md
- HTML-Template: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/kindergeburtstag/detektiv-{3-5|6-8|9-12}-jahre.html

## Score-Rubrik (100 Punkte)

| Dimension | Punkte | Was zählt |
|---|---|---|
| Inhaltliche Tiefe | 30 | Konkrete Spielanleitungen, Detektiv-Mechaniken konkret |
| Schema-Vollständigkeit | 20 | preparationWeeks 6, sosScenarios 8, shoppingList[].category, steps[] 4-6, whyItWorks |
| Story-Konsistenz | 15 | Detektiv-Anker (Lupe/Spuren/Verdächtige/Verbrechen-Light) altersgerecht |
| Konkurrenz-Differenzierung | 15 | Detektiv-spezifische Mechaniken |
| Bolle-Ton | 10 | Lakonisch, keine Schul-Sprache |
| Schema-Korrektheit | 10 | Valid JSON, motto/ageGroup/ageRange |

## Spezifische Checks

**A (3-5):** KEINE gruseligen Verbrechen, Mini-Detektiv altersgerecht, Lupe-Identität klar
**B (6-8):** Detektiv-Schwur sinnvoll, leichte Codes echte Wörter (JAGD/SPUR), Brücke klein↔gross
**C (9-12) KRITISCH:** Codeknacker INDIZ/MOTIV/BEWEIS mathematisch verifizierbar, Spezialisierungen konsistent, Sorgfalt-Spezialist statt Tempo

## Output (6 Sektionen)

1. Score-Tabelle + Total
2. 3 stärkste Aspekte
3. 5 schwächste Stellen + Fix
4. Story-/Schema-Konsistenz vs Safari/Piraten/Weltraum
5. Verdict ≥85 ready?
6. Vergleich zu Safari/Piraten/Weltraum gleicher Altersgruppe

## Anti-Patterns
- Pauschal-Lob
- Sycophancy
- INSEL-Bug-Wiederholung übersehen
