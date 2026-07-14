# Handoff: Audio/Song-Strategie + Studio-Roadmap (aus Bolles Strategie-Doc 14.07.)

Quelle: machsleicht_audio_song_ideen_und_studio_strategie.docx (Bolle-Upload, ChatGPT-Session).
Die 3 Code-Fixes daraus sind ERLEDIGT (Commit-Verweis: Studio-V13-Hardening). Dieser Handoff haelt den Strategie-Teil fest.

## Leitidee
PNG-Einladung = Teaser (WhatsApp-Share). Partyseite = interaktives Erlebnis (Audio, Spiel, RSVP).
Druckpaket = Durchfuehrung am Geburtstag. Alles was klingt/spielt gehoert auf die Partyseite, nie ins PNG.
Langfristiger Kern: nicht Einladungsgenerator, sondern Erlebnisplattform fuer Kindergeburtstage.

## Reihenfolge (von Bolle abgesegnete Phasen)
1. JETZT: Studio produktionsreif — 3 Code-Fixes (done), Export/Share auf echten Geraeten (iOS!), alle 15 Mottos visuell pruefen. Danach begrenzter Soft Launch statt weiterer Feature-Runden.
2. DANACH: Audio-Einladung auf der Partyseite (geskriptete Motto-Stimmen: Professor Rex, Feuerwehr-Funkzentrale, Regenbogen-Fee, Kapitaen Kalle, Space Commander, Geheime Zentrale). Play-TEASER aufs PNG (nicht klickbar, QR/Link fuehrt zur Partyseite). MVP ohne personenbezogene Daten. Idee-Rating 92/100.
3. PREMIUM-TEST: Audio-Stationen fuer Dino 6-8 (QR-Audios pro Station im Druckpaket; entlastet Eltern am Partytag). Vermutlich staerkstes Stressfrei-Feature.
4. DANACH: Geburtstagssong-Beta (Suno o.ae., NUR offizielle/kommerziell belastbare API; Vorname+Alter+Motto+max 3-6 Gaeste-VORNAMEN; nie Nachname/Adresse/Kinderstimmen). Rating 90/100.
5. SPAETER: Party-Day-Modus (Regie-App), Trailer, Fake-Call, Danke-Karte, Soundboard, personalisierte Gast-Links (?g=emma).

## Paket-/Preislogik (Richtwerte aus dem Doc)
Free (Bild-Einladung, Basis-Partyseite, RSVP) -> Plus (Audio-Einladung, 2,90-4,90) ->
Stressfrei (Druckmaterial/Schatzsuche) -> Deluxe (+Audio-Stationen/Song/Trailer, 19,90-29,90).
Einzelpreise: Motto-Jingle 3,90-6,90 · Song 6,90-9,90.

## Produktprinzipien (bindend)
- Keine freie KI mit Kindern im MVP; alles geskriptet und geprueft.
- Keine unnoetigen personenbezogenen Daten an Audio-/Musikdienste; Vorname reicht.
- Beste UX: automatisch fertig, optional anpassbar.
- mlplan_v4_state bleibt read-only fuer alle Tools; Studio-Key machsleicht-studio-v1.
