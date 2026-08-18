# -*- coding: utf-8 -*-
"""Stufe 39 — Jeder Einkaufsposten traegt eine gepruefte Sicherheits-Entscheidung.

Geschichte dieser Stufe (der Grund fuer ihren Umbau steht in ihr selbst):
  12.08.  v1: Vokabular-Ansatz — Posten, deren Label nach Risiko KLINGT, brauchen
          eine safetyNote. Am selben Abend fand der Gutachter 14 Ballon-Posten,
          die anders hiessen ("Ballon-Bogen", "Deko (Ballons, Papier)").
  13.-15. Drei Review-Runden, drei neue Woerter: Goldtaler, Wollbaender,
          Trauben/Popcorn. Lehre (LEKTIONEN L17, dreimal bestaetigt): ein
          Vokabular aus gefundenen Faellen bestaetigt nur diese. Solange die
          Wahrheit "riskant oder nicht" in einer Regex-Liste lebt, findet jeder
          Reviewer das naechste Synonym.
  17.08.  v2 (Bolle-Go): Die Wahrheit zieht in die Daten. JEDER Posten traegt
          entweder eine `safetyNote` (gedruckte Regel) oder ein `safetyChecked`
          (gepruefte Kurzbegruendung, warum keine Regel noetig ist). Fehlt
          beides -> FAIL, repo-weit, alle 45 Dateien. Das Vokabular ist nur noch
          Plausibilitaets-Waechter: ein riskant klingender Posten mit
          harmlos-Markierung ist eine sichtbare WARN-Frage, keine stille Wahrheit.

Damit kann kein Reviewer mehr ein Wort finden, das die Abdeckung durchloechert —
die Abdeckung haengt an keinem Wort mehr.

Inhaltsregeln (Re-Check MINOR 7: `safetyNote: "s. oben"` passierte das Gate):
  - safetyNote >= 40 Zeichen, kein blosser Verweis ("s. oben", "siehe ...").
  - safetyChecked >= 15 Zeichen Begruendung, ebenfalls kein Verweis.
"""
import glob
import io
import json
import re
import sys

try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

# ---------------------------------------------------------------------------
# Plausibilitaets-Vokabular. NICHT mehr die Wahrheitsquelle — nur der Waechter,
# der harmlos-Markierungen an riskant klingenden Posten sichtbar macht.
# ---------------------------------------------------------------------------
RX_RISIKO = re.compile(
    # Werkzeug & Klingen
    r'echtes?\s+Werkzeug|Werkzeug-Set|Werkzeug-Premium|Werkzeug\s+Wow|Gravurwerkzeug'
    r'|Säge|Bohrer|Hammer|Nägel|Metall-Schrauben|Cutter|Messer|Sushi|Spieße|Spieß'
    # Hitze & Feuer
    r'|Heißkleb|Kerze|Wunderkerze|Lagerfeuer|Feuerzeug|Bügeleisen|Fackel|Mikrowelle'
    # Chemie & Reizstoffe
    r'|Gips|Waschsoda|Natron|Essig|Glycerin|Spray|Farbpulver|Tinte|Pyrographie|Brand-Stift'
    # Schutzausruestung (fehlt sie, ist der Posten selbst der Befund)
    r'|Schutzbrille'
    # Verschlucken & Ersticken — Gegenstaende
    r'|Ballon|Goldmünzen|Goldtaler|Schoko-Taler|Schoko-Münzen|Murmeln|\bPerlen\b|Glasperle'
    r'|\bPins\b|Magnet|Konfetti'
    # Knopfzellen-Traeger
    r'|Teelicht|Lichterkette|LED-Kerze|Knopfzelle'
    # Sturz, Sicht, Atemwege
    r'|Nebelmaschine|Seifenblasenmaschine'
    # Schlagwerkzeug bzw. Schlinge (Abnahme MINOR 4: auch Baender, Draht, Singular).
    # \bBänder\b mit linker Wortgrenze: Papier-"Stirnbänder" und "Gummibänder" sind
    # keine Schlingen — ohne die Grenze meldete das Gate Tonpapier als riskant.
    r'|Pool-Nudel|Poolnudel|Lederband|Kordel|Schnur\b|Schnüre\b|\bWolle\b|Wollknäuel'
    r'|Wollband|Wollbänder|Wollfaden|Wollfäden|\bDraht\b|Geschenkband|Satinband|\bBänder\b',
    re.I)

# Aspirationsklasse NUR fuer 3-5 (Abnahme MAJOR 2, DGKJ/BfR: Trauben und Kirschtomaten
# halbieren oder vierteln, Popcorn und ganze Nuesse bis etwa 4-5 gar nicht). Auf 6-8-
# und 9-12-Seiten ist Popcorn kein Befund — die Klasse ist altersgebunden, ein
# altersblindes Vokabular meldete Pizza-Popcorn auf 9-12 als Risiko.
RX_RISIKO_KLEIN = re.compile(
    r'Traube|Weintraube|Popcorn|\bNüsse\b|\bNuss\b|Rosinen|Kirschtomate|Marshmallow',
    re.I)


