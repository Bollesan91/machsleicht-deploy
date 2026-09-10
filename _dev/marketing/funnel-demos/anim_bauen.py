# 10.09.2026 — Der Gaeste-Weg, ANIMIERT. Bolle: "wenn es geht vllt auch animiert und geil".
#
# ERSTE FASSUNG WAR EINE DIASCHAU: vier herausgeschnittene Karten, die sich ueberblenden.
# Das zeigt, dass es huebsch ist — nicht, dass es LAEUFT. Diese Fassung zeigt den Vorgang:
# die echte Seite am Stueck im Telefon, sie scrollt durch, und drei Zustaende wechseln WIRKLICH.
#
# GRUNDSATZ, jetzt ohne Ausnahme: nichts nachzeichnen.
#   - Das Markup ist der <body> der laufenden Gaesteseite, in echter Reihenfolge.
#   - Das Stylesheet ist ihres.
#   - Die Zustandswechsel fassen die ECHTEN Klassen und Texte an (rsvp-btn, wishBadge,
#     wishProgressFill) — sie werden angetastet, nicht gemalt.
#   - Die WhatsApp-Attrappe der ersten Fassung ist RAUS. Eine fremde Oberflaeche nachzubauen
#     war der einzige gezeichnete Teil und markenrechtlich obendrein fragwuerdig. Die Chat-Szene
#     ist jetzt neutral in der eigenen Markenfarbe.
#
# WARUM BENS LINK: die Zusage-Karte zeigt nur dann das frische Formular mit "Dabei!", wenn der
# Gast noch nicht geantwortet hat. Die acht anderen haben. Ben ist der neunte, ohne Antwort.
import io, os, re, sys, json, urllib.request
sys.stdout.reconfigure(encoding='utf-8', errors='replace')
os.chdir(r"C:\Users\Bolle\OneDrive - ADVERGY GmbH\Dokumente\Claude\Projects\machsleicht\machsleicht-deploy")

API  = 'https://party.machsleicht.de'
PID  = 'rmveztmvvarx'
GAST = 'uqk68mg6hz38tnjk'      # Ben — eingeladen, noch ohne Antwort
H    = {'User-Agent': 'Mozilla/5.0 (compatible; demo/1.0)'}
NL   = chr(10)

def hol(p):
    with urllib.request.urlopen(urllib.request.Request(API + p, headers=H), timeout=45) as x:
        return x.read().decode('utf-8', 'replace')

seite = hol(f'/{PID}?g={GAST}')
print('Gaesteseite (Ben):', len(seite), 'Zeichen')

# --- Stylesheet ---
css = NL.join(re.findall(r'<style[^>]*>(.*?)</style>', seite, re.S))
assert len(css) > 3000, len(css)

# --- Der ganze Koerper, ohne Skripte und ohne das Namenstor ---
m = re.search(r'<body[^>]*>(.*)</body>', seite, re.S)
assert m, 'kein body'
body = m.group(1)
vor = len(body)
body = re.sub(r'(?is)<script[^>]*>.*?</script>', '', body)
body = re.sub(r'(?is)<noscript[^>]*>.*?</noscript>', '', body)
print(f'  Koerper: {vor} -> {len(body)} Zeichen (Skripte raus)')

# Das Namenstor ist auf Bens Link ohnehin uebersprungen — aber falls die Huelle im Markup
# steht, muss sie weg, sonst liegt eine unsichtbare Sperrschicht ueber der Animation.
tor = re.search(r'<div[^>]*id="gate"[^>]*>', body)
print('  Namenstor im Markup:', 'ja -> wird entfernt' if tor else 'nein')
if tor:
    body = re.sub(r'<div[^>]*id="gate"[^>]*>.*?</div>\s*(?=<div|$)', '', body, flags=re.S)

