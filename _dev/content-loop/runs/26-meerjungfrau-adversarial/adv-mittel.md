Ich lese erst das Briefing.

Fetching: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/_dev/content-loop/runs/26-meerjungfrau-adversarial/adv-template.md
Fetched: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/_dev/content-loop/runs/26-meerjungfrau-adversarial/adv-template.md

Stream B = meerjungfrau-mittel.json (6-8). Ich hole das Ziel-File, das Vorbild (Safari mittel) und das Schema.

Fetching: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/meerjungfrau-mittel.json
Failed to fetch: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/meerjungfrau-mittel.json

Die Domain ist whitelisted für bash, nicht für web_fetch außerhalb der bereitgestellten URLs. Ich nutze curl.

Running command
Ziel-, Vorbild- und Schema-Dateien holen

Alle drei da. Schema zuerst, dann valide ich das JSON strukturell, bevor ich inhaltlich werte.

Running command
Schema lesen

Schema verstanden. Jetzt strukturelle Validierung beider JSONs + Feld-Coverage gegen die Rubrik.

Struktur + Feld-Coverage vergleichen
Struktur + Feld-Coverage vergleichen

Wichtig: Briefing-Rubrik fordert preparationWeeks: 6 und sosScenarios: 8. Beide sind dicts mit Keys, nicht Listen. Ich prüfe die genauen Counts + Game-Schema-Vollständigkeit + den whyItWorks-Anteil und schaue mir den eigentlichen Meerjungfrau-Content an.

Prep weeks + sos scenarios genau zählen
Prep weeks + sos scenarios genau zählen

preparationWeeks = 6 ✅, sosScenarios = 8 ✅. Jetzt Game-Schema-Vollständigkeit (steps 4-6, whyItWorks) und der inhaltliche Meerjungfrau-Content.

Running command
Game-Schema + Story-Inhalt prüfen

Alle Games schemavollständig, steps 4-5, whyItWorks überall vorhanden. 12 Rollen, geschlechtsneutral gemischt. Jetzt prüfe ich noch SOS-Tiefe, Codeknacker (falls einer existiert — Briefing markiert das als Stream-C-Pflicht, aber ich checke ob in mittel einer drin ist) und den Bolle-Ton/Differenzierung an Stichproben.

SOS-Tiefe, Codeknacker-Suche, FAQ, Ton
SOS-Tiefe, Codeknacker-Suche, FAQ, Ton

Es gibt 7 "Lösungswort"-Vorkommen — ich prüfe, ob darunter ein Codeknacker mit Anfangsbuchstaben-Logik steckt (die Stream-C-kritische Math, die laut Anti-Pattern nicht vergessen werden darf). savingsTip standard ist null — möglicher Schema-Defekt.

Kontext aller Lösungswort-Vorkommen — Codeknacker-Logik prüfen
Kontext aller Lösungswort-Vorkommen — Codeknacker-Logik prüfen

Entscheidend für die Math-Verifikation: Das Lösungswort wird nicht aus festen Anfangsbuchstaben mit Sortier-Regel hergeleitet. Es heißt "5 Buchstaben sortieren, bis das Lösungswort dasteht (z.B. SCHATZ)". Das ist offen — der Elternteil legt selbst fest, welche Buchstaben an welcher Station vergeben werden. Es gibt also keinen festen PERLE/STROM/QUALLE-Code wie in Stream C. Damit ist die Stream-C-kritische Math hier nicht anwendbar — aber es gibt einen logischen Defekt: "SCHATZ" hat 6 Buchstaben, das Spiel hat aber 5 Stationen → 5 Buchstaben. Das prüfe ich genau, das ist ein echter MUST-FIX-Kandidat.

Stationen-vs-Buchstaben-Konflikt + savingsTip null + plaintext-Felder
Stationen-vs-Buchstaben-Konflikt + savingsTip null + plaintext-Felder

Zwei harte Defekte bestätigt:

Logik-Bug Tiefsee-Quest: 5 Stationen → 5 Buchstaben, aber Beispiel-Lösungswort "SCHATZ" hat 6 Buchstaben. Das ist genau die Art Math-Inkonsistenz, die der Briefing-Anti-Pattern "Codeknacker-Math-Check vergessen" adressiert — anwendbar auf Stream B in dieser Form.
savingsTip fehlt in allen 3 Varianten (Schema sieht es vor, Safari hat es). Ich verifiziere, ob Safari savingsTip wirklich hat, damit der Vergleich sauber ist.
Safari savingsTip + Game-Vergleich verifizieren
Safari savingsTip + Game-Vergleich verifizieren

Korrektur an mir selbst: savingsTip ist auch in Safari (Score 92-97) durchgängig null — also kein echter Defekt, sondern Schema-Norm. Das streiche ich als Schwachstelle. Game-Count identisch (9). Damit habe ich genug für ein sauberes, ehrliches Scoring. Ich schreibe Stream B.

