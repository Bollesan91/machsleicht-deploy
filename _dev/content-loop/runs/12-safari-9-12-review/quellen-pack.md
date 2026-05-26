# Quellen-Pack — Stream 12 — Review Safari 9-12

## Was du machst

Du bist **Reviewer-Chat A** im 3-Chat-Loop (Writer/Reviewer/Adversarial). Modus ist **REVIEW**, nicht Neu-Schreiben. Die Datei existiert bereits (vom Sprint vor wenigen Stunden, Self-Score 96/100).

Deine Aufgabe: harte, konkrete Review — Schwächen mit Zeilennummer + Zitat + Fix-Vorschlag. Self-Score 96 ist ein Sycophancy-Verdacht — Score nach unten zerstören wenn es nicht hält.

## Input (alles per Raw-URL ziehen, kein Paste)

- **HTML zum Review:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/claude/start-leicht-v8dqS/kindergeburtstag/safari-9-12-jahre.html
- **Story-Anker:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/claude/start-leicht-v8dqS/_dev/docs/safari-story.md
- **Elite-Template (Checkliste):** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/claude/start-leicht-v8dqS/_dev/docs/ELITE-SEITEN-TEMPLATE.md
- **Golden-Template-Referenz (6-8):** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/claude/start-leicht-v8dqS/kindergeburtstag/safari-6-8-jahre.html

## Kontext (was schon bekannt ist)

Die Seite wurde von einem Subagent in v1-Writer-Modus gebaut, Self-Score 96/100. Wesentliche Highlights die der Subagent als stark sah:
- **Spezialisierungs-Logik** (Späher/Tierfotograf/Spurenleser mit `.spec-grid`-CSS-Block)
- **Codeknacker-Station** mit 3 spezialisierungs-spezifischen Rätseln + Lösungswort
- **Wow-Schlafparty-Anschluss** mit Nacht-Safari (Stirnlampen + Eltern-Opt-In)

Bereits nachgebessert: Schatzsuche-Links auf Generator-Convention umgestellt (`/kindergeburtstag?modus=schatzsuche&motto=safari` statt `/schatzsuche/safari`), 4 Stellen.

Eine Self-Audit-Schwäche stand noch: Foto-Quest hat keinen formalen Opt-In, nur 3× textliche Erinnerung. User-Entscheidung: textlich reicht (Folge-PBI für Einladungs-Vorlage nicht angelegt).

Dein Job: was hat der Subagent NICHT gesehen? Self-Score 96 ist verdächtig. Wo ist Sycophancy?

## Altersgruppen-Spezifika 9-12 (aus Safari-Story-Doc)

- **Rolle:** "Reservat-Expedition" mit echter Spezialisierung
- Stations-Tiefe: 5+ Stationen, **Wahl-Reihenfolge** (Kinder wählen Route)
- Prüfung: echte kognitive Aufgaben (Karte entschlüsseln, Spur lesen, Tier identifizieren)
- Lizenz: nach Spezialisierung
- **Eltern:** Beobachter, nicht Co-Spieler — können absetzen ab 9 (Abholzeit klären)
- Dauer: 4 Std (Schlafparty optional)
- Snack-Mengen: 10 Kinder, 4 Std
- Strategie-Tiefe: **9-12 langweilt sich bei Topfschlagen**. Sie wollen Rätsel, Codes, Teamwork
- Anschluss Schatzsuche-Generator (`/kindergeburtstag?modus=schatzsuche&motto=safari`)

## Score-Rubrik (100 Punkte)

| Dimension | Punkte | Was zählt |
|---|---|---|
| **Mehrwert** | 25 | Konkrete, nutzbare Inhalte. Keine Plattitüden. Codes, Rätsel, Spezialisierungs-Mechaniken konkret beschrieben. |
| **Lesefluss** | 20 | Mama-um-22:30-Test. Bolle-Ton: lakonisch, kein Schul-Deutsch. |
| **Konkurrenz-Differenzierung** | 20 | **Höchster Hebel bei 9-12.** Konkurrenz ist hier am stärksten. Was hat machsleicht? Spezialisierungs-Logik, Codeknacker, Schlafparty-Anschluss — wirklich substantiell mehr? |
| **Schema-Korrektheit** | 15 | HowTo + FAQPage + BreadcrumbList valide. FAQ matcht `<details>`. |
| **Mobile-Lesbarkeit** | 10 | Erste 2 Screens (mobile): Zeitplan, Kosten, Spezialisierungs-Idee sichtbar? |
| **Internal-Links** | 5 | Planer, Einladung, Partyseite, Andere Altersgruppen, **Schatzsuche-Generator** (jetzt korrekte Convention). |
| **CTA-Klarheit** | 5 | Sticky-Bar + sekundäre CTAs eindeutig. |

