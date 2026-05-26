In Arbeit
Fetched: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/weltraum-klein.json

Datei ist da. Jetzt validiere ich JSON-Struktur und Schema gegen den Vorbild safari-klein, dann lese ich die Vorbilder durch, bevor ich score.

Abrufen von raw.githubusercontent.com
Re-fetch weltraum-klein cleanly + validate JSON
Re-fetch weltraum-klein cleanly + validate JSON

71KB (nicht 61, aber das spielt keine Rolle), valides JSON. Jetzt strukturierte Schema-Prüfung gegen Briefing-Anforderungen und Quervergleich mit safari-klein.

Schema completeness check vs reference files
Schema completeness check vs reference files

Schema ist strukturell vollständig und sogar konsistenter als safari-klein (das hat ein game ohne whyItWorks). Jetzt der harte Teil — die inhaltlichen Probleme, die eine reine Strukturprüfung nicht fängt. Ich prüfe die kritischen Punkte: Spiel-Wiederholungen über Varianten, interne Konsistenz (Zahlen, minAge vs. Altersgruppe), Bolle-Ton, und die spezifischen 3-5-Checks.

Deep consistency checks: dedup, minAge, numbers
Deep consistency checks: dedup, minAge, numbers

Mehrere konkrete Bugs gefunden. Zwei kritische Konsistenzprobleme: (1) minAge=5 Spiele (Planeten-Reise, Mini-Rakete) sind in einer 3-5-Gruppe für die halbe Zielgruppe gesperrt — bei "Mini-Rakete basteln" als zentralem Mitgebsel-Spiel besonders heikel, da es in Standard und Wow das Abschluss-Bastel ist. (2) Apfelschorle-Reasoning sagt 3× "für 6 Kinder", auch in den 8-Kinder-Varianten — Copy-Paste-Artefakt. Letzter Check: Ton-Stichproben und ob das HTML-Stub existiert.

Tone scan + schorle quantity + HTML stub existence
Tone scan + schorle quantity + HTML stub existence

Genug Datenbasis. Marketing-Floskeln sind sauber (0 Treffer auf die harten Buzzwords), die "spielerisch/trainiert"-Sprache steckt nur im educationalValue-Feld, wo sie funktional zu rechtfertigen ist. Ich habe alles, was ich für den Score brauche.

Adversarial Re-Review: weltraum-klein.json (3–5) — Stream A

Datei geholt (71 KB, valides JSON), gegen safari-klein und piraten-klein als Vorbilder geprüft, alle Konsistenz-Checks gegen die Rohdaten gefahren. Kein Pauschal-Lob, harte Tests durchgezogen.

