
/* ============================================================
   Drehbuch BAUSTELLE — „Einsatz fuer die Party-Baustelle" (STORY-baustelle.md)
   0–3 Bauhof · 3–6 Losfahren · 6–9,6 Baustellenstrasse (Summi, Kranmeister Haki: High-Five) · 9,6–14 Walter hupt,
   Toertchen, „Party?!", saust vorbei · 14–16,5 Abrissbirne: KRACH, Ziegel fliegen · 16,5–17,8 Party-Baustelle
   (Richtfest) · 17,8–19,2 Brummi baggert die goldene Alterszahl aus dem Sand · 19,2–21,9 Fanfare, Ruehrbert spuckt
   Konfetti, Paules Helm fliegt auf Walter · 20,5–24 Bauplan-Karte
   ============================================================ */
const P_DUR=24, P_N=P_DUR*FPS;
const HORIZON=1150, GROUND_Y=1330;
const R0=rng(91);
const SHAKE=Array.from({length:P_N+1},()=>[(R0()-.5)*2,(R0()-.5)*2]);
const BRICKS=Array.from({length:90},()=>({a:-Math.PI*0.72+(R0()-.5)*1.3,v:500+R0()*650,w:16+R0()*16,h:9+R0()*6,rot:R0()*6.28,spin:(R0()-.5)*10,c:['#A8321C','#C94F2C','#E0B090','#8A8F99','#F6C21A','#F4F1E8'][Math.floor(R0()*6)]}));
const CONF=Array.from({length:110},()=>({a:-Math.PI/2+(R0()-.5)*1.5,v:600+R0()*600,w:14+R0()*14,h:9+R0()*9,rot:R0()*6.28,spin:(R0()-.5)*9,c:['#F6C21A','#F28C28','#2F6DB5','#F4F1E8','#FF6F91','#7CE0C3','#FFFFFF'][Math.floor(R0()*7)]}));
const BUILD=Array.from({length:10},(_,k)=>({x:k*190+R0()*60,w:90+R0()*90,h:160+R0()*260}));
const MID=Array.from({length:12},(_,k)=>({x:k*330+R0()*140,kind:Math.floor(R0()*4)}));
const STONES=Array.from({length:22},()=>({x:R0()*2800,y:1450+R0()*420,r:4+R0()*8,kind:Math.floor(R0()*3),rot:R0()*6.28}));
const STREAKS=Array.from({length:12},()=>({x:R0()*1600,y:600+R0()*560,len:120+R0()*220}));
const IDA_URI='/*__IDA__*/';

/* ---------- Fahrt: Welt-Scroll ---------- */
function speed(t){ if(t<3) return 0; if(t<4) return 650*easeIn(seg(t,3,4)); if(t<10.4) return 650; if(t<10.8) return 650*(1-easeOut(seg(t,10.4,10.8))); if(t<13.8) return 0; if(t<14.6) return 950*easeIn(seg(t,13.8,14.6)); if(t<16.5) return 950; if(t<17.8) return 950*(1-easeOut(seg(t,16.5,17.8))); return 0; }
const SCX=[0], STEP=[0]; for(let i=1;i<=P_N;i++){ const v=speed((i-.5)/FPS); SCX[i]=SCX[i-1]+v/FPS; STEP[i]=STEP[i-1]+(v/380)/FPS; } const SCX_END=SCX[P_N];
function mountX(t){ return lerp(540,360,easeInOut(seg(t,16.6,17.8))); }
function mountY(t,i){ return GROUND_Y-(speed(t)>150?4*Math.abs(Math.sin(STEP[i]*Math.PI*4)):2*Math.sin(t*1.6)); }
function mountPoint(lx,ly,t,i){ return {x:mountX(t)+lx, y:mountY(t,i)+ly}; }

/* ---------- Himmel, Skyline, Boden ---------- */
const SKY=[[0,'#5F8FC8','#DCEAF5'],[6,'#4F93D6','#DCEAF5'],[9.5,'#4F93D6','#DCEAF5'],[11.5,'#3B5F8A','#9AAFC4'],[13.6,'#4F93D6','#DCEAF5'],[14.8,'#5B3A7E','#F58B4C'],[17.5,'#3B2D62','#F0A868'],[24,'#2B2350','#E9A26B']];
const SKYL=[[0,'#8FA3B8'],[9.5,'#8FA3B8'],[11.5,'#4E5F73'],[13.6,'#8FA3B8'],[14.8,'#6E5878'],[17.5,'#4A3F66'],[24,'#3A3560']];
const GRAV=[[0,'#C9B68F','#A89571'],[9.5,'#C9B68F','#A89571'],[11.5,'#8E8064','#6E6350'],[13.6,'#C9B68F','#A89571'],[14.8,'#A88572','#7A5E58'],[17.5,'#7A6A8A','#584C6E'],[24,'#665A80','#4A4064']];
const ROAD=[[0,'#4A5059','#3A3F47'],[11.5,'#34383F','#262A30'],[13.6,'#4A5059','#3A3F47'],[14.8,'#4A4058','#332C40'],[24,'#3A3450','#28243A']];
function keyed(list,t,idx){ let a=list[0], b=list[list.length-1]; for(let k=0;k<list.length-1;k++){ if(t>=list[k][0]&&t<=list[k+1][0]){ a=list[k]; b=list[k+1]; break; } } return mixHex(a[idx],b[idx],seg(t,a[0],b[0])); }
function sky(t){ const g=ctx.createLinearGradient(0,0,0,HORIZON); g.addColorStop(0,keyed(SKY,t,1)); g.addColorStop(1,keyed(SKY,t,2)); ctx.fillStyle=g; ctx.fillRect(0,0,W,HORIZON+4); }
function sun(t){ if(t<10){ const a=1-seg(t,8,10); const y=760-t*12; ctx.save(); ctx.globalAlpha=a; dots([[200,y,58]],'#FFE29A'); ctx.globalCompositeOperation='lighter'; const g=ctx.createRadialGradient(200,y,0,200,y,220); g.addColorStop(0,'rgba(255,200,120,0.35)'); g.addColorStop(1,'rgba(255,200,120,0)'); ctx.fillStyle=g; ctx.fillRect(-20,y-220,440,440); ctx.restore(); } }
const CLOUDS=[[100,220,110],[420,140,140],[760,260,120],[1000,120,100],[1250,200,130],[1500,300,110]];
function clouds(i){ const span=W+800; for(const [cx,cy,r] of CLOUDS){ const x=((cx-SCX[i]*0.2)%span+span)%span-400; ctx.fillStyle='rgba(255,255,255,0.85)'; for(const [dx,dy,rr] of [[0,0,r],[-r*.7,r*.25,r*.75],[r*.75,r*.2,r*.7],[-r*.2,-r*.35,r*.6]]){ ctx.beginPath(); ctx.arc(x+dx,cy+dy,rr,0,6.29); ctx.fill(); } } }
function skyline(i,t){ const span=1900; const c=keyed(SKYL,t,1); ctx.fillStyle=c; ctx.strokeStyle=c; for(const b of BUILD){ const x=((b.x-SCX[i]*0.3)%span+span)%span-300; ctx.fillRect(x,HORIZON-b.h,b.w,b.h+10); for(let wy=HORIZON-b.h+30;wy<HORIZON-30;wy+=46) for(let wx=x+14;wx<x+b.w-20;wx+=30){ ctx.fillStyle='rgba(255,235,170,0.35)'; ctx.fillRect(wx,wy,12,16); } ctx.fillStyle=c; }
  /* zwei Turmkraene */ ctx.lineWidth=8; ctx.lineCap='butt'; for(const kx of [500,1400]){ const x=((kx-SCX[i]*0.3)%span+span)%span-300; ctx.beginPath(); ctx.moveTo(x,HORIZON+10); ctx.lineTo(x,700); ctx.moveTo(x-90,712); ctx.lineTo(x+280,712); ctx.moveTo(x,700); ctx.lineTo(x+120,690); ctx.moveTo(x+250,712); ctx.lineTo(x+250,860); ctx.stroke(); ctx.fillRect(x-24,700,48,40); } }
