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
#   - EINE AUSNAHME, und sie ist BOLLES ENTSCHEIDUNG, nicht meine: die Chat-Szene ist gezeichnet.
#     Er hat sie ausdruecklich so bestellt ("soll aussehen wie ein echtes WhatsApp Fenster,
#     Name des Kontakts... Idas Mama"). Sie traegt die bekannten Farben — #075E54 Kopfleiste,
#     #ECE5DD Grund, #027EB5 Links, die zwei Haken. KEIN Logo, KEINE Wortmarke.
#     Mein frueherer Kommentar an dieser Stelle behauptete "neutral in der eigenen Markenfarbe" —
#     das war falsch und stand schon in der Datei. Die Marke ist #B5468C, davon steht im Chat
#     nichts. Ein Kommentar, der eine Zusage behauptet, die der Code nicht haelt, ist schlimmer
#     als keiner: er wird beim naechsten Lesen geglaubt. Gefunden vom Pruefstand durch Nachmessen
#     der berechneten Farben.
#     Die INHALTE der Vorschau sind echt: og:title und og:image der laufenden Partyseite.
#
# WARUM BENS LINK: die Zusage-Karte zeigt nur dann das frische Formular mit "Dabei!", wenn der
# Gast noch nicht geantwortet hat. Die acht anderen haben. Ben ist der neunte, ohne Antwort.
import io, os, re, sys, json, urllib.request
sys.stdout.reconfigure(encoding='utf-8', errors='replace')
os.chdir(r"C:\Users\Bolle\OneDrive - ADVERGY GmbH\Dokumente\Claude\Projects\machsleicht\machsleicht-deploy")

# GATE gegen die zweite Sitzung. Steht NACH dem chdir, weil der Sperrpfad relativ zur Repo-Wurzel ist. Dieses Skript schreibt vier Dateien im Baum. Der Pruefstand
# sperrt den Baum mit _dev/.lintlogs/AKTIV, solange seine Subagenten den unkommittierten Stand
# lesen — ein Schreibzugriff waehrenddessen macht die Lesung wertlos (passiert am 10.09. um
# 15:23, weil die Sperre nur ANGEZEIGT wurde und die Kette weiterlief). Also: Datei da -> Ende,
# bevor irgendetwas geschrieben wird. Nicht als Warnung, als Abbruch.
def sperre_pruefen():
    # Vor JEDEM Write erneut: zwischen Gate und erstem Write liegen zwei Netzabrufe von bis zu 45 s,
    # und der Einbett-Schritt schreibt zwei Seiten nacheinander (Pruefstand: 'Halbschrieb').
    if os.path.exists('_dev/.lintlogs/AKTIV'):
        sys.exit('SPERRE STEHT (' + io.open('_dev/.lintlogs/AKTIV', encoding='utf-8').read().split(chr(10))[0] + ') — Write abgebrochen.')
if os.path.exists('_dev/.lintlogs/AKTIV'):
    sys.exit('SPERRE STEHT (' + io.open('_dev/.lintlogs/AKTIV', encoding='utf-8').read().split(chr(10))[0]
             + ') — Generator schreibt nichts. Spaeter neu starten.')

API  = 'https://party.machsleicht.de'
PID  = '8sp7bpf4s55q'                       # Demo-Party, neu angelegt 10.09.2026: 06.11.2027, Familie Sommer (fiktiv), ohne Telefon
# WURZELPFADE, bewusst nicht absolut. Alles, was das Fragment braucht — Standbilder, Foto,
# Schriften — liegt in DIESEM Repo, und das Fragment wird auf machsleicht.de eingebettet. Ein
# Wurzelpfad ist damit ueberall gleiche Herkunft: live, auf localhost:8766, in einer Netlify-
# Branch-Vorschau. Die absolute https://machsleicht.de/-Fassung vom Vormittag brauchte CORS fuer
# die Schriften (die Hauptseite schickt keins), scheiterte in jeder lokalen Vorschau und haette
# einer Branch-Vorschau still Produktionsbilder untergeschoben (Pruefstand, 10.09.).
# Preis: die Vorschaudatei per Doppelklick (file://) laedt keine Bilder — sie gehoert ueber den
# lokalen Server geoeffnet, siehe Hinweis in ihrem Kopf.
DEMOBILD = '/bilder/demo'
FOTO     = DEMOBILD + '/ida.jpg'          # Kopie von spiele/core/demo-kid.jpg, Begruendung beim Foto-Einsatz
GAST = 'kzdw3yhge6smdreb'      # Ben — eingeladen, noch ohne Antwort
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
# Das Tor heisst id="codeGate", nicht "gate" — der Regex fand nichts, meldete 'nein', und das Tor mit
# eigenem <h1>, Eingabefeld und onclick="checkCode()" ging seit dem ersten Lauf ins Fragment (Gutachten
# W17c). Jetzt: das Element samt Nachfahren per Tag-Zaehler herausschneiden — ein `.*?</div>` traefe bei
# geschachtelten divs zu frueh und liesse Reste plus eine kaputte Bilanz zurueck.
def schneide_element(s, start):
    tiefe = 0
    for m in re.finditer(r'<div\b|</div>', s[start:]):
        tiefe += 1 if m.group(0) == '<div' else -1
        if tiefe == 0:
            ende = start + m.end(); return s[:start] + s[ende:], ende - start
    raise AssertionError('Namenstor: kein schliessendes </div>')
tor = re.search(r'<div[^>]*id="codeGate"[^>]*>', body)
assert tor, 'Namenstor id="codeGate" nicht im Markup — hat sich die Partyseite geaendert?'
h1_vor = body.count('<h1')
body, weg = schneide_element(body, tor.start())
# ... und die zwei Kommentare, die das Tor ankuendigen bzw. abschliessen — sie gingen sonst an jeden Besucher
# und verweisen auf ein Element, das es nicht mehr gibt (Re-Check).
body, n_k = re.subn(r'\s*<!--\s*(?:CODE GATE|PARTY CONTENT)\b.*?-->', '', body, flags=re.S)
assert n_k == 2, n_k
assert 'checkCode' not in body and 'id="codeGate"' not in body
assert body.count('<h1') == h1_vor - 1, (h1_vor, body.count('<h1'))
print(f'  Namenstor entfernt: {weg} Zeichen, <h1> {h1_vor} -> {body.count(chr(60) + "h1")}')

# --- Was die echte Seite per JS nachlaedt, muss hier fest stehen ---
# 1) Das Foto
# Frueher kam es als data-URL von /api/photo — 40.035 Zeichen base64, 46 % des Fragments, auf
# JEDER Seite mitgeladen, in die es eingebettet ist. Jetzt EINE Datei fuer Hero und Chat-Vorschau:
# bilder/demo/ida.jpg, eine Kopie von spiele/core/demo-kid.jpg (md5 4c89dea5faf6; demo_bauen.py
# hat genau diese Datei als Party-Foto hochgeladen, daher liefern /api/photo und /api/ogimg
# dieselben Bytes). Warum Kopie und nicht Verweis: /spiele/* traegt `X-Robots-Tag: noindex`
# (_headers) — gesetzt fuer die Spiel-Huellen, nicht fuer die Startseite. Ein Verweis dorthin
# haette die Startseite an eine Regel gekoppelt, die jemand aus einem anderen Grund aendert.
# 30 KB gegen eine unsichtbare Kopplung. (Pruefstand, 10.09.2026)
IDA = FOTO
assert os.path.exists(FOTO.lstrip('/')), FOTO + ' fehlt'
LOCH = '<div class="hero-photo-wrap" id="heroPhoto" style="display:none">'
assert body.count(LOCH) == 1, body.count(LOCH)
body = body.replace(LOCH, '<div class="hero-photo-wrap" style="display:block">'
                          f'<img src="{IDA}" alt="Ida" width="400" height="400" loading="lazy" decoding="async">')
print('  Foto eingesetzt: Datei', IDA, os.path.getsize(FOTO.lstrip('/')), 'Bytes')