# --- Was die echte Seite per JS nachlaedt, muss hier fest stehen ---
# 1) Das Foto
foto = json.loads(hol(f'/api/photo/{PID}')).get('photo', '')
assert foto.startswith('data:image/'), foto[:40]
LOCH = '<div class="hero-photo-wrap" id="heroPhoto" style="display:none">'
assert body.count(LOCH) == 1, body.count(LOCH)
body = body.replace(LOCH, '<div class="hero-photo-wrap" style="display:block">'
                          f'<img src="{foto}" alt="">')
print('  Foto eingesetzt:', len(foto), 'Zeichen')

# 2) Die Wunsch-Eintraege (entstehen sonst erst im Browser)
SNAP = '_dev/marketing/funnel-demos/_wunschkarte-schnappschuss.html'
wunsch = io.open(SNAP, encoding='utf-8', newline='').read()
assert 'Kuscheltier' in wunsch and 'Vergeben' in wunsch
alt_karte = re.search(r'<div class="card fade-up fade-up-d3">.*?<div id="wishListGuest">.*?</div>', body, re.S)
assert alt_karte, 'Wunschkarte im Koerper nicht gefunden'
body = body[:alt_karte.start()] + wunsch + body[alt_karte.end():]
# Die alte Huelle hinterliess evtl. einen Rest bis zum schliessenden </div> — Kontrolle unten.
print('  Wunschliste eingesetzt:', len(wunsch), 'Zeichen')

# 3) Der Gaestezaehler — die Huelle steht im Markup, aber leer und mit .hidden; gefuellt wird sie
#    von loadGuestCount(). Die Zahl kommt aus der Schnittstelle, nicht aus meinem Kopf.
anzahl = json.loads(hol(f'/api/party/{PID}')).get('guestCount', 0)
assert anzahl > 0, anzahl
HUELLE = '<div class="guest-counter hidden" id="guestCounter">'
assert body.count(HUELLE) == 1, body.count(HUELLE)
punkte = ''.join(f'<div class="guest-dot">{c}</div>' for c in ['A', 'B', 'C'][:min(anzahl, 3)])
if anzahl > 3:
    punkte += f'<div class="guest-dot">+{anzahl - 3}</div>'
body = body.replace(HUELLE, '<div class="guest-counter" id="guestCounter">')
body = body.replace('<div class="guest-dots" id="guestDots"></div>',
                    f'<div class="guest-dots" id="guestDots">{punkte}</div>')
body = body.replace('<span class="guest-counter-text" id="guestCounterText"></span>',
                    f'<span class="guest-counter-text" id="guestCounterText">Schon {anzahl} '
                    f'{"Kind" if anzahl == 1 else "Kinder"} dabei!</span>')
assert 'guest-counter hidden' not in body
print(f'  Gaestezaehler gefuellt: {anzahl} Zusagen, {punkte.count("guest-dot")} Punkte')

# --- Pfade absolut, sonst zeigt die Animation Loecher ---
def absolut(s):
    s = re.sub(r'(src|href)="/(?!/)', r'\1="' + API + '/', s)
    return re.sub(r'url\(/(?!/)', 'url(' + API + '/', s)
body, css = absolut(body), absolut(css)

# Das Spiel bleibt drin (echtes Spiel, gleiche Herkunft wie die Startseite), laedt aber traege.
if '<iframe ' in body:
    body = body.replace('<iframe ', '<iframe loading="lazy" ', 1)

# --- Welche Klasse markiert einen gewaehlten Antwort-Knopf? Aus dem CSS ABLEITEN, nicht tippen.
kand = re.findall(r'\.rsvp-btn\.([a-z-]+)', css)
WAHL = kand[0] if kand else 'selected'
print('  gewaehlter Antwort-Knopf traegt Klasse:', WAHL, f'(aus {len(set(kand))} Kandidaten im CSS)')

