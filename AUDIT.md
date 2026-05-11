# Repo + Routing Inventur (P1-18)

Stand: 2026-05-11. Output von Ticket 0 vor jedem V5.2-Patch. Verbindlich.

## 1. Repo-Standort und Branches

- **Produktives Working-Repo:** `C:/Users/Bolle/machsleicht-deploy/` (lokal, NICHT OneDrive — OneDrive-`.git` ist korrumpiert)
- **Remote:** `https://github.com/Bollesan91/machsleicht-deploy.git`
- **Branches:** `draft` (Arbeitsbranch) | `main` (Deploy via Netlify)
- **Commit-Konvention:**
  - Auf `draft` mit `[skip netlify]` außer bei live-relevanten Änderungen
  - „Ende deploy" merged `draft → main`, dann `git push origin main`
  - Co-Author: `Co-Authored-By: Claude <noreply@anthropic.com>`
  - Git-Identity in dieser Umgebung bereits gesetzt (Bollesan91 / cbollweg@gmx.de)

## 2. Routing-Map: Route → Datei → Build

| Route | Produktive Datei | Build / Deploy | Index |
|---|---|---|---|
| `/` | `index.html` | direkt (statisch) | index |
| `/kindergeburtstag` | `kindergeburtstag.html` + React-App `js/kindergeburtstag.js` | siehe §3 (esbuild) | index |
| `/kindergeburtstag/<motto>` | `kindergeburtstag/<motto>.html` via `_redirects` 200 | direkt | index |
| `/kindergeburtstag/<motto>-X-jahre` | `kindergeburtstag/<motto>-X-jahre.html` | direkt | index |
| `/schatzsuche` | `schatzsuche.html` → **`_redirects` Z.1 301 + meta-refresh** doppelt zu `/kindergeburtstag?modus=schatzsuche#planer` | direkt | ⚠️ canonical zeigt auf /kindergeburtstag (Z.7) |
| `/schatzsuche/<motto>` | `schatzsuche/<motto>.html` via `_redirects` 200 | direkt | index |
| `/einladung` | `einladung/index.html` (Hub-Page, 10 Motto-Karten) | direkt | index |
| `/einladung/<motto>` | `einladung/<motto>/index.html` (React-App: Gästeansicht mit Mini-Game) | direkt (React bundled inline) | index, aber dynamische URL-Params noindex relevant |
| `/einladung/erstellen` | `einladung/erstellen/index.html` (Host-Tool, vanilla JS) | direkt | index |
| `party.machsleicht.de/*` | `party-worker.js` (Cloudflare Worker mit KV) | Cloudflare Workers Dashboard (manuell? — TBD) | noindex (private Partyseiten) |
| `/api/hit`, `/api/event` | `netlify/functions/hit.js`, `event.js` | Netlify Functions (esbuild) | noindex |
| `/.netlify/functions/create-invite`, `serve-invite` | `netlify/functions/create-invite.mjs`, `serve-invite.mjs` | Netlify Functions | noindex |
| `/e/<slug>` | Vermutlich via `serve-invite.mjs` redirect zu `/einladung/<motto>/?…` | Netlify Function | noindex |

## 3. Build-Pipeline

**JSX-Compile:** `bash _src/build.sh`
- Input: `_src/kindergeburtstag.jsx` (1351 Z.) + `_src/kindergeburtstag-data.js` (1836 Z.)
- Tool: `npx esbuild --bundle=false --jsx=transform --jsx-factory=React.createElement --target=es2020`
- Output: `js/kindergeburtstag.js`
- **NICHT** `python _dev/scripts/compile-jsx.py` wie in V5.2 erwähnt — der existiert nicht als tracked file (war im Cut entfernt). `_build/compile-jsx.py` ist nur lokales Geister-File.

