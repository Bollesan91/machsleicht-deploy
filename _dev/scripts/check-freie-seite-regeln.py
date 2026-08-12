# -*- coding: utf-8 -*-
"""Stufe 42 — Was die freie Seite verkauft, muss sie auch regeln.

Befund 12.08. abends: `data/motto` traegt 198 gedruckte Sicherheitsregeln, die
freien Ratgeberseiten unter `kindergeburtstag/` trugen 0. Der Generator kannte
das Feld `safetyNote` nicht (behoben), aber er erzeugt nur drei der fuenfzehn
Mottos — die uebrigen 45 Seiten sind eingefrorenes HTML, das niemand mehr neu
rendert. Sie verkaufen dieselben Wunderkerzen, Luftballons und Pool-Nudel-
Schwerter wie das Paket, ohne ein Wort dazu.

Diese Stufe vergleicht Seite gegen Datenquelle: Hat das Motto in der passenden
Altersgruppe Regeln, muessen sie auch auf der Seite stehen. Sie faellt erst,
wenn beides existiert — eine Seite ohne Einkaufsliste und ein Motto ohne Regeln
sind kein Befund.

Solange die Zahl steht, ist sie die ehrliche Groesse des Parallel-Katalog-
Problems (Ticket K6), nicht eine Behauptung darueber.
"""
import glob
import io
import json
import os
import re
import sys

try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

FAIL_MOTTOS = {'baustelle'}
ALTER = {'3-5': 'klein', '6-8': 'mittel', '9-12': 'gross'}


def regeln_der_quelle(motto, gruppe):
    fp = os.path.join('data', 'motto', '%s-%s.json' % (motto, gruppe))
    if not os.path.exists(fp):
        return []
    d = json.load(io.open(fp, encoding='utf-8'))
    return [(it.get('label') or '', it['safetyNote'])
            for v in (d.get('variants') or [])
            for it in (v.get('shoppingList') or [])
            if (it.get('safetyNote') or '').strip()]


def main():
    fail = warn = 0
    for seite in sorted(glob.glob(os.path.join('kindergeburtstag', '*-jahre.html'))):
        name = os.path.basename(seite)[:-len('-jahre.html')]
        m = re.match(r'^(.+?)-(3-5|6-8|9-12)$', name)
        if not m:
            continue                      # z.B. die alten "3-5-jahre.html" ohne Motto
        motto, spanne = m.group(1), m.group(2)
        html = io.open(seite, encoding='utf-8', errors='replace').read()
        if 'Einkaufsliste' not in html:
            continue                      # verkauft nichts, regelt nichts
        quelle = regeln_der_quelle(motto, ALTER[spanne])
        if not quelle:
            continue                      # Motto hat selbst keine Regeln
        gedruckt = html.count('shop-safe')
        if gedruckt:
            continue
        hart = motto in FAIL_MOTTOS
        print('    %s %s: verkauft eine Einkaufsliste, %d Regeln liegen in '
              'data/motto/%s-%s.json — gedruckt wird keine'
              % ('FAIL' if hart else 'WARN', seite, len(quelle), motto, ALTER[spanne]))
        fail += 1 if hart else 0
        warn += 0 if hart else 1
    print('    Stufe 42: %d FAIL (Gate-Scope: %s), %d WARN (Arbeitsliste kommender Gates)'
          % (fail, ','.join(sorted(FAIL_MOTTOS)), warn))
    sys.exit(1 if fail else 0)


if __name__ == '__main__':
    main()
