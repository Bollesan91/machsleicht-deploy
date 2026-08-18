# -*- coding: utf-8 -*-
"""Stufe 38 — Traegt das Zeitfenster das Programm der Variante?

Rechnet NICHT mit einem eigenen Modell, sondern spielt buildTimeline() aus
paket/core/paket-core.js Schritt fuer Schritt nach — inklusive Finale-Slot
(FIN), kern-Freihaltung (kernAhead) und der Essens-Kaskade. Die erste Fassung
vom 12.08. hatte ein vereinfachtes Modell und war in 84 von 441 Fenstern zu
optimistisch (Re-Check-M4): sie meldete Spiele als eingeplant, die der
Renderer in die Reserve schiebt. Ein Gate, das nicht misst, was gedruckt wird,
ist schlimmer als keines — deshalb hier die 1:1-Portierung.

Meldet zwei Klassen:
  (a) Das Fenster traegt das Programm nicht (unter 2 Spielen im Plan oder mehr
      in Reserve als im Plan). Ein einzelnes Reserve-Spiel ist gewollter Puffer.
  (b) Ein Spiel liegt in JEDER Variante in der Reserve, wird aber anderswo als
      Programmpunkt verkauft (Countdown, Einkaufsliste, Rollenkarte) —
      Re-Check-M3: 30 Minuten Werkzeug-Quiz, das nie stattfindet.
"""
import glob
import io
import json
import re
import sys

# Windows-Konsole ist cp1252 — Emoji in Spielnamen liessen die Stufe
# mit UnicodeEncodeError abbrechen statt zu melden (12.08.).
try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

FAIL_MOTTOS = {'baustelle'}
UEBERGABE, ESSEN, ESSEN_MIN, RIT, PAUSE = 15, 40, 25, 20, 5
RX_FENSTER = re.compile(r'(\d{1,2}):(\d{2})\s*[–-]\s*(\d{1,2}):(\d{2})')


def dauer(g):
    m = re.search(r'\d+', str(g.get('duration') or ''))
    return int(m.group(0)) if m else 0


def plan_und_reserve(v):
    """1:1-Portierung von buildTimeline() — liefert (im Plan, in Reserve)."""
    m = RX_FENSTER.search(v.get('timeWindow') or '')
    if not m:
        return None
    start = int(m.group(1)) * 60 + int(m.group(2))
    end = int(m.group(3)) * 60 + int(m.group(4))
    if end <= start:
        end = start + 180
    endCap = end - UEBERGABE
    spiele = [{'name': (g.get('name') or '?'), 'dur': dauer(g), 'kern': g.get('kern') is True}
              for g in (v.get('games') or [])]
    if not spiele:
        return None

    t = start
    t += min(RIT, max(10, endCap - t))                    # Ankommen & Ritual

    finale = spiele[-1] if len(spiele) > 2 else None
    spielbar = spiele[:-1] if finale else spiele
    FIN = finale['dur'] + PAUSE if finale else 0

    queue = [{'game': g} for g in spielbar[:2]] + [{'essen': True}] \
        + [{'game': g} for g in spielbar[2:]]

    def kern_ahead(i):
        return sum(x['game']['dur'] + PAUSE for x in queue[i + 1:]
                   if x.get('game') and x['game']['kern'])

    plan, reserve, essen_done = [], [], False
    for qi, item in enumerate(queue):
        if item.get('essen'):
            bud = endCap - t - (FIN + kern_ahead(qi))
            cap = ESSEN
            if bud < ESSEN_MIN:
                dA = max(min(ESSEN, bud), 0)
                kern_rest = kern_ahead(qi)
                kern_passt_noch = kern_rest > 0 and (t + dA + kern_rest + FIN <= endCap)
                if not kern_passt_noch:
                    bud = endCap - t - FIN
                    cap = ESSEN_MIN
            if bud < 10:
                bud = endCap - t
                cap = ESSEN_MIN
            d = max(min(cap, bud), 0)
            if d >= 10:
                t += d
            essen_done = True
            continue
        g = item['game']
        need = g['dur'] + PAUSE + (0 if essen_done else ESSEN_MIN) + FIN + kern_ahead(qi)
        if t + need <= endCap:
            t += g['dur'] + PAUSE
            plan.append(g['name'])
        else:
            reserve.append(g['name'])
    if finale:
        (plan if t + FIN <= endCap else reserve).append(finale['name'])
    return plan, reserve


def check_file(fp):
    findings = []
    d = json.load(io.open(fp, encoding='utf-8'))
    varianten = d.get('variants') or []
    reserve_je_variante = []
    for v in varianten:
        erg = plan_und_reserve(v)
        if not erg:
            continue
        plan, reserve = erg
        reserve_je_variante.append(set(reserve))
        if len(plan) < 2 or len(reserve) > len(plan):
            findings.append('%s variants[%s] "%s": %d Spiele im Plan, %d in Reserve (%s)'
                            % (fp, v.get('id', '?'), v.get('timeWindow', ''),
                               len(plan), len(reserve), ', '.join(r[:24] for r in reserve)))

    # (b) Spiel, das in JEDER Variante liegen bleibt, aber verkauft wird
    if reserve_je_variante and len(reserve_je_variante) == len([v for v in varianten if v.get('games')]):
        immer_reserve = set.intersection(*reserve_je_variante) if reserve_je_variante else set()
        satelliten = json.dumps({k: val for k, val in d.items() if k != 'variants'}, ensure_ascii=False)
        for name in sorted(immer_reserve):
            kern = re.sub(r'^[^\wÄÖÜäöü]+', '', name).split('(')[0].strip()
            if not kern:
                continue
            # Als Bonus/Optional gekennzeichnete Erwaehnungen sind ehrlich — sie
            # verkaufen kein Programm, sie bieten eins an. Nur ungekennzeichnete
            # Nennungen sind das Versprechen, das der Plan nicht haelt.
            ungekennzeichnet = [m.start() for m in re.finditer(re.escape(kern), satelliten)
                                if not re.search(r'(?:Bonus|Optional|falls Zeit)[^"]{0,60}$',
                                                 satelliten[max(0, m.start() - 70):m.start()])]
            if ungekennzeichnet:
                findings.append('%s: "%s" liegt in JEDER Variante in der Reserve, wird aber '
                                '%dx ungekennzeichnet als Programmpunkt genannt'
                                % (fp, kern, len(ungekennzeichnet)))
    return findings


def main():
    fail = warn = 0
    for fp in sorted(glob.glob('data/motto/*-klein.json') + glob.glob('data/motto/*-mittel.json')
                     + glob.glob('data/motto/*-gross.json')):
        motto = re.sub(r'-(klein|mittel|gross)\.json$', '', fp.replace('\\', '/').split('/')[-1])
        fs = check_file(fp)
        hart = motto in FAIL_MOTTOS
        for f in fs:
            print('    %s %s' % ('FAIL' if hart else 'WARN', f))
        fail += len(fs) if hart else 0
        warn += 0 if hart else len(fs)
    print('    Stufe 38: %d FAIL (Gate-Scope: %s), %d WARN'
          % (fail, ','.join(sorted(FAIL_MOTTOS)), warn))
    sys.exit(1 if fail else 0)


if __name__ == '__main__':
    main()
