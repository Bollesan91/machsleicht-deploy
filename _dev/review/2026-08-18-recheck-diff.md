# Re-Check-Diff: was seit dem Gutachten (46/100) geaendert wurde

Stand des Gutachtens: `df1b7ffb` -> HEAD. Ungekuerzt, ohne die 45 gerenderten Seiten.

```diff
diff --git a/_dev/scripts/check-kleinteil-grenze.py b/_dev/scripts/check-kleinteil-grenze.py
index 40828969..6e62bd03 100644
--- a/_dev/scripts/check-kleinteil-grenze.py
+++ b/_dev/scripts/check-kleinteil-grenze.py
@@ -37,6 +37,14 @@ GRENZE_CM = 4.0
 
 MASS = re.compile(r"(mindestens|mind\.|ab|groesser als|größer als|über)\s*"
                   r"(\d{1,2})(?:[,.](\d))?\s*(?:cm|Zentimeter)", re.I)
+
+# Zweite Form derselben Aussage: nicht "mindestens 4 cm", sondern "< 3 cm vermeiden".
+# Sie sagt dasselbe und war 18.08. der Weg, auf dem eine zu kleine Zahl durchs Gate kam
+# — auf dino-3-5 stand gedruckt "Mini-Dinos &lt; 3 cm vermeiden", waehrend dieselbe
+# Seite dreimal die Klopapierrollen-Probe fuehrt. Wer eine Obergrenze fuer das
+# VERBOTENE nennt, setzt damit eine Untergrenze fuer das Erlaubte.
+MASS_VERMEIDEN = re.compile(r"(?:&lt;|<|kleiner als|unter|weniger als)\s*"
+                            r"(\d{1,2})(?:[,.](\d))?\s*(?:cm|Zentimeter)", re.I)
 # Erstickungs-Kontext: die Zahl muss als Schutzgrenze gemeint sein, nicht als Bastelmass
 KONTEXT = re.compile(r"(Verschluck|Erstick|Kleinteil|Klopapierrolle|in den Mund|"
                      r"Mund-Reichweite|Sicherheit|Schluck)", re.I)
@@ -57,12 +65,14 @@ def main():
     geprueft = 0
     for pfad in seiten:
         text = fliesstext(pfad)
-        for m in MASS.finditer(text):
+        treffer = [(m, 2, 3) for m in MASS.finditer(text)]
+        treffer += [(m, 1, 2) for m in MASS_VERMEIDEN.finditer(text)]
+        for m, g_ganz, g_dezi in sorted(treffer, key=lambda x: x[0].start()):
             umfeld = text[max(0, m.start() - UMKREIS):m.end() + UMKREIS]
             if not KONTEXT.search(umfeld):
                 continue
             geprueft += 1
-            wert = float("%s.%s" % (m.group(2), m.group(3) or "0"))
+            wert = float("%s.%s" % (m.group(g_ganz), m.group(g_dezi) or "0"))
             if wert < GRENZE_CM:
                 stelle = re.sub(r"\s+", " ", text[max(0, m.start() - 70):m.end() + 50]).strip()
                 fails.append((os.path.basename(pfad), m.group(0), wert, stelle))
diff --git a/_dev/scripts/check-notfallmedikament.py b/_dev/scripts/check-notfallmedikament.py
new file mode 100644
index 00000000..d3f9afd4
--- /dev/null
+++ b/_dev/scripts/check-notfallmedikament.py
@@ -0,0 +1,106 @@
+# -*- coding: utf-8 -*-
+"""Stufe 55: Ein Notfallmedikament darf nirgends eingesammelt oder weggeraeumt werden.
+
+Befund 18.08. (unabhaengiges Gutachten, selbst primaerverifiziert): Auf allen vier
+Schlafparty-Mottos stand — im Datensatz, im Bundle und handgeschrieben auf den Seiten —
+
+    "Eltern-Opt-In schriftlich. Allergien, Asthma-Inhalator und Medikamente vorher
+     einsammeln."
+
+Das ist die Umkehrung der richtigen Anweisung. Primaerquellen:
+
+  * Deutscher Allergie- und Asthmabund (DAAB), "Auf den Notfall vorbereitet sein" und
+    "Anaphylaxie in Kita und Schule": Das Notfallset gehoert an einen leicht
+    zugaenglichen, sicheren, gut erreichbaren Ort und soll grundsaetzlich von der
+    betroffenen Person selbst mitgefuehrt werden, sobald das Alter es zulaesst.
+  * Deutsche Atemwegsliga, "Asthma und Sport — Hinweise fuer Eltern, Kindergarten,
+    Schule und Sportvereine": Das inhalierbare Notfallmedikament muss im Anfall sofort
+    verfuegbar sein.
+
+Betroffen waren ausgerechnet Schlafpartys im abgedunkelten Raum, wo Suchen am teuersten
+ist, bei 9- bis 12-Jaehrigen, die ihr Spray ueblicherweise selbst tragen.
+
+Diese Stufe verbietet die Kombination aus einem Notfallmedikament und einem Verb des
+Wegnehmens im selben Satz. Sie prueft die Daten UND die ausgelieferten Seiten, weil der
+Satz an beiden Orten stand.
+
+Gegenprobe: "Asthmaspray vorher einsammeln" irgendwo einfuegen -> FAIL.
+"""
+import glob
+import io
+import os
+import re
+import sys
+
+sys.stdout.reconfigure(encoding="utf-8", errors="replace")
+
+REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
+
+MEDIKAMENT = re.compile(
+    r"(notfallmedikament|notfallset|notfallspray|asthmaspray|asthma-?spray|inhalator|"
+    r"adrenalin-?pen|autoinjektor|epipen|jext|medikament)", re.I)
+WEGNEHMEN = re.compile(
+    r"(einsammeln|eingesammelt|einzusammeln|abgeben|abnehmen|abgenommen|wegschliessen|"
+    r"wegschließen|weggeschlossen|verschliessen|verschließen|wegraeumen|wegräumen|"
+    r"weggeraeumt|weggeräumt|aufbewahren wir|in Verwahrung)", re.I)
+# Wo ausdruecklich steht, dass NICHT eingesammelt wird, ist die Kombination korrekt.
+ENTWARNUNG = re.compile(r"(nicht eingesammelt|nicht einsammeln|nicht weggeraeumt|"
+                        r"nicht weggeräumt|nie eingesammelt)", re.I)
+
+# Wer "Allergien und Medikamente per WhatsApp einsammelt", sammelt die AUSKUNFT ein,
+# nicht das Spray. Der erste Entwurf dieser Stufe meldete genau diese Saetze als Fehler
+# — und haette mich beinahe dazu gebracht, korrekten Text umzuschreiben. Ein Gate, das
+# gute Formulierungen bestraft, macht blind (Lektion L22).
+AUSKUNFT = re.compile(r"(per WhatsApp|per Mail|per E-?Mail|Abfrage|abfragen|Bestätigung|"
+                      r"Bestaetigung|Formular|Liste|Zettel|Umfrage|Rückmeldung|"
+                      r"Rueckmeldung|Info|Angaben)", re.I)
+
+TAG = re.compile(r"<[^>]+>")
+SATZ = re.compile(r"[^.!?;]+[.!?;]?")
+
+
+def saetze(text):
+    for m in SATZ.finditer(text):
+        s = m.group(0).strip()
+        if len(s) > 15:
+            yield s
+
+
+def quellen():
+    for p in sorted(glob.glob(os.path.join(REPO, "data", "motto", "*.json"))):
+        yield p, io.open(p, encoding="utf-8", errors="replace").read()
+    for p in sorted(glob.glob(os.path.join(REPO, "_src", "elite-motto-data", "*.json"))):
+        yield p, io.open(p, encoding="utf-8", errors="replace").read()
+    b = os.path.join(REPO, "_src", "elite-motto-data", "_bundle.js")
+    if os.path.exists(b):
+        yield b, io.open(b, encoding="utf-8", errors="replace").read()
+    for p in sorted(glob.glob(os.path.join(REPO, "kindergeburtstag", "*.html"))):
+        roh = io.open(p, encoding="utf-8", errors="replace").read()
+        roh = re.sub(r"<(script|style)\b.*?</\1>", " ", roh, flags=re.S | re.I)
+        yield p, TAG.sub(" ", roh)
+
+
+def main():
+    fails = []
+    geprueft = 0
+    for pfad, text in quellen():
+        text = re.sub(r"\s+", " ", text)
+        for satz in saetze(text):
+            if not MEDIKAMENT.search(satz):
+                continue
+            geprueft += 1
+            if (WEGNEHMEN.search(satz) and not ENTWARNUNG.search(satz)
+                    and not AUSKUNFT.search(satz)):
+                rel = os.path.relpath(pfad, REPO).replace(os.sep, "/")
+                fails.append((rel, satz[:150]))
+    for rel, satz in fails[:20]:
+        print('    FAIL %s: Notfallmedikament wird weggenommen — "%s"' % (rel, satz))
+    if len(fails) > 20:
+        print("    … und %d weitere" % (len(fails) - 20))
+    print("Stufe 55: %d FAIL — %d Saetze mit Medikamenten-Bezug geprueft"
+          % (len(fails), geprueft))
+    return 1 if fails else 0
+
+
+if __name__ == "__main__":
+    sys.exit(main())
diff --git a/_dev/scripts/check-spielanker-deckung.py b/_dev/scripts/check-spielanker-deckung.py
new file mode 100644
index 00000000..00bd48be
--- /dev/null
+++ b/_dev/scripts/check-spielanker-deckung.py
@@ -0,0 +1,143 @@
+# -*- coding: utf-8 -*-
+"""Stufe 56: Die Luecke im Spielkarten-Kanal darf nicht wachsen.
+
+Befund 18.08. (unabhaengiges Gutachten, W4): Stufe 52 prueft, dass jeder EINGETRAGENE
+Anker stimmt — nie, dass einer fehlt. 85 von 225 Spielkarten bekommen nie eine Regel,
+19 von 45 Seiten tragen keinen einzigen Kasten, und sieben Seiten haben Spielkarten und
+trotzdem keinen: baustelle (3), pferde-3-5, pferde-9-12, ritter-6-8, ritter-9-12.
+
+Der Gutachter formuliert das Risiko genau: Ein Elternteil, der dino-3-5 mit elf roten
+Kaesten kennt und dann dschungel-3-5 oeffnet, hat keinen Anhaltspunkt dafuer, dass dort
+schlicht nichts hinterlegt ist. Ein Kasten, der Pruefung suggeriert, ist an der Stelle
+gefaehrlich, wo er FEHLT.
+
+Diese Stufe misst die Luecke und haelt sie fest. Als "erreichbar" gilt eine Karte, zu der
+es im Datensatz derselben Seite ein Spiel mit safetyRule gibt, dessen Text sich mit dem
+Kartentext deutlich ueberschneidet — also ein Anker, den jemand eintragen KOENNTE.
+
+Die Ratsche steht in `data/spielanker-deckung.json`: je Seite die heute offene Zahl.
+Wird sie groesser, FAILt die Stufe. Wird sie kleiner, meldet sie es und verlangt, dass
+die Datei nachgezogen wird — sonst verwaltet die Ratsche einen Stand, den es nicht
+mehr gibt.
+
+Gegenprobe: einen bestehenden Anker entfernen -> die Zahl steigt -> FAIL.
+"""
+import glob
+import importlib.util
+import io
+import json
+import os
+import re
+import sys
+
+sys.stdout.reconfigure(encoding="utf-8", errors="replace")
+
+HIER = os.path.dirname(os.path.abspath(__file__))
+REPO = os.path.dirname(os.path.dirname(HIER))
+RATSCHE = os.path.join(REPO, "data", "spielanker-deckung.json")
+ALTER = {"3-5": "klein", "6-8": "mittel", "9-12": "gross"}
+SCHWELLE = 0.34
+
+WORT = re.compile(r"[A-Za-zÄÖÜäöüß][A-Za-zÄÖÜäöüß]{3,}")
+STOPP = set("""und oder mit ohne fuer die der das ein eine dem den des im am zum zur auf
+aus bei vor nach als wie sich alle jede jeder pro je ist sind wird werden kann man dann
+wenn kind kinder spiel spiele minuten material ablauf jedes eines""".split())
+
+
+def lade_renderer():
+    spec = importlib.util.spec_from_file_location(
+        "regeln_drucken", os.path.join(HIER, "regeln-drucken.py"))
+    modul = importlib.util.module_from_spec(spec)
+    spec.loader.exec_module(modul)
+    return modul
+
+
+rd = lade_renderer()
+
+
+def kerne(s):
+    s = (s or "").lower().replace("ä", "ae").replace("ö", "oe")
+    s = s.replace("ü", "ue").replace("ß", "ss")
+    return {w for w in WORT.findall(s) if w not in STOPP}
+
+
+def main():
+    anker = rd.lade_anker()
+    offen_je_seite = {}
+    karten_gesamt = erreichbar_gesamt = 0
+
+    for pfad in sorted(glob.glob(os.path.join(REPO, "data", "motto", "*.json"))):
+        name = os.path.basename(pfad)[:-5]
+        motto, _, grp = name.rpartition("-")
+        if grp not in set(ALTER.values()):
+            continue
+        alter = next(a for a, g in ALTER.items() if g == grp)
+        rel = "kindergeburtstag/%s-%s-jahre.html" % (motto, alter)
+        seite = os.path.join(REPO, rel)
+        if not os.path.exists(seite):
+            continue
+        roh = io.open(seite, encoding="utf-8", errors="replace").read()
+        daten = json.load(io.open(pfad, encoding="utf-8"))
+
+        spiele = []
+        for v in (daten.get("variants") or []):
+            for g in (v.get("games") or []):
+                if g.get("name") and (g.get("safetyRule") or "").strip():
+                    spiele.append(kerne(g["name"] + " " + str(g.get("material") or "")
+                                        + " " + str(g.get("description") or "")))
+        vorhanden = {rd.norm(k) for k in ((anker.get("spielAnker") or {}).get(rel) or {})}
+
+        # Kartentexte ohne die bereits gedruckte Regel
+        ohne_regel = rd.SPIEL_WEG.sub(" ", roh)
+        offen = 0
+        for m in rd.KARTE_AUF.finditer(ohne_regel):
+            ende = rd.karten_ende(ohne_regel, m.start())
+            if ende < 0:
+                continue
+            u = rd.KARTE_TITEL.search(ohne_regel, m.end(), ende)
+            if not u:
+                continue
+            titel = rd.MEHRFACH_LEER.sub(" ", rd.TAGS.sub(" ", u.group(1))).strip()
+            titel = rd.NUMMER_VORN.sub("", titel).strip()
+            if not titel:
+                continue
+            karten_gesamt += 1
+            if rd.norm(titel) in vorhanden:
+                continue
+            k1 = kerne(titel + " " + rd.TAGS.sub(" ", ohne_regel[m.end():ende])[:1200])
+            if any(len(k1 & k2) / max(1, len(k2)) >= SCHWELLE for k2 in spiele):
+                offen += 1
+                erreichbar_gesamt += 1
+        if offen:
+            offen_je_seite[rel] = offen
+
+    if not os.path.exists(RATSCHE):
+        io.open(RATSCHE, "w", encoding="utf-8", newline="").write(
+            json.dumps({"stand": offen_je_seite}, ensure_ascii=False, indent=2) + "\n")
+        print("Stufe 56: Ratsche neu angelegt mit %d offenen Karten auf %d Seiten"
+              % (erreichbar_gesamt, len(offen_je_seite)))
+        return 0
+
+    stand = (json.load(io.open(RATSCHE, encoding="utf-8")) or {}).get("stand") or {}
+    fails = []
+    for rel, n in sorted(offen_je_seite.items()):
+        erlaubt = stand.get(rel, 0)
+        if n > erlaubt:
+            fails.append("%s: %d erreichbare Karten ohne Anker, erlaubt sind %d"
+                         % (rel, n, erlaubt))
+    for rel, erlaubt in sorted(stand.items()):
+        n = offen_je_seite.get(rel, 0)
+        if n < erlaubt:
+            fails.append("%s: nur noch %d offen statt %d — zieh die Ratsche nach, sonst "
+                         "verwaltet sie einen Stand, den es nicht mehr gibt" % (rel, n, erlaubt))
+
+    for f in fails[:20]:
+        print("    FAIL %s" % f)
+    print("Stufe 56: %d FAIL — %d Spielkarten, davon %d erreichbar und ohne Anker "
+          "auf %d Seiten" % (len(fails), karten_gesamt, erreichbar_gesamt,
+                             len(offen_je_seite)))
+    return 1 if fails else 0
+
+
+if __name__ == "__main__":
+    sys.exit(main())
diff --git a/_dev/scripts/check-spielanker.py b/_dev/scripts/check-spielanker.py
index 93678986..22ea22fa 100644
--- a/_dev/scripts/check-spielanker.py
+++ b/_dev/scripts/check-spielanker.py
@@ -95,6 +95,8 @@ def main():
     d = json.load(io.open(ANKER_DATEI, encoding="utf-8"))
     anker = d.get("spielAnker") or {}
     ausnahmen = d.get("spielAnkerOhneWortdeckung") or {}
+    schwach = d.get("spielAnkerTrotzBesseremTreffer") or {}
+    genutzt_schwach = set()
 
     spiele = {}
     for fp in sorted(glob.glob(os.path.join(REPO, "data", "motto", "*.json"))):
@@ -119,10 +121,37 @@ def main():
         if not os.path.exists(pfad):
             fails.append("%s: Seite existiert nicht" % rel)
             continue
-        karten = kartentexte(io.open(pfad, encoding="utf-8", errors="replace").read())
+        # rpartition("-") waere hier falsch: "prinzessin-3-5" zerfaellt damit in
+        # ("prinzessin-3", "5"), der Schluessel findet nichts, und die
+        # Mehrdeutigkeitspruefung liefe ins Leere, ohne etwas zu melden. Genau so
+        # ist die Gegenprobe beim ersten Versuch durchgerutscht (Lektion L26).
+        mm = re.match(r"^(.+)-(3-5|6-8|9-12)-jahre\.html$", os.path.basename(rel))
+        if not mm:
+            fails.append("%s: Dateiname passt nicht zum Schema" % rel)
+            continue
+        schluessel_motto = (mm.group(1), ALTER[mm.group(2)])
+        roh_seite = io.open(pfad, encoding="utf-8", errors="replace").read()
+        karten = kartentexte(roh_seite)
         gesehen = {}
-        for karten_titel, spiel_name in sorted(zuordnung.items()):
+        # Die Maschine selbst durchlaufen lassen statt ihre Logik nachzubauen: Sie
+        # liest die Variante aus dem Seitenabschnitt ab und bricht ab, wenn ein Spiel
+        # in mehreren Varianten VERSCHIEDENE Regeln traegt und der Abschnitt nichts
+        # hergibt. Ein Gate, das das nachprogrammiert, prueft seine eigene Kopie
+        # (Lektion L24) — der erste Entwurf meldete prompt drei Faelle, die die
+        # Maschine sauber aufloest.
+        try:
+            rd.spiel_regeln_setzen(roh_seite, rel, schluessel_motto[0],
+                                   schluessel_motto[1], d)
+        except SystemExit as e:
+            fails.append(str(e).replace("FATAL: ", ""))
+            continue
+        for karten_titel, wert in sorted(zuordnung.items(), key=lambda x: x[0]):
             geprueft += 1
+            variante_roh = None
+            spiel_name = wert
+            if isinstance(wert, dict):
+                spiel_name, variante_roh = wert.get("spiel"), wert.get("variante")
+            spiel_name_roh = spiel_name
             k, s = rd.norm(karten_titel), rd.norm(spiel_name)
             if k not in karten:
                 fails.append('%s: Karte "%s" steht nicht auf der Seite' % (rel, karten_titel))
@@ -131,6 +160,12 @@ def main():
                 fails.append('%s: Spiel "%s" steht nicht im Datensatz' % (rel, spiel_name))
                 continue
             spiel = spiele[rel][s]
+            # Aufloesung mit der Maschine selbst durchspielen: Traegt dasselbe Spiel in
+            # mehreren Varianten VERSCHIEDENE Regeln und gibt die Seite den Abschnitt
+            # nicht her, entschiede sonst die Dateireihenfolge, welche Regel der Leser
+            # sieht. Gemessen 18.08.: 7 von 122 Ankern waren so mehrdeutig, in drei
+            # Faellen war die gewaehlte Regel LOCKERER als eine andere Fassung
+            # desselben Spiels — die Fehlerklasse aus Gate A / ritter.
             if not (spiel.get("safetyRule") or "").strip():
                 fails.append('%s: Spiel "%s" hat keine safetyRule — der Anker ist wirkungslos'
                              % (rel, spiel_name))
@@ -146,6 +181,30 @@ def main():
             if not (k1 & k2):
                 ohne_deckung[rel].add(karten_titel)
 
+            # Dominanz statt blossem Treffer. Der Gutachter hat am 18.08. genau hier
+            # angegriffen: Er vertauschte zwei Anker auf einer dino-Seite, und die
+            # Stufe liess es durch — ein einziges gemeinsames Wort genuegte, und zwei
+            # Dino-Spiele teilen immer "dino". Ein Gate, das nur prueft, dass die
+            # Bruecke nicht ins Leere zeigt, prueft nicht, dass sie richtig zeigt.
+            # Jetzt muss das angeankerte Spiel das BESTE der Seite sein: Passt ein
+            # anderes deutlich besser zur Karte, ist die Zuordnung verdaechtig.
+            bewertung = []
+            for anderes in (spiele.get(rel) or {}).values():
+                kx = kerne(anderes["name"] + " " + str(anderes.get("material") or "")
+                           + " " + str(anderes.get("description") or ""))
+                bewertung.append((len(k1 & kx) / max(1, len(kx)), anderes["name"]))
+            bewertung.sort(reverse=True)
+            eigen = next((w for w, n in bewertung if n == spiel["name"]), 0.0)
+            best, best_name = bewertung[0] if bewertung else (0.0, None)
+            if best_name and best_name != spiel["name"] and best > eigen + 0.15:
+                if karten_titel not in (schwach.get(rel) or {}):
+                    fails.append('%s: Karte "%s" passt deutlich besser zu "%s" (%.2f) '
+                                 'als zum angeankerten "%s" (%.2f)'
+                                 % (rel, karten_titel, best_name, best,
+                                    spiel["name"], eigen))
+                else:
+                    genutzt_schwach.add((rel, karten_titel))
+
     for rel, karten in sorted(ohne_deckung.items()):
         for karten_titel in sorted(karten):
             if karten_titel not in (ausnahmen.get(rel) or {}):
@@ -161,6 +220,32 @@ def main():
                 fails.append('%s: Ausnahme fuer "%s" ohne belastbare Begruendung'
                              % (rel, karten_titel))
 
+    # Jede festgelegte Variante braucht eine Begruendung, und jede Begruendung einen Anker
+    gruende = d.get("spielAnkerVariantenGrund") or {}
+    for rel, zuordnung in sorted(anker.items()):
+        for karten_titel, wert in zuordnung.items():
+            if isinstance(wert, dict) and wert.get("variante"):
+                g = (gruende.get(rel) or {}).get(karten_titel, "")
+                if len(g.strip()) < 80:
+                    fails.append('%s: Variante fuer "%s" ist festgelegt, aber nicht '
+                                 'belastbar begruendet' % (rel, karten_titel))
+    for rel, eintraege in sorted(gruende.items()):
+        for karten_titel in eintraege:
+            wert = (anker.get(rel) or {}).get(karten_titel)
+            if not (isinstance(wert, dict) and wert.get("variante")):
+                fails.append('%s: Begruendung fuer "%s" ohne festgelegte Variante — tot'
+                             % (rel, karten_titel))
+
+    for rel, eintraege in sorted(schwach.items()):
+        for karten_titel, grund in sorted(eintraege.items()):
+            if (rel, karten_titel) not in genutzt_schwach:
+                fails.append('%s: Ausnahme fuer "%s" greift nicht mehr — die Zuordnung '
+                             'ist inzwischen die beste, die Begruendung prueft niemand'
+                             % (rel, karten_titel))
+            elif len(grund.strip()) < 60:
+                fails.append('%s: Ausnahme fuer "%s" ohne belastbare Begruendung'
+                             % (rel, karten_titel))
+
     for f in fails[:25]:
         print("    FAIL %s" % f)
     if len(fails) > 25:
diff --git a/_dev/scripts/regeln-drucken.py b/_dev/scripts/regeln-drucken.py
index b0733b96..ffa21e26 100644
--- a/_dev/scripts/regeln-drucken.py
+++ b/_dev/scripts/regeln-drucken.py
@@ -563,6 +563,88 @@ NUMMER_VORN = re.compile('^' + BS + 's*' + BS + 'd+[.)]' + BS + 's*')
 MEHRFACH_LEER = re.compile(BS + 's+')
 
 
+GAME_SAFETY = re.compile('<div class="game-safety"[^>]*>(.*?)</div>', re.S)
+
+# Risikowoerter: Wenn die Datenregel eines davon nennt und der vorhandene Kartenblock
+# nicht, geht durch das Unterdruecken eine Aussage verloren — das wird gemeldet.
+RISIKO_WORT = re.compile(
+    '(kopf|gesicht|auge|hals|erstick|verschluck|atemweg|feuer|flamme|heiss|'
+    + 'verbrenn|brand|strom|batterie|knopfzelle|klinge|schere|messer|spitz|'
+    + 'stich|ertrink|wasser|allergi|gift|reiz|aetz|sturz|klettern|rutsch)', re.I)
+
+
+def vorhandene_warnung(text, anfang, ende):
+    """Text des bereits vorhandenen game-safety-Blocks dieser Karte — oder None."""
+    m = GAME_SAFETY.search(text, anfang, ende)
+    if not m:
+        return None
+    return MEHRFACH_LEER.sub(' ', TAGS.sub(' ', m.group(1))).strip()
+
+
+SATZ_TEILER = re.compile('(?<=[.!?;])' + chr(92) + 's+')
+INHALT_WORT = re.compile('[A-Za-z' + chr(196) + chr(214) + chr(220)
+                         + chr(228) + chr(246) + chr(252) + chr(223) + ']{4,}')
+
+
+def _kerne(s):
+    s = (s or '').lower().replace(chr(228), 'ae').replace(chr(246), 'oe')
+    s = s.replace(chr(252), 'ue').replace(chr(223), 'ss')
+    return set(INHALT_WORT.findall(s))
+
+
+def fehlende_risiken(regel, vorhanden):
+    """Saetze der Datenregel, die im vorhandenen Kartenblock nicht vorkommen.
+
+    Erster Entwurf verglich Risiko-WOERTER und meldete prompt Fehlalarme: Die Karte
+    schrieb "keine Stuehle als Kletterhilfe", die Daten "zum Hineinklettern" — dasselbe
+    Verbot, anderes Wort. Jetzt wird satzweise verglichen: Ein Satz gilt als vorhanden,
+    wenn die Karte mindestens die Haelfte seiner Inhaltswoerter fuehrt. Gemeldet wird
+    nur, was ein Risikowort traegt — Spielmechanik interessiert hier nicht.
+    """
+    da = _kerne(vorhanden)
+    fehlt = []
+    for satz in SATZ_TEILER.split(regel or ''):
+        satz = satz.strip()
+        if len(satz) < 15 or not RISIKO_WORT.search(satz):
+            continue
+        k = _kerne(satz)
+        if not k:
+            continue
+        if len(k & da) / len(k) < 0.5:
+            fehlt.append(satz)
+    return fehlt
+
+
+KOMMENTAR = re.compile('<!--.*?-->', re.S)
+TAG_ROH = re.compile('<[^<>]*>')
+ATTRIBUT = re.compile('"[^"]*"' + chr(124) + "'[^']*'")
+
+
+def maskiert(text):
+    """Text mit ausgeblendeten Kommentaren und Attributwerten, LAENGENGLEICH.
+
+    Die Kartengrenze kommt aus einer <div>-Klammerzaehlung. Ein "<div" in einem
+    HTML-Kommentar oder in einem Attributwert (title="… <div> …") verschiebt die
+    Zaehlung — die Karte endet dann zu frueh oder zu spaet, und im schlimmsten Fall
+    landet die Regel in einem auskommentierten Block, wo sie zwar als gedruckt zaehlt
+    und trotzdem unsichtbar ist. Der Gutachter hat genau darauf hingewiesen (18.08., W8).
+
+    Ersetzt wird zeichenweise durch Leerzeichen, damit alle Positionen gueltig bleiben.
+    """
+    def leer(m):
+        return ' ' * (m.end() - m.start())
+
+    def tag_ohne_werte(m):
+        # Attributwerte NUR innerhalb eines Tags leeren. Der erste Entwurf liess das
+        # Muster ueber den ganzen Text laufen — und ein Apostroph im Fliesstext machte
+        # daraus einen Bereich, der echte <div> verschluckte. Die Zaehlung brach, und
+        # der Renderer meldete Karten als fehlend, die er vorher fand.
+        return ATTRIBUT.sub(leer, m.group(0))
+
+    ohne = KOMMENTAR.sub(leer, text)
+    return TAG_ROH.sub(tag_ohne_werte, ohne)
+
+
 def karten_ende(text, start):
     """Ende des <div>-Blocks, der bei `start` beginnt — per Klammerzaehlung.
 
@@ -573,7 +655,7 @@ def karten_ende(text, start):
     stillschweigend halb behandelt.
     """
     tiefe = 0
-    for m in DIV_KANTE.finditer(text, start):
+    for m in DIV_KANTE.finditer(maskiert(text), start):
         tiefe += 1 if m.group(0)[1] != '/' else -1
         if tiefe == 0:
             return m.start()
@@ -581,8 +663,17 @@ def karten_ende(text, start):
 
 
 def karten_der_seite(text):
-    """[(titel, einfuege_position)] je Spielkarte, in Dokumentreihenfolge."""
+    """[(titel, einfuege_position, vorhandene_warnung)] je Spielkarte.
+
+    Der dritte Wert ist der Text eines bereits auf der Karte stehenden
+    `game-safety`-Blocks. 126 solcher Bloecke stehen auf 17 Seiten — handgeschrieben,
+    aelter als dieser Kanal. Wo einer steht, druckt der Kanal nichts dazu (Gutachten
+    18.08., MAJOR 1/7).
+    """
     raus = []
+    # Die Karten selbst werden im ORIGINAL gesucht: Die Maskierung loescht
+    # Attributwerte, also auch class="game-detail". Nur die Klammerzaehlung
+    # in karten_ende arbeitet auf dem maskierten Text.
     for m in KARTE_AUF.finditer(text):
         ende = karten_ende(text, m.start())
         if ende < 0:
@@ -593,7 +684,7 @@ def karten_der_seite(text):
         titel = html_mod.unescape(MEHRFACH_LEER.sub(' ', TAGS.sub(' ', u.group(1)))).strip()
         titel = NUMMER_VORN.sub('', titel).strip()
         if titel:
-            raus.append((titel, ende))
+            raus.append((titel, ende, vorhandene_warnung(text, m.end(), ende)))
     return raus
 
 
@@ -601,7 +692,17 @@ _SPIELREGELN = None
 
 
 def lade_spielregeln():
-    """{(motto, gruppe): {norm(spielname): (name, safetyRule)}} aus data/motto."""
+    """{(motto, gruppe): [(name, variante, safetyRule), ...]} aus data/motto.
+
+    Bewusst eine LISTE statt einer Zuordnung auf norm(): Der erste Entwurf legte die
+    Regeln unter norm(name) ab — und weil norm() Klammerinhalte wegschneidet, fielen
+    "Koeniglicher Tanz" und "Koeniglicher Tanz (mit Einfrieren)" auf denselben
+    Schluessel. Gewonnen hat der zuletzt gelesene Eintrag. Gemessen: 12 solcher
+    Kollisionen mit UNTERSCHIEDLICHER Regel, vier davon gedruckt — darunter zwei
+    verschiedene Spiele (safari: Futter gegen Baelle) und eine Regel, die dadurch
+    LOCKERER war als die Daten (prinzessin-3-5: "Boden frei." statt "Boden frei von
+    Stolperfallen, weiche Umgebung. Genug Abstand zwischen den Kindern.").
+    """
     global _SPIELREGELN
     if _SPIELREGELN is not None:
         return _SPIELREGELN
@@ -617,15 +718,83 @@ def lade_spielregeln():
         if grp not in set(ALTER.values()):
             continue
         d = json.load(io.open(fp, encoding='utf-8'))
-        eintrag = _SPIELREGELN.setdefault((motto, grp), {})
+        eintrag = _SPIELREGELN.setdefault((motto, grp), [])
         for v in (d.get('variants') or []):
             for g in (v.get('games') or []):
                 regel = (g.get('safetyRule') or '').strip()
                 if g.get('name') and regel:
-                    eintrag[norm(g['name'])] = (g['name'], regel)
+                    eintrag.append((g['name'], v.get('id'), regel))
     return _SPIELREGELN
 
 
+def spiel_aufloesen(kandidaten, spiel_name, variante, rel, karten_titel,
+                    variante_ist_gesetzt=True):
+    """Genau eine Regel fuer diesen Anker — oder ein lauter Abbruch.
+
+    Reihenfolge: exakter Name, dann norm() als Rueckfallebene. Bleibt danach mehr als
+    eine unterschiedliche Regel uebrig, wird NICHT geraten: Der Lauf bricht ab und
+    nennt die Auswahl, damit der Anker die Variante benennen kann.
+    """
+    treffer = [k for k in kandidaten if k[0] == spiel_name]
+    if not treffer:
+        ziel = norm(spiel_name)
+        treffer = [k for k in kandidaten if norm(k[0]) == ziel]
+        namen = {k[0] for k in treffer}
+        if len(namen) > 1:
+            raise SystemExit(
+                'FATAL: %s / "%s" — der Spielname "%s" trifft nach Normalisierung '
+                'mehrere verschiedene Spiele: %s. Nenne den Namen im spielAnker '
+                'wortgleich.' % (rel, karten_titel, spiel_name, sorted(namen)))
+    if not treffer:
+        return None
+    if variante:
+        genau = [k for k in treffer if k[1] == variante]
+        if genau:
+            treffer = genau
+        elif variante_ist_gesetzt:
+            raise SystemExit('FATAL: %s / "%s" — Variante "%s" gibt es fuer "%s" nicht'
+                             % (rel, karten_titel, variante, spiel_name))
+        # Aus dem Seitenabschnitt abgelesene Varianten duerfen danebenliegen: Die Seite
+        # zeigt ein Spiel gelegentlich in einem Abschnitt, den die Daten nicht fuehren.
+        # Dann faellt der Filter weg — bleibt es mehrdeutig, schlaegt die Pruefung
+        # darunter zu. Nur eine AUSDRUECKLICH angeankerte Variante muss existieren.
+    regeln = sorted({k[2] for k in treffer})
+    if len(regeln) > 1:
+        raise SystemExit(
+            'FATAL: %s / "%s" — "%s" traegt in mehreren Varianten VERSCHIEDENE Regeln '
+            '(%s). Ergaenze den spielAnker um {"spiel": ..., "variante": ...}, sonst '
+            'entscheidet die Dateireihenfolge, welche Regel der Leser sieht.'
+            % (rel, karten_titel, spiel_name,
+               ', '.join('%s: "%s..."' % (k[1], k[2][:48]) for k in treffer)))
+    return regeln[0]
+
+
+VARIANT_WORT = re.compile('(minimal|standard|wow)', re.I)
+ABSCHNITT = re.compile('<h[2-4][^>]*>(.{0,160}?)</h[2-4]>', re.S)
+
+
+def varianten_marken(text):
+    """[(position, variante)] der Varianten-Ueberschriften einer Seite.
+
+    Erkannt wird eine Ueberschrift, die einen Variantennamen traegt und kurz genug ist,
+    um eine Abschnitts-Ueberschrift zu sein ("Minimal — 2 Stunden Bau-Tag"). Ein langer
+    Fliesstext, der das Wort zufaellig enthaelt, faellt damit heraus.
+    """
+    raus = []
+    for m in ABSCHNITT.finditer(text):
+        roh = MEHRFACH_LEER.sub(' ', TAGS.sub(' ', m.group(1))).strip()
+        v = VARIANT_WORT.search(roh)
+        if v and len(roh) < 100:
+            raus.append((m.start(), v.group(1).lower()))
+    return raus
+
+
+def variante_der_karte(marken, pos):
+    """Variante des Abschnitts, in dem die Karte an `pos` steht — oder None."""
+    vor = [v for q, v in marken if q < pos]
+    return vor[-1] if vor else None
+
+
 def spiel_regeln_setzen(text, rel, motto, gruppe, anker):
     """Druckt je zugeordneter Spielkarte die safetyRule ihres Spiels.
 
@@ -637,27 +806,45 @@ def spiel_regeln_setzen(text, rel, motto, gruppe, anker):
     text = SPIEL_WEG.sub('', text)
     zuordnung = (anker.get('spielAnker') or {}).get(rel) or {}
     if not zuordnung:
-        return text, 0, []
-    regeln = lade_spielregeln().get((motto, gruppe), {})
+        return text, 0, [], []
+    marken = varianten_marken(text)
+    kandidaten = lade_spielregeln().get((motto, gruppe), [])
     # Ein Titel kann mehrfach vorkommen: dieselbe Spielkarte steht auf manchen
     # Seiten in zwei Varianten-Abschnitten (dino-3-5 fuehrt "Dino-Eier suchen"
     # zweimal). Die Regel gehoert an JEDE dieser Stellen, nicht an die erste.
     nach_titel = {}
-    for titel, pos in karten_der_seite(text):
-        nach_titel.setdefault(norm(titel), []).append(pos)
+    for titel, pos, warnung in karten_der_seite(text):
+        nach_titel.setdefault(norm(titel), []).append((pos, warnung))
     ohne_regel = []
+    unterdrueckt = []
     einfuegen = []
     for karten_titel, spiel_name in sorted(zuordnung.items()):
         k = norm(karten_titel)
         if k not in nach_titel:
             raise SystemExit('FATAL: %s — spielAnker nennt die Karte "%s", '
                              'die Seite hat sie nicht' % (rel, karten_titel))
-        treffer = regeln.get(norm(spiel_name))
-        if treffer is None:
-            ohne_regel.append((karten_titel, spiel_name))
-            continue
-        for pos in nach_titel[k]:
-            einfuegen.append((pos, treffer[1]))
+        variante = None
+        if isinstance(spiel_name, dict):
+            spiel_name, variante = spiel_name.get('spiel'), spiel_name.get('variante')
+        for pos, warnung in nach_titel[k]:
+            # Ohne ausdrueckliche Angabe entscheidet der Abschnitt, in dem die Karte
+            # steht — das ist eine Ablesung an der Seite, keine Annahme.
+            v = variante or variante_der_karte(marken, pos)
+            regel = spiel_aufloesen(kandidaten, spiel_name, v, rel, karten_titel,
+                                    variante_ist_gesetzt=bool(variante))
+            if regel is None:
+                ohne_regel.append((karten_titel, spiel_name))
+                continue
+            if warnung is not None:
+                # Die Karte warnt bereits. Zwei Kaesten mit verschiedenem Wortlaut sind
+                # fuer den Leser schlechter als einer — und der neue war dreimal der
+                # lockerere. Was die Daten zusaetzlich wissen, wird gemeldet statt
+                # gedruckt.
+                fehlt = fehlende_risiken(regel, warnung)
+                if fehlt:
+                    unterdrueckt.append((karten_titel, spiel_name, fehlt))
+                continue
+            einfuegen.append((pos, regel))
     gedruckt = 0
     for pos, regel in sorted(einfuegen, reverse=True):
         frag = ('<p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> %s</p>'
@@ -670,7 +857,7 @@ def spiel_regeln_setzen(text, rel, motto, gruppe, anker):
         m = re.search(r'</style>', text)
         if m:
             text = text[:m.start()] + CSS_SPIEL + text[m.start():]
-    return text, gedruckt, ohne_regel
+    return text, gedruckt, ohne_regel, unterdrueckt
 
 
 def regeln_setzen(text, rel, motto, gruppe, regeln, anker):
@@ -868,13 +1055,14 @@ def regeln_setzen(text, rel, motto, gruppe, regeln, anker):
         gedruckt += len(notes)
 
     text, _ = css_setzen(text)
-    text, spiel_gedruckt, spiel_ohne = spiel_regeln_setzen(
+    text, spiel_gedruckt, spiel_ohne, spiel_unterdrueckt = spiel_regeln_setzen(
         text, rel, motto, gruppe, anker)
     text = notfall_setzen(text, rel)
     text = quellen_setzen(text, rel)
     return text, {'seite': rel, 'posten': len(posten), 'regeln': len(quelle) + len(eigene),
                   'gedruckt': gedruckt, 'klasse': aus_klasse, 'offen': offen,
-            'spiel_gedruckt': spiel_gedruckt, 'spiel_ohne': spiel_ohne}
+            'spiel_gedruckt': spiel_gedruckt, 'spiel_ohne': spiel_ohne,
+            'spiel_unterdrueckt': spiel_unterdrueckt}
 
 
 def verarbeite(pfad, regeln, anker, schreiben):
diff --git a/data/freie-seiten-regeln.json b/data/freie-seiten-regeln.json
index 2acca30f..56a01a45 100644
--- a/data/freie-seiten-regeln.json
+++ b/data/freie-seiten-regeln.json
@@ -585,11 +585,17 @@
       "&#x26F5; Schiff beladen — Spielanleitung": "⛵ Schiff beladen — Spielanleitung"
     },
     "kindergeburtstag/prinzessin-3-5-jahre.html": {
-      "2. Schloss-Ball mit Hofknicks": "🎵 Königlicher Tanz (mit Einfrieren)",
+      "2. Schloss-Ball mit Hofknicks": {
+        "spiel": "🎵 Königlicher Tanz (mit Einfrieren)",
+        "variante": "minimal"
+      },
       "3. Edelstein-Suche": "👑 Krönchen-Schatzsuche"
     },
     "kindergeburtstag/prinzessin-6-8-jahre.html": {
-      "2. Märchen-Code knacken": "🗝️ Schloss-Schatzsuche"
+      "2. Märchen-Code knacken": {
+        "spiel": "🗝️ Schloss-Schatzsuche",
+        "variante": "minimal"
+      }
     },
     "kindergeburtstag/prinzessin-9-12-jahre.html": {
       "1. Multi-Stage Code-Mystery": "🔐 Escape-Stationen (Codes, UV, Logik)",
@@ -601,7 +607,10 @@
     "kindergeburtstag/safari-3-5-jahre.html": {
       "🎧 Tier-Lauscher (Geräusche raten)": "🎧 Tier-Lauscher (Geräusche raten)",
       "🎽 Tarn-Tuch bemalen (Bastel-Station)": "🎽 Tarn-Tuch bemalen (Bastel-Station)",
-      "🦁 Kleine Pirsch zum Plüsch-Löwen": "🦁 Tierspuren-Pirsch",
+      "🦁 Kleine Pirsch zum Plüsch-Löwen": {
+        "spiel": "🦁 Tierspuren-Pirsch",
+        "variante": "minimal"
+      },
       "🦒 Tierstimmen-Lauschen": "🦒 Tierstimmen-Quiz",
       "🦓 Tiere füttern": "🦓 Tiere füttern (Bälle in Eimer)"
     },
@@ -626,7 +635,10 @@
     },
     "kindergeburtstag/superheld-6-8-jahre.html": {
       "2. Geheim-Code knacken": "🔎 Geheimmission (Helden-Schatzsuche)",
-      "4. Helden-Parcours": "🦸 Helden-Training (Hindernisparcours)"
+      "4. Helden-Parcours": {
+        "spiel": "🦸 Helden-Training (Hindernisparcours)",
+        "variante": "minimal"
+      }
     },
     "kindergeburtstag/superheld-9-12-jahre.html": {
       "1. Multi-Stage Code-Mission": "🔐 Code knacken (Geheimbotschaft)",
@@ -654,5 +666,19 @@
     "kindergeburtstag/superheld-6-8-jahre.html": {
       "2. Geheim-Code knacken": "Wie oben, Superhelden-Fassung derselben Karte: drei Stationen, deren Loesung das Versteck nennt. Die Regel spricht von Verstecken und Grenzen, also genau von dem, was die Karte anordnet."
     }
+  },
+  "spielAnkerVariantenGrund": {
+    "kindergeburtstag/prinzessin-3-5-jahre.html": {
+      "2. Schloss-Ball mit Hofknicks": "minimal fordert zusaetzlich \"weiche Umgebung\" und \"Genug Abstand zwischen den Kindern\"; standard kuerzt das auf \"Boden frei, Abstand halten\". Auf einer Seite fuer 3- bis 5-Jaehrige gilt die ausfuehrlichere."
+    },
+    "kindergeburtstag/prinzessin-6-8-jahre.html": {
+      "2. Märchen-Code knacken": "minimal und standard sind wortgleich (\"Sichere, einsehbare Verstecke. Draussen Grenzen klar, Begleitung.\"); wow kuerzt auf \"Sichere Verstecke, Begleitung\" und verliert dabei \"einsehbar\" und die Aussengrenzen. Die Karte schickt Kinder in Garten, Wohnzimmer und Kueche — also gilt die Fassung mit den Aussengrenzen."
+    },
+    "kindergeburtstag/safari-3-5-jahre.html": {
+      "🦁 Kleine Pirsch zum Plüsch-Löwen": "Nur minimal traegt den Satz \"KEIN 'Loewen-Bruellen' als Schreck-Moment — 3-Jaehrige weinen davon\". Standard und wow sind sonst wortgleich. Die Seite ist die 3-5-Seite, der Satz gehoert genau dorthin."
+    },
+    "kindergeburtstag/superheld-6-8-jahre.html": {
+      "4. Helden-Parcours": "minimal nennt \"Immer nur EIN Kind im Parcours, die anderen hinter der Startlinie\" und \"Kartons stabil/leer, keine scharfen Kanten\" sowie das Hochschieben der Maske beim Krabbeln; standard und wow kuerzen beides. Die ausfuehrliche Fassung sagt dem Elternteil, WO die anderen Kinder warten — das ist der Punkt der Regel."
+    }
   }
 }
diff --git a/data/spielanker-deckung.json b/data/spielanker-deckung.json
new file mode 100644
index 00000000..c05a37c1
--- /dev/null
+++ b/data/spielanker-deckung.json
@@ -0,0 +1,9 @@
+{
+  "stand": {
+    "kindergeburtstag/baustelle-9-12-jahre.html": 1,
+    "kindergeburtstag/einhorn-9-12-jahre.html": 1,
+    "kindergeburtstag/einhorn-6-8-jahre.html": 1,
+    "kindergeburtstag/ritter-6-8-jahre.html": 1,
+    "kindergeburtstag/safari-9-12-jahre.html": 1
+  }
+}
diff --git a/validate-all.sh b/validate-all.sh
index 7cd36501..58c84590 100755
--- a/validate-all.sh
+++ b/validate-all.sh
@@ -788,6 +788,30 @@ else
   red "Stufe 48: dieselbe Ware traegt gegensaetzliche Urteile"
 fi
 
+echo "── STUFE 55: Ein Notfallmedikament wird nie eingesammelt ──"
+# Gutachten 18.08., primaerverifiziert (DAAB, Deutsche Atemwegsliga): Auf allen vier
+# Schlafparty-Mottos stand "Allergien, Asthma-Inhalator und Medikamente vorher
+# einsammeln" — die Umkehrung der richtigen Anweisung, ausgerechnet fuer Naechte im
+# abgedunkelten Raum. Das Notfallset muss erreichbar bleiben, ab passendem Alter beim
+# Kind selbst. Die Stufe nimmt Saetze aus, die die AUSKUNFT einsammeln
+# ("Allergien per WhatsApp abfragen") — sonst bestraft sie richtige Formulierungen.
+if python _dev/scripts/check-notfallmedikament.py; then
+  green "Kein Notfallmedikament wird eingesammelt oder weggeschlossen"
+else
+  red "Stufe 55: Notfallmedikament soll weggenommen werden"
+fi
+
+echo "── STUFE 56: Die Luecke im Spielkarten-Kanal waechst nicht ──"
+# Gutachten 18.08. (W4): Stufe 52 prueft eingetragene Anker, nie fehlende. Ein roter
+# Kasten, der Pruefung suggeriert, ist dort gefaehrlich, wo er FEHLT. Diese Stufe zaehlt
+# die Karten, zu denen es ein passendes Spiel MIT Regel gibt und trotzdem keinen Anker,
+# und haelt die Zahl je Seite in data/spielanker-deckung.json fest.
+if python _dev/scripts/check-spielanker-deckung.py; then
+  green "Keine neue Luecke zwischen Spielkarte und hinterlegter Regel"
+else
+  red "Stufe 56: mehr Spielkarten ohne Anker als festgehalten"
+fi
+
 echo "── STUFE 52: Die Bruecke Spielkarte -> Spieldaten zeigt nirgends ins Leere ──"
 # Befund O (18.08.): 105 der 146 nicht angekommenen Spielregel-Verbote nennen gar
 # keine Ware ("Sichtaufsicht", "Platz freiraeumen") und gehoeren deshalb an das
```

