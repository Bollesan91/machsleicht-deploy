/* ============================================================
   Drehbuch RITTER — „Der Ritt zur Burg" (STORY-ritter.md)
   0–3 Dorf · 3–6 Aufbruch · 6–9,5 Wald, Fiete, Holzbruecke · 9,5–14 Funkel versperrt den Weg,
   Feuer, Schild, „Party?!" · 14–16,5 Flug ueber die Berge · 16,5–17,8 Burg, Zugbruecke ·
   17,8–19,2 Empfang, Turmbanner mit Alterszahl · 19,2–21,9 Fanfare, Konfetti, Nieser + Kappe ·
   20,5–24 Pergament-Urkunde
   ============================================================ */
const P_DUR=24, P_N=P_DUR*FPS;
const HORIZON=1150, ROAD_Y=1330;
const R0=rng(23);
const SHAKE=Array.from({length:P_N+1},()=>[(R0()-.5)*2,(R0()-.5)*2]);
const CONF=Array.from({length:110},()=>({src:Math.floor(R0()*2),a:-Math.PI/2+(R0()-.5)*1.6,v:500+R0()*600,w:14+R0()*14,h:9+R0()*9,rot:R0()*6.28,spin:(R0()-.5)*9,c:['#E4C567','#8C2F26','#1B3A5C','#F3E7C9','#FFFFFF','#FF6F91','#7CE0C3'][Math.floor(R0()*7)]}));
const FLOWERS=Array.from({length:40},()=>({x:R0()*3000,y:1440+R0()*440,c:['#FF6F91','#FFD54F','#FFFFFF','#CE93D8'][Math.floor(R0()*4)],r:5+R0()*5}));
const TREES=Array.from({length:14},(_,k)=>({x:k*260+R0()*120,h:90+R0()*70,w:60+R0()*40,dark:R0()<0.5}));
const IDA_URI='/*__IDA__*/';

/* ---------- Welt ---------- */
function speed(t){ if(t<3) return 0; if(t<4) return 700*easeIn(seg(t,3,4)); if(t<10.4) return 700; if(t<10.8) return 700*(1-easeOut(seg(t,10.4,10.8))); if(t<13.8) return 0; if(t<14.6) return 950*easeIn(seg(t,13.8,14.6)); if(t<16.5) return 950; if(t<17.8) return 950*(1-easeOut(seg(t,16.5,17.8))); return 0; }
const SCX=[0], GAL=[0]; for(let i=1;i<=P_N;i++){ const v=speed((i-.5)/FPS); SCX[i]=SCX[i-1]+v/FPS; GAL[i]=GAL[i-1]+(v/280)/FPS; } const SCX_END=SCX[P_N];
const BR_WX=540+SCX[F(8.4)];                  /* Holzbruecke: der Reiter kreuzt sie bei 8,4 s */
function riderX(t){ return lerp(540,270,easeInOut(seg(t,16.6,17.8))); }
function flying(t){ return t>=13.8&&t<17.4; }
function riderY(t,i){ let y=ROAD_Y; if(t<13.8){ const gal=speed(t)>150; y-=gal?16*Math.abs(Math.sin(GAL[i]*Math.PI*2)):3*Math.sin(t*2); }
  else if(t<14.8) y=lerp(ROAD_Y,980,easeInOut(seg(t,13.8,14.8))); else if(t<16.4) y=980+14*Math.sin(t*2.4); else if(t<17.4) y=lerp(980,ROAD_Y,easeInOut(seg(t,16.4,17.4))); else if(t<17.7) y=ROAD_Y-10*Math.sin(seg(t,17.4,17.7)*Math.PI);
  return y; }
function riderMatrix(t,i){ return {x:riderX(t), y:riderY(t,i), r:flying(t)?0.08*Math.min(seg(t,13.8,14.6),1-seg(t,16.6,17.4)):0, s:1}; }
function riderPoint(lx,ly,t,i){ const m=riderMatrix(t,i); const c=Math.cos(m.r), s=Math.sin(m.r); return {x:m.x+(lx*c-ly*s)*m.s, y:m.y+(lx*s+ly*c)*m.s}; }

/* ---------- Himmel, Land ---------- */
const SKY=[[0,'#5F8FC8','#FBE7B2'],[6,'#4F93D6','#CFEAF7'],[9.5,'#4F93D6','#CFEAF7'],[11.5,'#3B5F8A','#9AAFC4'],[13.6,'#4F93D6','#CFEAF7'],[14.8,'#5B3A7E','#F58B4C'],[17.5,'#3B2D62','#F0A868'],[24,'#2B2350','#E9A26B']];
const HILL1=[[0,'#7DBA6E'],[9.5,'#7DBA6E'],[11.5,'#4F7A5A'],[13.6,'#7DBA6E'],[14.8,'#B07A6A'],[17.5,'#6E5B7A'],[24,'#4C4470']];
const HILL2=[[0,'#5E9E58'],[9.5,'#5E9E58'],[11.5,'#3E6448'],[13.6,'#5E9E58'],[14.8,'#8A5C58'],[17.5,'#4F3F6A'],[24,'#3A3560']];
const MEAD1=[[0,'#6FAF5C'],[9.5,'#6FAF5C'],[11.5,'#47784A'],[13.6,'#6FAF5C'],[14.8,'#8E7A50'],[17.5,'#5A4E6E'],[24,'#3E3A5E']];
const MEAD2=[[0,'#4E9A4A'],[9.5,'#4E9A4A'],[11.5,'#33623B'],[13.6,'#4E9A4A'],[14.8,'#6E5C44'],[17.5,'#443B5E'],[24,'#302C50']];
function keyed(list,t,idx){ let a=list[0], b=list[list.length-1]; for(let k=0;k<list.length-1;k++){ if(t>=list[k][0]&&t<=list[k+1][0]){ a=list[k]; b=list[k+1]; break; } } return mixHex(a[idx],b[idx],seg(t,a[0],b[0])); }
function sky(t){ const g=ctx.createLinearGradient(0,0,0,HORIZON); g.addColorStop(0,keyed(SKY,t,1)); g.addColorStop(1,keyed(SKY,t,2)); ctx.fillStyle=g; ctx.fillRect(0,0,W,HORIZON+4); }
function sun(t){ if(t<10){ const a=1-seg(t,8,10); const y=760-t*12; ctx.save(); ctx.globalAlpha=a; dots([[200,y,58]],'#FFE29A'); ctx.globalCompositeOperation='lighter'; const g=ctx.createRadialGradient(200,y,0,200,y,220); g.addColorStop(0,'rgba(255,200,120,0.35)'); g.addColorStop(1,'rgba(255,200,120,0)'); ctx.fillStyle=g; ctx.fillRect(-20,y-220,440,440); ctx.restore(); }
  if(t>=14){ const a=seg(t,14,15); const y=lerp(1000,1120,seg(t,14,18)); ctx.save(); ctx.globalAlpha=a; dots([[300,y,92]],'#FFB347'); ctx.globalCompositeOperation='lighter'; const g=ctx.createRadialGradient(300,y,0,300,y,340); g.addColorStop(0,'rgba(255,150,70,0.45)'); g.addColorStop(1,'rgba(255,150,70,0)'); ctx.fillStyle=g; ctx.fillRect(-40,y-340,680,680); ctx.restore(); } }