# 2) Die Wunsch-Eintraege (entstehen sonst erst im Browser)
SNAP = '_dev/marketing/funnel-demos/_wunschkarte-schnappschuss.html'
wunsch = io.open(SNAP, encoding='utf-8', newline='').read()
assert 'Kuscheltier' in wunsch and 'Vergeben' in wunsch
# Bis zum ECHTEN Kartenende matchen — dem Affiliate-Hinweis und seinem </div>. Die erste Fassung
# endete am ersten </div> nach wishListGuest; der Rest der alten Karte (Hinweis-Absatz plus
# </div>) blieb stehen. Folge: ein </div> zu viel, das auf der Wirtsseite den naechsten
# Container schliesst (gemessen: der Absatz danach landete im body). Der Kommentar darunter
# sagte 'Kontrolle unten' — die gab es nicht. Jetzt: Bilanz-Assert direkt hier.
alt_karte = re.search(r'<div class="card fade-up fade-up-d3">.*?<div id="wishListGuest">.*?Affiliate-Links[^<]*</p>\s*</div>', body, re.S)
assert alt_karte, 'Wunschkarte im Koerper nicht gefunden'
bilanz_vor = len(re.findall(r'<div\b', body)) - body.count('</div>')
body = body[:alt_karte.start()] + wunsch + body[alt_karte.end():]
assert body.count('Links enthalten ggf. Affiliate-Links') == 1, body.count('Links enthalten ggf. Affiliate-Links')
assert len(re.findall(r'<div\b', body)) - body.count('</div>') == bilanz_vor, 'Wunschkarte verschiebt die Div-Bilanz'
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
# ERLAUBNISLISTE: absolut wird nur, was der Worker wirklich bedient — /api/ und /go/. Alles
# andere (Schriften, Bilder, Rechtslinks) bleibt Wurzelpfad und ist auf machsleicht.de gleiche
# Herkunft. Die erste Fassung war eine Verbotsliste (?!fonts/|spiele/|bilder/): was spaeter
# im Hauptrepo dazukaeme (/assets/, /media/), waere stillschweigend auf den Worker gewandert —
# dieselbe Bauart wie die Feldliste in party-worker.js:543. (Pruefstand, 10.09.2026)
# Gemessen am Ergebnis: heute erreicht KEINE Worker-URL das fertige Fragment, weil /api/ und
# /go/ in spaeteren Schritten ersetzt werden — die Zaehlung unten macht das sichtbar.
WORKER = r'(?=(?:api|go)/)'
def absolut(s):
    s = re.sub(r'(src|href)="/' + WORKER, r'\1="' + API + '/', s)
    return re.sub(r'url\(/' + WORKER, 'url(' + API + '/', s)
body, css = absolut(body), absolut(css)
print(f"  auf den Worker gelegt (Zwischenstand): {body.count(API + '/') + css.count(API + '/')}")

# Kontrolle statt Umbiegen: absolut() laesst /fonts/ in Ruhe, die Schriften bleiben Wurzelpfade.
assert css.count(API + '/fonts/') == 0, 'absolut() hat die Schriften auf den Worker gelegt'
assert css.count('url(/fonts/') >= 2, css.count('url(/fonts/')
print(f"  Schriften als Wurzelpfad belassen: {css.count('url(/fonts/')}")

# Die Partyseite hat einen Druckmodus: "body *{visibility:hidden}" und "#partyPass{position:
# fixed}" — sinnvoll, wenn die Partyseite selbst gedruckt wird. Eingebettet ist es ein Angriff
# auf die Wirtsseite: wer die Startseite druckt, bekaeme ein leeres Blatt mit dem Demo-Partypass
# oben links. Die Regel steht ZWEIMAL, einmal in einem <style> mitten im Markup, einmal im CSS,
# und beide Male landet sie AUSSERHALB des @scope (gemessen: die einzige nicht-.gw-Regel dort).
# Also raus, aus beiden Quellen. Das war der offene Pruefstand-Punkt zum Druckmodus.
def ohne_print(s):
    """Entfernt jede @media-Regel, deren Vorspann 'print' enthaelt — auch `print and (...)` und
    `screen, print` — per Klammerzaehler, beliebig tief. Der fruehere Regex fing nur `@media print{`
    mit einer Klammerebene; sein Assert war fuer alles andere vakuum-wahr (Gutachten W17a)."""
    n = 0
    while True:
        m = re.search(r'@media[^{;]*\bprint\b[^{;]*\{', s)
        if not m: return s, n
        i, t = m.end(), 1
        while t and i < len(s):
            t += (s[i] == '{') - (s[i] == '}'); i += 1
        assert t == 0, 'Klammern in @media print gehen nicht auf'
        s = s[:m.start()] + s[i:]; n += 1
body, n_b = ohne_print(body); css, n_c = ohne_print(css); vor_druck = n_b + n_c
body = re.sub(r'<style>\s*</style>', '', body)          # was nur die Druckregel trug, ist jetzt leer
assert not re.search(r'@media[^{;]*\bprint\b', body) and not re.search(r'@media[^{;]*\bprint\b', css)
assert 'visibility:hidden' not in body and 'visibility:hidden' not in css, 'Druck-Sperre lebt noch'
print(f'  Druckregeln entfernt: {vor_druck}')

# @keyframes-NAMEN SIND NICHT GESCOPT. @scope kapselt Selektoren, keine Keyframe-Namen. Die
# Partyseite definiert fadeUp und pulse — beide Wirtsseiten auch (Planer, Startseite), und es
# gewinnt, wer zuletzt deklariert: die Wirtsseite animiert dann mit den Keyframes der Partyseite.
# Deshalb jeder Party-Keyframe mit gw-Praefix, Definition UND Verwendung, in CSS und Koerper.
# (Workflow-Leser 'fragment', 10.09.2026; Gegenlesung bestaetigt.)
KF = sorted(k for k in set(re.findall(r'@keyframes\s+([A-Za-z][\w-]*)', css)) if not k.startswith('gw'))
for k in KF:
    css = re.sub(r'@keyframes\s+' + re.escape(k) + r'(?![\w-])', '@keyframes gw-' + k, css)
    muster = re.compile(r'(animation(?:-name)?\s*:[^;{}]*?)(?<![\w-])' + re.escape(k) + r'(?![\w-])')
    for ziel in ('css', 'body'):
        t = css if ziel == 'css' else body
        while True:
            neu = muster.sub(r'\1gw-' + k, t)
            if neu == t: break
            t = neu
        if ziel == 'css': css = t
        else: body = t
assert not re.search(r'@keyframes\s+(?!gw)', css), re.findall(r'@keyframes\s+(\w+)', css)
for k in KF:
    assert re.search(r'animation[^;{}]*(?<![\w-])gw-' + re.escape(k) + r'(?![\w-])', css + body), 'gw-' + k + ' ohne Verwendung'
print(f'  Keyframes praefixiert: {len(KF)} ({", ".join(KF)})')

# DAS SPIEL IST JETZT EIN BILD. Vorher lief hier das echte Einladungsspiel als <iframe> von
# machsleicht.de/einladung/einhorn/... — eine Live-Abhaengigkeit mitten in einer Werbeanimation,
# die auf der Startseite steht. Bolles Entscheidung: alles eingebacken.
#
# An seine Stelle treten ZWEI ECHTE STANDBILDER aus demselben Spiel, nichts nachgezeichnet:
#   spiel-1-suche.jpg   die Suche, 2 von 3 Schaetzen, "Fast geschafft! Noch einer!"
#   spiel-2-jagd.jpg    Ida fluechtet mit dem geklauten Stern, ihr Foto in der Einhorn-Blase
#                       — Renner-Moment und Foto-Enthuellung in EINEM Bild.
# Aufgenommen mit html2canvas bei Faktor 3 (1260x1836). Die erste Fassung stand bei Faktor 0,8
# und war bei 326 px Anzeigebreite sichtbar verpixelt — Bolle: "ekelhaft verpixelt".
#
# Das Seitenverhaeltnis der Aufnahmen ist exakt das des Spielfensters (1260/1836 = 420/612
# = 0,6863), deshalb steht im CSS aspect-ratio statt einer geratenen Hoehe: die Karte behaelt
# ihre Groesse, ohne dass hier eine Zahl gepflegt werden muss.
#
# Die Lehre vom iframe-Attribut bleibt gueltig, auch wenn der iframe weg ist: wer ein Attribut
# blind anhaengt, statt im GANZEN Tag nachzusehen, schreibt es zweimal (der Tag hatte 12
# Attribute und eine sehr lange src — das vorhandene loading stand hinter dem 300-Zeichen-
# Fenster des ersten Schutzes). Vom Pruefstand gefunden.
STILLS = (
    '<div class="game-stills" id="gameStills">'
    f'<img class="game-still an" id="gameStill1" src="{DEMOBILD}/spiel-1-suche.jpg"'
    ' width="1260" height="1836" loading="lazy" decoding="async"'
    ' alt="Ida sucht im Einhorn-Spiel die verzauberten Schaetze — zwei von drei gefunden">'
    f'<img class="game-still" id="gameStill2" src="{DEMOBILD}/spiel-2-jagd.jpg"'
    ' width="1260" height="1836" loading="lazy" decoding="async"'
    ' alt="Ida fluechtet mit dem geklauten Stern — ihr Foto in der Einhorn-Blase">'
    '</div>'
)
i = body.find('<iframe ')
assert i >= 0, 'kein <iframe im Markup — Spielkarte schon ersetzt?'
schluss = body.index('</iframe>') + len('</iframe>')
body = body[:i] + STILLS + body[schluss:]
assert '<iframe' not in body, 'es steht noch ein iframe im Fragment'
assert body.count('game-still') == 3, body.count('game-still')
print(f'  Spiel-iframe ersetzt durch 2 Standbilder ({schluss - i} Zeichen raus, {len(STILLS)} rein)')
# Tote Regeln fuer Elemente, die es im Fragment nicht mehr gibt (Tor, iframe).
vor_tot = len(re.findall(r'(?:^|})\s*(?:\.gate-card|#gameFrame)\b[^{}]*\{[^{}]*\}', css))
css = re.sub(r'(?<=[}\n])\s*(?:\.gate-card|#gameFrame)\b[^{}]*\{[^{}]*\}', '', css)
assert not re.search(r'(?:\.gate-card|#gameFrame)\b[^{}]*\{', css)
print(f'  tote Regeln entfernt: {vor_tot}')