## Inhaltliche Aenderungen an Daten und Seiten

```diff
diff --git a/data/motto/detektiv-gross.json b/data/motto/detektiv-gross.json
index eeb9ab10..1561b5e6 100644
--- a/data/motto/detektiv-gross.json
+++ b/data/motto/detektiv-gross.json
@@ -1140,7 +1140,7 @@
               "content": "Schlafsäcke ausrollen, Taschenlampen-Geschichten, langsam ausklingen lassen."
             }
           ],
-          "safetyRule": "Eltern-Opt-In schriftlich. Allergien, Asthma-Inhalator und Medikamente vorher einsammeln. Im abgedunkelten Raum Stolperfallen entschärfen, UV-Lampen nicht in die Augen leuchten. Film altersgerecht wählen — keine echten Gewalt- oder Horror-Inhalte, nur Krimi-Spannung.",
+          "safetyRule": "Eltern-Opt-In schriftlich. Allergien, Asthma und Medikamente vorher abfragen. Notfallmedikamente werden nicht eingesammelt: Asthmaspray und Adrenalin-Pen bleiben beim Kind oder liegen an einem festen Platz, den alle kennen und der auch nachts in Sekunden erreichbar ist. Notier dir, wer was braucht und wie es angewendet wird, und leg die Nummern der Eltern daneben. Im abgedunkelten Raum Stolperfallen entschärfen, UV-Lampen nicht in die Augen leuchten. Film altersgerecht wählen — keine echten Gewalt- oder Horror-Inhalte, nur Krimi-Spannung.",
           "ageAdjust9": "Nicht empfohlen unter 10 — eher Wow ohne Schlafparty.",
           "ageAdjust12": "Anspruchsvollere Geheim-Hinweise (Caesar-verschlüsselt unter UV), längere Taschenlampen-Geschichten zulassen.",
           "indoorTip": "Vorhänge zu, Licht aus — UV-Hinweise an Türrahmen, unter Tischkanten, hinter Bilderrahmen verstecken.",
diff --git a/data/motto/dino-gross.json b/data/motto/dino-gross.json
index bf8247ae..2ab59cec 100644
--- a/data/motto/dino-gross.json
+++ b/data/motto/dino-gross.json
@@ -67,7 +67,7 @@
             "Erwachsener kippt 100 ml Essig rein, sofort einen Schritt zurück",
             "Bei 8-Jährigen: Chemie erklären — Essig (Säure) + Natron (Base) = CO2 + Wasser + Natriumacetat. Spüli fängt CO2 in Blasen = Schaum"
           ],
-          "safetyRule": "Kinder min. 1 Armlänge zurück, niemals in den Krater schauen. Schürze/alte Kleidung (Lebensmittelfarbe färbt!). Erwachsener kippt den Essig, nicht das Geburtstagskind. Tablett mit Rand. Bei Augenkontakt sofort 5 Min mit Wasser spülen. Faktencheck: Mehr Natron = NICHT höhere Eruption (der Essig limitiert: 100 ml setzen nur ~7-8 g Natron um) — Mehr Spüli macht den Schaum cremiger. Natron-Essig-Variante (KEIN Wasserstoffperoxid/Trockeneis); Essig reizt die Augen — nach dem Anfassen nicht ins Gesicht fassen.",
+          "safetyRule": "Kinder min. 1 Armlänge zurück, niemals in den Krater schauen. Schürze/alte Kleidung (Lebensmittelfarbe färbt!). Erwachsener kippt den Essig, nicht das Geburtstagskind. Tablett mit Rand. Bei Augenkontakt sofort mindestens 10 Minuten mit lauwarmem Wasser spülen und danach den Augenarzt anrufen. Faktencheck: Mehr Natron = NICHT höhere Eruption (der Essig limitiert: 100 ml setzen nur ~7-8 g Natron um) — Mehr Spüli macht den Schaum cremiger. Natron-Essig-Variante (KEIN Wasserstoffperoxid/Trockeneis); Essig reizt die Augen — nach dem Anfassen nicht ins Gesicht fassen.",
           "ageAdjust6": null,
           "ageAdjust8": "Lass die Kinder den Vulkan selbst formen und die Zutaten selbst reinkippen. Erkläre kurz: „Das ist eine chemische Reaktion — Säure trifft Base!“",
           "indoorTip": "Geht, aber in der Badewanne oder auf dem Balkon. Unterlage ist Pflicht. Wachs-Tücher griffbereit.",
@@ -209,7 +209,7 @@
             "Wer einen Dino findet, trägt ihn mit Dino-Name + Fundort in den Bericht ein",
             "Mehr Dinos als Kinder vergraben (bei 6 Kindern → 10 Dinos) — jeder findet mind. einen"
           ],
-          "safetyRule": "Mini-Dinos < 3 cm vermeiden bei jüngeren Geschwistern. Sand-Wanne mit Sichtaufsicht. Hände waschen vor Snacks.",
+          "safetyRule": "Sortier die Mini-Dinos vor: Was durch eine Klopapierrolle passt, bleibt in der Schachtel — bei 3- bis 5-Jährigen ist das Erstickungsgefahr, nicht erst bei jüngeren Geschwistern. Sand-Wanne mit Sichtaufsicht. Hände waschen vor Snacks.",
           "ageAdjust6": "Figuren nur leicht bedecken, Reis statt Sand (weniger Dreck).",
           "ageAdjust8": "Dinos in Gips-Klumpen einbetten (vorher vorbereiten, über Nacht trocknen). Kinder müssen mit Hammer/Holzstäbchen den Gips aufbrechen.",
           "indoorTip": "Wanne auf alte Tischdecke oder in die Badewanne stellen.",
@@ -235,7 +235,7 @@
             "Erwachsener kippt 100 ml Essig rein, sofort einen Schritt zurück",
             "Bei 8-Jährigen: Chemie erklären — Essig (Säure) + Natron (Base) = CO2 + Wasser + Natriumacetat. Spüli fängt CO2 in Blasen = Schaum"
           ],
-          "safetyRule": "Kinder min. 1 Armlänge zurück, niemals in den Krater schauen. Schürze/alte Kleidung (Lebensmittelfarbe färbt!). Erwachsener kippt den Essig, nicht das Geburtstagskind. Tablett mit Rand. Bei Augenkontakt sofort 5 Min mit Wasser spülen. Faktencheck: Mehr Natron = NICHT höhere Eruption (der Essig limitiert: 100 ml setzen nur ~7-8 g Natron um) — Mehr Spüli macht den Schaum cremiger. Natron-Essig-Variante (KEIN Wasserstoffperoxid/Trockeneis); Essig reizt die Augen — nach dem Anfassen nicht ins Gesicht fassen.",
+          "safetyRule": "Kinder min. 1 Armlänge zurück, niemals in den Krater schauen. Schürze/alte Kleidung (Lebensmittelfarbe färbt!). Erwachsener kippt den Essig, nicht das Geburtstagskind. Tablett mit Rand. Bei Augenkontakt sofort mindestens 10 Minuten mit lauwarmem Wasser spülen und danach den Augenarzt anrufen. Faktencheck: Mehr Natron = NICHT höhere Eruption (der Essig limitiert: 100 ml setzen nur ~7-8 g Natron um) — Mehr Spüli macht den Schaum cremiger. Natron-Essig-Variante (KEIN Wasserstoffperoxid/Trockeneis); Essig reizt die Augen — nach dem Anfassen nicht ins Gesicht fassen.",
           "ageAdjust6": null,
           "ageAdjust8": "Lass die Kinder den Vulkan selbst formen und die Zutaten selbst reinkippen. Erkläre kurz: „Das ist eine chemische Reaktion — Säure trifft Base!“",
           "indoorTip": "Geht, aber in der Badewanne oder auf dem Balkon. Unterlage ist Pflicht. Wachs-Tücher griffbereit.",
@@ -424,7 +424,7 @@
             "Wer einen Dino findet, trägt ihn mit Dino-Name + Fundort in den Bericht ein",
             "Mehr Dinos als Kinder vergraben (bei 6 Kindern → 10 Dinos) — jeder findet mind. einen"
           ],
-          "safetyRule": "Mini-Dinos < 3 cm vermeiden bei jüngeren Geschwistern. Sand-Wanne mit Sichtaufsicht. Hände waschen vor Snacks.",
+          "safetyRule": "Sortier die Mini-Dinos vor: Was durch eine Klopapierrolle passt, bleibt in der Schachtel — bei 3- bis 5-Jährigen ist das Erstickungsgefahr, nicht erst bei jüngeren Geschwistern. Sand-Wanne mit Sichtaufsicht. Hände waschen vor Snacks.",
           "ageAdjust6": "Figuren nur leicht bedecken, Reis statt Sand (weniger Dreck).",
           "ageAdjust8": "Dinos in Gips-Klumpen einbetten (vorher vorbereiten, über Nacht trocknen). Kinder müssen mit Hammer/Holzstäbchen den Gips aufbrechen.",
           "indoorTip": "Wanne auf alte Tischdecke oder in die Badewanne stellen.",
@@ -475,7 +475,7 @@
             "Erwachsener kippt 100 ml Essig rein, sofort einen Schritt zurück",
             "Bei 8-Jährigen: Chemie erklären — Essig (Säure) + Natron (Base) = CO2 + Wasser + Natriumacetat. Spüli fängt CO2 in Blasen = Schaum"
           ],
-          "safetyRule": "Kinder min. 1 Armlänge zurück, niemals in den Krater schauen. Schürze/alte Kleidung (Lebensmittelfarbe färbt!). Erwachsener kippt den Essig, nicht das Geburtstagskind. Tablett mit Rand. Bei Augenkontakt sofort 5 Min mit Wasser spülen. Faktencheck: Mehr Natron = NICHT höhere Eruption (der Essig limitiert: 100 ml setzen nur ~7-8 g Natron um) — Mehr Spüli macht den Schaum cremiger. Natron-Essig-Variante (KEIN Wasserstoffperoxid/Trockeneis); Essig reizt die Augen — nach dem Anfassen nicht ins Gesicht fassen.",
+          "safetyRule": "Kinder min. 1 Armlänge zurück, niemals in den Krater schauen. Schürze/alte Kleidung (Lebensmittelfarbe färbt!). Erwachsener kippt den Essig, nicht das Geburtstagskind. Tablett mit Rand. Bei Augenkontakt sofort mindestens 10 Minuten mit lauwarmem Wasser spülen und danach den Augenarzt anrufen. Faktencheck: Mehr Natron = NICHT höhere Eruption (der Essig limitiert: 100 ml setzen nur ~7-8 g Natron um) — Mehr Spüli macht den Schaum cremiger. Natron-Essig-Variante (KEIN Wasserstoffperoxid/Trockeneis); Essig reizt die Augen — nach dem Anfassen nicht ins Gesicht fassen.",
           "ageAdjust6": null,
           "ageAdjust8": "Lass die Kinder den Vulkan selbst formen und die Zutaten selbst reinkippen. Erkläre kurz: „Das ist eine chemische Reaktion — Säure trifft Base!“",
           "indoorTip": "Geht, aber in der Badewanne oder auf dem Balkon. Unterlage ist Pflicht. Wachs-Tücher griffbereit.",
diff --git a/data/motto/dino-klein.json b/data/motto/dino-klein.json
index e3b9c0ea..7262f366 100644
--- a/data/motto/dino-klein.json
+++ b/data/motto/dino-klein.json
@@ -145,7 +145,7 @@
             "Erwachsener kippt 100 ml Essig rein, sofort einen Schritt zurück",
             "Ein Satz Erklärung reicht in dem Alter: „Die zwei Sachen mögen sich nicht — deshalb schäumt es so.“ Wer mehr wissen will, bekommt: Es entsteht Gas, und das Spüli macht daraus Schaum."
           ],
-          "safetyRule": "Kinder min. 1 Armlänge zurück, niemals in den Krater schauen. Schürze/alte Kleidung (Lebensmittelfarbe färbt!). Erwachsener kippt den Essig, nicht das Geburtstagskind. Tablett mit Rand. Bei Augenkontakt sofort 5 Min mit Wasser spülen. Faktencheck: Mehr Natron = NICHT höhere Eruption (der Essig limitiert: 100 ml setzen nur ~7-8 g Natron um) — Mehr Spüli macht den Schaum cremiger. Natron-Essig-Variante (KEIN Wasserstoffperoxid/Trockeneis); Essig reizt die Augen — nach dem Anfassen nicht ins Gesicht fassen.",
+          "safetyRule": "Kinder min. 1 Armlänge zurück, niemals in den Krater schauen. Schürze/alte Kleidung (Lebensmittelfarbe färbt!). Erwachsener kippt den Essig, nicht das Geburtstagskind. Tablett mit Rand. Bei Augenkontakt sofort mindestens 10 Minuten mit lauwarmem Wasser spülen und danach den Augenarzt anrufen. Faktencheck: Mehr Natron = NICHT höhere Eruption (der Essig limitiert: 100 ml setzen nur ~7-8 g Natron um) — Mehr Spüli macht den Schaum cremiger. Natron-Essig-Variante (KEIN Wasserstoffperoxid/Trockeneis); Essig reizt die Augen — nach dem Anfassen nicht ins Gesicht fassen.",
           "ageAdjust6": null,
           "ageAdjust8": "Lass die Kinder den Vulkan selbst formen und die Zutaten selbst reinkippen. Erkläre kurz: „Das ist eine chemische Reaktion — Säure trifft Base!“",
           "indoorTip": "Geht, aber in der Badewanne oder auf dem Balkon. Unterlage ist Pflicht. Wachs-Tücher griffbereit.",
@@ -261,7 +261,7 @@
             "Erwachsener kippt 100 ml Essig rein, sofort einen Schritt zurück",
             "Ein Satz Erklärung reicht in dem Alter: „Die zwei Sachen mögen sich nicht — deshalb schäumt es so.“ Wer mehr wissen will, bekommt: Es entsteht Gas, und das Spüli macht daraus Schaum."
           ],
-          "safetyRule": "Kinder min. 1 Armlänge zurück, niemals in den Krater schauen. Schürze/alte Kleidung (Lebensmittelfarbe färbt!). Erwachsener kippt den Essig, nicht das Geburtstagskind. Tablett mit Rand. Bei Augenkontakt sofort 5 Min mit Wasser spülen. Faktencheck: Mehr Natron = NICHT höhere Eruption (der Essig limitiert: 100 ml setzen nur ~7-8 g Natron um) — Mehr Spüli macht den Schaum cremiger. Natron-Essig-Variante (KEIN Wasserstoffperoxid/Trockeneis); Essig reizt die Augen — nach dem Anfassen nicht ins Gesicht fassen.",
+          "safetyRule": "Kinder min. 1 Armlänge zurück, niemals in den Krater schauen. Schürze/alte Kleidung (Lebensmittelfarbe färbt!). Erwachsener kippt den Essig, nicht das Geburtstagskind. Tablett mit Rand. Bei Augenkontakt sofort mindestens 10 Minuten mit lauwarmem Wasser spülen und danach den Augenarzt anrufen. Faktencheck: Mehr Natron = NICHT höhere Eruption (der Essig limitiert: 100 ml setzen nur ~7-8 g Natron um) — Mehr Spüli macht den Schaum cremiger. Natron-Essig-Variante (KEIN Wasserstoffperoxid/Trockeneis); Essig reizt die Augen — nach dem Anfassen nicht ins Gesicht fassen.",
           "ageAdjust6": null,
           "ageAdjust8": "Lass die Kinder den Vulkan selbst formen und die Zutaten selbst reinkippen. Erkläre kurz: „Das ist eine chemische Reaktion — Säure trifft Base!“",
           "indoorTip": "Geht, aber in der Badewanne oder auf dem Balkon. Unterlage ist Pflicht. Wachs-Tücher griffbereit.",
@@ -312,7 +312,7 @@
             "Wer einen Dino findet, trägt ihn mit Dino-Name + Fundort in den Bericht ein",
             "Mehr Dinos als Kinder vergraben (bei 6 Kindern → 10 Dinos) — jeder findet mind. einen"
           ],
-          "safetyRule": "Mini-Dinos < 3 cm vermeiden bei jüngeren Geschwistern. Sand-Wanne mit Sichtaufsicht. Hände waschen vor Snacks. Bei den Kleinen engmaschig beaufsichtigen — Reiskörner gehören nicht in Nase/Ohr; ggf. gröberes Sensorik-Medium. Reiskörner auch nicht in den Mund nehmen (Aspirationsgefahr) — Sichtaufsicht in Armlänge.",
+          "safetyRule": "Sortier die Mini-Dinos vor: Was durch eine Klopapierrolle passt, bleibt in der Schachtel — bei 3- bis 5-Jährigen ist das Erstickungsgefahr, nicht erst bei jüngeren Geschwistern. Sand-Wanne mit Sichtaufsicht. Hände waschen vor Snacks. Bei den Kleinen engmaschig beaufsichtigen — Reiskörner gehören nicht in Nase/Ohr; ggf. gröberes Sensorik-Medium. Reiskörner auch nicht in den Mund nehmen (Aspirationsgefahr) — Sichtaufsicht in Armlänge.",
           "ageAdjust6": "Figuren nur leicht bedecken, Reis statt Sand (weniger Dreck).",
           "ageAdjust8": "Dinos in Gips-Klumpen einbetten (vorher vorbereiten, über Nacht trocknen). Eine erwachsene Person bricht den Gips vorher an; die Kinder pulen mit Holzstaebchen und Pinsel weiter — kein Hammer in dieser Altersgruppe.",
           "indoorTip": "Wanne auf alte Tischdecke oder in die Badewanne stellen.",
@@ -448,7 +448,7 @@
             "Wer einen Dino findet, trägt ihn mit Dino-Name + Fundort in den Bericht ein",
             "Mehr Dinos als Kinder vergraben (bei 6 Kindern → 10 Dinos) — jeder findet mind. einen"
           ],
-          "safetyRule": "Mini-Dinos < 3 cm vermeiden bei jüngeren Geschwistern. Sand-Wanne mit Sichtaufsicht. Hände waschen vor Snacks. Bei den Kleinen engmaschig beaufsichtigen — Reiskörner gehören nicht in Nase/Ohr; ggf. gröberes Sensorik-Medium. Reiskörner auch nicht in den Mund nehmen (Aspirationsgefahr) — Sichtaufsicht in Armlänge.",
+          "safetyRule": "Sortier die Mini-Dinos vor: Was durch eine Klopapierrolle passt, bleibt in der Schachtel — bei 3- bis 5-Jährigen ist das Erstickungsgefahr, nicht erst bei jüngeren Geschwistern. Sand-Wanne mit Sichtaufsicht. Hände waschen vor Snacks. Bei den Kleinen engmaschig beaufsichtigen — Reiskörner gehören nicht in Nase/Ohr; ggf. gröberes Sensorik-Medium. Reiskörner auch nicht in den Mund nehmen (Aspirationsgefahr) — Sichtaufsicht in Armlänge.",
           "ageAdjust6": "Figuren nur leicht bedecken, Reis statt Sand (weniger Dreck).",
           "ageAdjust8": "Dinos in Gips-Klumpen einbetten (vorher vorbereiten, über Nacht trocknen). Eine erwachsene Person bricht den Gips vorher an; die Kinder pulen mit Holzstaebchen und Pinsel weiter — kein Hammer in dieser Altersgruppe.",
           "indoorTip": "Wanne auf alte Tischdecke oder in die Badewanne stellen.",
@@ -474,7 +474,7 @@
             "Erwachsener kippt 100 ml Essig rein, sofort einen Schritt zurück",
             "Ein Satz Erklärung reicht in dem Alter: „Die zwei Sachen mögen sich nicht — deshalb schäumt es so.“ Wer mehr wissen will, bekommt: Es entsteht Gas, und das Spüli macht daraus Schaum."
           ],
-          "safetyRule": "Kinder min. 1 Armlänge zurück, niemals in den Krater schauen. Schürze/alte Kleidung (Lebensmittelfarbe färbt!). Erwachsener kippt den Essig, nicht das Geburtstagskind. Tablett mit Rand. Bei Augenkontakt sofort 5 Min mit Wasser spülen. Faktencheck: Mehr Natron = NICHT höhere Eruption (der Essig limitiert: 100 ml setzen nur ~7-8 g Natron um) — Mehr Spüli macht den Schaum cremiger. Natron-Essig-Variante (KEIN Wasserstoffperoxid/Trockeneis); Essig reizt die Augen — nach dem Anfassen nicht ins Gesicht fassen.",
+          "safetyRule": "Kinder min. 1 Armlänge zurück, niemals in den Krater schauen. Schürze/alte Kleidung (Lebensmittelfarbe färbt!). Erwachsener kippt den Essig, nicht das Geburtstagskind. Tablett mit Rand. Bei Augenkontakt sofort mindestens 10 Minuten mit lauwarmem Wasser spülen und danach den Augenarzt anrufen. Faktencheck: Mehr Natron = NICHT höhere Eruption (der Essig limitiert: 100 ml setzen nur ~7-8 g Natron um) — Mehr Spüli macht den Schaum cremiger. Natron-Essig-Variante (KEIN Wasserstoffperoxid/Trockeneis); Essig reizt die Augen — nach dem Anfassen nicht ins Gesicht fassen.",
           "ageAdjust6": null,
           "ageAdjust8": "Lass die Kinder den Vulkan selbst formen und die Zutaten selbst reinkippen. Erkläre kurz: „Das ist eine chemische Reaktion — Säure trifft Base!“",
           "indoorTip": "Geht, aber in der Badewanne oder auf dem Balkon. Unterlage ist Pflicht. Wachs-Tücher griffbereit.",
diff --git a/data/motto/dino-mittel.json b/data/motto/dino-mittel.json
index 2f656e38..5995341b 100644
--- a/data/motto/dino-mittel.json
+++ b/data/motto/dino-mittel.json
@@ -77,7 +77,7 @@
             "Wer einen Dino findet, trägt ihn mit Dino-Name + Fundort in den Bericht ein",
             "Mehr Dinos als Kinder vergraben (bei 6 Kindern → 10 Dinos) — jeder findet mind. einen"
           ],
-          "safetyRule": "Mini-Dinos < 3 cm vermeiden bei jüngeren Geschwistern. Sand-Wanne mit Sichtaufsicht. Hände waschen vor Snacks.",
+          "safetyRule": "Sortier die Mini-Dinos vor: Was durch eine Klopapierrolle passt, bleibt in der Schachtel — bei 3- bis 5-Jährigen ist das Erstickungsgefahr, nicht erst bei jüngeren Geschwistern. Sand-Wanne mit Sichtaufsicht. Hände waschen vor Snacks.",
           "ageAdjust6": "Figuren nur leicht bedecken, Reis statt Sand (weniger Dreck).",
           "ageAdjust8": "Dinos in Gips-Klumpen einbetten (vorher vorbereiten, über Nacht trocknen). Kinder müssen mit Hammer/Holzstäbchen den Gips aufbrechen.",
           "indoorTip": "Wanne auf alte Tischdecke oder in die Badewanne stellen.",
@@ -238,7 +238,7 @@
             "Erwachsener kippt 100 ml Essig rein, sofort einen Schritt zurück",
             "Bei 8-Jährigen: Chemie erklären — Essig (Säure) + Natron (Base) = CO2 + Wasser + Natriumacetat. Spüli fängt CO2 in Blasen = Schaum"
           ],
-          "safetyRule": "Kinder min. 1 Armlänge zurück, niemals in den Krater schauen. Schürze/alte Kleidung (Lebensmittelfarbe färbt!). Erwachsener kippt den Essig, nicht das Geburtstagskind. Tablett mit Rand. Bei Augenkontakt sofort 5 Min mit Wasser spülen. Faktencheck: Mehr Natron = NICHT höhere Eruption (der Essig limitiert: 100 ml setzen nur ~7-8 g Natron um) — Mehr Spüli macht den Schaum cremiger. Natron-Essig-Variante (KEIN Wasserstoffperoxid/Trockeneis); Essig reizt die Augen — nach dem Anfassen nicht ins Gesicht fassen.",
+          "safetyRule": "Kinder min. 1 Armlänge zurück, niemals in den Krater schauen. Schürze/alte Kleidung (Lebensmittelfarbe färbt!). Erwachsener kippt den Essig, nicht das Geburtstagskind. Tablett mit Rand. Bei Augenkontakt sofort mindestens 10 Minuten mit lauwarmem Wasser spülen und danach den Augenarzt anrufen. Faktencheck: Mehr Natron = NICHT höhere Eruption (der Essig limitiert: 100 ml setzen nur ~7-8 g Natron um) — Mehr Spüli macht den Schaum cremiger. Natron-Essig-Variante (KEIN Wasserstoffperoxid/Trockeneis); Essig reizt die Augen — nach dem Anfassen nicht ins Gesicht fassen.",
           "ageAdjust6": null,
           "ageAdjust8": "Lass die Kinder den Vulkan selbst formen und die Zutaten selbst reinkippen. Erkläre kurz: „Das ist eine chemische Reaktion — Säure trifft Base!“",
           "indoorTip": "Geht, aber in der Badewanne oder auf dem Balkon. Unterlage ist Pflicht. Wachs-Tücher griffbereit.",
@@ -264,7 +264,7 @@
             "Wer einen Dino findet, trägt ihn mit Dino-Name + Fundort in den Bericht ein",
             "Mehr Dinos als Kinder vergraben (bei 6 Kindern → 10 Dinos) — jeder findet mind. einen"
           ],
-          "safetyRule": "Mini-Dinos < 3 cm vermeiden bei jüngeren Geschwistern. Sand-Wanne mit Sichtaufsicht. Hände waschen vor Snacks.",
+          "safetyRule": "Sortier die Mini-Dinos vor: Was durch eine Klopapierrolle passt, bleibt in der Schachtel — bei 3- bis 5-Jährigen ist das Erstickungsgefahr, nicht erst bei jüngeren Geschwistern. Sand-Wanne mit Sichtaufsicht. Hände waschen vor Snacks.",
           "ageAdjust6": "Figuren nur leicht bedecken, Reis statt Sand (weniger Dreck).",
           "ageAdjust8": "Dinos in Gips-Klumpen einbetten (vorher vorbereiten, über Nacht trocknen). Kinder müssen mit Hammer/Holzstäbchen den Gips aufbrechen.",
           "indoorTip": "Wanne auf alte Tischdecke oder in die Badewanne stellen.",
@@ -472,7 +472,7 @@
             "Erwachsener kippt 100 ml Essig rein, sofort einen Schritt zurück",
             "Bei 8-Jährigen: Chemie erklären — Essig (Säure) + Natron (Base) = CO2 + Wasser + Natriumacetat. Spüli fängt CO2 in Blasen = Schaum"
           ],
-          "safetyRule": "Kinder min. 1 Armlänge zurück, niemals in den Krater schauen. Schürze/alte Kleidung (Lebensmittelfarbe färbt!). Erwachsener kippt den Essig, nicht das Geburtstagskind. Tablett mit Rand. Bei Augenkontakt sofort 5 Min mit Wasser spülen. Faktencheck: Mehr Natron = NICHT höhere Eruption (der Essig limitiert: 100 ml setzen nur ~7-8 g Natron um) — Mehr Spüli macht den Schaum cremiger. Natron-Essig-Variante (KEIN Wasserstoffperoxid/Trockeneis); Essig reizt die Augen — nach dem Anfassen nicht ins Gesicht fassen.",
+          "safetyRule": "Kinder min. 1 Armlänge zurück, niemals in den Krater schauen. Schürze/alte Kleidung (Lebensmittelfarbe färbt!). Erwachsener kippt den Essig, nicht das Geburtstagskind. Tablett mit Rand. Bei Augenkontakt sofort mindestens 10 Minuten mit lauwarmem Wasser spülen und danach den Augenarzt anrufen. Faktencheck: Mehr Natron = NICHT höhere Eruption (der Essig limitiert: 100 ml setzen nur ~7-8 g Natron um) — Mehr Spüli macht den Schaum cremiger. Natron-Essig-Variante (KEIN Wasserstoffperoxid/Trockeneis); Essig reizt die Augen — nach dem Anfassen nicht ins Gesicht fassen.",
           "ageAdjust6": null,
           "ageAdjust8": "Lass die Kinder den Vulkan selbst formen und die Zutaten selbst reinkippen. Erkläre kurz: „Das ist eine chemische Reaktion — Säure trifft Base!“",
           "indoorTip": "Geht, aber in der Badewanne oder auf dem Balkon. Unterlage ist Pflicht. Wachs-Tücher griffbereit.",
diff --git a/data/motto/dschungel-gross.json b/data/motto/dschungel-gross.json
index 23506a63..f8047b83 100644
--- a/data/motto/dschungel-gross.json
+++ b/data/motto/dschungel-gross.json
@@ -1169,7 +1169,7 @@
               "content": "Schlafsäcke ausrollen, Taschenlampen-Geschichten, langsam ausklingen lassen. Geschichten-Idee: „Was die Anakonda im Bachlauf erzählt hat.“"
             }
           ],
-          "safetyRule": "Eltern-Opt-In schriftlich. Allergien (besonders Insektenstiche!), Asthma-Inhalator und Medikamente vorher einsammeln. Bei der Garten-Beobachtung Stolperfallen vorher entschärfen, Stirnlampen für alle. Mücken-Spray bereitstellen (Pflegepflicht der Eltern abklären). Bei Wespen-/Hornissen-Allergie: Beobachtung im Wohnzimmer am Fenster statt im Garten.",
+          "safetyRule": "Eltern-Opt-In schriftlich. Allergien (besonders Insektenstiche!), Asthma und Medikamente vorher abfragen. Notfallmedikamente werden nicht eingesammelt: Asthmaspray und Adrenalin-Pen bleiben beim Kind oder liegen an einem festen Platz, den alle kennen und der auch nachts in Sekunden erreichbar ist. Notier dir, wer was braucht und wie es angewendet wird, und leg die Nummern der Eltern daneben. Bei der Garten-Beobachtung Stolperfallen vorher entschärfen, Stirnlampen für alle. Mücken-Spray bereitstellen (Pflegepflicht der Eltern abklären). Bei Wespen-/Hornissen-Allergie: Beobachtung im Wohnzimmer am Fenster statt im Garten.",
           "ageAdjust9": "Nicht empfohlen unter 10 — Stolperfallen-Risiko im Dunkeln, lange Wachzeiten überfordern."
         },
         {
diff --git a/data/motto/einhorn-mittel.json b/data/motto/einhorn-mittel.json
index 0cbdba82..f8068605 100644
--- a/data/motto/einhorn-mittel.json
+++ b/data/motto/einhorn-mittel.json
@@ -174,7 +174,7 @@
               "content": "Beruhigt nach dem Kuchen-Zucker-Hoch — perfekter ruhiger Block."
             }
           ],
-          "safetyRule": "Reis-Wanne nur unter Sichtaufsicht. Für 3-Jährige: Reis und Glitzer können in Nase/Atemweg gelangen — Kinder nicht alleine graben lassen. Nur essbaren Glitzer oder grobes Material verwenden (Aspirationsrisiko). Figuren min. 6 cm. Bei Allergiker-Kindern: vorher Glitzer-Inhaltsstoffe checken (E-Nummern).",
+          "safetyRule": "Reis-Wanne nur unter Sichtaufsicht. Reis und Glitzer können in Nase und Atemweg gelangen — nicht alleine graben lassen, und jüngere Geschwister am Tisch besonders im Blick behalten. Nur essbaren Glitzer oder grobes Material verwenden (Aspirationsrisiko). Figuren min. 6 cm. Bei Allergiker-Kindern: vorher Glitzer-Inhaltsstoffe checken (E-Nummern).",
           "indoorTip": "Wanne in die Badewanne oder auf eine alte Tischdecke — Reis-Körner gehen sonst tagelang aus dem Teppich.",
           "outdoorTip": "Auf der Terrasse oder Wiese großzügig — verstreuter Reis ist Vogelfutter.",
           "whyItWorksTitle": null,
@@ -495,7 +495,7 @@
               "content": "Beruhigt nach dem Kuchen-Zucker-Hoch — perfekter ruhiger Block."
             }
           ],
-          "safetyRule": "Reis-Wanne nur unter Sichtaufsicht. Für 3-Jährige: Reis und Glitzer können in Nase/Atemweg gelangen — Kinder nicht alleine graben lassen. Nur essbaren Glitzer oder grobes Material verwenden (Aspirationsrisiko). Figuren min. 6 cm. Bei Allergiker-Kindern: vorher Glitzer-Inhaltsstoffe checken (E-Nummern).",
+          "safetyRule": "Reis-Wanne nur unter Sichtaufsicht. Reis und Glitzer können in Nase und Atemweg gelangen — nicht alleine graben lassen, und jüngere Geschwister am Tisch besonders im Blick behalten. Nur essbaren Glitzer oder grobes Material verwenden (Aspirationsrisiko). Figuren min. 6 cm. Bei Allergiker-Kindern: vorher Glitzer-Inhaltsstoffe checken (E-Nummern).",
           "indoorTip": "Wanne in die Badewanne oder auf eine alte Tischdecke — Reis-Körner gehen sonst tagelang aus dem Teppich.",
           "outdoorTip": "Auf der Terrasse oder Wiese großzügig — verstreuter Reis ist Vogelfutter.",
           "whyItWorksTitle": null,
@@ -772,7 +772,7 @@
               "content": "Beruhigt nach dem Kuchen-Zucker-Hoch — perfekter ruhiger Block."
             }
           ],
-          "safetyRule": "Reis-Wanne nur unter Sichtaufsicht. Für 3-Jährige: Reis und Glitzer können in Nase/Atemweg gelangen — Kinder nicht alleine graben lassen. Nur essbaren Glitzer oder grobes Material verwenden (Aspirationsrisiko). Figuren min. 6 cm. Bei Allergiker-Kindern: vorher Glitzer-Inhaltsstoffe checken (E-Nummern).",
+          "safetyRule": "Reis-Wanne nur unter Sichtaufsicht. Reis und Glitzer können in Nase und Atemweg gelangen — nicht alleine graben lassen, und jüngere Geschwister am Tisch besonders im Blick behalten. Nur essbaren Glitzer oder grobes Material verwenden (Aspirationsrisiko). Figuren min. 6 cm. Bei Allergiker-Kindern: vorher Glitzer-Inhaltsstoffe checken (E-Nummern).",
           "indoorTip": "Wanne in die Badewanne oder auf eine alte Tischdecke — Reis-Körner gehen sonst tagelang aus dem Teppich.",
           "outdoorTip": "Auf der Terrasse oder Wiese großzügig — verstreuter Reis ist Vogelfutter.",
           "whyItWorksTitle": null,
diff --git a/data/motto/meerjungfrau-gross.json b/data/motto/meerjungfrau-gross.json
index d260e6e2..11a8e8ed 100644
--- a/data/motto/meerjungfrau-gross.json
+++ b/data/motto/meerjungfrau-gross.json
@@ -947,7 +947,7 @@
               "content": "Schlafsäcke ausrollen, Taschenlampen-Geschichten, langsam ausklingen lassen. Geschichten-Idee: „Was die Krake erzählt hat.“"
             }
           ],
-          "safetyRule": "Eltern-Opt-In schriftlich. Allergien, Asthma-Inhalator und Medikamente vorher einsammeln. Bei der Garten-Suche Stolperfallen vorher entschärfen, Stirnlampen für alle. Sternenhimmel-Beobachtung nur bei klarem Wetter sinnvoll.",
+          "safetyRule": "Eltern-Opt-In schriftlich. Allergien, Asthma und Medikamente vorher abfragen. Notfallmedikamente werden nicht eingesammelt: Asthmaspray und Adrenalin-Pen bleiben beim Kind oder liegen an einem festen Platz, den alle kennen und der auch nachts in Sekunden erreichbar ist. Notier dir, wer was braucht und wie es angewendet wird, und leg die Nummern der Eltern daneben. Bei der Garten-Suche Stolperfallen vorher entschärfen, Stirnlampen für alle. Sternenhimmel-Beobachtung nur bei klarem Wetter sinnvoll.",
           "ageAdjust9": "Nicht empfohlen unter 10 — eher Wow ohne Schlafparty.",
           "ageAdjust12": "Mehr Tiefe: Lösungswort aus 8 Buchstaben rekonstruieren. Der ERSTE Buchstabe ist um 1 nach hinten verschoben — B steht statt A, M statt L. Verschiebe ihn um 1 zurück. Beispiel: \"BTLANTIS\" → ATLANTIS. Die anderen 7 Buchstaben sind unverändert.",
           "indoorTip": "Bei Regen die Meerestier-Suche in eine abgedunkelte Wohnung verlegen — Stirnlampen funktionieren drinnen genauso. Statt Sterne: Bioluminiszenz-Videos auf dem Beamer.",
diff --git a/data/motto/safari-gross.json b/data/motto/safari-gross.json
index 7e8b398b..7a97dada 100644
--- a/data/motto/safari-gross.json
+++ b/data/motto/safari-gross.json
@@ -987,7 +987,7 @@
               "content": "Schlafsäcke ausrollen, Taschenlampen-Geschichten, langsam ausklingen lassen."
             }
           ],
-          "safetyRule": "Eltern-Opt-In schriftlich. Allergien, Asthma-Inhalator und Medikamente vorher einsammeln. Bei der Garten-Safari Stolperfallen vorher entschärfen, Stirnlampen für alle.",
+          "safetyRule": "Eltern-Opt-In schriftlich. Allergien, Asthma und Medikamente vorher abfragen. Notfallmedikamente werden nicht eingesammelt: Asthmaspray und Adrenalin-Pen bleiben beim Kind oder liegen an einem festen Platz, den alle kennen und der auch nachts in Sekunden erreichbar ist. Notier dir, wer was braucht und wie es angewendet wird, und leg die Nummern der Eltern daneben. Bei der Garten-Safari Stolperfallen vorher entschärfen, Stirnlampen für alle.",
           "ageAdjust9": "Nicht empfohlen unter 10 — eher Wow ohne Schlafparty.",
           "ageAdjust12": "Tier-Doku anspruchsvoller wählen, längere Taschenlampen-Geschichten zulassen.",
           "indoorTip": "Bei Regen die Tier-Suche in eine abgedunkelte Wohnung verlegen — Stirnlampen funktionieren drinnen genauso.",
diff --git a/data/motto/safari-klein.json b/data/motto/safari-klein.json
index c9904d53..9b52ec63 100644
--- a/data/motto/safari-klein.json
+++ b/data/motto/safari-klein.json
@@ -356,7 +356,7 @@
           "hasAffiliate": false,
           "category": "pflicht",
           "categoryReasoning": "Löwen-Kuchen-Basis. Mehl/Eier/Butter hat man teils, Mandelblättchen meist nicht — als Pflicht eingeplant.",
-          "safetyNote": "Mandelblättchen sind ein Nussallergen und obendrein bei 3- bis 5-Jährigen ein Aspirationsrisiko: Frag Nussallergien mit der Einladung ab und back für die Kleinsten lieber eine Mähne aus Kokosraspeln oder Streuseln."
+          "safetyNote": "Mandelblättchen sind ein Nussallergen und obendrein bei 3- bis 5-Jährigen ein Aspirationsrisiko: Frag Nussallergien mit der Einladung ab und back die Mähne für die Kleinsten aus Kokosraspeln oder Cornflakes statt aus Mandelblättchen."
         }
       ],
       "costContext": "Geschätzte Kosten (Minimal, 6 Kinder)",
@@ -690,7 +690,7 @@
           "hasAffiliate": false,
           "category": "pflicht",
           "categoryReasoning": "Löwen-Kuchen. Mandelblättchen für die Mähne meist nicht vorrätig — eingeplant.",
-          "safetyNote": "Mandelblättchen sind ein Nussallergen und obendrein bei 3- bis 5-Jährigen ein Aspirationsrisiko: Frag Nussallergien mit der Einladung ab und back für die Kleinsten lieber eine Mähne aus Kokosraspeln oder Streuseln."
+          "safetyNote": "Mandelblättchen sind ein Nussallergen und obendrein bei 3- bis 5-Jährigen ein Aspirationsrisiko: Frag Nussallergien mit der Einladung ab und back die Mähne für die Kleinsten aus Kokosraspeln oder Cornflakes statt aus Mandelblättchen."
         }
       ],
       "costContext": "Geschätzte Kosten (Standard, 6 Kinder)",
@@ -1099,7 +1099,7 @@
           "hasAffiliate": false,
           "category": "pflicht",
           "categoryReasoning": "Löwen-Kuchen + Zweitkuchen für 8 Kinder. Pflicht.",
-          "safetyNote": "Mandelblättchen sind ein Nussallergen und obendrein bei 3- bis 5-Jährigen ein Aspirationsrisiko: Frag Nussallergien mit der Einladung ab und back für die Kleinsten lieber eine Mähne aus Kokosraspeln oder Streuseln."
+          "safetyNote": "Mandelblättchen sind ein Nussallergen und obendrein bei 3- bis 5-Jährigen ein Aspirationsrisiko: Frag Nussallergien mit der Einladung ab und back die Mähne für die Kleinsten aus Kokosraspeln oder Cornflakes statt aus Mandelblättchen."
         }
       ],
       "costContext": "Geschätzte Kosten (Wow, 8 Kinder, ohne Highlight-Produkte)",
diff --git a/data/motto/weltraum-gross.json b/data/motto/weltraum-gross.json
index c58ee3af..c2f69e19 100644
--- a/data/motto/weltraum-gross.json
+++ b/data/motto/weltraum-gross.json
@@ -352,7 +352,7 @@
           "hasAffiliate": false,
           "category": "pflicht",
           "categoryReasoning": "Verpflegung und Programmpunkt (Selbst-Mischen) zugleich.",
-          "safetyNote": "Ganze Nüsse sind nichts für Kinder unter fünf und gehören auf die Allergie-Liste: Frag Nussallergien mit der Einladung ab, und wenn jüngere Geschwister mitfeiern, nimmst du Trockenobst und Riegel ohne ganze Nüsse."
+          "safetyNote": "Ganze Nüsse sind nichts für Kinder unter vier und gehören auf die Allergie-Liste: Frag Nussallergien mit der Einladung ab, und wenn jüngere Geschwister mitfeiern, nimmst du Trockenobst und Riegel ohne ganze Nüsse."
         },
         {
           "emoji": "🥤",
@@ -810,7 +810,7 @@
           "hasAffiliate": false,
           "category": "pflicht",
           "categoryReasoning": "Verpflegung + Programm.",
-          "safetyNote": "Ganze Nüsse sind nichts für Kinder unter fünf und gehören auf die Allergie-Liste: Frag Nussallergien mit der Einladung ab, und wenn jüngere Geschwister mitfeiern, nimmst du Trockenobst und Riegel ohne ganze Nüsse."
+          "safetyNote": "Ganze Nüsse sind nichts für Kinder unter vier und gehören auf die Allergie-Liste: Frag Nussallergien mit der Einladung ab, und wenn jüngere Geschwister mitfeiern, nimmst du Trockenobst und Riegel ohne ganze Nüsse."
         },
         {
           "emoji": "🥤",
@@ -1243,7 +1243,7 @@
           "hasAffiliate": false,
           "category": "pflicht",
           "categoryReasoning": "Verpflegung + Programm + Nacht-Snack.",
-          "safetyNote": "Ganze Nüsse sind nichts für Kinder unter fünf und gehören auf die Allergie-Liste: Frag Nussallergien mit der Einladung ab, und wenn jüngere Geschwister mitfeiern, nimmst du Trockenobst und Riegel ohne ganze Nüsse."
+          "safetyNote": "Ganze Nüsse sind nichts für Kinder unter vier und gehören auf die Allergie-Liste: Frag Nussallergien mit der Einladung ab, und wenn jüngere Geschwister mitfeiern, nimmst du Trockenobst und Riegel ohne ganze Nüsse."
         },
         {
           "emoji": "🥤",
diff --git a/kindergeburtstag/detektiv-6-8-jahre.html b/kindergeburtstag/detektiv-6-8-jahre.html
index f541c2c4..d02e4ca3 100644
--- a/kindergeburtstag/detektiv-6-8-jahre.html
+++ b/kindergeburtstag/detektiv-6-8-jahre.html
@@ -199,7 +199,7 @@ window.plausible.init=function(){};window.plausible.q=[];
       <div class="game-needs"><strong>Material:</strong> 6 Hinweis-Karten (DIN A6) mit je 1 Buchstaben (S-P-U-R-E-N) + kleinem Bild, 1 Lupe pro Kind (oder Glas), Klebepads für Verstecke in Greifhöhe</div>
       <div class="game-rules"><strong>So geht's:</strong> Vorher 6 Hinweis-Karten in der Wohnung verteilen — alle in Greifhöhe (Sofa, Bilderrahmen, Pflanze). Jede Karte zeigt einen Buchstaben (S, P, U, R, E, N). Die Kinder suchen in 2er-Teams, jeder Fund wird laut gerufen und auf einen Bogen notiert. Wenn alle 6 Buchstaben da sind, geht's zum Code-Knacken — das Codewort lautet SPUREN.</div>
       <div class="game-safety"><strong>⚠️ Sicherheit:</strong> Keine Verstecke auf wackeligen Stühlen, Fensterbänken oder hinter heißen Geräten. Alles in Greifhöhe — Buddel-Aktionen frustrieren 6-Jährige.</div>
-    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Keine Verstecke auf wackeligen Stühlen, Fensterbänken oder hinter heißen Geräten. Alles in Greifhöhe der Kinder.</p></div>
+    </div>
 
     <div class="game-detail">
       <h4>🔑 Code knacken &amp; Kuchen finden — Spielanleitung</h4>
@@ -207,7 +207,7 @@ window.plausible.init=function(){};window.plausible.q=[];
       <div class="game-needs"><strong>Material:</strong> Die 6 gefundenen Buchstaben-Karten (S-P-U-R-E-N), 1 „Code-Tafel" (Blatt mit 6 leeren Kästchen), 1 versteckter Kuchen, blanko Diplome</div>
       <div class="game-rules"><strong>So geht's:</strong> Die 6 Karten werden auf die Code-Tafel gelegt und zum Wort sortiert. Das Codewort SPUREN verrät den letzten Hinweis: Mit Warm/Kalt-Tipps wird der versteckte Kuchen lokalisiert. Wer ihn findet, läutet die Ermittlungs-Glocke.</div>
       <div class="game-safety"><strong>⚠️ Sicherheit:</strong> Beim Suchen nach dem Versteck nicht rennen und nicht schubsen — der Kuchen läuft nicht weg.</div>
-    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Beim Suchen nach dem Versteck nicht rennen und nicht schubsen — der Kuchen läuft nicht weg.</p></div>
+    </div>
 
     <h3>🍿 Essen (6 Kinder, 2,25 Std.)</h3>
     <div class="snack-grid">
@@ -283,7 +283,7 @@ window.plausible.init=function(){};window.plausible.q=[];
       <div class="game-needs"><strong>Material:</strong> 4 „Verdächtige" (Erwachsene, große Stofftiere oder Bilder mit Namensschild), pro Verdächtigem 1 Aussage-Kärtchen, 1 Ermittlungs-Heft pro Team</div>
       <div class="game-rules"><strong>So geht's:</strong> 4 Verdächtige mit Namen vorstellen (z.B. Frau Müller, der Briefträger, die Katze, Onkel Robert). Die 2er- oder 3er-Teams gehen reihum, jeder Verdächtige gibt EINE Aussage. Aussagen notieren (malen oder schreiben). Am Ende: Eine Aussage ist die Lüge — wer findet sie?</div>
       <div class="game-safety"><strong>⚠️ Sicherheit:</strong> Die Verdächtigen bleiben freundlich und spielen nicht bedrohlich — es geht um einen verschwundenen Kuchen, nicht um Angst.</div>
-    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Die Verdächtigen bleiben freundlich und spielen nicht bedrohlich — es geht um einen verschwundenen Kuchen, nicht um etwas Gruseliges.</p></div>
+    </div>
 
     <div class="game-detail">
       <h4>🖐️ Das Fingerabdruck-Labor — Spielanleitung</h4>
@@ -291,7 +291,7 @@ window.plausible.init=function(){};window.plausible.q=[];
       <div class="game-needs"><strong>Material:</strong> 1 <a href="https://www.amazon.de/s?k=stempelkissen+abwaschbar+kinder&amp;tag=machsleicht21-21" target="_blank" rel="noopener sponsored">Stempelkissen abwaschbar*</a> (oder Bleistift-Mine + Tesafilm), weißes Papier, 1 Lupe pro Kind, 1 vorbereiteter „Tatort-Abdruck" auf Karte. Vorbereitet 4 Verdächtigen-Abdruck-Karten mit klar unterscheidbaren Mustern.</div>
       <div class="game-rules"><strong>So geht's:</strong> Jedes Kind drückt einen Finger aufs Stempelkissen und macht den eigenen Abdruck auf Papier. Mit der Lupe das eigene Muster betrachten — Schleife, Bogen oder Wirbel? Dann den großen Tatort-Abdruck herumgeben. Passt er zu einem der Verdächtigen? Vergleich mit den 4 Karten.</div>
       <div class="game-safety"><strong>⚠️ Sicherheit:</strong> Stempelfarbe auf Wasserbasis verwenden (abwaschbar) und nicht in Augen/Mund. Bei den Jüngsten beim Abdruck-Nehmen kurz helfen.</div>
-    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Stempelfarbe auf Wasserbasis verwenden (abwaschbar) und nicht in Augen/Mund — bei den Jüngsten beim Stempeln dabei bleiben.</p></div>
+    </div>
 
     <div class="game-detail">
       <h4>🍋 Geheimtinte sichtbar machen — Spielanleitung</h4>
@@ -299,15 +299,15 @@ window.plausible.init=function(){};window.plausible.q=[];
       <div class="game-needs"><strong>Material:</strong> Zitronensaft, Wattestäbchen, weißes Papier, 1 Föhn oder Backofen 100°C 5 Min, vorbereitete Geheim-Botschaft</div>
       <div class="game-rules"><strong>So geht's:</strong> Ein scheinbar leeres Blatt taucht im Ermittlungs-Heft auf. „Da steht doch nichts?" Wärme anwenden: Föhn auf mittlerer Stufe (NICHT höchste — sonst über 80°C möglich) oder vorgewärmte Backofen-Restwärme. Die braune Schrift erscheint! Der Code-Knacker liest vor: Der nächste Hinweis ist offenbar.</div>
       <div class="game-safety"><strong>⚠️ Sicherheit:</strong> DEFAULT: Föhn auf MITTLERER Stufe (höchste Stufe kann über 80°C erreichen) ODER Backofen-Restwärme max. 80°C. Den Wärme-Schritt führt IMMER der Erwachsene aus, nie das Kind. BÜGELEISEN gar nicht verwenden — Verbrennungsgefahr ist zu hoch für diese Altersgruppe.</div>
-    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> DEFAULT: Foehn auf hoechster Stufe ODER Backofen-Restwaerme (max 80 Grad). BUEGELEISEN nur als NOTFALL-Option (&gt;150 Grad = hohes Verbrennungsrisiko bei Kindern). Wenn Buegeleisen: AUSSCHLIESSLICH Erwachsener, Kinder SITZEN mit Mindestabstand 1 m, Erwachsener STEHT, abgedunkelter Raum erhoeht Risiko (Schatten ueber heiße Flaeche).</p></div>
+    </div>
 
     <div class="game-detail">
       <h4>👣 Der Spuren-Parcours — Spielanleitung</h4>
       <div class="game-meta"><span>⏱ 20 Min.</span><span>🧒 Ab 6 Jahre</span><span class="game-tag both">Drinnen &amp; Draußen</span><span>💪 15 Min. Aufbau</span></div>
       <div class="game-needs"><strong>Material:</strong> Tonpapier-Fußspuren (oder Klebeband-Markierungen), 3–4 „Stationen" mit Mini-Aufgaben, 1 Hinweis-Karte am Ziel</div>
       <div class="game-rules"><strong>So geht's:</strong> „Der Täter hat Fußspuren hinterlassen!" Die Gruppe folgt der Spur. An Station 1: auf einem Bein balancieren wie ein Detektiv. Station 2: unter einem „Laserstrahl" (Wollfaden) durchkrabbeln. Station 3: Geräusche-Rätsel. Am Ziel: nächste Hinweis-Karte.</div>
-      <div class="game-safety"><strong>⚠️ Sicherheit:</strong> Den „Laserstrahl"-Faden niedrig genug spannen und feste Möbel als Verankerung nutzen — nichts, was umfallen kann.</div>
-    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Den &quot;Laserstrahl&quot;-Faden niedrig genug spannen und feste Möbel als Verankerung nutzen — nichts, was umkippen kann. Boden weich/rutschfest, reihum (nie zwei gleichzeitig). Auf glattem Boden barfuß oder Schuhe mit Grip (keine Socken — Rutschgefahr); harte Möbelkanten im Laufweg abräumen/abpolstern.</p></div>
+      <div class="game-safety"><strong>⚠️ Sicherheit:</strong> Den „Laserstrahl"-Faden niedrig genug spannen und feste Möbel als Verankerung nutzen — nichts, was umfallen kann. Boden weich und rutschfest, immer nur ein Kind gleichzeitig auf der Strecke. Auf glattem Boden barfuß oder Schuhe mit Grip — in Socken rutscht man weg.</div>
+    </div>
 
     <div class="game-detail">
       <h4>🕵️ Beschattungs-Mission (Bonus, eher 7–8) — Spielanleitung</h4>
@@ -315,7 +315,7 @@ window.plausible.init=function(){};window.plausible.q=[];
       <div class="game-needs"><strong>Material:</strong> 1 erwachsene Person als „Verdächtige(r)" (oder älteres Geschwisterkind), 1 Ermittlungs-Heft pro 2er-Team, Bleistifte, ein auffälliges „Beweisstück" (Tuch, Schlüsselbund)</div>
       <div class="game-rules"><strong>So geht's:</strong> Briefing: „Der Verdächtige verliert ein Beweisstück — beobachtet aus dem Versteck, was er macht und wohin er es legt." Der Verdächtige startet seinen Rundgang an 3–4 Stationen, macht dabei auffällige Dinge (Buch wegnehmen, Beweisstück auslegen). Die Teams sitzen verteilt auf Beobachtungs-Posten und notieren. Rückkehr und Notizen-Vergleich. <strong>Wichtig:</strong> Kein „leise schleichen"-Druck — für 6-Jährige funktioniert das nicht, sie kichern und sind frustriert. Beobachten aus festem Posten klappt besser.</div>
       <div class="game-safety"><strong>⚠️ Sicherheit:</strong> Der Verdächtige geht IMMER im Schritttempo und nutzt keine Treppen ohne Begleitung. Beschattung darf nicht in Sturz-Situationen führen. Für reine 6-Jährige Gruppen besser auslassen oder durch „Beweis-Posten"-Spiel ersetzen (Erwachsener verteilt Beweisstücke, Kinder suchen).</div>
-    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Der Verdächtige geht IMMER im Schritttempo und nutzt keine Treppen ohne Begleitung — Beschattung darf nicht in Rennen ausarten. Klar vorher sagen: „Nicht anrempeln, nicht anschreien — leise bleiben.“</p></div>
+    </div>
 
     <div class="game-detail">
       <h4>🔑 Großer Code &amp; Fall-Auflösung — Spielanleitung</h4>
@@ -323,7 +323,7 @@ window.plausible.init=function(){};window.plausible.q=[];
       <div class="game-needs"><strong>Material:</strong> Alle gesammelten Buchstaben/Hinweise, 1 Code-Tafel, 1 versteckter Kuchen, blanko Diplome + Stempel</div>
       <div class="game-rules"><strong>So geht's:</strong> Alle Funde des Tages auf den Ermittlungs-Tisch legen. Die Buchstaben werden auf die Code-Tafel sortiert und ergeben das Codewort. Mit Warm/Kalt-Tipps zum Versteck. Wer findet, bekommt zuerst Diplom. Dann alle Diplome — Fall gelöst.</div>
       <div class="game-safety"><strong>⚠️ Sicherheit:</strong> Beim Suchen nach dem Versteck nicht drängeln; jeder darf den Kuchen einmal „entdecken" dürfen, auch wenn ein Kind ihn als Erstes sieht.</div>
-    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Beim Suchen nach dem Versteck nicht drängeln; jeder darf den Kuchen einmal &quot;entdecken&quot; dürfen, auch wenn ein Kind ihn zuerst sieht.</p></div>
+    </div>
 
     <h3>🍿 Essen (8 Kinder, 3 Std.)</h3>
     <div class="snack-grid">
@@ -406,7 +406,7 @@ window.plausible.init=function(){};window.plausible.q=[];
       <div class="game-needs"><strong>Material:</strong> 3–4 vorbereitete Räume/Bereiche, je 1 Tatort-Station (Schild, Hinweis, kleines Rätsel), Spuren-Karte des „Tatorts" (Wohnungsplan), Taschenlampen</div>
       <div class="game-rules"><strong>So geht's:</strong> Die Agentur erhält eine „Tatort-Karte" und ein Spuren-Bündel. In jedem markierten Raum gibt es eine Station: ein Schild („Wohnzimmer-Tatort"), einen Hinweis und ein kleines Rätsel zu lösen. Erst wenn alle 3–4 Räume durch sind, hat die Gruppe alle Hinweise für den finalen Code.</div>
       <div class="game-safety"><strong>⚠️ Sicherheit:</strong> Taschenlampen statt Decke-aus für gedämpftes Licht — und Stolperfallen (Kabel, lose Teppiche) vor der Tour entfernen.</div>
-    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Taschenlampen statt Decke-aus für gedämpftes Licht — und Stolperfallen (Kabel, lose Teppiche) vor der Tour entfernen.</p></div>
+    </div>
 
     <div class="game-detail">
       <h4>🔐 Das große Code-Rätsel — Spielanleitung</h4>
@@ -414,7 +414,7 @@ window.plausible.init=function(){};window.plausible.q=[];
       <div class="game-needs"><strong>Material:</strong> Geheimtinten-Botschaft, 1 mehrteilige Code-Tafel, alle Hinweis-Teile der Tour, 1 „Tresor" (Schachtel mit Zahlenschloss-Bild oder Schnur), Kuchen + Geschenk als Schatz</div>
       <div class="game-rules"><strong>So geht's:</strong> Alle Hinweise der Multi-Raum-Tour werden auf die Code-Tafel sortiert. Eine Geheimtinten-Botschaft enthüllt das Schlüsselwort. Das Wort öffnet den Tresor (Schnur lösen oder Schachtel-Klett). Im Tresor: Kuchen und Geschenk.</div>
       <div class="game-safety"><strong>⚠️ Sicherheit:</strong> Die Tresor-Schachtel ohne echtes Schloss bauen (Schnur/Klett) — keine Kleinteile, an denen sich jemand verletzen kann.</div>
-    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Die Tresor-Schachtel ohne echtes Schloss bauen (Schnur/Klett) — keine Kleinteile, an denen sich jemand klemmt.</p></div>
+    </div>
 
     <h3>🍿 Essen (8–10 Kinder, 4 Std.)</h3>
     <div class="snack-grid">
diff --git a/kindergeburtstag/detektiv-9-12-jahre.html b/kindergeburtstag/detektiv-9-12-jahre.html
index 5ad41dea..f7950567 100644
--- a/kindergeburtstag/detektiv-9-12-jahre.html
+++ b/kindergeburtstag/detektiv-9-12-jahre.html
@@ -202,7 +202,7 @@ window.plausible.init=function(){};window.plausible.q=[];
       <div class="game-needs"><strong>Material:</strong> 1 „Tatort-Glas" (Trinkglas, vorher mit deutlichem Abdruck präpariert), weicher Bleistift (2B), weißes Papier, durchsichtiges Klebeband (Tesafilm), eine Lupe pro Team, 5 Verdächtigen-Karten mit Beispiel-Abdrücken</div>
       <div class="game-rules"><strong>So geht's:</strong> Mit dem Bleistift Graphit-Staub auf weißes Papier reiben, dann das Klebeband über den Abdruck auf dem Glas drücken. Klebeband abziehen — der Abdruck haftet. Mit Lupe und Verdächtigen-Karten vergleichen: Welche Karte zeigt das gleiche Muster (Schleife, Bogen, Wirbel)?</div>
       <div class="game-safety"><strong>⚠️ Sicherheit:</strong> Kein scharfes Werkzeug, kein echtes Pulver mit Reizstoffen — Bleistift-Graphit reicht völlig. Das Glas hinterher normal spülen.</div>
-    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Kein scharfes Werkzeug, kein echtes Pulver mit Reizstoffen — Bleistift-Graphit reicht völlig. Das Glas hinterher normal spülen.</p></div>
+    </div>
 
     <h3>🍿 Essen (6 Kinder, 2,5 Std.)</h3>
     <div class="snack-grid">
@@ -278,7 +278,7 @@ window.plausible.init=function(){};window.plausible.q=[];
       <div class="game-needs"><strong>Material:</strong> Ein präparierter „Tatort-Tisch" mit 6 Spuren (Schuhabdruck aus Mehl/Kakao, Faser an Klebeband, „vergessener" Knopf, Haar, Notizfetzen, Fingerabdruck), Bleistift, Klebeband, Lupe pro Team, Spuren-Karten zum Vergleich</div>
       <div class="game-rules"><strong>So geht's:</strong> Der Spurensicherer-Trupp sichert mit Klebeband und Bleistift-Graphit die 6 Spuren am Tatort. Vergleicht jede Spur mit den 5 Verdächtigen-Karten: Schuhgröße, Faserfarbe, Knopf-Typ. Ergebnis: 1–2 Verdächtige bleiben übrig.</div>
       <div class="game-safety"><strong>⚠️ Sicherheit:</strong> Mehl/Kakao für Abdrücke statt echtem Pulver, keine scharfen Gegenstände am Tatort.</div>
-    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Mehl/Kakao für Abdrücke statt echtem Pulver, keine scharfen Gegenstände am Tatort.</p></div>
+    </div>
 
     <div class="game-detail">
       <h4>2️⃣ Verhör &amp; Alibi-Check (Profiler-Hauptstation) — Spielanleitung</h4>
@@ -399,7 +399,7 @@ window.plausible.init=function(){};window.plausible.q=[];
       <div class="game-needs"><strong>Material:</strong> UV-Stifte mit integrierter UV-Lampe (Set ~10 €), weiße Karten/Papier, 2–3 Beispiel-Geheimbotschaften zum Inspirieren, optional separate UV-Taschenlampe</div>
       <div class="game-rules"><strong>So geht's:</strong> Die Kinder schreiben eigene Geheimbotschaften mit dem UV-Stift auf weiße Karten. Unter normalem Licht: nichts zu sehen. Unter der UV-Lampe (am Stift-Ende) leuchtet die Schrift. Die Karten können als Mitgebsel mitgenommen werden.</div>
       <div class="game-safety"><strong>⚠️ Sicherheit:</strong> UV-Lampen nicht direkt in die Augen leuchten — kurz erklären, dann passt es. Stift-Tinte ist auf der Haut ungefährlich, geht aber an Stoffen schwer ab.</div>
-    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> UV-Lampen nicht direkt in die Augen leuchten — kurz erklären, dann passt es. Stift-Tinte ist auf der Haut ungefährlich, geht aber schlecht ab — auf Karten beschränken.</p></div>
+    </div>
 
     <div class="game-detail">
       <h4>🔍 Escape-Room-Schatzsuche „Der Beweis-Tresor" — Spielanleitung</h4>
@@ -407,15 +407,15 @@ window.plausible.init=function(){};window.plausible.q=[];
       <div class="game-needs"><strong>Material:</strong> 6 Stations-Setups (Spuren-Karten, Verdächtigen-Aussagen, Caesar-Brief, Schuhabdruck-Reihe, Zeugen-Uhrzeiten, Zahlen-Code), 6 Umschläge mit Buchstaben, ein „Tresor" (Schuhkarton mit Zahlenschloss-Optik)</div>
       <div class="game-rules"><strong>So geht's:</strong> Die Crew durchläuft 6 Stationen mit gemischten Spuren-/Profiler-/Code-Rätseln. Jede Station gibt einen Buchstaben. Die 6 Buchstaben ergeben das Wort TRESOR. Damit lässt sich der „Tresor" (Schuhkarton mit Klappen-Mechanismus) öffnen. Drinnen: das Erbstück + Mitgebsel.</div>
       <div class="game-safety"><strong>⚠️ Sicherheit:</strong> Bei Garten-Stationen im Dunkeln auf Stolperfallen achten — die Stationen vor Einbruch der Dunkelheit ablaufen.</div>
-    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Bei Garten-Stationen im Dunkeln auf Stolperfallen achten — die Stationen vor Einbruch der Dunkelheit ablaufen. Die UV-Spurensuche im Dunkeln ist separat (Schlafparty-Anschluss).</p></div>
+    </div>
 
     <div class="game-detail">
       <h4>🌙 UV-Nacht-Spurensuche (Schlafparty-Anschluss) — Spielanleitung</h4>
       <div class="game-meta"><span>⏱ 45 Min.</span><span>🧒 Ab 10 Jahre</span><span class="game-tag indoor">Drinnen</span><span>💪 30 Min. Vorbereitung</span></div>
       <div class="game-needs"><strong>Material:</strong> 5 UV-Taschenlampen (Set ~15 €), mit UV-Stift versteckte Geheim-Hinweise an Wänden/Möbeln (nur unter UV sichtbar), eine Krimi-Doku oder altersgerechter Detektiv-Film für später</div>
       <div class="game-rules"><strong>So geht's:</strong> Im abgedunkelten Raum schwenken die Kinder mit UV-Lampen über Wände und Möbel. Hinweise leuchten auf. Eine Spur führt durch die Wohnung zu einem letzten Versteck — z.B. ein „verstecktes Asservaten-Geständnis". Danach: Film, Pyjama, Schlafsäcke.</div>
-      <div class="game-safety"><strong>⚠️ Sicherheit:</strong> Eltern-Opt-In schriftlich. Allergien, Asthma-Inhalator und Medikamente vorher einsammeln. Im abgedunkelten Raum Stolperfallen entfernen.</div>
-    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Eltern-Opt-In schriftlich. Allergien, Asthma-Inhalator und Medikamente vorher einsammeln. Im abgedunkelten Raum Stolperfallen entschärfen, UV-Lampen nicht in die Augen leuchten. Film altersgerecht wählen — keine echten Gewalt- oder Horror-Inhalte, nur Krimi-Spannung.</p></div>
+      <div class="game-safety"><strong>⚠️ Sicherheit:</strong> Eltern-Opt-In schriftlich. Allergien, Asthma und Medikamente vorher abfragen. Notfallmedikamente werden nicht eingesammelt: Asthmaspray und Adrenalin-Pen bleiben beim Kind oder liegen an einem festen Platz, den alle kennen und der auch nachts in Sekunden erreichbar ist. Notier dir, wer was braucht und wie es angewendet wird, und leg die Nummern der Eltern daneben. Im abgedunkelten Raum Stolperfallen entfernen.</div>
+    </div>
 
     <h3>🍿 Essen (10 Kinder, 4 Std.)</h3>
     <div class="snack-grid">
diff --git a/kindergeburtstag/dino-3-5-jahre.html b/kindergeburtstag/dino-3-5-jahre.html
index 24031b4d..71991ab1 100644
--- a/kindergeburtstag/dino-3-5-jahre.html
+++ b/kindergeburtstag/dino-3-5-jahre.html
@@ -296,7 +296,7 @@ window.plausible.init=function(){};window.plausible.q=[];
       <p style="font-size:14px"><strong>Material:</strong> 1 leere Plastikflasche (0,5l), Essig, Natron (1–2 EL), Sp&uuml;lmittel (Spritzer), rote Lebensmittelfarbe, Auffangschale oder Wanne</p>
       <p style="font-size:14px"><strong>So geht&rsquo;s:</strong> Flasche in Sandh&uuml;gel oder Blumentopf stellen. 3 EL Natron + Spritzer Sp&uuml;li + rote Farbe in die Flasche. Kinder z&auml;hlen runter. Essig dazugie&szlig;en — Lava! Funktioniert 3–4 Mal hintereinander. Die Kinder wollen es IMMER nochmal sehen.</p>
       <p style="font-size:14px"><strong>Alters-Tipp 3–5:</strong> Du machst das Eingie&szlig;en. Kinder d&uuml;rfen den Countdown rufen und zuschauen. Nicht selbst gie&szlig;en lassen — wird sonst eine Sauerei.</p>
-    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Kinder min. 1 Armlänge zurück, niemals in den Krater schauen. Schürze/alte Kleidung (Lebensmittelfarbe färbt!). Erwachsener kippt den Essig, nicht das Geburtstagskind. Tablett mit Rand. Bei Augenkontakt sofort 5 Min mit Wasser spülen. Faktencheck: Mehr Natron = NICHT höhere Eruption (der Essig limitiert: 100 ml setzen nur ~7-8 g Natron um) — Mehr Spüli macht den Schaum cremiger. Natron-Essig-Variante (KEIN Wasserstoffperoxid/Trockeneis); Essig reizt die Augen — nach dem Anfassen nicht ins Gesicht fassen.</p></div>
+    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Kinder min. 1 Armlänge zurück, niemals in den Krater schauen. Schürze/alte Kleidung (Lebensmittelfarbe färbt!). Erwachsener kippt den Essig, nicht das Geburtstagskind. Tablett mit Rand. Bei Augenkontakt sofort mindestens 10 Minuten mit lauwarmem Wasser spülen und danach den Augenarzt anrufen. Faktencheck: Mehr Natron = NICHT höhere Eruption (der Essig limitiert: 100 ml setzen nur ~7-8 g Natron um) — Mehr Spüli macht den Schaum cremiger. Natron-Essig-Variante (KEIN Wasserstoffperoxid/Trockeneis); Essig reizt die Augen — nach dem Anfassen nicht ins Gesicht fassen.</p></div>
 
     <div class="game-detail">
       <h4>🏗️ Dino-Ausgrabung — Spielanleitung</h4>
@@ -306,7 +306,7 @@ window.plausible.init=function(){};window.plausible.q=[];
       <p style="font-size:14px"><strong>Material:</strong> Gro&szlig;e Wanne (40&times;30 cm reicht), Sand oder Reis (5 kg), 8–10 Dino-Figuren, L&ouml;ffel + Pinsel zum Graben</p>
       <p style="font-size:14px"><strong>So geht&rsquo;s:</strong> Dinos im Sand vergraben. Kinder graben mit L&ouml;ffeln. Wer einen findet, ruft &bdquo;Fossil gefunden!&ldquo; und darf ihn behalten. Wanne auf ein Handtuch stellen (Sand-Schutz).</p>
       <p style="font-size:14px"><strong>Alters-Tipp 3–5:</strong> Nicht zu tief vergraben — 2–3 cm reichen. Die Freude ist das Finden, nicht das Graben. Bei 3-J&auml;hrigen: Dinos zur H&auml;lfte sichtbar lassen.</p>
-    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Mini-Dinos &lt; 3 cm vermeiden bei jüngeren Geschwistern. Sand-Wanne mit Sichtaufsicht. Hände waschen vor Snacks. Bei den Kleinen engmaschig beaufsichtigen — Reiskörner gehören nicht in Nase/Ohr; ggf. gröberes Sensorik-Medium. Reiskörner auch nicht in den Mund nehmen (Aspirationsgefahr) — Sichtaufsicht in Armlänge.</p></div>
+    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Sortier die Mini-Dinos vor: Was durch eine Klopapierrolle passt, bleibt in der Schachtel — bei 3- bis 5-Jährigen ist das Erstickungsgefahr, nicht erst bei jüngeren Geschwistern. Sand-Wanne mit Sichtaufsicht. Hände waschen vor Snacks. Bei den Kleinen engmaschig beaufsichtigen — Reiskörner gehören nicht in Nase/Ohr; ggf. gröberes Sensorik-Medium. Reiskörner auch nicht in den Mund nehmen (Aspirationsgefahr) — Sichtaufsicht in Armlänge.</p></div>
 
     <h3>🍿 Essen (5 Kinder, 2 Std.)</h3>
     <div class="snack-grid">
@@ -393,7 +393,7 @@ window.plausible.init=function(){};window.plausible.q=[];
       </div>
       <p style="font-size:14px"><strong>Material:</strong> Gro&szlig;e Wanne, Sand/Reis, Dino-Figuren + echte Muscheln + bunte Steine, L&ouml;ffel + Pinsel</p>
       <p style="font-size:14px"><strong>So geht&rsquo;s:</strong> Dinos 2–3 cm tief vergraben (bei 3-J&auml;hrigen zur H&auml;lfte sichtbar lassen). Kinder graben mit Pinseln wie echte Pal&auml;ontologen. Jeder darf seinen Fund behalten. Wanne auf Handtuch stellen.</p>
-    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Mini-Dinos &lt; 3 cm vermeiden bei jüngeren Geschwistern. Sand-Wanne mit Sichtaufsicht. Hände waschen vor Snacks. Bei den Kleinen engmaschig beaufsichtigen — Reiskörner gehören nicht in Nase/Ohr; ggf. gröberes Sensorik-Medium. Reiskörner auch nicht in den Mund nehmen (Aspirationsgefahr) — Sichtaufsicht in Armlänge.</p></div>
+    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Sortier die Mini-Dinos vor: Was durch eine Klopapierrolle passt, bleibt in der Schachtel — bei 3- bis 5-Jährigen ist das Erstickungsgefahr, nicht erst bei jüngeren Geschwistern. Sand-Wanne mit Sichtaufsicht. Hände waschen vor Snacks. Bei den Kleinen engmaschig beaufsichtigen — Reiskörner gehören nicht in Nase/Ohr; ggf. gröberes Sensorik-Medium. Reiskörner auch nicht in den Mund nehmen (Aspirationsgefahr) — Sichtaufsicht in Armlänge.</p></div>
 
     <div class="game-detail">
       <h4>🌋 Vulkan-Experiment — Spielanleitung</h4>
@@ -403,7 +403,7 @@ window.plausible.init=function(){};window.plausible.q=[];
       <p style="font-size:14px"><strong>Material:</strong> Plastikflasche (0,5l), Essig, Natron (1–2 EL), Sp&uuml;lmittel, rote Lebensmittelfarbe, Sandh&uuml;gel oder Blumentopf, Auffangschale</p>
       <p style="font-size:14px"><strong>So geht&rsquo;s:</strong> Natron + Sp&uuml;li + Farbe in die Flasche. Kinder z&auml;hlen runter: &bdquo;3, 2, 1, AUSBRUCH!&ldquo; Essig dazugie&szlig;en — Lava! Funktioniert 3–4 Mal. Die Kinder wollen es IMMER nochmal.</p>
       <p style="font-size:14px"><strong>Alters-Tipp 3–5:</strong> Du machst das Gie&szlig;en. Kinder d&uuml;rfen Countdown rufen und staunen. Nicht selbst gie&szlig;en lassen — wird sonst eine Sauerei.</p>
-    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Kinder min. 1 Armlänge zurück, niemals in den Krater schauen. Schürze/alte Kleidung (Lebensmittelfarbe färbt!). Erwachsener kippt den Essig, nicht das Geburtstagskind. Tablett mit Rand. Bei Augenkontakt sofort 5 Min mit Wasser spülen. Faktencheck: Mehr Natron = NICHT höhere Eruption (der Essig limitiert: 100 ml setzen nur ~7-8 g Natron um) — Mehr Spüli macht den Schaum cremiger. Natron-Essig-Variante (KEIN Wasserstoffperoxid/Trockeneis); Essig reizt die Augen — nach dem Anfassen nicht ins Gesicht fassen.</p></div>
+    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Kinder min. 1 Armlänge zurück, niemals in den Krater schauen. Schürze/alte Kleidung (Lebensmittelfarbe färbt!). Erwachsener kippt den Essig, nicht das Geburtstagskind. Tablett mit Rand. Bei Augenkontakt sofort mindestens 10 Minuten mit lauwarmem Wasser spülen und danach den Augenarzt anrufen. Faktencheck: Mehr Natron = NICHT höhere Eruption (der Essig limitiert: 100 ml setzen nur ~7-8 g Natron um) — Mehr Spüli macht den Schaum cremiger. Natron-Essig-Variante (KEIN Wasserstoffperoxid/Trockeneis); Essig reizt die Augen — nach dem Anfassen nicht ins Gesicht fassen.</p></div>
 
     <div class="game-detail">
       <h4>🦖 Dino-Stampfen mit Varianten — Spielanleitung</h4>
diff --git a/kindergeburtstag/feuerwehr-3-5-jahre.html b/kindergeburtstag/feuerwehr-3-5-jahre.html
index 17e43517..ae65b940 100644
--- a/kindergeburtstag/feuerwehr-3-5-jahre.html
+++ b/kindergeburtstag/feuerwehr-3-5-jahre.html
@@ -237,8 +237,8 @@ Tiere in die leere Wanne legen, Kinderschaum oder Sprühsahne großzügig drübe
 <br><strong>Für 5-Jährige:</strong> Tiefer im Schaum, dürfen sich Tiere selbst raussuchen, was sie behalten wollen.
 <br><strong>Draußen-Tipp:</strong> Im Sommer auf der Terrasse. Lässt sich mit Gartenschlauch wegspülen.
 </div>
-<div class="game-safety"><strong>⚠️ Sicherheit (Schaum &amp; Augen/Mund):</strong> WICHTIG für 3-Jährige: Schaum NICHT ins Gesicht, NICHT in die Augen, NICHT in den Mund — Schleimhaut-Reizung. Bei Augenkontakt mindestens 10 Minuten mit klarem Wasser spülen — vom inneren Augenwinkel nach außen, kein Reiben. Eine erwachsene Person begleitet das Spiel die ganze Zeit. 3-Jährige dürfen nur Schaum auf die Hände, nicht selbst sprühen. Wenn sich ein Kind einschmiert: sofort mit Tuch abwischen. Hände vor jedem Snack waschen.</div>
-<p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Für 3–4-Jährige Sahne oder Kinderschaum statt Rasierschaum (Default!) — Hände wandern bei den Kleinen oft in Mund/Augen. Rasierschaum nur bei Älteren mit strikter Aufsicht. NICHT in Augen/Mund (reizt Schleimhäute). Nach dem Spiel Hände waschen. Durchgehende Aufsicht.</p></div>
+<div class="game-safety"><strong>⚠️ Sicherheit (Schaum &amp; Augen/Mund):</strong> Für 3- bis 4-Jährige Sahne oder Kinderschaum statt Rasierschaum — bei den Kleinen wandern die Hände oft in Mund und Augen. WICHTIG für 3-Jährige: Schaum NICHT ins Gesicht, NICHT in die Augen, NICHT in den Mund — Schleimhaut-Reizung. Bei Augenkontakt mindestens 10 Minuten mit klarem Wasser spülen — vom inneren Augenwinkel nach außen, kein Reiben. Eine erwachsene Person begleitet das Spiel die ganze Zeit. 3-Jährige dürfen nur Schaum auf die Hände, nicht selbst sprühen. Wenn sich ein Kind einschmiert: sofort mit Tuch abwischen. Hände vor jedem Snack waschen.</div>
+</div>
 <div class="game-detail">
 <h4>🚒 Helm-Bilder ausmalen — Spielanleitung</h4>
 <div class="game-meta">
@@ -369,8 +369,8 @@ Plastikbecher umgekehrt auf eine niedrige Bank oder den Boden stellen, je mit au
 <br><strong>Für 5-Jährige:</strong> 1,5 m Abstand, mehrere Becher, dürfen reihum.
 <br><strong>Drinnen-Tipp:</strong> Im Bad funktioniert's gut — Becher in die Wanne stellen, dort darf nass werden. Garten ist besser.
 </div>
-<div class="game-safety"><strong>⚠️ Sicherheit (Wasser nicht aufs Kind):</strong> „Wasser nur auf den Becher, nicht aufs andere Kind." Eltern stehen daneben und korrigieren freundlich die Spritz-Richtung. Niedrigste Druckstufe wählen, keine Wasser-Kanonen. Boden mit Handtüchern oder Folie sichern — nasser Boden ist rutschig.</div>
-<p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> „Wasser nur auf den Becher, nicht aufs andere Kind.&quot; Eltern stehen daneben, korrigieren freundlich. Boden wird nass → drinnen abwischbarer Untergrund oder draußen, Nässe sofort aufwischen (Rutschgefahr). Nie ins Gesicht.</p></div>
+<div class="game-safety"><strong>⚠️ Sicherheit (Wasser nicht aufs Kind):</strong> „Wasser nur auf den Becher, nicht aufs andere Kind." Eltern stehen daneben und korrigieren freundlich die Spritz-Richtung. Niedrigste Druckstufe wählen, keine Wasser-Kanonen. Nie ins Gesicht. Der Boden wird nass: drinnen auf abwischbarem Untergrund spielen oder draußen, und Nässe sofort aufwischen — sonst wird sie zur Rutschgefahr. Boden mit Handtüchern oder Folie sichern — nasser Boden ist rutschig.</div>
+</div>
 <div class="game-detail">
 <h4>🚨 Mini-Einsatz: Tiere retten — Spielanleitung</h4>
 <div class="game-meta">
@@ -405,8 +405,8 @@ Vorbereitung 5 Min. vor dem Spiel: 6–8 Kuscheltiere im Wohnzimmer/Flur „vers
 <div class="game-rules">
 Aufbau und Ablauf wie in der Minimal-Variante (siehe oben). Funktioniert als ruhiger Abschluss perfekt — die Kinder kommen runter, dürfen taktil arbeiten und retten nochmal etwas. Ankerpunkt für die Stimmung vor der Urkunden-Übergabe.
 </div>
-<div class="game-safety"><strong>⚠️ Sicherheit (Schaum &amp; Augen/Mund):</strong> WICHTIG für 3-Jährige: Schaum NICHT ins Gesicht, NICHT in die Augen, NICHT in den Mund — Schleimhaut-Reizung. Bei Augenkontakt mindestens 10 Minuten mit klarem Wasser spülen — vom inneren Augenwinkel nach außen. Eine erwachsene Person begleitet das Spiel die ganze Zeit. 3-Jährige dürfen nur Schaum auf die Hände, nicht selbst sprühen.</div>
-<p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Für 3–4-Jährige Sahne oder Kinderschaum statt Rasierschaum (Default!) — Hände wandern bei den Kleinen oft in Mund/Augen. Rasierschaum nur bei Älteren mit strikter Aufsicht. NICHT in Augen/Mund (reizt Schleimhäute). Nach dem Spiel Hände waschen. Durchgehende Aufsicht.</p></div>
+<div class="game-safety"><strong>⚠️ Sicherheit (Schaum &amp; Augen/Mund):</strong> Für 3- bis 4-Jährige Sahne oder Kinderschaum statt Rasierschaum — bei den Kleinen wandern die Hände oft in Mund und Augen. WICHTIG für 3-Jährige: Schaum NICHT ins Gesicht, NICHT in die Augen, NICHT in den Mund — Schleimhaut-Reizung. Bei Augenkontakt mindestens 10 Minuten mit klarem Wasser spülen — vom inneren Augenwinkel nach außen. Eine erwachsene Person begleitet das Spiel die ganze Zeit. 3-Jährige dürfen nur Schaum auf die Hände, nicht selbst sprühen.</div>
+</div>
 <h3>🍰 Essen & Trinken</h3>
 <div class="snack-grid">
 <div class="snack-item"><div class="emoji">🎂</div><div class="name">Feuerwehrauto-Kuchen</div><div class="amount">1 Kastenform</div></div>
@@ -551,8 +551,8 @@ Genau zwischen Helm-Bemalen (ruhig-fokussiert) und Spritz-Probe (laut). Die Kind
 <div class="game-rules">
 Aufbau und Ablauf wie in der Standard-Variante (siehe dort). Niedrigste Stufe, gemeinsam, kein Wettbewerb.
 </div>
-<div class="game-safety"><strong>⚠️ Sicherheit (Wasser nicht aufs Kind):</strong> „Wasser nur auf den Becher, nicht aufs andere Kind." Eltern stehen daneben und korrigieren freundlich. Boden mit Handtüchern sichern.</div>
-<p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> „Wasser nur auf den Becher, nicht aufs andere Kind.&quot; Eltern stehen daneben, korrigieren freundlich. Boden wird nass → drinnen abwischbarer Untergrund oder draußen, Nässe sofort aufwischen (Rutschgefahr). Nie ins Gesicht.</p></div>
+<div class="game-safety"><strong>⚠️ Sicherheit (Wasser nicht aufs Kind):</strong> „Wasser nur auf den Becher, nicht aufs andere Kind." Eltern stehen daneben und korrigieren freundlich. Nie ins Gesicht. Boden mit Handtüchern sichern und Nässe sofort aufwischen — sonst wird sie zur Rutschgefahr.</div>
+</div>
 <div class="game-detail">
 <h4>🚨 Mini-Einsatz mit Parcours — Spielanleitung</h4>
 <div class="game-meta">
@@ -588,8 +588,8 @@ Standard-Mini-Einsatz, plus Parcours zwischen Crew und Tieren. Aufbau vorher:
 <div class="game-rules">
 Aufbau und Ablauf wie in den anderen Varianten. Funktioniert nach Kuchen + Aufregung perfekt als Runter-Komm-Spiel vor der Urkunde.
 </div>
-<div class="game-safety"><strong>⚠️ Sicherheit (Schaum &amp; Augen/Mund):</strong> WICHTIG für 3-Jährige: Schaum NICHT ins Gesicht, NICHT in die Augen, NICHT in den Mund. Bei Augenkontakt mindestens 10 Minuten mit klarem Wasser spülen — vom inneren Augenwinkel nach außen. Eine erwachsene Person begleitet das Spiel die ganze Zeit. 3-Jährige dürfen nur Schaum auf die Hände, nicht selbst sprühen.</div>
-<p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Für 3–4-Jährige Sahne oder Kinderschaum statt Rasierschaum (Default!) — Hände wandern bei den Kleinen oft in Mund/Augen. Rasierschaum nur bei Älteren mit strikter Aufsicht. NICHT in Augen/Mund (reizt Schleimhäute). Nach dem Spiel Hände waschen. Durchgehende Aufsicht.</p></div>
+<div class="game-safety"><strong>⚠️ Sicherheit (Schaum &amp; Augen/Mund):</strong> Für 3- bis 4-Jährige Sahne oder Kinderschaum statt Rasierschaum — bei den Kleinen wandern die Hände oft in Mund und Augen. WICHTIG für 3-Jährige: Schaum NICHT ins Gesicht, NICHT in die Augen, NICHT in den Mund. Bei Augenkontakt mindestens 10 Minuten mit klarem Wasser spülen — vom inneren Augenwinkel nach außen. Eine erwachsene Person begleitet das Spiel die ganze Zeit. 3-Jährige dürfen nur Schaum auf die Hände, nicht selbst sprühen.</div>
+</div>
 <h3>🍰 Essen & Trinken</h3>
 <div class="snack-grid">
 <div class="snack-item"><div class="emoji">🎂</div><div class="name">Feuerwehrauto-Kuchen</div><div class="amount">1 Kastenform</div></div>
diff --git a/kindergeburtstag/weltraum-3-5-jahre.html b/kindergeburtstag/weltraum-3-5-jahre.html
index 59d9766e..ccf45fa9 100644
--- a/kindergeburtstag/weltraum-3-5-jahre.html
+++ b/kindergeburtstag/weltraum-3-5-jahre.html
@@ -294,7 +294,7 @@
         <strong>⚠️ Sicherheit:</strong> Keine Sterne auf Stühle oder Fensterbänke kleben, die zum Klettern verleiten — alles in Reichweite vom Boden. Wenn du <strong>Leucht-Sterne oder Knicklichter</strong> als Extra einsetzt: Diese gehören bei 3-Jährigen nicht in Kinderhand zum freien Spiel. Die kleinen Leucht-Elemente sind verschluckbar, und die Flüssigkeit in Knicklichtern reizt Mund und Augen. Solche Glüh-Elemente nur fest an Wand oder Decke anbringen, außer Reichweite — gesammelt werden ausschließlich die ungefährlichen Tonpapier-Sterne.
       </div>
       <div class="tip"><strong>Warum das funktioniert:</strong> Sammeln ist die Lieblings-Tätigkeit dieser Altersgruppe — jedes Kind kann es sofort, niemand verliert, und das gemeinsame Zählen am Ende gibt ein klares Erfolgs-Gefühl ohne Wettkampf.</div>
-    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Keine Sterne auf Stühle oder Fensterbänke kleben, die zum Klettern verleiten — alles in Reichweite vom Boden.</p></div>
+    </div>
 
     <div class="game-detail">
       <h4>🚀 Raketen-Start (Countdown-Stopp) — Spielanleitung</h4>
@@ -318,7 +318,7 @@
         <strong>⚠️ Sicherheit:</strong> Auf rutschige Socken achten — auf glattem Boden lieber barfuß hüpfen lassen. <strong>Finger weg von „echten“ Wasser- oder Druck-Raketen aus dem Internet:</strong> Diese im Netz beliebten Brausetabletten-, Essig- oder Pump-Raketen schießen mit hohem Tempo nach oben und können ins Gesicht oder in die Augen treffen — das ist für 3–5-Jährige nicht geeignet. Bei uns ist der Raketen-Start ein reines Hüpf-Spiel mit der eigenen Körperkraft, ganz ohne fliegende Teile. So bleibt der Start spektakulär und trotzdem sicher.
       </div>
       <div class="tip"><strong>Warum das funktioniert:</strong> Der Countdown gibt einen klaren, gemeinsamen Rhythmus, und das „Einfrieren“ baut eine eingebaute Ruhepause ein — so wechseln sich Toben und Stillsein ab, genau das brauchen kleine Kinder.</div>
-    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Auf rutschige Socken achten — auf glattem Boden lieber barfuß hüpfen lassen.</p></div>
+    </div>
 
     <div class="game-detail">
       <h4>🎨 Planeten-Malen — Spielanleitung</h4>
@@ -339,7 +339,7 @@
       </div>
       <div class="game-safety"><strong>⚠️ Sicherheit:</strong> Abwaschbare Farben wählen — Fingerfarbe geht ohne Stress raus. Wachsmaler bleiben auf Kleidung; lieber Kittel oder altes T-Shirt überziehen.</div>
       <div class="tip"><strong>Warum das funktioniert:</strong> Jedes Kind bekommt ein eigenes Werk in die Hand, das es behalten darf — das stärkt Stolz und gibt Bewegungs-Pausen einen sinnvollen Inhalt. Bei 3–5-Jährigen ist Malen die zuverlässigste Beruhigungs-Aktivität, und der eigene Planet wird oft tagelang weiter bespielt.</div>
-    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Abwaschbare Farben wählen — Fingerfarbe geht ohne Stress raus. Wachsmaler bleiben auf Kleidung; lieber Kittel oder altes T-Shirt überziehen.</p></div>
+    </div>
 
     <h3>🍿 Essen (6 Kinder, 2 Std.)</h3>
     <div class="snack-grid">
@@ -433,10 +433,10 @@
         <br><strong>Draußen:</strong> Im Garten dürfen Stationen weiter auseinander liegen; eine Slalom-Linie zwischen zwei Bäumen macht Spaß.
       </div>
       <div class="game-safety">
-        <strong>⚠️ Sicherheit — Pappkarton &amp; Helm:</strong> Pappkarton-Kanten vorher umknicken oder mit Klebeband abkleben — die Schnittkanten sind scharf. Kissen rutschfest auf Teppich. Falls die Kinder den Tunnel mit einem <strong>Pappkarton-Helm über dem Kopf</strong> durchkriechen wollen: Helme nie so basteln, dass sie das Sehfeld einschränken — keine geschlossenen Karton-Kästen über dem ganzen Kopf, keine engen Augen-Schlitze. Beim Parcours muss jedes Kind frei nach vorn und zur Seite sehen können, sonst stößt es an oder stürzt. Der Alufolie-Helm-Effekt am offenen Stirnband ist hier die sichere Variante.
+        <strong>⚠️ Sicherheit — Pappkarton &amp; Helm:</strong> Pappkarton-Kanten vorher umknicken oder mit Klebeband abkleben — die Schnittkanten sind scharf. Kissen rutschfest auf Teppich. Auf glattem Boden barfuß oder Schuhe mit Grip — in Socken rutscht man weg. Falls die Kinder den Tunnel mit einem <strong>Pappkarton-Helm über dem Kopf</strong> durchkriechen wollen: Helme nie so basteln, dass sie das Sehfeld einschränken — keine geschlossenen Karton-Kästen über dem ganzen Kopf, keine engen Augen-Schlitze. Beim Parcours muss jedes Kind frei nach vorn und zur Seite sehen können, sonst stößt es an oder stürzt. Der Alufolie-Helm-Effekt am offenen Stirnband ist hier die sichere Variante.
       </div>
       <div class="tip"><strong>Warum das funktioniert:</strong> Der Bewegungs-Parcours fordert Grobmotorik und Mut zu Neuem, und weil jedes Kind einzeln und ohne Zeitmessung geht, gibt es keinen Verlierer — nur kleine Erfolgs-Momente am Sternen-Vorhang.</div>
-    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Pappkarton-Kanten vorher umknicken oder mit Klebeband abkleben — die Schnittkanten sind scharf. Kissen rutschfest auf Teppich. Auf glattem Boden barfuß oder Schuhe mit Grip (keine Socken — Rutschgefahr); harte Möbelkanten im Laufweg abräumen/abpolstern.</p></div>
+    </div>
 
     <div class="game-detail">
       <h4>🪐 Planeten-Reise — Spielanleitung</h4>
@@ -456,9 +456,9 @@
         <br><strong>Drinnen:</strong> Die Planeten in mehreren Zimmern verteilen — der Wohnungs-Rundgang wird zur Reise.
         <br><strong>Draußen:</strong> Im Garten die Planeten als großen Kreis auslegen; zwischen den Stationen darf „geflogen“ werden.
       </div>
-      <div class="game-safety"><strong>⚠️ Sicherheit:</strong> Aufgaben so wählen, dass kein Kind springen oder klettern muss, was es überfordert. Alles auf dem Boden.</div>
+      <div class="game-safety"><strong>⚠️ Sicherheit:</strong> Aufgaben so wählen, dass kein Kind springen oder klettern muss, was es überfordert. Auf glattem Boden barfuß oder Schuhe mit Grip — in Socken rutscht man weg. Alles auf dem Boden.</div>
       <div class="tip"><strong>Warum das funktioniert:</strong> Die Stationen-Reise gibt der Party einen roten Faden und mischt Bewegung mit ersten Sternen-Fakten — kleine Kinder lieben das Gefühl, „eine Reise zu machen“, und merken sich dabei spielerisch erste Planeten-Namen.</div>
-    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Aufgaben so wählen, dass kein Kind springen oder klettern muss, was es überfordert. Alles auf dem Boden.</p></div>
+    </div>
 
     <div class="game-detail">
       <h4>🎨 Mini-Rakete basteln — Spielanleitung</h4>
@@ -479,7 +479,7 @@
       </div>
       <div class="game-safety"><strong>⚠️ Sicherheit:</strong> Schere bleibt bei den Erwachsenen — Spitze und Streifen schneidest du vor. Fingerfarbe abwaschbar wählen.</div>
       <div class="tip"><strong>Warum das funktioniert:</strong> Basteln gibt jedem Kind ein fertiges Ergebnis in die Hand, das es behalten darf — das stärkt den Stolz, und die ruhige Tätigkeit bremst die Gruppe nach einer Toben-Phase angenehm herunter.</div>
-    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Schere bleibt bei den Erwachsenen — Spitze und Streifen schneidest du vor. Fingerfarbe abwaschbar wählen.</p></div>
+    </div>
 
     <div class="game-detail">
       <h4>🌟 Sternen-Memory — Spielanleitung</h4>
@@ -500,7 +500,7 @@
       </div>
       <div class="game-safety"><strong>⚠️ Sicherheit:</strong> Karten flach auf dem Tisch lassen — kein Hochhalten, sonst sehen die anderen die Rückseite, und das gibt Streit.</div>
       <div class="tip"><strong>Warum das funktioniert:</strong> Memory trainiert spielerisch Konzentration und passt zur Aufmerksamkeitsspanne von 4–5-Jährigen. Das Helfen-Dürfen nimmt den Druck raus, und ein Kind, das gerade nicht laufen will, kann hier still mitspielen, ohne aus dem Programm zu fallen.</div>
-    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Karten flach auf dem Tisch lassen — kein Hochhalten, sonst sehen die anderen die Rückseite, und das gibt Streit.</p></div>
+    </div>
 
     <h3>🍿 Essen (8 Kinder, 2,5 Std.)</h3>
     <div class="snack-grid">
@@ -608,7 +608,7 @@
         <strong>⚠️ Sicherheit — Verschluck-Risiko:</strong> Steine fest in Folie wickeln, keine spitzen Kanten. Mondsteine mindestens <strong>faustgroß, nicht mundgängig</strong> — ein kleiner Stein in Folie ist für 3-Jährige sonst ein Verschluck-Risiko. Faustregel: passt es durch eine Klopapierrolle, ist es zu klein. Nicht werfen lassen. Kinder nicht in Beete oder an Teiche schicken. Eine erwachsene Hand begleitet das Suchen.
       </div>
       <div class="tip"><strong>Warum das funktioniert:</strong> Das Einwickeln in Folie verwandelt einen langweiligen Stein in einen Schatz — Kinder dieser Altersgruppe lieben es, glänzende Dinge zu finden und zu besitzen, ganz ohne Regeln.</div>
-    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Steine fest in Folie wickeln, keine spitzen Kanten. Kinder nicht in Beete oder an Teiche schicken. Mondsteine mindestens FAUSTGROSS, nicht mundgaengig. Nicht werfen lassen. Erwachsene Hand begleitet das Suchen.</p></div>
+    </div>
 
     <div class="game-detail">
       <h4>👽 Freundlicher Alien-Fang — Spielanleitung</h4>
@@ -630,7 +630,7 @@
       </div>
       <div class="game-safety"><strong>⚠️ Sicherheit:</strong> Spielfeld klar abgrenzen — keine Möbel-Kanten, keine Treppen, keine Beete. Bei 3–4-Jährigen lieber ein Erwachsener als Fänger, damit niemand zu wild gefangen wird. NICHT auf glattem Boden — Kinder rutschen sonst beim Rennen aus.</div>
       <div class="tip"><strong>Warum das funktioniert:</strong> Das klassische Fangen erschreckt 3–5-Jährige oft, weil „gefangen werden = verlieren“ Stress auslöst. Hier wird die Mechanik gedreht: Gefangen werden ist eine Begrüßung, niemand fliegt raus, und am Ende ist die ganze Crew gemeinsam ein Alien-Begrüßungs-Komitee — perfekt für die Altersgruppe.</div>
-    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Spielfeld klar abgrenzen — keine Möbel-Kanten, keine Treppen, keine Beete. Bei 3–4-Jährigen lieber ein Erwachsener als Fänger, damit niemand zu wild gefangen wird. NICHT auf glattem Boden, Kinder rennen sonst aus.</p></div>
+    </div>
 
     <h3>🍿 Essen (8 Kinder, 2,5 Std.)</h3>
     <div class="snack-grid">
```
