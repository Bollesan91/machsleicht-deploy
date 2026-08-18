# Diff: Spielkarten-Kanal + Steuerzeichen-Fix (18.08.2026)

Basis `73eaf750` -> HEAD. Erzeugt mit `git diff`, ungekuerzt.

```diff
diff --git a/_dev/scripts/check-spielanker.py b/_dev/scripts/check-spielanker.py
new file mode 100644
index 00000000..93678986
--- /dev/null
+++ b/_dev/scripts/check-spielanker.py
@@ -0,0 +1,175 @@
+# -*- coding: utf-8 -*-
+"""Stufe 52: Die Bruecke zwischen Spielkarte und Spieldaten zeigt nirgends ins Leere.
+
+Warum es diese Bruecke gibt
+---------------------------
+Die freien Ratgeberseiten und `data/motto` sind zwei getrennt gewachsene Kataloge
+(Ticket K6). Dieselbe Taetigkeit heisst auf der Seite "2. Schloss-Ball mit Hofknicks"
+und in den Daten "Koeniglicher Tanz (mit Einfrieren)". Damit die `safetyRule` eines
+Spiels an der richtigen Karte landet, nennt `spielAnker` in
+data/freie-seiten-regeln.json die Zuordnung ausdruecklich, statt sie zu raten. Eine
+geratene Zuordnung wuerde eine Sicherheitsregel unter das FALSCHE Spiel setzen — das
+ist schlimmer als gar keine Regel (Gate A / ritter, 17.08.).
+
+Diese Stufe laedt den Renderer als Modul und benutzt SEINE Karten-Erkennung und SEINE
+Normalform. Der erste Entwurf hatte beides nachgebaut und meldete prompt Karten als
+fehlend, die der Renderer problemlos findet — ein Gate, das anders misst als die
+Maschine, prueft die Maschine nicht (Helfer V5 R3: Wahrheit hat einen Ort).
+
+Was geprueft wird
+-----------------
+1. Jede angeankerte Karte steht wirklich als `game-detail`-Karte auf der Seite.
+2. Jedes angeankerte Spiel steht wirklich im Datensatz DIESER Seite.
+3. Das Spiel traegt eine `safetyRule` — sonst ist der Anker wirkungslos und
+   taeuscht Abdeckung vor.
+4. Keine Karte traegt zwei Spiele.
+5. Die Ausnahmeliste `spielAnkerOhneWortdeckung` ist weder erfunden noch veraltet.
+   Gemessen wird am Kartentext OHNE die bereits gedruckte Regel — sonst pruefte die
+   Stufe ihr eigenes Ergebnis: Die gedruckte Regel bringt die Woerter des Spiels mit,
+   und jede Ausnahme saehe hinterher ueberfluessig aus.
+
+Gegenprobe: einen Buchstaben in einem Kartentitel des Ankers aendern -> FAIL.
+"""
+import collections
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
+ANKER_DATEI = os.path.join(REPO, "data", "freie-seiten-regeln.json")
+ALTER = {"3-5": "klein", "6-8": "mittel", "9-12": "gross"}
+
+WORT = re.compile(r"[A-Za-zÄÖÜäöüß][A-Za-zÄÖÜäöüß]{3,}")
+STOPP = set("""und oder mit ohne fuer die der das ein eine dem den des im am zum zur auf
+aus bei vor nach als wie sich alle jede jeder pro je ist sind wird werden kann man dann
+wenn kind kinder spiel spiele minuten material ablauf jedes eines""".split())
+
+
+def lade_renderer():
+    pfad = os.path.join(HIER, "regeln-drucken.py")
+    spec = importlib.util.spec_from_file_location("regeln_drucken", pfad)
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
+def kartentexte(text):
+    """{norm(titel): klartext} — Karten-Erkennung des Renderers, Regel herausgerechnet."""
+    ohne_regel = rd.SPIEL_WEG.sub(" ", text)
+    raus = {}
+    for m in rd.KARTE_AUF.finditer(ohne_regel):
+        ende = rd.karten_ende(ohne_regel, m.start())
+        if ende < 0:
+            continue
+        u = rd.KARTE_TITEL.search(ohne_regel, m.end(), ende)
+        if not u:
+            continue
+        titel = rd.MEHRFACH_LEER.sub(" ", rd.TAGS.sub(" ", u.group(1))).strip()
+        titel = rd.NUMMER_VORN.sub("", titel).strip()
+        if titel:
+            roh = rd.TAGS.sub(" ", ohne_regel[m.end():ende])
+            raus.setdefault(rd.norm(titel), rd.MEHRFACH_LEER.sub(" ", roh)[:1500])
+    return raus
+
+
+def main():
+    if not os.path.exists(ANKER_DATEI):
+        print("Stufe 52: keine Ankerdatei — uebersprungen")
+        return 0
+    d = json.load(io.open(ANKER_DATEI, encoding="utf-8"))
+    anker = d.get("spielAnker") or {}
+    ausnahmen = d.get("spielAnkerOhneWortdeckung") or {}
+
+    spiele = {}
+    for fp in sorted(glob.glob(os.path.join(REPO, "data", "motto", "*.json"))):
+        name = os.path.basename(fp)[:-5]
+        motto, _, grp = name.rpartition("-")
+        if grp not in set(ALTER.values()):
+            continue
+        alter = next(a for a, g in ALTER.items() if g == grp)
+        rel = "kindergeburtstag/%s-%s-jahre.html" % (motto, alter)
+        daten = json.load(io.open(fp, encoding="utf-8"))
+        eintrag = spiele.setdefault(rel, {})
+        for v in (daten.get("variants") or []):
+            for g in (v.get("games") or []):
+                if g.get("name"):
+                    eintrag[rd.norm(g["name"])] = g
+
+    fails = []
+    geprueft = 0
+    ohne_deckung = collections.defaultdict(set)
+    for rel, zuordnung in sorted(anker.items()):
+        pfad = os.path.join(REPO, rel)
+        if not os.path.exists(pfad):
+            fails.append("%s: Seite existiert nicht" % rel)
+            continue
+        karten = kartentexte(io.open(pfad, encoding="utf-8", errors="replace").read())
+        gesehen = {}
+        for karten_titel, spiel_name in sorted(zuordnung.items()):
+            geprueft += 1
+            k, s = rd.norm(karten_titel), rd.norm(spiel_name)
+            if k not in karten:
+                fails.append('%s: Karte "%s" steht nicht auf der Seite' % (rel, karten_titel))
+                continue
+            if s not in (spiele.get(rel) or {}):
+                fails.append('%s: Spiel "%s" steht nicht im Datensatz' % (rel, spiel_name))
+                continue
+            spiel = spiele[rel][s]
+            if not (spiel.get("safetyRule") or "").strip():
+                fails.append('%s: Spiel "%s" hat keine safetyRule — der Anker ist wirkungslos'
+                             % (rel, spiel_name))
+                continue
+            if gesehen.get(k) not in (None, s):
+                fails.append('%s: Karte "%s" traegt zwei verschiedene Spiele'
+                             % (rel, karten_titel))
+                continue
+            gesehen[k] = s
+            k1 = kerne(karten_titel + " " + karten[k])
+            k2 = kerne(spiel["name"] + " " + str(spiel.get("material") or "") + " "
+                       + str(spiel.get("description") or ""))
+            if not (k1 & k2):
+                ohne_deckung[rel].add(karten_titel)
+
+    for rel, karten in sorted(ohne_deckung.items()):
+        for karten_titel in sorted(karten):
+            if karten_titel not in (ausnahmen.get(rel) or {}):
+                fails.append('%s: Karte "%s" teilt kein Inhaltswort mit ihrem Spiel und '
+                             'steht nicht in spielAnkerOhneWortdeckung' % (rel, karten_titel))
+    for rel, eintraege in sorted(ausnahmen.items()):
+        for karten_titel, grund in sorted(eintraege.items()):
+            if karten_titel not in ohne_deckung.get(rel, set()):
+                fails.append('%s: Ausnahme fuer "%s" ist tot — die Texte teilen inzwischen '
+                             'Inhaltswoerter, die Begruendung prueft niemand mehr'
+                             % (rel, karten_titel))
+            elif len(grund.strip()) < 60:
+                fails.append('%s: Ausnahme fuer "%s" ohne belastbare Begruendung'
+                             % (rel, karten_titel))
+
+    for f in fails[:25]:
+        print("    FAIL %s" % f)
+    if len(fails) > 25:
+        print("    … und %d weitere" % (len(fails) - 25))
+    print("Stufe 52: %d FAIL — %d Spielkarten-Anker auf %d Seiten geprueft, "
+          "%d dokumentierte Ausnahmen"
+          % (len(fails), geprueft, len(anker), sum(len(v) for v in ausnahmen.values())))
+    return 1 if fails else 0
+
+
+if __name__ == "__main__":
+    sys.exit(main())
diff --git a/_dev/scripts/check-steuerzeichen.py b/_dev/scripts/check-steuerzeichen.py
new file mode 100644
index 00000000..dcb0c279
--- /dev/null
+++ b/_dev/scripts/check-steuerzeichen.py
@@ -0,0 +1,72 @@
+# -*- coding: utf-8 -*-
+"""Stufe 51: Kein C1-Steuerzeichen im ausgelieferten HTML.
+
+Befund 18.08.2026, Beifang beim Bau des Spielkarten-Kanals: Die Spielkarte
+"Mini-Schatzsuche zur Perlen-Truhe" auf meerjungfrau-3-5 heisst im Quelltext
+"<Karten-Emoji><U+008F> Mini-Schatzsuche …". Die Suche nach der Ursache fand 47
+solcher Bytes auf derselben Seite — und eines davon steht im `og:title`:
+
+    <meta property="og:title" content="<Meerjungfrau><U+200D><U+008D><U+2640><U+FE0F><U+008F> Meerjun…
+
+Das ist der Text, den WhatsApp, Facebook und Signal in der Link-Vorschau zeigen.
+Entstanden ist er, als eine Emoji-Sequenz einmal falsch dekodiert wurde: Von den
+Mehrbyte-Zeichen U+200D (Zero Width Joiner) und U+FE0F (Variantenselektor) blieb das
+letzte Byte als eigenes Zeichen stehen. Sichtbar wird das je nach Client als Kaestchen
+oder als abgetrenntes Symbol.
+
+C1-Steuerzeichen (U+0080 bis U+009F) haben in HTML-Text keinerlei gueltige Verwendung.
+Diese Stufe verbietet sie deshalb rundheraus — inklusive der Emoji-Reste, die sonst
+niemandem auffallen, weil sie meistens unsichtbar sind.
+
+Gegenprobe: ein U+009F an beliebiger Stelle einfuegen -> FAIL.
+"""
+import collections
+import glob
+import io
+import os
+import sys
+import unicodedata
+
+sys.stdout.reconfigure(encoding="utf-8", errors="replace")
+
+REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
+ORDNER = ("kindergeburtstag", "einladung", "spiele", ".")
+ERLAUBT = set("\t\n\r")
+
+
+def dateien():
+    for ordner in ORDNER:
+        muster = os.path.join(REPO, ordner, "*.html")
+        for pfad in sorted(glob.glob(muster)):
+            yield pfad
+
+
+def main():
+    fails = []
+    geprueft = 0
+    for pfad in dateien():
+        geprueft += 1
+        text = io.open(pfad, encoding="utf-8", errors="replace").read()
+        treffer = collections.Counter()
+        stelle = {}
+        for i, c in enumerate(text):
+            if unicodedata.category(c) == "Cc" and c not in ERLAUBT:
+                schluessel = "U+%04X" % ord(c)
+                treffer[schluessel] += 1
+                stelle.setdefault(schluessel, text[max(0, i - 30):i].strip()[-30:])
+        if treffer:
+            rel = os.path.relpath(pfad, REPO).replace(os.sep, "/")
+            fails.append((rel, treffer, stelle))
+
+    for rel, treffer, stelle in fails:
+        art = ", ".join("%s %dx" % (k, v) for k, v in treffer.most_common())
+        print("    FAIL %s: Steuerzeichen im HTML — %s" % (rel, art))
+        for k in list(treffer)[:2]:
+            print("         zuletzt vor: ...%s" % stelle[k])
+    print("Stufe 51: %d FAIL — %d HTML-Dateien auf C1-Steuerzeichen geprueft"
+          % (len(fails), geprueft))
+    return 1 if fails else 0
+
+
+if __name__ == "__main__":
+    sys.exit(main())
diff --git a/_dev/scripts/regeln-drucken.py b/_dev/scripts/regeln-drucken.py
index 825e7be2..ed98da77 100644
--- a/_dev/scripts/regeln-drucken.py
+++ b/_dev/scripts/regeln-drucken.py
@@ -283,12 +283,14 @@ def lade_harmlos():
 
 def lade_anker():
     if not os.path.exists(ANKER_DATEI):
-        return {'anker': {}, 'keinPosten': {}, 'eigeneRegeln': {}, 'warenRegeln': {}}
+        return {'anker': {}, 'keinPosten': {}, 'eigeneRegeln': {},
+                'warenRegeln': {}, 'spielAnker': {}}
     d = json.load(io.open(ANKER_DATEI, encoding='utf-8'))
     return {'anker': d.get('anker') or {},
             'keinPosten': d.get('keinPosten') or {},
             'eigeneRegeln': d.get('eigeneRegeln') or {},
-            'warenRegeln': d.get('warenRegeln') or {}}
+            'warenRegeln': d.get('warenRegeln') or {},
+            'spielAnker': d.get('spielAnker') or {}}
 
 
 def css_setzen(text):
@@ -386,6 +388,146 @@ def notfall_setzen(text, rel):
     return text[:m.start()] + NOTFALL_HTML + text[m.start():]
 
 
+# ============================================================================
+# SPIELKARTEN-KANAL (18.08.2026)
+# ----------------------------------------------------------------------------
+# Befund O: Von 146 Spielregel-Verboten, die den Leser nicht erreichen, nennen 105
+# ueberhaupt keine Ware ("Sichtaufsicht", "Platz freiraeumen", "immer nur ein Kind").
+# Die gehoeren an keinen Einkaufsposten — sie gehoeren an das Spiel. Dieser zweite
+# Kanal druckt deshalb games[].safetyRule an die Spielkarte der freien Seite.
+#
+# Die Bruecke ist explizit, nicht geraten: spielAnker in data/freie-seiten-regeln.json
+# nennt je Seite den Kartentitel und den Spielnamen. Grund ist derselbe wie beim
+# Einkaufskanal — beide Kataloge sind getrennt gewachsen (K6), und eine per Wortabgleich
+# geratene Zuordnung wuerde eine Sicherheitsregel unter das FALSCHE Spiel setzen.
+# Das ist schlimmer als gar keine Regel.
+# ============================================================================
+
+BS = chr(92)  # kein Backslash im Quelltext dieser Datei (Lektion L19/L23)
+
+CSS_SPIEL = ('.spiel-safe{display:block;margin-top:10px;padding:9px 11px;'
+             'border-left:3px solid #C62828;background:#fff5f4;font-size:13px;'
+             'line-height:1.55;color:#333}'
+             '.spiel-safe b{color:#C62828}')
+
+SPIEL_WEG = re.compile('<p class="spiel-safe">(?:(?!</p>).)*</p>', re.S)
+KARTE_AUF = re.compile('<div class="game-detail"[^>]*>')
+KARTE_TITEL = re.compile('<h[2-5][^>]*>(.*?)</h[2-5]>', re.S)
+DIV_KANTE = re.compile('<div' + BS + 'b[^>]*>|</div>', re.I)
+NUMMER_VORN = re.compile('^' + BS + 's*' + BS + 'd+[.)]' + BS + 's*')
+MEHRFACH_LEER = re.compile(BS + 's+')
+
+
+def karten_ende(text, start):
+    """Ende des <div>-Blocks, der bei `start` beginnt — per Klammerzaehlung.
+
+    Kein gieriges Muster: Der erste Entwurf des Notfall-Kastens nahm mit einem gierigen
+    </div> einen fremden Container mit und zerlegte den Block vor dem Footer (45 Seiten
+    geaendert statt 0). Hier ist die Verschachtelung echt — Karten enthalten <div> —,
+    deshalb wird gezaehlt statt geraten. Unbalanciert heisst: Karte uebersprungen, nicht
+    stillschweigend halb behandelt.
+    """
+    tiefe = 0
+    for m in DIV_KANTE.finditer(text, start):
+        tiefe += 1 if m.group(0)[1] != '/' else -1
+        if tiefe == 0:
+            return m.start()
+    return -1
+
+
+def karten_der_seite(text):
+    """[(titel, einfuege_position)] je Spielkarte, in Dokumentreihenfolge."""
+    raus = []
+    for m in KARTE_AUF.finditer(text):
+        ende = karten_ende(text, m.start())
+        if ende < 0:
+            continue
+        u = KARTE_TITEL.search(text, m.end(), ende)
+        if not u:
+            continue
+        titel = html_mod.unescape(MEHRFACH_LEER.sub(' ', TAGS.sub(' ', u.group(1)))).strip()
+        titel = NUMMER_VORN.sub('', titel).strip()
+        if titel:
+            raus.append((titel, ende))
+    return raus
+
+
+_SPIELREGELN = None
+
+
+def lade_spielregeln():
+    """{(motto, gruppe): {norm(spielname): (name, safetyRule)}} aus data/motto."""
+    global _SPIELREGELN
+    if _SPIELREGELN is not None:
+        return _SPIELREGELN
+    _SPIELREGELN = {}
+    for fp in sorted(glob.glob(os.path.join(MOTTO_DIR, '*.json'))):
+        name = os.path.basename(fp)[:-5]
+        motto, _, grp = name.rpartition('-')
+        # Der Dateiname traegt bereits die Gruppenform (dino-klein.json), waehrend
+        # ALTER von "3-5" auf "klein" abbildet. Erster Entwurf schlug hier ALTER
+        # nach und uebersprang damit lautlos JEDE Datei — 0 gedruckte Spielregeln
+        # ohne eine einzige Fehlermeldung (Lektion L22: eine stille Null ist kein
+        # Ergebnis, sondern ein unbewiesener Zustand).
+        if grp not in set(ALTER.values()):
+            continue
+        d = json.load(io.open(fp, encoding='utf-8'))
+        eintrag = _SPIELREGELN.setdefault((motto, grp), {})
+        for v in (d.get('variants') or []):
+            for g in (v.get('games') or []):
+                regel = (g.get('safetyRule') or '').strip()
+                if g.get('name') and regel:
+                    eintrag[norm(g['name'])] = (g['name'], regel)
+    return _SPIELREGELN
+
+
+def spiel_regeln_setzen(text, rel, motto, gruppe, anker):
+    """Druckt je zugeordneter Spielkarte die safetyRule ihres Spiels.
+
+    Idempotent (alte spiel-safe-Absaetze raus, aus den Daten neu rein) und fail-loud:
+    Ein spielAnker, dessen Karte auf der Seite fehlt, bricht ab — eine Bruecke, die ins
+    Leere zeigt, ist ein Defekt und kein Rauschen. Ein Spiel ohne safetyRule ist dagegen
+    kein Fehler: dann gibt es schlicht nichts zu drucken.
+    """
+    text = SPIEL_WEG.sub('', text)
+    zuordnung = (anker.get('spielAnker') or {}).get(rel) or {}
+    if not zuordnung:
+        return text, 0, []
+    regeln = lade_spielregeln().get((motto, gruppe), {})
+    # Ein Titel kann mehrfach vorkommen: dieselbe Spielkarte steht auf manchen
+    # Seiten in zwei Varianten-Abschnitten (dino-3-5 fuehrt "Dino-Eier suchen"
+    # zweimal). Die Regel gehoert an JEDE dieser Stellen, nicht an die erste.
+    nach_titel = {}
+    for titel, pos in karten_der_seite(text):
+        nach_titel.setdefault(norm(titel), []).append(pos)
+    ohne_regel = []
+    einfuegen = []
+    for karten_titel, spiel_name in sorted(zuordnung.items()):
+        k = norm(karten_titel)
+        if k not in nach_titel:
+            raise SystemExit('FATAL: %s — spielAnker nennt die Karte "%s", '
+                             'die Seite hat sie nicht' % (rel, karten_titel))
+        treffer = regeln.get(norm(spiel_name))
+        if treffer is None:
+            ohne_regel.append((karten_titel, spiel_name))
+            continue
+        for pos in nach_titel[k]:
+            einfuegen.append((pos, treffer[1]))
+    gedruckt = 0
+    for pos, regel in sorted(einfuegen, reverse=True):
+        frag = ('<p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> %s</p>'
+                % esc(planer_kanal(regel)))
+        text = text[:pos] + frag + text[pos:]
+        gedruckt += 1
+    # CSS nur, wo auch gedruckt wird: eine Seite ohne Spielregel soll keine
+    # tote Formatvorlage tragen (Helfer V5 R4 — Gedrucktes leitet sich ab).
+    if gedruckt and CSS_SPIEL not in text:
+        m = re.search(r'</style>', text)
+        if m:
+            text = text[:m.start()] + CSS_SPIEL + text[m.start():]
+    return text, gedruckt, ohne_regel
+
+
 def regeln_setzen(text, rel, motto, gruppe, regeln, anker):
     """Kern der Maschine: HTML rein, HTML mit Regeln raus — ohne Datei-I/O.
 
@@ -581,9 +723,12 @@ def regeln_setzen(text, rel, motto, gruppe, regeln, anker):
         gedruckt += len(notes)
 
     text, _ = css_setzen(text)
+    text, spiel_gedruckt, spiel_ohne = spiel_regeln_setzen(
+        text, rel, motto, gruppe, anker)
     text = notfall_setzen(text, rel)
     return text, {'seite': rel, 'posten': len(posten), 'regeln': len(quelle) + len(eigene),
-                  'gedruckt': gedruckt, 'klasse': aus_klasse, 'offen': offen}
+                  'gedruckt': gedruckt, 'klasse': aus_klasse, 'offen': offen,
+            'spiel_gedruckt': spiel_gedruckt, 'spiel_ohne': spiel_ohne}
 
 
 def verarbeite(pfad, regeln, anker, schreiben):
@@ -620,22 +765,24 @@ def main():
     fehler = 0
     geaendert = 0
     summe_gedruckt = 0
+    summe_spiel = 0
     for b in berichte:
         if b['geaendert']:
             geaendert += 1
         summe_gedruckt += b['gedruckt']
+        summe_spiel += b.get('spiel_gedruckt', 0)
         flag = '*' if b['geaendert'] else ' '
-        print('  %s %-46s Posten %3d  Regeln %2d  gedruckt %2d (davon Klasse %2d)%s'
+        print('  %s %-46s Posten %3d  Regeln %2d  gedruckt %2d (davon Klasse %2d)  Spiel %2d%s'
               % (flag, b['seite'].replace('kindergeburtstag/', ''), b['posten'],
-                 b['regeln'], b['gedruckt'], b.get('klasse', 0),
+                 b['regeln'], b['gedruckt'], b.get('klasse', 0), b.get('spiel_gedruckt', 0),
                  ('  OFFEN %d' % len(b['offen'])) if b['offen'] else ''))
         for label, grund in b['offen']:
             print('      OFFEN  %-52s %s' % (label[:52], grund))
             fehler += 1
 
     print('  ---')
-    print('  %d Seiten, %d Regeln gedruckt, %d Seiten geaendert, %d offen'
-          % (len(berichte), summe_gedruckt, geaendert, fehler))
+    print('  %d Seiten, %d Regeln gedruckt, %d Spielregeln, %d Seiten geaendert, %d offen'
+          % (len(berichte), summe_gedruckt, summe_spiel, geaendert, fehler))
 
     if '--check' in sys.argv and geaendert:
         print('  FAIL: Maschine haette %d Seiten geaendert — die Seiten sind nicht abgeleitet.'
diff --git a/data/freie-seiten-regeln.json b/data/freie-seiten-regeln.json
index f70c3bc2..2acca30f 100644
--- a/data/freie-seiten-regeln.json
+++ b/data/freie-seiten-regeln.json
@@ -467,5 +467,192 @@
       },
       "_muster_warum": "15.08. (Review MAJOR 6): \"Lederschnur\"/\"Hanf- oder Lederschnur\" traf das alte \\bschnur nicht; Wolle war gar nicht erfasst. schnur ohne Wortgrenze ist gefahrlos — Einkaufslisten kennen keine Schnurrbaerte. | 15.08. Re-Check M2/m12: pferde-3-5 \"Filz-Schleifen + Wollbänder\" und superheld-6-8 \"Konfetti + Wollfäden\" liefen regellos durch."
     }
+  },
+  "spielAnker": {
+    "kindergeburtstag/detektiv-3-5-jahre.html": {
+      "🐾 Spuren-Suche durchs Haus — Spielanleitung": "🐾 Spuren-Suche durchs Haus",
+      "👆 Fingerabdruck-Station — Spielanleitung": "👆 Fingerabdruck-Station",
+      "👆 Stempel-Spürnasen: Dein eigener Ausweis-Abdruck — Spielanleitung": "👆 Stempel-Spürnasen: Dein eigener Ausweis-Abdruck",
+      "🔍 Lupen-Basteln (Pappkarton-Lupe) — Spielanleitung": "🔍 Lupen-Basteln (Pappkarton-Lupe)",
+      "🔍 Spuren-Suche: Der verschwundene Kuchen — Spielanleitung": "🔍 Spuren-Suche: Der verschwundene Kuchen",
+      "🗺️ Mini-Schatzsuche: Die Münzen-Kiste — Spielanleitung": "🗺️ Mini-Schatzsuche: Die Münzen-Kiste",
+      "🧸 Der große Fall: Wo ist das Lieblingstier? — Spielanleitung": "🧸 Der große Fall: Wo ist das Lieblingstier?"
+    },
+    "kindergeburtstag/detektiv-6-8-jahre.html": {
+      "🍋 Geheimtinte sichtbar machen — Spielanleitung": "🍋 Geheimtinte sichtbar machen",
+      "👣 Der Spuren-Parcours — Spielanleitung": "👣 Der Spuren-Parcours",
+      "🔍 Spurensuche mit der Lupe — Spielanleitung": "🔍 Spurensuche mit der Lupe",
+      "🔐 Das große Code-Rätsel — Spielanleitung": "🔐 Das große Code-Rätsel",
+      "🔑 Code knacken & Kuchen finden — Spielanleitung": "🔑 Code knacken & Kuchen finden",
+      "🔑 Großer Code & Fall-Auflösung — Spielanleitung": "🔑 Großer Code & Fall-Auflösung",
+      "🕵️ Beschattungs-Mission (Bonus, eher 7–8) — Spielanleitung": "🕵️ Beschattungs-Mission (Bonus-Spiel)",
+      "🖐️ Das Fingerabdruck-Labor — Spielanleitung": "🖐️ Das Fingerabdruck-Labor",
+      "🗣️ Die Verdächtigen-Befragung — Spielanleitung": "🗣️ Die Verdächtigen-Befragung",
+      "🚪 Die Multi-Raum-Tatort-Tour — Spielanleitung": "🚪 Die Multi-Raum-Tatort-Tour"
+    },
+    "kindergeburtstag/detektiv-9-12-jahre.html": {
+      "1️⃣ Spuren-Sicherungs-Test (Spurensicherer-Hauptstation) — Spielanleitung": "1️⃣ Spuren-Sicherungs-Test (Spurensicherer-Hauptstation)",
+      "6️⃣ UV-Geheimnachrichten-Werkstatt — Spielanleitung": "6️⃣ UV-Geheimnachrichten-Werkstatt (zusätzliche 6. Station)",
+      "🌙 UV-Nacht-Spurensuche (Schlafparty-Anschluss) — Spielanleitung": "🌙 UV-Nacht-Spurensuche (Schlafparty-Anschluss, Eltern-Opt-In)",
+      "🔍 Escape-Room-Schatzsuche „Der Beweis-Tresor\" — Spielanleitung": "🔍 Escape-Room-Schatzsuche „Der Beweis-Tresor“ → TRESOR (6 Stationen)",
+      "🫆 Fingerabdruck-Vergleich am Tatort — Spielanleitung": "🫆 Fingerabdruck-Vergleich am Tatort"
+    },
+    "kindergeburtstag/dino-3-5-jahre.html": {
+      "🌋 Vulkan-Experiment — Spielanleitung": "🌋 Vulkan-Experiment",
+      "🏗️ Dino-Ausgrabung — Spielanleitung": "🦴 Dino-Ausgrabung",
+      "🦕 Dino-Eier suchen — Spielanleitung": "🦕 Dino-Eier suchen — Spielanleitung",
+      "🦖 Dino-Parcours — Spielanleitung": "🏃 Dino-Parcours",
+      "🦖 Dino-Stampfen (Stopptanz) — Spielanleitung": "🦖 Dino-Stampfen (Stopptanz) — Spielanleitung",
+      "🦖 Dino-Stampfen mit Varianten — Spielanleitung": "🦖 Dino-Stampfen (Stopptanz) — Spielanleitung"
+    },
+    "kindergeburtstag/dino-6-8-jahre.html": {
+      "🌋 Vulkan-Experiment": "🌋 Vulkan-Experiment",
+      "🏃 Dino-Parcours": "🏃 Dino-Parcours",
+      "🦴 Dino-Ausgrabung": "🦴 Dino-Ausgrabung",
+      "🧠 Dino-Wissens-Quiz": "🧠 Dino-Wissens-Quiz",
+      "🪨 Fossilien gießen": "🪨 Fossilien gießen"
+    },
+    "kindergeburtstag/dino-9-12-jahre.html": {
+      "&#x1F30B; Vulkan-Experiment — Spielanleitung": "🌋 Vulkan-Experiment",
+      "&#x1F3C3; Dino-Parcours-Staffel — Spielanleitung": "🏃 Dino-Parcours",
+      "&#x1F3D7;&#xFE0F; Fossilien-Ausgrabung — Spielanleitung": "🦴 Dino-Ausgrabung",
+      "&#x1F510; Verschl&uuml;sselte Nachricht — Spielanleitung": "🔐 Verschlüsselte Nachricht — Spielanleitung",
+      "&#x1F9E0; Dino-Wissens-Quiz — Spielanleitung": "🧠 Dino-Wissens-Quiz"
+    },
+    "kindergeburtstag/einhorn-3-5-jahre.html": {
+      "✨ Sternenstaub suchen": "✨ Sternenstaub suchen",
+      "🌈 Regenbogen-Milch-Experiment": "🌈 Regenbogen-Milch-Experiment",
+      "🌈 Regenbogen-Tanz": "🌈 Regenbogen-Tanz",
+      "🎯 Einhorn füttern": "🎯 Einhorn füttern",
+      "🦄 Einhorn-Horn basteln": "🦄 Einhorn-Horn basteln",
+      "🪄 Einhorn-Zauberstab basteln": "🪄 Einhorn-Zauberstab basteln"
+    },
+    "kindergeburtstag/einhorn-6-8-jahre.html": {
+      "✨ Sternenstaub-Schatzsuche": "✨ Sternenstaub suchen",
+      "🌈 Regenbogen-Milch-Experiment": "🌈 Regenbogen-Milch-Experiment",
+      "🌈 Regenbogen-Parcours": "🌈 Regenbogen-Parcours",
+      "🗺️ Wolkenwald-Rätselrallye (5 Stationen)": "🗺️ Wolkenwald-Rätselrallye (5 Stationen)",
+      "🧠 Einhorn-Wissens-Quiz (optional statt einer Prüfung)": "🧠 Einhorn-Wissens-Quiz (optional statt einer Prüfung)",
+      "🧼 Einhorn-Seife gießen": "🧼 Einhorn-Seife gießen"
+    },
+    "kindergeburtstag/einhorn-9-12-jahre.html": {
+      "🎖️ Meister-Urkunden": "🎖️ Meister-Urkunden",
+      "🎬 Einhorn-Kurzfilm drehen": "🎬 Einhorn-Kurzfilm drehen",
+      "💎 Schmuck-Workshop": "💎 Schmuck-Workshop",
+      "🔓 Einhorn-Escape-Challenge": "🔓 Einhorn-Escape-Challenge"
+    },
+    "kindergeburtstag/feuerwehr-3-5-jahre.html": {
+      "💧 Spritz-Probe an der Wache — Spielanleitung": "💧 Spritz-Probe an der Wache",
+      "🫧 Schaum-Löschen — Spielanleitung": "🫧 Schaum-Löschen — Tiere aus dem Schaum retten",
+      "🫧 Schaum-Löschen — Tiere aus dem Schaum retten — Spielanleitung": "🫧 Schaum-Löschen — Tiere aus dem Schaum retten"
+    },
+    "kindergeburtstag/meerjungfrau-3-5-jahre.html": {
+      "🌊 Wellen-Tuch (Fallschirm-Spiel mit blauem Tuch)": "🌊 Wellen-Tuch (Fallschirm-Spiel mit blauem Tuch)",
+      "🐚 Muschel-Stirnband-Basteln": "🐚 Muschel-Stirnband-Basteln",
+      "🐠 Fisch-Freunde-Quiz": "🐠 Fisch-Freunde-Quiz (Tierstimmen + Bewegungen)",
+      "📸 Unterwasser-Foto-Ecke": "📸 Unterwasser-Foto-Ecke",
+      "🗺️ Mini-Schatzsuche zur Perlen-Truhe": "🗺️ Mini-Schatzsuche zur Perlen-Truhe",
+      "🦪 Verlorene Perlen sammeln": "🦪 Verlorene Perlen sammeln",
+      "🪸 Korallen-Garten bauen": "🪸 Korallen-Garten bauen"
+    },
+    "kindergeburtstag/meerjungfrau-6-8-jahre.html": {
+      "1️⃣ Tauch-Parcours (Crew-Training)": "1️⃣ Tauch-Parcours (Crew-Training)",
+      "2️⃣ Korallenriff-Experiment (Meeres-Schaum)": "2️⃣ Korallenriff-Experiment (Meeres-Schaum)",
+      "3️⃣ Perlenketten-Werkstatt (Korallen-Hüter-Aufgabe)": "3️⃣ Perlenketten-Werkstatt (Korallen-Hüter-Aufgabe)",
+      "4️⃣ Quallen-Tanz (Bewegungs-Stopp-Spiel)": "4️⃣ Quallen-Tanz (Bewegungs-Stopp-Spiel)",
+      "🌊 Großspiel: Die Schatztruhe der Meereskönigin": "🌊 Großspiel: Die Schatztruhe der Meereskönigin",
+      "🌊 Muschel-Tauchen (Schatz-Fischen)": "🌊 Muschel-Tauchen (Schatz-Fischen)",
+      "🐠 Meerestier-Quiz (Fisch-Flüsterer-Prüfung)": "🐠 Meerestier-Quiz (Fisch-Flüsterer-Prüfung)",
+      "🧁 Meeres-Snack-Werkstatt (Wellen-Muffins & Algen-Spieße)": "🧁 Meeres-Snack-Werkstatt (Wellen-Muffins & Algen-Spieße)",
+      "🧜‍♀️ Tiefsee-Quest: Die 5 Riff-Stationen": "🧜‍♀️ Tiefsee-Quest: Die 5 Riff-Stationen"
+    },
+    "kindergeburtstag/meerjungfrau-9-12-jahre.html": {
+      "5️⃣ Codeknacker-Station → TIEF (alle Spezialisierungen)": "5️⃣ Codeknacker-Station → TIEF (alle Spezialisierungen)",
+      "6️⃣ Tauch-Anzug-Werkstatt (zusätzliche 6. Station)": "6️⃣ Tauch-Anzug-Werkstatt (zusätzliche 6. Station)",
+      "🌌 Unterwasser-Sterne-Beobachtung (Schlafparty-Anschluss, Eltern-Opt-In)": "🌌 Unterwasser-Sterne-Beobachtung (Schlafparty-Anschluss, Eltern-Opt-In)",
+      "🤿 Tiefen-Tauch-Quest „Hinter dem Riff\"": "🤿 Tiefen-Tauch-Quest „Hinter dem Riff“",
+      "🧜‍♀️ Schatzsuche-Quest „Versunkenes Atlantis\" → ATLANTIS (8 Stationen)": "🧜‍♀️ Schatzsuche-Quest „Versunkenes Atlantis“ → ATLANTIS (8 Stationen)"
+    },
+    "kindergeburtstag/pferde-6-8-jahre.html": {
+      "⏱️ Stallpflege-Speedrun": "🐎 Pony-Pflege-Station"
+    },
+    "kindergeburtstag/piraten-6-8-jahre.html": {
+      "&#x1F3C3; Piraten-Parcours — Spielanleitung": "🏃 Piraten-Parcours — Spielanleitung",
+      "&#x1F419; Seeungeheuer besiegen — Spielanleitung": "🐙 Seeungeheuer besiegen — Spielanleitung",
+      "&#x1F4DC; Flaschenpost — Spielanleitung": "📜 Flaschenpost — Spielanleitung",
+      "&#x1F5FA;&#xFE0F; Schatzkarte basteln — Spielanleitung": "🗺️ Schatzkarte basteln — Spielanleitung",
+      "&#x1FA22; Knotenkunde — Spielanleitung": "🪢 Knotenkunde — Spielanleitung",
+      "&#x26F5; Schiff beladen — Spielanleitung": "⛵ Schiff beladen — Spielanleitung"
+    },
+    "kindergeburtstag/prinzessin-3-5-jahre.html": {
+      "2. Schloss-Ball mit Hofknicks": "🎵 Königlicher Tanz (mit Einfrieren)",
+      "3. Edelstein-Suche": "👑 Krönchen-Schatzsuche"
+    },
+    "kindergeburtstag/prinzessin-6-8-jahre.html": {
+      "2. Märchen-Code knacken": "🗝️ Schloss-Schatzsuche"
+    },
+    "kindergeburtstag/prinzessin-9-12-jahre.html": {
+      "1. Multi-Stage Code-Mystery": "🔐 Escape-Stationen (Codes, UV, Logik)",
+      "4. Hof-Foto-Story-Box": "📸 Royales Fotoshooting (Charaktere etablieren)"
+    },
+    "kindergeburtstag/ritter-3-5-jahre.html": {
+      "🛡️ Schild-Aufkleben": "🛡️ Wappen-Schmücken (Ausführlich)"
+    },
+    "kindergeburtstag/safari-3-5-jahre.html": {
+      "🎧 Tier-Lauscher (Geräusche raten)": "🎧 Tier-Lauscher (Geräusche raten)",
+      "🎽 Tarn-Tuch bemalen (Bastel-Station)": "🎽 Tarn-Tuch bemalen (Bastel-Station)",
+      "🦁 Kleine Pirsch zum Plüsch-Löwen": "🦁 Tierspuren-Pirsch",
+      "🦒 Tierstimmen-Lauschen": "🦒 Tierstimmen-Quiz",
+      "🦓 Tiere füttern": "🦓 Tiere füttern (Bälle in Eimer)"
+    },
+    "kindergeburtstag/safari-6-8-jahre.html": {
+      "1️⃣ Tarnungs-Übung": "1️⃣ Tarnungs-Übung",
+      "4️⃣ Pirsch-Parcours": "4️⃣ Pirsch-Parcours",
+      "🗺️ Schatzsuche-Quest: Verborgener Tempel": "🗺️ Schatzsuche-Quest: Verborgener Tempel",
+      "🦁 Rette das Löwen-Junge": "🦁 Rette das Löwen-Junge",
+      "🦓 Tierspuren-Pirsch": "🦓 Tierspuren-Pirsch"
+    },
+    "kindergeburtstag/safari-9-12-jahre.html": {
+      "2️⃣ Foto-Komposition mit Tarnung (Tierfotograf-Hauptstation)": "2️⃣ Foto-Komposition mit Tarnung (Tierfotograf-Hauptstation)",
+      "4️⃣ Tarnungs-Pirsch (Crew-Station)": "4️⃣ Tarnungs-Pirsch (Crew-Station)",
+      "6️⃣ Tarnungs-Werkstatt (zusätzliche 6. Station)": "6️⃣ Tarnungs-Werkstatt (zusätzliche 6. Station)",
+      "🌙 Nacht-Safari (nur Schlafparty-Variante)": "🌙 Nacht-Safari mit Stirnlampen (Schlafparty-Anschluss, Eltern-Opt-In)",
+      "📸 Foto-Quest \"Hinter der Tarnung\"": "📸 Foto-Quest „Hinter der Tarnung“",
+      "🗺️ Die Karte vermessen — Hauptmission": "🗺️ Die Karte vermessen — Hauptmission",
+      "🗺️ Schatzsuche-Quest: Verborgener Tempel (Wow-Hauptakt)": "🦁 Schatzsuche-Quest „Verborgener Tempel“ → TEMPEL (5 Stationen)"
+    },
+    "kindergeburtstag/superheld-3-5-jahre.html": {
+      "4. Schatzsuche (3 Stationen)": "🗺️ Bilder-Schatzsuche"
+    },
+    "kindergeburtstag/superheld-6-8-jahre.html": {
+      "2. Geheim-Code knacken": "🔎 Geheimmission (Helden-Schatzsuche)",
+      "4. Helden-Parcours": "🦸 Helden-Training (Hindernisparcours)"
+    },
+    "kindergeburtstag/superheld-9-12-jahre.html": {
+      "1. Multi-Stage Code-Mission": "🔐 Code knacken (Geheimbotschaft)",
+      "5. Tresor-Code Final-Challenge": "🧩 Escape-Stationen (Rätsel-Mix)"
+    },
+    "kindergeburtstag/weltraum-3-5-jahre.html": {
+      "⭐ Sternen-Sammeln — Spielanleitung": "⭐ Sternen-Sammeln",
+      "🌙 Mondsteine suchen — Spielanleitung": "🌙 Mondsteine suchen",
+      "🌟 Sternen-Memory — Spielanleitung": "🌟 Sternen-Memory",
+      "🎨 Mini-Rakete basteln — Spielanleitung": "🎨 Mini-Rakete basteln",
+      "🎨 Planeten-Malen — Spielanleitung": "🎨 Planeten-Malen",
+      "👽 Freundlicher Alien-Fang — Spielanleitung": "👽 Freundlicher Alien-Fang",
+      "🚀 Raketen-Start (Countdown-Stopp) — Spielanleitung": "🚀 Raketen-Start (Countdown-Stopp)",
+      "🛰️ Astronauten-Parcours — Spielanleitung": "🛰️ Astronauten-Parcours",
+      "🪐 Planeten-Reise — Spielanleitung": "🪐 Planeten-Reise"
+    }
+  },
+  "spielAnkerOhneWortdeckung": {
+    "kindergeburtstag/prinzessin-3-5-jahre.html": {
+      "3. Edelstein-Suche": "Dieselbe Taetigkeit mit anderen Woertern: Die Karte versteckt \"bunte Plastik-Edelsteine (nur grosse — keiner darf durch eine Klopapierrolle passen)\" mit \"Schatztuete pro Kind\", das Spiel \"viele kleine (aber NICHT verschluckbare) Kroenchen/Schaetze, ein Schatzbeutel pro Kind\". Die Regel (keine verschluckbaren Kleinteile, einsehbare Verstecke, Begleitung) trifft die Karte woertlich."
+    },
+    "kindergeburtstag/prinzessin-6-8-jahre.html": {
+      "2. Märchen-Code knacken": "Die Karte verteilt drei Stationen auf Garten, Wohnzimmer und Kueche, deren Loesung zum Schatzversteck fuehrt — das ist die Schatzsuche der Daten in Code-Form. Die Regel (sichere, einsehbare Verstecke; draussen Grenzen klar; Begleitung) gilt unveraendert, weil die Karte dieselben Orte benutzt."
+    },
+    "kindergeburtstag/superheld-6-8-jahre.html": {
+      "2. Geheim-Code knacken": "Wie oben, Superhelden-Fassung derselben Karte: drei Stationen, deren Loesung das Versteck nennt. Die Regel spricht von Verstecken und Grenzen, also genau von dem, was die Karte anordnet."
+    }
   }
 }
diff --git a/validate-all.sh b/validate-all.sh
index 1b8a3794..cd9c43d7 100755
--- a/validate-all.sh
+++ b/validate-all.sh
@@ -788,6 +788,31 @@ else
   red "Stufe 48: dieselbe Ware traegt gegensaetzliche Urteile"
 fi
 
+echo "── STUFE 52: Die Bruecke Spielkarte -> Spieldaten zeigt nirgends ins Leere ──"
+# Befund O (18.08.): 105 der 146 nicht angekommenen Spielregel-Verbote nennen gar
+# keine Ware ("Sichtaufsicht", "Platz freiraeumen") und gehoeren deshalb an das
+# Spiel, nicht an einen Einkaufsposten. Der Spielkarten-Kanal druckt sie dorthin.
+# Die Zuordnung Karte <-> Spiel steht ausdruecklich in spielAnker, weil beide
+# Kataloge getrennt gewachsen sind (K6) und eine geratene Zuordnung eine
+# Sicherheitsregel unter das falsche Spiel setzen wuerde. Die Stufe benutzt die
+# Karten-Erkennung des Renderers selbst — ein Gate, das anders misst als die
+# Maschine, prueft die Maschine nicht.
+if python _dev/scripts/check-spielanker.py; then
+  green "Jeder Spielkarten-Anker trifft Karte und Spiel, Ausnahmen sind belegt"
+else
+  red "Stufe 52: Spielkarten-Anker zeigt ins Leere oder Ausnahme ist veraltet"
+fi
+
+echo "── STUFE 51: Keine C1-Steuerzeichen im ausgelieferten HTML ──"
+# Beifang 18.08.: meerjungfrau-3-5 trug 47 Reste einer verungluecktem
+# Emoji-Dekodierung, eines davon mitten im og:title — also in der Link-Vorschau,
+# die WhatsApp und Facebook beim Teilen zeigen.
+if python _dev/scripts/check-steuerzeichen.py; then
+  green "Kein Steuerzeichen-Muell im HTML"
+else
+  red "Stufe 51: C1-Steuerzeichen im HTML"
+fi
+
 echo "── STUFE 47: Kein Verweis auf Text, den der Leser der freien Seite nie sieht ──"
 # Befund 17.08. aus Gate B: 72 der 787 harmlos-Begruendungen argumentierten nicht,
 # sondern verwiesen — "die Spielregel ist bereits gedruckt", "Allergie-Abfrage im
```

