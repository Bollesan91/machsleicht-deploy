/* ============================================================
   machsleicht · Einladungsspiele — SHARED CORE (core.js)
   ------------------------------------------------------------
   WICHTIG: Als PLAIN <script> laden (NICHT type=module, NICHT in
   IIFE wrappen). actx/note/noise/$ müssen global bleiben, sonst
   erreicht das per-Spiel-`sfx` sie nicht und der Ton stirbt lautlos.
   Am ENDE des <body> einbinden (nach den Spiel-DOM-Elementen), VOR
   dem Spiel-Inline-<script>, denn der ?g=-Prefill liest #gname.

   Bereitgestellte Globals:
     $(sel)                         querySelector
     show(id)                       Szene wechseln (.scene/.scene.on)
     AC() note() noise() vib()      WebAudio-Primitive + Vibration
     guestName()                    ?g= / #gname -> #winWho Gast-Ansprache voranstellen
     kid()                          ?k= / #kname -> Name des Geburtstagskindes (Held-Zeile, 3. Person); Fallback 'das Geburtstagskind'
     ageNum()                       ?age= -> Zahl (Default 8) für alters-adaptive Schwierigkeit
     setPhoto(theme, nophotoSvg)    -> HAS_PHOTO (setzt --photo)
     confetti(colors, opts?)        Konfetti (colors PFLICHT)

   Pro Spiel im Inline-<script> bleibt: THEME, NOPHOTO, sfx, Spiellogik.
   Pro Spiel im :root setzen: --bg1 --bg2 --fg --accent --accent-dk (--ink).

   SET-KONTRAKT #rsvpBtn (2026-07-12): Im Real-Modus ERSETZT der Party-Modus-Block den Button
   per cloneNode (entfernt den Demo-Listener). Skins duerfen #rsvpBtn deshalb NIE in einer
   Variable cachen oder nach DOMContentLoaded mutieren — nur das Parse-Muster
   $('#rsvpBtn').addEventListener(...) verwenden (Listener-Verlust beim Klon ist gewollt).
   ============================================================ */

const $=s=>document.querySelector(s);
const show=id=>{document.querySelectorAll('.scene').forEach(e=>e.classList.remove('on'));$('#'+id).classList.add('on');try{_idleArm(10000)}catch(e){}try{_floorArm()}catch(e){}};

/* ===== WebAudio: synthetisierte Game-Sounds (self-contained) ===== */
let actx;
function AC(){try{actx=actx||new(window.AudioContext||window.webkitAudioContext)();if(actx.state==='suspended')actx.resume();}catch(e){actx=actx||{currentTime:0,state:'running',resume(){}};}return actx;}
// note(freq,t0,dur,{type,vol,glideTo,detune,attack}) — Superset aller Spiele (Default vol 0.15).
function note(freq,t0,dur,o={}){
  try{const a=AC(),osc=a.createOscillator(),g=a.createGain();
    osc.type=o.type||'sine';osc.frequency.setValueAtTime(freq,t0);if(o.detune)osc.detune.value=o.detune;
    if(o.glideTo)osc.frequency.exponentialRampToValueAtTime(o.glideTo,t0+dur);
    const v=o.vol||0.15;g.gain.setValueAtTime(0.0001,t0);g.gain.exponentialRampToValueAtTime(v,t0+(o.attack||0.006));
    g.gain.exponentialRampToValueAtTime(0.0001,t0+dur);
    osc.connect(g);g.connect(a.destination);osc.start(t0);osc.stop(t0+dur+0.03);}catch(e){}
}
// noise(t0,dur,{vol,freq,q,filter}) — filter Default 'bandpass'; Motoren/Hufe übergeben filter:'lowpass',freq:500.
function noise(t0,dur,o={}){
  try{const a=AC(),buf=a.createBuffer(1,Math.max(1,a.sampleRate*dur),a.sampleRate),d=buf.getChannelData(0);
    for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;
    const s=a.createBufferSource();s.buffer=buf;const f=a.createBiquadFilter();
    f.type=o.filter||'bandpass';f.frequency.value=o.freq||1500;f.Q.value=o.q||0.8;
    const g=a.createGain();g.gain.setValueAtTime(o.vol||0.12,t0);g.gain.exponentialRampToValueAtTime(0.0001,t0+dur);
    s.connect(f);f.connect(g);g.connect(a.destination);s.start(t0);s.stop(t0+dur);}catch(e){}
}
const vib=ms=>{try{navigator.vibrate&&navigator.vibrate(ms)}catch(e){}};

