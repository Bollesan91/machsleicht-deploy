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
    'poolnudel':       r'pool ?nudel|schwimmnudel',
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


SPAN = re.compile(r'(?P<vor>[^<>]{0,120})<span class="shop-safe">(?P<regel>(?:(?!</span>).)*)</span>', re.S)
DIV = re.compile(r'<div class="label">(?P<vor>[^<]*)</div>.*?<div class="shop-safe">(?P<regel>(?:(?!</div>).)*)</div>', re.S)


def aus_seiten(fails, warns):
    n = 0
    for fp in sorted(glob.glob(os.path.join(ROOT, 'kindergeburtstag', '*-jahre.html'))):
        text = io.open(fp, encoding='utf-8', errors='replace').read()
        for m in SPAN.finditer(text):
            n += 1
            pruefe(os.path.basename(fp), re.sub(r'<[^>]+>', '', m.group('vor')),
                   m.group('regel'), fails, warns)
        for m in DIV.finditer(text):
            n += 1
            pruefe(os.path.basename(fp), m.group('vor'), m.group('regel'), fails, warns)
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
