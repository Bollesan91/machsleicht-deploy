# Session-Notizen

## Letzte Session
**Datum:** 13.04.2026

## Was wurde gemacht
- **Foto-Feature komplett gebaut und auf alle 9 Mottos ausgerollt**
- **Ersteller:** Canvas-basierter Crop-Circle (WYSIWYG), Zoom-Slider (5x), Touch-Drag, 80×80 JPEG Export
- **Kette:** Ersteller → create-invite (fotoParam) → URL ?foto= → serve-invite (durchreichen) → Spiel (Runner)
- **Alle 9 Spiele:** Dino, Safari, Weltraum, Detektiv, Superheld, Prinzessin, Einhorn, Meerjungfrau, Feuerwehr
- **Pro Spiel 8 Stellen gepatcht:** fotoUrl Prop, URL-Param, Runner-Bild (Foto statt SVG), keine Spiegelung, Cinematic h2 ("Mattis hat X geklaut!"), Cinematic Emoji→Foto, Chase-Bar ("Schnapp dir Mattis!"), Status-Bar ("Schnell, Mattis flüchtet!"), Won-Screen mit Foto
- **Bugfixes:** Slug-Länge (Foto als Query-Param statt im Slug), border→outline (6px Offset), CSS→Canvas Mismatch (Single-Canvas WYSIWYG), Spiegelung, Waddle→Bob Animation, Bild-Vorskalierung (max 500px)

## Nächste Schritte
1. **Einladungs-Engine bauen** — JSON-Config pro Motto + Generator-Script → beliebig neue Mottos in 10 Min
2. **Piraten 3-5 + Piraten 9-12** Elite-Seiten nach Template
3. **Party Worker in Cloudflare re-deployen** (5 Fixes warten!)
4. **GitHub Token rotieren** (Deadline 25.04! — 12 Tage!)
5. SEO-Grundlagen: robots.txt, Sitemap, interne Verlinkung

## Offene Fragen
- Engine-Architektur: shared React-Bundle extrahieren oder weiter self-contained?
- Neue Mottos priorisieren: Ritter, Bauernhof, Unterwasser, Ninja?
- Piraten-Einladung fehlt noch (kein interaktives Spiel)
