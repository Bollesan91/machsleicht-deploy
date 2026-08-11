"use strict";
/* =====================================================================
   PAKET-CORE — geteilte Logik ALLER Motto-Komplettpakete.

   WARUM DIESE DATEI EXISTIERT (31.07.2026):
   Das Piraten-Paket war der Pilot. Fuer Motto 2..15 waere Copy-Paste der
   naheliegende Weg gewesen — und der falsche: allein im Crew-Sync steckten
   vier Fehler DERSELBEN Familie, dazu Escaping- und Countdown-Bugs. Jeder
   davon haette danach 15-mal gefixt werden muessen. Deshalb liegt hier alles,
   was rechnet, laedt oder abgleicht. Im Motto-File liegt nur, was Charakter
   hat: Texte, Rollen, Farben, Blatt-Layouts.

   FAUSTREGEL fuer neue Aenderungen:
   - Rechnet es, laedt es, gleicht es ab?      -> hierher
   - Liest es sich wie Produkttext?            -> ins Motto-File

   Ein Motto-File liefert `window.PAKET_CFG` (Vertrag unten), definiert
   render()/renderStation()/DEMO_PARTY + seine Blatt-Funktionen und ruft am
   Ende PaketCore.boot() auf.

   PAKET_CFG:
     id            Motto-Slug. Steuert /data/motto/<id>-<gruppe>.json,
                   den Eintrag in /data/schatzsuche.json und die Tracking-Props.
     dataLabel     Klartext fuer die Ladefehler-Meldung ("Piraten-Daten fehlen").
     qrDark        Dunkelfarbe der QR-Module (Druckkontrast).
     roles         Spiegel des ROLE_CATALOG aus party-worker.js: {id:{n,m}}.
     timeline      Beschriftungen des Zeitplan-Scheduler (siehe buildTimeline).
   ===================================================================== */

