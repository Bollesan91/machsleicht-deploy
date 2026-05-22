Ich hole mir das Briefing und lege los.

Fetching: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/_dev/content-loop/runs/23-detektiv-adversarial/adv-template.md
Fetched: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/_dev/content-loop/runs/23-detektiv-adversarial/adv-template.md

Briefing klar. Stream A. Ich hole die Zieldatei plus die Vergleichs-JSONs (Safari/Piraten/Weltraum klein) und das Schema-README.

Running command
Zieldatei und Vergleichsdateien holen

Alle geladen. Erst Validität und Schema-Struktur prüfen.

Schema lesen
2 Dateien angesehen, hat einen Befehl ausgeführt

Schema klar. Jetzt die Struktur von detektiv-klein gegen die Vergleichsdateien. Erst Top-Level + Schlüsselzahlen für alle vier.

Struktur-Vergleich aller vier klein-Dateien
Struktur-Vergleich aller vier klein-Dateien

Strukturell deckungsgleich mit den Vorbildern. Schema-Vollständigkeit sieht vollständig aus. Jetzt der inhaltliche Kern — preparationWeeks (6 Wochen?), sosScenarios (8?), und die Spiele samt Detektiv-Mechanik. Erst die genauen Counts und dann der eigentliche Text.

PreparationWeeks und sosScenarios Struktur
PreparationWeeks und sosScenarios Struktur

preparationWeeks=6, sosScenarios=8. Schema-Vollständigkeit erfüllt. Jetzt der Inhalt: title, intro, ageInsight, signatureRitual und vor allem alle Spiele im Volltext, weil dort die Detektiv-Mechanik und die Alterssicherheit (KEINE gruseligen Verbrechen) geprüft werden müssen.

Title, intro, ageInsight lesen
Title, intro, ageInsight lesen

Sehr stark — das Intro adressiert genau die Adversarial-Sorge (keine gruseligen Verbrechen) proaktiv und löst sie sauber. ageInsight ist altersgerecht und konkret. Jetzt die Spiele im Volltext — das ist die inhaltliche Kernprüfung.

SignatureRitual lesen
SignatureRitual lesen

Detektiv-Anker ist altersgerecht und kohärent (Lupe-Identität klar, keine Dienstmarken/Verhöre/Eide für 3-5). 8 Rollen statt 12 — aber das ist altersgerecht reduziert und matched die Vorbilder bei klein vermutlich. Jetzt die Spiele aller drei Varianten im Volltext.

Alle Spiele im Volltext lesen
Alle Spiele im Volltext lesen

Inhaltlich sehr stark — konkrete, durchführbare Spielanleitungen mit Material, Steps, Safety und whyItWorks. Detektiv-Mechanik (Lupe als Werkzeug, Bild-Kärtchen für Nicht-Leser, Spuren-Folgen, kooperativ statt kompetitiv) ist altersgerecht und konsistent. Jetzt prüfe ich: INSEL-Bug (Adversarial-Anti-Pattern), minAge-Konsistenz, und ob die Vorbilder bei klein auch 8 Rollen haben. Außerdem die sosScenarios und FAQ inhaltlich.

INSEL-Bug, rolesList-Counts, minAge, Rest-Sektionen
INSEL-Bug, rolesList-Counts, minAge, Rest-Sektionen

Kein INSEL-Bug. 8 Rollen = exakt wie die Vorbilder bei klein (nicht 12 — das ist die altersgerechte klein-Norm, kein Defizit). Struktur deckungsgleich. Jetzt sosScenarios und FAQ-Inhalt sowie Detektiv-Spezifität der SOS-Antworten prüfen.

SosScenarios und FAQ Inhalt
SosScenarios und FAQ Inhalt

Alle 8 SOS-Szenarien sind Detektiv-spezifisch motiviert (nicht generisch), mit echtem Fallback. FAQ greift die Gruselsorge direkt auf. Ich habe genug Material für ein vollständiges Scoring. Eine letzte Prüfung: Bolle-Ton (Schul-Sprache vs. lakonisch) und Konkurrenz-Differenzierung gegen die anderen drei klein-Mottos — gibt es Copy-Paste-Floskeln?

