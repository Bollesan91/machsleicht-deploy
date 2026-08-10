# -*- coding: utf-8 -*-
"""Stufe 31: Sichtbarer Text — die vier Regeln aus dem GSC-Audit 10.08.2026 (M2).

Hintergrund: Der April-De-Index (308 -> 1) traf Duenn-Seiten. Der Crawl-
Wortzaehler zaehlte aber Script-/JSON-LD-Text mit — 'keine Seite < 300
Woerter' war falsch (real: 13 Sitemap-Seiten < 300 SICHTBARE Woerter).
Das Messgeraet war blind fuer genau die Seitenklasse, die deindexiert
wurde. Diese Stufe zaehlt nur, was ein Mensch (und Googles Renderer als
Server-Antwort) sieht: script/style/noscript/template und <head> raus.

Regel 1: Sitemap-URL < MIN_FAIL sichtbare Woerter  -> FAIL
         Sitemap-URL < MIN_WARN                    -> WARNUNG
Regel 2: Lauf von >= 3 Einzelzeichen-<li>          -> FAIL (M4-Muster:
         String statt Liste iteriert -> Buchstaben-Salat)
Regel 3: Python-dict-Literal im sichtbaren HTML    -> FAIL (M4-Muster:
         {'title': ...} roh in den Druck escaped)
Regel 4: 'N Themen/Mottos' mit N != Datenwahrheit  -> FAIL (M8-Muster:
         drei veraltete Zahlengenerationen 7/9/12 auf Live-Seiten).
         Soll-Werte werden aus den Daten abgeleitet, nicht hartkodiert:
         Themen = len(data/schatzsuche.json), Mottos = Motto-Zahl aus
         data/motto/ — die Regel bleibt wahr, wenn das Sortiment waechst.

Exit 0 = sauber, 1 = FAIL, 2 = nur Warnungen.
"""
import glob
import html as html_mod
import json
import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..'))

MIN_FAIL = 300   # unter der April-Schwelle = sofortiger Rueckfall-Kandidat
MIN_WARN = 500   # Audit-Ziel; Alters-Hubs (433-519 W.) sind bekannte Baustelle
                 # des 14-Tage-Plans — WARN statt FAIL, bis sie ausgebaut sind.


def sichtbarer_text(t):
    """Serverseitig sichtbarer Text: head/script/style/noscript/template
    und Kommentare raus, Tags raus, Entities aufgeloest."""
    t = re.sub(r'<!--.*?-->', ' ', t, flags=re.S)
    t = re.sub(r'<head\b.*?</head>', ' ', t, flags=re.S | re.I)
    for tag in ('script', 'style', 'noscript', 'template'):
        t = re.sub(r'<%s\b.*?</%s>' % (tag, tag), ' ', t, flags=re.S | re.I)
    t = re.sub(r'<[^>]+>', ' ', t)
    return html_mod.unescape(t)


def woerter(t):
    return len(re.findall(r'[A-Za-zÄÖÜäöüß]{2,}', t))


def sitemap_dateien():
    """Sitemap-URL -> lokale Datei (gleiche Aufloesung wie der Generator)."""
    urls = re.findall(r'<loc>https://machsleicht\.de(/[^<]*)</loc>',
                      open('sitemap.xml', encoding='utf-8').read())
    paare = []
    for u in urls:
        pfad = u.lstrip('/')
        for k in ([pfad + 'index.html'] if u.endswith('/') else [pfad + '.html', pfad]):
            if k and os.path.isfile(k):
                paare.append((u, k))
                break
        else:
            if u == '/':
                paare.append((u, 'index.html'))
    return paare


# Datenwahrheit fuer Regel 4
SOLL_THEMEN = len(json.load(open('data/schatzsuche.json', encoding='utf-8')))
SOLL_MOTTOS = len(glob.glob('data/motto/*-mittel.json'))

fails = []
warns = []

