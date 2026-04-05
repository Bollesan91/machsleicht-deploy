var SZ_THEMES = [{id:"piraten",name:"Piraten-Schatzsuche",emoji:"\u{1F3F4}\u200D\u2620\uFE0F",color:"#5D4037",intro:{klein:"K\xE4pt'n Krake hat seinen Schatz versteckt! {name}, hilf ihm, die Schatzkarte zu lesen und den Schatz zu finden!",mittel:"K\xE4pt'n Rotbart hat seinen Goldschatz auf einer geheimen Insel vergraben. {name}, folgt den Hinweisen und l\xF6st die R\xE4tsel, bevor die Flut kommt!",gross:"Das Logbuch der verschollenen 'Black Pearl' wurde gefunden. {name}, darin stecken verschl\xFCsselte Koordinaten zu einem legend\xE4ren Schatz. K\xF6nnt ihr den Code knacken?"},stations:{klein:[{name:"Flaschenpost finden",desc:"Eine echte Flasche mit einer Nachricht liegt versteckt. Darin steht der erste Hinweis als Bild (Pfeil zum n\xE4chsten Ort).",dauer:5,typ:"suchen",hint:"Flasche gut sichtbar verstecken. Nachricht als einfaches Bild mit Pfeil."},{name:"Schiff beladen",desc:"Einen Eimer mit B\xE4llen f\xFCllen \u2014 aber nur mit einer Hand! Die andere h\xE4lt das 'Steuer' (einen Stock). Wer hat am schnellsten 5 B\xE4lle im Eimer?",dauer:8,typ:"geschick",hint:"Tennisb\xE4lle oder Socken-Kn\xE4uel. Eimer = das Schiff."},{name:"Piraten-Verkleidung",desc:"An dieser Station liegen Piratenh\xFCte (Zeitungspapier), Augenklappen (schwarzes Papier + Gummi) und Fernrohre (Klopapierrollen). Jedes Kind bastelt seine Verkleidung.",dauer:10,typ:"basteln",hint:"Alles vorbereiten und auslegen. Kinder lieben es, sich zu verkleiden."},{name:"Schatz im Sand",desc:"In einer Wanne mit Sand (oder Reis) sind Goldm\xFCnzen (Schoko-Taler) versteckt. Jedes Kind darf 3 M\xFCnzen finden und behalten.",dauer:5,typ:"suchen",hint:"Gro\xDFe flache Wanne. 3\u20135 M\xFCnzen pro Kind verstecken."},{name:"Schatzkiste \xF6ffnen!",desc:"Die letzte Station! Eine Kiste (Schuhkarton, verziert) mit dem Schatz: S\xFC\xDFigkeiten + kleine Spielzeuge f\xFCr alle.",dauer:5,typ:"finale",hint:"Kiste mit Goldpapier bekleben. Der Wow-Moment!"}],mittel:[{name:"Flaschenpost entschl\xFCsseln",desc:"Die Flaschenpost enth\xE4lt eine Nachricht in Spiegelschrift. Kinder m\xFCssen sie vor einen Spiegel halten (oder r\xFCckw\xE4rts lesen) um den ersten Hinweis zu bekommen.",dauer:5,typ:"r\xE4tseln",hint:"Text r\xFCckw\xE4rts schreiben oder ausdrucken. Kleinen Spiegel bereitlegen."},{name:"Seeungeheuer besiegen",desc:"Dosenwerfen! 6 Becher \xFCbereinander gestapelt = das Seeungeheuer. Jedes Kind hat 3 W\xFCrfe mit Sockenb\xE4llen. Alle umwerfen = Hinweis zum n\xE4chsten Ort.",dauer:8,typ:"action",hint:"Becher mit Seeungeheuer-Gesichtern bemalen. Aus 2m Entfernung werfen."},{name:"Knotenkunde",desc:"Drei verschiedene Knoten an einem Seil lernen: einfacher Knoten, Schleife, Achterknoten. Wer alle drei schafft, bekommt den n\xE4chsten Hinweis.",dauer:10,typ:"geschick",hint:"Vorher \xFCben! Anleitung ausdrucken und daneben legen."},{name:"Schatzkarten-Puzzle",desc:"Die Schatzkarte wurde in 6 Teile zerrissen! Die Teile sind im Garten/Raum verteilt. Zusammenpuzzlen ergibt den Ort des Schatzes.",dauer:10,typ:"suchen",hint:"A4-Karte in 6 Teile schneiden. Auf der R\xFCckseite nummerieren falls es zu schwer ist."},{name:"Schatz ausgraben!",desc:"Am Ort aus der Karte graben die Kinder den Schatz aus (eingegraben oder unter Bl\xE4ttern/Kissen versteckt).",dauer:5,typ:"finale",hint:"Schatzkiste leicht bedecken, nicht zu tief vergraben."}],gross:[{name:"Logbuch entschl\xFCsseln",desc:"Die erste Seite des Logbuchs ist in einer Caesar-Verschl\xFCsselung geschrieben (jeder Buchstabe um 3 verschoben). Enth\xE4lt die Koordinaten zur n\xE4chsten Station.",dauer:8,typ:"r\xE4tseln",hint:"Alphabet-Tabelle als Hilfe bereitlegen. A=D, B=E etc."},{name:"Navigations-Challenge",desc:"Mit einem echten Kompass (oder Handy) m\xFCssen die Kinder eine bestimmte Richtung laufen und die Schritte z\xE4hlen. Am Ziel: n\xE4chster Hinweis.",dauer:8,typ:"action",hint:"Kompass-App reicht. '30 Schritte Richtung Nord-Ost' etc."},{name:"Seemanns-Pr\xFCfung",desc:"5 Aufgaben: Knoten binden, Entfernung sch\xE4tzen, Windrichtung bestimmen, 3 Sternbilder nennen, Flaggen-Alphabet (1 Wort) entschl\xFCsseln.",dauer:12,typ:"r\xE4tseln",hint:"Flaggen-Alphabet ausdrucken. Rest m\xFCndlich abfragen."},{name:"Fluch des K\xE4pt'ns",desc:"Ein Kreuzwortr\xE4tsel mit Piraten-Begriffen. Die markierten Buchstaben ergeben das L\xF6sungswort = den Ort des Schatzes.",dauer:10,typ:"r\xE4tseln",hint:"Kreuzwortr\xE4tsel vorher erstellen. 8\u201310 Begriffe reichen."},{name:"Der Schatz der Black Pearl",desc:"Am L\xF6sungsort: eine verschlossene Truhe mit Zahlenschloss. Die Kombination ergibt sich aus den gesammelten Zahlen aller Stationen.",dauer:5,typ:"finale",hint:"Zahlenschloss kaufen (\u20AC3). An jeder Station eine Zahl als Bonus verstecken."}]},material:{klein:["Flasche + Nachricht","Eimer + 15 B\xE4lle/Socken","Zeitungspapier + Scheren + Gummib\xE4nder + Klopapierrollen","Wanne + Sand/Reis + Schoko-Goldm\xFCnzen","Schatzkiste (Schuhkarton) + Schatz"],mittel:["Flasche + Spiegelschrift-Nachricht + Spiegel","6 Becher + 3 Sockenb\xE4lle","Seil (2m) + Knoten-Anleitung","Schatzkarte (A4, in 6 Teile geschnitten)","Schatzkiste + Schatz"],gross:["Logbuch (Bl\xE4tter, Tee-gef\xE4rbt) + Caesar-Tabelle","Kompass oder Handy","Flaggen-Alphabet Ausdruck + 5 Aufgaben","Kreuzwortr\xE4tsel Ausdruck","Zahlenschloss + Schatztruhe + Schatz"]},schatz:["Schoko-Goldm\xFCnzen","Kleine Spielzeuge","Tattoos","Sticker","Piraten-Augenklappen"]},{id:"dschungel",name:"Dschungel-Expedition",emoji:"\u{1F981}",color:"#D4A574",intro:{klein:"Die Tiere im Dschungel brauchen eure Hilfe! {name}, findet alle versteckten Tierbabys und bringt sie sicher zur\xFCck.",mittel:"Forscherin Dr. Flora hat ihren Rucksack im Dschungel verloren \u2014 darin: die Karte zum geheimen Wasserfall. {name}, folgt den Tierspuren!",gross:"Ein seltenes Tier wurde im Dschungel gesichtet. {name}, euer Auftrag als Expeditionsteam: Findet es, dokumentiert es, und bringt eine Probe zur\xFCck \u2014 bevor der Sturm kommt."},stations:{klein:[{name:"Tierspuren folgen",desc:"Pfotenabdr\xFCcke aus Papier liegen auf dem Boden und f\xFChren zur n\xE4chsten Station. Welches Tier war das?",dauer:5,typ:"suchen",hint:"Pfotenabdr\xFCcke vorher aus Tonpapier ausschneiden und auslegen."},{name:"Tierbabys retten",desc:"Kuscheltiere sind im 'Dschungel' (B\xFCsche, unter Kissen) versteckt. Jedes Kind rettet ein Tierbaby und bringt es ins 'Camp' (Decke auf dem Boden).",dauer:8,typ:"suchen",hint:"5\u20138 kleine Kuscheltiere verteilen."},{name:"Dschungel-Parcours",desc:"Unter Seilen durchkriechen (Lianen!), \xFCber Kissen springen (Steine im Fluss!), durch einen Tunnel krabbeln (H\xF6hle!).",dauer:10,typ:"action",hint:"Seile zwischen St\xFChle spannen. Kissen in einer Reihe. Tunnel = Decke \xFCber 2 St\xFChle."},{name:"Tier-Ger\xE4usche raten",desc:"Handy spielt Tierger\xE4usche ab. Wer err\xE4t das Tier, bekommt einen Sticker. 8 Ger\xE4usche = 8 Runden.",dauer:8,typ:"r\xE4tseln",hint:"YouTube: 'Tierger\xE4usche f\xFCr Kinder'. Vorher testen ob es laut genug ist."},{name:"Der geheime Wasserfall",desc:"Am Ende wartet der 'Wasserfall' (blaues Tuch \xFCber einem Stuhl). Dahinter: der Schatz!",dauer:5,typ:"finale",hint:"Blaues Tuch/Laken. Schatzkiste dahinter verstecken."}],mittel:[{name:"Spurenlesen",desc:"Verschiedene 'Tierspuren' (Abdr\xFCcke aus Kartoffeldruck oder Ausdrucke) f\xFChren in verschiedene Richtungen. Nur die richtigen Spuren (L\xF6we!) f\xFChren zur n\xE4chsten Station.",dauer:8,typ:"suchen",hint:"3 verschiedene Spuren auslegen, nur eine ist richtig. Falsche f\xFChren zu Sackgassen."},{name:"Lianenschwingen",desc:"Ein Seil an einem Ast/Ger\xFCst. Kinder schwingen dar\xFCber wie Tarzan und landen auf der 'sicheren Insel' (Matte/Kissen). Dabei einen Ball halten ohne ihn fallen zu lassen.",dauer:8,typ:"action",hint:"Seil sicher befestigen! Weiche Landung sicherstellen."},{name:"Tier-Steckbrief erstellen",desc:"Jedes Kind bekommt ein Foto eines Dschungeltiers und muss einen Steckbrief ausf\xFCllen: Name, Futter, Gr\xF6\xDFe, Ger\xE4usch, Besonderheit.",dauer:10,typ:"r\xE4tseln",hint:"Steckbrief-Vorlage ausdrucken. Tier-Fotos: L\xF6we, Affe, Papagei, Schlange, Elefant."},{name:"Dschungel-Staffel",desc:"Zwei Teams! Hindernisparcours mit Ball auf L\xF6ffel + unter Seilen durch + Slalom um B\xE4ume/St\xFChle. Schnellstes Team gewinnt.",dauer:10,typ:"action",hint:"Parcours vorher aufbauen und testen."},{name:"Dr. Floras Rucksack",desc:"Der Rucksack h\xE4ngt am 'Wasserfall'. Darin: die Schatzkarte + Belohnungen f\xFCr alle Expeditionsteilnehmer.",dauer:5,typ:"finale",hint:"Alter Rucksack + Karte + Mitgebsel-T\xFCten."}],gross:[{name:"GPS-Koordinaten entschl\xFCsseln",desc:"Verschl\xFCsselte Koordinaten: Mathe-Aufgaben l\xF6sen ergibt die Zahlen. Diese zeigen den n\xE4chsten Punkt auf einer selbstgezeichneten Karte.",dauer:8,typ:"r\xE4tseln",hint:"Karte vom Garten/Park vorher zeichnen mit Koordinatensystem."},{name:"Tier-Bestimmung",desc:"An 5 Stellen: Fotos von Tierspuren, Federn, Fell-Muster. Teams bestimmen welches Tier es ist und notieren den Anfangsbuchstaben. Die Buchstaben ergeben ein L\xF6sungswort.",dauer:10,typ:"r\xE4tseln",hint:"Bilder ausdrucken. L\xF6sung vorher festlegen (z.B. FLORA)."},{name:"\xDCberlebens-Challenge",desc:"3 Aufgaben: Wasser filtern (Sand + Kies + Tuch in Flasche), Kompass lesen, essbare vs. giftige Pflanzen unterscheiden (Bildkarten).",dauer:12,typ:"geschick",hint:"Wasser-Filter vorher testen! Pflanzenkarten ausdrucken."},{name:"Br\xFCckenbau",desc:"Mit St\xF6cken, Seilen und Brettern eine Br\xFCcke bauen die ein Kuscheltier tragen kann. Teamwork! Zeitlimit: 10 Minuten.",dauer:12,typ:"teamwork",hint:"Material bereitlegen. Kein 'richtiges' Ergebnis n\xF6tig, Kreativit\xE4t z\xE4hlt."},{name:"Die seltene Entdeckung",desc:"Am Zielort: eine 'seltene Pflanze' (gebastelt) + Forschungsurkunde + Schatz f\xFCr das Team.",dauer:5,typ:"finale",hint:"Urkunde vorher drucken: 'Offizielle Dschungel-Forscher*in'."}]},material:{klein:["Pfotenabdr\xFCcke aus Papier","5\u20138 Kuscheltiere","Seile + Kissen + Decke (Tunnel)","Handy mit Tierger\xE4uschen + Sticker","Blaues Tuch + Schatzkiste"],mittel:["3 Sorten Tierspuren-Ausdrucke","Seil + Matte","Steckbrief-Vorlage + Tier-Fotos","L\xF6ffel + B\xE4lle + Seile + Pylonen","Rucksack + Schatzkarte + Mitgebsel"],gross:["Garten-Karte + Mathe-Aufgaben","Tierspuren-Fotos + Stift + Zettel","Filter-Material (Flasche, Sand, Kies, Tuch) + Pflanzen-Bildkarten","St\xF6cke + Seile + kleine Bretter","Urkunde + Schatz"]},schatz:["Tier-Figuren","Dschungel-Sticker","Lupen","Fernglas-Spielzeug","Schoko-Goldm\xFCnzen"]},{id:"weltraum",name:"Weltraum-Mission",emoji:"\u{1F680}",color:"#283593",intro:{klein:"Astronaut Astro hat seine Sterne verloren! {name}, helft ihm, alle 5 Sterne wiederzufinden und zur\xFCck zur Rakete zu bringen!",mittel:"Mission Control an alle Astronauten: {name}, auf dem Planeten Zyx-7 wurde ein geheimnisvoller Kristall entdeckt. Eure Mission: Findet ihn, bevor die Aliens es tun!",gross:"Eine Notnachricht von der Raumstation Alpha: Der Reaktor f\xE4llt aus. {name}, euer Team muss 5 Ersatzteile auf verschiedenen Planeten einsammeln, bevor die Zeit abl\xE4uft."},stations:{klein:[{name:"Sterne sammeln",desc:"Leucht-Sterne (oder Sterne aus Goldpapier) sind im Raum verteilt. Jedes Kind sammelt so viele wie m\xF6glich in 2 Minuten.",dauer:5,typ:"suchen",hint:"20\u201330 Sterne verteilen. Eimer pro Kind zum Sammeln."},{name:"Rakete starten",desc:"Countdown von 10 runterz\xE4hlen, dann alle zusammen hochspringen! Wer am h\xF6chsten springt, 'fliegt zum Mond'. 3 Runden.",dauer:5,typ:"action",hint:"Laut mitz\xE4hlen. Kinder lieben Countdowns!"},{name:"Alien-Schleim",desc:"Jedes Kind mischt seinen eigenen Glitzer-Schleim aus Bastelkleber + Kontaktlinsen-L\xF6sung + Glitzer. Zum Mitnehmen!",dauer:10,typ:"basteln",hint:"Bastelkleber, Kontaktlinsen-L\xF6sung (mit Bors\xE4ure), Glitzer. Unterlage nicht vergessen!"},{name:"Planetensuche",desc:"Bunte B\xE4lle (= Planeten) sind versteckt. Jeder Planet hat einen Buchstaben drauf. Die Buchstaben ergeben ein Wort: STERN.",dauer:8,typ:"suchen",hint:"5 verschiedenfarbige B\xE4lle mit S-T-E-R-N beschriften."},{name:"Zur\xFCck zur Rakete!",desc:"Die Rakete (gro\xDFer Karton, bemalt) enth\xE4lt den Schatz. Alle steigen ein und 'fliegen nach Hause'!",dauer:5,typ:"finale",hint:"Gro\xDFen Karton als Rakete bemalen. Schatzkiste reinlegen."}],mittel:[{name:"Geheime Botschaft von Mission Control",desc:"Eine Nachricht in UV-Schrift (unsichtbarer Stift). Nur mit UV-Lampe lesbar! Enth\xE4lt die Koordinaten zum ersten Planeten.",dauer:5,typ:"r\xE4tseln",hint:"UV-Stift + UV-Lampe (gibt's g\xFCnstig bei Amazon). Alternativ: Zitronensaft + F\xF6hn."},{name:"Meteoriten-Slalom",desc:"Kinder laufen mit einem Ball auf dem L\xF6ffel durch einen Slalom (= Meteoriten-Feld). Ball fallen lassen = zur\xFCck zum Start!",dauer:8,typ:"action",hint:"Pylonen oder Flaschen als Slalom. Tischtennisball auf Essl\xF6ffel."},{name:"Alien-Kommunikation",desc:"Eine Nachricht in Alien-Schrift (Symbole statt Buchstaben). \xDCbersetzungstabelle liegt bereit. Die \xFCbersetzte Nachricht verr\xE4t den n\xE4chsten Ort.",dauer:10,typ:"r\xE4tseln",hint:"Einfache Symbole erfinden: Stern=A, Mond=B, Sonne=C etc. Tabelle ausdrucken."},{name:"Mondlandung",desc:"Watte-B\xE4lle von einer Markierung aus in einen Eimer werfen (= auf dem Mond landen). Jedes Kind hat 5 Versuche. Mindestens 2 m\xFCssen landen.",dauer:8,typ:"geschick",hint:"3m Entfernung. Watte-B\xE4lle oder zusammengekn\xFClltes Papier."},{name:"Kristall von Zyx-7",desc:"Am letzten Planeten: ein leuchtender Kristall (Lampe in Alufolie) + Schatzkiste f\xFCr alle.",dauer:5,typ:"finale",hint:"LED-Teelicht in Alufolie einwickeln = leuchtender Kristall. Cool im Dunkeln!"}],gross:[{name:"Verschl\xFCsselter Funkspruch",desc:"Bin\xE4rcode! Eine Nachricht in 0 und 1. \xDCbersetzungstabelle (A=00001, B=00010...) liegt bereit. Die Nachricht verr\xE4t den n\xE4chsten Planeten.",dauer:10,typ:"r\xE4tseln",hint:"Kurze Nachricht in Bin\xE4r. Oder einfacher: Morsecode. Tabelle ausdrucken."},{name:"Reparatur unter Zeitdruck",desc:"5 'Bauteile' (Legosteine/Puzzle-Teile) sind in 5 verschiedenen Verstecken. Alle finden und das Modell zusammenbauen \u2014 in unter 10 Minuten.",dauer:10,typ:"teamwork",hint:"Timer laufen lassen! Verstecke nicht zu schwer."},{name:"Schwerelosigkeits-Challenge",desc:"Aufgaben mit verbundenen Augen oder in Zeitlupe (= Schwerelosigkeit): Ball fangen, Turm stapeln, Wasser einschenken.",dauer:10,typ:"geschick",hint:"Augenbinde. Plastikbecher f\xFCr Turm. Platz f\xFCr Wasserkleckse."},{name:"Alien-Quiz",desc:"20 Fragen \xFCber Weltraum, Planeten, Mond. Multiple Choice. Teams buzzern mit K\xFCchengl\xF6ckchen. Jede richtige Antwort = ein Zahlenteil f\xFCr den Code.",dauer:10,typ:"r\xE4tseln",hint:"Fragen vorher googeln. 'Welcher Planet hat Ringe?' etc."},{name:"Reaktor-Neustart",desc:"Die gesammelten Zahlen ergeben den Code f\xFCrs Zahlenschloss der Schatztruhe. Code eingeben = Mission erfolgreich!",dauer:5,typ:"finale",hint:"3-stelliges Zahlenschloss. Pro Station eine Ziffer als Bonus vergeben."}]},material:{klein:["30 Sterne (Goldpapier/Leucht-Sterne)","Freier Platz zum Springen","Bastelkleber + Kontaktlinsen-L\xF6sung + Glitzer","5 bunte B\xE4lle mit Buchstaben","Gro\xDFer Karton (Rakete) + Schatz"],mittel:["UV-Stift + UV-Lampe","L\xF6ffel + Tischtennisb\xE4lle + Pylonen","Alien-Alphabet Ausdruck","Watte-B\xE4lle + Eimer","LED-Teelicht + Alufolie + Schatzkiste"],gross:["Bin\xE4r-/Morsecode-Tabelle + Nachricht","5 Legosteine/Puzzle-Teile + Timer","Augenbinde + Becher + Wasser","20 Quiz-Fragen + K\xFCchengl\xF6ckchen","Zahlenschloss + Schatztruhe"]},schatz:["Leucht-Sterne","Weltraum-Tattoos","Glitzer-Schleim","Astronauten-Sticker","Mondstein (bemalter Kiesel)"]},{id:"detektiv",name:"Detektiv-Fall",emoji:"\u{1F50D}",color:"#455A64",intro:{klein:"Oh nein! Teddys Honig ist verschwunden! {name}, wer hat ihn gestohlen? Folgt den Spuren und findet den Dieb!",mittel:"Im Museum ist ein wertvolles Gem\xE4lde verschwunden. {name}, nur ihr \u2014 die besten Detektive der Stadt \u2014 k\xF6nnt den Fall l\xF6sen!",gross:"Ein anonymer Hinweis: 'In 60 Minuten passiert etwas im Rathaus.' {name}, findet heraus WER, WAS und WARUM \u2014 bevor es zu sp\xE4t ist."},stations:{klein:[{name:"Spuren am Tatort",desc:"Fu\xDFspuren aus Papier auf dem Boden folgen. Sie f\xFChren von der leeren Honigglas-Stelle zur n\xE4chsten Station.",dauer:5,typ:"suchen",hint:"Gro\xDFe Fu\xDFspuren aus Tonpapier ausschneiden."},{name:"Zeugen befragen",desc:"Kuscheltiere sitzen im Kreis. Bei jedem liegt ein Zettel mit einem Hinweis (als Bild). Kinder sammeln alle Hinweise.",dauer:8,typ:"suchen",hint:"4\u20135 Kuscheltiere mit je einem Bild-Hinweis (z.B. 'braunes Fell', 'mag Honig')."},{name:"Fingerabdr\xFCcke nehmen",desc:"Jedes Kind dr\xFCckt seinen Finger auf ein Stempelkissen und dann aufs Papier. Vergleich mit den 'Tatort-Abdr\xFCcken'. Detektivarbeit!",dauer:8,typ:"basteln",hint:"Stempelkissen + wei\xDFes Papier + Lupe."},{name:"Verd\xE4chtige finden",desc:"3 Verd\xE4chtige (Bilder): Fuchs, B\xE4r, Hase. Die gesammelten Hinweise passen auf den B\xE4ren! Er war's!",dauer:5,typ:"r\xE4tseln",hint:"3 Tier-Bilder aufh\xE4ngen. Hinweise zeigen eindeutig auf den B\xE4ren."},{name:"Fall gel\xF6st!",desc:"Der B\xE4r gibt den Honig zur\xFCck (Gummib\xE4rchen f\xFCr alle!) und alle bekommen einen Detektiv-Ausweis.",dauer:5,typ:"finale",hint:"Detektiv-Ausweise vorher basteln/drucken. Gummib\xE4rchen als 'Honig'."}],mittel:[{name:"Tatort untersuchen",desc:"Am 'Tatort' (Tisch mit Deko) liegen 5 Beweist\xFCcke. Kinder notieren alles auf ihrem Detektiv-Notizbuch und machen 'Fotos' (zeichnen).",dauer:8,typ:"r\xE4tseln",hint:"Beweist\xFCcke: Faden, Knopf, Schuh-Abdruck, Haare, Zettel-Fetzen."},{name:"Geheimschrift lesen",desc:"Ein Hinweis in Zitronensaft geschrieben. F\xF6hn dr\xFCber = die Schrift erscheint! Verr\xE4t den n\xE4chsten Ort.",dauer:8,typ:"r\xE4tseln",hint:"Zitronensaft + Wattest\xE4bchen + F\xF6hn. Vorher testen!"},{name:"Zeugen-Verh\xF6r",desc:"3 'Zeugen' (Steckbriefe an der Wand). Jeder sagt etwas anderes. Wer l\xFCgt? Die Kinder vergleichen die Aussagen und finden den Widerspruch.",dauer:10,typ:"r\xE4tseln",hint:"3 kurze Aussagen schreiben, 1 widerspricht den anderen."},{name:"Verfolgungsjagd",desc:"Dem Dieb auf der Spur! Hindernis-Parcours durch den Garten/Raum: unter Seilen durch, \xFCber Kissen, um B\xE4ume. Am Ende: der letzte Hinweis.",dauer:8,typ:"action",hint:"Parcours vorher aufbauen."},{name:"Fall gel\xF6st!",desc:"Alle Hinweise zusammensetzen = der T\xE4ter wird entlarvt! Belohnung: Detektiv-Urkunde + Schatz.",dauer:5,typ:"finale",hint:"Urkunde drucken: 'Meisterdetektiv*in [Name]'."}],gross:[{name:"Tatort-Analyse",desc:"CSI-Style: Beweist\xFCcke untersuchen, Fotos zuordnen, Zeitstrahl erstellen. Alles dokumentieren im Ermittler-Dossier.",dauer:10,typ:"r\xE4tseln",hint:"Dossier-Vorlage drucken. Beweisfotos ausdrucken."},{name:"Verschl\xFCsselte Nachricht",desc:"Pigpen-Chiffre oder Freimaurer-Code. \xDCbersetzungstabelle liegt bereit. Die Nachricht enth\xE4lt einen Namen.",dauer:10,typ:"r\xE4tseln",hint:"Pigpen-Alphabet ausdrucken. Kurze Nachricht (5\u20138 W\xF6rter)."},{name:"Alibi-Check",desc:"5 Verd\xE4chtige mit je einem Alibi. Zeitstrahl + Ortsangaben vergleichen. Nur bei einem stimmt das Alibi NICHT.",dauer:10,typ:"r\xE4tseln",hint:"5 Steckbriefe mit Alibis. Einer hat eine L\xFCcke/Widerspruch."},{name:"Beweis sichern",desc:"UV-Lampe enth\xFCllt versteckte Nachrichten an den W\xE4nden/M\xF6beln. Die Nachrichten ergeben zusammen den Tatort.",dauer:8,typ:"suchen",hint:"UV-Stift auf wei\xDFe Zettel an 5 Stellen. UV-Lampe zum Lesen."},{name:"Verhaftung!",desc:"Der T\xE4ter wird entlarvt! Alle Beweise pr\xE4sentieren. Belohnung: Meisterdetektiv-Zertifikat + Schatz.",dauer:5,typ:"finale",hint:"Zertifikat drucken. Kleines Schloss als Symbol."}]},material:{klein:["Fu\xDFspuren aus Papier","4\u20135 Kuscheltiere + Bild-Hinweise","Stempelkissen + Papier + Lupe","3 Verd\xE4chtigen-Bilder","Detektiv-Ausweise + Gummib\xE4rchen"],mittel:["5 Beweist\xFCcke + Notizbuch","Zitronensaft + Wattest\xE4bchen + F\xF6hn","3 Zeugen-Steckbriefe","Seile + Kissen (Parcours)","Detektiv-Urkunde + Schatz"],gross:["Dossier-Vorlage + Beweis-Fotos","Pigpen-Alphabet + verschl\xFCsselte Nachricht","5 Verd\xE4chtigen-Steckbriefe mit Alibis","UV-Stift + UV-Lampe + 5 versteckte Nachrichten","Zertifikat + Schloss-Symbol + Schatz"]},schatz:["Mini-Lupen","Detektiv-Sticker","Geheim-Stifte (UV)","Notizbl\xF6cke","Fingerabdruck-Set"]},{id:"dino",name:"Dino-Zeitreise",emoji:"\u{1F995}",color:"#795548",intro:{klein:"Die Dinosaurier-Eier sind \xFCberall im Garten verteilt! {name}, findet sie alle, bevor der T-Rex aufwacht!",mittel:"Professor Dinos Zeitmaschine hat euch in die Urzeit geschickt! {name}, sammelt 5 Fossilien um die Maschine wieder zu starten.",gross:"Ihr seid Pal\xE4ontologen auf einer Ausgrabung. {name}, ein komplettes Dino-Skelett liegt unter der Erde \u2014 aber in 5 verschiedenen Schichten. Grabt systematisch!"},stations:{klein:[{name:"Dino-Eier finden",desc:"Bunte Eier (Plastik-Eier oder bemalte Steine) im Garten/Raum versteckt. Jedes Kind sucht 3 Eier.",dauer:8,typ:"suchen",hint:"15\u201320 Eier verteilen. In jedem Ei eine kleine \xDCberraschung."},{name:"Vulkan-Experiment",desc:"Mini-Vulkan: Flasche + Essig + Natron + Sp\xFCli + rote Lebensmittelfarbe. Die Kinder gie\xDFen zusammen \u2014 BOOM! Lava!",dauer:8,typ:"basteln",hint:"Flasche in Sand-/Erd-H\xFCgel stellen. Auffangschale unterdrunter!"},{name:"Dino-Stampfen",desc:"Musik an = stampfen wie ein T-Rex! Musik aus = einfrieren wie ein Fossil. Wer sich bewegt ist raus.",dauer:8,typ:"action",hint:"Dino-Musik oder normale Kindermusik. Laut stampfen ermutigen!"},{name:"Fu\xDFspuren zuordnen",desc:"4 verschiedene Dino-Fu\xDFspuren auf dem Boden. Bilder von 4 Dinos daneben. Welcher Fu\xDF passt zu welchem Dino?",dauer:5,typ:"r\xE4tseln",hint:"Gro\xDFe Fu\xDFspuren aus Pappe. Einfache Zuordnung."},{name:"T-Rex aufwecken!",desc:"Der T-Rex (Kuscheltier/Figur) bewacht die Schatzkiste. Alle zusammen br\xFCllen so laut sie k\xF6nnen \u2014 dann 'erschreckt' er sich und gibt den Schatz frei!",dauer:5,typ:"finale",hint:"Dramatisch spielen! Kinder lieben gemeinsames Br\xFCllen."}],mittel:[{name:"Fossilien-Ausgrabung",desc:"In einer Wanne mit Sand: eingegrabene 'Fossilien' (Muscheln, Steine, Knochen aus Salzteig). Mit Pinsel freilegen wie echte Forscher.",dauer:10,typ:"basteln",hint:"Salzteig-Knochen vorher backen (1 Tag). Pinsel + Wanne + Sand."},{name:"Dino-Quiz: 1, 2 oder 3",desc:"Fragen \xFCber Dinos mit 3 Antworten. Kinder rennen zur Zahl die sie f\xFCr richtig halten. 'Ob ihr wirklich richtig steht...'",dauer:10,typ:"r\xE4tseln",hint:"10 Fragen vorbereiten. Zahlen auf A4 ausdrucken und am Boden verteilen."},{name:"Vulkan-Wettbewerb",desc:"2 Teams bauen je einen Vulkan (Sand + Flasche). Dann: wessen Lava sprudelt h\xF6her/schneller?",dauer:10,typ:"teamwork",hint:"2 Sets: Flaschen, Sand, Essig, Natron, Sp\xFCli, Lebensmittelfarbe."},{name:"Zeitmaschinen-Code",desc:"An jeder vorherigen Station gab es eine Zahl. Alle Zahlen zusammen = Code um die Zeitmaschine zu starten.",dauer:5,typ:"r\xE4tseln",hint:"An jeder Station eine gut sichtbare Zahl anbringen."},{name:"Zur\xFCck in die Gegenwart!",desc:"Code eingeben, 'Zeitmaschine starten' (Countdown), Schatzkiste \xF6ffnen. Alle sind wieder da!",dauer:5,typ:"finale",hint:"Countdown gemeinsam runterz\xE4hlen. Schatz = Dino-Spielzeug + S\xFC\xDFes."}],gross:[{name:"Systematische Ausgrabung",desc:"Planquadrate im Garten/Sandkasten. Jedes Team gr\xE4bt ein Quadrat und dokumentiert jeden Fund mit Koordinaten auf einer Karte.",dauer:12,typ:"teamwork",hint:"Schnur + Pfl\xF6cke f\xFCr Planquadrate. Dokumentations-Vorlage drucken."},{name:"Fossil-Bestimmung",desc:"5 'Fossilien' bestimmen: Name, Alter, Pflanzenfresser/Fleischfresser. Lexikon liegt bereit. Buchstaben der richtigen Antworten = L\xF6sungswort.",dauer:10,typ:"r\xE4tseln",hint:"Dino-Lexikon ausleihen oder Infoblatt drucken."},{name:"Evolution-Timeline",desc:"10 Dino-Karten in die richtige zeitliche Reihenfolge bringen. Trias \u2192 Jura \u2192 Kreide. Bonus: Welcher lebte am l\xE4ngsten?",dauer:8,typ:"r\xE4tseln",hint:"Karten mit Dino-Namen + Zeitraum. L\xF6sung auf der R\xFCckseite."},{name:"Dino-Escape",desc:"Der Meteor kommt! 5 R\xE4tsel in 15 Minuten l\xF6sen um die 'Rettungskapsel' zu \xF6ffnen: Mathe, Logik, Dino-Wissen, Puzzle, Geheimschrift.",dauer:15,typ:"r\xE4tseln",hint:"Timer laufen lassen! 5 Umschl\xE4ge mit je einem R\xE4tsel."},{name:"Museum er\xF6ffnen",desc:"Alle Funde auslegen, beschriften und ein 'Mini-Museum' er\xF6ffnen. Feierliche Er\xF6ffnung + Schatz.",dauer:5,typ:"finale",hint:"Tisch als Vitrine. Kinder stellen ihre Funde aus."}]},material:{klein:["15\u201320 Plastik-Eier oder bemalte Steine","Flasche + Essig + Natron + Sp\xFCli + Lebensmittelfarbe","Musikbox","4 Dino-Fu\xDFspuren + 4 Dino-Bilder","Dino-Figur + Schatzkiste"],mittel:["Wanne + Sand + Salzteig-Fossilien + Pinsel","10 Quiz-Fragen + Zahlen 1-2-3","2\xD7 Flasche + Sand + Vulkan-Material","Zahlen an Stationen","Schatz + Countdown"],gross:["Schnur + Pfl\xF6cke + Dokumentations-Vorlage","5 Fossilien-Bilder + Dino-Lexikon","10 Dino-Zeitkarten","5 R\xE4tsel-Umschl\xE4ge + Timer","Tisch + Beschriftungskarten + Schatz"]},schatz:["Mini-Dinos","Fossilien-Sticker","Dino-Stempel","Ausgrabungs-Sets","Dino-Tattoos"]},{id:"feen",name:"Feenzauber im Wald",emoji:"\u{1F9DA}",color:"#AB47BC",intro:{klein:"Die kleine Fee Lila hat ihren Zauberstab verloren! {name}, ohne ihn kann sie nicht mehr zaubern. Helft ihr, ihn zu finden!",mittel:"Das Feenreich ist in Gefahr! Der b\xF6se Troll hat alle Regenbogenfarben gestohlen. {name}, sammelt die Farben an 5 Stationen zur\xFCck!",gross:"{name}, ihr wurdet in die Feenakademie eingeladen. Um aufgenommen zu werden, m\xFCsst ihr 5 magische Pr\xFCfungen bestehen."},stations:{klein:[{name:"Feenstaub sammeln",desc:"Glitzersteine (bunte Glassteine) im Gras/Raum versteckt. Jedes Kind sammelt Feenstaub in einen kleinen Beutel.",dauer:8,typ:"suchen",hint:"Bunte Deko-Steine aus dem Bastelladen. 5\u20138 pro Kind."},{name:"Zauberstab basteln",desc:"Holzstab + Glitzer + B\xE4nder + Sternform aus Pappe = eigener Zauberstab! Jedes Kind gestaltet seinen.",dauer:10,typ:"basteln",hint:"Holzspie\xDFe (Spitze abschneiden!), Glitzerkleber, bunte B\xE4nder, Sterne aus Goldpappe."},{name:"Blumen-Tanz",desc:"Tanzen wie Blumen im Wind: bei leiser Musik sanft wiegen, bei lauter Musik wild tanzen, bei Stopp als Blume 'einfrieren'.",dauer:8,typ:"action",hint:"Verschiedene Tempi. Kinder sanft mitmachen lassen."},{name:"Regenbogen-Puzzle",desc:"7 bunte Streifen (Regenbogenfarben) sind versteckt. In der richtigen Reihenfolge zusammenlegen = Hinweis zum Zauberstab.",dauer:8,typ:"suchen",hint:"Streifen aus Tonpapier. Auf der R\xFCckseite: ein Pfeil zum Versteck."},{name:"Zauberstab gefunden!",desc:"Der Zauberstab (glitzernder Stock) liegt an der letzten Station. Fee Lila (Puppe/Bild) bedankt sich mit einem Schatz!",dauer:5,typ:"finale",hint:"Glitzer-Stock vorbereiten. Puppe als Fee Lila verkleiden."}],mittel:[{name:"Magische Zutat: Feenstaub",desc:"Bunte Perlen in Farbe ROT im Geb\xFCsch/Raum finden. Nur die roten z\xE4hlen! Wer die meisten findet, f\xFChrt zum n\xE4chsten Ort.",dauer:8,typ:"suchen",hint:"Verschiedenfarbige Perlen verteilen, aber nur rote sammeln."},{name:"Magische Zutat: Troll-Schleim besiegen",desc:"Schleim (aus Bastelkleber) herstellen und darin eine versteckte Perle in Farbe ORANGE finden. Matschig aber magisch!",dauer:10,typ:"basteln",hint:"Schleim-Set vorbereiten. Orange Perle vor dem Mischen reinlegen."},{name:"Magische Zutat: Regenbogen-Wasser",desc:"3 Gl\xE4ser mit gef\xE4rbtem Wasser (rot, gelb, blau). Mischen um GR\xDCN, ORANGE und LILA herzustellen. Farbenlehre!",dauer:8,typ:"r\xE4tseln",hint:"Lebensmittelfarbe + Wasser. Kinder lernen spielerisch Farbmischung."},{name:"Magische Zutat: Sternen-R\xE4tsel",desc:"5 Sterne mit je einem Buchstaben. In der richtigen Reihenfolge = Zauberwort. Zauberwort laut rufen = n\xE4chster Hinweis.",dauer:5,typ:"r\xE4tseln",hint:"Sterne aus Goldpappe mit Buchstaben. L\xF6sungswort: MAGIE."},{name:"Regenbogen wiederhergestellt!",desc:"Alle Farben gesammelt! Der Regenbogen erscheint (buntes Tuch/Band) und darunter liegt der Feenschatz.",dauer:5,typ:"finale",hint:"Buntes Tuch \xFCber einen Bogen spannen. Schatzkiste darunter."}],gross:[{name:"Feen-Aufnahmepr\xFCfung 1: Wissen",desc:"10 Fragen \xFCber Natur, Pflanzen, Tiere, Jahreszeiten. Jede richtige Antwort = ein Buchstabe des Zauberspruchs.",dauer:10,typ:"r\xE4tseln",hint:"Fragen \xFCber echte Natur: Welcher Baum verliert keine Bl\xE4tter? etc."},{name:"Feen-Aufnahmepr\xFCfung 2: Geschick",desc:"Hindernisparcours durch den 'Zauberwald': unter B\xE4ndern durch, \xFCber Steine balancieren, Ringe auf St\xE4be werfen.",dauer:10,typ:"action",hint:"B\xE4nder + Steine + Ringe + St\xE4be. Parcours im Garten."},{name:"Feen-Aufnahmepr\xFCfung 3: Kreativit\xE4t",desc:"In 10 Minuten: ein Feenhaus aus Naturmaterialien bauen. St\xF6cke, Bl\xE4tter, Moos, Steine. Wer baut das Sch\xF6nste?",dauer:12,typ:"basteln",hint:"Naturmaterialien vorher sammeln oder sammeln lassen."},{name:"Feen-Aufnahmepr\xFCfung 4: Zaubertrank",desc:"Nach 'Rezept' (Anleitung) einen Zaubertrank mischen: Limonade + Brausepulver + Lebensmittelfarbe = sprudelnder Trank! Trinken erlaubt.",dauer:8,typ:"basteln",hint:"Sprite/Wasser + Brausepulver + Lebensmittelfarbe. Becher pro Kind."},{name:"Feierliche Aufnahme",desc:"Alle Pr\xFCfungen bestanden! Feierliche Aufnahme in die Feenakademie: Urkunde + Feenstab + Schatz.",dauer:5,typ:"finale",hint:"Urkunde drucken. Feierlich vorlesen!"}]},material:{klein:["Bunte Glassteine + kleine Beutel","Holzst\xE4be + Glitzer + B\xE4nder + Sterne","Musikbox","7 bunte Papierstreifen","Glitzer-Stock + Fee-Puppe + Schatz"],mittel:["Bunte Perlen (v.a. rote)","Bastelkleber + Kontaktlinsen-L\xF6sung + orange Perle","Lebensmittelfarbe + 3 Gl\xE4ser + Wasser","5 Goldsterne mit Buchstaben","Buntes Tuch + Schatzkiste"],gross:["10 Natur-Quizfragen","B\xE4nder + Steine + Ringe + St\xE4be","Naturmaterialien (St\xF6cke, Bl\xE4tter, Moos)","Limonade + Brausepulver + Lebensmittelfarbe + Becher","Urkunde + Feenstab + Schatz"]},schatz:["Glitzer-Steine","Einhorn-Sticker","Perlen-Armb\xE4nder","Feenstab","Glitzer-Tattoos"]}];

