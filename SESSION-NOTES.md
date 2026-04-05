# Session-Notizen

## Letzte Session
**Datum:** 05.04.2026

## Was wurde gemacht

### JSX-Workflow aufgesetzt
- Original-JSX aus Git-History extrahiert (commit d4cd5b8^)
- `_src/kindergeburtstag.jsx` als Single Source of Truth (~1090 Zeilen)
- `_src/kindergeburtstag-data.js` — alle Daten (Mottos + SZ_THEMES + SZ_LABELS)
- `_src/build.sh` — esbuild Build in 10ms

### Architektur-Umbau: Ein Planer, eine Seite
- Zwei getrennte Planer (Geburtstag + Schatzsuche) zu einem einzigen Tool zusammengefuehrt
- Schnitzeljagd ist ein **Inline-Add-on Toggle** im Geburtstag-Plan (szActive State)
- SchnitzeljagdBlock: collapsed = "+ Schnitzeljagd hinzufuegen", expanded = voller Block
- Kein separater Modus, kein Mode-Switch, kein separater Wizard/Peak/Plan-View
- Naming: "Schnitzeljagd" (generisch), Theme-Name erscheint nach Auswahl

### SchnitzeljagdBlock (expandierbar im Plan)
- Theme-Picker (6 Themes: Piraten, Dschungel, Weltraum, Detektiv, Dino, Feen)
- Kindername (optional, personalisiert Intro + Stationen)
- Intro-Story, Stations-Accordion, Schatzkarten-Editor (React-State), Material-Checkliste
- Print-Komplettpaket (5 Seiten: Karte + Stationen + Hinweis-Zettel + Material + Urkunde)

### Schatzkarten-Editor
- React-State (mapItems) statt DOM-Manipulation
- Emojis persistieren in localStorage, ueberleben Re-Renders
- Schatzkarte wird im Komplettpaket-Print mitgedruckt
- Theme-spezifische Emoji-Palette + universelle Marker
- Undo + Clear-All

### Redirects + Cleanup
- /schatzsuche + /schnitzeljagd → 301 auf /kindergeburtstag?modus=schatzsuche#planer
- 12 Unterseiten-CTAs auf Planer mit Theme-Parameter umgebogen
- js/schatzsuche.js geloescht, schatzsuche.html = Redirect-Fallback
- ?modus=schatzsuche voraktiviert Toggle (kein Auto-Plan, kein Auto-Motto)

### UX-Fixes
- Hero-CTAs entfernt (redundant, Wizard ist direkt darunter)
- emergencyFull in emergencyStart gemergt
- Feature-Chip: "+ Schnitzeljagd"
- Possessiv-Fix (Max' statt Maxs)
- Sticky-CTA in Peak-View versteckt
- Dead code entfernt (activeStation, nameDisplay, Connector, planMode, isSZ)

## Technischer Stand
- `_src/kindergeburtstag.jsx` — ~1090 Zeilen JSX
- `_src/kindergeburtstag-data.js` — ~2420 Zeilen Daten
- `_src/build.sh` — esbuild (10ms)
- `js/kindergeburtstag.js` — 3222 Zeilen, 233KB compiled
- Alles laeuft von /kindergeburtstag, ein Flow

## Naechste Schritte
1. **Mobile-Testing** — Schnitzeljagd-Toggle, Theme-Grid, Map-Editor, Print auf echtem Handy
2. **Raetsel nach Mass** — Erstes Premium-Feature
3. **WhatsApp-Partyseite** — viraler Kanal
4. **Wunschliste mit Affiliate**
5. **GitHub Token rotieren!**

## Offene Fragen
- Unterseiten-Canonicals noch auf /schatzsuche/* — umbiegen?
- kindergeburtstag-data.js (alt, im js/ Ordner) aus Repo entfernen?
