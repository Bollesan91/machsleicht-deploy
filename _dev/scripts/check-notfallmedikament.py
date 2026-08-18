# -*- coding: utf-8 -*-
"""Stufe 55: Ein Notfallmedikament darf nirgends eingesammelt oder weggeraeumt werden.

Befund 18.08. (unabhaengiges Gutachten, selbst primaerverifiziert): Auf allen vier
Schlafparty-Mottos stand — im Datensatz, im Bundle und handgeschrieben auf den Seiten —

    "Eltern-Opt-In schriftlich. Allergien, Asthma-Inhalator und Medikamente vorher
     einsammeln."

Das ist die Umkehrung der richtigen Anweisung. Primaerquellen:

  * Deutscher Allergie- und Asthmabund (DAAB), "Auf den Notfall vorbereitet sein" und
    "Anaphylaxie in Kita und Schule": Das Notfallset gehoert an einen leicht
    zugaenglichen, sicheren, gut erreichbaren Ort und soll grundsaetzlich von der
    betroffenen Person selbst mitgefuehrt werden, sobald das Alter es zulaesst.
  * Deutsche Atemwegsliga, "Asthma und Sport — Hinweise fuer Eltern, Kindergarten,
    Schule und Sportvereine": Das inhalierbare Notfallmedikament muss im Anfall sofort
    verfuegbar sein.

Betroffen waren ausgerechnet Schlafpartys im abgedunkelten Raum, wo Suchen am teuersten
ist, bei 9- bis 12-Jaehrigen, die ihr Spray ueblicherweise selbst tragen.

Diese Stufe verbietet die Kombination aus einem Notfallmedikament und einem Verb des
Wegnehmens im selben Satz. Sie prueft die Daten UND die ausgelieferten Seiten, weil der
Satz an beiden Orten stand.

Gegenprobe: "Asthmaspray vorher einsammeln" irgendwo einfuegen -> FAIL.
"""
import glob
import io
import os
import re
import sys

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

MEDIKAMENT = re.compile(
    r"(notfallmedikament|notfallset|notfallspray|asthmaspray|asthma-?spray|inhalator|"
    r"adrenalin-?pen|autoinjektor|epipen|jext|medikament)", re.I)
WEGNEHMEN = re.compile(
    r"(einsammeln|eingesammelt|einzusammeln|abgeben|abnehmen|abgenommen|wegschliessen|"
    r"wegschließen|weggeschlossen|verschliessen|verschließen|wegraeumen|wegräumen|"
    r"weggeraeumt|weggeräumt|aufbewahren wir|in Verwahrung)", re.I)
# Wo ausdruecklich steht, dass NICHT eingesammelt wird, ist die Kombination korrekt.
ENTWARNUNG = re.compile(r"(nicht eingesammelt|nicht einsammeln|nicht weggeraeumt|"
                        r"nicht weggeräumt|nie eingesammelt)", re.I)

# Wer "Allergien und Medikamente per WhatsApp einsammelt", sammelt die AUSKUNFT ein,
# nicht das Spray. Der erste Entwurf dieser Stufe meldete genau diese Saetze als Fehler
# — und haette mich beinahe dazu gebracht, korrekten Text umzuschreiben. Ein Gate, das
# gute Formulierungen bestraft, macht blind (Lektion L22).
AUSKUNFT = re.compile(r"(per WhatsApp|per Mail|per E-?Mail|Abfrage|abfragen|Bestätigung|"
                      r"Bestaetigung|Formular|Liste|Zettel|Umfrage|Rückmeldung|"
                      r"Rueckmeldung|Info|Angaben)", re.I)

TAG = re.compile(r"<[^>]+>")
SATZ = re.compile(r"[^.!?;]+[.!?;]?")


def saetze(text):
    for m in SATZ.finditer(text):
        s = m.group(0).strip()
        if len(s) > 15:
            yield s


def quellen():
    for p in sorted(glob.glob(os.path.join(REPO, "data", "motto", "*.json"))):
        yield p, io.open(p, encoding="utf-8", errors="replace").read()
    for p in sorted(glob.glob(os.path.join(REPO, "_src", "elite-motto-data", "*.json"))):
        yield p, io.open(p, encoding="utf-8", errors="replace").read()
    b = os.path.join(REPO, "_src", "elite-motto-data", "_bundle.js")
    if os.path.exists(b):
        yield b, io.open(b, encoding="utf-8", errors="replace").read()
    for p in sorted(glob.glob(os.path.join(REPO, "kindergeburtstag", "*.html"))):
        roh = io.open(p, encoding="utf-8", errors="replace").read()
        roh = re.sub(r"<(script|style)\b.*?</\1>", " ", roh, flags=re.S | re.I)
        yield p, TAG.sub(" ", roh)


def main():
    fails = []
    geprueft = 0
    for pfad, text in quellen():
        text = re.sub(r"\s+", " ", text)
        for satz in saetze(text):
            if not MEDIKAMENT.search(satz):
                continue
            geprueft += 1
            if (WEGNEHMEN.search(satz) and not ENTWARNUNG.search(satz)
                    and not AUSKUNFT.search(satz)):
                rel = os.path.relpath(pfad, REPO).replace(os.sep, "/")
                fails.append((rel, satz[:150]))
    for rel, satz in fails[:20]:
        print('    FAIL %s: Notfallmedikament wird weggenommen — "%s"' % (rel, satz))
    if len(fails) > 20:
        print("    … und %d weitere" % (len(fails) - 20))
    print("Stufe 55: %d FAIL — %d Saetze mit Medikamenten-Bezug geprueft"
          % (len(fails), geprueft))
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
