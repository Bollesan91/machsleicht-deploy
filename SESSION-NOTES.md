# Session-Notizen

## Cowork-Session (21.04.2026, Opus 4.7, Teil 2) — Piraten-Einladung Migration + Hub-Seite

### Was gemacht (strukturelle Aufräum-Action „ein für alle mal")

**Problem:** Piraten-Einladung lebte unter `/einladung/index.html` direkt, während alle 9 anderen Mottos unter `/einladung/<motto>/index.html` liegen. Folge: `party-worker.js` baut für alle Mottos die URL `/einladung/${motto}/?...` — für Piraten ergab das `/einladung/piraten/?...` → **404 in Partyseiten-Vorschau**. Special-Case in `netlify/functions/serve-invite.mjs` fing das für den `/e/<slug>`-Kurzlink-Flow ab (piraten → `/einladung/`), aber für die Vorschau im Worker griff das nicht.

**Lösung (Option A: Hub-Seite):**
- `einladung/piraten/index.html` neu angelegt (Inhalt aus altem `einladung/index.html` kopiert, Canonical `→ /einladung/piraten`, Breadcrumb erweitert um Listitem 3 „Piraten-Einladung")
- `einladung/index.html` zur **Hub-Seite** umgebaut: klarer H1 „Einladung zum Kindergeburtstag", 10 Motto-Karten (Piraten als Flagship mit Badge), CollectionPage-Schema, BreadcrumbList, CTA zum freien `/einladung/erstellen`-Tool, SEO-Copy für Keyword „einladung kindergeburtstag"
- `netlify/functions/serve-invite.mjs`: Piraten-Sonderregel entfernt, basePath ist jetzt einheitlich `/einladung/${motto}/` für alle 10 Mottos
- `js/index.js`: Feature-Zahl „9 Motto-Designs" → „10 Motto-Designs" korrigiert (PBI-Impact-Check Punkt 4)
- `validate-all.sh`: neue **Stufe 7 „Einladungs-Mottos"** — prüft dass jedes Motto in VALID_MOTTOS sein eigenes `/einladung/<motto>/index.html` hat, dass der Hub-Canonical `/einladung` ist, und dass `serve-invite.mjs` keine Piraten-Sonderregel mehr enthält. So kann das 404-Problem nie wieder auftreten.

**Validator:** `bash validate-all.sh` grün (PASSED, 0 Fehler, 0 Warnungen).

**SEO-Trade-Off (akzeptiert):** `/einladung` war vorher für „piraten einladung" indexiert — dieser Rank löst sich auf, muss neu auf `/einladung/piraten` aufgebaut werden (4–8 Wochen). Gleichzeitig bekommt `/einladung` als Hub eine klare Intent-Match für das stärkere Keyword „einladung kindergeburtstag". Kein 301-Redirect gesetzt, weil die alte URL jetzt sinnvoller Hub-Content ist und Google das als Content-Restructure einordnen sollte.

### Offen (weiterhin vor nächstem PBI nachholen)

- **DSGVO Sub-Tasks** (aus Teil 1):
  - A) Datenschutz-Hinweis über Send-Button im Email-Box-Bereich der Partyseite
  - B) Datenschutzerklärung auf `/datenschutz` erweitern (Resend + Cloudflare KV als AV)
  - C) Worker-Cron für Auto-Delete der Party-Daten 90 Tage nach Partydatum
- **P1-16 Follow-Ups** (Foto-Crop, Reply-To, Mottos-Test, alte `guestView()`-Cleanup, Kill List, Beteiligen custom amount)
- **P1-15** Pilot auf Einladung (Resend-Audience anlegen + DOI-Flow im Worker)

---

## Cowork-Session (21.04.2026, Opus 4.7, Teil 1) — P1-16 Follow-Ups + DSGVO-Decision + Resend-Konsolidierung

### Was gemacht

