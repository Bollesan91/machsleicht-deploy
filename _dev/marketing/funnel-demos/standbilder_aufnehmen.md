# Die zwei Standbilder des Einladungsspiels — wie sie entstehen (10.09.2026)

`bilder/demo/spiel-1-suche.jpg` und `bilder/demo/spiel-2-jagd.jpg` sind das einzig Handgepflegte an der
Gaeste-Weg-Animation. Der Generator (`anim_bauen.py`) verlinkt sie nur. Voll skriptbar ist die Aufnahme
nicht — das Spiel will echte Doppelklicks, einen rendernden Tab und einen kurzen Moment, den man
abpassen muss. Aber sie ist reproduzierbar, wenn man diesen Weg geht. Wer sie je neu braucht (anderes
Motto, geaenderte Spielgrafik), faengt hier an, nicht bei null.

## Was die Bilder zeigen

| Datei | Moment | Maße |
|---|---|---|
| `spiel-1-suche.jpg` | Suchphase, 2 von 3 Schaetzen, Hinweis „🔥 Fast geschafft! Noch einer!" | 1260 × 1836 |
| `spiel-2-jagd.jpg` | Jagd: „🏃 Fang das Einhorn! · Schnapp dir Ida!", **Idas Foto in der Blase mitten im Feld** | 1260 × 1836 |

Faktor 3 auf ein Spielfenster von 420 × 612 CSS-px (Seitenverhaeltnis 0,6863 — dasselbe wie die
`aspect-ratio` der `.game-stills`-Karte im Fragment). JPEG-Qualitaet 0,93. Bolles Wort zur ersten
Fassung (Faktor 0,8, 336 × 489): „ekelhaft verpixelt" — und danach „mach nicht kleiner".

## Der Weg

1. **Spiel oeffnen**, Viewport 1280 × 720 (bei kleineren Fenstern skaliert das Spiel, die Geometrie unten
   stimmt dann nicht mehr):
   `https://machsleicht.de/einladung/einhorn/whatsapp/?name=Ida&date=Samstag%2C%206.%20November%202027&time=15%3A00&ort=Bei%20uns%20zuhause%20in%20Hamburg-Rahlstedt&age=6&foto=https%3A%2F%2Fparty.machsleicht.de%2Fapi%2Finvimg%2F8sp7bpf4s55q`
   Das `foto=` zeigt auf das Party-Foto; faellt die Demo-Party weg, tut es jede Bild-URL mit dem
   Demo-Kind (`/bilder/demo/ida.jpg`), wenn der Worker sie als Foto akzeptiert.
2. **html2canvas laden** (cdnjs, 1.4.1) und den Spielcontainer bestimmen — das groesste Element mit
   Seitenverhaeltnis ≈ 420/612:
   ```js
   window.__findZ = () => { const k = [...document.querySelectorAll('div,section,main')]
     .map(e => { const r = e.getBoundingClientRect(); return { e, h: r.height, q: r.width / r.height }; })
     .filter(o => o.h > 300 && Math.abs(o.q - 420/612) < 0.03); k.sort((a, b) => b.h - a.h); return k[0]?.e; };
   ```
3. **„🦄 Zauber starten!" klicken**, dann Objekte per **Doppelklick** einsammeln (das Spiel reagiert nur auf
   „2× tippen"). Antippbar ist, was `cursor:pointer` traegt; Koordinaten aus `getBoundingClientRect()`.
   Nach zwei Schaetzen steht „Fast geschafft! Noch einer!" — **Bild 1 hier aufnehmen.**
4. **Glanz ersetzen, vor jeder Aufnahme.** Die Sonne (56 px, Gelb→Pink) traegt
   `box-shadow: rgba(255,128,171,.35) 0 0 60px`. html2canvas kann keine Weichzeichnung und malt daraus
   eine harte rosa Scheibe ueber Stern-Knopf und Zaehler. Fuer die Aufnahme wird der Glanz als
   Radialverlauf gezeichnet — dasselbe Aussehen, mit Mitteln, die der Renderer beherrscht:
   ```js
   window.__glow = () => { const z = window.__findZ();
     const ball = [...z.querySelectorAll('div')].find(e => /rgba\(255, 128, 171, 0\.35\) 0px 0px 60px/.test(getComputedStyle(e).boxShadow) || e.dataset.glowBall);
     if (!ball || ball.dataset.glowBall) return; ball.dataset.glowBall = '1';
     const q = ball.getBoundingClientRect(), pr = ball.offsetParent.getBoundingClientRect(), R = 95;
     const g = document.createElement('div');
     g.style.cssText = `position:absolute;left:${q.left-pr.left+q.width/2-R}px;top:${q.top-pr.top+q.height/2-R}px;width:${2*R}px;height:${2*R}px;border-radius:50%;pointer-events:none;background:radial-gradient(circle, rgba(255,128,171,.34) 0%, rgba(255,128,171,.22) 28%, rgba(255,128,171,.08) 55%, rgba(255,128,171,0) 72%)`;
     ball.style.boxShadow = 'none'; ball.parentElement.insertBefore(g, ball); };
   ```
