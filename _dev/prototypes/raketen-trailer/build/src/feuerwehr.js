/* ============================================================
   Drehbuch FEUERWEHR — „Alarm fuer die Party" (STORY-feuerwehr.md)
   0–3 Alarm in der Wache · 3–6 Ausfahrt · 6–9,6 Katze im Baum (Leiter, Fleck) ·
   9,6–14 Feuer: brennende Torte, Wasser marsch · 14–16,5 Mit Blaulicht voraus ·
   16,5–17,8 Party-Wache, Wasserbogen · 17,8–19,2 Empfang, Alterszahl aus der Torte ·
   19,2–21,9 Fanfare, Konfetti-Werfer, Brunos Helm · 20,5–24 Einsatzbefehl-Karte
   ============================================================ */
const P_DUR=24, P_N=P_DUR*FPS;
const HORIZON=1150, ROAD_Y=1330;
const R0=rng(31);
const SHAKE=Array.from({length:P_N+1},()=>[(R0()-.5)*2,(R0()-.5)*2]);
const CONF=Array.from({length:100},()=>({a:-0.9+(R0()-.5)*0.9,v:800+R0()*700,w:14+R0()*14,h:9+R0()*9,rot:R0()*6.28,spin:(R0()-.5)*9,c:['#E8C24E','#B32219','#1F6FA8','#F4F0E6','#FFFFFF','#FF6F91','#7CE0C3'][Math.floor(R0()*7)]}));
const HOUSES=Array.from({length:12},(_,k)=>({x:k*300+R0()*80,h:170+R0()*130,w:170+R0()*60,c:['#E8D3A0','#F2B8A2','#BFD8E8','#D9C9E8','#F4F0E6','#C9E2B8'][k%6],roof:['#B32219','#8E670D','#4A4E5A'][k%3]}));
const SKYLINE=Array.from({length:16},(_,k)=>({x:k*150+R0()*60,h:120+R0()*200,w:90+R0()*60}));
const IDA_URI='/*__IDA__*/';

/* ---------- Welt ---------- */
function speed(t){ if(t<3) return 0; if(t<4) return 650*easeIn(seg(t,3,4)); if(t<7.0) return 650; if(t<7.4) return 650*(1-easeOut(seg(t,7.0,7.4))); if(t<9.0) return 0; if(t<9.6) return 650*easeIn(seg(t,9.0,9.6)); if(t<10.4) return 650; if(t<10.8) return 650*(1-easeOut(seg(t,10.4,10.8))); if(t<13.8) return 0; if(t<14.6) return 950*easeIn(seg(t,13.8,14.6)); if(t<16.5) return 950; if(t<17.8) return 950*(1-easeOut(seg(t,16.5,17.8))); return 0; }
const SCX=[0]; for(let i=1;i<=P_N;i++) SCX[i]=SCX[i-1]+speed((i-.5)/FPS)/FPS; const SCX_END=SCX[P_N];
const TREE_WX=880+SCX[F(7.4)], CAKE_WX=980+SCX[F(10.8)];
function truckX(t){ return lerp(540,270,easeInOut(seg(t,16.6,17.8))); }
function truckMatrix(t,i){ const v=speed(t); const y=ROAD_Y+(v>50?3*Math.sin(t*30):0); const brake=(t>=7.0&&t<7.5)?Math.sin(seg(t,7.0,7.5)*Math.PI):(t>=10.4&&t<10.9)?Math.sin(seg(t,10.4,10.9)*Math.PI):(t>=17.3&&t<17.9)?Math.sin(seg(t,17.3,17.9)*Math.PI):0; return {x:truckX(t), y, r:-0.02*brake}; }
function truckPoint(lx,ly,t,i){ const m=truckMatrix(t,i); const c=Math.cos(m.r), s=Math.sin(m.r); return {x:m.x+lx*c-ly*s, y:m.y+lx*s+ly*c}; }

/* ---------- Himmel + Stadt ---------- */
const SKY=[[0,'#5F8FC8','#FBE7B2'],[6,'#4F93D6','#CFEAF7'],[9.5,'#4F93D6','#CFEAF7'],[13.6,'#4F93D6','#CFEAF7'],[14.8,'#5B3A7E','#F58B4C'],[17.5,'#3B2D62','#F0A868'],[24,'#2B2350','#E9A26B']];
const FAR=[[0,'#8FA3C0'],[13.6,'#8FA3C0'],[14.8,'#8A6A8A'],[17.5,'#4F4470'],[24,'#3A3560']];
const LAWN1=[[0,'#6FAF5C'],[13.6,'#6FAF5C'],[14.8,'#8E7A50'],[17.5,'#5A4E6E'],[24,'#3E3A5E']];
const LAWN2=[[0,'#4E9A4A'],[13.6,'#4E9A4A'],[14.8,'#6E5C44'],[17.5,'#443B5E'],[24,'#302C50']];
function keyed(list,t,idx){ let a=list[0], b=list[list.length-1]; for(let k=0;k<list.length-1;k++){ if(t>=list[k][0]&&t<=list[k+1][0]){ a=list[k]; b=list[k+1]; break; } } return mixHex(a[idx],b[idx],seg(t,a[0],b[0])); }
function sky(t){ const g=ctx.createLinearGradient(0,0,0,HORIZON); g.addColorStop(0,keyed(SKY,t,1)); g.addColorStop(1,keyed(SKY,t,2)); ctx.fillStyle=g; ctx.fillRect(0,0,W,HORIZON+4); }
function sun(t){ if(t<10){ const a=1-seg(t,8,10); const y=760-t*12; ctx.save(); ctx.globalAlpha=a; dots([[200,y,58]],'#FFE29A'); ctx.globalCompositeOperation='lighter'; const g=ctx.createRadialGradient(200,y,0,200,y,220); g.addColorStop(0,'rgba(255,200,120,0.35)'); g.addColorStop(1,'rgba(255,200,120,0)'); ctx.fillStyle=g; ctx.fillRect(-20,y-220,440,440); ctx.restore(); }
  if(t>=14){ const a=seg(t,14,15); const y=lerp(1000,1120,seg(t,14,18)); ctx.save(); ctx.globalAlpha=a; dots([[300,y,92]],'#FFB347'); ctx.globalCompositeOperation='lighter'; const g=ctx.createRadialGradient(300,y,0,300,y,340); g.addColorStop(0,'rgba(255,150,70,0.45)'); g.addColorStop(1,'rgba(255,150,70,0)'); ctx.fillStyle=g; ctx.fillRect(-40,y-340,680,680); ctx.restore(); } }
