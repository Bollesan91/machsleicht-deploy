# Session-Notizen

## Letzte Session
**Datum:** 04.04.2026

## Was wurde gemacht

### Planer-Umbau Phase 1 (deployed)
- JS prettifyed (70 → 6800+ Zeilen)
- Control Hub (Fixed Bottom Bar: Einladung/Schatzsuche/PDF)
- Einladungs-Block mit Namenseingabe + Live-WhatsApp-Preview
- Schatzsuche-Teaser mit interaktivem Stationen-Explorer (6 Motto-Sets)
- Zeitplan auf Accordion umgebaut
- Score-Loop verdrahtet (+11% fuer Einladung)
- Redundante CTAs entfernt, Sticky CTA im Plan-View ausgeblendet

### Daten-Separation (committed, nicht deployed)
- kindergeburtstag-data.js erstellt (2.409 Zeilen)
- Vorbereitung fuer JSX-Neuaufbau

### Premium-Strategie entwickelt (Sparring-Session)
- Komplettes Strategiedokument: _dev/docs/premium-strategie-2026-04.md
- 7 Premium-Features definiert mit Kosten/VK/Marge
- Wunschliste mit Affiliate + Beteiligen-Funktion als Top-Revenue-Feature
- WhatsApp-Partyseite als viraler Akquise-Kanal
- Standalone /wunschliste als eigene Kategorie
- Multiplayer-Schatzsuche fuer 8-12 Jaehrige
- Sofort-Schatzsuche Abo (2.99/Monat)
- 6 weitere Wachstums-Ideen (Klassen-Kalender, Geschenkeberater, Einschulung, Advent, Mitgebsel, Countdown)
- Feature-Ranking nach Viral x Cash
- Revenue-Projektion: ~1k bei 5k Besuchern, ~3k bei 10k, ~7.6k bei 20k/Monat

## Naechste Schritte
1. **Live testen:** Planer-Umbau auf Mobile pruefen
2. **ElevenLabs testen:** Bolle testet deutsche Piratenstimme selbst
3. **JSX-Neuaufbau:** kindergeburtstag.js mit Komponenten-Architektur
4. **Raetsel nach Mass:** Erstes Premium-Feature bauen (ein Claude API-Call)
5. **WhatsApp-Partyseite:** Grundlage fuer Wunschliste
6. **Wunschliste:** Affiliate-Integration, Beteiligen-Funktion

## Offene Fragen
- ElevenLabs deutsche Stimmen: gut genug fuer Piraten-Charakter?
- Wunschliste: eigene DB noetig oder reicht localStorage + Share-Link?
- Multiplayer: Websockets vs Polling vs Firebase Realtime?
