# machsleicht.de — STATUS-AUDIT
# Stand: 23. März 2026
# Abgleich: 6 Planungsdokumente vs. Live-Site vs. lokales Projekt

---

## LEGENDE

- ✅ ERLEDIGT — Live auf machsleicht.de
- ⚠️ TEILWEISE — Grundlage steht, Details fehlen
- ❌ OFFEN — Noch nicht gebaut
- 🔄 ÜBERHOLT — Durch spätere Arbeit überholt/ersetzt

---

## 1. MASTER-EXECUTION-PLAN-v3 (39 Tasks, Phase 0A–6)

### PHASE 0A: QUICK WINS

| Task | Beschreibung | Status | Kommentar |
|------|-------------|--------|-----------|
| 0A.1 | Plausible Analytics auf ALLEN Seiten | ✅ | Auf allen 30 Content-Seiten + Template. React-SPAs: prüfen ob Custom Events (motto-selected, plan-created etc.) eingebaut |
| 0A.1b | Google Search Console einrichten | ❌ | Manuell: DNS-Verifizierung + Sitemap einreichen |
| 0A.2 | Tote Links fixen | 🔄 ÜBERHOLT | Homepage hat jetzt /einschulung, /baby als funktionierende SPAs — KEINE toten Links mehr |
| 0A.3 | Shared CSS-Module + JS | ✅ | v1.1 CSS (.snippet, .decision-cards, .copy-block, .tip, .kaufmoment, .cta-safety) + Copy-JS + Print-Styles in pokemon-guide.html Template und allen 30 Content-Seiten |
| 0A.7 | Backup/Rollback-Strategie | ❌ | Git-Branching + Tags nicht eingerichtet |

### PHASE 0B: ENTSCHEIDUNGEN

| Task | Beschreibung | Status | Kommentar |
|------|-------------|--------|-----------|
| 0B.4 | Performance-Baseline messen | ❌ | Lighthouse-Audit steht aus |
| 0B.5 | Canonical/URL-Strategie | ⚠️ | Homepage (/) ist separate Seite, /kindergeburtstag ist Planer. Aber: Canonical-Tags in Content-Seiten prüfen |
| 0B.6 | OG/Social-Meta + Preview-Images | ❌ | og:image URLs fehlen wahrscheinlich (og-home.png etc. müssen erstellt werden) |

### PHASE 1: GELD

| Task | Beschreibung | Status | Kommentar |
|------|-------------|--------|-----------|
| 1.0 | Affiliate-Kennzeichnung (§5a UWG) | ✅ | In allen 30 Content-Seiten ist Affiliate-Disclaimer im Footer |
| 1.1 | Affiliate im KiGe-Fallback (14 Mottos) | ❌ | Statischer Content in index.html hat KEINE Affiliate-Links |
| 1.2 | Affiliate im Schatzsuche-Fallback (6 Themen) | ❌ | Statischer Content in schatzsuche.html hat KEINE Affiliate-Links |
| 1.3 | Kaufmoment-Box in Schatzsuche React | ❌ | SHOP_ITEMS Datenobjekt + Kaufmoment-Box fehlt |
| 1.4 | Kaufmomente auf /kindergeburtstag (Top 6) | ❌ | Keine .kaufmoment Boxen im KiGe-Fallback |
| 1.5 | Sequentielles Testen | ❌ | Braucht erst 1.3 |

### PHASE 2: SICHTBARKEIT

| Task | Beschreibung | Status | Kommentar |
|------|-------------|--------|-----------|
| 2.1 | Schatzsuche: 200→1.500+ Wörter | ❌ | Statischer Content in schatzsuche.html ist immer noch kurz |
| 2.2 | KiGe: Motto-Grid als Cards | ❌ | Motto-Listing ist noch Textliste |
| 2.3 | KiGe: Snippet + Alter-Cards + 2-Spalten | ❌ | Keine Snippet-Box, keine Alters-Cards |
| 2.4 | Schatzsuche: FAQ-Schema | ❌ | Kein FAQPage Schema |
| 2.5 | KiGe: FAQ-Schema konsolidieren | ❌ | Noch auf 4 statt 8 FAQs |
| 2.6 | Social-Proof bereinigen | ❌ | "4.700+" Claim noch aktiv |

