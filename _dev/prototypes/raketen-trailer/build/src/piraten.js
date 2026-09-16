/* ============================================================
   Drehbuch PIRATEN — „Kurs auf die Schatzinsel" (STORY-piraten.md)
   0–3 Hafen · 3–6 Leinen los · 6–9,5 offenes Meer (Delfine, Piet, Flaschenpost) ·
   9,5–14 Oktavia greift an, Kanone · 14–16,5 Volle Fahrt (Sonnenuntergang) ·
   16,5–19 Schatzinsel, Anker, Hinnerk · 19–20,5 Oktavia hebt die Truhe, Konfetti-Kanone,
   Moewe stibitzt den Hut · 20,5–24 Pergament-Karte
   ============================================================ */
const P_DUR=24, P_N=P_DUR*FPS;
const HORIZON=1150, SHIP_S=0.9, SHIP_WL=1300;
const R0=rng(11);
const CONF=Array.from({length:90},()=>({a:-0.95+(R0()-.5)*0.9,v:900+R0()*700,w:14+R0()*14,h:9+R0()*9,rot:R0()*6.28,spin:(R0()-.5)*9,c:['#E4C567','#A5402B','#2A727B','#F3E7C9','#FFFFFF','#FF6F91','#7CE0C3'][Math.floor(R0()*7)]}));
const SHAKE=Array.from({length:P_N+1},()=>[(R0()-.5)*2,(R0()-.5)*2]);
const IDA_URI='/*__IDA__*/';

/* ---------- Welt: waagerechter Scroll ---------- */
function speed(t){ if(t<3) return 0; if(t<6) return 600*easeIn(seg(t,3,6)); if(t<14) return 600; if(t<14.6) return lerp(600,950,seg(t,14,14.6)); if(t<16.5) return 950; if(t<17.8) return 950*(1-easeOut(seg(t,16.5,17.8))); return 0; }
const SCX=[0]; for(let i=1;i<=P_N;i++) SCX[i]=SCX[i-1]+speed((i-.5)/FPS)/FPS; const SCX_END=SCX[P_N];
function shipX(t){ return lerp(540,270,easeInOut(seg(t,16.6,17.8))); }   /* Kamerafahrt: Schiff rueckt nach links, die Insel bekommt Platz */
const X_X=800;   /* das rote X im Sand — rechts vom Bugspriet, auf dem hoeheren Teil der Insel */

/* ---------- Himmel, Sonne, Wolken ---------- */
const SKY=[[0,'#2E4F8A','#F6B26B'],[6,'#3A7BC8','#BFE3F5'],[9.5,'#3A7BC8','#BFE3F5'],[11.5,'#24406B','#7D93AD'],[13.6,'#3A7BC8','#BFE3F5'],[14.8,'#5B3A7E','#F58B4C'],[17.5,'#3B2D62','#F0A868'],[24,'#2B2350','#E9A26B']];
const SEA_BACK=[[0,'#3C8F98'],[9.5,'#3C8F98'],[11.5,'#1E4757'],[13.6,'#3C8F98'],[14.8,'#C97A45'],[17.5,'#6E5B7A'],[24,'#4C4470']];
const SEA_MID=[[0,'#2A727B'],[9.5,'#2A727B'],[11.5,'#12324A'],[13.6,'#2A727B'],[14.8,'#8A5C58'],[17.5,'#3F3E6A'],[24,'#2F3060']];
const SEA_FRONT=[[0,'#1E5A66'],[9.5,'#1E5A66'],[11.5,'#0C2233'],[13.6,'#1E5A66'],[14.8,'#5C4462'],[17.5,'#2A2A52'],[24,'#22254A']];
function keyed(list,t,idx){ let a=list[0], b=list[list.length-1]; for(let k=0;k<list.length-1;k++){ if(t>=list[k][0]&&t<=list[k+1][0]){ a=list[k]; b=list[k+1]; break; } } return mixHex(a[idx],b[idx],seg(t,a[0],b[0])); }
function sky(t){ const g=ctx.createLinearGradient(0,0,0,HORIZON); g.addColorStop(0,keyed(SKY,t,1)); g.addColorStop(1,keyed(SKY,t,2)); ctx.fillStyle=g; ctx.fillRect(0,0,W,HORIZON+4); }
function sun(t){ if(t<10){ const a=1-seg(t,8,10); const y=1000-t*14; ctx.save(); ctx.globalAlpha=a; dots([[200,y,58]],'#FFE29A'); ctx.globalCompositeOperation='lighter'; const g=ctx.createRadialGradient(200,y,0,200,y,220); g.addColorStop(0,'rgba(255,200,120,0.35)'); g.addColorStop(1,'rgba(255,200,120,0)'); ctx.fillStyle=g; ctx.fillRect(-20,y-220,440,440); ctx.restore(); }
  if(t>=14){ const a=seg(t,14,15); const y=lerp(1060,1132,seg(t,14,18)); ctx.save(); ctx.globalAlpha=a; dots([[820,y,92]],'#FFB347'); ctx.globalCompositeOperation='lighter'; const g=ctx.createRadialGradient(820,y,0,820,y,340); g.addColorStop(0,'rgba(255,150,70,0.45)'); g.addColorStop(1,'rgba(255,150,70,0)'); ctx.fillStyle=g; ctx.fillRect(480,y-340,680,680); ctx.restore(); } }
const CLOUDS=[[100,260,120],[420,180,150],[760,300,130],[1000,140,110],[1250,240,140],[1500,320,120]];
function clouds(i){ const span=W+800; for(const [cx,cy,r] of CLOUDS){ const x=((cx-SCX[i]*0.25)%span+span)%span-400; ctx.fillStyle='rgba(255,255,255,0.85)'; for(const [dx,dy,rr] of [[0,0,r],[-r*.7,r*.25,r*.75],[r*.75,r*.2,r*.7],[-r*.2,-r*.35,r*.6]]){ ctx.beginPath(); ctx.arc(x+dx,cy+dy,rr,0,6.29); ctx.fill(); } } }

/* ---------- Wellen ---------- */
const BACK={y:1175,A:9,lam:150,par:.4,spd:70}, MID={y:1335,A:14,lam:200,par:.7,spd:90}, FRONT={y:1565,A:22,lam:250,par:1,spd:110};
function waveY(i,t,b,x){ const ph=-SCX[i]*b.par+t*b.spd; return b.y+b.A*Math.sin((x+ph)/b.lam)+b.A*0.5*Math.sin((x*1.7+ph*1.3)/b.lam+1.2); }
function waveBand(i,t,b,color,foam){ ctx.fillStyle=color; ctx.beginPath(); ctx.moveTo(-60,H+10); for(let x=-60;x<=W+60;x+=20) ctx.lineTo(x,waveY(i,t,b,x)); ctx.lineTo(W+60,H+10); ctx.closePath(); ctx.fill();
  if(foam){ ctx.strokeStyle=foam; ctx.lineWidth=5; ctx.beginPath(); for(let x=-60;x<=W+60;x+=20){ const y=waveY(i,t,b,x)-2; if(x===-60) ctx.moveTo(x,y); else ctx.lineTo(x,y); } ctx.stroke(); } }