const CLOUDS=[[100,220,110],[420,140,140],[760,260,120],[1000,120,100],[1250,200,130],[1500,300,110]];
function clouds(i){ const span=W+800; for(const [cx,cy,r] of CLOUDS){ const x=((cx-SCX[i]*0.2)%span+span)%span-400; ctx.fillStyle='rgba(255,255,255,0.85)'; for(const [dx,dy,rr] of [[0,0,r],[-r*.7,r*.25,r*.75],[r*.75,r*.2,r*.7],[-r*.2,-r*.35,r*.6]]){ ctx.beginPath(); ctx.arc(x+dx,cy+dy,rr,0,6.29); ctx.fill(); } } }
function skyline(i,t){ const span=16*150; const glow=seg(t,15,18); for(const b of SKYLINE){ const x=((b.x-SCX[i]*0.3)%span+span)%span-200; ctx.fillStyle=keyed(FAR,t,1); ctx.fillRect(x,HORIZON-b.h,b.w,b.h+10); if(glow>0){ ctx.fillStyle=`rgba(255,224,130,${(0.9*glow).toFixed(2)})`; for(let wy=HORIZON-b.h+20; wy<HORIZON-20; wy+=44) for(let wx=x+12; wx<x+b.w-16; wx+=30) ctx.fillRect(wx,wy,12,18); } } }
function houses(i,t){ const span=12*300; const glow=seg(t,15,18); for(const h of HOUSES){ const x=((h.x-SCX[i]*0.6)%span+span)%span-250; const base=1300; ctx.fillStyle=h.c; ctx.fillRect(x,base-h.h,h.w,h.h); ctx.fillStyle=h.roof; ctx.beginPath(); ctx.moveTo(x-12,base-h.h); ctx.lineTo(x+h.w/2,base-h.h-70); ctx.lineTo(x+h.w+12,base-h.h); ctx.closePath(); ctx.fill(); ctx.fillStyle=mixHex('#6E7FA0','#FFE082',glow); for(let wy=base-h.h+26; wy<base-50; wy+=56) for(let wx=x+18; wx<x+h.w-30; wx+=48) rrect(wx,wy,22,30,4), ctx.fill(); ctx.fillStyle='#4A3320'; ctx.fillRect(x+h.w/2-18,base-60,36,60); } }
function ground(i,t){ ctx.fillStyle=keyed(LAWN1,t,1); ctx.fillRect(0,HORIZON,W,1300-HORIZON);
  ctx.fillStyle='#4A4E5A'; ctx.fillRect(0,1300,W,124); ctx.fillStyle='#F4F0E6'; for(let k=-1;k<8;k++){ const x=((k*180-SCX[i])%1440+1440)%1440-100; ctx.fillRect(x,1358,90,8); }
  ctx.fillStyle='#B8BCD9'; ctx.fillRect(0,1424,W,26); ctx.fillStyle='#D8D4CC'; ctx.fillRect(0,1450,W,70); ctx.fillStyle='#C9C4BA'; for(let k=-1;k<10;k++){ const x=((k*140-SCX[i])%1400+1400)%1400-100; ctx.fillRect(x,1450,3,70); }
  const g=ctx.createLinearGradient(0,1520,0,H); g.addColorStop(0,keyed(LAWN1,t,1)); g.addColorStop(1,keyed(LAWN2,t,1)); ctx.fillStyle=g; ctx.fillRect(0,1520,W,H-1520);
  for(let k=-1;k<3;k++){ const x=((k*900+300-SCX[i])%1800+1800)%1800-200; hydrant(x,1560,0.8); } }
function hydrant(x,by,sc){ ctx.save(); ctx.translate(x,by); ctx.scale(sc,sc); ctx.fillStyle='#B32219'; rrect(-22,-90,44,90,8); ctx.fill(); rrect(-30,-100,60,16,6); ctx.fill(); dots([[0,-108,14]],'#B32219'); ctx.fillStyle='#8E1A12'; ctx.fillRect(-36,-62,72,14); dots([[-36,-55,9],[36,-55,9]],'#8E1A12'); ctx.restore(); }
function tree(i,t){ const x=TREE_WX-SCX[i]; if(x<-300||x>W+300) return; ctx.fillStyle='#5A3A1E'; ctx.fillRect(x-22,760,44,540); ctx.fillRect(x-4,700,60,20); for(const [dx,dy,r] of [[0,720,120],[-90,790,90],[95,800,95],[-30,650,80],[60,660,70]]) dots([[x+dx,dy,r]],'#3E9B5F'); dots([[x+30,700,70],[x-60,720,60]],'#2E7D46'); }
function stationStart(i,t){ const ox=-SCX[i]; if(ox<-1400) return; ctx.fillStyle='#E4DCCC'; ctx.fillRect(ox-260,760,1200,540); ctx.fillStyle='#B32219'; ctx.fillRect(ox-260,748,1200,22); ctx.fillStyle='#4A4E5A'; ctx.fillRect(ox+820,600,40,160); dots([[ox+840,590,26]],'#E8C24E'); ctx.fillStyle='#F4F0E6'; rrect(ox+120,690,460,64,10); ctx.fill(); text('FEUERWACHE',ox+350,722,fontB(40),'#B32219');
  for(const bx of [ox-200,ox+160,ox+520]){ ctx.fillStyle='#8E1A12'; rrect(bx,800,300,500,14); ctx.fill(); ctx.fillStyle='#4A3320'; ctx.fillRect(bx+14,814,272,486); ctx.fillStyle='#B32219'; ctx.fillRect(bx+14,814,272,26); }
  }
