/**
 * SEO Page Generator for machsleicht.de
 * Generates: 14 motto pages + 3 age-group pages + 3 bonus pages + improved index fallback
 * Run: node generate-seo-pages.js
 */
const fs = require('fs');
const path = require('path');

const SITE = path.join(__dirname, 'machsleicht-site', 'machsleicht-site');

// ============================================================
// MOTTO DATA (extracted from index.html JS)
// ============================================================
const MOTTOS = [
  {id:"safari",name:"Safari-Expedition",emoji:"🦁",color:"#D4A574",cat:"generic",ages:"3–12",
    desc:"Der Safari-Geburtstag verwandelt euer Wohnzimmer oder den Garten in einen Dschungel voller Abenteuer. Perfekt für kleine Tierliebhaber — vom Tierfiguren-Suchen für die Kleinsten bis zur Foto-Safari für die Großen.",
    spiele:{
      klein:["Tierfiguren-Suche — versteckte Tiere im Raum oder Garten finden","Tier-Geräusche raten — Tierlaute nachmachen, wer errät die meisten?","Dschungel-Krabbelparcours — durch Tunnel, über Kissen, unter Seilen"],
      mittel:["Safari-Schatzsuche — 5 Stationen mit Rätseln bis zum Schatz","Tier-Pantomime — Tiere nachahmen und erraten lassen","Dschungel-Parcours — Hindernislauf: Kriechen, Springen, Balancieren"],
      gross:["Safari-Rallye mit Quiz — Stationen mit Wissensfragen über Tiere","Tier-Tabu — Tiere beschreiben ohne bestimmte Wörter","Foto-Safari — Liste mit Dingen die fotografiert werden müssen"]
    },
    deko:"Safari Teller und Becher, Dschungel-Luftballons, Tiermasken zum Basteln. Minimal: grüne Tischdecke und Luftballons.",
    mitgebsel:"Mini-Tierfiguren, Tier-Tattoos, Safari-Papiertüten",
    kuchen:{klein:"Tierkuchen mit Smarties-Gesicht",mittel:"Zebra-Kuchen (Marmorkuchen)",gross:"Dschungel-Torte mit Gummitier-Deko"}
  },
  {id:"piraten",name:"Piraten-Abenteuer",emoji:"🏴‍☠️",color:"#5D4037",cat:"generic",ages:"3–12",
    desc:"Piraten-Geburtstage sind der absolute Klassiker — und funktionieren in jedem Alter. Von der einfachen Schatzsuche mit Bildhinweisen für die Kleinsten bis zum Escape-Abenteuer mit Codes und Schlössern für die Großen.",
    spiele:{
      klein:["Schatzsuche (einfach) — 3 Stationen mit Bildhinweisen","Eierlauf über die Planke — auf einer Linie balancieren mit Ball auf Löffel","Piratenhut basteln — einfache Hüte aus Zeitungspapier falten"],
      mittel:["Schatzsuche mit Schatzkarte — 5 Stationen mit Rätseln","Piraten-Staffel — Teams transportieren Wasser, klettern am Seil, lösen Rätsel","Piraten-Verkleidung basteln — Augenklappen und Hüte aus Tonpapier"],
      gross:["Escape-Schatzsuche — Codes knacken, Schlösser öffnen, Karte entschlüsseln","Piraten-Olympiade — 5 Disziplinen: Seilwerfen, Zielschießen, Knotenkunde","Flaschenpost-Rätsel — verschlüsselte Nachrichten in Flaschen entschlüsseln"]
    },
    deko:"Piraten Teller und Becher, Totenkopf-Luftballons, Piraten-Girlande. Minimal: rote und schwarze Luftballons.",
    mitgebsel:"Goldmünzen, Piraten-Sticker, Piraten-Papiertüten",
    kuchen:{klein:"Piratenflaggen-Muffins",mittel:"Piratenschiff aus Kastenkuchen mit Papier-Segel",gross:"Schatzkisten-Kuchen mit Goldmünzen-Deko"}
  },
  {id:"weltraum",name:"Weltraum-Mission",emoji:"🚀",color:"#283593",cat:"generic",ages:"3–12",
    desc:"Weltraum-Geburtstage begeistern Kinder aller Altersgruppen. Vom Planeten-Sammeln für die Kleinsten bis zum Binärcode-Knacken für angehende Astronauten — diese Mission hebt ab.",
    spiele:{
      klein:["Planetenjagd — bunte Bälle (Planeten) im Raum suchen","Mondlandung — Stopptanz, bei Stopp auf den Mond (Kissen) landen","Sterne basteln — Sterne aus Alufolie und Glitzer kleben"],
      mittel:["Planeten-Rallye — 8 Stationen = 8 Planeten, je eine Aufgabe","Mondlandung-Stopptanz — Musik = fliegen, Stopp = auf dem Mond einfrieren","Alien-Schleim herstellen — Glitzer-Schleim mischen zum Mitnehmen"],
      gross:["Weltraum-Escape-Room — Rätsel lösen um die Rakete zu starten","Raketen-Wettbewerb — Papierraketen bauen und am weitesten schießen","Alien-Schleim-Labor — verschiedene Rezepte testen: Glitzer, Neon, Magnetisch"]
    },
    deko:"Weltraum Teller und Becher, Planeten-Luftballons, Sternenhimmel-Lichterkette. Minimal: dunkelblaue und silberne Luftballons.",
    mitgebsel:"Leucht-Sterne, Weltraum-Tattoos, Weltraum-Tüten",
    kuchen:{klein:"Raketen-Muffins mit spitzer Waffel obendrauf",mittel:"Raketen-Kuchen mit Smarties als Flammen",gross:"Galaxie-Kuchen mit bunten Spiralen aus Lebensmittelfarbe"}
  },
  {id:"dino",name:"Dino-Abenteuer",emoji:"🦕",color:"#795548",cat:"generic",ages:"3–12",
    desc:"Dinosaurier faszinieren Kinder seit Generationen. Der Dino-Geburtstag bietet Ausgrabungen, Vulkan-Experimente und Fossilien-Forschung — von der einfachen Dino-Eier-Suche bis zur Paläontologen-Rallye.",
    spiele:{
      klein:["Dino-Eier suchen — versteckte Bälle oder Plastik-Eier finden","Dino-Tanz — Stampfen wie ein T-Rex, bei Musik-Stopp einfrieren","Dino-Ausmalen — große Dino-Ausmalbilder an der Wand"],
      mittel:["Dino-Ausgrabung — kleine Dinos im Sand oder Reiswanne ausgraben","Vulkan-Experiment — Essig + Natron + Spüli + Lebensmittelfarbe = Lava!","Dino-Eierlauf — wer bringt das Dino-Ei sicher ins Nest?"],
      gross:["Paläontologen-Rallye — Knochen finden, zuordnen, Dino-Steckbrief erstellen","Vulkan-Wettbewerb — Teams bauen den besten Vulkan, wer spuckt am höchsten?","Dino-Quiz-Duell — wer weiß am meisten über Dinosaurier?"]
    },
    deko:"Dino Teller und Becher, Dino-Luftballons, Dino-Girlande. Minimal: grüne Luftballons + Dino-Figuren als Tischdeko.",
    mitgebsel:"Mini-Dinos, Dino-Stempel, Dino-Papiertüten",
    kuchen:{klein:"Dino-Muffins mit Mini-Dino obendrauf",mittel:"Vulkan-Kuchen: Gugelhupf mit Smarties als Lava",gross:"Fossilien-Kuchen mit weißen Schoko-Knochen"}
  },
  {id:"einhorn",name:"Einhorn-Zauber",emoji:"🦄",color:"#AB47BC",cat:"generic",ages:"3–12",
    desc:"Einhorn-Geburtstage sind magisch — Glitzer, Regenbogen und Zauberstäbe. Von der Glitzerstein-Suche für die Kleinsten bis zur Einhorn-Escape-Mission für die Großen.",
    spiele:{
      klein:["Glitzerstein-Suche — bunte Steine im Raum versteckt finden","Regenbogen-Tanz — bei Musikstopp eine Farbe rufen und berühren","Einhorn-Ausmalen — große Einhorn-Bilder zum Bemalen"],
      mittel:["Regenbogen-Schatzsuche — alle Farben an verschiedenen Stationen sammeln","Zauberstab basteln — Holzstäbe + Glitzer + Bänder + Sterne","Regenbogen-Stopptanz — Farbe rufen, alle berühren etwas in der Farbe"],
      gross:["Einhorn-Escape — magische Rätsel lösen für den Regenbogen-Schatz","Schmuck-Workshop — Perlenarmbänder und Glitzer-Ketten herstellen","Einhorn-Quiz — Mythologie, Farben, Logik im Team-Wettbewerb"]
    },
    deko:"Einhorn Teller und Becher, Regenbogen-Luftballons, Glitzer-Tischdecke. Minimal: rosa und lila Luftballons.",
    mitgebsel:"Einhorn-Sticker, Glitzer-Haargummis, Einhorn-Papiertüten",
    kuchen:{klein:"Regenbogen-Muffins mit bunten Streuseln",mittel:"Regenbogen-Kuchen mit 4 Farbschichten",gross:"Einhorn-Torte mit Fondant-Horn und essbarem Glitzer"}
  },
  {id:"feuerwehr",name:"Feuerwehr-Einsatz",emoji:"🚒",color:"#D32F2F",cat:"generic",ages:"3–12",
    desc:"Feuerwehr-Geburtstage sind Action pur. Löschen, Retten, Hindernis-Parcours — und am Ende die Feuerwehr-Urkunde. Von der Löscheimer-Staffel für die Kleinen bis zur Feuerwehr-Olympiade für die Großen.",
    spiele:{
      klein:["Löscheimer-Staffel — Wasser mit Becher transportieren","Feuerwehr-Verkleidung — Helme aufsetzen, Schläuche (Seile) ausrollen","Feuerwehr-Ausmalen — große Feuerwehr-Bilder zum Bemalen"],
      mittel:["Lösch-Staffel — Teams füllen Eimer und löschen Kerzen","Hindernis-Einsatz — Parcours: unter Seilen, über Kissen, Ball transportieren","Feuerwehr-Quiz — Was macht die Feuerwehr?"],
      gross:["Feuerwehr-Olympiade — 5 Disziplinen: Zielspritzen, Hindernis, Knoten, Sprint, Quiz","Rettungs-Escape — Rätsel lösen um den Brand zu löschen","Erste-Hilfe-Station — Verbände anlegen, stabile Seitenlage üben"]
    },
    deko:"Feuerwehr Teller und Becher, rote Luftballons, Absperrband. Minimal: rote Luftballons.",
    mitgebsel:"Mini-Feuerwehrautos, Feuerwehr-Sticker, rote Papiertüten",
    kuchen:{klein:"Feuerwehr-Muffins mit Mini-Feuerwehr obendrauf",mittel:"Feuerwehr-Kuchen mit roter Glasur und Gummibärchen-Leiter",gross:"Feuerwache-Torte mit Fondant-Tore und Spielzeug-Fahrzeug"}
  },
  {id:"paw-patrol",name:"Paw Patrol",emoji:"🐕",color:"#1565C0",cat:"license",ages:"3–7",
    desc:"Paw Patrol ist das beliebteste Motto für Kindergeburtstage bei 3- bis 7-Jährigen. Kein Kind, das nicht weiß wer Chase, Marshall und Skye sind. Rettungsmissionen, Pfotenabdruck-Memory und Welpen-Verkleidung — echte Paw-Patrol-Abenteuer statt generischer Hundespiele.",
    spiele:{
      klein:["Hühner einfangen (Chickaletta!) — Luftballons mit Hühnergesichtern in den Wäschekorb-Stall bugsieren","Marshalls Löscheinsatz — Becher-Pyramide mit Schwamm-Wasserbomben abwerfen","Welpen-Medaillen basteln — Hundemarken aus Moosgummi mit Glitzer und Stickern"],
      mittel:["PAW Patrol Rettungsmission — 6 Stationen je einem Welpen zugeordnet: Marshall (Wasser-Zielschießen), Chase (Parcours), Skye (Papierflieger), Rocky (Recycling), Rubble (Turm bauen), Zuma (Apfel-Tauchen)","Pfotenabdruck-Memory — bunte Pfoten auf Papptellern, Teller umgedreht verteilen","Welpen-Verkleidung und Foto — Paw Patrol Masken an Stäben, Foto als Lieblingswelpe"],
      gross:["Schnitzeljagd Mission Adventure Bay — 6 Auftrags-Stationen mit Welpen-Bildern","Wer bin ich? PAW Patrol Edition — Charakter auf den Rücken, nur Ja/Nein-Fragen","Hindernisparcours à la Chase — unter Seilen, über Kissen, Ball transportieren, auf Zeit"]
    },
    deko:"Paw Patrol Teller und Becher Set, Paw Patrol Luftballons, Paw Patrol Girlande. Minimal: blaue und rote Luftballons + Pfotenspuren aus Tonpapier.",
    mitgebsel:"Paw Patrol Mini-Figuren, Paw Patrol Sticker, Paw Patrol Geschenktüten",
    kuchen:{klein:"Pfoten-Muffins mit Smarties",mittel:"Lookout-Tower-Kuchen mit Waffelrolle als Turm",gross:"Adventure Bay Kuchen als Landschaft mit Figuren"}
  },
  {id:"pokemon",name:"Pokémon",emoji:"⚡",color:"#F9A825",cat:"license",ages:"5–10",
    desc:"Pokémon Geburtstage sind riesig — bei Jungen und Mädchen gleichermaßen. Die Kinder werden zu echten Pokémon-Trainern, sammeln Orden an verschiedenen Stationen und fangen Pokémon. Von der Pokéball-Bastelstation bis zur Profi-Trainer-Rallye mit 8 Arena-Orden.",
    spiele:{
      klein:["Pokémon fangen — ausgedruckte Pokémon-Bilder versteckt, jedes Kind füllt einen Pokédex als Stickerheft","Pokéball-Zielwurf — rot-weiß bemalte Styroporbälle auf Becher-Pyramiden mit Pokémon-Bildern werfen","Pikachu-Stopptanz — bei Stopp 'PIKAAA!' rufen und wie Pikachu einfrieren"],
      mittel:["Pokémon-Trainer-Prüfung — 6 Stationen für 6 Kanto-Orden: Pokéball basteln, Pokémon-Quiz, Zielwerfen, Pantomime, Eis-Pokémon befreien, Bingo","Pokéball basteln — weiße Styroporbälle mit Filzstiften in bunte Pokébälle verwandeln","Team Rocket Dosenwerfen — Becher mit Team-Rocket-Bildern umwerfen mit Softbällen"],
      gross:["Pokémon-Trainer-Rallye — 8 Stationen für 8 Arena-Orden: Wissensquiz, Geschicklichkeit, Codes knacken, Typ-Stärken zuordnen","Pokémon-Turnier im 1-2-oder-3 Format — Wissensfragen mit 3 Antworten, Teams stellen sich zur Zahl","Geist-Pokémon befreien — Figuren in Natron-Eier, mit Essig-Pipetten freilegen"]
    },
    deko:"Pokémon Teller und Becher, Pokémon Luftballons, Pikachu-Girlande. Minimal: gelbe und rote Luftballons + Pokéball aus Pappteller.",
    mitgebsel:"Pokémon Sammelkarten Booster, Pokémon Sticker, Pokémon Tüten",
    kuchen:{klein:"Pokéball-Muffins halb rot, halb weiß glasiert",mittel:"Pikachu-Kuchen mit gelber Glasur und Schoko-Ohren",gross:"Pokéball-Torte: obere Hälfte rot, untere weiß, schwarzer Fondant-Streifen"}
  },
  {id:"minecraft",name:"Minecraft",emoji:"⛏️",color:"#4CAF50",cat:"license",ages:"6–12",
    desc:"Minecraft ist das meistgespielte Spiel der Welt — und liefert perfektes Material für einen Kindergeburtstag. Von der Erz-Suche für die Jüngeren über die Survival-Rallye mit 5 Stationen bis zum Enderdrachen-Escape für die Großen. Pixel-Bastelei, Creeper-Dosenwerfen und TNT-Piñata inklusive.",
    spiele:{
      klein:["Pixel-Bild malen — auf kariertem Papier Kästchen für Kästchen, Vorlagen liegen bereit","Creeper-Dosenwerfen — grün bemalte Becher mit Creeper-Gesicht umwerfen","Erze suchen — in Schokofolie eingewickelte Diamanten (blau), Gold (gelb) und Redstone (rot)"],
      mittel:["Minecraft-Survival-Rallye — 5 Stationen: Erze abbauen, Creeper besiegen, Höhle erkunden, Redstone aktivieren, Enderportal öffnen","Bau-Wettbewerb — LEGO oder Kartons: bestes Minecraft-Bauwerk in 10 Minuten bauen","TNT-Piñata — Schuhkarton mit rotem Krepppapier + weißes TNT-Schild, Kinder schlagen bis Süßigkeiten rausfallen"],
      gross:["Enderdrachen-Escape — 12 Endsteine mit Rätseln finden und lösen, Portal öffnet sich zur Drachen-Piñata","Crafting-Quiz — Wie craftet man eine Spitzhacke? Teams raten Minecraft-Rezepte auf 3×3 Raster","Zombie-Jagd mit Wasserpistolen — 3 Zombies vs. Rest mit Wasserpistolen, getroffene Zombies frieren ein"]
    },
    deko:"Minecraft Teller und Becher, Minecraft Luftballons, Creeper-Girlande. Minimal: grüne und braune Luftballons + Fenster mit Washi-Tape pixeln.",
    mitgebsel:"Minecraft Sticker, Pixel-Armbänder, Minecraft Tüten",
    kuchen:{klein:"Creeper-Muffins mit grüner Glasur und Schokostückchen-Gesicht",mittel:"Grasblock-Kuchen: oben grüner Fondant, Seiten braun",gross:"Enderportal-Torte: schwarzer Schoko-Kuchen mit grünen Endsteinen"}
  },
  {id:"frozen",name:"Frozen / Eiskönigin",emoji:"❄️",color:"#4FC3F7",cat:"license",ages:"3–8",
    desc:"Die Eiskönigin ist seit Jahren eines der beliebtesten Mottos für Mädchen-Geburtstage. Schneeflocken, Glitzer, Eispaläste und natürlich 'Lass jetzt los'. Von Elsas Schneeflocken-Suche über die Arendelle-Rallye bis zum Frozen-Escape — magische Abenteuer für kleine Fans.",
    spiele:{
      klein:["Elsas Schneeflocken-Suche — glitzernde Pappe-Schneeflocken im Raum versteckt finden","Frozen-Stopptanz — bei Stopp 'FREEZE!' rufen, wie von Elsa eingefroren","Olaf zusammenbauen — großer Olaf aus Pappe mit verbundenen Augen zusammenlegen"],
      mittel:["Arendelle-Abenteuer-Rallye — 5 Stationen: Schneeflocken fangen, Olafs Nase anpinnen, Eisburg bauen, Trolls-Rätsel lösen, Elsas Krone basteln","Schneekugel basteln — Marmeladenglas + Glitzer + Wasser + Figur = eigene Frozen-Schneekugel","Eiskönigin-Quiz — Fragen zum Film mit Küchenglöckchen als Buzzer"],
      gross:["Frozen Escape: Rette Arendelle! — 5 Rätsel-Stationen: Geheimschrift, Schloss-Kombi, Kristall-Puzzle, Troll-Rätsel, Schneeflocken-Code","Eispalast-Bauwettbewerb — Teams bauen aus Zuckerwürfeln, Marshmallows und Zahnstochern","Frozen-Karaoke — 'Lass jetzt los' und andere Songs als Karaoke-Contest"]
    },
    deko:"Frozen Teller und Becher, Schneeflocken-Luftballons, Frozen Girlande. Minimal: hellblaue und weiße Luftballons + Schneeflocken aus Papier falten.",
    mitgebsel:"Frozen Sticker, Schneeflocken-Haarspangen, Frozen Tüten",
    kuchen:{klein:"Olaf-Muffins mit weißer Glasur und Marshmallow-Nase",mittel:"Frozen-Kuchen mit hellblauem Zuckerguss und Elsa-Figur",gross:"Eispalast-Torte: zweistöckig, hellblau und weiß, mit Eiszapfen"}
  },
  {id:"super-mario",name:"Super Mario",emoji:"🍄",color:"#E53935",cat:"license",ages:"5–10",
    desc:"Super Mario kennt jedes Kind. Goldmünzen sammeln, durch Welten rasen, Bowser besiegen — das perfekte Geburtstagsabenteuer. Von der Münzen-Sammel-Aktion für die Kleinen über die Welt-Rallye bis zur Mario Kart Olympiade.",
    spiele:{
      klein:["Goldmünzen sammeln — goldene Schoko-Münzen im Raum verteilen, mit dem typischen 'Pling!' bei jedem Fund","Pilz-Wurf — rote Pappteller auf Fragezeichen-Block-Eimer werfen, bei Treffer gibts eine Überraschung","Super-Mario-Stopptanz — bei Stopp wie Mario hüpfen, wer sich nicht bewegt ist raus"],
      mittel:["Super Mario Welt-Rallye — 5 Welten: Pilz-Königreich (Wurfspiel), Wüstenwelt (Eierlauf), Wolkenwelt (Wattebausch-Pusten), Bowsers Festung (Parcours), Sternen-Welt (Schnitzeljagd)","Münzen-Schnellsammeln — Mario vs. Luigi Teams, eine Minute, goldene Münzen überall","Fragezeichen-Block basteln — Karton gelb anmalen + ? drauf, mit Geheimgegenstand füllen"],
      gross:["Mario Kart Olympiade — 5 Disziplinen: Sackhüpfen, Bananen-Weitwurf, Münzen-Staffel, Slalom, Stern-Schatzsuche","Bowser-Escape — 6 Rätsel-Stationen knacken um den Schlüssel zur Schatztruhe zu finden","Power-Up-Quiz — Mario-Wissensfragen: Was macht der Stern? Welche Farbe hat Yoshis Ei?"]
    },
    deko:"Super Mario Teller und Becher, Mario Luftballons, Mario Girlande mit Sternen. Minimal: rote und grüne Luftballons + Fragezeichen-Blöcke aus Karton.",
    mitgebsel:"Mario Sticker, Gold-Schoko-Münzen, Mario Tüten",
    kuchen:{klein:"Pilz-Muffins: rote Glasur mit weißen Schoko-Punkten",mittel:"Fragezeichen-Block-Kuchen: eckig, gelber Fondant + großes ?",gross:"Mario-Welten-Torte mit Fondant-Röhren und Figuren"}
  },
  {id:"spider-man",name:"Spider-Man",emoji:"🕷️",color:"#C62828",cat:"license",ages:"5–10",
    desc:"Spider-Man ist der beliebteste Superheld bei Grundschulkindern. Spinnennetze durchklettern, Bösewichte besiegen, Superkräfte trainieren. Vom Spinnennetz-Krabbeln für die Kleinen über das Spider-Man Trainingscamp bis zur Spider-Verse Escape Mission.",
    spiele:{
      klein:["Spinnennetze durchklettern — Wollknäuel an Stühlen befestigt, durchkrabbeln ohne Netz zu berühren","Bösewicht-Dosenwerfen — Becher mit Green-Goblin-Gesichtern mit weichen Bällen umwerfen","Spinnen-Suche — Gummi-Spinnen im Raum versteckt finden, größte Spinne zählt doppelt"],
      mittel:["Spider-Man Trainingscamp — 5 Stationen: Spinnennetz durchklettern, Häuserwand (Klettergerüst), Zielschießen, Bösewicht-Quiz, Rettungsmission","Spinnennetz weben — Pappteller + Wolle: Löcher stanzen, Wolle durchfädeln, Gummi-Spinne drauf","Superhelden-Staffellauf — Ball zwischen Knien, Seil schwingen, Ring werfen, Zielwurf"],
      gross:["Spider-Verse Escape Mission — 6 Rätsel-Stationen: Codes knacken, Geheimschrift, Logik-Puzzle, Spider-Man-Quiz","Wolkenkratzer-Hindernis-Parcours — unter Netzen, über Hindernisse, an Seilen schwingen, auf Zeit","Superhelden-Quiz-Duell — Spider-Man, Bösewichte und Marvel-Universum, Buzzer-Runde"]
    },
    deko:"Spider-Man Teller und Becher, Spider-Man Luftballons, Spinnennetz-Deko. Minimal: rote und blaue Luftballons + Watte-Spinnennetze.",
    mitgebsel:"Spider-Man Sticker, Gummi-Spinnen, Spider-Man Tüten",
    kuchen:{klein:"Spinnen-Muffins mit Lakritze-Beinen",mittel:"Spider-Man-Kuchen: roter Fondant + schwarzes Spinnennetz aus Schoko",gross:"Spider-Verse-Torte: mehrstöckig, rot-blau, Fondant-Maske"}
  },
  {id:"harry-potter",name:"Harry Potter",emoji:"🧙",color:"#5D4037",cat:"license",ages:"8–12",
    desc:"Harry Potter Geburtstage sind perfekt für ältere Kinder. Zauberstäbe basteln, Zaubertränke brauen, Quidditch spielen und die Hogwarts-Aufnahmeprüfung bestehen. Von der Zauberstab-Bastelstation über die Hogwarts-Prüfung mit 6 Stationen bis zum Escape from Hogwarts.",
    spiele:{
      klein:["Zauberstab basteln — Holzstäbe + Heißklebe-Muster + braune/goldene Farbe","Zaubertrank mixen — verschiedene Säfte nach Rezept mischen (Traubensaft = Veritaserum)","Goldener Schnatz fangen — gelbe Tischtennisbälle mit Goldflügeln im Raum finden"],
      mittel:["Hogwarts-Aufnahmeprüfung — 6 Stationen: Zaubertrank brauen, Besenflug-Parcours, Kräuterkunde, Verteidigung (Dosenwerfen auf Dementoren), Wahrsagen, Sprechender Hut","Quidditch im Garten — 3 Reifen an Stangen als Tore, Teams werfen Bälle durch, gelber Ball = Schnatz","Geheimschrift mit Zitronensaft — mit Föhn oder Kerze erscheint die unsichtbare Schrift"],
      gross:["Escape from Hogwarts — 8 Rätsel-Stationen: Zaubertrank entschlüsseln, Kammer des Schreckens, Trimagisches Turnier, Horkrux finden","Trimagisches Turnier — 3 Aufgaben: Drachen-Ei klauen, Unterwasser-Challenge, Labyrinth mit Rätseln","Sprechender Hut Zeremonie — feierliche Sortierung in die 4 Häuser, Häuser-Teams für die Party"]
    },
    deko:"Harry Potter Teller und Becher, Hogwarts-Luftballons, schwimmende LED-Kerzen. Minimal: braune und goldene Luftballons + Briefe mit Siegelwachs.",
    mitgebsel:"Zauberstäbe aus Holz, Harry Potter Sticker, Pergament-Tüten",
    kuchen:{klein:"Eulen-Muffins (Hedwig) mit Oreo-Augen",mittel:"Hogwarts-Kuchen mit Fondant in Hausfarben und Wappen",gross:"Zauberbuch-Torte in Buchform mit Fondant-Seiten"}
  },
  {id:"ninjago",name:"Ninjago",emoji:"⚔️",color:"#1B5E20",cat:"license",ages:"5–10",
    desc:"Ninjago verbindet Action mit Teamwork. Ninja-Ausbildung, Shuriken-Werfen, Drachen-Piñata und das große Turnier der Elemente. Vom einfachen Ninja-Parcours über das Spinjitzu-Training bis zum Turnier der Elemente mit Punkte-System.",
    spiele:{
      klein:["Ninja-Ausbildung — Parcours: Rollen, Hüpfen, Kriechen, leise wie ein Ninja durchklettern","Shuriken-Wurf — Pappteller auf Zielscheibe werfen, verschiedene Ringe = verschiedene Punkte","Ninja-Stirnband basteln — Stoffstreifen + Ninjago-Symbol, jedes Kind wählt seine Ninja-Farbe"],
      mittel:["Ninja-Training mit Spinjitzu — 6 Stationen: Balancieren, Zielwerfen, Kraft-Test, Geschwindigkeit, Geschicklichkeit, Weisheit, pro Station ein Element-Sticker","Drachen-Piñata besiegen — Piñata in Drachen-Form mit Holzschwert (Papprolle) öffnen","Ninja vs. Schurken Fangen — 2 Teams Fangspiel, gefangene Spieler können befreit werden"],
      gross:["Ninjago Turnier der Elemente — 4 Teams, 5 Disziplinen mit Punkte-System, Gewinnerteam = Meister des Spinjitzu","Escape: Garmadons Festung — Rätsel-Stationen knacken, goldene Waffen zurückholen","Ninjago-Wissens-Battle — Quiz über Ninja, Kräfte und Bösewichte, Buzzer-Runde"]
    },
    deko:"Ninjago Teller und Becher, Ninjago Luftballons, Ninjago Girlande. Minimal: grüne und schwarze Luftballons.",
    mitgebsel:"Ninjago Sticker, Mini-Ninja-Figuren, Ninjago Tüten",
    kuchen:{klein:"Ninja-Muffins mit grüner Glasur und Fondant-Augen",mittel:"Ninjago-Kuchen in Lieblings-Ninja-Farbe mit Shuriken-Deko",gross:"Turnier-Torte: eckig, schwarz-gold, mit Fondant-Schwertern"}
  }
];

