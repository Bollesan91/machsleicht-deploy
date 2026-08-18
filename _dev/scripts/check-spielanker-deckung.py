# -*- coding: utf-8 -*-
"""Stufe 56: Die Luecke im Spielkarten-Kanal darf nicht wachsen.

Befund 18.08. (unabhaengiges Gutachten, W4): Stufe 52 prueft, dass jeder EINGETRAGENE
Anker stimmt — nie, dass einer fehlt. 85 von 225 Spielkarten bekommen nie eine Regel,
19 von 45 Seiten tragen keinen einzigen Kasten, und sieben Seiten haben Spielkarten und
trotzdem keinen: baustelle (3), pferde-3-5, pferde-9-12, ritter-6-8, ritter-9-12.

Der Gutachter formuliert das Risiko genau: Ein Elternteil, der dino-3-5 mit elf roten
Kaesten kennt und dann dschungel-3-5 oeffnet, hat keinen Anhaltspunkt dafuer, dass dort
schlicht nichts hinterlegt ist. Ein Kasten, der Pruefung suggeriert, ist an der Stelle
gefaehrlich, wo er FEHLT.

Diese Stufe misst die Luecke und haelt sie fest. Als "erreichbar" gilt eine Karte, zu der
es im Datensatz derselben Seite ein Spiel mit safetyRule gibt, dessen Text sich mit dem
Kartentext deutlich ueberschneidet — also ein Anker, den jemand eintragen KOENNTE.

Die Ratsche steht in `data/spielanker-deckung.json`: je Seite die heute offene Zahl.
Wird sie groesser, FAILt die Stufe. Wird sie kleiner, meldet sie es und verlangt, dass
die Datei nachgezogen wird — sonst verwaltet die Ratsche einen Stand, den es nicht
mehr gibt.

Gegenprobe: einen bestehenden Anker entfernen -> die Zahl steigt -> FAIL.
"""
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
RATSCHE = os.path.join(REPO, "data", "spielanker-deckung.json")
ALTER = {"3-5": "klein", "6-8": "mittel", "9-12": "gross"}
SCHWELLE = 0.34

WORT = re.compile(r"[A-Za-zÄÖÜäöüß][A-Za-zÄÖÜäöüß]{3,}")
STOPP = set("""und oder mit ohne fuer die der das ein eine dem den des im am zum zur auf
aus bei vor nach als wie sich alle jede jeder pro je ist sind wird werden kann man dann
wenn kind kinder spiel spiele minuten material ablauf jedes eines""".split())


def lade_renderer():
    spec = importlib.util.spec_from_file_location(
        "regeln_drucken", os.path.join(HIER, "regeln-drucken.py"))
    modul = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(modul)
    return modul


rd = lade_renderer()


def kerne(s):
    s = (s or "").lower().replace("ä", "ae").replace("ö", "oe")
    s = s.replace("ü", "ue").replace("ß", "ss")
    return {w for w in WORT.findall(s) if w not in STOPP}


def main():
    anker = rd.lade_anker()
    offen_je_seite = {}
    karten_gesamt = erreichbar_gesamt = 0

    for pfad in sorted(glob.glob(os.path.join(REPO, "data", "motto", "*.json"))):
        name = os.path.basename(pfad)[:-5]
        motto, _, grp = name.rpartition("-")
        if grp not in set(ALTER.values()):
            continue
        alter = next(a for a, g in ALTER.items() if g == grp)
        rel = "kindergeburtstag/%s-%s-jahre.html" % (motto, alter)
        seite = os.path.join(REPO, rel)
        if not os.path.exists(seite):
            continue
        roh = io.open(seite, encoding="utf-8", errors="replace").read()
        daten = json.load(io.open(pfad, encoding="utf-8"))

        spiele = []
        for v in (daten.get("variants") or []):
            for g in (v.get("games") or []):
                if g.get("name") and (g.get("safetyRule") or "").strip():
                    spiele.append(kerne(g["name"] + " " + str(g.get("material") or "")
                                        + " " + str(g.get("description") or "")))
        vorhanden = {rd.norm(k) for k in ((anker.get("spielAnker") or {}).get(rel) or {})}

        # Kartentexte ohne die bereits gedruckte Regel
        ohne_regel = rd.SPIEL_WEG.sub(" ", roh)
        offen = 0
        for m in rd.KARTE_AUF.finditer(ohne_regel):
            ende = rd.karten_ende(ohne_regel, m.start())
            if ende < 0:
                continue
            u = rd.KARTE_TITEL.search(ohne_regel, m.end(), ende)
            if not u:
                continue
            titel = rd.MEHRFACH_LEER.sub(" ", rd.TAGS.sub(" ", u.group(1))).strip()
            titel = rd.NUMMER_VORN.sub("", titel).strip()
            if not titel:
                continue
            karten_gesamt += 1
            if rd.norm(titel) in vorhanden:
                continue
            k1 = kerne(titel + " " + rd.TAGS.sub(" ", ohne_regel[m.end():ende])[:1200])
            if any(len(k1 & k2) / max(1, len(k2)) >= SCHWELLE for k2 in spiele):
                offen += 1
                erreichbar_gesamt += 1
        if offen:
            offen_je_seite[rel] = offen

    if not os.path.exists(RATSCHE):
        io.open(RATSCHE, "w", encoding="utf-8", newline="").write(
            json.dumps({"stand": offen_je_seite}, ensure_ascii=False, indent=2) + "\n")
        print("Stufe 56: Ratsche neu angelegt mit %d offenen Karten auf %d Seiten"
              % (erreichbar_gesamt, len(offen_je_seite)))
        return 0

    stand = (json.load(io.open(RATSCHE, encoding="utf-8")) or {}).get("stand") or {}
    fails = []
    for rel, n in sorted(offen_je_seite.items()):
        erlaubt = stand.get(rel, 0)
        if n > erlaubt:
            fails.append("%s: %d erreichbare Karten ohne Anker, erlaubt sind %d"
                         % (rel, n, erlaubt))
    for rel, erlaubt in sorted(stand.items()):
        n = offen_je_seite.get(rel, 0)
        if n < erlaubt:
            fails.append("%s: nur noch %d offen statt %d — zieh die Ratsche nach, sonst "
                         "verwaltet sie einen Stand, den es nicht mehr gibt" % (rel, n, erlaubt))

    for f in fails[:20]:
        print("    FAIL %s" % f)
    print("Stufe 56: %d FAIL — %d Spielkarten, davon %d erreichbar und ohne Anker "
          "auf %d Seiten" % (len(fails), karten_gesamt, erreichbar_gesamt,
                             len(offen_je_seite)))
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
