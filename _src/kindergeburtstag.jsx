// kindergeburtstag.js — JSX/Babel Version
// Daten kommen aus kindergeburtstag-data.js (GENERIC, LICENSE, ALL_MOTTOS, BBL, STATION_SETS, etc.)

const { useState, useEffect, useRef } = React;

// === UTILITIES ===
const LS_STORE = "machsleicht";
const LS_VARIANTS = { sicher_fertig: "", morgen_komplett: "" };

function lsCheckout(variant, ctx = {}) {
  const d = LS_VARIANTS[variant];
  if (!d) { alert("Zahlungsintegration wird gerade eingerichtet. Aktuell ist alles kostenlos — viel Spaß!"); return; }
  const v = new URLSearchParams();
  if (ctx.motto) v.set("checkout[custom][motto]", ctx.motto);
  if (ctx.mode) v.set("checkout[custom][mode]", ctx.mode);
  v.set("checkout[custom][source]", "kindergeburtstag");
  const url = `https://${LS_STORE}.lemonsqueezy.com/checkout/buy/${d}?${v.toString()}`;
  window.LemonSqueezy ? window.LemonSqueezy.Url.Open(url) : window.open(url, "_blank");
}

function loadState(key, fallback) {
  try { const v = localStorage.getItem("ml_" + key); return v !== null ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}

function saveState(key, val) {
  try { localStorage.setItem("ml_" + key, JSON.stringify(val)); } catch {}
}

// === SMALL COMPONENTS ===
function Pill({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 99,
      border: `2px solid ${active ? "var(--a)" : "var(--l)"}`,
      background: active ? "var(--al)" : "var(--bg)", color: active ? "var(--ad)" : "var(--m)",
      fontSize: 13, fontWeight: active ? 700 : 500, cursor: "pointer", transition: "all .2s", fontFamily: "var(--f)",
    }}>{children}</button>
  );
}

function ItemRow({ item, isOwned, onToggle }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: isOwned ? "var(--l)" : "var(--bg)", borderRadius: "var(--rs)",
      padding: "10px 14px", border: "1px solid var(--l)", gap: 8, flexWrap: "wrap",
      opacity: isOwned ? 0.5 : 1, transition: "all .2s",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
        {onToggle && <input type="checkbox" checked={isOwned || false} onChange={onToggle}
          style={{ width: 16, height: 16, cursor: "pointer", accentColor: "var(--g)" }} title="Hab ich schon" />}
        <span style={{ fontSize: 18, flexShrink: 0 }}>{item.emoji}</span>
        <span style={{ fontSize: 13, textDecoration: isOwned ? "line-through" : "none" }}>{item.name}</span>
        {item.eco && <span title="Nachhaltig" style={{ fontSize: 12 }}>🌿</span>}
        <span style={{
          fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 6,
          background: BBL[item.bbl].c + "15", color: BBL[item.bbl].c, textTransform: "uppercase", flexShrink: 0,
        }}>{BBL[item.bbl].l}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        {item.price > 0 && !isOwned && <span style={{ fontWeight: 700, color: "var(--a)", fontSize: 13 }}>€{item.price.toFixed(2)}</span>}
        {item.price > 0 && isOwned && <span style={{ fontWeight: 600, color: "var(--g)", fontSize: 12 }}>✓ Hab ich</span>}
        {item.price === 0 && <span style={{ fontSize: 12, color: "var(--g)", fontWeight: 600 }}>Kostenlos</span>}
        {item.url && !isOwned && <a href={item.url} target="_blank" rel="noopener" style={{
          fontSize: 11, fontWeight: 700, color: "#FF9900", textDecoration: "none", padding: "4px 10px", borderRadius: 6, background: "#FFF3E0", whiteSpace: "nowrap",
        }}>Amazon ↗</a>}
      </div>
    </div>
  );
}

function Confetti({ active }) {
  if (!active) return null;
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {Array.from({ length: 20 }, (_, i) => (
        <span key={i} style={{
          position: "absolute", left: `${35 + Math.random() * 30}%`, top: "50%",
          width: 7, height: 7, borderRadius: Math.random() > 0.5 ? "50%" : "2px",
          background: `hsl(${Math.random() * 360},80%,60%)`,
          animation: `confettiBurst 0.8s ${Math.random() * 0.3}s ease-out forwards`,
          "--tx": `${(Math.random() - 0.5) * 120}px`, "--ty": `${-50 - Math.random() * 80}px`, opacity: 0,
        }} />
      ))}
    </div>
  );
}

// === CONTROL HUB (Fixed Bottom Bar) ===
function ControlHub({ mottoId, szActive, setSzActive, setSzThemeId, childName, age, motto }) {
  return (
    <div className="no-print" style={{
      position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
      width: "100%", maxWidth: 660, background: "rgba(253,252,249,0.97)",
      backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
      padding: "8px 12px", borderTop: "1px solid var(--l)", display: "flex", gap: 6, zIndex: 100,
    }}>
      <a href={`/einladung/erstellen/?motto=${mottoId || ""}`} style={{
        flex: 1, padding: 10, borderRadius: 10, background: "var(--a)", color: "#fff",
        fontWeight: 700, fontSize: 12, textAlign: "center", textDecoration: "none", fontFamily: "var(--f)",
      }}>💌 Einladung</a>
      <button onClick={() => { if (!szActive && mottoId && SZ_THEMES.find(t => t.id === mottoId)) setSzThemeId(mottoId); setSzActive(!szActive); document.querySelector('[class*="SchnitzeljagdBlock"]')?.scrollIntoView({ behavior: "smooth" }); }} style={{
        flex: 1, padding: 10, borderRadius: 10,
        background: szActive ? "var(--al)" : "var(--bg)", color: szActive ? "var(--a)" : "var(--d)",
        border: `1px solid ${szActive ? "var(--a)" : "var(--l)"}`, fontWeight: 700, fontSize: 12, textAlign: "center", cursor: "pointer", fontFamily: "var(--f)",
      }}>{szActive ? "✅ Schnitzeljagd" : "🗺️ Schnitzeljagd"}</button>
      <a href={`https://party.machsleicht.de?${new URLSearchParams({...(childName?{childName}:{}), ...(age?{age}:{}), ...(motto?.name?{motto:motto.name}:{}), ...(motto?.emoji?{mottoEmoji:motto.emoji}:{})}).toString()}`} target="_blank" rel="noopener" style={{
        flex: 1, padding: 10, borderRadius: 10, background: "#25D366", color: "#fff",
        border: "none", fontWeight: 700, fontSize: 12, textAlign: "center", textDecoration: "none", fontFamily: "var(--f)",
      }}>📱 Partyseite</a>
    </div>
  );
}

// === EINLADUNGS-BLOCK ===
function EinladungBlock({ motto, guests, previewName, setPreviewName, inviteSent, setInviteSent }) {
  const displayName = previewName || "Emma";
  const greeting = (MOTTO_GREETINGS[motto?.id] || "Hey") + " " + displayName + "!";
  const done = inviteSent >= guests;

  return (
    <section className="fu" style={{ marginBottom: 16 }}>
      <div style={{ background: "var(--d)", borderRadius: 16, padding: "20px 18px", color: "#fff" }}>
        <p style={{ fontSize: 18, fontWeight: 900, margin: "0 0 4px", lineHeight: 1.3 }}>
          {guests} Kinder einladen — in 30 Sekunden
        </p>
        <p style={{ fontSize: 13, opacity: 0.6, margin: "0 0 16px" }}>
          Jedes Kind bekommt ein interaktives {motto.name}-Minispiel als Vorgeschmack.
        </p>

        <p style={{ fontSize: 11, opacity: 0.4, margin: "0 0 6px" }}>Probier's aus — tippe einen Namen:</p>
        <input type="text" value={previewName} onChange={(e) => setPreviewName(e.target.value)}
          placeholder="z.B. Emma, Max, Sophie…" style={{
            width: "100%", padding: "10px 14px", borderRadius: 10, border: "none",
            background: "rgba(255,255,255,0.12)", color: "#fff", fontSize: 14,
            fontFamily: "var(--f)", outline: "none", marginBottom: 12, boxSizing: "border-box",
          }}
        />

        {/* WhatsApp Preview */}
        <div style={{ background: "#DCF8C6", borderRadius: "12px 12px 12px 0", padding: "12px 14px", marginBottom: 6 }}>
          <p style={{ fontSize: 13, color: "#111", margin: 0, lineHeight: 1.5 }}>
            <strong>{greeting} </strong>Du bist eingeladen zum {motto.name}-Geburtstag!
          </p>
          <p style={{ fontSize: 11, color: "var(--a)", margin: "6px 0 0", fontWeight: 600 }}>
            👆 Tippe hier für dein {motto.name}-Abenteuer...
          </p>
        </div>
        <p style={{ fontSize: 10, opacity: 0.4, margin: "0 0 12px" }}>
          So sieht es auf {displayName}s Handy aus
        </p>

        <a href={`/einladung/erstellen/?motto=${motto?.id || ""}`}
          onClick={() => { setInviteSent(guests); typeof mlTrack === "function" && mlTrack("cta_einladung_plan", { motto: motto?.id }); }}
          style={{
            display: "block", width: "100%", background: done ? "var(--g)" : "var(--a)", color: "#fff",
            padding: 14, borderRadius: 99, fontWeight: 700, fontSize: 14, textAlign: "center",
            textDecoration: "none", boxSizing: "border-box", transition: "background .3s",
          }}>
          {done ? "✓ Einladung erstellt — bearbeiten →" : `💌 ${motto.name}-Einladung erstellen →`}
        </a>
        {done && <p style={{ fontSize: 11, opacity: 0.5, margin: "6px 0 0", textAlign: "center" }}>✓ Score +11% — Bereitschafts-Check aktualisiert</p>}

        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 10, fontSize: 11, opacity: 0.3 }}>
          <span>Kostenlos</span><span>Kein Account</span><span>DSGVO-konform</span>
        </div>
      </div>
    </section>
  );
}

