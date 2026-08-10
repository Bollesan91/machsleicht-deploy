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
#
# Die maritime Gruppe unter 'piraten' kam am 06.08. dazu. Der Anlass: ritter
# trug 19x "Crew", dazu "Ritterschiff-Kuchen", "Deine Rolle an Bord", "heuert
# eine Crew an" und "das tapfere Entern der Schatztruhe" — und diese Stufe
# meldete 0. Ein Anglizismus wie "Crew" ueberlebt jede Motto-Ersetzung, weil er
# nach keinem Motto aussieht; er gehoert trotzdem nur aufs Schiff.
EXKLUSIV = {
    'feuerwehr':    (r'\bWache\b', r'\bEinsatz\w*', r'\bMannschaft\b',
                     r'\bFeuerwehr\w*', r'\bLöschzug\b', r'\bAtemschutz\b'),
    'baustelle':    (r'\bBautrupp\b', r'\bBaustelle\w*', r'\bBagger\b', r'\bPolier\b'),
    'dino':         (r'\bDino\w*', r'\bSaurier\b', r'\bExpedition\w*', r'\bFossil\b'),
    'meerjungfrau': (r'\bRiff\w*', r'\bMeerjungfrau\w*', r'\bMuschel\w*', r'\bTauchgang\b'),
    'piraten':      (r'\bKapitän\w*', r'\bPiraten\w*', r'\bBeute\b', r'\bKombüse\b'),
    'ritter':       (r'\bRitter\w*', r'\bKnappe\w*', r'\bBurg\w*', r'\bWappen\w*',
                     r'\bTurnier\b'),
}

# Vokabular, das MEHREREN Mottos zugleich gehoert. Der erste Entwurf haengte die
# Seemannssprache an 'piraten' — und meldete prompt 19x "Riff-Crew" in
# meerjungfrau als Leck. Das ist keins: am Riff ist eine Crew so richtig wie an
# Deck. Falsch ist sie nur da, wo es kein Wasser gibt.
GRUPPEN = (
    ('maritim',
     (r'\bCrew\b', r'\ban Bord\b', r'\w*schiff\w*', r'\bentern\b', r'\bEntern\b',
      r'\bheuer[nt]\b', r'\bMatrose\w*', r'\bPlanke\b', r'\bReling\b'),
     {'piraten', 'meerjungfrau'}),
)


def sichtbar_je_slot(woerter):
    """Gibt je Slot nur den Text zurueck, der NICHT im Kommentar steht.

    Ein Slot darf im KOMMENTAR auf ein anderes Motto verweisen — mehrere tun
    das absichtlich ("Gegenstueck zum Piraten-Kompass"), und das ist gute
    Dokumentation, kein Leck. Gedruckt wird davon nichts.

    Die erste Fassung blendete slotweise mit /\\*.*?\\*/ aus und uebersah
    dabei, dass die Slots Bruchstuecke EINER Datei sind: w34 oeffnet den
    Kommentar, w35 schliesst ihn. In w35 stand damit nur '... */' — ohne
    oeffnendes /*, also galt der Inhalt als gedruckter Text und meldete sich
    am 06.08. als Fehlalarm ("Crew-Anlage auf der Partyseite").

    Deshalb wird der Kommentar-Zustand ueber die Slot-Reihenfolge mitgefuehrt.
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
                    break                      # Kommentar laeuft in den naechsten Slot
                offen = False
                i = j + 2
            else:
                j = t.find('/*', i)
                if j < 0:
                    sicht.append(t[i:])
                    break
                sicht.append(t[i:j])
                offen = True
                i = j + 2
        # Zeilenkommentare. Das (?<!:) haelt "https://" heraus — sonst
        # verschwindet jede URL samt dem Text dahinter aus der Pruefung.
        rein[slot] = re.sub(r'(?<!:)//[^\n]*', ' ', ' '.join(sicht))
    return rein

MANIFESTE = pathlib.Path('paket/_maschine/manifeste')

# Ein Manifest ohne Eintrag in EXKLUSIV wurde bis zum 06.08. still uebersprungen.
# Damit war jedes NEUE Motto von dieser Stufe ungeschuetzt — genau die Lage, in
# der ritter seine 19 Piraten-Anglizismen an einem gruenen Linter vorbeitrug.
# Ein fehlender Eintrag ist jetzt ein Fehler, kein Schweigen.
#
# AUSNAHME (10.08.): git-UNTRACKTE Manifeste sind Baustellen eines parallelen
# Arbeitsstrangs (Beleg: prinzessin.json lag als rohe piraten-Kopie im Baum,
# waehrend zwei andere Wellen durchs Gate mussten). Untracked deployt nie —
# Netlify baut aus Git. Solche Manifeste werden mit Ansage uebersprungen,
# NICHT gruen gerechnet: sobald sie committed werden, greift die Stufe hart.
import subprocess
_tracked = set(subprocess.run(
    ['git', 'ls-files', str(MANIFESTE)], capture_output=True, text=True
).stdout.split())
_in_bau = sorted(p.stem for p in MANIFESTE.glob('*.json')
                 if str(p).replace('\\', '/') not in _tracked)
if _in_bau:
    print('    HINWEIS: %d untracktes Manifest(e) in Bau, uebersprungen: %s'
          % (len(_in_bau), ', '.join(_in_bau)))
unbekannt = sorted(p.stem for p in MANIFESTE.glob('*.json')
                   if p.stem not in EXKLUSIV and p.stem not in _in_bau)
if unbekannt:
    print('    %d Manifest(e) ohne Vokabular-Eintrag: %s'
          % (len(unbekannt), ', '.join(unbekannt)))
    print('    -> in EXKLUSIV eintragen, sonst prueft diese Stufe sie nicht')
    sys.exit(1)

treffer = []
for pfad in sorted(MANIFESTE.glob('*.json')):
    motto = pfad.stem
    if motto in _in_bau:
        continue
    woerter = sichtbar_je_slot(
        json.loads(pfad.read_text(encoding='utf-8')).get('woerter') or {})

    # (Herkunftsname, Muster) je Vokabular, das diesem Motto FREMD ist
    fremde = [(fremd, muster) for fremd, muster in EXKLUSIV.items() if fremd != motto]
    fremde += [(name, muster) for name, muster, erlaubt in GRUPPEN if motto not in erlaubt]

    for fremd, muster in fremde:
        for slot, wert in woerter.items():
            text = wert
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