Copy-Paste-Check und Bolle-Ton-Marker
Copy-Paste-Check und Bolle-Ton-Marker

Kaum Boilerplate-Überlappung (1 generisches 8-Gramm wie "wird 3, 4 oder 5"), keine Schul-Sprache-Floskeln, educationalValue ist konkret und lakonisch. Datengrundlage komplett. Hier das Adversarial-Review.

Adversarial Re-Review — detektiv-klein.json (3–5) · Stream A
1. Score-Tabelle
Dimension	Max	Score	Begründung
Inhaltliche Tiefe	30	28	Spiele durchgängig mit Material, 4–5 Steps, Safety, whyItWorks. Detektiv-Mechaniken konkret (Lupe-Basteln → Werkzeug-Identität, Bild-Kärtchen für Nicht-Leser, Spur-Folgen kooperativ). Wow-Variante hat echten roten Faden (leere Kiste → Spur → Kuchen → Schatz). Abzug: minimal-Variante mit nur 2 Spielen ist die dünnste Stelle, und „Was hat sich verändert?“ ist eher Generalist als Detektiv-spezifisch.
Schema-Vollständigkeit	20	20	preparationWeeks = 6 Stufen ✅, sosScenarios = 8 ✅, shoppingList[].category 10/10/11 vollständig ✅, steps[] in allen Spielen 4–5 ✅, whyItWorks überall gesetzt ✅. Kein Stub.
Story-Konsistenz	15	15	Detektiv-Anker durchgehend altersgerecht: Lupe als Identitätsobjekt, „Spur/suchen/finden“ statt „Indizien/Verhör“, Mission = Verlorenes wiederbringen. Versprechen statt Eid, Pinnwand statt Akte-Schwere. Null Bruch.
Konkurrenz-Differenzierung	15	13	Lupe-Basteln, Fingerabdruck-Station/-Akte, Bild-Hinweis-Spuren sind detektiv-eigen und nicht aus Safari/Piraten/Weltraum übertragbar. Abzug: Spuren-Suche + Mini-Schatzsuche sind mechanisch nah an dem, was jedes klein-Motto macht (Spur folgen → Schatz finden); die Detektiv-Färbung trägt, aber die Grundmechanik ist Gattungsstandard.
Bolle-Ton	10	9	Lakonisch, „ehrlich gesagt“, keine Schul-Sprache (0 Treffer auf „fördert die Kompetenz“ etc.). educationalValue konkret statt pädagogisch aufgeblasen. Minimal-Abzug: gelegentlich leicht warm/marketing-nah im Intro.
Schema-Korrektheit	10	10	Valid JSON ✅, motto=detektiv, ageGroup=klein, ageRange=[3,5] korrekt. Kein minAge >5. Kein INSEL-Bug (0 Treffer).
Total	100	95	
2. Drei stärkste Aspekte
Gruselsorge proaktiv entschärft. Das zentrale Adversarial-Risiko bei Detektiv 3–5 (Verbrecher/Tatort/Angst) wird an drei Stellen aktiv adressiert: Intro („3-5-Jährige sind keine kleinen Kommissare“), ageInsight-Trait „Angst-Schwelle“, und FAQ #1 wörtlich „Ist Detektiv nicht zu gruselig?“. Das ist nicht weggelassen, sondern bewusst geframt.
Sprachstand-Trait ist die beste Designentscheidung der Datei. „Indizien/Verdächtiger/Verhör sind leer für sie — sag Spur/suchen/finden“ ist nicht nur Insight, sondern wird konsequent durchs ganze JSON umgesetzt. Die Datei lebt ihre eigene Regel.
SOS-Szenarien sind echt detektiv-spezifisch. Kein generisches Pannen-Copy-Paste: regen → Spur in Schleifen durch zwei Räume; kuchen_misslungen → Pappkarton-Lupe als Deko drauf; spielzeug_kaputt → „bei Detektiv geht fast alles aus dem Haus“. Jedes Szenario nutzt die Motto-Logik.
3. Fünf schwächste Stellen + Fix
Minimal-Variante hat nur 2 Spiele, das zweite ist motto-schwach. „Was hat sich verändert?“ ist ein Allzweck-Memoryspiel mit Detektiv-Lack. → Fix: whyItWorks bereits gut, aber einen expliziten Lupen-Bezug in Step 1 einbauen („mit der Lupe genau anschauen“), damit auch das Sparflammen-Spiel motto-verankert ist.
Spuren-Suche existiert dreimal (minimal/standard/wow) mit nur graduellen Unterschieden. Die Wiederholung ist funktional gewollt (Skalierung), aber ein Adversarial-Leser sieht Redundanz. → Fix: In standard die Bild-Kärtchen-Variante stärker abgrenzen (z. B. Rätsel-Kärtchen „Wo schläft Papa?“ statt nur Pfeil), damit die drei Stufen sich klarer unterscheiden.
rolesList = 8 statt 12. Schema-README nennt 12 als Golden-Template-Norm. → Kein Fix nötig: Alle drei Vorbilder (Safari/Piraten/Weltraum) haben bei klein ebenfalls 8 — das ist die etablierte klein-Norm, nicht ein Defizit dieser Datei. Nur dokumentieren, falls jemand stur gegen feuerwehr-mittel prüft.
„erste/größte“-Superlative im Wow-Höhepunkt schlummern. Formulierungen wie „der Wow-Höhepunkt“ sind harmlos, aber prüfen, ob im Volltext (außerhalb meines Auszugs) unhedged-Superlative wie „das beste Detektivspiel“ stehen. → Fix: Volltext-grep auf „beste/größte/erste“ vor go-live (Rostock-Lehre).
Verschluckungs-Safety bei Schoko-Münzen nur teilweise explizit. Im wow-Mini-Schatzsuche-Step steht „Münzen wegen Verschluckungsgefahr bei den Jüngsten begleitet“ — gut. Aber im minimal-Spiel (8–10 Münzen als Spur) fehlt der Hinweis in der safetyRule. → Fix: safetyRule des minimal-Spuren-Spiels um Verschluckungs-Note für 3-Jährige ergänzen.
4. Story-/Schema-Konsistenz vs. Safari/Piraten/Weltraum

