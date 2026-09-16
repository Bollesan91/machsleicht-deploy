/* ============================================================
   Drehbuch DINO — „Expedition ins Dinotal" (STORY-dino.md)
   0–3 Forschercamp · 3–6 Aufbruch · 6–9,6 Urwald (Spuren, Pia, Lotte) · 9,6–14 Rex bruellt,
   Toertchen, „Party?!" · 14–16,5 Schneller als der Vulkan · 16,5–17,8 Dinotal · 17,8–19,2 das Ei
   schluepft mit der Alterszahl · 19,2–21,9 Fanfare, Vulkan-Konfetti, Pia stibitzt den Partyhut ·
   20,5–24 Forscher-Notizbuch-Karte
   ============================================================ */
const P_DUR=24, P_N=P_DUR*FPS;
const HORIZON=1150, GROUND_Y=1330;
const R0=rng(41);
const SHAKE=Array.from({length:P_N+1},()=>[(R0()-.5)*2,(R0()-.5)*2]);
const CONF=Array.from({length:110},()=>({a:-Math.PI/2+(R0()-.5)*1.4,v:700+R0()*700,w:14+R0()*14,h:9+R0()*9,rot:R0()*6.28,spin:(R0()-.5)*9,c:['#E8C15A','#A63F25','#2C7658','#F2E8D5','#FF6F91','#7CE0C3','#FFFFFF'][Math.floor(R0()*7)]}));
const FERNS=Array.from({length:14},()=>({x:R0()*2800,y:1480+R0()*380,s:0.6+R0()*0.8,dark:R0()<0.5}));
const TREES=Array.from({length:12},(_,k)=>({x:k*320+R0()*140,h:260+R0()*140,palm:R0()<0.55}));
const IDA_URI='/*__IDA__*/';

/* ---------- Welt ---------- */
function speed(t){ if(t<3) return 0; if(t<4) return 650*easeIn(seg(t,3,4)); if(t<10.4) return 650; if(t<10.8) return 650*(1-easeOut(seg(t,10.4,10.8))); if(t<13.8) return 0; if(t<14.6) return 950*easeIn(seg(t,13.8,14.6)); if(t<16.5) return 950; if(t<17.8) return 950*(1-easeOut(seg(t,16.5,17.8))); return 0; }
const SCX=[0], STEP=[0]; for(let i=1;i<=P_N;i++){ const v=speed((i-.5)/FPS); SCX[i]=SCX[i-1]+v/FPS; STEP[i]=STEP[i-1]+(v/380)/FPS; } const SCX_END=SCX[P_N];
function mountX(t){ return lerp(540,270,easeInOut(seg(t,16.6,17.8))); }
function mountY(t,i){ return GROUND_Y-(speed(t)>150?12*Math.abs(Math.sin(STEP[i]*Math.PI*2)):3*Math.sin(t*1.6)); }
function mountPoint(lx,ly,t,i){ return {x:mountX(t)+lx, y:mountY(t,i)+ly}; }

/* ---------- Himmel, Urwald ---------- */
const SKY=[[0,'#5F8FC8','#FBE7B2'],[6,'#4F93D6','#CFEAF7'],[9.5,'#4F93D6','#CFEAF7'],[11.5,'#3B5F8A','#9AAFC4'],[13.6,'#4F93D6','#CFEAF7'],[14.8,'#5B3A7E','#F58B4C'],[17.5,'#3B2D62','#F0A868'],[24,'#2B2350','#E9A26B']];
const HILL1=[[0,'#5E9E58'],[9.5,'#5E9E58'],[11.5,'#3E6448'],[13.6,'#5E9E58'],[14.8,'#8A5C58'],[17.5,'#4F3F6A'],[24,'#3A3560']];
const MEAD1=[[0,'#6FAF5C'],[9.5,'#6FAF5C'],[11.5,'#47784A'],[13.6,'#6FAF5C'],[14.8,'#8E7A50'],[17.5,'#5A4E6E'],[24,'#3E3A5E']];
const MEAD2=[[0,'#3E7B3E'],[9.5,'#3E7B3E'],[11.5,'#2C5A34'],[13.6,'#3E7B3E'],[14.8,'#5E4C3C'],[17.5,'#3A3352'],[24,'#2A2748']];
function keyed(list,t,idx){ let a=list[0], b=list[list.length-1]; for(let k=0;k<list.length-1;k++){ if(t>=list[k][0]&&t<=list[k+1][0]){ a=list[k]; b=list[k+1]; break; } } return mixHex(a[idx],b[idx],seg(t,a[0],b[0])); }
function sky(t){ const g=ctx.createLinearGradient(0,0,0,HORIZON); g.addColorStop(0,keyed(SKY,t,1)); g.addColorStop(1,keyed(SKY,t,2)); ctx.fillStyle=g; ctx.fillRect(0,0,W,HORIZON+4); }
function sun(t){ if(t<10){ const a=1-seg(t,8,10); const y=760-t*12; ctx.save(); ctx.globalAlpha=a; dots([[200,y,58]],'#FFE29A'); ctx.globalCompositeOperation='lighter'; const g=ctx.createRadialGradient(200,y,0,200,y,220); g.addColorStop(0,'rgba(255,200,120,0.35)'); g.addColorStop(1,'rgba(255,200,120,0)'); ctx.fillStyle=g; ctx.fillRect(-20,y-220,440,440); ctx.restore(); }
  if(t>=14){ const a=seg(t,14,15); const y=lerp(1000,1120,seg(t,14,18)); ctx.save(); ctx.globalAlpha=a; dots([[300,y,92]],'#FFB347'); ctx.globalCompositeOperation='lighter'; const g=ctx.createRadialGradient(300,y,0,300,y,340); g.addColorStop(0,'rgba(255,150,70,0.45)'); g.addColorStop(1,'rgba(255,150,70,0)'); ctx.fillStyle=g; ctx.fillRect(-40,y-340,680,680); ctx.restore(); } }
