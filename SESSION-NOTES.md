# Session-Notizen

## Letzte Session
**Datum:** 05.04.2026

## Was wurde gemacht

### JSX-Workflow aufgesetzt
- Original-JSX aus Git-History extrahiert (commit d4cd5b8^)
- `_src/kindergeburtstag.jsx` als Single Source of Truth
- `_src/kindergeburtstag-data.js` — alle Daten (Mottos + SZ_THEMES + SZ_LABELS)
- `_src/build.sh` — esbuild Build in 10ms

### Schnitzeljagd als Inline-Add-on im Geburtstags-Plan
- **Kein separater Modus** mehr — ein Planer, eine Seite, ein Flow
- SchnitzeljagdBlock: expandierbarer Toggle im Plan-View
  - Collapsed: "+ Schnitzeljagd hinzufuegen" Button
  - Expanded: Theme-Picker (6 Themes), Kindername, Intro-Story, Stations-Accordion, Schatzkarten-Editor (React-State), Material-Checkliste, Print-Komplettpaket (5 Seiten)
- ControlHub zeigt Schnitzeljagd Toggle-Status (aktiv/inaktiv)
- Naming: "Schnitzeljagd" (generisch), Theme-Name erscheint nach Auswahl

### Schatzkarten-Editor
- React-State (mapItems: [{emoji, x, y}]) statt DOM-Manipulation
- Emojis ueberleben Re-Renders, persistieren in localStorage
- Schatzkarte wird im Komplettpaket-Print mitgedruckt
- Theme-spezifische Emoji-Palette + universelle Marker
- Undo + Clear-All Buttons

### Redirects + Cleanup
- /schatzsuche → 301 auf /kindergeburtstag?modus=schatzsuche#planer
- /schnitzeljagd → 301 auf /kindergeburtstag?modus=schatzsuche#planer
- 12 Unterseiten-CTAs auf Planer mit Theme-Parameter umgebogen
- js/schatzsuche.js geloescht
- ?modus=schatzsuche oeffnet Plan direkt mit szActive + Default-Motto
- Entfernt: Mode-Switch, SZ-Wizard, SZ-Peak, SZ-Plan, Connector, Cross-sell, planMode/isSZ/switchToSZ, activeStation

### Bugfixes
- Possessiv Peak-View (Max' statt Maxs)
- Emergency-Buttons setzen planMode auf geburtstag
- Sticky-CTA auch in Peak-View versteckt
- Plausible tracking mit szActive + thema
- Dead code entfernt (nameDisplay, activeStation)

## Technischer Stand
- `_src/kindergeburtstag.jsx` — JSX Source (~1090 Zeilen)
- `_src/kindergeburtstag-data.js` — Daten (~2420 Zeilen, inkl. SZ_THEMES, SZ_LABELS)
- `_src/build.sh` — Build-Script (esbuild, 10ms)
- `js/kindergeburtstag.js` — Compiled Output (3267 Zeilen, 234KB)
- Alles laeuft von /kindergeburtstag aus, ein Flow

## Naechste Schritte
1. **Mobile-Testing** — Schnitzeljagd-Toggle, Theme-Grid, Map-Editor, Print auf echtem Handy
2. **Raetsel nach Mass** — Erstes Premium-Feature (KI-generierte Raetsel passend zum Ort der Eltern)
3. **WhatsApp-Partyseite** — Grundlage fuer Wunschliste + viraler Kanal
4. **Wunschliste mit Affiliate**
5. **GitHub Token rotieren** (wurde im Chat geteilt!)

## Offene Fragen
- Unterseiten-Canonicals noch auf /schatzsuche/* — umbiegen auf /kindergeburtstag?
- kindergeburtstag-data.js (alt, im js/ Ordner) aus Repo entfernen?