const CLOUDS=[[100,220,110],[420,140,140],[760,260,120],[1000,120,100],[1250,200,130],[1500,300,110]];
function clouds(i){ const span=W+800; for(const [cx,cy,r] of CLOUDS){ const x=((cx-SCX[i]*0.2)%span+span)%span-400; ctx.fillStyle='rgba(255,255,255,0.85)'; for(const [dx,dy,rr] of [[0,0,r],[-r*.7,r*.25,r*.75],[r*.75,r*.2,r*.7],[-r*.2,-r*.35,r*.6]]){ ctx.beginPath(); ctx.arc(x+dx,cy+dy,rr,0,6.29); ctx.fill(); } } }
function hills(i,t){ const span=1800; for(const [par,col,by,ry] of [[0.3,keyed(HILL1,t,1),1175,110],[0.45,keyed(HILL2,t,1),1200,80]]){ ctx.fillStyle=col; for(let k=-1;k<3;k++){ const x=((k*600-SCX[i]*par)%span+span)%span-400; ctx.beginPath(); ctx.ellipse(x,by,420,ry,0,Math.PI,2*Math.PI); ctx.fill(); } } }
function mountains(i,t){ if(t<13.5) return; const base=SCX[F(13.5)]*0.3+1250; for(let k=0;k<7;k++){ const wx=base+k*420; const x=wx-SCX[i]*0.3; if(x<-400||x>W+400) continue; const h=[420,520,380,480,440,500,400][k]; ctx.fillStyle='#6E7FA0'; ctx.beginPath(); ctx.moveTo(x-260,HORIZON+30); ctx.lineTo(x,HORIZON-h); ctx.lineTo(x+260,HORIZON+30); ctx.closePath(); ctx.fill(); ctx.fillStyle='#F4F1DE'; ctx.beginPath(); ctx.moveTo(x-70,HORIZON-h+130); ctx.lineTo(x,HORIZON-h); ctx.lineTo(x+70,HORIZON-h+130); ctx.lineTo(x+35,HORIZON-h+110); ctx.lineTo(x,HORIZON-h+140); ctx.lineTo(x-35,HORIZON-h+110); ctx.closePath(); ctx.fill(); } }
function meadows(i,t){ ctx.fillStyle=keyed(MEAD1,t,1); ctx.fillRect(0,HORIZON,W,ROAD_Y-30-HORIZON); const g=ctx.createLinearGradient(0,1420,0,H); g.addColorStop(0,keyed(MEAD1,t,1)); g.addColorStop(1,keyed(MEAD2,t,1)); ctx.fillStyle=g; ctx.fillRect(0,1420,W,H-1420);
  for(const f of FLOWERS){ const x=((f.x-SCX[i])%3000+3000)%3000-100; dots([[x,f.y,f.r]],f.c); dots([[x,f.y,f.r*0.4]],'#FFE082'); } }
function trees(i){ const span=14*260; for(const tr of TREES){ const x=((tr.x-SCX[i]*0.6)%span+span)%span-200; const base=1290; ctx.fillStyle='#5A3A1E'; ctx.fillRect(x-10,base-tr.h*0.6,20,tr.h*0.6); ctx.fillStyle=tr.dark?'#2E7D46':'#3E9B5F'; ctx.beginPath(); ctx.moveTo(x-tr.w,base-tr.h*0.5); ctx.lineTo(x,base-tr.h*1.7); ctx.lineTo(x+tr.w,base-tr.h*0.5); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.moveTo(x-tr.w*0.8,base-tr.h*0.9); ctx.lineTo(x,base-tr.h*1.9); ctx.lineTo(x+tr.w*0.8,base-tr.h*0.9); ctx.closePath(); ctx.fill(); } }
function road(i,t){ ctx.fillStyle='#A08054'; ctx.fillRect(0,ROAD_Y-30,W,120); ctx.fillStyle='#8A6E4B'; ctx.fillRect(0,ROAD_Y-30,W,10); ctx.fillRect(0,ROAD_Y+82,W,8); ctx.fillStyle='#B89468'; for(let k=-1;k<8;k++){ const x=((k*180-SCX[i])%1440+1440)%1440-100; ctx.fillRect(x,ROAD_Y+24,90,8); }
  /* Bach + Holzbruecke */ const bx=BR_WX-SCX[i]; if(bx>-200&&bx<W+200){ ctx.fillStyle='#4FA3D6'; ctx.fillRect(bx-70,ROAD_Y-30,140,120); ctx.fillStyle='rgba(255,255,255,0.45)'; for(let k=0;k<4;k++) ctx.fillRect(bx-50+(k%2)*30,ROAD_Y-10+k*28+6*Math.sin(t*4+k),40,5); ctx.fillStyle='#6B4A2B'; ctx.fillRect(bx-110,ROAD_Y-12,220,40); ctx.fillStyle='#4A3320'; for(let k=0;k<7;k++) ctx.fillRect(bx-104+k*32,ROAD_Y-12,4,40); ctx.fillStyle='#8A5A2B'; ctx.fillRect(bx-112,ROAD_Y-60,14,52); ctx.fillRect(bx+98,ROAD_Y-60,14,52); ctx.fillRect(bx-112,ROAD_Y-52,224,8); } }
function village(i,t){ const ox=-SCX[i]; if(ox<-1600) return; const huts=[[40,120,100],[180,150,120],[330,110,90],[860,130,110],[1010,120,100]];
  for(const [hx,hw,hh] of huts){ const x=ox+hx, base=1292; ctx.fillStyle='#E8D3A0'; ctx.fillRect(x,base-hh,hw,hh); ctx.fillStyle='#6B4A2B'; ctx.fillRect(x+hw*0.45,base-56,hw*0.2,56); ctx.fillRect(x,base-hh,hw,6); ctx.fillStyle='#A08054'; ctx.beginPath(); ctx.moveTo(x-14,base-hh); ctx.lineTo(x+hw/2,base-hh-70); ctx.lineTo(x+hw+14,base-hh); ctx.closePath(); ctx.fill(); ctx.fillStyle='#FFE082'; ctx.fillRect(x+16,base-hh+24,22,26); }
  /* Windmuehle */ const mx=ox+660, base=1292; ctx.fillStyle='#8E8E9E'; ctx.beginPath(); ctx.moveTo(mx-50,base); ctx.lineTo(mx-30,base-200); ctx.lineTo(mx+30,base-200); ctx.lineTo(mx+50,base); ctx.closePath(); ctx.fill(); ctx.fillStyle='#8C2F26'; ctx.beginPath(); ctx.moveTo(mx-40,base-200); ctx.lineTo(mx,base-250); ctx.lineTo(mx+40,base-200); ctx.closePath(); ctx.fill(); ctx.save(); ctx.translate(mx,base-215); ctx.rotate(t*0.9); ctx.strokeStyle='#F4F1DE'; ctx.lineWidth=10; for(let k=0;k<4;k++){ ctx.rotate(Math.PI/2); ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(0,-110); ctx.stroke(); ctx.fillStyle='rgba(244,241,222,0.85)'; ctx.fillRect(4,-105,22,80); } ctx.restore(); }

