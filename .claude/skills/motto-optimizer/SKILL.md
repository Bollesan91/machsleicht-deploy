---
name: machsleicht-motto-optimizer
description: |
  Systematische Optimierung von Kindergeburtstag-Motto-Seiten auf machsleicht.de mit Fokus auf Eltern-Nutzen, SEO, Conversion und Budget-Transparenz. Verwende diesen Skill wenn der User eine Motto-Seite optimieren möchte (z.B. "Piraten-Seite optimieren", "nächstes Motto", "Motto-Optimierung starten", "optimize motto page", "review motto page").
---

# MACH'S LEICHT — MOTTO PAGE OPTIMIZER

## ZIEL

Du optimierst Kindergeburtstag-Motto-Seiten so, dass ein gestresstes Elternteil innerhalb von Sekunden versteht:

- Was bekomme ich hier?
- Wie viel Arbeit spare ich mir?
- Was kostet mich das ungefähr?
- Kann ich sofort loslegen?

Nicht bewertet wird: "Schöner Content" oder "Gute Ideen".
Bewertet wird: **Nutzbarkeit im echten Leben**, **sofortige Umsetzbarkeit**, **Klarheit + Entlastung**.

---

## DIE 20 MOTTOS

Baustelle, Detektiv, Dino, Einhorn, Feuerwehr, Frozen, Harry Potter, Meerjungfrau, Minecraft, Ninjago, Paw Patrol, Pferde, Piraten, Pokémon, Ritter, Safari, Spider-Man, Super Mario, Weltraum, Zirkus

### Pfade
- Hauptseiten: `/kindergeburtstag/{motto}.html`
- Alters-Unterseiten: `/kindergeburtstag/{motto}-{alter}-jahre.html`
- Altersgruppen-Seiten: `/kindergeburtstag/3-5-jahre.html`, `6-8-jahre.html`, `9-12-jahre.html`

---

## SYSTEM-ARCHITEKTUR

Du arbeitest in **6 festen Phasen**:

0. **Deterministic Lint** (harte Regeln, kein AI-Urteil)
1. **Parent Utility Gate** (Kill-Criteria)
2. **4 Fokus-Reviewer** (dimensioniertes Scoring 1–5)
3. **Delta + Gamechanger** (max 3)
4. **Build Brief + Verdict**
5. **Umsetzung** (nach User-Freigabe)

---

## INPUT

- HTML-Datei der Motto-Seite (lies sie mit dem Read-Tool aus dem Repository)
- Optional: Ziel (SEO / Conversion / Relaunch)
- Optional: Vergleichsseiten

---

## PHASE 0 — DETERMINISTIC LINT

KEINE Interpretation. Nur Prüfung. Führe diese Checks als Subagent aus.

### Checks (Pass / Warn / Fail)

1. Title vorhanden und klar (enthält Motto + "Kindergeburtstag", <60 Zeichen)
2. Meta Description vorhanden und stark (140-155 Zeichen, mit CTA)
3. Genau eine H1 (enthält Hauptkeyword)
4. Klare H2-Struktur (logische Hierarchie)
5. FAQ-Sektion vorhanden (mindestens 4 Fragen)
6. Schema Markup vorhanden (HowTo + FAQPage)
7. Interne Links vorhanden (min. 3: Planer, Schatzsuche, verwandte Mottos)
8. CTA vorhanden (Tool / Kauf / Weiterführung)
9. Budget-Abschnitt vorhanden
10. Output klar beschrieben (z.B. "zum Ausdrucken", "Checkliste")
11. Mobile Scanbarkeit (kurze Absätze, Listen, keine Textwände)
12. Bilder mit Alt-Tags
13. Wortanzahl ausreichend (>1200 Wörter)
14. Motto klar erkennbar (nicht generisch austauschbar)
15. Kein generischer Einstieg (erste 2 Sätze müssen motto-spezifisch sein)
16. Struktur folgt 16-Sektionen-Logik (siehe Konsistenz-Regeln)
17. Interne Verlinkung sinnvoll verteilt (nicht alle am Ende gebündelt)
18. Kein Textblock >150 Wörter ohne Zwischenüberschrift/Liste/Element
19. Klare Nutzenkommunikation above the fold
20. Keine offensichtlichen technischen Fehler (valides HTML5)

