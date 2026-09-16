
/* ============================================================
   Drehbuch PRINZESSIN — „Die koenigliche Kutsche" (STORY-prinzessin.md)
   0–3 Rosenhaeuschen · 3–6 Abfahrt · 6–9,6 Maerchenwiese (Flatter, Rapunzels Zopf) · 9,6–14 Rosalie schwebt heran,
   faucht nach oben, Toertchen, „Party?!" · 14–16,5 Im Galopp, Feuerwerk vom fernen Schloss · 16,5–17,8 Schlosstor ·
   17,8–19,2 Kroenungs-Zeremonie: Krone mit Alterszahl · 19,2–21,9 Fanfare, Pits Barett fliegt auf Quaks ·
   20,5–24 Urkunden-Karte
   ============================================================ */
const P_DUR=24, P_N=P_DUR*FPS;
const HORIZON=1150, GROUND_Y=1330;
const R0=rng(23);
const SHAKE=Array.from({length:P_N+1},()=>[(R0()-.5)*2,(R0()-.5)*2]);
const CONF=Array.from({length:110},()=>({a:-Math.PI/2+(R0()-.5)*2.6,v:300+R0()*500,w:12+R0()*12,h:8+R0()*8,rot:R0()*6.28,spin:(R0()-.5)*9,c:['#E9C46A','#F48FB1','#B39DDB','#FFF6EC','#D6336C','#7CE0C3','#FFFFFF'][Math.floor(R0()*7)]}));
const TREES=Array.from({length:12},(_,k)=>({x:k*330+R0()*140,kind:Math.floor(R0()*4),h:180+R0()*120}));
const PETALS=Array.from({length:14},()=>({x:R0()*1600,y:600+R0()*560,len:60+R0()*120}));
const IDA_URI='/*__IDA__*/';

/* ---------- Fahrt: Welt-Scroll ---------- */
function speed(t){ if(t<3) return 0; if(t<4) return 650*easeIn(seg(t,3,4)); if(t<10.4) return 650; if(t<10.8) return 650*(1-easeOut(seg(t,10.4,10.8))); if(t<13.8) return 0; if(t<14.6) return 950*easeIn(seg(t,13.8,14.6)); if(t<16.5) return 950; if(t<17.8) return 950*(1-easeOut(seg(t,16.5,17.8))); return 0; }
const SCX=[0], STEP=[0]; for(let i=1;i<=P_N;i++){ const v=speed((i-.5)/FPS); SCX[i]=SCX[i-1]+v/FPS; STEP[i]=STEP[i-1]+(v/380)/FPS; } const SCX_END=SCX[P_N];
function mountX(t){ return lerp(400,260,easeInOut(seg(t,16.6,17.8))); }
function mountY(t,i){ return GROUND_Y-(speed(t)>150?6*Math.abs(Math.sin(STEP[i]*Math.PI*2)):1.5*Math.sin(t*1.6)); }
function mountPoint(lx,ly,t,i){ return {x:mountX(t)+lx, y:mountY(t,i)+ly}; }

/* ---------- Himmel, Huegel, Wiese ---------- */
const SKY=[[0,'#7FB3E6','#FDE7F0'],[6,'#7FB3E6','#FDE7F0'],[9.5,'#7FB3E6','#FDE7F0'],[11.5,'#4E5F9A','#B9A6D6'],[13.6,'#7FB3E6','#FDE7F0'],[14.8,'#6A4C9C','#FFB0A0'],[17.5,'#4A3A7E','#F3B6C8'],[24,'#3A2C6C','#E9A8C4']];
const HILL1=[[0,'#8BC34A'],[9.5,'#8BC34A'],[11.5,'#5A7A3E'],[13.6,'#8BC34A'],[14.8,'#8A6C7E'],[17.5,'#5E4C80'],[24,'#4A3E70']];
const MEAD1=[[0,'#A5D66F'],[9.5,'#A5D66F'],[11.5,'#6E945A'],[13.6,'#A5D66F'],[14.8,'#B08A80'],[17.5,'#7A6698'],[24,'#665A8C']];
const MEAD2=[[0,'#6FB35A'],[9.5,'#6FB35A'],[11.5,'#4A7A44'],[13.6,'#6FB35A'],[14.8,'#7E6070'],[17.5,'#584A7A'],[24,'#463C6C']];
const PATH=[[0,'#EAD9B8','#D6C29A'],[11.5,'#B8A98A','#9A8A6A'],[13.6,'#EAD9B8','#D6C29A'],[14.8,'#C9A8A0','#A88A88'],[24,'#9E8CB0','#7E6E94']];
function keyed(list,t,idx){ let a=list[0], b=list[list.length-1]; for(let k=0;k<list.length-1;k++){ if(t>=list[k][0]&&t<=list[k+1][0]){ a=list[k]; b=list[k+1]; break; } } return mixHex(a[idx],b[idx],seg(t,a[0],b[0])); }
function sky(t){ const g=ctx.createLinearGradient(0,0,0,HORIZON); g.addColorStop(0,keyed(SKY,t,1)); g.addColorStop(1,keyed(SKY,t,2)); ctx.fillStyle=g; ctx.fillRect(0,0,W,HORIZON+4); }
function sun(t){ if(t<10){ const a=1-seg(t,8,10); const y=700-t*10; ctx.save(); ctx.globalAlpha=a; dots([[180,y,56]],'#FFF1B8'); ctx.globalCompositeOperation='lighter'; const g=ctx.createRadialGradient(180,y,0,180,y,220); g.addColorStop(0,'rgba(255,220,180,0.35)'); g.addColorStop(1,'rgba(255,220,180,0)'); ctx.fillStyle=g; ctx.fillRect(-40,y-220,440,440); ctx.restore(); } }
const CLOUDS=[[100,220,110],[420,140,140],[760,260,120],[1000,120,100],[1250,200,130],[1500,300,110]];
function clouds(i){ const span=W+800; for(const [cx,cy,r] of CLOUDS){ const x=((cx-SCX[i]*0.2)%span+span)%span-400; ctx.fillStyle='rgba(255,255,255,0.85)'; for(const [dx,dy,rr] of [[0,0,r],[-r*.7,r*.25,r*.75],[r*.75,r*.2,r*.7],[-r*.2,-r*.35,r*.6]]){ ctx.beginPath(); ctx.arc(x+dx,cy+dy,rr,0,6.29); ctx.fill(); } } }
function hills(i,t){ const span=1800; ctx.fillStyle=keyed(HILL1,t,1); for(let k=-1;k<3;k++){ const x=((k*600-SCX[i]*0.3)%span+span)%span-400; ctx.beginPath(); ctx.ellipse(x,1175,420,120,0,Math.PI,2*Math.PI); ctx.fill(); } }
function keepX(i){ return 1100+(SCX[F(13.5)]-SCX[i])*0.3; }
function keep(i,t){ const x=keepX(i); ctx.fillStyle=keyed(HILL1,t,1); ctx.beginPath(); ctx.ellipse(x,1180,360,140,0,Math.PI,2*Math.PI); ctx.fill();
  const stone='#F3E5F5', roof='#F48FB1'; for(const [tx,w,top] of [[x-190,80,780],[x+110,80,800]]){ ctx.fillStyle=stone; ctx.fillRect(tx,top,w,1160-top); ctx.fillStyle=roof; ctx.beginPath(); ctx.moveTo(tx-12,top+4); ctx.lineTo(tx+w+12,top+4); ctx.lineTo(tx+w/2,top-90); ctx.closePath(); ctx.fill(); }
  ctx.fillStyle=stone; ctx.fillRect(x-90,560,180,600); ctx.fillStyle='#E8D5EA'; for(let k=0;k<5;k++) ctx.fillRect(x-90,600+k*110,180,6); ctx.fillStyle=roof; ctx.beginPath(); ctx.moveTo(x-108,566); ctx.lineTo(x+108,566); ctx.lineTo(x,400); ctx.closePath(); ctx.fill(); dots([[x,398,9]],'#E9C46A'); ctx.strokeStyle='#8D6E63'; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(x,396); ctx.lineTo(x,330); ctx.stroke(); ctx.fillStyle='#D6336C'; ctx.beginPath(); ctx.moveTo(x,332); ctx.lineTo(x+54,346); ctx.lineTo(x,362); ctx.closePath(); ctx.fill();
  ctx.save(); ctx.globalCompositeOperation='lighter'; for(const [wx,wy] of [[x,700],[x,820],[x-150,900],[x+150,920]]){ ctx.fillStyle='rgba(255,220,120,0.85)'; ctx.beginPath(); ctx.arc(wx,wy,12,Math.PI,2*Math.PI); ctx.fill(); ctx.fillRect(wx-12,wy,24,26); } ctx.restore(); }
