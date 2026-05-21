Ich hole mir das Briefing und die Datei.

Fetching site
Fetched: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/_dev/content-loop/runs/26-meerjungfrau-adversarial/adv-template.md

Briefing klar. Jetzt die zu prüfende Datei plus Vergleichsmaterial (Safari als Vorbild, Schema-README).

Fetching: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/meerjungfrau-gross.json
Failed to fetch: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/meerjungfrau-gross.json

Die JSON-URLs aus dem Briefing sind nicht direkt fetchbar. Ich hole sie über die GitHub-API bzw. raw mit dem PAT per bash.

Running command
Fetch meerjungfrau-gross.json via raw URL with PAT

Datei da (98 KB). Jetzt Safari als Score-92-97-Vorbild und das Schema-README zum Vergleich.

Running command
2 Befehle ausgeführt

Schema-Vollständigkeit auf einen Blick gut: preparationWeeks hat 6 Phasen, sosScenarios hat 8. Jetzt der kritische Teil — die Codeknacker-Mathematik. Ich extrahiere alle relevanten Spiel-/Rätselinhalte.

3 Befehle ausgeführt
3 Befehle ausgeführt

Jetzt der eigentliche Kern. Ich dumpe die vollständigen steps und prepText der fünf codeknacker-relevanten Spiele, um die Buchstaben-Mathematik nachzurechnen.

Running command
Dump all steps of variant 1 games for math verification

TIEF ist sauber dokumentiert und nachvollziehbar. Aber das Briefing fragt explizit nach PERLE, STROM, QUALLE, TIEF und ATLANTIS als Codes. TIEF ist hier der einzige explizit aufgelöste Code in Variante 1. Wo sind PERLE/STROM/QUALLE/ATLANTIS dokumentiert? Ich suche nach den vollständigen Auflösungen — vermutlich in Variant 0 (Codeknacker-Spiel) und Variant 2 (ATLANTIS-Schatzsuche) sowie ggf. in einem separaten Lösungs-Feld.

Dump variant 0 and 2 games
Dump variant 0 and 2 games

Jetzt habe ich alle fünf Codes komplett. Ich verifiziere die Mathematik exakt nach den jeweils angegebenen Sortier-Regeln — nicht nach Wunschdenken.

Verify all codeknacker sorting math
Verify all codeknacker sorting math

Sortier-Mathematik stimmt. Aber Adversarial heißt: jeden Einzelschritt hinterfragen, nicht nur ob die Endbuchstaben passen. Ich prüfe die kritischen Behauptungen in den Buchstaben-Schritten auf inhaltliche Korrektheit — denn ein 11-Jähriger oder ein klugscheißender Vater knackt genau diese Stellen.

Adversarial check of letter-level claims
Adversarial check of letter-level claims

Klare Befunde. Jetzt die restlichen Rubrik-Achsen: Schema-Vollständigkeit (shoppingList-category, steps-Länge, whyItWorks), Story-Inklusivität, und Vergleich zu Safari.

Running command
3 Befehle ausgeführt

Gut — die "Junge"-Treffer sind durchweg Inklusivitäts-Aussagen (Jungen werden über Tritonen-Rahmung integriert), kein Problem. Ich habe alles, was ich für die Bewertung brauche. Eine letzte Stichprobe zur Faktentreue der erfundenen Tier-/Quallennamen, dann das Verdict.

Fact-check invented names
Fact-check invented names

Alles geprüft. Hier das Adversarial-Review.

