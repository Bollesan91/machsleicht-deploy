# Handoff: Studio-Gamechanger-Ideen (ChatGPT-Doc #2, 14.07.) + Claude-Triage

Quelle: Bolles ChatGPT-Strategie-Feedback nach Soft Launch. WICHTIGER KONTEXT ZUR QUELLE:
ChatGPT konnte die Live-Site NICHT laden (nur Studio-Quellcode gesehen) und kennt unser
Oekosystem nicht. Mehrere "Game Changer" existieren daher teilweise schon:
- "Interaktive Erlebnis-Einladung" (Idee 7) == unsere Spiel-Einladungen (60 Spiele, /e/-Links, Foto-Reveal) — EXISTIERT. Offen ist nur das Andocken ans Studio-PNG (QR zeigt bereits auf die Partyseite mit Spiel).
- "Adresse erst nach Zusage" (Idee 5, Partyseiten-Teil) — EXISTIERT (Worker-Gating von state.adresse). Neu waere nur der PNG-Toggle ("Hamburg-Eimsbuettel, genaue Adresse nach Zusage").
- Kommandozentrale-Fragen (Idee 9): Allergien-Abfrage im RSVP EXISTIERT; Rest (Abholung, Foto-Erlaubnis, Geschwister) = Ausbau.
- Party-Pass verbindet existierende Bausteine (Stationen, Urkunden im Stressfrei-Material, RSVP).

## Claude-Triage (nach Aufwand/Naehe zur Architektur)

| Idee | ChatGPT-Prio | Claude-Einschaetzung |
|---|---|---|
| 1 Autopilot ("Deine Einladung ist fertig" + 3 kuratierte Varianten, Editor = 2. Ebene) | sofort | ZUSTIMMUNG, staerkster Conversion-Hebel. Technisch nah: Prefill + 3 Layouts existieren; fehlt Kuratierungs-Presets + Erste-Ebene-Screen. ~1 Session |
| 4 Share-Paket (WhatsApp-Text vorformuliert, Status-Hochformat, Erinnerungs-/Aenderungstexte) | sehr hoch | QUICK WIN. share() traegt schon text; kuratierte Texte + Kopier-Buttons klein |
| 5 Adressschutz-Toggle aufs PNG | hoch | QUICK WIN, konsistent mit existierendem Worker-Gating, passt zur Datenschutz-DNA |
| 2 Design-Check | sofort | KLEINER ALS GEDACHT: Editor verhindert konstruktiv bereits Text-Abschneiden (fitSingleLine), Elemente-ausserhalb (Position-Clamp 0..420), tote QR-Links (Gating). MVP = Pre-Export-Checkliste: Datum/Zeit leer, Foto leer, Kontrast. "Automatisch schoen machen" nicht overpromisen |
| 3 Gast-Missionen + Party-Pass | sehr hoch | ECHTER DIFFERENZIERER. Braucht Worker (Gast-Links). ACHTUNG Datenschutz: KEINE Klarnamen in URLs (weiterleitbar) -> Gast-Token (?g=<token>), Name nur serverseitig aufgeloest. Party-Pass = Einladung+Zusage+Rolle+Stationen+Urkunde in einem Objekt — Canva/Partiful haben das nicht |
| 6 Design-Gesamtpaket (12 Materialien aus einem Design) | Premium | SPAETER, aber paintCard-Architektur ist genau dafuer gebaut (gleiche Engine, andere Formate). Upsell 9,90 plausibel |
| 7 Interaktives Portal | Premium | Existiert im Kern (s.o.); Feinschliff = Gast-Personalisierung im Spiel |
| 8 Kinder-Kreativmodus | spaeter | ok |
| 9 Kommandozentrale (kindspezifisch: Abholung, Foto-Erlaubnis, Schwimmen, Notfallnummer) | strategisch | Gute kindspezifische Liste; Ausbau des RSVP, Worker-Arbeit |
| 10 Party-Rueckblick | spaeter | ok, verknuepft mit Danke-Karte aus Doc #1 |

## Empfohlene Sprint-Reihenfolge (Claude)
Sprint 1: Autopilot + Share-Paket-Texte + Adressschutz-Toggle (alles Studio-only, kein Worker, ein Review-Gate).
Sprint 2: Design-Check-MVP (Pre-Export-Overlay).
Sprint 3: Gast-Missionen + Party-Pass (Worker: Gast-Token-Routen, RSVP-Verknuepfung) — der Differenzierer.
Audio-Phasen aus Doc #1 (2026-07-14-audio-song-strategie.md) bleiben dahinter unveraendert.

## Offene Bolle-Entscheidungen
- Autopilot-Kuratierung: welche 3 Varianten (klassisch/foto-emotional/modern)?
- Gast-Links: Vorname im Link (lesbar, weiterleitbar) vs Token (privat) — Claude-Empfehlung: Token.
- Design-Gesamtpaket-Preispunkt.