/* ---------- Burg (Endposition, per Offset eingefahren) ---------- */
function castleX(i){ return 620+(SCX_END-SCX[i]); }
function drawbridgeAngle(t){ return lerp(-Math.PI/2,-Math.PI,easeIn(seg(t,17.0,17.8))); }
function castle(i,t){ const ox=castleX(i); if(ox>W+700) return; ctx.save(); ctx.translate(ox-620,0); const glow=seg(t,15,18);
  ctx.fillStyle='#2A6F9E'; ctx.fillRect(560,ROAD_Y-25,700,50);                                  /* Burggraben */
  ctx.fillStyle='#8E8E9E'; ctx.fillRect(620,820,640,ROAD_Y-820); ctx.strokeStyle='#6E6E80'; ctx.lineWidth=3; for(let y=850;y<ROAD_Y;y+=40){ ctx.beginPath(); ctx.moveTo(620,y); ctx.lineTo(1260,y); ctx.stroke(); } ctx.fillStyle='#8E8E9E'; for(let x=620;x<1260;x+=80) ctx.fillRect(x,780,40,40);
  for(const tx of [700,1040]){ ctx.fillStyle='#9A9AAA'; ctx.fillRect(tx-60,600,120,ROAD_Y-600); ctx.fillStyle='#7E7E90'; for(let x=tx-60;x<tx+60;x+=40) ctx.fillRect(x,566,22,34); ctx.fillStyle='#8C2F26'; ctx.beginPath(); ctx.moveTo(tx-80,600); ctx.lineTo(tx,500); ctx.lineTo(tx+80,600); ctx.closePath(); ctx.fill(); ctx.fillStyle='#4A3320'; ctx.fillRect(tx-3,450,6,52); const fw=0.3*Math.sin(t*7+tx); ctx.fillStyle='#1B3A5C'; ctx.beginPath(); ctx.moveTo(tx+3,452); ctx.quadraticCurveTo(tx+40,458+fw*20,tx+72,450+fw*16); ctx.lineTo(tx+3,486); ctx.closePath(); ctx.fill();
    for(const wy of (tx===700?[700,840,980]:[840,980])){ ctx.fillStyle=mixHex('#3A3A4A','#FFE082',glow); rrect(tx-14,wy,28,44,13); ctx.fill(); } }
  ctx.save(); ctx.translate(0,-158); royals(t); ctx.restore();   /* Balkon oben am rechten Turm, frei von Schild und Drachenschweif */
  for(const wx of [780,940]){ ctx.fillStyle=mixHex('#3A3A4A','#FFE082',glow); rrect(wx-14,900,28,44,13); ctx.fill(); }
  ctx.fillStyle='#2A2013'; ctx.fillRect(820,1130,80,ROAD_Y-1130); ctx.beginPath(); ctx.arc(860,1130,40,Math.PI,2*Math.PI); ctx.fill();
  /* Zugbruecke */ const a=drawbridgeAngle(t); ctx.save(); ctx.translate(860,ROAD_Y); ctx.rotate(a); ctx.fillStyle='#6B4A2B'; rrect(0,-16,170,32,6); ctx.fill(); ctx.fillStyle='#4A3320'; for(let k=1;k<6;k++) ctx.fillRect(k*28,-16,4,32); ctx.restore();
  const ex=860+170*Math.cos(a), ey=ROAD_Y+170*Math.sin(a); ctx.strokeStyle='#5A6090'; ctx.lineWidth=4; ctx.setLineDash([6,5]); ctx.beginPath(); ctx.moveTo(ex,ey-10); ctx.lineTo(826,1136); ctx.moveTo(ex,ey-10); ctx.lineTo(894,1136); ctx.stroke(); ctx.setLineDash([]);
  /* Turmbanner mit Alterszahl */ const L=lerp(0,420,easeOut(seg(t,18.2,19.0))); if(L>4){ ctx.fillStyle='#1B3A5C'; ctx.fillRect(655,640,90,L); ctx.strokeStyle='#E4C567'; ctx.lineWidth=5; ctx.strokeRect(655,640,90,L); ctx.fillStyle='#E4C567'; ctx.beginPath(); ctx.moveTo(655,640+L); ctx.lineTo(700,640+L+40); ctx.lineTo(745,640+L); ctx.closePath(); ctx.fill(); const age=$('age').value.trim().slice(0,2); if(age&&L>200){ ctx.save(); ctx.globalAlpha=seg(L,200,320); text(age,700,640+L-90,fontB(120),'#FFE45C','center','#87621A',12); ctx.restore(); if(t<20.2){ const r=rng(Math.floor(t*6)); ctx.save(); ctx.globalCompositeOperation='lighter'; for(let n=0;n<6;n++) dots([[640+r()*120,540+L-60+r()*120,3+r()*4]],'rgba(255,240,180,0.9)'); ctx.restore(); } } }
  konrad(t); if(t>=17.8) pippo(t);
  ctx.restore(); }

/* ---------- Reiter: Pferd + Ritter ---------- */
function horseLegs(ph,paddle,side){ const A=paddle?0.12:0.6; const legs=(side==='far')?[[75,0.8],[-65,Math.PI+0.8]]:[[105,0],[-95,Math.PI]]; ctx.strokeStyle=(side==='far')?'#6E4620':'#8A5A2B'; ctx.lineWidth=24; ctx.lineCap='round';   /* je Seite zwei Beine — zusammen vier, nicht acht */
  for(const [hx,off] of legs){ const a=A*Math.sin(ph*2*Math.PI+off), knee=Math.max(0,a)*0.9; const kx=hx+Math.sin(a)*70, ky=-120+Math.cos(a)*70; const fx=kx+Math.sin(a-knee)*70, fy=ky+Math.cos(a-knee)*70; ctx.beginPath(); ctx.moveTo(hx,-120); ctx.lineTo(kx,ky); ctx.lineTo(fx,fy); ctx.stroke(); dots([[fx,fy+4,13]],'#2A2013'); } }
function rider(t,i){ const m=riderMatrix(t,i); const ph=GAL[i]; const gal=speed(t)>150&&!flying(t); const paddle=flying(t); const shieldUp=Math.min(seg(t,10.9,11.2),1-seg(t,11.9,12.3)); const lanceUp=Math.min(seg(t,11.8,12.2),1-seg(t,13.4,13.8));
  ctx.save(); ctx.translate(m.x,m.y); ctx.rotate(m.r); ctx.scale(m.s,m.s);
  /* hintere Beine, Schweif */ horseLegs(paddle?t*0.6:ph,paddle,'far');
  ctx.strokeStyle='#4A3320'; ctx.lineWidth=22; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(-150,-190); ctx.quadraticCurveTo(-250,-190+20*Math.sin(t*6),-235,-70+30*Math.sin(t*5)); ctx.stroke();
  /* Lanze mit Fahne (hinter dem Ritter) */ ctx.save(); ctx.translate(62,-330); ctx.rotate(-0.12-0.25*lanceUp); ctx.fillStyle='#6B4A2B'; ctx.fillRect(-6,-500,12,520); const fw=Math.sin(t*9)*14; ctx.fillStyle='#8C2F26'; ctx.beginPath(); ctx.moveTo(6,-498); ctx.quadraticCurveTo(70,-480+fw,140,-470+fw); ctx.lineTo(6,-420); ctx.closePath(); ctx.fill(); ctx.strokeStyle='#E4C567'; ctx.lineWidth=4; ctx.stroke();
    /* Toertchen auf der Fahne — Funkels Party-Hinweis */ ctx.fillStyle='#F3E7C9'; rrect(40,-476+fw*0.6,34,20,5); ctx.fill(); ctx.fillStyle='#FF6F91'; ctx.fillRect(40,-472+fw*0.6,34,6); ctx.fillStyle='#64B5F6'; ctx.fillRect(50,-488+fw*0.6,4,12); ctx.fillRect(60,-488+fw*0.6,4,12); dots([[52,-491+fw*0.6,3],[62,-491+fw*0.6,3]],'#FFB53A'); ctx.restore();
  /* Pferdekoerper */ ctx.fillStyle='#8A5A2B'; ctx.beginPath(); ctx.ellipse(0,-165,150,72,0,0,6.29); ctx.fill(); ctx.fillStyle='#A8743A'; ctx.beginPath(); ctx.ellipse(10,-140,110,40,0,0,6.29); ctx.fill();
  ctx.strokeStyle='#8A5A2B'; ctx.lineWidth=62; ctx.beginPath(); ctx.moveTo(100,-210); ctx.lineTo(190,-310); ctx.stroke(); ctx.strokeStyle='#4A3320'; ctx.lineWidth=22; ctx.beginPath(); ctx.moveTo(92,-236); ctx.lineTo(178,-338); ctx.stroke();
  ctx.save(); ctx.translate(215,-330); ctx.rotate(0.5); ctx.fillStyle='#8A5A2B'; ctx.beginPath(); ctx.ellipse(0,0,62,34,0,0,6.29); ctx.fill(); ctx.fillStyle='#A8743A'; ctx.beginPath(); ctx.ellipse(34,6,24,16,0,0,6.29); ctx.fill(); dots([[46,4,4],[52,12,4]],'#2A2013'); dots([[-4,-14,7]],'#111'); ctx.fillStyle='#8A5A2B'; ctx.beginPath(); ctx.moveTo(-38,-24); ctx.lineTo(-30,-58); ctx.lineTo(-18,-26); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.moveTo(-20,-30); ctx.lineTo(-8,-60); ctx.lineTo(2,-28); ctx.closePath(); ctx.fill(); ctx.strokeStyle='#8C2F26'; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(-10,10); ctx.lineTo(40,-10); ctx.stroke(); ctx.restore();
  /* nahe Beine */ horseLegs(paddle?t*0.6:ph,paddle,'near');
  /* Sattel + Decke */ ctx.fillStyle='#1B3A5C'; rrect(-84,-222,150,34,10); ctx.fill(); ctx.fillStyle='#8C2F26'; rrect(-70,-248,120,42,14); ctx.fill(); ctx.strokeStyle='#E4C567'; ctx.lineWidth=3; rrect(-70,-248,120,42,14); ctx.stroke();
  /* Ritter: Bein, Rumpf, Wappenrock */ ctx.fillStyle='#C9CBE6'; rrect(8,-244,42,72,14); ctx.fill(); rrect(24,-184,32,84,10); ctx.fill(); ctx.fillStyle='#4A3320'; rrect(18,-110,50,22,8); ctx.fill();
  ctx.fillStyle='#C9CBE6'; rrect(-55,-400,110,162,26); ctx.fill(); ctx.fillStyle='rgba(255,255,255,0.35)'; rrect(-42,-386,34,120,12); ctx.fill(); ctx.fillStyle='#1B3A5C'; rrect(-24,-396,48,152,10); ctx.fill(); ctx.fillStyle='#E4C567'; ctx.fillRect(-6,-380,12,70); ctx.fillRect(-20,-356,40,12); ctx.fillStyle='#4A3320'; rrect(-58,-262,116,16,6); ctx.fill(); dots([[0,-254,8]],'#E4C567');
  dots([[-58,-390,26],[58,-390,26]],'#C9CBE6'); ctx.strokeStyle='#E4C567'; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(-58,-390,26,0,6.29); ctx.stroke(); ctx.beginPath(); ctx.arc(58,-390,26,0,6.29); ctx.stroke();
  /* Schildarm + Schild (zum Drachen hin gehoben) */ const sx=lerp(-6,56,shieldUp), sy=lerp(-312,-386,shieldUp); ctx.strokeStyle='#C9CBE6'; ctx.lineWidth=22; ctx.beginPath(); ctx.moveTo(-58,-372); ctx.lineTo(sx-34,sy+6); ctx.stroke();
  ctx.save(); ctx.translate(sx,sy); ctx.rotate(-0.35*shieldUp); ctx.fillStyle='#1B3A5C'; ctx.beginPath(); ctx.moveTo(-55,-60); ctx.lineTo(55,-60); ctx.lineTo(55,20); ctx.quadraticCurveTo(55,70,0,92); ctx.quadraticCurveTo(-55,70,-55,20); ctx.closePath(); ctx.fill(); ctx.strokeStyle='#E4C567'; ctx.lineWidth=6; ctx.stroke(); ctx.fillStyle='#8C2F26'; ctx.fillRect(-12,-52,24,124); ctx.fillRect(-46,-16,92,22); ctx.restore();
  /* Helm mit Foto (Visier hoch), Federbusch */ ctx.strokeStyle='#8C2F26'; ctx.lineWidth=14; ctx.lineCap='round'; for(const [dx,cy] of [[-30,-590],[-60,-575],[-80,-548]]){ ctx.beginPath(); ctx.moveTo(0,-540); ctx.quadraticCurveTo(dx*0.5,cy-30,dx-40,cy+20); ctx.stroke(); } ctx.strokeStyle='#E4C567'; ctx.lineWidth=6; ctx.beginPath(); ctx.moveTo(0,-540); ctx.quadraticCurveTo(-30,-600,-100,-560); ctx.stroke();
  dots([[0,-470,66]],'#C9CBE6'); ctx.fillStyle='#8E93B8'; ctx.beginPath(); ctx.arc(0,-470,66,Math.PI*0.15,Math.PI*0.85); ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.arc(0,-464,56,0,6.29); ctx.clip(); ctx.fillStyle='#F6C9A4'; ctx.fillRect(-60,-524,120,120); drawPhotoInCircle(0,-464,56,zoomVal()); ctx.restore(); ctx.strokeStyle='#6E73B0'; ctx.lineWidth=5; ctx.beginPath(); ctx.arc(0,-464,56,0,6.29); ctx.stroke();
  ctx.fillStyle='#B8BCD9'; rrect(-44,-546,124,26,9); ctx.fill(); ctx.beginPath(); ctx.moveTo(78,-546); ctx.lineTo(104,-534); ctx.lineTo(78,-520); ctx.closePath(); ctx.fill(); ctx.fillStyle='#4A4F80'; for(const x of [-14,8,30,52]) ctx.fillRect(x,-540,6,14); dots([[0,-548,10]],'#E4C567');
  ctx.restore();
  /* Staub hinter den Hufen */ if(gal){ const r=rng(Math.floor(t*10)); ctx.save(); for(let n=0;n<6;n++){ const dx=-150-r()*180, dy=-r()*60, rr=14+r()*22; ctx.fillStyle=`rgba(200,180,140,${(0.45-n*0.06).toFixed(2)})`; ctx.beginPath(); ctx.arc(m.x+dx,m.y+dy-6,rr,0,6.29); ctx.fill(); } ctx.restore(); } }

