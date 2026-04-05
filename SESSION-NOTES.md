# Session-Notizen

## Letzte Session
**Datum:** 05.04.2026

## Was wurde gemacht

### Strategie-Dokument komplett ueberarbeitet
- Premium-Strategie (_dev/docs/premium-strategie-2026-04.md) konsolidiert
- Alle Premium-Features aus Chat-History in ein Dokument zusammengefuehrt
- Vision mit Standalone-Prinzip und fuenf Saeulen (Planer, Partyseite, Wunschliste, Raetsel nach Mass, Kreuzwortraetsel)
- Premium-Kandidaten in 3 Tiers (Raetsel, ElevenLabs, Text-only)
- Partyseite als integriertes Fundament-Feature (RSVP, Allergien, Abholzeit, Wunschliste)
- 3 User Flows zur Partyseite (aus Planer, direkt, aus Wunschliste)
- URL: /party/{random-token} + PIN = Kindername
- Affiliate-Link-Konvertierung mit Domain-Mapping-Tabelle
- Wettbewerber-Analyse (Wunschbiber, Partiful, Whocan, Joy)
- Beteiligen = nur Koordination, kein Geldfluss
- Geburtstagssong -> Backlog, Multiplayer -> Langfrist-Vision
- Revenue-Projektion als optimistisch-konservativ markiert
- ElevenLabs-Klumpenrisiko dokumentiert
- Backend: Cloudflare Workers + KV

### Kreuzwortraetsel-Generator gebaut (v1)
- kreuzwortraetsel.html — komplett clientseitig, single-file React
- Drei Modi: Leer drucken, Loesungsblatt, Digital spielen
- Loesungswort eingeben, Fragen+Antworten pro Buchstabe
- Live-Validierung, auto-Positionierung, responsive Grid
- Digital: Input-Felder, Auto-Focus, gruene Felder, Konfetti
- Loesungswort-Tracker unter dem Grid
- Umlaute als Einzelzeichen (kein AE/OE/UE)
- Responsive Felder (1fr mobil, 1fr 1fr desktop)
- Redirect /kreuzwortraetsel eingetragen

### Sparring-Runden
- Kreuzwortraetsel als Raetsel-nach-Mass-Format eingeordnet
- Partyseite Pro/Contra, Cloudflare Workers Kapazitaet
- Wettbewerber-Research
- Prio-Wechsel: Raetsel nach Mass VOR Partyseite

## Naechste Schritte
1. **Kreuzwortraetsel testen** — Handy + Desktop, Print, Digital-Spielmodus
2. **Raetsel nach Mass** — Claude API, UI im Schnitzeljagd-Block, VK 2.99
3. **Partyseite MVP** — Worker + KV, Formular, Gaeste-View, Admin-View
4. **Sitemap aktualisieren** — kreuzwortraetsel.html aufnehmen
5. **GitHub Token rotieren!** (laeuft 25.04. ab)

## Offene Fragen
- Kreuzwortraetsel: PDF-Export noetig oder reicht Browser-Print?
- Raetsel nach Mass: Prompt-Engineering fuer altersgerechte Raetsel
- Partyseite: KV-Namespace "PARTY" anlegen in Cloudflare Dashboard