// ============================================================
// HTML TEMPLATE HELPERS
// ============================================================
const CSS = `
  :root{--a:#E8873D;--bg:#FFFAF5;--w:#FFF8F0;--d:#2D2319;--m:#6B5D52;--l:#EDE6DE;--f:'DM Sans',system-ui,sans-serif;--fd:'Fraunces',Georgia,serif}
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:var(--f);color:var(--d);background:var(--w);-webkit-font-smoothing:antialiased;line-height:1.7}
  a{color:var(--a);text-decoration:none;font-weight:600}
  a:hover{text-decoration:underline}
  main{max-width:720px;margin:0 auto;padding:24px 16px 60px}
  h1{font-family:var(--fd);font-size:clamp(26px,5vw,36px);font-weight:900;line-height:1.2;margin-bottom:16px}
  h2{font-family:var(--fd);font-size:22px;font-weight:800;margin:32px 0 12px;color:var(--d)}
  h3{font-size:17px;font-weight:700;margin:20px 0 8px}
  p{margin-bottom:12px;color:var(--m);font-size:15px}
  ul{padding-left:20px;margin-bottom:16px}
  li{margin-bottom:6px;font-size:14px;color:var(--m)}
  .header{display:flex;align-items:center;padding:14px 0 24px;gap:12px}
  .header a{text-decoration:none}
  .logo{font-family:var(--fd);font-size:22px;font-weight:900;color:var(--d)}
  .logo span{color:var(--a)}
  .badge{font-size:11px;font-weight:700;letter-spacing:2px;color:var(--a);text-transform:uppercase;margin-bottom:8px}
  .cta{display:inline-block;background:var(--a);color:#fff;padding:14px 32px;border-radius:99px;font-weight:700;font-size:15px;text-decoration:none;margin:8px 0}
  .cta:hover{background:#C46A1D;text-decoration:none}
  .card{background:var(--bg);border:1px solid var(--l);border-radius:14px;padding:20px;margin-bottom:16px}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px;margin-bottom:24px}
  .tag{display:inline-block;font-size:11px;font-weight:700;padding:3px 10px;border-radius:6px;background:var(--a);color:#fff;margin-right:6px;margin-bottom:4px}
  .breadcrumb{font-size:12px;color:var(--m);margin-bottom:16px}
  .breadcrumb a{font-size:12px;font-weight:500}
  footer{text-align:center;margin-top:40px;padding:16px 0;border-top:1px solid var(--l);font-size:12px;color:var(--m)}
  footer a{font-size:12px;color:var(--m);font-weight:400}
  .related{background:var(--bg);border:1px solid var(--l);border-radius:14px;padding:16px;margin-top:24px}
  .related h3{margin-top:0}
  @media(max-width:480px){main{padding:16px 12px 40px}}
`;

