# -*- coding: utf-8 -*-
"""Stufe 42 — Was die freie Seite verkauft, muss sie auch regeln.

Erste Fassung (12.08. abends) verglich Seite gegen `data/motto` und zaehlte den
Substring `shop-safe` — sie zaehlte damit die CSS-Regel im <style> als "gedruckt"
mit und meldete vier Seiten, die gar keine Einkaufsliste haben. Vor allem aber
mass sie die falsche Groesse: ob die Seite die Regeln des KATALOGS druckt. Was
zaehlt, ist die Seite selbst — sie fuehrt ein eigenes Sortiment (Ticket K6).

Diese Fassung misst deshalb direkt am Produkt: jeder Einkaufsposten der Seite,
der nach riskantem Material klingt, muss eine gedruckte Regel tragen. Vokabular
und Posten-Erkennung kommen aus je einer Quelle (Stufe 39 bzw. der Renderer), damit
es nicht drei Wahrheiten darueber gibt, was riskant ist und was ein Posten ist.
"""
import glob
import importlib.util
import io
import os
import re
import sys

try:
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except Exception:
    pass

HIER = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HIER))


def lade(name, datei):
    spec = importlib.util.spec_from_file_location(name, os.path.join(HIER, datei))
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


rd = lade('regeln_drucken', 'regeln-drucken.py')          # Posten-Erkennung
s39 = lade('check_sicherheit_einkauf', 'check-sicherheit-einkauf.py')   # Risiko-Vokabular

# Gate-Scope: ALLE 15 Mottos. Bis 15.08. standen detektiv/dino/dschungel/piraten/
# safari/weltraum nur auf WARN — ausgerechnet die Essig-, Muenz- und Gips-Mottos.
# Seit die Klasse auf allen 45 Seiten geschlossen ist (0 riskante Posten ohne Regel
# bei 1488 gepreuften), kostet ein weicher Scope nur noch Schutz: der Re-Check
# (M4) bewies, dass eine einzige falsche keinPosten-Zeile die Essig-Erste-Hilfe
# von dino-9-12 entfernte, ohne dass irgendein Gate rot wurde.
FAIL_MOTTOS = {'baustelle', 'ritter', 'pferde', 'feuerwehr', 'einhorn', 'feen',
               'meerjungfrau', 'prinzessin', 'superheld', 'detektiv', 'dino',
               'dschungel', 'piraten', 'safari', 'weltraum'}

REGEL_IM_POSTEN = re.compile(r'<(?:span|div) class="shop-safe">')

# "Backmischung + Zuckerguss + Schoko-Sandwich-Kekse (ohne Wunderkerze)" verkauft die
# riskante Ware ausdruecklich NICHT — feuerwehr-3-5 begruendet den Verzicht sogar im Text.
# Die Klammer um das Vokabular ist Pflicht, sonst zerfaellt das Muster in Alternativen und
# der Schutz trifft jeden Ballon (derselbe Fehler kostete am 13.08. einen Durchgang).
#
# Re-Check m7 (15.08.): der Guard darf nur die verneinte Ware freistellen, nicht das ganze
# Label — "Deko-Set ohne Ballons + Gipspulver" reiste sonst komplett regellos durch. Deshalb
# wird der ohne-Teil aus dem Label GESCHNITTEN und der Rest normal geprueft. [\w-]{0,20}
# statt \w{0,12}: "ohne Kuchen-Wunderkerze" brach am Bindestrich.
OHNE = re.compile(r'ohne\s+[\w-]{0,20}(?:' + s39.RX_RISIKO.pattern + ')[\w-]*', re.I)


def ohne_bereinigt(klar):
    """Label ohne seine verneinten Waren — nur die bleiben pruefpflichtig."""
    return OHNE.sub(' ', klar)


# Karten, die der Renderer (noch) nicht bedient, aber riskante Ware zeigen: die
# Snack-Tabelle setzt Wunderkerzen auf den Kuchen, die Mitgebsel-Karte gibt
# Schoko-Muenzen und Perlen-Armbaender mit nach Hause. Sie sind kein Einkauf mit
# Preis, aber eine Handlungsanweisung — und damit dieselbe Frage.
# Bewusst nur WARN: erst die ehrliche Groesse, dann die Entscheidung, ob eine
# Regel je Karte die Seite noch lesbar laesst (sonst ertrinkt die wichtigste).
WEITERE_KARTEN = re.compile(
    r'<div class="(?P<art>snack-item|mitgebsel-item)">(?P<inhalt>(?:(?!</div>\s*</div>).){0,400})</div>\s*</div>',
    re.S)