function ground(i,t){ const g1=ctx.createLinearGradient(0,HORIZON,0,GROUND_Y-30); g1.addColorStop(0,keyed(GRAV,t,1)); g1.addColorStop(1,keyed(GRAV,t,2)); ctx.fillStyle=g1; ctx.fillRect(0,HORIZON,W,GROUND_Y-30-HORIZON);
  /* Strasse */ ctx.fillStyle=keyed(ROAD,t,1); ctx.fillRect(0,GROUND_Y-30,W,120); ctx.fillStyle=keyed(ROAD,t,2); ctx.fillRect(0,GROUND_Y-30,W,10); ctx.fillRect(0,GROUND_Y+82,W,8); ctx.fillStyle='rgba(255,255,255,0.75)'; for(let k=0;k<12;k++){ const x=((k*260-SCX[i])%3120+3120)%3120-200; ctx.fillRect(x,GROUND_Y+26,120,8); }
  const g2=ctx.createLinearGradient(0,GROUND_Y+90,0,H); g2.addColorStop(0,keyed(GRAV,t,1)); g2.addColorStop(1,keyed(GRAV,t,2)); ctx.fillStyle=g2; ctx.fillRect(0,GROUND_Y+90,W,H-GROUND_Y-90);
  for(const s of STONES){ const x=((s.x-SCX[i])%2800+2800)%2800-150; if(s.kind===0) dots([[x,s.y,s.r]],'rgba(80,70,60,0.35)'); else if(s.kind===1) screw(x,s.y,s.rot); else plank(x,s.y,s.rot); }
  /* Pylonenreihe am Strassenrand */ for(let k=0;k<14;k++){ const x=1300+k*260-SCX[i]; if(x<-60||x>W+60) continue; cone(x,GROUND_Y+118,0.8,false); } }
function screw(x,y,rot){ ctx.save(); ctx.translate(x,y); ctx.rotate(rot); ctx.fillStyle='#8A8F99'; ctx.fillRect(-4,-16,8,32); ctx.beginPath(); ctx.arc(0,-18,9,0,6.29); ctx.fill(); ctx.strokeStyle='#4A5059'; ctx.lineWidth=2; for(let k=-10;k<12;k+=6){ ctx.beginPath(); ctx.moveTo(-4,k); ctx.lineTo(4,k+3); ctx.stroke(); } ctx.restore(); }
function plank(x,y,rot){ ctx.save(); ctx.translate(x,y); ctx.rotate(rot*0.3); ctx.fillStyle='#A8763F'; rrect(-60,-9,120,18,4); ctx.fill(); ctx.strokeStyle='#7A5228'; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(-50,0); ctx.lineTo(50,0); ctx.stroke(); ctx.restore(); }
function cone(x,y,s,hat){ ctx.save(); ctx.translate(x,y); ctx.scale(s,s); ctx.fillStyle='#2A2E33'; rrect(-40,-10,80,14,4); ctx.fill(); ctx.fillStyle='#F28C28'; ctx.beginPath(); ctx.moveTo(-30,-6); ctx.lineTo(-9,-110); ctx.lineTo(9,-110); ctx.lineTo(30,-6); ctx.closePath(); ctx.fill(); ctx.fillStyle='#F4F1E8'; ctx.beginPath(); ctx.moveTo(-23,-40); ctx.lineTo(-18,-64); ctx.lineTo(18,-64); ctx.lineTo(23,-40); ctx.closePath(); ctx.fill(); if(hat) partyHat(0,-108,-0.15); ctx.restore(); }
function stripes(x,y,w,h){ ctx.save(); ctx.beginPath(); ctx.rect(x,y,w,h); ctx.clip(); ctx.fillStyle='#F6C21A'; ctx.fillRect(x,y,w,h); ctx.fillStyle='#1E2228'; for(let sx=x-h;sx<x+w+h;sx+=h*2){ ctx.beginPath(); ctx.moveTo(sx,y+h); ctx.lineTo(sx+h,y); ctx.lineTo(sx+h*1.9,y); ctx.lineTo(sx+h*0.9,y+h); ctx.closePath(); ctx.fill(); } ctx.restore(); }
function midLayer(i,t){ const span=12*330; for(const m of MID){ const x=((m.x-SCX[i]*0.6)%span+span)%span-300; const base=GROUND_Y-30;
  if(m.kind===0){ /* Bauzaun */ ctx.strokeStyle='#8A8F99'; ctx.lineWidth=6; ctx.strokeRect(x,base-150,220,150); for(let k=1;k<4;k++){ ctx.beginPath(); ctx.moveTo(x,base-150+k*37); ctx.lineTo(x+220,base-150+k*37); ctx.stroke(); } ctx.lineWidth=3; for(let k=1;k<7;k++){ ctx.beginPath(); ctx.moveTo(x+k*31,base-150); ctx.lineTo(x+k*31,base); ctx.stroke(); } }
  else if(m.kind===1){ /* Container */ ctx.fillStyle='#2F6DB5'; rrect(x,base-170,240,170,8); ctx.fill(); ctx.fillStyle='#255A96'; for(let k=0;k<6;k++) ctx.fillRect(x+16+k*38,base-160,10,150); ctx.fillStyle='#F4F1E8'; rrect(x+150,base-130,60,50,6); ctx.fill(); }
  else if(m.kind===2){ /* Absperrbaken + Kieshaufen */ ctx.fillStyle='#8A8F99'; ctx.beginPath(); ctx.ellipse(x+60,base,110,70,0,Math.PI,2*Math.PI); ctx.fill(); ctx.fillStyle='#F4F1E8'; rrect(x+200,base-120,90,26,6); ctx.fill(); ctx.fillStyle='#D93B2B'; ctx.fillRect(x+206,base-120,20,26); ctx.fillRect(x+246,base-120,20,26); ctx.fillStyle='#4A5059'; ctx.fillRect(x+210,base-94,8,94); ctx.fillRect(x+272,base-94,8,94); }
  else { /* Kipplaster parkt */ ctx.fillStyle='#F28C28'; rrect(x,base-150,200,90,10); ctx.fill(); ctx.fillStyle='#D9700F'; rrect(x+200,base-120,70,60,8); ctx.fill(); ctx.fillStyle='#2A2E33'; ctx.fillRect(x-4,base-60,280,26); dots([[x+40,base-22,30],[x+230,base-22,30]],'#2A2E33'); dots([[x+40,base-22,12],[x+230,base-22,12]],'#8A8F99'); ctx.fillStyle='#8FB8E8'; rrect(x+212,base-112,40,26,4); ctx.fill(); } } }

/* ---------- Abrisskran mit Birne und alter Mauer (Hintergrund, faehrt waehrend des Vollgas vorbei) ---------- */
const WRECK_X0=1100+0.8*(SCX[F(15.0)]-SCX[F(13.5)]);   /* KRACH bei 15,0 s genau bei x=1100 */
function wreckX(i){ return WRECK_X0+(SCX[F(13.5)]-SCX[i])*0.8; }
function ballAngle(t){ if(t<14.5) return 0.45+0.05*Math.sin(t*2); if(t<15.0) return lerp(0.45,-0.62,easeIn(seg(t,14.5,15.0))); return lerp(-0.62,0.15,easeOut(seg(t,15.0,16.2)))+0.06*Math.sin((t-15.0)*5)*(1-seg(t,15.0,17.0)); }
function wreck(i,t){ const x=wreckX(i); if(x<-500||x>W+500) return; const tipx=x+170, tipy=600;
  /* alte Mauer */ const broken=t>=15.0; for(let r=0;r<(broken?2:6);r++){ const y=HORIZON-r*50; for(let c=0;c<4;c++){ ctx.fillStyle=(r+c)%2?'#A8321C':'#B84A2E'; rrect(x-240+c*50+(r%2)*25,y-46,46,42,4); ctx.fill(); } } if(broken){ ctx.fillStyle='#A8321C'; for(const [bx,by,rot] of [[x-260,HORIZON-70,0.3],[x-40,HORIZON-64,-0.5],[x-150,HORIZON-118,0.2]]){ ctx.save(); ctx.translate(bx,by); ctx.rotate(rot); rrect(-23,-21,46,42,4); ctx.fill(); ctx.restore(); } }
  /* Kran */ ctx.fillStyle='#3A3F47'; rrect(x-80,HORIZON-40,160,40,10); ctx.fill(); ctx.fillStyle='#F6C21A'; rrect(x-60,HORIZON-104,110,64,10); ctx.fill(); ctx.fillStyle='#8FB8E8'; rrect(x-50,HORIZON-96,40,30,4); ctx.fill(); ctx.strokeStyle='#5A616B'; ctx.lineWidth=8; ctx.beginPath(); ctx.moveTo(x-20,HORIZON-100); ctx.lineTo(tipx-10,tipy); ctx.moveTo(x+14,HORIZON-100); ctx.lineTo(tipx+10,tipy); ctx.stroke(); ctx.lineWidth=4; for(let k=1;k<8;k++){ const u=k/8; ctx.beginPath(); ctx.moveTo(lerp(x-20,tipx-10,u),lerp(HORIZON-100,tipy,u)); ctx.lineTo(lerp(x+14,tipx+10,u-0.06),lerp(HORIZON-100,tipy,u-0.06)); ctx.stroke(); }
  /* Birne */ const a=ballAngle(t); const bx=tipx+400*Math.sin(a), by=tipy+400*Math.cos(a); ctx.strokeStyle='#4A5059'; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(tipx,tipy); ctx.lineTo(bx,by); ctx.stroke(); dots([[bx,by,48]],'#2A2E33'); dots([[bx-14,by-16,12]],'rgba(255,255,255,0.25)');
  /* Staubwolke beim KRACH */ if(t>=15.0&&t<16.0){ const u=seg(t,15.0,16.0); ctx.save(); ctx.globalAlpha=0.55*(1-u); for(let n=0;n<6;n++){ dots([[x-100+n*40-u*30*(n%2?1:-1),HORIZON-40-u*160-n*18,40+u*60]],'#B8B0A0'); } ctx.restore(); } }
