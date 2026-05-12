# Session-Notiz — 12.05.2026 (Sprint 1 V5.2 + AUDIT-Iteration + Knowledge-Transfer-Setup)

## Kontext der Session

Bolle hatte zwei extern eingespielte Strategie-Docs (V2 vom 11.05 + V5.1 Execution-Ready-Ticket-Pack) und wollte sie challengen lassen. Daraus entstand:
1. V5.2-Korrektur des Ticket-Packs (8 sachliche Fixes gegen V5.1)
2. Schlachtplan als 16 PBIs **P1-18 bis P1-33**, in 5 Streams
3. Sprint 1 in einem `/loop 4m`-Cron komplett durchgezogen
4. Self-Audit-Phase: P1-18 AUDIT.md durchlief 3 Iterationen (v1 → v2 → v3)
5. Knowledge-Transfer-Mechanismus via Git etabliert (statt nur Memory)

**WICHTIG — Überschneidung mit Bolles 11.05-Planer-Frisur-Sprint entdeckt:**
Mein Sprint 1 wurde gestartet, ohne dass ich Bolles 11.05-SESSION-NOTES gelesen hatte (Mount war stale, ich hatte auf 30.04-Stand zurückgesetzt). Beim „Ende"-Push heute (12.05) kollidierte mein Push mit Bolles 11.05-Commit (`6b2047f` — Planer-Frisur-Sprint P3-12 bis P3-21). Beim Rebase wurde klar: **P1-22 (mein Minimal-Cockpit) ist faktisch eine vereinfachte Form von P3-13 (Bolles Cockpit-Header).**

Konkret was P1-22 schon liefert (was P3-13 erwartet):
- Cockpit-Box im Plan-View nach Generierung ✓
- Status-Anzeige „Dein Plan steht — Als Nächstes sinnvoll" ✓
- 3 Next-Action-CTAs (Schatzsuche, Einladung, Partyseite) ✓
- Tracking-Events `cockpit_viewed`, `cockpit_cta_clicked` ✓

**Was P1-22 NICHT liefert (P3-13 erwartet zusätzlich):**
- „Stand-Anzeige" der Plan-Konfiguration (Motto/Alter/Gäste/Ort/Dauer) als zentraler Cockpit-Bereich — heute nur in Motto-Badge-Header
- Tieferer Constraint-Solver-Bezug — kommt in P3-14
- Live-Aktualisierung wenn Inputs geändert werden — heute statisch

→ **Empfehlung:** P3-13 kann als „erweitern, nicht neu bauen" durchgeführt werden, baut auf P1-22 auf. Sparen ggü. originaler 1-Tag-Schätzung möglich (~½ Tag, weil Struktur steht).

## Was wurde gemacht — Sprint 1 (V5.2) komplett auf draft

16 Commits ab `c6e08f5`:

| PBI | Commit | Was |
|---|---|---|
| P1-18 v1 | `c6e08f5` | AUDIT.md initial (3 sachliche Fehler) |
| P1-19 | `033d5c7` | Schatzsuche MVP — Redirect raus, eigenständige Landingpage |
| P1-20 | `fca6ee3` | themeRegistry V1 in `js/theme-registry.js` (10 Mottos) |
| P1-21 | `3d217d0` | birthdayProject lokaler State (`js/birthday-project.js`) |
| P1-22 | `c1a304f` | **Minimal-Cockpit im Planer-Ergebnis (≈ P3-13 vorweggenommen)** |
| P1-23 | `0378ca5` | Pre-Fill in Einladung-Tool aus URL-Params + birthdayProject |
| P1-24 | `5a597c7` | Worker-Vertrag gegen V5.1 statisch verifiziert (BESTÄTIGT) |
| P1-25 | `1761b55` | Cockpit → Partyseite direct POST /api/create + Inline-Result |
| P1-26 | `2af00d2` | Worker Share-Moment — Gäste-Link nicht mehr gated **(braucht Worker-Deploy)** |
| P1-27 | `d6360a2` | Allergien Sonderregel — Privacy verifiziert + Copy-Refresh |
| P1-28 | `98fd307` | Einladung-Tool an Cockpit angeschlossen (`?source=cockpit`-Banner) |
| P1-29 | `91904ed` | Worker Abuse-Schutz (Honeypot + Rate-Limits + Origin-Check) |
| P1-30 | `2ce9ef0` | Schatzsuche V2 — Varianten + Drinnen/Außen + Materialarm |
| P1-31 | `87b7fdd` | Einkaufsliste Paketlogik — Sparfuchs/Mittelweg/Komfort-Labels |
| P1-32 | `6e6dac8` | URL-Matrix-Enforcement via `_headers` |
| P1-33 | `d6db666` | `_dev/docs/RELEASE-GATE.md` mit Hard/Soft-Gates |

