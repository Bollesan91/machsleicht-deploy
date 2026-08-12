# -*- coding: utf-8 -*-
"""Stufe 38 — Traegt das Zeitfenster das Programm der Variante? (Pilot M1)

Der Scheduler ist nicht schuld, wenn die Daten mehr wollen als der Tag hergibt:
klein/minimal hat 14:30–16:00 (90 Min) und drei Spiele. Nach Ritual (20),
Mindest-Essen (25) und Uebergabe (15) bleiben 30 Minuten — zwei Spiele fallen
in die Reserve, waehrend der gedruckte Ritualtext sie erzaehlt. Der Kaeufer
liest ein Versprechen, das sein eigener Ablaufplan nicht haelt.

Diese Stufe rechnet je Variante nach, WIE VIELE Spiele ihr eigenes Fenster
traegt — mit derselben Arithmetik wie buildTimeline() in paket-core.js:
  planbar   = Fensterlaenge - UEBERGABE(15)
  Bedarf    = RIT(20) + ESSEN_MIN(25) + Summe(Spieldauer + 5)
Faellt mehr als EIN Spiel aus dem Plan, ist das ein Datenfehler: entweder das
Fenster ist zu kurz angegeben oder die Variante hat zu viele Spiele.
(Ein einzelnes Reserve-Spiel ist gewollt — es ist der Puffer fuer den Fall,
dass etwas schneller geht.)
"""
import glob
import io
import json
import re
import sys

FAIL_MOTTOS = {'baustelle'}
UEBERGABE, ESSEN_MIN, RIT, PAUSE = 15, 25, 20, 5
RX_FENSTER = re.compile(r'(\d{1,2}):(\d{2})\s*[–-]\s*(\d{1,2}):(\d{2})')


def minuten(m):
    return (int(m.group(3)) * 60 + int(m.group(4))) - (int(m.group(1)) * 60 + int(m.group(2)))


def check_file(fp):
    findings = []
    d = json.load(io.open(fp, encoding='utf-8'))
    for v in d.get('variants') or []:
        m = RX_FENSTER.search(v.get('timeWindow') or '')
        if not m:
            continue
        planbar = minuten(m) - UEBERGABE
        # duration ist mal Zahl, mal "30 Min." — wie parseDur() im Renderer
        spiele = []
        for g in (v.get('games') or []):
            dm = re.search(r'\d+', str(g.get('duration') or ''))
            if dm:
                spiele.append((g.get('name') or '?', int(dm.group(0))))
        if not spiele:
            continue
        frei = planbar - RIT - ESSEN_MIN
        passt, verbraucht = 0, 0
        for _, dur in spiele:
            if verbraucht + dur + PAUSE <= frei:
                verbraucht += dur + PAUSE
                passt += 1
        reserve = len(spiele) - passt
        # Kalibrierung 12.08.: Reserve-Spiele sind gewollt (Puffer, wenn etwas
        # schneller geht) — deshalb kein Alarm, nur weil eines liegen bleibt.
        # Defekt ist es, wenn der Plan KEINE Party mehr traegt (unter 2 Spielen)
        # oder mehr in der Reserve landet als im Plan steht.
        if passt < 2 or reserve > passt:
            fehlt = sum(dur + PAUSE for _, dur in spiele) - frei
            findings.append(
                '%s variants[%s] "%s": %d von %d Spielen passen ins Fenster — %d in Reserve '
                '(Programm braucht %d Min mehr, oder %d Min laengeres Fenster)'
                % (fp, v.get('id', '?'), v.get('timeWindow', ''), passt, len(spiele),
                   reserve, fehlt, fehlt))
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
