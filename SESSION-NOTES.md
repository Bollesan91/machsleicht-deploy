# Session-Notizen

## Letzte Session
**Datum:** 05.04.2026

## Was wurde gemacht

### JSX-Workflow aufgesetzt
- Original-JSX aus Git-History extrahiert (commit d4cd5b8^)
- `_src/kindergeburtstag.jsx` als Single Source of Truth (~1500 Zeilen JSX)
- `_src/kindergeburtstag-data.js` — alle Daten inkl. SZ_THEMES + SZ_LABELS
- `_src/build.sh` — esbuild Build in 12ms

### Schatzsuche komplett in Planer integriert
- **Mode-Switch** im Hero: "Kompletter Geburtstag / Nur Schatzsuche"
- **Wizard**: 6 Themes im responsive Grid (auto-fill, min 90px), Kindername-Feld
- **Plan-View**: Intro-Story, Stations-Accordion, Schatzkarten-Editor, Material, Affiliate, Print
- **Schatzkarten-Editor**: Emoji-Palette (theme-spezifisch + Marker), Click-to-place auf Pergament-Canvas, Click-to-remove
- **Komplettpaket-Print**: 4-Seiten Popup (Stationen + Hinweis-Zettel + Material-Checkliste + Urkunde) mit CSS page-break
- **Sticky Bottom Bar**: Drucken / Anderes Thema / Geburtstag
- **URL-Support**: ?modus=schatzsuche&thema=piraten&alter=6

### Alle internen Links konsolidiert
- ControlHub, SchatzsucheTeaser, Nav-Bar, Cross-sell → Mode-Switch statt /schatzsuche
- Nur Footer behaelt /schatzsuche (SEO)

### Redirects + Cleanup
- /schatzsuche → 301 auf /kindergeburtstag?modus=schatzsuche#planer
- /schnitzeljagd → 301 auf /kindergeburtstag?modus=schatzsuche#planer
- 12 Unterseiten-CTAs auf Planer mit Theme-Parameter umgebogen
- schatzsuche.html + schnitzeljagd.html → minimale Redirect-Fallbacks
- js/schatzsuche.js geloescht
- SZ_LABELS Map statt .replace()-Hack fuer Theme-Namen

## Technischer Stand
- `_src/kindergeburtstag.jsx` — JSX Source (~1500 Zeilen)
- `_src/kindergeburtstag-data.js` — Daten (~2420 Zeilen, inkl. SZ_THEMES, SZ_LABELS)
- `_src/build.sh` — Build-Script (esbuild, 12ms)
- `js/kindergeburtstag.js` — Compiled Output (3529 Zeilen, 251KB)
- Alles laeuft von /kindergeburtstag aus

## Naechste Schritte
1. **Mobile-Testing** — Mode-Switch, Theme-Grid, Map-Editor, Print auf echtem Handy
2. **Raetsel nach Mass** — Erstes Premium-Feature (KI-generierte Raetsel passend zum Ort)
3. **WhatsApp-Partyseite** — Grundlage fuer Wunschliste + viraler Kanal
4. **Wunschliste mit Affiliate**
5. **GitHub Token rotieren** (wurde im Chat geteilt!)

## Offene Fragen
- Mottos ohne React-ID (meerjungfrau, pferde etc.): zu ALL_MOTTOS hinzufuegen?
- kindergeburtstag-data.js (alt, im js/ Ordner) aus Repo entfernen?
- schatzsuche.html Unterseiten: canonical URLs pruefen (zeigen noch auf /schatzsuche/*)