**Architektur-Pivot in V5.2:** vom „Tool-Set" zum **„Geburtstags-Cockpit"** — lokaler birthdayProject-State, Planer-Output mit Next-Step-CTAs, direkte Partyseite-Übergabe via POST.

## AUDIT-Iteration (P1-18 v1 → v2 → v3)

Self-Audit-Methodik etabliert (challenge → verify → fix → re-bewerten):

| Version | Commit | Was war neu | Self-Score |
|---|---|---|---|
| v1 | `c6e08f5` | Initial-Audit mit 3 sachlichen Fehlern | 6/10 |
| v2 | `494f7d7` | Fehler gefixt, 19 Fix-PBIs F-01..F-19, neue Sektionen | 7.5/10 |
| **v3** | **`6cbb197`** | F-PBIs umbenannt P1-34..P1-59 (Bolles Konvention), Effort mit Worst-Case-Spalte, Severity-Split (User-Sev / Dev-Block), neue §8 Infrastruktur, neue §9 Test-Strategie | **8.5/10** |

**Drei sachliche Fehler in v1**, gefixt in v2/v3:
1. Schatzsuche-Themen-Zahl war 6 → korrekt 9 (im Generator SZ_THEMES)
2. Worker-Motto-Liste „9+Halloween" → korrekt 10 mit Halloween↔Meerjungfrau-Swap
3. P1-20 Commit-Message versprach Validator-Stufe 9 → nie umgesetzt

## Knowledge-Transfer-Mechanismus (commit `34c8064`)

Etabliert: Wissen fließt zwischen Chats via **Git**, nicht via Memory. Drei Kanäle:

1. **AUDIT.md** = Living-Wahrheit. Beim „Start leicht" lesen: §1, §4, §5.2, §13, §15
2. **`_dev/handoff/*.md`** = Session-spezifische Übergaben. Format `YYYY-MM-DD-topic-slug.md` mit TEMPLATE-Struktur. Max 14 Tage Lebensdauer.
3. **BACKLOG-AUDIT.md** = Sprint-Backlog Top-10

**Anti-Patterns dokumentiert:** keine Skill-Edits, keine Parallel-Wahrheiten, keine Memory-als-Primärspeicher.

`.claude/CLAUDE.md` um Sektion „Knowledge-Transfer zwischen Sessions" + „Self-Audit-Methodik" erweitert.

Memory für machsleicht angelegt (war leer, anders als machsruhig):
- `knowledge_transfer_mechanism.md` (reference)
- `self_audit_methodology.md` (feedback)
- `branch_trick_for_machsleicht.md` (reference, Adaption von machsruhig)
- `feedback_no_skill_edits.md` (feedback)
- `active_project_machsleicht.md` (project)

Handoff-Files angelegt:
- `_dev/handoff/TEMPLATE.md` (Vorlage)
- `_dev/handoff/2026-05-12-sprint-1-abschluss.md` (erstes konkretes Beispiel)

## Was nicht passiert ist — ehrliche Status-Bewertung Sprint 1

