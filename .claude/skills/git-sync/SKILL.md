---
name: git-sync
description: |
  Git-Synchronisierung für das machsleicht-deploy Projekt. MUSS sofort ausgelöst werden wenn der User "Start", "Start Hannes", "Start Bolle", "Ende", "Ende Deploy" oder deren Kleinschreibung schreibt (ohne weiteren Kontext). Dieser Skill hat höchste Priorität bei diesen Trigger-Wörtern.
---

# Git-Sync für machsleicht-deploy

## Trigger-Übersicht

| Trigger | Aktion |
|---|---|
| `start` / `start hannes` / `start bolle` | Git pull + Session-Briefing |
| `ende` | Commit + Push auf `draft`-Branch (KEIN Deploy!) |
| `ende deploy` | Draft in Main mergen + Push (löst Netlify-Deploy aus) |

---

## Trigger: "Start" / "Start Hannes" / "Start Bolle"

Wenn der User "Start", "Start Hannes" oder "Start Bolle" schreibt (Groß-/Kleinschreibung egal):

1. Stelle sicher, dass der Projektordner `machsleicht-deploy` als Arbeitsverzeichnis verknüpft ist (falls nicht, mit `request_cowork_directory` anfordern unter `C:\Users\Hannes\machsleicht-deploy`)
2. Führe `git checkout draft && git pull` aus, um den neuesten Stand zu holen (falls `draft` noch nicht existiert: `git checkout -b draft origin/draft` oder `git checkout -b draft main`)
3. Prüfe mit `git status`, ob alles sauber ist
4. **Session-Briefing anzeigen:** Wenn ein Rechnername angegeben wurde (hannes/bolle), lies die entsprechende Session-Log-Datei `.claude/sessions/hannes.md` oder `.claude/sessions/bolle.md` und zeige dem User:
   - Was in der letzten Session erledigt wurde
   - Was als nächstes auf der Todo-Liste steht
5. Falls nur "Start" ohne Namen geschrieben wurde: normaler Pull ohne Briefing
6. Melde dem User kurz den Status

## Trigger: "Ende"

Wenn der User "Ende" (oder "ende") schreibt – OHNE "deploy" dahinter:

1. Führe `git status` aus, um zu sehen welche Dateien geändert wurden
2. Falls es Änderungen gibt:
   - Zeige dem User kurz welche Dateien geändert wurden
   - Stage alle geänderten Dateien mit `git add -A`
   - Erstelle einen Commit mit einer aussagekräftigen deutschen Nachricht
   - **Stelle sicher, dass du auf dem `draft`-Branch bist** (falls nicht: `git checkout draft`)
   - Pushe den Commit auf den `draft`-Branch: `git push origin draft`
   - Melde Erfolg und weise darauf hin: "Änderungen sind auf dem Draft-Branch. Schreibe 'Ende Deploy' wenn du live deployen willst."
3. Falls es keine Änderungen gibt, melde das dem User
4. **Session-Log aktualisieren:** Aktualisiere die Session-Log-Datei des aktuellen Rechners (falls bekannt aus dem letzten "Start"-Befehl) unter `.claude/sessions/<name>.md`:
   - Überschreibe den Abschnitt "Letzte Session" mit Datum und kurzer Zusammenfassung was gemacht wurde
   - Überschreibe den Abschnitt "Nächste Schritte" mit offenen Todos oder nächsten Aufgaben (frage den User kurz, was als nächstes ansteht, oder leite es aus dem Kontext ab)

## Trigger: "Ende Deploy"

Wenn der User "Ende Deploy" (oder "ende deploy") schreibt:

1. Falls es noch uncommittete Änderungen gibt: Erst committen und auf `draft` pushen (wie bei "Ende")
2. Zeige dem User eine Zusammenfassung aller Commits auf `draft`, die noch nicht in `main` sind: `git log main..draft --oneline`
3. Frage den User kurz zur Bestätigung: "Soll ich diese Änderungen jetzt live deployen?"
4. Nach Bestätigung:
   - `git checkout main`
   - `git merge draft`
   - `git push origin main`
   - `git checkout draft` (zurück auf draft wechseln für weitere Arbeit)
   - Melde Erfolg: "Änderungen sind live auf machsleicht.de!"
5. Session-Log aktualisieren (wie bei "Ende")

---

## Session-Log Format

Die Dateien unter `.claude/sessions/hannes.md` und `.claude/sessions/bolle.md` haben folgendes Format:

```markdown
# Session-Log: <Name>

## Letzte Session
**Datum:** YYYY-MM-DD
**Zusammenfassung:**
- Was wurde gemacht (Stichpunkte)

## Nächste Schritte
- Offene Aufgaben / Todos
```

---

## Git-Konfiguration

- Repository: `C:\Users\Hannes\machsleicht-deploy` (VM-Pfad variiert je nach Session)
- User: Bollesan91 / cbollweg@gmx.de
- Remote-URL enthält PAT (läuft am 25.04.2026 ab)
- **Arbeitsbranch:** `draft` (hier wird entwickelt)
- **Deploy-Branch:** `main` (Netlify deployt nur diesen Branch)

## Regeln

- Commit-Nachrichten auf Deutsch
- Co-Authored-By: `Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>`
- Keine Rückfragen bei Start/Ende – einfach machen
- Bei "Ende Deploy" → kurze Bestätigung einholen bevor gemergt wird
- WICHTIG: "Ende" allein deployt NIEMALS! Nur "Ende Deploy" deployt.