### PHASE 3: VERBINDUNG (🔴 Größter Hebel)

| Task | Beschreibung | Status | Kommentar |
|------|-------------|--------|-----------|
| 3.1 | Deep-Links KiGe (?motto=) | ❌ | useEffect für URL-Params fehlt in index.html |
| 3.2 | Deep-Links Schatzsuche (?thema=) | ❌ | useEffect fehlt in schatzsuche.html |
| 3.3 | Motto-CTAs auf /kindergeburtstag | ❌ | Keine CTA-Buttons nach Motto-Blöcken |
| 3.4 | Cross-Links SZ ↔ KiGe | ❌ | Keine bidirektionale Verlinkung |
| 3.5 | Back-Link korrigieren | ❌ | Abhängig von 0B.5 |

### PHASE 4: PRODUKT

| Task | Beschreibung | Status | Kommentar |
|------|-------------|--------|-----------|
| 4.1 | Schatzsuche: localStorage Persistence | ❌ | State geht bei Reload verloren |
| 4.2 | Schatzkarte: Toggle → Hero | ❌ | Karte immer noch hinter Toggle |
| 4.3 | Karteneditor: Undo-Button | ❌ | Nur "Alles löschen" |
| 4.4 | Checkliste: Checkboxen + Snippet | ❌ | Unicode ☐ statt echte Checkboxen |

### PHASE 5: CONVERSION + GROWTH

| Task | Beschreibung | Status | Kommentar |
|------|-------------|--------|-----------|
| 5.1 | Signature Layer | ❌ | "Das reicht. Wirklich." fehlt auf /kindergeburtstag |
| 5.2 | Sticky CTA Mobile | ❌ | Kein sticky CTA |
| 5.3 | WhatsApp-Share auf alle Seiten | ❌ | Nur auf Checkliste vorhanden |
| 5.4 | Share-Prompt nach Karten-Druck | ❌ | Kein Post-Print Prompt |
| 5.5 | Retention: Calendar-Reminder | ❌ | Kein "Nächstes Jahr erinnern" |

### PHASE 6: GOLDEN TEMPLATE + LAUNCH

| Task | Beschreibung | Status | Kommentar |
|------|-------------|--------|-----------|
| 6.1 | Golden Template bauen | ✅ ÜBERHOLT | kindergeburtstag-5-jahre.html existiert UND alle 30 Seiten sind gebaut. Das Template IST das Golden Template. Wir sind WEIT über Phase 6 hinaus. |
| 6.2 | Link-Checker Script | ❌ | Nicht erstellt |
| 6.3 | Week 3 Health Check | ❌ | Erst nach Phase 6 |

---

## 2. GREMIUM-TODO-machsleicht (Phasen 0–3)

| Task | Beschreibung | Status | Kommentar |
|------|-------------|--------|-----------|
| 0.1 | Tote Links Homepage | 🔄 ÜBERHOLT | /einschulung und /baby existieren jetzt als SPAs |
| 0.2 | Plausible Analytics | ✅ | In Content-Seiten. React-SPAs: Custom Events prüfen |
| 1.1 | Deep-Linking (?motto=) | ❌ | Identisch mit Master 3.1 |
| 1.2 | Motto-CTAs pro Abschnitt | ❌ | Identisch mit Master 3.3 |
| 1.3 | Motto-Grid als Cards | ❌ | Identisch mit Master 2.2 |
| 1.4 | Affiliate-Links statisch | ❌ | Identisch mit Master 1.1 |
| 1.5 | Signature Layer | ❌ | Identisch mit Master 5.1 |
| 2.1 | Snippet auf Checkliste | ❌ | kindergeburtstag-checkliste braucht Snippet-Box |
| 2.2 | Echte Checkboxen | ❌ | Unicode ☐ → input[checkbox] |
| 2.3 | Sticky CTA Mobile | ❌ | Identisch mit Master 5.2 |
| 2.4 | WhatsApp-Share alle Seiten | ❌ | Identisch mit Master 5.3 |
| 2.5 | Print-Stylesheet | ✅ | In allen 30 Content-Seiten via v1.1 CSS |
| 2.6 | 2-Spalten "Was du bekommst" | ❌ | Noch einspaltig |
| 2.7 | Altersgruppen 3-Cards | ❌ | Noch reiner Text |
| 2.8 | Social-Proof bereinigen | ❌ | "4.700+" Claim |
| 3.1 | FAQ-Schema konsolidieren | ❌ | 4 statt 8 FAQs |
| 3.2 | Golden Template | ✅ ÜBERHOLT | Alle 30 Seiten gebaut |
| 3.3 | Link-Checker Script | ❌ | |
| 3.4 | iOS Clipboard-Fallback | ✅ | In v1.1 Template Copy-JS mit Fallback |
| 3.5 | Schatzkarten-Watermark | ❌ | Kein machsleicht.de Watermark |

