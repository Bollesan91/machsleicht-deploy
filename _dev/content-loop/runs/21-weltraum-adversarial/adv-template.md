# Adversarial Re-Review — Weltraum Phase-B JSONs

Du bist **Chat C (Adversarial-Reviewer)**. Ehrlicher Reality-Check gegen Safari/Piraten-Vorbilder.

## Stream
- **Stream A:** weltraum-klein.json (3-5 Jahre)
- **Stream B:** weltraum-mittel.json (6-8 Jahre)
- **Stream C:** weltraum-gross.json (9-12 Jahre)

## Materialien (Raw-URLs)

- **Weltraum (zu reviewen):** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/weltraum-{klein|mittel|gross}.json
- **Safari (Vorbild Score 92-97):** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/safari-{klein|mittel|gross}.json
- **Piraten (Vorbild Score 89-96):** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/piraten-{klein|mittel|gross}.json
- **Schema:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/README.md
- **HTML-Template (Stub):** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/kindergeburtstag/weltraum-{3-5|6-8|9-12}-jahre.html

## Score-Rubrik (100 Punkte)

| Dimension | Punkte | Was zählt |
|---|---|---|
| Inhaltliche Tiefe | 30 | Konkrete Spielanleitungen, parentTips spezifisch, sosScenarios realistisch |
| Schema-Vollständigkeit | 20 | preparationWeeks 6, sosScenarios 8, shoppingList[].category, games[].steps[] 4-6, whyItWorks |
| Story-Konsistenz | 15 | Weltraum-Anker (Raumschiff/Astronaut/Planeten/Mission/Sterne) durchziehend; Ritual altersgerecht |
| Konkurrenz-Differenzierung | 15 | Weltraum-spezifische Mechaniken; Mehrwert vs. Standard-Planer |
| Bolle-Ton | 10 | Lakonisch, mama-respektierend, KEINE Schul-Sprache, KEINE Marketing-Phrasen |
| Schema-Korrektheit | 10 | Valid JSON, motto/ageGroup/ageRange korrekt |

## Spezifische Checks pro Altersgruppe

**Stream A (3-5):**
- Astronauten-Versprechen-Ritual altersgerecht?
- KEINE gruseligen Sci-Fi-Themen (Aliens-Attack, Schwarze Löcher)?
- Mini-Astronaut + Stirnband-Identität klar?
- Eltern als aktive Begleiter?

**Stream B (6-8):**
- "Astronauten-Schwur & Lizenz-Übergabe"-Ritual mit sinnvoller roles-list (Pilot/Wissenschaftler/Funker)?
- Brücke klein↔gross sichtbar?
- Steps[] strukturiert, whyItWorks gefüllt?

**Stream C (9-12) — KRITISCH:**
- **Codeknacker STERN/PLANET/MOTOR**: ECHTE Wörter mit eindeutigen Sortier-Regeln? Math VERIFIZIEREN (Anfangsbuchstaben passen)?
- Spezialisierungen Pilot/Wissenschaftler/Mechaniker konsistent?
- Sorgfalt-Spezialist statt Tempo?
- KEIN Verkindischen (KEIN "kleiner Astronaut")?
- Mission-Aufnahme-Ritual passt zur Hero-Botschaft?

## Output-Format (6 Sektionen)

1. **Score nach Rubrik** — Tabelle + Total
2. **3 stärkste Aspekte**
3. **5 schwächste Stellen** mit Fix-Vorschlag
4. **Story-/Schema-Konsistenz-Check**
5. **Verdict:** ≥85 → ready? Falls <85: welcher 1 Edit hebt am meisten?
6. **Vergleich zu Safari/Piraten gleicher Altersgruppe**

## Anti-Patterns

- Pauschal-Lob
- Bewertung ≥85 ohne harten Test
- Sycophancy: wenn <85, dann SAGEN
- INSEL-Bug-Wiederholung übersehen (Codeknacker-Math nicht prüfen)