## HTML-Ergebnis: eine Seite vollstaendig (dino-3-5, 11 gedruckte Spielregeln)

```diff
diff --git a/kindergeburtstag/dino-3-5-jahre.html b/kindergeburtstag/dino-3-5-jahre.html
index 446c419b..670a0165 100644
--- a/kindergeburtstag/dino-3-5-jahre.html
+++ b/kindergeburtstag/dino-3-5-jahre.html
@@ -98,7 +98,7 @@ p{margin-bottom:12px;color:var(--m);font-size:15px;line-height:1.7}
 .age-intro ul{padding-left:20px;margin-bottom:0}
 .age-intro li{margin-bottom:6px;font-size:14px;color:var(--m)}
 @media print{.no-print,.cta,.variant-tabs,.tip,footer,[style*="position: fixed"],[style*="sticky"]{display:none!important}body{background:#fff!important;color:#000!important;font-size:12pt}.variant-panel{display:block!important}.variant-panel::before{content:attr(id);font-weight:700;font-size:14pt;display:block;margin-bottom:8px}}
-.shop-safe{display:block;margin-top:3px;font-size:13px;line-height:1.5;color:var(--d);border-left:2px solid #d94f3d;padding-left:8px}.notfall-kasten{margin:26px 0 8px;padding:14px 16px;border:2px solid #C62828;border-radius:8px;background:#fff5f4}.notfall-kasten h3{margin:0 0 8px;font-size:16px;color:#C62828}.notfall-kasten ul{margin:0;padding-left:18px}.notfall-kasten li{margin:0 0 6px;font-size:14px;line-height:1.55}.notfall-kasten p{margin:8px 0 0;font-size:12px;color:#666}</style>
+.shop-safe{display:block;margin-top:3px;font-size:13px;line-height:1.5;color:var(--d);border-left:2px solid #d94f3d;padding-left:8px}.notfall-kasten{margin:26px 0 8px;padding:14px 16px;border:2px solid #C62828;border-radius:8px;background:#fff5f4}.notfall-kasten h3{margin:0 0 8px;font-size:16px;color:#C62828}.notfall-kasten ul{margin:0;padding-left:18px}.notfall-kasten li{margin:0 0 6px;font-size:14px;line-height:1.55}.notfall-kasten p{margin:8px 0 0;font-size:12px;color:#666}.spiel-safe{display:block;margin-top:10px;padding:9px 11px;border-left:3px solid #C62828;background:#fff5f4;font-size:13px;line-height:1.55;color:#333}.spiel-safe b{color:#C62828}</style>
 <!-- Privacy-friendly analytics by Umami -->
 <script defer src="https://cloud.umami.is/script.js" data-website-id="72b5eb12-dfde-4333-9bc7-0c2880864df2" data-do-not-track="true"></script>
 <script>
@@ -188,7 +188,7 @@ window.plausible.init=function(){};window.plausible.q=[];
       <p style="font-size:14px"><strong>Material:</strong> 15–20 bunte Plastik-Eier oder bunt bemalte Steine, 5 kleine Sch&uuml;sseln/Eimer, Mini-Dinos oder Gummib&auml;rchen zum Reinlegen</p>
       <p style="font-size:14px"><strong>So geht&rsquo;s:</strong> Eier im Raum/Garten verteilen — bei 3-J&auml;hrigen halb sichtbar, bei 5-J&auml;hrigen besser versteckt. Jedes Kind bekommt eine Sch&uuml;ssel. Alle suchen gleichzeitig. Wer eins findet, darf es &ouml;ffnen und den Inhalt behalten.</p>
       <p style="font-size:14px"><strong>Wichtig:</strong> Kein Wettbewerb (&bdquo;Wer findet die meisten?&ldquo;) — das endet bei Kleinkindern in Tr&auml;nen. Stattdessen: &bdquo;Helft alle zusammen, alle Eier zu finden!&ldquo; Am Ende z&auml;hlt ihr gemeinsam. Falls ein Kind leer ausgeht: Ersatz-Eier in der Tasche haben.</p>
-    </div>
+    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Sichtaufsicht durch Erwachsene. Bei 3-Jährigen alle Materialien auf Verschluckungsgefahr prüfen (Klopapierrollen-Test). Mini-Dinos so groß wählen, dass sie NICHT durch eine Klopapierrolle passen (Verschluck-Test).</p></div>
 
     <div class="game-detail">
       <h4>🦖 Dino-Stampfen (Stopptanz) — Spielanleitung</h4>
@@ -199,7 +199,7 @@ window.plausible.init=function(){};window.plausible.q=[];
       <p style="font-size:14px"><strong>So geht&rsquo;s:</strong> Musik an = alle stampfen wie ein T-Rex durch den Raum. Musik aus = alle frieren ein wie ein Fossil. Du machst laut mit — das gibt den Kindern Sicherheit.</p>
       <p style="font-size:14px"><strong>Varianten:</strong> Verschiedene Dinos ansagen: &bdquo;Stampft wie ein T-Rex!&ldquo; (laut), &bdquo;Schleicht wie ein Raptor!&ldquo; (auf Zehenspitzen), &bdquo;Fliegt wie ein Flugsaurier!&ldquo; (Arme flattern). Funktioniert ab 4 — bei 3-J&auml;hrigen nur Stampfen + Einfrieren.</p>
       <p style="font-size:14px"><strong>Wichtig:</strong> Niemand scheidet aus. Alle machen immer mit. Das Spiel l&auml;sst sich perfekt dehnen (5–15 Min.) oder spontan beenden.</p>
-    </div>
+    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Sichtaufsicht durch Erwachsene. Platz freiräumen (Tisch-Kanten, harte Möbel). Bei 3-Jährigen Niemand-scheidet-aus-Regel strikt einhalten. Nur kurze Tücher, NIE um den Hals (Strangulationsgefahr); auf Stolpern über lange Stoffe achten.</p></div>
 
     <h3>🍿 Essen (5 Kinder, 1,5 Std.)</h3>
     <div class="snack-grid">
@@ -277,7 +277,7 @@ window.plausible.init=function(){};window.plausible.q=[];
       </div>
       <p style="font-size:14px"><strong>Material:</strong> 20 bunte Plastik-Eier, Mini-Dinos oder Gummib&auml;rchen zum Reinlegen, 5 Sch&uuml;sseln</p>
       <p style="font-size:14px"><strong>So geht&rsquo;s:</strong> Eier verteilen (bei 3-J&auml;hrigen halb sichtbar, bei 5-J&auml;hrigen versteckter). Alle suchen gleichzeitig, kein Wettbewerb. &bdquo;Wer eins findet, darf es &ouml;ffnen!&ldquo; Ersatz-Eier in der Tasche f&uuml;r Kinder die leer ausgehen.</p>
-    </div>
+    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Sichtaufsicht durch Erwachsene. Bei 3-Jährigen alle Materialien auf Verschluckungsgefahr prüfen (Klopapierrollen-Test). Mini-Dinos so groß wählen, dass sie NICHT durch eine Klopapierrolle passen (Verschluck-Test).</p></div>
 
     <div class="game-detail">
       <h4>🦖 Dino-Stampfen (Stopptanz) — Spielanleitung</h4>
@@ -286,7 +286,7 @@ window.plausible.init=function(){};window.plausible.q=[];
       </div>
       <p style="font-size:14px"><strong>Material:</strong> Musikbox oder Handy mit Lautsprecher</p>
       <p style="font-size:14px"><strong>So geht&rsquo;s:</strong> Musik an = stampfen wie T-Rex. Musik aus = Fossil. Varianten ab 4 Jahren: verschiedene Dinos nachahmen (Raptor schleichen, Flugsaurier flattern). Niemand scheidet aus, alle machen immer mit.</p>
-    </div>
+    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Sichtaufsicht durch Erwachsene. Platz freiräumen (Tisch-Kanten, harte Möbel). Bei 3-Jährigen Niemand-scheidet-aus-Regel strikt einhalten. Nur kurze Tücher, NIE um den Hals (Strangulationsgefahr); auf Stolpern über lange Stoffe achten.</p></div>
 
     <div class="game-detail">
       <h4>🌋 Vulkan-Experiment — Spielanleitung</h4>
@@ -296,7 +296,7 @@ window.plausible.init=function(){};window.plausible.q=[];
       <p style="font-size:14px"><strong>Material:</strong> 1 leere Plastikflasche (0,5l), Essig, Natron (1–2 EL), Sp&uuml;lmittel (Spritzer), rote Lebensmittelfarbe, Auffangschale oder Wanne</p>
       <p style="font-size:14px"><strong>So geht&rsquo;s:</strong> Flasche in Sandh&uuml;gel oder Blumentopf stellen. 3 EL Natron + Spritzer Sp&uuml;li + rote Farbe in die Flasche. Kinder z&auml;hlen runter. Essig dazugie&szlig;en — Lava! Funktioniert 3–4 Mal hintereinander. Die Kinder wollen es IMMER nochmal sehen.</p>
       <p style="font-size:14px"><strong>Alters-Tipp 3–5:</strong> Du machst das Eingie&szlig;en. Kinder d&uuml;rfen den Countdown rufen und zuschauen. Nicht selbst gie&szlig;en lassen — wird sonst eine Sauerei.</p>
-    </div>
+    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Kinder min. 1 Armlänge zurück, niemals in den Krater schauen. Schürze/alte Kleidung (Lebensmittelfarbe färbt!). Erwachsener kippt den Essig, nicht das Geburtstagskind. Tablett mit Rand. Bei Augenkontakt sofort 5 Min mit Wasser spülen. Faktencheck: Mehr Natron = NICHT höhere Eruption (der Essig limitiert: 100 ml setzen nur ~7-8 g Natron um) — Mehr Spüli macht den Schaum cremiger. Natron-Essig-Variante (KEIN Wasserstoffperoxid/Trockeneis); Essig reizt die Augen — nach dem Anfassen nicht ins Gesicht fassen.</p></div>
 
     <div class="game-detail">
       <h4>🏗️ Dino-Ausgrabung — Spielanleitung</h4>
@@ -306,7 +306,7 @@ window.plausible.init=function(){};window.plausible.q=[];
       <p style="font-size:14px"><strong>Material:</strong> Gro&szlig;e Wanne (40&times;30 cm reicht), Sand oder Reis (5 kg), 8–10 Dino-Figuren, L&ouml;ffel + Pinsel zum Graben</p>
       <p style="font-size:14px"><strong>So geht&rsquo;s:</strong> Dinos im Sand vergraben. Kinder graben mit L&ouml;ffeln. Wer einen findet, ruft &bdquo;Fossil gefunden!&ldquo; und darf ihn behalten. Wanne auf ein Handtuch stellen (Sand-Schutz).</p>
       <p style="font-size:14px"><strong>Alters-Tipp 3–5:</strong> Nicht zu tief vergraben — 2–3 cm reichen. Die Freude ist das Finden, nicht das Graben. Bei 3-J&auml;hrigen: Dinos zur H&auml;lfte sichtbar lassen.</p>
-    </div>
+    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Mini-Dinos &lt; 3 cm vermeiden bei jüngeren Geschwistern. Sand-Wanne mit Sichtaufsicht. Hände waschen vor Snacks. Bei den Kleinen engmaschig beaufsichtigen — Reiskörner gehören nicht in Nase/Ohr; ggf. gröberes Sensorik-Medium. Reiskörner auch nicht in den Mund nehmen (Aspirationsgefahr) — Sichtaufsicht in Armlänge.</p></div>
 
     <h3>🍿 Essen (5 Kinder, 2 Std.)</h3>
     <div class="snack-grid">
@@ -384,7 +384,7 @@ window.plausible.init=function(){};window.plausible.q=[];
         <span>⏱ 10 Min.</span><span>👶 Ab 2,5 Jahre</span><span>📍 Drinnen oder drau&szlig;en</span><span>💪 5 Min. Vorbereitung</span>
       </div>
       <p style="font-size:14px"><strong>Wow-Variante:</strong> 25 Eier, etwas schwieriger versteckt. Ein besonderes goldenes Ei enth&auml;lt den &bdquo;Schatz&ldquo; — Schoko-Goldm&uuml;nzen f&uuml;r alle. Wer das goldene Ei findet, darf sie verteilen.</p>
-    </div>
+    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Sichtaufsicht durch Erwachsene. Bei 3-Jährigen alle Materialien auf Verschluckungsgefahr prüfen (Klopapierrollen-Test). Mini-Dinos so groß wählen, dass sie NICHT durch eine Klopapierrolle passen (Verschluck-Test).</p></div>
 
     <div class="game-detail">
       <h4>🏗️ Dino-Ausgrabung — Spielanleitung</h4>
@@ -393,7 +393,7 @@ window.plausible.init=function(){};window.plausible.q=[];
       </div>
       <p style="font-size:14px"><strong>Material:</strong> Gro&szlig;e Wanne, Sand/Reis, Dino-Figuren + echte Muscheln + bunte Steine, L&ouml;ffel + Pinsel</p>
       <p style="font-size:14px"><strong>So geht&rsquo;s:</strong> Dinos 2–3 cm tief vergraben (bei 3-J&auml;hrigen zur H&auml;lfte sichtbar lassen). Kinder graben mit Pinseln wie echte Pal&auml;ontologen. Jeder darf seinen Fund behalten. Wanne auf Handtuch stellen.</p>
-    </div>
+    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Mini-Dinos &lt; 3 cm vermeiden bei jüngeren Geschwistern. Sand-Wanne mit Sichtaufsicht. Hände waschen vor Snacks. Bei den Kleinen engmaschig beaufsichtigen — Reiskörner gehören nicht in Nase/Ohr; ggf. gröberes Sensorik-Medium. Reiskörner auch nicht in den Mund nehmen (Aspirationsgefahr) — Sichtaufsicht in Armlänge.</p></div>
 
     <div class="game-detail">
       <h4>🌋 Vulkan-Experiment — Spielanleitung</h4>
@@ -403,7 +403,7 @@ window.plausible.init=function(){};window.plausible.q=[];
       <p style="font-size:14px"><strong>Material:</strong> Plastikflasche (0,5l), Essig, Natron (1–2 EL), Sp&uuml;lmittel, rote Lebensmittelfarbe, Sandh&uuml;gel oder Blumentopf, Auffangschale</p>
       <p style="font-size:14px"><strong>So geht&rsquo;s:</strong> Natron + Sp&uuml;li + Farbe in die Flasche. Kinder z&auml;hlen runter: &bdquo;3, 2, 1, AUSBRUCH!&ldquo; Essig dazugie&szlig;en — Lava! Funktioniert 3–4 Mal. Die Kinder wollen es IMMER nochmal.</p>
       <p style="font-size:14px"><strong>Alters-Tipp 3–5:</strong> Du machst das Gie&szlig;en. Kinder d&uuml;rfen Countdown rufen und staunen. Nicht selbst gie&szlig;en lassen — wird sonst eine Sauerei.</p>
-    </div>
+    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Kinder min. 1 Armlänge zurück, niemals in den Krater schauen. Schürze/alte Kleidung (Lebensmittelfarbe färbt!). Erwachsener kippt den Essig, nicht das Geburtstagskind. Tablett mit Rand. Bei Augenkontakt sofort 5 Min mit Wasser spülen. Faktencheck: Mehr Natron = NICHT höhere Eruption (der Essig limitiert: 100 ml setzen nur ~7-8 g Natron um) — Mehr Spüli macht den Schaum cremiger. Natron-Essig-Variante (KEIN Wasserstoffperoxid/Trockeneis); Essig reizt die Augen — nach dem Anfassen nicht ins Gesicht fassen.</p></div>
 
     <div class="game-detail">
       <h4>🦖 Dino-Stampfen mit Varianten — Spielanleitung</h4>
@@ -411,7 +411,7 @@ window.plausible.init=function(){};window.plausible.q=[];
         <span>⏱ 10 Min.</span><span>👶 Ab 3 Jahre</span><span>📍 Drinnen oder drau&szlig;en</span><span>💪 Kein Aufwand</span>
       </div>
       <p style="font-size:14px"><strong>Wow-Variante:</strong> Stopptanz PLUS Tier-Ansagen. Du rufst: &bdquo;T-Rex!&ldquo; (laut stampfen), &bdquo;Raptor!&ldquo; (leise schleichen), &bdquo;Flugsaurier!&ldquo; (Arme flattern), &bdquo;Langhals!&ldquo; (auf Zehenspitzen). Kinder machen nach. Du machst aktiv mit — das gibt Sicherheit.</p>
-    </div>
+    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Sichtaufsicht durch Erwachsene. Platz freiräumen (Tisch-Kanten, harte Möbel). Bei 3-Jährigen Niemand-scheidet-aus-Regel strikt einhalten. Nur kurze Tücher, NIE um den Hals (Strangulationsgefahr); auf Stolpern über lange Stoffe achten.</p></div>
 
     <div class="game-detail">
       <h4>🦖 Dino-Parcours — Spielanleitung</h4>
@@ -421,7 +421,7 @@ window.plausible.init=function(){};window.plausible.q=[];
       <p style="font-size:14px"><strong>Material:</strong> 2 Seile/Schnüre, 4–5 Kissen, 1 Decke + 2 St&uuml;hle (Tunnel), optional Pylonen</p>
       <p style="font-size:14px"><strong>Aufbau:</strong> Seil zwischen 2 St&uuml;hle (30 cm H&ouml;he = drunter kriechen). Kissen in Reihe (dr&uuml;ber springen). Decke &uuml;ber 2 St&uuml;hle (Tunnel = Dino-H&ouml;hle).</p>
       <p style="font-size:14px"><strong>Alters-Tipp 3–5:</strong> Kein Wettrennen! Alle laufen zusammen. Du l&auml;ufst voraus und zeigst, was zu tun ist. Bei 3-J&auml;hrigen: Seil h&ouml;her spannen (leichter drunter durch), Kissen weglassen.</p>
-    </div>
+    <p class="spiel-safe"><b>Sicherheit bei diesem Spiel:</b> Sichtaufsicht durch Erwachsene; Materialien auf Verschluckungsgefahr prüfen. Renn-/Balancier-Regel: Lauffläche frei von Hindernissen, IMMER nur einer gleichzeitig auf der Strecke, kein Schubsen/Überholen, fester Abstand; drinnen rutschfeste Schuhe oder Stoppersocken. Auf glattem Boden barfuß oder Schuhe mit Grip (keine Socken — Rutschgefahr); harte Möbelkanten im Laufweg abräumen/abpolstern.</p></div>
 
     <div class="tip">
       <strong>🎯 Der geheime Wow-Faktor f&uuml;r 3–5-J&auml;hrige</strong>
```