/* ---------- Hafen ---------- */
function harbor(i){ const ox=-SCX[i]; if(ox<-1500) return;
  ctx.fillStyle='#4A3928'; ctx.fillRect(ox-200,HORIZON-6,780,62); ctx.fillStyle='#3A2C1E'; for(let x=ox-200;x<ox+580;x+=40) ctx.fillRect(x,HORIZON-6,6,62);
  ctx.fillStyle='#2E2216'; for(const px of [ox-160,ox+40,ox+240,ox+440]) ctx.fillRect(px,HORIZON+50,14,120);
  /* Leuchtturm */ ctx.save(); ctx.beginPath(); ctx.moveTo(ox+60,HORIZON-6); ctx.lineTo(ox+92,HORIZON-330); ctx.lineTo(ox+148,HORIZON-330); ctx.lineTo(ox+180,HORIZON-6); ctx.closePath(); ctx.fillStyle='#F4F1DE'; ctx.fill(); ctx.clip(); ctx.fillStyle='#A5402B'; for(const yy of [HORIZON-90,HORIZON-190,HORIZON-290]) ctx.fillRect(ox+40,yy,160,40); ctx.restore();
  ctx.fillStyle='#2A2013'; ctx.fillRect(ox+84,HORIZON-372,72,46); dots([[ox+120,HORIZON-349,14]],'#FFE45C'); ctx.fillStyle='#A5402B'; ctx.beginPath(); ctx.moveTo(ox+74,HORIZON-372); ctx.lineTo(ox+120,HORIZON-414); ctx.lineTo(ox+166,HORIZON-372); ctx.closePath(); ctx.fill();
  /* Haeuser */ for(const [hx,hw,hh,c] of [[ox+220,90,120,'#6E5C43'],[ox+330,110,150,'#8A6E4B'],[ox+460,90,110,'#5A4A34']]){ ctx.fillStyle=c; ctx.fillRect(hx,HORIZON-6-hh,hw,hh); ctx.fillStyle='#A5402B'; ctx.beginPath(); ctx.moveTo(hx-8,HORIZON-6-hh); ctx.lineTo(hx+hw/2,HORIZON-46-hh); ctx.lineTo(hx+hw+8,HORIZON-6-hh); ctx.closePath(); ctx.fill(); ctx.fillStyle='#FFE082'; for(let wy=HORIZON-hh+14; wy<HORIZON-36; wy+=44) for(let wx=hx+14; wx<hx+hw-24; wx+=40) ctx.fillRect(wx,wy,18,24); } }

/* ---------- Schiff ---------- */
function shipRoll(t){ let r=(t<3?0.012:0.045)*Math.sin(t*1.7); if(t>=11&&t<13.4){ const g=Math.min(seg(t,11,11.4),1-seg(t,12.9,13.4)); r+=-0.2*g+0.015*Math.sin(t*25)*g; } if(t>=12.4&&t<12.7) r+=0.07*(1-seg(t,12.4,12.7)); if(t>=14&&t<17) r+=0.06*Math.min(seg(t,14,14.6),1-seg(t,16.5,17)); return r; }
function shipBob(t){ return (t<3?4:11)*Math.sin(t*1.7+1); }
function shipMatrix(t){ return {x:shipX(t), y:SHIP_WL+shipBob(t), r:shipRoll(t), s:SHIP_S}; }
function shipPoint(lx,ly,t){ const m=shipMatrix(t); const c=Math.cos(m.r), s=Math.sin(m.r); return {x:m.x+(lx*c-ly*s)*m.s, y:m.y+(lx*s+ly*c)*m.s}; }
function cannonAngle(t){ let a=-0.35; if(t>=11.6&&t<12.0) a=lerp(-0.35,-0.8,easeInOut(seg(t,11.6,12.0))); else if(t>=12.0&&t<13.6) a=-0.8; else if(t>=13.6&&t<14.4) a=lerp(-0.8,-0.35,seg(t,13.6,14.4)); if(t>=19.1&&t<19.4) a=lerp(-0.35,-0.95,seg(t,19.1,19.4)); else if(t>=19.4&&t<20.8) a=-0.95; return a; }
function muzzle(t){ const a=cannonAngle(t); return shipPoint(110+100*Math.cos(a),-92+100*Math.sin(a),t); }
function anchor(t){ let ay; if(t<3) ay=lerp(150,-30,easeInOut(seg(t,0.8,2.6))); else if(t<16.9) ay=-30; else ay=lerp(-30,260,easeIn(seg(t,16.9,17.4)));
  ctx.strokeStyle='#8E93B8'; ctx.lineWidth=5; ctx.setLineDash([8,6]); ctx.beginPath(); ctx.moveTo(312,-60); ctx.lineTo(312,ay-30); ctx.stroke(); ctx.setLineDash([]);
  ctx.strokeStyle='#5A6090'; ctx.lineWidth=9; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(312,ay-30); ctx.lineTo(312,ay+30); ctx.moveTo(290,ay-16); ctx.lineTo(334,ay-16); ctx.stroke(); ctx.beginPath(); ctx.arc(312,ay+14,28,0.2,Math.PI-0.2); ctx.stroke(); }
function cannon(t){ const a=cannonAngle(t); const recoil=(t>=12.4&&t<12.7)?14*(1-seg(t,12.4,12.7)):(t>=19.4&&t<19.7)?10*(1-seg(t,19.4,19.7)):0; ctx.save(); ctx.translate(110,-92); dots([[-26,14,16],[22,14,16]],'#3A2C1E'); dots([[-26,14,6],[22,14,6]],'#8A5A2B'); ctx.rotate(a); ctx.translate(-recoil,0); ctx.fillStyle='#2B2B2B'; rrect(-40,-20,140,40,14); ctx.fill(); ctx.fillStyle='#4A4A4A'; ctx.fillRect(70,-24,20,48); ctx.fillRect(-36,-24,14,48); dots([[-46,0,12]],'#2B2B2B');
  if((t>=12.0&&t<12.4)||(t>=19.15&&t<19.4)) dots([[-58,-6,7]],(Math.floor(t*20)%2)?'#FF7A1A':'#FFE45C');
  if((t>=12.4&&t<12.5)||(t>=19.4&&t<19.5)){ ctx.save(); ctx.globalCompositeOperation='lighter'; dots([[110,0,42]],'rgba(255,220,120,0.95)'); dots([[130,0,26]],'rgba(255,255,255,0.9)'); ctx.restore(); }
  ctx.restore(); }
