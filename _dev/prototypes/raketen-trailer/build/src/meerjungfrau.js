
/* ============================================================
   Drehbuch MEERJUNGFRAU — „Tauchgang zum Perlenpalast" (STORY-meerjungfrau.md)
   0–3 Muschelbucht · 3–6 Abtauchen · 6–9,6 Korallenriff (Floeckchen, Oma Trudi) · 9,6–14 Hai Hektor
   schnappt, Toertchen, „Party?!", saust vorbei · 14–16,5 Schneller als der Meeresvulkan · 16,5–17,8 Perlenpalast ·
   17,8–19,2 Riesenmuschel klappt auf, Perle mit Alterszahl · 19,2–21,9 Fanfare, Puffi plustert sich auf, Hut fliegt
   auf Kalle · 20,5–24 Muschelpost-Karte
   ============================================================ */
const P_DUR=24, P_N=P_DUR*FPS;
const SAND_Y=1250, MOUNT_Y=1090;
const R0=rng(77);
const SHAKE=Array.from({length:P_N+1},()=>[(R0()-.5)*2,(R0()-.5)*2]);
const CONF=Array.from({length:110},()=>({a:-Math.PI/2+(R0()-.5)*1.4,v:600+R0()*600,w:14+R0()*14,h:9+R0()*9,rot:R0()*6.28,spin:(R0()-.5)*9,c:['#E9C46A','#E07A5F','#7BE0D6','#F2EAD6','#FF6F91','#B36CC7','#FFFFFF'][Math.floor(R0()*7)]}));
const BUBBLES=Array.from({length:36},()=>({x:R0()*2800,y0:R0()*1900,v:40+R0()*70,r:4+R0()*9,ph:R0()*6.28}));
const CORALS=Array.from({length:14},(_,k)=>({x:k*300+R0()*120,h:150+R0()*170,kind:Math.floor(R0()*4),c:['#F26B8A','#FF9F5A','#C77DFF','#FFD166'][Math.floor(R0()*4)]}));
const FISH=Array.from({length:18},()=>({x:R0()*2400,y:520+R0()*520,s:0.6+R0()*0.6,c:['#FFD166','#06D6A0','#EF476F','#F4A261'][Math.floor(R0()*4)],ph:R0()*6.28,far:R0()<0.5}));
const SHELLS=Array.from({length:16},()=>({x:R0()*2800,y:SAND_Y+60+R0()*300,kind:Math.floor(R0()*3),s:0.7+R0()*0.6,rot:R0()*6.28}));
const STREAKS=Array.from({length:14},()=>({x:R0()*1600,y:560+R0()*760,len:120+R0()*220}));
const IDA_URI='/*__IDA__*/';
const rgba=(h,a)=>`rgba(${parseInt(h.slice(1,3),16)},${parseInt(h.slice(3,5),16)},${parseInt(h.slice(5,7),16)},${a})`;

/* ---------- Fahrt: Welt-Scroll ---------- */
function speed(t){ if(t<3) return 0; if(t<4) return 650*easeIn(seg(t,3,4)); if(t<10.4) return 650; if(t<10.8) return 650*(1-easeOut(seg(t,10.4,10.8))); if(t<13.8) return 0; if(t<14.6) return 950*easeIn(seg(t,13.8,14.6)); if(t<16.5) return 950; if(t<17.8) return 950*(1-easeOut(seg(t,16.5,17.8))); return 0; }
const SCX=[0], STEP=[0]; for(let i=1;i<=P_N;i++){ const v=speed((i-.5)/FPS); SCX[i]=SCX[i-1]+v/FPS; STEP[i]=STEP[i-1]+(v/380)/FPS; } const SCX_END=SCX[P_N];
function mountX(t){ return lerp(540,270,easeInOut(seg(t,16.6,17.8))); }
function mountY(t,i){ return MOUNT_Y+(speed(t)>150?10*Math.sin(STEP[i]*Math.PI*2):8*Math.sin(t*1.6)); }
function mountPoint(lx,ly,t,i){ return {x:mountX(t)+lx, y:mountY(t,i)+ly}; }

/* ---------- Wasser, Licht, Riff ---------- */
const WATER=[[0,'#6ECBE8','#0F6A8C'],[6,'#45AAD2','#0B4E6B'],[9.5,'#45AAD2','#0B4E6B'],[11.5,'#2C6F8C','#062A3D'],[13.6,'#45AAD2','#0B4E6B'],[14.8,'#5B4E9C','#1B1F4A'],[17.5,'#3B3F8E','#12174A'],[24,'#2F3578','#0E1240']];
const SANDC=[[0,'#EAD9A8','#C9B27C'],[9.5,'#EAD9A8','#C9B27C'],[11.5,'#A99B7C','#7E7258'],[13.6,'#EAD9A8','#C9B27C'],[14.8,'#A08596','#6E5A70'],[17.5,'#7C72AC','#524A80'],[24,'#6A6198','#443E6E']];
const REEFC=[[0,'#1E7A8C'],[9.5,'#1E7A8C'],[11.5,'#0F4556'],[13.6,'#1E7A8C'],[14.8,'#3A3A78'],[17.5,'#2B2E70'],[24,'#232660']];
function keyed(list,t,idx){ let a=list[0], b=list[list.length-1]; for(let k=0;k<list.length-1;k++){ if(t>=list[k][0]&&t<=list[k+1][0]){ a=list[k]; b=list[k+1]; break; } } return mixHex(a[idx],b[idx],seg(t,a[0],b[0])); }
function water(t){ const g=ctx.createLinearGradient(0,0,0,H); g.addColorStop(0,keyed(WATER,t,1)); g.addColorStop(1,keyed(WATER,t,2)); ctx.fillStyle=g; ctx.fillRect(0,0,W,H); }
function surface(t){ if(t>=7) return; const a=1-seg(t,3,6.5); if(a<=0) return; ctx.save(); const g=ctx.createLinearGradient(0,0,0,260); g.addColorStop(0,`rgba(255,255,255,${(0.55*a).toFixed(2)})`); g.addColorStop(1,'rgba(255,255,255,0)'); ctx.fillStyle=g; ctx.fillRect(0,0,W,260); ctx.globalCompositeOperation='lighter'; ctx.fillStyle=`rgba(255,255,255,${(0.10*a).toFixed(3)})`; for(let k=0;k<5;k++){ const x0=140+k*200+30*Math.sin(t*0.7+k); ctx.beginPath(); ctx.moveTo(x0-30,0); ctx.lineTo(x0+30,0); ctx.lineTo(x0+150,980); ctx.lineTo(x0-60,980); ctx.closePath(); ctx.fill(); } ctx.restore(); }
function reefFar(i,t){ const span=1800; const c=keyed(REEFC,t,1); ctx.fillStyle=c; ctx.strokeStyle=c; ctx.lineWidth=10; ctx.lineCap='round'; for(let k=-1;k<3;k++){ const x=((k*600-SCX[i]*0.3)%span+span)%span-400; ctx.beginPath(); ctx.ellipse(x,SAND_Y+60,330,200,0,Math.PI,2*Math.PI); ctx.fill(); ctx.beginPath(); ctx.ellipse(x+280,SAND_Y+60,180,120,0,Math.PI,2*Math.PI); ctx.fill(); for(let n=-2;n<=2;n++){ ctx.beginPath(); ctx.moveTo(x-150,SAND_Y-140); ctx.quadraticCurveTo(x-150+n*40,SAND_Y-260,x-150+n*70,SAND_Y-360); ctx.stroke(); } } }
function volcanoX(i){ return 1100+(SCX[F(13.5)]-SCX[i])*0.3; }
function volcano(i,t){ const x=volcanoX(i); const top=SAND_Y-660; ctx.fillStyle='#33395A'; ctx.beginPath(); ctx.moveTo(x-380,SAND_Y+40); ctx.lineTo(x-70,top); ctx.lineTo(x+70,top); ctx.lineTo(x+380,SAND_Y+40); ctx.closePath(); ctx.fill(); ctx.fillStyle='#4C5178'; ctx.beginPath(); ctx.moveTo(x-70,top); ctx.lineTo(x+70,top); ctx.lineTo(x+40,top+40); ctx.lineTo(x-40,top+40); ctx.closePath(); ctx.fill();
  const er=(t>=14.0&&t<16.8)?Math.min(seg(t,14.0,14.4),1-seg(t,16.3,16.8)):(t>=19.2&&t<21.5)?Math.min(seg(t,19.2,19.5),1-seg(t,21.0,21.5)):0;
  if(er>0){ ctx.save(); ctx.globalCompositeOperation='lighter'; const g=ctx.createRadialGradient(x,top,0,x,top,220); g.addColorStop(0,`rgba(255,140,60,${(0.7*er).toFixed(2)})`); g.addColorStop(1,'rgba(255,140,60,0)'); ctx.fillStyle=g; ctx.fillRect(x-220,top-220,440,440); ctx.restore();
    ctx.lineWidth=6; for(let n=0;n<6;n++){ const ph=((t*0.6+n*0.17)%1); ctx.strokeStyle=`rgba(255,255,255,${(0.6*er*(1-ph)).toFixed(2)})`; ctx.beginPath(); ctx.arc(x+30*Math.sin(t*2+n),top-ph*440,18+ph*60,0,6.29); ctx.stroke(); } } }
