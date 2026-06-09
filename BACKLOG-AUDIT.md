# machsleicht.de — Backlog

**Letzte Aktualisierung:** 26.05.2026 (Premium-Monetisierung Sprint Welle Alpha–Gamma eingefügt nach 2 externen AI-Audits; Welle Alpha 3-Wochen PoC mit 1 SKU)
**Status-Check:** Repository-weit durchgeführt, gegen Live-Stand abgeglichen. 8 PBIs auf ✅ gesetzt.
**Zweck:** Einzige Quelle für alle offenen und erledigten PBIs. Strategie-Kontext steht in `STRATEGIE.md`.

**Portfolio-Label (siehe STRATEGIE.md Abschnitt 0.9):** Jeder PBI gehört zu einer Spalte: `[KERN]` (Kindergeburtstag-System) · `[TEST]` (Einschulung SEO-Cluster) · `[ZUKUNFT]` (eingefroren bis Monetarisierungs-Stufe-1 bestanden) · `[LEGACY]` (Long-Tail-SEO, keine aktive Entwicklung). Aktive PBIs der Prio-Tabelle sind etikettiert. Bestehende Detail-Tickets werden bei der nächsten Pflege nachetikettiert. Neue PBIs ab 22.04.2026: Label ist Pflicht, sonst nicht freigegeben.

---

## Prio-Tabelle (Ausführungs-Reihenfolge, neu sortiert 19.04.2026)

**Logik:** Nicht nach Ticket-Nummer, sondern nach tatsächlicher Ausführungs-Reihenfolge. Ticket-Nummern bleiben stabil. Die Tabelle ist jetzt eine Roadmap: von oben nach unten abarbeiten.

### Jetzt (nächste 1–2 Wochen)

| # | Status | Prio | Ticket | Kurzbeschreibung | Aufwand | Warum jetzt |
|---|--------|------|--------|------------------|---------|-------------|
| 0 | ⏳ | **P0** | P0-GSC | `[KERN]` **GSC-De-Indexing Recovery** — Legacy-Redirects (Soft-404-Muster: hunderte Thin-/Lizenz-URLs 301→/kindergeburtstag) auf **410 Gone** umstellen; `/einladung`-Sitemap+Canonical-auf-Redirect fixen; danach Sitemap neu einreichen + Flaggschiff-Seiten Index-anfragen + GSC-Validierung neu. **Ursache = Google-Site-Quality-Abwertung wegen Phase-1-Dünn-Content-Masse (308→1 indexiert seit April), KEIN Server-/noindex-Defekt; aktuelle 126 Seiten sind unique+gut.** Detail+Belege: `_dev/handoff/2026-06-03-gsc-deindex-rootcause.md`. **Stand 08.06.: 410-Redirects + einladung-Canonical/Sitemap-Trailing-Slash + /ratgeber→410 sind LIVE; gstatic-Preconnect site-weit (205 Seiten) ergänzt.** | 3–5 Std + 2–4 Mon Geduld | Massen-De-Index seit April, Validierung 30.05 fehlgeschlagen — höchste Prio |
| 0b | ⏳ | **P1** | P6-1 (= G7) | `[KERN]` **Einladungs-Cluster SEO-Refactor — HOCHGESTUFT 08.06.2026 (Bolle): nächste Prio, raus aus Welle Gamma.** Verifiziert 08.06. (HTML-Parser): **alle 16 `/einladung/<motto>/`-Seiten sind JS-Shells mit nur 4–5 server-gerenderten Wörtern**; **10 davon stehen bereits in `sitemap.xml`** = genau das Thin-/Template-Muster der GSC-Abwertung. Die 5 nicht-gelisteten (baustelle/dschungel/feen/pferde/ritter) sind zusätzlich von 0 Seiten intern verlinkt (orphaned) → **bewusst NICHT in Sitemap aufgenommen.** Refactor-Soll siehe G7 (Hub mit SEO-Content `index,follow`, Apps `noindex`). **Helfer-v3-Pflicht** für den Content-Aufbau. | 2–3 Tage + 1 Tag/Motto | Thin-Content-Cluster bremst GSC-Recovery aktiv; Bolle-Entscheidung 08.06. |
| 1 | ✅ | **P0** | P0-5 (ex P1-5) | **GitHub Token rotieren** | 5 Min | Erledigt 19.04.2026 |
| 2 | ✅ | **P0** | P0-1 | Google Search Console einrichten + Sitemap einreichen | 20 Min | Erledigt 19.04.2026 |
| 3 | ✅ | **P1** | P1-10 | **Cloudflare Worker deployen** (Rätsel nach Maß + Partyseite) | 2 Std (Laptop) | Erledigt 19.04.2026 |
| 4 | ✅ | **P1** | P2-1 | Homepage-Hero FUNNEL-AXIOM umbauen | 2–3 Std | Erledigt 19.04.2026 |
| 5 | ✅ | **P1** | P1-7 | Social Proof auf Homepage + Planer | 1 Std | Erledigt 19.04.2026 |
| 6 | ✅ | **P1** | P2-19 | **HTML-Bug: Doppelte class-Attribute** (300 Dateien) | 30 Min | Erledigt 19.04.2026 |
| 7 | ✅ | **P1** | P2-3 | Ergebnis-Vorschauen + klickbarer Beispiel-Plan | 4–5 Std | Erledigt 19.04.2026 |

### Unmittelbar danach (2–4 Wochen)

| # | Status | Prio | Ticket | Kurzbeschreibung | Aufwand | Kontext |
|---|--------|------|--------|------------------|---------|---------|
| 8 | ✅ | **P1** | P1-16 | `[KERN]` **Partyseite Follow-Ups** — guestView cleanup, reply_to, Foto-Crop Mobile-Fix, Beteiligen custom amount, Audit | 2 Std | **Erledigt 23.04.2026** (Chat-Session). Migadu-Setup für beide Domains (machsleicht + machsruhig) am 26.05.2026 abgeschlossen. |
| 9 | ✅ | **P1** | P1-20 | `[KERN]` **Internal-Linking-Fix** (Superheld 0 Links, Prinzessin 2 Links) | 3 Std | **Erledigt 23.04.2026**: Hub-Pages + Card-Swap. Prinzessin 5→85, Superheld 3→68 Links |
| 10 | 🔄 | **P1** | P1-15 | `[KERN]` **Email-Capture (Pilot: Partyseite + Einladung→Partyseite-Funnel)** | 4–5 Std | **Code fertig 24.04.2026 — Variante A.** Strategie-Revision in Session: Capture sitzt am Partyseite-Creator (Pflicht-Edit-Link + optionale Newsletter-Checkbox mit DOI), nicht am Einladungstool. Einladungstool bekommt aktivierten Partyseite-CTA mit Query-Param-Handover (`childName`, `motto`, `mottoEmoji`) als Funnel-Bridge. **Extern-Tasks offen:** Resend-Audience anlegen, `RESEND_AUDIENCE_ID` als Env-Var setzen, Worker deployen. Newsletter-Capture so auch auf Schatzsuche übertragbar (je 1–2h Template-Reuse) |
| 11 | 🔄 | **P1** | P1-17 | `[KERN]` **DSGVO-Hygiene Partyseite** (A: Worker-Hinweis, B: Datenschutz ✅, C: Auto-Delete-Cron) | 1,5 Std (Laptop) | **B erledigt am 21.04.** Blockt kein weiteres Feature technisch, aber rechtliches Risiko solange A+C offen |
| 11b | ⏳ | **P1** | P1-60 | `[KERN]` **Reminder-System Partyseite** (A: 7-Tage-vor-Party, B: 11-Monate-Year-Later, C: Unsubscribe-Endpoint) | 5–7 Std (Laptop) | **Neu 20.05.2026.** Newsletter-DOI-Confirm-Text verspricht "Erinnerung 7 Tage vorher" — aktuell noch nicht implementiert. Bündeln mit P1-17/C (gleicher Cron-Mechanismus) |
| 12 | ⏳ | **P1** | P2-20 | `[KERN]` **Datenübergabe Planer → Tools** | 4–6 Std | Ökosystem-Prinzip umsetzen, nach P1-10 |
| 13 | ⏳ | **P1** | P2-13 | `[KERN]` Gumroad: 2 Digital-Produkte (Piraten+Dino) | 4h/Produkt | +100€/Monat bei aktuellem Traffic |
| 14 | ⏳ | **P1** | P2-15 | `[KERN]` Awin-Anmeldung (Otto, myToys, Thalia) | 30 Min + Warten | Prüfung dauert 1–3 Tage, früh starten |
| 15 | 🔄 | **P1** | P1-8 | `[KERN]` Motto-Hauptseiten auf Elite-Niveau (**Einhorn ✅** → **Safari** (6-8 ✅) → **Feuerwehr** (3-5 ✅, 6-8 ✅, 9-12 ✅) → Weltraum → Detektiv → Prinzessin/Superheld; nur Tool-integrierte Mottos) | 4,5–5 Std/Motto | **Einhorn komplett, Feuerwehr komplett (alle 3 Altersgruppen, 28.04.2026), Safari 6-8 ✅ (19.05.2026 mit Phase B Elite-Daten).** Nächstes: Safari 3-5/9-12 fertigstellen, dann Weltraum. Content-Inseln (Pferde, Ritter, Zirkus, Baustelle) in P1-8b separat. Marken-Mottos zurückgestellt |
| 16 | ⏳ | **P1** | P1-12 | `[TEST]` **Einschulung SEO-Cluster** (5–8 Landingpages, **kein Planer**) | 1,5–2 Tage | **Launch bis 31.05.** Planer-Upgrade nur wenn ≥100 Visits/Woche im Juli |
| 17 | ⏳ | **P1** | P1-21 | `[TEST]` **Kill-List-Entscheidung** Marken-Mottos + Content-Inseln | 3–6 Std | **Wartet auf GSC-Daten (Zielmonat Mai)**. Ersetzt P1-8b in Funktion. Aus P1-16 #8 ausgegliedert |

### 🪮 Planer-Frisur-Sprint (geplant 11.05.2026, parallel zu obigen P1-Items)

Strategischer Sprint: Planer vom Generator zum intelligenten Produkt umbauen. Realisierung von P2-23. Details in eigenem Abschnitt „PLANER-FRISUR-SPRINT" weiter unten.

| # | Status | Prio | Ticket | Kurzbeschreibung | Aufwand | Kontext |
|---|--------|------|--------|------------------|---------|---------|
| S0 | ⏳ | **P1** | P3-12 | `[KERN]` **Planer-Tier-0 Sofort-Fixes** (Lizenz-Tab raus, 7→9 Mottos, Perf messen) | 2 Std | Sprint-Start |
| S1 | ⏳ | **P1** | P3-13 | `[KERN]` **Cockpit-Header im Plan-View** (Stand-Anzeige + Next-Actions) | 1 Tag | Mentaler Reframe, Voraussetzung für Diff-Anzeigen |
| S2 | ⏳ | **P1** | P3-14 | `[KERN]` **Machbarkeits-Box + Constraint-Solver-Fundament** | 1 Tag | Zentrale Schicht für RSVP-Bridge später |
| S3 | ⏳ | **P1** | P3-15 | `[KERN]` **Datum + Erwachsene als Inputs** | ½ Tag | Voraussetzung für Vorbereitungskarte |
| S4 | ⏳ | **P1** | P3-16 | `[KERN]` **Vorbereitungskarte (Wochenplan vor Geburtstag)** | 1 Tag | Strukturell wichtigster neuer Block, einzigartig im Markt |
| S5 | ⏳ | **P1** | P3-17 | `[KERN]` **3-Gruppen-Einkaufsliste + „Hab ich zuhause"-Inventar** | 1–2 Tage | Markenkern als Mechanik |
| S6 | ⏳ | **P1** | P3-18 | `[KERN]` **SOS-Button im Plan-View** (Live-Hilfe während Party) | 1–2 Tage | Einzigartig, Premium-fähig |
| S7 | ⏳ | **P1** | P3-19 | `[KERN]` **KI-Rätsel-Gedichte für Schatzsuche** (einzige API-Ausnahme, gecacht) | 1 Tag | Wow-Anker, Screenshot-fähig |
| S8 | ⏳ | **P2** | P3-20 | `[KERN]` **RSVP-Bridge** (Partyseite-Zusagen verändern Plan) | 2–3 Tage MVP / 5–7 Tage Vollausbau | Tier 2 nach S0–S7. Voraussetzung: P3-14 |
| S9 | ⏳ | **P2** | P3-21 | `[KERN]` **Live-Party-Navigator** (Tool führt am Tag durch Party) | 5–7 Tage | Größter Wurf. Voraussetzung: alles davor |

**Sprint-Aufwand S0–S7:** ~7–9 Arbeitstage = 6–8 Wochen bei 6–8h/Woche. Tier 2 (S8+S9) zusätzlich 7–14 Tage.


### 💰 PREMIUM-MONETISIERUNG SPRINT (geplant ab 27.05.2026, Welle Alpha → Beta → Gamma)

**Quelle:** Zwei unabhängige externe AI-Audits am 26.05.2026, konvergent auf 8 Kernpunkten (Premium-PDF als erster Hebel, Hero schärfen, standardisierte Page-Blueprints, Redirect-/Index-Bereinigung, Partyseite-Plus, Affiliate-Komplettkorb, Schema.org Product statt FAQ, 6 Pilot-Mottos statt alle 13).

**Strategie:** „Gratis planen, bezahlt umsetzen". Marktvalidierung: ABC-Schnitzeljagd 9–15€, AusgefuXt 15€, Schatzsuche.shop 10.99–20.90€, anymator 2.99€. Preislogik 7.90€ (Notfall) / 9.90–14.90€ (Komplettpaket) / 19.90€ (Pro) ist marktfähig.

**KRITISCHE Vorbedingung:** Bolle designt Printables selbst (Confirmed 26.05.2026, ~3–6h/Motto Design-Zeit). Kein externer Designer im MVP.

#### Welle Alpha (3 Wochen) — Validierung mit EINEM SKU

**Erfolgskriterium:** 3 Käufe in den ersten 3 Wochen nach Go-Live. Wenn nicht erreicht: Hypothese überdenken, NICHT mehr Mottos draufbauen.

| # | Status | Prio | Ticket | Kurzbeschreibung | Aufwand | Woche |
|---|--------|------|--------|------------------|---------|-------|
| A1 | ⏳ | **P1** | P5-1 | `[KERN]` **Hero-Rewrite Homepage** (FUNNEL-AXIOM v2: „Plan gratis, Drucke fertig dazu" statt „kostenlos in 10 Minuten"; Pinterest-Chaos-/Last-Minute-Frame) | 2–3 Std | W1 |
| A2 | ⏳ | **P1** | P5-2 | `[KERN]` **3 Kaufbox-Pattern** auf `piraten-6-8-jahre.html` als Pilot (Sofort-startklar / Nur-noch-kaufen / Premium-ohne-Stress); ohne aktiven Checkout, nur Klick-Tracking als Demand-Probe | 2 Std | W1 |
| A3 | ⏳ | **P1** | P5-3 | `[KERN]` **Pricing-Page-Konzept** entscheiden (`/preise` Single-Page vs. Inline-Boxen pro Motto; 3-Tier-Ladder definieren) | 1 Std | W1 |
| A4 | ⏳ | **P1** | P5-4 | `[KERN]` **Payment-Provider auswählen + einrichten** (Stripe Payment Link Empfehlung — schnellste Time-to-Money, kein Custom-Checkout nötig; Lemon Squeezy Alternative mit DACH-MwSt-Handling) | 4–6 Std | W1 |
| A5 | ⏳ | **P1** | P5-5 | `[KERN]` **Komplettpaket „Piraten 6–8 Standard" designen** — 6 Druckseiten: Einladung, 8 Namensschilder, 6 Schatzhinweise, Urkunde, Einkaufsliste, Mitgebsel-Kärtchen. Statisch designt, KEIN Generator. Tool: Canva oder Figma oder Adobe Express. | 4–6 Std | W2 |
| A6 | ⏳ | **P1** | P5-6 | `[KERN]` **Produktseite `/shop/piraten-6-8-komplettpaket`** mit PDF-Preview (6 Screenshots der Druckseiten, kein Playwright nötig im PoC), Lieferumfang-Liste, FAQ, Schema.org Product+Offer markiert | 3–4 Std | W3 |
| A7 | ⏳ | **P1** | P5-7 | `[KERN]` **Checkout-Flow live** (Stripe-Button → Erfolgsseite → automatischer Download-Link per Email; signierter Link mit Ablaufzeit) | 2–3 Std | W3 |
| A8 | ⏳ | **P1** | P5-8 | `[KERN]` **Plausible/Umami Conversion-Tracking** (Goal: `purchase`, `add_to_cart`, `pricing_view`, `pdf_preview_open`) | 1 Std | W3 |
| A9 | ⏳ | **P1** | P5-9 | `[KERN]` **GO LIVE** + 3-Wochen-Demand-Check (Erfolgsdefinition: ≥ 3 bezahlte Käufe; KPI-Bericht nach Tag 21) | — | W3 Ende |

**Welle-Alpha-Aufwand:** ~20–28 Std. Bei 6–8h/Woche realistisch 3–4 Wochen.

#### Welle Alpha-Quick-Wins (parallel, kein Blocker für A1-A9)

| # | Status | Prio | Ticket | Kurzbeschreibung | Aufwand |
|---|--------|------|--------|------------------|---------|
| AQ1 | ⏳ | **P1** | P5-Q1 | `[KERN]` **Redirect-Audit für Lizenz-URLs** (Harry Potter, Ninjago etc.) — beide AI-Audits flaggten Redirects auf generischen Planer. Verifizieren ob noch live, dann: 404 mit Vorschlägen statt Redirect, oder vollständige Entfernung aus Sitemap | 1–2 Std |
| AQ2 | ✅ | **P1** | P5-Q2 | `[KERN]` **theme-registry.js Konsistenz-Fix** — pferde, ritter, baustelle in Registry nachgepflegt. Erledigt 27.05.2026 (Commit `82dfd53`, lokal auf draft). | 15 Min |
| AQ3 | ✅ | **P1** | P5-Q3 | `[KERN]` **GSC-Workflow standardisiert** — Memory-File `feedback_gsc_sitemap_reminder.md` eingeführt 26.05.2026. Nach jedem Deploy der sitemap.xml ändert: Sitemap re-submit + URL-Indexierung beantragen (max 10/Tag). | dauerhaft |
| AQ4 | ⏳ | **P2** | P5-Q4 | `[KERN]` **Planer-Daten-Sync für pferde/ritter/baustelle** — Hub-Pages + Schatzsuche live + Theme-Registry aktuell, ABER `GENERIC`-Array in `_src/kindergeburtstag-data.js` enthält die 3 Mottos NICHT. Planer-Picker zeigt deshalb nur 10/13 Mottos. Phase-B-JSONs existieren in `_src/elite-motto-data/`, müssen ins GENERIC-Format (212 Zeilen/Motto) konvertiert werden. **Realistischer Aufwand:** 1-2 Std pro Motto = 3-6 Std total für volle Konvertierung; Minimal-Stub (Picker erscheint, dünner Plan-Output) wäre 30-60 Min/Motto = 1.5-3 Std. Idealerweise im Planer-Frisur-Sprint S5 (3-Gruppen-Einkaufsliste) mit reingenommen, da dort eh GENERIC-Datenstruktur angefasst wird. **Discovery aus Chrome-MCP-Review 27.05.2026.** | 3-6 Std |
| AQ5 | ⏳ | **P2** | P5-Q5 | `[KERN]` **Ahrefs-Discovery: SEO-Hygiene-Cleanup-Sprint** — Audit per Ahrefs Webmaster Tools am 27.05.2026 (Health Score 79/Good nach Re-Crawl, war initial 63 wegen Crawl-Timing-504er). Echte SEO-Issues identifiziert: (a) **38 Meta descriptions zu lang** (>160 chars, werden in SERP abgeschnitten) — 2-3 Std systematisch durchgehen, (b) **5 Titles zu lang** — 30 Min, (c) **17 Canonical-Tags zeigen auf Redirects** — Canonical-Chains entwirren, 1-2 Std, (d) **11 Redirects in sitemap.xml** — Sitemap-Cleanup, 30 Min, (e) **24 interne Redirect-Links** + **30 „page has links to redirect"** — interne Links direkt auf Final-URL setzen, 1-2 Std, (f) **6 404-Pages + 6 4XX-Pages** — Audit + Fix, 30 Min. **Total realistischer Sprint-Aufwand:** 6-10 Std. **Bonus-Tasks aus Ahrefs-Setup:** (g) Cloudflare „Allow Verified Bots" aktivieren (5 Min Schutz vor 504-Crawl-Issues), (h) robots.txt mit `Disallow: /*?motto=` etc. erweitern um URL-Param-Varianten von Indexing auszuschließen (30 Min). | 6-10 Std + 35 Min Bonus |
| AQ6 | ⏳ | **P2** | P5-Q6 | `[KERN]` **Ahrefs Web Analytics: Vollroll auf alle ~150 HTML-Pages** — graduell gestartet 27.05.2026 mit Snippet auf Top-Pages (Homepage + Piraten/Detektiv/Schatzsuche-Hub). Nach 48h Daten-Validierung: sed-Script in alle HTML-Files (analog Amazon-Tag-Fix). Bringt Single-Source-of-Truth für SEO-Reports (Traffic + Backlinks + Site Audit + Keyword-Ranks in einem Dashboard). | 1-2 Std nach Daten-Validierung |
| AQ7 | ⏳ | **P1** | P5-Q7 | `[KERN]` **Umami-Setup ordentlich: Events + Funnel-Konfiguration** — Code-seitig sind 10+ Custom-Events implementiert (`motto-selected`, `plan-created`, `sz-activated`, `sz-komplettpaket-gedruckt`, `variant-switch`, `cta-action`, `einladung-schatzsuche-cta`, `invite-to-party-cta`, `edit-link-email-submit`, `newsletter-opt-in`), aber **Umami-Dashboard** ist NICHT entsprechend konfiguriert: (a) Goals/Conversions für Welle-Alpha-Funnel anlegen (`pricing_view` → `add_to_cart` → `purchase`), (b) Events als „Tracked" markieren damit sie in Reports auftauchen, (c) **Funnel-Reports** im Dashboard bauen: Visit → Plan-Started → Plan-Created → Einladung-Started → Pricing-View → Add-to-Cart → Purchase, (d) Goal-Conversion-Rates pro Motto-Page aufschlüsseln, (e) Affiliate-Click-Tracking als neues Event ergänzen (`affiliate-click` mit `{partner, motto, product}`) — heute kein einziger Amazon-Klick in Umami sichtbar trotz gefixtem Tag. **Wichtig vor Welle Alpha:** ohne sauberen Funnel keine Validierung möglich (3-Käufe-Hypothese braucht klare Tracking-Quelle). | 3-4 Std |
| AQ8 | ✅ | **P0** | P5-Q8 | `[KERN]` **Cloudflare HTML-Cache-Rule aktiviert (CRITICAL FIX)** — Diagnose 28.05.2026: Google GSC zeigte `/kindergeburtstag/ritter` als „Serverfehler (5xx)" beim Indexierungs-Versuch. Live-curl-Tests: 200 OK aber `cache-status: fwd=miss` für JEDEN Request → Cloudflare cached HTML nicht → bei parallelen Crawls (Google-Bot, Ahrefs) wird Netlify-Origin überlastet → intermittierende 5xx → Google indexiert kaputt. **Fix:** Cloudflare Cache Rule für `*.machsleicht.de/*`: Eligible for cache, Edge TTL 2h (Ignore cache-control header), Browser TTL 2h (Free-Tier-Minimum), Serve stale while revalidating ON. **Verifiziert:** `cf-cache-status: HIT` für 2. Request auf ritter, dschungel, feen. **Erklärt rückwirkend:** warum nur 1 Page in Google indexiert, warum Ahrefs 61 5xx sah, warum keine SEO-Sichtbarkeit. **Pflicht-Folgeregel:** Cloudflare Cache nach jedem `Ende deploy` purgen (in CLAUDE.md ergänzt). | erledigt 28.05.2026 |

