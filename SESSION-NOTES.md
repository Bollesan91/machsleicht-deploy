# Session-Notizen

## Letzte Session
**Datum:** 05.04.2026

## Was wurde gemacht

### Planer-Fix: JSX pre-compiled, Seite laeuft wieder
- Problem: Seite war weiss — JSX-Version (von Hannes' Session) wurde deployed ohne Pre-Compilation
- Loesung: JSX mit Babel pre-compiled zu React.createElement (2832 Zeilen)
- Babel standalone entfernt (~700KB Pageload gespart)
- Daten inline in kindergeburtstag.js (5242 Zeilen gesamt) — kein separater Datei-Load
- Dummy-Text "Die Einladung teast die Schatzsuche an" im Connector ersetzt
- Runtime-Tests bestanden, Seite laeuft auf Mobile

### CTA-Deep-Links auf 281 Motto/Alters-Seiten
- Alle "Planer"-CTAs und Sticky-Buttons verlinken jetzt mit Parametern
- Motto-Seiten: /kindergeburtstag?motto=safari#planer
- Motto+Alter: /kindergeburtstag?motto=safari&alter=5#planer
- Reine Alters-Seiten: /kindergeburtstag?alter=4#planer
- Mottos ohne React-ID (meerjungfrau, pferde etc.): /kindergeburtstag#planer
- Breadcrumbs, Logo, Footer unveraendert

### Premium-Strategie (aus vorheriger Session, jetzt im Repo)
- Feature-Ranking nach Viral x Cash (Top 14)
- Revenue-Projektion bei 5k/10k/20k Besuchern
- Wunschliste-Details, Multiplayer, Wachstums-Ideen
- Alles in _dev/docs/premium-strategie-2026-04.md

## Technischer Stand
- kindergeburtstag.js: Pre-compiled JSX + Daten inline (5242 Zeilen)
- kindergeburtstag-data.js: existiert noch im Repo, wird aber nicht mehr geladen
- kindergeburtstag.html: React 18 + ein Script-Tag, kein Babel
- [skip netlify] funktioniert NICHT bei Netlify — alle Pushes deployen

## Naechste Schritte
1. **Raetsel nach Mass** als erstes Premium-Feature bauen (ein Claude API-Call, VK 2.99)
2. **WhatsApp-Partyseite** als Grundlage fuer Wunschliste
3. **Wunschliste mit Affiliate** — Top-Revenue-Feature
4. **ElevenLabs testen** — deutsche Piratenstimme
5. **JSX-Workflow verbessern** — JSX als Source behalten, Pre-Compile als Build-Step
6. **GitHub Token rotieren** (war in Chat sichtbar)

## Offene Fragen
- Mottos ohne React-ID (meerjungfrau, pferde, detektiv, zirkus, baustelle, ritter): zu ALL_MOTTOS hinzufuegen?
- kindergeburtstag-data.js: aus Repo entfernen oder als Backup behalten?
- [skip netlify] → [skip ci] umstellen fuer zukuenftige Docs-only Commits?
