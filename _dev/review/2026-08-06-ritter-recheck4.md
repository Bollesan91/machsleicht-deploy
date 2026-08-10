Du bist unabhängiger Gutachter. Vor dir liegt ein Änderungssatz an einem Druckprodukt, das Eltern kaufen: 69 Dateien, +3353/−974 Zeilen. Er enthält zwei Massen-Eingriffe und eine Umkehrung der Zuständigkeit. Genau solche Sätze brechen Dinge an Stellen, an die niemand gedacht hat — dorthin will ich, dass du schaust.

WAS DAS PRODUKT IST
Ein „Ritter-Komplettpaket": eine HTML-Datei, die 21 Blätter im A4-Format rendert. Eltern öffnen sie, drucken sie aus und führen damit einen Kindergeburtstag durch — Ablaufplan, Einkaufsliste, Spielkarten zum Vorlesen, Schatzsuche, Urkunden, Einladungen, Tischkarten. Wer es kauft, druckt es und richtet danach eine echte Party aus.

Maschinell erzeugt: eine gemeinsame Vorlage (`paket/_maschine/template.html`) plus eine Wortliste je Motto. SECHS Mottos teilen sich die Vorlage — eine Änderung dort steht sechsmal in der Welt. Die Inhalte (Spiele, Sicherheitsregeln, Altersanpassungen) liegen in 45 Motto-Dateien unter `data/motto/`, je Motto eine für klein (3-5), mittel (6-8), gross (9-12). Daneben gibt es öffentliche SEO-Seiten unter `kindergeburtstag/` mit JSON-LD.

DIE DREI TEILE DES ÄNDERUNGSSATZES
 A) Ein Sprach-Sweep über 39 Dateien: Doppelpunkt- und Stern-Genderformen
    ("Ritter:innen", "Erwachsene*r") wurden durch maskuline Formen ersetzt.
    759 Stellen. Betroffen sind auch Live-SEO-Seiten und JSON-LD.
 B) Eine Umkehrung: Die Anzahl der Stempel-Stationen im Abschluss-Ritual wurde
    bisher im Datentext behauptet ("5 Stempel-Felder"). Jetzt rechnet der
    Renderer sie aus dem Ablaufplan. Feste Nummern in den Spielschritten
    ("Alle bekommen Stempel 3") sind entfernt.
 C) Fünf Einzelreparaturen plus zwei neue Prüfskripte.

DAS PRÜFOBJEKT — hol es dir selbst, alles ist öffentlich lesbar:

  Code (Vorlage, Kern, Prüfskripte, Linter):
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/238cdb89/_dev/review/2026-08-06-r4-code.patch

  Daten ritter (alle drei Gruppen + Schatzsuche):
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/238cdb89/_dev/review/2026-08-06-r4-ritter-daten.patch

  Sprach-Sweep, Stichprobe (eine Datendatei + eine Live-Seite mit JSON-LD;
  die übrigen 37 folgen demselben Muster — prüf das Muster):
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/238cdb89/_dev/review/2026-08-06-r4-gender-stichprobe.patch

  Der Stand NACH den Änderungen:
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/238cdb89/paket/ritter/index.html
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/238cdb89/paket/_maschine/template.html
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/238cdb89/paket/core/paket-core.js
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/238cdb89/data/motto/ritter-mittel.json
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/238cdb89/data/motto/ritter-klein.json
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/238cdb89/data/motto/ritter-gross.json
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/238cdb89/data/schatzsuche.json
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/238cdb89/paket/piraten/index.html
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/238cdb89/kindergeburtstag/ritter.html

  Verworfene Befunde früherer Runden — respektieren, nicht neu melden:
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/238cdb89/_dev/OFFENE-REVIEW-PUNKTE.md

DIE BEISPIEL-PARTY (`?demo=1`): Tino, 8 Jahre, Gruppe 6-8, Variante „standard",
Samstag 12.09.2026, 14:00–17:00, Burgweg 7, 21075 Hamburg. Zusagen: Emma
(Erdnuss, Abholung Papa Jens 17:00), Mats, Lina (Laktose, Oma Ruth 16:30),
Noah, Ida — Ben hat abgesagt. `?demo=1&age=4` lädt klein, `&age=11` gross.

