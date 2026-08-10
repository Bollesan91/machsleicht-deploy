# REVIEW-PAKET: Premium-Paket Piraten-Pilot — 2026-07-30
Repo: Bollesan91/machsleicht-deploy (public), Branch draft, HEAD 5786e287b2363b96062e08fc91b11290477b8379

## WAS GEBAUT WURDE
Erster kaufbarer Baustein: /paket/piraten/ — ein ~15-Blatt-Druck-Dossier
(Cover, Minuten-Ablaufplan, Countdown, Einkauf+Menue, Deko+Kuchen, Spielkarten,
SOS-Karten, Urkunden je zugesagtem Gast, Tischkaertchen/Etiketten, Kuechen-Zettel
mit Allergien/Abholung/Wunschliste, Bordpost-Einladungen). Vollintegration:
- WORKER: fetcht party.machsleicht.de/api/party/<id>?edit=<token> (CORS-Whitelist
  enthaelt machsleicht.de; MIT Token volles Objekt inkl. guests/wishes/invites/address,
  OHNE Token gestripptes Public-Objekt -> Seite rendert dann mit Hinweisen statt Namen).
- DATEN: /data/motto/piraten-{klein,mittel,gross}.json (age -> Gruppe; variants
  minimal/standard/wow mit games[steps], shoppingList, food, decoration, giveaways;
  preparationWeeks; cakeRecipe; sosScenarios; signatureRitual).
