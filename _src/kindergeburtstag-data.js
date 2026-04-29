var SZ_THEMES = [{id:"piraten",name:"Piraten-Schatzsuche",emoji:"\u{1F3F4}\u200D\u2620\uFE0F",color:"#5D4037",intro:{klein:"K\xE4pt'n Krake hat seinen Schatz versteckt! {name}, hilf ihm, die Schatzkarte zu lesen und den Schatz zu finden!",mittel:"K\xE4pt'n Rotbart hat seinen Goldschatz auf einer geheimen Insel vergraben. {name}, folgt den Hinweisen und l\xF6st die R\xE4tsel, bevor die Flut kommt!",gross:"Das Logbuch der verschollenen 'Black Pearl' wurde gefunden. {name}, darin stecken verschl\xFCsselte Koordinaten zu einem legend\xE4ren Schatz. K\xF6nnt ihr den Code knacken?"},stations:{klein:[{name:"Flaschenpost finden",desc:"Eine echte Flasche mit einer Nachricht liegt versteckt. Darin steht der erste Hinweis als Bild (Pfeil zum n\xE4chsten Ort).",dauer:5,typ:"suchen",hint:"Flasche gut sichtbar verstecken. Nachricht als einfaches Bild mit Pfeil."},{name:"Schiff beladen",desc:"Einen Eimer mit B\xE4llen f\xFCllen \u2014 aber nur mit einer Hand! Die andere h\xE4lt das 'Steuer' (einen Stock). Wer hat am schnellsten 5 B\xE4lle im Eimer?",dauer:8,typ:"geschick",hint:"Tennisb\xE4lle oder Socken-Kn\xE4uel. Eimer = das Schiff."},{name:"Piraten-Verkleidung",desc:"An dieser Station liegen Piratenh\xFCte (Zeitungspapier), Augenklappen (schwarzes Papier + Gummi) und Fernrohre (Klopapierrollen). Jedes Kind bastelt seine Verkleidung.",dauer:10,typ:"basteln",hint:"Alles vorbereiten und auslegen. Kinder lieben es, sich zu verkleiden."},{name:"Schatz im Sand",desc:"In einer Wanne mit Sand (oder Reis) sind Goldm\xFCnzen (Schoko-Taler) versteckt. Jedes Kind darf 3 M\xFCnzen finden und behalten.",dauer:5,typ:"suchen",hint:"Gro\xDFe flache Wanne. 3\u20135 M\xFCnzen pro Kind verstecken."},{name:"Schatzkiste \xF6ffnen!",desc:"Die letzte Station! Eine Kiste (Schuhkarton, verziert) mit dem Schatz: S\xFC\xDFigkeiten + kleine Spielzeuge f\xFCr alle.",dauer:5,typ:"finale",hint:"Kiste mit Goldpapier bekleben. Der Wow-Moment!"}],mittel:[{name:"Flaschenpost entschl\xFCsseln",desc:"Die Flaschenpost enth\xE4lt eine Nachricht in Spiegelschrift. Kinder m\xFCssen sie vor einen Spiegel halten (oder r\xFCckw\xE4rts lesen) um den ersten Hinweis zu bekommen.",dauer:5,typ:"r\xE4tseln",hint:"Text r\xFCckw\xE4rts schreiben oder ausdrucken. Kleinen Spiegel bereitlegen."},{name:"Seeungeheuer besiegen",desc:"Dosenwerfen! 6 Becher \xFCbereinander gestapelt = das Seeungeheuer. Jedes Kind hat 3 W\xFCrfe mit Sockenb\xE4llen. Alle umwerfen = Hinweis zum n\xE4chsten Ort.",dauer:8,typ:"action",hint:"Becher mit Seeungeheuer-Gesichtern bemalen. Aus 2m Entfernung werfen."},{name:"Knotenkunde",desc:"Drei verschiedene Knoten an einem Seil lernen: einfacher Knoten, Schleife, Achterknoten. Wer alle drei schafft, bekommt den n\xE4chsten Hinweis.",dauer:10,typ:"geschick",hint:"Vorher \xFCben! Anleitung ausdrucken und daneben legen."},{name:"Schatzkarten-Puzzle",desc:"Die Schatzkarte wurde in 6 Teile zerrissen! Die Teile sind im Garten/Raum verteilt. Zusammenpuzzlen ergibt den Ort des Schatzes.",dauer:10,typ:"suchen",hint:"A4-Karte in 6 Teile schneiden. Auf der R\xFCckseite nummerieren falls es zu schwer ist."},{name:"Schatz ausgraben!",desc:"Am Ort aus der Karte graben die Kinder den Schatz aus (eingegraben oder unter Bl\xE4ttern/Kissen versteckt).",dauer:5,typ:"finale",hint:"Schatzkiste leicht bedecken, nicht zu tief vergraben."}],gross:[{name:"Logbuch entschl\xFCsseln",desc:"Die erste Seite des Logbuchs ist in einer Caesar-Verschl\xFCsselung geschrieben (jeder Buchstabe um 3 verschoben). Enth\xE4lt die Koordinaten zur n\xE4chsten Station.",dauer:8,typ:"r\xE4tseln",hint:"Alphabet-Tabelle als Hilfe bereitlegen. A=D, B=E etc."},{name:"Navigations-Challenge",desc:"Mit einem echten Kompass (oder Handy) m\xFCssen die Kinder eine bestimmte Richtung laufen und die Schritte z\xE4hlen. Am Ziel: n\xE4chster Hinweis.",dauer:8,typ:"action",hint:"Kompass-App reicht. '30 Schritte Richtung Nord-Ost' etc."},{name:"Seemanns-Pr\xFCfung",desc:"5 Aufgaben: Knoten binden, Entfernung sch\xE4tzen, Windrichtung bestimmen, 3 Sternbilder nennen, Flaggen-Alphabet (1 Wort) entschl\xFCsseln.",dauer:12,typ:"r\xE4tseln",hint:"Flaggen-Alphabet ausdrucken. Rest m\xFCndlich abfragen."},{name:"Fluch des K\xE4pt'ns",desc:"Ein Kreuzwortr\xE4tsel mit Piraten-Begriffen. Die markierten Buchstaben ergeben das L\xF6sungswort = den Ort des Schatzes.",dauer:10,typ:"r\xE4tseln",hint:"Kreuzwortr\xE4tsel vorher erstellen. 8\u201310 Begriffe reichen."},{name:"Der Schatz der Black Pearl",desc:"Am L\xF6sungsort: eine verschlossene Truhe mit Zahlenschloss. Die Kombination ergibt sich aus den gesammelten Zahlen aller Stationen.",dauer:5,typ:"finale",hint:"Zahlenschloss kaufen (\u20AC3). An jeder Station eine Zahl als Bonus verstecken."}]},material:{klein:["Flasche + Nachricht","Eimer + 15 B\xE4lle/Socken","Zeitungspapier + Scheren + Gummib\xE4nder + Klopapierrollen","Wanne + Sand/Reis + Schoko-Goldm\xFCnzen","Schatzkiste (Schuhkarton) + Schatz"],mittel:["Flasche + Spiegelschrift-Nachricht + Spiegel","6 Becher + 3 Sockenb\xE4lle","Seil (2m) + Knoten-Anleitung","Schatzkarte (A4, in 6 Teile geschnitten)","Schatzkiste + Schatz"],gross:["Logbuch (Bl\xE4tter, Tee-gef\xE4rbt) + Caesar-Tabelle","Kompass oder Handy","Flaggen-Alphabet Ausdruck + 5 Aufgaben","Kreuzwortr\xE4tsel Ausdruck","Zahlenschloss + Schatztruhe + Schatz"]},schatz:["Schoko-Goldm\xFCnzen","Kleine Spielzeuge","Tattoos","Sticker","Piraten-Augenklappen"]},{id:"dschungel",name:"Dschungel-Expedition",emoji:"\u{1F412}",color:"#2E7D32",intro:{klein:"Die Tiere im Dschungel brauchen eure Hilfe! {name}, findet alle versteckten Tierbabys und bringt sie sicher zur\xFCck.",mittel:"Forscherin Dr. Flora hat ihren Rucksack im Dschungel verloren \u2014 darin: die Karte zum geheimen Wasserfall. {name}, folgt den Tierspuren!",gross:"Ein seltenes Tier wurde im Dschungel gesichtet. {name}, euer Auftrag als Expeditionsteam: Findet es, dokumentiert es, und bringt eine Probe zur\xFCck \u2014 bevor der Sturm kommt."},stations:{klein:[{name:"Tierspuren folgen",desc:"Pfotenabdr\xFCcke aus Papier liegen auf dem Boden und f\xFChren zur n\xE4chsten Station. Welches Tier war das?",dauer:5,typ:"suchen",hint:"Pfotenabdr\xFCcke vorher aus Tonpapier ausschneiden und auslegen."},{name:"Tierbabys retten",desc:"Kuscheltiere sind im 'Dschungel' (B\xFCsche, unter Kissen) versteckt. Jedes Kind rettet ein Tierbaby und bringt es ins 'Camp' (Decke auf dem Boden).",dauer:8,typ:"suchen",hint:"5\u20138 kleine Kuscheltiere verteilen."},{name:"Dschungel-Parcours",desc:"Unter Seilen durchkriechen (Lianen!), \xFCber Kissen springen (Steine im Fluss!), durch einen Tunnel krabbeln (H\xF6hle!).",dauer:10,typ:"action",hint:"Seile zwischen St\xFChle spannen. Kissen in einer Reihe. Tunnel = Decke \xFCber 2 St\xFChle."},{name:"Tier-Ger\xE4usche raten",desc:"Handy spielt Tierger\xE4usche ab. Wer err\xE4t das Tier, bekommt einen Sticker. 8 Ger\xE4usche = 8 Runden.",dauer:8,typ:"r\xE4tseln",hint:"YouTube: 'Tierger\xE4usche f\xFCr Kinder'. Vorher testen ob es laut genug ist."},{name:"Der geheime Wasserfall",desc:"Am Ende wartet der 'Wasserfall' (blaues Tuch \xFCber einem Stuhl). Dahinter: der Schatz!",dauer:5,typ:"finale",hint:"Blaues Tuch/Laken. Schatzkiste dahinter verstecken."}],mittel:[{name:"Spurenlesen",desc:"Verschiedene 'Tierspuren' (Abdr\xFCcke aus Kartoffeldruck oder Ausdrucke) f\xFChren in verschiedene Richtungen. Nur die richtigen Spuren (L\xF6we!) f\xFChren zur n\xE4chsten Station.",dauer:8,typ:"suchen",hint:"3 verschiedene Spuren auslegen, nur eine ist richtig. Falsche f\xFChren zu Sackgassen."},{name:"Lianenschwingen",desc:"Ein Seil an einem Ast/Ger\xFCst. Kinder schwingen dar\xFCber wie Tarzan und landen auf der 'sicheren Insel' (Matte/Kissen). Dabei einen Ball halten ohne ihn fallen zu lassen.",dauer:8,typ:"action",hint:"Seil sicher befestigen! Weiche Landung sicherstellen."},{name:"Tier-Steckbrief erstellen",desc:"Jedes Kind bekommt ein Foto eines Dschungeltiers und muss einen Steckbrief ausf\xFCllen: Name, Futter, Gr\xF6\xDFe, Ger\xE4usch, Besonderheit.",dauer:10,typ:"r\xE4tseln",hint:"Steckbrief-Vorlage ausdrucken. Tier-Fotos: L\xF6we, Affe, Papagei, Schlange, Elefant."},{name:"Dschungel-Staffel",desc:"Zwei Teams! Hindernisparcours mit Ball auf L\xF6ffel + unter Seilen durch + Slalom um B\xE4ume/St\xFChle. Schnellstes Team gewinnt.",dauer:10,typ:"action",hint:"Parcours vorher aufbauen und testen."},{name:"Dr. Floras Rucksack",desc:"Der Rucksack h\xE4ngt am 'Wasserfall'. Darin: die Schatzkarte + Belohnungen f\xFCr alle Expeditionsteilnehmer.",dauer:5,typ:"finale",hint:"Alter Rucksack + Karte + Mitgebsel-T\xFCten."}],gross:[{name:"GPS-Koordinaten entschl\xFCsseln",desc:"Verschl\xFCsselte Koordinaten: Mathe-Aufgaben l\xF6sen ergibt die Zahlen. Diese zeigen den n\xE4chsten Punkt auf einer selbstgezeichneten Karte.",dauer:8,typ:"r\xE4tseln",hint:"Karte vom Garten/Park vorher zeichnen mit Koordinatensystem."},{name:"Tier-Bestimmung",desc:"An 5 Stellen: Fotos von Tierspuren, Federn, Fell-Muster. Teams bestimmen welches Tier es ist und notieren den Anfangsbuchstaben. Die Buchstaben ergeben ein L\xF6sungswort.",dauer:10,typ:"r\xE4tseln",hint:"Bilder ausdrucken. L\xF6sung vorher festlegen (z.B. FLORA)."},{name:"\xDCberlebens-Challenge",desc:"3 Aufgaben: Wasser filtern (Sand + Kies + Tuch in Flasche), Kompass lesen, essbare vs. giftige Pflanzen unterscheiden (Bildkarten).",dauer:12,typ:"geschick",hint:"Wasser-Filter vorher testen! Pflanzenkarten ausdrucken."},{name:"Br\xFCckenbau",desc:"Mit St\xF6cken, Seilen und Brettern eine Br\xFCcke bauen die ein Kuscheltier tragen kann. Teamwork! Zeitlimit: 10 Minuten.",dauer:12,typ:"teamwork",hint:"Material bereitlegen. Kein 'richtiges' Ergebnis n\xF6tig, Kreativit\xE4t z\xE4hlt."},{name:"Die seltene Entdeckung",desc:"Am Zielort: eine 'seltene Pflanze' (gebastelt) + Forschungsurkunde + Schatz f\xFCr das Team.",dauer:5,typ:"finale",hint:"Urkunde vorher drucken: 'Offizielle Dschungel-Forscher*in'."}]},material:{klein:["Pfotenabdr\xFCcke aus Papier","5\u20138 Kuscheltiere","Seile + Kissen + Decke (Tunnel)","Handy mit Tierger\xE4uschen + Sticker","Blaues Tuch + Schatzkiste"],mittel:["3 Sorten Tierspuren-Ausdrucke","Seil + Matte","Steckbrief-Vorlage + Tier-Fotos","L\xF6ffel + B\xE4lle + Seile + Pylonen","Rucksack + Schatzkarte + Mitgebsel"],gross:["Garten-Karte + Mathe-Aufgaben","Tierspuren-Fotos + Stift + Zettel","Filter-Material (Flasche, Sand, Kies, Tuch) + Pflanzen-Bildkarten","St\xF6cke + Seile + kleine Bretter","Urkunde + Schatz"]},schatz:["Tier-Figuren","Dschungel-Sticker","Lupen","Fernglas-Spielzeug","Schoko-Goldm\xFCnzen"]},{id:"weltraum",name:"Weltraum-Mission",emoji:"\u{1F680}",color:"#283593",intro:{klein:"Astronaut Astro hat seine Sterne verloren! {name}, helft ihm, alle 5 Sterne wiederzufinden und zur\xFCck zur Rakete zu bringen!",mittel:"Mission Control an alle Astronauten: {name}, auf dem Planeten Zyx-7 wurde ein geheimnisvoller Kristall entdeckt. Eure Mission: Findet ihn, bevor die Aliens es tun!",gross:"Eine Notnachricht von der Raumstation Alpha: Der Reaktor f\xE4llt aus. {name}, euer Team muss 5 Ersatzteile auf verschiedenen Planeten einsammeln, bevor die Zeit abl\xE4uft."},stations:{klein:[{name:"Sterne sammeln",desc:"Leucht-Sterne (oder Sterne aus Goldpapier) sind im Raum verteilt. Jedes Kind sammelt so viele wie m\xF6glich in 2 Minuten.",dauer:5,typ:"suchen",hint:"20\u201330 Sterne verteilen. Eimer pro Kind zum Sammeln."},{name:"Rakete starten",desc:"Countdown von 10 runterz\xE4hlen, dann alle zusammen hochspringen! Wer am h\xF6chsten springt, 'fliegt zum Mond'. 3 Runden.",dauer:5,typ:"action",hint:"Laut mitz\xE4hlen. Kinder lieben Countdowns!"},{name:"Alien-Schleim",desc:"Jedes Kind mischt seinen eigenen Glitzer-Schleim aus Bastelkleber + Kontaktlinsen-L\xF6sung + Glitzer. Zum Mitnehmen!",dauer:10,typ:"basteln",hint:"Bastelkleber, Kontaktlinsen-L\xF6sung (mit Bors\xE4ure), Glitzer. Unterlage nicht vergessen!"},{name:"Planetensuche",desc:"Bunte B\xE4lle (= Planeten) sind versteckt. Jeder Planet hat einen Buchstaben drauf. Die Buchstaben ergeben ein Wort: STERN.",dauer:8,typ:"suchen",hint:"5 verschiedenfarbige B\xE4lle mit S-T-E-R-N beschriften."},{name:"Zur\xFCck zur Rakete!",desc:"Die Rakete (gro\xDFer Karton, bemalt) enth\xE4lt den Schatz. Alle steigen ein und 'fliegen nach Hause'!",dauer:5,typ:"finale",hint:"Gro\xDFen Karton als Rakete bemalen. Schatzkiste reinlegen."}],mittel:[{name:"Geheime Botschaft von Mission Control",desc:"Eine Nachricht in UV-Schrift (unsichtbarer Stift). Nur mit UV-Lampe lesbar! Enth\xE4lt die Koordinaten zum ersten Planeten.",dauer:5,typ:"r\xE4tseln",hint:"UV-Stift + UV-Lampe (gibt's g\xFCnstig bei Amazon). Alternativ: Zitronensaft + F\xF6hn."},{name:"Meteoriten-Slalom",desc:"Kinder laufen mit einem Ball auf dem L\xF6ffel durch einen Slalom (= Meteoriten-Feld). Ball fallen lassen = zur\xFCck zum Start!",dauer:8,typ:"action",hint:"Pylonen oder Flaschen als Slalom. Tischtennisball auf Essl\xF6ffel."},{name:"Alien-Kommunikation",desc:"Eine Nachricht in Alien-Schrift (Symbole statt Buchstaben). \xDCbersetzungstabelle liegt bereit. Die \xFCbersetzte Nachricht verr\xE4t den n\xE4chsten Ort.",dauer:10,typ:"r\xE4tseln",hint:"Einfache Symbole erfinden: Stern=A, Mond=B, Sonne=C etc. Tabelle ausdrucken."},{name:"Mondlandung",desc:"Watte-B\xE4lle von einer Markierung aus in einen Eimer werfen (= auf dem Mond landen). Jedes Kind hat 5 Versuche. Mindestens 2 m\xFCssen landen.",dauer:8,typ:"geschick",hint:"3m Entfernung. Watte-B\xE4lle oder zusammengekn\xFClltes Papier."},{name:"Kristall von Zyx-7",desc:"Am letzten Planeten: ein leuchtender Kristall (Lampe in Alufolie) + Schatzkiste f\xFCr alle.",dauer:5,typ:"finale",hint:"LED-Teelicht in Alufolie einwickeln = leuchtender Kristall. Cool im Dunkeln!"}],gross:[{name:"Verschl\xFCsselter Funkspruch",desc:"Bin\xE4rcode! Eine Nachricht in 0 und 1. \xDCbersetzungstabelle (A=00001, B=00010...) liegt bereit. Die Nachricht verr\xE4t den n\xE4chsten Planeten.",dauer:10,typ:"r\xE4tseln",hint:"Kurze Nachricht in Bin\xE4r. Oder einfacher: Morsecode. Tabelle ausdrucken."},{name:"Reparatur unter Zeitdruck",desc:"5 'Bauteile' (Legosteine/Puzzle-Teile) sind in 5 verschiedenen Verstecken. Alle finden und das Modell zusammenbauen \u2014 in unter 10 Minuten.",dauer:10,typ:"teamwork",hint:"Timer laufen lassen! Verstecke nicht zu schwer."},{name:"Schwerelosigkeits-Challenge",desc:"Aufgaben mit verbundenen Augen oder in Zeitlupe (= Schwerelosigkeit): Ball fangen, Turm stapeln, Wasser einschenken.",dauer:10,typ:"geschick",hint:"Augenbinde. Plastikbecher f\xFCr Turm. Platz f\xFCr Wasserkleckse."},{name:"Alien-Quiz",desc:"20 Fragen \xFCber Weltraum, Planeten, Mond. Multiple Choice. Teams buzzern mit K\xFCchengl\xF6ckchen. Jede richtige Antwort = ein Zahlenteil f\xFCr den Code.",dauer:10,typ:"r\xE4tseln",hint:"Fragen vorher googeln. 'Welcher Planet hat Ringe?' etc."},{name:"Reaktor-Neustart",desc:"Die gesammelten Zahlen ergeben den Code f\xFCrs Zahlenschloss der Schatztruhe. Code eingeben = Mission erfolgreich!",dauer:5,typ:"finale",hint:"3-stelliges Zahlenschloss. Pro Station eine Ziffer als Bonus vergeben."}]},material:{klein:["30 Sterne (Goldpapier/Leucht-Sterne)","Freier Platz zum Springen","Bastelkleber + Kontaktlinsen-L\xF6sung + Glitzer","5 bunte B\xE4lle mit Buchstaben","Gro\xDFer Karton (Rakete) + Schatz"],mittel:["UV-Stift + UV-Lampe","L\xF6ffel + Tischtennisb\xE4lle + Pylonen","Alien-Alphabet Ausdruck","Watte-B\xE4lle + Eimer","LED-Teelicht + Alufolie + Schatzkiste"],gross:["Bin\xE4r-/Morsecode-Tabelle + Nachricht","5 Legosteine/Puzzle-Teile + Timer","Augenbinde + Becher + Wasser","20 Quiz-Fragen + K\xFCchengl\xF6ckchen","Zahlenschloss + Schatztruhe"]},schatz:["Leucht-Sterne","Weltraum-Tattoos","Glitzer-Schleim","Astronauten-Sticker","Mondstein (bemalter Kiesel)"]},{id:"detektiv",name:"Detektiv-Fall",emoji:"\u{1F50D}",color:"#455A64",intro:{klein:"Oh nein! Teddys Honig ist verschwunden! {name}, wer hat ihn gestohlen? Folgt den Spuren und findet den Dieb!",mittel:"Im Museum ist ein wertvolles Gem\xE4lde verschwunden. {name}, nur ihr \u2014 die besten Detektive der Stadt \u2014 k\xF6nnt den Fall l\xF6sen!",gross:"Ein anonymer Hinweis: 'In 60 Minuten passiert etwas im Rathaus.' {name}, findet heraus WER, WAS und WARUM \u2014 bevor es zu sp\xE4t ist."},stations:{klein:[{name:"Spuren am Tatort",desc:"Fu\xDFspuren aus Papier auf dem Boden folgen. Sie f\xFChren von der leeren Honigglas-Stelle zur n\xE4chsten Station.",dauer:5,typ:"suchen",hint:"Gro\xDFe Fu\xDFspuren aus Tonpapier ausschneiden."},{name:"Zeugen befragen",desc:"Kuscheltiere sitzen im Kreis. Bei jedem liegt ein Zettel mit einem Hinweis (als Bild). Kinder sammeln alle Hinweise.",dauer:8,typ:"suchen",hint:"4\u20135 Kuscheltiere mit je einem Bild-Hinweis (z.B. 'braunes Fell', 'mag Honig')."},{name:"Fingerabdr\xFCcke nehmen",desc:"Jedes Kind dr\xFCckt seinen Finger auf ein Stempelkissen und dann aufs Papier. Vergleich mit den 'Tatort-Abdr\xFCcken'. Detektivarbeit!",dauer:8,typ:"basteln",hint:"Stempelkissen + wei\xDFes Papier + Lupe."},{name:"Verd\xE4chtige finden",desc:"3 Verd\xE4chtige (Bilder): Fuchs, B\xE4r, Hase. Die gesammelten Hinweise passen auf den B\xE4ren! Er war's!",dauer:5,typ:"r\xE4tseln",hint:"3 Tier-Bilder aufh\xE4ngen. Hinweise zeigen eindeutig auf den B\xE4ren."},{name:"Fall gel\xF6st!",desc:"Der B\xE4r gibt den Honig zur\xFCck (Gummib\xE4rchen f\xFCr alle!) und alle bekommen einen Detektiv-Ausweis.",dauer:5,typ:"finale",hint:"Detektiv-Ausweise vorher basteln/drucken. Gummib\xE4rchen als 'Honig'."}],mittel:[{name:"Tatort untersuchen",desc:"Am 'Tatort' (Tisch mit Deko) liegen 5 Beweist\xFCcke. Kinder notieren alles auf ihrem Detektiv-Notizbuch und machen 'Fotos' (zeichnen).",dauer:8,typ:"r\xE4tseln",hint:"Beweist\xFCcke: Faden, Knopf, Schuh-Abdruck, Haare, Zettel-Fetzen."},{name:"Geheimschrift lesen",desc:"Ein Hinweis in Zitronensaft geschrieben. F\xF6hn dr\xFCber = die Schrift erscheint! Verr\xE4t den n\xE4chsten Ort.",dauer:8,typ:"r\xE4tseln",hint:"Zitronensaft + Wattest\xE4bchen + F\xF6hn. Vorher testen!"},{name:"Zeugen-Verh\xF6r",desc:"3 'Zeugen' (Steckbriefe an der Wand). Jeder sagt etwas anderes. Wer l\xFCgt? Die Kinder vergleichen die Aussagen und finden den Widerspruch.",dauer:10,typ:"r\xE4tseln",hint:"3 kurze Aussagen schreiben, 1 widerspricht den anderen."},{name:"Verfolgungsjagd",desc:"Dem Dieb auf der Spur! Hindernis-Parcours durch den Garten/Raum: unter Seilen durch, \xFCber Kissen, um B\xE4ume. Am Ende: der letzte Hinweis.",dauer:8,typ:"action",hint:"Parcours vorher aufbauen."},{name:"Fall gel\xF6st!",desc:"Alle Hinweise zusammensetzen = der T\xE4ter wird entlarvt! Belohnung: Detektiv-Urkunde + Schatz.",dauer:5,typ:"finale",hint:"Urkunde drucken: 'Meisterdetektiv*in [Name]'."}],gross:[{name:"Tatort-Analyse",desc:"CSI-Style: Beweist\xFCcke untersuchen, Fotos zuordnen, Zeitstrahl erstellen. Alles dokumentieren im Ermittler-Dossier.",dauer:10,typ:"r\xE4tseln",hint:"Dossier-Vorlage drucken. Beweisfotos ausdrucken."},{name:"Verschl\xFCsselte Nachricht",desc:"Pigpen-Chiffre oder Freimaurer-Code. \xDCbersetzungstabelle liegt bereit. Die Nachricht enth\xE4lt einen Namen.",dauer:10,typ:"r\xE4tseln",hint:"Pigpen-Alphabet ausdrucken. Kurze Nachricht (5\u20138 W\xF6rter)."},{name:"Alibi-Check",desc:"5 Verd\xE4chtige mit je einem Alibi. Zeitstrahl + Ortsangaben vergleichen. Nur bei einem stimmt das Alibi NICHT.",dauer:10,typ:"r\xE4tseln",hint:"5 Steckbriefe mit Alibis. Einer hat eine L\xFCcke/Widerspruch."},{name:"Beweis sichern",desc:"UV-Lampe enth\xFCllt versteckte Nachrichten an den W\xE4nden/M\xF6beln. Die Nachrichten ergeben zusammen den Tatort.",dauer:8,typ:"suchen",hint:"UV-Stift auf wei\xDFe Zettel an 5 Stellen. UV-Lampe zum Lesen."},{name:"Verhaftung!",desc:"Der T\xE4ter wird entlarvt! Alle Beweise pr\xE4sentieren. Belohnung: Meisterdetektiv-Zertifikat + Schatz.",dauer:5,typ:"finale",hint:"Zertifikat drucken. Kleines Schloss als Symbol."}]},material:{klein:["Fu\xDFspuren aus Papier","4\u20135 Kuscheltiere + Bild-Hinweise","Stempelkissen + Papier + Lupe","3 Verd\xE4chtigen-Bilder","Detektiv-Ausweise + Gummib\xE4rchen"],mittel:["5 Beweist\xFCcke + Notizbuch","Zitronensaft + Wattest\xE4bchen + F\xF6hn","3 Zeugen-Steckbriefe","Seile + Kissen (Parcours)","Detektiv-Urkunde + Schatz"],gross:["Dossier-Vorlage + Beweis-Fotos","Pigpen-Alphabet + verschl\xFCsselte Nachricht","5 Verd\xE4chtigen-Steckbriefe mit Alibis","UV-Stift + UV-Lampe + 5 versteckte Nachrichten","Zertifikat + Schloss-Symbol + Schatz"]},schatz:["Mini-Lupen","Detektiv-Sticker","Geheim-Stifte (UV)","Notizbl\xF6cke","Fingerabdruck-Set"]},{id:"dino",name:"Dino-Zeitreise",emoji:"\u{1F995}",color:"#795548",intro:{klein:"Die Dinosaurier-Eier sind \xFCberall im Garten verteilt! {name}, findet sie alle, bevor der T-Rex aufwacht!",mittel:"Professor Dinos Zeitmaschine hat euch in die Urzeit geschickt! {name}, sammelt 5 Fossilien um die Maschine wieder zu starten.",gross:"Ihr seid Pal\xE4ontologen auf einer Ausgrabung. {name}, ein komplettes Dino-Skelett liegt unter der Erde \u2014 aber in 5 verschiedenen Schichten. Grabt systematisch!"},stations:{klein:[{name:"Dino-Eier finden",desc:"Bunte Eier (Plastik-Eier oder bemalte Steine) im Garten/Raum versteckt. Jedes Kind sucht 3 Eier.",dauer:8,typ:"suchen",hint:"15\u201320 Eier verteilen. In jedem Ei eine kleine \xDCberraschung."},{name:"Vulkan-Experiment",desc:"Mini-Vulkan: Flasche + Essig + Natron + Sp\xFCli + rote Lebensmittelfarbe. Die Kinder gie\xDFen zusammen \u2014 BOOM! Lava!",dauer:8,typ:"basteln",hint:"Flasche in Sand-/Erd-H\xFCgel stellen. Auffangschale unterdrunter!"},{name:"Dino-Stampfen",desc:"Musik an = stampfen wie ein T-Rex! Musik aus = einfrieren wie ein Fossil. Wer sich bewegt ist raus.",dauer:8,typ:"action",hint:"Dino-Musik oder normale Kindermusik. Laut stampfen ermutigen!"},{name:"Fu\xDFspuren zuordnen",desc:"4 verschiedene Dino-Fu\xDFspuren auf dem Boden. Bilder von 4 Dinos daneben. Welcher Fu\xDF passt zu welchem Dino?",dauer:5,typ:"r\xE4tseln",hint:"Gro\xDFe Fu\xDFspuren aus Pappe. Einfache Zuordnung."},{name:"T-Rex aufwecken!",desc:"Der T-Rex (Kuscheltier/Figur) bewacht die Schatzkiste. Alle zusammen br\xFCllen so laut sie k\xF6nnen \u2014 dann 'erschreckt' er sich und gibt den Schatz frei!",dauer:5,typ:"finale",hint:"Dramatisch spielen! Kinder lieben gemeinsames Br\xFCllen."}],mittel:[{name:"Fossilien-Ausgrabung",desc:"In einer Wanne mit Sand: eingegrabene 'Fossilien' (Muscheln, Steine, Knochen aus Salzteig). Mit Pinsel freilegen wie echte Forscher.",dauer:10,typ:"basteln",hint:"Salzteig-Knochen vorher backen (1 Tag). Pinsel + Wanne + Sand."},{name:"Dino-Quiz: 1, 2 oder 3",desc:"Fragen \xFCber Dinos mit 3 Antworten. Kinder rennen zur Zahl die sie f\xFCr richtig halten. 'Ob ihr wirklich richtig steht...'",dauer:10,typ:"r\xE4tseln",hint:"10 Fragen vorbereiten. Zahlen auf A4 ausdrucken und am Boden verteilen."},{name:"Vulkan-Wettbewerb",desc:"2 Teams bauen je einen Vulkan (Sand + Flasche). Dann: wessen Lava sprudelt h\xF6her/schneller?",dauer:10,typ:"teamwork",hint:"2 Sets: Flaschen, Sand, Essig, Natron, Sp\xFCli, Lebensmittelfarbe."},{name:"Zeitmaschinen-Code",desc:"An jeder vorherigen Station gab es eine Zahl. Alle Zahlen zusammen = Code um die Zeitmaschine zu starten.",dauer:5,typ:"r\xE4tseln",hint:"An jeder Station eine gut sichtbare Zahl anbringen."},{name:"Zur\xFCck in die Gegenwart!",desc:"Code eingeben, 'Zeitmaschine starten' (Countdown), Schatzkiste \xF6ffnen. Alle sind wieder da!",dauer:5,typ:"finale",hint:"Countdown gemeinsam runterz\xE4hlen. Schatz = Dino-Spielzeug + S\xFC\xDFes."}],gross:[{name:"Systematische Ausgrabung",desc:"Planquadrate im Garten/Sandkasten. Jedes Team gr\xE4bt ein Quadrat und dokumentiert jeden Fund mit Koordinaten auf einer Karte.",dauer:12,typ:"teamwork",hint:"Schnur + Pfl\xF6cke f\xFCr Planquadrate. Dokumentations-Vorlage drucken."},{name:"Fossil-Bestimmung",desc:"5 'Fossilien' bestimmen: Name, Alter, Pflanzenfresser/Fleischfresser. Lexikon liegt bereit. Buchstaben der richtigen Antworten = L\xF6sungswort.",dauer:10,typ:"r\xE4tseln",hint:"Dino-Lexikon ausleihen oder Infoblatt drucken."},{name:"Evolution-Timeline",desc:"10 Dino-Karten in die richtige zeitliche Reihenfolge bringen. Trias \u2192 Jura \u2192 Kreide. Bonus: Welcher lebte am l\xE4ngsten?",dauer:8,typ:"r\xE4tseln",hint:"Karten mit Dino-Namen + Zeitraum. L\xF6sung auf der R\xFCckseite."},{name:"Dino-Escape",desc:"Der Meteor kommt! 5 R\xE4tsel in 15 Minuten l\xF6sen um die 'Rettungskapsel' zu \xF6ffnen: Mathe, Logik, Dino-Wissen, Puzzle, Geheimschrift.",dauer:15,typ:"r\xE4tseln",hint:"Timer laufen lassen! 5 Umschl\xE4ge mit je einem R\xE4tsel."},{name:"Museum er\xF6ffnen",desc:"Alle Funde auslegen, beschriften und ein 'Mini-Museum' er\xF6ffnen. Feierliche Er\xF6ffnung + Schatz.",dauer:5,typ:"finale",hint:"Tisch als Vitrine. Kinder stellen ihre Funde aus."}]},material:{klein:["15\u201320 Plastik-Eier oder bemalte Steine","Flasche + Essig + Natron + Sp\xFCli + Lebensmittelfarbe","Musikbox","4 Dino-Fu\xDFspuren + 4 Dino-Bilder","Dino-Figur + Schatzkiste"],mittel:["Wanne + Sand + Salzteig-Fossilien + Pinsel","10 Quiz-Fragen + Zahlen 1-2-3","2\xD7 Flasche + Sand + Vulkan-Material","Zahlen an Stationen","Schatz + Countdown"],gross:["Schnur + Pfl\xF6cke + Dokumentations-Vorlage","5 Fossilien-Bilder + Dino-Lexikon","10 Dino-Zeitkarten","5 R\xE4tsel-Umschl\xE4ge + Timer","Tisch + Beschriftungskarten + Schatz"]},schatz:["Mini-Dinos","Fossilien-Sticker","Dino-Stempel","Ausgrabungs-Sets","Dino-Tattoos"]},{id:"feen",name:"Feenzauber im Wald",emoji:"\u{1F9DA}",color:"#AB47BC",intro:{klein:"Die kleine Fee Lila hat ihren Zauberstab verloren! {name}, ohne ihn kann sie nicht mehr zaubern. Helft ihr, ihn zu finden!",mittel:"Das Feenreich ist in Gefahr! Der b\xF6se Troll hat alle Regenbogenfarben gestohlen. {name}, sammelt die Farben an 5 Stationen zur\xFCck!",gross:"{name}, ihr wurdet in die Feenakademie eingeladen. Um aufgenommen zu werden, m\xFCsst ihr 5 magische Pr\xFCfungen bestehen."},stations:{klein:[{name:"Feenstaub sammeln",desc:"Glitzersteine (bunte Glassteine) im Gras/Raum versteckt. Jedes Kind sammelt Feenstaub in einen kleinen Beutel.",dauer:8,typ:"suchen",hint:"Bunte Deko-Steine aus dem Bastelladen. 5\u20138 pro Kind."},{name:"Zauberstab basteln",desc:"Holzstab + Glitzer + B\xE4nder + Sternform aus Pappe = eigener Zauberstab! Jedes Kind gestaltet seinen.",dauer:10,typ:"basteln",hint:"Holzspie\xDFe (Spitze abschneiden!), Glitzerkleber, bunte B\xE4nder, Sterne aus Goldpappe."},{name:"Blumen-Tanz",desc:"Tanzen wie Blumen im Wind: bei leiser Musik sanft wiegen, bei lauter Musik wild tanzen, bei Stopp als Blume 'einfrieren'.",dauer:8,typ:"action",hint:"Verschiedene Tempi. Kinder sanft mitmachen lassen."},{name:"Regenbogen-Puzzle",desc:"7 bunte Streifen (Regenbogenfarben) sind versteckt. In der richtigen Reihenfolge zusammenlegen = Hinweis zum Zauberstab.",dauer:8,typ:"suchen",hint:"Streifen aus Tonpapier. Auf der R\xFCckseite: ein Pfeil zum Versteck."},{name:"Zauberstab gefunden!",desc:"Der Zauberstab (glitzernder Stock) liegt an der letzten Station. Fee Lila (Puppe/Bild) bedankt sich mit einem Schatz!",dauer:5,typ:"finale",hint:"Glitzer-Stock vorbereiten. Puppe als Fee Lila verkleiden."}],mittel:[{name:"Magische Zutat: Feenstaub",desc:"Bunte Perlen in Farbe ROT im Geb\xFCsch/Raum finden. Nur die roten z\xE4hlen! Wer die meisten findet, f\xFChrt zum n\xE4chsten Ort.",dauer:8,typ:"suchen",hint:"Verschiedenfarbige Perlen verteilen, aber nur rote sammeln."},{name:"Magische Zutat: Troll-Schleim besiegen",desc:"Schleim (aus Bastelkleber) herstellen und darin eine versteckte Perle in Farbe ORANGE finden. Matschig aber magisch!",dauer:10,typ:"basteln",hint:"Schleim-Set vorbereiten. Orange Perle vor dem Mischen reinlegen."},{name:"Magische Zutat: Regenbogen-Wasser",desc:"3 Gl\xE4ser mit gef\xE4rbtem Wasser (rot, gelb, blau). Mischen um GR\xDCN, ORANGE und LILA herzustellen. Farbenlehre!",dauer:8,typ:"r\xE4tseln",hint:"Lebensmittelfarbe + Wasser. Kinder lernen spielerisch Farbmischung."},{name:"Magische Zutat: Sternen-R\xE4tsel",desc:"5 Sterne mit je einem Buchstaben. In der richtigen Reihenfolge = Zauberwort. Zauberwort laut rufen = n\xE4chster Hinweis.",dauer:5,typ:"r\xE4tseln",hint:"Sterne aus Goldpappe mit Buchstaben. L\xF6sungswort: MAGIE."},{name:"Regenbogen wiederhergestellt!",desc:"Alle Farben gesammelt! Der Regenbogen erscheint (buntes Tuch/Band) und darunter liegt der Feenschatz.",dauer:5,typ:"finale",hint:"Buntes Tuch \xFCber einen Bogen spannen. Schatzkiste darunter."}],gross:[{name:"Feen-Aufnahmepr\xFCfung 1: Wissen",desc:"10 Fragen \xFCber Natur, Pflanzen, Tiere, Jahreszeiten. Jede richtige Antwort = ein Buchstabe des Zauberspruchs.",dauer:10,typ:"r\xE4tseln",hint:"Fragen \xFCber echte Natur: Welcher Baum verliert keine Bl\xE4tter? etc."},{name:"Feen-Aufnahmepr\xFCfung 2: Geschick",desc:"Hindernisparcours durch den 'Zauberwald': unter B\xE4ndern durch, \xFCber Steine balancieren, Ringe auf St\xE4be werfen.",dauer:10,typ:"action",hint:"B\xE4nder + Steine + Ringe + St\xE4be. Parcours im Garten."},{name:"Feen-Aufnahmepr\xFCfung 3: Kreativit\xE4t",desc:"In 10 Minuten: ein Feenhaus aus Naturmaterialien bauen. St\xF6cke, Bl\xE4tter, Moos, Steine. Wer baut das Sch\xF6nste?",dauer:12,typ:"basteln",hint:"Naturmaterialien vorher sammeln oder sammeln lassen."},{name:"Feen-Aufnahmepr\xFCfung 4: Zaubertrank",desc:"Nach 'Rezept' (Anleitung) einen Zaubertrank mischen: Limonade + Brausepulver + Lebensmittelfarbe = sprudelnder Trank! Trinken erlaubt.",dauer:8,typ:"basteln",hint:"Sprite/Wasser + Brausepulver + Lebensmittelfarbe. Becher pro Kind."},{name:"Feierliche Aufnahme",desc:"Alle Pr\xFCfungen bestanden! Feierliche Aufnahme in die Feenakademie: Urkunde + Feenstab + Schatz.",dauer:5,typ:"finale",hint:"Urkunde drucken. Feierlich vorlesen!"}]},material:{klein:["Bunte Glassteine + kleine Beutel","Holzst\xE4be + Glitzer + B\xE4nder + Sterne","Musikbox","7 bunte Papierstreifen","Glitzer-Stock + Fee-Puppe + Schatz"],mittel:["Bunte Perlen (v.a. rote)","Bastelkleber + Kontaktlinsen-L\xF6sung + orange Perle","Lebensmittelfarbe + 3 Gl\xE4ser + Wasser","5 Goldsterne mit Buchstaben","Buntes Tuch + Schatzkiste"],gross:["10 Natur-Quizfragen","B\xE4nder + Steine + Ringe + St\xE4be","Naturmaterialien (St\xF6cke, Bl\xE4tter, Moos)","Limonade + Brausepulver + Lebensmittelfarbe + Becher","Urkunde + Feenstab + Schatz"]},schatz:["Glitzer-Steine","Schmetterlings-Sticker","Perlen-Armb\xE4nder","Feenstab","Blumen-Tattoos"]},{id:"safari",name:"Safari-Schatzsuche",emoji:"\u{1F981}",color:"#D4A574",intro:{klein:"Im Safari-Park sind die Tierbabys ausgebüxt! {name}, helft Ranger Rudi, alle 5 Tierbabys wiederzufinden!",mittel:"Rangerin Ava hat eine geheimnisvolle Spur entdeckt — sie führt zum legendären Goldenen Löwen. {name}, folgt den Tierspuren durch die Savanne!",gross:"Euer Expeditionsteam wurde gerufen: In der Savanne ist ein seltenes Tier gesichtet worden. {name}, dokumentiert die Spur, sammelt Beweise und findet es — bevor die Sonne untergeht."},stations:{klein:[{name:"Tierspuren folgen",desc:"Pfotenabdrücke aus Tonpapier liegen auf dem Boden. Die Kinder folgen den Spuren von Station zu Station.",dauer:5,typ:"suchen",hint:"Große Pfotenabdrücke in Pfeilrichtung auslegen. Gut sichtbar!"},{name:"Tierbabys retten",desc:"Kuscheltiere (Löwe, Elefant, Giraffe, Zebra, Affe) sind im Garten/Raum versteckt. Jedes Kind rettet ein Tierbaby.",dauer:8,typ:"suchen",hint:"5–8 Kuscheltiere nicht zu schwer verstecken."},{name:"Safari-Fernglas basteln",desc:"Zwei Klopapierrollen zusammenkleben und bunt bemalen = Safari-Fernglas! Jedes Kind bastelt sein eigenes.",dauer:10,typ:"basteln",hint:"Rollen, Kleber, Stifte, Schnur zum Umhängen vorbereiten."},{name:"Tier-Geräusche raten",desc:"Handy spielt Tiergeräusche ab. Wer das Tier errät, bekommt einen Sticker. 8 Runden.",dauer:8,typ:"rätseln",hint:"YouTube: 'Safari Tiergeräusche'. Vorher Lautstärke testen."},{name:"Ranger-Belohnung",desc:"Alle Tierbabys gerettet! Ranger Rudi (Bild/Puppe) bedankt sich mit einer Schatzkiste voller Überraschungen.",dauer:5,typ:"finale",hint:"Schatzkiste mit Tierfiguren + Süßes. Urkunde 'Junior-Ranger'."}],mittel:[{name:"Geheime Safari-Karte",desc:"Eine Karte mit Tiersilhouetten statt Ortsnamen. Kinder müssen die Tiere erkennen und den richtigen Weg finden.",dauer:8,typ:"rätseln",hint:"Karte vorher zeichnen. Einfache Silhouetten: Elefant, Löwe, Giraffe."},{name:"Wasserloch-Challenge",desc:"Einen Ball auf einem Löffel durch einen Slalom balancieren — ohne ins 'Krokodil-Wasser' zu fallen! Wer schafft es?",dauer:8,typ:"geschick",hint:"Pylonen als Slalom. Tischtennisball auf Esslöffel."},{name:"Tier-Steckbrief",desc:"Jedes Kind bekommt ein Tierfoto und füllt einen Steckbrief aus: Name, Futter, Lebensraum, Besonderheit.",dauer:10,typ:"rätseln",hint:"Steckbrief-Vorlage drucken. 5 verschiedene Tier-Fotos."},{name:"Savanne-Staffel",desc:"Zwei Teams im Wettlauf: Ball auf Löffel + durch Tunnel + Slalom. Schnellstes Team bekommt den nächsten Hinweis.",dauer:10,typ:"action",hint:"Parcours vorher aufbauen und testen."},{name:"Der Goldene Löwe",desc:"Am Ende der Spur: eine goldene Löwenfigur (Spielzeug in Goldfolie) bewacht die Schatzkiste.",dauer:5,typ:"finale",hint:"Löwenfigur in Alufolie/Goldpapier wickeln. Dramatisch inszenieren!"}],gross:[{name:"Koordinaten entschlüsseln",desc:"Verschlüsselte GPS-Koordinaten: Mathe-Aufgaben lösen ergibt Zahlen, die auf einer selbstgezeichneten Karte den nächsten Punkt zeigen.",dauer:8,typ:"rätseln",hint:"Karte vom Gelände zeichnen. 5 Koordinaten-Aufgaben."},{name:"Tier-Bestimmung",desc:"An 5 Stellen: Fotos von Spuren, Federn, Fellmustern. Teams bestimmen das Tier und notieren den Anfangsbuchstaben = Lösungswort.",dauer:10,typ:"rätseln",hint:"Bilder ausdrucken. Lösung vorher festlegen (z.B. SAFARI)."},{name:"Überlebens-Training",desc:"3 Aufgaben: Wasser filtern (Sand+Kies+Tuch), Entfernung schätzen, essbare vs. giftige Pflanzen erkennen (Bildkarten).",dauer:12,typ:"geschick",hint:"Filter vorher testen! Pflanzen-Bildkarten vorbereiten."},{name:"Safari-Quiz-Duell",desc:"20 Fragen über Tiere, Savanne, Natur. Teams buzzern mit Küchenglöckchen. Jede richtige Antwort = ein Code-Teil.",dauer:10,typ:"rätseln",hint:"Fragen vorher recherchieren. 'Wie schnell rennt ein Gepard?' etc."},{name:"Expedition erfolgreich!",desc:"Der Code öffnet die Schatztruhe (Zahlenschloss). Alle Beweise zusammen = seltenes Tier identifiziert + Schatz!",dauer:5,typ:"finale",hint:"3-stelliges Zahlenschloss. Pro Station eine Ziffer vergeben."}]},material:{klein:["Pfotenabdrücke aus Tonpapier","5–8 Kuscheltiere","Klopapierrollen + Kleber + Stifte + Schnur","Handy mit Tiergeräuschen + Sticker","Schatzkiste + Junior-Ranger-Urkunde"],mittel:["Selbstgezeichnete Safari-Karte","Löffel + Tischtennisbälle + Pylonen","Steckbrief-Vorlage + Tier-Fotos","Parcours-Material (Tunnel, Pylonen)","Goldene Löwenfigur + Schatzkiste"],gross:["Gelände-Karte + Mathe-Aufgaben","Tierspuren-Fotos + Stift + Zettel","Filter-Material + Pflanzen-Bildkarten","20 Quiz-Fragen + Küchenglöckchen","Zahlenschloss + Schatztruhe"]},schatz:["Mini-Tierfiguren","Safari-Sticker","Tier-Tattoos","Fernglas-Spielzeug","Schoko-Goldmünzen"]},{id:"einhorn",name:"Einhorn-Schatzsuche",emoji:"\u{1F984}",color:"#EC407A",intro:{klein:"Das kleine Einhorn Sternchen hat seine Regenbogenfarben verloren! {name}, helft ihm, alle Farben wiederzufinden!",mittel:"Im Einhorn-Königreich ist der magische Kristall verschwunden. {name}, ohne ihn verblasst der Regenbogen! Folgt den Glitzerspuren und rettet die Magie!",gross:"Ihr wurdet zur geheimen Einhorn-Akademie eingeladen. {name}, um aufgenommen zu werden, müsst ihr 5 magische Prüfungen bestehen und den Regenbogen-Kristall finden."},stations:{klein:[{name:"Regenbogen-Spur folgen",desc:"Bunte Papierstreifen in Regenbogenfarben liegen auf dem Boden und bilden einen Weg. Die Kinder galoppieren wie Einhörner von Farbe zu Farbe.",dauer:5,typ:"suchen",hint:"Tonpapier in 7 Farben, als Spur auf den Boden legen. Galoppieren vormachen!"},{name:"Einhorn-Verkleidung",desc:"Jedes Kind bastelt sein Einhorn-Horn (Partyhut mit Alufolie) und eine bunte Mähne (Krepppapierstreifen an Haarreif).",dauer:10,typ:"basteln",hint:"Partyhüte, Alufolie, Haarreife, Krepppapier in Regenbogenfarben, Kleber."},{name:"Hufeisenwerfen",desc:"Ringe (aus Pappe ausgeschnitten) auf einen Stock werfen — wie ein echtes Hufeisen-Spiel! 3 Versuche pro Kind.",dauer:8,typ:"geschick",hint:"Ringe aus Pappe (20cm Durchmesser), Stock im Boden oder in Eimer mit Sand."},{name:"Regenbogen malen",desc:"Jedes Kind malt seinen eigenen Regenbogen auf eine große Karte. Die fertigen Bilder zusammenlegen = ein Riesen-Regenbogen!",dauer:8,typ:"basteln",hint:"Große Papierbögen, Wasserfarben oder dicke Buntstifte. Boden mit Folie schützen."},{name:"Sternchens Schatz!",desc:"Am Ende des Regenbogens wartet das Einhorn Sternchen (Kuscheltier) mit einer glitzernden Schatzkiste!",dauer:5,typ:"finale",hint:"Schatzkiste mit Glitzerpapier bekleben. Kuscheltier-Einhorn daneben."}],mittel:[{name:"Geheime Regenbogen-Botschaft",desc:"Eine Nachricht mit weißem Wachsmalstift auf weißem Papier — mit Wasserfarben drübermalen und die Botschaft erscheint!",dauer:8,typ:"rätseln",hint:"Vorher Nachricht mit weißem Wachsstift schreiben. Wasserfarben + Pinsel bereitlegen."},{name:"Einhorn-Rennen",desc:"Mit einem Partyhut als Horn auf dem Kopf durch einen Slalom galoppieren — ohne dass das Horn runterfällt! Staffel in 2 Teams.",dauer:10,typ:"action",hint:"Partyhüte + Pylonen. Strecke nicht zu lang, dafür lustig!"},{name:"Kristallhöhle",desc:"In einem abgedunkelten Raum mit einer Taschenlampe versteckte Kristalle (bunte Glassteine in Alufolie) finden. Die Kristalle glitzern im Licht!",dauer:10,typ:"suchen",hint:"Raum abdunkeln. 15–20 Steine in Alufolie an verschiedenen Stellen. Taschenlampe pro Kind."},{name:"Regenbogen-Code",desc:"7 Umschläge in Regenbogenfarben, jeder enthält einen Buchstaben. In der richtigen Farbreihenfolge (Rot→Violett) ergeben sie das Lösungswort.",dauer:8,typ:"rätseln",hint:"7 bunte Umschläge, darin je ein Buchstabe. Lösungswort: KRISTALL oder EINHORN."},{name:"Der magische Kristall",desc:"Das Lösungswort laut rufen — und der magische Kristall (LED-Teelicht in bunter Folie) leuchtet auf! Darunter: die Schatzkiste.",dauer:5,typ:"finale",hint:"LED-Teelicht in Cellophan-Folie = leuchtender Kristall."}],gross:[{name:"Verschlüsselte Sternenkarte",desc:"Eine Karte mit Symbolen statt Ortsnamen. Übersetzungstabelle (Stern=A, Mond=B, Herz=C) liegt bereit. Die Nachricht verrät den nächsten Ort.",dauer:10,typ:"rätseln",hint:"Symbole erfinden, Tabelle ausdrucken. 5–8 Wörter verschlüsseln."},{name:"Einhorn-Triathlon",desc:"3 Disziplinen: Hufeisenwerfen (Ringe auf Stab), Hindernis-Galopp (Slalom mit Horn), Regenbogen-Staffel (7 bunte Bälle der Reihe nach einsammeln).",dauer:12,typ:"action",hint:"Ringe + Stab, Partyhüte + Pylonen, 7 bunte Bälle in Eimer."},{name:"Regenbogen-Experiment",desc:"Naturwissenschaft trifft Magie! Milch + Lebensmittelfarbe + Spülmittel = explodierende Regenbogen-Muster. Jedes Kind macht sein eigenes.",dauer:10,typ:"basteln",hint:"Flache Teller, Vollmilch, Lebensmittelfarbe (3 Farben), Spülmittel + Wattestäbchen."},{name:"Kristall-Code knacken",desc:"An jeder Station gab es eine Zahl. Alle Zahlen zusammen = Code für das magische Zahlenschloss der Schatztruhe.",dauer:5,typ:"rätseln",hint:"Pro Station eine gut sichtbare Zahl. 3-stelliger Code."},{name:"Aufnahme ins Einhorn-Reich",desc:"Code eingeben, Schatztruhe öffnen! Feierliche Aufnahme mit Urkunde + Einhorn-Schatz für alle.",dauer:5,typ:"finale",hint:"Urkunde 'Offizielle Einhorn-Hüterin'. Zahlenschloss kaufen (3€)."}]},material:{klein:["Tonpapier in 7 Regenbogenfarben","Partyhüte + Alufolie + Haarreife + Krepppapier","Pappringe + Stock im Eimer","Große Papierbögen + Wasserfarben","Einhorn-Kuscheltier + Glitzer-Schatzkiste"],mittel:["Weißer Wachsstift + Wasserfarben + Pinsel","Partyhüte + Pylonen","Glassteine + Alufolie + Taschenlampen + dunkler Raum","7 bunte Umschläge + Buchstaben","LED-Teelicht + bunte Folie + Schatzkiste"],gross:["Symbol-Alphabet + verschlüsselte Karte","Ringe + Stab + Partyhüte + bunte Bälle","Milch + Lebensmittelfarbe + Spülmittel + flache Teller","Zahlen an Stationen","Zahlenschloss + Urkunde + Schatztruhe"]},schatz:["Mini-Einhorn-Figuren","Regenbogen-Haargummis","Glitzer-Tattoos","Einhorn-Sticker","Bunte Glassteine"]},{id:"feuerwehr",name:"Feuerwehr-Rettungsmission",emoji:"\u{1F692}",color:"#D32F2F",intro:{klein:"Oh nein, im Spielzeugland brennt es! {name}, zieht eure Feuerwehrhelme an und löscht alle Feuer!",mittel:"Notruf in der Feuerwache! {name}, ein geheimnisvolles Feuer bedroht die Stadt. Euer Team muss 5 Einsätze meistern, um den Brandstifter zu finden!",gross:"Alarm in der Zentrale: Mehrere Brandherde in der Stadt! {name}, euer Löschzug muss unter Zeitdruck 5 Einsatzorte abarbeiten, Beweise sichern und den Fall lösen."},stations:{klein:[{name:"Feuerwehrhelm basteln",desc:"Aus rotem Tonpapier und einem Pappteller wird ein Feuerwehrhelm gebastelt. Jedes Kind bekommt eine Nummer drauf.",dauer:10,typ:"basteln",hint:"Rotes Tonpapier, Pappteller, Kleber, Marker für Nummern. Vorlage vorzeichnen."},{name:"Feuer löschen!",desc:"'Flammen' (rote/orange Pappkegel) stehen auf dem Boden. Mit nassen Schwämmen umwerfen = Feuer gelöscht!",dauer:8,typ:"action",hint:"Rote Becher oder Kegel als Flammen. Nasse Schwämme, Eimer mit Wasser."},{name:"Rettungseinsatz",desc:"Kuscheltiere sind in 'brennenden Häusern' (unter Decken/hinter Kissen) eingesperrt. Jedes Kind rettet ein Tier und bringt es ins Krankenhaus (Decke).",dauer:8,typ:"suchen",hint:"5–8 Kuscheltiere verstecken. Nicht zu schwer!"},{name:"Tatü-Tata-Tanz",desc:"Musik an = tanzen! Wenn die Sirene ertönt (Trillerpfeife) = alle auf den Boden legen! Wer zu langsam ist, scheidet aus.",dauer:8,typ:"action",hint:"Trillerpfeife oder Sirenen-Sound vom Handy. Laut und lustig!"},{name:"Große Belohnung!",desc:"Alle Feuer gelöscht! Feuerwehrhauptmann (Bild/Puppe) überreicht die Feuerwehr-Schatzkiste + Urkunde 'Junior-Feuerwehr'.",dauer:5,typ:"finale",hint:"Schatzkiste rot anmalen. Urkunden vordrucken."}],mittel:[{name:"Notruf entschlüsseln",desc:"Ein Notruf kam rein — aber verschlüsselt! Die Buchstaben sind vertauscht (Anagramm). Kinder lösen das Wort-Rätsel und finden den ersten Einsatzort.",dauer:8,typ:"rätseln",hint:"Einfaches Anagramm: UEREF → FEUER. Buchstaben auf Karten."},{name:"Lösch-Staffel",desc:"Zwei Teams! Wasser mit Becher von Eimer A nach Eimer B transportieren — ohne zu verschütten! Welches Team füllt schneller?",dauer:10,typ:"action",hint:"2 große Eimer + kleine Becher. Handtücher für Spritzer!"},{name:"Hindernis-Training",desc:"Feuerwehr-Parcours: unter Seilen durchrobben (Rauch!), über Kissen klettern (Trümmer!), Ball in Eimer werfen (Wasserstrahl!).",dauer:10,typ:"action",hint:"Seile, Kissen, Bälle, Eimer. Parcours vorher aufbauen."},{name:"Brandursache finden",desc:"Am 'Tatort' liegen 5 Hinweise (Streichholz, Kabel, Zeitung, Kerze, Lupe). Kinder kombinieren: Welcher Hinweis passt zum Brand?",dauer:8,typ:"rätseln",hint:"Gegenstände sammeln/basteln. Lösung: die kaputte Kerze."},{name:"Fall gelöst!",desc:"Der Brandstifter ist entlarvt (die umgefallene Kerze!). Feuerwehr-Urkunde + Schatzkiste für das ganze Team.",dauer:5,typ:"finale",hint:"Urkunde drucken: 'Feuerwehr-Ermittler*in'. Medaillen aus Pappe."}],gross:[{name:"Verschlüsselter Funkspruch",desc:"Eine Nachricht in Morsecode. Übersetzungstabelle liegt bereit. Die Nachricht enthält den ersten Einsatzort.",dauer:10,typ:"rätseln",hint:"Kurze Nachricht in Morsecode. Tabelle ausdrucken."},{name:"Rettungstraining",desc:"3 Stationen: Seil-Klettern (waagerecht), Verletzte transportieren (Kuscheltier auf Trage aus Stöcken + Decke), Zielwerfen mit Wasserspritze.",dauer:12,typ:"action",hint:"Seil am Boden oder zwischen Bäumen, Stöcke + Decke als Trage, Wasserspritze + Zielscheibe."},{name:"Erste-Hilfe-Quiz",desc:"15 Fragen zu Brandschutz und Erster Hilfe. Teams buzzern. Pro richtige Antwort ein Code-Teil für die letzte Station.",dauer:10,typ:"rätseln",hint:"Fragen vorher recherchieren: Notrufnummer, Verhalten bei Brand, stabile Seitenlage."},{name:"Brandermittlung",desc:"UV-Stift-Hinweise an 5 Orten im Raum. Mit UV-Lampe finden und zusammensetzen = der Brandort + Ursache.",dauer:10,typ:"suchen",hint:"UV-Stift + UV-Lampe. Hinweise an Wänden/Möbeln."},{name:"Einsatz abgeschlossen!",desc:"Alle Codes zusammen = Kombination fürs Zahlenschloss der Einsatz-Truhe. Mission erfolgreich!",dauer:5,typ:"finale",hint:"3-stelliges Zahlenschloss. Pro Station eine Ziffer."}]},material:{klein:["Rotes Tonpapier + Pappteller + Marker","Rote Becher/Kegel + nasse Schwämme + Eimer","5–8 Kuscheltiere + Decken","Trillerpfeife oder Sirenen-Sound + Musikbox","Rote Schatzkiste + Junior-Feuerwehr-Urkunde"],mittel:["Buchstaben-Karten für Anagramm","2 Eimer + Becher + Handtücher","Seile + Kissen + Bälle + Eimer (Parcours)","5 Hinweis-Gegenstände (Streichholz, Kabel etc.)","Urkunde + Pappe-Medaillen + Schatzkiste"],gross:["Morsecode-Tabelle + verschlüsselte Nachricht","Seil + Stöcke + Decke + Wasserspritze + Zielscheibe","15 Quiz-Fragen + Küchenglöckchen","UV-Stift + UV-Lampe + 5 versteckte Hinweise","Zahlenschloss + Einsatz-Truhe + Schatz"]},schatz:["Mini-Feuerwehrautos","Feuerwehr-Sticker","Feuerwehr-Abzeichen (Pappe)","Trillerpfeifen","Gummibärchen-Tüten"]}];

