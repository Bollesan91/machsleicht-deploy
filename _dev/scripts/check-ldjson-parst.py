# -*- coding: utf-8 -*-
"""Stufe 72: Ist jeder JSON-LD-Block gueltiges JSON?

Anlass (07.09.2026): Der Ruhemodus-Text des Planers (964ad987) setzte im
FAQ-JSON-LD das Wort Minimal mit typografischem Anfangs- und GERADEM
Schlusszeichen. Ein gerades Anfuehrungszeichen mitten in einem JSON-String
beendet den String — der ganze Block ist danach kein JSON mehr. Google
verwirft dann nicht die eine Antwort, sondern das komplette FAQPage-Markup
der meistbesuchten Seite der Site.

Sechs Linterlaeufe (Lauf 1-6 der Funnel-Challenge) waren gruen: keine Stufe
hatte je gefragt, ob ein ld+json-Block JSON ist. Es ist dieselbe Klasse wie
Stufe 15, die fragt, ob ein Paket ueberhaupt JavaScript ist — und die nimmt
ld+json ausdruecklich AUS, weil node --check kein JSON liest. Die Luecke
zwischen beiden Stufen war genau einen Block breit. Gefunden hat es die
Fun-Session mit json.loads je Block; hier wird daraus die Stufe.

Korpus wie Stufe 71: versionierte .html ausserhalb _dev/. Ein Block muss
parsen UND ein Objekt oder eine Liste ergeben — "42" ist JSON, aber kein
Schema.

Gegenprobe, zwei Arme (beide muessen beissen):
  Arm 1  ein gerades Anfuehrungszeichen in einen String eines gueltigen
         Blocks setzen -> muss gemeldet werden
  Arm 2  der echte Fall: kindergeburtstag.html aus 964ad987 -> genau EIN
         kaputter Block, und zwar der FAQ-Block. Ohne Git ist der Arm GRAU
         und die Gegenprobe faellt — kein Freifahrtschein.
"""
import io
import json
import re
import subprocess
import sys

BLOCK = re.compile(
    r'<script[^>]*type=["\']?application/ld\+json["\']?[^>]*>(.*?)</script>',
    re.S | re.I)
ECHTER_FALL = ("964ad987", "kindergeburtstag.html")


def _git(*args):
    return subprocess.run(["git", *args], capture_output=True, timeout=300)


def dateien():
    """Versionierte Seiten aus dem Index — nie aus dem Verzeichnisbaum, damit
    ein liegengebliebener Entwurf weder Alarm schlaegt noch etwas verdeckt."""
    aus = _git("ls-files", "-z")
    if aus.returncode != 0 or not aus.stdout.strip():
        return None
    alle = [z for z in aus.stdout.decode("utf-8", "replace").split("\0") if z]
    return [z for z in alle if z.endswith(".html") and not z.startswith("_dev/")]


def _parst(roh):
    """Die Regel: der Block muss JSON sein und ein Objekt oder eine Liste ergeben."""
    wert = json.loads(roh)
    return isinstance(wert, (dict, list))


def pruefe_text(text):
    """Alle Bloecke eines Dokuments. Gibt (anzahl, [(block, zeile, meldung)]) zurueck."""
    anzahl, kaputt = 0, []
    for i, m in enumerate(BLOCK.finditer(text), 1):
        anzahl += 1
        roh = m.group(1)
        try:
            if not _parst(roh):
                zeile = text[:m.start(1)].count("\n") + 1
                kaputt.append((i, zeile, "parst, ist aber weder Objekt noch Liste"))
        except ValueError as e:
            pos = getattr(e, "pos", 0) or 0
            zeile = text[:m.start(1) + pos].count("\n") + 1
            kaputt.append((i, zeile, str(e)[:110]))
    return anzahl, kaputt


def hauptlauf():
    liste = dateien()
    if liste is None:
        print("    HINWEIS: kein Git-Index abrufbar — Stufe 72 kann nicht messen.")
        return 1
    gesamt, fails, gelesen = 0, [], 0
    for f in liste:
        try:
            text = io.open(f, encoding="utf-8", errors="replace").read()
        except Exception:
            continue
        gelesen += 1
        n, kaputt = pruefe_text(text)
        gesamt += n
        for (i, zeile, meldung) in kaputt:
            fails.append((f, i, zeile, meldung))
    print("Stufe 72: %d JSON-LD-Bloecke in %d versionierten Seiten geprueft"
          % (gesamt, gelesen))
    if not fails:
        print("\n    0 FAIL — jeder Block ist gueltiges JSON.")
        return 0
    for (f, i, zeile, meldung) in fails:
        print("    FAIL %-40s Block %d (Zeile %d): %s" % (f, i, zeile, meldung))
    print("\n    %d kaputte(r) Block/Bloecke — Suchmaschinen verwerfen das ganze "
          "Markup der Seite, nicht nur die eine Stelle." % len(fails))
    return 1


def gegenprobe():
    # Arm 1: ein gueltiger Block aus dem Korpus, ein gerades Anfuehrungszeichen hinein.
    arm1, quelle = False, None
    for f in dateien() or []:
        try:
            text = io.open(f, encoding="utf-8", errors="replace").read()
        except Exception:
            continue
        m = BLOCK.search(text)
        if not m:
            continue
        try:
            if _parst(m.group(1)):
                quelle = (f, m.group(1))
                break
        except ValueError:
            continue
    if quelle is None:
        print("    Arm 1  GRAU: kein gueltiger Block im Korpus — nichts zu verderben")
    else:
        f, roh = quelle
        s = re.search(r'"([^"\\]{10,})"', roh)
        if s is None:
            print("    Arm 1  GRAU: kein String-Wert in %s, in den sich etwas setzen liesse" % f)
        else:
            verdorben = roh[:s.start(1) + 5] + '"' + roh[s.start(1) + 5:]
            n, kaputt = pruefe_text('<script type="application/ld+json">'
                                    + verdorben + "</script>")
            arm1 = bool(kaputt)
            print("    Arm 1  gerades Anfuehrungszeichen in %s -> %s"
                  % (f, "gemeldet" if arm1 else "NICHT ERKANNT"))

    # Arm 2: der echte Fall aus der Versionsgeschichte muss wiedergefunden werden.
    arm2 = False
    ref, datei = ECHTER_FALL
    aus = _git("show", "%s:%s" % (ref, datei))
    if aus.returncode != 0:
        print("    Arm 2  GRAU: Stand %s nicht abrufbar — der echte Fall bleibt "
              "ungeprueft, kein Freifahrtschein" % ref)
    else:
        text = aus.stdout.decode("utf-8", "replace")
        n, kaputt = pruefe_text(text)
        bloecke = [m.group(1) for m in BLOCK.finditer(text)]
        faq = len(kaputt) == 1 and '"FAQPage"' in bloecke[kaputt[0][0] - 1]
        arm2 = faq
        print("    Arm 2  Korpus %s:%s: %d von %d Bloecken kaputt (erwartet 1, der "
              "FAQ-Block) -> %s" % (ref, datei, len(kaputt), n,
                                    "wiedergefunden" if arm2 else "NICHT WIEDERGEFUNDEN"))

    ok = arm1 and arm2
    print("    " + ("Gegenprobe bestanden — die Regel beisst und findet den echten Fall wieder."
                    if ok else
                    "GEGENPROBE GESCHEITERT — die Stufe beweist ihre Schaerfe nicht."))
    return 0 if ok else 1


def main():
    if "--gegenprobe" in sys.argv[1:]:
        return gegenprobe()
    return hauptlauf()


if __name__ == "__main__":
    sys.exit(main())