**Netlify-Build:**
- `[build] publish = "."` — gesamtes Repo wird direkt deployed
- `[functions] directory = "netlify/functions"` mit `node_bundler = "esbuild"`
- Trigger: Push auf `main`. `[skip netlify]` in Commit-Message blockt den Build.

**Cloudflare-Worker:**
- `party-worker.js` (1757 Z.) — Worker-Code. Deploy-Mechanismus aktuell unklar (vermutlich Cloudflare Dashboard manuell oder Wrangler). **Zu klären vor Ticket P1-24/P1-26.**

## 4. URL-Param-Konvention (ENTSCHEIDUNG)

**Externe URL-Params: deutsch.** Interne JS-Property-Namen: englisch.

| Extern (URL) | Intern (JS) |
|---|---|
| `?motto=feuerwehr` | `birthdayProject.theme.slug` |
| `?alter=5` | `birthdayProject.child.age` |
| `?modus=schatzsuche` | `mode = "treasure"` |
| `?name=...` | `birthdayProject.child.firstName` |

**Bestätigt durch:** `einladung/erstellen/index.html` Z.397 nutzt `?motto=`, `kindergeburtstag.html` Z.354 hört auf `data-motto`-Klicks. Bestehende Konvention.

## 5. Motto-Wahrheit (verifiziert per Grep)

| Modul | Aktive Mottos | Quelle |
|---|---|---|
| **Planer-Hub** (`kindergeburtstag.html`) | **7**: detektiv, dino, einhorn, feuerwehr, piraten, safari, weltraum | `data-motto="…"` Attribute |
| **Einladungs-Tool** (`einladung/erstellen/index.html`) | **10**: die 7 Planer + superheld, prinzessin, meerjungfrau | `MOTTO_CONFIG` Z.381-392 |
| **Schatzsuche** (Files) | **6**: piraten, safari, weltraum, detektiv, dino, einhorn (Feuerwehr fehlt!) | `_redirects` + `schatzsuche/*.html` |
| **Worker** (`party-worker.js`) | TBD (laut SESSION-NOTES 9 Voll-Mottos + Halloween) | `MOTTO_COLORS` + `THEMES` |

**Konsequenz für Ticket P1-20 (themeRegistry):**
- Master-Liste: alle 10 Mottos aus Einladungs-Tool (das ist die Maximum-Liste)
- Pro Motto `modules: [...]` mit echter Verfügbarkeit:
  - `feuerwehr`: planner, invitation, party (KEINE Schatzsuche bisher → Pre-Req für Funnel-Vollausbau!)
  - `piraten/safari/weltraum/detektiv/dino/einhorn`: planner, treasure, invitation, party
  - `superheld/prinzessin/meerjungfrau`: invitation only
- **Schatzsuche-Feuerwehr fehlt** — eigenes Ticket-Item (vermutlich P1-30 Schatzsuche-V2)

## 6. Worker-Vertrag (V5.1-Kompatibilität)

**`POST /api/create` ist bereits V5.1-konform.** Verifiziert per `party-worker.js` Z.128-160:

- Akzeptiert: `childName, age, motto, mottoEmoji, mottoColor, date, time, endTime, address, notes, askAllergies, askPickup, wishes[], paypalMe`, plus `photo, photoRound` (Base64)
- Validation: Längen-Limits, `mottoColor` Hex-Regex + Fallback `#D4812A`, `age` 0-18-Clamp
- Response: `{id, editToken, url, editUrl}` exakt wie V5.1
- TTL: `calcTTL(party.date)` — KV expiration nach Party-Datum
- **CORS:** `Access-Control-Allow-Origin: *` (Z.9) — Cross-Domain-POST von machsleicht.de funktioniert. OPTIONS-Handler vorhanden (Z.125).

**Ticket P1-24 schrumpft auf 30-Min-Verifikation** (Live-curl-Test gegen Worker). Worker-Patch nicht nötig.

