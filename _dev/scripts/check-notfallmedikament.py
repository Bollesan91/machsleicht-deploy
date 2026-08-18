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

# "Alle Sprays werden verschlossen aufbewahrt" muss auch greifen — aber im Bestand
# stehen Glitzer-, Farb-, Silber- und Muecken-Spray, und die WEGZUSCHLIESSEN ist
# richtig. Deshalb das blanke Wort nur ohne diese Vorsilben.
BS = chr(92)  # kein Backslash im Quelltext — hier wurde er dreimal zum Backspace-Byte (L19/L23)
BLANKES_SPRAY = re.compile("(?<![a-zäöüß-])sprays?" + BS + "b", re.I)
KEIN_MEDIKAMENT = re.compile(r"(glitzer|farb|silber|gold|haar|deo|mücken|muecken|"
                             r"insekten|sonnen|wasser)[- ]?sprays?", re.I)


def medikament_im(text):
    """Nennt der Abschnitt ein Notfallmedikament?"""
    if MEDIKAMENT.search(text):
        return True
    return bool(BLANKES_SPRAY.search(KEIN_MEDIKAMENT.sub(" ", text)))
WEGNEHMEN = re.compile(
    r"(einsammeln|eingesammelt|einzusammeln|sammle|sammeln|abgeben|abnehmen|abgenommen|"
    r"nehmen|wegschliessen|wegschließen|weggeschlossen|verschliessen|verschließen|"
    r"verschlossen|eingeschlossen|wegraeumen|wegräumen|weggeraeumt|weggeräumt|"
    r"aufbewahren|aufbewahrt|in Verwahrung)", re.I)
# Wo ausdruecklich steht, dass NICHT eingesammelt wird, ist die Kombination korrekt.
ENTWARNUNG = re.compile(r"(nicht eingesammelt|nicht einsammeln|nicht weggeraeumt|"
                        r"nicht weggeräumt|nie eingesammelt)", re.I)

# Die erste Fassung nahm jeden Satz aus, der ein Auskunfts-Wort trug ("Liste",
# "Zettel", "Angaben"). Der Re-Check am 18.08. hat das zerlegt: Von elf inhaltlich
# falschen Saetzen kamen acht durch — darunter "Den Adrenalin-Pen bitte abgeben, wir
# fuehren eine Liste." Eine Ausnahme, die auf ein Wort IRGENDWO im Satz hoert, ist kein
# Filter, sondern ein Freifahrtschein.
#
# Jetzt entscheidet die Naehe: Steht ein Medikament unmittelbar VOR dem Verb des
# Wegnehmens, ist es dessen Objekt — egal welche Woerter sonst noch im Satz stehen.
# Verben, die Auskunft einholen (abfragen, einholen, notieren), stehen gar nicht erst
# in WEGNEHMEN.
NAEHE = 80

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
            if not medikament_im(satz):
                continue
            geprueft += 1
            if ENTWARNUNG.search(satz):
                continue
            for v in WEGNEHMEN.finditer(satz):
                # Beide Richtungen: Deutsch trennt das Verb ("Sammle die Notfallsets
                # ein", "Wir nehmen den EpiPen ab") — dann steht das Medikament HINTER
                # dem Verbteil. Der Re-Check hat genau diese drei Formen durchgebracht.
                umfeld = satz[max(0, v.start() - NAEHE):v.end() + NAEHE]
                if medikament_im(umfeld):
                    rel = os.path.relpath(pfad, REPO).replace(os.sep, "/")
                    fails.append((rel, satz[:150]))
                    break
    for rel, satz in fails[:20]:
        print('    FAIL %s: Notfallmedikament wird weggenommen — "%s"' % (rel, satz))
    if len(fails) > 20:
        print("    … und %d weitere" % (len(fails) - 20))
    print("Stufe 55: %d FAIL — %d Saetze mit Medikamenten-Bezug geprueft"
          % (len(fails), geprueft))
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
