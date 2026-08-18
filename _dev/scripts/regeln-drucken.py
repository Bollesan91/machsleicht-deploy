# -*- coding: utf-8 -*-
"""Maschine: druckt die Sicherheitsregeln der Datenwahrheit auf die freien Ratgeberseiten.

Warum es diese Maschine gibt (Befund 12.08./13.08.2026)
-------------------------------------------------------
`data/motto/*.json` traegt die geprueften Sicherheitsregeln (`shoppingList[].safetyNote`).
Gedruckt wurden sie bis heute NUR im Paket und auf drei generierten baustelle-Seiten.
Die 45 uebrigen `kindergeburtstag/*-jahre.html` sind eingefrorenes HTML ohne Renderer —
sie verkaufen dieselben Luftballons, Wunderkerzen und Pool-Nudel-Schwerter ohne ein Wort
dazu. Ein zweiter Generator waere die halbe Wahrheit; deshalb ist DIESE Datei der Renderer
fuer das eine Feld `safetyNote`: die Regel bleibt in `data/motto`, die Seite ist Ableitung.

Vertrag
-------
1. Idempotent. Der Lauf entfernt zuerst JEDE vorhandene `<span class="shop-safe">`-Regel
   im Einkaufs-/Deko-Bereich und schreibt sie aus den Daten neu. Zweiter Lauf = leerer Diff.
   Damit ist die Maschine auch das Update: Text in data/motto aendern, Maschine laufen.
2. Fail-loud. Eine Regel, die auf ihrer Seite keinen Posten findet, ist ein FEHLER
   (Exit 1) — nicht ein stiller Verlust. Aufloesbar nur mit einem Eintrag in
   `data/freie-seiten-regeln.json`, der belegt, WARUM.
3. Konvergent mit `_src/generate-age-pages.py`. Fuer `ul.list-plain` erzeugt diese Maschine
   byteweise dasselbe Markup wie der Generator (Label + `<span class="shop-safe">`).
   Ein spaeterer Generatorlauf ueberschreibt also nichts, was hier entsteht.
4. Genau ein Ort je Wahrheit: Regeltext -> data/motto (bzw. eigeneRegeln fuer Posten, die
   es NUR auf der freien Seite gibt). Diese Datei enthaelt keinen einzigen Regeltext.

Aufruf
------
    python _dev/scripts/regeln-drucken.py           # schreibt
    python _dev/scripts/regeln-drucken.py --check   # schreibt nichts, Exit 1 bei Aenderung
    python _dev/scripts/regeln-drucken.py --seite kindergeburtstag/ritter-6-8-jahre.html

Gates: Stufe 42 (jede verkaufende Seite druckt ihre Regeln) prueft das Ergebnis,
`--check` beweist die Idempotenz.
"""
import glob
import html as html_mod
import io
import json
import os
import re
import sys
import unicodedata

try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except Exception:
    pass

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SEITEN_DIR = os.path.join(ROOT, 'kindergeburtstag')
MOTTO_DIR = os.path.join(ROOT, 'data', 'motto')
ANKER_DATEI = os.path.join(ROOT, 'data', 'freie-seiten-regeln.json')

ALTER = {'3-5': 'klein', '6-8': 'mittel', '9-12': 'gross'}


def _paket_kanal():
    """Die Ersetzungen des Generators, aus SEINER Datei geladen — nicht kopiert.

    Ohne sie druckte feen-9-12 "Fuer die UV-Lampe gilt die Regel auf der Spielkarte":
    eine Spielkarte, die es nur im Paket gibt. Stufe 35 hat genau das gefangen.
    """
    import importlib.util
    fp = os.path.join(ROOT, '_src', 'generate-age-pages.py')
    spec = importlib.util.spec_from_file_location('agegen_kanal', fp)
    mod = importlib.util.module_from_spec(spec)
    merk, sys.argv = sys.argv, [fp]          # main() nicht triggern
    try:
        spec.loader.exec_module(mod)
    finally:
        sys.argv = merk
    return list(mod.PAKET_KANAL)


PAKET_KANAL = _paket_kanal()


def planer_kanal(s):
    for a, b in PAKET_KANAL:
        s = s.replace(a, b)
    return s

# Der Generator schreibt color:var(--t) — diese Variable ist im ganzen Repo nirgends
# definiert, die Deklaration verfaellt also. --d (Textfarbe) ist auf allen 48 Seiten da.
CSS_REGEL = ('.shop-safe{display:block;margin-top:3px;font-size:13px;line-height:1.5;'
             'color:var(--d);border-left:2px solid #d94f3d;padding-left:8px}')
CSS_ALT = re.compile(r'\.shop-safe\{[^}]*\}')

SPAN_WEG = re.compile(r'<span class="shop-safe">(?:(?!</span>).)*</span>', re.S)

HEAD = re.compile(r'<h([34])[^>]*>\s*(?:\U0001F6D2|&#x1F6D2;)?\s*Einkaufslist[^<]*</h\1>')

