# Session-Notizen

## Letzte Session
**Datum:** 05.04.2026 (Abend)

## Was wurde gemacht

### Raetsel nach Mass v4 — Story-driven mit zwei Modi
- Artifact-Preview (noch nicht als HTML im Repo)
- 6 Mottos mit eigenem Charakter + Gegenspieler (Kapitaen Schwarzbart vs Piraten-Pete etc.)
- Motto-spezifische Raetsel pro Landmark (~60 handgeschriebene Templates)
- Mini-Aufgaben pro Station ohne Material (themed pro Motto)
- Zwei Modi: Spontan (vom Handy vorlesen) und Geplant (Zettel drucken + Buchstaben-Code)
- Draussen + Drinnen kombinierbar
- Route-Visualisierung, Intro-Story, Stationskarten, Finale
- Druckansicht mit ausschneidbaren Kaertchen
- Cross-Sell zum Kreuzwortraetsel

### Schatzkarte v5 — Canvas-basiert, interaktiv
- Artifact-Preview (noch nicht als HTML im Repo)
- Canvas-gezeichnete Pergament-Karte mit Texturen, Flecken, Raendern
- 6 Themen mit eigener Farbpalette + 15 Scatter-Emojis + Pfad-Deko
- Weltraum = dunkler Nachthimmel, Feen = rosa, Dino = gruen etc.
- Catmull-Rom Splines fuer glatte Kurven
- Alle Stationen verschiebbar (auch Start + Schatz) per Touch/Maus
- Native Touch-Events mit passive:false (verhindert Seiten-Scroll)
- Smartes Emoji-Matching: ~50 Keyword-Regeln (Hundehütte→🐕, Pool→🏊 etc.)
- Emoji-Picker: Antippen zum Aendern, 6 Kategorien, 80+ Emojis
- "Als Bild speichern" Button (canvas.toDataURL → PNG Download)
- Kompassrose, Eckverzierungen, Titel mit Name

### Sparring
- Raetsel v1-v3 iterativ verbessert nach Feedback
- "Keine Story, kein Abenteuer" → Story-driven mit Charakteren
- "Keine Karte" → Canvas-Schatzkarte gebaut
- "Nicht verschiebbar" → Drag & Drop implementiert
- "Nur nach oben schiebbar" → Native Touch-Events Fix
- "Was bei unbekannten Orten?" → Smart Matching + Picker

## Technischer Stand
- Beide Tools existieren als Artifacts, NICHT als HTML im Repo
- kreuzwortraetsel.html — committed, im Repo
- Strategie-Dokument — committed, aktuell

## Naechste Schritte
1. **Schatzkarte als HTML ins Repo** — Artifact → single-file React HTML
2. **Raetsel nach Mass als HTML ins Repo** — mit Schatzkarte integriert
3. **Schatzkarte + Raetsel = ein Flow** — Stationen waehlen → Karte → Raetsel → alles drucken
4. **Claude API anbinden** — Mock-Raetsel durch echte KI ersetzen
5. **Kreuzwortraetsel testen** — auf echtem Handy
6. **Sitemap** — neue Seiten aufnehmen
7. **GitHub Token rotieren!** (laeuft 25.04. ab)

## Offene Fragen
- Schatzkarte + Raetsel: ein Tool oder zwei getrennte Seiten?
- Alters-Anpassung: aktuell nur UI, tut nichts (braucht KI)
- Drag & Drop fuer Stations-Reihenfolge in der Liste?
- Raetsel nach Mass VK: 2.99 erst mit KI oder Template-Version schon kostenpflichtig?
