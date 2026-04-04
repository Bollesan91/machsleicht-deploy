# Session-Notizen

## Letzte Session
**Datum:** 04.04.2026

## Was wurde gemacht
- Bug gefixt: Neue Einladungs-Mottos (Detektiv, Superheld, Prinzessin, Einhorn, Meerjungfrau, Feuerwehr) führten alle zur Piraten-Einladung
- Ursache: VALID_MOTTOS in beiden Netlify Functions (create-invite.mjs + serve-invite.mjs) enthielt nur 4 Mottos statt 10
- Fix: Alle 10 Mottos in beide VALID_MOTTOS-Arrays eingetragen

## Nächste Schritte
- Sprint 7 weitermachen: QA-Gate-Checkliste, Seitentypen-Zuordnung, CTA-Hierarchie
- Task 3 aus Backlog: 248 Kindergeburtstag-Detailseiten → CTA zu Einladung ergänzen
- Plausible-Daten prüfen: Schatzsuche-Traffic + Schnitzeljagd-Suchvolumen
- Backlog Sprint 8 vorbereiten

## Offene Fragen
- Braucht Feuerwehr/Meerjungfrau wirklich eine eigene Schatzsuche oder reicht das Einladungsspiel?
- Schnitzeljagd-LP: Erst Traffic-Daten prüfen bevor gebaut wird
- Guide vs Ratgeber Dopplung: Zusammenlegen oder klare Trennung?
