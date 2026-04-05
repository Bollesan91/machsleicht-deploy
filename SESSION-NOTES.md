# Session-Notizen

## Letzte Session
**Datum:** 05.04.2026

## Was wurde gemacht

### Architektur-Umbau: Ein Planer, eine Seite
- Mode-Switch "Geburtstag vs Schatzsuche" komplett entfernt
- Separater SZ-Wizard, SZ-Peak-View, SZ-Plan-View entfernt (~370 Zeilen)
- Schnitzeljagd ist jetzt ein **Add-on Toggle** im Geburtstag-Plan (szActive State)
- SchnitzeljagdBlock-Komponente: collapsed = "Schnitzeljagd hinzufuegen" Button, expanded = voller Inline-Block

### SchnitzeljagdBlock (expandierbarer Inline-Block im Plan)
- Theme-Picker (6 Themes im Grid)
- Kindername-Feld (optional)
- Intro-Story (vorlesbar)
- Stations-Accordion (kompakt, mit Typ-Badges + Eltern-Tipps)
- Schatzkarten-Editor (React-State, click-to-place, Emoji-Palette, Undo/Clear)
- Material-Checkliste (als Details/Summary, mit Checkboxen + Amazon-Affiliate)
- Print-Komplettpaket (5 Seiten: Karte + Stationen + Hinweis-Zettel + Material + Urkunde)
- ControlHub zeigt "Schnitzeljagd" Toggle-Status (aktiv/inaktiv)

### Naming: "Schnitzeljagd" statt "Schatzsuche"
- Generischer Name fuer die Mechanik (Stationen + Raetsel + Finale)
- "Schatzsuche" ist nur der Piraten-Name
- UI sagt "Schnitzeljagd hinzufuegen", Theme-Name erscheint nach Auswahl

### Cleanup
- planMode/isSZ/switchToSZ komplett entfernt
- Connector-Komponente entfernt
- Cross-sell Card entfernt
- Mode-Switch Hero entfernt
- Feature-Chips zeigen jetzt "+ Schatzsuche" statt "Kosten pro Kind"
- ~21KB Code eingespart (234KB statt 255KB)

## Technischer Stand
- `_src/kindergeburtstag.jsx` — JSX Source (~1100 Zeilen)
- `_src/kindergeburtstag-data.js` — Daten (~2420 Zeilen)
- `_src/build.sh` — esbuild Build (10ms)
- `js/kindergeburtstag.js` — Compiled (3261 Zeilen, 234KB)
- Redirects: /schatzsuche + /schnitzeljagd → 301 auf /kindergeburtstag?modus=schatzsuche#planer
- szActive State in localStorage persistiert

## Naechste Schritte
1. **Mobile-Testing** — Schnitzeljagd-Toggle, Theme-Grid, Map-Editor, Print
2. **Raetsel nach Mass** — Erstes Premium-Feature
3. **WhatsApp-Partyseite** als viraler Kanal
4. **Wunschliste mit Affiliate**
5. **GitHub Token rotieren** (wurde im Chat geteilt!)

## Offene Fragen
- URL ?modus=schatzsuche setzt szActive=true — soll das den Plan direkt oeffnen oder nur den Toggle voraktivieren?
- Unterseiten-Canonicals noch auf /schatzsuche/* — umbiegen?
- activeStation State wird nicht mehr benutzt — entfernen?