function brickConfetti(i,t){ const t0=15.0, dur=2.4; if(t<t0) return; const tt=t-t0; if(tt>dur) return; const sx=wreckX(i)-62, sy=925; for(const c of BRICKS){ const px=sx+Math.cos(c.a)*c.v*tt, py=sy+Math.sin(c.a)*c.v*tt+0.5*1300*tt*tt; if(py>H+40) continue; ctx.save(); ctx.globalAlpha=1-seg(tt,dur-0.6,dur); ctx.translate(px,py); ctx.rotate(c.rot+c.spin*tt); ctx.fillStyle=c.c; ctx.fillRect(-c.w/2,-c.h/2,c.w,c.h); ctx.restore(); } }
function partyConfetti(t,sx,sy,t0,dur){ if(t<t0) return; const tt=t-t0; if(tt>dur) return; for(const c of CONF){ const px=sx+Math.cos(c.a)*c.v*tt, py=sy+Math.sin(c.a)*c.v*tt+0.5*1100*tt*tt; if(py>H+40) continue; ctx.save(); ctx.globalAlpha=1-seg(tt,dur-0.7,dur); ctx.translate(px,py); ctx.rotate(c.rot+c.spin*tt); ctx.fillStyle=c.c; ctx.fillRect(-c.w/2,-c.h/2,c.w,c.h); ctx.restore(); } }
function streaks(i,t){ const a=Math.min(seg(t,14.0,14.5),1-seg(t,16.2,16.8)); if(a<=0) return; ctx.strokeStyle=`rgba(255,255,255,${(0.28*a).toFixed(2)})`; ctx.lineWidth=4; ctx.lineCap='round'; for(const s of STREAKS){ const x=((s.x-SCX[i]*1.6)%1800+1800)%1800-300; ctx.beginPath(); ctx.moveTo(x,s.y); ctx.lineTo(x+s.len,s.y); ctx.stroke(); } }

/* ---------- Bauhof (Start) ---------- */
function depot(i){ const ox=-SCX[i]; if(ox<-1500) return; const base=GROUND_Y-30;
  /* Buerocontainer */ ctx.fillStyle='#2F6DB5'; rrect(ox-40,base-230,330,230,10); ctx.fill(); ctx.fillStyle='#255A96'; for(let k=0;k<8;k++) ctx.fillRect(ox-24+k*40,base-220,10,210); ctx.fillStyle='#8FB8E8'; rrect(ox+40,base-190,80,60,6); ctx.fill(); rrect(ox+170,base-190,80,60,6); ctx.fill(); ctx.fillStyle='#F4F1E8'; rrect(ox+60,base-268,170,44,8); ctx.fill(); text('BAUHOF',ox+145,base-246,fontB(30),'#1A1D21'); ctx.fillStyle='#4A5059'; rrect(ox+100,base-120,60,120,6); ctx.fill();
  /* Rohrstapel */ for(const [px,py] of [[ox+360,base-30],[ox+420,base-30],[ox+480,base-30],[ox+390,base-82],[ox+450,base-82],[ox+420,base-134]]){ dots([[px,py,30]],'#8A8F99'); dots([[px,py,18]],'#3A3F47'); }
  /* Schubkarre */ ctx.fillStyle='#F28C28'; ctx.beginPath(); ctx.moveTo(ox+560,base-90); ctx.lineTo(ox+680,base-90); ctx.lineTo(ox+660,base-30); ctx.lineTo(ox+580,base-30); ctx.closePath(); ctx.fill(); dots([[ox+600,base-14,20]],'#2A2E33'); ctx.strokeStyle='#4A5059'; ctx.lineWidth=8; ctx.beginPath(); ctx.moveTo(ox+680,base-90); ctx.lineTo(ox+740,base-120); ctx.stroke();
  /* Wegweiser */ ctx.fillStyle='#8A6A4B'; ctx.fillRect(ox+880,base-240,16,240); ctx.fillStyle='#F6C21A'; ctx.beginPath(); ctx.moveTo(ox+770,base-210); ctx.lineTo(ox+1010,base-210); ctx.lineTo(ox+1050,base-180); ctx.lineTo(ox+1010,base-150); ctx.lineTo(ox+770,base-150); ctx.closePath(); ctx.fill(); text('PARTY-BAUSTELLE',ox+900,base-178,fitFont('PARTY-BAUSTELLE',220,28,18),'#1A1D21'); }

/* ---------- Party-Baustelle (Endposition, per Offset eingefahren) ---------- */
const SAND_X=660, PAULE={x:880,y:GROUND_Y}, HELM_HOME={x:880,y:GROUND_Y-270};
function helmet(x,y,rot,s){ ctx.save(); ctx.translate(x,y); ctx.rotate(rot); ctx.scale(s,s); ctx.fillStyle='#F6C21A'; ctx.beginPath(); ctx.arc(0,-6,32,Math.PI,2*Math.PI); ctx.fill(); ctx.fillRect(-32,-8,64,8); ctx.beginPath(); ctx.ellipse(0,0,42,8,0,0,6.29); ctx.fill(); ctx.fillStyle='#D9A400'; rrect(-6,-40,12,30,4); ctx.fill(); ctx.beginPath(); ctx.ellipse(0,0,42,8,0,0,Math.PI); ctx.fill(); ctx.restore(); }
function partyHat(x,y,rot){ ctx.save(); ctx.translate(x,y); ctx.rotate(rot); ctx.fillStyle='#F6C21A'; ctx.beginPath(); ctx.moveTo(-30,0); ctx.lineTo(0,-70); ctx.lineTo(30,0); ctx.closePath(); ctx.fill(); ctx.fillStyle='#2F6DB5'; ctx.beginPath(); ctx.moveTo(-18,-28); ctx.lineTo(0,-70); ctx.lineTo(18,-28); ctx.closePath(); ctx.fill(); dots([[0,-72,7]],'#FF6F91'); ctx.restore(); }
function helmPos(t){ if(t<20.9){ const u=seg(t,20.2,20.9); return {x:lerp(HELM_HOME.x,40,u),y:lerp(HELM_HOME.y,1046,u)-520*Math.sin(Math.PI*u),rot:u*Math.PI*2}; } const b=seg(t,20.9,21.2); return {x:40,y:1046-(b<1?8*Math.sin(b*Math.PI):0),rot:0.06}; }
function paule(t){ const x=PAULE.x, y=PAULE.y; ctx.save(); ctx.translate(x,y);
  ctx.fillStyle='#2F6DB5'; rrect(-32,-96,26,96,8); ctx.fill(); rrect(6,-96,26,96,8); ctx.fill(); ctx.fillStyle='#4A3320'; rrect(-38,-16,34,18,6); ctx.fill(); rrect(4,-16,34,18,6); ctx.fill();
  ctx.fillStyle='#2F6DB5'; rrect(-48,-206,96,124,22); ctx.fill(); ctx.fillStyle='#F28C28'; rrect(-42,-202,84,66,14); ctx.fill(); ctx.fillStyle='#D9DDE3'; ctx.fillRect(-42,-184,84,8); ctx.fillRect(-42,-160,84,8);
  ctx.strokeStyle='#F6C9A4'; ctx.lineWidth=18; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(-46,-186); ctx.lineTo(-72,-112); ctx.stroke(); const wv=Math.sin(t*6)*12; ctx.beginPath(); ctx.moveTo(46,-186); ctx.lineTo(84,-250+wv); ctx.stroke(); dots([[-72,-112,11],[84,-250+wv,12]],'#F6C9A4');
  dots([[0,-236,34]],'#F6C9A4'); ctx.fillStyle='#6E4620'; ctx.beginPath(); ctx.ellipse(0,-220,25,14,0,0,6.29); ctx.fill(); dots([[-11,-246,4],[11,-246,4]],'#111'); ctx.strokeStyle='#4A2A1A'; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(0,-232,10,0.2*Math.PI,0.8*Math.PI); ctx.stroke();
  ctx.restore(); }
