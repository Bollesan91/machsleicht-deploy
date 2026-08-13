# -*- coding: utf-8 -*-
"""Maschine: druckt die Sicherheitsregeln der Datenwahrheit auf die freien Ratgeberseiten.

Warum es diese Maschine gibt (Befund 12.08./13.08.2026)
-------------------------------------------------------
`data/motto/*.json` traegt die geprueften Sicherheitsregeln (`shoppingList[].safetyNote`).
Gedruckt wurden sie bis heute NUR im Paket und auf drei generierten baustelle-Seiten.
Die 45 uebrigen `kindergeburtstag/*-jahre.html` sind eingefrorenes HTML ohne Renderer —
sie verkaufen dieselben Luftballons, Wunderkerzen und Pool-Nudel-Schwerter ohne ein Wort
dazu. Ein zweiter Generator waere die halbe Wahrheit; deshalb ist DIESE Datei der Renderer
fuer das eine Feld `safetyNote`: die Regel bleibt in `data/motto`, die Seite ist Ableitung.

Vertrag
-------
1. Idempotent. Der Lauf entfernt zuerst JEDE vorhandene `<span class="shop-safe">`-Regel
   im Einkaufs-/Deko-Bereich und schreibt sie aus den Daten neu. Zweiter Lauf = leerer Diff.
   Damit ist die Maschine auch das Update: Text in data/motto aendern, Maschine laufen.
2. Fail-loud. Eine Regel, die auf ihrer Seite keinen Posten findet, ist ein FEHLER
   (Exit 1) — nicht ein stiller Verlust. Aufloesbar nur mit einem Eintrag in
   `data/freie-seiten-regeln.json`, der belegt, WARUM.
3. Konvergent mit `_src/generate-age-pages.py`. Fuer `ul.list-plain` erzeugt diese Maschine
   byteweise dasselbe Markup wie der Generator (Label + `<span class="shop-safe">`).
   Ein spaeterer Generatorlauf ueberschreibt also nichts, was hier entsteht.
4. Genau ein Ort je Wahrheit: Regeltext -> data/motto (bzw. eigeneRegeln fuer Posten, die
   es NUR auf der freien Seite gibt). Diese Datei enthaelt keinen einzigen Regeltext.

Aufruf
------
    python _dev/scripts/regeln-drucken.py           # schreibt
    python _dev/scripts/regeln-drucken.py --check   # schreibt nichts, Exit 1 bei Aenderung
    python _dev/scripts/regeln-drucken.py --seite kindergeburtstag/ritter-6-8-jahre.html

Gates: Stufe 42 (jede verkaufende Seite druckt ihre Regeln) prueft das Ergebnis,
`--check` beweist die Idempotenz.
"""
import glob
import html as html_mod
import io
import json
import os
import re
import sys
import unicodedata

try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except Exception:
    pass

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SEITEN_DIR = os.path.join(ROOT, 'kindergeburtstag')
MOTTO_DIR = os.path.join(ROOT, 'data', 'motto')
ANKER_DATEI = os.path.join(ROOT, 'data', 'freie-seiten-regeln.json')

ALTER = {'3-5': 'klein', '6-8': 'mittel', '9-12': 'gross'}


def _paket_kanal():
    """Die Ersetzungen des Generators, aus SEINER Datei geladen — nicht kopiert.

    Ohne sie druckte feen-9-12 "Fuer die UV-Lampe gilt die Regel auf der Spielkarte":
    eine Spielkarte, die es nur im Paket gibt. Stufe 35 hat genau das gefangen.
    """
    import importlib.util
    fp = os.path.join(ROOT, '_src', 'generate-age-pages.py')
    spec = importlib.util.spec_from_file_location('agegen_kanal', fp)
    mod = importlib.util.module_from_spec(spec)
    merk, sys.argv = sys.argv, [fp]          # main() nicht triggern
    try:
        spec.loader.exec_module(mod)
    finally:
        sys.argv = merk
    return list(mod.PAKET_KANAL)


PAKET_KANAL = _paket_kanal()


def planer_kanal(s):
    for a, b in PAKET_KANAL:
        s = s.replace(a, b)
    return s

# Der Generator schreibt color:var(--t) — diese Variable ist im ganzen Repo nirgends
# definiert, die Deklaration verfaellt also. --d (Textfarbe) ist auf allen 48 Seiten da.
CSS_REGEL = ('.shop-safe{display:block;margin-top:3px;font-size:13px;line-height:1.5;'
             'color:var(--d);border-left:2px solid #d94f3d;padding-left:8px}')
