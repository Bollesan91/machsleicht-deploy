# Diff zum Review — Planer, 14.09.2026

`kindergeburtstag.html`, Basis `origin/main` = **acebbc22** (der Live-Stand), Ziel `draft`.
Zwei Commits: **f0a69877** (Weg zum Plan) und **31a4435e** (Spiel-Palette).
Der Reviewer bekommt diese Datei als raw-SHA-URL und liest sie selbst.

## Ist-Zustand vor dem Diff (gemessen, nicht erinnert)

1. `#toPlanBtn` trug inline `display:none`. Sichtbar wurde er nur ueber `showPlanBtn()`,
   und das rief seit Commit dfc1831c (07.09.) ausschliesslich `setExactAge()` mit einer
   gueltigen Zahl. Die Alters-Karten mit `onclick="pickAge(...)"` sind mit demselben Commit
   aus dem Markup verschwunden; `pickAge` steht seither ohne Aufrufer da.
   Live an acebbc22 gemessen: Altersfeld `value=""`, `state.exactAge=null`,
   `placeholder="7"` in 38 px, Platzhalterfarbe `rgb(117,117,117)` gegen `rgb(30,58,95)`
   fuer echten Text. Ohne getippte Zahl gab es keinen Weg zu Stufe 3 — die Stufenpunkte
   3 bis 5 sind `locked` mit `tabindex="-1"`.
2. Die Palette „Weiteres Spiel:" unter „Plan anpassen" zog nur aus der aktiven
   Aufwand-Variante (`v.games`). Gemessen am echten Renderpfad `renderElitePlan()` ueber
   `window.__planPool`, ueber alle 45 Motto/Alter-Kombinationen, Positivkontrolle
   Piraten 6-8 = 1: **32 von 45 boten null Alternativen** — dann rendert die Zeile gar nicht.
   Die Daten liegen aber da: jede Datei `data/motto/<motto>-<klein|mittel|gross>.json` traegt
   drei Varianten (minimal/standard/wow) mit je eigener Liste, zusammen 5 bis 15 verschiedene
   Spiele je Motto und Band.

## Stellen-Inventar (was der Diff anfasst, vollstaendig)

| Stelle | Was |
|---|---|
| Markup `#toPlanBtn` | `display:none` raus, Beschriftung ist jetzt „Erst Alter eintragen" |
| `setExactAge()`, ungueltige Zahl | `syncPlanGate()` statt Verstecken |
| `resumeWork()` | `syncPlanGate()` statt Verstecken |
| `showPlanBtn()` | ruft zusaetzlich `syncPlanGate()` |
| `syncPlanGate()` | deckt beide Luecken ab (Alter, dann Name) |
| `revealPlan()` | Reihenfolge getauscht: Alter vor Name |
| `renderPlanList()` `gByName` | Vereinigung aller Varianten, aktive zuerst und gewinnend |
| `renderPlanList()` `unused` | `Object.values(gByName)` statt `v.games` |
| Hinweis neben „Plan anpassen" | neuer Text ueber `_planEditHintText()` |
| `togglePlanEdit()` | zieht den Hinweis mit |

Nicht angefasst: `buildPlanActivities()` (die automatische Spielwahl), `v.shoppingList`,
das Generator-Fragment zwischen `<!-- GW:FRAGMENT -->` und `<!-- /GW:FRAGMENT -->`.

## Messungen nach dem Diff

| | vorher | nachher |
|---|---|---|
| Kombinationen ohne jede Spiel-Alternative | 32 von 45 | 1 von 45 (Dinos 9-12) |
| mindestens zwei Alternativen | — | 36 von 45 |
| Schnitt Alternativen | 0,5 | 3,1 |
| Piraten 6-8 (Positivkontrolle) | 1 | 4 |
| `validate-all.sh` | 0 FAIL / 8 Warnungen | 0 FAIL / dieselben 8 Warnungen |

Gate-Durchlauf am laufenden Planer, zwei Mottos, alle Zustaende: nach Motto-Wahl steht
„Erst Alter eintragen" (798x55 bei 1280 px, 250x55 bei 320 px); Klick ohne Alter setzt
`aria-invalid` und fokussiert `iqExactAge`; nach der Zahl „Erst Namen eintragen"; Klick ohne
Namen fokussiert `iqName`; nach dem Namen „Weiter zu deinem Plan"; Klick fuehrt auf Stufe 3
mit fuenf Spielen. 0 Konsolenfehler. Funktionsprobe Palette: ein Spiel aus der
minimal-Variante in einen standard-Plan gelegt — landet im Ablauf, verschwindet aus der
Palette, Anleitung rendert vollstaendig (892 Zeichen).

