# Quelldaten-Befunde — was beim Regeln-Schreiben über `data/motto` auffiel

> Laufendes Protokoll. Jede Zeile ist ein Defekt IN DEN QUELLDATEN, der beim Durchgehen
> der Einkaufsposten sichtbar wurde — nicht in der Maschine, nicht auf den Seiten.
> Angelegt 17.08.2026, nachdem Bolle zu Recht fragte, ob ich die Befunde festhalte
> (sie standen vorher nur verstreut in Commit-Messages).
>
> Spalte „Status": ✅ = beim Regeln-Schreiben mitbehoben · ⏳ = offen, braucht eine
> eigene Entscheidung · 📋 = bewusst nur dokumentiert.

## A. Anleitungen, die eine gefährliche Handlung beschreiben

| # | Motto | Fundstelle | Befund | Status |
|---|---|---|---|---|
| A1 | ritter | `ritter-*.json` FAQ | Die Pappkrone wird **direkt am Kopf des Kindes zusammengetackert** — bei 3- bis 5-Jährigen, mit Klammerspitzen an Stirn und Schläfe. | ⏳ Regel am Posten dreht den Ablauf um (auf dem Tisch tackern), **die FAQ selbst ist unverändert** |
| A2 | einhorn | `einhorn-mittel.json` prepText + game-safetyRule | Drei widersprüchliche Aussagen zur 60-°C-Seife auf einer Seite: „30 Sek. Mikrowelle → flüssig", „Kinder dürfen reingießen", daneben die Altersstaffel „Für 6-Jährige machst du alles Heiße". | ✅ Regel ist jetzt die strengste Fassung · ⏳ Anleitungstext bleibt die lockere Gegenstimme |
| A3 | dino | `dino-gross.json` Ausgrabungs-Spiel | Kinder klopfen Gips-Blöcke **mit Hammer und Meißel** auf; kein Wort zu Splitterflug oder Schutzbrille im Spieltext. | ✅ Regel am Zubehör-Posten |
| A4 | baustelle | `baustelle-gross.json` | Material-Fühlbeutel: blind in **Metallschrauben, Ziegel- und Betonsplitter** greifen. | ✅ Regel verlangt entgratet/geschliffen |
| A5 | baustelle | `baustelle-gross.json` wow | **Stroboskop** im Deko-Posten — Anfallsrisiko bei photosensitiven Kindern, nirgends erwähnt. | ✅ Regel verlangt Elternabfrage |
| A6 | detektiv | `detektiv-mittel.json` Ritual | Die Detektiv-Marke wird **an einer Schnur um den Hals** getragen, während im Spuren-Parcours gerannt und gekrochen wird. | ✅ Regel: anstecken statt umhängen · ⏳ Ritualtext unverändert |

## B. Regeln, die es gab — aber am falschen Ort