- WIZARD (kindergeburtstag.html): paketPilotUrl() baut /paket/piraten/?id=..&edit=..
  aus state.partyseite.editUrl (Format https://party.machsleicht.de/<id>?edit=<tok>),
  NUR fuer motto piraten + aktive Partyseite. openWaitlist('print') oeffnet dann das
  echte Paket statt der Warteliste; Share-Block bekommt einen Paket-Button;
  Checkout-Kachel wird zur Laufzeit umgelabelt. Andere Mottos: unveraendert Warteliste.
- Sicherheit: alle Party-Daten (Gastnamen = FREMDE Eingaben via RSVP!) durch esc();
  editToken wird nach dem Laden in sessionStorage gesichert + per replaceState aus der
  URL entfernt (Umami trackt Pageview-URLs); meta referrer=no-referrer (Amazon-Links);
  meta robots noindex + _headers /paket/* X-Robots-Tag.
- ?demo=1 rendert eingebettete Beispieldaten (Playtest bestanden: 15 Blaetter,
  4 Namens-Urkunden, 0 Footer-Ueberlappungen auf Content-Blaettern, edit-Param-Strip verifiziert).
- BEWUSSTE CUTS (Pilot): keine QR-Codes (kein Encoder im Repo, Links als Text);
  kein Checkout (Pilot kostenlos, Lemon-Squeezy folgt); Einkaufsmengen NICHT auf
  Gaestezahl umgerechnet (Varianten-Basis, Gaestezahl wird angezeigt); nur Motto piraten.

## VOLLSTAENDIGE DATEIEN (selbst fetchen)
NEU: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/5786e287b2363b96062e08fc91b11290477b8379/paket/piraten/index.html
Daten-Beispiel: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/5786e287b2363b96062e08fc91b11290477b8379/data/motto/piraten-mittel.json

## PRUEFAUFTRAG — verifizieren, nicht ueberfliegen. Je Finding: woertliches Zitat +
MAJOR/MINOR/UNSICHER + konkrete Korrektur. Wenn korrekt: sagen.
1. XSS: Gastnamen/Wuensche/notes/address sind ANGREIFER-EINGABEN (RSVP ist oeffentlich).
   Pruefe JEDE Interpolation im Generator: gibt es EINE Stelle, wo Party-Daten ohne esc()
   in innerHTML landen? (Auch Attribute: href, style.) Rechne konkrete Payloads durch.
2. Token-Sicherheit: sessionStorage+replaceState — Luecken? (Reload, Zweittab, Umami-Event-
   Payloads, window.open vom Wizard mit noopener?) Leakt der Token noch irgendwo hin?
3. Ablauf-Arithmetik: parseHM/fmtHM/buildTimeline — Mitternachts-Wrap, endTime<time,
   time fehlt, 6 Spiele in 2h (minimal-Variante), negative remaining. Rechne nach.
4. Datenschema-Robustheit: klein/gross-JSONs (ageAdjust-Felder, minus6Weeks nur gross,
   fehlende steps/material) — wirft der Generator irgendwo auf undefined?
5. Wizard-Regression: openWaitlist-Weiche — bricht die Warteliste fuer NICHT-piraten oder
   ohne Partyseite? showPartyShare-Injektion idempotent (Resume-Restore ruft doppelt)?
   Kachel-Relabel: kann es faelschlich bei fremdem Motto greifen?
6. Public-Mode (ohne Token): rendert die Seite wirklich sinnvoll (guests undefined,
   guestCount vorhanden)? safe.guests=undefined im Worker — Zugriffe im Generator ok?
7. Print-CSS: @page A4, break-inside — offensichtliche Druck-Bruecken? Cover/cert min-height
   262mm sinnvoll? Farben mit print-color-adjust?
8. Rechtliches: Affiliate-Kennzeichnung im Paket ok (rel sponsored + Sternchen-Hinweis)?
   noindex-Kette vollstaendig? Pilot-Kommunikation ehrlich (kostenlos testen)?
9. Blinde Flecken: was fehlt, was haette der Autor pruefen muessen?

## DIFF (Wizard + Headers + Tooling; der Generator ist als Vollfile oben verlinkt)
```diff
diff --git a/.claude/launch.json b/.claude/launch.json
index ad51ecf..bc32483 100644
--- a/.claude/launch.json
+++ b/.claude/launch.json
@@ -18,6 +18,12 @@
       "runtimeExecutable": "python",
       "runtimeArgs": ["-m", "http.server", "8771", "--directory", "_dev/prototypes"],
       "port": 8771
+    },
+    {
+      "name": "paket-preview",
+      "runtimeExecutable": "python",
+      "runtimeArgs": ["-m", "http.server", "8788"],
+      "port": 8788
     }
   ]
 }
diff --git a/_headers b/_headers
index 4c475bb..680c016 100644
--- a/_headers
+++ b/_headers
@@ -22,6 +22,10 @@
 /plan
   X-Robots-Tag: noindex, follow
 
+# Premium-Paket (token-personalisiertes Produkt, Pilot 30.07.2026) — nie indexieren
+/paket/*
+  X-Robots-Tag: noindex, nofollow
+
 /cockpit
   X-Robots-Tag: noindex, follow
 
diff --git a/kindergeburtstag.html b/kindergeburtstag.html
index 9739fc2..e479493 100644
--- a/kindergeburtstag.html
+++ b/kindergeburtstag.html
@@ -2494,6 +2494,27 @@ window.plausible.init=function(){};window.plausible.q=[];
     window.__partyShareUrl = url; window.__partyShareText = shareMsg;
     const waEl = document.getElementById('psShareWa'); if(waEl) waEl.href = 'https://wa.me/?text=' + encodeURIComponent(shareMsg);
     const sb = document.getElementById('psShareBlock'); if(sb) sb.style.display = '';
+    // Premium-Paket-Pilot: nach Aktivierung einer PIRATEN-Party den echten Paket-Zugang zeigen
+    // (idempotent — Button nur einmal anlegen; Resume-Restore ruft showPartyShare erneut).
+    try{
+      const pu = paketPilotUrl();
+      if(pu && sb && !document.getElementById('psPaketBtn')){
+        const pbtn = document.createElement('a');
+        pbtn.id='psPaketBtn'; pbtn.href=pu; pbtn.target='_blank'; pbtn.rel='noopener';
+        pbtn.style.cssText='display:block;text-align:center;margin-top:10px;padding:13px 20px;border-radius:12px;background:#12324A;color:#F4E9CE;font-weight:800;font-size:14px;text-decoration:none;border:2px solid #B98724';
+        pbtn.textContent='🏴‍☠️ Dein Piraten-Komplettpaket ansehen (Pilot — kostenlos)';
+        pbtn.addEventListener('click', function(){ try{ if(window.plausible) plausible('paket_open',{props:{motto:'piraten', source:'share-block'}}); }catch(e){} });
+        sb.appendChild(pbtn);
+      }
+      if(pu){
+        // Checkout-Kachel ehrlich machen: fuer diese Party ist das Paket real ansehbar, keine Warteliste.
+        const card = document.querySelector('.checkout-card--premium');
+        if(card){
+          const btn = card.querySelector('.checkout-card__btn'); if(btn) btn.textContent='🏴‍☠️ Paket ansehen (Pilot)';
+          const pr = card.querySelector('.checkout-card__price'); if(pr) pr.innerHTML='Pilot <small style="font-size:12px;font-weight:700;color:#b08642">· kostenlos testen</small>';
+        }
+      }
+    }catch(e){}
   }
   // Edit-Link (privater Schluessel) per E-Mail sichern -> Worker send-edit-link (Resend). Nur ein eigener Link ist mailbar (editToken-Pflicht).
   async function autoSendEditLink(email){
@@ -2742,7 +2763,28 @@ window.plausible.init=function(){};window.plausible.q=[];
     document.getElementById('saveLaterModal').classList.add('open');
     setTimeout(() => document.getElementById('modalEmail').focus(), 100);
   }
+  // Premium-Paket-Pilot (30.07.2026): fuer Piraten-Partys mit aktiver Partyseite ist das
+  // Komplettpaket ECHT abrufbar (/paket/piraten/, liest Party per id+editToken). Andere
+  // Mottos bleiben Warteliste, bis ihre Reskins existieren. Token stammt aus der eigenen
+  // editUrl — es verlaesst nie die Domain-Familie (machsleicht.de -> party.machsleicht.de).
+  function paketPilotUrl(){
+    try{
+      if(((state.motto&&state.motto.id)||'') !== 'piraten') return '';
+      const eu = state.partyseite && state.partyseite.active && state.partyseite.editUrl;
+      if(!eu) return '';
+      const m = /party\.machsleicht\.de\/([a-z0-9]+)\?edit=([a-z0-9]+)/i.exec(eu);
+      return m ? ('/paket/piraten/?id='+m[1]+'&edit='+m[2]) : '';
+    }catch(e){ return ''; }
+  }
   function openWaitlist(product){
+    if(product === 'print'){
+      const pu = paketPilotUrl();
+      if(pu){
+        try{ if(window.plausible) plausible('paket_open', {props:{motto:'piraten', source:'checkout-card'}}); }catch(e){}
+        window.open(pu, '_blank', 'noopener');
+        return;
+      }
+    }
     setModalMode(product);
     try{ if(window.plausible) plausible('waitlist_open', {props:{product: product}}); }catch(e){}
     document.getElementById('saveLaterModal').classList.add('open');
```

Abschluss: MAJOR-Liste (0 = deploybar auf Bolle-Wort), MINORs, UNSICHER.
Score 0-100 nur Telemetrie.