function volcanoConfetti(i,t,t0,dur){ if(t<t0) return; const x=volcanoX(i), top=SAND_Y-660; for(const c of CONF){ const tt=t-t0; if(tt<0||tt>dur) continue; const px=x+Math.cos(c.a)*c.v*tt, py=top+Math.sin(c.a)*c.v*tt+0.5*900*tt*tt; if(py>H+40) continue; ctx.save(); ctx.globalAlpha=1-seg(tt,dur-0.7,dur); ctx.translate(px,py); ctx.rotate(c.rot+c.spin*tt); ctx.fillStyle=c.c; ctx.fillRect(-c.w/2,-c.h/2,c.w,c.h); ctx.restore(); } }
function corals(i,t){ const span=14*300; for(const c of CORALS){ const x=((c.x-SCX[i]*0.6)%span+span)%span-250; const base=SAND_Y+16, h=c.h; ctx.fillStyle=c.c; ctx.strokeStyle=c.c; ctx.lineCap='round';
  if(c.kind===0){ ctx.lineWidth=22; for(const [dx,dh] of [[-60,0.7],[-20,1],[30,0.85],[70,0.6]]){ ctx.beginPath(); ctx.moveTo(x,base); ctx.quadraticCurveTo(x+dx*0.5,base-h*dh*0.5,x+dx,base-h*dh); ctx.stroke(); dots([[x+dx,base-h*dh,14]],c.c); } }
  else if(c.kind===1){ ctx.beginPath(); ctx.ellipse(x,base-h*0.3,h*0.42,h*0.3,0,0,6.29); ctx.fill(); ctx.strokeStyle='rgba(0,0,0,0.18)'; ctx.lineWidth=4; for(let k=-2;k<=2;k++){ ctx.beginPath(); ctx.moveTo(x-h*0.3,base-h*0.3+k*h*0.1); ctx.quadraticCurveTo(x,base-h*0.3+k*h*0.1+10,x+h*0.3,base-h*0.3+k*h*0.1); ctx.stroke(); } }
  else if(c.kind===2){ ctx.lineWidth=12; for(let k=-4;k<=4;k++){ const sw=Math.sin(t*2+k+x*0.01)*18; ctx.beginPath(); ctx.moveTo(x+k*9,base); ctx.quadraticCurveTo(x+k*14+sw*0.5,base-h*0.35,x+k*22+sw,base-h*0.6); ctx.stroke(); } }
  else { ctx.strokeStyle='#2F8F6A'; ctx.lineWidth=14; ctx.beginPath(); ctx.moveTo(x,base); let px=x,py=base; for(let k=1;k<=4;k++){ const ny=base-h*k/4, nx=x+Math.sin(t*1.3+k*1.1+x*0.01)*(8+k*7); ctx.quadraticCurveTo((px+nx)/2+10*Math.sin(t*1.7+k),(py+ny)/2,nx,ny); px=nx; py=ny; } ctx.stroke(); ctx.fillStyle='#3CB371'; for(let k=1;k<8;k++){ const u=k/8; ctx.save(); ctx.translate(x+Math.sin(t*1.3+u*4.4+x*0.01)*(8+u*28),base-h*u); ctx.rotate((k%2?-1:1)*0.9); ctx.beginPath(); ctx.ellipse(30,0,32,10,0,0,6.29); ctx.fill(); ctx.restore(); } } } }
function fishes(i,t,far){ for(const f of FISH){ if(f.far!==far) continue; const par=far?0.45:0.8; const x=((f.x-SCX[i]*par)%2400+2400)%2400-200; const y=f.y+10*Math.sin(t*2+f.ph); const s=f.s*(far?0.7:1); ctx.save(); ctx.translate(x,y); ctx.scale(s,s); ctx.fillStyle=f.c; ctx.beginPath(); ctx.moveTo(-18,0); ctx.lineTo(-40,-14+6*Math.sin(t*9+f.ph)); ctx.lineTo(-40,14+6*Math.sin(t*9+f.ph)); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.ellipse(0,0,24,13,0,0,6.29); ctx.fill(); dots([[12,-3,4]],'#FFFFFF'); dots([[13,-3,2]],'#111'); ctx.restore(); } }
function bubbles(i,t){ ctx.lineWidth=2; for(const b of BUBBLES){ const x=((b.x-SCX[i]*0.7)%2800+2800)%2800-100+10*Math.sin(t*1.5+b.ph); const y=((b.y0-t*b.v)%1900+1900)%1900; ctx.strokeStyle='rgba(255,255,255,0.5)'; ctx.beginPath(); ctx.arc(x,y,b.r,0,6.29); ctx.stroke(); dots([[x-b.r*0.35,y-b.r*0.35,b.r*0.25]],'rgba(255,255,255,0.7)'); } }
function streaks(i,t){ const a=Math.min(seg(t,14.0,14.5),1-seg(t,16.2,16.8)); if(a<=0) return; ctx.strokeStyle=`rgba(255,255,255,${(0.3*a).toFixed(2)})`; ctx.lineWidth=4; ctx.lineCap='round'; for(const s of STREAKS){ const x=((s.x-SCX[i]*1.6)%1800+1800)%1800-300; ctx.beginPath(); ctx.moveTo(x,s.y); ctx.lineTo(x+s.len,s.y); ctx.stroke(); } }

/* ---------- Sand, Muscheln, Bucht ---------- */
function shellDraw(x,y,s,rot,kind){ ctx.save(); ctx.translate(x,y); ctx.rotate(rot); ctx.scale(s,s); if(kind===0){ ctx.fillStyle='#F4C2CF'; ctx.beginPath(); ctx.moveTo(0,16); for(let k=0;k<=6;k++){ const a=Math.PI+k*Math.PI/6; ctx.lineTo(Math.cos(a)*34,16+Math.sin(a)*30); } ctx.closePath(); ctx.fill(); ctx.strokeStyle='#D98BA3'; ctx.lineWidth=2; for(let k=1;k<6;k++){ const a=Math.PI+k*Math.PI/6; ctx.beginPath(); ctx.moveTo(0,16); ctx.lineTo(Math.cos(a)*34,16+Math.sin(a)*30); ctx.stroke(); } } else if(kind===1){ ctx.fillStyle='#F4A261'; ctx.beginPath(); for(let k=0;k<10;k++){ const a=-Math.PI/2+k*Math.PI/5; const r=(k%2)?12:32; ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r); } ctx.closePath(); ctx.fill(); dots([[0,0,4],[0,-16,3],[15,-5,3],[9,13,3],[-9,13,3],[-15,-5,3]],'#E76F51'); } else { for(const [px,py] of [[-14,4],[10,-6],[4,12]]){ dots([[px,py,9]],'#F2EAD6'); dots([[px-3,py-3,3]],'#FFFFFF'); } } ctx.restore(); }
function sand(i,t){ const g=ctx.createLinearGradient(0,SAND_Y,0,H); g.addColorStop(0,keyed(SANDC,t,1)); g.addColorStop(1,keyed(SANDC,t,2)); ctx.fillStyle=g; ctx.fillRect(0,SAND_Y,W,H-SAND_Y);
  ctx.strokeStyle='rgba(255,255,255,0.22)'; ctx.lineWidth=4; ctx.lineCap='round'; for(let k=0;k<9;k++){ const wx=k*330+((k%3)*70); const x=((wx-SCX[i]*0.9)%2970+2970)%2970-200; const y=SAND_Y+80+(k%4)*110; ctx.beginPath(); ctx.moveTo(x,y); ctx.quadraticCurveTo(x+60,y-12,x+120,y); ctx.stroke(); }
  /* Perlenspur (Perlentaucher!) */ for(let k=0;k<14;k++){ const wx=1200+k*260; const x=wx-SCX[i]; if(x<-40||x>W+40) continue; const y=SAND_Y+110+(k%2)*40; dots([[x,y,12]],'#F2EAD6'); dots([[x-4,y-4,4]],'#FFFFFF'); }
  for(const s of SHELLS){ const x=((s.x-SCX[i])%2800+2800)%2800-150; shellDraw(x,s.y,s.s,s.rot,s.kind); } }
