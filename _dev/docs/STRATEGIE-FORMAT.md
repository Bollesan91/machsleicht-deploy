# Strategie-Dokument: Input-Format für die Sparring Engine

## Zweck

Dieses Dokument beschreibt, wie ein Strategie-Dokument aufgebaut sein sollte, damit die Sparring Engine maximale Qualität bei der Task-Extraktion liefert.

---

## Grundstruktur

```
# Projektname
Kurze Zusammenfassung: Was ist das Projekt, was soll erreicht werden?

## Ziel
Konkretes, messbares Ziel (z.B. "Conversion-Rate um 30% steigern",
"SEO-Ranking in Top 3 für Hauptkeywords")

## Zielgruppe
Wer soll die Website nutzen? Demografisch, psychografisch, technisch.

## Ist-Zustand
Was existiert aktuell? Was funktioniert, was nicht?

## Maßnahmen

### 1. [Bereich]: [Titel der Maßnahme]
Beschreibung der Maßnahme (2-5 Sätze).
- Konkrete Anforderung A
- Konkrete Anforderung B
- Konkrete Anforderung C

### 2. [Bereich]: [Titel der Maßnahme]
...

## Constraints
- Budget: X €
- Timeline: bis [Datum]
- Tech-Stack: [z.B. Next.js, WordPress]
- Sonstige Einschränkungen

## Prioritäten
Was muss zuerst passieren? Was ist nice-to-have?
```

---

## Felder im Detail

### Projektname (Pflicht)
Eine Zeile. Wird als Projekttitel in der Task-Liste angezeigt.

### Ziel (Pflicht)
Das übergeordnete Ziel. Je konkreter, desto besser werden die Tasks. "Mehr Umsatz" ist schlecht — "Conversion-Rate der Pricing-Page von 2.1% auf 4% steigern" ist gut.

### Zielgruppe (Empfohlen)
Hilft der Engine, UX/Marketing/Content-Tasks richtig zu gewichten. Ohne Zielgruppe werden Tasks generischer.

### Ist-Zustand (Empfohlen)
Wenn URLs zum Crawlen angegeben werden, ergänzt die Engine diesen Block automatisch. Trotzdem hilfreich: was die Daten nicht zeigen (z.B. Bounce-Rates, Nutzerfeedback, bekannte Probleme).

### Maßnahmen (Pflicht)
Das Herzstück. Jede Maßnahme wird zu einem oder mehreren Tasks. Regeln für optimale Extraktion:

- Jede Maßnahme klar benennen: "[Bereich]: [Was]"
- Bereiche verwenden: `content`, `design`, `dev`, `seo`, `legal`, `analytics`
- Konkrete Anforderungen als Sub-Punkte
- Keine schwammigen Formulierungen ("irgendwie verbessern")
- Abhängigkeiten explizit machen ("erst nach X")

### Constraints (Empfohlen)
Budget, Timeline, Tech-Einschränkungen. Fließen in die Aufwand-Schätzung und Priorität der Tasks ein.

### Prioritäten (Empfohlen)
Explizite Priorisierung überschreibt die automatische Einschätzung. Begriffe verwenden: "Muss" / "Sollte" / "Könnte".

---

## Beispiel: Minimales Dokument

```
# Relaunch machsleicht.de

## Ziel
Conversion-Rate für Demo-Anfragen um 40% steigern.

## Maßnahmen

### 1. Design: Hero Section komplett neu
Aktuelle Hero konvertiert schlecht. Neuer Ansatz: Problem-Solution-Format
mit Social Proof und klarem CTA.
- Headline: Pain Point der Zielgruppe
- Subline: Lösung in einem Satz
- CTA: "Kostenlose Demo"
- Social Proof: Logos + Testimonial

### 2. Content: Pricing Page überarbeiten
Aktuelle Seite ist zu komplex. Vereinfachen auf 3 Pakete.
- Vergleichstabelle mit Feature-Matrix
- FAQ-Section unter den Paketen
- Jährlich vs. Monatlich Toggle

### 3. SEO: Blog-Strategie aufsetzen
Kein organischer Traffic. 10 Pillar-Pages zu Hauptthemen.
- Keyword-Recherche für Website-Builder-Nische
- Content-Kalender für 3 Monate
- Interne Verlinkungsstrategie

### 4. Dev: Performance-Optimierung
Lighthouse Score unter 60. Ziel: über 90.
- Bilder auf WebP/AVIF umstellen
- Lazy Loading für Below-the-fold
- Critical CSS extrahieren
```

---

## Beispiel: Ausführliches Dokument

