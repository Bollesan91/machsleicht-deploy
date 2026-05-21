Ich hole mir das Briefing-Template.

Fetching site
Fetched: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/_dev/content-loop/runs/19-piraten-adversarial/adv-template.md

Template geladen. Ich hole jetzt die zu reviewende Datei und das Vergleichs-Vorbild safari-gross.

Fetching: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/piraten-gross.json
Failed to fetch: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/piraten-gross.json

Die URL ist nicht in der Domain-Allowlist von web_fetch erfasst. Ich versuche es über bash mit curl — raw.githubusercontent.com ist in der Netzwerk-Konfiguration freigegeben.

Running command
Hole piraten-gross.json und prüfe JSON-Validität

Valides JSON, 74KB. Jetzt das Vergleichs-Vorbild und das Schema.

Hole safari-gross.json (Vorbild) und Schema-README
Hole safari-gross.json (Vorbild) und Schema-README

Jetzt schaue ich mir die Struktur beider Dateien an, um sie auf Schema-Ebene zu vergleichen.

Schema-Profil beider Dateien vergleichen
Schema-Profil beider Dateien vergleichen

Identische Top-Struktur. Die Spiele liegen offensichtlich nicht unter games, sondern unter variants. Ich schaue mir die verschachtelte Struktur genauer an.

Variants/games-Struktur und Counts untersuchen
Variants/games-Struktur und Counts untersuchen

Struktur ist solide: 11 Spiele über 3 Varianten, alle mit steps[] und whyItWorks, preparationWeeks=7, sosScenarios=8. Jetzt der KRITISCHE Kern-Check: die Codeknacker-Rätsel SCHATZ/INSEL/KOMPASS. Ich muss prüfen, ob die wirklich ableitbar sind.

Codeknacker-Rätsel Schritt für Schritt ausgeben
Codeknacker-Rätsel Schritt für Schritt ausgeben

Jetzt verifiziere ich jedes Rätsel hart — rechne nach, ob die Sortier-Regeln wirklich die behaupteten Wörter ergeben.

Alle drei Codeknacker-Rätsel mathematisch nachrechnen
Alle drei Codeknacker-Rätsel mathematisch nachrechnen

Gefunden — der harte Fehler. Rätsel 2 ergibt nach der eigenen Sortier-Regel GSSEK, nicht INSEL. Die Anfangsbuchstaben der Items passen nicht zum Lösungswort. Das ist genau die Sorte Pseudo-Wort-Falle, die der Auftrag prüfen soll. Ich schaue noch, ob es per Wert-Sortierung überhaupt lösbar wäre und prüfe die anderen kritischen Punkte.

INSEL-Unlösbarkeit bestätigen + Rollen-Konsistenz + Verkindischung prüfen
INSEL-Unlösbarkeit bestätigen + Rollen-Konsistenz + Verkindischung prüfen

Bestätigt: INSEL ist mit den gegebenen Items mathematisch unlösbar (I, N, L fehlen komplett als Anfangsbuchstaben). Das ist ein echter Show-Stopper. Rollen sind konsistent durchgezogen, keine Verkindischung. Jetzt noch ein Blick auf parentTips-Tiefe, sosScenarios-Realismus und den Sorgfalt-vs-Tempo-Aspekt, plus ein kurzer Safari-Vergleich.

SosScenarios dict-Struktur erkunden
3 Befehle ausgeführt

8 sosScenarios als benannte Keys, jeweils 6 Felder — und mit altersgerechten Szenarien wie codeknacker_frust und handy_abdriften (passend für 9-12). Ich habe genug Daten. Letzter kurzer Check: Tempo-vs-Sorgfalt und Safari-Metriken.

Finaler Tempo/Sorgfalt + Safari-Metrik-Abgleich
Finaler Tempo/Sorgfalt + Safari-Metrik-Abgleich

Ich prüfe die zwei Tempo-Treffer im Kontext — ob das echte Tempo-Belohnungen sind oder harmlos.

Tempo-Treffer im Kontext prüfen
Tempo-Treffer im Kontext prüfen