function ship(t){ const m=shipMatrix(t); ctx.save(); ctx.translate(m.x,m.y); ctx.rotate(m.r); ctx.scale(m.s,m.s);
  /* Mast, Rah, Ausguck */ ctx.fillStyle='#6B4A2B'; ctx.fillRect(-38,-640,18,580); ctx.fillRect(-235,-566,410,12); ctx.fillStyle='#4A3320'; rrect(-66,-612,74,36,8); ctx.fill();
  /* Flagge */ const fw=0.3*Math.sin(t*9); ctx.fillStyle='#1B1B1B'; ctx.beginPath(); ctx.moveTo(-30,-640); ctx.quadraticCurveTo(30,-650+fw*40,120,-630+fw*30); ctx.lineTo(112,-590+fw*20); ctx.quadraticCurveTo(40,-600-fw*30,-30,-596); ctx.closePath(); ctx.fill(); dots([[45,-618+fw*10,9]],'#F4F1DE');
  /* Segel */ const u=easeOut(seg(t,3.0,4.6)); const belly=40+40*u+((t>=14&&t<17)?30*Math.min(seg(t,14,14.6),1-seg(t,16.5,17)):0); const sb=lerp(-540,-260,u); ctx.fillStyle='#F3E7C9'; ctx.beginPath(); ctx.moveTo(-225,-555); ctx.lineTo(165,-555); ctx.quadraticCurveTo(165+belly,(sb-555)/2,150,sb); ctx.lineTo(-210,sb); ctx.quadraticCurveTo(-210+belly*0.6,(sb-555)/2,-225,-555); ctx.closePath(); ctx.fill(); ctx.strokeStyle='#D6C295'; ctx.lineWidth=3; ctx.stroke();
  if(u>0.7){ ctx.save(); ctx.globalAlpha=seg(u,0.7,1); const sx=-30+belly*0.35, sy=(sb-555)/2; dots([[sx,sy-12,34]],'#2A2013'); dots([[sx-13,sy-18,9],[sx+13,sy-18,9]],'#F3E7C9'); ctx.strokeStyle='#2A2013'; ctx.lineWidth=9; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(sx-40,sy+18); ctx.lineTo(sx+40,sy+50); ctx.moveTo(sx+40,sy+18); ctx.lineTo(sx-40,sy+50); ctx.stroke(); ctx.restore(); }
  /* Rumpf */ const hull=()=>{ ctx.beginPath(); ctx.moveTo(-300,-70); ctx.lineTo(270,-70); ctx.quadraticCurveTo(320,-80,352,-128); ctx.lineTo(364,-122); ctx.quadraticCurveTo(334,-40,300,-10); ctx.quadraticCurveTo(250,52,180,54); ctx.lineTo(-210,54); ctx.quadraticCurveTo(-280,42,-300,-10); ctx.closePath(); };
  ctx.fillStyle='#5A3A1E'; hull(); ctx.fill(); ctx.save(); hull(); ctx.clip(); ctx.strokeStyle='#3E2814'; ctx.lineWidth=3; for(let yy=-50;yy<54;yy+=22){ ctx.beginPath(); ctx.moveTo(-310,yy); ctx.lineTo(370,yy); ctx.stroke(); } ctx.restore();
  ctx.fillStyle='#E4C567'; ctx.fillRect(-300,-74,600,8);
  /* Heckkajuete + Bullauge */ ctx.fillStyle='#6B4A2B'; rrect(-300,-200,150,132,10); ctx.fill(); ctx.fillStyle='#4A3320'; ctx.fillRect(-310,-208,170,14);
  dots([[-225,-136,76]],'#87621A'); dots([[-225,-136,68]],'#E4C567'); ctx.save(); ctx.beginPath(); ctx.arc(-225,-136,58,0,6.29); ctx.clip(); ctx.fillStyle='#A7C7D9'; ctx.fillRect(-290,-200,130,130); drawPhotoInCircle(-225,-136,58,zoomVal()); ctx.strokeStyle='rgba(255,255,255,.5)'; ctx.lineWidth=7; ctx.beginPath(); ctx.arc(-225,-136,46,-2.4,-1.3); ctx.stroke(); ctx.restore();
  for(let k=0;k<6;k++){ const a=k*Math.PI/3; dots([[-225+70*Math.cos(a),-136+70*Math.sin(a),5]],'#87621A'); }
  /* Reling */ ctx.fillStyle='#8A5A2B'; ctx.fillRect(-150,-100,420,6); for(let x=-140;x<270;x+=42) ctx.fillRect(x,-100,6,30);
  /* Bugspriet */ ctx.strokeStyle='#6B4A2B'; ctx.lineWidth=12; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(320,-118); ctx.lineTo(470,-186); ctx.stroke();
  anchor(t); cannon(t); ctx.restore(); }

/* ---------- Effekte: Spritzer, Rauch, Kugel ---------- */
function splash(x,y,u,sc=1){ if(u<=0||u>1) return;   /* u=0 heisst: noch nicht passiert — sonst stehen weisse Tropfen dauerhaft im Bild */ ctx.save(); ctx.globalAlpha=1-u; ctx.fillStyle='#FFFFFF'; const h=lerp(0,120*sc,Math.sin(Math.PI*Math.min(u*1.4,1))); ctx.beginPath(); ctx.ellipse(x,y-h/2,26*sc*(0.5+u),h/2+8,0,0,6.29); ctx.fill(); const r=rng(Math.floor(x)); for(let n=0;n<10;n++){ const a=-Math.PI*0.15-r()*Math.PI*0.7; const d=(60+r()*120)*sc*u; dots([[x+Math.cos(a)*d,y+Math.sin(a)*d+u*u*220*sc,5+r()*5]],'#FFFFFF'); } ctx.restore(); }
function smokeRing(mx,my,u){ if(u<=0||u>1) return; ctx.save(); ctx.globalAlpha=0.6*(1-u); ctx.fillStyle='#E9EAFF'; const r=rng(77); for(let n=0;n<8;n++){ const a=-1.2+(r()-.5)*1.2; const d=40+220*u+r()*60; dots([[mx+Math.cos(a)*d,my+Math.sin(a)*d-40*u,(30+r()*30)*(0.6+u)]],'#E9EAFF'); } ctx.restore(); }
function cannonball(t){ if(t<12.42||t>12.85) return; const u=seg(t,12.42,12.85); const m=muzzle(12.42); const x=lerp(m.x,1000,u), y=lerp(m.y,1335,u)-260*Math.sin(Math.PI*u); dots([[x,y,17]],'#1B1B1B'); dots([[x-5,y-5,5]],'#555'); }

/* ---------- Oktavia ---------- */
function krakenHead(cx,cy,r,scared,mood){ ctx.fillStyle=mixHex('#7B3FA0','#E0503C',mood); ctx.beginPath(); ctx.ellipse(cx,cy,r,r*0.95,0,0,6.29); ctx.fill(); ctx.fillStyle='rgba(255,255,255,0.12)'; ctx.beginPath(); ctx.ellipse(cx-r*0.3,cy-r*0.45,r*0.35,r*0.2,-0.4,0,6.29); ctx.fill();
  const ex=[cx-r*0.32,cx+r*0.28], ey=cy-r*0.25, er=scared?54:46, pr=scared?10:20; for(const x of ex){ dots([[x,ey,er]],'#FFFFFF'); dots([[x-(scared?0:10),ey+(scared?0:4),pr]],'#111'); dots([[x-(scared?4:16),ey-8,5]],'#FFF'); }
  dots([[cx-r*0.55,cy+r*0.1,18],[cx+r*0.5,cy+r*0.1,18]],'rgba(255,140,170,0.55)');
  ctx.strokeStyle='#4A1F5E'; ctx.lineWidth=8; ctx.lineCap='round'; if(scared){ ctx.beginPath(); ctx.moveTo(ex[0]-40,ey-70); ctx.lineTo(ex[0]+30,ey-90); ctx.moveTo(ex[1]+40,ey-70); ctx.lineTo(ex[1]-30,ey-90); ctx.stroke(); ctx.fillStyle='#4A1F5E'; ctx.beginPath(); ctx.ellipse(cx,cy+r*0.38,24,32,0,0,6.29); ctx.fill(); } else { ctx.beginPath(); ctx.arc(cx,cy+r*0.28,34,0.15*Math.PI,0.85*Math.PI); ctx.stroke(); } }