```
# Relaunch machsleicht.de — Phase 2

## Ziel
1. Conversion-Rate Demo-Anfragen: 2.1% → 4%+
2. Organischer Traffic: +200% in 6 Monaten
3. Lighthouse Performance Score: 90+

## Zielgruppe
Primär: KMU-Geschäftsführer (35-55), die erstmals eine professionelle
Website brauchen. Technisch wenig versiert, budgetbewusst, wollen
Ergebnisse sehen.
Sekundär: Marketing-Manager in mittelständischen Unternehmen, die den
aktuellen Webauftritt modernisieren wollen.

## Ist-Zustand
- Website existiert seit 2022, WordPress
- Bounce Rate Homepage: 67%
- Durchschnittliche Session: 1:23 min
- Top-Seiten: Homepage (45%), Pricing (22%), Features (18%)
- Bekanntes Problem: CTA "Kontakt" statt "Demo" — Nutzer wissen nicht
  was sie erwartet
- Lighthouse: Performance 54, Accessibility 78, SEO 82

## Maßnahmen

### 1. Design: Hero Section — Problem-Solution-Framework
Muss: Sofort umsetzen.
Die aktuelle Hero hat eine generische Headline ohne Bezug zum Pain Point.
Neuer Ansatz: Problem in Headline, Lösung in Subline, Demo als CTA.
- Headline: "Ihre Website verliert Kunden?" (o.ä. Pain-fokussiert)
- Subline: machsleicht Lösung in max 12 Worten
- Primärer CTA: "Kostenlose Demo buchen" (statt "Kontakt")
- Social Proof: 3-4 Kundenlogos + eine Kurz-Testimonial
- Hero-Bild: Echtes Dashboard statt Stock-Foto
Abhängigkeit: Keine

### 2. Design: Pricing Page Redesign
Muss: Direkt nach Hero.
3-Spalten-Layout: Starter / Professional / Enterprise.
- Feature-Vergleichstabelle
- "Beliebteste Wahl" Badge für mittleres Paket
- FAQ direkt unter Pricing (Top 5 Fragen)
- Monatlich/Jährlich Toggle mit Ersparnis-Anzeige
- CTA pro Paket: "Jetzt starten" (nicht "Kontakt")
Abhängigkeit: Keine

### 3. Content: Trust-Elemente auf allen Seiten
Sollte: Nach Hero + Pricing.
Testimonials, Case Studies, und Zahlen systematisch einbauen.
- 3 ausführliche Case Studies (je 500-800 Worte)
- "Zahlen die überzeugen" Section (X Kunden, Y Websites, Z% Zufriedenheit)
- Testimonial-Slider mit Foto + Firma + Ergebnis
Abhängigkeit: Design-Entscheidung für Testimonial-Format

### 4. SEO: Pillar-Content-Strategie
Sollte: Parallel zu Design-Maßnahmen.
10 Pillar-Pages zu Website-Builder-relevanten Themen.
- Keyword-Recherche: "website erstellen lassen", "website baukasten vergleich", etc.
- Pro Pillar-Page: 2000+ Worte, interne Links, FAQ-Schema
- Content-Kalender: 2 Artikel/Woche für 3 Monate
Abhängigkeit: Keine

### 5. Dev: Performance-Sprint
Muss: Parallel, vor Go-Live.
Lighthouse von 54 auf 90+.
- Alle Bilder: WebP/AVIF mit srcset
- Lazy Loading: Alles below-the-fold
- Critical CSS inline, Rest async
- Font-Loading optimieren (font-display: swap)
- Unused JS/CSS entfernen
Abhängigkeit: Keine (kann parallel laufen)

### 6. Legal: DSGVO-Audit
Muss: Vor Go-Live.
- Cookie-Banner überprüfen (aktuell nicht compliant)
- Datenschutzerklärung aktualisieren
- Impressum prüfen
- Consent-Management implementieren
Abhängigkeit: Keine

## Constraints
- Budget: 15.000€ für Phase 2
- Timeline: Go-Live in 8 Wochen
- Tech: WordPress bleibt (kein Replatforming)
- Team: 1 Designer, 1 Dev, 1 Content Writer

## Prioritäten
1. Hero + Pricing (Muss, Woche 1-3)
2. Performance + Legal (Muss, Woche 2-4)
3. Trust-Elemente (Sollte, Woche 3-5)
4. SEO-Content (Sollte, Woche 4-8, laufend)
```

---

## Tipps für maximale Qualität

1. **Konkret schlägt vage**: "Headline fokussiert auf Pain Point mit max 8 Worten" ist besser als "Bessere Headline"
2. **Bereiche benennen**: Wenn du `content`, `design`, `dev`, `seo`, `legal`, `analytics` als Präfix nutzt, werden Tasks sauberer kategorisiert
3. **Abhängigkeiten explizit**: "Erst nach X" wird zu einer `dependencies`-Verknüpfung
4. **Muss/Sollte/Könnte**: Diese Begriffe werden direkt zu `must`/`should`/`could` Prioritäten
5. **Messbare Ziele**: "Conversion von 2.1% auf 4%" gibt der Engine Kontext für die Bewertung
6. **Website-URLs mitgeben**: Crawl-Daten + Strategie-Dokument zusammen liefern die besten Tasks
7. **Nicht zu granular**: Die Engine zerlegt Maßnahmen selbst in Tasks. Eine Maßnahme mit 3-5 Anforderungen ist ideal. Einzelne CSS-Änderungen als Maßnahme sind zu kleinteilig.