function stationParty(i,t){ const ox=620+(SCX_END-SCX[i]); if(ox>W+600) return; ctx.save(); ctx.translate(ox-620,0); const glow=seg(t,15,18);
  ctx.fillStyle='#E4DCCC'; ctx.fillRect(620,760,700,540); ctx.fillStyle='#B32219'; ctx.fillRect(620,748,700,22); ctx.fillStyle='#F4F0E6'; rrect(700,690,420,64,10); ctx.fill(); text('PARTY-WACHE',910,722,fontB(38),'#B32219');
  ctx.fillStyle='#8E1A12'; rrect(700,800,300,500,14); ctx.fill(); ctx.fillStyle=mixHex('#4A3320','#FFE082',glow*0.8); ctx.fillRect(714,814,272,486);
  ctx.strokeStyle='#F4F0E6'; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(640,780); ctx.quadraticCurveTo(850,860,1060,780); ctx.stroke(); const cols=['#E8C24E','#B32219','#1F6FA8','#F4F0E6','#FF6F91']; for(let n=0;n<9;n++){ const u=(n+.5)/9, x=lerp(640,1060,u), y=(1-u)*(1-u)*780+2*(1-u)*u*860+u*u*780; ctx.fillStyle=cols[n%5]; ctx.beginPath(); ctx.moveTo(x-22,y); ctx.lineTo(x+22,y); ctx.lineTo(x,y+52); ctx.closePath(); ctx.fill(); }
  for(const [bx,by,c] of [[680,900,'#E8C24E'],[720,860,'#1F6FA8'],[1020,880,'#FF6F91'],[1060,920,'#7CE0C3']]){ const yy=by+8*Math.sin(t*2+bx); ctx.strokeStyle='rgba(255,255,255,.7)'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(bx,yy+40); ctx.lineTo(bx+4,yy+120); ctx.stroke(); ctx.fillStyle=c; ctx.beginPath(); ctx.ellipse(bx,yy,34,42,0,0,6.29); ctx.fill(); }
  bruno(t); cakeTable(t);
  ctx.restore(); }

/* ---------- Torte: erst „Brand" auf der Strasse, spaeter auf dem Party-Tisch ---------- */
function cakeBase(cx,by,sc){ ctx.save(); ctx.translate(cx,by); ctx.scale(sc,sc); for(const [w,h,c] of [[260,90,'#FF8FAB'],[200,80,'#FFFFFF'],[150,70,'#FF8FAB']]){ rrect(-w/2,-h,w,h,16); ctx.fillStyle=c; ctx.fill(); ctx.fillStyle='#FFD54F'; for(let x=-w/2+18;x<w/2-10;x+=34) dots([[x,-h+10,7]],'#FFD54F'); ctx.translate(0,-h); } ctx.restore(); }
function fireCake(i,t){ const gone=seg(t,13.3,13.8); if(gone>=1) return; ctx.save(); ctx.globalAlpha=1-gone; fireCakeDraw(i,t); ctx.restore(); }   /* die Torte wird „eingeladen" und ist beim Weiterfahren weg */
function fireCakeDraw(i,t){ const x=CAKE_WX-SCX[i]; if(x<-300||x>W+300) return; cakeBase(x,ROAD_Y,1.0); const top=ROAD_Y-240; const fire=Math.min(1,seg(t,9.4,9.8))*(1-seg(t,12.4,12.9)); const flick=0.85+0.3*Math.sin(t*40);
  for(let k=0;k<6;k++){ const cx=x-70+k*28; ctx.fillStyle=(k%2)?'#1F6FA8':'#F4F0E6'; ctx.fillRect(cx-5,top-34,10,34); if(fire>0){ const L=(110+18*(k%3))*fire*flick; ctx.save(); ctx.globalCompositeOperation='lighter'; for(const [c,f,w] of [['#FF7A1A',1,16],['#FFB53A',.7,11],['#FFF1A8',.4,6]]){ ctx.fillStyle=c; ctx.beginPath(); ctx.moveTo(cx-w,top-34); ctx.quadraticCurveTo(cx-w,top-34-L*f*.6,cx,top-34-L*f); ctx.quadraticCurveTo(cx+w,top-34-L*f*.6,cx+w,top-34); ctx.closePath(); ctx.fill(); } ctx.restore(); } else if(t>=12.4&&t<13.6){ const u=seg(t,12.4,13.6); ctx.fillStyle=`rgba(230,230,240,${(0.5*(1-u)).toFixed(2)})`; dots([[cx+10*Math.sin(t*3+k),top-60-u*120,10+u*14]],ctx.fillStyle); } }
  if(fire>0){ const r=rng(Math.floor(t*8)); for(let n=0;n<7;n++){ const ph=((t*0.5+n*0.14)%1); ctx.fillStyle=`rgba(90,90,100,${(0.45*fire*(1-ph)).toFixed(2)})`; dots([[x-40+n*16+30*Math.sin(t*2+n),top-150-ph*260,20+ph*40]],ctx.fillStyle); } }
  if(t>=12.0&&t<13.4){ const s=seg(t,12.0,12.3)*(1-seg(t,13.1,13.4)); waterArc(truckPoint(226+70*Math.cos(monitorAngle(t)),-352+70*Math.sin(monitorAngle(t)),t,i),{x:x-10,y:top-80},s,true); } }
function waterArc(from,to,s,rainbow){ if(s<=0) return; ctx.save(); ctx.globalAlpha=s; const apexY=Math.min(from.y,to.y)-160; ctx.strokeStyle='rgba(120,190,240,0.85)'; ctx.lineWidth=18; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(from.x,from.y); ctx.quadraticCurveTo((from.x+to.x)/2,apexY,to.x,to.y); ctx.stroke(); ctx.strokeStyle='rgba(255,255,255,0.7)'; ctx.lineWidth=6; ctx.stroke();
  const r=rng(Math.floor(from.x)); for(let n=0;n<12;n++){ const u=r(); const mt=1-u; const px=mt*mt*from.x+2*mt*u*(from.x+to.x)/2+u*u*to.x, py=mt*mt*from.y+2*mt*u*apexY+u*u*to.y; dots([[px+(r()-.5)*40,py+(r()-.5)*40,4+r()*5]],'rgba(200,230,255,0.8)'); }
  if(rainbow){ ctx.globalAlpha=s*0.35; const cx=(from.x+to.x)/2, cy=apexY+120; for(const [c,rr] of [['#FF6F91',150],['#FFD54F',138],['#7CE0C3',126],['#64B5F6',114],['#CE93D8',102]]){ ctx.strokeStyle=c; ctx.lineWidth=12; ctx.beginPath(); ctx.arc(cx,cy,rr,Math.PI*1.1,Math.PI*1.9); ctx.stroke(); } }
  ctx.restore(); }