function tentacle(bx,by,tx,ty,c1x,c1y,c2x,c2y,p){ if(p<=0) return; const ex=lerp(bx,tx,p), ey=lerp(by,ty,p), q1x=lerp(bx,c1x,p), q1y=lerp(by,c1y,p), q2x=lerp(bx,c2x,p), q2y=lerp(by,c2y,p);
  for(const [col,w] of [['#7B3FA0',66],['#9A5CC0',38]]){ ctx.strokeStyle=col; ctx.lineWidth=w; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(bx,by); ctx.bezierCurveTo(q1x,q1y,q2x,q2y,ex,ey); ctx.stroke(); }
  for(let s=0.15;s<0.95;s+=0.1){ const u=s, mt=1-u; dots([[mt*mt*mt*bx+3*mt*mt*u*q1x+3*mt*u*u*q2x+u*u*u*ex, mt*mt*mt*by+3*mt*mt*u*q1y+3*mt*u*u*q2y+u*u*u*ey, 9]],'#F29BC4'); } }
function krakenAttackHeadY(t){ if(t<9.8) return 1900; if(t<10.8) return lerp(1780,1350,easeOut(seg(t,9.8,10.8))); if(t<13.3) return 1350+6*Math.sin(t*3); return lerp(1350,1900,easeIn(seg(t,13.3,14.2))); }
function krakenAttackHead(t){ if(t<9.8||t>14.2) return; const scared=t>=12.85&&t<14.2; const mood=seg(t,12.9,13.3); krakenHead(1000,krakenAttackHeadY(t),190,scared,mood); }
function krakenAttackTentacles(t){ if(t<10.2||t>13.6) return; const rel=1-seg(t,12.9,13.5);
  const p1=Math.min(easeOut(seg(t,10.2,11.0)),rel), p2=Math.min(easeOut(seg(t,10.4,11.2)),rel);
  const g=shipPoint(-30,-400,t); tentacle(170,1345,g.x,g.y,120,1050,420,830,p1);
  if(p1>=0.999&&t>=11.0&&t<12.9){ ctx.strokeStyle='#7B3FA0'; ctx.lineWidth=22; for(let k=0;k<3;k++){ ctx.beginPath(); ctx.ellipse(g.x,g.y+k*44,46,18,0,0,6.29); ctx.stroke(); } dots([[g.x+40,g.y+22,8],[g.x-40,g.y+66,8]],'#F29BC4'); }
  tentacle(760,1345,800+30*Math.sin(t*3),950+20*Math.sin(t*4),700,1150,900,1000,p2); }
function bubbles(t,x0,on){ if(!on) return; for(let n=0;n<12;n++){ const ph=((t*0.9+n*0.37)%1); const y=1345-ph*230, x=x0-150+n*27+10*Math.sin(t*5+n); ctx.fillStyle=`rgba(230,240,255,${(0.6*(1-ph)).toFixed(3)})`; ctx.beginPath(); ctx.arc(x,y,6+(n%3)*3,0,6.29); ctx.fill(); } }
/* Rueckkehr: Oktavia hebt die Truhe */
/* Oktavia taucht zwischen Schiff und Insel auf und hebt die Truhe vor den Bug — X und Hinnerk bleiben frei sichtbar */
function chestPos(t){ return {x:660, y:lerp(1600,1290,easeInOut(seg(t,19.3,19.9)))}; }
function krakenReturn(t){ if(t<19.0) return; const hy=lerp(1900,1560,easeOut(seg(t,19.0,19.7))); krakenHead(640,hy+6*Math.sin(t*2.5),170,false,0);
  if(t>=19.15){ const c=chestPos(t); tentacle(770,hy+20,c.x+40,c.y+58,830,hy-60,760,c.y+150,Math.min(1,seg(t,19.15,19.5)+0.4)); chest(c.x,c.y,t); } }
function chest(cx,cy,t){ const open=easeOut(seg(t,19.8,20.2)); ctx.save(); ctx.translate(cx,cy);
  if(open>0){ ctx.save(); ctx.globalCompositeOperation='lighter'; const g=ctx.createRadialGradient(0,-30,0,0,-30,260*open); g.addColorStop(0,'rgba(255,220,120,0.7)'); g.addColorStop(1,'rgba(255,200,80,0)'); ctx.fillStyle=g; ctx.fillRect(-300,-330,600,400); ctx.restore(); }
  ctx.fillStyle='#6B4A2B'; rrect(-75,-40,150,90,12); ctx.fill(); ctx.fillStyle='#E4C567'; ctx.fillRect(-75,-10,150,10); ctx.fillRect(-45,-40,12,90); ctx.fillRect(33,-40,12,90);
  if(open>0){ ctx.fillStyle='#FFD54F'; ctx.beginPath(); ctx.ellipse(0,-38,64,18,0,0,6.29); ctx.fill(); }
  ctx.save(); ctx.translate(-75,-40); ctx.rotate(-1.15*open); ctx.fillStyle='#8A5A2B'; rrect(0,-42,150,44,12); ctx.fill(); ctx.fillStyle='#E4C567'; ctx.fillRect(0,-24,150,8); dots([[75,-20,9]],'#E4C567'); ctx.restore();
  ctx.restore();
  /* Die Alterszahl steigt als Goldschatz aus der Truhe */ const age=$('age').value.trim().slice(0,2); if(age&&t>=20.0){ const u=easeOutBack(seg(t,20.0,20.7)); const y=lerp(cy-40,cy-210,u); ctx.save(); ctx.globalAlpha=seg(t,20.0,20.2); text(age,cx,y,fontB(150),'#FFE45C','center','#87621A',18); ctx.restore(); const r=rng(Math.floor(t*6)); ctx.save(); ctx.globalCompositeOperation='lighter'; for(let n=0;n<7;n++) dots([[cx-90+r()*180,y-70+r()*150,3+r()*4]],'rgba(255,240,180,0.9)'); ctx.restore(); } }