var SZ_SHOP_ITEMS = {piraten:[{name:"Schatztruhe (Holz, klein)",cat:"pflicht",url:"https://www.amazon.de/s?k=schatztruhe+holz+kinder&tag=machsleicht-21"},{name:"Goldm\xFCnzen 100 Stk.",cat:"pflicht",url:"https://www.amazon.de/s?k=goldm%C3%BCnzen+piraten+kinder&tag=machsleicht-21"},{name:"Zahlenschloss 3-stellig",cat:"sinnvoll",url:"https://www.amazon.de/s?k=zahlenschloss+3+stellig&tag=machsleicht-21"},{name:"Piraten-Augenklappen 12 Stk.",cat:"sinnvoll",url:"https://www.amazon.de/s?k=piraten+augenklappen+kinder&tag=machsleicht-21"},{name:"Fernrohr Kinder",cat:"sinnvoll",url:"https://www.amazon.de/s?k=fernrohr+kinder+piraten&tag=machsleicht-21"},{name:"Klopapierrollen / Zeitungspapier",cat:"pflicht",url:null}],dschungel:[{name:"Tierfiguren-Set 12 Stk.",cat:"pflicht",url:"https://www.amazon.de/s?k=tierfiguren+set+kinder+dschungel&tag=machsleicht-21"},{name:"Lupe Kinder",cat:"sinnvoll",url:"https://www.amazon.de/s?k=lupe+kinder&tag=machsleicht-21"},{name:"Fernglas Kinder",cat:"sinnvoll",url:"https://www.amazon.de/s?k=fernglas+kinder&tag=machsleicht-21"},{name:"Seil 5m",cat:"pflicht",url:"https://www.amazon.de/s?k=seil+kinder+parcours&tag=machsleicht-21"},{name:"Matte / Kissen",cat:"pflicht",url:null}],weltraum:[{name:"Glow-in-the-Dark Sterne",cat:"sinnvoll",url:"https://www.amazon.de/s?k=leuchtsterne+kinder+zimmer&tag=machsleicht-21"},{name:"Alien-Schleim Set",cat:"pflicht",url:"https://www.amazon.de/s?k=schleim+set+kinder+glitzer&tag=machsleicht-21"},{name:"Zahlenschloss 3-stellig",cat:"sinnvoll",url:"https://www.amazon.de/s?k=zahlenschloss+3+stellig&tag=machsleicht-21"},{name:"Styroporb\xE4lle (Planeten)",cat:"pflicht",url:"https://www.amazon.de/s?k=styroporkugeln+set+basteln&tag=machsleicht-21"},{name:"Taschenlampe / UV-Lampe",cat:"sinnvoll",url:"https://www.amazon.de/s?k=uv+taschenlampe+kinder&tag=machsleicht-21"}],detektiv:[{name:"Fingerabdruck-Set Kinder",cat:"pflicht",url:"https://www.amazon.de/s?k=fingerabdruck+set+kinder+detektiv&tag=machsleicht-21"},{name:"Lupe Kinder",cat:"pflicht",url:"https://www.amazon.de/s?k=lupe+kinder+detektiv&tag=machsleicht-21"},{name:"Geheimstift UV",cat:"sinnvoll",url:"https://www.amazon.de/s?k=geheimstift+uv+kinder&tag=machsleicht-21"},{name:"Notizbuch klein",cat:"pflicht",url:"https://www.amazon.de/s?k=notizbuch+klein+kinder&tag=machsleicht-21"},{name:"Zitronensaft / Wattest\xE4bchen",cat:"pflicht",url:null}],dino:[{name:"Dino-Ausgrabungsset",cat:"pflicht",url:"https://www.amazon.de/s?k=dino+ausgrabungsset+kinder&tag=machsleicht-21"},{name:"Vulkan-Experiment Set",cat:"sinnvoll",url:"https://www.amazon.de/s?k=vulkan+experiment+kinder&tag=machsleicht-21"},{name:"Dino-Figuren Set",cat:"pflicht",url:"https://www.amazon.de/s?k=dinosaurier+figuren+set+kinder&tag=machsleicht-21"},{name:"Pinsel Set (Ausgrabung)",cat:"pflicht",url:"https://www.amazon.de/s?k=pinsel+set+kinder+basteln&tag=machsleicht-21"},{name:"Sand / Salzteig",cat:"pflicht",url:null}],feen:[{name:"Glitzer-Set",cat:"pflicht",url:"https://www.amazon.de/s?k=glitzer+set+kinder+basteln&tag=machsleicht-21"},{name:"Zauberstab-Bastelset",cat:"pflicht",url:"https://www.amazon.de/s?k=zauberstab+basteln+kinder&tag=machsleicht-21"},{name:"Perlen Armb\xE4nder Set",cat:"sinnvoll",url:"https://www.amazon.de/s?k=perlen+armband+set+kinder&tag=machsleicht-21"},{name:"Lebensmittelfarbe",cat:"sinnvoll",url:"https://www.amazon.de/s?k=lebensmittelfarbe+set&tag=machsleicht-21"},{name:"Naturmaterialien (St\xF6cke, Bl\xE4tter)",cat:"pflicht",url:null}],safari:[{name:"Tierfiguren-Set 12 Stk.",cat:"pflicht",url:"https://www.amazon.de/s?k=tierfiguren+set+kinder+safari&tag=machsleicht-21"},{name:"Fernglas Kinder",cat:"sinnvoll",url:"https://www.amazon.de/s?k=fernglas+kinder&tag=machsleicht-21"},{name:"Lupe Kinder",cat:"sinnvoll",url:"https://www.amazon.de/s?k=lupe+kinder&tag=machsleicht-21"},{name:"Zahlenschloss 3-stellig",cat:"sinnvoll",url:"https://www.amazon.de/s?k=zahlenschloss+3+stellig&tag=machsleicht-21"},{name:"Klopapierrollen / Stifte",cat:"pflicht",url:null}],einhorn:[{name:"Glitzer-Set Kinder",cat:"pflicht",url:"https://www.amazon.de/s?k=glitzer+set+kinder+basteln&tag=machsleicht-21"},{name:"Einhorn-Figuren Set",cat:"sinnvoll",url:"https://www.amazon.de/s?k=einhorn+figuren+set+kinder&tag=machsleicht-21"},{name:"Schleim-Set Glitzer",cat:"sinnvoll",url:"https://www.amazon.de/s?k=schleim+set+kinder+glitzer&tag=machsleicht-21"},{name:"Zahlenschloss 3-stellig",cat:"sinnvoll",url:"https://www.amazon.de/s?k=zahlenschloss+3+stellig&tag=machsleicht-21"},{name:"Holzstäbe + Bänder (Zauberstab)",cat:"pflicht",url:null}],feuerwehr:[{name:"Feuerwehrhelme Kinder 8 Stk.",cat:"sinnvoll",url:"https://www.amazon.de/s?k=feuerwehrhelm+kinder+party&tag=machsleicht-21"},{name:"Mini-Feuerwehrautos 8 Stk.",cat:"pflicht",url:"https://www.amazon.de/s?k=mini+feuerwehrauto+kinder+set&tag=machsleicht-21"},{name:"UV-Stift + UV-Lampe",cat:"sinnvoll",url:"https://www.amazon.de/s?k=uv+stift+uv+lampe+kinder&tag=machsleicht-21"},{name:"Zahlenschloss 3-stellig",cat:"sinnvoll",url:"https://www.amazon.de/s?k=zahlenschloss+3+stellig&tag=machsleicht-21"},{name:"Rotes Tonpapier + Schwämme",cat:"pflicht",url:null}]};

