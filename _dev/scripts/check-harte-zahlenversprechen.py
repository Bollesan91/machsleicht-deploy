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
#
# Re-Check 06.08.: Die erste Fassung kannte nur den ASCII-Bindestrich — und
# ausgerechnet der typografische Gedankenstrich ist die Hausform dieses Repos
# ("14:00–17:00", "6–8 Kinder"). `foot('Seiten 6–8 · Spielkarten')` passierte
# damit mit exit 0. Ebenso rutschten ausgeschriebene Zahlen durch
# ("Alle fuenf Stationen"). Beides ist jetzt abgedeckt.
ZAHL = r'(?:\d+|zwei|drei|vier|fünf|fuenf|sechs|sieben|acht|neun|zehn|elf|zwölf|zwoelf)'
STRICH = r'[-–—]'

MUSTER = (
    (re.compile(r'Seiten?\s+' + ZAHL + r'\s*' + STRICH + r'\s*' + ZAHL, re.I),
     'Seitenzahl (Kartenzahl schwankt je Variante)'),
    (re.compile(r'\b(?:Die|Alle)\s+' + ZAHL + r'\s+Stationen\b', re.I),
     'Stationszahl (kommt aus schatzsuche.json)'),
    (re.compile(r'\b' + ZAHL + r'\s+Bl(?:ä|ae)tter\b', re.I),
     'Blattzahl (haengt an der Gaestezahl)'),
    (re.compile(r'\b' + ZAHL + r'\s+Urkunden\b', re.I),
     'Urkundenzahl (haengt an der Gaestezahl)'),
    (re.compile(r'\b' + ZAHL + r'\s+Tischk(?:ä|ae)rtchen\b', re.I),
     'Kaertchenzahl (haengt an der Gaestezahl)'),
)

# Runde-4-Nachtrag 10.08.: Die Stufe war fuer die Wortklasse des soeben
# umgebauten Features blind — "Mit Namen + 5-6 Stempel-Feldern", "Knappen-
# Hefte + 5 Stempel", "5 Stations-Bewertungs-Feldern" passierten alle gruen,
# waehrend stempelPlan() die Stationszahl laengst aus dem Ablaufplan rechnet.
# Diese Muster gelten fuer Manifeste UND die Daten der sechs Paket-Mottos.
MUSTER_STEMPEL = (
    (re.compile(r'\b' + ZAHL + r'(?:\s*' + STRICH + r'\s*' + ZAHL + r')?'
                r'\s+Stempel(?:-Feld(?:er|ern)?)?\b', re.I),
     'Stempel-/Feldzahl (stempelPlan() zaehlt die Stationen)'),
    (re.compile(r'\b' + ZAHL + r'(?:\s*' + STRICH + r'\s*' + ZAHL + r')?'
                r'\s+(?:leere[nr]?\s+)?Stations-(?:Bewertungs-)?Feld(?:er|ern)?\b', re.I),
     'Stations-Feldzahl (stempelPlan() zaehlt die Stationen)'),
)
MUSTER = MUSTER + MUSTER_STEMPEL

PAKET_MOTTOS = ('piraten', 'dino', 'feuerwehr', 'baustelle', 'meerjungfrau', 'ritter')


def json_strings(o):
    if isinstance(o, dict):
        for v in o.values():
            yield from json_strings(v)
    elif isinstance(o, list):
        for v in o:
            yield from json_strings(v)
    elif isinstance(o, str):
        yield o


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

# Daten der sechs Paket-Mottos: dieselbe Fehlerklasse lebt in countdown-,
# shopping- und ritual-Texten (dort standen die Runde-4-Belege).
DATEN = pathlib.Path('data/motto')
for pfad in sorted(DATEN.glob('*.json')):
    if pfad.stem.split('-')[0] not in PAKET_MOTTOS:
        continue
    d = json.loads(pfad.read_text(encoding='utf-8'))
    for text in json_strings(d):
        for rx, warum in MUSTER_STEMPEL:
            m = rx.search(text)
            if m:
                treffer.append((pfad.stem, 'data', m.group(0), warum))
                break

for motto, slot, stelle, warum in treffer[:16]:
    print('    %-13s %-5s "%s" — %s'
          % (motto, slot, stelle.encode('ascii', 'replace').decode(), warum))
if len(treffer) > 16:
    print('    ... und %d weitere' % (len(treffer) - 16))
print('    %d feste Zahlen in Slots, die der Renderer variabel erzeugt' % len(treffer))
sys.exit(1 if treffer else 0)