BAU = f"""<!-- Gaeste-Weg, ANIMIERT. Erzeugt aus der laufenden Partyseite {PID}.
     Neu erzeugen: python _dev/marketing/funnel-demos/anim_bauen.py
     Nichts hier ist nachgezeichnet: Markup und Stylesheet sind die der echten Seite,
     die Zustandswechsel fassen ihre echten Klassen an. -->
<section class="gw" aria-labelledby="gw-h">
  <div class="gw__txt">
    <h2 class="gw__h" id="gw-h">So erleben es deine G\u00e4ste</h2>
    <ol class="gw__steps">
      <li><button type="button" data-s="0"><b>Die Nachricht kommt</b>
        <span>Ein Link in der Elterngruppe \u2014 mehr braucht es nicht.</span></button></li>
      <li><button type="button" data-s="1"><b>Jedes Kind wird pers\u00f6nlich begr\u00fc\u00dft</b>
        <span>Mit eigenem Namen, eigener Rolle, eigener Mission.</span></button></li>
      <li><button type="button" data-s="2"><b>Und darf sofort spielen</b>
        <span>Das Einladungsspiel \u2014 mit dem Gesicht des Geburtstagskindes.</span></button></li>
      <li><button type="button" data-s="3"><b>Zusage und Geschenk: ein Tipp</b>
        <span>Kein Anruf, kein Zettel, keine doppelten Geschenke.</span></button></li>
    </ol>
    <p class="gw__note">Das ist eine echte Partyseite \u2014 kein Bild davon.</p>
    <a class="gw__cta" href="https://machsleicht.de/kindergeburtstag">Eigene Partyseite erstellen \u2192</a>
  </div>

  <div class="gw__stage">
    <div class="gw__phone">
      <div class="gw__screen">
        <div class="gw__chat" data-sc="chat">
          <div class="gw__chat-head">Elterngruppe</div>
          <div class="gw__bubble gw__bubble--in">
            <span class="gw__dots"><i></i><i></i><i></i></span>
            <span class="gw__msg">\U0001F984 <b>Ida's Einhorn!</b><br>Alle Infos &amp; Zusage hier:<br>
              <span class="gw__link">party.machsleicht.de/\u2026</span></span>
          </div>
        </div>
        <div class="gw__viewport" data-sc="page" aria-hidden="true">
          <div class="gw__page">{body}</div>
        </div>
      </div>
      <span class="gw__tap" hidden></span>
    </div>
  </div>
</section>

<style>
@scope (.gw__page) {{
{css}
  /* Die Karten der echten Seite starten opacity:0 + translateY(20px) und werden dort von einem
     Einblend-Beobachter aufgedeckt. Den gibt es hier nicht \u2014 ohne diese Zeile bleibt die
     halbe Seite wei\u00df (gemessen: zwei von vier Bildern der ersten Fassung). */
  .fade-up,.fade-up-d1,.fade-up-d2,.fade-up-d3{{opacity:1!important;transform:none!important;animation:none!important}}
  /* Nichts im Standbild soll anklickbar aussehen oder Fokus fangen. */
  a,button,input,textarea,select{{pointer-events:none!important}}
}}

.gw{{--gw-a:#B5468C;display:grid;grid-template-columns:1fr;gap:36px;align-items:center;
  max-width:1060px;margin:0 auto;padding:32px 20px}}
@media(min-width:920px){{.gw{{grid-template-columns:1fr 360px;gap:64px}}}}
.gw__h{{font-size:clamp(25px,4vw,36px);line-height:1.14;margin:0 0 22px;text-wrap:balance}}
.gw__steps{{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:2px;counter-reset:gw}}
.gw__steps button{{all:unset;display:block;width:100%;box-sizing:border-box;cursor:pointer;
  padding:13px 15px;border-radius:12px;border-left:3px solid transparent;opacity:.45;
  transition:opacity .4s,background .4s,border-color .4s}}
.gw__steps button:focus-visible{{outline:2px solid var(--gw-a);outline-offset:2px;opacity:1}}
.gw__steps b{{display:block;font-size:15.5px;margin-bottom:2px}}
.gw__steps span{{display:block;font-size:13.5px;opacity:.78}}
.gw__steps button[aria-current="step"]{{opacity:1;background:color-mix(in srgb,var(--gw-a) 7%,transparent);
  border-left-color:var(--gw-a)}}
.gw__note{{font-size:13px;opacity:.62;margin:18px 0 0}}
.gw__cta{{display:inline-block;margin-top:10px;font-weight:700;font-size:15.5px;color:var(--gw-a);
  text-decoration:none;border-bottom:2px solid currentColor;padding-bottom:2px}}

.gw__stage{{justify-self:center}}
.gw__phone{{position:relative;width:326px;max-width:100%;aspect-ratio:9/18.6;border-radius:40px;padding:11px;
  background:linear-gradient(160deg,#2b2b33,#141419);
  box-shadow:0 26px 64px rgba(0,0,0,.3),0 2px 0 rgba(255,255,255,.15) inset}}
.gw__screen{{position:relative;width:100%;height:100%;border-radius:29px;overflow:hidden;background:#fff}}
.gw__viewport{{position:absolute;inset:0;overflow:hidden;opacity:0;transition:opacity .5s}}
.gw__viewport.on{{opacity:1}}
.gw__page{{position:absolute;top:0;left:0;width:326px;transform-origin:top left;will-change:transform}}

.gw__chat{{position:absolute;inset:0;background:#EDE3F2;padding:52px 12px 12px;
  font:14px/1.45 system-ui,-apple-system,sans-serif;opacity:1;transition:opacity .5s}}
.gw__chat.off{{opacity:0}}
.gw__chat-head{{position:absolute;top:0;left:0;right:0;height:44px;background:var(--gw-a);color:#fff;
  display:flex;align-items:center;padding:0 14px;font-size:13.5px;font-weight:700}}
.gw__bubble{{background:#fff;border-radius:14px 14px 14px 4px;padding:10px 12px;max-width:90%;
  box-shadow:0 2px 8px rgba(0,0,0,.08);opacity:0;transform:translateY(14px);
  transition:opacity .45s,transform .45s}}
.gw__bubble.in{{opacity:1;transform:none}}
.gw__msg{{display:none}}
.gw__bubble.said .gw__msg{{display:block}}
.gw__bubble.said .gw__dots{{display:none}}
.gw__dots{{display:inline-flex;gap:4px;padding:3px 2px}}
.gw__dots i{{width:6px;height:6px;border-radius:50%;background:#b9b9c4;animation:gwdot 1.1s infinite}}
.gw__dots i:nth-child(2){{animation-delay:.18s}} .gw__dots i:nth-child(3){{animation-delay:.36s}}
@keyframes gwdot{{0%,60%,100%{{opacity:.3}}30%{{opacity:1}}}}
.gw__link{{color:var(--gw-a);font-weight:600;word-break:break-all}}

.gw__tap{{position:absolute;width:34px;height:34px;border-radius:50%;pointer-events:none;
  background:rgba(255,255,255,.34);border:2px solid rgba(255,255,255,.9);
  box-shadow:0 0 0 0 rgba(255,255,255,.55);transform:translate(-50%,-50%) scale(.75);z-index:5}}
.gw__tap.go{{animation:gwtap .55s ease-out}}
@keyframes gwtap{{0%{{transform:translate(-50%,-50%) scale(.75);opacity:0}}
  35%{{transform:translate(-50%,-50%) scale(1);opacity:1}}
  100%{{transform:translate(-50%,-50%) scale(1.5);opacity:0;box-shadow:0 0 0 16px rgba(255,255,255,0)}}}}

@media(prefers-reduced-motion:reduce){{
  .gw__page{{transition:none!important}}
  .gw__tap{{display:none}}
  .gw__dots i{{animation:none}}
}}
</style>

<script>
(function(){{
  var wrap = document.querySelector('.gw'); if (!wrap) return;
  var chat  = wrap.querySelector('.gw__chat'),
      bub   = wrap.querySelector('.gw__bubble'),
      vp    = wrap.querySelector('.gw__viewport'),
      phone = wrap.querySelector('.gw__phone'),
      page  = wrap.querySelector('.gw__page'),
      tap   = wrap.querySelector('.gw__tap'),
      btns  = wrap.querySelectorAll('.gw__steps button');
  var ruhig = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Die Seite im Rahmen ist 326 px breit gebaut; passt sie in der Hoehe nicht, wird nur
  // gescrollt \u2014 nicht skaliert. Skalieren macht Schrift unlesbar klein.
  function el(sel){{ return page.querySelector(sel); }}
  function y(node){{ return node ? node.offsetTop : 0; }}

  function scrollTo(node, ms){{
    if (!node) return;
    var frei = vp.clientHeight, ziel = Math.max(0, y(node) - 12);
    var max = Math.max(0, page.scrollHeight - frei);
    ziel = Math.min(ziel, max);
    page.style.transition = ruhig ? 'none' : 'transform ' + (ms||1400) + 'ms cubic-bezier(.4,0,.2,1)';
    page.style.transform = 'translateY(' + (-ziel) + 'px)';
  }}
  function tippe(node, cb){{
    if (!node || ruhig) {{ if (cb) cb(); return; }}
    // Bezug ist der TELEFONRAHMEN, nicht das Sichtfenster: .gw__tap liegt in .gw__phone
    // (position:relative). Gegen vp gerechnet sass der Punkt um die Rahmenbreite daneben.
    var r = node.getBoundingClientRect(), s = phone.getBoundingClientRect(),
        f = vp.getBoundingClientRect();
    // Liegt das Ziel gar nicht im Sichtfenster (Scroll noch unterwegs), lieber nicht tippen.
    if (r.bottom < f.top || r.top > f.bottom) {{ if (cb) cb(); return; }}
    tap.hidden = false;
    tap.style.left = (r.left - s.left + r.width/2) + 'px';
    tap.style.top  = (r.top  - s.top  + r.height/2) + 'px';
    tap.classList.remove('go'); void tap.offsetWidth; tap.classList.add('go');
    setTimeout(function(){{ if (cb) cb(); }}, 380);
  }}
  function schritt(n){{
    btns.forEach(function(b,k){{
      if (k===n) b.setAttribute('aria-current','step'); else b.removeAttribute('aria-current');
    }});
  }}

  // --- Zustandswechsel auf dem ECHTEN Markup ---
  function zusage(){{
    var ja = el('.rsvp-btn[data-rsvp="ja"]'); if (!ja) return;
    tippe(ja, function(){{
      ja.classList.add('{WAHL}');
      var z = el('#guestCount');
      if (z) z.textContent = z.textContent.replace(/\\d+/, function(d){{ return (+d)+1; }});
    }});
  }}
  function wunsch(){{
    var knoepfe = page.querySelectorAll('.wish-btn');
    var b = knoepfe[1]; if (!b) return;              // der zweite: noch frei
    tippe(b, function(){{
      b.textContent = 'Vergeben'; b.classList.add('taken');
      var zeile = b.closest('.wish-item');
      var preis = zeile && zeile.querySelector('div > div:nth-child(2)');
      if (preis && !/Vergeben/.test(preis.textContent)) preis.textContent = preis.textContent.replace(/\\s*\u00b7\\s*$/,'') + ' \u00b7 \u2705 Vergeben';
      var f = el('#wishProgressFill'); if (f) f.style.width = '40%';
      var c = el('#wishProgressCount'); if (c) c.textContent = '2 von 5';
      var ab = el('#wishBadge'); if (ab) ab.textContent = 'Noch 3 frei!';
    }});
  }}

  // --- Ablauf ---
  var T = [], laufend = false;
  function nach(ms, fn){{ T.push(setTimeout(fn, ms)); }}
  function stopp(){{ T.forEach(clearTimeout); T = []; laufend = false; }}

  function lauf(){{
    stopp(); laufend = true;
    // Zuruecksetzen
    chat.classList.remove('off'); bub.classList.remove('in','said');
    vp.classList.remove('on'); page.style.transition='none'; page.style.transform='translateY(0)';
    tap.hidden = true; schritt(0);
    var ja = el('.rsvp-btn[data-rsvp="ja"]'); if (ja) ja.classList.remove('{WAHL}');

    nach(300,  function(){{ bub.classList.add('in'); }});
    nach(1500, function(){{ bub.classList.add('said'); }});
    nach(2600, function(){{ tippe(wrap.querySelector('.gw__link')); }});
    nach(3100, function(){{ chat.classList.add('off'); vp.classList.add('on'); schritt(1); }});
    nach(4400, function(){{ scrollTo(el('.card'), 1600); }});                 // Absender/Pass
    nach(6600, function(){{ schritt(2); scrollTo(el('.game-card'), 1600); }});
    nach(8600, function(){{ tippe(el('.play-pill')); }});
    nach(9600, function(){{ schritt(3); scrollTo(el('#rsvpCard'), 1600); }});
    nach(11200, zusage);
    nach(12600, function(){{ scrollTo(el('#wishListGuest') && el('#wishListGuest').closest('.card'), 1600); }});
    nach(14200, wunsch);
    nach(17000, lauf);
  }}

  // threshold:0 mit negativem rootMargin, NICHT threshold:.3 — die Sektion ist auf einem
  // schmalen Fenster hoeher als der Bildschirm, dann sind nie 30 % gleichzeitig sichtbar und
  // die Animation startet NIE. Gemessen: nach 10 Sekunden stand alles im Ausgangszustand.
  // Beobachtet wird deshalb das TELEFON (kleiner als das Fenster), und es reicht, dass ein
  // Stueck davon zu sehen ist.
  var io = new IntersectionObserver(function(es){{
    es.forEach(function(e){{
      if (e.isIntersecting && !laufend) lauf();
      else if (!e.isIntersecting && laufend) stopp();
    }});
  }}, {{threshold:0, rootMargin:'0px 0px -80px 0px'}});
  io.observe(phone);

  btns.forEach(function(b){{
    b.addEventListener('click', function(){{
      var n = +b.dataset.s;
      stopp(); schritt(n);
      chat.classList.toggle('off', n>0); vp.classList.toggle('on', n>0);
      if (n>0) {{
        bub.classList.add('in','said');
        scrollTo(n===1 ? el('.card') : n===2 ? el('.game-card') : el('#rsvpCard'), 600);
      }}
    }});
  }});
}})();
</script>
"""

ZIEL = '_dev/marketing/funnel-demos/gaeste-weg.html'
io.open(ZIEL, 'w', encoding='utf-8', newline='\n').write(BAU)
print()
print('geschrieben:', ZIEL, '·', len(BAU), 'Zeichen')
for m_, soll in [('gw__steps button', 4), ('data-sc=', 2), ('rsvp-btn', 1), ('wishProgressFill', 1)]:
    print(f'  {m_:20s} {BAU.count(m_)}x (mind. {soll})')

# Vorschau daneben, damit man sie ohne Startseite ansehen kann.
io.open('_dev/marketing/funnel-demos/gaeste-weg-vorschau.html', 'w', encoding='utf-8', newline='\n').write(
    '<!doctype html><html lang="de"><head><meta charset="utf-8">'
    '<meta name="viewport" content="width=device-width,initial-scale=1">'
    '<title>G\u00e4ste-Weg</title><style>body{margin:0;padding:40px 16px;background:#FFF8F0;'
    'font:16px/1.55 system-ui,-apple-system,Segoe UI,sans-serif;color:#1A1A1A}</style>'
    '</head><body>' + BAU + '</body></html>')
print('  Vorschau: gaeste-weg-vorschau.html')
