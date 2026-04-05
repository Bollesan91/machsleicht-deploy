# Session-Notizen

## Letzte Session
**Datum:** 05.04.2026

## Was wurde gemacht

### JSX-Workflow aufgesetzt
- Original-JSX aus Git-History extrahiert (commit d4cd5b8^)
- `_src/kindergeburtstag.jsx` — 1061→1350 Zeilen lesbares JSX (Single Source of Truth)
- `_src/kindergeburtstag-data.js` — alle Daten (GENERIC, LICENSE, ALL_MOTTOS + SZ_THEMES, SZ_SHOP_ITEMS, SZ_SCHATZ_LINKS)
- `_src/build.sh` — esbuild kompiliert JSX, concat mit Daten → `js/kindergeburtstag.js` (12ms Build)
- Connector-Fix aus commit 0faa8e1 in JSX uebernommen

### Schatzsuche in Planer integriert
- **Mode-Switch** im Hero: Segmented Control "Kompletter Geburtstag / Nur Schatzsuche"
- **Schatzsuche-Wizard**: 6 Themes (Piraten, Dschungel, Weltraum, Detektiv, Dino, Feen) im 3x2 Grid, Kindername-Feld (optional, personalisiert Intro), Gaeste-Step entfaellt
- **Schatzsuche Plan-View**: Intro-Story (vorlesbar), Stations-Timeline als Accordion mit Typ-Badges (Suchen/Raetseln/Action/Basteln/Finale) + Eltern-Tipps, Material-Checkliste mit Checkboxen, Schatz-Ideen + Amazon-Affiliate, Einkaufsliste (Pflicht/Optional), Print-Button
- **Peak-View** fuer Schatzsuche (personalisiert mit Kindername + Intro)
- **Sticky Bottom Bar** im SZ Plan-View: Drucken / Anderes Thema / Geburtstag
- **URL-Support**: ?modus=schatzsuche&thema=piraten&alter=6
- **State-Persistenz**: planMode, szThemeId, childName in localStorage
- Schatzsuche Cross-sell nur im Geburtstag-Modus sichtbar

## Technischer Stand
- `_src/kindergeburtstag.jsx` — JSX Source (~1350 Zeilen)
- `_src/kindergeburtstag-data.js` — Daten (~2418 Zeilen)
- `_src/build.sh` — Build-Script
- `js/kindergeburtstag.js` — Compiled Output (3369 Zeilen, 240KB)
- Build: `bash _src/build.sh` (12ms, esbuild)
- [skip netlify] funktioniert NICHT — alle Pushes deployen

## Naechste Schritte
1. **Testen auf Mobile** — Mode-Switch, Theme-Auswahl, Plan-View pruefen
2. **Schatzkarten-Editor** — Drag&Drop Emoji-Map aus der alten schatzsuche.js portieren
3. **Raetsel nach Mass** — Erstes Premium-Feature (KI-generierte Raetsel passend zum Ort)
4. **Hinweis-Zettel Generator** — Druckbare Zettel zum Ausschneiden
5. **Urkunden-Generator** — Personalisierte Urkunden pro Kind
6. **SEO-Seiten /schatzsuche und /schnitzeljagd** — CTA-Links auf ?modus=schatzsuche#planer umbiegen
7. **WhatsApp-Partyseite** als Grundlage fuer Wunschliste
8. **GitHub Token rotieren**

## Offene Fragen
- Mottos ohne React-ID (meerjungfrau, pferde etc.): zu ALL_MOTTOS hinzufuegen?
- kindergeburtstag-data.js aus Repo entfernen (liegt jetzt in _src)?
- [skip ci] statt [skip netlify] fuer Docs-only Commits?
- schatzsuche.html: soll die weiterhin eigenstaendig funktionieren oder redirect auf /kindergeburtstag?modus=schatzsuche?