/* ---------- Begegnungen: Delfine, Flaschenpost, Piet, Moewe ---------- */
function dolphinDraw(x,y,ang){ ctx.save(); ctx.translate(x,y); ctx.rotate(ang); ctx.fillStyle='#6F8FA8'; ctx.beginPath(); ctx.ellipse(0,0,74,24,0,0,6.29); ctx.fill(); ctx.fillStyle='#B9CBD8'; ctx.beginPath(); ctx.ellipse(6,9,58,12,0,0,6.29); ctx.fill(); ctx.fillStyle='#6F8FA8'; ctx.beginPath(); ctx.moveTo(-10,-20); ctx.lineTo(10,-54); ctx.lineTo(26,-20); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.moveTo(-70,-4); ctx.lineTo(-102,-30); ctx.lineTo(-92,0); ctx.lineTo(-102,26); ctx.closePath(); ctx.fill(); dots([[52,-8,4]],'#111'); ctx.restore(); }
function dolphin(t,t0,x0,y0,dx,apex){ const u=(t-t0)/0.9; if(u<0||u>1) return; const x=x0+dx*u, y=y0-apex*Math.sin(Math.PI*u); const ang=Math.atan2(-apex*Math.PI*Math.cos(Math.PI*u),dx); dolphinDraw(x,y,ang); }
function dolphins(t){ dolphin(t,6.8,640,1440,300,270); dolphin(t,7.6,760,1460,300,250); splash(640,1440,seg(t,6.75,7.1),0.8); splash(940,1440,seg(t,7.6,7.95),0.8); splash(760,1460,seg(t,7.55,7.9),0.8); splash(1060,1460,seg(t,8.4,8.75),0.8); }
function bottle(i,t){ if(t<7.4||t>10.2) return; const x=lerp(1140,-80,seg(t,7.4,10.2)); const y=waveY(i,t,MID,x)-6; ctx.save(); ctx.translate(x,y); ctx.rotate(0.55+0.15*Math.sin(t*3)); ctx.fillStyle='rgba(143,191,159,0.85)'; rrect(-14,-36,28,70,10); ctx.fill(); ctx.fillRect(-7,-56,14,24); ctx.fillStyle='#8A5A2B'; rrect(-8,-64,16,12,3); ctx.fill(); ctx.fillStyle='#F3E7C9'; ctx.fillRect(-6,-26,12,44); ctx.fillStyle='rgba(255,255,255,0.5)'; ctx.fillRect(-11,-30,4,50); ctx.restore(); }
function parrotDraw(x,y,dir,flap,perched){ ctx.save(); ctx.translate(x,y); ctx.scale(dir,1);
  for(const [ang,col] of [[0.55,'#2E5AAC'],[0.75,'#F2C230'],[0.95,'#E23A2E']]){ ctx.save(); ctx.translate(-28,28); ctx.rotate(ang); ctx.fillStyle=col; ctx.beginPath(); ctx.ellipse(0,26,9,34,0,0,6.29); ctx.fill(); ctx.restore(); }
  ctx.save(); ctx.translate(-6,-8); ctx.rotate(-0.5-flap); ctx.fillStyle='#2E5AAC'; ctx.beginPath(); ctx.ellipse(-30,0,44,17,0,0,6.29); ctx.fill(); ctx.restore();
  ctx.fillStyle='#E23A2E'; ctx.beginPath(); ctx.ellipse(0,0,34,46,0,0,6.29); ctx.fill(); ctx.fillStyle='#F26A5A'; ctx.beginPath(); ctx.ellipse(8,10,20,30,0,0,6.29); ctx.fill();
  dots([[14,-52,26]],'#E23A2E'); dots([[24,-56,11]],'#FFFFFF'); dots([[26,-56,5]],'#111');
  ctx.fillStyle='#F2C230'; ctx.beginPath(); ctx.moveTo(34,-62); ctx.quadraticCurveTo(64,-58,52,-34); ctx.quadraticCurveTo(44,-28,36,-44); ctx.closePath(); ctx.fill();
  if(perched){ ctx.strokeStyle='#F2A230'; ctx.lineWidth=5; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(-8,44); ctx.lineTo(-14,58); ctx.moveTo(8,44); ctx.lineTo(12,58); ctx.stroke(); }
  ctx.restore(); }
function parrot(t){ const fl=Math.sin(t*18)*0.55; let p=null;
  if(t<6.2) return null;
  if(t<7.0){ const u=easeInOut(seg(t,6.2,7.0)); p={x:lerp(-100,340,u),y:lerp(300,620,u),dir:1,flap:fl,perched:false}; }
  else if(t<8.6){ const m=shipPoint(-30,-600,t); const a=-Math.PI+2*Math.PI*seg(t,7.0,8.6); p={x:m.x+170*Math.cos(a),y:m.y+90*Math.sin(a),dir:(-Math.sin(a)>=0)?1:-1,flap:fl,perched:false}; }
  else if(t<9.2){ const m=shipPoint(-30,-600,8.6), b=shipPoint(470,-186,t); const u=easeInOut(seg(t,8.6,9.2)); p={x:lerp(m.x-170,b.x,u),y:lerp(m.y,b.y-48,u),dir:1,flap:fl,perched:false}; }
  else if(t<10.8){ const b=shipPoint(470,-186,t); p={x:b.x,y:b.y-48+2*Math.sin(t*6),dir:1,flap:0,perched:true}; }
  else if(t<11.3){ const b=shipPoint(470,-186,10.8); const u=easeOut(seg(t,10.8,11.3)); p={x:lerp(b.x,700,u),y:lerp(b.y-48,560,u),dir:1,flap:fl,perched:false}; }
  else if(t<14.3){ p={x:700+16*Math.sin(t*2.2),y:560+14*Math.sin(t*3.1),dir:1,flap:fl,perched:false}; }
  else if(t<14.9){ const y0=shipPoint(165,-566,t); const u=easeInOut(seg(t,14.3,14.9)); p={x:lerp(700,y0.x,u),y:lerp(560,y0.y-46,u),dir:1,flap:fl,perched:false}; }
  else if(t<17.0){ const y0=shipPoint(165,-566,t); p={x:y0.x,y:y0.y-46,dir:1,flap:0,perched:true}; }
  else if(t<18.0){ const y0=shipPoint(165,-566,17.0); const u=easeInOut(seg(t,17.0,18.0)); p={x:lerp(y0.x,X_X-58,u),y:lerp(y0.y-46,1236,u)-120*Math.sin(Math.PI*u),dir:1,flap:fl,perched:false}; }
  else { const hop=(t>=19.9&&t<20.4)?Math.abs(Math.sin((t-19.9)*12.6))*26:0; p={x:X_X-58,y:1236-hop,dir:-1,flap:hop>0?fl:0,perched:hop===0}; }   /* Piet sitzt am linken Arm des X */
  return p; }
function gullDraw(x,y,dir,flap){ ctx.save(); ctx.translate(x,y); ctx.scale(dir,1); ctx.fillStyle='#F4F1DE'; ctx.beginPath(); ctx.ellipse(0,0,30,14,0,0,6.29); ctx.fill(); dots([[26,-6,11]],'#F4F1DE'); ctx.fillStyle='#F2A230'; ctx.beginPath(); ctx.moveTo(34,-6); ctx.lineTo(50,-2); ctx.lineTo(34,2); ctx.closePath(); ctx.fill(); dots([[29,-9,2.5]],'#111'); ctx.strokeStyle='#F4F1DE'; ctx.lineWidth=8; ctx.lineCap='round'; ctx.lineJoin='round'; ctx.beginPath(); ctx.moveTo(-4,-4); ctx.lineTo(-30,-26-flap*30); ctx.lineTo(-64,-14-flap*40); ctx.moveTo(4,-4); ctx.lineTo(28,-26-flap*30); ctx.lineTo(60,-14-flap*40); ctx.stroke(); ctx.restore(); }
const HIN_X=980, HIN_Y=1290, HAT_HOME={x:HIN_X,y:HIN_Y-352};
function gullPos(t){ if(t<19.6||t>22.6) return null; const fl=Math.sin(t*16)*0.6;
  if(t<20.2){ const u=easeIn(seg(t,19.6,20.2)); return {x:lerp(1150,HAT_HOME.x,u),y:lerp(200,HAT_HOME.y-30,u),dir:-1,flap:fl}; }
  if(t<20.9){ const u=easeOut(seg(t,20.2,20.9)); return {x:lerp(HAT_HOME.x,560,u),y:lerp(HAT_HOME.y-30,380,u),dir:-1,flap:fl}; }
  if(t<21.6){ const u=easeInOut(seg(t,20.9,21.6)); return {x:lerp(560,HAT_HOME.x,u),y:lerp(380,HAT_HOME.y-90,u)-100*Math.sin(Math.PI*u),dir:1,flap:fl}; }
  const u=easeIn(seg(t,21.6,22.6)); return {x:lerp(HAT_HOME.x,1200,u),y:lerp(HAT_HOME.y-90,150,u),dir:1,flap:fl}; }
