#!/usr/bin/env python3
"""
#34 Spiele-Re-Kuration: füllt dünne standard/wow-Varianten mit BESTEHENDEN,
schon vetteten Spielen aus dem Datei-eigenen Pool auf (kein Neuschrieb).
Deep-Copy des vollen Spiel-Objekts (mit steps/material/safetyRule).

Assert-vor-Write: Spiel im Pool gefunden, kein exakter Namens-Dup in Zielvariante,
Zielanzahl erreicht. Format byte-treu (indent=2, ensure_ascii=False, trailing \\n).
"""
import json, copy, sys, os
sys.stdout.reconfigure(encoding='utf-8')
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
TARGET = {'minimal': 3, 'standard': 5, 'wow': 6}

# motto-datei -> variante -> [exakte Spielnamen zum Hinzufügen aus dem Datei-Pool]
CURATION = {
  'superheld-gross.json':  {'standard': ['🔐 Code knacken (Geheimbotschaft)', '⚡ Geschicklichkeits-Challenge (Reaktor stabilisieren)'],
                            'wow':      ['🔐 Code knacken (Geheimbotschaft)', '🕸️ Laser-Tresor (Showdown)']},
  'superheld-klein.json':  {'standard': ['🎈 Ballons retten', '💪 Kraft-Stationen (3 einfache)'],
                            'wow':      ['🎈 Ballons retten']},
  'superheld-mittel.json': {'standard': ['🥫 Stadt in Gefahr (Bösewicht-Dosenwerfen)'],
                            'wow':      ['🥫 Stadt in Gefahr (Bösewicht-Dosenwerfen)', '🛡️ Helden-Abzeichen basteln']},
}

def run():
    for fname, vmap in CURATION.items():
        fn = os.path.join(ROOT, 'data', 'motto', fname)
        raw = open(fn, encoding='utf-8').read()
        d = json.loads(raw)
        pool = {}
        for v in d['variants']:
            for g in v.get('games', []):
                pool.setdefault(g['name'], g)
        changed = False
        for vid, adds in vmap.items():
            v = next((x for x in d['variants'] if x['id'] == vid), None)
            assert v is not None, f"{fname}: Variante {vid} fehlt"
            have = {g['name'] for g in v['games']}
            for name in adds:
                assert name in pool, f"{fname}: '{name}' nicht im Datei-Pool"
                assert name not in have, f"{fname}/{vid}: '{name}' schon drin (Dup)"
                v['games'].append(copy.deepcopy(pool[name]))
                have.add(name); changed = True
            assert len(v['games']) >= TARGET[vid], f"{fname}/{vid}: {len(v['games'])} < Ziel {TARGET[vid]}"
            print(f"  {fname}/{vid}: -> {len(v['games'])} Spiele")
        if changed:
            out = json.dumps(d, ensure_ascii=False, indent=2)
            if raw.endswith('\n'): out += '\n'
            open(fn, 'w', encoding='utf-8').write(out)
            print(f"  ✓ geschrieben: {fname}")
    print("\nfertig.")

if __name__ == '__main__':
    run()
