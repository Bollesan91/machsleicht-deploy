# Welle 2 - Rangliste aus 20 Loesungs-Linsen (19.08.2026)

20 Linsen, 109 Ideen, 98 davon mit Quell-URL. 75 Ideen digital, 27 beides, 7 rein physisch.
Eingabe war die verifizierte Einwandsliste E1-E13 aus `2026-08-19-welle1-befunde.md`.
Die Synthese lief zweimal: der erste Versuch starb an einem 211-KB-Prompt.

## Selbst geprueft (Stufe 3), bevor irgendetwas hierauf gebaut wird

| Behauptung | Befund |
|---|---|
| Planer sendet `guests`/`location` nicht an den Worker | **stimmt.** `state.guests` (Z. 1390, Default 6) und `state.location` (Z. 1392, 'zuhause') existieren und werden 15x bzw. 11x benutzt - im `/api/create`-payload (ab Z. 2920) stehen nur `address` und `invites`. Das Paket KANN die geplante Gaestezahl und drinnen/draussen nicht kennen. Wurzel von E1 und der Haelfte von E9. |
| Print-CSS faerbt jedes Blatt vollflaechig | **stimmt.** `paket/core/paket.css:264` - `background:var(--paper) !important` zusammen mit `print-color-adjust:exact`. Ueberstimmt das Abschalten von Hintergrundgrafiken im Druckdialog. |
| Amazon steht auf gedrucktem Papier | **stimmt.** 4 Nennungen im Ritter-Auszug, u.a. 'bei Amazon ansehen*' auf der Einkaufsliste. Ob die PartnerNet-Klausel zu Offline-Werbung das verbietet, ist NICHT primaerverifiziert (Login-Bereich) - vor einer Entscheidung nachlesen. |
| Freier Planer nutzt eine Regel, die das bezahlte Paket ignoriert | **stimmt.** `_gameLoud` (kindergeburtstag.html:1862) verhindert zwei laute Spiele hintereinander; `loudness` kommt in `paket/core/paket-core.js` nicht vor. |

## Rangliste

### 1. Zwoelf Fuell-Abschnitte aus dem Renderer loeschen (nicht ausblenden)
- **loest:** E3, E5, E6, E7, E10 - und ein Stueck E12
- **bauen:** In der render()-Kette (paket/_maschine/template.html) raus: Countdown-Poster, Countdown-Vorbereitungsblatt in heutiger Form, Chronik/Erinnerungsblatt, Danke-Blatt, Eltern-Handzettel, Rollenkarten, vier ueberzaehlige Urkunden, Deckblatt. Pflicht dabei: die 12 Selbstverweise 'siehe Teil II/III/IV' mitziehen, sonst zeigen die verbleibenden Blaetter ins Leere. check-paket-*-Skripte nachziehen.
- **Partner:** keiner | **Kosten:** 0 EUR, 1-2 Tage
- **warum oben:** Fuenf Einwaende, vier davon mit 18-20 von 20 Nennungen, sterben durch Loeschen. Es ist die einzige Massnahme, deren Nutzen mit jedem weiteren Motto steigt und deren Aufwand sinkt. Und Welle 1 hat die Streichliste selbst geliefert - das ist keine Geschmacksentscheidung.

### 2. Mengen-Motor: guests und location ins payload, Mengen aus den echten Zusagen, der Pauschalsatz wird geloescht
- **loest:** E1 (20/20), E11, halb E9
- **bauen:** In kindergeburtstag.html (payload-Objekt ab ca. Z. 2920) state.guests und state.location ergaenzen, Worker-Whitelist analog ambition. Je shoppingList-Posten zwei Felder: basis und skaliert (true/false), damit Gebinde wie eine 8er-Packung Pool-Nudeln nicht falsch heruntergerechnet werden. Drei getrennte Zahlen statt einer: Einkauf (Zusagen + Unbeantwortete + Geschwister), Sitzplaetze, Mitgebsel. Der Satz 'Die Mengen unten sind fuer 8 Kinder gerechnet, du hast 5 Zusagen' wird ersatzlos geloescht, nicht umformuliert.
- **Partner:** keiner | **Kosten:** 0 EUR, 2-3 Tage (davon der groessere Teil Datenarbeit an den Posten)
- **warum oben:** 20 von 20. Der gedruckte Satz ist zugleich das schriftliche Eingestaendnis, dass die auf der Startseite beworbene Funktion fehlt - das ist neben dem Verkaufsproblem ein Werbeaussagen-Risiko. Und die Ursache ist eine fehlende Zeile, kein Konzept.

### 3. Reserve-Regel: keine Vorbereitung und kein Einkauf fuer Spiele, die der eigene Plan als Reserve fuehrt
- **loest:** E2 (20/20), E6, E12
- **bauen:** shCountdown() und die Einkaufsliste ausschliesslich aus buildTimeline().rows speisen, nie aus dem handgepflegten preparationWeeks. Jede Vorbereitungszeile und jeder Materialposten bekommt eine Spiel-ID; Spiel in reserve[] heisst: Zeile faellt weg. Linter-Regel dazu (siehe Rang 10), sonst kommt es beim naechsten Motto zurueck.
- **Partner:** keiner | **Kosten:** 0 EUR, 1-2 Tage fuer die Regel; der vollstaendige Datenpass ueber alle Mottos kann danach schrittweise laufen
- **warum oben:** 20 von 20, und der Ablaufplan weiss die Antwort bereits - es fragt ihn nur niemand. Strohballen kaufen fuer ein Spiel, das im selben Dokument als Reserve steht, ist der Fehler, den jeder Leser in dreissig Sekunden findet.

### 4. Ortszweig-Filter: nur die zutreffende Fassung jeder Spielkarte drucken
- **loest:** E9 (15/20) zur Haelfte, E5, E6
- **bauen:** location kommt mit derselben Zeile wie Rang 2 im Worker an. Im Renderer je Spiel entweder indoorTip oder outdoorTip ausgeben, nie beide untereinander. Posten, die es nur im Garten gibt, bekommen ein Feld nurBei plus einen Haushalts-Ersatz ('zwei Umzugskartons mit Decke statt Strohballen').
- **Partner:** keiner | **Kosten:** 0 EUR, rund 4 Stunden fuer den Filter, 1-2 Tage inklusive nurBei-Feldern
- **warum oben:** Bestes Verhaeltnis im ganzen Feld: ein halber Tag gegen einen Einwand von 15 von 20. Heute tragen die Karten beide Fassungen - doppelter Text bei halbem Nutzen. Der Wetterabruf ist die teure Haelfte und darf warten.

