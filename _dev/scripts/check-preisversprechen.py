# -*- coding: utf-8 -*-
"""Stufe 17: Stimmen die Preise im Fliesstext mit den Einkaufslisten ueberein?

Am 05.08. meldete der feuerwehr-Reviewer (Befund 3.1): "gross/standard:
gedrucktes Preisversprechen 136 EUR, gedruckte Liste 148 EUR". Stufe 11
prueft angeblich genau das und meldete gruen.

Beide hatten auf ihre Weise recht. Der Satz mit den drei Variantenpreisen

    "Minimal 106EUR (Stationen + Mini-Brandermittlung),
     Standard 136EUR (+ Theorie-Briefing + Vernehmung), Wow 196EUR (...)"

steht in `preparationWeeks` auf DOKUMENT-Ebene — nicht in `variants[]`.
Stufe 11 liest `variant.preparationWeeks` und findet dort nichts. Der eine
Satz, der alle drei Preise verspricht, liegt exakt ausserhalb des geprueften
Bereichs. Dasselbe gilt fuer `faq[].a`, wo die Spanne ein zweites Mal steht.

Ein Preis auf einem gedruckten Blatt ist bindend. Diese Stufe liest die
Prosa dort, wo sie wirklich liegt, und haelt jede Eurozahl gegen die Summe
der zugehoerigen Variante.
"""
import json, glob, pathlib, re, sys

# Wie die Prosa die Varianten benennt.
NAMEN = {'minimal': 'minimal', 'standard': 'standard', 'wow': 'wow'}
# "Standard 136EUR" / "Standard: ca. 136 EUR" / "Standard liegt bei 136 EUR"
#
# Die Zahl muss DIREKT hinter dem Variantennamen stehen. Die erste Fassung
# erlaubte 24 Zeichen dazwischen und fing damit Saetze wie
#     "... bei Standard Plastik-Helme (~12 EUR) ..."
# — ein Einzelposten, kein Versprechen ueber die Gesamtsumme. Das waren 6 von
# 52 Treffern. Eine Regel, die Einzelpreise fuer Gesamtpreise haelt, macht
# genau den Fehler, den sie finden soll.
PAAR = re.compile(r'\b(Minimal|Standard|Wow)\b\s*(?::|liegt bei|kostet|von|mit)?\s*'
                  r'(?:ca\.\s*|etwa\s*|rund\s*|~)?(\d{2,4})\s*(?:€|EUR)', re.I)
# Unter 20 EUR ist keine Party-Gesamtsumme, sondern ein Posten.
MINDEST = 20

def texte(d):
    """Jede Stelle, an der Preis-Prosa stehen kann — auf Dokument- UND
       Variantenebene, weil sie tatsaechlich an beiden Orten vorkommt."""
    raus = []
    def aus_pw(pw, wo):
        if not isinstance(pw, dict): return
        for bname, block in pw.items():
            if isinstance(block, dict):
                for it in (block.get('items') or []):
                    if isinstance(it, dict):
                        raus.append(('%s.%s.%s' % (wo, bname, 'detail'), str(it.get('detail') or '')))
                        raus.append(('%s.%s.%s' % (wo, bname, 'title'), str(it.get('title') or '')))
                    elif isinstance(it, str):
                        raus.append(('%s.%s' % (wo, bname), it))
    aus_pw(d.get('preparationWeeks'), 'preparationWeeks')
    for i, v in enumerate(d.get('variants') or []):
        aus_pw(v.get('preparationWeeks'), 'variants[%d].preparationWeeks' % i)
    for i, q in enumerate(d.get('faq') or []):
        if isinstance(q, dict):
            raus.append(('faq[%d].a' % i, str(q.get('a') or '')))
    return raus

# Optional ist ein Posten, wenn er das Praefix traegt ODER es im Label
# ausschreibt. Beides kommt vor — und zwar 2x das Praefix gegen 22x die
# ausgeschriebene Form, die Konvention wurde also fast nie befolgt.
#
# Diese Regel MUSS mit dem Renderer uebereinstimmen: das Einkaufsblatt rechnet
# seine Summe seit 05.08. nach genau demselben Kriterium. Ein Linter, der
# anders zaehlt als das Produkt, misst sich selbst statt der Wirklichkeit.
OPTIONAL = re.compile(r'^Optional:|\(([^)]*\boptional\b[^)]*)\)', re.I)


def summe(v):
    return sum(float(x.get('priceEur') or 0)
               for x in (v.get('shoppingList') or [])
               if not OPTIONAL.search(str(x.get('label', ''))))

treffer = []
for f in sorted(glob.glob('data/motto/*.json')):
    d = json.loads(pathlib.Path(f).read_text(encoding='utf-8'))
    sums = {}
    for v in (d.get('variants') or []):
        vid = str(v.get('id') or '').lower()
        if vid in NAMEN:
            sums[vid] = (summe(v), v.get('estimatedCostEur'))
    if not sums: continue
    for wo, t in texte(d):
        for m in PAAR.finditer(t):
            vid = m.group(1).lower()
            genannt = int(m.group(2))
            if vid not in sums or genannt < MINDEST: continue
            ist, feld = sums[vid]
            if abs(genannt - ist) > 0.5:
                treffer.append((pathlib.Path(f).name, vid, genannt, ist, feld, wo))

# Zwei Richtungen, die verschieden schwer wiegen:
#   A) Text und Feld sind einig, die LISTE schert aus -> die Einkaufsliste ist
#      ueber das Versprechen hinausgewachsen. Der Kaeufer zahlt mehr als
#      angekuendigt. Das ist der teure Fall.
#   B) Feld und Liste sind einig, der TEXT schert aus -> ein vergessener Satz.
a = [t for t in treffer if t[4] is not None and abs(t[2] - float(t[4])) < 0.5]
b = [t for t in treffer if t not in a]
for titel, gruppe in (('Liste ueber dem Versprechen (Kaeufer zahlt mehr)', a),
                      ('Fliesstext weicht von Feld UND Liste ab', b)):
    if not gruppe: continue
    print('    %s — %d:' % (titel, len(gruppe)))
    for datei, vid, genannt, ist, feld, wo in gruppe[:14]:
        print('      %-24s %-9s Text %4d · Feld %-5s · Liste %4.0f   (%s)'
              % (datei, vid, genannt, feld, ist, wo))
    if len(gruppe) > 14:
        print('      ... und %d weitere' % (len(gruppe) - 14))
print('    %d Preisversprechen weichen ab, in %d von 45 Dateien'
      % (len(treffer), len(set(t[0] for t in treffer))))
sys.exit(1 if treffer else 0)
