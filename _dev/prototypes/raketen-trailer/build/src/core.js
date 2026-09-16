/* ============================================================
   trailer-core — der Motor. Ein Motor, N Drehbuecher (wie die Paket-Maschine).
   Traegt: Konstanten, Zeichen- und Easing-Helfer, Foto-Logik, Vorschau-Loop,
   Ton-Engine (OfflineAudioContext + Synth-Helfer), Testprotokoll, MP4-Export
   (WebCodecs + mp4-muxer, Video + AAC). Das Drehbuch (MOTTO) liefert DUR,
   drawFrame(i) und audio(ac, master, synth) und ruft startTrailer(MOTTO).
   ============================================================ */
const W=1080, H=1920, FPS=30;
let DUR=22, N=DUR*FPS;
const cv=document.getElementById('cv'); cv.width=W; cv.height=H;
const ctx=cv.getContext('2d');
const $=id=>document.getElementById(id);
const REDUCED=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- deterministischer Zufall + Easing ---------- */
function rng(seed){ let a=seed>>>0; return ()=>{ a=(a+0x6D2B79F5)>>>0; let t=a; t=Math.imul(t^(t>>>15),t|1); t^=t+Math.imul(t^(t>>>7),t|61); return ((t^(t>>>14))>>>0)/4294967296; }; }
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const lerp=(a,b,t)=>a+(b-a)*t;
const easeInOut=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
const easeOut=t=>1-Math.pow(1-t,3);
const easeIn=t=>t*t*t;
const easeOutBack=t=>{const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2);};
const seg=(t,a,b)=>clamp((t-a)/(b-a),0,1);
const F=t=>Math.floor(t*FPS);
function hexA(h,a){ const n=parseInt(h.slice(1),16); return `rgba(${n>>16&255},${n>>8&255},${n&255},${a.toFixed(3)})`; }
function mixHex(a,b,t){ const A=parseInt(a.slice(1),16), B=parseInt(b.slice(1),16); const c=k=>Math.round(lerp((A>>k)&255,(B>>k)&255,t)); return `rgb(${c(16)},${c(8)},${c(0)})`; }

/* ---------- Zeichenhelfer ---------- */
function rrect(x,y,w,h,r){ ctx.beginPath(); ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r); ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath(); }
function text(str,x,y,font,color,align='center',stroke=null,sw=0){ ctx.font=font; ctx.textAlign=align; ctx.textBaseline='middle'; if(stroke){ ctx.lineJoin='round'; ctx.lineWidth=sw; ctx.strokeStyle=stroke; ctx.strokeText(str,x,y);} ctx.fillStyle=color; ctx.fillText(str,x,y); }
function wrap(str,maxW,font){ ctx.font=font; const words=str.split(' '), lines=[]; let cur=''; for(const w of words){ const test=cur?cur+' '+w:w; if(ctx.measureText(test).width>maxW&&cur){lines.push(cur);cur=w;} else cur=test; } if(cur) lines.push(cur); return lines; }
function dots(list,color){ ctx.fillStyle=color; for(const [x,y,r] of list){ ctx.beginPath(); ctx.arc(x,y,r,0,6.29); ctx.fill(); } }
function fontB(size,w=800){ return `${w} ${size}px "Baloo 2", sans-serif`; }
function fontD(size,w=700){ return `${w} ${size}px "DM Sans", sans-serif`; }
function fitFont(str,maxW,size,min,w=800){ for(let s=size;s>=min;s-=2){ const f=fontB(s,w); ctx.font=f; if(ctx.measureText(str).width<=maxW) return f; } return fontB(min,w); }
function popIn(t,a,b,x,y,drawFn){ if(t<a||t>=b) return; const u=seg(t,a,a+.3); const sc=lerp(1.5,1,easeOut(u)); ctx.save(); ctx.translate(x,y); ctx.scale(sc,sc); ctx.globalAlpha=lerp(0,1,u)*(1-seg(t,b-.4,b)); drawFn(); ctx.restore(); }
/* Sprechblase mit Schwanz nach unten links */
function bubble(bx,by,bw,bh,str,alpha,color='#2A2013',border=null,tailRight=false){ ctx.save(); ctx.globalAlpha=alpha; ctx.fillStyle='#FFFFFF'; rrect(bx,by,bw,bh,30); ctx.fill(); if(border){ ctx.strokeStyle=border; ctx.lineWidth=5; ctx.stroke(); }
  const t1=tailRight?bx+bw-40:bx+40, t2=tailRight?bx+bw-10:bx+10, t3=tailRight?bx+bw-90:bx+90;
  ctx.beginPath(); ctx.moveTo(t1,by+bh-2); ctx.lineTo(t2,by+bh+46); ctx.lineTo(t3,by+bh-2); ctx.closePath(); ctx.fill(); if(border){ ctx.strokeStyle=border; ctx.lineWidth=5; ctx.lineJoin='round'; ctx.beginPath(); ctx.moveTo(t1,by+bh); ctx.lineTo(t2,by+bh+46); ctx.lineTo(t3,by+bh); ctx.stroke(); } text(str,bx+bw/2,by+bh/2+2,fitFont(str,bw-40,46,28),color); ctx.restore(); }