# (Regex des oeffnenden Tags, Tag-Name, Typ)
CONTAINER = [
    (re.compile(r'<ul class="list-plain">'), 'ul', 'ul'),
    (re.compile(r'<table class="shopping-table">'), 'table', 'table'),
    (re.compile(r'<div class="card" style="font-size:13px">'), 'div', 'flex'),
    (re.compile(r'<div style="margin:12px 0">'), 'div', 'flex'),
]

LI = re.compile(r'<li\b[^>]*>(?:(?!</li>).)*</li>', re.S)
TR = re.compile(r'<tr\b[^>]*>(?:(?!</tr>).)*</tr>', re.S)
FLEX = re.compile(r'<div style="display:flex;justify-content:space-between[^"]*">\s*<span>(?:(?!</span>).)*</span>', re.S)

TAGS = re.compile(r'<[^>]+>')
EMOJI = re.compile(
    '[\U0001F000-\U0001FAFF☀-➿️‍←-⇿⬀-⯿]')
MENGE_VORN = re.compile(r'^(?:ca\.?\s*)?\d+\s*(?:x|stk\.?|stueck|er|m|cm|g|kg|ml|l|pack|packungen?|set|sets)?\s+')
KLAMMER = re.compile(r'\([^)]*\)')
# Badges, die NUR die Seite ans Label haengt ("Pflicht", "Hab ich evtl.") — sie gehoeren
# zur Darstellung, nicht zur Ware. Ohne diesen Schnitt braeuchte jede dschungel- und
# safari-Zeile einen Handanker, obwohl Katalog und Seite dieselbe Ware meinen (17.08.).
SEITEN_BADGE = re.compile(r'\s*(pflicht|hab ich evtl|nice to have|sinnvoll|optional)\s*$')


def norm(s):
    """Vergleichsform eines Postens/Labels: ohne Tags, Emoji, Klammern, Mengen."""
    s = TAGS.sub(' ', s)
    s = html_mod.unescape(s)
    s = EMOJI.sub(' ', s)
    s = s.replace('ß', 'ss')
    for a, b in (('ä', 'ae'), ('ö', 'oe'), ('ü', 'ue'),
                 ('Ä', 'ae'), ('Ö', 'oe'), ('Ü', 'ue')):
        s = s.replace(a, b)
    s = unicodedata.normalize('NFKD', s)
    s = ''.join(c for c in s if not unicodedata.combining(c))
    s = s.lower()
    s = KLAMMER.sub(' ', s)
    s = re.sub(r'[^a-z0-9]+', ' ', s).strip()
    s = MENGE_VORN.sub('', s)
    s = SEITEN_BADGE.sub('', s)
    return re.sub(r'\s+', ' ', s).strip()


def esc(s):
    """Wie _src/generate-age-pages.py:32 — damit beide Renderer dieselben Bytes erzeugen."""
    return html_mod.escape(str(s or ''), quote=True)


def finde_container(text, ab):
    """Erstes Einkaufs-Container-Element ab Position `ab`; gibt (start, ende, typ)."""
    treffer = None
    for rx, tag, typ in CONTAINER:
        m = rx.search(text, ab, ab + 400)
        if m and (treffer is None or m.start() < treffer[0].start()):
            treffer = (m, tag, typ)
    if not treffer:
        return None
    m, tag, typ = treffer
    tiefe = 0
    pos = m.start()
    scan = re.compile(r'<%s\b[^>]*>|</%s>' % (tag, tag))
    while True:
        t = scan.search(text, pos)
        if not t:
            return None
        if t.group(0).startswith('</'):
            tiefe -= 1
            if tiefe == 0:
                return (m.start(), t.end(), typ)
        else:
            tiefe += 1
        pos = t.end()


def posten_im_block(block, typ):
    """Liste von (start, ende, label_html, einfuege_offset) relativ zum Block."""
    out = []
    if typ == 'ul':
        for m in LI.finditer(block):
            inner = m.group(0)
            ein = m.end() - len('</li>')
            out.append((m.start(), m.end(), inner, ein))
    elif typ == 'table':
        for m in TR.finditer(block):
            roh = m.group(0)
            if '<th' in roh:
                continue
            td = re.search(r'</td>', roh)
            if not td:
                continue
            out.append((m.start(), m.end(), roh[:td.start()], m.start() + td.start()))
    elif typ == 'flex':
        for m in FLEX.finditer(block):
            roh = m.group(0)
            ein = m.end() - len('</span>')
            out.append((m.start(), m.end(), roh, ein))
    return out


DIV_TAG = re.compile(r'<div\b[^>]*>|</div>')


def deko_posten(text):
    """Deko-Grid-Karten (prinzessin/superheld verkaufen NUR so): (start, ende, label, einfuege).

    Die Karte wird mit balanciertem Tag-Zaehler abgegrenzt. Die erste Fassung nahm
    "bis zum naechsten deko-item, sonst bis zum Ende" und suchte darin das letzte
    </div> — bei der LETZTEN Karte eines Rasters lief das bis zum Dateiende, und die
    Ballon-Regel landete neben dem Planer-Knopf im Footer (detektiv-3-5, dino-9-12).
    Das Gate zaehlte sie trotzdem als gedruckt: eine Regel im Dokument, aber nicht am
    Posten. Gefunden hat es erst das eigene Stichproben-Audit, nicht die Maschine.
    """
    out = []
    for m in re.finditer(r'<div class="deko-item">', text):
        tiefe = 0
        pos = m.start()
        ende = None
        while True:
            t = DIV_TAG.search(text, pos)
            if not t:
                break
            if t.group(0) == '</div>':
                tiefe -= 1
                if tiefe == 0:
                    ende = t.start()
                    break
            else:
                tiefe += 1
            pos = t.end()
        if ende is None:
            continue
        karte = text[m.start():ende]
        lab = re.search(r'<div class="label">(.*?)</div>', karte, re.S)
        if not lab:
            continue
        out.append((m.start(), ende + len('</div>'), lab.group(1), ende))
    return out


