# machsleicht.de — Backlog

**Letzte Aktualisierung:** 16.04.2026
**Status-Check:** Repository-weit durchgeführt, gegen Live-Stand abgeglichen.
**Zweck:** Einzige Quelle für alle offenen und erledigten PBIs. Strategie-Kontext steht in `STRATEGIE.md`.

---

## Prio-Tabelle (Schnellübersicht)

| Status | Prio | Ticket | Kurzbeschreibung |
|--------|------|--------|------------------|
| ⏳ | P0 | P0-1 | Google Search Console einrichten + Sitemap einreichen |
| ⏳ | P0 | P1-5 | **GitHub Token rotieren** — Deadline 25.04. (9 Tage!) |
| ⏳ | P1 | P1-4 | Einladungs-Tool: Default-Motto neutralisieren |
| ⏳ | P1 | P1-7 | Social Proof auf Homepage und Planer-Seite |
| ⏳ | P1 | P1-8 | Motto-Hauptseiten auf Elite-Niveau (Piraten als nächstes) |
| ⏳ | P1 | P1-9 | /einladung als SEO-Hub aufbauen |
| ⏳ | P1 | P1-10 | **Cloudflare Worker deployen** — Rätsel nach Maß + Partyseite live bringen (Revenue!) |
| ⏳ | P1 | P1-11 | **Ratgeber-Seiten auf 85% hochziehen** (11 verbleibende Seiten) |
| ⏳ | P2 | P2-1 | Homepage-Hero gemäß FUNNEL-AXIOM umbauen (Entscheidung steht) |
| ⏳ | P2 | P2-2 | Thin Content bei Motto×Altersgruppen-Seiten nachschärfen |
| ⏳ | P2 | P2-3 | Ergebnis-Vorschauen auf Produktseiten |
| ⏳ | P2 | P2-5 | Performance-Verbesserung (JS-Bundle, lazy loading) |
| ⏳ | P2 | P2-8 | /kreuzwortraetsel pre-rendern |
| ⏳ | P2 | P2-10 | Einladungstool: 7 fehlende Lizenz-Mottos (Voraussetzung für P1-9) |
| ⏳ | P2 | P2-13 | **Gumroad: 2 Digital-Produkte launchen** (Piraten + Dino Bundle) |
| ⏳ | P2 | P2-14 | **Affiliate-Sweep auf 16 Ratgeber-Seiten** |
| ⏳ | P2 | P2-15 | **Awin-Anmeldung** (Otto, myToys, Thalia) |
| ⏳ | P3 | P3-1 | Repo aufräumen (Dev-Artefakte) |
| ⏳ | P3 | P3-3 | Social Proof erweitern (echte Nutzerzahlen aus Plausible) |
| ⏳ | P3 | P3-4 | Druckvorlagen pro Motto (Top 5) |
| ⏳ | P3 | P3-5 | E-Mail-Liste aufsetzen (MailerLite + Lead-Magnet) |
| ⏳ | P3 | P3-6 | **machsruhig.de launchen** (eigener Sprint, separates Master-Doc) |
| ⏳ | P4 | P4-1 | PDF-Partybücher pro Motto |
| ⏳ | P4 | P4-2 | Premium-Features (KI-Spielleiter, Einladungs-Audio, Gute-Nacht-Geschichte) |
| ❌ | — | P1-1 | ~~/schatzsuche als eigene Seite~~ — **GESTRICHEN** (Memory #17: bleibt Redirect) |
| ❌ | — | P1-2 | ~~/schnitzeljagd als eigene Seite~~ — **GESTRICHEN** (gleicher Grund) |
| ✅ | — | P0-2 | "0 Spiele"-Bug in Titles |
| ✅ | — | P0-3 | Duplicate Titles auf Motto-Hauptseiten |
| ✅ | — | P0-4 | /_dev/ aus öffentlichem Zugriff sperren |
| ✅ | — | P1-3 | 9 Einladungs-Themenseiten — Canonical-Tags |
| ✅ | — | P1-6 | Schema.org Markup (Breadcrumbs 18/18, FAQPages 13/18, HowTo 6/18) |
| ✅ | — | P2-6 | Encoding-Inkonsistenz in Title-Tags (Elite-Seiten normalisiert) |
| ✅ | — | P2-11 | Interne Links broken/zirkulär auf Ratgeber-Seiten |
| ✅ | — | P3-2 | Amazon Affiliate Tag setzen (**heute! machsleicht-21 konsolidiert, 796 Vorkommen sauber**) |

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
- **Vorher:** 566× falscher Tag `machsleicht21-21` + 230× richtiger `machsleicht-21`
- **Nachher:** 796× einheitlich `machsleicht-21` verteilt auf 16 Dateien
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

#### P1-5: GitHub PAT rotieren
- Token `ghp_V12E...` läuft am **25.04.2026** ab — noch **9 Tage!**
- Neu generieren (Scope `repo`, 90 Tage), in git-sync Skill eintragen, alten widerrufen.
- **Aufwand:** 5 Min.

### P1 — DIESE WOCHE

#### P1-4: Einladungs-Tool Default-Motto neutralisieren
- Bei `/einladung/erstellen` ohne `?motto=` soll kein Motto vorausgewählt sein.
- **Aufwand:** 30–60 Min.

#### P1-7: Social Proof auf Homepage und Planer-Seite
- "Über 4.700 Geburtstage geplant" steht nur auf Piraten-Seite.
- Plausible-Daten auswerten für echten Counter (brauche Zugriff).
- **Aufwand:** 1 Stunde.

#### P1-8: Motto-Hauptseiten auf Elite-Niveau
- **Ist-Stand Dino:** ✅ 6-8, 3-5, 9-12 Elite; Nachpflege pending (Dino 6-8 Header/Breadcrumb/Footer, Dino 3-5 CSS, Dino-Hauptseite Social Proof).
- **Nächstes Motto:** Piraten (6-8 → 3-5 → 9-12)
- **Danach:** Einhorn, Detektiv, Paw Patrol, Meerjungfrau (sortiert nach Suchvolumen).
- **Elite-Checkliste:** Siehe `_dev/docs/ELITE-SEITEN-TEMPLATE.md` (14 Punkte).
- **Aufwand:** ~1–2 Stunden pro Seite.

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
  4. Environment-Variables: `AMAZON_TAG=machsleicht-21`, `AWIN_PUBLISHER_ID` (optional)
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
- **Aufwand:** 2 Stunden.

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
- MailerLite (gratis bis 1.000), DSGVO-konform, Double-Opt-In.
- Lead-Magnet: "Piraten-Einladung kostenlos" oder "Komplette Einkaufsliste".
- Monatlicher Newsletter.
- **Aufwand:** 1 Tag Setup, danach 30 Min/Monat.
- **Revenue-Effekt:** langfristig 1.000–3.000€/Jahr ab 1.000 Kontakten.

#### P3-6: machsruhig.de launchen
- Eigener Sprint, Master-Doc existiert: `SKILL_MACHSRUHIG_MASTER.md` (2.698 Zeilen, 28 Phasen).
- 10 Kernseiten für SEO-Traffic ("Bestatter Kosten", "Vorsorge", "Trauerrede").
- **Revenue-Effekt:** 150–300€ pro Bestatter-Lead. Eine rankende Seite = 1.000€+/Monat.
- **Aufwand:** 2–3 Wochen Content-Sprint.

### P4 — ZUKUNFT

#### P4-1: PDF-Partybücher pro Motto
- Forscher-/Abenteuer-Partybuch als PDF-Download (20–30 Seiten).
- VK 2,99€ via Lemon Squeezy. ~95% Marge.
- Voraussetzung: Traffic muss da sein.

#### P4-2: Premium-Features
- **KI-Spielleiter-Anrufe** via ElevenLabs (~1€ Cost, VK 4,99€). Stimmtest pending.
- **Einladungs-Audio** (~3ct, VK im Bundle).
- **Gute-Nacht-Geschichte** (Claude + ElevenLabs, ~30ct, VK 2,99€).
- **Eltern-Copilot** (Claude, ~50ct/Session, VK 3,99€).
- **Danke-Nachrichten** (Claude, ~0ct, VK 1,99€).
- **Bundle:** 9,99€ für alle Features.
- **Gestrichen:** Foto-Erzähler (DSGVO), Geburtstagssong (DE-Musik-AI zu schwach).

---

## Offene Fragen

- Reihenfolge nach Piraten-Elite: Einhorn oder Paw Patrol (Lizenz-Motto mit höchstem Suchvolumen)?
- Skalierung Motto-Seiten: manuell oder Content-Generator mit Claude API?
- Free vs. Premium-Mix: welche Features bleiben kostenlos als Lead-Magnet?
- Cloudflare Worker Deploy: manuell im Dashboard oder wrangler CLI?

---

## Content-Referenz: Elite-Motto×Altersgruppe-Template

Jede der Ziel-60-Seiten (20 Mottos × 3 Altersgruppen) braucht laut ELITE-SEITEN-TEMPLATE.md:

1. **Altersgruppen-Intro** — 3 Versionen (3-5, 6-8, 9-12), wiederverwendbar
2. **3 Party-Varianten** (Minimal / Standard / Wow) — Zeitplan mit Uhrzeiten, 5 Spiele pro Gruppe, Essen mit Mengen, Deko mit Preisen, Mitgebsel, Gesamtkosten
3. **Kuchen-Rezept**
4. **Eltern-Tipps** (Allergien, Plan B, Partyseite, Helfer-Regel)
5. **FAQ** (4 Fragen, FAQPage-Schema)
6. **CTAs** nach jeder Sektion
7. **WhatsApp-Share**
8. **Altersgruppen-Navigation**

Druckvorlagen pro Motto (P3-4): Ausweis, Urkunde, Quiz, Masken.

Affiliate-Kategorien pro Motto: Figuren-Set, Masken/Verkleidung, Partygeschirr, Stempel, Werkzeug. **Kostüm ist das margenträchtigste Affiliate-Produkt** (~1,20€ pro Klick vs. ~0,10€ bei Figuren).

---

## Versionshistorie

- **16.04.2026:** Backlog komplett neu strukturiert. Status-Matrix aus Repo-Check gegen Live-Stand abgeleitet. P1-1 und P1-2 gestrichen (Architektur-Memory #17). Neue PBIs aus Monetarisierungs-Strategie aufgenommen (P1-10, P1-11, P2-13 bis P2-15, P3-5, P3-6).
- **15.04.2026:** FUNNEL-AXIOM als P2-1 fixiert. Audit-Findings aufgenommen (P1-6, P1-7, P2-8, P2-9, P2-10, P2-11).
- **11.04.2026:** Ursprünglich erstellt aus technischem + strategischem Audit.