# Regel 1: Wortzahlen aller Sitemap-URLs
paare = sitemap_dateien()
for url, datei in paare:
    n = woerter(sichtbarer_text(open(datei, encoding='utf-8').read()))
    if n < MIN_FAIL:
        fails.append('%s: %d sichtbare Woerter (< %d)' % (url, n, MIN_FAIL))
    elif n < MIN_WARN:
        warns.append('%s: %d sichtbare Woerter (< %d)' % (url, n, MIN_WARN))

# Regel 5 (Runde-4-MAJOR 10.08.): Der Gender-Sweep erzeugte auf 4 Live-Seiten
# flache Dativ-Fehler — "zu echten Stallmeister/Bauarbeiter/Entdecker/
# Kapitäne". Grammatik-Wahrheit: nach "zu echten" braucht JEDES Substantiv
# auf -er oder -e das Dativ-n (Stallmeistern, Kapitänen); s-Plurale
# ("zu echten Profis") enden nicht auf -er/-e und passieren.
RE_ZU_ECHTEN = re.compile(r'\bzu echten [A-ZÄÖÜ][\wäöüß-]*(?:er|e)\b')

# Regeln 2-5 ueber alle Produkt-HTMLs (nicht nur Sitemap: kaputtes Rendering
# ist auch auf nicht gelisteten, aber erreichbaren Seiten ein Defekt)
# sowie Regel 5 zusaetzlich ueber die Produkt-JSONs (der Sweep lief auch dort).
EINZEL_LI = re.compile(
    r'(?:^[ \t]*<li>(?:[^<&\n]|&#x27;|&quot;|&amp;|&lt;|&gt;)?</li>[ \t]*\n){3,}', re.M)
DICT_LIT = re.compile(r"&#x27;title&#x27;:|\{'title':")
# (?!-): Komposita sind KEINE Sortimentszahlen — "12 Motto-Muffins" ist eine
# Einkaufsmenge, "€2 \n Motto-Servietten" ein Zeilenumbruch im Preisblock.
# Beide waren False-Positives des ersten Laufs.
ZAHL = re.compile(r'\b(\d{1,2})\s+(Themen|Mottos?)\b(?!-)')

produkt_htmls = [p for p in glob.glob('**/*.html', recursive=True)
                 if not p.replace(os.sep, '/').startswith(('_dev/', 'node_modules/', '.claude/'))]

for datei in produkt_htmls:
    t = open(datei, encoding='utf-8').read()
    laeufe = EINZEL_LI.findall(t)
    if laeufe:
        fails.append('%s: %d Einzelzeichen-<li>-Lauf/Laeufe (M4-Muster)' % (datei, len(laeufe)))
    if DICT_LIT.search(t):
        fails.append('%s: rohes dict-Literal im HTML (M4-Muster)' % datei)
    sichtbar = sichtbarer_text(t)
    for m in ZAHL.finditer(sichtbar):
        n, wort = int(m.group(1)), m.group(2)
        soll = SOLL_THEMEN if wort == 'Themen' else SOLL_MOTTOS
        if n != soll:
            fails.append('%s: "%s %s" — Datenwahrheit ist %d (M8-Muster)'
                         % (datei, n, wort, soll))
    for m in RE_ZU_ECHTEN.finditer(sichtbar):
        fails.append('%s: "%s" — Dativ-n fehlt (Sweep-Muster)' % (datei, m.group(0)))

for datei in (glob.glob('data/motto/*.json')
              + ['data/schatzsuche.json'] + glob.glob('_src/elite-motto-data/*.json')):
    t = open(datei, encoding='utf-8').read()
    for m in RE_ZU_ECHTEN.finditer(t):
        fails.append('%s: "%s" — Dativ-n fehlt (Sweep-Muster)' % (datei, m.group(0)))

print('    %d Sitemap-URLs gezaehlt (Soll: Themen=%d, Mottos=%d), %d Produkt-HTMLs geprueft'
      % (len(paare), SOLL_THEMEN, SOLL_MOTTOS, len(produkt_htmls)))
for f in fails:
    print('    FAIL %s' % f)
for w in warns:
    print('    WARN %s' % w)
if fails:
    sys.exit(1)
sys.exit(2 if warns else 0)