**1. party-worker.js erweitert (FIX11, lokal im Repo, NICHT deployed):**
- **Pflichtfeld-Validierung im Erstellen-Flow:** rote Sterne `*` an Childname, Alter, Datum, Uhrzeit, Adresse. Inline-Errors („Bitte ausfüllen") + Auto-Scroll zum ersten fehlenden Feld + Cleared-on-Input. `goStep()` validiert nur Vorwärts-Sprünge, `createParty()` validiert komplettes Formular am Ende.
- **Email-Gate umgebaut:** Vorschau ist sofort sichtbar (Vertrauen schaffen), nur **Bearbeiten + Gäste-Link** sind hinter dem Email-Send gated (psychologisches Commitment + harter Gate am Share-Moment).
- **Modal-Pattern statt `target="_blank"`:** Vorschau und Bearbeiten öffnen jetzt einen In-Tab Modal-Overlay mit iframe (`?preview=1&edit=<token>` Param fürs Preview-Bypass des Code-Gates). Same-Origin iframe von party.machsleicht.de auf sich selbst.
- **Modal als Panel** (nicht Full-Screen): 16px Padding, max-width 520px, abgerundete Ecken, Shadow → User behält visuell die „darunter liegende Seite" und fühlt sich nicht „lost".
- Stand: party-worker.js lokal bei ~1627 Zeilen, deployment-ready (im Laufe von Teil 1 manuell auf Cloudflare deployed).

**2. Backlog erweitert um P2-22 „Site-Wide In-App-Frame":**
- Detail-PBI mit 3-Phasen-Plan: Phase 1 (interne Vorschauen seitenweit), Phase 2 (OG-Preview-Cards für externe Affiliate-Links statt iframe — weil Amazon X-Frame-Options blockt), Phase 3 (Return-Loop „Hast du das besorgt? ✓ Ja"-Toast nach Tab-Rückkehr).
- Wichtige Architektur-Entscheidung dokumentiert: **kein Server-Proxy für Amazon-iframe** (bricht Affiliate-Tracking, ToS-Risiko). Stattdessen OG-Preview als „In-App-Gefühl ohne iframe-Tretminen".
- Eingeordnet als Sequenz #24 in Mittelfristig (Mai–Juli), Folgenummerierung um +1 verschoben.

**3. DSGVO-Decision (in Diskussion getroffen, noch nicht implementiert):**
- Transactional Email (Edit-Link): kein Checkbox-Zwang, aber **Datenschutz-Hinweis über dem Send-Button** wird Pflicht
- Marketing/Newsletter (für P1-15): **separater Opt-In-Haken**, nicht vorangekreuzt, mit Zweck/Frequenz/Abbestell-Klausel, Double-Opt-In zwingend
- Drei Mini-Sub-Tasks identifiziert: A) Datenschutz-Hinweis bei Email-Box (10 Min), B) Datenschutzerklärung um Partyseite-Abschnitt erweitern (30 Min), C) Auto-Delete via Worker-Cron 90 Tage nach Party-Datum (1 Std). **Noch keine PBI-Eintragung — beim nächsten Touchpoint nachholen.**

**4. Resend-Konsolidierung (kritischer Fix):**
- Bolle hat richtiggestellt: **Email-Tool ist Resend, nicht MailerLite** (Resend läuft bereits transactional, Audiences + Broadcasts auch verfügbar).
- Alle 13 MailerLite-Erwähnungen aus dem Repo entfernt (BACKLOG-AUDIT.md, SESSION-NOTES.md, STRATEGIE.md).
- **CLAUDE.md neuer Tech-Stack-Abschnitt:** Resend als verbindliches Tool festgeschrieben, mit Begründung (ein Silo, gemeinsame Sender-Reputation, kein zweiter AV-Vertrag, Double-Opt-In selbst gebaut).
- **Konsequenz für P1-15:** Status 🚧 → ⏳, kein externer Blocker mehr. Setup ist nur noch: Resend-Audience im Dashboard anlegen + DOI-Flow im Worker bauen (~30 Zeilen).

