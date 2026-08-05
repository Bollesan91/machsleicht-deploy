# -*- coding: utf-8 -*-
"""Stufe 20: Steht internes Vokabular auf einem gedruckten Blatt?

Ausloeser waren zwei Funde am 05.08.:

  1. In der Ritual-Karte von baustelle-gross stand mitten im Satz
     "(NICHT 200kg-Marketing)" — eine Notiz an die Redaktion, auf einem Blatt,
     das der Kaeufer ausdruckt.
  2. Zehnmal stand der FELDNAME im Elterntext: "Material findest du in der
     shoppingList der jeweiligen Variante". Ein Elternteil weiss nicht, was
     eine shoppingList ist — das Blatt daneben heisst Einkaufsliste.

Stufe 16 faengt so etwas nicht: sie sucht Markdown und URLs.

Diese Stufe prueft eng und praezise: Feldnamen aus dem Datenmodell duerfen in
gedruckten Feldern nicht vorkommen. Das ist ein Fehler ohne Ermessensspielraum
— niemand ausserhalb des Repos kennt diese Woerter.

BEWUSST NICHT GEPRUEFT: "Druckvorlage ist in Vorbereitung — bis dahin:
schneide ..." (6 Stellen). Das nennt eine Luecke und liefert sofort einen
Ersatz; ob ein bezahltes Produkt so etwas sagen darf, ist eine
Produktentscheidung und keine Regelfrage. Steht im Handoff.

Ebenfalls nicht geprueft: das Wort "Marketing" allein. "Das sind keine
Marketing-Versprechen — das passiert wirklich" richtet sich an die Eltern und
ist voellig in Ordnung. Eine Regel, die das anmeckert, wuerde bald ignoriert.
"""
import json, glob, pathlib, re, sys

# Felder, die der Renderer nachweislich druckt.
GEDRUCKT = {
    'content', 'material', 'prepText', 'safetyRule', 'fallback', 'decoration',
    'materialNote', 'optOutNote', 'indoorTip', 'outdoorTip', 'introText',
    'detail', 'title', 'name', 'label', 'food', 'giveaways', 'costContext',
    'subtitle', 'headline', 'function', 'intro', 'task', 'story', 'hint',
    # faq druckt das PAKET nicht, die kostenlose Planer-Seite aber schon.
    # "wenn du die ageAdjust9-Hinweise nutzt" stand dort oeffentlich sichtbar.
    'a', 'q',
}

# Feldnamen aus dem Datenmodell — Repo-Vokabular, das kein Kaeufer kennt.
FELDNAMEN = re.compile(
    r'\b(shoppingList|preparationWeeks|signatureRitual|sosScenarios|cakeRecipe|'
    r'ageAdjust\d*|prepText|safetyRule|optOutNote|indoorTip|outdoorTip|'
    r'estimatedCostEur|priceEur|timeWindow|rolesList|materialNote|variants)\b')


def walk(o, p=''):
    if isinstance(o, dict):
        for k, v in o.items():
            yield from walk(v, p + '.' + k)
    elif isinstance(o, list):
        for i, v in enumerate(o):
            yield from walk(v, '%s[%d]' % (p, i))
    elif isinstance(o, str):
        yield p, o


treffer = []
for f in sorted(glob.glob('data/motto/*.json')) + ['data/schatzsuche.json']:
    if not pathlib.Path(f).exists():
        continue
    d = json.loads(pathlib.Path(f).read_text(encoding='utf-8'))
    for p, s in walk(d):
        feld = p.rsplit('.', 1)[-1].rstrip('0123456789[]')
        if feld not in GEDRUCKT:
            continue
        m = FELDNAMEN.search(s)
        if m:
            treffer.append((pathlib.Path(f).name, feld, m.group(0),
                            s[max(0, m.start() - 50):m.start() + 55].replace('\n', ' ')))

for datei, feld, wort, stelle in treffer[:15]:
    print('    %-24s %-14s %-18s %s'
          % (datei, feld[:14], wort, stelle[:80].encode('ascii', 'replace').decode()))
if len(treffer) > 15:
    print('    ... und %d weitere' % (len(treffer) - 15))
print('    %d Feldnamen in gedruckten Texten, in %d Dateien'
      % (len(treffer), len(set(t[0] for t in treffer))))
sys.exit(1 if treffer else 0)
