# Session-Notizen

## Letzte Session
**Datum:** 28.04.2026 (Opus 4.7) — P1-8 Safari-6-8-Jahre **Elite-Seite live**, zwei neue PBIs ins Backlog

## Was wurde gemacht

### Safari 6-8 Jahre — Elite-Motto-Seite (P1-8, erste der drei Altersgruppen)

**Ergebnis:** `kindergeburtstag/safari-6-8-jahre.html` — 89 KB, valide, alle 7 validate-all.sh-Stufen grün.

**Story-Framing festgelegt** (in `_dev/docs/safari-story.md` als Konsistenz-Anker für 3-5 und 9-12):
- Leitnarrativ: "Junior-Ranger-Ausbildung im Tierreservat"
- Kinder als Anwärter → durchlaufen Stationen → Ranger-Lizenz + Klett-Abzeichen
- Tier-Sprache durchgehend: "Reservat", "Pirsch", "Wasserloch", "Herde", "Anwärter"
- Variation pro Altersgruppe: 3-5 "Tier-Helfer", 6-8 "Junior-Ranger-Anwärter", 9-12 "Reservat-Expedition"

**Drei Varianten gebaut:**
- **Minimal** (24 €, 6 Kinder, 2 h): zwei Spiele (Tierspuren-Pirsch + Tierstimmen-Quiz) + Eid + Mini-Lizenz
- **Standard** (80 €, 8 Kinder, 3 h): Stations-Rotation mit 4 pädagogisch begründeten Stationen (Tarnung, Tierspuren-Memory, Tierstimmen, Pirsch) + Großspiel "Rette das Löwen-Junge" + Lizenz-Zeremonie. Nach 4 Polish-Fixes auf 9,5/10.
- **Wow** (120 €+, 10 Kinder, 4 h): Standard plus 5. Beobachtungs-Station (Klassifikations-Mechanik mit gefährlich/gefährdet/ungefährlich) + Schatzsuche-Quest "Verborgener Tempel" mit funktionierendem Lösungswort T-F-S-U → FUSS + Filz-Buschhüte als Highlight. Nach 5 Polish-Fixes auf 9-9,5/10.

**Hygiene durchgeführt:**
- ausgefuxt-Wettbewerber-Link entfernt (war in Minimal-Variante als Tierspuren-Quelle), durch Eigen-Anleitung "Pfotenabdrücke aus Tonpapier ausschneiden" ersetzt
- Mowoli + kinder-malvorlagen.com als Drittlinks geprüft (reine Ausmalbilder-Sites, keine Wettbewerber)
- Affiliate-Link-Dichte 20 → 13 reduziert (Drogerie-Items wie Filzstifte/Stempel/Memory-Karten entlinkt)

**Pflichtelemente alle erfüllt:** HowTo-Schema, FAQPage-Schema (5 Q&As), OG/Twitter, Canonical ohne .html, Breadcrumb, Sticky-Bar, Final-CTA, WhatsApp-Share.

### Strategiediskussion + zwei neue PBIs ins Backlog

Bolle eröffnete Pivot-Frage zu Tease+Leckerli-CTAs vs. Vollpaket. Nach längerer Diskussion (siehe Phase-1/Phase-2-Logik): Entscheidung bleibt **Elite-Content jetzt, Funnel-Optimierung später wenn Traffic da ist**. Begründung deckt sich mit STRATEGIE.md Z.158 ("Monetarisierungs-Tuning bei 80 Visitors/Tag ist Mikrooptimierung").

**Zwei neue PBIs in BACKLOG-AUDIT.md eingetragen:**
- **P2-23** `[KERN]` Planer-Output auf Elite-Niveau heben (1-2 Tage) — Voraussetzung für eingewebte CTAs
- **P2-24** `[KERN]` P3 Eingewebte Leckerli-CTAs auf Motto-Seiten (30 Min/Motto) — Phase 2 nach P2-23, Hypothese 3-5× Conversion-Lift

### Wettbewerber-Verweis-Hygiene als Lerneffekt

Während der Session wurde ausgefuxt.de fälschlich als Tierspuren-Quelle verlinkt — ist Wettbewerber laut STRATEGIE.md. Hygiene-Regel jetzt im Sprint-Workflow: bei jedem neuen Drittlink prüfen, ob Wettbewerber.

## Was bleibt als Nächstes

### Sofort offen (P1-8 fortsetzen)
- **safari-3-5-jahre.html** (~1,5 h) — gleicher Aufbau, "Tier-Helfer"-Variante der Story (Parallel-Session bereits in Arbeit, Ende April)
- **safari-9-12-jahre.html** (~1,5 h) — gleicher Aufbau, "Reservat-Expedition"-Variante der Story
- **safari.html Mainseite** ggf. nachziehen (~30 Min)

