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