### 5. Urkunden: zwei auf ein A4, Datum eingedruckt, nur echte Namen
- **loest:** E3 (20/20), E6
- **bauen:** shCertificates() auf 2-up im A5-Querformat mit durchgehender Schnittlinie umbauen, PARTY.date in das heutige Leerfeld 'Datum & Ort' eindrucken, eine einzige zusaetzliche Urkunde und die sichtbar mit 'Reserve' beschriften statt blanko lassen.
- **Partner:** keiner | **Kosten:** 0 EUR, 0,5-1 Tag
- **warum oben:** Sechs Blaetter werden drei, das peinlichste Detail des Pakets (leeres Datumsfeld neben fuenf Blaettern mit gedrucktem Datum) verschwindet - fuer einen halben Tag Arbeit.

### 6. Druckmodus schwarzweiss-first plus Druck-Streifen mit gerechneten Kosten
- **loest:** E4 (20/20), E6, E11, E12
- **bauen:** Im @media-print-Block von paket/core/paket.css die Zeile background:var(--paper)!important samt print-color-adjust:exact entfernen (sie faerbt heute jedes Blatt vollflaechig ein, auch wenn der Nutzer Hintergrundgrafiken abschaltet); Creme bleibt am Bildschirm. Jedes Blatt bekommt die Attribute muss/kann und sw/farbe. Darueber ein Bildschirm-Streifen: gerechnete Blattzahl, Farbanteil, zwei Copyshop-Preisspannen mit Quelle und Stand-Datum, dazu die Ansage, dass Schwarzweiss reicht. Vor dem Freigeben einmal auf einem echten Tintenstrahler und einmal in Graustufen drucken.
- **Partner:** keiner (Preise nur als datierter Anker, keine Zusage eines Dritten) | **Kosten:** 0 EUR, 2-3 Tage; zwei Preislisten einmal pro Quartal nachschlagen
- **warum oben:** 20 von 20 - und die versteckte Zusatzrechnung ist groesser als der Produktpreis. Zwei Linsen sind unabhaengig auf dieselbe CSS-Zeile gestossen; das ist der seltene Fall, in dem ein Wahrnehmungsproblem eine einzeilige Ursache hat.

### 7. Amazon raus aus dem gedruckten Blatt, Einkauf auf den Bildschirm
- **loest:** E5, E4, E11 - und ein Programmrisiko
- **bauen:** Im Druckpfad das Feld hasAffiliate ignorieren, die Fussnote entfaellt; auf Papier nur Menge, Posten und Preisspanne. Auf dem Bildschirm bleibt der gekennzeichnete Affiliate-Link, moeglichst mit echten ASINs statt Suchlinks. Vorher den verbindlichen Wortlaut im eingeloggten PartnerNet-Konto gegenlesen.
- **Partner:** Amazon PartnerNet (bestehend, Tag machsleicht21-21) | **Kosten:** 0 EUR, 0,5-1 Tag (ASIN-Pflege separat und schrittweise)
- **warum oben:** Zwei Linsen zitieren unabhaengig dieselbe Klausel: Werbung in Offline-Material ist untersagt. Ein Klick auf ein A4-Blatt hat noch nie stattgefunden - das Risiko ist also unbezahlt. Nebeneffekt: das Blatt hoert auf, wie ein Prospekt auszusehen.

### 8. Vorher-Blick: das echte Paket lesbar, Druck gesperrt, ein Blatt gratis, drei gerechnete Zahlen im Kopf
- **loest:** E13, E12, E4, E6
- **bauen:** Alle Blaetter mit den echten Namen, Allergien und Abholzeiten frei lesbar; @media print{body{display:none}} bis das paid-Flag im KV steht, plus dezentes Wasserzeichen. Darueber genau drei aus den eigenen Daten gerechnete Zahlen: Blaetter und Farbanteil, Druckkosten, Vorbereitungsminuten. Genau ein Blatt - der Kuechen-Zettel - bleibt auch ohne Kauf druckbar.
- **Partner:** keiner | **Kosten:** 0 EUR, 2-3 Tage
- **warum oben:** Elf Linsen kommen unabhaengig darauf. Der Kauf war blind, weil es nichts zu sehen gab, obwohl das Produkt aus den Daten des Kaeufers besteht. Und das Gratis-Blatt ist der billigste Beweis, den es gibt: die Eltern haben genau dieses Blatt von sich aus als Geld wert bezeichnet.

### 9. Kuechen-Zettel als Entscheidungsblatt, Allergie-Eingabe strukturiert statt Freitext
- **loest:** E8 (16/20), E10, E1
- **bauen:** Auf der Partyseite wird rsvpAllergies dreiwertig ('keine' / 'ja, und zwar' / keine Angabe) plus antippbare Chips nach den 14 kennzeichnungspflichtigen Allergenen; der Freitext bleibt daneben. Im Paket vier Spalten je Kind: Name, was geht nicht, was bekommt es stattdessen, wer holt wann ab. Der heutige Gedankenstrich wird zu 'keine Angabe - bitte nachfragen'. Jede Umbauzeile traegt den Nachfrage-Satz, keine Unbedenklichkeits-Aussage.
- **Partner:** keiner (fuer die Umbau-Regeln spaeter fachliche Pruefung, siehe unbelegte Partner) | **Kosten:** 0 EUR, 3-5 Tage
- **warum oben:** Das Blatt, das die Eltern selbst als Geld wert benannt haben, ist heute eine Warnung mit vier Gedankenstrichen. Achtung: das ist der einzige Baustein der Liste mit echtem Schadenspotenzial - eine falsche Zeile ist schlimmer als gar keine Zeile.

