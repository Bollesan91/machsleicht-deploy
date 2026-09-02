# -*- coding: utf-8 -*-
"""Stufe 66: Ein Skript, das ins Repo schreibt und von nichts aufgerufen wird.

ANLASS (02.09.2026, HERKUNFT.md)
Es gibt nicht zwei auseinandergelaufene Quellen, es gibt EIN Muster, und es ist
mindestens siebenmal passiert: einmal erzeugen, Generator liegenlassen, von Hand
weiterpflegen. Die zwei Spielkataloge sind nur der sichtbarste Fall.
`_dev/scripts/generate-seo-pages.js` lief am 25.03. einmal und ist seit dem 26.03.
verwaist; die Motto-Seiten wuchsen danach fuenf Monate von Hand.
`_dev/scripts/worker-type-harden.py` liest und ueberschreibt `party-worker.js`
in place — und haengt an keinem Aufrufer.

WAS DIESE STUFE TUT — und was ausdruecklich nicht
Sie entscheidet NICHT, ob ein Skript weg soll. Der Bestand ist Bestand und wird
einzeln entschieden. Sie haelt nur fest, dass **keine NEUE Waise mit Schreibzugriff
dazukommt**: Sperrklinke auf der heute gemessenen Zahl.

DREI KATEGORIEN, UND DIE DRITTE IST DER EHRLICHE TEIL
  A  wird ausgefuehrt   — ein Interpreteraufruf, ein import, ein subprocess-Aufruf
  B  Waise mit Schreibzugriff — kein Aufrufer, aber ein Schreibaufruf im Code
  C  unklar             — kein Aufrufer, kein erkennbarer Schreibaufruf

Kategorie C ist NICHT "sauber". Sie ist "statisch nicht aufloesbar" — Pfade werden
zur Laufzeit gebaut, und dieses Skript raet nicht. Eine Stufe, die Unwissen als
Erfolg meldet, ist genau die Klasse, gegen die sie gebaut wurde. Deshalb hat C eine
eigene Sperrklinke: die Zahl darf nicht wachsen, ohne dass jemand hinsieht.

    python _dev/scripts/check-waisen-generatoren.py
    python _dev/scripts/check-waisen-generatoren.py --liste
    python _dev/scripts/check-waisen-generatoren.py --gegenprobe

Exit 0 = keine neue Waise. Exit 1 = die Sperrklinke ist gerissen.
"""
import argparse
import io
import os
import re
import subprocess
import sys

try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

# Sperrklinken, gemessen am 02.09.2026 auf draft. Sie duerfen SINKEN, nie steigen.
# Wer eine Waise aufloest, zieht die Zahl hier nach — das ist der einzige Weg, wie
# der Bestand jemals kleiner wird.
MAX_WAISEN_MIT_SCHREIBZUGRIFF = 65   # kein Aufrufer, irgendein Schreibaufruf im Code
MAX_WAISEN_MIT_LEBENDER_AUSGABE = 6  # davon: schreibt nachweislich in eine Datei, die es GIBT
MAX_UNKLAR = 5                       # kein Aufrufer, kein erkennbarer Schreibaufruf

SUCHORTE = ("_dev/scripts", "_src")
AUSGENOMMEN = ("__pycache__", "archive", "node_modules")

SCHREIBT = (
    re.compile(r"open\s*\([^)]*['\"][wa]\+?['\"]"),
    re.compile(r"\.write_text\s*\("),
    re.compile(r"writeFileSync\s*\("),
    re.compile(r"fs\.write\w*\s*\("),
    re.compile(r"\.write\s*\("),
)


def versioniert():
    aus = subprocess.run(["git", "ls-files"], capture_output=True, text=True, timeout=120)
    if aus.returncode != 0 or not aus.stdout.strip():
        return None
    return [z.strip() for z in aus.stdout.splitlines() if z.strip()]


def generatoren(dateien):
    aus = []
    for f in dateien:
        if not f.endswith((".py", ".js", ".cjs", ".mjs")):
            continue
        if not any(f.startswith(o + "/") for o in SUCHORTE):
            continue
        if any(x in f for x in AUSGENOMMEN):
            continue
        if os.path.basename(f).startswith("check-"):
            continue
        aus.append(f)
    return sorted(aus)


def _lies(f):
    try:
        return io.open(f, encoding="utf-8", errors="replace").read()
    except Exception:
        return ""


def wird_ausgefuehrt(name, pfad, inhalte):
    """Ausfuehrung heisst: ein Interpreter davor, ein import, ein subprocess-Aufruf.
    Eine Erwaehnung im Kommentar ist KEINE Ausfuehrung — genau diese Verwechslung
    liess generate-seo-pages.js lebendig aussehen (zwei 'Aufrufer', beide Kommentare)."""
    n = re.escape(name)
    muster = [
        r"(?:python|python3|node|bash|sh|npx)\s+[^\n\"']*" + n,
        r"spec_from_file_location\([^)]*" + n,
        r"(?:require|import)\(['\"][^'\"]*" + n,
        r"lade_modul\(['\"][^'\"]*" + n,
        r"run\(\[[^\]]*" + n,
    ]
    for f, t in inhalte.items():
        if f == pfad or "archive" in f:
            continue
        for m in muster:
            if re.search(m, t):
                return f
    return None


def schreibt_ins_repo(text):
    return any(p.search(text) for p in SCHREIBT)


