# Einladungs-Trailer (Backlog P8-14) — Prototypen

Stand 16.09.2026. Drei Mottos laufen: **Weltraum** (`index.html`, 22 s), **Piraten** (`piraten.html`, 24 s),
**Ritter** (`ritter.html`, 24 s). Jede Seite rechnet aus einer Canvas-Animation ein **MP4 (H.264 + AAC) komplett im
Browser** (WebCodecs + mp4-muxer 5.2.2, inline), mit Vorschau, Ton-Vorschau, Datei-Input fürs Kinderfoto (bleibt lokal,
Standard: Demo-Kind Ida aus `bilder/demo/ida.jpg`) und einem Testprotokoll (WebCodecs, Encoder, AAC, Größe, Renderzeit,
Wiedergabe, Teilen). Stories: `STORY.md` (Weltraum), `STORY-piraten.md`, `STORY-ritter.md`.

## Bauweise: ein Motor, N Drehbücher

- `build/src/core.js` — der Motor: Konstanten, Zeichen-/Easing-Helfer, Foto-Logik, Vorschau-Loop, Ton-Engine
  (OfflineAudioContext + Synth-Helfer `tone/noise/bell/gull/bed`), Testprotokoll, MP4-Export. Ein Drehbuch liefert
  `{id, title, DUR, drawFrame(i), audio(ac, master, synth), photoDefault}` und ruft `startTrailer(MOTTO)`.
- `build/src/piraten.js`, `build/src/ritter.js` — Drehbücher (Szenen, Figuren, Texte, Ton).
- `build/src/shell.html` — Seitengerüst mit Platzhaltern (Titel, Lede, Theme, Defaults, Skripte).
- `build/build-motto.js <id>` — setzt Muxer, Core, Drehbuch und Ida-DataURI in die Shell und schreibt
  `build/<id>.html` **und** `../<id>.html` (diesen Ordner). Motto-Metadaten (Titel, Emoji, Theme, Defaults) stehen oben
  im Skript in `MOTTOS`.
- **Weltraum läuft noch auf der Einzeldatei** `build/story.src.html` + `build/build.js` (Vorgänger des Motors, gleicher
  Code, nicht zerlegt). Migration auf den Motor ist offen.
- `build/server.js` — Mini-Server für Tests (Port 8778, `POST /save` legt Renders in `build/out/` ab).
  `build/mp4check.py <datei>` — prüft eine MP4 ohne ffmpeg (Boxen, Dauer, Spuren, fastStart).

Neues Motto: Drehbuch `build/src/<id>.js` nach dem Muster von `ritter.js` schreiben, Eintrag in `MOTTOS`,
`node build-motto.js <id>`, Bildtest über den Server (`window._seek(sek)` + Canvas-Ausschnitte), rendern, `mp4check.py`.

## Gelernt (Bildtest reicht nicht — Bolle sieht Bewegung)

- Effekte mit Fortschritt `u` steigen bei `u<=0` aus, sonst stehen Tropfen/Rauch dauerhaft im Bild.
- Zeichenreihenfolge bestimmt, was „im Wasser" oder „hinter der Mauer" liegt (Insel VOR dem fernen Wellenband).
- Großfiguren nie vor das Kindergesicht; lieber halb aus dem Bild.
- Jede Figur braucht ein eindeutiges Richtungs-Merkmal (Schild HINTER dem Reiter drehte die gefühlte Sitzrichtung um).
- Gliedmaßen zählen: `horseLegs()` zeichnete vier Beine und wurde zweimal gerufen → acht Beine im Flug.
- Drei aufeinanderfolgende Bewegungsphasen einer Szene lesen, nicht nur ein Standbild je Szene.

## Offen

iPhone-/Safari-Test (WebCodecs H.264 + AAC dort ungeprüft) über die privaten Artifact-Seiten; Einbau ins digitale
Paket (Bolles Entscheidung 15.09.: dort soll es leben); Weltraum auf den Motor ziehen; weitere Mottos.
Nichts davon ist deployt; dieser Ordner ist Prototyp, kein Produkt.
