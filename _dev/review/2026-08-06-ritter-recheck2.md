Du bist unabhängiger Gutachter. Vor dir liegt ein Änderungssatz an einem Druckprodukt, das Eltern kaufen. Zwei Dinge interessieren mich: ob die Änderungen halten, was ihre Kommentare behaupten — und vor allem, ob sie etwas kaputt gemacht haben. Der Änderungssatz enthält einen Massen-Eingriff in die Daten (77 Schlüssel umbenannt, 208 Texte umgeschrieben, über 45 Dateien). Solche Eingriffe sind die gefährlichsten.

WAS DAS PRODUKT IST
Ein „Ritter-Komplettpaket": eine HTML-Datei, die 21 Blätter im A4-Format rendert. Eltern öffnen sie, drucken sie aus und führen damit einen Kindergeburtstag durch. Wer es kauft, druckt es und richtet danach eine echte Party aus. Ein falscher Zeitwert, eine fehlende Menge oder eine verlorene Sicherheitszeile kostet reales Geld oder einen verpatzten Nachmittag.

Es ist maschinell erzeugt: eine gemeinsame Vorlage (`paket/_maschine/template.html`) plus eine Wortliste je Motto. Sechs Mottos teilen sich die Vorlage — eine Änderung dort steht sechsmal in der Welt. Die Inhalte (Spiele, Sicherheitsregeln, Altersanpassungen) liegen in 45 Motto-Dateien unter `data/motto/`, je Motto eine für klein (3-5), mittel (6-8), gross (9-12).

DAS PRÜFOBJEKT — hol es dir selbst, alles ist öffentlich lesbar:

  Code-Änderungen (Vorlage, Kern, Prüfskripte, Linter-Verdrahtung):
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/50b786af/_dev/review/2026-08-06-ritter-diff2-code.patch

  Daten-Änderungen, zwei repräsentative Dateien von 45 (der Rest folgt
  demselben Muster — prüf das Muster, nicht die Menge):
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/50b786af/_dev/review/2026-08-06-ritter-diff2-daten.patch

  Der Stand NACH den Änderungen:
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/50b786af/paket/ritter/index.html
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/50b786af/paket/core/paket-core.js
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/50b786af/data/motto/ritter-klein.json
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/50b786af/data/motto/ritter-mittel.json
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/50b786af/data/motto/ritter-gross.json
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/50b786af/data/motto/baustelle-klein.json
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/50b786af/data/motto/piraten-gross.json
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/50b786af/data/motto/meerjungfrau-klein.json

  Verworfene Befunde früherer Runden — respektieren, nicht neu melden:
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/50b786af/_dev/OFFENE-REVIEW-PUNKTE.md

DIE BEISPIEL-PARTY (`?demo=1`): Tino, 8 Jahre, Gruppe 6-8, Variante „standard",
Samstag 12.09.2026, 14:00–17:00, Burgweg 7, 21075 Hamburg. Zusagen: Emma
(Erdnuss, Abholung Papa Jens 17:00), Mats, Lina (Laktose, Oma Ruth 16:30),
Noah, Ida — Ben hat abgesagt. `?demo=1&age=4` lädt klein, `&age=11` gross.

DEIN AUFTRAG:

TEIL A — der Massen-Eingriff in die Daten
Ein Skript hat Schlüssel der Form `ageAdjustN` umbenannt und aus den zugehörigen
Texten ein Präfix entfernt. Die Begründung steht im Diff. Prüfe sie nicht,
sondern das Ergebnis:
 1. Ist bei irgendeinem Text durch das Entfernen des Präfixes Bedeutung
    verlorengegangen — eine Einschränkung, ein Vorbehalt, ein Bezug?
 2. Gibt es Texte, die jetzt ohne ihren Kontext falsch oder gefährlich sind?
    Sicherheitszeilen zuerst.
 3. Ist die neue Schlüsselzahl in jedem Fall die richtige? Konstruier einen
    Fall, in dem das Skript falsch geraten hat.
 4. `ageAdjustFor()` im Kern wählt die größte Stufe ≤ Alter. Geh alle Alter
    3 bis 12 gegen die drei ritter-Dateien durch: bekommt jedes Alter den Rat,
    der für es gedacht ist? Wo nicht — welches Kind bekommt welchen falschen?
 5. Fünf Fälle wurden von Hand nachgezogen (im Diff sichtbar). Lesen die sich
    noch richtig, oder klingt der Rest nach dem entfernten Präfix schief?

TEIL B — was hat der Änderungssatz sonst kaputt gemacht?
 1. Eine Funktion in der Vorlage ersetzt eine Zahl in einem Text, aber nur
    unter Bedingungen. Konstruier Eingaben, bei denen sie das Falsche tut —
    oder bei denen sie zu Recht nichts tut, obwohl der Nutzer eine Ersetzung
    erwartet. Die realen Texte stehen in den Motto-Dateien unter `costContext`.
 2. Die Vorlage wird von sechs Mottos geteilt. Welche Änderung ist für ritter
    richtig und für ein anderes Motto falsch?
 3. Rendert das Paket in allen drei Altersgruppen und allen drei Varianten
    ohne Verlust? Vergleiche, was ein Käufer vorher und nachher gedruckt
    bekommt — ist irgendwo etwas verschwunden, das er bezahlt hat?

TEIL C — die Prüfskripte
Vier vorhandene Skripte wurden geändert, eines ist neu. Alle sollen
Fehlerklassen fangen, damit kein Gutachter sie zweimal findet. Je Skript:
  a) Konstruier einen Fall, der durchrutscht. Wenn du keinen findest, sag das.
  b) Erzeugt es Fehlalarme, die jemanden zum Abschalten bringen?
  c) Drei der vier Änderungen machen ein Skript TOLERANTER. Welcher echte
     Fehler rutscht dadurch neu durch?
  d) Das neue Skript prüft eine Zahl gegen einen Text. Lässt es sich
     austricksen — durch Umformulieren statt Reparieren?

TEIL D — was ist am Produkt noch offen?
Unabhängig vom Diff. Rechne die Zeiten, zähle die Mengen gegen die Gästezahl,
lies eine Vorlese-Karte so, wie ein Elternteil sie einem Kind vorliest.

WAS KEIN FUND IST — bitte nicht melden:
 * Männliche Formulierungen. Bewusste Entscheidung, kein Gender-Thema.
 * Text in Code-Kommentaren. Wird nicht gedruckt.
 * Der Possessiv-Apostroph nach Zischlaut („Mats' Urkunde").
 * Alles, was in OFFENE-REVIEW-PUNKTE.md als verworfen steht.
 * Dass Spielpläne ihr Zeitfenster überziehen und Spiele in einer Reserve
   landen — das ist bekannt, gemessen und eine offene Produktentscheidung.

WIE DU BERICHTEST:
 * Je Fund ein WÖRTLICHES ZITAT aus der Datei plus Dateiname, wo möglich
   Zeilennummer. Hol das Zitat aus der Datei, nicht aus dem Gedächtnis und
   nicht aus einem Geschwister-Paket.
 * MAJOR (kostet Geld, Zeit, Sicherheit oder Vertrauen) / MINOR (Politur) /
   UNSICHER (Vermutung ohne Beleg). UNSICHER ist respektabel — eine
   erfundene Belegstelle nicht.
 * Bei Rechen-Fragen: zeig die Rechnung.
 * Am Ende ein Score 0-100 für die Auslieferungsreife, ein Satz Begründung,
   plus die zwei Funde, die du zuerst behoben sehen willst.

Fang mit dem Diff an, nicht mit einer Einschätzung.
