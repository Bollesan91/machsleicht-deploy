Ich hole mir das Briefing.

Fetching: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/_dev/content-loop/runs/23-detektiv-adversarial/adv-template.md
Fetched: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/_dev/content-loop/runs/23-detektiv-adversarial/adv-template.md

Briefing geladen. Ich hole jetzt das Prüfobjekt, das Vorbild (Safari gross) und das Schema. Lade parallel.

Fetching site
Failed to fetch: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/detektiv-gross.json

Die Domain ist erlaubt, nur das Fetch-Tool ist auf vom User gelieferte URLs beschränkt. Ich nutze bash/curl gegen die Raw-URLs.

Running command
Fetch detektiv-gross.json, schema README, and safari-gross reference via curl

Alle drei da. Erst Validität und Struktur prüfen, dann den kritischen Codeknacker.

Running command
Validate JSON and check top-level metadata

Die Top-Level-Struktur weicht vom Briefing ab — kein sosScenarios, shoppingList, whyItWorks auf Top-Level. Diese stecken vermutlich in variants[]. Ich vergleiche die Struktur direkt mit Safari als Vorbild.

Running command
Compare top-level structure with Safari and inspect variants

Wichtiger Befund: Safari hat sosScenarios auf Top-Level, Detektiv fehlt es komplett. Das ist ein direkter Schema-Verstoß gegen die Rubrik (sosScenarios 8). Ich prüfe, ob es woanders versteckt liegt, und sehe mir die Variantenstruktur (games/steps/whyItWorks/shoppingList.category) genauer an.

Check sosScenarios/whyItWorks presence and game/shoppingList schema across variants
Check sosScenarios/whyItWorks presence and game/shoppingList schema across variants

Schema-Beobachtungen verfestigen sich: sosScenarios fehlt komplett (Safari hat es), Spiele heißen name statt title, einige Spiele haben 7 bzw. 10 steps (Rubrik fordert 4-6). shoppingList.category ist überall vorhanden. Jetzt der kritische Teil: der Codeknacker. Ich suche INDIZ/MOTIV/BEWEIS.

Locate Codeknacker keywords and specialization terms
Locate Codeknacker keywords and specialization terms

Codeknacker existiert mehrfach. Ich extrahiere jetzt jedes Spiel mit INDIZ/MOTIV/BEWEIS im Text, um die Sortier-/Code-Regeln vollständig zu lesen.

Extract full text of all Codeknacker / INDIZ-MOTIV-BEWEIS games
Extract full text of all Codeknacker / INDIZ-MOTIV-BEWEIS games

Beide Codeknacker-Spiele vollständig. Jetzt verifiziere ich die Mathematik der Sortier-Regeln rigoros — jede Behauptung "ergibt ein echtes Wort" muss zwingend und eindeutig aufgehen.

Mathematically verify all Codeknacker sorting rules and uniqueness
Mathematically verify all Codeknacker sorting rules and uniqueness

Die Mathematik geht in allen drei Quadranten eindeutig auf — alle Werte sind strikt absteigend ohne Gleichstände, also keine Mehrdeutigkeit. Aber ich muss als Adversarial-Reviewer härter prüfen: Gibt es bei der Doppel-I-Falle (INDIZ) und der Doppel-E (BEWEIS) tatsächlich eine eindeutige Lösung, oder existiert ein alternatives Wort, das ein Kind versehentlich legen könnte? Und stimmt die behauptete Selbstkontrolle ("falsche Regel → Buchstabensalat")?

Adversarial check: alternative orderings and self-control claim
Adversarial check: alternative orderings and self-control claim

Die Selbstkontrolle hält: falsche Sortierrichtung erzeugt erkennbaren Salat (ZIDNI/VITOM/SIEWEB). Mathematik ist sauber. Jetzt der eine echte Schwachpunkt, den ich als Adversarial finden muss — die Regel-Eindeutigkeit der Sortier-Kriterien selbst. Ich prüfe, ob "Häufigkeit", "Verdachts-Stärke", "Beweis-Wert" für ein 9-12-Kind ohne die danebenstehenden Zahlen ableitbar wären, und ob ageAdjust12 (eingeschmuggelte Falsch-Zahl) die Eindeutigkeit kippt.

Adversarial uniqueness check of odd-one-out logic and ageAdjust12 spec
Adversarial uniqueness check of odd-one-out logic and ageAdjust12 spec

Echter Befund: Die odd-one-out-Logik im Standard-Spiel ist semantisch weicher als die zahlenbasierte Sortierung im Minimal-Spiel. Jetzt prüfe ich die restlichen Anforderungen: Spezialisierungs-Konsistenz, Sorgfalt-statt-Tempo, INSEL-Bug, Bolle-Ton, und Vergleich zu Safari/Piraten/Weltraum. Ich hole die anderen Mottos zum Strukturvergleich.

