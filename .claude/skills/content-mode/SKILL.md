# Content-Mode Skill — Autoloop v2

Aktiviert sich, sobald ein Autoloop-Zyklus läuft. Erkennt sich an den eintreffenden RUNDE 1 / RUNDE 2 / RUNDE 3 / RUNDE 4 Trigger-Nachrichten vom AutoHotkey-Tool.

## Zweck

Im Autoloop ist der Mensch nicht anwesend. Claude trifft handwerkliche Entscheidungen selbst, dokumentiert strategische Entscheidungen für später, und hält das System in Bewegung.

## Vier-Runden-Struktur

Jedes Ticket durchläuft genau 4 Runden, die vom Tool getriggert werden:

1. **Runde 1 — Selbstkritik und Quick Wins.** Eigene Schwächen finden, kleine Sachen sofort fixen.
2. **Runde 2 — Externer Gutachter.** Perspektivwechsel, harte fachliche Kritik, drei NEUE Schwächen finden.
3. **Runde 3 — Elite-Nachschärfung.** Letzte Politur. Stilistische Schärfe, Kohärenz, Vollständigkeit.
4. **Runde 4 — Qualitätsziel-Check und Shift.** Objektive Bewertung, Commit-Entscheidung, nächstes Ticket starten.

Zwischen den Runden vergehen 22 Minuten. Wenn die Trigger-Nachricht kommt, sofort beantworten — keine Wartezeit, keine Vorbereitung.

## Objektive Elite-Kriterien (für Runde 4)

Eine Arbeit gilt als Elite-Niveau erreicht, wenn ALLE folgenden Bedingungen wahr sind:

1. `bash validate-all.sh` zeigt PASSED (alle 7 Stages grün)
2. `python3 _build/audit-all-pages.py` zeigt für die bearbeitete Datei ≥85% Score
3. Beide JSON-LD-Schemas validieren (HowTo + FAQPage falls vorhanden)
4. Im HTML keine offenen `<!-- TODO -->`, `<!-- FIXME -->` oder `<!-- WIP -->` Kommentare
5. Feature-Branch ist committed und gepusht
6. Eigene ehrliche Einschätzung ≥85% — und zwar nach den drei Verbesserungsrunden, nicht reflexhaft

Wenn auch nur EINES der sechs Kriterien nicht erfüllt ist: Shift-Pfad nehmen.

## Harte Verhaltensregeln

### Keine Rückfragen

Im Autoloop stellt Claude **keine Rückfragen** an den User. Keine "soll ich A oder B?", keine "darf ich dieses Feature hinzufügen?", keine Multiple-Choice-Vorschläge. Wenn etwas wirklich unklar ist, landet die Frage in `OPEN-DECISIONS.md`, nicht im Chat.

### Keine Meta-Kommentare

Beginne Antworten direkt mit der Arbeit. Verboten: "das ist eine gute Frage", "ich sollte vorsichtig sein", "lass mich nachdenken", "gerne, ich helfe dir dabei".

### Keine Höflichkeits-Schlussfloskeln

Verboten: "soll ich jetzt X machen?", "willst du, dass ich Y fortsetze?", "wenn du Fragen hast, melde dich". Antwort endet mit dem Arbeitsergebnis. Nichts danach.

### Anti-Inflation

Wenn in Runde 1 mehr als 90% Selbstzufriedenheit angegeben werden, ist das vermutlich falsch. Die ersten Versionen einer Elite-Seite haben üblicherweise echte Schwächen, die in 3 Runden gefunden werden. Wenn Runde 1 keine Schwächen findet: tiefer suchen, nicht zufrieden sein.

In Runde 2 darf die Bewertung zurückgesetzt werden. Eine ehrliche 70% nach Runde 2 ist besser als eine geschönte 92% nach Runde 1.

### Entscheidungs-Grenze

Claude entscheidet im Autoloop **selbst:**
- Implementierungsdetails (HTML-Struktur, CSS-Klassen, Formulierungen)
- Einhaltung des Elite-Templates
- Reihenfolge von Sub-Tasks innerhalb eines Tickets
- Welche Schwächen in welcher Runde gefixt werden
- Affiliate-Link-Integration nach bekanntem Muster

Claude entscheidet **nicht selbst:**
- Strategische Pivots (Motto-Wahl, Narrativ-Richtung, Funnel-Logik)
- Neue Features außerhalb des Ticket-Briefings
- Kosten-relevante Entscheidungen (neue Worker, neue Domains, Bezahl-Integrationen)
- Breaking Changes an bereits live deployten Seiten
- Änderungen an Datenschutz, Impressum, AGB

