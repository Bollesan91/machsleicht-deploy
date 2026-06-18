const fs=require("fs");
// A) safari "Die Karte vermessen": safetyRule fehlt -> piraten-Regel (gleiche Mechanik) uebernehmen.
{
  const f="data/motto/safari-gross.json";
  const d=JSON.parse(fs.readFileSync(f,"utf8"));
  let g=null;
  for(const vk of Object.keys(d.variants)) for(const x of (d.variants[vk].games||[])) if(/Karte vermessen/.test(x.name)){g=x;break;}
  if(!g) throw new Error("safari: 'Die Karte vermessen' nicht gefunden");
  if(g.safetyRule && g.safetyRule.trim()) throw new Error("safari: safetyRule schon gesetzt: "+g.safetyRule);
  g.safetyRule="Verstecke und Mess-Stationen nur an sicheren, gut erreichbaren Orten — kein Klettern, keine verschlossenen Räume. Beim Loslaufen auf Stolperfallen achten.";
  fs.writeFileSync(f, JSON.stringify(d,null,2)+"\n");
  console.log("A) safari 'Die Karte vermessen' safetyRule gesetzt.");
}
// B) feen-mittel-min (v0): nur 2 Spiele -> Aufwaermer "Stirnreif/Waldkrone verfeinern" aus v1 ziehen.
{
  const f="data/motto/feen-mittel.json";
  const d=JSON.parse(fs.readFileSync(f,"utf8"));
  const v0=d.variants["0"], v1=d.variants["1"];
  if(v0.games.length!==2) throw new Error("feen-mittel v0 erwartet 2 Spiele, hat "+v0.games.length);
  const warm=(v1.games||[]).find(g=>/Stirnreif\/Waldkrone verfeinern/.test(g.name));
  if(!warm) throw new Error("feen-mittel: Aufwaermer-Spiel in v1 nicht gefunden");
  if(v0.games.some(g=>g.name===warm.name)) throw new Error("feen-mittel v0 hat Aufwaermer schon");
  // als erstes Spiel (Ankunfts-Aktivitaet) einfuegen, tiefe Kopie
  v0.games.unshift(JSON.parse(JSON.stringify(warm)));
  if(v0.games.length!==3) throw new Error("feen-mittel v0 nach Insert != 3");
  fs.writeFileSync(f, JSON.stringify(d,null,2)+"\n");
  console.log("B) feen-mittel-min: '"+warm.name+"' als Aufwaermer ergaenzt -> jetzt 3 Spiele.");
}
console.log("\nPhase-1 Daten-Fixes (safari + feen) angewandt.");