#### Welle Beta (4–6 Wochen) — NUR wenn Welle Alpha erfolgreich verkauft hat

**Trigger:** ≥ 3 Käufe in 3 Wochen. Wenn nicht erreicht → Welle Beta wird NICHT gestartet, stattdessen Welle-Alpha-Hypothese überarbeitet.

| # | Status | Prio | Ticket | Kurzbeschreibung | Aufwand |
|---|--------|------|--------|------------------|---------|
| B1 | ⏳ | **P2** | P5-10 | `[KERN]` **JSON→HTML→PDF Playwright-Pipeline** (build-time auf Netlify oder lokales Build-Script). Schema-Validation mit Zod. Output: PDF + PNG-Previews versioniert. | 3–5 Tage |
| B2 | ⏳ | **P2** | P5-11 | `[KERN]` **5 weitere Komplettpakete** durch die Pipeline: detektiv-9-12, weltraum-9-12, dino-6-8, einhorn-3-5, meerjungfrau-6-8 (basiert auf Top-Money-Pages-Analyse, jeweils ~3–6h Design) | 15–30 Std |
| B3 | ⏳ | **P2** | P5-12 | `[KERN]` **Partyseite Plus** als bezahltes Add-on (4.90–9.90€ einmalig): QR-Code auf Print-Einladung, automatische Erinnerungs-Mails (7d/1d/3h vor Party), Wunschliste, Allergie-Abfrage. Worker-Erweiterung. | 5–7 Tage |
| B4 | ⏳ | **P2** | P5-13 | `[KERN]` **Top-30 Money-Pages 7-Baustein-Standardisierung** (Hero, Preview, Zeit/Material, Ablauf, Einkauf, Proof, FAQ). Erst 5 Motto-Hubs der Welle-Beta-Pakete, dann inkrementell die anderen. | 30–60 Min/Page |
| B5 | ⏳ | **P2** | P5-14 | `[KERN]` **Affiliate-Komplettkorb-Box** pro Motto (kuratierte Einkaufsbox: Deko + Mitgebsel + Bastel + Druckpapier; Amazon-PartnerNet `machsleicht21-21`; später Awin Otto/myToys) | 15–30 Min/Motto |

**Welle-Beta-Aufwand:** ~25–40 Arbeitstage = 6–10 Wochen bei 6–8h/Woche.

#### Welle Gamma (3+ Monate) — NUR wenn Welle Beta skaliert

**Trigger:** Welle-Beta-Pakete generieren ≥ 30 Käufe/Monat insgesamt.

| # | Status | Prio | Ticket | Kurzbeschreibung | Aufwand |
|---|--------|------|--------|------------------|---------|
| G1 | ⏳ | **P3** | P5-15 | `[KERN]` **Pro-Schatzsuche** (19.90–24.90€): alle Komplettpaket-Inhalte + Story-Audio-Voiceover (KI-generiert, gecacht) + Indoor/Outdoor-Variante + 3 Schwierigkeitsstufen + Teamkarten + Bonusrätsel | 2 Wochen pro Motto |
| G2 | ⏳ | **P3** | P5-16 | `[KERN]` **Bundle-Logik** Komplettparty (24.90–34.90€): Motto-Paket + Partyseite-Plus + Affiliate-Korb-Discount + Bonusdrucke. AOV-Steigerung. | 3–5 Tage |
| G3 | ⏳ | **P3** | P5-17 | `[KERN]` **48h-Notfall-PDF** (7.90€): 1 Notfall-Zeitplan, Discounter-Einkaufsliste, 3 Sofortspiele, Einladungstext, einfache Schatzsuche, Druckcheckliste. Impulskauf-Produkt. | 1 Woche |
| G4 | ⏳ | **P3** | P5-18 | `[KERN]` **Schema.org Product/BreadcrumbList überall** auf Shop-Seiten (FAQ-Markup als Convenience, NICHT als CTR-Hack — Google zeigt FAQ-Rich-Results 2026 fast nur noch für gov/health) | 1 Tag |
| G5 | ⏳ | **P4** | P5-19 | `[ZUKUNFT]` **White-Label B2B** (Indoor-Spielplätze, Bauernhof-Cafés): 39–149€/Monat je Partner, RSVP + Slots + Zusatzleistungen + Geschenkoptionen | 4–8 Wochen Pilot |
| G6 | ⏳ | **P4** | P5-20 | `[ZUKUNFT]` **Mini-Video-Teaser für Einladungen** (anymator-Konkurrenz: 0€ mit Branding / 2.99€ ohne Logo). Viraler Hook gegen statische JPG-Einladungen. | 2–3 Wochen |
| G7 | ⏳ | **P1** ⬆️ | P6-1 | `[KERN]` **Einladungs-Architektur SEO-Refactor — HOCHGESTUFT 08.06.2026 (Bolle) von P3/Gamma auf P1/nächste-Prio, siehe Zeile 0b.** Verifiziert 08.06. via HTML-Parser: alle 16 einladung-Seiten = JS-Shells mit 4–5 server-gerenderten Wörtern, 10 in sitemap.xml. Aktueller Stand kritisch: `/einladung/<motto>/` ist 1800-Zeilen-React-App ohne SEO-Content + hardcoded Demo-Name "Mia" (vorher "Emilia"). Soll-Architektur: (a) `/einladung` Top-Hub mit Ratgeber-Anteil, (b) `/einladung/<motto>` als SEO-Hub (Hero+Preview+FAQ+Verlinkung zu Varianten), (c) Apps wandern unter `/einladung/<motto>/whatsapp`, (d) NEU `/einladung/<motto>/druck` Print-PDF, (e) NEU `/einladung/<motto>/vorlagen` Text-Vorlagen. Robots: Hubs `index,follow`, Apps `noindex`. Print-Variante als Premium-Pricing-Spur in Welle Beta integrierbar. | 2–3 Tage Architektur + 1 Tag pro Motto Refactor |

#### Was aus den Reviews EXPLIZIT gestrichen wurde

- **Programmatische Massen-SEO** (Motto×Alter×Franchise) → beide Reviews + Google's Helpful-Content-Guidance: scaled content abuse Risiko, vermeiden
- **„Altershubs 6/7/8 Jahre"** als Review-Vorschlag → wurde in Welle 33-A bewusst entfernt (172→95 URLs), wird NICHT zurückgebaut
- **Lemon Squeezy als „bereits aktiv"** → war Review-Halluzination, Lemon Squeezy ist optional A4-Provider-Kandidat, nicht aktiv
- **„9 Mottos / 81 Spielideen"** in Review-Tabellen → veraltet, aktueller Stand: 13 Mottos, > 150 Spielideen

---

### 🎯 P7 — Funnel-First Re-Architecture (NEU, Sprint nach Welle Alpha)

**Quelle:** Bolles Funnel-First-Vision (28.05.2026 abends) + Helfer-v3-Review-Befund 29.05.2026: 4 verschiedene Motto-Listen auf live drift (Planer 10 mit Dschungel/Feen, Einladung 10 mit Superheld/Prinzessin, Schatzsuche 12 mit Pferde/Ritter/Baustelle, Partyseite 10 mit Eigenes-Option) → das Tooling ist konzeptuell separate Inseln. Wizard-Vision löst dies durch eine Plan-Preview-First-Architektur mit 6 Stages.

**Validierung:** 4 Prototyp-Iterationen (v1 → v5) in `_dev/prototypes/wizard-v5-live-aligned.html` — End-to-End klickbar mit 15 Mottos, Auto-Save, Magic-Link-Resume, Custom-Timeline-Entries, Einladungs-Live-Editor, Partyseite-Konfigurator, Conversion-Block. Konzept-Doc: `_dev/handoff/2026-05-29-wizard-funnel-plan.md`.

**Architektur-Entscheidungen (D1-D8 aus Konzept-Doc):**

| ID | Entscheidung | Status |
|---|---|---|
| **D1** Wizard-Sequenz | 6 Stages: Motto → Alter → Plan-Preview+Wizard → Einladung-Editor → Partyseite-Editor → Fertig+Conversion. Plan-Preview-First (Beispiel-Plan VOR Wizard-Fragen) | ✅ ENTSCHIEDEN via v5-Prototyp |
| **D2** Tech-Architektur | **Hybrid:** Wizard auf `/wizard` als neue Default-Funnel-Route von Homepage; bestehende Tools (`/kindergeburtstag`, `/einladung/erstellen`, `/schatzsuche`, `party.machsleicht.de`) bleiben als Power-User-Routes + SEO-Hub-Entries | 📋 ENTSCHIEDEN — Begründung: keine Migration-Risiko für 4.700 bestehende User, SEO-Hubs bleiben Entry-Points, neue User kommen via Hero-CTA in Wizard |
| **D3** State-Persistenz | localStorage default + Magic-Link-Email als optionaler Save-Later (nur wenn User Email eingibt) — Hybrid wie Prototyp | ✅ ENTSCHIEDEN |
| **D4** Smart-Defaults | Datum nächster Samstag in 4 Wochen, Gäste 6, Ort zuhause, Spiele 5 vorausgewählt (alters-passend), Einladungs-Typ Mini-Spiel default | ✅ ENTSCHIEDEN |
| **D5** Multi-Touch-Monetisierung | Welle Alpha: nur 1 SKU (Komplettpaket €14,90) — Mini-SKUs Basic/Pro erst Welle Beta nach ≥3 Käufen Validation | 📋 ENTSCHIEDEN — verschoben auf Beta |
| **D6** Print-Pipeline | Welle Alpha: statisch in Canva designed (1-2 Tage pro Motto, 5-7 Killer-Seiten Pilot). Welle Beta: dynamisch via Playwright HTML→PDF mit Wizard-State eingesetzt | ✅ ENTSCHIEDEN |
| **D7** Migration | P6-1 Einladungs-Refactor wird Teil von P7-1c (Einladung-Stage). P3-S4/S5/S6/S7 (Vorbereitungskarte/Einkaufsliste/SOS/KI-Rätsel) werden Plan-Stage-Module statt einzelne Pages | ✅ ENTSCHIEDEN |
| **D8** Welle-Alpha-Relation | **Parallel** — Welle Alpha A1-A9 Pilot auf Piraten-6-8 MIT Wizard-Variante gleichzeitig bauen. „Plan-Preview-First + 1 SKU" zugleich validieren | ✅ ENTSCHIEDEN |

#### P7-0 Pre-Requisite (BLOCKER) — Motto-Single-Source-of-Truth

