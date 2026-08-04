# -*- coding: utf-8 -*-
"""Paket-Maschine Stufe 3b: die abgeleiteten Wort-Slots ins Template setzen.

    python _dev/scripts/paket-slots-einsetzen.py          # Trockenlauf
    python _dev/scripts/paket-slots-einsetzen.py schreib  # schreibt Template + Manifeste

Nimmt slots-inventar.json (mechanisch abgeleitet, Stufe 3a), ersetzt im Template
jede vollstaendige Slot-Zeile durch {{w:NN}} und legt den Wert in JEDES Manifest —
auch in das von feuerwehr. Kein Motto ist privilegiert; das Template spricht kein
Motto-Deutsch mehr.

Die Slot-Nummern folgen der Reihenfolge im Template, damit sie stabil bleiben,
wenn spaeter Slots dazukommen.
"""
import pathlib, json, sys

TPL = pathlib.Path('paket/_maschine/template.html')
INV = pathlib.Path('paket/_maschine/slots-inventar.json')
MAN = pathlib.Path('paket/_maschine/manifeste')

inv = json.loads(INV.read_text(encoding='utf-8'))['vollstaendig']
tpl = TPL.read_text(encoding='utf-8')
man = {p.stem: json.loads(p.read_text(encoding='utf-8')) for p in sorted(MAN.glob('*.json'))}

# Slots nach ihrer Position im Template ordnen -> stabile Nummern
zeilen = tpl.split('\n')
pos = {}
for i, z in enumerate(zeilen):
    s = z.strip()
    if s in inv and s not in pos:
        pos[s] = i
fehlt = [k for k in inv if k not in pos]
if fehlt:
    print('ABBRUCH: %d Slot-Zeilen nicht im Template gefunden' % len(fehlt))
    for f in fehlt[:5]: print('  ', f[:110])
    sys.exit(1)

sortiert = sorted(pos, key=lambda k: pos[k])
# Eine Slot-Zeile darf mehrfach vorkommen — 'Unser Feuerwehr-Kind' steht auf dem
# Deckblatt UND auf den Einladungen. Dann besetzt derselbe Slot alle Stellen; das
# ist gewollt, denn beide muessen zwingend dasselbe sagen.
flach = [z.strip() for z in zeilen]
mehrfach = {k: flach.count(k) for k in sortiert if flach.count(k) > 1}
if mehrfach:
    print('Slots mit mehreren Fundstellen (bekommen denselben Wert):')
    for k, n in mehrfach.items(): print('  %dx  %s' % (n, k[:88]))
    print()
fehler = []

# Template umbauen + Werte je Motto sammeln
neu_zeilen = list(zeilen)
werte = {m: {} for m in man}
for n, k in enumerate(sortiert, 1):
    sid = 'w%02d' % n
    for i, z in enumerate(zeilen):
        if z.strip() == k:
            einzug = z[:len(z) - len(z.lstrip())]
            neu_zeilen[i] = einzug + '{{%s}}' % sid
    for m in man:
        werte[m][sid] = k if m == 'feuerwehr' else inv[k].get(m)
        if werte[m][sid] is None:
            fehler.append('%s: kein Wert fuer %s' % (m, sid))
if fehler:
    print('ABBRUCH:'); [print('  -', f) for f in fehler[:8]]; sys.exit(1)

neu_tpl = '\n'.join(neu_zeilen)
print('Slots eingesetzt: %d' % len(sortiert))
print('Template: %d -> %d Zeichen' % (len(tpl), len(neu_tpl)))
print('Werte je Manifest: %s' % ', '.join('%s %d' % (m, len(v)) for m, v in sorted(werte.items())))

if 'schreib' not in sys.argv:
    print('\nTROCKENLAUF — nichts geschrieben. Zum Schreiben: ... schreib')
    sys.exit(0)

TPL.write_text(neu_tpl, encoding='utf-8')
for m, v in werte.items():
    p = MAN / ('%s.json' % m)
    d = json.loads(p.read_text(encoding='utf-8'))
    d['woerter'] = v
    p.write_text(json.dumps(d, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print('\nTemplate und %d Manifeste geschrieben.' % len(werte))
