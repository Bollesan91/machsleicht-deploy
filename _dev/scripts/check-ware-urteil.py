# -*- coding: utf-8 -*-
"""Stufe 48: Dieselbe Ware darf nicht an einer Stelle eine Regel tragen und an
einer anderen als harmlos abgehakt sein — jedenfalls nicht fuer juengere Kinder.

Das war der zweitwichtigste Befund aus Gate B (17.08., Opus 5 Max): Der Gutachter
fand sechs Warengruppen, bei denen die harmlos-Datei eine gedruckte Regel wieder
aufhebt — Walkie-Talkies, LED-Deko, UV-Lampe, Fernrohre, Bandanas, Gummibaerchen.
Alle sechs gegen die Daten nachgeprueft und bestaetigt, zum Beispiel:

    REGEL    safari-6-8   "Prueft die Batteriefaecher der Walkie-Talkies auf die
                           Schraube — guenstige Sets haben Klickdeckel"
    HARMLOS  detektiv-6-8 "Kinder-Funkgeraete mit Standardbatterien (keine
                           Knopfzellen ueblich)"

Gleiche Ware, gleiche Altersgruppe, gegenteilige Aussage. Der Leser sieht immer
nur eine Seite und kann den Widerspruch nicht bemerken — deshalb ist diese Klasse
gefaehrlicher als ein einzelner falscher Hinweis.

Der Warenkern wird mechanisch aus dem Label gezogen (keine Vokabelliste — die
faengt nur, was sie schon kennt; Lektion L17). Gemeldet wird ein Kern nur, wenn
er in mindestens zwei Mottos vorkommt und mindestens einmal eine echte Regel
traegt: dann ist bewiesen, dass jemand ihn fuer regelbeduerftig hielt.

FAIL = die harmlos-Entscheidung betrifft eine Altersgruppe, die gleich alt oder
JUENGER ist als die, fuer die eine Regel gedruckt wird. Aelter darf abweichen —
"fuer 9-12 kein Thema" ist ein zulaessiges Urteil, "fuer 3-5 kein Thema, obwohl
9-12 eine Regel hat" nicht.

Gegenprobe: eine harmlos-Begruendung auf eine Ware setzen, die anderswo eine
Regel traegt -> FAIL steigt; zuruecksetzen -> alter Stand.
"""
import io
import json
import os
import re
import sys
import glob
import collections

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
ALTER = {"klein": 0, "mittel": 1, "gross": 2}
GRUPPENNAME = {"klein": "3-5", "mittel": "6-8", "gross": "9-12"}

# Woerter, die keine Ware benennen (Mengen, Verpackung, Fuellwoerter).
#
# "Becher" kam am 17.08. dazu, nachdem die Stufe damit vier Runden lang neue
# Paarungen produzierte: detektiv-Trinkbecher gegen prinzessin-Stapelbecher, gegen
# feen-Wildpflanzen-Becher, gegen dschungel-Test-Becher. Jede Regel war echt, aber
# keine handelte VOM BECHER — sie handelte vom Inhalt oder vom Spiel. Ein Becher
# traegt in keiner Altersgruppe ein eigenes Risiko: nicht scharf, nicht
# verschluckbar. Vier Einzel-Ausnahmen dafuer waeren ein Symptom-Pflaster gewesen;
# die Ursache ist, dass Behaelterwoerter keine Warenkerne sind. Dasselbe gilt fuer
# Schalen, Teller, Flaschen und Halme.
STOPP = set("""
und oder mit ohne fuer für pro bzw etc inkl optional stueck stück set sets paar
gross groß klein mittel bunt bunte bunten neu neue gute guter viele mehr etwa
extra premium standard minimal deluxe komplett komplettes zusaetzlich zusätzlich
material zubehoer zubehör packung packungen beutel tuete tüte tueten tüten dose
karton schachtel rolle rollen meter liter gramm stk stck kinder kind jedes jeder
becher becherchen glaeser gläser schale schalen teller flasche flaschen halme
strohhalme trinkhalme
farben farbe wahl teile teilen sorte sorten mix variante varianten
""".split())