// === TREASURE MAP CANVAS ===
const MAP_THEMES = {
  piraten:{parchment:['#F5E6C8','#EDD9B3','#D4B896'],accent:'#5D4037',pathColor:'rgba(139,69,19,0.45)',borderColor:'#8B6914',scatter:['🌊','🌊','⚓','🦜','🐙','💀','⛵','🌴','🌴','🐚','🗡️','🏴‍☠️','🦈','🌊','🐚'],pathDeco:['🐚','⚓','🦜','💀'],treasureIcon:'💰',startIcon:'⛵'},
  dschungel:{parchment:['#E0ECDA','#D0E0C4','#BCD4A8'],accent:'#D4A574',pathColor:'rgba(27,94,32,0.4)',borderColor:'#33691E',scatter:['🌴','🌴','🌿','🌿','🐒','🦎','🐍','🦜','🌺','🍃','🪻','🐸','🕸️','🐾','🍃'],pathDeco:['🐾','🌿','🦜','🍃'],treasureIcon:'🪶',startIcon:'🧭'},
  weltraum:{parchment:['#1a1a3e','#12123a','#0a0a2e'],accent:'#283593',pathColor:'rgba(124,77,255,0.45)',borderColor:'#536DFE',scatter:['⭐','⭐','⭐','✨','✨','🌙','🪐','☄️','🛸','🌌','🛰️','💫','⭐','✨','🌟'],pathDeco:['⭐','✨','💫','☄️'],treasureIcon:'🛸',startIcon:'🚀',darkMode:true},
  detektiv:{parchment:['#E8E4F0','#DDD8EA','#CCC6DC'],accent:'#455A64',pathColor:'rgba(26,35,126,0.35)',borderColor:'#3949AB',scatter:['🔍','👣','👣','👣','🕵️','📋','🔦','🖊️','🔐','📎','🧲','🕶️','💡','🚨','👣'],pathDeco:['👣','🔍','📎','🔦'],treasureIcon:'📦',startIcon:'🚔'},
  dino:{parchment:['#E8F0E0','#D8E8C8','#C4D8B0'],accent:'#795548',pathColor:'rgba(46,125,50,0.35)',borderColor:'#558B2F',scatter:['🦴','🦴','🦶','🦶','🌿','🌿','🌋','🥚','🦎','🪨','🦕','🦖','🌿','☄️','🪹'],pathDeco:['🦴','🦶','🌿','🪨'],treasureIcon:'🦴',startIcon:'⛏️'},
  feen:{parchment:['#FFF0F5','#FFE4EE','#FFD6E8'],accent:'#AB47BC',pathColor:'rgba(173,20,87,0.3)',borderColor:'#E91E63',scatter:['🦋','🦋','✨','✨','🌸','🌸','🍄','🌈','💎','🧚','🪷','🌺','💫','🫧','🌷'],pathDeco:['🦋','✨','🌸','💎'],treasureIcon:'✨',startIcon:'🧚'},
  safari:{parchment:['#F5ECD0','#EDE0B8','#D4C898'],accent:'#8D6E27',pathColor:'rgba(139,110,39,0.4)',borderColor:'#A68B3C',scatter:['🦁','🦁','🐘','🦒','🦓','🌴','🌴','🌾','🌾','🐆','🦏','🐊','🌅','🐾','🦩'],pathDeco:['🐾','🌾','🦁','🐘'],treasureIcon:'🏆',startIcon:'🧭'},
  einhorn:{parchment:['#F8F0FF','#F0E4FF','#E4D4FF'],accent:'#EC407A',pathColor:'rgba(236,64,122,0.3)',borderColor:'#E91E63',scatter:['🦄','🦄','🌈','🌈','⭐','✨','✨','💖','💜','🌸','🎀','💎','🫧','🌟','💫'],pathDeco:['✨','🌈','💖','⭐'],treasureIcon:'💎',startIcon:'🦄'},
  feuerwehr:{parchment:['#FFF0E6','#FFE4D0','#FFD4B8'],accent:'#D32F2F',pathColor:'rgba(211,47,47,0.35)',borderColor:'#D32F2F',scatter:['🔥','🔥','🚒','🚒','🧯','🪜','👨‍🚒','🏢','💧','💧','🚨','📟','🔔','🪣','🔥'],pathDeco:['🔥','💧','🚨','🧯'],treasureIcon:'🏅',startIcon:'🚒'},
};
// Smart Emoji Matching for hiding locations
const LOCATION_EMOJI_MAP = [
  [/rutsche/i,'🛝'],[/schaukel/i,'🎠'],[/wippe/i,'🎠'],[/kletterger[üu]/i,'🧗'],[/sandkasten|sandkiste/i,'🏖️'],
  [/baum|birke|eiche|linde/i,'🌳'],[/busch|hecke|str[äa]uch/i,'🌿'],[/blume|beet|rose/i,'🌸'],[/pflanze|topf|blumentopf/i,'🪴'],
  [/garten|rasen|wiese/i,'🌻'],[/terrasse|veranda/i,'☀️'],[/balkon/i,'🌅'],[/zaun|tor(?!te)/i,'🏗️'],
  [/brunnen/i,'⛲'],[/teich|see|wasser/i,'🐸'],[/pool|planschbecken/i,'🏊'],[/grill/i,'🔥'],
  [/garage/i,'🏠'],[/schuppen|gartenhaus/i,'🏚️'],[/hundeh[üu]tte/i,'🐕'],[/auto|wagen/i,'🚗'],[/fahrrad|rad/i,'🚲'],
  [/briefkasten/i,'📮'],[/m[üu]ll/i,'🗑️'],[/stein|fels/i,'🪨'],[/bank/i,'🪑'],[/spielplatz/i,'🎪'],
  [/t[üu]r|eingang/i,'🚪'],[/treppe|stufe/i,'🪜'],[/fenster/i,'🪟'],[/keller/i,'🔦'],[/dachboden|dach/i,'🏚️'],
  [/k[üu]che|herd/i,'🍳'],[/k[üu]hlschrank/i,'🧊'],[/bad(?!ewanne)|waschbecken/i,'🛁'],[/dusche/i,'🚿'],[/toilette|klo/i,'🚽'],[/badewanne|wanne/i,'🛁'],
  [/sofa|couch/i,'🛋️'],[/bett|matratze/i,'🛏️'],[/kissen/i,'🛋️'],[/schrank|kommode/i,'🗄️'],
  [/tisch|esstisch/i,'🍽️'],[/stuhl|hocker/i,'💺'],[/regal|b[üu]cherregal/i,'📚'],
  [/waschmaschine|trockner|w[äa]sche/i,'🧺'],[/kamin|ofen/i,'🔥'],
  [/vorhang|gardine/i,'🪟'],[/teppich/i,'🧶'],[/spielzimmer|kinderzimmer/i,'🧸'],
  [/flur|gang|diele/i,'🚶'],[/wohnzimmer/i,'🏡'],[/schlafzimmer/i,'😴'],
  [/trampolin/i,'🤸'],[/schublade/i,'🗄️'],[/korb|w[äa]schekorb/i,'🧺'],[/gew[äa]chshaus/i,'🌱'],[/baumhaus/i,'🏡'],
];
function matchLocationEmoji(text) {
  if (!text) return '';
  for (const [re, em] of LOCATION_EMOJI_MAP) { if (re.test(text)) return em; }
  return '📍';
}

