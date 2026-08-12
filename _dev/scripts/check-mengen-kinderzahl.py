# -*- coding: utf-8 -*-
"""Stufe 37 — Mengen decken die Kinderzahl der Variante (Maschinen-Pilot M2/M3).

Der Gutachter fand am 12.08. zweimal dieselbe Klasse: eine Spielkarte verspricht
etwas PRO KIND ("Je Kind 1 Pappschild", "jedes Kind sammelt min. 3 Schrauben"),
nennt aber eine GESAMTZAHL, die für die Kinderzahl der Variante nicht reicht
(8 Pappschilde bei 10 Kindern; 25 Schrauben bei 10 Kindern à 3). Das trifft den
Kaeufer am Spieltag — er hat zu wenig gekauft.

Die Kinderzahl steht in variants[].timeWindow ("14:00–18:00, 10 Kinder").
Geprueft wird kartenweise, weil nur dort Anspruch und Menge zusammen stehen.
"""
import glob
import io
import json
import re
import sys

FAIL_MOTTOS = {'baustelle'}

RX_KINDER = re.compile(r'(\d+)\s*Kinder')
# "Je Kind 1 Pappschild" / "pro Kind 2 Bögen"
RX_PRO_KIND = re.compile(r'(?:Je|je|pro|Pro)\s+Kind\s+(\d+)\s+([A-Za-zÄÖÜäöüß][\wÄÖÜäöüß-]{3,})')
# "jedes Kind sammelt min. 3 Schrauben" / "alle finden mindestens 2-3"
RX_JE_KIND_MIN = re.compile(
    r'(?:jedes Kind|Jedes Kind|alle finden|Alle finden)[^.]{0,40}?'
    r'(?:min\.|mindestens)\s+(\d+)(?:\s*[-–]\s*\d+)?\s*([A-Za-zÄÖÜäöüß][\wÄÖÜäöüß-]{3,})?')


def stamm(wort):
    """grobe Normalisierung: Plural/Fugen weg, damit 'Pappschilde' == 'Pappschild'."""
    w = (wort or '').lower().rstrip('.,;:')
    for endung in ('en', 'er', 'e', 'n', 's'):
        if len(w) > 5 and w.endswith(endung):
            return w[:-len(endung)]
    return w


def gesamtzahl_fuer(text_all, wort):
    """groesste im Kartentext genannte GESAMTZAHL zu diesem Ding.

    Die Zahl aus der Pro-Kind-Phrase selbst zaehlt nicht mit — sonst meldet die
    Stufe 'je Kind 1 Grab-Werkzeug ... Karte nennt 1' (Kalibrierung 12.08.:
    'je Kind 1 X' ohne Gesamtzahl ist eine korrekte, offene Mengenangabe).
    """
    st = stamm(wort)
    treffer = []
    for m in re.finditer(r'(?<![\w])(\d+)(?:\s*[-–]\s*(\d+))?\s+([A-Za-zÄÖÜäöüß][\wÄÖÜäöüß-]{3,})', text_all):
        if stamm(m.group(3)) != st:
            continue
        davor = text_all[max(0, m.start()-14):m.start()].lower()
        if re.search(r'(?:je|pro)\s+kind\s*$', davor):
            continue
        treffer.append(int(m.group(2) or m.group(1)))
    return max(treffer) if treffer else None


def check_file(fp):
    findings = []
    d = json.load(io.open(fp, encoding='utf-8'))
    for vi, v in enumerate(d.get('variants') or []):
        km = RX_KINDER.search(v.get('timeWindow') or '')
        if not km:
            continue
        kinder = int(km.group(1))
        for gi, g in enumerate(v.get('games') or []):
            karte = json.dumps(g, ensure_ascii=False)
            pfad = '%s variants[%d](%d Kinder).games[%d] %s' % (
                fp, vi, kinder, gi, (g.get('name') or '')[:28])
            for m in RX_PRO_KIND.finditer(karte):
                proKind, ding = int(m.group(1)), m.group(2)
                gesamt = gesamtzahl_fuer(karte, ding)
                if gesamt is not None and gesamt < proKind * kinder:
                    findings.append('%s: "je Kind %d %s" braucht %d, Karte nennt %d'
                                    % (pfad, proKind, ding, proKind * kinder, gesamt))
            for m in RX_JE_KIND_MIN.finditer(karte):
                proKind = int(m.group(1))
                ding = m.group(2)
                if not ding:
                    continue
                gesamt = gesamtzahl_fuer(karte, ding)
                if gesamt is not None and gesamt < proKind * kinder:
                    findings.append('%s: "jedes Kind min. %d %s" braucht %d, Karte nennt %d'
                                    % (pfad, proKind, ding, proKind * kinder, gesamt))
    # dieselbe Karte nennt den Anspruch oft in material UND prepText — ein
    # Befund pro Karte reicht, sonst rauscht die Stufe.
    gesehen, eindeutig = set(), []
    for f in findings:
        if f not in gesehen:
            gesehen.add(f)
            eindeutig.append(f)
    return eindeutig


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
    print('    Stufe 37: %d FAIL (Gate-Scope: %s), %d WARN'
          % (fail, ','.join(sorted(FAIL_MOTTOS)), warn))
    sys.exit(1 if fail else 0)


if __name__ == '__main__':
    main()
