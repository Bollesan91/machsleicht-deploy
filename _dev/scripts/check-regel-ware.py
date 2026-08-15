# -*- coding: utf-8 -*-
"""Stufe 43 — Die Regel muss von der Ware sprechen, an der sie steht.

Befund 13.08.2026: `feuerwehr-gross.json` traegt am Posten "Luftballons (optional,
~5 Stueck)" die WUNDERKERZEN-Regel, `feuerwehr-mittel.json` am Posten "Luftballons +
Plakate" ebenfalls. Beide Seiten verkaufen damit Ballons und drucken daneben einen Satz
ueber Kuchenkerzen — die Ballon-Gefahr steht nirgends. Entstanden ist das am 12.08. beim
Massen-Nachziehen der Regeln (`replace` in der Schleife, waehrend der neue Text den alten
enthielt). Der Gutachter hat es nicht gefunden, die Zaehler auch nicht: es waren 22 von 22
Wunderkerzen-Regeln gesetzt — nur eben zwei davon am falschen Posten.

Zwei Pruefrichtungen, aus dem echten Schadensbild abgeleitet:

  FAIL — Die Regel spricht von einer Ware, die dieser Posten nicht fuehrt, waehrend ein
         ANDERER Posten derselben Variante genau diese Ware verkauft. Dann steht hier eine
         fremde Regel (oder eine Dublette): der Ballon-Posten erklaert die Wunderkerze,
         die zwei Zeilen weiter ihren eigenen Satz hat.
  WARN — Das Label fuehrt eine riskante Ware, die Regel erwaehnt sie mit keinem Wort.
         Kein Beweis (Allergie-Regeln zu Schoko-Muenzen nennen die Muenze nicht), aber die
         Arbeitsliste, auf der die naechste Klasse sichtbar wird.

Erste Fassung dieser Datei pruefte nur die zweite Richtung — sie fand neun Stellen, davon
neun harmlos, und liess beide echten Faelle durch, weil die falsche Regel VOR der richtigen
klebte und die Ware damit doch vorkam. Deshalb die Umstellung.

Geprueft werden beide Druckkanaele:
  1. data/motto/*.json            (Paket + Planer)
  2. kindergeburtstag/*-jahre.html (freie Seiten, gerendert von regeln-drucken.py)
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

# Ware -> Muster, mit dem sie in Label ODER Regeltext erkannt wird (normalisierter Text).
# Bewusst eng: nur Waren, deren Verwechslung eine Sicherheitsaussage entwertet.
WAREN = {
    'ballon':          r'ballon',
    'wunderkerze':     r'wunderkerze',
    'nebel':           r'nebel',
    'seifenblasen':    r'seifenblase|seifenlauge|seifenwasser',
    # [- ]? ist Pflicht: norm() laesst Bindestriche stehen, und die realen Labels
    # heissen "Pool-Nudel-Schwerter" — 'pool ?nudel' traf kein einziges (Review MAJOR 11).
    'poolnudel':       r'pool[- ]?nudel|schwimmnudel',
    'gips':            r'gips',
    'heisskleber':     r'heisskleb',
    'nebelfluid':      r'nebelfluid',
    'glitzerspray':    r'glitzer ?spray',
    'waschsoda':       r'waschsoda|natriumcarbonat',
    'knopfzelle':      r'knopfzelle|knopfbatterie',
    'bogen':           r'bogenschiess|pfeil und bogen',
    'buegeleisen':     r'buegeleisen',
    'brandstift':      r'pyrographie|brand-?stift',
}

# Nur diese Waren taugen fuer die WARN-Richtung ("Label nennt sie, Regel schweigt").
# Absichtlich klein: Allergie-Regeln zu Schoko-Muenzen nennen die Muenze nicht, und
# Zucker-Perlen sind keine Glasperlen — beides waeren Fehlalarme.
LABEL_WAREN = ('ballon', 'wunderkerze', 'nebel', 'seifenblasen', 'gips', 'poolnudel')


def norm(s):
    s = html_mod.unescape(str(s or ''))
    s = s.replace('ß', 'ss')
    for a, b in (('ä', 'ae'), ('ö', 'oe'), ('ü', 'ue')):
        s = s.replace(a, b).replace(a.upper(), b)
    s = unicodedata.normalize('NFKD', s)
    s = ''.join(c for c in s if not unicodedata.combining(c))
    return re.sub(r'\s+', ' ', s.lower())


def waren_in(text):
    t = norm(text)
    return set(w for w, mus in WAREN.items() if re.search(mus, t))


def erster_satz(regel):
    teile = re.split(r'(?<=[.!?])\s+', regel.strip())
    satz = teile[0] if teile else regel
    if len(satz) < 30 and len(teile) > 1:      # "Achtung!" o. ae. ist kein Satz im Sinne der Regel
        satz += ' ' + teile[1]
    return satz


def pruefe(quelle, label, regel, fails, warns, nachbarn=None):
    """nachbarn = Waren, die andere Posten derselben Variante im Label fuehren.

    Der Defekt hat eine feste Signatur: die fremde Regel klebt VORNE. Ein Querverweis
    dagegen ("nimm die Ballons vom Tisch, bevor die Wunderkerze brennt") nennt im selben
    ersten Satz die eigene Ware. Deshalb entscheidet der erste Satz, nicht der ganze Text.
    """
    lab = waren_in(label)
    reg = waren_in(regel)
    kopf = waren_in(erster_satz(regel))
    fremd = sorted(w for w in (kopf - lab) if w in (nachbarn or set()))
    if fremd and lab and not (kopf & lab):
        fails.append((quelle, label, fremd, regel))
        return
    stumm = sorted(w for w in lab if w in LABEL_WAREN and w not in reg)
    if stumm:
        warns.append((quelle, label, stumm, regel))


def aus_daten(fails, warns):
    n = 0
    for fp in sorted(glob.glob(os.path.join(ROOT, 'data', 'motto', '*.json'))):
        d = json.load(io.open(fp, encoding='utf-8'))
        for v in (d.get('variants') or []):
            liste = v.get('shoppingList') or []
            for it in liste:
                note = (it.get('safetyNote') or '').strip()
                if not note:
                    continue
                n += 1
                eigen = waren_in(it.get('label') or '')
                nachbarn = set()
                for other in liste:
                    if other is it:
                        continue
                    nachbarn |= (waren_in(other.get('label') or '') - eigen)
                pruefe('%s [%s]' % (os.path.basename(fp), v.get('id')),
                       it.get('label') or '', note, fails, warns, nachbarn)
    return n


REGEL = re.compile(r'<(span|div) class="shop-safe">((?:(?!</\1>).)*)</\1>', re.S)


def lade_renderer():
    import importlib.util
    fp = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'regeln-drucken.py')
    spec = importlib.util.spec_from_file_location('regeln_drucken_43', fp)
    mod = importlib.util.module_from_spec(spec)
    merk, sys.argv = sys.argv, [fp]
    try:
        spec.loader.exec_module(mod)
    finally:
        sys.argv = merk
    return mod


def aus_seiten(fails, warns):
    """Die FAIL-Richtung lief auf dem Seitenkanal ins Leere (Review MAJOR 10): das
    Label kam aus 120 Zeichen Rohtext vor dem Span — bei einem zweiten Span war das
    der Text der ERSTEN Regel — und `nachbarn` fehlte ganz, also konnte `fremd` nie
    belegt sein. Jetzt liefert die Posten-Erkennung des Renderers Label und Nachbarn.
    """
    rd = lade_renderer()
    n = 0
    for fp in sorted(glob.glob(os.path.join(ROOT, 'kindergeburtstag', '*-jahre.html'))):
        text = io.open(fp, encoding='utf-8', errors='replace').read()
        posten = []      # (label_klar, [regeln])
        for h in rd.HEAD.finditer(text):
            c = rd.finde_container(text, h.end())
            if not c:
                continue
            start, ende, typ = c
            for (ps, pe, lab, ein) in rd.posten_im_block(text[start:ende], typ):
                stueck = text[start + ps:start + pe]
                regeln = [m.group(2) for m in REGEL.finditer(stueck)]
                lab_klar = re.sub(r'<[^>]+>', ' ', REGEL.sub('', lab))
                posten.append((re.sub(r'\s+', ' ', lab_klar).strip(), regeln))
        for (ps, pe, lab, ein) in rd.deko_posten(text):
            regeln = [m.group(2) for m in REGEL.finditer(text[ps:pe])]
            lab_klar = re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', lab)).strip()
            posten.append((lab_klar, regeln))
        alle_label_waren = [waren_in(l) for l, _ in posten]
        for i, (lab, regeln) in enumerate(posten):
            if not regeln:
                continue
            eigen = alle_label_waren[i]
            nachbarn = set()
            for j, w in enumerate(alle_label_waren):
                if j != i:
                    nachbarn |= (w - eigen)
            for regel in regeln:
                n += 1
                pruefe(os.path.basename(fp), lab, regel, fails, warns, nachbarn)
    return n


def main():
    fails, warns = [], []
    n1 = aus_daten(fails, warns)
    n2 = aus_seiten(fails, warns)

    for quelle, label, waren, regel in fails:
        print('    FAIL %s: Posten "%s" traegt eine Regel ueber %s — diese Ware verkauft '
              'ein ANDERER Posten derselben Variante'
              % (quelle, label[:56], '/'.join(waren)))
        print('         Regel: %s' % re.sub(r'\s+', ' ', regel)[:110])
    for quelle, label, waren, regel in warns:
        print('    WARN %s: Posten "%s" fuehrt %s, die Regel schweigt dazu'
              % (quelle, label[:56], '/'.join(waren)))

    print('    Stufe 43: %d FAIL, %d WARN (%d Regeln in data/motto, %d gedruckt auf freien Seiten)'
          % (len(fails), len(warns), n1, n2))
    sys.exit(1 if fails else 0)


if __name__ == '__main__':
    main()