function mapSeededRandom(seed){let s=seed;return()=>{s=(s*16807)%2147483647;return(s-1)/2147483646;};}
function mapAutoLayout(stationNames,W,H){
  const pad=45,n=stationNames.length,pts=[];
  pts.push({x:pad+25,y:H-pad-20,label:'Start',isStart:true});
  for(let i=0;i<n;i++){
    const t=(i+0.5)/n;const x=pad+25+(W-pad*2-50)*t;
    const phase=t*Math.PI*2;const amp=(H-pad*2-70)*0.3;
    const y=H*0.5+Math.sin(phase-Math.PI/2)*amp;
    const seed=stationNames[i].charCodeAt(0)*13+i*47;
    pts.push({x:Math.max(pad+15,Math.min(W-pad-15,x+((seed%24)-12))),y:Math.max(pad+35,Math.min(H-pad-15,y+((seed*7%24)-12))),label:stationNames[i],index:i+1});
  }
  pts.push({x:W-pad-25,y:pad+30,label:'Schatz!',isTreasure:true});
  return pts;
}
function drawTreasureMap(canvas,points,themeId,title,dekoItems,selectedDekoIdx,stationEmojis){
  const t=MAP_THEMES[themeId]||MAP_THEMES.piraten;const ctx=canvas.getContext('2d');
  const dpr=window.devicePixelRatio||1;const W=canvas.width/dpr;const H=canvas.height/dpr;
  const isDark=t.darkMode;const tc=isDark?'rgba(200,200,255,0.85)':'rgba(80,40,10,0.85)';const tcl=isDark?'rgba(160,160,200,0.4)':'rgba(120,80,40,0.35)';
  const rng=mapSeededRandom(42+(themeId||'').length*7);
  const grad=ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,W*0.7);grad.addColorStop(0,t.parchment[0]);grad.addColorStop(0.6,t.parchment[1]);grad.addColorStop(1,t.parchment[2]);ctx.fillStyle=grad;ctx.fillRect(0,0,W,H);
  for(let i=0;i<5000;i++){ctx.fillStyle=isDark?`rgba(100,100,200,${rng()*0.12})`:`rgba(120,80,40,${rng()*0.05})`;ctx.fillRect(rng()*W,rng()*H,1,1);}
  for(let i=0;i<3;i++){const sx=rng()*W,sy=rng()*H,sr=20+rng()*40;const st=ctx.createRadialGradient(sx,sy,0,sx,sy,sr);st.addColorStop(0,isDark?'rgba(60,60,120,0.08)':'rgba(160,120,60,0.06)');st.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=st;ctx.beginPath();ctx.arc(sx,sy,sr,0,Math.PI*2);ctx.fill();}
  ctx.strokeStyle=t.borderColor;ctx.lineWidth=2.5;ctx.strokeRect(8,8,W-16,H-16);ctx.strokeStyle=t.borderColor+'44';ctx.lineWidth=1;ctx.strokeRect(12,12,W-24,H-24);
  ctx.textAlign='center';ctx.fillStyle=tc;ctx.font=`bold ${W>400?18:14}px Georgia,serif`;ctx.fillText(title||'Schatzkarte',W/2,30);
  ctx.globalAlpha=isDark?0.2:0.15;t.scatter.forEach(em=>{const ex=25+rng()*(W-50),ey=40+rng()*(H-70);let skip=false;points.forEach(p=>{if(Math.hypot(p.x-ex,p.y-ey)<40)skip=true;});if(skip)return;ctx.font=`${11+rng()*8}px serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.save();ctx.translate(ex,ey);ctx.rotate((rng()-0.5)*0.5);ctx.fillText(em,0,0);ctx.restore();});ctx.globalAlpha=1;
  if(points.length>=2){ctx.setLineDash([6,4]);ctx.strokeStyle=t.pathColor;ctx.lineWidth=2.5;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(points[0].x,points[0].y);const mids=[];for(let i=1;i<points.length;i++){const p0=points[Math.max(0,i-2)],p1=points[i-1],p2=points[i],p3=points[Math.min(points.length-1,i+1)];ctx.bezierCurveTo(p1.x+(p2.x-p0.x)/6,p1.y+(p2.y-p0.y)/6,p2.x-(p3.x-p1.x)/6,p2.y-(p3.y-p1.y)/6,p2.x,p2.y);mids.push({x:(p1.x+p2.x)/2+(rng()-0.5)*15,y:(p1.y+p2.y)/2+(rng()-0.5)*15});}ctx.stroke();ctx.setLineDash([]);ctx.globalAlpha=0.5;mids.forEach(mp=>{ctx.font='11px serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(t.pathDeco[Math.floor(rng()*t.pathDeco.length)],mp.x,mp.y);});ctx.globalAlpha=1;}
  const ccx=W-38,ccy=H-38;ctx.save();ctx.translate(ccx,ccy);ctx.strokeStyle=tcl;ctx.lineWidth=1;ctx.beginPath();ctx.arc(0,0,18,0,Math.PI*2);ctx.stroke();[{a:-Math.PI/2,l:'N',len:14,b:true},{a:0,l:'O',len:10},{a:Math.PI/2,l:'S',len:10},{a:Math.PI,l:'W',len:10}].forEach(d=>{ctx.strokeStyle=d.b?tc:tcl;ctx.lineWidth=d.b?2:1.5;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(Math.cos(d.a)*d.len,Math.sin(d.a)*d.len);ctx.stroke();ctx.fillStyle=d.b?tc:tcl;ctx.font=d.b?'bold 8px Georgia':'7px Georgia';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(d.l,Math.cos(d.a)*(d.len+7),Math.sin(d.a)*(d.len+7));});ctx.restore();
  const stColor=t.accent;
  // Draw deko emojis (user-placed decorations)
  if (dekoItems && dekoItems.length) { dekoItems.forEach((d, di) => { const dx = d.fx * W, dy = d.fy * H; if (di === selectedDekoIdx) { ctx.strokeStyle='#E53935'; ctx.lineWidth=2; ctx.setLineDash([3,3]); ctx.beginPath(); ctx.arc(dx, dy, 14, 0, Math.PI*2); ctx.stroke(); ctx.setLineDash([]); } ctx.font='20px serif'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.globalAlpha=0.85; ctx.fillText(d.emoji, dx, dy); ctx.globalAlpha=1; }); }
  points.forEach(p=>{
    if(p.isTreasure){ctx.save();ctx.translate(p.x,p.y);ctx.strokeStyle='#CC0000';ctx.lineWidth=3.5;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(-12,-12);ctx.lineTo(12,12);ctx.stroke();ctx.beginPath();ctx.moveTo(12,-12);ctx.lineTo(-12,12);ctx.stroke();ctx.font='18px serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(t.treasureIcon,0,-18);ctx.fillStyle='#CC0000';ctx.font='bold italic 10px Georgia';ctx.textBaseline='alphabetic';ctx.fillText('Schatz!',0,24);ctx.restore();return;}
    if(p.isStart){ctx.font='18px serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(t.startIcon,p.x,p.y);ctx.fillStyle=tc;ctx.font='bold 8px Georgia';ctx.textBaseline='top';ctx.fillText('START',p.x,p.y+12);return;}
    ctx.fillStyle='rgba(0,0,0,0.1)';ctx.beginPath();ctx.arc(p.x+1.5,p.y+1.5,15,0,Math.PI*2);ctx.fill();
    ctx.fillStyle=isDark?'#2a2a5a':t.parchment[0];ctx.strokeStyle=stColor;ctx.lineWidth=2;ctx.beginPath();ctx.arc(p.x,p.y,15,0,Math.PI*2);ctx.fill();ctx.stroke();
    ctx.fillStyle=isDark?'#fff':stColor;ctx.font='bold 12px Georgia';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(p.index,p.x,p.y+1);
    const sEmoji=stationEmojis&&stationEmojis[p.index-1];if(sEmoji){ctx.font='14px serif';ctx.textBaseline='bottom';ctx.fillText(sEmoji,p.x,p.y-17);}
    ctx.fillStyle=tc;ctx.font='8px Georgia';ctx.textBaseline='top';const lbl=p.label.length>24?p.label.slice(0,23)+'…':p.label;ctx.fillText(lbl,p.x,p.y+18,120);
  });
  ctx.fillStyle=tcl;ctx.font='italic 7px Georgia';ctx.textAlign='left';ctx.textBaseline='bottom';ctx.fillText('💡 Elemente verschieben: tippen & ziehen',14,H-10);
}

function TreasureMapCanvas({ szTheme, stations, childName, mapPositions, setMapPositions, stationLocations, dekoEmojis, setDekoEmojis }) {
  const canvasRef = React.useRef(null);
  const dragRef = React.useRef({dragging:false,type:null,idx:-1,offX:0,offY:0});
  const dimRef = React.useRef({w:0,h:0});
  const posRef = React.useRef(null);
  const dekoRef = React.useRef(dekoEmojis);
  posRef.current = mapPositions;
  dekoRef.current = dekoEmojis;
  const [activeDekoEmoji, setActiveDekoEmoji] = React.useState(null);
  const activeDekoRef = React.useRef(null);
  activeDekoRef.current = activeDekoEmoji;
  const [selectedDekoIdx, setSelectedDekoIdx] = React.useState(null);
  const selDekoRef = React.useRef(null);
  selDekoRef.current = selectedDekoIdx;
  React.useEffect(() => { if (selectedDekoIdx !== null && (!dekoEmojis.length || selectedDekoIdx >= dekoEmojis.length)) setSelectedDekoIdx(null); }, [dekoEmojis, selectedDekoIdx]);

  const themeId = szTheme ? szTheme.id : 'piraten';
  const stationNames = stations.map((s,i) => {
    const loc = stationLocations && stationLocations[i];
    if (loc) return i === stations.length - 1 ? '🎁 ' + loc : loc;
    return i === stations.length - 1 ? '🎁 ' + s.name : s.name;
  });
  const stationEmojis = stations.map((s,i) => {
    const loc = stationLocations && stationLocations[i];
    return loc ? matchLocationEmoji(loc) : null;
  });
  const nameGen = childName ? (childName.endsWith("s") ? childName + "'" : childName + "s") : "";
  const mapTitle = `${szTheme ? szTheme.emoji : ''} ${nameGen ? nameGen + ' ' : ''}${szTheme ? szTheme.name : 'Schatzkarte'}`;

  // Theme-specific palette emojis (deduplicated from scatter + pathDeco)
  const themeConfig = MAP_THEMES[themeId] || MAP_THEMES.piraten;
  const paletteEmojis = React.useMemo(() => {
    const theme = [...(themeConfig.scatter || []), ...(themeConfig.pathDeco || []), themeConfig.treasureIcon, themeConfig.startIcon];
    const universal = ['🎈','🎉','⭐','❤️','🎀','🎵','🏠','🌈'];
    return [...new Set([...theme, ...universal])];
  }, [themeId]);

  const getPoints = React.useCallback((w,h) => {
    const auto = mapAutoLayout(stationNames, w, h);
    if (mapPositions && mapPositions.length === auto.length) {
      return mapPositions.map((p,i) => ({...auto[i], x:p.x, y:p.y}));
    }
    return auto;
  }, [stationNames, mapPositions]);

  const redraw = React.useCallback(() => {
    const c = canvasRef.current;
    if (!c || !stations.length) return;
    const dpr = window.devicePixelRatio || 1;
    const container = c.parentElement;
    const dw = container ? container.clientWidth : 300;
    const dh = Math.round(dw * 0.8);
    c.width = dw * dpr; c.height = dh * dpr;
    c.style.width = dw + 'px'; c.style.height = dh + 'px';
    dimRef.current = {w:dw, h:dh};
    const ctx = c.getContext('2d'); ctx.scale(dpr, dpr);
    drawTreasureMap(c, getPoints(dw, dh), themeId, mapTitle, dekoRef.current, selDekoRef.current, stationEmojis);
  }, [stations, themeId, mapTitle, getPoints, dekoEmojis, selectedDekoIdx]);

  React.useEffect(() => { setMapPositions(null); setActiveDekoEmoji(null); setSelectedDekoIdx(null); }, [stations.length, themeId]);
  React.useEffect(() => { redraw(); }, [redraw, mapPositions, dekoEmojis, selectedDekoIdx]);
  React.useEffect(() => { const h = () => { setMapPositions(null); setTimeout(redraw, 50); }; window.addEventListener('resize', h); return () => window.removeEventListener('resize', h); }, [redraw]);

  // Native touch/mouse handlers for drag + place + select
  React.useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const MAX_DEKO = 15;
    const getXY = (e) => { const rect = c.getBoundingClientRect(); const touch = e.touches ? e.touches[0] : (e.changedTouches ? e.changedTouches[0] : e); if (!touch) return null; return {x: touch.clientX - rect.left, y: touch.clientY - rect.top}; };
    const findStationIdx = (x, y) => { const {w, h} = dimRef.current; const pts = getPoints(w, h); for (let i = pts.length - 1; i >= 0; i--) { if (Math.hypot(pts[i].x - x, pts[i].y - y) < 25) return i; } return -1; };
    const findDekoIdx = (x, y) => { const {w, h} = dimRef.current; const deks = dekoRef.current || []; for (let i = deks.length - 1; i >= 0; i--) { if (Math.hypot(deks[i].fx * w - x, deks[i].fy * h - y) < 18) return i; } return -1; };

    const down = (e) => {
      const pos = getXY(e); if (!pos) return;
      // 1. Check stations
      const sIdx = findStationIdx(pos.x, pos.y);
      if (sIdx >= 0) { e.preventDefault(); setSelectedDekoIdx(null); const {w, h} = dimRef.current; const pts = getPoints(w, h); if (!posRef.current) { const np = pts.map(p => ({x: p.x, y: p.y})); posRef.current = np; setMapPositions(np); } dragRef.current = {dragging: true, type:'station', idx: sIdx, offX: pts[sIdx].x - pos.x, offY: pts[sIdx].y - pos.y, moved: false, startX: pos.x, startY: pos.y}; return; }
      // 2. Check deko emojis
      const dIdx = findDekoIdx(pos.x, pos.y);
      if (dIdx >= 0) { e.preventDefault(); const {w, h} = dimRef.current; const deks = dekoRef.current || []; dragRef.current = {dragging: true, type:'deko', idx: dIdx, offX: deks[dIdx].fx * w - pos.x, offY: deks[dIdx].fy * h - pos.y, moved: false, startX: pos.x, startY: pos.y}; return; }
      // 3. Place new deko emoji if one is active (with limit)
      const ae = activeDekoRef.current;
      if (ae) { e.preventDefault(); setSelectedDekoIdx(null); const cur = dekoRef.current || []; if (cur.length >= MAX_DEKO) return; const {w, h} = dimRef.current; const fx = Math.max(0.03, Math.min(0.97, pos.x / w)); const fy = Math.max(0.05, Math.min(0.95, pos.y / h)); const nd = [...cur, {emoji: ae, fx, fy}]; dekoRef.current = nd; setDekoEmojis(nd); setActiveDekoEmoji(null); return; }
      // 4. Tapped empty space → deselect
      setSelectedDekoIdx(null);
    };
    const move = (e) => {
      if (!dragRef.current.dragging) return; e.preventDefault(); const pos = getXY(e); if (!pos) return;
      const dr = dragRef.current;
      if (!dr.moved && Math.hypot(pos.x - dr.startX, pos.y - dr.startY) > 5) dr.moved = true;
      if (!dr.moved) return;
      const {type, idx, offX, offY} = dr; const {w, h} = dimRef.current;
      if (type === 'station') { const nx = Math.max(15, Math.min(w - 15, pos.x + offX)); const ny = Math.max(15, Math.min(h - 15, pos.y + offY)); const np = [...(posRef.current || [])]; np[idx] = {x: nx, y: ny}; posRef.current = np; setMapPositions(np); }
      if (type === 'deko') { const fx = Math.max(0.03, Math.min(0.97, (pos.x + offX) / w)); const fy = Math.max(0.05, Math.min(0.95, (pos.y + offY) / h)); const nd = [...(dekoRef.current || [])]; nd[idx] = {...nd[idx], fx, fy}; dekoRef.current = nd; setDekoEmojis(nd); }
    };
    const up = () => {
      const dr = dragRef.current;
      // Tap on deko (no drag) → toggle selection
      if (dr.dragging && dr.type === 'deko' && !dr.moved) {
        setSelectedDekoIdx(selDekoRef.current === dr.idx ? null : dr.idx);
      }
      dragRef.current = {dragging: false, type: null, idx: -1, offX: 0, offY: 0, moved: false, startX: 0, startY: 0};
    };
    c.addEventListener('touchstart', down, {passive: false}); c.addEventListener('touchmove', move, {passive: false}); c.addEventListener('touchend', up);
    c.addEventListener('mousedown', down); c.addEventListener('mousemove', move); c.addEventListener('mouseup', up); c.addEventListener('mouseleave', up);
    return () => { c.removeEventListener('touchstart', down); c.removeEventListener('touchmove', move); c.removeEventListener('touchend', up); c.removeEventListener('mousedown', down); c.removeEventListener('mousemove', move); c.removeEventListener('mouseup', up); c.removeEventListener('mouseleave', up); };
  }, [getPoints, setMapPositions, setDekoEmojis]);

  // Expose canvas ref + clean redraw for print export
  TreasureMapCanvas._canvasRef = canvasRef;
  TreasureMapCanvas._redrawClean = () => {
    const c = canvasRef.current; if (!c || !stations.length) return;
    const dpr = window.devicePixelRatio || 1;
    const dw = dimRef.current.w || 300; const dh = dimRef.current.h || 240;
    c.width = dw * dpr; c.height = dh * dpr; c.style.width = dw + 'px'; c.style.height = dh + 'px';
    const ctx = c.getContext('2d'); ctx.scale(dpr, dpr);
    drawTreasureMap(c, getPoints(dw, dh), themeId, mapTitle, dekoRef.current, null, stationEmojis);
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <p style={{ fontSize: 12, fontWeight: 700, color: "var(--m)", marginBottom: 6 }}>🗺️ Schatzkarte</p>
      <div style={{ borderRadius: 12, overflow: "hidden", border: `2px solid ${szTheme ? szTheme.color + "40" : "var(--l)"}`, touchAction: "none" }}>
        <canvas ref={canvasRef} style={{ display: "block", width: "100%", cursor: activeDekoEmoji ? "crosshair" : "grab", touchAction: "none" }} />
      </div>
      {/* Emoji Palette */}
      <div className="no-print" style={{ marginTop: 8 }}>
        <p style={{ fontSize: 11, color: "var(--m)", marginBottom: 4 }}>
          {selectedDekoIdx !== null ? `${dekoEmojis[selectedDekoIdx]?.emoji} ausgewählt — verschieben oder löschen` : activeDekoEmoji ? `${activeDekoEmoji} Tippe auf die Karte zum Platzieren` : `Deko-Emoji wählen (${dekoEmojis.length}/15):`}
        </p>
        {selectedDekoIdx !== null && (
          <button onClick={() => { const nd = dekoEmojis.filter((_, i) => i !== selectedDekoIdx); setDekoEmojis(nd); setSelectedDekoIdx(null); }}
            style={{ fontSize: 12, padding: "5px 14px", fontWeight: 600, border: "none", borderRadius: 8, background: "#FFEBEE", color: "#C62828", cursor: "pointer", marginBottom: 6, display: "block" }}>🗑️ Entfernen</button>
        )}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {paletteEmojis.map((em, i) => (
            <button key={i} onClick={() => { setSelectedDekoIdx(null); setActiveDekoEmoji(activeDekoEmoji === em ? null : em); }}
              style={{
                fontSize: 18, padding: "4px 6px", borderRadius: 8, cursor: "pointer", border: "none", lineHeight: 1,
                background: activeDekoEmoji === em ? szTheme.color + "20" : "var(--bg)",
                boxShadow: activeDekoEmoji === em ? `0 0 0 2px ${szTheme.color}` : "0 0 0 1px var(--l)",
                transform: activeDekoEmoji === em ? "scale(1.2)" : "none", transition: "all 0.15s",
                opacity: dekoEmojis.length >= 15 && !activeDekoEmoji ? 0.4 : 1,
              }}>{em}</button>
          ))}
        </div>
      </div>
      {/* Reset buttons */}
      {(mapPositions || dekoEmojis.length > 0) && (
        <div className="no-print" style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 6 }}>
          {mapPositions && <button onClick={() => setMapPositions(null)} style={{ fontSize: 11, padding: "4px 12px", fontWeight: 600, border: "1px solid var(--l)", borderRadius: 8, background: "var(--bg)", color: "var(--m)", cursor: "pointer" }}>↺ Positionen</button>}
          {dekoEmojis.length > 0 && <button onClick={() => { setDekoEmojis([]); setActiveDekoEmoji(null); setSelectedDekoIdx(null); }} style={{ fontSize: 11, padding: "4px 12px", fontWeight: 600, border: "1px solid var(--l)", borderRadius: 8, background: "var(--bg)", color: "var(--m)", cursor: "pointer" }}>✕ Alle Deko ({dekoEmojis.length})</button>}
        </div>
      )}
    </div>
  );
}

// === SCHNITZELJAGD INLINE BLOCK (expandable within plan view) ===
function SchnitzeljagdBlock({ age, ag, mottoId, szActive, setSzActive, szThemeId, setSzThemeId, szTheme, childName, setChildName, mapPositions, setMapPositions, stationLocations, setStationLocations, dekoEmojis, setDekoEmojis }) {
  const stations = szTheme ? (szTheme.stations[ag] || szTheme.stations.mittel) : [];
  const materials = szTheme ? (szTheme.material[ag] || szTheme.material.mittel) : [];
  const totalDauer = stations.reduce((s, st) => s + st.dauer, 0);
  React.useEffect(() => { setStationLocations({}); setDekoEmojis([]); }, [szThemeId, ag]);
  const nameGen = childName ? (childName.endsWith("s") ? childName + "'" : childName + "s") : "";
  const introText = szTheme ? (szTheme.intro[ag] || szTheme.intro.mittel).replace(/\{name\},?\s*/g, childName ? childName + ", " : "") : "";
  const shopItems = szThemeId ? (SZ_SHOP_ITEMS[szThemeId] || []) : [];

  // === PRINT ===
  function printKomplettpaket() {
    if (!szTheme) return;
    window.plausible && plausible("sz-komplettpaket-gedruckt", { props: { thema: szThemeId } });
    TreasureMapCanvas._redrawClean && TreasureMapCanvas._redrawClean();
    const w = window.open("", "", "width=900,height=700");
    w.document.write(`<html><head><title>Komplettpaket ${szTheme.name}</title>
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=DM+Sans:opsz,wght@9..40,400;9..40,700;9..40,800&display=swap" rel="stylesheet">
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'DM Sans',system-ui,sans-serif;color:#2D2319;background:#FFF}.page{page-break-after:always;padding:32px;min-height:100vh}.page:last-child{page-break-after:auto}h1{font-size:22px;font-weight:900;margin-bottom:8px}h2{font-size:16px;font-weight:800;color:${szTheme.color};margin:20px 0 10px;border-bottom:2px solid ${szTheme.color}30;padding-bottom:4px}.station{margin-bottom:14px;padding:12px;background:#FAFAF5;border-radius:10px;border:1px solid #EDE6DE}.station-name{font-weight:800;font-size:14px;margin-bottom:4px}.station-desc{font-size:13px;line-height:1.5;color:#5D4037}.hint{font-size:12px;color:#795548;background:#FFF8E1;padding:6px 10px;border-radius:6px;margin-top:6px;border:1px solid #FFE082}.check{display:inline-block;width:14px;height:14px;border:2px solid #A89888;border-radius:3px;margin-right:8px;vertical-align:middle}.hinweis-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.hinweis-card{border:2px dashed ${szTheme.color}80;border-radius:12px;padding:14px;text-align:center;min-height:140px;display:flex;flex-direction:column;justify-content:center}.cert{text-align:center;padding:48px;border:4px double ${szTheme.color};border-radius:16px;position:relative;max-width:600px;margin:0 auto}.cert::before{content:'';position:absolute;inset:8px;border:1px solid ${szTheme.color}40;border-radius:10px}@media print{.page{padding:24px;min-height:auto}}</style></head><body>
${TreasureMapCanvas._canvasRef && TreasureMapCanvas._canvasRef.current ? `<div class="page" style="display:flex;flex-direction:column;align-items:center;justify-content:center"><img src="${TreasureMapCanvas._canvasRef.current.toDataURL('image/png')}" style="width:100%;max-width:700px;border-radius:16px;border:2px solid ${szTheme.color}40" /></div>` : ""}
<div class="page"><h1>${szTheme.emoji} ${nameGen ? nameGen + " " : ""}${szTheme.name}</h1><p style="font-size:13px;color:#6B5D52;margin-bottom:12px">${stations.length} Stationen · ${ageLabel[ag]} · ca. ${totalDauer} Min.</p><p style="font-size:14px;color:#5D4037;line-height:1.6;font-style:italic;margin-bottom:16px;padding:12px;background:#FAFAF5;border-radius:8px">„${introText}"</p>${stations.map((s, i) => { const loc = stationLocations[i]; const locLine = loc ? `<div style="font-size:12px;color:#5D4037;margin-top:4px;font-style:italic">📍 Versteck: ${loc}</div>` : ''; return `<div class="station"><div class="station-name">${i === stations.length - 1 ? "🎁" : (i + 1) + "."} ${s.name}</div>${locLine}<div class="station-desc">${s.desc}</div><div class="hint">💡 ${s.hint}</div></div>`; }).join("")}</div>
<div class="page"><h1>✂️ Hinweis-Zettel zum Ausschneiden</h1><p style="font-size:13px;color:#6B5D52;margin-bottom:16px">Ausschneiden und an den Stationen verstecken.</p><div class="hinweis-grid">${stations.map((s, i) => { const nextLoc = stationLocations[i + 1]; const thisLoc = stationLocations[i]; const nextLabel = i < stations.length - 1 ? (nextLoc ? nextLoc : stations[i + 1].name) : null; const hideHint = thisLoc ? `<div style="font-size:10px;color:#795548;margin-top:8px;border-top:1px dashed ${szTheme.color}40;padding-top:6px">📍 Verstecke hier: ${thisLoc}</div>` : ''; return `<div class="hinweis-card"><div style="font-size:28px;margin-bottom:4px">${i === stations.length - 1 ? "🎁" : "Station " + (i + 1)}</div><div style="font-size:13px;font-weight:700;margin-bottom:6px">${s.name}</div><div style="font-size:16px;color:#5D4037;font-family:'Caveat',cursive">${nextLabel ? "→ Weiter zu: " + nextLabel : "🎉 Geschafft! Hier ist der Schatz!"}</div>${hideHint}</div>`; }).join("")}</div></div>
<div class="page"><h1>📋 Material-Checkliste</h1><h2>Pro Station</h2><ul style="list-style:none;columns:2">${materials.map(m => `<li style="font-size:13px;line-height:2"><span class="check"></span>${m}</li>`).join("")}</ul><h2>Schatz-Ideen</h2><ul style="list-style:none;columns:2">${szTheme.schatz.map(s => `<li style="font-size:13px;line-height:2"><span class="check"></span>${s}</li>`).join("")}</ul></div>
<div class="page" style="display:flex;justify-content:center;align-items:center"><div class="cert"><div style="font-size:56px;margin-bottom:12px">${szTheme.emoji}</div><div style="font-size:28px;font-weight:900;margin-bottom:6px">Urkunde</div><div style="font-size:18px;color:#6B5D52;margin-bottom:24px">${szTheme.name}</div><div style="font-size:32px;font-weight:900;color:${szTheme.color};padding:8px 0;border-bottom:2px solid ${szTheme.color}40;margin-bottom:16px">_______________</div><div style="font-size:15px;color:#6B5D52;line-height:1.6;margin:16px 0">hat die große ${szTheme.name} erfolgreich bestanden!<br>Alle ${stations.length} Stationen gemeistert.</div><div style="display:flex;justify-content:space-between;margin-top:32px;font-size:13px;color:#A89888"><div style="border-top:1px solid #CCC;padding-top:4px;min-width:140px;text-align:center">Datum</div><div style="border-top:1px solid #CCC;padding-top:4px;min-width:140px;text-align:center">Unterschrift</div></div><div style="font-size:10px;color:#A89888;margin-top:16px">machsleicht.de</div></div></div>
</body></html>`);
    w.document.close();
    setTimeout(() => w.print(), 400);
  }

  // === TEASER (collapsed) ===
  if (!szActive) return (
    <section className="fu" style={{ marginBottom: 24 }}>
      <button onClick={() => { if (mottoId && SZ_THEMES.find(t => t.id === mottoId)) setSzThemeId(mottoId); setSzActive(true); window.plausible && plausible("sz-activated"); }} style={{
        width: "100%", background: "linear-gradient(135deg,#fef8f0,#fff8e8)", borderRadius: 20, padding: "24px 20px",
        border: "1px solid #f0ede8", display: "flex", alignItems: "center", gap: 16, cursor: "pointer", textAlign: "left",
      }}>
        <div style={{ fontSize: 40, flexShrink: 0 }}>🗺️</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "var(--fd)", fontWeight: 800, fontSize: 17, color: "var(--d)", marginBottom: 4 }}>+ Schnitzeljagd hinzufügen</div>
          <div style={{ fontSize: 12, color: "var(--m)", lineHeight: 1.5 }}>Stationen, Rätsel, Schatzkarte, Hinweis-Zettel — druckfertig in 5 Min.</div>
        </div>
        <div style={{ fontSize: 20, color: "var(--a)", flexShrink: 0 }}>+</div>
      </button>
    </section>
  );

  // === EXPANDED (full inline block) ===
  return (
    <section className="fu" style={{ marginBottom: 24 }}>
      <div style={{ borderRadius: 20, border: `2px solid ${szTheme ? szTheme.color + "40" : "var(--a)"}`, overflow: "hidden" }}>

        {/* Header */}
        <div style={{ background: "linear-gradient(135deg,#e8d5b7,#d4bc94)", padding: "16px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: 17, fontWeight: 900, color: "var(--d)", margin: "0 0 2px" }}>🗺️ Schnitzeljagd {szTheme ? `· ${szTheme.name}` : ""}</p>
            {szTheme && <p style={{ fontSize: 12, color: "var(--d)", opacity: 0.6, margin: 0 }}>{stations.length} Stationen · {ageLabel[ag]} · {totalDauer} Min.</p>}
          </div>
          <button onClick={() => setSzActive(false)} style={{ background: "rgba(255,255,255,0.5)", border: "none", borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer", color: "var(--d)" }}>✕</button>
        </div>

        <div style={{ padding: "16px 18px", background: "var(--bg)" }}>

          {/* Theme Picker */}
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "var(--m)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Thema wählen</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))", gap: 6 }}>
              {SZ_THEMES.map((t) => (
                <button key={t.id} onClick={() => setSzThemeId(t.id)} style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                  padding: "12px 6px 10px", background: szThemeId === t.id ? t.color + "12" : "#fff",
                  border: `2px solid ${szThemeId === t.id ? t.color : "#eee"}`, borderRadius: 12, cursor: "pointer",
                  transition: "all 0.2s",
                }}>
                  <span style={{ fontSize: 24 }}>{t.emoji}</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: szThemeId === t.id ? t.color : "#666" }}>{SZ_LABELS[t.id] || t.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Child Name */}
          <div style={{ marginBottom: 16 }}>
            <input type="text" value={childName} onChange={(e) => setChildName(e.target.value)}
              placeholder="Name des Kindes (optional)" style={{
                width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--l)",
                fontSize: 13, fontFamily: "var(--f)", outline: "none", background: "#fff", boxSizing: "border-box",
              }} />
          </div>

          {szTheme && <>
            {/* Intro */}
            <div style={{ background: `${szTheme.color}08`, borderRadius: 12, padding: "14px 16px", marginBottom: 16, borderLeft: `3px solid ${szTheme.color}` }}>
              <p style={{ fontSize: 13, color: "var(--d)", lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>„{introText}"</p>
              <p style={{ fontSize: 10, color: "var(--m)", marginTop: 6, fontWeight: 600 }}>💡 Vorlesen, bevor es losgeht</p>
            </div>

            {/* Stations */}
            <div style={{ marginBottom: 16 }}>
              {stations.map((st, i) => {
                const isLast = i === stations.length - 1;
                const locText = stationLocations[i] || '';
                const locEmoji = locText ? matchLocationEmoji(locText) : '';
                return (
                  <div key={i} style={{ marginBottom: 8 }}>
                    <details open={i === 0} style={{ marginBottom: 0 }}>
                      <summary style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "6px 0", fontSize: 13, listStyle: "none" }}>
                        <span style={{ width: 22, height: 22, borderRadius: "50%", background: isLast ? "var(--a)" : szTheme.color, color: "#fff", fontSize: 9, fontWeight: 800, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{isLast ? "🎁" : i + 1}</span>
                        <span style={{ fontWeight: 700, flex: 1 }}>{st.name}</span>
                        <span style={{ fontSize: 11, color: "var(--m)" }}>{st.dauer}′</span>
                        <span style={{ fontSize: 10, color: "var(--l)", flexShrink: 0, transition: "transform 0.2s" }}>▼</span>
                      </summary>
                      <div style={{ paddingLeft: 30, paddingBottom: 6 }}>
                        <p style={{ fontSize: 12, color: "var(--m)", lineHeight: 1.5, margin: "4px 0 6px" }}>{st.desc}</p>
                        {st.hint && <p style={{ fontSize: 11, color: "#795548", background: "#FFF8E1", padding: "6px 10px", borderRadius: 6, border: "1px solid #FFE082" }}>💡 {st.hint}</p>}
                      </div>
                    </details>
                    {!isLast && <div style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: 30, marginTop: 2 }}>
                      {locEmoji && <span style={{ fontSize: 14, flexShrink: 0 }}>{locEmoji}</span>}
                      <input type="text" value={locText} onChange={e => { const v = e.target.value; setStationLocations(prev => { const n = {...prev}; if (v) n[i] = v; else delete n[i]; return n; }); }}
                        placeholder="📍 Wo versteckst du diesen Hinweis?" style={{
                          flex: 1, padding: "6px 10px", borderRadius: 8, border: `1px solid ${locText ? szTheme.color + '60' : 'var(--l)'}`,
                          fontSize: 12, fontFamily: "var(--f)", outline: "none", background: locText ? szTheme.color + '06' : "#FAFAF5", boxSizing: "border-box",
                          transition: "border-color 0.2s, background 0.2s",
                        }} />
                    </div>}
                  </div>
                );
              })}
            </div>

            {/* Map - Canvas-based Treasure Map */}
            <TreasureMapCanvas szTheme={szTheme} stations={stations} childName={childName} mapPositions={mapPositions} setMapPositions={setMapPositions} stationLocations={stationLocations} dekoEmojis={dekoEmojis} setDekoEmojis={setDekoEmojis} />

            {/* Material */}
            <details style={{ marginBottom: 16 }}>
              <summary style={{ fontSize: 13, fontWeight: 700, color: "var(--a)", cursor: "pointer", padding: "6px 0" }}>📦 Material-Checkliste ({materials.length} Posten)</summary>
              <div style={{ paddingTop: 8, display: "flex", flexDirection: "column", gap: 4 }}>
                {materials.map((mat, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", background: "#fff", borderRadius: 8, border: "1px solid var(--l)", fontSize: 12 }}>
                    <input type="checkbox" style={{ width: 14, height: 14, accentColor: "var(--g)" }} />
                    <span>{mat}</span>
                  </div>
                ))}
                {szTheme.schatz.map((s, i) => (
                  <div key={"s" + i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", background: "#fff", borderRadius: 8, border: "1px solid var(--l)", fontSize: 12 }}>
                    <span>🎁</span>
                    <span style={{ flex: 1 }}>{s}</span>
                    {SZ_SCHATZ_LINKS[s] && <a href={SZ_SCHATZ_LINKS[s]} target="_blank" rel="noopener" style={{ fontSize: 10, fontWeight: 700, color: "#FF9900", textDecoration: "none", padding: "2px 6px", borderRadius: 4, background: "#FFF3E0" }}>Amazon ↗</a>}
                  </div>
                ))}
              </div>
            </details>

            {/* Print */}
            <button onClick={printKomplettpaket} className="no-print" style={{
              width: "100%", padding: "12px 20px", background: szTheme.color, color: "#fff",
              border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer",
              boxShadow: `0 2px 12px ${szTheme.color}30`,
            }}>🖨️ Schnitzeljagd-Paket drucken</button>
            <p className="no-print" style={{ fontSize: 10, color: "var(--m)", marginTop: 4, textAlign: "center" }}>Schatzkarte · Stationen · Hinweis-Zettel · Material · Urkunde</p>
          </>}

          {!szTheme && <p style={{ fontSize: 13, color: "var(--m)", textAlign: "center", padding: "8px 0" }}>Wähle oben ein Thema um loszulegen.</p>}
        </div>
      </div>
    </section>
  );
}

// === ZEITPLAN (Accordion) ===
function Zeitplan({ timeline, mottoColor, quietMode, setQuietMode, ageGroupLabel }) {
  return (
    <section className="fu" style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
        <h2 style={{ fontFamily: "var(--fd)", fontSize: 20, fontWeight: 800, margin: 0 }}>
          🎯 Zeitplan <span style={{ fontSize: 13, fontWeight: 500, color: "var(--m)" }}>({ageGroupLabel})</span>
        </h2>
        <button onClick={() => setQuietMode(!quietMode)} style={{
          padding: "6px 14px", borderRadius: 99, border: `2px solid ${quietMode ? "var(--g)" : "var(--l)"}`,
          background: quietMode ? "#E8F5E9" : "var(--bg)", color: quietMode ? "var(--g)" : "var(--m)",
          fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all .2s",
        }}>
          {quietMode ? "🧘 Ruhige Spiele aktiv" : "🌪️ Zu wild? Ruhige Spiele"}
        </button>
      </div>

      {quietMode && (
        <p style={{ fontSize: 13, color: "var(--g)", marginBottom: 12, padding: "8px 12px", background: "#E8F5E9", borderRadius: 10 }}>
          🧘 Ruhemodus: Alle Action-Spiele wurden durch ruhige Alternativen ersetzt. Kinder kommen runter, du behältst die Kontrolle.
        </p>
      )}

      <div style={{ paddingLeft: 20, position: "relative" }}>
        {timeline.map((e, n) => (
          <details key={n} open={n === 0} style={{ position: "relative", paddingLeft: 24, paddingBottom: 4, marginBottom: 8 }}>
            <summary style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "8px 0" }}>
              <div style={{
                position: "absolute", left: -3, top: 10, width: 16, height: 16, borderRadius: "50%",
                background: e.photo ? "#F57C00" : mottoColor, color: "#FFF",
                fontSize: 8, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>{e.photo ? "📸" : n + 1}</div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: e.photo ? "#F57C00" : mottoColor }}>{e.time}</span>
                <span style={{ fontSize: 14, fontWeight: 700, marginLeft: 8, color: "var(--d)" }}>{e.name}</span>
              </div>
              <span style={{ fontSize: 11, color: "var(--m)", whiteSpace: "nowrap", flexShrink: 0 }}>{e.dauer} Min.</span>
            </summary>

            <div style={{ padding: "4px 0 8px", borderLeft: `2px solid ${mottoColor}20`, marginLeft: 5, paddingLeft: 16 }}>
              <div style={{ fontSize: 13, color: "var(--m)", marginBottom: 6, lineHeight: 1.6 }}>{e.desc}</div>
              {e.photo && <div style={{ fontSize: 12, color: "#F57C00", fontWeight: 600, marginBottom: 6 }}>📸 Foto-Moment!</div>}

              {e.material && (
                <details style={{ marginTop: 4 }}>
                  <summary style={{ fontSize: 12, fontWeight: 700, color: "var(--a)", cursor: "pointer" }}>📦 Material-Liste</summary>
                  <div style={{ fontSize: 12, color: "var(--m)", marginTop: 4, padding: "8px 12px", background: "var(--bg)", borderRadius: 8, lineHeight: 1.6 }}>{e.material}</div>
                </details>
              )}

              {e.anleitung && (
                <details style={{ marginTop: 4 }}>
                  <summary style={{ fontSize: 12, fontWeight: 700, color: "var(--a)", cursor: "pointer" }}>📋 So geht's — Schritt für Schritt</summary>
                  <div style={{ fontSize: 12, color: "var(--m)", marginTop: 4, padding: "8px 12px", background: "var(--bg)", borderRadius: 8, lineHeight: 1.8 }}>{e.anleitung}</div>
                </details>
              )}

              {e.isKuchen && (
                <div style={{ marginTop: 8 }}>
                  {e.rezept && (
                    <details style={{ marginBottom: 6 }}>
                      <summary style={{ fontSize: 12, fontWeight: 700, color: "var(--a)", cursor: "pointer" }}>👩‍🍳 Rezept anzeigen</summary>
                      <div style={{ fontSize: 12, color: "var(--m)", marginTop: 4, padding: "8px 12px", background: "var(--bg)", borderRadius: 8, lineHeight: 1.6, border: "1px solid var(--l)" }}>{e.rezept}</div>
                    </details>
                  )}
                  {e.kuchenUrl && (
                    <a href={e.kuchenUrl} target="_blank" rel="noopener" style={{
                      display: "inline-block", fontSize: 12, fontWeight: 700, color: "#FF9900", textDecoration: "none",
                      padding: "6px 14px", borderRadius: 8, background: "#FFF3E0", marginBottom: 6,
                    }}>🛒 Backdeko bei Amazon →</a>
                  )}
                  <div style={{ padding: "10px 12px", background: "var(--bg)", borderRadius: 10, border: "1px solid var(--l)" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "var(--a)", marginBottom: 4 }}>⏱️ Keine Zeit zum Backen?</div>
                    <div style={{ fontSize: 12, color: "var(--m)", lineHeight: 1.5 }}>
                      1) Fertigkuchen + Zuckerguss + Streusel · 2) Backmischung-Muffins (30 Min.) · 3) Donut-Turm statt Torte — Wow-Effekt, null Aufwand
                    </div>
                  </div>
                </div>
              )}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

// === SCORE CHECK ===
function ScoreCheck({ score }) {
  if (!score) return null;
  const n = score.avg >= 80 ? "var(--g)" : score.avg >= 60 ? "var(--am)" : "#C62828";
  const h = score.avg >= 85 ? "Fast fertig — du bist bereit!"
    : score.avg >= 70 ? "Sieht gut aus — ein paar Kleinigkeiten fehlen noch."
    : score.avg >= 55 ? "Gute Basis — ein paar Dinge solltest du noch klären."
    : "Noch etwas Vorbereitung nötig.";

  return (
    <section className="fu" style={{ marginBottom: 24 }}>
      <div style={{ background: "var(--bg)", borderRadius: 20, padding: "24px 20px", border: "1px solid var(--l)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 16, flexWrap: "wrap" }}>
          <div style={{ position: "relative", width: 80, height: 80, flexShrink: 0 }}>
            <svg viewBox="0 0 36 36" style={{ width: 80, height: 80, transform: "rotate(-90deg)" }}>
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f0ede8" strokeWidth="3" />
              <circle cx="18" cy="18" r="15.9" fill="none" stroke={n} strokeWidth="3"
                strokeDasharray={`${score.avg} ${100 - score.avg}`} strokeLinecap="round" style={{ transition: "stroke-dasharray 0.8s ease" }} />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
              <span style={{ fontFamily: "var(--fd)", fontSize: 22, fontWeight: 900, color: n }}>{score.avg}</span>
              <span style={{ fontSize: 8, color: "var(--m)", fontWeight: 600 }}>von 100</span>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontFamily: "var(--fd)", fontSize: 18, fontWeight: 800, margin: "0 0 4px" }}>Bereitschafts-Check</h2>
            <p style={{ fontSize: 13, color: "var(--m)", lineHeight: 1.5, margin: 0 }}>{h}</p>
            {score.missing.length > 0 && (
              <p style={{ fontSize: 12, color: "var(--am)", marginTop: 4, fontWeight: 600 }}>Noch offen: {score.missing.join(", ")}</p>
            )}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
          {score.dims.map((dim, i) => (
            <div key={i} style={{ background: "var(--w)", borderRadius: 10, padding: "8px 10px", textAlign: "center", border: "1px solid var(--l)" }}>
              <div style={{ fontSize: 16, marginBottom: 2 }}>{dim.icon}</div>
              <div style={{ fontSize: 10, color: "var(--m)", marginBottom: 2 }}>{dim.label}</div>
              <div style={{ height: 4, borderRadius: 2, background: "#f0ede8", overflow: "hidden" }}>
                <div style={{
                  height: "100%", borderRadius: 2, width: dim.val + "%", transition: "width 0.6s ease",
                  background: dim.val >= 80 ? "var(--g)" : dim.val >= 60 ? "var(--am)" : "#C62828",
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// === MAIN APP ===
function App() {
  // State
  const [view, setView] = useState("config");
  const [age, setAge] = useState(() => loadState("age", 6));
  const [mottoId, setMottoId] = useState(() => loadState("mottoId", null));
  const [guests, setGuests] = useState(() => loadState("guests", 8));
  const [loc, setLoc] = useState(() => loadState("loc", "garten"));
  const [effort, setEffort] = useState(() => loadState("effort", "normal"));
  const [duration, setDuration] = useState(() => loadState("dauer", 3));
  const [mottoTab, setMottoTab] = useState("generic");
  const [quietMode, setQuietMode] = useState(false);
  const [owned, setOwned] = useState(() => loadState("owned", {}));
  const [shoppingMode, setShoppingMode] = useState(() => loadState("shoppingMode", "standard"));
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [locOverride, setLocOverride] = useState(null);
  const [emailSaved, setEmailSaved] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [inviteSent, setInviteSent] = useState(0);
  const [previewName, setPreviewName] = useState("");
  const [szActive, setSzActive] = useState(() => loadState("szActive", false)); // schnitzeljagd add-on toggle
  const [szThemeId, setSzThemeId] = useState(() => loadState("szThemeId", null));
  const [childName, setChildName] = useState(() => loadState("childName", ""));
  const [mapPositions, setMapPositions] = useState(null); // [{x, y}] for canvas map stations
  const [stationLocations, setStationLocations] = useState(() => loadState("stationLocations", {})); // {index: "Ort-Text"}
  const [dekoEmojis, setDekoEmojis] = useState(() => loadState("dekoEmojis", [])); // [{emoji, fx, fy}] fractional coords

  // Derived values
  const motto = ALL_MOTTOS.find((m) => m.id === mottoId);
  const ag = ageGroup(age);
  const isMinimal = shoppingMode === "minimal" || effort === "minimal";
  const isWow = shoppingMode === "wow";
  const effectiveLoc = locOverride || loc;
  const filteredLicense = LICENSE.filter((m) => !m.ages || m.ages.includes(age));
  const szTheme = SZ_THEMES.find((t) => t.id === szThemeId);

  // Persist state
  useEffect(() => saveState("age", age), [age]);
  useEffect(() => saveState("mottoId", mottoId), [mottoId]);
  useEffect(() => saveState("guests", guests), [guests]);
  useEffect(() => saveState("loc", loc), [loc]);
  useEffect(() => saveState("effort", effort), [effort]);
  useEffect(() => saveState("dauer", duration), [duration]);
  useEffect(() => saveState("owned", owned), [owned]);
  useEffect(() => saveState("shoppingMode", shoppingMode), [shoppingMode]);
  useEffect(() => saveState("szActive", szActive), [szActive]);
  useEffect(() => saveState("szThemeId", szThemeId), [szThemeId]);
  useEffect(() => { if (szActive && mottoId && SZ_THEMES.find(t => t.id === mottoId)) setSzThemeId(mottoId); }, [mottoId]);
  useEffect(() => saveState("childName", childName), [childName]);
  useEffect(() => saveState("stationLocations", stationLocations), [stationLocations]);
  useEffect(() => saveState("dekoEmojis", dekoEmojis), [dekoEmojis]);

  // Hide sticky CTA in plan view
  useEffect(() => {
    const el = document.getElementById("sticky-cta");
    if (el) el.style.display = (view === "plan" || view === "peak") ? "none" : "";
  }, [view]);

  // URL params
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const m = p.get("motto") || window.__selectedMotto;
    if (m && ALL_MOTTOS.find((x) => x.id === m)) setMottoId(m);
    const a = p.get("alter"); if (a) { const v = parseInt(a); if (v >= 3 && v <= 12) setAge(v); }
    const g = p.get("gaeste"); if (g) { const v = parseInt(g); if (v >= 1 && v <= 20) setGuests(v); }
    // Schnitzeljagd voraktivieren (Toggle wird im Plan automatisch offen sein)
    const modus = p.get("modus");
    const thema = p.get("thema");
    if (modus === "schatzsuche") {
      setSzActive(true);
      if (!thema) { const mid = p.get("motto") || loadState("mottoId", null); if (mid && SZ_THEMES.find(t => t.id === mid)) setSzThemeId(mid); }
    }
    if (thema && SZ_THEMES.find((t) => t.id === thema)) setSzThemeId(thema);
  }, []);

  // Confetti on motto select
  useEffect(() => {
    if (mottoId) { setShowConfetti(true); const t = setTimeout(() => setShowConfetti(false), 1200); return () => clearTimeout(t); }
  }, [mottoId]);

  // Track plan creation
  useEffect(() => {
    if (view === "plan" && window.plausible) plausible("plan-created", { props: { motto: mottoId, alter: age, gaeste: guests, szActive: szActive, thema: szThemeId } });
  }, [mottoId, view]);

  // === COMPUTED: Quiet mode games ===
  const quietGames = {
    klein: [
      { name: "Ausmalen & Stickern", desc: "Große Ausmalbilder zum Thema + Sticker-Bögen.", dauer: 15 },
      { name: "Suchbild-Runde", desc: "Wimmelbild zum Thema — wer findet alle versteckten Dinge?", dauer: 10 },
      { name: "Geschichte vorlesen", desc: "Eine kurze Geschichte zum Motto vorlesen. Kinder sitzen im Kreis.", dauer: 10 },
    ],
    mittel: [
      { name: "Rätsel-Runde", desc: "Knobel-Aufgaben, Suchbilder und Quiz-Fragen zum Thema.", dauer: 15 },
      { name: "Bastel-Station", desc: "Etwas zum Motto basteln: Masken, Karten, Figuren.", dauer: 20 },
      { name: "Memory oder Bingo", desc: "Motto-Memory oder Bingo-Runde.", dauer: 15 },
    ],
    gross: [
      { name: "Quiz-Duell", desc: "Wissensfragen zum Thema in Teams.", dauer: 15 },
      { name: "Kreativ-Challenge", desc: "Zeichne/baue etwas zum Motto in 10 Minuten.", dauer: 20 },
      { name: "Rätsel-Escape (leise)", desc: "Logik-Rätsel, Codes knacken, Geheimschrift — am Tisch.", dauer: 25 },
    ],
  };

  // === COMPUTED: Games for current motto ===
  function getGames() {
    if (!motto) return [];
    if (quietMode) return quietGames[ag] || quietGames.mittel;
    return motto.spiele?.[ag] || motto.spiele?.mittel || [];
  }

  // === COMPUTED: Cake ===
  function getCake() {
    if (!motto) return { name: "", desc: "", rezept: "", url: "" };
    const c = motto.kuchen?.[ag] || motto.kuchen?.mittel || "";
    return typeof c === "string" ? { name: c, desc: c, rezept: "", url: "" } : c;
  }

  // === COMPUTED: Timeline ===
  function buildTimeline() {
    const games = getGames();
    const numGames = duration <= 2 ? 2 : 3;
    const selectedGames = games.slice(0, numGames);
    const items = [];
    let elapsed = 0;
    const start = 840; // 14:00
    const fmt = (m) => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`;

    items.push({ time: fmt(start), name: "Ankommen & Freispiel", dauer: ag === "klein" ? 20 : 15, desc: ag === "klein" ? "Kinder kommen an, gewöhnen sich ein" : "Kinder kommen an, spielen frei" });
    elapsed += ag === "klein" ? 20 : 15;

    selectedGames.forEach((g, i) => {
      items.push({ time: fmt(start + elapsed), name: g.name, dauer: g.dauer, desc: g.desc, material: g.material || null, anleitung: g.anleitung || null });
      elapsed += g.dauer;
      if (i === 0) {
        const cake = getCake();
        items.push({
          time: fmt(start + elapsed), name: `🎂 ${cake.name || "Kuchen"} & Geschenke`,
          dauer: ag === "klein" ? 25 : 30, desc: cake.desc || "", rezept: cake.rezept || "",
          kuchenUrl: cake.url || "", photo: true, isKuchen: true,
        });
        elapsed += ag === "klein" ? 25 : 30;
      }
    });

    items.push({ time: fmt(start + elapsed), name: "📸 Gruppenfoto!", dauer: 5, desc: "Jetzt! Bevor die ersten abgeholt werden.", photo: true });
    elapsed += 5;
    items.push({ time: fmt(start + elapsed), name: "Mitgebsel & Tschüss!", dauer: 15, desc: "Mitgebsel-Tüten verteilen. Eltern holen ab." });
    return items;
  }

  // === COMPUTED: Deko + Mitgebsel ===
  function getDeko() {
    if (!motto) return { deko: [], mitgebsel: [], total: 0 };
    const deko = isMinimal ? (motto.dekoMin || []) : motto.deko;
    const mitgebsel = motto.mitgebsel || [];
    const wowExtras = isWow ? [
      { name: "Foto-Hintergrund " + motto.name, price: 14.99, eco: false, bbl: "buy", emoji: "📸", url: "https://www.amazon.de/s?k=" + encodeURIComponent(motto.name + " foto hintergrund party kinder") + "&tag=machsleicht-21" },
      { name: "LED-Lichterkette Deko", price: 9.99, eco: false, bbl: "buy", emoji: "✨", url: "https://www.amazon.de/s?k=led+lichterkette+party+deko+kinder&tag=machsleicht-21" },
    ] : [];
    const allDeko = [...deko, ...wowExtras];
    const total = [...allDeko, ...mitgebsel].reduce((sum, item, i) => sum + (owned[i] ? 0 : item.price), 0);
    return { deko: allDeko, mitgebsel, total };
  }

  // === COMPUTED: Snacks ===
  function getSnacks() {
    return [
      { name: "Muffins/Kuchen", menge: `${Math.ceil(guests * 1.5)} Stück`, emoji: "🧁" },
      { name: "Obst (geschnitten)", menge: `${Math.ceil(guests * 0.15)} kg`, emoji: "🍎" },
      { name: "Saft/Wasser", menge: `${Math.ceil(guests * 0.3 * duration)} Liter`, emoji: "🧃" },
      { name: "Salzige Snacks", menge: `${Math.ceil(guests / 4)} Tüten`, emoji: "🥨" },
      ...(duration >= 3 ? [{ name: "Belegte Brote/Würstchen", menge: `${Math.ceil(guests * 1.2)} Stück`, emoji: "🌭" }] : []),
    ];
  }

  // === COMPUTED: Readiness Score ===
  function calcScore() {
    if (!motto) return null;
    const { deko, mitgebsel, total } = getDeko();
    const allItems = [...deko, ...mitgebsel];
    const ownedCount = Object.values(owned).filter(Boolean).length;
    const ablauf = 100;
    const machbarkeit = duration <= 2 ? 95 : duration <= 3 ? 85 : 75;
    const material = allItems.length > 0 ? Math.min(100, Math.round((ownedCount / allItems.length) * 100) + 30) : 80;
    const wetterfest = effectiveLoc === "wohnung" ? 100 : effectiveLoc === "garten" ? 65 : 40;
    const budget = total < guests * 5 ? 100 : total < guests * 10 ? 75 : 50;
    const mottoErlebnis = isWow ? 95 : isMinimal ? 55 : 80;
    const inviteBonus = inviteSent >= guests ? 11 : inviteSent > 0 ? Math.round((inviteSent / guests) * 11) : 0;
    const avg = Math.min(100, Math.round((ablauf + machbarkeit + material + wetterfest + budget + mottoErlebnis) / 6) + inviteBonus);

    const missing = [];
    if (wetterfest < 70) missing.push("Regen-Alternative");
    if (material < 60) missing.push("Material einkaufen");
    if (budget < 60) missing.push("Budget prüfen");
    if (inviteSent === 0) missing.push("Einladungen verschicken");

    return {
      avg, missing,
      dims: [
        { label: "Ablauf", val: ablauf, icon: "📋" },
        { label: "Machbarkeit", val: machbarkeit, icon: "✅" },
        { label: "Material", val: material, icon: "📦" },
        { label: "Wetterfest", val: wetterfest, icon: "🌧️" },
        { label: "Budget", val: budget, icon: "💰" },
        { label: "Motto-Erlebnis", val: mottoErlebnis, icon: "🎯" },
        { label: "Einladung", val: inviteSent >= guests ? 100 : Math.round((inviteSent / guests) * 100), icon: "💌" },
      ],
    };
  }

  // === ACTIONS ===
  function reset() { setView("config"); setMottoId(null); setSzActive(false); setSzThemeId(null); setChildName(""); setMapPositions(null); setQuietMode(false); setOwned({}); setShoppingMode("standard"); setLocOverride(null); setEmergencyMode(false); }
  function startPlan() {
    if (mottoId) { setView("peak"); window.scrollTo(0, 0); setTimeout(() => { setView("plan"); window.scrollTo(0, 0); }, 2800); }
  }
  function emergencyStart() {
    setEmergencyMode(true);
    if (!mottoId) setMottoId("safari");
    setEffort("minimal"); setShoppingMode("minimal"); setDuration(2); setLocOverride("wohnung");
    setView("plan"); window.scrollTo(0, 0);
  }
  function toggleOwned(idx) { setOwned((prev) => ({ ...prev, [idx]: !prev[idx] })); }

  // === MOTTO DESCRIPTIONS ===
  const mottoDescs = {
    safari: "Dein Kind und seine Crew gehen auf Safari-Expedition: Tiere suchen, durch den Dschungel krabbeln und am Ende den Schatz finden!",
    piraten: "Ahoi! Die Crew sticht in See, knackt Codes und findet den vergrabenen Piratenschatz. Das wird legendär!",
    weltraum: "3, 2, 1 ... Start! Die Astronauten fliegen durchs All, entdecken Planeten und landen sicher auf dem Mond.",
    dino: "Achtung, Dinos! Ausgraben, forschen und am Ende jubeln — dein Kind wird zum echten Paläontologen.",
    einhorn: "Glitzer, Regenbogen und pure Magie — dein Kind und seine Freunde tauchen ein in eine zauberhafte Welt.",
    feuerwehr: "Tatütata! Die kleine Feuerwehr-Crew meistert jeden Einsatz. Teamwork, Action und strahlende Kinderaugen.",
    detektiv: "Lupe raus, Fingerabdrücke nehmen, Verdächtige verhören — die kleinen Detektive lösen jeden Fall!",
    dschungel: "Tarzan-Schwung, Tierspuren-Lesen, Brückenbau — eine Expedition durch den wilden Dschungel.",
    feen: "Feenstaub, Zaubertrank, Regenbogen-Magie — die kleinen Feen erleben ein zauberhaftes Abenteuer.",
  };

  // =============================================
  // PEAK VIEW (transition animation)
  // =============================================
  if (view === "peak" && motto) return (
    <div style={{ maxWidth: 660, margin: "0 auto", padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "80vh" }}>
      <div className="sp" style={{ textAlign: "center", padding: "40px 20px" }}>
        <div style={{ fontSize: 72, marginBottom: 16, animation: "scalePop .6s ease both" }}>{motto.emoji}</div>
        <h1 style={{ fontFamily: "var(--fd)", fontSize: "clamp(24px,5vw,32px)", fontWeight: 900, marginBottom: 12, color: "var(--d)" }}>
          Deine <span style={{ color: motto.color }}>{motto.name}</span>-Party!
        </h1>
        <p style={{ fontSize: 16, color: "var(--m)", lineHeight: 1.6, maxWidth: 400, margin: "0 auto 24px" }}>
          {mottoDescs[mottoId] || "Das wird ein unvergesslicher Tag!"}
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap", marginBottom: 24 }}>
          <div style={{ background: "var(--bg)", borderRadius: 12, padding: "12px 16px", border: "1px solid var(--l)" }}>
            <div style={{ fontSize: 11, color: "var(--m)" }}>{guests} Kinder</div>
            <div style={{ fontFamily: "var(--fd)", fontSize: 18, fontWeight: 800, color: "var(--a)" }}>{duration} Std. Spaß</div>
          </div>
          <div style={{ background: "var(--bg)", borderRadius: 12, padding: "12px 16px", border: "1px solid var(--l)" }}>
            <div style={{ fontSize: 11, color: "var(--m)" }}>Altersgerechte Spiele</div>
            <div style={{ fontFamily: "var(--fd)", fontSize: 18, fontWeight: 800, color: "var(--a)" }}>{ageLabel[ag]}</div>
          </div>
        </div>
        <div style={{ fontSize: 13, color: "var(--m)", animation: "pulse 1.5s ease infinite" }}>Plan wird erstellt...</div>
        <button onClick={() => { setView("plan"); window.scrollTo(0, 0); }} style={{ marginTop: 16, background: "none", border: "none", fontSize: 12, color: "var(--m)", cursor: "pointer", textDecoration: "underline" }}>
          Direkt zum Plan →
        </button>
      </div>
    </div>
  );

  // =============================================
  // GEBURTSTAG PLAN VIEW
  // =============================================
  if (view === "plan" && motto) {
    const timeline = buildTimeline();
    const { deko, mitgebsel, total } = getDeko();
    const costPerKid = guests > 0 ? (total / guests).toFixed(2) : "0";
    const score = calcScore();
    const snacks = getSnacks();
    const shareText = `Hey! Unser Kind feiert ${motto.name}-Geburtstag. Hier ist der komplette Plan mit Spielen und Einkaufsliste:\nhttps://machsleicht.de`;
    const locLabel = effectiveLoc === "wohnung" ? "Drinnen" : effectiveLoc === "garten" ? "Garten" : "Park";

    return (
      <div style={{ maxWidth: 660, margin: "0 auto", padding: "0 16px 80px" }}>
        {/* Header */}
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0 18px", position: "sticky", top: 0, background: "var(--w)", zIndex: 10, borderBottom: "1px solid var(--l)" }}>
          <a href="/" style={{ textDecoration: "none" }}>
            <span style={{ fontFamily: "var(--fd)", fontSize: 22, fontWeight: 900, color: "var(--d)" }}>mach's</span>
            <span style={{ fontFamily: "var(--fd)", fontSize: 22, fontWeight: 900, color: "var(--a)" }}>leicht</span>
          </a>
          <button onClick={reset} style={{ background: "none", border: "1px solid var(--l)", borderRadius: "var(--rs)", padding: "6px 14px", fontSize: 12, color: "var(--m)", cursor: "pointer" }}>← Neu</button>
        </header>

        {/* Motto Badge */}
        <section className="fu" style={{ textAlign: "center", padding: "20px 0 16px" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>{motto.emoji}</div>
          <h1 style={{ fontFamily: "var(--fd)", fontSize: 26, fontWeight: 900, marginBottom: 4 }}>{motto.name}</h1>
          <p style={{ fontSize: 14, color: "var(--m)" }}>
            {guests} Kinder · {age} Jahre · {duration} Std. · {locLabel}
            {isMinimal && <span style={{ color: "var(--g)", fontWeight: 600 }}> · 🌿 Minimal</span>}
            {isWow && <span style={{ color: "#7B1FA2", fontWeight: 600 }}> · ✨ Wow</span>}
            {emergencyMode && <span style={{ color: "#C62828", fontWeight: 600 }}> · 🚨 Morgen-Modus</span>}
          </p>
          {motto.cat === "license" && (
            <p style={{ fontSize: 12, color: "var(--a)", marginTop: 4 }}>Spiele passen zum Thema — Deko & Mitgebsel sind original {motto.name} Produkte.</p>
          )}
        </section>

        {/* ══════ PLAN ══════ */}

        {/* Mode Toggles — oben, weil sie alles darunter ändern */}
        <section className="fu" style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: 4, background: "var(--bg)", borderRadius: 12, padding: 4, border: "1px solid var(--l)" }}>
              {[["minimal", "🌿", "Minimal"], ["standard", "🎯", "Standard"], ["wow", "✨", "Wow"]].map(([val, ico, label]) => (
                <button key={val} onClick={() => { setShoppingMode(val); setOwned({}); }} style={{
                  padding: "8px 14px", borderRadius: 10, border: "none",
                  background: shoppingMode === val ? (val === "minimal" ? "#E8F5E9" : val === "wow" ? "#EDE7F6" : "var(--al)") : "transparent",
                  color: shoppingMode === val ? (val === "minimal" ? "var(--g)" : val === "wow" ? "#7B1FA2" : "var(--a)") : "var(--m)",
                  fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all .2s", whiteSpace: "nowrap",
                }}>{ico} {label}</button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 4, background: "var(--bg)", borderRadius: 12, padding: 4, border: "1px solid var(--l)" }}>
              {[["wohnung", "🏠", "Drinnen"], ["garten", "🌳", "Garten"], ["park", "🏞️", "Park"]].map(([val, ico, label]) => (
                <button key={val} onClick={() => setLocOverride(val)} style={{
                  padding: "8px 12px", borderRadius: 10, border: "none",
                  background: effectiveLoc === val ? "#E3F2FD" : "transparent",
                  color: effectiveLoc === val ? "#1565C0" : "var(--m)",
                  fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all .2s", whiteSpace: "nowrap",
                }}>{ico} {label}</button>
              ))}
            </div>
          </div>
        </section>

        {/* Zeitplan — DAS Kernversprechen, sofort sichtbar */}
        <Zeitplan timeline={timeline} mottoColor={motto.color} quietMode={quietMode} setQuietMode={setQuietMode} ageGroupLabel={ageLabel[ag]} />

        {/* Schatzsuche — optionaler Add-on direkt neben dem Zeitplan */}
        <SchnitzeljagdBlock age={age} ag={ag} mottoId={mottoId} szActive={szActive} setSzActive={setSzActive} szThemeId={szThemeId} setSzThemeId={setSzThemeId} szTheme={szTheme} childName={childName} setChildName={setChildName} mapPositions={mapPositions} setMapPositions={setMapPositions} stationLocations={stationLocations} setStationLocations={setStationLocations} dekoEmojis={dekoEmojis} setDekoEmojis={setDekoEmojis} />

        {/* Snacks */}
        <section className="fu" style={{ marginBottom: 24 }}>
          <h2 style={{ fontFamily: "var(--fd)", fontSize: 20, fontWeight: 800, marginBottom: 12 }}>
            🍿 Was du wirklich an Essen brauchst <span style={{ fontSize: 13, fontWeight: 500, color: "var(--m)" }}>(für {guests} Kinder, {duration} Std.)</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 8 }}>
            {snacks.map((s, i) => (
              <div key={i} style={{ background: "var(--bg)", borderRadius: "var(--rs)", padding: "10px 12px", border: "1px solid var(--l)", textAlign: "center" }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>{s.emoji}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--d)" }}>{s.name}</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "var(--a)", marginTop: 2 }}>{s.menge}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Deko */}
        <section className="fu" style={{ marginBottom: 24 }}>
          <h2 style={{ fontFamily: "var(--fd)", fontSize: 20, fontWeight: 800, marginBottom: 4 }}>
            🎨 Deko, die man wirklich sieht {motto.cat === "license" && `(${motto.name})`}
          </h2>
          {isMinimal && <p style={{ fontSize: 13, color: "var(--g)", marginBottom: 10, fontWeight: 600 }}>🌿 Minimal-Modus: Das reicht völlig.</p>}
          <p style={{ fontSize: 11, color: "var(--m)", marginBottom: 8 }}>✓ Checkbox = "Hab ich schon" — wird aus Kosten rausgerechnet</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {deko.map((item, i) => <ItemRow key={i} item={item} isOwned={owned[i]} onToggle={() => toggleOwned(i)} />)}
          </div>
        </section>

        {/* Mitgebsel */}
        <section className="fu" style={{ marginBottom: 24 }}>
          <h2 style={{ fontFamily: "var(--fd)", fontSize: 20, fontWeight: 800, marginBottom: 12 }}>🎁 Kleine Mitgebsel, kein unnötiger Kram</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {mitgebsel.map((item, i) => <ItemRow key={"m" + i} item={item} isOwned={owned[deko.length + i]} onToggle={() => toggleOwned(deko.length + i)} />)}
          </div>
        </section>

        {/* Das reicht + Kosten */}
        <div className="sp" style={{ background: "linear-gradient(135deg,#1B5E20,#2E7D32,#388E3C)", borderRadius: 24, padding: "48px 24px 40px", textAlign: "center", position: "relative", overflow: "hidden", marginBottom: 24 }}>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: 64, marginBottom: 12, animation: "checkPop .6s ease .3s both" }}>✓</div>
            <h2 style={{ fontFamily: "var(--fd)", fontSize: "clamp(26px,5vw,34px)", fontWeight: 900, color: "#FFF", marginBottom: 8, lineHeight: 1.1 }}>Das reicht. Wirklich.</h2>
            <p style={{ fontSize: 16, color: "#C8E6C9", marginBottom: 24, lineHeight: 1.7, maxWidth: 420, margin: "0 auto 24px" }}>
              Du musst jetzt nichts mehr optimieren. Dieser Plan funktioniert.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap", marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 11, color: "#A5D6A7", textTransform: "uppercase", letterSpacing: "0.08em" }}>Noch einkaufen</div>
                <div style={{ fontFamily: "var(--fd)", fontSize: 28, fontWeight: 800, color: "#FFF" }}>ca. €{Math.round(total)}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#A5D6A7", textTransform: "uppercase", letterSpacing: "0.08em" }}>Pro Kind</div>
                <div style={{ fontFamily: "var(--fd)", fontSize: 28, fontWeight: 800, color: "#F7C948" }}>ca. €{guests > 0 ? Math.round(total / guests) : "0"}</div>
              </div>
            </div>
            <div style={{ fontSize: 11, color: "#A5D6A7" }}>Richtwerte — tatsächliche Preise variieren</div>
          </div>
        </div>

        {/* ══════ EINLADEN & TEILEN ══════ */}

        <section className="fu" style={{ marginBottom: 16, textAlign: "center", padding: "4px 0" }}>
          <p style={{ fontSize: 15, fontFamily: "var(--fd)", fontWeight: 800, color: "var(--d)" }}>Plan steht — jetzt einladen & teilen</p>
        </section>

        {/* Einladung */}
        <EinladungBlock motto={motto} guests={guests} previewName={previewName} setPreviewName={setPreviewName} inviteSent={inviteSent} setInviteSent={setInviteSent} />

        {/* WhatsApp-Partyseite CTA */}
        <section className="fu" style={{ marginBottom: 24, borderRadius: 20, border: "2px solid #25D36630", background: "linear-gradient(135deg, #f0fdf4 0%, #fff 100%)", padding: "18px 16px", textAlign: "center" }}>
          <div style={{ fontSize: 28, marginBottom: 4 }}>📱</div>
          <h3 style={{ fontFamily: "var(--fd)", fontSize: 16, marginBottom: 4, color: "var(--m)" }}>WhatsApp-Partyseite</h3>
          <p style={{ fontSize: 13, color: "var(--m)", marginBottom: 10, lineHeight: 1.4 }}>Zusagen, Wunschliste, Abholzeit — alles auf einer Seite. Link in die Familiengruppe, fertig.</p>
          <a href={`https://party.machsleicht.de?${new URLSearchParams({...(childName?{childName}:{}), ...(age?{age}:{}), ...(motto?.name?{motto:motto.name}:{}), ...(motto?.emoji?{mottoEmoji:motto.emoji}:{})}).toString()}`} target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "12px 24px", background: "#25D366", color: "#fff", borderRadius: 16, fontSize: 14, fontWeight: 700, fontFamily: "var(--f)", textDecoration: "none", boxShadow: "0 2px 8px #25D36640" }}>📱 Partyseite erstellen →</a>
          <p style={{ fontSize: 11, color: "var(--m)", marginTop: 8, opacity: 0.7 }}>Kostenlos · Daten werden vorausgefüllt</p>
        </section>

        {/* Plan speichern & teilen */}
        <button onClick={() => {
          navigator.share ? navigator.share({ title: `${motto.name} Geburtstag`, text: shareText, url: "https://machsleicht.de" })
            : (navigator.clipboard?.writeText(shareText), alert("Kopiert! Einfach in WhatsApp einfügen."));
        }} style={{
          width: "100%", padding: 14, background: "#25D366", color: "#FFF", border: "none", borderRadius: "var(--r)",
          fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8,
        }}>📱 Plan an Helfer schicken</button>

        {/* PDF Export */}
        <section className="fu" style={{ marginBottom: 24 }} data-action="pdf">
          <div style={{ background: "linear-gradient(135deg,#EDE7F6,#F3E5F5)", borderRadius: 20, padding: "24px 20px", border: "1px solid #CE93D8", textAlign: "center" }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>📄</div>
            <h2 style={{ fontFamily: "var(--fd)", fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Plan als PDF speichern</h2>
            <p style={{ fontSize: 13, color: "var(--m)", marginBottom: 16 }}>Zeitplan, Einkaufsliste, Snack-Mengen — alles auf einem Blatt.</p>
            <button onClick={() => window.print()} style={{
              padding: "14px 32px", background: "linear-gradient(135deg,#7B1FA2,#9C27B0)", color: "#FFF", border: "none",
              borderRadius: "var(--r)", fontWeight: 700, fontSize: 14, cursor: "pointer",
            }}>📄 PDF erstellen & drucken</button>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ textAlign: "center", marginTop: 32, padding: "16px 0", borderTop: "1px solid var(--l)" }}>
          <p style={{ fontSize: 12, color: "var(--m)" }}>
            © 2026 machsleicht.de · <a href="/impressum" style={{ color: "var(--m)", textDecoration: "none" }}>Impressum</a> · <a href="/datenschutz" style={{ color: "var(--m)", textDecoration: "none" }}>Datenschutz</a> · <a href="/transparenz" style={{ color: "var(--m)", textDecoration: "none" }}>Transparenz</a>
          </p>
        </footer>

        <ControlHub mottoId={mottoId} szActive={szActive} setSzActive={setSzActive} setSzThemeId={setSzThemeId} childName={childName} age={age} motto={motto} />
      </div>
    );
  }

  // =============================================
  // CONFIG VIEW (Wizard)
  // =============================================
  return (
    <>
      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(253,252,249,0.85)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: "1px solid rgba(0,0,0,0.05)", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: 4 }}>
          <span style={{ fontFamily: "var(--fd)", fontWeight: 800, fontSize: 20, color: "var(--a)" }}>mach's</span>
          <span style={{ fontFamily: "var(--fd)", fontWeight: 800, fontSize: 20, color: "var(--d)" }}>leicht</span>
        </a>
        <a href="/schatzsuche" style={{ fontSize: 13, fontWeight: 500, color: "var(--m)", textDecoration: "none" }}>🗺️ Schnitzeljagd</a>
      </nav>

      {/* Hero */}
      <section style={{ position: "relative", overflow: "hidden", padding: "48px 24px 32px", background: "linear-gradient(165deg, #fef8f0 0%, #fdfcf9 40%, #f0f4e8 100%)" }}>
        <div style={{ maxWidth: 660, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#fff", border: "1px solid var(--l)", borderRadius: 100, padding: "6px 16px", fontSize: 12, fontWeight: 500, color: "#888", marginBottom: 20, animation: "fadeSlideUp 0.4s ease-out both" }}>
            🎉 Kindergeburtstag planen — kostenlos, ohne Anmeldung
          </div>

          <h1 style={{ fontFamily: "var(--fd)", fontSize: "clamp(28px,5.5vw,48px)", fontWeight: 800, lineHeight: 1.12, marginBottom: 14, color: "var(--d)", animation: "fadeSlideUp 0.5s 0.1s ease-out both" }}>
            Kindergeburtstag planen<br /><span style={{ color: "var(--a)" }}>in 10 Minuten.</span>
          </h1>
          <p style={{ fontSize: "clamp(14px,2vw,17px)", color: "var(--m)", lineHeight: 1.6, maxWidth: 500, margin: "0 auto 24px", animation: "fadeSlideUp 0.5s 0.2s ease-out both" }}>
            Wähl Alter, Motto und Gästezahl — du bekommst sofort einen kompletten Plan mit Spielen, Einkaufsliste und Kosten pro Kind.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", animation: "fadeSlideUp 0.5s 0.3s ease-out both" }}>
            {[["⏱️", "Zeitplan"], ["🎯", "Altersgerechte Spiele"], ["🛒", "Einkaufsliste"], ["🗺️", "+ Schnitzeljagd"]].map(([ico, label]) => (
              <span key={label} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "6px 12px", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)", borderRadius: 100, fontSize: 12, fontWeight: 500, color: "#4a4a4a", border: "1px solid rgba(0,0,0,0.06)" }}>
                <span style={{ fontSize: 14 }}>{ico}</span>{label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Mode Banner */}
      {emergencyMode && (
        <div style={{ maxWidth: 700, margin: "16px auto", padding: "0 16px" }}>
          <div style={{ background: "linear-gradient(135deg,#FFEBEE,#FFF3E0)", borderRadius: 20, padding: 24, border: "2px solid #EF5350", textAlign: "center" }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>🚨</div>
            <h2 style={{ fontFamily: "var(--fd)", fontSize: 22, fontWeight: 900, color: "#C62828", marginBottom: 8 }}>Morgen-Modus aktiv</h2>
            <p style={{ fontSize: 14, color: "var(--m)", lineHeight: 1.6, marginBottom: 16 }}>
              Schnellster Plan der funktioniert. Drinnen, minimal, 2 Stunden.
            </p>
            <button onClick={() => setEmergencyMode(false)} style={{ background: "none", border: "none", fontSize: 12, color: "var(--m)", cursor: "pointer", textDecoration: "underline" }}>
              Morgen-Modus deaktivieren
            </button>
          </div>
        </div>
      )}

      {/* Wizard */}
      <div id="wizard" style={{ maxWidth: 700, margin: "-16px auto 0", padding: "0 16px", position: "relative", zIndex: 10 }}>
        <div style={{ background: "#fff", borderRadius: 24, padding: "32px 28px 28px", boxShadow: "0 8px 40px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.04)" }}>

          {/* Step 1: Age */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#bbb", marginBottom: 10 }}>
              <span style={{ color: "var(--a)", marginRight: 6 }}>①</span> Wie alt wird dein Kind?
              <span style={{ fontFamily: "var(--fd)", fontSize: 18, fontWeight: 800, color: "var(--a)", marginLeft: 8 }}>{age} Jahre</span>
              <span style={{ fontSize: 11, color: "var(--m)", fontWeight: 500, marginLeft: 6 }}>({ageLabel[ag]})</span>
            </div>
            <input type="range" min={3} max={12} value={age} onChange={(e) => { setAge(+e.target.value); setMottoId(null); }} />
            <p style={{ fontSize: 12, color: "var(--m)", marginTop: 6 }}>
              {age <= 5 ? "Einfache Suchspiele, Stopptanz, kurze Stationen" : age <= 8 ? "Schatzsuchen, Rallyes, Quiz, Basteln" : "Escape-Rooms, Codes knacken, Team-Olympiaden"}
            </p>
          </div>

          {/* Step 2: Motto */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#bbb" }}>
                <span style={{ color: "var(--a)", marginRight: 6 }}>②</span> Motto wählen
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                {[["generic", "🎨 Klassisch"], ["license", "⭐ Charaktere"]].map(([val, label]) => (
                  <button key={val} onClick={() => { setMottoTab(val); setMottoId(null); }} style={{
                    padding: "4px 10px", fontSize: 11, fontWeight: 600, border: "none", borderRadius: 100,
                    background: mottoTab === val ? "var(--a)" : "#f0ede8", color: mottoTab === val ? "#fff" : "#999", cursor: "pointer",
                  }}>{label}</button>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))", gap: 6 }}>
              {(mottoTab === "generic" ? GENERIC : filteredLicense).map((m) => (
                <button key={m.id} onClick={() => { setMottoId(m.id); window.plausible && plausible("motto-selected", { props: { motto: m.id } }); }} style={{
                  position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                  padding: "12px 6px 10px", background: mottoId === m.id ? m.color + "12" : "#fff",
                  border: `2px solid ${mottoId === m.id ? m.color : "#eee"}`, borderRadius: 12, cursor: "pointer",
                  transition: "all 0.2s",
                }}>
                  <span style={{ fontSize: 24 }}>{m.emoji}</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: mottoId === m.id ? m.color : "#666" }}>{m.name}</span>
                  {m.cat === "license" && <span style={{ fontSize: 9, color: mottoId === m.id ? m.color : "#999", background: mottoId === m.id ? m.color + "15" : "#f5f5f5", padding: "1px 6px", borderRadius: 100 }}>{m.ages[0]}–{m.ages[m.ages.length - 1]} J.</span>}
                  {mottoId === m.id && <span style={{ position: "absolute", top: -5, right: -5, width: 18, height: 18, borderRadius: "50%", background: m.color, color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 2px 8px ${m.color}50` }}>✓</span>}
                </button>
              ))}
              {mottoTab === "license" && filteredLicense.length === 0 && (
                <div style={{ padding: 16, color: "var(--m)", fontSize: 13 }}>Für {age} Jahre keine Lizenz-Mottos verfügbar.</div>
              )}
            </div>
          </div>

          {/* Step 3: Guests */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#bbb", marginBottom: 10 }}>
              <span style={{ color: "var(--a)", marginRight: 6 }}>③</span> Gästezahl
              {guests && <span style={{ fontFamily: "var(--fd)", fontSize: 18, fontWeight: 800, color: "var(--a)", marginLeft: 8 }}>{guests} Kinder</span>}
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {[4, 5, 6, 7, 8, 10, 12, 15].map((n) => (
                <button key={n} onClick={() => setGuests(n)} style={{
                  width: 48, height: 48, border: `2px solid ${guests === n ? "var(--a)" : "#f0ede8"}`, borderRadius: 14,
                  background: guests === n ? "var(--al)" : "#fafaf8", cursor: "pointer", fontWeight: 700, fontSize: 16,
                  color: guests === n ? "var(--a)" : "#666", transition: "all 0.2s",
                }}>{n}</button>
              ))}
            </div>
            {age <= 5 && guests > 8 && <p style={{ fontSize: 12, color: "var(--a)", marginTop: 6, fontWeight: 600 }}>💡 Für {age}-Jährige sind 5–8 Kinder ideal.</p>}
          </div>

          {/* Start Button */}
          <div style={{ position: "relative" }}>
            <Confetti active={showConfetti} />
            <button onClick={startPlan} disabled={!mottoId} style={{
              width: "100%", padding: "16px 24px",
              background: mottoId ? "linear-gradient(135deg,var(--a),#d35f1a)" : "#e8e6e1",
              color: mottoId ? "#FFF" : "#bbb", border: "none", borderRadius: 16, fontSize: 16, fontWeight: 700,
              cursor: mottoId ? "pointer" : "default", boxShadow: mottoId ? "0 4px 20px rgba(224,122,58,0.35)" : "none",
              animation: mottoId ? "softPulse 2s infinite" : "none", transition: "all 0.3s",
            }}>
              {mottoId ? `${motto.emoji} ${motto.name}-Geburtstag planen — los geht's!` : "Wähl Alter, Motto & Gästezahl"}
            </button>
            {mottoId && <p style={{ textAlign: "center", fontSize: 12, color: "#bbb", marginTop: 8 }}>Kostenlos · Ohne Anmeldung · Sofort loslegen</p>}
          </div>

          <button onClick={emergencyStart} style={{
            width: "100%", marginTop: 12, padding: 10, background: "none", color: "#C62828",
            border: "1px solid #C6282840", borderRadius: 12, fontWeight: 600, fontSize: 13, cursor: "pointer",
          }}>🚨 Notfallplan in 2 Minuten — Geburtstag in 48h?</button>
        </div>
      </div>

      {/* Features */}
      <section style={{ maxWidth: 700, margin: "40px auto 0", padding: "0 16px" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--a)", background: "var(--al)", padding: "4px 14px", borderRadius: 100, marginBottom: 12 }}>Alles drin</span>
          <h2 style={{ fontFamily: "var(--fd)", fontSize: 24, fontWeight: 800, margin: "0 0 8px" }}>Was du bekommst</h2>
          <p style={{ fontSize: 14, color: "var(--m)" }}>Ein Plan, der reicht. Wirklich.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: 12 }}>
          {[
            ["📋", "Kompletter Zeitplan", "Von Ankommen bis Tschüss — mit Uhrzeiten und Puffer."],
            ["🎮", "2–3 Spiele mit Anleitung", "Altersgerecht, material-arm, in 5 Sätzen erklärt."],
            ["🛒", "Einkaufsliste + Preise", "Kaufen, leihen oder selbst machen. Mit Hab-ich-schon Checkbox."],
            ["🧮", "Kosten pro Kind", "Sofort sichtbar. Im Minimal-Modus unter 5€ pro Kind."],
            ["🍕", "Snack-Mengen", "8 Kinder, 3h → 12 Muffins, 1.2kg Obst, 7L Saft."],
            ["😴", "Ruhemodus", "Kinder zu wild? Ein Klick tauscht Action gegen ruhige Spiele."],
          ].map(([ico, title, desc], i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 20, padding: "24px 20px", border: "1px solid #f0ede8", animation: `fadeSlideUp 0.5s ${i * 0.05}s ease-out both` }}>
              <span style={{ fontSize: 24, display: "block", marginBottom: 6 }}>{ico}</span>
              <span style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: 15, color: "var(--d)", display: "block", marginBottom: 4 }}>{title}</span>
              <span style={{ fontSize: 13, color: "var(--m)", lineHeight: 1.5 }}>{desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Ratgeber */}
      {/* Footer */}
      <footer style={{ maxWidth: 700, margin: "40px auto 0", padding: "16px 16px", textAlign: "center", borderTop: "1px solid var(--l)" }}>
        <p style={{ fontSize: 12, color: "var(--m)" }}>
          © 2026 machsleicht.de · <a href="/schatzsuche" style={{ color: "var(--m)", textDecoration: "none" }}>Schatzsuche</a> · <a href="/ratgeber" style={{ color: "var(--m)", textDecoration: "none" }}>Ratgeber</a> · <a href="/impressum" style={{ color: "var(--m)", textDecoration: "none" }}>Impressum</a> · <a href="/datenschutz" style={{ color: "var(--m)", textDecoration: "none" }}>Datenschutz</a> · <a href="/transparenz" style={{ color: "var(--m)", textDecoration: "none" }}>Transparenz</a>
        </p>
      </footer>
    </>
  );
}

// === MOUNT ===
ReactDOM.createRoot(document.getElementById("root")).render(<App />);

// Hide SEO content when React mounts
var seo = document.getElementById("seo-content");
if (seo) seo.style.display = "none";
if (location.hash === "#planer") document.getElementById("planer")?.scrollIntoView({ behavior: "smooth" });
