# Sprint 1 (V5.2) Abschluss + Konflikt mit Planer-Frisur — Handoff

**Erstellt:** 2026-05-12
**Status:** Aktiv — wartet auf 4 Bolle-Entscheidungen + Worker-Deploy

## Worum geht's

Sprint 1 V5.2-Tickets P1-18 bis P1-33 ist code-komplett auf `draft` und **gepusht** (Commits `c6e08f5..246633d`, 20 Stück). Aber:
1. Worker-Patches (P1-26/27/29) sind nicht auf Cloudflare deployed → Live-Wirkung 0
2. Browser-Smoke-Tests nicht gelaufen → Code-Funktionsweise unverifiziert
3. **Überschneidung mit Bolles Planer-Frisur-Sprint** (11.05, `6b2047f`) — P1-22 ≈ P3-13, P1-25 ≈ P3-20 (teilweise)
4. Sprint-Reihenfolge nicht klar: V5.2-Funnel-Test fertig vor Planer-Frisur, oder parallel?

AUDIT.md v3 enthält priorisierte Fix-Liste P1-34..P1-59 für Sprint 2.

## Was bisher passiert ist (chronologisch)

1. **„Start leicht" 2026-05-12** — Repo-Sync fand stale Mount, hard-reset auf origin/draft (32 Commits eingespielt). Was ich dabei verpasste: Bolles `6b2047f` Planer-Frisur-Commit vom 11.05 lag bereits auf draft.
2. **Strategie-Iteration** — Stratege-Doc V2 challenged → V5.1 (Ticket-Pack) → V5.2 (mit meinen 8 Korrekturen)
3. **Schlachtplan** als 16-PBI-Liste P1-18 bis P1-33, geplant in 5 Streams
4. **Sprint 1 durchgezogen** via `/loop 4m`-Cron — alle 16 Commits auf draft
5. **Self-Audit-Phase** — P1-18 → AUDIT.md v1 → v2 → v3 (6/10 → 7.5/10 → 8.5/10)
6. **Knowledge-Transfer-Mechanik etabliert** — Git statt Memory, AUDIT.md als Living-Wahrheit
7. **Memory + Handoff-Setup** — dieses File als erstes Beispiel
8. **Push-Konflikt + Rebase** — beim `git push` kollidierte mein Stand mit `6b2047f`. Rebase mit Konflikt-Resolution in SESSION-NOTES (alle 3 Sektionen 12.05/11.05 erhalten, 30.04 wie von Bolle 11.05 entfernt belassen).
9. **Erkenntnis P1-22 ≈ P3-13:** Mein Cockpit baut die Basis von Bolles geplantem P3-13 Cockpit-Header. P3-13 kann statt 1 Tag in ½ Tag durchgeführt werden (nur erweitern).

## Was als nächstes ansteht — Reihenfolge nach AUDIT.md §13

### Pflicht vor Worker-Deploy (4 PBIs, 3.5-9.5h)
- **P1-34** Browser-Smoke-Test Cockpit→Partyseite-Flow (BLOCKER)
- **P1-38** Worker-Live-curl-Tests (CORS, /api/create, Honeypot, Rate-Limit)
- **P1-42** Mobile Chrome End-to-End-Test
- **P1-43** Halloween↔Meerjungfrau-Swap entscheiden + fixen (siehe Q2)

### Pflicht vor Netlify-Deploy auf main (3 PBIs, 0.7-2.4h)
- **P1-35** sitemap.xml `<lastmod>` für `/schatzsuche` auf 2026-05-12
- **P1-36** `?stationen=N` in JSX implementieren ODER aus Variants-CTAs raus
- **P1-41** „Feuerwehr-Schatzsuche kommt"-Copy aus schatzsuche.html (Feuerwehr ist in SZ_THEMES)

### Pre-V5.3 Empfehlung (4 PBIs, 2-3.5h)
P1-37 (`?source` → `?quelle`), P1-40 (Registry + dschungel/feen), P1-44 (BACKLOG-Update), P1-45 (ARCHITECTURE.md auf 9-Mottos)