# Der Kommentar "INVARIANTE: KEIN sandbox-Attribut ohne ..." schuetzt den iframe der Partyseite
# (§ 5 DDG, Rechtslinks im eingebetteten Spiel). Hier gibt es den iframe nicht mehr — ein Waechter
# ohne Tor, der den naechsten Leser auf eine falsche Faehrte setzt. Er bleibt dort, wo der iframe
# lebt (party-worker.js). (Pruefstand, 10.09.2026)
body, n_inv = re.subn(r'\s*<!--\s*INVARIANTE: KEIN sandbox.*?-->', '', body, flags=re.S)
assert n_inv == 1, n_inv
print('  Waechter-Kommentar ohne Tor entfernt:', n_inv)

# Keine echten Weiterleitungen aus einer Werbeanimation: die vier Wunsch-Links der Demo zeigen
# auf /go/<party>/<wunsch> und wuerden die Klickstatistik einer ECHTEN Party fuellen, wenn jemand
# per Tastatur hineinkommt. Vom Pruefstand gefunden.
vor_href = len(re.findall(r'href="https://party\.machsleicht\.de/go/', body))
body = re.sub(r'href="https://party\.machsleicht\.de/go/[^"]*"', 'data-demo-link', body)
assert 'party.machsleicht.de/go/' not in body
print(f'  Affiliate-Weiterleitungen entschaerft: {vor_href}')
# Die Telefonnummer der Demo-Gastgeber ist ein tel:-Link. Im inerten Telefon klickt ihn niemand, aber
# eingebettet auf der Startseite ist ein waehlbarer Link zu einer Nummer, die vergeben sein kann, das
# Falsche. Entschaerft wie die /go/-Links; Nummer und Name selbst sind Bolles Entscheidung (Gutachten MINOR 11).
vor_tel = len(re.findall(r'href="tel:[^"]*"', body))
body = re.sub(r'href="tel:[^"]*"', 'data-demo-link', body)
assert 'href="tel:' not in body
print(f'  tel:-Links entschaerft: {vor_tel}')

# Der Planer-Knopf am Fuss der Partyseite traegt ?ref=<party-id> — eine Empfehlungsspur,
# die auf die Demo-Party zeigt. Im Telefon ist er ohnehin tot (inert + pointer-events:none),
# aber eingebacken heisst eingebacken: die Spur kommt raus, der Link bleibt sichtbar und
# wahr. Danach steht die Party-Kennung nur noch im Kopfkommentar der Datei, als Herkunfts-
# nachweis — dort gehoert sie hin, denn ohne sie weiss niemand mehr, woraus das gebaut ist.
vor_ref = len(re.findall(r'\?ref=' + PID, body))
body = body.replace('?ref=' + PID, '')
assert PID not in body, 'die Party-Kennung steht noch im Markup'
print(f'  Empfehlungsspur der Demo-Party entfernt: {vor_ref}')

# Die Partyseite verlinkt die Hauptseite absolut (Impressum, Datenschutz, Planer). Im inerten
# Telefon klickt das niemand — aber eingebettet auf machsleicht.de ist ein Wurzelpfad dasselbe,
# und in einer Branch-Vorschau zeigt er nicht still auf die Produktion. Damit gilt die Invariante
# vor dem Write ohne Ausnahme: KEINE absolute Eigen-URL im Fragment.
# OHNE Schraegstrich pruefen: der Footer der Partyseite verlinkt `https://machsleicht.de` nackt, und ein
# Waechter mit `https://machsleicht.de/` bescheinigte Freiheit von etwas, das da war (Pruefstand, 10.09.).
# POSITIVKONTROLLE mit echtem Material: die rohe Partyseite traegt im Footer `href="https://machsleicht.de"`.
# Findet der Waechter diese echte Zeile nicht, ist er kaputt — dann bricht der Bau, statt gruen zu melden.
assert re.search(r'href="https://machsleicht\.de"', body), 'Positivkontrolle: Footer-Link der Partyseite nicht gefunden — Waechter oder Quelle geaendert'
vor_abs = len(re.findall(r'href="https://machsleicht\.de(?=[/"])', body))
body = re.sub(r'href="https://machsleicht\.de/', 'href="/', body)
body = re.sub(r'href="https://machsleicht\.de"', 'href="/"', body)
assert 'https://machsleicht.de' not in body, 'absolute Eigen-URL im Koerper'
print(f'  Eigen-Links im Telefon wurzelrelativ: {vor_abs}')

# Die Ueberschriften der Partyseite sind KEINE Ueberschriften der Startseite — das Telefon zeigt das
# Abbild eines anderen Dokuments. Gerendert stand `<h1>Ida wird 6!</h1>` als zweites h1 der Startseite
# in der Gliederung, zwischen dem h2 der Sektion und dem h2 des Katalogs. Also Tag neutralisieren,
# Klasse behalten, damit das CSS weiter greift (dort wird `hN` gleich mit umgeschrieben).
ueber = {int(n): len(re.findall(r'<h' + n + r'\b', body)) for n in '123456'}
ueber = {n: k for n, k in ueber.items() if k}
for n, k in ueber.items():
    assert body.count(f'</h{n}>') == k, (n, k, body.count(f'</h{n}>'))
    assert not re.search(rf'<h{n}\b[^>]*\bclass=', body), f'h{n} traegt bereits eine Klasse — Zusammenfuehrung noetig'
    body = re.sub(rf'<h{n}\b([^>]*)>', rf'<div class="gw-t{n}"\1>', body)
    body = body.replace(f'</h{n}>', '</div>')
assert not re.search(r'<h[1-6]\b', body), 'Ueberschrift im Telefon uebersehen'
print(f'  Ueberschriften im Telefon neutralisiert: {ueber}')

# Der Countdown der Partyseite ("Noch 36 Tage!") ist eine Live-Zahl. Eingebacken steht sie in
# einem Jahr noch da — und ist dann falsch. Ein Standbild darf nichts zeigen, was nur stimmt,
# solange es lebt. Also raus, samt Huelle. (Workflow-Leser 'gates', 10.09.2026.)
vor_cd = body.count('countdown-num')
body, n_cd = re.subn(r'<div class="countdown[^"]*"[^>]*>(?:(?!</div>).)*?countdown-num(?:(?!</div>).)*?</div>', '', body, flags=re.S)
assert vor_cd == 1 and n_cd == 1 and 'countdown-num' not in body, (vor_cd, n_cd)
print('  Countdown entfernt:', n_cd)
# ... und seine Regeln aus dem Stylesheet, sonst lebt er dort weiter (Pruefstand).
vor_cdcss = len(re.findall(r'\.countdown[\w-]*[^{}]*\{[^{}]*\}', css))
css = re.sub(r'\.countdown[\w-]*[^{}]*\{[^{}]*\}', '', css)
assert 'countdown' not in css, 'Countdown-Regeln leben noch'
print('  Countdown-Regeln entfernt:', vor_cdcss)