def lade_regeln():
    """(motto, gruppe) -> Liste von (variant_index, label, note) aus data/motto."""
    regeln = {}
    for fp in sorted(glob.glob(os.path.join(MOTTO_DIR, '*.json'))):
        name = os.path.basename(fp)[:-5]
        if '-' not in name:
            continue
        motto, gruppe = name.rsplit('-', 1)
        if gruppe not in ('klein', 'mittel', 'gross'):
            continue
        d = json.load(io.open(fp, encoding='utf-8'))
        eintraege = []
        for vi, v in enumerate(d.get('variants') or []):
            for it in (v.get('shoppingList') or []):
                note = (it.get('safetyNote') or '').strip()
                if note:
                    eintraege.append((vi, (it.get('label') or '').strip(), note))
        if eintraege:
            regeln[(motto, gruppe)] = eintraege
    return regeln


_HARMLOS_CACHE = {}


def lade_harmlos():
    """(motto, gruppe) -> [(variant_index, label, begruendung)] fuer safetyChecked-Posten.

    Pflichtfeld-Gegenstueck zu lade_regeln(): was ein Mensch als "gepruept harmlos"
    markiert hat, darf keine geratene Klassenregel bekommen.
    """
    if _HARMLOS_CACHE:
        return _HARMLOS_CACHE
    for fp in sorted(glob.glob(os.path.join(MOTTO_DIR, '*.json'))):
        name = os.path.basename(fp)[:-5]
        if '-' not in name:
            continue
        motto, gruppe = name.rsplit('-', 1)
        if gruppe not in ('klein', 'mittel', 'gross'):
            continue
        d = json.load(io.open(fp, encoding='utf-8'))
        eintraege = []
        for vi, v in enumerate(d.get('variants') or []):
            for it in (v.get('shoppingList') or []):
                checked = (it.get('safetyChecked') or '').strip()
                if checked and not (it.get('safetyNote') or '').strip():
                    eintraege.append((vi, (it.get('label') or '').strip(), checked))
        if eintraege:
            _HARMLOS_CACHE[(motto, gruppe)] = eintraege
    return _HARMLOS_CACHE


def lade_anker():
    if not os.path.exists(ANKER_DATEI):
        return {'anker': {}, 'keinPosten': {}, 'eigeneRegeln': {},
                'warenRegeln': {}, 'spielAnker': {}}
    d = json.load(io.open(ANKER_DATEI, encoding='utf-8'))
    return {'anker': d.get('anker') or {},
            'keinPosten': d.get('keinPosten') or {},
            'eigeneRegeln': d.get('eigeneRegeln') or {},
            'warenRegeln': d.get('warenRegeln') or {},
            'spielAnker': d.get('spielAnker') or {}}


def css_setzen(text):
    """Sorgt dafuer, dass .shop-safe formatiert ist — sonst rendert die Regel als Fliesstext.

    Der Notfall-Kasten braucht eigenes CSS und kam spaeter dazu; er wird deshalb
    getrennt geprueft. Ein frueher Ausstieg bei vorhandenem .shop-safe haette ihn
    auf allen bereits gerenderten Seiten unformatiert gelassen.
    """
    geaendert = False
    if CSS_REGEL not in text:
        if CSS_ALT.search(text):
            text = CSS_ALT.sub(lambda _: CSS_REGEL, text, count=1)
            geaendert = True
        else:
            m = re.search(r'</style>', text)
            if not m:
                return text, geaendert
            text = text[:m.start()] + CSS_REGEL + text[m.start():]
            geaendert = True
    if NOTFALL_CSS not in text:
        m = re.search(r'</style>', text)
        if m:
            text = text[:m.start()] + NOTFALL_CSS + text[m.start():]
            geaendert = True
    return text, geaendert


NOTFALL_MARKE = 'data-notfall="verschlucken"'
NOTFALL_CSS = (
    '.notfall-kasten{margin:26px 0 8px;padding:14px 16px;border:2px solid #C62828;'
    'border-radius:8px;background:#fff5f4}'
    '.notfall-kasten h3{margin:0 0 8px;font-size:16px;color:#C62828}'
    '.notfall-kasten ul{margin:0;padding-left:18px}'
    '.notfall-kasten li{margin:0 0 6px;font-size:14px;line-height:1.55}'
    '.notfall-kasten p{margin:8px 0 0;font-size:12px;color:#666}')