var SZ_SHOP_ITEMS = {piraten:[{name:"Schatztruhe (Holz, klein)",cat:"pflicht",url:"https://www.amazon.de/s?k=schatztruhe+holz+kinder&tag=machsleicht-21"},{name:"Goldm\xFCnzen 100 Stk.",cat:"pflicht",url:"https://www.amazon.de/s?k=goldm%C3%BCnzen+piraten+kinder&tag=machsleicht-21"},{name:"Zahlenschloss 3-stellig",cat:"sinnvoll",url:"https://www.amazon.de/s?k=zahlenschloss+3+stellig&tag=machsleicht-21"},{name:"Piraten-Augenklappen 12 Stk.",cat:"sinnvoll",url:"https://www.amazon.de/s?k=piraten+augenklappen+kinder&tag=machsleicht-21"},{name:"Fernrohr Kinder",cat:"sinnvoll",url:"https://www.amazon.de/s?k=fernrohr+kinder+piraten&tag=machsleicht-21"},{name:"Klopapierrollen / Zeitungspapier",cat:"pflicht",url:null}],dschungel:[{name:"Tierfiguren-Set 12 Stk.",cat:"pflicht",url:"https://www.amazon.de/s?k=tierfiguren+set+kinder+dschungel&tag=machsleicht-21"},{name:"Lupe Kinder",cat:"sinnvoll",url:"https://www.amazon.de/s?k=lupe+kinder&tag=machsleicht-21"},{name:"Fernglas Kinder",cat:"sinnvoll",url:"https://www.amazon.de/s?k=fernglas+kinder&tag=machsleicht-21"},{name:"Seil 5m",cat:"pflicht",url:"https://www.amazon.de/s?k=seil+kinder+parcours&tag=machsleicht-21"},{name:"Matte / Kissen",cat:"pflicht",url:null}],weltraum:[{name:"Glow-in-the-Dark Sterne",cat:"sinnvoll",url:"https://www.amazon.de/s?k=leuchtsterne+kinder+zimmer&tag=machsleicht-21"},{name:"Alien-Schleim Set",cat:"pflicht",url:"https://www.amazon.de/s?k=schleim+set+kinder+glitzer&tag=machsleicht-21"},{name:"Zahlenschloss 3-stellig",cat:"sinnvoll",url:"https://www.amazon.de/s?k=zahlenschloss+3+stellig&tag=machsleicht-21"},{name:"Styroporb\xE4lle (Planeten)",cat:"pflicht",url:"https://www.amazon.de/s?k=styroporkugeln+set+basteln&tag=machsleicht-21"},{name:"Taschenlampe / UV-Lampe",cat:"sinnvoll",url:"https://www.amazon.de/s?k=uv+taschenlampe+kinder&tag=machsleicht-21"}],detektiv:[{name:"Fingerabdruck-Set Kinder",cat:"pflicht",url:"https://www.amazon.de/s?k=fingerabdruck+set+kinder+detektiv&tag=machsleicht-21"},{name:"Lupe Kinder",cat:"pflicht",url:"https://www.amazon.de/s?k=lupe+kinder+detektiv&tag=machsleicht-21"},{name:"Geheimstift UV",cat:"sinnvoll",url:"https://www.amazon.de/s?k=geheimstift+uv+kinder&tag=machsleicht-21"},{name:"Notizbuch klein",cat:"pflicht",url:"https://www.amazon.de/s?k=notizbuch+klein+kinder&tag=machsleicht-21"},{name:"Zitronensaft / Wattest\xE4bchen",cat:"pflicht",url:null}],dino:[{name:"Dino-Ausgrabungsset",cat:"pflicht",url:"https://www.amazon.de/s?k=dino+ausgrabungsset+kinder&tag=machsleicht-21"},{name:"Vulkan-Experiment Set",cat:"sinnvoll",url:"https://www.amazon.de/s?k=vulkan+experiment+kinder&tag=machsleicht-21"},{name:"Dino-Figuren Set",cat:"pflicht",url:"https://www.amazon.de/s?k=dinosaurier+figuren+set+kinder&tag=machsleicht-21"},{name:"Pinsel Set (Ausgrabung)",cat:"pflicht",url:"https://www.amazon.de/s?k=pinsel+set+kinder+basteln&tag=machsleicht-21"},{name:"Sand / Salzteig",cat:"pflicht",url:null}],feen:[{name:"Glitzer-Set",cat:"pflicht",url:"https://www.amazon.de/s?k=glitzer+set+kinder+basteln&tag=machsleicht-21"},{name:"Zauberstab-Bastelset",cat:"pflicht",url:"https://www.amazon.de/s?k=zauberstab+basteln+kinder&tag=machsleicht-21"},{name:"Perlen Armb\xE4nder Set",cat:"sinnvoll",url:"https://www.amazon.de/s?k=perlen+armband+set+kinder&tag=machsleicht-21"},{name:"Lebensmittelfarbe",cat:"sinnvoll",url:"https://www.amazon.de/s?k=lebensmittelfarbe+set&tag=machsleicht-21"},{name:"Naturmaterialien (St\xF6cke, Bl\xE4tter)",cat:"pflicht",url:null}]};

var SZ_SCHATZ_LINKS = {Goldm\u00FCnzen:"https://www.amazon.de/s?k=goldm%C3%BCnzen+piraten+kinder&tag=machsleicht-21","Mini-Kompass":"https://www.amazon.de/s?k=mini+kompass+kinder&tag=machsleicht-21","Dino-Figuren":"https://www.amazon.de/s?k=dinosaurier+figuren+mini&tag=machsleicht-21",Edelsteine:"https://www.amazon.de/s?k=edelsteine+kinder+schatzsuche&tag=machsleicht-21",Seifenblasen:"https://www.amazon.de/s?k=seifenblasen+kinder+set&tag=machsleicht-21",Sticker:"https://www.amazon.de/s?k=sticker+kinder+set&tag=machsleicht-21",Tattoos:"https://www.amazon.de/s?k=kinder+tattoos+set&tag=machsleicht-21",Schl\u00FCsselanh\u00E4nger:"https://www.amazon.de/s?k=schl%C3%BCsselanh%C3%A4nger+kinder&tag=machsleicht-21",Leuchtsterne:"https://www.amazon.de/s?k=leuchtsterne+kinder&tag=machsleicht-21",Lupe:"https://www.amazon.de/s?k=lupe+kinder&tag=machsleicht-21",Fernrohr:"https://www.amazon.de/s?k=fernrohr+kinder&tag=machsleicht-21",Zauberstab:"https://www.amazon.de/s?k=zauberstab+kinder&tag=machsleicht-21",Glitzer:"https://www.amazon.de/s?k=glitzer+set+kinder&tag=machsleicht-21",Fernglas:"https://www.amazon.de/s?k=fernglas+kinder&tag=machsleicht-21"};

var SZ_TYP_EMOJI = {suchen:"\u{1F50D}",r\u00E4tseln:"\u{1F9E9}",action:"\u{1F3C3}",basteln:"\u2702\uFE0F",geschick:"\u{1F3AF}",teamwork:"\u{1F91D}",finale:"\u{1F381}"};

var SZ_TYP_LABEL = {suchen:"Suchen",r\u00E4tseln:"R\xE4tseln",action:"Action",basteln:"Basteln",geschick:"Geschick",teamwork:"Teamwork",finale:"Finale"};

