# Session-Notizen

## Letzte Session
**Datum:** 05.04.2026 (Nachmittag)

## Was wurde gemacht

### Raetsel nach Mass — UI/Flow gebaut (Vorschau-Modus)
- Artifact-Preview mit komplettem Flow (noch nicht als HTML im Repo)
- Editor: Kindername, Garten/Wohnung, Alter-Slider, Landmark-Chips + Freitext
- Ergebnis-View komplett ueberarbeitet nach Sparring:
  - Route-Visualisierung (Start → Station 1 → 2 → ... → Schatz)
  - Intro-Story ("Sophie braucht eure Hilfe!")
  - Stationskarten mit Raetsel, Antwort-Reveal, Wegweiser zum naechsten Hinweis
  - Finale-Karte mit Schatz-Tipp
- Druckansicht: Kaertchen mit Strichelrand zum Ausschneiden
  - "Auslegen bei: [vorherige Station]" auf jeder Karte
- ~20 handgeschriebene Raetsel-Templates fuer gaengige Orte
- Generische Fallback-Templates fuer unbekannte Orte
- Mock-Modus klar gekennzeichnet ("Vorschau — mit KI werden sie individuell")

### Vorherige Session (gleicher Tag, Vormittag)
- Strategie-Dokument komplett konsolidiert
- Kreuzwortraetsel-Generator v1 gebaut und committed
- Siehe aeltere Commits fuer Details

## Naechste Schritte
1. **Raetsel nach Mass als HTML ins Repo** — Artifact in kreuzwortraetsel-artige HTML-Datei umwandeln
2. **Claude API anbinden** — Mock-Raetsel durch echte KI-Raetsel ersetzen
3. **Kreuzwortraetsel testen** — auf echtem Handy, Print, Digital-Spielmodus
4. **Partyseite MVP** — Worker + KV, Formular, Gaeste-View, Admin-View
5. **Sitemap aktualisieren** — kreuzwortraetsel.html + raetsel.html aufnehmen
6. **GitHub Token rotieren!** (laeuft 25.04. ab)

## Offene Fragen
- Raetsel nach Mass: Standalone-Seite /raetsel ODER nur im Planer integriert?
- Claude API Key: Bolle muss Key mitbringen
- Payment: Lemon Squeezy Paywall wann davor schalten?
- Drag & Drop fuer Stations-Reihenfolge?
