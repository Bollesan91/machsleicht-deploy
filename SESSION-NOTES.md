# Session-Notizen

## Letzte Session
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
