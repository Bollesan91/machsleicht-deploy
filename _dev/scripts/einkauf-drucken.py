# -*- coding: utf-8 -*-
"""Maschine: druckt die Einkaufsliste aus dem Katalog auf die sechs Seiten, die keine haben.

Befund K (gemessen 17.08., beziffert 18.08.)
--------------------------------------------
Die 45 freien Ratgeberseiten fuehren im Schnitt **33 Einkaufsposten**. Sechs Seiten
fuehren **sechs** — prinzessin und superheld in allen drei Altersgruppen. Sie haben gar
keine Einkaufsliste, nur ein Deko-Raster. Folge: Von 14 geprueften Sicherheitsregeln im
Katalog erreichte auf `prinzessin-9-12` genau EINE den Leser, und `data/freie-seiten-
regeln.json` begruendete die anderen neun woertlich mit "Die freie Seite hat keine
Einkaufsliste".

Die Begruendung stimmte — sie beschrieb aber einen Mangel, keinen Zustand. Die Daten
liegen vollstaendig im Katalog: prinzessin-gross fuehrt 4/7/8 Posten je Variante mit
Emoji, Label, Preis und Affiliate-Link. Es fehlte nicht die Wahrheit, es fehlte die
Ableitung. Bolle-Entscheidung 18.08.: volle Einkaufsliste, wie bei den 39 Geschwistern.

Vertrag
-------
1. **Nur Seiten ohne eigene Liste.** Wer schon eine `table.shopping-table` hat, wird nicht
   angefasst — diese Maschine fuellt eine Luecke, sie ersetzt keine Handarbeit.
2. **Byte-gleiches Markup wie die Geschwister**: `<h4>🛒 Einkaufsliste <Variante></h4>`
   plus `<table class="shopping-table">` mit `<tr><th>Was</th><th>Preis</th></tr>`.
   Damit findet `regeln-drucken.py` die neuen Zeilen als Container und haengt die
   Sicherheitsregeln von selbst an — der Grund, warum hier KEIN Regeltext steht.
3. **Idempotent.** Der Lauf entfernt seinen eigenen Block zuerst und schreibt ihn neu.
4. **Fail-loud.** Ohne Anker (Deko-Raster) bricht der Lauf ab, statt still nichts zu tun.

Aufruf
------
    python _dev/scripts/einkauf-drucken.py           # schreibt
    python _dev/scripts/einkauf-drucken.py --check   # Exit 1, wenn sich etwas aendern wuerde

Danach IMMER `python _dev/scripts/regeln-drucken.py` — erst dann tragen die neuen Zeilen
ihre Regeln.
"""
import glob
import html as html_mod
import io
import json
import os
import re
import sys

try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except Exception:
    pass

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SEITEN_DIR = os.path.join(ROOT, 'kindergeburtstag')
MOTTO_DIR = os.path.join(ROOT, 'data', 'motto')

ALTER = {'3-5': 'klein', '6-8': 'mittel', '9-12': 'gross'}
VARIANTEN_NAME = {'minimal': 'Minimal', 'standard': 'Standard', 'wow': 'Wow'}

MARKE = 'data-einkauf="v1"'
BLOCK_WEG = re.compile(r'<section class="einkauf-abgeleitet"[^>]*>.*?</section>', re.S)
# Anker: hinter dem Deko-Raster. Das Raster enthaelt selbst divs, deshalb wird die
# schliessende Klammer GEZAEHLT, nicht geraten: Der erste Entwurf nahm `.*?</div>\s*</div>`
# und landete damit als Kind IM Grid — im Browser 223 px breit statt 688. Aufgefallen ist
# es nur, weil nach dem Einbau wirklich jemand hingeschaut hat.
DEKO_AUF = re.compile(r'<h2>Deko[^<]*</h2>\s*<div class="deko-grid">')
DIV_KANTE = re.compile(r'<div\b[^>]*>|</div>', re.I)


def nach_deko_raster(text):
    """Position direkt hinter dem schliessenden </div> des Deko-Rasters, sonst None."""
    auf = DEKO_AUF.search(text)
    if not auf:
        return None
    tiefe = 0
    pos = auf.end() - len('<div class="deko-grid">')
    while True:
        m = DIV_KANTE.search(text, pos)
        if not m:
            return None
        if m.group(0).startswith('</'):
            tiefe -= 1
            if tiefe == 0:
                return m.end()
        else:
            tiefe += 1
        pos = m.end()
def _regelmaschine():
    """Die Container-Definition kommt aus regeln-drucken.py, nicht aus einer Kopie (L24).

    Der erste Entwurf prueft nur auf `table.shopping-table` und `ul.list-plain` — und
    haette detektiv-3-5 eine zweite Einkaufsliste verpasst, weil diese Seite ihre Liste
    in einem `div.card` fuehrt. Wer haette das gemerkt? Der fail-loud-Abbruch. Wer haette
    es nicht gemerkt? Ein stiller Filter.
    """
    import importlib.util
    fp = os.path.join(ROOT, '_dev', 'scripts', 'regeln-drucken.py')
    spec = importlib.util.spec_from_file_location('regeln_drucken_container', fp)
    mod = importlib.util.module_from_spec(spec)
    merk, sys.argv = sys.argv, [fp]
    try:
        spec.loader.exec_module(mod)
    finally:
        sys.argv = merk
    return mod


