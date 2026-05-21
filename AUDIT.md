# Repo + Routing Inventur — AUDIT v3

Stand: 2026-05-12. Verbindlich vor jedem Patch. Self-audit-validiert.

## Verwandte Dokumente

| Doku | Zweck | Pflege-Frequenz |
|---|---|---|
| `AUDIT.md` (diese Datei) | Repo-/Routing-/Datenwahrheit-Grundwahrheit | Pro Sprint update + bei Architektur-Wechsel |
| `_dev/docs/WORKER-CONTRACT.md` | Worker-API-Vertrag + Live-Test-Commands | Bei Worker-Endpoint-Wechsel |
| `_dev/docs/RELEASE-GATE.md` | Pre-Deploy-Checkliste (Hard/Soft-Gates) | Bei neuen QA-Anforderungen |
| `SESSION-NOTES.md` | Session-Verlauf, „Was wurde gemacht/offen" | Pro „Ende"/„Ende deploy" |
| `STRATEGIE.md` | Master-Strategie, Monetarisierungs-Logik, Cut-Begründungen | Bei Strategie-Pivot |
| `BACKLOG-AUDIT.md` | Priorisierte PBI-Liste (P1-NN) | Pro Sprint-Planning |
| `ARCHITECTURE.md` | Architektur-Übersicht | **AKTUELL VERALTET — Fix P1-45** |
| `.claude/CLAUDE.md` | Git-Workflow, Deploy-Regeln, PBI-Impact-Check | Bei Workflow-Wechsel |

---

## Inhaltsverzeichnis