const CLOUDS=[[100,220,110],[420,140,140],[760,260,120],[1000,120,100],[1250,200,130],[1500,300,110]];
function clouds(i){ const span=W+800; for(const [cx,cy,r] of CLOUDS){ const x=((cx-SCX[i]*0.2)%span+span)%span-400; ctx.fillStyle='rgba(255,255,255,0.85)'; for(const [dx,dy,rr] of [[0,0,r],[-r*.7,r*.25,r*.75],[r*.75,r*.2,r*.7],[-r*.2,-r*.35,r*.6]]){ ctx.beginPath(); ctx.arc(x+dx,cy+dy,rr,0,6.29); ctx.fill(); } } }
function hills(i,t){ const span=1800; ctx.fillStyle=keyed(HILL1,t,1); for(let k=-1;k<3;k++){ const x=((k*600-SCX[i]*0.3)%span+span)%span-400; ctx.beginPath(); ctx.ellipse(x,1175,420,120,0,Math.PI,2*Math.PI); ctx.fill(); } }
/* Vulkan: steht ab 13,5 s im Hintergrund, bricht 14–16,5 aus und spuckt zur Fanfare Konfetti */
function volcanoX(i){ return 1100+(SCX[F(13.5)]-SCX[i])*0.3; }
function volcano(i,t){ const x=volcanoX(i); const top=HORIZON-560; ctx.fillStyle='#5A4A3A'; ctx.beginPath(); ctx.moveTo(x-380,HORIZON+30); ctx.lineTo(x-70,top); ctx.lineTo(x+70,top); ctx.lineTo(x+380,HORIZON+30); ctx.closePath(); ctx.fill(); ctx.fillStyle='#7A6656'; ctx.beginPath(); ctx.moveTo(x-70,top); ctx.lineTo(x+70,top); ctx.lineTo(x+40,top+40); ctx.lineTo(x-40,top+40); ctx.closePath(); ctx.fill();
  const er=(t>=14.0&&t<16.8)?Math.min(seg(t,14.0,14.4),1-seg(t,16.3,16.8)):(t>=19.2&&t<21.5)?Math.min(seg(t,19.2,19.5),1-seg(t,21.0,21.5)):0;
  if(er>0){ ctx.save(); ctx.globalCompositeOperation='lighter'; const g=ctx.createRadialGradient(x,top,0,x,top,220); g.addColorStop(0,`rgba(255,120,40,${(0.7*er).toFixed(2)})`); g.addColorStop(1,'rgba(255,120,40,0)'); ctx.fillStyle=g; ctx.fillRect(x-220,top-220,440,440); ctx.restore();
    for(let n=0;n<6;n++){ const ph=((t*0.7+n*0.17)%1); ctx.fillStyle=`rgba(120,110,120,${(0.5*er*(1-ph)).toFixed(2)})`; dots([[x+30*Math.sin(t*2+n),top-ph*420,26+ph*60]],ctx.fillStyle); } } }
function volcanoConfetti(i,t,t0,dur){ if(t<t0) return; const x=volcanoX(i), top=HORIZON-560; for(const c of CONF){ const tt=t-t0; if(tt<0||tt>dur) continue; const px=x+Math.cos(c.a)*c.v*tt, py=top+Math.sin(c.a)*c.v*tt+0.5*1300*tt*tt; if(py>H+40) continue; ctx.save(); ctx.globalAlpha=1-seg(tt,dur-0.7,dur); ctx.translate(px,py); ctx.rotate(c.rot+c.spin*tt); ctx.fillStyle=c.c; ctx.fillRect(-c.w/2,-c.h/2,c.w,c.h); ctx.restore(); } }
function trees(i,t){ const span=12*320; for(const tr of TREES){ const x=((tr.x-SCX[i]*0.6)%span+span)%span-250; const base=1300; if(tr.palm){ ctx.strokeStyle='#8A5A2B'; ctx.lineWidth=22; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x,base); ctx.quadraticCurveTo(x+30,base-tr.h*0.5,x+40,base-tr.h); ctx.stroke(); const sway=0.05*Math.sin(t*1.3+x); for(let k=0;k<6;k++){ const a=-3.0+k*0.6+sway; ctx.save(); ctx.translate(x+40,base-tr.h); ctx.rotate(a); ctx.fillStyle=(k%2)?'#2E8B57':'#3CB371'; ctx.beginPath(); ctx.ellipse(70,0,80,22,0,0,6.29); ctx.fill(); ctx.restore(); } }
  else { ctx.fillStyle='#5A3A1E'; ctx.fillRect(x-14,base-tr.h*0.6,28,tr.h*0.6); dots([[x,base-tr.h*0.7,tr.h*0.42],[x-tr.h*0.3,base-tr.h*0.55,tr.h*0.3],[x+tr.h*0.3,base-tr.h*0.55,tr.h*0.3]],'#2E7D46'); dots([[x+tr.h*0.1,base-tr.h*0.85,tr.h*0.28]],'#3E9B5F'); } } }
function fern(x,y,s,dark){ ctx.save(); ctx.translate(x,y); ctx.scale(s,s); ctx.strokeStyle=dark?'#2E7D46':'#3E9B5F'; ctx.lineWidth=10; ctx.lineCap='round'; for(const a of [-2.6,-2.1,-1.57,-1.0,-0.5]){ ctx.beginPath(); ctx.moveTo(0,0); ctx.quadraticCurveTo(Math.cos(a)*60,Math.sin(a)*60-20,Math.cos(a)*120,Math.sin(a)*100); ctx.stroke(); for(let k=1;k<5;k++){ const u=k/5; const px=Math.cos(a)*120*u, py=Math.sin(a)*100*u-10*u; ctx.fillStyle=dark?'#2E7D46':'#3E9B5F'; ctx.beginPath(); ctx.ellipse(px,py,14,6,a,0,6.29); ctx.fill(); } } ctx.restore(); }
function ground(i,t){ ctx.fillStyle=keyed(MEAD1,t,1); ctx.fillRect(0,HORIZON,W,GROUND_Y-30-HORIZON);
  ctx.fillStyle='#8A6E4B'; ctx.fillRect(0,GROUND_Y-30,W,120); ctx.fillStyle='#7A5E3B'; ctx.fillRect(0,GROUND_Y-30,W,10); ctx.fillRect(0,GROUND_Y+82,W,8);
  /* Dino-Fussspuren auf dem Pfad (Spurenleser) */ for(let k=0;k<14;k++){ const wx=1200+k*260; const x=wx-SCX[i]; if(x<-80||x>W+80) continue; const up=k%2; footprint(x,GROUND_Y+(up?10:50),up?-0.1:0.1); }
  const g=ctx.createLinearGradient(0,1420,0,H); g.addColorStop(0,keyed(MEAD1,t,1)); g.addColorStop(1,keyed(MEAD2,t,1)); ctx.fillStyle=g; ctx.fillRect(0,1420,W,H-1420);
  for(const f of FERNS){ const x=((f.x-SCX[i])%2800+2800)%2800-150; fern(x,f.y,f.s,f.dark); } }
function footprint(x,y,rot){ ctx.save(); ctx.translate(x,y); ctx.rotate(rot); ctx.fillStyle='#6E5238'; ctx.beginPath(); ctx.ellipse(0,10,26,20,0,0,6.29); ctx.fill(); for(const a of [-0.9,0,0.9]){ ctx.beginPath(); ctx.ellipse(Math.sin(a)*30,-14-Math.cos(a)*10,10,20,a,0,6.29); ctx.fill(); } ctx.restore(); }
function camp(i){ const ox=-SCX[i]; if(ox<-1500) return; /* Zelt */ ctx.fillStyle='#C9B37A'; ctx.beginPath(); ctx.moveTo(ox-60,1300); ctx.lineTo(ox+130,1040); ctx.lineTo(ox+320,1300); ctx.closePath(); ctx.fill(); ctx.fillStyle='#8A5A2B'; ctx.beginPath(); ctx.moveTo(ox+130,1040); ctx.lineTo(ox+90,1300); ctx.lineTo(ox+170,1300); ctx.closePath(); ctx.fill(); ctx.fillStyle='#4A3320'; ctx.fillRect(ox+126,1000,8,60);
  /* Feuerstelle */ dots([[ox+420,1310,14],[ox+450,1316,14],[ox+480,1310,14]],'#6E6E80'); ctx.fillStyle='#5A3A1E'; ctx.fillRect(ox+410,1290,80,10); ctx.fillRect(ox+430,1280,40,10);
  /* Wegweiser */ ctx.fillStyle='#8A5A2B'; ctx.fillRect(ox+880,1060,16,240); ctx.fillStyle='#C9B37A'; ctx.beginPath(); ctx.moveTo(ox+800,1090); ctx.lineTo(ox+1010,1090); ctx.lineTo(ox+1050,1120); ctx.lineTo(ox+1010,1150); ctx.lineTo(ox+800,1150); ctx.closePath(); ctx.fill(); text('DINOTAL',ox+905,1122,fontB(34),'#26200F'); }

