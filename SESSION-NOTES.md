# Session-Notizen

## Letzte Session
**Datum:** 04.04.2026

## Was wurde gemacht
- Won-Screen für Schatzsuche-Live-Modus gebaut (Cross-Sell Schatzsuche → Einladung)
- Neuer View-State "won" in js/schatzsuche.js eingefügt
- "Geschafft!"-Button leitet jetzt auf Won-Screen statt direkt zurück zum Plan
- Thema-gematchtes Einladungs-Mapping: piraten→/einladung, dschungel→safari, weltraum→weltraum, detektiv→detektiv, dino→dino, feen→einhorn
- Personalisierte Copy (Name des Kindes wenn vorhanden)
- Drei CTA-Stufen: Primary (passende Einladung), Secondary (anderes Motto), Tertiary (zurück zum Plan)
- Trust-Zeile: "Kostenlos · Interaktives Spiel inklusive · Zum Verschicken per WhatsApp"
- Plausible Events: schatzsuche-won (thema, alter, name) + won-einladung-cta (thema, ziel, typ)

## Nächste Schritte
- Won-Screen live testen (Ende deploy wenn bereit)
- Plausible-Daten beobachten: Conversion-Rate Won→Einladung tracken
- Sprint 7 QA-Gate-Checkliste, Seitentypen-Zuordnung, CTA-Hierarchie
- Plausible-Daten prüfen: Schatzsuche-Traffic + Schnitzeljagd-Suchvolumen
- Backlog Sprint 8 vorbereiten
- Gegenrichtung prüfen: Einladung-Won-Screens → Schatzsuche-CTA

## Offene Fragen
- Braucht Feuerwehr/Meerjungfrau wirklich eine eigene Schatzsuche oder reicht das Einladungsspiel?
- Schnitzeljagd-LP: Erst Traffic-Daten prüfen bevor gebaut wird
- Guide vs Ratgeber Dopplung: Zusammenlegen oder klare Trennung?
- Won-Screen A/B-Test: Lohnt sich ein Countdown/Timer-Element für Urgency?