Strukturell deckungsgleich mit allen drei Vorbildern: identische Top-Level-Keys, preparationWeeks mit denselben 6 Zeitstufen, sosScenarios = 8, variants minimal/standard/wow, 7 traits, 8 rolesList, 5 setupSteps. shoppingList[].category zu 100 % befüllt — gleichauf mit Safari/Weltraum, kein TODO-Stub. faq=4 (wie Safari/Weltraum; Piraten hat 5). Kein INSEL-Bug, der bei Piraten-klein einmal als legitimes Wort vorkommt — bei Detektiv 0 Treffer, also kein versehentliches Carry-over.

5. Verdict ≥85 ready?

Ja. 95/100 — ready. Klar über der 85-Schwelle. Die fünf Schwachstellen sind allesamt Politur, kein Blocker. Einzige empfohlene Pre-Go-Live-Aktion: Volltext-grep auf unhedged-Superlative (Punkt 4.3) und die Verschluckungs-Safety-Ergänzung (4.5) — beides 5-Minuten-Fixes, keine Re-Review nötig.

6. Vergleich zu Safari/Piraten/Weltraum (gleiche Altersgruppe)
	detektiv	safari	piraten	weltraum
shop_w_cat (min/std/wow)	10/10/11	10/12/15	10/12/13	10/12/15
whyItWorks Abdeckung	voll	min lückenhaft (1/2)	voll	voll
rolesList	8	8	8	8
Motto-Risiko proaktiv adressiert	ja, 3-fach	n/a	n/a	n/a

Detektiv ist die einzige der vier Dateien mit einem inhärenten Alters-Eignungsrisiko (Grusel), und es ist die einzige, die dieses Risiko an drei Stellen explizit auflöst. In Schema-Disziplin liegt es leicht hinter Safari/Weltraum bei der shoppingList-Tiefe der wow-Variante (11 vs. 15 Items), aber bei whyItWorks-Vollständigkeit schlägt es Safari (das bei minimal eine Lücke hat). Ton und Anti-Sycophancy sind auf Niveau der besten Vorbilder. Unterm Strich: gleichwertig mit Safari/Weltraum, vor Piraten in der Grusel-Sensibilität.