var SZ_SCHATZ_LINKS = {Goldm\u00FCnzen:"https://www.amazon.de/s?k=goldm%C3%BCnzen+piraten+kinder&tag=machsleicht-21","Mini-Kompass":"https://www.amazon.de/s?k=mini+kompass+kinder&tag=machsleicht-21","Dino-Figuren":"https://www.amazon.de/s?k=dinosaurier+figuren+mini&tag=machsleicht-21",Edelsteine:"https://www.amazon.de/s?k=edelsteine+kinder+schatzsuche&tag=machsleicht-21",Seifenblasen:"https://www.amazon.de/s?k=seifenblasen+kinder+set&tag=machsleicht-21",Sticker:"https://www.amazon.de/s?k=sticker+kinder+set&tag=machsleicht-21",Tattoos:"https://www.amazon.de/s?k=kinder+tattoos+set&tag=machsleicht-21",Schl\u00FCsselanh\u00E4nger:"https://www.amazon.de/s?k=schl%C3%BCsselanh%C3%A4nger+kinder&tag=machsleicht-21",Leuchtsterne:"https://www.amazon.de/s?k=leuchtsterne+kinder&tag=machsleicht-21",Lupe:"https://www.amazon.de/s?k=lupe+kinder&tag=machsleicht-21",Fernrohr:"https://www.amazon.de/s?k=fernrohr+kinder&tag=machsleicht-21",Zauberstab:"https://www.amazon.de/s?k=zauberstab+kinder&tag=machsleicht-21",Glitzer:"https://www.amazon.de/s?k=glitzer+set+kinder&tag=machsleicht-21",Fernglas:"https://www.amazon.de/s?k=fernglas+kinder&tag=machsleicht-21"};