/* ---------- Foto (Standard: eingebettetes Demo-Kind, optional ?photo=, Datei-Input) ---------- */
let photo=null, pauseAt=0;
function demoPhoto(){ const c=document.createElement('canvas'); c.width=c.height=480; const g=c.getContext('2d');
  const bg=g.createLinearGradient(0,0,0,480); bg.addColorStop(0,'#8EC5FF'); bg.addColorStop(1,'#DDF3FF'); g.fillStyle=bg; g.fillRect(0,0,480,480);
  g.fillStyle='#F6C9A4'; g.beginPath(); g.arc(240,270,150,0,6.29); g.fill();
  g.fillStyle='#5C3A1E'; g.beginPath(); g.arc(240,190,152,Math.PI,0); g.fill(); g.fillRect(88,190,304,50);
  g.fillStyle='#F6C9A4'; g.fillRect(100,225,280,40);
  g.fillStyle='#2b1d12'; g.beginPath(); g.arc(185,270,16,0,6.29); g.fill(); g.beginPath(); g.arc(295,270,16,0,6.29); g.fill();
  g.strokeStyle='#b5453c'; g.lineWidth=12; g.lineCap='round'; g.beginPath(); g.arc(240,300,70,0.25*Math.PI,0.75*Math.PI); g.stroke();
  const img=new Image(); img.src=c.toDataURL(); return img; }
photo=demoPhoto();
function drawPhotoInCircle(cx,cy,r,zoom){ if(photo&&photo.complete&&photo.naturalWidth){ const d=2*r*zoom, sc=Math.max(d/photo.naturalWidth,d/photo.naturalHeight), dw=photo.naturalWidth*sc, dh=photo.naturalHeight*sc; ctx.drawImage(photo,cx-dw/2,cy-dh/2,dw,dh); } }
function initPhoto(defaultDataUri){
  if(defaultDataUri&&defaultDataUri.startsWith('data:')){ const img=new Image(); img.onload=()=>{photo=img; redraw();}; img.src=defaultDataUri; }
  const pp=new URLSearchParams(location.search).get('photo'); if(pp&&/^[a-z0-9_.-]+$/i.test(pp)){ const img=new Image(); img.onload=()=>{photo=img; redraw();}; img.src=pp; }
  $('photo').addEventListener('change',e=>{ const f=e.target.files[0]; if(!f) return; const url=URL.createObjectURL(f); const img=new Image(); img.onload=()=>{photo=img; redraw();}; img.src=url; });
  $('zoom').addEventListener('input',e=>{$('zoomv').textContent=Number(e.target.value).toFixed(2).replace('.',',');}); }
const zoomVal=()=>Number($('zoom').value);
const nameVal=()=>$('name').value.trim()||'Dein Kind';
const possName=n=>/[sßxz]$/i.test(n)?n+"'":n+'s';