/* ---------- Funkel, der Drache ---------- */
const DR_X=1120, WALL_X=800, WALL_Y=820, WALL_SC=0.6;   /* Funkel steht weit rechts (Gesicht bleibt frei) und sitzt am Ende auf der Burgmauer */
function dragonState(t,i){ let x,y,dir=1,flap=0,mouth=0,fire=0,happy=false,blush=0,inhale=0,wings=0.45,legsLong=false,sc=1,behind=t>=13.4;
  if(t<9.6) return null;
  if(t<10.6){ const u=easeOut(seg(t,9.6,10.6)); x=lerp(1500,DR_X,u); y=lerp(-160,ROAD_Y,u); wings=1; flap=Math.sin(t*7)*0.5; }
  else if(t<13.4){ x=DR_X; y=ROAD_Y; wings=0.45; if(t>=10.8&&t<11.6){ mouth=Math.sin(seg(t,10.8,11.6)*Math.PI); } if(t>=11.0&&t<11.6) fire=Math.sin(seg(t,11.0,11.6)*Math.PI); if(t>=12.4){ happy=true; blush=seg(t,12.4,12.9); if(t>=12.9) y=ROAD_Y-14*Math.abs(Math.sin((t-12.9)*12)); } }
  else if(t<14.0){ const u=easeInOut(seg(t,13.4,14.0)); const m=riderMatrix(t,i); x=lerp(DR_X,m.x-10,u); y=lerp(ROAD_Y,m.y-500,u); dir=u<0.5?1:-1; wings=lerp(0.45,1,u); flap=Math.sin(t*9)*0.5; happy=true; blush=1; legsLong=u>0.5; }
  else if(t<17.4){ const m=riderMatrix(t,i); x=m.x-10; y=m.y-500; dir=-1; wings=1; flap=Math.sin(t*6)*0.55; legsLong=true; happy=true; blush=0.6; }
  else if(t<17.9){ const u=easeInOut(seg(t,17.4,17.9)); const m=riderMatrix(17.4,i); x=lerp(m.x-10,WALL_X,u); y=lerp(m.y-500,WALL_Y,u); dir=u<0.5?-1:1; sc=lerp(1,WALL_SC,u); wings=lerp(1,0.45,u); flap=Math.sin(t*6)*0.4*(1-u); happy=true; blush=0.6; }
  else { x=WALL_X; y=WALL_Y; dir=1; sc=WALL_SC; happy=true; blush=t>=20.0?1:0.4; if(t>=19.4&&t<19.8) inhale=seg(t,19.4,19.8); if(t>=19.8&&t<20.1){ mouth=Math.sin(seg(t,19.8,20.1)*Math.PI); inhale=-0.6*Math.sin(seg(t,19.8,20.1)*Math.PI); } }
  return {x,y,dir,flap,mouth,fire,happy,blush,inhale,wings,legsLong,sc,behind}; }