| # | Status | Prio | Ticket | Kurzbeschreibung | Aufwand |
|---|--------|------|--------|------------------|---------|
| 7-0 | ⏳ | **P1** | P7-0 | `[KERN]` **Master-Motto-Liste konsolidieren** — Aktuell drift live: Planer 10, Einladung 10, Schatzsuche 12, Partyseite 10 mit Überschneidungen. NEUE `js/theme-registry.js` als Single Source of Truth — alle 4 Tools importieren von dort. Vereinigungsmenge live = 13 Mottos: Piraten, Detektiv, Einhorn, Safari, Feuerwehr, Weltraum, Superheld, Prinzessin, Meerjungfrau, Dino, Dschungel, Feen, Pferde, Ritter, Baustelle (15 wenn Pferde/Ritter/Baustelle vollendet, Status Task #21). Bei Inkonsistenz: jedes Tool legt Whitelist-Filter über (z.B. „Wunschliste-Premium nur für Mottos mit fertiger Schatzsuche") | 4–6 Std |

#### P7-1 bis P7-6 Wizard-Implementation (nach P7-0)

| # | Status | Prio | Ticket | Kurzbeschreibung | Aufwand |
|---|--------|------|--------|------------------|---------|
| 7-1 | ⏳ | **P1** | P7-1 | `[KERN]` **`/wizard` Route + Stage 1+2** (Motto-Picker + Alter-Picker) — basierend auf v5-Prototyp. React-App parallel zu Planer. Mottos aus P7-0-theme-registry | 3–5 Tage |
| 7-2 | ⏳ | **P1** | P7-2 | `[KERN]` **Stage 3 Plan-Preview + 5-Frage-Wizard** (Name/Datum+Uhrzeit/Gäste/Ort/Spiele-Multi) + Custom-Timeline-Entries. Plan-Preview rendert live je Smart-Defaults dann Wizard-State | 4–6 Tage |
| 7-3 | ⏳ | **P1** | P7-3 | `[KERN]` **Stage 4 Einladung-Editor inline** im Wizard-Flow — 3 Typen (Mini-Spiel/Karte/Print) · Foto-Upload max 500KB · WhatsApp-Nummer für RSVP · Live-Phone-Preview · echte wa.me/mailto-URLs · Versand-Tracking | 3–4 Tage (ersetzt Teile von P6-1) |
| 7-4 | ⏳ | **P2** | P7-4 | `[KERN]` **Stage 5 Partyseite-Editor** als Wrapper um Cloudflare-Worker — URL-Builder, Feature-Toggles (RSVP/Photos/Wish/Chat), Aktivierungs-Flow. Worker bekommt Wizard-State-Bridge | 2–3 Tage |
| 7-5 | ⏳ | **P1** | P7-5 | `[KERN]` **Stage 6 Conversion + Save-Later** — 3 Karten (Plan online/PDF light/Komplettpaket €14,90), Stripe-Checkout-Integration (verbindet sich mit Welle Alpha P5-4), Magic-Link-Email via Resend-Worker | 2 Tage |
| 7-6 | ⏳ | **P2** | P7-6 | `[KERN]` **Async-Persistenz** — localStorage default, Magic-Link-API für Cross-Device-Resume (Worker-KV), Resume-Banner-UI | 2–3 Tage |
| 7-7 | ⏳ | **P2** | P7-7 | `[KERN]` **Homepage-Hero auf Wizard** umstellen — neuer Primary-CTA „Plan in 60 Sek starten →" zu `/wizard`, Planer-Link als Sekundär-Pfad sichtbar | 1 Tag |

**Welle-7-Gesamt-Aufwand:** ~18–25 Tage = 4–6 Wochen bei 5 Std/Tag · parallel zu Welle Alpha · Validation-Gate identisch zu Welle Alpha (≥3 Käufe in 3 Wochen)

**Killer-Risiko:** Wenn P7 baut aber niemand kauft, haben wir 4 Wochen in Architektur investiert ohne Demand-Beweis. **Deshalb D8 = parallel:** Welle Alpha läuft mit Bestand-Planer-+ Wizard-Variante als A/B-Test. Wenn Wizard nicht konvertiert, ist P7 ein Cut-Kandidat.

#### A/B-Tests die nach Welle Alpha sinnvoll wären (Welle Beta Begleitung)

| Test | Variante A | Variante B | Primäre KPI |
|---|---|---|---|
| Hero-Mechanik Home | „Kostenlos in 10 Minuten" | „Plan gratis, Drucke fertig dazu" | Tool-Start-Rate |
| Pricing Anchor | „14,90 €" | „14,90 € statt 19,90 €" Durchstreichpreis | Checkout-Conversion |
| Produktseite | Textliste Lieferumfang | 6-seitige PDF-Preview-Stack | Add-to-cart |
| CTA-Anzahl Hero | 1 CTA | 3 CTAs | Tool-Start-Rate |
| Funnel-Reihenfolge | Tools nebeneinander | Plan → Einladung+Schatz → Partyseite | Multi-Tool-Nutzung |


### Mittelfristig (Mai–Juli)

| # | Status | Prio | Ticket | Kurzbeschreibung | Aufwand | Kontext |
|---|--------|------|--------|------------------|---------|---------|
| 16 | ⏳ | **P2** | P2-17 | `[KERN]` **Standalone /wunschliste** | 2–3 Tage | Launch bis 30.06. für Weihnachts-Peak |
| 17 | ⏳ | **P2** | P2-10 | `[KERN]` Einladungstool: 7 fehlende Lizenz-Mottos | 2–3 Std | Voraussetzung für P1-9 |
| 18 | ⏳ | **P2** | P1-9 (→P2) | `[KERN]` /einladung als SEO-Hub | 3–4 Std | Braucht P2-10 zuerst |
| 19 | ⏳ | **P2** | P1-11 (→P2) | `[KERN]` Ratgeber-Seiten auf 85% (11 verbleibend) | 30–60 Min/Seite | Evergreen, kontinuierlich |
| 20 | ✅ | **P2** | P2-2 | `[KERN]` Thin Content Motto×Altersgruppen (138 Seiten → 301-Redirects) | 2–4 Std | Erledigt 19.04.2026 |
| 21 | ⏳ | **P2** | P2-16 | `[KERN]` Mitgebsel-Generator (KI) | 1 Tag | Braucht P1-10 |
| 22 | ⏳ | **P2** | P2-5 | `[KERN]` Performance (JS-Bundle, lazy loading) | 15 Min kurzfristig, 2–4h langfristig | Laufend |
| 23 | ⏳ | **P2** | P2-8 | `[LEGACY]` /kreuzwortraetsel pre-rendern | 1–2 Std | SEO-Nachzügler |
| 24 | ⏳ | **P2** | P2-21 | `[KERN]` Seiten-Rollen-Matrix | 1 Tag | Nach P1-11 sinnvoll |
| 25 | ⏳ | **P2** | P2-22 | `[KERN]` **Site-Wide In-App-Frame** (Modal-Pattern seitenweit) | 1–2 Tage | Retention: kein Tab-Verlust bei Vorschauen & Affiliates |
| 26 | ⏳ | **P2** | P1-8b | `[LEGACY]` **Content-Inseln-Strategie** (Pferde, Ritter, Zirkus, Baustelle — entweder integrieren oder streichen) | 15 Min Daten-Check + 1–16 Std Umsetzung | GSC-Daten abwarten, vor weiterem Content-Ausbau entscheiden |
| 26b | 🔄 | **P2** | P2-23 | `[KERN]` **Planer-Output auf Elite-Niveau heben** (muss inhaltlich der Tiefe der Motto-Seiten standhalten — Druckvorlagen, kuratierte Spielanleitungen, Zeitplan mit Story-Anker) | siehe Sprint | **Realisierung über Planer-Frisur-Sprint (S0–S7).** Sprint geplant 11.05.2026, ~7–9 Arbeitstage. P2-23 gilt als erfüllt nach Abschluss von P3-13 bis P3-19. |
| 26c | ⏳ | **P3** | P2-24 | `[KERN]` **Eingewebte Leckerli-CTAs auf Motto-Seiten** (kontextuelle Mini-CTAs an Story-Anchorpunkten statt nur End-CTA) | 30 Min/Motto | **Phase 2 nach P2-23.** Trigger: wenn Planer-Output Elite-Niveau hat. Test-Hypothese: Mini-CTAs in Story-Flow konvertieren 3–5× besser als End-CTAs (Forschungsstand 2025). Erste Test-Runde auf 3 Mottos, dann auf alle ausrollen falls Conversion-Lift messbar |

### Vor dem Herbst-Peak (Juli–September)

| # | Status | Prio | Ticket | Kurzbeschreibung | Aufwand | Deadline |
|---|--------|------|--------|------------------|---------|---------|
| 27 | ⏳ | **P1** | P1-13 | `[ZUKUNFT]` **Adventskalender-Builder** (24 KI-Türchen) | 3–4 Tage | **Launch bis 31.08.** |
| 28 | ⏳ | **P1** | P1-14 | `[ZUKUNFT]` **KI-Geschenkeberater** | 2–3 Tage | **Launch bis 30.09.** |
| 29 | ⏳ | **P3** | P3-6 | `[ZUKUNFT]` **machsruhig.de launchen** | 2–3 Wochen Sprint | Eigener Sprint, separates Doc. **Pre-Launch Email-Setup PFLICHT:** (a) Resend-Domain-Verification für machsruhig.de in Resend-Dashboard, (b) DKIM-CNAMEs ins Cloudflare DNS, (c) SPF-Eintrag erweitern auf `v=spf1 include:_spf.resend.com include:spf.migadu.com -all`. DMARC ist auf machsruhig schon `quarantine/reject` aktiv — heißt Mails von Resend werden GARANTIERT blockiert wenn (a)-(c) nicht alle erledigt sind. Verifikation per mxtoolbox vor Mail-Versand. |

### Später (Q4 2026 und Q1 2027)

| # | Status | Prio | Ticket | Kurzbeschreibung | Aufwand | Kontext |
|---|--------|------|--------|------------------|---------|---------|
| 30 | ⏳ | **P3** | P3-5 | E-Mail-Liste aufsetzen (Resend Audience + Nurture) | 1 Tag | Verwertung von P1-15-Opt-Ins |
| 31 | ⏳ | **P3** | P3-3 | Social Proof aus Plausible (echter Counter) | variabel | Nach 3 Monaten GSC-Daten |
| 32 | ⏳ | **P3** | P3-4 | Druckvorlagen pro Motto (Top 5) | 30 Min/Motto | Parallel zu P1-8 |
| 33 | ⏳ | **P3** | P3-7 | Klassen-Geburtstagskalender | 3 Tage | Braucht P2-17 |
| 34 | ⏳ | **P3** | P3-8 | Nachbar-Nachricht-Generator | 4 Std | Quick-Win |
| 35 | ⏳ | **P3** | P3-9 | Foto-Spots/Photobooth-Backdrops | 6 Std | Parallel zu P1-8 |
| 36 | ⏳ | **P3** | P3-10 | Urkunden/Diplome | 6 Std | Nach P3-5 |
| 37 | ⏳ | **P3** | P3-1 | Repo aufräumen | 10–30 Min | Quick-Win jederzeit |
| 38 | ⏳ | **P3** | P3-11 | **Pinterest-Präsenz** | 4h Setup + 1–2h/Woche | **Geparkt**: Trigger bei 5.000+ Besuchern/Monat |
| 39 | ⏳ | **P4** | P4-1 | PDF-Partybücher pro Motto | 1 Tag/Motto | Wenn Traffic da ist |
| 40 | ⏳ | **P4** | P4-2 | Premium-Features (KI-Spielleiter, Audio, etc.) | mehrere Wochen | Wenn Traffic da ist |

### Gestrichen / Erledigt

| Status | Ticket | Kurzbeschreibung |
|--------|--------|------------------|
| ❌ | P1-1 | ~~/schatzsuche als eigene Seite~~ — **GESTRICHEN** (Memory #17: bleibt Redirect) |
| ❌ | P1-2 | ~~/schnitzeljagd als eigene Seite~~ — **GESTRICHEN** (gleicher Grund) |
| ✅ | P0-2 | "0 Spiele"-Bug in Titles |
| ✅ | P0-3 | Duplicate Titles auf Motto-Hauptseiten |
| ✅ | P0-4 | /_dev/ aus öffentlichem Zugriff sperren |
| ✅ | P1-3 | 9 Einladungs-Themenseiten — Canonical-Tags |
| ✅ | P1-4 | Einladungs-Tool: Default-Motto neutralisieren |
| ✅ | P1-6 | Schema.org Markup (Breadcrumbs 18/18, FAQPages 13/18, HowTo 6/18) |
| ✅ | P2-6 | Encoding-Inkonsistenz in Title-Tags (Elite-Seiten normalisiert) |
| ✅ | P2-11 | Interne Links broken/zirkulär auf Ratgeber-Seiten |
| ✅ | P2-14 | Affiliate-Sweep auf 16 Ratgeber-Seiten |
| ✅ | P2-18 | Vergleichs-Tabellen statt Einzel-Affiliate-Links |
| ⚠️ | P3-2 | Amazon Affiliate Tag setzen (**Fix 16.04. ging FALSCH** — `machsleicht-21` war falsch, korrekt ist `machsleicht21-21`. Am 26.05.2026 zurückgedreht, 2234 Vorkommen) |
| ✅ | P0-5 | GitHub Token rotieren (neuer PAT ohne Ablaufdatum) |
| ✅ | P0-1 | GSC eingerichtet + bereinigte Sitemap (223 URLs) eingereicht |
| ✅ | P1-10 | Cloudflare Worker deployed (party.machsleicht.de live) |
| ✅ | P2-1 | Homepage-Hero: 1 Primary CTA + 2 Textlinks (Funnel-Axiom) |
| ✅ | P2-19 | Doppelte class-Attribute: 5 Patterns, ~1600 Stellen in 317+256 Dateien |
| ✅ | P2-2 | Thin Content: 138 Single-Age-Seiten per 301 auf Gruppen-Seiten |
| ✅ | P1-7 | Social Proof: Trust-Zeile im Hero (Von Eltern entwickelt · 17 Mottos · Ohne Anmeldung) |
| ✅ | P2-3 | Ergebnis-Vorschauen: 4 Demo-Cards auf Homepage (Plan, Schatzkarte, Einladung, Partyseite) + Partyseite auf LIVE gesetzt |

---

### Änderungen gegenüber 16.04.2026-Tabelle

**Prio-Hochstufungen:**
- P1-5 → **P0-5** (Token-Deadline, war inkonsistent als P0 markiert aber P1-nummeriert)
- P2-1 → **P1** (Hero-Funnel, finalisierte Entscheidung, großer Hebel)
- P2-19 → **P1** (HTML-Bug, echter Bug auf 300 Dateien, 30-Min-Fix)
- P2-3 → **P1** (Ergebnis-Vorschauen, Audit-Kernbefund „Demo vor Copy")

**Prio-Runterstufungen:**
- P1-9 → **P2** (hat harte Dependency auf P2-10, nicht zeitkritisch)
- P1-11 → **P2** (Ratgeber auf 85 %, evergreen ohne Deadline, kontinuierliche Arbeit)

**Begründung:** P1 ist reserviert für Dinge mit harten Deadlines, Dependency-Freischaltern oder sofortigem Revenue-Impact. Alles andere wandert auf P2 — ohne Bedeutungsverlust, nur klarere Priorisierung.

### Änderungen 23.04.2026

- **P1-16 auf ✅ VOLLSTÄNDIG ERLEDIGT** — guestView cleanup, reply_to-Code, Foto-Crop Mobile-Fix (3 Bugs), Beteiligen-custom-amount inkl. Editor-Display in Chat-Session gebaut. Cloudflare-Deploy live. Migadu-Setup für machsleicht.de + machsruhig.de am 26.05.2026 abgeschlossen.
- **P1-20 neu** (Internal-Linking-Fix) — ausgegliedert aus P1-16 Sub-Task 8. Quick-Win: Superheld hat 0 eingehende Links, Prinzessin 2 — Tool-Mottos werden im Netz nicht eingefangen.
- **P1-21 neu** (Kill-List-Entscheidung) — ausgegliedert aus P1-16 Sub-Task 8. Absorbiert P1-8b + zusätzlich 8 Marken-Mottos. Wartet auf GSC-Daten.

---

## ✅ ERLEDIGT (Evidenz im Repo geprüft)

### P0-2: "0 Spiele"-Bug in Title-Tags — FIXED
- **Check:** `grep -l '0 Spiele' kindergeburtstag/*.html` → 0 Treffer
- 16 Motto×Altersgruppen-Seiten hatten "0 Spiele" im Title — alle korrigiert.

### P0-3: Duplicate Titles (3–5–12 Jahre) — FIXED
- **Check:** 0 Treffer in dino/einhorn/weltraum/safari/feuerwehr.html
- Titles haben jetzt sauberen Alters-Range.

### P0-4: /_dev/ gesperrt — FIXED
- `robots.txt` enthält `Disallow: /_dev/`, `/_build/`, `/_src/`
- `/_headers` vorhanden (X-Robots-Tag noindex für Dev-Ordner)
- `.netlifyignore` vorhanden

### P1-3: Einladungs-Canonicals — FIXED
- Alle 9 Einladungs-Themenseiten haben `rel="canonical"` (dino, einhorn, safari, feuerwehr, detektiv, prinzessin, weltraum, meerjungfrau, superheld).

### P1-6: Schema.org Markup — GRÖSSTENTEILS FIXED
- **BreadcrumbList:** auf **95 Seiten** verteilt (19 Motto-Hauptseiten, 18 Ratgeber, 8 Schatzsuche-Themen, 13 Checklisten, 8 Guides, 9 Einladungs-Themen + Hub, 5 Planer-Hauptseiten, 9 Ratgeber-Unterseiten, 4 Schatzsuche-Varianten)
- **FAQPage:** 13 von 18 Ratgeber-Seiten haben FAQ-Schemas
- **HowTo:** 6 von 18 Ratgeber-Seiten haben HowTo-Schemas
- Offen: 5 Ratgeber-Seiten ohne FAQ, 12 ohne HowTo (siehe P1-11)

### P2-6: Encoding-Normalisierung — FIXED auf Elite-Seiten
- 193 HTML-Entities (&mdash;, &ndash;) auf 4 Elite-Seiten (Dino 3-5/6-8/9-12, Piraten 6-8) zu UTF-8 normalisiert.
- Neue Elite-Seiten übernehmen UTF-8 automatisch.

### P2-11: Interne Links auf Ratgebern — FIXED
- 26 CTA-Links auf 12 Ratgeber-Seiten von `href="/"` zu `/kindergeburtstag#planer` umgestellt.
- 14 Ratgeber-Seiten linken jetzt auf `#planer`.

### P3-2: Amazon Affiliate Tag — FIXED (16.04.2026)
- **Vorher (16.04.):** 566× Tag `machsleicht21-21` + 230× Tag `machsleicht-21`
- **Nachher (16.04.):** 796× einheitlich `machsleicht-21` verteilt auf 16 Dateien
- **⚠️ KORREKTUR 26.05.2026:** Der Fix vom 16.04. ging in die FALSCHE Richtung. Per Amazon-PartnerNet-Screenshot verifiziert: korrekte Tracking-ID ist `machsleicht21-21`, nicht `machsleicht-21`. Am 26.05. erneut gefixt: 2234 Vorkommen zurückgedreht auf `machsleicht21-21`. Affiliate-Klicks zwischen 16.04. und 26.05.2026 waren UNTRACKED (kein Revenue).
- Source-Files (_src/kindergeburtstag.jsx + data.js) auch gefixt, damit künftige Builds nicht regressieren.

### Deep SEO Ratgeber-Seiten (nicht-numerierter Sprint) — FIXED
- **8 Ratgeber-Seiten** mit FAQPage/HowTo Schema versehen: zeitplan, essen, kosten, mitgebsel, drinnen, draussen, last-minute, zuhause
- **2 schwächste Seiten** auf ~85% gehoben: torte-einfach (Recipe-Schema + Affiliate + CTA), spiele-drinnen (ItemList 15 Spiele + Affiliate + CTA)
- Details in SESSION-NOTES.md

---

## ❌ GESTRICHEN

### P1-1: ~~/schatzsuche als eigenständige Seite~~
**Grund:** Architektur-Entscheidung in Memory #17 — `/schatzsuche` und `/schnitzeljagd` bleiben **bewusst** Redirects auf `/kindergeburtstag?modus=schatzsuche#planer`. Die Schatzsuche ist ein Modus im Planer, nicht ein eigenständiges Tool. SEO-Content liegt auf den Themen-Landingpages (`/schatzsuche-kindergeburtstag`, `/schatzsuche-drinnen`, `/schatzsuche-draussen` sowie den 8 Themen-Seiten `/schatzsuche/detektiv` etc.), die den Funnel füttern.

### P1-2: ~~/schnitzeljagd als eigenständige Seite~~
**Grund:** Gleicher wie P1-1. Bleibt Redirect.

---

## ⏳ OFFEN

### P0 — SOFORT

#### P0-1: Google Search Console einrichten
- GSC-Property `https://machsleicht.de` anlegen, via DNS-TXT verifizieren, Sitemap einreichen.
- Die 10 wichtigsten Seiten einzeln zur Indexierung anmelden.
- **Aufwand:** 20 Minuten
- **Wirkung:** Ohne GSC sind alle SEO-Maßnahmen wirkungslos.
- **Nicht im Repo prüfbar — Status nur vom User bestätigbar.**

#### P0-5 (ex P1-5): GitHub PAT rotieren
- Token `ghp_V12E...` läuft am **25.04.2026** ab — noch **6 Tage!**
- Neu generieren (Scope `repo`, 90 Tage), in git-sync Skill eintragen, alten widerrufen.
- **Aufwand:** 5 Min.

### P1 — DIESE WOCHE

#### P1-7: Social Proof auf Homepage und Planer-Seite
- "Über 4.700 Geburtstage geplant" steht nur auf Piraten-Seite.
- Plausible-Daten auswerten für echten Counter (brauche Zugriff).
- **Aufwand:** 1 Stunde.

#### P1-8: Motto-Hauptseiten auf Elite-Niveau

**Motivation:** Pro Motto existieren 3 Altersgruppen-Landingpages (`-3-5-jahre`, `-6-8-jahre`, `-9-12-jahre`). Dino und Piraten sind bereits Elite-ausgebaut (jeweils ~60 KB pro Seite), alle anderen Mottos liegen noch bei ~16–19 KB. Ziel ist, die markenfreien Mottos Schritt für Schritt auf Elite-Niveau zu heben — **aber nur jene, die auch im Tool-Ökosystem (Einladung + Schatzsuche) vertreten sind**. Content-Inseln ohne Tool-Anschluss bringen keinen Conversion-Wert, werden in P1-8 bewusst ausgeklammert und separat behandelt (siehe P1-8b unten).

**Ökosystem-Matrix (21.04.2026):**

| Motto | IP-Status | Main | Altersgr. | Einladung | Schatzsuche | Ausbau-Stufe |
|-------|-----------|------|-----------|-----------|-------------|--------------|
| Dino | markenfrei | ✅ | ✅ | ✅ | ✅ | ✅ Elite (Template, ~63 KB) |
| Piraten | markenfrei | ✅ | ✅ | ✅ | ✅ | ✅ Elite (~56 KB) |
| Einhorn | markenfrei | ✅ | ✅ | ✅ | ✅ | Standard (~19 KB) — **nächstes Ziel** |
| Safari | markenfrei | ✅ | ✅ | ✅ | ✅ | Standard (~19 KB) |
| Feuerwehr | markenfrei | ✅ | ✅ | ✅ | — | Standard (~19 KB) |
| Weltraum | markenfrei | ✅ | ✅ | ✅ | ✅ | Standard (~19 KB) |
| Detektiv | markenfrei | ✅ | ✅ | ✅ | ✅ | Dünn (~16 KB) |
| Meerjungfrau | markenfrei | ✅ | ✅ | ✅ | — | Dünn (~16 KB) |
| Prinzessin | markenfrei | ✅ | ⚠️ fehlt | ✅ | — | Altersgruppen-Lücke |
| Superheld | markenfrei | ✅ | ⚠️ fehlt | ✅ | — | Altersgruppen-Lücke |
| **Baustelle** | markenfrei | ✅ | ✅ | — | — | **Content-Insel → P1-8b** |
| **Pferde** | markenfrei | ✅ | ✅ | — | — | **Content-Insel → P1-8b** |
| **Ritter** | markenfrei | ✅ | ✅ | — | — | **Content-Insel → P1-8b** |
| **Zirkus** | markenfrei | ✅ | ✅ | — | — | **Content-Insel → P1-8b** |
| Paw Patrol | Spin Master IP | ✅ | ✅ | — | — | Zurückgestellt (IP + Insel) |
| Frozen | Disney IP | ✅ | ✅ | — | — | Zurückgestellt |
| Pokemon | Nintendo IP | ✅ | ✅ | — | — | Zurückgestellt |
| Minecraft | Microsoft IP | ✅ | ✅ | — | — | Zurückgestellt |
| Ninjago | Lego IP | ✅ | ✅ | — | — | Zurückgestellt |

**Zusätzliche Schatzsuche-Mottos ohne /kindergeburtstag/-Pendant:** Dschungel, Feen (eigene Schatzsuche-Seiten, aber keine Altersgruppen-Seiten unter `/kindergeburtstag/`). Für spätere Einordnung geparkt.

**Entscheidung 21.04.2026 (Teil 4):**
→ **Einhorn** als nächstes Elite-Motto. Paw Patrol zurückgestellt (IP-Risiko, Zielgruppe eng, Content-Insel).
→ **Content-Inseln (Pferde, Ritter, Zirkus, Baustelle) aus P1-8 ausgeklammert.** Sinnloser Elite-Ausbau solange der User nirgendwo weiterklicken kann. Separates Mini-PBI P1-8b (siehe unten).

**Reihenfolge P1-8 (nur Tool-integrierte markenfreie Mottos):**

1. **Einhorn** ✅ erledigt
2. **Safari** — 6-8 ✅ erledigt, 3-5 + 9-12 in Arbeit (parallele Sessions)
3. **Feuerwehr** ✅ **erledigt 28.04.2026 (alle 3 Altersgruppen Elite, parallel zu Safari)** — Story-Doc `_dev/docs/feuerwehr-story.md`. Brandermittlung als Multi-Verdächtigen-Krimi mit Plot-Twist (Wow 9-12), Helm-Bemalen als Wow-Anker (3-5), 12 Dienstausweise konsequent in Anleitungen verankert (6-8). Gesamtgrößen: 82/101/97 KB. *Hinweis:* Feuerwehr hat keine Schatzsuche, aber Einladung vorhanden — Sticky-Bar entsprechend ohne Schatzsuche-Link
4. **Weltraum** (Standard → Elite) — altersübergreifend, nächstes
5. **Detektiv** (Dünn → Elite)
6. **Meerjungfrau** (Dünn → Elite) — *Hinweis:* keine Schatzsuche
7. **Prinzessin + Superheld** — Altersgruppen-Seiten komplett neu anlegen (eigenständiges Sub-Task, ~6 Std pro Motto inkl. 3 neue Seiten)

**Vorgehen pro Motto:**
1. Story-Framing (Leitnarrativ für alle 3 Altersgruppen) — 30 Min
2. **6-8-Jahre zuerst** (Anker, wie bei Dino) — 1,5 Std
3. 3-5-Jahre — 1,5 Std
4. 9-12-Jahre — 1,5 Std
5. Main-Seite ggf. nachziehen, wenn noch dünn — 30 Min
- **Total pro Motto: ~4,5–5 Std Laptop-Session**

**Elite-Checkliste:** `_dev/docs/ELITE-SEITEN-TEMPLATE.md` (14 Punkte).

**Nachpflege aus früheren Sessions (Dino):** Dino 6-8 Header/Breadcrumb/Footer, Dino 3-5 CSS, Dino-Hauptseite Social Proof.

---

#### P1-8b: Content-Inseln-Strategie (Pferde, Ritter, Zirkus, Baustelle)

**Befund 21.04.2026:** Vier markenfreie Mottos existieren als `/kindergeburtstag/<motto>.html` + 3 Altersgruppen-Seiten + OG-Bild, sind aber **weder in `/einladung/` noch in `/schatzsuche/`** vertreten. Der User landet per SEO auf diesen Seiten und hat keinen Conversion-Pfad in die Tools.

**Optionen:**

- **A) Ökosystem-Integration:** Pro Motto eine Einladungs-Landing (2–3 Std) + optional Schatzsuche (+1 Std). Danach qualifiziert sich das Motto für P1-8 Elite-Ausbau. Gesamt pro Motto ~3–4 Std Integration + später 4,5 Std Elite = 7,5–8,5 Std.
- **B) Streichen (301 auf `/kindergeburtstag`):** Wenn Traffic laut GSC minimal ist, weg damit. Reduziert Index-Rauschen. Aufwand: 10 Min pro Motto (Redirects).
- **C) Status Quo belassen:** Wenn Traffic okay ist, aber Integration zu teuer. Risiko: User dropped off, Keyword-Cannibalization mit Planer-Hauptseite.

**Entscheidungs-Input nötig:** Google Search Console für diese 4 Mottos — Impressions/Klicks der letzten 90 Tage. Ohne diese Daten ist A/B/C nicht rational entscheidbar.

**Prio:** P2 — nicht dringend, aber vor jedem weiteren Content-Ausbau auf diesen Seiten klären (sonst verschwendete Elite-Arbeit).

**Aufwand:** Daten-Check 15 Min, Entscheidung + Umsetzung je nach Option 1–16 Std.

#### P1-9: /einladung als SEO-Hub
- Aktuell nur Tool-Hub ohne SEO-Content.
- Neue Landingpage mit Title/H1/Meta/Canonical/FAQ/17-Mottos-Grid/Ergebnis-Vorschau.
- **Abhängigkeit:** Braucht P2-10 (7 fehlende Mottos im Einladungstool) als Voraussetzung.
- **Aufwand:** 3–4 Stunden.

#### P1-10: Cloudflare Worker deployen (Partyseite + Rätsel nach Maß)
- **KRITISCH für Revenue.** party-worker.js v2 und Rätsel-nach-Maß-Worker sind technisch fertig, aber nicht deployed.
- Schritte:
  1. Cloudflare Worker anlegen, `party-worker.js` deployen
  2. KV Namespace "PARTY" erstellen und binden
  3. DNS: `party.machsleicht.de` → Worker
  4. Environment-Variables: `AMAZON_TAG=machsleicht21-21`, `AWIN_PUBLISHER_ID` (optional)
  5. Rätsel-nach-Maß-Endpoint freischalten