function bay(i){ const ox=-SCX[i]; if(ox<-1500) return;
  /* Muschelhaus */ const hx=ox+150, hb=SAND_Y+20; ctx.fillStyle='#F4A6B8'; ctx.beginPath(); ctx.ellipse(hx,hb,190,170,0,Math.PI,2*Math.PI); ctx.fill(); ctx.strokeStyle='#E07A9A'; ctx.lineWidth=5; for(let k=1;k<8;k++){ const a=Math.PI+k*Math.PI/8; ctx.beginPath(); ctx.moveTo(hx,hb); ctx.lineTo(hx+Math.cos(a)*190,hb+Math.sin(a)*170); ctx.stroke(); } ctx.fillStyle='#7A3B5A'; ctx.beginPath(); ctx.arc(hx,hb-70,46,0,6.29); ctx.fill(); ctx.strokeStyle='#F2EAD6'; ctx.lineWidth=6; ctx.beginPath(); ctx.arc(hx,hb-70,46,0,6.29); ctx.stroke(); dots([[hx+18,hb-72,5]],'#E9C46A');
  /* Schatztruhe der Meereskoenigin (noch leer) */ ctx.fillStyle='#8A5A2B'; rrect(ox+320,SAND_Y-70,110,80,10); ctx.fill(); ctx.fillStyle='#6E4620'; rrect(ox+320,SAND_Y-90,110,30,12); ctx.fill(); ctx.fillStyle='#E9C46A'; ctx.fillRect(ox+368,SAND_Y-90,14,100); dots([[ox+375,SAND_Y-40,7]],'#26200F');
  /* Seegras */ ctx.strokeStyle='#2F8F6A'; ctx.lineWidth=8; ctx.lineCap='round'; for(const gx of [ox+250,ox+272,ox+700,ox+722,ox+744]){ ctx.beginPath(); ctx.moveTo(gx,SAND_Y+20); ctx.quadraticCurveTo(gx+14,SAND_Y-40,gx-6,SAND_Y-90); ctx.stroke(); }
  /* Wegweiser */ ctx.fillStyle='#8A6A4B'; ctx.fillRect(ox+880,SAND_Y-240,16,260); ctx.fillStyle='#D9C9A8'; ctx.beginPath(); ctx.moveTo(ox+770,SAND_Y-210); ctx.lineTo(ox+1010,SAND_Y-210); ctx.lineTo(ox+1050,SAND_Y-180); ctx.lineTo(ox+1010,SAND_Y-150); ctx.lineTo(ox+770,SAND_Y-150); ctx.closePath(); ctx.fill(); text('PERLENPALAST',ox+900,SAND_Y-178,fitFont('PERLENPALAST',220,30,20),'#26200F'); }

/* ---------- Perlenpalast (Endposition, per Offset eingefahren) ---------- */
const CLAM_X=660, HY=SAND_Y-40, PUFFI={x:960,y:980}, KALLE={x:900,y:SAND_Y-16};
const puffiY=t=>PUFFI.y+6*Math.sin(t*3);
const puffAmt=t=>(t>=20.0&&t<21.6)?Math.min(seg(t,20.0,20.25),1-seg(t,21.0,21.6)):0;
function kelp(x,h,t){ ctx.strokeStyle='#2F8F6A'; ctx.lineWidth=20; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x,SAND_Y+20); const segs=5; let px=x, py=SAND_Y+20; for(let k=1;k<=segs;k++){ const ny=SAND_Y+20-h*k/segs; const nx=x+Math.sin(t*1.3+k*1.1)*(10+k*6); ctx.quadraticCurveTo((px+nx)/2+Math.sin(t*1.7+k)*14,(py+ny)/2,nx,ny); px=nx; py=ny; } ctx.stroke(); ctx.fillStyle='#3CB371'; for(let k=1;k<segs*2;k++){ const u=k/(segs*2); const ly=SAND_Y+20-h*u, lx=x+Math.sin(t*1.3+u*5.5)*(10+u*30); ctx.save(); ctx.translate(lx,ly); ctx.rotate((k%2?-1:1)*0.9+0.1*Math.sin(t*2+k)); ctx.beginPath(); ctx.ellipse(40,0,44,14,0,0,6.29); ctx.fill(); ctx.restore(); } }
function rockClam(t){ const x=CLAM_X; ctx.fillStyle='#4A4A6E'; ctx.beginPath(); ctx.ellipse(x,SAND_Y+12,122,48,0,Math.PI,2*Math.PI); ctx.fill(); ctx.fillStyle='#5E5E84'; ctx.beginPath(); ctx.ellipse(x-30,SAND_Y-10,50,22,0,Math.PI,2*Math.PI); ctx.fill();
  const wob=(t>=17.8&&t<18.4)?0.08*Math.sin((t-17.8)*30):0; const open=easeOutBack(seg(t,18.4,18.9));
  ctx.save(); ctx.translate(x,HY); ctx.rotate(wob);
  ctx.fillStyle='#E8A9BC'; ctx.beginPath(); ctx.ellipse(0,0,96,44,0,0,Math.PI); ctx.fill(); ctx.strokeStyle='#D98BA3'; ctx.lineWidth=3; for(let k=1;k<8;k++){ const a=k*Math.PI/8; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(Math.cos(a)*96,Math.sin(a)*44); ctx.stroke(); }
  if(open>0){ ctx.fillStyle='#F8DDE6'; ctx.beginPath(); ctx.ellipse(0,-4,86,20,0,0,6.29); ctx.fill(); }
  ctx.save(); ctx.translate(-90,0); ctx.rotate(-open*1.35); ctx.translate(90,0); ctx.fillStyle='#F4C2CF'; ctx.beginPath(); ctx.ellipse(0,0,96,58,0,Math.PI,2*Math.PI); ctx.fill(); ctx.strokeStyle='#D98BA3'; ctx.lineWidth=3; for(let k=1;k<8;k++){ const a=Math.PI+k*Math.PI/8; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(Math.cos(a)*96,Math.sin(a)*58); ctx.stroke(); } ctx.restore();
  ctx.restore();
  /* Perle mit Alterszahl */ if(t>=18.6){ const u=easeOutBack(seg(t,18.6,19.3)); const py=lerp(HY-20,HY-270,u); const age=$('age').value.trim().slice(0,2); ctx.save(); ctx.globalAlpha=seg(t,18.6,18.8); ctx.save(); ctx.globalCompositeOperation='lighter'; dots([[x,py,90]],'rgba(255,225,140,0.35)'); ctx.restore(); const g=ctx.createRadialGradient(x-18,py-18,6,x,py,54); g.addColorStop(0,'#FFF6D2'); g.addColorStop(0.6,'#E9C46A'); g.addColorStop(1,'#B9902E'); ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,py,52,0,6.29); ctx.fill(); dots([[x-22,py-24,9]],'rgba(255,255,255,0.85)'); if(age) text(age,x,py+4,fontB(78),'#0E3B47'); ctx.restore(); if(t<19.8){ const r=rng(Math.floor(t*8)); ctx.save(); ctx.globalCompositeOperation='lighter'; for(let n=0;n<8;n++) dots([[x-100+r()*200,py-100+r()*200,3+r()*4]],'rgba(255,240,180,0.9)'); ctx.restore(); } } }