/* ---------- Ton-Engine ---------- */
let AUDIO_BUF=null, MOTTO=null;
async function renderAudio(){ const SR=48000; const ac=new OfflineAudioContext(2,SR*DUR,SR); const master=ac.createDynamicsCompressor(); master.threshold.value=-14; master.ratio.value=4; master.connect(ac.destination);
  const NOISE=ac.createBuffer(1,SR*2,SR); { const d=NOISE.getChannelData(0); let s=12345; for(let i=0;i<d.length;i++){ s=(s*1664525+1013904223)>>>0; d[i]=(s/4294967296)*2-1; } }
  const env=(g,t0,att,peak,hold,rel)=>{ g.gain.setValueAtTime(0.0001,t0); g.gain.linearRampToValueAtTime(peak,t0+att); g.gain.setValueAtTime(peak,t0+att+hold); g.gain.linearRampToValueAtTime(0.0001,t0+att+hold+rel); };
  const tone=(t0,f0,f1,dur,type,peak,att=0.01,rel=0.06)=>{ const o=ac.createOscillator(); o.type=type; o.frequency.setValueAtTime(f0,t0); if(f1!==f0) o.frequency.exponentialRampToValueAtTime(f1,t0+dur); const g=ac.createGain(); env(g,t0,att,peak,Math.max(0.001,dur-att-rel),rel); o.connect(g).connect(master); o.start(t0); o.stop(t0+dur+0.2); };
  const noise=(t0,dur,type,f0,f1,peak,att=0.02,rel=0.1,q=0.8)=>{ const src=ac.createBufferSource(); src.buffer=NOISE; src.loop=true; const f=ac.createBiquadFilter(); f.type=type; f.Q.value=q; f.frequency.setValueAtTime(f0,t0); if(f1!==f0) f.frequency.exponentialRampToValueAtTime(f1,t0+dur); const g=ac.createGain(); env(g,t0,att,peak,Math.max(0.001,dur-att-rel),rel); src.connect(f).connect(g).connect(master); src.start(t0); src.stop(t0+dur+0.3); };
  /* Glocke: zwei Teiltoene mit schnellem Abklingen */
  const bell=(t0,f,peak=0.3)=>{ for(const [m,p,d] of [[1,1,1.2],[2.76,0.35,0.5],[5.4,0.12,0.25]]){ const o=ac.createOscillator(); o.type='sine'; o.frequency.value=f*m; const g=ac.createGain(); g.gain.setValueAtTime(0.0001,t0); g.gain.linearRampToValueAtTime(peak*p,t0+0.005); g.gain.exponentialRampToValueAtTime(0.0001,t0+d); o.connect(g).connect(master); o.start(t0); o.stop(t0+d+0.05); } };
  /* Moewe: Glissando mit Vibrato */
  const gull=(t0,peak=0.12)=>{ const o=ac.createOscillator(); o.type='sine'; o.frequency.setValueAtTime(1500,t0); o.frequency.exponentialRampToValueAtTime(950,t0+0.35); const lfo=ac.createOscillator(); lfo.frequency.value=22; const lg=ac.createGain(); lg.gain.value=60; lfo.connect(lg).connect(o.frequency); const g=ac.createGain(); env(g,t0,0.03,peak,0.18,0.14); o.connect(g).connect(master); o.start(t0); lfo.start(t0); o.stop(t0+0.5); lfo.stop(t0+0.5); };
  /* Rauschen mit langsamer Huellkurve (Wellen, Wind) — points: [[t,gain],...] */
  const bed=(type,freq,q,points,lfoHz=0,lfoDepth=0)=>{ const src=ac.createBufferSource(); src.buffer=NOISE; src.loop=true; const f=ac.createBiquadFilter(); f.type=type; f.frequency.value=freq; f.Q.value=q; const g=ac.createGain(); g.gain.setValueAtTime(0.0001,0); for(const [t,v] of points) g.gain.linearRampToValueAtTime(Math.max(0.0001,v),t); if(lfoHz>0){ const l=ac.createOscillator(); l.frequency.value=lfoHz; const lg=ac.createGain(); lg.gain.value=lfoDepth; l.connect(lg).connect(g.gain); l.start(0); l.stop(DUR); } src.connect(f).connect(g).connect(master); src.start(0); src.stop(DUR); return f; };
  MOTTO.audio(ac,master,{env,tone,noise,bell,gull,bed,NOISE,rng});
  return await ac.startRendering(); }