**Offene Worker-Verbesserungen für später (P1-29):**
- Origin-Prüfung einengen (`*` → `https://machsleicht.de`)
- Honeypot bei `/api/party/:id/rsvp`
- Rate-Limit-KV (`rl:create:{ipHash}`, `rl:rsvp:{partyId}:{ipHash}`)

## 7. Tracking-Infrastructure (bereits live)

In `kindergeburtstag.html` Z.360-407:
- `window.mlTrack(event, data)` → `navigator.sendBeacon('/api/event', payload)`
- `navigator.sendBeacon('/api/hit', d)` für Pageviews
- Bestehende Events: `motto_selected`, `alter_set`, `whatsapp_share`, `cta_schatzsuche`, `cta_ratgeber`, `affiliate_click`, `scroll_depth` (25/50/75/100%)
- DNT-Respekt: `if(navigator.doNotTrack==='1')return`

**Fehlende Events für Funnel-Messung** (P1-22, P1-25, P1-28, P1-31 müssen ergänzen):
- `cockpit_viewed`, `cockpit_cta_clicked{target}`
- `treasure_page_viewed`, `treasure_builder_started`, `treasure_generated`
- `party_create_started`, `party_created`, `party_share_clicked`
- `invitation_created`, `invitation_shared{channel}`
- `shopping_list_opened`, `shopping_package_selected`

## 8. Geister-Files im Working Tree (Cleanup-Backlog)

Untracked Files vom 29.04-Cut, lokal noch vorhanden (~190):
- Lizenz-Mottos: `frozen-*`, `harry-potter-*`, `minecraft-*`, `ninjago-*`, `paw-patrol-*`, `pokemon-*`, `spider-man-*`, `super-mario-*` + Altersvarianten
- Tote Mottos: `baustelle-*`, `meerjungfrau-*` (in /kindergeburtstag/!), `pferde-*`, `ritter-*`, `zirkus-*`
- `ratgeber/`-Folder
- 10× `party-worker-FIX2..FIX11-2026-04-21.js` (Backup-Snapshots)
- `js/kindergeburtstag-data.js` (laut SESSION-NOTES 30.04 als tot identifiziert — 2.409 Z., war im Build veraltet)
- `.claude/cowork-test.txt`, `.claude/test-write.txt`, `_dev/docs/.~lock.backlog-skill-audit.xlsx#`

Eigenes Cleanup-Ticket-Vorschlag: **P1-34 (S, 15 Min)** — `git clean -fd` mit Whitelist (SESSION-NOTES.md, AUDIT.md behalten).

## 9. Annahmen-Verifikations-Tabelle (V5.2 gegen Realität)

| V5.2-Annahme | Realität | Status |
|---|---|---|
| Build-Step `python _dev/scripts/compile-jsx.py` | `bash _src/build.sh` (esbuild) | **korrigiert** |
| `POST /api/create` existiert mit V5.1-Schema | Existiert, voll kompatibel | **bestätigt** |
| CORS für Cross-Domain-POST | `Allow-Origin: *` + OPTIONS-Handler vorhanden | **bestätigt** |
| 7 aktive Mottos (Registry-Skelett) | 7 Planer-Mottos + 3 weitere nur in Einladung = 10 total | **erweitert** |
| Schatzsuche per Meta-Refresh redirect | DOPPELT: `_redirects` Z.1 301 + Meta-Refresh in `schatzsuche.html` | **schwerwiegender** |
| Schatzsuche-Feuerwehr existiert | Fehlt (`schatzsuche/feuerwehr.html` ist nicht da) | **Gap entdeckt** |
| Cron-Auto-Delete für Allergien nötig | KV-TTL via `calcTTL(party.date)` existiert schon (P1-27 nur Copy/Display-Regel) | **bestätigt** |
| `editToken`-basierter Zugriff | Z.170, 185-186: existiert | **bestätigt** |
| Worker-Deploy-Mechanismus klar | **Unklar** — kein Wrangler-Config sichtbar, vermutlich manuell via Dashboard | **offen, vor P1-26 klären** |

