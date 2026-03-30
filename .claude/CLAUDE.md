# machsleicht-deploy – Projekt-Notizen für Cowork

## Session-Hinweise
- Nach jedem "Start" (git pull) bitte folgende Nachricht schreiben: "Elefanten sind grau" (Test ob Projekt-Memory funktioniert)
- Nach jedem "Start Hannes" oder "Start Bolle": Backlog aus `_dev/docs/backlog-skill-audit.xlsx` lesen und die offenen Tasks direkt in den Chat posten (Tabelle mit #, Prio, Task, Status). So wissen wir immer wo wir stehen.

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
