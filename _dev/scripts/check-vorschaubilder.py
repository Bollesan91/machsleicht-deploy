# -*- coding: utf-8 -*-
"""Stufe 71: Jedes Vorschaubild, auf das eine Seite zeigt, muss es auch geben.

ANLASS (02.09.2026)
21 Bilddateien fehlten, in 51 Vorkommen auf 29 Seiten — `og-image.png`, `logo.png`,
`og-feen.png`, `og-schatzsuche-einhorn.png` und weitere. Betroffen sind `og:image`
und `twitter:image` sowie `image`/`logo` im JSON-LD: also genau das, was
Suchmaschinen und WhatsApp-Vorschauen anzeigen. Ein Elternteil, das die Seite
teilt, bekam eine leere Vorschau; im Repo sah alles normal aus, weil niemand die
Verweise gegen die Dateien hielt.

GEMESSEN WIRD DER VERSIONIERTE STAND, nicht das Arbeitsverzeichnis: ausgeliefert
wird, was in git liegt. Dieselbe Lehre wie beim prinzessin-Paket, das lokal
existierte und in `.gitignore` stand.

DREI ARME IN DER GEGENPROBE — und der dritte ist der, der zaehlt
  1. Phantom: ein erfundenes Bild wird in eine Kopie IM SPEICHER gesetzt und muss
     gemeldet werden. Beweist, dass die Regel beisst — heute und in sechs Wochen.
  2. Sauberer Fall: ein vorhandenes Bild darf keinen Fehlalarm ausloesen.
  3. Korpus: die 21 echten Fundstellen aus dem Stand VOR der Reparatur
     (`e26b93c2^`). Sie muessen alle wiedergefunden werden.

Warum Arm 3 noetig ist, obwohl Arm 1 schon beisst: **ein Phantom hat die Form, die
der Autor erwartet.** Die erste Messung am 02.09. sah nur JSON-LD und uebersah
`og-kindergeburtstag-spiele-drinnen.jpg`, weil es in einem Meta-Tag stand — ein
JSON-LD-Phantom haette diesen blinden Fleck bestaetigt statt ihn zu zeigen. Arm 3
prueft gegen die Formen der echten Welt, nicht gegen die ausgedachten.

    python _dev/scripts/check-vorschaubilder.py
    python _dev/scripts/check-vorschaubilder.py --gegenprobe

Exit 0 = jedes referenzierte Bild existiert. Exit 1 = mindestens eines fehlt.
"""
import argparse
import collections
import io
import re
import subprocess
import sys

try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

# Absolute Verweise auf eigene Bilddateien — deckt og:image, twitter:image,
# JSON-LD image/logo und alles andere ab, was die Datei nennt. Relative Pfade
# bleiben aussen vor: sie loesen sich je Seite anders auf und haben ihre eigene
# Fehlerklasse (dafuer waere eine eigene Stufe noetig, die es noch nicht gibt).
BILD = re.compile(r'https://machsleicht\.de/([^"\'\s>)]+\.(?:png|jpg|jpeg|webp|svg|gif|ico))')

KORPUS_STAND = "e26b93c2^"      # der Stand VOR der Reparatur vom 02.09.2026
KORPUS_ERWARTET = 21            # so viele Bilddateien fehlten dort


def _git(*args):
    return subprocess.run(["git", *args], capture_output=True, text=True,
                          errors="replace", timeout=300)


def dateien(ref=None):
    """Versionierte Dateiliste — aus dem Index (ref=None) oder aus einem Commit."""
    if ref is None:
        aus = _git("ls-files")
    else:
        aus = _git("ls-tree", "-r", "--name-only", ref)
    if aus.returncode != 0 or not aus.stdout.strip():
        return None
    return [z.strip() for z in aus.stdout.splitlines() if z.strip()]