# Woertlich abgeleitet aus DRK "Erste Hilfe bei Ersticken" und dem GRC/ERC-Algorithmus
# "Fremdkoerperaspiration beim Kind" (primaerverifiziert 17.08.2026). Die drei Punkte,
# die in Elternratgebern am haeufigsten fehlen, stehen bewusst zuerst: wirksamer Husten
# wird NICHT unterbrochen, Sauglinge unter einem Jahr bekommen KEINE Oberbauch-
# kompression, und nach geglueckter Rettung muss trotzdem ein Arzt draufschauen.
NOTFALL_HTML = (
    '<div class="notfall-kasten" ' + NOTFALL_MARKE + '>'
    '<h3>Wenn ein Kind sich verschluckt</h3>'
    '<ul>'
    '<li><strong>Solange es kr&auml;ftig hustet: nicht eingreifen.</strong> Ermutige es '
    'weiterzuhusten — kein Handgriff ist so wirksam wie der eigene Husten. Klopf ihm '
    'nicht auf den R&uuml;cken, solange der Husten l&auml;uft.</li>'
    '<li><strong>Wird der Husten schwach oder still und das Kind bekommt keine Luft:</strong> '
    'lass sofort den Notruf 112 w&auml;hlen und fang an. Beug das Kind nach vorn und gib '
    'bis zu f&uuml;nf Schl&auml;ge mit der flachen Hand zwischen die Schulterbl&auml;tter.</li>'
    '<li><strong>Hilft das nicht:</strong> bis zu f&uuml;nf Oberbauchkompressionen — von '
    'hinten umfassen, Faust zwischen Nabel und Brustbein, kr&auml;ftig nach hinten oben '
    'ziehen. Dann im Wechsel weiter, bis der Fremdk&ouml;rper heraus ist oder der '
    'Rettungsdienst da ist.</li>'
    '<li><strong>Bei mitfeiernden Babys unter einem Jahr:</strong> keine '
    'Oberbauchkompression. F&uuml;nf R&uuml;ckenschl&auml;ge, dann f&uuml;nf Druckst&ouml;&szlig;e '
    'auf die Mitte des Brustkorbs, im Wechsel.</li>'
    '<li><strong>Wird das Kind bewusstlos:</strong> 112, Atemwege frei machen und mit der '
    'Wiederbelebung beginnen.</li>'
    '<li><strong>Auch wenn alles gut ausgeht:</strong> danach zum Arzt — Reste im Atemweg '
    'sieht man von au&szlig;en nicht.</li>'
    '</ul>'
    '<p>Nach den Empfehlungen des Deutschen Roten Kreuzes und des German Resuscitation '
    'Council (Stand 2026). Ersetzt keinen Erste-Hilfe-Kurs.</p>'
    '</div>')

# Der Kasten enthaelt selbst kein <div> — deshalb bis zum ERSTEN </div>, nicht
# gierig bis zum letzten. Der erste Entwurf nahm ein fremdes </div> mit und
# zerlegte damit den Container vor dem Footer; gefangen hat es der
# Idempotenz-Lauf im selben Atemzug (45 Seiten geaendert statt 0).
NOTFALL_WEG = re.compile(r'<div class="notfall-kasten"[^>]*>(?:(?!</div>).)*</div>', re.S)


def notfall_setzen(text, rel):
    """Ein Notfall-Kasten je Seite, direkt vor dem Footer.

    Befund aus Gate B (17.08.): Der Bestand warnt 110-mal vor Ersticken und 53-mal vor
    Verschlucken — und sagt kein einziges Mal, was dann zu tun ist. "112" stand
    ausschliesslich in der Knopfzellen-Kette. Fuer Augenspritzer existierte eine
    mustergueltige Anleitung, fuer das haeufigste Risiko nichts. Das ist die
    auffaelligste Asymmetrie des Werks gewesen: maximale Sorgfalt beim seltenen
    Ereignis, Schweigen beim haeufigen.

    Der Kasten steht EINMAL je Seite statt in jeder Zeile — ein Erste-Hilfe-Protokoll
    an einer Einkaufszeile liest niemand im Drogeriemarkt.

    Fail-loud: Ohne Footer-Anker wird nicht stillschweigend nichts eingefuegt.
    """
    text = NOTFALL_WEG.sub('', text)
    m = re.search(r'<footer', text)
    if not m:
        raise SystemExit('FATAL: %s hat keinen <footer>-Anker fuer den Notfall-Kasten' % rel)
    return text[:m.start()] + NOTFALL_HTML + text[m.start():]


# ============================================================================
# SPIELKARTEN-KANAL (18.08.2026)
# ----------------------------------------------------------------------------
# Befund O: Von 146 Spielregel-Verboten, die den Leser nicht erreichen, nennen 105
# ueberhaupt keine Ware ("Sichtaufsicht", "Platz freiraeumen", "immer nur ein Kind").
# Die gehoeren an keinen Einkaufsposten — sie gehoeren an das Spiel. Dieser zweite
# Kanal druckt deshalb games[].safetyRule an die Spielkarte der freien Seite.
#
# Die Bruecke ist explizit, nicht geraten: spielAnker in data/freie-seiten-regeln.json
# nennt je Seite den Kartentitel und den Spielnamen. Grund ist derselbe wie beim
# Einkaufskanal — beide Kataloge sind getrennt gewachsen (K6), und eine per Wortabgleich
# geratene Zuordnung wuerde eine Sicherheitsregel unter das FALSCHE Spiel setzen.
# Das ist schlimmer als gar keine Regel.
# ============================================================================

