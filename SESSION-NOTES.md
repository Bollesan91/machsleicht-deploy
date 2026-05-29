# Session-Notiz — 29.05.2026 (P7 Wizard-Architektur entschieden + MVP live + A1 Hero-Rewrite)

## 🚀 Heute deployed (29.05.2026 abends)

### Welle 7 Foundation (P7-0)
- **theme-registry.js erweitert** um WIZARD_OVERRIDES (15 Mottos × accent/accent2/persona/darkAccent/wizardReady/inviteTpl)
- **Helper-Funktionen** `getWizardTheme(slug)` + `wizardReadySlugs()` für Wizard-Konsumenten
- **Bestehende Tools (Planer/Einladung/Worker)** bleiben unverändert — eigene Datenquellen gültig
- **9 Mottos wizardReady=true** (Daten komplett), 6 wizardReady=false (noch nachzuziehen: feuerwehr/prinzessin/meerjungfrau/superheld + 2 weitere)

### P7-1 Wizard-MVP (LIVE auf /wizard.html)
- **_src/wizard.jsx (337 Zeilen)** + **wizard.html** + **build-wizard.sh** + **js/wizard.js (16KB compiled)**
- **Stage 1 Motto-Picker:** 15 Mottos aus theme-registry, wizardReady-sortiert + „Eigenes Motto…"-Karte
- **Stage 2 Alter-Picker:** 3 Karten (3-5, 6-8, 9-12) mit motto-spezifischer Accent-Farbe
- **Stage 3 Bridge:** BirthdayProject.create() seeded mit theme + child.age, 2 Sek Auto-Redirect zu `/kindergeburtstag?motto=X&age=Y`
- **noindex,nofollow** bis P7-7 Launch — nur Beta-Test
- **E2E getestet** via Preview-Server: Click Piraten → 6-8 → BirthdayProject.get() liefert {source:'wizard', theme.slug:'piraten', child.age:7}

### Task #25 Trust-Zahl-Sync
- **index.html:** 9 Stellen „9 Mottos / 9 Themen" → 13 (Schema.org description, featureList, FAQPage-Answers, Trust-Zeile)
- **js/index.js:** „9 Mottos" → 13, „81 Spiele" → 150+, „9 Themen" → 13, „9 Motto-Welten" → 13, „81 Spielideen" → 150+
- **Echter Live-Stand:** 15 Mottos in Registry, 13 mit Planer+Schatzsuche live, 2 nur mit Einladung (superheld, prinzessin)

### Welle Alpha A1 — Hero-Rewrite Funnel-Axiom v2
- **Headline:** „kostenlos in 10 Minuten" → **„in 60 Sekunden statt 60 Minuten"** (Wettbewerbs-Argument vs Pinterest)
- **Sub-Headline:** **„Plan, Einladung, Schatzsuche und Partyseite — in einem Flow"** (kommuniziert Wizard-Vision ohne Premium-Hype)
- **Sub-Trust:** **„Plan online gratis · Drucke optional · In 60 Sekunden fertig"** (Pre-Sell-Hint für Premium-PDF ohne harten Promise)
- **Tail-Trust:** **„13 Mottos · 150+ Spielideen"** (aktualisiert vom alten „9 Mottos / 81 Spiele")
- **NICHT** Wizard-CTA im Hero — Wizard ist noindex, Hero bleibt auf /kindergeburtstag fokussiert

## 🎯 Heute strategisch entschieden — Welle 7 D1-D8

Alle 8 Architektur-Entscheidungen für Wizard-Funnel via 5-Prototyp-Iteration (v1-v5) + Helfer-v3-Live-Audit:
- **D1 Wizard-Sequenz:** 6 Stages Plan-Preview-First ✅
- **D2 Tech-Architektur:** Hybrid /wizard parallel zu bestehenden Tools ✅
- **D3 State:** localStorage + optional Magic-Link ✅
- **D4 Smart-Defaults:** Samstag in 4 Wochen, 6 Gäste, zuhause, 5 Spiele ✅
- **D5 Multi-Touch:** 1 SKU Welle Alpha, Mini-SKUs erst Beta ✅
- **D6 Print-Pipeline:** Welle Alpha Canva statisch, Beta Playwright dynamisch ✅
- **D7 Migration:** P6-1 wird Teil von P7-1c, P3-S4-S7 werden Plan-Stage-Module ✅
- **D8 Welle-Alpha-Relation:** Parallel A/B Bestand-Planer + Wizard-Variante ✅

