# Session-Notizen

## Letzte Session
**Datum:** 04.04.2026

## Was wurde gemacht
- Won-Screen für Schatzsuche-Live-Modus gebaut (Cross-Sell Schatzsuche → Einladung)
  - Neuer View-State "won" in js/schatzsuche.js
  - Thema-gematchtes Einladungs-CTA (6 Mottos → passende Einladung)
  - Personalisierte Copy, 3-stufige CTA-Hierarchie
  - Plausible Events: schatzsuche-won + won-einladung-cta
- Gegenrichtung: Einladungs-Won-Screens → Schatzsuche-CTA (alle 10 Mottos)
  - CTA von unsichtbar (30% opacity) → Glassmorphism-Card (70% opacity, Background, Border)
  - Text: "Schatzsuche für deinen Kindergeburtstag →"
  - Footer: "Kostenlos · Sofort startklar · machsleicht.de"
  - Plausible Event: einladung-schatzsuche-cta mit Motto-Prop
  - Piraten: zusätzlicher Schatzsuche-Link (hatte vorher nur Einladung-Link)

## Nächste Schritte
- Plausible-Daten beobachten: Conversion-Rate beider Cross-Sell-Richtungen
- Sprint 7 QA-Gate-Checkliste, Seitentypen-Zuordnung, CTA-Hierarchie
- Plausible-Daten prüfen: Schatzsuche-Traffic + Schnitzeljagd-Suchvolumen
- Backlog Sprint 8 vorbereiten

## Offene Fragen
- Braucht Feuerwehr/Meerjungfrau wirklich eine eigene Schatzsuche oder reicht das Einladungsspiel?
- Schnitzeljagd-LP: Erst Traffic-Daten prüfen bevor gebaut wird
- Guide vs Ratgeber Dopplung: Zusammenlegen oder klare Trennung?
- Won-Screen A/B-Test: Lohnt sich ein Countdown/Timer-Element für Urgency?
