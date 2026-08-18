# -*- coding: utf-8 -*-
"""Stufe 52: Die Bruecke zwischen Spielkarte und Spieldaten zeigt nirgends ins Leere.

Warum es diese Bruecke gibt
---------------------------
Die freien Ratgeberseiten und `data/motto` sind zwei getrennt gewachsene Kataloge
(Ticket K6). Dieselbe Taetigkeit heisst auf der Seite "2. Schloss-Ball mit Hofknicks"
und in den Daten "Koeniglicher Tanz (mit Einfrieren)". Damit die `safetyRule` eines
Spiels an der richtigen Karte landet, nennt `spielAnker` in
data/freie-seiten-regeln.json die Zuordnung ausdruecklich, statt sie zu raten. Eine
geratene Zuordnung wuerde eine Sicherheitsregel unter das FALSCHE Spiel setzen — das
ist schlimmer als gar keine Regel (Gate A / ritter, 17.08.).

Diese Stufe laedt den Renderer als Modul und benutzt SEINE Karten-Erkennung und SEINE
Normalform. Der erste Entwurf hatte beides nachgebaut und meldete prompt Karten als
fehlend, die der Renderer problemlos findet — ein Gate, das anders misst als die
Maschine, prueft die Maschine nicht (Helfer V5 R3: Wahrheit hat einen Ort).

Was geprueft wird
-----------------
1. Jede angeankerte Karte steht wirklich als `game-detail`-Karte auf der Seite.
2. Jedes angeankerte Spiel steht wirklich im Datensatz DIESER Seite.
3. Das Spiel traegt eine `safetyRule` — sonst ist der Anker wirkungslos und
   taeuscht Abdeckung vor.
4. Keine Karte traegt zwei Spiele.
5. Die Ausnahmeliste `spielAnkerOhneWortdeckung` ist weder erfunden noch veraltet.
   Gemessen wird am Kartentext OHNE die bereits gedruckte Regel — sonst pruefte die
   Stufe ihr eigenes Ergebnis: Die gedruckte Regel bringt die Woerter des Spiels mit,
   und jede Ausnahme saehe hinterher ueberfluessig aus.

Gegenprobe: einen Buchstaben in einem Kartentitel des Ankers aendern -> FAIL.
"""
import collections
import glob
import importlib.util
import io
import json
import os
import re
import sys

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

HIER = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(HIER))
ANKER_DATEI = os.path.join(REPO, "data", "freie-seiten-regeln.json")
ALTER = {"3-5": "klein", "6-8": "mittel", "9-12": "gross"}

WORT = re.compile(r"[A-Za-zÄÖÜäöüß][A-Za-zÄÖÜäöüß]{3,}")
STOPP = set("""und oder mit ohne fuer die der das ein eine dem den des im am zum zur auf
aus bei vor nach als wie sich alle jede jeder pro je ist sind wird werden kann man dann
wenn kind kinder spiel spiele minuten material ablauf jedes eines""".split())


def lade_renderer():
    pfad = os.path.join(HIER, "regeln-drucken.py")
    spec = importlib.util.spec_from_file_location("regeln_drucken", pfad)
    modul = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(modul)
    return modul


rd = lade_renderer()


def kerne(s):
    s = (s or "").lower().replace("ä", "ae").replace("ö", "oe")
    s = s.replace("ü", "ue").replace("ß", "ss")
    return {w for w in WORT.findall(s) if w not in STOPP}


def kartentexte(text):
    """{norm(titel): klartext} — Karten-Erkennung des Renderers, Regel herausgerechnet."""
    ohne_regel = rd.SPIEL_WEG.sub(" ", text)
    raus = {}
    for m in rd.KARTE_AUF.finditer(ohne_regel):
        ende = rd.karten_ende(ohne_regel, m.start())
        if ende < 0:
            continue
        u = rd.KARTE_TITEL.search(ohne_regel, m.end(), ende)
        if not u:
            continue
        titel = rd.MEHRFACH_LEER.sub(" ", rd.TAGS.sub(" ", u.group(1))).strip()
        titel = rd.NUMMER_VORN.sub("", titel).strip()
        if titel:
            roh = rd.TAGS.sub(" ", ohne_regel[m.end():ende])
            raus.setdefault(rd.norm(titel), rd.MEHRFACH_LEER.sub(" ", roh)[:1500])
    return raus