const header = (breadcrumb = '') => `
  <header class="header">
    <a href="/"><span class="logo">mach's<span>leicht</span></span></a>
  </header>
  ${breadcrumb ? `<nav class="breadcrumb">${breadcrumb}</nav>` : ''}
`;

const footer = (extra = '') => `
  ${extra}
  <footer>
    <p>© 2026 machsleicht.de · <a href="/impressum">Impressum</a> · <a href="/datenschutz">Datenschutz</a> · <a href="/schatzsuche">Schatzsuche</a></p>
    <p style="margin-top:8px"><a href="/">← Zurück zum Planer</a></p>
  </footer>
`;

const relatedMottos = (currentId) => {
  const others = MOTTOS.filter(m => m.id !== currentId);
  const pick = [];
  // pick 2 same category + 2 different
  const same = others.filter(m => m.cat === MOTTOS.find(x=>x.id===currentId).cat);
  const diff = others.filter(m => m.cat !== MOTTOS.find(x=>x.id===currentId).cat);
  pick.push(...same.sort(() => Math.random()-0.5).slice(0,2));
  pick.push(...diff.sort(() => Math.random()-0.5).slice(0,2));
  // deterministic: just take neighbors
  const idx = MOTTOS.findIndex(m => m.id === currentId);
  const picks = [
    MOTTOS[(idx+1)%MOTTOS.length],
    MOTTOS[(idx+2)%MOTTOS.length],
    MOTTOS[(idx+3)%MOTTOS.length],
    MOTTOS[(idx+MOTTOS.length-1)%MOTTOS.length],
  ];
  return `
  <div class="related">
    <h3>Weitere Motto-Ideen</h3>
    <div class="grid">
      ${picks.map(m => `<a href="/kindergeburtstag/${m.id}" style="text-decoration:none;color:var(--d)">
        <div class="card" style="text-align:center;padding:14px">
          <span style="font-size:28px">${m.emoji}</span>
          <p style="font-weight:700;margin:4px 0 2px;color:var(--d)">${m.name}</p>
          <span style="font-size:12px;color:var(--m)">${m.ages} Jahre</span>
        </div>
      </a>`).join('')}
    </div>
    <p style="text-align:center"><a href="/">Alle 14 Mottos im Planer ansehen →</a></p>
  </div>`;
};