### 10. Widerspruchs-Gates in den Linter, 0 FAIL vor Deploy
- **loest:** haelt E1, E2, E3, E5, E7 dauerhaft geschlossen
- **bauen:** Gegen das gerenderte Paket, nicht gegen die Quelle: (a) Hedge-Wortliste im Fliesstext ('fuer 8 Kinder gerechnet', 'entsprechend weniger', 'ca.', 'je nach') FAIL; (b) Leerfeld, dessen Wert im Datensatz vorhanden ist, FAIL; (c) Vorbereitungs- oder Einkaufszeile fuer ein Spiel in reserve[] FAIL; (d) Selbstverweis 'siehe Teil ...' FAIL; spaeter (e) headless gerendert: .sheet hoeher als eine A4-Seite FAIL.
- **Partner:** keiner | **Kosten:** 0 EUR, 1-2 Tage (Punkt e spaeter, er bringt die erste Headless-Abhaengigkeit ins Repo)
- **warum oben:** Vier Linsen fordern das unabhaengig, und es passt exakt auf die bestehende Arbeitsweise: was der Linter faengt, ist kein Reviewer-Thema. Ohne diese Gates kommen die Raenge 1 bis 5 beim naechsten Motto zurueck.

### 11. Stripe direkt, Kauf als Flag im KV, Widerrufsrecht offen lassen plus Erstattungsknopf
- **loest:** E13, E1 dauerhaft (Nachdruck rechnet mit dem Stand von heute)
- **bauen:** Stripe Payment Link mit client_reference_id gleich Party-ID, Route POST /api/stripe-hook mit Signaturpruefung, im KV nur paid:true plus Datum. Kein PDF-Versand, kein Datei-Download - der Kauf schaltet die vorhandene Seite frei. Kein Verzichts-Haekchen im Checkout; stattdessen Erstattungsknopf, Pflichtangaben und Buttonbeschriftung nach § 312j BGB, Vertragsbestaetigung nach § 312f BGB. Heute primaerverifiziert: das Erloeschen des Widerrufsrechts steht in § 356 Abs. 6 Nr. 2 BGB und wird bewusst nicht ausgeloest.
- **Partner:** Stripe | **Kosten:** 1,5 % + 0,25 EUR je EWR-Kartenzahlung (heute geprueft), keine Monatsgebuehr; 2 Tage Bauzeit
- **warum oben:** Der Kauf muss ein Schalter sein, keine Datei: nur dann rechnet das Blatt beim Drucken mit den Zusagen von heute statt mit denen vom Kauftag. Das ist der einzige strukturelle Vorteil gegenueber jedem PDF auf einem Marktplatz. Tiefer platziert als die Reparaturen, weil ein Checkout ohne die Raenge 1-9 nur schneller Nein misst.

### 12. Einladung als echte 10x15-Fotokarte mit QR - gratis, Selbstbedienung beim Drogeriemarkt
- **loest:** E13, E5 - und es ist der belegte Weg in die gesetzte Fotodruck-Richtung
- **bauen:** Client-seitiger Canvas-Render 1200x1800 px, 300 dpi, sRGB, JPEG, mindestens 4 mm Sicherheitsrand (jedes Labor beschneidet, 10x15 ist 2:3 und 13x18 nicht - ein Layout passt nie in beide). QR auf die bestehende, dauerhaft stabile Partyseiten-URL. Danach ein Bildschirm mit drei Schritten und den heutigen Stueckpreisen samt Stand-Datum. Keine Bestellschnittstelle, kein Vertrag, kein Versand durch machsleicht.
- **Partner:** ROSSMANN Fotowelt Fotostation (Preise heute geprueft) bzw. dm Fotoparadies Express-Abholung - beides reine Selbstbedienung des Kunden | **Kosten:** 0 EUR je Verkauf fuer machsleicht; der Kunde zahlt 0,27 EUR je 10x15 (ab 15 Stueck 0,24 EUR); 4-5 Tage Bauzeit
- **warum oben:** Der einzige Fotodruck-Weg, der bei dieser Betriebsgroesse belegt ist: kein Anbieter schliesst einen Ein-Personen-Betrieb an, aber jede Filiale druckt eine JPG. Die Karte macht die kostenlose Einladung physisch, kostet nichts pro Stueck und traegt den QR, der die Partyseite fuellt - Wachstum statt Marge. Tief platziert nur, weil sie keinen der 13 Einwaende gegen das Paket direkt beseitigt.

## Konvergenz (unabhaengige Mehrfachnennung)