def main():
    if not os.path.exists(ANKER_DATEI):
        print("Stufe 52: keine Ankerdatei — uebersprungen")
        return 0
    d = json.load(io.open(ANKER_DATEI, encoding="utf-8"))
    anker = d.get("spielAnker") or {}
    ausnahmen = d.get("spielAnkerOhneWortdeckung") or {}

    spiele = {}
    for fp in sorted(glob.glob(os.path.join(REPO, "data", "motto", "*.json"))):
        name = os.path.basename(fp)[:-5]
        motto, _, grp = name.rpartition("-")
        if grp not in set(ALTER.values()):
            continue
        alter = next(a for a, g in ALTER.items() if g == grp)
        rel = "kindergeburtstag/%s-%s-jahre.html" % (motto, alter)
        daten = json.load(io.open(fp, encoding="utf-8"))
        eintrag = spiele.setdefault(rel, {})
        for v in (daten.get("variants") or []):
            for g in (v.get("games") or []):
                if g.get("name"):
                    eintrag[rd.norm(g["name"])] = g

    fails = []
    geprueft = 0
    ohne_deckung = collections.defaultdict(set)
    for rel, zuordnung in sorted(anker.items()):
        pfad = os.path.join(REPO, rel)
        if not os.path.exists(pfad):
            fails.append("%s: Seite existiert nicht" % rel)
            continue
        karten = kartentexte(io.open(pfad, encoding="utf-8", errors="replace").read())
        gesehen = {}
        for karten_titel, spiel_name in sorted(zuordnung.items()):
            geprueft += 1
            k, s = rd.norm(karten_titel), rd.norm(spiel_name)
            if k not in karten:
                fails.append('%s: Karte "%s" steht nicht auf der Seite' % (rel, karten_titel))
                continue
            if s not in (spiele.get(rel) or {}):
                fails.append('%s: Spiel "%s" steht nicht im Datensatz' % (rel, spiel_name))
                continue
            spiel = spiele[rel][s]
            if not (spiel.get("safetyRule") or "").strip():
                fails.append('%s: Spiel "%s" hat keine safetyRule — der Anker ist wirkungslos'
                             % (rel, spiel_name))
                continue
            if gesehen.get(k) not in (None, s):
                fails.append('%s: Karte "%s" traegt zwei verschiedene Spiele'
                             % (rel, karten_titel))
                continue
            gesehen[k] = s
            k1 = kerne(karten_titel + " " + karten[k])
            k2 = kerne(spiel["name"] + " " + str(spiel.get("material") or "") + " "
                       + str(spiel.get("description") or ""))
            if not (k1 & k2):
                ohne_deckung[rel].add(karten_titel)

    for rel, karten in sorted(ohne_deckung.items()):
        for karten_titel in sorted(karten):
            if karten_titel not in (ausnahmen.get(rel) or {}):
                fails.append('%s: Karte "%s" teilt kein Inhaltswort mit ihrem Spiel und '
                             'steht nicht in spielAnkerOhneWortdeckung' % (rel, karten_titel))
    for rel, eintraege in sorted(ausnahmen.items()):
        for karten_titel, grund in sorted(eintraege.items()):
            if karten_titel not in ohne_deckung.get(rel, set()):
                fails.append('%s: Ausnahme fuer "%s" ist tot — die Texte teilen inzwischen '
                             'Inhaltswoerter, die Begruendung prueft niemand mehr'
                             % (rel, karten_titel))
            elif len(grund.strip()) < 60:
                fails.append('%s: Ausnahme fuer "%s" ohne belastbare Begruendung'
                             % (rel, karten_titel))

    for f in fails[:25]:
        print("    FAIL %s" % f)
    if len(fails) > 25:
        print("    … und %d weitere" % (len(fails) - 25))
    print("Stufe 52: %d FAIL — %d Spielkarten-Anker auf %d Seiten geprueft, "
          "%d dokumentierte Ausnahmen"
          % (len(fails), geprueft, len(anker), sum(len(v) for v in ausnahmen.values())))
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