function kalle(t){ const x=KALLE.x, y=KALLE.y; const wv=Math.sin(t*4)*0.3; ctx.save(); ctx.translate(x,y);
  /* sechs Beine */ ctx.strokeStyle='#C94F2C'; ctx.lineWidth=10; ctx.lineCap='round'; for(const s of [-1,1]) for(let k=0;k<3;k++){ const bx=s*(30+k*12), by=10+k*4; const step=Math.sin(t*6+k*2.1)*4; ctx.beginPath(); ctx.moveTo(bx,by); ctx.lineTo(bx+s*38,by+14+step); ctx.lineTo(bx+s*50,by+40); ctx.stroke(); }
  /* zwei Scheren */ for(const s of [-1,1]){ ctx.save(); ctx.translate(s*56,-10); ctx.rotate(s>0?-0.5+wv:0.5-wv*0.3); ctx.strokeStyle='#E8613C'; ctx.lineWidth=14; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(s*34,-46); ctx.stroke(); dots([[s*40,-60,22]],'#E8613C'); ctx.fillStyle='#4A2A1A'; ctx.beginPath(); ctx.moveTo(s*40,-60); ctx.lineTo(s*62,-80); ctx.lineTo(s*58,-56); ctx.closePath(); ctx.fill(); ctx.restore(); }
  ctx.fillStyle='#E8613C'; ctx.beginPath(); ctx.ellipse(0,0,64,42,0,0,6.29); ctx.fill(); ctx.fillStyle='#F07E5A'; ctx.beginPath(); ctx.ellipse(-6,-8,44,22,0,0,6.29); ctx.fill();
  ctx.strokeStyle='#C94F2C'; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(-18,-38); ctx.lineTo(-22,-64); ctx.moveTo(18,-38); ctx.lineTo(22,-64); ctx.stroke(); const blink=((t*0.9)%1.7)<0.1; if(!blink){ dots([[-22,-70,11],[22,-70,11]],'#FFFFFF'); dots([[-20,-69,5],[24,-69,5]],'#111'); } else { ctx.strokeStyle='#111'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(-30,-70); ctx.lineTo(-14,-70); ctx.moveTo(14,-70); ctx.lineTo(30,-70); ctx.stroke(); }
  ctx.strokeStyle='#4A2A1A'; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(0,-6,16,0.15*Math.PI,0.85*Math.PI); ctx.stroke(); ctx.restore(); }
function puffi(t){ const puff=puffAmt(t); const x=PUFFI.x, y=puffiY(t); const r=44+36*easeOutBack(puff); ctx.save(); ctx.translate(x,y);
  if(puff>0){ ctx.fillStyle='#E0A93A'; for(let k=0;k<14;k++){ const a=k*Math.PI*2/14; ctx.beginPath(); ctx.moveTo(Math.cos(a-0.12)*r*0.95,Math.sin(a-0.12)*r*0.95); ctx.lineTo(Math.cos(a)*(r+30*puff),Math.sin(a)*(r+30*puff)); ctx.lineTo(Math.cos(a+0.12)*r*0.95,Math.sin(a+0.12)*r*0.95); ctx.closePath(); ctx.fill(); } }
  ctx.fillStyle='#F6D55C'; ctx.beginPath(); ctx.moveTo(r-6,0); ctx.lineTo(r+30,-18+4*Math.sin(t*9)); ctx.lineTo(r+30,18+4*Math.sin(t*9)); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.arc(0,0,r,0,6.29); ctx.fill(); dots([[-r*0.1,r*0.4,7],[r*0.35,r*0.15,6],[r*0.3,-r*0.45,6],[-r*0.5,-r*0.2,5]],'#E0A93A');
  ctx.fillStyle='#F6D55C'; ctx.beginPath(); ctx.moveTo(0,r*0.35); ctx.lineTo(22,r*0.75); ctx.lineTo(-6,r*0.75); ctx.closePath(); ctx.fill();
  const ex=-r*0.42, ey=-r*0.2, er=12+4*puff; dots([[ex,ey,er]],'#FFFFFF'); dots([[ex-3,ey+1,er*0.5]],'#111'); dots([[ex-5,ey-4,2.5]],'#FFF');
  dots([[-r+4,r*0.12,9]],'#E8613C'); dots([[-r+4,r*0.12,4]],'#7A2E1A');
  ctx.restore(); }
function partyHat(x,y,rot){ ctx.save(); ctx.translate(x,y); ctx.rotate(rot); ctx.fillStyle='#E9C46A'; ctx.beginPath(); ctx.moveTo(-30,0); ctx.lineTo(0,-70); ctx.lineTo(30,0); ctx.closePath(); ctx.fill(); ctx.fillStyle='#B0432C'; ctx.beginPath(); ctx.moveTo(-18,-28); ctx.lineTo(0,-70); ctx.lineTo(18,-28); ctx.closePath(); ctx.fill(); dots([[0,-72,7]],'#FF6F91'); ctx.restore(); }
function hatPos(t){ const y0=puffiY(20.2)-44-36; if(t<20.9){ const u=seg(t,20.2,20.9); return {x:lerp(PUFFI.x,KALLE.x,u),y:lerp(y0,KALLE.y-84,u)-220*Math.sin(Math.PI*u),rot:-0.15+u*Math.PI*2}; } const b=seg(t,20.9,21.2); return {x:KALLE.x,y:KALLE.y-84-(b<1?8*Math.sin(b*Math.PI):0),rot:0.1}; }
function palace(i,t){ const ox=620+(SCX_END-SCX[i]); if(ox>W+700) return; ctx.save(); ctx.translate(ox-620,0);
  /* Korallentuerme mit Muscheldaechern */ for(const [tx,w,h,c] of [[760,110,340,'#B36CC7'],[880,130,430,'#E36BA0'],[1000,100,370,'#7E57C2']]){ ctx.fillStyle=c; rrect(tx-w/2,SAND_Y+10-h,w,h,24); ctx.fill(); ctx.fillStyle='#F2EAD6'; ctx.beginPath(); ctx.ellipse(tx,SAND_Y+10-h,w/2+14,44,0,Math.PI,2*Math.PI); ctx.fill(); ctx.strokeStyle='#D9C9A8'; ctx.lineWidth=3; for(let k=1;k<6;k++){ const a=Math.PI+k*Math.PI/6; ctx.beginPath(); ctx.moveTo(tx,SAND_Y+10-h); ctx.lineTo(tx+Math.cos(a)*(w/2+14),SAND_Y+10-h+Math.sin(a)*44); ctx.stroke(); } ctx.save(); ctx.globalCompositeOperation='lighter'; dots([[tx,SAND_Y-h+100,18],[tx,SAND_Y-h+190,18]],'rgba(255,220,120,0.9)'); ctx.restore(); }
  /* Seetang-Tor, Ranke, Schild */ for(const [kx,h] of [[560,600],[1080,620]]) kelp(kx,h,t);
  ctx.strokeStyle='#5A8F6A'; ctx.lineWidth=8; ctx.beginPath(); ctx.moveTo(600,700); ctx.quadraticCurveTo(820,800,1040,680); ctx.stroke();
  { const name=nameVal(); ctx.fillStyle='#F2EAD6'; rrect(620,740,290,110,14); ctx.fill(); ctx.strokeStyle='#B0432C'; ctx.lineWidth=6; rrect(620,740,290,110,14); ctx.stroke(); dots([[634,754,4],[896,754,4],[634,836,4],[896,836,4]],'#E9C46A'); text('Willkommen,',765,772,fontB(34,700),'#0E3B47'); text(name+'!',765,818,fitFont(name+'!',260,48,26),'#B0432C'); }
  /* Quallen-Lampions */ for(const [bx,by,c] of [[560,560,'#FF8FAB'],[604,528,'#FFD166'],[1020,540,'#7BE0D6'],[1058,508,'#C77DFF']]){ const yy=by+8*Math.sin(t*2+bx); ctx.strokeStyle=rgba(c,0.7); ctx.lineWidth=3; for(let k=-1;k<=1;k++){ ctx.beginPath(); ctx.moveTo(bx+k*12,yy+10); ctx.quadraticCurveTo(bx+k*12+8*Math.sin(t*3+k),yy+50,bx+k*12+4*Math.sin(t*2+k),yy+90); ctx.stroke(); } ctx.save(); ctx.globalCompositeOperation='lighter'; dots([[bx,yy,40]],rgba(c,0.25)); ctx.restore(); ctx.fillStyle=c; ctx.beginPath(); ctx.ellipse(bx,yy,28,24,0,Math.PI,2*Math.PI); ctx.fill(); ctx.fillRect(bx-28,yy-1,56,10); }
  rockClam(t); kalle(t); puffi(t);
  if(t>=16.2&&t<20.2) partyHat(PUFFI.x,puffiY(t)-44-36*easeOutBack(puffAmt(t)),-0.15);   /* Hut sitzt auf Puffi, faehrt mit der Szene ein */
  ctx.restore(); }

