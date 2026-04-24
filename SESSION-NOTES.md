# Session-Notizen

## Letzte Session
**Datum:** 24.04.2026 (Opus 4.7) — Plausible → Umami-Migration + P1-15 Extern-Tasks 1–3 abgearbeitet

## Was wurde gemacht

### P1-15 Extern-Tasks abgeschlossen (live in Production)

1. **Resend-Audience angelegt** — Name: `General` (Default-Audience des Accounts), ID: `b02151b7-8b4a-47e2-9f91-31160c56f8f5`
2. **Cloudflare-Worker Env-Vars gesetzt:**
   - `RESEND_AUDIENCE_ID` = `b02151b7-8b4a-47e2-9f91-31160c56f8f5` (Secret)
   - `RESEND_API_KEY` = vorhandener Key (Plaintext — bei Gelegenheit auf Secret umstellen)
   - `RESEND_FROM` = `mach's leicht <party@machsleicht.de>` (Plaintext)
   - `AMAZON_TAG` = `machsleicht-21` (Plaintext)
   - Resend-API-Key wurde in dieser Session von "Sending only" auf "Full access" upgraded (notwendig für Audience-Schreibzugriff)
3. **Worker deployed** — `party-worker.js` ins Cloudflare-Dashboard kopiert, live unter `party.machsleicht.de`. Smoke-Test `/api/newsletter-confirm?token=test` zeigt korrekt die "Ungültiger Bestätigungslink"-Fehlerseite.

### Plausible → Umami-Migration (vollständig abgeschlossen)

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
- **party-worker.js:** Umami-Script in beiden HTML-Templates (Creator-Seite + Partyseite); Worker-Syntax-Check bestanden. **Wichtig:** Diese Änderung erfordert manuellen Worker-Deploy zusätzlich zum Netlify-Build.
- **datenschutz.html §12:** Plausible Insights OÜ → Umami Software Inc. (EU-Server), Text entsprechend angepasst
- **index.html:** FAQ-Schema Text (Plausible → Umami) für Google-Snippets
- **_dev/scripts/consolidate-age-pages.js:** HTML-Template auf Umami umgestellt für zukünftige Dev-Skript-Läufe

**Validation:** `validate-all.sh` komplett grün.

## Extern-Tasks für Bolle nach diesem Deploy

### 🔴 Zwingend zeitnah:

1. **Worker neu deployen** — Wichtig! Git-Push + Netlify-Build macht NICHT automatisch den Worker-Deploy. Die `party-worker.js` muss manuell ins Cloudflare-Worker-Dashboard kopiert werden:
   - `dash.cloudflare.com` → Workers & Pages → Partyseite-Worker → Edit code → Alles ersetzen → Save & Deploy
   - Ohne diesen Schritt tracken Creator-Seite und Partyseite weiterhin nichts (bisher sowieso schon der Fall, ist also kein Regression)
2. **Smoke-Test Umami:**
   - `machsleicht.de` im Browser öffnen
   - In Umami Dashboard unter "Realtime" den Pageview sofort sehen
   - Wenn Pageview nicht erscheint: Browser-Console prüfen, ob `cloud.umami.is/script.js` geladen wurde

### 🟡 Niedrige Priorität:

3. **`RESEND_API_KEY` von Plaintext auf Secret umstellen** in Cloudflare Worker Variables
4. **Ursprünglicher Plausible-Account** — bei Plausible das Abo formal kündigen, falls noch nicht automatisch beendet
5. **P1-15 Smoke-Test Ende-zu-Ende:** Einladungstool → Partyseite-CTA → Creator öffnet mit vorbefüllten Feldern → Partyseite fertigstellen → Newsletter-Checkbox + E-Mail → zwei Mails checken (Edit-Link + DOI) → DOI klicken → Contact in Resend-Audience sichtbar

## Nächste Schritte

### Kurzfristig (nach Umami-Smoke-Test und P1-15-Smoke-Test)
- **2 Wochen messen:** Opt-In-Rate der Newsletter-Checkbox bei Partyseite-Erstellern + Click-Rate des Partyseite-CTAs im Einladungstool. Bei <10% Opt-In: UX-Überarbeitung Checkbox-Text oder Platzierung.
- **DOI-Confirm-Rate tracken:** Umami-Event auf `/api/newsletter-confirm` zählen vs. `newsletter-opt-in`-Events

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

- **Plausible ist vollständig weg aus dem Code** — keine plausible.io-Referenzen mehr in HTML/JS
- **Umami-Tracking live** auf allen statischen Seiten nach Netlify-Build
- **Worker-Tracking (Creator + Partyseite)** live nach manuellem Worker-Deploy
- **P1-15 Feature produktionsreif** — Newsletter-DOI-Flow funktional, bereit für realen Smoke-Test
- **Repo:** 40 PBIs in Roadmap, P1-15 Code + Deploy komplett (Variante A), wartet nur noch auf Bolle-Smoke-Tests