5. **Aufnehmen:**
   ```js
   window.__glow(); const c = await html2canvas(window.__findZ(), { scale: 3, backgroundColor: null, useCORS: true, imageTimeout: 0 });
   const a = document.createElement('a'); a.href = c.toDataURL('image/jpeg', 0.93); a.download = 'spiel-1-suche.jpg'; a.click();
   ```
6. **Bild 2 — die Jagd.** Weitere Objekte antippen, bis „OH NEIN! Ida hat den Stern geklaut!" erscheint;
   danach beginnt die Jagd („Schnapp dir Ida!"). **Ida fluechtet tatsaechlich aus dem Feld und kommt
   zurueck** — die Aufnahme muss warten, bis die Blase IM Feld steht, sonst fehlt das Foto:
   ```js
   const foto = await new Promise(async res => { const b = await (await fetch(document.querySelector('img[src*="invimg"]').src, { mode: 'cors' })).blob();
     const f = new FileReader(); f.onload = () => res(f.result); f.readAsDataURL(b); });
   const t0 = performance.now(); let ok = false;
   while (performance.now() - t0 < 9000 && !ok) { const z = window.__findZ(), r = z.getBoundingClientRect(), im = z.querySelector('img');
     if (im) { const q = im.getBoundingClientRect();
       if (q.left > r.left + 50 && q.right < r.right - 50 && q.top > r.top + 130 && q.bottom < r.bottom - 90 && /Schnapp dir|flüchtet/.test(z.innerText)) {
         im.src = foto;                                   // im SELBEN Zug: das Spiel baut den Bildknoten bei jedem Frame neu
         window.__glow();
         const c = await html2canvas(z, { scale: 3, backgroundColor: null, useCORS: true, imageTimeout: 0 });
         const a = document.createElement('a'); a.href = c.toDataURL('image/jpeg', 0.93); a.download = 'spiel-2-jagd.jpg'; a.click(); ok = true; } }
     if (!ok) await new Promise(r => setTimeout(r, 90)); }
   ```
7. Dateien nach `bilder/demo/` kopieren, Generator laufen lassen (`python _dev/marketing/funnel-demos/anim_bauen.py`),
   er bettet neu ein.

## Die Fallen, die diesen Weg gekostet haben

- **Der Bildknoten wird neu gebaut.** Ein `src`-Patch auf die data-URL war beim naechsten Frame weg —
  patchen und im selben Zug aufnehmen, kein `await` dazwischen ausser dem von html2canvas selbst.
- **Ida ist manchmal draussen.** Eine Aufnahme rein nach dem Text der Jagd traf eine Blase bei +860 px.
  Erst die Position pruefen (Schritt 6).
- **`Access-Control-Allow-Origin` ist per `fetch` nicht lesbar** — `headers.get(...)` gibt `null`, obwohl
  der Kopf da ist. Dass der cors-Fetch aufloest, ist der Beweis. Koepfe liest `curl`.
- **Ein nicht rendernder Tab liefert glatte, falsche Zahlen** (IntersectionObserver, rAF, Transitions
  stehen; der erste erzwungene Frame zeigt anlaufende Blenden statt des Zustands). Vor jeder Messung eine
  rAF-Probe; `visibilityState` reicht nicht.
- **Der Faktor** zwischen Screenshot-Rahmen und Viewport (z. B. 800/1280 = 0,625) gilt nur fuer diese
  Fenstergroesse — bei anderer Groesse neu ableiten, nicht uebernehmen.

## Offen

Echte Automatisierung (Playwright o. ae., kopfloser Chromium mit echten Pointer-Events und Frames), falls
die Bilder je pro Motto gebraucht werden. Bis dahin: dieser Weg, ~10 Minuten.