function cakeTable(t){ ctx.fillStyle='#8A5A2B'; ctx.fillRect(724,1210,16,120); ctx.fillRect(864,1210,16,120); ctx.fillStyle='#F4F0E6'; rrect(700,1190,204,30,8); ctx.fill(); cakeBase(802,1190,0.6);
  const age=$('age').value.trim().slice(0,2); if(age&&t>=18.3){ const u=easeOutBack(seg(t,18.3,19.0)); const y=lerp(1040,900,u); if(t<19.2){ const r=rng(Math.floor(t*10)); ctx.save(); ctx.globalCompositeOperation='lighter'; for(let n=0;n<10;n++) dots([[802+(r()-.5)*140,1046-r()*160,2+r()*3]],'rgba(255,240,180,0.95)'); ctx.restore(); } ctx.save(); ctx.globalAlpha=seg(t,18.3,18.6); text(age,802,y,fontB(150),'#FFE45C','center','#8E670D',18); ctx.restore(); } }

/* ---------- Loeschzug ---------- */
function monitorAngle(t){ if(t>=11.0&&t<11.6) return lerp(-0.3,-0.55,easeInOut(seg(t,11.0,11.6))); if(t>=11.6&&t<13.6) return -0.55; if(t>=13.6&&t<14.2) return lerp(-0.55,-0.3,seg(t,13.6,14.2)); if(t>=19.0&&t<19.4) return lerp(-0.3,-0.85,seg(t,19.0,19.4)); if(t>=19.4&&t<21) return -0.85; return -0.3; }
function ladderState(t){ let a=0, L=360; if(t>=7.4&&t<7.9){ const u=easeInOut(seg(t,7.4,7.9)); a=lerp(0,-0.95,u); L=lerp(360,640,u); } else if(t>=7.9&&t<8.5){ a=-0.95; L=640; } else if(t>=8.5&&t<9.1){ const u=easeInOut(seg(t,8.5,9.1)); a=lerp(-0.95,0,u); L=lerp(640,360,u); } else if(t>=14.0&&t<16.6){ const u=Math.min(seg(t,14.0,14.5),1-seg(t,16.2,16.6)); a=-0.5*u; L=lerp(360,520,u); } return {a,L}; }
const LAD_PIV={x:-40,y:-312};
function ladderPoint(u,t,i){ const {a,L}=ladderState(t); return truckPoint(LAD_PIV.x+L*u*Math.cos(a),LAD_PIV.y+L*u*Math.sin(a),t,i); }
function ladder(t){ const {a,L}=ladderState(t); ctx.save(); ctx.translate(LAD_PIV.x,LAD_PIV.y); ctx.rotate(a); ctx.fillStyle='#B8BCD9'; ctx.fillRect(0,-18,L,8); ctx.fillRect(0,10,L,8); ctx.fillStyle='#8E93B8'; for(let x=20;x<L-10;x+=38) ctx.fillRect(x,-14,6,28); ctx.fillStyle='#4A4E5A'; ctx.fillRect(L-44,-22,44,10); ctx.restore(); }
function truck(t,i){ const m=truckMatrix(t,i); ctx.save(); ctx.translate(m.x,m.y); ctx.rotate(m.r);
  ctx.fillStyle='#D9261C'; rrect(-310,-300,440,236,14); ctx.fill(); ctx.fillStyle='#8E1A12'; for(const dx of [-290,-160,-30]){ rrect(dx,-278,118,150,10); ctx.fill(); } ctx.fillStyle='#B8BCD9'; for(const dx of [-290,-160,-30]) ctx.fillRect(dx+90,-210,18,6);
  ctx.fillStyle='#FFFFFF'; ctx.fillRect(-310,-192,440,28); ctx.fillStyle='#FFD54F'; ctx.fillRect(-310,-118,440,12); ctx.fillStyle='#4A4E5A'; ctx.fillRect(-316,-312,452,14);
  ctx.fillStyle='#D9261C'; rrect(120,-336,212,272,16); ctx.fill(); ctx.fillStyle='#FFFFFF'; ctx.fillRect(120,-192,212,28); ctx.fillStyle='#FFD54F'; ctx.fillRect(120,-118,212,12);
  ctx.fillStyle='#16294A'; rrect(140,-312,132,104,12); ctx.fill(); ctx.save(); rrect(146,-306,120,92,10); ctx.clip(); ctx.fillStyle='#A7C7D9'; ctx.fillRect(146,-306,120,92); drawPhotoInRect(146,-306,120,92,zoomVal()); ctx.fillStyle='rgba(255,255,255,0.18)'; ctx.fillRect(146,-306,26,92); ctx.restore();
  ctx.fillStyle='#A7C7D9'; rrect(284,-312,40,96,8); ctx.fill(); ctx.fillStyle='#4A4E5A'; ctx.fillRect(278,-336,4,272); ctx.fillRect(330,-300,12,30); ctx.fillStyle='#B8BCD9'; ctx.fillRect(236,-190,26,6); rrect(110,-92,232,24,6); ctx.fill(); dots([[326,-130,12]],'#FFE082');
  const on=(Math.floor(t*6)%2)===0, drive=speed(t)>50||(t>=2.2&&t<3)||t>=16.5; for(const [lx,k] of [[162,0],[290,1]]){ const lit=drive&&(on===(k===0)); ctx.fillStyle=lit?'#64B5F6':'#1F6FA8'; rrect(lx-22,-354,44,22,7); ctx.fill(); if(lit){ ctx.save(); ctx.globalCompositeOperation='lighter'; const g=ctx.createRadialGradient(lx,-343,0,lx,-343,70); g.addColorStop(0,'rgba(100,181,246,0.7)'); g.addColorStop(1,'rgba(100,181,246,0)'); ctx.fillStyle=g; ctx.fillRect(lx-70,-413,140,140); ctx.restore(); } }
  const ma=monitorAngle(t); ctx.save(); ctx.translate(226,-352); ctx.fillStyle='#4A4E5A'; rrect(-16,-14,32,20,6); ctx.fill(); ctx.rotate(ma); ctx.fillStyle='#6E7380'; rrect(0,-8,70,16,6); ctx.fill(); ctx.fillStyle='#B8BCD9'; ctx.fillRect(64,-10,12,20); ctx.restore();
  ladder(t);
  const wa=SCX[i]/58; for(const wx of [-190,230]){ dots([[wx,-58,58]],'#1F1B14'); dots([[wx,-58,34]],'#B8BCD9'); ctx.save(); ctx.translate(wx,-58); ctx.rotate(wa); ctx.strokeStyle='#6E7380'; ctx.lineWidth=6; for(let k=0;k<5;k++){ ctx.rotate(Math.PI*2/5); ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(0,-30); ctx.stroke(); } ctx.restore(); dots([[wx,-58,8]],'#4A4E5A'); }
  ctx.restore();
  /* Abgaswoelkchen beim Anfahren */ if(speed(t)>50&&speed(t)<600){ const r=rng(Math.floor(t*10)); for(let n=0;n<4;n++){ const p=truckPoint(-330-r()*80,-60-r()*40,t,i); ctx.fillStyle=`rgba(200,200,210,${(0.35-n*0.07).toFixed(2)})`; dots([[p.x,p.y,12+r()*14]],ctx.fillStyle); } } }