/* ---------- Dinotal (Endposition, per Offset eingefahren) ---------- */
function valleyX(i){ return 620+(SCX_END-SCX[i]); }
const EGG_X=660, STEG_X=950, HAT_HOME={x:STEG_X-195,y:GROUND_Y-315};
function valley(i,t){ const ox=valleyX(i); if(ox>W+700) return; ctx.save(); ctx.translate(ox-620,0);
  /* Palmentor + Lianenbanner */ for(const [px,h] of [[560,600],[1080,620]]){ ctx.strokeStyle='#8A5A2B'; ctx.lineWidth=26; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(px,1300); ctx.quadraticCurveTo(px+(px<800?30:-30),1300-h*0.5,px+(px<800?40:-40),1300-h); ctx.stroke(); const tx=px+(px<800?40:-40), ty=1300-h; for(let k=0;k<6;k++){ ctx.save(); ctx.translate(tx,ty); ctx.rotate(-3.0+k*0.6+0.05*Math.sin(t*1.3)); ctx.fillStyle=(k%2)?'#2E8B57':'#3CB371'; ctx.beginPath(); ctx.ellipse(76,0,86,24,0,0,6.29); ctx.fill(); ctx.restore(); } }
  ctx.strokeStyle='#5A7A3A'; ctx.lineWidth=8; ctx.beginPath(); ctx.moveTo(600,700); ctx.quadraticCurveTo(820,800,1040,680); ctx.stroke(); { const name=nameVal(); ctx.fillStyle='#F2E8D5'; rrect(700,740,300,110,14); ctx.fill(); ctx.strokeStyle='#8A5A2B'; ctx.lineWidth=6; rrect(700,740,300,110,14); ctx.stroke(); dots([[714,754,4],[986,754,4],[714,836,4],[986,836,4]],'#E8C15A'); text('Willkommen,',850,772,fontB(34,700),'#14352A'); text(name+'!',850,818,fitFont(name+'!',270,48,26),'#A63F25'); }
  for(const [bx,by,c] of [[560,560,'#E8C15A'],[604,528,'#A63F25'],[1020,540,'#FF6F91'],[1058,508,'#7CE0C3']]){ const yy=by+8*Math.sin(t*2+bx); ctx.strokeStyle='rgba(255,255,255,.7)'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(bx,yy+32); ctx.lineTo(bx+4,yy+130); ctx.stroke(); ctx.fillStyle=c; ctx.beginPath(); ctx.ellipse(bx,yy,26,32,0,0,6.29); ctx.fill(); }
  nestAndEgg(t); steggi(t);
  ctx.restore(); }
function steggi(t){ const x=STEG_X, by=GROUND_Y; const wag=0.3*Math.sin(t*4);
  ctx.strokeStyle='#8FB56A'; ctx.lineWidth=36; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x+90,by-120); ctx.quadraticCurveTo(x+170,by-130+wag*30,x+210,by-60); ctx.stroke(); dots([[x+205,by-58,10],[x+226,by-70,10]],'#A63F25');
  ctx.fillStyle='#8FB56A'; for(const lx of [-60,-20,40,80]){ rrect(x+lx-16,by-110,32,110,10); ctx.fill(); }
  ctx.fillStyle='#8FB56A'; ctx.beginPath(); ctx.ellipse(x,by-160,120,78,0,0,6.29); ctx.fill(); ctx.fillStyle='#C9DBA0'; ctx.beginPath(); ctx.ellipse(x+10,by-130,80,36,0,0,6.29); ctx.fill();
  ctx.fillStyle='#A63F25'; for(let k=0;k<5;k++){ const px=x-90+k*45; const h=60+30*Math.sin(k*1.2); ctx.beginPath(); ctx.moveTo(px-22,by-215); ctx.lineTo(px,by-215-h); ctx.lineTo(px+22,by-215); ctx.closePath(); ctx.fill(); }
  ctx.strokeStyle='#8FB56A'; ctx.lineWidth=44; ctx.beginPath(); ctx.moveTo(x-100,by-170); ctx.lineTo(x-175,by-260); ctx.stroke(); dots([[x-195,by-275,40]],'#8FB56A'); dots([[x-209,by-289,16]],'#FFFFFF'); dots([[x-206,by-287,8]],'#111'); dots([[x-203,by-292,3]],'#FFF'); ctx.strokeStyle='#2A5A3A'; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(x-213,by-262,12,0.35*Math.PI,1.0*Math.PI); ctx.stroke(); }
function partyHat(x,y,rot){ ctx.save(); ctx.translate(x,y); ctx.rotate(rot); ctx.fillStyle='#E8C15A'; ctx.beginPath(); ctx.moveTo(-30,0); ctx.lineTo(0,-70); ctx.lineTo(30,0); ctx.closePath(); ctx.fill(); ctx.fillStyle='#A63F25'; ctx.beginPath(); ctx.moveTo(-18,-28); ctx.lineTo(0,-70); ctx.lineTo(18,-28); ctx.closePath(); ctx.fill(); dots([[0,-72,7]],'#FF6F91'); ctx.restore(); }
function nestAndEgg(t){ const x=EGG_X, by=GROUND_Y; ctx.fillStyle='#8E8E9E'; ctx.beginPath(); ctx.ellipse(x,by-20,120,44,0,Math.PI,2*Math.PI); ctx.fill(); ctx.fillStyle='#8A5A2B'; ctx.beginPath(); ctx.ellipse(x,by-56,96,26,0,0,6.29); ctx.fill(); ctx.strokeStyle='#C9B37A'; ctx.lineWidth=5; for(let k=0;k<7;k++){ ctx.beginPath(); ctx.moveTo(x-80+k*26,by-50); ctx.lineTo(x-60+k*26,by-70); ctx.stroke(); }
  const wob=(t>=17.8&&t<18.4)?0.12*Math.sin((t-17.8)*30):0; const hatched=t>=18.6;
  if(!hatched){ ctx.save(); ctx.translate(x,by-70); ctx.rotate(wob); ctx.fillStyle='#F2E8D5'; ctx.beginPath(); ctx.ellipse(0,-70,64,86,0,0,6.29); ctx.fill(); dots([[-24,-90,10],[20,-60,9],[10,-116,7],[-6,-40,6]],'#8FB56A'); if(t>=18.4){ ctx.strokeStyle='#26200F'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(-30,-80); ctx.lineTo(-10,-60); ctx.lineTo(10,-84); ctx.lineTo(30,-64); ctx.stroke(); } ctx.restore(); }
  else { ctx.fillStyle='#F2E8D5'; ctx.beginPath(); ctx.moveTo(x-64,by-120); ctx.lineTo(x-40,by-150); ctx.lineTo(x-10,by-124); ctx.lineTo(x+20,by-156); ctx.lineTo(x+50,by-130); ctx.lineTo(x+64,by-120); ctx.quadraticCurveTo(x+60,by-70,x,by-70); ctx.quadraticCurveTo(x-60,by-70,x-64,by-120); ctx.closePath(); ctx.fill(); dots([[x-24,by-100,8],[x+30,by-95,7]],'#8FB56A');
    const pop=easeOutBack(seg(t,18.6,19.0)); const cy=by-150-60*pop; dots([[x,cy,46]],'#9BD16A'); dots([[x-16,cy-8,10],[x+16,cy-8,10]],'#FFFFFF'); dots([[x-14,cy-6,5],[x+18,cy-6,5]],'#111'); ctx.strokeStyle='#2A5A3A'; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(x,cy+10,14,0.15*Math.PI,0.85*Math.PI); ctx.stroke(); ctx.fillStyle='#9BD16A'; ctx.beginPath(); ctx.moveTo(x-30,cy-30); ctx.lineTo(x-24,cy-56); ctx.lineTo(x-12,cy-34); ctx.closePath(); ctx.fill();
    const age=$('age').value.trim().slice(0,2); if(age){ const u=easeOutBack(seg(t,18.7,19.3)); const ny=lerp(cy-40,cy-220,u); ctx.save(); ctx.globalAlpha=seg(t,18.7,18.9); text(age,x,ny,fontB(140),'#FFE45C','center','#905F18',16); ctx.restore(); if(t<19.6){ const r=rng(Math.floor(t*8)); ctx.save(); ctx.globalCompositeOperation='lighter'; for(let n=0;n<8;n++) dots([[x-90+r()*180,ny-90+r()*180,3+r()*4]],'rgba(255,240,180,0.9)'); ctx.restore(); } } } }