# Letzte Koerper-Aenderung: die Div-Bilanz muss aufgehen. Ein </div> zu viel schliesst auf der
# Wirtsseite den Container, in dem das Fragment steht — auf der Startseite bliebe der Schwanz
# des Fragments beim Umhaengen unter dem Footer zurueck.
assert len(re.findall(r'<div\b', body)) == body.count('</div>'), (len(re.findall(r'<div\b', body)), body.count('</div>'))

# --- CSS fuer @scope aufbereiten.
#
# DIE URSACHE, gemessen: :root und body matchen im @scope NIE, weil der Scope-Wurzel .gw__page
# ist und <html>/<body> DARUEBER liegen. Folge war: alle 8 Variablen undefiniert bei 97
# var(--…)-Verwendungen, und die Grundschrift (steht in body{}) griff nicht — der Hero lief auf
# system-ui, die Seite sah aus wie Times New Roman.
#
# RICHTIGSTELLUNG einer frueheren Behauptung an dieser Stelle: hier stand, @font-face werde im
# @scope "verschluckt" und die Schriften deshalb nie angefordert. DAS STIMMT NICHT. Der Pruefstand
# hat widersprochen (document.fonts kannte beide Familien als "unloaded" — verschluckte Regeln
# waeren gar nicht registriert), und der Gegenversuch bestaetigt ihn: mit @font-face IM @scope
# meldet der Browser 2 CSSFontFaceRule INNERHALB der Scope-Regel, 0 auf oberster Ebene, und
# beide Schriften laden ("Baloo 2:loaded", "DM Sans:loaded"), Hero in "Baloo 2".
# `unloaded` heisst "registriert, aber von niemandem angefordert" — nicht "unbekannt".
#
# @font-face wird trotzdem herausgehoben, aber aus einem anderen Grund: nach Spezifikation
# gehoert es auf die oberste Ebene, und was Chrome toleriert, muss keine andere Engine tun.
# Das ist Vorsicht, keine Fehlerbehebung — und der Unterschied gehoert hier hin.
schriften = re.findall(r'@font-face\s*\{[^}]*\}', css)
assert len(schriften) == 2, len(schriften)
css_in = css
for f in schriften:
    css_in = css_in.replace(f, '')
vor_root, vor_body = len(re.findall(r':root\s*\{', css_in)), len(re.findall(r'(?<![\w.#>\-])body\s*\{', css_in))
css_in = re.sub(r':root\s*\{', ':scope{', css_in)
# ALLE body-Selektoren, nicht nur `body{`: body::after (die Punktetapete der echten Seite) matchte im
# @scope nie und fehlte still (Gutachten MINOR 14). Lookbehind haelt .card-body & Co. heraus.
vor_body = len(re.findall(r'(?<![\w.#>\-])body(?![\w-])', css_in))
css_in = re.sub(r'(?<![\w.#>\-])body(?![\w-])', ':scope', css_in)
assert not re.search(r'(?<![\w.#>\-])body(?![\w-])', css_in)
# Und was das Telefon vom Wirt erben wuerde, setzt der Scope selbst: der Planer gibt line-height 1.5
# und letter-spacing .4px an Ueberschriften mit — die Seite im Telefon war dort 149 px laenger als auf
# der Startseite (Gutachten MINOR 13). normal = der Wert der echten Partyseite.
# :where() statt :is(): (0,1,0) schlaegt die Wirts-Elementregeln h1..h4 (0,0,1), verliert aber gegen jede
# Party-Regel wie .hero h1 (0,1,1) — die :is()-Fassung hatte deren letter-spacing:-0.5px ueberschrieben
# (Re-Check). `revert` rollt die Wirtsregel auf den UA-Wert zurueck: exakt der Zustand der echten Seite.
# Die Selektoren ziehen mit: `.hero h1` -> `.hero .gw-t1`. Nur eigenstaendige Tag-Namen, nie Teile eines
# Wortes oder einer Klasse (Lookaround), und nur links der Klammer — Werte bleiben unberuehrt.
def tags_zu_klassen(css):
    def eine(m):
        sel, rest = m.group(1), m.group(2)
        return re.sub(r'(?<![\w.#\-])h([1-6])(?![\w\-])', r'.gw-t\1', sel) + rest
    return re.sub(r'(?m)^([^{}]*?)(\{)', eine, css)
vor_h = len(re.findall(r'(?m)^[^{}]*(?<![\w.#\-])h[1-6](?![\w\-])[^{}]*\{', css_in))
css_in = tags_zu_klassen(css_in)
# Was ein <hN> vom Browser mitbekommt, bekommt ein <div> nicht: fett, Groesse, Abstaende (HTML-Standard,
# html.spec.whatwg.org #sections-and-headings). Als Vorspann mit einer Klasse Spezifitaet (0,1,0) — jede
# Party-Regel (.hero .gw-t1 = 0,2,0) schlaegt ihn weiterhin. Ohne das stand „Wir freuen uns auf euch!"
# auf font-weight 400 statt bold.
# :where() macht die Spezifitaet NULL. Das ist hier entscheidend: die Partyseite setzt `*{margin:0}`,
# und als Klassenregel (0,1,0) haette der Vorspann diesen Reset geschlagen — gemessen war die Seite im
# Telefon dadurch 24 px laenger (Hero 744 -> 768, margin-top am Titel 0 -> 28,14 px). Mit :where()
# gewinnt jede Regel der echten Seite, und uebrig bleibt genau das, was sonst der Browser beisteuert.
css_in = (':where(.gw-t1,.gw-t2,.gw-t3,.gw-t4,.gw-t5,.gw-t6){display:block;font-weight:bold}'
          ':where(.gw-t1){font-size:2em;margin-block:.67em}:where(.gw-t2){font-size:1.5em;margin-block:.83em}'
          ':where(.gw-t3){font-size:1.17em;margin-block:1em}:where(.gw-t4){margin-block:1.33em}'
          ':where(.gw-t5){font-size:.83em;margin-block:1.67em}:where(.gw-t6){font-size:.67em;margin-block:2.33em}\n'
          + css_in)
assert not re.search(r'(?m)^[^{}]*(?<![\w.#\-])h[1-6](?![\w\-])[^{}]*\{', css_in)
print(f'  CSS-Selektoren auf Ueberschriften umgeschrieben: {vor_h}')
# Der Ueberschriften-Reset entfaellt: er hielt die `h1,h2,h3,h4`-Regel des Planers vom Telefon fern.
# Ohne Ueberschriften im Telefon gibt es nichts mehr zu treffen. line-height/letter-spacing bleiben,
# die erbt die Seite weiterhin vom Wirt.
css_in += '\n:scope{line-height:normal;letter-spacing:normal}\n'
print(f'  body-Selektoren -> :scope: {vor_body}')
print(f'  CSS: {len(schriften)} @font-face herausgehoben, '
      f'{vor_root}x :root und {vor_body}x body -> :scope')
assert vor_root >= 1 and vor_body >= 1, (vor_root, vor_body)
assert ':root' not in css_in and '@font-face' not in css_in

# --- Die Link-Vorschau der Chat-Szene kommt aus den ECHTEN og:-Angaben der Partyseite ---
def og(prop):
    m = re.search(r'<meta property="og:' + prop + r'" content="([^"]*)"', seite)
    return m.group(1) if m else ''
og_titel, og_beschr = og('title'), og('description')
assert og_titel, 'kein og:title'
print(f'  og:title  {og_titel[:48]!r}')
print(f'  og:descr  {og_beschr[:48]!r}')

# --- Welche Klasse markiert einen gewaehlten Antwort-Knopf? Aus dem CSS ABLEITEN, nicht tippen.
kand = re.findall(r'\.rsvp-btn\.([a-z-]+)', css)
WAHL = kand[0] if kand else 'selected'
print('  gewaehlter Antwort-Knopf traegt Klasse:', WAHL, f'(aus {len(set(kand))} Kandidaten im CSS)')

schriften_aus = NL.join(schriften)

