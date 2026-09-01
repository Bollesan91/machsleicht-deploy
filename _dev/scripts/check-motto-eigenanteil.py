#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Stufe 62 — die Motto-Seiten duerfen einander nicht aehnlicher werden.

Anlass (01.09.2026): Die 15 Motto-Hauptseiten versprechen im Titel einen "Ablauf" und liefern
ihn auf 14 von 15 nicht. Der naheliegende Fix — einen Beispiel-Ablauf ergaenzen — ist genau der
Fix, der alles schlimmer machen KANN: ein Zeitplan mit generischen Bloecken ("Ankommen,
Begruessung", "Kuchen und Geschenke") waere auf allen 15 Seiten derselbe Text. Aus einer Luecke
wuerde ein Dublettenfeld.

Gemessener Ausgangsstand vor der Ergaenzung:
    Eigenanteil je Seite      93-96 %   (Saetze, die es nur auf DIESER Seite gibt)
    Saetze auf >= 8 Seiten    6         (samt und sonders Navigation und Planer-CTA)

Diese Stufe friert das ein. Sie prueft nicht, ob ein Text gut ist — nur, ob er neu ist.
Wer eine Motto-Seite ergaenzt, muss den Eigenanteil halten; sonst ist die Ergaenzung eine
Vorlage und keine Arbeit.

Aufruf:  python _dev/scripts/check-motto-eigenanteil.py [--zeige-dubletten]
"""
import argparse, collections, glob, io, os, re, sys

MIN_EIGEN = 90          # Prozent. Ausgangsstand 93-96, drei Punkte Luft nach unten.
MAX_GETEILT = 8         # Saetze, die auf >= SCHWELLE Seiten wortgleich stehen. Stand: 6.
SCHWELLE = 8            # "auf vielen Seiten" = auf mindestens so vielen.
MIN_SATZ = 35           # kuerzere Fragmente sind Bedienelemente, keine Aussagen.


def saetze(pfad):
    h = io.open(pfad, encoding="utf-8").read()
    for muster in (r"<script[^>]*>.*?</script>", r"<style[^>]*>.*?</style>", r"<!--.*?-->"):
        h = re.sub(muster, "", h, flags=re.S)
    t = re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", h))
    return {s.strip() for s in re.split(r"(?<=[.!?:])\s+|\s{2,}", t) if len(s.strip()) >= MIN_SATZ}


def motto_seiten():
    for f in sorted(glob.glob(os.path.join("kindergeburtstag", "*.html"))):
        n = os.path.basename(f)[:-5]
        # Altersvarianten teilen sich naturgemaess Text mit ihrer Hauptseite; die zwei
        # Werkzeugseiten (dino-forscherpass, dino-quiz) sind noindex und keine Inhaltsseiten.
        if re.search(r"-\d+(-\d+)?-jahre$", n) or n.startswith("dino-"):
            continue
        yield n, f


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--zeige-dubletten", action="store_true")
    a = ap.parse_args()

    seiten = {n: saetze(f) for n, f in motto_seiten()}
    if len(seiten) < 10:
        print(f"FEHLER: nur {len(seiten)} Motto-Seiten gefunden — laeuft die Stufe im Repo-Wurzelverzeichnis?")
        return 2

    zaehler = collections.Counter()
    for ss in seiten.values():
        for s in ss:
            zaehler[s] += 1

    fails = []
    print(f"Stufe 62: {len(seiten)} Motto-Hauptseiten\n")
    print(f"  {'SEITE':<15}{'Saetze':>8}{'nur hier':>10}{'Eigenanteil':>13}")
    for n, ss in sorted(seiten.items()):
        eigen = sum(1 for s in ss if zaehler[s] == 1)
        quote = 100 * eigen / len(ss) if ss else 0
        marke = "" if quote >= MIN_EIGEN else "   <-- FAIL"
        print(f"  {n:<15}{len(ss):>8}{eigen:>10}{quote:>12.0f}%{marke}")
        if quote < MIN_EIGEN:
            fails.append(f"{n}: Eigenanteil {quote:.0f} % < {MIN_EIGEN} % — die Ergaenzung ist eine Vorlage")

    geteilt = [s for s, c in zaehler.items() if c >= SCHWELLE]
    print(f"\n  Saetze auf >= {SCHWELLE} Seiten wortgleich: {len(geteilt)} (erlaubt: {MAX_GETEILT})")
    if a.zeige_dubletten or len(geteilt) > MAX_GETEILT:
        for s in sorted(geteilt, key=lambda x: -zaehler[x]):
            print(f"    ({zaehler[s]}x) {s[:100]}")
    if len(geteilt) > MAX_GETEILT:
        fails.append(f"{len(geteilt)} geteilte Saetze > {MAX_GETEILT} — ein neuer Textbaustein hat sich eingeschlichen")

    print()
    if fails:
        for f in fails:
            print(f"  FAIL  {f}")
        print(f"\n  {len(fails)} FAIL — eine Ergaenzung, die alle Seiten gleich macht, ist keine Ergaenzung.")
        return 1
    print("  0 FAIL — jede Motto-Seite traegt ihren eigenen Text.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