Backlog updated: **Welle 7 mit P7-0 + P7-1 bis P7-7 Tickets** in BACKLOG-AUDIT.md.

## 📊 Helfer-v3 Live-Audit-Befunde (29.05. morgens)

| Befund | Wirkung |
|---|---|
| **4 verschiedene Motto-Listen drift live** (Planer 10, Einladung 10, Schatzsuche 12, Partyseite 10) | Wizard löst dies via theme-registry als Single Source of Truth |
| **birthday-project.js existiert schon** mit perfektem Wizard-State-Schema | P7-Aufwand sinkt von 4 Wochen auf ~10 Tage (Komponenten-Reuse) |
| **Schatzsuche-Generator ist im Planer integriert**, nicht eigener Tool | Wizard nutzt SchnitzeljagdBlock-Component reuse |
| **Lemon Squeezy Checkout-Code da, SKUs leer** | Stripe-Setup ist nur Konfiguration, kein neuer Code |

## 🔬 Wizard-Prototyp-Iteration (heute komplett)

5 v-Versionen in `_dev/prototypes/`:
- v1: Single-Motto Piraten Plan-Preview-First Konzept-Beweis
- v2: Full-Tour mit Motto/Alter-Picker + Outcome-Browser-Frames
- v3: Full-Funnel mit Async-Save + Custom-Timeline + Einladung-Editor + Partyseite-Editor (6 Stages)
- v4: Self-Audit-Fixes (12 Mottos voll + echte URLs + Konflikt-Warnung + Mobile-Toggle)
- v5: Helfer-v3-Live-Aligned (15 Mottos = Live-Union, Foto-Upload, WhatsApp-RSVP, Social-Proof, Notfallplan-CTA)

Konzept-Doc: `_dev/handoff/2026-05-29-wizard-funnel-plan.md` (Status: ✅ Konzept fertig)

---

## Vorheriger Eintrag

# Session-Notiz — 28.05.2026 (Cloudflare Cache-Fix + Broken-Link-Cleanup + GSC Tag 1 + Deploy)

> ## ℹ️ Historisch (verworfen — Deploy 29.05. ersetzt diesen Stand komplett)
>
> Banner vom 28.05. abends war stale-fetch-Artefakt — Merge `2c1a2e9 Cache-Rule-Fix + Broken-Links + GSC Tag 1 (28.05.2026)` lief eigentlich durch. Live-Verifikation 29.05. morgens bestätigte:
> - ✅ Homepage 200 OK, `cf-cache-status: HIT`, Cache-Rule wirkt
> - ✅ `/kindergeburtstag/ritter` 200 OK (kein 5xx mehr) — Hauptziel der Cache-Rule erreicht
> - ✅ `/halloween-kinder-zuhause` 404 (korrekt entfernt)
> - ✅ Broken-Link-Sweep + Email-Infra + Amazon-Tag-Fix sind alle live
>
> **Was am 29.05. nachgereicht:** Die 2 lokalen SESSION-NOTES-Commits `4e5f0ca` (Post-Deploy Chrome-Verify) und `e7f6986` (das falsche Reminder-Banner selbst) — beide `[skip netlify]`, keine Wirkung auf Live-Site. Pushed via inline-PAT in Cowork-Session am 29.05. morgens. `origin/draft` jetzt synchron.
>
> **Echte offene Punkte (für 29.05. Session):**
> 1. **Task #25 Trust-Zahl-Sync** — Homepage zeigt 18× „9 Mottos" / „81 Spielideen". Real: 10 (Einladungs-Mottos mit Page) bzw. 13 (mit pferde/ritter/baustelle Planner). Bolle entscheidet ob 10 oder 13 oder anders.
> 2. **Task #21 Planer-GENERIC-Array** — pferde/ritter/baustelle noch nicht im Planer-Modal sichtbar (theme-registry ja, GENERIC-Array nein).
> 3. **GSC Tag 2 Indexing** — 9 URLs auf der Tagesliste.
> 4. **Phase 3 Wave 1 Endspurt** — dschungel + feen Hubs (Status der gestern aktiven Writer-Tabs unklar nach Compaction).