function hatPos(t){ if(t<20.2||t>=21.9) return {x:HAT_HOME.x,y:HAT_HOME.y,rot:0}; const g=gullPos(t); if(t<21.6) return {x:g.x,y:g.y+34,rot:(g.dir<0?-0.3:0.3)}; const u=seg(t,21.6,21.9); return {x:HAT_HOME.x,y:lerp(HAT_HOME.y-60,HAT_HOME.y,easeIn(u))-(u>0.85?6*Math.sin((u-0.85)/0.15*Math.PI):0),rot:0.3*(1-u)}; }
function hat(x,y,rot){ ctx.save(); ctx.translate(x,y); ctx.rotate(rot); ctx.fillStyle='#1B1B1B'; ctx.beginPath(); ctx.ellipse(0,0,62,14,0,0,6.29); ctx.fill(); ctx.beginPath(); ctx.moveTo(-42,0); ctx.lineTo(-34,-48); ctx.lineTo(34,-48); ctx.lineTo(42,0); ctx.closePath(); ctx.fill(); dots([[0,-26,9]],'#F4F1DE'); ctx.fillStyle='#E4C567'; ctx.fillRect(-42,-8,84,5); ctx.restore(); }
function hinnerk(t){ const x=HIN_X, by=HIN_Y; const up=t>=20.2&&t<21.9; const name=nameVal();
  ctx.fillStyle='#8A5A2B'; ctx.fillRect(x-30,by-120,16,120); ctx.fillStyle='#2A2013'; rrect(x+6,by-130,30,130,8); ctx.fill(); ctx.fillStyle='#111'; rrect(x+2,by-26,42,26,8); ctx.fill();
  ctx.fillStyle='#F4F1DE'; rrect(x-46,by-270,92,150,18); ctx.fill(); ctx.save(); rrect(x-46,by-270,92,150,18); ctx.clip(); ctx.fillStyle='#A5402B'; for(let yy=by-256;yy<by-130;yy+=28) ctx.fillRect(x-46,yy,92,14); ctx.restore();
  ctx.fillStyle='#12324A'; ctx.beginPath(); ctx.moveTo(x-46,by-270); ctx.lineTo(x-18,by-270); ctx.lineTo(x-30,by-120); ctx.lineTo(x-62,by-120); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.moveTo(x+46,by-270); ctx.lineTo(x+18,by-270); ctx.lineTo(x+30,by-120); ctx.lineTo(x+62,by-120); ctx.closePath(); ctx.fill(); dots([[x-40,by-222,5],[x-42,by-192,5],[x+40,by-222,5],[x+42,by-192,5]],'#E4C567');
  ctx.fillStyle='#4A3320'; ctx.fillRect(x-50,by-136,100,16); dots([[x,by-128,9]],'#E4C567');
  ctx.strokeStyle='#12324A'; ctx.lineWidth=24; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x-40,by-252); if(up) ctx.lineTo(x-92,by-336); else ctx.lineTo(x-86,by-176); ctx.stroke();
  ctx.strokeStyle='#B8BCD9'; ctx.lineWidth=8; ctx.beginPath(); if(up) ctx.arc(x-100,by-352,14,0.3,Math.PI*1.6); else ctx.arc(x-92,by-160,14,Math.PI*0.9,Math.PI*2.2); ctx.stroke();
  ctx.strokeStyle='#12324A'; ctx.lineWidth=24; ctx.beginPath(); ctx.moveTo(x+40,by-252); ctx.lineTo(x+30,by-334); ctx.stroke(); dots([[x+30,by-338,15]],'#F6C9A4');
  /* Schild (hoch genug, dass die Goldzahl aus der Truhe darunter Platz hat) */ ctx.fillStyle='#8A5A2B'; ctx.fillRect(x+22,by-470,16,140); ctx.fillStyle='#6B4A2B'; rrect(x-190,by-530,280,100,14); ctx.fill(); ctx.strokeStyle='#4A3320'; ctx.lineWidth=5; rrect(x-190,by-530,280,100,14); ctx.stroke(); dots([[x-176,by-516,4],[x+76,by-516,4],[x-176,by-444,4],[x+76,by-444,4]],'#E4C567');
  text('Willkommen,',x-50,by-504,fontB(32,700),'#F3E7C9'); text(name+'!',x-50,by-460,fitFont(name+'!',250,44,24),'#E4C567');
  /* Kopf */ dots([[x,by-320,40]],'#F6C9A4'); ctx.fillStyle='#F4F1DE'; ctx.beginPath(); ctx.arc(x,by-304,40,0.1,Math.PI-0.1); ctx.fill(); ctx.fillStyle='#F6C9A4'; ctx.beginPath(); ctx.ellipse(x,by-312,24,10,0,0,6.29); ctx.fill();
  dots([[x-14,by-330,5]],'#111'); dots([[x+14,by-330,12]],'#111'); ctx.strokeStyle='#111'; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(x-38,by-344); ctx.lineTo(x+40,by-322); ctx.stroke(); dots([[x+2,by-314,5]],'#E0A080');
  ctx.fillStyle='#A5402B'; ctx.beginPath(); ctx.ellipse(x,by-346,42,16,0,Math.PI,2*Math.PI); ctx.fill(); ctx.fillRect(x-42,by-350,84,10); dots([[x-20,by-350,3],[x,by-352,3],[x+20,by-350,3]],'#F4F1DE'); ctx.beginPath(); ctx.moveTo(x+40,by-346); ctx.lineTo(x+70,by-330); ctx.lineTo(x+58,by-352); ctx.closePath(); ctx.fill(); }

