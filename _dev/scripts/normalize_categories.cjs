const fs=require("fs");
const mottos=["baustelle","detektiv","dino","dschungel","einhorn","feen","feuerwehr","meerjungfrau","pferde","piraten","prinzessin","ritter","safari","superheld","weltraum"];
const CANON=new Set(["pflicht","sinnvoll","habIchVielleicht"]);
const MAP={deko:"sinnvoll",mitgebsel:"sinnvoll",aktivitaet:"sinnvoll",optional:"habIchVielleicht",wow:"habIchVielleicht"};
const HABICH=/oft vorhanden|eigene OK|hast du|zuhause|im Haushalt/i;
let changed=0, files=0;
for(const m of mottos)for(const g of ["klein","mittel","gross"]){
  const f=`data/motto/${m}-${g}.json`;
  const raw=fs.readFileSync(f,"utf8");
  const min=raw.indexOf("\n")===-1||raw.split("\n").length<5;
  const d=JSON.parse(raw);
  let fileChanged=false;
  for(const v of d.variants)for(const it of (v.shoppingList||[])){
    const c=it.category;
    if(c && !CANON.has(c)){
      if(!(c in MAP)) throw new Error(`Unbekannte Fremd-category "${c}" in ${f} — Mapping fehlt`);
      let target=MAP[c];
      if((it.priceEur===0)||HABICH.test(it.label||"")) target="habIchVielleicht";
      it.category=target; changed++; fileChanged=true;
    }
  }
  if(fileChanged){ fs.writeFileSync(f, min?JSON.stringify(d):JSON.stringify(d,null,2)+"\n"); files++; }
}
// Assert: 0 Fremd-Kategorien übrig
let rest=0;
for(const m of mottos)for(const g of ["klein","mittel","gross"]){const d=JSON.parse(fs.readFileSync(`data/motto/${m}-${g}.json`,"utf8"));for(const v of d.variants)for(const it of (v.shoppingList||[]))if(it.category&&!CANON.has(it.category))rest++;}
if(rest!==0) throw new Error("Nach Normalisierung noch "+rest+" Fremd-Kategorien!");
console.log(`Normalisiert: ${changed} Items in ${files} Dateien. Fremd-Kategorien übrig: ${rest} ✅`);