function buildMottoPage(m) {
  const title = `${m.name} Kindergeburtstag — Spiele, Deko & Ablauf (${m.ages} Jahre) | machsleicht`;
  const desc = m.desc.substring(0, 155) + '...';
  const slug = m.id;
  const url = `https://machsleicht.de/kindergeburtstag/${slug}`;

  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `${m.name} Kindergeburtstag planen`,
    "description": m.desc,
    "step": [
      {"@type":"HowToStep","name":"Motto wählen","text":`Wähle ${m.name} als Motto für den Kindergeburtstag.`},
      {"@type":"HowToStep","name":"Spiele vorbereiten","text":`Bereite 2-3 altersgerechte ${m.name}-Spiele vor.`},
      {"@type":"HowToStep","name":"Deko & Einkaufsliste","text":`Besorge die ${m.name}-Deko und Mitgebsel.`},
      {"@type":"HowToStep","name":"Kuchen backen","text":`Backe einen ${m.name}-Kuchen passend zum Motto.`},
      {"@type":"HowToStep","name":"Party feiern","text":"Folge dem Zeitplan und genieß die Party!"}
    ],
    "tool": [{"@type":"HowToTool","name":"machsleicht Kindergeburtstag-Planer"}],
    "totalTime": "PT10M"
  }, null, 2);

  const spieleSection = (label, age, items) => `
    <h3>${label}</h3>
    <ul>
      ${items.map(s => `<li><strong>${s.split(' — ')[0]}</strong> — ${s.split(' — ').slice(1).join(' — ')}</li>`).join('\n      ')}
    </ul>`;

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${desc}">
  <meta property="og:title" content="${m.emoji} ${m.name} Kindergeburtstag — Spiele & Ablauf">
  <meta property="og:description" content="${desc}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${url}">
  <meta name="twitter:card" content="summary">
  <meta name="theme-color" content="#FFFAF5">
  <link rel="canonical" href="${url}">
  <script type="application/ld+json">
  ${schema}
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,800&family=Fraunces:opsz,wght@9..144,700;9..144,800;9..144,900&display=swap" rel="stylesheet">
  <style>${CSS}</style>
