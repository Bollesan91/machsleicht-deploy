# Feuerwehr-Trailer — Story „Alarm für die Party"

> Entwurf und Bau 16.09.2026 („nächstes Motto!"). 24 s, gleicher Motor. Vokabular aus dem Feuerwehr-Paket
> (`paket/_maschine/manifeste/feuerwehr.json`): Rollen Schlauch-Chef, Leiter-Profi, Einsatz-Funker, Wassermarsch-Rufer,
> Retter · Beinamen Schlauchmeister, Leiterfuchs, Wasserwirbel, Rauchspürnase · Rituale „Wachablösung & Schicht-Appell",
> „Freies Toben auf dem Wachhof", „Urkunden-Appell" · Palette Signalrot `#B32219`, Nachtblau `#16294A`, Blaulicht
> `#1F6FA8`, Messing `#E8C24E`, Einsatzprotokoll-Papier `#F4F0E6`.

## Figuren

| Figur | Rolle | Aussehen |
|---|---|---|
| **Das Geburtstagskind** | sitzt am Steuer des Löschzugs, **Foto im Seitenfenster der Fahrerkabine** | roter Löschzug mit weißem Streifen, gelbem Reflexband, Drehleiter, zwei Blaulichtern, Wasserwerfer auf dem Dach |
| **Fleck**, der Feuerwehr-Dalmatiner | sitzt auf dem Dach, klettert die Leiter hoch, rettet die Katze, hält am Ende das Konfetti-Rohr | weiß mit schwarzen Flecken, rotes Halsband |
| **Mikesch**, die Katze | sitzt im Baum fest, fährt danach auf dem Dach mit | orange getigert |
| **Brandmeister Bruno** | wartet mit dem Willkommen-Schild an der geschmückten Wache; verliert den Helm an die Konfetti-Kanone | roter Einsatzmantel mit gelben Streifen, Schnauzbart, Helm |

## Storyboard

| Zeit | Szene | Bild | Text im Bild | Ton |
|---|---|---|---|---|
| 0–3,0 s | **Alarm in der Wache** | Löschzug vor dem offenen Tor der Feuerwache, Schild „FEUERWACHE", Fleck springt aufs Dach; drei Hupstöße als Countdown, Blaulicht geht an | „Alarm! Die Party-Feuerwehr macht sich bereit …" | drei Hupstöße, Fleck bellt, Motor startet |
| 3,0–6,0 s | **Ausfahrt** | Zug fährt los, Wache gleitet weg, Blaulicht blitzt, Räder drehen, Abgaswölkchen | „TATÜTATA!" | Martinshorn, Motorbrummen |
| 6,0–9,6 s | **Katze im Baum** | Stadthäuser ziehen vorbei; Mikesch miaut im Baum; der Zug bremst, die Drehleiter fährt hoch, Fleck klettert, Mikesch springt auf die Leiter, Leiter runter, beide sitzen auf dem Dach, weiter geht's | „Mats rast zur Feuerwehr-Party!" · Fleck: „Wuff! Da miaut jemand!" · Mikesch: „Miau, danke!" | Bremsen quietschen, Hydraulik, Miauen, Bellen |
| 9,6–14,0 s | **Feuer!** | Auf der Straße steht eine riesige Geburtstagstorte, die Kerzen lodern wie ein Brand, Rauch steigt auf; der Zug hält, der Wasserwerfer schwenkt, Wasserbogen mit Regenbogen, Kerzen zischen aus, Dampf | „Achtung, Feuer!" → „WASSER MARSCH!" → Fleck: „Gerettet!" | Feuerknistern, Bremsen, Wasserstrahl, Zischen, Bellen |
| 14,0–16,5 s | **Mit Blaulicht voraus** | Sonnenuntergang, Leiter halb hoch mit Fleck und Wimpel an der Spitze, Fahrtwind-Streifen, Blaulicht | „Mit Blaulicht voraus!" | Martinshorn leiser, Wind, Motor |
| 16,5–17,8 s | **Die Party-Wache** | Geschmückte Wache mit Fahnen und Ballons steigt rechts auf; zwei Hydranten spritzen einen Wasserbogen als Ehrenpforte, der Zug rollt darunter und hält | — | Wasserrauschen, Bremsen |
| 17,8–19,2 s | **Empfang** | Brandmeister Bruno mit Schild vor dem Tor; auf dem Tisch die gerettete Torte, aus der Wunderkerze steigt die **goldene Alterszahl** | Schild: „Willkommen, Mats!" · Zahl „6" | Wunderkerzen-Prickeln, Goldglanz-Pings |
| 19,2–21,9 s | **Fanfare und Konfetti** | Horn-Fanfare, der Wasserwerfer schießt Konfetti über den Wachhof; die Konfetti-Salve pustet Bruno den Helm vom Kopf, er fliegt im Bogen und landet auf Fleck | Bruno: „Hoppla!" | Fanfare, Konfetti-Bumm und Glöckchen, Helm-Plopp |
| 20,5–24,0 s | **Einladung** | Einsatzbefehl-Karte oben: Papier mit rot-weißer Absperrband-Kante, Party-Titel, Datum · Uhrzeit, Ort, „Kommst du mit?" | „🚒 Mats' Feuerwehr-Party" · „Kommst du mit? 🚒" | Glocke, leiser Horn-Teppich |

## Personalisierung

Name (Text, Schild, Karte), Alter (goldene Zahl aus der Torte), Datum, Uhrzeit, Ort, Kinderfoto im Kabinenfenster
(Standard: Demo-Kind Ida). Neu im Motor: Foto in ein abgerundetes Rechteck einpassen (`drawPhotoInRect`).