1. [Repo-Standort, Branches, Identität](#1-repo-standort-branches-identität)
2. [Routing-Map](#2-routing-map)
3. [Build-Pipeline](#3-build-pipeline)
4. [URL-Param-Konvention](#4-url-param-konvention)
5. [Motto-Datenwahrheit](#5-motto-datenwahrheit)
6. [Worker-Vertrag](#6-worker-vertrag)
7. [Tracking-Infrastructure](#7-tracking-infrastructure)
8. [Infrastruktur](#8-infrastruktur-dns-deps-backups-limits)
9. [Test-Strategie](#9-test-strategie)
10. [Sitemap-Update-Regeln](#10-sitemap-update-regeln)
11. [Geister-Files](#11-geister-files)
12. [Doku-Veraltheits-Konflikte](#12-doku-veraltheits-konflikte)
13. [Fix-PBI-Liste](#13-fix-pbi-liste-p1-34-bis-p1-52)
14. [Pre-Flight-Checks](#14-pre-flight-checks)
15. [Offene Strategie-Entscheidungen](#15-offene-strategie-entscheidungen)
16. [Versions-Historie](#16-versions-historie)

---

## 1. Repo-Standort, Branches, Identität

| Aspekt | Wert |
|---|---|
| Produktives Working-Repo | `C:/Users/Bolle/machsleicht-deploy/` |
| Korrupter Repo (NICHT nutzen) | `Projects/machsleicht/machsleicht-deploy/` (OneDrive-`.git` defekt) |
| Remote | `https://github.com/Bollesan91/machsleicht-deploy.git` |
| Arbeits-Branch | `draft` (Netlify deployt NICHT von draft) |
| Deploy-Branch | `main` (Netlify deployt bei jedem Push) |
| Worker-Deploy-Logik | KEINE — Worker manuell via Cloudflare-Dashboard (siehe §3+§8) |
| Git-Identity | `Bollesan91` / `cbollweg@gmx.de` (in `.git/config`) |
| Commit-Sprache | Deutsch |
| Co-Author-Header | `Co-Authored-By: Claude <noreply@anthropic.com>` |
| Skip-Netlify-Tag | `[skip netlify]` im Commit-Subject bei Docs/Tests/`_dev/` |

---

## 2. Routing-Map

### 2.1 Statische Routen (Netlify rewrites)

| URL-Pfad | Datei | Indexierung | Notiz |
|---|---|---|---|
| `/` | `index.html` | index | Homepage React-App in #root |
| `/kindergeburtstag` | `kindergeburtstag.html` + `js/kindergeburtstag.js` | index | Haupttool, Cockpit (P1-22) |
| `/kindergeburtstag/<motto>` | `kindergeburtstag/<motto>.html` (Rewrite) | index | 7 Motti (§5) |
| `/kindergeburtstag/<motto>-<X>-jahre` | `kindergeburtstag/<motto>-<X>-jahre.html` | index | Longtail |
| `/kindergeburtstag/3-5-jahre`, `/6-8-jahre`, `/9-12-jahre` | `kindergeburtstag/<X>-jahre.html` | index | Altersgruppen-Cluster |
| `/schatzsuche` | `schatzsuche.html` (P1-19+P1-30 neu) | index | War 301, jetzt Standalone |
| `/schatzsuche/<motto>` | `schatzsuche/<motto>.html` | index | 6 statische Motti (§5) |
| `/einladung` | `einladung/index.html` | index | Hub mit 10 Motti |
| `/einladung/<motto>` | `einladung/<motto>/index.html` | index | Gästeansicht, 10 Motti |
| `/einladung/erstellen` | `einladung/erstellen/index.html` | index | Host-Tool |

### 2.2 Dynamische / private Routen

| URL-Pfad | Handler | Indexierung |
|---|---|---|
| `/e/<slug>` | Rewrite → `/.netlify/functions/serve-invite` | noindex (P1-32 `_headers`) |
| `/api/hit`, `/api/event` | `netlify/functions/{hit,event}.js` (Tracking-Beacons) | noindex |
| `/.netlify/functions/*` | siehe `netlify/functions/` | noindex |
| `party.machsleicht.de/*` | Cloudflare-Worker `party-worker.js` | Worker setzt `<meta robots="noindex,nofollow">` |
| `party.machsleicht.de/api/*` | Worker-Endpoints (§6) | noindex |
| `/plan`, `/cockpit` | nicht implementiert, in V5.1-Matrix für später | noindex via `_headers` |

### 2.3 `/e/<slug>`-Flow (traced)

1. User klickt WhatsApp-Einladung `https://machsleicht.de/e/anna-eyJuIjoi...`
2. Netlify `_redirects`: `/e/* /.netlify/functions/serve-invite 200`
3. `serve-invite.mjs`: splittet Slug auf erstem `-`, decodet base64url → `{n,d,t,o,p,m}`
4. Liefert `einladung/<motto>/index.html` mit URL-Params für die React-Gästeansicht
5. Gast spielt Mini-Spiel → RSVP-Button → WhatsApp-Reply zum Host

**Erstellung:** `netlify/functions/create-invite.mjs` (POST von `einladung/erstellen`), validiert Motto gegen hardcoded `VALID_MOTTOS` (10 Slugs), encodet als base64url, prepended mit clean-name.

---

## 3. Build-Pipeline

### 3.1 React-Bundle `kindergeburtstag.js`

| Komponente | Wert |
|---|---|
| Source-JSX | `_src/kindergeburtstag.jsx` (~1380 Z. nach Sprint 1) |
| Source-Data | `_src/kindergeburtstag-data.js` (~1840 Z.) |
| Build | `bash _src/build.sh` (npx esbuild) |
| Output | `js/kindergeburtstag.js` (~267KB / 3347 Z.) |
| Git-tracked | **JA** — Netlify deployt as-is, **kein Build auf Netlify-Seite** |
| **Falle** | Wer `_src/*` ändert MUSS `bash _src/build.sh` lokal laufen lassen + Output committen. Vergessen = alter Stand live |

### 3.2 React-Apps in `einladung/<motto>/` (10×)

- Inline-React-Bundles in den `index.html` (800-1800 Z. je Motto)
- Kein Build-Step — Source = Output
- Hohe Code-Duplikation (10× ähnliche Files)

### 3.3 Netlify-Functions

`netlify/functions/*.mjs` und `*.js` werden automatisch via Netlify-eigenem esbuild gebaut bei jedem Deploy auf `main`.

### 3.4 Cloudflare-Worker

| Aspekt | Wert |
|---|---|
| Datei | `party-worker.js` (1814 Z. nach P1-29) |
| Deploy | **MANUELL** via Cloudflare-Dashboard (kein wrangler.toml im Repo) |
| Konsequenz | P1-26/P1-27/P1-29 sind erst nach manuellem Deploy live |
| KV-Binding | `PARTY` (siehe §8 für Backup-Risiko) |
| Env-Vars (Cloudflare-Dashboard) | `AMAZON_TAG`, `AWIN_PUBLISHER_ID`, `RESEND_API_KEY`, `RESEND_FROM`, `RESEND_AUDIENCE_ID` |

---

## 4. URL-Param-Konvention

**Regel:** Externe URL-Params **deutsch**, interne JS-Property-Namen **englisch**.

### 4.1 Etablierte Params (alle deutsch)

| Param | Verwendung | Reader-Code |
|---|---|---|
| `?motto=<slug>` | Motto pre-select | `kindergeburtstag.jsx` Z.775; `einladung/erstellen` Z.~397 |
| `?alter=<3..12>` | Alter pre-select | `kindergeburtstag.jsx` Z.777 |
| `?gaeste=<1..20>` | Gäste-Anzahl pre-select | `kindergeburtstag.jsx` Z.778 |
| `?modus=schatzsuche` | Schnitzeljagd aktivieren | `kindergeburtstag.jsx` Z.781 |
| `?thema=<sz-slug>` | Schatzsuche-Theme pre-select | `kindergeburtstag.jsx` Z.786 |
| `?name=<childName>` | childName pre-select | `einladung/erstellen` (P1-23) |
| `?datum=`, `?uhrzeit=`, `?ort=` | Einladungs-Felder | `einladung/erstellen` (P1-23) |

### 4.2 Bekannte Konventions-Brüche

| Param | Problem | Eingeführt in | Fix |
|---|---|---|---|
| `?source=cockpit` | englisch statt deutsch | P1-28 (selbst-introducierter Bruch) | P1-37 (S, 15 Min): rename zu `?quelle=cockpit` in JSX + Reader |
| `?stationen=<3\|5\|7>` | toter Param, kein Reader im JSX | P1-30 (V2-Varianten) | P1-36 (S, 30 Min): in JSX implementieren ODER aus CTAs raus |
| `?theme=<slug>` | Worker-intern, mixed mit `?motto=` | Pre-existing Worker-Code | nicht-blockierend, Worker-intern |

### 4.3 Interne JS-Property-Namen (englisch)

`birthdayProject.{theme.slug, child.firstName, party.startTime, …}`, `partyPayload.{childName, age, motto, mottoEmoji, mottoColor, …}`.

---

## 5. Motto-Datenwahrheit

### 5.1 Alle Motto-Quellen im Repo (7 Quellen, verifiziert per Grep)

| # | Quelle | Anzahl | Slugs |
|---|---|---|---|
| 1 | `_src/kindergeburtstag-data.js` GENERIC (= `ALL_MOTTOS`) | **9** | detektiv, dino, **dschungel**, einhorn, **feen**, feuerwehr, piraten, safari, weltraum |
| 2 | `_src/kindergeburtstag-data.js` SZ_THEMES (Schatzsuche) | **9** | identisch mit (1) |
| 3 | `kindergeburtstag.html` `data-motto`-Buttons (SEO-Fallback) | **7** | detektiv, dino, einhorn, feuerwehr, piraten, safari, weltraum (kein dschungel/feen) |
| 4 | `einladung/erstellen/index.html` MOTTO_CONFIG | **10** | (3) + superheld, prinzessin, **meerjungfrau** |
| 5 | `party-worker.js` MOTTO_COLORS | **10** | (3) + superheld, prinzessin, **halloween** (KEIN meerjungfrau) |
| 6 | `netlify/functions/create-invite.mjs` VALID_MOTTOS | **10** | (4) — identisch mit Einladung |
| 7 | `js/theme-registry.js` (P1-20) | **10** | (4) — identisch mit Einladung |

`LICENSE`-Array in `_src` ist leer (post-Cut 29.04).

### 5.2 Brüche

#### A — Halloween ↔ Meerjungfrau Swap (Worker vs Rest)

- Worker: …prinzessin, **halloween**
- Registry/Einladung/Create-Invite: …prinzessin, **meerjungfrau**

**User-Wirkung:** Meerjungfrau-Partyseite → Worker fällt auf Default-Farbe `#D4812A`. Halloween-Geburtstag existiert nirgendwo außer im Worker-Color-Mapping.

→ Strategie-Frage offen (§15): Halloween behalten oder rauswerfen? Meerjungfrau im Worker ergänzen oder rausstreichen?

#### B — Dschungel + Feen sind Schatzsuche-only

- 9 in ALL_MOTTOS + SZ_THEMES, aber nicht im Planer-Hub (7), nicht im Einladungs-Tool (10), nicht im Worker
- **Bewusste Architektur:** Dschungel/Feen sind Schatzsuche-Themen, nicht vollständige Geburtstags-Pläne
- Sollte im Registry explizit als `modules: ["treasure"]` markiert sein → **P1-40**

#### C — Worker MOTTO_COLORS weichen von Registry ab (alle 9 Mottos!)

Verifiziert per Grep am 2026-05-12:

| Motto | Registry/Einladung | Worker | Unterschied |
|---|---|---|---|
| piraten | `#FFD700` Gold | `#8B4513` Saddle Brown | massiv |
| einhorn | `#E1BEE7` Pale Purple | `#E040A0` Hot Pink | massiv |
| dino | `#66BB6A` Light Green | `#4CAF50` Green | leicht |
| feuerwehr | `#FF7043` Orange | `#D32F2F` Dark Red | massiv |
| weltraum | `#CE93D8` Light Purple | `#1565C0` Strong Blue | **massiv** (komplett andere Hue) |
| prinzessin | `#F48FB1` Pale Pink | `#E91E63` Strong Pink | mittel |
| safari | `#FF9800` Orange | `#F57F17` Dark Orange | leicht |
| detektiv | `#78909C` Blue Grey | `#37474F` Dark Blue Grey | mittel |
| superheld | `#EF5350` Red | `#D32F2F` Dark Red | mittel |

**Lesart:** Worker-Farben = dunkler/saturierter (für dunkle Partyseite-Themes), Registry = heller/pastelliger (für helle UI auf machsleicht.de). Konzeptionell legitim, aber undokumentiert + Single-Source-of-Truth-Verletzung.

→ **P1-39** (Effort L, 6-10h Worst-Case): Registry um `partyColor` ergänzen, Worker konsumiert Registry.

#### D — Validator prüft Registry NICHT (Versprechen aus P1-20 nicht eingehalten)

P1-20-Commit sagte „Validator-Stufe 8 erweitern → prüft Registry = ItemList". Tatsächlich: 0 Referenzen auf `theme-registry` oder `MACHSLEICHT_THEMES` in `validate-all.sh`.

→ **P1-46** (M-L, 3-5h): Stufe 9 implementieren.

---

## 6. Worker-Vertrag

### 6.1 Endpoints (Line-Numbers Stand nach P1-29)

| Methode | Path | Z. | Zweck | Abuse-Schutz (P1-29) |
|---|---|---|---|---|
| POST | `/api/create` | 166 | Partyseite erstellen | Origin-Check, 5/h, 700KB |
| GET | `/api/party/:id` | 206 | Daten holen | — |
| PUT | `/api/party/:id` | 221 | Daten ändern | editToken, 50KB |
| POST | `/api/party/:id/rsvp` | 246 | Gast-RSVP | Honeypot, 10/h, 5KB |
| POST | `/api/party/:id/wish/:wid/claim` | 273 | Geschenk reservieren | 20/h, 5KB |
| GET | `/api/photo/:id` | 296 | Foto laden | — |
| GET | `/api/photoRound/:id` | 304 | Round-Foto | — |
| POST | `/api/party/:id/send-edit-link` | 312 | Resend-E-Mail | 5/h, 5KB |
| GET | `/go/:partyId/:wishId` | 407 | Affiliate-Redirect | nur existierende Wünsche |
| GET | `/api/newsletter-confirm` | 426 | DOI-Confirm | — |
| GET | `/` | 487 | Creator-Form UI | — |
| GET | `/<id>` | 490 | Partyseite (Public + Edit-Mode) | — |

### 6.2 CORS

`Access-Control-Allow-Origin: *` global (`party-worker.js` Z.9). P1-29 hat zusätzlich `checkOrigin()` für POST `/api/create` + `/send-edit-link` mit Allowlist `https://machsleicht.de` + Subdomains.

### 6.3 KV-Storage

| Key-Pattern | Zweck | TTL |
|---|---|---|
| `party:<id>` | Partyseiten-Daten | 90 Tage nach Party-Datum |
| `photo:<id>`, `photoRound:<id>` | Foto-Base64 | gleich wie party |
| `rl:create:<ipHash>` | Rate-Limit /api/create | 1h |
| `rl:rsvp:<id>:<ipHash>` | Rate-Limit RSVP | 1h |
| `rl:claim:<id>:<ipHash>` | Rate-Limit Wish-Claim | 1h |
| `rl:editlink:<ipHash>` | Rate-Limit send-edit-link | 1h |

---

## 7. Tracking-Infrastructure

### 7.1 Doppel-Setup

- **mlTrack:** `navigator.sendBeacon('/api/event', ...)` (Netlify Function) — eigener Logging-Endpoint
- **Umami:** `cloud.umami.is/script.js`, data-website-id `72b5eb12-…`
- **Plausible-Shim:** `window.plausible()` → `umami.track()` (Legacy-Kompatibilität)

### 7.2 Events nach Sprint 1

Total ~30 Events. Vollständige Liste in [_dev/docs/RELEASE-GATE.md §7](_dev/docs/RELEASE-GATE.md).

**Tracking-Backlog (fehlende Events):** `planner_started`, `treasure_generated`, `invitation_created`, `print_clicked`.

---

## 8. Infrastruktur (DNS, Deps, Backups, Limits)

### 8.1 Hosting + DNS

| Komponente | Hoster | Domain |
|---|---|---|
| Hauptseite (HTML + Netlify Functions) | Netlify | `machsleicht.de` |
| Partyseite (Worker + KV) | Cloudflare Workers | `party.machsleicht.de` |
| Analytics | Umami Cloud | `cloud.umami.is` |
| Email-Versand | Resend | API `api.resend.com` |
| Affiliate | Amazon PartnerNet (Tag `machsleicht-21`) + Awin | n/a |

**DNS-Setup für `party.machsleicht.de`:** vermutlich Cloudflare Workers Custom Domain (CNAME). **Nicht im Repo dokumentiert** — wenn Domain-Routing gewechselt wird, muss man im Cloudflare-Dashboard nachschauen.

### 8.2 Dependencies

**Root `package.json`:**
```json
{ "devDependencies": { "esbuild": "^0.28.0", "prettier": "^3.8.1" } }
```

**`_dev/config/package.json`:**
```json
{ "dependencies": { "docx": "^9.6.1" } }
```

- `esbuild`: Build-Tool für JSX (devDep, nur lokal nötig)
- `prettier`: Code-Formatter (nicht im CI verwendet)
- `docx`: nur für `_dev/docs/*.docx`-Generierung (Bolle macht Strategie-Docs)
- **Kein npm im Produktiv-Path:** Netlify-Functions nutzen nur eingebaute Node-Module
- Lock-Files: `_dev/config/package-lock.json` für docx, kein Root-Lock-File (esbuild via npx, on-the-fly)

### 8.3 KV-Backup-Risiko (KRITISCH)

**Aktueller Zustand:** Keine Backup-Strategie für Cloudflare-KV. Wenn KV-Namespace `PARTY` versehentlich gelöscht oder leer-deployed wird, sind **alle aktiven Partyseiten** weg (Gäste-Links 404). Worst-Case: ein Host hat 10 Tage vor seiner Party den Link verteilt, Daten weg.

**Aktuelle Mitigation:** TTL = 90 Tage nach Party-Datum. Alte Partyseiten verschwinden automatisch. Schadensfenster maximal 90 Tage.

→ **P1-48** (M, 4-6h): Wöchentlicher KV-Dump via Worker-Cron in R2-Bucket oder externes Storage.

### 8.4 Resend-Limits

- Free-Tier: 100 Mails/Tag, 3000/Monat
- Worker-Code (`party-worker.js` Z.337+): `if (!env.RESEND_API_KEY) return 500` — Worker funktioniert ohne RESEND_API_KEY, nur Mail-Versand failt
- **Bei Quota-Überschreitung:** Mail-Send failed, Partyseite trotzdem live (User kann editUrl noch manuell kopieren — durch P1-26 Share-Moment-Fix sichtbar)

**Risiko:** Wenn Funnel-Traffic explodiert (z.B. viral), reichen 100 Mails/Tag nicht. Backlog-Item für später.

### 8.5 Worker Environment Variables

Aktuell verwendet (`party-worker.js`-Grep):
- `AMAZON_TAG` — Z.16 (Affiliate)
- `AWIN_PUBLISHER_ID` — Z.30 (Affiliate)
- `RESEND_API_KEY` — Z.337, 383, 446 (Mail + Audience)
- `RESEND_FROM` — Z.387 (default fallback: `mach's leicht <party@machsleicht.de>`)
- `RESEND_AUDIENCE_ID` — Z.443 (Newsletter-Audience für DOI-Flow)

→ **P1-49** (S, 30 Min): `_dev/docs/ENV-VARS.md` als Inventar dieser Variablen mit Quellen.

---

## 9. Test-Strategie

### 9.1 Aktueller Zustand

- **Unit-Tests:** keine
- **Integration-Tests:** keine
- **E2E-Tests:** keine
- **Manuelle QA:** `_dev/docs/RELEASE-GATE.md` Hard-Gates
- **Validator:** `validate-all.sh` — prüft Motto-Konsistenz, ItemList-Schema, Stufe 8 für veraltete Zahlen. **STUFE 1 (JS-Syntax) ist Windows-Path-broken.**

### 9.2 Minimum-Ziel-State

| Test-Typ | Zielzustand | Effort |
|---|---|---|
| Validator-Stufe 9 für Registry-Konsistenz | implementiert | P1-46 |
| Worker-curl-Smoke-Test als Bash-Skript | `_dev/scripts/smoke-worker.sh` | P1-50 |
| BirthdayProject-Util Unit-Tests | Node-Tests mit Mock-LocalStorage | P1-51 |
| CI auf Push (GitHub Actions) | run validator + smoke-tests | P1-52 (XL, 1 Woche) |

---

## 10. Sitemap-Update-Regeln

Bei Inhalts-/Strukturwechsel einer Page: `sitemap.xml` `<lastmod>` aktualisieren.

| PBI | Page | Update nötig? | Status |
|---|---|---|---|
| P1-19 | `/schatzsuche` | **JA** (war 2026-04-05) | **NICHT GEMACHT** → P1-35 |
| P1-22 | `/kindergeburtstag` | nein (React-Bundle, kein HTML-Wechsel) | OK |
| P1-30 | `/schatzsuche` | JA (Page erweitert) | **NICHT GEMACHT** → P1-35 |
| P1-31 | `/kindergeburtstag` | nein (nur JSX-Label) | OK |

---

## 11. Geister-Files

~190 Lizenz-Motto-Files vom 29.04-Cut sind lokal weiter vorhanden (siehe `git status`). 10× `party-worker-FIXn-2026-04-21.js`-Backups. **Live-Wirkung: keine** (nicht in git). 

**P1-47** (S, 15 Min): `git clean -fd` mit Whitelist.

---

## 12. Doku-Veraltheits-Konflikte

| Datei | Stand | Konflikt |
|---|---|---|
| `ARCHITECTURE.md` (218 Z.) | „17 Mottos, 9 Themen" — April 2026 | Post-Cut 9 Mottos → P1-45 |
| `STRATEGIE.md` | laut SESSION-NOTES aktualisiert | nicht re-verifiziert |
| `BACKLOG-AUDIT.md` | bis P1-16 | Sprint 1 (P1-18..33) + Fix-PBIs (P1-34..52) NICHT eingepflegt → P1-44 |
| `SESSION-NOTES.md` | 30.04 | Sprint 1 NICHT eingearbeitet (kommt beim nächsten „Ende") |

---

## 13. Fix-PBI-Liste P1-34 bis P1-52

Severity-Spalten:
- **User-Sev:** Wie sehr betrifft Real-User (HOCH/MITTEL/NIEDRIG)
- **Dev-Block:** Ist das ein Blocker für weitere Entwicklung? (BLOCKER/EMPFOHLEN/OPTIONAL)
- **Effort:** Best-Case → Worst-Case in Stunden

### 13.1 Pflicht vor Worker-Deploy

| PBI | Was | User-Sev | Dev-Block | Effort | Ursprung |
|---|---|---|---|---|---|
| **P1-34** | Browser-Smoke-Test Cockpit→Partyseite-Flow | — | **BLOCKER** | 1-2h → 3h | Sprint 1 ungeprüft |
| **P1-38** | Worker-Live-curl-Tests (CORS, /api/create, Honeypot, Rate-Limit) | — | **BLOCKER** | 1-2h → 3h | P1-24 nur statisch |
| **P1-42** | Mobile-Chrome End-to-End-Test | — | **BLOCKER** | 1h → 2h | Sprint 1 |
| **P1-43** | Halloween↔Meerjungfrau-Worker-Swap entscheiden + fixen | HOCH wenn Meerjungfrau-Nutzung | EMPFOHLEN | 0.5h → 1.5h | Pre-existing, P1-20 nicht behoben |

### 13.2 Pflicht vor Netlify-Deploy auf main

| PBI | Was | User-Sev | Dev-Block | Effort | Ursprung |
|---|---|---|---|---|---|
| **P1-35** | sitemap.xml `<lastmod>` für `/schatzsuche` auf 2026-05-12 | MITTEL | OPTIONAL | 5 Min → 10 Min | P1-19+P1-30 |
| **P1-36** | `?stationen=N` in JSX implementieren ODER aus Variants-CTAs raus | MITTEL | OPTIONAL | 30 Min → 2h | P1-30 |
| **P1-41** | „Feuerwehr-Schatzsuche kommt als nächstes"-Copy entfernen (existiert in SZ_THEMES) | MITTEL | OPTIONAL | 5 Min → 5 Min | P1-19 (Cascade aus v1-AUDIT-Fehler) |

### 13.3 Pre-V5.3 Empfehlung (saubere Basis)

| PBI | Was | User-Sev | Dev-Block | Effort | Ursprung |
|---|---|---|---|---|---|
| **P1-37** | `?source=cockpit` → `?quelle=cockpit` (deutsch wie Konvention) | NIEDRIG | OPTIONAL | 15 Min → 30 Min | P1-28 selbst-eingeführt |
| **P1-40** | Registry erweitern um dschungel + feen (`modules: ["treasure"]`) | NIEDRIG | OPTIONAL | 15 Min → 30 Min | P1-20 |
| **P1-44** | BACKLOG-AUDIT.md um P1-18 bis P1-52 ergänzen | — | EMPFOHLEN | 45 Min → 1h | Pre-existing |
| **P1-45** | ARCHITECTURE.md auf 9-Mottos-Stand + Cockpit-Architektur | — | EMPFOHLEN | 45 Min → 2h | Pre-existing |

### 13.4 Backlog V5.3+

| PBI | Was | User-Sev | Dev-Block | Effort | Ursprung |
|---|---|---|---|---|---|
| **P1-39** | Worker-MOTTO_COLORS vs Registry harmonisieren (color + partyColor in Registry) | MITTEL | OPTIONAL | 3h → 10h | Pre-existing |
| **P1-46** | Validator-Stufe 9 für Registry-Konsistenz | — | EMPFOHLEN | 3h → 5h | P1-20 false claim |
| **P1-47** | Geister-Files Cleanup via `git clean` | — | OPTIONAL | 15 Min → 30 Min | Pre-existing |
| **P1-48** | KV-Backup-Strategie (Worker-Cron → R2) | HOCH wenn KV-Loss | EMPFOHLEN | 4h → 8h | Pre-existing |
| **P1-49** | `_dev/docs/ENV-VARS.md` als Inventar | — | OPTIONAL | 30 Min → 1h | Pre-existing |
| **P1-50** | `_dev/scripts/smoke-worker.sh` als bash-curl-Test-Suite | — | EMPFOHLEN | 2h → 4h | Pre-existing |
| **P1-51** | BirthdayProject + theme-registry Unit-Tests (Node) | — | OPTIONAL | 2h → 4h | Pre-existing |
| **P1-52** | GitHub Actions CI für validator + smoke-tests | — | OPTIONAL | 8h → 24h | Pre-existing |
| **P1-53** | wrangler.toml + Worker-Deploy-Automation | NIEDRIG (aktuell manuelles Deploy funktioniert) | OPTIONAL | 3h → 7h | Pre-existing |
| **P1-54** | OG-Bilder Feuerwehr-3/6/9 erstellen | NIEDRIG (Pinterest/Social) | OPTIONAL | Asset-Erstellung 1-3h | Pre-existing |
| **P1-55** | Schatzsuche V2 Quick-Builder als echtes Form-Element | NIEDRIG (MVP funktioniert) | OPTIONAL | 10h → 18h | P1-30 scope-reduziert |
| **P1-56** | Standalone `/einkaufsliste/<motto>`-Pages | NIEDRIG | OPTIONAL | 8h → 16h | P1-31 scope-reduziert |
| **P1-57** | Print-Styles für schatzsuche.html | NIEDRIG | OPTIONAL | 30 Min → 1h | P1-19 |
| **P1-58** | themeRegistry KONSUMIEREN (mind. 1 Stelle, sonst toter Code) | NIEDRIG | EMPFOHLEN | 4h → 12h | P1-20 |
| **P1-59** | Resend-Quota-Monitoring + Fallback wenn 100/Tag erreicht | NIEDRIG bis HOCH bei viralem Traffic | OPTIONAL | 4h → 8h | Pre-existing |

### 13.5 Effort-Summen

| Phase | PBIs | Best-Case | Worst-Case |
|---|---|---|---|
| Vor Worker-Deploy | P1-34/38/42/43 | 3.5h | 9.5h |
| Vor Netlify-Deploy | P1-35/36/41 | 0.7h | 2.4h |
| Pre-V5.3 | P1-37/40/44/45 | 2h | 3.5h |
| Backlog V5.3+ | P1-39/46-59 | 47h | 124h |
| **Total** | 23 PBIs | **53h** | **139h** |

→ **Realistisch bei 10-15h/Woche: 5-13 Wochen** für komplettes Sprint-2+ Programm.

---

## 14. Pre-Flight-Checks

1. **Auf draft sein:** `git checkout draft && git pull -q origin draft`
2. **Working Tree state bewusst:** `git status` — bekannte Geister-Files akzeptieren (siehe §11) ODER vorher P1-47
3. **Vor JSX-Änderung:** Component-Position im `App()` ab Z.715 prüfen
4. **Nach JSX-Änderung:** `bash _src/build.sh` + JSX + JS gemeinsam committen
5. **Nach Worker-Patch:** `node --check party-worker.js` + Commit-Message explizit „braucht Worker-Deploy"
6. **Vor Commit:** `bash validate-all.sh` (Windows-Path-Bug Stufe 1 bekannt-akzeptiert)
7. **Commit-Sprache Deutsch:** `[skip netlify]` wenn nicht live-relevant
8. **Cross-Check:** `git log --oneline -3`
9. **Sitemap-Update?** §10 prüfen

---

## 15. Offene Strategie-Entscheidungen

Diese Fragen brauchen Bolles Entscheidung, nicht Dev-Arbeit:

1. **Halloween:** Strategisch gewollt (saisonal, Q4-Funnel) oder Altlast aus Worker? → Entscheidet ob P1-43 ein Add (Halloween in Registry) oder Remove (Halloween aus Worker) ist.
2. **Meerjungfrau:** Im Einladungs-Tool nur ein Fallback-Motto, oder soll es echte Partyseite-Unterstützung haben? → Entscheidet ob Meerjungfrau-Color in Worker ergänzt wird.
3. **Schatzsuche-Themen-Strategie:** Dschungel + Feen haben SEO-Redirects (zu Safari + Einhorn). Sollen sie eigene Pages bekommen oder bleiben sie 301?
4. **Plan / Cockpit-URLs:** V5.1 hatte sie als noindex-followable Routes. Implementieren oder Konzept aufgeben?
5. **Worker-Deploy-Automation:** wrangler.toml lohnt nur, wenn Worker-Patches häufig kommen. Aktuelle Frequenz: ~3 in 2 Tagen. → Wenn Sprint 2 weitere Worker-Patches bringt, lohnt P1-53. Sonst aufschieben.

---

## 16. Versions-Historie

| Version | Datum | Was |
|---|---|---|
| v1 | 2026-05-11 | Initial-Audit aus P1-18 (3 sachliche Fehler, 2 Auslassungen) |
| v2 | 2026-05-12 | Korrekturen: Schatzsuche 9, Worker 10 mit Swap, ALL_MOTTOS-Quelle, ARCHITECTURE.md-Konflikt, /e/<slug>-Flow, Build-Pipeline-Pre-built-Detail, 19 Fix-PBIs F-01..F-19 |
| **v3** | **2026-05-12** | **Self-audit-Fixes:** Safari-Farbe verifiziert (auch inkonsistent → alle 9 Mottos sind unterschiedlich), F-PBIs umbenannt P1-34..P1-59 (Bolles Konvention), Effort mit Worst-Case-Spalte, Severity-Split User-Sev vs Dev-Block, neue §8 Infrastruktur (DNS/Deps/KV-Backup/Resend-Limits), neue §9 Test-Strategie, Verwandte-Dokumente-Block oben, TOC, neue PBIs P1-48/49/50/51/52/59 |