WORT = re.compile(r"[A-Za-zÄÖÜäöüß][A-Za-zÄÖÜäöüß\-]{4,}")


def kerne(label):
    """Inhaltswoerter eines Postens, kleingeschrieben, ohne Fuellwoerter."""
    roh = re.sub(r"\(.*?\)", " ", label)
    return {w.lower() for w in WORT.findall(roh) if w.lower() not in STOPP}


def lade():
    vorkommen = collections.defaultdict(list)
    for pfad in sorted(glob.glob(os.path.join(REPO, "data", "motto", "*.json"))):
        name = os.path.basename(pfad)[:-5]
        motto, _, gruppe = name.rpartition("-")
        if gruppe not in ALTER:
            continue
        daten = json.load(io.open(pfad, encoding="utf-8"))
        for variante in daten["variants"]:
            for posten in (variante.get("shoppingList") or []):
                label = posten.get("label") or ""
                note = (posten.get("safetyNote") or "").strip()
                chk = (posten.get("safetyChecked") or "").strip()
                if not note and not chk:
                    continue
                for kern in kerne(label):
                    vorkommen[kern].append(
                        {"motto": motto, "gruppe": gruppe, "variante": variante["id"],
                         "label": label, "regel": bool(note),
                         "text": (note or chk)})
    return vorkommen


# Belegte Ausnahmen — angesetzt am regeltragenden POSTEN, nicht am Motto-Paar.
#
# Der Warenkern wird mechanisch aus dem Label gezogen (kein Vokabular, s. L17).
# Das trifft auch Buendel-Posten, deren Regel von einer ANDEREN Zutat derselben
# Zeile handelt — "Lupe + kleine Becher" traegt die Lupen-Regel, nicht eine
# Becher-Regel. Ein solcher Posten darf nicht als Beleg gegen andere gelten.
#
# Am Motto-Paar aufgehaengt waere die Ausnahme bruechig: Derselbe Buendel-Posten
# taucht dann gegen jedes weitere Motto neu auf, und die Liste waechst endlos.
# Schluessel ist deshalb (Warenkern, Motto-Datei, Label-Anfang). Aendert sich das
# Label, greift die Ausnahme nicht mehr und die Stufe schlaegt wieder an.
NICHT_EINSCHLAEGIG = {
    # Leer. Der Gewichts-Filter schliesst Buendel-Posten bereits aus; jede
    # Einzel-Ausnahme waere damit eine Behauptung ohne Fall. Neue Eintraege
    # brauchen den Schluessel (Warenkern, Motto-Datei, Label-Anfang) und einen
    # Grund, und die Stufe FAILt, sobald ein Eintrag nicht mehr greift.
}


def gewicht(kern, label):
    """Anteil, den dieser Kern an den Inhaltswoertern des Postens hat."""
    k = kerne(label)
    if not k:
        return 0.0
    return (1.0 if kern in k else 0.0) / len(k)


def ausgenommen(kern, eintrag, genutzt):
    """Traegt dieser Posten die Regel wirklich fuer DIESEN Warenkern?"""
    datei = "%s-%s" % (eintrag["motto"], eintrag["gruppe"])
    for (k, d, anfang), _grund in NICHT_EINSCHLAEGIG.items():
        if k == kern and d == datei and eintrag["label"].startswith(anfang):
            genutzt.add((k, d, anfang))
            return True
    return False