/* ---------- Insel ---------- */
function islandX(i){ return 620+(SCX_END-SCX[i]); }
function palm(bx,by,tx,ty,sc,t){ const cx=(bx+tx)/2+30, cy=(by+ty)/2; ctx.strokeStyle='#8A5A2B'; ctx.lineWidth=22*sc; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(bx,by); ctx.quadraticCurveTo(cx,cy,tx,ty); ctx.stroke(); ctx.strokeStyle='#6E4620'; ctx.lineWidth=3; for(let k=1;k<7;k++){ const u=k/7, mt=1-u; const x=mt*mt*bx+2*mt*u*cx+u*u*tx, y=mt*mt*by+2*mt*u*cy+u*u*ty; ctx.beginPath(); ctx.moveTo(x-10*sc,y); ctx.lineTo(x+10*sc,y); ctx.stroke(); }
  const sway=0.06*Math.sin(t*1.3); for(let k=0;k<6;k++){ const a=-3.0+k*0.6+sway; ctx.save(); ctx.translate(tx,ty); ctx.rotate(a); ctx.fillStyle=(k%2)?'#2E8B57':'#3CB371'; ctx.beginPath(); ctx.ellipse(70*sc,0,78*sc,22*sc,0,0,6.29); ctx.fill(); ctx.restore(); } dots([[tx-10*sc,ty+14*sc,11*sc],[tx+12*sc,ty+16*sc,11*sc]],'#6E4620'); }
function island(i,t){ const ox=islandX(i); if(ox>W+120) return; ctx.save(); ctx.translate(ox-620,0);   /* Inselobjekte in Endposition gezeichnet, per Offset verschoben */
  palm(700,1292,740,980,1.0,t); palm(1040,1292,1000,1040,0.8,t);
  ctx.fillStyle='#E8D3A0'; ctx.beginPath(); ctx.ellipse(950,1380,360,140,0,0,6.29); ctx.fill(); dots([[1110,1292,34],[1150,1300,22]],'#8E93B8');
  ctx.save(); ctx.translate(X_X,1292); for(const a of [0.6,-0.6]){ ctx.save(); ctx.rotate(a); rrect(-85,-20,170,40,8); ctx.fillStyle='#C9432B'; ctx.fill(); ctx.strokeStyle='#7A2A1A'; ctx.lineWidth=4; ctx.stroke(); ctx.restore(); } ctx.restore();   /* das X bleibt neben Piet sichtbar */
  hinnerk(t); ctx.restore(); }

/* ---------- Konfetti aus der Kanone ---------- */
function confettiCannon(t){ if(t<19.4) return; const m=muzzle(19.4); for(const c of CONF){ const tt=t-19.4-(c.v>1300?0:0.05); if(tt<0||tt>2.6) continue; const x=m.x+Math.cos(c.a)*c.v*tt, y=m.y+Math.sin(c.a)*c.v*tt+0.5*1400*tt*tt; if(y>H+40) continue; ctx.save(); ctx.globalAlpha=1-seg(tt,2.0,2.6); ctx.translate(x,y); ctx.rotate(c.rot+c.spin*tt); ctx.fillStyle=c.c; ctx.fillRect(-c.w/2,-c.h/2,c.w,c.h); ctx.restore(); } }

/* ---------- Texte + Pergament-Karte ---------- */
function texts(t){ const name=nameVal();
  if(t<3){ text('Ahoi! Die Crew sticht in See …',W/2,H*.14,fontB(60,700),'#F3E7C9','center','#12324A',9); }
  popIn(t,3.0,4.8,W/2,H*.22,()=>text('LEINEN LOS!',0,0,fontB(190),'#FFFFFF','center','#12324A',26));
  if(t>=6.3&&t<9.4){ const u=easeOut(seg(t,6.3,6.9)); const lines=wrap(`${name} sticht in See zur Piraten-Party!`,W-160,fontB(112)); ctx.save(); ctx.globalAlpha=u*(1-seg(t,8.9,9.4)); ctx.translate(lerp(-300,0,u),0); lines.forEach((ln,k)=>text(ln,W/2,H*.12+k*122,fontB(112),'#FFFFFF','center','#12324A',24)); ctx.restore(); }
  if(t>=9.9&&t<11.4){ ctx.save(); ctx.globalAlpha=Math.min(seg(t,9.9,10.2),1-seg(t,11.0,11.4)); text('Achtung, Krake!',W/2,H*.13,fontB(110),'#FFE45C','center','#12324A',22); ctx.restore(); }
  popIn(t,12.3,13.1,W/2,H*.25,()=>text('FEUER!',0,0,fontB(210),'#FF7A1A','center','#2A2013',28));
  popIn(t,14.3,16.2,W/2,H*.18,()=>text('Volle Fahrt voraus!',0,0,fitFont('Volle Fahrt voraus!',W-120,130,80),'#FFFFFF','center','#12324A',26));
  const pp=parrot(t); if(pp){ if(t>=8.9&&t<10.3) bubble(pp.x-540,pp.y-262,470,110,'Schatz voraus, Käpt’n!',Math.min(seg(t,8.9,9.2),1-seg(t,10.0,10.3)),'#12324A','#E4C567'); if(t>=13.2&&t<14.3) bubble(pp.x-540,pp.y-262,470,110,'Krakenbändiger!',Math.min(seg(t,13.2,13.5),1-seg(t,14.0,14.3)),'#12324A','#E4C567'); }
  if(t>=20.5){ const u=easeOutBack(seg(t,20.5,21.2)); const cardW=W-140, cardH=520, x=70, y=lerp(-620,40,u); ctx.save(); ctx.shadowColor='rgba(0,0,0,.4)'; ctx.shadowBlur=36; ctx.shadowOffsetY=14; ctx.fillStyle='#F3E7C9'; rrect(x,y,cardW,cardH,26); ctx.fill(); ctx.restore(); ctx.fillStyle='#EAD9B2'; ctx.fillRect(x,y+18,cardW,26); ctx.fillRect(x,y+cardH-44,cardW,26); ctx.strokeStyle='#87621A'; ctx.lineWidth=6; rrect(x+10,y+10,cardW-20,cardH-20,20); ctx.stroke(); ctx.strokeStyle='#E4C567'; ctx.lineWidth=3; rrect(x+20,y+20,cardW-40,cardH-40,16); ctx.stroke();
    text(`🏴‍☠️ ${possName(name)} Piraten-Party`,W/2,y+112,fitFont(`🏴‍☠️ ${possName(name)} Piraten-Party`,cardW-100,74,44),'#12324A'); text(`📅 ${$('date').value}  ·  ${$('time').value}`,W/2,y+215,fontD(54),'#2A2013'); const pl=wrap(`📍 ${$('place').value}`,cardW-120,fontD(54)); pl.forEach((ln,k)=>text(ln,W/2,y+296+k*62,fontD(54),'#2A2013'));
    const pulse=1+.04*Math.sin(t*6); ctx.save(); ctx.translate(W/2,y+440); ctx.scale(pulse,pulse); text('Kommst du mit? ⚓',0,0,fontB(82),'#A5402B'); ctx.restore(); }
  ctx.globalAlpha=.6; text('machsleicht.de',W/2,H-42,fontD(38,600),'#FFFFFF'); ctx.globalAlpha=1; }

/* ---------- Kamerawackeln ---------- */
function shakeAmp(t){ let a=0; if(t>=11.0&&t<11.4) a=6*(1-seg(t,11.0,11.4)); if(t>=12.4&&t<12.9) a=Math.max(a,10*(1-seg(t,12.4,12.9))); if(t>=19.4&&t<19.7) a=Math.max(a,5*(1-seg(t,19.4,19.7))); return a; }

