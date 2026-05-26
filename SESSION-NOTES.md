# Session-Notiz — 26.05.2026 (Spät-Nacht: Phase 3 Wave 1 + Planer-Cleanup + Schatzsuche-Hub-Fix + Deploy)

**Branch:** `draft` → `main` (Ende deploy)

## Was wurde gemacht

### Phase 3 Wave 1: dschungel + feen Voll-Mottos (8 neue Pages)

Strategie: Writer-Tab Markdown-only in 3 frischen Tabs parallel, Direct-Write Haupt-Claude für die Hubs.

| Page | Wörter (geschätzt) | Approach | Status |
|---|---|---|---|
| dschungel-3-5 | ~8.500 | Writer-Tab (vorher gepusht) | ✅ live |
| dschungel-6-8 | ~7.100 | Writer-Tab (vorher gepusht) | ✅ live |
| dschungel-9-12 | 76 KB / ~10K Wörter | Writer-Tab + Blob-Extract | ✅ live (f6ef8a4) |
| feen-3-5 | ~7.400 | Direct-Write (vorher gepusht) | ✅ live |
| feen-6-8 | 83 KB / ~11K Wörter | Writer-Tab + Blob-Extract | ✅ live (f6ef8a4) |
| feen-9-12 | 64 KB / ~8K Wörter | Writer-Tab + Blob-Extract | ✅ live (f6ef8a4) |
| **dschungel.html** Hub | ~14 KB | Direct-Write Haupt-Claude | ✅ live (f6ef8a4) |
| **feen.html** Hub | ~16 KB | Direct-Write Haupt-Claude | ✅ live (f6ef8a4) |

**Total neue Elite-Inhalte heute Phase 3:** ~55 K Wörter. Keine Adv-Reviews durchgeführt — User hat 2 Reviews angekündigt, prüfung folgt.

### Planer-Cleanup (Direkt-User-Befund)

User-Befund: "Vom Planer kann man auch noch zu Charaktere (Lizenzmottos) switchen" → Toggle war dead UI (LICENSE-Array seit 29.04.2026 leer).

- `_src/kindergeburtstag.jsx`: Toggle-UI entfernt, Filter vereinfacht auf `GENERIC.map(...)`
- `js/kindergeburtstag.js`: Compiled-Code entsprechend gepatcht (live ohne Build-Step)
- Empty-State + mottoTab-State bleiben als harmless dead code

### Schatzsuche-Hub-Fix (Vorgängiger Commit da1632c)

User-Befund: "Irgendwas stimmt mit dem schatzsuche nicht" → Page war auf MVP-Stand mit 6/13 Themen + obsoletem "Feuerwehr-Schatzsuche kommt als nächstes"-Text. Alle 13 Themes verlinkt, Count + Copy korrigiert.

### Registry + Sitemap

