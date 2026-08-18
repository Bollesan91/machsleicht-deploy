# -*- coding: utf-8 -*-
"""Stufe 14: Welche Motto-Daten liest kein Renderer?

Am 04.08. kam fuenfmal derselbe Befund: optOutNote, indoorTip, outdoorTip,
ageAdjust5/9/12 und rolesList lagen fertig in den Daten und wurden von keinem
Blatt gedruckt. Zusammen ueber 1500 vorbereitete Inhalte, unsichtbar in einem
Produkt, fuer das Eltern zahlen. Gefunden hat es jedes Mal ein Reviewer oder
ein Zufall — nie eine Regel.

Diese Regel prueft gegen den GANZEN Repo, nicht nur gegen paket/: Ein Feld
gilt als gelesen, wenn irgendein JS/HTML/JSX seinen Namen nennt. Das ist
absichtlich grosszuegig; die Regel soll auf grosse blinde Flecken zeigen, nicht
auf jede Kleinigkeit.

FALSCH-POSITIV, den man kennen muss: ageAdjust6 erscheint als ungelesen, weil
ageAdjustFor() die Suffixe dynamisch ueber Object.keys() findet. Deshalb steht
in DYNAMISCH, was per Muster gelesen wird.
"""
import json, glob, re, pathlib, collections, sys

# Felder, die absichtlich nicht gedruckt werden: Bau-Metadaten und Steuerdaten.
INTERN = {
    'source_file', 'extracted', 'schema_version', 'purpose', 'phase_b_complete',
    'phase_b_method', 'phase_b_date', 'id', 'ageGroup', 'ageRange', 'motto',
    'category', 'loudness', 'effort', 'tone', 'emoji', 'icon', 'url', 'slug',
    'minAge', 'maxAge', 'indoor', 'outdoor', 'duration', 'priceEur', 'hasAffiliate',
    'estimatedCostEur', 'guestCount', 'timeWindow', 'name', 'label', 'title',
}
# Wird per Muster gelesen, nicht per Name — sonst Falsch-Positiv.
DYNAMISCH = re.compile(r'^ageAdjust\d+$')

MINDEST = 20   # unter 20 Vorkommen ist es Einzelfall, kein blinder Fleck

vor = collections.Counter()
def lauf(o):
    if isinstance(o, dict):
        for k, v in o.items():
            if isinstance(v, str) and v.strip():
                vor[k] += 1
            lauf(v)
    elif isinstance(o, list):
        for v in o: lauf(v)

for f in glob.glob('data/motto/*.json'):
    lauf(json.loads(pathlib.Path(f).read_text(encoding='utf-8')))

code = []
for muster in ('**/*.js', '**/*.html', '**/*.jsx'):
    for p in pathlib.Path('.').glob(muster):
        s = str(p)
        if s.startswith('data' + '/') or 'node_modules' in s or '_bundle' in s: continue
        try: code.append(p.read_text(encoding='utf-8', errors='ignore'))
        except OSError: pass
code = '\n'.join(code)

BEKANNT = {
    # safetyChecked ist ABSICHTLICH ungedruckt: es ist die Gegenseite von safetyNote
    # im Pflichtfeld (17.08.) — die belegte Entscheidung "dieser Posten braucht keine
    # Regel". Gelesen wird es sehr wohl, nur nicht vom Seiten-Renderer: Stufe 39
    # verlangt es, Stufe 42 akzeptiert es als Ersatz fuer eine gedruckte Regel, und
    # regeln-drucken.py unterdrueckt daraufhin die geratene Klassenregel. Wuerde es
    # gedruckt, staende auf der Seite "Pappteller sind harmlos" — Rauschen, das die
    # echten Regeln entwertet.
    'safetyChecked',
    # Vor der Regel entstanden. Aufloesen -> Zeile streichen, dann zieht sie.
    'categoryReasoning', 'topic', 'whyItWorks', 'whyItWorksTitle', 'subtitle',
    'educationalValue', 'kategorie', 'frage', 'antwort', 'habitat', 'merkmal',
    'tier', 'spurbild', 'anleitung', 'week', 'problem', 'solution',
    'whyMottoFits', 'whyMottoFitsHeadline', 'metaDescription', 'introParagraph',
    'invitationTemplate',
}

fehler, alt = [], []
for k, n in sorted(vor.items(), key=lambda x: -x[1]):
    if n < MINDEST or k in INTERN or DYNAMISCH.match(k): continue
    if re.search(r'\b%s\b' % re.escape(k), code): continue
    (alt if k in BEKANNT else fehler).append((k, n))

for k, n in alt:
    print('    (bekannt) %-24s %4d Vorkommen, kein Renderer liest es' % (k, n))
for k, n in fehler:
    print('    %-24s %4d Vorkommen, kein Renderer liest es' % (k, n))
summe = sum(n for _, n in fehler)
print('    %d Feldnamen ungelesen (%d Inhalte)%s' % (len(fehler), summe, ', %d bekannt' % len(alt) if alt else ''))
sys.exit(1 if fehler else 0)