/* ===== Gast-Name: aus #gname ODER ?g= (Eingabe vorbefüllt aus ?g=). Leer -> generischer Reveal (WhatsApp-Gruppen-Fall). ===== */
(function(){const g=new URLSearchParams(location.search).get('g');const f=document.getElementById('gname');if(g&&f)f.value=g;})();
function guestName(){const g=(((document.getElementById('gname')||{}).value)||'').trim()||(new URLSearchParams(location.search).get('g')||'');if(g&&g.length<=20){const w=document.getElementById('winWho');if(w)w.textContent=g+'! '+w.textContent.charAt(0).toUpperCase()+w.textContent.slice(1);}}

/* ===== Kind-Name: das Geburtstagskind ist der HELD des Reveals. Held-Zeile nennt es namentlich (3. Person),
   ?g= bleibt die Gast-Ansprache davor. Aus #kname ODER ?k=; Fallback 'das Geburtstagskind' (nur Demo/ohne Param —
   in der echten Motto-App ist der Vorname immer bekannt). Bei OHNE-Foto zeigt setPhoto ein Avatar, der Name bleibt. ===== */
(function(){const p=new URLSearchParams(location.search);const k=p.get('k')||p.get('name');const f=document.getElementById('kname');if(k&&f)f.value=k;})();
// ?name= als Fallback: der party-worker baut die gameUrl mit ?name= (Legacy-Kontrakt) — beide Familien lesen denselben Param.
// Limit 50 = childName-Limit des Workers (Review 2026-07-12: 20 warf lange Doppelnamen faelschlich auf den Fallback).
function kid(){const p=new URLSearchParams(location.search);const k=(((document.getElementById('kname')||{}).value)||'').trim()||p.get('k')||p.get('name')||'';return (k&&k.length<=50)?k:'das Geburtstagskind';}

/* ===== Real-Modus-Erkennung (geteilt von setPhoto + Party-Modus-Block): eingebettet in die
   Partyseite ODER mit echten Party-Params aufgerufen. Demo = Prototyp direkt ohne Params. ===== */
function _realMode(){try{const p=new URLSearchParams(location.search);const emb=(function(){try{return window.parent!==window}catch(e){return true}})();return emb||!!(p.get('name')||p.get('k')||p.get('foto')||p.get('date'));}catch(e){return false}}

/* ===== Alter: ?age=<zahl> für alters-adaptive Schwierigkeit (z.B. Simon-Länge). Default 8 (mittlere Gruppe). ===== */
function ageNum(){const a=parseInt(new URLSearchParams(location.search).get('age'),10);return (a>=3&&a<=14)?a:8;}

/* ===== Foto-System: setzt --photo auf Foto ODER per-Spiel-NOPHOTO-SVG; gibt HAS_PHOTO zurück.
   ?nofoto erzwingt den Ohne-Foto-Pfad. Die per-Spiel Titel/Text-Umschrift bleibt im Spiel. ===== */