/* ---------- Trixi + Forscher-Kind ---------- */
function mountLegs(ph,side){ const legs=(side==='far')?[[110,0.9],[-90,Math.PI+0.9]]:[[140,0],[-60,Math.PI]]; ctx.strokeStyle=(side==='far')?'#6A8C4A':'#7FA35C'; ctx.lineWidth=36; ctx.lineCap='round'; for(const [hx,off] of legs){ const a=0.35*Math.sin(ph*2*Math.PI+off); const fx=hx+Math.sin(a)*120, fy=-130+Math.cos(a)*120; ctx.beginPath(); ctx.moveTo(hx,-130); ctx.lineTo(fx,fy); ctx.stroke(); dots([[fx,fy+6,22]],(side==='far')?'#6A8C4A':'#7FA35C'); dots([[fx-14,fy+18,5],[fx,fy+22,5],[fx+14,fy+18,5]],'#F2E8D5'); } }
function mount(t,i){ const mx=mountX(t), my=mountY(t,i); const ph=STEP[i]; const flagUp=Math.min(seg(t,11.8,12.2),1-seg(t,13.4,13.8)); const headDown=Math.min(seg(t,10.6,11.0),1-seg(t,12.4,12.9));
  ctx.save(); ctx.translate(mx,my);
  mountLegs(ph,'far');
  ctx.strokeStyle='#7FA35C'; ctx.lineWidth=44; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(-160,-200); ctx.quadraticCurveTo(-260,-210,-310,-120+10*Math.sin(t*3)); ctx.stroke();
  /* Fahne (hinter dem Kind) */ ctx.save(); ctx.translate(60,-330); ctx.rotate(-0.1-0.3*flagUp); ctx.fillStyle='#8A5A2B'; ctx.fillRect(-5,-460,10,480); const fw=Math.sin(t*9)*12; ctx.fillStyle='#2C7658'; ctx.beginPath(); ctx.moveTo(5,-458); ctx.quadraticCurveTo(70,-440+fw,140,-430+fw); ctx.lineTo(5,-380); ctx.closePath(); ctx.fill(); ctx.strokeStyle='#E8C15A'; ctx.lineWidth=4; ctx.stroke(); ctx.fillStyle='#F2E8D5'; rrect(40,-436+fw*0.6,34,20,5); ctx.fill(); ctx.fillStyle='#FF6F91'; ctx.fillRect(40,-432+fw*0.6,34,6); ctx.fillStyle='#64B5F6'; ctx.fillRect(50,-448+fw*0.6,4,12); ctx.fillRect(60,-448+fw*0.6,4,12); dots([[52,-451+fw*0.6,3],[62,-451+fw*0.6,3]],'#FFB53A'); ctx.restore();
  /* Koerper */ ctx.fillStyle='#7FA35C'; ctx.beginPath(); ctx.ellipse(0,-190,175,105,0,0,6.29); ctx.fill(); ctx.fillStyle='#B9CF8A'; ctx.beginPath(); ctx.ellipse(10,-160,120,55,0,0,6.29); ctx.fill();
  /* Kopf mit Schild und Hoernern (senkt sich vor Rex) */ ctx.save(); ctx.translate(180,-290); ctx.rotate(0.25*headDown); ctx.fillStyle='#6E8E4E'; ctx.beginPath(); ctx.ellipse(-10,-40,110,110,0,Math.PI*0.75,Math.PI*2.25); ctx.fill(); for(let k=0;k<7;k++){ const a=Math.PI*0.8+k*Math.PI*1.4/6; dots([[-10+108*Math.cos(a),-40+108*Math.sin(a),12]],'#A63F25'); }
    ctx.fillStyle='#7FA35C'; ctx.beginPath(); ctx.ellipse(20,0,86,62,0,0,6.29); ctx.fill(); ctx.fillStyle='#E8C15A'; ctx.beginPath(); ctx.moveTo(80,10); ctx.lineTo(120,20); ctx.lineTo(82,40); ctx.closePath(); ctx.fill();
    ctx.fillStyle='#F2E8D5'; for(const [hx,hy] of [[24,-50],[52,-46]]){ ctx.beginPath(); ctx.moveTo(hx-12,hy); ctx.lineTo(hx+60,hy-70); ctx.lineTo(hx+12,hy+4); ctx.closePath(); ctx.fill(); } ctx.beginPath(); ctx.moveTo(84,-20); ctx.lineTo(120,-44); ctx.lineTo(94,-4); ctx.closePath(); ctx.fill();
    dots([[40,-20,16]],'#FFFFFF'); dots([[46,-18,8]],'#111'); dots([[50,-24,3]],'#FFF'); ctx.restore();
  mountLegs(ph+0.02,'near');
  /* Sattel + Kind */ ctx.fillStyle='#C9B37A'; rrect(-90,-300,150,40,12); ctx.fill(); ctx.fillStyle='#A63F25'; ctx.fillRect(-90,-286,150,8); ctx.fillStyle='#8A5A2B'; rrect(-70,-320,110,34,12); ctx.fill();
  ctx.fillStyle='#C9B37A'; rrect(10,-330,40,70,12); ctx.fill(); rrect(26,-270,32,74,10); ctx.fill(); ctx.fillStyle='#4A3320'; rrect(20,-204,50,22,8); ctx.fill();
  ctx.fillStyle='#C9B37A'; rrect(-55,-470,110,160,26); ctx.fill(); ctx.fillStyle='#8A5A2B'; rrect(-55,-470,110,160,26); ctx.save(); ctx.clip(); ctx.fillRect(-55,-470,34,160); ctx.fillRect(21,-470,34,160); ctx.restore(); ctx.fillStyle='#4A3320'; rrect(-58,-330,116,16,6); ctx.fill(); dots([[0,-322,8]],'#E8C15A');
  dots([[-16,-410,16],[16,-410,16]],'#26200F'); dots([[-16,-410,8],[16,-410,8]],'#6E7FA0'); ctx.strokeStyle='#26200F'; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(-16,-426); ctx.quadraticCurveTo(0,-470,16,-426); ctx.stroke();
  ctx.strokeStyle='#F6C9A4'; ctx.lineWidth=20; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(52,-440); ctx.lineTo(70,-360); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-52,-440); ctx.lineTo(120,-330); ctx.stroke(); ctx.strokeStyle='#8A5A2B'; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(120,-330); ctx.lineTo(200,-320); ctx.stroke();
  /* Kopf mit Foto unter der Hutkrempe */ ctx.save(); ctx.beginPath(); ctx.arc(0,-536,56,0,6.29); ctx.clip(); ctx.fillStyle='#F6C9A4'; ctx.fillRect(-60,-596,120,120); drawPhotoInCircle(0,-536,56,zoomVal()); ctx.restore(); ctx.strokeStyle='#8A5A2B'; ctx.lineWidth=4; ctx.beginPath(); ctx.arc(0,-536,56,0,6.29); ctx.stroke();
  ctx.fillStyle='#C9B37A'; ctx.beginPath(); ctx.ellipse(0,-582,96,18,0,0,6.29); ctx.fill(); rrect(-50,-640,100,62,18); ctx.fill(); ctx.fillStyle='#8A5A2B'; ctx.fillRect(-50,-600,100,12);
  ctx.restore();
  /* Staub */ if(speed(t)>150){ const r=rng(Math.floor(t*10)); for(let n=0;n<6;n++){ const dx=-180-r()*180, dy=-r()*60, rr=14+r()*22; ctx.fillStyle=`rgba(200,180,140,${(0.45-n*0.06).toFixed(2)})`; dots([[mx+dx,my+dy-6,rr]],ctx.fillStyle); } } }