## Der Diff

```diff
diff --git a/kindergeburtstag.html b/kindergeburtstag.html
index bacb5e9d..4d4d293b 100644
--- a/kindergeburtstag.html
+++ b/kindergeburtstag.html
@@ -847,7 +847,12 @@ window.plausible.init=function(){};window.plausible.q=[];
         <button type="button" data-loc="park" onclick="pickLocationInline('park')">🌳 Park</button>
         <button type="button" data-loc="halle" onclick="pickLocationInline('halle')">🏟️ Halle</button>
       </div>
-      <button id="toPlanBtn" class="stage-advance__btn" style="display:none;margin-top:16px;width:100%;opacity:.6" onclick="revealPlan()">Erst Namen eintragen ✏️</button>
+      <!-- Der Knopf steht IMMER und benennt die erste Luecke (Alter, dann Name) statt zu verschwinden.
+           Bis 14.09.2026 war er bis zur ersten gueltigen Alterszahl display:none — und seit die Alters-Karten
+           dem Zahlenfeld gewichen sind (dfc1831c, 07.09.), gab es genau einen Weg dahin: eine Zahl tippen.
+           Wer den Platzhalter "7" fuer einen Wert hielt, sah nie einen Knopf und kam nie zum Plan.
+           syncPlanGate() setzt Text und Deckkraft, revealPlan() ist das Verhaltens-Gate. -->
+      <button id="toPlanBtn" class="stage-advance__btn" style="margin-top:16px;width:100%;opacity:.6" onclick="revealPlan()">Erst Alter eintragen 🎂</button>
       <div id="nameReqHint" role="alert" style="display:none;margin-top:8px;font-size:13px;color:#C0392B">Trag noch den Namen des Geburtstagskindes ein – dann wird der Plan persönlich. ✏️</div>
       <p style="margin-top:14px;font-size:12px;color:#7a7a7a;display:flex;align-items:flex-start;gap:6px;line-height:1.45">🔒 <span><strong style="color:#5A6473">Privat &amp; ohne Konto.</strong> Was du eingibst, bleibt auf deinem Gerät und wird nicht automatisch übertragen. Erst wenn du selbst etwas erstellst — eine Partyseite oder Einladung — verlässt es dein Gerät.</span></p>
     </div>
@@ -2173,7 +2178,7 @@ label{font-size:12px;font-weight:600;color:var(--m);text-transform:uppercase;let
          zu einer Zahl, die nicht mehr im Feld stand. Ungueltig = kein Alter: Gruppe weg, Knopf weg, die
          Info-Box sagt, was fehlt, und revealPlan verweigert ohne exactAge. */
       state.age = null;
-      try{ const _b = document.getElementById('toPlanBtn'); if(_b) _b.style.display = 'none'; }catch(e){}
+      try{ syncPlanGate(); }catch(e){}   // 14.09.: Knopf bleibt stehen und sagt "Erst Alter eintragen" — frueher verschwand er hier spurlos
       try{ ['stage3','stage4','stage5'].forEach(id => { const s = document.getElementById(id); if(s) s.classList.remove('revealed'); }); }catch(e){}   // Re-Check MINOR 5: enthuellte Stufen zeigten sonst still den 6-8-Fallback
     }
     try{ renderAgeInfo(); }catch(e){}                       // (c) NUR die Info-Box — nie renderAges(),
@@ -2302,7 +2307,7 @@ label{font-size:12px;font-weight:600;color:var(--m);text-transform:uppercase;let
     /* Review m2 (07.09.): Speicherstaende von vor dem Alters-Umbau tragen eine Gruppe, aber keine Zahl.
        Ohne Zahl kein Plan-Knopf und zurueck auf die Eckdaten — die eine Altersfrage gilt auch fuer Rueckkehrer. */
     const _ohneZahl = !state.exactAge;
-    try{ const tpb=document.getElementById('toPlanBtn'); if(tpb) tpb.style.display = _ohneZahl ? 'none' : ''; }catch(e){}
+    try{ syncPlanGate(); }catch(e){}   // 14.09.: sichtbar bleiben, die Beschriftung sagt was fehlt (frueher: ohne Zahl weg)
     if(_ohneZahl){ try{ showFlash('Bitte trag noch das genaue Alter ein — dann passt der Plan.'); }catch(e){} }
     goStage(_ohneZahl && (state.stage || 1) > 2 ? 2 : (state.stage || 1));
   }
@@ -2447,7 +2452,8 @@ label{font-size:12px;font-weight:600;color:var(--m);text-transform:uppercase;let
   // Aus pickAge UND setExactAge gerufen -> kein Eintrittspfad strandet. Bewusst NICHT aus syncEckdaten/initFunnel (dort ist state.age
   // per initFunnel-Default '6-8' -> sonst Virgin-Vorschau des Buttons).
   function showPlanBtn(){
-    const btn = document.getElementById('toPlanBtn'); if(btn) btn.style.display='';
+    const btn = document.getElementById('toPlanBtn'); if(btn) btn.style.display='';   // no-op, seit der Knopf immer steht — bleibt fuer Speicherstaende, die ihn versteckt tragen
+    try{ syncPlanGate(); }catch(e){}   // Beschriftung zieht mit: gueltiges Alter -> "Erst Namen eintragen" bzw. "Weiter zu deinem Plan"
     try{ document.querySelectorAll('#agesGrid .age-card').forEach(c=>{ c.style.outline = (c.dataset.age===state.age) ? '3px solid var(--accent,#1E3A5F)' : ''; }); }catch(e){}
     // Proaktiver Pflicht-Cue: nameReqHint zeigen, sobald der Button erscheint. KEIN Auto-Fokus hier — sonst zieht es den Blick ins
     // Namefeld, bevor der Nutzer den gerade erschienenen Button registriert (Reveal-Signal), erzeugt einen Fokus-Race mit
@@ -2490,16 +2496,19 @@ label{font-size:12px;font-weight:600;color:var(--m);text-transform:uppercase;let
     a.href='/einladung/studio/?'+p.toString();
   }
   function revealPlan(){
+    /* Reihenfolge 14.09.2026: Alter vor Name — dieselbe Reihenfolge, die syncPlanGate() beschriftet,
+       und dieselbe, in der die Felder auf der Seite stehen. Sonst sagt der Knopf "Erst Alter eintragen"
+       und der Klick springt ins Namefeld darunter. */
+    if(!state.exactAge){   // Review m1: kein Plan ohne gueltiges Alter (1-14)
+      try{ const _a = document.getElementById('iqExactAge'); if(_a){ _a.setAttribute('aria-invalid','true'); _a.scrollIntoView({behavior:'smooth', block:'center'}); setTimeout(()=>{try{_a.focus()}catch(e){}}, 350); } renderAgeInfo(); }catch(e){}
+      return;
+    }
     if(!state.name || !state.name.trim()){
       const hint = document.getElementById('nameReqHint'); if(hint) hint.style.display='';
       const nm = document.getElementById('iqName');
       if(nm){ nm.setAttribute('aria-invalid','true'); nm.setAttribute('aria-describedby','nameReqHint'); const ek = document.getElementById('eckdaten'); if(ek) ek.scrollIntoView({behavior:'smooth', block:'start'}); setTimeout(()=>{try{nm.focus()}catch(e){}}, 350); }   // W-FORMERR: Fehler auch fuer Screenreader/Tastatur ansagen
       return;   // KEIN goStage(3) ohne Namen
     }
-    if(!state.exactAge){   // Review m1: kein Plan ohne gueltiges Alter (1-14)
-      try{ const _a = document.getElementById('iqExactAge'); if(_a){ _a.setAttribute('aria-invalid','true'); _a.scrollIntoView({behavior:'smooth', block:'center'}); setTimeout(()=>{try{_a.focus()}catch(e){}}, 350); } renderAgeInfo(); }catch(e){}
-      return;
-    }
     const _nm = document.getElementById('iqName'); if(_nm){ _nm.removeAttribute('aria-invalid'); }
     const _h = document.getElementById('nameReqHint'); if(_h) _h.style.display='none';
     goStage(3);   // 08.09.2026 (Bolle): der Plan ist das Versprechen der Landingpages ("Plan in 10 Minuten") und damit der erste Aha-Moment.
@@ -2776,7 +2785,17 @@ label{font-size:12px;font-weight:600;color:var(--m);text-transform:uppercase;let
     const acts=_planTimes(ensurePlanActs(d,v));
     const gameCount=acts.filter(a=>a.kind==='game').length;
     const planStart=acts.length?acts[0].time:(state.time||''); const planEnd=acts.length?fmt(_toMin(acts[acts.length-1].time)+(+acts[acts.length-1].durationMin||10)):'';
-    const gByName={}; (v.games||[]).forEach(g=>gByName[g.name]=g);
+    /* 14.09.2026: Die Palette zieht aus ALLEN Varianten desselben Mottos und Altersbands, nicht nur
+       aus der aktiven. Vorher bot "Weiteres Spiel:" nur an, was in der aktiven Variante uebrig war —
+       bei 32 von 45 Motto/Alter-Kombinationen war das nichts; dann rendert die Zeile gar nicht und der
+       Plan wirkt festgenagelt (Bolle: "alle spiele sind fest"). Die AUTOMATISCHE Auswahl bleibt
+       unberuehrt: buildPlanActivities() zieht weiter aus v.games, die Aufwand-Stufe haelt also ihr
+       Versprechen. Erweitert wird nur, was man von Hand dazunehmen kann.
+       Aktive Variante zuerst und bei gleichem Namen gewinnend — ihre Fassung traegt die Alters- und
+       Ort-Anpassungen, die zu dieser Stufe gehoeren. */
+    const gByName={};
+    [v].concat((d.variants||[]).filter(x => x !== v))
+       .forEach(x => (x.games||[]).forEach(g => { if(!(g.name in gByName)) gByName[g.name]=g; }));
     const rows=acts.map(a=>{
       const fixed=(a.anchor==='start'||a.anchor==='end');
       const ctrl=fixed?'':`<span class="pl__ctrl"><button type="button" title="nach oben" onclick="planMove('${a.id}',-1)">▲</button><button type="button" title="nach unten" onclick="planMove('${a.id}',1)">▼</button><button type="button" class="pl__rm" title="entfernen" onclick="planRemove('${a.id}')">×</button></span>`;
@@ -2787,11 +2806,11 @@ label{font-size:12px;font-weight:600;color:var(--m);text-transform:uppercase;let
     }).join('');
     // ungenutzte Pool-Spiele zum Hinzufuegen
     const inPlan=new Set(acts.filter(a=>a.kind==='game').map(a=>a.gameName));
-    const unused=(v.games||[]).filter(g=>!inPlan.has(g.name) && (!/schatz(suche|spur|jagd)/i.test(g.name||'')||/nacht|stirnlampe/i.test(g.name||'')));
+    const unused=Object.values(gByName).filter(g=>!inPlan.has(g.name) && (!/schatz(suche|spur|jagd)/i.test(g.name||'')||/nacht|stirnlampe/i.test(g.name||'')));
     window.__planPool=unused.map(g=>g.name);
     const addGames=unused.length?`<div class="pl__add"><span class="pl__add-lbl">Weiteres Spiel:</span> ${unused.map((g,i)=>`<button type="button" class="pl__chip" onclick="planAddGame(${i})">+ ${esc(_cleanGameTitle(g.name))}</button>`).join('')}</div>`:'';
     return `<article class="mod plan-mod${window.__planEdit?' plan-mod--edit':''}"><header class="mod__head"><span class="mod__icon">🗓️</span><h3 class="mod__title">Dein Plan${planStart?' · '+esc(planStart)+'–'+esc(planEnd):''} · ${gameCount} Spiele</h3></header>
