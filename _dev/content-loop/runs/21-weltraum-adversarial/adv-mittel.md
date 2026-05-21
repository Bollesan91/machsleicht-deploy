In Arbeit
Re-fetch weltraum-mittel.json now that it should exist

Jetzt da (88 KB). Ich validiere das JSON und ziehe die Struktur sowie die Pflichtfelder aus dem Briefing heraus.

Re-fetch weltraum-mittel.json now that it should exist
Skript
Validate JSON and inspect identity fields
Validate JSON and inspect identity fields

Valide. Identitätsfelder korrekt (motto=weltraum, ageGroup=mittel, ageRange=[6,8]). Jetzt prüfe ich die Schema-Vollständigkeit gegen die Briefing-Pflichtwerte und vergleiche die Struktur mit safari-mittel.

Compare top-level structure with safari and check briefing-mandated counts
Compare top-level structure with safari and check briefing-mandated counts

Top-Level deckungsgleich mit safari. preparationWeeks=6 ✓, sosScenarios=8 ✓. Jetzt der tiefere Schema-Check: games[].steps[] (soll 4-6), shoppingList[].category, whyItWorks, plus die Variants-Struktur.

Inspect games steps, whyItWorks, shoppingList categories per variant
Inspect games steps, whyItWorks, shoppingList categories per variant

games[].steps[] alle im 4-6-Korridor ✓, whyItWorks überall gefüllt ✓. shoppingList liegt offenbar auf variant-Ebene (nicht je game) — das prüfe ich, plus ob category dort gesetzt ist. Außerdem schaue ich shoppingList-category, signatureRitual (Astronauten-Schwur + roles) und den Code-Knack-Inhalt ("Alien-Funkspruch") wegen des Briefing-Hinweises auf gruselige Sci-Fi / Codeknacker-Math.

Check shoppingList structure and category field at variant level
Check shoppingList structure and category field at variant level

shoppingList[].category vollständig ✓ (3-Tier-System wie safari). Jetzt der inhaltliche Kern: signatureRitual (Astronauten-Schwur + roles Pilot/Wissenschaftler/Funker), der "Alien-Funkspruch"-Code-Knacker (Briefing warnt vor gruseligen Sci-Fi-Themen — bei 6-8 ist Alien grenzwertig), ageInsight, parentTips und ein paar steps im Volltext.

Inspect signatureRitual full content for Astronauten-Schwur + roles
Inspect signatureRitual full content for Astronauten-Schwur + roles

signatureRitual ist stark: "Astronauten-Schwur & Lizenz-Übergabe" mit rolesList (Pilot/Wissenschaftler/Funker — exakt wie Briefing fordert), optOutNote vorhanden (wichtig für mama-respektierend). Ich prüfe den rest: rolesList vollständig, optOutNote, ageInsight, parentTips, und den "Alien-Funkspruch"-Code-Knacker (Gruselfaktor + Brücke klein↔gross).

Full rolesList, optOutNote, ageInsight
Full rolesList, optOutNote, ageInsight

Sehr stark. ageInsight ist konkret und altersspezifisch (1,3× Portionen, 20-30 Min Aufmerksamkeit, Essig/Natron-Warnung), und whyMottoFits enthält explizit die Brücke klein↔gross (3-5 = "kleiner Astronaut", 9-12 = echte Spezialisierung, 6-8 dazwischen). Das ist genau der Briefing-Check für Stream B. rolesList hat 6 Rollen (Briefing forderte mind. Pilot/Wissenschaftler/Funker — alle da, plus 3 sinnvolle). optOutNote ist mama-respektierend.

Jetzt der "Alien-Funkspruch"-Code-Knacker (Gruselfaktor-Check bei 6-8) und parentTips/sosScenarios-Qualität, plus Bolle-Ton-Stichprobe.

Inspect the Alien-Funkspruch code-cracking game in full for grusel + mechanics
Inspect the Alien-Funkspruch code-cracking game in full for grusel + mechanics

