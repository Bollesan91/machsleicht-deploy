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

## E. Inhaltliche Altlasten (bereits behoben, zur Erinnerung)

| # | Befund | Fundtag |
|---|---|---|
| E1 | Knopfzellen-Notfallzeile schloss die **Honig-Erste-Hilfe aus** („nichts zu essen oder trinken geben") — einzige Stelle, die eine wirksame Sofortmaßnahme aktiv ausschloss. | 15.08., primärverifiziert |
| E2 | Wunderkerzen-Regel klebte an zwei **Ballon**-Posten (Fix-Skript-Restschaden vom 12.08.). | 13.08. |
| E3 | „Nur Perlen kaufen, die NICHT durch eine Klopapierrolle passen (unter 4,5 cm)" — das wäre ein Tischtennisball; die Regel verbot faktisch ihren eigenen Posten. | 15.08. |
| E4 | dschungel-klein druckte die widerlegte Absolutbehauptung „Latex ist das häufigste Erstickungsmaterial". | 15.08. |
| E5 | Eine Sicherheitsregel verwies auf die **Spielkarte im Bezahlpaket** („Für die UV-Lampe gilt die Regel auf der Spielkarte"). | 15.08. |