Stream B — Adversarial Re-Review: meerjungfrau-mittel.json (6–8)
1. Score-Tabelle
Rubrik	Max	Score	Begründung
Inhaltliche Tiefe	30	26	9 Spiele, alle mit steps 4–5 + whyItWorks. Mechaniken meerjungfrau-spezifisch (Muschel-Tauchen, Korallenriff-Experiment, Quallen-Tanz, Tiefsee-Quest). Abzug: 1 Logik-Bug + Großspiel-Quest etwas dünn pro Station.
Schema-Vollständigkeit	20	20	preparationWeeks 6/6, sosScenarios 8/8, shoppingList[].category 100% gesetzt, steps[] 4–6 erfüllt, whyItWorks überall. Vollständig.
Story-Konsistenz	15	14	Durchgängig Meer/Korallen/Perlen/Crew. 12 geschlechtsneutrale Rollen (Pearl, Coris, Finn, Marin… mix m/w). FAQ adressiert „nur Mädchen-Thema?" aktiv. Minimal: introTextContinued als Extra-Feld (Safari hat es nicht).
Konkurrenz-Differenzierung	15	13	Crew-Aufgaben-Framing statt „nur verkleiden", Riff-Experiment + UV-Quest heben es ab. Kein klarer Abzug, aber nicht außergewöhnlicher als Safari.
Bolle-Ton	10	9	Intro trifft den Ton („nicht nur Meerjungfrau spielen — eine Aufgabe haben"), konkrete Budgets 45/75/115 €, SOS-Sprache pragmatisch („war eh fast drinnen geplant").
Schema-Korrektheit	10	9	Valides JSON, alle Game-Felder vorhanden, null wo legitim. Abzug: Extra-Feld introTextContinued weicht vom Golden Template ab (Konsument muss es kennen).
Total	100	91	
2. Drei stärkste Aspekte
Schema 1:1 vollständig — anders als das feuerwehr/safari-Vorbild sind preparationWeeks (6) und sosScenarios (8) hier nicht TODO-Stubs, sondern voll geschrieben und strukturiert (icon/label/headline/steps/fallback/tone). Das ist über Golden-Template-Niveau.
Geschlechts-Inklusivität sauber gelöst — 12 gemischte Crew-Rollen + eine FAQ, die das „Mädchen-Thema"-Vorurteil direkt entkräftet. Genau das Risiko, an dem Meerjungfrau scheitern kann, ist abgefangen.
whyItWorks-Abdeckung 100% — jedes der 9 Spiele begründet pädagogisch, warum es für 6–8 passt. Gleichauf mit Safari.
3. Fünf schwächste Stellen + Fix
Logik-Bug Tiefsee-Quest (MUST-FIX). Spiel heißt „Die 5 Riff-Stationen", prepText und Step 4 sagen „alle fünf Buchstaben", aber das Beispiel-Lösungswort ist „SCHATZ" = 6 Buchstaben. Eltern, die das wörtlich aufbauen, haben einen Buchstaben übrig. → Fix: Beispielwort auf 5 Buchstaben ändern (z.B. PERLE, MEERE, WELLE) — oder Step 4 auf „6 Stationen" anheben (inkonsistent mit Titel, daher schlechter). Empfehlung: z. B. PERLE.
introTextContinued als Schema-Abweichung. Das Feld existiert in signatureRitual, im Golden Template (feuerwehr) und in Safari aber nicht. → Fix: Inhalt in introText zusammenführen, Feld entfernen. Sonst muss der Planer-Konsument ein Sonderfeld pro Motto kennen.
Großspiel/Quest-Stations-Rätsel bleiben generisch. Step 2 nennt „Muschel-Code knacken, Tier-Geräusche zuordnen, Perlen sortieren" — aber keine konkrete Vorgabe je Station. Eltern müssen 5 Rätsel selbst erfinden. → Fix: 2–3 fertige Stations-Rätsel ausformulieren (das ist der Punkt, wo Stream C den echten Codeknacker hat — mittel sollte wenigstens 1 konkretes Beispiel liefern).
food/decoration/giveaways weiterhin plainText. Laut README Phase-B-Ziel ist items[]. Safari ist hier identisch unstrukturiert — also kein Score-Abzug gegen Vorbild, aber ein offener Phase-B-Posten. → Fix: optional, nicht blockierend.
Wow-Variante hat nur 2 Spiele (vs. standard 5). Schema erlaubt 2–6, also formal ok, aber die teuerste Variante wirkt spielärmer als standard. → Fix: prüfen, ob die UV-Quest als „1 Spiel" zählt obwohl sie 35 Min/5 Stationen umfasst — ggf. im Schedule klarstellen, dass sie standard-Spiele einschließt.
4. Konsistenz vs. Safari/Vorbilder

Gleiche Variant-Struktur (minimal/standard/wow), gleiche Game-Anzahl (9), identisches savingsTip: null-Verhalten (kein Defekt — Safari macht es genauso), gleiche shoppingList[].category-Abdeckung. Meerjungfrau übertrifft Safari bei preparationWeeks/sosScenarios (dort Stubs, hier voll). Einzige negative Abweichung: das Extra-Feld introTextContinued.

5. Verdict

Total 91 ≥ 85 → READY, mit einer Einschränkung: Punkt 1 (SCHATZ = 6 Buchstaben bei 5 Stationen) ist ein harter MUST-FIX vor Go-Live — der Bug ist für Eltern beim Aufbau direkt spürbar. Punkt 2 (introTextContinued) ist ein Schema-Sauberkeits-Fix, der vor der Planer-Integration erledigt sein sollte. Beides sind 2-Minuten-Fixes, kein Re-Write.

6. Vergleich gleiche Altersgruppe (6–8)

Gegen Safari-mittel (92–97): inhaltlich gleichwertig, schematisch leicht voraus (volle prep/sos), aber zwei kleine Defekte ziehen es unter Safari-Niveau. Realistisch 91 vs. Safaris ~94 — derselbe Reifegrad, nur die zwei Fixes trennen sie.

Codeknacker-Math-Hinweis: In mittel gibt es keinen festen Anfangsbuchstaben-Code (PERLE/STROM/QUALLE-Logik ist Stream-C-spezifisch). Die einzige verifizierbare Math ist Stationen↔Buchstaben — und die stimmt nicht (5↔6). Math-Check also nicht vergessen: er deckt genau Defekt 1 auf.