BS = chr(92)  # kein Backslash im Quelltext dieser Datei (Lektion L19/L23)

CSS_SPIEL = ('.spiel-safe{display:block;margin-top:10px;padding:9px 11px;'
             'border-left:3px solid #C62828;background:#fff5f4;font-size:13px;'
             'line-height:1.55;color:#333}'
             '.spiel-safe b{color:#C62828}')

SPIEL_WEG = re.compile('<p class="spiel-safe">(?:(?!</p>).)*</p>', re.S)
KARTE_AUF = re.compile('<div class="game-detail"[^>]*>')
KARTE_TITEL = re.compile('<h[2-5][^>]*>(.*?)</h[2-5]>', re.S)
DIV_KANTE = re.compile('<div' + BS + 'b[^>]*>|</div>', re.I)
NUMMER_VORN = re.compile('^' + BS + 's*' + BS + 'd+[.)]' + BS + 's*')
MEHRFACH_LEER = re.compile(BS + 's+')


def karten_ende(text, start):
    """Ende des <div>-Blocks, der bei `start` beginnt — per Klammerzaehlung.

    Kein gieriges Muster: Der erste Entwurf des Notfall-Kastens nahm mit einem gierigen
    </div> einen fremden Container mit und zerlegte den Block vor dem Footer (45 Seiten
    geaendert statt 0). Hier ist die Verschachtelung echt — Karten enthalten <div> —,
    deshalb wird gezaehlt statt geraten. Unbalanciert heisst: Karte uebersprungen, nicht
    stillschweigend halb behandelt.
    """
    tiefe = 0
    for m in DIV_KANTE.finditer(text, start):
        tiefe += 1 if m.group(0)[1] != '/' else -1
        if tiefe == 0:
            return m.start()
    return -1


def karten_der_seite(text):
    """[(titel, einfuege_position)] je Spielkarte, in Dokumentreihenfolge."""
    raus = []
    for m in KARTE_AUF.finditer(text):
        ende = karten_ende(text, m.start())
        if ende < 0:
            continue
        u = KARTE_TITEL.search(text, m.end(), ende)
        if not u:
            continue
        titel = html_mod.unescape(MEHRFACH_LEER.sub(' ', TAGS.sub(' ', u.group(1)))).strip()
        titel = NUMMER_VORN.sub('', titel).strip()
        if titel:
            raus.append((titel, ende))
    return raus


_SPIELREGELN = None


def lade_spielregeln():
    """{(motto, gruppe): {norm(spielname): (name, safetyRule)}} aus data/motto."""
    global _SPIELREGELN
    if _SPIELREGELN is not None:
        return _SPIELREGELN
    _SPIELREGELN = {}
    for fp in sorted(glob.glob(os.path.join(MOTTO_DIR, '*.json'))):
        name = os.path.basename(fp)[:-5]
        motto, _, grp = name.rpartition('-')
        # Der Dateiname traegt bereits die Gruppenform (dino-klein.json), waehrend
        # ALTER von "3-5" auf "klein" abbildet. Erster Entwurf schlug hier ALTER
        # nach und uebersprang damit lautlos JEDE Datei — 0 gedruckte Spielregeln
        # ohne eine einzige Fehlermeldung (Lektion L22: eine stille Null ist kein
        # Ergebnis, sondern ein unbewiesener Zustand).
        if grp not in set(ALTER.values()):
            continue
        d = json.load(io.open(fp, encoding='utf-8'))
        eintrag = _SPIELREGELN.setdefault((motto, grp), {})
        for v in (d.get('variants') or []):
            for g in (v.get('games') or []):
                regel = (g.get('safetyRule') or '').strip()
                if g.get('name') and regel:
                    eintrag[norm(g['name'])] = (g['name'], regel)
    return _SPIELREGELN