Unklare Fälle landen in `OPEN-DECISIONS.md` mit Claude's Vorschlag.

## Shift-Verhalten

Wenn Runde 4 ergibt, dass Elite nicht erreicht wurde, oder wenn eine strategische Entscheidung benötigt wird:

1. Eintrag in `OPEN-DECISIONS.md` schreiben (Format siehe unten)
2. Aktuellen Stand auf Feature-Branch committen mit `[WIP]` im Subject
3. TASKS.md updaten: Ticket-Status auf `[WIP]` mit Verweis auf OPEN-DECISIONS-Eintrag
4. Sofort das nächste `[ ]` Ticket aus TASKS.md beginnen

Kein Warten, keine Pause, kein "ich warte auf dein Feedback".

## Git-Workflow im Autoloop

### Erlaubt

- Feature-Branches anlegen und pushen (`feat/einhorn-3-5`, `feat/safari-6-8`, etc.)
- PRs gegen `draft` öffnen
- Updates an `TASKS.md`, `SESSION-NOTES.md`, `OPEN-DECISIONS.md`, `BACKLOG-AUDIT.md`
- Updates an Feature-Branch zugehörigen Files

### Verboten

- Pushes auf `main`
- Mergen von PRs
- Mergen von `draft` nach `main`
- Cloudflare-Deploys auslösen
- Änderungen an `_dev/`, `.claude/`, oder anderen System-Files ohne explizite Ticket-Anweisung

### Branch-Naming-Konvention

- `feat/<kurzname>` für neue Features (z.B. `feat/einhorn-3-5`)
- `fix/<kurzname>` für Bugfixes (z.B. `fix/backlog-p3-8`)
- `audit/<kurzname>` für Audit-Outputs (zukünftig)

### Commit-Identity

Wie in CLAUDE.md definiert:
```bash
git -c user.name=Bollesan91 -c user.email=cbollweg@gmx.de commit -m "..."
```

Co-Authored-By Trailer immer setzen:
```
Co-Authored-By: Claude <noreply@anthropic.com>
```

## Auto-Reinit-Erwartung

Nach Runde 4 eines Tickets:
1. Claude committet auf Feature-Branch
2. Claude updatet TASKS.md (Ticket auf `[x]` oder `[WIP]`)
3. Claude updatet SESSION-NOTES.md
4. Claude beginnt sofort das nächste `[ ]` Ticket im selben Chat

**ABER:** Das AutoHotkey-Tool öffnet ca. 4 Minuten nach Runde 4 einen NEUEN CHAT mit Strg+K und pastet den Init-Prompt. Das heißt: die Arbeit am nächsten Ticket im aktuellen Chat ist nur kurz — der nächste Chat ist frisch und beginnt mit dem Init-Prompt.

**Konkret:** Im aktuellen Chat reicht es, das nächste Ticket zu identifizieren und mit der Arbeit zu beginnen. Die echte Arbeit am nächsten Ticket passiert dann im neuen Chat.

Wenn Tasks.md keine `[ ]` Tickets mehr hat: in Runde 4 die Antwort mit `AUTOLOOP_QUEUE_LEER` in Großbuchstaben oben markieren. Das Tool stoppt dann.

## OPEN-DECISIONS.md Eintrags-Format

```markdown
---

## [YYYY-MM-DD HH:MM] Titel der Entscheidung

**Ticket:** feat/einhorn-3-5
**Blocker?** Ja/Nein

**Kontext:** Kurz, 2-3 Sätze.

**Optionen, die Claude sieht:**
- A: ...
- B: ...
- C: ...

**Claude's Vorschlag:** B, weil [Begründung].

**Status:** OFFEN
```

## TASKS.md Eintrags-Format

```markdown
## [ ] Ticket-Titel
**Branch:** feat/branch-name
**Briefing:** Was soll gebaut werden
**Abgenommen wenn:** Konkrete Kriterien
**Blueprint:** Optional, Pfad zu einer Vorlage
```

Status-Werte:
- `[ ]` = offen
- `[WIP]` = work in progress, Blocker dokumentiert in OPEN-DECISIONS
- `[x]` = erledigt

## Wichtig: Skill-Compliance ist Voraussetzung für Loop-Stabilität

Wenn Claude eine Regel verletzt (z.B. eine Rückfrage stellt), wird der Autoloop nicht reagieren — die nächste Trigger-Nachricht kommt trotzdem nach 22 Min. Die Rückfrage bleibt unbeantwortet im Chat hängen. Daher: Skill ernst nehmen.
