# Welle 3 - 19 fremde Eltern oeffnen den Einladungslink (19.08.2026)

Aufbau: 19 Personas (20 gestartet, einer starb an einem Server-Fehler) bekommen den Link
einer ECHTEN Live-Party per WhatsApp von einer Familie, die sie fluechtig kennen. Keiner
hat je von machsleicht gehoert. Absenden war ausdruecklich verboten - beurteilt wird, was
sie taeten. Wegwerf-Party `ngnucra58kdy`, nach der Welle geloescht.

Warum diese Welle: Welle 1 und 2 sahen beide auf den Kaeufer. Pro Party bekommen aber
5 bis 10 Familien das Produkt vor die Nase, die es nie gesucht haben - bei einer
indexierten Seite und null Suchtraffic ist das praktisch der gesamte Vertriebsweg.
Die Gaesteseite war technisch mehrfach gegated (88/100 nach dem rsvpPhone-P0, 8-Linsen-
Workflow mit echter E2E-Party). Nie geprueft wurde der erste Eindruck auf einen Fremden.

## Ergebnis

| | |
|---|---|
| Erster Eindruck | 9x serioes · 10x unsicher · **0x verdaechtig** |
| Allergie vollstaendig eintragen | **3 von 19** (14x nur ungefaehr, 2x gar nicht) |
| Wuerde es selbst nutzen | 3x ja · 16x vielleicht · **0x nein** |

Niemand haelt es fuer Betrug, und niemand lehnt es ab. Aber fast niemand traegt die
Gesundheitsangabe seines Kindes vollstaendig ein - und fast niemand ist ueberzeugt.

## Selbst geprueft (Stufe 3)

| Behauptung | Befund |
|---|---|
| `5 Minuten` widerspricht dem 10-Minuten-Versprechen | **stimmt, und mein Gate hatte das Loch.** Stufe 53 las `party-worker.js` ueberhaupt nicht (Musterliste kannte nur `js/index.js`), und `einladung/erstellen/index.html:296` rutschte am Wortlaut vorbei: "Komplett-Planer" ist kein "kompletter Plan", Abstand 72 > 60 Zeichen. Beides gefixt, Gate erweitert, 4 Gegenproben rot. |
| Rohdatum `2026-09-12` im eingebetteten Spiel | **stimmt.** `party-worker.js:1752` uebergibt `party.date` unformatiert, zwei Zentimeter darueber rendert dieselbe Seite "Samstag, 12. September 2026". |
| Chat-Vorschau verspricht Wunschliste bedingungslos | **stimmt.** `:1704` und `:1739` haengen "& Wunschliste" an, ohne `party.wishes` zu pruefen. Dazu: `:1737` setzt fuer die Gaesteseite hart `"Du bist eingeladen!"`, obwohl `:1703` den guten Titel "Tino wird 7!" bereits baut. |
| Kein Gastgebername, keine Telefonnummer im Datenmodell | **stimmt.** 0 Treffer fuer hostName/hostPhone. Vorhanden sind nur childName, date, time, endTime, address, notes, wishes, askAllergies, askPickup. Ein Fremder kann nicht erkennen, welche Familie einlaedt. |
| Quittung sagt "gespeichert", nicht "angekommen" | **stimmt.** `party-worker.js:2001`. |
| Allergiefeld ist einzeilig, maxlength 200, Platzhalter "z.B. Nussallergie" | **stimmt.** `party-worker.js:1993`. |
| Derselbe Link zeigt beim zweiten Oeffnen ein anderes Kind | **NICHT reproduzierbar.** Derselbe `?g=`-Token liefert dreimal denselben Namen, andere Token andere Namen - Agenten-Artefakt. Ungeprueft bleibt clientseitiges Verhalten im echten Browser. Die vier darauf gestuetzten Urteile sind entsprechend zu entwerten; der Punkt "der Link IST das Passwort" steht davon unabhaengig. |

## Der teuerste Befund: die Schutzfunktion ist die Abbruchstelle

19 von 19 nennen die Zeile, **17 von 19 als ihre woertliche Abbruchstelle**:

> 🔒 Adresse erscheint nach deiner Zusage

Sie wurde als Datenschutz gebaut (anonymer RSVP soll die Wohnadresse nicht leaken) und
wird als Dark Pattern gelesen - von zwei Eltern beruflich so benannt. Dieselben Eltern
loben den Schutzgedanken, mehrere haben im Quelltext nachgesehen und bestaetigt, dass die
Adresse wirklich nicht drinsteht. Aufloesung ist Abstufung, nicht Abschaffung:
Grobort oeffentlich ("Bei uns zuhause in Hamburg-Winterhude"), Strasse nach der Zusage.

## Warum die Allergie nur halb eingetragen wird

Nicht aus Datenschutzgruenden. Der Satz am Feld wird von **19 von 19** gelobt, mehrfach als
"bester Satz der Seite"; mehrere haben freiwillig die Datenschutzerklaerung geoeffnet und
kamen beruhigt zurueck. Der Grund ist **Zustellung**: 15 von 19 wissen nicht, ob je ein
Mensch die Angabe liest. `gespeichert ist nicht gelesen`.