def main():
    vorkommen = lade()
    fails, geprueft = [], 0
    genutzt = set()
    for kern, liste in sorted(vorkommen.items()):
        mottos = {e["motto"] for e in liste}
        mit = [e for e in liste if e["regel"]]
        ohne = [e for e in liste if not e["regel"]]
        if len(mottos) < 2 or not mit or not ohne:
            continue
        # Die Regel muss von DIESER Ware handeln, nicht von einer anderen Zutat
        # desselben Buendel-Postens ("Wraps + Belag" traegt die Ofen-Regel).
        #
        # Erster Entwurf verlangte, dass der Regeltext das Warenwort WIEDERHOLT.
        # Die Gegenprobe hat ihn widerlegt: Nachdem die Regeln neu geschrieben
        # waren, sprachen sie von "Geraeten", "Funkgeraet", "Batteriefaechern" —
        # gutes Deutsch, aber kein einziges "Walkie". Damit fand die Stufe fuer
        # den Kern 'walkie-talkies' keine einschlaegige Regel mehr und uebersah
        # ihren eigenen Gruendungsfall. Ein Filter, der gute Formulierungen
        # bestraft, ist der falsche Filter.
        #
        # Zweiter Entwurf ohne jeden Filter: 180 FAIL ueber 51 Kerne — die
        # Buendel-Posten schlugen alle wieder durch.
        #
        # Der tragfaehige Filter fragt nicht nach Wortwiederholung, sondern nach
        # GEWICHT: Ein Posten gilt nur als Beleg fuer den Kern, der ihn dominiert.
        # "Walkie-Talkies fuer die Schatzsuche" hat zwei Inhaltswoerter, der Kern
        # ist die Haelfte davon — der Posten IST das Funkgeraet. "Papiertueten +
        # Gummibaerchen + Ausmalbilder" hat drei, das Papier ist ein Drittel — der
        # Posten ist nicht das Papier. Das ist unabhaengig davon, wie die Regel
        # formuliert ist, und bestraft keine Synonyme.
        einschlaegig = [e for e in mit
                        if gewicht(kern, e["label"]) >= 0.34
                        and not ausgenommen(kern, e, genutzt)]
        if not einschlaegig:
            continue
        geprueft += 1
        # Aelteste Gruppe, fuer die jemand eine Regel noetig fand. Alles, was
        # gleich alt oder JUENGER als harmlos gilt, widerspricht ihr: Reifung
        # nach oben ist zulaessig ("mit 9 kein Thema mehr"), nach unten nie.
        aelteste_regel = max(ALTER[e["gruppe"]] for e in einschlaegig)
        for e in ohne:
            if ALTER[e["gruppe"]] <= aelteste_regel:
                beleg = max((x for x in einschlaegig if ALTER[x["gruppe"]] == aelteste_regel),
                            key=lambda x: x["motto"])
                fails.append((kern, e, beleg))
    # je Warenkern nur einmal melden, sonst erschlaegt ein Kern den Bericht
    gesehen, kurz = set(), []
    for kern, e, beleg in fails:
        if kern in gesehen:
            continue
        gesehen.add(kern)
        kurz.append((kern, e, beleg))
    for kern, e, beleg in kurz:
        print("    FAIL \"%s\": %s-%s haelt es fuer harmlos, %s-%s druckt eine Regel"
              % (kern, e["motto"], GRUPPENNAME[e["gruppe"]],
                 beleg["motto"], GRUPPENNAME[beleg["gruppe"]]))
        print("           harmlos: %s" % e["text"][:105])
        print("           Regel  : %s" % beleg["text"][:105])
    anzahl = len({(k, e["motto"], e["gruppe"], e["label"]) for k, e, _ in fails})
    # Eine Ausnahme, die nie greift, ist eine Luege ueber den Bestand: Sie
    # behauptet einen Fall, den es nicht mehr gibt, und deckt beim naechsten Mal
    # womoeglich einen echten Widerspruch zu.
    tot = sorted(set(NICHT_EINSCHLAEGIG) - genutzt)
    for t in tot:
        print("    FAIL Ausnahme greift nicht mehr und ist damit unbelegt: %s" % (t,))
    print("Stufe 48: %d FAIL (%d Warenkerne betroffen, %d belegte Ausnahmen aktiv) — "
          "%d mehrfach verwendete Warenkerne geprueft"
          % (anzahl + len(tot), len(kurz), len(genutzt), geprueft))
    return 1 if (fails or tot) else 0


if __name__ == "__main__":
    sys.exit(main())
