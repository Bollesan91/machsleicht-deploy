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
  icon:'🦕',
  title:"Große Dino-Expedition",
  task:"Bring die Dino-Eier für {kid} rechtzeitig zum Schlüpfen!",
  items:['🥚','🌾','🌿','🥚','🦴','🌴','🥚','🍃','🥚'],
  reward:'🦕', treasureFx:'🦖', emptyFx:'💨', stealFx:'😲', goal:'Schlüpfen!',
  sprite:'🦖', spriteName:'Ausreißer-Dino',
  sky:['#8fd0e8','#f4c17a','#d9776b','#241a2e'],
  hints:['Klopf ein Ei warm — halt es gedrückt!','🦕 Ein Baby schlüpft! Grab weiter!','Fast — wo ist das letzte Ei?'],
  chaseHint:'Fang den Ausreißer-Dino!',
  cine:{kick:'OH NEIN!', steal:'Ein Baby-Dino büxt aus!'},
  win:{title:'Alle geschlüpft!', line:(k)=>\`Am Ende der Expedition strahlt \${k} — komm zur Dino-Party:\`,
       lineNoFoto:(k)=>\`Alle Baby-Dinos sind geschlüpft — \${k} lädt dich zur Dino-Party ein:\`},
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
  title:"Große Foto-Safari",
  task:"Fotografiere die wilden Tiere für {kid}!",
  items:['🌿','🪨','🌳','🌾','🐾','🪵','🌴','🌿','🪨'],
  reward:'🦁', treasureFx:'📸', emptyFx:'💨', stealFx:'🙈', goal:'Foto!',
  sprite:'🐒', spriteName:'Kamera-Dieb',
  sky:['#87CEEB','#FFB74D','#FF7043','#1A237E'],
  hints:['Halt einen Busch gedrückt — schau nach!','🦁 Tier entdeckt! Weiter pirschen!','Fast — wo versteckt sich das letzte Tier?'],
  chaseHint:'Schnapp dir den Kamera-Dieb!',
  cine:{kick:'OH NEIN!', steal:'Ein Affe klaut die Kamera!'},
  win:{title:'Alle fotografiert!', line:(k)=>\`Am Ende der Safari strahlt \${k} — komm zur Safari-Party:\`,
       lineNoFoto:(k)=>\`Alle Tiere im Kasten — \${k} lädt dich zur Safari-Party ein:\`},
  cc:['#FF9800','#66BB6A','#FFD54F','#fff','#8D6E63']
};`,
    nophoto:`const NOPHOTO="data:image/svg+xml,"+encodeURIComponent(\`<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><rect width='240' height='240' fill='#FF9800'/><rect y='150' width='240' height='90' fill='#8D6E63'/><circle cx='120' cy='108' r='52' fill='#FFB74D'/><circle cx='104' cy='100' r='7' fill='#3e2723'/><circle cx='136' cy='100' r='7' fill='#3e2723'/><path d='M100 126 q20 16 40 0' stroke='#3e2723' stroke-width='5' fill='none'/><text x='120' y='214' font-size='36' text-anchor='middle'>📸</text></svg>\`);`
  },
  detektiv:{
    title:'Detektiv',
    root:':root{--bg1:#0d1b2a;--bg2:#1b263b;--fg:#fff;--accent:#FFB300;--accent-dk:#E65100;--ink:#0d1117}',
    theme:`const THEME = {
  photo:'/birthday-photo.jpg',
  icon:'🕵️',
  title:"Der große Detektiv-Fall",
  task:"Untersuche die Spuren für {kid} und finde die Hinweise!",
  items:['👣','📦','🗄️','🚪','🧳','🗑️','📚','🔦','🪑'],
  reward:'🔎', treasureFx:'🗝️', emptyFx:'💨', stealFx:'😱', goal:'Beweis!',
  sprite:'🥷', spriteName:'Dieb',
  sky:['#78909C','#FFB300','#C62828','#0D1117'],
  hints:['Untersuch eine Spur — halt sie gedrückt!','🔎 Hinweis gefunden! Weiter ermitteln!','Fast — wo ist der letzte Beweis?'],
  chaseHint:'Schnapp dir den Dieb!',
  cine:{kick:'HALT, DIEB!', steal:'Ein Dieb schnappt sich den Beweis!'},
  win:{title:'Fall gelöst!', line:(k)=>\`Am Ende löst \${k} den Fall — komm zur Detektiv-Party:\`,
       lineNoFoto:(k)=>\`Der Fall ist gelöst — \${k} lädt dich zur Detektiv-Party ein:\`},
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
  title:"Superhelden-Mission",
  task:"Finde die Superhelden-Ausrüstung für {kid}!",
  items:['📦','🗑️','🚗','🪧','🛢️','🚧','📮','🏪','🌳'],
  reward:'🛡️', treasureFx:'🦸', emptyFx:'💨', stealFx:'😱', goal:'Anzug!',
  sprite:'🦹', spriteName:'Schurke',
  sky:['#1E88E5','#F57C00','#D32F2F','#0D1117'],
  hints:['Durchsuch die Stadt — halt gedrückt!','🛡️ Ausrüstung gefunden! Weiter!','Fast — wo ist das letzte Teil?'],
  chaseHint:'Schnapp dir den Schurken!',
  cine:{kick:'ALARM!', steal:'Ein Schurke klaut die Ausrüstung!'},
  win:{title:'Mission erfüllt!', line:(k)=>\`Am Ende rettet \${k} den Tag — komm zur Superhelden-Party:\`,
       lineNoFoto:(k)=>\`Die Ausrüstung ist gerettet — \${k} lädt dich zur Superhelden-Party ein:\`},
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
  title:"Der Königliche Ball",
  task:"Sammle die magischen Juwelen für {kid}!",
  items:['💎','🏺','🎁','🕯️','📜','🪞','🌹','💎','🏺'],
  reward:'👑', treasureFx:'💎', emptyFx:'💨', stealFx:'😱', goal:'Krone!',
  sprite:'🐸', spriteName:'Frosch',
  sky:['#F48FB1','#FFD54F','#9C27B0','#2E0854'],
  hints:['Heb einen Schatz — halt ihn gedrückt!','👑 Juwel gefunden! Weiter sammeln!','Fast — wo glitzert das letzte Juwel?'],
  chaseHint:'Schnapp dir den Kronen-Dieb!',
  cine:{kick:'OH NEIN!', steal:'Ein frecher Frosch klaut die Krone!'},
  win:{title:'Alle Juwelen gefunden!', line:(k)=>\`Am Ende strahlt \${k} — komm zum Königlichen Ball:\`,
       lineNoFoto:(k)=>\`Die Krone funkelt wieder — \${k} lädt dich zum Königlichen Ball ein:\`},
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
  title:"Große Weltraum-Expedition",
  task:"Sammle die Sterne für {kid} im Weltall!",
  items:['🌑','🪨','🌑','☄️','🪨','🌑','🛰️','🪨','🌑'],
  reward:'⭐', treasureFx:'🌟', emptyFx:'💨', stealFx:'😱', goal:'Stern!',
  sprite:'👽', spriteName:'Alien',
  sky:['#1a237e','#311b92','#4a148c','#0d0221'],
  hints:['Klopf einen Krater ab — halt gedrückt!','⭐ Stern gefunden! Weiter suchen!','Fast — wo versteckt sich der letzte Stern?'],
  chaseHint:'Schnapp dir das freche Alien!',
  cine:{kick:'ALARM!', steal:'Ein freches Alien schnappt sich den Stern!'},
  win:{title:'Alle Sterne gesammelt!', line:(k)=>\`Am Ende jubelt \${k} im All — komm zur Weltraum-Party:\`,
       lineNoFoto:(k)=>\`Die Sterne funkeln wieder — \${k} lädt dich zur Weltraum-Party ein:\`},
  cc:['#7c4dff','#FFD54F','#42a5f5','#fff','#1a237e']
};`,
    nophoto:`const NOPHOTO="data:image/svg+xml,"+encodeURIComponent(\`<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><rect width='240' height='240' fill='#0d0221'/><circle cx='60' cy='60' r='3' fill='#fff'/><circle cx='190' cy='50' r='2' fill='#fff'/><circle cx='150' cy='190' r='2' fill='#fff'/><circle cx='120' cy='118' r='54' fill='#7c4dff'/><ellipse cx='120' cy='118' rx='78' ry='20' fill='none' stroke='#B388FF' stroke-width='5' transform='rotate(-18 120 118)'/><text x='120' y='134' font-size='46' text-anchor='middle'>🚀</text></svg>\`);`
  },
  einhorn:{
    title:'Einhorn',
    root:':root{--bg1:#6a1b9a;--bg2:#c2185b;--fg:#fff;--accent:#F48FB1;--accent-dk:#9C27B0;--ink:#1A0033}',
    theme:`const THEME = {
  photo:'/birthday-photo.jpg',
  icon:'🦄',
  title:"Der Einhorn-Zauber",
  task:"Sammle die Zaubersterne für {kid}!",
  items:['🌈','☁️','🌸','🍄','💫','🌷','🌈','🌸','☁️'],
  reward:'🪄', treasureFx:'⭐', emptyFx:'💨', stealFx:'😱', goal:'Stern!',
  sprite:'🦄', spriteName:'Einhorn',
  sky:['#F8BBD0','#CE93D8','#9C27B0','#1A0033'],
  hints:['Rubbel eine Wolke — halt gedrückt!','🪄 Zauber gefunden! Weiter!','Fast — wo funkelt der letzte Stern?'],
  chaseHint:'Schnapp dir das freche Einhorn!',
  cine:{kick:'OH NEIN!', steal:'Ein freches Einhorn schnappt sich den Stern!'},
  win:{title:'Der Zauber ist zurück!', line:(k)=>\`Am Ende strahlt \${k} im Glitzer — komm zur Einhorn-Party:\`,
       lineNoFoto:(k)=>\`Der Zauberstern funkelt wieder — \${k} lädt dich zur Einhorn-Party ein:\`},
  cc:['#F48FB1','#FFD700','#CE93D8','#fff','#9C27B0']
};`,
    nophoto:`const NOPHOTO="data:image/svg+xml,"+encodeURIComponent(\`<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><rect width='240' height='240' fill='#9C27B0'/><path d='M40 170 a80 80 0 0 1 160 0' fill='none' stroke='#F48FB1' stroke-width='9'/><path d='M58 170 a62 62 0 0 1 124 0' fill='none' stroke='#FFD54F' stroke-width='9'/><path d='M76 170 a44 44 0 0 1 88 0' fill='none' stroke='#4FC3F7' stroke-width='9'/><text x='120' y='120' font-size='40' text-anchor='middle'>🦄</text></svg>\`);`
  },
  meerjungfrau:{
    title:'Meerjungfrau',
    root:':root{--bg1:#006064;--bg2:#00363a;--fg:#fff;--accent:#26C6DA;--accent-dk:#00838F;--ink:#001419}',
    theme:`const THEME = {
  photo:'/birthday-photo.jpg',
  icon:'🐚',
  title:"Das Meerjungfrau-Abenteuer",
  task:"Öffne die Muscheln für {kid} und finde die Perlen!",
  items:['🐚','🪨','🪸','🐚','🌿','🐚','🪨','🐚','🪸'],
  reward:'🦪', treasureFx:'💎', emptyFx:'💨', stealFx:'😱', goal:'Perle!',
  sprite:'🦀', spriteName:'Krabbe',
  sky:['#4DD0E1','#0097A7','#006064','#001419'],
  hints:['Öffne eine Muschel — halt sie gedrückt!','🦪 Perle gefunden! Weiter tauchen!','Fast — wo versteckt sich die letzte Perle?'],
  chaseHint:'Schnapp dir die Perlen-Krabbe!',
  cine:{kick:'OH NEIN!', steal:'Eine Krabbe schnappt sich die Perle!'},
  win:{title:'Alle Perlen geborgen!', line:(k)=>\`Am Ende strahlt \${k} auf dem Meeresgrund — komm zur Meerjungfrau-Party:\`,
       lineNoFoto:(k)=>\`Die Perlen sind geborgen — \${k} lädt dich zur Meerjungfrau-Party ein:\`},
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
  title:"Der große Feuerwehr-Einsatz",
  task:"Lösch die Flammen für {kid} und rette den Tag!",
  items:['🔥','🪟','🚪','🪜','💨','🔥','🪟','🔥','🚪'],
  reward:'🏅', treasureFx:'🚒', emptyFx:'💨', stealFx:'😱', goal:'Einsatz!',
  sprite:'😈', spriteName:'Feuerteufel',
  sky:['#546E7A','#FF6D00','#B71C1C','#1A0A00'],
  hints:['Lösch eine Flamme — halt gedrückt!','🏅 Orden gefunden! Weiter löschen!','Fast — wo lodert die letzte Flamme?'],
  chaseHint:'Schnapp dir den Feuerteufel!',
  cine:{kick:'ALARM!', steal:'Ein Feuerteufel schnappt sich den Orden!'},
  win:{title:'Feuer gelöscht!', line:(k)=>\`Am Ende jubelt \${k} als Held des Tages — komm zur Feuerwehr-Party:\`,
       lineNoFoto:(k)=>\`Das Feuer ist gelöscht — \${k} lädt dich zur Feuerwehr-Party ein:\`},
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
  title:"Der große Bagger-Einsatz",
  task:"Buddel die Werkzeuge für {kid} aus dem Schutt!",
  items:['🪨','🧱','🛢️','🪵','🚧','📦','🪨','🧱','🚧'],
  reward:'⛑️', treasureFx:'🚜', emptyFx:'💨', stealFx:'😱', goal:'Bagger!',
  sprite:'🦡', spriteName:'Frechdachs',
  sky:['#78909C','#FFB300','#F57F17','#263238'],
  hints:['Heb einen Brocken — halt gedrückt!','⛑️ Werkzeug gefunden! Weiter buddeln!','Fast — wo steckt das letzte Werkzeug?'],
  chaseHint:'Schnapp dir den Frechdachs!',
  cine:{kick:'OH NEIN!', steal:'Ein Frechdachs schnappt sich das Werkzeug!'},
  win:{title:'Alles ausgebuddelt!', line:(k)=>\`Am Ende strahlt \${k} auf der Baustelle — komm zur Baustellen-Party:\`,
       lineNoFoto:(k)=>\`Das Werkzeug ist geborgen — \${k} lädt dich zur Baustellen-Party ein:\`},
  cc:['#FFB300','#FF6D00','#FFC107','#fff','#546E7A']
};`,
    nophoto:`const NOPHOTO="data:image/svg+xml,"+encodeURIComponent(\`<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><rect width='240' height='240' fill='#FFB300'/><rect y='0' width='240' height='240' fill='#FFB300'/><path d='M0 0 L40 0 L0 40 Z M80 0 L120 0 L0 120 L0 80 Z M160 0 L200 0 L0 200 L0 160 Z M240 0 L240 40 L40 240 L0 240 Z M240 80 L240 120 L120 240 L80 240 Z M240 160 L240 200 L200 240 L160 240 Z' fill='#263238' opacity='.25'/><text x='120' y='140' font-size='60' text-anchor='middle'>🚜</text></svg>\`);`
  },
  dschungel:{
    title:'Dschungel',
    root:':root{--bg1:#33691e;--bg2:#1b5e20;--fg:#fff;--accent:#9CCC65;--accent-dk:#558B2F;--ink:#0d2818}',
    theme:`const THEME = {
  photo:'/birthday-photo.jpg',
  icon:'🌴',
  title:"Die große Dschungel-Expedition",
  task:"Entdecke die Dschungel-Schätze für {kid}!",
  items:['🌿','🍃','🪨','🌴','🍄','🌿','🪵','🍃','🌴'],
  reward:'🥥', treasureFx:'🍌', emptyFx:'💨', stealFx:'😱', goal:'Banane!',
  sprite:'🦧', spriteName:'Affe',
  sky:['#7CB342','#FFB74D','#FF7043','#1A237E'],
  hints:['Schieb das Blattwerk beiseite — halt gedrückt!','🥥 Gefunden! Weiter durch den Dschungel!','Fast — wo versteckt sich der letzte Schatz?'],
  chaseHint:'Schnapp dir den frechen Affen!',
  cine:{kick:'OH NEIN!', steal:'Ein frecher Affe klaut die goldene Banane!'},
  win:{title:'Alle Schätze entdeckt!', line:(k)=>\`Am Ende strahlt \${k} im Dschungel — komm zur Dschungel-Party:\`,
       lineNoFoto:(k)=>\`Die Banane ist zurück — \${k} lädt dich zur Dschungel-Party ein:\`},
  cc:['#66BB6A','#FFC107','#FF9800','#fff','#33691E']
};`,
    nophoto:`const NOPHOTO="data:image/svg+xml,"+encodeURIComponent(\`<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><rect width='240' height='240' fill='#1b5e20'/><path d='M120 200 L120 110' stroke='#6D4C41' stroke-width='12'/><path d='M120 110 Q70 90 60 130 M120 110 Q170 90 180 130 M120 100 Q90 60 120 50 Q150 60 120 100' fill='#66BB6A'/><text x='120' y='190' font-size='40' text-anchor='middle'>🌴</text></svg>\`);`
  },
  feen:{
    title:'Feen',
    root:':root{--bg1:#4A148C;--bg2:#880E4F;--fg:#fff;--accent:#CE93D8;--accent-dk:#7B1FA2;--ink:#1A0033}',
    theme:`const THEME = {
  photo:'/birthday-photo.jpg',
  icon:'🧚',
  title:"Der Feen-Zauber",
  task:"Sammle die Zauberblumen für {kid}!",
  items:['🌸','🌼','🍄','🌺','🌿','🌷','🌸','🍄','🌼'],
  reward:'✨', treasureFx:'🌟', emptyFx:'💨', stealFx:'😱', goal:'Zauber!',
  sprite:'🧚', spriteName:'Fee',
  sky:['#F8BBD0','#CE93D8','#9C27B0','#1A0033'],
  hints:['Pust eine Blume an — halt gedrückt!','✨ Zauberstaub gefunden! Weiter!','Fast — wo blüht die letzte Zauberblume?'],
  chaseHint:'Fang die kleine Fee!',
  cine:{kick:'OH NEIN!', steal:'Eine kleine Fee schnappt sich die Zauberblume!'},
  win:{title:'Der Zauber ist vollbracht!', line:(k)=>\`Am Ende strahlt \${k} im Feenglanz — komm zur Feen-Party:\`,
       lineNoFoto:(k)=>\`Die Zauberblume blüht wieder — \${k} lädt dich zur Feen-Party ein:\`},
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
  title:"Der große Reiterhof-Tag",
  task:"Striegle die Pferde für {kid} und finde die Schätze!",
  items:['🌾','🪣','🧺','🪵','🪨','🌾','🪣','🧺','🪵'],
  reward:'🥕', treasureFx:'🏆', emptyFx:'💨', stealFx:'😱', goal:'Pokal!',
  sprite:'🐴', spriteName:'Pony',
  sky:['#90CAF9','#FFCA28','#FF8A65','#311B92'],
  hints:['Wühl im Stroh — halt gedrückt!','🥕 Gefunden! Weiter striegeln!','Fast — wo glänzt der letzte Schatz?'],
  chaseHint:'Fang das freche Pony!',
  cine:{kick:'OH NEIN!', steal:'Ein freches Pony büxt mit dem Pokal aus!'},
  win:{title:'Alle Pferde gestriegelt!', line:(k)=>\`Am Ende strahlt \${k} im Sattel — komm zum Reiterhof-Fest:\`,
       lineNoFoto:(k)=>\`Das Pony ist wieder da — \${k} lädt dich zum Reiterhof-Fest ein:\`},
  cc:['#8BC34A','#FFC107','#FF7043','#fff','#5D4037']
};`,
    nophoto:`const NOPHOTO="data:image/svg+xml,"+encodeURIComponent(\`<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><rect width='240' height='240' fill='#8d6e63'/><rect y='150' width='240' height='90' fill='#5d4037'/><circle cx='120' cy='104' r='50' fill='#4e342e'/><text x='120' y='120' font-size='54' text-anchor='middle'>🐴</text></svg>\`);`
  },
  ritter:{
    title:'Ritter',
    root:':root{--bg1:#1a237e;--bg2:#283593;--fg:#fff;--accent:#FFD54F;--accent-dk:#1565C0;--ink:#0d1117}',
    theme:`const THEME = {
  photo:'/birthday-photo.jpg',
  icon:'⚔️',
  title:"Die große Ritter-Mission",
  task:"Sammle die Schätze für {kid} auf der Burg!",
  items:['📦','🏺','🛢️','🪵','🗝️','🛡️','📦','🏺','🪵'],
  reward:'🗡️', treasureFx:'👑', emptyFx:'💨', stealFx:'😱', goal:'Krone!',
  sprite:'🐉', spriteName:'Drache',
  sky:['#42A5F5','#F57C00','#D32F2F','#0D1117'],
  hints:['Durchsuch die Burg — halt gedrückt!','🗡️ Schatz gefunden! Weiter suchen!','Fast — wo liegt der letzte Schatz?'],
  chaseHint:'Schnapp dir den Drachen!',
  cine:{kick:'ALARM!', steal:'Ein Drache schnappt sich die Krone!'},
  win:{title:'Die Burg ist gerettet!', line:(k)=>\`Am Ende jubelt \${k} als tapferer Ritter — komm zur Ritter-Party:\`,
       lineNoFoto:(k)=>\`Die Krone ist zurück — \${k} lädt dich zur Ritter-Party ein:\`},
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
