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

# Gate-Scope: hier ist die Klasse geschlossen, ein Rueckfall ist ein Fehler.
# Ausserhalb bleibt die Zahl die ehrliche Groesse der offenen Arbeit.
FAIL_MOTTOS = {'baustelle', 'ritter', 'pferde', 'feuerwehr', 'einhorn', 'feen',
               'meerjungfrau', 'prinzessin', 'superheld'}

REGEL_IM_POSTEN = re.compile(r'<(?:span|div) class="shop-safe">')

# "Backmischung + Zuckerguss + Schoko-Sandwich-Kekse (ohne Wunderkerze)" verkauft die
# riskante Ware ausdruecklich NICHT — feuerwehr-3-5 begruendet den Verzicht sogar im Text.
# Die Klammer um das Vokabular ist Pflicht, sonst zerfaellt das Muster in Alternativen und
# der Schutz trifft jeden Ballon (derselbe Fehler kostete heute schon einen Durchgang).
OHNE = re.compile(r'ohne\s+\w{0,12}(?:' + s39.RX_RISIKO.pattern + ')', re.I)


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
        for lab, hat_regel in posten_der_seite(text):
            klar = re.sub(r'<[^>]+>', ' ', lab)
            klar = re.sub(r'\s+', ' ', klar).strip()
            geprueft += 1
            if hat_regel or not s39.RX_RISIKO.search(klar) or OHNE.search(klar):
                continue
            print('    %s kindergeburtstag/%s: "%s" ist riskantes Material ohne gedruckte Regel'
                  % ('FAIL' if hart else 'WARN', os.path.basename(seite), klar[:70]))
            fail += 1 if hart else 0
            warn += 0 if hart else 1

    print('    Stufe 42: %d FAIL (Gate-Scope: %s), %d WARN (Arbeitsliste kommender Gates), '
          '%d Einkaufsposten geprueft'
          % (fail, ','.join(sorted(FAIL_MOTTOS)), warn, geprueft))
    sys.exit(1 if fail else 0)


if __name__ == '__main__':
    main()
