Ich hole mir zuerst das Briefing-Template und dann alle Materialien.

Fetching site
Fetched: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/_dev/content-loop/runs/17-safari-adversarial/adv-prompt-template.md

Template geladen. Jetzt alle Materialien für Stream B (mittel / 6-8).

Running command
2 Befehle ausgeführt

Alle da. Erst Schema-Validität und Struktur prüfen, dann Inhalt.

2 Befehle ausgeführt
2 Befehle ausgeführt

Top-level identisch. Jetzt der Kern des Auftrags: games[].steps[], whyItWorks, eduValue — sitzen die in variants. Prüfen wo die Spiele liegen und ob die Nachschärfung Substanz hat.

Inspect meta, motto, variants and game counts
Inspect meta, motto, variants and game counts

variants ist eine Liste, kein Dict. Anpassen.

Inspect variants list structure
Inspect variants list structure

9 games total (2+5+2). Jetzt die zentrale Frage: haben alle steps[], whyItWorks, eduValue — und mit welcher Substanz? Vergleich gegen Feuerwehr.

Check steps/whyItWorks/eduValue coverage for all safari games
Check steps/whyItWorks/eduValue coverage for all safari games

Wichtiger Befund: alle 9 games haben steps[] (4-5) und whyItWorks (183-233c). Aber eduValue ist überall leer/nicht vorhanden (0c) — die Auftragsformulierung nannte eduValue explizit als Prüfpunkt. Prüfen, ob Feuerwehr/Einhorn das Feld führen (Schema-Lücke vs. nicht-existent).

Compare game-level keys across all three to see if eduValue exists anywhere
Compare game-level keys across all three to see if eduValue exists anywhere

Klärung: eduValue existiert in keinem der Files — das Schema kennt es nicht. Der Lern-/Mehrwert-Aspekt steckt in whyItWorks. Also: kein echter Mangel, sondern eine Begriffsverwechslung im Auftrag. Wichtig: Feuerwehr hat 12 games, Safari & Einhorn je 9. Quantitativer Gap notiert.

Jetzt die Substanz der Nachschärfung lesen — Steps und whyItWorks im Volltext, plus Vergleich gegen Feuerwehr-Qualität.

Full text of all steps and whyItWorks in safari-mittel
Full text of all steps and whyItWorks in safari-mittel

Substanz ist da. Steps sind imperativ, konkret, mit Zeiten/Materialien/Altersanpassung; whyItWorks erklärt jeweils das pädagogische Prinzip ohne Schulsprache. Jetzt Gegencheck: Feuerwehr-Steps-Qualität, um "auf Augenhöhe?" zu beurteilen, und das Codewort FUSS validieren (T-F-S-U → ergibt das FUSS?).

Validate the FUSS codeword logic in the treasure hunt
Validate the FUSS codeword logic in the treasure hunt

Harter Logik-Bug gefunden: Die gesammelten Buchstaben T-F-S-U lassen sich nicht zu FUSS sortieren. FUSS braucht zwei S und kein T; gesammelt wird ein T, ein S. Das ist ein echtes Rätsel-Logikproblem — ein 6-8-Jähriger (oder die Mama) der das nachbaut, scheitert. Konkreter Fix nötig.

Jetzt Feuerwehr-Vergleich der Step-Tiefe und die übrigen Sektionen (sosScenarios, preparationWeeks, parentTips, signatureRitual, shoppingList categories).

Compare feuerwehr step structure and average step length
2 Befehle ausgeführt

Interessant — Feuerwehr-mittel hat steps: [] LEER im ersten Spiel. Prüfen wie verbreitet das ist. Wenn Feuerwehr (das "Vorbild") leere Steps hat, ist Safari bei der Step-Befüllung dem Vorbild voraus, nicht hinterher.

2 Befehle ausgeführt
2 Befehle ausgeführt

Das ist der zentrale Befund. Die strukturelle Nachschärfung ist real und substanziell:

Safari: 9/9 games mit steps, 9/9 mit whyItWorks
Feuerwehr ("Vorbild"): nur 3/12 steps, 4/12 whyItWorks
Einhorn ("Vorbild"): 0/9 steps, 0/9 whyItWorks