var SZ_TYP_EMOJI = {suchen:"\u{1F50D}",r\u00E4tseln:"\u{1F9E9}",action:"\u{1F3C3}",basteln:"\u2702\uFE0F",geschick:"\u{1F3AF}",teamwork:"\u{1F91D}",finale:"\u{1F381}"};

var SZ_TYP_LABEL = {suchen:"Suchen",r\u00E4tseln:"R\xE4tseln",action:"Action",basteln:"Basteln",geschick:"Geschick",teamwork:"Teamwork",finale:"Finale"};

var SZ_LABELS = { piraten: "Piraten", dschungel: "Dschungel", weltraum: "Weltraum", detektiv: "Detektiv", dino: "Dino", feen: "Feen", safari: "Safari", einhorn: "Einhorn", feuerwehr: "Feuerwehr" };

// kindergeburtstag-data.js — Motto-Daten + Stationen + Greetings

var ageGroup = function(a) { return a <= 5 ? 'klein' : a <= 8 ? 'mittel' : 'gross'; };
var ageLabel = { klein: '3\u20135 Jahre', mittel: '6\u20138 Jahre', gross: '9\u201312 Jahre' };

var GENERIC = [
    {
      id: "safari",
      name: "Safari-Expedition",
      emoji: "\u{1F981}",
      color: "#D4A574",
      cat: "generic",
      spiele: {
        klein: [
          {
            name: "Tierfiguren-Suche",
            desc: "Versteckte Tierfiguren im Raum oder Garten finden \u2014 wie eine echte Mini-Safari!",
            material:
              "10\u201315 kleine Tierfiguren (oder ausgedruckte Tierbilder), Papiert\xFCten als Sammel-Beutel",
            anleitung:
              "1. Verstecke die Tierfiguren vorher im Raum oder Garten (unter Kissen, hinter Blument\xF6pfen, auf Fensterb\xE4nken). 2. Jedes Kind bekommt eine Papiert\xFCte. 3. Auf 'Safari-Start!' suchen alle gleichzeitig. 4. Wer die meisten Tiere findet, ist der Safari-Champion. 5. Tipp: F\xFCr 3-J\xE4hrige nicht zu schwer verstecken!",
            dauer: 20,
          },
          {
            name: "Tier-Ger\xE4usche raten",
            desc: "Tierlaute nachmachen und erraten \u2014 wer kennt die meisten Safari-Tiere?",
            material:
              "Tier-Ger\xE4usche auf dem Handy (YouTube/Spotify), alternativ: ausgedruckte Tierbilder als Hinweis",
            anleitung:
              "1. Spiele ein Tierger\xE4usch ab (L\xF6we, Elefant, Affe, Schlange, Papagei). 2. Die Kinder raten, welches Tier es ist. 3. Wer es err\xE4t, darf das n\xE4chste Ger\xE4usch nachmachen. 4. Variante: Ohne Handy \u2014 ein Kind macht ein Tier nach, die anderen raten. 5. Etwa 8\u201310 Runden spielen.",
            dauer: 10,
          },
          {
            name: "Dschungel-Krabbelparcours",
            desc: "Ein Abenteuer-Parcours \u2014 durch Tunnel kriechen, \xFCber Kissen klettern und unter Seilen durchrobben.",
            material:
              "St\xFChle + Decken (als Tunnel), Kissen (als Steine), Springseil oder W\xE4scheleine (zum Drunterkriechen), Kreppband f\xFCr Markierungen",
            anleitung:
              "1. Baue einen Parcours: Decke \xFCber 2 St\xFChle = Tunnel, Kissen auf dem Boden = Trittsteine, Seil in 30cm H\xF6he = Drunterrobben. 2. Erkl\xE4re die Route. 3. Kinder laufen nacheinander durch. 4. F\xFCr mehr Spa\xDF: Stoppuhr und 'Safari-Rekord' aufstellen. 5. Jedes Kind darf 2\u20133 Runden.",
            dauer: 15,
          },
        ],
        mittel: [
          {
            name: "Safari-Schatzsuche",
            desc: "5 Stationen mit Safari-R\xE4tseln f\xFChren zum versteckten Dschungel-Schatz.",
            material:
              "5 Briefumschl\xE4ge mit R\xE4tseln, Stifte, eine Schatzkiste (Schuhkarton) mit S\xFC\xDFigkeiten/Mitgebseln, Kreppband f\xFCr Markierungen",
            anleitung:
              "1. Bereite 5 Umschl\xE4ge vor, jeder mit einem R\xE4tsel und dem Hinweis zum n\xE4chsten Versteck (z.B. 'Das n\xE4chste R\xE4tsel findest du dort, wo das Wasser flie\xDFt' \u2192 Wasserhahn). 2. R\xE4tsel-Ideen: Tiersilhouetten erkennen, Tierspuren zuordnen, Buchstaben-R\xE4tsel. 3. Am Ende f\xFChrt der letzte Hinweis zur Schatzkiste. 4. Alle Kinder suchen gemeinsam. 5. Schatz wird gerecht aufgeteilt.",
            dauer: 25,
          },
          {
            name: "Tier-Pantomime",
            desc: "Safari-Tiere nachahmen und erraten lassen \u2014 Br\xFCllen, Stampfen und Schleichen erlaubt!",
            material:
              "Zettel mit Tiernamen (L\xF6we, Elefant, Giraffe, Affe, Krokodil, Schlange, Flamingo, Zebra), Sch\xFCssel oder Hut zum Ziehen",
            anleitung:
              "1. Schreibe ca. 15 Tiernamen auf Zettel und falte sie. 2. Ein Kind zieht einen Zettel und stellt das Tier pantomimisch dar (kein Sprechen!). 3. Die anderen raten. Wer es err\xE4t, ist als n\xE4chstes dran. 4. F\xFCr 6\u20138-J\xE4hrige: Timer von 30 Sekunden pro Tier. 5. Punkte z\xE4hlen \u2014 wer err\xE4t die meisten?",
            dauer: 15,
          },
          {
            name: "Dschungel-Parcours",
            desc: "Action-Hindernislauf: Kriechen, Springen, Balancieren \u2014 wie echte Safari-Ranger!",
            material:
              "St\xFChle, Kissen, Seile oder Schn\xFCre, Eimer, Ball, Stoppuhr",
            anleitung:
              "1. Baue 5 Stationen: (a) Unter dem Seil durchrobben, (b) \xDCber Kissen-Steine springen, (c) Auf einem Seil balancieren (auf dem Boden liegend), (d) Ball in Eimer werfen, (e) Slalom um St\xFChle. 2. Kinder laufen einzeln auf Zeit. 3. Jedes Kind darf 2 Versuche. 4. Beste Zeit gewinnt den 'Ranger-Orden'. 5. Tipp: Erst gemeinsam \xFCben, dann auf Zeit.",
            dauer: 20,
          },
        ],
        gross: [
          {
            name: "Safari-Rallye mit Quiz",
            desc: "Stationen mit Wissensfragen \xFCber Tiere + sportliche Challenges \u2014 eine echte Expedition!",
            material:
              "Quiz-Karten (selbst erstellt oder ausgedruckt), Stift + Papier f\xFCr Punkte, Requisiten f\xFCr Challenges (Seil, B\xE4lle, Eimer)",
            anleitung:
              "1. Bereite 6 Stationen vor: 3 Quiz-Stationen (Tierwissen), 3 Challenge-Stationen (Seilklettern, Zielwerfen, Schleichen). 2. Teile die Kinder in 2 Teams. 3. An jeder Station gibts Punkte (1\u20133). 4. Quiz-Beispiele: 'Wie schnell rennt ein Gepard?' oder 'Was frisst eine Giraffe?' 5. Nach allen Stationen: Punkte zusammenz\xE4hlen, Siegerehrung.",
            dauer: 30,
          },
          {
            name: "Tier-Tabu",
            desc: "Safari-Tiere beschreiben ohne bestimmte W\xF6rter zu benutzen \u2014 kniffliger als gedacht!",
            material:
              "Tabu-Karten (Tier + 3\u20134 verbotene W\xF6rter), Timer (Handy), Punktetafel",
            anleitung:
              "1. Erstelle 20 Karten, z.B.: 'L\xF6we' \u2014 verboten: M\xE4hne, K\xF6nig, br\xFCllen, Katze. 2. Zwei Teams bilden. 3. Ein Kind beschreibt, sein Team r\xE4t. 30 Sekunden pro Karte. 4. Verbotenes Wort gesagt? Punkt f\xFCr das andere Team! 5. 3 Runden pro Team. 6. Team mit den meisten Punkten gewinnt.",
            dauer: 15,
          },
          {
            name: "Foto-Safari",
            desc: "Mit dem Handy auf Fotojagd \u2014 wer fotografiert alles von der Liste?",
            material:
              "1 Handy pro Team (oder Kamera), ausgedruckte Foto-Liste (10\u201312 Aufgaben), Stift zum Abhaken",
            anleitung:
              "1. Erstelle eine Foto-Liste: 'etwas Gr\xFCnes', 'ein Tier (egal welches)', 'etwas das fliegt', 'alle Teammitglieder machen ein Tier nach', 'etwas Rundes in der Natur'. 2. Teams bekommen je ein Handy + Liste. 3. 15 Minuten Zeit. 4. Danach gemeinsam die Fotos anschauen und bewerten. 5. Kreativste Fotos gewinnen Bonuspunkte.",
            dauer: 20,
          },
        ],
      },
      deko: [
        {
          name: "Safari Teller+Becher (8 Pers.)",
          price: 12.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F981}",
          url: "https://www.amazon.de/s?k=safari+kindergeburtstag+teller+becher&tag=machsleicht-21",
        },
        {
          name: "Dschungel-Luftballons 15 Stk.",
          price: 7.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F388}",
          url: "https://www.amazon.de/s?k=dschungel+luftballons+kindergeburtstag&tag=machsleicht-21",
        },
        {
          name: "Tiermasken zum Basteln 12 Stk.",
          price: 8.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F3AD}",
          url: "https://www.amazon.de/s?k=tiermasken+basteln+kinder&tag=machsleicht-21",
        },
      ],
      dekoMin: [
        {
          name: "Gr\xFCne Tischdecke",
          price: 3.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F33F}",
          url: "https://www.amazon.de/s?k=gr%C3%BCne+tischdecke+party&tag=machsleicht-21",
        },
        {
          name: "Gr\xFCne Luftballons 10 Stk.",
          price: 2.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F388}",
          url: "https://www.amazon.de/s?k=gr%C3%BCne+luftballons&tag=machsleicht-21",
        },
      ],
      mitgebsel: [
        {
          name: "Mini-Tierfiguren 12 Stk.",
          price: 8.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F992}",
          url: "https://www.amazon.de/s?k=mini+tierfiguren+set+kinder&tag=machsleicht-21",
        },
        {
          name: "Tier-Tattoos 50 Stk.",
          price: 3.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F43E}",
          url: "https://www.amazon.de/s?k=tier+tattoos+kinder&tag=machsleicht-21",
        },
        {
          name: "Papiert\xFCten Safari 12 Stk.",
          price: 5.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F6CD}\uFE0F",
          url: "https://www.amazon.de/s?k=papiert%C3%BCten+safari+kinder&tag=machsleicht-21",
        },
      ],
      kuchen: {
        klein: {
          name: "Tierkuchen",
          desc: "Runder Kuchen mit Smarties-Tiergesicht",
          rezept:
            "R\xFChrteig backen (200g Butter, 200g Zucker, 4 Eier, 300g Mehl, 1 Pck. Backpulver \u2014 35 Min. bei 175\xB0C, Springform). Abk\xFChlen. Helle Glasur drauf. Mit Smarties ein Tiergesicht legen (L\xF6we: orange Smarties als M\xE4hne im Kreis, braune als Augen und Nase).",
          url: "https://www.amazon.de/s?k=tierform+backform+kinder&tag=machsleicht-21",
        },
        mittel: {
          name: "Zebra-Kuchen",
          desc: "Marmorkuchen mit Wow-Effekt beim Anschneiden",
          rezept:
            "Hellen R\xFChrteig anr\xFChren (250g Butter, 250g Zucker, 4 Eier, 350g Mehl, 200ml Milch). H\xE4lfte in zweite Sch\xFCssel, 3 EL Kakao unterr\xFChren. Abwechselnd je 2 EL hellen und dunklen Teig in die Mitte der Springform geben (nicht r\xFChren!). 45 Min. bei 170\xB0C. Ergibt perfekte Zebra-Streifen.",
          url: "https://www.amazon.de/s?k=springform+backform+kinder&tag=machsleicht-21",
        },
        gross: {
          name: "Dschungel-Torte",
          desc: "Schoko-Kuchen mit Gummitier-Deko",
          rezept:
            "Schokoladen-R\xFChrteig backen (s. Grundrezept + 50g Kakao). 2 B\xF6den \xFCbereinander mit Schoko-Buttercreme. Au\xDFen mit Schoko-Glasur bestreichen. Gr\xFCne Gummib\xE4rchen und Mini-Tierfiguren als Deko platzieren. Brezelstangen als B\xE4ume reinstecken.",
          url: "https://www.amazon.de/s?k=safari+tortendeko+kinder+geburtstag&tag=machsleicht-21",
        },
      },
    },
    {
      id: "piraten",
      name: "Piraten-Abenteuer",
      emoji: "\u{1F3F4}\u200D\u2620\uFE0F",
      color: "#5D4037",
      cat: "generic",
      spiele: {
        klein: [
          {
            name: "Schatzsuche (einfach)",
            desc: "3 einfache Stationen mit Bildhinweisen f\xFChren zum Piratenschatz!",
            material:
              "3 gro\xDFe Bilder als Hinweise (z.B. Foto vom Baum, Foto vom Sofa), Schatzkiste (Schuhkarton mit Goldpapier beklebt), Schoko-Goldm\xFCnzen",
            anleitung:
              "1. Verstecke die Schatzkiste. 2. Mache 3 Fotos von den Stationen und drucke sie aus. 3. Gib den Kindern das erste Bild \u2014 sie suchen den Ort. 4. Dort finden sie das n\xE4chste Bild. 5. Das letzte Bild zeigt den Schatz! 6. Alle teilen den Schatz gerecht auf.",
            dauer: 15,
          },
          {
            name: "Eierlauf \xFCber die Planke",
            desc: "Auf einer Linie balancieren mit einem Ball auf dem L\xF6ffel \u2014 wer schafft es ohne umzukippen?",
            material:
              "Kreppband (f\xFCr die Linie/Planke), Essl\xF6ffel pro Kind, Tischtennisb\xE4lle oder kleine B\xE4lle, Eimer als Ziel",
            anleitung:
              "1. Klebe mit Kreppband eine gerade Linie auf den Boden (ca. 3m) = die Planke. 2. Jedes Kind bekommt einen L\xF6ffel und einen Ball. 3. Ball auf den L\xF6ffel legen und \xFCber die Planke balancieren. 4. F\xE4llt der Ball runter? Zur\xFCck zum Start! 5. Wer es am schnellsten schafft, ist der beste Pirat. 6. F\xFCr Kleine: L\xF6ffel + Ball mit der Hand festhalten erlaubt.",
            dauer: 10,
          },
          {
            name: "Piratenhut basteln",
            desc: "Jeder Pirat braucht einen Hut! Einfache Piratenh\xFCte aus Zeitungspapier falten.",
            material:
              "Zeitungspapier (1 Doppelseite pro Kind), schwarze Stifte oder Farbe, Totenkopf-Aufkleber (optional), Schere",
            anleitung:
              "1. Lege eine Doppelseite Zeitung vor jedes Kind. 2. Zeige Schritt f\xFCr Schritt: oben falten, Ecken zur Mitte, unten umklappen. 3. Kinder bemalen ihren Hut: Totenkopf, Piratenflagge, Name. 4. Optional: Totenkopf-Sticker aufkleben. 5. Fertig! Hut aufsetzen und 'Arrr!' rufen. 6. Tipp: Vorher einmal \xFCben.",
            dauer: 15,
          },
        ],
        mittel: [
          {
            name: "Schatzsuche mit Karte",
            desc: "5 Stationen mit echten R\xE4tseln und einer Schatzkarte \u2014 bis zum vergrabenen Piraten-Schatz!",
            material:
              "Selbstgemalte Schatzkarte (Papier mit Tee altern lassen), 5 R\xE4tsel-Zettel, Schatztruhe mit S\xFC\xDFigkeiten und Goldm\xFCnzen, Kompass (optional)",
            anleitung:
              "1. Male eine Schatzkarte: Haus/Garten als Karte, X markiert den Schatz. 2. Verstecke 5 R\xE4tsel-Zettel an markierten Stationen. 3. R\xE4tsel z.B.: 'Ich bin nass und komme aus dem Hahn' \u2192 Gartenschlauch. 4. Jedes gel\xF6ste R\xE4tsel gibt den n\xE4chsten Hinweis. 5. Am Ende: Schatztruhe ausgraben oder finden. 6. Tipp: Karte mit Teebeutel abtupfen und ansengen f\xFCr echten Piraten-Look.",
            dauer: 30,
          },
          {
            name: "Piraten-Staffel",
            desc: "Teams transportieren Wasser, klettern Seile und l\xF6sen R\xE4tsel \u2014 echtes Piraten-Training!",
            material:
              "2 Eimer pro Team, Becher, Seil oder Kletterger\xFCst, R\xE4tsel-Karten, Stoppuhr",
            anleitung:
              "1. Bilde 2 Teams. 2. Station 1: Wasser mit Becher vom vollen Eimer in den leeren transportieren (3m Abstand). 3. Station 2: Seil hoch und runter (oder \xFCber Bank balancieren). 4. Station 3: Piraten-R\xE4tsel l\xF6sen. 5. Schnellstes Team gewinnt. 6. Jedes Kind l\xE4uft einmal pro Station.",
            dauer: 20,
          },
          {
            name: "Verkleidung basteln",
            desc: "Piraten-Augenklappen und H\xFCte aus Tonpapier basteln \u2014 jeder wird zum echten Seer\xE4uber!",
            material:
              "Schwarzes Tonpapier, Gummiband, Schere, Kleber, Stifte, Glitzer (optional), Federn (optional)",
            anleitung:
              "1. Augenklappe: Kreis aus schwarzem Tonpapier schneiden (5cm), Loch stanzen, Gummiband durchf\xE4deln. 2. Hut: Tonpapier zum Halbkreis schneiden, zur Kegelform formen, zusammenkleben. 3. Totenkopf auf den Hut malen. 4. Optional: Feder am Hut befestigen. 5. Wer m\xF6chte, bastelt noch ein Fernrohr aus Klopapierrolle. 6. Alle verkleidet? Piraten-Foto machen!",
            dauer: 20,
          },
        ],
        gross: [
          {
            name: "Escape-Schatzsuche",
            desc: "Codes knacken, Schl\xF6sser \xF6ffnen und eine verschl\xFCsselte Karte entschl\xFCsseln \u2014 f\xFCr clevere Piraten!",
            material:
              "Zahlenschloss (3\u20134-stellig), verschl\xFCsselte Karte, UV-Stift + UV-Lampe (optional), 5 R\xE4tsel-Umschl\xE4ge, Schatztruhe",
            anleitung:
              "1. Erstelle 5 R\xE4tsel die aufeinander aufbauen: R\xE4tsel 1 gibt eine Zahl, R\xE4tsel 2 eine weitere usw. 2. Zusammen ergeben sie den Code f\xFCr das Zahlenschloss. 3. R\xE4tsel-Ideen: Spiegelschrift, Buchstaben-Zahlen-Code (A=1, B=2...), Bilderr\xE4tsel. 4. Die Schatztruhe ist mit dem Schloss gesichert. 5. Kinder arbeiten im Team. 6. Tipp: 30-Minuten-Timer f\xFCr Extra-Spannung.",
            dauer: 35,
          },
          {
            name: "Piraten-Olympiade",
            desc: "5 Disziplinen: Seilwerfen, Zielschie\xDFen, R\xE4tsel, Knotenkunde und Sprint \u2014 wer wird Piraten-Champion?",
            material:
              "Seil, Zielscheibe + B\xE4lle, Quiz-Karten, dicke Schnur f\xFCr Knoten, Stoppuhr, Punkte-Tafel",
            anleitung:
              "1. 5 Stationen aufbauen: (a) Seilwerfen auf Ziel, (b) Ball auf Dose werfen, (c) 3 Piraten-Quizfragen, (d) einen Knoten binden (Anleitung bereitlegen), (e) Sprint um die H\xFCtchen. 2. Jedes Kind durchl\xE4uft alle Stationen. 3. Pro Station 1\u20133 Punkte. 4. Punkte zusammenz\xE4hlen. 5. Siegerehrung mit Gold-/Silber-/Bronze-M\xFCnzen.",
            dauer: 25,
          },
          {
            name: "Flaschenpost-R\xE4tsel",
            desc: "Verschl\xFCsselte Nachrichten in echten Flaschen entschl\xFCsseln \u2014 maritime R\xE4tsel-Action!",
            material:
              "5 leere Plastikflaschen, zusammengerollte Zettel mit R\xE4tseln, Entschl\xFCsselungs-Tabelle, Stifte + Papier",
            anleitung:
              "1. Schreibe 5 Nachrichten in Geheimschrift (z.B. Caesar-Verschl\xFCsselung: jeder Buchstabe um 3 verschoben). 2. Rolle die Zettel und stecke sie in Flaschen. 3. Verstecke die Flaschen. 4. Kinder finden und entschl\xFCsseln die Nachrichten. 5. Jede entschl\xFCsselte Nachricht gibt einen Hinweis auf den Schatz. 6. Entschl\xFCsselungs-Tabelle als Hilfe bereitlegen.",
            dauer: 15,
          },
        ],
      },
      deko: [
        {
          name: "Piraten Teller+Becher (8 Pers.)",
          price: 11.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F3F4}\u200D\u2620\uFE0F",
          url: "https://www.amazon.de/s?k=piraten+kindergeburtstag+teller+becher&tag=machsleicht-21",
        },
        {
          name: "Totenkopf-Luftballons 15 Stk.",
          price: 7.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u2620\uFE0F",
          url: "https://www.amazon.de/s?k=piraten+luftballons+kindergeburtstag&tag=machsleicht-21",
        },
        {
          name: "Piraten-Girlande 2m",
          price: 5.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F3F4}",
          url: "https://www.amazon.de/s?k=piraten+girlande+geburtstag&tag=machsleicht-21",
        },
      ],
      dekoMin: [
        {
          name: "Rote+schwarze Luftballons 10 Stk.",
          price: 3.49,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F388}",
          url: "https://www.amazon.de/s?k=rote+schwarze+luftballons&tag=machsleicht-21",
        },
      ],
      mitgebsel: [
        {
          name: "Goldm\xFCnzen 100 Stk.",
          price: 6.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1FA99}",
          url: "https://www.amazon.de/s?k=goldm%C3%BCnzen+piraten+kinder&tag=machsleicht-21",
        },
        {
          name: "Piraten-Sticker 100 Stk.",
          price: 4.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F3F7}\uFE0F",
          url: "https://www.amazon.de/s?k=piraten+sticker+kinder&tag=machsleicht-21",
        },
        {
          name: "Papiert\xFCten Piraten 12 Stk.",
          price: 5.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F6CD}\uFE0F",
          url: "https://www.amazon.de/s?k=papiert%C3%BCten+piraten+kinder&tag=machsleicht-21",
        },
      ],
      kuchen: {
        klein: {
          name: "Piratenflaggen-Muffins",
          desc: "Schoko-Muffins mit Mini-Piratenflaggen",
          rezept:
            "Schoko-Muffins backen (Fertigmischung oder: 200g Mehl, 150g Zucker, 50g Kakao, 100ml \xD6l, 200ml Milch, 2 Eier, 1 TL Backpulver \u2014 20 Min. bei 180\xB0C). Schoko-Glasur drauf. Piratenflaggen-Picker reinstecken (kaufen oder aus Zahnstochern + Papier basteln).",
          url: "https://www.amazon.de/s?k=piraten+muffin+deko+picker+kindergeburtstag&tag=machsleicht-21",
        },
        mittel: {
          name: "Piratenschiff-Kuchen",
          desc: "Kastenkuchen als Schiff mit Papier-Segeln",
          rezept:
            "Kastenkuchen backen (250g Butter, 250g Zucker, 4 Eier, 350g Mehl, 1 Pck. Backpulver \u2014 Kastenform, 50 Min. bei 170\xB0C). Schoko-Glasur als Schiffsrumpf. 2\u20133 Schaschlikspie\xDFe als Masten reinstecken. Segel aus wei\xDFem Papier drankleben. Totenkopf-F\xE4hnchen oben drauf. Goldm\xFCnzen drumherum.",
          url: "https://www.amazon.de/s?k=piraten+tortendeko+kinder+geburtstag&tag=machsleicht-21",
        },
        gross: {
          name: "Schatzkisten-Kuchen",
          desc: "Eckiger Kuchen als Schatzkiste mit Goldm\xFCnzen",
          rezept:
            "Kastenform-Kuchen backen und quer halbieren (= Boden + Deckel). Unteren Teil aush\xF6hlen, mit Schoko-Goldm\xFCnzen f\xFCllen. Oberen Teil schr\xE4g als offenen Deckel anlehnen. Alles mit brauner Schoko-Glasur bestreichen. Goldm\xFCnzen rausquellen lassen.",
          url: "https://www.amazon.de/s?k=goldm%C3%BCnzen+schokolade+piraten+kinder&tag=machsleicht-21",
        },
      },
    },
    {
      id: "weltraum",
      name: "Weltraum-Mission",
      emoji: "\u{1F680}",
      color: "#283593",
      cat: "generic",
      spiele: {
        klein: [
          {
            name: "Planetenjagd",
            desc: "Bunte B\xE4lle sind Planeten \u2014 wer findet alle 8 im Weltraum-Zimmer?",
            material:
              "8 verschiedenfarbige B\xE4lle (oder Luftballons), Weltraum-Musik (optional), Papiert\xFCten zum Sammeln",
            anleitung:
              "1. Verstecke 8 bunte B\xE4lle im Raum (jeder Ball = ein Planet, z.B. rot = Mars, blau = Erde). 2. H\xE4nge ein Poster mit den Planeten und Farben auf. 3. Kinder suchen die Planeten. 4. F\xFCr jeden gefundenen Planeten gibts einen Sticker. 5. Wer alle 8 hat, ist Weltraum-Entdecker! 6. Am Ende gemeinsam die Planeten in der richtigen Reihenfolge auflegen.",
            dauer: 15,
          },
          {
            name: "Mondlandung (Stopptanz)",
            desc: "Bei Musik fliegen alle durch den Weltraum \u2014 bei Stopp: auf den Mond (Kissen) landen!",
            material:
              "Musik (Handy/Lautsprecher), 1 gro\xDFes Kissen pro Kind (= Monde), Weltraum-Playlist (optional)",
            anleitung:
              "1. Verteile Kissen als 'Monde' im Raum. 2. Musik an: Kinder fliegen wie Raketen durchs Zimmer (Arme ausgestreckt). 3. Musik aus: Alle m\xFCssen sofort auf einem Mond landen (= auf ein Kissen setzen). 4. Wer keinen Mond hat, scheidet aus (oder: ein Mond wird entfernt). 5. Weiterspielen bis ein Kind \xFCbrig ist. 6. Tipp: Bei 3-J\xE4hrigen keinen rausschmei\xDFen, einfach weiterspielen.",
            dauer: 10,
          },
          {
            name: "Sterne basteln",
            desc: "Glitzer-Sterne aus Alufolie basteln \u2014 jedes Kind nimmt seinen Stern mit nach Hause!",
            material:
              "Alufolie, Pappkarton, Schere, Kleber, Glitzer, B\xE4nder zum Aufh\xE4ngen",
            anleitung:
              "1. Schneide Stern-Schablonen aus Pappe vor (ca. 15cm). 2. Kinder umwickeln die Schablone mit Alufolie. 3. Mit Kleber Glitzer draufstreuen. 4. Band zum Aufh\xE4ngen durchf\xE4deln. 5. Optional: Mit Stiften den Namen draufschreiben. 6. Sterne trocknen lassen und als Mitgebsel einpacken.",
            dauer: 15,
          },
        ],
        mittel: [
          {
            name: "Planeten-Rallye",
            desc: "8 Stationen wie die 8 Planeten \u2014 an jedem Planet wartet eine andere Aufgabe!",
            material:
              "8 Stationsschilder (Planetennamen + Bild), Aufgaben-Zettel, Stempelkarte, Requisiten je Station",
            anleitung:
              "1. Richte 8 Stationen ein (drinnen oder drau\xDFen). 2. Stationen z.B.: Merkur (Quiz), Venus (Balancieren), Erde (Recycling sortieren), Mars (roten Ball werfen), Jupiter (Weitsprung), Saturn (Ring werfen), Uranus (r\xFCckw\xE4rts laufen), Neptun (Wasserspiel). 3. Jedes Kind bekommt eine Stempelkarte. 4. Pro Station gibts einen Stempel. 5. Alle 8 Stempel = Astronauten-Urkunde!",
            dauer: 30,
          },
          {
            name: "Mondlandung (Stopptanz)",
            desc: "Musik = durch den Weltraum fliegen. Stopp = auf dem Mond einfrieren \u2014 wer bewegt sich noch?",
            material: "Musik + Lautsprecher, Weltraum-Deko (optional)",
            anleitung:
              "1. Kinder verteilen sich im Raum. 2. Musik an: Alle fliegen wie Raketen (Arme seitlich, Ger\xE4usche machen). 3. Musik aus: Sofort einfrieren! Wer sich bewegt, muss eine Runde aussetzen. 4. Variante: Bei Stopp eine Pose machen (Astronaut auf dem Mond, schwebend, Flagge aufstellen). 5. Etwa 8\u201310 Runden. 6. Lustigste Pose gewinnt einen Preis.",
            dauer: 15,
          },
          {
            name: "Alien-Schleim herstellen",
            desc: "Jedes Kind mixt seinen eigenen Glitzer-Schleim \u2014 das perfekte Mitgebsel zum Mitnehmen!",
            material:
              "Bastelkleber/PVA-Kleber (1 Flasche pro 3\u20134 Kinder), Fl\xFCssigwaschmittel oder Kontaktlinsen-L\xF6sung + Natron, Lebensmittelfarbe (gr\xFCn, lila, blau), Glitzer, Sch\xFCsseln + L\xF6ffel, Zip-Beutel",
            anleitung:
              "1. Pro Kind: 100ml Kleber in eine Sch\xFCssel. 2. Lebensmittelfarbe und Glitzer einr\xFChren. 3. Langsam Fl\xFCssigwaschmittel dazugeben (ca. 1 EL) und kneten. 4. Weiter kneten bis der Schleim nicht mehr klebt. 5. In Zip-Beutel abf\xFCllen und mit Namen beschriften. 6. Tipp: Tisch vorher mit Folie abdecken! Alternative: Fertig-Schleim-Set kaufen.",
            dauer: 20,
          },
        ],
        gross: [
          {
            name: "Weltraum-Escape-Room",
            desc: "Die Raumstation hat ein Leck! L\xF6st R\xE4tsel um die Rakete zu reparieren \u2014 Codes, Mathe und Logik.",
            material:
              "Zahlenschloss, 5 R\xE4tsel-Umschl\xE4ge, Taschenlampe, UV-Stift (optional), Timer (Handy), Requisiten",
            anleitung:
              "1. Geschichte: 'Die Raumstation ISS hat ein Problem \u2014 ihr m\xFCsst 5 R\xE4tsel l\xF6sen um sie zu reparieren!' 2. R\xE4tsel z.B.: Koordinaten berechnen (Mathe), Sternbild erkennen (Bild), Morse-Code entschl\xFCsseln, Logik-R\xE4tsel, finaler Code f\xFCrs Zahlenschloss. 3. Timer auf 30 Minuten stellen. 4. Kinder arbeiten im Team. 5. Geschafft? Rakete startet (Konfetti werfen)! 6. Hinweis-Karten bereithalten falls sie nicht weiterkommen.",
            dauer: 35,
          },
          {
            name: "Raketen-Wettbewerb",
            desc: "Papierraketen bauen und abschie\xDFen \u2014 wer fliegt am weitesten?",
            material:
              "Papier (A4), Strohhalme, Klebeband, Schere, Ma\xDFband, Optional: Luftballons",
            anleitung:
              "1. Jedes Kind baut eine Papierrakete: Papier um Strohhalm rollen, oben zukleben, Fl\xFCgel drankleben. 2. Strohhalm rausziehen. 3. Neuen Strohhalm reinstecken und pusten = Rakete fliegt! 4. Jedes Kind hat 3 Versuche. 5. Weiteste Rakete gewinnt. 6. Variante f\xFCr Profis: Backpulver-Essig-Rakete in Filmdose (drau\xDFen, mit Erwachsenem!).",
            dauer: 20,
          },
          {
            name: "Alien-Schleim-Labor",
            desc: "Verschiedene Schleim-Rezepte testen: Glitzer, Neon und sogar magnetischen Schleim!",
            material:
              "PVA-Kleber (3 Flaschen), Kontaktlinsen-L\xF6sung + Natron, Lebensmittelfarben (neon), Glitzer, Eisenpulver (f\xFCr magnetischen Schleim, optional), Neodym-Magnet (optional), Sch\xFCsseln, L\xF6ffel, Zip-Beutel",
            anleitung:
              "1. Bereite 3 Stationen vor: Station 1 = Glitzer-Schleim, Station 2 = Neon-Schleim (mit Neon-Farbe), Station 3 = Magnetischer Schleim (mit Eisenpulver). 2. An jeder Station liegt eine Anleitung. 3. Kinder rotieren in Gruppen durch die Stationen. 4. Grundrezept: 100ml Kleber + Farbe + 1 EL Kontaktlinsen-L\xF6sung + 1/2 TL Natron. 5. Kneten bis fest. 6. Jedes Kind nimmt 3 Schleim-Proben in Zip-Beuteln mit.",
            dauer: 20,
          },
        ],
      },
      deko: [
        {
          name: "Weltraum Teller+Becher (8 Pers.)",
          price: 13.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F680}",
          url: "https://www.amazon.de/s?k=weltraum+kindergeburtstag+teller+becher&tag=machsleicht-21",
        },
        {
          name: "Planeten-Luftballons 12 Stk.",
          price: 8.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1FA90}",
          url: "https://www.amazon.de/s?k=planeten+luftballons+kindergeburtstag&tag=machsleicht-21",
        },
        {
          name: "Sternenhimmel-Lichterkette",
          price: 9.99,
          eco: !1,
          bbl: "borrow",
          emoji: "\u2728",
        },
      ],
      dekoMin: [
        {
          name: "Dunkelblaue+silberne Luftballons 10 Stk.",
          price: 3.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F388}",
          url: "https://www.amazon.de/s?k=dunkelblaue+silberne+luftballons&tag=machsleicht-21",
        },
        {
          name: "Sterne aus Alufolie (DIY)",
          price: 0,
          eco: !0,
          bbl: "diy",
          emoji: "\u2B50",
        },
      ],
      mitgebsel: [
        {
          name: "Leucht-Sterne 100 Stk.",
          price: 4.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u2B50",
          url: "https://www.amazon.de/s?k=leucht+sterne+kinder&tag=machsleicht-21",
        },
        {
          name: "Weltraum-Tattoos 40 Stk.",
          price: 3.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1FA90}",
          url: "https://www.amazon.de/s?k=weltraum+tattoos+kinder&tag=machsleicht-21",
        },
        {
          name: "T\xFCten Weltraum 12 Stk.",
          price: 6.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F6CD}\uFE0F",
          url: "https://www.amazon.de/s?k=weltraum+t%C3%BCten+kindergeburtstag&tag=machsleicht-21",
        },
      ],
      kuchen: {
        klein: {
          name: "Raketen-Muffins",
          desc: "Muffins mit Eiswaffel-Spitze als Rakete",
          rezept:
            "Muffins backen (Grundrezept oder Fertigmischung). Blaue oder silberne Glasur drauf (Puderzucker + Lebensmittelfarbe). Spitze Eiswaffel (z.B. H\xF6rnchen) umgedreht obendrauf = Raketenspitze. Bunte Streusel als Sterne. Optional: Smarties am Fu\xDF als Flammen.",
          url: "https://www.amazon.de/s?k=muffin+set+weltraum+kindergeburtstag&tag=machsleicht-21",
        },
        mittel: {
          name: "Raketen-Kuchen",
          desc: "Kastenform-Kuchen als Rakete mit Smarties-Flammen",
          rezept:
            "Kastenkuchen backen (Grundrezept). Oben spitz zuschneiden (Reste naschen!). Mit silberner/wei\xDFer Glasur \xFCberziehen. Rote, orange und gelbe Smarties am unteren Ende als Flammen. Runde Fenster aus blauen Smarties. Tipp: Alufolie um das untere Ende als D\xFCsen.",
          url: "https://www.amazon.de/s?k=weltraum+tortendeko+kinder+geburtstag&tag=machsleicht-21",
        },
        gross: {
          name: "Galaxie-Kuchen",
          desc: "Dunkler Kuchen mit bunten Galaxie-Wirbeln",
          rezept:
            "Schokoladen-Kuchen backen (Springform). Dunkle Schoko-Glasur drauf. Solange die Glasur noch feucht ist: blaue, lila und wei\xDFe Lebensmittelfarbe in Tropfen aufbringen und mit Zahnstocher zu Spiralen ziehen. Essbare Silber-Sternchen dr\xFCberstreuen. Sieht aus wie eine echte Galaxie!",
          url: "https://www.amazon.de/s?k=lebensmittelfarbe+set+galaxie+kuchen&tag=machsleicht-21",
        },
      },
    },
    {
      id: "dino",
      name: "Dino-Abenteuer",
      emoji: "\u{1F995}",
      color: "#795548",
      cat: "generic",
      spiele: {
        klein: [
          {
            name: "Dino-Eier suchen",
            desc: "Versteckte Dino-Eier (bunte B\xE4lle oder Plastikeier) im Garten oder Raum finden!",
            material:
              "10\u201315 Plastikeier oder kleine B\xE4lle, Papiert\xFCten oder Eimerchen zum Sammeln, kleine Dino-Figuren zum Reinstecken (optional)",
            anleitung:
              "1. Verstecke die Eier vorher im Garten oder Raum (unter B\xFCschen, hinter Kissen, auf Regalen). 2. Jedes Kind bekommt einen Sammelbeutel. 3. 'Die Dinos haben ihre Eier verloren \u2014 helft sie zu finden!' 4. Alle suchen gleichzeitig. 5. Tipp: F\xFCr 3-J\xE4hrige die Eier gut sichtbar platzieren. 6. Wer die meisten hat, bekommt eine Extra-Dino-Figur.",
            dauer: 15,
          },
          {
            name: "Dino-Tanz",
            desc: "Stampfen wie ein T-Rex zur Musik \u2014 bei Stopp zu einer Dino-Statue einfrieren!",
            material: "Musik + Lautsprecher, Dino-Bilder (optional)",
            anleitung:
              "1. Musik an: Alle stampfen wie Dinosaurier durchs Zimmer. 2. T-Rex: schwer stampfen. Flugsaurier: Arme flattern. Langhals: auf Zehenspitzen gehen. 3. Musik aus: Einfrieren! 4. Wer sich bewegt, macht eine Runde T-Rex-Gebr\xFCll. 5. Variante: Bei Stopp einen bestimmten Dino nachmachen. 6. Ca. 8\u201310 Runden spielen.",
            dauer: 10,
          },
          {
            name: "Dino-Ausmalen",
            desc: "Gro\xDFe Dino-Ausmalbilder \u2014 perfekte Besch\xE4ftigung f\xFCr den Anfang oder zwischendurch.",
            material:
              "Ausgedruckte Dino-Ausmalbilder (A3 oder A4), Buntstifte, Wachsmalstifte, Glitzer-Kleber (optional)",
            anleitung:
              "1. Drucke verschiedene Dino-Ausmalbilder aus (T-Rex, Stegosaurus, Triceratops). 2. Lege Stifte bereit. 3. Jedes Kind sucht sich ein Bild aus. 4. Ausmalen nach Lust und Laune. 5. Fertige Bilder mit Namen beschriften. 6. Als Deko aufh\xE4ngen oder als Mitgebsel einrollen.",
            dauer: 15,
          },
        ],
        mittel: [
          {
            name: "Dino-Ausgrabung",
            desc: "Echte Pal\xE4ontologen-Arbeit: kleine Dinos im Sand, Reis oder Gips ausgraben!",
            material:
              "Gro\xDFe Sch\xFCssel oder Wanne, Sand oder Reis, kleine Dino-Figuren, Pinsel, L\xF6ffel, Lupe (optional). Alternativ: Gips-Eier (Gips um Dinos gie\xDFen, trocknen lassen)",
            anleitung:
              "1. Variante Sand/Reis: Dino-Figuren in der Wanne vergraben. Kinder graben vorsichtig mit Pinsel und L\xF6ffel. 2. Variante Gips-Ei (1 Tag vorher vorbereiten): Luftballon aufblasen, mit Gips bestreichen, trocknen lassen, Luftballon platzen, Dino reinstecken, Loch zukleben. 3. Kinder klopfen vorsichtig mit L\xF6ffel den Gips auf. 4. Ausgegrabene Dinos d\xFCrfen behalten werden. 5. Lupe bereithalten zum Untersuchen.",
            dauer: 25,
          },
          {
            name: "Vulkan-Experiment",
            desc: "Ein echter Vulkanausbruch auf dem K\xFCchentisch \u2014 mit Essig, Natron und Lebensmittelfarbe!",
            material:
              "Leere Plastikflasche (0.5L), Backnatron (3 EL), Essig (200ml), Sp\xFClmittel (Spritzer), rote Lebensmittelfarbe, Backblech oder gro\xDFe Sch\xFCssel als Unterlage, Sand/Knete zum Verkleiden (optional)",
            anleitung:
              "1. Flasche in die Mitte des Backblechs stellen. 2. Optional: Mit Sand oder Knete als Vulkan verkleiden. 3. Natron in die Flasche f\xFCllen. 4. Lebensmittelfarbe und einen Spritzer Sp\xFCli dazu. 5. Kinder im Kreis aufstellen. 6. Essig hineingie\xDFen \u2014 ERUPTION! 7. Kann 2\u20133 mal wiederholt werden. 8. Tipp: Drau\xDFen machen oder Tisch gut abdecken.",
            dauer: 15,
          },
          {
            name: "Dino-Eierlauf",
            desc: "Wer bringt das Dino-Ei sicher ins Nest \u2014 ohne es fallen zu lassen?",
            material:
              "Essl\xF6ffel pro Kind, Tischtennisb\xE4lle oder Plastikeier (= Dino-Eier), 2 Eimer (= Dino-Nester), Kreppband f\xFCr Start/Ziel",
            anleitung:
              "1. Start- und Ziellinie markieren (ca. 5m Abstand). 2. Am Ziel steht der Eimer (Nest). 3. Jedes Kind legt das Ei auf den L\xF6ffel. 4. Zum Nest laufen, Ei reinlegen, zur\xFCckrennen. 5. F\xE4llt das Ei? Zur\xFCck zum Start! 6. Staffel: 2 Teams, welches Team hat zuerst alle Eier im Nest? 7. F\xFCr Kleine: Mit der Hand stabilisieren erlaubt.",
            dauer: 15,
          },
        ],
        gross: [
          {
            name: "Pal\xE4ontologen-Rallye",
            desc: "Knochen finden, dem richtigen Dino zuordnen und einen Steckbrief erstellen \u2014 echte Forschung!",
            material:
              "Ausgedruckte Dino-Knochen-Bilder, Zuordnungs-Tafel, Steckbrief-Vorlagen, Stifte, Sachbuch oder Tablet zum Recherchieren",
            anleitung:
              "1. Verstecke 'Knochen' (ausgedruckte Bilder) im Garten. 2. Teams sammeln Knochen und ordnen sie auf der Tafel dem richtigen Dino zu. 3. Pro richtig zugeordnetem Knochen: 1 Punkt. 4. Dann: Steckbrief erstellen \xFCber den Lieblings-Dino (Name, Gr\xF6\xDFe, Nahrung, Zeitalter). 5. Teams pr\xE4sentieren ihre Steckbriefe. 6. Kreativster Steckbrief gewinnt Extra-Punkte.",
            dauer: 30,
          },
          {
            name: "Vulkan-Wettbewerb",
            desc: "Teams bauen ihren eigenen Vulkan und testen: wer spuckt am h\xF6chsten?",
            material:
              "2\u20133 Plastikflaschen (0.5L), Sand oder Knete, Essig, Natron, Sp\xFClmittel, Lebensmittelfarbe, Backbleche, Ma\xDFband",
            anleitung:
              "1. Jedes Team bekommt: 1 Flasche, Knete/Sand, 3 EL Natron, Essig, Farbe, Sp\xFCli. 2. Phase 1 (10 Min.): Vulkan bauen und dekorieren. 3. Phase 2: Eruption! Natron + Farbe + Sp\xFCli in die Flasche, Essig drauf. 4. Messen: Welcher Vulkan spuckt am h\xF6chsten? 5. Punkte f\xFCr: H\xF6he, Design, Kreativit\xE4t. 6. Jedes Team darf 2 Versuche.",
            dauer: 20,
          },
          {
            name: "Dino-Quiz-Duell",
            desc: "Wer wei\xDF am meisten \xFCber Dinosaurier? Teams treten gegeneinander an!",
            material:
              "20+ Quiz-Karten mit Dino-Fragen (selbst erstellt oder ausgedruckt), Buzzer oder K\xFCchengl\xF6ckchen, Punkte-Tafel",
            anleitung:
              "1. Erstelle Fragen in 3 Schwierigkeitsstufen: leicht (1 Punkt), mittel (2), schwer (3). 2. Beispiele: 'Was bedeutet T-Rex?' (Tyrannenechse, 1P), 'In welchem Zeitalter lebte der Stegosaurus?' (Jura, 2P), 'Welcher Dino hatte 500 Z\xE4hne?' (Nigersaurus, 3P). 3. Teams buzzern. 4. Falsche Antwort: anderes Team darf. 5. 3 Runden \xE0 7 Fragen. 6. Sieger-Team bekommt Dino-Medaillen.",
            dauer: 15,
          },
        ],
      },
      deko: [
        {
          name: "Dino Teller+Becher (8 Pers.)",
          price: 12.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F995}",
          url: "https://www.amazon.de/s?k=dino+kindergeburtstag+teller+becher&tag=machsleicht-21",
        },
        {
          name: "Dino-Luftballons 12 Stk.",
          price: 7.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F388}",
          url: "https://www.amazon.de/s?k=dino+luftballons+kindergeburtstag&tag=machsleicht-21",
        },
        {
          name: "Dino-Girlande",
          price: 5.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F996}",
          url: "https://www.amazon.de/s?k=dino+girlande+kindergeburtstag&tag=machsleicht-21",
        },
      ],
      dekoMin: [
        {
          name: "Gr\xFCne Luftballons 10 Stk.",
          price: 2.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F388}",
          url: "https://www.amazon.de/s?k=gr%C3%BCne+luftballons&tag=machsleicht-21",
        },
        {
          name: "Dino-Figuren als Tischdeko (leihen)",
          price: 0,
          eco: !0,
          bbl: "borrow",
          emoji: "\u{1F995}",
        },
      ],
      mitgebsel: [
        {
          name: "Mini-Dinos 12 Stk.",
          price: 7.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F995}",
          url: "https://www.amazon.de/s?k=mini+dino+figuren+kinder&tag=machsleicht-21",
        },
        {
          name: "Dino-Stempel Set",
          price: 5.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F43E}",
          url: "https://www.amazon.de/s?k=dino+stempel+set+kinder&tag=machsleicht-21",
        },
        {
          name: "Papiert\xFCten Dino 12 Stk.",
          price: 5.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F6CD}\uFE0F",
          url: "https://www.amazon.de/s?k=papiert%C3%BCten+dino+kinder&tag=machsleicht-21",
        },
      ],
      kuchen: {
        klein: {
          name: "Dino-Muffins",
          desc: "Schoko-Muffins mit Mini-Dino obendrauf",
          rezept:
            "Schoko-Muffins backen (Grundrezept). Gr\xFCne Glasur drauf (Puderzucker + gr\xFCne Lebensmittelfarbe). Kleine Plastik-Dinos obendrauf setzen (vorher kaufen). Alternative: Dino-Kekse ausstechen und auf die Muffins stecken.",
          url: "https://www.amazon.de/s?k=mini+dino+figuren+tortendeko+kinder&tag=machsleicht-21",
        },
        mittel: {
          name: "Vulkan-Kuchen",
          desc: "Gugelhupf mit Smarties-Lava und Dino-Figur",
          rezept:
            "Marmor-Gugelhupf backen (Grundrezept). Abk\xFChlen lassen. Mit Schoko-Glasur den oberen Rand bestreichen. Rote, orange und gelbe Smarties als Lava von oben herunterlaufen lassen. Gr\xFCne Gummib\xE4rchen drumherum als B\xE4ume. Dino-Figur obendrauf.",
          url: "https://www.amazon.de/s?k=dino+tortendeko+kindergeburtstag&tag=machsleicht-21",
        },
        gross: {
          name: "Fossilien-Kuchen",
          desc: "Schoko-Kuchen mit wei\xDFen Schoko-Knochen",
          rezept:
            "Schokoladen-Kuchen backen (Springform). Dunkle Schoko-Glasur drauf. Knochen aus wei\xDFer Schokolade: wei\xDFe Schoko schmelzen, in Knochenform auf Backpapier spritzen (oder Knochenform-Silikonform nutzen). Aush\xE4rten lassen. Auf den Kuchen legen. Puderzucker als Sand dar\xFCber st\xE4uben.",
          url: "https://www.amazon.de/s?k=knochen+silikonform+schokolade+backen&tag=machsleicht-21",
        },
      },
    },
    {
      id: "einhorn",
      name: "Einhorn-Zauber",
      emoji: "\u{1F984}",
      color: "#EC407A",
      cat: "generic",
      spiele: {
        klein: [
          {
            name: "Glitzerstein-Suche",
            desc: "Bunte Edelsteine im Raum versteckt \u2014 wie viele magische Steine findest du?",
            material:
              "30\u201340 bunte Deko-Steine oder Glasnuggets, Sammelbeutel pro Kind, Glitzer (zum Dekorieren der Steine, optional)",
            anleitung:
              "1. Verstecke die bunten Steine im Raum (auf Fensterb\xE4nken, unter Kissen, in Schuhen). 2. 'Das Einhorn hat seine Zaubersteine verloren \u2014 helft sie zu finden!' 3. Jedes Kind bekommt einen Beutel. 4. Alle suchen gleichzeitig. 5. Am Ende: Steine z\xE4hlen und nach Farben sortieren. 6. Jedes Kind darf 5 Steine behalten als Mitgebsel.",
            dauer: 15,
          },
          {
            name: "Regenbogen-Tanz",
            desc: "Bei Musikstopp ruft jemand eine Farbe \u2014 ber\xFChre schnell etwas in dieser Farbe!",
            material:
              "Musik + Lautsprecher, bunte Gegenst\xE4nde im Raum verteilen (T\xFCcher, B\xE4lle, Kissen in verschiedenen Farben)",
            anleitung:
              "1. Verteile bunte Gegenst\xE4nde im Raum. 2. Musik an: Alle tanzen. 3. Musik aus + eine Farbe rufen: 'ROT!' 4. Alle rennen zu etwas Rotem und ber\xFChren es. 5. Wer als letztes dran ist, darf die n\xE4chste Farbe rufen. 6. Variante: 2 Farben gleichzeitig rufen ('Blau UND Gelb!'). 7. Ca. 10 Runden.",
            dauer: 10,
          },
          {
            name: "Einhorn-Ausmalen",
            desc: "Gro\xDFe Einhorn-Bilder mit Glitzer und Stickern verzieren \u2014 zauberhafte Kunstwerke!",
            material:
              "Einhorn-Ausmalbilder (A4/A3), Buntstifte, Glitzer-Kleber, Einhorn-Sticker, Wachsmalstifte",
            anleitung:
              "1. Drucke verschiedene Einhorn-Motive aus. 2. Lege alle Stifte, Glitzer und Sticker bereit. 3. Jedes Kind w\xE4hlt ein Bild. 4. Ausmalen und mit Glitzer verzieren. 5. Namen draufschreiben. 6. Fertige Bilder aufh\xE4ngen oder einrollen als Mitgebsel.",
            dauer: 15,
          },
        ],
        mittel: [
          {
            name: "Glitzerstein-Schatzsuche",
            desc: "An jeder Station wartet ein Regenbogen-R\xE4tsel \u2014 sammle alle 7 Farben f\xFCr den Einhorn-Schatz!",
            material:
              "7 bunte Steine (je eine Regenbogenfarbe), 7 R\xE4tsel-Zettel, Schatzkiste mit Glitzer-Mitgebseln, Sammelkarte pro Kind",
            anleitung:
              "1. Verstecke 7 Stationen (je eine Regenbogenfarbe). 2. Pro Station: ein R\xE4tsel l\xF6sen = bunten Stein bekommen. 3. R\xE4tsel z.B.: Farben-Quiz, Einhorn-Bilderr\xE4tsel, etwas in der Farbe finden. 4. Sammelkarte: f\xFCr jede Farbe einen Sticker. 5. Alle 7 Farben = Regenbogen komplett \u2192 Schatzkiste \xF6ffnen! 6. Kinder suchen gemeinsam (kein Wettbewerb).",
            dauer: 20,
          },
          {
            name: "Zauberstab basteln",
            desc: "Jede Prinzessin und jeder Magier braucht einen Zauberstab \u2014 mit Glitzer und B\xE4ndern!",
            material:
              "Holzst\xE4be oder dicke Strohhalme (pro Kind), Sternform aus Pappe, Glitzer, Kleber, bunte B\xE4nder, Alufolie, Schere",
            anleitung:
              "1. Stern aus Pappe ausschneiden (ca. 10cm, vorher vorbereiten oder Schablone). 2. Stern mit Kleber bestreichen und in Glitzer tauchen. 3. Stern an den Stab kleben. 4. Stab mit Alufolie umwickeln. 5. Bunte B\xE4nder am Stern befestigen. 6. Trocknen lassen \u2014 fertig zum Zaubern! 7. Zauberspruch gemeinsam \xFCben: 'Hokus Pokus Glitzerstaub!'",
            dauer: 20,
          },
          {
            name: "Regenbogen-Stopptanz",
            desc: "Tanzen zur Musik \u2014 bei Stopp wird eine Farbe gerufen und alle m\xFCssen etwas in der Farbe ber\xFChren!",
            material:
              "Musik + Lautsprecher, bunte Gegenst\xE4nde im Raum (T\xFCcher, Ballons, Kissen)",
            anleitung:
              "1. Bunte Gegenst\xE4nde im Raum verteilen. 2. Musik an: Alle tanzen wie Einh\xF6rner (galoppieren!). 3. Musik aus + Farbe rufen. 4. Wer als letztes die Farbe ber\xFChrt, muss eine Einhorn-Pose machen. 5. Variante: Farben auf Englisch oder in Reimform ('Etwas das ist so wie Gras...' \u2192 Gr\xFCn). 6. 10\u201312 Runden spielen.",
            dauer: 15,
          },
        ],
        gross: [
          {
            name: "Einhorn-Escape",
            desc: "Das Einhorn ist gefangen! L\xF6st magische R\xE4tsel um den Regenbogen-Schatz zu finden.",
            material:
              "5 R\xE4tsel-Umschl\xE4ge, Zahlenschloss, UV-Stift + UV-Lampe (optional), Glitzer-Schatzkiste, Timer",
            anleitung:
              "1. Geschichte: 'Das b\xF6se Dunkelhorn hat das Einhorn eingesperrt! L\xF6st 5 magische R\xE4tsel um es zu befreien!' 2. R\xE4tsel mit Einhorn-Thema: Farben-Code, Sternbild-R\xE4tsel, Spiegel-Schrift, Mathe mit Glitzersteinen, Schlusscode f\xFCrs Zahlenschloss. 3. 30 Minuten Zeit. 4. Hinweis-Karten bereithalten. 5. Einhorn befreit = Konfetti + Schatzkiste mit Schmuck und Glitzer.",
            dauer: 30,
          },
          {
            name: "Schmuck-Workshop",
            desc: "Perlenarmb\xE4nder und Glitzer-Ketten selbst herstellen \u2014 jedes St\xFCck ein Unikat!",
            material:
              "Perlen (verschiedene Farben und Gr\xF6\xDFen), Elastikband oder Schmuckdraht, Verschl\xFCsse, Anh\xE4nger (Einhorn, Stern, Herz), Schere, Sch\xE4lchen f\xFCr Perlen",
            anleitung:
              "1. Perlen nach Farben in Sch\xE4lchen sortieren. 2. Jedes Kind bekommt ca. 40cm Band. 3. Ein Ende mit Klebeband fixieren (rutscht nicht). 4. Perlen auff\xE4deln nach eigener Fantasie. 5. Enden verknoten (Erwachsener hilft). 6. Optional: Einhorn-Anh\xE4nger auff\xE4deln. 7. Jedes Kind macht 1\u20132 Armb\xE4nder.",
            dauer: 25,
          },
          {
            name: "Einhorn-Quiz",
            desc: "Wer wei\xDF am meisten \xFCber Einh\xF6rner, Fabelwesen und Regenbogen-Magie?",
            material:
              "20 Quiz-Karten, Buzzer oder Gl\xF6ckchen, Punkte-Tafel, kleine Preise",
            anleitung:
              "1. Erstelle Fragen: 'Wie viele Farben hat der Regenbogen?' (7), 'Welches Land hat ein Einhorn im Wappen?' (Schottland), 'Was frisst ein Einhorn?' (Regenbogen-Gras, nat\xFCrlich!). 2. Teams bilden. 3. Frage vorlesen, Team das zuerst buzzert darf antworten. 4. Richtig = 1 Punkt, falsch = anderes Team darf. 5. 3 Runden. 6. Sieger-Team bekommt Glitzer-Kronen.",
            dauer: 15,
          },
        ],
      },
      deko: [
        {
          name: "Einhorn Teller+Becher (8 Pers.)",
          price: 12.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F984}",
          url: "https://www.amazon.de/s?k=einhorn+kindergeburtstag+teller+becher&tag=machsleicht-21",
        },
        {
          name: "Regenbogen-Luftballons 15 Stk.",
          price: 6.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F308}",
          url: "https://www.amazon.de/s?k=regenbogen+luftballons+kindergeburtstag&tag=machsleicht-21",
        },
        {
          name: "Glitzer-Tischdecke",
          price: 4.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u2728",
          url: "https://www.amazon.de/s?k=glitzer+tischdecke+kindergeburtstag&tag=machsleicht-21",
        },
      ],
      dekoMin: [
        {
          name: "Rosa+lila Luftballons 10 Stk.",
          price: 2.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F388}",
          url: "https://www.amazon.de/s?k=rosa+lila+luftballons&tag=machsleicht-21",
        },
      ],
      mitgebsel: [
        {
          name: "Einhorn-Sticker 100 Stk.",
          price: 4.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F3F7}\uFE0F",
          url: "https://www.amazon.de/s?k=einhorn+sticker+kinder&tag=machsleicht-21",
        },
        {
          name: "Glitzer-Haargummis 24 Stk.",
          price: 6.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F4AB}",
          url: "https://www.amazon.de/s?k=glitzer+haargummis+kinder&tag=machsleicht-21",
        },
        {
          name: "Papiert\xFCten Einhorn 12 Stk.",
          price: 5.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F6CD}\uFE0F",
          url: "https://www.amazon.de/s?k=papiert%C3%BCten+einhorn+kinder&tag=machsleicht-21",
        },
      ],
      kuchen: {
        klein: {
          name: "Regenbogen-Muffins",
          desc: "Muffins mit bunten Streuseln und Einhorn-Topper",
          rezept:
            "Vanilla-Muffins backen (Grundrezept). Wei\xDFe Glasur drauf. Mit Regenbogen-Streuseln bestreuen. Einhorn-Papier-Topper reinstecken (kaufen oder aus Pappe basteln). Super einfach, riesen Effekt!",
          url: "https://www.amazon.de/s?k=einhorn+muffin+topper+regenbogen+kinder&tag=machsleicht-21",
        },
        mittel: {
          name: "Regenbogen-Kuchen",
          desc: "4 bunte Farbschichten \u2014 Wow-Effekt beim Anschneiden!",
          rezept:
            "Hellen R\xFChrteig anr\xFChren (4-fache Menge Grundrezept). In 4 Teile aufteilen: rot, gelb, gr\xFCn, blau einf\xE4rben. Nacheinander in Springform schichten: blau unten, gr\xFCn, gelb, rot oben. 40 Min. bei 170\xB0C. Wei\xDFe Glasur drauf. Beim Anschneiden sieht man alle 4 Farben \u2014 alle sagen Wow!",
          url: "https://www.amazon.de/s?k=lebensmittelfarbe+set+gel+regenbogen+kuchen&tag=machsleicht-21",
        },
        gross: {
          name: "Einhorn-Torte",
          desc: "Fondant-Horn, Ohren und essbare Glitzer-Deko",
          rezept:
            "2 runde B\xF6den backen, mit Buttercreme f\xFCllen und au\xDFen einstreichen. Fondant-Horn: gelben Fondant zu einer Spirale drehen und an Schaschlikspie\xDF befestigen. Ohren aus Fondant ausschneiden. Oben reinstecken. Essbare Glitzer-Sterne und Bl\xFCten platzieren. Rosa Buttercreme-M\xE4hne mit Spritzt\xFClle.",
          url: "https://www.amazon.de/s?k=einhorn+fondant+set+tortendeko+kinder&tag=machsleicht-21",
        },
      },
    },
    {
      id: "feuerwehr",
      name: "Feuerwehr-Einsatz",
      emoji: "\u{1F692}",
      color: "#D32F2F",
      cat: "generic",
      spiele: {
        klein: [
          {
            name: "L\xF6scheimer-Staffel",
            desc: "Wasser mit Bechern transportieren \u2014 schnell aber ohne zu versch\xFCtten! Echtes Feuerwehr-Training.",
            material:
              "2 gro\xDFe Eimer (voll), 2 gro\xDFe Eimer (leer), Plastikbecher pro Kind, Handt\xFCcher f\xFCr den Boden",
            anleitung:
              "1. Stelle je einen vollen und leeren Eimer mit 3m Abstand auf. 2. Bilde 2 Teams. 3. Kinder sch\xF6pfen Wasser mit Becher aus dem vollen Eimer, laufen zum leeren und kippen es rein. 4. Zur\xFCcklaufen, n\xE4chstes Kind ist dran. 5. Nach 5 Minuten: Welches Team hat mehr Wasser im Ziel-Eimer? 6. Drau\xDFen spielen oder Handt\xFCcher bereitlegen!",
            dauer: 15,
          },
          {
            name: "Feuerwehr-Verkleidung",
            desc: "Helme aufsetzen, Schl\xE4uche (Seile) ausrollen und losfahren \u2014 tat\xFCtata!",
            material:
              "Feuerwehr-Helme (Plastik, ca. 2\u20AC/St\xFCck) oder rote M\xFCtzen, Seile als Schl\xE4uche, rotes Absperrband (optional)",
            anleitung:
              "1. Helme und Seile bereitlegen. 2. 'Alarm! Alle Feuerwehrleute anziehen!' 3. Kinder setzen Helme auf und schnappen sich ein Seil. 4. Im Feuerwehr-G\xE4nsemarsch durchs Haus laufen. 5. Seil als Schlauch ausrollen und auf 'Feuer' (rotes Tuch) richten. 6. 'Wasser marsch!' \u2014 zusammen l\xF6schen. 7. Gruppenpose f\xFCr Foto.",
            dauer: 10,
          },
          {
            name: "Feuerwehr-Ausmalen",
            desc: "Gro\xDFe Feuerwehr-Bilder zum Anmalen \u2014 perfekt zum Runterkommen nach der Action.",
            material:
              "Feuerwehr-Ausmalbilder (Feuerwehrauto, Feuerwehrmann, Hund), Buntstifte, Wachsmalstifte, rote Sticker",
            anleitung:
              "1. Drucke verschiedene Feuerwehr-Motive aus (A4). 2. Stifte bereitstellen. 3. Jedes Kind w\xE4hlt ein Bild. 4. In Ruhe ausmalen. 5. Rote Sticker als Flammen aufkleben (optional). 6. Bilder mit nach Hause nehmen oder als Feuerwehr-Galerie aufh\xE4ngen.",
            dauer: 15,
          },
        ],
        mittel: [
          {
            name: "L\xF6sch-Staffel",
            desc: "Teams f\xFCllen Eimer und 'l\xF6schen' Kerzen durch Auspusten \u2014 Teamwork wie bei der echten Feuerwehr!",
            material:
              "Teelichter (echte oder LED), Eimer, Becher, Wasser, Stoppuhr",
            anleitung:
              "1. Stelle 5 Teelichter auf einen Tisch (= das Feuer). 2. Bilde 2 Teams. 3. Runde 1: Wasser-Staffel (wie oben). 4. Runde 2: Kerzen auspusten \u2014 jedes Kind darf 1x pusten, dann n\xE4chstes Kind. 5. Welches Team l\xF6scht alle Kerzen zuerst? 6. Sicherheit: Bei echten Kerzen Erwachsener daneben! LED-Kerzen als sichere Alternative.",
            dauer: 20,
          },
          {
            name: "Hindernis-Einsatz",
            desc: "Rettungs-Parcours: unter Seilen durch, \xFCber Kissen, Ball transportieren \u2014 wie beim echten Einsatz!",
            material:
              "Seile oder Schn\xFCre, Kissen, Ball oder Kuscheltier (= zu rettendes Opfer), St\xFChle, Stoppuhr",
            anleitung:
              "1. Baue den Parcours: (a) Unter Seil durchrobben, (b) \xFCber Kissen-Tr\xFCmmer klettern, (c) Ball/Kuscheltier aufnehmen, (d) Slalom um St\xFChle, (e) Ball in Eimer (= Krankenwagen) legen. 2. Erst alle zusammen \xFCben. 3. Dann auf Zeit: Jedes Kind einzeln. 4. 2 Versuche pro Kind. 5. Beste Zeit gewinnt den Rettungs-Orden. 6. Am Ende: Alle gemeinsam durch den Parcours.",
            dauer: 20,
          },
          {
            name: "Feuerwehr-Quiz",
            desc: "Was macht die Feuerwehr? Was tun bei Feuer? Wichtiges Wissen kindgerecht verpackt!",
            material:
              "Quiz-Karten (10\u201315 Fragen), Buzzer oder Glocke, kleine Preise, Feuerwehr-Bilder",
            anleitung:
              "1. Fragen vorbereiten: 'Welche Nummer ruft man bei Feuer?' (112), 'Was tun wenn es brennt?' (Raum verlassen, T\xFCr zu, 112 rufen), 'Was hat ein Feuerwehrauto?' (Leiter, Schlauch, Blaulicht). 2. Kinder sitzen im Kreis. 3. Frage vorlesen, wer zuerst aufzeigt darf antworten. 4. Richtig = Sticker auf die Feuerwehr-Karte. 5. Am Ende: Alle bekommen einen Feuerwehr-Ausweis.",
            dauer: 15,
          },
        ],
        gross: [
          {
            name: "Feuerwehr-Olympiade",
            desc: "5 Disziplinen: Zielspritzen, Hindernis, Knoten, Sprint und Quiz \u2014 wer wird Feuerwehr-Champion?",
            material:
              "Wasserpistolen oder Spr\xFChflaschen + Zielscheibe, Hindernismaterial, Seil f\xFCr Knoten, H\xFCtchen f\xFCr Sprint, Quiz-Karten, Punkte-Tafel",
            anleitung:
              "1. 5 Stationen aufbauen: (a) Zielspritzen mit Wasserpistole auf Dose, (b) Hindernis-Parcours auf Zeit, (c) Feuerwehr-Knoten binden (Kreuzknoten \u2014 Anleitung ausdrucken), (d) Sprint um H\xFCtchen, (e) 3 Quiz-Fragen. 2. Jedes Kind durchl\xE4uft alle Stationen. 3. Pro Station 1\u20135 Punkte. 4. Zusammenz\xE4hlen. 5. Top 3 bekommen Gold-/Silber-/Bronze-Medaillen.",
            dauer: 30,
          },
          {
            name: "Rettungs-Escape",
            desc: "R\xE4tsel l\xF6sen um den 'Brand' zu l\xF6schen \u2014 nur als Team schafft ihr es in 30 Minuten!",
            material:
              "5 R\xE4tsel-Umschl\xE4ge, Zahlenschloss, Taschenlampe, Timer, 'Flammen' aus rotem Krepppapier, Schatzkiste",
            anleitung:
              "1. Szenario: 'Feuer in der Feuerwache! L\xF6st 5 R\xE4tsel um den L\xF6schcode zu finden!' 2. R\xE4tsel: Feuerwehr-Bilderr\xE4tsel, Morse-SOS entschl\xFCsseln, Mathe-Aufgabe, Wort-R\xE4tsel, Code-Kombination. 3. Jedes R\xE4tsel gibt eine Zahl f\xFCr das Zahlenschloss. 4. 30 Minuten Timer. 5. Schloss offen = Brand gel\xF6scht! 6. Kinder arbeiten als Team. 7. Hinweis-Karten bereithalten.",
            dauer: 25,
          },
          {
            name: "Erste-Hilfe-Station",
            desc: "Verb\xE4nde anlegen und stabile Seitenlage \xFCben \u2014 kindgerecht und trotzdem lehrreich!",
            material:
              "Mullbinden, Pflaster, Dreieckst\xFCcher, Teddy oder Puppe als Patient, Erste-Hilfe-Fibel (kindgerecht)",
            anleitung:
              "1. Erkl\xE4re kurz: Was tun wenn jemand sich verletzt? (Hilfe holen, 112, tr\xF6sten). 2. Station 1: Pflaster richtig aufkleben (am Teddy \xFCben). 3. Station 2: Arm verbinden mit Mullbinde. 4. Station 3: Stabile Seitenlage \u2014 Kinder \xFCben gegenseitig (wer will). 5. Am Ende: Erste-Hilfe-Ausweis f\xFCr alle. 6. Wichtig: Leicht und spielerisch halten, kein Angst machen!",
            dauer: 15,
          },
        ],
      },
      deko: [
        {
          name: "Feuerwehr Teller+Becher (8 Pers.)",
          price: 12.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F692}",
          url: "https://www.amazon.de/s?k=feuerwehr+kindergeburtstag+teller+becher&tag=machsleicht-21",
        },
        {
          name: "Rote Luftballons 15 Stk.",
          price: 5.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F388}",
          url: "https://www.amazon.de/s?k=rote+luftballons+kindergeburtstag&tag=machsleicht-21",
        },
        {
          name: "Absperrband 10m",
          price: 4.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F6A7}",
          url: "https://www.amazon.de/s?k=absperrband+kindergeburtstag+feuerwehr&tag=machsleicht-21",
        },
      ],
      dekoMin: [
        {
          name: "Rote Luftballons 10 Stk.",
          price: 2.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F388}",
          url: "https://www.amazon.de/s?k=rote+luftballons&tag=machsleicht-21",
        },
      ],
      mitgebsel: [
        {
          name: "Mini-Feuerwehrautos 8 Stk.",
          price: 9.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F692}",
          url: "https://www.amazon.de/s?k=mini+feuerwehrautos+kinder&tag=machsleicht-21",
        },
        {
          name: "Feuerwehr-Sticker 80 Stk.",
          price: 4.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F3F7}\uFE0F",
          url: "https://www.amazon.de/s?k=feuerwehr+sticker+kinder&tag=machsleicht-21",
        },
        {
          name: "Papiert\xFCten rot 12 Stk.",
          price: 4.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F6CD}\uFE0F",
          url: "https://www.amazon.de/s?k=papiert%C3%BCten+rot+kindergeburtstag&tag=machsleicht-21",
        },
      ],
      kuchen: {
        klein: {
          name: "Feuerwehr-Muffins",
          desc: "Rote Glasur mit Mini-Feuerwehr obendrauf",
          rezept:
            "Vanilla-Muffins backen. Rote Glasur drauf (Puderzucker + rote Lebensmittelfarbe). Mini-Feuerwehrauto-Figur oder Feuerwehr-Picker obendrauf. Gelbe Streusel als Funken. Fertig in 30 Minuten!",
          url: "https://www.amazon.de/s?k=feuerwehr+muffin+deko+picker+kindergeburtstag&tag=machsleicht-21",
        },
        mittel: {
          name: "Feuerwehr-Kuchen",
          desc: "Kastenform mit roter Glasur und Gummib\xE4rchen-Leiter",
          rezept:
            "Kastenkuchen backen. Rote Glasur drauf (= Feuerwehrauto). Aus Mikado-Stangen oder Brezelstangen eine Leiter legen. Fenster aus wei\xDFem Fondant oder Oblaten. R\xE4der aus Oreo-Keksen. Blaulicht aus blauem Gummib\xE4rchen obendrauf.",
          url: "https://www.amazon.de/s?k=feuerwehr+tortendeko+kinder+geburtstag&tag=machsleicht-21",
        },
        gross: {
          name: "Feuerwache-Torte",
          desc: "Eckiger Kuchen mit Fondant-Toren und Spielzeug-Fahrzeug",
          rezept:
            "Eckigen Kuchen backen (Blechkuchen, quadratisch zuschneiden). Rote Fondant-Verkleidung. Tore aus grauem Fondant ausschneiden und anlegen. Echtes Spielzeug-Feuerwehrauto vor die Tore stellen. 112 aus Fondant-Zahlen obendrauf. Flammen aus Zuckerguss am Rand.",
          url: "https://www.amazon.de/s?k=fondant+set+rot+tortendeko+geburtstag&tag=machsleicht-21",
        },
      },
    },
    {
      id: "detektiv",
      name: "Detektiv-Einsatz",
      emoji: "\u{1F50D}",
      color: "#455A64",
      cat: "generic",
      spiele: {
        klein: [
          {
            name: "Spuren-Suche",
            desc: "Fußspuren aus Papier führen durchs Zimmer — die Kinder folgen der Spur und finden am Ende einen versteckten Umschlag!",
            material:
              "Fußspuren aus Tonpapier (10–15 Stk.), Briefumschlag mit Bild-Hinweis, Kreppband",
            anleitung:
              "1. Schneide Fußspuren aus Tonpapier aus und klebe sie mit Kreppband auf den Boden. 2. Die Spur führt durch 2–3 Räume. 3. Am Ende liegt ein Umschlag mit einem Bild (z.B. ein Teddybär). 4. Die Kinder suchen den Teddybär — darunter liegt der nächste Hinweis oder eine Belohnung. 5. Für 3-Jährige: kurze Spur, große Spuren.",
            dauer: 15,
          },
          {
            name: "Geräusche-Detektiv",
            desc: "Augen zu, Ohren auf! Verschiedene Geräusche erraten — vom Schlüsselbund bis zum Wasserplätschern.",
            material:
              "Gegenstände zum Geräusche-Machen: Schlüssel, Glocke, knisterndes Papier, Wasser in Becher, Löffel auf Topf, Reißverschluss",
            anleitung:
              "1. Kinder setzen sich im Kreis, Augen schließen. 2. Mache ein Geräusch (Schlüssel schütteln, Papier knistern etc.). 3. Wer es errät, darf das nächste Geräusch machen. 4. 8–10 Runden spielen. 5. Tipp: Bei ganz Kleinen Augen offen lassen, aber hinter dem Rücken verstecken.",
            dauer: 10,
          },
          {
            name: "Memory-Tablett",
            desc: "10 Gegenstände auf einem Tablett merken — dann wird eines heimlich entfernt. Was fehlt?",
            material:
              "Tablett oder großer Teller, 10 kleine Gegenstände (Löffel, Stift, Würfel, Münze, Radiergummi etc.), Tuch zum Abdecken",
            anleitung:
              "1. Lege 10 Gegenstände auf ein Tablett. 2. Kinder schauen 30 Sekunden. 3. Tuch drüber, heimlich einen Gegenstand wegnehmen. 4. Tuch weg — was fehlt? 5. Wer es findet, darf nächstes Mal etwas wegnehmen. 6. Für Kleine: nur 5–6 Gegenstände.",
            dauer: 15,
          },
        ],
        mittel: [
          {
            name: "Tatort-Ermittlung",
            desc: "Am 'Tatort' (dekorierter Tisch) liegen 6 Beweisstücke. Die Kinder müssen alles dokumentieren und den Täter finden!",
            material:
              "6 Beweisstücke (roter Faden, Knopf, Zettel mit Geheimschrift, Schuh-Abdruck auf Papier, Haarsträhne aus Wolle, Bonbonpapier), Notizbuch + Stifte pro Kind, 3 Verdächtigen-Steckbriefe",
            anleitung:
              "1. Richte einen Tisch als 'Tatort' her mit den 6 Beweisstücken. 2. Jedes Kind bekommt ein Notizbuch und dokumentiert alle Funde. 3. Hänge 3 Verdächtigen-Steckbriefe auf (mit Haarfarbe, Lieblings-Süßigkeit, Schuhgröße). 4. Die Beweise passen nur auf einen Verdächtigen. 5. Kinder diskutieren und lösen gemeinsam den Fall.",
            dauer: 25,
          },
          {
            name: "Geheimschrift-Werkstatt",
            desc: "Mit Zitronensaft unsichtbar schreiben — Föhn drüber und die Botschaft erscheint wie von Zauberhand!",
            material:
              "Zitronen + Auspressen, Wattestäbchen als 'Stifte', weißes Papier, Föhn oder Bügeleisen (nur Erwachsene)",
            anleitung:
              "1. Jedes Kind schreibt mit Zitronensaft und Wattestäbchen eine geheime Nachricht. 2. Trocknen lassen (Schrift wird unsichtbar). 3. Nachrichten tauschen. 4. Mit dem Föhn vorsichtig erwärmen — die Schrift wird braun und lesbar! 5. Alternativ: UV-Stifte + UV-Lampe (einfacher, aber weniger Wow).",
            dauer: 20,
          },
          {
            name: "Laser-Parcours",
            desc: "Wollfäden kreuz und quer durch den Flur gespannt — die Kinder müssen hindurch ohne einen Faden zu berühren!",
            material:
              "Rote Wolle oder Kreppband, Kreppband zum Befestigen, Glöckchen (optional, an Fäden als Alarm)",
            anleitung:
              "1. Spanne 8–12 Wollfäden kreuz und quer durch einen Flur oder Türrahmen. 2. Verschieden hoch: manche zum Drübersteigen, andere zum Drunterkriechen. 3. Kinder müssen einzeln durchkommen ohne einen Faden zu berühren. 4. Optional: Kleine Glöckchen an die Fäden = Alarm bei Berührung. 5. Jedes Kind hat 2 Versuche.",
            dauer: 15,
          },
        ],
        gross: [
          {
            name: "Krimi-Rätsel-Abend",
            desc: "Ein kompletter Kriminalfall zum Lösen! 5 Verdächtige, Alibis, Beweise — wer war der Täter?",
            material:
              "5 Verdächtigen-Karten (Name, Foto/Zeichnung, Alibi, Motiv), 8 Beweisstücke (Fotos, Zettel), Zeitstrahl-Poster, Ermittler-Dossier zum Ausfüllen",
            anleitung:
              "1. Verteile die Ermittler-Dossiers. 2. Präsentiere den Fall: 'Der goldene Pokal ist aus der Schule verschwunden!' 3. Zeige die 5 Verdächtigen mit ihren Alibis. 4. Verteile die Beweisstücke (ein Alibi hat eine Lücke, ein Beweisstück passt nur zu einem Verdächtigen). 5. Teams diskutieren und präsentieren ihre Lösung. 6. Auflösung + Siegerehrung.",
            dauer: 30,
          },
          {
            name: "Escape-Challenge: Eingesperrt!",
            desc: "5 Rätsel in 20 Minuten lösen um die verschlossene Schatzkiste zu öffnen. Teamwork gefragt!",
            material:
              "5 Rätsel-Umschläge, Zahlenschloss (3-stellig), Schatzkiste, Timer/Handy, Hinweiskarten als Joker",
            anleitung:
              "1. Erkläre: 'Ihr habt 20 Minuten um den Code zu knacken!' 2. 5 Umschläge mit Rätseln: Kreuzworträtsel, Bilder-Rätsel, Mathe-Aufgabe, Spiegel-Schrift, Puzzle. 3. Jedes Rätsel ergibt eine Zahl oder einen Buchstaben. 4. Alle zusammen = der 3-stellige Code fürs Zahlenschloss. 5. Timer laufen lassen! 2 Joker-Karten als Hilfe.",
            dauer: 25,
          },
          {
            name: "Fingerabdruck-Labor",
            desc: "Echte Fingerabdrücke nehmen, vergleichen und zuordnen — CSI-Style für Kids!",
            material:
              "Stempelkissen (schwarz), weißes Papier, Lupen, Klarsichtfolie, Babypuder + Pinsel (für Abdrücke auf glatten Flächen)",
            anleitung:
              "1. Jedes Kind nimmt seinen Fingerabdruck (Stempelkissen → Papier). 2. Mit Lupe vergleichen: Schleifen, Wirbel, Bögen — welche Muster gibt es? 3. Fortgeschritten: Babypuder auf ein Glas streuen, vorsichtig pusten → unsichtbare Abdrücke werden sichtbar! 4. Abdrücke mit Klarsichtfolie sichern. 5. Vergleich mit 'Tatort-Abdrücken' → wer war am Tatort?",
            dauer: 20,
          },
        ],
      },
      deko: [
        {
          name: "Detektiv Teller+Becher (8 Pers.)",
          price: 11.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F50D}",
          url: "https://www.amazon.de/s?k=detektiv+kindergeburtstag+teller+becher&tag=machsleicht-21",
        },
        {
          name: "Absperrband 10m",
          price: 5.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F6A7}",
          url: "https://www.amazon.de/s?k=absperrband+party+deko&tag=machsleicht-21",
        },
        {
          name: "Detektiv-Girlande",
          price: 6.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F389}",
          url: "https://www.amazon.de/s?k=detektiv+girlande+kindergeburtstag&tag=machsleicht-21",
        },
      ],
      dekoMin: [
        {
          name: "Schwarze+weiße Luftballons 10 Stk.",
          price: 2.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F388}",
          url: "https://www.amazon.de/s?k=schwarze+wei%C3%9Fe+luftballons&tag=machsleicht-21",
        },
        {
          name: "Fußspuren aus Tonpapier (DIY)",
          price: 0,
          eco: !0,
          bbl: "diy",
          emoji: "\u{1F463}",
          url: null,
        },
        {
          name: "Lupen 8 Stk.",
          price: 6.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F50E}",
          url: "https://www.amazon.de/s?k=lupen+kinder+set+detektiv&tag=machsleicht-21",
        },
        {
          name: "Detektiv-Sticker 100 Stk.",
          price: 3.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{2B50}",
          url: "https://www.amazon.de/s?k=detektiv+sticker+kinder&tag=machsleicht-21",
        },
        {
          name: "Geheim-Stifte UV 8 Stk.",
          price: 7.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F58A}",
          url: "https://www.amazon.de/s?k=geheimstift+uv+kinder+set&tag=machsleicht-21",
        },
      ],
      mitgebsel: [
        {
          name: "Mini-Lupen 12 Stk.",
          price: 6.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F50D}",
          url: "https://www.amazon.de/s?k=mini+lupen+kinder+set&tag=machsleicht-21",
        },
        {
          name: "Detektiv-Ausweise (DIY)",
          price: 0,
          eco: !0,
          bbl: "diy",
          emoji: "\u{1FAAA}",
          url: null,
        },
        {
          name: "Papiertüten schwarz 12 Stk.",
          price: 4.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F381}",
          url: "https://www.amazon.de/s?k=papiert%C3%BCten+schwarz+mitgebsel&tag=machsleicht-21",
        },
      ],
      kuchen: {
        klein: {
          name: "Lupe-Muffins",
          desc: "Schoko-Muffins mit Lupen-Deko aus Brezelstange + rundem Fruchtgummi",
          rezept:
            "Schoko-Muffins backen (200g Mehl, 30g Kakao, 150g Zucker, 100ml Öl, 2 Eier, 150ml Milch, 1 TL Backpulver — 20 Min. bei 180°C). Schoko-Glasur drauf. Pro Muffin: Brezelstange als Griff + runder Fruchtgummi-Ring oben drauf = Lupe.",
          url: "https://www.amazon.de/s?k=muffin+backform+kinder&tag=machsleicht-21",
        },
        mittel: {
          name: "Tatort-Kuchen",
          desc: "Schoko-Kuchen mit Kreideumriss-Deko aus weißer Glasur",
          rezept:
            "Schoko-Rührkuchen backen (Springform, 40 Min. bei 170°C). Dunkle Schoko-Glasur drüber. Mit weißer Zuckerschrift einen 'Kreideumriss' (Männchen-Silhouette) draufmalen. Fußspuren aus weißem Fondant daneben. Gelbes Absperrband aus Fruchtleder um den Rand.",
          url: "https://www.amazon.de/s?k=fondant+set+kinder+kuchen&tag=machsleicht-21",
        },
        gross: {
          name: "Escape-Kuchen mit Geheimfach",
          desc: "Zweistöckiger Kuchen mit versteckter Süßigkeit in der Mitte",
          rezept:
            "2 Rührteig-Böden backen (je 25 Min.). Aus dem unteren Boden ein Loch schneiden (Glas als Ausstecher). Mit Smarties/Gummibärchen füllen. Oberen Boden drauf = Deckel. Schoko-Glasur über alles. 'TOP SECRET' mit Zuckerschrift drauf. Beim Anschneiden fallen die Süßigkeiten raus — Überraschung!",
          url: "https://www.amazon.de/s?k=zuckerschrift+set+kuchen+deko&tag=machsleicht-21",
        },
      },
    },
    {
      id: "dschungel",
      name: "Dschungel-Abenteuer",
      emoji: "\u{1F412}",
      color: "#2E7D32",
      cat: "generic",
      spiele: {
        klein: [
          {
            name: "Lianenschwingen",
            desc: "An einer Decke oder einem Seil festhalten und über 'den Fluss' (blaues Tuch) schwingen — wie Tarzan!",
            material:
              "Großes Seil oder zusammengerollte Decke, blaues Tuch/Laken als Fluss, Kissen als sicherer Landeplatz",
            anleitung:
              "1. Seil an einem stabilen Haken/Ast befestigen (oder Decke zwischen zwei Erwachsenen halten). 2. Blaues Tuch auf den Boden = der Fluss. 3. Kinder halten sich fest und schwingen drüber. 4. Kissen als Landefläche. 5. Jedes Kind darf 3× schwingen. Sicherheit: Erwachsener steht daneben!",
            dauer: 15,
          },
          {
            name: "Papagei nachmachen",
            desc: "Ein Kind ist der Papagei und macht eine Bewegung vor — alle anderen müssen nachmachen. Wer falsch macht, wird der nächste Papagei!",
            material:
              "Kein Material nötig. Optional: bunte Tücher als Papagei-Federn",
            anleitung:
              "1. Ein Kind stellt sich in die Mitte (= der Papagei). 2. Es macht Bewegungen vor: Flügel schlagen, auf einem Bein hüpfen, sich drehen. 3. Alle machen nach. 4. Der Papagei ruft plötzlich 'Krokodil!' — dann müssen alle einfrieren. 5. Wer sich bewegt, ist der nächste Papagei. 6. Variante: Tiergeräusche statt Bewegungen.",
            dauer: 10,
          },
          {
            name: "Schlangen-Limbo",
            desc: "Unter einer 'Schlange' (Seil oder Tuch) durchgehen, ohne sie zu berühren. Immer tiefer!",
            material:
              "Seil, Springseil oder langes Tuch (grün bemalt = Schlange), 2 Stühle oder Helfer zum Halten",
            anleitung:
              "1. Zwei Helfer halten das Seil auf Brusthöhe der Kinder. 2. Alle gehen nacheinander darunter durch (Rücken nach hinten beugen). 3. Nach jeder Runde wird das Seil 10 cm tiefer. 4. Wer das Seil berührt, scheidet aus. 5. Tipp: Musik dazu spielen! 6. Für 3-Jährige: auch Durchkriechen erlauben.",
            dauer: 10,
          },
        ],
        mittel: [
          {
            name: "Brücke über den Krokodil-Fluss",
            desc: "Teams bauen aus Zeitungen, Klebeband und Pappkartons eine Brücke, die ein Kuscheltier tragen kann!",
            material:
              "Zeitungen (20 Blatt pro Team), Kreppband, 1 Kuscheltier als Test, optional: 2 Stühle als Ufer",
            anleitung:
              "1. Zwei Teams bilden. 2. Material verteilen. 3. Aufgabe: Baut in 10 Minuten eine Brücke zwischen zwei Stühlen (= Flussufer). 4. Test: Ein Kuscheltier muss drübergetragen werden ohne runterzufallen. 5. Zeitungen fest zusammenrollen = stabile Säulen. 6. Kreativität zählt!",
            dauer: 20,
          },
          {
            name: "Schlangengrube",
            desc: "Der Boden ist voller 'Schlangen' (Seile und Tücher). Nur auf den sicheren Steinen (Kissen) darf man stehen!",
            material:
              "8–10 Kissen oder Teppichfliesen, Seile/Tücher auf dem Boden verteilt, Start- und Zielmarkierung",
            anleitung:
              "1. Verteile Kissen als 'sichere Steine' durch den Raum. 2. Seile/Tücher dazwischen = Schlangen. 3. Kinder müssen von Start zu Ziel kommen, nur auf Kissen tretend. 4. Wer den Boden berührt, geht zurück zum Start. 5. Variante: Kissen nach und nach wegnehmen = wird immer schwerer.",
            dauer: 15,
          },
          {
            name: "Dschungel-Forschertagebuch",
            desc: "Jedes Kind bekommt ein Heft und zeichnet 'entdeckte' Tiere, Pflanzen und Spuren aus dem Garten.",
            material:
              "Kleine Hefte oder gefaltetes Papier (A5), Buntstifte, Lupen, optional: echte Blätter/Blüten zum Einkleben",
            anleitung:
              "1. Jedes Kind bekommt ein 'Forschertagebuch'. 2. Gemeinsam in den Garten oder Park gehen. 3. Aufgabe: 5 verschiedene Dinge finden und zeichnen (Blatt, Käfer, Stein, Blume, Spur). 4. Mit Lupe untersuchen und beschreiben. 5. Am Ende: Jeder präsentiert seine beste Entdeckung. 6. Drinnen-Variante: Tierfiguren im Raum verstecken.",
            dauer: 25,
          },
        ],
        gross: [
          {
            name: "Survival-Challenge",
            desc: "3 Dschungel-Aufgaben: Wasser filtern, Unterschlupf bauen, essbare Pflanzen erkennen.",
            material:
              "Plastikflasche + Sand + Kies + Watte (Wasserfilter), Stöcke + Decke (Unterschlupf), Bildkarten essbare/giftige Pflanzen (ausgedruckt)",
            anleitung:
              "1. Station Wasser: Flasche aufschneiden, Schichten einfüllen (Watte, Sand, Kies). Schmutziges Wasser durchlaufen lassen = klar! (Nicht trinken.) 2. Station Unterschlupf: In 10 Min. aus Stöcken + Decke einen Unterschlupf bauen, in den 2 Kinder passen. 3. Station Pflanzen: 10 Bildkarten — essbar oder giftig? 7 von 10 richtig = bestanden.",
            dauer: 30,
          },
          {
            name: "Expedition mit Kompass",
            desc: "Mit einem echten Kompass (oder Handy) Richtungsanweisungen folgen und versteckte Hinweise finden!",
            material:
              "Kompass oder Handy mit Kompass-App, 5 Briefumschläge mit Richtungsanweisungen, Schrittzähler (optional)",
            anleitung:
              "1. Am Startpunkt: Erster Umschlag mit Anweisung ('20 Schritte Richtung Osten'). 2. Am Ziel: nächster Umschlag ('15 Schritte Richtung Nord-West'). 3. 5 Stationen insgesamt. 4. Am letzten Punkt: Belohnung/Schatzkiste. 5. Vor dem Spiel: kurz erklären wie ein Kompass funktioniert.",
            dauer: 25,
          },
          {
            name: "Dschungel-Escape: Rettet den Forscher!",
            desc: "Professor Grün ist in der Dschungel-Falle gefangen! 5 Rätsel lösen in 20 Minuten um ihn zu befreien.",
            material:
              "5 Rätsel-Umschläge (Kreuzworträtsel, Bilderrätsel, Rechenaufgabe, Geheimschrift, Puzzle), Zahlenschloss, verschlossene Box, Timer",
            anleitung:
              "1. Geschichte erzählen: Professor Grün braucht Hilfe! 2. Timer starten: 20 Minuten. 3. 5 Umschläge mit steigender Schwierigkeit. 4. Jedes Rätsel ergibt eine Ziffer des 3-stelligen Codes. 5. Code ins Zahlenschloss → Box öffnet sich → Schatz + Dankesbrief vom Professor. 6. Tipp: 2 Joker-Karten als Hinweise bereithalten.",
            dauer: 25,
          },
        ],
      },
      deko: [
        {
          name: "Dschungel Teller+Becher (8 Pers.)",
          price: 12.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F412}",
          url: "https://www.amazon.de/s?k=dschungel+kindergeburtstag+teller+becher&tag=machsleicht-21",
        },
        {
          name: "Tropische Blätter-Girlande",
          price: 7.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F33F}",
          url: "https://www.amazon.de/s?k=tropische+bl%C3%A4tter+girlande+deko&tag=machsleicht-21",
        },
        {
          name: "Dschungel-Luftballons 15 Stk.",
          price: 6.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F388}",
          url: "https://www.amazon.de/s?k=dschungel+luftballons+kinder+party&tag=machsleicht-21",
        },
      ],
      dekoMin: [
        {
          name: "Grüne Tischdecke",
          price: 3.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F33F}",
          url: "https://www.amazon.de/s?k=gr%C3%BCne+tischdecke+party&tag=machsleicht-21",
        },
        {
          name: "Grüne+braune Luftballons 10 Stk.",
          price: 2.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F388}",
          url: "https://www.amazon.de/s?k=gr%C3%BCne+braune+luftballons&tag=machsleicht-21",
        },
        {
          name: "Lianen aus Krepppapier (DIY)",
          price: 1.99,
          eco: !0,
          bbl: "diy",
          emoji: "\u{1F331}",
          url: "https://www.amazon.de/s?k=krepppapier+gr%C3%BCn&tag=machsleicht-21",
        },
        {
          name: "Affen-Sticker 80 Stk.",
          price: 3.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F412}",
          url: "https://www.amazon.de/s?k=affen+sticker+kinder&tag=machsleicht-21",
        },
        {
          name: "Tierfiguren Dschungel 12 Stk.",
          price: 8.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F981}",
          url: "https://www.amazon.de/s?k=dschungel+tierfiguren+set+kinder&tag=machsleicht-21",
        },
      ],
      mitgebsel: [
        {
          name: "Mini-Ferngläser 8 Stk.",
          price: 9.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F52D}",
          url: "https://www.amazon.de/s?k=mini+fernglas+kinder+set&tag=machsleicht-21",
        },
        {
          name: "Dschungel-Tattoos 50 Stk.",
          price: 3.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F43E}",
          url: "https://www.amazon.de/s?k=dschungel+tattoos+kinder&tag=machsleicht-21",
        },
        {
          name: "Papiertüten grün 12 Stk.",
          price: 4.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F381}",
          url: "https://www.amazon.de/s?k=papiert%C3%BCten+gr%C3%BCn+mitgebsel&tag=machsleicht-21",
        },
      ],
      kuchen: {
        klein: {
          name: "Affen-Muffins",
          desc: "Schoko-Muffins mit Bananengesicht aus gelber Glasur + Schoko-Augen",
          rezept:
            "Schoko-Muffins backen (Grundrezept). Gelbe Zuckerglasur (Puderzucker + Zitronensaft + gelbe Lebensmittelfarbe) als Gesicht aufspritzen. Schoko-Drops als Augen, halbes Smartie als Nase. Halbe Waffelröllchen seitlich als Ohren reinstecken.",
          url: "https://www.amazon.de/s?k=muffin+backform+kinder&tag=machsleicht-21",
        },
        mittel: {
          name: "Schlangen-Kuchen",
          desc: "Langer Kuchen in S-Form — eine bunte Dschungel-Schlange!",
          rezept:
            "Rührkuchen in Kastenform backen. Abkühlen, schräg halbieren und S-förmig zusammensetzen (mit Buttercreme kleben). Grüne Glasur (Puderzucker + Lebensmittelfarbe) drüber. Smarties als Schuppen. Zunge aus rotem Fruchtleder. Augen aus weißem Fondant + Schoko-Drops.",
          url: "https://www.amazon.de/s?k=lebensmittelfarbe+gr%C3%BCn+backen&tag=machsleicht-21",
        },
        gross: {
          name: "Wasserfall-Kuchen",
          desc: "Schoko-Kuchen mit blauer Glasur als Wasserfall + grüne Deko",
          rezept:
            "Hohen Rührkuchen backen (Kastenform, 45 Min.). Aufrecht hinstellen. Weiße Glasur als Basis. Blaue Zuckerglasur von oben langsam runterlaufen lassen = Wasserfall-Effekt. Grüne Gummibärchen und Brezeln als Dschungel-Pflanzen um den Fuß. Optional: kleinen Teich aus blauem Wackelpudding vor den Kuchen.",
          url: "https://www.amazon.de/s?k=lebensmittelfarbe+blau+backen&tag=machsleicht-21",
        },
      },
    },
    {
      id: "feen",
      name: "Feenwald-Party",
      emoji: "\u{1F9DA}",
      color: "#AB47BC",
      cat: "generic",
      spiele: {
        klein: [
          {
            name: "Blumenkranz flechten",
            desc: "Aus Gänseblümchen, Klee und bunten Bändern einen echten Blumenkranz binden — jede kleine Fee bekommt ihre Krone!",
            material:
              "Frische Blumen (Gänseblümchen, Klee) oder Kunstblumen, dünner Basteldraht, bunte Bänder, Schere",
            anleitung:
              "1. Draht zu einem Kreis biegen (Kopfumfang des Kindes). 2. Blumen und Bänder mit dünnem Draht umwickeln und befestigen. 3. Für 3-Jährige: Erwachsener macht die Basis, Kind steckt Blumen rein. 4. Variante ohne Draht: Blumen auf Pappstreifen kleben. 5. Jedes Kind setzt seinen Kranz auf — Foto!",
            dauer: 15,
          },
          {
            name: "Schmetterlings-Jagd",
            desc: "Bunte Papierschmetterlinge flattern durch den Garten — die Kinder fangen sie mit kleinen Keschern!",
            material:
              "15–20 Papierschmetterlinge (aus buntem Tonpapier ausgeschnitten), Kescher oder kleine Siebe, Wäscheklammern zum Aufhängen",
            anleitung:
              "1. Schneide bunte Schmetterlinge aus Tonpapier aus. 2. Hänge sie mit Wäscheklammern an Büsche, Äste, Zäune (leicht erreichbar). 3. Jedes Kind bekommt einen Kescher (oder kleines Küchensieb). 4. Auf 'Los!' fangen alle Schmetterlinge ein. 5. Wer die meisten hat, ist der Schmetterlings-König/die Königin.",
            dauer: 10,
          },
          {
            name: "Feenflügel basteln",
            desc: "Aus Pappe und Glitzer werden funkelnde Feenflügel gebastelt — zum Anziehen und Rumfliegen!",
            material:
              "Pappe (A3 pro Kind), Schere, Glitzerkleber, Aufkleber, Gummibänder als Tragegurte, Schablone für Flügelform",
            anleitung:
              "1. Flügelform auf Pappe vorzeichnen (Schablone). 2. Kinder schneiden aus (bei Kleinen: vorschneiden). 3. Mit Glitzerkleber, Stickern und Bändern verzieren. 4. Gummiband als Tragegurt hinten befestigen (wie ein Rucksack). 5. Anziehen und durch den Garten 'fliegen'!",
            dauer: 20,
          },
        ],
        mittel: [
          {
            name: "Feengarten bauen",
            desc: "In einer Schale mit Erde einen Mini-Feengarten anlegen: Moos, Steinchen, Zweige als Bäume, ein Spiegelstück als Teich!",
            material:
              "Flache Schalen oder Untersetzer (1 pro Kind), Blumenerde, Moos, kleine Steine, Zweige, Alufolie/Spiegelstücke als Teich, Mini-Figuren (Feen/Pilze)",
            anleitung:
              "1. Jedes Kind bekommt eine Schale mit Erde. 2. Moos als Wiese drauflegen. 3. Steinchen als Weg. 4. Zweige als Bäume reinstecken. 5. Alufolie glatt = Teich. 6. Mini-Figuren platzieren. 7. Jedes Kind nimmt seinen Feengarten mit nach Hause! 8. Tipp: Echte kleine Pflanzen (Sukkulenten) als Bäume.",
            dauer: 25,
          },
          {
            name: "Wunschbrunnen-Werfen",
            desc: "Glitzersteine in den 'Wunschbrunnen' (Eimer mit Wasser) werfen und sich dabei etwas wünschen!",
            material:
              "Eimer oder große Schüssel mit Wasser (= Brunnen), bunte Glassteine, Kreppband für Wurflinie (2m Abstand)",
            anleitung:
              "1. Eimer mit Wasser aufstellen, mit Blumen dekorieren. 2. Wurflinie mit Kreppband markieren (2m für Kleine, 3m für Größere). 3. Jedes Kind bekommt 3 Steine. 4. Augen zu, Wunsch denken, Stein werfen! 5. Wer trifft, darf einen zweiten Wunsch machen. 6. Punkte zählen: im Wasser = 1 Punkt, Mitte = 3 Punkte.",
            dauer: 10,
          },
          {
            name: "Pilzkreis-Tanz",
            desc: "Die Kinder tanzen im Kreis um Pilze (Hütchen). Wenn die Musik stoppt: schnell auf einen Pilz stellen! Wer keinen hat, scheidet aus.",
            material:
              "8–10 Pappteller oder Hütchen als 'Pilze', Musikbox, bunte Tücher zum Tanzen",
            anleitung:
              "1. 'Pilze' (Pappteller oder Hütchen) im Kreis auf den Boden legen — immer einer weniger als Kinder. 2. Musik an: Kinder tanzen um die Pilze. 3. Musik aus: alle stellen sich auf einen Pilz! 4. Wer keinen hat, scheidet aus. 5. Pro Runde einen Pilz wegnehmen. 6. Wie Reise nach Jerusalem, aber mit Feen-Twist!",
            dauer: 15,
          },
        ],
        gross: [
          {
            name: "Naturmandala legen",
            desc: "Aus Naturmaterialien ein großes Mandala auf dem Boden gestalten — Blätter, Steine, Blüten, Äste in konzentrischen Kreisen.",
            material:
              "Naturmaterialien sammeln: Blätter, Blüten, Steine, Äste, Zapfen, Moos, Federn. Großes Tuch oder freie Fläche auf dem Boden",
            anleitung:
              "1. Gemeinsam 10 Minuten Naturmaterialien im Garten/Park sammeln. 2. Auf einer freien Fläche einen Mittelpunkt festlegen (besonderer Stein). 3. In konzentrischen Kreisen drumherum legen: erst Blätter, dann Steine, dann Blüten. 4. Teams übernehmen je einen Ring. 5. Am Ende: Foto von oben! 6. Variation: Wettbewerb — welches Team hat den schönsten Abschnitt?",
            dauer: 25,
          },
          {
            name: "Feenhaus-Architektur",
            desc: "Teams bauen Feenhäuser aus Naturmaterialien: Stöcke, Blätter, Moos, Rinde. Welches Haus ist das schönste?",
            material:
              "Stöcke, Blätter, Moos, Rinde, Steine, Schnur/Draht zum Befestigen, Schere, kleine Deko-Elemente (Perlen, Glitzer)",
            anleitung:
              "1. 2–3 Teams bilden. 2. Material verteilen oder gemeinsam sammeln (10 Min.). 3. 15 Minuten Bauzeit! 4. Regeln: Mindestens 10 cm hoch, muss eine Tür haben. 5. Jury-Bewertung: Kreativität, Stabilität, Schönheit. 6. Alle Häuser bleiben im Garten stehen als 'Feendorf'. 7. Fotos machen!",
            dauer: 30,
          },
          {
            name: "Feen-Escape: Das verzauberte Buch",
            desc: "Ein magisches Buch ist verschlossen! 5 Rätsel lösen um den Zauberspruch zu finden und das Buch zu öffnen.",
            material:
              "Altes Buch mit Zahlenschloss umwickelt (oder verschlossene Box), 5 Rätsel-Umschläge, Timer, Glitzer-Deko, Joker-Karten",
            anleitung:
              "1. Geschichte: 'Das Buch der Feen ist von einem Troll verzaubert worden!' 2. 5 Umschläge mit Rätseln: Blätter-Zuordnung (Natur-Wissen), Blumen-Sudoku, Spiegel-Schrift, Feen-Kreuzworträtsel, Farb-Misch-Rätsel. 3. Jedes Rätsel ergibt eine Ziffer. 4. 20 Minuten Zeit! 5. Code eingeben → Buch/Box öffnet sich → darin: Urkunde + Schatz.",
            dauer: 25,
          },
        ],
      },
      deko: [
        {
          name: "Feen Teller+Becher (8 Pers.)",
          price: 11.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F9DA}",
          url: "https://www.amazon.de/s?k=feen+kindergeburtstag+teller+becher&tag=machsleicht-21",
        },
        {
          name: "Schmetterlings-Girlande",
          price: 6.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F98B}",
          url: "https://www.amazon.de/s?k=schmetterling+girlande+deko+party&tag=machsleicht-21",
        },
        {
          name: "Blumen-Luftballons 15 Stk.",
          price: 7.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F388}",
          url: "https://www.amazon.de/s?k=blumen+luftballons+kinder+party&tag=machsleicht-21",
        },
      ],
      dekoMin: [
        {
          name: "Rosa+lila Luftballons 10 Stk.",
          price: 2.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F388}",
          url: "https://www.amazon.de/s?k=rosa+lila+luftballons&tag=machsleicht-21",
        },
        {
          name: "Tüll-Tischdecke rosa",
          price: 4.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{2728}",
          url: "https://www.amazon.de/s?k=t%C3%BCll+tischdecke+rosa+party&tag=machsleicht-21",
        },
        {
          name: "Papierblumen basteln (DIY)",
          price: 0,
          eco: !0,
          bbl: "diy",
          emoji: "\u{1F338}",
          url: null,
        },
        {
          name: "Schmetterlings-Sticker 100 Stk.",
          price: 3.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F98B}",
          url: "https://www.amazon.de/s?k=schmetterling+sticker+kinder&tag=machsleicht-21",
        },
        {
          name: "LED-Lichterkette warmweiß 3m",
          price: 5.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{2728}",
          url: "https://www.amazon.de/s?k=lichterkette+warmwei%C3%9F+batterie+3m&tag=machsleicht-21",
        },
      ],
      mitgebsel: [
        {
          name: "Mini-Feenstäbe 8 Stk.",
          price: 7.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{2728}",
          url: "https://www.amazon.de/s?k=feenstab+kinder+set&tag=machsleicht-21",
        },
        {
          name: "Schmetterlings-Tattoos 50 Stk.",
          price: 3.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F98B}",
          url: "https://www.amazon.de/s?k=schmetterling+tattoos+kinder&tag=machsleicht-21",
        },
        {
          name: "Organza-Beutel lila 12 Stk.",
          price: 4.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F381}",
          url: "https://www.amazon.de/s?k=organza+beutel+lila+klein&tag=machsleicht-21",
        },
      ],
      kuchen: {
        klein: {
          name: "Blumenwiese-Muffins",
          desc: "Muffins mit grüner Glasur und Blumen aus Gummibärchen + Smarties",
          rezept:
            "Vanille-Muffins backen (Grundrezept). Grüne Zuckerglasur drauf (= Wiese). Pro Muffin: Gummibärchen-Blüte (5 bunte Bärchen im Kreis, gelbes Smartie in die Mitte). Grüne Esspapier-Streifen als Grashalme.",
          url: "https://www.amazon.de/s?k=muffin+backform+kinder&tag=machsleicht-21",
        },
        mittel: {
          name: "Pilz-Kuchen",
          desc: "Runder Kuchen = Pilzhut, bedeckt mit roten Smarties und weißen Tupfen",
          rezept:
            "Rührkuchen in einer Schüssel backen (= Halbkugel/Pilzhut). Auf einen kleinen zylindrischen Kuchen setzen (= Stiel, aus Kastenform geschnitten). Rote Glasur auf den Hut, weiße Fondant-Punkte drauf = Fliegenpilz! Grünes Esspapier als Gras um den Stiel.",
          url: "https://www.amazon.de/s?k=fondant+wei%C3%9F+kuchen+deko&tag=machsleicht-21",
        },
        gross: {
          name: "Feenwald-Torte",
          desc: "Zweistöckige grüne Torte mit Pilzen aus Marshmallows + echten Blüten",
          rezept:
            "2 Rührkuchen-Böden backen. Übereinander mit Vanille-Buttercreme. Außen grüne Glasur = Moos. Pilze: Marshmallow auf Brezelstange, Spitze in rote Glasur tauchen + weiße Schoko-Tropfen = Fliegenpilze. Essbare Blüten oder Fondant-Blumen auf die Torte setzen. Puderzucker als Feenstaub drübersieben.",
          url: "https://www.amazon.de/s?k=essbare+bl%C3%BCten+torte+deko&tag=machsleicht-21",
        },
      },
    },
];