function ruehrbert(t){ ctx.fillStyle='#2A2E33'; rrect(890,1230,220,50,10); ctx.fill(); dots([[930,1290,34],[1060,1290,34]],'#2A2E33'); dots([[930,1290,13],[1060,1290,13]],'#8A8F99');
  ctx.fillStyle='#F6C21A'; rrect(1036,1150,84,110,12); ctx.fill(); ctx.fillStyle='#8FB8E8'; rrect(1046,1160,50,44,6); ctx.fill(); dots([[1080,1182,7]],'#FFFFFF'); dots([[1082,1183,3.5]],'#111');
  ctx.save(); ctx.translate(975,1160); ctx.rotate(-0.35); ctx.beginPath(); ctx.ellipse(0,0,96,62,0,0,6.29); ctx.fillStyle='#F28C28'; ctx.fill(); ctx.save(); ctx.clip(); ctx.fillStyle='#F4F1E8'; const off=(t*70)%64; for(let k=-3;k<3;k++){ ctx.save(); ctx.translate(-96+off+k*64,0); ctx.rotate(0.6); ctx.fillRect(-9,-90,18,180); ctx.restore(); } ctx.restore(); ctx.strokeStyle='#D9700F'; ctx.lineWidth=5; ctx.beginPath(); ctx.ellipse(0,0,96,62,0,0,6.29); ctx.stroke(); ctx.restore();
  ctx.fillStyle='#4A5059'; rrect(880,1090,50,34,8); ctx.fill(); ctx.fillRect(900,1120,20,30); }
function crane(t){ const mx=1000, top=520;
  /* Gitterturm */ ctx.strokeStyle='#F6C21A'; ctx.lineWidth=9; ctx.lineCap='butt'; ctx.beginPath(); ctx.moveTo(mx-24,GROUND_Y-30); ctx.lineTo(mx-24,top); ctx.moveTo(mx+24,GROUND_Y-30); ctx.lineTo(mx+24,top); ctx.stroke(); ctx.strokeStyle='#D9A400'; ctx.lineWidth=4; for(let y=GROUND_Y-40;y>top+20;y-=60){ ctx.beginPath(); ctx.moveTo(mx-24,y); ctx.lineTo(mx+24,y-60); ctx.moveTo(mx+24,y); ctx.lineTo(mx-24,y-60); ctx.stroke(); }
  /* Ausleger, Gegengewicht, Halteseile, Kabine */ jib(560,1100,top,t); ctx.fillStyle='#4A5059'; rrect(1060,top-30,60,56,6); ctx.fill(); ctx.strokeStyle='#8A8F99'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(mx,top-96); ctx.lineTo(570,top-16); ctx.moveTo(mx,top-96); ctx.lineTo(1090,top-16); ctx.stroke(); ctx.fillStyle='#F6C21A'; ctx.fillRect(mx-6,top-100,12,84); rrect(mx-44,top+18,88,60,8); ctx.fill(); ctx.fillStyle='#8FB8E8'; rrect(mx-34,top+26,46,30,4); ctx.fill();
  /* Wimpelkette unter dem Ausleger */ ctx.strokeStyle='#4A5059'; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(566,top+20); ctx.quadraticCurveTo(780,top+74,1000,top+20); ctx.stroke(); for(let k=1;k<12;k++){ const u=k/12; const px=(1-u)*(1-u)*566+2*u*(1-u)*780+u*u*1000, py=(1-u)*(1-u)*(top+20)+2*u*(1-u)*(top+74)+u*u*(top+20); ctx.fillStyle=['#D93B2B','#F6C21A','#2F6DB5','#F28C28'][k%4]; ctx.beginPath(); ctx.moveTo(px-14,py); ctx.lineTo(px+14,py); ctx.lineTo(px+3*Math.sin(t*3+k),py+30); ctx.closePath(); ctx.fill(); }
  /* Laufkatze, Seil, Kranmeister Haki haelt das Schild */ const tx=850; ctx.fillStyle='#4A5059'; rrect(tx-26,top+16,52,22,4); ctx.fill(); ctx.strokeStyle='#6B7280'; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(tx-8,top+38); ctx.lineTo(tx-8,592); ctx.moveTo(tx+8,top+38); ctx.lineTo(tx+8,592); ctx.stroke(); hakiBlock(tx,662,t); ctx.strokeStyle='#6B7280'; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(tx-6,696); ctx.lineTo(712,772); ctx.moveTo(tx-6,696); ctx.lineTo(988,772); ctx.stroke();
  { const name=nameVal(); ctx.fillStyle='#F4F1E8'; rrect(705,770,290,110,10); ctx.fill(); stripes(705,770,290,14); ctx.strokeStyle='#1E2228'; ctx.lineWidth=5; rrect(705,770,290,110,10); ctx.stroke(); text('Willkommen,',850,810,fontB(34,700),'#1A1D21'); text(name+'!',850,852,fitFont(name+'!',260,48,26),'#D93B2B'); } }
function site(i,t){ const ox=620+(SCX_END-SCX[i]); if(ox>W+700) return; ctx.save(); ctx.translate(ox-620,0); const base=GROUND_Y-30;
  /* Richtfest-Haeuschen (Holzrahmen) */ ctx.strokeStyle='#A8763F'; ctx.lineWidth=22; ctx.lineCap='round'; ctx.beginPath(); for(const px of [740,895,1050]){ ctx.moveTo(px,base); ctx.lineTo(px,1040); } ctx.moveTo(740,1040); ctx.lineTo(1050,1040); ctx.moveTo(740,1170); ctx.lineTo(1050,1170); ctx.stroke(); ctx.lineWidth=18; ctx.beginPath(); ctx.moveTo(740,1040); ctx.lineTo(895,890); ctx.lineTo(1050,1040); ctx.stroke(); ctx.lineWidth=8; ctx.beginPath(); for(const [yy] of [[960],[1000]]){ const dx=(yy-890)/(1040-890)*155; ctx.moveTo(895-dx,yy); ctx.lineTo(895+dx,yy); } ctx.stroke();
  /* Richtkranz */ ctx.strokeStyle='#2F8F6A'; ctx.lineWidth=14; ctx.beginPath(); ctx.arc(895,952,38,0,6.29); ctx.stroke(); dots([[880,924,5],[912,928,5],[861,960,5],[928,962,5],[895,986,5]],'#F4F1E8'); ctx.lineWidth=5; for(const [c,dx] of [['#D93B2B',-16],['#F6C21A',0],['#2F6DB5',16]]){ ctx.strokeStyle=c; ctx.beginPath(); ctx.moveTo(895+dx,988); ctx.quadraticCurveTo(895+dx*1.6,1030,895+dx*2,1060+6*Math.sin(t*2+dx)); ctx.stroke(); }
  crane(t);
  /* Pylonen mit Partyhut, Sandhaufen mit Schaufel */ cone(500,base+8,1,true); cone(790,base+8,1,true);
  ctx.fillStyle='#E3C98A'; ctx.beginPath(); ctx.ellipse(SAND_X,GROUND_Y,120,95,0,Math.PI,2*Math.PI); ctx.fill(); ctx.strokeStyle='rgba(120,90,50,0.35)'; ctx.lineWidth=4; for(const [dx,dy] of [[-60,-30],[10,-60],[50,-20]]){ ctx.beginPath(); ctx.moveTo(SAND_X+dx,GROUND_Y+dy); ctx.quadraticCurveTo(SAND_X+dx+25,GROUND_Y+dy-8,SAND_X+dx+50,GROUND_Y+dy); ctx.stroke(); } ctx.strokeStyle='#8A6A4B'; ctx.lineWidth=10; ctx.beginPath(); ctx.moveTo(SAND_X+66,GROUND_Y-70); ctx.lineTo(SAND_X+96,GROUND_Y-190); ctx.stroke(); ctx.fillStyle='#8A8F99'; ctx.beginPath(); ctx.moveTo(SAND_X+50,GROUND_Y-40); ctx.lineTo(SAND_X+86,GROUND_Y-90); ctx.lineTo(SAND_X+30,GROUND_Y-90); ctx.closePath(); ctx.fill();
  ruehrbert(t); paule(t); if(t>=16.2&&t<20.2) helmet(HELM_HOME.x,HELM_HOME.y,-0.08,1);   /* Paules Helm faehrt mit der Szene ein */
  ctx.restore(); }

