Du bist unabhängiger Code-Gutachter für einen Sicherheits-Hotfix an 15 statischen React-Gast-Apps (Kindergeburtstags-Einladungsspiele). Prüfe adversarial, ob der Fix korrekt und vollständig ist und keine neuen Fehler einführt.

KONTEXT: Jede App ist ein einzelnes HTML mit vorkompiliertem React (React.createElement, kein JSX-Build). Eine Party-Seite (Cloudflare Worker) bettet die Apps mit URL-Params ein und hängt IMMER `name=` und `date=` an, `ort=` und `tel=` aber bewusst LEER. Vor dem Fix fielen die Apps dann auf Demo-Defaults zurück: der Zusage-Button öffnete wa.me/491701234567 (fremde Nummer!) mit Kindname+Datum im Text, die Sieg-Box zeigte einen erfundenen Treffpunkt („Stadtpark"/„Volkspark Friedrichshain"). Drei Aufruf-Modi müssen nach dem Fix gelten:
  A) DEMO (kein einziger URL-Param, so laden die Vorlagen-/Hub-Seiten die App): Demo-Defaults inkl. Ort-Zeile und Zusage-Button bleiben UNVERÄNDERT sichtbar.
  B) REAL via Partyseite (`name`+`date` gesetzt, `ort`/`tel` leer): KEINE Ort-Zeile, KEIN Zusage-Button, keine Fremdnummer erreichbar.
  C) serve-invite (`name`+`tel` mit echter Host-Nummer): Button DA und öffnet wa.me/<Host-Nummer>.

PRÜFOBJEKT (SHA 45338572):
  Fix-Diff (alle 15 Apps): https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/4533857246c7869432ee46bc5510bca302cc360d/_dev/review/2026-08-11-p0-rsvp.patch
  After-State Stichproben (3 Strukturklassen):
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/4533857246c7869432ee46bc5510bca302cc360d/einladung/feuerwehr/whatsapp/index.html
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/4533857246c7869432ee46bc5510bca302cc360d/einladung/piraten/whatsapp/index.html
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/4533857246c7869432ee46bc5510bca302cc360d/einladung/dino/whatsapp/index.html

WAS DER FIX BEHAUPTET:
F1 Bootstrap-Gate: Objekt-Stil-Apps (13×) setzen `const _real = !!(_p.get("name") || _p.get("date"))` und leeren ort/tel-Fallbacks nur im Real-Modus (`_p.get("ort") || (_real ? "" : "<Demo-Ort>")`). Mutations-Stil-Apps (dino, piraten) leeren `_props.partyPlace`/`_props.rsvpPhone` VOR den if-Overrides, sodass echte Params weiterhin gewinnen.
F2 Render-Guards: genau EINE Ort-Zeile je App bekommt Prefix `partyPlace && `, genau EIN Button (der wa.me-Zusage-Button, nicht der Nochmal-Button) bekommt `rsvpPhone && `.
F3 Kein weiterer Konsumpunkt von rsvpPhone/partyPlace existiert (je 3 Vorkommen: Signatur-Default, Bootstrap, Render).

PRÜFWINKEL:
R1 — Diff vollständig lesen: sind wirklich alle 15 Apps konsistent gefixt? Je App: sitzt der `rsvpPhone && `-Guard am wa.me-Button (im onClick muss window.open mit wa.me stehen) und NICHT am Restart-Button? Sitzt `partyPlace && ` an der 📍-Zeile?
R2 — Die drei Modi je Strukturklasse durchspielen (Code-Trace an den 3 After-State-Files): A/B/C wie oben. Adversarial: Konstruiere einen Param-Mix, bei dem der Fix falsch entscheidet (z. B. nur `time` gesetzt; `ort` gesetzt aber `tel` leer; `foto` ohne name; leerer String vs. fehlender Param).
R3 — Neue Fehler: JSX-Gültigkeit der `X && createElement`-Einfügungen an ihrer exakten Position (Argument-Listen!), Mutations-Stil-Reihenfolge (Leerung vor Overrides?), React-Fallback-Semantik (leerer String als Prop unterdrückt den Funktions-Signatur-Default? — prüfe die Signatur-Defaults in den Files), Verhalten bei `rsvpPhone`/`partyPlace` als leerer String im JSX (rendert React `""` oder nichts?).
R4 — Restlöcher: Erreicht irgendein anderer Codepfad noch die Nummer 491701234567 oder einen Demo-Ort im Real-Modus (Start-Screen, Zwischen-Screens, msg-Texte)? Greppe die After-State-Files.

PFLICHTEN: Je Finding wörtliches Zitat + Datei + MAJOR/MINOR/UNSICHER. MAJOR nur bei realem Nutzer-Schaden. Score 0-100. Abschluss: „REVIEW ABGESCHLOSSEN".