let actx=null, srcNode=null, soundOn=false;
async function ensureAudio(){ if(!AUDIO_BUF) AUDIO_BUF=await renderAudio(); if(!actx) actx=new (window.AudioContext||window.webkitAudioContext)(); if(actx.state==='suspended') await actx.resume(); }
function soundStop(){ if(srcNode){ try{srcNode.stop();}catch(e){} try{srcNode.disconnect();}catch(e){} srcNode=null; } }
function soundStart(offset){ soundStop(); if(!soundOn||!actx||!AUDIO_BUF) return; srcNode=actx.createBufferSource(); srcNode.buffer=AUDIO_BUF; srcNode.connect(actx.destination); srcNode.start(0,clamp(offset,0,DUR-0.02)); }

/* ---------- Vorschau ---------- */
let playing=true, t0=performance.now(), rendering=false, lastEl=0;
const fmt=s=>s.toFixed(1).replace('.',',')+' s';
function redraw(){ MOTTO&&MOTTO.drawFrame(F(playing?((performance.now()-t0)/1000)%DUR:pauseAt)); }
function loop(now){ if(playing&&!rendering){ const el=((now-t0)/1000)%DUR; if(el<lastEl&&soundOn) soundStart(0); lastEl=el; const i=Math.floor(el*FPS); MOTTO.drawFrame(i); $('scrub').value=i; $('tc').textContent=fmt(el); } requestAnimationFrame(loop); }
function setPlay(p){ playing=p; if(p){ t0=performance.now()-pauseAt*1000; lastEl=pauseAt; soundStart(pauseAt); } else { pauseAt=((performance.now()-t0)/1000)%DUR; soundStop(); } $('play').textContent=p?'⏸':'▶'; $('play').setAttribute('aria-label',p?'Pause':'Abspielen'); }

/* ---------- Testprotokoll ---------- */
const pill=(cls,txt)=>`<span class="pill ${cls}">${txt}</span>`;
function deviceLabel(){ const ua=navigator.userAgent; let dev='Desktop'; if(/iPhone/.test(ua)) dev='iPhone'; else if(/iPad|Macintosh/.test(ua)&&navigator.maxTouchPoints>1) dev='iPad'; else if(/Android/.test(ua)) dev='Android';
  let br='Browser'; let m; if((m=/CriOS\/(\d+)/.exec(ua))) br='Chrome '+m[1]; else if((m=/FxiOS\/(\d+)/.exec(ua))) br='Firefox '+m[1]; else if((m=/EdgiOS\/(\d+)/.exec(ua))) br='Edge '+m[1]; else if(/Safari/.test(ua)&&(m=/Version\/([\d.]+)/.exec(ua))) br='Safari '+m[1]; else if((m=/Edg\/(\d+)/.exec(ua))) br='Edge '+m[1]; else if((m=/Chrome\/(\d+)/.exec(ua))) br='Chrome '+m[1]; else if((m=/Firefox\/(\d+)/.exec(ua))) br='Firefox '+m[1];
  const os=(m=/OS (\d+)_(\d+)/.exec(ua))?'iOS '+m[1]+'.'+m[2]:(m=/Android ([\d.]+)/.exec(ua))?'Android '+m[1]:/Windows/.test(ua)?'Windows':/Mac OS X/.test(ua)?'macOS':'';
  return `${dev} · ${br}${os?' · '+os:''}`; }