- **Aufwand:** 1 Laptop-Session, max 2h.
- **Revenue-Effekt:** +100–200€/Monat sofort.

#### P1-11: Ratgeber-Seiten auf 85%+ hochziehen (11 verbleibende)
Audit-Ranking nach Zufriedenheits-Score (schlechteste zuerst):

| Seite | Aktuell | Fehlt |
|-------|---------|-------|
| spiele-draussen | 61% | FAQ, ItemList, Affiliate, Planer-CTA |
| 7-jahre | 61% | FAQs ausbauen, Affiliate |
| bei-regen | 61% | Content verdoppeln (790 W.), FAQ, HowTo |
| wenig-aufwand | 62% | FAQ, HowTo |
| zuhause | 64% | Content verdoppeln (532 W.!), HowTo |
| einladung-text | 67% | FAQ, HowTo |
| mitgebsel | 70% | HowTo, Affiliate |
| last-minute | 71% | Content verdoppeln (355 W.!) |
| 5-jahre | 73% | FAQs ausbauen (nur 1!), HowTo |
| 6-jahre | 73% | FAQs ausbauen (nur 1!), HowTo, Affiliate |
| kosten | 76% | Affiliate |

**Befehl für Audit-Ranking:** `python3 _build/audit-all-ratgeber.py`
**Aufwand:** ~30-60 Min pro Seite.

#### P1-12: Einschulung SEO-Cluster  `[TEST]`

**Umformuliert 22.04.2026:** Ursprünglich als interaktiver Einschulungs-Planer geplant. Nach Portfolio-Matrix-Diskussion (STRATEGIE.md 0.9) umformuliert zu reinem SEO-Content-Cluster. Grund: Nachfrage noch nicht validiert, Planer-Bau (~12-18h) vor Validierung ist Produktrisiko. Upgrade zum Planer nur nach Traffic-Trigger.

**Motivation:** Einschulungen in Deutschland finden Ende August / Anfang September statt. Eltern suchen ab Ende Mai nach "Einschulung Feier planen", "Schultüte Inhalt", "Einschulungs-Geschenke". Keyword-Volumen saisonal hoch (bis 4.400/Monat auf Top-Keyword). **SEO-Seiten müssen spätestens Anfang Juni live**, damit Google sie bis Juli-August ranken kann.

**Was gebaut wird (Cluster-Version):**
- `/einschulung` als SEO-Hub mit H1, Meta, Canonical, OG, FAQ, BreadcrumbList JSON-LD (bereits teilweise vorhanden via `js/einschulung.js`, muss auf SEO-Hub-Niveau gebracht werden)
- 4 Themen-Landingpages mit FAQPage + HowTo Schema + Affiliate-Box:
  - `/einschulung-schultuete-inhalt`
  - `/einschulung-feier-planen`
  - `/einschulung-geschenke`
  - `/einschulung-ablauf`
- 1 Checklisten-Seite `/einschulung-checkliste` (HowTo-Schema mit 10–14 Steps) — existiert bereits, auf Elite-Niveau bringen
- Sitemap-Entries + interne Verlinkung
- CTA je Seite zurück zu: Kindergeburtstag-Planer, Wunschliste, Affiliate-Boxen