def posten_der_seite(text):
    """(Posten-HTML, traegt_regel) — dieselbe Erkennung, die auch der Renderer nutzt."""
    out = []
    for h in rd.HEAD.finditer(text):
        c = rd.finde_container(text, h.end())
        if not c:
            continue
        start, ende, typ = c
        block = text[start:ende]
        for (ps, pe, lab, ein) in rd.posten_im_block(block, typ):
            ganz = block[ps:pe]
            out.append((lab, bool(REGEL_IM_POSTEN.search(ganz))))
    for (ps, pe, lab, ein) in rd.deko_posten(text):
        out.append((lab, bool(REGEL_IM_POSTEN.search(text[ps:pe]))))
    return out


def verwaiste_regeln(text):
    """Gedruckte Regeln, die in KEINEM erkannten Posten stehen.

    Am 13.08. lief die Kartengrenze der letzten Deko-Karte bis zum Dateiende: drei
    Ballon-Regeln landeten hinter dem Snack-Raster und neben dem Planer-Knopf im
    Footer. Das Gate meldete trotzdem 0 — es fragte nur, OB die Karte eine Regel
    enthaelt, nie, ob die Regel bei ihrem Posten steht. Eine Regel im Dokument ist
    keine Regel am Posten.
    """
    bereiche = []
    for h in rd.HEAD.finditer(text):
        c = rd.finde_container(text, h.end())
        if not c:
            continue
        start, ende, typ = c
        for (ps, pe, lab, ein) in rd.posten_im_block(text[start:ende], typ):
            bereiche.append((start + ps, start + pe))
    for (ps, pe, lab, ein) in rd.deko_posten(text):
        bereiche.append((ps, pe))
    # Ein Posten kann seit 15.08. MEHRERE Regeln tragen (Buendel: Brandstift + Schnur).
    # Die Flex-Erkennung endet aber am ersten </span> — Folge-Regeln desselben Postens
    # laegen "ausserhalb" und wuerden faelschlich als verwaist gemeldet. Deshalb: jeden
    # Bereich ueber direkt anschliessende shop-safe-Spans hinaus verlaengern.
    erweitert = []
    for a, b in bereiche:
        m = re.match(r'(?:<span class="shop-safe">(?:(?!</span>).)*</span>)+',
                     text[b:b + 4000], re.S)
        erweitert.append((a, b + (m.end() if m else 0)))
    bereiche = erweitert
    verwaist = []
    for m in re.finditer(r'<(?:span|div) class="shop-safe">((?:(?!</(?:span|div)>).)*)', text, re.S):
        if not any(a <= m.start() < b for a, b in bereiche):
            verwaist.append(re.sub(r'\s+', ' ', m.group(1))[:60])
    return verwaist


def weitere_karten(text, schon_gesehen):
    """Riskante Ware in Snack-/Mitgebsel-Karten, die kein Einkaufsposten abdeckt."""
    out = []
    for m in WEITERE_KARTEN.finditer(text):
        klar = re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', m.group('inhalt'))).strip()
        if not klar or REGEL_IM_POSTEN.search(m.group(0)):
            continue
        if any(klar[:25] in g or (g and g[:25] in klar) for g in schon_gesehen):
            continue
        out.append((m.group('art'), klar))
    return out