## 10. Patch-Map (alle 16 PBIs)

| PBI | Geänderte Dateien | Build-Step nach Änderung |
|---|---|---|
| P1-18 | `AUDIT.md` (neu) | — |
| P1-19 Schatzsuche MVP | `schatzsuche.html`, `_redirects` Z.1 entfernen | Keiner (statisch) |
| P1-20 themeRegistry | `js/theme-registry.js` (neu), Migration in `kindergeburtstag.html`, `_src/kindergeburtstag.jsx`, `einladung/erstellen/index.html`, `party-worker.js` MOTTO-Listen, `validate-all.sh` Stufe 8 | `bash _src/build.sh` nach JSX-Änderung |
| P1-21 birthdayProject | `js/birthday-project.js` (neu) | — |
| P1-22 Cockpit | `_src/kindergeburtstag.jsx` App()-Component | **`bash _src/build.sh`** |
| P1-23 Pre-Fill | `_src/kindergeburtstag.jsx`, `einladung/erstellen/index.html` | `bash _src/build.sh` für Planer-Teil |
| P1-24 Worker-Verifikation | — (nur curl-Test) | — |
| P1-25 Cockpit→Party | `_src/kindergeburtstag.jsx` (CTA-Logic), evtl. neue Function `netlify/functions/proxy-create-party.js` | `bash _src/build.sh` |
| P1-26 Share-Moment | `party-worker.js` (Partyseiten-HTML innerhalb des Workers) | Worker-Deploy (TBD) |
| P1-27 Allergien | `party-worker.js` (Display-Logic im Edit-Bereich vs Gast-View) | Worker-Deploy |
| P1-28 Einladung-Anschluss | `einladung/erstellen/index.html`, `einladung/<motto>/index.html` (alle 10) — Post-Game-CTA | — |
| P1-29 Abuse-Schutz | `party-worker.js` (Rate-Limit-KV, Honeypot, Origin-Einschränkung) | Worker-Deploy |
| P1-30 Schatzsuche V2 | `schatzsuche.html` (Komplett-Neubau) + ggf. `js/schatzsuche.js` neu | — |
| P1-31 Einkaufsliste | Neue Route `/einkaufsliste/feuerwehr-geburtstag` → `einkaufsliste/feuerwehr-geburtstag.html`, evtl. Cockpit-Sektion | — |
| P1-32 noindex/canonical | Headers in `party-worker.js`, evtl. `_headers`-File | Worker-Deploy |
| P1-33 QA + Release-Gate | `_dev/docs/RELEASE-GATE.md` (neu) | — |

## 11. Pre-Flight-Checks vor jedem Patch

1. Auf `draft` arbeiten: `git checkout draft && git pull -q origin draft`
2. Nach Code-Patch: relevante Build-Steps ausführen
3. Vor Commit: `bash validate-all.sh` (Validator-Stufe 8 muss grün bleiben)
4. Commit-Message Deutsch mit `[skip netlify]` außer bei live-relevanten Änderungen
5. Co-Author-Header anhängen
6. Nach Push: `git log --oneline -3` gegenchecken

## 12. Klärungspunkte für später

1. **Worker-Deploy-Mechanismus** — Wrangler-Config? Manuell? Vor P1-26 + P1-29 klären.
2. **Resend-Email-Versand im Worker** — wie genau läuft das? Worker-Code Z.260 (`/api/party/:id/send-edit-link`) prüfen, bevor DSGVO-Hinweis (P1-26) implementiert wird.
3. **`/e/<slug>`-Flow vs. direkte `/einladung/<motto>/`-Links** — wie verlinken Edit-Tool und Worker zueinander?

---

**Status:** P1-18 abgeschlossen. Nächste Aktionen: P1-19 (Schatzsuche MVP) + P1-20 (themeRegistry) parallel.