BAU = f"""<!-- Gaeste-Weg, ANIMIERT. Erzeugt aus der Demo-Partyseite (Kennung steht in anim_bauen.py, nicht hier).
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
      <li><button type="button" data-s="4"><b>Und das alles kam aus deinem Plan</b>
        <span>Zeitplan, Spiele, Einkaufsliste \u2014 mit Kosten pro Kind.</span></button></li>
    </ol>
    <p class="gw__note">Eine Eingabe, zehn Minuten. Alles hier entsteht daraus \u2014 echte Seiten, keine Bilder davon.</p>
    <a class="gw__cta" href="/kindergeburtstag">Jetzt planen \u2014 Partyseite inklusive \u2192</a>
  </div>

  <div class="gw__stage" aria-hidden="true">
    <div class="gw__phone">
      <div class="gw__screen">
        <div class="gw__chat" data-sc="chat">
          <div class="gw__chat-head">
            <span class="gw__ava">\U0001F49C</span>
            <span><b>Idas Mama</b><span class="gw__on">online</span></span>
          </div>
          <div class="gw__bubble" data-b="1">
            <span class="gw__dots"><i></i><i></i><i></i></span>
            <span class="gw__msg">Ihr Lieben \U0001F49C Ida wird sechs \u2014 und w\u00fcnscht sich
              nur eins: Einh\u00f6rner. \u00dcberall.<br><br>Ich hab alles auf eine Seite gepackt \u2014
              Infos, Zusage und die Wunschliste. Und die Kinder d\u00fcrfen dort was spielen \U0001F984
              <span class="gw__t">14:32 <span class="gw__hk">\u2713\u2713</span></span></span>
          </div>
          <div class="gw__bubble gw__bubble--link" data-b="2">
            <span class="gw__msg">
              <span class="gw__prev">
                <img src="{IDA}" alt="" loading="lazy"
                     width="400" height="400" decoding="async">
                <span class="gw__prev-txt">
                  <b>{og_titel}</b>
                  <i>{og_beschr}</i>
                  <em>party.machsleicht.de</em>
                </span>
              </span>
              <span class="gw__link">party.machsleicht.de/\u2026</span>
              <span class="gw__t">14:32 <span class="gw__hk">\u2713\u2713</span></span>
            </span>
          </div>
        </div>
        <div class="gw__plan" data-sc="plan" aria-hidden="true" inert>
          <img src="{DEMOBILD}/plan.jpg" alt="" loading="lazy" decoding="async" width="1125" height="3664">
        </div>
        <div class="gw__viewport" data-sc="page" aria-hidden="true" inert>
          <div class="gw__page">{body}</div>
        </div>
      </div>
      <span class="gw__tap" hidden></span>
    </div>
  </div>
</section>

<style>
/* @font-face steht ausserhalb von @scope aus Spezifikationstreue: @scope kapselt Selektoren,
   @font-face hat keinen. Gemessen (09.09.): Chrome parst es auch innerhalb und laedt die Schriften —
   ein frueherer Kommentar hier behauptete das Gegenteil und ging so an jeden Besucher (Gutachten MINOR 15). */
{schriften_aus}

@scope (.gw__page) {{
{css_in}
  /* Die Karten der echten Seite starten opacity:0 + translateY(20px) und werden dort von einem
     Einblend-Beobachter aufgedeckt. Den gibt es hier nicht \u2014 ohne diese Zeile bleibt die
     halbe Seite wei\u00df (gemessen: zwei von vier Bildern der ersten Fassung). */
  .fade-up,.fade-up-d1,.fade-up-d2,.fade-up-d3{{opacity:1!important;transform:none!important;animation:none!important}}
  /* Die zwei Spielbilder liegen deckungsgleich uebereinander, nur die Deckkraft wechselt.
     aspect-ratio statt fester Hoehe: die Aufnahmen haben exakt das Verhaeltnis des
     Spielfensters, also bleibt die Karte so hoch wie mit dem echten Spiel darin. */
  .game-stills{{position:relative;display:block;width:100%;aspect-ratio:1260/1836;
    background:#2A1B4A;overflow:hidden}}
  .game-still{{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;
    display:block;opacity:0;transition:opacity .55s ease}}
  .game-still.an{{opacity:1}}
  /* Nichts im Standbild soll anklickbar aussehen oder Fokus fangen. */
  a,button,input,textarea,select{{pointer-events:none!important}}
}}

.gw{{--gw-a:#B5468C;display:grid;grid-template-columns:minmax(0,1fr);gap:36px;align-items:center;
  max-width:960px;margin:0 auto;padding:32px 20px}}   /* wie die Nachbarsektionen (960/900), nicht 1060 */
@media(min-width:920px){{.gw{{grid-template-columns:minmax(0,1fr) 360px;gap:64px}}}}
/* Ohne @scope (Safari/iOS < 17.4, Firefox < 128): kein Telefon, keine leere Spalte, keine toten Knoepfe. */
.gw--ohne-scope{{grid-template-columns:minmax(0,1fr)!important}}
.gw--ohne-scope .gw__stage,.gw--ohne-scope .gw__note{{display:none}}
.gw--ohne-scope .gw__steps button{{cursor:default;pointer-events:none;opacity:1}}
.gw__h{{font-size:clamp(25px,4vw,36px);line-height:1.14;margin:0 0 22px;text-wrap:balance}}
.gw__steps{{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:2px;counter-reset:gw}}
.gw__steps button{{all:unset;display:block;width:100%;box-sizing:border-box;cursor:pointer;
  padding:13px 15px;border-radius:12px;border-left:3px solid transparent;opacity:.61;
  transition:opacity .4s,background .4s,border-color .4s}}
.gw__steps button:focus-visible{{outline:2px solid var(--gw-a);outline-offset:2px;opacity:1}}
.gw__steps b{{display:block;font-size:15.5px;margin-bottom:2px}}
/* Deckkraft der inaktiven Schritte: berechnet, nicht geschaetzt. .45/.78 (gestapelt .351) ergaben
   2,86:1 und 2,19:1 gegen #fdfcf9 — unter 4,5:1 fuer echte <button> (Pruefstand, WCAG-Rechnung).
   Die Werte hier stammen aus stills_einbauen5.py, das die Schwelle gegen beide Wirtsfarben prueft. */
.gw__steps span{{display:block;font-size:13.5px;opacity:1.0}}
.gw__steps button[aria-current="step"]{{opacity:1;background:color-mix(in srgb,var(--gw-a) 7%,transparent);
  border-left-color:var(--gw-a)}}
.gw__note{{font-size:13px;opacity:.62;margin:18px 0 0}}
.gw__cta{{display:inline-block;margin-top:10px;font-weight:700;font-size:15.5px;color:var(--gw-a);
  text-decoration:none;border-bottom:2px solid currentColor;padding-bottom:2px}}

.gw__stage{{justify-self:center;min-width:0;max-width:100%}}   /* min-width:0, sonst haelt das Grid die Spalte auf den 326 px des Telefons */
/* box-sizing EXPLIZIT, und die Seite folgt dem Bildschirm: die Wirte setzen *{{box-sizing:border-box}},
   die Vorschau setzte es nicht — dort war der Bildschirm 326 px, live 304, die Seite darin 326 →
   6 px jeder Karte abgeschnitten, Hero schief. Gefunden vom externen Gutachten (M1), gemessen. */
.gw__phone{{position:relative;box-sizing:border-box;width:326px;max-width:100%;aspect-ratio:9/18.6;border-radius:40px;padding:11px;
  background:linear-gradient(160deg,#2b2b33,#141419);
  box-shadow:0 26px 64px rgba(0,0,0,.3),0 2px 0 rgba(255,255,255,.15) inset}}
/* Absolut aufgespannt statt height:100%: die Hoehe des Telefons kommt allein aus aspect-ratio, und
   dagegen loest Safari eine Prozenthoehe nicht auf — der Bildschirm hatte dann keine Hoehe und
   `overflow:hidden` schnitt vertikal nichts ab (der Chat lief unten aus dem Rahmen, iPhone 11.09.).
   `inset:11px` entspricht dem Polster des Telefons: gleiche Geometrie, ohne Prozenthoehe.
   `isolation:isolate`, weil die transformierten Chat-Blasen sonst an overflow:hidden vorbeilaufen. */
.gw__screen{{position:absolute;inset:11px;border-radius:29px;overflow:hidden;background:#fff;isolation:isolate}}
.gw__viewport{{position:absolute;inset:0;overflow:hidden;opacity:0;transition:opacity .5s}}
.gw__plan{{position:absolute;inset:0;overflow:hidden;background:#FFF8F0;opacity:0;transition:opacity .5s}}
.gw__plan.on{{opacity:1}}
.gw__plan img{{display:block;width:100%;height:auto;will-change:transform;
  transition:transform 2.6s cubic-bezier(.4,0,.2,1)}}
/* Die Endlosanimationen der Partyseite (Schimmer, Bob, Pulse) laufen nur, solange das Telefon sichtbar
   ist und die Sequenz laeuft — nicht bei opacity:0, nicht nach dem Ende (Gutachten MINOR 8, Akku). */
.gw__viewport:not(.on) .gw__page *,.gw__viewport:not(.on) .gw__page *::before,.gw__viewport:not(.on) .gw__page *::after,
.gw--fertig .gw__page *,.gw--fertig .gw__page *::before,.gw--fertig .gw__page *::after{{animation-play-state:paused!important}}
.gw__viewport.on{{opacity:1}}
.gw__page{{position:absolute;top:0;left:0;width:100%;transform-origin:top left;will-change:transform}}

/* Chat-Szene: Nachrichtenfenster-Optik (heller Klassiker), ohne fremdes Logo und ohne
   Wortmarke — nur Anordnung und Farbwelt. Absenderin ist Idas Mama, der Text verkauft
   nebenbei mit, und die Link-Vorschau zeigt die ECHTEN og:-Angaben der Partyseite. */
.gw__chat{{position:absolute;inset:0;background:#ECE5DD;padding:58px 10px 12px;overflow:hidden;
  font:14.5px/1.42 system-ui,-apple-system,"Segoe UI",sans-serif;color:#111b21;
  opacity:1;transition:opacity .5s}}
.gw__chat.off{{opacity:0}}
.gw__chat-head{{position:absolute;top:0;left:0;right:0;height:50px;background:#075E54;color:#fff;
  display:flex;align-items:center;gap:10px;padding:0 12px;font-size:14px}}
.gw__ava{{width:31px;height:31px;border-radius:50%;background:#0b7a6d;display:grid;place-items:center;
  font-size:15px;flex:none}}
.gw__chat-head b{{display:block;font-size:14px;font-weight:600;line-height:1.15}}
.gw__on{{display:block;font-size:11.5px;opacity:.75}}
.gw__bubble{{position:relative;background:#fff;border-radius:8px;padding:7px 9px 5px;max-width:88%;
  margin-bottom:8px;box-shadow:0 1px 1px rgba(0,0,0,.13);opacity:0;transform:translateY(10px);
  transition:opacity .4s,transform .4s}}
.gw__bubble::before{{content:'';position:absolute;left:-7px;top:0;border:7px solid transparent;
  border-top-color:#fff;border-right:0}}
.gw__bubble.in{{opacity:1;transform:none}}
.gw__bubble--link{{padding-top:5px}}
.gw__msg{{display:none;font-size:13.8px}}
.gw__bubble.said .gw__msg{{display:block}}
.gw__bubble.said .gw__dots{{display:none}}
.gw__dots{{display:inline-flex;gap:4px;padding:4px 2px}}
.gw__dots i{{width:6px;height:6px;border-radius:50%;background:#b3bcc2;animation:gwdot 1.1s infinite}}
.gw__dots i:nth-child(2){{animation-delay:.18s}} .gw__dots i:nth-child(3){{animation-delay:.36s}}
@keyframes gwdot{{0%,60%,100%{{opacity:.3}}30%{{opacity:1}}}}
.gw__link{{display:block;margin-top:5px;color:#027eb5;word-break:break-all;font-size:13px}}
.gw__t{{display:block;text-align:right;font-size:10.5px;color:#667781;margin-top:2px}}
.gw__hk{{color:#53bdeb;letter-spacing:-1px}}
/* Link-Vorschau, wie sie ein Messenger baut — Bild und Text aus den echten og:-Angaben */
.gw__prev{{display:block;background:#f0f2f5;border-radius:6px;overflow:hidden;margin-bottom:4px}}
.gw__prev img{{display:block;width:100%;height:auto;aspect-ratio:1.91/1;object-fit:cover}}   /* height:auto schlaegt das height-Attribut; ohne das ignoriert der Browser aspect-ratio */
.gw__prev-txt{{display:block;padding:7px 9px 8px}}
.gw__prev-txt b{{display:block;font-size:13px;line-height:1.25;margin-bottom:2px}}
.gw__prev-txt i{{display:block;font-style:normal;font-size:11.5px;color:#667781;line-height:1.3;
  overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}}
.gw__prev-txt em{{display:block;font-style:normal;font-size:11px;color:#8696a0;margin-top:3px}}

.gw__tap{{position:absolute;width:34px;height:34px;border-radius:50%;pointer-events:none;
  background:rgba(255,255,255,.34);border:2px solid rgba(255,255,255,.9);
  box-shadow:0 0 0 0 rgba(255,255,255,.55);transform:translate(-50%,-50%) scale(.75);z-index:5}}
.gw__tap.go{{animation:gwtap .55s ease-out}}
@keyframes gwtap{{0%{{transform:translate(-50%,-50%) scale(.75);opacity:0}}
  35%{{transform:translate(-50%,-50%) scale(1);opacity:1}}
  100%{{transform:translate(-50%,-50%) scale(1.5);opacity:0;box-shadow:0 0 0 16px rgba(255,255,255,0)}}}}

@media(prefers-reduced-motion:reduce){{
  /* Das GANZE Fragment, nicht nur das Telefon: Schrittliste, Punktreihe, Chat- und Viewport-
     Blende liegen ausserhalb von .gw__page und liefen sonst weiter; im Telefon lief der
     Wunsch-Balken (transition:width .8s) sichtbar nach. Unter reduced-motion steht der
     ENDZUSTAND, keine angehaltene Mitte — dafuer darf nichts mehr blenden. */
  /* Pseudo-Elemente eigens: `.gw *` erreicht ::before/::after nicht — .hero::after (gw-shimmer) ist die
     Endlosanimation, die an einem Pseudo-Element haengt. */
  .gw,.gw *,.gw::before,.gw::after,.gw *::before,.gw *::after{{transition:none!important;animation:none!important}}
  .gw__tap{{display:none}}
  .gw__dots i{{animation:none}}
}}
</style>

<script>
(function(){{
  var wrap = document.querySelector('.gw'); if (!wrap) return;
  // Ohne @scope (Safari/iOS < 17.4, Firefox < 128) faellt der ganze Partyseiten-Stil weg, und das
  // Telefon zeigte rohes HTML in Wirtsschrift. Dann lieber kein Telefon: die Schrittliste traegt den
  // Text allein. (Gutachten MINOR 16)
  if (!('CSSScopeRule' in window)) {{ wrap.classList.add('gw--ohne-scope'); return; }}   // eine Spalte, Buehne und Notiz weg, Knoepfe tot (CSS)
  var chat  = wrap.querySelector('.gw__chat'),
      bub1  = wrap.querySelector('.gw__bubble[data-b="1"]'),
      bub2  = wrap.querySelector('.gw__bubble[data-b="2"]'),
      vp    = wrap.querySelector('.gw__viewport'),
      plan  = wrap.querySelector('.gw__plan'),
      planB = wrap.querySelector('.gw__plan img'),
      phone = wrap.querySelector('.gw__phone'),
      page  = wrap.querySelector('.gw__page'),
      tap   = wrap.querySelector('.gw__tap'),
      btns  = wrap.querySelectorAll('.gw__steps button');
  var ruhig = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Die Seite im Rahmen ist so breit wie der Bildschirm des Telefons (304 px bei 326er Rahmen); passt sie in der Hoehe nicht, wird nur
  // gescrollt \u2014 nicht skaliert. Skalieren macht Schrift unlesbar klein.
  function el(sel){{ return page.querySelector(sel); }}
  // Abstand zur Seitenoberkante ueber die RECHTECKE, nicht ueber offsetTop: offsetTop misst gegen
  // den naechsten positionierten Vorfahren. Der Hero ist positioniert, also zaehlten seine 672 px
  // nicht mit — gemessen: .game-card meldete 591 statt 1263, jeder Sprung landete zu frueh und
  // Spiel wie Wunschliste rutschten unten aus dem Bild. Genau das hat Bolle gesehen.
  function y(node){{
    if (!node) return 0;
    var jetzt = 0, m = /translateY\\((-?[\\d.]+)px\\)/.exec(page.style.transform || '');
    if (m) jetzt = -parseFloat(m[1]);
    return node.getBoundingClientRect().top - page.getBoundingClientRect().top;
  }}

  function scrollTo(node, ms, oben){{
    if (!node) return;
    var frei = vp.clientHeight, ziel = Math.max(0, y(node) - (oben == null ? 12 : oben));
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
    nach(380, function(){{ if (cb) cb(); }});   // ueber T: stopp() nimmt den Rueckruf mit, sonst tippt ein alter Lauf in den neuen
    // Punkt wieder wegnehmen: .gw__tap hat auch ohne .go eine sichtbare Fuellung, und tippe()
    // setzte hidden nur auf false. Gemessen (Pruefstand): ein weisser Kreis stand 13 s an der
    // letzten Tippstelle.
    setTimeout(function(){{ tap.hidden = true; }}, 600);
  }}
  // Karten ueber ihren INHALT finden, nicht ueber die Reihenfolge — Reihenfolge aendert sich,
  // "Deine Rolle" und die Wunschliste nicht.
  function karteMit(text){{
    var alle = page.querySelectorAll('.card');
    for (var i=0;i<alle.length;i++) if (alle[i].textContent.indexOf(text) >= 0) return alle[i];
    return null;
  }}
  function pass(){{ return karteMit('Deine Rolle'); }}
  function wunschkarte(){{
    var l = el('#wishListGuest');
    return l ? l.closest('.card') : karteMit('Wunschliste');
  }}
  // Der Plan ist die fuenfte Ansicht: Chat und Partyseite treten ab, das Standbild faehrt langsam
  // durch — Kopf, Zeitplan, Einkaufsliste, Kosten pro Kind. Der Weg ergibt sich aus der wirklichen
  // Bildhoehe (kein getippter Wert): was ueber den Bildschirm hinausragt, wird gefahren.
  function planZeigen(){{
    planB.removeAttribute('loading');
    chat.classList.add('off'); vp.classList.remove('on'); plan.classList.add('on');
  }}
  function planFahren(){{
    var ueber = planB.getBoundingClientRect().height - plan.getBoundingClientRect().height;
    planB.style.transform = 'translateY(' + (-Math.max(0, Math.round(ueber))) + 'px)';
  }}
  function planWeg(){{
    plan.classList.remove('on'); planB.style.transition = 'none';
    planB.style.transform = 'translateY(0)'; void planB.offsetWidth; planB.style.transition = '';
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
      // #guestCounterText, NICHT #guestCount — den gibt es nicht. Das if(z) verschluckte den
      // Fehlgriff still, und von den drei Zustandswechseln, die diesen Umbau begruenden,
      // passierte dieser NIE. Gefunden vom Pruefstand in der zeitlichen Abnahme; meine 12 von 12
      // konnten es nicht fangen, weil sie das Ergebnis pruefen und nicht den Ablauf.
      var z = el('#guestCounterText');
      if (!z) return;
      z.textContent = z.textContent.replace(/\\d+/, function(d){{ return (+d)+1; }});
      // Und ein Punkt mehr in der Reihe, damit die Zahl nicht allein springt.
      var dots = el('#guestDots'), letzter = dots && dots.lastElementChild;
      if (letzter && /^\\+\\d+$/.test(letzter.textContent))
        letzter.textContent = '+' + (parseInt(letzter.textContent.slice(1), 10) + 1);
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

  // Suche (1) oder Jagd (2). Der Wechsel IST der Moment, den Bolle sehen wollte:
  // "vllt den runner momment und foto revelal kurz zeigen".
  function spielbild(n){{
    var a = el('#gameStill1'), b = el('#gameStill2');
    if (a) a.classList.toggle('an', n === 1);
    if (b) b.classList.toggle('an', n === 2);
  }}

  // Beide Bilder haengen tief in der verschobenen Seite. Ein traeges Bild laedt erst, wenn
  // sein Kasten den Bildschirm schneidet — der Kasten steht aber weit unterhalb, bis die
  // Seite hochgeschoben wird. Der Wechsel bei 18,9 s haette ein Loch gezeigt. Deshalb beim
  // START des Ablaufs auf 'eager' stellen: das stoesst den Ladevorgang sofort an.
  // Gestaffelt UND frueh: Bild 1 bei 4,2 s (8,4 s Vorlauf bis 12,6 s → 16,9 kB/s Mindestrate), Bild 2 bei
  // 9,2 s (9,7 s bis 18,9 s → 15,6 kB/s). Die erste Staffelung (9,2/14 s) hatte die Toleranz fuer Bild 1
  // halbiert — 41,8 statt 23 kB/s — weil sie den Start nach hinten schob (Re-Check, nachgerechnet).
  // Wer vor 4,2 s weiterscrollt, laedt nichts: stopp() loescht die Timer.
  function bilderHolen(nur){{
    (nur === 1 ? ['#gameStill1'] : nur === 2 ? ['#gameStill2'] : ['#gameStill1', '#gameStill2']).forEach(function(sel){{
      var im = el(sel); if (im) im.loading = 'eager';
    }});
  }}

  // Ausgangszustand der zwei Karten, die die Sequenz veraendert — fuer den Reset. Ohne ihn zaehlte jeder
  // Wiedereintritt vor 31,8 s den Gaestezaehler um eins hoch (Gutachten MINOR 1, gemessen "Schon 8 Kinder
  // dabei!"): zusage() erhoeht per Regex, der Reset stellte nur den Knopf zurueck.
  var startZaehler = el('#guestCounter') ? el('#guestCounter').innerHTML : null;
  var startWunsch  = wunschkarte() ? wunschkarte().innerHTML : null;

  // --- Ablauf ---
  var T = [], laufend = false, fertig = false;
  function nach(ms, fn){{ T.push(setTimeout(fn, ms)); }}
  function stopp(){{ T.forEach(clearTimeout); T = []; laufend = false; tap.hidden = true; wrap.classList.add('gw--fertig'); }}   // pausiert die Endlosanimationen; lauf() hebt es auf

  // Wer Bewegung reduziert haben will, bekommt den ENDZUSTAND — nicht eine angehaltene Mitte.
  // Zaehler hoch, Knopf gewaehlt, Wunsch vergeben, Balken auf 40 %, und still.
  function endzustand(){{
    chat.classList.add('off'); vp.classList.add('on'); schritt(3);
    bub1.classList.add('in','said'); bub2.classList.add('in','said');   // sonst zeigt Schritt 1 ein leeres Telefon (Pruefstand)
    zusage(); wunsch(); bilderHolen(2); spielbild(2);   // im Ruhig-Pfad nur das Bild, das man sieht
    page.style.transition = 'none';
    var w = wunschkarte();
    if (w) page.style.transform = 'translateY(' + (-Math.max(0, y(w) - 12)) + 'px)';
    planZeigen(); schritt(4); planB.style.transition = 'none'; planFahren();
    tap.hidden = true; fertig = true; wrap.classList.add('gw--fertig');
  }}

  function lauf(){{
    stopp(); laufend = true;
    // Zuruecksetzen
    chat.classList.remove('off'); bub1.classList.remove('in','said'); bub2.classList.remove('in','said');
    vp.classList.remove('on'); page.style.transition='none'; page.style.transform='translateY(0)';
    tap.hidden = true; schritt(0); spielbild(1); planWeg(); wrap.classList.remove('gw--fertig');
    if (startZaehler !== null) el('#guestCounter').innerHTML = startZaehler;
    if (startWunsch  !== null) wunschkarte().innerHTML = startWunsch;
    var ja = el('.rsvp-btn[data-rsvp="ja"]'); if (ja) ja.classList.remove('{WAHL}');

    // ZEITACHSE — bewusst langsam. Bolle: "nachricht ist zu kurz sichtbar... wir haben es
    // nicht eilig". Die Chat-Szene allein steht jetzt 7,5 s statt 3,9 s; wer den Text von Idas
    // Mama lesen will, schafft ihn zweimal. Insgesamt 31,8 s bis zum Endzustand, EINMAL —
    // keine Schleife, also
    // kostet die Laenge niemanden etwas, der weiterliest.
    nach(400,   function(){{ bub1.classList.add('in'); }});          // tippt...
    nach(2100,  function(){{ bub1.classList.add('said'); }});        // Text da
    nach(4200,  function(){{ bub2.classList.add('in','said'); bilderHolen(1); }});   // Link-Vorschau; Bild 1 jetzt (8,4 s Vorlauf) — wer 4 s bleibt, schaut
    nach(6600,  function(){{ tippe(wrap.querySelector('.gw__prev')); }});
    nach(7500,  function(){{ chat.classList.add('off'); vp.classList.add('on'); schritt(1); }});
    nach(9200,  function(){{ scrollTo(pass(), 1800); bilderHolen(2); }});  // Hero steht 1,7 s; Bild 2 jetzt (9,7 s Vorlauf)
    nach(12600, function(){{ scrollTo(el('.game-card'), 1800); }});   // Pass steht 3,4 s
    nach(13600, function(){{ schritt(2); }});
    nach(18400, function(){{ tippe(el('.play-pill')); }});            // Spiel steht 5,8 s
    nach(18900, function(){{ spielbild(2); }});                       // Ida fluechtet
    nach(22000, function(){{ scrollTo(el('#rsvpCard'), 1800); }});    // Jagd steht 3,1 s
    nach(23000, function(){{ schritt(3); }});
    nach(24800, zusage);
    nach(26800, function(){{ scrollTo(wunschkarte(), 1800); }});
    nach(28800, wunsch);
    nach(31800, function(){{ planZeigen(); schritt(4); }});          // Wunschliste stand 3,0 s
    nach(33400, planFahren);                                        // der Plan faehrt 2,6 s durch
    nach(37000, function(){{ fertig = true; laufend = false; wrap.classList.add('gw--fertig'); }});
  }}

  // threshold:0 mit negativem rootMargin, NICHT threshold:.3 — die Sektion ist auf einem
  // schmalen Fenster hoeher als der Bildschirm, dann sind nie 30 % gleichzeitig sichtbar und
  // die Animation startet NIE. Gemessen: nach 10 Sekunden stand alles im Ausgangszustand.
  // Beobachtet wird deshalb das TELEFON (kleiner als das Fenster), und es reicht, dass ein
  // Stueck davon zu sehen ist.
  var io = new IntersectionObserver(function(es){{
    es.forEach(function(e){{
      if (e.isIntersecting && !laufend && !fertig) {{ if (ruhig) endzustand(); else lauf(); }}
      else if (!e.isIntersecting && laufend) stopp();
    }});
  }}, {{threshold:0, rootMargin:'0px 0px -80px 0px'}});
  io.observe(phone);

  btns.forEach(function(b){{
    b.addEventListener('click', function(){{
      var n = +b.dataset.s;
      stopp(); fertig = true; schritt(n); bilderHolen(); wrap.classList.add('gw--fertig');   // manuelle Wahl beendet den Automatiklauf; Bilder jetzt, Animationen pausiert
      // Drei Ansichten: Chat (0), Partyseite (1-3), Plan (4). Ohne den dritten Fall blieb beim Klick
      // auf den fuenften Schritt die Partyseite stehen und das Plan-Bild wurde nie angefordert.
      chat.classList.toggle('off', n>0); vp.classList.toggle('on', n>0 && n<4);
      if (n>0 && n<4) {{
        planWeg();
        bub1.classList.add('in','said'); bub2.classList.add('in','said');
        scrollTo(n===1 ? pass() : n===2 ? el('.game-card') : el('#rsvpCard'), 600);
      }} else if (n===4) {{
        bub1.classList.add('in','said'); bub2.classList.add('in','said');
        planZeigen();
        // erst zeigen, dann fahren: sonst faehrt das Bild, waehrend es noch eingeblendet wird
        if (planB.complete) planFahren(); else planB.addEventListener('load', planFahren, {{once:true}});
      }} else {{
        planWeg();
      }}
    }});
  }});
}})();
</script>
"""

