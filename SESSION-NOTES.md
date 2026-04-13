# Session-Notizen

## Letzte Session
**Datum:** 13.04.2026

## Was wurde gemacht
- **Foto-Feature für Dino-Einladung gebaut:** Komplette Kette über 4 Dateien
- **Ersteller:** Foto-Upload mit Canvas-Compress (64×64 JPEG, quality 0.25), nur bei Dino sichtbar
- **create-invite / serve-invite:** foto-Parameter durchreichen (base64 in URL)
- **Dino-Spiel:** Runner (Ei 8) zeigt Foto statt SVG-Ei, personalisierte Texte ("Mattis hat das Ei geklaut!", "Fang Mattis ein!", "Schnapp dir Mattis!"), Won-Screen mit Foto, Dots mit Foto
- Altes "Foto bei Ei 5" entfernt → Ei 5 ist wieder normaler Dino2
- Foto-Upload-Feld nur bei Motto=Dino sichtbar
- Backup-Dateien aufgeräumt, serve-invite Duplikat entfernt

## Nächste Schritte
1. **Foto-Feature auf alle anderen Mottos anwenden** (Safari, Piraten, Weltraum, Detektiv, Superheld, Prinzessin, Einhorn, Meerjungfrau, Feuerwehr)
2. **Piraten 3-5 + Piraten 9-12** Elite-Seiten nach Template bauen
3. **Party Worker in Cloudflare re-deployen** (5 Fixes warten!)
4. **GitHub Token rotieren** (Deadline 25.04! — 12 Tage!)
5. SEO-Grundlagen: robots.txt, Sitemap, interne Verlinkung

## Offene Fragen
- Foto-Qualität: 64×64 JPEG q0.25 ausreichend für alle Mottos? Evtl. auf 80×80 q0.35 hochgehen?
- Skalierung: 60+ Seiten manuell oder Content-Generator mit Claude API?
- Amazon PartnerNet-Tag machsleicht21-21 verifizieren
