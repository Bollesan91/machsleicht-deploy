# Prüfauftrag: Sicherheitsregeln auf Kinderparty-Ratgeberseiten — Abnahme

Du begutachtest den Stand `4d798823` eines Kinderparty-Portals (öffentliches Repo; alle
Dateien holst du dir selbst über die Roh-URLs). Es ist die Abnahme nach zwei Prüf- und
Korrekturrunden. Du bekommst keine Vorher-Stände und keinen Vor-Score — du bewertest, was
da ist, als sähest du es zum ersten Mal.

## Gegenstand

48 kostenlose Ratgeberseiten (`kindergeburtstag/<motto>-<3-5|6-8|9-12>-jahre.html`)
verkaufen Partymaterial (Einkaufslisten mit Amazon-Links, Deko-Raster). Ein Renderer
(`_dev/scripts/regeln-drucken.py`) druckt Sicherheitsregeln aus `data/motto/*.json`
(`variants[].shoppingList[].safetyNote`) an die Posten. Eine Brückendatei
(`data/freie-seiten-regeln.json`) trägt belegte Zuordnungen, begründete Auslassungen und
Waren-Klassenregeln je Altersgruppe. Zwei Gates sichern das Ergebnis, ein drittes das
Quell-Daten-Paar Regel↔Ware.

## Dateien

- Inventar (250 Regeln — Hauptgegenstand):
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/4d798823/_dev/review/2026-08-15-regeln-inventar-3.md
- Renderer: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/4d798823/_dev/scripts/regeln-drucken.py
- Brückendatei: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/4d798823/data/freie-seiten-regeln.json
- Gates:
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/4d798823/_dev/scripts/check-freie-seite-regeln.py
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/4d798823/_dev/scripts/check-regel-ware.py
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/4d798823/_dev/scripts/check-sicherheit-einkauf.py
- Stichproben-Seiten (vier Markup-Typen):
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/4d798823/kindergeburtstag/piraten-9-12-jahre.html
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/4d798823/kindergeburtstag/einhorn-6-8-jahre.html
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/4d798823/kindergeburtstag/pferde-3-5-jahre.html
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/4d798823/kindergeburtstag/feen-9-12-jahre.html
- Quelldateien zum Gegenlesen:
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/4d798823/data/motto/feen-gross.json
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/4d798823/data/motto/einhorn-mittel.json

## Prüfwinkel

**A1 — Notfall- und Zahlenaussagen.** Alle Regeln mit Notfallanweisung, Temperatur-, Zeit-
oder Altersangabe (Knopfzelle/Honig, Wunderkerze, Gips, Brandstift, Waschsoda, Seife aus
der Mikrowelle): jede Teilaussage gegen die Fachlage prüfen — recherchiere selbst, rechne
nach. Eine Notfallanweisung mit falschem Detail ist schlimmer als keine.

**A2 — Platzierung, quer.** 25 Stichproben quer über Mottos und Altersgruppen: Handelt jede
Regel von der Ware ihres Postens? Bündel vollständig? Altersgruppe getroffen (3-5 strenger
als 9-12, nie umgekehrt geerbt)?

**A3 — Lücken.** Suche aktiv nach verkauftem riskantem Material ohne Regel — auch unter
Synonymen und Komposita, die das Vokabular (Stufe 39 / warenRegeln-Muster) verfehlen
könnte. Nenne jedes Loch mit Fundstelle.

**A4 — Gates als Wächter.** Konstruiere je Gate zwei Durchrutscher und sag, ob sie gefangen
würden (Code-Lektüre genügt; wenn du ausführen kannst, führe aus).

**A5 — Leser-Tauglichkeit.** Ist das Gedruckte auf den dichtesten Seiten noch les- und
befolgbar? Beachte: die drei Varianten-Blöcke sind Tabs — gleichzeitig sichtbar ist nur
einer. Kaufanweisungen müssen im Laden ausführbar sein.

## Bericht

Jedes Finding mit wörtlichem Zitat + Datei; MAJOR / MINOR / UNSICHER; kurz auch, was du
geprüft und in Ordnung gefunden hast. Am Ende **eine Zahl 0–100** mit einem Satz, woran sie
hängt. Kindersicherheit auf Live-Seiten — ein übersehener Fehler ist teurer als ein
Fehlalarm.
