Du bist unabhängiger Gutachter für ein FERTIGES PRODUKT (kein Diff, keine Diff-Archäologie). Prüfobjekt: das Baustellen-Komplettpaket (Druckprodukt, 20 €) und die drei kostenlosen Planerseiten desselben Mottos. Beide werden maschinell aus einer Datenquelle erzeugt. Bewerte ausschließlich, was heute beim Kunden ankommt.

WAS DER KUNDE BEKOMMT
Ein Elternteil plant im Planer, wählt Motto Baustelle, Altersgruppe (3-5 / 6-8 / 9-12) und eine von drei Varianten (minimal / standard / wow) und druckt ein Dossier: Ablaufplan, Countdown, Einkauf & Menü, Deko & Kuchen, Spielkarten mit Vorlesetext, Stationskarten, SOS-Karten, Urkunden, Tischkarten, Küchen-Zettel, Einladungen, Eltern-Handzettel, Danke-Blatt, Bautagebuch. Die freien Planerseiten sind das kostenlose Gegenstück im Web.

PRÜFOBJEKT (SHA f744cbb59dbb9fe8d8c26bed982abcba7f1257a8)
  Paket-Renderer:  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/f744cbb59dbb9fe8d8c26bed982abcba7f1257a8/paket/baustelle/index.html
  Paket-Kern:      https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/f744cbb59dbb9fe8d8c26bed982abcba7f1257a8/paket/core/paket-core.js
  Daten:           https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/f744cbb59dbb9fe8d8c26bed982abcba7f1257a8/data/motto/baustelle-klein.json
                   https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/f744cbb59dbb9fe8d8c26bed982abcba7f1257a8/data/motto/baustelle-mittel.json
                   https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/f744cbb59dbb9fe8d8c26bed982abcba7f1257a8/data/motto/baustelle-gross.json
  Freie Seiten:    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/f744cbb59dbb9fe8d8c26bed982abcba7f1257a8/kindergeburtstag/baustelle-3-5-jahre.html
                   https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/f744cbb59dbb9fe8d8c26bed982abcba7f1257a8/kindergeburtstag/baustelle-6-8-jahre.html
                   https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/f744cbb59dbb9fe8d8c26bed982abcba7f1257a8/kindergeburtstag/baustelle-9-12-jahre.html
  Planer-Katalog:  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/f744cbb59dbb9fe8d8c26bed982abcba7f1257a8/_src/elite-motto-data/baustelle-gross.json
  Gates (Kontext): https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/f744cbb59dbb9fe8d8c26bed982abcba7f1257a8/_dev/scripts/check-feldkonsistenz.py
                   https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/f744cbb59dbb9fe8d8c26bed982abcba7f1257a8/_dev/scripts/check-mengen-kinderzahl.py
                   https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/f744cbb59dbb9fe8d8c26bed982abcba7f1257a8/_dev/scripts/check-fenster-deckung.py
  False-Positives: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/f744cbb59dbb9fe8d8c26bed982abcba7f1257a8/OFFENE-REVIEW-PUNKTE.md

WAS SEIT DEM LETZTEN GUTACHTEN BEHAUPTET WIRD (prüfe jede Behauptung am Ergebnis, nicht am Versprechen)
B1 Mengen decken die Kinderzahl: Wo eine Karte etwas PRO KIND verspricht, reicht die genannte Gesamtmenge für die Kinderzahl der Variante (steht im timeWindow). Ein Gate rechnet das nach.
B2 Varianten-Scope ist ein Datenfeld (`abVariante`) an SOS-Szenarien, einzelnen Steps und Teilen der materialNote. Das Paket FILTERT danach — ein minimal-Käufer sieht Wow-Inhalte gar nicht; die freie Seite zeigt alles und kennzeichnet es im Text. Unbekannte Werte werden gegatet (früher fail-open).
B3 Zählungen sind Platzhalter (`{n:quizCards}` usw.), aufgelöst aus der Array-Länge DERSELBEN Spielkarte. Getippte Zählungen, Platzhalter außerhalb einer Karte und Platzhalter mit Bezug auf ein fremdes Feld werden gegatet.
B4 Jede Variante trägt ihr Programm: ein Gate rechnet Fensterlänge gegen Ritual + Mindest-Essen + Spiele. klein/minimal wurde deshalb von 90 Minuten auf 2 Stunden korrigiert.
B5 Eine Wahrheit über beide Kanäle: Party-Länge (Label, Zeitfenster, Headline) und die redaktionellen Felder kommen für Paket UND freie Seite aus derselben Datei; zählbare Größen des Planer-Katalogs werden gegen die Paket-Wahrheit gegatet. Die SPIEL-LISTEN dürfen weiter abweichen (eigener Planer-Pool, bekanntes Ticket).

PRÜFWINKEL (alles am Kunden-Ergebnis, in dieser Reihenfolge)
A1 — Feiert das Kind? Geh die 9 Ausprägungen (3 Altersgruppen × 3 Varianten) durch und lies je Ausprägung den Ablaufplan mit den zugehörigen Spielkarten wie ein Elternteil, das den Tag durchführt. Kippt irgendwo die Durchführbarkeit: zu wenig Zeit, zwei Spiele brauchen dieselbe Person, Material fehlt, ein Spiel ist für 4-Jährige zu schwer oder für 11-Jährige zu banal? Kapiert ein Kind in 5 Sekunden, was es tun soll?
A2 — Stimmt jede Zahl mit der Wirklichkeit? Rechne nach: Stückzahlen gegen Kinderzahl, Zeiten gegen das Zeitfenster, Preise gegen die Summe, Kartenzahlen gegen die Daten. Nenne jede Stelle, an der der Käufer zu wenig einkauft oder zu viel bezahlt.
A3 — Sicherheit: Ist jede Regel für die Altersgruppe richtig, vollständig und dort, wo sie gebraucht wird (nicht nur im FAQ)? Besonders 3-5: Verschluck-Größen, Sand, Werkzeug, Höhe.
A4 — Halten B1-B5 am Ergebnis? Belege jede Antwort mit Zitat + Datei. Widersprechen sich freie Seite und Paket irgendwo in einer Aussage, die beide treffen?
A5 — Adversarial gegen die Maschine: Konstruiere Datenstände, bei denen die Mechaniken (Platzhalter, Scope-Filter, Ein-Quelle-Felder, die drei Zahlen-Gates) FALSCH liefern oder still danebengreifen. Sag zu jedem, ob er heute existiert oder nur möglich ist. Lies dazu die verlinkten Gate-Skripte und suche ihre blinden Flecken.

NICHT PRÜFEN (bewusste, terminierte Tickets): kostenKontext-Skalierung · estimatedCostEur gross/wow · Vereinigung des Planer-Spielkatalogs mit data/motto · Schatzsuche/Stationen abgeschaltet · _bundle.js · ritter/pferde-Seiten.

PFLICHTEN: Je Finding wörtliches Zitat + Datei + Einstufung MAJOR / MINOR / UNSICHER. MAJOR nur, wenn es beim Kunden gedruckt oder angezeigt wird und ihm schadet (Sicherheit, Geld, Party fällt auseinander, Rechtstext fehlt). Falsch-Positive-Liste respektieren. Score 0-100 für das Produkt, wie es heute ist. Abschluss: „REVIEW ABGESCHLOSSEN".
