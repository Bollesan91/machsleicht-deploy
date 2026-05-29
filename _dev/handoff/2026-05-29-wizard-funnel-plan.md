# Wizard-Funnel-Plan — Arbeits-Doc (29.05.2026)

**Zweck:** Bolles „Funnel-First Vision" (8.5–9/10, formuliert 28.05. abends) in einen umsetzbaren Plan überführen. Sobald wir hier eine 9/10-Konzept-Form haben, kondensiert es zu **P7-1 Funnel-First Re-Architecture** in `BACKLOG-AUDIT.md` + `STRATEGIE.md` §0.

**Status:** ✅ **KONZEPT FERTIG 29.05.2026** — alle 8 Entscheidungen getroffen, kondensiert in `BACKLOG-AUDIT.md` als **P7-0 + P7-1 bis P7-7** (Welle 7 Funnel-First Re-Architecture).

**Validierungs-Pfad:** 5 Prototyp-Iterationen (v1-v5) in `_dev/prototypes/`:
- v1: Single-Motto Piraten Plan-Preview-First (Konzept-Beweis)
- v2: Full-Tour mit Motto/Alter-Picker + Outcome-Browser-Frames
- v3: Full-Funnel mit Async-Save + Custom-Timeline + Einladung-Editor + Partyseite-Editor (6 Stages)
- v4: Self-Audit-Fixes (12 Mottos + echte URLs + Konflikt-Warnung + Mobile-Toggle)
- v5: **Helfer-v3-Live-Aligned** (15 Mottos = Live-Union, Foto-Upload, WhatsApp-RSVP, Social-Proof, Notfallplan-CTA, Dark-Mode-Mini-Spiel, Auto-Slug)

**Helfer-v3-Erkenntnis 29.05.:** Live-Walk via Chrome-MCP zeigte **4 verschiedene Motto-Listen-Drift** (Planer/Einladung/Schatzsuche/Partyseite). Wizard-Vision löst dies — aber bevor Wizard gebaut wird, muss **P7-0** (Master-Motto-Liste in `js/theme-registry.js`) als Pre-Requisite laufen.

**Nächste konkrete Schritte:**
1. P7-0 Motto-Source-Konsolidierung (4–6 Std) — IMMEDIATE BLOCKER
2. Welle Alpha A1-A9 (Piraten-Pilot mit Bestand-Planer + Wizard-Variante als A/B)
3. P7-1 Stage 1+2 Implementation
4. Validation-Gate identisch Welle Alpha: ≥3 Käufe in 3 Wochen

---

## Original-Analyse (29.05. morgens, vor Validierung)

---

## Vision-Summary (aus Diskussion 28.05.)

**Heute:** 4 separate Tools (Planer / Schatzsuche / Einladung / Partyseite), kein roter Faden. UX-Klarheit 3-4/10. Conversion: „User soll Tool finden". Premium-Verkauf: aufgesetzt.

**Vision:** Ein Wizard, ein Plan, eine Story. Eltern werden geführt — von Motto-Auswahl bis druckbarem Komplettpaket. Premium-PDF wird zum natürlichen **Day-of-Execution-Tool** (Print, nicht App, weil Eltern am Party-Tag kein Smartphone öffnen).

**Vier Lücken aus 28.05. Diskussion:**
| Lücke | Status |
|---|---|
| Day-of-Execution-App | ❌ verworfen — Print-First ersetzt |
| Asynchrone Plan-Identity (Plan reift über Tage) | ✅ Teil der Vision |
| Smart-Defaults statt Auswahl-Wall | ✅ Teil der Vision |
| Multi-Touch-Monetisierung (3 Upgrade-Steps statt 1 SKU) | ✅ Teil der Vision |
| Print-First-Strategie | ✅ neu eingeführt, ersetzt App-Idee |

---

## Free vs Premium — Grenze ist klar (aus Diskussion 28.05.)

| Bereich | Free (heute, bleibt gratis) | Premium-PDF €14.90 |
|---|---|---|
| Party-Plan | Online lesen | + Print-A4 für Kühlschrank |
| Spiele-Anleitungen | Im Browser (Wall of Text) | + A6-Karten zum Vorlesen am Spielort |
| Einkaufsliste | Bildschirm + Haken | + Print sortiert nach Discounter/Drogerie, skaliert |
| Schatzsuche | Online + Schatzkarte | + ALLE Rätsel-Karten + Lösungs-Booklet |
| Einladung | WhatsApp-Mini-Spiel | + Druck-Karten mit Name eingebrannt |
| Partyseite (RSVP) | Worker, voll funktional | (gleich) |
| Urkunden 8× | — | ✅ mit Gäste-Namen vorgedruckt |
| Türschilder 8× | — | ✅ personalisiert |
| Mitgebsel-Tüten-Etiketten | — | ✅ Motto-Design + Namen |
| Vorbereitungs-Wochenplan | — | ✅ „2W / 1W / Tag vorher"-Checkliste |
| Wenn-Dann-Backup-Karten | — | ✅ Notfall-Karten (Streit, Regen, Krise) |

