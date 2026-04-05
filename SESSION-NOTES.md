# Session-Notizen

## Letzte Session
**Datum:** 05.04.2026

## Was wurde gemacht

### Ort-Eingabe pro Station + Smart-Emoji-Matching
- LOCATION_EMOJI_MAP mit 55+ Keywords, Fallback 📍
- Eingabefeld "Wo versteckst du diesen Hinweis?" pro Station, IMMER SICHTBAR (außerhalb <details>)
- Karte zeigt Emoji separat über Stations-Kreis + Ortsname darunter (24 Zeichen / 120px)
- Print: Versteck-Hinweise in Stationsliste + Hinweis-Zettel

### Emoji-Palette für Schatzkarte
- Theme-Emojis + 8 universelle (🎈🎉⭐❤️🎀🎵🏠🌈), Max 15
- Tap-to-Place, Drag, Tap-to-Select + Einzeln löschen (🗑️-Button)
- Fraktional-Koordinaten (resize-safe), Selection-Ring (rot gestrichelt)
- _redrawClean() für sauberen Print ohne Selection-Ring

### UX-Verbesserungen
- Drilldown-Chevron ▼ an Stations-Summary
- Guards gegen Stale-State bei Theme-Wechsel (activeDekoEmoji, selectedDekoIdx, dekoEmojis, stationLocations)

### MAP_THEMES erweitert (NEU, noch nicht deployed)
- safari: Savanne-Farbpalette, 🦁🐘🦒 Scatter
- einhorn: Lila/Rosa, 🦄🌈💖 Scatter
- feuerwehr: Orange/Rot, 🔥🚒🧯 Scatter

### Build
- 3769 Zeilen, 255KB kompiliert

## Nächste Schritte — MOTTO-KONSISTENZ (PRIORITÄT)
Ziel: Alle 9 generischen Mottos überall verfügbar (Planer + Schatzsuche)

### Fehlende SZ_THEMES erstellen (je 15 Stationen + Material + Schatz):
1. **safari** — Safari-Schatzsuche (SZ_THEMES + SZ_SHOP_ITEMS + SZ_LABELS)
2. **einhorn** — Einhorn-Schatzsuche
3. **feuerwehr** — Feuerwehr-Schatzsuche

### Fehlende Planer-Mottos erstellen (je 9 Spiele + Deko + Kuchen):
4. **detektiv** — Detektiv-Einsatz (GENERIC Array)
5. **dschungel** — Dschungel-Expedition (GENERIC Array)
6. **feen** — Feenzauber (GENERIC Array)

### Danach:
7. **SZ_LABELS** aktualisieren (safari, einhorn, feuerwehr hinzufügen)
8. **SZ_SHOP_ITEMS** für safari, einhorn, feuerwehr
9. **Motto→Theme Auto-Select** beim Aktivieren der Schnitzeljagd
10. **Handy-Test** aller neuen Features

## Konsistenz-Matrix (IST → SOLL)
| Motto | Planer | Schatzsuche | MAP_THEME |
|---|---|---|---|
| piraten | ✅ | ✅ | ✅ |
| weltraum | ✅ | ✅ | ✅ |
| dino | ✅ | ✅ | ✅ |
| safari | ✅ | ❌ TODO | ✅ NEU |
| einhorn | ✅ | ❌ TODO | ✅ NEU |
| feuerwehr | ✅ | ❌ TODO | ✅ NEU |
| detektiv | ❌ TODO | ✅ | ✅ |
| dschungel | ❌ TODO | ✅ | ✅ |
| feen | ❌ TODO | ✅ | ✅ |

## Offene Fragen
- GitHub Token rotieren (läuft 25.04. ab)
- Rätsel nach Maß: standalone /raetsel ODER nur im Planer?