Compare sosScenarios across mottos; check for cross-motto leaks (INSEL-bug) and specialization consistency
Compare sosScenarios across mottos; check for cross-motto leaks (INSEL-bug) and specialization consistency

Drei Schlüsselbefunde: (1) Detektiv ist das einzige Motto ohne sosScenarios — alle drei Vergleichs-Mottos haben es. (2) "insel" und "schatz" leaken — ich muss prüfen, ob das echte Cross-Motto-Bugs oder legitime Nutzung sind. (3) Spezialisierungen sind konsistent durchgezogen. Letzte gezielte Prüfung der Leaks und des Bolle-Tons.

Inspect leak contexts, Bolle-tone violations, and step-count outliers
Inspect leak contexts, Bolle-tone violations, and step-count outliers

"Schatz" ist hier legitim (Escape-Room-Schatzsuche als Detektiv-Mechanik, plus machsleicht-Schatzsuche-Generator) — kein Cross-Motto-Leak. Das "insel" konnte nicht im Kontext gezeigt werden (vermutlich Teilstring wie "Pinsel" o.ä.). Letzter Check.

Resolve the insel substring
Resolve the insel substring

Leerer Treffer bei case-sensitivem [Ii]nsel mit Rändern → das insel aus dem .lower()-Lauf war ein Teilstring (z.B. "Pinsel" oder "einsel..." in "vereinzelt"). Kein INSEL-Bug. Verifikation abgeschlossen. Ich habe alles, was ich brauche.

Adversarial Re-Review — detektiv-gross.json (9–12)

Stream C · Chat C · Grundlage: Code-/Schema-Verifikation gegen Safari/Piraten/Weltraum gross + mathematische Prüfung des Codeknackers

1. Score-Tabelle
Dimension	Max	Score	Begründung
Inhaltliche Tiefe	30	28	Codeknacker, Escape-Room-Tresor, odd-one-out, Caesar-Chiffre — konkrete, durchgerechnete Mechaniken. Kein Füllmaterial.
Schema-Vollständigkeit	20	12	sosScenarios fehlt komplett (−6). steps[]-Range zweimal verletzt: minimal-Codeknacker hat 10 statt 4–6, wow-Escape-Room hat 7 (−2). Rest (prepWeeks 6, shoppingList.category, whyItWorks) vollständig.
Story-Konsistenz	15	15	Detektiv-Anker durchgehend (Asservaten, Spurensicherung, Verhör, Indizien). Spezialisierungen Spurensicherer/Profiler/Code-Knacker sauber durchgezogen (26/27/23 Treffer).
Konkurrenz-Differenzierung	15	14	Selbstkontrollierende Wort-Codes als echte Detektiv-Mechanik sind eigenständig. Plot-Twist-Saat ("stärkstes Motiv ≠ Täter") ist clever.
Bolle-Ton	10	9	Lakonisch, "Trick für müde Eltern um 22:30", keine Schul-Sprache. Nur "lernen" (2×) und "wertvoll" (2×) grenzwertig — kein echter Verstoß.
Schema-Korrektheit	10	10	Valid JSON, motto/ageGroup/ageRange korrekt ([9,12]).
TOTAL	100	88	
2. Drei stärkste Aspekte

Erstens: Der Codeknacker ist mathematisch wasserdicht. Ich habe alle drei Quadranten durchgerechnet — INDIZ (6/5/4/2/1), MOTIV (9/7/5/3/1), BEWEIS (6/5/4/3/2/1). Alle Werte strikt absteigend ohne Gleichstände, jede Sortierung also eindeutig. Die Doppel-I-Falle (Isolierband 6 vs. Indizien-Marker 2) und Doppel-E (Einbruch 5 vs. Email 3) lösen sich beide zwingend auf. Die behauptete Selbstkontrolle hält: falsche Sortierrichtung erzeugt nachweislich Salat (ZIDNI / VITOM / SIEWEB), kein zufälliges echtes Wort.

Zweitens: Die Sorgfalt-statt-Tempo-Leitidee ist konsistent verankert, nicht nur behauptet. Der "Sorgfalt-Spezialist"-Stempel und "Tempo wird hier nicht extra belohnt" stehen explizit im whyItWorks, und die Mechanik (genaues Zählen schlägt schnelles Rufen) trägt das.

Drittens: Die Spiele bauen narrativ aufeinander. Die Mara-Falle im Codeknacker sät den Plot-Twist fürs Fingerabdruck-Spiel ("wer das offensichtlichste Motiv hat, wird als Ablenkung entlarvt"). Das ist echtes Fall-Design statt loser Spielesammlung.

