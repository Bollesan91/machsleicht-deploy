# 10.09.2026 — Die Gaeste-Weg-Animation. Bolle: "gäste weg".
#
# GRUNDSATZ: nichts nachzeichnen. Die Bilder sind das ECHTE Markup der laufenden Partyseite,
# samt ihrem echten Stylesheet — nicht Screenshots (die veralten und sind unscharf) und nicht
# nachgebaute Attrappen (die zeigen eine UI, die es so nicht gibt).
# Neu erzeugen = dieses Skript nochmal laufen lassen.
#
# VIER BILDER, wie ein Gast sie erlebt:
#   1  Die WhatsApp-Nachricht trifft ein          (echter Text aus shareWA())
#   2  Persoenlicher Link: "Mia, deine Mission wartet!" + Regenbogen-Pass mit Rolle
#   3  Das Einladungsspiel mit dem Gesicht des Geburtstagskindes
#   4  Zusage steht, Wunsch reserviert
import io, os, re, sys, json, urllib.request
sys.stdout.reconfigure(encoding='utf-8', errors='replace')
os.chdir(r"C:\Users\Bolle\OneDrive - ADVERGY GmbH\Dokumente\Claude\Projects\machsleicht\machsleicht-deploy")

API = 'https://party.machsleicht.de'
PID = 'rmveztmvvarx'
GAST = 'vaj8ftedhugajhms'          # Mias persoenlicher Link
H = {'User-Agent': 'Mozilla/5.0 (compatible; demo/1.0)'}

def hol(p):
    with urllib.request.urlopen(urllib.request.Request(API + p, headers=H), timeout=45) as x:
        return x.read().decode('utf-8', 'replace')

seite = hol(f'/{PID}?g={GAST}')
print('Gaesteseite geladen:', len(seite), 'Zeichen')

# --- Stylesheet der echten Seite ---
styles = re.findall(r'<style[^>]*>(.*?)</style>', seite, re.S)
css = '\n'.join(styles)
assert len(css) > 3000, len(css)
print('CSS:', len(css), 'Zeichen aus', len(styles), 'Bloecken')

# --- Bausteine schneiden: von <div class="..."> bis zum passenden </div> ---
def block(marke, oeffner='<div class="card'):
    """Der DOM-Block, der `marke` enthaelt — per Klammerzaehlung auf div-Ebene.
    `oeffner` muss EXAKT sein: ein Praefix wie '<div class="hero' greift sonst die innerste
    Schachtel (hero-sub statt hero) — gemessen, nicht vermutet: der erste Versuch lieferte
    104 statt ~2000 Zeichen. Und `marke` darf nicht im <head> stehen: 'Wunschliste' kommt
    2x vor, der erste Treffer ist das og:description-Meta."""
    i = seite.find(marke)
    assert i > 0, marke
    start = seite.rfind(oeffner, 0, i)
    assert start > 0, (marke, oeffner)
    tiefe, j = 0, start
    while True:
        m = re.compile(r'</?div\b', re.S).search(seite, j)
        assert m, marke
        tiefe += 1 if m.group(0) == '<div' else -1
        j = m.end()
        if tiefe == 0:
            return seite[start:seite.index('>', j) + 1]

hero   = block('Mia, deine Mission wartet', '<div class="hero"')
passe  = block('REGENBOGEN-PASS')
spiel  = block('Einladungsspiel')
# Die Wunsch-EINTRAEGE entstehen erst im Browser (im ausgelieferten HTML steht nur die leere
# Huelle — "Wunschliste" kommt dort 2x vor, der erste Treffer ist das og:description-Meta).
# Deshalb ist diese eine Karte im GERENDERTEN Zustand aus der laufenden Seite gesichert:
# Fortschritt "1 von 5", "Vergeben"-Zustand, Sammelgeschenk mit "2 dabei, 35 EUR gesammelt".
SNAP = (r"C:\Users\Bolle\AppData\Local\Temp\claude"
        r"\C--Users-Bolle-OneDrive---ADVERGY-GmbH-Dokumente-Claude-Projects-machsleicht"
        r"\30adf155-342c-49fd-a38e-20b53a7dd804\scratchpad\wunschkarte.html")
wunsch = io.open(SNAP, encoding='utf-8', newline='').read()
assert 'Kuscheltier' in wunsch and 'Vergeben' in wunsch and '35 €' in wunsch
for n, b in [('hero', hero), ('pass', passe), ('spiel', spiel), ('wunsch', wunsch)]:
    print(f'  {n:7s} {len(b):6d} Zeichen')
    assert 200 < len(b) < 40000, (n, len(b))