function fireworks(i,t,t0){ if(t<t0||t>t0+3.4) return; const x=keepX(i); const tt=t-t0;
  if(tt<0.5){ const u=tt/0.5; const rx=x+30*u, ry=lerp(560,300,u); ctx.strokeStyle='rgba(255,235,180,0.9)'; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(rx,ry); ctx.lineTo(rx-8,ry+60); ctx.stroke(); dots([[rx,ry,6]],'#FFF6EC'); const r=rng(Math.floor(t*30)); for(let n=0;n<5;n++) dots([[rx-6+r()*12,ry+20+r()*70,2+r()*2]],'rgba(255,220,140,0.8)'); return; }
  const bt=tt-0.5; if(bt<0.9){ const u=bt/0.9; const bx=x+30, by=300; ctx.save(); ctx.globalAlpha=1-u; ctx.globalCompositeOperation='lighter'; ctx.lineWidth=5; ctx.lineCap='round'; for(let k=0;k<14;k++){ const a=k*Math.PI*2/14+0.2; const r1=60+140*easeOut(u), r0=r1*0.55; ctx.strokeStyle=['#F48FB1','#E9C46A','#FFFFFF','#B39DDB'][k%4]; ctx.beginPath(); ctx.moveTo(bx+Math.cos(a)*r0,by+Math.sin(a)*r0); ctx.lineTo(bx+Math.cos(a)*r1,by+Math.sin(a)*r1); ctx.stroke(); } const g=ctx.createRadialGradient(bx,by,0,bx,by,220); g.addColorStop(0,'rgba(255,200,230,0.6)'); g.addColorStop(1,'rgba(255,200,230,0)'); ctx.fillStyle=g; ctx.fillRect(bx-220,by-220,440,440); ctx.restore(); }
  const ct=tt-0.55; if(ct>0&&ct<2.8){ for(const c of CONF){ const px=x+30+Math.cos(c.a)*c.v*ct, py=300+Math.sin(c.a)*c.v*ct+0.5*900*ct*ct; if(py>H+40) continue; ctx.save(); ctx.globalAlpha=1-seg(ct,2.1,2.8); ctx.translate(px,py); ctx.rotate(c.rot+c.spin*ct); ctx.fillStyle=c.c; ctx.fillRect(-c.w/2,-c.h/2,c.w,c.h); ctx.restore(); } } }
function midLayer(i,t){ const span=12*330; for(const m of TREES){ const x=((m.x-SCX[i]*0.6)%span+span)%span-300; const base=GROUND_Y-30;
  if(m.kind===0){ ctx.fillStyle='#8D6E63'; ctx.fillRect(x-12,base-m.h*0.5,24,m.h*0.5); ctx.fillStyle='#7CB342'; dots([[x,base-m.h*0.5-m.h*0.35,m.h*0.42]],'#7CB342'); dots([[x-m.h*0.2,base-m.h*0.6,m.h*0.22],[x+m.h*0.2,base-m.h*0.6,m.h*0.22]],'#9CCC65'); dots([[x-30,base-m.h*0.8,8],[x+34,base-m.h*0.7,8],[x+6,base-m.h*1.05,8]],'#F48FB1'); }
  else if(m.kind===1){ dots([[x,base-50,70],[x-60,base-30,50],[x+60,base-34,52]],'#2E7D32'); dots([[x-30,base-70,10],[x+20,base-90,10],[x+50,base-40,10],[x-70,base-30,10],[x+10,base-30,10]],'#D6336C'); }
  else if(m.kind===2){ ctx.fillStyle='#90CAF9'; ctx.beginPath(); ctx.ellipse(x+200,base-6,280,40,0,0,6.29); ctx.fill(); ctx.fillStyle='rgba(255,255,255,0.5)'; ctx.beginPath(); ctx.ellipse(x+160,base-14,120,10,0,0,6.29); ctx.fill(); for(const sx of [x+120,x+300]){ ctx.fillStyle='#FFFFFF'; ctx.beginPath(); ctx.ellipse(sx,base-30,30,16,0,0,6.29); ctx.fill(); ctx.strokeStyle='#FFFFFF'; ctx.lineWidth=8; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(sx+22,base-34); ctx.quadraticCurveTo(sx+52,base-70,sx+40,base-86); ctx.stroke(); dots([[sx+40,base-88,9]],'#FFFFFF'); dots([[sx+50,base-88,4]],'#F28C28'); } }
  else { for(let k=0;k<6;k++){ dots([[x+k*30,base-14-(k%2)*10,10]],['#F48FB1','#E9C46A','#B39DDB','#D6336C'][k%4]); } } } }
function tulip(x,y,c){ ctx.strokeStyle='#4E8A3A'; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x,y-46); ctx.stroke(); ctx.fillStyle=c; ctx.beginPath(); ctx.moveTo(x-16,y-44); ctx.lineTo(x-14,y-72); ctx.lineTo(x,y-58); ctx.lineTo(x+14,y-72); ctx.lineTo(x+16,y-44); ctx.closePath(); ctx.fill(); }
function ground(i,t){ ctx.fillStyle=keyed(MEAD1,t,1); ctx.fillRect(0,HORIZON,W,GROUND_Y-30-HORIZON);
  ctx.fillStyle=keyed(PATH,t,1); ctx.fillRect(0,GROUND_Y-30,W,120); ctx.fillStyle=keyed(PATH,t,2); ctx.fillRect(0,GROUND_Y-30,W,8); ctx.fillRect(0,GROUND_Y+84,W,6); for(let k=0;k<30;k++){ const x=((k*140+(k%3)*40-SCX[i])%4200+4200)%4200-100; dots([[x,GROUND_Y+20+(k%4)*18,5]],'rgba(120,100,70,0.18)'); }
  const g=ctx.createLinearGradient(0,GROUND_Y+90,0,H); g.addColorStop(0,keyed(MEAD1,t,1)); g.addColorStop(1,keyed(MEAD2,t,1)); ctx.fillStyle=g; ctx.fillRect(0,GROUND_Y+90,W,H-GROUND_Y-90);
  for(let k=0;k<14;k++){ const x=1300+k*260-SCX[i]; if(x<-60||x>W+60) continue; tulip(x,GROUND_Y+150,['#D6336C','#E9C46A','#F48FB1','#B39DDB'][k%4]); tulip(x+34,GROUND_Y+160,['#F48FB1','#D6336C','#E9C46A','#FFFFFF'][k%4]); dots([[x-30,GROUND_Y+130,6],[x+70,GROUND_Y+140,6]],'#FFFFFF'); dots([[x-30,GROUND_Y+130,2.5],[x+70,GROUND_Y+140,2.5]],'#E9C46A'); } }
function petals(i,t){ const a=Math.min(seg(t,14.0,14.5),1-seg(t,16.2,16.8)); if(a<=0) return; ctx.save(); ctx.globalAlpha=0.6*a; for(const s of PETALS){ const x=((s.x-SCX[i]*1.5)%1800+1800)%1800-300; ctx.fillStyle='#F8BBD0'; ctx.beginPath(); ctx.ellipse(x,s.y,14,7,0.3,0,6.29); ctx.fill(); ctx.strokeStyle='rgba(255,255,255,0.5)'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(x+20,s.y); ctx.lineTo(x+20+s.len,s.y); ctx.stroke(); } ctx.restore(); }

