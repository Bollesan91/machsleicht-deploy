# -*- coding: utf-8 -*-
"""Stufe 39 — Riskantes im Einkauf braucht eine gedruckte Regel (Re-Check-M1).

Der Gutachter fand am 12.08.: die 9-12-Gruppe kauft echtes Werkzeug, Sägen-nahe
Sets und Schutzbrillen — und im ganzen Dossier stand dazu kein Wort. Die Regel
existierte in faq und ageInsight, aber beide Felder rendert das Paket nicht.
Eine Sicherheitsregel, die nur in einem ungedruckten Feld steht, ist keine.

Seit dem 12.08. traegt der Einkaufsposten selbst eine `safetyNote`, die der
Renderer direkt darunter druckt. Diese Stufe verlangt sie fuer jeden Posten,
dessen Label nach echtem Werkzeug, Schutzausruestung oder Hitze klingt.
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

FAIL_MOTTOS = {'baustelle'}
# Woerter, die eine Regel verlangen. Bewusst eng: ein Fehlalarm kostet
# Vertrauen in die Stufe, eine Luecke kostet ein Kind einen Finger.
RX_RISIKO = re.compile(
    # Werkzeug & Klingen
    r'echtes?\s+Werkzeug|Werkzeug-Set|Werkzeug-Premium|Werkzeug\s+Wow|Gravurwerkzeug'
    r'|Säge|Bohrer|Hammer|Nägel|Metall-Schrauben|Cutter|Messer|Sushi'
    # Hitze & Feuer (Schwarm-Befund 12.08.: Wunderkerzen auf Kuchen, Buegeleisen,
    # Mikrowellen-Seife, Lagerfeuer — alles Pflichtposten ohne ein Wort Regel)
    r'|Heißkleb|Kerze|Wunderkerze|Lagerfeuer|Feuerzeug|Bügeleisen|Fackel'
    # Chemie & Reizstoffe
    r'|Gips|Waschsoda|Natron|Essig|Glycerin|Spray|Farbpulver|Tinte'
    # Schutzausruestung (fehlt sie, ist der Posten selbst der Befund)
    r'|Schutzbrille'
    # Verschlucken & Ersticken — betrifft vor allem die klein-Dateien (3-5)
    # 12.08. abends, Gutachter-Fund: hier stand nur "Luftballon". Von 58 Posten
    # mit Ballons heissen aber nur 42 so; die anderen 16 heissen "Ballon-Bogen",
    # "Ballon-Girlande", "Folienballon", "Deko (Ballons, Papier)" — 14 davon
    # ohne jede Regel, darunter ein Ballon-Bogen fuer Dreijaehrige. Die Stufe
    # meldete 0 WARN und war trotzdem blind. Lehre: ein Vokabular, das aus den
    # bereits GEFUNDENEN Faellen gebaut ist, bestaetigt nur diese.
    r'|Ballon|Goldmünzen|Schoko-Münzen|Murmeln|\bPerlen\b|Glasperle|\bPins\b|Magnet'
    # Knopfzellen — verschluckt veraetzen sie die Speiseroehre binnen 2 Stunden.
    # Bewusst nicht "LED" allein: eine UV-Taschenlampe laeuft auf AAA.
    r'|Teelicht|Lichterkette|LED-Kerze'
    # Sturz, Sicht, Atemwege
    r'|Nebelmaschine|Seifenblasenmaschine'
    # Schlagwerkzeug im Spiel bzw. Halsschlinge
    r'|Pool-Nudel|Poolnudel|Lederband|Kordel|\bSchnur\b|\bSchnüre\b',
    re.I)


def check_file(fp):
    findings = []
    d = json.load(io.open(fp, encoding='utf-8'))
    for v in d.get('variants') or []:
        for it in v.get('shoppingList') or []:
            label = it.get('label') or ''
            if not RX_RISIKO.search(label):
                continue
            if (it.get('safetyNote') or '').strip():
                continue
            findings.append('%s variants[%s]: "%s" ist riskantes Material ohne safetyNote — '
                            'der Kaeufer bekommt es ohne eine einzige gedruckte Regel'
                            % (fp, v.get('id', '?'), label[:70]))
    return findings


def main():
    fail = warn = 0
    for fp in sorted(glob.glob('data/motto/*-klein.json') + glob.glob('data/motto/*-mittel.json')
                     + glob.glob('data/motto/*-gross.json')):
        motto = re.sub(r'-(klein|mittel|gross)\.json$', '', fp.replace('\\', '/').split('/')[-1])
        fs = check_file(fp)
        hart = motto in FAIL_MOTTOS
        for f in fs:
            print('    %s %s' % ('FAIL' if hart else 'WARN', f))
        fail += len(fs) if hart else 0
        warn += 0 if hart else len(fs)
    print('    Stufe 39: %d FAIL (Gate-Scope: %s), %d WARN (Arbeitsliste kommender Gates)'
          % (fail, ','.join(sorted(FAIL_MOTTOS)), warn))
    sys.exit(1 if fail else 0)


if __name__ == '__main__':
    main()