Safari ist beim steps/whyItWorks-Aspekt den Vorbildern deutlich überlegen. Die Frage "nur formal?" ist klar zu beantworten: nein, mit echtem Inhalt. Jetzt noch die übrigen Sektionen prüfen.

Inspect preparationWeeks, sosScenarios, parentTips, signatureRitual
Inspect preparationWeeks, sosScenarios, parentTips, signatureRitual

preparationWeeks: 6/6 Sektionen gefüllt. sosScenarios: 8. Struktur von sos/parentTips anders als erwartet — anschauen.

Dump raw structure of sos, parentTips, ritual
Dump raw structure of sos, parentTips, ritual

Alle Sektionen substanziell gefüllt: sosScenarios als Dict mit 8 Szenarien (icon/label/headline/steps/fallback), parentTips strukturiert mit konkreten Zahlen ("bei 8 Kindern statistisch mind. 1 Unverträglichkeit"), signatureRitual mit Ranger-Eid + Lizenz-Übergabe und setupSteps. Jetzt shoppingList-categories und Story-Konsistenz (Ranger-Eid, Tier-Helfer/Spezialist-Brücke) sowie die HTML-Quelle gegenchecken.

Check shoppingList categories and story-phrase consistency
Check shoppingList categories and story-phrase consistency

shoppingList: alle categories gesetzt, sauberes 3-Tier-System (pflicht/sinnvoll/habIchVielleicht). Story-Vokabular dicht (Ranger 84x, Lizenz 61x, Pirsch 32x).

Wichtiger Brücken-Check aus dem Template: "Übergang Helfer (3-5) → Spezialisten (9-12)". Spezialist kommt 0x vor (korrekt für mittel — die mittlere Stufe ist "Ranger/Anwärter", die Brücke). Aber das _meta sagte, die Brücke sei nur konzeptuell dokumentiert weil klein/gross noch nicht eingecheckt sind. Das prüfen + HTML-Source-Abgleich (kommt der Mehrwert aus dem HTML an?).

Check meta bridge note and HTML source coverage
Check meta bridge note and HTML source coverage

HTML-Source deckt alle Spiele ab — der JSON ist eine treue, strukturierte Extraktion aus dem 5.611-Wort-HTML. Jetzt noch der Bolle-Ton-Check (Marketing-Phrasen-Scan) und Cross-File-Konsistenz (klein/gross existieren noch nicht → kann ich nur konzeptuell bewerten).

Running command
Marketing-phrase scan and sibling-file existence check

Zwei Dinge zu klären: (1) klein/gross existieren doch (HTTP 200) — das _meta ("noch nicht eingecheckt") ist veraltet. (2) "Highlight" 8x, "emotional wertvoll" 1x, "perfekt" 1x — die Kontexte ansehen, ob das echte Marketing-Phrasen sind.

3 Befehle ausgeführt
3 Befehle ausgeführt

Ton-Befund nuanciert: "Highlight" wird durchweg als funktionales Substantiv verwendet (Wow-Highlight, Foto-Highlight, Highlight-Produkte = Kostenkategorie) — kein Marketing-Geschwurbel. "perfekt" ist ein einmaliger lässiger Gebrauch ("passt perfekt"). Einziger echter Grenzfall: "das emotional wertvollste Mitgebsel" im FAQ — das ist genau eine der im Template explizit verbotenen Phrasen ("emotional wertvollsten"). Ein einzelner Treffer, leicht fixbar.

Ich habe jetzt alles. Letzter Check: Feuerwehr-Inhaltstiefe in den anderen Sektionen, um den Augenhöhe-Vergleich fair zu machen (Feuerwehr hat 12 games aber kaum steps — wo liegt deren Substanz?).

Profile content density across all three for fair comparison
Profile content density across all three for fair comparison

Vollständiges Bild. Safari (71KB) liegt auf Augenhöhe mit Feuerwehr (72KB), deutlich über Einhorn (56KB), und bei der games-Struktur (steps/whyItWorks) vor beiden. Genug Evidenz für das Verdict.