def verweise(ref=None):
    """Alle Bild-Verweise als (quelle, bildpfad). Bei ref: aus dem Commit gelesen,
    in ZWEI git-Aufrufen statt einem je Datei."""
    if ref is None:
        aus = []
        for f in [x for x in (dateien() or []) if x.endswith(".html")
                  and not x.startswith("_dev/")]:
            try:
                text = io.open(f, encoding="utf-8", errors="replace").read()
            except Exception:
                continue
            for p in BILD.findall(text):
                aus.append((f, p.split("?")[0]))
        return aus
    roh = _git("grep", "-h", "-o", "-E",
               r'https://machsleicht\.de/[^"]+\.(png|jpg|jpeg|webp|svg|gif|ico)',
               ref, "--", "*.html")
    if roh.returncode != 0:
        return None
    aus = []
    for zeile in roh.stdout.splitlines():
        m = BILD.search(zeile)
        if m:
            aus.append((ref, m.group(1).split("?")[0]))
    return aus


def fehlend(ref=None):
    v = dateien(ref)
    r = verweise(ref)
    if v is None or r is None:
        return None
    bestand = set(v)
    aus = collections.Counter()
    wo = collections.defaultdict(set)
    for quelle, bild in r:
        if bild not in bestand:
            aus[bild] += 1
            wo[bild].add(quelle)
    return aus, wo, len(r)


def gegenprobe():
    ok = True

    # --- Arm 1: Phantom. In einer Kopie im Speicher, das Repo wird nicht angefasst.
    v = set(dateien() or [])
    phantom = "og-gibt-es-garantiert-nicht-xyz.png"
    erkannt = phantom not in v
    print("    Arm 1  Phantom '%s' -> %s" % (phantom, "gemeldet" if erkannt else "NICHT ERKANNT"))
    ok = ok and erkannt

    # --- Arm 2: sauberer Fall. Ein vorhandenes Bild darf nicht auffallen.
    echt = next((b for _q, b in (verweise() or []) if b in v), None)
    sauber = echt is not None
    print("    Arm 2  vorhandenes Bild '%s' -> %s"
          % (echt or "-", "kein Fehlalarm" if sauber else "KEIN BILD ZUM PRUEFEN"))
    ok = ok and sauber

    # --- Arm 3: der Korpus aus der Versionsgeschichte.
    korpus = fehlend(KORPUS_STAND)
    if korpus is None:
        # Kein Zugriff auf den Stand (flacher Klon?) — GRAU, nicht gruen.
        print("    Arm 3  GRAU: Stand %s nicht abrufbar — Korpus ungeprueft, "
              "nicht bestanden" % KORPUS_STAND)
        return 1
    kfehlt, _kwo, kverweise = korpus
    passt = len(kfehlt) == KORPUS_ERWARTET
    print("    Arm 3  Korpus %s: %d fehlende Bilddateien in %d Verweisen "
          "(erwartet %d) -> %s"
          % (KORPUS_STAND, len(kfehlt), kverweise, KORPUS_ERWARTET,
             "vollstaendig wiedergefunden" if passt else "ABWEICHUNG"))
    if not passt:
        print("         gefunden: " + ", ".join(sorted(kfehlt)))
    ok = ok and passt

    print("    " + ("Gegenprobe bestanden — die Regel beisst, erfindet nichts und "
                    "sieht die Formen der echten Welt."
                    if ok else "Gegenprobe GESCHEITERT."))
    return 0 if ok else 1


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--gegenprobe", action="store_true")
    a = ap.parse_args()
    if a.gegenprobe:
        return gegenprobe()

    erg = fehlend()
    if erg is None:
        print("    HINWEIS: kein Git-Stand abrufbar — Stufe 71 kann nicht messen.")
        return 1
    fehlt, wo, gesamt = erg
    print("Stufe 71: %d Bild-Verweise in versionierten Seiten geprueft" % gesamt)
    if not fehlt:
        print("\n    0 FAIL — jedes referenzierte Vorschaubild liegt im Repo.")
        return 0
    for bild, n in fehlt.most_common():
        seiten = sorted(wo[bild])
        print("    FAIL %-44s %dx  z. B. %s" % (bild, n, seiten[0]))
    print("\n    %d Bilddatei(en) fehlen, %d Verweise betroffen — Suchmaschinen und "
          "Sharing-Vorschauen bekommen dort ein 404."
          % (len(fehlt), sum(fehlt.values())))
    return 1


if __name__ == "__main__":
    sys.exit(main())