/* ---------- Brummi + Bauleiter-Kind ---------- */
const L1=360, L2=300, PIV={x:70,y:-250};
function armIK(tx,ty,up){ let d=Math.hypot(tx,ty); if(d>L1+L2-2){ const s=(L1+L2-2)/d; tx*=s; ty*=s; d=L1+L2-2; } const a=Math.atan2(ty,tx); const c1=clamp((L1*L1+d*d-L2*L2)/(2*L1*d),-1,1); const th1=up?a-Math.acos(c1):a+Math.acos(c1); const ex=L1*Math.cos(th1), ey=L1*Math.sin(th1); const th2=Math.atan2(ty-ey,tx-ex); return {th1,th2}; }
const ANG={ REST:armIK(270,-130,true), HIGH:armIK(250,-540,true), DUCK:armIK(120,-80,true), DIG:armIK(230,210,true), LIFT:armIK(300,-460,true) };
function mixAng(a,b,u){ return {th1:lerp(a.th1,b.th1,u), th2:lerp(a.th2,b.th2,u)}; }
function armState(t){ let ang=ANG.REST, bk=0;
  if(t>=7.6&&t<8.0) ang=mixAng(ANG.REST,ANG.HIGH,easeInOut(seg(t,7.6,8.0)));
  else if(t>=8.0&&t<8.5){ ang=ANG.HIGH; bk=0.5; if(t>=8.15&&t<8.45) ang={th1:ang.th1+0.05*Math.sin((t-8.15)*40),th2:ang.th2}; }
  else if(t>=8.5&&t<9.0) ang=mixAng(ANG.HIGH,ANG.REST,easeInOut(seg(t,8.5,9.0)));
  else if(t>=10.6&&t<11.0) ang=mixAng(ANG.REST,ANG.DUCK,easeInOut(seg(t,10.6,11.0)));
  else if(t>=11.0&&t<12.4) ang=ANG.DUCK;
  else if(t>=12.4&&t<12.9) ang=mixAng(ANG.DUCK,ANG.REST,easeInOut(seg(t,12.4,12.9)));
  else if(t>=17.8&&t<18.4) ang=mixAng(ANG.REST,ANG.DIG,easeInOut(seg(t,17.8,18.4)));
  else if(t>=18.4&&t<18.8){ ang=ANG.DIG; bk=easeInOut(seg(t,18.4,18.8)); }
  else if(t>=18.8&&t<19.4){ ang=mixAng(ANG.DIG,ANG.LIFT,easeInOut(seg(t,18.8,19.4))); bk=1; }
  else if(t>=19.4){ ang={th1:ANG.LIFT.th1+0.02*Math.sin(t*1.5),th2:ANG.LIFT.th2}; bk=1; }
  if(t>=8.0&&t<8.5) bk=0.5;
  return {th1:ang.th1,th2:ang.th2,bk,hasNumber:t>=18.8}; }
function mount(t,i){ const mx=mountX(t), my=mountY(t,i); const flagUp=Math.min(seg(t,11.8,12.2),1-seg(t,13.4,13.8)); const arm=armState(t); const moving=speed(t)>150;
  ctx.save(); ctx.translate(mx,my);
  /* Ketten */ ctx.fillStyle='#3A3F47'; rrect(-200,-120,400,120,55); ctx.fill(); ctx.fillStyle='#4A5059'; rrect(-185,-105,370,90,44); ctx.fill(); dots([[-130,-60,38],[130,-60,38]],'#2A2E33'); dots([[-130,-60,14],[130,-60,14]],'#8A8F99'); dots([[-60,-46,16],[0,-46,16],[60,-46,16]],'#2A2E33'); ctx.fillStyle='#8A8F99'; for(let k=0;k<12;k++){ const xx=-196+((k*34+STEP[i]*400)%400); ctx.fillRect(xx,-124,9,12); ctx.fillRect(xx,-8,9,12); }
  /* Chassis + Warnband + Auspuff */ ctx.fillStyle='#F6C21A'; rrect(-185,-240,370,122,18); ctx.fill(); ctx.fillStyle='#D9A400'; rrect(-185,-240,70,122,18); ctx.fill(); stripes(-185,-142,370,22); ctx.fillStyle='#6B7280'; rrect(150,-318,18,80,6); ctx.fill(); ctx.fillStyle='#4A5059'; rrect(144,-326,30,12,4); ctx.fill();
  /* Wimpel auf dem Dach (hinter Kabine und Arm) */ ctx.save(); ctx.translate(-150,-600); ctx.rotate(-0.08); const ext=150*flagUp; ctx.fillStyle='#8A6A4B'; ctx.fillRect(-5,-240-ext,10,250+ext); const fw=Math.sin(t*9)*12; ctx.fillStyle='#D93B2B'; ctx.beginPath(); ctx.moveTo(5,-238-ext); ctx.quadraticCurveTo(70,-220-ext+fw,140,-210-ext+fw); ctx.lineTo(5,-160-ext); ctx.closePath(); ctx.fill(); ctx.strokeStyle='#F6C21A'; ctx.lineWidth=4; ctx.stroke(); ctx.fillStyle='#F2EAD6'; rrect(40,-216-ext+fw*0.6,34,20,5); ctx.fill(); ctx.fillStyle='#FF6F91'; ctx.fillRect(40,-212-ext+fw*0.6,34,6); ctx.fillStyle='#64B5F6'; ctx.fillRect(50,-228-ext+fw*0.6,4,12); ctx.fillRect(60,-228-ext+fw*0.6,4,12); dots([[52,-231-ext+fw*0.6,3],[62,-231-ext+fw*0.6,3]],'#FFB53A'); ctx.restore();
  /* Kabine: Rueckwand, Sitz, Dach, Pfosten */ ctx.fillStyle='#F6C21A'; rrect(-185,-570,70,332,16); ctx.fill(); ctx.fillStyle='#3A3F47'; rrect(-125,-330,115,32,8); ctx.fill(); ctx.fillStyle='#D9A400'; ctx.fillRect(-10,-600,14,270); ctx.fillStyle='#F6C21A'; rrect(-198,-602,212,26,8); ctx.fill();
  /* Kind: Weste, Arme, Hebel */ ctx.fillStyle='#2F6DB5'; rrect(-140,-412,100,60,20); ctx.fill(); ctx.fillStyle='#F28C28'; rrect(-135,-410,90,124,26); ctx.fill(); ctx.fillStyle='#D9DDE3'; ctx.fillRect(-135,-382,90,10); ctx.fillRect(-135,-352,90,10); ctx.fillStyle='#4A5059'; ctx.fillRect(-26,-330,6,40); ctx.fillRect(-150,-322,6,36); dots([[-23,-334,9],[-147,-326,9]],'#1A1D21');
  ctx.strokeStyle='#F6C9A4'; ctx.lineWidth=20; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(-60,-392); ctx.lineTo(-24,-336); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-126,-392); ctx.lineTo(-146,-330); ctx.stroke();
  /* Kopf mit Foto unter dem Bauhelm */ ctx.fillStyle='#F6C9A4'; rrect(-102,-426,28,26,8); ctx.fill(); ctx.save(); ctx.beginPath(); ctx.arc(-88,-470,56,0,6.29); ctx.clip(); ctx.fillStyle='#F6C9A4'; ctx.fillRect(-148,-530,120,120); drawPhotoInCircle(-88,-470,56,zoomVal()); ctx.restore(); ctx.strokeStyle='#D9A400'; ctx.lineWidth=4; ctx.beginPath(); ctx.arc(-88,-470,56,0,6.29); ctx.stroke(); helmet(-88,-516,0,2.05);
  /* Schaufelarm (rechts der Kabine, nie vor dem Gesicht) */ const ex=PIV.x+L1*Math.cos(arm.th1), ey=PIV.y+L1*Math.sin(arm.th1); const wx=ex+L2*Math.cos(arm.th2), wy=ey+L2*Math.sin(arm.th2);
  ctx.lineCap='round'; ctx.strokeStyle='#8A8F99'; ctx.lineWidth=12; ctx.beginPath(); ctx.moveTo(PIV.x+40,PIV.y-10); ctx.lineTo(lerp(PIV.x,ex,0.55),lerp(PIV.y,ey,0.55)+40); ctx.moveTo(lerp(PIV.x,ex,0.6),lerp(PIV.y,ey,0.6)-30); ctx.lineTo(lerp(ex,wx,0.5),lerp(ey,wy,0.5)); ctx.stroke();
  ctx.strokeStyle='#D9A400'; ctx.lineWidth=52; ctx.beginPath(); ctx.moveTo(PIV.x,PIV.y); ctx.lineTo(ex,ey); ctx.stroke(); ctx.strokeStyle='#F6C21A'; ctx.lineWidth=40; ctx.beginPath(); ctx.moveTo(PIV.x,PIV.y); ctx.lineTo(ex,ey); ctx.stroke();
  ctx.strokeStyle='#D9A400'; ctx.lineWidth=42; ctx.beginPath(); ctx.moveTo(ex,ey); ctx.lineTo(wx,wy); ctx.stroke(); ctx.strokeStyle='#F6C21A'; ctx.lineWidth=30; ctx.beginPath(); ctx.moveTo(ex,ey); ctx.lineTo(wx,wy); ctx.stroke(); dots([[PIV.x,PIV.y,20],[ex,ey,18],[wx,wy,16]],'#4A5059'); dots([[PIV.x,PIV.y,8],[ex,ey,7],[wx,wy,6]],'#C9CDD3');
  /* Schaufel */ ctx.save(); ctx.translate(wx,wy); ctx.rotate(arm.th2+Math.PI/2-0.4-1.5*arm.bk); ctx.fillStyle='#4A5059'; ctx.beginPath(); ctx.moveTo(-16,-10); ctx.lineTo(56,10); ctx.lineTo(72,84); ctx.lineTo(30,122); ctx.lineTo(-34,112); ctx.lineTo(-46,40); ctx.closePath(); ctx.fill(); ctx.fillStyle='#8A8F99'; for(let k=0;k<4;k++){ const u=k/3; const px=lerp(30,-34,u), py=lerp(122,112,u); ctx.beginPath(); ctx.moveTo(px-8,py); ctx.lineTo(px,py+16); ctx.lineTo(px+8,py); ctx.closePath(); ctx.fill(); } ctx.restore();
  if(arm.hasNumber){ const age=$('age').value.trim().slice(0,2); if(age){ const nx=wx+30*Math.cos(arm.th2+Math.PI/2-0.4-1.5*arm.bk+1.2), ny=wy+70*Math.sin(arm.th2+Math.PI/2-0.4-1.5*arm.bk+1.2); ctx.save(); ctx.globalAlpha=seg(t,18.8,19.0); text(age,nx,ny,fontB(120),'#FFE45C','center','#905F18',14); ctx.restore(); if(t<19.9){ const r=rng(Math.floor(t*8)); ctx.save(); ctx.globalCompositeOperation='lighter'; for(let n=0;n<8;n++) dots([[nx-80+r()*160,ny-80+r()*160,3+r()*4]],'rgba(255,240,180,0.9)'); ctx.restore(); } } }
  ctx.restore();
  /* Staub hinter den Ketten, Auspuffwoelkchen */ if(moving){ const r=rng(Math.floor(t*10)); for(let n=0;n<6;n++){ const dx=-210-r()*170, dy=-r()*60, rr=14+r()*22; dots([[mx+dx,my+dy-6,rr]],`rgba(200,185,150,${(0.45-n*0.06).toFixed(2)})`); } for(let n=0;n<4;n++){ dots([[mx+160+r()*30,my-340-r()*90-n*20,10+r()*12]],`rgba(120,125,135,${(0.4-n*0.08).toFixed(2)})`); } } }