**Ausdrücklich NICHT gebaut in P1-12:**
- ❌ Kein interaktiver Einschulungs-Planer
- ❌ Keine eigene Planer-JSX
- ❌ Keine Homepage-Hauptbühne (bleibt Pill-Cloud „Weitere Planer & Tools")

**Upgrade-Trigger (für späteren Planer-Bau):** Wenn Einschulungs-Cluster im Juli 2026 ≥100 organische Visits/Woche auf Summe aller 6 Seiten erreicht, wird P1-12b „Einschulungs-Planer-Tool" aktiviert. Darunter bleibt Planer-Bau eingefroren (Legacy). Messung via Plausible + GSC.

**Content-Cluster (SEO-Keywords):**
| Seite | Keyword | Such-Volumen (geschätzt) |
|-------|---------|--------------------------|
| `/einschulung` | "Einschulung planen" | 1.900/Monat (saisonal) |
| `/einschulung-schultuete-inhalt` | "Schultüte Inhalt Ideen" | 4.400/Monat |
| `/einschulung-feier-planen` | "Einschulung Feier" | 1.600/Monat |
| `/einschulung-geschenke` | "Einschulungs-Geschenk" | 2.900/Monat |
| `/einschulung-ablauf` | "Einschulung Ablauf" | 720/Monat |
| `/einschulung-checkliste` | "Einschulung Checkliste" | 880/Monat |

**Affiliate-Potenzial:**
- Schultüten-Inhalt: hoher Amazon-Warenkorb (20–50€ pro Einkauf, 3% Provision = 0,60–1,50€ pro Verkauf)
- Geschenke-Seite: Durchschnitts-Geschenk 30–60€ (0,90–1,80€ Provision)

**Revenue-Projektion:**
- Jahr 1 (wenn ab Mai live, nur Cluster ohne Planer): ~150–300€ in Juli-September (primärer Peak)
- Jahr 2+: 400–800€/Jahr aus Einschulungs-Saison (Compound-Effekt)
- Plus eventuell Planer-Upgrade Revenue bei Trigger-Erfüllung

**Aufwand:** 1,5–2 Tage (ca. 10–14 Stunden) — **reduziert von ursprünglich 12–18h weil Planer-Tool entfällt**
- 3h: Hub-Seite /einschulung auf Elite-Niveau (aufbauend auf js/einschulung.js)
- 6h: 4 Themen-Seiten (Content schreiben, FAQ, HowTo, Affiliate-Boxen)
- 2h: Checklisten-Seite auf 85%+ Audit-Score
- 2h: Interne Verlinkung, Sitemap, Schemas, Validation, Tests

**Zeitplan:** **Launch spätestens 31.05.2026** (gibt Google 6–8 Wochen bis Peak)

**Abhängigkeiten:** Keine.

**Erfolgs-Kriterien:**
- Alle 6 Seiten haben Canonical, Schemas, Affiliate-Links
- `validate-all.sh` PASSED
- Mindestens 3 Seiten auf 85%+ im Audit-Score
- **Trigger-Messung einrichten:** Plausible-Goal "Einschulungs-Cluster Visits" aggregiert über alle 6 Seiten
- Mindestens 50 organische Besucher/Tag auf /einschulung-* im August 2026

---

#### P1-13: Adventskalender-Builder (24 KI-Türchen)

**Motivation:** "Adventskalender selber machen Kind" hat ~8.100 Suchen/Monat mit steilem Peak Oktober–Dezember. Aktuell beherrschen Pinterest-Aggregatoren und ein paar Blogs den Markt. **Kein Tool bietet einen KI-gestützten Adventskalender-Builder.** machsleicht hat bereits die Claude-API-Integration + Generator-Logik aus "Rätsel nach Maß" — das ist 80% der Arbeit wiederverwendbar.

**Was gebaut wird:**
- `/adventskalender` als Hub mit Tool-Einstieg
- `/adventskalender/erstellen` — Generator: Name, Alter, Interessen des Kindes → 24 Türchen-Inhalte (Rätsel, Bastelidee, Lied, Experiment, Geschichte)
- Output: druckbare PDF-Vorlage (24 Tütchen/Säckchen-Beschriftungen) + 24 einzelne Inhalt-Karten zum Einlegen
- 3 SEO-Landingpages: `/adventskalender-kinder`, `/adventskalender-fuellen-ideen`, `/adventskalender-basteln`

**Tech-Checkliste:**
- [ ] `adventskalender.jsx` — Form-Flow: 3 Schritte (Kind-Daten → Wünsche → Generieren)
- [ ] Claude-API-Call mit strukturiertem Prompt für 24 altersgerechte Türchen
- [ ] Prompt-Template bauen: "24 Adventskalender-Inhalte für {name}, {alter} Jahre, mag {interessen}. Mix aus: Rätsel, Bastelaufgabe, Bewegungsaufgabe, kleine Geschichte, Experiment. Jeder Eintrag max. 3 Sätze."
- [ ] PDF-Export: 24 einzelne Karten + 24 Tütchen-Labels (gleiches Design wie Schatzkarten-PDF)
- [ ] Credit-System (1 Generierung = 1,99€, 3er-Pack = 4,99€)
- [ ] 3 SEO-Landingpages mit FAQPage + HowTo-Schema + interne Links zum Tool

**Monetarisierung:**
- **VK 1,99€ Single / 4,99€ Familie (3 Kinder):** Cost ~15ct Claude + 5% Lemon Squeezy = Netto-Marge ~90%
- **Affiliate auf Ideen-Seiten:** Holz-Adventskalender zum Selberfüllen, Säckchen-Sets, Zahlen-Sticker (Amazon Warenkorb 15–40€)

**Content-Cluster:**
| Seite | Keyword | Suchvolumen |
|-------|---------|-------------|
| `/adventskalender` | "Adventskalender selber machen" | 8.100/Monat (saisonal Okt-Dez) |
| `/adventskalender-kinder` | "Adventskalender für Kinder" | 6.600/Monat |
| `/adventskalender-fuellen-ideen` | "Adventskalender füllen Ideen Kinder" | 3.600/Monat |
| `/adventskalender-basteln` | "Adventskalender basteln" | 4.400/Monat |

**Revenue-Projektion:**
- Dezember 2026 (erstes Jahr): 400–800€ im Monat (niedriger weil SEO noch jung)
- Dezember 2027: 1.500–3.000€ im Monat
- Ganzjährig sehr niedrig (Okt-Dez = 80% des Jahres-Revenues)

**Aufwand:** 3–4 Tage (18–24 Stunden)
- 8h: JSX-Tool, Form-Flow, State-Management
- 4h: Claude-API-Integration + Prompt-Tuning (viele Test-Generierungen)
- 4h: PDF-Export-Layout (24 Karten, druckbar)
- 4h: 3 SEO-Landingpages mit Content (je ~1500 Wörter) + Schemas
- 2h: Credit-System + Lemon Squeezy + Testing

**Zeitplan:** **Launch spätestens 31.08.2026** (3 Monate vor Peak für SEO-Ranking)

**Abhängigkeiten:**
- P1-10 (Cloudflare Worker): Rätsel-nach-Maß-Worker wird wiederverwendet
- Claude-API-Credit-System muss vorhanden sein

**Erfolgs-Kriterien:**
- 4 Seiten live mit Schemas
- Tool funktioniert End-to-End, 24 Türchen generiert
- PDF-Export druckt sauber auf A4 (24 Karten = 4 Seiten mit je 6 Karten)
- Ab Oktober 2026 messbare Conversion via Plausible

---

#### P1-14: KI-Geschenkeberater

**Motivation:** "Geschenk Junge 7 Jahre" = 4.400/Monat, "Geschenk Mädchen 10 Jahre" = 3.600/Monat, "Geschenkideen Kinder" = 22.000/Monat. Evergreen + starker Pre-Christmas-Peak November. Ideal für **direktes Affiliate-Revenue** — jeder Besucher landet auf Amazon/Otto/myToys.

**Was gebaut wird:**
- `/geschenkeberater` — simples Input-Tool: Alter, Geschlecht, Interessen, Budget
- Output: 5–8 konkrete Geschenkvorschläge mit Affiliate-Links, Preis, Kurzbeschreibung
- Dazu 6 SEO-Landingpages nach Alter: `/geschenke-kind-3-jahre`, `/geschenke-kind-5-jahre`, `/geschenke-kind-7-jahre`, `/geschenke-kind-10-jahre`, `/geschenke-junge`, `/geschenke-maedchen`
- Jede Landingpage: Top-10-Produktliste mit Vergleichstabelle + Affiliate-Links

**Tech-Checkliste:**
- [ ] `geschenkeberater.jsx` — Form: Alter-Dropdown, Geschlecht-Buttons, Interessen-Tags (Dino, Sport, Kunst, Tech, Bücher...), Budget-Slider
- [ ] Claude-API-Call: "Schlage 7 Geschenke für {geschlecht}, {alter} Jahre, mag {interessen}, Budget {budget}. Für jedes: Name, Amazon-Suchbegriff, Preis-Schätzung, 1 Satz Warum."
- [ ] Response-Parsing: Bau Amazon-Search-URLs mit `tag=machsleicht21-21`
- [ ] 6 statische Landingpages mit editorial Top-10-Listen (nicht KI-generiert — manuell kuratiert für Qualität)
- [ ] Top-10-Listen: jedes Produkt mit Screenshot, Bewertung, Preis, Pro/Contra, Affiliate-Link
- [ ] Vergleichstabellen ähnlich wie bei Test-Sites

**Monetarisierung:**
- **Reine Affiliate-Play.** Kein Payment, kein Premium.
- Warenkörbe: 15–60€ pro Kauf (Amazon: 3%, Otto via Awin: 8–10%)
- Erwarteter Lift: **bei 500 monatlichen Besuchern 30–80€/Monat Affiliate**. Skaliert linear mit Traffic.

**Content-Cluster:**
| Seite | Keyword | Such-Volumen |
|-------|---------|--------------|
| `/geschenkeberater` | "Geschenkideen Kind" | 22.000/Monat |
| `/geschenke-kind-3-jahre` | "Geschenk Kind 3 Jahre" | 2.900/Monat |
| `/geschenke-kind-5-jahre` | "Geschenk Kind 5 Jahre" | 3.600/Monat |
| `/geschenke-kind-7-jahre` | "Geschenk Kind 7 Jahre" | 4.400/Monat |
| `/geschenke-kind-10-jahre` | "Geschenk Kind 10 Jahre" | 2.400/Monat |
| `/geschenke-junge` | "Geschenke für Jungen" | 5.400/Monat |
| `/geschenke-maedchen` | "Geschenke für Mädchen" | 4.800/Monat |

**Revenue-Projektion:**
- Oktober 2026 (Launch): ~50€/Monat
- November–Dezember 2026: ~200–400€/Monat (Pre-Christmas-Peak)
- 2027 ganzjährig (evergreen): 150–300€/Monat konstant + Peak-Boost im November

**Aufwand:** 2–3 Tage (12–18 Stunden)
- 6h: KI-Berater-Tool (JSX + Claude-API + Ergebnis-Card-Layout)
- 8h: 6 SEO-Landingpages mit kuratierten Top-10-Listen (je ~1.200 Wörter + Vergleichstabelle)
- 2h: Affiliate-Link-Generator (Amazon + optional Awin)
- 2h: Schemas (FAQPage, ItemList für Top-10), interne Verlinkung

**Zeitplan:** **Launch spätestens 30.09.2026** (für November-Peak)

**Abhängigkeiten:**
- P2-15 (Awin-Anmeldung) wäre schön für bessere Margen, aber nicht kritisch — Amazon reicht zum Start
- Claude-API verfügbar (✅ gegeben)

**Erfolgs-Kriterien:**
- 7 Seiten live, alle mit Schemas
- Tool generiert in ≤10 Sekunden relevante Vorschläge
- Affiliate-Click-Rate ≥15% (Plausible-Event `affiliate-click`)
- Ab November 2026 messbarer Affiliate-Revenue-Anstieg

---

#### P1-16: Partyseite Follow-Ups (Laptop-Session) ✅ GRÖSSTENTEILS ERLEDIGT (23.04.2026)

**Motivation:** Partyseite ist seit 20.04. live, aber mehrere Follow-Ups sind aus der gestrigen Mobile-Session + dem Test heute (20.04., 17:23) aufgelaufen. Alles erfordert **Cloudflare-Deploy** und ist damit eine Laptop-Session.

**Sub-Tasks / Status (23.04.2026):**

1. ✅ **Cloudflare-Deploy des Bugfix-Commits** — Erledigt vor dieser Session (Commit `5613b9a` vom 21.04.: „FIX11, bereits auf Cloudflare deployed").

2. 🛠 **Email-Flow end-to-end testen** — Code ist drin, manueller Browser-Test durch Bolle ausstehend (braucht aktive Party). Migadu-Setup steht jetzt (26.05.2026).

3. ✅ **Reply-To Handling + Migadu-Setup** — Code in party-worker.js: Defaults von `party@machsleicht.de` auf `kontakt@machsleicht.de` umgestellt (27.05.2026 — party@ existiert nicht, war Bug). **Migadu Micro live seit 26./27.05.2026** ($19/Jahr, almost-unlimited Domains, beide Domains aktiv: machsleicht.de + machsruhig.de). Plan-Wahl Micro statt Mini: $71/Jahr gespart, Solo-Setup braucht keine Multi-Admin/API-Features. Cloudflare Email Routing wurde NICHT verwendet (MX-Kollision). Architektur-Entscheidung: Cold-Outreach für machsruhig ab Phase F über separate Subdomain, nie über primären MX. **Externe Action bleibt offen:** Cloudflare-Dashboard Env-Vars `RESEND_FROM`/`RESEND_REPLY_TO` auf `kontakt@machsleicht.de` setzen, Worker re-deployen.

4. ✅ **Alte `guestView()` entfernen** — 200 Zeilen toter Code raus (Zeilen 1285-1484, nur noch Funktionsdefinition ohne Aufrufer).

5. 🛠 **Live testen mit verschiedenen Mottos** — Manueller Browser-Test durch Bolle ausstehend.

6. ✅ **Foto-Crop verbessern** — Stellte sich heraus: Slider + Drag war bereits implementiert, aber 3 Mobile-Bugs: (a) Slider nur mit `mousemove`, kein Touch/Pointer; (b) Initial-Track-Width nicht gesetzt nach Upload; (c) kein `touch-action:none` auf Canvas/Slider. Alle drei gefixt.

7. ✅ **Beteiligen custom amount** — Komplett implementiert:
   - Backend: `/claim`-Endpoint nimmt optionalen `amount` (0<x<9999), speichert bei `sharedGift` als Object `{name, amount}`, sonst String (rückwärtskompatibel)
   - API-GET: `claimedAmountTotal` pro Wunsch wird berechnet und ausgeliefert
   - Frontend: Prompt bei Beteiligen mit Auto-Vorschlag (halbe Restsumme), Komma-Parse, leer lassen erlaubt
   - Anzeige: „3 dabei, 45€ gesammelt · Noch offen: 15€ · Vorschlag: 8€"
   - Editor-View: „🎁 Anna (20€), Tom (15€) · Gesamt: 35€"

8. ✅ **Kill List + Internal Linking Audit** — Ergebnisse ausgegliedert als separate PBIs (siehe P1-20 und P1-21 unten):
   - Echte Orphans: **0** (P2-2 war sauber). 138 Single-Year-Seiten alle via echtem 301 weitergeleitet.
   - Kill-Kandidaten: 112 Seiten von 8 Marken-Mottos (IP-Risiko, nicht tool-integriert) + 56 Seiten von 4 Content-Inseln (Pferde/Ritter/Zirkus/Baustelle)
   - Internal-Linking-Bug: **Superheld 0 eingehende Links, Prinzessin 2** — trotz Tool-Integration praktisch unsichtbar. Zum Vergleich: Piraten 142, Dino 116.

**Aufwand tatsächlich:** ~2 Std Chat-Session (ohne Cloudflare-Deploy, da schon erledigt).

**Erfolgs-Kriterien:**
- ✅ Code-Änderungen gepusht, validate-all.sh PASSED
- 🛠 Browser-Test (Email-Versand + Mottos) durch Bolle
- ✅ Migadu-Einrichtung für machsleicht + machsruhig (erledigt 26.05.2026)

---

#### P1-20: Internal-Linking-Fix für unterverlinkte Tool-Mottos `[KERN]` ✅ **ERLEDIGT 23.04.2026**

**Motivation:** Audit am 23.04.2026 zeigt einen harten Funnel-Leak. Von den 10 tool-integrierten Mottos sind **Superheld mit 0 und Prinzessin mit 2 eingehenden Links** de facto unsichtbar — obwohl das Tool für sie funktioniert. Gleichzeitig werden Marken-Mottos (die strategisch zurückgestellt sind) 60–108× verlinkt. Das ist das Gegenteil der strategischen Priorität.

**Zahlen aus dem Audit (eingehende interne Links):**
- Piraten 142, Safari 118, Dino 116, Weltraum 99, Feuerwehr 95, Einhorn 91, Meerjungfrau 50, Detektiv 39
- **Prinzessin 2, Superheld 0** ← Bug
- Marken: Ninjago 108, Harry Potter 98, Minecraft 80, Super Mario 72, Pokemon 69, Spider-Man 65, Paw Patrol 62, Frozen 62
- Inseln: Ritter 34, Zirkus 32, Pferde 27, Baustelle 20

**Root-Cause-Erkenntnis (während Implementierung):** Das Problem ist nicht nur fehlende Cross-Links, sondern fehlender Content. Während alle 8 anderen Tool-Mottos eine Hub-Page + 12 Alters-Seiten haben (sich gegenseitig verlinken = ~20 Self-Loop-Links, plus Cross-Links aus Grids anderer Seiten), existierten für Prinzessin + Superheld **null Seiten** unter `/kindergeburtstag/`. Links darauf wären 404 gelaufen.

**Umgesetzt:**
1. **Zwei Hub-Pages handgepflegt erstellt:**
   - `/kindergeburtstag/prinzessin.html` (~580 Zeilen, motto-spezifisch: Kronen-Werkstatt, Schatz-Suche im Königreich, Prinzessinnen-Akademie — je 3 Altersvarianten + Deko + Essen + Mitgebsel + FAQ + HowTo/FAQ/BreadcrumbList-Schema)
   - `/kindergeburtstag/superheld.html` (~580 Zeilen, motto-spezifisch: Helden-Ausrüstung basteln, Kräfte-Training, Rettungsmission — selbe Struktur. Gender-neutral + markenfrei umgesetzt)
2. **Homepage-Prosa (`index.html`) + Planer-Hub (`kindergeburtstag.html`):** Query-Param-Platzhalter (`?motto=prinzessin#planer`) durch echte Direkt-Links (`/kindergeburtstag/prinzessin`) ersetzt — diese Vor-Arbeit war bereits uncommitted im Working Tree angelegt.
3. **`_redirects`:** 2 neue 200-Rewrites `/kindergeburtstag/prinzessin` → `.html` + `/kindergeburtstag/superheld` → `.html`
4. **`sitemap.xml`:** 2 neue URLs mit `lastmod=2026-04-23, priority=0.8`
5. **Card-Swap-Script (`_build/p1-20-swap-cards.py`):** Thematisch kuratierte Cross-Motto-Grid-Anpassung.
   - **Prinzessin-Cluster (einhorn, meerjungfrau, frozen, harry-potter, pferde, zirkus):** Auf 77 Seiten wurde die thematisch schwächste Tool-Motto-Card gegen eine Prinzessinnen-Card getauscht. Tausch-Prio: feuerwehr > piraten > dino > weltraum > safari > detektiv.
   - **Superheld-Cluster (feuerwehr, ninjago, spider-man, paw-patrol, detektiv, piraten):** Auf 62 Seiten analog. Tausch-Prio: einhorn > meerjungfrau > safari > weltraum > dino > feuerwehr.
   - **Wichtig — P1-21 nicht vorgegriffen:** Marken-Motto-Cards (harry-potter, minecraft, pokemon, spider-man, super-mario, paw-patrol, frozen, ninjago) **nicht angetastet**. Deren Link-Profile bleiben unverändert für die GSC-basierte Kill-Entscheidung im Mai.
6. **BACKLOG + SESSION-NOTES aktualisiert.**

**Ergebnis (Re-Audit `_build/count-motto-links.py` nach Änderungen):**
```
Motto         Vorher   Nachher   Delta
Prinzessin         5        85     +80
Superheld          3        68     +65
Piraten          143       128     -15
Dino             115        98     -17
Safari           112        77     -35
Weltraum         101        81     -20
Feuerwehr         90        54     -36
Einhorn           86        76     -10
Meerjungfrau      45        39      -6
Detektiv          42        42       0
(Marken-Mottos unverändert)
```

**Ticket-Erfolgskriterium erreicht:** Prinzessin 85 Links, Superheld 68 Links — beide deutlich über dem 40er-Ziel. Verlierer bleiben alle ≥39 Links (Meerjungfrau knapp am unteren Schwellwert, aber noch akzeptabel). Alle SEO-Verlierer sind Tool-Mottos mit bestehenden 13-Seiten-Suites, die genug Masse haben.

**Validation:** `validate-all.sh` PASSED nach allen Änderungen.

**Limits / bekannte Kompromisse:**
- Neue Hub-Pages sind schlank (3 Spielideen × 3 Altersgruppen statt 5 × 3 wie bei Meerjungfrau). Bewusste Entscheidung: Content-Substanz pro Spielidee höher, HCU-Risiko geringer. Erweiterung möglich, wenn GSC-Daten Traffic zeigen.
- Keine Alters-Unterseiten angelegt (analog zu Meerjungfrau-Pattern 12 Alters-Seiten je Motto). Warum nicht: Ohne GSC-Daten-Validierung wäre das 15–20h Content-Arbeit ohne Nutzen-Nachweis. Entscheidung: nach Mai-GSC-Review.
- Ninjago + Spider-Man-Seiten haben in den Cross-Motto-Grids keine tauschbaren Fallback-Mottos (nur Marken-Mottos + Tool-Mottos, die nicht zu Superheld-Cluster passen) → 21 Seiten aus Superheld-Cluster nicht angetastet. Akzeptabel: Zielzahl 40 ist auch ohne diese erreicht.

**Folgetickets:**
- P1-21 (Kill-List Mai): Wenn Marken-Mottos (harry-potter 100, ninjago 109, etc.) gekillt werden, fallen weitere ~100+ Links auf Tool-Mottos frei, die dann in Cross-Motto-Grids auftauchen könnten. Prinzessin/Superheld sind bereits gut positioniert, damit sie von dieser Kill-Welle profitieren.
- P1-8 Elite-Motto-Seiten: Nach GSC-Review kann entschieden werden, ob Prinzessin/Superheld Alters-Unterseiten brauchen (analog zu Safari/Weltraum-Elite-Ausbau).

---

#### P1-21: Kill-List-Entscheidung Marken-Mottos + Content-Inseln `[TEST]`

**Motivation:** Audit am 23.04.2026 zeigt 168 strategisch fragwürdige Seiten: 8 Marken-Mottos mit IP-Risiko (Paw Patrol, Pokemon, Minecraft, Frozen, Super Mario, Spider-Man, Harry Potter, Ninjago = 112 Seiten) und 4 Content-Inseln ohne Tool-Integration (Pferde, Ritter, Zirkus, Baustelle = 56 Seiten). Keine davon ist tool-integriert. Aber: einige Marken-Mottos sind stark verlinkt (Ninjago 108, Harry Potter 98) — Kill würde Link-Beben auslösen.

**Nicht-Ziel:** Nicht jetzt killen. Ohne GSC-Traffic-Daten ist das Blind-Flug.

**Scope:**
1. **GSC-Daten abwarten (4 Wochen ab Search Console-Setup, P0-1 war 19.04. → Zielmonat Mai):**
   - Pro Motto: Impressions, Clicks, Durchschnitts-Position
   - Cutoff-Schwelle definieren (z.B. <50 Clicks/Monat = Kill-Kandidat)
2. **Pro Kandidat 3-Wege-Entscheidung:**
   - (a) **Kill**: 301 auf nächstgelegenes Tool-Motto (z.B. Paw Patrol → Feuerwehr, Frozen → Einhorn) + interne Links entfernen
   - (b) **Integrieren**: Tool-Unterstützung bauen, aufwerten — nur wenn Traffic signifikant
   - (c) **Behalten als „Fan-Seite"**: Sitemap-Eintrag, aber aus Navigations-Pfaden raus, klar als Content gekennzeichnet (kein Tool-Pfad)
3. **Ausführung:** Pro Entscheidung Implementierung inkl. Canonical-Checks und _redirects-Update.

**IP-Risiko-Caveat:** Marken-Mottos sind rechtlich heikel. Bei Kill gewinnt man Rechtssicherheit. Bei Behalten → Disclaimer-Text verschärfen und prüfen, ob Content wirklich rein informationell ist (keine Markenname-Verwendung im Title als kommerzielles Angebot).

**Aufwand:**
- Daten-Review: 1 Std
- Pro Kandidat Entscheidung: 5 Min × 12 = 1 Std
- Kill-Implementierung: 30 Min pro gekilltem Motto
- **Total: 3–6 Std** je nach Entscheidungen

**Erfolgs-Kriterien:**
- Dokumentierte Kill/Integrate/Behalten-Entscheidung pro Motto in STRATEGIE.md
- Bei Kills: saubere 301-Ketten, kein Orphan, kein toter interner Link

---

#### P1-15: Email-Capture am Planer-Output (Retention-Hebel)

**Motivation:** Externes Audit (19.04.2026) identifiziert **fehlenden Email-Capture als größte strukturelle Schwäche der Seite**. Nutzer plant, schließt Tab, ist weg — bis der nächste Kindergeburtstag in 12 Monaten sie zurück zu Google schickt. Das sind aktuell **0 % Retention**. Eine simple "Plan als PDF per Mail"-Mechanik am Ende des Wizards fängt laut Branchen-Benchmarks **15–30 % der Abschließer** ein. Bei ~80 Besuchern/Tag, 20 % Wizard-Start, 40 % Abschluss → ~6 Abschlüsse/Tag → bei 20 % Opt-In ~40 neue Kontakte/Monat aus Nullbasis.

**Warum P1, nicht P3:** Hebel ist so groß, dass jeder Tag ohne Capture verlorene Eltern-Kontakte sind. Und: Eltern haben 1–3 Geburtstage/Jahr + oft mehrere Kinder → eine eingefangene Adresse = 5–15 Jahre Retention-Potential.

**⚠️ Scope-Revision (20.04.2026):**
- **Neue Hebel-Logik:** Nicht "PDF per Mail" (schwacher Köder — Plan ist eh sichtbar), sondern **"Link zum fertigen Asset per Mail"** für zeitversetzt genutzte Outputs (Einladung, Partyseite, Schatzsuche)
- **Pilot auf Einladung** statt Planer: Höchster Nutzen (Einladung wird erst später verschickt, Link im Postfach löst echtes Problem), simpler Scope, Template-Pattern für Partyseite + Schatzsuche wiederverwendbar
- **Mini-MVP statt Voll-Spec:** Kein jsPDF, kein PDF-Attachment — nur Link + später Erinnerungs-Mail
- **Rollout-Plan:** Einladung zuerst → Daten sammeln (2 Wochen) → bei Opt-In ≥15% auf Partyseite + Schatzsuche ausrollen (je 1–2h wegen Template-Wiederverwendung)
- **Planer bekommt separaten Hebel:** Nicht Link-per-Mail, sondern Erinnerungs-Mail 7 Tage vor Geburtstag (= Nurture-Flow, spätere Session)

**Voraussetzungen (keine harten Blocker mehr — Resend läuft schon):**
- Resend-Audience für „machsleicht-newsletter" im Resend-Dashboard anlegen (5 Min)
- Double-Opt-In-Flow **selbst bauen** (Resend hat kein built-in DOI) — Worker erzeugt Confirmation-Token, schickt Bestätigungs-Mail, Klick auf Link → Contact in Audience als `subscribed` speichern
- Datenschutzerklärung auf machsleicht.de/datenschutz erweitern: Resend als Auftragsverarbeiter, DOI-Prozess beschrieben, Widerruf-Link
- AV-Vertrag mit Resend prüfen / abschließen (Resend hat Standard-DPA)

**Code-Umfang (~4–5h):** Einladungstool-Frontend + Worker-Endpoint `/api/subscribe` + DOI-Flow + Resend-Broadcast-Template + Datenschutz-Text.

**Was gebaut wird:**
- Am Ende des Planer-Wizards (direkt nach Plan-Output): Sektion **"Plan als PDF speichern — per Mail zugeschickt"**
- Form: nur E-Mail-Feld + DSGVO-Checkbox (Pflicht) + optionaler Newsletter-Opt-In-Haken (separat) + Button "PDF zuschicken"
- Backend: Worker erzeugt Confirmation-Token → sendet via Resend Confirmation-Mail → bei Klick Contact in Resend-Audience + PDF-Link ausliefern (DOI selbst gebaut)
- PDF-Generation: clientseitig via jsPDF aus dem aktuellen Planer-State
- Sekundärer Lead-Magnet-Versprechen im Mail-Text: "Bekommst Einkaufsliste 7 Tage vorher automatisch zugeschickt" (Nurture-Flow)
- **Klare Alternative sichtbar:** "Ohne Mail weiter → Plan direkt als PDF runterladen" — keine Erpressung, Download bleibt möglich ohne Mail

**Tech-Checkliste:**
- [ ] Abschnitt `<email-capture>` in Planer-Output-React-Component
- [ ] Resend-Audience „machsleicht-newsletter" anlegen
- [ ] DOI-Flow im Worker: Token in KV, Confirmation-Mail-Template in Resend, `/api/confirm?token=` Endpoint, Contact-Add via Resend-API
- [ ] RESEND_API_KEY ist bereits im Worker (für Transactional) — keine neue Secret-Einrichtung
- [ ] Neuer Worker-Endpoint `/api/plan-per-mail` (KV-Token erzeugt, PDF-Link, Mail-Trigger)
- [ ] DSGVO-Text + Checkbox (Pflicht)
- [ ] Plausible-Event `plan-email-submit` + `plan-pdf-direct` (Vergleichs-Messung)

**Monetarisierung:**
- Kein direkter Revenue, aber **Retention-Basis** für alle nachgelagerten Revenue-Streams
- Nurture-Flow Beispiel: 7 Tage vor Geburtstag → "Einkaufsliste + Affiliate-Links zu Amazon"
- 1 Tag vor Geburtstag → "Last-Minute-Checkliste + Gumroad-PDF 4,99€"
- Nächster Geburtstag (12 Monate später) → "Hast du deinen Planer noch? Neue Features warten"

**Revenue-Projektion:**
- Direkt: 0€
- Indirekt Jahr 1: bei 1.000 Kontakten und konservativen 1–3€ Revenue/Kontakt/Jahr → **1.000–3.000€/Jahr ab Monat 4**
- Skaliert linear mit Traffic

**Aufwand:** 1–2 Tage (8–12 Stunden)
- 2h: Resend-Audience + Self-Built-DOI-Flow (Token-Gen, KV-Store, Confirmation-Mail-Template, `/api/confirm`-Endpoint, Contact-Create)
- 3h: Worker-Endpoint + KV-Token für PDF-Link
- 3h: React-Component + jsPDF-Integration + Design
- 2h: Nurture-Flow-Mails schreiben (Welcome, 7-Tage-vorher, 1-Tag-vorher)
- 2h: Testing, DSGVO-Text final, Plausible-Events

**Zeitplan:** **Direkt nach P1-10 (Cloudflare-Worker-Deploy)**. Kein sinnvoller Start davor, weil Worker die Basis ist.

**Abhängigkeiten:**
- P1-10 (Cloudflare Worker muss live sein)
- P3-5 kann teilweise parallel: Resend-Audience-Setup ist gemeinsamer Schritt

**Erfolgs-Kriterien:**
- Opt-In-Rate ≥15 % der Planer-Abschließer
- Double-Opt-In-Confirm-Rate ≥65 %
- Nach 3 Monaten: 100+ Kontakte in der Resend-Audience
- Nurture-Flow öffnet Reaktivierungen messbar (Plausible-Referral von Mail)

**Risiko:**
- DSGVO: Muss sauber Double-Opt-In sein, sonst Abmahngefahr
- Opt-In-Rate kann unter 10 % fallen wenn Platzierung zu aggressiv → deshalb "Ohne Mail weiter"-Alternative zwingend

---

### P2 — NÄCHSTE 2 WOCHEN

#### P2-1: Homepage-Hero FUNNEL-AXIOM umbauen
**Entscheidung steht (Memory #19), Umsetzung offen.**
- Hero: 1 Primary CTA "🎂 Kindergeburtstag planen →"
- Sekundär darunter: Schatzsuche | Einladung | Partyseite als Textlinks
- Planer-Output: "Jetzt Gäste einladen & Wunschliste teilen" → Partyseite
- **Aufwand:** 2–3 Stunden.

#### P2-2: Thin Content bei Motto×Altersgruppen-Seiten
- 281 Seiten im /kindergeburtstag/-Ordner (17 Mottos × 14 Altersvarianten).
- Altersgruppen-Seiten (3-5, 6-8, 9-12) mit 16 KB dünner als Einzelalter (18–23 KB).
- **Option A:** Einzel-Alter-Seiten auf noindex / Canonical zu Gruppe → 281 auf ~70.
- **Option B:** Mit GSC-Daten nach 4–6 Wochen Top-20 identifizieren.
- **Empfehlung:** A jetzt, B später.
- **Aufwand:** 2–4 Stunden.

#### P2-3: Ergebnis-Vorschauen auf Produktseiten
- Screenshots von fertigen Plänen, Schatzkarten, Einladungen auf Homepage/kindergeburtstag/schatzsuche/einladung einbinden.
- **Ergänzung (19.04.2026, ext. Audit):** Nicht nur statische Screenshots. Ein **klickbarer Beispiel-Plan** (voll ausgefüllt, Motto Piraten 6 Jahre, 8 Gäste) als Tab/Modal auf `/kindergeburtstag`. Nutzer sieht in 5 Sekunden exakt, was hinten rauskommt. Kernkritik aus Audit 2: „Ihr argumentiert gut, ihr demonstriert nicht."
- **Aufwand:** 2 Stunden Screenshots + 2–3 Stunden klickbarer Beispiel-Plan.

#### P2-5: JS-Performance
- Kurzfristig: `loading="lazy"` auf alle Bilder (5 Min.) + manifest.json (10 Min.)
- Mittelfristig: React von unpkg selbst hosten.
- Langfristig: Code-Splitting für 307 KB kindergeburtstag.js.
- **Aufwand:** Kurzfristig 15 Min, langfristig 2–4 Std.

#### P2-8: /kreuzwortraetsel pre-rendern
- Statischer HTML-Wrapper um die React-App.
- **Aufwand:** 1–2 Std.

#### P2-10: Einladungstool: 7 fehlende Lizenz-Mottos
- Harry Potter, Minecraft, Pokémon, Paw Patrol, Spider-Man, Super Mario, Frozen.
- **Voraussetzung für P1-9.**
- **Aufwand:** 2–3 Stunden.

#### P2-13: Gumroad — 2 Digital-Produkte launchen
- Piraten-Komplett-PDF (VK 4,99€) + Dino-Komplett-PDF (VK 4,99€).
- Design-Material vorhanden (Elite-Seiten, Forscherpass).
- Gumroad führt USt ab → Kleinunternehmer-Status bleibt.
- **Revenue-Effekt:** +100€/Monat bei aktuellem Traffic.
- **Aufwand:** 2–4h pro Produkt einmalig.

#### P2-14: Affiliate-Sweep auf 16 Ratgeber-Seiten
- Aktuell nur 2/18 Ratgeber mit Amazon-Links.
- Einmalkauf-Produkte (Springform, Bluetooth-Box, Bastelset, Zahlenkerzen).
- Vergleichs-Tabellen statt Einzel-Links (konvertiert 3–5× besser).
- **Revenue-Effekt:** +50–150€/Monat.
- **Aufwand:** 4–6 Stunden Batch-Sprint.

#### P2-15: Awin anmelden
- Otto (8–10% Marge), myToys (6–8%), Thalia (5%), Jako-o, tausendkind, LEGO.
- Prüfung dauert 1–3 Tage — früh starten.
- **Aufwand:** 30 Min. Anmeldung + nach Freischaltung Integration in party-worker.js (1–2h).

#### P2-16: Mitgebsel-Generator (KI: Alter + Budget → Liste + Affiliate)

**Motivation:** "Mitgebsel Kindergeburtstag" = 2.400/Monat, "Mitgebsel 6 Jahre" = 880/Monat, "Mitgebsel ohne Plastik" = 720/Monat. Eltern haben konkrete Pain: billige Ramsch-Mitgebsel nerven, aber individuelle Ideen sind zeitaufwändig. **Tool-Lösung: Alter + Budget + Geschlecht + Öko-Filter → 8 kuratierte Ideen mit Affiliate-Link.**

**Was gebaut wird:**
- `/mitgebsel/generator` — Form: Alter, Budget pro Kind (1–5€), Öko-Filter an/aus, Anzahl Kinder
- Output: 8 Mitgebsel-Ideen mit Produktbild (Platzhalter), Preis, Affiliate-Link, Alternative
- Upgrade bestehender `/kindergeburtstag-mitgebsel.html`-Seite: Tool-Embedding + mehr Affiliate

**Tech-Checkliste:**
- [ ] `mitgebsel-generator.jsx` — Form mit 4 Inputs
- [ ] Claude-API: "Generiere 8 Mitgebsel für {alter}-Jährige, Budget {budget}€/Kind, {oeko ? 'ohne Plastik, nachhaltig' : 'gemischt'}. Für jedes: Name, Amazon-Suchbegriff, typischer Preis, Alternative."
- [ ] Ergebnis-Karten mit Affiliate-Links
- [ ] Integration in `/kindergeburtstag-mitgebsel.html` als interaktives Modul

**Monetarisierung:**
- Affiliate-getrieben (ähnlich Geschenkeberater)
- Durchschnittlicher Einkauf pro Kindergeburtstag: 15–30€ für Mitgebsel-Paket = 0,45–0,90€ Amazon-Provision pro Verkauf

**Revenue-Projektion:**
- Laufend: 30–80€/Monat Affiliate (aus dem hochkonvertierenden Mitgebsel-Kontext)
- Boost für `/kindergeburtstag-mitgebsel.html` Seite (aktuell 0 Affiliate-Links → 6+)

**Aufwand:** 1 Tag (6–8 Stunden)
- 3h: Tool-Flow + Claude-Integration
- 2h: Ergebnis-Cards + Affiliate-Link-Builder
- 2h: Integration in bestehende Mitgebsel-Seite
- 1h: Testing, Edge-Cases (z.B. Budget 1€ → günstige Produkte)

**Zeitplan:** **Flexibel, ideal Juli-September 2026** (vor Pre-Christmas aber nach P1-10 Cloudflare-Deploy)

**Abhängigkeiten:**
- P1-10 (Cloudflare Worker Claude-API-Access)
- P3-2 (Amazon-Tag ✅ bereits erledigt)

**Erfolgs-Kriterien:**
- Tool generiert passende Vorschläge für alle Alter/Budget-Kombinationen
- `/kindergeburtstag-mitgebsel.html` wird von 70% auf 85%+ im Audit
- Messbarer Affiliate-Lift via Plausible

---

#### P2-17: Standalone /wunschliste

**Motivation:** Die Wunschliste ist aktuell nur ein Feature innerhalb der Partyseite. **Aber:** Weihnachten, Einschulung, Taufe, Weihnachts-Wichteln, Kindergeburtstag — bei allen diesen Anlässen wird eine Wunschliste gebraucht. Wunschbiber hat 200k+ Wünsche genau mit diesem Zielmarkt. Wenn wir `/wunschliste` als eigenständiges Tool bauen, **erweitern wir unser Revenue-Fenster von "1× pro Jahr" (Geburtstag) auf "mehrfach pro Jahr" (Weihnachten, Einschulung, Geburtstag).**

**Was gebaut wird:**
- `/wunschliste` — SEO-Hub mit Tool-Einstieg, keine Anmeldung nötig (Einladender bekommt Geheim-Link)
- `/wunschliste/erstellen` — Formular: Anlass (Geburtstag/Weihnachten/Einschulung/Taufe/Sonstiges), Name des Beschenkten, Deadline, Geheim-Link
- `/wunschliste/{token}` — Öffentliche Ansicht für Gäste (wie Partyseite-Wunschliste-Modul)
- Affiliate-Link-Konvertierung automatisch (gleiche Logik wie Partyseite)

**Tech-Checkliste:**
- [ ] `/wunschliste.html` SEO-Hub
- [ ] Cloudflare-Worker-Endpoint `/wunschliste/{token}` (kann stark von party-worker.js geerbt werden)
- [ ] KV-Namespace "WISHLIST" oder Wiederverwendung von "PARTY"
- [ ] Affiliate-Link-Rewrite: Amazon, Otto, myToys, Thalia (8 Shops schon konfiguriert)
- [ ] Public-View mit Claim/Beteiligen-Funktion
- [ ] DSGVO: Daten löschen nach X Tagen nach Deadline
- [ ] Interne Verlinkung: vom Planer → "Auch ohne Party? /wunschliste"

**SEO-Content:**
| Seite | Keyword | Volumen |
|-------|---------|---------|
| `/wunschliste` | "Wunschliste online erstellen" | 2.900/Monat |
| `/wunschliste/kindergeburtstag` | "Wunschliste Kindergeburtstag" | 1.300/Monat |
| `/wunschliste/weihnachten` | "Weihnachts-Wunschliste" | 1.900/Monat |
| `/wunschliste/einschulung` | "Wunschliste Einschulung" | 720/Monat |

**Monetarisierung:**
- Reine Affiliate-Play
- Durchschnittlicher Wunschlisten-Warenkorb: 40–80€ pro Geschenk (Geburtstag), 60–150€ (Weihnachten)
- Rechnung laut STRATEGIE.md Abschnitt 6: **Standalone /wunschliste bei 10k Besuchern = 800€/Monat, bei 20k = 2.000€/Monat**

**Revenue-Projektion:**
- Launch (Juni-Juli 2026): ~50€/Monat bei aktuellem Traffic
- Q4 2026 (Weihnachts-Peak): ~300–600€
- 2027 ganzjährig: 400–800€ bei Traffic-Wachstum auf 5k Besucher/Monat

**Aufwand:** 2–3 Tage (12–16 Stunden)
- 4h: SEO-Hub-Seiten (4 Varianten nach Anlass)
- 6h: Cloudflare-Worker (Großteil aus party-worker.js kopierbar)
- 2h: Public-View mit Claim-Logik
- 2h: Affiliate-Integration + Testing

**Zeitplan:** **Launch spätestens 30.06.2026** (für Weihnachts-Peak-Ranking)

**Abhängigkeiten:**
- P1-10 (Cloudflare-Worker-Deploy — Party-Worker ist die Basis)
- P2-15 (Awin für höhere Margen — nice-to-have)

**Erfolgs-Kriterien:**
- 4 SEO-Seiten live mit Schemas
- Wunschliste erstellbar in <90 Sekunden
- Geheim-Link funktioniert, Gäste können Wünsche "beanspruchen"
- Messbarer Affiliate-Revenue in Plausible ab Monat 3

---

#### P2-18: Vergleichs-Tabellen statt Einzel-Affiliate-Links

**Motivation:** Laut STRATEGIE.md Abschnitt 3 Prio 5: **Vergleichstabellen konvertieren 3–5× besser als Einzel-Affiliate-Links.** Das ist ein einfacher, nicht-kreativer Boost für bestehende Affiliate-Seiten. Beispiel: Auf `/kindergeburtstag-torte-einfach.html` statt "Springform hier kaufen" → Tabelle mit 3 Springformen (Preis/Größe/Bewertung) nebeneinander.

**Was gebaut wird:**
- Reusable Vergleichstabellen-Komponente (HTML-Snippet, nicht React — einfach)
- 3–5 Produkte pro Tabelle
- Layout: Produktbild-Platzhalter | Name (mit Affiliate-Link) | Preis | Bewertung | 1 Satz Begründung | CTA-Button
- Einsatz auf 10+ Seiten

**Tech-Checkliste:**
- [ ] CSS-Klasse `.vergleichs-tabelle` mit Mobile-optimiertem Layout
- [ ] HTML-Template, kopierbar
- [ ] 10+ Tabellen bestücken mit kuratiertem Content für die wichtigsten Ratgeber
- [ ] Seiten-Liste: torte-einfach (Backformen), spiele-drinnen (Bastel-Sets), spiele-draussen (Pavillon/Decken), mitgebsel (Mitgebsel-Sets), essen (Fingerfood-Deko), zuhause (Kindergeburtstag-Deko-Sets), einladung-text (Einladungskarten-Sets), checkliste (Party-Sets), kosten (Sparpakete), drinnen (Indoor-Luftballons)

**Erfolgs-Messung via Plausible:**
- Event `affiliate-click` bereits implementiert
- Vorher-Nachher-Vergleich: Klickrate alter vs. neuer Struktur
- Ziel: 3× so viele Klicks pro Seitenaufruf

**Monetarisierung:**
- Wenn aktuelle Affiliate-Klicks = 10/Monat → mit Tabellen: 30/Monat
- Mit 3% Conversion = ~1€ pro Klick-Durchschnitt
- **Erwarteter Lift: +20–40€/Monat ohne neue Seiten**

**Aufwand:** 4–6 Stunden
- 1h: CSS-Komponente bauen
- 3–4h: 10 Tabellen bestücken (Produkte recherchieren, Texte schreiben)
- 1h: Integration + Testing

**Zeitplan:** **Sofort umsetzbar**, ideal nach P2-14 (Affiliate-Sweep) als dessen Qualitäts-Upgrade

**Abhängigkeiten:**
- P2-14 (muss vorher laufen, sonst Redundanz)

**Erfolgs-Kriterien:**
- 10 Tabellen live auf 10 Seiten
- Klickrate via Plausible messbar gestiegen (mindestens 2×)

---

#### P2-20: Datenübergabe Planer → Einladung/Schatzsuche/Partyseite

**Motivation:** Externes Audit (19.04.2026) zentraler Befund: *„Wer den Planer durchläuft und dann Einladung oder Schatzsuche öffnet, tippt Name, Datum und Ort erneut. Das ist kein UX-Detail, das ist der Unterschied zwischen einer Plattform und einer Tool-Sammlung."* Die Tools existieren als Silos, obwohl STRATEGIE.md Abschnitt 1 explizit das Ökosystem-Argument als Kernprinzip führt. Ohne Datenübergabe ist „machsleicht = System" nur Marketing-Claim, nicht Produktrealität.

**Was gebaut wird:**
- Planer-State (Kindername, Alter, Datum, Ort, Motto, Gästezahl) wird am Wizard-Ende in **localStorage** persistiert unter Key `machsleicht:partykontext`
- Einladung-Tool, Schatzsuche-Tool und Partyseite-Creator lesen diesen State beim Mount und **füllen die Formulare vor**
- Banner oben: „Daten aus deinem Planer übernommen — ändern?" mit Reset-Button
- Nach 7 Tagen automatisch verworfen (DSGVO-freundlich, minimal-invasiv)

**Tech-Checkliste:**
- [ ] Neues Util-Modul `js/partykontext.js`: `save()`, `load()`, `clear()`, Timestamp-Check
- [ ] Planer-Wizard: Am Abschluss-Screen `partykontext.save(state)`
- [ ] Einladungstool (`einladung/erstellen`): beim Mount `partykontext.load()` → pre-fill
- [ ] Schatzsuche-Modus im Planer: gleicher Mechanismus
- [ ] Partyseite-Creator (im Worker-Frontend): gleicher Mechanismus
- [ ] „Übernommen aus Planer"-Banner mit dezenter Farbgebung
- [ ] Plausible-Event `partykontext-uebernommen` + `partykontext-geaendert`

**Monetarisierung:**
- Kein direkter Revenue, aber **Conversion-Boost** am Partyseite-Upsell-Schritt (Funnel-Axiom: Planer → Partyseite → Wunschliste → Affiliate). Audit erwartet messbare Drop-off-Reduktion zwischen Planer und Partyseite.

**Revenue-Projektion:**
- Indirekt: Partyseite-Erstellungsrate erwartet +20–40 % bei vorgefüllten Daten (konservative Schätzung, keine Benchmark-Grundlage)
- Skaliert mit Partyseite-Revenue (Wunschliste-Affiliate)

**Aufwand:** 4–6 Stunden
- 1h: `partykontext.js` Util + Timestamp-Handling + Tests
- 2h: Integration in 3 Tools (Einladung, Schatzsuche-Modus, Partyseite-Creator)
- 1h: Banner-UI + Reset-Flow
- 1h: Plausible-Events + Testing mit verschiedenen Flows

**Zeitplan:** **Parallel zu P1-10 (Partyseite-Deploy)** sinnvoll — dann geht Partyseite gleich mit Datenübergabe live.

**Abhängigkeiten:**
- P1-10 (Partyseite muss live sein, damit alle 3 Zielpunkte testbar sind)

**Erfolgs-Kriterien:**
- 3 Tools nutzen den `partykontext` beim Mount
- Banner zeigt korrekt an, wenn Daten übernommen wurden
- Plausible: mind. 30 % der Planer-Abschließer öffnen danach Einladung oder Partyseite mit übernommenem Kontext
- DSGVO: Daten nach 7 Tagen automatisch gelöscht (nur localStorage, kein Server)

**Risiko:**
- localStorage geht beim Wechsel Mobile → Desktop verloren (akzeptiert, würde Account-System brauchen — nicht im Scope)

---

#### P2-21: Seiten-Rollen-Matrix dokumentieren & durchsetzen

**Motivation:** Externes Audit (19.04.2026): *„`/kindergeburtstag` mischt Produktpitch, Motto-Hub, Alterslogik, FAQ und Ratgeber-Elemente recht dicht. Für maximale SEO-Klarheit wäre noch stärker zu trennen zwischen Money-Page, Hub-Page, Supporting Content und transaktionalem Helfer."* Seitenrollen sind heute implizit, nicht dokumentiert. Das führt dazu, dass neue Inhalte auf die nächstbeste passende Seite draufgeklatscht werden, statt nach IA-Logik platziert. Google bestraft diesen Mischmasch mittelfristig mit Ranking-Verlust auf allen betroffenen URLs.

**Was gebaut wird:**
- Neues Dokument `_dev/docs/SEITEN-ROLLEN-MATRIX.md` mit Tabelle:
  - Jede zentrale URL (ca. 30 wichtigste) → eindeutige Rolle zugewiesen:
    - **Money-Page:** konvertiert zum Planer/Tool (z.B. `/kindergeburtstag`)
    - **Hub-Page:** verlinkt thematisch verwandte Inhalte (z.B. `/schatzsuche-kindergeburtstag`)
    - **Supporting-Content:** beantwortet eine Longtail-Frage (z.B. `/kindergeburtstag-kosten`)
    - **Transaktionaler-Helfer:** löst eine Mikro-Aufgabe (z.B. `/einladung/dino`)
    - **Redirect:** leitet bewusst um (z.B. `/schatzsuche`)
- Für jede URL: Primäres Keyword, Ziel-Intent, erlaubte/verbotene Content-Elemente
- Verbote-Beispiele: *„Money-Page darf keine Longtail-FAQ-Listen enthalten"*, *„Supporting-Content darf nicht auf andere Supporting-Content direkt verlinken ohne Hub als Vermittler"*
- Anschließend: **Audit der 30 URLs gegen die Matrix**, Liste der Verstöße, 3–5 konkrete Umbau-Tasks als Follow-Ups

**Tech-Checkliste:**
- [ ] Matrix-Doku schreiben (keine Code-Änderungen, reine IA-Arbeit)
- [ ] Kategorisierungs-Skript `_build/audit-seitenrollen.py`: extrahiert H1, Title, Canonical, interne Link-Anzahl, FAQ-Blöcke → vergleicht mit erwarteter Rolle
- [ ] Audit-Report: welche Seite verletzt welche Regel
- [ ] Top-5-Verstöße als neue PBIs erfassen (separate Tickets, nicht hier)

**Monetarisierung:**
- Indirekt über SEO: Saubere Seitenrollen helfen Google, den richtigen Long-Tail-Traffic zu verteilen
- Keine Revenue-Projektion sinnvoll (zu stark abhängig von Gesamt-Traffic)

**Aufwand:** 1 Tag (6–8 Stunden)
- 3h: Matrix schreiben für 30 URLs (Kategorisierung, Regeln, Verbote)
- 2h: Audit-Skript bauen
- 2h: Audit laufen lassen + Top-Verstöße als Follow-Up-PBIs formulieren
- 1h: Dokumentation in STRATEGIE.md referenzieren

**Zeitplan:** **Nach P1-11 (Ratgeber-Seiten auf 85 %)** — sonst Doppelarbeit auf noch-nicht-final-gepflegten Seiten.

**Abhängigkeiten:** Keine harten. Nützlich aber erst, wenn die wichtigsten Seiten inhaltlich stabil sind.

**Erfolgs-Kriterien:**
- Matrix-Dokument existiert mit allen 30 URLs
- Audit-Skript liefert klassifizierbaren Report
- 3–5 Follow-Up-PBIs erfasst für konkrete IA-Umbauten
- Entscheidung dokumentiert: welche Seiten behalten Mischung bewusst (Money-Pages oft OK), welche müssen getrennt werden

**Risiko:**
- Gefahr der Over-Engineering: Matrix ist nur sinnvoll, wenn sie auch durchgesetzt wird. Wenn nach der Doku keine Folge-Umbauten kommen, war es Papierarbeit. Deshalb: Die Follow-Up-PBIs sind der eigentliche Output.

---

#### P2-22: Site-Wide In-App-Frame (Modal-Pattern seitenweit)

**Motivation:** Im P1-16-Sprint am 21.04.2026 wurde auf der Partyseite ein Modal-Overlay mit iframe für die „Vorschau" und „Bearbeiten"-Buttons eingeführt — statt die Ziele in einem neuen Tab zu öffnen, erscheint ein zentriertes Panel (520 px max-width, 16 px Padding, abgerundete Ecken, Shadow) über der Seite, das den Context behält. Ergebnis laut User-Test („flüßig. proportionen passen"): Deutlich bessere Retention, kein Tab-Verlust, keine Verwirrung. Das Pattern soll seitenweit ausgerollt werden.

**Warum P2, nicht P1:** Kein akuter Bug, sondern ein systemweiter UX-Hebel. Schmerzpunkt ist die Retention-Lücke bei jedem `target="_blank"` — aber der aktuelle Zustand funktioniert. P2 reicht.

**Zwei Einsatz-Szenarien — unterschiedliche technische Ansätze:**

**A) Interne Vorschauen (same-origin) — unproblematisch**
- Alles unter `machsleicht.de`, `party.machsleicht.de`, `raetsel.machsleicht.de`: direkt via iframe einbettbar
- Use-Cases: Partyseite-Vorschau (bereits live), Einladungs-Vorschau, Schatzkarten-Vorschau, Planer-Demo-Cards auf Homepage („So sieht's aus"), Rätsel-Vorschau
- Einheitliche Modal-Komponente extrahieren (`/js/modal.js` oder inline in jeder Page), konsistente Styles (CSS-Variablen aus FIX11-Version der Partyseite)

**B) Externe Affiliate-Links (Amazon, Otto, myToys, Thalia, ...) — nicht iframe-bar**
- Amazon, Otto etc. setzen `X-Frame-Options: DENY` / `frame-ancestors 'none'` → **Browser blockiert iframe hart, kein Workaround im Client**
- Server-side Proxy („Reader-Mode") wäre technisch machbar, aber: bricht Affiliate-Tracking-Cookies, verletzt Amazon-Partner-ToS, IP-Blocking-Risiko, rechtliche Grauzone
- **Echte Lösung: OG-Preview-Card-Pattern** statt iframe:
  - Server fetcht Ziel-URL einmal, extrahiert `og:image`, `og:title`, `og:price`, `og:description` → speichert in KV (TTL 24 h)
  - Modal zeigt **native Preview-Card** (Bild + Titel + Preis + „Verfügbar bei Amazon/Otto")
  - CTA: „🛒 Zum Shop" → öffnet **neuen Tab** (normales Verhalten, Affiliate-Link intakt)
  - Return-Loop: Wenn User zurückkehrt, zeigt die Seite „Willkommen zurück — als besorgt markieren?" (lokaler State via `sessionStorage`)
- Ergebnis: Fühlt sich an wie „In-App", aber ohne iframe-Blockaden und ohne ToS-Risiko. Conversion-Hebel bleibt (Preview → reduzierte Abbrüche), Tracking bleibt.

**Was gebaut wird:**
- **Phase 1 (Interne Vorschauen, ~4 Std.):**
  - Gemeinsame Modal-Komponente extrahieren (CSS + JS aus party-worker.js FIX11)
  - Einbau auf Homepage-Demo-Cards („So sieht's aus" öffnet jetzt Modal statt neuen Tab)
  - Einbau auf `/einladung` (Vorschau-Buttons)
  - Einbau auf Planer-Output (Schatzkarten-Vorschau, Partyseiten-Vorschau)
- **Phase 2 (OG-Preview für Externe, ~6–8 Std.):**
  - Cloudflare Worker `og-preview.machsleicht.de/fetch?url=<amazon-url>` → fetcht HTML, parsed OG-Meta, cached in KV
  - Amazon-spezifisch: `og:title` + `og:image` + Preis aus `.a-price-whole`-DOM via HTMLRewriter
  - Generic Fallback: nur `og:title` + `og:image` + Domain-Name
  - Client-seitig: alle Affiliate-Links (`a[data-affiliate]`) fangen `click` ab → Modal mit Preview-Card
  - Analytics: Plausible-Event `preview_opened` + `preview_to_click` (Conversion-Rate mess- und tunbar)
- **Phase 3 (Return-Loop, ~2 Std.):**
  - `sessionStorage.setItem('pendingAffiliate', JSON.stringify({url, title, at}))` beim Klick auf „Zum Shop"
  - `visibilitychange`-Listener auf Rückkehr: Toast zeigen „Hast du [Titel] besorgt? ✅ Ja / ❌ Noch nicht"
  - Bei „Ja": Item in clientseitiger „Mitgebsel-Liste" als erledigt markiert

**Tech-Checkliste:**
- [ ] `modal.js` als gemeinsame Komponente, von allen Seiten importierbar
- [ ] CSS-Variablen in `_src/styles/modal.css` (oder inline-minified)
- [ ] OG-Preview-Worker auf neuer Subdomain oder als Route auf existierendem Worker
- [ ] KV-Cache mit TTL 24h für OG-Daten
- [ ] HTMLRewriter-Transformer für Amazon-Preis-Extraktion (fragile — User-Agent und Region-abhängig)
- [ ] Click-Interceptor auf `a[data-affiliate]` global einbauen (Homepage, Ratgeber, Motto-Seiten, Planer-Output)
- [ ] Analytics-Events in Plausible konfigurieren
- [ ] Return-Loop-Toast mit Dismissal + „Noch nicht"-Reminder
- [ ] Fallback: wenn OG-Fetch fehlschlägt → Modal zeigt einfache „Zum Shop"-CTA ohne Preview

**Monetarisierung:**
- Primär: **Retention statt Tab-Verlust** → mehr Seitentiefe pro Besuch
- Sekundär: Affiliate-Konversion steigt, weil Preview-Card Preis + Bild zeigt (niedrige Klick-Hürde, hohes Commitment nach Klick)
- Tertiär: Return-Loop-„Als besorgt markiert" baut einen impliziten Mitgebsel-Tracker → Überleitung zu P2-16 Mitgebsel-Generator

**Revenue-Projektion:**
- Konservativ: +10–15 % Affiliate-Conversion (Preview reduziert „nur mal schauen"-Abbrüche)
- Bei aktuellem Baseline ~30€/Monat Affiliate: +3–5€/Monat
- Echter Hebel: wenn P2-13 Gumroad live ist und P1-15 Email-Capture läuft, wird der In-App-Frame zum Funnel-Backbone → 20–30 % mehr Seitentiefe = proportional mehr Mid-Funnel-Capture

**Aufwand:** 1–2 Tage gestaffelt
- Phase 1 (interne Vorschauen): 4 Std. — sofort umsetzbar, kein Risiko
- Phase 2 (OG-Preview): 6–8 Std. — braucht Cloudflare-KV-Setup, Amazon-Parsing ist fragil
- Phase 3 (Return-Loop): 2 Std. — opportunistisch, kann später

**Zeitplan:** Phase 1 kann parallel zu P1-16 erledigt werden (kleiner Nachzügler-Commit). Phase 2+3 warten auf P2-15 (Awin-Anmeldung live, damit Otto/myToys/Thalia-Links überhaupt existieren und sich lohnen zu präviewen).

**Abhängigkeiten:**
- Phase 1: keine
- Phase 2: P2-15 (Awin) für externe Links mit Varianz, P1-10 (Worker läuft, Infrastruktur da)
- Phase 3: keine harte

**Erfolgs-Kriterien:**
- Modal-Komponente auf mind. 5 zentralen Seiten aktiv (Homepage, Planer-Output, /einladung, Motto-Seiten, Ratgeber)
- OG-Preview funktioniert für Amazon + mind. 2 Awin-Partner
- Plausible-Event `preview_to_click` > 60 % (User, die Preview öffnen, klicken auch zum Shop)
- Bounce-Rate auf betroffenen Seiten sinkt messbar (Baseline via Plausible vor Rollout festhalten)

**Risiko:**
- **Amazon-OG-Parsing ist fragil** — HTML-Struktur ändert sich ohne Warnung, Region-abhängig (DE vs. COM), User-Agent-Sniffing. Robust bauen: bei Fehler → Fallback auf Domain-Card ohne Preis.
- **Modal-Overlay auf mobilen Safari-Versionen** — iOS-Safari hat bekannte iframe-Scroll-Quirks (in FIX11 bereits via `-webkit-overflow-scrolling:touch` + `min-height:0` entschärft). Beim Rollout testen.
- **ToS-Risiko bei Server-Proxy** — Entscheidung dokumentieren: **kein Proxy, nur OG-Fetch** (OG-Meta ist explizit zum Teilen gedacht, kein ToS-Verstoß).

**Offene Frage — User-Anforderung „Hacker / UX-Gamechanger":**
Bolle hat nach einer Lösung gefragt, die Amazon & Co. trotz X-Frame-Options wirklich framed. **Kurze Antwort: geht nicht sauber.** Lange Antwort siehe oben — Server-Proxy bricht Tracking + ToS, und die eigentliche Magie liegt nicht im iframe, sondern im **Gefühl, die Seite nicht zu verlassen**. Das leistet die OG-Preview-Card genauso gut wie ein iframe, nur ohne die rechtlichen und technischen Tretminen. Der eigentliche „Gamechanger" ist der **Return-Loop** (Phase 3) — das Item als besorgt markieren, wenn User zurückkommt. Das kann kein Amazon-iframe.

---

### P3 — NÄCHSTER MONAT

#### P3-1: Repo aufräumen
- `.netlifyignore` bereits vorhanden (P0-4). Ggf. präzisieren.
- Langfristig: `_dev/` in separates Repo auslagern (33 MB → 18 MB).
- **Aufwand:** 10–30 Min.

#### P3-3: Social Proof aus Plausible
- Echte Planer-Erstellungen-Zahl als Counter auf Homepage.
- **Aufwand:** variabel.

#### P3-4: Druckvorlagen pro Motto (Top 5)
- Ausweise, Urkunden, Masken pro Motto (HTML mit Drucken-Button).
- Start mit Dino ✅, dann Piraten, Einhorn, Feuerwehr, Detektiv.
- **Aufwand:** ~30 Min pro Motto.

#### P3-5: E-Mail-Liste aufsetzen
- **Tool: Resend** (läuft bereits für Transactional). Audiences + Broadcasts-Feature aktivieren.
- DSGVO-konform via selbst gebautem Double-Opt-In-Flow im Worker (Token + Confirmation-Mail + Contact-Create).
- Lead-Magnet: "Piraten-Einladung kostenlos" oder "Komplette Einkaufsliste".
- Monatlicher Newsletter via Resend Broadcast.
- **Aufwand:** 1 Tag Setup (DOI-Flow + erster Broadcast), danach 30 Min/Monat.
- **Revenue-Effekt:** langfristig 1.000–3.000€/Jahr ab 1.000 Kontakten.
- **Hinweis (19.04.2026):** Der **konkrete Trigger-Punkt** für Opt-In ist P1-15 (Planer-Output als PDF-Lead-Magnet). P3-5 ist das Nachgelagerte (Newsletter-Versand, Nurture-Flow). P1-15 ist der Hebel, P3-5 die Verwertung.

#### P3-6: machsruhig.de launchen
- Eigener Sprint, Master-Doc existiert: `SKILL_MACHSRUHIG_MASTER.md` (2.698 Zeilen, 28 Phasen).
- 10 Kernseiten für SEO-Traffic ("Bestatter Kosten", "Vorsorge", "Trauerrede").
- **Revenue-Effekt:** 150–300€ pro Bestatter-Lead. Eine rankende Seite = 1.000€+/Monat.
- **Aufwand:** 2–3 Wochen Content-Sprint.

#### P3-7: Klassen-Geburtstagskalender (viraler Multiplikator)

**Motivation:** Ein 1. Schuljahr hat durchschnittlich 23 Kinder. Wenn wir ein Tool bauen, das einen kompletten Klassen-Geburtstags-Kalender erstellt (alle 23 Kinder mit Geburtstagen + jeweils eigene Wunschliste), **landet der Link in der Klassen-WhatsApp-Gruppe**. Ein Klick von einem Elternteil = 22 andere Eltern sehen machsleicht. Das ist der schnellste virale Multiplikator im gesamten Backlog — jeder erfolgreiche Nutzer bringt 22 neue Besucher.

**Was gebaut wird:**
- `/klassenkalender` — Hub-Seite mit Tool-Einstieg
- `/klassenkalender/erstellen` — Lehrer/Elternbeirat trägt Kinderliste mit Geburtstagen ein (max 30 Kinder)
- `/klassenkalender/{token}` — öffentliche Ansicht für ganze Klasse
- Jedes Kind hat individuellen Kalender-Eintrag, bei dem Gäste-Eltern später eine Wunschliste hinzufügen können
- Integration mit bestehender Wunschliste-Logik (P2-17)

**Tech-Checkliste:**
- [ ] `/klassenkalender.html` SEO-Hub
- [ ] Kalender-Einträge im KV mit strukturiertem Schema
- [ ] Monats-Ansicht + Jahres-Ansicht
- [ ] Einladungs-Flow: "Hey Eltern der Klasse 1a, hier der Geburtstagskalender: {link}"
- [ ] Pro Kind: Button "Wunschliste erstellen" → führt zu `/wunschliste/erstellen?kind={name}`
- [ ] DSGVO-sensibel: nur Vornamen + Geburtsmonat, nicht volles Datum öffentlich
- [ ] Kalender-Export als .ics für Handys

**SEO-Content:**
| Seite | Keyword | Volumen |
|-------|---------|---------|
| `/klassenkalender` | "Klassen-Geburtstagskalender" | 210/Monat (Nische, aber hochkonvertierend) |
| `/klassenkalender/schule` | "Geburtstagskalender Klasse" | 320/Monat |

**Monetarisierung:**
- **Indirekt viral:** Bringt Traffic auf Wunschlisten-Tool (P2-17)
- Direkte Affiliate-Revenue über Wunschlisten
- Null Kosten pro Nutzer (nur KV-Storage)

**Revenue-Projektion:**
- Direkter Revenue: klein (~20€/Monat via Wunschliste-Follow-Through)
- **Indirekter Revenue via Viralität:** Jede Klasse mit Kalender = 22 neue Eltern mit machsleicht-Kontakt. Bei 50 Klassen = 1.100 neue potentielle Nutzer
- Messgröße: Referral-Traffic von WhatsApp in Plausible

**Aufwand:** 3 Tage (15–20 Stunden)
- 4h: Tool-UI (Kinderliste, Monats-Ansicht, Jahres-Ansicht)
- 6h: Backend-Logik (KV, Tokens, Validierung)
- 3h: Integration mit Wunschliste
- 3h: SEO-Seite + Marketing-Copy ("Wie ihr den Klassenkalender einführt")
- 2h: DSGVO-Check + Testing

**Zeitplan:** **Q3/Q4 2026**, nach P1-10 + P2-17 (Wunschliste als Basis)

**Abhängigkeiten:**
- P1-10 (Cloudflare Worker)
- P2-17 (/wunschliste muss existieren)

**Erfolgs-Kriterien:**
- Tool funktional für 20+ Kinder
- 10+ Klassenkalender in Produktion nach 3 Monaten
- Plausible: Mindestens 30% neue Besucher kommen aus WhatsApp-Referral

---

#### P3-8: Nachbar-Nachricht-Generator (viral via Aushänge)

**Motivation:** Eine der häufigsten Eltern-Fragen: "Wie sag ich meinen Nachbarn, dass Samstag Kindergeburtstag ist?" Ein kostenloses Mini-Tool, das einen freundlichen Zettel generiert, den Eltern ausdrucken und ins Treppenhaus hängen. **Viraler Hebel:** Jeder ausgehängte Zettel = ein Branding-Touchpoint für machsleicht in einem kompletten Mehrfamilienhaus. Kostenlos, schnell gebaut.

**Was gebaut wird:**
- `/nachbar-nachricht` — Formular: Datum, Uhrzeit, Name (optional), "Viele Kinder, etwas Lärm" Toggle, Emoji-Auswahl (🎂🎈🎉)
- Output: druckbarer A5-Zett

---

#### P1-17: DSGVO-Hygiene Partyseite

**Motivation:** Die Partyseite (party.machsleicht.de) speichert personenbezogene Daten (Kinderfoto, Vornamen, Treffpunkt, Datum) in Cloudflare Workers KV und versendet transaktionale E-Mails über Resend. Drei DSGVO-Pflichten sind offen, entdeckt bei der Konsolidierung am 21.04.2026 (Teil 1). Ohne diese drei Sub-Tasks ist der Betrieb rechtlich heikel — nicht blockierend für neue Features, aber abmahnanfällig bei Wettbewerbern oder Beschwerde.

**Sub-Tasks:**

**A) Datenschutz-Hinweis über Send-Button im Email-Box-Bereich der Partyseite** — offen
- Pflicht-Hinweis bei jeder E-Mail-Eingabe: „Mit dem Absenden stimmst du der Verarbeitung deiner E-Mail-Adresse für den Versand des Bearbeitungs-Links zu. Details unter [/datenschutz](https://machsleicht.de/datenschutz#11)."
- **Ort:** `party-worker.js`, Email-Box-Bereich des Erstellen-Flows (FIX11-Ebene)
- **Aufwand:** 10 Min Code + Cloudflare-Deploy
- **Blocker:** Cloudflare-Deploy (Laptop-Session)

**B) Datenschutzerklärung auf /datenschutz erweitern** — ✅ erledigt 21.04.2026
- Neuer §10 Partyseite (Cloudflare KV, 90-Tage-Retention weich, manuelle Löschung per Mail)
- Neuer §11 E-Mail-Versand (Resend als AV, EU-US DPF, kein Werbe-Mail ohne DOI)
- Nachfolgende §§ um +2 umnummeriert, Stand auf April 2026
- Validator 7/7 grün

**C) Worker-Cron für Auto-Delete der Party-Daten 90 Tage nach Partydatum** — offen
- Cloudflare Cron Trigger: täglich 03:00 UTC
- Scan KV-Namespace `PARTY_KV`, lösche Einträge wo `partyDate + 90d < today`
- Nach Deployment: §10 Datenschutzerklärung von „spätestens 90 Tage" zu „automatisiert 90 Tage" präzisieren
- **Ort:** `party-worker.js` + wrangler.toml (Cron-Trigger)
- **Aufwand:** 1 Std Code + Test + Cloudflare-Deploy

**Aufwand total (nur A+C, da B erledigt):**
- A: 10 Min Code + Deploy
- C: 1 Std Code + Deploy + Datenschutz-Präzisierung (5 Min)
- **Total: ~1,5 Std Laptop-Session** — idealerweise gebündelt mit P1-16

**Blocker:** Beide offenen Sub-Tasks brauchen Cloudflare-Deploy → **nicht mobil machbar**. Bundeln mit P1-16.

**Erfolgs-Kriterien:**
- A: Datenschutz-Hinweis sichtbar im Email-Box-Bereich, mit Link zu `/datenschutz#11`
- C: Cron läuft täglich, Test-Eintrag mit Partydatum in Vergangenheit wird innerhalb 24h gelöscht
- Datenschutzerklärung-§10 auf „automatisiert" aktualisiert nach C-Deploy

**Referenz:**
- SESSION-NOTES.md 21.04.2026 Teil 1 (DSGVO-Decision)
- Commit vom 21.04.2026 Teil 4 (datenschutz.html-Erweiterung, Sub-Task B)


---

#### P1-60: Reminder-System Partyseite (Pre-Party + Year-Later)  `[KERN]`

**Motivation:** Mit der Newsletter-Opt-In-Checkbox vom 20.05.2026 (Cockpit + Worker-DOI) versprechen wir auf der DOI-Erfolgsseite zwei Reminder, die noch nicht gebaut sind:
1. **Pre-Party-Reminder:** "7 Tage vor der Party" — Tipps + Countdown. Versprechen aus DOI-Confirm-Text.
2. **Year-Later-Reminder:** "Mattis wird bald 7 — Zeit für die nächste Planung" — Retention-Loop 11 Monate nach Party-Datum.

Versprechen einlösen + Retention-Hebel aktivieren.

**Sub-Tasks:**

**A) Pre-Party-Reminder (2–3h)**
- Cloudflare Cron Trigger in `wrangler.toml`: täglich 04:00 UTC
- Worker scant `party:*`-Keys, filtert nach `party.email && party.date - 7d == today`
- Resend-Mail mit Motto-Emoji, Countdown ("noch 7 Tage!"), 2–3 Last-Minute-Tipps, Edit-Link für letzte Anpassungen
- Idempotenz: KV-Marker `reminded:pre:<id>` schreiben, damit nicht doppelt
- Opt-Out-Link in jeder Mail (delete `party.email` → keine weiteren Reminder)

**B) Year-Later-Reminder (3–5h)**
- **Datenproblem:** `calcTTL(party.date)` löscht aktuell die Partydaten ~30 Tage nach Party-Tag (siehe P1-17/C). Für 11-Monats-Reminder brauchen wir Long-Lived-Daten.
- **Lösung:** Separater Long-Lived-Key `recurring:<emailHash>` mit Minimal-Inhalt (E-Mail, childName, party.date, motto). Wird beim Create geschrieben, wenn `newsletterOptIn === true`. TTL 2 Jahre. Kein Foto, keine Adresse, keine Gäste — Datenminimierung.
- Cron-Trigger (gleicher wie A) scant zusätzlich `recurring:*`-Keys, filtert nach `party.date + 11 Monate == today`
- Mail-Template: "Mattis wird bald 7 — willst du dieses Jahr wieder mit machsleicht planen?" + CTA zum Planer mit `?motto=…&alter=…` Pre-Fill
- Idempotenz: `reminded:year:<emailHash>` Marker
- Opt-Out: delete `recurring:<emailHash>`
- Datenschutzerklärung §10/§11 ergänzen: Long-Lived-Reminder-Daten 24 Monate, Löschung auf Anfrage

**Sub-Task C) Unsubscribe-Endpoint (gemeinsam für A+B, ~30 Min)**
- `GET /api/unsubscribe?token=…` — Token = HMAC(email + secret)
- Löscht `recurring:*`, setzt `party.email = ""`, löscht Resend-Audience-Kontakt
- Confirmation-Page

**Aufwand total:** 5–7h. Eigener kleiner Sprint, am besten gebündelt mit P1-17/C (gleicher Cron-Mechanismus).

**Blocker:**
- Cloudflare-Deploy nötig (Laptop-Session)
- `RESEND_API_KEY` muss reminder-fähig sein (sollte schon sein)

**Erfolgs-Kriterien:**
- A: Test-Party mit Datum +8d → Mail kommt am +1d-Lauf, `reminded:pre:` Marker da
- B: Test-Party mit Datum -334d → Mail kommt, CTA-Link führt zum Planer mit Pre-Fill
- Opt-Out aus Mail → kein Reminder mehr, `recurring:*` Key weg

**Risiko:**
- Spam-Empfinden bei Year-Later (11 Monate später, User hat machsleicht vergessen) — wording wichtig, klarer Opt-Out
- Datenschutz: Long-Lived-Daten brauchen sauberen §10-Eintrag und 24-Monats-Hardlimit

**Referenz:**
- Commit `accbbe1` (20.05.2026): Newsletter-Checkbox im Cockpit-Form, DOI-Versprechen ausgelöst
- party-worker.js Zeile 397+ (existierender DOI-Confirm-Endpoint)


---

## 🪮 PLANER-FRISUR-SPRINT (P3-12 bis P3-21, neu 11.05.2026)

**Strategischer Rahmen:** Sprint, der den Planer vom Generator zum **intelligenten Produkt** umbaut. Ziel: bestes Kindergeburtstags-Tool am deutschen Markt. Konkurrenz-Recherche 11.05.2026 ergeben: **es gibt aktuell keinen interaktiven Planer in den Top-10 Google-Ergebnissen** — alles Blogs, Ratgeber, Affiliate-Listen. Die einzige Tool-Konkurrenz (Eysoldt-Partyplaner-App, Actionbound) ist generisch oder Schatzsuche-only. machsleicht spielt bereits jenseits dieser Liga, hat aber Lücken im sichtbaren Mitdenken und in der Begleit-Dimension.

**Architektur-Prinzip „intelligent ohne API":** Das Tool soll wie KI wirken, aber bleibt regelbasiert. Konkret in vier Schichten:
1. **Reaktive Outputs mit Diff-Anzeige** — sichtbar machen, was sich durch Eingaben geändert hat
2. **Constraint-Solver** — 15–20 Regeln über alle Eingaben gleichzeitig, erkennt und löst Konflikte (Alter × Gäste × Ort × Erwachsene × Dauer)
3. **Kuratierte Inhalts-Bibliothek** — pro Motto × Alter × Setting Spielanleitungen, Story-Anker, SOS-Mini-Programme, Plan-B-Varianten, Eltern-Briefings handgeschrieben (kein LLM-Halluzinations-Risiko, kein Wettbewerber kann das nachbauen ohne identischen Redaktions-Aufwand)
4. **Templated Generators** — Slot-Filling mit Varianten-Bibliothek (5 Slots × 3 Optionen = 243 Variationen pro Motto, deterministisch, ohne API)

**Einzige API-Ausnahme:** P3-19 (KI-Rätsel-Gedichte für Schatzsuche-Stationen) — Haiku-Call mit Cache auf Input-Hash, geschätzt ~6–9€/Monat bei 1000 Plänen, Premium-Vehikel-fähig.

**Reihenfolge:** Tier 0 (P3-12, Bugs) → Cockpit + Constraint-Solver-Fundament (P3-13, P3-14) → strukturelle Hebel (P3-15, P3-16, P3-17) → Wow-Anker (P3-18, P3-19) → große Würfe danach (P3-20 RSVP-Bridge, P3-21 Live-Navigator).

**Aufwand total: ~7–9 Arbeitstage = 6–8 Wochen bei 6–8h/Woche.** RSVP-Bridge + Live-Navigator zusätzlich 7–12 Tage in Tier 2.

**Beziehung zu P2-23:** P2-23 („Planer-Output auf Elite-Niveau") ist der **strategische Anker**, P3-13 bis P3-19 sind die **operative Umsetzung**. Wenn dieser Sprint durch ist, ist P2-23 erfüllt und P2-24 (eingewebte CTAs) freigeschaltet.

---

### P3-12: Planer-Tier-0 — Sofort-Fixes

**Drei kleine Bugs/Inkonsistenzen, die heute Vertrauen kosten. < 2h gesamt.**

- **Lizenz-Tab im Wizard entfernen.** `_src/kindergeburtstag.jsx` Z. 1241–1265: Tab-Schalter „🎨 Klassisch / ⭐ Charaktere" zeigt bei Klick auf Charaktere leere Liste mit Fehlermeldung („Für X Jahre keine Lizenz-Mottos verfügbar"). LICENSE-Array ist seit 30.04. leer (`_src/kindergeburtstag-data.js` Z. 1765–1768), aber UI-Tab + Filter-Logik nicht zurückgebaut. Restprodukt aus dem Cut. → Tab-Schalter raus, `mottoTab`-State raus, Filter-Logik raus, nur `GENERIC` direkt rendern.
- **„Sieben Mottos" → „Neun Mottos" im SEO-Body.** `kindergeburtstag.html` Z. 231: „Sieben Mottos für Kinder von 3 bis 12 Jahren". Widerspricht ItemList-Schema (9 Items) und 7-Motto-Grid im SEO-Body. War Teil des Round-2-Cuts vom 30.04., wurde aber übersehen. → Korrigieren auf 9 Mottos (7 Voll + 2 Schatzsuche).
- **Performance-Baseline messen.** `js/kindergeburtstag.js` ist 260 KB unminified + React-UMD extern. Vor SEO-Push Lighthouse + CWV messen, dokumentieren. Wenn LCP > 2,5s mobile → P2-5 hochstufen. Wenn ok → notieren, nicht handeln.

**Aufwand:** 2 Std.
**Trigger:** sofort, Session-Start des Sprints.
**Wirkung:** entfernt Glaubwürdigkeits-Lecks vor allen weiteren Builds.

---

### P3-13: Cockpit-Header im Plan-View

> **Status: ✅ DONE (2026-05-19)** — Cockpit-Header (EliteCockpitHeader: ageInsight + signatureRitual). Commit `10fa964` / draft. Browser-Smoke-Test offen.

**Mentaler Reframe: aus „hier ist dein Plan" wird „hier ist dein Stand".**

Nach Plan-Generierung erscheint oben im Plan-View eine kompakte Cockpit-Box statt dem aktuellen Motto-Badge:

```
🚒 Dein Feuerwehr-Geburtstag steht
Für: 5 Jahre · Kinder: 8 · Ort: Zuhause · Dauer: 2,5 Std · Aufwand: mittel

Fertig:
✓ Ablauf  ✓ 3 Spiele  ✓ Einkaufsliste  ✓ Kosten pro Kind

Nächste Schritte:
[Einladung erstellen]  [Schatzsuche hinzufügen]  [Partyseite anlegen]
```

**State-Anzeige + Action-Buttons in einem Block.** Die Sticky-Buttons unten bleiben für Mobile-Scroll, der Header oben gibt Orientierung.

**Datenmodell:**
```js
function getPlanState(plan) {
  return {
    completed: ['ablauf', 'spiele', 'einkauf', 'kosten'],
    optional: { schatzsuche: szActive, einladung: inviteSent > 0, partyseite: false },
    nextActions: computeNextActions(plan) // priorisiert nach Funnel-Position
  };
}
```

**Aufwand:** 1 Tag (8 Std). Komponente, State-Funktion, Plan-View Integration ab `motto.cat === "license"` Block (Z. 1015).
**Wirkung:** Vereinheitlicht alle anderen Features in einem mentalen Rahmen. Voraussetzung für sichtbare Diff-Anzeigen späterer PBIs.

---

### P3-14: Machbarkeits-Box mit Klartext + Constraint-Solver-Fundament

> **Status: ✅ DONE (2026-05-19)** — Constraint-Solver (EliteGamesFilter: Aufwand/Lautstärke + auto indoor/outdoor). Commit `10fa964` / draft. Browser-Smoke-Test offen.

**Aus deskriptivem `calcScore()` wird handlungsleitende `analyzeFeasibility()`.**

Heute existiert ein Mini-Solver: `calcScore()` (Z. 891–923) berechnet 7 Dimensionen + missing-Items. Beschreibend, ändert den Plan nicht. **Refactoring** zu einer Klartext-Ausgabe, die der User versteht, plus echte handlungsleitende Logik.

**Neue Schwellenwerte (Auswahl, ehrlich):**
| Bedingung | Stufe | Klartext |
|---|---|---|
| 3–5 J + >8 Kinder | anspruchsvoll | „Das wird etwas lebendig. Kürze Spielblöcke auf 10 Min." |
| Wohnung + >10 Kinder | kritisch | „Eng. Wir streichen parallele Stationen." |
| 1 Erwachsener + >8 Kinder | kritisch | „Allein mit 9 Kindern ist nicht ideal — können wir helfen, einen Helfer zu finden?" |
| Dauer >3 Std + <6 Jahre | zu lang | „Für Kinder unter 6 ist 3+ Std zu viel. Schlage 2,5 Std vor." |
| wild + Wohnung | anspruchsvoll | „Frühe Bewegung, dann Pause." |
| wenig Vorbereitung + Wow-Modus | runter | „Wir reduzieren auf Standard." |

**Box im Plan-View:**
```
Machbarkeit: anspruchsvoll
9 Kinder, 5 Jahre, Wohnung mit nur 1 Erwachsenem wird laut.
Wir haben angepasst:
✓ keine Wasserstation
✓ keine parallelen Gruppen
✓ 2 Spiele ohne Material
✓ ruhige Phase nach 45 Minuten
```

**Architektur-Ziel:** `analyzeFeasibility()` ist die zentrale Schicht, durch die später **alle** Eingaben gehen (Wizard heute, RSVP später in P3-20, Live-Navigator in P3-21). Datenstruktur muss eingaben-quellen-agnostisch sein.

**Aufwand:** 1 Tag (8 Std). 15–20 Regeln schreiben, Klartext-Texte formulieren, Diff-Anzeige bauen.
**Wirkung:** Erste sichtbare „Intelligenz". Strukturelles Fundament für RSVP-Bridge.

---

### P3-15: Erwachsenen-Zahl + Geburtstags-Datum als neue Eingaben

**Zwei kleine Eingaben mit großem Hebel — beide speisen den Constraint-Solver aus P3-14.**

**Datum:**
- Nach Schritt 3 (Gästezahl) ein neuer Schritt 4: „Wann ist der Geburtstag?" (Datepicker)
- Verwendung: Countdown im Cockpit-Header („noch 12 Tage"), automatisches Hochsetzen in Emergency-Mode bei <48h, Voraussetzung für Vorbereitungskarte (P3-16) und für Save-the-Date-Reminder.
- localStorage-Persistenz wie alle anderen Felder.

**Erwachsene:**
- Chip-Auswahl im Wizard: `[1] [2] [3+]`
- Verwendung: Constraint-Regel (1 Erw + viele Kinder = kritisch), und später Trigger für „Rollenplan für Helfer" (P3-Backlog, nicht im Sprint).

**Aufwand:** ½ Tag (4 Std). Datepicker + Chips + State-Felder + Constraint-Integration.
**Wirkung:** Datum ist Voraussetzung für Vorbereitungskarte. Erwachsene schärfen Machbarkeits-Box.

---

### P3-16: Vorbereitungskarte (datums-getriebene Wochenplan-Ansicht)

> **Status: ✅ DONE (2026-05-19)** — Vorbereitungskarte (VorbereitungsKarte: 6 collapsible Sektionen). Commit `10fa964` / draft. Browser-Smoke-Test offen.

**Strukturell der wichtigste neue Ergebnis-Block. Macht aus Snapshot → Begleiter.**

Sobald Datum eingegeben (P3-15), erscheint im Plan-View ein neuer Abschnitt unter dem Zeitplan:

```
📋 Was bis zum 24. Mai zu tun ist

7 Tage vorher (Sa 17.5.)
□ Einladungen verschicken
□ Gästezahl grob klar

2 Tage vorher (Do 22.5.)
□ Einkauf erledigen
□ Feuerwehr-Ausweise drucken
□ Schatzsuche-Hinweise vorbereiten

Am Partytag morgens
□ Spielmaterial bereitlegen
□ Kuchen vorbereiten
□ Stationen kurz testen

30 Minuten vorher
□ Erste Aktivität sichtbar bereitlegen
□ Getränke rausstellen
□ Handy weglegen, Plan öffnen
```

**Kuratiert pro Motto:** motto-spezifische Items („Feuerwehr-Ausweise" statt generisch „Bastel-Material"). Pro Motto ein zusätzliches Datenset im Daten-File (`_src/kindergeburtstag-data.js`).

**Checkbox-State** in localStorage. Wenn ein Item abgehakt, im Folge-Reload sichtbar — das ist der **Retention-Hebel**: Eltern kommen mehrfach zurück, jedes Mal sind weniger Items übrig.

**Spätere Erweiterung (nicht im Sprint, P3-Backlog):** Email-Reminder am jeweiligen Tag, „heute steht aus deiner Vorbereitung an…". Voraussetzung: Email-Capture aus P1-15.

**Aufwand:** 1 Tag (8 Std). Komponente + Datumslogik + Pro-Motto-Inhalts-Stubs (Feuerwehr ausgebaut, andere Mottos generisch zunächst, ausbau parallel zu P1-8).
**Wirkung:** Tool wird mehrtägiges Werkzeug. **Kein Konkurrent hat das.**

---

### P3-17: Drei-Gruppen-Einkaufsliste + „Was hab ich zuhause"-Inventar

> **Status: ✅ DONE (2026-05-19)** — Drei-Gruppen-Einkaufsliste (EliteShoppingList: pflicht/sinnvoll/habIchVielleicht). Commit `10fa964` / draft. Browser-Smoke-Test offen.

**Einkaufsliste neu strukturieren — von einer Liste zu drei Gruppen plus Inventar-Check.**

**Heute:** Eine Liste mit „Hab ich schon"-Checkbox, kaufen/leihen/diy-Tags.

**Neu:** Vier Sektionen, in dieser Reihenfolge:

```
🛒 Einkaufsliste — Feuerwehr 5 Jahre

Muss kaufen
□ Kuchen oder Muffins
□ Getränke
□ kleiner Preis / Schatz

Gut, wenn ihr habt
□ Eimer
□ Softbälle  
□ rote Luftballons

Kannst du weglassen
✕ Komplette Kostüme für alle (Helm-Bemalen reicht!)
✕ teure Deko-Sets

────────

Schon zuhause?
[Papier] [Stifte] [Becher] [Eimer] [Klebeband] [Softbälle] [Decke]
→ klick was du hast, wandert in „bereits da" und verschwindet aus „kaufen"
```

**Markenkern-Mechanik:** „Wir bauen deinen Feuerwehr-Geburtstag aus dem, was du schon hast." Das ist machsleicht pur — Branding als Mechanik, nicht als Slogan.

**Datenmodell:** Pro Item neue Felder `category: "must" | "nice" | "skip"`, `commonlyAtHome: bool`. Bestehende `owned`-Logik wandert in den Inventar-Check oben.

**Aufwand:** 1–2 Tage. Daten-Migration pro Motto (~30 Min/Motto) + UI-Aufteilung. Feuerwehr und Piraten Vollausbau, andere Mottos initial flach kategorisieren.
**Wirkung:** Stress-Reduzierer, Anti-Pinterest-Haltung sichtbar. Erhöht Share-Rate weil Liste **kürzer wirkt** als sie ist.

---

### P3-18: SOS-Button im Plan-View

> **Status: ✅ DONE (2026-05-19)** — SOS-Button (SOSButton: Floating FAB + Bottom-Sheet mit 8 Szenarien). Commit `10fa964` / draft. Browser-Smoke-Test offen.

**Sichtbarer, jederzeit erreichbarer Notfall-Knopf während der Party.**

Heute existiert nur `emergencyMode` als Vorab-Wizard-Knopf für 48h-Geburtstage. Was fehlt: **SOS während der Party**.

**UI:** Ein roter Sticky-Knopf (vielleicht im Cockpit-Header, vielleicht eigenständig sticky-bottom), öffnet ein Modal:

```
🆘 SOS während der Party

Was ist los?
○ Kinder werden zu wild
○ Spiel ist zu schnell vorbei
○ Wir liegen hinter der Zeit
○ Regen setzt ein
○ Ich brauche 15 Min Pause
```

**Inhalte (kuratiert, pro Motto):** Pro Szenario ein 6–10-Zeilen-Mini-Programm. Beispiel Feuerwehr / „Kinder zu wild":

```
Feuerwehr-Zentrale (6 Minuten, kein Material)
Alle Kinder setzen sich in den Kreis. Du bist Einsatzleitung.
Jedes Kind bekommt einen Funknamen ("Hydrant 1", "Schlauch 2"...).
Du gibst 4 ruhige Funk-Kommandos:
1. "Alarmcheck: alle einmal Sirene"
2. "Wasser-Marsch: alle klatschen"  
3. "Hydrant-Standby: einfrieren"
4. "Rettungseinsatz: zeigt auf ein Kuscheltier"
Dauer: 6 Min. Danach: direkt zur Kuchenpause.
```

**Datenmodell:** `_src/kindergeburtstag-data.js` bekommt pro Motto ein `sos`-Objekt mit 4–5 Szenarien.

**Aufwand:** 1 Tag UI + 0,5–1 Tag Inhalte schreiben (Feuerwehr ausgebaut, andere Mottos generisch). Inhalts-Ausbau pro Motto parallel zu P1-8.
**Wirkung:** **Einziges Feature, das während der Party hilft.** Kein Konkurrent hat das. Premium-Validierungs-Vehikel (Basis kostenlos, „Profi-SOS" mit 4 weiteren Szenarien für 2.99€ via Lemon Squeezy).

---

### P3-19: KI-Rätsel-Gedichte für Schatzsuche-Stationen

**Einzige API-Ausnahme im Sprint. Veredelt das stärkste existierende Feature.**

Heute: Schatzsuche-Stationen haben handgeschriebene Versteck-Texte ("auf dem Tisch"). Funktional, aber nicht Wow.

Neu: Bei aktiver Schatzsuche **gereimte Rätsel** für jede Station, individuell für Motto + Versteck. Beispiel:

```
Station 3 — Versteck: Küche
"Wo schon mal die Stulle wartete,
suche dort wo die Pizza startete.
Im Kasten kühl und hell und weiß,
liegt der Hinweis auf das nächste Reis."
```

**Mechanik:**
- Haiku-Call mit Prompt: `"Schreibe ein 4-zeiliges gereimtes Versteck-Rätsel für Kinder ${age} Jahre, Motto ${motto}, Versteck-Ort ${location}. Spielerisch, leicht zu lösen."`
- **Cache auf MD5-Hash der Inputs** (Motto + Alter + Versteck). Reim wird einmal generiert, dann ewig wiederverwendet.
- Cache-Hit-Rate erwartet >70%, weil Eltern oft gleiche Verstecke wählen (Sofa, Bett, Küche, Schrank).
- Effektive Kosten: 6–9€/Monat bei 1000 Plänen/Monat. Bei 10k Plänen ~70€.

**API-Key:** Anthropic API. Aufruf vom Worker (nicht Browser, sonst Key sichtbar). Worker hat `ANTHROPIC_API_KEY` als Secret.

**Aufwand:** 1 Tag. Worker-Endpoint + Cache + UI-Integration in Schatzsuche-Block.
**Wirkung:** Screenshot-fähiges Wow. Kinder erzählen davon. Eltern teilen die Reime. Plus: Premium-Vehikel — Basis-Reime kostenlos (max. 5/Plan), „Pro-Reim-Pack" für alle Stationen + Alternativen 2.99€.

---

### P3-20: RSVP-Bridge — Partyseite-Zusagen verändern den Plan

**Großer Wurf in Tier 2, nach P3-12 bis P3-19. Voraussetzung: Constraint-Solver aus P3-14 existiert.**

**Heute:** Partyseite erfasst RSVP (Name, Status `ja`/`nein`/`vielleicht`, Allergien, Abholzeit, Abholperson) → Datenmodell sauber, KV-Storage pro Party-ID. Planer kennt diese Daten **nicht**. Wenn morgen 3 Kinder absagen, ändert sich nichts.

**Ziel:** Plan reagiert sichtbar und sinnvoll auf RSVP-Änderungen.

**Drei Architektur-Bausteine:**

**1. Plan↔Partyseite-Verknüpfung.** Wenn aus Planer eine Partyseite erstellt wird (CTA gibt's), wird die Partyseiten-ID im Planer-State gespeichert (`localStorage.partyId`). Optional: „Plan per Mail speichern" für dauerhafte Verknüpfung über Browser-Wechsel hinweg.

**2. Reload-Mechanismus.** Beim Öffnen des Planers mit verknüpfter Partyseite → ein Worker-Call holt aktuelle RSVP-Daten. Wenn Änderungen seit letzter Anzeige → **Banner oben**, nicht autoritäre Plan-Änderung:

```
📩 Update von der Partyseite

Seit gestern: 1 Kind hat abgesagt (Tom), 1 Allergie (Mia — Nüsse)
Aktueller Stand: 7 Zusagen, 1 Vielleicht

[Plan anpassen]  [Wir haben's gesehen, ignorieren]
```

**3. Anpassungs-Logik (delta-fähig).** Wenn „Plan anpassen" geklickt:
- **Snackmengen** neu berechnen (trivial, pure Funktion der Zahl)
- **Mitgebsel** auf Anzahl + 1–2 Reserve setzen
- **Kosten/Kind** recalc
- **Allergie-Warnungen** in Snack-Liste persistent einblenden, ggf. Alternative vorschlagen
- **Spiele** mit Mindest-Teilnehmer-Zahlen prüfen (z.B. Team-Spiel <4 Kinder = ersetzen)
- **Abholzeit-Logik**: wenn Zeiten streuen → letzte Plan-Phase wird „Wer abgeholt wird, geht. Wer wartet, macht X."

**Diff-Anzeige sichtbar:** „Snacks reduziert: 11 Muffins → 10. Mitgebsel: 7 + 1 Reserve. Nussfreie Snack-Warnung ergänzt. Schatzsuche bleibt bei 5 Stationen."

**Wichtig — UX-Prinzip:** Plan-Änderung ist **vorschlagend**, nicht autoritär. Eltern haben evtl. schon eingekauft. Buttons „Übernehmen" / „Verwerfen" pro Anpassungs-Block.

**Aufwand:**
- MVP (Snacks/Mitgebsel/Kosten only + Allergie-Hinweis + Banner): **2–3 Tage**
- Vollausbau (Spiel-Anpassungen + Abholzeit-Logik + delta-fähige Diff-Engine): **5–7 Tage**

**Wirkung:** Macht aus Planer + Partyseite ein **Paar, das mehr ist als die Summe**. Strukturelles Verkaufsargument („andere haben RSVP, niemand passt den Plan an").
**Voraussetzung:** P3-14 (Constraint-Solver) muss stehen. Sonst Doppelarbeit.

---

### P3-21: Live-Party-Navigator (Tier 2, großer Wurf)

**Der Modus, in dem das Tool die Party am Tag selbst durch den Tag begleitet. Größter potenzieller Wow-Hebel, größter Aufwand.**

Statt nur vorher zu planen — am Partytag öffnet der Gastgeber den Plan und tippt **„Party starten"**. Tool wechselt in einen Live-Modus:

```
Jetzt: 15:35 Einsatztraining
Nächster Schritt in 25 Min: Kuchenpause

[ Spiel starten ]  [ Überspringen ]  [ Dauert länger ]
[ 🆘 Kinder werden wild ]  [ ⏸ Pause ]
```

Pro Phase Buttons, die den Plan dynamisch anpassen:
- **Spiel starten** → Timer läuft, Anleitung wird groß angezeigt
- **Überspringen** → nächste Phase, Restzeit umverteilen
- **Dauert länger** → +10 Min, nachfolgende Phasen kürzen
- **Kinder werden wild** → SOS-Programm aus P3-18 startet, Plan pausiert
- **Pause** → Plan eingefroren, Timer aus

**Zeitpuffer-Autopilot:** Plan hat versteckt 10–15 Min Puffer eingebaut. Bei Verzögerung wird Puffer angezapft, Eltern sehen „du liegst 8 Min hinter Plan — kein Stress, Puffer hilft". Bei Überschuss: „du bist 12 Min vor Plan — soll ich ein Funkspiel einschieben?"

**Architektur:** State-Maschine. Phase, Zeitstempel, modifizierte Restzeit. Im localStorage gespeichert (Sicherheit gegen Browser-Crash am Geburtstag — kritisch).

**Aufwand:** **5–7 Tage.** Größter Einzelposten im Backlog. State-Maschine, Live-UI, Timer-Logik, SOS-Integration, Recovery bei Browser-Crash.

**Wirkung:** **Kategorienwechsel.** Aus „Planer" wird „Begleiter durch den Tag". Niemand auf dem deutschen Markt macht das. Premium-fähig (Live-Modus als 2.99€-Upgrade plausibel). WhatsApp-Story-Material am Tag des Geburtstags.

**Voraussetzungen:** P3-13 (Cockpit), P3-14 (Constraint), P3-18 (SOS-Inhalte), P3-16 (Zeitplan-Strukturen). Alles aus dem Sprint vorher.

**Risiko:** Wenn das am Geburtstag nicht funktioniert, ist es ein Drama. Muss extrem robust + offline-fähig sein. Nach Browser-Crash muss Plan-State recovern.

---

## 📦 Nicht-aufgenommene Vorschläge aus 11.05.2026 (mit Re-Evaluation-Trigger)

Aus drei Sparring-Dokumenten (Claude-Lückenanalyse + zwei externe Ideen-Dokumente) kamen ~30 Vorschläge. Folgende bewusst **nicht** im Sprint, mit Begründung:

| Vorschlag | Warum nicht jetzt | Re-Evaluation wenn |
|---|---|---|
| Stress-Chips als Wizard-Step | Bricht Funnel-Axiom 0.1 (Hero = einfach). Würde im Wizard zu viel Last erzeugen. | Als Plan-View-Layer („möchtest du anpassen?") in Tier 3 möglich. |
| Audio-Geschichte mit Vorname (ElevenLabs) | Premium-Vehikel, gehört in Strategie-Stufe 4 (Audio nach Validierung 1+3). | Nach P3-19-Daten (zahlen Eltern für Mikro-Upsells?). |
| Eltern-Stats („Was haben andere gemacht") | Braucht Traffic-Daten erst. Bei 0 Plänen pro Woche = leere Stats. | Bei ≥500 Plänen/Monat scharfe Stats möglich. |
| Charakter-Brief am Vortag | Liebenswert, aber kleinerer Hebel als Sprint-Top-Features. | Q3 2026 als Mikro-Premium-Produkt. |
| Eltern-Briefing für Helfer | Gut, aber kein Wow-Hebel. Folge-PBI nach P3-15 (Anzahl Erwachsene) sinnvoll. | Sprint Tier 3, parallel zu RSVP-Bridge. |
| Streit-Vermeidungsmodus | Gehört in Stress-Chips als Sub-Option, nicht eigener Modus. | Mit Stress-Chips-Layer zusammen. |
| Gruppendynamik-Chips | 6 weitere Chips zusätzlich zu Constraint-Chips = UI-Last. Konsolidieren. | Wenn Stress-Chips-Layer existiert, ggf. Sub-Option. |
| Plan-B-Generator (3 Parallel-Pläne) | Architektur-Bruch (heute: ein Plan mit Switches). Refactor zu mehreren Karten 2–3 Tage. | Sprint Tier 3 möglich, wenn Live-Navigator zeigt dass Eltern Variation wollen. |
| Material-Minimierer | Algorithmus-Polish, kein eigenständiges Feature. In bestehende Spiel-Auswahl integrierbar. | Mit P1-8 ausgebauten Spiel-Bibliotheken. |
| Anti-Pinterest-Modus | **Existiert.** `shoppingMode="minimal"` + `effort="minimal"` + `quietMode`. Was fehlt: bessere Beschriftung. | 5-Min-Text-Änderung in Tier 0 möglich. |
| Stress-Zuerst-Wizard | Bricht Funnel-Axiom hart. | Als A/B-Test denkbar wenn Traffic vorhanden, frühestens Q4. |
| Fotoalbum, Danke-Generator, Wunschliste-Integration | Strategie 0.8 hat das adressiert. Wunschliste in P2-17, Rest gestrichen oder Q2/Q3. | Gemäß Strategie 0.8. |
| Erzieher:innen-Modus | Strategie 0.8 hat „B2B" gestrichen. Aber B2C-Erzieher ist eigene Kategorie. | Nach 5.000€+/Monat Consumer-Revenue. |

**Aufnahme-Logik:** Vorschlag muss entweder neues Mitdenken (sichtbar) liefern, neue Begleit-Dimension öffnen, oder echten Daten-Moat aufbauen. Reiner Feature-Klau wird nicht aufgenommen.

---

