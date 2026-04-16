# Elite-Seiten Master-Template

> Pflicht-Checkliste für jede Motto-Altersgruppen-Seite (z.B. dino-6-8-jahre.html).
> Vor dem Erstellen: durchlesen. Nach dem Erstellen: abhaken.

---

## 1. HTML-Grundgerüst

### Head (Pflicht)
- [ ] `<title>` — Format: `{Motto} Kindergeburtstag {Alter} — Spiele, Zeitplan und Einkaufsliste | machsleicht`
- [ ] `<meta name="description">` — 140-160 Zeichen, Motto + Alter + "fertige Party-Konzepte"
- [ ] `<meta name="theme-color" content="#FFFAF5">`
- [ ] `<link rel="canonical">` — `/kindergeburtstag/{motto}-{alter}-jahre`
- [ ] OG-Tags: `og:title`, `og:description`, `og:type=article`, `og:url`, `og:image`, `og:locale=de_DE`, `og:site_name`
- [ ] Twitter-Tags: `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`
- [ ] **HowTo Schema** (`<script type="application/ld+json">`) — 5 Steps: Motto wählen, Spiele vorbereiten, Deko & Einkaufsliste, Kuchen backen, Party feiern
- [ ] Favicons: ico, 16x16, 32x32, 192x192, apple-touch-icon
- [ ] `<link rel="preconnect" href="https://fonts.googleapis.com">`
- [ ] Google Fonts: DM Sans + Fraunces
- [ ] CSS: Vollständiges Stylesheet (aus 6-8 Template kopieren, inkl. variant-tabs, timeline, game-detail, game-tag, game-needs, game-rules, snack-grid, deko-grid, deko-item, mitgebsel-item, cost-box, age-intro, tip, recipe-step)
- [ ] Print-CSS: `.no-print` hidden, variant-panels alle sichtbar
- [ ] `<link rel="stylesheet" href="/css/utility.css">`
- [ ] Plausible Analytics Script

### Body-Struktur (Pflicht, Reihenfolge!)
- [ ] **Header** — Logo mit Link zu `/kindergeburtstag`
- [ ] **Breadcrumb** — `Start › Mottos › {Motto} › {Alter}`
- [ ] **Badge** — `Beliebtes Motto · {Alter}`
- [ ] **H1** — `{Emoji} {Motto} Kindergeburtstag — {Alter}`
- [ ] **Intro-Text** — 2-3 Sätze, emotional, Versprechen (3 Konzepte, Zeitplan, Einkaufsliste, Kosten)
- [ ] **CTA** — `{Motto}-Geburtstag planen →` → Planer mit motto + alter Params

---

## 2. Altersgruppen-Intro

- [ ] **Box** (`.age-intro`) mit H3: "Was {Alter}-Jährige ausmacht — und was das für die Party heißt"
- [ ] 7 Punkte: Aufmerksamkeit, Regeln, Wettbewerb, Motorik, Dauer, Essen, Eltern
- [ ] Alle Punkte ALTERS-SPEZIFISCH (nicht generisch!)

- [ ] **Tip-Box** grün: "Warum {Motto} für {Alter} besonders gut funktioniert"
- [ ] Echte Begründung, nicht Marketing-Sprech

---

## 3. Drei Varianten (Tabs)

### Struktur pro Variante (Minimal / Standard / Wow):
Jede Variante hat ALLE folgenden Abschnitte:

1. [ ] **Variant-H3** — mit Farbe (Minimal=grün, Standard=orange, Wow=lila)
2. [ ] **Intro-Satz** — Was diese Variante ist, Vorbereitungszeit
   - Bei Wow: explizit "Auf Standard aufbauend" erwähnen wenn zutreffend
3. [ ] **Zeitplan** — Timeline mit konkreten Uhrzeiten, für X Kinder, Y Stunden
   - Abwechselnd laut/leise Aktivitäten
   - Kuchen-Slot mit ca. 20 Min. Ruhe
4. [ ] **Tip-Box** — 1 konkreter Eltern-Tipp zur Variante (z.B. "laut → leise abwechseln")
5. [ ] **H3 "🎮 Spiele"** — Gruppen-Header über den Game-Cards
   - Bei Wow: "🎮 Zusätzliche Spiele (auf Standard aufbauend)" wenn passend