Wichtig: Der "Alien-Funkspruch" ist freundlich, nicht gruselig — Aliens senden ein Signal, das übersetzt wird zu MARS/MOND/STERN. Kein "Alien-Attack". Das Briefing-Anti-Pattern (gruselige Sci-Fi) gilt zwar primär für Stream A (3-5), aber bei 6-8 ist diese harmlose Variante sauber. Code-Knacker hat Hilfe-Karte (niemand bleibt hängen) und kooperatives Design.

Jetzt prüfe ich die Code-Wörter auf das Briefing-kritische "INSEL-Bug"-Risiko: Steht die Symbol→Buchstabe-Logik wirklich konsistent da, oder ist es nur behauptet? Bei mittel ist es simple Substitution (kein Sortier-Math wie bei gross), also geringeres Risiko — aber ich prüfe parentTips/sosScenarios-Tiefe und nehme eine Bolle-Ton-Stichprobe.

Inspect parentTips and all 8 sosScenarios for specificity
Inspect parentTips and all 8 sosScenarios for specificity

parentTips ist ein dict (nicht list) — und sosScenarios nutzt offenbar andere Feldnamen. Ich schaue die echten Strukturen an, damit ich nicht versehentlich leere Felder behaupte.

Inspect real parentTips dict and sosScenarios structure
Inspect real parentTips dict and sosScenarios structure

parentTips ist sauber strukturiert (structured + educationalValue), Tipps sind sehr konkret (Allergie-Statistik, Essig-Natron-Sicherheit, Brausetablette-Alternative). sosScenarios ist offenbar ein dict (deshalb KeyError bei [0]). Ich schaue die echte sosScenarios-Struktur — und vergleiche mit safari, weil das Schema-Konsistenz betrifft.

Inspect real sosScenarios structure and check weltraum anchors within SOS
Inspect real sosScenarios structure and check weltraum anchors within SOS

Ausgezeichnet — sosScenarios sind dict mit icon/label/headline/steps/fallback, exakt safari-konform, und durchgängig weltraum-thematisiert (Crew 13×, Stern 13×, Rakete 8×). Das ist keine Standard-SOS-Liste, sondern motto-spezifisch ausgeschrieben. Das ist genau die Differenzierung, die das Briefing sehen will.

Letzte Stichproben: Bolle-Ton (Schul-Sprache/Marketing-Phrasen?), introParagraph, faq, und ein Gesamt-Anker-Count übers ganze JSON. Dann vergleiche ich Wortvolumen mit safari/piraten.

Word volume comparison, marketing/school-phrase detector, introParagraph
Word volume comparison, marketing/school-phrase detector, introParagraph

Volumen 9.627 Wörter — sogar leicht über safari (9.334), deutlich über piraten (6.123). introParagraph ist sauber im Bolle-Ton (direkt, "du", konkret, keine Floskel-Wolke). Zwei kleine Phrasen-Flags ("garantiert" 2×, "kognitive" 1×) — ich prüfe den Kontext, um zu sehen, ob das echte Marketing-Phrasen sind oder harmlos.

Context of garantiert and kognitive flags
Context of garantiert and kognitive flags

Beide Flags sind harmlos: "garantiert ein Aaah-Moment" / "Aha-Moment ist garantiert" sind lakonische Bolle-Wendungen, kein Werbe-Versprechen. "kognitive Tiefe" steht in whyItWorks (parent-facing Begründung) und ist sachlich, nicht Schul-Sprech. Kein Abzug nötig.

Ich habe genug für die vollständige Review. Datenlage:

Schema: alle Briefing-Pflichtwerte erfüllt (prepWeeks=6, sos=8, steps 4-6, shoppingList[].category vollständig, whyItWorks überall, Top-Keys deckungsgleich mit safari)
Identität korrekt, valides JSON
Ritual mit roles-list (Pilot/Wissenschaftler/Funker + 3) ✓, optOutNote ✓
Brücke klein↔gross explizit in whyMottoFits ✓
Anker durchziehend, auch in SOS
Volumen über safari-Niveau

Hier ist die Review nach Template.

Adversarial Re-Review — weltraum-mittel.json (6-8) · Stream B

