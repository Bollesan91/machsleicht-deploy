# -*- coding: utf-8 -*-
"""Rundlauf-Kriterium schaerfen: beabsichtigte von echten Abweichungen trennen.

Bis Stufe 4a galt "byte-genau oder kaputt". Seit der Palette-Kommentar erzeugt
wird, ist eine Abweichung gewollt — und ein Kriterium, das an gewollten
Aenderungen scheitert, ist kein Kriterium mehr, sondern ein Hindernis.

Neu: Jede Diff-Zeile wird eingeordnet. Beabsichtigt sind genau zwei Klassen —
die auf ihre Rolle normierten SVG-Namen und der erzeugte Palette-Kommentar.
Alles andere ist ECHT und bricht den Beweis.
"""
import pathlib, sys

p = pathlib.Path('_dev/scripts/paket-bauen.py')
s = p.read_text(encoding='utf-8')

ALT = """def diff_bericht(a, b, titel):
    \"\"\"Zaehlt die Unterschiede und sagt, ob sie nur die SVG-Namen betreffen.\"\"\"
    za, zb = a.split('\\n'), b.split('\\n')
    sm = difflib.SequenceMatcher(None, za, zb, autojunk=False)
    zeilen = []
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == 'equal':
            continue
        zeilen += ['- ' + x for x in za[i1:i2]] + ['+ ' + x for x in zb[j1:j2]]
    nur_svg = all(re.search(r'\\b(compass|footprint|helm|seal|fossilSeal|abzeichen|shipCover|jungleCover|wacheCover|signet|siegel|cover)Svg\\b', z)
                  for z in zeilen) if zeilen else True
    return len(zeilen), nur_svg, zeilen"""

NEU = '''BEABSICHTIGT = (
    # SVG-Funktionsnamen, auf ihre Rolle normiert (Stufe 1)
    re.compile(r'\\b(compass|footprint|helm|seal|fossilSeal|abzeichen|shipCover|'
               r'jungleCover|wacheCover|signet|siegel|cover)Svg\\b'),
    # Palette-Kommentar, seit Stufe 4a erzeugt statt handgepflegt
    re.compile(r'--gold(-lt)? #[0-9A-Fa-f]{6} (auf|ist)|Rollen siehe /paket/core/PALETTE\\.md|'
               r'ist FLAECHE, nie Textfarbe|AA erfuellt \\(gerechnet|UNTER AA 4,5|'
               r'/\\* \\w+: .*(Papier|Pergament|Perlpapier)'),
)


def diff_bericht(a, b, titel):
    """Trennt beabsichtigte Abweichungen von echten.

    Beabsichtigt sind genau zwei Klassen: die auf ihre Rolle normierten
    SVG-Namen und der erzeugte Palette-Kommentar. Alles andere ist ECHT und
    bricht den Beweis — sonst waere das Kriterium wertlos."""
    za, zb = a.split('\\n'), b.split('\\n')
    sm = difflib.SequenceMatcher(None, za, zb, autojunk=False)
    zeilen = []
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == 'equal':
            continue
        zeilen += ['- ' + x for x in za[i1:i2]] + ['+ ' + x for x in zb[j1:j2]]
    echt = [z for z in zeilen if not any(m.search(z) for m in BEABSICHTIGT)]
    return len(echt), not echt, echt'''

if ALT not in s:
    print('ABBRUCH: diff_bericht nicht in erwarteter Form'); sys.exit(1)
s = s.replace(ALT, NEU, 1)

# Statuszeile: "IDENTISCH" heisst jetzt "keine echte Abweichung"
s = s.replace("status = 'IDENTISCH' if n == 0 else '%d Zeilen ABWEICHUNG' % n",
              "status = 'IDENTISCH (nur beabsichtigte Abweichungen)' if n == 0 else '%d ECHTE Abweichungen' % n")
s = s.replace("status = '%d Zeilen anders (Wortwahl — kommt in Stufe 3)' % n",
              "status = 'identisch' if n == 0 else '%d echte Abweichungen offen' % n")
p.write_text(s, encoding='utf-8')
import ast; ast.parse(s)
print('Beweis-Kriterium geschaerft: beabsichtigt vs. echt.')
