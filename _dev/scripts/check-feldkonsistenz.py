# -*- coding: utf-8 -*-
"""Stufe 34 — Zahlen-Konsistenz-Waechter (Feld-Mechanik #110, Bolle 11.08.).

Prinzip: Gedruckte Zahlen muessen aus den Daten BEWEISBAR sein. Getippte
Zaehlungen ("25 Quiz-Karten", "5 Verdaechtige", "4 Stationen") werden gegen die
echten Datenlaengen (quizCards.length, alibiTabelle.verdaechtige.length,
games.length je Variante) geprueft. Genau diese Klasse stellte in den Gates
Baustelle (M5/M8/M16/M19, recheck-MAJORs 4/5) und Feuerwehr (Zahlen-Welle)
die Mehrheit der MAJORs.

FAIL nur fuer Mottos im Gate-Scope (FAIL_MOTTOS); alle uebrigen WARN —
deren Trefferliste ist die Arbeitsliste der naechsten Zahlen-Wellen.
"""
import glob
import io
import json
import re
import sys

FAIL_MOTTOS = {'baustelle'}          # bei jedem neuen Motto-Gate erweitern
PAKET_MOTTOS = {'baustelle', 'dino', 'feuerwehr', 'meerjungfrau', 'piraten', 'ritter'}

RX_QUIZ = re.compile(r'(?:\b[Dd]ie\s+)?(\d+)\s+(?:Werkzeug-)?Quiz-Karten|zu den (\d+) gedruckten')
RX_VERD = re.compile(r'(\d+)\s+Verdächtige')
RX_SPUR = re.compile(r'(\d+)\s+(?:versteckte\s+)?Spuren\b')
# "2 Stationen parallel (laufen lassen)" ist eine Handlungsanweisung, keine
# Gesamtzahl-Behauptung (kalibriert am Baustelle-Lauf 11.08.)
RX_STAT = re.compile(r'(\d+)(?:-(\d+))?\s+(?:Prüfungs-)?Stationen\b(?!\s+parallel)')

def teilmenge(s, m):
    """'die anderen/uebrigen/restlichen 3 Verdaechtigen' ist bei 4 Gesamt korrekt —
    Teilmengen-Kontexte sind keine Gesamtzahl-Behauptung."""
    return bool(re.search(r'(?:anderen|übrigen|restlichen)\s*$', s[:m.start()]))

def texts_of(obj, path=''):
    if isinstance(obj, dict):
        for k, v in obj.items():
            yield from texts_of(v, path + '.' + k)
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            yield from texts_of(v, path + '[%d]' % i)
    elif isinstance(obj, str):
        yield path, obj