| Linsen | Punkt |
|---|---|
| 15 | E1 ist kein Design-, sondern ein Datenflussfehler: die Zusagenzahl steht im System und wird nicht in die Mengen gerechnet. Eine Linse hat die Ursache lokalisiert (das payload-Objekt in kindergeburtstag.html ab ca. Zeile 2920 sendet state.guests und state.location gar nicht an den Worker). Alle anderen beschreiben dasselbe Symptom. |
| 13 | Fuellmaterial ersatzlos aus dem Renderer LOESCHEN, nicht per Schalter ausblenden - sonst muss es bei jedem neuen Motto weitergepflegt werden. Zielkorridor der Linsen: 6 bis 11 Blaetter statt 18. |
| 11 | Der Vorher-Blick muss das echte Dokument mit den echten Gaestenamen sein, nicht Mockup, Muster-PDF oder Screenshot. Mehrere Linsen kommen unabhaengig darauf, dass der Kaeufer erst dann etwas bewertet, was ihm gehoert. |
| 10 | Druckanweisung mit gerechneten Euro und Schwarzweiss zuerst (E4). Mehrfach unabhaengig nachgerechnet: 18 Blatt in Farbe kosten im Copyshop mehr als das Produkt selbst - der Kaeufer zahlt heute zweimal. |
| 9 | Vorbereitung und Einkauf duerfen nur fuer Spiele entstehen, die buildTimeline() tatsaechlich in rows legt. Reserve-Spiel heisst: keine Countdown-Zeile, kein Einkaufsposten, keine Materialmenge. Das ist eine Filterregel, kein Redaktionsthema. |
| 9 | Countdown-Poster ersatzlos streichen - das einzige Blatt, das ausser dem Datum kein einziges Datenfeld auswertet. |
| 9 | Urkunden: Partydatum eindrucken (es steht auf fuenf anderen Blaettern desselben Dokuments), nur zugesagte Kinder, zwei auf ein A4 oder als Fotoabzug, Blanko-Urkunde raus. |
| 9 | Allergie muss vom Warnbanner zur Handlung werden - und das geht nur ueber strukturierte Eingabe (Chips nach den 14 LMIV-Allergenen statt 200 Zeichen Freitext). Mehrere Linsen betonen zugleich: nie 'sicher' behaupten, immer der Nachfrage-Satz. |
| 8 | Der Zeitaufwand in Minuten gehoert VOR den Kauf, aus dem echten Plan gerechnet, nicht als Marketingzahl. Mehrere Linsen halten die ehrliche Stundenzahl fuer den staerksten Vertrauenshebel, obwohl sie kurzfristig abschreckt. |
| 6 | Von den Linsen, die ueberhaupt einen Preis nennen, landen sechs unter 10 EUR (4,90 / 6,90 / 7,90 / 8,90 / gestaffelt). 14,90 EUR ueberlebt in keiner Rechnung fuer eine reine Datei - nur mit etwas Physischem, Live-Betrieb oder Postversand dran. |
| 6 | Wohnung/Garten/Wetter muessen den Inhalt wirklich aendern (E9). Billigste Haelfte: nur den zutreffenden Ortszweig drucken statt beide untereinander. Teure Haelfte: Wetterabruf T-3, zweimal unabhaengig mit demselben Partner (Bright Sky auf DWD-Daten) vorgeschlagen. |
| 5 | Widerrufsrecht bei digitalen Inhalten NICHT abbedingen, sondern als Verkaufsargument stehen lassen. Heute primaerverifiziert: das Erloeschen steht in § 356 Abs. 6 Nr. 2 BGB und braucht vier Voraussetzungen - die Linsen haben die Norm richtig zitiert. |
| 4 | Fotodruck laeuft als Selbstbedienung des Kunden beim Drogeriemarkt, nicht als eigener Versand: machsleicht liefert eine fertige Bilddatei im Laborformat, der Kunde bezahlt und reklamiert beim Labor. |
| 4 | Maschinelle Gates statt Nachdisziplin: Widerspruchs-Linter (Hedge-Saetze, Reserve-im-Countdown, bekannte Leerfelder, Selbstverweise), Blatt-Budget und Druck-Deckung. Vier Linsen fordern das unabhaengig - es deckt sich mit dem bestehenden 0-FAIL-Gate. |
| 4 | Stripe direkt statt Merchant of Record (Digistore24/Paddle/Gumroad/Lemon Squeezy). Eine Linse haelt dagegen und will den MoR wegen Rechnung und Reklamation - das ist die einzige echte Kontroverse im Feld. |
| 2 | Amazon-Affiliate darf nicht auf gedrucktem Papier stehen. Nur zwei Linsen, aber beide zitieren dieselbe Programmklausel woertlich (Verbot von Werbung in Offline-Material) - das ist ein Kontorisiko, kein Geschmacksthema. |
| 2 | Der cremefarbene Flaechenton im Druck (paket/core/paket.css Z. 264, background !important zusammen mit print-color-adjust:exact) faerbt jedes Blatt vollflaechig ein, auch wenn der Nutzer Hintergrundgrafiken abschaltet. Zwei Linsen sind unabhaengig auf exakt dieselbe Zeile gestossen. |
| 2 | Der Partytag selbst ist unbespielt: ein laufender Bildschirm (Wake Lock, aktueller Block gross, SOS-Knopf) statt eines zugeklappten Stapels neben dem Kuchen. Nur zwei Linsen - aber beide nennen es den einzigen Grund, warum jemand mehr als den Marktpreis zahlen wuerde. Zugleich die teuerste Wette (2-3 Wochen). |

## Partner mit belegtem Weg

- **Stripe Payments Europe** - Konto Deutschland, gehosteter Payment Link mit client_reference_id gleich Party-ID, signierter Webhook setzt das paid-Flag im KV. Kein Vertrag mit Mindestumsatz, keine Monatsgebuehr. Heute geprueft: 1,5 % + 0,25 EUR fuer EWR-Standardkarten, 3,15 % + 0,25 EUR fuer Nicht-EWR-Karten. Bei 6,90 EUR bleiben rund 6,55 EUR.
  <https://stripe.com/de/pricing>
- **ROSSMANN Fotowelt (Fotostation im Markt)** - Kunde bringt die von uns erzeugte JPG mit und druckt selbst - kein Vertrag, keine Mindestmenge, Reklamation laeuft ueber die Filiale. Heute geprueft: 10x15 = 0,27 EUR (ab 15 Stueck 0,24, ab 30 Stueck 0,22, ab 50 Stueck 0,19), 13x18 = 0,39 EUR, 15x20 = 0,49 EUR, 20x30 = 2,95 EUR (ab 2 Stueck 1,95 EUR). Achtung: die von einer Linse genannten 1,49 EUR fuer 20x30 sind falsch.
  <https://www.rossmann-fotowelt.de/service/sofortfotos-fotostation-preise>
- **dm Fotoparadies (Express-Abholung im Markt)** - Kunde laedt die JPG hoch und holt im Markt ab; ebenfalls reine Selbstbedienung, kein Vertrag. Wichtig: die Preisliste laedt dynamisch nach und war heute nicht maschinell abrufbar - vor jeder gedruckten Zahl selbst nachschlagen oder nur Rossmann-Preise nennen.
  <https://foto.dm.de/express-abholung-foto.html>
- **Amazon PartnerNet (bestehend, Tag machsleicht21-21)** - Bleibt Provisionsquelle, aber ausschliesslich auf dem Bildschirm: Warenkorb-Link mit echten ASINs statt Suchlinks, Kennzeichnung Pflicht. Auf gedrucktem Papier keine Nennung, kein Link, keine Fussnote - die Programmrichtlinien untersagen Werbung in Offline-Material. Verbindlich ist die Fassung im eingeloggten Konto; einmal dort gegenlesen und das Zitat mit Datum ablegen.
  <https://partnernet.amazon.de/help/operating/policies>