-      <p class="games-hint"><button type="button" class="plan-edit-toggle" id="planEditToggle" onclick="togglePlanEdit()" aria-pressed="${window.__planEdit?'true':'false'}">${window.__planEdit?'✓ Fertig angepasst':'✏️ Plan anpassen'}</button><span class="plan-edit-hint">Spiel antippen für die Anleitung.</span></p>
+      <p class="games-hint"><button type="button" class="plan-edit-toggle" id="planEditToggle" onclick="togglePlanEdit()" aria-pressed="${window.__planEdit?'true':'false'}">${window.__planEdit?'✓ Fertig angepasst':'✏️ Plan anpassen'}</button><span class="plan-edit-hint" id="planEditHint">${_planEditHintText()}</span></p>
       <div class="pl">${rows}</div>
       ${addGames}
       <div class="pl__addrow"><button type="button" class="pl__chip pl__chip--cust" onclick="togglePlanForm()">+ Eigener Programmpunkt</button>
@@ -3112,9 +3131,16 @@ label{font-size:12px;font-weight:600;color:var(--m);text-transform:uppercase;let
     const tpb = document.getElementById('toPlanBtn');
     if(!tpb) return;
     // KEIN disabled (Anti-Pattern: toter Button ohne Klick-Feedback). Button bleibt klickbar; revealPlan() ist das Verhaltens-Gate
-    // (zeigt Hint, scrollt zu #eckdaten, fokussiert iqName bei leerem Namen). Hier nur visueller Zustand + Label.
-    if(state.name && state.name.trim()){ tpb.style.opacity=''; tpb.style.cursor=''; tpb.textContent='Weiter zu deinem Plan →'; const h=document.getElementById('nameReqHint'); if(h) h.style.display='none'; }
-    else { tpb.style.opacity='.6'; tpb.style.cursor='pointer'; tpb.textContent='Erst Namen eintragen ✏️'; }
+    // (markiert das fehlende Feld, scrollt hin, fokussiert es — Alter wie Name). Hier nur visueller Zustand + Label.
+    /* 14.09.2026: deckt BEIDE Luecken ab, in der Reihenfolge der Felder auf der Seite — erst das Alter
+       (Zahlenfeld oben), dann der Name (Eckdaten darunter). Vorher kannte das Gate nur den Namen; das
+       fehlende Alter liess den Knopf verschwinden statt ihn zu beschriften. */
+    const fehltAlter = !state.exactAge;
+    const fehltName  = !state.name || !state.name.trim();
+    const h = document.getElementById('nameReqHint'); if(h && !fehltName) h.style.display='none';
+    if(fehltAlter){ tpb.style.opacity='.6'; tpb.style.cursor='pointer'; tpb.textContent='Erst Alter eintragen 🎂'; }
+    else if(fehltName){ tpb.style.opacity='.6'; tpb.style.cursor='pointer'; tpb.textContent='Erst Namen eintragen ✏️'; }
+    else { tpb.style.opacity=''; tpb.style.cursor=''; tpb.textContent='Weiter zu deinem Plan →'; }
   }
   // Possessiv nach Bolle-Konvention: Name + 's, ausser Zischlaut-Endung (s/ß/x/z) -> nur Apostroph (Mats').
   /* Verhaltensgleich mit poss() in paket/core/paket-core.js — Stufe 18 prueft das.
@@ -3124,6 +3150,13 @@ label{font-size:12px;font-weight:600;color:var(--m);text-transform:uppercase;let
      Der Zustand lebt bewusst NICHT im gespeicherten state: er ist eine Ansichtssache
      dieses Besuchs, kein Teil der Party. Beim naechsten Oeffnen liest man wieder. */
   window.__planEdit = false;