**5. Prio-Decision P1-15:**
- Bleibt bei Sequenz #9 (nach P1-16). DSGVO-Pattern wird in P1-16 etabliert (Datenschutz-Hinweis bei Edit-Link-Mail) und in P1-15 wiederverwendet (Newsletter-Opt-In-Checkbox), statt parallel doppelt zu bauen.

**6. CLAUDE.md Cowork-Git-Workflow aktualisiert:**
- Neuer Standard: Claude führt Git-Operationen selbst aus via PAT-Workaround (frischer Clone in `/tmp`, Files aus Mount rüberkopieren, commit + push). Kein Terminal-Block mehr für den User nötig. User bekommt nur noch die Commit-Hashes zur Bestätigung.

### Status der lokalen Datei (Ende Teil 1)
- `party-worker.js` FIX11 manuell auf Cloudflare deployed (Bolle hat's gemacht).

---

## Letzte Sessions (20.04.2026)

Heute zwei Sessions parallel: Desktop morgens (#4), Mobile abends (#2). Reihenfolge in der Repo-Historie war Mobile zuerst (auf main), dann Desktop (auf draft). Beim „ende" zusammengeführt mit `merge main into draft`.

### Mobile-Session #2 (abends, Opus 4.7) — Bugfix + Strategie

**1. Partyseite-Bugfix (Commit `a694178`)** — Mobile-Live-Test deckte 2 Bugs auf:
- `null is not an object ('mailtoLink')` beim Erstellen → Legacy-Zeile aus dem Resend-Redesign entfernt
- iOS Uhrzeit-Feld kollabiert in Flex-Container → `min-width:0` + `box-sizing:border-box` gefixt

**2. Backlog-Update (Commit `75bdb2c`)** — P1-16 „Partyseite Follow-Ups" als Sequenz #8 aufgenommen (Cloudflare-Deploy, Email-Test, Reply-To, Cleanup, Live-Test, Foto-Crop, Beteiligen custom amount, Kill List).

**3. Strategie 0.7 + 0.8 (Commit `41e7e17`)** — 0.7 Monetarisierungs-Validierungs-Reihenfolge (Zahlungsbereitschaft → Preispunkt → Retention → Abo), 0.8 Was wir bewusst NICHT bauen (9 Ideen verworfen mit Re-Evaluation-Trigger).

**4. Token rotiert** — Neuer GitHub PAT in lokaler Remote-URL eingebaut.

### Desktop-Session #4 (morgens, Opus 4.7) — Workflow + P1-15-Schliff (Commit `6740467`)

**1. CLAUDE.md neu geschrieben:** draft/main-Workflow + PBI-Impact-Check als harte Regel (8 Downstream-Orte), Deploy-Regel explizit.

**2. P1-15 strategisch neu gefasst:** Link zum fertigen Asset (Einladung) statt PDF-Köder, Mini-MVP statt jsPDF, Pilot auf Einladung, Status ⏳.

## Offene Fragen
- Einhorn oder Paw Patrol als nächstes Elite-Motto (P1-8)?
- Awin-Freischaltung: Wann kommt die Publisher-ID?
- Demo-Einladung: Welches Stock-Foto als Beispiel-Kind?
- Reply-To: `party@machsleicht.de` über Cloudflare Email Routing oder Resend?

## Status der Site
- Partyseite-Erstellung: **LIVE** (FIX11 deployed am 21.04.2026).
- Einladung: jetzt 10 Mottos mit eigenen Landing-URLs + Hub auf `/einladung`.
- Repo: 37 PBIs in Roadmap, 8 erledigt, 1 in Arbeit (P1-15 ⏳).
- STRATEGIE.md: 8 Leitplanken-Abschnitte (0.1 bis 0.8).
- Sitemap: 223 URLs (unverändert — Hub `/einladung` existiert schon, `/einladung/piraten` ist noch NICHT in Sitemap).
