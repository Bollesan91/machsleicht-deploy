/* Skin-Generator fuer die "Aufdecken & Fangen"-Reskin-Familie.
   Liest das Piraten-Pilot-Spiel als Template und erzeugt game-schatzjagd-<motto>.html
   je Motto durch Austausch von 4 Bloecken: <title>, :root, const THEME={...}, const NOPHOTO=...
   Mechanik-Fix -> im Piraten-Pilot aendern + `node _skin-gen.js` -> alle Skins neu. */
const fs=require('fs');
const TEMPLATE='game-schatzjagd-piraten.html';
const src=fs.readFileSync(TEMPLATE,'utf8');

// Pro Motto: title (nur der Motto-Teil), root (CSS-Vars-Werte), theme (kompletter const THEME={...};-Block), nophoto (komplette const NOPHOTO=...;-Zeile)
const MOTTOS={
  dino:{
    title:'Dino',
    root:':root{--bg1:#143a1c;--bg2:#2c2a1e;--fg:#fff;--accent:#66BB6A;--accent-dk:#2E7D32;--ink:#14280a}',
    theme:`const THEME = {
  photo:'/birthday-photo.jpg',
  icon:'🥚',
  title:"Krümel büxt aus!",
  task:"Halt die Dino-Eier warm für {kid} — bis Krümel schlüpft!",
  how:"👆 Halt ein Ei gedrückt und klopf es warm",
  items:['🥚','🦴','🌋','🥚','🐾','🌴','🥚','🦴','🥚'],
  reward:['🦕','🦕','🦖'], treasureFx:'🥚', emptyFx:'🪨', stealFx:'🐣', goal:'Riesen-Ei!',
  sprite:'🐣', spriteName:'Krümel',
  sky:['#8fd0e8','#f4c17a','#d9776b','#241a2e'],
  hints:['Klopf ein Ei warm — halt es gedrückt!','🦕 Ein Baby schlüpft! Wärm das nächste!','Fast — das RIESEN-Ei wackelt schon!'],
  chaseHint:'Fang Krümel — schnell, er flitzt!',
  cine:{kick:'OH-OH!', steal:'Das RIESEN-Ei wackelt … Krümel schlüpft — und flitzt quietschend davon!'},
  win:{title:'Krümel ist geschnappt!', line:(k)=>\`In Krümels Bauch steckte ein Foto — und \${k} strahlt heraus! Komm zur Dino-Party:\`,
       lineNoFoto:(k)=>\`Krümel ist gefangen — \${k} lädt dich zur Dino-Party ein:\`},
  reveal:'🐣 Krümels Geheimnis!',
  cc:['#66BB6A','#FF7043','#FFD54F','#fff','#2E7D32']
};`,
    nophoto:`const NOPHOTO="data:image/svg+xml,"+encodeURIComponent(\`<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><rect width='240' height='240' fill='#2E7D32'/><ellipse cx='120' cy='142' rx='68' ry='78' fill='#e8d5a0'/><circle cx='120' cy='120' r='36' fill='#66BB6A'/><circle cx='107' cy='114' r='6' fill='#111'/><circle cx='133' cy='114' r='6' fill='#111'/><path d='M104 138 q16 12 32 0' stroke='#111' stroke-width='5' fill='none'/><text x='120' y='216' font-size='34' text-anchor='middle'>🦕</text></svg>\`);`
  },
  safari:{
    title:'Foto-Safari',
    root:':root{--bg1:#4e342e;--bg2:#6d4c41;--fg:#fff;--accent:#FF9800;--accent-dk:#E65100;--ink:#3e2723}',
    theme:`const THEME = {
  photo:'/birthday-photo.jpg',
  icon:'📸',
  title:"Foto-Safari: Erwische die wilden Tiere!",
  task:"Fotografiere die wilden Tiere für {kid} — bevor der Affe die Kamera schnappt!",
  how:"👆 Halt einen Busch gedrückt und pirsch dich ran",
  items:['🌿','🐾','🌳','🌿','🦁','🪨','🌴','🌿','🐾'],
  reward:['🦁','🐘','🦒'], treasureFx:'📷', emptyFx:'🐾', stealFx:'🙈', goal:'Gruppenfoto!',
  sprite:'🐒', spriteName:'Mango, der Affe',
  sky:['#87CEEB','#FFB74D','#FF7043','#1A237E'],
  hints:['Halt einen Busch gedrückt — schau nach!','🦁 Ein Löwe! Klick — im Kasten! Weiter pirschen!','Fast — wo versteckt sich das letzte Tier?'],
  chaseHint:'Mango hat die Kamera — schnapp ihn dir!',
  cine:{kick:'HUCH!', steal:'Mango, der freche Affe, schnappt die Kamera — und knipst wild drauflos!'},
  win:{title:'Alle im Kasten!', line:(k)=>\`Mango hat aus Versehen ein tolles Foto geknipst — und \${k} strahlt drauf! Komm zur Safari-Party:\`,
       lineNoFoto:(k)=>\`Alle Tiere im Kasten — \${k} lädt dich zur Safari-Party ein:\`},
  reveal:'🐒 Guck, was Mango geknipst hat!',
  cc:['#FF9800','#66BB6A','#FFD54F','#fff','#8D6E63']
};`,
    nophoto:`const NOPHOTO="data:image/svg+xml,"+encodeURIComponent(\`<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><rect width='240' height='240' fill='#FF9800'/><rect y='150' width='240' height='90' fill='#8D6E63'/><circle cx='120' cy='108' r='52' fill='#FFB74D'/><circle cx='104' cy='100' r='7' fill='#3e2723'/><circle cx='136' cy='100' r='7' fill='#3e2723'/><path d='M100 126 q20 16 40 0' stroke='#3e2723' stroke-width='5' fill='none'/><text x='120' y='214' font-size='36' text-anchor='middle'>📸</text></svg>\`);`
  },
  detektiv:{
    title:'Detektiv',
    root:':root{--bg1:#0d1b2a;--bg2:#1b263b;--fg:#fff;--accent:#FFB300;--accent-dk:#E65100;--ink:#0d1117}',
    theme:`const THEME = {
  photo:'/birthday-photo.jpg',
  icon:'🔍',
  title:"Der Fall der geklauten Torte",
  task:"Ein fieser Dieb hat die Geburtstagstorte geklaut! Untersuch den Tatort für {kid}.",
  how:"🔍 Halt die Lupe auf eine Spur und untersuch sie genau",
  items:['🔍','🐾','🎭','🧩','🔦','🧤','📦','🚪','🗝️'],
  reward:['🐾','🔎','🐾'], treasureFx:'🍰', emptyFx:'🕸️', stealFx:'💨', goal:'Die heiße Spur!',
  sprite:'🦝', spriteName:'Rudi, der Waschbär',
  sky:['#78909C','#FFB300','#C62828','#0D1117'],
  hints:['Halt die Lupe auf eine Spur — untersuch sie genau!','🐾 Eine Spur! Weiter ermitteln!','Fast — wo führt die letzte Spur hin?'],
  chaseHint:'Schnapp dir Rudi — er flieht mit der Torte!',
  cine:{kick:'ERTAPPT!', steal:'Ertappt! Rudi flitzt mit der geklauten Torte davon!'},
  win:{title:'Fall gelöst!', line:(k)=>\`Überführt! Rudi gibt die Torte zurück — und \${k} feiert weiter. Komm zur Detektiv-Party:\`,
       lineNoFoto:(k)=>\`Der Fall ist gelöst — \${k} lädt dich zur Detektiv-Party ein:\`},
  reveal:'🔍 Überführt! Fall gelöst!',
  cc:['#FFB300','#42a5f5','#E65100','#fff','#263238']
};`,
    nophoto:`const NOPHOTO="data:image/svg+xml,"+encodeURIComponent(\`<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><rect width='240' height='240' fill='#0d1117'/><circle cx='104' cy='104' r='46' fill='none' stroke='#FFB300' stroke-width='10'/><line x1='138' y1='138' x2='186' y2='186' stroke='#FFB300' stroke-width='14' stroke-linecap='round'/><text x='104' y='118' font-size='38' text-anchor='middle'>👣</text></svg>\`);`
  },
  superheld:{
    title:'Superheld',
    root:':root{--bg1:#0d47a1;--bg2:#1565C0;--fg:#fff;--accent:#FDD835;--accent-dk:#D32F2F;--ink:#0d1117}',
    theme:`const THEME = {
  photo:'/birthday-photo.jpg',
  icon:'🦸',
  title:"Wer rettet die Stadt?",
  task:"Sammle die Superkräfte für {kid} — bevor Doktor Grabsch sie klaut!",
  how:"👆 Durchsuch die Stadt — halt gedrückt",
  items:['📞','🏢','🚨','📮','🏪','🚗','🌳','📦','🗑️'],
  reward:['🎭','🧣','⚡'], treasureFx:'⚡', emptyFx:'💨', stealFx:'⚡', goal:'Superkraft!',
  sprite:'🦹', spriteName:'Doktor Grabsch',
  sky:['#1E88E5','#F57C00','#D32F2F','#0D1117'],
  hints:['Durchsuch die Stadt — halt gedrückt!','🎭 Ein Kraft-Teil! Rüste dich weiter aus!','Fast — wo ist die letzte Superkraft?'],
  chaseHint:'Doktor Grabsch hat deine Kraft — schnapp ihn dir!',
  cine:{kick:'NOTRUF!', steal:'Doktor Grabsch schnappt sich deine letzte Superkraft!'},
  win:{title:'Die Stadt ist gerettet!', line:(k)=>\`ZACK — die Superkraft springt in \${k}! Feier den neuen Helden der Stadt:\`,
       lineNoFoto:(k)=>\`Die Kraft ist zurück — \${k} lädt dich zur Superhelden-Party ein:\`},
  reveal:'⚡ VERWANDLUNG!',
  cc:['#1E88E5','#FDD835','#D32F2F','#fff','#0D1117']
};`,
    nophoto:`const NOPHOTO="data:image/svg+xml,"+encodeURIComponent(\`<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><rect width='240' height='240' fill='#0d47a1'/><path d='M120 42 L182 68 V122 Q182 182 120 206 Q58 182 58 122 V68 Z' fill='#D32F2F' stroke='#FDD835' stroke-width='7'/><text x='120' y='142' font-size='56' text-anchor='middle'>⭐</text></svg>\`);`
  },
  prinzessin:{
    title:'Prinzessin',
    root:':root{--bg1:#4a148c;--bg2:#880e4f;--fg:#fff;--accent:#EC407A;--accent-dk:#AD1457;--ink:#2E0854}',
    theme:`const THEME = {
  photo:'/birthday-photo.jpg',
  icon:'👑',
  title:"Eine Krone für {kid}",
  task:"Sammle die glitzernden Juwelen für {kid} — die Krone soll funkeln!",
  how:"👆 Heb ein Juwel — halt es gedrückt",
  items:['💎','🌹','🗝️','👠','🪞','🎀','💎','🦢','👑'],
  reward:['💎','💍','💎'], treasureFx:'👑', emptyFx:'✨', stealFx:'🐸', goal:'Die Krone!',
  sprite:'🐸', spriteName:'Frosch Ferdinand',
  sky:['#F48FB1','#FFD54F','#9C27B0','#2E0854'],
  hints:['Sammle ein Juwel für die Krone — halt gedrückt!','💎 Juwel gefunden! Die Krone glitzert schon!','Fast — wo funkelt das letzte Juwel?'],
  chaseHint:'Fang Ferdinand — er hat die Krone!',
  cine:{kick:'PLOPP!', steal:'Frosch Ferdinand schnappt sich die Krone und hüpft davon!'},
  win:{title:'Du bist gekrönt!', line:(k)=>\`Ferdinand war ein verzauberter Prinz — und er krönt \${k}! Komm zur Krönungs-Party:\`,
       lineNoFoto:(k)=>\`Die Krone funkelt wieder — \${k} lädt dich zur Krönungs-Party ein:\`},
  reveal:'✨ Der Frosch war ein Prinz!',
  cc:['#EC407A','#FFD700','#9C27B0','#fff','#F48FB1']
};`,
    nophoto:`const NOPHOTO="data:image/svg+xml,"+encodeURIComponent(\`<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><rect width='240' height='240' fill='#2E0854'/><path d='M58 156 L58 98 L92 132 L120 78 L148 132 L182 98 L182 156 Z' fill='#FFD700'/><circle cx='120' cy='76' r='9' fill='#EC407A'/><text x='120' y='206' font-size='34' text-anchor='middle'>💎</text></svg>\`);`
  },
  weltraum:{
    title:'Weltraum',
    root:':root{--bg1:#0d0221;--bg2:#1a0533;--fg:#fff;--accent:#B388FF;--accent-dk:#7c4dff;--ink:#0d0221}',
    theme:`const THEME = {
  photo:'/birthday-photo.jpg',
  icon:'🚀',
  title:"Volltanken für den Mond!",
  task:"Buddel den Sternenstaub aus dem Mond — damit {kid} zum Mond fliegen kann!",
  how:"👆 Klopf einen Mondkrater ab — halt gedrückt",
  items:['🌑','🪨','☄️','🌑','🛰️','🪨','🌠','🌑','🪐'],
  reward:['💫','⭐','💫'], treasureFx:'🌟', emptyFx:'💨', stealFx:'🛸', goal:'Volltank!',
  sprite:'🛸', spriteName:'Zisch, das UFO',
  sky:['#1a237e','#311b92','#4a148c','#0d0221'],
  hints:['Klopf einen Mondkrater ab — halt gedrückt!','💫 Sternenstaub! Der Tank füllt sich!','Fast voll — wo ist der letzte Sternenstaub?'],
  chaseHint:'Schnapp dir Zisch — er hat den Sternenstaub!',
  cine:{kick:'ALARM!', steal:'Zisch, das UFO, klaut den ganzen Sternenstaub!'},
  win:{title:'Volltank — die Rakete hebt ab!', line:(k)=>\`Und WHOOSH — \${k} düst als Astronaut zum Mond! Komm zur Weltraum-Party:\`,
       lineNoFoto:(k)=>\`Die Rakete hebt ab — \${k} lädt dich zur Weltraum-Party ein:\`},
  reveal:'🚀 Start frei!',
  cc:['#7c4dff','#FFD54F','#42a5f5','#fff','#1a237e']
};`,
    nophoto:`const NOPHOTO="data:image/svg+xml,"+encodeURIComponent(\`<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><rect width='240' height='240' fill='#0d0221'/><circle cx='60' cy='60' r='3' fill='#fff'/><circle cx='190' cy='50' r='2' fill='#fff'/><circle cx='150' cy='190' r='2' fill='#fff'/><circle cx='120' cy='118' r='54' fill='#7c4dff'/><ellipse cx='120' cy='118' rx='78' ry='20' fill='none' stroke='#B388FF' stroke-width='5' transform='rotate(-18 120 118)'/><text x='120' y='134' font-size='46' text-anchor='middle'>🚀</text></svg>\`);`
  },
  einhorn:{
    title:'Einhorn',
    root:':root{--bg1:#4527a0;--bg2:#6a1b9a;--fg:#fff;--accent:#B388FF;--accent-dk:#7c4dff;--ink:#1A0033}',
    theme:`const THEME = {
  photo:'/birthday-photo.jpg',
  icon:'🦄',
  title:"Sternhuf und der geklaute Regenbogen",
  task:"Der Regenbogen ist verblasst! Sammle die Glitzer-Farben für {kid}.",
  how:"👆 Schau unter der Blume nach — halt gedrückt",
  items:['🌸','☁️','🌷','☁️','🍄','💫','☁️','🌸','⭐'],
  reward:['🔴','🟡','🔵'], treasureFx:'🌈', emptyFx:'☁️', stealFx:'🦄', goal:'Regenbogen!',
  sprite:'🦄', spriteName:'Sternhuf',
  sky:['#7FD8FF','#FFD1F0','#B98CFF','#1A0033'],
  hints:['Schau unter der Blume nach — halt gedrückt!','✨ Eine Regenbogen-Farbe! Sammel weiter!','Fast — wo glitzert die letzte Farbe?'],
  chaseHint:'Fang Sternhuf, bevor er über den Regenbogen türmt!',
  cine:{kick:'MOMENT MAL…', steal:'Der Regenbogen wackelt — das ist ja Sternhufs Schweif! Und schon galoppiert er los!'},
  win:{title:'Aufsitzen — über den Regenbogen!', line:(k)=>\`Sternhuf holt \${k} zur Einhorn-Party ab — komm auch:\`,
       lineNoFoto:(k)=>\`Der Regenbogen leuchtet wieder — \${k} lädt dich zur Einhorn-Party ein:\`},
  reveal:'🌈 Aufsitzen, es geht los!',
  cc:['#FF5252','#FFD740','#69F0AE','#40C4FF','#E040FB']
};`,
    nophoto:`const NOPHOTO="data:image/svg+xml,"+encodeURIComponent(\`<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><rect width='240' height='240' fill='#9C27B0'/><path d='M40 170 a80 80 0 0 1 160 0' fill='none' stroke='#F48FB1' stroke-width='9'/><path d='M58 170 a62 62 0 0 1 124 0' fill='none' stroke='#FFD54F' stroke-width='9'/><path d='M76 170 a44 44 0 0 1 88 0' fill='none' stroke='#4FC3F7' stroke-width='9'/><text x='120' y='120' font-size='40' text-anchor='middle'>🦄</text></svg>\`);`
  },
  meerjungfrau:{
    title:'Meerjungfrau',
    root:':root{--bg1:#006064;--bg2:#00363a;--fg:#fff;--accent:#26C6DA;--accent-dk:#00838F;--ink:#001419}',
    theme:`const THEME = {
  photo:'/birthday-photo.jpg',
  icon:'🐚',
  title:"Tauch nach den Muschel-Perlen!",
  task:"Öffne die Muscheln für {kid} und sammle die Perlen!",
  how:"👆 Öffne eine Muschel — halt sie gedrückt",
  items:['🐚','🪸','🐚','🐠','🐚','🫧','🐚','⭐','🪸'],
  reward:'🦪', treasureFx:'🌟', emptyFx:'🫧', stealFx:'🧜', goal:'Perle!',
  sprite:'🧜‍♀️', spriteName:'Perla, die Meerjungfrau',
  sky:['#4DD0E1','#0097A7','#006064','#001419'],
  hints:['Öffne eine Muschel — halt sie gedrückt!','🦪 Eine Perle! Weiter tauchen!','Nur noch eine Muschel — was ist da drin …?'],
  chaseHint:'Schwimm ihr nach — fang Perla!',
  cine:{kick:'SCHWUPP!', steal:'In der letzten Muschel steckt Perla — und schon ist sie weg mit den Perlen!'},
  win:{title:'Die Perlenkette ist fertig!', line:(k)=>\`Perla dreht sich um — und in der größten Perle strahlt \${k}! Komm zur Meerjungfrau-Party:\`,
       lineNoFoto:(k)=>\`Die Perlen sind geborgen — \${k} lädt dich zur Meerjungfrau-Party ein:\`},
  reveal:'🧜‍♀️ Die größte Perle!',
  cc:['#00BCD4','#FFD54F','#26C6DA','#fff','#006064']
};`,
    nophoto:`const NOPHOTO="data:image/svg+xml,"+encodeURIComponent(\`<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><rect width='240' height='240' fill='#006064'/><path d='M120 60 C60 60 50 150 120 190 C190 150 180 60 120 60 Z' fill='#4DD0E1'/><path d='M120 70 L120 185 M90 90 L150 90 M78 120 L162 120 M84 150 L156 150' stroke='#00838F' stroke-width='5'/><circle cx='120' cy='150' r='12' fill='#fff'/></svg>\`);`
  },
  feuerwehr:{
    title:'Feuerwehr',
    root:':root{--bg1:#3e2723;--bg2:#5d1f0f;--fg:#fff;--accent:#FF6D00;--accent-dk:#B71C1C;--ink:#1A0A00}',
    theme:`const THEME = {
  photo:'/birthday-photo.jpg',
  icon:'🚒',
  title:"Tatü-Tata — alle ausrücken!",
  task:"Schnapp den Schlauch für {kid} — lösch die Flammen und rette die Kätzchen!",
  how:"👆 Halt drauf — spritz das Feuer aus! 💦",
  items:['🔥','🪟','🚪','🪜','🐱','💨','🪟','🔥','🚪'],
  reward:'🐱', treasureFx:'🐱', emptyFx:'💨', stealFx:'🐾', goal:'letztes Kätzchen!',
  sprite:'🐈', spriteName:'Minka, das Kätzchen',
  sky:['#B71C1C','#E64A19','#FF9800','#8ec5e8'],
  hints:['Halt drauf — spritz das Feuer aus! 💦','🐱 Ein Kätzchen gerettet! Weiter löschen!','Fast — wo lodert die letzte Flamme?'],
  chaseHint:'Fang Minka — das freche Kätzchen flitzt davon!',
  cine:{kick:'TATÜ-TATA!', steal:'Das letzte Kätzchen Minka erschrickt und flitzt mitten ins Getümmel — schnell hinterher!'},
  win:{title:'Alle gerettet!', line:(k)=>\`Alle Flammen aus — \${k} hat jedes Kätzchen gerettet! Komm zur Feuerwehr-Party:\`,
       lineNoFoto:(k)=>\`Das Feuer ist aus — \${k} lädt dich zur Feuerwehr-Party ein:\`},
  reveal:'🐱 Alle Kätzchen gerettet!',
  cc:['#FF6D00','#FFD600','#B71C1C','#fff','#546E7A']
};`,
    nophoto:`const NOPHOTO="data:image/svg+xml,"+encodeURIComponent(\`<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><rect width='240' height='240' fill='#B71C1C'/><rect x='40' y='120' width='160' height='60' rx='8' fill='#C62828'/><rect x='150' y='95' width='50' height='45' rx='6' fill='#C62828'/><circle cx='80' cy='185' r='18' fill='#212121'/><circle cx='170' cy='185' r='18' fill='#212121'/><text x='120' y='150' font-size='30' text-anchor='middle'>🚒</text></svg>\`);`
  },
  baustelle:{
    title:'Baustelle',
    root:':root{--bg1:#4e342e;--bg2:#6d4c41;--fg:#fff;--accent:#FFB300;--accent-dk:#F57F17;--ink:#263238}',
    theme:`const THEME = {
  photo:'/birthday-photo.jpg',
  icon:'🚜',
  title:"Bagger Bruno buddelt los!",
  task:"Buddel die Werkzeuge für {kid} — bevor die Elster den Bagger-Schlüssel klaut!",
  how:"👆 Brocken anpacken und HALTEN — Bruno buddelt",
  items:['🧱','🚧','🦺','🪨','🧰','🛢️','🔨','🪵','🚧'],
  reward:['🔧','🔨','🔧'], treasureFx:'🔑', emptyFx:'💨', stealFx:'🪶', goal:'Bagger-Schlüssel!',
  sprite:'🐦‍⬛', spriteName:'Elster Elvira',
  sky:['#78909C','#FFB300','#F57F17','#263238'],
  hints:['Brocken anpacken und HALTEN — Bruno buddelt!','🔧 Werkzeug gesichert! Weiter buddeln!','Nur noch eins — wo klemmt der goldene Schlüssel?'],
  chaseHint:'Schnapp Elster Elvira, bevor sie wegfliegt!',
  cine:{kick:'OH NEIN!', steal:'Elster Elvira schnappt sich den goldenen Bagger-Schlüssel und flattert davon!'},
  win:{title:'{kid} ist der Bagger-Boss!', line:(k)=>\`Bagger Bruno hebt die Schaufel — und oben drauf strahlt \${k}! Komm zur Baustellen-Party:\`,
       lineNoFoto:(k)=>\`Der Schlüssel ist zurück — \${k} lädt dich zur Baustellen-Party ein:\`},
  reveal:'🔑 Schlüssel zurück — Vollgas!',
  cc:['#FFB300','#FF6D00','#FFC107','#fff','#546E7A']
};`,
    nophoto:`const NOPHOTO="data:image/svg+xml,"+encodeURIComponent(\`<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><rect width='240' height='240' fill='#FFB300'/><rect y='0' width='240' height='240' fill='#FFB300'/><path d='M0 0 L40 0 L0 40 Z M80 0 L120 0 L0 120 L0 80 Z M160 0 L200 0 L0 200 L0 160 Z M240 0 L240 40 L40 240 L0 240 Z M240 80 L240 120 L120 240 L80 240 Z M240 160 L240 200 L200 240 L160 240 Z' fill='#263238' opacity='.25'/><text x='120' y='140' font-size='60' text-anchor='middle'>🚜</text></svg>\`);`
  },
  dschungel:{
    title:'Dschungel',
    root:':root{--bg1:#33691e;--bg2:#1b5e20;--fg:#fff;--accent:#9CCC65;--accent-dk:#558B2F;--ink:#0d2818}',
    theme:`const THEME = {
  photo:'/birthday-photo.jpg',
  icon:'🗿',
  title:"Kuru — das Idol, das wegläuft",
  task:"Wisch das Moos beiseite und finde das goldene Idol für {kid}!",
  how:"👆 Wisch die Ranken vom Tempelstein — halt gedrückt",
  items:['🌿','🌺','🪨','🦜','🍃','🕯️','🪵','🐢','🌿'],
  reward:'💎', treasureFx:'🗿', emptyFx:'🍃', stealFx:'✨', goal:'Das goldene Idol!',
  sprite:'🗿', spriteName:'Kuru',
  sky:['#7CB342','#FFB74D','#FF7043','#1A237E'],
  hints:['Wisch die Ranken vom Tempelstein — halt gedrückt!','💎 Ein Tempel-Juwel! Grab weiter!','Fast — wo steckt das goldene Idol?'],
  chaseHint:'Fang Kuru, bevor es sich wieder versteckt!',
  cine:{kick:'ES LEBT!', steal:'Das goldene Idol Kuru wacht auf und flitzt davon!'},
  win:{title:'Kuru gehört dir!', line:(k)=>\`Du hast Kuru geschnappt — es zwinkert dir zu! \${k} feiert im Dschungel-Tempel:\`,
       lineNoFoto:(k)=>\`Das goldene Idol ist gezähmt — \${k} lädt dich in den Dschungel-Tempel ein:\`},
  reveal:'✨ Kuru zwinkert dir zu!',
  cc:['#66BB6A','#FFC107','#FF9800','#fff','#33691E']
};`,
    nophoto:`const NOPHOTO="data:image/svg+xml,"+encodeURIComponent(\`<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><rect width='240' height='240' fill='#1b5e20'/><path d='M120 200 L120 110' stroke='#6D4C41' stroke-width='12'/><path d='M120 110 Q70 90 60 130 M120 110 Q170 90 180 130 M120 100 Q90 60 120 50 Q150 60 120 100' fill='#66BB6A'/><text x='120' y='190' font-size='40' text-anchor='middle'>🌴</text></svg>\`);`
  },
  feen:{
    title:'Feen',
    root:':root{--bg1:#4A148C;--bg2:#880E4F;--fg:#fff;--accent:#CE93D8;--accent-dk:#7B1FA2;--ink:#1A0033}',
    theme:`const THEME = {
  photo:'/birthday-photo.jpg',
  icon:'🌸',
  title:"Weck die Blütenfeen!",
  task:"Weck die schlafenden Blütenfeen für {kid} — bevor die Feenkönigin das Feenlicht schnappt!",
  how:"👆 Pust eine Blüte an — halt gedrückt, bis die Fee aufwacht",
  items:['🌸','🍄','🌷','🍄','🌸','🌟','🍄','🌷','🌸'],
  reward:'✨', treasureFx:'🔮', emptyFx:'🌙', stealFx:'💫', goal:'Feenlicht!',
  sprite:'🧚', spriteName:'Königin Luna',
  sky:['#F8BBD0','#CE93D8','#9C27B0','#1A0033'],
  hints:['Pust eine Blüte an — halt gedrückt, bis die Fee aufwacht!','✨ Eine Fee ist wach und leuchtet! Weck die nächste!','Fast dunkel — weck die allerletzte Fee!'],
  chaseHint:'Fang Königin Luna — dann erfüllt sie deinen Wunsch!',
  cine:{kick:'HUSCH!', steal:'Königin Luna schnappt sich das Feenlicht und flattert davon!'},
  win:{title:'Alle Feen leuchten für dich!', line:(k)=>\`Königin Luna erfüllt einen Wunsch für \${k} — komm ins Feenlicht:\`,
       lineNoFoto:(k)=>\`Das Feenlicht leuchtet — \${k} lädt dich zur Feen-Party ein:\`},
  reveal:'✨ Wunsch erfüllt!',
  cc:['#F48FB1','#FFD700','#CE93D8','#fff','#9C27B0']
};`,
    nophoto:`const NOPHOTO="data:image/svg+xml,"+encodeURIComponent(\`<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><rect width='240' height='240' fill='#4A148C'/><circle cx='60' cy='60' r='3' fill='#fff'/><circle cx='190' cy='70' r='2' fill='#fff'/><circle cx='120' cy='118' r='16' fill='#FFD54F'/><path d='M120 118 L100 78 M120 118 L140 78 M120 118 L86 128 M120 118 L154 128 M120 118 L104 158 M120 118 L136 158' stroke='#CE93D8' stroke-width='6' stroke-linecap='round'/><text x='120' y='200' font-size='34' text-anchor='middle'>🧚</text></svg>\`);`
  },
  pferde:{
    title:'Pferde',
    root:':root{--bg1:#5d4037;--bg2:#8d6e63;--fg:#fff;--accent:#FFCA28;--accent-dk:#F57F17;--ink:#3e2723}',
    theme:`const THEME = {
  photo:'/birthday-photo.jpg',
  icon:'🐴',
  title:"Karamell büxt aus!",
  task:"Striegel und füttere Pony Karamell für {kid} — dann gibt's die Siegerschleife!",
  how:"👆 Wühl im Stroh und striegel Karamell — halt gedrückt",
  items:['🧹','🥕','🪣','🌾','🎀','🍎','🪮','🧺','🥕'],
  reward:['🥕','🍎','🥕'], treasureFx:'🎗️', emptyFx:'💨', stealFx:'🐭', goal:'Siegerschleife!',
  sprite:'🐴', spriteName:'Karamell',
  sky:['#90CAF9','#FFCA28','#FF8A65','#311B92'],
  hints:['Wühl im Stroh und striegel Karamell — halt gedrückt!','🥕 Ein Leckerli! Karamell freut sich — weiter!','Fast — wo liegt die goldene Siegerschleife?'],
  chaseHint:'Schnapp dir Karamell, bevor sie über die Wiese ist!',
  cine:{kick:'HUCH, EINE MAUS!', steal:'Karamell erschrickt und galoppiert mit der Siegerschleife davon!'},
  win:{title:'Wieder eingefangen!', line:(k)=>\`\${k} und Karamell reiten die Ehrenrunde — komm zum Pony-Fest:\`,
       lineNoFoto:(k)=>\`Karamell ist wieder da — \${k} lädt dich zum Pony-Fest ein:\`},
  reveal:'🎗️ Ehrenrunde!',
  cc:['#8BC34A','#FFC107','#FF7043','#fff','#5D4037']
};`,
    nophoto:`const NOPHOTO="data:image/svg+xml,"+encodeURIComponent(\`<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><rect width='240' height='240' fill='#8d6e63'/><rect y='150' width='240' height='90' fill='#5d4037'/><circle cx='120' cy='104' r='50' fill='#4e342e'/><text x='120' y='120' font-size='54' text-anchor='middle'>🐴</text></svg>\`);`
  },
  ritter:{
    title:'Ritter',
    root:':root{--bg1:#1a237e;--bg2:#283593;--fg:#fff;--accent:#FFD54F;--accent-dk:#1565C0;--ink:#0d1117}',
    theme:`const THEME = {
  photo:'/birthday-photo.jpg',
  icon:'🐉',
  title:"Fauchi klaut die Geburtstagstorte!",
  task:"Sammle die Törtchen für {kid} — bevor Drache Fauchi die fertige Geburtstagstorte klaut!",
  how:"👆 Durchsuch die Burg — halt gedrückt",
  items:['🗡️','🛡️','⛑️','🏹','🐴','🗝️','🔥','🥚','🍗'],
  reward:'🧁', treasureFx:'🎂', emptyFx:'💨', stealFx:'🐉', goal:'Torte!',
  sprite:'🐉', spriteName:'Drache Fauchi',
  sky:['#42A5F5','#F57C00','#D32F2F','#0D1117'],
  hints:['Durchsuch die Burg — halt gedrückt!','🧁 Ein Törtchen — sammel mutig weiter!','Fast! Wo dampft die Geburtstagstorte?'],
  chaseHint:'Schnapp Fauchi — er hat die Torte!',
  cine:{kick:'OH SCHRECK!', steal:'Drache Fauchi schnappt sich die Geburtstagstorte!'},
  win:{title:'Der Drache feiert mit!', line:(k)=>\`Fauchi wollte nur ein Stück Torte — jetzt feiert er als Freund mit! \${k} lädt dich zum Ritterfest ein:\`,
       lineNoFoto:(k)=>\`Fauchi ist kein Feind mehr — \${k} lädt dich zum Ritterfest ein:\`},
  reveal:'🐉 Ein neuer Freund!',
  cc:['#42A5F5','#FFD54F','#D32F2F','#fff','#0D47A1']
};`,
    nophoto:`const NOPHOTO="data:image/svg+xml,"+encodeURIComponent(\`<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><rect width='240' height='240' fill='#1a237e'/><path d='M120 44 L182 68 V126 Q182 184 120 206 Q58 184 58 126 V68 Z' fill='#283593' stroke='#FFD54F' stroke-width='7'/><path d='M120 80 L120 168 M86 116 L154 116' stroke='#FFD54F' stroke-width='9' stroke-linecap='round'/></svg>\`);`
  }
};

let n=0;
for(const [m,d] of Object.entries(MOTTOS)){
  let out=src;
  out=out.replace(/<title>Schatzjagd — Piraten<\/title>/, `<title>Schatzjagd — ${d.title}</title>`);
  out=out.replace(/:root\{--bg1:#0f2a3a;[^}]*\}/, d.root);
  out=out.replace(/const THEME = \{[\s\S]*?\n\};/, d.theme);
  out=out.replace(/const NOPHOTO="data:image\/svg\+xml,"\+encodeURIComponent\(`[\s\S]*?`\);/, d.nophoto);
  const file=`game-schatzjagd-${m}.html`;
  fs.writeFileSync(file,out);
  // Verifikation: alle 4 Bloecke ersetzt?
  const ok = out.includes(`Schatzjagd — ${d.title}`) && out.includes(d.root.slice(0,30)) && out.includes(d.theme.slice(0,40)) && !out.includes("Kaept'n Rotbarts") && !out.includes('Käpt');
  console.log((ok?'OK   ':'CHECK ')+file+'  ('+Math.round(out.length/1024)+'KB)');
  n++;
}
console.log(n+' Skin(s) generiert.');