def spiel_regeln_setzen(text, rel, motto, gruppe, anker):
    """Druckt je zugeordneter Spielkarte die safetyRule ihres Spiels.

    Idempotent (alte spiel-safe-Absaetze raus, aus den Daten neu rein) und fail-loud:
    Ein spielAnker, dessen Karte auf der Seite fehlt, bricht ab — eine Bruecke, die ins
    Leere zeigt, ist ein Defekt und kein Rauschen. Ein Spiel ohne safetyRule ist dagegen
    kein Fehler: dann gibt es schlicht nichts zu drucken.
    """
    text = SPIEL_WEG.sub('', text)
    zuordnung = (anker.get('spielAnker') or {}).get(rel) or {}
    if not zuordnung:
        return text, 0, []
    regeln = lade_spielregeln().get((motto, gruppe), {})
    # Ein Titel kann mehrfach vorkommen: dieselbe Spielkarte steht auf manchen
    # Seiten in zwei Varianten-Abschnitten (dino-3-5 fuehrt "Dino-Eier suchen"
    # zweimal). Die Regel gehoert an JEDE dieser Stellen, nicht an die erste.
    nach_titel = {}
    for titel, pos in karten_der_seite(text):
        nach_titel.setdefault(norm(titel), []).append(pos)
    ohne_regel = []
    einfuegen = []
    for karten_titel, spiel_name in sorted(zuordnung.items()):
        k = norm(karten_titel)
        if k not in nach_titel:
            raise SystemExit('FATAL: %s — spielAnker nennt die Karte "%s", '
                             'die Seite hat sie nicht' % (rel, karten_titel))
        treffer = regeln.get(norm(spiel_name))
        if treffer is None:
            ohne_regel.append((karten_titel, spiel_name))
            continue
        for pos in nach_titel[k]:
            einfuegen.append((pos, treffer[1]))
    gedruckt = 0
    for pos, regel in sorted(einfuegen, reverse=True):
        frag = ('<p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> %s</p>'
                % esc(planer_kanal(regel)))
        text = text[:pos] + frag + text[pos:]
        gedruckt += 1
    # CSS nur, wo auch gedruckt wird: eine Seite ohne Spielregel soll keine
    # tote Formatvorlage tragen (Helfer V5 R4 — Gedrucktes leitet sich ab).
    if gedruckt and CSS_SPIEL not in text:
        m = re.search(r'</style>', text)
        if m:
            text = text[:m.start()] + CSS_SPIEL + text[m.start():]
    return text, gedruckt, ohne_regel