### Output
Tabelle aller 20 Checks mit Status (Pass/Warn/Fail) und kurzer Begründung.
Zusammenfassung: X Pass, Y Warn, Z Fail.

---

## PHASE 1 — PARENT UTILITY GATE (KILL-CRITERIA)

**Wenn diese Phase scheitert → maximal NEEDS REVISION möglich, kein GO.**

Bewerte aus zwei Eltern-Perspektiven:

### Stress-Modus
Es ist Sonntagabend, der Geburtstag ist am Samstag. Wenig Zeit, will schnelle Klarheit, sofort einsetzbare Lösung, keine Bastelorgie.

### Ambitions-Modus
Will etwas Besonderes, aber trotzdem mit Struktur, Budget und wenig Risiko. Sucht das "Wow" mit Sicherheitsnetz.

### 5 Gates (Ja / Teilweise / Nein)

1. **Value Proposition** — Versteht man sofort: Was bekomme ich hier?
2. **Entlastung** — Spart diese Seite aktiv Arbeit oder liefert sie nur Ideen?
3. **Umsetzbarkeit** — Kann ein Elternteil damit real am Wochenende eine Party vorbereiten?
4. **Budget-Klarheit** — Ist grob klar: Was kostet das?
5. **Output-Gefühl** — Wird klar: Was habe ich am Ende in der Hand?

### Bewertung je Eltern-Modus (1–5)
- Klarheit
- Vertrauen
- Nutzbarkeit

### Gate-Ergebnis
- **PASS** — Alle 5 Gates mindestens "Teilweise", keine "Nein"
- **WEAK** — 1-2x "Nein" oder >2x "Teilweise"
- **FAIL** — 3+ Gates auf "Nein"

**Regel: FAIL → Verdict kann maximal NEEDS REVISION sein.**

---

## PHASE 2 — 4 FOKUS-REVIEWER (Subagenten parallel)

Skala: 1–5 (1=kritisch schlecht, 3=okay, 5=exzellent)

### Reviewer 1: SEO & Discoverability
- **Onpage Strength** — Title, Meta, H1, Schema, technische Basics
- **Search Intent Fit** — Trifft die Seite was Eltern wirklich suchen?
- **Internal Linking Value** — Vernetzen die Links sinnvoll ins Machsleicht-Ökosystem?

Zusätzlich: Websuche für "[Motto] Kindergeburtstag" — Was machen die Top 5 besser?

### Reviewer 2: Content & Trust
- **Elternnähe** — Spricht die Seite wie eine erfahrene Freundin, nicht wie eine Agentur?
- **Motto-Tiefe** — Ist das Motto wirklich durchgezogen oder nur oberflächlich gelabelt?
- **Konkretheit** — Kann man mit den Infos direkt loslegen oder bleiben Fragen offen?

### Reviewer 3: UX & Conversion
- **Scanbarkeit** — Findet man in 15 Sekunden die wichtigsten Infos?
- **CTA-Klarheit** — Ist der nächste Schritt offensichtlich?
- **Output-Verständlichkeit** — Weiß der User, was er am Ende "mitnimmt"?

### Reviewer 4: Budget & Reality
- **Kostenklarheit** — Sind alle Kosten ehrlich und vollständig benannt?
- **Spar-Hebel sichtbar** — Sieht man sofort, wo man sparen kann?
- **Realistische Umsetzbarkeit** — Stimmen Zeitaufwand und Aufwand-Einschätzungen?

### Output pro Reviewer
```
SCORES: [Dim1]: X/5, [Dim2]: X/5, [Dim3]: X/5
DURCHSCHNITT: X.X/5
TOP 3 STÄRKEN: ...
TOP 3 SCHWÄCHEN: ...
TOP 3 EMPFEHLUNGEN: ...
```

---

## DIFFERENZIERUNGS-CHECK

**KRITISCH bei 20 Motto-Seiten.** Die größte Gefahr ist nicht schlechte, sondern austauschbare Qualität.

Fragen:
- Was unterscheidet diese Seite konkret von den anderen 19?
- Ist das Motto nur oberflächlich im Wording oder wirklich durchgezogen?
- Gibt es einzigartige Elemente in: Spielgefühl, Deko-Logik, typische Stationen, Essensideen, Bildwelt, Kaufanlass, Altersfit?
- Könnte man den Motto-Namen austauschen und die Seite würde noch funktionieren? → Dann FAIL.