1. Score nach Rubrik
Dimension	Punkte	Vergeben	Begründung
Inhaltliche Tiefe	30	26	Spielanleitungen konkret, parentTips spezifisch (scharfe Karton-Kanten, Zucker-Peak-Timing), sosScenarios realistisch. Abzug: Spiele über Varianten 1:1 dupliziert (Sternen-Sammeln 3×, Parcours/Bastel-Rakete 2× wortgleich) — legitim fürs Schema, aber 0 Mehrwert-Variation.
Schema-Vollständigkeit	20	20	preparationWeeks 6/6, sosScenarios 8/8, alle shoppingList-Items mit category, alle games steps 4–6, whyItWorks in jedem Spiel (besser als safari-klein, wo eins fehlt).
Story-Konsistenz	15	14	Weltraum-Anker durchgehend (Raumschiff/Sterne/Mond/Planeten/Crew), Ritual altersgerecht entschärft. Minimal-Abzug: rolesList hat 8 Rollen, aber die Spiele nutzen real nur ~4 davon (Bastel-Helfer/Crew-Helfer/Parcours-Helfer tauchen in keiner Anleitung auf).
Konkurrenz-Differenzierung	15	13	Mondsteine-in-Folie, Countdown-Stopp, Karton-Raumschiff sind weltraum-spezifisch und besser als Standard-Planer. Abzug: Planeten-Reise und Parcours sind generische Stationen-Spiele mit Weltraum-Lack — funktionieren, aber mechanisch austauschbar.
Bolle-Ton	10	9	Lakonisch, mama-respektierend, "Vorsicht bei Pinterest-Raketen-Torten", "essen sowieso nur die Glasur". Keine Marketing-Buzzwords (0 Treffer). Halber Abzug: educationalValue kippt mit "Selbstregulations-Übung" kurz in Pädagogen-Sprech.
Schema-Korrektheit	10	8	Valid JSON, motto/ageGroup/ageRange korrekt. Abzug: zwei harte Konsistenz-Bugs (siehe §3) — Schorle-Reasoning + minAge-Sperre.
Total: 90 / 100
2. Drei stärkste Aspekte
whyItWorks-Disziplin schlägt das Vorbild. Jedes einzelne Spiel hat ein gefülltes whyItWorks — safari-klein hat in der Minimal-Variante eins ohne. Das ist die Sorte Konsistenz, die der Loop produzieren soll.
Die "Anti-Gruisel"-Linie ist sauber durchgezogen. introParagraph, whyMottoFits und ageInsight nennen explizit, was weggelassen wird (schwarze Löcher, Alien-Angriffe, Verlorengehen). Das ist genau der altersgerechte Filter, den der Stream-A-Check verlangt — und es ist nicht nur behauptet, sondern in den Spielen umgesetzt (Aliens sind "Begrüßer", nicht Gegner).
parentTips sind echte Risiko-Tipps, keine Floskeln. Scharfe Karton-Kanten, Folie-Stolperfalle, Kuchen-Slot nach 60–75 Min gegen den Zucker-Peak, 1 Erwachsener pro 2–3 Kinder. Das ist konkret und mama-respektierend statt belehrend.
3. Fünf schwächste Stellen + Fix
minAge: 5 bei "Mini-Rakete basteln" in einer 3–5-Gruppe — der gravierendste Bug. Das Bastel-Spiel ist in Standard und Wow das zentrale Mitgebsel-Ritual und der Ruhe-Abschluss, hat aber minAge 5. Ein Planer-Filter für ein 3-jähriges Kind blendet damit das Herzstück aus. Der ageAdjust3-Text ("Vorbereitete Teile zum Aufkleben anbieten") beweist, dass es für 3-Jährige gedacht ist. Fix: minAge auf 3 setzen. Gleiches gilt für "Planeten-Reise" (minAge 5, ageAdjust3 existiert → auf 3) und ggf. Parcours/Mondsteine (minAge 4 → 3, beide haben ageAdjust3).
Apfelschorle-categoryReasoning sagt 3× "für 6 Kinder" — auch in den 8-Kinder-Varianten. Reines Copy-Paste-Artefakt aus der Minimal-Variante. Fix: in standard/wow auf "Getränk für 8 Kinder" ändern. Konsequenz-Frage gleich mit: ein 6er-Pack reicht bei 8 Kindern über 2,5 Std. real nicht — Menge prüfen.
rolesList hat 8 Rollen, die Spiele nutzen ~4. Bastel-Helfer, Crew-Helfer, Parcours-Helfer kommen in keiner Spielanleitung vor. Das ist Schema-Füllung auf 8, ohne dass die Rollen im Tagesablauf andocken. Fix: entweder die ungenutzten Rollen in den jeweiligen Spiel-steps namentlich aufgreifen ("der Parcours-Helfer zeigt den Weg"), oder im optOutNote klarstellen, dass Rollen frei verteilt über alle Stationen laufen.
Spiele über Varianten wortwörtlich dupliziert. Sternen-Sammeln ist 3× identisch, Parcours/Bastel-Rakete je 2× — Byte für Byte. Schema-konform, aber wer Minimal→Standard→Wow vergleicht, sieht dreimal denselben Block. Fix (optional, kein Blocker): mindestens den intro/prepText pro Variante leicht varrieren, oder akzeptieren als bewusste Redundanz (Planer zeigt eh nur eine Variante).
educationalValue kippt in Pädagogen-Ton. "eine echte Selbstregulations-Übung", "schulen sie Ausdauer" — das ist genau die Schul-Sprache, die der Bolle-Ton-Check verbietet. Im Elternohr klingt das nach Kita-Konzeptpapier. Fix: "Selbstregulations-Übung" → "Üben fürs Stillhalten und Loslegen"; "schulen sie Ausdauer und genaues Hinschauen" → "bleiben sie dran und schauen genau hin".
4. Story-/Schema-Konsistenz-Check

