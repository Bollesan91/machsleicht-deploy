#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Stufe 63 — der Beispiel-Ablauf darf seiner eigenen Seite nicht widersprechen.

Anlass (01.09.2026): Vier unabhaengige Gutachten zu vier handgeschriebenen Ablauf-Kaesten,
vier Mal NO-GO (54 / 46 / 42 / 58). Kein einziger Befund war "schlecht geschrieben". Alle
waren Widersprueche zwischen dem neuen Kasten und dem, was zwei Bildschirme weiter oben auf
derselben Seite steht:

  * ZEITEN GEGEN GEDRUCKTE SPANNEN — detektiv druckt an jedem Spiel "⏱ 25–40 Min."; der Ablauf
    setzte das Labor auf 20 bei einer Spanne von 15–20 und behauptete im selben Absatz, alle
    fuenf staenden an der unteren Grenze. Das ist rechenbar und faellt hier auf.
  * SUMME GEGEN UEBERSCHRIFT — "(2,5 Stunden)" ist eine Zusage, keine Ueberschrift.
  * ALTERSGRUPPE VERSCHWIEGEN — alle vier waren aus den 6-8-Varianten geschrieben und taten so,
    als gaelten sie fuer 3-12. Die Seiten haben einen Altersfilter (ml_age_filter), der Karten
    ausblendet, den Kasten aber nicht: wer 3-5 waehlt, las oben Kissen-Floss und unten Kartons.
  * SICHERHEITSREGEL UNTERLAUFEN — prinzessin gab Glassteine und Klebeperlen aus, waehrend die
    Seite an sieben Stellen "nur Grossteile >=4 cm, KEIN Glas" fuer 3-5 setzt.
  * ERFUNDENE REQUISITEN — "Knappen-Schwur", "Burgpforte", "Thronsaal" standen nirgends auf ihrer
    Seite. Ein Elternteil, das um 0:05 an dieser Zeile steht, hat nichts in der Hand.

Die ersten vier sind entscheidbar und deshalb FAIL. Der fuenfte ist es nicht: ob ein
zusammengesetztes Wort ein REQUISIT ist (dann gehoert es auf die Einkaufsliste) oder nur ein
selbst vergebener BLOCKNAME (dann ist es harmlos), kann keine Regel wissen. Eine erste Fassung
dieser Stufe hat es trotzdem versucht und "Moment", "Abschied" und "Startzeit" gemeldet — eine
Regel, die auf alles anspringt, bringt jedem bei, sie zu ignorieren (LEKTIONEN L29). Deshalb ist
daraus eine kurze Leseliste als WARNUNG geworden.

Was diese Stufe nicht sehen kann — Dramaturgie, Begruendung der Reihenfolge, Ton, ob ein Kind
den Nachmittag versteht — bleibt Sache des unabhaengigen Gutachtens. Aber nichts von dem, was
oben steht, muss dort noch einmal auffallen.