/* ---------- Fleck, Mikesch, Bruno, Helm ---------- */
function dogDraw(x,y,dir,sit,tt){ ctx.save(); ctx.translate(x,y); ctx.scale(dir,1); ctx.fillStyle='#FFFFFF'; ctx.beginPath(); ctx.ellipse(0,-30,44,26,0,0,6.29); ctx.fill(); dots([[-14,-34,8],[12,-22,7],[26,-38,6]],'#1F1B14'); dots([[40,-56,22]],'#FFFFFF'); ctx.fillStyle='#1F1B14'; ctx.beginPath(); ctx.ellipse(28,-72,9,16,0.3,0,6.29); ctx.fill(); dots([[48,-60,3.5]],'#111'); dots([[60,-50,6]],'#1F1B14'); ctx.fillStyle='#B32219'; ctx.fillRect(24,-46,30,7); ctx.strokeStyle='#FFFFFF'; ctx.lineWidth=8; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(-42,-36); ctx.lineTo(-64,-64+8*Math.sin(tt*12)); ctx.stroke(); ctx.fillStyle='#FFFFFF'; for(const lx of [-26,-8,10,28]) ctx.fillRect(lx,-12,10,sit?12:18); ctx.restore(); }
function dogPos(t,i){ if(t<7.9) return {p:truckPoint(-230,-312,t,i),dir:1}; if(t<8.3){ const u=easeInOut(seg(t,7.9,8.3)); return {p:ladderPoint(lerp(0.05,0.92,u),t,i),dir:1}; } if(t<8.5) return {p:ladderPoint(0.92,t,i),dir:1}; if(t<9.1){ const u=easeInOut(seg(t,8.5,9.1)); return {p:ladderPoint(lerp(0.92,0.05,u),t,i),dir:1}; } if(t<14.0) return {p:truckPoint(-230,-312,t,i),dir:1}; if(t<14.5){ const u=easeInOut(seg(t,14.0,14.5)); return {p:ladderPoint(lerp(0.05,0.9,u),t,i),dir:1}; } if(t<16.2) return {p:ladderPoint(0.9,t,i),dir:1}; if(t<16.6){ const u=easeInOut(seg(t,16.2,16.6)); return {p:ladderPoint(lerp(0.9,0.05,u),t,i),dir:1}; } return {p:truckPoint(-230,-312,t,i),dir:1}; }
function catDraw(x,y,dir){ ctx.save(); ctx.translate(x,y); ctx.scale(dir,1); ctx.fillStyle='#E08A3C'; ctx.beginPath(); ctx.ellipse(0,-22,32,20,0,0,6.29); ctx.fill(); ctx.fillStyle='#B8652A'; ctx.fillRect(-14,-40,6,22); ctx.fillRect(2,-42,6,24); dots([[30,-40,17]],'#E08A3C'); ctx.fillStyle='#E08A3C'; ctx.beginPath(); ctx.moveTo(18,-52); ctx.lineTo(22,-70); ctx.lineTo(30,-54); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.moveTo(34,-54); ctx.lineTo(42,-70); ctx.lineTo(44,-52); ctx.closePath(); ctx.fill(); dots([[26,-42,3],[36,-42,3]],'#111'); dots([[32,-35,2.5]],'#FF6F91'); ctx.strokeStyle='#E08A3C'; ctx.lineWidth=7; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(-30,-26); ctx.quadraticCurveTo(-56,-40,-50,-66); ctx.stroke(); ctx.fillStyle='#E08A3C'; for(const lx of [-20,-6,8,20]) ctx.fillRect(lx,-6,8,10); ctx.restore(); }
function catPos(t,i){ if(t<8.3) return {x:TREE_WX-SCX[i]+70,y:660,dir:-1}; if(t<8.45){ const a=catPos(8.29,i), b=ladderPoint(0.98,8.45,i); const u=seg(t,8.3,8.45); return {x:lerp(a.x,b.x,u),y:lerp(a.y,b.y-30,u)-60*Math.sin(Math.PI*u),dir:-1}; } if(t<9.1){ const p=ladderPoint(0.98,t,i); return {x:p.x,y:p.y-30,dir:-1}; } const p=truckPoint(60,-318,t,i); return {x:p.x,y:p.y,dir:1}; }
const BRU_X=1000, HELM_HOME={x:BRU_X,y:ROAD_Y-352};
function bruno(t){ const x=BRU_X, by=ROAD_Y; const wave=t>=17.8?Math.sin(t*6)*0.5:0; const name=nameVal(); const up=t>=19.8&&t<21.9;
  ctx.fillStyle='#1F1B14'; rrect(x-32,by-130,28,130,8); ctx.fill(); rrect(x+4,by-130,28,130,8); ctx.fill(); ctx.fillStyle='#111'; rrect(x-38,by-24,38,24,6); ctx.fill(); rrect(x,by-24,38,24,6); ctx.fill();
  ctx.fillStyle='#B32219'; rrect(x-48,by-268,96,146,14); ctx.fill(); ctx.fillStyle='#FFD54F'; ctx.fillRect(x-48,by-200,96,12); ctx.fillRect(x-48,by-160,96,12); ctx.fillStyle='#E8C24E'; dots([[x,by-236,7],[x,by-214,7]],'#E8C24E');
  ctx.strokeStyle='#B32219'; ctx.lineWidth=24; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(x+38,by-250); ctx.lineTo(x+32,by-330); ctx.stroke(); dots([[x+32,by-334,14]],'#F6C9A4');
  ctx.save(); ctx.translate(x-38,by-250); ctx.rotate(up?-2.6:-1.2+wave); ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(0,-80); ctx.stroke(); dots([[0,-88,14]],'#F6C9A4'); ctx.restore();
  ctx.fillStyle='#8A5A2B'; ctx.fillRect(x+24,by-470,16,140); ctx.fillStyle='#F4F0E6'; rrect(x-200,by-530,280,100,14); ctx.fill(); ctx.strokeStyle='#B32219'; ctx.lineWidth=6; rrect(x-200,by-530,280,100,14); ctx.stroke();
  text('Willkommen,',x-60,by-504,fontB(32,700),'#16294A'); text(name+'!',x-60,by-460,fitFont(name+'!',250,44,24),'#B32219');
  dots([[x,by-302,36]],'#F6C9A4'); dots([[x-12,by-310,4],[x+12,by-310,4]],'#111'); ctx.fillStyle='#4A3320'; rrect(x-22,by-296,44,10,5); ctx.fill(); ctx.strokeStyle='#8a3a30'; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(x,by-284,10,0.2*Math.PI,0.8*Math.PI); ctx.stroke(); }