### Mittelfristig im Backlog
- P3-4 Druckvorlagen pro Motto — Safari-Lizenz, Tierspuren-Memory, Stationskarten priorisieren
- P2-23 Planer-Output Elite-Niveau (Voraussetzung für P2-24)
- P2-24 Leckerli-CTAs auf Motto-Seiten (Phase 2 wenn Traffic vorhanden)

### Strukturelle Beobachtung
Inkonsistenz zwischen Dino/Einhorn (Vollpaket-Stil) und der Phase-2-Vision (Tease+CTA-Stil) bleibt. Wenn P2-24 später ausgerollt wird, müssen Dino + Einhorn nachgezogen werden.

---

## Vorletzte Session
**Datum:** 24.04.2026 (Opus 4.7) — Plausible → Umami-Migration + P1-15 Extern-Tasks 1–3 **komplett abgeschlossen und live**

## Was wurde gemacht

### P1-15 Extern-Tasks abgeschlossen (live in Production)

1. **Resend-Audience angelegt** — Name: `General` (Default-Audience des Accounts), ID: `b02151b7-8b4a-47e2-9f91-31160c56f8f5`
2. **Cloudflare-Worker Env-Vars gesetzt:**
   - `RESEND_AUDIENCE_ID` = `b02151b7-8b4a-47e2-9f91-31160c56f8f5` (Secret)
   - `RESEND_API_KEY` = vorhandener Key, upgraded von "Sending only" auf "Full access" (Plaintext — bei Gelegenheit auf Secret umstellen)
   - `RESEND_FROM` = `mach's leicht <party@machsleicht.de>` (Plaintext)
   - `AMAZON_TAG` = `machsleicht-21` (Plaintext)
3. **Worker deployed** — `party-worker.js` (mit Umami-Integration) ins Cloudflare-Dashboard kopiert, live unter `party.machsleicht.de`. Smoke-Test `/api/newsletter-confirm?token=test` zeigt korrekt die "Ungültiger Bestätigungslink"-Fehlerseite.

### Plausible → Umami-Migration (vollständig abgeschlossen und verifiziert)

**Grund:** Plausible-Trial abgelaufen, €14/Monat Paid-Tier lohnt sich nicht in aktueller Phase. Umami Cloud Free-Tier (1M Events/Monat) ist für machsleicht.de mehr als ausreichend.

**Umami-Setup:**
- Account auf cloud.umami.is erstellt
- Website `machsleicht.de` angelegt
- Website-ID: `72b5eb12-dfde-4333-9bc7-0c2880864df2`

**Migrationsstrategie:** Kompatibilitäts-Shim statt Massen-Replace aller Event-Calls
- Alle 351 HTML-Dateien bekamen Umami-Script-Tag + JS-Shim, der `window.plausible()`-Aufrufe auf `umami.track()` umleitet
- Bestehende Event-Calls (`plausible('einladung-schatzsuche-cta', {props: {motto: 'dino'}})` etc.) laufen ohne Änderung weiter
- Null Event-Logic-Anpassungen nötig

**Geänderte Dateien (353 total):**
- **351 HTML-Dateien:** Plausible-Script-Block → Umami-Script + Shim
- **party-worker.js:** Umami-Script in beiden HTML-Templates (Creator-Seite + Partyseite); Worker-Syntax-Check bestanden. Manuell ins Cloudflare-Dashboard deployed.
- **datenschutz.html §12:** Plausible Insights OÜ → Umami Software Inc. (EU-Server), Text entsprechend angepasst
- **index.html:** FAQ-Schema Text (Plausible → Umami) für Google-Snippets
- **_dev/scripts/consolidate-age-pages.js:** HTML-Template auf Umami umgestellt für zukünftige Dev-Skript-Läufe

**Validation:**
- `validate-all.sh` komplett grün
- Umami Dashboard "Realtime" zeigt Live-Pageviews → Tracking bestätigt funktional
- Merge-Commit `87fe9b7` auf main, Netlify-Build durchgelaufen

### Git-Workflow-Erkenntnis (für spätere Skill-Updates)

- **Lesson learned:** Am Sessionstart wurde `.claude/CLAUDE.md` nicht gelesen → generischer git-sync-Skill kennt `draft`→`main`-Merge bei "Ende deploy" nicht. Merge musste manuell nachgeholt werden.
- **Offenes TODO für nächste Session:** Den git-sync Skill in der Claude-App so anpassen, dass er vor jedem Trigger erst `.claude/CLAUDE.md` im Repo-Root liest und dortige Overrides respektiert. Konkreter Text-Vorschlag in Chat-History der 24.04.2026-Session dokumentiert.