var LICENSE = [
    // LICENSE-Mottos (Frozen, Harry Potter, Minecraft, Ninjago, Paw Patrol, Pokemon,
    // Spider-Man, Super Mario) wurden am 29.04.2026 entfernt — Markenrechts-Risiko.
    // Aufgehoben in /tmp/license-mottos-backup.js falls Reskin-Strategie geplant wird.
];

var BBL = {
    buy: { l: "Kaufen", c: "#E8873D" },
    borrow: { l: "Leihen", c: "#1565C0" },
    diy: { l: "DIY", c: "#2E7D32" },
    later: { l: "Sp\xE4ter", c: "#6B5D52" },
};

var ALL_MOTTOS = [].concat(GENERIC, LICENSE);

var STATION_SETS = {
  piraten: [
    { n: 1, emoji: "\uD83C\uDF7E", title: "Flaschenpost", hint: "Eine Nachricht in der Flasche verr\u00E4t den Startpunkt\u2026" },
    { n: 2, emoji: "\uD83E\uDDED", title: "Kompass-R\u00E4tsel", hint: "Norden? S\u00FCden? Nur der richtige Kurs f\u00FChrt weiter." },
    { n: 3, emoji: "\uD83D\uDD10", title: "Geheimschrift", hint: "Entschl\u00FCssle die Botschaft mit dem Piraten-Alphabet!" },
    { n: 4, emoji: "\uD83D\uDC80", title: "Mutprobe", hint: "Traust du dich in die dunkle H\u00F6hle?" },
    { n: 5, emoji: "\uD83D\uDCB0", title: "Der Schatz!", hint: "X markiert die Stelle\u2026" },
  ],
  safari: [
    { n: 1, emoji: "\uD83D\uDC3E", title: "Tierspuren", hint: "Welches Tier hat diese Spur hinterlassen?" },
    { n: 2, emoji: "\uD83D\uDD2D", title: "Fernglas-Station", hint: "Finde die versteckten Tiere im Dickicht!" },
    { n: 3, emoji: "\uD83E\uDDED", title: "Dschungel-Karte", hint: "Folge dem Pfad durch den Regenwald\u2026" },
    { n: 4, emoji: "\uD83D\uDC0D", title: "Schlangen-Grube", hint: "Vorsicht! Welcher Weg f\u00FChrt sicher vorbei?" },
    { n: 5, emoji: "\uD83E\uDD81", title: "L\u00F6wen-Schatz!", hint: "Der K\u00F6nig der Tiere bewacht die Beute\u2026" },
  ],
  dino: [
    { n: 1, emoji: "\uD83E\uDD9A", title: "Fossilien-Fund", hint: "Grabe den ersten Knochen aus!" },
    { n: 2, emoji: "\uD83C\uDF0B", title: "Vulkan-R\u00E4tsel", hint: "Der Vulkan brodelt \u2014 l\u00F6se das R\u00E4tsel!" },
    { n: 3, emoji: "\uD83E\uDD95", title: "Dino-Spuren", hint: "Welcher Dinosaurier war hier?" },
    { n: 4, emoji: "\uD83E\uDDB4", title: "Skelett-Puzzle", hint: "Setze die Knochen richtig zusammen!" },
    { n: 5, emoji: "\uD83D\uDC8E", title: "Bernstein-Schatz!", hint: "Ein urzeitlicher Schatz wartet\u2026" },
  ],
  weltraum: [
    { n: 1, emoji: "\uD83D\uDE80", title: "Raketenstart", hint: "Z\u00E4hle den Countdown und starte die Mission!" },
    { n: 2, emoji: "\u2B50", title: "Sternbild-Code", hint: "Verbinde die Sterne zum geheimen Zeichen." },
    { n: 3, emoji: "\uD83E\uDE90", title: "Planeten-Quiz", hint: "Welcher Planet hat die meisten Monde?" },
    { n: 4, emoji: "\uD83D\uDC7E", title: "Alien-Kontakt", hint: "Entschl\u00FCssle die Botschaft der Au\u00DFerirdischen!" },
    { n: 5, emoji: "\uD83C\uDF1F", title: "Weltraum-Schatz!", hint: "Die Raumstation birgt das Geheimnis\u2026" },
  ],
  einhorn: [
    { n: 1, emoji: "\uD83C\uDF08", title: "Regenbogen-Pfad", hint: "Folge den Farben zum n\u00E4chsten Hinweis!" },
    { n: 2, emoji: "\u2728", title: "Glitzer-R\u00E4tsel", hint: "Nur magischer Staub macht die Schrift sichtbar\u2026" },
    { n: 3, emoji: "\uD83E\uDDDA", title: "Feen-Botschaft", hint: "Die Fee fl\u00FCstert dir den Weg zu\u2026" },
    { n: 4, emoji: "\uD83D\uDD2E", title: "Kristallkugel", hint: "Schau hinein \u2014 was siehst du?" },
    { n: 5, emoji: "\uD83E\uDD84", title: "Einhorn-Schatz!", hint: "Am Ende des Regenbogens wartet Magie\u2026" },
  ],
  feuerwehr: [
    { n: 1, emoji: "\uD83D\uDEA8", title: "Alarm!", hint: "Der Notruf kommt rein \u2014 wohin m\u00FCsst ihr?" },
    { n: 2, emoji: "\uD83E\uDDEF", title: "Schlauch-Puzzle", hint: "Welcher Schlauch f\u00FChrt zum Hydranten?" },
    { n: 3, emoji: "\uD83D\uDD25", title: "Feuer-Quiz", hint: "Teste dein Feuerwehr-Wissen!" },
    { n: 4, emoji: "\uD83E\uDE9C", title: "Leiter-Mission", hint: "Klettere hoch und rette die Katze!" },
    { n: 5, emoji: "\uD83C\uDFC5", title: "Rettungs-Orden!", hint: "Mission erf\u00FCllt \u2014 du bist ein Held!" },
  ],
};

