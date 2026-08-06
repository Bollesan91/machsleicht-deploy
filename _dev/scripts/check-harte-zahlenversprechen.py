# -*- coding: utf-8 -*-
"""Stufe 27: Feste Zahlen in Slots, die der Renderer variabel erzeugt.

Anlass, 06.08. — drei Befunde derselben Bauart im ritter-Gutachten:

  * `foot('Seiten 6-8 · Spielkarten')` stand fest verdrahtet in ALLEN SECHS
    Manifesten, waehrend die Kartenzahl je Variante zwischen 3 (minimal) und
    6 (wow) schwankt, plus Ritual-Karte, plus Digital-Kachel. Die Fussnote
    behauptete in jedem Fall drei Seiten.
  * `hd('Teil III · Schatzsuche','Die 5 Stationen ...')` — die Stationsliste
    kommt aus schatzsuche.json und ist je Motto und Gruppe verschieden. Heute
    stimmt die 5 zufaellig fuer ritter; es ist eine latente Luege.
  * "21 Blaetter" als Produktversprechen: gerendert werden 15 feste Blaetter
    plus (Zusagen + 1) Urkunden. Die 21 gilt bei genau einer Gaestezahl.

Das Muster: eine Zahl steht als Text da, wo der Code daneben zaehlt. Sie faellt
nie auf, weil sie fuer den Testfall stimmt, unter dem sie geschrieben wurde.

Geprueft werden die Manifest-Slots (der gedruckte Text). Zahlen in Kommentaren
sind erlaubt — dort erklaeren sie meistens genau so einen Fall.
"""
import json
import pathlib
import re
import sys

MANIFESTE = pathlib.Path('paket/_maschine/manifeste')

# (Muster, was daran variabel ist). Bewusst eng: nur Faelle, in denen der
# Renderer die Menge nachweislich selbst bildet.
MUSTER = (
    (re.compile(r'Seiten?\s+\d+\s*-\s*\d+'),      'Seitenzahl (Kartenzahl schwankt je Variante)'),
    (re.compile(r'\bDie\s+\d+\s+Stationen\b'),    'Stationszahl (kommt aus schatzsuche.json)'),
    (re.compile(r'\b\d+\s+Bl(ä|ae)tter\b'),       'Blattzahl (haengt an der Gaestezahl)'),
    (re.compile(r'\b\d+\s+Urkunden\b'),           'Urkundenzahl (haengt an der Gaestezahl)'),
    (re.compile(r'\b\d+\s+Tischk(ä|ae)rtchen\b'), 'Kaertchenzahl (haengt an der Gaestezahl)'),
)


def sichtbar_je_slot(woerter):
    """Wie Stufe 23: Kommentar-Zustand ueber die Slot-Reihenfolge mitfuehren.

    Die Slots sind Bruchstuecke EINER Datei — w34 oeffnet einen Kommentar, w35
    schliesst ihn. Slotweises Ausblenden haelt w35 sonst fuer gedruckten Text.
    """
    rein = {}
    offen = False
    for slot in sorted(woerter, key=lambda s: int(s[1:])):
        t = str(woerter[slot])
        sicht = []
        i = 0
        while i < len(t):
            if offen:
                j = t.find('*/', i)
                if j < 0:
                    break
                offen = False
                i = j + 2
            else:
                j = t.find('/*', i)
                if j < 0:
                    sicht.append(t[i:]); break
                sicht.append(t[i:j]); offen = True; i = j + 2
        rein[slot] = re.sub(r'(?<!:)//[^\n]*', ' ', ' '.join(sicht))
    return rein


treffer = []
for pfad in sorted(MANIFESTE.glob('*.json')):
    motto = pfad.stem
    woerter = sichtbar_je_slot(json.loads(pfad.read_text(encoding='utf-8')).get('woerter') or {})
    for slot, text in woerter.items():
        for rx, warum in MUSTER:
            m = rx.search(text)
            if m:
                treffer.append((motto, slot, m.group(0), warum))
                break

for motto, slot, stelle, warum in treffer[:16]:
    print('    %-13s %-5s "%s" — %s'
          % (motto, slot, stelle.encode('ascii', 'replace').decode(), warum))
if len(treffer) > 16:
    print('    ... und %d weitere' % (len(treffer) - 16))
print('    %d feste Zahlen in Slots, die der Renderer variabel erzeugt' % len(treffer))
sys.exit(1 if treffer else 0)