Schema: Strukturell vollständig und stellenweise besser als beide Vorbilder. preparationWeeks 6/6, sosScenarios 8/8 mit identischen Keys wie safari/piraten (gut — Planer-Rendering bleibt kompatibel), shoppingList durchgängig kategorisiert, steps 4–6 überall. Valides JSON.

Story: Der Weltraum-Anker trägt durchgehend — Raumschiff (Karton), Sterne (sammeln), Mond (Steine/Kuchen), Planeten (Reise), Crew (Rollen), Mission (Versprechen). Das Astronauten-Versprechen-Ritual ist korrekt von "Eid/Kommandant" auf "ein Satz + eine Geste" heruntergebrochen, mit explizitem introText, warum Eid bei 3–5 nicht funktioniert. Mini-Astronaut + Stirnband-Identität ist klar etabliert. Eltern sind aktiv als Helfer eingeplant (ageInsight + parentTips + SOS).

Bruchstellen: Die minAge-Werte widersprechen der Story — Spiele, die der Text explizit für 3-Jährige adaptiert (ageAdjust3 vorhanden), sind per minAge für 3-Jährige gesperrt. Das ist der einzige inhaltliche Konsistenzbruch, und es ist ein maschinell sichtbarer (Planer-Filter), kein kosmetischer.

5. Verdict

90 ≥ 85 → ready. Schema-vollständig, Ton sitzt, Story konsistent, altersgerecht entschärft. Über der Vorbild-Spanne von safari-klein in der Schema-Disziplin.

Aber: Der minAge-Bug ist ein Pre-Deploy-Muss, kein "nice to have". Wenn das JSON live in den Planer-Filter geht, verschwindet für 3-jährige Geburtstagskinder das zentrale Bastel-Spiel — ein sichtbarer Funktionsfehler, kein Geschmacksthema. Ready konditional: erst die minAge-Werte auf 3 ziehen (alle vier betroffenen Spiele haben ageAdjust3, also inhaltlich gedeckt), dann go-live.

Der 1 Edit mit dem größten Hebel (falls nur einer): alle vier minAge-Werte auf 3 setzen. Das behebt den einzigen funktionalen Defekt und kostet vier Zahlen-Änderungen. Die Schorle- und educationalValue-Fixes sind Politur, der minAge-Fix ist Funktion.

6. Vergleich zu Safari/Piraten (gleiche Altersgruppe)
	weltraum-klein	safari-klein (92–97)	piraten-klein (89–96)
Schema-Vollständigkeit	6 prep / 8 sos / alle whyItWorks ✅	6 / 8 / eins fehlt	6 / 8 / alle ✅
games minimal/standard/wow	2/4/4	2/4/4	2/4/3
rolesList	8 (4 ungenutzt)	8	8
FAQ	4	4	5
Bekannte Bug-Klasse	minAge-Sperre + Schorle-Copy-Paste	—	—

Einordnung: weltraum-klein liegt in der Vollständigkeit gleichauf bis leicht über den Vorbildern (lückenlose whyItWorks, volle 4 Spiele in wow vs. piratens 3). Es liegt unter ihnen bei der Sauberkeit der Detail-Daten — die beiden Konsistenz-Bugs (minAge, Schorle-Reasoning) sind genau die Klasse Fehler, die safari/piraten nicht haben und die ihre höheren Scores erklären. Behebt man den minAge-Bug, ist die 92–95-Spanne der Vorbilder realistisch erreichbar; mit Schorle-Fix obendrauf bewegt sich das Stück in deren Mitte.

Soll ich die vier minAge-Fixes (plus Schorle-Reasoning) direkt als chirurgische str_replace-Edits aufs draft committen — [skip netlify], Token nicht in der Remote-URL? Sag "ja, fixen" oder ob du erst die anderen Streams (mittel/gross) durch hast.