var DEFAULT_STATIONS = [
  { n: 1, emoji: "\uD83D\uDCDC", title: "Erster Hinweis", hint: "Die Suche beginnt \u2014 finde den Startpunkt!" },
  { n: 2, emoji: "\uD83E\uDDE9", title: "R\u00E4tsel-Station", hint: "Knacke das R\u00E4tsel f\u00FCr den n\u00E4chsten Hinweis." },
  { n: 3, emoji: "\uD83D\uDD10", title: "Geheimcode", hint: "Entschl\u00FCssle den Code!" },
  { n: 4, emoji: "\uD83C\uDFAF", title: "Challenge", hint: "Beweise deinen Mut und dein Geschick!" },
  { n: 5, emoji: "\uD83D\uDCB0", title: "Der Schatz!", hint: "X markiert die Stelle\u2026" },
];

var MOTTO_GREETINGS = {
  piraten: "Ahoi", safari: "Achtung Safari-Crew", weltraum: "Achtung Astronaut",
  dino: "Roaaar", einhorn: "Zauberhafte Gr\u00FC\u00DFe", feuerwehr: "Tat\u00FCtata",
  detektiv: "Hey Detektiv", dschungel: "Hallo Forscher", feen: "Zauberhafte Gr\u00FC\u00DFe",
};
