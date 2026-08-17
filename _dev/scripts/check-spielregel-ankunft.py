# -*- coding: utf-8 -*-
"""Stufe 49: Ein Verbot aus der Spielregel muss bei den gedruckten Regeln ankommen.

Befund aus Gate A / ritter (17.08., Opus 5 Max, Score 54/100). Der Gutachter hat
den Grund in einem Satz benannt:

    "Die Regeln wurden an den Einkaufsposten geschrieben, nicht an den Spieldaten.
     Deshalb behaupten mehrere Regeln eine Verwendung, die im Spiel nicht vorkommt
     — und erlauben teils, was die Spieldaten ausdruecklich verbieten."

Vier Belege, alle gegen die Quelle geprueft:
  * Spiel: "Bogen NIE auf Personen richten" — keine der VIER gedruckten
    Bogen-Regeln enthaelt den Satz.
  * Spiel: "Immer nur EIN Kind schiesst" — gedruckt stehen zwei gleichzeitige
    Schuetzen.
  * Spiel: "KEIN Sparring zwischen Kindern", "Niemals auf Kind" — gedruckt steht
    "im Zweikampf gilt nur Koerper und Schild".
  * Spiel: "Schwert trifft nur Polster, NIE Koerper" — gedruckt steht ein
    Schild-Duell fuer Dreijaehrige.

Die gefaehrliche Richtung ist nicht die fehlende Regel, sondern die gedruckte
Regel, die LOCKERER ist als das Konzept: Der Elternteil liest die Einkaufsliste,
nicht das JSON.

Was diese Stufe prueft
----------------------
Je Variante: Jeder VERBOTS-Satz aus einer `games[].safetyRule` muss bei den
gedruckten `safetyNote`s derselben Variante ankommen. Ein Satz zaehlt als Verbot,
wenn er ein Verbotswort (nie, niemals, kein, nur, max, Pflicht) UND ein
Risiko-Wort (Kopf, Auge, Hals, Person, Feuer, heiss, werfen, schlagen, schiessen,
Mund, verschlucken, …) enthaelt. Ohne Risiko-Wort ist es Spielmechanik
("Sitz-Spiel, keine Sicherheit noetig") und kein Sicherheitsverbot.

Angekommen heisst: mindestens ein Drittel der Inhaltswoerter des Verbotssatzes
steht IRGENDWO AUF DER FREIEN SEITE — als gedruckte Einkaufs-Regel oder im
Spieltext der Seite. Bewusst grosszuegig: die Stufe soll klaffende Luecken zeigen,
nicht Synonyme bestrafen (Lektion L22).

Gemessen wird am PRODUKT, nicht am Katalog (Lektion L17). Der erste Entwurf sah
nur die `safetyNote`s und meldete 400 von 493 Verboten als fehlend. Die Gegenprobe
an sechs Stichproben widerlegte das: "KEIN Sparring" steht 1x und "trifft nur
Polster" 3x auf der ritter-Seite — im handgeschriebenen Spieltext, den kein
Generator kennt (`safetyRule` kommt in keinem der beiden Renderer vor).

Damit wird der ritter-Befund SCHAERFER statt milder: Die Seite sagt an einer
Stelle "Schwert trifft nur Polster" und an anderer "Geschlagen wird ausschliesslich
aufs Schild … Immer nur zwei Kinder gleichzeitig". Das ist kein Loch, das ist ein
Widerspruch auf derselben Seite.
"""
import collections
import io
import json
import os
import re
import sys
import glob

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
GRUPPEN = {"klein": "3-5", "mittel": "6-8", "gross": "9-12"}

VERBOT = re.compile(r"\b(nie|niemals|kein|keine|keinen|keiner|nur|max|maximal|"
                    r"pflicht|verboten|tabu|ausschliesslich|ausschließlich)\b", re.I)
RISIKO = re.compile(r"(kopf|gesicht|auge|augen|hals|person|mensch|kind|feuer|flamme|"
                    r"heiss|heiß|verbrenn|werf|wurf|schlag|schiess|schieß|stich|spitz|"
                    r"mund|verschluck|erstick|ertrink|wasser|strom|batterie|klinge|"
                    r"schere|messer|allergi|sturz|fallen|rutsch|brand)", re.I)

