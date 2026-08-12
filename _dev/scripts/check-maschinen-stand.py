# -*- coding: utf-8 -*-
"""Stufe 36 — "Maschine fixen, nicht das Paket" (Bolle 12.08.2026).

Prueft, dass jede GENERIERTE Datei exakt das ist, was die Maschine heute
erzeugt. Faengt zwei Klassen, die uns diese Woche je einen MAJOR gekostet
haben:
  (a) Hand-Edit an einer generierten Datei — er verschwindet beim naechsten
      Lauf spurlos (und der Reviewer hat umsonst gelesen);
  (b) STALE-Datei — die Quelle wurde geaendert, die Seite nie neu gebaut
      (so lebte die 5-cm-Regel weiter, obwohl sie in den Daten weg war).

Scope: die Age-Pages der Mottos, die schon auf der Maschine sind. pferde/
ritter kommen dazu, sobald sie ihr eigenes Gate durchlaufen haben — ihre
Regeneration macht neuen Content sichtbar (Bolle-Regel resurfaced Content).
"""
import importlib.util
import io
import pathlib
import sys

MASCHINEN_MOTTOS = ('baustelle',)
AGE_SLUG = {'klein': '3-5-jahre', 'mittel': '6-8-jahre', 'gross': '9-12-jahre'}


def lade_generator():
    fp = pathlib.Path('_src/generate-age-pages.py')
    spec = importlib.util.spec_from_file_location('agegen', fp)
    mod = importlib.util.module_from_spec(spec)
    sys.argv = [str(fp)]                      # main() nicht triggern
    spec.loader.exec_module(mod)
    return mod


def main():
    gen = lade_generator()
    fails = []
    geprueft = 0
    for motto in MASCHINEN_MOTTOS:
        for grp, slug in AGE_SLUG.items():
            quelle = pathlib.Path('_src/elite-motto-data/%s-%s.json' % (motto, grp))
            ziel = pathlib.Path('kindergeburtstag/%s-%s.html' % (motto, slug))
            if not quelle.exists() or not ziel.exists():
                fails.append('%s: Quelle oder Ziel fehlt' % ziel)
                continue
            soll = gen.build_page(quelle, motto, grp)
            ist = io.open(ziel, encoding='utf-8', newline='').read()
            geprueft += 1
            if ist.replace('\r\n', '\n') != soll.replace('\r\n', '\n'):
                fails.append('%s weicht vom Maschinen-Ergebnis ab — Hand-Edit oder '
                             'nicht neu gebaut (python _src/generate-age-pages.py --motto %s)'
                             % (ziel, motto))
    for f in fails:
        print('    FAIL %s' % f)
    print('    Stufe 36: %d Seite(n) geprueft, %d FAIL' % (geprueft, len(fails)))
    sys.exit(1 if fails else 0)


if __name__ == '__main__':
    main()