</head>
<body>
<main>
  ${header('<a href="/">Start</a> › <a href="/#mottos">Mottos</a> › ' + m.name)}

  <p class="badge">${m.cat === 'license' ? 'Lieblingscharakter-Motto' : 'Klassisches Motto'} · ${m.ages} Jahre</p>
  <h1>${m.emoji} ${m.name} Kindergeburtstag — Spiele, Deko & Ablauf</h1>

  <p style="font-size:16px;color:var(--d);line-height:1.7">${m.desc}</p>

  <a href="/" class="cta">${m.name}-Geburtstag jetzt planen →</a>

  <h2>Spiele für den ${m.name} Kindergeburtstag nach Alter</h2>
  <p>Jede Altersgruppe braucht andere Aktivitäten. Hier sind die besten ${m.name}-Ideen — keine generischen Vorlagen, sondern auf das Motto abgestimmte Programme.</p>

  ${spieleSection(`Aktivitäten für 3–5 Jahre (${m.cat === 'license' ? 'Fans ab 3' : 'kleine Entdecker'})`, 'klein', m.spiele.klein)}
  ${spieleSection(`Ideen für 6–8 Jahre (${m.cat === 'license' ? 'der Sweet Spot' : 'Abenteurer'})`, 'mittel', m.spiele.mittel)}
  ${spieleSection(`Programm für 9–12 Jahre (${m.cat === 'license' ? 'Profis' : 'Herausforderungen'})`, 'gross', m.spiele.gross)}

  <h2>Deko & Einkaufsliste</h2>
  <p>${m.deko}</p>

  <h2>Mitgebsel</h2>
  <p>${m.mitgebsel}. Der machsleicht-Planer zeigt dir alle Preise und rechnet die Kosten pro Kind aus.</p>

  <h2>Kuchen-Ideen</h2>
  <div class="grid">
    <div class="card"><h3>Einfach (3–5 J.)</h3><p>${m.kuchen.klein}</p></div>
    <div class="card"><h3>Mittel (6–8 J.)</h3><p>${m.kuchen.mittel}</p></div>
    <div class="card"><h3>Wow-Effekt (9–12 J.)</h3><p>${m.kuchen.gross}</p></div>
  </div>

  <h2>Kompletten ${m.name} Geburtstag planen — in 10 Minuten</h2>
  <p style="color:var(--d)">Du willst nicht einzelne Ideen zusammensuchen, sondern einen <strong>fertigen Plan</strong>? machsleicht erstellt dir in 10 Minuten einen kompletten ${m.name}-Geburtstag: Zeitplan mit Uhrzeiten, 2-3 altersgerechte Spiele mit Anleitung, Einkaufsliste mit Preisen, Snack-Mengen für die richtige Anzahl Kinder und Kosten pro Kind.</p>
  <p style="color:var(--d)">Kostenlos. Ohne Anmeldung. Sofort loslegen.</p>
  <a href="/" class="cta">${m.name}-Geburtstag planen →</a>

  <h2>Du brauchst eine Schatzsuche?</h2>
  <p>Neben dem Geburtstags-Planer bietet machsleicht auch eine eigene <a href="/schatzsuche">Schatzkarten-Engine</a>: Komplette Schatzsuche mit 5 Stationen, Eltern-Tipps und interaktiver Schatzkarte zum Ausdrucken.</p>

  ${relatedMottos(m.id)}
${footer()}
</main>
</body>
</html>`;
}

// ============================================================
// AGE GROUP PAGES
// ============================================================
const AGE_GROUPS = [
  {
    id: "3-5-jahre",
    title: "Kindergeburtstag 3, 4, 5 Jahre — Ideen, Spiele & Ablauf",
    h1: "Kindergeburtstag für 3-, 4- und 5-Jährige",
    desc: "So planst du den perfekten Kindergeburtstag für 3- bis 5-Jährige: einfache Spiele, kurze Stationen, Muffins statt Torte. Mit Motto-Ideen, Zeitplan und Einkaufsliste.",
    intro: "In diesem Alter sind einfache Spiele am besten: Suchspiele, Stopptanz, Ausmalen, kurze Parcours. Die Stationen sollten nicht länger als 10–15 Minuten dauern. Mehr als 6–8 Kinder können schnell überfordern. Plane eine längere Ankommenszeit (20 Minuten) und Muffins statt aufwendige Torten.",
    tipps: [
      "Ankommenszeit 20 Minuten — Kinder brauchen Zeit zum Eingewöhnen",
      "Maximal 6–8 Kinder einladen (Faustregel: Alter = Gästezahl)",
      "Stationen max. 10–15 Minuten lang, dann wechseln",
      "Muffins statt aufwendige Torte — einfacher und kinderfreundlicher",
      "2 Stunden Gesamtdauer reichen völlig aus",
      "Eltern der Gäste einplanen — bei 3-Jährigen bleiben sie oft dabei",
      "Ruhige Aktivität zum Schluss: Ausmalen oder Geschichte vorlesen"
    ],
    mottos: ["paw-patrol","frozen","safari","dino","einhorn","feuerwehr"],
    ageKey: "klein",
    dauer: "2 Stunden"
  },
  {
    id: "6-8-jahre",
    title: "Kindergeburtstag 6, 7, 8 Jahre — Spiele, Mottos & Tipps",
    h1: "Kindergeburtstag für 6-, 7- und 8-Jährige",
    desc: "Der Sweet Spot für Kindergeburtstage: Kinder verstehen Regeln, spielen in Teams und lösen Rätsel. Schatzsuchen, Bastelstationen, Quiz-Runden und Staffelläufe.",
    intro: "Der Sweet Spot für Kindergeburtstage. Kinder können Regeln verstehen, in Teams spielen und Rätsel lösen. Schatzsuchen mit 5 Stationen, Bastelstationen, Quiz-Runden und Staffelläufe funktionieren perfekt. 3 Stunden sind die ideale Dauer — genug Zeit für 2-3 Spiele, Kuchen und Geschenke auspacken.",
    tipps: [
      "8–10 Kinder sind ideal — genug für Teams, nicht zu chaotisch",
      "3 Stunden Gesamtdauer — 2h zu kurz, 4h zu lang",
      "2–3 Spiele mit je 20–30 Minuten planen, nicht mehr",
      "Bastelstation als Ruhephase einbauen — perfekt nach dem Toben",
      "Schatzsuchen mit 5 Stationen funktionieren immer",
      "Kinder können jetzt Teams bilden — nutze das für Wettkämpfe",
      "Kuchen darf aufwendiger sein — die Kinder schätzen das"
    ],
    mottos: ["pokemon","minecraft","super-mario","spider-man","piraten","ninjago","weltraum"],
    ageKey: "mittel",
    dauer: "3 Stunden"
  },
  {
    id: "9-12-jahre",
    title: "Kindergeburtstag 9, 10, 11, 12 Jahre — Escape-Rooms, Challenges & mehr",
    h1: "Kindergeburtstag für 9- bis 12-Jährige",
    desc: "Ältere Kinder wollen Herausforderungen: Escape-Rooms mit Codes, Quiz-Duelle mit Buzzer, Team-Olympiaden. Die besten Ideen für Geburtstage die nicht 'uncool' sind.",
    intro: "Ältere Kinder wollen echte Herausforderungen — keine 'Babysachen'. Escape-Rooms mit Codes und Schlössern, Quiz-Duelle mit Buzzer, Team-Olympiaden mit Punktesystem und Kreativ-Challenges unter Zeitdruck. Die Deko darf weniger 'süß' sein, die Mitgebsel cooler. 3–4 Stunden sind die richtige Dauer.",
    tipps: [
      "3–4 Stunden sind ideal — ältere Kinder haben mehr Ausdauer",
      "Escape-Rooms und Code-Knack-Spiele sind der absolute Hit",
      "Teams bilden und mit Punkte-System arbeiten — steigert die Motivation",
      "Keine 'Babydeko' — weniger ist mehr, lieber thematisch passend",
      "Buzzer-Runden (Küchenglöckchen reicht) machen jedes Quiz spannender",
      "Kreativ-Challenges unter Zeitdruck statt klassisches Basteln",
      "Essen darf 'cooler' sein: Pizza statt nur Kuchen, Nachos, selbst belegte Bagels"
    ],
    mottos: ["harry-potter","minecraft","spider-man","ninjago","piraten","weltraum"],
    ageKey: "gross",
    dauer: "3–4 Stunden"
  }
];

function buildAgePage(ag) {
  const url = `https://machsleicht.de/kindergeburtstag/${ag.id}`;
  const relevantMottos = ag.mottos.map(id => MOTTOS.find(m => m.id === id)).filter(Boolean);

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${ag.title} | machsleicht</title>
  <meta name="description" content="${ag.desc}">
  <meta property="og:title" content="${ag.title}">
  <meta property="og:description" content="${ag.desc}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${url}">
  <meta name="twitter:card" content="summary">
  <meta name="theme-color" content="#FFFAF5">
  <link rel="canonical" href="${url}">
  <script type="application/ld+json">
  ${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": ag.title,
    "description": ag.desc,
    "numberOfItems": relevantMottos.length,
    "itemListElement": relevantMottos.map((m, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": m.name + " Kindergeburtstag",
      "url": "https://machsleicht.de/kindergeburtstag/" + m.id
    }))
  }, null, 2)}
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,800&family=Fraunces:opsz,wght@9..144,700;9..144,800;9..144,900&display=swap" rel="stylesheet">
  <style>${CSS}</style>