var SZ_LABELS = { piraten: "Piraten", dschungel: "Dschungel", weltraum: "Weltraum", detektiv: "Detektiv", dino: "Dino", feen: "Feen" };

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
          url: "https://www.amazon.de/s?k=safari+kindergeburtstag+teller+becher&tag=machsleicht21-21",
        },
        {
          name: "Dschungel-Luftballons 15 Stk.",
          price: 7.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F388}",
          url: "https://www.amazon.de/s?k=dschungel+luftballons+kindergeburtstag&tag=machsleicht21-21",
        },
        {
          name: "Tiermasken zum Basteln 12 Stk.",
          price: 8.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F3AD}",
          url: "https://www.amazon.de/s?k=tiermasken+basteln+kinder&tag=machsleicht21-21",
        },
      ],
      dekoMin: [
        {
          name: "Gr\xFCne Tischdecke",
          price: 3.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F33F}",
          url: "https://www.amazon.de/s?k=gr%C3%BCne+tischdecke+party&tag=machsleicht21-21",
        },
        {
          name: "Gr\xFCne Luftballons 10 Stk.",
          price: 2.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F388}",
          url: "https://www.amazon.de/s?k=gr%C3%BCne+luftballons&tag=machsleicht21-21",
        },
      ],
      mitgebsel: [
        {
          name: "Mini-Tierfiguren 12 Stk.",
          price: 8.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F992}",
          url: "https://www.amazon.de/s?k=mini+tierfiguren+set+kinder&tag=machsleicht21-21",
        },
        {
          name: "Tier-Tattoos 50 Stk.",
          price: 3.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F43E}",
          url: "https://www.amazon.de/s?k=tier+tattoos+kinder&tag=machsleicht21-21",
        },
        {
          name: "Papiert\xFCten Safari 12 Stk.",
          price: 5.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F6CD}\uFE0F",
          url: "https://www.amazon.de/s?k=papiert%C3%BCten+safari+kinder&tag=machsleicht21-21",
        },
      ],
      kuchen: {
        klein: {
          name: "Tierkuchen",
          desc: "Runder Kuchen mit Smarties-Tiergesicht",
          rezept:
            "R\xFChrteig backen (200g Butter, 200g Zucker, 4 Eier, 300g Mehl, 1 Pck. Backpulver \u2014 35 Min. bei 175\xB0C, Springform). Abk\xFChlen. Helle Glasur drauf. Mit Smarties ein Tiergesicht legen (L\xF6we: orange Smarties als M\xE4hne im Kreis, braune als Augen und Nase).",
          url: "https://www.amazon.de/s?k=tierform+backform+kinder&tag=machsleicht21-21",
        },
        mittel: {
          name: "Zebra-Kuchen",
          desc: "Marmorkuchen mit Wow-Effekt beim Anschneiden",
          rezept:
            "Hellen R\xFChrteig anr\xFChren (250g Butter, 250g Zucker, 4 Eier, 350g Mehl, 200ml Milch). H\xE4lfte in zweite Sch\xFCssel, 3 EL Kakao unterr\xFChren. Abwechselnd je 2 EL hellen und dunklen Teig in die Mitte der Springform geben (nicht r\xFChren!). 45 Min. bei 170\xB0C. Ergibt perfekte Zebra-Streifen.",
          url: "https://www.amazon.de/s?k=springform+backform+kinder&tag=machsleicht21-21",
        },
        gross: {
          name: "Dschungel-Torte",
          desc: "Schoko-Kuchen mit Gummitier-Deko",
          rezept:
            "Schokoladen-R\xFChrteig backen (s. Grundrezept + 50g Kakao). 2 B\xF6den \xFCbereinander mit Schoko-Buttercreme. Au\xDFen mit Schoko-Glasur bestreichen. Gr\xFCne Gummib\xE4rchen und Mini-Tierfiguren als Deko platzieren. Brezelstangen als B\xE4ume reinstecken.",
          url: "https://www.amazon.de/s?k=safari+tortendeko+kinder+geburtstag&tag=machsleicht21-21",
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
          url: "https://www.amazon.de/s?k=piraten+kindergeburtstag+teller+becher&tag=machsleicht21-21",
        },
        {
          name: "Totenkopf-Luftballons 15 Stk.",
          price: 7.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u2620\uFE0F",
          url: "https://www.amazon.de/s?k=piraten+luftballons+kindergeburtstag&tag=machsleicht21-21",
        },
        {
          name: "Piraten-Girlande 2m",
          price: 5.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F3F4}",
          url: "https://www.amazon.de/s?k=piraten+girlande+geburtstag&tag=machsleicht21-21",
        },
      ],
      dekoMin: [
        {
          name: "Rote+schwarze Luftballons 10 Stk.",
          price: 3.49,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F388}",
          url: "https://www.amazon.de/s?k=rote+schwarze+luftballons&tag=machsleicht21-21",
        },
      ],
      mitgebsel: [
        {
          name: "Goldm\xFCnzen 100 Stk.",
          price: 6.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1FA99}",
          url: "https://www.amazon.de/s?k=goldm%C3%BCnzen+piraten+kinder&tag=machsleicht21-21",
        },
        {
          name: "Piraten-Sticker 100 Stk.",
          price: 4.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F3F7}\uFE0F",
          url: "https://www.amazon.de/s?k=piraten+sticker+kinder&tag=machsleicht21-21",
        },
        {
          name: "Papiert\xFCten Piraten 12 Stk.",
          price: 5.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F6CD}\uFE0F",
          url: "https://www.amazon.de/s?k=papiert%C3%BCten+piraten+kinder&tag=machsleicht21-21",
        },
      ],
      kuchen: {
        klein: {
          name: "Piratenflaggen-Muffins",
          desc: "Schoko-Muffins mit Mini-Piratenflaggen",
          rezept:
            "Schoko-Muffins backen (Fertigmischung oder: 200g Mehl, 150g Zucker, 50g Kakao, 100ml \xD6l, 200ml Milch, 2 Eier, 1 TL Backpulver \u2014 20 Min. bei 180\xB0C). Schoko-Glasur drauf. Piratenflaggen-Picker reinstecken (kaufen oder aus Zahnstochern + Papier basteln).",
          url: "https://www.amazon.de/s?k=piraten+muffin+deko+picker+kindergeburtstag&tag=machsleicht21-21",
        },
        mittel: {
          name: "Piratenschiff-Kuchen",
          desc: "Kastenkuchen als Schiff mit Papier-Segeln",
          rezept:
            "Kastenkuchen backen (250g Butter, 250g Zucker, 4 Eier, 350g Mehl, 1 Pck. Backpulver \u2014 Kastenform, 50 Min. bei 170\xB0C). Schoko-Glasur als Schiffsrumpf. 2\u20133 Schaschlikspie\xDFe als Masten reinstecken. Segel aus wei\xDFem Papier drankleben. Totenkopf-F\xE4hnchen oben drauf. Goldm\xFCnzen drumherum.",
          url: "https://www.amazon.de/s?k=piraten+tortendeko+kinder+geburtstag&tag=machsleicht21-21",
        },
        gross: {
          name: "Schatzkisten-Kuchen",
          desc: "Eckiger Kuchen als Schatzkiste mit Goldm\xFCnzen",
          rezept:
            "Kastenform-Kuchen backen und quer halbieren (= Boden + Deckel). Unteren Teil aush\xF6hlen, mit Schoko-Goldm\xFCnzen f\xFCllen. Oberen Teil schr\xE4g als offenen Deckel anlehnen. Alles mit brauner Schoko-Glasur bestreichen. Goldm\xFCnzen rausquellen lassen.",
          url: "https://www.amazon.de/s?k=goldm%C3%BCnzen+schokolade+piraten+kinder&tag=machsleicht21-21",
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
          url: "https://www.amazon.de/s?k=weltraum+kindergeburtstag+teller+becher&tag=machsleicht21-21",
        },
        {
          name: "Planeten-Luftballons 12 Stk.",
          price: 8.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1FA90}",
          url: "https://www.amazon.de/s?k=planeten+luftballons+kindergeburtstag&tag=machsleicht21-21",
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
          url: "https://www.amazon.de/s?k=dunkelblaue+silberne+luftballons&tag=machsleicht21-21",
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
          url: "https://www.amazon.de/s?k=leucht+sterne+kinder&tag=machsleicht21-21",
        },
        {
          name: "Weltraum-Tattoos 40 Stk.",
          price: 3.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1FA90}",
          url: "https://www.amazon.de/s?k=weltraum+tattoos+kinder&tag=machsleicht21-21",
        },
        {
          name: "T\xFCten Weltraum 12 Stk.",
          price: 6.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F6CD}\uFE0F",
          url: "https://www.amazon.de/s?k=weltraum+t%C3%BCten+kindergeburtstag&tag=machsleicht21-21",
        },
      ],
      kuchen: {
        klein: {
          name: "Raketen-Muffins",
          desc: "Muffins mit Eiswaffel-Spitze als Rakete",
          rezept:
            "Muffins backen (Grundrezept oder Fertigmischung). Blaue oder silberne Glasur drauf (Puderzucker + Lebensmittelfarbe). Spitze Eiswaffel (z.B. H\xF6rnchen) umgedreht obendrauf = Raketenspitze. Bunte Streusel als Sterne. Optional: Smarties am Fu\xDF als Flammen.",
          url: "https://www.amazon.de/s?k=muffin+set+weltraum+kindergeburtstag&tag=machsleicht21-21",
        },
        mittel: {
          name: "Raketen-Kuchen",
          desc: "Kastenform-Kuchen als Rakete mit Smarties-Flammen",
          rezept:
            "Kastenkuchen backen (Grundrezept). Oben spitz zuschneiden (Reste naschen!). Mit silberner/wei\xDFer Glasur \xFCberziehen. Rote, orange und gelbe Smarties am unteren Ende als Flammen. Runde Fenster aus blauen Smarties. Tipp: Alufolie um das untere Ende als D\xFCsen.",
          url: "https://www.amazon.de/s?k=weltraum+tortendeko+kinder+geburtstag&tag=machsleicht21-21",
        },
        gross: {
          name: "Galaxie-Kuchen",
          desc: "Dunkler Kuchen mit bunten Galaxie-Wirbeln",
          rezept:
            "Schokoladen-Kuchen backen (Springform). Dunkle Schoko-Glasur drauf. Solange die Glasur noch feucht ist: blaue, lila und wei\xDFe Lebensmittelfarbe in Tropfen aufbringen und mit Zahnstocher zu Spiralen ziehen. Essbare Silber-Sternchen dr\xFCberstreuen. Sieht aus wie eine echte Galaxie!",
          url: "https://www.amazon.de/s?k=lebensmittelfarbe+set+galaxie+kuchen&tag=machsleicht21-21",
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
          url: "https://www.amazon.de/s?k=dino+kindergeburtstag+teller+becher&tag=machsleicht21-21",
        },
        {
          name: "Dino-Luftballons 12 Stk.",
          price: 7.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F388}",
          url: "https://www.amazon.de/s?k=dino+luftballons+kindergeburtstag&tag=machsleicht21-21",
        },
        {
          name: "Dino-Girlande",
          price: 5.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F996}",
          url: "https://www.amazon.de/s?k=dino+girlande+kindergeburtstag&tag=machsleicht21-21",
        },
      ],
      dekoMin: [
        {
          name: "Gr\xFCne Luftballons 10 Stk.",
          price: 2.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F388}",
          url: "https://www.amazon.de/s?k=gr%C3%BCne+luftballons&tag=machsleicht21-21",
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
          url: "https://www.amazon.de/s?k=mini+dino+figuren+kinder&tag=machsleicht21-21",
        },
        {
          name: "Dino-Stempel Set",
          price: 5.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F43E}",
          url: "https://www.amazon.de/s?k=dino+stempel+set+kinder&tag=machsleicht21-21",
        },
        {
          name: "Papiert\xFCten Dino 12 Stk.",
          price: 5.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F6CD}\uFE0F",
          url: "https://www.amazon.de/s?k=papiert%C3%BCten+dino+kinder&tag=machsleicht21-21",
        },
      ],
      kuchen: {
        klein: {
          name: "Dino-Muffins",
          desc: "Schoko-Muffins mit Mini-Dino obendrauf",
          rezept:
            "Schoko-Muffins backen (Grundrezept). Gr\xFCne Glasur drauf (Puderzucker + gr\xFCne Lebensmittelfarbe). Kleine Plastik-Dinos obendrauf setzen (vorher kaufen). Alternative: Dino-Kekse ausstechen und auf die Muffins stecken.",
          url: "https://www.amazon.de/s?k=mini+dino+figuren+tortendeko+kinder&tag=machsleicht21-21",
        },
        mittel: {
          name: "Vulkan-Kuchen",
          desc: "Gugelhupf mit Smarties-Lava und Dino-Figur",
          rezept:
            "Marmor-Gugelhupf backen (Grundrezept). Abk\xFChlen lassen. Mit Schoko-Glasur den oberen Rand bestreichen. Rote, orange und gelbe Smarties als Lava von oben herunterlaufen lassen. Gr\xFCne Gummib\xE4rchen drumherum als B\xE4ume. Dino-Figur obendrauf.",
          url: "https://www.amazon.de/s?k=dino+tortendeko+kindergeburtstag&tag=machsleicht21-21",
        },
        gross: {
          name: "Fossilien-Kuchen",
          desc: "Schoko-Kuchen mit wei\xDFen Schoko-Knochen",
          rezept:
            "Schokoladen-Kuchen backen (Springform). Dunkle Schoko-Glasur drauf. Knochen aus wei\xDFer Schokolade: wei\xDFe Schoko schmelzen, in Knochenform auf Backpapier spritzen (oder Knochenform-Silikonform nutzen). Aush\xE4rten lassen. Auf den Kuchen legen. Puderzucker als Sand dar\xFCber st\xE4uben.",
          url: "https://www.amazon.de/s?k=knochen+silikonform+schokolade+backen&tag=machsleicht21-21",
        },
      },
    },
    {
      id: "einhorn",
      name: "Einhorn-Zauber",
      emoji: "\u{1F984}",
      color: "#AB47BC",
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
          url: "https://www.amazon.de/s?k=einhorn+kindergeburtstag+teller+becher&tag=machsleicht21-21",
        },
        {
          name: "Regenbogen-Luftballons 15 Stk.",
          price: 6.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F308}",
          url: "https://www.amazon.de/s?k=regenbogen+luftballons+kindergeburtstag&tag=machsleicht21-21",
        },
        {
          name: "Glitzer-Tischdecke",
          price: 4.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u2728",
          url: "https://www.amazon.de/s?k=glitzer+tischdecke+kindergeburtstag&tag=machsleicht21-21",
        },
      ],
      dekoMin: [
        {
          name: "Rosa+lila Luftballons 10 Stk.",
          price: 2.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F388}",
          url: "https://www.amazon.de/s?k=rosa+lila+luftballons&tag=machsleicht21-21",
        },
      ],
      mitgebsel: [
        {
          name: "Einhorn-Sticker 100 Stk.",
          price: 4.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F3F7}\uFE0F",
          url: "https://www.amazon.de/s?k=einhorn+sticker+kinder&tag=machsleicht21-21",
        },
        {
          name: "Glitzer-Haargummis 24 Stk.",
          price: 6.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F4AB}",
          url: "https://www.amazon.de/s?k=glitzer+haargummis+kinder&tag=machsleicht21-21",
        },
        {
          name: "Papiert\xFCten Einhorn 12 Stk.",
          price: 5.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F6CD}\uFE0F",
          url: "https://www.amazon.de/s?k=papiert%C3%BCten+einhorn+kinder&tag=machsleicht21-21",
        },
      ],
      kuchen: {
        klein: {
          name: "Regenbogen-Muffins",
          desc: "Muffins mit bunten Streuseln und Einhorn-Topper",
          rezept:
            "Vanilla-Muffins backen (Grundrezept). Wei\xDFe Glasur drauf. Mit Regenbogen-Streuseln bestreuen. Einhorn-Papier-Topper reinstecken (kaufen oder aus Pappe basteln). Super einfach, riesen Effekt!",
          url: "https://www.amazon.de/s?k=einhorn+muffin+topper+regenbogen+kinder&tag=machsleicht21-21",
        },
        mittel: {
          name: "Regenbogen-Kuchen",
          desc: "4 bunte Farbschichten \u2014 Wow-Effekt beim Anschneiden!",
          rezept:
            "Hellen R\xFChrteig anr\xFChren (4-fache Menge Grundrezept). In 4 Teile aufteilen: rot, gelb, gr\xFCn, blau einf\xE4rben. Nacheinander in Springform schichten: blau unten, gr\xFCn, gelb, rot oben. 40 Min. bei 170\xB0C. Wei\xDFe Glasur drauf. Beim Anschneiden sieht man alle 4 Farben \u2014 alle sagen Wow!",
          url: "https://www.amazon.de/s?k=lebensmittelfarbe+set+gel+regenbogen+kuchen&tag=machsleicht21-21",
        },
        gross: {
          name: "Einhorn-Torte",
          desc: "Fondant-Horn, Ohren und essbare Glitzer-Deko",
          rezept:
            "2 runde B\xF6den backen, mit Buttercreme f\xFCllen und au\xDFen einstreichen. Fondant-Horn: gelben Fondant zu einer Spirale drehen und an Schaschlikspie\xDF befestigen. Ohren aus Fondant ausschneiden. Oben reinstecken. Essbare Glitzer-Sterne und Bl\xFCten platzieren. Rosa Buttercreme-M\xE4hne mit Spritzt\xFClle.",
          url: "https://www.amazon.de/s?k=einhorn+fondant+set+tortendeko+kinder&tag=machsleicht21-21",
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
          url: "https://www.amazon.de/s?k=feuerwehr+kindergeburtstag+teller+becher&tag=machsleicht21-21",
        },
        {
          name: "Rote Luftballons 15 Stk.",
          price: 5.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F388}",
          url: "https://www.amazon.de/s?k=rote+luftballons+kindergeburtstag&tag=machsleicht21-21",
        },
        {
          name: "Absperrband 10m",
          price: 4.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F6A7}",
          url: "https://www.amazon.de/s?k=absperrband+kindergeburtstag+feuerwehr&tag=machsleicht21-21",
        },
      ],
      dekoMin: [
        {
          name: "Rote Luftballons 10 Stk.",
          price: 2.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F388}",
          url: "https://www.amazon.de/s?k=rote+luftballons&tag=machsleicht21-21",
        },
      ],
      mitgebsel: [
        {
          name: "Mini-Feuerwehrautos 8 Stk.",
          price: 9.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F692}",
          url: "https://www.amazon.de/s?k=mini+feuerwehrautos+kinder&tag=machsleicht21-21",
        },
        {
          name: "Feuerwehr-Sticker 80 Stk.",
          price: 4.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F3F7}\uFE0F",
          url: "https://www.amazon.de/s?k=feuerwehr+sticker+kinder&tag=machsleicht21-21",
        },
        {
          name: "Papiert\xFCten rot 12 Stk.",
          price: 4.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F6CD}\uFE0F",
          url: "https://www.amazon.de/s?k=papiert%C3%BCten+rot+kindergeburtstag&tag=machsleicht21-21",
        },
      ],
      kuchen: {
        klein: {
          name: "Feuerwehr-Muffins",
          desc: "Rote Glasur mit Mini-Feuerwehr obendrauf",
          rezept:
            "Vanilla-Muffins backen. Rote Glasur drauf (Puderzucker + rote Lebensmittelfarbe). Mini-Feuerwehrauto-Figur oder Feuerwehr-Picker obendrauf. Gelbe Streusel als Funken. Fertig in 30 Minuten!",
          url: "https://www.amazon.de/s?k=feuerwehr+muffin+deko+picker+kindergeburtstag&tag=machsleicht21-21",
        },
        mittel: {
          name: "Feuerwehr-Kuchen",
          desc: "Kastenform mit roter Glasur und Gummib\xE4rchen-Leiter",
          rezept:
            "Kastenkuchen backen. Rote Glasur drauf (= Feuerwehrauto). Aus Mikado-Stangen oder Brezelstangen eine Leiter legen. Fenster aus wei\xDFem Fondant oder Oblaten. R\xE4der aus Oreo-Keksen. Blaulicht aus blauem Gummib\xE4rchen obendrauf.",
          url: "https://www.amazon.de/s?k=feuerwehr+tortendeko+kinder+geburtstag&tag=machsleicht21-21",
        },
        gross: {
          name: "Feuerwache-Torte",
          desc: "Eckiger Kuchen mit Fondant-Toren und Spielzeug-Fahrzeug",
          rezept:
            "Eckigen Kuchen backen (Blechkuchen, quadratisch zuschneiden). Rote Fondant-Verkleidung. Tore aus grauem Fondant ausschneiden und anlegen. Echtes Spielzeug-Feuerwehrauto vor die Tore stellen. 112 aus Fondant-Zahlen obendrauf. Flammen aus Zuckerguss am Rand.",
          url: "https://www.amazon.de/s?k=fondant+set+rot+tortendeko+geburtstag&tag=machsleicht21-21",
        },
      },
    },
];

