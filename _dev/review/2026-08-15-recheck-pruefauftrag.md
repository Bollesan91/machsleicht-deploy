# Prüfauftrag: Sicherheitsregeln auf Kinderparty-Ratgeberseiten — Diff-Re-Check

Du begutachtest den Stand `e67f038e` eines Kinderparty-Portals (öffentliches Repo, du holst
dir alles selbst über die Roh-URLs). Ein Vorgutachten hat 13 MAJOR-Befunde geliefert; danach
wurden Daten und Maschine überarbeitet. Deine Aufgabe ist der Zustand JETZT — nicht die
Geschichte. Du bekommst bewusst keine Vorher-Texte und keinen Vor-Score.

## Gegenstand

48 kostenlose Ratgeberseiten (`kindergeburtstag/<motto>-<3-5|6-8|9-12>-jahre.html`)
verkaufen Partymaterial (Einkaufslisten mit Amazon-Links, Deko-Raster). Ein Renderer
(`_dev/scripts/regeln-drucken.py`) druckt Sicherheitsregeln aus `data/motto/*.json`
(`variants[].shoppingList[].safetyNote`) an die Posten; eine Brückendatei
(`data/freie-seiten-regeln.json`) trägt belegte Zuordnungen, begründete Auslassungen und
Waren-Klassenregeln je Altersgruppe. Drei Gates sichern das Ergebnis.

## Dateien

- Inventar (was an welchem Posten steht — dein Hauptgegenstand):
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/e67f038e8646af55c315b76802890aaada9943a8/_dev/review/2026-08-15-regeln-inventar-2.md
- Renderer: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/e67f038e8646af55c315b76802890aaada9943a8/_dev/scripts/regeln-drucken.py
- Brückendatei: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/e67f038e8646af55c315b76802890aaada9943a8/data/freie-seiten-regeln.json
- Gates: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/e67f038e8646af55c315b76802890aaada9943a8/_dev/scripts/check-freie-seite-regeln.py
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/e67f038e8646af55c315b76802890aaada9943a8/_dev/scripts/check-regel-ware.py
- Beispielseiten (vier Markup-Typen):
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/e67f038e8646af55c315b76802890aaada9943a8/kindergeburtstag/feen-9-12-jahre.html
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/e67f038e8646af55c315b76802890aaada9943a8/kindergeburtstag/meerjungfrau-3-5-jahre.html
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/e67f038e8646af55c315b76802890aaada9943a8/kindergeburtstag/detektiv-9-12-jahre.html
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/e67f038e8646af55c315b76802890aaada9943a8/kindergeburtstag/prinzessin-3-5-jahre.html
- Quelldateien zum Gegenlesen:
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/e67f038e8646af55c315b76802890aaada9943a8/data/motto/feen-gross.json
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/e67f038e8646af55c315b76802890aaada9943a8/data/motto/meerjungfrau-klein.json

## Prüfwinkel

**R1 — Notfall-Anweisungen.** Die Knopfzellen-Regel enthält jetzt eine Erste-Hilfe-Kette
(112, kein Erbrechen, Honig-Gabe mit Alters- und Abbruchbedingungen). Recherchiere die
Fachlage selbst (Giftinformationszentren, Poison Control, BfR) und prüfe jede Teilaussage:
Dosierung, Intervall, Altersgrenze, Kontraindikationen, Reihenfolge. Eine Notfall-Anweisung
mit einem falschen Detail ist schlimmer als keine.

**R2 — Steht jede Regel an ihrem Posten?** Nimm mindestens 20 Einträge quer über die Mottos
aus dem Inventar. Achte auf Bündel-Posten (die jetzt MEHRERE Regeln tragen können): Ist jede
der gestapelten Regeln für dieses Bündel richtig, fehlt eine dritte, ist eine doppelt?

**R3 — Die Waren-Klassenregeln** (`warenRegeln`): Prüfe Muster gegen reale Labels (Über- und
Untertreffer, auch mit Bindestrich-Komposita wie "Lederschnur", "Wollknäuel",
"Pool-Nudel-Schwerter") und die Altersgruppen-Texte auf fachliche Passung — besonders die
3-5-Texte für Wunderkerze und Schnur/Kordel.

**R4 — Auslassungen** (`keinPosten`): Lies jede Begründung gegen die zugehörige Seite.
Verschweigt eine davon eine echte Gefahr?

**R5 — Maschinen-Vertrag am Code:** idempotent, fail-loud, ein Posten mit mehreren Regeln,
Seiten ohne Datenregeln durchlaufen trotzdem Klassenregeln. Konstruiere je Gate einen
Fehler, der durchginge.

**R6 — Befolgbarkeit:** Für jede Regel mit Kaufanweisung (Perlen, Wunderkerze, Nebelfluid):
Kann ein Elternteil im Laden tun, was da steht? Recherchiere im Zweifel, ob das verlangte
Produkt/Etikett real existiert.

## Bericht

Jedes Finding mit wörtlichem Zitat + Datei; MAJOR / MINOR / UNSICHER; kurz sagen, was du
geprüft und in Ordnung gefunden hast. Am Ende eine Zahl 0-100 mit einem Satz Begründung.
Kindersicherheit auf Live-Seiten — ein übersehener Fehler ist teurer als ein Fehlalarm.
