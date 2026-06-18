const fs=require("fs");
function load(f){const raw=fs.readFileSync(f,"utf8");return {raw,d:JSON.parse(raw),min:raw.indexOf("\n")===-1||raw.split("\n").length<5};}
function save(f,d,min){fs.writeFileSync(f,min?JSON.stringify(d):JSON.stringify(d,null,2)+"\n");}

// FIX 1: piraten-mittel Seeungeheuer safetyRule auf v1+v2 propagieren (war nur auf v0).
{
  const f="data/motto/piraten-mittel.json";const {d,min}=load(f);
  let rule=null;
  for(const v of d.variants)for(const g of (v.games||[]))if(/Seeungeheuer/.test(g.name)&&g.safetyRule&&g.safetyRule.trim()){rule=g.safetyRule;break;}
  if(!rule)throw new Error("FIX1: keine Quell-safetyRule fuer Seeungeheuer gefunden");
  let patched=0;
  for(const v of d.variants)for(const g of (v.games||[]))if(/Seeungeheuer/.test(g.name)&&(!g.safetyRule||!g.safetyRule.trim())){g.safetyRule=rule;patched++;}
  if(patched!==2)throw new Error("FIX1: erwartet 2 Patches, war "+patched);
  save(f,d,min);console.log("FIX1 piraten-mittel: Seeungeheuer safetyRule auf "+patched+" Varianten propagiert.");
}
// FIX 2: prinzessin-gross-min isQuest=true (3-Schloss-Raetsel = echte Escape-Quest, schliesst Floor).
{
  const f="data/motto/prinzessin-gross.json";const {d,min}=load(f);
  const v0=d.variants[0];
  if(!/Schloss-R|Code, Spiegel, Logik/.test((v0.games[0]||{}).name||""))throw new Error("FIX2: erwartetes Quest-Spiel in prinzessin-gross-min nicht gefunden: "+v0.games[0].name);
  if(v0.isQuest===true)throw new Error("FIX2: schon gesetzt");
  v0.isQuest=true;save(f,d,min);console.log("FIX2 prinzessin-gross-min: isQuest=true (Die 3 Schloss-Raetsel).");
}
// FIX 3: feuerwehr-gross-min isQuest entfernen (Stationen-Wettbewerb, kein narrativer Quest; 3 Spiele = Floor erfuellt).
{
  const f="data/motto/feuerwehr-gross.json";const {d,min}=load(f);
  const v0=d.variants[0];
  if(v0.games.length<3)throw new Error("FIX3: feuerwehr-gross-min hat <3 Spiele, isQuest noetig fuer Floor!");
  if(v0.isQuest!==true)throw new Error("FIX3: isQuest war nicht true");
  delete v0.isQuest;save(f,d,min);console.log("FIX3 feuerwehr-gross-min: isQuest entfernt ("+v0.games.length+" Spiele = Floor ok).");
}
