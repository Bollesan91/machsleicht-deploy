# Diff zur Begutachtung — machsleicht, 03.09.2026

Stand `7bef485f` gegen `f5089f65`. Nur was ausgeliefert wird; `_dev/`, `validate-all.sh`,
`BACKLOG-AUDIT.md` und `.gitignore` sind ausgeklammert (Werkzeug, geht nicht live).

## Umfang in Zahlen

| | |
|---|---|
| geänderte ausgelieferte Dateien | 107 |
| davon rein mechanisch (Cache-Buster `?v=`, Bildpfade) | 98 |
| davon inhaltlich | 9 |
| Zeilen jenseits von Buster/Bild | 74 |

Die 98 mechanischen Dateien tragen je ein bis zwei geänderte Zeilen desselben Musters.
Sie stehen unten als Zusammenfassung mit Stichproben, nicht als 200 Diff-Zeilen.

---

## TEIL A — die inhaltlichen Änderungen, vollständig

```diff
    diff --git a/einladung/erstellen/index.html b/einladung/erstellen/index.html
    index 47c9af35..b08a85af 100644
    --- a/einladung/erstellen/index.html
    +++ b/einladung/erstellen/index.html
    @@ -236,7 +236,11 @@ window.plausible.init=function(){};window.plausible.q=[];
         <div class="row">
           <div class="field">
             <label for="date">Datum</label>
    -        <input type="text" id="date" placeholder="z.B. Samstag, 15. Mai" required>
    +        <!-- H-1(b): type="date" liefert JJJJ-MM-TT. Der fruehere Freitext ("z.B. Samstag, 15. Mai")
    +             ging unveraendert an die Spiele: die core-Familie rechnete daraus bei 8 von 12
    +             Monaten einen falschen Wochentag im Jahr 2001. Ausgerechnet "Mai" war einer der
    +             vier harmlosen Monate — der Platzhalter verdeckte den Fehler, den er verursachte. -->
    +        <input type="date" id="date" required>
           </div>
           <div class="field">
             <label for="time">Uhrzeit</label>
    @@ -508,7 +512,9 @@ const MOTTO_CONFIG = {
       const nameParam = params.get('name');
       if (nameParam) { const el = document.getElementById('name'); if (el) el.value = nameParam; }
       const dateParam = params.get('datum');
    -  if (dateParam) { const el = document.getElementById('date'); if (el) el.value = dateParam; }
    +  // Nur ISO vorbelegen: ein <input type="date"> verwirft jeden anderen Wert stillschweigend,
    +  // das Feld saehe dann grundlos leer aus.
    +  if (dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam)) { const el = document.getElementById('date'); if (el) el.value = dateParam; }
       const timeParam = params.get('uhrzeit');
       if (timeParam) { const el = document.getElementById('time'); if (el) el.value = timeParam; }
       const ortParam = params.get('ort');
    diff --git a/index.html b/index.html
    index 1be3324f..54435c83 100755
    --- a/index.html
    +++ b/index.html
    @@ -279,7 +279,7 @@ window.plausible.init=function(){};window.plausible.q=[];
         </div>
     
         <h2 style="font-size:22px;margin:0 0 16px">Schatzsuche und Schnitzeljagd</h2>
    -    <p style="font-size:15px;line-height:1.7;margin:0 0 24px">Thema wählen, Alter einstellen, Schatzkarte und Stationen drucken — in 10 Minuten startklar. Der <a href="/schatzsuche"><strong>Schatzsuche-Builder</strong></a> erstellt eine komplette <a href="/schnitzeljagd">Schnitzeljagd</a> mit 15 Themen, 225 altersgerechten Stationen, interaktiver Schatzkarte mit Emoji-Deko und Ort-Eingabe pro Station. Auch <a href="/schatzsuche-drinnen">drinnen</a> und <a href="/schnitzeljagd-draussen">draußen</a> möglich.</p>
    +    <p style="font-size:15px;line-height:1.7;margin:0 0 24px">Thema wählen, Alter einstellen, Schatzkarte und Stationen drucken — in 10 Minuten startklar. Der <a href="/schatzsuche"><strong>Schatzsuche-Builder</strong></a> erstellt eine komplette <a href="/schatzsuche-kindergeburtstag">Schnitzeljagd</a> mit 15 Themen, 225 altersgerechten Stationen, interaktiver Schatzkarte mit Emoji-Deko und Ort-Eingabe pro Station. Auch <a href="/schatzsuche-drinnen">drinnen</a> und <a href="/schnitzeljagd-draussen">draußen</a> möglich.</p>
     
         <!-- Schatzkarte Vorschau -->
         <div style="background:linear-gradient(145deg,#f5efe6,#ede4d4);border-radius:20px;padding:20px;margin:0 0 28px;max-width:380px">
    diff --git a/netlify/functions/serve-invite.mjs b/netlify/functions/serve-invite.mjs
    index fac90298..5a8a8e39 100755
    --- a/netlify/functions/serve-invite.mjs
    +++ b/netlify/functions/serve-invite.mjs
    @@ -61,6 +61,24 @@ export default async (req) => {
           ? `/spiele/game-${data.game}-${motto}.html`
           : `/einladung/${motto}/whatsapp/`;
     
    +    // H-1(b): dieselbe Familienunterscheidung wie im Worker (party-worker.js:1877 ff.).
    +    // core (spiele/core/core.js) formatiert ein ISO-Datum selbst; die Legacy-Apps unter
    +    // /einladung/<motto>/whatsapp/ drucken den Parameter ROH und brauchen fertigen deutschen
    +    // Text. Bis heute ging der Freitext aus dem Formular unveraendert an beide.
    +    // Nicht-ISO wird unveraendert durchgereicht: alte Kurzlinks tragen noch Freitext, und
    +    // core druckt ihn seit 02.09. roh, statt einen Wochentag daraus zu rechnen.
    +    // Eigene Monats-/Wochentagsnamen statt toLocaleDateString: eine Netlify-Function ohne
    +    // vollstaendiges ICU faellt sonst stumm auf Englisch zurueck.
    +    if (/^\d{4}-\d{2}-\d{2}$/.test(data.date) && !basePath.startsWith("/spiele/")) {
    +      const TAGE = ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];
    +      const MONATE = ["Januar","Februar","März","April","Mai","Juni","Juli","August",
    +                      "September","Oktober","November","Dezember"];
    +      const d = new Date(data.date + "T12:00:00Z");
    +      if (!isNaN(d)) {
    +        params.set("date", `${TAGE[d.getUTCDay()]}, ${d.getUTCDate()}. ${MONATE[d.getUTCMonth()]} ${d.getUTCFullYear()}`);
    +      }
    +    }
    +
         return new Response(null, {
           status: 302,
           headers: {
    diff --git a/schatzsuche-drinnen.html b/schatzsuche-drinnen.html
    index 9ca55ea3..402bf42e 100755
    --- a/schatzsuche-drinnen.html
    +++ b/schatzsuche-drinnen.html
    @@ -325,7 +325,7 @@ window.plausible.init=function(){};window.plausible.q=[];
           <a href="/schatzsuche-kindergeburtstag" style="text-decoration:none"><div class="card u-emoji-cell"><p style="font-weight:700;color:var(--d)">Schatzsuche Kindergeburtstag</p><span class="u-fs12 u-clr-m">Alle Varianten</span></div></a>
           <a href="/kindergeburtstag-drinnen" style="text-decoration:none"><div class="card u-emoji-cell"><p style="font-weight:700;color:var(--d)">Kindergeburtstag drinnen</p><span class="u-fs12 u-clr-m">Alle Spiele-Ideen</span></div></a>
           <a href="/kindergeburtstag-bei-regen" style="text-decoration:none"><div class="card u-emoji-cell"><p style="font-weight:700;color:var(--d)">Kindergeburtstag bei Regen</p><span class="u-fs12 u-clr-m">Notfall-Plan</span></div></a>
    -      <a href="/schnitzeljagd" style="text-decoration:none"><div class="card u-emoji-cell"><p style="font-weight:700;color:var(--d)">Schnitzeljagd Kindergeburtstag</p><span class="u-fs12 u-clr-m">Aufgaben & Ideen nach Alter</span></div></a>
    +      <a href="/schnitzeljagd-aufgaben" style="text-decoration:none"><div class="card u-emoji-cell"><p style="font-weight:700;color:var(--d)">Schnitzeljagd-Aufgaben</p><span class="u-fs12 u-clr-m">30 Ideen nach Alter</span></div></a>
         </div>
       </div>
     
    diff --git a/schatzsuche-kindergeburtstag.html b/schatzsuche-kindergeburtstag.html
    index c9e7fcab..5afa231c 100755
    --- a/schatzsuche-kindergeburtstag.html
    +++ b/schatzsuche-kindergeburtstag.html
    @@ -299,7 +299,7 @@ window.plausible.init=function(){};window.plausible.q=[];
           <a href="/kindergeburtstag-5-jahre" style="text-decoration:none"><div class="card u-emoji-cell"><p style="font-weight:700;color:var(--d)">Kindergeburtstag 5 Jahre</p><span class="u-fs12 u-clr-m">Altersgerecht planen</span></div></a>
           <a href="/kindergeburtstag-drinnen" style="text-decoration:none"><div class="card u-emoji-cell"><p style="font-weight:700;color:var(--d)">Schatzsuche drinnen</p><span class="u-fs12 u-clr-m">Für kleine Räume</span></div></a>
           <a href="/kindergeburtstag-draussen" style="text-decoration:none"><div class="card u-emoji-cell"><p style="font-weight:700;color:var(--d)">Schatzsuche draußen</p><span class="u-fs12 u-clr-m">Im Garten & Park</span></div></a>
    -      <a href="/schnitzeljagd" style="text-decoration:none"><div class="card u-emoji-cell"><p style="font-weight:700;color:var(--d)">Schnitzeljagd Kindergeburtstag</p><span class="u-fs12 u-clr-m">Ideen, Aufgaben & Unterschiede</span></div></a>
    +      <a href="/schnitzeljagd-aufgaben" style="text-decoration:none"><div class="card u-emoji-cell"><p style="font-weight:700;color:var(--d)">Schnitzeljagd-Aufgaben</p><span class="u-fs12 u-clr-m">30 Ideen nach Alter</span></div></a>
         </div>
       </div>
     
    diff --git a/schnitzeljagd-aufgaben.html b/schnitzeljagd-aufgaben.html
    index a9736631..10de3839 100644
    --- a/schnitzeljagd-aufgaben.html
    +++ b/schnitzeljagd-aufgaben.html
    @@ -98,8 +98,8 @@ footer a:hover{text-decoration:underline}
         {
           "@type": "ListItem",
           "position": 2,
    -      "name": "Kindergeburtstag",
    -      "item": "https://machsleicht.de/kindergeburtstag"
    +      "name": "Schatzsuche & Schnitzeljagd",
    +      "item": "https://machsleicht.de/schatzsuche-kindergeburtstag"
         },
         {
           "@type": "ListItem",
    @@ -114,7 +114,7 @@ footer a:hover{text-decoration:underline}
     <body>
     <main>
       <div class="header"><a href="/"><div class="logo"><span>mach's</span>leicht</div></a></div>
    -  <nav class="breadcrumb">machsleicht › <a href="/schnitzeljagd">Schnitzeljagd</a> › Aufgaben</nav>
    +  <nav class="breadcrumb">machsleicht › <a href="/schatzsuche-kindergeburtstag">Schatzsuche &amp; Schnitzeljagd</a> › Aufgaben</nav>
     
       <p class="badge">30 Ideen</p>
       <h1>🧩 Schnitzeljagd-Aufgaben für Kinder: 30 Ideen nach Alter</h1>
    @@ -317,7 +317,7 @@ footer a:hover{text-decoration:underline}
       <div class="related">
         <h3>Weiterlesen</h3>
         <div class="grid">
    -      <a href="/schnitzeljagd" style="text-decoration:none"><div class="card"><p style="font-weight:700;color:var(--d)">Schnitzeljagd Kindergeburtstag</p><span style="font-size:12px;color:var(--m)">Kompletter Guide</span></div></a>
    +      <a href="/schatzsuche-kindergeburtstag" style="text-decoration:none"><div class="card"><p style="font-weight:700;color:var(--d)">Schatzsuche &amp; Schnitzeljagd</p><span style="font-size:12px;color:var(--m)">Kompletter Guide</span></div></a>
           <a href="/schnitzeljagd-draussen" style="text-decoration:none"><div class="card"><p style="font-weight:700;color:var(--d)">Schnitzeljagd draußen</p><span style="font-size:12px;color:var(--m)">Outdoor-Strecken &amp; Verstecke</span></div></a>
           <a href="/schatzsuche-drinnen" style="text-decoration:none"><div class="card"><p style="font-weight:700;color:var(--d)">Schnitzeljagd drinnen</p><span style="font-size:12px;color:var(--m)">Indoor-Stationen</span></div></a>
         </div>
    diff --git a/schnitzeljagd-draussen.html b/schnitzeljagd-draussen.html
    index 2cf6ccba..343f3bdb 100644
    --- a/schnitzeljagd-draussen.html
    +++ b/schnitzeljagd-draussen.html
    @@ -93,8 +93,8 @@ footer a:hover{text-decoration:underline}
         {
           "@type": "ListItem",
           "position": 2,
    -      "name": "Kindergeburtstag",
    -      "item": "https://machsleicht.de/kindergeburtstag"
    +      "name": "Schatzsuche & Schnitzeljagd",
    +      "item": "https://machsleicht.de/schatzsuche-kindergeburtstag"
         },
         {
           "@type": "ListItem",
    @@ -109,7 +109,7 @@ footer a:hover{text-decoration:underline}
     <body>
     <main>
       <div class="header"><a href="/"><div class="logo"><span>mach's</span>leicht</div></a></div>
    -  <nav class="breadcrumb">machsleicht › <a href="/schnitzeljagd">Schnitzeljagd</a> › Draußen</nav>
    +  <nav class="breadcrumb">machsleicht › <a href="/schatzsuche-kindergeburtstag">Schatzsuche &amp; Schnitzeljagd</a> › Draußen</nav>
     
       <p class="badge">Outdoor-Guide</p>
       <h1>🌳 Schnitzeljagd draußen: Strecke, Verstecke &amp; Wetter-Plan</h1>
    @@ -248,7 +248,7 @@ footer a:hover{text-decoration:underline}
       <div class="related">
         <h3>Weiterlesen</h3>
         <div class="grid">
    -      <a href="/schnitzeljagd" style="text-decoration:none"><div class="card"><p style="font-weight:700;color:var(--d)">Schnitzeljagd Kindergeburtstag</p><span style="font-size:12px;color:var(--m)">Kompletter Guide</span></div></a>
    +      <a href="/schatzsuche-kindergeburtstag" style="text-decoration:none"><div class="card"><p style="font-weight:700;color:var(--d)">Schatzsuche &amp; Schnitzeljagd</p><span style="font-size:12px;color:var(--m)">Kompletter Guide</span></div></a>
           <a href="/schnitzeljagd-aufgaben" style="text-decoration:none"><div class="card"><p style="font-weight:700;color:var(--d)">30 Schnitzeljagd-Aufgaben</p><span style="font-size:12px;color:var(--m)">Nach Alter sortiert</span></div></a>
           <a href="/schatzsuche-drinnen" style="text-decoration:none"><div class="card"><p style="font-weight:700;color:var(--d)">Schnitzeljagd drinnen</p><span style="font-size:12px;color:var(--m)">Für schlechtes Wetter</span></div></a>
         </div>
    diff --git a/schnitzeljagd.html b/schnitzeljagd.html
    deleted file mode 100644
    index 3961ba6d..00000000
    --- a/schnitzeljagd.html
    +++ /dev/null
    @@ -1,13 +0,0 @@
    -<!DOCTYPE html>
    -<html lang="de">
    -<head>
    -  <meta charset="UTF-8">
    -  <meta http-equiv="refresh" content="0;url=/kindergeburtstag?modus=schatzsuche#planer">
    -  <meta name="description" content="Schnitzeljagd für den Kindergeburtstag — jetzt im Planer in wenigen Minuten erstellen.">
    -  <link rel="canonical" href="https://machsleicht.de/kindergeburtstag">
    -  <title>Weiterleitung — machsleicht.de</title>
    -</head>
    -<body>
    -  <p>Weiterleitung zum <a href="/kindergeburtstag?modus=schatzsuche#planer">Schnitzeljagd-Planer</a>...</p>
    -</body>
    -</html>
    diff --git a/spiele/core/core.js b/spiele/core/core.js
    index 00831d03..b0cb3185 100644
    --- a/spiele/core/core.js
    +++ b/spiele/core/core.js
    @@ -202,7 +202,17 @@ window.addEventListener('DOMContentLoaded',function(){
         const _hideKV=el=>{if(!el)return;const dt=el.previousElementSibling;if(dt&&dt.tagName==='DT')dt.style.display='none';el.style.display='none';};
         const dd=document.getElementById('wDate'),tt=document.getElementById('wTime'),pl=document.getElementById('wPlace');
         if(dd){const ds=p.get('date')||'';
    -      if(ds){const d=new Date(ds+'T12:00:00');dd.textContent=isNaN(d)?ds:d.toLocaleDateString('de-DE',{weekday:'long',day:'numeric',month:'long'});}
    +      // H-1 (live bestaetigt 02.09.): NUR strenges JJJJ-MM-TT wird selbst formatiert.
    +      // V8 parst "Samstag, 12. September"+"T12:00:00" LAX zu 2001-09-12, isNaN ist FALSE —
    +      // und core druckte "Mittwoch" auf eine Einladung, die samstags stattfindet. Betroffen sind
    +      // 8 von 12 Monaten (Jan, Feb, Apr, Jun, Jul, Aug, Sep, Nov); Maerz/Mai/Okt/Dez fielen auf
    +      // Rohtext und sahen deshalb heil aus — darunter ausgerechnet der Formular-Platzhalter
    +      // "z.B. Samstag, 15. Mai", weshalb es monatelang niemandem auffiel.
    +      // Der Worker gibt core schon heute ISO; der /e/-Weg (serve-invite.mjs) reicht Freitext
    +      // durch. Diese Zeile macht die Familie unabhaengig davon, WER sie aufruft: was nicht ISO
    +      // ist, wird roh gedruckt statt falsch gerechnet.
    +      if(ds){const _iso=/^\d{4}-\d{2}-\d{2}$/.test(ds);const d=_iso?new Date(ds+'T12:00:00'):null;
    +        dd.textContent=(d&&!isNaN(d))?d.toLocaleDateString('de-DE',{weekday:'long',day:'numeric',month:'long'}):ds;}
           else if(real)_hideKV(dd);}
         if(tt){const ts=p.get('time')||'';
           if(ts)tt.textContent=ts+' Uhr';
```

