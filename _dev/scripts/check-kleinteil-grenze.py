# -*- coding: utf-8 -*-
"""Stufe 46: Keine Kleinteil-Untergrenze im Fliesstext, die unter der Pruefgroesse liegt.

Befund 17.08.: Neben der maschinell gedruckten Regel ("nichts, was durch eine
Klopapierrolle passt") tragen die freien Seiten eine zweite, handgeschriebene
Sicherheitsschicht im Fliesstext — 133 Aussagen auf 30 von 45 Seiten, die kein
Gate kennt. Darin steht dieselbe Gefahr mit fuenf verschiedenen Zahlen:

    prinzessin-3-5   "ab 2 cm Durchmesser fuer Sicherheit"   (Plastik-Edelsteine)
    dschungel-3-5    "Mini-Tierfiguren mindestens 3 cm"
    piraten-3-5      "Mini-Dinos/Tiere mindestens 3 cm"
    feen-3-5         "mindestens 3 cm" UND "4 cm" UND "5 cm"  (eine Seite, drei Zahlen)
    baustelle-3-5    "mindestens 15 cm Kantenlaenge"          (Bauklotz, unkritisch)

Primaerverifiziert (17.08., 16 CFR 1501.4 / CPSC): Der Kleinteile-Pruefzylinder hat
**31,7 mm Innendurchmesser** bei 25,4–57,1 mm Tiefe und bildet den Rachen eines
Kindes unter drei Jahren ab. Ein Gegenstand mit "mindestens 3 cm" liegt DARUNTER —
die Zahl erlaubt genau das, wovor sie warnen soll. "ab 2 cm" erst recht.

Gegatet wird deshalb die belegbar unsichere Menge: eine Untergrenze < 4 cm im
Erstickungs-Kontext. Zahlen ab 4 cm sind nicht falsch, aber schwaecher als der
Zylindertest (eine einzelne Laengenangabe kann "passt in keiner Lage hinein" nicht
ausdruecken) — die stehen als Arbeitsliste in QUELLDATEN-BEFUNDE G, nicht als WARN.

Gegenprobe: Zahl auf 3 cm senken -> FAIL, zurueck -> gruen.
"""
import io
import os
import re
import sys
import glob

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
GRENZE_CM = 4.0

MASS = re.compile(r"(mindestens|mind\.|ab|groesser als|größer als|über)\s*"
                  r"(\d{1,2})(?:[,.](\d))?\s*(?:cm|Zentimeter)", re.I)

# Zweite Form derselben Aussage: nicht "mindestens 4 cm", sondern "< 3 cm vermeiden".
# Sie sagt dasselbe und war 18.08. der Weg, auf dem eine zu kleine Zahl durchs Gate kam
# — auf dino-3-5 stand gedruckt "Mini-Dinos &lt; 3 cm vermeiden", waehrend dieselbe
# Seite dreimal die Klopapierrollen-Probe fuehrt. Wer eine Obergrenze fuer das
# VERBOTENE nennt, setzt damit eine Untergrenze fuer das Erlaubte.
MASS_VERMEIDEN = re.compile(r"(?:&lt;|<|kleiner als|unter|weniger als)\s*"
                            r"(\d{1,2})(?:[,.](\d))?\s*(?:cm|Zentimeter)", re.I)
# Erstickungs-Kontext: die Zahl muss als Schutzgrenze gemeint sein, nicht als Bastelmass
KONTEXT = re.compile(r"(Verschluck|Erstick|Kleinteil|Klopapierrolle|in den Mund|"
                     r"Mund-Reichweite|Sicherheit|Schluck)", re.I)
UMKREIS = 260


def fliesstext(pfad):
    """Seitentext OHNE die maschinell gedruckten Regeln — die sind Stufe 39/43."""
    roh = io.open(pfad, encoding="utf-8", errors="replace").read()
    ohne = re.sub(r'<(span|div) class="shop-safe">(?:(?!</\1>).)*</\1>', " ", roh, flags=re.S)
    ohne = re.sub(r"<(script|style)\b.*?</\1>", " ", ohne, flags=re.S | re.I)
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", ohne))


def katalogtext(pfad):
    """Rohtext eines Datensatzes — Regeln UND Tipps, alles was Leser erreichen kann."""
    return re.sub(r"\s+", " ", io.open(pfad, encoding="utf-8", errors="replace").read())


def main():
    fails = []
    seiten = sorted(glob.glob(os.path.join(REPO, "kindergeburtstag", "*-jahre.html")))
    # Die Kataloge MUESSEN mit: Am 18.08. stand "Mini-Dinos/-Tiere mindestens 3 cm" in
    # data/motto/piraten-klein.json und im Bundle — die Stufe sah nur die gerenderten
    # Seiten und meldete deshalb 0 FAIL, waehrend der Satz im Paket weiterlebte. Ein
    # Gate, das nur das Sichtbare prueft, faengt die Quelle nie (Re-Check 18.08.).
    kataloge = (sorted(glob.glob(os.path.join(REPO, "data", "motto", "*.json")))
                + sorted(glob.glob(os.path.join(REPO, "_src", "elite-motto-data", "*.json"))))
    geprueft = 0
    for pfad in seiten + kataloge:
        text = fliesstext(pfad) if pfad.endswith(".html") else katalogtext(pfad)
        treffer = [(m, 2, 3) for m in MASS.finditer(text)]
        treffer += [(m, 1, 2) for m in MASS_VERMEIDEN.finditer(text)]
        for m, g_ganz, g_dezi in sorted(treffer, key=lambda x: x[0].start()):
            umfeld = text[max(0, m.start() - UMKREIS):m.end() + UMKREIS]
            if not KONTEXT.search(umfeld):
                continue
            geprueft += 1
            wert = float("%s.%s" % (m.group(g_ganz), m.group(g_dezi) or "0"))
            if wert < GRENZE_CM:
                stelle = re.sub(r"\s+", " ", text[max(0, m.start() - 70):m.end() + 50]).strip()
                fails.append((os.path.basename(pfad), m.group(0), wert, stelle))
    for datei, zitat, wert, stelle in fails:
        print("    FAIL %s: \"%s\" (%.1f cm) liegt unter der Pruefgroesse 3,17 cm + "
              "Klopapierrollen-Mass — …%s…" % (datei, zitat, wert, stelle[:120]))
    print("Stufe 46: %d FAIL — %d Groessenangaben im Erstickungs-Kontext auf %d Seiten "
          "und %d Datensaetzen geprueft"
          % (len(fails), geprueft, len(seiten), len(kataloge)))
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