/* ---------- Rosenhaeuschen (Start) ---------- */
function cottage(i){ const ox=-SCX[i]; if(ox<-1500) return; const base=GROUND_Y-30;
  ctx.fillStyle='#FCE4EC'; rrect(ox-30,base-260,300,260,10); ctx.fill(); ctx.fillStyle='#D6336C'; ctx.beginPath(); ctx.moveTo(ox-60,base-250); ctx.lineTo(ox+120,base-400); ctx.lineTo(ox+300,base-250); ctx.closePath(); ctx.fill(); ctx.fillStyle='#8D6E63'; rrect(ox+80,base-150,80,150,30); ctx.fill(); ctx.fillStyle='#D6336C'; ctx.beginPath(); ctx.moveTo(ox+120,base-70); ctx.bezierCurveTo(ox+140,base-100,ox+160,base-70,ox+120,base-50); ctx.bezierCurveTo(ox+80,base-70,ox+100,base-100,ox+120,base-70); ctx.fill(); ctx.fillStyle='#8FB8E8'; rrect(ox+0,base-220,60,60,8); ctx.fill(); rrect(ox+180,base-220,60,60,8); ctx.fill(); ctx.strokeStyle='#FFFFFF'; ctx.lineWidth=4; for(const wx of [ox+0,ox+180]){ ctx.beginPath(); ctx.moveTo(wx+30,base-220); ctx.lineTo(wx+30,base-160); ctx.moveTo(wx,base-190); ctx.lineTo(wx+60,base-190); ctx.stroke(); }
  /* Rosenbogen */ ctx.strokeStyle='#2E7D32'; ctx.lineWidth=14; ctx.beginPath(); ctx.arc(ox+470,base-120,110,Math.PI,2*Math.PI); ctx.stroke(); ctx.fillRect(ox+354,base-120,14,120); ctx.fillRect(ox+574,base-120,14,120); for(let k=0;k<7;k++){ const a=Math.PI+k*Math.PI/6; dots([[ox+470+Math.cos(a)*110,base-120+Math.sin(a)*110,11]],k%2?'#D6336C':'#F48FB1'); }
  /* Wegweiser */ ctx.fillStyle='#8D6E63'; ctx.fillRect(ox+1160,base-240,16,260); ctx.fillStyle='#FFF6EC'; ctx.beginPath(); ctx.moveTo(ox+1070,base-210); ctx.lineTo(ox+1290,base-210); ctx.lineTo(ox+1330,base-180); ctx.lineTo(ox+1290,base-150); ctx.lineTo(ox+1070,base-150); ctx.closePath(); ctx.fill(); ctx.strokeStyle='#E9C46A'; ctx.lineWidth=4; ctx.stroke(); text('SCHLOSS',ox+1185,base-178,fontB(32),'#6A1B9A'); }

/* ---------- Rapunzels Turm (zieht mit der Mittelebene vorbei) ---------- */
function rapunzel(t){ if(t<6.6||t>9.9) return; const x=1300-390*(t-6.6); ctx.fillStyle='#EADBC8'; rrect(x-70,150,140,1010,8); ctx.fill(); ctx.strokeStyle='#D7C4A8'; ctx.lineWidth=3; for(let y=200;y<1140;y+=60){ ctx.beginPath(); ctx.moveTo(x-70,y); ctx.lineTo(x+70,y); ctx.stroke(); } ctx.fillStyle='#F48FB1'; ctx.beginPath(); ctx.moveTo(x-92,160); ctx.lineTo(x+92,160); ctx.lineTo(x,30); ctx.closePath(); ctx.fill(); dots([[x,28,9]],'#E9C46A');
  ctx.fillStyle='#3A2C52'; rrect(x-40,268,80,100,32); ctx.fill();
  const u=Math.min(seg(t,7.2,7.8),1-seg(t,8.5,8.9)); const len=380*easeInOut(u); const sway=30*Math.sin(t*2);
  if(len>4){ ctx.strokeStyle='#F6D365'; ctx.lineWidth=16; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x-12,366); ctx.quadraticCurveTo(x-40+sway*0.5,366+len*0.6,x-50+sway,366+len); ctx.stroke(); ctx.strokeStyle='#E9C46A'; ctx.lineWidth=3; for(let k=1;k<len/40;k++){ const q=k*40/len; const px=(1-q)*(1-q)*(x-12)+2*q*(1-q)*(x-40+sway*0.5)+q*q*(x-50+sway), py=(1-q)*(1-q)*366+2*q*(1-q)*(366+len*0.6)+q*q*(366+len); ctx.beginPath(); ctx.moveTo(px-7,py-6); ctx.lineTo(px+7,py+6); ctx.stroke(); } dots([[x-62+sway,366+len+4,10],[x-38+sway,366+len+4,10]],'#F48FB1'); dots([[x-50+sway,366+len+4,5]],'#D6336C'); }
  dots([[x,318,32]],'#F6D365'); dots([[x,322,20]],'#F6C9A4'); dots([[x-7,318,2.5],[x+7,318,2.5]],'#111'); ctx.strokeStyle='#4A2A1A'; ctx.lineWidth=2; ctx.beginPath(); ctx.arc(x,328,7,0.15*Math.PI,0.85*Math.PI); ctx.stroke(); if(t>=7.6&&t<8.8){ dots([[x+36,300+6*Math.sin(t*8),8]],'#F6C9A4'); } }

/* ---------- Schlosstor (Endposition, per Offset eingefahren) ---------- */
const PIT={x:1000,y:GROUND_Y}, HAT_HOME={x:1000,y:GROUND_Y-258}, CROWN_X=1000;
function beret(x,y,rot,s){ ctx.save(); ctx.translate(x,y); ctx.rotate(rot); ctx.scale(s,s); ctx.fillStyle='#3F51B5'; ctx.beginPath(); ctx.ellipse(0,-10,36,20,0,0,6.29); ctx.fill(); ctx.fillStyle='#303F9F'; ctx.beginPath(); ctx.ellipse(0,2,30,8,0,0,6.29); ctx.fill(); ctx.strokeStyle='#F48FB1'; ctx.lineWidth=6; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(20,-18); ctx.quadraticCurveTo(50,-60,70,-30); ctx.stroke(); ctx.restore(); }
function hatPos(t){ if(t<20.9){ const u=seg(t,20.2,20.9); const mx=mountX(t); return {x:lerp(HAT_HOME.x,mx+175,u),y:lerp(HAT_HOME.y,GROUND_Y-620,u)-420*Math.sin(Math.PI*u),rot:u*Math.PI*2}; } const b=seg(t,20.9,21.2); const mx=mountX(t); return {x:mx+175,y:GROUND_Y-620-(b<1?8*Math.sin(b*Math.PI):0),rot:0.1}; }
function crownDraw(x,y,s,age,glow){ ctx.save(); ctx.translate(x,y); ctx.scale(s,s); if(glow){ ctx.save(); ctx.globalCompositeOperation='lighter'; dots([[0,-20,70]],'rgba(255,225,140,0.35)'); ctx.restore(); } ctx.fillStyle='#E9C46A'; ctx.beginPath(); ctx.moveTo(-46,0); ctx.lineTo(-46,-40); ctx.lineTo(-24,-18); ctx.lineTo(0,-56); ctx.lineTo(24,-18); ctx.lineTo(46,-40); ctx.lineTo(46,0); ctx.closePath(); ctx.fill(); ctx.fillStyle='#D4A93A'; ctx.fillRect(-46,-8,92,8); dots([[-46,-42,5],[0,-58,6],[46,-42,5]],'#F48FB1'); dots([[-24,-6,4],[24,-6,4]],'#D6336C'); if(age){ text(age,0,-24,fontB(40),'#6A1B9A'); } ctx.restore(); }
function pit(t){ const x=PIT.x, y=PIT.y; ctx.save(); ctx.translate(x,y);
  ctx.fillStyle='#3F51B5'; rrect(-30,-100,26,60,12); ctx.fill(); rrect(4,-100,26,60,12); ctx.fill(); ctx.fillStyle='#FFF6EC'; rrect(-28,-44,22,44,6); ctx.fill(); rrect(6,-44,22,44,6); ctx.fill(); ctx.fillStyle='#4A3B5C'; rrect(-34,-12,30,14,5); ctx.fill(); rrect(4,-12,30,14,5); ctx.fill();
  ctx.fillStyle='#3F51B5'; rrect(-38,-206,76,116,18); ctx.fill(); dots([[0,-186,4],[0,-166,4],[0,-146,4]],'#E9C46A'); ctx.fillStyle='#F48FB1'; ctx.fillRect(-38,-206,76,10);
  ctx.strokeStyle='#F6C9A4'; ctx.lineWidth=16; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(-34,-190); ctx.lineTo(-56,-150); ctx.lineTo(-40,-140); ctx.moveTo(34,-190); ctx.lineTo(56,-150); ctx.lineTo(40,-140); ctx.stroke();
  /* Kissen */ ctx.fillStyle='#D6336C'; rrect(-64,-160,128,42,16); ctx.fill(); ctx.fillStyle='#B0264F'; rrect(-64,-130,128,12,6); ctx.fill(); dots([[-64,-160,6],[64,-160,6],[-64,-118,6],[64,-118,6]],'#E9C46A');
  dots([[0,-236,30]],'#F6C9A4'); ctx.fillStyle='#6E4620'; ctx.beginPath(); ctx.arc(0,-244,30,Math.PI,2*Math.PI); ctx.fill(); dots([[-10,-240,3.5],[10,-240,3.5]],'#111'); ctx.strokeStyle='#4A2A1A'; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(0,-228,9,0.15*Math.PI,0.85*Math.PI); ctx.stroke();
  ctx.restore(); }
