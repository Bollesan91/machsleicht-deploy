# -*- coding: utf-8 -*-
"""Stufe 1 der Paket-Maschine: Manifeste aus den bestehenden Paketen ziehen.

NICHT erfinden, sondern extrahieren. Was heute im Paket steht, ist die Wahrheit —
die Maschine muss es reproduzieren koennen, sonst hat sie nur eine zweite
Wahrheit geschaffen.

Die drei Signet-Funktionen heissen in jedem Paket anders (compassSvg /
footprintSvg / helmSvg fuer dieselbe Rolle). Das Manifest benennt sie nach
ROLLE: signet, siegel, cover. Genau der historische Zufall, den ein Generator
wegraeumt.
"""
import pathlib, re, json, sys

# Rolle -> mogliche Funktionsnamen je Paket
SVG_ROLLEN = {
    'signet': ['helmSvg', 'compassSvg', 'footprintSvg'],
    'siegel': ['abzeichenSvg', 'sealSvg', 'fossilSealSvg'],
    'cover':  ['wacheCoverSvg', 'shipCoverSvg', 'jungleCoverSvg'],
}

BLOECKE = {
    'palette':  r'(    --paper:.*?--tool-ink:#[0-9A-Fa-f]{6};)',
    'cfg':      r'(window\.PAKET_CFG = \{.*?\n\};)',
    'epithets': r'(var EPITHETS=\[.*?\];)',
    'gamemeta': r'(  "[a-z]+-klassik":.*?"[a-z]+-schatzjagd":\{[^\n]*\})',
    'demo':     r'(window\.DEMO_PARTY\s*=\s*\{.*?\n\};)',
}


def fn_block(t, name):
    i = t.index('function %s(){' % name)
    ze = t.index('\n', i)
    if t[i:ze].rstrip().endswith('; }'):
        return t[i:ze], i, ze
    j = t.index('\n}', i) + 2
    return t[i:j], i, j


ziele = sorted(pathlib.Path('paket').glob('*/index.html'))
raus = pathlib.Path('paket/_maschine/manifeste')
raus.mkdir(parents=True, exist_ok=True)

gesamt = []
for p in ziele:
    motto = p.parent.name
    t = p.read_text(encoding='utf-8')
    man = {'id': motto}
    fehler = []

    for k, pat in BLOECKE.items():
        m = re.search(pat, t, re.S)
        if not m:
            fehler.append('Block %s fehlt' % k); continue
        man[k] = m.group(1)

    man['svg'] = {}
    man['svgNamen'] = {}
    for rolle, kandidaten in SVG_ROLLEN.items():
        treffer = [k for k in kandidaten if 'function %s(){' % k in t]
        if len(treffer) != 1:
            fehler.append('SVG-Rolle %s: %d Kandidaten (%s)' % (rolle, len(treffer), treffer)); continue
        blk, _, _ = fn_block(t, treffer[0])
        # Funktionsname auf die Rolle normieren
        man['svg'][rolle] = blk.replace('function %s(){' % treffer[0], 'function %sSvg(){' % rolle, 1)
        man['svgNamen'][rolle] = treffer[0]

    if fehler:
        print('  %-14s ABBRUCH: %s' % (motto, ' · '.join(fehler)))
        sys.exit(1)

    f = raus / ('%s.json' % motto)
    f.write_text(json.dumps(man, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    abged = sum(len(v) for v in man.values() if isinstance(v, str)) + sum(len(v) for v in man['svg'].values())
    gesamt.append((motto, len(man['svg']), abged, len(t)))
    print('  %-14s Manifest %5d Zeichen, deckt %2d%% der Datei  (SVG-Namen: %s)'
          % (motto, len(f.read_text(encoding='utf-8')), 100 * abged / len(t),
             ', '.join('%s→%s' % (v, k) for k, v in man['svgNamen'].items())))

print()
print('  %d Manifeste geschrieben nach paket/_maschine/manifeste/' % len(gesamt))