## Extern-Tasks für Bolle (alle erledigt oder niedrige Priorität)

### ✅ Erledigt in dieser Session
- Resend-Audience angelegt
- Worker Env-Vars gesetzt
- Worker deployed
- Umami live und trackt Pageviews

### 🟡 Niedrige Priorität (kein Blocker)

1. **`RESEND_API_KEY` von Plaintext auf Secret umstellen** in Cloudflare Worker Variables — derzeit liegt der Key im Klartext sichtbar; Umstellung auf Secret ist Security-Hygiene.
2. **Plausible-Abo kündigen** — bei plausible.io prüfen, ob noch ein laufendes Abo existiert, ansonsten formal canceln.
3. **P1-15 End-to-End-Smoke-Test** — der eigentliche Feature-Test noch offen. Bolle soll einmal den Flow durchgehen:
   - `machsleicht.de/einladung/erstellen` → Einladung erstellen
   - Partyseite-CTA klicken → Creator mit Vorfüllung
   - Partyseite fertigstellen mit Test-Email
   - Newsletter-Checkbox aktivieren + "Edit-Link erhalten"
   - Zwei Mails checken (Edit-Link + DOI-Bestätigung)
   - DOI-Link klicken → Erfolgsseite
   - In Resend-Dashboard → Audience → Contact sichtbar
   - In Umami Dashboard → Events `invite-to-party-cta`, `edit-link-email-submit`, `newsletter-opt-in` registriert

## Nächste Schritte

### Kurzfristig (nach P1-15-Smoke-Test durch Bolle)
- **2 Wochen messen:** Opt-In-Rate der Newsletter-Checkbox bei Partyseite-Erstellern + Click-Rate des Partyseite-CTAs im Einladungstool. Bei <10% Opt-In: UX-Überarbeitung Checkbox-Text oder Platzierung.
- **DOI-Confirm-Rate tracken:** Umami-Event auf `/api/newsletter-confirm` zählen vs. `newsletter-opt-in`-Events
- **Git-Sync Skill-Update** in der Claude-App (siehe "Git-Workflow-Erkenntnis" oben)

### P1-15 Follow-ups (nach Datenpunkten)
- **Schatzsuche-Capture:** gleiche Mechanik auf Schatzsuche-Output übertragen (1–2h Template-Reuse)
- **Nurture-Flow schreiben (P3-5):** Welcome-Mail, 7-Tage-vorher-Reminder, 1-Tag-vorher-Checkliste. Erinnerungs-Cron als Worker scheduled event.
- **Planer-Output-Capture:** separater Hebel laut Scope — Erinnerungs-Mail 7 Tage vor Geburtstag

### Aus vorheriger Session weiter offen
- **🗓️ 08.05.2026:** Migadu-Trial-Ende — Mini ($90/J) vs. Micro ($19/J) entscheiden
- **GMX-IMAP-Einbindung** für beide Business-Mailboxen (~15 Min)
- **#11 P1-17** DSGVO-Hygiene Partyseite A+C (1,5h)
- **#16 P1-12** Einschulung SEO-Cluster — Launch bis 31.05.

## Offene Fragen

- **Umami Free-Tier-Stabilität:** 1M Events/Monat kostenlos, darüber $0.00002/Event. Realistisch für machsleicht.de weit unter 1M. Wenn Umami irgendwann Free-Tier beschneidet → Fallback ist Self-Host (MIT-Lizenz).
- **Opt-In-Konversion unklar:** Realistische Annahme 15–30% der Partyseite-Ersteller klicken Newsletter-Checkbox. Erste 2 Wochen zeigen ob UX reicht oder angepasst werden muss.
- **Einladung → Partyseite Funnel-Rate:** Noch keine Baseline. Bei <5% Conversion wäre die ganze Variante-A-Architektur unterdimensioniert → dann direkt Capture am Einladungstool nötig.
- **DMARC-Einstellung machsleicht.de:** Aktuell `p=none`, nach 2 Wochen stabiler Warmup-Phase auf `p=quarantine` ziehen.

## Status der Site nach diesem Deploy

- **Plausible vollständig weg aus dem Code** — keine plausible.io-Referenzen mehr in HTML/JS
- **Umami-Tracking live und verifiziert** auf allen statischen Seiten (Netlify-Build durchgelaufen, Pageviews kommen im Dashboard an)
- **Worker-Tracking (Creator + Partyseite) deployed** — ab dem nächsten Besuch wird getrackt
- **P1-15 Feature produktionsreif und deployed** — Newsletter-DOI-Flow funktional, bereit für realen Smoke-Test durch Bolle
- **Repo:** 40 PBIs in Roadmap, P1-15 Code + Deploy komplett (Variante A), wartet nur noch auf End-to-End-Test
