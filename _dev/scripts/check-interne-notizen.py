# -*- coding: utf-8 -*-
"""Stufe 16: Steht Redaktionelles auf einem Blatt, das Kindern vorgelesen wird?

Am 05.08. meldeten ZWEI unabhaengige Reviewer (feuerwehr und baustelle,
getrennte Chats, target-blind) unabhaengig voneinander dieselbe Klasse:

    baustelle S2  "Die Schatzsuche-Stationen lesen Kindern QA-Notizen und
                   Einkaufsanweisungen vor."
    baustelle W11 "Auf der Ritual-Karte der 9-12-Gruppe stehen interne QA-
                   und SEO-Notizen."
    feuerwehr 6.1 "Das gross-Ritual druckt rohes Markdown samt Affiliate-URL
                   aufs Papier."

Gemeinsamer Nenner: Felder, die als Vorlesetext oder Elterntext gedruckt
werden, tragen Spuren aus der Redaktion — Klammerhinweise an die Redaktion,
Markdown-Syntax, nackte URLs, Partner-Tags. Auf dem Bildschirm faellt so
etwas auf; auf einem ausgedruckten Blatt, das ein Erwachsener einem Kind
vorliest, ist es blamabel.

Diese Stufe prueft die Felder, die nachweislich auf Papier landen, gegen
Muster, die dort nie stehen duerfen. Sie ist absichtlich eng: lieber wenige
sichere Treffer als eine Liste, die niemand mehr liest.
"""
import json, glob, re, pathlib, sys

# Felder, die das Paket druckt (Vorlese- oder Elterntext).
GEDRUCKT = {
    'content', 'material', 'prepText', 'safetyRule', 'fallback', 'decoration',
    'materialNote', 'optOutNote', 'indoorTip', 'outdoorTip', 'task', 'story',
    'intro', 'text', 'hint', 'solution', 'detail', 'description',
}

VERBOTEN = [
    ('Affiliate-Tag',      re.compile(r'\btag=[\w-]+-\d{2}\b')),
    ('nackte URL',         re.compile(r'https?://')),
    ('Markdown-Link',      re.compile(r'\[[^\]]{2,60}\]\(')),
    ('Redaktionsnotiz',    re.compile(r'\b(TODO|FIXME|QA[- ]?Notiz|SEO|Redaktion|Platzhalter|Hinweis f(ue|ü)r (die )?Redaktion)\b', re.I)),
]

# WELCHE Felder der Renderer durch esclink() schickt — dort ist ein
# Markdown-Link BEABSICHTIGT und wird zum klickbaren Link. Belegt durch
# paket/core/paket-core.js und die Blatt-Renderer in paket/*/index.html:
#   esclink(it.detail) · esclink(s.content) · esclink(v.decoration)
#   esclink(g.material) · esclink(g.indoorTip) · esclink(g.outdoorTip)
#   esclink(rit.materialNote) · esclink(rit.optOutNote)
# In allen ANDEREN gedruckten Feldern laeuft esc() — dort erscheint Markdown
# woertlich auf dem Papier, samt Klammern und Partner-URL. Das ist der Fehler,
# den feuerwehr 6.1 gefunden hat.
#
# Wichtig: Diese Liste ist der Grund, warum die Regel ueberhaupt taugt. Ohne
# sie meldet sie 52 Stellen, von denen die grosse Mehrheit korrekt ist.
ESCLINK_FELDER = {'detail', 'content', 'decoration', 'material',
                  'indoorTip', 'outdoorTip', 'materialNote', 'optOutNote'}

treffer = []
for f in sorted(glob.glob('data/motto/*.json')):
    datei = pathlib.Path(f).name
    def lauf(o, pfad=''):
        if isinstance(o, dict):
            for k, v in o.items():
                if isinstance(v, str) and k in GEDRUCKT and v.strip():
                    for name, rx in VERBOTEN:
                        if name in ('nackte URL', 'Markdown-Link', 'Affiliate-Tag') and k in ESCLINK_FELDER:
                            continue
                        m = rx.search(v)
                        if m:
                            treffer.append((datei, k, name, v[max(0, m.start()-30):m.start()+60].replace('\n', ' ')))
                lauf(v, pfad + '.' + k)
        elif isinstance(o, list):
            for i, v in enumerate(o):
                lauf(v, '%s[%d]' % (pfad, i))
    lauf(json.loads(pathlib.Path(f).read_text(encoding='utf-8')))

if treffer:
    nach_art = {}
    for _, _, art, _ in treffer:
        nach_art[art] = nach_art.get(art, 0) + 1
    for art, n in sorted(nach_art.items(), key=lambda x: -x[1]):
        print('    %-18s %d' % (art, n))
    for datei, feld, art, stelle in treffer[:12]:
        print('      %-26s %-14s %s' % (datei, feld, stelle[:80]))
    if len(treffer) > 12:
        print('      ... und %d weitere' % (len(treffer) - 12))
print('    %d Fundstellen in %d Dateien' % (len(treffer), len(set(t[0] for t in treffer))))
sys.exit(1 if treffer else 0)