# Das Foto haengt die echte Seite per JS ein (loadPhoto -> /api/photo/<id> -> #heroPhoto).
# Fuer ein Standbild muss es fest im Markup stehen, sonst zeigt der Hero ein Loch.
foto = json.loads(hol(f'/api/photo/{PID}')).get('photo', '')
assert foto.startswith('data:image/'), foto[:40]
print('Foto:', len(foto), 'Zeichen (data-URL)')
LOCH = '<div class="hero-photo-wrap" id="heroPhoto" style="display:none">'
assert hero.count(LOCH) == 1, hero.count(LOCH)
hero = hero.replace(LOCH, '<div class="hero-photo-wrap" style="display:block">'
                          f'<img src="{foto}" alt="">')

# Relative Bild-/Link-Pfade absolut machen, sonst zeigt die Animation Loecher.
def absolut(s):
    s = re.sub(r'(src|href)="/(?!/)', r'\1="' + API + '/', s)
    return re.sub(r'url\(/(?!/)', 'url(' + API + '/', s)
hero, passe, spiel, wunsch, css = map(absolut, (hero, passe, spiel, wunsch, css))

# Das Spiel bleibt DRIN. Erster Versuch hatte den iframe herausgeschnitten — Ergebnis gemessen:
# die Karte fiel von 789 auf 83 px zusammen, der Telefonbildschirm war leer. Und der iframe zeigt
# auf machsleicht.de, also dieselbe Herkunft wie die Seite, auf der dieser Baustein sitzt.
# Nur traege laden, damit die Startseite nicht auf ein Spiel wartet.
assert spiel.count('<iframe') == 1, spiel.count('<iframe')
spiel = spiel.replace('<iframe ', '<iframe loading="lazy" ', 1)

WA_TEXT = "\U0001F984 Ida's Einhorn!\n\nAlle Infos &amp; Zusage hier:\nparty.machsleicht.de/…"

TEIL = []
TEIL.append("""<!-- Gaeste-Weg, erzeugt aus der LAUFENDEN Partyseite. Neu erzeugen:
     _dev/marketing/funnel-demos/anim_bauen.py  -->
<div class="gw">
  <div class="gw__txt">
    <h2 class="gw__h">So erleben es deine G\u00e4ste</h2>
    <ol class="gw__steps">
      <li data-s="0"><b>Die Nachricht kommt</b><span>Ein Link in der Elterngruppe \u2014 mehr nicht.</span></li>
      <li data-s="1"><b>Jedes Kind wird pers\u00f6nlich begr\u00fc\u00dft</b><span>Mit eigener Rolle und eigener Mission.</span></li>
      <li data-s="2"><b>Und darf sofort spielen</b><span>Das Einladungsspiel mit dem Gesicht des Geburtstagskindes.</span></li>
      <li data-s="3"><b>Zusagen und Geschenk \u2014 ein Tipp</b><span>Kein Anruf, kein Zettel, keine doppelten Geschenke.</span></li>
    </ol>
    <a class="gw__cta" href="https://party.machsleicht.de/PLATZHALTER">Echte Partyseite ansehen \u2192</a>
  </div>

  <div class="gw__phone" aria-hidden="true">
    <div class="gw__screen">""")

TEIL.append('      <div class="gw__f" data-f="0"><div class="wa">'
            '<div class="wa__bar">Elterngruppe Kita Regenbogen</div>'
            '<div class="wa__b">' + WA_TEXT.replace('\n', '<br>') + '</div>'
            '<div class="wa__t">14:32 \u2713\u2713</div></div></div>')
TEIL.append('      <div class="gw__f" data-f="1"><div class="gw__scroll">' + hero + passe + '</div></div>')
TEIL.append('      <div class="gw__f" data-f="2"><div class="gw__scroll">' + spiel + '</div></div>')
TEIL.append('      <div class="gw__f" data-f="3"><div class="gw__scroll">' + wunsch + '</div></div>')