function dragon(d,t){ ctx.save(); ctx.translate(d.x,d.y); ctx.scale(d.dir*d.sc,d.sc);
  const wing=(near)=>{ ctx.save(); ctx.translate(-20,-290); const f=d.wings*(1+0.5*d.flap); ctx.scale(near?1:0.85,f); ctx.fillStyle=near?'#E8733A':'#C95E2E'; ctx.strokeStyle='#A5402B'; ctx.lineWidth=6; ctx.beginPath(); ctx.moveTo(0,0); ctx.quadraticCurveTo(80,-160,140,-190); ctx.lineTo(280,-120); ctx.quadraticCurveTo(230,-70,250,-20); ctx.quadraticCurveTo(200,-10,210,50); ctx.quadraticCurveTo(120,30,0,0); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); };
  wing(false);
  /* Schweif */ ctx.strokeStyle='#3E9B5F'; ctx.lineWidth=30; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(150,-150); ctx.quadraticCurveTo(300,-200,330,-60+10*Math.sin(t*3)); ctx.stroke(); ctx.fillStyle='#A5402B'; ctx.beginPath(); ctx.moveTo(320,-40+10*Math.sin(t*3)); ctx.lineTo(370,-90+10*Math.sin(t*3)); ctx.lineTo(372,-30+10*Math.sin(t*3)); ctx.closePath(); ctx.fill();
  /* Beine */ ctx.strokeStyle='#3E9B5F'; ctx.lineWidth=34; if(d.legsLong){ ctx.lineWidth=46; for(const [lx,tx,ty] of [[-90,-165,330],[70,150,330]]){ ctx.beginPath(); ctx.moveTo(lx,-100); ctx.quadraticCurveTo(tx,120,tx,ty); ctx.stroke(); dots([[tx-18,ty+14,11],[tx+2,ty+22,11],[tx+22,ty+14,11]],'#2A2013'); dots([[tx,ty+2,20]],'#3E9B5F'); } ctx.lineWidth=34; }
  else { for(const lx of [-120,-70,60,110]){ ctx.beginPath(); ctx.moveTo(lx,-100); ctx.lineTo(lx,-8); ctx.stroke(); dots([[lx-12,-4,7],[lx,-2,7],[lx+12,-4,7]],'#2A2013'); } }
  /* Koerper, Bauch, Zacken */ ctx.fillStyle='#3E9B5F'; ctx.beginPath(); ctx.ellipse(0,-190,190,120,0,0,6.29); ctx.fill(); ctx.fillStyle='#F2C86B'; ctx.beginPath(); ctx.ellipse(-20,-165,120,72,0,0,6.29); ctx.fill(); ctx.fillStyle='#A5402B'; for(let k=0;k<5;k++){ const bx=120-k*55; ctx.beginPath(); ctx.moveTo(bx-18,-300+k*2); ctx.lineTo(bx,-340+k*2); ctx.lineTo(bx+18,-300+k*2); ctx.closePath(); ctx.fill(); }
  wing(true);
  /* Hals + Kopf */ const hy=-405-d.inhale*40; ctx.strokeStyle='#3E9B5F'; ctx.lineWidth=74; ctx.beginPath(); ctx.moveTo(-120,-270); ctx.lineTo(-230,hy+25); ctx.stroke();
  ctx.fillStyle='#3E9B5F'; ctx.beginPath(); ctx.ellipse(-280,hy,92,64,0,0,6.29); ctx.fill(); ctx.fillStyle='#5BB77A'; ctx.beginPath(); ctx.ellipse(-330,hy+15,50,34,0,0,6.29); ctx.fill(); dots([[-362,hy+6,5],[-362,hy+22,5]],'#2A5A3A');
  ctx.fillStyle='#F2C86B'; for(const hx of [-270,-238]){ ctx.beginPath(); ctx.moveTo(hx-12,hy-52); ctx.lineTo(hx,hy-92); ctx.lineTo(hx+12,hy-52); ctx.closePath(); ctx.fill(); }
  if(d.mouth>0){ ctx.fillStyle='#4A1F2E'; ctx.beginPath(); ctx.moveTo(-330,hy+24); ctx.lineTo(-380,hy+24); ctx.lineTo(-362,hy+24+d.mouth*54); ctx.closePath(); ctx.fill(); ctx.fillStyle='#FFFFFF'; ctx.fillRect(-372,hy+24,8,8*d.mouth); ctx.fillRect(-350,hy+24,8,8*d.mouth); }
  else { ctx.strokeStyle='#2A5A3A'; ctx.lineWidth=5; ctx.lineCap='round'; ctx.beginPath(); if(d.happy) ctx.arc(-330,hy+22,26,0.1*Math.PI,0.9*Math.PI); else { ctx.moveTo(-360,hy+34); ctx.lineTo(-310,hy+34); } ctx.stroke(); }
  const er=d.happy?32:28; dots([[-285,hy-36,er]],'#FFFFFF'); dots([[-294,hy-36,d.happy?16:13]],'#111'); dots([[-300,hy-44,5]],'#FFF'); if(d.happy){ ctx.strokeStyle='#2A5A3A'; ctx.lineWidth=5; ctx.beginPath(); ctx.arc(-285,hy-36,er+4,Math.PI*1.15,Math.PI*1.85); ctx.stroke(); }
  if(d.blush>0){ ctx.save(); ctx.globalAlpha=d.blush*0.7; dots([[-322,hy-2,18]],'#FF6F91'); ctx.restore(); }
  /* Feuer */ if(d.fire>0){ const L=150*d.fire, fl=0.85+0.3*Math.sin(t*40); ctx.save(); ctx.globalCompositeOperation='lighter'; for(const [c,f,w] of [['#FF7A1A',1,40],['#FFB53A',.7,28],['#FFF1A8',.4,16]]){ ctx.fillStyle=c; ctx.beginPath(); ctx.moveTo(-380,hy+10-w); ctx.quadraticCurveTo(-380-L*f*0.5*fl,hy+10-w*1.6,-380-L*f*fl,hy+10); ctx.quadraticCurveTo(-380-L*f*0.5*fl,hy+10+w*1.6,-380,hy+10+w); ctx.closePath(); ctx.fill(); } ctx.restore(); }
  ctx.restore(); }
function sparks(t){ if(t<11.05||t>11.7) return; const r=rng(Math.floor(t*12)); ctx.save(); ctx.globalCompositeOperation='lighter'; const u=seg(t,11.05,11.7); for(let n=0;n<14;n++){ const a=-Math.PI*0.9+r()*Math.PI*1.2; const d=(20+r()*140)*(0.3+u); dots([[585+Math.cos(a)*d,950+Math.sin(a)*d-u*u*120,3+r()*5]],['#FFE45C','#FFB53A','#FFFFFF'][n%3]); } ctx.restore(); }
function puffDown(x,y,u){ if(u<=0||u>1) return; ctx.save(); ctx.globalAlpha=0.6*(1-u); const r=rng(89); for(let n=0;n<7;n++){ const a=Math.PI/2+(r()-.5)*0.9; const d=40+260*u+r()*40; dots([[x+Math.cos(a)*d,y+Math.sin(a)*d,(22+r()*22)*(0.6+u)]],'#E9EAFF'); } ctx.restore(); }
function puff(x,y,u,dir){ if(u<=0||u>1) return; ctx.save(); ctx.globalAlpha=0.6*(1-u); ctx.fillStyle='#E9EAFF'; const r=rng(88); for(let n=0;n<7;n++){ const a=(r()-.5)*0.9; const d=40+240*u+r()*40; dots([[x+dir*Math.cos(a)*d,y+Math.sin(a)*d-30*u,(24+r()*24)*(0.6+u)]],'#E9EAFF'); } ctx.restore(); }

/* ---------- Fiete, der Falke ---------- */
function falconDraw(x,y,dir,flap,perched){ ctx.save(); ctx.translate(x,y); ctx.scale(dir,1); ctx.fillStyle='#8A5A2B'; ctx.beginPath(); ctx.ellipse(0,0,28,16,0,0,6.29); ctx.fill(); ctx.fillStyle='#B07A3A'; ctx.beginPath(); ctx.ellipse(-4,4,18,9,0,0,6.29); ctx.fill(); dots([[24,-8,12]],'#8A5A2B'); ctx.fillStyle='#F2C230'; ctx.beginPath(); ctx.moveTo(33,-10); ctx.lineTo(46,-4); ctx.lineTo(33,-1); ctx.closePath(); ctx.fill(); dots([[27,-11,3]],'#111'); ctx.fillStyle='#4A3320'; ctx.beginPath(); ctx.moveTo(-24,0); ctx.lineTo(-48,-10); ctx.lineTo(-46,10); ctx.closePath(); ctx.fill();
  ctx.strokeStyle='#8A5A2B'; ctx.lineWidth=9; ctx.lineCap='round'; ctx.lineJoin='round'; if(perched){ ctx.beginPath(); ctx.moveTo(-6,-6); ctx.lineTo(-20,-4); ctx.lineTo(-30,6); ctx.stroke(); ctx.strokeStyle='#F2A230'; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(-4,14); ctx.lineTo(-6,26); ctx.moveTo(6,14); ctx.lineTo(8,26); ctx.stroke(); }
  else { ctx.beginPath(); ctx.moveTo(-4,-4); ctx.lineTo(-26,-22-flap*28); ctx.lineTo(-56,-12-flap*38); ctx.moveTo(4,-4); ctx.lineTo(24,-22-flap*28); ctx.lineTo(54,-12-flap*38); ctx.stroke(); } ctx.restore(); }
