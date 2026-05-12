# Repo + Routing Inventur (P1-18 v2)

Stand: 2026-05-12. **Korrigierte Version** mit Fixes aus dem Self-Audit. Verbindlich vor jedem V5.2-Patch.

> **Versions-Notiz:** v1 vom 2026-05-11 hatte drei sachliche Fehler (Schatzsuche-Themen-Zahl, Worker-Motto-Swap, falscher Validator-Claim). v2 fixt diese und ergänzt fehlende Bereiche.

---

## 1. Repo-Standort, Branches, Identität

| Aspekt | Wert |
|---|---|
| Produktives Working-Repo | `C:/Users/Bolle/machsleicht-deploy/` |
| Korrupter Repo (NICHT nutzen) | `Projects/machsleicht/machsleicht-deploy/` (OneDrive-`.git` defekt) |
| Remote | `https://github.com/Bollesan91/machsleicht-deploy.git` |
| Arbeits-Branch | `draft` (Netlify deployt NICHT von draft) |
| Deploy-Branch | `main` (Netlify deployt auf Push) |
| Worker-Branch-Logik | KEINE — Worker wird manuell deployed (siehe §3) |
| Git-Identity | `Bollesan91` / `cbollweg@gmx.de` (in `.git/config` gesetzt) |
| Commit-Sprache | Deutsch |
| Co-Author-Header | `Co-Authored-By: Claude <noreply@anthropic.com>` |
| Skip-Netlify-Tag | `[skip netlify]` in Commit-Subject bei nicht-live-relevanten Änderungen (Docs, _dev/) |

---

## 2. Routing-Map (vollständig)

### 2.1 Statische Routen (Netlify serves `*.html`)

| URL-Pfad | Datei | Indexierung | Notiz |
|---|---|---|---|
| `/` | `index.html` | index, follow | Homepage React-App in #root |
| `/kindergeburtstag` | `kindergeburtstag.html` + React-Bundle `js/kindergeburtstag.js` | index, follow | Haupttool, Cockpit-Ergebnis (P1-22) |
| `/kindergeburtstag/<motto>` | `kindergeburtstag/<motto>.html` via `_redirects` 200-Rewrite | index, follow | 7 Motti (siehe §5) |
| `/kindergeburtstag/<motto>-<X>-jahre` | `kindergeburtstag/<motto>-<X>-jahre.html` | index, follow | Longtail-Cluster |
| `/kindergeburtstag/3-5-jahre`, `/6-8-jahre`, `/9-12-jahre` | `kindergeburtstag/<X>-jahre.html` | index, follow | Altersgruppen-Cluster |
| `/schatzsuche` | `schatzsuche.html` (P1-19+P1-30 neu) | index, follow | War 301 zu Planer, jetzt eigenständig |
| `/schatzsuche/<motto>` | `schatzsuche/<motto>.html` | index, follow | 6 Motti als statische Seiten (siehe §5) |
| `/einladung` | `einladung/index.html` | index, follow | Hub mit 10 Motto-Karten |
| `/einladung/<motto>` | `einladung/<motto>/index.html` | index, follow | Gästeansicht React-App, 10 Motti |
| `/einladung/erstellen` | `einladung/erstellen/index.html` | index, follow | Host-Tool, vanilla JS |
| `/micha/*` | `micha/*` | (extern, Geburtstagsshow) | Privat |
| Diverse Themen-Seiten | `*.html` | index, follow | adventskalender-fuellen, autofahrt-kinder-checkliste, baby-erstausstattung-checkliste etc. |

### 2.2 Dynamische / private Routen