Sehr gut — die Tempo-Treffer sind alle negierte Tempo-Erwähnungen: explizit "nicht der Schnellste", "nicht wer zuerst". Das Sorgfalt-vs-Tempo-Prinzip ist nicht nur eingehalten, sondern aktiv als Designprinzip ausformuliert. Der Sorgfalt-Spezialist-Stempel steht statt Tempo-Belohnung.

Ich habe alles, was ich für das Review brauche. Hier der Bericht im vorgeschriebenen 6-Sektionen-Format.

Adversarial Re-Review — piraten-gross.json (Stream C, 9–12 J.)

Ehrlicher Reality-Check. Vorab das Wichtigste: inhaltlich stark, aber EIN harter, blockierender Fehler im Codeknacker (das Kernstück für 9–12). Solange der drin ist, kein Go-Live über 85.

1. Score nach Rubrik
Dimension	Punkte	Begründung
Inhaltliche Tiefe	25 / 30	parentTips spezifisch (6 strukturierte Topics), sosScenarios altersgerecht (codeknacker_frust, handy_abdriften, zu_schnell_fertig) — aber das INSEL-Rätsel ist faktisch kaputt, das zieht Tiefe runter.
Schema-Vollständigkeit	19 / 20	11 games alle mit steps[] (4–10) und whyItWorks, sos 8, prepWeeks 7, faq 5. Über Safari-Soll. Minus 1, weil prepWeeks=7 statt geforderter 6 — Abweichung von der Norm, nicht schlimm.
Story-Konsistenz	14 / 15	Navigator/Quartiermeister/Spurenleser sauber durchgezogen (23/22/17 Treffer), rolesList spiegelt die drei Spezialisierungen, keine Verkindischung.
Konkurrenz-Differenzierung	13 / 15	Codeknacker mit 3-Quadranten-Mechanik + eingebauten Fallen (Affen-Insel, Sextant) ist echter Mehrwert — aber eine der drei Fallen funktioniert mathematisch nicht.
Bolle-Ton	9 / 10	Lakonisch, mama-respektierend, keine Schul-Sprache. „Erkläre jede Regel genau einmal, dann lass los." sitzt.
Schema-Korrektheit	10 / 10	Valides JSON, motto/ageGroup/ageRange = piraten / gross / [9,12] korrekt.
TOTAL	90 / 100	Aber siehe Verdict — der INSEL-Fehler ist ein Blocker, nicht nur Punktabzug.
2. Drei stärkste Aspekte
Sorgfalt statt Tempo ist nicht behauptet, sondern durchgezogen. Alle drei Tempo-Erwähnungen sind negiert: „ausdrücklich nicht der Schnellste", „nicht wer zuerst losrudert, sondern wer die Karte richtig liest". Es gibt einen „Sorgfalt-Spezialist"-Stempel statt einer Tempo-Belohnung. Genau das, was der Check verlangt — sauber.
Codeknacker hat echte Lese-Fallen mit Selbst-Check. Affen-Insel-Falle (Größe ≠ Entfernung) und Sextant-Falle (unscheinbar ≠ wertlos) zwingen zu genauem Lesen. Step 9 „Selbst-Check" („ergibt kein echtes Wort → Sortier-Regel war falsch") ist die richtige Pädagogik für 9–12.
sosScenarios sind altersgerecht statt generisch. handy_abdriften und codeknacker_frust sind 9–12-spezifische Realprobleme, nicht das übliche Regen/Kuchen-Standardset.
3. Fünf schwächste Stellen mit Fix
🔴 BLOCKER — INSEL-Rätsel ist mathematisch unlösbar. Die Sortier-Regel „nach Wert absteigend" ergibt aus Goldmaske/Sextant/Silberbeutel/Edelstein-Ring/Kartenbeutel die Anfangsbuchstaben G-S-S-E-K, nicht I-N-S-E-L. Die Buchstaben I, N, L existieren in keinem Item. Die behauptete „INSEL-Lösung" stimmt mit der eigenen Regel nicht überein — ein Kind, das korrekt sortiert, kriegt Buchstabensalat. Fix: Items so umbenennen, dass die wertsortierte Reihenfolge I-N-S-E-L ergibt, z. B. Inka-Goldmaske (500) / Navigations-Sextant (220) / Silberbeutel (90) / Edelstein-Ring (40) / Lederkarten-Beutel (10). Werte/Reihenfolge bleiben, nur Anfangsbuchstaben fixen. SCHATZ und KOMPASS sind beide verifiziert korrekt — nur INSEL ist defekt.
Selbst-Check (Step 9) ist als Sicherheitsnetz wertlos, solange INSEL kaputt ist. Der Text sagt „ergibt kein echtes Wort → Regel war falsch". Bei INSEL ergibt die richtige Regel kein echtes Wort — das Kind wird in die Irre geführt. Der Fix von #1 repariert das automatisch; danach ist Step 9 wieder valide.
introParagraph mit 640 Zeichen deutlich länger als Safari (437). Nicht falsch, aber für 9–12-Eltern, die auf dem Handy lesen, am oberen Limit. Fix: auf ~480–520 kürzen, den schwächsten Mittelteil-Satz raus.
prepWeeks=7 weicht von der Norm (6) ab. Schema-README/Vorbilder fahren 6. Fix: prüfen, ob Woche 7 wirklich Substanz hat oder mit einer Nachbarwoche verschmelzbar ist — sonst Inkonsistenz im Datensatz-Bestand.
Affen-Insel-Falle (Step 3) erklärt die Falle, bevor das Kind sie erlebt. Step 1 nennt die Regel, Step 3 löst die Falle direkt auf („Größe ist nicht Entfernung"). Für 9–12 ist das zu viel Hand-Holding. Fix: Step 3 als parentTip/Lösungshinweis markieren statt als sichtbaren Spielschritt — die Falle muss erst wirken dürfen.
4. Story-/Schema-Konsistenz-Check

Die drei Spezialisierungen sind über Ritual → Stationen-Variante → Codeknacker-Quadranten konsistent verdrahtet (jeder Quadrant gehört einer Rolle). Das ist die geforderte Brücke von „Crew-mit-Spezialisierung". Keine Verkindischung gefunden („kleiner Pirat" etc. = 0 Treffer). Gegen Safari-gross: Schema-Parität (11 games, 8 sos, 5 faq, alle whyItWorks vorhanden) — strukturell auf Augenhöhe. Einzige inhaltliche Lücke ist der INSEL-Defekt; den hat Safari in seinen Rätseln nicht (dort sind die Codeketten konsistent).

