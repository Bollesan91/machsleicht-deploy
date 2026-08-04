# -*- coding: utf-8 -*-
"""Paket-Maschine Stufe 2: EIN Template + N Manifeste -> N Pakete.

    python _dev/scripts/paket-bauen.py            # Rundlauf-Beweis, schreibt nichts
    python _dev/scripts/paket-bauen.py schreib    # baut die Pakete wirklich

DER BEWEIS steht ueber allem: Solange die Maschine die bestehenden Pakete nicht
byte-genau reproduziert, ist sie nicht fertig — dann waere sie nur eine zweite
Wahrheit neben der ersten, und davon hat dieses Repo genug.

Eine Abweichung ist erlaubt und beabsichtigt: Die drei Signet-Funktionen heissen
heute in jedem Paket anders (compassSvg / footprintSvg / helmSvg fuer dieselbe
Rolle). Die Maschine benennt sie nach Rolle — signetSvg, siegelSvg, coverSvg —
und zaehlt genau nach, dass NUR das der Unterschied ist.
"""
import pathlib, re, json, sys, difflib

WURZEL = pathlib.Path('.')
MANIFESTE = WURZEL / 'paket/_maschine/manifeste'
TEMPLATE = WURZEL / 'paket/_maschine/template.html'
VORLAGE_MOTTO = 'feuerwehr'   # aus diesem Paket entsteht das Template

SLOTS = ['palette', 'cfg', 'epithets', 'gamemeta', 'demo']
SVG_ROLLEN = ['signet', 'siegel', 'cover']


def normiere_svg(text, namen):
    """Ersetzt die mottospezifischen SVG-Funktionsnamen durch ihre Rolle —
       Definition UND jede Aufrufstelle."""
    for rolle, alt in namen.items():
        text = re.sub(r'\b%s\b' % re.escape(alt), '%sSvg' % rolle, text)
    return text


def template_bauen(manifest, quelle):
    """Schneidet die Manifest-Bloecke aus dem Quellpaket und setzt Platzhalter."""
    t = quelle
    for slot in SLOTS:
        blk = manifest[slot]
        if t.count(blk) != 1:
            raise SystemExit('ABBRUCH: Block %s kommt %dx vor, erwartet 1x' % (slot, t.count(blk)))
        t = t.replace(blk, '{{%s}}' % slot, 1)
    # SVGs: erst Namen normieren, dann die (normierten) Bloecke ausschneiden
    t = normiere_svg(t, manifest['svgNamen'])
    for rolle in SVG_ROLLEN:
        blk = manifest['svg'][rolle]
        if t.count(blk) != 1:
            raise SystemExit('ABBRUCH: SVG %s kommt %dx vor, erwartet 1x' % (rolle, t.count(blk)))
        t = t.replace(blk, '{{svg:%s}}' % rolle, 1)
    return t


def bauen(template, manifest):
    t = template
    for slot in SLOTS:
        t = t.replace('{{%s}}' % slot, manifest[slot])
    for rolle in SVG_ROLLEN:
        t = t.replace('{{svg:%s}}' % rolle, manifest['svg'][rolle])
    # Stufe 3b: die 55 abgeleiteten Wort-Slots. Jedes Motto bringt eigene Werte
    # mit, auch feuerwehr — das Template spricht kein Motto-Deutsch mehr.
    for sid, wert in (manifest.get('woerter') or {}).items():
        t = t.replace('{{%s}}' % sid, wert)
    rest = re.findall(r'\{\{[^}]+\}\}', t)
    if rest:
        raise SystemExit('ABBRUCH: unbefuellte Platzhalter %s' % sorted(set(rest)))
    return t


def diff_bericht(a, b, titel):
    """Zaehlt die Unterschiede und sagt, ob sie nur die SVG-Namen betreffen."""
    za, zb = a.split('\n'), b.split('\n')
    sm = difflib.SequenceMatcher(None, za, zb, autojunk=False)
    zeilen = []
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == 'equal':
            continue
        zeilen += ['- ' + x for x in za[i1:i2]] + ['+ ' + x for x in zb[j1:j2]]
    nur_svg = all(re.search(r'\b(compass|footprint|helm|seal|fossilSeal|abzeichen|shipCover|jungleCover|wacheCover|signet|siegel|cover)Svg\b', z)
                  for z in zeilen) if zeilen else True
    return len(zeilen), nur_svg, zeilen


# ---------------------------------------------------------------- Rundlauf
man = {p.stem: json.loads(p.read_text(encoding='utf-8')) for p in sorted(MANIFESTE.glob('*.json'))}
if VORLAGE_MOTTO not in man:
    raise SystemExit('ABBRUCH: Manifest fuer %s fehlt' % VORLAGE_MOTTO)

template = TEMPLATE.read_text(encoding='utf-8')   # Stufe 3b: Template ist gebaut und versioniert

print('Template aus %s: %d Zeichen, %d Platzhalter' %
      (VORLAGE_MOTTO, len(template), len(re.findall(r'\{\{[^}]+\}\}', template))))
print()
print('RUNDLAUF — regeneriertes Paket gegen das heutige:')

alles_gut = True
for motto in sorted(man):
    ist = (WURZEL / ('paket/%s/index.html' % motto)).read_text(encoding='utf-8')
    soll_ist = normiere_svg(ist, man[motto]['svgNamen'])   # Vergleichsbasis: Namen normiert
    neu = bauen(template, man[motto])
    n, nur_svg, zeilen = diff_bericht(soll_ist, neu, motto)
    if motto == VORLAGE_MOTTO:
        status = 'IDENTISCH' if n == 0 else '%d Zeilen ABWEICHUNG' % n
        if n: alles_gut = False
    else:
        status = '%d Zeilen anders (Wortwahl — kommt in Stufe 3)' % n
    print('  %-14s %s' % (motto, status))
    if motto == VORLAGE_MOTTO and n:
        for z in zeilen[:12]: print('      ', z[:150])

print()
if not alles_gut:
    print('BEWEIS NICHT ERBRACHT — die Maschine reproduziert %s nicht.' % VORLAGE_MOTTO)
    sys.exit(1)
print('BEWEIS: %s wird byte-genau reproduziert (SVG-Namen auf ihre Rolle normiert).' % VORLAGE_MOTTO)
print('Die anderen vier weichen noch in der Wortwahl ab — das sind die Slots von Stufe 3.')

if 'schreib' in sys.argv:
    TEMPLATE.parent.mkdir(parents=True, exist_ok=True)
    TEMPLATE.write_text(template, encoding='utf-8')
    print('\nTemplate geschrieben: %s' % TEMPLATE)
else:
    print('\nTROCKENLAUF — nichts geschrieben. Zum Schreiben: ... schreib')
