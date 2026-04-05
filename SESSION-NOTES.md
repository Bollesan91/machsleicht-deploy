# Session-Notizen

## Letzte Session
**Datum:** 05.04.2026

## Was wurde gemacht

### Ort-Eingabe pro Station + Smart-Emoji-Matching
- LOCATION_EMOJI_MAP mit 55+ Keywords (Rutsche→🛝, Baum→🌳, Trampolin→🤸 etc.), Fallback 📍
- matchLocationEmoji() Funktion für Keyword→Emoji Zuordnung
- stationLocations State (persistiert), Eingabefeld "Wo versteckst du diesen Hinweis?" pro Station
- Karte zeigt Emoji + Ortsname statt Aktivitätsname, Label-Breite 20 Zeichen / 90px
- Print: "📍 Versteck:" in Stationsliste + Hinweis-Zettel mit echten Orten

### Emoji-Palette für Schatzkarte
- Theme-spezifische Emojis (dedupliziert aus scatter+pathDeco) + 8 universelle (🎈🎉⭐❤️🎀🎵🏠🌈)
- Tap-to-Place: Emoji in Palette wählen → auf Karte tippen → platziert
- Fraktional-Koordinaten (fx/fy 0–1), überleben Resize
- Drag: platzierte Emojis verschiebbar (Tap-vs-Drag mit 5px Schwelle)
- Einzeln löschen: Tap auf Deko → roter Ring + "🗑️ Entfernen"-Button
- Limit: max 15 Deko-Emojis, Zähler "(3/15)" in Palette
- "✕ Alle Deko"-Button zum Komplett-Reset

### Edge-Case-Fixes
- Guard-Effect: stale selectedDekoIdx wird automatisch zurückgesetzt
- Theme-Wechsel: activeDekoEmoji + selectedDekoIdx + dekoEmojis + stationLocations alle zurückgesetzt
- Print: _redrawClean() zeichnet Karte ohne Selection-Ring vor Canvas-Capture

### Build
- 3759 Zeilen, 254KB kompiliert

## Nächste Schritte
1. **Handy-Test** — Ort-Eingabe + Emoji-Palette auf Touch testen
2. **Rätsel nach Maß als HTML** — Artifact ins Repo konvertieren
3. **Schatzkarte + Rätsel = ein Flow** — zusammenführen
4. **Claude API anbinden** — Mock → echte KI-Rätsel
5. **GitHub Token rotieren!** (läuft 25.04. ab)

## Offene Fragen
- Canvas-Karte: Print-Qualität prüfen (DPR-Handling)
- Rätsel nach Maß: standalone /raetsel ODER nur im Planer?
- Soll die letzte Station (Schatz) auch ein Ort-Feld bekommen?