Der Sprint-1-Code ist **drin**, aber nicht **wirksam aktiv**. Realistischer Status: ~40% wirklich live-fertig, ~30% code-complete & ungetestet, ~20% braucht Worker-Deploy, ~10% Stub.

**Roter Status pro PBI-Gruppe:**
- Worker-Patches (P1-26/27/29) sind in git, **nicht auf Cloudflare deployed** → Live-Wirkung 0
- Browser-Smoke-Tests (Cockpit-Flow, Mobile-E2E) **nicht durchgeführt** → keine Validierung dass die JSX-Änderungen wirklich funktionieren
- Worker-Live-curl-Tests **nicht gegen Production gemacht** → P1-24 nur statische Code-Verifikation
- P1-30 Schatzsuche V2 ist **scope-reduziert** (kein echter Standalone-Builder, nur Content-Erweiterung)
- P1-31 Einkaufsliste ist **scope-reduziert** (nur Label-Refresh, keine separate `/einkaufsliste/<motto>`-Page)
- P1-20 themeRegistry ist **toter Code** (wird nirgends konsumiert)

## Was als nächstes ansteht — Pflicht-Reihenfolge

### Vor Worker-Deploy (4 PBIs, 3.5-9.5h)
- **P1-34** Browser-Smoke-Test Cockpit→Party-Flow (BLOCKER)
- **P1-38** Worker-Live-curl-Tests (CORS, /api/create, Honeypot, Rate-Limit)
- **P1-42** Mobile Chrome End-to-End
- **P1-43** Halloween↔Meerjungfrau-Swap entscheiden + fixen

### Vor Netlify-Deploy auf main (3 PBIs, 0.7-2.4h)
- **P1-35** sitemap.xml `<lastmod>` für `/schatzsuche` auf 2026-05-12
- **P1-36** `?stationen=N` in JSX implementieren ODER aus Variants-CTAs raus
- **P1-41** „Feuerwehr-Schatzsuche kommt"-Copy entfernen (Feuerwehr ist in SZ_THEMES)

### Pre-V5.3 (4 PBIs, 2-3.5h)
P1-37 (`?source` → `?quelle`), P1-40 (Registry um dschungel/feen), P1-44 (BACKLOG-Update), P1-45 (ARCHITECTURE.md auf 9-Mottos)

### Backlog V5.3+ (15 PBIs, 47-124h)
Highlights: P1-39 Worker-Farben-Harmonisierung (L), P1-48 KV-Backup (M, **kritisch**), P1-58 themeRegistry konsumieren, P1-52 CI.

→ **Total Sprint 2+ Effort:** 53-139h ≈ 5-13 Wochen bei 10-15h/Woche.

## Konflikt mit Planer-Frisur-Sprint (Bolle-Entscheidung nötig)

Die beiden Sprints überlappen partiell:
- **P1-22 ≈ P3-13** (Cockpit) — Code-Überschneidung, P1-22 baut Basis, P3-13 kann erweitern
- **P1-25 ≈ P3-20** (Partyseite-Übergabe) — Cockpit-Party-Brücke teilweise da, P3-20 erwartet Plan-RSVP-Loop zusätzlich
- **P1-17 Einkaufsliste** und **P3-17 Drei-Gruppen-Einkaufsliste** sind völlig andere Stoßrichtungen (Labels vs. Inventar-Mechanik)
- Restlich keine Überschneidung

→ **Bolle-Entscheidung:** Sprint-Reihenfolge — erst V5.2-Funnel-Validierung (P1-34/38/42/43 fertig + Deploy → 4 Wochen messen) ODER direkt Planer-Frisur-Sprint (P3-12 bis P3-19) → Conflict-Detail im `_dev/handoff/2026-05-12-sprint-1-abschluss.md`.

## Open Strategy Questions (warten auf Bolle-Entscheidung)