---

## 3. GREMIUM-TODO-schatzsuche (Phasen 0–3)

| Task | Beschreibung | Status | Kommentar |
|------|-------------|--------|-----------|
| 0.1 | Affiliate-Links in React Plan-View | ❌ | SHOP_ITEMS + Kaufmoment-Box fehlt |
| 0.2 | Affiliate-Links im statischen Fallback | ❌ | 6 Themen ohne Links |
| 1.1 | Content 200→1.500+ Wörter | ❌ | Snippet, Theme-Cards, Piraten-Beispiel, FAQ |
| 1.2 | FAQ-Schema ergänzen | ❌ | FAQPage JSON-LD fehlt |
| 2.1 | Deep-Link-Parameter | ❌ | ?thema= + ?alter= |
| 2.2 | localStorage Persistence | ❌ | State verloren bei Reload |
| 2.3 | Schatzkarte aus Toggle → Hero | ❌ | Stärkstes Feature versteckt |
| 2.4 | Undo-Button Karteneditor | ❌ | Nur "Alles löschen" |
| 3.1 | Cross-Link zu /kindergeburtstag | ❌ | |
| 3.2 | Share-Prompt nach Druck | ❌ | |

---

## 4. SCHATZKARTEN-ENGINE-v3 (Welle A–C)

### Welle A: SOFORT (8 Tasks)

| Task | Beschreibung | Status | Kommentar |
|------|-------------|--------|-----------|
| A.1 | Kindername auf Karte + Story | ❌ | childName State + Personalisierung |
| A.2 | Gestrichelte Pfadlinie | ❌ | SVG polyline zwischen Stationen |
| A.3 | Auto-Stationsnummern | ❌ | Vorschlags-Banner + Auto-Layout |
| A.4 | Text-Tool auf Karte | ❌ | "Aa Text" Button + Caveat Font |
| A.5 | Komplettpaket-PDF (5 Seiten) | ❌ | Karte + Stationen + Material + Checkliste + Urkunde |
| A.6 | Hinweis-Zettel ausschneidbar | ❌ | 2×3 Grid zum Ausschneiden |
| A.7 | "Karte altern lassen" Tipps | ❌ | Post-Print Tipp-Block |
| A.8 | Fertig-Check vor Druck | ❌ | Fortschrittsbalken |

### Welle B: DIREKT DANACH — nicht gelesen (Zusammenfassung ausstehend)
### Welle C: EIGENES PROJEKT — nicht gelesen (Real-World Map Mode)

---

## 5. STADT-SCHATZSUCHEN-v2 (10 Leuchtturm-Seiten)

| Item | Status | Kommentar |
|------|--------|-----------|
| Stufe 1: 10 handkuratierte Park-Seiten | ❌ | /schatzsuche-berlin-volkspark-friedrichshain → 404 |
| Preset-System (URL-Params) | ❌ | |
| Leaflet.js interaktive Karten | ❌ | |
| Sommer/Winter Toggle | ❌ | |
| Station-spezifische Affiliate-Links | ❌ | |
| Stufe 2: Community | ❌ | |
| Stufe 3: PLZ-Suche + Premium | ❌ | |

