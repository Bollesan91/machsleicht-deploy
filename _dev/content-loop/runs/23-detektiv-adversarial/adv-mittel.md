Ich lade das Briefing.

Fetching site
Fetched: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/_dev/content-loop/runs/23-detektiv-adversarial/adv-template.md

Stream B. Ich ziehe das Prüfobjekt plus die Vergleichsmaterialien.

Fetching site
Failed to fetch: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/detektiv-mittel.json

Die URL stand im Briefing, aber web_fetch akzeptiert sie nicht. Ich hole sie über die API.

Running command
Detektiv-mittel + Vergleichs-JSONs ziehen

Alles da. Schema-README dazu, dann valides JSON prüfen.

Running command
2 Befehle ausgeführt

Jetzt analysiere ich detektiv-mittel strukturell und prüfe die im Briefing genannten Phase-B-Felder.

Top-Level + Phase-B-Felder prüfen
Top-Level + Phase-B-Felder prüfen

Phase-B-Felder sind als Objekte (keys) statt Arrays gefüllt. Briefing erwartet preparationWeeks 6 und sosScenarios 8. Ich zähle.

PreparationWeeks + sosScenarios zählen
PreparationWeeks + sosScenarios zählen

preparationWeeks = 6 ✅, sosScenarios = 8 ✅. Jetzt Variants, Games, shoppingList[].category, whyItWorks.

Variants, Games, steps, whyItWorks, category prüfen
Variants, Games, steps, whyItWorks, category prüfen

Auffälligkeiten: savingsTip zeigt überall ❌, und loudness nutzt "leise" statt Schema-Wert "ruhig". Genauer prüfen.

SavingsTip, loudness/effort-Enums, Game-Felder
SavingsTip, loudness/effort-Enums, Game-Felder

Zwei Schema-Verstöße: savingsTip: null in allen 3 Varianten (Schema verlangt {title, body}), und loudness: "leise" (Enum kennt nur ruhig|mittel|laut|sehr_laut). Jetzt der inhaltliche Detektiv-Kern: Codes (JAGD/SPUR-Check aus Briefing), Detektiv-Schwur, Story-Anker.

SignatureRitual + Code/Schwur-Suche
SignatureRitual + Code/Schwur-Suche

Detektiv-Schwur ✅, JAGD/SPUR vorhanden. Jetzt prüfe ich, ob die Codes mathematisch/buchstaben-konsistent aufgehen — der C-Stream-Check, aber auch für B relevant (Briefing B: "leichte Codes echte Wörter"). Ich extrahiere die Code-Spiele.

Code-Spiele im Detail für Lösbarkeits-Check
Code-Spiele im Detail für Lösbarkeits-Check

Hier ein echter Konsistenz-Defekt: SPUR (4 Buchstaben) vs JAGD (4 Buchstaben). Minimal-Variante löst auf SPUR auf. Standard sagt "JAGD oder SPUR", liest dann aber konkret "JAGD". Das ist eine offene Variabilität, die das Kind/die Eltern nicht auflösen können — woher kommen genau die 4 Buchstaben? Ich prüfe, ob das erste Spiel (Spurensuche) die Buchstaben definiert.

Buchstaben-Herkunft im ersten Spiel prüfen
Buchstaben-Herkunft im ersten Spiel prüfen

Das klärt den Mechanik-Defekt: In minimal ist sauber definiert — 4 Karten mit S/P/U/R → SPUR. In standard definiert das erste Spiel (Verdächtigen-Befragung) keine Buchstaben, das Finale sagt aber "Buchstaben aus den Spielen ergeben JAGD oder SPUR". Es ist nirgends festgelegt, welche Spiele die 4 Buchstaben liefern, und das Wort schwankt zwischen JAGD und SPUR. Eltern können das nicht vorbereiten. Das ist die zentrale schwächste Stelle.

Jetzt Bolle-Ton und Vergleich mit Safari/Piraten/Weltraum-mittel (gleiche Altersgruppe).

