# Session-Notizen

## Letzte Session
**Datum:** 14.04.2026

## Was wurde gemacht
- **Foto-Runner Feature komplett:** Alle 9 Mottos (Dino, Safari, Weltraum, Detektiv, Superheld, Prinzessin, Einhorn, Meerjungfrau, Feuerwehr)
- **Crop-UI:** Canvas-basiert (WYSIWYG), Zoom 5x, Touch-Drag, 120px Export
- **Runner:** 80px Foto, keine Spiegelung, bob-Animation, personalisierte Texte
- **Won-Screen:** "Du hast [Name] gefangen! 🎉"
- **Kurze URLs:** Kompakte JSON-Keys (187 Zeichen statt 1500+)
- **CTA:** Partyseite-Banner nach Einladungs-Erstellung
- **Party Worker v3:** Embedded Game-Iframe, postMessage("gameComplete") in allen 9 Spielen, Auto-Scroll zu RSVP nach Game, Confetti bei RSVP "Dabei!", Urgency-Badge ("Noch X frei!") auf Wunschliste
- **Bugfixes:** Netlify Blobs (Load failed → revert), }; Position in 7 Spielen, border→outline Crop-Offset, CSS→Canvas Mismatch

## Nächste Schritte
0. **Cloudflare Worker deployen** (LAPTOP-SESSION nötig!)
   - KV Namespace "PARTY" erstellen in Cloudflare Dashboard
   - Worker binden (`party-worker.js` → `party.machsleicht.de`)
   - Custom Domain `party.machsleicht.de` aktivieren
   - Testen: Creator-Flow → Gast-View → RSVP → Wunschliste
1. **Einladungs-Engine bauen** — JSON-Config pro Motto + Generator-Script
2. **Piraten 3-5 + 9-12** Elite-Seiten
3. **GitHub Token rotieren** (Deadline 25.04! — 11 Tage!)
4. SEO-Grundlagen: robots.txt, Sitemap, interne Verlinkung

## Offene Fragen
- Game-Iframe Höhe: min(70vh, 560px) — reicht das auf allen Geräten?
- Foto in Party-Daten: Woher kommt es? Braucht Upload im Creator-Flow
- Piraten-Einladung fehlt (kein interaktives Spiel)
- Engine-Architektur: shared React-Bundle extrahieren oder weiter self-contained?