function castle(i,t){ const ox=620+(SCX_END-SCX[i]); if(ox>W+700) return; ctx.save(); ctx.translate(ox-620,0); const base=GROUND_Y-30;
  /* Mauer mit Tor */ ctx.fillStyle='#EADBC8'; rrect(690,900,300,400,6); ctx.fill(); ctx.strokeStyle='#D7C4A8'; ctx.lineWidth=3; for(let y=940;y<1290;y+=50){ ctx.beginPath(); ctx.moveTo(690,y); ctx.lineTo(990,y); ctx.stroke(); } ctx.fillStyle='#3A2C52'; ctx.beginPath(); ctx.arc(840,1030,105,Math.PI,2*Math.PI); ctx.fill(); ctx.fillRect(735,1030,210,270); ctx.fillStyle='#8D6E63'; rrect(735,1030,60,270,6); ctx.fill(); rrect(885,1030,60,270,6); ctx.fill(); dots([[765,1160,6],[915,1160,6]],'#E9C46A');
  /* Tuerme: links Kegeldach, rechts Zinnen (Rosalies Landeplatz) */ for(const tx of [640,1040]){ ctx.fillStyle='#F3E5F5'; rrect(tx-60,686,120,614,14); ctx.fill(); ctx.strokeStyle='#E8D5EA'; ctx.lineWidth=3; for(let y=760;y<1290;y+=60){ ctx.beginPath(); ctx.moveTo(tx-60,y); ctx.lineTo(tx+60,y); ctx.stroke(); } ctx.save(); ctx.globalCompositeOperation='lighter'; ctx.fillStyle='rgba(255,220,120,0.85)'; for(const wy of [800,940,1080]){ ctx.beginPath(); ctx.arc(tx,wy,14,Math.PI,2*Math.PI); ctx.fill(); ctx.fillRect(tx-14,wy,28,30); } ctx.restore(); }
  ctx.fillStyle='#F48FB1'; ctx.beginPath(); ctx.moveTo(566,692); ctx.lineTo(714,692); ctx.lineTo(640,542); ctx.closePath(); ctx.fill(); dots([[640,540,9]],'#E9C46A'); ctx.fillStyle='#F3E5F5'; for(let k=0;k<5;k++) ctx.fillRect(980+k*26,670,16,20);
  /* Rosengirlande + Banner */ ctx.strokeStyle='#2E7D32'; ctx.lineWidth=10; ctx.beginPath(); ctx.moveTo(700,800); ctx.quadraticCurveTo(840,860,980,800); ctx.stroke(); for(let k=1;k<10;k++){ const u=k/10; const px=(1-u)*(1-u)*700+2*u*(1-u)*840+u*u*980, py=(1-u)*(1-u)*800+2*u*(1-u)*860+u*u*800; dots([[px,py,10]],k%2?'#D6336C':'#F48FB1'); }
  { const name=nameVal(); ctx.fillStyle='#FFF6EC'; rrect(690,690,300,110,14); ctx.fill(); ctx.strokeStyle='#E9C46A'; ctx.lineWidth=6; rrect(690,690,300,110,14); ctx.stroke(); dots([[704,704,4],[976,704,4],[704,786,4],[976,786,4]],'#D6336C'); text('Willkommen,',840,722,fontB(34,700),'#6A1B9A'); text(name+'!',840,768,fitFont(name+'!',270,48,26),'#D6336C'); }
  /* Ballons am linken Turm, Rosenbuesche */ for(const [bx,by,c] of [[520,600,'#F48FB1'],[556,562,'#E9C46A'],[540,640,'#B39DDB']]){ const yy=by+8*Math.sin(t*2+bx); ctx.strokeStyle='rgba(255,255,255,.7)'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(bx,yy+30); ctx.lineTo(bx+4,yy+120); ctx.stroke(); ctx.fillStyle=c; ctx.beginPath(); ctx.ellipse(bx,yy,26,32,0,0,6.29); ctx.fill(); }
  dots([[590,base-40,50],[1090,base-40,50]],'#2E7D32'); dots([[570,base-70,9],[610,base-50,9],[1070,base-64,9],[1110,base-46,9]],'#D6336C');
  pit(t); if(t<18.6) crownDraw(CROWN_X,GROUND_Y-162,0.9,null,false); if(t>=16.2&&t<20.2) beret(HAT_HOME.x,HAT_HOME.y,-0.1,1);   /* Krone auf dem Kissen, Pits Barett faehrt mit ein */
  /* Kroenung: Krone steigt auf, im Stein die Alterszahl */ if(t>=18.6){ const u=easeOutBack(seg(t,18.6,19.3)); const cy=lerp(GROUND_Y-162,960,u), sc=lerp(0.9,1.9,u); const age=$('age').value.trim().slice(0,2); ctx.save(); ctx.globalAlpha=Math.max(0.2,seg(t,18.6,18.75)); crownDraw(CROWN_X,cy,sc,age,true); ctx.restore(); if(t<19.9){ const r=rng(Math.floor(t*8)); ctx.save(); ctx.globalCompositeOperation='lighter'; for(let n=0;n<8;n++) dots([[CROWN_X-100+r()*200,cy-120+r()*180,3+r()*4]],'rgba(255,240,180,0.9)'); ctx.restore(); } }
  ctx.restore(); }