---

**Branch:** `draft` → `main` (Ende deploy)

## Cloudflare Cache-Rule: Strukturelles 5xx-Problem gelöst

**Diagnose 28.05.2026:** Google's GSC zeigte `/kindergeburtstag/ritter` als „Serverfehler (5xx)" beim Indexierungs-Versuch. Live-curl-Tests gegen alle User-Agents (Browser, Googlebot, AhrefsBot): **200 OK aber `cache-status: fwd=miss`** für JEDEN Request → Cloudflare cached HTML nicht (Default-Verhalten + Netlify's `Cache-Control: max-age=0`) → bei Bot-Crawls Netlify-Origin überlastet → intermittierende 5xx.

**Erklärt rückwirkend:**
- Warum nur 1 Page in Google indexiert (laut Ahrefs-Audit)
- Warum Ahrefs initial 61 5xx sah
- Warum Site-Authority nicht wuchs trotz Content-Tiefe

**Fix:** Cloudflare Cache Rule aktiviert:
- Eligible for cache: ON
- Edge TTL: 2h (Ignore cache-control header)
- Browser TTL: 2h (Free-Tier-Minimum)
- Serve stale content while revalidating: ON
- Verifiziert per curl: `cf-cache-status: HIT` bei 2. Request für ritter, dschungel, feen

**Pflicht-Folgeregel** in `.claude/CLAUDE.md`: Cloudflare Cache nach jedem `Ende deploy` purgen (sonst 2h alte Version live).

## Broken-Link-Sweep (Ahrefs-Discovery 28.05.)

5 echte broken Links identifiziert + gefixt:

1. **`/ratgeber`** — verlinkt in Planer-Footer (JSX + compiled JS), Page existiert nicht
   - Fix: Footer-Link entfernt + 301-Redirect `/ratgeber*` → `/kindergeburtstag-checkliste`
   - Wirkung: 83 Pages mit broken Link weg

2. **`/halloween-kinder-zuhause`** — verlinkt in Homepage Tool-Liste (`js/index.js`)
   - Fix: Link entfernt (kein Halloween-Fokus)

3. **`/kindergeburtstag/polizei-3-5-jahre`** — verlinkt in feuerwehr-3-5-jahre.html
   - Fix: Polizei-Button entfernt (kein Motto im System)

4. **`/kindergeburtstag/bagger-baustelle-3-5-jahre`** — gleiche Page
   - Fix: Auf existierendes `/baustelle-3-5-jahre` umgelinkt

5. **`/kindergeburtstag/zirkus`** — verlinkt in safari-3-5-jahre.html
   - Fix: Auf existierendes `/dschungel` umgelinkt

**5xx-Falschalarm-Erkenntnis:** Von 5 Ahrefs-gemeldeten 5xx-URLs waren 3 in Wahrheit 301-Redirects (alte Crawl-Daten vor Cache-Fix). Beim nächsten Re-Crawl sollten Falschalarme verschwinden.

## GSC Manual-Indexing Tag 1 — 11 URLs

Erste GSC-URL-Indexing-Runde nach Cache-Fix:
- 8 Phase-3-Pages (dschungel × 4, feen × 4)
- 2 Mottos-Sprint Hubs (pferde, ritter)
- 1 Bonus (baustelle) bevor Tageskontingent erschöpft
- Reality-Check 04.06.2026 (7 Tage später): wie viele tatsächlich indexiert?