ZIEL = '_dev/marketing/funnel-demos/gaeste-weg.html'
# Das ausgelieferte Fragment ohne Kommentare: 2,7 KB Fix-Chronik gingen an jeden Besucher (Re-Check, Winkel 1).
# CSS-Blockkommentare, HTML-Kommentare (ausser dem Herkunftskommentar ganz oben) und JS-Zeilen, die mit //
# beginnen. Nicht angefasst: `//` mitten in Zeilen (URLs), Strings, alles im Generator selbst.
def entkommentieren(t):
    kopf_ende = t.index('-->') + 3
    kopf, rest = t[:kopf_ende], t[kopf_ende:]
    rest = re.sub(r'/\*.*?\*/', '', rest, flags=re.S)
    rest = re.sub(r'<!--.*?-->', '', rest, flags=re.S)
    rest = re.sub(r'(?m)^[ \t]*//[^\n]*\n', '', rest)
    rest = re.sub(r'(?m)^[ \t]*\n(?:[ \t]*\n)+', '\n', rest)
    return kopf + rest
vor_bytes = len(BAU.encode('utf-8'))
BAU = entkommentieren(BAU)
assert BAU.startswith('<!-- Gaeste-Weg, ANIMIERT.') and BAU.count('<!--') == 1, BAU.count('<!--')
assert '/*' not in BAU.split('-->', 1)[1] and not re.search(r'(?m)^[ \t]*//', BAU.split('-->', 1)[1])
print(f'  entkommentiert: {vor_bytes} -> {len(BAU.encode(chr(117)+chr(116)+chr(102)+chr(45)+chr(56)))} Bytes')
assert len(re.findall(r'<div\b', BAU)) == BAU.count('</div>'), (len(re.findall(r'<div\b', BAU)), BAU.count('</div>'))
assert 'https://machsleicht.de' not in BAU, 'absolute Eigen-URL im Fragment (auch ohne Schraegstrich)'
sperre_pruefen()
io.open(ZIEL, 'w', encoding='utf-8', newline='\n').write(BAU)
print()
print('geschrieben:', ZIEL, '·', len(BAU), 'Zeichen')
for m_, soll in [('gw__steps button', 4), ('data-sc=', 2), ('rsvp-btn', 1), ('wishProgressFill', 1)]:
    print(f'  {m_:20s} {BAU.count(m_)}x (mind. {soll})')