## Spezifische Schwerpunkte für 9-12

Diese Aspekte sind die Wow-/Fail-Achsen bei 9-12 — checke sie HART:

1. **Verkindischen-Risiko:** Sind die Spiele zu einfach? "Eierlauf" ist 6-8-Material. Sind die 5 Stationen kognitiv anspruchsvoll genug? Würde ein 12-Jähriger das wirklich machen oder peinlich finden?
2. **Spezialisierungs-Mechanik:** Wird wirklich differenziert oder ist es ein Label-Trick? Macht die Spezialisierung das Spiel anders, oder kriegen am Ende alle das gleiche?
3. **Codeknacker-Tiefe:** Sind die 3 Rätsel-Beispiele konkret beschrieben, oder bleiben sie abstrakt ("Tier-Identifikations-Rätsel")? Müde Mutter muss das Rätsel umsetzen können.
4. **Schlafparty-Realismus:** Ist die Nacht-Safari-Komponente eine Bolle-Idee oder pädagogisch durchdacht? Eltern-Opt-In-Block: realistisch was abgefragt wird?
5. **Foto-Quest Datenschutz:** Self-Audit flaggte das. Sind die 3 textlichen Erinnerungen wirklich auseinanderliegend (= an verschiedenen Lese-Momenten), oder wiederholen sie sich an einer Stelle?

## Output-Format

Schreib deine Review als Markdown in genau 7 Abschnitten:

1. **Self-Score nach Rubrik** — Tabelle + Total. Pro Dimension 1 Satz Begründung.
2. **3 stärkste Sektionen** — Mit Zeilennummer + 1 Satz Begründung.
3. **5 schwächste Stellen** — Format: `Line XX: "Zitat" → Vorschlag: ...`
4. **Story-Konsistenz-Check** gegen safari-story.md:
   - Expedition-Rolle / Spezialisierung — konsequent durchgezogen?
   - Reservat-Sprache vs. generisch
   - 4 wiederverwendbare Story-Phrasen — sind welche drin?
5. **Wortverbot-Check** — Liste mit Zeilennummer falls Treffer. Verbote:
   - "in diesem Artikel", "wir alle wissen", "natürlich", "selbstverständlich", "überraschend"
   - "Beute", "Jagd", "Erlegen" (Was-NICHT-Safari)
   - Mama-Buzzword-Bingo + Schul-Sprache ("es ist empfehlenswert", "darüber hinaus")
6. **Kosten-Konsistenz-Check:**
   - Cost-Box-Werte (Minimal/Standard/Wow)
   - Einkaufslisten-Summen — matchen?
   - FAQ "Kosten" + FAQPage-Schema — gleiche Zahlen?
7. **Empfehlung & Score-Bewertung:**
   - Self-Audit war 96 — hält das? Wo ist Sycophancy?
   - Falls dein Score < 85: 2-3 konkrete Edits, die Score über 85 heben würden
   - Wichtigste 1 Edit?

## Anti-Patterns (was eine SCHLECHTE Review ist)

- **Pauschal-Lob:** "Sehr schön strukturiert" — welche Zeile, warum?
- **Sycophancy:** Wenn du < 85 gibst, das STEHENBLEIBEN. Self-Audit war 96 — wenn du auch 96 gibst ohne harte Begründung, ist das verdächtig.
- **Generische Verbesserung:** "Mehr Beispiele wären gut" — wo genau? Welche?
- **9-12-Pinterest-Falle:** "Schöne Idee, könnte man machen" — du musst beurteilen, ob 11-Jährige das wirklich machen würden ohne Augenrollen.

## Nach deiner Review (was als nächstes passiert)

- Pilot committet deine Review als `v1-review.md` auf content-loop-pipeline-Branch
- Chat B (Reviewer-Challenger) reviewt DEINE Review — Pauschal-Falle? Blinde Flecken?
- Chat C (Adversarial): "Würde dein 11-jähriger Sohn das peinlich finden?", "Wie viele dieser 5 Stationen würden wirklich 45 Min lang halten?"
- Wenn alle drei Reviews konvergieren: Chat A bekommt v4-Edit-Auftrag in späterem Stream