const PROTO={device:deviceLabel(), webcodecs:null, codec:null, res:null, aac:null, audio:null, file:null, time:null, play:null, share:null};
function copyline(){ const p=PROTO; const parts=[p.device, 'WebCodecs '+(p.webcodecs===null?'?':p.webcodecs?'ja':'nein'), 'Encoder '+(p.codec||(p.codec===null?'?':'keiner')), p.res?p.res:null, 'AAC '+(p.aac===null?'?':p.aac?'ja':'nein'), p.audio!==null?('Ton im Video '+(p.audio?'ja':'nein')):null, p.file?p.file:null, p.time?p.time:null, p.play!==null?('Wiedergabe '+(p.play?'ok':'FEHLER')):null, p.share!==null?('Teilen '+p.share):null].filter(Boolean); $('copyline').textContent=parts.join(' · '); }
const CANDS_1080=['avc1.640028','avc1.64002A','avc1.4D0028','avc1.420028','avc1.42E028'];
const CANDS_720=['avc1.64001F','avc1.4D001F','avc1.42001F','avc1.42E01F'];
const AAC_CFG={codec:'mp4a.40.2',sampleRate:48000,numberOfChannels:2,bitrate:128000};
const BITRATE=3_800_000;
async function pickCodec(w,h,cands){ for(const c of cands){ try{ const r=await VideoEncoder.isConfigSupported({codec:c,width:w,height:h,bitrate:BITRATE,framerate:FPS}); if(r.supported) return c; }catch(e){} } return null; }
async function aacSupported(){ if(!('AudioEncoder' in window)||!('AudioData' in window)) return false; try{ const r=await AudioEncoder.isConfigSupported(AAC_CFG); return !!r.supported; }catch(e){ return false; } }
async function probe(){ PROTO.webcodecs=('VideoEncoder' in window)&&('VideoFrame' in window); $('k-wc').innerHTML=PROTO.webcodecs?pill('ok','verfügbar'):pill('bad','fehlt in diesem Browser');
  if(!PROTO.webcodecs){ PROTO.codec=''; PROTO.aac=false; $('k-codec').innerHTML=pill('bad','nicht prüfbar'); $('k-aac').innerHTML=pill('bad','nicht prüfbar'); copyline(); return; }
  let c=await pickCodec(W,H,CANDS_1080), res='1080×1920'; if(!c){ c=await pickCodec(720,1280,CANDS_720); res='720×1280'; }
  PROTO.codec=c||''; PROTO.res=c?res:null; $('k-codec').innerHTML=c?(pill('ok',c)+' <span style="color:var(--muted)">'+res+'</span>'):pill('bad','kein H.264-Encoder gemeldet');
  PROTO.aac=await aacSupported(); $('k-aac').innerHTML=PROTO.aac?pill('ok','AAC-Encoder verfügbar'):pill('bad','kein AAC-Encoder, Video käme ohne Ton'); copyline(); }