/* ---------- Kutsche mit Sternchen, Quaks und dem Kind ---------- */
function horseLegs(ph,side,moving){ const legs=(side==='far')?[[430,0.9],[350,Math.PI+0.9]]:[[460,0],[330,Math.PI]]; ctx.strokeStyle=(side==='far')?'#E0E0E0':'#FFFFFF'; ctx.lineWidth=24; ctx.lineCap='round'; for(const [hx,off] of legs){ const a=moving?0.5*Math.sin(ph*2*Math.PI+off):0; const kx=hx+Math.sin(a)*50, ky=-110+Math.cos(a)*50*0; const fx=hx+Math.sin(a)*100; ctx.beginPath(); ctx.moveTo(hx,-210); ctx.lineTo(kx,-110); ctx.lineTo(fx,-6); ctx.stroke(); dots([[fx,-6,12]],'#4A3B5C'); } }
function mount(t,i){ const mx=mountX(t), my=mountY(t,i); const flagUp=Math.min(seg(t,11.8,12.2),1-seg(t,13.4,13.8)); const moving=speed(t)>150; const ph=STEP[i]*1.4; const duck=Math.min(seg(t,10.8,11.1),1-seg(t,12.2,12.6));
  ctx.save(); ctx.translate(mx,my);
  /* Deichsel */ ctx.strokeStyle='#8D6E63'; ctx.lineWidth=10; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(130,-300); ctx.lineTo(310,-290); ctx.moveTo(130,-270); ctx.lineTo(310,-262); ctx.stroke();
  /* Sternchen */ horseLegs(ph,'far',moving); ctx.strokeStyle='#F48FB1'; ctx.lineWidth=14; ctx.lineCap='round'; for(let k=0;k<3;k++){ ctx.beginPath(); ctx.moveTo(275,-300+k*20); ctx.quadraticCurveTo(220-k*10+6*Math.sin(t*4+k),-330+k*30,190-k*14,-260+k*40+8*Math.sin(t*3+k)); ctx.stroke(); }
  ctx.fillStyle='#FFFFFF'; ctx.beginPath(); ctx.ellipse(390,-270,120,72,0,0,6.29); ctx.fill(); ctx.fillStyle='#EEEEEE'; ctx.beginPath(); ctx.ellipse(400,-240,90,36,0,0,6.29); ctx.fill(); ctx.strokeStyle='#E9C46A'; ctx.lineWidth=6; ctx.beginPath(); ctx.moveTo(470,-340); ctx.quadraticCurveTo(500,-260,470,-200); ctx.stroke();
  ctx.strokeStyle='#FFFFFF'; ctx.lineWidth=60; ctx.beginPath(); ctx.moveTo(470,-300); ctx.lineTo(530,-410); ctx.stroke(); ctx.strokeStyle='#F48FB1'; ctx.lineWidth=12; for(let k=0;k<4;k++){ ctx.beginPath(); ctx.moveTo(452+k*16,-320-k*26); ctx.quadraticCurveTo(430+k*16,-340-k*26+6*Math.sin(t*5+k),436+k*16,-366-k*26); ctx.stroke(); }
  ctx.fillStyle='#FFFFFF'; ctx.beginPath(); ctx.ellipse(555,-440,54,36,0,0,6.29); ctx.fill(); rrect(580,-452,64,32,14); ctx.fill(); dots([[634,-436,4]],'#B0A0A8'); ctx.beginPath(); ctx.moveTo(530,-468); ctx.lineTo(540,-500); ctx.lineTo(552,-470); ctx.closePath(); ctx.fill(); dots([[562,-452,9]],'#FFFFFF'); dots([[564,-451,5]],'#111'); dots([[545,-470,7]],'#E9C46A'); dots([[545,-470,3]],'#FFF6EC');
  ctx.fillStyle='#F48FB1'; for(const [dx,dy,r] of [[534,-500,10],[548,-512,12],[562,-502,10]]){ ctx.beginPath(); ctx.ellipse(dx,dy,r,r*1.6,0,0,6.29); ctx.fill(); }
  ctx.strokeStyle='#E9C46A'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(600,-436); ctx.quadraticCurveTo(400,-560,200,-600); ctx.stroke();
  horseLegs(ph+0.03,'near',moving);
  /* Raeder hinter dem Wagenkasten */ for(const [wx,wy,r] of [[-100,-95,95],[95,-75,75]]){ ctx.save(); ctx.translate(wx,wy); ctx.rotate(SCX[i]/r); ctx.strokeStyle='#5D4037'; ctx.lineWidth=14; ctx.beginPath(); ctx.arc(0,0,r-7,0,6.29); ctx.stroke(); ctx.strokeStyle='#E9C46A'; ctx.lineWidth=6; for(let k=0;k<8;k++){ const a=k*Math.PI/4; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(Math.cos(a)*(r-12),Math.sin(a)*(r-12)); ctx.stroke(); } dots([[0,0,14]],'#E9C46A'); ctx.restore(); }
  ctx.strokeStyle='#5D4037'; ctx.lineWidth=8; ctx.beginPath(); ctx.arc(-100,-230,60,Math.PI*0.2,Math.PI*0.8); ctx.arc(95,-220,50,Math.PI*0.2,Math.PI*0.8); ctx.stroke();
  /* Wagenkasten (geschlossen), Fenster mit dem Kind, Tuer */ ctx.fillStyle='#FCE4EC'; rrect(-170,-520,300,270,44); ctx.fill(); ctx.strokeStyle='#E9C46A'; ctx.lineWidth=6; rrect(-170,-520,300,270,44); ctx.stroke(); ctx.fillStyle='#F48FB1'; rrect(-170,-290,300,40,20); ctx.fill();
  const WX=-125, WY=-490, WW=160, WH=160; ctx.fillStyle='#3A2C52'; rrect(WX,WY,WW,WH,34); ctx.fill();
  ctx.save(); rrect(WX,WY,WW,WH,34); ctx.clip(); ctx.fillStyle='#F48FB1'; rrect(-105,-360,120,60,24); ctx.fill(); dots([[-96,-352,18],[6,-352,18]],'#F8BBD0'); ctx.fillStyle='#F6C9A4'; rrect(-57,-372,24,24,8); ctx.fill(); ctx.save(); ctx.beginPath(); ctx.arc(-45,-415,56,0,6.29); ctx.clip(); ctx.fillStyle='#F6C9A4'; ctx.fillRect(-105,-475,120,120); drawPhotoInCircle(-45,-415,56,zoomVal()); ctx.restore(); ctx.strokeStyle='#E9C46A'; ctx.lineWidth=4; ctx.beginPath(); ctx.arc(-45,-415,56,0,6.29); ctx.stroke();
    /* Kroenchen */ ctx.fillStyle='#E9C46A'; ctx.beginPath(); ctx.moveTo(-78,-460); ctx.lineTo(-74,-488); ctx.lineTo(-60,-470); ctx.lineTo(-45,-498); ctx.lineTo(-30,-470); ctx.lineTo(-16,-488); ctx.lineTo(-12,-460); ctx.closePath(); ctx.fill(); dots([[-45,-500,5],[-74,-490,4],[-16,-490,4]],'#F48FB1');
    ctx.fillStyle='rgba(214,51,108,0.85)'; ctx.beginPath(); ctx.moveTo(WX,WY); ctx.quadraticCurveTo(WX+40,WY+80,WX+8,WY+WH); ctx.lineTo(WX,WY+WH); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.moveTo(WX+WW,WY); ctx.quadraticCurveTo(WX+WW-40,WY+80,WX+WW-8,WY+WH); ctx.lineTo(WX+WW,WY+WH); ctx.closePath(); ctx.fill(); ctx.restore();
  ctx.strokeStyle='#E9C46A'; ctx.lineWidth=7; rrect(WX,WY,WW,WH,34); ctx.stroke(); ctx.lineWidth=4; rrect(30,-360,90,100,14); ctx.stroke(); dots([[108,-310,6]],'#E9C46A'); ctx.fillStyle='#D6336C'; ctx.beginPath(); ctx.moveTo(75,-322); ctx.bezierCurveTo(90,-344,108,-324,75,-304); ctx.bezierCurveTo(42,-324,60,-344,75,-322); ctx.fill();
  /* Dach mit Zierleiste, Kutschbock, Quaks */ ctx.fillStyle='#E9C46A'; rrect(-185,-544,330,28,10); ctx.fill(); for(let k=0;k<8;k++) dots([[-165+k*44,-550,6]],'#E9C46A'); ctx.fillStyle='#D6336C'; rrect(130,-564,90,44,10); ctx.fill(); ctx.fillStyle='#8D6E63'; rrect(150,-520,60,14,4); ctx.fill();
  ctx.save(); ctx.translate(175,-592); ctx.translate(0,20*duck); ctx.fillStyle='#66BB6A'; ctx.beginPath(); ctx.ellipse(0,0,30,24,0,0,6.29); ctx.fill(); ctx.fillStyle='#A5D6A7'; ctx.beginPath(); ctx.ellipse(0,8,18,12,0,0,6.29); ctx.fill(); dots([[-12,-18,10],[12,-18,10]],'#FFFFFF'); dots([[-11,-17,5],[13,-17,5]],'#111'); ctx.strokeStyle='#2E7D32'; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(0,-2,9,0.15*Math.PI,0.85*Math.PI); ctx.stroke(); ctx.fillStyle='#E9C46A'; ctx.beginPath(); ctx.moveTo(-14,-28); ctx.lineTo(-12,-44); ctx.lineTo(-5,-32); ctx.lineTo(0,-48); ctx.lineTo(5,-32); ctx.lineTo(12,-44); ctx.lineTo(14,-28); ctx.closePath(); ctx.fill(); if(t>=7.8&&t<8.6){ ctx.strokeStyle='#66BB6A'; ctx.lineWidth=8; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(24,-4); ctx.lineTo(46,-34+8*Math.sin(t*14)); ctx.stroke(); } ctx.restore();
  /* Wimpel auf dem Dach */ ctx.save(); ctx.translate(-60,-544); ctx.rotate(-0.06); const ext=150*flagUp; ctx.fillStyle='#8D6E63'; ctx.fillRect(-5,-280-ext,10,286+ext); const fw=Math.sin(t*9)*12; ctx.fillStyle='#F48FB1'; ctx.beginPath(); ctx.moveTo(5,-278-ext); ctx.quadraticCurveTo(70,-260-ext+fw,140,-250-ext+fw); ctx.lineTo(5,-200-ext); ctx.closePath(); ctx.fill(); ctx.strokeStyle='#E9C46A'; ctx.lineWidth=4; ctx.stroke(); ctx.fillStyle='#FFF6EC'; rrect(40,-256-ext+fw*0.6,34,20,5); ctx.fill(); ctx.fillStyle='#D6336C'; ctx.fillRect(40,-252-ext+fw*0.6,34,6); ctx.fillStyle='#64B5F6'; ctx.fillRect(50,-268-ext+fw*0.6,4,12); ctx.fillRect(60,-268-ext+fw*0.6,4,12); dots([[52,-271-ext+fw*0.6,3],[62,-271-ext+fw*0.6,3]],'#FFB53A'); ctx.restore();
  ctx.restore();
  /* Blueten und Staub hinter dem Hinterrad */ if(moving){ const r=rng(Math.floor(t*10)); for(let n=0;n<6;n++){ const dx=-220-r()*170, dy=-r()*70, rr=12+r()*20; dots([[mx+dx,my+dy-6,rr]],`rgba(230,215,190,${(0.4-n*0.05).toFixed(2)})`); } for(let n=0;n<4;n++){ ctx.fillStyle='#F8BBD0'; ctx.beginPath(); ctx.ellipse(mx-230-r()*150,my-40-r()*120,9,5,r()*3,0,6.29); ctx.fill(); } } }