- `js/theme-registry.js`: +dschungel (#43A047) +feen (#CE93D8), beide `modules:['planner','treasure']`
- `sitemap.xml`: +8 URLs (2 Hubs + 6 Age-Pages)
- ⚠️ **Bekanntes Inkonsistenz-Issue:** pferde/ritter/baustelle fehlen ebenfalls in theme-registry.js — separater Konsistenz-Fix-Bedarf

## Commits diese Session

- `8553535` content-loop Welle 42+43+45: dschungel-3-5 + dschungel-6-8 + feen-3-5 v1
- `da1632c` schatzsuche.html: 13 Schatzsuche-Themen vollständig verlinkt
- `f6ef8a4` Phase 3 Wave 1 + Charaktere-Toggle entfernt [skip netlify → wird mit Ende-deploy live]

## Pipeline-Erkenntnisse

1. **GitHub Push 403 erneut** — Windows-Credential-Cache abgelaufen, User-PAT inline-URL Recovery wie beim ersten Mal heute. PAT-Widerruf-Reminder gegeben.
2. **Writer-Tab Markdown-only in frischen Tabs funktioniert verlässlich** — 3 parallele Tabs, alle 3 mit endsClean=`</html>`, 64-83 KB Output je Tab.
3. **Direct-Write fuer Hubs deterministisch** — 14-16 KB pro Hub-Page in einem Write-Call, kein Token-Risk.

## GSC-Reminder (PFLICHT-Workflow neu eingeführt 2026-05-26)

Nach JEDEM Deploy der `sitemap.xml` ändert MUSS Claude den User erinnern an:
1. Sitemap neu einreichen in Google Search Console (machsleicht + machsruhig)
2. URL-Indexierung beantragen für neue URLs (max ~10/Tag)

Memory-File: `feedback_gsc_sitemap_reminder.md`.

## Nächste Schritte

1. **User-Reviews** der 2 angekündigten Reviews durch Haupt-Claude einarbeiten
2. **Adv-Reviews** für die 8 neuen Phase-3-Pages (Helfer-v3 Chrome-Tab) — alle pending
3. **pferde/ritter/baustelle in theme-registry.js nachpflegen** (Konsistenz-Issue)
4. **GSC: Indexierung der 8 neuen Phase-3-URLs beantragen** (manuell, Bolle)
5. **GSC: Sitemap neu einreichen** (manuell, Bolle)
6. **GSC-Reality-Check 7-10 Tage nach Deploy** (3.-5. Juni)

## Offene Fragen

- Welche Reviews zeigt der User? Adv-Reviews der Phase-3-Pages oder etwas anderes?
- Adv-Reviews der 8 Phase-3-Pages: jetzt oder erst nach GSC-Daten?

---

# Session-Notiz — 26.05.2026 (Nacht: Phase 2 KOMPLETT — 8 Light-Pages auf Elite + Deploy)

**Branch:** `draft` → `main` (Ende deploy)

## Was wurde gemacht — 8 von 8 Light-Pages auf Elite gebracht

Vor heute: 16 Elite-Pages + 8 Light-Pages auf `noindex,follow` (durch Welle 33-A heute Vormittag).
Heute Nacht: **alle 8 Light-Pages auf Elite gehoben** = 24/24 Pages indexierbar.

| Page | Wörter | Approach | Adv-Score |
|---|---|---|---|
| feuerwehr-3-5 | 10192 | Writer-Tab + Quick-Fix | **93** ✅ |
| feuerwehr-6-8 | 4992 | Direct-Write Haupt-Claude | (pending) |
| feuerwehr-9-12 | 3183 | Direct-Write Haupt-Claude | (pending) |
| weltraum-3-5 | 9303 | Writer-Tab + YMYL-Fix | **88** ✅ |
| weltraum-6-8 | 9126 | Writer-Tab Markdown-only | (pending) |
| weltraum-9-12 | 7689 | Writer-Tab Markdown-only | (pending) |
| piraten-3-5 | 5085 | Direct-Write Haupt-Claude | (pending) |
| piraten-9-12 | 7354 | Writer-Tab Markdown-only | (pending) |

**Total:** ~57.000 Wörter neue Elite-Inhalte. Alle 8 mit `index, follow` (kein noindex mehr).

## Pipeline-Erkenntnisse (für Memory)

1. **Writer-Tab Code-Mode (bash_tool) stallt bei >100KB HTML** — präsentiert nichts, hängt im Tool-Loop. Mehrere Retries hilft nicht.
2. **Writer-Tab Markdown-only (fresh tabs!) bricht das 9KB-Ceiling** — funktioniert nur in FRISCHEM Tab + striktem "kein bash, kein tool_use, nur EIN Code-Block"-Prompt. Mit dieser Strategie heute 3 parallele Tabs ohne Stall → 75-90KB Output pro Tab.
3. **Direct-Write durch Haupt-Claude** ist die zuverlässige Backup-Strategie. Token-Cost ~30K Output pro Page. Funktioniert deterministisch.
4. **GitHub Push 403** trat mid-Session auf (Windows-Credential-Cache abgelaufen). Recovery: User-PAT einmalig im Chat, inline-URL-Approach für 1-Shot-Push, dann PAT widerrufen.
5. **Tab-Group-Bug:** `tabs_close_mcp` + `tabs_create_mcp` im selben browser_batch verliert manchmal Tabs aus der MCP-Gruppe — sequentiell ist sicherer.

## Helfer-v3 Adv-Befunde (für die 2 reviewten Pages)

**feuerwehr-3-5 Score 93** — "Go, Elite-Level": JSON-Encoding-Bug "Hand-Signal Notruf" kontextrichtig getilgt (12 Stellen → Sirene/Sirenen-Symbol/Mini-Flamme), Eltern-Pflicht 4x verankert, Quick-Fixes Invitation-URL + Meta-Desc applied.

**weltraum-3-5 Score 88** — 1 YMYL-MUST-FIX (Leucht-Sterne Mitgebsel ↔ Safety-Warnung) gefixt + Meta-Desc + FAQ-Quote.

## Commits diese Session

- `b97cb93` Merge content-loop-pipeline → draft (feuerwehr-3-5 + weltraum-3-5 + Quellen-Packs)
- `8a34981` feuerwehr-6-8 v1 (direct-write)
- `d0f82ed` piraten-3-5 v1 (direct-write)
- `fd58433` feuerwehr-9-12 v1 (direct-write, Brandermittlungs-Krimi)
- `72d969e` Welle 39+40+41: weltraum-6-8 + weltraum-9-12 + piraten-9-12 (Writer-Tab Markdown-only)

## Nächste Schritte

1. **Adversarial-Reviews** für 6 Pages ohne Score (feuerwehr-6-8/9-12, weltraum-6-8/9-12, piraten-3-5/9-12) — Helfer-v3 Chrome-Tab, ~3 Min pro Page
2. **A1.5 Hub-Page-Cleanup** — 8 Hub-Pages Bottom-Block-Links umbauen auf 3-Altersgruppen-Links (von Einzeljahr-Stubs weg)
3. **GSC Sitemap re-submit** — sitemap.xml hat noch 95 URLs (Stand Welle 33-A), 8 neue Elite-Pages waren bereits in 95 enthalten weil Welle-33-A nur Einzeljahr-Stubs raus geschmissen hat (172→95)
4. **GSC: Indexierung der 8 neuen Elite-Pages beantragen** (manuell, Bolle)
5. **GSC-Reality-Check 7-10 Tage nach Deploy** (3.-5. Juni): springt eine Page vom Status „gecrawlt, nicht indexiert" auf „indexiert"?

## Offene Fragen

- Adv-Reviews der 6 unreviewten Pages: jetzt oder erst nach GSC-Daten?
- piraten-6-8 ist schon Elite (alter Bestand) — sollte mit den anderen piraten-Pages konsistent geprüft werden?

---

# Session-Notiz — 26.05.2026 (Mottos-Sprint Welle 2-11 + Konsistenz-Audit DEPLOYED)

**Branch:** `feat/pferde-ritter-baustelle` → `main` (Ende deploy)

## Sprint-Ergebnis

**3 neue Mottos auf Elite-Niveau** (Score ≥85 nach Anti-Sycophancy-Korrektur):

| Motto | Welle 4 Start | Welle 10 Final | Welle 11 Konsistenz | Lift |
|-------|---------------|-----------------|----------------------|------|
| 🐴 Pferde | 69 | 85 ELITE | Dim-f 93 → erwartet 95 nach Full-Grep-Beleg | +16 |
| ⚔️ Ritter | 70 | 85 ELITE | Dim-f 90, "letzter Strukturriss zu" | +15 |
| 🏗️ Baustelle | 70 | 85 ELITE | Dim-f 90, "0× Architekten-Prüfung, 17× Bauleiter" | +15 |

## Methodik: Chrome-Helfer-v3

3 unabhängige claude.ai-Tabs (Bolle-Login) als Adversarial-Reviewer mit -7 Anti-Sycophancy-Korrektur.
**Sub-Agent-Verbot konsequent eingehalten** — alle Reviews + Patches durch Haupt-Claude direkt.

## Welle-Übersicht

| Welle | Inhalt |
|-------|--------|
| 2-4 | 9 Age-Pages + 3 Schatzsuche + _redirects + sitemap |
| 5 | Phase-B v2.1 — 5 KRITISCHE Naming-Kollisionen |
| 6 | v2.2 — Mini-Fixes Pferde+Ritter, Baustelle |
| 7 | v2.3 — Reitlehrerin/Team-Modell/2L-Flasche/Sofakissen |
| 8 | v2.4 — 6 Druckvorlagen pro Motto (Differenzierungs-Asset) |
| 9 | v2.5 — Wow-Zeit-Präzision + FAQ-Audit |
| 10 | ELITE-Final (alle 3 erreichten 85) |
| 11 | **Konsistenz-Sweep — User-Audit deckte 30+ Welle-5-Stale-Vorkommen auf** |

## User-Audit Welle 11 (KRITISCH)

User-Frage "ist alles homogen gelöst?" deckte auf:

- **Pferde:** 7 Vorkommen entfernter Karten-Personen (Stallmeister Tom, Tierärztin Hanna, Diagnostikerin Anna) in variants/games/bonusGames blieben nach Welle 5/6 stehen
- **Ritter:** 4× "Burgvogtin" als Bewertende + 1× "Stallmeister-Tafel" (Cross-Motto-Leak)
- **Baustelle:** 25+ "Architekten-Prüfung/Briefing/Wettbewerb/..." (Welle 5 hatte NUR signatureRitual.name geändert)

**Welle 11 Konsistenz-Sweep:** Global-Replace in 3 JSONs, Story-Rollen erhalten (Architektin Mia, Architekt Klaus, Reitlehrerin Mia, Hofnarr Tom).

**Full-Grep-Beleg:** Alle 3 Mottos jetzt 0 Stale-Vorkommen (außer _meta.qualityNote Dokumentation).

## Reviewer-Erkenntnis Welle 11

> _"Mein 'FIXED ✅' in Welle 5 war auf Auszug-Basis zu früh. Dein Audit hat recht, ich lag oberflächlich richtig, real falsch."_ — Baustelle-Reviewer

## Was live geht

- 3 neue Hub-Pages: pferde, ritter, baustelle
- 9 neue Age-Group-Pages
- 3 neue Schatzsuche-Pages
- Erweiterte sitemap.xml (+12 URLs)
- Saubere _redirects (Year-URLs → konkrete Age-Range)
- party-worker.js Security-Hardening (Welle 1A-1E, 5 KRITISCH-Fixes)
- CLAUDE.md Helfer-v3-Direktive (Sub-Agent-Verbot)

## Nächste Schritte

- GSC-Indexing-Push für die 12 neuen URLs
- Reality-Check 7 Tage nach Deploy (Task #19)
- Welle 33 Phase 2/3 (8 Light-Pages auf Elite + 14 Elite-Pages nachrüsten)
- party-worker.js auf Cloudflare deployen (Task #15) — Phase-B Worker-Side-Logic ist die andere Seite vom Security-Sprint