## Ahrefs Webmaster Tools etabliert + Web Analytics Pilot

- **WMT eingerichtet** als kostenlose SEO-Datenquelle (Alternative zu Premium $129/Mo)
- **Site-Audit:** Health Score 79 (Good) nach Re-Crawl
- **Web Analytics Pilot** auf 4 Top-Pages (Homepage, Piraten, Detektiv, Schatzsuche-Hub). Vollroll als AQ6.

## Backlink-Strategie geklärt

LinkBroker.de + ähnliche Plattformen → **abgelehnt** (Penalty-Risiko, geringer ROI bei machsleicht's Größe).
Premium-Sponsored-Posts (Mopo, Forbes via Broker) → **erst nach Welle-Alpha-Validation** (€500-15.000 pro Post nicht wirtschaftlich solange Conversion-Funnel unvalidiert).
Stattdessen kostenlos: HARO + Tool-Verzeichnisse + Pinterest + organisches Eltern-Blog-Outreach → AQ8 im Backlog.

## Strategischer Konsens: P6-1 Einladungs-Refactor erledigt /einladung/*-5xx automatisch

Die 3 verbleibenden /einladung/*-5xx-Falschalarme verschwinden durch P6-1 (Apps → SEO-Hubs + noindex). Heute keine Einzel-Fixes nötig.

---

## Funnel-Demo Feuerwehr — Pivot zu Tool-Karten mit echten Screenshots

Nach drei Iterationen (2-Block / 5-Frame / Pinterest-Pin) **Pivot zum eigentlich richtigen Ansatz:** eine 4-Karten-Sektion mit *echten Tool-Screenshots* für die Startseite.

**Erkenntnis:** Alle bisherigen Mockups waren von mir gestaltete UI, die *wie* Screenshots aussehen — das birgt Vertrauensbruch wenn der Nutzer auf der Startseite das Versprechen sieht und im echten Tool eine andere Optik findet. Nur Live-Captures der echten Tools sind deploy-würdig.

**Was im Repo ist (`_dev/marketing/funnel-demos/feuerwehr/`):**
- `tools-cards.html/.png` — Target-Layout der 4-Karten-Sektion (Planer / Schatzsuche / Einladungs-Spiel / Partyseite)
- `current-captures/` — drei echte Live-Captures als **Platzhalter** (klar markiert: PLATZHALTER im Dateinamen)
- Alte Mockup-Files gelöscht: 2-Block, 5-Frame v1/v2, Pinterest-Pin

**Capture-Stand:**
- Planer: Hero-Page captured (FALSCH — soll der fertige Plan-Output sein)
- Schatzsuche: Builder-Landing (FALSCH — soll die interaktive Schatzkarte sein)
- Einladungs-Spiel: Spiel-Initialscreen mit 9 Bränden (OK — Chase-Phase wäre besser)
- Partyseite: Platzhalter-Block im Layout, Capture pending (Worker-Setup oder Demo-URL nötig)

**Nächster Schritt:** Bolle bestimmt die richtigen „Wow-Momente" pro Tool (entweder per Screenshot-Upload oder Anleitung), dann werden die Platzhalter ausgetauscht und Sektion neu gerendert.

**Status:** Target-Layout steht, Screenshots noch Platzhalter — explizit so in README + Dateinamen markiert. Nicht für öffentliche Verwendung bis Wow-Momente da sind.

**Funnel-Axiom unverändert:** Hero = „Kindergeburtstag planen", Tool-Karten-Sektion ist Conversion-Beweis darunter, nicht neuer Hero.

## Ahrefs Webmaster Tools Setup + Site-Audit-Discovery

**Setup 27.05.:** Ahrefs WMT als kostenlose SEO-Datenquelle eingerichtet (Alternative zu Premium-Plan $129/Mo, ~70% gleiche Wirkung für eigene Domain).

**Site-Audit Ergebnis nach Re-Crawl:**
- **Health Score 79 (Good)** — initial 63 wegen Crawl-Timing-504er, durch Re-Crawl bestätigt: war Artefakt von gestern Nacht's Netlify-Deploys + Cloudflare-Origin-Timeout
- Echte Hygiene-Issues identifiziert: 38 Meta-Descs zu lang, 17 Canonical-Chains, 11 Redirects in Sitemap, 24+30 interne Redirects, 5 Title-Length-Issues
- → AQ5-Sprint im Backlog formell angelegt (6-10 Std Cleanup)

**504-Investigation:** Live-Tests via WebFetch bestätigten: alle 61 als 5XX gemeldeten Pages funktionieren tatsächlich problemlos. URL-Parameter-Varianten (`?motto=X&alter=Y`) sind kein Cache-Hit bei Cloudflare → jede Variante = Origin-Request zu Netlify → bei High-Volume-Bot-Crawl Rate-Limit. AQ5-Bonus-Tasks: Cloudflare „Allow Verified Bots" + robots.txt URL-Param-Disallow.

## Ahrefs Web Analytics: Pilot-Rollout

Snippet als 2. Tracking-Layer neben Umami installiert auf 4 Top-Pages: `index.html`, `kindergeburtstag/piraten.html`, `kindergeburtstag/detektiv.html`, `schatzsuche.html`. Vollroll auf alle ~150 HTML-Files als AQ6 nach 48h Daten-Validation.

**Strategischer Wert:** Ahrefs konsolidiert Site Audit + Backlinks + Keyword-Ranks + jetzt auch Traffic-Daten in einem Dashboard — wird Welle-Alpha-Tracking deutlich vereinfachen.

## Chrome-MCP Live-Review (vor Ahrefs)

Independent Review aller heutigen Code-Änderungen per Chrome-MCP. Findings:
- ✅ Amazon-Tag `machsleicht21-21` auf allen 6 Stichproben-Pages (Piraten, Dschungel, Feuerwehr-6-8, Feen) korrekt
- ✅ Einladungs-Default-Name `Mia` auf 3 Stichproben (Feuerwehr, Dino, Einhorn) — kein Emilia mehr
- ✅ Planer ohne Charaktere-Toggle, alle Phase-3-Mottos (Dschungel, Feen) im Picker
- ⚠️ **Bug entdeckt:** Planer zeigt nur 10/13 Mottos. Pferde + Ritter + Baustelle fehlen im GENERIC-Array (`_src/kindergeburtstag-data.js`). → AQ4 im Backlog (3-6h Sprint, am besten im Planer-Frisur-Sprint S5 mit reingenommen).

## Einladungs-Apps: Privacy-/Branding-Quick-Fix

## Einladungs-Apps: Privacy-/Branding-Quick-Fix

Befund: 9 von 10 `/einladung/<motto>/`-Apps hatten **`childName = "Emilia"`** hardcoded als Default. Nur Piraten hatte `"Mattis"`.

**Risiko:** Wenn „Emilia" Bolle's Tochter ist → Privacy-Issue (echter Name in 9 deployed Files). Plus: inkonsistentes Branding (9× Emilia + 1× Mattis), und User landen bei `/einladung/feuerwehr` direkt auf einer Demo-App mit „Emilia"-Daten — verwirrend.

**Fix:** Sed-Replace `Emilia` → `Mia` in 9 Files (dino, einhorn, safari, feuerwehr, detektiv, superheld, prinzessin, meerjungfrau, weltraum). Piraten bleibt `"Mattis"`. Beide Stellen pro File: Default-Param + URL-Param-Fallback.

**Großer Refactor im Backlog (P6-1):** Die eigentliche Architektur-Schwäche ist dass `/einladung/<motto>/` direkt eine 1800-Zeilen-React-App ist, keine SEO-Hub-Page. Soll-Struktur: Top-Hub → Motto-SEO-Hubs → 3 Varianten je Motto (WhatsApp-App + Print-PDF + Text-Vorlagen). Robots-Splitting (Hubs index, Apps noindex). 2-3 Tage Arbeit. In Welle Gamma G7 (P5-Pricing-Sprint) integriert.

---

## Was wurde gemacht — Email-Stack komplett saubergezogen

### Migadu Micro Subscription live (beide Domains)
- Trial war am 8. Mai abgelaufen → 19 Tage Service suspended → alle Replies auf `kontakt@...` gebounced
- 27.05. Micro-Plan ($19/Jahr) bezahlt → Service sofort reaktiviert
- Beide Domains aktiv: `machsleicht.de` + `machsruhig.de`
- Plan-Begründung Micro statt Mini: $71/Jahr gespart, Solo-Setup braucht weder Multi-Admin noch API-Access

### Email-Architektur klargestellt
- **Migadu = Routing-Layer, nicht primäres Postfach**
- Mails an `kontakt@machsleicht.de` → Migadu empfängt → forwarded zu `christian.bollweg@advergy.de` (M365)
- Storage in Migadu bleibt ~0 GB
- Reply-Workflow: über Migadu-Webmail (`webmail.migadu.com`) damit FROM-Header korrekt ist
- **Resend = Outbound-API**, sendet Worker-Mails. Migadu hat damit nichts zu tun.

### Falsche Email-Adresse `party@machsleicht.de` ausgemustert
- 1+ Monat war `party@...` als Reply-To überall hardcoded — Adresse hat NIE existiert
- Eltern-Replies verschwanden ins Nichts
- Fix: `party-worker.js` Default auf `kontakt@machsleicht.de` + Doku 4 Stellen synced + OPEN-DECISIONS resolved

### SPF-Record für machsleicht.de erweitert (CRITICAL FIX)
- Vorher: `v=spf1 include:spf.migadu.com -all` — Resend nicht autorisiert
- Nachher: `v=spf1 include:_spf.resend.com include:spf.migadu.com -all`
- Edit in Cloudflare DNS, ~5 Min Propagation, durch Google DNS verifiziert
- Worker-Mails (Edit-Link, Newsletter-DOI) sollten ab jetzt deutlich weniger im Spam landen

### Cloudflare Worker Env-Vars korrigiert
- `RESEND_API_KEY` war als **Plaintext** statt **Secret** gesetzt — rotiert + neuer Key als Secret-Type
- `RESEND_FROM` von `party@...` auf `kontakt@machsleicht.de` korrigiert
- `RESEND_REPLY_TO` neu angelegt (war komplett ungesetzt)
- `AMAZON_TAG` von `machsleicht-21` auf `machsleicht21-21` korrigiert (selbe Falsch-ID wie heute Nacht im HTML-Code)
- Worker re-deployed via Save-Button

### machsruhig.de Pre-Launch-Email-Setup ins Backlog
- machsruhig hat strikteres DMARC (`p=quarantine/reject` aktiv) als machsleicht
- Aktuell: Resend für machsruhig.de **nicht** verifiziert → keine Sends möglich
- Vor Launch (P3-6): Resend-Domain-Verification + DKIM-CNAMEs + SPF-Erweiterung Pflicht
- Im BACKLOG-AUDIT als Pflicht-Schritt unter P3-6 dokumentiert

## Kritische Lessons aus dieser Session

1. **Provider-Dashboards sind Source-of-Truth, nicht Code-Doku.** Der Amazon-Tag-Fix vom 16.04. war falsch dokumentiert als „korrigiert", weil ohne Screenshot des PartnerNet-Dashboards verifiziert. Dasselbe Pattern hätte sich heute beim SPF-/Resend-Setup wiederholen können — wurde durch echte mxtoolbox-Verifikation vermieden.

2. **API-Keys als Plaintext = Sicherheitsrisiko.** Cloudflare bietet Plaintext UND Secret als Variable-Type. Bei API-Keys IMMER Secret wählen. Plaintext zeigt den Key im Dashboard offen, jeder mit Read-Access sieht ihn.

3. **Email-Setup = mindestens 5 DNS-Komponenten gleichzeitig prüfen.** MX, SPF, DKIM-Resend, DKIM-Migadu, DMARC. Jeder einzelne kann der Spoiler sein. Migadu-Dashboard zeigt nur den eigenen Status, nicht ob Resend-Setup parallel sauber ist.

4. **`p=quarantine` bei DMARC ist nur sicher wenn alle Sending-Pfade verifiziert sind.** machsruhig.de hat das (gut), aber das heißt zukünftige Mail-Setups dort MÜSSEN vor erstem Send vollständig SPF+DKIM-konfiguriert sein.

## Commits diese Session (lokal auf draft)

- `52ab6fe` Doku: Migadu Micro live für beide Domains
- `a8a7ace` FIX: kontakt@ statt party@ (Worker + Doku)
- `4a13870` BACKLOG: machsruhig-Launch Pre-Email-Setup-Note
- + finaler party-worker.js Header-Comment-Update + diese SESSION-NOTES

## Was Bolle extern erledigt hat (Cloudflare/Migadu/Resend)

- ✅ Migadu Micro Subscription bezahlt
- ✅ Cloudflare DNS SPF-Record erweitert
- ✅ Resend-API-Key rotiert (alter `re_9G31o...` revoked)
- ✅ Neuer Resend-Key in Cloudflare als **Secret** gesetzt
- ✅ Worker-Env-Vars: AMAZON_TAG fixed, RESEND_FROM fixed, RESEND_REPLY_TO neu
- ✅ Worker re-deployed
- ✅ Mailbox-Passwort für kontakt@machsleicht.de gesetzt (für Webmail)

## Was noch offen — niedrige Prio

1. **DMARC-Policy für machsleicht.de** von `p=none` auf `p=quarantine` hochziehen — erst nach 7-14 Tagen sauberem Email-Flow, wenn DMARC-Reports zeigen dass keine echten Mails versehentlich blockiert werden
2. **PAT-Widerruf** auf [github.com/settings/tokens](https://github.com/settings/tokens) — Token war mehrfach im Session-Chat
3. **machsruhig.de** bei tatsächlichem Launch: Pre-Email-Setup nach Backlog-Liste
4. **Amazon SES auf `send.machsleicht.de`** Subdomain — Legacy? Aktiv? In nächster Session klären
5. **wrangler.toml + wrangler-Deploy-Workflow** statt manuelles Cloudflare-Dashboard-Editing — sauber als technische Verbesserung in nächste Refactor-Session

---

# Session-Notiz — 26.05.2026 (Letzter Akt: Amazon-Tracking-ID Critical Fix + Deploy)

**Branch:** `draft` → `main` (Ende deploy)

## Was wurde gemacht

### 🚨 CRITICAL: Amazon-Tracking-ID Fix (Commit 52823dc)

User hat heute Nacht beim Infrastruktur-Audit den Amazon-PartnerNet-Dashboard-Screenshot gezeigt:
- **StoreID: `machsleicht21-21`** (per Screenshot verifiziert)
- Code hatte überall `tag=machsleicht-21` durch einen Fix vom 16.04.2026
- **Der Fix vom 16.04. ging in die FALSCHE Richtung** — ursprünglich gemischt 566×`machsleicht21-21` + 230×`machsleicht-21`, "konsolidiert" wurde fälschlich auf den FALSCHEN Tag

**Impact:**
- 2234 Affiliate-Links in 95 Live-Files seit 16.04.–26.05.2026 (40 Tage) **untracked**
- Keine Provisionsverbuchung in diesem Zeitraum
- Bei ~80 Visitors/Tag und ~3% CTR-Annahme auf Affiliate-Boxen = realistisch 0–10€ verloren, aber alle Klick-Daten sind weg

**Fix (Commit 52823dc):**
- Mass-Replace via sed: `find ... -exec sed -i 's/tag=machsleicht-21/tag=machsleicht21-21/g'`
- 2234 Vorkommen in HTML, JS, JSX, CSS + 4 Python-Build-Scripts in `_build/`
- Doku-Korrektur in STRATEGIE.md, AUDIT.md, BACKLOG-AUDIT.md, .claude/CLAUDE.md
- Historische 16.04.-Doku-Einträge mit Korrektur-Hinweis ergänzt (nicht überschrieben — Audit-Spur erhalten)

**Verify-Check:**
- `grep tag=machsleicht-21 --include="*.html" --include="*.js" .` → **0 Treffer**
- `grep tag=machsleicht21-21 --include="*.html" --include="*.js" .` → **2234 Treffer**

### Lehre: Self-Audit-Methodik hat hier nicht gegriffen

Der 16.04.-Fix wurde mit "566 falsche Tags korrigiert" dokumentiert ohne die EINFACHSTE Verifikation: einen Blick ins PartnerNet-Dashboard. Self-Audit-Methodik braucht für externe APIs/Accounts den Loop: **erst Quelle prüfen, dann Code anpassen** — nicht andersrum.

→ **Action für nächste Sessions:** Bei jedem Infrastruktur-Fix (Tracking-IDs, API-Keys, Webhook-URLs, Affiliate-Tags) MUSS vor dem Code-Commit ein Screenshot des Provider-Dashboards in der Session geteilt werden. Doku alleine reicht nicht.

---

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

---

## Post-Deploy Live-Verifikation 28.05.2026 (Chrome-MCP)

Nach „Ende deploy" verifizierte Live-Site `https://machsleicht.de/`:

| Check | Ergebnis |
|---|---|
| HTTP-Status | ✅ 200 |
| Cloudflare Cache | ✅ `cf-cache-status: HIT`, age=43s — **Cache-Rule wirkt** (Edge-Cache aktiv, keine 5xx mehr für Bots erwartbar) |
| Umami + plausible()-Shim | ✅ beide aktiv |
| Halloween-Link entfernt | ✅ weg |
| /ratgeber-Link entfernt | ✅ weg |
| H1 + Title | ✅ "Kindergeburtstag planen — kostenlos in 10 Minuten" |

**Befund Trust-Zahl-Drift (neuer Task #25):** Homepage zeigt 9× „9 Mottos" / „81 Spielideen" / „9 Motto-Welten" — Real-Stand: 10 Einladungs-Mottos mit Page + 3 (pferde/ritter/baustelle) mit Planner-Page (im theme-registry seit heute, GENERIC-Array pending Task #21). CLAUDE.md PBI-Impact-Check Punkt #4 verletzt — Zahlen-Konsistenz über Hero, Meta-Desc, Schema.org `featureList`, Trust-Zeile, Footer, SEO-Fallback nötig.

**Empfehlung:** Konservativ 10 (alle live mit Einladungs- und Schatzsuche-Page) oder 13 (inkl. neu integrierten Planner-Mottos). Entscheidung user-pending.

## Ende deploy 28.05.2026 — Deploy-Workflow

Merge-Block: ~150 Commits seit 21.05.2026 auf main:
- Phase 2 Wave 1+2 (feuerwehr/weltraum/piraten 8 Light→Elite)
- Phase 3 Wave 1 (dschungel + feen 2 Hubs + 6 Age-Pages)
- Mottos-Sprint Welle 2-11 (pferde/ritter/baustelle ELITE)
- Helfer-v3 Security Welle 1A-1E (5 Critical Fixes party-worker)
- Amazon-Tracking-ID Critical Fix (machsleicht-21 → machsleicht21-21)
- Email-Infrastruktur (Migadu Micro + Resend kontakt@ + SPF/DKIM)
- Cloudflare HTML-Cache-Rule (5xx-Problem strukturell gelöst)
- /ratgeber + Halloween + Polizei + bagger-baustelle + Zirkus Broken-Links gefixt
- 8 Einladungs-Apps Default-Name Emilia → Mia (Privacy)
- theme-registry: pferde + ritter + baustelle
- Funnel-Demo Feuerwehr Pivot zu Tool-Karten
- Ahrefs WMT + Web Analytics Pilot

**PFLICHT-NACHSCHRITT:** Cloudflare Cache-Purge nach Netlify-Build-Done (CLAUDE.md §Cache-Purge).