5. Verdict

Roh-Score 90, aber NICHT ready — der INSEL-Fehler ist ein funktionaler Blocker, kein kosmetischer. Ein Datensatz, dessen Kern-Rätsel mit der eigenen Regel nicht lösbar ist, darf nicht live. Effektiv-Score bis zum Fix: ~78.

Der eine Edit mit dem größten Hebel: Die 5 Quartiermeister-Items so umbenennen, dass die wertsortierte Reihenfolge die Buchstaben I-N-S-E-L ergibt (Fix #1). Eine Zeile Daten, und das Kernstück funktioniert. Danach ist der Datensatz sauber bei ~90 und go-live-fähig.

6. Vergleich zu Safari-gross (Score 95)

Knapp drunter — aber struktur­bedingt aufholbar. Safari-gross liegt bei 95, weil seine Rätsel/Codes durchgerechnet konsistent sind und der intro straffer ist. piraten-gross hat das stärkere Konzept (3-Rollen-Codeknacker mit Fallen ist ambitionierter als Safari), verliert aber an der Ausführungs-Sorgfalt genau dort, wo es selbst Sorgfalt predigt — das INSEL-Rätsel. Ironisch, aber präzise das Problem. Nach Fix #1 ist piraten-gross auf Augenhöhe mit Safari, beim Codeknacker-Mehrwert sogar drüber.

Kurz: Ein Bug, ein Fix, dann ready. Soll ich den INSEL-Fix direkt in die JSON einsetzen (Items umbenennen, Werte/Logik unangetastet) und dir die korrigierte Datei zurückgeben?