Adversarial Re-Review — safari-mittel.json (Safari 6-8) · Stream B
1. Score nach Rubrik
Dimension	Punkte	Begründung
Inhaltliche Tiefe	27 / 30	Steps imperativ + umsetzbar (Zeiten, Material, Altersanpassung 6 vs. 8), parentTips mit echten Zahlen ("bei 8 Kindern statistisch mind. 1 Unverträglichkeit"), sosScenarios mit konkreten Indoor-Umbauten. Abzug: ein Logik-Bug im Codewort (s.u.).
Schema-Vollständigkeit	20 / 20	preparationWeeks 6/6, sosScenarios 8/8, shoppingList[].category 43/43 gesetzt, games 9/9 mit steps[] (4-5) und whyItWorks. Lückenlos.
Story-Konsistenz	14 / 15	Ranger/Lizenz/Pirsch/Wasserloch durchziehend (Ranger 84×, Lizenz 61×, Pirsch 32×). signatureRitual mit Eid + Lizenz-Übergabe sauber. Abzug: _meta-Brückennotiz veraltet (s.u.).
Konkurrenz-Differenzierung	13 / 15	Echte Mehrwerte aus dem 5.611-Wort-HTML angekommen: kooperative Story-Spiele, 3-Tier-Einkauf mit categoryReasoning, Codeknacker-Quest. Kein Standard-Planer-Material. Abzug: Differenzierung steckt in Substanz, wird aber nirgends explizit benannt.
Bolle-Ton	8 / 10	Überwiegend lakonisch, mama-respektierend ("danach kippt die Aufmerksamkeit, lieber früher aufhören"). Abzug: 1× verbotene Phrase "emotional wertvollste".
Schema-Korrektheit	10 / 10	Valid JSON, schema_version 1.0, motto/ageGroup/ageRange (safari/mittel/[6,8]) korrekt, alle Pflichtfelder.
TOTAL	92 / 100	

Vorab zum Auftrag: eduValue existiert in keiner der drei Dateien — das Schema kennt das Feld nicht. Der Lern-/Mehrwert-Aspekt sitzt in whyItWorks (9/9 gefüllt). Kein Mangel, sondern eine Begriffsverwechslung im Briefing.

