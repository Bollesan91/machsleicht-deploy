#!/usr/bin/env python3
"""
#34 Auto-Re-Kuration: füllt dünne minimal/standard/wow-Varianten aus dem
Datei-EIGENEN Pool auf (bestehende, vettete Spiele — kein Neuschrieb).
Dedupt Near-Names (Emoji/Klammerzusatz weg), balanciert loudness (laut/leise/mittel),
respektiert Pool-Grösse. Deep-Copy. Format byte-treu. Assert-vor-Write.

Aufruf: python auto-curate-games.py <motto1> <motto2> ...   (z.B. dino feen ...)
"""
import json, copy, re, glob, os, sys
sys.stdout.reconfigure(encoding='utf-8')
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
TARGET = {'minimal': 3, 'standard': 5, 'wow': 6}

def norm(name):
    s = re.sub(r'^[^\wäöüÄÖÜ]+', '', name)          # führende Emoji/Symbole weg
    s = re.split(r'\s*[—(]', s)[0]                    # Klammer/Gedankenstrich-Zusatz weg
    return s.strip().lower()

AGEMAX = {'klein': 5, 'mittel': 8, 'gross': 12}

def curate_file(fn):
    raw = open(fn, encoding='utf-8').read()
    d = json.loads(raw)
    grp = os.path.basename(fn).rsplit('-', 1)[1].replace('.json', '')
    amax = AGEMAX.get(grp, 99)
    pool = {}
    for v in d['variants']:
        for g in v.get('games', []):
            pool.setdefault(g['name'], g)
    # near-dup-Gruppen: normalisierter Name -> repräsentatives Spiel-Objekt
    by_norm = {}
    for name, g in pool.items():
        by_norm.setdefault(norm(name), g)
    added_total = 0
    for v in d['variants']:
        tgt = TARGET.get(v['id'])
        if not tgt: continue
        have_norm = {norm(g['name']) for g in v['games']}
        if len(v['games']) >= tgt: continue
        # Kandidaten = Pool-Spiele (nach norm) die noch nicht in der Variante sind
        # + altersgerecht (minAge <= Altersgruppen-Max -> kein zu-altes Spiel spreaden)
        cands = [g for nn, g in by_norm.items() if nn not in have_norm
                 and not (isinstance(g.get('minAge'), int) and g['minAge'] > amax)]
        # nach loudness-Balance sortieren: bevorzugt loudness, die in der Variante fehlt
        def score(g):
            cur = [x.get('loudness') for x in v['games']]
            return cur.count(g.get('loudness'))   # weniger = besser (seltener vertreten)
        cands.sort(key=score)
        for g in cands:
            if len(v['games']) >= tgt: break
            v['games'].append(copy.deepcopy(g))
            have_norm.add(norm(g['name'])); added_total += 1
        assert len({norm(x['name']) for x in v['games']}) == len(v['games']), f"{fn}/{v['id']}: Near-Dup!"
    if added_total:
        # FORMAT ERHALTEN (Lektion schedule-Vorfall): minified bleibt minified
        if raw.strip().count('\n') == 0:
            out = json.dumps(d, ensure_ascii=False, separators=(',', ':'))
        else:
            out = json.dumps(d, ensure_ascii=False, indent=2) + ('\n' if raw.endswith('\n') else '')
        open(fn, 'w', encoding='utf-8').write(out)
    return added_total, {v['id']: len(v['games']) for v in d['variants']}

def main(mottos):
    for motto in mottos:
        files = sorted(glob.glob(os.path.join(ROOT, 'data', 'motto', f'{motto}-*.json')))
        assert files, f"kein File für {motto}"
        print(f"\n[{motto}]")
        for fn in files:
            n, counts = curate_file(fn)
            print(f"  {os.path.basename(fn)}: +{n} -> {counts}")

if __name__ == '__main__':
    main(sys.argv[1:])