/* ---------- Rex ---------- */
const REX_X=1150, PEEK={x:-20,y:GROUND_Y,sc:0.7};
function rexState(t,i){ if(t<9.6) return null; let x,y,dir=1,sc=1,mouth=0,happy=false,blush=0,sniff=0,run=false,behind=false,dash=0;
  if(t<10.6){ const u=easeOut(seg(t,9.6,10.6)); x=lerp(1500,REX_X,u); y=GROUND_Y; run=true; }
  else if(t<13.3){ x=REX_X; y=GROUND_Y; if(t>=10.8&&t<11.6) mouth=Math.sin(seg(t,10.8,11.6)*Math.PI); if(t>=11.9&&t<12.4) sniff=Math.sin(seg(t,11.9,12.4)*Math.PI); if(t>=12.4){ happy=true; blush=seg(t,12.4,12.9); if(t>=12.9) y=GROUND_Y-12*Math.abs(Math.sin((t-12.9)*12)); } }
  else if(t<16.6){ const mx=mountX(t); y=GROUND_Y; happy=true; blush=0.6; behind=true; run=true;
    if(t<14.1){ x=lerp(REX_X,-470,seg(t,13.3,14.1)); dir=1; dash=(t-13.3)*3; }              /* saust hinter Trixi vorbei nach links aus dem Bild */
    else { x=lerp(-470,mx-520,easeOut(seg(t,14.1,14.7))); dir=-1; } }                         /* kommt umgedreht zurueck und rennt mit */
  else { const u=easeInOut(seg(t,16.6,17.8)); const mx=mountX(16.6); x=lerp(mx-520,PEEK.x,u); y=GROUND_Y; dir=-1; sc=lerp(1,PEEK.sc,u); happy=true; blush=0.6; behind=true; run=u<0.9; }
  return {x,y,dir,sc,mouth,happy,blush,sniff,run,behind,dash}; }
function rex(d,t,i){ ctx.save(); ctx.translate(d.x,d.y); ctx.scale(d.dir*d.sc,d.sc); const ph=STEP[i]*1.3+d.dash; const wag=d.happy?0.25*Math.sin(t*8):0;
  /* Schwanz */ ctx.strokeStyle='#6B8E4E'; ctx.lineWidth=46; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(150,-240); ctx.quadraticCurveTo(320,-260+wag*80,420,-160+wag*60); ctx.stroke();
  /* Beine */ ctx.lineWidth=60; for(const [lx,off] of [[90,0],[-30,Math.PI]]){ const a=d.run?0.4*Math.sin(ph*2*Math.PI+off):0; const kx=lx+Math.sin(a)*90, ky=-150+Math.cos(a)*90; const fx=kx+Math.sin(a*0.5)*80, fy=ky+Math.cos(a*0.5)*80; ctx.beginPath(); ctx.moveTo(lx,-150); ctx.lineTo(kx,ky); ctx.lineTo(fx,Math.min(fy,-6)); ctx.stroke(); dots([[fx-24,-6,10],[fx,-2,10],[fx+24,-6,10]],'#F2E8D5'); }
  /* Koerper */ ctx.fillStyle='#6B8E4E'; ctx.beginPath(); ctx.ellipse(0,-260,190,130,0,0,6.29); ctx.fill(); ctx.fillStyle='#D9CFA0'; ctx.beginPath(); ctx.ellipse(-30,-230,120,80,0,0,6.29); ctx.fill();
  /* Aermchen */ ctx.strokeStyle='#6B8E4E'; ctx.lineWidth=22; ctx.beginPath(); ctx.moveTo(-120,-280); ctx.lineTo(-170,-250); ctx.moveTo(-100,-300); ctx.lineTo(-150,-270); ctx.stroke();
  /* Hals + Kopf */ ctx.save(); ctx.translate(-130,-330); ctx.rotate(d.sniff*0.35); ctx.strokeStyle='#6B8E4E'; ctx.lineWidth=90; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(-110,-90); ctx.stroke();
    ctx.fillStyle='#6B8E4E'; ctx.beginPath(); ctx.ellipse(-190,-110,124,84,0,0,6.29); ctx.fill(); ctx.fillStyle='#5B7A40'; ctx.beginPath(); ctx.ellipse(-250,-70,70,40,0,0,6.29); ctx.fill();
    /* Unterkiefer + Zaehne */ ctx.save(); ctx.translate(-150,-60); ctx.rotate(d.mouth*0.55); ctx.fillStyle='#5B7A40'; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(-160,10); ctx.quadraticCurveTo(-170,50,-120,52); ctx.lineTo(0,40); ctx.closePath(); ctx.fill(); ctx.fillStyle='#FFFFFF'; for(let k=0;k<5;k++){ ctx.beginPath(); ctx.moveTo(-150+k*30,8); ctx.lineTo(-138+k*30,-14); ctx.lineTo(-126+k*30,8); ctx.closePath(); ctx.fill(); } ctx.restore();
    ctx.fillStyle='#FFFFFF'; for(let k=0;k<5;k++){ ctx.beginPath(); ctx.moveTo(-300+k*30,-62); ctx.lineTo(-288+k*30,-40); ctx.lineTo(-276+k*30,-62); ctx.closePath(); ctx.fill(); }
    if(d.mouth>0){ ctx.fillStyle='#8E2A3A'; ctx.beginPath(); ctx.moveTo(-300,-62); ctx.lineTo(-160,-58); ctx.lineTo(-165,-58+d.mouth*40); ctx.lineTo(-300,-62+d.mouth*46); ctx.closePath(); ctx.fill(); }
    const er=d.happy?34:28; dots([[-190,-160,er]],'#FFFFFF'); dots([[-198,-158,d.happy?16:12]],'#111'); dots([[-204,-168,5]],'#FFF'); if(d.happy){ ctx.strokeStyle='#3A4A2A'; ctx.lineWidth=5; ctx.beginPath(); ctx.arc(-190,-160,er+4,Math.PI*1.15,Math.PI*1.85); ctx.stroke(); } else { ctx.strokeStyle='#3A4A2A'; ctx.lineWidth=8; ctx.beginPath(); ctx.moveTo(-230,-200); ctx.lineTo(-150,-190); ctx.stroke(); }
    dots([[-286,-96,6],[-296,-80,5]],'#3A4A2A'); if(d.blush>0){ ctx.save(); ctx.globalAlpha=d.blush*0.7; dots([[-230,-110,20]],'#FF6F91'); ctx.restore(); }
    ctx.restore();
  ctx.restore(); }
