# -*- coding: utf-8 -*-
"""Stufe 22: Wird eine funktionslokale Variable in einer ANDEREN Funktion benutzt?

Am 05.08. landete der Summen-Block beim Einbauen am Ende von shSOS, obwohl
shShopping ihn braucht:

    function shShopping(){ ... '<div class="shop">'+items+summe+'</div>' ... }
    function shSOS(){      ... const summe = _liste.length ? ... : '';     }

`const` ist funktions-skopiert. shShopping warf deshalb
"ReferenceError: summe is not defined", der Renderer brach ab, und vier von
fuenf Paketen zeigten im Browser NULL Blaetter (nachgemessen, ?demo=1).

Warum keine der 21 vorhandenen Stufen das fing: Stufe 15 fragt "parst die
Datei?" — und sie parste tadellos. Ein ReferenceError entsteht erst beim
AUSFUEHREN. Genau diese Luecke schliesst diese Stufe.

Bewusst eng gehalten, damit sie ohne JS-Parser auskommt und keine Fehlalarme
erzeugt: geprueft werden nur Deklarationen auf der OBERSTEN Ebene eines
Funktionsrumpfs (Einrueckung exakt zwei Leerzeichen — die Hausform dieser
Dateien). Verschachtelte Bloecke, Closures und Parameter bleiben aussen vor;
sie koennen legitim durchgereicht werden.
"""
import glob
import pathlib
import re
import sys

NL = chr(10)
RUECK = chr(92)

# Namen, die global gesetzt werden oder aus dem Kern kommen — nie ein Leck.
GLOBAL_ERLAUBT = set()

# `var` gehoert dazu. Re-Check 06.08.: Die Stufe kannte nur const und let —
# derselbe ReferenceError wie beim summe-Vorfall vom 05.08. waere mit `var`
# deklariert unbemerkt durchgelaufen. Ein Wort schliesst die Luecke.
DEKL = re.compile(r'^  (?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=')
FUNKTION = re.compile(r'^function\s+([A-Za-z_$][\w$]*)\s*\(')
WORT = re.compile(r'[A-Za-z_$][\w$]*')


def ohne_strings_und_kommentare(t):
    """Ersetzt String- und Kommentar-Inhalte durch Leerzeichen.

    Zeilenzahl und Spaltenlage bleiben erhalten, damit Zeilenindizes nach dem
    Saeubern noch stimmen. Ohne das melden Fliesstexte wie "die Summe" oder
    ein Kommentar, der eine Variable erwaehnt, falsche Treffer.
    """
    aus, i, n = [], 0, len(t)
    im_str, im_kom, im_zeilenkom = None, False, False
    while i < n:
        c, zwei = t[i], t[i:i + 2]
        if im_zeilenkom:
            if c == NL:
                im_zeilenkom = False
                aus.append(c)
            else:
                aus.append(' ')
            i += 1
            continue
        if im_kom:
            if zwei == '*/':
                im_kom = False
                aus.append('  ')
                i += 2
                continue
            aus.append(c if c == NL else ' ')
            i += 1
            continue
        if im_str:
            if c == RUECK and i + 1 < n:
                aus.append('  ')
                i += 2
                continue
            if c == im_str:
                im_str = None
                aus.append(c)
            else:
                aus.append(c if c == NL else ' ')
            i += 1
            continue
        if zwei == '/*':
            im_kom = True
            aus.append('  ')
            i += 2
            continue
        if zwei == '//':
            im_zeilenkom = True
            aus.append('  ')
            i += 2
            continue
        if c in '"\'`':
            im_str = c
        aus.append(c)
        i += 1
    return ''.join(aus)


def gebundene_namen(kopfzeile, koerper):
    """Jeder Name, den DIESE Funktion selbst bindet.

    Bewusst grosszuegig: lieber eine Bindung zu viel erkennen (und einen
    echten Fund verpassen) als Fehlalarme erzeugen — ein Linter, dem man
    nicht glaubt, wird ignoriert.
    """
    namen = set()
    # eigene Parameter
    kopf = re.search(r'\(([^)]*)\)', kopfzeile)
    if kopf:
        namen |= set(WORT.findall(kopf.group(1)))
    # Deklarationen in JEDER Tiefe
    namen |= set(re.findall(r'\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)', koerper))
    # Destrukturierung: const {a, b} = ... / const [a, b] = ...
    for gruppe in re.findall(r'\b(?:const|let|var)\s*[\{\[]([^\}\]]*)[\}\]]', koerper):
        namen |= set(WORT.findall(gruppe))
    # Arrow-Parameter: (a, b) => und a =>
    for gruppe in re.findall(r'\(([^()]*)\)\s*=>', koerper):
        namen |= set(WORT.findall(gruppe))
    namen |= set(re.findall(r'\b([A-Za-z_$][\w$]*)\s*=>', koerper))
    # function(a, b) und catch(e)
    for gruppe in re.findall(r'\b(?:function|catch)\s*[A-Za-z_$\w]*\s*\(([^)]*)\)', koerper):
        namen |= set(WORT.findall(gruppe))
    return namen


