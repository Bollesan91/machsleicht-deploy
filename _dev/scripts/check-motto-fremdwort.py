# -*- coding: utf-8 -*-
"""Stufe 23: Steht das Vokabular eines fremden Mottos in einem Manifest?

Die Manifeste entstehen, indem das feuerwehr-Paket Slot fuer Slot uebersetzt
wird. Bleibt ein Slot dabei liegen, faellt es nicht auf: die Datei parst, der
Rundlauf ist gruen, und der Text steht auf einem Blatt weit hinten.

Gefunden am 05.08. im meerjungfrau-Review (Befund 5.4) — und beim Nachmessen
groesser als gemeldet: SECHS Slots waren in meerjungfrau UND in baustelle
zeichengleich mit feuerwehr geblieben. Gedruckt stand auf einem
Meerjungfrau-Produkt:

    Danke fuer den Einsatz!  ·  - deiner Wache  ·  Einsatzprotokoll
    Noch [] Naechte bis zum Einsatz!

Derselbe Fehler traf piraten an einer anderen Stelle: w86 trug feuerwehrs
"die Mannschaft" statt "die Crew".

Geprueft werden NUR die Manifest-Slots, nicht die Motto-JSONs. Dort stehen
Woerter wie "Gartenschlauch" oder "Wunderkerzen loeschen" voellig zu Recht —
eine dateiweite Suche erzeugt genau da ihre Fehlalarme.
"""
import json
import pathlib
import re
import sys

# Woerter, die NUR zu einem Motto gehoeren. Bewusst kurz und eindeutig:
# "Helm" fehlt, weil baustelle zu Recht Bauhelme hat; "Schlauch" fehlt wegen
# des Gartenschlauchs; "loeschen" fehlt wegen der Kerzen.
#
# Die Wortgrenzen sind nicht Kosmetik: ohne \b meldete die erste Fassung
# "Beute" in JEDEM "Werkzeug-Beutel", "Fundstueck-Beutel" und
# "Ausruestungs-Beutel" — sechs Fehlalarme aus einem einzigen fehlenden \b.
EXKLUSIV = {
    'feuerwehr':    (r'\bWache\b', r'\bEinsatz\w*', r'\bMannschaft\b',
                     r'\bFeuerwehr\w*', r'\bLöschzug\b', r'\bAtemschutz\b'),
    'baustelle':    (r'\bBautrupp\b', r'\bBaustelle\w*', r'\bBagger\b', r'\bPolier\b'),
    'dino':         (r'\bDino\w*', r'\bSaurier\b', r'\bExpedition\w*', r'\bFossil\b'),
    'meerjungfrau': (r'\bRiff\w*', r'\bMeerjungfrau\w*', r'\bMuschel\w*', r'\bTauchgang\b'),
    'piraten':      (r'\bKapitän\w*', r'\bPiraten\w*', r'\bBeute\b', r'\bKombüse\b'),
}


def ohne_kommentare(t):
    """Blendet /* ... */ aus.

    Ein Slot darf im KOMMENTAR auf ein anderes Motto verweisen — mehrere tun
    das absichtlich ("Gegenstueck zum Piraten-Kompass"), und das ist gute
    Dokumentation, kein Leck. Gedruckt wird davon nichts.
    """
    return re.sub(r'/\*.*?\*/', ' ', str(t), flags=re.S)

MANIFESTE = pathlib.Path('paket/_maschine/manifeste')

treffer = []
for pfad in sorted(MANIFESTE.glob('*.json')):
    motto = pfad.stem
    if motto not in EXKLUSIV:
        continue
    woerter = json.loads(pfad.read_text(encoding='utf-8')).get('woerter') or {}
    for fremd, muster in EXKLUSIV.items():
        if fremd == motto:
            continue
        for slot, wert in woerter.items():
            text = ohne_kommentare(wert)
            for m in muster:
                if re.search(m, text):
                    stelle = re.search(r'.{0,26}' + m + r'.{0,26}', text)
                    treffer.append((motto, slot, fremd,
                                    stelle.group(0) if stelle else m))
                    break

for motto, slot, fremd, stelle in treffer[:14]:
    print('    %-13s %-5s traegt %s-Vokabular: %s'
          % (motto, slot, fremd, stelle.strip().encode('ascii', 'replace').decode()))
if len(treffer) > 14:
    print('    ... und %d weitere' % (len(treffer) - 14))
print('    %d Manifest-Slots mit dem Vokabular eines fremden Mottos' % len(treffer))
sys.exit(1 if treffer else 0)
