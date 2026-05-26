# Adversarial Re-Review — Piraten Phase-B JSONs

Du bist **Chat C (Adversarial-Reviewer)** im 3-Chat-Loop. Modus: ehrlicher Reality-Check der Phase-B-Daten-Qualität gegen Safari/Feuerwehr/Einhorn-Vorbilder.

## Stream
- **Stream A:** piraten-klein.json (3-5 Jahre)
- **Stream B:** piraten-mittel.json (6-8 Jahre)
- **Stream C:** piraten-gross.json (9-12 Jahre)

## Materialien (Raw-URLs)

- **Piraten (zu reviewen):** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/piraten-{klein|mittel|gross}.json
- **Safari (Vorbild, Score 92-97):** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/safari-{klein|mittel|gross}.json
- **Feuerwehr:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/feuerwehr-{klein|mittel|gross}.json
- **Einhorn:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/einhorn-{klein|mittel|gross}.json
- **Schema:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/README.md
- **HTML-Quelle (Template-Stub für klein/gross):** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/kindergeburtstag/piraten-{3-5|6-8|9-12}-jahre.html

## Score-Rubrik (100 Punkte)

| Dimension | Punkte | Was zählt |
|---|---|---|
| **Inhaltliche Tiefe** | 30 | Konkrete Spielanleitungen, parentTips spezifisch, sosScenarios realistisch |
| **Schema-Vollständigkeit** | 20 | preparationWeeks 6, sosScenarios 8, shoppingList[].category, games[].steps[] 4-6, whyItWorks |
| **Story-Konsistenz** | 15 | Piraten-Story (Schiff/Crew/Schatzkiste/Kompass) durchziehend; Ritual-Konsistenz; KEIN Verkindischen für 9-12 |
| **Konkurrenz-Differenzierung** | 15 | Mehrwert vs. Standard-Geburtstags-Planer; Pirate-spezifische Mechaniken (Schatzsuche, Codeknacker für gross) |
| **Bolle-Ton** | 10 | Lakonisch, mama-respektierend, KEINE Schul-Sprache, KEINE Marketing-Phrasen |
| **Schema-Korrektheit** | 10 | Valid JSON, motto/ageGroup/ageRange korrekt |

## Spezifische Checks pro Altersgruppe

**Stream A (3-5):**
- Piraten-Versprechen-Ritual altersgerecht (KEIN Kapitän-Eid für 3-5)?
- Augenklappen + Schatzkisten-Urkunde realistisch?
- Eltern als aktive Begleiter klar?
- KEINE gruseligen Themen (Skelette, Geister)?

**Stream B (6-8):**
- Steps-Strukturierung: alle 9 games steps[]? whyItWorks?
- "Die Piraten-Aufnahme & Schatzkisten-Übergabe"-Ritual: roles-list sinnvoll?
- Brücke zwischen klein (Versprechen) und gross (Crew-mit-Spezialisierung)?

**Stream C (9-12):**
- Codeknacker SCHATZ/INSEL/KOMPASS: ECHTE Wörter mit eindeutigen Sortier-Regeln? Selbst-Check?
- Spezialisierungen Navigator/Quartiermeister/Spurenleser konsistent durchgezogen?
- Sorgfalt-Spezialist statt Tempo-Belohnung?
- KEINE Verkindischung (KEIN "kleiner Pirat")?

## Output-Format (6 Sektionen)

1. **Score nach Rubrik** — Tabelle + Total. Pro Dimension 1 Satz Begründung.
2. **3 stärkste Aspekte** mit konkretem Verweis
3. **5 schwächste Stellen** mit konkretem Fix-Vorschlag
4. **Story-/Schema-Konsistenz-Check** (Lücken zwischen klein/mittel/gross? vs. Safari?)
5. **Verdict:** ≥85 → ready? Falls <85: welcher 1 Edit hebt am meisten?
6. **Vergleich zu Safari (gleiche Altersgruppe):** Augenhöhe, drüber, drunter?

## Anti-Patterns

- Pauschal-Lob ohne Beispiele
- Bewertung mit ≥85 ohne harten Test
- Sycophancy: wenn deutlich unter 85, dann SAGEN