function helmet(x,y,rot){ ctx.save(); ctx.translate(x,y); ctx.rotate(rot); ctx.fillStyle='#B32219'; ctx.beginPath(); ctx.arc(0,0,40,Math.PI,2*Math.PI); ctx.fill(); ctx.fillStyle='#8E1A12'; ctx.fillRect(-48,-4,96,10); ctx.fillStyle='#E8C24E'; ctx.fillRect(-6,-40,12,36); ctx.fillStyle='#B8BCD9'; ctx.fillRect(-52,4,104,6); ctx.restore(); }
function helmetPos(t,i){ if(t<19.85) return {x:HELM_HOME.x,y:HELM_HOME.y+14,rot:0}; const d=dogPos(t,i).p; const target={x:d.x+40,y:d.y-80}; if(t<21.2){ const u=seg(t,19.85,21.2); return {x:lerp(HELM_HOME.x,target.x,u),y:lerp(HELM_HOME.y,target.y,u)-380*Math.sin(Math.PI*u),rot:u*Math.PI*3}; } const b=seg(t,21.2,21.6); return {x:target.x,y:target.y-14*Math.sin(b*Math.PI)*(1-b),rot:0.25}; }

/* ---------- Effekte ---------- */
function confettiMonitor(t,i){ if(t<19.4) return; const ma=monitorAngle(19.4); const m=truckPoint(226+76*Math.cos(ma),-352+76*Math.sin(ma),19.4,i); for(const c of CONF){ const tt=t-19.4; if(tt<0||tt>2.8) continue; const x=m.x+Math.cos(c.a)*c.v*tt, y=m.y+Math.sin(c.a)*c.v*tt+0.5*1300*tt*tt; if(y>H+40) continue; ctx.save(); ctx.globalAlpha=1-seg(tt,2.1,2.8); ctx.translate(x,y); ctx.rotate(c.rot+c.spin*tt); ctx.fillStyle=c.c; ctx.fillRect(-c.w/2,-c.h/2,c.w,c.h); ctx.restore(); } }
function speedLines(t){ if(t<14.2||t>16.6) return; const a=Math.min(seg(t,14.2,14.6),1-seg(t,16.2,16.6)); const r=rng(Math.floor(t*30)); ctx.save(); ctx.globalAlpha=0.5*a; ctx.strokeStyle='#FFFFFF'; ctx.lineWidth=4; for(let n=0;n<10;n++){ const y=400+r()*700, x=r()*W, L=80+r()*160; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x-L,y); ctx.stroke(); } ctx.restore(); }
function waterGate(i,t){ if(t<16.3||t>18.4) return; const s=Math.min(seg(t,16.3,16.8),1-seg(t,17.9,18.4)); const ox=SCX_END-SCX[i]; const a={x:380+ox,y:1250}, b={x:720+ox,y:1250}; hydrant(a.x,1300,1.0); hydrant(b.x,1300,1.0); waterArc({x:a.x,y:1200},{x:(a.x+b.x)/2,y:700},s,false); waterArc({x:b.x,y:1200},{x:(a.x+b.x)/2,y:700},s,false); }