def funktionen(zeilen):
    """(name, start, ende) je Funktion auf oberster Ebene."""
    aus = []
    for i, z in enumerate(zeilen):
        m = FUNKTION.match(z)
        if not m:
            continue
        ende = next((j for j in range(i + 1, len(zeilen))
                     if zeilen[j].rstrip() == '}'), len(zeilen) - 1)
        aus.append((m.group(1), i, ende))
    return aus


# Das Template ist BEWUSST nicht dabei: es ist kein lauffaehiges JS, sondern
# eine Datei mit Loechern. Wo im Paket "const meta=..." steht, steht dort ein
# {{wNN}} — die Deklaration fehlt also scheinbar, und jede Benutzung sieht wie
# ein Leck aus (genau ein solcher Fehlalarm entstand beim Bauen dieser Stufe).
# Geprueft wird, was wirklich laeuft: die erzeugten Pakete.
treffer = []
for pfad in sorted(glob.glob('paket/*/index.html')):
    p = pathlib.Path(pfad)
    if not p.exists():
        continue
    sauber = ohne_strings_und_kommentare(p.read_text(encoding='utf-8'))
    zeilen = sauber.split(NL)
    funks = funktionen(zeilen)

    # Wer deklariert was auf oberster Rumpf-Ebene?
    besitzer = {}
    for name, a, e in funks:
        for i in range(a + 1, e):
            m = DEKL.match(zeilen[i])
            if m:
                besitzer.setdefault(m.group(1), []).append(name)

    # Nur eindeutig zugeordnete Namen pruefen: taucht derselbe Name in mehreren
    # Funktionen auf (v, g, nm, items ...), ist er ohnehin ueberall lokal.
    eindeutig = {k: v[0] for k, v in besitzer.items() if len(v) == 1}

    for name, a, e in funks:
        koerper = NL.join(zeilen[a + 1:e])
        # Eigenschaftszugriffe (obj.x) ausblenden — .summe ist keine Benutzung
        koerper = re.sub(r'\.\s*[A-Za-z_$][\w$]*', ' ', koerper)
        # Objekt-SCHLUESSEL sind ebenfalls keine Variablen-Lesung. Am 06.08.
        # meldete diese Stufe `frueh` als Leck, weil abholZeiten() ein Objekt
        # mit dem Schluessel `frueh:` zurueckgibt und abholNote() eine gleich
        # benannte lokale Variable haelt. Die beiden haben nichts miteinander zu
        # tun. Die Kurzform `{frueh}` BLEIBT eine Benutzung — dort folgt kein
        # Doppelpunkt, das Muster greift also nicht.
        koerper = re.sub(r'([{,]\s*)[A-Za-z_$][\w$]*(\s*:)', r'\1\2', koerper)
        # Regex-Literale sind ebenfalls kein Code-Kontext. Re-Check 06.08.:
        # das Wort `ab` in /\b(bis|ab|max\.?)/ galt als Benutzung der gleich
        # benannten Variablen aus einer anderen Funktion. Heuristik: ein `/`
        # direkt nach ( = , [ ! & | : ; ? beginnt ein Literal, keine Division —
        # in diesem Codebestand trifft das zu, echte Divisionen stehen dort
        # hinter einem Bezeichner oder einer Zahl.
        koerper = re.sub(
            r'([(=,\[!&|:;?]\s*)/(?![/*])(?:\\.|\[(?:\\.|[^\]])*\]|[^/\n\\])+/[gimsuy]*',
            r'\1 ', koerper)
        benutzt = set(WORT.findall(koerper))
        # Alles, was IN DIESER Funktion gebunden wird, ist kein Leck. Ohne das
        # meldete die erste Fassung 60 Fehlalarme: kurze Namen wie s, sub, grp
        # sind anderswo Parameter oder Arrow-Argumente, keine fremden Zugriffe.
        gebunden = set(gebundene_namen(zeilen[a], koerper))
        for var, heimat in eindeutig.items():
            if (heimat != name and var in benutzt
                    and var not in gebunden and var not in GLOBAL_ERLAUBT):
                treffer.append((p.name if p.parent.name == '_maschine'
                                else p.parent.name, var, heimat, name))

for datei, var, heimat, wo in treffer[:14]:
    print('    %-14s %-12s deklariert in %-14s benutzt in %s'
          % (datei, var, heimat + '()', wo + '()'))
if len(treffer) > 14:
    print('    ... und %d weitere' % (len(treffer) - 14))
print('    %d funktionslokale Variablen ausserhalb ihrer Funktion benutzt' % len(treffer))
sys.exit(1 if treffer else 0)