M = _regelmaschine()


def hat_liste(text):
    return any(rx.search(text) for rx, _tag, _typ in M.CONTAINER)


def esc(s):
    return html_mod.escape(str(s or ''), quote=True)


def zeile(posten):
    """Eine Tabellenzeile — Markup wie auf den Geschwisterseiten."""
    label = esc(posten.get('label', '')).strip()
    emoji = (posten.get('emoji') or '').strip()
    url = posten.get('url')
    text = ('<a href="%s" target="_blank" rel="sponsored noopener">%s</a>' % (esc(url), label)
            if url else label)
    was = (emoji + ' ' + text).strip()
    preis = posten.get('priceEur')
    preis_txt = ('~%s&nbsp;€' % preis) if preis not in (None, '') else '—'
    return '<tr><td>%s</td><td>%s</td></tr>' % (was, preis_txt)


def block(daten):
    teile = []
    for variante in daten.get('variants', []):
        posten = variante.get('shoppingList') or []
        if not posten:
            continue
        name = VARIANTEN_NAME.get(variante.get('id'), (variante.get('id') or '').title())
        summe = sum(p.get('priceEur') or 0 for p in posten)
        teile.append(
            '<h4>&#x1F6D2; Einkaufsliste %s</h4>'
            '<table class="shopping-table">'
            '<tr><th>Was</th><th>Preis</th></tr>%s'
            '<tr><td><strong>Zusammen</strong></td><td><strong>~%d&nbsp;€</strong></td></tr>'
            '</table>' % (esc(name), ''.join(zeile(p) for p in posten), summe))
    if not teile:
        return ''
    return ('<section class="einkauf-abgeleitet" ' + MARKE + '>'
            '<h2>&#x1F6D2; Einkaufsliste</h2>'
            '<p>Aus dem Motto-Katalog abgeleitet — dieselben Posten, aus denen der Planer '
            'deinen Einkauf baut. Preise sind Richtwerte.</p>' + ''.join(teile) + '</section>')


def verarbeite(pfad, schreiben):
    rel = 'kindergeburtstag/' + os.path.basename(pfad)
    name = os.path.basename(pfad)[:-len('-jahre.html')]
    m = re.match(r'^(.+?)-(3-5|6-8|9-12)$', name)
    if not m:
        return None
    original = io.open(pfad, encoding='utf-8').read()
    text = BLOCK_WEG.sub('', original)
    if hat_liste(text):
        return None          # Seite fuehrt schon eine Liste — nicht anfassen
    kat = os.path.join(MOTTO_DIR, '%s-%s.json' % (m.group(1), ALTER[m.group(2)]))
    if not os.path.exists(kat):
        return None
    with io.open(kat, encoding='utf-8') as f:
        daten = json.load(f)
    neuer_block = block(daten)
    if not neuer_block:
        return None
    ende = nach_deko_raster(text)
    if ende is None:
        raise SystemExit('FATAL: %s hat kein Deko-Raster als Anker fuer die Einkaufsliste' % rel)
    neu = text[:ende] + neuer_block + text[ende:]
    posten = neu.count('<tr><td>') - neu.count('<td><strong>Zusammen')
    # Zwei Maschinen, ein Block: regeln-drucken.py haengt seine <span class="shop-safe">
    # IN diese Zeilen. Ein naiver Vergleich meldete deshalb bei jedem Lauf eine Aenderung
    # und haette die Regeln beim Schreiben wieder rausgeworfen. Verglichen wird darum
    # ohne die fremden Spans — geaendert ist nur, was aus DIESEM Katalog kommt.
    bericht = {'seite': rel, 'posten': posten,
               'geaendert': M.SPAN_WEG.sub('', neu) != M.SPAN_WEG.sub('', original)}
    if bericht['geaendert'] and schreiben:
        io.open(pfad, 'w', encoding='utf-8', newline='').write(neu)
    return bericht


def main():
    schreiben = '--check' not in sys.argv
    berichte = [b for b in (verarbeite(p, schreiben)
                            for p in sorted(glob.glob(os.path.join(SEITEN_DIR, '*-jahre.html'))))
                if b]
    geaendert = 0
    for b in berichte:
        geaendert += 1 if b['geaendert'] else 0
        print('  %s %-40s %3d Posten gedruckt' % ('*' if b['geaendert'] else ' ',
                                                  b['seite'].replace('kindergeburtstag/', ''),
                                                  b['posten']))
    print('  ---')
    print('  %d Seiten ohne eigene Liste, %d geaendert' % (len(berichte), geaendert))
    if '--check' in sys.argv and geaendert:
        print('  FAIL: Die Maschine haette %d Seiten geaendert.' % geaendert)
        return 1
    return 0


if __name__ == '__main__':
    sys.exit(main())
