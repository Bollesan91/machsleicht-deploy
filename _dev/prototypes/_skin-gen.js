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
