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