/* ---------- MP4-Export ---------- */
let lastBlob=null;
async function makeFrame(src,i){ const init={timestamp:Math.round(i*1e6/FPS),duration:Math.round(1e6/FPS)}; try{ return new VideoFrame(src,init); }catch(e){ const bmp=await createImageBitmap(src); const f=new VideoFrame(bmp,init); bmp.close(); return f; } }
async function renderMp4(){
  const pr=$('progress'), bar=$('barfill'); $('result').hidden=true; $('share').hidden=true; lastBlob=null;
  if(!PROTO.webcodecs){ pr.textContent='Dieser Browser hat kein WebCodecs. Hier bräuchte es einen Ersatzweg.'; return; }
  let ew=W, eh=H, codec=await pickCodec(ew,eh,CANDS_1080); if(!codec){ ew=720; eh=1280; codec=await pickCodec(ew,eh,CANDS_720); }
  if(!codec){ pr.textContent='Kein H.264-Encoder verfügbar, weder 1080p noch 720p.'; return; }
  rendering=true; if(playing) setPlay(false); $('render').disabled=true; const started=performance.now();
  let withAudio=await aacSupported(); if(withAudio&&!AUDIO_BUF){ try{ pr.textContent='Rechne den Ton …'; AUDIO_BUF=await renderAudio(); }catch(e){ withAudio=false; } }
  const ec=(ew===W)?cv:Object.assign(document.createElement('canvas'),{width:ew,height:eh}); const ectx=(ew===W)?null:ec.getContext('2d');
  let audioNote='';
  try{
    const mopts={target:new Mp4Muxer.ArrayBufferTarget(),video:{codec:'avc',width:ew,height:eh,frameRate:FPS},fastStart:'in-memory',firstTimestampBehavior:'offset'}; if(withAudio) mopts.audio={codec:'aac',sampleRate:48000,numberOfChannels:2};
    const muxer=new Mp4Muxer.Muxer(mopts);
    let encErr=null; const enc=new VideoEncoder({output:(chunk,meta)=>muxer.addVideoChunk(chunk,meta),error:e=>{encErr=e;}});
    enc.configure({codec,width:ew,height:eh,bitrate:BITRATE,framerate:FPS,latencyMode:'quality',avc:{format:'avc'}});
    for(let i=0;i<N;i++){ MOTTO.drawFrame(i); if(ectx) ectx.drawImage(cv,0,0,ew,eh); const frame=await makeFrame(ec,i); enc.encode(frame,{keyFrame:i%60===0}); frame.close();
      while(enc.encodeQueueSize>4) await new Promise(r=>setTimeout(r,1));
      if(i%6===0){ pr.textContent=`Rendere Bild ${i+1} von ${N} …`; bar.style.width=(100*(i+1)/N).toFixed(1)+'%'; await new Promise(r=>setTimeout(r,0)); } if(encErr) throw encErr; }
    await enc.flush(); enc.close();
    if(withAudio){ let aErr=null; const aenc=new AudioEncoder({output:(c,m)=>muxer.addAudioChunk(c,m),error:e=>{aErr=e;}}); aenc.configure(AAC_CFG); const ch0=AUDIO_BUF.getChannelData(0), ch1=AUDIO_BUF.getChannelData(1), FR=1024; pr.textContent='Packe den Ton dazu …';
      for(let off=0;off<AUDIO_BUF.length;off+=FR){ const n=Math.min(FR,AUDIO_BUF.length-off); const data=new Float32Array(n*2); data.set(ch0.subarray(off,off+n),0); data.set(ch1.subarray(off,off+n),n); const ad=new AudioData({format:'f32-planar',sampleRate:48000,numberOfFrames:n,numberOfChannels:2,timestamp:Math.round(off/48000*1e6),data}); aenc.encode(ad); ad.close(); if(aErr) break; }
      if(!aErr) await aenc.flush(); aenc.close(); if(aErr){ audioNote=' · Ton-Fehler: '+(aErr.message||aErr); } }
    muxer.finalize(); lastBlob=new Blob([muxer.target.buffer],{type:'video/mp4'});
  }catch(e){ pr.textContent='Encoder-Fehler: '+(e&&e.message||e); $('k-file').innerHTML=pill('bad','Fehler: '+(e&&e.message||e)); PROTO.file='Encoder-Fehler'; copyline(); rendering=false; $('render').disabled=false; return; }
  const secs=(performance.now()-started)/1000; bar.style.width='100%';
  PROTO.res=ew+'×'+eh; PROTO.codec=codec; PROTO.audio=withAudio&&!audioNote; PROTO.file=(lastBlob.size/1048576).toFixed(2).replace('.',',')+' MB'; PROTO.time=secs.toFixed(1).replace('.',',')+' s';
  $('k-codec').innerHTML=pill('ok',codec)+' <span style="color:var(--muted)">'+PROTO.res+'</span>'; $('k-file').textContent=PROTO.file+' · '+DUR+' s · '+PROTO.res+(PROTO.audio?' · mit Ton':' · ohne Ton')+audioNote; $('k-time').textContent=PROTO.time;
  pr.textContent=`Fertig: ${PROTO.file} in ${PROTO.time}${PROTO.audio?', mit Ton':', ohne Ton'}. Das Video läuft unten.`;
  const v=$('result'); const url=URL.createObjectURL(lastBlob); v.hidden=false; v.muted=true; v.src=url; $('k-play').innerHTML=pill('wait','lädt …'); PROTO.play=null; copyline();
  const playCheck=new Promise(res=>{ let done=false; const ok=()=>{ if(done) return; done=true; res(true); }; const bad=()=>{ if(done) return; done=true; res(false); }; v.addEventListener('error',bad,{once:true}); v.addEventListener('loadeddata',()=>{ v.play().then(()=>setTimeout(()=>{ (v.currentTime>0.05&&!v.error)?ok():bad(); },900)).catch(()=>{ (v.readyState>=2&&!v.error)?ok():bad(); }); },{once:true}); setTimeout(()=>{ (v.readyState>=2&&!v.error)?ok():bad(); },8000); });
  PROTO.play=await playCheck; $('k-play').innerHTML=PROTO.play?pill('ok','spielt ab'):pill('bad','Browser kann die Datei nicht abspielen'); v.muted=false;
  const file=new File([lastBlob],MOTTO.id+'-trailer.mp4',{type:'video/mp4'}); const can=!!(navigator.canShare&&navigator.canShare({files:[file]})); PROTO.share=can?'möglich':'nicht möglich'; $('k-share').innerHTML=can?pill('ok','möglich'):pill('bad','dieser Browser bietet es nicht an'); $('share').hidden=!can; $('share').onclick=async()=>{ try{ await navigator.share({files:[file],title:MOTTO.title}); PROTO.share='geteilt'; $('k-share').innerHTML=pill('ok','Teilen-Menü geöffnet'); }catch(e){ if(e&&e.name==='AbortError'){ PROTO.share='abgebrochen'; $('k-share').innerHTML=pill('wait','abgebrochen'); } else { PROTO.share='Fehler: '+(e&&e.name||'?'); $('k-share').innerHTML=pill('bad','Fehler: '+(e&&e.message||e)); } } copyline(); };
  copyline(); rendering=false; $('render').disabled=false; }