2. Drei stärkste Aspekte
Die Nachschärfung ist substanziell, nicht formal — und sie schlägt die Vorbilder. Safari: steps 9/9, whyItWorks 9/9. Feuerwehr-mittel: nur 3/12 bzw. 4/12. Einhorn-mittel: 0/9 und 0/9. Beispiel whyItWorks Tarnungs-Übung: "Erst malen, dann verstecken: das aktive Gestalten gibt jedem Kind ein Ergebnis in der Hand, bevor die schwere Disziplin Stillhalten kommt." Das ist ein pädagogisches Prinzip, keine Floskel.
parentTips mit operativer Schärfe (parentTips.structured[0]): Allergie-Tip nennt Statistik, konkreten Einladungs-Wortlaut und welche Snacks "fast immer safe" sind. Das ist Mama-relevant, nicht generisch.
shoppingList-Disziplin (alle 3 Varianten): 43/43 Items kategorisiert (pflicht/sinnvoll/habIchVielleicht) inkl. categoryReasoning — z.B. Filz-Buschhut korrekt als "sinnvoll/Wow-Highlight, aber Lizenz + Tier-Figur reicht". Ehrliche Kostentrennung statt Maximierung.
3. Fünf schwächste Stellen mit Fix
Codewort-Logik-Bug (hart, Wow-Quest "Verborgener Tempel", step 2-4). Gesammelt werden T (Pinguin streichen), F, S (Strauß), U (Pirsch). step 4 behauptet, T-F-S-U ergebe sortiert FUSS. Stimmt nicht: FUSS = F-U-S-S (zwei S, kein T). Wer das nachbaut, scheitert am eigenen Rätsel. Fix: Buchstaben so umverteilen, dass sie das Lösungswort wirklich ergeben — z.B. Station-Buchstaben auf F-U-S-S setzen (Pinguin→F, Station2→U, Strauß→S, Pirsch→S) oder ein 4-distinkt-Buchstaben-Wort wählen (z.B. "TÜR": dann Stationen anpassen). Pflicht-Fix, weil es die Kern-Mechanik des teuersten Spiels betrifft.
Verbotene Ton-Phrase (faq). "…sind aber das emotional wertvollste Mitgebsel." — exakt die im Briefing gesperrte Formulierung. Fix: ersetzen durch lakonisch, z.B. "…bleiben aber als einziges Mitgebsel über die Party hinaus in Gebrauch."
_meta.stream_c_note ist faktisch veraltet. Steht: "safari-klein/gross noch nicht eingecheckt — Brücke konzeptionell." Beide Dateien liefern aber HTTP 200 (existieren). Damit ist die Aussage zur Brücken-Konsistenz nicht mehr verifizierbar dokumentiert. Fix: note aktualisieren und Brücke gegen die jetzt existierenden Geschwister real prüfen (Helfer 3-5 → Ranger/Anwärter 6-8 → Spezialist 9-12).
Tierstimmen-Quiz zweifach, fast redundant (minimal game 2 + standard game 3). Beide "Tierstimmen-Quiz", Unterschiede nur Reihum vs. Stations-Punkte. Für eine Familie, die Minimal und Standard liest, wirkt das wie Füllmaterial. Fix: das minimal-Quiz umbenennen/leicht umbauen (z.B. "Tierstimmen-Memory am Lagerfeuer") oder explizit als "dieselbe Station, vereinfacht" framen.
Differenzierung implizit statt benannt. Der Mehrwert (kooperativ statt kompetitiv, echtes Lösungswort, Klassifikations-Lernen im Beobachtungsposten) ist da, aber nirgends steht ein Satz, der einer Mama sagt warum das mehr ist als ein Standard-Planer. Fix: in introParagraph oder ageInsight einen lakonischen Satz zum Unterschied — kein Marketing, sondern Funktion ("Stationen mit Bestehen-Logik statt Gewinner/Verlierer").
4. Story-/Schema-Konsistenz-Check
vs. Feuerwehr/Einhorn (Schema): Top-Level-Keys identisch (16/16). Game-Keys identisch. Safari ist beim games-Detail voraus — siehe Steps/whyItWorks-Coverage oben. Quantitativer Gap: Feuerwehr hat 12 games, Safari 9 (Einhorn auch 9). Safari liegt also bei der Spielanzahl unter Feuerwehr, aber gleichauf mit Einhorn — und in Tiefe pro Spiel über beiden.
klein/mittel/gross-Brücke: Nur eingeschränkt prüfbar, weil das _meta behauptet, die Geschwister seien nicht eingecheckt (falsch, s. Fix 3). Spezialist kommt in mittel 0× vor — korrekt, denn 6-8 ist die mittlere Stufe (Ranger/Anwärter). Ob die Begriffskette sauber zu klein (Helfer) und gross (Spezialist) anschließt, sollte gegen die jetzt existierenden Dateien real verifiziert werden, bevor das Tripel live geht.
Lücke vs. Vorbild: keine strukturelle. Eher umgekehrt — die Vorbilder müssten Safaris steps/whyItWorks-Niveau nachziehen.
5. Verdict

92/100 → ready, mit einer Pflicht-Korrektur vor Go-live.

Der eine Edit mit dem größten Hebel ist nicht ein Score-Treiber, sondern ein Funktionsfehler: das Codewort FUSS (Fix 1). Es kostet in der Rubrik nur ~3 Punkte, würde aber im realen Einsatz das teuerste Spiel der Wow-Variante zerlegen — ein Kind sortiert T-F-S-U und kommt nie auf FUSS. Das ist der Edit, der zuerst rein muss. Ton-Phrase (Fix 2) und meta-Note (Fix 3) sind Ein-Zeilen-Korrekturen und können direkt mitlaufen.

6. Vergleich zu Feuerwehr / Einhorn

Quantitativ: auf Augenhöhe mit Feuerwehr, über Einhorn. Safari 71,2 KB / Feuerwehr 72,5 KB / Einhorn 55,9 KB. sosScenarios, preparationWeeks, parentTips, FAQ nahezu deckungsgleich. Einziger Rückstand: Spielanzahl (9 vs. Feuerwehrs 12).

Qualitativ: über beiden — und zwar genau an der Stelle, die der Auftrag bezweifelt hat. Die strukturelle Nachschärfung ist real: Safari ist die einzige der drei mittel-Dateien mit vollständigen steps[] und whyItWorks in allen Spielen. Feuerwehr hat das in einem Viertel, Einhorn gar nicht. Wenn dieses Tripel der neue Standard sein soll, ist Safari die Referenz, an der Feuerwehr und Einhorn nachgezogen werden müssen — nicht umgekehrt.