6. [ ] **Game-Detail-Cards** — Für JEDES Spiel im Zeitplan eine eigene Card:
   - Wrapper: `<div class="game-detail">`
   - H4 mit Emoji + Name + "Spielanleitung"
   - game-meta: Dauer, Ab-Alter, Ort, Aufwand
   - **Game-Tags** (`.game-tag`): Location-Badges pro Spiel:
     - `<span class="game-tag indoor">Drinnen</span>`
     - `<span class="game-tag outdoor">Draußen</span>`
     - `<span class="game-tag both">Drinnen & Draußen</span>`
   - **Material** (`.game-needs`): Was man braucht
   - **Regeln** (`.game-rules`): "So geht's" Beschreibung
   - Alters-Tipp (was bei dieser Altersgruppe anders ist)
   - Ggf. Link zu **Druckvorlagen** (Forscherpass, Quiz etc.) wenn vorhanden
7. [ ] **Essen** — `.snack-grid` mit Emoji, Name, Menge. Für X Kinder, Y Stunden
   - Lustige Motto-Umbenennungen (z.B. "Dino-Pipi" = Apfelschorle)
8. [ ] **Deko** — `.deko-grid` Wrapper mit `.deko-item` (Label + Preis + ggf. Note)
   - DIY-Items mit Zeitangabe (z.B. "Fußspuren aus Papier, 15 Min.")
   - Kostenlose Deko-Ideen (YouTube Hintergrund-Sounds, Schilder basteln)
9. [ ] **Mitgebsel** — `.mitgebsel-item` Grid, Preis pro Kind, Verpackungs-Tipp
   - Verpackung: "In braune Papiertüte, beschriftet mit '___'. Kosten: ~X € pro Kind."
10. [ ] **Einkaufsliste** — Jeder Posten mit Affiliate-Link (wo sinnvoll) + Preis
    - Externe Gratis-Ressourcen verlinken (Ausmalbilder: kribbelbunt.de, malvorlagen-seite.de etc.)
    - Druckvorlagen von machsleicht verlinken (Forscherpass, Quiz etc.)
11. [ ] **Kosten** — `.cost-box` oder `.cost-bar` mit Gesamtkosten + pro Kind

### Wow-spezifisch:
- [ ] **Highlight-Produkt** — Ein besonderer Affiliate-Artikel als Wow-Faktor (z.B. aufblasbares Kostüm ~35-50€). In eigener Tip-Box mit Beschreibung und Alters-Warnung

### Regeln:
- Affiliate-Tag: `machsleicht-21`
- Affiliate-Links als `rel="noopener sponsored"` + `target="_blank"`
- Affiliate-Hinweis: `* Affiliate-Links. Für dich ändert sich der Preis nicht.`
- Preise als Richtwerte mit `~`
- Zeitplan: realistische Zeiten, laut/leise abwechselnd
- Spiele: keine Gewinner/Verlierer bei 3-5, Teams ab 6-8
- Eltern-Info im Alters-Intro: Ab wann können Eltern abgesetzt werden vs. bleiben

---

## 4. Nach den Varianten (Pflicht-Sektionen)

### Kuchen-Rezept
- [ ] H2: "🎂 {Motto}-Kuchen — Rezept"
- [ ] Card mit Schritt-für-Schritt — bevorzugt `.recipe-step` mit `.recipe-num` + `.recipe-text`
- [ ] Aufwand, Kosten, Allergiker-Hinweis
- [ ] "Keine-Lust-zu-backen"-Variante als Tip-Box

### Planer-CTA (zwischen Kuchen und Tipps)
- [ ] `<a class="cta">` → Planer mit motto + alter

### Eltern-Tipps
- [ ] H2: "💡 Eltern-Tipps für {Alter}"
- [ ] 3-5 Tip-Boxes, altersgerecht:
  - Allergien vorher abfragen (immer)
  - Plan B bei Regen (immer)
  - Partyseite statt WhatsApp-Chaos (immer, mit Link zu party.machsleicht.de)
  - Helfer-Regel (altersabhängig: "Eltern bleiben" bei 3-5, "1 Helfer ab 6 Kindern" bei 6-8)
  - Abholzeit/Absetzen-Info (Ab welchem Alter können Eltern gehen? Vorher Abholzeit klären)
  - Alters-spezifischer Tipp (z.B. Meltdown-Plan bei 3-5, Wettbewerbs-Regeln bei 6-8)

### Einladung
- [ ] H2: "💌 Einladung für den {Motto}-Geburtstag"
- [ ] Card mit Beschreibung + CTA → `/einladung/erstellen?motto={motto}`

### WhatsApp Share
- [ ] Share-Button mit vorformuliertem Text + **URL-encoded** Link
- [ ] Format: `https://wa.me/?text={encoded text mit Titel + URL}`

### Andere Altersgruppen
- [ ] H2: "🦕 {Motto} für andere Altersgruppen"
- [ ] Link-Buttons zu allen anderen Altersgruppen-Seiten des Mottos
- [ ] H2: "🎯 Ähnliche Mottos für {Alter}"
- [ ] 2-4 thematisch verwandte Mottos mit Links