function falcon(t,i){ const fl=Math.sin(t*16)*0.6; if(t<6.2) return null;
  if(t<7.0){ const u=easeInOut(seg(t,6.2,7.0)); const tip=riderPoint(95,-830,t,i); return {x:lerp(-80,tip.x-170,u),y:lerp(260,tip.y,u),dir:1,flap:fl,perched:false}; }
  if(t<8.6){ const tip=riderPoint(95,-830,t,i); const a=-Math.PI+2*Math.PI*seg(t,7.0,8.6); return {x:tip.x+170*Math.cos(a),y:tip.y+80*Math.sin(a),dir:(-Math.sin(a)>=0)?1:-1,flap:fl,perched:false}; }
  if(t<9.2){ const tip=riderPoint(95,-830,8.6,i), p=riderPoint(88,-700,t,i); const u=easeInOut(seg(t,8.6,9.2)); return {x:lerp(tip.x-170,p.x,u),y:lerp(tip.y,p.y-26,u),dir:1,flap:fl,perched:false}; }
  if(t<10.8){ const p=riderPoint(88,-700,t,i); return {x:p.x,y:p.y-26,dir:1,flap:0,perched:true}; }
  if(t<11.3){ const p=riderPoint(88,-700,10.8,i); const u=easeOut(seg(t,10.8,11.3)); return {x:lerp(p.x,700,u),y:lerp(p.y-26,520,u),dir:1,flap:fl,perched:false}; }
  if(t<14.0) return {x:700+16*Math.sin(t*2.2),y:520+14*Math.sin(t*3.1),dir:1,flap:fl,perched:false};
  if(t<16.5){ const m=riderMatrix(t,i); const u=easeInOut(seg(t,14.0,14.6)); return {x:lerp(700,m.x-300,u)+10*Math.sin(t*3),y:lerp(520,m.y-420,u)+12*Math.sin(t*2.6),dir:1,flap:fl,perched:false}; }
  if(t<17.6){ const m=riderMatrix(16.5,i); const u=easeInOut(seg(t,16.5,17.6)); return {x:lerp(m.x-300,890,u),y:lerp(m.y-420,776,u)-80*Math.sin(Math.PI*u),dir:1,flap:fl,perched:false}; }
  return {x:890,y:776,dir:-1,flap:0,perched:true}; }

/* ---------- Knappe Konrad, Hofnarr Pippo, Narrenkappe ---------- */
const KON_X=1000, PIP_X=700, HAT_HOME={x:PIP_X,y:ROAD_Y-300};
function konrad(t){ const x=KON_X, by=ROAD_Y; const wave=t>=17.8?Math.sin(t*6)*0.5:0; const name=nameVal();
  ctx.fillStyle='#8A5A2B'; rrect(x-30,by-130,26,130,8); ctx.fill(); rrect(x+4,by-130,26,130,8); ctx.fill(); ctx.fillStyle='#4A3320'; rrect(x-36,by-22,36,22,6); ctx.fill(); rrect(x,by-22,36,22,6); ctx.fill();
  ctx.fillStyle='#1B3A5C'; rrect(x-44,by-262,88,140,14); ctx.fill(); ctx.fillStyle='#E4C567'; ctx.fillRect(x-5,by-250,10,64); ctx.fillRect(x-24,by-228,48,10); ctx.fillStyle='#4A3320'; rrect(x-46,by-136,92,14,5); ctx.fill();
  ctx.strokeStyle='#1B3A5C'; ctx.lineWidth=22; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x+36,by-250); ctx.lineTo(x+30,by-330); ctx.stroke(); dots([[x+30,by-334,14]],'#F6C9A4');
  ctx.save(); ctx.translate(x-36,by-250); ctx.rotate(-1.2+wave); ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(0,-80); ctx.stroke(); dots([[0,-88,14]],'#F6C9A4'); ctx.restore();
  /* Schild */ ctx.fillStyle='#8A5A2B'; ctx.fillRect(x+22,by-470,16,140); ctx.fillStyle='#6B4A2B'; rrect(x-200,by-530,280,100,14); ctx.fill(); ctx.strokeStyle='#4A3320'; ctx.lineWidth=5; rrect(x-200,by-530,280,100,14); ctx.stroke(); dots([[x-186,by-516,4],[x+66,by-516,4],[x-186,by-444,4],[x+66,by-444,4]],'#E4C567');
  text('Willkommen,',x-60,by-504,fontB(32,700),'#F3E7C9'); text(name+'!',x-60,by-460,fitFont(name+'!',250,44,24),'#E4C567');
  dots([[x,by-300,36]],'#F6C9A4'); ctx.fillStyle='#5C3A1E'; ctx.beginPath(); ctx.arc(x,by-306,38,Math.PI,2*Math.PI); ctx.fill(); ctx.fillRect(x-38,by-306,76,14); dots([[x-12,by-300,4],[x+12,by-300,4]],'#111'); ctx.strokeStyle='#8a3a30'; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(x,by-290,12,0.2*Math.PI,0.8*Math.PI); ctx.stroke(); }
function pippo(t){ if(t<17.8) return; const x=PIP_X, by=ROAD_Y; const up=t>=19.85&&t<21.9;
  ctx.fillStyle='#8C2F26'; rrect(x-28,by-130,24,130,8); ctx.fill(); ctx.fillStyle='#E4C567'; rrect(x+4,by-130,24,130,8); ctx.fill(); ctx.fillStyle='#8C2F26'; ctx.beginPath(); ctx.moveTo(x-34,by); ctx.lineTo(x+4,by); ctx.lineTo(x+4,by-18); ctx.lineTo(x-24,by-18); ctx.quadraticCurveTo(x-60,by-30,x-34,by); ctx.fill(); ctx.fillStyle='#E4C567'; ctx.beginPath(); ctx.moveTo(x+2,by); ctx.lineTo(x+40,by); ctx.quadraticCurveTo(x+66,by-30,x+30,by-18); ctx.lineTo(x+2,by-18); ctx.fill();
  ctx.fillStyle='#8C2F26'; rrect(x-40,by-262,40,140,10); ctx.fill(); ctx.fillStyle='#E4C567'; rrect(x,by-262,40,140,10); ctx.fill(); dots([[x-34,by-126,6],[x-12,by-122,6],[x+12,by-122,6],[x+34,by-126,6]],'#FFE45C');
  const armA=up?-2.4:-0.9, armB=up?-0.7:-2.2; for(const [ax,ang,col] of [[x-34,armA,'#8C2F26'],[x+34,armB,'#E4C567']]){ ctx.save(); ctx.translate(ax,by-250); ctx.rotate(ang); ctx.strokeStyle=col; ctx.lineWidth=18; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(0,-76); ctx.stroke(); dots([[0,-84,12]],'#F6C9A4'); ctx.restore(); }
  if(!up){ for(let k=0;k<3;k++){ const a=t*4+k*2.094; const bx=x+56*Math.cos(a), byy=by-340-70*Math.abs(Math.sin(a)); dots([[bx,byy,14]],['#FF6F91','#64B5F6','#FFD54F'][k]); } }
  dots([[x,by-292,32]],'#F6C9A4'); dots([[x-10,by-298,4],[x+10,by-298,4]],'#111'); dots([[x,by-286,5]],'#E0A080'); ctx.strokeStyle='#8a3a30'; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(x,by-282,13,0.15*Math.PI,0.85*Math.PI); ctx.stroke(); }
function jesterHat(x,y,rot){ ctx.save(); ctx.translate(x,y); ctx.rotate(rot); ctx.fillStyle='#8C2F26'; ctx.beginPath(); ctx.moveTo(-40,0); ctx.quadraticCurveTo(-60,-60,-90,-70); ctx.quadraticCurveTo(-30,-40,0,-10); ctx.closePath(); ctx.fill(); ctx.fillStyle='#E4C567'; ctx.beginPath(); ctx.moveTo(40,0); ctx.quadraticCurveTo(60,-60,90,-70); ctx.quadraticCurveTo(30,-40,0,-10); ctx.closePath(); ctx.fill(); ctx.fillStyle='#8C2F26'; ctx.fillRect(-42,-14,42,18); ctx.fillStyle='#E4C567'; ctx.fillRect(0,-14,42,18); dots([[-90,-70,8],[90,-70,8]],'#FFE45C'); ctx.restore(); }
function hatPos(t,i){ if(t<19.85) return {x:HAT_HOME.x,y:HAT_HOME.y,rot:0}; const head=riderPoint(215,-372,t,i); if(t<21.2){ const u=seg(t,19.85,21.2); return {x:lerp(HAT_HOME.x,head.x,u),y:lerp(HAT_HOME.y,head.y,u)-420*Math.sin(Math.PI*u),rot:u*Math.PI*4}; } const b=seg(t,21.2,21.6); return {x:head.x,y:head.y-16*Math.sin(b*Math.PI)*(1-b),rot:0.35}; }