/* ---------- Walter, die Walze ---------- */
const WALZE_X=1000, PEEK={x:30,y:GROUND_Y,sc:0.8};
function walterState(t,i){ if(t<9.6) return null; let x,y=GROUND_Y,dir=1,sc=1,honk=0,happy=false,blush=0,sniff=0,behind=false,dash=0,extra=0;
  if(t<10.6){ const u=easeOut(seg(t,9.6,10.6)); x=lerp(1600,WALZE_X,u); extra=(1600-x)/95; }
  else if(t<13.3){ x=WALZE_X; extra=(1600-WALZE_X)/95; if(t>=10.8&&t<11.6){ const p=seg(t,10.8,11.6); honk=Math.abs(Math.sin(p*Math.PI*2))*(1-p*0.2); } if(t>=11.9&&t<12.4) sniff=Math.sin(seg(t,11.9,12.4)*Math.PI); if(t>=12.4){ happy=true; blush=seg(t,12.4,12.9); if(t>=12.9) y=GROUND_Y-8*Math.abs(Math.sin((t-12.9)*12)); } }
  else if(t<16.6){ const mx=mountX(t); happy=true; blush=0.6; behind=true;
    if(t<14.1){ x=lerp(WALZE_X,-600,seg(t,13.3,14.1)); dir=1; dash=(t-13.3)*4; }                   /* saust hinter Brummi vorbei nach links raus */
    else { x=lerp(-600,mx-500,easeOut(seg(t,14.1,14.7))); dir=-1; } }                                /* kommt umgedreht zurueck und rollt mit */
  else { const u=easeInOut(seg(t,16.6,17.8)); const mx=mountX(16.6); x=lerp(mx-500,PEEK.x,u); dir=-1; sc=lerp(1,PEEK.sc,u); happy=true; blush=0.6; behind=true; }
  return {x,y,dir,sc,honk,happy,blush,sniff,behind,roll:STEP[i]*4+dash*2.5+extra}; }
function walter(d,t,i){ ctx.save(); ctx.translate(d.x,d.y); ctx.scale(d.dir*d.sc,d.sc); ctx.rotate(-d.sniff*0.08);
  dots([[140,-62,62]],'#2A2E33'); dots([[140,-62,40]],'#4A5059'); dots([[140,-62,14]],'#8A8F99');
  ctx.fillStyle='#F6C21A'; rrect(-60,-300,250,190,24); ctx.fill(); stripes(-60,-140,250,26);
  ctx.fillStyle='#D9A400'; ctx.fillRect(-30,-340,14,50); ctx.fillRect(150,-340,14,50); ctx.fillStyle='#F6C21A'; rrect(-45,-352,215,22,8); ctx.fill();
  ctx.save(); ctx.translate(40,-352); ctx.rotate(d.honk*0.12*Math.sin(t*60)); ctx.fillStyle='#C9CDD3'; ctx.beginPath(); ctx.moveTo(-14,0); ctx.lineTo(-42,-36); ctx.lineTo(8,-30); ctx.lineTo(2,0); ctx.closePath(); ctx.fill(); ctx.restore();
  ctx.fillStyle='#D9A400'; rrect(-215,-220,130,60,12); ctx.fill(); ctx.fillRect(-205,-170,20,60); ctx.fillRect(-105,-170,20,60);
  ctx.save(); ctx.translate(-150,-95); dots([[0,0,95]],'#3A3F47'); dots([[0,0,72]],'#5A616B'); ctx.rotate(d.roll); ctx.strokeStyle='#3A3F47'; ctx.lineWidth=10; for(let k=0;k<3;k++){ const a=k*Math.PI/3; ctx.beginPath(); ctx.moveTo(-68*Math.cos(a),-68*Math.sin(a)); ctx.lineTo(68*Math.cos(a),68*Math.sin(a)); ctx.stroke(); } dots([[0,0,16]],'#8A8F99'); ctx.restore();
  /* Gesicht: Scheinwerfer-Auge, Kuehlergrill-Mund */ const er=d.happy?24:20; dots([[-20,-255,er]],'#FFFFFF'); dots([[-26,-252,d.happy?12:9]],'#111'); dots([[-31,-260,3]],'#FFF'); if(d.happy){ ctx.strokeStyle='#3A3F47'; ctx.lineWidth=4; ctx.beginPath(); ctx.arc(-20,-255,er+4,Math.PI*1.15,Math.PI*1.85); ctx.stroke(); } else { ctx.strokeStyle='#3A3F47'; ctx.lineWidth=7; ctx.beginPath(); ctx.moveTo(-50,-292); ctx.lineTo(6,-284); ctx.stroke(); }
  if(d.honk>0){ ctx.fillStyle='#8E2A3A'; rrect(-56,-206,60,28+d.honk*34,8); ctx.fill(); ctx.fillStyle='#FFFFFF'; for(let k=0;k<3;k++) ctx.fillRect(-50+k*17,-206,10,8); } else { ctx.fillStyle='#2A2E33'; rrect(-56,-200,56,26,8); ctx.fill(); ctx.fillStyle='#C9CDD3'; for(let k=0;k<3;k++) ctx.fillRect(-48+k*16,-194,6,14); if(d.happy){ ctx.strokeStyle='#C9CDD3'; ctx.lineWidth=4; ctx.beginPath(); ctx.arc(-28,-190,22,0.15*Math.PI,0.85*Math.PI); ctx.stroke(); } }
  if(d.blush>0){ ctx.save(); ctx.globalAlpha=d.blush*0.7; dots([[-42,-226,14]],'#FF6F91'); ctx.restore(); }
  ctx.restore(); }