**Killer-Differenzierung (Premium):**
1. **Personalisierung aus Wizard-State** (Name, Datum, Ort eingebrannt)
2. **Quantitäts-Skalierung** (8 verschiedene Namen auf 8 Urkunden, nicht 1 Vorlage 8×)
3. **Print-Optimierung** (A4/A6, druckfertig)
4. **Komplett-Bundle** (1 ZIP statt 5 Tabs)
5. **Day-of-Execution-Material** (physisch im Wohnzimmer)

---

## 3-Tier Preis-Ladder (Welle Beta)

| Stufe | Preis | Inhalt |
|---|---|---|
| Basic | €7.90 | Plan + Einladung + 1 Spiel-Karte |
| **Standard** | **€14.90** | **Alles oben + Schatzsuche + Etiketten + Urkunden (Volume-SKU)** |
| Pro | €24.90 | Standard + Story-Audio + 2 Pro-Rätsel + Wow-Spiel-Variante |

**Welle Alpha MVP:** Nur **1 Motto, nur Standard €14.90**. Test ob Eltern überhaupt zahlen. ≥3 Käufe in 3 Wochen → validiert.

---

## 🔢 8 Entscheidungspunkte (durchgehen-Reihenfolge)

### D1: Die Wizard-Sequenz — was sind die Schritte?
Vision sagt „ein Wizard, ein Plan". Aber WIE sieht die Sequenz aus? Mein Vorschlag als Start-Hypothese (kann/muss diskutiert werden):

```
Schritt 1: Motto + Alter + Kind-Name           (30 Sek, smart-defaults)
Schritt 2: Datum + Gäste-Anzahl + Ort          (1 Min, smart-defaults)
Schritt 3: Plan generiert + auf Wunsch tunen   (Hauptseite, AHA-Moment)
Schritt 4: Einladungs-Anpassung                 (Edit / Versand)
Schritt 5: Schatzsuche customizen               (Stationen, Rätsel-Auswahl)
Schritt 6: Day-of-Execution Vorschau            (Premium-Upsell-Moment)
Schritt 7: Partyseite-Setup (RSVP)              (optional)
Schritt 8: Komplettpaket-Download               (Free oder Premium-PDF)
```