---

## TEIL B — die mechanischen Änderungen, zusammengefasst

### B1 · Cache-Buster (`?v=`)

```
       60 core/core.js?v=20260902
       60 core/core.js?v=20260802
       45 core/core.css?v=20260712
       45 core/core.css?v=20260708
        8 paket/core/paket.css?v=20260812
        8 paket/core/paket.css?v=20260804
        1 paket/core/paket-core.js?v=20260812
        1 paket/core/paket-core.js?v=20260804
```

Regel: das Datum im Buster darf nicht älter sein als die letzte Änderung der Zieldatei
(`git log`, nicht Dateizeit). Zwei Ursachen: die 60 Spiele luden `core.js` von vor den
fünf gegateten Blocker-Fixes vom 27.08.; und `core.js` wurde heute erneut geändert
(Teil A), was den Buster ein zweites Mal nachzieht.

### B2 · Vorschaubilder, die es nicht gab

21 Bilddateien wurden in 51 Zeilen auf 29 Seiten referenziert, ohne im Repo zu liegen —
also 404 in `og:image`, `twitter:image` und JSON-LD `image`/`publisher.logo`.

```
  logo.png            -> favicon-192x192.png   6x   (zwei Seiten nutzten das schon)
  og-detektiv-{3,6,9} -> og-detektiv.png       6x
  og-einhorn-{3,9}    -> og-einhorn.png        4x
  og-schatzsuche-*    -> og-schatzsuche.png    8x   (einhorn, feuerwehr, meerjungfrau, safari)
  Rest                -> og-default.png       27x   (dschungel, feen, superheld, Altersseiten, og-image.*)
```

Stichprobe:
```diff
  -<meta property="og:image" content="https://machsleicht.de/og-detektiv-3.png">
  +<meta property="og:image" content="https://machsleicht.de/og-detektiv.png">
  -<meta name="twitter:image" content="https://machsleicht.de/og-detektiv-3.png">
  +<meta name="twitter:image" content="https://machsleicht.de/og-detektiv.png">
```
