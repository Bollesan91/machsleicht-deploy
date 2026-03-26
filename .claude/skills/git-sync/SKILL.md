---
name: git-sync
description: |
  Git-Synchronisierung für das machsleicht-deploy Projekt. MUSS sofort ausgelöst werden wenn der User nur "Start" oder "Ende" schreibt (einzelnes Wort, ohne weiteren Kontext). "Start" löst einen git pull aus, "Ende" löst commit + push aus. Auch bei Kleinschreibung ("start", "ende"). Dieser Skill hat höchste Priorität bei diesen Trigger-Wörtern.
---

# Git-Sync für machsleicht-deploy

## Trigger: "Start"

Wenn der User nur "Start" (oder "start") schreibt:

1. Stelle sicher, dass der Projektordner `machsleicht-deploy` als Arbeitsverzeichnis verknüpft ist (falls nicht, mit `request_cowork_directory` anfordern unter `C:\Users\Hannes\machsleicht-deploy`)
2. Führe `git pull` aus, um den neuesten Stand von GitHub zu holen
3. Prüfe mit `git status`, ob alles sauber ist
4. Melde dem User kurz den Status

## Trigger: "Ende"

Wenn der User nur "Ende" (oder "ende") schreibt:

1. Führe `git status` aus, um zu sehen welche Dateien geändert wurden
2. Falls es Änderungen gibt:
   - Zeige dem User kurz welche Dateien geändert wurden
   - Stage alle geänderten Dateien mit `git add`
   - Erstelle einen Commit mit einer aussagekräftigen deutschen Nachricht
   - Pushe den Commit auf GitHub
   - Melde Erfolg
3. Falls es keine Änderungen gibt, melde das dem User

## Git-Konfiguration

- Repository: `C:\Users\Hannes\machsleicht-deploy` (VM: `/sessions/great-stoic-wozniak/mnt/machsleicht-deploy`)
- User: Bollesan91 / cbollweg@gmx.de
- Remote-URL enthält PAT (läuft am 25.04.2026 ab)

## Regeln

- Commit-Nachrichten auf Deutsch
- Co-Authored-By: `Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>`
- Keine Rückfragen – einfach machen