/* ---------- Koenig und Prinzessin winken vom Balkon ---------- */
function royals(t){ const w1=Math.sin(t*5)*0.5, w2=Math.sin(t*5+1.5)*0.5;
  ctx.fillStyle='#7E7E90'; rrect(982,858,116,18,4); ctx.fill(); for(let x=988;x<1096;x+=18) ctx.fillRect(x,840,6,18); ctx.fillRect(982,836,116,6);
  /* Koenig */ ctx.fillStyle='#8C2F26'; rrect(994,760,44,100,12); ctx.fill(); ctx.fillStyle='#F4F1DE'; ctx.fillRect(994,760,44,10); ctx.fillRect(1012,760,8,100); dots([[1016,742,19]],'#F6C9A4'); ctx.fillStyle='#F4F1DE'; ctx.beginPath(); ctx.arc(1016,750,19,0.15,Math.PI-0.15); ctx.fill(); dots([[1010,738,3],[1022,738,3]],'#111'); ctx.fillStyle='#E4C567'; ctx.beginPath(); ctx.moveTo(998,728); ctx.lineTo(998,706); ctx.lineTo(1007,718); ctx.lineTo(1016,702); ctx.lineTo(1025,718); ctx.lineTo(1034,706); ctx.lineTo(1034,728); ctx.closePath(); ctx.fill(); dots([[1016,704,4]],'#8C2F26');
  ctx.save(); ctx.translate(1036,770); ctx.rotate(-2.2+w1); ctx.strokeStyle='#8C2F26'; ctx.lineWidth=14; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(0,-46); ctx.stroke(); dots([[0,-52,9]],'#F6C9A4'); ctx.restore();
  /* Prinzessin */ ctx.fillStyle='#FF6F91'; ctx.beginPath(); ctx.moveTo(1052,770); ctx.lineTo(1080,770); ctx.lineTo(1094,860); ctx.lineTo(1038,860); ctx.closePath(); ctx.fill(); ctx.fillStyle='#FFB3C6'; ctx.fillRect(1062,770,8,90); ctx.fillStyle='#F2C230'; rrect(1046,722,40,60,16); ctx.fill(); dots([[1066,742,17]],'#F6C9A4'); dots([[1060,739,3],[1072,739,3]],'#111'); ctx.strokeStyle='#8a3a30'; ctx.lineWidth=2.5; ctx.beginPath(); ctx.arc(1066,746,7,0.2*Math.PI,0.8*Math.PI); ctx.stroke(); ctx.fillStyle='#E4C567'; ctx.beginPath(); ctx.moveTo(1054,728); ctx.lineTo(1066,712); ctx.lineTo(1078,728); ctx.closePath(); ctx.fill(); dots([[1066,714,4]],'#64B5F6');
  ctx.save(); ctx.translate(1084,778); ctx.rotate(-2.0+w2); ctx.strokeStyle='#FF6F91'; ctx.lineWidth=12; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(0,-42); ctx.stroke(); dots([[0,-48,8]],'#F6C9A4'); ctx.restore(); }

/* ---------- Konfetti von den Tuermen ---------- */
function confettiTowers(i,t){ if(t<19.2) return; const ox=castleX(i)-620; for(const c of CONF){ const tt=t-19.2; if(tt<0||tt>3.0) continue; const sx=[700,1040][c.src]+ox, sy=500; const x=sx+Math.cos(c.a)*c.v*tt, y=sy+Math.sin(c.a)*c.v*tt+0.5*1300*tt*tt; if(y>H+40) continue; ctx.save(); ctx.globalAlpha=1-seg(tt,2.3,3.0); ctx.translate(x,y); ctx.rotate(c.rot+c.spin*tt); ctx.fillStyle=c.c; ctx.fillRect(-c.w/2,-c.h/2,c.w,c.h); ctx.restore(); } }

/* ---------- Texte + Urkunde ---------- */
function texts(t,i){ const name=nameVal();
  if(t<3){ text('Ein Ritter macht sich bereit …',W/2,H*.14,fontB(60,700),'#F3E7C9','center','#1B3A5C',9); }
  popIn(t,3.0,4.8,W/2,H*.22,()=>text('LOS GEHT’S!',0,0,fontB(190),'#FFFFFF','center','#1B3A5C',26));
  if(t>=6.3&&t<9.4){ const u=easeOut(seg(t,6.3,6.9)); const lines=wrap(`${name} reitet zur Ritter-Party!`,W-160,fontB(112)); ctx.save(); ctx.globalAlpha=u*(1-seg(t,8.9,9.4)); ctx.translate(lerp(-300,0,u),0); lines.forEach((ln,k)=>text(ln,W/2,H*.12+k*122,fontB(112),'#FFFFFF','center','#1B3A5C',24)); ctx.restore(); }
  if(t>=9.9&&t<11.4){ ctx.save(); ctx.globalAlpha=Math.min(seg(t,9.9,10.2),1-seg(t,11.0,11.4)); text('Achtung, Drache!',W/2,H*.13,fontB(110),'#FFE45C','center','#1B3A5C',22); ctx.restore(); }
  popIn(t,14.3,16.2,W/2,H*.78,()=>text('Über alle Berge!',0,0,fitFont('Über alle Berge!',W-120,130,80),'#FFFFFF','center','#1B3A5C',26));
  const f=falcon(t,i); if(f){ if(t>=9.4&&t<10.6) bubble(f.x-540,f.y-262,470,110,'Zur Burg, Ritter!',Math.min(seg(t,9.4,9.7),1-seg(t,10.3,10.6)),'#1B3A5C','#E4C567'); if(t>=13.2&&t<14.3) bubble(f.x-540,f.y-262,470,110,'Drachenmut!',Math.min(seg(t,13.2,13.5),1-seg(t,14.0,14.3)),'#1B3A5C','#E4C567'); }
  if(t>=12.4&&t<13.4) bubble(460,690,380,110,'Party?!',Math.min(seg(t,12.4,12.7),1-seg(t,13.1,13.4)),'#8C2F26','#E4C567',true);
  if(t>=19.8&&t<20.5) bubble(620,330,380,110,'Hatschi!',Math.min(seg(t,19.8,20.0),1-seg(t,20.3,20.5)),'#8C2F26','#E4C567');
  if(t>=20.5){ const u=easeOutBack(seg(t,20.5,21.2)); const cardW=W-140, cardH=520, x=70, y=lerp(-620,40,u); ctx.save(); ctx.shadowColor='rgba(0,0,0,.4)'; ctx.shadowBlur=36; ctx.shadowOffsetY=14; ctx.fillStyle='#F3E7C9'; rrect(x,y,cardW,cardH,26); ctx.fill(); ctx.restore(); ctx.fillStyle='#EAD9B2'; ctx.fillRect(x,y+18,cardW,26); ctx.fillRect(x,y+cardH-44,cardW,26); ctx.strokeStyle='#87621A'; ctx.lineWidth=6; rrect(x+10,y+10,cardW-20,cardH-20,20); ctx.stroke(); ctx.strokeStyle='#E4C567'; ctx.lineWidth=3; rrect(x+20,y+20,cardW-40,cardH-40,16); ctx.stroke();
    dots([[x+cardW-70,y+cardH-70,34]],'#8C2F26'); dots([[x+cardW-70,y+cardH-70,26]],'#A5402B'); ctx.fillStyle='#E4C567'; ctx.fillRect(x+cardW-74,y+cardH-90,8,40); ctx.fillRect(x+cardW-88,y+cardH-76,36,8);
    text(`⚔️ ${possName(name)} Ritter-Party`,W/2,y+112,fitFont(`⚔️ ${possName(name)} Ritter-Party`,cardW-100,74,44),'#1B3A5C'); text(`📅 ${$('date').value}  ·  ${$('time').value}`,W/2,y+215,fontD(54),'#2A2013'); const pl=wrap(`📍 ${$('place').value}`,cardW-120,fontD(54)); pl.forEach((ln,k)=>text(ln,W/2,y+296+k*62,fontD(54),'#2A2013'));
    const pulse=1+.04*Math.sin(t*6); ctx.save(); ctx.translate(W/2-40,y+440); ctx.scale(pulse,pulse); text('Kommst du mit? 🏰',0,0,fontB(82),'#8C2F26'); ctx.restore(); }
  ctx.globalAlpha=.6; text('machsleicht.de',W/2,H-42,fontD(38,600),'#FFFFFF'); ctx.globalAlpha=1; }

