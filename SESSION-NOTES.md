# Session-Notizen

## Letzte Session
**Datum:** 24.04.2026 (Opus 4.7) — P1-15 Email-Capture fertig gebaut, Variante A (Partyseite-Creator)

## Was wurde gemacht

### P1-15 Email-Capture — Variante A umgesetzt

**Strategische Revision während Session:** Ursprünglich war Capture am Einladungstool-Output geplant (Link-per-Mail + Newsletter-DOI). Kritische Prüfung ergab: falscher Ort, schwacher Köder, DSGVO-Fallen. Link-Pflichtfeld brächte nur Transactional-Mails, keine echten Newsletter-Abos. **Neue Architektur:** Capture sitzt am Partyseite-Creator (Pflicht-Edit-Link + optionale Newsletter-Checkbox mit DOI). Einladungstool bekommt aktivierten Partyseite-CTA mit Query-Param-Handover als Funnel-Bridge.

**Neuer Funnel:**
```
Einladungstool → (Daten-Handover) → Partyseite-Creator → Partyseite live
                                         ↓
                      Edit-Link-Mail (PFLICHT) + Newsletter (OPTIONAL, DOI)
```

### Code-Änderungen

**`party-worker.js`:**
- `/api/invite-email` **entfernt** (Fehlversuch aus früherer Iteration)
- `/api/party/:id/send-edit-link` **erweitert** um optionalen `newsletterOptIn`-Param: triggert zusätzliche DOI-Mail
- Origin-Check (CORS-Hardening): nur `machsleicht.de`/`party.machsleicht.de` dürfen den Endpoint nutzen
- `/api/newsletter-confirm?token=<token>` **neu**: validiert DOI-Token, fügt Contact in Resend-Audience (`env.RESEND_AUDIENCE_ID`), zeigt Erfolgsseite, schreibt dauerhaften Consent-Audit-Trail (`consent:<sha256(email)>`)
- `doiPage()`-Helper am Dateiende
- Creator-Prefill akzeptiert nun `childName`, `age`, `motto`, `mottoEmoji`, `mottoColor` als Query-Params
- Newsletter-Checkbox im Creator-HTML unter dem E-Mail-Feld
- `sendEditEmail()` mit Plausible-Events (`edit-link-email-submit`, `newsletter-opt-in`) und angepasster Success-Message

**`einladung/erstellen/index.html`:**
- Partyseite-CTA aktiviert (war auskommentiert für P1-10-Zeitraum)
- Query-Param-Handover beim Klick: `childName`, `motto`, `mottoEmoji` → Partyseite-Creator hat alles vorausgefüllt
- Plausible-Event `invite-to-party-cta`
- Kein separater Email-Capture-Block — sauberer Hand-off, keine Konkurrenz-CTAs

**`datenschutz.html`:**
- §11 auf Partyseite-Kontext umformuliert
- Rechtsgrundlagen: Art. 6 Abs. 1 lit. b (Vertragserfüllung — Edit-Link ohne Mail nicht möglich) + lit. a (Einwilligung für Newsletter)
- Newsletter-DOI-Flow explizit dokumentiert
- Consent-Audit-Trail dokumentiert (Zeitpunkt, IP, User-Agent, Aufbewahrung bis zu 3 Jahre gem. Art. 7 Abs. 1 DSGVO)
- Widerrufs-Mechanismus (Abmelde-Link + Mail an kontakt@)
- Changelog-Header aktualisiert

**`BACKLOG-AUDIT.md`:**
- P1-15 Status `⏳` → `🔄` (Code fertig, extern offen)
- Beschreibung auf Variante A umformuliert

### Quality-Gate
- `validate-all.sh`: PASSED (alle Checks grün)
- `node --check party-worker.js`: OK
- Einladungstool-JS: OK
- Zero Leftovers (kein Code aus altem Ansatz übrig)

## Extern-Tasks für Bolle (VOR echtem Go-Live des Features)

