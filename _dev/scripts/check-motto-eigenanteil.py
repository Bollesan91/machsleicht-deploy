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
MIN_SATZ = 35           # kuerzere Fragmente sind Bedienelemente, keine Aussagen.

# FASSUNG 2 (02.09.2026, nach der Pruefstand-Messung)
# Fassung 1 zaehlte Saetze, die auf >= 8 Seiten stehen, und erlaubte davon 8. Der
# Pruefstand hat sie widerlegt: drei offensichtliche Schablonensaetze auf 7 von 15
# Seiten kamen durch (unter der Schwelle), und dieselben drei auf ALLEN 15 Seiten
# ebenfalls — der Zaehler stieg von 6 auf 8, und 8 war erlaubt. Eine Zusage
# ("keine Ergaenzung macht die Seiten aehnlicher"), unter die ein kompletter
# Textbaustein passt, ist keine Zusage.
#
# Gemessen wurde daraufhin die Verteilung, statt eine Schwelle zu raten:
#   1492 Saetze stehen auf genau EINER Seite
#      4 Saetze auf ZWEI (Altersvarianten, unauffaellig)
#      0 Saetze auf 3, 4 oder 5
#      7 Saetze auf 6 bis 15 Seiten  <- die bekannten Bedienelemente
# Zwischen 2 und 6 liegt nichts. Schwelle 3 ist deshalb keine Kalibrierung auf Kante,
# sondern der breiteste Graben, den die Daten hergeben.
SCHWELLE = 3            # "auf mehreren Seiten" = auf mindestens so vielen.

# Namentliche Allowlist statt einer Obergrenze. Eine Zahl waechst stillschweigend,
# eine Liste mit Begruendungen nicht: wer sie erweitert, muss schreiben WARUM.
# Jeder Satz hier ist ein Bedienelement oder eine Produktzusage, die bewusst auf jeder
# Seite steht — kein redaktioneller Motto-Text.
BEKANNTE_BAUSTEINE = {
    "Material &amp; Vorbereitung Was ihr braucht — die komplette Einkaufsliste.":
        "Abschnittsueberschrift des Einkaufsblocks (15/15)",
    "Der machsleicht-Planer berechnet automatisch Mengen und Kosten pro Kind.":
        "Planer-CTA, bewusst identisch auf allen Seiten (15/15)",
    "W&auml;hle die Altersgruppe deines Kindes, um nur passende Varianten zu sehen.":
        "Bedienhinweis des Altersgruppen-Umschalters (15/15)",
    "Alle Altersgruppen 3\u20135 Jahre 6\u20138 Jahre 9\u201312 Jahre Tipp:":
        "Beschriftung des Umschalters selbst (14/15)",
    "Zeitplan mit Uhrzeiten, 2\u20133 altersgerechte Spiele mit Anleitung, Einkaufsliste "
    "mit Preisen, Snack-Mengen f&uuml;r die richtige Anzahl Kinder und Kosten pro Kind.":
        "Leistungsversprechen des Planers — Produktzusage, kein Motto-Text (13/15)",
    "Wie viel Zeit brauche ich f\u00fcr die Vorbereitung?":
        "FAQ-Frage, absichtlich wortgleich (10/15)",
    "5 fertige Stationen, altersgerechte R\u00e4tsel und interaktive Schatzkarte \u2014 "
    "kostenlos erstellt in 10 Minuten.":
        "Schatzsuchen-Teaser, Produktzusage (6/15)",
}


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
    neu = [s for s in geteilt if s not in BEKANNTE_BAUSTEINE]
    print("  Saetze auf >= %d Seiten wortgleich: %d (%d bekannte Bausteine, %d neue)"
          % (SCHWELLE, len(geteilt), len(BEKANNTE_BAUSTEINE), len(neu)))
    for s in neu:
        fails.append("neuer Textbaustein auf %d Seiten: %r — entweder motto-eigen "
                     "formulieren oder mit Begruendung in BEKANNTE_BAUSTEINE"
                     % (zaehler[s], s[:90]))
    # Eine Allowlist, die einen Satz deckt, den es nicht mehr gibt, verbirgt beim
    # naechsten Mal einen echten Fund an derselben Stelle.
    for s in BEKANNTE_BAUSTEINE:
        if zaehler.get(s, 0) < SCHWELLE:
            fails.append("Allowlist-Eintrag steht nur noch auf %d Seiten: %r — entfernen"
                         % (zaehler.get(s, 0), s[:70]))
    if a.zeige_dubletten or neu:
        for s in sorted(geteilt, key=lambda x: -zaehler[x]):
            print("    (%dx) %s" % (zaehler[s], s[:100]))

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
