#!/usr/bin/env python3
"""
Step 1 (interne Verlinkung): In jeder Motto-Planer-Seite verlinkt die
"Einladung fuer den X-Geburtstag"-Sektion bisher NUR den Creator (noindex).
Fuegt direkt nach der Creator-CTA einen Link zur indexierbaren Einladungs-
Landingpage /einladung/<motto>/ ein -> Link-Kraft fliesst in den SEO-Cluster.

Assert-vor-Write: genau 1 CTA-Treffer, Landing-Link noch nicht vorhanden.
"""
import re, sys, os
try: sys.stdout.reconfigure(encoding='utf-8')
except Exception: pass

MOTTOS = ['piraten','dino','einhorn','feuerwehr','safari','detektiv','superheld',
          'prinzessin','meerjungfrau','weltraum','baustelle','dschungel','feen','pferde','ritter']
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

def display(m):
    return {'feen':'Feen'}.get(m, m[:1].upper()+m[1:])

def main():
    done = 0
    for m in MOTTOS:
        fn = os.path.join(ROOT, 'kindergeburtstag', m + '.html')
        if not os.path.isfile(fn): print('  FEHLT:', m); continue
        html = open(fn, encoding='utf-8').read()
        if ('href="/einladung/%s/"' % m) in html:
            print('  schon vorhanden:', m); continue
        cta_re = re.compile(r'(<a href="/einladung/erstellen/\?thema=' + m + r'" class="cta">[^<]*</a>)')
        hits = cta_re.findall(html)
        if len(hits) != 1:
            print('  SKIP (%d CTA-Treffer):' % len(hits), m); continue
        D = display(m)
        link = ('\n    <p style="margin-top:10px;font-size:14px">'
                '<a href="/einladung/%s/">Alle %s-Einladungen &amp; Vorlagentexte ansehen &rarr;</a></p>' % (m, D))
        new = cta_re.sub(lambda mo: mo.group(1) + link, html, count=1)
        # Assert: genau +1 Landing-Link, sonst nichts veraendert
        if new.count('href="/einladung/%s/"' % m) != 1 or len(new) <= len(html):
            print('  ASSERT-FAIL, nicht geschrieben:', m); continue
        open(fn, 'w', encoding='utf-8').write(new)
        print('  OK:', m)
        done += 1
    print('\nPlaner verlinkt:', done, '/', len(MOTTOS))

if __name__ == '__main__':
    main()
