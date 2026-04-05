# Session-Notizen

## Letzte Session
**Datum:** 05.04.2026

## Was wurde gemacht

### Planer-Fix: JSX pre-compiled, Seite laeuft wieder
- Problem: Seite war weiss — JSX-Version wurde deployed ohne Pre-Compilation
- Loesung: JSX mit Babel pre-compiled zu React.createElement (2832 Zeilen)
- Babel standalone entfernt (~700KB Pageload gespart)
- Daten inline in kindergeburtstag.js (5242 Zeilen gesamt)
- Dummy-Text im Connector ersetzt
- Seite laeuft auf Mobile

### CTA-Deep-Links auf 281 Motto/Alters-Seiten
- Alle Planer-CTAs und Sticky-Buttons verlinken jetzt mit Parametern
- Motto-Seiten: /kindergeburtstag?motto=safari#planer
- Motto+Alter: /kindergeburtstag?motto=safari&alter=5#planer
- Reine Alters-Seiten: /kindergeburtstag?alter=4#planer
- Breadcrumbs, Logo, Footer unveraendert

### Architektur-Entscheidung: Schatzsuche in den Planer integrieren
- Schatzsuche/Schnitzeljagd wird KEIN separates Tool mehr
- Mode-Switch im Planer: "Kompletter Geburtstag / Nur Schatzsuche"
- SEO-Seiten /schatzsuche und /schnitzeljagd bleiben als Content-Funnels
- Verlinken auf /kindergeburtstag?modus=schatzsuche#planer
- Eine Codebasis, eine Datenbasis — vereinfacht auch Premium-Features

## Technischer Stand
- kindergeburtstag.js: Pre-compiled JSX + Daten inline (5242 Zeilen)
- kindergeburtstag-data.js: existiert noch, wird nicht mehr geladen
- kindergeburtstag.html: React 18 + ein Script-Tag, kein Babel
- [skip netlify] funktioniert NICHT — alle Pushes deployen

## Naechste Schritte
1. **Schatzsuche-Integration** in den Planer (Mode-Switch, Stationen als Zeitplan-Block)
2. **Raetsel nach Mass** als erstes Premium-Feature
3. **WhatsApp-Partyseite** als Grundlage fuer Wunschliste
4. **Wunschliste mit Affiliate**
5. **JSX-Workflow** — JSX als Source, Pre-Compile als Build-Step
6. **GitHub Token rotieren**

## Offene Fragen
- Mottos ohne React-ID (meerjungfrau, pferde etc.): zu ALL_MOTTOS hinzufuegen?
- kindergeburtstag-data.js aus Repo entfernen?
- [skip ci] statt [skip netlify] fuer Docs-only Commits?