- Zustellquittung in zwei Stufen, an der Stelle von 'Deine Zusage ist gespeichert.' (party-worker.js:2001): sofort 'Tinos Familie hat deine Zusage und den Allergie-Hinweis erhalten', spaeter 'Gelesen am 21.08.'. Das ist der einzige Hebel, zu dem zwei Eltern woertlich sagen, dass sie dann von 'nur ungefaehr' auf 'vollstaendig' wechseln (#1, #11). Hoechste Wirkung pro Aufwand in der gesamten Auswertung.
- Holschuld in Bringschuld drehen: Benachrichtigung an die Gastgeber bei neuer Antwort und eine Erinnerung am Vortag mit der Allergie-Liste (#4 woertlich). Ohne Push bleibt jede Angabe 'eine Flaschenpost' (#8) bzw. 'versauert in einer Liste' (#19).
- Notfallkontakt des Gastes: Pflichtfeld 'Handynummer fuer Rueckfragen', sobald im Allergiefeld etwas steht (#3 woertlich: 'verpflichtend, sobald jemand ins Allergiefeld etwas schreibt'). Heute fragt die Seite, wer das Kind abholt, aber nie, wie man die Eltern erreicht.
- Gastgebername plus Nummer sichtbar oberhalb des Feldes. Fuenf Eltern begruenden ihre Kurzform direkt mit dem namenlosen Empfaenger; #2 (Oma) und #18 verweigern Details ausdruecklich deshalb.
- Feldform passend zur Sache: mehrzeilig statt einzeiligem input(200), und ein Platzhalter, der strukturiert fragt (Was? Wie streng? Notfallset dabei? Wen anrufen?) statt 'z.B. Nussallergie' - der Platzhalter ist die eigentliche Laengenvorgabe.
- Zweites Feld 'Was sollten wir sonst ueber dein Kind wissen?'. Bei #17 (Medikinet, Rebound ab 17 Uhr) und #12 (schuechtern, soll nicht vorneweg laufen) ist die wichtigste Angabe gar keine Allergie - beide muessten heute das Allergiefeld zweckentfremden.
- Sagen, was es zu essen gibt. Eine Allergieangabe ohne Menue ist wertlos; vier Eltern nennen genau das ('bei Erdnuss ist "es gibt was zu essen" keine Auskunft', #3). Das entscheidet auch, ob eine sichere Brotdose mitkommt.
- Ausdrueckliche Einwilligung als Checkbox ueber dem Absenden-Knopf: 'Ja, die Gastgeber duerfen diese Angabe fuer diese Party speichern' (#4). Heilt die Art.-9-Luecke und gibt gleichzeitig das Gefuehl, entschieden statt gerutscht zu sein.
- Loeschknopf fuer den Gast auf seinem eigenen Link (Art. 17), nicht nur 'Antwort aendern' auf demselben Geraet.
- Ein Satz auf der Gaesteseite dazu, wo die Angabe liegt und wer Verantwortlicher ist. 'Das sieht nur die Gastgeber-Familie' stimmt fuer die Sichtbarkeit, nicht fuer die Verarbeitung - #4: 'Das ist der eine Satz, der mir dort gefehlt hat.'
- Null externe Requests auf Gaesteseiten mit Art.-9-Feld (US-Analyseskript entfernen, Schriften im Spiel lokal). #1 formuliert es als Verkaufsargument: 'auf einer Seite mit Art.-9-Daten ist "keine Fremdanfrage" das staerkere Verkaufsargument als jede Datenschutzerklaerung'.
- Link-Identitaet wasserdicht machen und das Weiterleiten ueberleben lassen. Solange derselbe Link beim zweiten Oeffnen ein anderes Kind begruesst, kann eine Nussallergie in der Zeile des falschen Kindes landen - das ist kein Vertrauens-, sondern ein Sicherheitsdefekt.
- Beim Anlegen einen Kasten 'Was du gerade uebernimmst' (#4): welche Daten kommen rein, wo liegen sie, wann sind sie weg, und dass der Bearbeitungs-Link wie ein Schluessel zu behandeln ist. Sonst sammelt der Gastgeber Gesundheitsdaten fremder Kinder, ohne es zu wissen.

## Vertrauensbrueche, nach Haerte

| n | Stelle | Zitat |
|---|---|---|
| 19 | Party-Details, Adresszeile (party-worker.js:1972 und :2069). Die harteste Stelle ueberhaupt: 19 von 19 nennen sie, und 17 von 19 nennen sie als ihre woertliche Abbruchstelle. Die zwei anderen kamen wegen des Namens-Tors gar nicht  | 🔒 Adresse erscheint nach deiner Zusage |
| 19 | Gruss-Block der Gastgeber (party-worker.js:1948, gespeist aus party.notes) und die gesamte Seite. Ich habe das Datenmodell geprueft: der Party-Datensatz kennt date, time, address, wishes, notes, askAllergies, askPickup - aber KEIN | 💌 Wir freuen uns auf euch! Bitte gebt kurz Bescheid, ob ihr kommt. |
| 4 | Ritter-Pass / Begruessung beim erneuten Oeffnen desselben Links. Zwei Eltern sahen beim zweiten Aufruf ein anderes Kind, zwei weitere zweifeln grundsaetzlich an der Link-Identitaet ('Der Link IST das Passwort', #4). Haerteste Folg | Erst »Mats, deine Mission wartet!« ... kurz darauf beim erneuten Oeffnen »Noah, deine Mission wartet!« |
| 18 | Datumspille im eingebetteten Spiel. Ursache verifiziert: party-worker.js:1752 uebergibt den Rohwert - `&date=${encodeURIComponent(party.date||"")}` - waehrend die Seite zwei Zentimeter darueber sauber 'Samstag, 12. September 2026' | 📅 2026-09-12 · 🕑 15:00 |
| 4 | Namens-Tor beim weitergeleiteten Link (party-worker.js:1899-1903). Erster Bildschirm verlangt eine Eingabe, bevor irgendein Inhalt sichtbar ist - fuer zwei Eltern die Abbruchstelle, fuer beide exakt das Phishing-Muster ('das ist e | Hmm, das stimmt nicht. Frag nochmal die Eltern! 😊 |
| 12 | Werbeflaechen: Sieg-Bildschirm des Kinderspiels und Fuss der Einladung (party-worker.js:2029). 12 von 19 nennen es; der Kipppunkt ist nicht die Werbung an Eltern, sondern die im Spiel: 'Da wird meiner Sechsjaehrigen im Moment des  | ⚔️ Schatzsuche für deinen Kindergeburtstag → / Planst du auch bald einen Geburtstag? |
| 5 | WhatsApp-Vorschaukarte (party-worker.js:1739). Verifiziert: die ogDesc verspricht die Wunschliste bedingungslos, unabhaengig davon, ob party.wishes befuellt ist - obwohl das Feature existiert (11 Verwendungen von party.wishes im W | Ritter — Zu-/Absage, Infos & Wunschliste |
| 9 | Selbstwiderspruechliche Versprechen quer ueber Startseite, Gaesteseite und Datenschutzerklaerung: 'keine Cookies' vs. __cf_bm (3), 'in 5 Minuten' vs. 'in 10 Minuten' (4), 'ohne Anmeldung' vs. E-Mail-Pflicht fuer den Edit-Link (2), | Keine Anmeldung, keine Cookies — vs. — Cloudflare kann technisch notwendige Cookies setzen (z.B. __cf_bm) |
| 4 | Die URL selbst plus die generische Chat-Vorschau (party-worker.js:1737 setzt ogTitle hart auf 'Du bist eingeladen! 🎉' - obwohl die Editor-Seite in Zeile 1702 bereits den guten Titel 'Tino wird 7! 🏰' baut). 4 Eltern lasen die Adres | party.machsleicht.de/ngnucra58kdy?g=3beekf8mtygfs578 |
| 4 | Personalisierte Begruessung, bevor irgendetwas eingegeben wurde. Zwiespaeltigster Befund der Auswertung: fuer rund zehn Eltern der staerkste Vertrauensanker ('ein Betrueger kennt den Vornamen meines Kindes nicht'), fuer vier derse | Mats, deine Mission wartet! |
| 4 | Datenschutzerklaerung, Speicherort - und die Luecke zur Gaesteseite. 4 Eltern lasen es nach; #4 (Datenschutzbeauftragte) benennt den Bruch praezise: die Gaesteseite sagt 'das sieht nur die Gastgeber-Familie', was sich wie 'bleibt  | Die Daten werden in Cloudflare Workers KV gespeichert (Cloudflare, Inc., San Francisco, USA) |
| 5 | Zwei Schreibweisen desselben Namens innerhalb von zwei Klicks, plus Deppenapostroph. Winzig, aber 5 Eltern nennen es unter 'Killer' - und zwar mit Begruendung: 'dann frage ich mich, was noch automatisch zusammengesetzt wurde' (#10 | Tino's Ritter-Einladung — vs. — Tinos Ritter-Mission |

## Sofort behebbar

- **Zwei neue Pflichtfelder beim Anlegen (Gastgeber-Name, Handynummer) und eine Absenderzeile oben auf der Gaesteseite: 'Es laedt ein: Familie Berger — Anna, 0170 …'. Bis die Felder da sind, als Sofortmassnahme: Label und Platzhalter der 'Persoenlichen Nachricht' aendern in 'Wer laedt ein? Name + Handynummer fuer Rueckfragen'.**
  - Stelle: party-worker.js:2411 (Editor-Feld edNotes) und :1948 (Rendering des Gruss-Blocks). Der Party-Record hat verifiziert kein Feld fuer Gastgebername/Telefon - das ist die Wurzel des meistgenannten Befunds.
  - Wirkung: Adressiert den einzigen Punkt, den 19 von 19 nennen, und einen Grossteil der Kanalwechsel. 18 von 19 nennen ihn woertlich als Bedingung fuer eigene Nutzung.
- **Adresse abstufen statt sperren: Grobort (Stadtteil + Art des Orts) oeffentlich, Strasse nach der Zusage. Text: 'Bei uns zuhause in Hamburg-Winterhude — genaue Adresse nach deiner Zusage'. Zusaetzlich den Grund an die Sperre schreiben ('damit unsere Adresse nicht durch Weiterleitungen wandert').**
  - Stelle: party-worker.js:1972 und :2069 - die Zeile '🔒 Adresse erscheint nach deiner Zusage'. Die Begruendung existiert bereits, aber nur im Gastgeber-Wizard ('🔒 Nicht öffentlich sichtbar — erscheint erst, nachdem ein Gast zugesagt hat').
  - Wirkung: Loest die Abbruchstelle von 17 von 19 auf, ohne den Schutz aufzugeben, den dieselben Eltern loben. #14: 'macht aus einer Zumutung ein Argument'.
- **Datum menschenlesbar an das Spiel uebergeben statt roh: 'Samstag, 12. September · 15:00–18:00 Uhr' statt '2026-09-12'. Gleichzeitig die bereits vorhandenen, aber leer uebergebenen Parameter ort und tel befuellen - das Spiel liest beide schon aus.**
  - Stelle: party-worker.js:1752 - `&date=${encodeURIComponent(party.date||"")}` sowie `&ort=&tel=${encodeURIComponent("")}`. Verifiziert: das Ritter-Spiel wertet get("ort") und get("tel") aus, bekommt aber leere Strings.
  - Wirkung: Beseitigt den mit 18 von 19 meistgenannten Einzelbefund - die Stelle, an der 'liebevoll gemacht' fuer alle in 'nicht ganz fertig' kippt - und liefert nebenbei Ort und Nummer genau dort, wo das Kind und der mitlesende Elternteil hinschauen.
- **Chat-Vorschau reparieren: den bereits existierenden guten OG-Titel auch auf der Gaesteseite verwenden ('Tino wird 7! 🏰 — Ritter-Party am Sa, 12.9., 15 Uhr') statt der generischen Karte.**
  - Stelle: party-worker.js:1737 (`ogTitle = "Du bist eingeladen! 🎉"`) - Zeile 1702 baut denselben, besseren Titel fuer die Editor-Seite bereits korrekt.
  - Wirkung: Der erste Eindruck entsteht im Chat, nicht auf der Seite. Repariert das Phishing-Aussehen (4 Eltern lasen die Vorschau als Spam) mit einer Zeile Code, die schon existiert.
- **Das Wunschlisten-Versprechen an den Bestand koppeln: ogDesc nur dann 'Wunschliste' nennen, wenn party.wishes befuellt ist - sonst 'Zu-/Absage & Infos'. Auf der Seite ehrlich: 'Tinos Eltern haben keine Wunschliste hinterlegt.'**
  - Stelle: party-worker.js:1704 und :1739 - `${party.motto} — Zu-/Absage, Infos & Wunschliste` wird unabhaengig von party.wishes gesetzt.
  - Wirkung: Beseitigt ein gebrochenes Versprechen, das 5 Eltern gesucht und nicht gefunden haben - ausgerechnet als allererste Information, die sie ueber das Produkt bekommen.
- **Empfangsquittung statt Speicherbestaetigung: 'Tinos Familie hat deine Zusage und den Allergie-Hinweis erhalten' - und sobald die Gastgeber die Liste oeffnen, 'Gelesen am 21.08.'.**
  - Stelle: party-worker.js:2001 - `<p id="rsvpSub">Deine Zusage ist gespeichert.</p>`
  - Wirkung: Der einzige Hebel, zu dem Eltern woertlich sagen, dass sie dann die vollstaendige Allergie eintragen (#1, #11). Nimmt zugleich 6 Eltern den Anlass, vorsichtshalber nochmal in WhatsApp zu schreiben.
- **Drei Zeilen 'Gut zu wissen' im Party-Details-Block, gespeist aus drei Dropdowns im Wizard: Kostuem ja/nein · Essen (nur Kuchen / Abendbrot) · Eltern bleiben oder abgeben. Optional vierte Zeile Geschenkrahmen.**
  - Stelle: party-worker.js:1971-1972 (info-rows unter Datum/Zeit) plus drei Felder im Editor.
  - Wirkung: Das sind exakt die Rueckfragen, die 16 von 19 zurueck in WhatsApp treiben. Vier Dropdowns beim Gastgeber ersparen ihm nach eigener Aussage 'zwanzig Rueckfragen'.
- **Allergie-Block umbauen: mehrzeiliges Feld, strukturierter Platzhalter ('Was? Wie streng? Notfallset dabei? Wen anrufen?'), direkt darunter ein Pflichtfeld 'Handynummer fuer Rueckfragen' sobald etwas eingetragen wird, plus eine Checkbox 'Ja, die Gastgeber duerfen diese Angabe fuer diese Party speichern'.**
  - Stelle: party-worker.js:1993 - heute `<input type="text" id="rsvpAllergies" placeholder="z.B. Nussallergie" maxlength="200">`. Der Hinweistext darunter bleibt woertlich unveraendert, er ist der beste Satz der Seite.
  - Wirkung: Repariert drei Ursachen der Halb-Daten gleichzeitig (Feldform, fehlender Rueckkanal, fehlende ausdrueckliche Einwilligung nach Art. 9 Abs. 2 lit. a) - ohne den Anker zu beschaedigen.
- **Werbung aus dem Sieg-Bildschirm des Kinderspiels entfernen; der Eltern-Block unter der Einladung bleibt.**
  - Stelle: Spiel-Endscreen ('⚔️ Schatzsuche für deinen Kindergeburtstag →' / 'Kostenlos · Sofort startklar · machsleicht.de') in den Einladungsspielen unter /einladung/<motto>/whatsapp/; der Eltern-CTA in party-worker.js:2029 kann bleiben.
  - Wirkung: Nimmt den Kipppunkt weg, an dem 5 Eltern von 'nette Einladung' auf 'Trichter, und mein Sohn ist gerade durchgelaufen' umschalten - ohne den funktionierenden Eltern-CTA zu opfern.
- **Einen Herkunftssatz nach ganz oben ziehen: 'Diese Einladung hat Tinos Familie mit machsleicht.de erstellt — kostenloses Tool, ohne Anmeldung', mit Impressumslink daneben. Plus einen Satz dazu, wer den Vornamen des Kindes eingetragen hat ('Tinos Eltern haben deinen Vornamen eingetragen. Er steht nicht im Link.').**
  - Stelle: Kopfbereich der Gaesteseite, oberhalb des Hero-Blocks (party-worker.js:1919). Heute steht die erste Erklaerung ganz unten und ist Werbung.
  - Wirkung: Bedient die 4-Sekunden-Pruefung, in der heute nur die Domain hilft (#1), und entschaerft den Enkeltrick-/Phishing-Reflex, den 4 Eltern beim Lesen des Kindernamens hatten.
- **Namens-Tor entschaerfen: Fehlermeldung an Erwachsene richten und einen zweiten Weg anbieten (Motto und Datum zeigen, statt Sackgasse), und der vorgefertigte WhatsApp-Text muss den Vornamen von sich aus enthalten.**
  - Stelle: party-worker.js:1899-1903 - 'Du bist eingeladen!' / 'Hmm, das stimmt nicht. Frag nochmal die Eltern! 😊'
  - Wirkung: Zwei von 19 sind genau hier ausgestiegen; beide lasen den Startbildschirm als Phishing. '"Frag nochmal" heisst bei mir zwischen zwei Schichten: nie' (#6).
- **Selbstwiderspruechliche Versprechen in einem Durchgang glaetten: '5 Minuten' vs. '10 Minuten' vereinheitlichen, 'keine Cookies' um den __cf_bm-Fall ehrlich ergaenzen, 'ohne Anmeldung' um den E-Mail-Schritt fuer den Edit-Link ehrlich machen (auf dem Knopf, nicht erst im Flow), und die Datenschutzerklaerung mit der Realitaet abgleichen (Google-Fonts-Absatz, unpkg.com fehlt).**
  - Stelle: Startseite index.html, transparenz.html, datenschutz.html sowie der Fussblock der Gaesteseite (party-worker.js:2029ff).
  - Wirkung: 9 verschiedene Eltern fanden mindestens einen Widerspruch, alle mit derselben Folge: ab da pruefen sie auch alles andere. Reine Textarbeit, null Risiko.
- **Kosmetik-Paket in einem Rutsch: 'Tino's' zu 'Tinos', 'Mission Complete!' auf Deutsch, '🏅 OFFIZIELLE/R RITTER/IN' entgendern, 'Status: Zusage offen' nicht mit auf den druckbaren Pass, '🖨️ Pass drucken' um 'Als Bild speichern' ergaenzen, und die Antwortfrist ausschreiben ('Bitte bis 5. September Bescheid geben') statt nur den Countdown.**
  - Stelle: Spiel-Templates unter /einladung/<motto>/whatsapp/ sowie party-worker.js:1819 (Pass drucken) und der Countdown-Block im Hero.
  - Wirkung: Jedes Einzelteil ist trivial, in Summe aber die Quelle des 'da war jemand fertig, bevor er fertig war'-Eindrucks - genannt von 5 Eltern beim Apostroph, 2 beim englischen Siegtext, 4 bei der fehlenden Frist.

## Strukturell (kein Textfix)

- Der Vertriebsweg widerlegt sich selbst. Der Gasteindruck IST die gesamte Akquise, und er produziert derzeit Reputationsrisiko fuer den kuenftigen Gastgeber: 8 von 16 Unentschlossenen begruenden ihr 'vielleicht' nicht mit Produktqualitaet, sondern damit, dass sie anderen Familien nicht zumuten wollen, was sie gerade erlebt haben. Das laesst sich nicht mit Copy heilen, sondern nur, indem die Gaesteseite als Visitenkarte des Gastgebers gebaut wird statt als Formular des Anbieters - inklusive Gaeste-Vorschau vor dem Versand und mitgeliefertem Begleittext.
- Adresse-hinter-der-Zusage ist eine Produktentscheidung, kein Textproblem. Sie wird als Feature beworben ('Adresse erst nach Zusage.') und ist gleichzeitig die Abbruchstelle von 17 von 19. Aufloesbar nur durch Abstufung (Grobort oeffentlich, Feinort nach Zusage) und/oder eine Wahl beim Anlegen - mit dem ehrlichen Hinweis, dass die geschlossene Variante Zusagen kostet (#4). Zusatzdefekt: bei weitergeleiteten Links ohne Gast-Token kommt die Adresse nie ('🔒 Den Treffpunkt bekommst du von der Gastgeber-Familie') - dann ist die Zusage auf der Seite fuer den Gast wertlos.
- Der Link ist gleichzeitig Passwort, Identitaet und Einladung. Ein weiterleitbarer Gast-Link, der ein bestimmtes Kind benennt und Gesundheitsdaten entgegennimmt, ist architektonisch nicht durch Text zu retten: zwei Eltern sahen beim erneuten Oeffnen ein fremdes Kind, eine sperrte sich aus der eigenen Einladung aus, eine Datenschutzbeauftragte beschreibt den Missbrauchsfall praezise. Solange das nicht wasserdicht ist, ist jede Personalisierung wertlos und jede Allergieangabe potenziell falsch zugeordnet.
- Es gibt keinen Rueckkanal. Die Seite kann exakt eins: Daten entgegennehmen. Ohne Frage-Knopf, ohne erreichbaren Menschen ersetzt sie WhatsApp nicht, sie verdoppelt es - 12 von 19 antworten am Ende doch im Chat, mehrere formulieren das als Fazit ('dann hat die Seite ihren Zweck verfehlt'). Das ist Architektur (Zustellung, Benachrichtigung, Identitaetsschutz beider Seiten), kein Feld.
- 'Gespeichert' ist nicht 'gelesen'. Ohne Push an die Gastgeber (Benachrichtigung bei neuer Antwort, Erinnerung am Vortag mit Allergie-Liste) bleibt das Allergiefeld eine Flaschenpost - und halbe Allergiedaten plus ein Gastgeber, der sich informiert glaubt, sind gefaehrlicher als gar keine Angabe. Das ist ein Sicherheitsdesign, kein Wording.
- Die Rechtsarchitektur fuer Art.-9-Daten fehlt, obwohl die Dokumentation vorbildlich ist: ausdrueckliche Einwilligung, Loeschrecht am Gast-Link, Nennung von Speicherort und Verantwortlichem auf der Gaesteseite, und Aufklaerung des Gastgebers darueber, dass er Gesundheitsdaten fremder Kinder sammelt. Dazu die Bau-Entscheidung: null externe Requests auf jeder Seite, die ein Art.-9-Feld traegt (US-Analyseskript, Google Fonts remote im Spiel).
- Der Gastgeber darf tragende Inhalte leer lassen. Wunschliste, Adresse und Ablaufplan existieren im Produkt, kamen bei Tino aber nicht an - und die Chat-Vorschau verspricht sie trotzdem. #16 formuliert die Regel: 'ein Feature, das die Eltern ueberspringen koennen, existiert fuer mich als Gast nicht.' Konsequenz auf Wizard-Ebene: kein teilbarer Link, bevor der Pflichtblock (Absender, Grobort, Kostuem/Essen/Abgeben) steht.
- Das Datenmodell kennt nur die Standardfamilie. Getrennte Haushalte (zwei Antworten auf einem Link, ohne sich zu ueberschreiben), Geschwisterkinder, abholende Grosseltern, Kinder mit Diagnose oder Schuechternheit, Foto-Einwilligung - all das sind Felder und Zustaende, keine Formulierungen. #13: 'Getrennte Eltern sind kein Sonderfall, wir sind ein Drittel der Klasse.'
- Der Pass teilt Rollen zu, statt sie anzubieten - im Indikativ, ohne Tauschmoeglichkeit, ohne Kuratierung durch den Gastgeber und ohne Ruecksicht darauf, welches Kind welche Rolle vertraegt. Rollenvergabe unter Siebenjaehrigen ist sozialer Sprengstoff; der staerkste Anker des Produkts ist zugleich sein groesstes unmoderiertes Risiko.
- Die Informationsarchitektur ist umgedreht: Pass und Spiel oben, Datum, Zeit und Ort erst nach zwei bis drei Wischern. Wer am Herd steht oder eine Lesebrille braucht, sucht zuerst 'wann und wo' - und die Beruhigungssaetze sind ausgerechnet die kleinste Schrift der Seite (#2).
- Der fertige Plan wird dem Gast vorenthalten, obwohl das Produkt ihn erzeugt und damit wirbt. Fuer #17 (ADHS) und #12 (schuechternes Kind) ist der Ablauf die Entscheidungsgrundlage: drei Stunden mit dem Wort 'Ritter' ist keine Information. Das ist eine Frage, welche Artefakte das Tool ueber die Gaesteseite ausspielt.
- Das Kinderspiel ist zugleich ein Handlungsraum mit Verbindlichkeit: ein grosser Knopf, der eine fertige Zusage per WhatsApp verschickt, liegt in der Hand eines Siebenjaehrigen (#17). Wer Verbindlichkeiten im Kinderteil zulaesst, braucht dort eine Erwachsenen-Huerde.

## Was schon gut ist - beim Umbauen nicht kaputtmachen

- Der Satz direkt am Allergiefeld: 'Freiwillig — das sieht nur die Gastgeber-Familie und wird spätestens 14 Tage nach der Party gelöscht.' Von allen 19 als Anker genannt, mehrfach als 'der beste Satz der ganzen Seite'. Er beantwortet drei Fragen an der Stelle, an der sie entstehen. Wortlaut und Position (am Feld, nicht im Kleingedruckten) nicht anfassen - hoechstens die Schriftgroesse erhoehen.
- Der personalisierte Pass mit eigener Rolle und Mission ('Deine Rolle: Katapult-Meister', 'Nur wer das Losungswort kennt, kommt an dir vorbei.') plus '🖨️ Pass drucken'. Der emotionale Motor des gesamten Produkts und der Grund, warum misstrauische Eltern weitergelesen haben. Beim Kuratierbar-Machen darf der Ueberraschungseffekt nicht verloren gehen.
- Kein Konto, kein Cookie-Banner, keine Registrierung, sofortiges Laden. Mehrfach als 'die halbe Miete' bezeichnet - #9 gibt die meisten Schul-Links im Treppenhaus auf, dieser ging beim ersten Versuch. Jede neue Huerde (Einwilligungs-Checkbox, Kontaktfeld) muss so gebaut werden, dass sie sich nicht wie eine Zustimmungswand anfuehlt.
- Das Formular verlangt vom Gast nichts: keine E-Mail, kein Passwort, kein Nachname, keine Zahlung. #1 (Security Engineer): 'Genau das ist das Gegenteil von Phishing.' Ein Pflichtfeld Handynummer muss deshalb an die Allergieangabe gekoppelt bleiben, nicht generell verlangt werden.
- Echtes Impressum mit einer echten Person und ladungsfaehiger Hamburger Anschrift, 'Kleinunternehmerin gemäß § 19 UStG'. Bei mehreren der dokumentierte Kipppunkt von 'verdaechtig' zu 'vermutlich echt' - '#5: Betrueger geben keine ladungsfaehige Privatadresse an.'
- Das offengelegte Geschaeftsmodell: 'Wir verdienen über Affiliate-Links zu Produkten die du eh kaufen würdest. Für dich ändert sich nichts am Preis.' Beantwortet die Haken-Frage, bevor sie gestellt wird. Fehlt heute nur an der richtigen Stelle - auf der Gaesteseite.
- Die Datenschutzerklaerung, die Art. 9 beim Namen nennt: 'Allergie-Angaben sind Gesundheitsdaten (Art. 9 DSGVO)'. Von einer Datenschutzbeauftragten und mehreren Fachfrauen ausdruecklich gelobt ('sauberer formuliert als die App unserer Kita', 'mehr als der Elternbrief unserer Kita'). Auch die freiwillige Selbstoffenlegung zu URL-Parametern in Logfiles wird als Ehrlichkeitsbeweis gelesen.
- Der Loeschsatz inklusive Geraetekopie: 'die Kopie auf diesem Gerät löscht sich beim nächsten Öffnen der Seite.' Mehrfach als 'fast ruehrend' und 'so genau erklaert mir das sonst keiner' notiert.
- Das Feld 'WER HOLT AB & WANN?'. Von der Erzieherin als Alleinstellungsmerkmal markiert: 'die Frage, die bei uns in der Kita jeden Tag die Tuer blockiert, und ich habe sie noch auf keiner einzigen Einladung gesehen'. Nur der Platzhalter 'z.B. Papa' trifft nicht jede Familie.
- Vollstaendige Termindaten mit Endzeit und ausgeschriebenem, korrektem Wochentag: 'Samstag, 12. September 2026', '15:00 Uhr — 18:00 Uhr', 'Noch 24 Tage!'. Die Erzieherin rechnet vor, dass auf selbstgemachten Karten gefuehlt jeder zweite Wochentag falsch ist; die Endzeit fehlt anderswo fast immer.
- Drei grosse Antwortknoepfe inklusive eigenem '🤔 Vielleicht' - mit Sossenhand und Oma-Daumen treffbar, und laut #12 von jemandem gebaut, 'der weiss, wie Elternabsprachen wirklich laufen'.
- Der Schutzgedanke hinter der Adresssperre wird anerkannt, auch von denen, die daran abbrechen: mehrere haben nachgesehen, dass die Adresse tatsaechlich nicht im Quelltext steht, und werten das als Beleg fuer echte Datenminimierung. Beim Umbau auf Grobort darf dieser Beleg nicht verlorengehen - die Strasse muss weiterhin serverseitig zurueckgehalten werden.
- Das Spiel selbst: altersgerecht, kein Verlieren, kurze Schritte mit sofortiger Rueckmeldung ('⚔️ Schwert entdeckt! Noch 2 Gegenstände!'), Stummschalter, ohne Werbung mittendrin. Zwei Bugs sind dabei zu reparieren, ohne die Machart anzutasten: #10 kam bei 2/3 nicht weiter (Drache nicht auffindbar), #8 tippte auf '▶ Jetzt spielen!', das wie ein Knopf aussieht, aber keiner ist.
- Der Erstell-Flow behandelt den Gastgeber fair: Newsletter-Haken NICHT vorangekreuzt (von drei Eltern eigens geprueft und gelobt), '⚠️ Edit-Link sichern (Pflicht)', und das Adressfeld erklaert seine eigene Sichtbarkeit. Diese Ehrlichkeit ist einer der Gruende fuer die drei klaren Ja-Stimmen.

## Weitergabe: was ueberzeugt

- Der Pass mit individueller Rolle und Mission ist der emotionale Motor und wird von nahezu allen als beste Idee genannt ('Deine Rolle: Katapult-Meister', 'Du trägst das Banner beim großen Einzug voran.'). #10 (Erzieherin): 'die beste Idee auf der Seite, mit Abstand'. #18 (neu zugezogen): 'Fuer ein Kind, das seit vier Wochen die Neue ist, ist das kein Deko-Gag, das ist alles.' Er ist auch der Grund, warum ueberhaupt weitergescrollt statt weggewischt wurde.
- Der echte Schmerz wird getroffen: Zusagen, Allergien und Abholzeiten an EINER Stelle statt in 40 WhatsApp-Nachrichten. #15: 'dafuer wuerde ich zahlen, und hier kostet es nichts'. Fast jedes Urteil erzaehlt dieselbe Vorgeschichte (Zusagen uebersehen, Laktoseintoleranz am Kuchentisch erfahren, drei Kinder ohne Abholinfo).
- Das Feld 'WER HOLT AB & WANN?' - von der Erzieherin (#10) als einzigartig hervorgehoben: 'ich habe sie noch auf keiner einzigen Einladung gesehen, die ich je bekommen habe'. Es ist der Beweis, dass hier jemand schon mal um 18 Uhr mit vier fremden Kindern im Flur stand.
- Der Erstell-Flow selbst nimmt Huerden weg: kein Konto, Schritt 1 will nur Vorname, Alter, Motto; der Newsletter-Haken ist NICHT vorangekreuzt (von 3 Eltern ausdruecklich positiv geprueft); '⚠️ Edit-Link sichern (Pflicht)' nimmt den Gastgeber ernst; das Adressfeld erklaert sich selbst.
- Echtes Impressum mit einer echten Person und ladungsfaehiger Anschrift plus offen benanntes Geschaeftsmodell ('Wir verdienen über Affiliate-Links zu Produkten die du eh kaufen würdest.'). Das beantwortet die Haken-Frage, bevor sie gestellt wird - fuer #16 und #15 der Kipppunkt.
- Konkrete Planzahlen, die sonst niemand liefert: 'Geschätzte Kosten ~47 €', Kosten pro Kind, Snack-Mengen, Zeitplan. #8: 'Kosten pro Kind ist genau die Zahl, nach der ich Steffi gefragt haette.' Das ist bei zwei der drei Ja-Stimmen der eigentliche Kaufgrund - nicht das Spiel.

## Weitergabe: was fehlt

- Ein Gastgeber-Block als Pflichtfeld, sichtbar VOR der Zusage ('Es laedt ein: Familie Kreft · Anna, 0176 …'). 18 von 19 nennen ihn als Bedingung; #4 nennt ihn 'den billigsten und groessten Hebel auf dieser Liste'. Verifiziert: den Datensatz gibt es heute schlicht nicht - kein hostName, kein hostPhone im Party-Record.
- Grobort vor der Zusage, Hausnummer danach ('Bei uns zuhause in Hamburg-Winterhude — genaue Straße nach deiner Zusage'). 18 von 19 nennen es; es loest die Abbruchstelle auf, ohne den Schutzgedanken aufzugeben, den dieselben Eltern ausdruecklich gutheissen.
- Die vier Standardfragen als Pflicht- oder Standardfelder: Kostuem ja/nein, Essen ja/nein, Eltern bleiben oder abgeben, Geschenk/Wunschliste. 16 von 19 nennen sie - es sind exakt die Rueckfragen, die die Familie zurueck in WhatsApp treiben und damit den Zweck des Produkts aufheben.
- Der eigentliche Wachstumsblocker ist reflexiv: 8 Eltern sagen woertlich, sie wollen ihren eigenen Gaesten nicht antun, was sie gerade erlebt haben. #7: 'Was mich beim Einladen bremst, ist nicht das Produkt, sondern das, was ich gerade als Gast erlebt habe.' #15: 'Wenn ICH das verschicke, bitte ich acht Familien, die MIR vertrauen, die Allergien ihrer Kinder auf einen Server zu tippen, von dem sie noch nie gehoert haben.' #1: 'ich bin dann derjenige, der acht Familien einen Link schickt, den ihre Vaeter genauso anschauen wie ich.' Der Gasteindruck IST der Vertrieb - und er erzeugt derzeit Reputationsrisiko statt Empfehlung.
- Werkzeuge, die dem Gastgeber die Verteidigung abnehmen: eine Vorschau 'So sieht's bei deinen Gaesten aus' vor dem Versenden (#5, #19 - 'ich verschicke nichts an fremde Eltern, was ich nicht vorher gesehen habe'), ein mitgelieferter WhatsApp-Text, der erklaert was der Link ist und den Vornamen fuers Namens-Tor enthaelt (#5, #11), und eine Zeile auf der Gaesteseite 'Diese Seite ist kostenlos. So verdienen wir Geld →' (#15), damit nicht der Gastgeber die Frage 'Ist das serioes?' beantworten muss (#11).
- Rueckmeldung an den Gast, dass die Zusage angekommen ist (6 nennen es). Ohne sie schreiben die Gaeste vorsichtshalber nochmal - '#19: dann habe ich zwei Kanaele statt keinem'.
- Werbung raus aus dem Sieg-Bildschirm des Kinderspiels (5). Unter der Einladung fuer Eltern akzeptieren sie sie ausdruecklich - im Spiel des eigenen Kindes nicht, und als Gastgeberin wollen sie sie abschaltbar (#16).
- Die Chat-Vorschau als erster Eindruck: 'Tino wird 7 — Ritter-Party am 12.9.' statt 'Du bist eingeladen! 🎉' (3), plus ein vorlesbarer Link statt Buchstabensalat (#5: 'ein Link, den man vorlesen kann, ist kein Betrugslink, das haette meine Angst halbiert').
- Wunschliste darf nicht ueberspringbar sein - #16 bringt die allgemeine Regel auf den Punkt: 'ein Feature, das die Eltern ueberspringen koennen, existiert fuer mich als Gast nicht'. Solange sie leer bleiben darf, muss die Gaesteseite es ehrlich sagen statt die Vorschau etwas versprechen zu lassen.
- Den Ablaufplan an die Gaeste durchreichen. Das Tool erzeugt ihn und bewirbt ihn ('14:00 Ankommen & Schatzkarte'), zeigt ihn aber nicht - fuer #17 (ADHS) und #12 (schuechternes Kind) ist der Ablauf die Entscheidungsgrundlage, nicht Beiwerk.
- Familienrealitaeten im Datenmodell: getrennte Haushalte, die beide antworten koennen, ohne sich zu ueberschreiben (#13: 'Getrennte Eltern sind kein Sonderfall, wir sind ein Drittel der Klasse'), Geschwisterkind-Feld (#7 - ihre einzige Frage, die die Seite nicht stellen kann), Foto-Einwilligung in beide Richtungen (#14: 'Das allein wuerde mich zum Nutzer machen').
- Rollen kuratierbar machen: der Gastgeber muss sie vor dem Versand ueberfliegen und tauschen koennen. #10: 'wenn eine Rolle nach Hauptperson klingt und eine nach Zuschauer, habe ich am Samstag um 15:05 ein weinendes Kind im Flur.' #12: ihrer schuechternen Tochter wurde im Indikativ zugeteilt, vorneweg zu laufen.

## Die eine Zahl

Kanalfreie Abschlussquote: Anteil der geoeffneten Gast-Links, bei denen die Familie ihre Antwort auf der Seite abgibt UND danach keine Frage mehr in WhatsApp stellen muss. Heutiger Stand in dieser Stichprobe: 7 von 19 antworten ueberhaupt auf der Seite (12 gehen sofort zurueck in den Chat) - und von diesen 7 sagen 6 ausdruecklich, dass sie zusaetzlich schreiben wuerden. Effektiv also rund 0 von 19. Die Zahl ist serverseitig zaehlbar (Link-Oeffnung -> abgesendete Antwort, ohne externes Skript auf der Art.-9-Seite) und die Nachfrage 'Musstest du danach noch etwas per WhatsApp klaeren?' passt in den Bestaetigungs-Screen. Alles andere - Scores, Spielstarts, Klicks auf 'Eigene Partyseite erstellen' - misst Deko; diese eine Zahl misst, ob das Produkt WhatsApp ersetzt oder verdoppelt, und sie steigt genau dann, wenn Absender, Grobort, die drei Standardfragen und die Empfangsquittung da sind.