Aufruf:  python _dev/scripts/check-ablauf-konsistenz.py [--verbose]
Exit 1, sobald ein Ablauf seiner Seite widerspricht.
"""
import argparse, glob, io, os, re, sys

# Bloecke und Alltagswoerter, die absichtlich auf mehreren Seiten wiederkehren.
UNVERDAECHTIG = {
    "Beispiel-Ablauf", "Geschenke-Runde", "Mitgebsel-Tueten", "Ermittler-Pause",
    "Fingerabdruck-Feld", "Thron-Kissen", "Kronen-Werkstatt",
}


def entities(s):
    for a, b in (("&auml;", "ae"), ("&ouml;", "oe"), ("&uuml;", "ue"), ("&szlig;", "ss"),
                 ("&Auml;", "Ae"), ("&Ouml;", "Oe"), ("&Uuml;", "Ue"), ("&amp;", "&"),
                 ("&ndash;", "-"), ("&mdash;", "-"), ("&nbsp;", " "), ("&euro;", "EUR")):
        s = s.replace(a, b)
    for a, b in (("ä", "ae"), ("ö", "oe"), ("ü", "ue"), ("ß", "ss"),
                 ("Ä", "Ae"), ("Ö", "Oe"), ("Ü", "Ue")):
        s = s.replace(a, b)
    return s


def nur_text(h):
    for m in (r"<script[^>]*>.*?</script>", r"<style[^>]*>.*?</style>", r"<!--.*?-->"):
        h = re.sub(m, " ", h, flags=re.S)
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", h))


def pruefe(pfad, verbose=False):
    roh = io.open(pfad, encoding="utf-8").read()
    name = os.path.basename(pfad)[:-5]
    m = re.search(r'<section class="u-mt32">\s*<h2>Beispiel-Ablauf.*?</section>', roh, re.S)
    if not m:
        return [], []
    kasten_roh, rest_roh = m.group(0), roh.replace(m.group(0), " ")
    kasten, rest = entities(nur_text(kasten_roh)), entities(nur_text(rest_roh))
    f, warns = [], []

    # ── 1. Die Ueberschrift nennt eine Altersgruppe ────────────────────────
    h2 = entities(re.search(r"<h2>(.*?)</h2>", kasten_roh, re.S).group(1))
    if not re.search(r"\d\s*-\s*\d+\s*Jahre", h2):
        f.append(f"{name}: die Ueberschrift nennt keine Altersgruppe — der Kasten liegt ausserhalb "
                 f"des Altersfilters und gilt sonst scheinbar fuer alle")

    # ── 2. Bloecke lueckenlos, Summe haelt die Ueberschrift ────────────────
    z = re.findall(r"(\d):(\d\d)\s*-\s*(\d):(\d\d)", kasten)
    if not z:
        f.append(f"{name}: keine Zeitbloecke im Ablauf gefunden")
    else:
        minuten = [(int(c) * 60 + int(d)) - (int(a) * 60 + int(b)) for a, b, c, d in z]
        for i in range(len(z) - 1):
            if (int(z[i][2]) * 60 + int(z[i][3])) != (int(z[i + 1][0]) * 60 + int(z[i + 1][1])):
                f.append(f"{name}: Luecke oder Ueberlappung zwischen {z[i][2]}:{z[i][3]} und "
                         f"{z[i+1][0]}:{z[i+1][1]}")
        zusage = re.search(r"\((\d)[,.](\d)\s*Stunden\)", kasten)
        if zusage:
            soll = int(zusage.group(1)) * 60 + int(zusage.group(2)) * 6
            if sum(minuten) != soll:
                f.append(f"{name}: die Bloecke ergeben {sum(minuten)} Min, die Ueberschrift "
                         f"verspricht {soll}")

    # ── 3. Bloecke liegen in den gedruckten Zeitspannen ────────────────────
    # Die Spanne steht INNERHALB der h3: <h3>Tatort-Ermittlung <span>⏱ 25–40 Min.</span></h3>
    spannen = {}
    for titel, lo, hi in re.findall(r"<h3[^>]*>([^<]{3,60})<span[^>]*>\s*⏱\s*(\d+)\s*[-–]\s*(\d+)\s*Min",
                                    rest_roh):
        spannen[entities(titel).strip()] = (int(lo), int(hi))
    zeilen = re.findall(r"<li><strong>(\d:\d\d[^<]*?)</strong>(.*?)</li>", kasten_roh, re.S)
    for spanne_txt, rumpf in zeilen:
        zz = re.findall(r"(\d):(\d\d)\s*(?:&ndash;|-|–)\s*(\d):(\d\d)", spanne_txt)
        if not zz:
            continue
        a, b, c, d = zz[0]
        dauer = (int(c) * 60 + int(d)) - (int(a) * 60 + int(b))
        klartext = entities(nur_text(rumpf))
        for titel, (lo, hi) in spannen.items():
            kern = titel.strip().rstrip(":,").split(" ")[0]
            if len(kern) > 6 and kern in klartext and not (lo <= dauer <= hi):
                f.append(f"{name}: Block {a}:{b}-{c}:{d} gibt \"{kern}\" {dauer} Min, "
                         f"die Seite druckt {lo}-{hi} Min")

    # ── 4. Keine Materialien, die die Seite fuer Juengere verbietet ────────
    verboten = set()
    for satz in re.split(r"(?<=[.!?])\s+", rest):
        # Nur das Wort, das die Verneinung unmittelbar regiert. Die Vorfassung nahm den ganzen
        # Rest des Satzes und meldete deshalb "Thron" — weil im selben Satz "(KEIN Glas)
        # portionieren ..., Thron-Tuecher arrangieren" stand. Ein Fehlalarm ist teurer als eine
        # Luecke: er bringt jedem bei, die Stufe zu ignorieren (LEKTIONEN L29).
        for treffer in re.finditer(r"(?:KEIN|KEINE|[Kk]eine?)\s+(?:kleinen?\s+|echten?\s+)?([A-Z][a-z]{3,})", satz):
            verboten.add(treffer.group(1))
    for w in sorted(verboten):
        if not re.search(rf"\b{re.escape(w)}\b", kasten):
            continue
        # erlaubt, wenn der Kasten selbst warnt oder eine Altersgrenze daneben nennt
        if re.search(rf"kein[e]?[^.]{{0,40}}{re.escape(w)}", kasten, re.I):
            continue
        if re.search(rf"{re.escape(w)}[^.]{{0,140}}(ab \d|6-8 ?-?Station|6-8)", kasten):
            continue
        if re.search(rf"(6-8|ab \d)[^.]{{0,140}}{re.escape(w)}", kasten):
            continue
        f.append(f"{name}: \"{w}\" wird im Ablauf ausgegeben, steht auf der Seite aber in einem "
                 f"Verbot fuer eine juengere Altersgruppe — Altersangabe fehlt")

    # ── 5. Requisiten-Leseliste (WARNUNG, kein Urteil) ─────────────────────
    def bekannt(w):
        # Deutscher Plural bildet Umlaute: "Logbuecher" auf der Liste heisst "Logbuch".
        # Ohne diese Zeile warnt die Stufe ewig ueber ein Requisit, das laengst dasteht.
        kandidaten = {w, w[:-1], w[:-2], w.replace("-", " "),
                      w.replace("uecher", "uch").replace("aende", "and").replace("oepfe", "opf")}
        return any(len(k) > 4 and k in rest for k in kandidaten)
    for wort in sorted(set(re.findall(r"\b[A-Z][a-z]{2,}(?:-[A-Z][a-z]{2,})+\b", kasten))):
        if wort in UNVERDAECHTIG or bekannt(wort):
            continue
        warns.append(f"{name}: \"{wort}\" steht nur im Ablauf — Requisit fuer die Einkaufsliste, "
                     f"oder nur ein selbst vergebener Blockname?")

    if verbose:
        print(f"  {name}: {len(z)} Bloecke, {len(spannen)} gedruckte Spannen, "
              f"{len(verboten)} altersbeschraenkte Materialien auf der Seite")
    return f, warns


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--verbose", action="store_true")
    a = ap.parse_args()

    seiten = [p for p in sorted(glob.glob(os.path.join("kindergeburtstag", "*.html")))
              if not re.search(r"-\d+(-\d+)?-jahre\.html$", p) and "dino-" not in p]
    mit = [p for p in seiten if "Beispiel-Ablauf" in io.open(p, encoding="utf-8").read()]
    print(f"Stufe 63: {len(mit)} von {len(seiten)} Motto-Seiten haben einen Beispiel-Ablauf\n")

    fails, warns = [], []
    for p in mit:
        _f, _w = pruefe(p, a.verbose)
        fails += _f
        warns += _w

    for x in warns:
        print(f"  WARN  {x}")
    if warns:
        print()
    if fails:
        for x in fails:
            print(f"  FAIL  {x}")
        print(f"\n  {len(fails)} FAIL — ein Ablauf, der seiner eigenen Seite widerspricht, "
              f"ist schlimmer als keiner.")
        return 1
    print(f"  0 FAIL — jeder Ablauf deckt sich mit dem, was seine Seite sagt"
          f"{f' ({len(warns)} Begriffe zum Nachlesen)' if warns else ''}.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