/* ---------- Kringel + Perlentaucher-Kind ---------- */
function mount(t,i){ const mx=mountX(t), my=mountY(t,i); const flagUp=Math.min(seg(t,11.8,12.2),1-seg(t,13.4,13.8)); const duck=Math.min(seg(t,10.6,11.0),1-seg(t,12.4,12.9)); const fl=Math.sin(t*22)*0.5;
  ctx.save(); ctx.translate(mx,my);
  /* Schwanz-Kringel */ ctx.strokeStyle='#E8923F'; ctx.lineWidth=30; ctx.lineCap='round'; ctx.beginPath(); ctx.arc(-5,185,50,-Math.PI/2,Math.PI*1.3); ctx.stroke(); ctx.strokeStyle='#FFD9A0'; ctx.lineWidth=10; ctx.beginPath(); ctx.arc(-5,185,50,-Math.PI/2,Math.PI*1.2); ctx.stroke();
  /* Rueckenflosse (flattert) */ ctx.fillStyle='rgba(255,184,112,0.85)'; ctx.beginPath(); ctx.moveTo(-66,30); ctx.lineTo(-128,44+fl*18); ctx.lineTo(-122,108+fl*14); ctx.lineTo(-66,118); ctx.closePath(); ctx.fill(); ctx.strokeStyle='rgba(232,146,63,0.9)'; ctx.lineWidth=3; for(const k of [0.25,0.5,0.75]){ ctx.beginPath(); ctx.moveTo(-66,30+88*k); ctx.lineTo(lerp(-128,-122,k),lerp(44,108,k)+fl*16); ctx.stroke(); }
  /* Wimpel (hinter dem Kind) */ ctx.save(); ctx.translate(40,-140); ctx.rotate(-0.08-0.3*flagUp); ctx.fillStyle='#8A6A4B'; ctx.fillRect(-5,-400,10,420); const fw=Math.sin(t*9)*12; ctx.fillStyle='#E07A5F'; ctx.beginPath(); ctx.moveTo(5,-398); ctx.quadraticCurveTo(70,-380+fw,140,-370+fw); ctx.lineTo(5,-320); ctx.closePath(); ctx.fill(); ctx.strokeStyle='#E9C46A'; ctx.lineWidth=4; ctx.stroke(); ctx.fillStyle='#F2EAD6'; rrect(40,-376+fw*0.6,34,20,5); ctx.fill(); ctx.fillStyle='#FF6F91'; ctx.fillRect(40,-372+fw*0.6,34,6); ctx.fillStyle='#64B5F6'; ctx.fillRect(50,-388+fw*0.6,4,12); ctx.fillRect(60,-388+fw*0.6,4,12); dots([[52,-391+fw*0.6,3],[62,-391+fw*0.6,3]],'#FFB53A'); ctx.restore();
  /* Koerper */ ctx.fillStyle='#F4A259'; ctx.beginPath(); ctx.ellipse(0,0,70,120,0,0,6.29); ctx.fill(); ctx.fillStyle='#FFE0A8'; ctx.beginPath(); ctx.ellipse(16,10,42,96,0,0,6.29); ctx.fill(); ctx.strokeStyle='#E8923F'; ctx.lineWidth=3; for(let k=-3;k<=3;k++){ ctx.beginPath(); ctx.moveTo(-20,10+k*28); ctx.lineTo(54,10+k*28); ctx.stroke(); }
  /* Hals + Kopf (duckt sich vor Hektor) */ ctx.save(); ctx.translate(20,-110); ctx.rotate(0.35*duck); ctx.strokeStyle='#F4A259'; ctx.lineWidth=52; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(42,-78); ctx.stroke(); ctx.fillStyle='#F4A259'; ctx.beginPath(); ctx.ellipse(52,-96,50,40,0,0,6.29); ctx.fill(); rrect(84,-108,84,26,12); ctx.fill(); ctx.fillStyle='#E8923F'; rrect(150,-104,18,18,6); ctx.fill(); for(let k=0;k<4;k++){ ctx.beginPath(); ctx.moveTo(22+k*16,-128); ctx.lineTo(30+k*16,-160+(k%2)*8); ctx.lineTo(38+k*16,-128); ctx.closePath(); ctx.fill(); } dots([[62,-106,13]],'#FFFFFF'); dots([[66,-104,7]],'#111'); dots([[69,-108,2.5]],'#FFF'); ctx.restore();
  /* Kind: Flosse (unter dem Rumpf, ueber Kringel) */ ctx.strokeStyle='#2EC4B6'; ctx.lineWidth=46; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(-30,-60); ctx.quadraticCurveTo(-120,20,-140,110); ctx.stroke(); ctx.fillStyle='#7BE0D6'; ctx.beginPath(); ctx.moveTo(-140,110); ctx.lineTo(-205,140); ctx.lineTo(-160,150); ctx.lineTo(-195,200); ctx.lineTo(-128,140); ctx.closePath(); ctx.fill(); ctx.strokeStyle='rgba(255,255,255,0.45)'; ctx.lineWidth=3; for(let k=0;k<5;k++){ const u=0.15+k*0.17; const px=(1-u)*(1-u)*-30+2*u*(1-u)*-120+u*u*-140, py=(1-u)*(1-u)*-60+2*u*(1-u)*20+u*u*110; ctx.beginPath(); ctx.arc(px,py,14,0.2*Math.PI,0.8*Math.PI); ctx.stroke(); }
  /* Rumpf mit Muscheltop */ ctx.fillStyle='#2EC4B6'; rrect(-78,-200,76,140,26); ctx.fill(); ctx.fillStyle='#F4A6B8'; ctx.beginPath(); ctx.ellipse(-58,-170,18,14,0,Math.PI,2*Math.PI); ctx.ellipse(-22,-170,18,14,0,Math.PI,2*Math.PI); ctx.fill(); ctx.fillStyle='#1FA39A'; ctx.fillRect(-78,-158,76,6); dots([[-40,-90,7],[-40,-120,7]],'#E9C46A');
  /* Arme */ ctx.strokeStyle='#F6C9A4'; ctx.lineWidth=20; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(-66,-185); ctx.lineTo(30,-115); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-12,-185); ctx.lineTo(40,-145); ctx.stroke(); dots([[40,-145,13]],'#F6C9A4');
  /* Kopf mit Foto + Muschelkrone */ ctx.fillStyle='#F6C9A4'; rrect(-52,-216,24,26,8); ctx.fill(); ctx.save(); ctx.beginPath(); ctx.arc(-40,-262,56,0,6.29); ctx.clip(); ctx.fillStyle='#F6C9A4'; ctx.fillRect(-100,-322,120,120); drawPhotoInCircle(-40,-262,56,zoomVal()); ctx.restore(); ctx.strokeStyle='#E9C46A'; ctx.lineWidth=4; ctx.beginPath(); ctx.arc(-40,-262,56,0,6.29); ctx.stroke();
  ctx.strokeStyle='#E9C46A'; ctx.lineWidth=10; ctx.beginPath(); ctx.arc(-40,-262,60,Math.PI*1.22,Math.PI*1.78); ctx.stroke(); dots([[-40,-326,9],[-66,-318,6],[-14,-318,6]],'#F2EAD6'); ctx.fillStyle='#F4A6B8'; ctx.beginPath(); ctx.moveTo(-40,-322); ctx.lineTo(-58,-352); ctx.lineTo(-40,-346); ctx.lineTo(-22,-352); ctx.closePath(); ctx.fill();
  ctx.restore();
  /* Blubberblasen aus der Schnauze beim Schwimmen */ if(speed(t)>150){ const r=rng(Math.floor(t*10)); ctx.lineWidth=2; for(let n=0;n<5;n++){ const dx=190+r()*30, dy=-206-r()*90, rr=5+r()*8; ctx.strokeStyle=`rgba(255,255,255,${(0.7-n*0.1).toFixed(2)})`; ctx.beginPath(); ctx.arc(mx+dx,my+dy,rr,0,6.29); ctx.stroke(); } } }