def regeln_setzen(text, rel, motto, gruppe, regeln, anker):
    """Kern der Maschine: HTML rein, HTML mit Regeln raus — ohne Datei-I/O.

    Getrennt, damit Stufe 36 dieselbe Pipeline auf das frische Generator-Ergebnis
    anwenden kann. Sonst waere die generierte Seite nach jedem Regel-Lauf "abweichend",
    und das Gate haette sich selbst wegdiskutiert.
    """
    quelle = list(regeln.get((motto, gruppe), []))
    eigene = anker['eigeneRegeln'].get(rel) or []
    # KEIN Frueh-Ausstieg bei leerer Quelle (Review 14.08., MAJOR 7/8): eine Seite ohne
    # Datenregeln braucht trotzdem Span-Entfernung und Klassenregeln. Vorher stand das
    # Gate vor einem Widerspruch — es verlangte eine Regel, die Maschine weigerte sich,
    # eine zu schreiben, und meldete dabei "0 offen".

    # --- 1. Alte Regeln raus (Idempotenz + Update in einem Schritt) --------------
    text = SPAN_WEG.sub('', text)
    text = re.sub(r'<div class="shop-safe">(?:(?!</div>).)*</div>', '', text, flags=re.S)

    # --- 2. Posten der Seite einsammeln ------------------------------------------
    # (position, label_html, einfuege_position, herkunft, block_index)
    # block_index = 0/1/2 fuer Minimal/Standard/Wow in Dokumentreihenfolge, None fuer Deko.
    posten = []
    for bi, h in enumerate(HEAD.finditer(text)):
        c = finde_container(text, h.end())
        if not c:
            continue
        start, ende, typ = c
        block = text[start:ende]
        for (ps, pe, lab, ein) in posten_im_block(block, typ):
            posten.append([start + ps, lab, start + ein, 'einkauf', bi])
    for (ps, pe, lab, ein) in deko_posten(text):
        posten.append([ps, lab, ein, 'deko', None])

    if not posten:
        return text, {'seite': rel, 'posten': 0, 'regeln': len(quelle) + len(eigene),
                      'gedruckt': 0, 'klasse': 0,
                      'offen': [(l, 'Seite hat keinen Verkaufs-Container')
                                for _, l, _ in quelle]}

    normiert = [(norm(p[1]), p) for p in posten]

    # --- 3. Regeln zuordnen -------------------------------------------------------
    seiten_anker = anker['anker'].get(rel) or {}
    kein = anker['keinPosten'].get(rel) or {}
    # einfuege_position -> LISTE von Regeltexten. Ein Buendel-Posten kann mehrere
    # Risiken tragen (Review MAJOR 2: Birken + 450-Grad-Brandstift + Hanf-Schnur in
    # EINEM Posten — vorher gewann eine Regel, der Brandstift blieb unerwaehnt).
    zuweisung = {}
    offen = []

    def zuweisen(pos, note):
        liste = zuweisung.setdefault(pos, [])
        if note not in liste:
            liste.append(note)

    def treffer_fuer(label):
        """Alle Posten der Seite, die diese Ware fuehren — ohne Block-Praeferenz.

        NUR normalisierte Gleichheit, kein Teilstring. Grund (13.08., am eigenen
        Ergebnis gefunden): Teilstring-Matching haengte die Ballon-Regel unter
        "Atlantis-Girlande", weil deren Label im Bundle "Girlande + Luftballons"
        steckt. Eine Sicherheitsregel am falschen Posten ist schlimmer als eine
        fehlende — die fehlende faellt wenigstens im Gate auf. Alles, was nicht
        wortgleich ist, braucht einen belegten Eintrag in data/freie-seiten-regeln.json.
        """
        nl = norm(label)
        if not nl:
            return [], False
        exakt = [p for n, p in normiert if n == nl]
        if exakt:
            return exakt, False
        wenn_anker = seiten_anker.get(label)
        if wenn_anker:
            # Ein LISTEN-Anker heisst: die Regel gehoert bewusst an MEHRERE Posten
            # (feen-9-12: Brandstift-Regel an Einzelposten UND Wow-Buendel). Ein
            # STRING-Anker benennt EINE Ware — trifft er mehrere Block-Instanzen
            # desselben Labels, entscheidet weiter die Block-Praeferenz. Ohne die
            # Unterscheidung stapelte "Mitgebsel (6 Kinder)"/"(8 Kinder)" beide
            # Muenz-Varianten auf beiden Posten: norm() streicht die Klammer, die
            # Ziele wurden ununterscheidbar (14.08., am eigenen Ergebnis gefunden).
            explizit = isinstance(wenn_anker, list)
            ziele = wenn_anker if explizit else [wenn_anker]
            na = set(norm(z) for z in ziele)
            return [p for n, p in normiert if n in na], explizit
        return [], False

    def vorschlaege(label):
        """Nur fuer den Bericht: welche Posten KOENNTEN gemeint sein (Teilstring)."""
        nl = norm(label)
        return [re.sub(r'\s+', ' ', TAGS.sub('', p[1])).strip()[:60]
                for n, p in normiert
                if len(n) >= 8 and len(nl) >= 8 and (nl in n or n in nl)][:3]

    # 3a. Variantengenau: die Regel der Variante i gehoert in Block i. Die drei Bloecke
    #     tragen unterschiedliche Texte fuer dieselbe Ware — detektiv-klein hat drei
    #     Muenz-Regeln, je nach Menge und Aufsicht anders formuliert.
    ware_regel = {}   # normalisiertes Warenlabel -> [(variantIndex, note)]
    for vi, label, note in quelle:
        if label in kein:
            continue
        tr, explizit = treffer_fuer(label)
        if not tr:
            v = vorschlaege(label)
            offen.append((label, 'kein wortgleicher Posten' +
                          ((' — Kandidat: ' + v[0]) if v else '')))
            continue
        ware_regel.setdefault(norm(label), []).append((vi, note))
        if explizit:
            ziel = tr
        else:
            eigener_block = [p for p in tr if p[4] == vi]
            ziel = eigener_block or tr
        for p in ziel:
            zuweisen(p[2], note)

    # 3b. Nachzug: verkauft ein Block dieselbe Ware ohne eigene Variantenregel, bekommt er
    #     die Regel der naechstliegenden Variante. Ein Posten ohne Regel waere genau der
    #     Defekt, den diese Maschine schliesst.
    for n, p in normiert:
        if p[2] in zuweisung or not n:
            continue
        passend = ware_regel.get(n)
        if passend:
            block = p[4] if p[4] is not None else 0
            zuweisen(p[2], min(passend, key=lambda e: abs(e[0] - block))[1])

    # 3c. Klassenregel: Die freie Seite fuehrt Waren, fuer die data/motto keinen Posten hat
    #     (eigenes Sortiment, Ticket K6). Wer Ballons verkauft, druckt die Ballon-Regel —
    #     unabhaengig davon, ob der Katalog denselben Artikel kennt.
    #
    #     ABER: ein explizites `safetyChecked` im Katalog schlaegt das Raten der Klasse
    #     (Pflichtfeld, 17.08.). Die Abnahme (MAJOR 1) fand die Klasse dort, wo die Daten
    #     schwiegen — und die generische Knoten-Regel verbot ausgerechnet das Armband,
    #     das die Kernaktivitaet und das Mitgebsel der Seite ist. Wo ein Mensch "gepruept
    #     harmlos" entschieden hat, druckt die Maschine keine geratene Regel darueber.
    geprueft_harmlos = set()
    for vi2, lab2, checked in lade_harmlos().get((motto, gruppe), []):
        geprueft_harmlos.add(norm(lab2))
    aus_klasse = 0
    for n, p in normiert:
        if p[2] in zuweisung:
            continue
        if n in geprueft_harmlos:
            continue
        klar = re.sub(r'\s+', ' ', html_mod.unescape(TAGS.sub(' ', p[1]))).strip()
        for ware, e in (anker.get('warenRegeln') or {}).items():
            # NICHT `text` nennen: das ist das Dokument. Der erste Entwurf tat es und
            # schrieb die Regel als ganze Seite — 46 Dateien auf 1,5 kB gekuerzt. Der
            # Idempotenz-Lauf hat es im selben Atemzug gefangen (198 offen statt 0).
            regeltext = (e.get('alter') or {}).get(gruppe)
            if not regeltext or not re.search(e['muster'], klar, re.I):
                continue
            if e.get('nicht') and re.search(e['nicht'], klar, re.I):
                continue
            # "Backmischung ... (ohne Wunderkerze)" verkauft die Ware ausdruecklich NICHT.
            # Klammer ist Pflicht: ohne sie zerfaellt 'ohne...led-?kerze|teelicht|
            # lichterkette' in drei Alternativen und 'Lichterkette' trifft sich selbst.
            if re.search(r'ohne\s+[\w-]{0,20}(?:' + e['muster'] + ')', klar, re.I):
                continue
            zuweisen(p[2], regeltext)
            aus_klasse += 1
            break

    for e in eigene:
        tr, _ = treffer_fuer(e.get('posten') or '')
        if not tr:
            offen.append((e.get('posten') or '?', 'eigene Regel ohne Posten'))
            continue
        for p in tr:
            if p[2] not in zuweisung and (e.get('regel') or ''):
                zuweisen(p[2], e['regel'])

    # --- 4. Einsetzen (von hinten, damit Positionen gueltig bleiben) --------------
    if '--zeigen' in sys.argv:
        for pos in sorted(zuweisung.keys()):
            p = next(q for q in posten if q[2] == pos)
            for note in zuweisung[pos]:
                print('      [%s%s] %-52s => %s'
                      % (p[3][:2], ('' if p[4] is None else p[4]),
                         re.sub(r'\s+', ' ', TAGS.sub('', p[1]))[:52],
                         re.sub(r'\s+', ' ', note)[:70]))

    gedruckt = 0
    for pos in sorted(zuweisung.keys(), reverse=True):
        notes = [n for n in zuweisung[pos] if n]
        if not notes:
            continue
        herkunft = next((p[3] for p in posten if p[2] == pos), 'einkauf')
        tag = 'div' if herkunft == 'deko' else 'span'
        frag = ''.join('<%s class="shop-safe">%s</%s>' % (tag, esc(planer_kanal(n)), tag)
                       for n in notes)
        text = text[:pos] + frag + text[pos:]
        gedruckt += len(notes)

    text, _ = css_setzen(text)
    text, spiel_gedruckt, spiel_ohne = spiel_regeln_setzen(
        text, rel, motto, gruppe, anker)
    text = notfall_setzen(text, rel)
    return text, {'seite': rel, 'posten': len(posten), 'regeln': len(quelle) + len(eigene),
                  'gedruckt': gedruckt, 'klasse': aus_klasse, 'offen': offen,
            'spiel_gedruckt': spiel_gedruckt, 'spiel_ohne': spiel_ohne}