CSS_ALT = re.compile(r'\.shop-safe\{[^}]*\}')

SPAN_WEG = re.compile(r'<span class="shop-safe">(?:(?!</span>).)*</span>', re.S)

HEAD = re.compile(r'<h([34])[^>]*>\s*(?:\U0001F6D2|&#x1F6D2;)?\s*Einkaufslist[^<]*</h\1>')

# (Regex des oeffnenden Tags, Tag-Name, Typ)
CONTAINER = [
    (re.compile(r'<ul class="list-plain">'), 'ul', 'ul'),
    (re.compile(r'<table class="shopping-table">'), 'table', 'table'),
    (re.compile(r'<div class="card" style="font-size:13px">'), 'div', 'flex'),
    (re.compile(r'<div style="margin:12px 0">'), 'div', 'flex'),
]

LI = re.compile(r'<li\b[^>]*>(?:(?!</li>).)*</li>', re.S)
TR = re.compile(r'<tr\b[^>]*>(?:(?!</tr>).)*</tr>', re.S)
FLEX = re.compile(r'<div style="display:flex;justify-content:space-between[^"]*">\s*<span>(?:(?!</span>).)*</span>', re.S)

TAGS = re.compile(r'<[^>]+>')
EMOJI = re.compile(
    '[\U0001F000-\U0001FAFF☀-➿️‍←-⇿⬀-⯿]')
MENGE_VORN = re.compile(r'^(?:ca\.?\s*)?\d+\s*(?:x|stk\.?|stueck|er|m|cm|g|kg|ml|l|pack|packungen?|set|sets)?\s+')
KLAMMER = re.compile(r'\([^)]*\)')


def norm(s):
    """Vergleichsform eines Postens/Labels: ohne Tags, Emoji, Klammern, Mengen."""
    s = TAGS.sub(' ', s)
    s = html_mod.unescape(s)
    s = EMOJI.sub(' ', s)
    s = s.replace('ß', 'ss')
    for a, b in (('ä', 'ae'), ('ö', 'oe'), ('ü', 'ue'),
                 ('Ä', 'ae'), ('Ö', 'oe'), ('Ü', 'ue')):
        s = s.replace(a, b)
    s = unicodedata.normalize('NFKD', s)
    s = ''.join(c for c in s if not unicodedata.combining(c))
    s = s.lower()
    s = KLAMMER.sub(' ', s)
    s = re.sub(r'[^a-z0-9]+', ' ', s).strip()
    s = MENGE_VORN.sub('', s)
    return re.sub(r'\s+', ' ', s).strip()


def esc(s):
    """Wie _src/generate-age-pages.py:32 — damit beide Renderer dieselben Bytes erzeugen."""
    return html_mod.escape(str(s or ''), quote=True)


def finde_container(text, ab):
    """Erstes Einkaufs-Container-Element ab Position `ab`; gibt (start, ende, typ)."""
    treffer = None
    for rx, tag, typ in CONTAINER:
        m = rx.search(text, ab, ab + 400)
        if m and (treffer is None or m.start() < treffer[0].start()):
            treffer = (m, tag, typ)
    if not treffer:
        return None
    m, tag, typ = treffer
    tiefe = 0
    pos = m.start()
    scan = re.compile(r'<%s\b[^>]*>|</%s>' % (tag, tag))
    while True:
        t = scan.search(text, pos)
        if not t:
            return None
        if t.group(0).startswith('</'):
            tiefe -= 1
            if tiefe == 0:
                return (m.start(), t.end(), typ)
        else:
            tiefe += 1
        pos = t.end()


def posten_im_block(block, typ):
    """Liste von (start, ende, label_html, einfuege_offset) relativ zum Block."""
    out = []
    if typ == 'ul':
        for m in LI.finditer(block):
            inner = m.group(0)
            ein = m.end() - len('</li>')
            out.append((m.start(), m.end(), inner, ein))
    elif typ == 'table':
        for m in TR.finditer(block):
            roh = m.group(0)
            if '<th' in roh:
                continue
            td = re.search(r'</td>', roh)
            if not td:
                continue
            out.append((m.start(), m.end(), roh[:td.start()], m.start() + td.start()))
    elif typ == 'flex':
        for m in FLEX.finditer(block):
            roh = m.group(0)
            ein = m.end() - len('</span>')
            out.append((m.start(), m.end(), roh, ein))
    return out