/* ---------- Rosalie, die Drachin ---------- */
const HOVER={x:860,y:480}, PERCH={x:1040,y:620,sc:0.6};
function rosalieState(t){ if(t<9.8) return null; let x,y,dir=1,sc=1,fire=0,sniff=0,happy=false,blush=0,flap=1,perched=false,nod=0;
  if(t<10.6){ const u=easeOut(seg(t,9.8,10.6)); x=lerp(1450,HOVER.x,u); y=lerp(250,HOVER.y,u); }
  else if(t<13.3){ x=HOVER.x; y=HOVER.y+12*Math.sin(t*3); if(t>=10.8&&t<11.6){ const p=seg(t,10.8,11.6); fire=Math.abs(Math.sin(p*Math.PI*2))*(1-p*0.2); } if(t>=11.9&&t<12.4) sniff=Math.sin(seg(t,11.9,12.4)*Math.PI); if(t>=12.4){ happy=true; blush=seg(t,12.4,12.9); } }
  else if(t<13.9){ const u=easeIn(seg(t,13.3,13.9)); x=HOVER.x; y=lerp(HOVER.y,-320,u); happy=true; blush=0.6; flap=1.6; }
  else if(t<14.3){ x=HOVER.x; y=-400; happy=true; }
  else if(t<14.8){ const u=easeOut(seg(t,14.3,14.8)); x=lerp(-350,260,u); y=lerp(180,300,u); dir=-1; happy=true; blush=0.6; flap=1.4; }
  else if(t<16.6){ x=260+20*Math.sin(t*1.7); y=300+14*Math.sin(t*2.6); dir=-1; happy=true; blush=0.6; }
  else if(t<17.8){ const u=easeInOut(seg(t,16.6,17.8)); x=lerp(260,PERCH.x,u); y=lerp(300,PERCH.y,u)-120*Math.sin(Math.PI*u); dir=u<0.5?-1:1; sc=lerp(1,PERCH.sc,u); happy=true; blush=0.6; flap=1.2; }
  else { x=PERCH.x; y=PERCH.y; sc=PERCH.sc; happy=true; blush=0.6; perched=true; flap=0.15; nod=seg(t,20.2,20.6); }
  return {x,y,dir,sc,fire,sniff,happy,blush,flap,perched,nod}; }
function rosalie(d,t){ if(!d.perched&&d.y>0&&d.y<GROUND_Y-200&&d.x>-200&&d.x<W+200){ ctx.save(); ctx.globalAlpha=0.16*Math.min(1,(GROUND_Y-d.y)/600); ctx.fillStyle='#000'; ctx.beginPath(); ctx.ellipse(d.x-80*d.dir,GROUND_Y-22,150*d.sc,26*d.sc,0,0,6.29); ctx.fill(); ctx.restore(); }
  ctx.save(); ctx.translate(d.x,d.y); ctx.scale(d.dir*d.sc,d.sc); const wingA=(d.perched?0.9:0.35*Math.sin(t*12*d.flap))-0.2;
  /* Schwanz mit Herzspitze */ ctx.strokeStyle='#F48FB1'; ctx.lineWidth=40; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(170,-20); ctx.quadraticCurveTo(330,-40,380,-170+10*Math.sin(t*3)); ctx.stroke(); ctx.fillStyle='#D6336C'; ctx.beginPath(); const hx=384, hy=-186+10*Math.sin(t*3); ctx.moveTo(hx,hy+26); ctx.bezierCurveTo(hx+40,hy-10,hx+20,hy-40,hx,hy-14); ctx.bezierCurveTo(hx-20,hy-40,hx-40,hy-10,hx,hy+26); ctx.fill();
  /* hinterer Fluegel */ ctx.save(); ctx.translate(-20,-100); ctx.rotate(-wingA*0.7); ctx.fillStyle='#9C7BCB'; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(60,-230); ctx.lineTo(190,-190); ctx.lineTo(150,-50); ctx.closePath(); ctx.fill(); ctx.restore();
  /* Beine (vier, kurz) */ ctx.strokeStyle='#E980A8'; ctx.lineWidth=26; for(const lx of [-110,90]){ ctx.beginPath(); ctx.moveTo(lx,80); ctx.lineTo(lx-10,140); ctx.stroke(); dots([[lx-10,146,16]],'#E980A8'); } ctx.strokeStyle='#F48FB1'; for(const lx of [-70,130]){ ctx.beginPath(); ctx.moveTo(lx,90); ctx.lineTo(lx+10,150); ctx.stroke(); dots([[lx+10,156,16]],'#F48FB1'); dots([[lx,164,4],[lx+10,168,4],[lx+20,164,4]],'#FFF6EC'); }
  /* Koerper, Bauch, Rueckenzacken */ ctx.fillStyle='#F48FB1'; ctx.beginPath(); ctx.ellipse(0,0,200,110,0,0,6.29); ctx.fill(); ctx.fillStyle='#FCE4EC'; ctx.beginPath(); ctx.ellipse(-20,34,150,58,0,0,6.29); ctx.fill(); ctx.fillStyle='#B39DDB'; for(let k=0;k<5;k++){ const px=-120+k*60; ctx.beginPath(); ctx.moveTo(px-22,-100+Math.abs(k-2)*8); ctx.lineTo(px,-150+Math.abs(k-2)*10); ctx.lineTo(px+22,-100+Math.abs(k-2)*8); ctx.closePath(); ctx.fill(); }
  /* vorderer Fluegel */ ctx.save(); ctx.translate(-40,-90); ctx.rotate(wingA); ctx.fillStyle='#B39DDB'; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(60,-240); ctx.lineTo(200,-200); ctx.lineTo(160,-60); ctx.closePath(); ctx.fill(); ctx.strokeStyle='#9C7BCB'; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(60,-240); ctx.moveTo(0,0); ctx.lineTo(130,-220); ctx.moveTo(0,0); ctx.lineTo(180,-130); ctx.stroke(); ctx.restore();
  /* Hals + Kopf (Schnuppern senkt die Nase) */ ctx.save(); ctx.translate(-150,-60); ctx.rotate(d.sniff*0.35-d.nod*0.9); ctx.strokeStyle='#F48FB1'; ctx.lineWidth=70; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(-80,-70); ctx.stroke();
    ctx.fillStyle='#F48FB1'; ctx.beginPath(); ctx.ellipse(-110,-90,100,72,0,0,6.29); ctx.fill(); ctx.fillStyle='#F8BBD0'; rrect(-240,-100,120,58,26); ctx.fill(); dots([[-222,-84,5],[-206,-80,5]],'#D6336C');
    ctx.fillStyle='#B39DDB'; for(const [px,py] of [[-100,-160],[-60,-150]]){ ctx.beginPath(); ctx.moveTo(px-14,py); ctx.lineTo(px,py-34); ctx.lineTo(px+14,py); ctx.closePath(); ctx.fill(); }
    const er=d.happy?28:24; dots([[-118,-118,er]],'#FFFFFF'); dots([[-126,-116,d.happy?14:10]],'#111'); dots([[-132,-124,4]],'#FFF'); ctx.strokeStyle='#4A3B5C'; ctx.lineWidth=4; for(const a of [-1.4,-1.75,-2.1]){ ctx.beginPath(); ctx.moveTo(-118+Math.cos(a)*(er+2),-118+Math.sin(a)*(er+2)); ctx.lineTo(-118+Math.cos(a)*(er+16),-118+Math.sin(a)*(er+16)); ctx.stroke(); }
    if(d.happy){ ctx.strokeStyle='#4A3B5C'; ctx.lineWidth=4; ctx.beginPath(); ctx.arc(-118,-118,er+4,Math.PI*1.15,Math.PI*1.85); ctx.stroke(); } else { ctx.strokeStyle='#4A3B5C'; ctx.lineWidth=7; ctx.beginPath(); ctx.moveTo(-150,-160); ctx.lineTo(-96,-150); ctx.stroke(); }
    if(d.fire>0){ ctx.fillStyle='#8E2A3A'; rrect(-246,-70,80,20+d.fire*26,10); ctx.fill(); ctx.save(); ctx.translate(-236,-104); ctx.rotate(-2.7); const L=260*d.fire; ctx.fillStyle='#FF8A65'; ctx.beginPath(); ctx.moveTo(0,-30); ctx.lineTo(L,-70-L*0.15); ctx.lineTo(L*1.05,0); ctx.lineTo(L,70+L*0.15); ctx.lineTo(0,30); ctx.closePath(); ctx.fill(); ctx.fillStyle='#FFD54F'; ctx.beginPath(); ctx.moveTo(0,-16); ctx.lineTo(L*0.8,-40-L*0.08); ctx.lineTo(L*0.85,0); ctx.lineTo(L*0.8,40+L*0.08); ctx.lineTo(0,16); ctx.closePath(); ctx.fill(); ctx.fillStyle='#FFF6EC'; ctx.beginPath(); ctx.moveTo(0,-6); ctx.lineTo(L*0.5,-12); ctx.lineTo(L*0.55,0); ctx.lineTo(L*0.5,12); ctx.lineTo(0,6); ctx.closePath(); ctx.fill(); ctx.restore(); } else { ctx.strokeStyle='#4A3B5C'; ctx.lineWidth=4; ctx.beginPath(); ctx.arc(-200,-72,18,0.1*Math.PI,0.9*Math.PI); ctx.stroke(); }
    if(d.blush>0){ ctx.save(); ctx.globalAlpha=d.blush*0.7; dots([[-150,-72,18]],'#FF6F91'); ctx.restore(); }
    if(d.perched){ const ph=(t*0.8)%1; ctx.save(); ctx.globalAlpha=0.7*(1-ph); ctx.fillStyle='#F48FB1'; const hx2=-250-ph*40, hy2=-140-ph*90, s2=0.6+ph*0.5; ctx.beginPath(); ctx.moveTo(hx2,hy2+8*s2); ctx.bezierCurveTo(hx2+14*s2,hy2-6*s2,hx2+8*s2,hy2-16*s2,hx2,hy2-6*s2); ctx.bezierCurveTo(hx2-8*s2,hy2-16*s2,hx2-14*s2,hy2-6*s2,hx2,hy2+8*s2); ctx.fill(); ctx.restore(); }
    ctx.restore();
  ctx.restore(); }

