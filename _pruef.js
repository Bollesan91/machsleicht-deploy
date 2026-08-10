
  // ===== DATA — 15 MOTTOS VOLL =====
  const MOTTOS = [
    {id:'piraten', emoji:'🏴‍☠️', name:'Piraten', accent:'#1E3A5F', accent2:'#FFD700', persona:'Pirat',
      games:[
        {emoji:'🪜',name:'Walk the Plank',desc:'Balance auf Brett',dauer:10,
          material:['Kreppband (3m Linie auf Boden)','Esslöffel + Tischtennisball pro Kind','Eimer als Ziel'],
          brief:'Kreppband-Linie auf Boden kleben (3m). Ball auf Löffel legen, über die Planke balancieren ohne Verlust. Fällt der Ball: zurück zum Start. Schnellster Pirat gewinnt.',
          safety:'Für 3-Jährige: Ball + Löffel mit Hand festhalten erlaubt'},
        {emoji:'⚓',name:'Kanonenkugeln',desc:'Bälle in Eimer',dauer:8,
          material:['Tennisbälle oder Sockenknäuel (5-8 Stück pro Kind)','3 Eimer in 2/3/4m Entfernung','Krepp-Linie als Wurflinie'],
          brief:'Jedes Kind hat 5 "Kanonenkugeln". Werfe sie aus 2m Entfernung in den Eimer. Naher Eimer = 1 Punkt, mittlerer = 2, fernster = 3. Wer hat nach 3 Runden die meisten Punkte?'},
        {emoji:'🏴‍☠️',name:'Schatz im Sand',desc:'Mit Sieb buddeln',dauer:10,
          material:['Flache Wanne mit DIN-EN-71-3 Spielsand (Hagebau/OBI Marke prüfen!)','Schoko-Goldmünzen (3-5 pro Kind)','Plastik-Sieb + Eimerchen pro Kind'],
          brief:'Münzen vorher im Sand vergraben. Kinder dürfen mit Sieb buddeln und ihre Goldmünzen behalten. 3-5 pro Kind ist die richtige Menge.',
          safety:'Nur zertifizierter Spielsand (KEIN Quarzsand mit Feinanteil — Lungen-Risiko). Hände nach Spiel waschen.'},
        {emoji:'🦜',name:'Papagei sagt',desc:'Simon-Says als Piraten-Variante',dauer:8,
          material:['Keine — nur Stimme + Kreativität'],
          brief:'Wie Simon-Says, aber mit "Papagei sagt": "Papagei sagt schwimm wie ein Hai!" → alle machen mit. Wenn "Papagei sagt" fehlt, NICHT mitmachen. Wer fälschlich mitmacht, scheidet aus. Letzter Pirat gewinnt.'},
        {emoji:'🚩',name:'Flaggenraub',desc:'Klassisches Outdoor-Spiel',dauer:15,
          material:['2 Stofftücher als Flaggen','Krepp/Hütchen zur Markierung der Spielzonen','Markierung Hauptquartier pro Team'],
          brief:'2 Teams, jedes verteidigt eine Flagge. Wer die gegnerische Flagge stiehlt + sicher zurück bringt = Sieg. In der gegnerischen Hälfte abgeklatscht = ins Gefängnis. Klassiker.',
          safety:'Sanftes Abklatschen Pflicht. Bei zu wildem Spielen: Schiedsrichter-Erwachsene:r dazu.'},
        {emoji:'🗡️',name:'Schwertkampf',desc:'Pool-Nudel-Duelle (sicher!)',dauer:12,
          material:['Pool-Nudeln (1 pro Kind, in 80 cm Stücke geschnitten)','Optional Pappschilde'],
          brief:'Pflicht-Regeln VOR dem Spiel: kein Schlag auf Kopf/Gesicht/Knie, max. Brusthöhe. Jeweils 2 Kinder duellieren 30 Sekunden, dann Wechsel.',
          safety:'PFLICHT: 1:1 Aufsicht durch Erwachsene. Pool-Nudel = sicherstes Übungsschwert — KEIN Spielzeug-Pass für Holz/Plastik-Schwerter!'},
        {emoji:'💎',name:'Edelsteinsuche',desc:'Im Wasserglas angeln',dauer:8,
          material:['Bunte Glas-/Plastik-Edelsteine ≥4 cm','Flache Wasserschüssel (max. 5 cm tief!)','Plastik-Sieb + kleine Beutel'],
          brief:'Schüssel mit Großperlen und Edelsteinen füllen. Jedes Kind fischt 5 "Edelsteine" mit Sieb. Top-Fischer:in bekommt Captain-Stempel.',
          safety:'Wasserhöhe MAX 5 cm + Erwachsene in Armreichweite. Für 3-5 J: NUR Großteile ≥4 cm, KEIN Glas, KEINE Murmeln (EN-71 Kleinteilezylinder).'},
        {emoji:'🪢',name:'Knoten-Wettbewerb',desc:'Wer bindet die meisten?',dauer:10,
          material:['Dicke Schnüre/Seile (40-60 cm pro Kind)','Knoten-Anleitung ausgedruckt','Stoppuhr'],
          brief:'3 Knoten lernen: einfacher Knoten, Schleife, Achterknoten. Wer in 3 Min alle drei beherrscht, bekommt Crew-Mitglied-Stempel. Anleitung daneben legen.'},
        {emoji:'🍾',name:'Flaschenpost',desc:'Geheimschrift entschlüsseln',dauer:12,
          material:['1-2 leere Plastik-Flaschen','Selbstgeschriebene Nachricht in Spiegelschrift','Kleiner Spiegel zum Entschlüsseln'],
          brief:'Nachricht rückwärts schreiben (z.B. "Schatz unter der Couch" → "hcuoC red retnu ztahcS"), in Flasche stecken. Verstecken. Kinder finden + entschlüsseln mit Spiegel.'},
        {emoji:'🦈',name:'Hai-Tag',desc:'Verstecken-Variante',dauer:10,
          material:['Markierung "Schiff" (Decke/Kissen) als sicherer Bereich','Hai-Maske oder rotes Tuch als Hai-Erkennung'],
          brief:'Ein Kind ist "Hai", alle anderen Piraten. Schiff (Decke) = Safe-Zone (max. 5 Sek). Wer Schiff verlässt, kann gefangen werden = wird selbst Hai. Letzter Pirat gewinnt.'}
      ],
      stations:['Captain\'s Cabin','Krähennest','Korallenriff','Sturmwarnung','DER SCHATZ'],
      invite:{title:'Ahoi, kleiner Pirat!',body:'wird {age} und feiert seinen Geburtstag als Piraten-Captain. Du bist Teil seiner Crew!'}},
    {id:'detektiv', emoji:'🕵️', name:'Detektiv', accent:'#3D4751', accent2:'#F4B400', persona:'Detektiv', badge:'Beliebt',
      games:[{emoji:'🔍',name:'Fingerabdrücke',desc:'Vergleichen + zuordnen'},{emoji:'📝',name:'Geheimschrift',desc:'Entziffern'},{emoji:'🗝️',name:'Code knacken',desc:'Zahlenrätsel'},{emoji:'🎭',name:'Verhör-Spiel',desc:'Wer war\'s?'},{emoji:'📷',name:'Foto-Detektiv',desc:'Was ist anders?'},{emoji:'🚪',name:'Stille Post',desc:'Geheim-Tipps weitergeben'},{emoji:'👣',name:'Spuren-Memory',desc:'Wer gehört wohin?'},{emoji:'📋',name:'Beweis-Quiz',desc:'Indizien zuordnen'},{emoji:'🔦',name:'Dunkel-Suche',desc:'Mit Taschenlampe'},{emoji:'🧩',name:'Puzzle-Hinweis',desc:'Setzt sich zur Lösung'}],
      stations:['Tatort','Spuren-Labor','Verhör-Zimmer','Beweis-Mappe','DER TÄTER'],
      invite:{title:'🤫 Top-Secret!',body:'übernimmt einen Fall — Detektiv {name} braucht deine Hilfe!'}},
    {id:'einhorn', emoji:'🦄', name:'Einhorn', accent:'#C2185B', accent2:'#FCE4EC', persona:'Einhorn-Freund',
      games:[{emoji:'🌈',name:'Regenbogen-Tag',desc:'Farben-Verstecken'},{emoji:'✨',name:'Glitzer-Suche',desc:'Glitzer-Steine finden'},{emoji:'⭐',name:'Sterne-Memory',desc:'Sternzeichen-Paare'},{emoji:'💃',name:'Einhorn-Tanz',desc:'Choreo lernen'},{emoji:'☁️',name:'Wolken-Springen',desc:'Hüpfspiel'},{emoji:'🎨',name:'Zauber-Schminken',desc:'Glitzer-Tattoos'},{emoji:'🎀',name:'Regenbogen-Limbo',desc:'Klassisch + bunt'},{emoji:'🪄',name:'Magie-Memory',desc:'Zaubertier-Paare'},{emoji:'🍭',name:'Glitzer-Schatz',desc:'Süßigkeiten-Suche'},{emoji:'💫',name:'Feenstaub-Wurf',desc:'Konfetti-Treffer'}],
      stations:['Regenbogenbrücke','Glitzerwiese','Wolkenburg','Sternenfeld','DER ZAUBERWALD'],
      invite:{title:'🌈 Magische Einladung',body:'wird {age} und lädt dich ins Einhorn-Reich ein!'}},
    {id:'safari', emoji:'🦁', name:'Safari', accent:'#795548', accent2:'#FFE0B2', persona:'Ranger',
      games:[{emoji:'🐘',name:'Tier-Pantomime',desc:'Raten welches Tier'},{emoji:'🐆',name:'Tatzen-Memory',desc:'Spuren zuordnen'},{emoji:'🥁',name:'Trommel-Post',desc:'Rhythmus weiterleiten'},{emoji:'🦒',name:'Wildtier-Suche',desc:'Plüschtiere finden'},{emoji:'🏃',name:'Safari-Rallye',desc:'Stationen-Lauf'},{emoji:'📯',name:'Dschungel-Schreie',desc:'Tierlaute-Quiz'},{emoji:'👣',name:'Spuren-Lesen',desc:'Wer war hier?'},{emoji:'🎵',name:'Trommel-Tanz',desc:'Stopp-Tanz'},{emoji:'🦓',name:'Big-Five-Quiz',desc:'Wer ist das?'},{emoji:'🌿',name:'Buschmesser-Limbo',desc:'Unter Lianen durch'}],
      stations:['Wasserloch','Akazienbaum','Felsen-Pass','Termiten-Hügel','DAS GROSSE WILD'],
      invite:{title:'🦁 Safari-Expedition!',body:'wird {age} — komm mit auf große Safari ins Wilde!'}},
    {id:'feuerwehr', emoji:'🚒', name:'Feuerwehr', accent:'#C62828', accent2:'#FFCDD2', persona:'Feuerwehrkid',
      games:[{emoji:'💧',name:'Schlauch-Lauf',desc:'Wasser-Stafette'},{emoji:'🔥',name:'Brand löschen',desc:'Wasserpistole auf Karton'},{emoji:'🪜',name:'Leiter-Steigen',desc:'Hindernis-Parcours'},{emoji:'🚨',name:'Sirenen-Tanz',desc:'Stopp-Tanz mit Alarm'},{emoji:'🎯',name:'Schwamm-Werfen',desc:'Treffer-Spiel'},{emoji:'🪢',name:'Knoten-Knüpfen',desc:'Feuerwehr-Knoten'},{emoji:'✨',name:'Funken-Memory',desc:'Symbol-Paare'},{emoji:'☎️',name:'Notruf-Quiz',desc:'112 Wissen'},{emoji:'🏃',name:'Hindernis-Parcours',desc:'Über/Unter/Durch'},{emoji:'🔔',name:'Alarm-Stopp',desc:'Bei Sirenen-Ton einfrieren'}],
      stations:['Wache','Einsatzzentrale','Brand-Stelle','Atemschutz','GROSSER EINSATZ'],
      invite:{title:'🚨 Alarm!',body:'wird {age} — wir brauchen dich im Einsatzteam!'}},
    {id:'weltraum', emoji:'🚀', name:'Weltraum', accent:'#1A237E', accent2:'#B3E5FC', persona:'Astronaut',
      games:[{emoji:'🌌',name:'Schwerelos-Tanz',desc:'Slow-Motion-Bewegungen'},{emoji:'⭐',name:'Sternbild-Suche',desc:'Konstellationen finden'},{emoji:'🌕',name:'Mond-Hüpfen',desc:'Auf Krater-Bildern'},{emoji:'🚀',name:'Raketen-Start',desc:'10-9-8...-Countdown'},{emoji:'☄️',name:'Asteroiden-Ausweichen',desc:'Ball-Vermeidung'},{emoji:'🛸',name:'UFO-Werfen',desc:'Frisbee-Treffer'},{emoji:'👽',name:'Alien-Quiz',desc:'Welcher Planet?'},{emoji:'🪐',name:'Planeten-Memory',desc:'Sonnen-System-Paare'},{emoji:'📡',name:'Funk-Stille-Post',desc:'Geheim-Code weitergeben'},{emoji:'🌟',name:'Weltraum-Twister',desc:'Sterne-Twister-Matte'}],
      stations:['Startrampe','Asteroidengürtel','Mondkrater','Marsrover','DAS SCHWARZE LOCH'],
      invite:{title:'🚀 Mission Control',body:'wird {age} und braucht Crew für seine Weltraum-Mission!'}},
    {id:'prinzessin', emoji:'👑', name:'Prinzessin', accent:'#AD1457', accent2:'#FCE4EC', persona:'Hoheit',
      games:[{emoji:'👑',name:'Krone basteln',desc:'Bastel-Station'},{emoji:'💃',name:'Schloss-Ball',desc:'Tanzen mit Musik'},{emoji:'🐸',name:'Frosch küssen',desc:'Plüschfrosch-Spiel'},{emoji:'💎',name:'Edelstein-Suche',desc:'Glitzersteine finden'},{emoji:'🌹',name:'Rosen-Pflücken',desc:'Bunte Blumen sammeln'},{emoji:'🎀',name:'Schleifen-Memory',desc:'Bänder-Paare'},{emoji:'👠',name:'Schuh-Stafette',desc:'Mit großen Schuhen laufen'},{emoji:'🏰',name:'Schloss-Quiz',desc:'Märchen-Fragen'},{emoji:'🦢',name:'Schwanen-See-Tanz',desc:'Slow-Motion-Choreo'},{emoji:'✨',name:'Zauberstab-Wurf',desc:'Treffer-Spiel'}],
      stations:['Schloss-Tor','Rosengarten','Thronsaal','Zauberwald','DAS GOLDENE KÄSTCHEN'],
      invite:{title:'👑 Königliche Einladung',body:'lädt zur Schloss-Feier ein — Hoheit, wir bitten Sie zur Audienz!'}},
    {id:'meerjungfrau', emoji:'🧜‍♀️', name:'Meerjungfrau', accent:'#01579B', accent2:'#B3E5FC', persona:'Meerwesen',
      games:[{emoji:'🦪',name:'Perlen-Tauchen',desc:'Bonbons aus Wasser'},{emoji:'🦀',name:'Krabben-Lauf',desc:'Rückwärts-Stafette'},{emoji:'🌊',name:'Wellen-Tanz',desc:'Choreographie'},{emoji:'🐚',name:'Muschel-Memory',desc:'Strand-Paare'},{emoji:'🐟',name:'Fisch-Pantomime',desc:'Welcher Fisch?'},{emoji:'💎',name:'Schatz-Suche',desc:'Unterwasser-Stationen'},{emoji:'🌿',name:'Algen-Twister',desc:'Twister grün-blau'},{emoji:'🐬',name:'Delfin-Sprung',desc:'Hopping-Spiel'},{emoji:'🪸',name:'Korallen-Bauen',desc:'Lego-Stafette'},{emoji:'🎵',name:'Meer-Stille-Post',desc:'Unterwasser-Geheimcode'}],
      stations:['Strand','Korallenriff','Tiefseegrotte','Versunkenes Schiff','DAS PERLENKÄSTCHEN'],
      invite:{title:'🧜‍♀️ Aus der Tiefe',body:'lädt dich ein — tauch mit ab in das Reich der Meerjungfrauen!'}},
    {id:'dino', emoji:'🦖', name:'Dinos', accent:'#2E7D32', accent2:'#C8E6C9', persona:'Dino-Forscher',
      games:[{emoji:'🥚',name:'Dino-Eier-Lauf',desc:'Eier auf Löffel'},{emoji:'🦴',name:'Skelett-Memory',desc:'Knochen zuordnen'},{emoji:'🦖',name:'T-Rex-Brüllen',desc:'Wer ist am lautesten?'},{emoji:'🌋',name:'Vulkan-Experiment',desc:'Backpulver-Ausbruch'},{emoji:'🔍',name:'Fossilien-Suche',desc:'Sand-Buddeln'},{emoji:'🦕',name:'Dino-Pantomime',desc:'Welcher Saurier?'},{emoji:'👣',name:'Spuren-Lesen',desc:'Welcher Dino lief hier?'},{emoji:'🧠',name:'Saurier-Quiz',desc:'Wissens-Fragen'},{emoji:'💃',name:'Dino-Tanz',desc:'Stopp-Tanz'},{emoji:'🔥',name:'Lava-Hüpfen',desc:'Boden ist Lava'}],
      stations:['Urwald','Vulkan','Knochen-Funde','Dino-Spuren','DIE EIER-HÖHLE'],
      invite:{title:'🦖 Dinos gesichtet!',body:'wird {age} — Forscher gesucht für die Saurier-Expedition!'}},
    {id:'pferde', emoji:'🐴', name:'Pferde', accent:'#5D4037', accent2:'#D7CCC8', persona:'Pferdefreund', badge:'Neu',
      games:[{emoji:'🧲',name:'Hufeisen-Werfen',desc:'Magnet-Hufeisen'},{emoji:'🐎',name:'Stall-Memory',desc:'Pferde-Paare'},{emoji:'🎭',name:'Pferde-Pantomime',desc:'Welche Rasse?'},{emoji:'🏃',name:'Hindernis-Parcours',desc:'Trab + Galopp'},{emoji:'🌾',name:'Heu-Suche',desc:'Versteckte Strohballen'},{emoji:'💇',name:'Mähnen-Frisuren',desc:'Plüschpferd-Friseur'},{emoji:'👢',name:'Cowboy-Stiefel-Lauf',desc:'Mit großen Stiefeln'},{emoji:'🏆',name:'Rancher-Stafette',desc:'Team-Wettkampf'},{emoji:'🧠',name:'Pferde-Quiz',desc:'Reit-Wissen'},{emoji:'⏱️',name:'Trab-Galopp',desc:'Tempo-Wechsel-Spiel'}],
      stations:['Stall','Reithalle','Koppel','Heuschober','DER REITER-POKAL'],
      invite:{title:'🐴 Sattelt die Pferde!',body:'wird {age} — komm zur großen Reiter-Party!'}},
    {id:'ritter', emoji:'⚔️', name:'Ritter', accent:'#37474F', accent2:'#CFD8DC', persona:'Ritter', badge:'Neu',
      games:[{emoji:'⚔️',name:'Schwertkampf',desc:'Schaumstoff-Säbel'},{emoji:'🏰',name:'Burg-Bauen',desc:'Karton-Stafette'},{emoji:'🐉',name:'Drachen-Werfen',desc:'Plüsch-Drache-Treffer'},{emoji:'🛡️',name:'Wappen-Memory',desc:'Heraldik-Paare'},{emoji:'🏃',name:'Ritter-Parcours',desc:'Hindernis-Lauf'},{emoji:'🔤',name:'Runen-Code',desc:'Geheim-Schrift'},{emoji:'🛡️',name:'Schild-Pantomime',desc:'Verteidigungs-Posen'},{emoji:'🏹',name:'Bogenschießen',desc:'Saugnapf-Pfeile'},{emoji:'🧠',name:'Ritter-Quiz',desc:'Mittelalter-Wissen'},{emoji:'👸',name:'Burgfräulein-Suche',desc:'Versteckspiel'}],
      stations:['Burgtor','Rittersaal','Drachen-Höhle','Geheim-Gang','DER GOLDENE GRAL'],
      invite:{title:'⚔️ Ritterschwur',body:'wird {age} — du wirst zum Ritter geschlagen!'}},
    {id:'baustelle', emoji:'🚧', name:'Baustelle', accent:'#E65100', accent2:'#FFE0B2', persona:'Bauarbeiter', badge:'Neu',
      games:[{emoji:'🚜',name:'Bagger-Werfen',desc:'Murmeln in Eimer'},{emoji:'🧱',name:'Stein-Stapel',desc:'Wer baut höchste?'},{emoji:'🔧',name:'Werkzeug-Memory',desc:'Tool-Paare'},{emoji:'⛑️',name:'Helm-Stafette',desc:'Helm weiterreichen'},{emoji:'🏃',name:'Maurer-Lauf',desc:'Mit Eimer-Tragen'},{emoji:'🎭',name:'Baustellen-Pantomime',desc:'Welcher Beruf?'},{emoji:'🥛',name:'Beton-Mix',desc:'Schaum-Schlagen'},{emoji:'🔨',name:'Hammer-Hoch',desc:'Wer hält länger?'},{emoji:'🚛',name:'Lastwagen-Rennen',desc:'Spielzeug-Auto-Stafette'},{emoji:'🧠',name:'Werkzeug-Quiz',desc:'Wozu dient was?'}],
      stations:['Bauwagen','Materialhaufen','Kran','Bauplan','DIE FUNDAMENTSTEIN-KISTE'],
      invite:{title:'🚧 Baustelle!',body:'wird {age} — du bist im Bautrupp dabei!'}},
    {id:'superheld', emoji:'🦸', name:'Superheld', accent:'#1565C0', accent2:'#FFD600', persona:'Superheld',
      games:[{emoji:'💥',name:'Bösewicht-Tag',desc:'Klassik mit Heldenmove'},{emoji:'🦹',name:'Kostüm-Stafette',desc:'Schnell verwandeln'},{emoji:'🎯',name:'Laser-Parcours',desc:'Wollfäden umgehen'},{emoji:'🎭',name:'Helden-Pantomime',desc:'Welche Superkraft?'},{emoji:'🛡️',name:'Schild-Werfen',desc:'Frisbee-Treffer'},{emoji:'💪',name:'Krafttraining',desc:'Mini-Hindernis-Parcours'},{emoji:'🦸‍♀️',name:'Tugend-Quiz',desc:'Was tun Held:innen?'},{emoji:'🔍',name:'Schurken-Suche',desc:'Plüsch-Bösewichte finden'},{emoji:'🏃',name:'Helden-Stafette',desc:'Mit Umhang sprinten'},{emoji:'⚡',name:'Blitz-Reaktion',desc:'Schnelligkeits-Test'}],
      stations:['Helden-Quartier','Geheim-Versteck','Bösewicht-Labor','Stadt-Bedrohung','DIE WELT-RETTUNG'],
      invite:{title:'🦸 Super-Mission!',body:'wird {age} — die Welt braucht deine Hilfe als Superheld!'}},
    {id:'dschungel', emoji:'🐒', name:'Dschungel', accent:'#33691E', accent2:'#DCEDC8', persona:'Dschungel-Forscher',
      games:[{emoji:'🍌',name:'Affen-Stafette',desc:'Bananen-Transport'},{emoji:'🐍',name:'Schlangen-Limbo',desc:'Unter Liane durch'},{emoji:'🌴',name:'Liane-Schwingen',desc:'Seil-Hangeln'},{emoji:'🦜',name:'Tierlaute-Quiz',desc:'Wer ruft so?'},{emoji:'🥥',name:'Kokosnuss-Werfen',desc:'Bälle in Korb'},{emoji:'🎭',name:'Tier-Pantomime',desc:'Welches Tier bin ich?'},{emoji:'🌿',name:'Pflanzen-Memory',desc:'Tropen-Paare'},{emoji:'🐆',name:'Tiger-Tag',desc:'Verstecken im Dschungel'},{emoji:'🌳',name:'Baumkronen-Suche',desc:'Hoch-versteckt-Spiel'},{emoji:'🧠',name:'Dschungel-Quiz',desc:'Tier-Wissen'}],
      stations:['Lichtung','Flussufer','Schlangenbusch','Baumkrone','DIE VERLORENE STADT'],
      invite:{title:'🐒 Dschungel-Abenteuer!',body:'wird {age} — komm mit auf Expedition!'}},
    {id:'feen', emoji:'🧚', name:'Feen', accent:'#7B1FA2', accent2:'#F3E5F5', persona:'Feen-Freund',
      games:[{emoji:'✨',name:'Feenstaub-Wurf',desc:'Glitzer-Treffer'},{emoji:'🌸',name:'Blumen-Memory',desc:'Garten-Paare'},{emoji:'🦋',name:'Schmetterling-Fang',desc:'Sanft-Greif-Spiel'},{emoji:'🌙',name:'Mondlicht-Tanz',desc:'Slow-Motion-Choreo'},{emoji:'🍄',name:'Pilz-Hopping',desc:'Auf bunten Punkten'},{emoji:'💫',name:'Zauber-Limbo',desc:'Bunte Lianen'},{emoji:'🎨',name:'Glitzer-Schminken',desc:'Feen-Make-up'},{emoji:'🪄',name:'Wunsch-Wurf',desc:'Sterne ins Glas'},{emoji:'🌿',name:'Waldgeister-Suche',desc:'Versteckte Plüschtiere'},{emoji:'🧠',name:'Märchen-Quiz',desc:'Welche Fee?'}],
      stations:['Feenwald-Tor','Blütenwiese','Mondteich','Sternenhain','DER MAGISCHE BAUM'],
      invite:{title:'🧚 Feenwald lädt ein!',body:'wird {age} und lädt dich in das Reich der Feen!'}}
  ];

  // ===== Kuratierte Games (window.MOTTO_DATA aus motto-data.js) in MOTTOS mergen =====
  // Ersetzt die inline-Games eines Mottos durch die rich-kuratierten (Helfer-v3-verifiziert),
  // sofern welche existieren. Mottos ohne kuratierte Daten bleiben unverändert (inline).
  function mergeCuratedGames(){
    const data = (window.MOTTO_DATA && window.MOTTO_DATA.games) || [];
    if(!data.length) return;
    const byMotto = {};
    data.forEach(g => { (byMotto[g.motto] = byMotto[g.motto] || []).push(g); });
    MOTTOS.forEach(m => {
      const cur = byMotto[m.id];
      if(cur && cur.length){
        m.games = cur.map(g => ({
          emoji:g.emoji, name:g.name, desc:g.desc,
          dauer:g.dauer,            // String "8–12" — openGameDetail rendert mit "Min"
          material:g.material,      // Array
          anleitung:g.anleitung,    // Array (Schritte)
          safety:g.safety, players:g.players, prep:g.prep, mess:g.mess,
          variants:g.variants, ages:g.ages, bestAge:g.bestAge,
          score:g.score, curated:true
        }));
      }
    });
  }
  mergeCuratedGames();

  // age-based game filter — echte Alters-Tags (ages[]) bei kuratierten, sonst Slice-Fallback
  function gamesForAge(motto, age){
    if(!motto?.games) return [];
    const allTagged = motto.games.every(g => Array.isArray(g.ages));
    if(allTagged){
      const hit = motto.games.filter(g => g.ages.includes(age));
      return hit.length ? hit : motto.games;   // falls kein Alters-Match: alle zeigen statt leer
    }
    // Fallback: alter Slice-Mechanismus für dünne (uncurated) Mottos
    const len = motto.games.length;
    const ranges = {'3-5':[0, Math.min(5,len)], '6-8':[Math.min(2,len-1), Math.min(9,len)], '9-12':[Math.max(0,len-7), len]};
    const [s,e] = ranges[age] || [0,7];
    return motto.games.slice(s, e);
  }

  // ===== STATE =====
  const STATE_KEY = 'mlplan_v4_state';
  let state = {
    stage: 1,
    motto: null,
    age: null,
    name: '',
    date: defaultDate(),
    time: '14:00',
    endTime: '16:30',
    guests: 6,
    exactAge: null,   // F5: echtes Alter fuer Einladung/Partyseite (state.age bleibt die AltersGRUPPE fuer Plan/Spiele)
    location: 'zuhause',
    adresse: '',      // Echte Party-Adresse (optional). Wird auf der Partyseite NUR Gaesten gezeigt, die zugesagt haben (Worker-Gating).
    partyMessage: '', // #25: persoenliche Nachricht an die Gaeste -> erscheint auf der Partyseite (geht als notes an /api/create)
    crew: [],         // Vornamen der eingeladenen Kinder -> gehen als invites an /api/create (Rollen + persoenliche ?g-Links)
    crewText: '',     // Rohtext des Crew-Feldes (Anzeige-Wahrheit; crew ist die geparste Sende-Wahrheit)
    games: [],
    eliteOff: [],   // im Elite-Plan abgewaehlte Spielnamen (nur ab-/anwaehlen)
    customEntries: [],
    invite: { type:'minispiel', title:'', body:'', deadline:'', sent:0, photo:null, whatsapp:'' },
    partyseite: { slug:'lukas7', rsvp:true, photos:false, wish:false, chat:false, active:false },   // photos/chat raus (F4: kein Worker-Backend)
    step: 1,
    eliteVariant: 'standard',
    lastSaved: null
  };

  function defaultDate(){
    const d = new Date();
    const dow = d.getDay();
    const untilSat = (6 - dow + 7) % 7 || 7;
    d.setDate(d.getDate() + untilSat + 21);
    return d.toISOString().slice(0,10);
  }

  // Compute age-number for invite text (null-safe — C5 Fix)
  // F5: echtes Alter bevorzugen (Gaesteseite/Einladung sollen kein geratenes Alter zeigen); sonst Gruppen-Mitte als Fallback.
  function ageNum(){ if(state.exactAge) return String(state.exactAge); if(!state.age) return '7'; return state.age === '3-5' ? '5' : state.age === '6-8' ? '7' : '10' }
  function setExactAge(v){
    const n = parseInt(v,10);
    state.exactAge = (n>=1 && n<=14) ? n : null;
    if(state.exactAge){ state.age = n<=5 ? '3-5' : (n<=8 ? '6-8' : '9-12'); showPlanBtn(); }   // AltersGRUPPE ableiten + Reveal freischalten (Exact-Age-Pfad strandete sonst -> kein sichtbarer "Plan ansehen"-Button)
    if(state.motto){ state.invite.body = `${state.name} ${state.motto.invite.body.replace('{age}', ageNum()).replace('{name}', state.name)}`; const be=document.getElementById('iBody'); if(be) be.value = state.invite.body; }
    try{ renderPlanPreview(); }catch(e){}
    try{ renderInvitePreview(); }catch(e){}
    autoSave();
  }

  // ===== ACCENT COLOR APPLY =====
  function applyAccent(motto){
    const root = document.documentElement.style;
    const accent = motto?.accent || '#FF6F00';
    const accent2 = motto?.accent2 || '#FFD700';
    const accentDark = darken(accent, 15);
    const accentLight = lighten(accent, 15);
    const accentBg = lighten(accent, 88);
    const accentBg2 = lighten(accent, 75);
    root.setProperty('--accent', accent);
    root.setProperty('--accent2', accent2);
    root.setProperty('--accent-dark', accentDark);
    root.setProperty('--accent-light', accentLight);
    root.setProperty('--accent-bg', accentBg);
    root.setProperty('--accent-bg2', accentBg2);
  }
  function hexToRgb(h){h=h.replace('#','');return[parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)]}
  function rgbToHex(r,g,b){const c=v=>('0'+Math.max(0,Math.min(255,Math.round(v))).toString(16)).slice(-2);return '#'+c(r)+c(g)+c(b)}
  function darken(hex,pct){const[r,g,b]=hexToRgb(hex);const f=1-pct/100;return rgbToHex(r*f,g*f,b*f)}
  function lighten(hex,pct){const[r,g,b]=hexToRgb(hex);const f=pct/100;return rgbToHex(r+(255-r)*f,g+(255-g)*f,b+(255-b)*f)}

  // ===== AUTO-SAVE =====
  let saveTimer = null;
  function autoSave(){
    if(saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      state.lastSaved = Date.now();
      const el = document.getElementById('saveIndicator');
      let ok = true;
      try {
        localStorage.setItem(STATE_KEY, JSON.stringify(state));
      } catch(e){
        ok = false;
        // Quota gesprengt (meist großes Foto) — Retry OHNE Foto, damit der Plan trotzdem persistiert
        try { localStorage.setItem(STATE_KEY, JSON.stringify({...state, invite:{...state.invite, photo:null}})); ok = 'nophoto'; } catch(e2){}
      }
      if(!el) return;
      el.classList.add('visible');
      if(ok === true){ el.textContent = 'Gespeichert ✓'; el.style.color=''; setTimeout(() => el.classList.remove('visible'), 1500); }
      else if(ok === 'nophoto'){ el.textContent = 'Gespeichert (Foto zu groß — nicht gesichert)'; el.style.color='#B26A00'; setTimeout(() => { el.classList.remove('visible'); el.style.color=''; el.textContent='Gespeichert'; }, 4000); }
      else { el.textContent = '⚠ Speicher voll — nicht gespeichert'; el.style.color='#D32F2F'; setTimeout(() => { el.classList.remove('visible'); el.style.color=''; el.textContent='Gespeichert'; }, 4000); }
    }, 600);
  }

  // ===== RESUME =====
  function loadSavedState(){
    try {
      const saved = localStorage.getItem(STATE_KEY);
      if(!saved) return null;
      const parsed = JSON.parse(saved);
      if(!parsed.motto || typeof parsed.motto !== 'object' || !parsed.motto.id) return null;   // Typ-Guard: altes String-Motto-Schema wuerde sonst pickAge/renderPlanPreview mit TypeError brechen (Befund Kritik-Welle)
      return parsed;
    } catch(e){ return null }
  }
  function maybeShowResumeBanner(){
    const saved = loadSavedState();
    if(!saved) return;
    window.__resumeSnapshot = saved;   // Snapshot festhalten: Deep-Link-Eintritt (?motto/?alter) kann STATE_KEY via autoSave ueberschreiben, bevor "Weitermachen" geklickt wird — sonst ist der gespeicherte Plan weg.
    // U5: gegen altes/teilweises localStorage-Schema absichern (motto als String/fehlend -> kein "undefined's undefined")
    const _mn = (saved.motto && saved.motto.name) ? saved.motto.name : 'Geburtstags';
    const _nm = saved.name || 'Dein';
    document.getElementById('resumeWho').textContent = `${_nm}'s ${_mn}-Plan`;
    const mins = saved.lastSaved ? Math.round((Date.now() - saved.lastSaved) / 60000) : 0;
    document.getElementById('resumeWhen').textContent = mins < 1 ? 'wenigen Sekunden' : mins < 60 ? `${mins} Min` : `${Math.round(mins/60)} h`;
    document.getElementById('resumeBanner').classList.add('show');
    applyAccent(saved.motto);
  }
  function resumeWork(){
    const saved = window.__resumeSnapshot || loadSavedState();
    if(!saved) return;
    try{
      // Merge ueber die Defaults statt komplettem Ersatz: alte Saves ohne partyseite/invite wuerden sonst
      // renderPartyseitePreview/renderInvitePreview bricken (Gutachter-Befund). Sub-Objekte einzeln mergen.
      const def = state;
      state = Object.assign({}, def, saved);
      state.invite = Object.assign({}, def.invite, saved.invite || {});
      state.partyseite = Object.assign({}, def.partyseite, saved.partyseite || {});
      // Motto an die aktuelle MOTTOS-Referenz binden (Content-/Spiele-Updates), Fallback auf gespeichertes Objekt.
      if(saved.motto && saved.motto.id){ const live = MOTTOS.find(m => m.id === saved.motto.id); if(live) state.motto = live; }
    }catch(e){ console.warn('resumeWork merge failed', e); state = saved; }
    document.getElementById('resumeBanner').classList.remove('show');
    applyAccent(state.motto);
    syncPsGameUI();   // gespeicherte Spiel-Wahl in die Kacheln (Gate-Finding K4: Restore lief vorher nur im Init-Pfad)
    renderPlanPreview();
    // Restore-Pfad: Eckdaten + Name-Gate aus dem gespeicherten State setzen (sonst strandet der "Plan ansehen"-Button:
    // unsichtbar bzw. disabled trotz vorhandenem Namen). Button sichtbar machen, da der Nutzer seinen Flow fortsetzt.
    try{ syncEckdaten(); }catch(e){}
    try{ const tpb=document.getElementById('toPlanBtn'); if(tpb) tpb.style.display=''; }catch(e){}
    goStage(state.stage || 1);
  }
  function discardResume(){
    document.getElementById('resumeBanner').classList.remove('show');
    localStorage.removeItem(STATE_KEY);
    window.__resumeSnapshot = null;   // verworfene Daten auch aus dem Memory-Snapshot loeschen (sonst resurrektierbar)
    applyAccent(null);
  }
  function brandClick(){
    if(state.motto && state.stage > 1){
      if(confirm('Möchtest du wirklich von vorne starten? Dein bisheriger Plan bleibt gespeichert.')){
        goStage(1);
      }
    } else {
      goStage(1);
    }
  }

  // ===== MOTTO PICKER =====
  // A11y: klickbare Karten (role=button: Motto/Alter) per Tastatur aktivierbar machen (Enter/Space). Delegiert, einmalig.
  // Native Elemente (button/a/input) handeln sich selbst -> ausgeschlossen, kein Doppel-Trigger.
  document.addEventListener('keydown', function(e){
    if(e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;
    const t = e.target;
    // Ist das fokussierte Element selbst ein natives Control, NICHT eingreifen (es handelt Enter/Space nativ). Guard auf e.target, nicht el.
    if(t && (t.tagName==='BUTTON'||t.tagName==='A'||t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.tagName==='SELECT')) return;
    const el = (t && t.closest) ? t.closest('[role="button"][onclick]') : null;
    if(!el) return;
    e.preventDefault();   // Space-Scroll verhindern
    el.click();
  });
  function renderMottos(){
    const grid = document.getElementById('mottosGrid');
    grid.innerHTML = MOTTOS.map(m => `
      <div class="motto-card" role="button" tabindex="0" aria-label="Motto ${m.name}" style="--accent:${m.accent};--accent-light:${lighten(m.accent,15)}" onclick="pickMotto('${m.id}')">
        ${m.badge ? `<span class="motto-card__badge" style="background:${m.accent}">${m.badge}</span>` : ''}
        <span class="motto-card__emoji">${m.emoji}</span>
        <div class="motto-card__name">${m.name}</div>
        <span class="motto-card__ages">3–12 Jahre</span>
      </div>
    `).join('') + `
      <div class="motto-card motto-card--custom" role="button" tabindex="0" aria-label="Eigenes Motto eintragen" style="--accent:#666" onclick="pickCustomMotto()">
        <span class="motto-card__emoji">✏️</span>
        <div class="motto-card__name">Eigenes…</div>
        <span class="motto-card__ages">Selbst eintragen</span>
      </div>`;
  }
  function pickCustomMotto(){
    const name = prompt('Wie soll dein Motto heißen?', 'Pferde-Hof');
    if(!name) return;
    const emoji = prompt('Welches Emoji passt?', '🎉') || '🎉';
    // Custom motto: Mechanik vom Piraten-Template, aber themen-NEUTRALE Texte (F8) — sonst zeigt ein
    // "Pferde-Hof"-Custom Piraten-Stationen ("Krähennest") + "...als Piraten-Captain" im Einladungstext.
    // (Bekannte Restgrenze: Spiel-Namen kommen weiter aus dem Piraten-Set, bis es ein Custom-Content-Modell gibt.)
    state.motto = { ...MOTTOS[0], id:'custom-'+Date.now(), name:name.trim(), emoji, persona:name.trim().replace(/-.*/,''), badge:'Eigenes',
      stations:['Erste Station','Zweite Station','Dritte Station','Vierte Station','Das große Finale 🎉'],
      invite:{ type:'minispiel', title:'Du bist eingeladen!', body:'wird {age} und feiert einen tollen Geburtstag — du bist eingeladen!' } };
    applyAccent(state.motto);
    document.getElementById('chosenMottoEmoji').textContent = state.motto.emoji;
    document.getElementById('chosenMottoName').textContent = state.motto.name;
    state.invite.title = `${emoji} Du bist eingeladen!`;
    state.invite.body = `${state.name} wird ${ageNum()} und feiert ${state.motto.name}-Geburtstag!`;
    renderAges();
    autoSave();
    /* Gate-M2 (01.08.): auch der Custom-Pfad wechselt das Motto — ohne Refresh bliebe der
       Paket-Knopf des vorherigen Mottos (samt Token-URL) stehen. Custom hat nie ein Paket,
       der Ruecksetz-Zweig in showPartyShare entfernt den Knopf. */
    try{ if(state.partyseite && state.partyseite.active && state.partyseite.url) showPartyShare(state.partyseite.url, state.partyseite.editUrl); }catch(e){}
    goStage(2);
  }

  function pickMotto(id){
    state.motto = MOTTOS.find(m => m.id === id);
    state.eliteOff = [];   // Spiel-Abwahl pro Motto zuruecksetzen
    applyAccent(state.motto);
    document.getElementById('chosenMottoEmoji').textContent = state.motto.emoji;
    document.getElementById('chosenMottoName').textContent = state.motto.name;
    // Reset invite to motto-default
    state.invite.title = state.motto.invite.title;
    state.invite.body = `${state.name} ${state.motto.invite.body.replace('{age}', ageNum()).replace('{name}', state.name)}`;
    renderAges();
    autoSave();
    /* Gate-M2 (01.08.): Paket-Knopf, Kachel-Beschriftung und Link-Ziel haengen an
       showPartyShare() — die lief nur bei Create/Restore. Ein Motto-Wechsel NACH
       Aktivierung liess den alten Knopf (samt Token-URL im href) bis zum Reload stehen.
       Refresh am Wechselzeitpunkt; showPartyShare ist laut eigenem Kommentar idempotent. */
    try{ if(state.partyseite && state.partyseite.active && state.partyseite.url) showPartyShare(state.partyseite.url, state.partyseite.editUrl); }catch(e){}
    goStage(2);
  }

  function renderAges(){
    const grid = document.getElementById('agesGrid');
    const ageData = [
      {key:'3-5', range:'3-5', title:'Kindergartenkinder', desc:'Kurze Spiele, viel Mitmachen', features:['Tagesplan 14:00–16:30','Kurze, einfache Spiele','Schatzsuche kindgerecht leicht']},
      {key:'6-8', range:'6-8', title:'Vorschule + 1. Klasse', desc:'Aktiv, kompetitiv — perfekte Zielgruppe', features:['Tagesplan 14:00–17:00','Aktive Spiele mit Wettkampf','Schatzsuche mit Rätseln']},
      {key:'9-12', range:'9-12', title:'Grundschulkinder', desc:'Anspruchsvollere Rätsel', features:['Tagesplan 14:00–18:00','Knifflige Spiele & Rätsel','Schatzsuche mit Geheimschrift']}
    ];
    grid.innerHTML = ageData.map(a => `
      <div class="age-card" data-age="${a.key}" role="button" tabindex="0" aria-label="Altersgruppe ${a.range} Jahre" onclick="pickAge('${a.key}')">
        <div class="age-card__range">${a.range}<small> Jahre</small></div>
        <div class="age-card__title">${a.title}</div>
        <div class="age-card__desc">${a.desc}</div>
        <ul class="age-card__features">${a.features.map(f => `<li>${f}</li>`).join('')}</ul>
      </div>
    `).join('');
  }

  // Reveal des "Plan ansehen"-Buttons: an eine bewusste Alterswahl gekoppelt (Karte ODER Zahlenfeld), NICHT an ein einzelnes Event.
  // Aus pickAge UND setExactAge gerufen -> kein Eintrittspfad strandet. Bewusst NICHT aus syncEckdaten/initFunnel (dort ist state.age
  // per initFunnel-Default '6-8' -> sonst Virgin-Vorschau des Buttons).
  function showPlanBtn(){
    const btn = document.getElementById('toPlanBtn'); if(btn) btn.style.display='';
    try{ document.querySelectorAll('#agesGrid .age-card').forEach(c=>{ c.style.outline = (c.dataset.age===state.age) ? '3px solid var(--accent,#1E3A5F)' : ''; }); }catch(e){}
    // Proaktiver Pflicht-Cue: nameReqHint zeigen, sobald der Button erscheint. KEIN Auto-Fokus hier — sonst zieht es den Blick ins
    // Namefeld, bevor der Nutzer den gerade erschienenen Button registriert (Reveal-Signal), erzeugt einen Fokus-Race mit
    // pickAge/revealPlan, und auf Mobile verdeckt das Keyboard den CTA. Fokus passiert gezielt nur in revealPlan (Korrektur bei Klick ohne Name).
    if(!state.name || !state.name.trim()){
      const h = document.getElementById('nameReqHint'); if(h) h.style.display='';
    }
  }
  function pickAge(age){
    state.age = age;
    state.eliteOff = [];   // Spiel-Abwahl pro Altersgruppe zuruecksetzen
    const ageGames = gamesForAge(state.motto, age);
    state.games = ageGames.slice(0,5).map(g => g.name);
    // C3-Fix: identisches Muster wie pickMotto (kein doppeltes "wird {age}", kein slice-Hack der bei Nicht-"wird"-Mottos Grammatik zerstoert)
    state.invite.body = `${state.name} ${state.motto.invite.body.replace('{age}', ageNum()).replace('{name}', state.name)}`;
    renderPlanPreview();
    autoSave();
    // Aha-Bypass: NICHT auto-advancen. Erst Eckdaten (v.a. Name) erfassen lassen, damit der Plan personalisiert ist ("Mias …" statt "dein Kind"), dann expliziter Klick.
    showPlanBtn();
    // Zum Eckdaten-Block scrollen (Name/Datum erfassen), aber NICHT auto-fokussieren: vermeidet Fokus-Race + Mobile-Keyboard,
    // das den gerade enthuellten "Plan ansehen"-Button verdeckt. Pflichtfeld-Markierung (*) + Hinweis leiten zum Namen.
    const ek = document.getElementById('eckdaten'); if(ek) ek.scrollIntoView({behavior:'smooth', block:'start'});
  }

  // Pflicht-Gate: Der personalisierte Plan-Reveal gibt es nur MIT Namen (sonst waere die Belohnung generisch -> Aha entwertet).
  // K2-Handoff (UX-Grün): Autopilot-Link traegt name/age/date/motto -> Studio personalisiert auch auf einem FREMDEN
  // Geraet (ohne localStorage). KEIN Foto ueber die URL (photoRound sprengte frueher die iframe-URL; Foto bleibt lokal).
  function buildAutopilotHref(a){
    a=a||document.getElementById('studioAutopilotLink');   // Gate-Fix: auch ohne Klick aufrufbar (Vorbefuellung), damit "Link kopieren"/Middle-Click die Parameter traegt
    if(!a)return;
    const p=new URLSearchParams({autopilot:'1'});
    if(state.name && state.name.trim())p.set('name',state.name.trim());
    let age=state.exactAge;
    if(!(age>=1 && age<=18))age={'3-5':5,'6-8':7,'9-12':10}[state.age]||'';
    if(age)p.set('age',age);
    if(state.date)p.set('date',state.date);
    if(state.time)p.set('time',state.time);        // Gate-Fix: Zeit mit -> keine leere "⏰ "-Zeile im Studio-PNG
    if(state.endTime)p.set('end',state.endTime);
    if(state.motto && state.motto.id)p.set('motto',state.motto.id);
    a.href='/einladung/studio/?'+p.toString();
  }
  function revealPlan(){
    if(!state.name || !state.name.trim()){
      const hint = document.getElementById('nameReqHint'); if(hint) hint.style.display='';
      const nm = document.getElementById('iqName');
      if(nm){ nm.setAttribute('aria-invalid','true'); nm.setAttribute('aria-describedby','nameReqHint'); const ek = document.getElementById('eckdaten'); if(ek) ek.scrollIntoView({behavior:'smooth', block:'start'}); setTimeout(()=>{try{nm.focus()}catch(e){}}, 350); }   // W-FORMERR: Fehler auch fuer Screenreader/Tastatur ansagen
      return;   // KEIN goStage(3) ohne Namen
    }
    const _nm = document.getElementById('iqName'); if(_nm){ _nm.removeAttribute('aria-invalid'); }
    const _h = document.getElementById('nameReqHint'); if(_h) _h.style.display='none';
    goStage(4);   // Phase B: nach den Eckdaten kommt zuerst die Einladung (zeitlich das, was Eltern als Erstes brauchen)
  }
  // Uebergang Einladung -> Plan (seedet den Plan erst hier)
  function planFromInvite(){ goStage(3); }   // Render uebernimmt goStage(3) (Re-Check: Doppel-Render vermeiden)

  // ===== PLAN PREVIEW =====
  function renderPlanPreview(){
    if(!state.motto) return;
    // Auto-Seed der Spiele: seit der manuelle Picker raus ist (Commit 82ccc78), muss der Plan
    // bei JEDEM Einstieg Spiele zeigen. state.games ist leer, wenn man via Deep-Link (?motto=…)
    // ohne pickAge reinkommt oder das Motto gewechselt hat -> dann passt kein Eintrag mehr zum
    // aktuellen Pool und die Spiele-Kachel war leer ("Bei Piraten leer"-Befund). Erste 5 passende
    // Spiele setzen; eine noch gueltige (zum Motto passende) Auswahl bleibt unangetastet.
    {
      const pool = gamesForAge(state.motto, state.age || '6-8');
      const poolNames = pool.map(g => g.name);
      if(!state.games.some(n => poolNames.includes(n))){
        state.games = pool.slice(0, 5).map(g => g.name);
      }
    }
    document.getElementById('planBadgeEmoji').textContent = state.motto.emoji;
    document.getElementById('planBadgeName').textContent = state.motto.name;
    document.getElementById('planBadgeAge').textContent = (state.age || '6-8') + ' Jahre';
    document.getElementById('planMottoName').textContent = state.motto.name;

    const body = document.getElementById('planBody');
    const gamesPool = gamesForAge(state.motto, state.age || '6-8');
    window.__gpNames = gamesPool.map(g => g.name);   // Index->Name fuer den delegierten Picker-Handler (kein Inline-onclick, kein Escaping-Risiko)
    const stations = state.motto.stations || ['Station 1','Station 2','Station 3','Station 4','DER SCHATZ'];
    const timeline = buildTimeline();

    const timelineHtml = timeline.map(row => `
      <div class="timeline__row ${row.custom ? 'timeline__row--custom' : ''}">
        <div class="timeline__time">${row.time}</div>
        <div class="timeline__what"><em>${esc(row.title)}</em>${row.desc ? '<br>'+esc(row.desc) : ''}${row.dur ? `<span class="timeline__dur">${row.dur} Min</span>` : ''}</div>
        <button class="timeline__del" onclick="deleteCustomEntry(${row.custom ? row.customIdx : -1})" title="Entfernen">×</button>
      </div>`).join('');

    body.innerHTML = `
      <article class="mod">
        <header class="mod__head">
          <span class="mod__icon">🗓️</span>
          <h3 class="mod__title">Tagesplan · ${timeline[0].time}–${state.endTime || timeline[timeline.length-1].time}</h3>
        </header>
        <div class="timeline">${timelineHtml}</div>
        <button class="timeline-add" onclick="toggleTimelineForm()">
          <span class="timeline-add__icon">➕</span>
          <span>Eigenen Programmpunkt hinzufügen</span>
        </button>
        <div class="timeline-form" id="timelineForm">
          <h5>Neuer Programmpunkt</h5>
          <div class="timeline-form__row">
            <div><label>Uhrzeit</label><input type="time" id="cusTime" value="16:30" oninput="checkTimelineConflict()"></div>
            <div><label>Was passiert?</label><input type="text" id="cusTitle" placeholder="z.B. Geschenke auspacken"></div>
            <div><label>Dauer (Min)</label><input type="number" id="cusDur" value="15" min="5" max="120"></div>
          </div>
          <div class="timeline-form__warn" id="timelineWarn">⚠️ Diese Uhrzeit überschneidet sich mit „<span id="timelineWarnTitle"></span>" — der neue Punkt wird trotzdem eingefügt.</div>
          <div class="timeline-form__btns">
            <button class="timeline-form__btn timeline-form__btn--sec" onclick="toggleTimelineForm()">Abbrechen</button>
            <button class="timeline-form__btn timeline-form__btn--prim" onclick="addCustomEntry()">+ Hinzufügen</button>
          </div>
        </div>
      </article>

      <article class="mod">
        <header class="mod__head">
          <span class="mod__icon">🎮</span>
          <h3 class="mod__title">Spiele · ${state.games.length} ausgewählt</h3>
        </header>
        <p class="games-hint">Tippe ein Spiel an, um es in den Plan zu nehmen oder rauszunehmen. „Details ›" zeigt Anleitung &amp; Material.</p>
        <div class="games-grid">${gamesPool.map((g,i) => { const sel = state.games.includes(g.name); return `<div class="game-tag${sel ? '' : ' game-tag--off'}" role="button" tabindex="0" aria-pressed="${sel ? 'true' : 'false'}" data-gi="${i}"><span class="game-tag__sel">${sel ? '✓' : '+'}</span><button type="button" class="game-tag__info" data-gi="${i}" data-detail="1">Details ›</button><div class="game-tag__name">${g.emoji} ${esc(g.name)}</div><div class="game-tag__desc">${esc(g.desc)}</div></div>`; }).join('')}</div>
      </article>

      <details class="mod sz-mod" id="sz-anchor"${window.__entryModus === 'schatzsuche' ? ' open' : ''}>
        <summary class="mod__head">
          <span class="mod__icon">🗺️</span>
          <h3 class="mod__title">Schatzsuche · ${stations.length} Stationen</h3>
        </summary>
        <div class="schatz">
          <ul class="schatz__list">${stations.map((s,i) => `<li><div class="schatz__num">${i+1}</div><div><div class="schatz__name">${i === stations.length-1 ? esc(state.motto.emoji)+' '+s : s}</div></div></li>`).join('')}</ul>
        </div>
      </details>

      <article class="mod">
        <header class="mod__head">
          <span class="mod__icon">🛒</span>
          <h3 class="mod__title">Einkaufsliste · für ${state.guests} Gäste</h3>
        </header>
        <div class="shopping">
          <div class="shopping__col"><h4>Discounter</h4><ul><li><b>${state.guests}</b>× Mini-Croissants</li><li><b>${(state.guests*0.25).toFixed(1)} l</b> Saftschorle</li><li>Süßigkeiten <b>200g</b></li><li>Kuchen-Zutaten</li></ul></div>
          <div class="shopping__col"><h4>Drogerie</h4><ul><li><b>${state.guests+2}</b>× Mitgebsel-Tüten</li><li><b>${state.guests+2}</b>× ${esc(state.motto.persona)}-Accessoires</li><li>Kerzen</li></ul></div>
          <div class="shopping__col"><h4>Bastelladen</h4><ul><li><b>1</b>× Themen-Box</li><li>Karton, Folie</li></ul></div>
        </div>
      </article>
    `;

    document.getElementById('planName1').textContent = (state.name && state.name.trim()) ? poss(state.name.trim()) : 'dein Kind';
    document.getElementById('planDate1').textContent = formatDateShort(state.date) + ', ' + state.time + ' Uhr';
    document.getElementById('planGuests1').textContent = state.guests;
    document.getElementById('planLocation1').textContent = locationLabel(state.location);
    // Elite-Content async drueberlegen; Schatzsuche-Scroll ERST nachdem renderElitePlan fertig ist (sonst wird der Scroll-Anker
    // mitten im Smooth-Scroll durch das Elite-innerHTML ersetzt). Funktioniert fuer beide Pfade: Elite-Render ODER Fallback (early return).
    renderElitePlan().catch(()=>{});   // Schatzsuche-Scroll passiert jetzt IN renderElitePlan nach dem Stale-Guard (H2)
  }

  // ===== ELITE-CONTENT-RENDERER (Phase 2) — laedt /data/motto/<motto>-<group>.json =====
  const _eliteCache = {};
  function eliteGroup(age){ return ({'3-5':'klein','6-8':'mittel','9-12':'gross'})[age] || 'mittel'; }
  async function getElite(id, age){
    const key = id + '-' + eliteGroup(age);
    if(key in _eliteCache) return _eliteCache[key];
    try{
      const r = await fetch('/data/motto/' + key + '.json');
      if(!r.ok){ _eliteCache[key] = null; return null; }   // echtes 404/fehlt -> dauerhaft negativ cachen
      const d = await r.json(); _eliteCache[key] = d; return d;
    }catch(e){ return null; }   // Bug B: transienter Netz-/Parse-Fehler -> NICHT cachen, naechster Versuch darf erneut laden
  }
  function currentVariant(d){
    const vs = d.variants || [];
    const v = vs.find(x => x.id === (state.eliteVariant || 'standard')) || vs[0] || null;
    if(v) state.eliteVariant = v.id;   // Tab-Highlight-Konsistenz: tatsaechlich gewaehlte Variante zurueckschreiben
    return v;
  }
  // ===== SCHATZSUCHE-MODUL (Phase 4) — /data/schatzsuche.json, 15 Themen x klein/mittel/gross =====
  let _schatzCache;
  async function getSchatz(){
    if(_schatzCache !== undefined) return _schatzCache;
    try{
      const r = await fetch('/data/schatzsuche.json');
      if(!r.ok) return null;                 // BUG-1: 4xx/5xx (fetch wirft hier NICHT) -> nicht cachen, Retry erlauben
      _schatzCache = await r.json();         // nur erfolgreichen, validen Datensatz cachen
      return _schatzCache;
    }catch(e){ return null; }                // Netz-/Parse-Fehler -> nicht cachen
  }
  // Schatzsuche-Funnel-Eintritt (?modus=schatzsuche): einmalig zur Schatzsuche-Sektion fuehren, egal ob Elite- oder Fallback-Plan
  function maybeScrollSchatz(){
    if(window.__entryModus !== 'schatzsuche' || window.__szScrolled) return;
    if(!document.getElementById('sz-anchor')) return;
    // Final-Gate M0: Latch NUR armen, wenn der Plan sichtbar ist — der Deep-Link-Eintritt rendert sonst
    // ins versteckte #stage3, verbrennt den Scroll-Latch und die Nutzerin landet kommentarlos auf Stage 1.
    const _s3v = document.getElementById('stage3');
    if(!_s3v || _s3v.offsetParent === null) return;
    window.__szScrolled = true;
    // goStage(Start-Stage) loest beim Init einen SMOOTH-Scroll zur Start-Stage aus, der einen frueheren Schatzsuche-Scroll
    // ueberschreibt. Darum: instant (nicht smooth, sonst vom Elite-Re-Render abgebrochen) + verzoegert + einmal nachsetzen,
    // damit der Schatzsuche-Scroll nach der goStage-Animation gewinnt.
    [500, 950].forEach(function(ms){ setTimeout(function(){
      const el = document.getElementById('sz-anchor');
      if(el){ let _pd = el.closest('details'); while(_pd){ _pd.open = true; _pd = _pd.parentElement ? _pd.parentElement.closest('details') : null; }
        try{ el.scrollIntoView({block:'start'}); }catch(e){ el.scrollIntoView(); } }
    }, ms); });
  }
  function buildSchatzHtml(theme, age){
    if(!theme) return '';
    const size = eliteGroup(age);
    const stations = (theme.stations && theme.stations[size]) || [];
    if(!stations.length) return '';
    const intro = (theme.intro && theme.intro[size]) || '';
    const material = (theme.material && theme.material[size]) || [];   // M5: kuratierte Einkaufsliste war toter Content
    const schatz = Array.isArray(theme.schatz) ? theme.schatz : [];     // M5: Schatz-Ideen war toter Content
    const route = stations.map((s,k)=>`<span class="sz-dot">${k+1}</span>`).join('<span class="sz-line"></span>')
      + '<span class="sz-line"></span><span class="sz-x">'+esc(theme.emoji||'🏴‍☠️')+'</span>';
    const list = stations.map((s,k)=>
      `<details class="egame"><summary><b>${k+1}.</b> ${esc(s.name||'')} <span class="egame__meta">${s.dauer?esc(String(s.dauer))+' Min':''}${s.typ?' · '+esc(s.typ):''}</span></summary>`
      + (s.desc?`<p>${mdLink(s.desc)}</p>`:'')
      + (s.hint?`<p class="sz-hint">🧩 Tipp: ${mdLink(s.hint)}</p>`:'')
      + `</details>`).join('');
    // Sekundaer-Modul: standardmaessig eingeklappt; offen nur bei gezieltem Schatzsuche-Eintritt (?modus=schatzsuche)
    const openAttr = (typeof window !== 'undefined' && window.__entryModus === 'schatzsuche') ? ' open' : '';
    return `<details class="mod sz-mod" id="sz-anchor"${openAttr}><summary class="mod__head"><span class="mod__icon">🗺️</span><h3 class="mod__title">Schatzsuche · ${esc(theme.name||'')} · ${stations.length} Stationen</h3></summary>`
      + (intro?`<p class="evar-intro">${esc(intro.replace(/\{name\}/g, state.name||'das Geburtstagskind'))}</p>`:'')
      + `<div class="sz-map" aria-hidden="true">${route}</div>${list}`
      + (material.length?`<div style="margin-top:12px"><h4 style="font-size:12px;font-weight:800;color:var(--accent,#1E3A5F);margin:0 0 6px">🛒 Material zum Vorbereiten</h4><ul style="margin:0;padding-left:18px;font-size:13px;line-height:1.6">${material.map(m=>`<li>${esc(m)}</li>`).join('')}</ul></div>`:'')
      + (schatz.length?`<div style="margin-top:10px"><h4 style="font-size:12px;font-weight:800;color:var(--accent,#1E3A5F);margin:0 0 4px">🎁 Schatz-Ideen für die Kiste</h4><p style="margin:0;font-size:13px;color:#555">${schatz.map(x=>esc(x)).join(' · ')}</p></div>`:'')
      + `</details>`;
  }
  function setEliteVariant(v){ state.eliteVariant = v; state.eliteOff = []; renderElitePlan(); autoSave(); }   // Varianten-Wechsel: Spiel-Abwahl zuruecksetzen (andere Spielmenge -> sonst stale/0-Count, Reviewer-MAJOR)

  // ===== V3 GENERATIVER PLAN (Spec §10) — erzeugt EINE geordnete activities[] aus dem Spiel-Pool + Standard-Beats.
  // VERDRAHTET: renderElitePlan -> renderPlanList nutzt das (seit 19.06.). Ersetzt den alten schedule/games-Doppelrender.
  function _gameLoud(g){ const l=String((g&&g.loudness)||'').toLowerCase(); if(/laut|hoch|wild|tobe/.test(l)) return 2; if(/leise|ruhig|niedrig|konzentr/.test(l)) return 0; return 1; }
  const _EMO_LEAD = /^[\s\p{Extended_Pictographic}️‍\u{1F3FB}-\u{1F3FF}]+/u;
  const _EMO_GRAB = /^\s*([\p{Extended_Pictographic}️‍\u{1F3FB}-\u{1F3FF}]+)/u;
  function _gameEmoji(n){ const m=String(n||'').match(_EMO_GRAB); return m?m[1]:'🎮'; }
  function _cleanGameTitle(n){ return String(n||'').replace(_EMO_LEAD,'').replace(/\s*[—–-]\s*Spielanleitung\s*$/i,'').trim(); }
  function _planGameCount(variantId){ const s=String(variantId||'').toLowerCase(); if(/wow|max/.test(s)) return 6; if(/min/.test(s)) return 3; return 5; }
  function buildPlanActivities(d, v){
    const loc = state.location;
    let pool = (v.games||[]).filter(g => loc==='park' ? g.outdoor!==false : g.indoor!==false);
    if(!pool.length) pool = (v.games||[]).slice();
    // L6-Dedup: generische Schatzsuche raus (Modul deckt sie), eigenstaendige (Nacht-Schatzsuche) behalten
    pool = pool.filter(g => !/schatz(suche|spur|jagd)/i.test(g.name||'') || /nacht|stirnlampe/i.test(g.name||''));
    const target = Math.max(1, Math.min(_planGameCount(v.id || state.eliteVariant), pool.length));
    const chosen = pool.slice(0, target);   // Daten sind bereits redaktionell sortiert
    // Pacing: nie zwei "laute" hintereinander
    const seq=[]; const rest=chosen.slice();
    while(rest.length){
      const prev = seq[seq.length-1];
      let idx = rest.findIndex(g => !(prev && _gameLoud(prev)===2 && _gameLoud(g)===2));
      if(idx<0) idx=0;
      seq.push(rest.splice(idx,1)[0]);
    }
    const sig = (d && d.signature) || (v && v.signature) || {};
    const acts=[];
    acts.push({ id:'beat-start', kind:'beat', emoji:'🎈', title: sig.opener || 'Ankommen & Verkleidung', desc:'Verkleiden, schminken, in Ruhe ankommen lassen', durationMin:15, anchor:'start' });
    const mid = Math.floor(seq.length/2);
    seq.forEach((g,i)=>{
      if(i===mid){
        acts.push({ id:'schatz', kind:'schatz', emoji:'🗺️', title:'Schatzsuche', desc:'Rätsel-Stationen bis zur Schatztruhe — Höhepunkt der Party', durationMin:30 });
        acts.push({ id:'beat-cake', kind:'beat', emoji:'🎂', title:'Kuchen & Pause', desc:'Kuchen, Snacks und eine kurze Verschnaufpause', durationMin:25, anchor:'mid' });
      }
      acts.push({ id:'game-'+i, kind:'game', emoji: _gameEmoji(g.name), title:_cleanGameTitle(g.name), durationMin:_parseDur(g.duration)||15, gameName:g.name });
    });
    if(seq.length===0){ acts.push({ id:'beat-cake', kind:'beat', emoji:'🎂', title:'Kuchen & Pause', desc:'Kuchen, Snacks und eine kurze Verschnaufpause', durationMin:25, anchor:'mid' }); }
    acts.push({ id:'beat-end', kind:'beat', emoji:'🎁', title: sig.closer || 'Mitgebsel & Abholung', desc:'Mitgebsel-Tüten verteilen, Kinder verabschieden', durationMin:15, anchor:'end' });
    return acts;
  }
  // --- Plan-State (eine Liste, Spec §10.5: Struktur in state.plan, Inhalte bei jedem Render frisch aus v.games) ---
  function _planKey(){ return (state.motto&&state.motto.id||'')+'-'+(state.age||'6-8')+'-'+(state.eliteVariant||'std')+'-'+(state.location||'zuhause'); }   // location im Key: Ortswechsel regeneriert -> Spiele re-filtern (Spec-Leitregel "Ort wirkt", Reviewer-MAJOR #5)
  function ensurePlanActs(d, v){
    const key=_planKey();
    if(!state.plan || state.plan.key!==key || !Array.isArray(state.plan.acts) || !state.plan.acts.length){
      state.plan = { key, acts: buildPlanActivities(d, v) };
    }
    return state.plan.acts;
  }
  function _planTimes(acts){
    const total = acts.reduce((s,a)=>s+(+a.durationMin||10),0)||1;
    const start=_toMin(state.time); const s0=(start!=null)?start:840;
    const end=_toMin(state.endTime);
    const span=(end!=null && end-s0>=30)? end-s0 : total;
    const scale=span/total; let cur=s0;
    return acts.map(a=>{ const t=Math.round(cur/5)*5; cur+=(+a.durationMin||10)*scale; return Object.assign({}, a, {time: fmt(t)}); });
  }
  function _planUid(){ window.__planUid=(window.__planUid||0)+1; return window.__planUid; }
  function planRemove(id){
    const acts=(state.plan&&state.plan.acts)||[]; const a=acts.find(x=>x.id===id); if(!a) return;
    if(a.anchor==='start'||a.anchor==='end') return;                                   // Ankommen/Abholung fix (Spec §10.5)
    if(a.kind==='game' && acts.filter(x=>x.kind==='game').length<=1) return;            // mind. 1 Spiel
    state.plan.acts = acts.filter(x=>x.id!==id);
    renderElitePlan().catch(()=>{}); autoSave();
  }
  function planMove(id, dir){
    const acts=(state.plan&&state.plan.acts)||[]; const i=acts.findIndex(x=>x.id===id); if(i<0) return;
    if(acts[i].anchor==='start'||acts[i].anchor==='end') return;
    const j=i+dir; if(j<=0 || j>=acts.length-1) return;                                 // nie vor Ankommen / hinter Abholung
    const t=acts[i]; acts[i]=acts[j]; acts[j]=t;
    renderElitePlan().catch(()=>{}); autoSave();
  }
  function planAddGame(idx){
    const name=(window.__planPool||[])[idx]; if(name==null) return;
    const acts=(state.plan&&state.plan.acts)||[]; const endIdx=acts.findIndex(x=>x.anchor==='end'); const at=endIdx<0?acts.length:endIdx;
    acts.splice(at,0,{ id:'game-u'+_planUid(), kind:'game', emoji:_gameEmoji(name), title:_cleanGameTitle(name), durationMin:15, gameName:name });
    renderElitePlan().catch(()=>{}); autoSave();
  }
  function planAddCustom(){
    const ti=document.getElementById('pcTitle'), du=document.getElementById('pcDur');
    const title=(ti&&ti.value||'').trim(); if(!title){ ti&&ti.focus(); return; }
    const dur=Math.max(5, parseInt(du&&du.value)||15);
    const acts=(state.plan&&state.plan.acts)||[]; const endIdx=acts.findIndex(x=>x.anchor==='end'); const at=endIdx<0?acts.length:endIdx;
    acts.splice(at,0,{ id:'custom-u'+_planUid(), kind:'custom', emoji:'⭐', title, durationMin:dur });
    renderElitePlan().catch(()=>{}); autoSave();
  }
  function togglePlanForm(){ const f=document.getElementById('planCustomForm'); if(f) f.classList.toggle('open'); }
  // --- Renderer: EINE Liste (Spec §10) ---
  function _eliteGameDetails(g){
    if(!g) return '';
    const steps=(g.steps||[]).map(st=>`<li>${mdLink(st.content||st.name||st)}</li>`).join('');
    const tip=eliteLocTip(g), adj=eliteAgeAdjust(g);
    return `${g.material?`<p><b>Material:</b> ${mdLink(g.material)}</p>`:''}${g.prepText?`<p><b>Vorbereitung:</b> ${mdLink(g.prepText)}</p>`:''}${steps?`<ol>${steps}</ol>`:''}${g.safetyRule?`<p class="egame__safe">⚠️ ${esc(g.safetyRule)}</p>`:''}${tip?`<p style="font-size:13px;color:#1E7B34;margin:6px 0">📍 ${esc(tip)}</p>`:''}${adj?`<p style="font-size:13px;color:#7a5c00;margin:6px 0">👶 Für ${esc(state.age||'')} J.: ${esc(adj)}</p>`:''}${g.whyItWorks?`<p class="egame__why"><b>${esc(g.whyItWorksTitle||'Warum es wirkt')}:</b> ${esc(g.whyItWorks)}</p>`:''}`;
  }
  function renderPlanList(d, v, schatzHtml){
    const acts=_planTimes(ensurePlanActs(d,v));
    const gameCount=acts.filter(a=>a.kind==='game').length;
    const planStart=acts.length?acts[0].time:(state.time||''); const planEnd=acts.length?fmt(_toMin(acts[acts.length-1].time)+(+acts[acts.length-1].durationMin||10)):'';
    const gByName={}; (v.games||[]).forEach(g=>gByName[g.name]=g);
    const rows=acts.map(a=>{
      const fixed=(a.anchor==='start'||a.anchor==='end');
      const ctrl=fixed?'':`<span class="pl__ctrl"><button type="button" title="nach oben" onclick="planMove('${a.id}',-1)">▲</button><button type="button" title="nach unten" onclick="planMove('${a.id}',1)">▼</button><button type="button" class="pl__rm" title="entfernen" onclick="planRemove('${a.id}')">×</button></span>`;
      const rowInner=`<div class="pl__time">${esc(a.time)}</div><div class="pl__title"><span>${esc(a.emoji||'')} ${esc(a.title)}</span><span class="pl__dur">${a.desc?esc(a.desc)+' · ':''}${+a.durationMin||10} Min</span></div>${ctrl}`;
      if(a.kind==='game'){ const det=_eliteGameDetails(gByName[a.gameName]); return `<details class="pl__item pl__item--game"><summary class="pl__row">${rowInner}</summary>${det?`<div class="pl__body">${det}</div>`:''}</details>`; }
      if(a.kind==='schatz'){ return `<details class="pl__item pl__item--schatz"><summary class="pl__row">${rowInner}</summary><div class="pl__body">${schatzHtml||'<p style="font-size:13px;color:#666;margin:8px 0">Schatzsuche-Stationen werden unten im Schatz-Modul ausgespielt.</p>'}</div></details>`; }
      return `<div class="pl__item pl__item--beat"><div class="pl__row">${rowInner}</div></div>`;
    }).join('');
    // ungenutzte Pool-Spiele zum Hinzufuegen
    const inPlan=new Set(acts.filter(a=>a.kind==='game').map(a=>a.gameName));
    const unused=(v.games||[]).filter(g=>!inPlan.has(g.name) && (!/schatz(suche|spur|jagd)/i.test(g.name||'')||/nacht|stirnlampe/i.test(g.name||'')));
    window.__planPool=unused.map(g=>g.name);
    const addGames=unused.length?`<div class="pl__add"><span class="pl__add-lbl">Weiteres Spiel:</span> ${unused.map((g,i)=>`<button type="button" class="pl__chip" onclick="planAddGame(${i})">+ ${esc(_cleanGameTitle(g.name))}</button>`).join('')}</div>`:'';
    return `<article class="mod"><header class="mod__head"><span class="mod__icon">🗓️</span><h3 class="mod__title">Dein Plan${planStart?' · '+esc(planStart)+'–'+esc(planEnd):''} · ${gameCount} Spiele</h3></header>
      <p class="games-hint">Tipp: ▲▼ verschieben, × entfernt einen Punkt, „+" nimmt ein Spiel dazu. Spiel antippen für die Anleitung.</p>
      <div class="pl">${rows}</div>
      ${addGames}
      <div class="pl__addrow"><button type="button" class="pl__chip pl__chip--cust" onclick="togglePlanForm()">+ Eigener Programmpunkt</button>
        <div class="plan-cust-form" id="planCustomForm"><input type="text" id="pcTitle" placeholder="z.B. Geschenke auspacken" maxlength="60"><input type="number" id="pcDur" value="15" min="5" max="120" title="Minuten"><button type="button" class="pl__chip" onclick="planAddCustom()">Hinzufügen</button></div>
      </div>
    </article>`;
  }
  // ===== PLAN-ENGINE Helfer — parametrisiert vorhandene v1-Daten (siehe _dev/docs/PLAN-ENGINE-SPEC.md) =====
  function _toMin(t){ const m=String(t==null?'':t).match(/(\d\d?):(\d\d)/); return m? (+m[1])*60+(+m[2]) : null; }
  function _parseDur(d){ if(typeof d==='number') return d; const m=String(d==null?'':d).match(/\d+/); return m? +m[0] : 0; }
  // (V2 eliteSchedule + eliteGamesForLoc entfernt — V3 generiert den Plan via buildPlanActivities/_planTimes, Spec §10)
  function eliteLocTip(g){ return (state.location==='park') ? (g.outdoorTip||'') : (g.indoorTip||''); }
  // Alters-Anpassung je Spiel (reiche Dateien: ageAdjust3/5/6/8)
  function eliteAgeAdjust(g){ const map={'3-5':['ageAdjust3','ageAdjust5'],'6-8':['ageAdjust6','ageAdjust8'],'9-12':['ageAdjust8','ageAdjust6']}; for(const k of (map[state.age||'6-8']||[])){ if(g[k] && g[k]!=='—') return g[k]; } return ''; }
  // Einkauf: Basis-Kinderzahl aus costContext, Header auf echte Gaestezahl (loest 6-vs-8-Widerspruch); Stueckpreise = Pack-Preise (qtyRule spaeter)
  /* Bolle 05.08.: Pflicht und Optional trennen — genau wie das Einkaufsblatt
     im Paket. Vorher summierte diese Seite ALLES und das Paket nur die
     Pflicht-Posten; bei dino-mittel/wow standen deshalb "ca. 103 €" hier und
     "63 €" dort fuer dieselbe Party. Zwei Preise fuer eine Party sind schlimmer
     als ein unbequemer Preis.
     Das Kriterium muss identisch bleiben mit paket/*/index.html und
     _dev/scripts/check-preisversprechen.py — drei Stellen, ein Massstab. */
  function _eliteOptional(s){ const l=String((s&&s.label)||''); return /^Optional:/.test(l) || /\(([^)]*\boptional\b[^)]*)\)/i.test(l); }
  function eliteShop(list, costContext){ const m=String(costContext==null?'':costContext).match(/(\d+)\s*Kinder/); const base=m?+m[1]:8; const guests=(state.guests>0)?state.guests:base; let sum=0, extra=0; (list||[]).forEach(s=> { if(_eliteOptional(s)) extra+=(s.priceEur||0); else sum+=(s.priceEur||0); }); return {sum, extra, base, guests, perChild: guests? Math.round(sum/guests*10)/10 : 0}; }

  // Countdown-Vorbereitungsplan aus data/motto (preparationWeeks). Zwei Daten-Schemas im Bestand:
  //  A) Dict {minus4Weeks…dayOf: {headline, items:[{icon,title,detail} | string]}}  (39 Dateien)
  //  B) List [{week, tasks:[string]}]  (prinzessin/superheld, 6 Dateien)
  // Fold-Modul (Bolle 13.07.): Zusatz-Inhalte zu by default — der Plan-Screen fokussiert auf Tagesplan + Spiele.
  function foldMod(icon, titleHtml, innerHtml, open){
    if(!innerHtml) return '';
    return `<details class="mod mod--fold"${open ? ' open' : ''}><summary><span class="mod__icon">${icon}</span><h3 class="mod__title">${titleHtml}</h3><span class="mod__chev">▾</span></summary><div class="mod__fold-body">${innerHtml}</div></details>`;
  }
  function elitePrep(pw){
    if(!pw) return '';
    let phases = [];
    if(Array.isArray(pw)){
      phases = pw.map(p => ({ head: p.week || '', lines: (p.tasks||[]).map(t => ({icon:'', title:'', detail: (typeof t==='string' ? t : (t && (t.detail||t.title)) || '')})) }));
    } else {
      phases = Object.keys(pw).map(k => { const ph = pw[k] || {}; return { head: ph.headline || '', lines: (ph.items||[]).map(it => typeof it==='string' ? {icon:'', title:'', detail: it} : {icon: it.icon||'', title: it.title||'', detail: it.detail||''}) }; });
    }
    phases = phases.filter(p => p.head || (p.lines && p.lines.length));
    if(!phases.length) return '';
    const inner = phases.map(p => `<details class="egame"><summary>${esc(p.head)}</summary><ul class="etips">${p.lines.map(l => `<li>${l.icon?esc(l.icon)+' ':''}${l.title?`<b>${esc(l.title)}</b>${l.detail?' — ':''}`:''}${l.detail?mdLink(l.detail):''}</li>`).join('')}</ul></details>`).join('');
    return foldMod('🗓️', 'Countdown: Was wann vorbereiten', inner);
  }

  async function renderElitePlan(){
    if(!state.motto) return;
    const reqMotto = state.motto.id, reqAge = state.age || '6-8';   // Bug A: Identitaet vor await capturen
    const [d, allSchatz] = await Promise.all([getElite(reqMotto, reqAge), getSchatz()]);
    if(!state.motto || state.motto.id !== reqMotto || (state.age||'6-8') !== reqAge) return; // Motto/Alter waehrend Fetch gewechselt -> spaeten Render verwerfen
    if(!d){
      // Kein Elite-Plan, aber Schatzsuche-Daten existieren: generische Fallback-Schatzsuche ersetzen.
      const _theme = (allSchatz||[]).find(t => t.id === reqMotto);
      const _rich = _theme ? buildSchatzHtml(_theme, reqAge) : '';
      const _old = document.getElementById('sz-anchor');
      if(_rich && _old) _old.outerHTML = _rich;
      maybeScrollSchatz();
      return;
    }
    const v = currentVariant(d); if(!v) return;
    const body = document.getElementById('planBody'); if(!body) return;
    const schatzHtml = buildSchatzHtml((allSchatz||[]).find(t => t.id === reqMotto), reqAge);

    const vtabs = (d.variants || []).map(x =>
      `<button class="evar ${x.id === v.id ? 'evar--on' : ''}" onclick="setEliteVariant('${escA(x.id)}')">${esc((x.label||x.id).split('—')[0].trim())}</button>`
    ).join('');

    // ENGINE V3 (Spec §10): Tagesplan + Spiele = EINE generierte Liste -> renderPlanList(d, v, schatzHtml).

    // ENGINE: Einkauf-Header auf echte Gaestezahl
    const sh = eliteShop(v.shoppingList, v.costContext);
    const shop = (v.shoppingList || []).map(s => {
      const label = `${s.emoji ? esc(s.emoji)+' ' : ''}${esc(s.label||'')}`;
      const reason = s.categoryReasoning ? ` title="${escA(s.categoryReasoning)}"` : '';
      const price = s.priceEur ? ` <span class="eshop__price">${esc(String(s.priceEur))} €</span>` : '';
      // Bolle 13.07.: KOMPLETT Affiliate — Items ohne kuratierte URL bekommen einen Amazon-Suchlink (Tag, plain &, L3).
      const term = String(s.label||'').replace(/\(.*?\)/g, '').trim();
      const url = s.url || (term ? 'https://www.amazon.de/s?k=' + encodeURIComponent(term) + '&tag=machsleicht21-21' : '');
      return url
        ? `<li${reason}><a href="${escA(url)}" target="_blank" rel="sponsored noopener">${label}</a>${price}</li>`
        : `<li${reason}>${label}${price}</li>`;
    }).join('');
    const shopMeta = `ca. ${sh.sum} € · ${sh.perChild} €/Kind · ${sh.guests} ${sh.guests===1?'Kind':'Kinder'}${sh.extra?` · optional +${sh.extra} €`:''}${sh.guests>sh.base?' · Mengen ggf. erhöhen':''}`;

    // SURFACE: bisher ungenutzte Felder (lagen im JSON brach)
    const extras = (v.food||v.decoration||v.giveaways) ? foldMod('🎈', 'Essen, Deko & Mitgebsel', `${v.food?`<p><b>🍰 Essen:</b> ${mdLink(v.food)}</p>`:''}${v.decoration?`<p><b>🎀 Deko:</b> ${mdLink(v.decoration)}</p>`:''}${v.giveaways?`<p><b>🎁 Mitgebsel:</b> ${mdLink(v.giveaways)}</p>`:''}`) : '';
    const saving = (v.savingsTip && (v.savingsTip.title||v.savingsTip.body)) ? foldMod('💰', esc(v.savingsTip.title||'Spar-Tipp'), `<p>${mdLink(v.savingsTip.body||'')}</p>`) : '';

    const cake = d.cakeRecipe ? foldMod('🎂', 'Kuchen-Rezept', `${d.cakeRecipe.intro?`<p>${mdLink(d.cakeRecipe.intro)}</p>`:''}<ol>${(d.cakeRecipe.steps||[]).map(st=>`<li>${mdLink(st.content||'')}</li>`).join('')}</ol>`) : '';
    const tips = (d.parentTips && d.parentTips.structured) ? foldMod('💡', 'Eltern-Tipps', `<ul class="etips">${d.parentTips.structured.map(t=>`<li><b>${esc(t.topic||'')}</b> ${mdLink(t.detail||'')}</li>`).join('')}</ul>`) : '';
    const faq = (d.faq && d.faq.length) ? foldMod('❓', 'Häufige Fragen', d.faq.map(f=>`<details class="egame"><summary>${esc(f.q||'')}</summary><p>${mdLink(f.a||'')}</p></details>`).join('')) : '';

    body.innerHTML = `
      <div class="evar-label">Aufwand wählen:</div>
      <div class="evar-row" role="tablist" aria-label="Aufwand-Variante">${vtabs}</div>
      ${v.intro ? `<p class="evar-intro">${mdLink(v.intro)}</p>` : ''}
      ${renderPlanList(d, v, schatzHtml)}
      ${foldMod('🛒', `Einkaufsliste · ${esc(shopMeta)}`, `<p class="eshop__note">Alle Artikel verlinken zu Amazon (Werbelinks) — der Preis bleibt für dich gleich, wir erhalten ggf. eine kleine Provision.</p><ul class="eshop">${shop}</ul>`)}
      ${extras}${saving}${cake}${elitePrep(d.preparationWeeks)}${tips}${faq}
      <p class="eshop__note" style="padding:14px 24px 0">* Werbelink zu Amazon — der Preis bleibt für dich gleich, wir erhalten ggf. eine kleine Provision.</p>
    `;
    maybeScrollSchatz();   // nur NACH Stale-Guard -> Elite-Pfad armt Scroll-Latch nur beim gewinnenden Render (H2)
  }

  function buildTimeline(){
    const startHour = parseInt(state.time.split(':')[0]);
    const startMin = parseInt(state.time.split(':')[1]);
    const start = startHour * 60 + startMin;
    const isShort = state.age === '3-5';
    const mottoName = state.motto?.name || 'Piraten';
    const persona = state.motto?.persona || 'Pirat';
    const emoji = state.motto?.emoji || '🏴‍☠️';
    const firstGame = (state.motto?.games || [{name:'Spiel 1'}])[0].name;
    const secondGame = (state.motto?.games || [{},{name:'Spiel 2'}])[1]?.name || 'Spiel 2';

    const baseItems = [
      {min:0, title:`Ankommen + ${emoji} Kostüm`, desc:'Schminke, Fotos, Aufwärm-Spiel'},
      {min:20, title:`${persona}-Versammlung`, desc:`${state.name} begrüßt + ${mottoName}-Eid`},
      {min:35, title:`Spiel: ${firstGame}`, desc:'Material steht bereit'},
      {min:60, title:'🗺️ Schatzsuche', desc:isShort ? '3 Stationen' : '5 Stationen'},
      {min:isShort ? 90 : 105, title:'Kuchen + Kaffee', desc:'Eltern-Pause'},
      ...(isShort ? [] : [{min:135, title:`Spiel: ${secondGame}`, desc:''}]),
      {min:isShort ? 150 : 160, title:'Mitgebsel + Verabschiedung', desc:'Urkunden + Schatzbeutel'}
    ];

    // Auto-Skalierung: Basis-Programm proportional ins Fenster [Start, Endzeit] stauchen/strecken
    const naturalSpan = baseItems[baseItems.length-1].min || 1;
    let end = null;
    if(state.endTime && /^\d\d?:\d\d$/.test(state.endTime)){ const [eh,em]=state.endTime.split(':').map(Number); end = eh*60+em; }
    const span = (end != null && (end - start) >= 30) ? (end - start) : naturalSpan;  // ungültig/zu kurz → Natur-Dauer
    const scale = span / naturalSpan;

    const base = baseItems.map((i,bi) => { const t = Math.round((start + i.min*scale)/5)*5; return {time:fmt(t), title:esc(i.title), desc:esc(i.desc), custom:false, sortKey:t+bi*0.01}; });
    const customs = (state.customEntries || []).map((c, idx) => {
      const [h,m] = c.time.split(':').map(Number);
      return {time:c.time, title:esc(c.title), desc:'', dur:c.dur, custom:true, customIdx:idx, sortKey:h*60+m+0.005};
    });
    return [...base, ...customs].sort((a,b) => a.sortKey - b.sortKey);
  }
  function fmt(m){ return String(Math.floor(m/60)).padStart(2,'0') + ':' + String(m%60).padStart(2,'0') }
  function formatDateShort(s){ const d = new Date(s); return d.toLocaleDateString('de-DE',{weekday:'short', day:'2-digit', month:'2-digit', year:'numeric'}); }
  function formatDateLong(s){ const d = new Date(s); return d.toLocaleDateString('de-DE',{weekday:'long', day:'numeric', month:'long'}); }
  function locationLabel(l){ return {zuhause:'zuhause', drinnen:'drinnen', park:'im Park', halle:'in der Halle'}[l] || l; }

  // ===== CUSTOM TIMELINE =====
  function toggleTimelineForm(){
    document.getElementById('timelineForm').classList.toggle('open');
    checkTimelineConflict();
  }
  function checkTimelineConflict(){
    const timeEl = document.getElementById('cusTime');
    if(!timeEl) return;
    const time = timeEl.value;
    const warn = document.getElementById('timelineWarn');
    const warnTitle = document.getElementById('timelineWarnTitle');
    const timeline = buildTimeline();
    const conflict = timeline.find(r => r.time === time);
    if(conflict){
      warnTitle.textContent = conflict.title.replace(/<[^>]+>/g,'').slice(0,40);
      warn.classList.add('show');
    } else {
      warn.classList.remove('show');
    }
  }
  function addCustomEntry(){
    const time = document.getElementById('cusTime').value;
    const title = document.getElementById('cusTitle').value.trim();
    const dur = parseInt(document.getElementById('cusDur').value);
    if(!title){ alert('Bitte einen Titel eingeben'); return; }
    if(!time || !/^\d{1,2}:\d{2}$/.test(time)){ alert('Bitte eine gültige Uhrzeit angeben'); return; }   // C6: leere Zeit -> NaN-Sortierung verhindern
    state.customEntries.push({time, title, dur});
    document.getElementById('cusTitle').value = '';
    document.getElementById('timelineForm').classList.remove('open');
    renderPlanPreview();
    autoSave();
  }
  function deleteCustomEntry(idx){
    if(idx < 0) return;
    state.customEntries.splice(idx, 1);
    renderPlanPreview();
    autoSave();
  }

  // ===== STAGE NAV =====
  const STAGE_ORDER = [1, 2, 4, 3, 5];               // logische Schritt-Reihenfolge der Stage-IDs
  const ORD = id => STAGE_ORDER.indexOf(id);
  function goStage(n){
    if(n > 5) n = 5;   // Migration: alte localStorage-States (6-Stage-Funnel) auf den gemergten 5-Stage-Funnel klemmen
    state.stage = n;
    document.querySelectorAll('.stage').forEach(s => s.classList.remove('active'));
    const el = document.getElementById('stage'+n);
    if(el) el.classList.add('active');
    // Phase B (Bolle 13.07.): logische Ordnung Motto -> Eckdaten -> EINLADUNG(4) -> PLAN(3) -> Fertig.
    // Stage-IDs bleiben stabil (Resume/Analytics), nur Reveal + Dots folgen STAGE_ORDER.
    const cur = ORD(n);
    STAGE_ORDER.forEach(id => { if(id >= 3 && ORD(id) <= cur){ const rs = document.getElementById('stage'+id); if(rs && !rs.classList.contains('revealed')){ rs.classList.add('revealed'); if(id !== n && id === 4){ try{renderInvitePreview()}catch(e){} try{renderPartyseitePreview()}catch(e){} } } } });
    for(let i=1; i<=5; i++){
      const dot = document.getElementById('navDot'+i);
      if(!dot) continue;
      dot.classList.remove('done','active','locked');
      let _locked = false;
      if(ORD(i) < cur) dot.classList.add('done');
      else if(i === n) dot.classList.add('active');
      else { const s = document.getElementById('stage'+i); if(i >= 3 && !(s && s.classList.contains('revealed'))){ dot.classList.add('locked'); _locked = true; } }
      dot.setAttribute('tabindex', _locked ? '-1' : '0');   // A11y: gelockte Dots aus der Tab-Reihenfolge nehmen
    }
    const ds = document.getElementById('demoStage'); if(ds) ds.textContent = (cur + 1);
    // plan_ready = ECHTER personalisierter Aha (Name gesetzt). Deep-Link/Nav-Sprung/Resume/Zurueck ohne Name zaehlen NICHT (sonst luegt die North-Star-Zahl).
    if(n === 3 && !state._planReadyFired && state.name && state.name.trim()){ state._planReadyFired = true; try{ if(window.plausible){ const _mid=(state.motto&&state.motto.id||'').indexOf('custom')===0?'custom':(state.motto&&state.motto.id||''); plausible('plan_ready', {props:{motto:_mid, personalized:true}}); } }catch(e){} }
    if(n === 3){ try{ renderPlanPreview(); }catch(e){}   // Final-Gate M1: Eckdaten-Aenderungen (v.a. Gaeste) beim Rueckweg in den Plan uebernehmen
      if(window.__syncStickyMorph){ try{ window.__syncStickyMorph(); }catch(e){} } }
    if(n === 4){ renderInvitePreview(); renderPartyseitePreview(); }
    if(n === 5) renderDoneSummary();
    autoSave();
    // T1: Funnel-Tracking NUR bei Vorwaerts-Progression zu einer neuen Stage (Rueckwaerts-Navigation verzerrt sonst den Drop-off).
    try{ if(window.plausible && ORD(n) > ORD(state._maxStage||1)){ /* Final-Gate M2: Ordnungs- statt ID-Vergleich */ state._maxStage = n; const mid=(state.motto&&state.motto.id||'').indexOf('custom')===0?'custom':(state.motto&&state.motto.id||''); plausible('wizard_stage', {props:{stage:String(n), motto:mid}}); } }catch(e){}
    if(el) el.scrollIntoView({behavior:'smooth', block:'start'});  // Scroll-Funnel: zum Abschnitt scrollen statt toggeln
  }
  function jumpStage(n){
    // Nur zu bereits freigeschalteten Abschnitten springen — kein Voraus-Springen im Funnel (Stage 1/2 immer offen).
    if(n >= 3){ const t = document.getElementById('stage'+n); if(!(t && t.classList.contains('revealed'))) return; }
    return goStage(n);
  }

  // ===== WIZARD =====
  function openWizard(jumpTo){
    document.getElementById('drawer').classList.add('open');
    document.getElementById('overlay').classList.add('show');
    document.body.style.overflow = 'hidden';
    setStep(jumpTo || 1);
    document.getElementById('qName').value = state.name === 'Lukas' ? '' : state.name;
    document.getElementById('qDate').value = state.date;
    document.getElementById('qTime').value = state.time;
    { const e = document.getElementById('qEndTime'); if(e) e.value = state.endTime || '16:30'; }
    document.getElementById('qGuests').value = state.guests;
    document.getElementById('qGuestsLabel').textContent = state.guests;
    document.querySelectorAll('#qLocationOpts .option').forEach(o => o.classList.toggle('selected', o.dataset.loc === state.location));
  }
  function closeWizard(){
    document.getElementById('drawer').classList.remove('open');
    document.getElementById('overlay').classList.remove('show');
    document.body.style.overflow = '';
    renderPlanPreview();
    autoSave();
  }
  function setStep(n){
    state.step = n;
    document.getElementById('stepNum').textContent = n;
    document.querySelectorAll('.question').forEach(q => q.classList.remove('active'));
    const target = document.querySelector(`.question[data-step="${n}"]`);
    if(target) target.classList.add('active');
    for(let i=1; i<=4; i++){
      const el = document.getElementById('p'+i);
      if(!el) continue;
      el.classList.remove('done','active');
      if(i < n) el.classList.add('done');
      else if(i === n) el.classList.add('active');
    }
    document.getElementById('btnBack').style.display = n > 1 ? 'inline-block' : 'none';
    document.getElementById('btnNext').textContent = n === 4 ? '✓ Plan ansehen' : 'Weiter →';
  }
  function stepNext(){ if(state.step < 4) setStep(state.step + 1); else closeWizard(); }
  function stepBack(){ if(state.step > 1) setStep(state.step - 1) }

  // Nebeneffektfreies Name-Gate (KEIN autoSave/Slug -> sicher aus syncEckdaten/initFunnel aufrufbar ohne den Save zu clobbern):
  // Button-Enabled folgt state.name.
  function syncPlanGate(){
    const tpb = document.getElementById('toPlanBtn');
    if(!tpb) return;
    // KEIN disabled (Anti-Pattern: toter Button ohne Klick-Feedback). Button bleibt klickbar; revealPlan() ist das Verhaltens-Gate
    // (zeigt Hint, scrollt zu #eckdaten, fokussiert iqName bei leerem Namen). Hier nur visueller Zustand + Label.
    if(state.name && state.name.trim()){ tpb.style.opacity=''; tpb.style.cursor=''; tpb.textContent='Weiter zur Einladung →'; const h=document.getElementById('nameReqHint'); if(h) h.style.display='none'; }
    else { tpb.style.opacity='.6'; tpb.style.cursor='pointer'; tpb.textContent='Erst Namen eintragen ✏️'; }
  }
  // Possessiv nach Bolle-Konvention: Name + 's, ausser Zischlaut-Endung (s/ß/x/z) -> nur Apostroph (Mats').
  function poss(s){ s = String(s == null ? "" : s).trim(); return s ? (s + (/(s|ß|x|z)$/i.test(s) ? "'" : "'s")) : s; }
  function liveUpdateName(){
    state.name = document.getElementById('qName').value.trim();
    document.getElementById('planName1').textContent = (state.name && state.name.trim()) ? poss(state.name.trim()) : 'dein Kind';
    syncPlanGate();   // Button-Enabled-State aktualisieren (zustandsgekoppelt)
    // F3: Auto-Slug aus Name+Age (Live-Konvention: name-age)
    const newSlug = state.name.toLowerCase().replace(/[^a-z0-9]/g,'') + ageNum();
    if(state.partyseite.slug.match(/^lukas7$|^lukas\d+$|^[a-z]+\d+$/) || !state.partyseite.active){
      state.partyseite.slug = newSlug;
      const slugEl = document.getElementById('psSlug'); if(slugEl) slugEl.value = newSlug;
    }
    autoSave();
  }
  function liveUpdateDate(){ const v = document.getElementById('qDate').value; if(!v) return; state.date = v; document.getElementById('planDate1').textContent = formatDateShort(v) + ', ' + state.time + ' Uhr'; autoSave() }
  function liveUpdateTime(){ state.time = document.getElementById('qTime').value; document.getElementById('planDate1').textContent = formatDateShort(state.date) + ', ' + state.time + ' Uhr'; if(state.motto) renderPlanPreview(); autoSave() }
  function liveUpdateEndTime(){ state.endTime = document.getElementById('qEndTime').value; if(state.motto) renderPlanPreview(); autoSave() }
  function liveUpdateGuests(){ const v = +document.getElementById('qGuests').value; state.guests = v; document.getElementById('qGuestsLabel').textContent = v; document.getElementById('planGuests1').textContent = v; const il=document.getElementById('iqGuestsLabel'); if(il) il.textContent = v; autoSave() }
  // Inline-Eckdaten (Scroll-Funnel)
  function pickLocationInline(loc){
    state.location = loc;
    document.querySelectorAll('#qLocationOpts .option').forEach(o => o.classList.toggle('selected', o.dataset.loc === loc));
    document.querySelectorAll('#iqLocation button').forEach(b => b.classList.toggle('on', b.dataset.loc === loc));
    if(state.motto) renderPlanPreview();
    autoSave();
  }
  function syncEckdaten(){
    const set=(id,v)=>{ const e=document.getElementById(id); if(e!=null) e.value=v; };
    const nm = state.name==='Lukas' ? '' : (state.name||'');
    set('iqName', nm);
    set('qName', nm);   // Drawer-Spiegel mitziehen, damit das Name-Gate (liest qName) auch bei Restore/Deep-Link stimmt
    set('iqDate', state.date);
    set('iqTime', state.time);
    set('iqEndTime', state.endTime||'16:30');
    set('iqGuests', state.guests);
    const gl=document.getElementById('iqGuestsLabel'); if(gl) gl.textContent = state.guests;
    document.querySelectorAll('#iqLocation button').forEach(b => b.classList.toggle('on', b.dataset.loc===state.location));
    // Gate ZUSTANDSGEKOPPELT statt nur keystroke: Button-Enabled folgt state.name (nicht nur dem oninput-Event).
    // Schliesst das Stranden bei Restore/Deep-Link (Button war sonst disabled trotz vorhandenem Namen). Sichtbarkeit bleibt
    // bewusst an pickAge/Deep-Link/resumeWork gekoppelt (NICHT an state.age, da das per Default '6-8' ist -> sonst Virgin-Vorschau).
    try{ if(typeof syncPlanGate==='function') syncPlanGate(); }catch(e){}
  }

  document.querySelectorAll('#qLocationOpts .option').forEach(opt => {
    const selectLoc = () => {
      document.querySelectorAll('#qLocationOpts .option').forEach(o => { o.classList.remove('selected'); o.setAttribute('aria-pressed','false'); });
      opt.classList.add('selected'); opt.setAttribute('aria-pressed','true');
      state.location = opt.dataset.loc;
      document.getElementById('planLocation1').textContent = locationLabel(state.location);
      autoSave();
    };
    opt.addEventListener('click', selectLoc);
    opt.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' '){ e.preventDefault(); selectLoc(); } });   // A11y: Tastatur-Bedienbarkeit (WCAG 2.1.1)
  });

  function renderGamesMulti(){
    const grid = document.getElementById('qGamesMulti');
    if(!state.motto || !state.motto.games){ grid.innerHTML = '<p style="color:#999">(Spiele werden nach Motto-Auswahl geladen)</p>'; return; }
    const available = gamesForAge(state.motto, state.age || '6-8');
    grid.innerHTML = available.map(g => {
      const sel = state.games.includes(g.name);
      const showPrev = !!(g.curated || g.material || g.brief);
      const nm = (g.name||'').replace(/"/g,'&quot;');
      return `<label class="multi-item ${sel ? 'selected' : ''}" data-game="${nm}" role="button" tabindex="0" aria-pressed="${sel?'true':'false'}">
        <span class="multi-item__check">${sel ? '✓' : ''}</span>
        <span class="multi-item__emoji">${g.emoji}</span>
        <span class="multi-item__name">${nm}</span>
        ${showPrev ? `<button type="button" class="multi-item__prev" data-prev="${nm}" aria-label="Vorschau ${nm}">ⓘ Vorschau</button>` : ''}
      </label>`;
    }).join('');
    grid.querySelectorAll('.multi-item').forEach(item => {
      const toggle = () => {
        const name = item.dataset.game;
        if(state.games.includes(name)) state.games = state.games.filter(n => n !== name);
        else state.games.push(name);
        renderGamesMulti();
        // Fokus nach Re-Render auf dasselbe Item zurueck (sonst springt Tastatur-Fokus auf body)
        try{ const again = document.querySelector('#qGamesMulti .multi-item[data-game="'+CSS.escape(name)+'"]'); if(again) again.focus(); }catch(e){}
        autoSave();
      };
      item.addEventListener('click', e => {
        const prev = e.target.closest('.multi-item__prev');
        if(prev){ e.preventDefault(); openGameDetail(prev.dataset.prev); return; }   // Vorschau öffnen statt togglen
        e.preventDefault();
        toggle();
      });
      item.addEventListener('keydown', e => {   // A11y: Enter/Space togglen (echtes <button> der Vorschau handhabt sich selbst)
        if(e.target.closest('.multi-item__prev')) return;
        if(e.key==='Enter'||e.key===' '){ e.preventDefault(); toggle(); }
      });
    });
    document.getElementById('multiCount').textContent = state.games.length;
  }

  // ===== STAGE 4: EINLADUNG (mit echten URLs) =====
  function setInviteType(t){
    state.invite.type = t;
    document.querySelectorAll('.invite-type-btn').forEach(b => b.classList.toggle('active', b.dataset.itype === t));
    renderInvitePreview();
    autoSave();
  }

  function renderInvitePreview(){
    // Studio-CTA nur zeigen, wenn der Autopilot druesben auch startet — Studio-Gate ist plannerStateReady =
    // name + canonicalThemeId(motto.id): custom-Mottos haben (noch) kein Studio-Theme und muessen hier raus,
    // sonst Demo-Editor-Enttaeuschung. 'flex' explizit (A2-1): '' loescht das Inline-display:flex des Containers.
    // A3-8 Gate-Paritaet: Cross-Referenz zu plannerStateReady in einladung/studio/index.html — jedes NEUE
    // Funnel-Motto braucht einen Studio-themes-Eintrag, sonst verspricht der CTA hier, was drueben verneint wird.
    // A5-10: strukturelle Gate-Paritaet statt Konvention — CTA nur wenn das Motto WIRKLICH in MOTTOS liegt
    // (Studio-plannerStateReady verlangt canonicalThemeId ∈ 15 themes; Alt-/Fremd-State-IDs & custom fallen raus).
    const _sc = document.getElementById('studioCta');
    if(_sc) _sc.style.display = (state.name && state.name.trim() && state.motto && state.motto.id && String(state.motto.id).indexOf('custom') !== 0 && MOTTOS.some(m => m.id === state.motto.id)) ? 'flex' : 'none';
    try{ buildAutopilotHref(); }catch(e){}   // Gate-Fix: href beim Render vorbefuellen -> "Link kopieren"/Middle-Click tragen die Parameter (nicht nur der Klick)
    const titleEl = document.getElementById('iTitle');
    const bodyEl = document.getElementById('iBody');
    const deadlineEl = document.getElementById('iDeadline');
    if(titleEl){
      if(!titleEl.value) titleEl.value = state.invite.title || (state.motto?.invite?.title || 'Du bist eingeladen!');
      if(!bodyEl.value) bodyEl.value = state.invite.body || `${state.name} wird ${ageNum()} und feiert!`;
      // Antwort-Frist dynamisch aus dem Party-Datum ableiten (Party − 7 Tage) statt hartkodiertem Datum,
      // sonst verschickt man eine Einladung mit bereits abgelaufener Frist (Review-Befund 15.06.2026).
      if(deadlineEl && !deadlineEl.value){
        let dl='';
        try{ if(state.date){ const d=new Date(state.date); d.setDate(d.getDate()-7); if(!isNaN(d.getTime())) dl='Bitte Bescheid geben bis '+String(d.getDate()).padStart(2,'0')+'.'+String(d.getMonth()+1).padStart(2,'0')+'.'; } }catch(e){}
        if(dl) deadlineEl.value = dl;
      }
      state.invite.title = titleEl.value;
      state.invite.body = bodyEl.value;
      state.invite.deadline = deadlineEl.value || state.invite.deadline;
    }

    const c = document.getElementById('invitePreviewContent');
    if(!c) return;
    const dateStr = formatDateLong(state.date);
    const motto = state.motto || MOTTOS[0];
    // K1-Fix: User-Inputs vor innerHTML escapen (Plain-Text-/URL-Sinks unten bleiben roh)
    const eName = esc(state.name), eTitle = esc(state.invite.title), eBody = esc(state.invite.body), eDeadline = esc(state.invite.deadline);
    // Einladungs-Handoff zu /einladung/erstellen ENTFERNT (11.06.2026, Funnel-Repair): kein Phantom-Link, keine
    // Neueingabe mehr. Der EINE teilbare Link entsteht im nächsten Schritt als Partyseite (Spiel + RSVP + Foto in einem).

    if(state.invite.type === 'minispiel'){
      // F8: Dark-Mode wie Live-Einladung (dunkelblau-violetter Hintergrund, Gold-Akzent)
      c.style.background = `linear-gradient(180deg,#1A1A2E,#16213E)`;
      const photoHtml = state.invite.photo ? `<img src="${escA(state.invite.photo)}" style="width:64px;height:64px;border-radius:50%;border:3px solid ${motto.accent2 || '#FFD700'};margin:0 auto 8px;display:block;object-fit:cover"/>` : '';
      c.innerHTML = `
        <div class="invite-preview-minispiel" style="background:transparent">
          ${photoHtml}
          <div class="invite-preview-minispiel__title">${esc(motto.emoji)} ${eTitle}</div>
          <div class="invite-preview-minispiel__name">${eName} lädt dich ein</div>
          <div class="invite-preview-minispiel__game">${esc(motto.emoji)}</div>
          <div style="font-size:11px;color:#fff;opacity:.9;margin-bottom:6px">Tippe um den Schatz zu finden!</div>
          <div class="invite-preview-minispiel__cta">▶ Spielen</div>
        </div>`;
    } else if(state.invite.type === 'karte'){
      c.style.background = '#fff';
      const photoBlock = state.invite.photo ? `<img src="${escA(state.invite.photo)}" style="width:70px;height:70px;border-radius:50%;border:3px solid ${motto.accent2 || '#FFD700'};margin:0 auto 8px;display:block;object-fit:cover"/>` : '';
      c.innerHTML = `
        <div class="invite-preview-karte">
          ${photoBlock}
          <div class="invite-preview-karte__pre">DU BIST EINGELADEN</div>
          <div class="invite-preview-karte__name">${eName}</div>
          <div class="invite-preview-karte__title">${eBody}</div>
          <div class="invite-preview-karte__details">
            <b>📅</b> ${esc(dateStr)}<br>
            <b>🕑</b> ${esc(state.time)} Uhr<br>
            <b>📍</b> Bei uns zuhause<br><br>
            <span style="font-size:11px">${eDeadline}</span>
          </div>
        </div>`;
    } else {
      c.style.background = '#FFF8F0';
      c.innerHTML = `
        <div class="invite-preview-print">
          <div class="invite-preview-print__title">${esc(motto.emoji)} ${eTitle}</div>
          <div class="invite-preview-print__divider"></div>
          <div class="invite-preview-print__line"><b>${eName}</b> wird ${ageNum()}!</div>
          <div class="invite-preview-print__line" style="font-size:10px;color:#666;margin:6px 0">${eBody}</div>
          <div class="invite-preview-print__divider"></div>
          <div class="invite-preview-print__line">📅 ${esc(dateStr)}<br>🕑 ${esc(state.time)} Uhr<br>📍 Bei uns zuhause</div>
          <div class="invite-preview-print__line" style="font-size:9px;color:#888;margin-top:8px">${eDeadline}</div>
          <div style="margin-top:10px;font-size:8px;color:#999">~ 1 von 8 Karten · A6 ~</div>
        </div>`;
    }
    // Kein Fake-Link mehr (es gibt keine /p/-Route): geteilt wird der Einladungs-TEXT.
    // Der echte, teilbare Link entsteht ueber "Einladung jetzt erstellen" (/einladung/erstellen -> /e/<slug>).
    const rsvpLine = state.invite.whatsapp ? `\n📲 Zusagen direkt an: ${state.invite.whatsapp}\n` : '\n';
    const ortLabel = (typeof locationLabel === 'function') ? locationLabel(state.location||'') : '';
    const msgText = `${motto.emoji} ${state.invite.title}\n\n${state.invite.body}\n\n📅 ${dateStr}\n🕑 ${state.time} Uhr${ortLabel?`\n📍 ${ortLabel}`:''}\n${rsvpLine}${state.invite.deadline}`;
    window.__inviteShareText = msgText;
    const encoded = encodeURIComponent(msgText);
    document.getElementById('whatsappBtn').href = `https://wa.me/?text=${encoded}`;
    document.getElementById('emailBtn').href = `mailto:?subject=${encodeURIComponent(state.invite.title)}&body=${encoded}`;

    autoSave();
  }

  // Foto mit Crop (portiert aus /einladung/erstellen): EIN Upload, quadratisch gecroppt,
  // landet als volle data-URL in state.invite.photo -> Vorschau + /api/create photoRound (isSafePhoto verlangt Praefix).
  let _photoSrc=null, _pCropX=0, _pCropY=0, _pScale=1, _pMin=1, _pDrag=false, _pLastX=0, _pLastY=0;
  const PCROP=120;
  function handlePhotoUpload(e){
    const file = e.target.files[0]; if(!file) return;
    if(file.size > 8*1024*1024){ alert('Foto zu groß — bitte unter 8 MB'); return; }
    const reader = new FileReader();
    reader.onload = ev => {
      const img = new Image();
      img.onload = () => {
        const MAX=500; let sw=img.width, sh=img.height;
        if(sw>MAX||sh>MAX){ const r=Math.min(MAX/sw,MAX/sh); sw=Math.round(sw*r); sh=Math.round(sh*r); }
        const pre=document.createElement('canvas'); pre.width=sw; pre.height=sh;
        pre.getContext('2d').drawImage(img,0,0,sw,sh);
        _photoSrc=pre;
        _pMin=Math.max(PCROP/sw,PCROP/sh); _pScale=_pMin;
        _pCropX=(PCROP-sw*_pScale)/2; _pCropY=(PCROP-sh*_pScale)/2;
        const sl=document.getElementById('photoZoom');
        sl.min=Math.round(_pMin*100); sl.max=Math.round(_pMin*500); sl.value=Math.round(_pMin*100);
        document.getElementById('photoLabel').style.display='none';
        document.getElementById('photoCropUI').style.display='';
        photoRedraw();
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  }
  function photoRedraw(){
    if(!_photoSrc) return;
    const cc=document.getElementById('photoCropCanvas'); const ctx=cc.getContext('2d');
    ctx.clearRect(0,0,PCROP,PCROP); ctx.save(); ctx.translate(_pCropX,_pCropY); ctx.scale(_pScale,_pScale); ctx.drawImage(_photoSrc,0,0); ctx.restore();
    const OUT=400; const out=document.createElement('canvas'); out.width=OUT; out.height=OUT;
    const octx=out.getContext('2d'); octx.imageSmoothingEnabled=true; octx.imageSmoothingQuality='high';
    octx.drawImage(cc,0,0,PCROP,PCROP,0,0,OUT,OUT);
    state.invite.photo = out.toDataURL('image/jpeg',0.82);
    renderInvitePreview(); autoSave();
  }
  function photoClamp(){ if(!_photoSrc) return; const w=_photoSrc.width*_pScale,h=_photoSrc.height*_pScale; _pCropX=Math.min(0,Math.max(PCROP-w,_pCropX)); _pCropY=Math.min(0,Math.max(PCROP-h,_pCropY)); }
  function photoSetZoom(val){ const ns=val/100,cx=PCROP/2,cy=PCROP/2,ratio=ns/_pScale; _pCropX=cx-(cx-_pCropX)*ratio; _pCropY=cy-(cy-_pCropY)*ratio; _pScale=ns; photoClamp(); photoRedraw(); }
  function removePhoto(){ state.invite.photo=null; _photoSrc=null; const ip=document.getElementById('iPhoto'); if(ip) ip.value=''; document.getElementById('photoLabel').style.display=''; document.getElementById('photoCropUI').style.display='none'; renderInvitePreview(); autoSave(); }
  (function(){ const el=document.getElementById('photoCropCircle'); if(!el) return;
    el.addEventListener('pointerdown', e=>{ if(!_photoSrc) return; _pDrag=true; _pLastX=e.clientX; _pLastY=e.clientY; try{el.setPointerCapture(e.pointerId)}catch(_){} });
    el.addEventListener('pointermove', e=>{ if(!_pDrag) return; _pCropX+=e.clientX-_pLastX; _pCropY+=e.clientY-_pLastY; _pLastX=e.clientX; _pLastY=e.clientY; photoClamp(); photoRedraw(); });
    el.addEventListener('pointerup', ()=>{ _pDrag=false; }); el.addEventListener('pointercancel', ()=>{ _pDrag=false; });
  })();

  function copyInviteUrl(){
    // Kopiert den Einladungs-TEXT (kein toter /p/-Link mehr). Keine erfundenen Versand-/Zusagen-Zahlen.
    const text = window.__inviteShareText || '';
    if(navigator.clipboard){
      navigator.clipboard.writeText(text).then(() => showFlash('Einladungstext kopiert ✓'));
    } else {
      const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
      showFlash('Einladungstext kopiert ✓');
    }
  }

  // ===== STAGE 5: PARTYSEITE =====
  function toggleFeature(f){
    state.partyseite[f] = !state.partyseite[f];
    const el = {rsvp:'psRsvp',wish:'psWish'}[f];
    if(!el) return;
    document.getElementById(el).classList.toggle('on', state.partyseite[f]);
    renderPartyseitePreview();
    autoSave();
  }
  // Share-Loop: psStatus-URL + Share-Block (WhatsApp/Copy) aus dem State (re)konstruieren. Single Source fuer activate UND Resume/Stage-Rueckkehr.
  function showPartyShare(url, editUrl){
    if(!url) return;
    const statusEl = document.getElementById('psStatus'); let urlEl = document.getElementById('psStatusUrl');
    // ChatGPT-Gate 13.07.: Fehler-innerHTML zerstoert #psStatusUrl — bei erfolgreichem Retry Struktur selbstheilen,
    // sonst bleibt die rote Fehlerzeile ueber dem funktionierenden Share-Block stehen.
    if(statusEl && !urlEl){ statusEl.innerHTML = '✅ Live auf <span style="color:var(--accent,#1E3A5F);font-weight:800" id="psStatusUrl"></span>'; urlEl = document.getElementById('psStatusUrl'); }
    if(statusEl) statusEl.style.display = 'flex';
    if(urlEl) urlEl.innerHTML = '<a href="' + escA(url) + '" target="_blank" rel="noopener" style="color:var(--accent,#1E3A5F);font-weight:800">' + esc(url) + '</a>';
    // Edit-Link klar als SEPARATER privater Verwaltungs-Link (Feedback: "2 Links" verwirrte — Gästelink vs Edit-Link)
    if(editUrl){ const _el=document.getElementById('psEditLink'); if(_el){ _el.href=editUrl; _el.textContent=editUrl; } const _eb=document.getElementById('psEditBlock'); if(_eb) _eb.style.display=''; }
    const motto = state.motto || MOTTOS[0];
    const name = (state.name || '').trim() || 'Geburtstagskind';
    const dStr = state.date ? (formatDateShort(state.date) + (state.time ? (', ' + state.time + ' Uhr') : '')) : '';
    const shareMsg = motto.emoji + ' ' + name + ' feiert ' + motto.name + '-Geburtstag!' + (dStr ? ('\n📅 ' + dStr) : '') + '\n\nAlle Infos + bitte kurz zu-/absagen (Allergien & Abholung) direkt hier:\n' + url;
    window.__partyShareUrl = url; window.__partyShareText = shareMsg;
    const waEl = document.getElementById('psShareWa'); if(waEl) waEl.href = 'https://wa.me/?text=' + encodeURIComponent(shareMsg);
    const sb = document.getElementById('psShareBlock'); if(sb) sb.style.display = '';
    // Premium-Paket-Pilot: nach Aktivierung einer PIRATEN-Party den echten Paket-Zugang zeigen
    // (idempotent — Button nur einmal anlegen; Resume-Restore ruft showPartyShare erneut).
    try{
      const pu = paketPilotUrl();
      const oldBtn = document.getElementById('psPaketBtn');
      if(pu && sb && !oldBtn){
        const pbtn = document.createElement('a');
        pbtn.id='psPaketBtn'; pbtn.href=pu; pbtn.target='_blank'; pbtn.rel='noopener';
        pbtn.style.cssText='display:block;text-align:center;margin-top:10px;padding:13px 20px;border-radius:12px;background:#12324A;color:#F4E9CE;font-weight:800;font-size:14px;text-decoration:none;border:2px solid #B98724';
        const pm = PAKET_MOTTOS[paketMotto()] || {emoji:'📦', label:'Komplettpaket'};
        pbtn.textContent = pm.emoji+' Dein '+pm.label+' ansehen (Pilot — kostenlos)';
        pbtn.addEventListener('click', function(){ try{ if(window.plausible) plausible('paket_open',{props:{motto:paketMotto(), source:'share-block'}}); }catch(e){} });
        sb.appendChild(pbtn);
      } else if(pu && oldBtn){
        /* Motto-Wechsel zwischen zwei Paket-Mottos: Ziel UND Beschriftung nachziehen —
           sonst stand „Piraten-Komplettpaket" ueber einem Dino-Link. */
        oldBtn.href = pu;
        const pm = PAKET_MOTTOS[paketMotto()] || {emoji:'📦', label:'Komplettpaket'};
        oldBtn.textContent = pm.emoji+' Dein '+pm.label+' ansehen (Pilot — kostenlos)';
      }
      // Gate-MINOR W5 (30.07.): Ruecksetz-Zweig — nach Motto-Wechsel weg von piraten duerfen
      // weder der Paket-Button (traegt Token-URL!) noch das Kachel-Label stehen bleiben.
      if(!pu && oldBtn) oldBtn.remove();
      const card = document.querySelector('.checkout-card--premium');
      if(card){
        const btn = card.querySelector('.checkout-card__btn');
        const pr = card.querySelector('.checkout-card__price');
        if(pu){
          // Re-Check N2: Originale VOR dem Pilot-Swap sichern — Reset restauriert dann
          // den echten HTML-Stand statt hartkodierter Kopien (kein Drift bei Kachel-Aenderungen).
          if(btn && !card.dataset.origBtn){ card.dataset.origBtn = btn.textContent; }
          if(pr && !card.dataset.origPrice){ card.dataset.origPrice = pr.innerHTML; }
          if(btn) btn.textContent=((PAKET_MOTTOS[paketMotto()]||{}).emoji||'📦')+' Paket ansehen (Pilot)';
          if(pr) pr.innerHTML='Pilot <small style="font-size:12px;font-weight:700;color:#b08642">· kostenlos testen</small>';
        } else if(btn && btn.textContent.indexOf('Pilot')!==-1){
          btn.textContent = card.dataset.origBtn || 'Auf die Warteliste';
          if(pr) pr.innerHTML = card.dataset.origPrice || '€14,90 <small style="font-size:12px;font-weight:700;color:#b08642">· geplant</small>';
        }
      }
    }catch(e){}
  }
  // Edit-Link (privater Schluessel) per E-Mail sichern -> Worker send-edit-link (Resend). Nur ein eigener Link ist mailbar (editToken-Pflicht).
  async function autoSendEditLink(email){
    // Versand-Fehler blockieren NIE: die Party existiert, der Link steht sichtbar im Edit-Block.
    if(!email) return;
    const url = state.partyseite && state.partyseite.url, editUrl = state.partyseite && state.partyseite.editUrl;
    if(!url || !editUrl) return;
    const id = url.split('?')[0].split('/').filter(Boolean).pop();
    const token = (editUrl.match(/[?&]edit=([^&]+)/) || [])[1] || '';
    try{
      const r = await fetch('https://party.machsleicht.de/api/party/' + encodeURIComponent(id) + '/send-edit-link', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ editToken: token, email }) });
      const p = document.getElementById('psEmailSent'), t = document.getElementById('psEmailSentTo');
      if(t) t.textContent = email;
      if(r.ok){ if(p) p.style.display = 'block'; try{ if(window.plausible) plausible('edit_link_emailed', {props:{source:'wizard-auto'}}); }catch(e){} }
      else { showFlash('⚠️ E-Mail-Versand hakt gerade — dein Verwaltungs-Link steht unten, speichere ihn dir.'); }
    }catch(e){ showFlash('⚠️ E-Mail-Versand hakt gerade — dein Verwaltungs-Link steht unten, speichere ihn dir.'); }
  }
  function renderPartyseitePreview(){
    try{ renderPsGames(); }catch(e){}
    state.partyseite.slug = document.getElementById('psSlug')?.value || state.partyseite.slug;
    // Adressfeld aus State hydrieren (Resume/Rueckkehr zur Einladung+Partyseite-Stage), ohne den getippten Wert zu ueberschreiben.
    try{ const _pa=document.getElementById('psAddress'); if(_pa && document.activeElement!==_pa && (state.adresse||'')!==_pa.value) _pa.value = state.adresse || ''; }catch(e){}
    try{ const _pm=document.getElementById('psMessage'); if(_pm && document.activeElement!==_pm && (state.partyMessage||'')!==_pm.value) _pm.value = state.partyMessage || ''; }catch(e){}   // #25 Nachricht hydrieren (Resume)
    // Crew-Namen hydrieren (Resume/Rueckkehr) — nie waehrend des Tippens, sonst springt der Cursor.
    try{ const _pc=document.getElementById('psCrew'); if(_pc && document.activeElement!==_pc){
      /* Rohtext bevorzugen; nur alte Saves (vor crewText) fallen auf die geparsten Namen zurueck. */
      const _ct = (typeof state.crewText==='string' && state.crewText) ? state.crewText : (Array.isArray(state.crew)?state.crew:[]).join('\n');
      if(_ct!==_pc.value) _pc.value=_ct;
    } updateCrewInfo(); }catch(e){}
    // Nach dem Merge gibt es keine eigene Partyseiten-Browser-Vorschau mehr (nur noch die Telefon-Einladung).
    // Diese Funktion haelt weiterhin Slug/Adresse synchron und stellt den Share-Block bei Resume/Aktiv wieder her.
    const _slugEl = document.getElementById('psSlugPreview'); if(_slugEl) _slugEl.textContent = `party.machsleicht.de/${state.partyseite.slug}`;
    const c = document.getElementById('psPreviewContent');
    if(c){
    const motto = state.motto || MOTTOS[0];
    let html = `<div class="ps-preview">
      <h2>${esc(motto.emoji)} ${esc(state.name)}' ${motto.persona === 'Pirat' ? 'Crew-Treffen' : esc(motto.name) + '-Party'}</h2>
      <div class="ps-preview__meta">${esc(formatDateLong(state.date))} · ${esc(state.time)} Uhr${(typeof locationLabel==='function'&&locationLabel(state.location))?' · '+esc(locationLabel(state.location)):''}</div>`;
    if(state.partyseite.rsvp){
      html += `<div class="ps-preview__section">
        <h4>👥 Zusagen <span style="font-weight:400;font-size:11px;color:#999">(Beispiel-Ansicht)</span></h4>
        <div class="ps-rsvp">
          <div class="ps-rsvp__row"><span>Mia 🦜</span><b>JA</b></div>
          <div class="ps-rsvp__row"><span>Tim ⚓</span><b>JA</b></div>
          <div class="ps-rsvp__row"><span>Lara 🏴‍☠️</span><b>JA</b></div>
          <div class="ps-rsvp__row"><span>Ben 🦈</span><b>JA</b></div>
        </div>
        <div class="ps-rsvp-cta">+ Du bist dabei?</div>
      </div>`;
    }
    if(state.partyseite.wish){
      html += `<div class="ps-preview__section">
        <h4>🎁 Wunschliste</h4>
        <div class="ps-wish">
          <div class="ps-wish__item"><span style="flex:1">Großes Bastelset</span><span style="color:#999;font-size:10px">offen</span></div>
          <div class="ps-wish__item"><span style="flex:1">Lieblings-Bilderbuch</span><span style="color:#0F7B3F;font-size:10px;font-weight:800">Mia 🎁</span></div>
        </div>
      </div>`;
    }
    // F9: Eltern-Chat & Foto-Galerie entfernt — der Worker (Gaesteseite) hat diese Features nicht,
    // die Preview darf kein nicht-existentes Feature versprechen.
    html += '</div>';
    c.innerHTML = html;
    }
    // Bereits aktive Partyseite (z.B. nach Reload/Resume oder Rueckkehr zur Einladung+Partyseite-Stage): Share-Block + Status wiederherstellen,
    // sonst stirbt der Share-Moment beim Reload (haeufigster realer Teilen-Zeitpunkt = "spaeter an die Eltern schicken").
    if(state.partyseite && state.partyseite.active && state.partyseite.url){ try{ showPartyShare(state.partyseite.url, state.partyseite.editUrl); }catch(e){ console.warn('restore share', e); } }
    autoSave();
  }
  // Spiel-Wahl fuer die Partyseiten-Einladung (2026-07-13): "klassiker" (Default, Legacy-Familie)
  // oder "schatzjagd" (Aufdecken-&-Fangen unter /spiele/). Wahl geht als gameId an /api/create;
  // der Worker loest sie ueber GAME_CATALOG auf (leer/unbekannt -> Legacy-Fallback, nichts bricht).
  // UI-Sync aus state.gameChoice OHNE pickPsGame (kein game_selected-Event/autoSave bei Resume — Gate-Finding K4)
  function syncPsGameUI(){ renderPsGames(); }
  // Tastatur (Enter/Space) fuer die Spiel-Kacheln (Gate-Finding: role=button ohne keydown)
  document.addEventListener('keydown',function(e){
    if(e.repeat) return;
    if((e.key==='Enter'||e.key===' ')&&e.target&&e.target.classList&&e.target.classList.contains('ps-game')){ e.preventDefault(); pickPsGame(e.target); }
  });
  // Spiel-Galerie je Motto (Bolle 13.07.: volle Auswahl). Subs stammen aus den Spiel-Intros.
  const WIZ_GAMES = {"piraten":[{"id":"piraten-klassik","n":"Der Klassiker","e":"✨","s":"Einfaches Tipp-Spiel — antippen, knacken, Überraschung. Perfekt schon für die Kleinsten.","p":"/einladung/piraten/whatsapp/","g":"klassiker"},{"id":"kanone-piraten","n":"Kanonen-Schuss","e":"💣","s":"Die Schatzkarte ist hinter dicken Brettern vernagelt!","p":"/spiele/game-kanone-piraten.html","g":"kanone"},{"id":"flaschenpost-piraten","n":"Flaschenpost","e":"🍾","s":"In der Flasche steckt eine geheime Nachricht.","p":"/spiele/game-flaschenpost-piraten.html","g":"flaschenpost"},{"id":"memory-piraten","n":"Schatz-Memory","e":"🗺","s":"Hinter den Schatzkarten versteckt sich jemand.","p":"/spiele/game-memory-piraten.html","g":"memory"},{"id":"piraten-schatzjagd","n":"Die Schatzjagd","e":"🪙","s":"9 Felder aufdecken, den Dieb schnappen — Foto-Finale! Für Kinder, die es kniffliger mögen.","p":"/spiele/game-schatzjagd-piraten.html","g":"schatzjagd"}],"dino":[{"id":"dino-klassik","n":"Der Klassiker","e":"✨","s":"Einfaches Tipp-Spiel — antippen, knacken, Überraschung. Perfekt schon für die Kleinsten.","p":"/einladung/dino/whatsapp/","g":"klassiker"},{"id":"ei-dino","n":"Dino-Ei","e":"🥚","s":"Tippe immer wieder aufs Ei, um es zu wärmen.","p":"/spiele/game-ei-dino.html","g":"ei"},{"id":"faehrte-dino","n":"Dino-Fährte","e":"🐾","s":"Riesige Fußspuren führen quer durchs Urwald-Tal.","p":"/spiele/game-faehrte-dino.html","g":"faehrte"},{"id":"fossil-dino","n":"Fossil-Ausgrabung","e":"🦴","s":"Etwas Uraltes liegt unter dem Sand — versteinert seit Urzeiten.","p":"/spiele/game-fossil-dino.html","g":"fossil"},{"id":"dino-schatzjagd","n":"Die Schatzjagd","e":"🪙","s":"9 Felder aufdecken, den Dieb schnappen — Foto-Finale! Für Kinder, die es kniffliger mögen.","p":"/spiele/game-schatzjagd-dino.html","g":"schatzjagd"}],"safari":[{"id":"safari-klassik","n":"Der Klassiker","e":"✨","s":"Einfaches Tipp-Spiel — antippen, knacken, Überraschung. Perfekt schon für die Kleinsten.","p":"/einladung/safari/whatsapp/","g":"klassiker"},{"id":"fotosafari-safari","n":"Foto-Safari","e":"📸","s":"Die Tiere zeigen sich nur kurz.","p":"/spiele/game-fotosafari-safari.html","g":"fotosafari"},{"id":"jeep-safari","n":"Jeep-Safari","e":"🚙","s":"Steuere mit den Pfeilen nach links und rechts.","p":"/spiele/game-jeep-safari.html","g":"jeep"},{"id":"spuren-safari","n":"Spuren-Pfad","e":"🐾","s":"Folge den Pfotenspuren durch die Savanne — welches Tier war hier unterwegs?","p":"/spiele/game-spuren-safari.html","g":"spuren"},{"id":"safari-schatzjagd","n":"Die Schatzjagd","e":"🪙","s":"9 Felder aufdecken, den Dieb schnappen — Foto-Finale! Für Kinder, die es kniffliger mögen.","p":"/spiele/game-schatzjagd-safari.html","g":"schatzjagd"}],"weltraum":[{"id":"weltraum-klassik","n":"Der Klassiker","e":"✨","s":"Einfaches Tipp-Spiel — antippen, knacken, Überraschung. Perfekt schon für die Kleinsten.","p":"/einladung/weltraum/whatsapp/","g":"klassiker"},{"id":"funk-weltraum","n":"Alien-Funkspruch","e":"📡","s":"Vom fernen Planeten funkt jemand eine Signalfolge — die Zeichen leuchten und piepen.","p":"/spiele/game-funk-weltraum.html","g":"funk"},{"id":"rakete-weltraum","n":"Raketen-Schub","e":"🚀","s":"Drücke ZÜNDEN, um Schub aufzubauen.","p":"/spiele/game-rakete-weltraum.html","g":"rakete"},{"id":"sternbild-weltraum","n":"Sternbild","e":"🌌","s":"Merk dir die Sterne und tippe sie in der richtigen Reihenfolge — ein Sternbild entsteht.","p":"/spiele/game-sternbild-weltraum.html","g":"sternbild"},{"id":"weltraum-schatzjagd","n":"Die Schatzjagd","e":"🪙","s":"9 Felder aufdecken, den Dieb schnappen — Foto-Finale! Für Kinder, die es kniffliger mögen.","p":"/spiele/game-schatzjagd-weltraum.html","g":"schatzjagd"}],"detektiv":[{"id":"detektiv-klassik","n":"Der Klassiker","e":"✨","s":"Einfaches Tipp-Spiel — antippen, knacken, Überraschung. Perfekt schon für die Kleinsten.","p":"/einladung/detektiv/whatsapp/","g":"klassiker"},{"id":"akte-detektiv","n":"Akte-Quiz","e":"🗂","s":"Drei kniffige Detektiv-Fragen versperren die Akte.","p":"/spiele/game-akte-detektiv.html","g":"akte"},{"id":"fingerabdruck-detektiv","n":"Fingerabdruck","e":"🔍","s":"Auf dem Beweisfoto klebt noch Spurenpuder — und darauf liegt der geheime Fingerabdruck.","p":"/spiele/game-fingerabdruck-detektiv.html","g":"fingerabdruck"},{"id":"wimmel-detektiv","n":"Tatort-Suche","e":"🕵","s":"Im Detektivbüro herrscht Chaos.","p":"/spiele/game-wimmel-detektiv.html","g":"wimmel"},{"id":"detektiv-schatzjagd","n":"Die Schatzjagd","e":"🪙","s":"9 Felder aufdecken, den Dieb schnappen — Foto-Finale! Für Kinder, die es kniffliger mögen.","p":"/spiele/game-schatzjagd-detektiv.html","g":"schatzjagd"}],"superheld":[{"id":"superheld-klassik","n":"Der Klassiker","e":"✨","s":"Einfaches Tipp-Spiel — antippen, knacken, Überraschung. Perfekt schon für die Kleinsten.","p":"/einladung/superheld/whatsapp/","g":"klassiker"},{"id":"signal-superheld","n":"Helden-Signal","e":"🔦","s":"Schalte das Helden-Signal — Stück für Stück leuchtet es über der Stadt auf.","p":"/spiele/game-signal-superheld.html","g":"signal"},{"id":"stadt-superheld","n":"Stadt retten","e":"🏙","s":"Vom Hochhaus fallen Sachen herunter!","p":"/spiele/game-stadt-superheld.html","g":"stadt"},{"id":"strahl-superheld","n":"Helden-Strahl","e":"⚡","s":"Drei Meteore fliegen auf die Stadt zu.","p":"/spiele/game-strahl-superheld.html","g":"strahl"},{"id":"superheld-schatzjagd","n":"Die Schatzjagd","e":"🪙","s":"9 Felder aufdecken, den Dieb schnappen — Foto-Finale! Für Kinder, die es kniffliger mögen.","p":"/spiele/game-schatzjagd-superheld.html","g":"schatzjagd"}],"prinzessin":[{"id":"prinzessin-klassik","n":"Der Klassiker","e":"✨","s":"Einfaches Tipp-Spiel — antippen, knacken, Überraschung. Perfekt schon für die Kleinsten.","p":"/einladung/prinzessin/whatsapp/","g":"klassiker"},{"id":"tatort-prinzessin","n":"Kronjuwelen-Tatort","e":"💎","s":"Die Kronjuwelen sind weg! Sichere die Spuren am Tatort und überführe den Dieb.","p":"/spiele/game-tatort-prinzessin.html","g":"tatort"},{"id":"tresor-prinzessin","n":"Tresor-Code","e":"🔐","s":"Im königlichen Tresor steckt der Beweis.","p":"/spiele/game-tresor-prinzessin.html","g":"tresor"},{"id":"uvschrift-prinzessin","n":"UV-Geheimschrift","e":"🪄","s":"Fahre mit der UV-Lampe übers Pergament und mach die Geheimschrift sichtbar.","p":"/spiele/game-uvschrift-prinzessin.html","g":"uvschrift"},{"id":"prinzessin-schatzjagd","n":"Die Schatzjagd","e":"🪙","s":"9 Felder aufdecken, den Dieb schnappen — Foto-Finale! Für Kinder, die es kniffliger mögen.","p":"/spiele/game-schatzjagd-prinzessin.html","g":"schatzjagd"}],"einhorn":[{"id":"einhorn-klassik","n":"Der Klassiker","e":"✨","s":"Einfaches Tipp-Spiel — antippen, knacken, Überraschung. Perfekt schon für die Kleinsten.","p":"/einladung/einhorn/whatsapp/","g":"klassiker"},{"id":"regenbogen-einhorn","n":"Regenbogen-Brücke","e":"🌈","s":"Baue die Regenbogen-Brücke Farbe für Farbe — dann traut sich das Einhorn hinüber.","p":"/spiele/game-regenbogen-einhorn.html","g":"regenbogen"},{"id":"sternenstaub-einhorn","n":"Sternenstaub","e":"✨","s":"Über der Wolken-Wiese schweben funkelnde Sternenstaub-Funken.","p":"/spiele/game-sternenstaub-einhorn.html","g":"sternenstaub"},{"id":"turm-einhorn","n":"Wolken-Turm","e":"☁️","s":"Eine Wolke schwebt hin und her — aber Achtung: der Zauberwind schiebt sie mal schneller, mal langsamer!","p":"/spiele/game-turm-einhorn.html","g":"turm"},{"id":"einhorn-schatzjagd","n":"Die Schatzjagd","e":"🪙","s":"9 Felder aufdecken, den Dieb schnappen — Foto-Finale! Für Kinder, die es kniffliger mögen.","p":"/spiele/game-schatzjagd-einhorn.html","g":"schatzjagd"}],"meerjungfrau":[{"id":"meerjungfrau-klassik","n":"Der Klassiker","e":"✨","s":"Einfaches Tipp-Spiel — antippen, knacken, Überraschung. Perfekt schon für die Kleinsten.","p":"/einladung/meerjungfrau/whatsapp/","g":"klassiker"},{"id":"korallen-meerjungfrau","n":"Korallen-Slalom","e":"🐠","s":"Steuere die Meerjungfrau mit den Pfeilen nach links und rechts.","p":"/spiele/game-korallen-meerjungfrau.html","g":"korallen"},{"id":"perlen-meerjungfrau","n":"Perlen sortieren","e":"🐚","s":"Jede Perle gehört in die Muschel mit dem gleichen Zeichen.","p":"/spiele/game-perlen-meerjungfrau.html","g":"perlen"},{"id":"schatz-meerjungfrau","n":"Schatz auftauchen","e":"🧜","s":"Tief unten im Meer liegt etwas Glänzendes.","p":"/spiele/game-schatz-meerjungfrau.html","g":"schatz"},{"id":"meerjungfrau-schatzjagd","n":"Die Schatzjagd","e":"🪙","s":"9 Felder aufdecken, den Dieb schnappen — Foto-Finale! Für Kinder, die es kniffliger mögen.","p":"/spiele/game-schatzjagd-meerjungfrau.html","g":"schatzjagd"}],"feuerwehr":[{"id":"feuerwehr-klassik","n":"Der Klassiker","e":"✨","s":"Einfaches Tipp-Spiel — antippen, knacken, Überraschung. Perfekt schon für die Kleinsten.","p":"/einladung/feuerwehr/whatsapp/","g":"klassiker"},{"id":"drehleiter-feuerwehr","n":"Drehleiter","e":"🚒","s":"Die Leiter schwingt hin und her.","p":"/spiele/game-drehleiter-feuerwehr.html","g":"drehleiter"},{"id":"loeschen-feuerwehr","n":"Feuer löschen","e":"🧯","s":"Rubbel die Flammen weg, bevor sie wieder aufflackern — Einsatz für die Feuerwehr!","p":"/spiele/game-loeschen-feuerwehr.html","g":"loeschen"},{"id":"notruf-feuerwehr","n":"Feuerwehr-Funkcode","e":"🚨","s":"Die Wache hat einen geheimen Funk-Code.","p":"/spiele/game-notruf-feuerwehr.html","g":"notruf"},{"id":"feuerwehr-schatzjagd","n":"Die Schatzjagd","e":"🪙","s":"9 Felder aufdecken, den Dieb schnappen — Foto-Finale! Für Kinder, die es kniffliger mögen.","p":"/spiele/game-schatzjagd-feuerwehr.html","g":"schatzjagd"}],"baustelle":[{"id":"baustelle-klassik","n":"Der Klassiker","e":"✨","s":"Einfaches Tipp-Spiel — antippen, knacken, Überraschung. Perfekt schon für die Kleinsten.","p":"/einladung/baustelle/whatsapp/","g":"klassiker"},{"id":"bagger-baustelle","n":"Bagger-Fahrt","e":"🚜","s":"Steuere mit den Pfeilen nach links und rechts.","p":"/spiele/game-bagger-baustelle.html","g":"bagger"},{"id":"hochhaus-baustelle","n":"Hochhaus stapeln","e":"🏗","s":"Der Kran schwenkt eine Etage hin und her.","p":"/spiele/game-hochhaus-baustelle.html","g":"hochhaus"},{"id":"rohre-baustelle","n":"Rohre verbinden","e":"🔧","s":"Drehe die Rohre, bis das Wasser durchfließen kann.","p":"/spiele/game-rohre-baustelle.html","g":"rohre"},{"id":"baustelle-schatzjagd","n":"Die Schatzjagd","e":"🪙","s":"9 Felder aufdecken, den Dieb schnappen — Foto-Finale! Für Kinder, die es kniffliger mögen.","p":"/spiele/game-schatzjagd-baustelle.html","g":"schatzjagd"}],"dschungel":[{"id":"dschungel-klassik","n":"Der Klassiker","e":"✨","s":"Einfaches Tipp-Spiel — antippen, knacken, Überraschung. Perfekt schon für die Kleinsten.","p":"/einladung/dschungel/whatsapp/","g":"klassiker"},{"id":"lianen-dschungel","n":"Lianen-Schwung","e":"🐒","s":"Schwing von Liane zu Liane — tippe im richtigen Moment für den nächsten Schwung.","p":"/spiele/game-lianen-dschungel.html","g":"lianen"},{"id":"wildnis-dschungel","n":"Wildnis-Wimmelbild","e":"🌿","s":"Fünf bunte Papageien verstecken sich im Dickicht — spür alle auf, dann lichtet sich der Dschungel.","p":"/spiele/game-wildnis-dschungel.html","g":"wildnis"},{"id":"puzzle-dschungel","n":"Dschungel-Puzzle","e":"🧩","s":"Die Zahlen-Kacheln sind durcheinander.","p":"/spiele/game-puzzle-dschungel.html","g":"puzzle"},{"id":"dschungel-schatzjagd","n":"Die Schatzjagd","e":"🪙","s":"9 Felder aufdecken, den Dieb schnappen — Foto-Finale! Für Kinder, die es kniffliger mögen.","p":"/spiele/game-schatzjagd-dschungel.html","g":"schatzjagd"}],"feen":[{"id":"feen-klassik","n":"Der Klassiker","e":"✨","s":"Einfaches Tipp-Spiel — antippen, knacken, Überraschung. Perfekt schon für die Kleinsten.","p":"/einladung/feen/whatsapp/","g":"klassiker"},{"id":"gluehwuermchen-feen","n":"Glühwürmchen-Melodie","e":"🌟","s":"Spiel die Glühwürmchen-Melodie nach — Ton für Ton wird der Feenwald heller.","p":"/spiele/game-gluehwuermchen-feen.html","g":"gluehwuermchen"},{"id":"laterne-feen","n":"Wunsch-Laterne","e":"🏮","s":"Im Feenhimmel schweben leuchtende Glühwürmchen.","p":"/spiele/game-laterne-feen.html","g":"laterne"},{"id":"taunetz-feen","n":"Tau-Netz","e":"🕸","s":"Auf dem Spinnennetz glitzern Tautropfen.","p":"/spiele/game-taunetz-feen.html","g":"taunetz"},{"id":"feen-schatzjagd","n":"Die Schatzjagd","e":"🪙","s":"9 Felder aufdecken, den Dieb schnappen — Foto-Finale! Für Kinder, die es kniffliger mögen.","p":"/spiele/game-schatzjagd-feen.html","g":"schatzjagd"}],"pferde":[{"id":"pferde-klassik","n":"Der Klassiker","e":"✨","s":"Einfaches Tipp-Spiel — antippen, knacken, Überraschung. Perfekt schon für die Kleinsten.","p":"/einladung/pferde/whatsapp/","g":"klassiker"},{"id":"huerden-pferde","n":"Hürden-Springen","e":"🏇","s":"Tippe im richtigen Moment zum Absprung — Hürde für Hürde bis ins Ziel.","p":"/spiele/game-huerden-pferde.html","g":"huerden"},{"id":"hufeisen-pferde","n":"Hufeisen-Wurf","e":"🐴","s":"Tippe WERFEN, wenn der Zeiger im grünen Bereich steht — aber Achtung: der Wind verschiebt den Bereich nach jedem Wurf!","p":"/spiele/game-hufeisen-pferde.html","g":"hufeisen"},{"id":"striegeln-pferde","n":"Pony striegeln","e":"🧽","s":"Das Pony hat sich im Schlamm gewälzt und ist ganz staubig.","p":"/spiele/game-striegeln-pferde.html","g":"striegeln"},{"id":"pferde-schatzjagd","n":"Die Schatzjagd","e":"🪙","s":"9 Felder aufdecken, den Dieb schnappen — Foto-Finale! Für Kinder, die es kniffliger mögen.","p":"/spiele/game-schatzjagd-pferde.html","g":"schatzjagd"}],"ritter":[{"id":"ritter-klassik","n":"Der Klassiker","e":"✨","s":"Einfaches Tipp-Spiel — antippen, knacken, Überraschung. Perfekt schon für die Kleinsten.","p":"/einladung/ritter/whatsapp/","g":"klassiker"},{"id":"katapult-ritter","n":"Burg-Katapult","e":"🏰","s":"Lade das Katapult und feuere im richtigen Moment — triff den grünen Bereich, dann fliegt der Stein genau aufs Burgtor.","p":"/spiele/game-katapult-ritter.html","g":"katapult"},{"id":"schwert-ritter","n":"Schwert schmieden","e":"⚔️","s":"Hämmere auf die Klinge.","p":"/spiele/game-schwert-ritter.html","g":"schwert"},{"id":"wappen-ritter","n":"Wappen-Puzzle","e":"🛡","s":"Die Wappen-Steine sind durcheinander — jeder trägt eine Zahl.","p":"/spiele/game-wappen-ritter.html","g":"wappen"},{"id":"ritter-schatzjagd","n":"Die Schatzjagd","e":"🪙","s":"9 Felder aufdecken, den Dieb schnappen — Foto-Finale! Für Kinder, die es kniffliger mögen.","p":"/spiele/game-schatzjagd-ritter.html","g":"schatzjagd"}]};
  function psMid(){ return (state.motto && state.motto.id && String(state.motto.id).indexOf('custom')!==0 && WIZ_GAMES[state.motto.id]) ? state.motto.id : 'piraten'; }
  function renderPsGames(){
    const box = document.getElementById('psGames'); if(!box) return;
    const mid = psMid();
    // Alt-Werte migrieren (localStorage-Resume aus der 2-Spiele-Aera)
    if(state.gameChoice==='klassiker') state.gameChoice = mid+'-klassik';
    if(state.gameChoice==='schatzjagd') state.gameChoice = mid+'-schatzjagd';
    const list = WIZ_GAMES[mid]||[];
    if(!state.gameChoice || !list.some(g=>g.id===state.gameChoice)) state.gameChoice = mid+'-klassik';
    box.innerHTML = list.map(g => '<div class="ps-game" data-gid="'+g.id+'" onclick="pickPsGame(this)" role="button" tabindex="0" style="position:relative;flex:1 1 45%;min-width:150px;background:#fff;border:2px solid '+(g.id===state.gameChoice?'#D4812A':'#d8c9b3')+';border-radius:12px;padding:12px 10px;text-align:center;cursor:pointer">'
      +'<span style="font-size:22px;display:block">'+g.e+'</span>'
      +'<strong style="font-size:13px;display:block;margin:2px 0">'+g.n+'</strong>'
      +'<small style="font-size:11px;color:#999;display:block;line-height:1.35;margin-bottom:8px">'+g.s+'</small>'
      +'<button type="button" onclick="event.stopPropagation();tryPsGame(\''+g.id+'\')" style="border:1px solid #d8c9b3;background:#fff;border-radius:8px;padding:5px 12px;font-size:12px;font-weight:600;color:#333;cursor:pointer">▶ Anspielen</button>'
      +'<span class="ps-game__check" style="position:absolute;top:6px;right:9px;font-size:10px;font-weight:800;color:#D4812A;display:'+(g.id===state.gameChoice?'':'none')+'">✓ Gewählt</span>'
      +'</div>').join('');
  }
  function pickPsGame(el){
    document.querySelectorAll('.ps-game').forEach(g=>{ g.style.borderColor='#d8c9b3'; const c=g.querySelector('.ps-game__check'); if(c) c.style.display='none'; });
    el.style.borderColor='#D4812A';
    const c=el.querySelector('.ps-game__check'); if(c) c.style.display='';
    state.gameChoice = el.dataset.gid;
    try{ if(window.plausible) plausible('game_selected',{props:{game:el.dataset.gid, source:'wizard'}}); }catch(e){}
    autoSave();
  }
  function tryPsGame(gid){
    const list = WIZ_GAMES[psMid()]||[];
    const g = list.find(x=>x.id===gid); if(!g) return;
    const nm = (state.name||'').trim() || 'Mia';
    window.open(g.p+'?name='+encodeURIComponent(nm)+'&foto=/spiele/core/demo-kid.jpg','_blank');   // Demo-Kind: Magic-Moment in der Vorschau erlebbar
    try{ if(window.plausible) plausible('game_preview',{props:{game:gid, source:'wizard'}}); }catch(e){}
  }
  /* ===== Crew-Liste (Playtest 31.07.) =====
     Befund: Der Wizard fragte Gaestenamen NIE ab und sendete kein invites-Feld an /api/create —
     Bordpost, Party-Pass-Rollen, Tischkarten und die persoenlichen ?g-QRs blieben im Standardpfad
     leer (6/10 Personas). Der Worker kann das laengst (makeInvites vergibt Rollen round-robin +
     16-Zeichen-Token je Kind), nur der Wizard fuellte es nicht. */
  const CREW_MAX = 30;        // = MAX_GUESTS im Worker (makeInvites slice)
  const CREW_NAME_MAX = 50;   // = Namens-slice in makeInvites (Welle 2: 30->50, harmonisiert mit Gast-Namen)
  const CREW_TEXT_MAX = 1600; // EINE Quelle fuer textarea-maxlength + crewText-Kappung (Gate: 30*50+29=1529)
  function parseCrew(txt){
    const seen = Object.create(null), out = [];
    String(txt||'').split(/[\n,;]+/).forEach(function(raw){
      const n = raw.trim().replace(/\s+/g,' ');
      if(!n) return;
      const k = n.toLowerCase();
      if(seen[k]) return;   // Duplikate wie im Worker still verwerfen
      seen[k] = 1;
      out.push(n);
    });
    return out;
  }
  function setCrew(txt){
    const all = parseCrew(txt);
    state.crew = all.slice(0, CREW_MAX);
    /* Gate-Befund 31.07.: Rohtext mitspeichern. Wer den State beim Hydrieren aus state.crew
       zurueckschreibt, macht aus "Mia, Tim," ploetzlich "Mia\nTim" — dann klebt der naechste
       getippte Name am letzten fest. Der Rohtext ist die Anzeige-Wahrheit, state.crew die
       Sende-Wahrheit. */
    state.crewText = String(txt||'').slice(0, CREW_TEXT_MAX);
    updateCrewInfo(all.length);
    scheduleCrewSync();
    autoSave();
  }
  /* ===== Welle 2: Crew-Sync fuer AKTIVIERTE Partys (Re-Check-Cluster "Planer-Sackgasse") =====
     Vorher gingen invites nur beim /api/create mit — wer die Crew NACH dem Aktivieren eintrug
     oder aenderte, schrieb ins Leere. Jetzt: debounced POST /api/party/<id>/invites mit dem
     editToken aus dem gespeicherten editUrl. makeInvites im Worker erhaelt Tokens bestehender
     Namen (verschickte Links bleiben gueltig); ENTFERNTE Namen verlieren ihren Link — gewollt,
     gleiche Semantik wie der Partyseiten-Editor. */
  let _crewSyncTimer = null, _crewSyncBusy = false, _crewSyncAgain = false;
  function _partyIdFromUrl(u){ const m = /party\.machsleicht\.de\/([a-z0-9]{6,12})/.exec(String(u||'')); return m ? m[1] : ''; }
  function _editTokenFromUrl(u){ const m = /[?&]edit=([a-z0-9]+)/.exec(String(u||'')); return m ? m[1] : ''; }
  function _crewSyncMsg(txt, color){ const el = document.getElementById('psCrewSync'); if(el){ el.textContent = txt; el.style.color = color; } }
  function scheduleCrewSync(){
    /* Gate-Befund: Der Guard prueft NUR noch "aktiv" — fehlt die editUrl (Alt-State), soll
       syncCrewToParty das entscheiden und es dem Nutzer SAGEN. Vorher brach der Guard still
       ab und die dafuer geschriebene Meldung war toter Code. */
    if(!(state.partyseite && state.partyseite.active)) return;
    if(_crewSyncTimer) clearTimeout(_crewSyncTimer);
    _crewSyncTimer = setTimeout(syncCrewToParty, 1600);   // debounced: nicht je Tastendruck ein API-Call
  }
  async function syncCrewToParty(){
    _crewSyncTimer = null;
    if(_crewSyncBusy){ _crewSyncAgain = true; return; }   // Gate-Befund: kein zweiter Schreiber waehrend ein POST laeuft
    const id = _partyIdFromUrl(state.partyseite && state.partyseite.url);
    const tok = _editTokenFromUrl(state.partyseite && state.partyseite.editUrl);
    if(!id || !tok){ _crewSyncMsg('Diese Party wurde vor der Crew-Funktion angelegt — trag die Namen bitte direkt auf der Partyseite ein (Bearbeiten → „💌 Persönliche Einladungen").', '#B26A00'); return; }
    _crewSyncBusy = true;
    try{
      /* Gate-MAJOR 31.07.: Der Sync schrieb die Wizard-Liste als VOLL-Liste — Namen, die jemand
         auf der Partyseite ergaenzt hatte, verschwanden dabei still (und ihr verschickter
         ?g-Link starb). Jetzt Drei-Wege-Merge: was der Server hat, der Wizard NICHT kennt und
         auch nie synchronisiert hat, ist eine Fremd-Ergaenzung und bleibt erhalten. Nur was der
         Wizard zuletzt selbst gesendet hat, darf er wieder entfernen. */
      const local = (Array.isArray(state.crew) ? state.crew : []).slice(0, CREW_MAX);
      const lastSynced = Array.isArray(state.crewSynced) ? state.crewSynced : [];
      let merged = local, verdraengt = 0;
      /* Vergleichs-Schluessel: NFC-normalisiert (sonst zaehlt ein zerlegtes "Mu+..ller" als
         anderer Name), kleingeschrieben und auf 50 gekappt wie serverseitig — sonst matcht
         ein >50-Zeichen-Name nie seine gekappte Server-Fassung und wird ewig neu "uebernommen". */
      const key = s => String(s||'').normalize('NFC').toLowerCase().slice(0,50);
      let serverGelesen = false;
      try{
        const g = await fetch('https://party.machsleicht.de/api/party/'+id+'?edit='+encodeURIComponent(tok));
        if(g.ok){
          const p = await g.json();
          serverGelesen = true;
          const localK = local.map(key), syncedK = lastSynced.map(key);
          const foreign = (Array.isArray(p.invites)?p.invites:[])
            .map(function(i){ return i && i.n ? String(i.n) : ''; }).filter(Boolean)
            .filter(function(n){ const k = key(n); return localK.indexOf(k)<0 && syncedK.indexOf(k)<0; });
          if(foreign.length){
            const voll = local.concat(foreign);
            merged = voll.slice(0, CREW_MAX);
            verdraengt = voll.length - merged.length;   // am 30er-Deckel abgeschnittene Fremd-Namen
          }
        }
      }catch(e){ /* unten behandelt */ }
      if(!serverGelesen){
        /* Gate-Befund: NICHT blind die lokale Voll-Liste senden. Ein uebersprungener Sync kostet
           nichts (Retry laeuft), ein Ueberschreiben killt unwiederbringlich verschickte Links. */
        _crewSyncMsg('⚠️ Konnte den Stand deiner Partyseite gerade nicht lesen — wir versuchen es gleich nochmal.', '#B26A00');
        setTimeout(scheduleCrewSync, 8000);
        return;
      }
      const r = await fetch('https://party.machsleicht.de/api/party/'+id+'/invites', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ editToken: tok, invites: merged })
      });
      if(r.ok){
        const d = await r.json().catch(function(){ return null; });
        const n = d && Array.isArray(d.invites) ? d.invites.length : merged.length;
        const foreignCount = merged.length - local.length;
        /* Selbst-Catch 31.07.: Uebernommene Fremd-Namen muessen SICHTBAR in die Liste wandern.
           Sonst stehen sie zwar in crewSynced, aber nicht in crew — und die naechste Sync-Runde
           haelt sie fuer geloescht und wirft sie samt Gast-Link wieder raus. */
        /* Eigener try: ein DOM-Hakler DARF einen erfolgreichen POST nicht in die
           "Keine Verbindung"-Meldung des aeusseren catch kippen (Test-Fang 31.07.).
           Selbst-Catch 2: Uebernommene Namen werden ANGEHAENGT statt die Textarea zu ersetzen.
           Ersetzen ging nur, wenn das Feld nicht fokussiert war — tippte der Host waehrend des
           Syncs weiter, ueberschrieb sein naechster Tastendruck den State mit dem alten
           Feldinhalt, und das fremde Kind starb in der uebernaechsten Runde doch. Anhaengen
           ist auch semantisch richtig: Fremd-Namen sind Zugaenge. */
        if(foreignCount > 0){
          try{
            const ta = document.getElementById('psCrew');
            if(ta){
              const vorhanden = parseCrew(ta.value).map(function(x){ return x.toLowerCase(); });
              const fehlend = merged.filter(function(n){ return vorhanden.indexOf(n.toLowerCase()) < 0; });
              if(fehlend.length){
                const selS = ta.selectionStart, selE = ta.selectionEnd;
                const sep = (ta.value && !/\n\s*$/.test(ta.value)) ? '\n' : '';
                ta.value = (ta.value + sep + fehlend.join('\n')).slice(0, CREW_TEXT_MAX);
                if(document.activeElement === ta){ try{ ta.setSelectionRange(selS, selE); }catch(e){} }
              }
              state.crewText = ta.value;
              state.crew = parseCrew(ta.value).slice(0, CREW_MAX);
            } else {
              state.crew = merged.slice();
              state.crewText = merged.join('\n');
            }
            updateCrewInfo();
          }catch(e){}
        }
        state.crewSynced = merged.slice();
        const extra = foreignCount > 0 ? ' (inkl. ' + foreignCount + ' von der Partyseite übernommen)' : '';
        if(verdraengt > 0){
          /* Gate-Befund: Am 30er-Deckel fielen Fremd-Namen still hinten raus — samt Gast-Link.
             Wenn schon jemand verlieren muss, dann sichtbar. */
          _crewSyncMsg('⚠️ Mehr als ' + CREW_MAX + ' Kinder: ' + verdraengt + ' Name(n) von deiner Partyseite konnten nicht übernommen werden und wurden dort entfernt. Streich hier jemanden, wenn sie zurücksollen.', '#B26A00');
        } else {
          _crewSyncMsg('✓ ' + n + (n===1?' Kind':' Kinder') + ' auf deiner Partyseite' + extra + ' — die persönlichen Links stehen dort unter „💌 Persönliche Einladungen".', '#1E7B34');
        }
        autoSave();
      } else if(r.status===403 || r.status===404){
        _crewSyncMsg('⚠️ Deine Partyseite lässt sich von hier nicht mehr bearbeiten — nutze den Verwaltungs-Link aus deiner E-Mail.', '#B26A00');
      } else {
        _crewSyncMsg('⚠️ Übertragung fehlgeschlagen (Fehler ' + r.status + ') — tipp einen Buchstaben, dann versuchen wir es erneut.', '#B26A00');
      }
    }catch(e){
      _crewSyncMsg('⚠️ Keine Verbindung — wir versuchen es gleich nochmal.', '#B26A00');
      setTimeout(scheduleCrewSync, 8000);   // echter Retry statt leerem Versprechen
    }finally{
      _crewSyncBusy = false;
      if(_crewSyncAgain){ _crewSyncAgain = false; scheduleCrewSync(); }
    }
  }
  function updateCrewInfo(rawCount){
    const el = document.getElementById('psCrewInfo'); if(!el) return;
    const crew = Array.isArray(state.crew) ? state.crew : [];
    if(!crew.length){
      el.innerHTML = 'Jedes Kind bekommt automatisch eine eigene Rolle im Motto und einen persönlichen Zusage-Link, auf dem sein Name schon eingetragen ist. Im Komplettpaket steht auf der Einladungs-Karte Name, Rolle und ein eigener QR-Code, auf dem Tischkärtchen Name und Rolle.';
      return;
    }
    const warn = [];
    if(typeof rawCount === 'number' && rawCount > CREW_MAX) warn.push('Mehr als ' + CREW_MAX + ' Kinder gehen nicht — die weiteren Namen werden nicht übernommen.');
    if(crew.some(function(n){ return n.length > CREW_NAME_MAX; })) warn.push('Ein Name ist länger als ' + CREW_NAME_MAX + ' Zeichen und wird gekürzt — kürze ihn lieber selbst.');
    const g = state.guests;
    const syncBtn = (crew.length >= 2 && crew.length <= 20 && crew.length !== g)
      ? ' <button type="button" onclick="syncGuestsToCrew()" style="border:none;background:none;color:#D4812A;font-weight:700;font-size:12px;cursor:pointer;text-decoration:underline;padding:0">Plan auf ' + crew.length + ' anpassen</button>'
      : '';
    const planNote = (crew.length !== g)
      ? '<br><span style="color:#8a6d3b">Dein Plan (Einkauf, Mengen) rechnet mit ' + g + ' Kindern.' + syncBtn + '</span>'
      : '';
    el.innerHTML = '<b>' + crew.length + (crew.length===1?' Kind':' Kinder') + '</b> — mit eigener Rolle, Zusage-Link mit vorausgefülltem Namen und im Komplettpaket einer eigenen Einladungs-Karte mit QR-Code.'
      + planNote
      + (warn.length ? '<br><span style="color:#B26A00">⚠️ ' + warn.join(' ') + '</span>' : '');
  }
  /* Übernimmt die Anzahl der Crew-Namen in den Plan (Einkaufsmengen/Mitgebsel) — nur auf Klick,
     damit niemandem seine bewusst gesetzte Gaestezahl unter den Fingern wegspringt. */
  function syncGuestsToCrew(){
    const n = (Array.isArray(state.crew) ? state.crew : []).length;
    if(!(n >= 2 && n <= 20)) return;   // Grenzen des Gaeste-Sliders
    state.guests = n;
    ['qGuests','iqGuests'].forEach(function(id){ const e=document.getElementById(id); if(e) e.value = n; });
    ['qGuestsLabel','iqGuestsLabel','planGuests1'].forEach(function(id){ const e=document.getElementById(id); if(e) e.textContent = n; });
    updateCrewInfo();
    try{ renderPlanPreview(); }catch(e){}
    autoSave();
  }
  /* gameId fuer /api/create (Playtest 31.07.): Der Klassiker-Default wurde als '' gesendet. Auf der
     Partyseite war das folgenlos (Legacy-Fallback trifft denselben Pfad /einladung/<motto>/whatsapp/),
     ABER das Komplettpaket sah kein gameId und behauptete "kein Spiel gewaehlt" — bei jedem
     Default-Nutzer. Jetzt explizit senden. AUSNAHME Custom-Motto: dort zeigt der Wizard die
     Piraten-Liste (psMid-Fallback); ein explizites "piraten-klassik" wuerde die Freitext-Heuristik
     des Workers ueberschreiben ("Ritterburg-Party" -> ritter) und das falsche Spiel ausliefern. */
  function payloadGameId(){
    const gc = state.gameChoice || '';
    if(!gc) return '';
    if(gc.indexOf('-klassik') >= 0 && psMid() !== ((state.motto && state.motto.id) || '')) return '';
    return gc;
  }
  async function activatePartyseite(){
    // C: ECHTER Worker-Call (Port aus altem Planer) — POST /api/create, kein Fake mehr
    // M1: Re-Entrancy/Doppelklick-Schutz — sonst zweiter POST = zweite Partyseite mit eigenem editToken
    if(window.__partyCreating || (state.partyseite && state.partyseite.active)) return;
    // E-Mail-Pflicht (Bolle 13.07.): der Edit-Link ist der einzige Schluessel — ohne E-Mail-Sicherung
    // ist eine verwaiste Party weder aenderbar noch loeschbar. Nutzung NUR fuer den Link-Versand.
    const _psEmail = ((document.getElementById('psEmailInput')||{}).value || '').trim();
    if(!_psEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(_psEmail)){
      showFlash('Bitte gib deine E-Mail ein — dorthin schicken wir deinen Verwaltungs-Link (dein einziger Schlüssel zur Seite).');
      const _i = document.getElementById('psEmailInput'); if(_i){ _i.focus(); _i.style.borderColor = '#C0392B'; }
      return;
    }
    window.__partyCreating = true;
    const psBtn = document.querySelector('[onclick*="activatePartyseite"]'); if(psBtn) psBtn.disabled = true;
    const motto = state.motto || MOTTOS[0];
    const name = (state.name || '').trim() || 'Geburtstagskind';
    const statusEl = document.getElementById('psStatus');
    const urlEl = document.getElementById('psStatusUrl');
    if(statusEl) statusEl.style.display = 'flex';
    if(urlEl) urlEl.textContent = 'erstelle Partyseite …';
    const payload = {
      childName: name, age: (state.exactAge || ''),   // #26: nur das ECHTE Alter an die Partyseite; ohne Eingabe kein geratenes Gruppen-Alter (Worker rendert dann "feiert Geburtstag!")
      motto: motto.name, mottoId: (motto.id||''), mottoEmoji: motto.emoji, mottoColor: motto.accent || '#D4812A',
      gameId: payloadGameId(),   // volle Katalog-ID inkl. Klassiker (Custom-Motto ausgenommen — s. payloadGameId)
      invites: (Array.isArray(state.crew) ? state.crew : []).slice(0, CREW_MAX),   // Crew -> Rollen + persoenliche ?g-Links (makeInvites im Worker)
      date: state.date || '', time: state.time || '', endTime: state.endTime || '', address: (state.adresse || '').slice(0,200),
      notes: (state.partyMessage || ''), askAllergies: true, askPickup: true, wishes: [], ref: state.ref || '',   // #25: persoenliche Nachricht (statt redundantem "<Motto>-Geburtstag") -> rendert als Nachricht-Karte auf der Partyseite
      photoRound: (state.invite && state.invite.photo) || ''   // gecropptes Foto -> erscheint als "Kind klaut den Schatz" im Spiel der Partyseite (Worker validiert via isSafePhoto)
    };
    try{
      const res = await fetch('https://party.machsleicht.de/api/create', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
      if(!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      if(!data.url || !data.editUrl) throw new Error('Unvollstaendige Antwort vom Server');
      state.partyseite.active = true; state.partyseite.url = data.url; state.partyseite.editUrl = data.editUrl;
      /* Selbst-Catch 31.07.: Die beim Anlegen gesendeten Namen SIND der zuletzt synchronisierte
         Stand. Ohne diese Zeile haelt der Drei-Wege-Merge sie beim ersten Loeschen faelschlich
         fuer Fremd-Ergaenzungen und laesst das geloeschte Kind wieder auferstehen. */
      state.crewSynced = (Array.isArray(state.crew) ? state.crew : []).slice(0, CREW_MAX);
      try{ if(window.plausible) plausible('party_created', {props:{motto: ((motto.id||'').indexOf('custom')===0?'custom':(motto.id||'')), source:'wizard', referred: state.ref ? '1' : '0'}}); }catch(e){}
      // Share-Loop (Host -> Gaeste): Status + 1-Klick-Share aus dem ECHTEN data.url aufbauen — gleiche Funktion wie der Resume-Restore (Single Source).
      try{ showPartyShare(data.url, data.editUrl); }catch(e){ console.warn('share-block', e); }
      state.partyseite.email = _psEmail;
      try{ autoSendEditLink(_psEmail); }catch(e){}
      autoSave();
    }catch(err){
      if(urlEl) urlEl.textContent = '';
      if(statusEl) statusEl.innerHTML = '⚠️ Konnte Partyseite nicht erstellen (' + esc(err.message || 'Verbindung') + '). Bitte nochmal versuchen.';
      if(psBtn) psBtn.disabled = false;   // M1: bei Fehler Retry erlauben (bei Erfolg bleibt Button aus, active-Guard greift)
    }finally{
      window.__partyCreating = false;
    }
  }

  // Share-Loop: echten Partyseiten-Link in die Zwischenablage (Fallback execCommand fuer aeltere/Non-HTTPS-Kontexte).
  function copyPartyUrl(){
    const url = window.__partyShareUrl || (state.partyseite && state.partyseite.url) || '';
    if(!url) return;
    const done = ()=>{ const b=document.getElementById('psShareCopy'); if(b){ const t=b.textContent; b.textContent='✅ Kopiert!'; setTimeout(()=>{ try{ b.textContent=t; }catch(e){} }, 1600); } try{ if(window.plausible) plausible('party_share_click', {props:{channel:'copy'}}); }catch(e){} };
    try{
      if(navigator.clipboard && navigator.clipboard.writeText){ navigator.clipboard.writeText(url).then(done).catch(()=>done()); }
      else { const ta=document.createElement('textarea'); ta.value=url; ta.style.position='fixed'; ta.style.opacity='0'; document.body.appendChild(ta); ta.select(); let ok=false; try{ ok=document.execCommand('copy'); }catch(e){} document.body.removeChild(ta); if(ok){ done(); } else { const b=document.getElementById('psShareCopy'); if(b){ const t=b.textContent; b.textContent='Bitte Link manuell kopieren'; setTimeout(()=>{ try{ b.textContent=t; }catch(e){} }, 2000); } } }
    }catch(e){ console.warn('copyPartyUrl', e); }
  }

  // ===== Mobile Preview Toggle =====
  function togglePreview(ev){
    ev = ev || window.event;   // C5: kein Verlass auf globales event (Firefox/strict)
    const wrap = document.getElementById('phoneWrap');   // nach Merge: nur noch die Telefon-Vorschau auf der Einladung+Partyseite-Stage
    const btn = ev && ev.currentTarget ? ev.currentTarget : null;
    if(wrap) wrap.classList.toggle('open');
    if(btn) btn.classList.toggle('open');
    if(wrap && wrap.classList.contains('open')) setTimeout(function(){ try{ wrap.scrollIntoView({behavior:'smooth',block:'start'}); }catch(e){} }, 60);
  }

  // ===== STAGE 6 =====
  // Final-Gate M4: Druck-Versprechen einloesen — geschlossene <details> lassen sich per CSS nicht oeffnen
  // (UA versteckt den Inhalt im Shadow-Slot), darum beforeprint/afterprint.
  window.addEventListener('beforeprint', function(){
    window.__printOpened = [];
    document.querySelectorAll('#stage3 details:not([open])').forEach(function(d){ d.open = true; window.__printOpened.push(d); });
  });
  window.addEventListener('afterprint', function(){
    (window.__printOpened||[]).forEach(function(d){ d.open = false; });
    window.__printOpened = [];
  });

  // F4 (Gate 13.07.): Sticky-CTA morpht nach halbem Plan-Scroll zum Funnel-naechsten Schritt.
  window.addEventListener('scroll', function(){
    try{
      const s3 = document.getElementById('stage3'); if(!s3 || s3.offsetParent === null) return;
      const cta = document.getElementById('stickyCta'); if(!cta || cta.dataset.morphed) return;
      const pb = document.getElementById('planBody'); if(!pb) return;
      if(window.scrollY > (pb.offsetTop + pb.offsetHeight * 0.5 - window.innerHeight)){
        cta.dataset.morphed = '1';
        // Zustand NICHT festbacken (Final-Check 13.07.): zwischen Morph und Klick kann die Nutzerin
        // aktivieren (Stage 4 -> zurueck) — Label + Ziel deshalb bei jedem Aufruf frisch berechnen.
        const _syncMorph = function(){
          const a = !!(state.partyseite && state.partyseite.active);
          const l = document.getElementById('stickyLabel'); if(l) l.innerHTML = a ? 'Plan gefällt?<small>Alles beisammen — mach dich fertig</small>' : 'Plan gefällt?<small>Deine Einladung ist noch nicht aktiv</small>';
          const b = document.getElementById('stickyBtn'); if(b){ b.textContent = a ? 'Fertig machen →' : 'Einladung aktivieren →'; b.onclick = function(){ goStage(!!(state.partyseite && state.partyseite.active) ? 5 : 4); }; }
        };
        _syncMorph();
        window.__syncStickyMorph = _syncMorph;   // goStage(3) refresht den gemorphten Zustand
      }
    }catch(e){}
  }, {passive:true});

  function renderDoneSummary(){
    document.getElementById('sumMottoEmoji').textContent = state.motto?.emoji || '🏴‍☠️';
    document.getElementById('sumMotto').textContent = state.motto?.name || 'Piraten';
    document.getElementById('sumName').textContent = state.name;
    { const _d = state.date ? new Date(state.date) : null; document.getElementById('sumDate').textContent = (_d && !isNaN(_d.getTime())) ? _d.toLocaleDateString('de-DE') : '—'; }
    document.getElementById('sumGuests').textContent = state.guests + ' Kinder';
    document.getElementById('sumGames').textContent = state.games.length + ' ausgewählt';
    document.getElementById('sumParty').textContent = state.partyseite.active ? 'aktiv ✓' : 'nicht aktiv';
    // F1 (Gate 13.07.): kein Erfolgsclaim ohne Aktivierung — sonst schliesst die Nutzerin den Tab
    // im Glauben 'fertig' und es entsteht nie eine Partyseite (= kein Reveal, kein Teil-Moment).
    const _psAct = !!(state.partyseite && state.partyseite.active);
    const _db = document.getElementById('doneBadge'); if(_db) _db.textContent = _psAct ? '✓ Alles eingerichtet' : '⏳ Fast fertig — 1 Schritt offen';
    const _dl = document.getElementById('doneLead'); if(_dl) _dl.textContent = _psAct
      ? 'Plan, Einladung und Partyseite sind bereit. Wähl, was du jetzt brauchst — oder speicher dir den Plan für später (Button oben rechts).'
      : 'Dein Plan steht. Damit Gäste zusagen können, aktiviere noch deine Einladung & Partyseite.';
    const _dc = document.getElementById('doneActivateCta'); if(_dc) _dc.style.display = _psAct ? 'none' : '';
  }

  // ===== SAVE-LATER MODAL =====
  // Ein Modal, drei Modi: 'save' (Plan-Link), 'pdf' + 'print' (ehrliche Warteliste statt Fake-Button).
  // Warteliste = messbares Monetarisierungs-Signal ohne UWG-Risiko (kein "kaufen", das nichts kauft).
  const SL_MODES = {
    save:  { h:'💾 Plan geräteübergreifend sichern', p:'Dein Plan ist schon auf diesem Gerät gespeichert. Trag deine E-Mail ein, dann schicken wir dir den geräteübergreifenden Link, sobald die Funktion live ist.', btn:'Vormerken' },
    pdf:   { h:'📥 Plan-PDF — sag mir Bescheid',  p:'Der PDF-Export ist in Arbeit. Trag deine Email ein, dann schicke ich dir das fertige PDF, sobald es da ist. Dein Plan ist solange online gespeichert und jederzeit abrufbar.', btn:'Auf die Liste setzen' },
    print: { h:'📦 Komplettpaket Print — Warteliste', p:'Das Druck-Komplettpaket (Urkunden, Spielkarten, Einladungen — 15+ Seiten) ist in Vorbereitung. Trag dich ein und du erfährst als Erste:r, sobald es bestellbar ist. Keine Zahlung, keine Verpflichtung.', btn:'Auf die Warteliste' }
  };
  function setModalMode(mode){
    window.__slMode = SL_MODES[mode] ? mode : 'save';
    const m = SL_MODES[window.__slMode];
    const h=document.getElementById('slHeading'); if(h) h.textContent=m.h;
    const p=document.getElementById('slText'); if(p) p.textContent=m.p;
    const b=document.getElementById('slSubmit'); if(b) b.textContent=m.btn;
  }
  function openSaveLater(){
    setModalMode('save');
    document.getElementById('saveLaterModal').classList.add('open');
    setTimeout(() => document.getElementById('modalEmail').focus(), 100);
  }
  // Premium-Paket-Pilot (30.07.2026): fuer Partys mit aktiver Partyseite ist das Komplettpaket
  // ECHT abrufbar (/paket/<motto>/, liest Party per id+editToken). Mottos ohne fertiges Paket
  // bleiben Warteliste. Token stammt aus der eigenen editUrl — es verlaesst nie die
  // Domain-Familie (machsleicht.de -> party.machsleicht.de).
  //
  // EINZIGE Freischalt-Stelle (31.07.2026): Ein neues Motto-Paket wird hier eingetragen, und
  // Link, Knopf-Beschriftung und Tracking ziehen mit. Vorher stand 'piraten' an drei Stellen
  // hart im Code — das Dino-Paket waere gebaut, aber unerreichbar gewesen.
  const PAKET_MOTTOS = { piraten:   {emoji:'🏴‍☠️', label:'Piraten-Komplettpaket'},
                         dino:      {emoji:'🦕',   label:'Dino-Komplettpaket'},
                         feuerwehr: {emoji:'🚒',   label:'Feuerwehr-Komplettpaket'} };
  // hasOwnProperty statt Direktzugriff: ein Custom-Motto namens "constructor" darf hier nichts treffen.
  function paketMotto(){
    const id = String((state.motto&&state.motto.id)||'');
    return Object.prototype.hasOwnProperty.call(PAKET_MOTTOS, id) ? id : '';
  }
  function paketPilotUrl(){
    try{
      const mid = paketMotto();
      if(!mid) return '';
      const eu = state.partyseite && state.partyseite.active && state.partyseite.editUrl;
      if(!eu) return '';
      const m = /party\.machsleicht\.de\/([a-z0-9]+)\?edit=([a-z0-9]+)/i.exec(eu);
      return m ? ('/paket/'+mid+'/?id='+m[1]+'&edit='+m[2]) : '';
    }catch(e){ return ''; }
  }
  function openWaitlist(product){
    if(product === 'print'){
      const pu = paketPilotUrl();
      if(pu){
        try{ if(window.plausible) plausible('paket_open', {props:{motto:paketMotto(), source:'checkout-card'}}); }catch(e){}
        window.open(pu, '_blank', 'noopener');
        return;
      }
    }
    setModalMode(product);
    try{ if(window.plausible) plausible('waitlist_open', {props:{product: product}}); }catch(e){}
    document.getElementById('saveLaterModal').classList.add('open');
    setTimeout(() => document.getElementById('modalEmail').focus(), 100);
  }
  function closeSaveLater(){ document.getElementById('saveLaterModal').classList.remove('open') }
  function sendMagicLinkModal(){
    const email = document.getElementById('modalEmail').value.trim();
    if(!email || !email.includes('@')){ alert('Bitte gültige Email eingeben'); return; }
    const mode = window.__slMode || 'save';
    closeSaveLater();
    if(mode === 'pdf' || mode === 'print'){
      // F2 (Gate 13.07.): Warteliste REAL — E-Mail landet im Worker-KV (/api/waitlist), nicht mehr im Nichts.
      const label = mode === 'print' ? 'das Komplettpaket' : 'das Plan-PDF';
      fetch('https://party.machsleicht.de/api/waitlist', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, product: mode }) })
        .then(r => { if(!r.ok) throw new Error('HTTP'+r.status);
          try{ if(window.plausible) plausible('waitlist_signup', {props:{product: mode}}); }catch(e){}
          showFlash(`✓ Eingetragen — wir melden uns einmalig, sobald ${label} verfügbar ist.`);
        })
        .catch(() => showFlash('⚠️ Eintragen hat gerade nicht geklappt — bitte später nochmal versuchen.'));
    } else {
      // Final-Gate M5: E-Mail nicht verwerfen — Vormerkung in der Warteliste (Info, sobald der E-Mail-Link live ist).
      fetch('https://party.machsleicht.de/api/waitlist', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, product: 'magiclink' }) })
        .then(r => { if(!r.ok) throw new Error('HTTP'+r.status); showFlash('💾 Lokal gespeichert ✓ — wir sagen dir per E-Mail Bescheid, sobald der Link-Versand live ist.'); })
        .catch(() => showFlash('💾 Lokal gespeichert ✓ — Vormerken hat gerade nicht geklappt, bitte spaeter nochmal.'));
    }
  }

  // ===== FLASH =====
  function showFlash(msg){
    const flash = document.createElement('div');
    flash.setAttribute('role','alert');   // W-FORMERR: Flash-Meldungen (u.a. E-Mail-Fehler) fuer Screenreader ansagen
    flash.textContent = msg;
    flash.style.cssText = 'position:fixed;top:80px;left:50%;transform:translateX(-50%);background:#0F7B3F;color:#fff;padding:12px 24px;border-radius:999px;font-family:Nunito;font-weight:800;font-size:14px;z-index:300;box-shadow:0 6px 20px rgba(0,0,0,.2);animation:fadeIn .25s';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 2200);
  }

  // ===== Sticky scroll =====
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const sc = window.scrollY;
    const cta = document.getElementById('stickyCta');
    if(cta){
      if(sc > 300 && sc > lastScroll) cta.classList.add('hidden');
      else cta.classList.remove('hidden');
    }
    lastScroll = sc;
  });

  // ===== GAME-DETAIL DRAWER (Click auf Spiel-Karte) =====
  let gdCurrentGame = null;  // Name des aktuell im Drawer gezeigten Spiels (für „In den Plan")
  const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const escA = s => esc(s).replace(/"/g,'&quot;').replace(/'/g,'&#39;'); // Attribut-Kontext (href etc.)
  // Markdown-Links [Text](https://...) in Elite-JSON-Texten zu echten Affiliate-Links rendern statt roh anzuzeigen
  // (sonst sieht der Nutzer die nackte amazon-URL inkl. tag=). Erst esc (XSS), dann nur das [..](http..)-Muster ersetzen.
  const mdLink = s => esc(s==null?'':String(s)).replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (m,txt,url) => {
    const spon = /(amazon\.|amzn\.|awin1?\.|[?&]tag=)/i.test(url) ? 'sponsored ' : '';   // Q1: rel=sponsored nur fuer echte Affiliate-Links
    return '<a href="'+url.replace(/"/g,'&quot;')+'" target="_blank" rel="'+spon+'noopener">'+txt+'</a>'+(spon?'<sup>*</sup>':'');   // " im href escapen; * = sichtbare Werbelink-Kennzeichnung (Final-Gate M6)
  });

  function openGameDetail(gameName){
    const motto = state.motto || MOTTOS[0];
    if(!motto) return;
    const g = (motto.games || []).find(x => x.name === gameName);
    if(!g){ console.warn('Game not found:', gameName); return; }
    gdCurrentGame = g.name;

    document.getElementById('gdEmoji').textContent = g.emoji;
    document.getElementById('gdTitle').textContent = g.name;
    // Meta-Zeile: Dauer + (kuratiert) Spieleranzahl
    let meta = g.dauer ? `⏱ ${g.dauer} Min` : '⏱ Dauer flexibel';
    if(g.players && g.players.ideal) meta += ` · 👥 ${g.players.ideal}`;
    document.getElementById('gdMeta').innerHTML = meta;

    let body = '';

    if(g.curated || g.material || g.brief){
      if(g.prep != null || g.mess){
        const bits = [];
        if(g.prep != null) bits.push(`🧰 Vorbereitung: ${typeof g.prep === 'number' ? g.prep + ' Min' : esc(g.prep)}`);
        if(g.mess) bits.push(`🧹 Aufwand: ${esc(String(g.mess).split('—')[0].split('(')[0].trim())}`);
        if(bits.length) body += `<div class="gd-section"><p style="color:#666;font-size:13px;margin:0">${bits.join(' · ')}</p></div>`;
      }
      if(g.material){
        const items = (Array.isArray(g.material) ? g.material : [g.material]).map(m => `<li>${esc(m)}</li>`).join('');
        body += `<div class="gd-section"><h4>🛒 Material</h4><ul>${items}</ul></div>`;
      }
      // Anleitung: kuratiert = nummerierte Schritte (anleitung[]), sonst alter brief-Text
      if(Array.isArray(g.anleitung) && g.anleitung.length){
        const steps = g.anleitung.map(s => `<li>${esc(s)}</li>`).join('');
        body += `<div class="gd-section"><h4>📖 Anleitung</h4><ol style="margin:0;padding-left:20px;line-height:1.6">${steps}</ol></div>`;
      } else if(g.brief){
        body += `<div class="gd-section"><h4>📖 Kurz-Anleitung</h4><p>${esc(g.brief)}</p></div>`;
      }
      if(g.safety){
        body += `<div class="gd-section"><div class="gd-safety">⚠ ${esc(g.safety)}</div></div>`;
      }
      // Varianten je Alter (nur kuratiert)
      if(g.variants && typeof g.variants === 'object'){
        const vs = Object.entries(g.variants).map(([alter,v]) =>
          `<li><b>${esc(alter)}:</b> ${esc(v.name || '')}${v.desc ? ' — ' + esc(v.desc) : ''}</li>`).join('');
        if(vs) body += `<div class="gd-section"><h4>🎚 Varianten nach Alter</h4><ul>${vs}</ul></div>`;
      }
    } else {
      body += `<div class="gd-section"><div class="gd-pending">Die Kurzbeschreibung oben reicht zum Losspielen — die ausführliche Schritt-für-Schritt-Anleitung mit Material-Liste und Sicherheits-Hinweisen ergänzen wir für dieses Spiel gerade.</div></div>`;
    }

    // „In den Plan"-Button (toggelt state.games) — nur wenn das Motto gerade aktiv ist
    const inPlan = state.games.includes(g.name);
    body += `<button class="gd-addplan ${inPlan ? 'is-in' : ''}" id="gdAddBtn" onclick="toggleGameFromDrawer()">${inPlan ? '✓ Im Plan — entfernen' : '➕ In den Plan aufnehmen'}</button>`;

    document.getElementById('gdBody').innerHTML = body;
    document.getElementById('gameDrawer').classList.add('open');
  }

  // Delegierter Picker-Handler: liest den Pool-Index aus data-gi und loest den Spielnamen sicher
  // ueber window.__gpNames auf — keine Inline-onclick-String-Interpolation, daher kein Escaping-/
  // Injection-Risiko bei Spielnamen mit ", \\, ' oder HTML (Reviewer-MAJOR 19.06.).
  if(!window.__gamePickerBound){
    window.__gamePickerBound = true;
    document.addEventListener('click', function(e){
      // Elite-Plan: Toggle-Button im Spiel-Summary -> ab-/anwaehlen (preventDefault, sonst klappt das <details> auf)
      const eg = e.target.closest && e.target.closest('.egame__tog[data-eg]');
      if(eg){ e.preventDefault(); e.stopPropagation(); const nm=(window.__egNames||[])[parseInt(eg.getAttribute('data-eg'),10)]; if(nm!=null) toggleEliteGame(nm, eg); return; }
      const el = e.target.closest && e.target.closest('.games-grid [data-gi]');
      if(!el) return;
      const name = (window.__gpNames || [])[parseInt(el.getAttribute('data-gi'),10)];
      if(name == null) return;
      if(el.getAttribute('data-detail')){ e.stopPropagation(); openGameDetail(name); }
      else { togglePlanGame(name); }
    });
    document.addEventListener('keydown', function(e){
      if(e.key !== 'Enter' && e.key !== ' ') return;
      const tile = e.target.closest && e.target.closest('.games-grid .game-tag[data-gi]');
      if(!tile) return;
      e.preventDefault();
      const name = (window.__gpNames || [])[parseInt(tile.getAttribute('data-gi'),10)];
      if(name != null) togglePlanGame(name);
    });
  }
  // In-Plan-Toggle: Tap auf eine Spiel-Kachel nimmt sie rein/raus. Mindestens 1 Spiel bleibt im Plan.
  function togglePlanGame(name){
    if(!name) return;
    if(state.games.includes(name)){
      if(state.games.length <= 1) return;   // Plan nie ganz ohne Spiel
      state.games = state.games.filter(n => n !== name);
    } else {
      state.games.push(name);
    }
    renderPlanPreview();
    try{ autoSave(); }catch(e){}
  }
  // Elite-Plan: Spiel ab-/anwaehlen (mind. 1 bleibt). Aktualisiert das DOM DIREKT statt Full-Re-Render
  // -> aufgeklappte Spiele bleiben offen, kein Scroll-Sprung, kein Re-Fetch, keine Async-Race (Reviewer-MINORs).
  function toggleEliteGame(name, btn){
    if(!name) return;
    const off = state.eliteOff || (state.eliteOff = []);
    const names = window.__egNames || [];
    const i = off.indexOf(name);
    if(i >= 0){ off.splice(i, 1); }
    else {
      const sel = names.filter(n => !off.includes(n)).length;
      if(sel <= 1) return;   // mind. 1 Spiel im Plan
      off.push(name);
    }
    const nowOff = off.includes(name);
    const det = btn && btn.closest('.egame');
    if(det){
      det.classList.toggle('egame--off', nowOff);
      btn.textContent = nowOff ? '+' : '✓';
      btn.setAttribute('aria-pressed', nowOff ? 'false' : 'true');
      btn.setAttribute('aria-label', name + (nowOff ? ' in den Plan nehmen' : ' aus dem Plan nehmen'));
      const sel = names.filter(n => !off.includes(n)).length;
      const h = [...document.querySelectorAll('.mod__title')].find(x => /^Spiele · \d+ mit Anleitung$/.test(x.textContent.trim()));
      if(h) h.textContent = 'Spiele · ' + sel + ' mit Anleitung';
    } else {
      renderElitePlan().catch(()=>{});   // Fallback ohne Button-Kontext
    }
    try{ autoSave(); }catch(e){}
  }
  function toggleGameFromDrawer(){
    if(!gdCurrentGame) return;
    if(state.games.includes(gdCurrentGame)) state.games = state.games.filter(n => n !== gdCurrentGame);
    else state.games.push(gdCurrentGame);
    autoSave();
    // Button im Drawer aktualisieren
    const btn = document.getElementById('gdAddBtn');
    const inPlan = state.games.includes(gdCurrentGame);
    if(btn){ btn.classList.toggle('is-in', inPlan); btn.textContent = inPlan ? '✓ Im Plan — entfernen' : '➕ In den Plan aufnehmen'; }
    // Auswahl-Grid + Zähler live mitziehen, falls sichtbar
    if(document.getElementById('qGamesMulti')) renderGamesMulti();
    const sg = document.getElementById('sumGames'); if(sg) sg.textContent = state.games.length + ' ausgewählt';
  }

  function closeGameDetail(){
    document.getElementById('gameDrawer').classList.remove('open');
  }

  // ESC schliesst Game-Drawer
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
      const drawer = document.getElementById('gameDrawer');
      if(drawer && drawer.classList.contains('open')) closeGameDetail();
    }
  });

  // ===== Init =====
  renderMottos();
  maybeShowResumeBanner();
  // Scroll-Funnel: Default-Auswahl + alle Sektionen beim Laden rendern (nie leer, voll crawlbar)
  (function initFunnel(){
    try{
      // Funnel-Eintritt: eingehende URL-Params (Handoff von Motto-Seiten etc.) — ?motto/?alter/?gaeste/?modus/?thema
      try{
        const p = new URLSearchParams(window.location.search);
        // ?motto (Planer/Motto-Seiten) ODER ?thema (Schatzsuche-SEO-Seiten /schatzsuche/<motto>) — beide docken auf dieselbe Motto-Auswahl
        const m = p.get('motto') || p.get('thema') || window.__selectedMotto;
        if(m){ const hit = MOTTOS.find(x => x.id === m); if(hit){ state.motto = hit; window.__hasEntryParam = true; } }
        const a = p.get('alter'); if(a){ const v = parseInt(a,10); if(v>=3 && v<=12){ state.age = v<=5 ? '3-5' : (v<=8 ? '6-8' : '9-12'); window.__hasEntryParam = true; window.__hasEntryAge = true; } }
        const g = p.get('gaeste'); if(g){ const v = parseInt(g,10); if(v>=2 && v<=20){ state.guests = v; window.__hasEntryParam = true; } }
        const r = p.get('ref'); if(r && /^[a-z0-9]{6,12}$/.test(r)){ state.ref = r; }   // Virale Attribution: Quell-Party-ID (Gast->Host-Loop) -> bei /api/create mitschicken
        window.__entryModus = p.get('modus') || '';   // 'schatzsuche' -> nach Render zur Schatzsuche scrollen
      }catch(ep){ console.warn('param-in', ep); }
      if(!state.motto){ state.motto = MOTTOS.find(m => m.id === 'piraten') || MOTTOS[0]; }
      if(!state.age){ state.age = '6-8'; }
      // Deep-Link-Eintritt (?motto/?thema von SEO-Seiten) seedet die Einladung aus dem Motto-Template,
      // sonst zeigt renderInvitePreview() eine leere Vorschau am Haupt-Einstieg. Nicht ueberschreiben, wenn schon gesetzt (Resume).
      if(state.motto && state.motto.invite && !state.invite.title && !state.invite.body){
        state.invite.title = state.motto.invite.title || '';
        state.invite.body = `${state.name} ${(state.motto.invite.body||'').replace('{age}', ageNum()).replace('{name}', state.name)}`.trim();
      }
      applyAccent(state.motto);
      if(typeof renderAges === 'function') renderAges();
      if(typeof syncEckdaten === 'function') syncEckdaten();   // Inline-Eckdaten aus State befuellen
      syncPsGameUI();   // Spiel-Wahl-UI aus State (Deep-Link-/Init-Pfad)
      if(window.__hasEntryParam){
        // Deep-Link (SEO-/Motto-/Schatzsuche-Seite mit ?motto/?thema/?alter): Motto/Alter mitgebracht.
        // Plan-Inhalt vorbereiten (in noch verstecktem Stage 3), aber NICHT auto-revealen: erst den Namen abfragen,
        // damit auch der SEO-Einstieg einen PERSONALISIERTEN Plan bekommt (sonst "dein Kind" + plan_ready feuert nie).
        renderPlanPreview();
        try{
          // Button NUR zeigen, wenn das Alter wirklich per ?alter kam (nicht beim '6-8'-Default) -> respektiert die "keine-Vorschau-auf-geratenem-Alter"-Invariante.
          // showPlanBtn() zeigt Button + Outline + (mangels Name) den Pflicht-Cue/Fokus. Bei ?motto-only landet der Nutzer nur auf Stage 2 und waehlt das Alter selbst.
          if(window.__hasEntryAge){ showPlanBtn(); }
          goStage(2);                                          // auf Eckdaten/Stage 2 landen (Motto vorbelegt), Reveal erst nach Name
        }catch(e){ console.warn('initFunnel deep-link', e); }
      }
      // Virgin-State (kein Param): KEIN Vorab-Render/Reveal von Stage 3-5. Der Plan ist die Belohnung fuer Motto+Alter+Name+"Plan ansehen".
      // Folge-Stages werden on-demand in goStage() gerendert (renderInvitePreview+renderPartyseitePreview@n=4, renderDoneSummary@n=5).
    }catch(e){ console.warn('initFunnel failed', e); }       // Default-Render darf den Wizard nie blockieren, aber meldet sich
  })();