def deko_posten(text):
    """Deko-Grid-Karten (prinzessin/superheld verkaufen NUR so): (start, ende, label, einfuege)."""
    out = []
    for m in re.finditer(r'<div class="deko-item">', text):
        # Karte endet vor dem naechsten deko-item oder am Grid-Ende.
        rest = text[m.start():]
        nxt = re.search(r'<div class="deko-item">', rest[1:])
        grenze = (1 + nxt.start()) if nxt else len(rest)
        karte = rest[:grenze]
        schluss = karte.rfind('</div>')
        if schluss < 0:
            continue
        lab = re.search(r'<div class="label">(.*?)</div>', karte, re.S)
        if not lab:
            continue
        out.append((m.start(), m.start() + schluss + len('</div>'),
                    lab.group(1), m.start() + schluss))
    return out


def lade_regeln():
    """(motto, gruppe) -> Liste von (variant_index, label, note) aus data/motto."""
    regeln = {}
    for fp in sorted(glob.glob(os.path.join(MOTTO_DIR, '*.json'))):
        name = os.path.basename(fp)[:-5]
        if '-' not in name:
            continue
        motto, gruppe = name.rsplit('-', 1)
        if gruppe not in ('klein', 'mittel', 'gross'):
            continue
        d = json.load(io.open(fp, encoding='utf-8'))
        eintraege = []
        for vi, v in enumerate(d.get('variants') or []):
            for it in (v.get('shoppingList') or []):
                note = (it.get('safetyNote') or '').strip()
                if note:
                    eintraege.append((vi, (it.get('label') or '').strip(), note))
        if eintraege:
            regeln[(motto, gruppe)] = eintraege
    return regeln


def lade_anker():
    if not os.path.exists(ANKER_DATEI):
        return {'anker': {}, 'keinPosten': {}, 'eigeneRegeln': {}, 'warenRegeln': {}}
    d = json.load(io.open(ANKER_DATEI, encoding='utf-8'))
    return {'anker': d.get('anker') or {},
            'keinPosten': d.get('keinPosten') or {},
            'eigeneRegeln': d.get('eigeneRegeln') or {},
            'warenRegeln': d.get('warenRegeln') or {}}


def css_setzen(text):
    """Sorgt dafuer, dass .shop-safe formatiert ist — sonst rendert die Regel als Fliesstext."""
    if CSS_REGEL in text:
        return text, False
    if CSS_ALT.search(text):
        return CSS_ALT.sub(lambda _: CSS_REGEL, text, count=1), True
    m = re.search(r'</style>', text)
    if not m:
        return text, False
    return text[:m.start()] + CSS_REGEL + text[m.start():], True