def kein_posten_luegen(rel, posten_mit_status):
    """Re-Check M4: eine keinPosten-Zeile behauptet, die Seite verkaufe Ware X nicht —
    stimmt das nicht (mehr), verschwinden Regeln kommentarlos.

    FAIL nur, wenn die ausgelassene Ware in einem Posten OHNE jede Regel steht.
    Traegt der Posten eine (andere) Regel, war die Auslassung eine bewusste
    Substitution — prinzessin/superheld lassen die Latex-Regel aus, weil ihre
    Folienballons die Folien-Regel bekommen. Die erste Fassung meldete genau
    diese vier Absichten als Luegen.
    """
    treffer = []
    kein = (rd.lade_anker().get('keinPosten') or {}).get(rel) or {}
    for label in kein:
        # Richtung 1: "kein wortgleicher Posten" — aber es gibt einen. norm() streicht
        # Klammern, deshalb faengt das auch 'Vulkan-Material' gegen 'Vulkan-Material
        # (Essig, Natron, Farbe)' (Re-Check-Angriff 1: die Luege war unpruefbar, weil
        # das Label selbst kein Risikowort traegt — die Waren stecken in der Klammer).
        nk = rd.norm(label)
        for pl, hat_regel in posten_mit_status:
            if nk and rd.norm(pl) == nk:
                treffer.append((label, 'wortgleicher Posten existiert', pl))
                break
        # Richtung 2: die ausgelassene Ware steht in einem Posten OHNE jede Regel.
        for ware in set(m.group(0).lower() for m in s39.RX_RISIKO.finditer(label)):
            for pl, hat_regel in posten_mit_status:
                if not hat_regel and ware in ohne_bereinigt(pl).lower():
                    treffer.append((label, ware, pl))
                    break
    return treffer


def main():
    fail = warn = 0
    geprueft = 0
    for seite in sorted(glob.glob(os.path.join(ROOT, 'kindergeburtstag', '*-jahre.html'))):
        name = os.path.basename(seite)[:-len('-jahre.html')]
        m = re.match(r'^(.+?)-(3-5|6-8|9-12)$', name)
        if not m:
            continue
        motto = m.group(1)
        text = io.open(seite, encoding='utf-8', errors='replace').read()
        hart = motto in FAIL_MOTTOS
        gesehen = []
        mit_status = []
        for lab, hat_regel in posten_der_seite(text):
            # Regel-Spans stecken IM Label-HTML — ohne diesen Schnitt normiert der
            # Vulkan-Posten zu 'vulkan material den essig kippt ...' und kein
            # keinPosten-Abgleich trifft je (Re-Check-Angriff 1, zweiter Anlauf).
            ohne_span = re.sub(r'<(?:span|div) class="shop-safe">.*?</(?:span|div)>', ' ', lab, flags=re.S)
            klar = re.sub(r'<[^>]+>', ' ', ohne_span)
            klar = re.sub(r'\s+', ' ', klar).strip()
            geprueft += 1
            gesehen.append(klar)
            mit_status.append((klar, hat_regel))
            if hat_regel or not s39.RX_RISIKO.search(ohne_bereinigt(klar)):
                continue
            print('    %s kindergeburtstag/%s: "%s" ist riskantes Material ohne gedruckte Regel'
                  % ('FAIL' if hart else 'WARN', os.path.basename(seite), klar[:70]))
            fail += 1 if hart else 0
            warn += 0 if hart else 1

        rel = 'kindergeburtstag/' + os.path.basename(seite)
        for label, ware, pl in kein_posten_luegen(rel, mit_status):
            print('    FAIL %s: keinPosten("%s") behauptet Verzicht — aber "%s" steht im '
                  'Posten "%s"' % (rel, label[:44], ware, pl[:44]))
            fail += 1

        for regel in verwaiste_regeln(text):
            print('    FAIL kindergeburtstag/%s: Regel steht bei keinem Posten — "%s…"'
                  % (os.path.basename(seite), regel))
            fail += 1

        for art, klar in weitere_karten(text, gesehen):
            if not s39.RX_RISIKO.search(ohne_bereinigt(klar)):
                continue
            print('    WARN kindergeburtstag/%s [%s]: "%s" — riskante Ware ausserhalb der '
                  'Einkaufsliste, noch ohne Regel'
                  % (os.path.basename(seite), art, klar[:64]))
            warn += 1

    print('    Stufe 42: %d FAIL (Gate-Scope: %s), %d WARN (Arbeitsliste kommender Gates), '
          '%d Einkaufsposten geprueft'
          % (fail, ','.join(sorted(FAIL_MOTTOS)), warn, geprueft))
    sys.exit(1 if fail else 0)


if __name__ == '__main__':
    main()
