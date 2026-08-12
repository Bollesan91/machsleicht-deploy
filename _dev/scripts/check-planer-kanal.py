# -*- coding: utf-8 -*-
"""Stufe 35 — Planer-Kanal + Rechtsfooter-Pflicht (recheck5-M1/M4/M5).

(a) Jede vollstaendige Seite unter kindergeburtstag/ traegt den Rechtsfooter
    (href="/impressum") — die Regeneration der Age-Pages hatte ihn am 11.08.
    ersatzlos geloescht, weil er nur als Hand-Patch existierte.
(b) Die generierten Age-Pages (*-jahre.html) duerfen keine Paket-Verweise
    drucken: "Teil I/II/III" und "Spielkarte" existieren nur im Komplettpaket.
"""
import glob
import html as html_mod
import io
import re
import sys

# Windows-Konsole ist cp1252 — Emoji in Spielnamen liessen die Stufe
# mit UnicodeEncodeError abbrechen statt zu melden (12.08.).
try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

RX_TEIL = re.compile(r'\bTeil I{1,3}\b')

def sichtbar(t):
    t = re.sub(r'<!--.*?-->', ' ', t, flags=re.S)
    t = re.sub(r'<head\b.*?</head>', ' ', t, flags=re.S | re.I)
    for tag in ('script', 'style', 'noscript', 'template'):
        t = re.sub(r'<%s\b.*?</%s>' % (tag, tag), ' ', t, flags=re.S | re.I)
    t = re.sub(r'<[^>]+>', ' ', t)
    return html_mod.unescape(t)

def main():
    fails = []
    for fp in sorted(glob.glob('kindergeburtstag/*.html')):
        t = io.open(fp, encoding='utf-8').read()
        if '<html' not in t.lower():
            continue
        if 'href="/impressum"' not in t:
            fails.append('%s: Rechtsfooter fehlt (kein href="/impressum")' % fp)
        if fp.replace('\\', '/').endswith('-jahre.html'):
            s = sichtbar(t)
            for m in RX_TEIL.finditer(s):
                fails.append('%s: Paket-Verweis "%s" im sichtbaren Text (Planer-Kanal!)'
                             % (fp, m.group(0)))
            # JSON-LD zaehlt mit: dort landen FAQ-Texte 1:1
            for m in re.finditer(r'"Teil I{1,3}[^"]{0,40}', t):
                fails.append('%s: Paket-Verweis im JSON-LD/Attribut: %s' % (fp, m.group(0)[:60]))
            if 'Spielkarte' in s:
                fails.append('%s: "Spielkarte" im sichtbaren Text (existiert nur im Paket)' % fp)
        # Schritt 2b: ein ungeloester Zahl-Platzhalter waere roh gedruckt.
        # Gilt fuer JEDE Seite — der Age-Generator loest {n:...} heute nicht auf,
        # also darf auch keiner hineingeraten (statt still eine Zahl zu raten).
        if '{n:' in t:
            fails.append('%s: ungeloester Platzhalter {n:...} im HTML' % fp)
    for f in fails:
        print('    FAIL %s' % f)
    print('    Stufe 35: %d FAIL' % len(fails))
    sys.exit(1 if fails else 0)

if __name__ == '__main__':
    main()