| # | Motto | Befund | Status |
|---|---|---|---|
| B1 | feuerwehr | Fast alle Sicherheitsaussagen standen als `game.safetyRule` im **Spielablauf** („nie ins Gesicht spritzen", „Rasierschaum nicht in Augen/Mund", „Verband nie um den Hals") — der Einkaufende liest sie nie. | ✅ 16 Texte an die Posten gezogen |
| B2 | pferde | Die Spiele verbieten ausdrücklich das Rohessen der Futter-Karotten; der Einkaufsposten „Karotten-Sticks + Snacks" schwieg. | ✅ |
| B3 | meerjungfrau | Der Food-Text fordert seit jeher, Fruchtgummi für 3-Jährige klein zu schneiden; der Posten „Gummi-Fische" trug kein Wort. | ✅ |
| B4 | feen | Die Spielregel nennt **6 cm als Verschluckgrenze** für 3-Jährige; die gekauften Mini-Figuren-Sets liegen darunter, der Posten schwieg. | ✅ |

## C. Einkaufsposten, die zum falschen Produkt führen

| # | Motto | Befund | Status |
|---|---|---|---|
| C1 | pferde | Affiliate-Suchlink hinter „Hufeisen / Wurfringe" lautet **`hufeisen glücksbringer`** und liefert echte Metall-Hufeisen — die in diesem Spiel von 3- bis 5-Jährigen geworfen werden. | ✅ Regel verlangt Stoff/Schaum · ⏳ **Suchlink selbst ist unverändert** |
| C2 | prinzessin | „Zauberstäbe 6er" ohne Materialangabe; die Suche liefert harte Plastikstäbe, mit denen gerannt wird. | ✅ Regel · ⏳ Link/Label unverändert |
| C3 | ritter | „Mittelalter-Deko" / „Premium-Deko" verleiten zu echten Kerzen und Fackeln — neben Pappschilden, Strohballen, Kartondrachen. | ✅ Regel legt LED fest |
| C4 | piraten | „Spielzeug-Kompass": billige Gehäuse springen auf und legen die Magnetnadel frei (verschluckte Magnete = chirurgischer Notfall). | ✅ |
| C5 | ritter | „Plüsch-Drache" mit ausdrücklicher Second-Hand-Empfehlung — gebrauchte Plüschtiere haben lose Knopfaugen. | ✅ Regel verlangt Zugprobe |

## D. Struktur- und Konsistenzprobleme

| # | Befund | Größe | Status |
|---|---|---|---|
| D1 | **Kein Feld verbindet Spiel und Material.** `games[].material` ist Freitext, `shoppingList[]` eine handgepflegte Parallel-Liste. Messung 17.08.: nur **36 %** der Material-Nennungen sind in der Einkaufsliste derselben Variante wiederzufinden (dino 18 %, einhorn 20 %, ritter 50 %). | 3791 Nennungen | ⏳ **Ticket K7** in BACKLOG-AUDIT |
| D2 | Drei Parallel-Kataloge (`data/motto`, `_src/elite-motto-data`, eingefrorene Seiten) — Grund für die Existenz der Brückendatei. | 45 Dateien | ⏳ **Ticket K6** |
| D3 | Der Generator liest `price`, die Daten führen `priceEur` — das Preis-Fragment war seit jeher tot, seine Interpolation zusätzlich kaputt. | 3 Seiten | 📋 Reparieren hieße Einzelpreise auf Live-Seiten drucken = Produktentscheidung |
| D4 | Freie Seiten und Katalog benennen dieselbe Ware verschieden (Lupen 8 Stk. ↔ 3 Stk., Saftpäckchen ↔ Capri-Sun, Mähnen-**Stilling** ↔ Styling). | 60+ Anker nötig | ⏳ verschwindet mit K6 |
| D5 | 15 Mottos, aber nur **57 Warenkerne** kommen in mehr als einem Motto vor — ein globales Waren-Register würde wenig sparen (gemessen 17.08.). | — | 📋 gegen Umbau entschieden |

## F. Altersgrenzen, die eigene Leser ausschliessen (gemessen 17.08.)

Suchlauf ueber alle 632 gedruckten Regeln nach Altersgrenzen ("ab X", "unter X",
"nichts fuer unter X"), die im Altersfenster der eigenen Seite liegen: **10 Treffer,
davon 9 korrekt und 1 defekt.** Deshalb ist daraus bewusst **keine Linter-Stufe**
geworden — ein Gate mit 90 % Fehlalarm erzieht dazu, Gates wegzuklicken.

Die 9 korrekten sind *abgestufte* Formulierungen: Sie schliessen niemanden aus,
sondern verteilen die Rollen innerhalb der Gruppe. einhorn-mittel Glycerin-Seife
("du haeltst den Becher; erst ab 8 giessen sie unter Aufsicht selbst") laesst den
Sechsjaehrigen Farbe und Glitzer aussuchen und gemeinsam giessen. dino-klein
("Popcorn erst ab etwa vier") und meerjungfrau-klein ("Perlen ab etwa 4") schuetzen
die Juengsten der eigenen Gruppe — genau ihr Zweck.

| # | Motto | Befund | Status |
|---|---|---|---|
| F1 | dschungel | `dschungel-gross.json` wow, "Gips-Pulver + Joghurt-Becher + Schutzbrillen/Masken": Die Regel endet mit "immer mit einem Erwachsenen am Tisch und **erst ab 10 Jahren**". Die Grenze haengt nicht an einem Teilschritt, sondern an der ganzen Station — auf einer Seite fuer **9- bis 12-Jaehrige**. Wer fuer einen Neunjaehrigen plant, kauft Material fuer ~12 €, das die eigene Regel ihm verbietet, und bekommt keine Alternative genannt. | ⏳ offen, Fix nach Gate B |

**Warum nicht sofort gefixt:** Waehrend eine unabhaengige Begutachtung auf einem
eingefrorenen Commit laeuft, wird der begutachtete Bestand nicht angefasst (Helfer V5 R2)
— sonst prueft der Gutachter einen Wortlaut, den es beim Lesen seines Befunds nicht mehr
gibt. F1 geht in die Fix-Runde nach Gate B, zusammen mit dessen Findings, und dann durch
den Diff-Re-Check.

## G. Die zweite, handgeschriebene Sicherheitsschicht (gemessen 17.08.)

Neben der maschinell gedruckten Regel tragen die freien Seiten eine **zweite
Sicherheitsschicht im Fliesstext** — Eltern-Tipps, Rezeptschritte, Timeline-Zeilen.
Messung: **133 Sicherheitsaussagen auf 30 von 45 Seiten**, komplett ausserhalb der
Maschine und damit ausserhalb jedes Gates. Das ist Helfer V5 R3 ("Wahrheit hat einen
Ort") im Grossen: zwei Schichten ueber dieselbe Gefahr, die getrennt gepflegt werden
und auseinanderdriften, ohne dass es auffaellt.

| # | Befund | Groesse | Status |
|---|---|---|---|
| G1 | **Fuenf verschiedene Kleinteil-Untergrenzen fuer dieselbe Gefahr.** `prinzessin-3-5` "ab 2 cm Durchmesser fuer Sicherheit", `dschungel-3-5` + `piraten-3-5` "mindestens 3 cm", `feen-3-5` **3 cm UND 4 cm UND 5 cm auf einer Seite**, `baustelle-3-5` "mindestens 15 cm" (Bauklotz, unkritisch). Die Maschine sagt an derselben Ware "nichts, was durch eine Klopapierrolle passt". **Primaerverifiziert 17.08. (16 CFR 1501.4 / CPSC): Der Kleinteile-Pruefzylinder hat 31,7 mm Innendurchmesser bei 25,4–57,1 mm Tiefe** und bildet den Rachen eines Kindes unter drei ab. "Mindestens 3 cm" liegt DARUNTER — die Zahl erlaubt genau das, wovor sie warnt. Alle Treffer stehen auf **3–5-Seiten**, der gefaehrdetsten Gruppe. | 5 belegbar unsichere Stellen auf 4 Seiten | ⏳ **Stufe 46 gebaut + gegengeprobt**, Fix + Verdrahtung nach Gate B |
| G2 | Zahlen **ab** 4 cm sind nicht falsch, aber schwaecher als der Zylindertest: Eine einzelne Laengenangabe kann "passt in keiner Lage vollstaendig hinein" gar nicht ausdruecken (der Zylinder ist bis 57,1 mm tief — ein duenner 5-cm-Stab passt laengs hinein). Der Klopapierrollen-Satz der Maschine ist der einzige, der den Test korrekt als Test formuliert. | 6 Stellen | 📋 Arbeitsliste: durch den Maschinen-Satz ersetzen |
| G3 | `feen-9-12` und `feuerwehr-9-12` fuehren im Rezept einen eigenen Block "Wunderkerzen-Sicherheit: Abstand zu Vorhaengen/Papier, Stabfeuerzeug, nach Erloeschen in Wasser abloeschen" — inhaltlich gut, aber handgepflegt neben der Maschinen-Regel derselben Seite. Zwei Wortlaute, eine Gefahr. | 2 Seiten | 📋 in die Maschine ziehen oder bewusst als Ergaenzung markieren |
| G4 | 51 WARN aus Stufe 42 (Snack-/Mitgebsel-Karten) aufgeschluesselt: **~34 echte Lebensmittel-Faelle** (10x Schoko-Muenzen/Allergie, 6x Trauben, 5x Popcorn, 6x Obst-/Erdbeer-Spiesse inkl. Holzspiess, 4x Wunderkerze auf dem Kuchen, 3x Mini-Sushi), **~14 Mitgebsel-Beutel** mit Kleinteilen, **4 echte Fehlalarme** (Checklisten-Schritte wie "Einladungen rausschicken", "Deko aufhaengen" — keine Ware). Die Wunderkerzen-Faelle sind entwarnt: die Einkaufsliste derselben Seite traegt die Regel, `safari-3-5` sogar altersangepasst ("lass die Wunderkerze am besten ganz weg"). | 51 -> 34 echt | 📋 Bolle-Entscheidung: Regel je Karte, Sammelblock oder lassen |

| G5 | **Eine CSS-Klasse, zwei Bedeutungen.** `mitgebsel-item` traegt auf den freien Seiten nicht nur Mitgebsel, sondern auch die **Vorbereitungs-Checkliste** ("4 Wochen vorher", "1 Tag vorher", …). Gemessen: **82 von 385** `mitgebsel-item`-Bloecken sind Handlungsschritte, keine Ware (21 %). Deshalb meldete Stufe 42 Zeilen wie "Einladungen rausschicken. Pflicht im Text: Allergie-Abfrage." als "riskante Ware ohne Regel" — der Detektor ist korrekt, das Markup ist ueberladen. Nur 4 der 82 fielen auf, weil nur die vier Risiko-Vokabular enthielten; die Fehlalarm-Quelle ist also groesser als ihr sichtbarer Teil. | 82 Bloecke | 📋 eigene Klasse fuer die Checkliste, dann faellt der Fehlalarm strukturell weg |

**Warum Stufe 46 noch nicht im Linter haengt:** Sie waere ab der ersten Sekunde rot,
und der Fix ist eine inhaltliche Aenderung an den freien Seiten. Waehrend Gate B auf
einem eingefrorenen Commit laeuft, wird nichts am begutachteten Bestand geaendert
(Helfer V5 R2). Verdrahtung und Fix kommen zusammen in der Runde nach Gate B — dann
ist die Stufe von der ersten Sekunde an gruen und gatet ab da echt.

## H. Was Gate B gefunden hat — und was daraus mechanisiert wurde (17.08.)

Gutachten: `_dev/review/2026-08-17-gate-b-gutachten.md` (Opus 5 Max, target-blind,
Score 72/100). Alle Findings gegen die Quelle nachgeprueft; der Gutachter irrte in
beide Richtungen.

| # | Befund | Pruefung | Mechanisiert als |
|---|---|---|---|
| H1 | **Dieselbe Ware, gegenteiliges Urteil.** Walkie-Talkies, LED-Deko, UV-Lampe, Fernrohre, Bandanas, Gummibaerchen: an einer Stelle gedruckte Regel, an anderer als harmlos abgehakt — teils in derselben Altersgruppe. | Alle sechs in den Daten bestaetigt. Volle Messung: **119 Faelle ueber 30 Warenkerne** (von 36 mehrfach verwendeten). | **Stufe 48** `check-ware-urteil.py` — Warenkern mechanisch aus dem Label, kein Vokabular (L17). Reifung nach oben erlaubt, nach unten nie. Gegenprobe: Widerspruch behoben → 119→118, zurueck → 119. |
| H2 | **Begruendungen berufen sich auf Unsichtbares.** „die Spielregel ist bereits gedruckt", „Allergie-Abfrage im Paket verankert". | Selbst gefunden vor Eintreffen des Gutachtens, dann von dessen Findings 3.2–3.6 einzeln bestaetigt. Stichprobe: `parentTips`/`cakeRecipe`/`faq` stehen auf den freien Seiten (4–8 von 8 Textstuecken wiedergefunden), die Spiel-`safetyRule` **0 von 8**. | **Stufe 47** `check-harmlos-verweis.py` — **72 von 787** Begruendungen betroffen. Gegenprobe abgelegt. |
| H3 | **Schutzbrille gefordert, nicht verkauft** (einhorn-9-12). | Halb bestaetigt und dadurch wertvoller: Im **Katalog** steht sie im Buendel-Posten, deshalb ist Stufe 41 gruen. Auf der **freien Seite** nennt die Material-Zeile keine Brille; „Schutzbrille" kommt dort nur in den drei Hinweisen vor. | ⏳ **Stufe 41 hat ein Loch: sie misst den Katalog statt die Seite.** Das ist Lektion L17 in einer neuen Stufe. Umbau ansteht. |
| H4 | **54 Erstickungs-Warnungen, kein Wort zur Ersten Hilfe.** | Nachgezaehlt und schaerfer: **110×** „Erstick*", **53×** „verschluck*" — **0×** Heimlich, Rueckenschlaege, Erste Hilfe. „112" steht 6× und nur in der Knopfzellen-Kette. Fuer Augenspritzer existiert eine mustergueltige Kette. | ⏳ Produktentscheidung Bolle: ein Notfall-Kasten je Seite statt Wiederholung je Zeile |
| H5 | **Zwei-Stunden-Drohung ohne Notfallkette** auf 13 Seiten (27 Knopfzellen-Regeln, nur 10 mit 112/kein Erbrechen/Honig). | Bestaetigt. Betrifft ausgerechnet die Schlafparty-Seiten mit Stirnlampen. | ⏳ Fix: ein Satz anhaengen — loest H4 fuer die Knopfzellen mit |
| H6 | **`pferde-6-8` traegt 0 gedruckte Regeln** (24 Posten, alle harmlos). | Unabhaengig selbst gefunden. `pferde-mittel.json`: 0 `safetyNote`, 24 `safetyChecked`. Die Wolle-Regel von `pferde-3-5` („um Hals gewickelt schnuert sie ab") schrumpft in der 6–8-Fassung auf den Drahtkern — das kleinere Risiko bleibt, das groessere faellt weg. | Faellt unter Stufe 47 + 48 |
| H7 | **„Die haeufigste Erstickungsursache" mehrfach vergeben.** | Nachgezaehlt: 4× Absolut-Superlativ in 3 Dateien, daneben 15× die belegbare Pluralform. | Fix: einheitlich „gehoeren zu den haeufigsten" |
| H8 | Mirror Glaze 30–32 °C (Fachlage 32–35), „Popcorn ab vier" (Fachlage 4–5), Ballon-Statistik dem Packungshinweis zugeschrieben, Gips „60 °C" unbelegt. | Plausibel; die Richtung ist jeweils konservativ. | Fix-Kandidaten MINOR, Gips bleibt UNSICHER |
| H9 | **„573 + 787 = 1360, nicht 1419."** | **Mein Pruefauftrag war irrefuehrend, nicht die Daten.** 632 `safetyNote` + 787 `safetyChecked` = 1419, geht auf. Die 573 sind die auf freien Seiten **gedruckten** Regeln; 59 gehoeren zu Katalogposten, die keine freie Seite verkauft. Auch „45 Seiten" war falsch: 44, weil pferde-6-8 null traegt. | Lehre: Zahlen im Pruefauftrag gegenzaehlen, bevor er rausgeht — sonst verbrennt der Gutachter Zeit an einem Scheinwiderspruch. |

## I. Ware empfohlen, aber nicht verkauft (gemessen 17.08.)

| # | Befund | Groesse | Status |
|---|---|---|---|
| I1 | **`piraten-9-12` empfiehlt Funkgeraete, ohne sie zu verkaufen.** Im Spar-Tipp steht „Kompasse, Walkie-Talkies und Laternen sind oft schon im Haus" — ein Einkaufsposten existiert nicht. Damit findet die Batteriefach-Regel (Schraube pruefen, Klickdeckel abkleben, Ersatzzellen wegschliessen) keinen Posten, an dem sie stehen koennte, obwohl der Leser die Geraete am Partytag benutzt. Aufgefallen ist es NICHT beim Schreiben, sondern weil der Beleg-Check meine eigene `keinPosten`-Begruendung widerlegt hat („0 Treffer fuer Walkie" war falsch — es ist genau ein Treffer). | 3 Stellen auf 2 Seiten (`detektiv-3-5` Taschenlampe, `piraten-9-12` Walkie 2x) | ⏳ offen — zu klein fuer ein Gate, zu echt zum Ignorieren |

**Warum kein Gate:** Die Klasse „Seite empfiehlt riskante Ware aus dem Haushalt, ohne sie
zu verkaufen" hat drei Treffer im ganzen Bestand. Ein Gate mit drei Faellen erzieht
niemanden; die drei gehoeren stattdessen in die naechste inhaltliche Runde. Der Fall zeigt
aber etwas Allgemeines: Ein `keinPosten`-Eintrag ist eine BEHAUPTUNG ueber die Seite, und
die muss maschinell geprueft werden, bevor sie in die Datei geht — sonst schliesst man
eine Luecke mit einer Unwahrheit.

## J. Stufe 48 war blind — und meine erste Zahl war eine Untererfassung (17.08.)

**Befund:** Die Gegenprobe fuer Stufe 48 ist durchgefallen. Ich habe den
Gruendungsfall des Gates kuenstlich wiederhergestellt (safari-9-12
Walkie-Talkies von Regel auf harmlos gesetzt) — und das Gate meldete weiter
**0 FAIL**.

**Ursache:** Der Filter verlangte, dass der Regeltext das Warenwort WIEDERHOLT
(`"walkie" in text`). Nach den beiden Schwarm-Runden sprechen die neu
geschriebenen Regeln aber von „Geraeten", „Funkgeraet" und „Batteriefaechern" —
gutes Deutsch, kein einziges „Walkie". Ein Filter, der gute Formulierungen
bestraft, ist der falsche Filter. Er hat das Gate genau in dem Moment blind
gemacht, in dem die Texte besser wurden.

**Die unangenehme Folgerung:** Derselbe Filter lief von Anfang an. Meine erste
Messung „119 Widersprueche ueber 30 Warenkerne" war damit selbst schon eine
Untererfassung — sie zaehlte nur die Faelle, in denen die Regel ihr Warenwort
zufaellig wiederholte. Mit dem tragfaehigen Filter (Gewicht: ein Posten belegt nur
den Kern, der ihn dominiert) stehen nach **221 abgearbeiteten Entscheidungen**
weiterhin **125 FAIL ueber 30 Warenkerne**. Die Klasse ist also groesser als
gedacht, nicht kleiner.

| # | Stand | Groesse |
|---|---|---|
| J1 | Stufe 48 sensitiv gemacht, Gegenprobe besteht | — |
| J2 | **Erledigt.** Von 125 auf 0 — und das OHNE das geplante `wareKern`-Feld | s. u. |
| J3 | Stufe 48 seit 17.08. **verdrahtet und blockierend** | — |

**Wie aus 125 eine 0 wurde — und warum K8 dabei ueberfluessig wurde:**
Die 125 waren zu drei Vierteln gar keine Widersprueche, sondern eine kaputte
Kern-Erkennung. Die Top-Kerne hiessen `apfelschorle` (32), `tonpapier` (23),
`papiertüten` (19), `braun`, `schwarz`, `snacks` — Farben, Bastelmaterial,
Kategoriewoerter. Dieselbe Einsicht wie zuvor bei „Becher", nur systematisch
angewandt: **Behaelter, Farben, Traegermaterial, Kategorien und Adjektive sind
keine Waren.** Mit sauberer Stoppliste blieben 33 uebrig, davon fuenf echt:

* `dschungel-6-8` Tarn-Tuecher galten als harmlos, waehrend `safari-6-8` fuer
  dieselbe Ware und dasselbe Alter druckt „nie um den Hals geknotet — beim
  Pirschen wird aus dem Knoten eine Schlinge". Der wichtigste Einzelfang.
* `detektiv-9-12` Mini-Lupen harmlos gegen die Sonnen-Brennpunkt-Regel bei dino.
* `dschungel-6-8` Filzstifte harmlos gegen die Pruefzeichen-Regel bei safari.
* Zwei Blechkuchen-Backmischungen ohne Allergie-Regel.

Der Rest sind Buendel-Faelle: Die regeltragende Zeile heisst „Bauarbeiter-Kuchen
+ Pizza + Buffet", und ihre Regel handelt vom Stockbrot am offenen Feuer. Die
stehen als fuenf belegte Ausnahmen im Skript — mit Schluessel
(Warenkern, Motto-Datei, Label-Anfang), und **eine Ausnahme, die nicht mehr
greift, FAILt selbst**, damit die Liste nicht zur Muellhalde wird.

**K8 bleibt im Backlog, aber entschaerft.** Das `wareKern`-Feld waere weiterhin
sauberer als jede Wortliste — noetig ist es nicht mehr.

**Was das Problem wirklich loest, ist kein besserer Filter, sondern ein Feld.**
Beide Filtervarianten scheitern an derselben Frage: „Handelt diese Regel von
dieser Ware?" — mechanisch aus Prosa nicht sicher beantwortbar. Die Antwort
gehoert in die Daten: ein `wareKern` je Einkaufsposten (`"walkie-talkie"`,
`"knopfzelle"`, `"trinkbecher"`). Dann vergleicht die Stufe Identitaeten statt
Wortfelder, Buendel-Posten tragen mehrere Kerne explizit, und die ganze
Ausnahmeliste entfaellt. Das ist Helfer V5 R4 in Reinform: **Wahrheit hat einen
Ort, und Warenidentitaet ist eine Wahrheit.** → Ticket K8.

## K. Sechs Seiten haben gar keine Einkaufsliste (gemessen 17.08., blockiert Gate A fuer 2 Mottos)

Beim Bau der Gate-A-Pakete fiel eine Luecke auf, die je Motto zaehlt und deshalb
in keiner Gesamtzahl sichtbar war:

| Motto | Katalog-Regeln | auf den Seiten gedruckt |
|---|---|---|
| ritter | 54 | 54 |
| einhorn | 69 | 81 |
| **prinzessin** | **52** | **6** |
| **superheld** | **41** | **9** |

**Ursache:** `prinzessin-3-5/6-8/9-12` und `superheld-3-5/6-8/9-12` haben **keine
maschinenlesbare Einkaufsliste** — keine Ueberschrift „Einkaufsliste", kein
`ul.list-plain`, keine `shopping-table`, nichts. Sie verkaufen ihr Material in
Deko-, Snack- und Mitgebsel-**Karten**. Der Renderer kann nur in die Deko-Karten
schreiben, deshalb landen dort 15 von 93 Regeln.

**Messung der 6 Seiten:** 103 Karten, davon **23 risikoverdaechtig**. Aufgeteilt:

* **11 Karten haetten schon heute eine Regel im Katalog**, die nur nicht gedruckt
  wird — Folienballons (3x), Plastik-Diademe mit Holzrundstaeben, UV-Stifte (2x),
  Augenmasken mit Gummiband, Schwarzlicht-Taschenlampe, Sticker-Sets (3x).
  Darunter die Knopfzellen- und Augen-Klasse: `superheld-9-12` verkauft eine
  Schwarzlicht-Lampe, `prinzessin-9-12` UV-Stifte.
* **12 Karten haben gar keine Regel** — Erdbeer-Spiesse (3x, Holzspiess + runde
  Beere bei 3-5), Popcorn, Goldsticker, Edelsteine „100 St. gemischt",
  Geschirrtuch-Umhaenge mit Klettband, Pluesch-Rose.

**Warum ich hier nicht allein weitermache:** Die Loesung fuer die ersten 11 ist,
den Renderer auch in Snack- und Mitgebsel-Karten schreiben zu lassen — das ist
woertlich Bolles offene Produktfrage „Regel je Karte, Sammelblock oder lassen"
(Befund G4, 51 WARN). Es aendert das Aussehen von 6 oeffentlichen Seiten. Die
Alternative waere, diesen sechs Seiten eine richtige Einkaufsliste zu geben —
groesserer Eingriff, aber loest auch D4 und einen Teil von K6.

**Gate A laeuft fuer die uebrigen 13 Mottos ohne diese Entscheidung.**

## L. Die Regeln wurden am Einkaufsposten geschrieben, nicht an den Spieldaten (Gate A ritter, 17.08.)

Gutachten: `_dev/review/2026-08-17-gate-a-ritter-gutachten.md` (Opus 5 Max, Inkognito,
Score **54/100**). Der Kernsatz des Gutachters:

> „Die Regeln wurden an den Einkaufsposten geschrieben, nicht an den Spieldaten. Deshalb
> behaupten mehrere Regeln eine Verwendung, die im Spiel nicht vorkommt — und erlauben teils,
> was die Spieldaten ausdrücklich verbieten."

Das ist die gefaehrliche Richtung: nicht eine fehlende Regel, sondern eine gedruckte Regel, die
**lockerer** ist als das eigene Konzept. Vier davon selbst gegen die Quelle geprueft, alle vier
bestaetigt:

| # | Befund | Beleg |
|---|---|---|
| L1 | **Die Schwert-Regel autorisiert Kind-gegen-Kind.** Gedruckt bei 9–12 (alle 3 Varianten): „im Zweikampf gilt nur Koerper und Schild"; bei 3–5 (alle 3): „Geschlagen wird ausschliesslich aufs Schild … Immer nur zwei Kinder gleichzeitig". | Das Konzept verbietet es vielfach: `KEIN Sparring zwischen Kindern`, `Niemals auf Kind` (3x), `nie Kind gegen Kind` (2x), `Niemand schlaegt auf Kinder` (2x), `trifft nur Polster` (6x), `nur am Strohballen` (9x). |
| L2 | **Keine der vier gedruckten Bogen-Regeln enthaelt „nie auf Personen".** Zwei erlauben zwei gleichzeitige Schuetzen. | Spieldaten: `Bogen NIE auf Personen richten — nur zur Zielscheibe`, `Immer nur EIN Kind schiesst`. Hoechster Schadenserwartungswert des Mottos. |
| L3 | **Strohballen-Begruendung behauptet „keine Zuendquelle im Konzept"** — in allen drei 6–8-Varianten, die alle Stockbrot servieren, wow ausdruecklich „vom Lagerfeuer". | Drei trockene Ballen, Pappdrache, Stoffbanner. |
| L4 | **Ei fehlt in allen neun Kuchen-Regeln**, die „gleich drei versteckte Allergene" abschliessend aufzaehlen. | Rezepte: 4 / 3 / 5 Eier. Huehnerei ist eines der haeufigsten Kinder-Allergene. |

**Groesse der Klasse:** Grobmessung ueber alle 15 Mottos — **209 von 567 Spielregeln (37 %)**
haben keine erkennbare Entsprechung in den gedruckten Regeln derselben Variante. piraten 25,
safari 23, dschungel 21, dino 20, weltraum 20, prinzessin 15, superheld 15, einhorn 14,
pferde 12, detektiv 10, feen 10, ritter 9, baustelle 7, meerjungfrau 7, feuerwehr 1. Das Mass
ueberschaetzt die Deckung eher; viele der 209 sind harmlos („Sitz-Spiel, keine Sicherheit
noetig"). Die gefaehrliche Teilmenge ist die andere Richtung.

**Beziffert (Stufe 49, `check-spielregel-ankunft.py`):** Von **493 Verbots-Saetzen** in den
Spielregeln erreichen **163 den Leser nicht** — gemessen am PRODUKT, also an allem, was auf der
freien Seite steht: gedruckte Einkaufs-Regel ODER Spieltext der Seite. Verteilung: einhorn 29,
prinzessin 25, superheld 20, dino 16, pferde 13, safari 13, ritter 12, feuerwehr 11, detektiv 6,
piraten 6, weltraum 5, baustelle 3, dschungel 3, meerjungfrau 1.

Beispiele aus der Liste: „Nur kurze Tuecher, NIE um den Hals (Strangulationsgefahr)"
(dino 3–5), „BUEGELEISEN nur als NOTFALL-Option (>150 Grad = hohes Verbrennungsrisiko bei
Kindern)" (detektiv 6–8 wow), „Auf glattem Boden barfuss oder Schuhe mit Grip (keine Socken —
Rutschgefahr)" (mehrere Parcours-Spiele), „Natron-Essig-Variante (KEIN Wasserstoffperoxid/
Trockeneis)" (dino Vulkan).

**Erste Messung war doppelt so hoch und falsch.** Der Entwurf sah nur die `safetyNote`s und
meldete 400 von 493. Die Gegenprobe an sechs Stichproben widerlegte das: „KEIN Sparring" steht
1x und „trifft nur Polster" 3x auf der ritter-Seite — im handgeschriebenen Spieltext, den kein
Generator kennt (`safetyRule` kommt in **keinem** der beiden Renderer vor). Damit wird der
ritter-Befund schaerfer statt milder: Die Seite sagt an einer Stelle „Schwert trifft nur
Polster" und an anderer „Geschlagen wird ausschliesslich aufs Schild … Immer nur zwei Kinder
gleichzeitig". Das ist kein Loch, das ist ein **Widerspruch auf derselben Seite**.

**Was das loest, ist wieder eine Maschine, keine Handarbeit:** Der Renderer druckt heute
`safetyNote` an den Einkaufsposten. Er muesste zusaetzlich `safetyRule` am Spiel drucken — dann
kann die Seite ihrem eigenen Konzept nicht mehr widersprechen. Das aendert das Aussehen aller
45 Seiten und gehoert deshalb in dieselbe Entscheidung wie Befund K.

**Konsequenz: Die uebrigen zwoelf Gate-A-Reviews warten.** Sie wuerden dieselbe Klasse
zwoelfmal finden, und jeder Fix danach macht ihre Befunde stale. Erst die Klasse schliessen,
dann fortsetzen — dieselbe Reihenfolge, die bei Gate B funktioniert hat.

**Bemerkenswert:** Das Ticket K7 („Spiel → Material verbinden", seit 17.08. im Backlog) sagt
genau diese Luecke voraus. Der Gutachter hat sie unabhaengig gefunden und beziffert, was das
im Ergebnis kostet: 54 von 100.

## M. Die ritter-Klassen ueber alle 15 Mottos gezogen (17.08.) — sie haben sich NICHT verbreitet

Statt zwoelf weitere Reviews zu kaufen, wurden die Fehlerarten aus dem ritter-Gutachten
maschinell ueber alle Mottos gesucht. Das Ergebnis ist die beruhigende Haelfte des Tages:
**ritter war in diesen Punkten schlechter als der Rest, nicht repraesentativ.**

| Klasse | gesucht | echt gefunden |
|---|---|---|
| Begruendung behauptet Abwesenheit einer vorhandenen Gefahr ("keine Zuendquelle im Konzept") | alle 45 Varianten | **0 ausserhalb ritter** |
| Begruendung stuetzt sich auf eine unpruefbare Annahme | alle 45 Varianten | **2** (`baustelle-gross` minimal + standard: „Party laeuft ohne kleine Geschwister (Eltern setzen ab)") |
| Absolutaussagen, die die Regel entwerten ("kann nicht verletzen") | alle 45 Seiten | **0** — die 6 Treffer waren Spielinhalte ("gefaehrlich · gefaehrdet · ungefaehrlich" als Tier-Quiz bei safari) |
| Redaktionsnotiz oder Querverweis im Kundentext | alle 45 Seiten | **1** (`feen-6-8`: „siehe oben im Standard-Tab" — wer die Wow-Spalte liest, sieht den Standard-Tab nicht, auf dem Handy ist er ein eigener Bildschirm) |

Alle drei behoben, in allen drei Katalogen, `_bundle.js` neu erzeugt.

**Was das fuer Gate A heisst:** Die zwoelf ausstehenden Reviews werden vermutlich NICHT
zwoelfmal dieselben MAJORs finden. Der eine Befund, der sich sicher wiederholt, ist L
(Spielregel-Verbote erreichen den Leser nicht, 157 Faelle) — und der haengt an der offenen
Layout-Entscheidung, nicht an den Texten.

**Beifang:** Der Linter hat meinen eigenen Ersatztext gefangen — ich hatte „grossflaechige"
und „Kopfhoehe" geschrieben, Stufe 24 verlangt echte Umlaute in gedrucktem Text. Genau der
Fehler, den der Gutachter unter Winkel 9 an anderer Stelle gemeldet hat.

## N. Die Entscheidung zu K und L, durchgerechnet (18.08.)

Ich hatte dreimal geschrieben, ein „Ja" zum Drucken der `safetyRule` am Spiel loese K und L
**zusammen**. Das stimmt so nicht — hier die Messung statt der Vermutung. Muster gebaut,
auf alle 45 Seiten angewandt, **nichts am Repo-Bestand geaendert** (Scratchpad).

**Der Anker ist sauber:** Alle Seiten benutzen `<div class="game-detail">` mit einer
h3/h4-Ueberschrift. Optisch traegt das gut — auf `dino-3-5` sitzen 11 von 11 Regeln unter
ihrer Spielkarte, 654 px breit, kein Ueberlauf, im Browser geprueft.

**Aber die Reichweite ist begrenzt:**

| | |
|---|---|
| Spielkarten auf allen 45 Seiten | **225** |
| davon konnten ihre Regel aufnehmen | **130** |
| Spielregeln in den Daten | **567** |
| Verbote, die den Leser heute nicht erreichen (Stufe 49) | **157** |

Die 45 Seiten tragen also fuer 567 Spielregeln nur 225 Karten. Der Rest der Spiele steht im
Zeitplan oder im Fliesstext, nicht als Karte. **Rechnerisch deckt der Ansatz hoechstens
etwa 130 Regeln ab, nicht 567 — und die 95 nicht zugeordneten Karten haengen an
Namensabweichungen** (Seite: „1. Schloss-Ball-Choreo", Daten: „Kroenungs-Parcours
(Zepter-Balance)"), also am selben Brueckenproblem wie bei den Einkaufsposten (D4/K6).

**Fuer prinzessin und superheld loest es K NICHT.** Ihre Seiten haben zwar
`game-detail`-Karten, aber keine, deren Ueberschrift zu einem Spielnamen passt — und ihr
Kernproblem ist eine fehlende Einkaufsliste, nicht eine fehlende Spielregel.

**Ehrliche Optionen, mit Aufwand:**

1. **Spielregel an der Karte** — deckt ~130 Regeln, braucht eine Namensbruecke wie
   `freie-seiten-regeln.json`. Aendert das Aussehen aller 45 Seiten. Loest L teilweise,
   K gar nicht.
2. **Verbote in die Einkaufsregeln** — deckt alle 157, kein Layout-Eingriff, aber 157
   handgeschriebene Ergaenzungen ueber 14 Mottos. Loest L ganz, K nicht.
3. **Sechs Seiten bekommen eine Einkaufsliste** (prinzessin, superheld) — loest K, und
   loest zugleich einen Teil von D4 und K6.

Keine der drei schliesst die anderen aus; 2 und 3 zusammen loesen beides ohne neue Rubrik.

## O. Was die 157 wirklich sind — und warum meine angekuendigte Loesung nicht passte (18.08.)

Ich hatte angekuendigt, ohne weitere Entscheidung mit „Option 2" anzufangen: die 157 nicht
angekommenen Spielregel-Verbote einzeln in die Einkaufsregeln schreiben. Beim ersten Versuch
stellte sich heraus, dass das fuer den allergroessten Teil gar nicht geht. Die Aufteilung:

| Gruppe | Anzahl | Bedeutung |
|---|---|---|
| **A** Die Ware steht auf der Einkaufsliste | **10** | Option 2 traegt — Regel am Posten ergaenzen |
| **B** Die Ware fehlt auf der Liste | **42** | Das Spiel braucht Material, das niemand kauft → **Ticket K7** mit Sicherheitsfolge |
| **C** Das Verbot nennt gar keine Ware | **105** | „Sichtaufsicht", „Platz freiraeumen", „reihum" → gehoert an die Spielkarte oder in den Ablauf, nie an einen Einkaufsposten |

**Option 2 deckt also 10 von 157, nicht 157.** Meine Ansage war um den Faktor 15 daneben.

Und von den 10 waren beim Nachsehen **sieben Metrik-Rauschen**: Die gedruckte Regel deckt das
Verbot laengst, nur in anderen Worten — „nie um Hals, Handgelenk oder Fussgelenk" fuer „NIE um
Hals oder Koerperteile wickeln", „Der Bogen wird niemals auf einen Menschen gerichtet" fuer
„Bogen NIE auf Personen richten". Dieselbe Synonym-Blindheit wie in L22.

**Echt und behoben waren drei** — alle drei Kaufanweisungen, die genau an den Posten gehoeren:

* `dino-klein` Vulkan: „Nimm ausschliesslich Essig und Natron — kein Wasserstoffperoxid und
  kein Trockeneis, auch nicht als Elefantenzahnpasta-Variante aus dem Netz."
* `prinzessin-klein` Glitzer: „Kauf Klebeglitzer oder Glitzerfolie, keinen losen Streuglitter."
* `einhorn-klein` Basteln: „Heisskleber bleibt bei 3- bis 5-Jaehrigen ganz weg."

Stufe 49 steht damit bei 146.

**Was das fuer die Entscheidung heisst — die Reihenfolge dreht sich um:**

1. Die **105 aus Gruppe C** gehoeren an die Spielkarte. Das ist Option 1, und sie ist damit
   nicht die halbe, sondern die richtige Loesung fuer den groessten Block.
2. Die **42 aus Gruppe B** sind Ticket K7 und keine Schreibarbeit: Dort fehlt Ware auf der
   Einkaufsliste, die das Spiel braucht (`piraten-mittel` minimal verlangt „1 Seil pro Kind
   (~50 cm)", kein Posten verkauft Seil).
3. Gruppe A ist erledigt.

**Lehre:** Bevor ich eine Arbeitsliste abarbeite, messe ich, woraus sie besteht. Ich haette
sonst 157 Texte fuer Posten geschrieben, die es zu 90 % nicht gibt.

## P. Der Spielkarten-Kanal steht — und wo er nicht hinreicht (18.08.)

Der Renderer druckt `games[].safetyRule` jetzt an die Spielkarte: **140 Regeln auf 26 der
45 Seiten**, ueber 122 ausdrueckliche Anker. Stufe 49 faellt von 146 auf **84**.

Was dabei sichtbar wurde — der Kanal kann nie alle erreichen:

| | |
|---|---|
| Spielkarten auf den 45 Seiten | 225 |
| Spielregeln in den Daten | 655 |
| **Seiten ganz ohne Spielkarte** | **6** (dschungel und feen, je 3 Altersstufen) |

Die Seiten tragen fuer 655 Spielregeln nur 225 Karten. dschungel und feen fuehren ihre
Spiele ausschliesslich im Zeitplan und im Fliesstext — dort gibt es keinen Anker, an dem
eine Regel haengen koennte. Fuer diese sechs Seiten bleibt nur der Einkaufskanal oder eine
Umstellung der Seitenstruktur.

**Der Rest von Stufe 49 (84) je Motto:** prinzessin 20, superheld 15, pferde 13,
feuerwehr 11, einhorn 5, weltraum 5, ritter 4, baustelle 3, dschungel 3, dino 2, safari 2,
piraten 1. prinzessin und superheld fuehren die Liste an, weil bei ihnen **beide** Kanaele
duenn sind: keine Einkaufsliste (Befund K) und wenig anschlussfaehige Karten.

## Q. 52 Spielkarten haben in den Daten gar kein Gegenstueck (18.08.)

Die dritte Seite von K6, diesmal in der Spiel-Dimension. Bisher war bekannt, dass
Einkaufsposten zwischen den Katalogen abweichen. Gemessen wurde jetzt dasselbe fuer Spiele:
**52 der 225 Spielkarten beschreiben ein Spiel, das in `data/motto` nicht existiert** —
nicht unter anderem Namen, sondern gar nicht.

| Motto | Karten ohne Gegenstueck |
|---|---|
| superheld | 10 |
| baustelle, pferde, ritter | je 7 |
| prinzessin | 6 |
| einhorn, feuerwehr | je 4 |
| dino | 3 |
| piraten, safari | je 2 |

Beispiele: `baustelle-3-5` "Helm-Aufsetzen-Wettlauf" und "Bagger-Hoer-Spiel",
`baustelle-6-8` "Werkzeug-Pantomime", `baustelle-9-12` "Bauleiter-Wandersieg-Tafel".

**Warum das mehr ist als Buchhaltung:** Diese Spiele stehen oeffentlich auf der Seite, ein
Elternteil spielt sie am Partytag — aber keine Maschine kennt sie. Sie bekommen nie eine
Sicherheitsregel, tauchen in keiner Materialpruefung auf und in keinem Gate. Sie sind der
Teil des Produkts, ueber den das Qualitaetssystem nichts weiss.

Dazu kommen **25 Karten, deren Spiel zwar existiert, aber keine `safetyRule` traegt**, und
**9 Zuordnungen, die der Pruefer selbst als unsicher gemeldet hat** — beide bewusst nicht
gedruckt.

Gehoert zu Ticket **K7** (Spiel -> Material) und **K6** (Parallel-Kataloge).

## R. Die Normalisierung liess die lockerste Regel gewinnen (18.08., selbst gefunden)

`norm()` schneidet Klammerinhalte weg — dafuer ist es gebaut, damit "Lupen (6er-Set)" und
"Lupen 6er-Set" derselbe Posten sind. Am Spiel wird daraus ein Defekt: **"Koeniglicher
Tanz" und "Koeniglicher Tanz (mit Einfrieren)" fallen auf denselben Schluessel**, und weil
`lade_spielregeln()` eine Zuordnung aufbaute, gewann der zuletzt gelesene Eintrag.

**Gemessen: 12 Kollisionen mit unterschiedlicher `safetyRule`, vier davon gedruckt.**

| Seite | gedruckt wurde | verloren ging |
|---|---|---|
| prinzessin-3-5 · Koeniglicher Tanz | "Boden frei." | "von Stolperfallen, **weiche Umgebung. Genug Abstand zwischen den Kindern.**" |
| ritter-3-5 · Wappen-Schmuecken | "Keine Schere, kein Sekundenkleber." | "**Schilde sind vorgeschnitten**", "**nur Klebepads**" |
| safari-3-5 · Tiere fuettern | die **Futter**-Regel | der Anker nennt das **Ball**-Spiel — zwei verschiedene Spiele, ein Schluessel |
| prinzessin-9-12 · Escape-Stationen | Kurzfassung | "Teams gleich gross, alle kommen dran" |

Die Richtung ist dieselbe wie in Gate A / ritter: **die gedruckte Regel war lockerer als
die Daten** — auf einer Seite fuer Dreijaehrige. Der safari-Fall ist schlimmer als eine
Kuerzung: Dort stand eine Regel ueber Wurfbaelle unter einem Spiel mit essbarem Futter.

**Behoben:** Aufloesung ueber den exakten Namen; `norm()` nur noch als Rueckfallebene, die
bei mehreren Treffern abbricht. Wo dasselbe Spiel in mehreren Varianten verschiedene
Regeln traegt, liest die Maschine die Variante aus dem Seitenabschnitt ab (3 von 7 Faellen)
oder der Anker benennt sie mit Begruendung (4 Faelle, alle `minimal` — die vollstaendigste
Fassung). Stufe 52 fuehrt dazu die Maschine aus, statt ihre Logik nachzubauen.

**Nebenbefund:** `safari-3-5` fuehrt dasselbe Spiel ("Tiere fuettern") **zweimal** auf der
Seite, mit abweichendem Bezugstext ("vom Ausmalbild-Druck" gegen "gratis von mowoli.de").
Kein Sicherheitsproblem, aber eine sichtbare Dublette — gehoert zu K6.

## E. Inhaltliche Altlasten (bereits behoben, zur Erinnerung)

| # | Befund | Fundtag |
|---|---|---|
| E1 | Knopfzellen-Notfallzeile schloss die **Honig-Erste-Hilfe aus** („nichts zu essen oder trinken geben") — einzige Stelle, die eine wirksame Sofortmaßnahme aktiv ausschloss. | 15.08., primärverifiziert |
| E2 | Wunderkerzen-Regel klebte an zwei **Ballon**-Posten (Fix-Skript-Restschaden vom 12.08.). | 13.08. |
| E3 | „Nur Perlen kaufen, die NICHT durch eine Klopapierrolle passen (unter 4,5 cm)" — das wäre ein Tischtennisball; die Regel verbot faktisch ihren eigenen Posten. | 15.08. |
| E4 | dschungel-klein druckte die widerlegte Absolutbehauptung „Latex ist das häufigste Erstickungsmaterial". | 15.08. |
| E5 | Eine Sicherheitsregel verwies auf die **Spielkarte im Bezahlpaket** („Für die UV-Lampe gilt die Regel auf der Spielkarte"). | 15.08. |