Quervergleich Detektiv vs Safari/Piraten/Weltraum mittel
Quervergleich Detektiv vs Safari/Piraten/Weltraum mittel

Wichtiger Befund: savingsTip ist auch bei Safari und Weltraum durchgängig null — also kein Detektiv-spezifischer Fehler, sondern ein Schema-README-vs-Realität-Drift im ganzen Korpus. Piraten hat genau eine gesetzt. Das relativiert den savingsTip-Punkt: Es ist ein Korpus-Pattern, kein Detektiv-Versagen. Ich notiere es trotzdem, aber gewichte es schwächer.

Jetzt loudness-Enum bei den Geschwistern checken (ist "leise" ein Detektiv-Bug oder Korpus-Konvention?) und die Bolle-Ton-Stichprobe.

Loudness-Korpus + Bolle-Ton-Stichprobe
Loudness-Korpus + Bolle-Ton-Stichprobe

Klarer Befund zum loudness-Bug: Detektiv ist die einzige Datei, die "leise" verwendet. Safari/Weltraum nutzen korrekt "ruhig", Piraten lässt es null. "leise" ist nicht im Schema-Enum → echter Detektiv-spezifischer Schema-Verstoß (2 Spiele betroffen), bricht den Constraint-Solver-Filter (P3-14). Das ist die Art INSEL-Bug, vor der das Briefing warnt.

Genug Evidenz. Ich habe alles für die 6 Sektionen. Score.

1. Score-Tabelle
Dimension	Max	Score	Begründung
Inhaltliche Tiefe	30	26	Spiele konkret, Schritt-für-Schritt, Detektiv-Mechaniken echt (Lupe/Fingerabdruck/Geheimtinte/Befragung). Abzug: Code-Auflösung in Standard/Wow mechanisch unterspezifiziert (s.u.).
Schema-Vollständigkeit	20	16	prepWeeks 6 ✅, sos 8 ✅, category 32/32 ✅, steps 4–5 ✅, whyItWorks überall ✅. Abzug: savingsTip in allen 3 Varianten null (Schema fordert {title,body}).
Story-Konsistenz	15	13	Detektiv-Anker stark, altersgerecht (Verdächtige harmlos, explizit thematisiert). Abzug: SPUR↔JAGD-Schwanken.
Konkurrenz-Differenzierung	15	14	Detektiv-spezifisch: Schwur+Marke, 6 echte Ermittler-Rollen, Geheimtinte, Fingerabdruck-Labor. Sehr gut.
Bolle-Ton	10	9	Lakonisch, keine Schul-Sprache, konkrete Eltern-Caveats ("statistisch mindestens eins", "kippt die Stimmung sofort").
Schema-Korrektheit	10	7	Valid JSON ✅, motto/ageGroup/ageRange ✅. Abzug: loudness:"leise" × 2 — nicht im Enum (ruhig|mittel|laut|sehr_laut), bricht Constraint-Solver.
Total	100	85	
2. Drei stärkste Aspekte
signatureRitual als Doppel-Anker. Detektiv-Schwur am Anfang + Marken-Übergabe/Diplom am Ende, mit 6 funktionalen Rollen (Spurenleser, Befrager, Code-Knacker, Protokollführer, Karten-Hüter, Beweis-Fotograf). Das ist echte Motto-Identität, nicht Deko-Geschwafel.
Minimal-Variante mechanisch sauber. S/P/U/R auf 4 Karten → eingesammelt → SPUR gelegt → warm/kalt → Kuchen. Geschlossener Loop, den eine Mutter ohne Nachdenken vorbereiten kann.
parentTips treffen den YMYL-Nerv. Allergie-Statistik, "lieber zu leicht als zu schwer", 2er-Teams, zweite Aufsichtsperson bei Wärmequelle (Geheimtinte!) — antizipiert reale Pannen statt Floskeln.
3. Fünf schwächste Stellen + Fix
loudness:"leise" (2 Spiele, standard) — Schema-Verstoß. Einzige Datei im Korpus mit diesem Wert; Safari/Weltraum nutzen "ruhig". Bricht P3-14 Constraint-Solver-Filter still. → Fix: "leise" → "ruhig" in beiden Fingerabdruck-/Geheimtinte-Spielen.
Code-Wort schwankt SPUR↔JAGD ohne Buchstaben-Herkunft (standard/wow). Standard-Finale sagt "JAGD oder SPUR", liest dann "JAGD" — aber kein Spiel davor definiert, welche Spiele die 4 Buchstaben liefern (anders als minimal). Eltern können das nicht vorbereiten. → Fix: In Standard ein Codewort festnageln (JAGD) und in prepText von 2–3 Spielen verankern, welcher Buchstabe wo fällt. "oder SPUR" streichen.
savingsTip: null in allen 3 Varianten. Schema verlangt {title, body}. Caveat: Korpus-weites Pattern (Safari/Weltraum ebenfalls null, Piraten 1×) — also kein Detektiv-Alleingang, aber bei einer YMYL-Elite-Seite ein echter Inhaltsverlust. → Fix: Pro Variante einen konkreten Spar-Tipp (z.B. Lupen aus 1€-Shop statt Set; Fingerabdruck mit Stempelkissen aus Vorrat).
wow-Variante: Tresor-Code "z.B. JAGD oder ein 3-Zahlen-Code". Zwei inkompatible Mechaniken in einem Satz, beide unausgeführt. Für die teuerste Variante (92 €) zu vage. → Fix: Eine Mechanik wählen, durchziehen. 3-Zahlen-Schloss ist für 6–8 oft zu schwer → bei Buchstaben-Wort bleiben.
Minimal hat nur 2 Spiele bei 6 Schedule-Slots. Funktioniert, aber der Puffer hängt an "warm/kalt" als Streckmittel. → Fix: prüfen, ob ein 3. Mini-Element (z.B. Marken-Bastel als Schwur-Teil) den Slot füllt, statt Leerlauf zu riskieren.
4. Story-/Schema-Konsistenz vs. Geschwister