TEIL.append("""    </div>
    <div class="gw__dots">
      <i data-d="0"></i><i data-d="1"></i><i data-d="2"></i><i data-d="3"></i>
    </div>
  </div>
</div>

<style>
/* --- Stylesheet der echten Partyseite, auf den Telefonrahmen begrenzt --- */
.gw__screen{ all:initial; }
@scope (.gw__screen) {
""" + css + """
  /* Die Karten der echten Seite starten unsichtbar (opacity:0 + translateY(20px)) und werden
     dort von einem Einblend-Beobachter aufgedeckt. Den gibt es hier nicht — gemessen: zwei von
     vier Bildern blieben weiss. Im Standbild sind sie sofort da. */
  .fade-up, .fade-up-d1, .fade-up-d2, .fade-up-d3{opacity:1 !important;transform:none !important;animation:none !important}
}
/* --- Rahmen und Ablauf --- */
.gw{display:grid;grid-template-columns:1fr;gap:32px;align-items:center;max-width:1040px;margin:0 auto;padding:24px}
@media(min-width:900px){.gw{grid-template-columns:1fr 380px;gap:56px}}
.gw__h{font-size:clamp(24px,4vw,34px);line-height:1.15;margin:0 0 20px;text-wrap:balance}
.gw__steps{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:2px}
.gw__steps li{padding:12px 14px;border-radius:12px;border-left:3px solid transparent;opacity:.42;transition:opacity .45s,background .45s,border-color .45s}
.gw__steps li b{display:block;font-size:15px;margin-bottom:2px}
.gw__steps li span{font-size:13.5px;opacity:.75}
.gw__steps li.on{opacity:1;background:rgba(181,70,140,.07);border-left-color:#B5468C}
.gw__cta{display:inline-block;margin-top:22px;font-weight:700;font-size:15px;color:#B5468C;text-decoration:none;border-bottom:2px solid currentColor;padding-bottom:2px}
.gw__phone{justify-self:center;width:340px;max-width:100%;aspect-ratio:9/18.5;border-radius:38px;padding:11px;
  background:linear-gradient(160deg,#2a2a32,#14141a);box-shadow:0 24px 60px rgba(0,0,0,.28),0 2px 0 rgba(255,255,255,.14) inset;position:relative}
.gw__screen{display:block;width:100%;height:100%;border-radius:28px;overflow:hidden;background:#fff;position:relative}
.gw__f{position:absolute;inset:0;opacity:0;transition:opacity .6s ease;overflow:hidden}
.gw__f.on{opacity:1}
.gw__scroll{position:absolute;inset:0;overflow:hidden;transform-origin:top center}
.gw__dots{position:absolute;left:0;right:0;bottom:-26px;display:flex;gap:7px;justify-content:center}
.gw__dots i{width:7px;height:7px;border-radius:50%;background:currentColor;opacity:.22;transition:opacity .4s,transform .4s}
.gw__dots i.on{opacity:.85;transform:scale(1.35)}
/* WhatsApp-Standbild */
.wa{position:absolute;inset:0;background:#0b141a;padding:56px 14px 14px;font:14px/1.45 system-ui,sans-serif}
.wa__bar{position:absolute;top:0;left:0;right:0;height:46px;background:#1f2c34;color:#e9edef;display:flex;align-items:center;padding:0 14px;font-size:13px;font-weight:600}
.wa__b{background:#005c4b;color:#e9edef;border-radius:8px 8px 8px 2px;padding:9px 11px;max-width:88%;word-break:break-word}
.wa__t{color:#8696a0;font-size:11px;margin-top:4px;padding-left:4px}
@media(prefers-reduced-motion:reduce){.gw__f,.gw__steps li,.gw__dots i{transition:none}}
</style>

<script>
(function(){
  var wrap = document.currentScript.closest('.gw') || document.querySelector('.gw');
  var frames = wrap.querySelectorAll('.gw__f'), steps = wrap.querySelectorAll('.gw__steps li'),
      dots = wrap.querySelectorAll('.gw__dots i'), i = -1, timer = null;
  var DAUER = [3200, 3400, 3000, 3400];   // zusammen ~13 s
  // Jedes Bild auf die Bildschirmhoehe einpassen. Die echten Karten sind hoeher als ein
  // Telefon (Hero 672 px, Spielkarte 789, Wunschliste 767) — ungeskaliert saehe man von
  // jedem nur das obere Drittel. Gemessen statt geraten: der Faktor kommt aus scrollHeight.
  function einpassen(f){
    var s = f.querySelector('.gw__scroll'); if (!s) return;
    s.style.transform = 'none';
    var h = s.scrollHeight, frei = f.clientHeight;
    if (h > frei) s.style.transform = 'scale(' + Math.max(.55, frei / h) + ')';
  }
  function zeig(n){
    i = n % frames.length;
    einpassen(frames[i]);
    frames.forEach(function(f,k){ f.classList.toggle('on', k===i); });
    steps.forEach(function(s,k){ s.classList.toggle('on', k===i); });
    dots.forEach(function(d,k){ d.classList.toggle('on', k===i); });
    timer = setTimeout(function(){ zeig(i+1); }, DAUER[i]);
  }
  // Erst laufen, wenn sie sichtbar ist — und anhalten, wenn nicht.
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if (e.isIntersecting && timer === null) zeig(i < 0 ? 0 : i);
      else if (!e.isIntersecting && timer !== null) { clearTimeout(timer); timer = null; }
    });
  }, {threshold:.25});
  io.observe(wrap);
  steps.forEach(function(s,k){ s.addEventListener('click', function(){ clearTimeout(timer); zeig(k); }); s.style.cursor='pointer'; });
})();
</script>
""")

html = '\n'.join(TEIL).replace('PLATZHALTER', PID)
ZIEL = '_dev/marketing/funnel-demos/gaeste-weg.html'
os.makedirs(os.path.dirname(ZIEL), exist_ok=True)
io.open(ZIEL, 'w', encoding='utf-8', newline='\n').write(html)
print()
print('geschrieben:', ZIEL, '·', len(html), 'Zeichen')
for m, n in [('gw__f', 4), ('gw__steps li', 4), ('gw__dots i', 4)]:
    print(f'  {m:14s} {html.count(m)}x (erwartet >= {n})')
