# Session-Notizen

## Cowork-Session (21.04.2026, Opus 4.7, Teil 5) — Einhorn 6–8 Jahre Elite-Niveau

### Was gemacht

**einhorn-6-8-jahre.html auf Elite-Niveau gebracht** — von vorher 19 KB / 303 Zeilen auf jetzt **68 KB / 807 Zeilen**, Audit-Score 85% / 3500 Wörter (Dino: 63 KB, Piraten: 85% / 2262W). Einhorn liegt damit in Wort-Tiefe über Piraten.

**Narrativ:** „Regenbogen-Wächter-Ausbildung" als Pendant zur Dino-Paläontologen-Ausbildung. Die Kinder werden ausgebildet, absolvieren Prüfungen, bekommen eine Wächter-Urkunde. Bewusst geschlechtsneutral gehalten — nicht rosa-Prinzessin, sondern Prüfungen und Experimente.

**Signature-Elemente:**
- Sternenstaub-Schatzsuche (Reis + essbarer Glitzer — wiederverwendbar)
- Regenbogen-Milch-Experiment (echte Physik: Spülmittel zerstört Oberflächenspannung — Wow-Moment wie Vulkan bei Dino)
- Regenbogen-Parcours (Tücher in Regenbogen-Reihenfolge)
- Einhorn-Seife gießen (Glycerin + Silikon-Förmchen — Mitgebsel-Factory)
- Wolkenwald-Rätselrallye in Wow (5 Stationen mit Hufspuren-Fakt-Rätsel, kein Regenbogen-Redundanz)
- „Einhorn-Tränen" statt „Dino-Pipi" (rosa Limo)
- Regenbogen-Wolkenkuchen mit 2 Fondant-Fallback-Varianten
- Wow-Produkt: aufblasbares Einhorn-Kostüm (Pendant zum T-Rex)