### Backlog V5.3+ (15 PBIs, 47-124h)
Siehe AUDIT.md §13.4. Highlights: P1-39 Worker-Farben (L), P1-48 KV-Backup (M, **kritisch wenn KV-Loss**), P1-58 themeRegistry konsumieren, P1-52 GitHub-Actions-CI.

## Open Questions (warten auf Bolle-Entscheidung)

### Q1: Sprint-Reihenfolge — V5.2-Funnel-Test ODER Planer-Frisur zuerst?

**Hintergrund:** Zwei Sprint-Pläne überlappen partiell:
- V5.2 (Sprint 1 fertig): Cockpit + Cockpit→Party + Schatzsuche-Landing + Worker-Patches → North Star „Partyseite erstellt" 3-5% von Plan-Nutzern in 30 Tagen messen
- Planer-Frisur (P3-12..P3-21, geplant): „Intelligent ohne API" — Constraint-Solver, Vorbereitungskarte, Drei-Gruppen-Einkaufsliste, SOS-Button, KI-Reime, RSVP-Bridge, Live-Navigator

**Option A — V5.2-Funnel-Test fertig, dann Planer-Frisur**
- ~1-2 Wochen für P1-34/38/42/43 + Worker-Deploy + Netlify-Deploy + 4 Wochen messen
- Vorteil: echte Funnel-Conversion-Daten BEVOR Architektur weiter umgebaut wird
- Vorteil: P3-13/14/20 können auf gemessenem Cockpit-Verhalten aufsetzen statt im Blindflug bauen
- Nachteil: Planer-Frisur startet erst Mitte Juni (~4 Wochen Verzögerung)

**Option B — Direkt Planer-Frisur, V5.2-Sachen werden parallel deployed**
- P1-34/38/42 + Worker-Deploy nebenbei in Woche 1-2
- Funnel-Messung läuft parallel zum Planer-Frisur-Bau
- Vorteil: schnellerer Architektur-Aufbau (Constraint-Solver ist Markenkern)
- Nachteil: Cockpit P3-13 erweitert P1-22 → mögliche Re-Iteration wenn Mess-Daten andere Schwerpunkte zeigen

**Option C — Parallel, getrennte Days**
- Mo+Mi+Fr: Planer-Frisur (P3-12 → P3-14)
- Di+Do: V5.2-Stabilisierung (P1-34/38/42 + Worker-Deploy + Mess-Setup)
- Vorteil: keine Sequenz-Verzögerung
- Nachteil: Context-Switching, fragmentierter Fokus

**Empfehlung:** **A oder B**, nicht C. Bei 10-15h/Woche ist Context-Switching teuer.
- A wenn du echte Funnel-Daten als Architektur-Input willst
- B wenn der Constraint-Solver strategisch dringender ist als Funnel-Validierung

### Q2: Halloween-Motto — drin oder raus?

Aktuell: Worker hat `halloween` in MOTTO_COLORS. Registry, Einladung-Tool, Planer haben es **nicht**.

**Option A — Halloween rein** (in Einladung-Tool + Registry ergänzen)
- Saisonaler Q4-Funnel sinnvoll (Halloween-Geburtstage real)
- +1 Motto-Welt-Pflegeaufwand (Story, Stationen, Einkaufsliste, Spiele)
- Strategisch konsistent mit „9 Voll-Mottos" → würde 10 sein

**Option B — Halloween raus** (aus Worker streichen)
- Konsistent mit aktueller Architektur (10 Mottos in Registry/Einladung mit Meerjungfrau, nicht Halloween)
- Gibt Halloween als Strategie auf
- Meerjungfrau-Color muss in Worker ergänzt werden (sonst weiterhin Default-Fallback)

**Option C — Beides** (Halloween rein + Meerjungfrau in Worker ergänzen)
- 11 Mottos total
- Konsistente Datenwahrheit überall
- Maximale Pflege-Last

**Empfehlung:** **B** scheint pragmatischer für jetzt — Halloween war wahrscheinlich Altlast vor dem Cut, und Q4 ist noch weit. Q1 2027 kann Halloween wieder eingeführt werden mit P3-Style-PBI.