/* ---------- Hektor, der Hai ---------- */
const SHARK_X=1050, SHARK_Y=1080, PEEK={x:60,y:1080,sc:0.8};
function sharkState(t,i){ if(t<9.6) return null; let x,y=SHARK_Y,dir=1,sc=1,mouth=0,happy=false,blush=0,sniff=0,swim=true,behind=false,dash=0;
  if(t<10.6){ const u=easeOut(seg(t,9.6,10.6)); x=lerp(1500,SHARK_X,u); }
  else if(t<13.3){ x=SHARK_X; swim=false; if(t>=10.8&&t<11.6){ const p=seg(t,10.8,11.6); mouth=Math.abs(Math.sin(p*Math.PI*2))*(1-p*0.3); } if(t>=11.9&&t<12.4) sniff=Math.sin(seg(t,11.9,12.4)*Math.PI); if(t>=12.4){ happy=true; blush=seg(t,12.4,12.9); if(t>=12.9) y=SHARK_Y-10*Math.abs(Math.sin((t-12.9)*12)); } }
  else if(t<16.6){ const mx=mountX(t); happy=true; blush=0.6; behind=true;
    if(t<14.1){ x=lerp(SHARK_X,-560,seg(t,13.3,14.1)); dir=1; dash=(t-13.3)*3; }                 /* saust hinter Kringel vorbei nach links raus */
    else { x=lerp(-560,mx-540,easeOut(seg(t,14.1,14.7))); dir=-1; } }                           /* kommt umgedreht zurueck und schwimmt mit */
  else { const u=easeInOut(seg(t,16.6,17.8)); const mx=mountX(16.6); x=lerp(mx-540,PEEK.x,u); dir=-1; sc=lerp(1,PEEK.sc,u); happy=true; blush=0.6; behind=true; swim=u<0.9; }
  return {x,y,dir,sc,mouth,happy,blush,sniff,swim,behind,dash}; }
function shark(d,t,i){ ctx.save(); ctx.translate(d.x,d.y); ctx.scale(d.dir*d.sc,d.sc); const ph=STEP[i]*1.3+d.dash; const wag=d.swim?0.35*Math.sin(ph*Math.PI*3):(d.happy?0.25*Math.sin(t*8):0.08*Math.sin(t*3));
  ctx.rotate(d.sniff*0.25);
  /* Schwanzflosse */ ctx.fillStyle='#6F8FA6'; ctx.save(); ctx.translate(196,0); ctx.rotate(wag*0.5); ctx.beginPath(); ctx.moveTo(0,-20); ctx.lineTo(80,-100); ctx.lineTo(60,0); ctx.lineTo(80,80); ctx.lineTo(0,20); ctx.closePath(); ctx.fill(); ctx.restore();
  /* Koerper mit hellem Bauch */ ctx.beginPath(); ctx.ellipse(0,0,210,78,0,0,6.29); ctx.fill(); ctx.save(); ctx.beginPath(); ctx.ellipse(0,0,210,78,0,0,6.29); ctx.clip(); ctx.fillStyle='#D9E4EC'; ctx.beginPath(); ctx.ellipse(-20,40,200,60,0,0,6.29); ctx.fill(); ctx.restore();
  /* Rueckenflosse, Brustflosse, Kiemen */ ctx.fillStyle='#5F7D93'; ctx.beginPath(); ctx.moveTo(-10,-74); ctx.lineTo(30,-168); ctx.lineTo(90,-74); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.moveTo(-60,50); ctx.lineTo(-110,140); ctx.lineTo(-10,80); ctx.closePath(); ctx.fill(); ctx.strokeStyle='#5F7D93'; ctx.lineWidth=4; for(let k=0;k<3;k++){ ctx.beginPath(); ctx.arc(-60+k*16,0,22,-0.4*Math.PI,0.4*Math.PI); ctx.stroke(); }
  /* Unterkiefer (klappt nach unten) */ ctx.save(); ctx.translate(-150,26); ctx.rotate(-d.mouth*0.6); ctx.fillStyle='#5F7D93'; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(-62,-6); ctx.quadraticCurveTo(-70,30,-40,34); ctx.lineTo(0,30); ctx.closePath(); ctx.fill(); ctx.fillStyle='#FFFFFF'; for(let k=0;k<4;k++){ ctx.beginPath(); ctx.moveTo(-58+k*15,2); ctx.lineTo(-51+k*15,-12); ctx.lineTo(-44+k*15,2); ctx.closePath(); ctx.fill(); } ctx.restore();
  if(d.mouth>0){ ctx.fillStyle='#8E2A3A'; ctx.beginPath(); ctx.moveTo(-212,14); ctx.lineTo(-150,22); ctx.lineTo(-150,22+d.mouth*36); ctx.lineTo(-212,14+d.mouth*40); ctx.closePath(); ctx.fill(); }
  ctx.fillStyle='#FFFFFF'; for(let k=0;k<5;k++){ ctx.beginPath(); ctx.moveTo(-206+k*14,14); ctx.lineTo(-199+k*14,30); ctx.lineTo(-192+k*14,14); ctx.closePath(); ctx.fill(); }
  /* Auge */ const er=d.happy?20:16; dots([[-128,-26,er]],'#FFFFFF'); dots([[-134,-24,d.happy?10:7]],'#111'); dots([[-138,-30,3]],'#FFF'); if(d.happy){ ctx.strokeStyle='#3A4A5A'; ctx.lineWidth=4; ctx.beginPath(); ctx.arc(-128,-26,er+4,Math.PI*1.15,Math.PI*1.85); ctx.stroke(); } else { ctx.strokeStyle='#3A4A5A'; ctx.lineWidth=7; ctx.beginPath(); ctx.moveTo(-150,-56); ctx.lineTo(-104,-48); ctx.stroke(); }
  if(d.blush>0){ ctx.save(); ctx.globalAlpha=d.blush*0.7; dots([[-160,4,16]],'#FF6F91'); ctx.restore(); }
  ctx.restore(); }

/* ---------- Floeckchen (Clownfisch) und Oma Trudi ---------- */
function fishDraw(x,y,dir,wig){ ctx.save(); ctx.translate(x,y); ctx.scale(dir,1); ctx.fillStyle='#FF7F32'; ctx.beginPath(); ctx.moveTo(-28,0); ctx.lineTo(-58,-22+wig*8); ctx.lineTo(-52,0); ctx.lineTo(-58,22+wig*8); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.ellipse(0,0,36,22,0,0,6.29); ctx.fill(); ctx.save(); ctx.beginPath(); ctx.ellipse(0,0,36,22,0,0,6.29); ctx.clip(); ctx.fillStyle='#FFFFFF'; ctx.fillRect(-16,-24,10,48); ctx.fillRect(12,-24,9,48); ctx.strokeStyle='#26200F'; ctx.lineWidth=2; for(const px of [-16,-6,12,21]){ ctx.beginPath(); ctx.moveTo(px,-24); ctx.lineTo(px,24); ctx.stroke(); } ctx.restore(); ctx.fillStyle='#FF7F32'; ctx.beginPath(); ctx.moveTo(-10,-20); ctx.lineTo(4,-34); ctx.lineTo(14,-20); ctx.closePath(); ctx.fill(); dots([[22,-6,6]],'#FFFFFF'); dots([[24,-6,3.5]],'#111'); ctx.restore(); }
function floeckchen(t,i){ const wg=Math.sin(t*14); if(t<6.2) return null;
  if(t<7.0){ const u=easeInOut(seg(t,6.2,7.0)); const tip=mountPoint(110,-520,t,i); return {x:lerp(-120,tip.x-170,u),y:lerp(300,tip.y,u),dir:1,wig:wg}; }
  if(t<8.6){ const tip=mountPoint(110,-520,t,i); const a=-Math.PI+2*Math.PI*seg(t,7.0,8.6); return {x:tip.x+170*Math.cos(a),y:tip.y+80*Math.sin(a),dir:(-Math.sin(a)>=0)?1:-1,wig:wg}; }
  if(t<9.2){ const tip=mountPoint(110,-520,8.6,i); const u=easeInOut(seg(t,8.6,9.2)); return {x:lerp(tip.x-170,430,u),y:lerp(tip.y,690,u),dir:1,wig:wg}; }
  if(t<10.8) return {x:430+8*Math.sin(t*2.5),y:690+8*Math.sin(t*3.3),dir:1,wig:wg*0.5};
  if(t<11.3){ const u=easeOut(seg(t,10.8,11.3)); return {x:lerp(430,560,u),y:lerp(690,440,u),dir:1,wig:wg}; }
  if(t<14.0) return {x:560+16*Math.sin(t*2.2),y:440+14*Math.sin(t*3.1),dir:1,wig:wg*0.6};
  if(t<16.5){ const mx=mountX(t); const u=easeInOut(seg(t,14.0,14.6)); return {x:lerp(560,mx-260,u)+10*Math.sin(t*3),y:lerp(440,600,u)+12*Math.sin(t*2.6),dir:1,wig:wg}; }
  if(t<17.6){ const mx=mountX(16.5); const u=easeInOut(seg(t,16.5,17.6)); return {x:lerp(mx-260,990,u),y:lerp(600,662,u)-80*Math.sin(Math.PI*u),dir:1,wig:wg}; }
  if(t<19.6) return {x:990+6*Math.sin(t*2),y:662+6*Math.sin(t*2.7),dir:-1,wig:wg*0.4};
  if(t<21.6){ const a=2*Math.PI*seg(t,19.6,21.6); return {x:820+170*Math.cos(a),y:662+60*Math.sin(a),dir:(-Math.sin(a)>=0)?1:-1,wig:wg}; }
  const u=easeIn(seg(t,21.6,22.8)); return {x:lerp(990,1200,u),y:lerp(662,150,u),dir:1,wig:wg}; }