/* ---------- Flatter (Schmetterling) ---------- */
function flatterDraw(x,y,dir,t){ ctx.save(); ctx.translate(x,y); ctx.scale(dir,1); const f=0.35+0.65*Math.abs(Math.cos(t*14)); for(const s of [-1,1]){ ctx.save(); ctx.scale(s*f,1); ctx.fillStyle='#F48FB1'; ctx.beginPath(); ctx.ellipse(28,-12,28,18,-0.3,0,6.29); ctx.fill(); ctx.fillStyle='#B39DDB'; ctx.beginPath(); ctx.ellipse(22,14,20,14,0.3,0,6.29); ctx.fill(); dots([[30,-12,6],[22,14,4]],'#FFF6EC'); ctx.restore(); } ctx.strokeStyle='#4A3B5C'; ctx.lineWidth=5; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(0,-22); ctx.lineTo(0,22); ctx.stroke(); dots([[0,-24,6]],'#4A3B5C'); ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(-3,-28); ctx.quadraticCurveTo(-14,-46,-20,-40); ctx.moveTo(3,-28); ctx.quadraticCurveTo(14,-46,20,-40); ctx.stroke(); ctx.restore(); }
function flatter(t,i){ if(t<6.2) return null;
  if(t<7.0){ const u=easeInOut(seg(t,6.2,7.0)); const tip=mountPoint(0,-800,t,i); return {x:lerp(-120,tip.x-170,u),y:lerp(300,tip.y,u),dir:1}; }
  if(t<8.6){ const tip=mountPoint(0,-800,t,i); const a=-Math.PI+2*Math.PI*seg(t,7.0,8.6); return {x:tip.x+170*Math.cos(a),y:tip.y+80*Math.sin(a),dir:(-Math.sin(a)>=0)?1:-1}; }
  if(t<9.2){ const tip=mountPoint(0,-800,8.6,i), p=mountPoint(60,-566,t,i); const u=easeInOut(seg(t,8.6,9.2)); return {x:lerp(tip.x-170,p.x,u),y:lerp(tip.y,p.y,u),dir:1}; }
  if(t<10.8){ const p=mountPoint(60,-566,t,i); return {x:p.x,y:p.y,dir:1}; }
  if(t<11.3){ const p=mountPoint(60,-566,10.8,i); const u=easeOut(seg(t,10.8,11.3)); return {x:lerp(p.x,200,u),y:lerp(p.y,400,u),dir:1}; }
  if(t<14.0) return {x:200+16*Math.sin(t*2.2),y:400+14*Math.sin(t*3.1),dir:1};
  if(t<16.5){ const mx=mountX(t); const u=easeInOut(seg(t,14.0,14.6)); return {x:lerp(200,mx-260,u)+10*Math.sin(t*3),y:lerp(400,600,u)+12*Math.sin(t*2.6),dir:1}; }
  if(t<17.6){ const mx=mountX(16.5); const u=easeInOut(seg(t,16.5,17.6)); return {x:lerp(mx-260,660,u),y:lerp(600,500,u)-80*Math.sin(Math.PI*u),dir:1}; }
  if(t<19.6) return {x:660+4*Math.sin(t*2),y:500+4*Math.sin(t*2.7),dir:-1};
  if(t<19.9){ const u=easeInOut(seg(t,19.6,19.9)); return {x:lerp(660,450,u),y:lerp(500,640,u),dir:-1}; }
  if(t<21.6){ const a=2*Math.PI*seg(t,19.9,21.6); return {x:300+150*Math.cos(a),y:640+50*Math.sin(a),dir:(-Math.sin(a)>=0)?1:-1}; }
  const u=easeIn(seg(t,21.6,22.8)); return {x:lerp(450,-160,u),y:lerp(640,300,u),dir:-1}; }

/* ---------- Texte ---------- */
function texts(t,i){ const name=nameVal();
  if(t<3){ text('Die königliche Kutsche fährt vor …',W/2,H*.14,fitFont('Die königliche Kutsche fährt vor …',W-100,60,40,700),'#FFF6EC','center','#4A3B5C',9); }
  popIn(t,3.0,4.8,W/2,H*.22,()=>text('AB ZUM KRÖNUNGSFEST!',0,0,fitFont('AB ZUM KRÖNUNGSFEST!',W-120,170,60),'#FFFFFF','center','#6A1B9A',26));
  if(t>=6.3&&t<9.4){ const u=easeOut(seg(t,6.3,6.9)); const lines=wrap(`${name} fährt zum Krönungsfest!`,W-160,fontB(112)); ctx.save(); ctx.globalAlpha=u*(1-seg(t,8.9,9.4)); ctx.translate(lerp(-300,0,u),0); lines.forEach((ln,k)=>text(ln,W/2,H*.12+k*122,fontB(112),'#FFFFFF','center','#6A1B9A',24)); ctx.restore(); }
  if(t>=9.9&&t<11.4){ ctx.save(); ctx.globalAlpha=Math.min(seg(t,9.9,10.2),1-seg(t,11.0,11.4)); text('Achtung, Drache!',W/2,H*.13,fontB(110),'#FFE45C','center','#4A3B5C',22); ctx.restore(); }
  popIn(t,10.9,11.7,430,700,()=>text('FFFAUCH!',0,0,fontB(118),'#FF8A65','center','#4A3B5C',22));
  popIn(t,14.3,16.2,W/2,H*.78,()=>text('Im Galopp zum Schloss!',0,0,fitFont('Im Galopp zum Schloss!',W-120,120,64),'#FFFFFF','center','#6A1B9A',26));
  const p=flatter(t,i); if(p){ if(t>=9.3&&t<10.2) bubble(p.x-40,p.y-262,470,110,'Da lang, Hoheit!',Math.min(seg(t,9.3,9.6),1-seg(t,9.9,10.2)),'#6A1B9A','#E9C46A'); if(t>=13.2&&t<14.3) bubble(p.x-40,p.y-262,470,110,'Königlich!',Math.min(seg(t,13.2,13.5),1-seg(t,14.0,14.3)),'#6A1B9A','#E9C46A'); }
  if(t>=12.4&&t<13.4) bubble(610,170,340,110,'Party?!',Math.min(seg(t,12.4,12.7),1-seg(t,13.1,13.4)),'#D6336C','#E9C46A');
  popIn(t,20.2,20.9,880,1040,()=>text('Huch!',0,0,fontB(64),'#E9C46A','center','#4A3B5C',14));
  if(t>=20.5){ const u=easeOutBack(seg(t,20.5,21.2)); const cardW=W-140, cardH=520, x=70, y=lerp(-620,40,u); ctx.save(); ctx.shadowColor='rgba(0,0,0,.4)'; ctx.shadowBlur=36; ctx.shadowOffsetY=14; ctx.fillStyle='#FFF6EC'; rrect(x,y,cardW,cardH,26); ctx.fill(); ctx.restore(); ctx.strokeStyle='#E9C46A'; ctx.lineWidth=7; rrect(x+12,y+12,cardW-24,cardH-24,20); ctx.stroke(); ctx.lineWidth=2; rrect(x+24,y+24,cardW-48,cardH-48,16); ctx.stroke();
    ctx.strokeStyle='#E9C46A'; ctx.lineWidth=4; ctx.lineCap='round'; for(const [cx,cy,sx,sy] of [[x+40,y+40,1,1],[x+cardW-40,y+40,-1,1],[x+40,y+cardH-40,1,-1],[x+cardW-40,y+cardH-40,-1,-1]]){ ctx.beginPath(); ctx.moveTo(cx,cy+40*sy); ctx.quadraticCurveTo(cx,cy,cx+40*sx,cy); ctx.stroke(); dots([[cx+12*sx,cy+12*sy,5]],'#D6336C'); }
    const title=`👑 ${possName(name)} Prinzessinnen-Party`; text(title,W/2,y+112,fitFont(title,cardW-140,74,44),'#6A1B9A'); text(`📅 ${$('date').value}  ·  ${$('time').value}`,W/2,y+215,fontD(54),'#4A3B5C'); const pl=wrap(`📍 ${$('place').value}`,cardW-120,fontD(54)); pl.forEach((ln,k)=>text(ln,W/2,y+296+k*62,fontD(54),'#4A3B5C'));
    const pulse=1+.04*Math.sin(t*6); ctx.save(); ctx.translate(W/2,y+440); ctx.scale(pulse,pulse); text('Kommst du mit? 👑',0,0,fontB(82),'#D6336C'); ctx.restore(); }
  ctx.globalAlpha=.6; text('machsleicht.de',W/2,H-42,fontD(38,600),'#FFFFFF'); ctx.globalAlpha=1; }