**Review-Prozess (2 Runden Selbstkritik):**
- Runde 1: 18/18 technische Elite-Checks — wirkte aber „zu gut für einen ersten Run"
- Runde 2 auf Nachfrage: 4 echte Must-Fixes gefunden:
  1. Gender-Inkonsistenz (Wächter·innen vs Wächter) — auf komplett neutral umgestellt (19× „Wächter")
  2. Rätsel-Redundanz (2 Stationen Regenbogen-Farben) — Station 2 auf Hufspuren-Rätsel umgebaut
  3. Sternenstaub-Standard fehlende Game-Tags (3/5) — ergänzt auf 5/5
  4. FAQ „auch für Jungs" defensiver Ton — zu „gemischte Gruppen" umformuliert
- Runde 3 nach Fixes: 1 Nice-to-have (Fondant-Fallback-Box) — eingebaut

**Bekannte Schwächen (nicht gefixt in Teil 5, für späteren Refactor):**
- Luna-Mondsilber-Namenskonzept ohne mitgelieferte Namensliste (vages Versprechen ohne Einlösung)
- Keine eigenständige Einhorn-Signature-Mechanik, die Dino nicht hat (Glitzer-Tattoos / Mähne-flechten wäre Potenzial)
- `einhorn-quiz.html` und `einhorn-waechterpass.html` als Druckvorlagen fehlen (Dino hat beide) → neues PBI offen

### Offen für nächste Laptop-Session
- Einhorn 3-5 Jahre auf Elite-Niveau (Narrativ wiederverwenden, altersgerecht anpassen — keine Prüfungen, mehr Staunen)
- Einhorn 9-12 Jahre auf Elite-Niveau (Narrativ ausbauen, Wissens-Quiz prominenter, ältere Bezüge)
- Einhorn-Quiz + Einhorn-Wächterpass als Druckvorlagen (~2 Std je)
- Story-Framing-Doc als Pattern für nächste Mottos (Safari, Weltraum, Feuerwehr)
- DSGVO A (Worker-Hinweis) + C (Cron) weiterhin offen

### Status-Snapshot nach Teil 5
- Einhorn 6-8: Elite ✅ (85% Audit-Score, 3500W, Dino-Parität)
- Einhorn 3-5 + 9-12: Standard (noch ~19 KB)
- Nächstes Elite-Ziel: Safari 6-8 ODER Einhorn 3-5 (je nachdem was du bevorzugst)
- Repo: 40 PBIs, P1-8 in Teil-Fortschritt

---

## Cowork-Session (21.04.2026, Opus 4.7, Teil 4) — DSGVO-Hygiene + Motto-Roadmap + Content-Inseln

### Was gemacht

**1. Datenschutzerklärung erweitert (`datenschutz.html`):**
- Neuer **§10 Partyseite**: Cloudflare Workers KV als Auftragsverarbeiter, 90-Tage-Retention bewusst weich formuliert („spätestens 90 Tage") weil Auto-Delete-Cron (DSGVO C) noch nicht live ist. Manuelle Löschung per Mail als Fallback. Schützt rechtlich, bis Cron deployed ist.
- Neuer **§11 E-Mail-Versand (Resend)**: AV-Vertrag, EU-US DPF, expliziter Hinweis „keine Werbe-Mails ohne DOI-Einwilligung" (adressiert DSGVO-Teil-1-Decision).
- Alle folgenden §§ um +2 umnummeriert (Plausible §12, Rechte §13, Beschwerderecht §14, Änderungen §15). Stand auf April 2026.
- Validator 7/7 grün.

**2. Backlog-Pflege — neues Ticket P1-17 „DSGVO-Hygiene Partyseite":**
- Prio-Tabelle Zeile 10 (zwischen P1-15 und P2-20), Status 🔄 in Arbeit.
- Detail-Block mit Sub-Tasks A (Worker-Hinweis, offen), B (Datenschutz, ✅ heute), C (Auto-Delete-Cron, offen).
- Aufwand A+C gebündelt: 1,5 Std Laptop-Session, zusammen mit P1-16.
- Nachfolgende Prio-Nummern korrekt um +1 hochnummeriert (1–40 lückenlos).

**3. Einhorn vs. Paw Patrol entschieden → Einhorn:**
- IP-Risiko Paw Patrol (Spin Master aktiv bei Markenschutz), Zielgruppe eng (3–5 Jahre), Content-Insel.
- Einhorn hat Ökosystem-Anschluss (Einladung ✅, Schatzsuche ✅).

**4. Content-Inseln entdeckt (unerwarteter Befund beim Motto-Audit):**
- Pferde, Ritter, Zirkus, Baustelle haben `/kindergeburtstag/`-Seiten + 3 Altersgruppen + OG-Bild, sind aber nicht in `/einladung/` oder `/schatzsuche/` → kein Conversion-Pfad.
- Aus P1-8 ausgeklammert, neues Ticket **P1-8b** angelegt (Prio-Tabelle Zeile 26): Optionen A Integration / B Streichen (301) / C Status Quo. Braucht GSC-Daten für Entscheidung.
- Spiegel-Befund: Schatzsuche-Mottos „Dschungel" und „Feen" haben keine `/kindergeburtstag/`-Pendants — später einordnen.

**5. P1-8 neu gefasst mit Ökosystem-Matrix:**
- Detail-Block enthält jetzt vollständige Tabelle aller 19 Mottos mit IP-Status + Main/Altersgruppen/Einladung/Schatzsuche-Status.
- Reihenfolge (nur Tool-integrierte markenfreie Mottos): Einhorn → Safari → Weltraum → Feuerwehr → Detektiv → Meerjungfrau → Prinzessin/Superheld.
- Aufwand realistisch: ~4,5–5 Std pro Motto (nicht 1–2, weil 3 Altersgruppen-Seiten pro Motto).
- Prinzessin und Superheld als Sonderfall: keine Altersgruppen-Seiten vorhanden → ~6 Std (3 neue Seiten).

### Offen für nächste Laptop-Session
- DSGVO A: Datenschutz-Hinweis im Partyseite-Email-Box-Bereich (Worker-Code, 10 Min + Deploy)
- DSGVO C: Auto-Delete-Cron (1 Std + Deploy, danach §10 schärfen auf „automatisiert")
- P1-16 Restarbeiten (Foto-Crop, Reply-To, Cleanup, Kill List)
- P1-8 Einhorn-Ausbau: Story-Framing definieren vor Code (z.B. „Einhorn-Abenteuer im Wolkenwald")

### Status-Snapshot nach Teil 4
- Partyseite: LIVE (FIX11)
- Einladung: 10 Mottos mit Landing + Hub
- Datenschutz: §§10+11 ergänzt (Partyseite + Resend)
- Backlog: 40 PBIs sortiert, 8 ✅, 1 🔄 (P1-17 DSGVO-Hygiene)
- Motto-Roadmap: Einhorn als nächstes, Content-Inseln separat

---

## Cowork-Session (21.04.2026, Opus 4.7, Teil 3) — PBI-Impact-Check Follow-Up + Workflow-Haertung

### Was gemacht

Nach der Piraten-Migration (Teil 2) den PBI-Impact-Check formal durchgegangen. Zwei Stellen waren noch nicht mitgezogen:

- **`sitemap.xml`** — `/einladung/piraten` fehlte. Eintrag alphabetisch zwischen meerjungfrau und prinzessin eingefuegt (priority 0.8 wie andere Flagship-Mottos, lastmod 2026-04-21).
- **`index.html` Zeile 302 (SEO-Fallback)** — die Motto-Link-Aufzaehlung nannte nur 6 von 10 Mottos (Dino/Einhorn/Weltraum/Safari/Detektiv/Feuerwehr). Piraten fehlte komplett (historisch, weil Piraten frueher unter `/einladung` direkt lag). Jetzt alle 10 Mottos namentlich verlinkt, Piraten zuerst (Flagship), danach die 9 weiteren.

**Commits:**
- `e67f908` (draft) / `2dfec4e` (main merge) — PBI-Impact-Check Follow-Up

**Zusaetzlich: CLAUDE.md-Haertung** — die beiden wiederkehrenden Fehler aus dieser Session im Cowork-PAT-Workflow dokumentiert, damit sie nicht nochmal passieren:

1. **`-c user.name/email` ist PFLICHT bei commit UND merge.** Die Cowork-Sandbox hat kein konfiguriertes Git-Identity. Ohne die Flags failt `git commit`/`git merge` mit `fatal: unable to auto-detect email address`, aber der nachfolgende `git push` meldet trotzdem "OK" (weil nichts zu pushen ist). Fehler verschluckt. Workflow jetzt: `-c`-Flags in allen Code-Beispielen + Pflicht-Gegencheck via `git log --oneline -3 main` nach dem Push.
2. **NUL-Padding via Windows-Mount.** Das `Write`-Tool hinterlaesst Dateien auf dem Mount gelegentlich mit NUL-Bytes am Ende. Workflow: nach jedem Write auf Mount via Python rstrip-Check verifizieren, ggf. `head -c <size>` truncaten. Fuer laengere Inhalte lieber direkt via bash-heredoc auf Mount schreiben.

**Commit:** `13350d6` (draft, kein Deploy — CLAUDE.md ist nicht live-relevant).

### Alle Commits dieser Session-Tranche (21.04.2026 ab Mittag)

| Hash | Branch | Inhalt | Deploy |
|------|--------|--------|--------|
| `4af3456` | draft | Piraten-Einladung Migration: Hub-Seite + einheitliches URL-Schema | — |
| `80075af` | main | Merge draft: Piraten-Einladung Migration + Hub | ✓ |
| `e67f908` | draft | PBI-Impact-Check Follow-Up: Sitemap + SEO-Fallback | — |
| `2dfec4e` | main | Merge draft: PBI-Impact-Check Follow-Up | ✓ |
| `13350d6` | draft | CLAUDE.md: Cowork-Git-Workflow robuster | — |

### Zustand zum Ende

Validator: `PASSED`. Stufe 7 (neue Einladungs-Motto-Regel) greift. Sitemap hat alle 10 Motto-URLs + den Hub. SEO-Fallback-Text in index.html listet alle 10 Mottos namentlich. Keine toten internen Links gefunden.

---

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
- Awin-Freischaltung: Wann kommt die Publisher-ID?
- Demo-Einladung: Welches Stock-Foto als Beispiel-Kind?
- Reply-To: `party@machsleicht.de` über Cloudflare Email Routing oder Resend?

## Entschieden am 21.04.2026 (Teil 4)
- **Einhorn als nächstes Elite-Motto** (P1-8) — nicht Paw Patrol. Begründung: IP-Risiko bei Paw Patrol (Spin Master), Zielgruppe eng, Content-Insel. Neue Reihenfolge (nur Tool-integrierte markenfreie Mottos): Einhorn → Safari → Weltraum → Feuerwehr → Detektiv → Meerjungfrau → Prinzessin/Superheld (letztere brauchen komplett neue Altersgruppen-Seiten). Marken-Mottos (Paw Patrol, Frozen, Pokemon, Minecraft, Ninjago) zurückgestellt.
- **Content-Inseln identifiziert:** Pferde, Ritter, Zirkus, Baustelle haben zwar `/kindergeburtstag/`-Seiten + Altersgruppen + OG-Bild, sind aber weder in `/einladung/` noch in `/schatzsuche/` vertreten → kein Conversion-Pfad. Aus P1-8 ausgeklammert, neues Ticket **P1-8b Content-Inseln-Strategie** angelegt (Integration vs. Streichen, GSC-Daten abwarten).
- **Zusätzlich geparkt:** Schatzsuche-Mottos „Dschungel" und „Feen" existieren als Schatzsuche-Seiten, haben aber keine `/kindergeburtstag/`-Pendants. Spiegelbildlicher Fall, später einordnen.
- **Backlog P1-17 „DSGVO-Hygiene Partyseite"** als Zeile 10 der Prio-Tabelle aufgenommen. Sub-Task B (Datenschutzerklärung §§10–11) erledigt, A+C offen (beide Laptop-Session mit Cloudflare-Deploy).

## Status der Site
- Partyseite-Erstellung: **LIVE** (FIX11 deployed am 21.04.2026).
- Einladung: jetzt 10 Mottos mit eigenen Landing-URLs + Hub auf `/einladung`.
- Repo: 37 PBIs in Roadmap, 8 erledigt, 1 in Arbeit (P1-15 ⏳).
- STRATEGIE.md: 8 Leitplanken-Abschnitte (0.1 bis 0.8).
- Sitemap: 223 URLs (unverändert — Hub `/einladung` existiert schon, `/einladung/piraten` ist noch NICHT in Sitemap).
