#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Stufe 64 — die zwei Spielkataloge duerfen nicht weiter auseinanderlaufen.

WARUM ES ZWEI GIBT (nachgeschlagen am 02.09.2026):

  25.03.  generate-seo-pages.js erzeugt 14 Motto-Seiten aus Daten, die IM SKRIPT stehen
          ("MOTTO DATA (extracted from index.html JS)").
  26.03.  Letzte Aenderung an diesem Generator. Sein Zielpfad
          (_dev/scripts/machsleicht-site/machsleicht-site/) existiert nicht, kein Build ruft ihn
          auf. Er lief EINMAL und wurde am Tag darauf verwaist.
  03.-08. Die Seiten werden von Hand weitergepflegt: Heraldik-Tiefe, Sicherheitsregeln,
          Allergen-Hinweise, Gender-Sweeps, Wellen 3-8. Fuenf Monate Arbeit, die nirgends
          sonst steht.
  05.06.  data/motto/ entsteht NEU fuer den Wizard ("schliesst Wizard-Output-Luecke") — mit
          eigenen Spielen, weil aus dem toten Generator nichts abzuleiten war.

Das Ergebnis sind nicht zwei Benennungen EINES Katalogs, sondern zwei Kataloge. Gemessen am
02.09. ueber 244 Spiele in data/motto gegen die Stationen der Motto-Seiten:

    eindeutig einer Station zuzuordnen   22 %
    plausibel, aber mehrdeutig           22 %
    keine Station passt ueberhaupt       56 %

Deshalb scheiterte am 01.09. der Versuch, den Beispiel-Ablauf aus data/motto abzuleiten: die
Rechnung stimmte, aber 72 % der genannten Spiele erklaerte die Seite nicht (LEKTIONEN L37).

WAS DIESE STUFE TUT: Sie entscheidet nichts. Sie misst die Deckung und haelt sie fest, damit
die Kataloge nicht weiter auseinanderlaufen, waehrend niemand hinsieht — und damit jeder
Schritt der Zusammenfuehrung (BACKLOG M-4, HELFER-V5 "#110 Spiel-Referenzen statt
Freitext-Namen") als Zahl sichtbar wird. Der Stand ist eine Sperrklinke: er darf steigen,
nicht fallen.

Aufruf:  python _dev/scripts/check-katalog-deckung.py [--liste]
"""
import argparse, glob, html, io, json, os, re, sys

# Gemessener Stand am 02.09.2026: 137 der 244 Spiele haben auf ihrer Seite keine Entsprechung.
# Nach jedem Schritt der Zusammenfuehrung hier herabsetzen — das ist die Sperrklinke.
#
# Bewusst eine ABSOLUTE Zahl und keine Prozentschwelle: die erste Fassung nahm 43 % mit einem
# Prozentpunkt Toleranz, und die Gegenprobe (fuenf Spiele umbenannt) fiel auf 42,2 % — die
# Toleranz hat den Rueckschritt verschluckt. Bei 244 Spielen ist ein Spiel 0,4 Punkte wert; jede
# Toleranz schluckt also mehrere. Ein Spiel mehr ohne Entsprechung ist jetzt ein FAIL.
MAX_OHNE_ENTSPRECHUNG = 137


def worte(s):
    return set(re.findall(r"[A-Za-zÄÖÜäöüß]{4,}", s.lower()))


def stationen(motto):
    pfad = f"kindergeburtstag/{motto}.html"
    h = io.open(pfad, encoding="utf-8").read()
    h = re.sub(r"<script[^>]*>.*?</script>", " ", h, flags=re.S)
    block = re.search(r"<h2>\d+ Spielideen.*?</section>", h, re.S)
    if not block:
        return []
    return [html.unescape(re.sub(r"<[^>]+>", "", x)).strip()
            for x in re.findall(r"<h3[^>]*>(.*?)</h3>", block.group(0), re.S)]


def spiele(motto, alter):
    pfad = f"data/motto/{motto}-{alter}.json"
    if not os.path.exists(pfad):
        return []
    d = json.load(io.open(pfad, encoding="utf-8"))
    v = ([x for x in d.get("variants", []) if x.get("id") == "standard"] or d.get("variants") or [{}])[0]
    return [re.sub(r"^[^A-Za-zÄÖÜ]+", "", g.get("name", "")).strip() for g in v.get("games", [])]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--liste", action="store_true", help="die nicht zuordenbaren Spiele auflisten")
    a = ap.parse_args()

    mottos = sorted({os.path.basename(f).rsplit("-", 1)[0] for f in glob.glob("data/motto/*.json")})
    mottos = [m for m in mottos if os.path.exists(f"kindergeburtstag/{m}.html")]
    if not mottos:
        print("FEHLER: keine Motto-Seiten mit Daten gefunden — laeuft die Stufe im Repo-Wurzelverzeichnis?")
        return 2

    ges = sicher = unsicher = 0
    offen = []
    for m in mottos:
        st = [(s, worte(s)) for s in stationen(m)]
        for alter in ("klein", "mittel", "gross"):
            for name in spiele(m, alter):
                gw = worte(name)
                ges += 1
                rang = sorted(((len(gw & sw) / max(len(gw | sw), 1), s) for s, sw in st), reverse=True)
                best, station = rang[0] if rang else (0, "")
                zweit = rang[1][0] if len(rang) > 1 else 0
                if best >= 0.30 and best - zweit >= 0.10:
                    sicher += 1
                elif best >= 0.12:
                    unsicher += 1
                else:
                    offen.append(f"{m}/{alter}: {name}")

    deckung = 100 * (sicher + unsicher) / ges if ges else 0
    print(f"Stufe 64: {ges} Spiele in data/motto gegen die Stationen von {len(mottos)} Motto-Seiten\n")
    print(f"  eindeutig einer Station zuzuordnen : {sicher:>4}  ({100*sicher/ges:.0f} %)")
    print(f"  plausibel, aber mehrdeutig         : {unsicher:>4}  ({100*unsicher/ges:.0f} %)")
    print(f"  keine Station passt ueberhaupt     : {len(offen):>4}  ({100*len(offen)/ges:.0f} %)")
    print(f"\n  Deckung: {deckung:.1f} %   (Sperrklinke: hoechstens {MAX_OHNE_ENTSPRECHUNG} ohne Entsprechung)")

    if a.liste:
        print("\n  Ohne Entsprechung auf ihrer Seite:")
        for x in offen[:40]:
            print(f"    {x}")
        if len(offen) > 40:
            print(f"    ... und {len(offen)-40} weitere")

    if len(offen) > MAX_OHNE_ENTSPRECHUNG:
        print(f"\n  FAIL — {len(offen)} Spiele ohne Entsprechung, erlaubt sind {MAX_OHNE_ENTSPRECHUNG}. "
              f"Die beiden Kataloge laufen\n  weiter auseinander, statt zusammen. Siehe BACKLOG M-4.")
        return 1
    if len(offen) < MAX_OHNE_ENTSPRECHUNG:
        print(f"\n  0 FAIL — und {MAX_OHNE_ENTSPRECHUNG - len(offen)} Spiele besser als der festgehaltene "
              f"Stand. Sperrklinke in dieser Datei auf {len(offen)} setzen.")
        return 0
    print("\n  0 FAIL — die Deckung ist nicht gefallen.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