function trudi(t){ if(t<6.8||t>9.7) return; const x=1300-570*(t-6.8), y=478; const pad=Math.sin(t*3)*0.5; ctx.save(); ctx.translate(x,y);
  ctx.lineCap='round'; ctx.lineWidth=26; for(const [fx,fy,base,far] of [[60,20,1.0,true],[-80,26,1.2,true],[70,30,0.9,false],[-70,36,1.1,false]]){ ctx.strokeStyle=far?'#3E7648':'#5FA36B'; ctx.save(); ctx.translate(fx,fy); ctx.rotate(base+pad*(fx>0?1:-1)*(far?-1:1)); ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(60,0); ctx.stroke(); ctx.restore(); }
  ctx.fillStyle='#4E8F5A'; ctx.beginPath(); ctx.ellipse(0,0,100,58,0,0,6.29); ctx.fill(); ctx.fillStyle='#3E7648'; for(const [px,py,r] of [[0,-10,26],[-50,0,20],[50,0,20],[-25,26,16],[25,26,16]]){ ctx.beginPath(); ctx.ellipse(px,py,r,r*0.7,0,0,6.29); ctx.fill(); } ctx.strokeStyle='#8FC39A'; ctx.lineWidth=6; ctx.beginPath(); ctx.ellipse(0,8,100,52,0,0.1*Math.PI,0.9*Math.PI); ctx.stroke();
  ctx.fillStyle='#6FB57C'; ctx.beginPath(); ctx.ellipse(128,-6,36,30,0,0,6.29); ctx.fill(); const blink=((t*1.1)%1.5)<0.12; if(blink){ ctx.strokeStyle='#123'; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(128,-14); ctx.lineTo(146,-14); ctx.stroke(); } else { dots([[138,-14,10]],'#FFFFFF'); dots([[141,-13,5]],'#111'); } ctx.strokeStyle='#2A5A3A'; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(146,4,10,0.1*Math.PI,0.7*Math.PI); ctx.stroke(); const chew=3*Math.sin(t*10); ctx.strokeStyle='#2E8B57'; ctx.lineWidth=6; ctx.beginPath(); ctx.moveTo(160,8+chew); ctx.quadraticCurveTo(190,-10+chew,205,-40+chew); ctx.stroke();
  ctx.restore(); }

/* ---------- Texte ---------- */
function texts(t,i){ const name=nameVal();
  if(t<3){ text('Tauchgang zum Perlenpalast startet …',W/2,H*.14,fitFont('Tauchgang zum Perlenpalast startet …',W-100,60,40,700),'#F2EAD6','center','#0E3B47',9); }
  popIn(t,3.0,4.8,W/2,H*.22,()=>text('AB ZUM PERLENPALAST!',0,0,fitFont('AB ZUM PERLENPALAST!',W-120,170,90),'#FFFFFF','center','#0E3B47',26));
  if(t>=6.3&&t<9.4){ const u=easeOut(seg(t,6.3,6.9)); const lines=wrap(`${name} taucht zum Perlenpalast!`,W-160,fontB(112)); ctx.save(); ctx.globalAlpha=u*(1-seg(t,8.9,9.4)); ctx.translate(lerp(-300,0,u),0); lines.forEach((ln,k)=>text(ln,W/2,H*.12+k*122,fontB(112),'#FFFFFF','center','#0E3B47',24)); ctx.restore(); }
  if(t>=9.9&&t<11.4){ ctx.save(); ctx.globalAlpha=Math.min(seg(t,9.9,10.2),1-seg(t,11.0,11.4)); text('Achtung, Hai!',W/2,H*.13,fontB(110),'#FFE45C','center','#0E3B47',22); ctx.restore(); }
  popIn(t,10.9,11.7,W/2+120,H*.23,()=>text('SCHNAPP!',0,0,fontB(150),'#E07A5F','center','#26200F',22));
  popIn(t,14.3,16.2,W/2,H*.78,()=>text('Schneller als der Meeresvulkan!',0,0,fitFont('Schneller als der Meeresvulkan!',W-120,120,64),'#FFFFFF','center','#0E3B47',26));
  const p=floeckchen(t,i); if(p){ if(t>=9.4&&t<10.6) bubble(Math.max(10,p.x-440),p.y-262,470,110,'Da lang, Perlentaucher!',Math.min(seg(t,9.4,9.7),1-seg(t,10.3,10.6)),'#0E3B47','#E9C46A',true); if(t>=13.2&&t<14.3) bubble(p.x-440,p.y-262,470,110,'Hai-Flüsterer!',Math.min(seg(t,13.2,13.5),1-seg(t,14.0,14.3)),'#0E3B47','#E9C46A',true); }
  if(t>=12.4&&t<13.4) bubble(720,800,340,110,'Party?!',Math.min(seg(t,12.4,12.7),1-seg(t,13.1,13.4)),'#B0432C','#E9C46A',true);
  if(t>=20.2&&t<20.8) bubble(915,760,150,80,'Huch!',Math.min(seg(t,20.2,20.4),1-seg(t,20.6,20.8)),'#B0432C','#E9C46A');
  if(t>=20.5){ const u=easeOutBack(seg(t,20.5,21.2)); const cardW=W-140, cardH=520, x=70, y=lerp(-620,40,u); ctx.save(); ctx.shadowColor='rgba(0,0,0,.4)'; ctx.shadowBlur=36; ctx.shadowOffsetY=14; ctx.fillStyle='#F2EAD6'; rrect(x,y,cardW,cardH,26); ctx.fill(); ctx.restore(); ctx.strokeStyle='#B0432C'; ctx.lineWidth=5; rrect(x+12,y+12,cardW-24,cardH-24,20); ctx.stroke();
    for(const [lx,ly,rot] of [[x+44,y+48,-0.5],[x+cardW-44,y+48,0.5],[x+44,y+cardH-48,-2.6],[x+cardW-44,y+cardH-48,2.6]]) shellDraw(lx,ly,0.9,rot,0);
    ctx.save(); ctx.globalAlpha=0.3; shellDraw(x+cardW-120,y+cardH-100,1.6,0.3,1); ctx.restore();
    const title=`🧜‍♀️ ${possName(name)} Meerjungfrau-Party`; text(title,W/2,y+112,fitFont(title,cardW-140,74,44),'#0E3B47'); text(`📅 ${$('date').value}  ·  ${$('time').value}`,W/2,y+215,fontD(54),'#26200F'); const pl=wrap(`📍 ${$('place').value}`,cardW-120,fontD(54)); pl.forEach((ln,k)=>text(ln,W/2,y+296+k*62,fontD(54),'#26200F'));
    const pulse=1+.04*Math.sin(t*6); ctx.save(); ctx.translate(W/2,y+440); ctx.scale(pulse,pulse); text('Kommst du mit? 🐚',0,0,fontB(82),'#B0432C'); ctx.restore(); }
  ctx.globalAlpha=.6; text('machsleicht.de',W/2,H-42,fontD(38,600),'#FFFFFF'); ctx.globalAlpha=1; }

