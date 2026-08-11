# -*- coding: utf-8 -*-
"""Uebergangs-Sync (bis Maschinen-Programm Schritt 3 den elite-Katalog ersetzt):
kopiert die 5 Gate-Felder data/motto -> _src/elite-motto-data fuer baustelle.
Nach JEDER Aenderung an baustelle-*.json laufen lassen, dann
python _src/generate-age-pages.py. Stufe 35 prueft das Ergebnis."""
import io
import json

SYNC = ('faq', 'parentTips', 'preparationWeeks', 'sosScenarios', 'signatureRitual')

def main():
    for grp in ('klein', 'mittel', 'gross'):
        mfp = 'data/motto/baustelle-%s.json' % grp
        efp = '_src/elite-motto-data/baustelle-%s.json' % grp
        m = json.load(io.open(mfp, encoding='utf-8'))
        e = json.load(io.open(efp, encoding='utf-8'))
        delta = [f for f in SYNC if e.get(f) != m.get(f)]
        for f in SYNC:
            e[f] = m[f]
        io.open(efp, 'w', encoding='utf-8', newline='').write(
            json.dumps(e, ensure_ascii=False, indent=2) + '\n')
        print('SYNC %s (%s)' % (efp, ', '.join(delta) if delta else 'schon identisch'))

if __name__ == '__main__':
    main()