</head>
<body>
<main>
  ${header('<a href="/">Start</a> › Altersgruppe › ' + ag.h1.split(' für ')[1])}

  <p class="badge">Altersgruppe · ${ag.dauer}</p>
  <h1>${ag.h1}</h1>

  <p style="font-size:16px;color:var(--d)">${ag.intro}</p>

  <a href="/" class="cta">Geburtstag jetzt planen →</a>

  <h2>Tipps für diese Altersgruppe</h2>
  <ul>
    ${ag.tipps.map(t => `<li style="color:var(--d)">${t}</li>`).join('\n    ')}
  </ul>

  <h2>Beliebte Mottos für diese Altersgruppe</h2>
  <div class="grid">
    ${relevantMottos.map(m => `<a href="/kindergeburtstag/${m.id}" style="text-decoration:none;color:var(--d)">
      <div class="card" style="text-align:center;padding:16px">
        <span style="font-size:32px">${m.emoji}</span>
        <p style="font-weight:700;margin:6px 0 4px;color:var(--d)">${m.name}</p>
        <span style="font-size:12px;color:var(--m)">${m.ages} Jahre</span>
      </div>
    </a>`).join('\n    ')}
  </div>

  <h2>Spiele-Ideen pro Motto</h2>
  ${relevantMottos.map(m => `
  <div class="card">
    <h3>${m.emoji} <a href="/kindergeburtstag/${m.id}">${m.name}</a></h3>
    <ul>
      ${m.spiele[ag.ageKey].map(s => `<li>${s}</li>`).join('\n      ')}
    </ul>
  </div>`).join('\n  ')}

  <h2>Kompletten Geburtstag planen — in 10 Minuten</h2>
  <p style="color:var(--d)">machsleicht erstellt dir einen <strong>fertigen Geburtstags-Plan</strong> passend zum Alter: Zeitplan mit Uhrzeiten, altersgerechte Spiele, Einkaufsliste mit Preisen und Kosten pro Kind. Kostenlos und ohne Anmeldung.</p>
  <a href="/" class="cta">Jetzt Geburtstag planen →</a>

  <h2>Schatzsuche als Highlight</h2>
  <p>Die <a href="/schatzsuche">Schatzsuche</a> ist das beliebteste Spiel auf jedem Kindergeburtstag. Mit der machsleicht Schatzkarten-Engine erstellst du eine komplette Schatzsuche in 5 Minuten — mit 5 Stationen und interaktiver Karte zum Ausdrucken.</p>

  <div class="related">
    <h3>Andere Altersgruppen</h3>
    <div class="grid">
      ${AGE_GROUPS.filter(a => a.id !== ag.id).map(a => `<a href="/kindergeburtstag/${a.id}" style="text-decoration:none;color:var(--d)">
        <div class="card" style="text-align:center;padding:14px">
          <p style="font-weight:700;color:var(--d)">${a.h1.split(' für ')[1]}</p>
          <span style="font-size:12px;color:var(--m)">${a.dauer}</span>
        </div>
      </a>`).join('\n      ')}
    </div>
  </div>
${footer()}
</main>
</body>
</html>`;
}

// ============================================================
// BONUS PAGES
// ============================================================
function buildZuhausePage() {
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kindergeburtstag zuhause feiern — Ideen, Spiele & Tipps | machsleicht</title>
  <meta name="description" content="Kindergeburtstag zuhause planen: die besten Spiele für Wohnung und Garten, platzsparende Deko-Ideen, Snack-Mengen und ein Zeitplan der funktioniert.">
  <meta property="og:title" content="Kindergeburtstag zuhause feiern — so klappt's stressfrei">
  <meta property="og:description" content="Die besten Spiele, Deko-Ideen und Tipps für den Kindergeburtstag in der Wohnung oder im Garten.">
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://machsleicht.de/kindergeburtstag-zuhause">
  <meta name="twitter:card" content="summary">
  <meta name="theme-color" content="#FFFAF5">
  <link rel="canonical" href="https://machsleicht.de/kindergeburtstag-zuhause">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Kindergeburtstag zuhause feiern — Ideen, Spiele & Tipps",
    "description": "Kindergeburtstag zuhause planen: die besten Spiele für Wohnung und Garten, platzsparende Deko-Ideen, Snack-Mengen und ein Zeitplan der funktioniert.",
    "author": {"@type": "Person", "name": "Marie-Therese Bollweg"},
    "publisher": {"@type": "Organization", "name": "machsleicht"},
    "datePublished": "2026-03-21",
    "mainEntityOfPage": "https://machsleicht.de/kindergeburtstag-zuhause"
  }
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,800&family=Fraunces:opsz,wght@9..144,700;9..144,800;9..144,900&display=swap" rel="stylesheet">
  <style>${CSS}</style>
</head>
<body>
<main>
  ${header('<a href="/">Start</a> › Kindergeburtstag zuhause')}

  <p class="badge">Ratgeber</p>
  <h1>Kindergeburtstag zuhause feiern — Ideen, Spiele & Tipps für Wohnung und Garten</h1>

  <p style="font-size:16px;color:var(--d)">Kein Indoorspielplatz, keine Trampolinhalle, kein Budget für externe Locations — und trotzdem ein großartiger Geburtstag? Absolut machbar. Die meisten unvergesslichen Kindergeburtstage finden zuhause statt. Hier erfährst du, wie du mit wenig Aufwand einen Geburtstag planst, der Kinder begeistert und dich nicht stresst.</p>

  <a href="/" class="cta">Geburtstag zuhause planen →</a>

  <h2>Warum zuhause feiern die beste Wahl ist</h2>
  <ul>
    <li style="color:var(--d)"><strong>Günstiger:</strong> Keine Location-Kosten. Ein Kindergeburtstag zuhause kostet oft unter 5 Euro pro Kind.</li>
    <li style="color:var(--d)"><strong>Flexibler:</strong> Du bestimmst den Zeitplan, die Spiele und das Essen.</li>
    <li style="color:var(--d)"><strong>Persönlicher:</strong> Das Geburtstagskind ist in vertrauter Umgebung — weniger Reizüberflutung.</li>
    <li style="color:var(--d)"><strong>Weniger Stress:</strong> Kein Anfahrtsweg, keine fremden Regeln, keine Zeitlimits.</li>
  </ul>

  <h2>Spiele für die Wohnung (Indoor)</h2>
  <p>Nicht jedes Spiel braucht einen Garten. Diese Aktivitäten funktionieren auch auf 60 Quadratmetern:</p>
  <ul>
    <li><strong>Schatzsuche in der Wohnung</strong> — Hinweise auf Zettel, versteckt an 5 Stationen (unter dem Bett, im Schuhschrank, an der Waschmaschine)</li>
    <li><strong>Stopptanz / Freeze</strong> — braucht nur Musik und 3 Quadratmeter freien Platz</li>
    <li><strong>Dosenwerfen</strong> — Plastikbecher stapeln, mit weichem Ball umwerfen</li>
    <li><strong>Basteln</strong> — Masken, Armbänder, Zauberstäbe — je nach Motto</li>
    <li><strong>Quiz oder Bingo</strong> — ruhig, spannend, funktioniert an jedem Tisch</li>
    <li><strong>Memory oder Puzzle-Challenge</strong> — wer findet die meisten Paare?</li>
  </ul>

  <h2>Spiele für den Garten (Outdoor)</h2>
  <p>Mit Garten, Hof oder Park in der Nähe stehen dir mehr Optionen offen:</p>
  <ul>
    <li><strong>Schatzsuche im Freien</strong> — mit echten Stationen, Hinweiskarten und vergrabener Schatzkiste</li>
    <li><strong>Staffellauf / Hindernisparcours</strong> — Seile, Hütchen, Kissen, Eimer</li>
    <li><strong>Wasserballon-Schlacht</strong> — im Sommer der absolute Hit</li>
    <li><strong>Sackhüpfen und Eierlauf</strong> — Klassiker die immer funktionieren</li>
    <li><strong>Foto-Safari</strong> — Liste mit Dingen die fotografiert werden müssen</li>
  </ul>

  <h2>Kindergeburtstag bei Regen — Plan B</h2>
  <p>Der Garten-Plan fällt ins Wasser? Kein Problem. Diese Regel hilft: <strong>Plane immer so, dass alles auch Indoor funktioniert.</strong> Die Schatzsuche kann drinnen stattfinden, der Parcours wird mit Kissen und Seilen im Wohnzimmer aufgebaut, und statt Wasserballon-Schlacht gibt es Dosenwerfen.</p>
  <p>Der machsleicht-Planer berücksichtigt deinen Standort (Wohnung/Garten) und schlägt passende Spiele vor.</p>

  <h2>Platzsparende Deko-Ideen für zuhause</h2>
  <ul>
    <li>Luftballons an den Stühlen — kostet unter 3 Euro und macht sofort Partystimmung</li>
    <li>Girlande über dem Esstisch — sieht toll aus auf Fotos</li>
    <li>Themenfarbene Tischdecke — eine einzige Farbwelt reicht völlig</li>
    <li>Motto-Geschirr — Teller und Becher zum Thema gibt es ab 8 Euro für 8 Kinder</li>
  </ul>

  <h2>Wie viel Essen brauche ich?</h2>
  <p>Die häufigste Frage bei Geburtstagen zuhause. Faustregel pro Kind:</p>
  <ul>
    <li><strong>Kuchen/Muffins:</strong> 1,5 Stück pro Kind</li>
    <li><strong>Obst:</strong> 1 Schale (ca. 500g) für 8 Kinder</li>
    <li><strong>Saft/Wasser:</strong> 0,3L pro Kind</li>
    <li><strong>Snacks:</strong> 1 kleine Schale Chips/Brezeln für den Tisch</li>
  </ul>
  <p>Der machsleicht-Planer rechnet die genauen Mengen für deine Gästezahl automatisch aus.</p>

  <h2>Kompletten Geburtstag zuhause planen</h2>
  <p style="color:var(--d)">machsleicht erstellt dir in 10 Minuten einen kompletten Geburtstags-Plan für zuhause: Zeitplan mit Uhrzeiten, altersgerechte Spiele, Einkaufsliste mit Preisen, Snack-Mengen und Kosten pro Kind. <strong>Kostenlos, ohne Anmeldung.</strong></p>
  <a href="/" class="cta">Geburtstag planen →</a>

  <div class="related">
    <h3>Weiter lesen</h3>
    <div class="grid">
      <a href="/kindergeburtstag/3-5-jahre" style="text-decoration:none"><div class="card" style="text-align:center;padding:14px"><p style="font-weight:700;color:var(--d)">3–5 Jahre</p><span style="font-size:12px;color:var(--m)">Tipps & Mottos</span></div></a>
      <a href="/kindergeburtstag/6-8-jahre" style="text-decoration:none"><div class="card" style="text-align:center;padding:14px"><p style="font-weight:700;color:var(--d)">6–8 Jahre</p><span style="font-size:12px;color:var(--m)">Tipps & Mottos</span></div></a>
      <a href="/kindergeburtstag/9-12-jahre" style="text-decoration:none"><div class="card" style="text-align:center;padding:14px"><p style="font-weight:700;color:var(--d)">9–12 Jahre</p><span style="font-size:12px;color:var(--m)">Tipps & Mottos</span></div></a>
      <a href="/schatzsuche" style="text-decoration:none"><div class="card" style="text-align:center;padding:14px"><p style="font-weight:700;color:var(--d)">Schatzsuche</p><span style="font-size:12px;color:var(--m)">In 5 Minuten erstellt</span></div></a>
    </div>
  </div>
${footer()}
</main>
</body>
</html>`;
}

