# CTA-Hierarchie machsleicht.de

**Stand:** 04.04.2026  
**Kernregel:** Pro sichtbarem Bereich genau 1 dominante Hauptaktion. Max 1 Sekundär-CTA.

---

## CTA-Stufen

| Stufe | Funktion | Styling | Beispiel |
|-------|----------|---------|----------|
| **Primär** | DIE eine Kernaktion | Volle Farbe, groß, prominent | "Schatzsuche erstellen →" |
| **Sekundär** | Für noch Unsichere | Outline/Ghost, kleiner | "Erst mal Beispiel ansehen" |
| **Tertiär** | Unterstützender Deep-Link | Text-Link, dezent | "Mehr über Piraten-Mottos" |

---

## CTA-Standard je Seitentyp

### Hub-Seite (z.B. /kindergeburtstag)
- **Above the fold:** 1 Primär-CTA → Tool starten ("Geburtstag planen →")
- **Motto-Grid:** Je Motto 1 Tertiär-CTA → Motto-Detail
- **Footer-Bereich:** 1 Sekundär-CTA → Cross-Sell (z.B. Schatzsuche)

### Tool-LP (z.B. /schatzsuche)
- **Above the fold:** 1 Primär-CTA → Thema wählen & erstellen
- **Nach Themen-Auswahl:** 1 Primär-CTA → Builder starten
- **Nach Ergebnis:** 1 Primär-CTA → Output (drucken/teilen) + 1 Sekundär → Cross-Sell (Einladung)

### Programmatic Detail (z.B. /kindergeburtstag/dino-6-jahre)
- **Above the fold:** 1 Primär-CTA → Planer starten mit diesem Motto+Alter
- **Content-Bereich:** Tertiär-Links zu verwandten Mottos
- **Ende:** 1 Primär-CTA → Planer + 1 Sekundär → Schatzsuche zum Motto + 1 Sekundär → Einladung zum Motto

### Ratgeber (z.B. /kindergeburtstag-checkliste)
- **Above the fold:** Content first (Nutzer will lesen, nicht klicken)
- **Nach 50% Scroll:** 1 Primär-CTA → Tool das den Ratgeber-Content automatisiert
- **Ende:** 1 Primär-CTA → Tool + 1 Tertiär → verwandte Ratgeber

### Einladungsspiel (z.B. /einladung/dino/)
- **Won-Screen:** 1 Primär-CTA → Schatzsuche zum Motto (DONE ✅)
- **Darunter:** 1 Sekundär → "Auch eine Einladung erstellen?" für andere Mottos

---

## Anti-Patterns (was wir NICHT machen)

1. ❌ Mehrere gleichstarke CTAs im selben Sichtbereich
2. ❌ CTA ohne klares Ziel ("Mehr erfahren" ohne Kontext)
3. ❌ Affiliate-Links als Primär-CTA (die sind immer Sekundär oder Tertiär)
4. ❌ Cross-Sell vor dem Kern-CTA (erst Tool nutzen, dann Cross-Sell)

---

## Farb-Referenz

| CTA-Typ | Hintergrund | Text | Border |
|---------|-------------|------|--------|
| Primär | #E8873D (Orange) oder #FFD700 (Gold bei Dark) | #fff oder #1a1a2e | keine |
| Sekundär | transparent | #E8873D | 1px solid #E8873D |
| Tertiär | transparent | #6B5D52 | keine (Underline) |