function setPhoto(theme,nophoto){
  const _cssUrl=s=>String(s).replace(/[\r\n]/g,'').replace(/[\\"]/g,'\\$&'); // CSS-url()-safe: " und \ escapen + Zeilenumbrueche raus -> kein url()-Breakout/CSS-Injection bei dynamischer Eltern-Foto-URL
  // ?foto= (party-worker-Kontrakt, #29): kurze /api/invimg-URL des echten Kind-Fotos. Strikte Whitelist
  // (nur der eigene invimg-Endpoint) -> keine fremden URLs in --photo. Override VOR theme.photo (Demo-Foto).
  // Demo-Foto-Gate (Review-MAJOR 2026-07-12): theme.photo (Demo-Kind) NUR im Demo-Modus — eine echte
  // Einladung ohne Eltern-Foto darf NIE ein fremdes Demo-Kind zeigen, sondern faellt auf den Avatar.
  const _fp=new URLSearchParams(location.search).get('foto')||'';
  const _fotoParam=(/^https:\/\/party\.machsleicht\.de\/api\/invimg\/[a-z0-9]+$/.test(_fp)||_fp==='/spiele/core/demo-kid.jpg')?_fp:''; // Demo-Foto (Bolle 13.07.): exakt EIN site-eigenes Asset fuer Previews zugelassen
  const photo=_fotoParam||(!_realMode()&&theme&&theme.photo)||'';
  const HAS_PHOTO=!!photo && !new URLSearchParams(location.search).has('nofoto');
  const de=document.documentElement;
  de.style.setProperty('--photo',`url("${_cssUrl(HAS_PHOTO?photo:nophoto)}")`);
  de.removeAttribute('data-photo-ok');
  /* onerror-Fallback + LADE-BESTAETIGUNG (Task #43 ChatGPT-Haertung, 2026-07-11):
     laedt das Foto nicht (kaputter/404 Eltern-Link, geloeschter Upload), fallen wir auf das
     per-Spiel-NOPHOTO-SVG zurueck, damit die Centerpiece-Enthuellung nie als leerer/dunkler Kreis
     bricht (Herzstueck des Spiels). data-photo-failed wird JETZT PESSIMISTISCH gesetzt und erst bei
     bestaetigtem onload wieder entfernt (+ data-photo-ok). Damit ist die set-weit genutzte Win-Copy
     `HAS_PHOTO && !data-photo-failed` LADE- statt URL-basiert -> kein onerror-Race mehr (win vor
     onerror bei totem Link zeigt nie mehr Foto-Copy auf leerem Polaroid). Reveal-last ungetroffen:
     --photo zeigt das Foto per CSS sofort, die Bestaetigung steuert nur den Win-TEXT.
     Review-MAJOR (akte-detektiv, 2026-07-10) + onerror-Race (fotosafari/tresor ChatGPT, 2026-07-10). */
  if(HAS_PHOTO){
    de.setAttribute('data-photo-failed','1'); // pessimistisch bis onload bestaetigt (s.o.)
    const _im=new Image();
    _im.onload=function(){ de.removeAttribute('data-photo-failed'); de.setAttribute('data-photo-ok','1'); };
    _im.onerror=function(){
      de.style.setProperty('--photo',`url("${_cssUrl(nophoto)}")`);
      de.setAttribute('data-photo-failed','1');
    };
    _im.src=photo;
  }
  return HAS_PHOTO;
}

/* ===== Tipp/Weiter-Taste: hängt automatisch eine „💡 Tipp"-Taste in #s-game, WENN das Spiel eine
   globale Funktion tip() definiert (macht einen Schritt Richtung Lösung -> Reveal immer erreichbar,
   „falls jemand nicht weiterkommt"). Spiele mit eigenem #tippBtn (Puzzle/Simon) werden übersprungen. ===== */
window.addEventListener('DOMContentLoaded',function(){
  try{ if(typeof tip==='function' && !document.getElementById('tippBtn')){
    const g=document.getElementById('s-game'); if(!g)return;
    const b=document.createElement('button'); b.className='btn'; b.id='tippBtn'; b.textContent='💡 Tipp';
    b.style.cssText='background:rgba(255,255,255,.16);font-size:15px;padding:8px 20px;margin-top:4px';
    b.addEventListener('click',function(){ try{tip()}catch(e){} }); g.appendChild(b);
  } }catch(e){}
});

/* ===== "Nochmal spielen"-Taste auf #s-win: klickt den Start-Button -> sauberer Neustart (jedes Spiel resettet im
   Start-Handler seinen State). Set-weit fuer alle Spiele mit #s-win + #startBtn. ===== */
window.addEventListener('DOMContentLoaded',function(){
  try{ const w=document.getElementById('s-win'), sb=document.getElementById('startBtn');
    if(w && sb && !document.getElementById('replayBtn')){
      const r=document.createElement('button'); r.id='replayBtn'; r.textContent='🔄 Nochmal spielen';
      r.style.cssText='display:block;margin:14px auto 0;padding:9px 22px;border:0;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer;background:rgba(255,255,255,.92);color:#333;box-shadow:0 4px 14px rgba(0,0,0,.25);touch-action:manipulation';
      r.addEventListener('click',function(){ try{ document.getElementById('startBtn').click(); }catch(e){} });
      w.appendChild(r);
    }
  }catch(e){}
});

/* ===== Idle-Nudge (No-Fail-Netz fuer sehr junge/passive Kinder): Ist #s-game sichtbar und tip() definiert,
   pulsiert nach ~10s Inaktivitaet der Tipp-Button, nach weiteren ~8s loest tip() automatisch aus.
   Jede Interaktion (pointerdown/keydown) setzt zurueck -> ein engagiertes Kind wird nie genudged.
   Nach dem ersten Auto-Tipp schnellerer Takt (~5s), damit ein voellig passives Kind bis zum Reveal
   getragen wird. tip() self-guardet (if(done)return), auto-Tipp nach Win ist also folgenlos.
   In show() angehaengt: bei show('s-game') scharf, bei jedem anderen Szenenwechsel gestoppt. ===== */
let _idleTimer=null;
function _sgameOn(){ const g=document.getElementById('s-game'); return !!(g&&g.classList.contains('on')&&typeof tip==='function'); }
function _idleStop(){ if(_idleTimer){clearTimeout(_idleTimer);_idleTimer=null;} const b=document.getElementById('tippBtn'); if(b)b.classList.remove('nudge'); }
function _idleArm(delay){
  _idleStop();
  if(!_sgameOn()) return;
  _idleTimer=setTimeout(function(){
    const b=document.getElementById('tippBtn'); if(b)b.classList.add('nudge');
    _idleTimer=setTimeout(function(){
      if(_sgameOn()){ try{tip()}catch(e){} }
      _idleArm(5000);
    }, 8000);
  }, delay||10000);
}
['pointerdown','keydown'].forEach(function(ev){ document.addEventListener(ev,function(){ if(_sgameOn())_idleArm(10000); }, true); });

/* ===== Harter No-Fail-Floor (aktivitaets-UNABHAENGIG): der Idle-Nudge oben setzt bei JEDER
   Interaktion zurueck -> ein Kind, das aktiv aber erfolglos das falsche Feld bearbeitet ("mash't"),
   triggert ihn nie und bleibt haengen. Dieser Floor feuert tip() nach ~30s im #s-game GARANTIERT,
   egal wie viel interagiert wird, und danach im ~9s-Takt, bis der Reveal erreicht ist. Er wird NUR
   ueber show() gestellt/gestoppt (NICHT von pointerdown/keydown zurueckgesetzt) -> genau das faengt
   den aktiven-aber-erfolglosen Fall. tip() self-guardet (if(done)return) -> nach Win folgenlos. Ein
   zuegig-gewinnendes Kind (meist <30s) sieht ihn nie. (ChatGPT-Haertung Task #43 No-Fail-mashing,
   2026-07-11 — Gegenstueck zum idle-getriggerten Netz fuer den passiven Fall.) ===== */
let _floorTimer=null;
function _floorStop(){ if(_floorTimer){clearTimeout(_floorTimer);_floorTimer=null;} }
function _floorArm(){
  _floorStop();
  if(!_sgameOn()) return;
  _floorTimer=setTimeout(function step(){
    if(!_sgameOn()) return;
    try{tip()}catch(e){}
    _floorTimer=setTimeout(step, 9000);
  }, 30000);
}

/* ===== Party-Modus (Funnel-Integration, 2026-07-12): laeuft das Spiel mit echten Party-Daten
   (eingebettet in die Partyseite ODER mit ?name/?foto/?date), werden die Demo-Werte der Win-Karte
   ersetzt bzw. gegated:
   - #wDate/#wTime: aus ?date/?time (deutsch formatiert); ohne Param im Real-Modus AUSGEBLENDET
     (nie das Fake-Demo-Datum auf einer echten Einladung).
   - #wPlace: NIE eine Adresse — der Worker sendet ?ort= bewusst leer (Adress-Gating: Adresse gibt es
     erst nach der Zusage auf der Partyseite). Real-Modus zeigt einen Neugier-Teaser statt "Bei uns".
   - #rsvpBtn ("Bin dabei!"): im iframe wird der Klick zur Conversion-Bruecke -> postMessage("gameComplete")
     an die Partyseite (bestehender Kontrakt der Legacy-Spiele) -> die blendet das Spiel aus und scrollt
     zur Zusage-Karte. Demo-Fussnote verschwindet. Standalone-Real (kein iframe): Button ausgeblendet.
   Demo-Modus (Prototyp direkt geoeffnet, keine Params): ALLES unveraendert. ===== */
window.addEventListener('DOMContentLoaded',function(){
  try{
    const p=new URLSearchParams(location.search);
    const embedded=(function(){try{return window.parent!==window}catch(e){return true}})();
    const real=_realMode();
    // PROTOTYP-Badge nie auf echten Einladungen (Review-MAJOR 2026-07-12; steckt in allen 62 Prototyp-Shells)
    if(real){document.querySelectorAll('.demoTag').forEach(function(el){el.style.display='none';});}
    const _hideKV=el=>{if(!el)return;const dt=el.previousElementSibling;if(dt&&dt.tagName==='DT')dt.style.display='none';el.style.display='none';};
    const dd=document.getElementById('wDate'),tt=document.getElementById('wTime'),pl=document.getElementById('wPlace');
    if(dd){const ds=p.get('date')||'';
      if(ds){const d=new Date(ds+'T12:00:00');dd.textContent=isNaN(d)?ds:d.toLocaleDateString('de-DE',{weekday:'long',day:'numeric',month:'long'});}
      else if(real)_hideKV(dd);}
    if(tt){const ts=p.get('time')||'';
      if(ts)tt.textContent=ts+' Uhr';
      else if(real)_hideKV(tt);}
    if(pl){const o=p.get('ort')||'';
      if(o)pl.textContent=o.slice(0,80);
      else if(real)pl.textContent='Wird nach deiner Zusage verraten \u{1F92B}';}
    const rb=document.getElementById('rsvpBtn');
    if(rb&&real){
      const note=rb.nextElementSibling;
      if(note&&note.classList.contains('note'))note.style.display='none';
      if(embedded){
        // Klon ersetzt den Button -> entfernt den Demo-Listener des Skins ("Zusage gesendet" ohne echte
        // Zusage, Review-Finding 2026-07-12). Im Embed zaehlt nur die Bruecke zur Zusage-Karte der Partyseite.
        const nb=rb.cloneNode(true);rb.replaceWith(nb);
        nb.addEventListener('click',function(){try{window.parent.postMessage('gameComplete','*')}catch(e){}});
      }
      else{
        // Standalone-Real (/e/-Kurzlink, Review-MAJOR 2026-07-13): Zusage laeuft wie bei der
        // Legacy-Familie per WhatsApp an die Eltern (?tel= steckt bereits in der Spiel-URL).
        // Ohne tel bleibt der Button versteckt (kein toter Antwort-Kanal).
        const _tel=(p.get('tel')||'').replace(/[^0-9]/g,'');
        if(_tel){
          const a=document.createElement('a');
          a.id=rb.id;a.className=rb.className;a.textContent=rb.textContent;
          const _d=p.get('date')||'';
          a.href='https://wa.me/'+_tel+'?text='+encodeURIComponent('Wir sind dabei! \u{1F389} Zusage für '+kid()+(_d?(' am '+_d):''));
          a.target='_blank';a.rel='noopener';
          a.style.cssText='text-decoration:none;display:inline-block;-webkit-tap-highlight-color:transparent;touch-action:manipulation'; // B1: <a> erbt .btn, aber nicht die Button-Defaults
          rb.replaceWith(a);
        } else { rb.style.display='none'; }
      }
    }
  }catch(e){}
});

/* ===== Konfetti: colors PFLICHT (per-Spiel-Palette). opts: {count=80, timeout=3300, durSpread=1.4}. ===== */
function confetti(colors,opts={}){
  const box=$('#confetti'); if(!box||!colors||!colors.length)return;
  const n=opts.count||80, to=opts.timeout||3300, spread=opts.durSpread||1.4;
  for(let i=0;i<n;i++){const c=document.createElement('i');c.style.left=Math.random()*100+'vw';
    c.style.background=colors[i%colors.length];c.style.animationDuration=(1.6+Math.random()*spread)+'s';
    c.style.animationDelay=(Math.random()*0.3)+'s';box.appendChild(c);setTimeout(()=>c.remove(),to);}
}