def risiko_regex(gruppe):
    """Das passende Vokabular je Altersgruppe ('klein' | 'mittel' | 'gross')."""
    if gruppe == 'klein':
        return re.compile(RX_RISIKO.pattern + '|' + RX_RISIKO_KLEIN.pattern, re.I)
    return RX_RISIKO

VERWEIS = re.compile(r'^\s*(s\.|siehe|vgl\.?|wie\s)', re.I)


def pruefe_posten(it):
    """-> (status, problem). status: 'note' | 'harmlos' | 'fehlt'."""
    note = (it.get('safetyNote') or '').strip()
    checked = (it.get('safetyChecked') or '').strip()
    if note:
        if len(note) < 40 or VERWEIS.match(note):
            return 'note', 'safetyNote ist kein Regeltext (zu kurz oder blosser Verweis: %r)' % note[:40]
        return 'note', None
    if checked:
        if len(checked) < 15 or VERWEIS.match(checked):
            return 'harmlos', 'safetyChecked ohne tragfaehige Begruendung: %r' % checked[:40]
        return 'harmlos', None
    return 'fehlt', None


def offene_je_motto():
    """Motto -> Anzahl Posten ohne Entscheidung (ueber alle drei Altersdateien)."""
    offen = {}
    for fp in sorted(glob.glob('data/motto/*.json')):
        name = fp.replace('\\', '/').split('/')[-1][:-5]
        motto = name.rsplit('-', 1)[0]
        d = json.load(io.open(fp, encoding='utf-8'))
        n = 0
        for v in (d.get('variants') or []):
            for it in (v.get('shoppingList') or []):
                if pruefe_posten(it)[0] == 'fehlt':
                    n += 1
        offen[motto] = offen.get(motto, 0) + n
    return offen


def main():
    # RATSCHE statt Stichtag: ein Motto, dessen Posten alle entschieden sind, ist ab
    # sofort hart gegated — jeder neue Posten ohne Entscheidung ist dort ein FAIL.
    # Mottos mit offener Arbeit melden dieselben Befunde als WARN. Damit haerten sich
    # die 15 Mottos einzeln nach, ohne dass der Linter monatelang pauschal rot steht,
    # und ohne dass irgendwer den Stichtag von Hand nachziehen muesste.
    offen_motto = offene_je_motto()
    geschlossen = set(m for m, n in offen_motto.items() if n == 0)

    fails, warns = [], []
    n_posten = n_note = n_harmlos = 0
    for fp in sorted(glob.glob('data/motto/*.json')):
        name = fp.replace('\\', '/').split('/')[-1]
        gruppe = name[:-5].rsplit('-', 1)[-1]
        rx = risiko_regex(gruppe)
        d = json.load(io.open(fp, encoding='utf-8'))
        for v in (d.get('variants') or []):
            for it in (v.get('shoppingList') or []):
                n_posten += 1
                label = (it.get('label') or '')[:64]
                motto = name[:-5].rsplit('-', 1)[0]
                hart = motto in geschlossen
                status, problem = pruefe_posten(it)
                if problem:
                    (fails if hart else warns).append(
                        '%s [%s] "%s": %s' % (name, v.get('id'), label, problem))
                    continue
                if status == 'fehlt':
                    (fails if hart else warns).append(
                        '%s [%s] "%s": weder safetyNote noch safetyChecked — '
                        'ungepruefter Verkauf' % (name, v.get('id'), label))
                elif status == 'note':
                    n_note += 1
                else:
                    n_harmlos += 1
                    if rx.search(it.get('label') or ''):
                        warns.append('%s [%s] "%s": klingt riskant, ist aber harmlos '
                                     'markiert — Begruendung: %s'
                                     % (name, v.get('id'), label,
                                        (it.get('safetyChecked') or '')[:80]))

    for f in fails:
        print('    FAIL %s' % f)
    for w in warns:
        print('    WARN %s' % w)
    offen_gesamt = sum(offen_motto.values())
    print('    Stufe 39: %d FAIL, %d WARN — %d Posten (%d mit Regel, %d gepruept harmlos, '
          '%d offen). Hart gegatet: %d von 15 Mottos%s'
          % (len(fails), len(warns), n_posten, n_note, n_harmlos, offen_gesamt,
             len(geschlossen),
             (' (' + ', '.join(sorted(geschlossen)) + ')') if geschlossen else ''))
    sys.exit(1 if fails else 0)


if __name__ == '__main__':
    main()
