# Stream 04 — Elite-Motto-Data Phase B

Phase B des Planer-Frisur-Sprints. Wir füllen die 3 `TODO_PHASE_B`-Lücken in `_src/elite-motto-data/feuerwehr-mittel.json`, damit P3-16 (Vorbereitungskarte), P3-17 (3-Gruppen-Einkaufsliste) und P3-18 (SOS-Button) entblockt sind.

## Drei parallele Streams (3-Chat-Pipeline pro Stream)

| # | Output | PBI entblockt | Output-Form |
|---|---|---|---|
| 1 | `preparationWeeks` (6 datierte Zeitfenster, -4W bis Tag X) | P3-16 | JSON-Objekt |
| 2 | `sosScenarios` (6-8 Panik-Szenarien) | P3-18 | JSON-Objekt |
| 3 | `shoppingList[].category` für alle Items in 3 Varianten | P3-17 | JSON-Mapping |

**Motto:** Feuerwehr 6-8 Jahre (Golden Template). Stream 4 ist der Schema-Validation-Lauf — wenn das hier sauber durchgeht, ist das Schema bereit für Skalierung auf Einhorn / Safari / weitere Altersgruppen.

## Pro Stream: Writer / Reviewer / Adversarial

- **Chat A (Writer)** schreibt v1 aus `quellen-pack.md`
- **Chat B (Reviewer)** challenge v1 → v2-Review
- **Chat A** integriert Review → v3
- **Chat C (Adversarial)** stellt die unbequemen Fragen → v4-Adversarial-Score
- **Chat A** finale v5 mit Score-Estimat
- **Akzeptanz:** Score ≥ 85 + Plateau

## Score-Rubrik (100 Punkte total)

| Dimension | Punkte | Was zählt |
|---|---|---|
| Substanz (gibt's konkrete, nutzbare Inhalte?) | 30 | Keine Plattitüden, keine generischen Eltern-Ratgeber-Phrasen |
| Motto-Kohärenz (passt's zu Feuerwehr 6-8?) | 25 | Rollen, Sprache, Pannen müssen aus diesem Universum kommen |
| Datums-/Material-Realismus | 20 | Lieferzeiten Amazon, Backzeiten, Helfer-Logistik realistisch |
| Sprint-Tauglichkeit (kann Planer-UI das rendern?) | 15 | Struktur konsistent, keine "siehe oben"-Verweise |
| Mama-um-22:30-Test | 10 | Versteht müde Mutter ohne Vorwissen, in 30 Sekunden |

## Anti-Patterns

- **Generische Eltern-Tipps:** "Achten Sie auf die Sicherheit" — raus. Wir wollen "Stuhl als Wachen-Pult, Beweise im Wohnzimmer verstecken".
- **Schul-Sprache:** "Es ist empfehlenswert, dass..." — wir schreiben "Schmeiß den Pappkarton-Helm noch heute in die Bastel-Box, sonst vergisst du's morgen."
- **Pinterest-Aufwand-Eskalation:** "Sie könnten zusätzlich eine Wandtafel aus..." — wir sind im Pragmatismus-Land. Bolles Ton: lakonisch, konkret, mama-respektierend.
- **TODO-Lücken im JSON:** Output muss komplett valide JSON sein.

## Output-Format (kritisch)

Writer/Reviewer/Adversarial geben den **finalen JSON-Block** als letztes Element zurück. Format pro Stream siehe jeweiliges `quellen-pack.md`. Kein Markdown-Wrapping um den JSON-Block, **direkt mergebar** in `_src/elite-motto-data/feuerwehr-mittel.json`.

## Workflow (Pilot = Claude Code in Cowork-Sandbox)

1. Pilot schreibt quellen-packs (das hier), pusht auf `content-loop-pipeline`
2. Pilot öffnet 3 Writer-Tabs (claude.ai/new), pastet je `quellen-pack` raw-URL
3. /loop dynamic + ScheduleWakeup 240s — pro Wakeup: status check, download v_n, commit + push, trigger nächste Phase
4. Wenn alle 3 Streams ≥85 + Plateau: Pilot mergt finale JSON-Blöcke in `_src/elite-motto-data/feuerwehr-mittel.json` auf `draft`, ersetzt TODO_PHASE_B-Stubs, commit mit `[skip netlify]`
5. Stream-04-Folder bleibt im pipeline-branch als Audit-Trail