function leaves(t){ if(t<10.9||t>12.2) return; const r=rng(53); for(let n=0;n<10;n++){ const t0=10.9+r()*0.6, x0=200+r()*700; const tt=t-t0; if(tt<0) continue; const y=500+tt*520, x=x0+40*Math.sin(tt*4+n); if(y>1300) continue; ctx.save(); ctx.translate(x,y); ctx.rotate(tt*3+n); ctx.fillStyle=(n%2)?'#2E8B57':'#8FB56A'; ctx.beginPath(); ctx.ellipse(0,0,18,8,0,0,6.29); ctx.fill(); ctx.restore(); } }

/* ---------- Pia + Lotte ---------- */
function piaDraw(x,y,dir,flap,perched){ ctx.save(); ctx.translate(x,y); ctx.scale(dir,1); const f=perched?0.15:flap, wx=perched?0.55:1; ctx.fillStyle='#C9803A'; ctx.beginPath(); ctx.moveTo(-6,0); ctx.lineTo(-90*wx,-40-f*50); ctx.lineTo(-150*wx,10-f*30); ctx.lineTo(-40*wx,14); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.moveTo(6,0); ctx.lineTo(90*wx,-40-f*50); ctx.lineTo(150*wx,10-f*30); ctx.lineTo(40*wx,14); ctx.closePath(); ctx.fill(); ctx.fillStyle='#A8642A'; ctx.beginPath(); ctx.ellipse(0,4,30,14,0,0,6.29); ctx.fill(); dots([[38,-8,14]],'#A8642A'); ctx.fillStyle='#A8642A'; ctx.beginPath(); ctx.moveTo(30,-18); ctx.lineTo(-10,-52); ctx.lineTo(36,-14); ctx.closePath(); ctx.fill(); ctx.fillStyle='#E8C15A'; ctx.beginPath(); ctx.moveTo(50,-10); ctx.lineTo(96,-2); ctx.lineTo(50,2); ctx.closePath(); ctx.fill(); dots([[42,-12,3]],'#111'); ctx.restore(); }
function pia(t,i){ const fl=Math.sin(t*10)*0.6; if(t<6.2) return null;
  if(t<7.0){ const u=easeInOut(seg(t,6.2,7.0)); const tip=mountPoint(95,-790,t,i); return {x:lerp(-120,tip.x-170,u),y:lerp(260,tip.y,u),dir:1,flap:fl,perched:false}; }
  if(t<8.6){ const tip=mountPoint(95,-790,t,i); const a=-Math.PI+2*Math.PI*seg(t,7.0,8.6); return {x:tip.x+170*Math.cos(a),y:tip.y+80*Math.sin(a),dir:(-Math.sin(a)>=0)?1:-1,flap:fl,perched:false}; }
  if(t<9.2){ const tip=mountPoint(95,-790,8.6,i), p=mountPoint(0,-640,t,i); const u=easeInOut(seg(t,8.6,9.2)); return {x:lerp(tip.x-170,p.x,u),y:lerp(tip.y,p.y-20,u),dir:1,flap:fl,perched:false}; }
  if(t<10.8){ const p=mountPoint(0,-640,t,i); return {x:p.x,y:p.y-20,dir:1,flap:0,perched:true}; }
  if(t<11.3){ const p=mountPoint(0,-640,10.8,i); const u=easeOut(seg(t,10.8,11.3)); return {x:lerp(p.x,700,u),y:lerp(p.y-20,520,u),dir:1,flap:fl,perched:false}; }
  if(t<14.0) return {x:700+16*Math.sin(t*2.2),y:520+14*Math.sin(t*3.1),dir:1,flap:fl,perched:false};
  if(t<16.5){ const mx=mountX(t); const u=easeInOut(seg(t,14.0,14.6)); return {x:lerp(700,mx-260,u)+10*Math.sin(t*3),y:lerp(520,600,u)+12*Math.sin(t*2.6),dir:1,flap:fl,perched:false}; }
  if(t<17.6){ const mx=mountX(16.5); const u=easeInOut(seg(t,16.5,17.6)); return {x:lerp(mx-260,990,u),y:lerp(600,662,u)-80*Math.sin(Math.PI*u),dir:1,flap:fl,perched:false}; }
  if(t<19.6) return {x:990,y:662,dir:-1,flap:0,perched:true};
  if(t<20.2){ const u=easeIn(seg(t,19.6,20.2)); return {x:lerp(990,HAT_HOME.x,u),y:lerp(662,HAT_HOME.y-40,u),dir:-1,flap:fl,perched:false}; }
  if(t<20.9){ const u=easeOut(seg(t,20.2,20.9)); return {x:lerp(HAT_HOME.x,480,u),y:lerp(HAT_HOME.y-40,660,u),dir:-1,flap:fl,perched:false}; }
  if(t<21.6){ const u=easeInOut(seg(t,20.9,21.6)); return {x:lerp(480,EGG_X,u),y:lerp(660,GROUND_Y-320,u)-90*Math.sin(Math.PI*u),dir:1,flap:fl,perched:false}; }
  const u=easeIn(seg(t,21.6,22.8)); return {x:lerp(EGG_X,1200,u),y:lerp(GROUND_Y-320,150,u),dir:1,flap:fl,perched:false}; }