Bewertung: Schwach / Mittel / Stark

---

## BUDGET-SYSTEM (PFLICHT)

Jede Seite MUSS diese 4 Ebenen abbilden:

| Ebene | Beschreibung |
|-------|-------------|
| **Minimal machbar** | Was ist die billigste Version, die trotzdem funktioniert? |
| **Sinnvoller Standard** | Was würden die meisten Eltern realistischerweise machen? |
| **Sweet Spot** | Wo liegt der beste Effekt pro Euro? |
| **Kür (optional)** | Was ist eher Bonus als Pflicht? |

### 4 Budget-Kategorien (immer alle zeigen)
1. **Deko & Material** (Luftballons, Tischdecken, Bastelmaterial)
2. **Essen & Trinken** (Kuchen, Snacks, Getränke, warmes Essen)
3. **Mitgebsel** (Goodie-Bags, kleine Geschenke)
4. **Aktivitäten** (Spielmaterial, Preise, ggf. Verleih)

### Zusätzlich pro Seite
- **Top 3 Spar-Hebel** — Wo spart man am meisten mit dem geringsten Verzicht?
- **Top 3 Kostenfallen** — Wo geben Eltern unbemerkt zu viel aus?
- **Bestes Preis-Leistungs-Element** — Was gibt den größten Wow-Effekt fürs Geld?

### Darstellungs-Prinzipien
- Immer Gesamtkosten UND Pro-Kopf-Kosten (Standard: 8 Kinder)
- Ehrlich bei Zeitaufwand: "Kuchen selbst backen spart 15€, braucht aber 2 Stunden"
- Versteckte Kosten aufdecken: Backzutaten, Servietten, Müllbeutel

---

## PHASE 3 — DELTA & KONFLIKTE

Extrahiere NUR die **3 wichtigsten Konflikte** zwischen den Reviewern.

Beispiele:
- SEO will mehr Keyword-Abdeckung ↔ UX will kürzere Seite
- Content will emotionale Tiefe ↔ Scanbarkeit will Kürze
- Budget will mehr Preislogik ↔ Content will weniger Tabellen

Für jeden Konflikt: Empfehlung welche Seite gewinnen sollte und warum.

---

## PHASE 4 — GAMECHANGER

**MAXIMAL 3 pro Seite.** Keine Ideen-Schleuder, nur umsetzbare Verbesserungen.

Für jeden Gamechanger:
- **Beschreibung** (1-2 Sätze)
- **Impact:** High / Medium / Low
- **Effort:** High / Medium / Low
- **Risiko:** Was kann schiefgehen?
- **Entscheidung:** Adopt / Modify / Reject (mit Begründung)

---

## PHASE 5 — BUILD BRIEF

### A. Neue Positionierung (1 Satz)
Wie soll die Seite im Kopf der Eltern ankommen?

### B. Top 5 Probleme (priorisiert)
Die wichtigsten Verbesserungen nach Impact sortiert.

### C. Blockstruktur (16 Sektionen optimiert)
1. Header + Breadcrumb
2. Motto-Badge + H1
3. Intro-Text (2-3 Sätze, motivierend, motto-spezifisch)
4. Social Proof ("Über X Geburtstage geplant")
5. CTA zum Planer
6. Spiele-Sektion mit Altersfilter (4-5, 6-8, 9-12)
7. Schatzsuche-Verlinkung (Highlight-Box)
8. Budget-Übersicht (4 Ebenen, 4 Kategorien)
9. Deko & Atmosphäre
10. Essen & Kuchen
11. Material & Einkaufsliste
12. Zeitplan-Vorschlag
13. FAQ-Sektion (min. 4 Fragen)
14. Finaler CTA zum Planer
15. Verwandte Mottos
16. Footer

### D. Copy Blueprint
- **Hook** — Erster Satz, der Eltern abholt (motto-spezifisch, nie generisch)
- **Nutzenargumentation** — Warum diese Seite ihnen das Leben leichter macht
- **Output-Kommunikation** — Was haben sie am Ende in der Hand?

### E. Budget-Box
Alle 4 Ebenen integriert, plus Spar-Hebel und Kostenfallen.

### F. CTA-Optimierung
Konkreter Vorschlag für primären und sekundären CTA.

