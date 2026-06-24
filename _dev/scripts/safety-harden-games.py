#!/usr/bin/env python3
"""
#34 Stufe 3: Systematische Safety-Härtung aus dem konsolidierten claude.ai-Review.
Haengt spezifische, real-belegte Sicherheits-Klauseln an betroffene Spiele an
(keyword-gekoppelt, nur wenn noch nicht vorhanden). Format ERHALTEN (minified bleibt minified).
"""
import json, glob, os, re, sys
sys.stdout.reconfigure(encoding='utf-8')
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# (match-fn(name, blob, grp), key-phrase-schon-drin, anzuhaengende Klausel)
# PARCOURS + SCHLEIER matchen NUR am NAMEN (Substring-Leck in steps: "spuren-parcours"-Uebergang,
# "Dreieckstuch"-Verband, "Distanz"->tanz). Rest am Volltext (steps/material relevant).
RULES = [
 (lambda n,b,g: 'gips' in b and ('gieß' in b or 'guss' in b or 'fossilien gieß' in b),
  'um Hände', ' Gips NIE um Hände/Finger/Körperteile gießen (Verbrennung beim Abbinden >60 °C) — nur offene Förmchen; Gipspulver-Staub nicht einatmen.'),
 (lambda n,b,g: re.search(r'parcours|parkour|hindernislauf', n),
  'keine Socken', ' Auf glattem Boden barfuß oder Schuhe mit Grip (keine Socken — Rutschgefahr); harte Möbelkanten im Laufweg abräumen/abpolstern.'),
 (lambda n,b,g: 'schleier' in n or 'tanz' in n,
  'um den Hals', ' Nur kurze Tücher, NIE um den Hals (Strangulationsgefahr); auf Stolpern über lange Stoffe achten.'),
 (lambda n,b,g: g=='klein' and ('reiskörn' in b or ('reis' in b and 'wanne' in b)),
  'Nase/Ohr', ' Bei den Kleinen engmaschig beaufsichtigen — Reiskörner gehören nicht in Nase/Ohr; ggf. gröberes Sensorik-Medium.'),
 (lambda n,b,g: 'draht' in b,
  'Drahtenden', ' Keine offenen/scharfen Drahtenden — Enden vorbiegen oder vorgefertigte weiche Materialien.'),
 (lambda n,b,g: 'echte werkzeug' in b or (('hammer' in b or 'zange' in b or 'säge' in b) and 'werkzeug' in b),
  'nicht schwingen', ' Werkzeuge bleiben auf dem Tisch — nicht schwingen/werfen/weitergeben (Quetsch-/Fußgefahr).'),
 (lambda n,b,g: 'vulkan' in b and ('essig' in b or 'natron' in b or 'ausbruch' in b or 'experiment' in b),
  'Natron-Essig', ' Natron-Essig-Variante (KEIN Wasserstoffperoxid/Trockeneis); Essig reizt die Augen — nach dem Anfassen nicht ins Gesicht fassen.'),
]

def gtext(g):
    st = g.get('steps', [])
    st = [s if isinstance(s, str) else (s.get('text') or s.get('content') or str(s)) for s in st]
    return (g['name'] + ' ' + str(g.get('material','')) + ' ' + ' '.join(st)).lower()

def run():
    changed_games = 0; touched = set()
    for fn in sorted(glob.glob(os.path.join(ROOT,'data','motto','*.json'))):
        raw = open(fn, encoding='utf-8').read(); d = json.loads(raw)
        grp = os.path.basename(fn).rsplit('-',1)[1].replace('.json','')
        filechg = False
        # je Spiel-Objekt nur EINMAL haerten (auch wenn in mehreren Varianten dupliziert):
        for v in d['variants']:
            for g in v['games']:
                blob = gtext(g); sr = g.get('safetyRule') or ''
                name = g['name'].lower()
                for matchfn, key, clause in RULES:
                    if matchfn(name, blob, grp) and key not in sr:
                        g['safetyRule'] = (sr.rstrip() if sr.strip() else '') + clause
                        sr = g['safetyRule']; filechg = True; changed_games += 1
                        touched.add(re.sub(r'^[^\w]+','',g['name'])[:30])
        if filechg:
            if raw.strip().count('\n')==0:
                out = json.dumps(d, ensure_ascii=False, separators=(',',':'))
            else:
                out = json.dumps(d, ensure_ascii=False, indent=2) + ('\n' if raw.endswith('\n') else '')
            open(fn,'w',encoding='utf-8').write(out)
            print('  ✓', os.path.basename(fn))
    print(f"\nKlauseln angehängt: {changed_games} Spiel-Kopien | betroffene Spieltypen: {sorted(touched)}")

if __name__ == '__main__':
    run()