def verarbeite(pfad, regeln, anker, schreiben):
    rel = 'kindergeburtstag/' + os.path.basename(pfad)
    name = os.path.basename(pfad)[:-len('-jahre.html')]
    m = re.match(r'^(.+?)-(3-5|6-8|9-12)$', name)
    if not m:
        return None
    original = io.open(pfad, encoding='utf-8').read()
    neu, bericht = regeln_setzen(original, rel, m.group(1), ALTER[m.group(2)], regeln, anker)
    if bericht is None:
        return None
    bericht['geaendert'] = neu != original
    if bericht['geaendert'] and schreiben:
        io.open(pfad, 'w', encoding='utf-8', newline='').write(neu)
    return bericht


def main():
    schreiben = '--check' not in sys.argv
    nur = None
    if '--seite' in sys.argv:
        nur = os.path.basename(sys.argv[sys.argv.index('--seite') + 1])

    regeln = lade_regeln()
    anker = lade_anker()

    dateien = sorted(glob.glob(os.path.join(SEITEN_DIR, '*-jahre.html')))
    if nur:
        dateien = [f for f in dateien if os.path.basename(f) == nur]

    berichte = [b for b in (verarbeite(f, regeln, anker, schreiben) for f in dateien) if b]

    fehler = 0
    geaendert = 0
    summe_gedruckt = 0
    summe_spiel = 0
    for b in berichte:
        if b['geaendert']:
            geaendert += 1
        summe_gedruckt += b['gedruckt']
        summe_spiel += b.get('spiel_gedruckt', 0)
        flag = '*' if b['geaendert'] else ' '
        print('  %s %-46s Posten %3d  Regeln %2d  gedruckt %2d (davon Klasse %2d)  Spiel %2d%s'
              % (flag, b['seite'].replace('kindergeburtstag/', ''), b['posten'],
                 b['regeln'], b['gedruckt'], b.get('klasse', 0), b.get('spiel_gedruckt', 0),
                 ('  OFFEN %d' % len(b['offen'])) if b['offen'] else ''))
        for label, grund in b['offen']:
            print('      OFFEN  %-52s %s' % (label[:52], grund))
            fehler += 1

    print('  ---')
    print('  %d Seiten, %d Regeln gedruckt, %d Spielregeln, %d Seiten geaendert, %d offen'
          % (len(berichte), summe_gedruckt, summe_spiel, geaendert, fehler))

    if '--check' in sys.argv and geaendert:
        print('  FAIL: Maschine haette %d Seiten geaendert — die Seiten sind nicht abgeleitet.'
              % geaendert)
        sys.exit(1)
    if fehler:
        print('  FAIL: %d Regeln ohne Anker. Jede braucht einen Eintrag in '
              'data/freie-seiten-regeln.json (anker oder keinPosten mit Grund).' % fehler)
        sys.exit(1)
    sys.exit(0)


if __name__ == '__main__':
    main()
