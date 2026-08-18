# -*- coding: utf-8 -*-
"""Stufe 41 — Eine gedruckte Regel darf nur Ausruestung verlangen, die auch im
Einkauf steht.

Befund 12.08.: `weltraum-mittel` verkauft das Filmdosen-Raketen-Experiment, und
die Spielregel sagt woertlich "Schutzbrille PFLICHT fuer alle in Reichweite
(kein optional)". Auf der Einkaufsliste stand keine einzige Schutzbrille. Am
Spieltag steht die Familie vor einer Pflicht, die sie nicht erfuellen kann —
und wird sie deshalb ignorieren. Eine unerfuellbare Regel ist schlimmer als
keine: sie gewoehnt den Leser daran, Regeln zu ueberblaettern.

Geprueft wird beides zusammen, weil beides gedruckt wird: die `safetyNote` am
Einkaufsposten und die `safetyRule` an der Spielkarte.

Bewusst enges Vokabular. Am 12.08. sind an einem Tag zwei zu breite Detektoren
gescheitert ("Pins" fing "Pinsel", "Feuer" fing "Feuerwehr") und ein dritter
(197 Treffer, fast alle falsch) musste wieder raus. Hier steht deshalb nur,
was man KAUFEN muss und was nicht im Haushalt liegt: ein Glas Wasser oder ein
Eimer sind da, eine Kinder-Schutzbrille ist es nicht.
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

# Seit 17.08. alle 15: Nachdem der Seiten-Kanal (s. seiten_kanal) die letzte Luecke
# geschlossen hat, steht der Katalog-Kanal auf 0 WARN. Ab hier ist jeder Rueckfall
# ein Fehler und kein Hinweis mehr — die Ratsche zieht an, wie bei Stufe 39.
FAIL_MOTTOS = {'baustelle', 'detektiv', 'dino', 'dschungel', 'einhorn', 'feen',
               'feuerwehr', 'meerjungfrau', 'pferde', 'piraten', 'prinzessin',
               'ritter', 'safari', 'superheld', 'weltraum'}

# verlangt die Regel ...            -> ... muss so im Einkauf auftauchen
AUSRUESTUNG = [
    ('Schutzbrille', re.compile(r'Schutzbrille', re.I), re.compile(r'Schutzbrille', re.I)),
    ('Warnweste',    re.compile(r'Warnweste', re.I),    re.compile(r'Warnweste', re.I)),
    ('Bauhelm',      re.compile(r'\bBauhelm', re.I),    re.compile(r'helm', re.I)),
]
# "ohne Schutzbrille" / "keine Schutzbrille noetig" verlangt nichts
RX_VERNEINT = re.compile(r'(ohne|keine?n?)\s+\w*(Schutzbrille|Warnweste|Bauhelm)', re.I)

# Nur die UNBEDINGTE Forderung ist ein Defekt. "Schutzbrille empfohlen" oder
# "bei empfindlichen Augen" ist ein Hinweis — wer will, kauft nach; wer nicht,
# feiert trotzdem regelkonform. "PFLICHT ... kein optional" dagegen macht die
# Party ohne den Posten unmoeglich. Die Trennung ist noetig, damit die Stufe
# nicht acht Hinweise wie acht Defekte meldet und dadurch unglaubwuerdig wird.
RX_WEICH = re.compile(r'empfohlen|bei Bedarf|falls|optional|wer (mag|will)|empfindlich', re.I)


def gedruckte_regeln(v):
    """Alles, was das Paket als Regel druckt — Posten-Note und Spielkarte."""
    for it in v.get('shoppingList') or []:
        if (it.get('safetyNote') or '').strip():
            yield 'Einkauf "%s"' % (it.get('label') or '')[:38], it['safetyNote']
    for g in v.get('games') or []:
        if (g.get('safetyRule') or '').strip():
            yield 'Spiel "%s"' % (g.get('name') or '')[:38], g['safetyRule']


def check_file(fp):
    findings = []
    d = json.load(io.open(fp, encoding='utf-8'))
    for v in d.get('variants') or []:
        labels = ' | '.join((it.get('label') or '') for it in (v.get('shoppingList') or []))
        for name, rx_regel, rx_einkauf in AUSRUESTUNG:
            if rx_einkauf.search(labels):
                continue
            for ort, text in gedruckte_regeln(v):
                if not rx_regel.search(text) or RX_VERNEINT.search(text):
                    continue
                # Satz isolieren, in dem die Ausruestung steht — ein "optional"
                # drei Saetze weiter (anderer Posten) entschaerft diese Forderung nicht.
                satz = next((s for s in re.split(r'(?<=[.!?])\s+', text) if rx_regel.search(s)), text)
                if RX_WEICH.search(satz):
                    continue
                findings.append(
                    '%s variants[%s]: %s verlangt %s — steht auf keiner Einkaufsliste '
                    'dieser Variante, die Regel ist am Spieltag nicht befolgbar'
                    % (fp, v.get('id', '?'), ort, name))
                break
    return findings


def seiten_kanal():
    """Zweiter Kanal: gemessen am Produkt, nicht am Katalog.

    Befund aus Gate B (17.08.): Der Gutachter meldete "einhorn-9-12 verlangt eine
    Schutzbrille, die nirgends verkauft wird". Im Katalog war er widerlegt — die
    Brille steht dort im Buendel-Posten "Rotkohl + Chemie-Zutaten + 10 Bastel-
    Schutzbrillen", weshalb der Katalog-Kanal oben gruen blieb. Auf der FREIEN
    Seite hatte er recht: die Zeile wird dort nie gedruckt, die Material-Zeile
    nennt Rotkohl, Becher, Essig, Natron, Zitronensaft, Spuelmittel — keine Brille.
    "Schutzbrille" kam auf der Seite ausschliesslich in den drei Hinweisen vor.

    Das ist Lektion L17 in einer neuen Stufe: Ein Gate, das die Quelle misst statt
    das Produkt, misst die falsche Groesse. Deshalb hier dieselbe Frage noch einmal
    an die ausgelieferte Seite: Wenn eine gedruckte Regel Ausruestung verlangt,
    muss die Seite sie auch irgendwo nennen — Einkaufsliste, Material-Zeile,
    Deko-Karte, egal wo, aber sichtbar.
    """
    findings = []
    for fp in sorted(glob.glob('kindergeburtstag/*-jahre.html')):
        roh = io.open(fp, encoding='utf-8', errors='replace').read()
        regeln = re.findall(r'<(?:span|div) class="shop-safe">((?:(?!</(?:span|div)>).)*)</(?:span|div)>',
                            roh, re.S)
        if not regeln:
            continue
        # Seitentext OHNE die Regeln selbst — sonst belegt die Forderung sich selbst
        rest = re.sub(r'<(span|div) class="shop-safe">(?:(?!</\1>).)*</\1>', ' ', roh, flags=re.S)
        rest = re.sub(r'<(script|style)\b.*?</\1>', ' ', rest, flags=re.S | re.I)
        rest = re.sub(r'<[^>]+>', ' ', rest)
        for name, rx_regel, rx_einkauf in AUSRUESTUNG:
            if rx_einkauf.search(rest):
                continue
            for regel in regeln:
                if not rx_regel.search(regel) or RX_VERNEINT.search(regel):
                    continue
                satz = next((s for s in re.split(r'(?<=[.!?])\s+', regel) if rx_regel.search(s)), regel)
                if RX_WEICH.search(satz):
                    continue
                findings.append(
                    '%s: gedruckte Regel verlangt %s — das Wort kommt sonst nirgends auf '
                    'der Seite vor, die Familie kann die Regel nicht befolgen: "%s"'
                    % (fp.replace('\\', '/'), name, satz.strip()[:110]))
                break
    return findings


def main():
    fail = warn = 0
    for f in seiten_kanal():
        print('    FAIL %s' % f)
        fail += 1
    for fp in sorted(glob.glob('data/motto/*-klein.json') + glob.glob('data/motto/*-mittel.json')
                     + glob.glob('data/motto/*-gross.json')):
        motto = re.sub(r'-(klein|mittel|gross)\.json$', '', fp.replace('\\', '/').split('/')[-1])
        fs = check_file(fp)
        hart = motto in FAIL_MOTTOS
        for f in fs:
            print('    %s %s' % ('FAIL' if hart else 'WARN', f))
        fail += len(fs) if hart else 0
        warn += 0 if hart else len(fs)
    print('    Stufe 41: %d FAIL (Seiten-Kanal hart + Katalog-Scope %s), %d WARN'
          % (fail, ','.join(sorted(FAIL_MOTTOS)), warn))
    sys.exit(1 if fail else 0)


if __name__ == '__main__':
    main()