def check_file(fp):
    findings = []
    d = json.load(io.open(fp, encoding='utf-8'))
    variants = d.get('variants') or []
    game_counts = [len(v.get('games') or []) for v in variants]

    # 1) Je Spiel: getippte Quiz-/Verdaechtigen-/Spuren-Zahlen vs. Datenlaengen
    for vi, v in enumerate(variants):
        for gi, g in enumerate(v.get('games') or []):
            qn = len(g.get('quizCards') or [])
            at = g.get('alibiTabelle') or {}
            vn = len(at.get('verdaechtige') or [])
            sn = len(at.get('spuren') or [])
            for path, s in texts_of(g, 'variants[%d].games[%d]' % (vi, gi)):
                if qn:
                    for m in RX_QUIZ.finditer(s):
                        n = int(m.group(1) or m.group(2))
                        if n != qn:
                            findings.append('%s: "%s Quiz-Karten" getippt, quizCards.length=%d (%s)'
                                            % (path, n, qn, s[max(0, m.start()-30):m.end()+20].strip()))
                    # recheck3-M5: "Bei 10 von 15 richtig" — die Bezugsgroesse
                    # der Wertung muss der echten Kartenzahl entsprechen
                    for m in re.finditer(r'von\s+(\d+)\s+richtig', s):
                        if int(m.group(1)) != qn:
                            findings.append('%s: "von %s richtig" getippt, quizCards.length=%d'
                                            % (path, m.group(1), qn))
                if vn:
                    for m in RX_VERD.finditer(s):
                        if teilmenge(s, m):
                            continue
                        if int(m.group(1)) != vn:
                            findings.append('%s: "%s Verdächtige" getippt, alibiTabelle=%d'
                                            % (path, m.group(1), vn))
                if sn:
                    for m in RX_SPUR.finditer(s):
                        if int(m.group(1)) != sn:
                            findings.append('%s: "%s Spuren" getippt, alibiTabelle=%d'
                                            % (path, m.group(1), sn))
    # 1b) Datei-weit (Shop-Labels, SOS, Satelliten): Verdaechtigen-/Spuren-Zahlen,
    #     wenn die Datei genau EIN Krimi-Spiel traegt (sonst nicht entscheidbar)
    alle_at = [g.get('alibiTabelle') for v in variants for g in (v.get('games') or []) if g.get('alibiTabelle')]
    if alle_at:
        vn = len(alle_at[0].get('verdaechtige') or [])
        sn = len(alle_at[0].get('spuren') or [])
        einheitlich = all(len(a.get('verdaechtige') or []) == vn and len(a.get('spuren') or []) == sn for a in alle_at)
        if einheitlich and vn:
            for path, s in texts_of(d):
                if '.games[' in path or path.startswith('._'):
                    continue
                for m in RX_VERD.finditer(s):
                    if teilmenge(s, m):
                        continue
                    if int(m.group(1)) != vn:
                        findings.append('%s: "%s Verdächtige" getippt, Krimi hat %d' % (path, m.group(1), vn))
                for m in RX_SPUR.finditer(s):
                    if int(m.group(1)) != sn:
                        findings.append('%s: "%s Spuren" getippt, Krimi hat %d' % (path, m.group(1), sn))

    # 1c) Varianten-Scope ist seit Schritt 2 (11.08.) ein DATENFELD (abVariante
    #     an SOS-Szenarien/-Steps) — Prosa-Praefixe wie "(Nur Wow-Variante)"
    #     in String-Steps sind die alte, ungefilterte Form und damit Defekt.
    for key, sc in (d.get('sosScenarios') or {}).items():
        if not isinstance(sc, dict):
            continue
        for i, st in enumerate(sc.get('steps') or []):
            if isinstance(st, str) and re.match(r'\((Nur|Ab)\s', st):
                findings.append('.sosScenarios.%s.steps[%d]: Prosa-Scope %r — gehoert als abVariante-Feld an den Step'
                                % (key, i, st[:40]))
        if isinstance(sc.get('label'), str) and re.search(r'\((Wow|Standard)-Variante\)', sc['label']):
            findings.append('.sosScenarios.%s.label: Prosa-Scope im Label — gehoert als abVariante-Feld ans Szenario' % key)

    # 2) Top-Level-Felder (drucken fuer ALLE Varianten): harte Stationszahlen
    #    sind nur zulaessig, wenn sie fuer jede Variante stimmen
    if game_counts:
        for key in ('sosScenarios', 'preparationWeeks', 'signatureRitual'):
            if key not in d:
                continue
            for path, s in texts_of(d[key], '.' + key):
                for m in RX_STAT.finditer(s):
                    lo = int(m.group(1))
                    hi = int(m.group(2) or m.group(1))
                    if not all(lo <= c <= hi for c in game_counts):
                        findings.append('%s: "%s Stationen" (top-level!) vs. games je Variante %s'
                                        % (path, m.group(0).split()[0], game_counts))
    return findings

def main():
    fail = 0
    warn = 0
    for fp in sorted(glob.glob('data/motto/*-klein.json') + glob.glob('data/motto/*-mittel.json')
                     + glob.glob('data/motto/*-gross.json')):
        motto = re.sub(r'-(klein|mittel|gross)\.json$', '', fp.replace('\\', '/').split('/')[-1])
        findings = check_file(fp)
        if not findings:
            continue
        hart = motto in FAIL_MOTTOS
        for f in findings:
            print('    %s %s: %s' % ('FAIL' if hart else 'WARN', fp, f))
        if hart:
            fail += len(findings)
        else:
            warn += len(findings)
    print('    Stufe 34: %d FAIL (Gate-Scope: %s), %d WARN (Arbeitsliste kommender Gates)'
          % (fail, ','.join(sorted(FAIL_MOTTOS)), warn))
    sys.exit(1 if fail else 0)

if __name__ == '__main__':
    main()