1. **Sprint-Reihenfolge** — V5.2-Funnel-Test fertig vor Planer-Frisur, oder parallel? (siehe oben)
2. **Halloween-Motto** — drin (in Registry + Einladung ergänzen) oder raus (aus Worker streichen)?
3. **Schatzsuche-Themen Dschungel + Feen** — eigene SEO-Pages bauen oder 301-Redirects behalten?
4. **wrangler.toml + Worker-Deploy-Automation (P1-53)** — jetzt aufbauen oder warten bis Sprint 2 mehr Worker-Patches bringt?

Details + Optionen siehe `_dev/handoff/2026-05-12-sprint-1-abschluss.md`.

## Status der Site nach Sprint 1 (nach Deploy)

- **Cockpit-Architektur** im Planer-Ergebnis: 3 Next-Step-CTAs (Schatzsuche, Einladung, Partyseite)
- **Direct API-Übergabe**: Cockpit-CTA „Partyseite anlegen" macht POST /api/create + Inline-Result
- **Schatzsuche** als echte Landing-Page (war 301), 6 Themen-Tiles + Feuerwehr-Beispiel + Varianten + Drinnen/Außen + Materialarm + FAQ
- **birthdayProject** lokal in localStorage als shared Context
- **themeRegistry** (10 Mottos canonical) — verfügbar, aber noch nicht konsumiert
- **noindex/canonical** durch `_headers` für /api, /e/*, /plan, /cockpit
- **Sparfuchs/Mittelweg/Komfort**-Labels statt Minimal/Standard/Wow + Tracking

## Capacity-Update (unverändert)

Bolle investiert >10h/Woche in machsleicht. machsruhig bleibt Hauptprojekt, beide priorisiert.

---

# Session-Notiz — 11.05.2026

## Kontext der Session

Reine **Strategie- und Planungs-Session** zum Planer. Kein Code-Change am Tool selbst. Bolle hat den Planer zur Marktreife & „Spitze des Marktes" durchgesprochen — was fehlt, was wäre Gesprächsthema-Feature, wie wird aus Generator ein intelligentes Produkt ohne API-Kosten. Ergebnis: ein konkreter Frisur-Sprint mit 8 Hauptfeatures plus 2 große Wetten danach. Alle 10 PBIs sind in `BACKLOG-AUDIT.md` als **P3-12 bis P3-21** angelegt und in der Prio-Tabelle oben als „Planer-Frisur-Sprint" sichtbar.

## Was heute analysiert wurde

**Quellen:**
1. **Source-Read** komplett: `_src/kindergeburtstag.jsx` (1352 Z., Wizard + Plan-View + Schatzsuche-Block + alle Sub-Komponenten), `_src/kindergeburtstag-data.js` (LICENSE-Array seit 30.04. leer, aber UI noch nicht zurückgebaut)
2. **STRATEGIE.md** + **BACKLOG-AUDIT.md** als Leitplanken (Funnel-Axiom 0.1, Validierungs-Reihenfolge 0.7, Capacity-Update 30.04., P2-23 als Anker)
3. **Externe Konkurrenz-Recherche** (web_search 11.05.): Top-10 Google für „kindergeburtstag planen" = ausschließlich Blogs/Affiliate-Listen, kein interaktiver Planer. Eysoldt-Partyplaner-App (iOS) ist generischer Erwachsenen-Planer. Actionbound = Schatzsuche-only. **Strukturell keine Tool-Konkurrenz auf machsleicht-Niveau.**
4. **Drei Sparring-Dokumente** vom User eingebracht: eine eigene Lückenanalyse (15 Ideen) + zwei externe Inputs (10+20 Ideen). Ehrlich gegeneinander gestellt, konsolidiert.

## Architektur-Erkenntnis: „intelligent ohne API"

Bolle wollte kategorisch keine API-Kosten. Konsequenz: vier-schichtige Architektur entworfen, alle deterministisch:

1. **Reaktive Outputs mit Diff-Anzeige** — sichtbar machen, was sich durch Eingaben geändert hat (heute fehlt das — Logik ist da, Sichtbarkeit nicht)
2. **Constraint-Solver** — 15–20 Regeln über alle Eingaben (Alter × Gäste × Ort × Erwachsene × Dauer)
3. **Kuratierte Inhalts-Bibliothek** — pro Motto × Alter handgeschrieben, kein Halluzinations-Risiko, **kein Wettbewerber kann das ohne identischen Redaktions-Aufwand klauen**
4. **Templated Generators** — Slot-Filling mit Varianten-Bibliotheken (5 Slots × 3 Optionen = 243 Variationen, deterministisch)

**Einzige API-Ausnahme im Sprint:** Schatzsuche-Rätsel-Gedichte (P3-19), gecacht auf Input-Hash. Geschätzte Kosten 6–9€/Monat bei 1000 Plänen — Premium-Vehikel-fähig, ein expliziter Wow-Anker.

**Bestehende Code-Erkenntnis:** `calcScore()` (Z. 891–923) ist bereits ein primitiver Constraint-Solver, nur deskriptiv (gibt Zahlen aus), nicht handlungsleitend. Refactor zu `analyzeFeasibility()` mit Klartext-Output ist die zentrale Architektur-Investition in P3-14.

## Der Sprint (10 PBIs, P3-12 bis P3-21)

**Tier 0 (sofort, 2 Std):**
- **P3-12** — Sofort-Fixes: Lizenz-Tab raus, „Sieben Mottos" → „Neun Mottos" im SEO-Body, Performance-Baseline messen

**Tier 1 (Sprint-Hauptteil, ~7–9 Arbeitstage = 6–8 Wochen bei 6–8h/Woche):**
- **P3-13** — Cockpit-Header im Plan-View (Stand-Anzeige + Next-Actions, 1 Tag)
- **P3-14** — Machbarkeits-Box + Constraint-Solver-Fundament (1 Tag, zentrale Architektur-Schicht)
- **P3-15** — Datum + Erwachsene als neue Wizard-Inputs (½ Tag, Voraussetzung für P3-16)
- **P3-16** — Vorbereitungskarte (datums-getriebener Wochenplan, 1 Tag, **strukturell einzigartig im Markt**)
- **P3-17** — Drei-Gruppen-Einkaufsliste + „hab ich zuhause"-Inventar (1–2 Tage, Markenkern als Mechanik)
- **P3-18** — SOS-Button im Plan-View (1–2 Tage, einziges Live-Hilfe-Feature im Markt, Premium-fähig)
- **P3-19** — KI-Rätsel-Gedichte für Schatzsuche (1 Tag, einzige API-Ausnahme, Wow-Anker)

**Tier 2 (große Würfe danach, 7–14 Tage):**
- **P3-20** — RSVP-Bridge: Partyseite-Zusagen verändern den Plan (2–3 Tage MVP / 5–7 Tage Vollausbau). Voraussetzung: P3-14 muss stehen.
- **P3-21** — Live-Party-Navigator: Tool führt am Tag durch die Party (5–7 Tage). Größter Wurf, größter Aufwand. Setzt P3-13/14/16/18 voraus.

## Was bewusst nicht im Sprint ist

In `BACKLOG-AUDIT.md` Sprint-Sektion eine Tabelle „Nicht-aufgenommene Vorschläge" mit ~13 Items aus den Sparring-Dokumenten + Begründung + Re-Evaluation-Trigger. Wichtigste Ausschlüsse: Stress-Chips als Wizard-Step (bricht Funnel-Axiom 0.1), Audio-Geschichte (Premium-Stufe 4), Eltern-Stats (braucht Traffic), Plan-B-Generator (Architektur-Bruch). Nicht „nie" — mit klaren Re-Eval-Triggern.

## P2-23 ist mit dem Sprint erfüllt

Bolle hatte in P2-23 bereits dokumentiert: „Motto-Seiten überholen den Planer inhaltlich → Funnel-Versprechen wackelt." Sprint P3-13 bis P3-19 ist die **operative Umsetzung** von P2-23. P2-23-Tabellen-Status auf 🔄 gesetzt, Verweis auf Sprint im Kommentar.

Nach Sprint-Abschluss freigeschaltet: **P2-24** (eingewebte Leckerli-CTAs auf Motto-Seiten) — Trigger laut Backlog war „wenn Planer-Output Elite-Niveau hat".

## Eine Mini-Inkonsistenz beim Schreiben

Sprint-PBIs als `### P3-XX` geschrieben, nicht `#### P3-XX` wie alle anderen PBIs im Doc. Innerhalb der Sprint-Sektion konsistent, doc-weit nicht. Bewusst so gelassen — Fix wäre Frickelei ohne Mehrwert.

## Was als nächstes ansteht

**Bolle hat klar gesagt: „Als Nächstes frisieren wir tagelang den Planer."** Heißt: Sprint-Start mit **P3-12 (Tier 0 Sofort-Fixes)** und dann P3-13/14 in dieser Reihenfolge, weil P3-14 das Constraint-Solver-Fundament ist, auf dem alle nachfolgenden PBIs aufsitzen.

Empfohlene Reihenfolge erste 3 Sessions:
1. **Session 1 (2 Std):** P3-12 komplett — Tier 0 ist erledigt, sauberer Stand
2. **Session 2 (8 Std):** P3-13 Cockpit-Header
3. **Session 3 (8 Std):** P3-14 Constraint-Solver mit Klartext-Box — **wichtigste Architektur-Entscheidung im ganzen Sprint**, alle nachfolgenden Features brauchen das saubere Fundament

**Parallel weiterlaufend (nicht im Sprint, aber auf Bolle-Liste):**
- P1-8 Safari (3-5, 9-12) und Weltraum
- P1-12 Einschulung SEO-Cluster bis 31.05. — **deadline ist überfällig** (heute 11.05., bleibt 20 Tage)
- P1-15 Email-Capture Extern-Tasks (Resend-Audience, Worker-Deploy) — Laptop-Session
- P1-17 DSGVO-Hygiene A+C — Laptop-Session
- Migadu-Entscheidung (Trial endete 08.05., heute 11.05.) — **3 Tage überfällig**

## Offene Fragen / Risiken

- **Capacity-Konflikt machsruhig.** Bolle hat dezidiert „beide Projekte primär" gesagt. 6–8 Wochen Sprint am Planer parallel zu machsruhig bei 6–8h/Woche Capacity ist eng. Wenn der Sprint priorisiert wird, muss machsruhig in der Zeit auf Sparflamme.
- **Inhalts-Aufwand P3-16/17/18 unterschätzbar.** Pro Motto sind das echte Schreib-Aufgaben (Vorbereitungs-Items, Kategorisierung der Einkaufsliste, SOS-Szenarien). Stub-Lösung möglich (Feuerwehr ausgebaut, Rest generisch), echter Vollausbau parallel zu P1-8.
- **P3-19 API-Kosten verifizieren.** 6–9€/Monat ist Schätzung. Vor produktivem Einsatz: 1–2 Tage Cache-Hit-Rate echt messen.
- **P3-20 RSVP-Bridge braucht Plan↔Partyseite-Verknüpfung.** Heute keine durchgehende ID-Brücke. Wenn das nicht erst sauber gelegt wird, ist die Bridge fragil.
- **OG-Bilder Feuerwehr** (`og-feuerwehr-3/6/9.png`) — bleibt offen aus 30.04.
- **Backdoor Tracker** (~07.04 angefangen) — Status weiter unklar.

## Strategie-Updates

Keine Änderungen an `STRATEGIE.md` heute. Sprint-Anker für „Planer als intelligentes Produkt" hängt sich an Strategie 0.7 (Monetarisierungs-Validierungs-Reihenfolge): P3-18 (SOS) und P3-19 (KI-Reime) sind beide Stufe-1-Validierungs-Vehikel (zahlen Eltern für digitale Mikro-Upsells?). Aufschreiben in STRATEGIE.md fällig, sobald erster Mikro-Upsell live geht.