# Vorschau daneben, damit man sie ohne Startseite ansehen kann.
sperre_pruefen()
io.open('_dev/marketing/funnel-demos/gaeste-weg-vorschau.html', 'w', encoding='utf-8', newline='\n').write(
    '<!doctype html><html lang="de"><head><meta charset="utf-8">'
    '<meta name="viewport" content="width=device-width,initial-scale=1">'
    '<!-- Diese Vorschau ueber den lokalen Server oeffnen: http://localhost:8766/_dev/marketing/funnel-demos/gaeste-weg-vorschau.html (Startkonfiguration wizard-live). Per Doppelklick (file://) laden Bilder und Schriften NICHT: das Fragment nutzt Wurzelpfade, damit es auf machsleicht.de gleiche Herkunft ist. -->\n<title>G\u00e4ste-Weg</title><style>*{box-sizing:border-box}body{margin:0;padding:40px 16px;background:#FFF8F0;'
    'font:16px/1.55 system-ui,-apple-system,Segoe UI,sans-serif;color:#1A1A1A}</style>'
    '</head><body>' + BAU + '</body></html>')
print('  Vorschau: gaeste-weg-vorschau.html')

# --- Einbetten: der Generator schreibt das Fragment selbst in die Zielseiten. ---
# Die Seiten tragen je ein Paar Marker; alles dazwischen gehoert dieser Maschine. Von Hand dort
# etwas zu aendern ist zwecklos — der naechste Lauf ueberschreibt es (Helfer V5: kein Review auf
# Handarbeit, die die Maschine ueberschreibt). Idempotent: zweiter Lauf, leerer Diff.
M_AUF, M_ZU = '<!-- GW:FRAGMENT -->', '<!-- /GW:FRAGMENT -->'
sperre_pruefen()   # EINMAL vor beiden Wirtsseiten — ein Check zwischen ihnen wuerde den Halbschrieb erzeugen, den er verhindern soll (Re-Check)
for seite in ('index.html', 'kindergeburtstag.html'):
    alt = io.open(seite, encoding='utf-8', newline='').read()
    assert alt.count(M_AUF) == 1 and alt.count(M_ZU) == 1, f'{seite}: Marker {alt.count(M_AUF)}/{alt.count(M_ZU)}x'
    a, z = alt.index(M_AUF) + len(M_AUF), alt.index(M_ZU)
    assert a <= z, f'{seite}: Marker in falscher Reihenfolge'
    neu = alt[:a] + '\n' + BAU + '\n' + alt[z:]
    assert neu.count(M_AUF) == 1 and neu.count(M_ZU) == 1
    assert neu.count('<!-- Gaeste-Weg, ANIMIERT.') == 1, 'Fragment steht nicht genau einmal in der Seite'
    if neu != alt:
        io.open(seite, 'w', encoding='utf-8', newline='').write(neu)
    print(f'  eingebettet: {seite} {len(alt)} -> {len(neu)} Zeichen' + ('' if neu != alt else ' (unveraendert)'))