function buildLastMinutePage() {
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kindergeburtstag Last Minute — in 48 Stunden planen | machsleicht</title>
  <meta name="description" content="Kindergeburtstag in unter 48 Stunden planen. Der Notfall-Guide: Minimal-Deko, einfache Spiele, Supermarkt-Kuchen. Das reicht. Wirklich.">
  <meta property="og:title" content="Kindergeburtstag Last Minute — der Notfall-Guide">
  <meta property="og:description" content="Geburtstag in 48 Stunden? Kein Problem. Minimal-Deko, einfache Spiele, Supermarkt-Kuchen.">
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://machsleicht.de/kindergeburtstag-last-minute">
  <meta name="twitter:card" content="summary">
  <meta name="theme-color" content="#FFFAF5">
  <link rel="canonical" href="https://machsleicht.de/kindergeburtstag-last-minute">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Kindergeburtstag Last Minute — in 48 Stunden planen",
    "description": "Kindergeburtstag in unter 48 Stunden planen. Minimal-Deko, einfache Spiele, Supermarkt-Kuchen. Das reicht.",
    "author": {"@type": "Person", "name": "Marie-Therese Bollweg"},
    "publisher": {"@type": "Organization", "name": "machsleicht"},
    "datePublished": "2026-03-21",
    "mainEntityOfPage": "https://machsleicht.de/kindergeburtstag-last-minute"
  }
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,800&family=Fraunces:opsz,wght@9..144,700;9..144,800;9..144,900&display=swap" rel="stylesheet">
  <style>${CSS}</style>
</head>
<body>
<main>
  ${header('<a href="/">Start</a> › Last Minute')}

  <p class="badge">Notfall-Guide</p>
  <h1>Kindergeburtstag Last Minute — in 48 Stunden zum fertigen Plan</h1>

  <p style="font-size:16px;color:var(--d)">Der Geburtstag ist übermorgen und du hast noch nichts geplant? Keine Panik. Du brauchst keine Pinterest-Perfektion. Du brauchst einen Plan der funktioniert. Hier ist er.</p>

  <a href="/" class="cta">Notfall-Plan jetzt erstellen →</a>

  <h2>Die Last-Minute-Checkliste (in Prioritätsreihenfolge)</h2>
  <ol>
    <li style="color:var(--d);margin-bottom:8px"><strong>Gäste einladen</strong> — WhatsApp-Nachricht an die Eltern. Kein aufwendiger Einladungstext nötig. "Hi, [Kind] hat am [Tag] um [Uhrzeit] Geburtstag. Wir feiern zuhause, Abholung um [Uhrzeit]. Bitte kurz Bescheid geben!" Fertig.</li>
    <li style="color:var(--d);margin-bottom:8px"><strong>Kuchen</strong> — Backmischung reicht. Oder Supermarkt-Muffins. Oder ein Donut-Turm. Kinder lieben alles mit Zucker.</li>
    <li style="color:var(--d);margin-bottom:8px"><strong>2 Spiele vorbereiten</strong> — Schatzsuche (5 Zettel mit Hinweisen verstecken, Süßigkeiten als Schatz) + Stopptanz (Handy + Bluetooth-Box). Das reicht für 60 Minuten Programm.</li>
    <li style="color:var(--d);margin-bottom:8px"><strong>Snacks</strong> — Supermarkt: Saft, Obstschale, Brezeln. Mehr braucht es nicht.</li>
    <li style="color:var(--d);margin-bottom:8px"><strong>Deko</strong> — Luftballons. Nur Luftballons. Die gibt es an der Supermarkt-Kasse. Das reicht.</li>
    <li style="color:var(--d);margin-bottom:8px"><strong>Mitgebsel</strong> — Optional. Ein paar Süßigkeiten in eine Tüte. Oder weglassen. Niemand beschwert sich.</li>
  </ol>

  <h2>Der 2-Stunden-Zeitplan</h2>
  <div class="card">
    <p style="color:var(--d)"><strong>14:00</strong> — Ankommen, Geschenke abstellen</p>
    <p style="color:var(--d)"><strong>14:20</strong> — Kuchen essen, Happy Birthday singen, Kerzen auspusten</p>
    <p style="color:var(--d)"><strong>14:40</strong> — Spiel 1: Schatzsuche (20 Min.)</p>
    <p style="color:var(--d)"><strong>15:00</strong> — Geschenke auspacken</p>
    <p style="color:var(--d)"><strong>15:15</strong> — Spiel 2: Stopptanz oder freies Spiel</p>
    <p style="color:var(--d)"><strong>15:45</strong> — Snacks, Saft, runterkommen</p>
    <p style="color:var(--d)"><strong>16:00</strong> — Abholung. Tschüss!</p>
  </div>

  <h2>Was du NICHT brauchst</h2>
  <ul>
    <li style="color:var(--d)">Keine aufwendige Deko — Luftballons reichen</li>
    <li style="color:var(--d)">Keine 10 verschiedenen Spiele — 2 genügen</li>
    <li style="color:var(--d)">Keine Instagram-Torte — Muffins oder Supermarkt-Kuchen</li>
    <li style="color:var(--d)">Keine Motto-Verkleidung — Kinder spielen auch ohne Kostüm</li>
    <li style="color:var(--d)">Keine Einladungskarten — WhatsApp reicht</li>
    <li style="color:var(--d)">Kein schlechtes Gewissen — du machst das großartig</li>
  </ul>

  <h2>Noch einfacher: machsleicht macht den Plan für dich</h2>
  <p style="color:var(--d)">Wähle Alter, Gästezahl und ein Motto — in 10 Minuten hast du einen kompletten Plan mit Zeitplan, Spielen und Einkaufsliste. Auch im Minimal-Modus mit dem absoluten Minimum an Aufwand.</p>
  <a href="/" class="cta">Notfall-Plan erstellen →</a>

  <div class="related">
    <h3>Mehr planen</h3>
    <div class="grid">
      <a href="/kindergeburtstag-zuhause" style="text-decoration:none"><div class="card" style="text-align:center;padding:14px"><p style="font-weight:700;color:var(--d)">Zuhause feiern</p><span style="font-size:12px;color:var(--m)">Tipps & Ideen</span></div></a>
      <a href="/schatzsuche" style="text-decoration:none"><div class="card" style="text-align:center;padding:14px"><p style="font-weight:700;color:var(--d)">Schatzsuche</p><span style="font-size:12px;color:var(--m)">In 5 Minuten erstellt</span></div></a>
    </div>
  </div>