Ehrlicher Reality-Check gegen Safari (Score 92) und Piraten (89-96). Vorab Grinch-Modus: Ich habe hart getestet — JSON geparst, alle Pflicht-Counts gezählt, Anker-Frequenz gemessen, Phrasen-Detektor laufen lassen, Code-Knacker-Inhalt gelesen. Das File ist gut. Kein Pflichtgefälligkeits-Score.

1. Score nach Rubrik
Dimension	Max	Score	Begründung
Inhaltliche Tiefe	30	28	Spielanleitungen mit 4-5 echten Steps, parentTips konkret (Allergie-Statistik bei 8 Kindern, Essig→Brausetablette-Sicherheitsvariante), 8 SOS realistisch mit Fallback. Minimal-Abzug: einzelne Steps eher knapp.
Schema-Vollständigkeit	20	20	prepWeeks=6 ✓, sos=8 ✓, steps durchgängig 4-6 ✓, shoppingList[].category lückenlos (3-Tier pflicht/sinnvoll/habIchVielleicht) ✓, whyItWorks in allen 9 Spielen ✓. Top-Keys 1:1 deckungsgleich mit safari.
Story-Konsistenz	15	15	Astronauten-/Crew-/Stern-/Mond-Anker durchziehend, sogar in den SOS-Szenarien (Crew 13×, Stern 13×). Ritual altersgerecht (Schwur + Lizenz statt durchgehendem Rollenspiel).
Konkurrenz-Differenzierung	15	14	Weltraum-spezifische Mechaniken (Essig-Natron-Rakete, Symbol-Code MARS/MOND/STERN, Sternbild-Suche im Dunkeln). Klar mehr als Standard-Planer. Abzug: Quiz/Sternbild sind solide, aber nicht so unverwechselbar wie das Raketen-Experiment.
Bolle-Ton	10	9	Lakonisch, "du", mama-respektierend, optOutNote vorbildlich. "garantiert ein Aaah-Moment" ist Bolle, kein Marketing. Halber Vorbehalt: "kognitive Tiefe" in einem whyItWorks grenzt an Ratgeber-Sprech — tolerabel, weil parent-facing.
Schema-Korrektheit	10	10	Valides JSON, motto="weltraum", ageGroup="mittel", ageRange=[6,8] korrekt.
TOTAL	100	96	
2. Drei stärkste Aspekte
Die Brücke klein↔gross steht explizit im Text (Briefing-Pflichtcheck für Stream B). whyMottoFits formuliert es wörtlich: 3-5 = noch jeder "kleiner Astronaut", 9-12 = echte Spezialisierung mit Verantwortung, 6-8 = dazwischen (alle dieselbe Ausbildung, optionale leichte Spezial-Rolle). Sauber positioniert in der Reihe.
rolesList trägt das Ritual — Pilot/Wissenschaftler/Funker (exakt Briefing) plus Sternen-Sammler/Navigator/Bord-Fotograf, jede mit konkreter Funktion. Dazu optOutNote ("Spezial-Rollen sind Angebot, kein Zwang") — genau die mama-respektierende Haltung, die der Bolle-Ton verlangt.
SOS- und parentTips-Tiefe. Das Essig-Natron-Experiment wird in den parentTips real abgesichert (nur draußen/über Spülbecken, niemand beugt sich über die Dose, Brausetabletten-Variante für drinnen) und im Regen-SOS sauber verlegt. Das ist gelebte Eltern-Realität, kein Deko-Tipp.
3. Fünf schwächste Stellen mit Fix
Variant-Namen nicht ausgelesen / name-Feld unklar. Die Varianten haben id + label + headline, aber kein durchgängiges name. Fix: prüfen, ob das HTML-Template label oder name erwartet — Feldnamen-Drift gegen den Stub vermeiden.
Variant 0 (Sparvariante) hat nur 2 Spiele, Variant 1 hat 5. Das ist by-design (schnell vs. voll), aber Variant 0 könnte bei langer Party dünn werden. Fix: in costContext/intro einen Hinweis, dass Variant 0 für ~2 h gedacht ist, sonst Eltern-Erwartung verfehlt.
"Alien-Funkspruch" als Label. Bei 6-8 inhaltlich harmlos gelöst (Aliens senden ein freundliches Signal → MARS/MOND/STERN, keine Bedrohung). Trotzdem triggert das Wort "Alien" bei manchen Eltern den Grusel-Reflex. Fix: optional zu "Funkspruch vom Mars" o. ä. entschärfen — Mechanik bleibt identisch.
Code-Knacker-Inhalt ist behauptet, nicht ausgeliefert. Step 2 sagt "Die Tabelle zeigt, welches Symbol welcher Buchstabe ist" — aber die Symbol→Buchstabe-Tabelle selbst steht nicht im JSON. Fix: entweder eine konkrete Beispiel-Zuordnung (☀=M, 🌙=O, …) ergänzen oder klar als "Vorlage im Druckpaket" kennzeichnen, damit der Planer nicht ins Leere verweist.
"kognitive Tiefe" in whyItWorks. Einziger Ausrutscher Richtung Ratgeber-Vokabular. Fix: ersetzen durch etwas Konkretes wie "schwer genug, um stolz zu sein, leicht genug, dass niemand hängenbleibt" (steht teilweise schon da — den Begriff "kognitiv" einfach streichen).
4. Story-/Schema-Konsistenz-Check
Schema: Top-Level-Keys zu 100 % deckungsgleich mit safari-mittel, keine fehlenden/überzähligen Felder. Alle Briefing-Counts erfüllt. Valides JSON. ✅
Story: Anker (Astronaut/Rakete/Crew/Mission/Stern/Planet/Mond) durchziehen introParagraph, ageInsight, Ritual, alle Spiele und die SOS-Szenarien. Kein generischer Standard-Text untergeschoben. ✅
Ritual altersgerecht: Zwei-Anker-Modell (Schwur am Anfang, Lizenz-Übergabe am Ende) statt durchgehendem Dauer-Rollenspiel — passt zur 20-30-Min-Aufmerksamkeit, die das ageInsight selbst nennt. Konsistent. ✅
Kein INSEL-Bug-Äquivalent: mittel nutzt simple Substitution (kein Sortier-Math wie gross), daher kein verifizierbares Rechenrisiko. Einziger offener Punkt = fehlende Symboltabelle (Stelle 4 oben), kein Logikfehler.
5. Verdict

