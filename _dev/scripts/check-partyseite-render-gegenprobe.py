#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Gegenprobe zu Stufe 60: faengt die Regel einen ECHT eingebauten Fehler?

Eine Linter-Stufe, die noch nie rot war, beweist nichts. Diese Gegenprobe baut fuenfundzwanzig Defekte
ein — jeder davon ein echter Befund aus Welle 3 (19.08.), aus den beiden Gutachten zum
Kontaktpaket (27.08.) oder die Klasse aus L14 — und verlangt, dass Stufe 60 bei JEDEM rot wird.

Achtzehn der fuenfundzwanzig stammen woertlich von Gutachtern, die damit durch eine fruehere Fassung
dieser Stufe gekommen sind: Adress-Leak nur bei fehlendem Grobort, Adresse im Hinweistext,
Adresse in der API-Antwort, Adresse im Walk-in-Label, Copy-Zusage ohne ihre Wache, Adress-Leak
nur bei Partys ohne Gaesteliste, und ein Versprechen im Seiten-Body statt im Meta-Tag. Jeder
Durchrutscher wird hier zur Dauerregel — das ist der einzige Weg, auf dem eine Stufe waechst.

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
     r'''(_isCoreGame ? party.date : new Date(party.date+"T00:00:00")''',
     r'''(false ? party.date : new Date(party.date+"T00:00:00")'''),

    ("Legacy-Spiel bekommt das ISO-Rohdatum (18 von 19 nannten '2026-09-12' auf der Einladung)",
     r'''(_isCoreGame ? party.date : new Date(party.date+"T00:00:00")''',
     r'''(true ? party.date : new Date(party.date+"T00:00:00")'''),

    ("leerer date=-Parameter bleibt stehen (Party ohne Datum)",
     r'''    _gameDate ? `date=${encodeURIComponent(_gameDate)}` : "",''',
     r'''    `date=${encodeURIComponent(_gameDate)}`,'''),

    ("Adresse in der Spiel-URL, aber nur wenn kein Grobort gesetzt ist (Gutachten M2, Durchrutscher A)",
     r'''    _gameOrt ? `ort=${encodeURIComponent(_gameOrt)}` : "",''',
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

    # Die drei folgenden Defekte hat der Re-Check-Gutachter selbst gebaut — alle drei kamen durch
    # die zweite Fassung der Stufe hindurch. Sie stehen hier, damit dieselbe Achse nicht ein
    # drittes Mal blind bleibt: API-Antworten, Formen x Ansichten, und Copy-Zusagen.
    ("Adresse im Public-GET (Re-Check A1: API-Antwort war nie geprueft)",
     r'''      const {editToken,email,doiToken,ref,address,invites,...safe} = party;''',
     r'''      const {editToken,email,doiToken,ref,invites,...safe} = party;'''),

    ("Adresse im Walk-in-Label, greift nur ohne Grobort (Re-Check A2: Form x Ansicht fehlte)",
     r'''    : (_addrWalkIn ? "\u{1F512} Den Treffpunkt bekommst du von der Gastgeber-Familie" : "\u{1F512} Adresse erscheint nach deiner Zusage");''',
     r'''    : (_addrWalkIn ? "\u{1F512} Treffpunkt: "+party.address : "\u{1F512} Adresse erscheint nach deiner Zusage");'''),

    ("Treffpunkt-Zusage ohne HAS_ADDR-Wache (Re-Check B: die Copy-Regel war unbewacht)",
     r'''&&HAS_ADDR?" \\u{1F4CD} Den genauen Treffpunkt''',
     r'''?" \\u{1F4CD} Den genauen Treffpunkt'''),

    # Runde 3 zeigte die naechste Achse: die API wurde geprueft, aber nur an zwei von acht
    # Party-Formen; und die Wunschlisten-Regel existierte nur als Meta-Regex.
    ("Adresse im Public-GET, aber nur bei Partys OHNE Gaesteliste (Runde 3: API x Party-Form)",
     r'''      const {editToken,email,doiToken,ref,address,invites,...safe} = party;''',
     r'''      const {editToken,email,doiToken,ref,address,invites,...safe} = party;
      if (!(party.invites && party.invites.length)) safe.address = party.address;'''),

    ("Wunschlisten-Karte im Seiten-Body ohne Wunschliste (Runde 3: Versprechen nur im Meta geprueft)",
     r'''  ${hasWishes?`<div class="card fade-up fade-up-d3">''',
     r'''  ${true?`<div class="card fade-up fade-up-d3">'''),

    ("Loeschfrist wieder pauschal 14 Tage (Runde 3, MAJOR 1)",
     r'''  return (party && party.date) ? "14 Tage nach der Party" : "30 Tage nach der letzten \u00C4nderung";''',
     r'''  return "14 Tage nach der Party";'''),
    # Runde 4: fuenf Defekte, die der Gutachter selbst gebaut hat und die alle durch Fassung 3
    # gekommen sind. Die Achsen dahinter: Zustand NACH einer Zusage, Kapazitaetsgrenze, und
    # Regeln, die nur an einer benannten Party-Form haengen statt an allen Dokumenten.
    ("Adresse im Public-GET, sobald ein Kind zugesagt hat (Runde 4: Achse Zustand)",
     r'''      const {editToken,email,doiToken,ref,address,invites,...safe} = party;''',
     r'''      const {editToken,email,doiToken,ref,address,invites,...safe} = party;
      if (Array.isArray(party.guests) && party.guests.some(g=>g&&g.status==="ja")) safe.address = party.address;'''),

    ("Adresse im Label einer vollen Party (Runde 4: Achse Kapazitaet)",
     r'''    : (_addrWalkIn ? "\u{1F512} Den Treffpunkt bekommst du von der Gastgeber-Familie" : "\u{1F512} Adresse erscheint nach deiner Zusage");''',
     r'''    : (_partyVoll ? "\u{1F512} Treffpunkt: "+party.address : _addrWalkIn ? "\u{1F512} Den Treffpunkt bekommst du von der Gastgeber-Familie" : "\u{1F512} Adresse erscheint nach deiner Zusage");'''),

    ("Editor-Frist wieder fest auf 14 Tage (Runde 4: Frist nur an zwei Dokumenten geprueft)",
     u'''werden automatisch ${fristText(party)} gelöscht.''',
     u'''werden automatisch 14 Tage nach der Party gelöscht.'''),

    ("Wunschlisten-Karte an Partys ohne Datum (Runde 4: Versprechen nur an einer Form geprueft)",
     r'''  ${hasWishes?`<div class="card fade-up fade-up-d3">''',
     r'''  ${(hasWishes||!party.date)?`<div class="card fade-up fade-up-d3">'''),

    ("Ort-Teaser trotz voller Party (Runde 4: Kapazitaet im Spiel-Parameter)",
     r'''  const _gameOrt = party.areaHint || (_addrErreichbar ? "" : "Den Ort verr\u00E4t dir die Gastgeber-Familie");''',
     r'''  const _gameOrt = _partyVoll ? "" : (party.areaHint || (_addrErreichbar ? "" : "Den Ort verr\u00E4t dir die Gastgeber-Familie"));'''),
    # Runde 5: der Gutachter hat zwei Achsen gefunden, die auch Fassung 4 nicht kannte —
    # die Transportebene (Antwort-Header) und die Formulierung (die Regel war eine Wortliste).
    ("Adresse im Set-Cookie der Gaesteseite (Runde 5: Achse Antwort-Header)",
     u'''"Cache-Control":"no-store"}});''',
     u'''"Cache-Control":"no-store","Set-Cookie":`ml_addr=${encodeURIComponent(party.address||"")}; Path=/`}});'''),

    ("Neu formuliertes Adress-Versprechen im RSVP-Block (Runde 5: Achse Formulierung)",
     u'''      <button class="btn" onclick="sendRsvp()" id="rsvpBtn">''',
     u'''      ${party.address?`<p style="font-size:12px;color:#1E7B34;margin:0 0 8px">Sobald du zusagst, steht der Treffpunkt oben bei den Party-Details.</p>`:""}
      <button class="btn" onclick="sendRsvp()" id="rsvpBtn">'''),
    # Runde 6: der Gutachter fand zwei weitere Achsen — Routen, deren ganze Ausgabe ein Header
    # ist (/go/-Redirect), und die Formatierung des Versprechens (Inline-Tag, angehaengte
    # Verneinung). Dazu die Regression, die dieselbe Runde gefixt hat: Absagen als belegte Plaetze.
    ("Adresse im Location-Header des /go/-Redirects (Runde 6: Achse Route-ohne-Rumpf)",
     u'''      return Response.redirect(affiliateUrl(wish.url,env),302);''',
     u'''      return Response.redirect(affiliateUrl(wish.url,env)+"&ml_ship="+encodeURIComponent(party.address||""),302);'''),

    ("Adress-Versprechen mit Inline-Tag mittendrin (Runde 6: Achse Formatierung)",
     u'''      <button class="btn" onclick="sendRsvp()" id="rsvpBtn">''',
     u'''      ${party.address?`<p style="font-size:12px">Sobald du <strong>zusagst</strong>, siehst du hier den genauen Treffpunkt.</p>`:""}
      <button class="btn" onclick="sendRsvp()" id="rsvpBtn">'''),

    ("Adress-Versprechen mit angehaengter Verneinung (Runde 6: Achse Verneinungs-Filter)",
     u'''      <button class="btn" onclick="sendRsvp()" id="rsvpBtn">''',
     u'''      ${party.address?`<p style="font-size:12px">Die genaue Adresse siehst du direkt nach deiner Zusage, vorher nicht.</p>`:""}
      <button class="btn" onclick="sendRsvp()" id="rsvpBtn">'''),

    ("Absagen belegen wieder Plaetze (Runde 6, M2)",
     u'''  const _partyVoll = !!(Array.isArray(party.guests) && (guestsAktiv(party) >= MAX_GUESTS || party.guests.length >= HARD_GUESTS));''',
     u'''  const _partyVoll = !!(Array.isArray(party.guests) && party.guests.length >= MAX_GUESTS);'''),
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