DEIN AUFTRAG:

TEIL A — der Sprach-Sweep (759 Stellen)
 1. GRAMMATIK: Aus "X:innen" wurde eine maskuline Form. Steht sie überall im
    richtigen Fall? Suche gezielt Dativ und Genitiv — "zu den Hütern", "mit
    den Rittern", "der Bauarbeiter Werkzeug". Eine flache Ersetzung erzeugt
    dort "zu den Hüter". Nenne jede Fundstelle wörtlich.
 2. SINN: Ist irgendwo ein Wort entstanden, das es nicht gibt, oder eines,
    das etwas anderes bedeutet als vorher?
 3. SEO: Der Sweep hat Live-Seiten angefasst, samt `<title>`, Meta-Description
    und JSON-LD-Feldern. Sind Strukturdaten noch valide? Ist ein Seitentitel
    entstanden, der nicht mehr zum Inhalt passt?
 4. VOLLSTÄNDIGKEIT: Wurde eine Quelle vergessen, aus der die Formen
    zurückkommen können, wenn ein Generator läuft?

TEIL B — die Umkehrung beim Ritual
 1. Der Renderer zählt jetzt die geplanten Stationen. Zählt er das Richtige?
    Rechne für alle drei Altersgruppen und alle drei Varianten nach: was steht
    im Ablaufplan, was in der Reserve, welche Zahl wird gedruckt?
 2. Gibt es einen Fall, in dem die gedruckte Zahl 0 ist oder der Block
    verschwindet, obwohl das Ritual stattfindet?
 3. Widerspricht jetzt noch irgendein Text der gerechneten Zahl — Einkaufs-
    liste, Countdown, Urkunde, Material-Notiz, Vorbereitungs-Prosa?
 4. Die Änderung sitzt in der geteilten Vorlage. Was macht sie in einem Motto,
    das gar kein Stempel-Ritual hat?

TEIL C — die fünf Einzelreparaturen und die Prüfskripte
 1. Eine Sicherheitszeile wurde aus einer unterdrückten Altersstaffel in die
    immer gedruckte Sicherheitsregel gezogen. Ist dabei etwas verlorengegangen
    oder doppelt geworden? Gibt es weitere Sicherheitsinhalte, die noch in
    unterdrückten Staffeln liegen?
 2. Zwei neue Prüfskripte liegen im Diff. Je Skript: konstruier einen Fall,
    der durchrutscht. Erzeugt es Fehlalarme? Eines von beiden prüft eine
    Text-Eigenschaft — lässt es sich durch Umformulieren austricksen?
 3. Ein Paket wurde nach langer Zeit erstmals wieder aus der Vorlage erzeugt.
    Vergleiche es mit einem Geschwister-Paket: fehlt ihm etwas, hat es etwas
    zu viel, ist etwas Motto-Fremdes hineingeraten?

TEIL D — was ist am Produkt noch offen?
Unabhängig vom Diff. Rechne die Zeiten, zähle die Mengen gegen die Gästezahl,
lies eine Vorlese-Karte so, wie ein Elternteil sie einem Kind vorliest.

WAS KEIN FUND IST — bitte nicht melden:
 * Maskuline Formen als solche. Das ist eine bewusste Entscheidung des
   Auftraggebers, kein Versehen — Teil A fragt nach GRAMMATIK und SINN, nicht
   danach, ob gegendert werden sollte.
 * Ausgeschriebene Paarformen ("Knappen und Knappinnen"). Bewusst gesetzt.
 * Text in Code-Kommentaren. Wird nicht gedruckt.
 * Der Possessiv-Apostroph nach Zischlaut („Mats' Urkunde").
 * Dass Spielpläne ihr Zeitfenster überziehen und Spiele in einer Reserve
   landen — bekannt, gemessen, offene Produktentscheidung.
 * Alles, was in OFFENE-REVIEW-PUNKTE.md als verworfen steht.

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

Fang mit den Diffs an, nicht mit einer Einschätzung.