Score 96 → ready. Klar über der 85er-Schwelle, auf Augenhöhe mit dem Safari-Vorbild.

Da ≥85: kein Blocker. Der eine Edit mit dem größten Hebel ist trotzdem Stelle 4 — die Symbol→Buchstabe-Tabelle des Code-Knackers konkret ins JSON aufnehmen (oder explizit als Druckpaket-Verweis kennzeichnen). Aktuell verspricht der Step eine Tabelle, die nirgends existiert; das ist die einzige Stelle, an der ein Elternteil beim Nachbauen tatsächlich auflaufen würde. Alles andere ist Politur.

6. Vergleich zu Safari/Piraten (mittel)
	weltraum	safari (92)	piraten (89-96)
Wortvolumen	9.627	9.334	6.123
sosScenarios	8 (dict, motto-spezifisch)	8	—
Ritual	Schwur + Lizenz, 6 Rollen	Vorbild	Vorbild
Schema-Treue	100 % zu safari	—	—

weltraum-mittel liegt leicht über safari beim Volumen und übernimmt dessen Struktur exakt, ohne sie nur zu kopieren — die SOS-Szenarien sind eigenständig weltraum-erzählt statt generisch. Gegenüber piraten (deutlich knapper, 6.123 Wörter) ist weltraum klar reichhaltiger. Die Differenzierung läuft sauber über echte Mechaniken (Essig-Natron-Rakete, Symbol-Code, Sternbild im Dunkeln), nicht über Deko-Austausch. Einordnung: am oberen Ende der Safari-Klasse, ready für Go-Live nach dem einen Code-Tabellen-Edit.