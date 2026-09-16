# Einladungs-Trailer (Backlog P8-14) — Prototypen

Stand 16.09.2026. Neun von 15 Mottos laufen: **Weltraum** (`index.html`, 22 s), **Piraten** (`piraten.html`, 24 s),
**Ritter** (`ritter.html`, 24 s), **Feuerwehr** (`feuerwehr.html`, 24 s), **Dino** (`dino.html`, 24 s),
**Meerjungfrau** (`meerjungfrau.html`, 24 s), **Baustelle** (`baustelle.html`, 24 s), **Prinzessin**
(`prinzessin.html`, 24 s), **Detektiv** (`detektiv.html`, 24 s). Offen: Dschungel, Einhorn, Feen, Pferde, Safari, Superheld. Jede Seite rechnet aus
einer Canvas-Animation ein **MP4 (H.264 + AAC) komplett im Browser** (WebCodecs + mp4-muxer 5.2.2, inline), mit Vorschau,
Ton-Vorschau, Datei-Input fürs Kinderfoto (bleibt lokal, Standard: Demo-Kind Ida aus `bilder/demo/ida.jpg`) und einem
Testprotokoll (WebCodecs, Encoder, AAC, Größe, Renderzeit, Wiedergabe, Teilen). **Stories (Bolles Arbeitsdokumente, je
Motto gespeichert):** `STORY.md` (Weltraum), `STORY-piraten.md`, `STORY-ritter.md`, `STORY-feuerwehr.md`, `STORY-dino.md`,
`STORY-meerjungfrau.md`, `STORY-baustelle.md`, `STORY-prinzessin.md`, `STORY-detektiv.md`.

## Bauweise: ein Motor, N Drehbücher

- `build/src/core.js` — der Motor: Konstanten, Zeichen-/Easing-Helfer, Foto-Logik, Vorschau-Loop, Ton-Engine
  (OfflineAudioContext + Synth-Helfer `tone/noise/bell/gull/bed`), Testprotokoll, MP4-Export. Ein Drehbuch liefert
  `{id, title, DUR, drawFrame(i), audio(ac, master, synth), photoDefault}` und ruft `startTrailer(MOTTO)`.
- `build/src/piraten.js`, `ritter.js`, `feuerwehr.js`, `dino.js`, `meerjungfrau.js`, `baustelle.js`, `prinzessin.js`,
  `detektiv.js` — Drehbücher (Szenen, Figuren, Texte, Ton). Baustelle bringt einen Schaufelarm mit Zwei-Gelenk-IK (`armIK`, Posen als
  Winkel interpoliert) — Vorlage für weitere bewegliche Gliedmaßen. Prinzessin bringt eine fliegende Großfigur (Rosalie:
  Schweben, Aufsteigen, Rückkehr, Landung auf dem Turm) und Feuerwerk aus dem Hintergrundobjekt. Detektiv bringt
  Tag-Nacht-Wechsel über Farbkurven (`keyed(list,t,idx)` für Himmel, Häuser, Pflaster, Straße), Laternen, die mit der
  Dämmerung angehen, Suchscheinwerfer-Kegel und eine Mitfahrer-Figur (Raffi hopst auf den Gepäckträger).
- Regeln aus Bolles Sichtungen: Sitzt das Kind in einem Fahrzeug, ist die Kabine geschlossen und nur Kopf, Helm und
  Schultern schauen heraus (sonst wirkt der Torso beinlos); Reiter brauchen sichtbare Beine oder Flosse. Am Ende muss
  alles Wichtige unter y=560 liegen, weil die Karte den oberen Teil deckt (Rosalie nickt deshalb nach unten).
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
- Zusätzlich Ausschnitte in voller Auflösung lesen: im 432-px-Bild sah das Dinotal fertig aus, erst der 1:1-Ausschnitt
  zeigte, dass der Boden (später gezeichnet) Nest, Eierschale und Steggis Beine unter y=1150 abdeckte.
- Sprechblasen-Schwanz muss zur Figur zeigen (`tailRight`), und keine Blase auf ein Requisit legen, das die Szene trägt
  („Party?!" lag auf der Fahne mit dem Törtchen, das Rex gerade entdeckt).
- Seitenwechsel einer Großfigur nicht per Spiegelung mitten im Bild (kopfloser Rumpf, Kopf aus dem Bild): erst hinaus,
  dann umgedreht wieder hinein (Rex saust hinter Trixi vorbei und kommt zurück).
- Begegnungen zweier Figuren in der Höhe staffeln (Bolles Catch im Dino: Rex' Kopf auf Höhe von Trixis Schild las sich
  als Kollision). Meerjungfrau: Hektor bleibt unterhalb des Kindes auf Kringels Höhe.
- Requisiten, die zur einfahrenden Szene gehören (Steggis Hut, Puffis Hut), innerhalb der Szenen-Gruppe zeichnen; in
  Bildkoordinaten schwebten sie 1,5 s neben der Figur, bis die Szene angekommen war.
- Ränder prüfen, nicht nur die Mitte: im Detektiv waren Frieda (x 1040 + Lupe), „Huch!" und die „Party?!"-Blase rechts
  abgeschnitten, Raffi auf dem Gepäckträger links. Figur-Ausdehnung = Körper + Sack + Schwanz + gehobene Arme, nicht
  der Ankerpunkt. Bei Mitfahrern die Blickrichtung so wählen, dass Anhängsel zur Bildmitte zeigen.
- Was hinter einem Requisit verschwindet, fehlt: Raffis Ringelschwanz lag auf dem Träger komplett hinter dem Kekssack
  (Waschbär ohne Schwanz); Spitze und ein Ring müssen herausschauen.

## Offen

iPhone-/Safari-Test (WebCodecs H.264 + AAC dort ungeprüft) über die privaten Artifact-Seiten; Einbau ins digitale
Paket (Bolles Entscheidung 15.09.: dort soll es leben); Weltraum auf den Motor ziehen; weitere Mottos.
Nichts davon ist deployt; dieser Ordner ist Prototyp, kein Produkt.
