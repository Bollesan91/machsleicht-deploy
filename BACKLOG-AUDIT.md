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
| ⏳ | P1 | P1-7 | Social Proof auf Homepage und Planer-Seite |
| ⏳ | P1 | P1-8 | Motto-Hauptseiten auf Elite-Niveau (Piraten als nächstes) |
| ⏳ | P1 | P1-9 | /einladung als SEO-Hub aufbauen |
| ⏳ | P1 | P1-10 | **Cloudflare Worker deployen** — Rätsel nach Maß + Partyseite live bringen (Revenue!) |
| ⏳ | P1 | P1-11 | **Ratgeber-Seiten auf 85% hochziehen** (11 verbleibende Seiten) |
| ⏳ | P1 | P1-12 | **Einschulungs-Planer bauen** (SEO-Peak Juli–August, Launch Mai!) |
| ⏳ | P1 | P1-13 | **Adventskalender-Builder** (24 KI-Türchen, SEO-Peak Okt-Dez, Launch Aug!) |
| ⏳ | P1 | P1-14 | **KI-Geschenkeberater** (Geschenke-Keywords, Pre-Christmas-Peak) |
| ⏳ | P2 | P2-1 | Homepage-Hero gemäß FUNNEL-AXIOM umbauen (Entscheidung steht) |
| ⏳ | P2 | P2-2 | Thin Content bei Motto×Altersgruppen-Seiten nachschärfen |
| ⏳ | P2 | P2-3 | Ergebnis-Vorschauen auf Produktseiten |
| ⏳ | P2 | P2-5 | Performance-Verbesserung (JS-Bundle, lazy loading) |
| ⏳ | P2 | P2-8 | /kreuzwortraetsel pre-rendern |
| ⏳ | P2 | P2-10 | Einladungstool: 7 fehlende Lizenz-Mottos (Voraussetzung für P1-9) |
| ⏳ | P2 | P2-13 | **Gumroad: 2 Digital-Produkte launchen** (Piraten + Dino Bundle) |
| ⏳ | P2 | P2-15 | **Awin-Anmeldung** (Otto, myToys, Thalia) |
| ⏳ | P2 | P2-16 | **Mitgebsel-Generator** (KI: Alter+Budget → Liste+Affiliate) |
| ⏳ | P2 | P2-17 | **Standalone /wunschliste** (auch ohne Partyseite, ganzjährig nutzbar) |
| ⏳ | P2 | P2-19 | **HTML-Bug: Doppelte class-Attribute** auf 300 Dateien fixen (`class="X" class="Y"` → `class="X Y"`) |
| ⏳ | P3 | P3-1 | Repo aufräumen (Dev-Artefakte) |
| ⏳ | P3 | P3-3 | Social Proof erweitern (echte Nutzerzahlen aus Plausible) |
| ⏳ | P3 | P3-4 | Druckvorlagen pro Motto (Top 5) |
| ⏳ | P3 | P3-5 | E-Mail-Liste aufsetzen (MailerLite + Lead-Magnet) |
| ⏳ | P3 | P3-6 | **machsruhig.de launchen** (eigener Sprint, separates Master-Doc) |
| ⏳ | P3 | P3-7 | **Klassen-Geburtstagskalender** (viraler Multiplikator: 1 Link → 25 Familien) |
| ⏳ | P3 | P3-8 | **Nachbar-Nachricht-Generator** (viral via Aushänge im Treppenhaus) |
| ⏳ | P3 | P3-9 | **Foto-Spots/Photobooth-Backdrops** (A2-PDF mit dezentem Branding) |
| ⏳ | P3 | P3-10 | **Urkunden/Diplome** (personalisierte Zertifikate nach Party) |
| ⏳ | P4 | P4-1 | PDF-Partybücher pro Motto |
| ⏳ | P4 | P4-2 | Premium-Features (KI-Spielleiter, Einladungs-Audio, Gute-Nacht-Geschichte) |
| ❌ | — | P1-1 | ~~/schatzsuche als eigene Seite~~ — **GESTRICHEN** (Memory #17: bleibt Redirect) |
| ❌ | — | P1-2 | ~~/schnitzeljagd als eigene Seite~~ — **GESTRICHEN** (gleicher Grund) |
| ✅ | — | P0-2 | "0 Spiele"-Bug in Titles |
| ✅ | — | P0-3 | Duplicate Titles auf Motto-Hauptseiten |
| ✅ | — | P0-4 | /_dev/ aus öffentlichem Zugriff sperren |
| ✅ | — | P1-3 | 9 Einladungs-Themenseiten — Canonical-Tags |
| ✅ | — | P1-4 | Einladungs-Tool: Default-Motto neutralisieren |
| ✅ | — | P2-14 | Affiliate-Sweep auf 16 Ratgeber-Seiten |
| ✅ | — | P2-18 | Vergleichs-Tabellen statt Einzel-Affiliate-Links |
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

#### P1-12: Einschulungs-Planer bauen

**Motivation:** Einschulungen in Deutschland finden Ende August / Anfang September statt. Eltern suchen ab Ende Mai nach "Einschulung Feier planen", "Schultüte Inhalt", "Einschulungs-Geschenke". Keyword-Volumen laut Strategie-Doc: saisonal hoch, in Peak-Monaten auf Niveau "Kindergeburtstag". **SEO-Seiten müssen spätestens Anfang Juni live**, damit Google sie bis Juli-August ranken kann.

**Was gebaut wird:**
- `/einschulung` als SEO-Hub (analog zu `/kindergeburtstag`)
- `/einschulung/planer` — Planer-Tool (gleicher Motor, anderer Anlass)
- 4 Themen-Landingpages: `/einschulung-schultuete-inhalt`, `/einschulung-feier-planen`, `/einschulung-geschenke`, `/einschulung-ablauf`
- 1 Checklisten-Seite `/einschulung-checkliste`
- `js/einschulung.js` existiert bereits (im Affiliate-Sweep verwendet) — Basis ist vorhanden

**Tech-Checkliste:**
- [ ] `/einschulung.html` als Hub mit H1, Meta, Canonical, OG, FAQ, BreadcrumbList JSON-LD
- [ ] Planer-Tool: JSX analog zu `kindergeburtstag.jsx` bauen (altersgerechte Spiele 6-jährige, Schultüten-Content, Geschenke-Liste)
- [ ] 4 Themen-Seiten mit FAQPage + HowTo Schema + Affiliate-Box
- [ ] Checkliste als HowTo-Schema mit 10–14 Steps
- [ ] Sitemap-Entries + interne Verlinkung von Homepage (dezent: "Auch: Einschulung planen")
- [ ] Interne Links von `/kindergeburtstag` zu `/einschulung` für 6-Jährige-Besucher

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
- Jahr 1 (wenn ab Mai live): ~200–400€ in Juli-September (primärer Peak)
- Jahr 2+: 500–1.000€/Jahr aus Einschulungs-Saison (Compound-Effekt)

**Aufwand:** 2–3 Tage (ca. 12–18 Stunden)
- 4h: Hub-Seite + Themen-Seiten (Content schreiben, Ton abgleichen)
- 6h: Einschulungs-Planer-Tool (JSX basierend auf Kindergeburtstag-Planer)
- 4h: Checklisten-Seite + interne Verlinkung + Schemas + Affiliate
- 2h: Testing, Validation, Sitemap-Updates

**Zeitplan:** **Launch spätestens 31.05.2026** (gibt Google 6–8 Wochen bis Peak)

**Abhängigkeiten:** Keine. Kann unabhängig von allen anderen PBIs gebaut werden.

**Erfolgs-Kriterien:**
- Alle 6 Seiten haben Canonical, Schemas, Affiliate-Links
- `validate-all.sh` PASSED
- Mindestens 3 Seiten auf 85%+ im Audit-Score
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
- [ ] Response-Parsing: Bau Amazon-Search-URLs mit `tag=machsleicht-21`
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
- Output: druckbarer A5-Zettel mit freundlichem Text + dezentes machsleicht-Logo unten rechts
- Zufalls-Phrasen für Variation ("Ich hoffe, es stört nicht zu sehr — Kuchen gibt's danach!")

**Tech-Checkliste:**
- [ ] Simple HTML-Seite mit JS-Template-System (kein React nötig)
- [ ] CSS für Print-Layout (A5)
- [ ] 3 Design-Varianten (Dino, Pirat, Unicorn Theme)
- [ ] Print-Button + PDF-Export-Button (via browser print)
- [ ] FAQPage-Schema + 3–4 FAQ

**SEO-Content:**
- Nische aber ranked gut: "Nachbarn informieren Kindergeburtstag" = 140/Monat, "Zettel Treppenhaus Geburtstag" = 90/Monat
- Long-Tail-Traffic, konvertiert gut zu Planer-Besuchern

**Monetarisierung:**
- Null direkt. **Indirekt viral** durch Aushänge
- CTA auf Zettel (dezent): "machsleicht.de — Geburtstag in 10 Minuten planen"

**Revenue-Projektion:**
- Direkt: 0€
- Indirekt: ~5% der Tool-Nutzer werden später Planer-Nutzer
- Pro 100 generierte Zettel: ~5 neue Planer-Besucher durch Aushang gesehen + direkte Tool-Nutzer

**Aufwand:** 4 Stunden
- 1h: HTML + Form
- 1h: Print-Layout (A5, CSS Print-Media)
- 1h: 3 Theme-Varianten
- 1h: Testing + Content (FAQ + Phrasen)

**Zeitplan:** **Sofort machbar**, gerne als Quick-Win zwischen größeren PBIs

**Abhängigkeiten:** Keine.

**Erfolgs-Kriterien:**
- Tool live, funktional auf Mobile und Desktop
- Print-Output sauber auf A5
- Plausible-Event `nachbar-zettel-erstellt` trackt Nutzung

---

#### P3-9: Foto-Spots / Photobooth-Backdrops (A2-PDF)

**Motivation:** "Fotowand Kindergeburtstag" = 880/Monat, "Photobooth Kinder selber machen" = 320/Monat. Eltern wollen Foto-Spots für Instagram-Momente. **Kostenloses A2-PDF zum Drucken im Copyshop** mit motto-passendem Hintergrund + dezentes machsleicht-Branding (unten rechts klein). Jeder Druck = virales Instagram-Posting mit machsleicht-Tag im Hintergrund.

**Was gebaut wird:**
- `/fotowand` — Hub mit 8 verfügbaren Motto-Backdrops (Pirat, Dino, Einhorn, Weltraum, Safari, Detektiv, Feuerwehr, Prinzessin)
- Jedes Motto: hochauflösender A2-PDF-Download (3–5 MB)
- Druckanleitung: "Für 5–8€ im Copyshop drucken lassen, mit Kreppband hinter Kind halten"

**Tech-Checkliste:**
- [ ] 8 A2-PDFs erstellen (3508 × 4960 px bei 300 DPI)
- [ ] Design: motto-passender Hintergrund + Requisiten-Silhouetten (Tierschatten, Segel, Sterne) + dezent "@machsleicht.de" unten rechts (10pt)
- [ ] `/fotowand.html` Hub-Seite mit 8 Vorschauen + Download-Buttons
- [ ] Affiliate-Box: "Fotobooth-Requisiten dazu? Amazon-Sets"
- [ ] Print-Anleitung auf der Seite

**SEO-Content:**
| Seite | Keyword | Volumen |
|-------|---------|---------|
| `/fotowand` | "Fotowand Kindergeburtstag" | 880/Monat |
| `/fotowand/piraten` | "Piraten Fotowand" | 140/Monat |
| `/fotowand/dino` | "Dino Fotowand" | 110/Monat |

**Monetarisierung:**
- Kostenlos (Lead-Magnet)
- Affiliate auf Requisiten-Sets (Foto-Booth-Props, Kreppband, etc.)
- **Viraler Werbe-Effekt:** jeder Instagram-Post mit Backdrop = organisches Branding

**Revenue-Projektion:**
- Direkt: ~20€/Monat Affiliate-Requisiten
- Indirekt: Brand-Awareness-Boost, schwer messbar, aber kostenlos

**Aufwand:** 6 Stunden
- 4h: Design 8 Backdrops (Figma/Canva, 1 Std pro Motto)
- 1h: Hub-Seite + Print-Anleitung
- 1h: PDF-Export + Upload

**Zeitplan:** **Parallel zu P1-8 Motto-Elite-Upgrades**, gleiche Assets verwenden

**Abhängigkeiten:** Keine (kann komplett isoliert gebaut werden)

**Erfolgs-Kriterien:**
- 8 Backdrops zum Download verfügbar
- Downloads tracken via Plausible-Event
- Mindestens 100 Downloads/Monat nach 3 Monaten

---

#### P3-10: Urkunden/Diplome nach der Party

**Motivation:** Kinder lieben Urkunden. "Junior-Detektiv-Urkunde", "Piraten-Diplom", "Dino-Forscher-Zertifikat". Wir haben bereits Design-Assets aus den Elite-Motto-Seiten. **Einfaches Tool: Name eingeben + Motto wählen + Datum → personalisierte PDF-Urkunde.** Dient als Mitgebsel oder Nachparty-Geste. Kostenlos als Lead-Magnet.

**Was gebaut wird:**
- `/urkunde` — Hub mit 8 Motto-Urkunden-Vorlagen
- `/urkunde/erstellen` — Formular: Name, Datum, Motto, optional zusätzlicher Text
- Output: personalisierte PDF mit hochwertigem Design + dezentes Branding

**Tech-Checkliste:**
- [ ] 8 Urkunden-Templates (jsPDF oder als HTML-to-PDF)
- [ ] Formular-Flow
- [ ] PDF-Generation mit Namen-Einsetzung
- [ ] Hub-Seite mit Vorschau aller 8 Mottos
- [ ] FAQPage-Schema

**SEO-Content:**
| Seite | Keyword | Volumen |
|-------|---------|---------|
| `/urkunde` | "Urkunde für Kinder" | 480/Monat |
| `/urkunde/detektiv` | "Detektiv-Urkunde" | 90/Monat |
| `/urkunde/pirat` | "Piraten-Urkunde" | 210/Monat |

**Monetarisierung:**
- Kostenlos
- **Indirekter Wert:** Lead-Magnet für E-Mail-Liste (Nutzer muss E-Mail angeben für PDF-Download) — zählt zu P3-5
- Premium-Upsell (später): 2,99€ für 5 verschiedene Motto-Urkunden eines Kindes als Sammel-Pack

**Revenue-Projektion:**
- Direkt: 0€
- Indirekt via E-Mail-Liste: wenn 20% der Nutzer Mail hinterlassen → ~30 neue Kontakte/Monat
- Nach E-Mail-Liste-Aufbau: 1–3€/Kontakt/Jahr

**Aufwand:** 6 Stunden
- 3h: 8 Urkunden-Templates (Design)
- 2h: Formular + PDF-Generation
- 1h: Hub + Testing

**Zeitplan:** **Nach P3-5 (E-Mail-Liste)** für maximalen Hebel

**Abhängigkeiten:**
- P3-5 (MailerLite) für Lead-Magnet-Funktion (optional)

**Erfolgs-Kriterien:**
- 8 Urkunden generierbar
- PDF druckt sauber auf A4
- Ab E-Mail-Integration: 20%+ Opt-In-Rate

---

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

- **16.04.2026 (Abend, Zusatz):** 10 neue PBIs aus STRATEGIE.md Ideenbibliothek aufgenommen (P1-12, P1-13, P1-14, P2-16, P2-17, P2-18, P3-7, P3-8, P3-9, P3-10). Alle mit ausführlichen Beschreibungen, Content-Clustern, Revenue-Projektionen und Checklisten. STRATEGIE.md um 6-12-Monats-Roadmap (Abschnitt 8a, 8b, 8c) erweitert.
- **16.04.2026:** Backlog komplett neu strukturiert. Status-Matrix aus Repo-Check gegen Live-Stand abgeleitet. P1-1 und P1-2 gestrichen (Architektur-Memory #17). Neue PBIs aus Monetarisierungs-Strategie aufgenommen (P1-10, P1-11, P2-13 bis P2-15, P3-5, P3-6).
- **15.04.2026:** FUNNEL-AXIOM als P2-1 fixiert. Audit-Findings aufgenommen (P1-6, P1-7, P2-8, P2-9, P2-10, P2-11).
- **11.04.2026:** Ursprünglich erstellt aus technischem + strategischem Audit.