var PaketCore = (function(){

function CFG(){ return window.PAKET_CFG || {}; }

/* ---------- Helpers ---------- */
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
/* Gate B4.1 (04.08.): Die Motto-Daten tragen Markdown-Links mit Amazon-Affiliate-
   Parametern in Feldern, die GEDRUCKT werden — 62 Links, 32 mit tag=machsleicht21-21.
   esc() allein druckt sie woertlich aufs Papier: "[Helme zum Bemalen](https://...
   &tag=machsleicht21-21)". Am Bildschirm ist der Link nuetzlich, auf Papier ist er
   Muell. Also hier aufloesen: auf dem Schirm ein echter Link, im Druck nur der Text
   (siehe .mdl in paket.css). */
/* Gate B6.7 (04.08.): Die Alters-Anpassung wurde grossteils nie gedruckt. Der
   Renderer kannte nur ageAdjust8/6/3 — die Daten benutzen aber ageAdjust5 fuer die
   Kleinen und ageAdjust9/12 fuer die Grossen. Ergebnis: 328 von 1329 Anpassungen
   unsichtbar, bei der gross-Gruppe KEINE EINZIGE. Statt drei Suffixe fest zu
   verdrahten, lesen wir jetzt alle ageAdjustN und nehmen die groesste Stufe, die
   das Kind schon erreicht hat; ist es juenger als die kleinste Stufe, die kleinste.
   Damit greift die Regel auch fuer Suffixe, die es heute noch nicht gibt. */
function ageAdjustFor(game, age){
  const stufen = Object.keys(game||{})
    .map(k => { const m = /^ageAdjust(\d+)$/.exec(k); return m ? {n:+m[1], k} : null; })
    .filter(Boolean).sort((a,b) => a.n - b.n);
  if(!stufen.length) return null;
  const a = parseInt(age, 10);
  let pick = stufen[0];
  if(isFinite(a)) for(const st of stufen) if(st.n <= a) pick = st;
  const text = game[pick.k];
  return text ? {stufe: pick.n, text} : null;
}

function esclink(s){
  return esc(s).replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,
    (m, label, url) => '<a class="mdl" href="' + url.replace(/"/g,'&quot;') + '" target="_blank" rel="noopener nofollow">' + label + '</a>');
}
/* Possessiv nach Bolle-Regel: Name+s, bei Zischlaut-Endung (s/ß/x/z) nur Apostroph (Mats') */
/* Bolle-Regel: "Name’s", bei Zischlaut-Endung nur der Apostroph ("Mats’").
   Bis 05.08. fehlte im Normalfall der Apostroph ganz — aus Tino wurde "Tinos".
   Das stand auf jedem Blatt des bezahlten Pakets. Muss verhaltensgleich
   bleiben mit poss() in kindergeburtstag.html; Stufe 18 prueft das. */
function poss(n){ n=String(n||'').trim(); if(!n) return ''; return n + (/[sßxz]$/i.test(n) ? '’' : '’s'); }
function fmtDate(iso){ /* YYYY-MM-DD -> "Samstag, 12. September 2026" */
  if(!/^\d{4}-\d{2}-\d{2}$/.test(iso||'')) return '';
  const d = new Date(iso+'T12:00:00');
  if(isNaN(d)) return '';
  return d.toLocaleDateString('de-DE',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
}
function parseHM(s){ const m=/^(\d{1,2}):(\d{2})$/.exec(String(s||'').trim()); return m ? (+m[1])*60+(+m[2]) : null; }
function fmtHM(min){ min=((min%1440)+1440)%1440; return String(Math.floor(min/60)).padStart(2,'0')+':'+String(min%60).padStart(2,'0'); }
function stripEmojiLabel(s){ return String(s||'').replace(/\s*—\s*Spielanleitung\s*$/,''); }
function ageGroup(age){ const n=parseInt(age,10); if(!isFinite(n)) return 'mittel'; if(n<=5) return 'klein'; if(n<=8) return 'mittel'; return 'gross'; }

/* Welche Altersdatei laedt das Paket?
   Bis 06.08. stand hier nur ageGroup(PARTY.age) — und PARTY.age ist auf dem
   NORMALWEG leer: der Wizard sendet nach #26 absichtlich nur ein exakt
   getipptes Alter, und das tippt kaum jemand. ageGroup(null) faellt auf
   'mittel'. Wer "3-5 Jahre" geklickt hatte, bekam damit das mittel-Paket —
   ohne die klein-Sicherheitszeilen (Verschluckgefahr) und mit Spielen, die
   fuer sein Kind zu alt sind. Im Browser nachgemessen.
   Seither traegt die Party die Gruppe selbst. PARTY.age bleibt der Rueckfall
   fuer Partys, die vor der Umstellung angelegt wurden. */
function gruppeVonParty(p){
  const g = String((p && p.ageGroup) || '').trim();
  if(g==='klein' || g==='mittel' || g==='gross') return g;
  if(g==='3-5') return 'klein';
  if(g==='6-8') return 'mittel';
  if(g==='9-12') return 'gross';
  return ageGroup(p && p.age);          /* Altpartys: wie bisher aus dem Alter */
}

/* ---------- State ---------- */
/* Bewusst als Modul-State + Getter statt globaler Variablen: die Motto-Files
   lesen ueber PaketCore.party() usw., damit niemand versehentlich eine zweite
   Wahrheit anlegt (genau der Fehler, der den Crew-Sync viermal gebissen hat). */
let PARTY=null, DATA=null, VARIANT='standard', HASTOKEN=false, PARTYURL='';
let SCHATZ=null;      /* Motto-Eintrag aus /data/schatzsuche.json (Stationskarten) */
let PAGEBASE='';      /* eigene URL ohne Query — Basis fuer Stations-QRs */

/* ---------- Vorleser ---------- */
/* Stimmen-Auswahl (Bolle 30.07.: Default klang „wie Navigationssystem 1995").
   speechSynthesis nimmt sonst die schlechteste Kompakt-Stimme. Heuristik: Premium/Enhanced/
   Neural > Google-Netzstimme (Chrome/Android, deutlich natuerlicher) > Netz > Rest;
   Eloquence/eSpeak-Klasse aktiv abwerten. onvoiceschanged, weil die Liste async kommt. */
var VOICE=null;
function pickVoice(){
  try{
    var vs=window.speechSynthesis.getVoices().filter(function(v){ return /^de([-_]|$)/i.test(v.lang||''); });
    if(!vs.length) return null;
    function score(v){
      var n=(v.name||'').toLowerCase(), s=0;
      if(/siri/.test(n)) s+=50;
      if(/premium|enhanced|erweitert|neural|natural/.test(n)) s+=40;
      if(/google/.test(n)) s+=30;
      if(v.localService===false) s+=15;
      if(/anna|petra|helena|katja|viktoria|markus|conrad/.test(n)) s+=5;
      if(/eloquence|compact|espeak|robot/.test(n)) s-=40;
      return s;
    }
    vs.sort(function(a,b){ return score(b)-score(a); });
    return vs[0]||null;
  }catch(e){ return null; }
}
try{ window.speechSynthesis.onvoiceschanged=function(){ VOICE=pickVoice(); }; VOICE=pickVoice(); }catch(e){}
/* Re-Check N3: Generationszaehler + gemerkter Timer — sonst konnte (a) ein Stopp-Klick im
   60-ms-Fenster den geplanten Start NICHT verhindern und (b) ein spaetes onend eines
   gecancelten u den Status der NEUEN Session loeschen. */
var speakGen=0, speakTimer=null;
function speak(txt,btn){
  try{
    if(!('speechSynthesis' in window)){ alert('Vorlesen wird von diesem Browser nicht unterstützt.'); return; }
    var ss=window.speechSynthesis;
    if(speakTimer){ clearTimeout(speakTimer); speakTimer=null; }
    var gen=++speakGen;
    /* F6: Toggle statt Neustart — Klick auf den LAUFENDEN Knopf stoppt (vorher liess sich
       eine lange Spielkarte gar nicht stummschalten). */
    if(btn && btn.classList.contains('speaking')){
      ss.cancel(); btn.classList.remove('speaking'); return;
    }
    document.querySelectorAll('.vbtn.speaking').forEach(function(b){ b.classList.remove('speaking'); });
    var busy = ss.speaking || ss.pending;
    if(busy) ss.cancel();
    var u=new SpeechSynthesisUtterance(txt);
    u.lang='de-DE'; u.rate=0.97; u.pitch=1.02;
    if(!VOICE) VOICE=pickVoice();
    if(VOICE) u.voice=VOICE;
    if(btn){ btn.classList.add('speaking'); u.onend=u.onerror=function(){ if(gen===speakGen) btn.classList.remove('speaking'); }; }
    /* F7: iOS/WebKit verschluckt Utterances, wenn cancel() und speak() synchron aufeinander
       folgen — nach einem echten cancel deshalb kurz warten (Stations-Modus IST das Handy-Produkt). */
    if(busy) speakTimer=setTimeout(function(){ speakTimer=null; if(gen!==speakGen) return; try{ ss.speak(u); }catch(e){} }, 60);
    else ss.speak(u);
    try{ if(window.plausible) plausible('paket_vorleser',{props:{motto:CFG().id||''}}); }catch(e){}
  }catch(e){}
}
window.mlSpeak=function(el){ speak(el.getAttribute('data-say')||'', el); };

/* ---------- QR ---------- */
/* QR-Box (SVG inline, druckscharf); leer wenn MLQR fehlt oder Text zu lang */
function qrBlock(url,label){
  try{
    if(typeof MLQR==='undefined'||!url) return '';
    return '<div class="qrbox">'+MLQR.svg(url,{size:84,dark:(CFG().qrDark||'#12324A')})+'<div class="ql">'+esc(label||'Scannen & öffnen')+'</div></div>';
  }catch(e){ return ''; }
}
function stationUrl(idx){
  /* Stations-QR: OHNE edit-Token (Stationstexte sind Schicht A + oeffentlicher Kindername) */
  var q=[]; var qs=new URLSearchParams(location.search);
  if(qs.get('demo')==='1'){ q.push('demo=1'); var a=qs.get('age'); if(a) q.push('age='+encodeURIComponent(a)); }
  else { var id=(qs.get('id')||qs.get('p')||'').replace(/[^a-z0-9]/gi,''); if(id) q.push('id='+id); }
  q.push('s='+idx);
  return PAGEBASE+'?'+q.join('&');
}

/* ---------- Gast-Link (Party-Pass) ---------- */
/* Re-Check N1: Die Demo-PARTYURL traegt bereits ?demo=1 — ein zweites '?' zerstoerte die
   Query (demo="1?g=..." -> „Kein Party-Link"-Karte hinter JEDEM Demo-QR). Trennzeichen
   deshalb zentral, nicht je Blatt neu zusammengebaut. */
function guestUrl(gtok){
  if(!gtok) return PARTYURL;
  return PARTYURL+(PARTYURL.indexOf('?')>=0?'&':'?')+'g='+encodeURIComponent(gtok);
}

/* ---------- Rollen ---------- */
/* Spiegel des ROLE_CATALOG der Partyseite (party-worker.js).
   Unbekannte IDs (Katalog-Drift) werden kapitalisiert statt verworfen. */
function roleLabel(rid){
  rid=String(rid||'').trim(); if(!rid) return '';
  var R=CFG().roles||{};
  if(R[rid]) return R[rid].n;
  return rid.charAt(0).toUpperCase()+rid.slice(1).replace(/-/g,' ');
}
function roleMission(rid){ rid=String(rid||'').trim(); var R=CFG().roles||{}; return (R[rid]&&R[rid].m)||''; }

/* ---------- Einladungen: invites <-> guests abgleichen ---------- */
/* Playtest 31.07.: Karten fuer bereits ABGESAGTE Kinder wurden mitgedruckt (kein Abgleich).
   Zuordnung: erst Token (guest.inv), dann Name gegen token-lose Eintraege — der Namens-Pfad
   ist noetig, weil die haeufigste Absage ueber den Gruppenlink kommt (ohne Token, aber unter
   dem eingeladenen Namen).
   GRENZE (Gate-Befund 31.07., bewusst so): Hat das eingeladene Kind noch NICHT geantwortet und
   ein gleichnamiges Walk-in-Kind sagt ab, faellt dessen Karte trotzdem weg — im Namens-
   Vertrauensmodell sind die beiden nicht unterscheidbar. Der umgekehrte Trade-off wuerde den
   Normalfall falsch drucken; der Schaden ist sichtbar (Absagen-Hinweis + Blanko-Reserve).
   Ohne edit-Token liefert der Worker keine guests -> nichts wird gefiltert (korrekt). */
function splitInvites(){
  const invitesAll=(Array.isArray(PARTY.invites)?PARTY.invites:[]).filter(i=>i&&i.n);
  const guestsAll=(Array.isArray(PARTY.guests)?PARTY.guests:[]);
  function inviteStatus(inv){
    const byTok=guestsAll.find(g=>g&&g.inv&&g.inv===inv.t);
    if(byTok) return String(byTok.status||'');
    /* Gate-m5 (01.08.): trim beidseitig — der Worker trimmt zwar beim Schreiben, aber
       Altbestand/Fremdschreiber koennten " Emma " liefern und die Absage wuerde nicht greifen. */
    const key=s=>String(s||'').trim().toLowerCase();
    const byName=guestsAll.find(g=>g&&!g.inv&&key(g.name)===key(inv.n));
    return byName?String(byName.status||''):'';
  }
  return {
    open:     invitesAll.filter(i=>inviteStatus(i)!=='nein'),
    declined: invitesAll.filter(i=>inviteStatus(i)==='nein')
  };
}

/* ---------- Varianten ---------- */
function buildVswitch(){
  const vs = (DATA.variants||[]);
  const el = document.getElementById('vswitch');
  el.innerHTML = vs.map(v=>'<button data-v="'+esc(v.id)+'" class="'+(v.id===VARIANT?'on':'')+'">'+esc(v.label.split('—')[0].trim())+'</button>').join('');
  el.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{ VARIANT=b.dataset.v; buildVswitch(); window.render();
    try{ if(window.plausible) plausible('paket_variant',{props:{v:VARIANT}}); }catch(e){} }));
}
function variant(){ const vs=DATA.variants||[]; return vs.find(v=>v.id===VARIANT)||vs[0]||{}; }
function confirmedGuests(){ return (Array.isArray(PARTY.guests)?PARTY.guests:[]).filter(g=>g&&g.status==='ja'); }

/* ---------- Zeitplan-Scheduler ---------- */
/* Gate-MAJOR 3 (30.07.): duration ist in klein/gross ein String ("45 Min.") — +g.duration
   ergab NaN -> stiller 15er-Fallback. parseInt liest die fuehrende Zahl aus beidem. */
/* 05.08.: parseInt scheitert an "ca. 25 Minuten" (NaN -> stiller 15er-Fallback),
   waehrend die freie Seite dort korrekt 25 las. Jetzt liest diese Fassung die
   erste Zahl an beliebiger Stelle und faellt nur dann auf 15, wenn gar keine
   brauchbare da ist. Verhaltensgleich mit _parseDur() in kindergeburtstag.html
   — Stufe 18 prueft das. */
function parseDur(d){ const m=/\d+/.exec(String(d==null?'':d)); const n=m?+m[0]:0; return n>0?n:15; }
/* Gate-MAJOR 2 (30.07.): Zeilen werden NUR hinter einem monoton laufenden Zeiger gedruckt.
   Spiele, die nicht mehr vor die Uebergabe passen, wandern in eine zeitlose Reserve-Liste
   ("wenn Zeit bleibt") — nie wieder Rueckwaerts-Uhrzeiten.
   Reihenfolge: Ankunft/Ritual -> 2 Spiele -> Essen -> restliche Spiele -> freies Spiel
   -> Uebergabe (end-15) -> Ende.
   Die Beschriftungen kommen aus PAKET_CFG.timeline — die RECHNUNG ist fuer alle Mottos
   dieselbe, nur die Woerter wechseln. */
function buildTimeline(){
  const L = CFG().timeline || {};
  const timeAssumed = parseHM(PARTY.time)==null;
  const start = parseHM(PARTY.time) ?? parseHM('14:00');
  const endRaw = parseHM(PARTY.endTime);
  const endAssumed = (endRaw==null || endRaw<=start);
  const end = endAssumed ? start+180 : endRaw;
  const UEBERGABE=15, ESSEN=40, ESSEN_MIN=25, RIT=20;
  const endCap = end - UEBERGABE;                      /* letzte planbare Minute */
  const v = variant();
  const games = (v.games||[]).map(g=>({name:stripEmojiLabel(g.name), dur:parseDur(g.duration), kern:g.kern===true}));
  const rit = DATA.signatureRitual||{};
  const rows=[]; const reserve=[]; let t=start; let essenDone=false;
  const push=(dur,tit,sub,tag)=>{ rows.push({t:fmtHM(t),tit,sub,tag}); t+=dur; };
  push(Math.min(RIT,Math.max(10,endCap-t)), L.ritualTit||'Ankommen & Aufnahme',
       (typeof L.ritualSub==='function' ? L.ritualSub(rit.name||L.ritualFallback||'') : (L.ritualSub||'')), 'ritual');
  /* Gate Z1 (04.08.): Das LETZTE Spiel ist der Abschluss — Urkunden, Zeremonie,
     Dienstgrade. Es stand hinten in der Queue und fiel deshalb als erstes in die
     Reserve, wenn die Zeit knapp wurde. Ausgerechnet der Moment, fuer den Eltern
     die Party machen, verschwand also zuerst. Sein Platz wird jetzt freigehalten
     wie der fuers Essen: FIN ist in jedem need-Check mit drin, und das Finale
     wird erst NACH der Schleife gesetzt. */
  const finale = games.length>2 ? games[games.length-1] : null;
  const spielbar = finale ? games.slice(0,-1) : games;
  const FIN = finale ? finale.dur+5 : 0;
  const queue=[]; const firstTwo=spielbar.slice(0,2), rest=spielbar.slice(2);
  firstTwo.forEach(g=>queue.push({game:g})); queue.push({essen:true}); rest.forEach(g=>queue.push({game:g}));
  /* Baustelle-Gate M1/M2 + Feuerwehr-Z1-Rest (11.08.): kern:true-Spiele sind das
     Herzstueck ihrer Fassung (Sabotage-Krimi, Schrauben-Schatzsuche) — als hintere
     Queue-Eintraege fielen sie zuerst in die Reserve, waehrend Ritual, FAQ und
     parentTips genau diese Spiele erzaehlen. Ihr Platz wird jetzt wie Essen und
     Finale FREIGEHALTEN: jeder need-Check reserviert zusaetzlich die Dauer aller
     noch ausstehenden kern-Spiele — notfalls faellt dafuer ein Fuellspiel davor. */
  const kernAhead=i=>queue.slice(i+1).reduce((s,x)=>s+(x.game&&x.game.kern?x.game.dur+5:0),0);
  for(let qi=0; qi<queue.length; qi++){
    const item=queue[qi];
    if(item.essen){
      const hold=FIN+kernAhead(qi);
      const d=Math.max(Math.min(ESSEN,endCap-t-hold),0);
      if(d>=ESSEN_MIN){ push(d, L.essenTit||'Kuchen & Snacks', L.essenSub||'', 'menu'); }
      else if(endCap-t-hold>=10){ push(endCap-t-hold, L.essenKompaktTit||'Kuchen & Snacks (kompakt)', L.essenKompaktSub||'', 'menu'); }
      essenDone=true; continue;
    }
    const need=item.game.dur+5 + (essenDone?0:ESSEN_MIN) + FIN + kernAhead(qi);   /* Platz fuer Essen, Finale UND kern-Spiele freihalten */
    if(t+need<=endCap){ push(item.game.dur+5, item.game.name, L.spielSub||'Anleitung auf der Spielkarte in Teil III.', 'spiel'); }
    else reserve.push(item.game);
  }
  if(finale){
    if(t+FIN<=endCap){ push(FIN, finale.name, L.spielSub||'Anleitung auf der Spielkarte in Teil III.', 'spiel'); }
    else reserve.push(finale);   /* nur bei pathologisch kurzem Fenster */
  }
  const remaining = endCap-t;
  if(remaining>=10) push(remaining, L.freiTit||'Freies Spiel', L.freiSub||'', '');
  /* Re-Check N1: bei pathologisch kurzem Fenster (<15 Min) darf die Uebergabe nie vor dem Zeiger liegen */
  rows.push({t:fmtHM(Math.max(end-UEBERGABE,t)), tit:L.uebergabeTit||'Übergabe & Urkunden', sub:L.uebergabeSub||'', tag:'ritual'});
  rows.push({t:fmtHM(Math.max(end,t)),           tit:L.endeTit||'Ende — Abholung',          sub:L.endeSub||'',       tag:''});
  return {rows, reserve, timeAssumed, endAssumed};
}

/* ---------- Boot ---------- */
async function boot(){
  const q = new URLSearchParams(location.search);
  const demo = q.get('demo')==='1';
  const mid = CFG().id||'';
  let id = (q.get('id')||q.get('p')||'').replace(/[^a-z0-9]/gi,'');
  let tok = (q.get('edit')||q.get('token')||'').replace(/[^a-z0-9]/gi,'');
  // Token-Hygiene: editToken ist der einzige Schluessel zur Party. Er darf NICHT dauerhaft
  // in der Adresszeile stehen (Umami trackt Pageview-URLs; Verlauf/Screenshots leaken).
  // -> in sessionStorage sichern, URL sofort bereinigen; Reload holt ihn aus dem Storage.
  /* Gate-MAJOR 1 (30.07.): Storage und URL-Bereinigung in GETRENNTEN try-Bloecken.
     Wirft sessionStorage (Safari "Alle Cookies blockieren", geblockte Site-Daten),
     muss replaceState TROTZDEM laufen — sonst bleibt der Token in der URL und
     geht mit der Umami-Pageview an den Drittanbieter. Key je Party-ID (Zweittab-safe). */
  try{
    if(tok && id){ sessionStorage.setItem('paketAuth:'+id, tok); }
    else if(id){ const s=sessionStorage.getItem('paketAuth:'+id); if(s) tok=s; }
  }catch(e){ /* Storage gesperrt: Token bleibt in-memory fuer diesen Load */ }
  try{
    if(q.has('edit')||q.has('token')){
      q.delete('edit'); q.delete('token');
      history.replaceState(null,'',location.pathname+(q.toString()?('?'+q.toString()):''));
    }
  }catch(e){}
  const st = document.getElementById('status');
  try{
    if(demo){
      PARTY = Object.assign({}, window.DEMO_PARTY);
      /* ?demo=1&age=4|10: alle drei Altersgruppen testbar (Gate-Empfehlung W9 —
         zwei der fuenf MAJORs lagen exakt in den ungetesteten klein/gross-Pfaden)

         06.08.: Dieser Schalter war einen halben Tag lang tot, und zwar durch die
         Aenderung von genau diesem Tag. Seit gruppeVonParty() ZUERST p.ageGroup
         liest und DEMO_PARTY.ageGroup fest auf "6-8" steht, blieb jedes ?age= ohne
         Wirkung: ?age=4 und ?age=11 luden beide die mittel-Fassung. Damit war der
         dokumentierte Testweg in genau die zwei Pfade blind, in denen die Fehler
         sitzen. Das Alter muss deshalb auch die Gruppe umsetzen. */
      const da=parseInt(q.get('age'),10);
      if(isFinite(da)&&da>=3&&da<=12){ PARTY.age=String(da); PARTY.ageGroup=ageGroup(da); }
      HASTOKEN = true;
      /* Gate-UNSICHER U4 (verifiziert): party.machsleicht.de/demo liefert 404 — Demo-QRs
         haetten Tester ins Leere geschickt. Im Demo zeigt der Party-Link auf die Demo selbst. */
      PARTYURL = location.origin + location.pathname + '?demo=1';
    }
    else{
      if(!id){ st.innerHTML='<div class="card"><b>Kein Party-Link.</b><br>Dieses Paket wird aus deiner Partyseite gebaut. Öffne es über den Button im <a href="/kindergeburtstag">Planer</a> — oder schau dir die <a href="?demo=1">Beispiel-Vorschau</a> an.</div>'; return; }
      const r = await fetch('https://party.machsleicht.de/api/party/'+encodeURIComponent(id)+(tok?('?edit='+encodeURIComponent(tok)):''));
      if(!r.ok) throw new Error('Party nicht gefunden (HTTP '+r.status+')');
      PARTY = await r.json();
      HASTOKEN = !!(tok && PARTY && PARTY.editToken);   /* voller Datensatz nur mit korrektem Token */
      PARTYURL = 'https://party.machsleicht.de/'+id;
    }
    PAGEBASE = location.origin + location.pathname;
    const grp = gruppeVonParty(PARTY);
    /* Die im Wizard gewaehlte Variante uebernehmen. VARIANT stand vorher fest auf
       'standard' und aenderte sich nur, wenn der Kaeufer den Umschalter FAND —
       wer "Wow" gebucht hatte, sah beim Oeffnen das Standard-Paket. */
    if(PARTY.ambition==='minimal' || PARTY.ambition==='standard' || PARTY.ambition==='wow'){
      VARIANT = PARTY.ambition;
    }
    /* Bolle-Entscheid 10.08.2026: Die Schatzsuche/Stations-Mission ist im Paket
       GENERELL zurueckgestellt — sie war ein zweites, nie im Zeitplan gerechnetes
       Programm (Baustelle-Erstgutachten M3/M13/M14). Der Content bleibt in
       data/schatzsuche.json erhalten; kommt sie zurueck, dann als PLAN-OPTION
       (BirthdayProject modules.treasure) mit echtem Timeline-Slot — dieser
       Schalter ist dann die einzige Stelle. SCHATZ=null laesst shStations()
       und schatzMatBlock() leer rendern. */
    const MISSION_IM_PAKET = false;
    /* Ausnahme: bereits GEDRUCKTE Stationskarten verkaufter Pakete tragen
       ?s=N-QR-Codes — deren Handy-Ansicht muss weiter funktionieren. */
    const sWunsch = parseInt(q.get('s'),10);
    const missionAbruf = MISSION_IM_PAKET || (isFinite(sWunsch) && sWunsch>=1);
    const [dr, sr] = await Promise.all([
      fetch('/data/motto/'+mid+'-'+grp+'.json'),
      missionAbruf ? fetch('/data/schatzsuche.json').catch(function(){ return null; }) : Promise.resolve(null)
    ]);
    if(!dr.ok) throw new Error((CFG().dataLabel||'Motto-Daten')+' fehlen ('+grp+')');
    DATA = await dr.json();
    try{
      if(sr && sr.ok){ const all=await sr.json(); SCHATZ=(Array.isArray(all)?all:[]).find(function(x){return x&&x.id===mid;})||null; }
    }catch(e){ SCHATZ=null; }
    /* Stations-Modus (?s=N) — QR-Ziel am Handy: eine Station gross + Vorleser */
    const sIdx = parseInt(q.get('s'),10);
    if(isFinite(sIdx) && sIdx>=1){
      try{ if(window.plausible) plausible('paket_station',{props:{motto:mid, s:String(sIdx)}}); }catch(e){}
      st.style.display='none';
      window.renderStation(sIdx, grp);
      return;
    }
    try{ if(window.plausible) plausible('paket_view',{props:{motto:mid, demo: demo?'1':'0', full: HASTOKEN?'1':'0'}}); }catch(e){}
    st.style.display='none';
    document.getElementById('toolbar').style.display='flex';
    buildVswitch();
    window.render();
    /* F3: Ein QR-Ausfall (Script blockiert/Ladefehler) war vorher lautlos — der Host haette es
       erst nach dem Druck von 15 Blaettern gemerkt. Jetzt sichtbar VOR dem Drucken. */
    if(typeof MLQR==='undefined'){
      const w=document.createElement('div');
      w.className='screen-only';
      /* Gate-m2 (01.08.): --pk-* existierte nie im Palette-Vertrag — die Warnung fiel still auf
         Piraten-Farben zurueck. Jetzt echte Vertragsvariablen (Fallback nur fuer den Havariefall). */
      w.style.cssText='max-width:760px;margin:18px auto -8px;padding:12px 16px;border-radius:12px;background:var(--rust,#A5402B);color:var(--paper,#F7E9CB);font-size:14px;font-weight:600;text-align:center';
      w.textContent='⚠️ Die QR-Codes konnten nicht geladen werden — bitte die Seite neu laden, bevor du druckst. (Die Links stehen als Text auf den Karten.)';
      /* Re-Check N2: VOR #dossier einhaengen, nicht hinein — render() setzt dort innerHTML
         und haette die Warnung beim ersten Variantenwechsel wieder geschluckt. */
      var dEl=document.getElementById('dossier'); dEl.parentNode.insertBefore(w,dEl);
    }
  }catch(err){
    st.innerHTML='<div class="card">⚠️ '+esc(err.message||'Konnte das Paket nicht laden.')+'<br>Bitte lade die Seite neu oder öffne den Link aus deiner E-Mail erneut.</div>';
  }
}

return {
  boot,
  /* Helpers */
  esc, esclink, ageAdjustFor, poss, fmtDate, parseHM, fmtHM, stripEmojiLabel, ageGroup,
  gruppeVonParty,
  /* Daten-Zugriff */
  party:      ()=>PARTY,
  data:       ()=>DATA,
  schatz:     ()=>SCHATZ,
  hasToken:   ()=>HASTOKEN,
  partyUrl:   ()=>PARTYURL,
  variant, confirmedGuests, buildVswitch,
  /* Logik */
  qrBlock, stationUrl, guestUrl, speak,
  roleLabel, roleMission, splitInvites,
  parseDur, buildTimeline
};
})();