${footer()}
</main>
</body>
</html>`;
}

function buildChecklistePage() {
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kindergeburtstag Checkliste — alles was du brauchst | machsleicht</title>
  <meta name="description" content="Die komplette Kindergeburtstag-Checkliste: Einladungen, Deko, Kuchen, Spiele, Essen, Mitgebsel — Schritt für Schritt, damit du nichts vergisst.">
  <meta property="og:title" content="Kindergeburtstag Checkliste — nichts vergessen">
  <meta property="og:description" content="Komplette Checkliste für den Kindergeburtstag: von der Einladung bis zur Mitgebseltüte.">
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://machsleicht.de/kindergeburtstag-checkliste">
  <meta name="twitter:card" content="summary">
  <meta name="theme-color" content="#FFFAF5">
  <link rel="canonical" href="https://machsleicht.de/kindergeburtstag-checkliste">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Kindergeburtstag Checkliste — alles was du brauchst",
    "description": "Die komplette Kindergeburtstag-Checkliste: Einladungen, Deko, Kuchen, Spiele, Essen, Mitgebsel.",
    "step": [
      {"@type": "HowToStep", "name": "2-3 Wochen vorher", "text": "Datum festlegen, Motto wählen, Gästeliste schreiben, Einladungen verschicken, Budget festlegen."},
      {"@type": "HowToStep", "name": "1 Woche vorher", "text": "Zusagen zählen, Spiele aussuchen, Deko und Mitgebsel besorgen, Einkaufsliste schreiben."},
      {"@type": "HowToStep", "name": "1-2 Tage vorher", "text": "Einkaufen, Kuchen backen, Spiel-Material vorbereiten, Mitgebsel-Tüten packen."},
      {"@type": "HowToStep", "name": "Am Tag des Geburtstags", "text": "Deko aufhängen, Stationen aufbauen, Snacks bereitstellen, Fotos machen, Mitgebsel verteilen."}
    ],
    "tool": [{"@type": "HowToTool", "name": "machsleicht Kindergeburtstag-Planer"}],
    "totalTime": "PT10M"
  }
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,800&family=Fraunces:opsz,wght@9..144,700;9..144,800;9..144,900&display=swap" rel="stylesheet">
  <style>${CSS}</style>
</head>
<body>
<main>
  ${header('<a href="/">Start</a> › Checkliste')}

  <p class="badge">Planung</p>
  <h1>Kindergeburtstag Checkliste — alles was du brauchst</h1>

  <p style="font-size:16px;color:var(--d)">Damit du nichts vergisst: die komplette Kindergeburtstag-Checkliste in der richtigen Reihenfolge. Von der ersten Planung bis zum letzten Mitgebsel.</p>

  <a href="/" class="cta">Automatische Checkliste erstellen →</a>

  <h2>2–3 Wochen vorher</h2>
  <ul>
    <li style="color:var(--d)">☐ Datum und Uhrzeit festlegen</li>
    <li style="color:var(--d)">☐ Location entscheiden: zuhause, Garten oder extern?</li>
    <li style="color:var(--d)">☐ Motto wählen — <a href="/">14 Motto-Ideen bei machsleicht</a></li>
    <li style="color:var(--d)">☐ Gästeliste schreiben (Faustregel: Alter des Kindes = Anzahl Gäste)</li>
    <li style="color:var(--d)">☐ Einladungen verschicken (WhatsApp reicht!)</li>
    <li style="color:var(--d)">☐ Budget festlegen (typisch: 5–10€ pro Kind)</li>
  </ul>

  <h2>1 Woche vorher</h2>
  <ul>
    <li style="color:var(--d)">☐ Zusagen zählen — finale Gästezahl</li>
    <li style="color:var(--d)">☐ Spiele aussuchen und Material besorgen (2–3 Spiele reichen)</li>
    <li style="color:var(--d)">☐ Deko bestellen oder kaufen</li>
    <li style="color:var(--d)">☐ Mitgebsel besorgen</li>
    <li style="color:var(--d)">☐ Kuchen-Rezept auswählen</li>
    <li style="color:var(--d)">☐ Einkaufsliste schreiben — oder <a href="/">automatisch erstellen lassen</a></li>
    <li style="color:var(--d)">☐ Allergien und Unverträglichkeiten bei Eltern abfragen</li>
  </ul>

  <h2>1–2 Tage vorher</h2>
  <ul>
    <li style="color:var(--d)">☐ Einkaufen: Snacks, Getränke, Obst, Kuchen-Zutaten</li>
    <li style="color:var(--d)">☐ Kuchen backen (oder Backmischung / Supermarkt-Kuchen holen)</li>
    <li style="color:var(--d)">☐ Spiel-Material vorbereiten (Rätsel ausdrucken, Stationen aufschreiben)</li>
    <li style="color:var(--d)">☐ Schatzsuche vorbereiten (falls geplant) — <a href="/schatzsuche">Schatzsuche erstellen</a></li>
    <li style="color:var(--d)">☐ Mitgebsel-Tüten packen</li>
    <li style="color:var(--d)">☐ Zeitplan durchgehen — <a href="/">machsleicht erstellt einen für dich</a></li>
  </ul>

  <h2>Am Tag des Geburtstags</h2>
  <ul>
    <li style="color:var(--d)">☐ Deko aufhängen (Luftballons, Girlande, Tischdecke)</li>
    <li style="color:var(--d)">☐ Stationen für Spiele aufbauen</li>
    <li style="color:var(--d)">☐ Schatzsuche-Hinweise verstecken</li>
    <li style="color:var(--d)">☐ Snacks und Getränke bereitstellen</li>
    <li style="color:var(--d)">☐ Kamera / Handy laden für Fotos</li>
    <li style="color:var(--d)">☐ Kerzen auf den Kuchen — und Happy Birthday singen!</li>
    <li style="color:var(--d)">☐ 📸 Gruppenfoto nicht vergessen</li>
    <li style="color:var(--d)">☐ Mitgebsel-Tüten beim Abholen verteilen</li>
  </ul>

  <h2>Automatische Checkliste mit machsleicht</h2>
  <p style="color:var(--d)">Statt alles selbst zusammenzusuchen: machsleicht erstellt dir in 10 Minuten eine <strong>personalisierte Checkliste</strong> basierend auf Alter, Motto und Gästezahl — mit Einkaufsliste, Preisen und Zeitplan. Kostenlos.</p>
  <a href="/" class="cta">Checkliste automatisch erstellen →</a>

  <div class="related">
    <h3>Weiter lesen</h3>
    <div class="grid">
      <a href="/kindergeburtstag-zuhause" style="text-decoration:none"><div class="card" style="text-align:center;padding:14px"><p style="font-weight:700;color:var(--d)">Zuhause feiern</p></div></a>
      <a href="/kindergeburtstag-last-minute" style="text-decoration:none"><div class="card" style="text-align:center;padding:14px"><p style="font-weight:700;color:var(--d)">Last Minute</p></div></a>
      <a href="/schatzsuche" style="text-decoration:none"><div class="card" style="text-align:center;padding:14px"><p style="font-weight:700;color:var(--d)">Schatzsuche</p></div></a>
    </div>
  </div>
${footer()}
</main>
</body>
</html>`;
}

// ============================================================
// SITEMAP + REDIRECTS
// ============================================================
function buildSitemap() {
  const today = new Date().toISOString().split('T')[0];
  const urls = [
    {loc:'https://machsleicht.de/',prio:'1.0',freq:'weekly'},
    {loc:'https://machsleicht.de/schatzsuche',prio:'0.9',freq:'weekly'},
    ...MOTTOS.map(m => ({loc:`https://machsleicht.de/kindergeburtstag/${m.id}`,prio:'0.8',freq:'monthly'})),
    ...AGE_GROUPS.map(ag => ({loc:`https://machsleicht.de/kindergeburtstag/${ag.id}`,prio:'0.7',freq:'monthly'})),
    {loc:'https://machsleicht.de/kindergeburtstag-zuhause',prio:'0.7',freq:'monthly'},
    {loc:'https://machsleicht.de/kindergeburtstag-last-minute',prio:'0.6',freq:'monthly'},
    {loc:'https://machsleicht.de/kindergeburtstag-checkliste',prio:'0.6',freq:'monthly'},
    {loc:'https://machsleicht.de/impressum',prio:'0.1',freq:'yearly'},
    {loc:'https://machsleicht.de/datenschutz',prio:'0.1',freq:'yearly'},
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.freq}</changefreq>
    <priority>${u.prio}</priority>
  </url>`).join('\n')}
</urlset>
`;
}

function buildRedirects() {
  const lines = [
    '/impressum    /impressum.html    200',
    '/datenschutz  /datenschutz.html  200',
    '/schatzsuche  /schatzsuche.html  200',
    ...MOTTOS.map(m => `/kindergeburtstag/${m.id}  /kindergeburtstag/${m.id}.html  200`),
    ...AGE_GROUPS.map(ag => `/kindergeburtstag/${ag.id}  /kindergeburtstag/${ag.id}.html  200`),
    '/kindergeburtstag-zuhause      /kindergeburtstag-zuhause.html      200',
    '/kindergeburtstag-last-minute   /kindergeburtstag-last-minute.html   200',
    '/kindergeburtstag-checkliste    /kindergeburtstag-checkliste.html    200',
  ];
  return lines.join('\n') + '\n';
}

// ============================================================
// GENERATE ALL
// ============================================================
function generate() {
  // Ensure kindergeburtstag directory exists
  const kgDir = path.join(SITE, 'kindergeburtstag');
  if (!fs.existsSync(kgDir)) fs.mkdirSync(kgDir, {recursive: true});

  let count = 0;

  // 1. Motto pages
  for (const m of MOTTOS) {
    const file = path.join(kgDir, `${m.id}.html`);
    fs.writeFileSync(file, buildMottoPage(m), 'utf8');
    console.log(`  ✓ ${m.emoji} /kindergeburtstag/${m.id}.html`);
    count++;
  }

  // 2. Age group pages
  for (const ag of AGE_GROUPS) {
    const file = path.join(kgDir, `${ag.id}.html`);
    fs.writeFileSync(file, buildAgePage(ag), 'utf8');
    console.log(`  ✓ 👶 /kindergeburtstag/${ag.id}.html`);
    count++;
  }

  // 3. Bonus pages
  fs.writeFileSync(path.join(SITE, 'kindergeburtstag-zuhause.html'), buildZuhausePage(), 'utf8');
  console.log('  ✓ 🏠 /kindergeburtstag-zuhause.html');
  count++;

  fs.writeFileSync(path.join(SITE, 'kindergeburtstag-last-minute.html'), buildLastMinutePage(), 'utf8');
  console.log('  ✓ ⏰ /kindergeburtstag-last-minute.html');
  count++;

  fs.writeFileSync(path.join(SITE, 'kindergeburtstag-checkliste.html'), buildChecklistePage(), 'utf8');
  console.log('  ✓ ✅ /kindergeburtstag-checkliste.html');
  count++;

  // 4. Sitemap
  fs.writeFileSync(path.join(SITE, 'sitemap.xml'), buildSitemap(), 'utf8');
  console.log('  ✓ 🗺️ sitemap.xml (updated)');

  // 5. Redirects
  fs.writeFileSync(path.join(SITE, '_redirects'), buildRedirects(), 'utf8');
  console.log('  ✓ 🔀 _redirects (updated)');

  console.log(`\n✅ Generated ${count} pages + sitemap + redirects`);
  console.log(`   Site dir: ${SITE}`);
}

generate();