/* ---------- Kamerawackeln ---------- */
function shakeAmp(t){ let a=0; if(t>=10.6&&t<10.9) a=8*(1-seg(t,10.6,10.9)); if(t>=11.0&&t<11.6) a=Math.max(a,9*Math.sin(seg(t,11.0,11.6)*Math.PI)); if(t>=17.4&&t<17.7) a=Math.max(a,6*(1-seg(t,17.4,17.7))); if(t>=19.8&&t<20.1) a=Math.max(a,5*(1-seg(t,19.8,20.1))); return a; }

/* ---------- Frame ---------- */
function drawFrame(i){ i=clamp(i,0,P_N-1); const t=i/FPS; const a=shakeAmp(t);
  sky(t); sun(t); clouds(i);
  ctx.save(); if(a>0){ ctx.translate(SHAKE[i][0]*a,SHAKE[i][1]*a); }
  mountains(i,t); hills(i,t); meadows(i,t); trees(i); village(i,t); road(i,t); castle(i,t);
  const d=dragonState(t,i);
  if(d&&d.behind) dragon(d,t);
  rider(t,i);
  if(d&&!d.behind) dragon(d,t);
  sparks(t); puffDown(572,583,seg(t,19.8,20.6));
  const f=falcon(t,i); if(f) falconDraw(f.x,f.y,f.dir,f.flap,f.perched);
  if(t>=17.8){ const hp=hatPos(t,i); jesterHat(hp.x,hp.y,hp.rot); }
  confettiTowers(i,t);
  ctx.restore();
  texts(t,i); }

/* ---------- Ton ---------- */
function audio(ac,master,S){ const {tone,noise,bell,gull,bed,env}=S;
  const brass=(t0,f,dur,peak=0.2)=>{ const o=ac.createOscillator(); o.type='sawtooth'; o.frequency.value=f; const fl=ac.createBiquadFilter(); fl.type='lowpass'; fl.frequency.setValueAtTime(600,t0); fl.frequency.linearRampToValueAtTime(2400,t0+0.08); fl.frequency.linearRampToValueAtTime(1200,t0+dur); const g=ac.createGain(); env(g,t0,0.03,peak,Math.max(0.01,dur-0.13),0.1); o.connect(fl).connect(g).connect(master); o.start(t0); o.stop(t0+dur+0.2); };
  const chirp=(t0)=>{ tone(t0,2600,3300,0.07,'sine',0.05,0.005,0.04); tone(t0+0.1,3000,2500,0.06,'sine',0.04,0.005,0.04); };
  const falconCry=(t0)=>{ tone(t0,2600,1900,0.25,'sine',0.12,0.01,0.1); tone(t0+0.28,1900,2300,0.12,'sine',0.09,0.01,0.08); };
  /* Fanfare-Countdown, Vogelgezwitscher, Pferd */ [[0.6,392],[1.3,494],[2.0,587]].forEach(([t,f])=>brass(t,f,0.4,0.22)); [392,494,587].forEach(f=>brass(3.0,f,0.7,0.12));
  { const r=S.rng(3); for(let k=0;k<9;k++) chirp(0.3+r()*9); }
  noise(1.6,0.25,'lowpass',300,300,0.2,0.01,0.15); tone(2.9,900,1500,0.25,'sine',0.14,0.02,0.1); tone(3.15,1500,700,0.35,'sine',0.14,0.02,0.2);
  /* Hufschlag im Galopp, auf der Holzbruecke klappert es */ for(let c=0;c<19;c++){ const base=3.2+c*0.4; for(const off of [0,0.07,0.2,0.27]){ const tt=base+off; if(tt>10.7) break; if(tt>=8.1&&tt<8.7) noise(tt,0.04,'bandpass',700,700,0.22,0.003,0.03,3); else { noise(tt,0.05,'lowpass',350,350,0.2,0.003,0.04); tone(tt,90,55,0.07,'sine',0.22,0.003,0.05); } } }
  noise(8.0,0.9,'bandpass',1800,1800,0.08,0.2,0.4,0.5);                                                            /* Bach */
  falconCry(6.4); falconCry(9.4); falconCry(13.2); falconCry(17.9);
  /* Funkel */ for(let k=0;k<3;k++) noise(9.6+k*0.4,0.18,'lowpass',220,220,0.3,0.02,0.12); tone(10.6,80,40,0.3,'sine',0.5,0.003,0.2); noise(10.6,0.25,'lowpass',300,300,0.35,0.003,0.2);
  tone(10.8,130,75,0.9,'sawtooth',0.2,0.05,0.5); noise(10.8,0.9,'lowpass',300,300,0.28,0.05,0.5);                  /* Fauchen */
  noise(11.0,0.6,'bandpass',500,2500,0.32,0.03,0.3); bell(11.05,2200,0.3); noise(11.05,0.05,'bandpass',3000,3000,0.25,0.002,0.04,2); { const r=S.rng(7); for(let k=0;k<7;k++){ const f=2400+r()*2400; tone(11.1+r()*0.4,f,f,0.1,'sine',0.06,0.005,0.08); } }
  tone(12.4,500,700,0.2,'sine',0.15,0.01,0.1); tone(12.65,700,950,0.25,'sine',0.15,0.01,0.12);                      /* „Party?!" */
  [12.9,13.02,13.14].forEach((t,k)=>tone(t,520+k*120,520+k*120,0.08,'square',0.08,0.005,0.05));                     /* Kichern */
  noise(14.0,0.2,'lowpass',400,400,0.3,0.005,0.15); for(let k=0;k<7;k++) noise(14.0+k*0.5,0.18,'lowpass',220,220,0.28,0.02,0.12);
  bed('bandpass',900,0.6,[[13.9,0],[14.6,0.22],[16.4,0.22],[17.4,0]],0.8,0.06);                                    /* Wind */
  tone(17.4,80,40,0.3,'sine',0.45,0.003,0.2); noise(17.4,0.25,'lowpass',300,300,0.3,0.003,0.2);
  for(let k=0;k<12;k++) noise(17.0+k*0.065,0.03,'bandpass',1800,1800,0.14,0.003,0.03,4); tone(17.8,120,70,0.3,'sine',0.3,0.003,0.2); noise(17.8,0.2,'lowpass',400,400,0.3,0.003,0.15);   /* Zugbruecke */
  noise(18.2,0.6,'bandpass',800,800,0.12,0.05,0.3,0.7); { const r=S.rng(9); for(let k=0;k<8;k++){ const f=2400+r()*1800; tone(18.6+r()*0.6,f,f,0.12,'sine',0.06,0.005,0.1); } }   /* Banner + Gold */
  [[19.2,523],[19.4,659],[19.6,784]].forEach(([t,f])=>brass(t,f,0.28,0.2)); brass(19.85,1046,0.8,0.18); { const r=S.rng(13); for(let k=0;k<12;k++){ const f=1800+r()*2200; tone(19.3+r()*2.0,f,f,0.12,'sine',0.05,0.005,0.1); } }
  noise(19.4,0.4,'highpass',2000,4000,0.12,0.25,0.1); noise(19.8,0.15,'highpass',1500,1500,0.35,0.003,0.1); tone(19.82,700,300,0.3,'sawtooth',0.12,0.005,0.2);   /* Nieser */
  tone(21.25,240,160,0.12,'sine',0.2,0.005,0.08); bell(20.7,1046,0.22);
  for(const f of [523,659,784]) for(const d of [-5,5]){ const o=ac.createOscillator(); o.type='sawtooth'; o.frequency.value=f+d; const fl=ac.createBiquadFilter(); fl.type='lowpass'; fl.frequency.value=1200; const g=ac.createGain(); env(g,20.0,0.8,0.018,2.6,0.6); o.connect(fl).connect(g).connect(master); o.start(20.0); o.stop(24); } }

startTrailer({ id:'ritter', title:'Ritter-Trailer', DUR:P_DUR, drawFrame, audio, photoDefault:IDA_URI, restFrameAt:8.9 });