# Literale Schreibziele. Deckt laengst nicht alles ab (Pfade werden oft zur Laufzeit
# gebaut) — genau deshalb ist das ein ZUSATZ-Signal und nicht das Hauptmass.
ZIELE = (
    re.compile(r"""open\s*\(\s*['"]([^'"]{3,90})['"]\s*,\s*['"][wa]"""),
    re.compile(r"""writeFileSync\s*\(\s*['"]([^'"]{3,90})['"]"""),
    re.compile(r"""ZIEL\s*=\s*(?:pathlib\.Path\()?['"]([^'"]{3,90})['"]"""),
)


def lebende_ziele(text):
    """Schreibt das Skript in etwas, das heute noch da ist? Dann ist seine Ausgabe
    lebendig, waehrend sein Erzeuger stillsteht — das ist die geladene Waffe."""
    aus = []
    for muster in ZIELE:
        for ziel in muster.findall(text):
            if ziel.startswith(("http", "/tmp", "C:")) or "*" in ziel:
                continue
            if os.path.exists(ziel):
                aus.append(ziel)
    return sorted(set(aus))


def einteilen():
    dateien = versioniert()
    if dateien is None:
        print("    HINWEIS: kein Git-Stand abrufbar — Stufe 66 kann nicht messen.")
        return None
    inhalte = {f: _lies(f) for f in dateien
               if f.endswith((".sh", ".json", ".md", ".py", ".js", ".mjs", ".cjs", ".yml", ".html"))}
    a, b, c = [], [], []
    for g in generatoren(dateien):
        rufer = wird_ausgefuehrt(os.path.basename(g), g, inhalte)
        if rufer:
            a.append((g, rufer))
        elif schreibt_ins_repo(inhalte.get(g, _lies(g))):
            b.append((g, lebende_ziele(inhalte.get(g, _lies(g)))))
        else:
            c.append((g, None))
    return a, b, c


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--liste", action="store_true", help="alle Waisen einzeln nennen")
    ap.add_argument("--gegenprobe", action="store_true")
    args = ap.parse_args()

    teile = einteilen()
    if teile is None:
        return 1
    a, b, c = teile

    if args.gegenprobe:
        # Ein Skript ohne Aufrufer, das schreibt, MUSS in B landen. Geprueft wird an
        # einem echten Eintrag aus A: nimmt man ihm den Aufrufer, wandert er.
        fake = "_dev/scripts/zzz-neue-waise.py"
        text = "open('data/motto/x.json', 'w').write('x')"
        wandert = schreibt_ins_repo(text) and wird_ausgefuehrt(
            os.path.basename(fake), fake, {}) is None
        print("    Gegenprobe: ein neues, schreibendes Skript ohne Aufrufer -> %s"
              % ("als Waise erkannt" if wandert else "NICHT ERKANNT"))
        return 0 if wandert else 1

    print("Stufe 66: %d Generator-Skripte" % (len(a) + len(b) + len(c)))
    print("    A wird ausgefuehrt          : %3d" % len(a))
    scharf = [(g, z) for g, z in b if z]
    print("    B Waise MIT Schreibzugriff  : %3d  (Sperrklinke: hoechstens %d)"
          % (len(b), MAX_WAISEN_MIT_SCHREIBZUGRIFF))
    print("      davon Ausgabe LEBT        : %3d  (Sperrklinke: hoechstens %d)"
          % (len(scharf), MAX_WAISEN_MIT_LEBENDER_AUSGABE))
    for g, z in scharf:
        print("        ! %-46s schreibt nach %s" % (g, ", ".join(z[:2])))
    print("    C unklar (nicht 'sauber')   : %3d  (Sperrklinke: hoechstens %d)"
          % (len(c), MAX_UNKLAR))
    if args.liste:
        for g, _ in b:
            print("        B %s" % g)
        for g, _ in c:
            print("        C %s" % g)

    fails = []
    if len(b) > MAX_WAISEN_MIT_SCHREIBZUGRIFF:
        fails.append("%d Waisen mit Schreibzugriff > %d — eine NEUE ist dazugekommen. "
                     "Entweder verdrahten (Aufrufer im Build/Gate) oder loeschen."
                     % (len(b), MAX_WAISEN_MIT_SCHREIBZUGRIFF))
    if len(scharf) > MAX_WAISEN_MIT_LEBENDER_AUSGABE:
        fails.append("%d Waisen schreiben in eine Datei, die es noch gibt > %d — genau so "
                     "entstehen zwei Quellen fuer dasselbe Artefakt."
                     % (len(scharf), MAX_WAISEN_MIT_LEBENDER_AUSGABE))
    if len(c) > MAX_UNKLAR:
        fails.append("%d unklare Skripte > %d — die Stufe kann bei ihnen nichts aussagen, "
                     "und ihre Zahl waechst." % (len(c), MAX_UNKLAR))
    for schwelle, ist, name in ((MAX_WAISEN_MIT_SCHREIBZUGRIFF, len(b), "B"),
                                (MAX_UNKLAR, len(c), "C")):
        if ist < schwelle:
            print("    HINWEIS: %s ist auf %d gesunken (Sperrklinke steht auf %d) — "
                  "Sperrklinke nachziehen." % (name, ist, schwelle))

    for f in fails:
        print("    FAIL %s" % f)
    if fails:
        return 1
    print("\n    0 FAIL — keine neue Waise mit Schreibzugriff.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