function hatPos(t){ if(t<20.2) return {x:HAT_HOME.x,y:HAT_HOME.y,rot:-0.2}; if(t<21.6){ const p=pia(t,0); return {x:p.x,y:p.y+40,rot:(p.dir<0?-0.4:0.4)}; } const b=seg(t,21.6,21.9); const babyTop=GROUND_Y-150-60-46; return {x:EGG_X,y:lerp(babyTop-40,babyTop,easeIn(b))-(b>0.85?6*Math.sin((b-0.85)/0.15*Math.PI):0),rot:0.15*(1-b)}; }
function lotte(t){ if(t<7.2||t>8.9) return; const u=Math.min(seg(t,7.2,7.8),1-seg(t,8.5,8.9)); const hy=lerp(200,560,easeInOut(u)); const hx=330; ctx.strokeStyle='#8FB56A'; ctx.lineWidth=90; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(-60,-120); ctx.quadraticCurveTo(80,hy-300,hx,hy); ctx.stroke(); ctx.fillStyle='#8FB56A'; ctx.beginPath(); ctx.ellipse(hx+40,hy,86,60,0.2,0,6.29); ctx.fill(); ctx.fillStyle='#A8C982'; ctx.beginPath(); ctx.ellipse(hx+96,hy+16,40,28,0.2,0,6.29); ctx.fill(); const blink=((t*1.1)%1.5)<0.12; if(blink){ ctx.strokeStyle='#123'; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(hx+40,hy-24); ctx.lineTo(hx+70,hy-24); ctx.stroke(); } else { dots([[hx+56,hy-24,16]],'#FFFFFF'); dots([[hx+60,hy-22,8]],'#111'); } dots([[hx+118,hy+6,5],[hx+126,hy+20,5]],'#3A5A2A'); ctx.strokeStyle='#3A5A2A'; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(hx+96,hy+26,14,0.2*Math.PI,0.8*Math.PI); ctx.stroke(); const chew=4*Math.sin(t*10); ctx.fillStyle='#2E8B57'; ctx.beginPath(); ctx.ellipse(hx+130,hy+40+chew,34,14,0.6,0,6.29); ctx.fill(); }

/* ---------- Texte + Notizbuch-Karte ---------- */
function texts(t,i){ const name=nameVal();
  if(t<3){ text('Expedition ins Dinotal startet …',W/2,H*.14,fontB(60,700),'#F2E8D5','center','#14352A',9); }
  popIn(t,3.0,4.8,W/2,H*.22,()=>text('AUF INS DINOTAL!',0,0,fitFont('AUF INS DINOTAL!',W-120,170,90),'#FFFFFF','center','#14352A',26));
  if(t>=6.3&&t<9.4){ const u=easeOut(seg(t,6.3,6.9)); const lines=wrap(`${name} reitet ins Dinotal!`,W-160,fontB(112)); ctx.save(); ctx.globalAlpha=u*(1-seg(t,8.9,9.4)); ctx.translate(lerp(-300,0,u),0); lines.forEach((ln,k)=>text(ln,W/2,H*.12+k*122,fontB(112),'#FFFFFF','center','#14352A',24)); ctx.restore(); }
  if(t>=9.9&&t<11.4){ ctx.save(); ctx.globalAlpha=Math.min(seg(t,9.9,10.2),1-seg(t,11.0,11.4)); text('Achtung, T-Rex!',W/2,H*.13,fontB(110),'#FFE45C','center','#14352A',22); ctx.restore(); }
  popIn(t,10.9,11.7,W/2+120,H*.23,()=>text('RRROAR!',0,0,fontB(150),'#A63F25','center','#26200F',22));
  popIn(t,14.3,16.2,W/2,H*.78,()=>text('Schneller als der Vulkan!',0,0,fitFont('Schneller als der Vulkan!',W-120,120,64),'#FFFFFF','center','#14352A',26));
  const p=pia(t,i); if(p){ if(t>=9.4&&t<10.6) bubble(p.x-440,p.y-262,470,110,'Da lang, Forscher!',Math.min(seg(t,9.4,9.7),1-seg(t,10.3,10.6)),'#14352A','#E8C15A',true); if(t>=13.2&&t<14.3) bubble(p.x-440,p.y-262,470,110,'Dino-Retter!',Math.min(seg(t,13.2,13.5),1-seg(t,14.0,14.3)),'#14352A','#E8C15A',true); }
  if(t>=12.4&&t<13.4) bubble(700,640,360,110,'Party?!',Math.min(seg(t,12.4,12.7),1-seg(t,13.1,13.4)),'#A63F25','#E8C15A');
  if(t>=20.2&&t<20.8) bubble(760,856,320,96,'Huch!',Math.min(seg(t,20.2,20.4),1-seg(t,20.6,20.8)),'#A63F25','#E8C15A');
  if(t>=20.5){ const u=easeOutBack(seg(t,20.5,21.2)); const cardW=W-140, cardH=520, x=70, y=lerp(-620,40,u); ctx.save(); ctx.shadowColor='rgba(0,0,0,.4)'; ctx.shadowBlur=36; ctx.shadowOffsetY=14; ctx.fillStyle='#F2E8D5'; rrect(x,y,cardW,cardH,26); ctx.fill(); ctx.restore(); ctx.strokeStyle='#8A5A2B'; ctx.lineWidth=5; rrect(x+12,y+12,cardW-24,cardH-24,20); ctx.stroke();
    for(const [lx,ly,rot] of [[x+30,y+40,-0.6],[x+cardW-30,y+40,0.6],[x+30,y+cardH-40,-2.4],[x+cardW-30,y+cardH-40,2.4]]){ ctx.save(); ctx.translate(lx,ly); ctx.rotate(rot); ctx.fillStyle='#2C7658'; ctx.beginPath(); ctx.ellipse(0,-30,16,40,0,0,6.29); ctx.fill(); ctx.fillStyle='#3E9B5F'; ctx.beginPath(); ctx.ellipse(22,-16,12,30,0.7,0,6.29); ctx.fill(); ctx.restore(); }
    ctx.save(); ctx.globalAlpha=0.35; footprint(x+cardW-90,y+cardH-90,0.4); ctx.restore();
    text(`🦕 ${possName(name)} Dino-Party`,W/2,y+112,fitFont(`🦕 ${possName(name)} Dino-Party`,cardW-140,74,44),'#14352A'); text(`📅 ${$('date').value}  ·  ${$('time').value}`,W/2,y+215,fontD(54),'#26200F'); const pl=wrap(`📍 ${$('place').value}`,cardW-120,fontD(54)); pl.forEach((ln,k)=>text(ln,W/2,y+296+k*62,fontD(54),'#26200F'));
    const pulse=1+.04*Math.sin(t*6); ctx.save(); ctx.translate(W/2,y+440); ctx.scale(pulse,pulse); text('Kommst du mit? 🦖',0,0,fontB(82),'#A63F25'); ctx.restore(); }
  ctx.globalAlpha=.6; text('machsleicht.de',W/2,H-42,fontD(38,600),'#FFFFFF'); ctx.globalAlpha=1; }

function shakeAmp(t){ let a=0; if(t>=9.6&&t<10.6){ const st=((t-9.6)%0.5)/0.5; a=7*(1-st); } if(t>=10.8&&t<11.6) a=Math.max(a,9*Math.sin(seg(t,10.8,11.6)*Math.PI)); if(t>=14.0&&t<16.6) a=Math.max(a,3); if(t>=19.2&&t<19.6) a=Math.max(a,5*(1-seg(t,19.2,19.6))); return a; }