function shakeAmp(t){ let a=0; if(t>=9.6&&t<10.6){ const st=((t-9.6)%0.5)/0.5; a=5*(1-st); } if(t>=10.8&&t<11.6) a=Math.max(a,9*Math.sin(seg(t,10.8,11.6)*Math.PI)); if(t>=14.0&&t<16.6) a=Math.max(a,3); if(t>=19.2&&t<19.6) a=Math.max(a,5*(1-seg(t,19.2,19.6))); return a; }

/* ---------- Frame ---------- */
function drawFrame(i){ i=clamp(i,0,P_N-1); const t=i/FPS; const a=shakeAmp(t);
  water(t); surface(t);
  ctx.save(); if(a>0){ ctx.translate(SHAKE[i][0]*a,SHAKE[i][1]*a); }
  reefFar(i,t); volcano(i,t); corals(i,t); fishes(i,t,true); sand(i,t); bay(i); palace(i,t); fishes(i,t,false); bubbles(i,t);
  trudi(t);
  const d=sharkState(t,i); if(d&&d.behind) shark(d,t,i);
  mount(t,i);
  if(d&&!d.behind) shark(d,t,i);
  const p=floeckchen(t,i); if(p) fishDraw(p.x,p.y,p.dir,p.wig);
  if(t>=20.2){ const hp=hatPos(t); partyHat(hp.x,hp.y,hp.rot); }
  streaks(i,t);
  volcanoConfetti(i,t,14.2,2.6); volcanoConfetti(i,t,19.3,2.8);
  ctx.restore();
  texts(t,i); }

/* ---------- Ton ---------- */
function audio(ac,master,S){ const {tone,noise,bell,bed,env}=S;
  const blub=(t0,f=320,peak=0.16)=>tone(t0,f,f*3,0.09,'sine',peak,0.004,0.06);
  const chirp=(t0)=>{ tone(t0,2300,2900,0.06,'sine',0.045,0.004,0.04); tone(t0+0.09,2700,2400,0.05,'sine',0.035,0.004,0.04); };
  const brass=(t0,f,dur,peak=0.2)=>{ const o=ac.createOscillator(); o.type='sawtooth'; o.frequency.value=f; const fl=ac.createBiquadFilter(); fl.type='lowpass'; fl.frequency.setValueAtTime(600,t0); fl.frequency.linearRampToValueAtTime(2400,t0+0.08); fl.frequency.linearRampToValueAtTime(1200,t0+dur); const g=ac.createGain(); env(g,t0,0.03,peak,Math.max(0.01,dur-0.13),0.1); o.connect(fl).connect(g).connect(master); o.start(t0); o.stop(t0+dur+0.3); };
  bed('lowpass',420,0.7,[[0,0.05],[24,0.05]],0.3,0.02);                                                           /* Unterwasser-Teppich */
  [0.6,1.3,2.0].forEach((t,k)=>blub(t,260+k*80,0.2)); blub(3.0,420,0.24); blub(3.12,520,0.2);
  { const r=S.rng(5); for(let k=0;k<26;k++) blub(0.3+r()*23.5,220+r()*400,0.05); }
  { const r=S.rng(3); for(let k=0;k<10;k++) chirp(6.3+r()*7); for(let k=0;k<6;k++) chirp(16.6+r()*6); }
  for(let t=3.3;t<10.5;t+=0.62) noise(t,0.22,'bandpass',900,500,0.07,0.03,0.12); for(let t=14.0;t<17.5;t+=0.4) noise(t,0.16,'bandpass',1100,600,0.07,0.02,0.09);   /* Kringels Schwimmstoesse */
  for(let k=0;k<4;k++) noise(7.6+k*0.28,0.09,'bandpass',700,700,0.09,0.01,0.06,2);                                 /* Trudi kaut */
  /* Hektor: Zwei-Ton-Bass, wird schneller */ for(let k=0;k<6;k++){ const t=9.6+k*0.4-k*k*0.02; tone(t,82,82,0.2,'triangle',0.26,0.01,0.1); tone(t+0.18,87,87,0.2,'triangle',0.26,0.01,0.1); }
  bed('lowpass',110,0.9,[[9.5,0],[10.2,0.2],[11.6,0.2],[12.2,0]]);
  [11.0,11.35].forEach(t=>{ noise(t,0.08,'lowpass',900,300,0.5,0.002,0.05); tone(t,140,60,0.14,'sine',0.45,0.002,0.1); });          /* SCHNAPP */
  noise(11.9,0.12,'highpass',2000,2000,0.08,0.02,0.08); noise(12.1,0.12,'highpass',2000,2000,0.08,0.02,0.08);
  tone(12.4,500,700,0.2,'sine',0.15,0.01,0.1); tone(12.65,700,950,0.25,'sine',0.15,0.01,0.12); [12.9,13.02,13.14].forEach((t,k)=>tone(t,420+k*100,420+k*100,0.08,'square',0.08,0.005,0.05));
  noise(13.3,0.7,'bandpass',1200,400,0.12,0.02,0.3);                                                                /* saust vorbei */
  /* Meeresvulkan */ bed('lowpass',90,0.8,[[13.7,0],[14.2,0.3],[16.4,0.3],[17.0,0]],3,0.12); tone(14.0,60,30,0.8,'sine',0.5,0.005,0.6); noise(14.0,0.6,'lowpass',300,300,0.5,0.005,0.4); { const r=S.rng(21); for(let k=0;k<22;k++) blub(14.2+r()*2.4,300+r()*700,0.08); }
  bed('bandpass',700,0.6,[[13.9,0],[14.6,0.16],[16.4,0.16],[17.4,0]],0.8,0.05);                                     /* Stroemung */
  /* Die Riesenmuschel */ [17.8,17.95,18.1,18.25].forEach(t=>tone(t,300,260,0.08,'sine',0.14,0.005,0.06)); tone(18.4,180,110,0.45,'sawtooth',0.07,0.02,0.25); bell(18.65,1568,0.28); tone(18.8,1400,1900,0.1,'sine',0.12,0.005,0.06); tone(18.95,1500,2000,0.1,'sine',0.12,0.005,0.06);
  { const r=S.rng(9); for(let k=0;k<8;k++){ const f=2400+r()*1800; tone(18.7+r()*0.6,f,f,0.12,'sine',0.06,0.005,0.1); } }
  /* Fanfare, Puffi, Hut */ [19.2,19.4].forEach(t=>tone(t,110,55,0.25,'sine',0.5,0.003,0.2)); [[19.5,392],[19.7,494],[19.9,587]].forEach(([t,f])=>brass(t,f,0.28,0.2)); brass(20.15,784,0.8,0.18); tone(19.3,60,30,0.6,'sine',0.4,0.005,0.4); { const r=S.rng(13); for(let k=0;k<14;k++) blub(19.5+r()*2.0,400+r()*900,0.06); }
  noise(20.0,0.3,'bandpass',500,1400,0.3,0.01,0.15);                                                                /* pfff */
  tone(20.9,240,160,0.12,'sine',0.2,0.005,0.08); bell(20.7,1046,0.22);
  for(const f of [392,494,587]) for(const d of [-5,5]){ const o=ac.createOscillator(); o.type='sawtooth'; o.frequency.value=f+d; const fl=ac.createBiquadFilter(); fl.type='lowpass'; fl.frequency.value=1200; const g=ac.createGain(); env(g,20.0,0.8,0.018,2.6,0.6); o.connect(fl).connect(g).connect(master); o.start(20.0); o.stop(24); } }

startTrailer({ id:'meerjungfrau', title:'Meerjungfrau-Trailer', DUR:P_DUR, drawFrame, audio, photoDefault:IDA_URI, restFrameAt:8.9 });