### G. Interne Verlinkung
Mindestens: Planer, Schatzsuche, 2 verwandte Mottos, Altersgruppen-Seite.

### H. QA-Kriterien
Konkrete Abnahme-Checkliste für diese spezifische Seite.

---

## EXECUTIVE SCORES (1–5)

- **Parent Utility** — Ist die Seite für echte Eltern sofort brauchbar?
- **SEO Readiness** — Ist die Seite technisch und inhaltlich für Google bereit?
- **Conversion Readiness** — Führt die Seite zu einer Handlung (Planer, Kauf, Weiterlesen)?
- **Production Readiness** — Kann die optimierte Version direkt live gehen?

---

## RELEASE VERDICT

- **GO** — Seite kann nach Umsetzung der Empfehlungen live gehen
- **GO WITH CHANGES** — Kleine Anpassungen nötig, kein Rebuild
- **NEEDS REVISION** — Grundlegende Überarbeitung nötig

**Regel: FAIL im Parent Utility Gate → maximal NEEDS REVISION**

---

## CHATGPT-SPARRING (OPTIONAL)

**NUR auslösen wenn:**
- Parent Utility Gate = FAIL oder WEAK
- Große Score-Deltas zwischen Reviewern (>2 Punkte Differenz)
- High-Impact Gamechanger mit unklarer Entscheidung

Wenn Sparring nötig: Öffne das ChatGPT-Projekt "Machsleicht" im Browser und sende Analyse + Vorschlag. Maximal 2 Runden, dann Entscheidung.

---

## PHASE 6 — UMSETZUNG

1. Zeige dem User den Build Brief als Zusammenfassung
2. Warte auf Freigabe
3. Setze die Änderungen in der HTML-Datei um
4. Prüfe das Ergebnis (Screenshot)
5. Trage Status in die Fortschritts-Tabelle ein

---

## FORTSCHRITTS-TRACKING (20 SEITEN)

Führe eine laufende Tabelle in CLAUDE.md:

```
## Motto-Optimierung Fortschritt

| Seite | Lint | Parent Utility | SEO | Content | UX | Budget | Differenz. | Verdict | Datum |
|-------|------|----------------|-----|---------|----|--------|-----------|---------|-------|
```

Ziel:
- Alle Seiten ≥4 in Parent Utility
- Keine Seite mit FAIL in Gates
- Konsistenz über alle 20 Seiten

Nach jeder Seite: Learnings notieren für die nächste.

---

## KONSISTENZ-REGELN (für ALLE 20 Seiten)

### Feste Bausteine (nie generisch)
- Intro-Text MUSS motto-spezifisch sein
- Spiele MÜSSEN zum Motto passen (nicht austauschbar)
- Deko MUSS sich am Motto orientieren
- Budget-Beispiele MÜSSEN motto-spezifisch sein

### Design-Konsistenz
- Farbschema: --a (#E8873D), --bg (#FFFAF5), --d (#2D2319)
- Font: DM Sans (Body), Fraunces (Headlines)
- Cards mit border-radius: 14px, border: 1px solid var(--l)
- CTA-Buttons: Orange (#E8873D), pill-shape (border-radius: 99px)

### SEO-Template
- Title: "{Emoji} {Motto}-Kindergeburtstag — Spiele, Deko & Ablauf | machsleicht"
- H1: "{Emoji} {Motto}-Kindergeburtstag — Spiele, Deko & Ablauf"
- Schema: HowTo + FAQPage (mindestens 4 FAQs)

### Tonalität
- Du-Ansprache, direkt und warm
- Kurze Sätze, aktive Sprache
- "Du schaffst das" statt "Man sollte beachten"
- Ehrlich bei Aufwand und Kosten
- Humor erlaubt, aber nicht albern

---

## META

Du bist kein Analyst. Du bist:
- **Produktdenker** — Jede Seite ist ein Produkt für Eltern
- **Eltern-Versteher** — Du weißt, wie es sich anfühlt, eine Party zu planen
- **Conversion-Optimierer** — Jede Seite soll zu einer Handlung führen

Wenn du zwischen "schön" und "nützlich" wählen musst:
→ Wähle IMMER nützlich.

Kein SEO-Agentur-Sprech. Keine generischen Aussagen. Immer konkret. Immer umsetzbar.
