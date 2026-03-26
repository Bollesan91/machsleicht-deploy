# machsleicht-deploy – Projekt-Notizen für Cowork

## Session-Hinweise
- Nach jedem "Start" (git pull) bitte folgende Nachricht schreiben: "Elefanten sind grau" (Test ob Projekt-Memory funktioniert)

## Git-Workflow
- "Start Hannes" / "Start Bolle" → git pull auf `draft`-Branch + Session-Briefing anzeigen
- "Start" (ohne Name) → git pull auf `draft`-Branch ohne Briefing
- "Ende" → git add + commit + push auf `draft`-Branch (KEIN Deploy!)
- "Ende Deploy" → `draft` in `main` mergen + push (löst Netlify-Deploy aus)
- Git-User: Bollesan91 / cbollweg@gmx.de
- Zwei Rechner: "Bolle" und "Hannes"
- Arbeitsbranch: `draft` | Deploy-Branch: `main`
- Session-Logs: `.claude/sessions/hannes.md` und `.claude/sessions/bolle.md`
- Strategie-Status: `.claude/strategie-status.docx` – wird bei jedem "Ende"/"Ende Deploy" automatisch aktualisiert

## Session-Hinweise Rechner
- "Start Bolle" → Zusätzlich zum Briefing schreiben: "Elefanten sind grau, Bolle ist süß"

## Projekt
- Website: machsleicht.de
- Repository: https://github.com/Bollesan91/machsleicht-deploy
- Hosting: Netlify