/* ---------- Frame ---------- */
function drawFrame(i){ i=clamp(i,0,P_N-1); const t=i/FPS; const a=shakeAmp(t);
  sky(t); sun(t); clouds(i);
  ctx.save(); if(a>0){ ctx.translate(SHAKE[i][0]*a,SHAKE[i][1]*a); }
  harbor(i);
  waveBand(i,t,BACK,keyed(SEA_BACK,t,1),null);
  island(i,t);   /* Insel liegt VOR dem fernen Meer, das mittlere Wellenband deckt den Strandsaum */
  ship(t);
  krakenAttackHead(t); bubbles(t,1000,(t>=9.6&&t<10.9)||(t>=13.3&&t<14.2));
  waveBand(i,t,MID,keyed(SEA_MID,t,1),'rgba(255,255,255,0.35)');
  krakenAttackTentacles(t);
  dolphins(t); bottle(i,t);
  cannonball(t); { const m=muzzle(12.4); smokeRing(m.x,m.y,seg(t,12.4,13.2)); } splash(1000,1335,seg(t,12.85,13.35),1.3);
  { const an=shipPoint(312,40,t); splash(an.x,an.y,seg(t,17.35,17.8),0.7); }
  krakenReturn(t);
  waveBand(i,t,FRONT,keyed(SEA_FRONT,t,1),'rgba(255,255,255,0.3)');
  const pp=parrot(t); if(pp) parrotDraw(pp.x,pp.y,pp.dir,pp.flap,pp.perched);
  if(t>=16.3){ const hp=hatPos(t); hat(hp.x,hp.y,hp.rot); } const gp=gullPos(t); if(gp) gullDraw(gp.x,gp.y,gp.dir,gp.flap);
  confettiCannon(t);
  ctx.restore();
  texts(t); }

/* ---------- Ton ---------- */
function audio(ac,master,S){ const {tone,noise,bell,gull,bed,env}=S;
  [0.6,1.3,2.0].forEach(t=>bell(t,1568,0.32)); for(let k=0;k<14;k++) noise(1.0+k*0.115,0.03,'bandpass',1800,1800,0.16,0.003,0.03,4);
  [0.4,1.9,2.9,5.3,8.8,15.3,19.7,20.9].forEach(t=>gull(t));
  bed('lowpass',480,0.7,[[2.5,0],[3.5,0.10],[14,0.10],[14.6,0.2],[16.5,0.2],[17.8,0.09],[24,0.07]],0.35,0.04);      /* Wellen */
  bed('bandpass',900,0.6,[[13.8,0],[14.6,0.22],[16.4,0.22],[17.5,0]],0.8,0.06);                                       /* Wind */
  noise(3.0,0.25,'bandpass',300,300,0.35,0.01,0.12); tone(3.0,90,50,0.3,'sine',0.35,0.005,0.2); noise(3.2,0.6,'bandpass',900,400,0.25,0.02,0.4);
  for(const t of [6.8,7.6,7.65,8.45]) noise(t,0.35,'bandpass',1200,500,0.2,0.01,0.25); tone(6.9,2200,3200,0.15,'sine',0.08,0.01,0.08); tone(7.7,2400,3300,0.15,'sine',0.08,0.01,0.08);
  const squawk=(t0,n)=>{ for(let k=0;k<n;k++){ tone(t0+k*0.22,900,1400,0.1,'square',0.07,0.005,0.05); tone(t0+k*0.22+0.1,1400,800,0.1,'square',0.06,0.005,0.06); } };
  squawk(6.4,2); squawk(8.9,3); tone(10.8,1600,2300,0.12,'square',0.08,0.005,0.06); squawk(13.2,3); squawk(17.9,2);
  tone(8.2,520,300,0.15,'sine',0.14,0.005,0.1);                                                                         /* Flaschenpost */
  bed('lowpass',110,0.8,[[9.4,0],[10.2,0.28],[12.9,0.28],[13.6,0.15],[14.3,0]],3,0.1);                                  /* Gurgeln */
  { const r=S.rng(5); for(let k=0;k<10;k++){ const t=9.6+r()*1.2, f=300+r()*300; tone(t,f,f*1.3,0.08,'sine',0.06,0.005,0.05); } for(let k=0;k<10;k++){ const t=13.3+r()*0.9, f=300+r()*300; tone(t,f,f*1.3,0.08,'sine',0.06,0.005,0.05); } }
  noise(11.0,0.2,'lowpass',400,400,0.35,0.005,0.15); tone(11.0,80,50,0.25,'sine',0.4,0.005,0.15); tone(11.1,130,95,0.7,'sawtooth',0.1,0.05,0.4);  /* Tentakel + Knarren */
  noise(12.0,0.4,'highpass',3000,3000,0.12,0.05,0.1);                                                                    /* Lunte */
  tone(12.4,70,30,0.6,'sine',0.55,0.003,0.4); noise(12.4,0.4,'lowpass',300,300,0.55,0.003,0.3); noise(12.4,0.1,'bandpass',1500,1500,0.3,0.002,0.08);  /* Kanone */
  noise(12.85,0.5,'bandpass',1200,400,0.35,0.01,0.35); tone(12.9,700,1200,0.25,'sine',0.15,0.01,0.15);                  /* Platsch + Oktavia erschrickt */
  for(let k=0;k<10;k++) noise(16.9+k*0.05,0.03,'bandpass',1800,1800,0.14,0.003,0.03,4); noise(17.4,0.45,'bandpass',1100,450,0.3,0.01,0.3);   /* Anker */
  bed('lowpass',110,0.8,[[18.9,0],[19.4,0.14],[19.9,0.06],[20.4,0]],3,0.06);
  tone(19.8,200,150,0.5,'sawtooth',0.1,0.03,0.3); { const r=S.rng(9); for(let k=0;k<9;k++){ const t=19.9+r()*0.7, f=2400+r()*1800; tone(t,f,f,0.12,'sine',0.06,0.005,0.1); } }   /* Truhe + Goldglanz */
  tone(19.4,70,30,0.5,'sine',0.35,0.003,0.3); noise(19.4,0.3,'lowpass',300,300,0.35,0.003,0.2); { const r=S.rng(13); for(let k=0;k<12;k++){ const t=19.5+r()*2.0, f=1800+r()*2200; tone(t,f,f,0.12,'sine',0.05,0.005,0.1); } }   /* Konfetti-Kanone */
  [[20.0,392],[20.2,523],[20.4,659],[20.6,784],[20.85,587]].forEach(([t,f])=>tone(t,f,f,0.2,'triangle',0.24)); tone(21.1,523,523,0.7,'triangle',0.26,0.01,0.3);   /* Shanty-Fanfare */
  for(const f of [523,659,784]) for(const d of [-5,5]){ const o=ac.createOscillator(); o.type='sawtooth'; o.frequency.value=f+d; const fl=ac.createBiquadFilter(); fl.type='lowpass'; fl.frequency.value=1200; const g=ac.createGain(); env(g,20.0,0.8,0.018,2.6,0.6); o.connect(fl).connect(g).connect(master); o.start(20.0); o.stop(24); }
  bell(20.7,1046,0.22); tone(21.7,240,160,0.12,'sine',0.2,0.005,0.08); }

startTrailer({ id:'piraten', title:'Piraten-Trailer', DUR:P_DUR, drawFrame, audio, photoDefault:IDA_URI, restFrameAt:8.9 });