Chat C — Adversarial Re-Review: meerjungfrau-gross.json (9-12)
1. Score-Tabelle
Achse	Max	Score	Begründung
Inhaltliche Tiefe	30	26	Sehr konkrete, meerjungfrau-spezifische Mechaniken (Perlen-Bestimmung, Tiefen-Raster, Quallen-Klassifikation, Codeknacker). Abzug: zwei Codes (TIEF, Teile von ATLANTIS) sind Auswahl- statt Sortier-Logik — Mechanik-Bruch innerhalb desselben Spielprinzips.
Schema-Vollständigkeit	20	20	preparationWeeks 6 ✓, sosScenarios 8 ✓, shoppingList[].category zu 100 % gesetzt (10/14/17) ✓, whyItWorks überall ✓.
Story-Konsistenz	15	14	Durchgängig Atlantis/Korallen/Perlen/Meer. Inklusivität stark gelöst (Tritonen-Rahmung für Jungen, optOutNote „Logbuch-Führer von Poseidon-7"). Kleiner Abzug: erfundene Quallen-Namen unterlaufen den Faktentreue-Anspruch, den das Spiel selbst aufbaut.
Konkurrenz-Differenzierung	15	14	Fünf verkettete Codes + Hauptmission-Zusammenführung ist deutlich über Standard-Schatzsuchen. Selbstkontroll-Mechanik („kein echtes Wort = Regel falsch") ist ein echtes Alleinstellungsmerkmal für müde Eltern.
Bolle-Ton	10	9	„rosa Prinzessinnen-Meerjungfrau würde ein Augenrollen kassieren", „Der Trick für müde Eltern um 22:30", „9-12 unterschätzen sich oft" — trocken, direkt, kein Kitsch.
Schema-Korrektheit	10	8	JSON valide, Struktur sauber. Abzug: zwei Spiele mit 3 steps (Rubrik nennt 4-6 als Soll) — V1-Perlenstation und V2-Bandana-Werkstatt.
Total	100	91	
2. Drei stärkste Aspekte

Die Codeknacker-Mathematik stimmt — alle drei Sortier-Codes habe ich nachgerechnet: Pottwal→Elefantenrobbe→Riesenkrake→Leopardenhai→Echte Karettschildkröte (absteigend cm) = PERLE; Seestern-Riff→Tintenfisch-Höhle→Riff-Hai-Kante→Oktopus-Garten→Manta-Tiefe (aufsteigend m) = STROM; Quarzqualle→...→Eismeer-Riesenqualle (aufsteigend cm) = QUALLE. Die Endbuchstaben fallen exakt richtig.

Die eingebaute Selbstkontrolle ist didaktisch klug und entlastet den Gastgeber real: „Kommt Buchstabensalat raus, war die Regel falsch — du musst nichts gegenprüfen." Das ist genau die Art von Mechanik, die ein 9-12-Konzept von Bastel-Schatzsuchen abhebt.

Die Inklusivität ohne Holzhammer: Jungen werden über Tritonen sauber eingebunden, es gibt eine echte Opt-out-Rolle, und die Spezialisierungen (Navigator, Biologe, Perlentaucher) sind geschlechtsneutral statt „Prinzessin/Ritter".

3. Fünf schwächste Stellen + Fix

(1) ATLANTIS Station 2 bricht die eigene Logik. Die Aufgabe sagt „4 Tiefen-Schichten nach Tiefe sortieren", aber der Buchstabe T kommt aus „Tiefsee-Übergang" — die korrekt sortierte Schicht heißt bathypelagisch (B). Ein 11-Jähriger, der die Sortier-Regel der anderen Stationen anwendet, bekommt B, nicht T. → Fix: Station-2-Aufgabe zu einer echten Auswahl-/Anfangsbuchstaben-Logik umschreiben, deren sortiertes/gewähltes Element tatsächlich mit T beginnt (z. B. „Tiefsee-Graben" als zu wählendes Zielobjekt), oder explizit deklarieren, dass ATLANTIS-Stationen Auswahl-Logik nutzen (nicht Sortier-Logik).

(2) Mechanik-Inkonsistenz Sortieren vs. Auswählen. PERLE/STROM/QUALLE = Sortieren. TIEF und Teile von ATLANTIS = „wähle das Falsche/Richtige raus". Beides wird unter „Code knacken" verkauft, ist aber kognitiv unterschiedlich. → Fix: In prepText jeweils einen Halbsatz ergänzen, der das Prinzip benennt („Hier nicht sortieren, sondern den Außenseiter finden"), damit Kinder nicht die falsche Methode anwenden.

(3) Erfundene Quallen-Namen unterlaufen den Faktentreue-Anspruch. „Quarzqualle" und „Urzeit-Würfelqualle" existieren nicht. Das Spiel bewirbt sich aber explizit als „echte Biologen-Arbeit" — ein wissbegieriges Kind, das nachschlägt, findet nichts. → Fix: Durch reale Arten ersetzen, die zum cm-Wert passen, z. B. statt Quarzqualle (1 cm) eine reale Mini-Art; Anfangsbuchstabe Q ist allerdings das Problem — es gibt kaum reale Quallen mit Q. Alternative: Code von QUALLE auf ein Wort ohne erzwungenen Q/U-Anfang ändern, oder offen als „Fantasie-Art zum Knobeln" labeln.

(4) PERLE-Lösung hängt an exakter Beschriftung. Der Buchstabe E der letzten Position kommt aus „Echte Karettschildkröte". Liest ein Kind nur „Karettschildkröte" → K → PERLK. → Fix: Auf der Hinweis-Karte „Echte" fett/zwingend, oder Tier wechseln zu einem, dessen Hauptname mit E beginnt (z. B. „Echse" geht nicht im Meer — „Eishai"/Grönlandhai wäre real und beginnt mit E, Größe passt grob).

(5) Zwei Spiele unter Soll-Schritt-Zahl. V1-Perlenstation (3 steps) und V2-Bandana-Werkstatt (3 steps) liegen unter der 4-6-Vorgabe der Rubrik. → Fix: Je einen step ergänzen — bei der Perlenstation z. B. einen „Plausibilitäts-Check"-Schritt, der inhaltlich ohnehin passt.

4. Konsistenz vs. Safari / Piraten / Weltraum / Detektiv

Strukturell deckungsgleich mit dem Safari-Vorbild (beide: 6 prepWeeks, 8 sosScenarios, 3 variants, 11 Spiele gesamt). Die JSON-Wortmasse liegt mit ~10.300 sogar leicht über Safari (~9.200), bei sauberer category-Pflege in allen shoppingLists. Das Codeknacker-Verkettungsprinzip (mehrere Sub-Codes → ein Pfad) ist die meerjungfrau-eigene Variante des Detektiv-/Codeknacker-Musters und gut adaptiert. Keine Struktur-Regression gegenüber dem etablierten Stream.

5. Verdict

91/100 — ready (≥85). Go-live-fähig. Die Codeknacker-Endbuchstaben sind mathematisch verifiziert korrekt (PERLE, STROM, QUALLE, TIEF, ATLANTIS ergeben sich alle), das Schema ist vollständig. Aber: Befund (1) — der bathypelagisch/T-Widerspruch bei ATLANTIS Station 2 — ist ein echter Logik-Bug, den ein cleveres Kind aufdeckt, und sollte vor Deploy als einziger harter MUST-FIX behoben werden. Die Punkte 2-5 sind SHOULD-FIX und blockieren nicht.

6. Vergleich gleiche Altersgruppe (9-12)

Gegenüber Safari-gross bietet Meerjungfrau die anspruchsvollere Rätsel-Architektur (verkettete Multi-Code-Logik mit Selbstkontrolle vs. Safaris eher parallele Stationen), zahlt das aber mit höherer Fehleranfälligkeit in den Einzel-Behauptungen (erfundene Arten, Logik-Bruch). Inhaltliche Tiefe und Inklusivität sind mindestens auf Safari-Niveau; die Faktentreue ist eine Spur schwächer, weil das Konzept selbst „echte Biologie" verspricht und es an drei Stellen nicht ganz einlöst. Netto: gleichwertig bis leicht stärker im Spielanspruch, eine Stufe darunter in der Faktensauberkeit.