STOPP = set("""und oder mit ohne fuer für die der das ein eine einem einen dem den des
ist sind hat haben wird werden kann koennen können soll sollen darf duerfen dürfen
auch noch schon dann wenn bei vor nach aus vom zum zur als wie sich alle jede jeder
jedes immer nie nur kein keine sehr mehr etwa dabei damit dazu""".split())
WORT = re.compile(r"[A-Za-zÄÖÜäöüß][A-Za-zÄÖÜäöüß-]{3,}")

# Deckungsgrad, ab dem ein Verbot als angekommen gilt.
SCHWELLE = 0.34

# Regex bewusst aus Teilen zusammengesetzt: Zweimal ist an dieser Zeile ein
# Backslash-b zum Backspace-Byte geworden (Lektion L19, Heredoc-Falle). So
# kann es nicht mehr passieren, weil im Quelltext kein Backslash steht.
SKRIPT_WEG = re.compile("<(script|style)" + chr(92) + "b[^>]*>.*?</"
                        + chr(92) + "1>", re.S | re.I)


def inhalt(text):
    return {w.lower() for w in WORT.findall(text) if w.lower() not in STOPP}


def verbote(regel):
    """Verbots-Saetze einer Spielregel — mit Risikobezug, ohne Spielmechanik."""
    raus = []
    for satz in re.split(r"(?<=[.!?;])\s+|\s*·\s*", regel):
        satz = satz.strip()
        if len(satz) < 12:
            continue
        if VERBOT.search(satz) and RISIKO.search(satz):
            raus.append(satz)
    return raus


def main():
    fails = []
    geprueft = 0
    je_motto = collections.Counter()
    for pfad in sorted(glob.glob(os.path.join(REPO, "data", "motto", "*.json"))):
        name = os.path.basename(pfad)[:-5]
        motto, _, gruppe = name.rpartition("-")
        if gruppe not in GRUPPEN:
            continue
        daten = json.load(io.open(pfad, encoding="utf-8"))
        seite = os.path.join(REPO, "kindergeburtstag",
                             "%s-%s-jahre.html" % (motto, GRUPPEN[gruppe]))
        seitentext = ""
        if os.path.exists(seite):
            roh = io.open(seite, encoding="utf-8", errors="replace").read()
            # Skript- und Style-Bloecke raus: Das JSON-LD im <script> traegt die
            # Spieltexte noch einmal, und ein Verbot, das nur dort steht, liest kein
            # Elternteil. Erster Entwurf hatte hier Steuerzeichen statt der
            # Escape-Sequenzen (Heredoc-Falle, Lektion L19): Der Regex traf nichts
            # und das Gate wurde dadurch zu milde.
            roh = SKRIPT_WEG.sub(" ", roh)
            seitentext = re.sub(r"<[^>]+>", " ", roh)
        seiten_worte = inhalt(seitentext)
        for variante in daten["variants"]:
            gedruckt = " ".join((it.get("safetyNote") or "")
                                for it in (variante.get("shoppingList") or []))
            # Produkt-Sicht: die Regel der Einkaufsliste UND der Text der Seite
            gedruckt_worte = inhalt(gedruckt) | seiten_worte
            for spiel in (variante.get("games") or []):
                for satz in verbote(spiel.get("safetyRule") or ""):
                    kerne = inhalt(satz)
                    if not kerne:
                        continue
                    geprueft += 1
                    deckung = len(kerne & gedruckt_worte) / len(kerne)
                    if deckung < SCHWELLE:
                        fails.append((name, variante["id"],
                                      (spiel.get("name") or "?")[:26], satz, deckung))
                        je_motto[motto] += 1
    for name, vid, spiel, satz, deckung in fails[:25]:
        print("    FAIL %s [%s] %s: Verbot kommt nicht an (%.0f %% Deckung) — \"%s\""
              % (name, vid, spiel, 100 * deckung, satz[:96]))
    if len(fails) > 25:
        print("    … und %d weitere" % (len(fails) - 25))
    if je_motto:
        print("    je Motto: %s" % ", ".join("%s %d" % (m, n) for m, n in je_motto.most_common()))
    print("Stufe 49: %d FAIL — %d Verbote aus Spielregeln geprueft" % (len(fails), geprueft))
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