- **Bright Sky (freie API auf Daten des Deutschen Wetterdienstes)** - JSON-Abruf ohne Key, ohne Konto, ohne Vertrag; ein Abruf drei Tage vor der Party im Worker, Ergebnis ins KV. Pflicht ist der Ausfallpfad: kein Wetter erreichbar heisst, die Weiche bleibt neutral - das Projekt ist klein und gibt keine Verfuegbarkeit zu.
  <https://brightsky.dev/>
- **CEWE Partnerprogramm (ueber CJ)** - Affiliate-Strecke in den CEWE-Kartenkonfigurator: wir erzeugen die Motive, CEWE ist gegenueber dem Kunden Verkaeufer, Drucker, Versender und Gewaehrleistungsschuldner. Damit bleibt machsleicht ausserhalb des Warenrechts. Provisionshoehe und Annahme der Bewerbung vor dem Bauen im Programm bestaetigen lassen.
  <https://www.cewe.de/partnerprogramm.html>
- **kartenmacherei Partnerprogramm (Webgains)** - Zweite Affiliate-Bahn fuer den Kartenweg mit Direktversand, laut Programmseite bis 12 Prozent bei 90 Tagen Cookie-Laufzeit. Gleiche Logik wie CEWE: der Kunde kauft dort, wir vermitteln nur.
  <https://www.kartenmacherei.de/partnerprogramm/>
- **buttinette (ueber Awin)** - Bastelbedarf ist ein grosser Teil der Einkaufslisten und bringt bei Amazon nur 3 Prozent. buttinette nennt 6 Prozent vom Nettobestellwert bei 30 Tagen Cookie. Bewerbung ist kostenlos, die Freischaltung ist eine Haendlerentscheidung.
  <https://basteln-de.buttinette.com/shop/service/partnerprogramm>
- **LetterXpress** - Falls jemals ein Postversand getestet wird: Druck, Kuvertierung, Frankierung und Einlieferung gegen eine veroeffentlichte Bruttopreisliste, API vorhanden. Kompaktsendung 1-8 Seiten farbig einseitig liegt laut Liste bei 1,46 EUR. Ungeprueft bleibt das Papiergewicht - vor dem ersten Kundenauftrag eine Testsendung an sich selbst.
  <https://www.letterxpress.de/storage/files/bruttopreisliste.pdf>
- **viaprinto (CEWE-Gruppe), Client API** - Dokumentierte Bestellschnittstelle mit neutralem Direktversand - der einzige belegte Weg, ein physisches Druckprodukt ohne eigenes Lager auszuliefern. Nur relevant, wenn die Entscheidung fuer etwas Physisches faellt; Auflage 10 ist der teuerste Punkt der Preiskurve und muss vorher im Konfigurator durchgerechnet werden.
  <https://www.viaprinto.de/connect/client-api/index.html>
- **Cloudflare Browser Rendering** - Serverseitiges PDF aus dem bestehenden Cloudflare-Konto, kein neuer Vertrag und kein neuer Auftragsverarbeiter. Nur bauen, wenn wirklich eine Datei ausgeliefert werden soll - der Rang-11-Ansatz (Schalter statt Datei) braucht es nicht.
  <https://developers.cloudflare.com/changelog/post/2025-07-28-br-pricing/>
- **Etsy** - Belegter Marktplatz fuer ein generisches Blanko-Set zum dortigen Marktpreis (3,95 bis 7,95 EUR fuer Motto-Sets; ein Vergleichsshop mit rund 7.900 Verkaeufen ist dokumentiert). Etsy liefert Suchtraffic und Bewertungen. Nicht bauen: den Umweg, Kaeufer aus dem Listing heraus auf die eigene Seite zu ziehen - das verbietet die Plattformrichtlinie.
  <https://www.etsy.com/de/sell>
- **Digistore24 (Merchant of Record) - dokumentiert, nicht empfohlen** - Uebernimmt Rechnung, Umsatzsteuer weltweit und Kaeufer-Support gegen 7,9 % + 1 EUR. Nur dann sinnvoll, wenn der Betrieb den Support wirklich nicht tragen will; bei einem Produkt unter 10 EUR frisst die Marge und die vom MoR abzufuehrende Umsatzsteuer den Vorteil.
  <https://www.digistore24.com/de/home/features>
- **DAAB-Netzwerk Ernaehrungsfachkraefte** - Belegt ist der Weg, eine Fachkraft mit dem Zertifikat 'Ernaehrungsfachkraft Allergologie DAAB' zu finden - fuer die Pruefung der Substitutionsregeln, sobald das Produkt konkrete Umbauten behauptet. Nicht belegt sind Honorar und Bereitschaft; das ist ein Anruf, keine Recherche.
  <https://www.daab.de/der-daab/netzwerke/ernaehrungsfachkraefte>
- **Giftinformationszentralen (regionale Notrufnummern)** - Amtliches Verzeichnis als Quelle fuer die Notfallzeile, statt Nummern aus dem Gedaechtnis. Falls je ein Notfall-Blatt gebaut wird: Nummer aus dem Bundesland der Party-Adresse ziehen, Quelle und Stand danebenschreiben, einmal jaehrlich diffen.
  <https://www.kindergesundheit-info.de/themen/sicher-aufwachsen/notfall-infos/giftinformationszentralen-giftnotruf/>

## Partner ohne Beleg (erst pruefen, dann glauben)

