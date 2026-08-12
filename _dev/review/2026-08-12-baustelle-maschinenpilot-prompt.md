Du bist unabhängiger Gutachter für ein FERTIGES PRODUKT (kein Diff). Prüfobjekt: das Baustellen-Komplettpaket (Druckprodukt, 20 €) und die drei kostenlosen Planerseiten desselben Mottos. Beide werden seit dem 11./12.08. maschinell aus EINER Datenquelle erzeugt; dieser Pilot entscheidet, ob die Maschine liefert. Frühere Runden dieses Mottos wurden als Handarbeit begutachtet und pendelten zwischen 38 und 74 Punkten — bewerte deshalb NICHT den Weg hierher, sondern ausschließlich das, was heute beim Kunden ankommt.

WAS DER KUNDE BEKOMMT
Ein Elternteil plant den Kindergeburtstag im Planer, wählt Motto Baustelle, Altersgruppe (3-5 / 6-8 / 9-12) und eine von drei Varianten (minimal / standard / wow), und druckt daraufhin ein Dossier: Ablaufplan, Countdown, Einkauf & Menü, Deko & Kuchen, Spielkarten (eine je Spiel, mit Vorlesetext), Stationskarten, SOS-Karten, Urkunden, Tischkarten, Küchen-Zettel, Einladungen, Eltern-Handzettel, Danke-Blatt, Bautagebuch. Die freien Planerseiten sind das kostenlose Gegenstück im Web.

MASCHINEN-VERTRAG (so ist es GEBAUT — prüfe, ob er hält)
V1 Eine Quelle: die redaktionellen Felder (faq, parentTips, preparationWeeks, sosScenarios, signatureRitual) leben ausschließlich in data/motto/baustelle-*.json. Der Seiten-Generator lädt sie von dort; das Planer-Overlay (_src/elite-motto-data) trägt nur noch Intro/Meta/eigene Bonus-Spiele.
V2 Varianten-Scope ist ein Datenfeld: `abVariante: "standard"|"wow"` an SOS-Szenarien und einzelnen Steps. Das PAKET filtert danach (ein minimal-Käufer sieht wow-Inhalte gar nicht), die freie Planerseite zeigt alles und kennzeichnet es im Text.
V3 Zählungen sind Platzhalter: `{n:quizCards}`, `{n:verdaechtige}`, `{n:spuren}`, `{n:schritte}` werden beim Laden aus der echten Array-Länge DERSELBEN Spielkarte aufgelöst. Getippte Zahlen dieser Klasse sind verboten (Linter-Stufe 34).
V4 Kanaltrennung: Paket-Verweise („Teil I/II/III", „Spielkarte") werden für die freien Seiten übersetzt; jede Seite trägt den Rechtsfooter (Stufe 35).

PRÜFOBJEKT (SHA {SHA})
  Paket-Renderer:  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/paket/baustelle/index.html
  Paket-Kern:      https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/paket/core/paket-core.js
  Daten:           https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/data/motto/baustelle-klein.json
                   https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/data/motto/baustelle-mittel.json
                   https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/data/motto/baustelle-gross.json
  Freie Seiten:    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/kindergeburtstag/baustelle-3-5-jahre.html
                   https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/kindergeburtstag/baustelle-6-8-jahre.html
                   https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/kindergeburtstag/baustelle-9-12-jahre.html
  Gates (Kontext): https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/_dev/scripts/check-feldkonsistenz.py
                   https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/_dev/scripts/check-planer-kanal.py
  False-Positives: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/OFFENE-REVIEW-PUNKTE.md

PRÜFWINKEL (in dieser Reihenfolge, alles am Kunden-Ergebnis)
A1 — Feiert das Kind? Nimm die 9 Ausprägungen (3 Altersgruppen × 3 Varianten) und lies je Ausprägung den Ablaufplan mit den zugehörigen Spielkarten wie ein Elternteil, das den Tag durchführt. Kippt irgendwo die Durchführbarkeit: zu wenig Zeit, zwei Spiele brauchen dieselbe Person, Material fehlt, ein Spiel ist für 4-Jährige zu schwer oder für 11-Jährige zu banal? Kapiert ein Kind in 5 Sekunden, was es tun soll (Vorlesetext + erste Handlung)?
A2 — Stimmt jede Zahl mit der Wirklichkeit? Rechne nach: Stückzahlen gegen Kinderzahl der Variante (timeWindow nennt sie), Zeiten gegen das Zeitfenster, Preise gegen die Summe, Kartenzahlen gegen die Daten. Nenne jede Stelle, an der der Käufer zu wenig einkauft oder zu viel bezahlt.
A3 — Sicherheit: Ist jede Regel für die Altersgruppe richtig, vollständig und an der Stelle, wo sie gebraucht wird (nicht nur im FAQ)? Besonders 3-5: Verschluck-Größen, Sand, Werkzeug, Höhe.
A4 — Hält der Maschinen-Vertrag? V1: Widersprechen sich freie Seite und Paket in einer Aussage, die beide treffen? V2: Bekommt der minimal- oder standard-Käufer irgendwo Wow-Inhalt (oder fehlt dem wow-Käufer etwas)? V3: Steht irgendwo noch eine getippte Zählung, oder ein roher Platzhalter `{n:...}`? V4: Paket-Verweise oder fehlender Rechtsfooter auf den freien Seiten? Belege jede Antwort mit Zitat + Datei.
A5 — Adversarial gegen die Maschine: Konstruiere einen Datenstand, bei dem die neuen Mechaniken FALSCH liefern — z. B. ein Text mit Platzhalter außerhalb einer Spielkarte, ein SOS-Step ohne abVariante in einem wow-only-Szenario, eine Zählung, die sich auf eine ANDERE Karte bezieht als die, in der sie steht. Sag, ob dieser Datenstand heute existiert oder nur möglich ist.

NICHT PRÜFEN (bewusste offene Tickets): kostenKontext-Skalierung · estimatedCostEur gross/wow · Vereinigung des Planer-Spielkatalogs mit data/motto (die freien Seiten haben weiterhin einen eigenen Spielpool — das ist bekannt und terminiert) · Schatzsuche/Stationen sind abgeschaltet · _bundle.js · ritter/pferde-Seiten.

PFLICHTEN: Je Finding wörtliches Zitat + Datei + Einstufung MAJOR / MINOR / UNSICHER. MAJOR nur, wenn es beim Kunden gedruckt oder angezeigt wird und ihm schadet (Sicherheit, Geld, Party fällt auseinander, Rechtstext fehlt). Falsch-Positive-Liste respektieren. Score 0-100 für das Produkt, wie es heute ist. Abschluss: „REVIEW ABGESCHLOSSEN".