/* ---------- Texte + Einsatzbefehl-Karte ---------- */
function texts(t,i){ const name=nameVal();
  if(t<3){ text('Alarm! Die Party-Feuerwehr macht sich bereit …',W/2,H*.14,fitFont('Alarm! Die Party-Feuerwehr macht sich bereit …',W-100,56,40,700),'#F4F0E6','center','#16294A',9); }
  popIn(t,3.0,4.8,W/2,H*.22,()=>text('TATÜTATA!',0,0,fontB(190),'#FFFFFF','center','#B32219',26));
  if(t>=6.3&&t<9.4){ const u=easeOut(seg(t,6.3,6.9)); const lines=wrap(`${name} rast zur Feuerwehr-Party!`,W-160,fontB(112)); ctx.save(); ctx.globalAlpha=u*(1-seg(t,8.9,9.4)); ctx.translate(lerp(-300,0,u),0); lines.forEach((ln,k)=>text(ln,W/2,H*.12+k*122,fontB(112),'#FFFFFF','center','#16294A',24)); ctx.restore(); }
  if(t>=9.9&&t<11.4){ ctx.save(); ctx.globalAlpha=Math.min(seg(t,9.9,10.2),1-seg(t,11.0,11.4)); text('Achtung, Feuer!',W/2,H*.13,fontB(110),'#FFE45C','center','#B32219',22); ctx.restore(); }
  popIn(t,11.8,12.8,W/2,H*.25,()=>text('WASSER MARSCH!',0,0,fitFont('WASSER MARSCH!',W-120,170,90),'#64B5F6','center','#16294A',26));
  popIn(t,14.3,16.2,W/2,H*.78,()=>text('Mit Blaulicht voraus!',0,0,fitFont('Mit Blaulicht voraus!',W-120,120,70),'#FFFFFF','center','#16294A',26));
  const d=dogPos(t,i).p; if(t>=7.0&&t<8.2) bubble(d.x-40,d.y-330,470,110,'Wuff! Da miaut jemand!',Math.min(seg(t,7.0,7.3),1-seg(t,7.9,8.2)),'#16294A','#B32219');
  if(t>=13.2&&t<14.0) bubble(d.x-40,d.y-330,380,110,'Gerettet!',Math.min(seg(t,13.2,13.5),1-seg(t,13.7,14.0)),'#16294A','#B32219');
  const c=catPos(t,i); if(t>=8.55&&t<9.4) bubble(c.x-40,c.y-300,380,110,'Miau, danke!',Math.min(seg(t,8.55,8.85),1-seg(t,9.1,9.4)),'#16294A','#E08A3C');
  if(t>=19.8&&t<20.5) bubble(600,640,380,110,'Hoppla!',Math.min(seg(t,19.8,20.0),1-seg(t,20.3,20.5)),'#B32219','#E8C24E',true);
  if(t>=20.5){ const u=easeOutBack(seg(t,20.5,21.2)); const cardW=W-140, cardH=520, x=70, y=lerp(-620,40,u); ctx.save(); ctx.shadowColor='rgba(0,0,0,.4)'; ctx.shadowBlur=36; ctx.shadowOffsetY=14; ctx.fillStyle='#F4F0E6'; rrect(x,y,cardW,cardH,26); ctx.fill(); ctx.restore();
    ctx.save(); rrect(x,y,cardW,cardH,26); ctx.clip(); for(let k=-2;k<26;k++){ ctx.fillStyle=(k%2)?'#B32219':'#F4F0E6'; ctx.beginPath(); ctx.moveTo(x+k*40,y); ctx.lineTo(x+k*40+40,y); ctx.lineTo(x+k*40+18,y+22); ctx.lineTo(x+k*40-22,y+22); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.moveTo(x+k*40,y+cardH); ctx.lineTo(x+k*40+40,y+cardH); ctx.lineTo(x+k*40+18,y+cardH-22); ctx.lineTo(x+k*40-22,y+cardH-22); ctx.closePath(); ctx.fill(); } ctx.restore(); ctx.strokeStyle='#16294A'; ctx.lineWidth=4; rrect(x+10,y+30,cardW-20,cardH-60,18); ctx.stroke();
    text(`🚒 ${possName(name)} Feuerwehr-Party`,W/2,y+112,fitFont(`🚒 ${possName(name)} Feuerwehr-Party`,cardW-100,74,44),'#B32219'); text(`📅 ${$('date').value}  ·  ${$('time').value}`,W/2,y+215,fontD(54),'#1F1B14'); const pl=wrap(`📍 ${$('place').value}`,cardW-120,fontD(54)); pl.forEach((ln,k)=>text(ln,W/2,y+296+k*62,fontD(54),'#1F1B14'));
    const pulse=1+.04*Math.sin(t*6); ctx.save(); ctx.translate(W/2,y+440); ctx.scale(pulse,pulse); text('Kommst du mit? 🚒',0,0,fontB(82),'#16294A'); ctx.restore(); }
  ctx.globalAlpha=.6; text('machsleicht.de',W/2,H-42,fontD(38,600),'#FFFFFF'); ctx.globalAlpha=1; }

function shakeAmp(t){ let a=0; if(t>=7.0&&t<7.5) a=5*Math.sin(seg(t,7.0,7.5)*Math.PI); if(t>=10.4&&t<10.9) a=Math.max(a,5*Math.sin(seg(t,10.4,10.9)*Math.PI)); if(t>=12.0&&t<12.4) a=Math.max(a,4*(1-seg(t,12.0,12.4))); if(t>=19.4&&t<19.7) a=Math.max(a,6*(1-seg(t,19.4,19.7))); return a; }

/* ---------- Frame ---------- */
function drawFrame(i){ i=clamp(i,0,P_N-1); const t=i/FPS; const a=shakeAmp(t);
  sky(t); sun(t); clouds(i);
  ctx.save(); if(a>0){ ctx.translate(SHAKE[i][0]*a,SHAKE[i][1]*a); }
  skyline(i,t); houses(i,t); stationStart(i,t); stationParty(i,t); tree(i,t); ground(i,t);
  fireCake(i,t); waterGate(i,t);   /* Wasserbogen HINTER dem Zug — das Gesicht bleibt frei */
  truck(t,i);
  const dp=dogPos(t,i); dogDraw(dp.p.x,dp.p.y,dp.dir,true,t); const cp=catPos(t,i); if(t>=6.0) catDraw(cp.x,cp.y,cp.dir);
  if(t>=16.2){ const hp=helmetPos(t,i); helmet(hp.x,hp.y,hp.rot); }
  speedLines(t); confettiMonitor(t,i);
  ctx.restore();
  texts(t,i); }

