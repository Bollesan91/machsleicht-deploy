# Session-Notizen

## Letzte Session
**Datum:** 04.04.2026

## Was wurde gemacht

### Planer-Umbau Phase 1: Layout + Features (deployed)
- **JS prettifyed:** 70 minifizierte → 6.800+ lesbare Zeilen
- **Control Hub:** Fixed Bottom Bar (Einladung/Schatzsuche/PDF), position:fixed
- **Sticky CTA** im Plan-View ausgeblendet (kein doppelter Bottom Bar)
- **Einladungs-Block:** Dark Card mit Namenseingabe + Live-WhatsApp-Preview, motto-abhängige Greetings
- **Narrativer Connector:** "Die Einladung teast die Schatzsuche an"
- **Schatzsuche-Teaser:** "30 Min Abenteuer. Du trinkst Kaffee." + interaktiver Stationen-Explorer (5 antippbare Stationen, locked/unlocked)
- **6 motto-spezifische Stationen-Sets** (Piraten, Safari, Dino, Weltraum, Einhorn, Feuerwehr) + Default-Fallback
- **Zeitplan auf Accordion** umgebaut (details/summary, nur erster Schritt offen)
- **Score-Loop verdrahtet:** Einladung erstellt → +11% Bereitschafts-Check, neue Dimension "Einladung" im Radar
- **Redundante CTAs entfernt** (alte Einladung + Schatzsuche Blöcke unten)
- **CTA State Change:** Button wird grün + Text ändert sich nach Klick

### Daten-Separation (vorbereitet, NICHT deployed)
- **kindergeburtstag-data.js** erstellt (2.409 Zeilen): Alle Motto-Daten (GENERIC, LICENSE), BBL, ALL_MOTTOS, STATION_SETS, DEFAULT_STATIONS, MOTTO_GREETINGS, ageGroup/ageLabel
- Syntax-Check bestanden
- Wird in der nächsten Session als Grundlage für den JSX-Neuaufbau verwendet

### Entscheidung: JSX-Neuaufbau
- Problem identifiziert: 6.800 Zeilen React.createElement-Ketten sind unwartbar
- Plan: kindergeburtstag.js als JSX/Babel mit Komponenten-Architektur neu aufbauen
- Stack bleibt gleich (React CDN + Babel standalone, kein Build-Step)
- Daten und UI sauber getrennt (2 Script-Tags)

## Nächste Schritte
1. **JSX-Neuaufbau von kindergeburtstag.js** — Komponenten-Architektur:
   - ControlHub, EinladungBlock, SchatzsucheTeaser, Zeitplan, ScoreCheck, DekoListe, Einkaufsliste
   - kindergeburtstag.html anpassen: Babel standalone laden, data.js als separates Script
   - Alle aktuellen Features 1:1 portieren
   - Testen auf Mobile

2. **Nach Neuaufbau:** Visueller Test auf Handy, dann iterativ Features verbessern

## Offene Fragen
- Control Hub vs. Sticky CTA: Sticky CTA wird jetzt per useEffect ausgeblendet im Plan-View — reicht das oder braucht es sauberere Lösung?
- Accordion: Safari/Chrome Rendering-Unterschiede bei position:absolute in details?
- MOTTO_GREETINGS: Nur 14 Mottos abgedeckt — was wenn neue Mottos dazukommen?