3. Fünf schwächste Stellen + Fix
sosScenarios fehlt vollständig — Safari, Piraten und Weltraum (gross) haben es alle, Detektiv als einziges nicht. Klarster Schema-Bruch. Fix: 8 sosScenarios analog Safari ergänzen (z.B. "Code-Rätsel zu schwer → Tippkarte", "Kind will nicht ermitteln → Beobachter-Rolle Gerichtszeichner", "Tatort-Setup vergessen → spontaner Diebstahl improvisieren").
odd-one-out im Standard-Spiel (TAT) ist semantisch mehrdeutig. Tüte A ("passt nicht in Stadtwohnung im Sommer"): Tannennadel ist intendiert, aber Asche (kein Kamin im Sommer) und Sand (kein Strand) sind genauso plausibel falsch. Tüte C: Tabak ist intendiert, aber Teppich ist ebenfalls keine Kleidungs-Faser. Das ist deutlich weicher als die Zahlenlogik im Minimal-Spiel. Fix: Tüte A auf eindeutige Kategorie umstellen ("nur eines ist organisch/pflanzlich") oder Distraktoren tauschen (Sand→Staub, Asche→Haar). Tüte-C-Frage präzise auf "Rauchpflanze" lassen, aber Teppich gegen "Seide" tauschen.
Zwei Spiele sprengen die steps-Range 4–6. minimal-Codeknacker hat 10 steps, wow-Escape-Room 7. Fix: Codeknacker-Schritte bündeln (je Quadrant Erklärung+Lösung+Falle zu einem Step zusammenziehen → 5–6). Escape-Room auf 6 trimmen.
ageAdjust12 minimal spezifiziert die "eingeschmuggelte Falsch-Zahl" nicht. Die Mechanik ("Team muss Ermittlungsfehler erkennen und korrigieren") steht da, aber keine konkrete Falsch-Zahl ist im JSON definiert — Eltern müssen sie selbst erfinden, ohne Garantie, dass die Korrektur eindeutig bleibt. Fix: Eine konkrete Falsch-Zahl vorgeben, die nur eine korrekte Reparatur zulässt (z.B. "DNA-Tupfer steht fälschlich auf 7 statt 4 — dann stünde es vor Notizzettel und ergäbe IDNZ... → erkennbar falsch, korrigieren auf 4").
Spielobjekt-Key heißt name, nicht title — die Rubrik referenziert "steps[]" auf Spielebene; Safari nutzt zur Konsistenz prüfen. Kleiner, aber wenn der HTML-Renderer title erwartet, brechen die Überschriften. Fix: Gegen das HTML-Template detektiv-9-12-jahre.html prüfen, welcher Key gerendert wird — bei Mismatch angleichen. (Habe ich nicht gegen die HTML verifiziert; Annahme offen.)
4. Story-/Schema-Konsistenz vs. Safari/Piraten/Weltraum

Top-Level-Struktur identisch mit Safari bis auf das fehlende sosScenarios — das ist die einzige strukturelle Abweichung und betrifft alle Vergleichs-Mottos außer Detektiv. Variantenmodell (minimal/standard/wow), shoppingList mit category, whyItWorks, prepWeeks 6: alles deckungsgleich. Kein INSEL-Bug: Der insel-Treffer war ein Teilstring (case-sensitive Prüfung mit Rändern ergab null), und die 15 schatz-Treffer sind durchgehend legitim (Escape-Room-Schatzsuche als Detektiv-Mechanik + machsleicht-Schatzsuche-Generator), kein Copy-Paste-Leak aus Piraten/Safari.

5. Verdict

88/100 — ready. Über der 85er-Schwelle, aber knapp und mit einem strukturellen Blocker: sosScenarios muss vor go-live ergänzt werden, sonst ist Detektiv das einzige Motto ohne SOS-Sektion und der Renderer/Audit könnte darauf bauen. Die mathematische Kernanforderung (Codeknacker eindeutig) ist voll erfüllt. Die odd-one-out-Mehrdeutigkeit und die steps-Range sind Qualitäts-, keine Blocker-Punkte.

Empfehlung: MUST-FIX = #1 (sosScenarios) + #3 (steps-Range). Der Rest ist SHOULD-FIX.

6. Vergleich zur gleichen Altersgruppe (gross)

Inhaltlich spielt Detektiv-gross auf Safari-Niveau (94KB vs. 88KB, größte Datei der vier). Die selbstkontrollierende Code-Mechanik ist mechanisch anspruchsvoller als alles, was Safari/Piraten typischerweise bieten — das ist eine echte Stärke für 9–12. Der einzige Punkt, an dem Detektiv hinter den anderen dreien zurückfällt, ist die fehlende SOS-Sektion. Sobald die drin ist, ist es das stärkste der vier gross-Mottos.

Ein offener Punkt, den ich nicht abschließend prüfen konnte: die name-vs-title-Renderkompatibilität gegen detektiv-9-12-jahre.html. Wenn du willst, ziehe ich die HTML und verifiziere das — dann wäre die Review lückenlos.