+  /* Ein Ort fuer beide Zustaende des Hinweises: renderPlanList setzt ihn beim Zeichnen,
+     togglePlanEdit beim Umschalten. Vorher stand nur "Spiel antippen fuer die Anleitung" da —
+     dass man Spiele ueberhaupt tauschen kann, sagte niemand. */
+  function _planEditHintText(){
+    return window.__planEdit ? 'Jetzt tauschen, verschieben, entfernen — oder einen eigenen Punkt ergänzen.'
+                             : 'Spiel antippen für die Anleitung. Spiele tauschen geht über „Plan anpassen“.';
+  }
   function togglePlanEdit(){
     window.__planEdit = !window.__planEdit;
     const box = document.querySelector('.plan-mod');
@@ -3133,6 +3166,8 @@ label{font-size:12px;font-weight:600;color:var(--m);text-transform:uppercase;let
       btn.textContent = window.__planEdit ? '✓ Fertig angepasst' : '✏️ Plan anpassen';
       btn.setAttribute('aria-pressed', window.__planEdit ? 'true' : 'false');
     }
+    const hint = document.getElementById('planEditHint');
+    if(hint) hint.textContent = _planEditHintText();
     try{ if(window.plausible) plausible('plan_edit_mode', {props:{an: window.__planEdit ? '1' : '0'}}); }catch(e){}
   }
   // Bolle 07.09.: gerader Apostroph ueberall (Marken-Stil wie in "mach's"), gleich mit party-worker.js und paket-core.js. Einzeiler bleibt Einzeiler — Stufe 18 liest ihn so.
```

## Was NICHT geloest ist (bewusst, nicht uebersehen)

Die Einkaufsliste folgt dem Plan nicht. Sie kommt aus `v.shoppingList` und aendert sich auch
vor diesem Diff nicht, wenn man ein Spiel entfernt (gemessen: Liste identisch vor und nach
`planRemove`). Das Material des einzelnen Spiels steht in seiner Anleitung. Eigenes Ticket.