1. **Resend-Audience anlegen:** Dashboard → Audiences → New Audience → Name `machsleicht-newsletter` → **Audience-ID kopieren**
2. **Cloudflare-Worker Env-Var setzen:** `RESEND_AUDIENCE_ID=<ID aus Schritt 1>`
3. **Worker deployen** (manuell, wie bisher)
4. **Plausible-Events im Dashboard einrichten:** `edit-link-email-submit`, `newsletter-opt-in`, `invite-to-party-cta`
5. **Smoke-Test Ende-zu-Ende:**
   - Einladung im Einladungstool erstellen
   - Partyseite-CTA klicken → Creator öffnet mit vorbefüllten Feldern
   - Partyseite fertigstellen
   - Newsletter-Checkbox aktivieren + E-Mail eingeben + "Edit-Link per E-Mail erhalten"
   - Zwei Mails checken (Edit-Link + DOI-Bestätigung)
   - DOI-Bestätigungslink klicken → Erfolgsseite, Contact in Resend-Audience sichtbar

## Nächste Schritte

### Kurzfristig (nach Go-Live Smoke-Test)
- **2 Wochen messen:** Opt-In-Rate der Newsletter-Checkbox bei Partyseite-Erstellern + Click-Rate des Partyseite-CTAs im Einladungstool. Bei <10% Opt-In: UX-Überarbeitung Checkbox-Text oder Platzierung.
- **DOI-Confirm-Rate tracken:** Plausible-Pageview auf `/api/newsletter-confirm` zählen vs. `newsletter-opt-in`-Events

### P1-15 Follow-ups (nach Datenpunkten)
- **Schatzsuche-Capture:** gleiche Mechanik auf Schatzsuche-Output übertragen (1–2h Template-Reuse)
- **Nurture-Flow schreiben (P3-5):** Welcome-Mail, 7-Tage-vorher-Reminder, 1-Tag-vorher-Checkliste. Erinnerungs-Cron als Worker scheduled event.
- **Planer-Output-Capture:** separater Hebel laut Scope — Erinnerungs-Mail 7 Tage vor Geburtstag (kommt von Resend-Nurture-Flow)

### Aus vorheriger Session weiter offen
- **🗓️ 08.05.2026:** Migadu-Trial-Ende — Mini ($90/J) vs. Micro ($19/J) entscheiden
- **GMX-IMAP-Einbindung** für beide Business-Mailboxen (~15 Min)
- **#11 P1-17** DSGVO-Hygiene Partyseite A+C (1,5h)
- **#16 P1-12** Einschulung SEO-Cluster — Launch bis 31.05.

## Offene Fragen

- **Opt-In-Konversion unklar:** Realistische Annahme 15–30% der Partyseite-Ersteller klicken Newsletter-Checkbox. Erste 2 Wochen zeigen ob UX reicht oder angepasst werden muss.
- **Einladung → Partyseite Funnel-Rate:** Noch keine Baseline. Bei <5% Conversion wäre die ganze Variante-A-Architektur unterdimensioniert → dann direkt Capture am Einladungstool nötig.
- **DMARC-Einstellung machsleicht.de:** Aktuell `p=none`, nach 2 Wochen stabiler Warmup-Phase auf `p=quarantine` ziehen.

## Status der Site nach diesem Deploy

- **Code-Änderungen deployed:** einladung/erstellen/index.html (Partyseite-CTA aktiviert), datenschutz.html (§11 Newsletter-DOI)
- **Worker-Änderungen im Repo, aber NICHT live:** party-worker.js wartet auf manuellen Cloudflare-Deploy + neue Env-Var `RESEND_AUDIENCE_ID`
- **Feature erst komplett nutzbar nach Worker-Deploy:** Ohne Worker-Deploy landen Newsletter-Checkbox-Klicks im "alten" send-edit-link-Endpoint, der den Parameter ignoriert → User bekommt Edit-Link, aber keine DOI-Mail. Kein Fehler, nur kein Newsletter-Opt-In-Effekt.
- **Repo:** 40 PBIs in Roadmap, P1-15 Code fertig (Variante A), wartet auf Extern-Tasks von Bolle