- PrinterStudio.de (personalisiertes Kartenset): Stueckpreis 9-16 EUR inkl. Versand ist geraten. Zu pruefen: echter Konfiguratorpreis bei Auflage 1, verbindliche Lieferzeit nach Deutschland (die Linse selbst nennt 'etwa acht Tage'), Reklamationsweg. Bei einem Produkt mit hartem Termin ist die Lieferzeit das K.-o.-Kriterium, nicht der Preis.
- Gelato (Print-on-Demand ueber Etsy): die Etsy-Anbindung ist belegt, die deutschen Kartenpreise inklusive Versand sind es nicht. Zu pruefen: Stueckpreis bei Auflage 1, Produktionsstandort Deutschland, Laufzeit - und ob nach Etsy-Gebuehren ueberhaupt etwas bleibt.
- myposter (API angeblich erst ab 30 Bestellungen pro Tag) und Prodigi (Karten angeblich nur aus England): beides sind Behauptungen einer Linse ohne Beleg. Zu pruefen mit einer einzigen Mail an den Vertrieb - die Antwort entscheidet, ob es ueberhaupt einen anschliessbaren Fotodruck-Partner gibt.
- dm Abholstation fuer Bastel- und Partybedarf am Vortag: die zitierte Pressemitteilung ist vom 01.08.2022. Zu pruefen: gibt es den Dienst 2026 noch, in wie vielen Maerkten, welches Zeitfenster, welches Sortiment - und ob Pool-Nudeln und Pappschilde ueberhaupt gefuehrt werden.
- Bring! (Einkaufslisten-App): Import-Schnittstelle ist auf Rezepte ausgelegt (Pflichtfelder author, title, ingredients). Zu pruefen: ob ein Nicht-Rezept ueberhaupt zugelassen wird und ob der Import-Button freigeschaltet werden muss. Nebenfrage, die wichtiger ist: kauft irgendjemand Pappschilde in einer Rezept-App?
- Trustpilot (Free-Plan): Konditionen plausibel, aber bei null Verkaeufen gibt es nichts einzusammeln. Zu pruefen erst ab etwa 30 Kaeufen.
- Johanniter, Malteser oder ASB als regionaler Freigeber fuer ein Notfall-Blatt: kein Beleg, dass ein Regionalverband so etwas gegenzeichnet oder sein Logo hergibt. Zu pruefen mit einem Anruf beim naechstgelegenen Verband, bevor irgendwo 'geprueft von' steht.
- Honorarband einer staatlich anerkannten Erzieherin (300-700 EUR) und einer DAAB-Fachkraft (240-600 EUR): beides geraten. Zu pruefen mit zwei Anfragen. Wichtiger als der Preis: dass die Pruefung sich auf die REGEL bezieht, nicht auf das einzelne generierte Blatt - sonst entsteht eine Freigabepflicht bei jeder Textaenderung.
- Deutsche Post Grossbrief-Porto und Materialkosten fuer einen Eigenversand: die Preisseite blockt den automatisierten Abruf, die genannten rund 3,40 EUR sind unbelegt. Zu pruefen in der Filiale, bevor ein Versandpreis auf einer Verkaufsseite steht.
- Amazon-Warenkorb-Endpunkt fuer den Ein-Klick-Korb: eine Linse behauptet 'getestet'. Zu pruefen mit einem eigenen Test inklusive Provisionszuordnung - und mit der Frage, wie viele der 744 Suchlinks ueberhaupt in ASINs ueberfuehrbar sind, ohne dass die Pflege zur Dauerlast wird.
- Azure Speech (Neural-Stimmen) und DeepL API: Preisseiten teils nicht abrufbar (403). Beides ist ohnehin erst relevant, wenn das Produkt verkauft wird - siehe Bullshit-Liste.
- dm Sofortdruck-Stueckpreise: die Preisliste laedt dynamisch nach und war heute nicht maschinell pruefbar. Solange das so ist, nur Rossmann-Zahlen drucken - eine falsche Preisangabe ueber einen Dritten auf einer Verkaufsseite ist wettbewerbsrechtlich angreifbar.

## Bullshit - nicht bauen

- **Physisches Kartenset, Postversand in Eigenregie oder eine gebundene Broschuere als Produktlinie (Linsen 3, 5, 16)**
  Ein Kindergeburtstag hat ein hartes Datum. Ein Produkt mit acht Tagen Lieferzeit verkauft nur an Eltern, die drei Wochen vorher planen - also an die Minderheit, die das Problem am wenigsten hat. Dazu: mit dem ersten physischen Verkauf haengen Warenwiderruf, zwei Jahre Maengelhaftung, Verpackungsregister und eine Reklamation am Samstagnachmittag am selben Menschen, der auch die Seite baut. Sechs Minuten Handarbeit pro Bestellung klingen nach nichts und sind bei 15 Bestellungen die Woche der Anfang einer Kundenhotline. Der Eigendruck-und-Versand-Vorschlag ist ausserdem mit einer Portozahl gerechnet, die die Linse selbst nicht belegen konnte.
- **Vorlesestimmen aus dem Sprachsynthese-Dienst fuer 45 Motto-Dateien, Quiz-Tablet fuer die Kinder (Linse 1)**
  Loest keinen einzigen der 13 Einwaende. Die Eltern haben nach Mengen, Druckkosten und Stunden gefragt, nicht nach einer Konservenstimme. Und die Linse widerlegt sich selbst: ein Tablet auf dem Kindergeburtstag ist fuer einen Teil der Zielgruppe ein Ausschlusskriterium. Das ist die Sorte Feature, die man baut, weil sie Spass macht - bei null Verkaeufen ist das die teuerste Ablenkung im ganzen Katalog.
- **Bewertungs-Infrastruktur und Guetesiegel-Leiste als Preis-Traeger (Linsen 9, 10, 12)**
  Bewertungen, die es nicht gibt, kann man nicht einsammeln - und drei bezahlte Pruefungen plus drei Testfamilien summieren sich auf bis zu 1.550 EUR Vorleistung bei einem Betrieb ohne Kapital fuer Vorproduktion und ohne einen einzigen Verkauf. Die fachliche Pruefung der Allergie-REGELN wird Pflicht, sobald das Produkt konkrete Substitutionen behauptet; aber als Verkaufsargument aufgehaengte 'Geprueft von'-Leiste ist Schmuck, der eine Wechselschuld erzeugt: jede Textaenderung braucht danach eine neue Freigabe, und der Generator rendert jedes Blatt neu.
- **Merchant of Record (Digistore24, Paddle, Gumroad, Lemon Squeezy, Stripe Managed Payments)**
  Loest ein Umsatzsteuerproblem, das ein Kleinunternehmer mit deutschem Leistungsort nicht hat, und kostet dafuer 7,9 bis 10 Prozent plus Fixbetrag - bei 7,90 EUR ist das ein Viertel des Erloeses. Schlimmer: der MoR ist selbst kein Kleinunternehmer und fuehrt 19 Prozent Umsatzsteuer auf den Endpreis ab, die Bolle nicht schuldet. Das Support-Argument der Gegenlinse ist ehrlich, aber es rechnet mit 14,90 EUR - dem Preis, den die Eltern gerade abgelehnt haben.