function shakeAmp(t){ let a=0; if(t>=9.8&&t<10.6) a=3; if(t>=10.8&&t<11.6) a=Math.max(a,6*Math.sin(seg(t,10.8,11.6)*Math.PI)); if(t>=14.0&&t<16.6) a=Math.max(a,2); if(t>=15.7&&t<16.2) a=Math.max(a,8*(1-seg(t,15.7,16.2))); if(t>=19.2&&t<19.6) a=Math.max(a,5*(1-seg(t,19.2,19.6))); return a; }

/* ---------- Frame ---------- */
function drawFrame(i){ i=clamp(i,0,P_N-1); const t=i/FPS; const a=shakeAmp(t);
  sky(t); sun(t); clouds(i);
  ctx.save(); if(a>0){ ctx.translate(SHAKE[i][0]*a,SHAKE[i][1]*a); }
  hills(i,t); keep(i,t); midLayer(i,t); rapunzel(t); ground(i,t); cottage(i); castle(i,t);
  const d=rosalieState(t); if(d&&d.perched) rosalie(d,t);
  mount(t,i);
  if(d&&!d.perched) rosalie(d,t);
  const p=flatter(t,i); if(p) flatterDraw(p.x,p.y,p.dir,t);
  if(t>=20.2){ const hp=hatPos(t); beret(hp.x,hp.y,hp.rot,1); }
  petals(i,t); fireworks(i,t,15.2); fireworks(i,t,19.3);
  ctx.restore();
  texts(t,i); }

/* ---------- Ton ---------- */
function audio(ac,master,S){ const {tone,noise,bell,bed,env}=S;
  const clop=(t0,peak=0.16)=>{ noise(t0,0.05,'bandpass',1400,900,peak,0.002,0.04,2); tone(t0,180,120,0.06,'triangle',peak*0.7,0.002,0.04); };
  const brass=(t0,f,dur,peak=0.2)=>{ const o=ac.createOscillator(); o.type='sawtooth'; o.frequency.value=f; const fl=ac.createBiquadFilter(); fl.type='lowpass'; fl.frequency.setValueAtTime(600,t0); fl.frequency.linearRampToValueAtTime(2400,t0+0.08); fl.frequency.linearRampToValueAtTime(1200,t0+dur); const g=ac.createGain(); env(g,t0,0.03,peak,Math.max(0.01,dur-0.13),0.1); o.connect(fl).connect(g).connect(master); o.start(t0); o.stop(t0+dur+0.3); };
  const rocket=(t0)=>{ tone(t0,500,1900,0.5,'sawtooth',0.05,0.02,0.15); noise(t0+0.5,0.5,'lowpass',400,200,0.55,0.002,0.4); tone(t0+0.5,90,40,0.5,'sine',0.5,0.002,0.4); { const r=S.rng(Math.floor(t0*10)); for(let k=0;k<16;k++){ const f=1500+r()*2500; tone(t0+0.6+r()*1.2,f,f,0.05,'square',0.03,0.002,0.04); } } };
  [0.6,1.3,2.0].forEach((t,k)=>bell(t,1568+k*200,0.24)); bell(3.0,2093,0.3); noise(1.5,0.25,'bandpass',600,300,0.12,0.02,0.15);   /* Gloeckchen, Sternchen schnaubt */
  for(let t=3.3;t<10.5;t+=0.31){ clop(t,0.14); clop(t+0.12,0.1); } for(let t=14.0;t<17.4;t+=0.2){ clop(t,0.14); clop(t+0.07,0.1); }   /* Trab, Galopp */
  bed('bandpass',700,2,[[3.2,0],[3.8,0.03],[10.6,0.03],[11,0],[13.8,0],[14.4,0.04],[17.6,0.04],[18,0]],1.5,0.02);                     /* Raeder knarzen */
  { const r=S.rng(3); for(let k=0;k<8;k++){ const t=6.4+r()*3; bell(t,2637+r()*800,0.06); } }                                            /* Flatter klimpert */
  noise(7.3,0.5,'bandpass',500,900,0.08,0.05,0.3); tone(7.9,880,1320,0.18,'sine',0.12,0.01,0.1); tone(8.1,1320,1100,0.2,'sine',0.1,0.01,0.12);   /* Zopf schwingt, Rapunzel: Huhu */
  tone(8.3,220,180,0.12,'sawtooth',0.06,0.01,0.06); tone(8.45,200,170,0.12,'sawtooth',0.06,0.01,0.06);                                   /* Quaks quakt */
  /* Rosalie */ for(let t=9.8;t<10.7;t+=0.3) noise(t,0.22,'bandpass',300,700,0.18,0.02,0.15); bed('lowpass',110,0.9,[[9.7,0],[10.3,0.14],[13.3,0.14],[13.9,0]],4,0.04);
  noise(11.0,0.35,'highpass',1200,600,0.35,0.01,0.25); tone(11.0,140,70,0.35,'sawtooth',0.14,0.01,0.25); noise(11.35,0.5,'highpass',1200,500,0.4,0.01,0.35); tone(11.35,140,60,0.5,'sawtooth',0.16,0.01,0.35);   /* FFFAUCH */
  noise(11.9,0.12,'highpass',2000,2000,0.08,0.02,0.08); noise(12.1,0.12,'highpass',2000,2000,0.08,0.02,0.08);
  tone(12.4,500,700,0.2,'sine',0.15,0.01,0.1); tone(12.65,700,950,0.25,'sine',0.15,0.01,0.12); [12.9,13.02,13.14].forEach((t,k)=>tone(t,420+k*100,420+k*100,0.08,'square',0.08,0.005,0.05));
  for(let t=13.3;t<13.9;t+=0.15) noise(t,0.14,'bandpass',300,800,0.2,0.01,0.1);                                                           /* steigt auf */
  rocket(15.2); bed('bandpass',900,0.6,[[13.9,0],[14.6,0.14],[16.4,0.14],[17.4,0]],0.8,0.05);
  /* Kroenung */ [18.6,18.75,18.9].forEach((t,k)=>bell(t,[1568,1976,2349][k],0.24)); bell(19.05,3136,0.2); { const r=S.rng(9); for(let k=0;k<10;k++){ const f=2400+r()*2000; tone(18.7+r()*0.8,f,f,0.12,'sine',0.06,0.005,0.1); } }
  /* Fanfare, zweite Rakete, Barett, Quaks */ [19.2,19.4].forEach(t=>tone(t,110,55,0.25,'sine',0.5,0.003,0.2)); [[19.5,392],[19.7,494],[19.9,587]].forEach(([t,f])=>brass(t,f,0.28,0.2)); brass(20.15,784,0.8,0.18); rocket(19.3);
  noise(20.2,0.2,'bandpass',600,1400,0.18,0.01,0.1); tone(20.9,240,160,0.12,'sine',0.2,0.005,0.08); tone(21.0,220,180,0.12,'sawtooth',0.07,0.01,0.06); bell(20.7,1046,0.22);
  for(const f of [392,494,587]) for(const d of [-5,5]){ const o=ac.createOscillator(); o.type='sawtooth'; o.frequency.value=f+d; const fl=ac.createBiquadFilter(); fl.type='lowpass'; fl.frequency.value=1200; const g=ac.createGain(); env(g,20.0,0.8,0.018,2.6,0.6); o.connect(fl).connect(g).connect(master); o.start(20.0); o.stop(24); } }

startTrailer({ id:'prinzessin', title:'Prinzessinnen-Trailer', DUR:P_DUR, drawFrame, audio, photoDefault:IDA_URI, restFrameAt:8.9 });