### Q3: Schatzsuche-Themen Dschungel + Feen — eigene SEO-Pages?

Aktuell: `/schatzsuche/dschungel` → 301 zu `/schatzsuche/safari`, `/schatzsuche/feen` → 301 zu `/schatzsuche/einhorn`. Im SZ_THEMES-Generator gibt's vollständige Stories + Stationen.

**Option A — Eigene Pages bauen**
- +2 SEO-Pages, Traffic-Potenzial für „dschungel schatzsuche" und „feen schatzsuche"
- Effort: 2-3h pro Page-Set (Content + Schema + Crosslinks)

**Option B — Redirects behalten**
- Status quo, kein Aufwand
- SEO-Traffic für dschungel/feen geht weiter zu safari/einhorn

**Empfehlung:** **B für jetzt.** Wenn Funnel-Messung (Q1) zeigt dass Schatzsuche-SEO wesentlich Traffic bringt, dann A als P1-Ticket.

### Q4: wrangler.toml + Worker-Deploy-Automation — jetzt oder warten?

Aktuell: manueller Cloudflare-Dashboard-Deploy funktioniert. Bei Sprint 1 musste Bolle 1× drei Patches gleichzeitig deployen.

**Option A — wrangler.toml jetzt** (P1-53, L 3-7h)
- Zukünftige Patches schmerzfrei via `npx wrangler deploy`
- GitHub-Actions kann später auto-deployen (P1-52)
- Initial-Setup-Aufwand

**Option B — warten bis Pain real ist**
- Solange Worker-Patches alle 2-3 Wochen kommen, manuell OK

**Empfehlung:** **B**. Erst wenn Sprint 2+ mehrere Worker-Patches bringt (P3-19 KI-Reime ist Worker-Ergänzung, P3-20 RSVP-Bridge auch), lohnt A.

## Methodologie-Notizen (für nächsten Chat)

1. **Self-Audit-Methodik** etabliert: bei „Living-Wahrheit"-Outputs (AUDIT.md, große Code-Diffs, Strategie-Docs) immer challenge → verify → fix → re-bewerten Loop, bis ≥ 8/10
2. **Branch-Trick-Adaption für machsleicht:** Knowledge-Transfer via Git ist Default. Content-Loop (3-Chat) nur bei reinem Content-Schreiben (Motto-Stories, Hero-Copy, FAQ-Erweiterungen) — nicht bei Architektur/Code/Audit
3. **AUDIT.md ist Living-Dokument:** v3 ist Stand 2026-05-12. Bei jedem Sprint-Ende neu validieren ob noch aktuell
4. **Vor Sprint-Start: SESSION-NOTES + Bolles letzte 2 Commits prüfen!** Mein Sprint 1 hat einen Tag verloren weil ich nicht wusste dass Bolle einen parallelen Sprint plant. Pre-Flight-Check „letzte Commits gegen geplanten Sprint-Scope abgleichen" in CLAUDE.md aufnehmen (P1-44 Backlog-Update kann das)

## Wann dieses File löschen

Wenn:
- **Q1 entschieden** (Sprint-Reihenfolge) → in SESSION-NOTES dokumentieren, ggf. AUDIT.md §15 updaten
- **Q2 Halloween-Entscheidung** → AUDIT.md §15 entsprechend pflegen + P1-43 entsprechend ausführen
- **Q3 Dschungel/Feen-Entscheidung** → AUDIT.md §15 + ggf. neue PBI
- **Q4 wrangler.toml-Entscheidung** → AUDIT.md §13.4 P1-53 entsprechend Prio anpassen
- **Worker deployed + P1-34/38/42 durch** → Sprint 1 ist live, in SESSION-NOTES dokumentieren

Spätestens nach 14 Tagen: File-Inhalt entweder konsolidiert oder obsolet — beides → löschen.

→ Wissen fließt in: **AUDIT.md §13** (Sprint-Fortschritt), **AUDIT.md §15** (Strategie-Entscheidungen), **SESSION-NOTES.md** (Verlauf), **BACKLOG-AUDIT.md** (PBI-Liste, P1-44)