- **Bezahlen nach der Party (0 / 5 / 9 EUR) und 'Jahreslizenz fuer den Haushalt' fuer 14,90 EUR (Linsen 5, 18)**
  Beide verschieben den einzigen Moment mit Zahlungsbereitschaft. Die Nachzahlung verlegt ihn dorthin, wo der Bedarf null ist - die Party ist vorbei, das Problem geloest, der Knopf 'Nein, 0 EUR' ist der bequemste. Die Jahreslizenz verkauft eine zweite Feier, die es statistisch nicht gibt: ein Kind hat einmal im Jahr Geburtstag, bei zwei Kindern liegt der Abstand meist ueber zwoelf Monaten. Eine Lizenz, die im Schnitt einmal genutzt wird, ist eine Preiserhoehung mit Zusatzschritten. Als Experiment ueber 20 Partys: von mir aus. Als Preismodell: nein.
- **Einladung und Eltern-Info in sieben Sprachen (Linse 15)**
  Der Nutzen ist echt, der Zeitpunkt ist falsch, und das Risiko ist unterschaetzt: 40 Strings mal sieben Sprachen sind Pflege, die niemand im Betrieb gegenlesen kann. Ein maschinell uebersetzter Allergie-Satz, den keine Muttersprachlerin geprueft hat, ist gefaehrlicher als gar keiner - genau bei der Gruppe, bei der Essensregeln am haeufigsten vorkommen.
- **Eigener Strichsymbol-Satz fuer 17 Mottos, eigener Icon-Baukasten (Linse 20)**
  Die Emojis rauszunehmen und zwei Schriften selbst zu hosten ist billig und richtig. 'Rund 30 gemeinsame Symbole plus drei bis fuenf je Motto' ist Wochenarbeit an der Oberflaeche eines Produkts, das noch nie jemand gekauft hat. Wertigkeit entsteht hier zuerst durch weniger Blaetter und weniger Selbstgespraech auf dem Papier, nicht durch ein Piktogramm-System.
- **Etsy-Listing mit einem QR-Code in der ZIP, der zur kostenlosen Datenversion auf machsleicht.de fuehrt (Linse 12)**
  Die Linse zitiert die Richtlinie gegen Transaktionen ausserhalb der Plattform selbst und baut dann genau das. Etsy als Trichter mit einem ehrlichen Blanko-Set zum dortigen Marktpreis ist legitim; die Datei, die den Kaeufer aus dem Marktplatz herausfuehrt, riskiert den Shop. Und der eigentliche Befund der Linse ist unbequemer als ihr Vorschlag: dort kostet ein 35-Seiten-Set 12,99 EUR - der Preis ist kein Verhandlungsspielraum, sondern eine Marktrate.
- **Helfer-Link fuer die zweite erwachsene Person, Bild-Ablauf, Raum-Blatt, vier neue SOS-Karten, Kalender-Sammelimport - alles im selben Zug (Linsen 8, 15, 18)**
  Jedes Einzelne davon ist plausibel und keines steht auf der Einwandsliste der Eltern. Das ist der Mechanismus, der die 18 Blaetter ueberhaupt erzeugt hat: gute Ideen, die niemand bestellt hat, landen im Produkt und werden dann als Fuellmaterial erkannt. Erst die 13 Einwaende schliessen, dann neu messen, dann eins davon.

## Streichliste

- Countdown-Poster - ersatzlos. 14 Kreise zum Ausmalen, in Farbe gedruckt, mit einem Leerfeld 'Noch __ Naechte', obwohl das Partydatum im Datensatz steht. Von 9 Linsen unabhaengig genannt und von Welle 1 als Fuellmaterial abgelehnt.
- Die vier bis fuenf identischen Zusatz-Urkunden und die Blanko-Urkunde - ersatzlos. Es bleibt eine Urkunde je zugesagtem Kind, zwei auf ein A4, Datum eingedruckt, plus genau eine sichtbar als 'Reserve' beschriftete.
- Danke-Blatt - ersatzlos. Sein einziger Inhalt ist der Hinweis, dass der Text in der Bildschirm-Ansicht steht. Ein gedrucktes Blatt, das mitteilt, dass der Inhalt woanders ist, ist der Beweis fuer E5.
- Erinnerungs-Chronik / Burg-Chronik - ersatzlos. Sie fragt nach Ereignissen, die laut Ablaufplan gar nicht stattfinden (E7, 18 von 20).
- Eltern-Handzettel mit den fest vier Abrisszetteln - ersatzlos. Er fragt Zusagen ab, die im selben Dokument namentlich stehen, und liefert vier Zettel bei fuenf Gaesten (E10).
- Rollenkarten - ersatzlos. Von Welle 1 ausdruecklich als Fuellmaterial benannt.
- Deckblatt / Cover - ersatzlos. Ein Cover verkauft im Regal; hier ist es die erste Farbseite eines Druckjobs am Kuechentisch, bevor irgendetwas Nuetzliches kommt.
- Der Satz 'Die Mengen unten sind fuer 8 Kinder gerechnet, du hast 5 Zusagen - du brauchst entsprechend weniger' - ersatzlos, nicht umformuliert. Er ist die schriftliche Bestaetigung, dass die beworbene Funktion fehlt.
- Im @media-print-Block von paket/core/paket.css: background:var(--paper)!important zusammen mit print-color-adjust:exact. Faerbt jedes Blatt vollflaechig ein, auch wenn der Nutzer Hintergrundgrafiken abschaltet, und macht aus einem Schwarzweiss-Job einen Farbdruck. Von zwei Linsen unabhaengig an derselben Zeile gefunden. Creme bleibt am Bildschirm.
- Alle Amazon-Nennungen und die Affiliate-Fussnote auf gedruckten Blaettern - ersatzlos. Niemand klickt ein A4-Blatt an, und die Programmrichtlinien untersagen Werbung in Offline-Material.
- Die rote Allergie-Warnbox auf dem Einkaufszettel - ersatzlos. Gesundheitsdaten fremder Kinder auf einem Blatt, das im Copyshop liegt und im Supermarkt herumgereicht wird. Der Inhalt gehoert auf den Kuechen-Zettel, als Handlung statt als Warnung.
- Die zehn mit 'Sicherheit:' beginnenden Absaetze im Fliesstext der Einkaufsliste - dort ersatzlos. Sie machen die Liste unlesbar und erreichen den Leser zwei Wochen vor dem Moment der Gefahr. Sie gehoeren an die jeweilige Spielkarte.
- Die 12 Selbstverweise 'siehe Teil II / III / IV' und 'liegt fertig in Teil III' - ersatzlos. Ein bezahltes Blatt schickt den Leser nicht durch sein eigenes Inhaltsverzeichnis. Als Linter-Regel absichern, sonst wachsen sie nach.
- Die 14,90-EUR-Warteliste-Karte samt 'geplant'-Etikett auf der Planerseite - ersatzlos. Sie zeigt einen Preis in dem Moment, in dem der wahrgenommene Wert am kleinsten ist (kein Name, keine Zusage, keine Allergie), und hat null Kaeufer erzeugt.