/* ---------- Summi (Drohne) und Kranmeister Haki ---------- */
function summiDraw(x,y,dir,t){ ctx.save(); ctx.translate(x,y); ctx.scale(dir,1); ctx.strokeStyle='#4A5059'; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(-30,-8); ctx.lineTo(-56,-24); ctx.moveTo(30,-8); ctx.lineTo(56,-24); ctx.stroke(); const bl=Math.abs(Math.sin(t*40)); for(const rx of [-56,56]){ ctx.fillStyle='rgba(200,205,212,0.85)'; ctx.beginPath(); ctx.ellipse(rx,-26,10+30*bl,4,0,0,6.29); ctx.fill(); dots([[rx,-26,4]],'#4A5059'); } ctx.fillStyle='#F28C28'; rrect(-36,-14,72,30,12); ctx.fill(); ctx.fillStyle='#F6C21A'; ctx.beginPath(); ctx.ellipse(0,-16,26,10,0,Math.PI,2*Math.PI); ctx.fill(); ctx.fillRect(-30,-17,60,5); dots([[14,0,7],[27,0,7]],'#FFFFFF'); dots([[16,1,3.5],[29,1,3.5]],'#111'); ctx.fillStyle='#F4F1E8'; rrect(-18,18,36,10,4); ctx.fill(); ctx.fillStyle='#2F6DB5'; ctx.fillRect(-4,18,8,10); ctx.restore(); }
function summi(t,i){ if(t<6.2) return null;
  if(t<7.0){ const u=easeInOut(seg(t,6.2,7.0)); const tip=mountPoint(-80,-820,t,i); return {x:lerp(-120,tip.x-170,u),y:lerp(300,tip.y,u),dir:1}; }
  if(t<8.6){ const tip=mountPoint(-80,-820,t,i); const a=-Math.PI+2*Math.PI*seg(t,7.0,8.6); return {x:tip.x+170*Math.cos(a),y:tip.y+80*Math.sin(a),dir:(-Math.sin(a)>=0)?1:-1}; }
  if(t<9.2){ const tip=mountPoint(-80,-820,8.6,i); const u=easeInOut(seg(t,8.6,9.2)); return {x:lerp(tip.x-170,260,u),y:lerp(tip.y,640,u),dir:1}; }
  if(t<10.8) return {x:260+8*Math.sin(t*2.5),y:640+8*Math.sin(t*3.3),dir:1};
  if(t<11.3){ const u=easeOut(seg(t,10.8,11.3)); return {x:lerp(260,560,u),y:lerp(640,440,u),dir:1}; }
  if(t<14.0) return {x:560+16*Math.sin(t*2.2),y:440+14*Math.sin(t*3.1),dir:1};
  if(t<16.5){ const mx=mountX(t); const u=easeInOut(seg(t,14.0,14.6)); return {x:lerp(560,mx-260,u)+10*Math.sin(t*3),y:lerp(440,600,u)+12*Math.sin(t*2.6),dir:1}; }
  if(t<17.6){ const mx=mountX(16.5); const u=easeInOut(seg(t,16.5,17.6)); return {x:lerp(mx-260,560,u),y:lerp(600,470,u)-80*Math.sin(Math.PI*u),dir:1}; }
  if(t<19.6) return {x:560+6*Math.sin(t*2),y:470+6*Math.sin(t*2.7),dir:-1};
  if(t<19.9){ const u=easeInOut(seg(t,19.6,19.9)); return {x:lerp(560,450,u),y:lerp(470,640,u),dir:-1}; }
  if(t<21.6){ const a=2*Math.PI*seg(t,19.9,21.6); return {x:300+150*Math.cos(a),y:640+50*Math.sin(a),dir:(-Math.sin(a)>=0)?1:-1}; }
  const u=easeIn(seg(t,21.6,22.8)); return {x:lerp(450,-160,u),y:lerp(640,300,u),dir:-1}; }
function hakiBlock(x,y,t){ ctx.save(); ctx.translate(x,y); ctx.fillStyle='#F6C21A'; rrect(-36,-70,72,72,10); ctx.fill(); ctx.fillStyle='#D9A400'; ctx.fillRect(-36,-16,72,10); ctx.strokeStyle='#4A5059'; ctx.lineWidth=16; ctx.lineCap='round'; ctx.beginPath(); ctx.arc(-4,34,32,-Math.PI/2,Math.PI*0.95); ctx.stroke();
  const blink=((t*1.3)%1.4)<0.1; if(blink){ ctx.strokeStyle='#111'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(-22,-44); ctx.lineTo(-6,-44); ctx.moveTo(6,-44); ctx.lineTo(22,-44); ctx.stroke(); } else { dots([[-14,-44,8],[14,-44,8]],'#FFFFFF'); dots([[-12,-43,4],[16,-43,4]],'#111'); } ctx.strokeStyle='#4A2A1A'; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(0,-30,10,0.15*Math.PI,0.85*Math.PI); ctx.stroke(); ctx.restore(); }
function jib(x0,x1,y,t){ ctx.strokeStyle='#F6C21A'; ctx.lineWidth=9; ctx.lineCap='butt'; ctx.beginPath(); ctx.moveTo(x0,y-16); ctx.lineTo(x1,y-16); ctx.moveTo(x0,y+16); ctx.lineTo(x1,y+16); ctx.stroke(); ctx.strokeStyle='#D9A400'; ctx.lineWidth=4; for(let x=x0+6;x<x1-40;x+=44){ ctx.beginPath(); ctx.moveTo(x,y+16); ctx.lineTo(x+22,y-16); ctx.lineTo(x+44,y+16); ctx.stroke(); } }
function haki(t){ if(t<6.9||t>9.3) return; const a=Math.min(seg(t,6.9,7.3),1-seg(t,8.9,9.3)); const u=Math.min(seg(t,7.2,7.8),1-seg(t,8.5,8.9)); const hy=lerp(150,460,easeInOut(u)); const x=860; const sw=(t>=8.15&&t<8.45)?10*Math.sin((t-8.15)*40):0;
  ctx.save(); ctx.globalAlpha=a; jib(380,1100,56,t); ctx.fillStyle='#4A5059'; rrect(x-26,72,52,22,4); ctx.fill(); ctx.strokeStyle='#6B7280'; ctx.lineWidth=6; ctx.beginPath(); ctx.moveTo(x,94); ctx.lineTo(x+sw,hy-70); ctx.stroke(); hakiBlock(x+sw,hy,t); ctx.restore(); }

/* ---------- Texte ---------- */
function texts(t,i){ const name=nameVal(); const age=$('age').value.trim().slice(0,2);
  if(t<3){ text('Einsatz für die Party-Baustelle …',W/2,H*.14,fitFont('Einsatz für die Party-Baustelle …',W-100,60,40,700),'#F4F1E8','center','#1E2228',9); }
  popIn(t,3.0,4.8,W/2,H*.22,()=>text('AB ZUR PARTY-BAUSTELLE!',0,0,fitFont('AB ZUR PARTY-BAUSTELLE!',W-120,170,60),'#FFFFFF','center','#1E2228',26));
  if(t>=6.3&&t<9.4){ const u=easeOut(seg(t,6.3,6.9)); const lines=wrap(`${name} baggert zur Party!`,W-160,fontB(112)); ctx.save(); ctx.globalAlpha=u*(1-seg(t,8.9,9.4)); ctx.translate(lerp(-300,0,u),0); lines.forEach((ln,k)=>text(ln,W/2,H*.12+k*122,fontB(112),'#FFFFFF','center','#1E2228',24)); ctx.restore(); }
  if(t>=9.9&&t<11.4){ ctx.save(); ctx.globalAlpha=Math.min(seg(t,9.9,10.2),1-seg(t,11.0,11.4)); text('Achtung, Walze!',W/2,H*.13,fontB(110),'#FFE45C','center','#1E2228',22); ctx.restore(); }
  popIn(t,10.9,11.7,W/2+120,H*.23,()=>text('TÜÜÜT!',0,0,fontB(150),'#F6C21A','center','#1E2228',22));
  popIn(t,14.3,16.2,W/2,H*.78,()=>text('Schneller als die Abrissbirne!',0,0,fitFont('Schneller als die Abrissbirne!',W-120,120,64),'#FFFFFF','center','#1E2228',26));
  const p=summi(t,i); if(p){ if(t>=9.4&&t<10.6) bubble(p.x-40,p.y-262,470,110,'Da lang, Bauleiter!',Math.min(seg(t,9.4,9.7),1-seg(t,10.3,10.6)),'#1E2228','#F6C21A'); if(t>=13.2&&t<14.3) bubble(p.x-440,p.y-262,470,110,'Baggerfuchs!',Math.min(seg(t,13.2,13.5),1-seg(t,14.0,14.3)),'#1E2228','#F6C21A',true); }
  if(t>=12.4&&t<13.4) bubble(700,830,340,110,'Party?!',Math.min(seg(t,12.4,12.7),1-seg(t,13.1,13.4)),'#D93B2B','#F6C21A',true);
  popIn(t,20.2,20.9,960,1000,()=>text('Huch!',0,0,fontB(68),'#F6C21A','center','#1E2228',14));
  if(t>=20.5){ const u=easeOutBack(seg(t,20.5,21.2)); const cardW=W-140, cardH=520, x=70, y=lerp(-620,40,u); ctx.save(); ctx.shadowColor='rgba(0,0,0,.45)'; ctx.shadowBlur=36; ctx.shadowOffsetY=14; ctx.fillStyle='#1F4E8C'; rrect(x,y,cardW,cardH,18); ctx.fill(); ctx.restore();
    ctx.save(); rrect(x,y,cardW,cardH,18); ctx.clip(); ctx.strokeStyle='rgba(255,255,255,0.13)'; ctx.lineWidth=2; for(let gx=x+40;gx<x+cardW;gx+=40){ ctx.beginPath(); ctx.moveTo(gx,y); ctx.lineTo(gx,y+cardH); ctx.stroke(); } for(let gy=y+40;gy<y+cardH;gy+=40){ ctx.beginPath(); ctx.moveTo(x,gy); ctx.lineTo(x+cardW,gy); ctx.stroke(); } stripes(x,y,cardW,26); ctx.restore();
    ctx.strokeStyle='rgba(255,255,255,0.65)'; ctx.lineWidth=3; rrect(x+16,y+44,cardW-32,cardH-60,10); ctx.stroke(); text(`BAUPLAN NR. ${age||'?'}`,x+40,y+76,fontD(26,700),'#F6C21A','left');
    const title=`🚧 ${possName(name)} Baustellen-Party`; text(title,W/2,y+136,fitFont(title,cardW-140,74,44),'#F6C21A'); text(`📅 ${$('date').value}  ·  ${$('time').value}`,W/2,y+232,fontD(54),'#FFFFFF'); const pl=wrap(`📍 ${$('place').value}`,cardW-120,fontD(54)); pl.forEach((ln,k)=>text(ln,W/2,y+310+k*62,fontD(54),'#FFFFFF'));
    const pulse=1+.04*Math.sin(t*6); ctx.save(); ctx.translate(W/2,y+448); ctx.scale(pulse,pulse); text('Kommst du mit? 👷',0,0,fontB(82),'#F6C21A'); ctx.restore(); }
  ctx.globalAlpha=.6; text('machsleicht.de',W/2,H-42,fontD(38,600),'#FFFFFF'); ctx.globalAlpha=1; }