**Frage:** Ist das die richtige Reihenfolge? Sind 8 Schritte zu viele? Sollten manche zusammenfließen? (Empfehlung: nicht mehr als 5 sichtbare Hauptschritte, der Rest „Sub-Schritte" im jeweiligen Block.)

### D2: Tech-Architektur — Neu-Route oder Planer umbauen?
- **Option A:** `/wizard` als neue Route, alter Planer bleibt vorerst parallel
- **Option B:** Planer wird zu Wizard refactored, alter Flow verschwindet
- **Option C:** Hybrid — Wizard ist die Default-Route von der Homepage aus, Planer bleibt für Power-User erreichbar

→ Hat Konsequenzen für: Migration, A/B-Test-Möglichkeit, Backlog-Items (P6-1 Einladungs-Refactor wird anders, Welle Alpha P5-X muss re-spec).

### D3: State-Persistenz — Wie reift der Plan über Tage?
„Asynchrone Plan-Identity" sagt: Eltern starten Wizard, machen 5 Min, machen morgen weiter, fertigen 3 Tage später. **Wie technisch?**
- **L** localStorage (kein Account, anonym, Browser-bound)
- **M** Magic-Link per Email (1 Klick speichern, kein Login)
- **A** Vollaccount mit Login
- **H** Hybrid: localStorage + optional Magic-Link

(Empfehlung Welle Alpha: **H** — localStorage default, Magic-Link nur wenn User Premium kauft)

### D4: Smart-Defaults — wie konkret?
Vision sagt „statt Auswahl-Wall". Beispiele:
- Datum-Default: nächster Samstag in 4 Wochen
- Gäste-Anzahl-Default: 6 (machsleicht-Statistik: Median?)
- Spiele-Auswahl: vorausgewählt (5 von 9), User kann ändern aber muss nicht
- Schatzsuche-Stationen: 5 vorausgewählt
- Einladungs-Text: Template generiert aus Motto + Datum + Name

**Frage:** Welche Defaults willst du? Was darf NICHT vorausgewählt sein (Eltern wollen aktiv entscheiden)?

### D5: Multi-Touch-Monetisierung — 3 konkrete Upsell-Punkte
Aus deinem Paste:
- Step Einladung: „Standard digital (kostenlos) oder Premium-Print für €4.90?"
- Step Schatzsuche: „Online (kostenlos) oder Print-PDF für €6.90?"
- Step Plan-Fertig: „Du hast €4.90 + €6.90 gewählt. Komplettpaket €14.90 (sparst €3.90)?"

**Konversion-Mathe-Frage:** Sind die Mini-Preise (4.90 / 6.90) als individuelle SKUs in Stripe (= je 1 Stripe-Product + Checkout-Flow), oder nur „Schein-Pricing" das in den 14.90 mündet wenn der User Komplett-Paket nimmt? Variante 2 ist technisch trivial, Variante 1 ist mehr Setup.

### D6: Print-Pipeline — Wie kommt das PDF zustande?
- **Welle Alpha:** Statisch in Canva designed (1-2 Tage pro Motto), Stripe-Webhook löst Email mit ZIP-Link aus
- **Welle Beta:** Dynamisch generiert (Playwright/Puppeteer HTML→PDF mit Wizard-State eingesetzt)

**Frage Welle Alpha:** Welche **5-7 Killer-Seiten** designst du als erstes? Aus deiner Diskussion:
- 8 Urkunden mit Namen ⭐
- 1 Tag-Ablauf-Plan A4 ⭐
- 5 Spiel-Karten A6 ⭐
- 1 Schatzsuche-Set (Karte + 5 Rätsel) ⭐
- 8 Mitgebsel-Etiketten ⭐

= ca. 20 PDF-Seiten — was kommt rein, was schiebst du auf Welle Beta?

### D7: Migration — was passiert mit P6-1, Welle Alpha, P3-Schatzsuche-Items?
- **P6-1 Einladungs-SEO-Refactor** (Apps → Hubs + noindex) — wird durch Wizard überholt oder bleibt wichtig?
- **Welle Alpha A1-A9** ist spec'd auf 4-Tool-Modell mit Pilot piraten-6-8. Bleibt das oder pivot?
- **P3-14 bis P3-19** (Vorbereitungskarte, 3-Gruppen-Einkaufsliste, SOS-Button, etc.) — wie viele werden Bestandteil des Wizards?

→ Risiko: 5 Wochen Arbeit am alten Modell für die Tonne wenn Wizard sie obsolet macht. Andererseits: Wizard ist 4–8 Wochen Bauzeit, Welle-Alpha-Validation (3 Käufe) ist 3 Wochen. Wir brauchen die Sequenz.

### D8: Welle-Alpha-Relation — Wizard-First oder Validation-First?
- **Option A „Validation-First":** Welle Alpha (3 Käufe in 3 Wochen) wie geplant durchziehen, Wizard erst danach. Risiko: Welle Alpha könnte fehlschlagen weil Funnel = aktuell 3-4/10
- **Option B „Wizard-First":** Erst Wizard-MVP bauen (4 Wochen), DANN Premium-PDF im Wizard verkaufen
- **Option C „Parallel":** Welle Alpha-Pilot auf 1 Motto (piraten-6-8) MIT Wizard für genau dieses Motto bauen. „Wizard-Test + Premium-Test in einem"

→ **C** ist die spannende Option weil sie beide Hypothesen gleichzeitig prüft. Aber: 4-6 Wochen Bauzeit statt 3 Wochen.

---

## Wenn alle 8 entschieden sind…

…schreibe ich:
1. **P7-1** Eintrag in `BACKLOG-AUDIT.md` (Welle Delta, mit Aufwands-Schätzung pro Schritt)
2. **STRATEGIE.md §0.6 (neu)** „Wizard-Funnel-Architektur" — Master-Beschreibung
3. **`ARCHITECTURE.md` Update** — neue Route, neue State-Verwaltung
4. **`OPEN-DECISIONS.md`** — falls Reste offen bleiben

---

## Open ist gerade: D1 (Wizard-Sequenz)

Das ist der foundation — ohne Wizard-Sequenz keine Architektur, kein State-Modell, keine Migration-Strategie. **Start hier?**