Strukturell deckungsgleich mit Safari/Weltraum/Piraten-mittel: 3 Varianten, 9 Spiele gesamt, prepWeeks 6, sos 8, alle Game-Pflichtfelder vorhanden, category 100 % abgedeckt (besser als die Geschwister teils). Der einzige strukturelle Ausreißer ist loudness:"leise" — ein Detektiv-INSEL-Bug, den Safari/Weltraum nicht haben. savingsTip:null ist dagegen ein geteiltes Korpus-Defizit.

5. Verdict

Score 85 — knapp ready, aber NICHT ohne den loudness-Fix. Die 85 sind grenzwertig erreicht; der "leise"-Enum-Verstoß ist ein Hard-Blocker, weil er den Constraint-Solver still bricht (kein sichtbarer Fehler, falsches Filter-Verhalten). Mit Fix #1 + #2 (loudness + Codewort-Verankerung) sicher über 88. Empfehlung: conditional go — diese zwei MUST-FIX, der Rest (savingsTip, wow-Tresor) als SHOULD-FIX im nächsten Pass.

6. Vergleich Altersgruppe mittel

Detektiv liegt inhaltlich auf Augenhöhe mit Safari und Weltraum (beide ~85 KB, voll strukturiert) und klar über Piraten-mittel (59 KB, dünner, loudness komplett null, nur 22 Shopping-Items). Detektivs Differenzierung (Schwur+Rollen+Forensik-Mechaniken) ist motto-stärker als Piraten, gleichauf mit Safaris Tier-Stationen. Schwächer als die Geschwister nur an einer Stelle: dem "leise"-Bug, den die anderen vermieden haben.

Soll ich die MUST-FIX-Korrektur (loudness + Standard-Codewort) gleich als chirurgischen JSON-Patch ausgeben?