const fs=require("fs");
const mottos=["baustelle","detektiv","dino","dschungel","einhorn","feen","feuerwehr","meerjungfrau","pferde","piraten","prinzessin","ritter","safari","superheld","weltraum"];
const QUEST=/Quest|Codeknacker|Escape|\(\d+ Stationen\)|Hauptmission|Olympiade|Stationen-/i;
// Manuelle Ergaenzungen (Schluss-Re-Review, Falsch-Negativ der Namens-Heuristik):
// echte "wenige-aber-lange"-Quest-Varianten ohne Keyword im Namen. Key = "<motto>-<grp>-<vk>".
// detektiv-mittel-wow = Multi-Raum-Tatort-Tour + grosses Code-Raetsel (2 grosse Module).
const MANUAL=new Set(["detektiv-mittel-2"]);
let count=0;
for(const m of mottos)for(const grp of ["klein","mittel","gross"]){
  const f=`data/motto/${m}-${grp}.json`;
  const raw=fs.readFileSync(f,"utf8");
  const minified = raw.indexOf("\n")===-1 || raw.split("\n").length<5; // Original-Format erkennen
  const d=JSON.parse(raw);
  let changed=false;
  for(const vk of ["0","1","2"]){
    const v=d.variants[vk]; const gs=v.games||[];
    const isQ = (gs.some(g=>QUEST.test(g.name)) && gs.length<=3) || MANUAL.has(`${m}-${grp}-${vk}`);
    if(isQ && v.isQuest!==true){ v.isQuest=true; changed=true; count++; }
    if(!isQ && "isQuest" in v){ delete v.isQuest; changed=true; } // idempotent: falsche Flags entfernen
  }
  if(changed) fs.writeFileSync(f, minified ? JSON.stringify(d) : JSON.stringify(d,null,2)+"\n");
}
console.log("isQuest:true gesetzt auf "+count+" Varianten (Format je Datei erhalten).");