/* ---------- Ton ---------- */
function audio(ac,master,S){ const {tone,noise,bell,bed,env}=S;
  const brass=(t0,f,dur,peak=0.2)=>{ const o=ac.createOscillator(); o.type='sawtooth'; o.frequency.value=f; const fl=ac.createBiquadFilter(); fl.type='lowpass'; fl.frequency.setValueAtTime(600,t0); fl.frequency.linearRampToValueAtTime(2400,t0+0.08); fl.frequency.linearRampToValueAtTime(1200,t0+dur); const g=ac.createGain(); env(g,t0,0.03,peak,Math.max(0.01,dur-0.13),0.1); o.connect(fl).connect(g).connect(master); o.start(t0); o.stop(t0+dur+0.2); };
  const bark=(t0)=>{ tone(t0,420,240,0.1,'square',0.09,0.005,0.06); noise(t0,0.08,'bandpass',900,900,0.12,0.003,0.06); tone(t0+0.16,400,230,0.1,'square',0.08,0.005,0.06); };
  const meow=(t0)=>{ tone(t0,650,950,0.25,'sine',0.12,0.02,0.1); tone(t0+0.25,950,600,0.3,'sine',0.11,0.01,0.2); };
  const siren=(t0,t1,peak)=>{ const o=ac.createOscillator(); o.type='square'; const fl=ac.createBiquadFilter(); fl.type='lowpass'; fl.frequency.value=1500; const g=ac.createGain(); g.gain.setValueAtTime(0.0001,t0); g.gain.linearRampToValueAtTime(peak,t0+0.2); g.gain.setValueAtTime(peak,t1-0.4); g.gain.linearRampToValueAtTime(0.0001,t1); for(let t=t0,k=0;t<t1;t+=0.45,k++) o.frequency.setValueAtTime(k%2?435:580,t); o.connect(fl).connect(g).connect(master); o.start(t0); o.stop(t1+0.1); };
  /* Countdown: drei Hupstoesse, Fleck bellt, Motor */ [0.6,1.3,2.0].forEach(t=>brass(t,392,0.3,0.24)); bark(1.6); bark(2.4);
  { const o=ac.createOscillator(); o.type='sawtooth'; const fl=ac.createBiquadFilter(); fl.type='lowpass'; fl.frequency.value=300; const g=ac.createGain(); const F_=o.frequency; F_.setValueAtTime(55,2.6); F_.linearRampToValueAtTime(60,3.0); F_.linearRampToValueAtTime(110,4.0); F_.setValueAtTime(110,7.0); F_.linearRampToValueAtTime(58,7.4); F_.setValueAtTime(58,9.0); F_.linearRampToValueAtTime(110,9.6); F_.setValueAtTime(110,10.4); F_.linearRampToValueAtTime(58,10.8); F_.setValueAtTime(58,13.8); F_.linearRampToValueAtTime(135,14.6); F_.setValueAtTime(135,16.5); F_.linearRampToValueAtTime(58,17.8); const G=g.gain; G.setValueAtTime(0.0001,2.6); G.linearRampToValueAtTime(0.06,3.0); G.setValueAtTime(0.06,17.6); G.linearRampToValueAtTime(0.0001,18.4); o.connect(fl).connect(g).connect(master); o.start(2.6); o.stop(18.5); }
  siren(3.0,6.6,0.11); siren(14.0,16.9,0.08);
  tone(7.0,2400,1900,0.4,'sine',0.07,0.02,0.2); tone(10.4,2400,1900,0.4,'sine',0.07,0.02,0.2); tone(17.3,2200,1800,0.4,'sine',0.06,0.02,0.2);   /* Bremsen */
  meow(6.8); meow(8.6); bark(7.0); bark(13.2); bark(19.6);
  noise(7.4,0.5,'bandpass',400,400,0.18,0.05,0.3,1.5); noise(8.5,0.6,'bandpass',400,400,0.18,0.05,0.3,1.5); noise(14.0,0.5,'bandpass',400,400,0.14,0.05,0.3,1.5);   /* Hydraulik */
  bed('lowpass',200,0.8,[[9.4,0],[10.2,0.12],[12.4,0.12],[13.0,0]],4,0.05); { const r=S.rng(17); for(let k=0;k<22;k++) noise(9.6+r()*3.0,0.03,'highpass',3000,3000,0.12,0.002,0.03); }   /* Feuer */
  noise(12.0,1.4,'bandpass',1400,900,0.3,0.1,0.3,0.7); noise(12.6,0.8,'highpass',4000,4000,0.22,0.05,0.5);                    /* Wasser + Dampf */
  bed('bandpass',900,0.6,[[13.9,0],[14.6,0.2],[16.4,0.2],[17.4,0]],0.8,0.06);                                                 /* Wind */
  bed('bandpass',1200,0.7,[[16.3,0],[16.8,0.2],[17.8,0.2],[18.4,0]],0.5,0.04);                                                 /* Wasserbogen */
  noise(18.3,0.8,'highpass',5000,5000,0.1,0.1,0.4); { const r=S.rng(9); for(let k=0;k<8;k++){ const f=2400+r()*1800; tone(18.5+r()*0.6,f,f,0.12,'sine',0.06,0.005,0.1); } }   /* Wunderkerze + Gold */
  [[19.2,392],[19.4,494],[19.6,587]].forEach(([t,f])=>brass(t,f,0.28,0.2)); brass(19.85,784,0.8,0.18);
  tone(19.4,70,30,0.4,'sine',0.35,0.003,0.3); noise(19.4,0.3,'lowpass',300,300,0.35,0.003,0.2); { const r=S.rng(13); for(let k=0;k<12;k++){ const f=1800+r()*2200; tone(19.5+r()*2.0,f,f,0.12,'sine',0.05,0.005,0.1); } }
  tone(21.25,240,160,0.12,'sine',0.2,0.005,0.08); bell(20.7,1046,0.22);
  for(const f of [392,494,587]) for(const d of [-5,5]){ const o=ac.createOscillator(); o.type='sawtooth'; o.frequency.value=f+d; const fl=ac.createBiquadFilter(); fl.type='lowpass'; fl.frequency.value=1200; const g=ac.createGain(); env(g,20.0,0.8,0.018,2.6,0.6); o.connect(fl).connect(g).connect(master); o.start(20.0); o.stop(24); } }

startTrailer({ id:'feuerwehr', title:'Feuerwehr-Trailer', DUR:P_DUR, drawFrame, audio, photoDefault:IDA_URI, restFrameAt:8.9 });