/* ---------- Frame ---------- */
function drawFrame(i){ i=clamp(i,0,P_N-1); const t=i/FPS; const a=shakeAmp(t);
  sky(t); sun(t); clouds(i);
  ctx.save(); if(a>0){ ctx.translate(SHAKE[i][0]*a,SHAKE[i][1]*a); }
  volcano(i,t); hills(i,t); trees(i,t); ground(i,t); camp(i); valley(i,t);
  lotte(t);
  const d=rexState(t,i); if(d&&d.behind) rex(d,t,i);
  mount(t,i);
  if(d&&!d.behind) rex(d,t,i);
  leaves(t);
  const p=pia(t,i); if(p) piaDraw(p.x,p.y,p.dir,p.flap,p.perched);
  if(t>=16.2){ const hp=hatPos(t); partyHat(hp.x,hp.y,hp.rot); }
  volcanoConfetti(i,t,14.2,2.6); volcanoConfetti(i,t,19.3,2.8);
  ctx.restore();
  texts(t,i); }

/* ---------- Ton ---------- */
function audio(ac,master,S){ const {tone,noise,bell,bed,env}=S;
  const drum=(t0,peak=0.5)=>{ tone(t0,110,55,0.25,'sine',peak,0.003,0.2); noise(t0,0.08,'lowpass',400,400,peak*0.6,0.002,0.06); };
  const chirp=(t0)=>{ tone(t0,2600,3300,0.07,'sine',0.05,0.005,0.04); tone(t0+0.1,3000,2500,0.06,'sine',0.04,0.005,0.04); };
  const cry=(t0)=>{ tone(t0,1800,1200,0.3,'sawtooth',0.06,0.02,0.15); tone(t0+0.3,1300,1600,0.15,'sine',0.08,0.01,0.1); };
  const brass=(t0,f,dur,peak=0.2)=>{ const o=ac.createOscillator(); o.type='sawtooth'; o.frequency.value=f; const fl=ac.createBiquadFilter(); fl.type='lowpass'; fl.frequency.setValueAtTime(600,t0); fl.frequency.linearRampToValueAtTime(2400,t0+0.08); fl.frequency.linearRampToValueAtTime(1200,t0+dur); const g=ac.createGain(); env(g,t0,0.03,peak,Math.max(0.01,dur-0.13),0.1); o.connect(fl).connect(g).connect(master); o.start(t0); o.stop(t0+dur+0.2); };
  [0.6,1.3,2.0].forEach(t=>drum(t,0.5)); drum(3.0,0.6); drum(3.15,0.4);
  { const r=S.rng(3); for(let k=0;k<12;k++) chirp(0.3+r()*9); for(let k=0;k<6;k++) chirp(16.6+r()*7); }
  noise(1.6,0.3,'lowpass',250,250,0.2,0.01,0.2);
  /* Trixis Stampfen: waehrend der Fahrt */ for(let t=3.3;t<10.5;t+=0.62){ tone(t,70,45,0.12,'sine',0.3,0.003,0.1); noise(t,0.08,'lowpass',200,200,0.2,0.003,0.06); } for(let t=14.0;t<17.5;t+=0.4){ tone(t,70,45,0.1,'sine',0.28,0.003,0.08); noise(t,0.06,'lowpass',200,200,0.18,0.003,0.05); }
  cry(6.4); cry(9.4); cry(13.2); cry(19.7);
  for(let k=0;k<3;k++) noise(7.8+k*0.3,0.1,'bandpass',600,600,0.12,0.01,0.08,2);                                           /* Lotte kaut */
  /* Rex */ for(let t=9.6;t<10.6;t+=0.5){ tone(t,55,35,0.2,'sine',0.5,0.003,0.15); noise(t,0.12,'lowpass',250,250,0.35,0.003,0.1); }
  tone(10.8,110,65,1.0,'sawtooth',0.22,0.05,0.5); noise(10.8,1.0,'lowpass',250,250,0.3,0.05,0.5); noise(11.0,0.5,'bandpass',1500,1500,0.12,0.05,0.3);
  noise(11.9,0.12,'highpass',2000,2000,0.1,0.02,0.08); noise(12.1,0.12,'highpass',2000,2000,0.1,0.02,0.08);              /* Schnuppern */
  tone(12.4,500,700,0.2,'sine',0.15,0.01,0.1); tone(12.65,700,950,0.25,'sine',0.15,0.01,0.12); [12.9,13.02,13.14].forEach((t,k)=>tone(t,420+k*100,420+k*100,0.08,'square',0.08,0.005,0.05));
  /* Vulkan */ bed('lowpass',90,0.8,[[13.7,0],[14.2,0.3],[16.4,0.3],[17.0,0]],3,0.12); tone(14.0,60,30,0.8,'sine',0.5,0.005,0.6); noise(14.0,0.6,'lowpass',300,300,0.5,0.005,0.4); { const r=S.rng(21); for(let k=0;k<16;k++){ const f=1500+r()*2500; tone(14.2+r()*2.4,f,f,0.1,'sine',0.05,0.003,0.08); } }
  bed('bandpass',900,0.6,[[13.9,0],[14.6,0.18],[16.4,0.18],[17.4,0]],0.8,0.05);
  /* Das Ei */ [17.8,17.95,18.1,18.25].forEach(t=>tone(t,300,260,0.08,'sine',0.14,0.005,0.06)); noise(18.4,0.08,'bandpass',2500,2500,0.3,0.002,0.06,2); tone(18.6,600,900,0.12,'sine',0.2,0.005,0.08); tone(18.8,1400,1900,0.1,'sine',0.12,0.005,0.06); tone(18.95,1500,2000,0.1,'sine',0.12,0.005,0.06);
  { const r=S.rng(9); for(let k=0;k<8;k++){ const f=2400+r()*1800; tone(18.7+r()*0.6,f,f,0.12,'sine',0.06,0.005,0.1); } }
  /* Fanfare */ drum(19.2,0.5); drum(19.4,0.5); [[19.5,392],[19.7,494],[19.9,587]].forEach(([t,f])=>brass(t,f,0.28,0.2)); brass(20.15,784,0.8,0.18); tone(19.3,60,30,0.6,'sine',0.4,0.005,0.4); { const r=S.rng(13); for(let k=0;k<12;k++){ const f=1800+r()*2200; tone(19.5+r()*2.0,f,f,0.12,'sine',0.05,0.005,0.1); } }
  tone(21.7,240,160,0.12,'sine',0.2,0.005,0.08); bell(20.7,1046,0.22);
  for(const f of [392,494,587]) for(const d of [-5,5]){ const o=ac.createOscillator(); o.type='sawtooth'; o.frequency.value=f+d; const fl=ac.createBiquadFilter(); fl.type='lowpass'; fl.frequency.value=1200; const g=ac.createGain(); env(g,20.0,0.8,0.018,2.6,0.6); o.connect(fl).connect(g).connect(master); o.start(20.0); o.stop(24); } }

startTrailer({ id:'dino', title:'Dino-Trailer', DUR:P_DUR, drawFrame, audio, photoDefault:IDA_URI, restFrameAt:8.9 });
