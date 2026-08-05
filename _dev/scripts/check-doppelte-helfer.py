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

# Funktionsname -> Eingaben, ueber die verglichen wird.
PAARE = {
    'poss': ['Tino', 'Mats', 'Lea', 'Max', 'Franz', 'Jonas', 'Boß', 'Alex', 'Emilia', '', '  Ida  '],
}


def schneide(quelle, name):
    """Holt eine einzeilige function-Definition heraus."""
    m = re.search(r'^[ \t]*function %s\s*\([^)]*\)\s*\{.*\}\s*$' % re.escape(name),
                  quelle, re.M)
    return m.group(0).strip() if m else None


kern_q = KERN.read_text(encoding='utf-8')
frei_q = FREI.read_text(encoding='utf-8')

fehler = []
for name, eingaben in PAARE.items():
    a, b = schneide(kern_q, name), schneide(frei_q, name)
    if not a or not b:
        fehler.append((name, 'nicht in %s gefunden' % ('paket-core.js' if not a else 'kindergeburtstag.html')))
        continue
    harness = ('%s\nconst _A=%s;\n%s\nconst _B=%s;\n'
               'console.log(JSON.stringify(%s.map(x=>[_A(x),_B(x)])));'
               % (a, name, b.replace('function %s' % name, 'function _b_%s' % name),
                  '_b_%s' % name, json.dumps(eingaben)))
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
print('    %d Helfer verglichen, %d Abweichung(en)' % (len(PAARE), len(fehler)))
sys.exit(1 if fehler else 0)