def regeln_setzen(text, rel, motto, gruppe, regeln, anker):
    """Kern der Maschine: HTML rein, HTML mit Regeln raus — ohne Datei-I/O.

    Getrennt, damit Stufe 36 dieselbe Pipeline auf das frische Generator-Ergebnis
    anwenden kann. Sonst waere die generierte Seite nach jedem Regel-Lauf "abweichend",
    und das Gate haette sich selbst wegdiskutiert.
    """
    quelle = list(regeln.get((motto, gruppe), []))
    eigene = anker['eigeneRegeln'].get(rel) or []
    if not quelle and not eigene:
        return text, None

    # --- 1. Alte Regeln raus (Idempotenz + Update in einem Schritt) --------------
    text = SPAN_WEG.sub('', text)
    text = re.sub(r'<div class="shop-safe">(?:(?!</div>).)*</div>', '', text, flags=re.S)

    # --- 2. Posten der Seite einsammeln ------------------------------------------
    # (position, label_html, einfuege_position, herkunft, block_index)
    # block_index = 0/1/2 fuer Minimal/Standard/Wow in Dokumentreihenfolge, None fuer Deko.
    posten = []
    for bi, h in enumerate(HEAD.finditer(text)):
        c = finde_container(text, h.end())
        if not c:
            continue
        start, ende, typ = c
        block = text[start:ende]
        for (ps, pe, lab, ein) in posten_im_block(block, typ):
            posten.append([start + ps, lab, start + ein, 'einkauf', bi])
    for (ps, pe, lab, ein) in deko_posten(text):
        posten.append([ps, lab, ein, 'deko', None])

    if not posten:
        return text, {'seite': rel, 'posten': 0, 'regeln': len(quelle) + len(eigene),
                      'gedruckt': 0, 'klasse': 0,
                      'offen': [(l, 'Seite hat keinen Verkaufs-Container')
                                for _, l, _ in quelle]}

    normiert = [(norm(p[1]), p) for p in posten]

    # --- 3. Regeln zuordnen -------------------------------------------------------
    seiten_anker = anker['anker'].get(rel) or {}
    kein = anker['keinPosten'].get(rel) or {}
    zuweisung = {}   # einfuege_position -> Regeltext
    offen = []

    def treffer_fuer(label):
        """Alle Posten der Seite, die diese Ware fuehren — ohne Block-Praeferenz.

        NUR normalisierte Gleichheit, kein Teilstring. Grund (13.08., am eigenen
        Ergebnis gefunden): Teilstring-Matching haengte die Ballon-Regel unter
        "Atlantis-Girlande", weil deren Label im Bundle "Girlande + Luftballons"
        steckt. Eine Sicherheitsregel am falschen Posten ist schlimmer als eine
        fehlende — die fehlende faellt wenigstens im Gate auf. Alles, was nicht
        wortgleich ist, braucht einen belegten Eintrag in data/freie-seiten-regeln.json.
        """
        nl = norm(label)
        if not nl:
            return []
        exakt = [p for n, p in normiert if n == nl]
        if exakt:
            return exakt
        wenn_anker = seiten_anker.get(label)
        if wenn_anker:
            ziele = wenn_anker if isinstance(wenn_anker, list) else [wenn_anker]
            na = set(norm(z) for z in ziele)
            return [p for n, p in normiert if n in na]
        return []

    def vorschlaege(label):
        """Nur fuer den Bericht: welche Posten KOENNTEN gemeint sein (Teilstring)."""
        nl = norm(label)
        return [re.sub(r'\s+', ' ', TAGS.sub('', p[1])).strip()[:60]
                for n, p in normiert
                if len(n) >= 8 and len(nl) >= 8 and (nl in n or n in nl)][:3]

    # 3a. Variantengenau: die Regel der Variante i gehoert in Block i. Die drei Bloecke
    #     tragen unterschiedliche Texte fuer dieselbe Ware — detektiv-klein hat drei
    #     Muenz-Regeln, je nach Menge und Aufsicht anders formuliert.
    ware_regel = {}   # normalisiertes Warenlabel -> [(variantIndex, note)]
    for vi, label, note in quelle:
        if label in kein:
            continue
        tr = treffer_fuer(label)
        if not tr:
            v = vorschlaege(label)
            offen.append((label, 'kein wortgleicher Posten' +
                          ((' — Kandidat: ' + v[0]) if v else '')))
            continue
        ware_regel.setdefault(norm(label), []).append((vi, note))
        eigener_block = [p for p in tr if p[4] == vi]
        ziel = eigener_block or tr
        for p in ziel:
            alt = zuweisung.get(p[2])
            if alt and alt != note:
                if eigener_block:
                    offen.append((label, 'zweite Regel im selben Block'))
                else:
                    continue
            zuweisung[p[2]] = note

    # 3b. Nachzug: verkauft ein Block dieselbe Ware ohne eigene Variantenregel, bekommt er
    #     die Regel der naechstliegenden Variante. Ein Posten ohne Regel waere genau der
    #     Defekt, den diese Maschine schliesst.
    for n, p in normiert:
        if p[2] in zuweisung or not n:
            continue
        passend = ware_regel.get(n)
        if passend:
            block = p[4] if p[4] is not None else 0
            zuweisung[p[2]] = min(passend, key=lambda e: abs(e[0] - block))[1]

    # 3c. Klassenregel: Die freie Seite fuehrt Waren, fuer die data/motto keinen Posten hat
    #     (eigenes Sortiment, Ticket K6). Wer Ballons verkauft, druckt die Ballon-Regel —
    #     unabhaengig davon, ob der Katalog denselben Artikel kennt.
    aus_klasse = 0
    for n, p in normiert:
        if p[2] in zuweisung:
            continue
        klar = re.sub(r'\s+', ' ', html_mod.unescape(TAGS.sub(' ', p[1]))).strip()
        for ware, e in (anker.get('warenRegeln') or {}).items():
            # NICHT `text` nennen: das ist das Dokument. Der erste Entwurf tat es und
            # schrieb die Regel als ganze Seite — 46 Dateien auf 1,5 kB gekuerzt. Der
            # Idempotenz-Lauf hat es im selben Atemzug gefangen (198 offen statt 0).
            regeltext = (e.get('alter') or {}).get(gruppe)
            if not regeltext or not re.search(e['muster'], klar, re.I):
                continue
            if e.get('nicht') and re.search(e['nicht'], klar, re.I):
                continue
            # "Backmischung ... (ohne Wunderkerze)" verkauft die Ware ausdruecklich NICHT.
            # Klammer ist Pflicht: ohne sie zerfaellt 'ohne...led-?kerze|teelicht|
            # lichterkette' in drei Alternativen und 'Lichterkette' trifft sich selbst.
            if re.search(r'ohne\s+\w{0,12}(?:' + e['muster'] + ')', klar, re.I):
                continue
            zuweisung[p[2]] = regeltext
            aus_klasse += 1
            break

    for e in eigene:
        tr = treffer_fuer(e.get('posten') or '')
        if not tr:
            offen.append((e.get('posten') or '?', 'eigene Regel ohne Posten'))
            continue
        for p in tr:
            zuweisung.setdefault(p[2], e.get('regel') or '')

    # --- 4. Einsetzen (von hinten, damit Positionen gueltig bleiben) --------------
    if '--zeigen' in sys.argv:
        for pos in sorted(zuweisung.keys()):
            p = next(q for q in posten if q[2] == pos)
            print('      [%s%s] %-52s => %s'
                  % (p[3][:2], ('' if p[4] is None else p[4]),
                     re.sub(r'\s+', ' ', TAGS.sub('', p[1]))[:52],
                     re.sub(r'\s+', ' ', zuweisung[pos])[:70]))

    gedruckt = 0
    for pos in sorted(zuweisung.keys(), reverse=True):
        note = zuweisung[pos]
        if not note:
            continue
        herkunft = next((p[3] for p in posten if p[2] == pos), 'einkauf')
        note = planer_kanal(note)
        if herkunft == 'deko':
            frag = '<div class="shop-safe">%s</div>' % esc(note)
        else:
            frag = '<span class="shop-safe">%s</span>' % esc(note)
        text = text[:pos] + frag + text[pos:]
        gedruckt += 1

    text, _ = css_setzen(text)
    return text, {'seite': rel, 'posten': len(posten), 'regeln': len(quelle) + len(eigene),
                  'gedruckt': gedruckt, 'klasse': aus_klasse, 'offen': offen}


