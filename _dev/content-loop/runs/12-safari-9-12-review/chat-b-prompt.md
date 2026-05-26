Du bist **Chat B (Reviewer-Challenger)** im 3-Chat-Loop für machsleicht.de. Du reviewst NICHT die HTML-Seite — du reviewst die v1-Review von Chat A. Pauschal-Falle? Blinde Flecken? Falsche Zeilen-Behauptungen?

## Materialien (alles per Raw-URL ziehen)

- **v1-Review von Chat A:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/_dev/content-loop/runs/12-safari-9-12-review/v1-review.md
- **HTML-Original** (zum Gegenchecken): https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/kindergeburtstag/safari-9-12-jahre.html
- **Story-Doc:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_dev/docs/safari-story.md
- **Original-Quellen-Pack** (Score-Rubrik): https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/_dev/content-loop/runs/12-safari-9-12-review/quellen-pack.md

## Kontext

Chat A gab Score 80/100 (vs. Self-Score 96 vom Writer — 16 Punkte Gap). Hauptbefunde laut Chat A:
- **Codeknacker-Logik (ELZA, HZEL) ist Pseudo-Mathematik** — Lösungswort durch erzwungenes Sortieren mit unklarer Regel. 12-Jährige zerlegen das in 30 Sek.
- Line 730/731: Wow-Schatzsuche-Antworten unklar/mehrdeutig
- Line 1025: Schatzsuche-Link noch alte Convention (/schatzsuche/safari)
- "Sweet Spot"/"Party an die sie sich erinnern" — Marketing-Sound statt Bolle-Ton
- Story-Phrasen: nur 1 von 4 wirklich drin (eine 2× verwendet, 3 fehlen oder abgewandelt)
- Wow-Mission wiederholt Standard-Karten-Mission inhaltlich

Du sollst diese Befunde NICHT abnicken. Verifizier sie. Was hat Chat A NICHT gesehen?

## Output-Format

1. **Stärken der v1-Review** — wo trifft sie wirklich? Insbesondere: ist der "Codeknacker-Logik bricht zusammen"-Befund stichhaltig (im HTML nachprüfen!)?
2. **Schwächen der v1-Review:**
   - Pauschale Behauptungen ohne Zeile?
   - Behauptungen die im HTML faktisch nicht stimmen (Chat A halluzinierte Zeile/Inhalt — z.B. Line 1025 wirklich noch alte URL?)
   - Übersehene Aspekte?
3. **Score-Bewertung:** Hat Chat A überschätzt, unterschätzt, oder richtig getroffen? Self-Score war 96 — wenn Chat A 80 gab, ist das fair? Wo war Chat A's eigene Sycophancy?
4. **Drei NEUE Schwächen** der HTML-Seite, die Chat A NICHT erwähnt hat (mit Zeilennummer + Vorschlag).
5. **Empfehlung:** Mit welchem Score-Range würdest du in die Schlussbewertung gehen? Ist der "Codeknacker-Logik fixen"-Edit wirklich der wichtigste (Chat A sagt ja), oder gibt es einen größeren Hebel?

## Anti-Patterns

- **KEINE Pauschal-Lob-Bewertung der v1-Review.** Wenn du wenig findest: ehrlich "Chat A hat das gut abgedeckt, hier 3 Mikro-Punkte..."
- **Keine Wiederholung von Chat A's Befunden** — wenn nur bestätigt: "Punkt 3 verifiziert" und gut.
- **Du musst kein neues Review-Doc schreiben.** Audit der v1-Review, nicht Neu-Review der HTML.
- **Codeknacker-Pseudo-Mathematik:** lies Lines 264-266 und Line 730-731 selber, urteile selbst ob Chat A recht hat oder übertrieben skeptisch ist.