/* ---------- Start: das Drehbuch meldet sich an ---------- */
function startTrailer(M){
  MOTTO=M; DUR=M.DUR; N=DUR*FPS; $('scrub').max=N-1; playing=!REDUCED; pauseAt=REDUCED?(M.restFrameAt||0):0;
  initPhoto(M.photoDefault||'');
  $('k-ua').textContent=PROTO.device; $('k-ua').title=navigator.userAgent;
  $('play').onclick=()=>setPlay(!playing);
  $('scrub').oninput=e=>{ if(playing) setPlay(false); const i=Number(e.target.value); pauseAt=i/FPS; M.drawFrame(i); $('tc').textContent=fmt(pauseAt); };
  $('sound').onclick=async()=>{ soundOn=!soundOn; $('sound').textContent=soundOn?'🔊 Ton an':'🔇 Ton aus'; $('sound').setAttribute('aria-label',soundOn?'Ton ausschalten':'Ton einschalten'); if(soundOn){ try{ await ensureAudio(); }catch(e){ soundOn=false; $('sound').textContent='🔇 kein Ton'; return; } if(playing) soundStart(((performance.now()-t0)/1000)%DUR); } else soundStop(); };
  $('render').onclick=renderMp4; window._renderMp4=renderMp4;
  window._seek=(sec)=>{ if(playing) setPlay(false); pauseAt=sec; M.drawFrame(F(sec)); $('tc').textContent=fmt(sec); };
  M.drawFrame(F(pauseAt)); probe();
  Promise.all([document.fonts.load('800 100px "Baloo 2"'),document.fonts.load('700 50px "DM Sans"')]).catch(()=>{}).then(()=>{ M.drawFrame(F(pauseAt)); t0=performance.now(); requestAnimationFrame(loop); }); }