def verarbeite(pfad, regeln, anker, schreiben):
    rel = 'kindergeburtstag/' + os.path.basename(pfad)
    name = os.path.basename(pfad)[:-len('-jahre.html')]
    m = re.match(r'^(.+?)-(3-5|6-8|9-12)$', name)
    if not m:
        return None
    original = io.open(pfad, encoding='utf-8').read()
    neu, bericht = regeln_setzen(original, rel, m.group(1), ALTER[m.group(2)], regeln, anker)
    if bericht is None:
        return None
    bericht['geaendert'] = neu != original
    if bericht['geaendert'] and schreiben:
        io.open(pfad, 'w', encoding='utf-8', newline='').write(neu)
    return bericht


def main():
    schreiben = '--check' not in sys.argv
    nur = None
    if '--seite' in sys.argv:
        nur = os.path.basename(sys.argv[sys.argv.index('--seite') + 1])

    regeln = lade_regeln()
    anker = lade_anker()

    dateien = sorted(glob.glob(os.path.join(SEITEN_DIR, '*-jahre.html')))
    if nur:
        dateien = [f for f in dateien if os.path.basename(f) == nur]

    berichte = [b for b in (verarbeite(f, regeln, anker, schreiben) for f in dateien) if b]

    fehler = 0
    geaendert = 0
    summe_gedruckt = 0
    for b in berichte:
        if b['geaendert']:
            geaendert += 1
        summe_gedruckt += b['gedruckt']
        flag = '*' if b['geaendert'] else ' '
        print('  %s %-46s Posten %3d  Regeln %2d  gedruckt %2d (davon Klasse %2d)%s'
              % (flag, b['seite'].replace('kindergeburtstag/', ''), b['posten'],
                 b['regeln'], b['gedruckt'], b.get('klasse', 0),
                 ('  OFFEN %d' % len(b['offen'])) if b['offen'] else ''))
        for label, grund in b['offen']:
            print('      OFFEN  %-52s %s' % (label[:52], grund))
            fehler += 1

    print('  ---')
    print('  %d Seiten, %d Regeln gedruckt, %d Seiten geaendert, %d offen'
          % (len(berichte), summe_gedruckt, geaendert, fehler))

    if '--check' in sys.argv and geaendert:
        print('  FAIL: Maschine haette %d Seiten geaendert — die Seiten sind nicht abgeleitet.'
              % geaendert)
        sys.exit(1)
    if fehler:
        print('  FAIL: %d Regeln ohne Anker. Jede braucht einen Eintrag in '
              'data/freie-seiten-regeln.json (anker oder keinPosten mit Grund).' % fehler)
        sys.exit(1)
    sys.exit(0)


if __name__ == '__main__':
    main()