### FAQ
- [ ] H2: "❓ Häufige Fragen zum {Motto}-Geburtstag ({Alter})"
- [ ] 4 `<details>` Fragen, immer:
  1. Wie lange? (Dauer-Empfehlung)
  2. Wie viele Kinder? (Faustregel)
  3. Was kostet es? (Kosten-Range der 3 Varianten)
  4. Funktioniert es drinnen? (oder eine motto-spezifische Frage)
- [ ] **FAQPage Schema** (`<script type="application/ld+json">`) mit allen Fragen

### Final CTA
- [ ] H2: "Kompletten {Motto}-Geburtstag planen — in 10 Minuten"
- [ ] Text + CTA-Button → Planer
- [ ] Sekundäre CTAs: Einladung erstellen + Partyseite erstellen

### Footer
- [ ] `<footer>` mit © 2026, Impressum, Datenschutz, Transparenz Links

---

## 5. Sticky CTA-Bar (Bottom)

- [ ] `<div class="no-print">` fixed bottom
- [ ] 3 Buttons: 💌 Einladung, 📱 Partyseite, 🎂 Planer
- [ ] Partyseite → `https://party.machsleicht.de`
- [ ] Planer → `/kindergeburtstag?motto={motto}&alter={alter}#planer`

---

## 6. JavaScript

- [ ] `showVariant(id)` Funktion für Tab-Wechsel

---

## 7. CSS-Klassen Referenz

Alle Seiten sollten konsistente CSS-Klassen verwenden. Referenz: `dino-6-8-jahre.html`.

| Bereich | Klasse(n) | Zweck |
|---------|-----------|-------|
| Layout | `.badge`, `.cta`, `.card`, `.tip` | Basis-Elemente |
| Varianten | `.variant-tabs`, `.variant-tab`, `.variant-panel` | Tab-Wechsel |
| Zeitplan | `.timeline`, `.timeline-row`, `.timeline-time`, `.timeline-what`, `.timeline-detail` | Ablauf-Timeline |
| Spiele | `.game-detail`, `.game-meta`, `.game-tag`, `.game-tag.indoor/outdoor/both`, `.game-needs`, `.game-rules` | Spielanleitungen |
| Essen | `.snack-grid`, `.snack-item` (`.emoji`, `.name`, `.amount`) | Snack-Übersicht |
| Deko | `.deko-grid`, `.deko-item` (`.label`, `.price`, `.note`) | Deko-Liste |
| Mitgebsel | `.mitgebsel-item` | Mitgebsel-Grid |
| Kosten | `.cost-box`/`.cost-bar`, `.cost-label`, `.cost-value`, `.cost-per` | Kostenübersicht |
| Rezept | `.recipe-step`, `.recipe-num`, `.recipe-text` | Kuchen-Anleitung |
| Intro | `.age-intro` | Altersgruppen-Box |
| Print | `.no-print` | Beim Drucken ausblenden |

---

## 8. Quality Gate (nach Erstellung)

### Technisch
- [ ] HTML parst fehlerfrei
- [ ] `validate-all.sh` passed
- [ ] Alle Links funktionieren (keine 404s auf eigene Seiten)
- [ ] Canonical-URL korrekt
- [ ] FAQPage Schema valide (Google Rich Results Test)
- [ ] utility.css eingebunden
- [ ] Plausible Analytics Script vorhanden

### Inhaltlich
- [ ] Alle 3 Varianten haben ALLE 10 Abschnitte (Zeitplan bis Kosten-Box)
- [ ] Jedes Spiel im Zeitplan hat eine Game-Detail-Card
- [ ] Kosten-Angaben sind realistisch und konsistent (Einkaufsliste = Kosten-Box)
- [ ] Affiliate-Links haben korrekten Tag (`machsleicht-21`)
- [ ] Alters-Tipps sind spezifisch, nicht generisch
- [ ] Keine Copy-Paste-Artefakte von anderen Altersgruppen
- [ ] Plan B Regen tip vorhanden
- [ ] Partyseite tip vorhanden (mit Link)

### Struktur
- [ ] Header mit Logo ✓
- [ ] Breadcrumb ✓
- [ ] Footer mit Impressum/Datenschutz/Transparenz ✓
- [ ] Sticky CTA-Bar (Einladung + Partyseite + Planer) ✓
- [ ] Sekundäre CTAs am Ende (Einladung + Partyseite) ✓

### UX
- [ ] Mobile-Scroll: Kerninhalt (Zeitplan) in den ersten 2 Screens sichtbar
- [ ] Tabs funktionieren
- [ ] Print-Ansicht: Alle Varianten sichtbar, keine CTAs
- [ ] Sticky Bar blockt keinen Content
