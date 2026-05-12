# Sprint 1 (V5.2) Abschluss — Handoff

**Erstellt:** 2026-05-12
**Status:** Aktiv — wartet auf 3 Bolle-Entscheidungen + Worker-Deploy

## Worum geht's

Sprint 1 (V5.2-Tickets P1-18 bis P1-33) ist code-komplett auf `draft` (16 Commits ab `c6e08f5`). **Aber nicht produktiv aktiv:** Worker-Patches (P1-26/27/29) sind nicht deployed, Browser-Smoke-Tests nicht gelaufen, einige PBIs scope-reduziert. AUDIT.md v3 enthält priorisierte Fix-Liste P1-34..P1-59.

## Was bisher passiert ist (chronologisch)

1. **„Start leicht" 2026-05-12** — Repo-Sync fand stale Mount, hard-reset auf origin/draft (32 Commits eingespielt)
2. **Strategie-Iteration** — Stratege-Doc V2 challenged → V5.1 (Ticket-Pack) → V5.2 (mit meinen Korrekturen)
3. **Schlachtplan** als 16-PBI-Liste P1-18 bis P1-33, geplant in 5 Streams
4. **Sprint 1 durchgezogen** via `/loop 4m`-Cron — alle 16 Commits auf draft
5. **Self-Audit-Phase** — P1-18 → AUDIT.md v1 → v2 → v3
   - v1 hatte 3 sachliche Fehler + 2 Auslassungen → 6/10
   - v2 korrigiert + 19 Fix-PBIs F-01..F-19 → 7.5/10
   - v3 self-audit-validiert, F-PBIs umbenannt P1-34..P1-59, Infrastruktur + Test-Strategie ergänzt → 8.5/10
6. **Branch-Trick-Mechanik etabliert** — Knowledge-Transfer via Git statt Memory, AUDIT.md als primäres Living-Dokument
7. **Memory + Handoff-Setup** — dieses File als erstes Beispiel

## Was als nächstes ansteht — Reihenfolge nach AUDIT.md §13

### Pflicht vor Worker-Deploy (4 PBIs, 3.5-9.5h)
- **P1-34** Browser-Smoke-Test Cockpit→Partyseite-Flow (BLOCKER)
- **P1-38** Worker-Live-curl-Tests (CORS, /api/create, Honeypot, Rate-Limit)
- **P1-42** Mobile Chrome End-to-End-Test
- **P1-43** Halloween↔Meerjungfrau-Swap entscheiden + fixen (siehe Open Questions)

### Pflicht vor Netlify-Deploy auf main (3 PBIs, 0.7-2.4h)
- **P1-35** sitemap.xml `<lastmod>` für `/schatzsuche` auf 2026-05-12
- **P1-36** `?stationen=N` in JSX implementieren ODER aus Variants-CTAs raus
- **P1-41** „Feuerwehr-Schatzsuche kommt"-Copy aus schatzsuche.html (Feuerwehr ist in SZ_THEMES)

### Pre-V5.3 Empfehlung (4 PBIs, 2-3.5h)
P1-37 (`?source` → `?quelle`), P1-40 (Registry + dschungel/feen), P1-44 (BACKLOG-Update), P1-45 (ARCHITECTURE.md auf 9-Mottos)

### Backlog V5.3+ (15 PBIs, 47-124h)
Siehe AUDIT.md §13.4. Highlights: P1-39 Worker-Farben (L), P1-48 KV-Backup (M-L, **kritisch wenn KV-Loss**), P1-58 themeRegistry konsumieren (sonst toter Code), P1-52 GitHub-Actions-CI (XL).

## Open Questions (warten auf Bolle-Entscheidung)

### Q1: Halloween-Motto — drin oder raus?

Aktuell: Worker hat `halloween` in MOTTO_COLORS. Registry, Einladung-Tool, Planer haben es **nicht**.

- **Option A — Halloween rein** (in Einladung-Tool + Registry ergänzen): Q4-Halloween-Funnel als saisonale Strategie sinnvoll, aber +1 Motto-Welt-Pflegeaufwand
- **Option B — Halloween raus** (aus Worker streichen): konsistent mit Cut-Logik (9 Voll-Mottos), aber gibt Halloween als Strategie auf
- **Option C — Status Quo** (Worker hat es, andere nicht): Inkonsistenz bleibt, Meerjungfrau-Partyseiten haben Default-Farbe

→ Entscheidet ob P1-43 ein **Add** (Halloween → Registry) oder **Remove** (Halloween aus Worker) oder **Doppel-Fix** (Halloween rein + Meerjungfrau in Worker) ist.

### Q2: Schatzsuche-Themen-Strategie — Dschungel + Feen eigene SEO-Pages?

Aktuell: `/schatzsuche/dschungel` und `/schatzsuche/feen` sind 301-Redirects (zu Safari + Einhorn). Im SZ_THEMES-Generator gibt's vollständige Stories + Stationen für beide.

- **Option A — Eigene Pages bauen**: +2 SEO-Pages, +Traffic-Potenzial für „dschungel schatzsuche", „feen schatzsuche"
- **Option B — Redirects behalten**: aktueller Stand, kein Mehr-Aufwand

→ Wenn A: eigenes M-Ticket (2-3h pro Page-Set).

### Q3: Worker-Deploy-Automation (wrangler.toml) — jetzt oder warten?

Aktuell: manuell via Cloudflare-Dashboard funktioniert. Bei Sprint 1 musste Bolle 1× deployen (drei Patches gleichzeitig).

- **Option A — wrangler.toml jetzt** (P1-53, L 3-7h): zukünftige Patches schmerzfrei, GitHub-Actions kann auto-deployen
- **Option B — warten bis Pain real ist**: solange Patches alle 2-3 Wochen kommen, manuell OK

→ Aktuelle Empfehlung: B. Erst wenn Sprint 2+ >5 Worker-Patches bringt, lohnt A.

## Methodologie-Notizen (für nächsten Chat)

1. **Self-Audit-Methodik** etabliert: bei „Living-Wahrheit"-Outputs (AUDIT.md, große Code-Diffs) immer challenge → verify → fix → re-bewerten Loop, bis ≥ 8/10
2. **Branch-Trick-Adaption für machsleicht:** Knowledge-Transfer via Git ist Default. Content-Loop (3-Chat) nur bei reinem Content-Schreiben (Motto-Stories, Hero-Copy, FAQ-Erweiterungen) — nicht bei Architektur/Code/Audit
3. **AUDIT.md ist Living-Dokument:** v3 ist Stand 2026-05-12. Bei jedem Sprint-Ende neu validieren ob noch aktuell

## Wann dieses File löschen

Wenn:
- Worker deployed + P1-34/38/42 durchgeführt → **Sprint 1 ist live**, in SESSION-NOTES dokumentieren, File löschen
- Q1 Halloween entschieden → AUDIT.md §15 aktualisieren, File löschen
- Q2 Schatzsuche-Themen entschieden → AUDIT.md §15 aktualisieren

Spätestens nach 14 Tagen: File-Inhalt entweder konsolidiert oder obsolet — beides → löschen.

→ Wissen fließt in: **AUDIT.md §13** (Sprint-Fortschritt), **AUDIT.md §15** (Strategie-Entscheidungen), **SESSION-NOTES.md** (Verlauf)