---

## 6. CONTENT-PLAYBOOK-v1.1 (30 Seiten in 3 Wellen)

| Item | Status | Kommentar |
|------|--------|-----------|
| Welle 1: 10 Spur A / Money Seiten | ✅ | Alle live |
| Welle 2: 13 Spur B / Cluster Seiten | ✅ | Alle live |
| Welle 3: 7 Spur C / Probe Seiten | ✅ | Alle live |
| Sitemap.xml (271 URLs) | ✅ | Updated |
| _redirects (Clean URLs) | ✅ | Updated |

---

## ZUSAMMENFASSUNG

### Was FERTIG ist:
1. ✅ **30 Content-Playbook-Seiten** — alle live mit v1.1 Modulen
2. ✅ **Plausible Analytics** — auf allen Content-Seiten
3. ✅ **Shared CSS v1.1** — alle Module definiert und im Einsatz
4. ✅ **Affiliate-Kennzeichnung** — §5a UWG konform in Content-Seiten
5. ✅ **iOS Clipboard-Fallback** — in Copy-Button JS
6. ✅ **Print-Stylesheets** — in allen Content-Seiten
7. ✅ **4 funktionierende SPAs** — Kindergeburtstag, Schatzsuche, Einschulung, Baby
8. ✅ **Spielkarten-Generator** — live
9. ✅ **8 Eltern-Ratgeber** — Pokemon, Minecraft, etc.
10. ✅ **Homepage** — mit Tool-Karten und Saisonalen Erweiterungen

### Was ÜBERHOLT ist:
1. 🔄 **Tote Links fixen** (0A.2/0.1) — /einschulung und /baby existieren jetzt
2. 🔄 **Golden Template bauen** (6.1/3.2) — alle 30 Seiten schon fertig

### Was OFFEN und am wichtigsten ist (nach Priorität):

**🔴 Gamechanger (Funnel-Verbindung):**
1. Deep-Links in KiGe + Schatzsuche (3.1/3.2)
2. Motto-CTAs + Cross-Links (3.3/3.4)
3. Schatzsuche Content 200→1.500 Wörter (2.1)
4. Schatzkarte aus Toggle → Hero (4.2)

**💰 Geld (Monetarisierung):**
5. Kaufmoment-Box Schatzsuche React (1.3)
6. Affiliate-Links in statischen Fallbacks (1.1/1.2)
7. Kaufmomente auf /kindergeburtstag (1.4)

**🛠️ Produkt-Polish:**
8. Schatzkarten-Engine Welle A (8 Features)
9. localStorage Persistence Schatzsuche (4.1)
10. Echte Checkboxen Checkliste (4.4)

**📈 Growth + SEO:**
11. OG/Social-Meta + Preview-Images (0B.6)
12. Google Search Console (0A.1b)
13. WhatsApp-Share alle Seiten (5.3)
14. FAQ-Schema (2.4/2.5)

**🌍 Neues Terrain:**
15. Stadt-Schatzsuchen 10 Leuchtturm-Seiten (komplett neu)

---

## EMPFEHLUNG: NÄCHSTE SCHRITTE

**Option A — Funnel-First (2–3 Tage):**
Deep-Links + Cross-Links + Motto-CTAs einbauen. Aus 2 isolierten Tools wird 1 Funnel.
Das ist laut Master Plan "der größte Hebel im ganzen Plan."

**Option B — Schatzsuche-Upgrade (3–4 Tage):**
Schatzkarten-Engine Welle A (Kindername, Pfadlinie, Komplettpaket, etc.) +
SEO-Content auf 1.500+ Wörter + Kaufmoment-Box.

**Option C — Stadt-Schatzsuchen (4–5 Tage):**
10 Leuchtturm-Seiten mit Preset-System, Leaflet.js, Sommer/Winter Toggle.
Komplett neues Content-Vertical.