var LICENSE = [
    {
      id: "paw-patrol",
      name: "Paw Patrol",
      emoji: "\u{1F415}",
      color: "#1565C0",
      cat: "license",
      ages: [3, 4, 5, 6, 7],
      spiele: {
        klein: [
          {
            name: "H\xFChner einfangen (Chickaletta!)",
            desc: "Luftballons mit H\xFChnergesichtern im Raum verteilen \u2014 alle gemeinsam in den W\xE4schekorb-Stall bugsieren. Teamwork wie bei der PAW Patrol!",
            dauer: 15,
          },
          {
            name: "Marshalls L\xF6scheinsatz",
            desc: "Das Rathaus brennt! Becher-Pyramide (= Feuer) mit Schwamm-Wasserbomben abwerfen. Jedes Kind darf 3\xD7 werfen.",
            dauer: 15,
          },
          {
            name: "Welpen-Medaillen basteln",
            desc: "Hundemarken aus Moosgummi basteln: Runde Scheibe ausschneiden, mit Glitzer und Stickern verzieren. Muss erst verdient werden!",
            dauer: 15,
          },
        ],
        mittel: [
          {
            name: "PAW Patrol Rettungsmission",
            desc: "Ryder ruft an! 6 Stationen, je einem Welpen zugeordnet: Marshall (Wasser-Zielschie\xDFen), Chase (Hindernis-Parcours), Skye (Papierflieger-Weitflug), Rocky (Recycling-Sortieren), Rubble (Turm bauen), Zuma (Apfel-Tauchen). Pro Station gibts einen Sticker f\xFCr die Urkunde.",
            dauer: 30,
          },
          {
            name: "Pfotenabdruck-Memory",
            desc: "Riesen-Memory: Bunte Pfoten auf Pappteller malen, immer 2 gleiche. Teller umgedreht im Raum verteilen \u2014 wer findet die Paare?",
            dauer: 15,
          },
          {
            name: "Welpen-Verkleidung & Foto",
            desc: "Paw Patrol Masken an St\xE4ben \u2014 jedes Kind verkleidet sich als Lieblingswelpe und macht ein Foto. Wird auf eine Erinnerungskarte geklebt.",
            dauer: 15,
          },
        ],
        gross: [
          {
            name: "Schnitzeljagd: Mission Adventure Bay",
            desc: "Auftrags-Umschl\xE4ge mit Welpen-Bildern an 6 Stationen. Jede Mission testet eine andere F\xE4higkeit: R\xE4tsel l\xF6sen (Chase), Zielwerfen (Marshall), Geschicklichkeit (Skye). Am Ende gibts eine Trainer-Urkunde.",
            dauer: 30,
          },
          {
            name: "Wer bin ich? PAW Patrol Edition",
            desc: "Zettel mit PAW Patrol Charakteren (auch Nebencharaktere!) auf den R\xFCcken kleben. Nur Ja/Nein-Fragen erlaubt. Wer seinen Charakter err\xE4t, bekommt ein passendes Accessoire.",
            dauer: 15,
          },
          {
            name: "Hindernisparcours \xE0 la Chase",
            desc: "Unter Seilen durchkriechen, \xFCber Kissen springen, Ball transportieren, Ringe werfen. Auf Zeit \u2014 wer schafft den Einsatz am schnellsten?",
            dauer: 20,
          },
        ],
      },
      deko: [
        {
          name: "Paw Patrol Teller+Becher Set (8 Pers.)",
          price: 13.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F415}",
          url: "https://www.amazon.de/s?k=paw+patrol+kindergeburtstag+teller+becher&tag=machsleicht21-21",
        },
        {
          name: "Paw Patrol Luftballons 10 Stk.",
          price: 8.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F388}",
          url: "https://www.amazon.de/s?k=paw+patrol+luftballons+kindergeburtstag&tag=machsleicht21-21",
        },
        {
          name: "Paw Patrol Girlande",
          price: 6.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F3F7}\uFE0F",
          url: "https://www.amazon.de/s?k=paw+patrol+girlande+geburtstag&tag=machsleicht21-21",
        },
        {
          name: "Paw Patrol Tischdecke",
          price: 4.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F3A8}",
          url: "https://www.amazon.de/s?k=paw+patrol+tischdecke+kindergeburtstag&tag=machsleicht21-21",
        },
      ],
      dekoMin: [
        {
          name: "Blaue+rote Luftballons 10 Stk.",
          price: 2.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F388}",
          url: "https://www.amazon.de/s?k=blaue+rote+luftballons&tag=machsleicht21-21",
        },
        {
          name: "Pfotenspuren aus Tonpapier (DIY)",
          price: 0,
          eco: !0,
          bbl: "diy",
          emoji: "\u{1F43E}",
        },
      ],
      mitgebsel: [
        {
          name: "Paw Patrol Mini-Figuren 6 Stk.",
          price: 11.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F415}",
          url: "https://www.amazon.de/s?k=paw+patrol+mini+figuren&tag=machsleicht21-21",
        },
        {
          name: "Paw Patrol Sticker 100 Stk.",
          price: 5.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F3F7}\uFE0F",
          url: "https://www.amazon.de/s?k=paw+patrol+sticker+kinder&tag=machsleicht21-21",
        },
        {
          name: "Paw Patrol T\xFCten 8 Stk.",
          price: 5.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F6CD}\uFE0F",
          url: "https://www.amazon.de/s?k=paw+patrol+t%C3%BCten+kindergeburtstag&tag=machsleicht21-21",
        },
      ],
      kuchen: {
        klein: {
          name: "Pfoten-Muffins",
          desc: "Schoko-Muffins mit Pfoten aus Smarties",
          rezept:
            "Schoko-Muffins backen. Schoko-Glasur drauf. Pro Muffin: 1 gro\xDFer brauner Smartie als Ballen + 4 kleine Smarties als Zehen = Pfote! Super einfach und sieht toll aus.",
          url: "https://www.amazon.de/s?k=paw+patrol+muffin+deko+kindergeburtstag&tag=machsleicht21-21",
        },
        mittel: {
          name: "Lookout-Tower-Kuchen",
          desc: "Runder Kuchen mit Waffelrolle als Turm",
          rezept:
            "Runden Kuchen backen. Blaue Glasur drauf. Eiswaffelrolle in die Mitte stellen (= Lookout Tower). Paw Patrol Figur obendrauf setzen. Bunte Smarties als Pfoten-Abdr\xFCcke auf dem Kuchen verteilen. '112' aus Zuckerperlen.",
          url: "https://www.amazon.de/s?k=paw+patrol+tortenfigur+deko+kindergeburtstag&tag=machsleicht21-21",
        },
        gross: {
          name: "Adventure Bay Kuchen",
          desc: "Flacher Kuchen als Landschaft mit Figuren",
          rezept:
            "Flachen Blechkuchen backen. Gr\xFCne Glasur (= Wiese). Fondant-Stra\xDFen in Grau. Paw Patrol Figuren aufstellen. H\xE4user aus Waffelkeksen. B\xE4ume aus Brokkoli (ja wirklich \u2014 sieht super aus!). Lookout Tower aus Waffelrollen.",
          url: "https://www.amazon.de/s?k=paw+patrol+tortenfiguren+set+kinder&tag=machsleicht21-21",
        },
      },
    },
    {
      id: "pokemon",
      name: "Pok\xE9mon",
      emoji: "\u26A1",
      color: "#F9A825",
      cat: "license",
      ages: [5, 6, 7, 8, 9, 10],
      spiele: {
        klein: [
          {
            name: "Pok\xE9mon fangen!",
            desc: "Ausgedruckte Pok\xE9mon-Bilder im Raum/Garten verstecken. Jedes Kind bekommt einen 'Pok\xE9dex' (Stickerheft). F\xFCr jedes gefundene Pok\xE9mon gibts einen Sticker zum Einkleben.",
            dauer: 20,
          },
          {
            name: "Pok\xE9ball-Zielwurf",
            desc: "Styroporb\xE4lle rot+wei\xDF anmalen = Pok\xE9b\xE4lle. Auf Becher-Pyramiden mit Pok\xE9mon-Bildern werfen. Triffst du, hast du das Pok\xE9mon gefangen!",
            dauer: 15,
          },
          {
            name: "Pikachu-Stopptanz",
            desc: "Tanzen zur Musik. Bei Stopp: 'PIKAAA!' rufen und wie Pikachu einfrieren. Wer sich bewegt, ist raus.",
            dauer: 10,
          },
        ],
        mittel: [
          {
            name: "Pok\xE9mon-Trainer-Pr\xFCfung",
            desc: "6 Stationen = 6 Orden wie in der Kanto-Region. Pro Station eine Challenge: Pok\xE9ball basteln (Styroporb\xE4lle bemalen), Pok\xE9mon-Quiz (1-2-oder-3-Format), Zielwerfen, Pok\xE9mon-Pantomime, Eis-Pok\xE9mon befreien (aus Eisw\xFCrfeln!), Pok\xE9mon-Bingo. Jeden Orden auf die Trainer-Karte stecken.",
            dauer: 30,
          },
          {
            name: "Pok\xE9ball basteln",
            desc: "Wei\xDFe Styroporb\xE4lle mit Filzstiften in bunte Pok\xE9b\xE4lle verwandeln. Jedes Kind designt seinen eigenen \u2014 zum Mitnehmen!",
            dauer: 15,
          },
          {
            name: "Team Rocket Dosenwerfen",
            desc: "Becher mit Team-Rocket-Bildern \xFCbereinander stapeln. Mit Pok\xE9b\xE4llen (Softb\xE4lle) umwerfen. Besiege Team Rocket!",
            dauer: 15,
          },
        ],
        gross: [
          {
            name: "Pok\xE9mon-Trainer-Rallye",
            desc: "Profi-Version: 8 Stationen = 8 Arena-Orden. Wissensquiz, Geschicklichkeit, Codes knacken, Pok\xE9mon zuordnen (Typ-St\xE4rken/Schw\xE4chen), Pok\xE9ball-Zielwerfen. Wer alle 8 Orden hat, ist Pok\xE9mon-Meister!",
            dauer: 35,
          },
          {
            name: "Pok\xE9mon-Turnier (1-2-oder-3)",
            desc: "Pok\xE9mon-Wissensfragen mit 3 Antworten. Kinder stellen sich zur Zahl. 'Ob ihr wirklich richtig steht, seht ihr wenn das Blatt sich dreht!' Punkte sammeln im Team.",
            dauer: 15,
          },
          {
            name: "Geist-Pok\xE9mon befreien",
            desc: "Figuren in Natron-Eier einschlie\xDFen. Kinder m\xFCssen sie mit Essig-Pipetten vorsichtig freilegen. Wer befreit sein Pok\xE9mon zuerst? Wie echte Ausgrabung!",
            dauer: 20,
          },
        ],
      },
      deko: [
        {
          name: "Pok\xE9mon Teller+Becher Set (8 Pers.)",
          price: 14.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u26A1",
          url: "https://www.amazon.de/s?k=pok%C3%A9mon+kindergeburtstag+teller+becher&tag=machsleicht21-21",
        },
        {
          name: "Pok\xE9mon Luftballons 12 Stk.",
          price: 9.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F388}",
          url: "https://www.amazon.de/s?k=pok%C3%A9mon+luftballons+kindergeburtstag&tag=machsleicht21-21",
        },
        {
          name: "Pikachu-Girlande",
          price: 7.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u26A1",
          url: "https://www.amazon.de/s?k=pikachu+girlande+geburtstag&tag=machsleicht21-21",
        },
      ],
      dekoMin: [
        {
          name: "Gelbe+rote Luftballons 10 Stk.",
          price: 2.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F388}",
          url: "https://www.amazon.de/s?k=gelbe+rote+luftballons&tag=machsleicht21-21",
        },
        {
          name: "Pok\xE9ball aus Pappteller (DIY)",
          price: 0,
          eco: !0,
          bbl: "diy",
          emoji: "\u{1F534}",
        },
      ],
      mitgebsel: [
        {
          name: "Pok\xE9mon Sammelkarten Booster",
          price: 6.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F0CF}",
          url: "https://www.amazon.de/s?k=pok%C3%A9mon+sammelkarten+booster&tag=machsleicht21-21",
        },
        {
          name: "Pok\xE9mon Sticker 80 Stk.",
          price: 5.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F3F7}\uFE0F",
          url: "https://www.amazon.de/s?k=pok%C3%A9mon+sticker+kinder&tag=machsleicht21-21",
        },
        {
          name: "Pok\xE9mon T\xFCten 8 Stk.",
          price: 5.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F6CD}\uFE0F",
          url: "https://www.amazon.de/s?k=pok%C3%A9mon+t%C3%BCten+kindergeburtstag&tag=machsleicht21-21",
        },
      ],
      kuchen: {
        klein: {
          name: "Pok\xE9ball-Muffins",
          desc: "Halb rot, halb wei\xDF glasiert \u2014 super einfach!",
          rezept:
            "Muffins backen. Obere H\xE4lfte: rote Glasur (Puderzucker + rote Lebensmittelfarbe). Untere H\xE4lfte: wei\xDFe Glasur. Schwarzen Fondant-Streifen in der Mitte. Wei\xDFen Kreis als Button. Sieht aus wie ein echter Pok\xE9ball!",
          url: "https://www.amazon.de/s?k=pokemon+muffin+deko+kindergeburtstag&tag=machsleicht21-21",
        },
        mittel: {
          name: "Pikachu-Kuchen",
          desc: "Runder Kuchen mit gelber Glasur + Pikachu-Gesicht",
          rezept:
            "Runden Kuchen backen. Gelbe Glasur drauf. Ohren: 2 spitze Dreiecke aus Pappe mit Alufolie umwickeln, oben reinstecken. Augen: gro\xDFe runde Schoko-Pl\xE4ttchen. Backen: rote Smarties. Mund: Schoko-Schrift. Nase: kleiner Schoko-Punkt. Ganz einfach, mega Effekt!",
          url: "https://www.amazon.de/s?k=pokemon+tortendeko+pikachu+kinder&tag=machsleicht21-21",
        },
        gross: {
          name: "Pok\xE9ball-Torte",
          desc: "Runde Torte im Pok\xE9ball-Design",
          rezept:
            "2 runde B\xF6den backen. Buttercreme dazwischen und au\xDFen. Obere H\xE4lfte: roter Fondant. Untere H\xE4lfte: wei\xDFer Fondant. Schwarzer Fondant-Streifen in der Mitte. Wei\xDFer Fondant-Kreis als Button. Sauber und professionell \u2014 perfekt f\xFCr Pok\xE9mon-Fans!",
          url: "https://www.amazon.de/s?k=fondant+set+rot+weiss+schwarz+torte&tag=machsleicht21-21",
        },
      },
    },
    {
      id: "minecraft",
      name: "Minecraft",
      emoji: "\u26CF\uFE0F",
      color: "#4CAF50",
      cat: "license",
      ages: [6, 7, 8, 9, 10, 11, 12],
      spiele: {
        klein: [
          {
            name: "Pixel-Bild malen",
            desc: "Kariertes Papier + Buntstifte: Jedes Kind malt sein eigenes Minecraft-Bild K\xE4stchen f\xFCr K\xE4stchen. Creeper, Schwert oder Steve \u2014 Vorlagen liegen bereit.",
            dauer: 15,
          },
          {
            name: "Creeper-Dosenwerfen",
            desc: "Wei\xDFe Pappbecher gr\xFCn bemalen + Creeper-Gesicht mit Edding. \xDCbereinander stapeln und mit Ball umwerfen. Besiege den Creeper!",
            dauer: 15,
          },
          {
            name: "Erze suchen",
            desc: "In Schokofolie eingewickelte 'Diamanten' (blaue Bonbons), 'Gold' (gelbe) und 'Redstone' (rote) im Raum verstecken. Wer findet die meisten Erze?",
            dauer: 15,
          },
        ],
        mittel: [
          {
            name: "Minecraft-Survival-Rallye",
            desc: "5 Stationen wie im Spiel: Erze abbauen (Schoko-M\xFCnzen suchen), Creeper besiegen (Dosenwerfen), H\xF6hle erkunden (dunkler Raum mit Taschenlampen), Redstone aktivieren (R\xE4tsel l\xF6sen), Enderportal \xF6ffnen (Code knacken). Am Ende: Schatztruhe mit Diamanten (blaue Bonbons)!",
            dauer: 30,
          },
          {
            name: "Bau-Wettbewerb",
            desc: "LEGO oder Kartons: Wer baut in 10 Minuten das beste Minecraft-Bauwerk? Thema wird vorgegeben (Haus, Turm, Farm). Jury bewertet Kreativit\xE4t!",
            dauer: 20,
          },
          {
            name: "TNT-Pi\xF1ata",
            desc: "Schuhkarton mit rotem Krepppapier + wei\xDFes TNT-Schild = Pi\xF1ata. Kinder schlagen oder werfen abwechselnd bis die S\xFC\xDFigkeiten rausfallen!",
            dauer: 10,
          },
        ],
        gross: [
          {
            name: "Enderdrachen-Escape",
            desc: "12 'Endsteine' (gr\xFCne Schachteln) im Garten/Haus versteckt. Jeder Stein hat ein R\xE4tsel: Mathe, Logik, Minecraft-Wissen. Alle 12 finden + l\xF6sen = Portal \xF6ffnet sich. Dahinter: Enderdrachen-Pi\xF1ata!",
            dauer: 35,
          },
          {
            name: "Crafting-Quiz",
            desc: "Wie craftet man eine Spitzhacke? Was braucht man f\xFCr eine Fackel? Teams raten Minecraft-Rezepte. 3\xD73 Raster auf Papier \u2014 Zutaten richtig platzieren.",
            dauer: 15,
          },
          {
            name: "Zombie-Jagd mit Wasserpistolen",
            desc: "3 Kinder sind Zombies (gr\xFCne T-Shirts/Masken). Rest hat Wasserpistolen. Zombies m\xFCssen fangen, Spieler m\xFCssen abspritzen. Getroffene Zombies frieren 10 Sekunden ein.",
            dauer: 20,
          },
        ],
      },
      deko: [
        {
          name: "Minecraft Teller+Becher Set (8 Pers.)",
          price: 14.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u26CF\uFE0F",
          url: "https://www.amazon.de/s?k=minecraft+kindergeburtstag+teller+becher&tag=machsleicht21-21",
        },
        {
          name: "Minecraft Luftballons 12 Stk.",
          price: 8.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F388}",
          url: "https://www.amazon.de/s?k=minecraft+luftballons+kindergeburtstag&tag=machsleicht21-21",
        },
        {
          name: "Creeper-Girlande",
          price: 6.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F49A}",
          url: "https://www.amazon.de/s?k=minecraft+creeper+girlande+geburtstag&tag=machsleicht21-21",
        },
      ],
      dekoMin: [
        {
          name: "Gr\xFCne+braune Luftballons 10 Stk.",
          price: 2.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F388}",
          url: "https://www.amazon.de/s?k=gr%C3%BCne+braune+luftballons&tag=machsleicht21-21",
        },
        {
          name: "Fenster mit Washi-Tape 'pixeln' (DIY)",
          price: 0,
          eco: !0,
          bbl: "diy",
          emoji: "\u{1F7E9}",
        },
      ],
      mitgebsel: [
        {
          name: "Minecraft Sticker 100 Stk.",
          price: 5.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F3F7}\uFE0F",
          url: "https://www.amazon.de/s?k=minecraft+sticker+kinder&tag=machsleicht21-21",
        },
        {
          name: "Pixel-Armb\xE4nder 12 Stk.",
          price: 7.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u231A",
          url: "https://www.amazon.de/s?k=pixel+armb%C3%A4nder+kinder+minecraft&tag=machsleicht21-21",
        },
        {
          name: "Minecraft T\xFCten 8 Stk.",
          price: 5.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F6CD}\uFE0F",
          url: "https://www.amazon.de/s?k=minecraft+t%C3%BCten+kindergeburtstag&tag=machsleicht21-21",
        },
      ],
      kuchen: {
        klein: {
          name: "Creeper-Muffins",
          desc: "Gr\xFCne Glasur mit Pixel-Gesicht aus Schokost\xFCckchen",
          rezept:
            "Muffins backen. Gr\xFCne Glasur drauf (Puderzucker + gr\xFCne Lebensmittelfarbe). Creeper-Gesicht: kleine Schoko-St\xFCckchen als Pixel-Augen und Mund legen. Geht super schnell und jedes Kind erkennt den Creeper!",
          url: "https://www.amazon.de/s?k=minecraft+muffin+deko+creeper+kindergeburtstag&tag=machsleicht21-21",
        },
        mittel: {
          name: "Grasblock-Kuchen",
          desc: "Eckiger Kuchen mit gr\xFCnem Fondant oben, braun an den Seiten",
          rezept:
            "Eckigen Kuchen backen (Blechkuchen quadratisch zuschneiden oder Kastenform). Seiten: brauner Fondant oder Schoko-Glasur (= Erde). Oben: gr\xFCner Fondant (= Gras). Mit braunem Fondant Pixel-Muster auf die Seiten. Sieht aus wie ein echter Minecraft-Block!",
          url: "https://www.amazon.de/s?k=minecraft+tortendeko+kinder+geburtstag&tag=machsleicht21-21",
        },
        gross: {
          name: "Enderportal-Torte",
          desc: "Schwarzer Schoko-Kuchen mit gr\xFCnen Endsteinen",
          rezept:
            "Dunklen Schoko-Kuchen backen. Schwarze Glasur (Schoko + etwas schwarze Lebensmittelfarbe). Gr\xFCne Fondant-Quadrate als Endsteine auf den Rand legen. Enderman-Figur in die Mitte. Lila Fondant-Streifen als Portal-Effekt. Essbare Glitzer-Sterne dar\xFCber.",
          url: "https://www.amazon.de/s?k=minecraft+tortenfigur+enderman+deko&tag=machsleicht21-21",
        },
      },
    },
    {
      id: "frozen",
      name: "Frozen / Eisk\xF6nigin",
      emoji: "\u2744\uFE0F",
      color: "#4FC3F7",
      cat: "license",
      ages: [3, 4, 5, 6, 7, 8],
      spiele: {
        klein: [
          {
            name: "Elsas Schneeflocken-Suche",
            desc: "Glitzernde Schneeflocken (Pappe + Glitzer) im Raum verstecken. Wer findet die meisten? Jede Schneeflocke hat eine Zahl \u2014 am Ende zusammenz\xE4hlen!",
            dauer: 15,
          },
          {
            name: "Frozen-Stopptanz",
            desc: "Tanzen zur Musik. Bei Stopp: 'FREEZE!' \u2014 wie von Elsa eingefroren. Wer sich bewegt, wird von Anna 'aufgetaut' (Umarmung) und darf weiter.",
            dauer: 10,
          },
          {
            name: "Olaf zusammenbauen",
            desc: "Gro\xDFer Olaf aus Pappe (3 Teile: Kopf, Bauch, Beine + Nase + Arme). Mit verbundenen Augen zusammenlegen \u2014 wie 'Schwanz an den Esel'. Wer baut den besten Olaf?",
            dauer: 15,
          },
        ],
        mittel: [
          {
            name: "Arendelle-Abenteuer-Rallye",
            desc: "5 Stationen: Schneeflocken fangen (Watte-B\xE4lle auffangen), Olafs Nase anpinnen (mit verbundenen Augen), Eisburg bauen (Zucker-W\xFCrfel stapeln), Trolls-R\xE4tsel l\xF6sen, Elsas Krone basteln (Pfeifenreiniger + Glitzer). Pro Station ein Schneeflocken-Stempel auf die Karte.",
            dauer: 30,
          },
          {
            name: "Schneekugel basteln",
            desc: "Marmeladen-Glas + Glitzer + Wasser + Glycerin + kleine Figur = eigene Frozen-Schneekugel zum Mitnehmen. Magisch!",
            dauer: 20,
          },
          {
            name: "Eisk\xF6nigin-Quiz",
            desc: "Fragen zum Film: Wer ist Sven? Was singt Elsa? Wie hei\xDFt der b\xF6se Prinz? Buzzer-Runde mit K\xFCchengl\xF6ckchen.",
            dauer: 10,
          },
        ],
        gross: [
          {
            name: "Frozen Escape: Rette Arendelle!",
            desc: "Elsas Kr\xE4fte sind au\xDFer Kontrolle! 5 R\xE4tsel-Stationen l\xF6sen um Arendelle zu retten: Geheimschrift entschl\xFCsseln, Schloss-Kombination knacken, Kristall-Puzzle, Troll-R\xE4tsel, Schneeflocken-Code. Teamwork n\xF6tig!",
            dauer: 30,
          },
          {
            name: "Eispalast-Bauwettbewerb",
            desc: "Teams bauen aus Zuckerw\xFCrfeln, Marshmallows und Zahnstochern den sch\xF6nsten Eispalast. Glitzer-Spray zum Finish. Jury bewertet!",
            dauer: 20,
          },
          {
            name: "Frozen-Karaoke",
            desc: "'Lass jetzt los' und andere Frozen-Songs \u2014 Karaoke-Contest mit Punkte-Jury. Auch Paar-Auftritte erlaubt!",
            dauer: 15,
          },
        ],
      },
      deko: [
        {
          name: "Frozen Teller+Becher Set (8 Pers.)",
          price: 13.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u2744\uFE0F",
          url: "https://www.amazon.de/s?k=frozen+eisk%C3%B6nigin+kindergeburtstag+teller+becher&tag=machsleicht21-21",
        },
        {
          name: "Schneeflocken-Luftballons 12 Stk.",
          price: 7.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F388}",
          url: "https://www.amazon.de/s?k=schneeflocken+luftballons+kindergeburtstag&tag=machsleicht21-21",
        },
        {
          name: "Frozen Girlande",
          price: 6.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F478}",
          url: "https://www.amazon.de/s?k=frozen+girlande+geburtstag&tag=machsleicht21-21",
        },
      ],
      dekoMin: [
        {
          name: "Hellblaue+wei\xDFe Luftballons 10 Stk.",
          price: 2.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F388}",
          url: "https://www.amazon.de/s?k=hellblaue+wei%C3%9Fe+luftballons&tag=machsleicht21-21",
        },
        {
          name: "Schneeflocken aus Papier falten (DIY)",
          price: 0,
          eco: !0,
          bbl: "diy",
          emoji: "\u2744\uFE0F",
        },
      ],
      mitgebsel: [
        {
          name: "Frozen Sticker 100 Stk.",
          price: 5.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F3F7}\uFE0F",
          url: "https://www.amazon.de/s?k=frozen+sticker+kinder&tag=machsleicht21-21",
        },
        {
          name: "Schneeflocken-Haarspangen 12 Stk.",
          price: 6.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u2744\uFE0F",
          url: "https://www.amazon.de/s?k=schneeflocken+haarspangen+kinder&tag=machsleicht21-21",
        },
        {
          name: "Frozen T\xFCten 8 Stk.",
          price: 5.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F6CD}\uFE0F",
          url: "https://www.amazon.de/s?k=frozen+t%C3%BCten+kindergeburtstag&tag=machsleicht21-21",
        },
      ],
      kuchen: {
        klein: {
          name: "Olaf-Muffins",
          desc: "Wei\xDFe Glasur mit Marshmallow-Nase und Schoko-Augen",
          rezept:
            "Vanilla-Muffins backen. Wei\xDFe Glasur drauf. Mini-Marshmallow als Nase (= Karotte). 2 Schoko-Chips als Augen. Aus Fondant einen kleinen Mund formen. Optional: Kokosraspel als Schnee dar\xFCberstreuen.",
          url: "https://www.amazon.de/s?k=frozen+muffin+deko+olaf+kindergeburtstag&tag=machsleicht21-21",
        },
        mittel: {
          name: "Frozen-Kuchen",
          desc: "Hellblauer Zuckerguss mit Schneeflocken und Elsa-Figur",
          rezept:
            "Runden Kuchen backen. Hellblaue Glasur (Puderzucker + blaue Lebensmittelfarbe). Wei\xDFe Schneeflocken aus Fondant oder essbare Schneeflocken-Deko kaufen. Elsa-Figur obendrauf stellen. Essbaren Glitzer dar\xFCberstreuen.",
          url: "https://www.amazon.de/s?k=frozen+tortenfigur+elsa+deko+kindergeburtstag&tag=machsleicht21-21",
        },
        gross: {
          name: "Eispalast-Torte",
          desc: "Zweist\xF6ckig mit Eiszapfen aus Zuckerglasur",
          rezept:
            "2 verschieden gro\xDFe runde B\xF6den backen. Buttercreme dazwischen und au\xDFen. Hellblau + wei\xDF einf\xE4rben. Eiszapfen: Zuckerglasur an den R\xE4ndern herunterlaufen lassen. Schneeflocken-Deko. Essbare Perlen. Elsa + Anna Figuren obendrauf.",
          url: "https://www.amazon.de/s?k=frozen+tortendeko+set+elsa+anna+eiszapfen&tag=machsleicht21-21",
        },
      },
    },
    {
      id: "mario",
      name: "Super Mario",
      emoji: "\u{1F344}",
      color: "#E53935",
      cat: "license",
      ages: [5, 6, 7, 8, 9, 10],
      spiele: {
        klein: [
          {
            name: "M\xFCnzen sammeln",
            desc: "Goldene Schoko-M\xFCnzen im Raum verteilen. Jedes Kind bekommt einen Beutel \u2014 wer sammelt die meisten? Das typische 'Pling!' nachahmen bei jedem Fund!",
            dauer: 15,
          },
          {
            name: "Pilz-Wurf",
            desc: "Rote Pappteller = Pilze. Auf einen Eimer werfen (= Fragezeichen-Block). Trifft man, gibts eine \xDCberraschung aus dem Block (Gummib\xE4rchen)!",
            dauer: 10,
          },
          {
            name: "Super-Mario-Stopptanz",
            desc: "Tanzen + bei Stopp: H\xFCpfen wie Mario! Wer sich nicht bewegt oder nicht h\xFCpft, ist raus.",
            dauer: 10,
          },
        ],
        mittel: [
          {
            name: "Super Mario Welt-Rallye",
            desc: "5 Stationen = 5 Welten: Pilz-K\xF6nigreich (Pilz-Wurfspiel), W\xFCstenwelt (Eierlauf durch Sand), Wolkenwelt (Wattebausch-Pusten), Bowsers Festung (Hindernis-Parcours), Sternen-Welt (Stern-Schnitzeljagd). Pro Welt einen Stern sammeln!",
            dauer: 30,
          },
          {
            name: "M\xFCnzen-Schnellsammeln",
            desc: "Mario vs. Luigi! Zwei Teams, eine Minute, goldene M\xFCnzen \xFCberall verteilt. Welches Team sammelt mehr? 3 Runden, rotierend.",
            dauer: 15,
          },
          {
            name: "Fragezeichen-Block basteln",
            desc: "Karton gelb anmalen + ? draufschreiben. Jedes Kind f\xFCllt seinen Block mit einem Geheimgegenstand. Tauschen + erraten was drin ist!",
            dauer: 15,
          },
        ],
        gross: [
          {
            name: "Mario Kart Olympiade",
            desc: "5 Disziplinen: Bobby-Car-Rennen (oder Sackh\xFCpfen), Bananen-Weitwurf, M\xFCnzen-Staffel, Hindernis-Slalom, Stern-Schatzsuche. Punkte-System \u2014 Sieger bekommt den Gold-Stern!",
            dauer: 35,
          },
          {
            name: "Bowser-Escape",
            desc: "Bowser hat die Prinzessin entf\xFChrt! 6 R\xE4tsel-Stationen knacken (Codes, Rebus, Logik, Mario-Quiz), um den Schl\xFCssel zur Schatztruhe zu finden.",
            dauer: 25,
          },
          {
            name: "Power-Up-Quiz",
            desc: "Mario-Wissensfragen: Was macht der Stern? Wie hei\xDFt Marios Bruder? Welche Farbe hat Yoshis Ei? Teams buzzern mit K\xFCchengl\xF6ckchen.",
            dauer: 10,
          },
        ],
      },
      deko: [
        {
          name: "Super Mario Teller+Becher Set (8 Pers.)",
          price: 14.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F344}",
          url: "https://www.amazon.de/s?k=super+mario+kindergeburtstag+teller+becher&tag=machsleicht21-21",
        },
        {
          name: "Mario Luftballons 12 Stk.",
          price: 8.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F388}",
          url: "https://www.amazon.de/s?k=super+mario+luftballons+kindergeburtstag&tag=machsleicht21-21",
        },
        {
          name: "Mario Girlande + Sterne",
          price: 7.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u2B50",
          url: "https://www.amazon.de/s?k=super+mario+girlande+geburtstag&tag=machsleicht21-21",
        },
      ],
      dekoMin: [
        {
          name: "Rote+gr\xFCne Luftballons 10 Stk.",
          price: 2.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F388}",
          url: "https://www.amazon.de/s?k=rote+gr%C3%BCne+luftballons&tag=machsleicht21-21",
        },
        {
          name: "Fragezeichen-Bl\xF6cke aus Karton (DIY)",
          price: 0,
          eco: !0,
          bbl: "diy",
          emoji: "\u2753",
        },
      ],
      mitgebsel: [
        {
          name: "Mario Sticker 80 Stk.",
          price: 5.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F3F7}\uFE0F",
          url: "https://www.amazon.de/s?k=super+mario+sticker+kinder&tag=machsleicht21-21",
        },
        {
          name: "Gold-Schoko-M\xFCnzen 50 Stk.",
          price: 5.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1FA99}",
          url: "https://www.amazon.de/s?k=gold+schoko+m%C3%BCnzen+kinder&tag=machsleicht21-21",
        },
        {
          name: "Mario T\xFCten 8 Stk.",
          price: 5.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F6CD}\uFE0F",
          url: "https://www.amazon.de/s?k=super+mario+t%C3%BCten+kindergeburtstag&tag=machsleicht21-21",
        },
      ],
      kuchen: {
        klein: {
          name: "Pilz-Muffins",
          desc: "Rote Glasur mit wei\xDFen Schoko-Punkten = Super-Pilz!",
          rezept:
            "Muffins backen. Rote Glasur drauf. Wei\xDFe Schoko-Drops oder Fondant-Punkte als Pilz-Tupfen aufsetzen. Sieht aus wie der Super-Pilz aus Mario! Geht in 5 Minuten.",
          url: "https://www.amazon.de/s?k=super+mario+muffin+deko+kindergeburtstag&tag=machsleicht21-21",
        },
        mittel: {
          name: "Fragezeichen-Block-Kuchen",
          desc: "Gelber eckiger Kuchen mit ? aus Schokolade",
          rezept:
            "Kastenform-Kuchen backen. Gelbe Glasur oder gelber Fondant. Gro\xDFes Fragezeichen aus dunkler Schokolade auf die Oberseite legen (auf Backpapier vorzeichnen, Schoko dr\xFCberspritzen, aush\xE4rten). Braune Fondant-Streifen als Block-R\xE4nder.",
          url: "https://www.amazon.de/s?k=super+mario+tortendeko+kinder+geburtstag&tag=machsleicht21-21",
        },
        gross: {
          name: "Mario-Welten-Torte",
          desc: "Gr\xFCne Wiese mit R\xF6hren und Figuren",
          rezept:
            "Flachen Blechkuchen backen. Gr\xFCne Glasur (= Wiese). R\xF6hren aus gr\xFCnem Fondant (Rollen formen). Rote + gelbe Smarties als M\xFCnzen und Pilze. Mario + Luigi Figuren aufstellen. Wolken aus wei\xDFem Fondant. Fragezeichen-Bl\xF6cke aus gelben Fondant-W\xFCrfeln.",
          url: "https://www.amazon.de/s?k=super+mario+tortenfiguren+set+kinder&tag=machsleicht21-21",
        },
      },
    },
    {
      id: "spiderman",
      name: "Spider-Man",
      emoji: "\u{1F577}\uFE0F",
      color: "#C62828",
      cat: "license",
      ages: [5, 6, 7, 8, 9, 10],
      spiele: {
        klein: [
          {
            name: "Spinnennetze werfen",
            desc: "Wollkn\xE4uel an B\xE4umen/St\xFChlen befestigen = Spinnennetze. Kinder m\xFCssen durchkrabbeln ohne das Netz zu ber\xFChren. Wer schafft es wie Spider-Man?",
            dauer: 15,
          },
          {
            name: "B\xF6sewicht-Dosenwerfen",
            desc: "Becher mit ausgedruckten B\xF6sewicht-Gesichtern. Mit weichen B\xE4llen ('Spinnennetz-Sch\xFCsse') umwerfen. Triff Green Goblin!",
            dauer: 10,
          },
          {
            name: "Spinnen-Suche",
            desc: "Gummi-Spinnen im Raum verstecken. Wer findet die meisten? Am Ende z\xE4hlen \u2014 gr\xF6\xDFte Spinne z\xE4hlt doppelt!",
            dauer: 15,
          },
        ],
        mittel: [
          {
            name: "Spider-Man Trainingscamp",
            desc: "5 Stationen: Spinnennetz durchklettern (Wollf\xE4den zwischen St\xFChlen), H\xE4userwand hochklettern (Kletterger\xFCst), Zielschie\xDFen mit Spinnennetz (Ball auf Ziel), B\xF6sewicht-Quiz, Rettungsmission (Kuscheltier von oben runterholen). Pro Station ein Spinnen-Stempel!",
            dauer: 30,
          },
          {
            name: "Spinnennetz weben",
            desc: "Pappteller + Wolle: L\xF6cher am Rand stanzen, Wolle kreuz und quer durchf\xE4deln = eigenes Spinnennetz. Gummi-Spinne draufsetzen \u2014 fertig zum Mitnehmen!",
            dauer: 15,
          },
          {
            name: "Superhelden-Staffellauf",
            desc: "Teams: Ball zwischen den Knien klemmen + laufen, Seil schwingen, Ring werfen, Zielwurf. Wer ist der schnellste Spider-Man?",
            dauer: 15,
          },
        ],
        gross: [
          {
            name: "Spider-Verse Escape Mission",
            desc: "B\xF6sewichte haben die Stadt \xFCbernommen! 6 R\xE4tsel-Stationen: Codes knacken, Geheimschrift entziffern, Logik-Puzzle, Quiz \xFCber Spider-Man Universum. Am Ende: Schatzkiste mit der Beute der B\xF6sewichte!",
            dauer: 35,
          },
          {
            name: "Hindernis-Parcours: Wolkenkratzer-Sprint",
            desc: "Professioneller Parcours: Unter Netzen durch, \xFCber Hindernisse, an Seilen schwingen, Ziel treffen. Auf Zeit \u2014 Spider-Man-Rekord schlagen!",
            dauer: 20,
          },
          {
            name: "Superhelden-Quiz-Duell",
            desc: "Wer wei\xDF mehr \xFCber Spider-Man, seine B\xF6sewichte und das Marvel-Universum? Buzzer-Runde, Team vs. Team.",
            dauer: 15,
          },
        ],
      },
      deko: [
        {
          name: "Spider-Man Teller+Becher Set (8 Pers.)",
          price: 13.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F577}\uFE0F",
          url: "https://www.amazon.de/s?k=spider+man+kindergeburtstag+teller+becher&tag=machsleicht21-21",
        },
        {
          name: "Spider-Man Luftballons 10 Stk.",
          price: 8.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F388}",
          url: "https://www.amazon.de/s?k=spider+man+luftballons+kindergeburtstag&tag=machsleicht21-21",
        },
        {
          name: "Spinnennetz-Deko",
          price: 4.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F578}\uFE0F",
          url: "https://www.amazon.de/s?k=spinnennetz+deko+halloween+party&tag=machsleicht21-21",
        },
      ],
      dekoMin: [
        {
          name: "Rote+blaue Luftballons 10 Stk.",
          price: 2.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F388}",
          url: "https://www.amazon.de/s?k=rote+blaue+luftballons&tag=machsleicht21-21",
        },
        {
          name: "Watte-Spinnennetze (DIY)",
          price: 0,
          eco: !0,
          bbl: "diy",
          emoji: "\u{1F578}\uFE0F",
        },
      ],
      mitgebsel: [
        {
          name: "Spider-Man Sticker 80 Stk.",
          price: 5.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F3F7}\uFE0F",
          url: "https://www.amazon.de/s?k=spider+man+sticker+kinder&tag=machsleicht21-21",
        },
        {
          name: "Gummi-Spinnen 24 Stk.",
          price: 4.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F577}\uFE0F",
          url: "https://www.amazon.de/s?k=gummi+spinnen+kinder&tag=machsleicht21-21",
        },
        {
          name: "Spider-Man T\xFCten 8 Stk.",
          price: 5.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F6CD}\uFE0F",
          url: "https://www.amazon.de/s?k=spider+man+t%C3%BCten+kindergeburtstag&tag=machsleicht21-21",
        },
      ],
      kuchen: {
        klein: {
          name: "Spinnen-Muffins",
          desc: "Schoko-Muffins mit Lakritze-Beinen = Spinne!",
          rezept:
            "Schoko-Muffins backen. Rote Glasur drauf. Aus Lakritzschnecken 8 Beine pro Muffin schneiden und seitlich reinstecken. 2 Zuckeraugen als Augen aufkleben. Fertig ist die Spinne!",
          url: "https://www.amazon.de/s?k=spider+man+muffin+deko+kindergeburtstag&tag=machsleicht21-21",
        },
        mittel: {
          name: "Spider-Man-Kuchen",
          desc: "Roter Fondant mit schwarzem Spinnennetz",
          rezept:
            "Runden Kuchen backen. Roter Fondant drauf. Mit dunkler Schoko-Glasur oder schwarzem Fondant ein Spinnennetz aufzeichnen (von der Mitte aus Linien nach au\xDFen, dann B\xF6gen verbinden). Geht mit Spritzbeutel oder Zahnstocher. Fertige Spider-Man Figur obendrauf.",
          url: "https://www.amazon.de/s?k=spider+man+tortendeko+figur+kinder&tag=machsleicht21-21",
        },
        gross: {
          name: "Spider-Verse-Torte",
          desc: "Mehrst\xF6ckig, rot-blau mit Spinnennetzen",
          rezept:
            "2 runde B\xF6den: rot (Lebensmittelfarbe) + blau. \xDCbereinander mit Buttercreme. Au\xDFen: halbe Seite roter Fondant, halbe Seite blauer Fondant. Schwarze Fondant-Spinnennetze. Spider-Man Figur obendrauf. Essbare Spinnennetze am Rand.",
          url: "https://www.amazon.de/s?k=spider+man+tortendeko+set+spinnennetz&tag=machsleicht21-21",
        },
      },
    },
    {
      id: "harry-potter",
      name: "Harry Potter",
      emoji: "\u{1F9D9}",
      color: "#5D4037",
      cat: "license",
      ages: [8, 9, 10, 11, 12],
      spiele: {
        klein: [
          {
            name: "Zauberstab basteln",
            desc: "Holzst\xE4be + Hei\xDFklebe-Muster + braune/goldene Farbe = eigener Zauberstab! Jeder Zauberer braucht einen.",
            dauer: 20,
          },
          {
            name: "Zaubertrank mixen",
            desc: "Verschiedene S\xE4fte (Traubensaft = 'Veritaserum', Orangensaft = 'Felix Felicis') nach Rezept mischen. Jedes Kind kreiert seinen Trank!",
            dauer: 15,
          },
          {
            name: "Goldener Schnatz fangen",
            desc: "Gelbe Tischtennisb\xE4lle mit goldenen Fl\xFCgeln (Papier) im Raum verstecken. Wer findet den Goldenen Schnatz?",
            dauer: 10,
          },
        ],
        mittel: [
          {
            name: "Hogwarts-Aufnahmepr\xFCfung",
            desc: "6 Stationen: Zaubertrank brauen (S\xE4fte mischen nach Rezept), Besenflug-Parcours (Besen zwischen Beinen + Slalom), Kr\xE4uterkunde (Pflanzen erraten), Verteidigung gegen dunkle K\xFCnste (Dosenwerfen auf Dementoren), Wahrsagen (R\xE4tsel l\xF6sen), Sprechender Hut (Sortierung in H\xE4user). Am Ende: Hogwarts-Urkunde!",
            dauer: 35,
          },
          {
            name: "Quidditch im Garten",
            desc: "Vereinfacht: 3 Reifen an Stangen = Tore. Teams werfen B\xE4lle durch die Reifen. Ein gelber Ball = Schnatz, extra Punkte. Einfache Regeln, gro\xDFer Spa\xDF!",
            dauer: 20,
          },
          {
            name: "Geheimschrift mit Zitronensaft",
            desc: "Nachrichten mit Zitronensaft schreiben \u2014 unsichtbar! Mit F\xF6hn/Kerze erscheint die Schrift. Jedes Kind schreibt eine geheime Nachricht.",
            dauer: 15,
          },
        ],
        gross: [
          {
            name: "Escape from Hogwarts",
            desc: "Voldemort hat Hogwarts \xFCbernommen! 8 R\xE4tsel-Stationen: Zaubertrank-Rezept entschl\xFCsseln, Kammer des Schreckens \xF6ffnen (Schloss-Kombi), Geheimschrift lesen, Trimagisches Turnier (Geschicklichkeit), Horkrux finden. Gro\xDFes Finale mit Schatztruhe!",
            dauer: 40,
          },
          {
            name: "Trimagisches Turnier",
            desc: "3 Aufgaben wie im Film: Drachen-Ei klauen (Eier-Staffel um Hindernisse), Unterwasser-Challenge (Apfel-Tauchen), Labyrinth (Irrweg mit R\xE4tseln). Punkte-System!",
            dauer: 25,
          },
          {
            name: "Sprechender Hut Zeremonie",
            desc: "Echter Hut mit verstecktem Zettel pro Kind. Feierliche Sortierung in Gryffindor, Hufflepuff, Ravenclaw, Slytherin. H\xE4user-Teams f\xFCr den Rest der Party!",
            dauer: 10,
          },
        ],
      },
      deko: [
        {
          name: "Harry Potter Teller+Becher (8 Pers.)",
          price: 14.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F9D9}",
          url: "https://www.amazon.de/s?k=harry+potter+kindergeburtstag+teller+becher&tag=machsleicht21-21",
        },
        {
          name: "Hogwarts-Luftballons 10 Stk.",
          price: 8.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F388}",
          url: "https://www.amazon.de/s?k=harry+potter+luftballons+kindergeburtstag&tag=machsleicht21-21",
        },
        {
          name: "Schwimmende Kerzen (LED) 12 Stk.",
          price: 11.99,
          eco: !1,
          bbl: "borrow",
          emoji: "\u{1F56F}\uFE0F",
        },
      ],
      dekoMin: [
        {
          name: "Braune+goldene Luftballons 10 Stk.",
          price: 3.49,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F388}",
          url: "https://www.amazon.de/s?k=braune+goldene+luftballons&tag=machsleicht21-21",
        },
        {
          name: "Briefe mit Siegelwachs (DIY)",
          price: 0,
          eco: !0,
          bbl: "diy",
          emoji: "\u2709\uFE0F",
        },
      ],
      mitgebsel: [
        {
          name: "Zauberst\xE4be Holz 8 Stk.",
          price: 9.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u2728",
          url: "https://www.amazon.de/s?k=zauberst%C3%A4be+holz+kinder+harry+potter&tag=machsleicht21-21",
        },
        {
          name: "Harry Potter Sticker 60 Stk.",
          price: 5.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F3F7}\uFE0F",
          url: "https://www.amazon.de/s?k=harry+potter+sticker+kinder&tag=machsleicht21-21",
        },
        {
          name: "Pergament-T\xFCten 12 Stk.",
          price: 6.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F6CD}\uFE0F",
          url: "https://www.amazon.de/s?k=pergament+t%C3%BCten+harry+potter&tag=machsleicht21-21",
        },
      ],
      kuchen: {
        klein: {
          name: "Zauberhut-Muffins",
          desc: "Schoko-Muffins mit Eiswaffel-Zauberhut",
          rezept:
            "Schoko-Muffins backen. Schoko-Glasur drauf. Umgedrehte Eiswaffel (H\xF6rnchen) als Zauberhut obendrauf setzen. Fondant-Streifen und Sternchen drankleben. Goldene Streusel als Zauberstaub.",
          url: "https://www.amazon.de/s?k=harry+potter+muffin+deko+kindergeburtstag&tag=machsleicht21-21",
        },
        mittel: {
          name: "Hogwarts-Kuchen",
          desc: "Schokoladen-Kuchen mit Hogwarts-Wappen",
          rezept:
            "Schokoladen-Kuchen backen. Schoko-Glasur drauf. Hogwarts-Wappen: aus Fondant in 4 Farben (rot, gr\xFCn, blau, gelb) ein Wappen gestalten oder fertigen Aufleger kaufen. Goldene Sterne und Schoko-Zauberstab als Deko.",
          url: "https://www.amazon.de/s?k=harry+potter+tortendeko+kinder+geburtstag&tag=machsleicht21-21",
        },
        gross: {
          name: "Grimoire-Torte",
          desc: "Buch-f\xF6rmiger Kuchen als Zauberbuch",
          rezept:
            "Kastenform-Kuchen backen. L\xE4ngs halbieren als offenes Buch. Seiten mit hellem Fondant (= Buchseiten). Deckel mit braunem Fondant (= Leder-Einband). Mit Schoko-Schrift 'Zaubertr\xE4nke' auf die Seite schreiben. Goldener Fondant-Verschluss.",
          url: "https://www.amazon.de/s?k=harry+potter+tortendeko+buch+fondant&tag=machsleicht21-21",
        },
      },
    },
    {
      id: "ninjago",
      name: "Ninjago",
      emoji: "\u2694\uFE0F",
      color: "#1B5E20",
      cat: "license",
      ages: [5, 6, 7, 8, 9, 10],
      spiele: {
        klein: [
          {
            name: "Ninja-Ausbildung",
            desc: "Einfacher Parcours: Rollen, H\xFCpfen, Kriechen \u2014 leise wie ein Ninja! Wer den Parcours schafft ohne den Gl\xF6ckchen-Faden zu ber\xFChren, ist ein echter Ninja.",
            dauer: 15,
          },
          {
            name: "Shuriken-Wurf",
            desc: "Pappteller = Shuriken. Auf eine Zielscheibe werfen. Verschiedene Ringe = verschiedene Punkte. Wer hat den besten Wurf?",
            dauer: 10,
          },
          {
            name: "Ninja-Stirnband basteln",
            desc: "Stoffstreifen + Ninjago-Symbol aus Tonpapier. Jedes Kind w\xE4hlt seine Ninja-Farbe (rot, blau, gr\xFCn, wei\xDF, schwarz).",
            dauer: 15,
          },
        ],
        mittel: [
          {
            name: "Ninja-Training mit Spinjitzu",
            desc: "6 Stationen: Balancieren (Seil am Boden), Zielwerfen (Shuriken/Pappteller), Kraft-Test (Armdr\xFCcken/Seilziehen), Geschwindigkeit (Sprint), Geschicklichkeit (Eierlauf), Weisheit (R\xE4tsel). Pro Station ein Element-Sticker: Feuer, Eis, Blitz, Erde.",
            dauer: 30,
          },
          {
            name: "Drachen-Pi\xF1ata besiegen",
            desc: "Pi\xF1ata in Drachen-Form (Schuhkarton + Krepppapier). Mit dem Holzschwert (Papprolle) zuschlagen \u2014 der Drache spuckt S\xFC\xDFigkeiten!",
            dauer: 10,
          },
          {
            name: "Ninja vs. Schurken Fangen",
            desc: "2 Teams: Ninjas vs. Schurken. Fangspiel \u2014 gefangene Spieler k\xF6nnen von Teamkameraden befreit werden (abklatschen). Wer f\xE4ngt alle?",
            dauer: 15,
          },
        ],
        gross: [
          {
            name: "Ninjago Turnier der Elemente",
            desc: "4 Teams (Feuer/Eis/Blitz/Erde), 5 Disziplinen: Parcours, R\xE4tsel, Geschicklichkeit, Quiz, Teamaufgabe. Punkte-System \u2014 Gewinnerteam wird Meister des Spinjitzu!",
            dauer: 35,
          },
          {
            name: "Escape: Garmadons Festung",
            desc: "Der b\xF6se Lord Garmadon hat die goldenen Waffen gestohlen! R\xE4tsel-Stationen knacken, Codes entziffern, Puzzle l\xF6sen um die Waffen zur\xFCckzuholen.",
            dauer: 25,
          },
          {
            name: "Ninjago-Wissens-Battle",
            desc: "Quiz \xFCber alle Ninja, ihre Kr\xE4fte und B\xF6sewichte. Buzzer-Runde, schnellste Hand gewinnt.",
            dauer: 10,
          },
        ],
      },
      deko: [
        {
          name: "Ninjago Teller+Becher Set (8 Pers.)",
          price: 13.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u2694\uFE0F",
          url: "https://www.amazon.de/s?k=ninjago+kindergeburtstag+teller+becher&tag=machsleicht21-21",
        },
        {
          name: "Ninjago Luftballons 10 Stk.",
          price: 7.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F388}",
          url: "https://www.amazon.de/s?k=ninjago+luftballons+kindergeburtstag&tag=machsleicht21-21",
        },
        {
          name: "Ninjago Girlande",
          price: 5.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F3F7}\uFE0F",
          url: "https://www.amazon.de/s?k=ninjago+girlande+geburtstag&tag=machsleicht21-21",
        },
      ],
      dekoMin: [
        {
          name: "Gr\xFCne+schwarze Luftballons 10 Stk.",
          price: 2.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u{1F388}",
          url: "https://www.amazon.de/s?k=gr%C3%BCne+schwarze+luftballons&tag=machsleicht21-21",
        },
      ],
      mitgebsel: [
        {
          name: "Ninjago Sticker 80 Stk.",
          price: 5.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F3F7}\uFE0F",
          url: "https://www.amazon.de/s?k=ninjago+sticker+kinder&tag=machsleicht21-21",
        },
        {
          name: "Mini-Ninja-Figuren 8 Stk.",
          price: 8.99,
          eco: !1,
          bbl: "buy",
          emoji: "\u2694\uFE0F",
          url: "https://www.amazon.de/s?k=mini+ninja+figuren+kinder+ninjago&tag=machsleicht21-21",
        },
        {
          name: "Ninjago T\xFCten 8 Stk.",
          price: 5.99,
          eco: !0,
          bbl: "buy",
          emoji: "\u{1F6CD}\uFE0F",
          url: "https://www.amazon.de/s?k=ninjago+t%C3%BCten+kindergeburtstag&tag=machsleicht21-21",
        },
      ],
      kuchen: {
        klein: {
          name: "Ninja-Muffins",
          desc: "Muffins mit Fondant-Ninja-Masken",
          rezept:
            "Muffins backen. Wei\xDFe Glasur drauf. Farbigen Fondant-Streifen als Ninja-Maske um den oberen Teil des Muffins legen (rot, blau, gr\xFCn oder schwarz). Zuckeraugen als Ninja-Augen zwischen die Maske. Fertig!",
          url: "https://www.amazon.de/s?k=ninjago+muffin+deko+kindergeburtstag&tag=machsleicht21-21",
        },
        mittel: {
          name: "Ninja-Dojo-Kuchen",
          desc: "Runder Kuchen mit Ninjago-Spinner-Deko",
          rezept:
            "Runden Kuchen backen. Schwarze Glasur (Schoko + schwarze Lebensmittelfarbe). Wei\xDFen Fondant-Kreis in die Mitte (= Spinner). Farbige Fondant-Streifen als Energie-Wirbel. Ninjago-Figur obendrauf. Goldener Fondant als Shuriken.",
          url: "https://www.amazon.de/s?k=ninjago+tortendeko+kinder+geburtstag&tag=machsleicht21-21",
        },
        gross: {
          name: "Tempel-Torte",
          desc: "Mehrst\xF6ckig mit Ninjago-Symbolen",
          rezept:
            "2 verschieden gro\xDFe runde B\xF6den. Rote oder gr\xFCne Fondant-Verkleidung. Goldene Fondant-Drachen an den Seiten. Ninjago-Figuren obendrauf. Fondant-Waffen als Deko. Chinesische Schriftzeichen aus schwarzem Fondant.",
          url: "https://www.amazon.de/s?k=ninjago+tortenfiguren+set+kinder&tag=machsleicht21-21",
        },
      },
    },
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
  "paw-patrol": "Ryder ruft", pokemon: "Hey Trainer", minecraft: "Hey Crafter",
  frozen: "Lass jetzt los", mario: "It's-a me", spiderman: "Spidey-Alarm",
  "harry-potter": "Liebe Hexe, lieber Zauberer", ninjago: "Ninja-Alarm",
};
const { useState, useEffect, useRef } = React;
const LS_STORE = "machsleicht";
const LS_VARIANTS = { sicher_fertig: "", morgen_komplett: "" };
function lsCheckout(variant, ctx = {}) {
  const d = LS_VARIANTS[variant];
  if (!d) {
    alert("Zahlungsintegration wird gerade eingerichtet. Aktuell ist alles kostenlos \u2014 viel Spa\xDF!");
    return;
  }
  const v = new URLSearchParams();
  if (ctx.motto) v.set("checkout[custom][motto]", ctx.motto);
  if (ctx.mode) v.set("checkout[custom][mode]", ctx.mode);
  v.set("checkout[custom][source]", "kindergeburtstag");
  const url = `https://${LS_STORE}.lemonsqueezy.com/checkout/buy/${d}?${v.toString()}`;
  window.LemonSqueezy ? window.LemonSqueezy.Url.Open(url) : window.open(url, "_blank");
}
function loadState(key, fallback) {
  try {
    const v = localStorage.getItem("ml_" + key);
    return v !== null ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}
function saveState(key, val) {
  try {
    localStorage.setItem("ml_" + key, JSON.stringify(val));
  } catch {
  }
}
function Pill({ active, onClick, children }) {
  return /* @__PURE__ */ React.createElement("button", { onClick, style: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 16px",
    borderRadius: 99,
    border: `2px solid ${active ? "var(--a)" : "var(--l)"}`,
    background: active ? "var(--al)" : "var(--bg)",
    color: active ? "var(--ad)" : "var(--m)",
    fontSize: 13,
    fontWeight: active ? 700 : 500,
    cursor: "pointer",
    transition: "all .2s",
    fontFamily: "var(--f)"
  } }, children);
}
function ItemRow({ item, isOwned, onToggle }) {
  return /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: isOwned ? "var(--l)" : "var(--bg)",
    borderRadius: "var(--rs)",
    padding: "10px 14px",
    border: "1px solid var(--l)",
    gap: 8,
    flexWrap: "wrap",
    opacity: isOwned ? 0.5 : 1,
    transition: "all .2s"
  } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0 } }, onToggle && /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "checkbox",
      checked: isOwned || false,
      onChange: onToggle,
      style: { width: 16, height: 16, cursor: "pointer", accentColor: "var(--g)" },
      title: "Hab ich schon"
    }
  ), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 18, flexShrink: 0 } }, item.emoji), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, textDecoration: isOwned ? "line-through" : "none" } }, item.name), item.eco && /* @__PURE__ */ React.createElement("span", { title: "Nachhaltig", style: { fontSize: 12 } }, "\u{1F33F}"), /* @__PURE__ */ React.createElement("span", { style: {
    fontSize: 10,
    fontWeight: 700,
    padding: "2px 8px",
    borderRadius: 6,
    background: BBL[item.bbl].c + "15",
    color: BBL[item.bbl].c,
    textTransform: "uppercase",
    flexShrink: 0
  } }, BBL[item.bbl].l)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, flexShrink: 0 } }, item.price > 0 && !isOwned && /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 700, color: "var(--a)", fontSize: 13 } }, "\u20AC", item.price.toFixed(2)), item.price > 0 && isOwned && /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 600, color: "var(--g)", fontSize: 12 } }, "\u2713 Hab ich"), item.price === 0 && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: "var(--g)", fontWeight: 600 } }, "Kostenlos"), item.url && !isOwned && /* @__PURE__ */ React.createElement("a", { href: item.url, target: "_blank", rel: "noopener", style: {
    fontSize: 11,
    fontWeight: 700,
    color: "#FF9900",
    textDecoration: "none",
    padding: "4px 10px",
    borderRadius: 6,
    background: "#FFF3E0",
    whiteSpace: "nowrap"
  } }, "Amazon \u2197")));
}
function Confetti({ active }) {
  if (!active) return null;
  return /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" } }, Array.from({ length: 20 }, (_, i) => /* @__PURE__ */ React.createElement("span", { key: i, style: {
    position: "absolute",
    left: `${35 + Math.random() * 30}%`,
    top: "50%",
    width: 7,
    height: 7,
    borderRadius: Math.random() > 0.5 ? "50%" : "2px",
    background: `hsl(${Math.random() * 360},80%,60%)`,
    animation: `confettiBurst 0.8s ${Math.random() * 0.3}s ease-out forwards`,
    "--tx": `${(Math.random() - 0.5) * 120}px`,
    "--ty": `${-50 - Math.random() * 80}px`,
    opacity: 0
  } })));
}
function ControlHub({ mottoId, szActive, setSzActive }) {
  return /* @__PURE__ */ React.createElement("div", { className: "no-print", style: {
    position: "fixed",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: 660,
    background: "rgba(253,252,249,0.97)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    padding: "8px 12px",
    borderTop: "1px solid var(--l)",
    display: "flex",
    gap: 6,
    zIndex: 100
  } }, /* @__PURE__ */ React.createElement("a", { href: `/einladung/erstellen/?motto=${mottoId || ""}`, style: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    background: "var(--a)",
    color: "#fff",
    fontWeight: 700,
    fontSize: 12,
    textAlign: "center",
    textDecoration: "none",
    fontFamily: "var(--f)"
  } }, "\u{1F48C} Einladung"), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setSzActive(!szActive);
    document.querySelector('[class*="SchnitzeljagdBlock"]')?.scrollIntoView({ behavior: "smooth" });
  }, style: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    background: szActive ? "var(--al)" : "var(--bg)",
    color: szActive ? "var(--a)" : "var(--d)",
    border: `1px solid ${szActive ? "var(--a)" : "var(--l)"}`,
    fontWeight: 700,
    fontSize: 12,
    textAlign: "center",
    cursor: "pointer",
    fontFamily: "var(--f)"
  } }, szActive ? "\u2705 Schnitzeljagd" : "\u{1F5FA}\uFE0F Schnitzeljagd"), /* @__PURE__ */ React.createElement("button", { onClick: () => document.querySelector('[data-action="pdf"]')?.scrollIntoView({ behavior: "smooth" }), style: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    background: "var(--bg)",
    color: "var(--d)",
    border: "1px solid var(--l)",
    fontWeight: 700,
    fontSize: 12,
    textAlign: "center",
    cursor: "pointer",
    fontFamily: "var(--f)"
  } }, "\u{1F4C4} PDF"));
}
function EinladungBlock({ motto, guests, previewName, setPreviewName, inviteSent, setInviteSent }) {
  const displayName = previewName || "Emma";
  const greeting = (MOTTO_GREETINGS[motto?.id] || "Hey") + " " + displayName + "!";
  const done = inviteSent >= guests;
  return /* @__PURE__ */ React.createElement("section", { className: "fu", style: { marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { background: "var(--d)", borderRadius: 16, padding: "20px 18px", color: "#fff" } }, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 18, fontWeight: 900, margin: "0 0 4px", lineHeight: 1.3 } }, guests, " Kinder einladen \u2014 in 30 Sekunden"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13, opacity: 0.6, margin: "0 0 16px" } }, "Jedes Kind bekommt ein interaktives ", motto.name, "-Minispiel als Vorgeschmack."), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 11, opacity: 0.4, margin: "0 0 6px" } }, "Probier's aus \u2014 tippe einen Namen:"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: previewName,
      onChange: (e) => setPreviewName(e.target.value),
      placeholder: "z.B. Emma, Max, Sophie\u2026",
      style: {
        width: "100%",
        padding: "10px 14px",
        borderRadius: 10,
        border: "none",
        background: "rgba(255,255,255,0.12)",
        color: "#fff",
        fontSize: 14,
        fontFamily: "var(--f)",
        outline: "none",
        marginBottom: 12,
        boxSizing: "border-box"
      }
    }
  ), /* @__PURE__ */ React.createElement("div", { style: { background: "#DCF8C6", borderRadius: "12px 12px 12px 0", padding: "12px 14px", marginBottom: 6 } }, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13, color: "#111", margin: 0, lineHeight: 1.5 } }, /* @__PURE__ */ React.createElement("strong", null, greeting, " "), "Du bist eingeladen zum ", motto.name, "-Geburtstag!"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 11, color: "var(--a)", margin: "6px 0 0", fontWeight: 600 } }, "\u{1F446} Tippe hier f\xFCr dein ", motto.name, "-Abenteuer...")), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 10, opacity: 0.4, margin: "0 0 12px" } }, "So sieht es auf ", displayName, "s Handy aus"), /* @__PURE__ */ React.createElement(
    "a",
    {
      href: `/einladung/erstellen/?motto=${motto?.id || ""}`,
      onClick: () => {
        setInviteSent(guests);
        typeof mlTrack === "function" && mlTrack("cta_einladung_plan", { motto: motto?.id });
      },
      style: {
        display: "block",
        width: "100%",
        background: done ? "var(--g)" : "var(--a)",
        color: "#fff",
        padding: 14,
        borderRadius: 99,
        fontWeight: 700,
        fontSize: 14,
        textAlign: "center",
        textDecoration: "none",
        boxSizing: "border-box",
        transition: "background .3s"
      }
    },
    done ? "\u2713 Einladung erstellt \u2014 bearbeiten \u2192" : `\u{1F48C} ${motto.name}-Einladung erstellen \u2192`
  ), done && /* @__PURE__ */ React.createElement("p", { style: { fontSize: 11, opacity: 0.5, margin: "6px 0 0", textAlign: "center" } }, "\u2713 Score +11% \u2014 Bereitschafts-Check aktualisiert"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "center", gap: 16, marginTop: 10, fontSize: 11, opacity: 0.3 } }, /* @__PURE__ */ React.createElement("span", null, "Kostenlos"), /* @__PURE__ */ React.createElement("span", null, "Kein Account"), /* @__PURE__ */ React.createElement("span", null, "DSGVO-konform"))));
}
function SchnitzeljagdBlock({ age, ag, szActive, setSzActive, szThemeId, setSzThemeId, szTheme, childName, setChildName, mapItems, setMapItems, activeEmoji, setActiveEmoji }) {
  const stations = szTheme ? szTheme.stations[ag] || szTheme.stations.mittel : [];
  const materials = szTheme ? szTheme.material[ag] || szTheme.material.mittel : [];
  const totalDauer = stations.reduce((s, st) => s + st.dauer, 0);
  const nameGen = childName ? childName.endsWith("s") ? childName + "'" : childName + "s" : "";
  const introText = szTheme ? (szTheme.intro[ag] || szTheme.intro.mittel).replace(/\{name\},?\s*/g, childName ? childName + ", " : "") : "";
  const shopItems = szThemeId ? SZ_SHOP_ITEMS[szThemeId] || [] : [];
  function printKomplettpaket() {
    if (!szTheme) return;
    window.plausible && plausible("sz-komplettpaket-gedruckt", { props: { thema: szThemeId } });
    const w = window.open("", "", "width=900,height=700");
    w.document.write(`<html><head><title>Komplettpaket ${szTheme.name}</title>
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=DM+Sans:opsz,wght@9..40,400;9..40,700;9..40,800&display=swap" rel="stylesheet">
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'DM Sans',system-ui,sans-serif;color:#2D2319;background:#FFF}.page{page-break-after:always;padding:32px;min-height:100vh}.page:last-child{page-break-after:auto}h1{font-size:22px;font-weight:900;margin-bottom:8px}h2{font-size:16px;font-weight:800;color:${szTheme.color};margin:20px 0 10px;border-bottom:2px solid ${szTheme.color}30;padding-bottom:4px}.station{margin-bottom:14px;padding:12px;background:#FAFAF5;border-radius:10px;border:1px solid #EDE6DE}.station-name{font-weight:800;font-size:14px;margin-bottom:4px}.station-desc{font-size:13px;line-height:1.5;color:#5D4037}.hint{font-size:12px;color:#795548;background:#FFF8E1;padding:6px 10px;border-radius:6px;margin-top:6px;border:1px solid #FFE082}.check{display:inline-block;width:14px;height:14px;border:2px solid #A89888;border-radius:3px;margin-right:8px;vertical-align:middle}.hinweis-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.hinweis-card{border:2px dashed ${szTheme.color}80;border-radius:12px;padding:14px;text-align:center;min-height:140px;display:flex;flex-direction:column;justify-content:center}.cert{text-align:center;padding:48px;border:4px double ${szTheme.color};border-radius:16px;position:relative;max-width:600px;margin:0 auto}.cert::before{content:'';position:absolute;inset:8px;border:1px solid ${szTheme.color}40;border-radius:10px}@media print{.page{padding:24px;min-height:auto}}</style></head><body>
${mapItems.length > 0 ? `<div class="page" style="display:flex;flex-direction:column;align-items:center;justify-content:center"><div style="position:relative;width:100%;max-width:700px;aspect-ratio:4/3;background:linear-gradient(145deg,#F5E6C8 0%,#E8D5A8 30%,#DCCB96 60%,#F0E0B8 100%);border:2px solid ${szTheme.color}40;border-radius:16px;overflow:hidden"><div style="position:absolute;top:16px;left:0;right:0;text-align:center;z-index:2;font-family:'Caveat',cursive;font-size:26px;font-weight:700;color:#8B7750">${szTheme.emoji} ${nameGen ? nameGen + " " : ""}${szTheme.name}</div>${mapItems.map((item) => `<span style="position:absolute;left:${item.x}%;top:${item.y}%;font-size:28px;transform:translate(-50%,-50%);z-index:5">${item.emoji}</span>`).join("")}<div style="position:absolute;bottom:12px;right:16px;font-size:11px;color:#A0926C;font-weight:700">N \u2191</div><div style="position:absolute;bottom:10px;left:16px;font-size:9px;color:#A0926C">machsleicht.de</div></div></div>` : ""}
<div class="page"><h1>${szTheme.emoji} ${nameGen ? nameGen + " " : ""}${szTheme.name}</h1><p style="font-size:13px;color:#6B5D52;margin-bottom:12px">${stations.length} Stationen \xB7 ${ageLabel[ag]} \xB7 ca. ${totalDauer} Min.</p><p style="font-size:14px;color:#5D4037;line-height:1.6;font-style:italic;margin-bottom:16px;padding:12px;background:#FAFAF5;border-radius:8px">\u201E${introText}"</p>${stations.map((s, i) => `<div class="station"><div class="station-name">${i === stations.length - 1 ? "\u{1F381}" : i + 1 + "."} ${s.name}</div><div class="station-desc">${s.desc}</div><div class="hint">\u{1F4A1} ${s.hint}</div></div>`).join("")}</div>
<div class="page"><h1>\u2702\uFE0F Hinweis-Zettel zum Ausschneiden</h1><p style="font-size:13px;color:#6B5D52;margin-bottom:16px">Ausschneiden und an den Stationen verstecken.</p><div class="hinweis-grid">${stations.map((s, i) => `<div class="hinweis-card"><div style="font-size:28px;margin-bottom:4px">${i === stations.length - 1 ? "\u{1F381}" : "Station " + (i + 1)}</div><div style="font-size:13px;font-weight:700;margin-bottom:6px">${s.name}</div><div style="font-size:16px;color:#5D4037;font-family:'Caveat',cursive">${i < stations.length - 1 ? "\u2192 Weiter zu: " + stations[i + 1].name : "\u{1F389} Geschafft! Hier ist der Schatz!"}</div></div>`).join("")}</div></div>
<div class="page"><h1>\u{1F4CB} Material-Checkliste</h1><h2>Pro Station</h2><ul style="list-style:none;columns:2">${materials.map((m) => `<li style="font-size:13px;line-height:2"><span class="check"></span>${m}</li>`).join("")}</ul><h2>Schatz-Ideen</h2><ul style="list-style:none;columns:2">${szTheme.schatz.map((s) => `<li style="font-size:13px;line-height:2"><span class="check"></span>${s}</li>`).join("")}</ul></div>
<div class="page" style="display:flex;justify-content:center;align-items:center"><div class="cert"><div style="font-size:56px;margin-bottom:12px">${szTheme.emoji}</div><div style="font-size:28px;font-weight:900;margin-bottom:6px">Urkunde</div><div style="font-size:18px;color:#6B5D52;margin-bottom:24px">${szTheme.name}</div><div style="font-size:32px;font-weight:900;color:${szTheme.color};padding:8px 0;border-bottom:2px solid ${szTheme.color}40;margin-bottom:16px">_______________</div><div style="font-size:15px;color:#6B5D52;line-height:1.6;margin:16px 0">hat die gro\xDFe ${szTheme.name} erfolgreich bestanden!<br>Alle ${stations.length} Stationen gemeistert.</div><div style="display:flex;justify-content:space-between;margin-top:32px;font-size:13px;color:#A89888"><div style="border-top:1px solid #CCC;padding-top:4px;min-width:140px;text-align:center">Datum</div><div style="border-top:1px solid #CCC;padding-top:4px;min-width:140px;text-align:center">Unterschrift</div></div><div style="font-size:10px;color:#A89888;margin-top:16px">machsleicht.de</div></div></div>
</body></html>`);
    w.document.close();
    setTimeout(() => w.print(), 400);
  }
  if (!szActive) return /* @__PURE__ */ React.createElement("section", { className: "fu", style: { marginBottom: 24 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setSzActive(true);
    window.plausible && plausible("sz-activated");
  }, style: {
    width: "100%",
    background: "linear-gradient(135deg,#fef8f0,#fff8e8)",
    borderRadius: 20,
    padding: "24px 20px",
    border: "1px solid #f0ede8",
    display: "flex",
    alignItems: "center",
    gap: 16,
    cursor: "pointer",
    textAlign: "left"
  } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 40, flexShrink: 0 } }, "\u{1F5FA}\uFE0F"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "var(--fd)", fontWeight: 800, fontSize: 17, color: "var(--d)", marginBottom: 4 } }, "+ Schnitzeljagd hinzuf\xFCgen"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--m)", lineHeight: 1.5 } }, "Stationen, R\xE4tsel, Schatzkarte, Hinweis-Zettel \u2014 druckfertig in 5 Min.")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 20, color: "var(--a)", flexShrink: 0 } }, "+")));
  return /* @__PURE__ */ React.createElement("section", { className: "fu", style: { marginBottom: 24 } }, /* @__PURE__ */ React.createElement("div", { style: { borderRadius: 20, border: `2px solid ${szTheme ? szTheme.color + "40" : "var(--a)"}`, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { background: "linear-gradient(135deg,#e8d5b7,#d4bc94)", padding: "16px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 17, fontWeight: 900, color: "var(--d)", margin: "0 0 2px" } }, "\u{1F5FA}\uFE0F Schnitzeljagd ", szTheme ? `\xB7 ${szTheme.name}` : ""), szTheme && /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12, color: "var(--d)", opacity: 0.6, margin: 0 } }, stations.length, " Stationen \xB7 ", ageLabel[ag], " \xB7 ", totalDauer, " Min.")), /* @__PURE__ */ React.createElement("button", { onClick: () => setSzActive(false), style: { background: "rgba(255,255,255,0.5)", border: "none", borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer", color: "var(--d)" } }, "\u2715")), /* @__PURE__ */ React.createElement("div", { style: { padding: "16px 18px", background: "var(--bg)" } }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 16 } }, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12, fontWeight: 700, color: "var(--m)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" } }, "Thema w\xE4hlen"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))", gap: 6 } }, SZ_THEMES.map((t) => /* @__PURE__ */ React.createElement("button", { key: t.id, onClick: () => setSzThemeId(t.id), style: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    padding: "12px 6px 10px",
    background: szThemeId === t.id ? t.color + "12" : "#fff",
    border: `2px solid ${szThemeId === t.id ? t.color : "#eee"}`,
    borderRadius: 12,
    cursor: "pointer",
    transition: "all 0.2s"
  } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 24 } }, t.emoji), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, fontWeight: 600, color: szThemeId === t.id ? t.color : "#666" } }, SZ_LABELS[t.id] || t.name))))), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 16 } }, /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: childName,
      onChange: (e) => setChildName(e.target.value),
      placeholder: "Name des Kindes (optional)",
      style: {
        width: "100%",
        padding: "10px 14px",
        borderRadius: 10,
        border: "1px solid var(--l)",
        fontSize: 13,
        fontFamily: "var(--f)",
        outline: "none",
        background: "#fff",
        boxSizing: "border-box"
      }
    }
  )), szTheme && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { background: `${szTheme.color}08`, borderRadius: 12, padding: "14px 16px", marginBottom: 16, borderLeft: `3px solid ${szTheme.color}` } }, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13, color: "var(--d)", lineHeight: 1.6, margin: 0, fontStyle: "italic" } }, "\u201E", introText, '"'), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 10, color: "var(--m)", marginTop: 6, fontWeight: 600 } }, "\u{1F4A1} Vorlesen, bevor es losgeht")), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 16 } }, stations.map((st, i) => {
    const isLast = i === stations.length - 1;
    return /* @__PURE__ */ React.createElement("details", { key: i, open: i === 0, style: { marginBottom: 6 } }, /* @__PURE__ */ React.createElement("summary", { style: { display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "6px 0", fontSize: 13 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 22, height: 22, borderRadius: "50%", background: isLast ? "var(--a)" : szTheme.color, color: "#fff", fontSize: 9, fontWeight: 800, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } }, isLast ? "\u{1F381}" : i + 1), /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 700, flex: 1 } }, st.name), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: "var(--m)" } }, st.dauer, "\u2032")), /* @__PURE__ */ React.createElement("div", { style: { paddingLeft: 30, paddingBottom: 6 } }, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12, color: "var(--m)", lineHeight: 1.5, margin: "4px 0 6px" } }, st.desc), st.hint && /* @__PURE__ */ React.createElement("p", { style: { fontSize: 11, color: "#795548", background: "#FFF8E1", padding: "6px 10px", borderRadius: 6, border: "1px solid #FFE082" } }, "\u{1F4A1} ", st.hint)));
  })), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 16 } }, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12, fontWeight: 700, color: "var(--m)", marginBottom: 6 } }, "\u{1F5FA}\uFE0F Schatzkarte"), /* @__PURE__ */ React.createElement("div", { className: "no-print", style: { display: "flex", gap: 3, flexWrap: "wrap", marginBottom: 6 } }, (szTheme.emoji === "\u{1F3F4}\u200D\u2620\uFE0F" ? ["\u{1F3F4}\u200D\u2620\uFE0F", "\u{1F480}", "\u2693", "\u{1F5DD}\uFE0F", "\u{1F48E}", "\u{1F99C}", "\u{1F9ED}", "\u{1F4B0}", "\u{1F3DD}\uFE0F"] : szTheme.emoji === "\u{1F981}" ? ["\u{1F981}", "\u{1F412}", "\u{1F98E}", "\u{1F40A}", "\u{1F334}", "\u{1F33A}", "\u{1F98B}", "\u{1F40D}", "\u{1F33F}"] : szTheme.emoji === "\u{1F680}" ? ["\u{1F680}", "\u2B50", "\u{1F319}", "\u{1F6F8}", "\u{1F47D}", "\u2604\uFE0F", "\u{1F52D}", "\u{1F6F0}\uFE0F", "\u{1F30C}"] : szTheme.emoji === "\u{1F50D}" ? ["\u{1F50D}", "\u{1F575}\uFE0F", "\u{1F4CB}", "\u{1F5DD}\uFE0F", "\u{1F4A1}", "\u{1F526}", "\u{1F463}", "\u{1F4CD}", "\u{1F510}"] : szTheme.emoji === "\u{1F995}" ? ["\u{1F995}", "\u{1F996}", "\u{1F30B}", "\u{1F9B4}", "\u{1FAA8}", "\u{1F33F}", "\u{1F95A}", "\u{1F525}", "\u{1F48E}"] : ["\u{1F9DA}", "\u2728", "\u{1F338}", "\u{1F98B}", "\u{1F308}", "\u{1F344}", "\u{1F4AB}", "\u{1FA84}", "\u{1F451}"]).concat(["\u{1F4CD}", "\u{1F6A9}", "\u2460", "\u2461", "\u2462", "\u2463", "\u2464", "\u{1F381}"]).map((emoji, i) => /* @__PURE__ */ React.createElement("button", { key: i, onClick: () => setActiveEmoji(activeEmoji === emoji ? null : emoji), style: {
    width: 32,
    height: 32,
    borderRadius: 6,
    fontSize: 16,
    cursor: "pointer",
    border: activeEmoji === emoji ? "2px solid var(--a)" : "1px solid var(--l)",
    background: activeEmoji === emoji ? "var(--al)" : "#fff",
    transform: activeEmoji === emoji ? "scale(1.15)" : "scale(1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.15s"
  } }, emoji))), /* @__PURE__ */ React.createElement("div", { onClick: (e) => {
    if (!activeEmoji) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = parseFloat(((e.clientX - rect.left) / rect.width * 100).toFixed(1));
    const y = parseFloat(((e.clientY - rect.top) / rect.height * 100).toFixed(1));
    if (y < 12) return;
    setMapItems((prev) => [...prev, { emoji: activeEmoji, x, y }]);
  }, style: {
    position: "relative",
    width: "100%",
    aspectRatio: "4/3",
    borderRadius: 12,
    overflow: "hidden",
    background: "linear-gradient(145deg,#F5E6C8 0%,#E8D5A8 30%,#DCCB96 60%,#F0E0B8 100%)",
    border: `1px solid ${szTheme.color}30`,
    cursor: activeEmoji ? "crosshair" : "default",
    boxShadow: activeEmoji ? `inset 0 0 0 2px ${szTheme.color}30` : "none"
  } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: 8, left: 0, right: 0, textAlign: "center", zIndex: 2, pointerEvents: "none" } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "'Caveat',cursive", fontSize: 18, fontWeight: 700, color: "#8B7750" } }, szTheme.emoji, " ", nameGen ? nameGen + " " : "", szTheme.name)), mapItems.map((item, i) => /* @__PURE__ */ React.createElement("span", { key: i, onClick: (e) => {
    e.stopPropagation();
    setMapItems((prev) => prev.filter((_, j) => j !== i));
  }, style: {
    position: "absolute",
    left: item.x + "%",
    top: item.y + "%",
    fontSize: 22,
    cursor: "pointer",
    transform: "translate(-50%,-50%)",
    userSelect: "none",
    zIndex: 5,
    filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))"
  } }, item.emoji)), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", bottom: 6, right: 8, fontSize: 9, color: "#A0926C", fontWeight: 700, pointerEvents: "none" } }, "N \u2191"), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", bottom: 4, left: 8, fontSize: 8, color: "#A0926C", pointerEvents: "none" } }, "machsleicht.de")), mapItems.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "no-print", style: { display: "flex", gap: 6, marginTop: 6 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setMapItems((prev) => prev.slice(0, -1)), style: { flex: 1, padding: 6, fontSize: 11, fontWeight: 600, border: "1px solid var(--l)", borderRadius: 8, background: "var(--bg)", color: "var(--m)", cursor: "pointer" } }, "\u21A9\uFE0F R\xFCckg\xE4ngig"), /* @__PURE__ */ React.createElement("button", { onClick: () => setMapItems([]), style: { flex: 1, padding: 6, fontSize: 11, fontWeight: 600, border: "1px solid var(--l)", borderRadius: 8, background: "var(--bg)", color: "#C62828", cursor: "pointer" } }, "\u{1F5D1}\uFE0F L\xF6schen"))), /* @__PURE__ */ React.createElement("details", { style: { marginBottom: 16 } }, /* @__PURE__ */ React.createElement("summary", { style: { fontSize: 13, fontWeight: 700, color: "var(--a)", cursor: "pointer", padding: "6px 0" } }, "\u{1F4E6} Material-Checkliste (", materials.length, " Posten)"), /* @__PURE__ */ React.createElement("div", { style: { paddingTop: 8, display: "flex", flexDirection: "column", gap: 4 } }, materials.map((mat, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", background: "#fff", borderRadius: 8, border: "1px solid var(--l)", fontSize: 12 } }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", style: { width: 14, height: 14, accentColor: "var(--g)" } }), /* @__PURE__ */ React.createElement("span", null, mat))), szTheme.schatz.map((s, i) => /* @__PURE__ */ React.createElement("div", { key: "s" + i, style: { display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", background: "#fff", borderRadius: 8, border: "1px solid var(--l)", fontSize: 12 } }, /* @__PURE__ */ React.createElement("span", null, "\u{1F381}"), /* @__PURE__ */ React.createElement("span", { style: { flex: 1 } }, s), SZ_SCHATZ_LINKS[s] && /* @__PURE__ */ React.createElement("a", { href: SZ_SCHATZ_LINKS[s], target: "_blank", rel: "noopener", style: { fontSize: 10, fontWeight: 700, color: "#FF9900", textDecoration: "none", padding: "2px 6px", borderRadius: 4, background: "#FFF3E0" } }, "Amazon \u2197"))))), /* @__PURE__ */ React.createElement("button", { onClick: printKomplettpaket, className: "no-print", style: {
    width: "100%",
    padding: "12px 20px",
    background: szTheme.color,
    color: "#fff",
    border: "none",
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: `0 2px 12px ${szTheme.color}30`
  } }, "\u{1F5A8}\uFE0F Schnitzeljagd-Paket drucken"), /* @__PURE__ */ React.createElement("p", { className: "no-print", style: { fontSize: 10, color: "var(--m)", marginTop: 4, textAlign: "center" } }, "Schatzkarte \xB7 Stationen \xB7 Hinweis-Zettel \xB7 Material \xB7 Urkunde")), !szTheme && /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13, color: "var(--m)", textAlign: "center", padding: "8px 0" } }, "W\xE4hle oben ein Thema um loszulegen."))));
}
function Zeitplan({ timeline, mottoColor, quietMode, setQuietMode, ageGroupLabel }) {
  return /* @__PURE__ */ React.createElement("section", { className: "fu", style: { marginBottom: 24 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 8 } }, /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "var(--fd)", fontSize: 20, fontWeight: 800, margin: 0 } }, "\u{1F3AF} Zeitplan ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 500, color: "var(--m)" } }, "(", ageGroupLabel, ")")), /* @__PURE__ */ React.createElement("button", { onClick: () => setQuietMode(!quietMode), style: {
    padding: "6px 14px",
    borderRadius: 99,
    border: `2px solid ${quietMode ? "var(--g)" : "var(--l)"}`,
    background: quietMode ? "#E8F5E9" : "var(--bg)",
    color: quietMode ? "var(--g)" : "var(--m)",
    fontSize: 12,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all .2s"
  } }, quietMode ? "\u{1F9D8} Ruhige Spiele aktiv" : "\u{1F32A}\uFE0F Zu wild? Ruhige Spiele")), quietMode && /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13, color: "var(--g)", marginBottom: 12, padding: "8px 12px", background: "#E8F5E9", borderRadius: 10 } }, "\u{1F9D8} Ruhemodus: Alle Action-Spiele wurden durch ruhige Alternativen ersetzt. Kinder kommen runter, du beh\xE4ltst die Kontrolle."), /* @__PURE__ */ React.createElement("div", { style: { paddingLeft: 20, position: "relative" } }, timeline.map((e, n) => /* @__PURE__ */ React.createElement("details", { key: n, open: n === 0, style: { position: "relative", paddingLeft: 24, paddingBottom: 4, marginBottom: 8 } }, /* @__PURE__ */ React.createElement("summary", { style: { display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "8px 0" } }, /* @__PURE__ */ React.createElement("div", { style: {
    position: "absolute",
    left: -3,
    top: 10,
    width: 16,
    height: 16,
    borderRadius: "50%",
    background: e.photo ? "#F57C00" : mottoColor,
    color: "#FFF",
    fontSize: 8,
    fontWeight: 800,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  } }, e.photo ? "\u{1F4F8}" : n + 1), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: 700, color: e.photo ? "#F57C00" : mottoColor } }, e.time), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, fontWeight: 700, marginLeft: 8, color: "var(--d)" } }, e.name)), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: "var(--m)", whiteSpace: "nowrap", flexShrink: 0 } }, e.dauer, " Min.")), /* @__PURE__ */ React.createElement("div", { style: { padding: "4px 0 8px", borderLeft: `2px solid ${mottoColor}20`, marginLeft: 5, paddingLeft: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "var(--m)", marginBottom: 6, lineHeight: 1.6 } }, e.desc), e.photo && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#F57C00", fontWeight: 600, marginBottom: 6 } }, "\u{1F4F8} Foto-Moment!"), e.material && /* @__PURE__ */ React.createElement("details", { style: { marginTop: 4 } }, /* @__PURE__ */ React.createElement("summary", { style: { fontSize: 12, fontWeight: 700, color: "var(--a)", cursor: "pointer" } }, "\u{1F4E6} Material-Liste"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--m)", marginTop: 4, padding: "8px 12px", background: "var(--bg)", borderRadius: 8, lineHeight: 1.6 } }, e.material)), e.anleitung && /* @__PURE__ */ React.createElement("details", { style: { marginTop: 4 } }, /* @__PURE__ */ React.createElement("summary", { style: { fontSize: 12, fontWeight: 700, color: "var(--a)", cursor: "pointer" } }, "\u{1F4CB} So geht's \u2014 Schritt f\xFCr Schritt"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--m)", marginTop: 4, padding: "8px 12px", background: "var(--bg)", borderRadius: 8, lineHeight: 1.8 } }, e.anleitung)), e.isKuchen && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8 } }, e.rezept && /* @__PURE__ */ React.createElement("details", { style: { marginBottom: 6 } }, /* @__PURE__ */ React.createElement("summary", { style: { fontSize: 12, fontWeight: 700, color: "var(--a)", cursor: "pointer" } }, "\u{1F469}\u200D\u{1F373} Rezept anzeigen"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--m)", marginTop: 4, padding: "8px 12px", background: "var(--bg)", borderRadius: 8, lineHeight: 1.6, border: "1px solid var(--l)" } }, e.rezept)), e.kuchenUrl && /* @__PURE__ */ React.createElement("a", { href: e.kuchenUrl, target: "_blank", rel: "noopener", style: {
    display: "inline-block",
    fontSize: 12,
    fontWeight: 700,
    color: "#FF9900",
    textDecoration: "none",
    padding: "6px 14px",
    borderRadius: 8,
    background: "#FFF3E0",
    marginBottom: 6
  } }, "\u{1F6D2} Backdeko bei Amazon \u2192"), /* @__PURE__ */ React.createElement("div", { style: { padding: "10px 12px", background: "var(--bg)", borderRadius: 10, border: "1px solid var(--l)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "var(--a)", marginBottom: 4 } }, "\u23F1\uFE0F Keine Zeit zum Backen?"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--m)", lineHeight: 1.5 } }, "1) Fertigkuchen + Zuckerguss + Streusel \xB7 2) Backmischung-Muffins (30 Min.) \xB7 3) Donut-Turm statt Torte \u2014 Wow-Effekt, null Aufwand"))))))));
}
function ScoreCheck({ score }) {
  if (!score) return null;
  const n = score.avg >= 80 ? "var(--g)" : score.avg >= 60 ? "var(--am)" : "#C62828";
  const h = score.avg >= 85 ? "Fast fertig \u2014 du bist bereit!" : score.avg >= 70 ? "Sieht gut aus \u2014 ein paar Kleinigkeiten fehlen noch." : score.avg >= 55 ? "Gute Basis \u2014 ein paar Dinge solltest du noch kl\xE4ren." : "Noch etwas Vorbereitung n\xF6tig.";
  return /* @__PURE__ */ React.createElement("section", { className: "fu", style: { marginBottom: 24 } }, /* @__PURE__ */ React.createElement("div", { style: { background: "var(--bg)", borderRadius: 20, padding: "24px 20px", border: "1px solid var(--l)" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 20, marginBottom: 16, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "relative", width: 80, height: 80, flexShrink: 0 } }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 36 36", style: { width: 80, height: 80, transform: "rotate(-90deg)" } }, /* @__PURE__ */ React.createElement("circle", { cx: "18", cy: "18", r: "15.9", fill: "none", stroke: "#f0ede8", strokeWidth: "3" }), /* @__PURE__ */ React.createElement(
    "circle",
    {
      cx: "18",
      cy: "18",
      r: "15.9",
      fill: "none",
      stroke: n,
      strokeWidth: "3",
      strokeDasharray: `${score.avg} ${100 - score.avg}`,
      strokeLinecap: "round",
      style: { transition: "stroke-dasharray 0.8s ease" }
    }
  )), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--fd)", fontSize: 22, fontWeight: 900, color: n } }, score.avg), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 8, color: "var(--m)", fontWeight: 600 } }, "von 100"))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "var(--fd)", fontSize: 18, fontWeight: 800, margin: "0 0 4px" } }, "Bereitschafts-Check"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13, color: "var(--m)", lineHeight: 1.5, margin: 0 } }, h), score.missing.length > 0 && /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12, color: "var(--am)", marginTop: 4, fontWeight: 600 } }, "Noch offen: ", score.missing.join(", ")))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 } }, score.dims.map((dim, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { background: "var(--w)", borderRadius: 10, padding: "8px 10px", textAlign: "center", border: "1px solid var(--l)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, marginBottom: 2 } }, dim.icon), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--m)", marginBottom: 2 } }, dim.label), /* @__PURE__ */ React.createElement("div", { style: { height: 4, borderRadius: 2, background: "#f0ede8", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: {
    height: "100%",
    borderRadius: 2,
    width: dim.val + "%",
    transition: "width 0.6s ease",
    background: dim.val >= 80 ? "var(--g)" : dim.val >= 60 ? "var(--am)" : "#C62828"
  } })))))));
}
function App() {
  const [view, setView] = useState("config");
  const [age, setAge] = useState(() => loadState("age", 6));
  const [mottoId, setMottoId] = useState(() => loadState("mottoId", null));
  const [guests, setGuests] = useState(() => loadState("guests", 8));
  const [loc, setLoc] = useState(() => loadState("loc", "garten"));
  const [effort, setEffort] = useState(() => loadState("effort", "normal"));
  const [duration, setDuration] = useState(() => loadState("dauer", 3));
  const [mottoTab, setMottoTab] = useState("generic");
  const [quietMode, setQuietMode] = useState(false);
  const [owned, setOwned] = useState(() => loadState("owned", {}));
  const [shoppingMode, setShoppingMode] = useState(() => loadState("shoppingMode", "standard"));
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [locOverride, setLocOverride] = useState(null);
  const [emailSaved, setEmailSaved] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [inviteSent, setInviteSent] = useState(0);
  const [previewName, setPreviewName] = useState("");
  const [szActive, setSzActive] = useState(() => loadState("szActive", false));
  const [szThemeId, setSzThemeId] = useState(() => loadState("szThemeId", null));
  const [childName, setChildName] = useState(() => loadState("childName", ""));
  const [mapItems, setMapItems] = useState(() => loadState("mapItems", []));
  const [activeEmoji, setActiveEmoji] = useState(null);
  const motto = ALL_MOTTOS.find((m) => m.id === mottoId);
  const ag = ageGroup(age);
  const isMinimal = shoppingMode === "minimal" || effort === "minimal";
  const isWow = shoppingMode === "wow";
  const effectiveLoc = locOverride || loc;
  const filteredLicense = LICENSE.filter((m) => !m.ages || m.ages.includes(age));
  const szTheme = SZ_THEMES.find((t) => t.id === szThemeId);
  useEffect(() => saveState("age", age), [age]);
  useEffect(() => saveState("mottoId", mottoId), [mottoId]);
  useEffect(() => saveState("guests", guests), [guests]);
  useEffect(() => saveState("loc", loc), [loc]);
  useEffect(() => saveState("effort", effort), [effort]);
  useEffect(() => saveState("dauer", duration), [duration]);
  useEffect(() => saveState("owned", owned), [owned]);
  useEffect(() => saveState("shoppingMode", shoppingMode), [shoppingMode]);
  useEffect(() => saveState("szActive", szActive), [szActive]);
  useEffect(() => saveState("szThemeId", szThemeId), [szThemeId]);
  useEffect(() => saveState("childName", childName), [childName]);
  useEffect(() => saveState("mapItems", mapItems), [mapItems]);
  useEffect(() => {
    const el = document.getElementById("sticky-cta");
    if (el) el.style.display = view === "plan" || view === "peak" ? "none" : "";
  }, [view]);
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const m = p.get("motto") || window.__selectedMotto;
    if (m && ALL_MOTTOS.find((x) => x.id === m)) setMottoId(m);
    const a = p.get("alter");
    if (a) {
      const v = parseInt(a);
      if (v >= 3 && v <= 12) setAge(v);
    }
    const g = p.get("gaeste");
    if (g) {
      const v = parseInt(g);
      if (v >= 1 && v <= 20) setGuests(v);
    }
    const modus = p.get("modus");
    if (modus === "schatzsuche") {
      setSzActive(true);
      if (!m && !mottoId) setMottoId("safari");
      setTimeout(() => {
        setView("plan");
        window.scrollTo(0, 0);
      }, 100);
    }
    const thema = p.get("thema");
    if (thema && SZ_THEMES.find((t) => t.id === thema)) setSzThemeId(thema);
  }, []);
  useEffect(() => {
    if (mottoId) {
      setShowConfetti(true);
      const t = setTimeout(() => setShowConfetti(false), 1200);
      return () => clearTimeout(t);
    }
  }, [mottoId]);
  useEffect(() => {
    if (view === "plan" && window.plausible) plausible("plan-created", { props: { motto: mottoId, alter: age, gaeste: guests, szActive, thema: szThemeId } });
  }, [mottoId, view]);
  const quietGames = {
    klein: [
      { name: "Ausmalen & Stickern", desc: "Gro\xDFe Ausmalbilder zum Thema + Sticker-B\xF6gen.", dauer: 15 },
      { name: "Suchbild-Runde", desc: "Wimmelbild zum Thema \u2014 wer findet alle versteckten Dinge?", dauer: 10 },
      { name: "Geschichte vorlesen", desc: "Eine kurze Geschichte zum Motto vorlesen. Kinder sitzen im Kreis.", dauer: 10 }
    ],
    mittel: [
      { name: "R\xE4tsel-Runde", desc: "Knobel-Aufgaben, Suchbilder und Quiz-Fragen zum Thema.", dauer: 15 },
      { name: "Bastel-Station", desc: "Etwas zum Motto basteln: Masken, Karten, Figuren.", dauer: 20 },
      { name: "Memory oder Bingo", desc: "Motto-Memory oder Bingo-Runde.", dauer: 15 }
    ],
    gross: [
      { name: "Quiz-Duell", desc: "Wissensfragen zum Thema in Teams.", dauer: 15 },
      { name: "Kreativ-Challenge", desc: "Zeichne/baue etwas zum Motto in 10 Minuten.", dauer: 20 },
      { name: "R\xE4tsel-Escape (leise)", desc: "Logik-R\xE4tsel, Codes knacken, Geheimschrift \u2014 am Tisch.", dauer: 25 }
    ]
  };
  function getGames() {
    if (!motto) return [];
    if (quietMode) return quietGames[ag] || quietGames.mittel;
    return motto.spiele?.[ag] || motto.spiele?.mittel || [];
  }
  function getCake() {
    if (!motto) return { name: "", desc: "", rezept: "", url: "" };
    const c = motto.kuchen?.[ag] || motto.kuchen?.mittel || "";
    return typeof c === "string" ? { name: c, desc: c, rezept: "", url: "" } : c;
  }
  function buildTimeline() {
    const games = getGames();
    const numGames = duration <= 2 ? 2 : 3;
    const selectedGames = games.slice(0, numGames);
    const items = [];
    let elapsed = 0;
    const start = 840;
    const fmt = (m) => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`;
    items.push({ time: fmt(start), name: "Ankommen & Freispiel", dauer: ag === "klein" ? 20 : 15, desc: ag === "klein" ? "Kinder kommen an, gew\xF6hnen sich ein" : "Kinder kommen an, spielen frei" });
    elapsed += ag === "klein" ? 20 : 15;
    selectedGames.forEach((g, i) => {
      items.push({ time: fmt(start + elapsed), name: g.name, dauer: g.dauer, desc: g.desc, material: g.material || null, anleitung: g.anleitung || null });
      elapsed += g.dauer;
      if (i === 0) {
        const cake = getCake();
        items.push({
          time: fmt(start + elapsed),
          name: `\u{1F382} ${cake.name || "Kuchen"} & Geschenke`,
          dauer: ag === "klein" ? 25 : 30,
          desc: cake.desc || "",
          rezept: cake.rezept || "",
          kuchenUrl: cake.url || "",
          photo: true,
          isKuchen: true
        });
        elapsed += ag === "klein" ? 25 : 30;
      }
    });
    items.push({ time: fmt(start + elapsed), name: "\u{1F4F8} Gruppenfoto!", dauer: 5, desc: "Jetzt! Bevor die ersten abgeholt werden.", photo: true });
    elapsed += 5;
    items.push({ time: fmt(start + elapsed), name: "Mitgebsel & Tsch\xFCss!", dauer: 15, desc: "Mitgebsel-T\xFCten verteilen. Eltern holen ab." });
    return items;
  }
  function getDeko() {
    if (!motto) return { deko: [], mitgebsel: [], total: 0 };
    const deko = isMinimal ? motto.dekoMin || [] : motto.deko;
    const mitgebsel = motto.mitgebsel || [];
    const wowExtras = isWow ? [
      { name: "Foto-Hintergrund " + motto.name, price: 14.99, eco: false, bbl: "buy", emoji: "\u{1F4F8}", url: "https://www.amazon.de/s?k=" + encodeURIComponent(motto.name + " foto hintergrund party kinder") + "&tag=machsleicht21-21" },
      { name: "LED-Lichterkette Deko", price: 9.99, eco: false, bbl: "buy", emoji: "\u2728", url: "https://www.amazon.de/s?k=led+lichterkette+party+deko+kinder&tag=machsleicht21-21" }
    ] : [];
    const allDeko = [...deko, ...wowExtras];
    const total = [...allDeko, ...mitgebsel].reduce((sum, item, i) => sum + (owned[i] ? 0 : item.price), 0);
    return { deko: allDeko, mitgebsel, total };
  }
  function getSnacks() {
    return [
      { name: "Muffins/Kuchen", menge: `${Math.ceil(guests * 1.5)} St\xFCck`, emoji: "\u{1F9C1}" },
      { name: "Obst (geschnitten)", menge: `${Math.ceil(guests * 0.15)} kg`, emoji: "\u{1F34E}" },
      { name: "Saft/Wasser", menge: `${Math.ceil(guests * 0.3 * duration)} Liter`, emoji: "\u{1F9C3}" },
      { name: "Salzige Snacks", menge: `${Math.ceil(guests / 4)} T\xFCten`, emoji: "\u{1F968}" },
      ...duration >= 3 ? [{ name: "Belegte Brote/W\xFCrstchen", menge: `${Math.ceil(guests * 1.2)} St\xFCck`, emoji: "\u{1F32D}" }] : []
    ];
  }
  function calcScore() {
    if (!motto) return null;
    const { deko, mitgebsel, total } = getDeko();
    const allItems = [...deko, ...mitgebsel];
    const ownedCount = Object.values(owned).filter(Boolean).length;
    const ablauf = 100;
    const machbarkeit = duration <= 2 ? 95 : duration <= 3 ? 85 : 75;
    const material = allItems.length > 0 ? Math.min(100, Math.round(ownedCount / allItems.length * 100) + 30) : 80;
    const wetterfest = effectiveLoc === "wohnung" ? 100 : effectiveLoc === "garten" ? 65 : 40;
    const budget = total < guests * 5 ? 100 : total < guests * 10 ? 75 : 50;
    const mottoErlebnis = isWow ? 95 : isMinimal ? 55 : 80;
    const inviteBonus = inviteSent >= guests ? 11 : inviteSent > 0 ? Math.round(inviteSent / guests * 11) : 0;
    const avg = Math.min(100, Math.round((ablauf + machbarkeit + material + wetterfest + budget + mottoErlebnis) / 6) + inviteBonus);
    const missing = [];
    if (wetterfest < 70) missing.push("Regen-Alternative");
    if (material < 60) missing.push("Material einkaufen");
    if (budget < 60) missing.push("Budget pr\xFCfen");
    if (inviteSent === 0) missing.push("Einladungen verschicken");
    return {
      avg,
      missing,
      dims: [
        { label: "Ablauf", val: ablauf, icon: "\u{1F4CB}" },
        { label: "Machbarkeit", val: machbarkeit, icon: "\u2705" },
        { label: "Material", val: material, icon: "\u{1F4E6}" },
        { label: "Wetterfest", val: wetterfest, icon: "\u{1F327}\uFE0F" },
        { label: "Budget", val: budget, icon: "\u{1F4B0}" },
        { label: "Motto-Erlebnis", val: mottoErlebnis, icon: "\u{1F3AF}" },
        { label: "Einladung", val: inviteSent >= guests ? 100 : Math.round(inviteSent / guests * 100), icon: "\u{1F48C}" }
      ]
    };
  }
  function reset() {
    setView("config");
    setMottoId(null);
    setSzActive(false);
    setSzThemeId(null);
    setChildName("");
    setMapItems([]);
    setActiveEmoji(null);
    setQuietMode(false);
    setOwned({});
    setShoppingMode("standard");
    setLocOverride(null);
    setEmergencyMode(false);
  }
  function startPlan() {
    if (mottoId) {
      setView("peak");
      window.scrollTo(0, 0);
      setTimeout(() => {
        setView("plan");
        window.scrollTo(0, 0);
      }, 2800);
    }
  }
  function emergencyStart() {
    setEmergencyMode(true);
    if (!mottoId) setMottoId("safari");
    setEffort("minimal");
    setShoppingMode("minimal");
    setDuration(2);
    setLocOverride("wohnung");
    setView("plan");
    window.scrollTo(0, 0);
  }
  function toggleOwned(idx) {
    setOwned((prev) => ({ ...prev, [idx]: !prev[idx] }));
  }
  const mottoDescs = {
    safari: "Dein Kind und seine Crew gehen auf Safari-Expedition: Tiere suchen, durch den Dschungel krabbeln und am Ende den Schatz finden!",
    piraten: "Ahoi! Die Crew sticht in See, knackt Codes und findet den vergrabenen Piratenschatz. Das wird legend\xE4r!",
    weltraum: "3, 2, 1 ... Start! Die Astronauten fliegen durchs All, entdecken Planeten und landen sicher auf dem Mond.",
    dino: "Achtung, Dinos! Ausgraben, forschen und am Ende jubeln \u2014 dein Kind wird zum echten Pal\xE4ontologen.",
    einhorn: "Glitzer, Regenbogen und pure Magie \u2014 dein Kind und seine Freunde tauchen ein in eine zauberhafte Welt.",
    feuerwehr: "Tat\xFCtata! Die kleine Feuerwehr-Crew meistert jeden Einsatz. Teamwork, Action und strahlende Kinderaugen.",
    "paw-patrol": "Ryder ruft an! Die Welpen brauchen Hilfe \u2014 und dein Kind und seine Freunde retten den Tag!",
    pokemon: "Die Pok\xE9mon-Trainer-Pr\xFCfung beginnt! Fangen, k\xE4mpfen, Orden sammeln \u2014 wer wird Pok\xE9mon-Meister?",
    minecraft: "Creeper besiegen, Erze abbauen, den Enderdrachen bezwingen \u2014 Survival-Modus: aktiviert!",
    frozen: "Elsa braucht Hilfe! Schneezauber, Eispalast und magische Momente warten auf die kleine Crew.",
    mario: "M\xFCnzen sammeln, Bowser besiegen, Prinzessin retten \u2014 es wird ein Super-Mario-Tag!",
    spiderman: "Spinnennetze spannen, B\xF6sewichte fangen, die Stadt retten \u2014 dein Kind wird zum Superhelden!",
    "harry-potter": "Der Hogwarts-Brief ist da! Zauberst\xE4be, Zaubertr\xE4nke und magische Pr\xFCfungen warten.",
    ninjago: "Die Ninja-Ausbildung beginnt! Geschicklichkeit, Weisheit und Spinjitzu \u2014 wer wird Meister?"
  };
  if (view === "peak" && motto) return /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 660, margin: "0 auto", padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "80vh" } }, /* @__PURE__ */ React.createElement("div", { className: "sp", style: { textAlign: "center", padding: "40px 20px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 72, marginBottom: 16, animation: "scalePop .6s ease both" } }, motto.emoji), /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: "var(--fd)", fontSize: "clamp(24px,5vw,32px)", fontWeight: 900, marginBottom: 12, color: "var(--d)" } }, "Deine ", /* @__PURE__ */ React.createElement("span", { style: { color: motto.color } }, motto.name), "-Party!"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 16, color: "var(--m)", lineHeight: 1.6, maxWidth: 400, margin: "0 auto 24px" } }, mottoDescs[mottoId] || "Das wird ein unvergesslicher Tag!"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap", marginBottom: 24 } }, /* @__PURE__ */ React.createElement("div", { style: { background: "var(--bg)", borderRadius: 12, padding: "12px 16px", border: "1px solid var(--l)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--m)" } }, guests, " Kinder"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "var(--fd)", fontSize: 18, fontWeight: 800, color: "var(--a)" } }, duration, " Std. Spa\xDF")), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--bg)", borderRadius: 12, padding: "12px 16px", border: "1px solid var(--l)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--m)" } }, "Altersgerechte Spiele"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "var(--fd)", fontSize: 18, fontWeight: 800, color: "var(--a)" } }, ageLabel[ag]))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "var(--m)", animation: "pulse 1.5s ease infinite" } }, "Plan wird erstellt..."), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setView("plan");
    window.scrollTo(0, 0);
  }, style: { marginTop: 16, background: "none", border: "none", fontSize: 12, color: "var(--m)", cursor: "pointer", textDecoration: "underline" } }, "Direkt zum Plan \u2192")));
  if (view === "plan" && motto) {
    const timeline = buildTimeline();
    const { deko, mitgebsel, total } = getDeko();
    const costPerKid = guests > 0 ? (total / guests).toFixed(2) : "0";
    const score = calcScore();
    const snacks = getSnacks();
    const shareText = `Hey! Unser Kind feiert ${motto.name}-Geburtstag. Hier ist der komplette Plan mit Spielen und Einkaufsliste:
https://machsleicht.de`;
    const locLabel = effectiveLoc === "wohnung" ? "Drinnen" : effectiveLoc === "garten" ? "Garten" : "Park";
    return /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 660, margin: "0 auto", padding: "0 16px 80px" } }, /* @__PURE__ */ React.createElement("header", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0 18px", position: "sticky", top: 0, background: "var(--w)", zIndex: 10, borderBottom: "1px solid var(--l)" } }, /* @__PURE__ */ React.createElement("a", { href: "/", style: { textDecoration: "none" } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--fd)", fontSize: 22, fontWeight: 900, color: "var(--d)" } }, "mach's"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--fd)", fontSize: 22, fontWeight: 900, color: "var(--a)" } }, "leicht")), /* @__PURE__ */ React.createElement("button", { onClick: reset, style: { background: "none", border: "1px solid var(--l)", borderRadius: "var(--rs)", padding: "6px 14px", fontSize: 12, color: "var(--m)", cursor: "pointer" } }, "\u2190 Neu")), /* @__PURE__ */ React.createElement("section", { className: "fu", style: { textAlign: "center", padding: "20px 0 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 48, marginBottom: 8 } }, motto.emoji), /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: "var(--fd)", fontSize: 26, fontWeight: 900, marginBottom: 4 } }, motto.name), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: "var(--m)" } }, guests, " Kinder \xB7 ", age, " Jahre \xB7 ", duration, " Std. \xB7 ", locLabel, isMinimal && /* @__PURE__ */ React.createElement("span", { style: { color: "var(--g)", fontWeight: 600 } }, " \xB7 \u{1F33F} Minimal"), isWow && /* @__PURE__ */ React.createElement("span", { style: { color: "#7B1FA2", fontWeight: 600 } }, " \xB7 \u2728 Wow"), emergencyMode && /* @__PURE__ */ React.createElement("span", { style: { color: "#C62828", fontWeight: 600 } }, " \xB7 \u{1F6A8} Morgen-Modus")), motto.cat === "license" && /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12, color: "var(--a)", marginTop: 4 } }, "Spiele passen zum Thema \u2014 Deko & Mitgebsel sind original ", motto.name, " Produkte.")), /* @__PURE__ */ React.createElement(EinladungBlock, { motto, guests, previewName, setPreviewName, inviteSent, setInviteSent }), /* @__PURE__ */ React.createElement(SchnitzeljagdBlock, { age, ag, szActive, setSzActive, szThemeId, setSzThemeId, szTheme, childName, setChildName, mapItems, setMapItems, activeEmoji, setActiveEmoji }), /* @__PURE__ */ React.createElement(ScoreCheck, { score }), /* @__PURE__ */ React.createElement("section", { className: "fu", style: { marginBottom: 24 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, background: "var(--bg)", borderRadius: 12, padding: 4, border: "1px solid var(--l)" } }, [["minimal", "\u{1F33F}", "Minimal"], ["standard", "\u{1F3AF}", "Standard"], ["wow", "\u2728", "Wow"]].map(([val, ico, label]) => /* @__PURE__ */ React.createElement("button", { key: val, onClick: () => {
      setShoppingMode(val);
      setOwned({});
    }, style: {
      padding: "8px 14px",
      borderRadius: 10,
      border: "none",
      background: shoppingMode === val ? val === "minimal" ? "#E8F5E9" : val === "wow" ? "#EDE7F6" : "var(--al)" : "transparent",
      color: shoppingMode === val ? val === "minimal" ? "var(--g)" : val === "wow" ? "#7B1FA2" : "var(--a)" : "var(--m)",
      fontSize: 12,
      fontWeight: 700,
      cursor: "pointer",
      transition: "all .2s",
      whiteSpace: "nowrap"
    } }, ico, " ", label))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, background: "var(--bg)", borderRadius: 12, padding: 4, border: "1px solid var(--l)" } }, [["wohnung", "\u{1F3E0}", "Drinnen"], ["garten", "\u{1F333}", "Garten"], ["park", "\u{1F3DE}\uFE0F", "Park"]].map(([val, ico, label]) => /* @__PURE__ */ React.createElement("button", { key: val, onClick: () => setLocOverride(val), style: {
      padding: "8px 12px",
      borderRadius: 10,
      border: "none",
      background: effectiveLoc === val ? "#E3F2FD" : "transparent",
      color: effectiveLoc === val ? "#1565C0" : "var(--m)",
      fontSize: 12,
      fontWeight: 700,
      cursor: "pointer",
      transition: "all .2s",
      whiteSpace: "nowrap"
    } }, ico, " ", label))))), /* @__PURE__ */ React.createElement(Zeitplan, { timeline, mottoColor: motto.color, quietMode, setQuietMode, ageGroupLabel: ageLabel[ag] }), /* @__PURE__ */ React.createElement("section", { className: "fu", style: { marginBottom: 24 } }, /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "var(--fd)", fontSize: 20, fontWeight: 800, marginBottom: 12 } }, "\u{1F37F} Was du wirklich an Essen brauchst ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 500, color: "var(--m)" } }, "(f\xFCr ", guests, " Kinder, ", duration, " Std.)")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 8 } }, snacks.map((s, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { background: "var(--bg)", borderRadius: "var(--rs)", padding: "10px 12px", border: "1px solid var(--l)", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, marginBottom: 4 } }, s.emoji), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "var(--d)" } }, s.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 800, color: "var(--a)", marginTop: 2 } }, s.menge))))), /* @__PURE__ */ React.createElement("section", { className: "fu", style: { marginBottom: 24 } }, /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "var(--fd)", fontSize: 20, fontWeight: 800, marginBottom: 4 } }, "\u{1F3A8} Deko, die man wirklich sieht ", motto.cat === "license" && `(${motto.name})`), isMinimal && /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13, color: "var(--g)", marginBottom: 10, fontWeight: 600 } }, "\u{1F33F} Minimal-Modus: Das reicht v\xF6llig."), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 11, color: "var(--m)", marginBottom: 8 } }, '\u2713 Checkbox = "Hab ich schon" \u2014 wird aus Kosten rausgerechnet'), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, deko.map((item, i) => /* @__PURE__ */ React.createElement(ItemRow, { key: i, item, isOwned: owned[i], onToggle: () => toggleOwned(i) })))), /* @__PURE__ */ React.createElement("section", { className: "fu", style: { marginBottom: 24 } }, /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "var(--fd)", fontSize: 20, fontWeight: 800, marginBottom: 12 } }, "\u{1F381} Kleine Mitgebsel, kein unn\xF6tiger Kram"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, mitgebsel.map((item, i) => /* @__PURE__ */ React.createElement(ItemRow, { key: "m" + i, item, isOwned: owned[deko.length + i], onToggle: () => toggleOwned(deko.length + i) })))), /* @__PURE__ */ React.createElement("button", { onClick: () => {
      navigator.share ? navigator.share({ title: `${motto.name} Geburtstag`, text: shareText, url: "https://machsleicht.de" }) : (navigator.clipboard?.writeText(shareText), alert("Kopiert! Einfach in WhatsApp einf\xFCgen."));
    }, style: {
      width: "100%",
      padding: 14,
      background: "#25D366",
      color: "#FFF",
      border: "none",
      borderRadius: "var(--r)",
      fontWeight: 700,
      fontSize: 14,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      marginBottom: 8
    } }, "\u{1F4F1} Plan an Helfer schicken"), /* @__PURE__ */ React.createElement("section", { className: "fu", style: { marginBottom: 24 }, "data-action": "pdf" }, /* @__PURE__ */ React.createElement("div", { style: { background: "linear-gradient(135deg,#EDE7F6,#F3E5F5)", borderRadius: 20, padding: "24px 20px", border: "1px solid #CE93D8", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 36, marginBottom: 8 } }, "\u{1F4C4}"), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "var(--fd)", fontSize: 20, fontWeight: 800, marginBottom: 4 } }, "Plan als PDF speichern"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13, color: "var(--m)", marginBottom: 16 } }, "Zeitplan, Einkaufsliste, Snack-Mengen \u2014 alles auf einem Blatt."), /* @__PURE__ */ React.createElement("button", { onClick: () => window.print(), style: {
      padding: "14px 32px",
      background: "linear-gradient(135deg,#7B1FA2,#9C27B0)",
      color: "#FFF",
      border: "none",
      borderRadius: "var(--r)",
      fontWeight: 700,
      fontSize: 14,
      cursor: "pointer"
    } }, "\u{1F4C4} PDF erstellen & drucken"))), /* @__PURE__ */ React.createElement("div", { className: "sp", style: { background: "linear-gradient(135deg,#1B5E20,#2E7D32,#388E3C)", borderRadius: 24, padding: "48px 24px 40px", textAlign: "center", position: "relative", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "relative", zIndex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 64, marginBottom: 12, animation: "checkPop .6s ease .3s both" } }, "\u2713"), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "var(--fd)", fontSize: "clamp(26px,5vw,34px)", fontWeight: 900, color: "#FFF", marginBottom: 8, lineHeight: 1.1 } }, "Das reicht. Wirklich."), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 16, color: "#C8E6C9", marginBottom: 24, lineHeight: 1.7, maxWidth: 420, margin: "0 auto 24px" } }, "Du musst jetzt nichts mehr optimieren. Dieser Plan funktioniert."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#A5D6A7", textTransform: "uppercase", letterSpacing: "0.08em" } }, "Noch einkaufen"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "var(--fd)", fontSize: 28, fontWeight: 800, color: "#FFF" } }, "ca. \u20AC", Math.round(total))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#A5D6A7", textTransform: "uppercase", letterSpacing: "0.08em" } }, "Pro Kind"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "var(--fd)", fontSize: 28, fontWeight: 800, color: "#F7C948" } }, "ca. \u20AC", guests > 0 ? Math.round(total / guests) : "0"))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#A5D6A7" } }, "Richtwerte \u2014 tats\xE4chliche Preise variieren"))), /* @__PURE__ */ React.createElement("footer", { style: { textAlign: "center", marginTop: 32, padding: "16px 0", borderTop: "1px solid var(--l)" } }, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12, color: "var(--m)" } }, "\xA9 2026 machsleicht.de \xB7 ", /* @__PURE__ */ React.createElement("a", { href: "/impressum", style: { color: "var(--m)", textDecoration: "none" } }, "Impressum"), " \xB7 ", /* @__PURE__ */ React.createElement("a", { href: "/datenschutz", style: { color: "var(--m)", textDecoration: "none" } }, "Datenschutz"), " \xB7 ", /* @__PURE__ */ React.createElement("a", { href: "/transparenz", style: { color: "var(--m)", textDecoration: "none" } }, "Transparenz"))), /* @__PURE__ */ React.createElement(ControlHub, { mottoId, szActive, setSzActive }));
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("nav", { style: { position: "sticky", top: 0, zIndex: 100, background: "rgba(253,252,249,0.85)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: "1px solid rgba(0,0,0,0.05)", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" } }, /* @__PURE__ */ React.createElement("a", { href: "/", style: { textDecoration: "none", display: "flex", alignItems: "baseline", gap: 4 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--fd)", fontWeight: 800, fontSize: 20, color: "var(--a)" } }, "mach's"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--fd)", fontWeight: 800, fontSize: 20, color: "var(--d)" } }, "leicht")), /* @__PURE__ */ React.createElement("a", { href: "/schatzsuche", style: { fontSize: 13, fontWeight: 500, color: "var(--m)", textDecoration: "none" } }, "\u{1F5FA}\uFE0F Schnitzeljagd")), /* @__PURE__ */ React.createElement("section", { style: { position: "relative", overflow: "hidden", padding: "48px 24px 32px", background: "linear-gradient(165deg, #fef8f0 0%, #fdfcf9 40%, #f0f4e8 100%)" } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 660, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "inline-flex", alignItems: "center", gap: 6, background: "#fff", border: "1px solid var(--l)", borderRadius: 100, padding: "6px 16px", fontSize: 12, fontWeight: 500, color: "#888", marginBottom: 20, animation: "fadeSlideUp 0.4s ease-out both" } }, "\u{1F389} Kindergeburtstag planen \u2014 kostenlos, ohne Anmeldung"), /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: "var(--fd)", fontSize: "clamp(28px,5.5vw,48px)", fontWeight: 800, lineHeight: 1.12, marginBottom: 14, color: "var(--d)", animation: "fadeSlideUp 0.5s 0.1s ease-out both" } }, "Kindergeburtstag planen", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--a)" } }, "in 10 Minuten.")), /* @__PURE__ */ React.createElement("p", { style: { fontSize: "clamp(14px,2vw,17px)", color: "var(--m)", lineHeight: 1.6, maxWidth: 500, margin: "0 auto 24px", animation: "fadeSlideUp 0.5s 0.2s ease-out both" } }, "W\xE4hl Alter, Motto und G\xE4stezahl \u2014 du bekommst sofort einen kompletten Plan mit Spielen, Einkaufsliste und Kosten pro Kind."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", animation: "fadeSlideUp 0.5s 0.3s ease-out both" } }, [["\u23F1\uFE0F", "Zeitplan"], ["\u{1F3AF}", "Altersgerechte Spiele"], ["\u{1F6D2}", "Einkaufsliste"], ["\u{1F5FA}\uFE0F", "+ Schnitzeljagd"]].map(([ico, label]) => /* @__PURE__ */ React.createElement("span", { key: label, style: { display: "inline-flex", alignItems: "center", gap: 5, padding: "6px 12px", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)", borderRadius: 100, fontSize: 12, fontWeight: 500, color: "#4a4a4a", border: "1px solid rgba(0,0,0,0.06)" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14 } }, ico), label))))), emergencyMode && /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 700, margin: "16px auto", padding: "0 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { background: "linear-gradient(135deg,#FFEBEE,#FFF3E0)", borderRadius: 20, padding: 24, border: "2px solid #EF5350", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 36, marginBottom: 8 } }, "\u{1F6A8}"), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "var(--fd)", fontSize: 22, fontWeight: 900, color: "#C62828", marginBottom: 8 } }, "Morgen-Modus aktiv"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: "var(--m)", lineHeight: 1.6, marginBottom: 16 } }, "Schnellster Plan der funktioniert. Drinnen, minimal, 2 Stunden."), /* @__PURE__ */ React.createElement("button", { onClick: () => setEmergencyMode(false), style: { background: "none", border: "none", fontSize: 12, color: "var(--m)", cursor: "pointer", textDecoration: "underline" } }, "Morgen-Modus deaktivieren"))), /* @__PURE__ */ React.createElement("div", { id: "wizard", style: { maxWidth: 700, margin: "-16px auto 0", padding: "0 16px", position: "relative", zIndex: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { background: "#fff", borderRadius: 24, padding: "32px 28px 28px", boxShadow: "0 8px 40px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.04)" } }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 24 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#bbb", marginBottom: 10 } }, /* @__PURE__ */ React.createElement("span", { style: { color: "var(--a)", marginRight: 6 } }, "\u2460"), " Wie alt wird dein Kind?", /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--fd)", fontSize: 18, fontWeight: 800, color: "var(--a)", marginLeft: 8 } }, age, " Jahre"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: "var(--m)", fontWeight: 500, marginLeft: 6 } }, "(", ageLabel[ag], ")")), /* @__PURE__ */ React.createElement("input", { type: "range", min: 3, max: 12, value: age, onChange: (e) => {
    setAge(+e.target.value);
    setMottoId(null);
  } }), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12, color: "var(--m)", marginTop: 6 } }, age <= 5 ? "Einfache Suchspiele, Stopptanz, kurze Stationen" : age <= 8 ? "Schatzsuchen, Rallyes, Quiz, Basteln" : "Escape-Rooms, Codes knacken, Team-Olympiaden")), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 24 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#bbb" } }, /* @__PURE__ */ React.createElement("span", { style: { color: "var(--a)", marginRight: 6 } }, "\u2461"), " Motto w\xE4hlen"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4 } }, [["generic", "\u{1F3A8} Klassisch"], ["license", "\u2B50 Charaktere"]].map(([val, label]) => /* @__PURE__ */ React.createElement("button", { key: val, onClick: () => {
    setMottoTab(val);
    setMottoId(null);
  }, style: {
    padding: "4px 10px",
    fontSize: 11,
    fontWeight: 600,
    border: "none",
    borderRadius: 100,
    background: mottoTab === val ? "var(--a)" : "#f0ede8",
    color: mottoTab === val ? "#fff" : "#999",
    cursor: "pointer"
  } }, label)))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, overflowX: "auto", padding: "4px 2px 8px", scrollSnapType: "x mandatory" } }, (mottoTab === "generic" ? GENERIC : filteredLicense).map((m) => /* @__PURE__ */ React.createElement("button", { key: m.id, onClick: () => {
    setMottoId(m.id);
    window.plausible && plausible("motto-selected", { props: { motto: m.id } });
  }, style: {
    position: "relative",
    flex: "0 0 auto",
    minWidth: 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    padding: "18px 12px 14px",
    background: mottoId === m.id ? m.color + "12" : "#fff",
    border: `2px solid ${mottoId === m.id ? m.color : "#eee"}`,
    borderRadius: 16,
    cursor: "pointer",
    transition: "all 0.25s",
    transform: mottoId === m.id ? "scale(1.05)" : "scale(1)",
    boxShadow: mottoId === m.id ? `0 4px 20px ${m.color}30` : "0 1px 4px rgba(0,0,0,0.04)",
    scrollSnapAlign: "start"
  } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 30 } }, m.emoji), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: 600, color: mottoId === m.id ? m.color : "#333" } }, m.name), m.cat === "license" && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, color: mottoId === m.id ? m.color : "#999", background: mottoId === m.id ? m.color + "15" : "#f5f5f5", padding: "2px 8px", borderRadius: 100 } }, m.ages[0], "\u2013", m.ages[m.ages.length - 1], " J."), mottoId === m.id && /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", top: -6, right: -6, width: 20, height: 20, borderRadius: "50%", background: m.color, color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 2px 8px ${m.color}50` } }, "\u2713"))), mottoTab === "license" && filteredLicense.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { padding: 16, color: "var(--m)", fontSize: 13 } }, "F\xFCr ", age, " Jahre keine Lizenz-Mottos verf\xFCgbar."))), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 24 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#bbb", marginBottom: 10 } }, /* @__PURE__ */ React.createElement("span", { style: { color: "var(--a)", marginRight: 6 } }, "\u2462"), " G\xE4stezahl", guests && /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--fd)", fontSize: 18, fontWeight: 800, color: "var(--a)", marginLeft: 8 } }, guests, " Kinder")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" } }, [4, 5, 6, 7, 8, 10, 12, 15].map((n) => /* @__PURE__ */ React.createElement("button", { key: n, onClick: () => setGuests(n), style: {
    width: 48,
    height: 48,
    border: `2px solid ${guests === n ? "var(--a)" : "#f0ede8"}`,
    borderRadius: 14,
    background: guests === n ? "var(--al)" : "#fafaf8",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 16,
    color: guests === n ? "var(--a)" : "#666",
    transition: "all 0.2s"
  } }, n))), age <= 5 && guests > 8 && /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12, color: "var(--a)", marginTop: 6, fontWeight: 600 } }, "\u{1F4A1} F\xFCr ", age, "-J\xE4hrige sind 5\u20138 Kinder ideal.")), /* @__PURE__ */ React.createElement("div", { style: { position: "relative" } }, /* @__PURE__ */ React.createElement(Confetti, { active: showConfetti }), /* @__PURE__ */ React.createElement("button", { onClick: startPlan, disabled: !mottoId, style: {
    width: "100%",
    padding: "16px 24px",
    background: mottoId ? "linear-gradient(135deg,var(--a),#d35f1a)" : "#e8e6e1",
    color: mottoId ? "#FFF" : "#bbb",
    border: "none",
    borderRadius: 16,
    fontSize: 16,
    fontWeight: 700,
    cursor: mottoId ? "pointer" : "default",
    boxShadow: mottoId ? "0 4px 20px rgba(224,122,58,0.35)" : "none",
    animation: mottoId ? "softPulse 2s infinite" : "none",
    transition: "all 0.3s"
  } }, mottoId ? `${motto.emoji} ${motto.name}-Geburtstag planen \u2014 los geht's!` : "W\xE4hl Alter, Motto & G\xE4stezahl"), mottoId && /* @__PURE__ */ React.createElement("p", { style: { textAlign: "center", fontSize: 12, color: "#bbb", marginTop: 8 } }, "Kostenlos \xB7 Ohne Anmeldung \xB7 Sofort loslegen")), /* @__PURE__ */ React.createElement("button", { onClick: emergencyStart, style: {
    width: "100%",
    marginTop: 12,
    padding: 10,
    background: "none",
    color: "#C62828",
    border: "1px solid #C6282840",
    borderRadius: 12,
    fontWeight: 600,
    fontSize: 13,
    cursor: "pointer"
  } }, "\u{1F6A8} Notfallplan in 2 Minuten \u2014 Geburtstag in 48h?"))), /* @__PURE__ */ React.createElement("section", { style: { maxWidth: 700, margin: "40px auto 0", padding: "0 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: 24 } }, /* @__PURE__ */ React.createElement("span", { style: { display: "inline-block", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--a)", background: "var(--al)", padding: "4px 14px", borderRadius: 100, marginBottom: 12 } }, "Alles drin"), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "var(--fd)", fontSize: 24, fontWeight: 800, margin: "0 0 8px" } }, "Was du bekommst"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: "var(--m)" } }, "Ein Plan, der reicht. Wirklich.")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: 12 } }, [
    ["\u{1F4CB}", "Kompletter Zeitplan", "Von Ankommen bis Tsch\xFCss \u2014 mit Uhrzeiten und Puffer."],
    ["\u{1F3AE}", "2\u20133 Spiele mit Anleitung", "Altersgerecht, material-arm, in 5 S\xE4tzen erkl\xE4rt."],
    ["\u{1F6D2}", "Einkaufsliste + Preise", "Kaufen, leihen oder selbst machen. Mit Hab-ich-schon Checkbox."],
    ["\u{1F9EE}", "Kosten pro Kind", "Sofort sichtbar. Im Minimal-Modus unter 5\u20AC pro Kind."],
    ["\u{1F355}", "Snack-Mengen", "8 Kinder, 3h \u2192 12 Muffins, 1.2kg Obst, 7L Saft."],
    ["\u{1F634}", "Ruhemodus", "Kinder zu wild? Ein Klick tauscht Action gegen ruhige Spiele."]
  ].map(([ico, title, desc], i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { background: "#fff", borderRadius: 20, padding: "24px 20px", border: "1px solid #f0ede8", animation: `fadeSlideUp 0.5s ${i * 0.05}s ease-out both` } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 24, display: "block", marginBottom: 6 } }, ico), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--fd)", fontWeight: 700, fontSize: 15, color: "var(--d)", display: "block", marginBottom: 4 } }, title), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: "var(--m)", lineHeight: 1.5 } }, desc))))), /* @__PURE__ */ React.createElement("section", { style: { maxWidth: 700, margin: "48px auto 0", padding: "0 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: 20 } }, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--a)", marginBottom: 6 } }, "F\xFCr Eltern"), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "var(--fd)", fontWeight: 900, fontSize: "clamp(20px,4vw,26px)", color: "var(--d)", margin: 0 } }, "Motto-Ratgeber"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: "var(--m)", marginTop: 8 } }, "Du kennst Pok\xE9mon oder Ninjago nicht? Unsere Guides erkl\xE4ren alles.")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 10 } }, [
    { emoji: "\u{1F43E}", name: "PAW Patrol", href: "/paw-patrol-guide" },
    { emoji: "\u26A1", name: "Pok\xE9mon", href: "/pokemon-guide" },
    { emoji: "\u26CF\uFE0F", name: "Minecraft", href: "/minecraft-guide" },
    { emoji: "\u2744\uFE0F", name: "Frozen", href: "/frozen-guide" },
    { emoji: "\u{1F344}", name: "Super Mario", href: "/super-mario-guide" },
    { emoji: "\u{1F577}\uFE0F", name: "Spider-Man", href: "/spider-man-guide" },
    { emoji: "\u26A1", name: "Harry Potter", href: "/harry-potter-guide" },
    { emoji: "\u{1F977}", name: "Ninjago", href: "/ninjago-guide" }
  ].map((g, i) => /* @__PURE__ */ React.createElement("a", { key: i, href: g.href, style: { textDecoration: "none" } }, /* @__PURE__ */ React.createElement("div", { style: { background: "var(--bg)", border: "1px solid var(--l)", borderRadius: 12, padding: "16px 12px", textAlign: "center", transition: "all 0.2s", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 28, marginBottom: 6 } }, g.emoji), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "var(--d)" } }, g.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--a)", marginTop: 4 } }, "Guide lesen \u2192"))))), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginTop: 16 } }, /* @__PURE__ */ React.createElement("a", { href: "/ratgeber", style: { fontSize: 13, color: "var(--a)", fontWeight: 600, textDecoration: "none" } }, "Alle Ratgeber ansehen \u2192"))), /* @__PURE__ */ React.createElement("footer", { style: { maxWidth: 700, margin: "40px auto 0", padding: "16px 16px", textAlign: "center", borderTop: "1px solid var(--l)" } }, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12, color: "var(--m)" } }, "\xA9 2026 machsleicht.de \xB7 ", /* @__PURE__ */ React.createElement("a", { href: "/schatzsuche", style: { color: "var(--m)", textDecoration: "none" } }, "Schatzsuche"), " \xB7 ", /* @__PURE__ */ React.createElement("a", { href: "/ratgeber", style: { color: "var(--m)", textDecoration: "none" } }, "Ratgeber"), " \xB7 ", /* @__PURE__ */ React.createElement("a", { href: "/impressum", style: { color: "var(--m)", textDecoration: "none" } }, "Impressum"), " \xB7 ", /* @__PURE__ */ React.createElement("a", { href: "/datenschutz", style: { color: "var(--m)", textDecoration: "none" } }, "Datenschutz"), " \xB7 ", /* @__PURE__ */ React.createElement("a", { href: "/transparenz", style: { color: "var(--m)", textDecoration: "none" } }, "Transparenz"))));
}
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(App, null));
var seo = document.getElementById("seo-content");
if (seo) seo.style.display = "none";
if (location.hash === "#planer") document.getElementById("planer")?.scrollIntoView({ behavior: "smooth" });
