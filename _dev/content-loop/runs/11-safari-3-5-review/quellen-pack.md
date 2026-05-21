# Quellen-Pack — Stream 11 — Review Safari 3-5

## Was du machst

Du bist **Reviewer-Chat A** im 3-Chat-Loop (Writer/Reviewer/Adversarial). Modus ist **REVIEW**, nicht Neu-Schreiben. Die Datei existiert bereits (vom Sprint vor wenigen Stunden, Self-Score 91/100 mit 3 Designer-Schwächen nachgebessert).

Deine Aufgabe: harte, konkrete Review — Schwächen mit Zeilennummer + Zitat + Fix-Vorschlag. Keine pauschale Lob-Litanei.

## Input (alles per Raw-URL ziehen, kein Paste)

- **HTML zum Review:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/claude/start-leicht-v8dqS/kindergeburtstag/safari-3-5-jahre.html
- **Story-Anker:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/claude/start-leicht-v8dqS/_dev/docs/safari-story.md
- **Elite-Template (Checkliste):** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/claude/start-leicht-v8dqS/_dev/docs/ELITE-SEITEN-TEMPLATE.md
- **Golden-Template-Referenz (6-8):** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/claude/start-leicht-v8dqS/kindergeburtstag/safari-6-8-jahre.html

## Kontext (was schon bekannt ist)

Die Seite wurde von einem Subagent in v1-Writer-Modus gebaut, Self-Score 91/100. Drei Designer-Schwächen wurden danach nachgebessert:

1. **Wow-Highlight:** Plüsch-Safari-Set (30 €) → **Aufblasbares Safari-Tier-Kostüm** (~35-50 €) — konsistent mit 6-8-Filz-Buschhut-Pattern
2. **Tier-Doktor-Station** komplett ersetzt durch **🎧 Tier-Lauscher (Geräusche raten)** — Trigger-Risiko (Mullbinden bei sensiblen 3-Jährigen) raus
3. **Foto-Opt-In:** bewusst nur textlich, kein formales Opt-In

Dein Job: was der Subagent NICHT gesehen hat. Wo sind blinde Flecken? Was würde eine müde Mutter um 22:30 nicht sofort kapieren?

## Altersgruppen-Spezifika 3-5 (aus Safari-Story-Doc)

- **Rolle:** "Tier-Helfer" (NICHT Anwärter/Ranger — die kommen ab 6-8)
- Stations-Tiefe: 2-3 SEHR EINFACHE Stationen, Eltern führen aktiv
- Prüfung: keine Wertung, keine Gewinner/Verlierer
- Lizenz: Urkunde + Plüsch-Mini-Tier
- **Eltern bleiben dabei** (kein Absetzen!)
- Dauer: 2 Std max
- Snack-Mengen: 6 Kinder, 2 Std

## Score-Rubrik (100 Punkte)

| Dimension | Punkte | Was zählt |
|---|---|---|
| **Mehrwert** | 25 | Konkrete, nutzbare Inhalte. Keine Plattitüden. Konkrete Mengen, konkrete Spielanleitungen. |
| **Lesefluss** | 20 | Mama-um-22:30-Test. Keine Schul-Sprache ("es ist empfehlenswert"). Bolle-Ton: lakonisch, mama-respektierend. |
| **Konkurrenz-Differenzierung** | 20 | Was bietet diese Seite mehr als kribbelbunt/balloonas/dasbasteltdiemama? "Mehr Struktur" reicht nicht. Konkrete Anker. |
| **Schema-Korrektheit** | 15 | HowTo + FAQPage + BreadcrumbList valide JSON-LD. FAQ-Antworten matchen die `<details>`-Blöcke 1:1. |
| **Mobile-Lesbarkeit** | 10 | Erste 2 Screens (mobile) decken: Zeitplan, Kosten-Range, Versprechen. Kein endloses Vorgeplänkel. |
| **Internal-Links** | 5 | Planer, Einladung, Partyseite, Andere Altersgruppen, Schatzsuche-Generator (falls verlinkt — Safari 3-5 hat aber keine Schatzsuche-Variante per Story-Doc). |
| **CTA-Klarheit** | 5 | Sticky-Bar + sekundäre CTAs eindeutig. |

## Output-Format

Schreib deine Review als Markdown in genau 7 Abschnitten:

1. **Self-Score nach Rubrik** — Tabelle wie oben + Total. Pro Dimension 1 Satz Begründung.
2. **3 stärkste Sektionen** — Mit Zeilennummer + 1 Satz Begründung.
3. **5 schwächste Stellen** — Format: `Line XX: "Zitat" → Vorschlag: ...`
4. **Story-Konsistenz-Check** gegen safari-story.md:
   - Tier-Helfer-Rolle (kommen die Wörter überall vor wo's passt?)
   - Reservat-Sprache ("Herde" statt "Gruppe", "Pirsch" statt "draußen gehen")
   - 4 wiederverwendbare Story-Phrasen — sind welche drin?
5. **Wortverbot-Check** — Liste mit Zeilennummer falls Treffer. Verbote:
   - "in diesem Artikel", "wir alle wissen", "natürlich", "selbstverständlich", "überraschend"
   - "Beute", "Jagd", "Erlegen" (Was-NICHT-Safari)
   - Mama-Buzzword-Bingo ("engagement-fördernd", "user-zentriert", "ganzheitlich")
6. **Kosten-Konsistenz-Check:**
   - Cost-Box-Werte (Minimal/Standard/Wow)
   - Einkaufslisten-Summen — matchen?
   - FAQ "Kosten" + FAQPage-Schema — gleiche Zahlen?
7. **Empfehlung & Score-Bewertung:**
   - Falls Score ≥ 85: ready for Chat C (Adversarial)
   - Falls Score < 85: 2-3 konkrete Edits, die Score über 85 heben würden
   - Was wäre der wichtigste 1 Edit?

## Anti-Patterns (was eine SCHLECHTE Review ist)

- **Pauschal-Lob:** "Sehr schön strukturiert" — welche Zeile, warum?
- **Buzzword-Bingo:** "engagement-fördernd" — wir sind in Pragmatismus-Land
- **Generische Verbesserung:** "Mehr Beispiele wären gut" — wo genau? Welche?
- **Sycophancy:** Wenn du < 85 gibst, das STEHENBLEIBEN. Bolle braucht ehrliches Feedback.
- **Wieder neu schreiben statt reviewen** — du sollst nicht den ganzen Text neu produzieren. Du sagst, WAS geändert werden muss + Beispiel-Formulierung. Schreiben macht Chat A in der nächsten Iteration.

## Nach deiner Review (was als nächstes passiert)

- Pilot committet deine Review als `v1-review.md` auf content-loop-pipeline-Branch
- Chat B (Reviewer-Challenger) reviewt DEINE Review — ist sie pauschal? Hat sie blinde Flecken?
- Chat C (Adversarial) stellt unbequeme Fragen: "Würde eine 3-jährige diese Spielanleitung wirklich verstehen?", "Hat ein gestresster Vater Lust, das wirklich 4-Wochen-Plan-Style vorzubereiten?"
- Wenn alle drei Reviews konvergieren auf gleichen Top-3-Schwächen: Chat A bekommt v4-Edit-Auftrag in einem späteren Stream