function shakeAmp(t){ let a=0; if(t>=9.6&&t<10.6){ const st=((t-9.6)%0.5)/0.5; a=6*(1-st); } if(t>=10.8&&t<11.6) a=Math.max(a,7*Math.sin(seg(t,10.8,11.6)*Math.PI)); if(t>=14.0&&t<16.6) a=Math.max(a,3); if(t>=15.0&&t<15.5) a=Math.max(a,14*(1-seg(t,15.0,15.5))); if(t>=19.2&&t<19.6) a=Math.max(a,5*(1-seg(t,19.2,19.6))); return a; }

/* ---------- Frame ---------- */
function drawFrame(i){ i=clamp(i,0,P_N-1); const t=i/FPS; const a=shakeAmp(t);
  sky(t); sun(t); clouds(i);
  ctx.save(); if(a>0){ ctx.translate(SHAKE[i][0]*a,SHAKE[i][1]*a); }
  skyline(i,t); wreck(i,t); midLayer(i,t); ground(i,t); depot(i); site(i,t);
  haki(t);
  const d=walterState(t,i); if(d&&d.behind) walter(d,t,i);
  mount(t,i);
  if(d&&!d.behind) walter(d,t,i);
  const p=summi(t,i); if(p) summiDraw(p.x,p.y,p.dir,t);
  if(t>=20.2){ const hp=helmPos(t); helmet(hp.x,hp.y,hp.rot,1); }
  streaks(i,t); brickConfetti(i,t); partyConfetti(t,905,1100,19.3,2.8);
  ctx.restore();
  texts(t,i); }

/* ---------- Ton ---------- */
function audio(ac,master,S){ const {tone,noise,bell,bed,env}=S;
  const honk=(t0,f=330,dur=0.25,peak=0.16)=>{ tone(t0,f,f,dur,'square',peak,0.01,0.08); tone(t0,f*1.26,f*1.26,dur,'square',peak*0.7,0.01,0.08); };
  const brass=(t0,f,dur,peak=0.2)=>{ const o=ac.createOscillator(); o.type='sawtooth'; o.frequency.value=f; const fl=ac.createBiquadFilter(); fl.type='lowpass'; fl.frequency.setValueAtTime(600,t0); fl.frequency.linearRampToValueAtTime(2400,t0+0.08); fl.frequency.linearRampToValueAtTime(1200,t0+dur); const g=ac.createGain(); env(g,t0,0.03,peak,Math.max(0.01,dur-0.13),0.1); o.connect(fl).connect(g).connect(master); o.start(t0); o.stop(t0+dur+0.3); };
  honk(0.6,262); honk(1.3,294); honk(2.0,330); honk(3.0,392,0.55,0.2);
  bed('lowpass',120,0.8,[[2.8,0],[3.6,0.14],[10.6,0.14],[11.0,0.03],[13.8,0.03],[14.4,0.16],[17.6,0.16],[18.1,0.02],[24,0.02]],6,0.05);          /* Diesel */
  for(let t=3.4;t<10.5;t+=0.16) noise(t,0.04,'bandpass',1800,1800,0.045,0.004,0.03,3); for(let t=14.0;t<17.5;t+=0.11) noise(t,0.03,'bandpass',2000,2000,0.04,0.003,0.02,3);   /* Kettenklappern */
  bed('bandpass',420,5,[[6.1,0],[6.5,0.05],[22.6,0.05],[23.0,0]],0,0);                                                                     /* Summis Rotoren */
  [9.5,9.7,13.3,13.5].forEach(t=>tone(t,1400,1700,0.07,'square',0.05,0.004,0.04));                                                          /* Summi piept */
  tone(7.3,220,180,0.5,'sawtooth',0.04,0.02,0.2); tone(8.2,1800,1200,0.15,'triangle',0.2,0.003,0.1); bell(8.22,2637,0.16);                  /* Haki: Seil knarzt, High-Five klingt */
  /* Walter */ for(let t=9.6;t<10.6;t+=0.5){ tone(t,55,35,0.2,'sine',0.5,0.003,0.15); noise(t,0.12,'lowpass',250,250,0.35,0.003,0.1); } bed('lowpass',80,0.9,[[9.5,0],[10.2,0.14],[13.3,0.14],[13.8,0]],5,0.04);
  honk(11.0,262,0.32,0.26); honk(11.32,262,0.5,0.28);                                                                                          /* TUEUEUET */
  noise(11.9,0.12,'highpass',2000,2000,0.08,0.02,0.08); noise(12.1,0.12,'highpass',2000,2000,0.08,0.02,0.08);
  tone(12.4,500,700,0.2,'sine',0.15,0.01,0.1); tone(12.65,700,950,0.25,'sine',0.15,0.01,0.12); [12.9,13.02,13.14].forEach((t,k)=>tone(t,420+k*100,420+k*100,0.08,'square',0.08,0.005,0.05));
  noise(13.3,0.7,'bandpass',1200,400,0.12,0.02,0.3);
  /* Abrissbirne */ noise(14.55,0.5,'bandpass',300,900,0.14,0.05,0.2); noise(15.0,0.5,'lowpass',500,200,0.7,0.002,0.4); tone(15.0,90,35,0.5,'sine',0.6,0.002,0.4); { const r=S.rng(21); for(let k=0;k<12;k++){ const f=900+r()*1500; tone(15.05+r()*0.9,f,f*0.7,0.07,'square',0.045,0.003,0.05); } } noise(15.1,1.2,'lowpass',900,300,0.12,0.1,0.8);
  bed('bandpass',900,0.6,[[13.9,0],[14.6,0.16],[16.4,0.16],[17.4,0]],0.8,0.05);                                                             /* Vollgas */
  /* Fundstueck */ tone(17.8,380,620,0.6,'sawtooth',0.05,0.05,0.3); noise(18.4,0.4,'lowpass',800,400,0.25,0.02,0.25); tone(18.8,620,420,0.6,'sawtooth',0.05,0.05,0.3); bell(19.0,1568,0.28); tone(19.1,1400,1900,0.1,'sine',0.12,0.005,0.06); tone(19.25,1500,2000,0.1,'sine',0.12,0.005,0.06);
  { const r=S.rng(9); for(let k=0;k<8;k++){ const f=2400+r()*1800; tone(19.0+r()*0.6,f,f,0.12,'sine',0.06,0.005,0.1); } }
  /* Fanfare, Ruehrbert, Helm */ [19.2,19.4].forEach(t=>tone(t,110,55,0.25,'sine',0.5,0.003,0.2)); [[19.5,392],[19.7,494],[19.9,587]].forEach(([t,f])=>brass(t,f,0.28,0.2)); brass(20.15,784,0.8,0.18); noise(19.3,0.35,'lowpass',700,300,0.5,0.003,0.25); { const r=S.rng(13); for(let k=0;k<12;k++){ const f=1800+r()*2200; tone(19.5+r()*2.0,f,f,0.12,'sine',0.05,0.005,0.1); } }
  noise(20.2,0.2,'bandpass',600,1400,0.2,0.01,0.1); tone(20.9,240,160,0.12,'sine',0.2,0.005,0.08); bell(20.7,1046,0.22);
  for(const f of [392,494,587]) for(const d of [-5,5]){ const o=ac.createOscillator(); o.type='sawtooth'; o.frequency.value=f+d; const fl=ac.createBiquadFilter(); fl.type='lowpass'; fl.frequency.value=1200; const g=ac.createGain(); env(g,20.0,0.8,0.018,2.6,0.6); o.connect(fl).connect(g).connect(master); o.start(20.0); o.stop(24); } }

startTrailer({ id:'baustelle', title:'Baustellen-Trailer', DUR:P_DUR, drawFrame, audio, photoDefault:IDA_URI, restFrameAt:8.9 });