| URL-Pfad | Handler | Indexierung |
|---|---|---|
| `/e/<slug>` | `_redirects` → `/.netlify/functions/serve-invite` (200-Rewrite) | noindex (via `_headers` /e/* nach P1-32) |
| `/api/hit`, `/api/event` | `netlify/functions/hit.js`, `event.js` (Tracking-Beacons) | noindex |
| `/.netlify/functions/create-invite` | erstellt /e/<slug>-Encoded-URLs aus Form-Daten | noindex |
| `party.machsleicht.de/*` | Cloudflare Worker `party-worker.js` | Worker setzt `<meta robots="noindex,nofollow">` |
| `party.machsleicht.de/api/*` | Worker-Endpoints (siehe §6) | noindex |
| `/plan`, `/cockpit` | nicht implementiert, aber in V5.1-URL-Matrix für später | noindex, follow (über `_headers`) |

### 2.3 `/e/<slug>`-Flow (konkret traced)

1. User klickt WhatsApp-Einladungs-Link `https://machsleicht.de/e/anna-eyJuIjoi...`
2. Netlify `_redirects` Z.X: `/e/* /.netlify/functions/serve-invite 200`
3. `serve-invite.mjs`:
   - Slug splittet auf erstem `-` → `name` + `base64url-encoded payload`
   - Payload-Keys: `n=name, d=date, t=time, o=ort, p=tel, m=motto` (kompakt)
   - Liefert HTML der entsprechenden `einladung/<motto>/index.html` Page **mit Query-Params** für die React-App
4. React-App in `einladung/<motto>/index.html` liest die Params und rendert die Gästeansicht
5. Gast spielt Mini-Spiel → klickt RSVP → WhatsApp-Reply zum Host

**Erstellung des Slugs:** `netlify/functions/create-invite.mjs`
- POST von `einladung/erstellen/index.html`
- Validiert Motto gegen Hardcoded-Liste (siehe §5)
- Encodet `{n,d,t,o,p,m}` als base64url, prepended mit `<name-clean>-`
- Response: Slug für /e/<slug>-URL

**Implikation für P1-23 Pre-Fill:** Wer den Cockpit-CTA „Einladung erstellen" mit `?motto=feuerwehr&name=Toni&source=cockpit` aufruft, geht durch das Host-Tool, das dann `create-invite.mjs` ruft. Der Cockpit-Pre-Fill funktioniert **nur** für `einladung/erstellen`, nicht für `/e/<slug>` (das ist der Gast-Endpunkt, kein Erstellungs-Endpunkt).

---

## 3. Build-Pipeline

### 3.1 React-App (kindergeburtstag.js)

| Komponente | Wert |
|---|---|
| Source-JSX | `_src/kindergeburtstag.jsx` (~1350 Z.) |
| Source-Data | `_src/kindergeburtstag-data.js` (~1840 Z.) |
| Build-Script | `bash _src/build.sh` |
| Build-Tool | `npx esbuild` (kein global install) |
| Output | `js/kindergeburtstag.js` (~260KB / 3340 Z.) |
| Git-tracked? | **JA** — Netlify deployt das fertige JS-Bundle as-is |
| **Wichtig** | Netlify führt **KEINEN** Build aus. Wer `_src/*` ändert MUSS lokal `bash _src/build.sh` laufen lassen + `js/kindergeburtstag.js` mit committen. |

### 3.2 React-Apps in einladung/<motto>/ (10×)

- Sind **inline-React-Bundles** in den jeweiligen `index.html`-Files (~800-1800 Z.)
- Kein separater Build-Step — die HTML-Files sind selbst die Sources
- Pro Motto eigenständig, Code-Duplikation hoch

### 3.3 Netlify-Functions

| Function | Build-Tool | Wann triggern? |
|---|---|---|
| `create-invite.mjs`, `serve-invite.mjs`, `hit.js`, `event.js`, `dashboard.js`, `ls-webhook.js` | esbuild via Netlify (automatisch) | Bei jedem Netlify-Build |

### 3.4 Cloudflare-Worker

| Aspekt | Wert |
|---|---|
| Datei | `party-worker.js` (~1820 Z. nach P1-29) |
| Deploy-Mechanismus | **MANUELL** via Cloudflare Dashboard (kein wrangler.toml im Repo) |
| Konsequenz | P1-26 (Share-Moment), P1-27 (Allergien-Copy), P1-29 (Abuse-Schutz) sind **bis zum manuellen Deploy unwirksam** |
| TODO | wrangler.toml + `_dev/scripts/deploy-worker.sh` für `npx wrangler deploy`-Automatisierung (M-Ticket) |

---

## 4. URL-Param-Konvention

**Regel:** Externe URL-Params auf deutsch, interne JS-Property-Namen auf englisch.

### 4.1 Etablierte Params (alle deutsch)

| Param | Verwendung | Reader-Code |
|---|---|---|
| `?motto=<slug>` | Motto pre-select | `kindergeburtstag.jsx` Z.775, `einladung/erstellen` Z.~397 |
| `?alter=<3..12>` | Alter pre-select | `kindergeburtstag.jsx` Z.777 |
| `?gaeste=<1..20>` | Gäste-Anzahl pre-select | `kindergeburtstag.jsx` Z.778 |
| `?modus=schatzsuche` | Schnitzeljagd-Add-on aktivieren | `kindergeburtstag.jsx` Z.781 |
| `?thema=<sz-slug>` | Schatzsuche-Theme pre-select | `kindergeburtstag.jsx` Z.786 |
| `?name=<childName>` | childName pre-select | `einladung/erstellen` (P1-23) |
| `?datum=`, `?uhrzeit=`, `?ort=` | Einladungs-Felder | `einladung/erstellen` (P1-23) |

### 4.2 Bekannte Brüche der Konvention

| Param | Problem | Wo eingeführt |
|---|---|---|
| `?source=cockpit` | **englisch statt deutsch** — sollte `?quelle=cockpit` sein | P1-28 — meine eigene Einführung |
| `?stationen=<3\|5\|7>` | **toter Param** — kein Reader im JSX | P1-30 Schatzsuche-V2-Varianten |
| `?theme=<slug>` | gemischt mit `?motto=` benutzt | Worker `party-worker.js` URL-Params |

**Fix-Sequenz für Konsistenz:**
- (S) `?source=cockpit` → `?quelle=cockpit` umbenennen in JSX + Reader in einladung/erstellen
- (S) Entweder `?stationen=` in `kindergeburtstag.jsx` lesen (setStationen-State) ODER aus schatzsuche.html Variants-CTAs rausnehmen
- (L) Worker-`?theme=`-Migration ist eigenes Ticket

### 4.3 Interne JS-Property-Namen (alle englisch)

| Schema | Beispiel |
|---|---|
| `birthdayProject.theme.slug` | `"feuerwehr"` |
| `birthdayProject.child.firstName` | `"Toni"` |
| `birthdayProject.party.startTime` | `"15:00"` |
| `partyPayload.childName, age, motto, mottoEmoji, mottoColor` | für POST /api/create |

---

## 5. Motto-Datenwahrheit (5 Quellen, verifiziert)

### 5.1 Übersicht aller Motto-Quellen im Repo

| # | Quelle | Anzahl | Slugs |
|---|---|---|---|
| 1 | `_src/kindergeburtstag-data.js` GENERIC (`ALL_MOTTOS`) | **9** | detektiv, dino, **dschungel**, einhorn, **feen**, feuerwehr, piraten, safari, weltraum |
| 2 | `_src/kindergeburtstag-data.js` SZ_THEMES | **9** | detektiv, dino, dschungel, einhorn, feen, feuerwehr, piraten, safari, weltraum |
| 3 | `kindergeburtstag.html` data-motto-Buttons (SEO-fallback) | **7** | detektiv, dino, einhorn, feuerwehr, piraten, safari, weltraum (KEIN dschungel/feen) |
| 4 | `einladung/erstellen/index.html` MOTTO_CONFIG | **10** | (3) + superheld, prinzessin, **meerjungfrau** |
| 5 | `party-worker.js` MOTTO_COLORS | **10** | (3) + superheld, prinzessin, **halloween** (KEIN meerjungfrau!) |
| 6 | `create-invite.mjs` VALID_MOTTOS | **10** | (4) — identisch mit einladung-Tool |
| 7 | `js/theme-registry.js` (P1-20) | **10** | (4) — identisch mit einladung-Tool |

**LICENSE-Array in _src ist leer** (post-Cut 29.04, Markenrisiko).

### 5.2 Identifizierte Datenwahrheits-Brüche

#### Bruch A — Halloween vs Meerjungfrau Swap (Worker ↔ Registry/Einladung)

- Worker: piraten/dino/safari/weltraum/detektiv/einhorn/feuerwehr/superheld/prinzessin/**halloween**
- Registry/Einladung: dito + **meerjungfrau** statt halloween

**User-Wirkung:** Wer Meerjungfrau-Einladung erstellt → Worker liefert auf der Partyseite `mottoColor: #D4812A` (Default-Fallback statt Türkis `#4DD0E1`). Halloween-Geburtstag existiert nirgendwo außer im Worker-Color-Mapping.

**Fix-Optionen:**
1. Worker um `meerjungfrau` ergänzen (Color + THEME) — empfohlen, weil Einladung schon 10 Motti hat
2. Halloween zurück in Einladung-Tool + Registry — wenn Halloween-Geburtstag strategisch gewollt ist
3. Beide ergänzen (11 Mottos total)

**Effort:** S (30 Min)

#### Bruch B — Dschungel + Feen sind „Schatzsuche-only"

- ALL_MOTTOS hat 9 (inkl. dschungel, feen)
- Hub-SEO-Fallback hat nur 7 (ohne dschungel, feen)
- Einladung-Tool + Worker haben sie auch nicht

→ **Bewusste Entscheidung**, nicht Bug: Dschungel + Feen sind Schatzsuche-Themen, kein vollständiger Planer-Plan. Sollte aber in der Konvention dokumentiert sein (z.B. ALL_MOTTOS["dschungel"].modules: ["treasure"]).

**Fix:** themeRegistry erweitern um dschungel + feen mit `modules: ["treasure"]` (S, 15 Min). Dann hat Registry 12 statt 10 Einträge.

#### Bruch C — Worker MOTTO_COLORS abweichend von Registry

| Motto | Registry | Worker | Sichtbar wo |
|---|---|---|---|
| piraten | `#FFD700` | `#8B4513` | Partyseite-Header |
| einhorn | `#E1BEE7` | `#E040A0` | Partyseite-Header |
| dino | `#66BB6A` | `#4CAF50` | Partyseite-Header |
| feuerwehr | `#FF7043` | `#D32F2F` | Partyseite-Header |
| safari | `#FF9800` | `#F57F17` | konsistent? Prüfen. |
| weltraum | `#CE93D8` | `#1565C0` | **massiv abweichend** |
| detektiv | `#78909C` | `#37474F` | Partyseite-Header |
| prinzessin | `#F48FB1` | `#E91E63` | Partyseite-Header |
| superheld | `#EF5350` | `#D32F2F` | Partyseite-Header |

→ Worker-Farben sind **dunkler/saturierter**, gedacht für dunkle Partyseite-Themes. Registry-Farben sind **heller/pastelliger**, gedacht für helle UI auf machsleicht.de.

**Sinnvoller Fix:** Registry um `partyColor` ergänzen (dunkel) zusätzlich zu `color` (hell). Worker liest `partyColor`, machsleicht.de-UI liest `color`. Eine Quelle, zwei Farben.

**Effort:** M (2-4h, weil Migration in JSX + einladung + theme-registry + worker)

#### Bruch D — Validator-Stufe 8/9 prüft NICHT die Registry

P1-20-Commit-Message behauptete: „Validator-Stufe 8 erweitern → prüft Registry = ItemList = sichtbarer Text". **Faktisch:** `validate-all.sh` enthält 0 Referenzen auf theme-registry. Versprechen nicht eingehalten.

**Fix:** Stufe 9 ergänzen, die per Node Registry lädt und gegen sichtbare Motto-Zahlen + ItemList-Schema in `index.html`/`kindergeburtstag.html` prüft (M, 3-4h).

---

## 6. Worker-Vertrag (`party-worker.js`)

### 6.1 Endpoints

| Methode | Path | Zweck | Z. | Abuse-Schutz (P1-29) |
|---|---|---|---|---|
| POST | `/api/create` | Partyseite erstellen | 166 | Origin-Check, 5/h, 700KB |
| GET | `/api/party/:id` | Party-Daten (mit/ohne edit-Token) | 206 | — (read-only) |
| PUT | `/api/party/:id` | Party-Daten ändern | 221 | editToken, 50KB |
| POST | `/api/party/:id/rsvp` | RSVP von Gast | 246 | Honeypot, 10/h, 5KB |
| POST | `/api/party/:id/wish/:wid/claim` | Geschenk reservieren | 273 | 20/h, 5KB |
| GET | `/api/photo/:id` | Foto laden | 296 | — |
| GET | `/api/photoRound/:id` | Round-Foto laden | 304 | — |
| POST | `/api/party/:id/send-edit-link` | Edit-Link per Email (Resend) | 312 | 5/h, 5KB |
| GET | `/go/:partyId/:wishId` | Affiliate-Redirect | 407 | nur existierende Wünsche |
| GET | `/api/newsletter-confirm` | Newsletter-DOI-Confirm | 426 | — |
| GET | `/` | Partyseite-Creator-UI (Form) | 487 | — |
| GET | `/<id>` (6-12 chars) | Partyseite | 490 | — |

### 6.2 CORS

`Access-Control-Allow-Origin: *` (`party-worker.js` Z.9). OPTIONS-Handler Z.165.

**Verbesserung in P1-29:** `checkOrigin()` Helper, hardcoded Whitelist `https://machsleicht.de`, `www.`, `party.machsleicht.de`. Aktuell **nur** bei POST `/api/create` und `/send-edit-link` genutzt (V5.1 lasche Origin-Policy). Andere Endpoints offen — Worker bleibt für externe API-Konsumenten (z.B. zukünftige iOS-App) zugänglich.

### 6.3 KV-Storage

- Namespace-Binding: `PARTY`
- Keys: `party:<id>`, `photo:<id>`, `photoRound:<id>`, `rl:create:<ipHash>`, `rl:rsvp:<id>:<ipHash>`, `rl:claim:<id>:<ipHash>`, `rl:editlink:<ipHash>`
- TTL für Partys: `calcTTL(party.date)` = 90 Tage nach Party-Datum, mind. 24h
- TTL für Rate-Limits: 1h-Window

### 6.4 Environment Variables (zu setzen im Cloudflare Dashboard)

- `AMAZON_TAG` (z.B. `machsleicht-21`)
- `AWIN_PUBLISHER_ID` (z.B. `123456`)
- `RESEND_API_KEY` (Secret)

---

## 7. Tracking-Infrastructure

### 7.1 Doppel-Setup

- **Eigenes:** `window.mlTrack(event, data)` → `navigator.sendBeacon('/api/event', payload)` in `kindergeburtstag.html` Z.367
- **Umami:** `window.umami.track(name, props)` via `cloud.umami.is/script.js` (data-website-id `72b5eb12-...`)
- **Plausible-Shim:** `window.plausible(name, opts)` leitet zu `umami.track()` weiter (Legacy-Code-Kompatibilität)

### 7.2 Bestehende Events (vor V5.2)

`motto_selected, alter_set, whatsapp_share, cta_schatzsuche, cta_ratgeber, affiliate_click, scroll_depth{25,50,75,100}, edit-link-email-submit, newsletter-opt-in, einladung-schatzsuche-cta, invite-to-party-cta, plan-created`

### 7.3 Neue Events durch V5.2 (Sprint 1)

- **P1-22:** `cockpit_viewed{motto, alter}`, `cockpit_cta_clicked{target: treasure|invitation|party, motto}`
- **P1-19:** `treasure_mvp_cta_start`, `treasure_mvp_cta_feuerwehr`, `treasure_mvp_cta_bottom`, `treasure_mvp_cta_invitation`, `treasure_mvp_motto{motto}`
- **P1-25:** `party_create_started{motto}`, `party_created{motto}`, `party_share_clicked{channel: copy|whatsapp}`
- **P1-28:** `invitation_from_cockpit{motto}`
- **P1-30:** `treasure_variant{schnell|standard|gross}`
- **P1-31:** `shopping_package_selected{theme, package}`

### 7.4 Tracking-Backlog

- `planner_started` (erste Planer-Interaktion) — fehlt
- `treasure_generated` (echte Erzeugung im Schnitzeljagd-Block) — fehlt
- `invitation_created` (nach Submit auf einladung/erstellen) — fehlt
- `print_clicked` — fehlt

---

## 8. Sitemap-Update-Regeln

Nach jedem Inhalts-/Strukturwechsel einer Page MUSS die zugehörige `<lastmod>` in `sitemap.xml` aktualisiert werden, sonst signalisiert Netlify dem Google-Crawler keine Änderung.

| PBI | Page | sitemap.xml-Update nötig? | Status |
|---|---|---|---|
| P1-19 | `/schatzsuche` | JA (war 2026-04-05) | **NICHT GEMACHT** — Fix-PBI |
| P1-22 | `/kindergeburtstag` | NEIN (React-Bundle, kein HTML-Wechsel im Markup) | OK |
| P1-30 | `/schatzsuche` | JA (Page erweitert) | **NICHT GEMACHT** — Fix-PBI |
| P1-31 | `/kindergeburtstag` | NEIN (nur JSX-Label-Wechsel) | OK |

**Fix-Sequenz:** sitemap.xml für `/schatzsuche` lastmod auf `2026-05-12` setzen.

---

## 9. Geister-Files (Working Tree, nicht committed)

Aus dem 29.04-Cut sind ~190 Lizenz-Motto-Files weiter lokal vorhanden:
- `frozen-*.html`, `harry-potter-*.html`, `minecraft-*.html`, `ninjago-*.html`, `paw-patrol-*.html`, `pokemon-*.html`, `spider-man-*.html`, `super-mario-*.html` (Hub + Altersvarianten)
- `baustelle-*`, `meerjungfrau-*`, `pferde-*`, `ritter-*`, `zirkus-*` (in `kindergeburtstag/` — laut Cut entfernt)
- `ratgeber/`-Folder
- `*-guide.html` (frozen-guide, harry-potter-guide, …)

Plus:
- 10× `party-worker-FIX2..FIX11-2026-04-21.js` (Backup-Snapshots)
- `js/kindergeburtstag-data.js` (laut SESSION-NOTES 30.04 als tot identifiziert)
- `.claude/cowork-test.txt`, `.claude/test-write.txt`, `_dev/docs/.~lock.backlog-skill-audit.xlsx#`

**Live-Wirkung:** Keine (sind nicht im git, werden nicht von Netlify deployed). Nur lokales Aufräum-Thema.

**Cleanup-PBI (S, 15 Min):**
```bash
cd C:/Users/Bolle/machsleicht-deploy
# Whitelist über grep schützen, alles andere löschen:
git clean -fd -e SESSION-NOTES.md -e AUDIT.md -e STRATEGIE.md -e BACKLOG-AUDIT.md \
  -e ARCHITECTURE.md -e Setup-Anleitung-machsleicht.docx
```

---

## 10. Out-of-date Dokumentation (Doku-Konflikte)

| Datei | Stand laut Inhalt | Konflikt mit Realität |
|---|---|---|
| `ARCHITECTURE.md` (218 Z.) | „17 Mottos, 9 Themen" — Stand April 2026 | **POST-CUT 9 Mottos, 9 Themen** → veraltet |
| `STRATEGIE.md` | wurde in SESSION-NOTES 30.04 als „aktualisiert" angesagt | NICHT verifiziert |
| `BACKLOG-AUDIT.md` | P1-15 bis P1-16 erwähnt | NEUE PBIs P1-18 bis P1-33 + Fix-PBIs ergänzt? — NICHT verifiziert |
| `SESSION-NOTES.md` | Stand 30.04 | Sprint 1 (V5.2) NICHT eingearbeitet |

**Fix-PBIs:**
- (S) ARCHITECTURE.md auf 9-Mottos-Stand bringen + V5.2-Architektur (Cockpit, birthdayProject) einfügen
- (S) BACKLOG-AUDIT.md um Fix-Tickets aus diesem Audit ergänzen
- Bolle entscheidet selbst über SESSION-NOTES.md-Update bei nächstem „Ende"

---

## 11. Patch-Map (alle 16 V5.2-PBIs + identifizierte Fix-PBIs)

### 11.1 V5.2 Sprint 1 (alle commited auf draft)

| PBI | Geänderte Dateien | Build-Step | Worker-Deploy nötig? |
|---|---|---|---|
| P1-18 v1+v2 | `AUDIT.md` | — | nein |
| P1-19 | `schatzsuche.html`, `_redirects` Z.1 | — | nein |
| P1-20 | `js/theme-registry.js` | — | nein |
| P1-21 | `js/birthday-project.js` | — | nein |
| P1-22 | `_src/kindergeburtstag.jsx`, `kindergeburtstag.html`, `js/kindergeburtstag.js` | `bash _src/build.sh` | nein |
| P1-23 | `_src/kindergeburtstag.jsx`, `js/kindergeburtstag.js`, `einladung/erstellen/index.html` | `bash _src/build.sh` | nein |
| P1-24 | `_dev/docs/WORKER-CONTRACT.md` | — | nein |
| P1-25 | `_src/kindergeburtstag.jsx`, `js/kindergeburtstag.js` | `bash _src/build.sh` | nein |
| P1-26 | `party-worker.js` | — | **JA** |
| P1-27 | `party-worker.js` | — | **JA** |
| P1-28 | `_src/kindergeburtstag.jsx`, `js/kindergeburtstag.js`, `einladung/erstellen/index.html` | `bash _src/build.sh` | nein |
| P1-29 | `party-worker.js` | — | **JA** |
| P1-30 | `schatzsuche.html` | — | nein |
| P1-31 | `_src/kindergeburtstag.jsx`, `js/kindergeburtstag.js` | `bash _src/build.sh` | nein |
| P1-32 | `_headers` | — | nein |
| P1-33 | `_dev/docs/RELEASE-GATE.md` | — | nein |

### 11.2 Identifizierte Fix-PBIs (aus diesem Audit)

Diese Probleme wurden im Sprint 1 nicht gefixt, müssen aber vor „Ende deploy" eines echten Funnel-Tests entschieden werden:

| Fix-PBI | Was | Effort | Severity | Welcher Sprint-1-PBI hat ihn introduced |
|---|---|---|---|---|
| **F-01** | Halloween↔Meerjungfrau-Swap in Worker beheben | S (30 Min) | **HOCH** (Meerjungfrau-Partyseiten kriegen falsche Farbe) | Pre-existing, nicht durch Sprint 1, aber P1-20 hat den Bruch nicht behoben |
| **F-02** | Worker-MOTTO_COLORS vs Registry harmonisieren (alle 9 Farben) | M (3h) | MITTEL (Partyseite-UI farblich anders als Hauptseite) | Pre-existing |
| **F-03** | `?stationen=N` URL-Param in JSX implementieren (oder aus Variants-CTAs raus) | S (30 Min) | MITTEL (tote V2-CTAs) | P1-30 |
| **F-04** | `?source=cockpit` → `?quelle=cockpit` (deutsch wie Konvention) | S (15 Min) | NIEDRIG | P1-28 |
| **F-05** | „Feuerwehr-Schatzsuche kommt als nächstes"-Aussage in schatzsuche.html ändern (Feuerwehr ist in SZ_THEMES) | S (5 Min) | MITTEL (irreführend für User) | P1-19 (Cascade aus P1-18-v1-Fehler) |
| **F-06** | sitemap.xml lastmod für `/schatzsuche` auf 2026-05-12 | S (5 Min) | MITTEL | P1-19 + P1-30 |
| **F-07** | themeRegistry um dschungel + feen ergänzen (`modules: ["treasure"]`) | S (15 Min) | NIEDRIG (Vollständigkeits-Sache) | P1-20 |
| **F-08** | themeRegistry irgendwo KONSUMIEREN (Stub auflösen) — z.B. schatzsuche.html-Motto-Tiles dynamisch aus Registry | M (2-4h) | MITTEL (Registry ist sonst totes Code) | P1-20 |
| **F-09** | Validator-Stufe 9 erweitern für Registry-Konsistenz | M (3-4h) | MITTEL (kein Regression-Guard) | P1-20 (false claim im Commit) |
| **F-10** | Schatzsuche V2 Quick-Builder bauen (echtes Form-Element) | XL (10-18h) | NIEDRIG (V2-Spec, MVP-Funktion da) | P1-30 (scope-reduziert) |
| **F-11** | Standalone `/einkaufsliste/<motto>` Pages | L (1-2 Tage) | NIEDRIG (V5.1-Spec, Planer hat Logik schon) | P1-31 (scope-reduziert) |
| **F-12** | ARCHITECTURE.md auf 9-Mottos-Stand + Cockpit-Architektur | S (45 Min) | MITTEL (Onboarding-Quelle veraltet) | Pre-existing |
| **F-13** | wrangler.toml + Worker-Deploy-Skript | M (2-3h) | HOCH (Worker-Patches sonst manuell) | Pre-existing |
| **F-14** | OG-Bilder für Feuerwehr-3/6/9 erstellen | M (Asset-Erstellung) | NIEDRIG (Social-Share) | Pre-existing |
| **F-15** | Geister-Files Cleanup via `git clean` | S (15 Min) | NIEDRIG | Pre-existing |
| **F-16** | Print-Styles für schatzsuche.html | S (30 Min) | NIEDRIG (Strg+P liefert Tracking-Script) | P1-19 |
| **F-17** | Browser-Smoke-Test gesamter Cockpit-Flow | M (1-2h) | **HOCH** (kein einziger Test gelaufen) | Sprint 1 ungeprüft |
| **F-18** | Worker-Live-curl-Tests (CORS-Preflight, /api/create, Honeypot, Rate-Limit) | M (1-2h) | **HOCH** (kein Live-Test gegen produktiven Worker) | P1-24 nur statisch |
| **F-19** | Mobile Chrome End-to-End-Test | M (1h) | **HOCH** (Ziel-Device, nie getestet) | Sprint 1 |

**Total Fix-Effort:** ~30-50h. Realistisch über 4-6 Wochen.

### 11.3 Empfohlene Reihenfolge

**Vor Worker-Deploy (Pflicht):**
- F-17, F-18, F-19 (Live-Tests)
- F-01 (Halloween/Meerjungfrau, weil sichtbar nach Deploy)

**Vor Netlify-Deploy auf main (Pflicht):**
- F-05 (Schatzsuche-Aussage)
- F-06 (sitemap lastmod)
- F-03 (stationen-Param oder rausnehmen)

**Bevor V5.3 startet (Empfehlung):**
- F-04, F-07, F-08, F-12

**Backlog (V5.3+):**
- F-09, F-10, F-11, F-13, F-14, F-15, F-16, F-02

---

## 12. Pre-Flight-Checks (vor jedem Patch verbindlich)

1. **Auf draft sein:** `git checkout draft && git pull -q origin draft`
2. **Working Tree clean (oder bekannte Geister):** `git status` — alles untracked = Geister-Files (siehe §9)
3. **Vor JSX-Änderung:** lesen welche `App()`-Funktion im JSX du anfasst (Z.715+ im aktuellen Stand)
4. **Nach JSX-Änderung:** `bash _src/build.sh` lokal, dann **beide** Files (jsx + kompiliertes js) committen
5. **Nach Worker-Patch:** `node --check party-worker.js` + im Commit explizit notieren „braucht Worker-Deploy"
6. **Vor Commit:** `bash validate-all.sh` (akzeptiert STUFE-1-Path-Bug auf Windows als bekannt)
7. **Commit-Message Deutsch:** `[skip netlify]` außer bei live-relevanten Änderungen
8. **Nach Commit:** `git log --oneline -3` Cross-Check

---

## 13. Verbleibende offene Klärungen

1. **Cloudflare-Deploy-Mechanismus:** Bestätigt manuell, kein wrangler.toml im Repo. Soll F-13 dieses Sprint-2 angehen oder weiterhin manuell?
2. **Resend-Email-Versand-Details:** `party-worker.js` Z.312+ nutzt Resend für Edit-Link-Mail + Newsletter-DOI. **Vor F-01/F-02-Worker-Deploy** unbeschadeter Resend-Flow verifizieren.
3. **Halloween — strategisch gewollt oder Altlast?** Wenn gewollt: in Einladung + Registry ergänzen. Wenn nicht: aus Worker rausnehmen.
4. **Schatzsuche-Themen-Strategie:** dschungel + feen sind im Generator, haben aber keine SEO-Pages (`schatzsuche/dschungel` → 301 zu safari, `schatzsuche/feen` → 301 zu einhorn laut _redirects). Soll das so bleiben oder eigene Pages dafür?
5. **Plan-`/cockpit`-URLs (V5.1-Matrix):** noindex via `_headers` ist drin, aber Routes existieren nicht. Sollen die jemals eigene Pages sein (z.B. Bookmark-bare Cockpit-State) oder ist das Konzept aufgegeben?

---

## 14. Versions-Historie dieser Datei

| Version | Datum | Was |
|---|---|---|
| v1 | 2026-05-11 | Initial-Audit aus P1-18 (mit 3 sachlichen Fehlern + 2 Auslassungen) |
| v2 | 2026-05-12 | Korrekturen + 5 fehlende Bereiche + Fix-PBI-Liste F-01 bis F-19 |
