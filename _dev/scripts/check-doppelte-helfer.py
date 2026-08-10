# -*- coding: utf-8 -*-
"""Stufe 18: Verhalten sich doppelt implementierte Helfer gleich?

Die kostenlose Planer-Seite und der Paket-Kern haben mehrere Funktionen
doppelt — kindergeburtstag.html laedt paket-core.js nicht, sie ist eine
eigenstaendige Seite mit 166k inline-JS. Zusammenlegen hiesse, eine
Script-Abhaengigkeit einzufuehren; solange das nicht passiert, muss wenigstens
das VERHALTEN identisch bleiben.

Am 05.08. fiel auf, dass poss() auseinanderlief:
    Kern:  "Tino"  -> "Tinos"    (Apostroph fehlte ganz)
    frei:  "Tino"  -> "Tino's"   (gerader ASCII-Apostroph)
Bolles Regel verlangt "Tino’s". Der Kern verletzte sie auf jedem Blatt des
bezahlten Pakets, weil niemand die beiden je gegeneinander laufen liess.

Diese Stufe schneidet beide Fassungen aus und laesst sie ueber dieselben
Eingaben laufen. Sie vergleicht Ergebnisse, nicht Quelltext — eine andere
Schreibweise ist erlaubt, ein anderes Ergebnis nicht.
"""
import pathlib, re, subprocess, sys, tempfile, os, json, shutil

if not shutil.which('node'):
    print('    node nicht im PATH — Stufe 18 kann nicht pruefen (FAIL, kein Freifahrtschein)')
    sys.exit(1)

KERN = pathlib.Path('paket/core/paket-core.js')
FREI = pathlib.Path('kindergeburtstag.html')

# (Name im Kern, Name auf der freien Seite, Eingaben zum Vergleich).
# Die Namen unterscheiden sich teils — verglichen wird das Ergebnis, nicht
# die Beschriftung.
PAARE = [
    ('poss', 'poss',
     ['Tino', 'Mats', 'Lea', 'Max', 'Franz', 'Jonas', 'Boß', 'Alex', 'Emilia', '', '  Ida  ']),
    # Fallback bei unlesbarer Dauer: Kern 15 Min (Gate-MAJOR 3), freie Seite fiel auf 0.
    ('parseDur', '_parseDur',
     ['45 Min.', '20', 30, 'ca. 25 Minuten', '', None, 'abc', 0, '0 Min.', '5-10 Min.']),
    # Ueberlauf und negative Minuten: ohne Modulo entsteht "25:00" bzw. "-1:-30".
    ('fmtHM', 'fmt',
     [0, 59, 60, 810, 1439, 1440, 1500, -30, 2880]),
    # String(s) machte auf der freien Seite aus null das Wort "null" — ein
    # fehlendes Feld stand woertlich auf der Seite.
    ('esc', 'esc',
     ['Tim & Lea', '<b>fett</b>', 'sagt "hallo"', "Mats' Party", None, '', 'ganz normal', 0]),
]


def schneide(quelle, name):
    """Holt eine einzeilige Definition heraus — als function-Deklaration ODER
       als const-Pfeilfunktion. Beide Schreibweisen kommen im Bestand vor:
       der Kern schreibt `function esc(s){...}`, die freie Seite
       `const esc = s => ...`. Fuer den Vergleich ist die Schreibweise egal,
       nur das Ergebnis zaehlt."""
    m = re.search(r'^[ \t]*function %s\s*\([^)]*\)\s*\{.*\}\s*$' % re.escape(name),
                  quelle, re.M)
    if m:
        return m.group(0).strip()
    m = re.search(r'^[ \t]*(?:const|let|var)\s+%s\s*=\s*.+;\s*(?://.*)?$' % re.escape(name),
                  quelle, re.M)
    return m.group(0).strip() if m else None


kern_q = KERN.read_text(encoding='utf-8')
frei_q = FREI.read_text(encoding='utf-8')

fehler = []
for kname, fname, eingaben in PAARE:
    a, b = schneide(kern_q, kname), schneide(frei_q, fname)
    name = kname if kname == fname else '%s/%s' % (kname, fname)
    if not a or not b:
        fehler.append((name, 'nicht in %s gefunden' % ('paket-core.js' if not a else 'kindergeburtstag.html')))
        continue
    # Die zweite Fassung umbenennen, damit sie die erste nicht ueberschreibt.
    # Muss beide Schreibweisen treffen: `function esc(` und `const esc =`.
    b_um = re.sub(r'\b(function|const|let|var)\s+%s\b' % re.escape(fname),
                  r'\1 _b_x', b, count=1)
    if '_b_x' not in b_um:
        fehler.append((name, 'konnte die zweite Fassung nicht umbenennen'))
        continue
    harness = ('%s\nconst _A=%s;\n%s\nconst _B=_b_x;\n'
               'console.log(JSON.stringify(%s.map(x=>[_A(x),_B(x)])));'
               % (a, kname, b_um, json.dumps(eingaben)))
    fd, tmp = tempfile.mkstemp(suffix='.js')
    os.close(fd)
    pathlib.Path(tmp).write_text(harness, encoding='utf-8')
    r = subprocess.run(['node', tmp], capture_output=True, text=True, encoding='utf-8')
    os.unlink(tmp)
    if r.returncode != 0:
        fehler.append((name, (r.stderr or '').strip().split('\n')[-1][:100]))
        continue
    for eingabe, (x, y) in zip(eingaben, json.loads(r.stdout)):
        if x != y:
            fehler.append((name, '"%s" -> Kern "%s" vs. frei "%s"' % (eingabe, x, y)))

for name, warum in fehler:
    print('    %-10s %s' % (name, warum))
print('    %d Helfer-Paare verglichen, %d Abweichung(en)' % (len(PAARE), len(fehler)))
sys.exit(1 if fehler else 0)