## Erste Woche

- Tag 1 vormittags: state.guests und state.location ins payload (kindergeburtstag.html, payload-Objekt ab ca. Z. 2920) plus Worker-Whitelist. Das sind zwei Zeilen und die Ursache des meistgenannten Einwands. Danach Ritter als einziges Motto durchziehen - nicht alle 17 parallel.
- Tag 1 nachmittags: Streichliste loeschen (Countdown-Poster, Chronik, Danke-Blatt, Eltern-Handzettel, Rollenkarten, vier ueberzaehlige Urkunden, Deckblatt) - im Renderer, nicht per Schalter. Direkt danach die 12 Selbstverweise 'siehe Teil III' aufloesen, sonst zeigen die verbliebenen Blaetter ins Leere.
- Tag 2 vormittags: Mengenrechnung. Je Posten die Felder basis und skaliert setzen, Gebinde ausnehmen, drei getrennte Zahlen (Einkauf, Sitzplaetze, Mitgebsel). Den Pauschalsatz loeschen. Gegenprobe mit 3, 5 und 11 Zusagen.
- Tag 2 nachmittags: Reserve-Regel - Countdown und Einkaufsliste nur noch aus buildTimeline().rows. Plus Urkunden 2-up mit eingedrucktem Datum. Beides zusammen ist ein halber Tag und schliesst zwei 20-von-20-Einwaende.
- Tag 3 vormittags: Print-CSS. Flaechenton und print-color-adjust:exact raus, jedes Blatt bekommt muss/kann und sw/farbe, Ortszweig-Filter (nur die zutreffende Fassung je Spielkarte). Dann EINMAL auf einem echten Tintenstrahler drucken und einmal in Graustufen - nicht im PDF-Viewer beurteilen.
- Tag 3 nachmittags: Druck-Streifen mit gerechneter Blattzahl, Farbanteil und zwei Copyshop-Preisspannen inklusive Quelle und Stand-Datum. Gleichzeitig alle Amazon-Nennungen aus dem Druckpfad nehmen (halbe Stunde, beseitigt ein Kontorisiko).
- Tag 4 vormittags: Vorher-Blick. Paket mit echten Daten frei lesbar, Druck ueber @media print gesperrt, drei gerechnete Zahlen im Kopf (Blaetter/Farbe, Druckkosten, Vorbereitungsminuten grob). Der Kuechen-Zettel bleibt als einziges Blatt auch ohne Kauf druckbar.
- Tag 4 nachmittags: Linter-Gates ergaenzen - Hedge-Woerter, bekannte Leerfelder, Reserve-im-Countdown, Selbstverweise. 0 FAIL ist Deploy-Bedingung. Danach den Ritter-Datensatz einmal komplett durchlaufen lassen und die Treffer abarbeiten.
- Tag 5 vormittags: Vollprobe mit einem realistischen Datensatz - 5 Zusagen, 2 Allergien, eine abweichende Abholzeit, Wohnung statt Garten. Blaetter zaehlen, ausdrucken, auf den Tisch legen. Wenn mehr als 9 Blaetter uebrig sind, weiter streichen statt weiter bauen.
- Tag 5 nachmittags: Welle 2 ansetzen. Dieselbe Frage, dieselbe Preisfrage, neue Eltern, kein Hinweis darauf, was geaendert wurde. Nichts an Checkout, Stripe, Fotokarte oder Live-Modus wird gebaut, bevor diese Zahl da ist - Welle 1 hat gezeigt, was ein ungemessenes Produkt kostet.

## Die eine Entscheidung, die nur Bolle treffen kann

"Soll das reparierte Paket ueberhaupt ein Vorkasse-Produkt bleiben - oder wird es kostenlos und das Geld kommt aus Vermittlung (Amazon, Awin, Fotodruck) plus einem spaeteren, kleinen bezahlten Kern? Die zwanzig Linsen koennen das nicht entscheiden, weil beide Wege durch dieselbe Reparaturliste laufen und sich erst danach trennen. Produktweg heisst: Checkout, Widerrufsbelehrung, Preisleiter, und die Pflicht, jedes einzelne Blatt gegen eine gemessene Schmerzgrenze von 6 EUR und eine belegte Marktrate von rund 0,35 EUR je Blatt zu verteidigen - realistisch 4,90 bis 8,90 EUR, und 14,90 EUR nur noch mit etwas Physischem oder einem Partytag-Bildschirm dran. Vermittlungsweg heisst: maximale Gratis-Flaeche, echte ASINs statt 744 Suchlinks, Fotokarten-Strecken - und die Akzeptanz, dass pro Party ein bis drei Euro Provision das Ergebnis sind, dafuer ohne Checkout, ohne Widerruf, ohne Reklamation am Samstag. Die Zahl entscheidet das nicht: bei null Verkaeufen ist jede Hochrechnung Fiktion. Entscheidend ist, was mit 20 bis 30 Stunden die Woche dauerhaft tragbar ist und was Bolle bauen will - ein Produkt, das man verteidigen muss, oder eine Reichweite, die nebenbei zahlt. Diese Entscheidung sollte VOR der zweiten Elternwelle fallen, weil sie bestimmt, welche Frage man den Eltern ueberhaupt stellt."
