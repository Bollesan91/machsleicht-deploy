#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Gegenprobe zu Stufe 60: faengt die Regel einen ECHT eingebauten Fehler?

Eine Linter-Stufe, die noch nie rot war, beweist nichts. Diese Gegenprobe baut acht Defekte
ein — jeder davon ein echter Befund aus Welle 3 (19.08.), aus dem Gutachten zum Kontaktpaket
(27.08.) oder die Klasse aus L14 — und verlangt, dass Stufe 60 bei JEDEM rot wird.

Zwei der acht stammen woertlich aus dem Gutachten: der Gutachter hat sie in die erste Fassung
der Stufe eingebaut und ist damit gruen durchgekommen (Adress-Leak nur bei fehlendem Grobort,
Adresse im Hinweistext der zweiten Party). Beide sind hier, damit dieselbe Luecke nicht
zweimal entsteht.

Die Defekte landen ausschliesslich in einer Kopie im Temp-Verzeichnis; der Repo-Stand wird nie
beschrieben (MACHSLEICHT_WORKER zeigt die Stufe auf die Kopie). Ein Abbruch mittendrin kann
deshalb keinen Defekt hinterlassen.
"""
import io, os, subprocess, sys, tempfile

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
SRC = os.path.join(ROOT, "party-worker.js")
CHECK = os.path.join("_dev", "scripts", "check-partyseite-render.mjs")

DEFEKTE = [
    ("core-Spiel bekommt den deutschen Datumstext (V8 parst ihn lax -> falscher Wochentag)",
     r'''    ? (_isCoreGame ? party.date : new Date(party.date+"T00:00:00").toLocaleDateString("de-DE",{weekday:"long",day:"numeric",month:"long"}))''',
     r'''    ? (false ? party.date : new Date(party.date+"T00:00:00").toLocaleDateString("de-DE",{weekday:"long",day:"numeric",month:"long"}))'''),

    ("Legacy-Spiel bekommt das ISO-Rohdatum (18 von 19 nannten '2026-09-12' auf der Einladung)",
     r'''    ? (_isCoreGame ? party.date : new Date(party.date+"T00:00:00").toLocaleDateString("de-DE",{weekday:"long",day:"numeric",month:"long"}))''',
     r'''    ? (true ? party.date : new Date(party.date+"T00:00:00").toLocaleDateString("de-DE",{weekday:"long",day:"numeric",month:"long"}))'''),

    ("leerer date=-Parameter bleibt stehen (Party ohne Datum)",
     r'''    _gameDate ? `date=${encodeURIComponent(_gameDate)}` : "",''',
     r'''    `date=${encodeURIComponent(_gameDate)}`,'''),

    ("Adresse in der Spiel-URL, aber nur wenn kein Grobort gesetzt ist (Gutachten M2, Durchrutscher A)",
     r'''    party.areaHint ? `ort=${encodeURIComponent(party.areaHint)}` : "",''',
     r'''    `ort=${encodeURIComponent(party.areaHint||party.address||"")}`,'''),

    ("Adresse im Hinweistext der Adress-Sperre (Gutachten M2, Durchrutscher B)",
     r''': (party.areaHint ? "Die genaue Adresse bekommst du mit deiner Zusage \u2014 so wandert sie nicht durch Weiterleitungen." : "So wandert sie nicht durch Weiterleitungen.");''',
     r''': (party.areaHint ? "Die genaue Adresse bekommst du mit deiner Zusage \u2014 so wandert sie nicht durch Weiterleitungen." : "So wandert "+party.address+" nicht durch Weiterleitungen.");'''),

    ("freier Bezeichner im Template-Literal (L14: Build gruen, jede Gaesteseite 500)",
     r'Es l\u00E4dt ein: <strong>${esc(hostLabel)}</strong>',   # im Worker steht der JS-Escape, kein "ä"
     r'Es l\u00E4dt ein: <strong>${esc(hostLabelTypo)}</strong>'),

    ("Wunschliste bedingungslos versprechen (5 Eltern suchten sie vergeblich)",
     r'Zu-/Absage${hasWishes?", Infos & Wunschliste":" & Infos"}',
     r'Zu-/Absage${true?", Infos & Wunschliste":" & Infos"}'),

    ("Handynummer in der Spiel-URL (WhatsApp-Zusage am Formular vorbei)",
     r'''    party.age ? `age=${party.age}` : "",''',
     r'''    `tel=${encodeURIComponent(party.hostPhone||"")}`, party.age ? `age=${party.age}` : "",'''),
]

orig = io.open(SRC, encoding="utf-8").read()
tmpdir = tempfile.mkdtemp(prefix="ml-gegenprobe-")
gruen = []

for label, needle, ersatz in DEFEKTE:
    if orig.count(needle) != 1:
        print("Gegenprobe: Anker nicht mehr eindeutig — '%s'" % label)
        gruen.append(label)
        continue
    kopie = os.path.join(tmpdir, "defekt.js")
    io.open(kopie, "w", encoding="utf-8", newline="").write(orig.replace(needle, ersatz, 1))
    e = dict(os.environ, MACHSLEICHT_WORKER=kopie)
    r = subprocess.run(["node", CHECK], cwd=ROOT, env=e, capture_output=True,
                       text=True, encoding="utf-8", errors="replace", shell=(os.name == "nt"))
    if r.returncode == 0:
        gruen.append(label)

if gruen:
    print("Gegenprobe: %d von %d Defekten blieben UNBEMERKT" % (len(gruen), len(DEFEKTE)))
    for g in gruen:
        print("   ✗ " + g)
    sys.exit(1)
print("Gegenprobe: alle %d eingebauten Defekte wurden gefangen" % len(DEFEKTE))
