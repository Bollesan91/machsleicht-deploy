Ich hole mir das Briefing-Template.

Fetching: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/_dev/content-loop/runs/19-piraten-adversarial/adv-template.md
Fetched: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/_dev/content-loop/runs/19-piraten-adversarial/adv-template.md

Template ist klar. Ich hole die zu reviewende Datei plus die Safari-Vergleichsdatei (gleiche Altersgruppe) und das Schema.

Running command
3 Befehle ausgeführt

Wichtiger Befund schon im _meta: purpose sagt "Dino 6-8 — Phase C #6". Copy-Paste-Leiche. Jetzt der Detailvergleich der Substanz-Felder. Erst die games-Struktur über alle Varianten.

2 Befehle ausgeführt
2 Befehle ausgeführt

Alle 9 Games haben steps[] (4-6) und whyItWorks. Das eduValue-Feld pro Spiel fehlt — aber prüfen, ob das Schema das pro Spiel verlangt oder nur global. Jetzt Safari zum Vergleich + das Schema-README.

Compare Safari games structure
Compare Safari games structure

Safari (Score 92) hat exakt dieselbe Game-Key-Struktur — 17 keys, edu ebenfalls nicht pro Spiel. Also ist eduValue pro Spiel KEIN Schema-Anforderung; es lebt global unter parentTips.educationalValue. Piraten matcht Safari strukturell. Jetzt der inhaltliche Substanztest: sind die steps echte Anleitungen oder Füllstoff?

Deep substance comparison of treasure-hunt games
Deep substance comparison of treasure-hunt games

Substanz ist da — beide Schatzsuchen sind echte Anleitungen. Aber ich sehe einen Befund: Piraten-safetyRule, ageAdjust6, ageAdjust8 sind hier None, während Safari diese Felder anscheinend füllt (17 keys). Das prüfe ich systematisch über alle 9 Games — leere Pflichtfelder sind ein echter Substanz-Gap.

Audit empty fields across all games both files
Audit empty fields across all games both files

Das ist der Kern-Befund. ageAdjust6/ageAdjust8 sind in ALLEN 9 Piraten-Games leer; prepText in allen 9 leer. Bei Safari sind dieselben Felder weitgehend gefüllt (kein einziges Game mit leerem ageAdjust). Das ist genau der Punkt, an dem Piraten unter Safari liegt. Jetzt noch parentTips, sosScenarios und das Ritual prüfen.

Inspect parentTips and sosScenarios substance
Inspect parentTips and sosScenarios substance

Befund: PIRATEN parentTips.structured = 4, Safari = 5. Ein Tipp fehlt. sosScenarios sind alle 8 voll und Piraten-spezifisch (Schwarzbart/Krummsäbel, Schatzkarten-Wärter) — sehr gut. educationalValue ist substanziell und ton-richtig. Jetzt das Ritual und die Story-Konsistenz.

Inspect ritual and story keyword consistency
Inspect ritual and story keyword consistency

Das Ritual ist exzellent — 8 echte Rollen, die direkt an konkrete Spiele andocken (Bootsmann→Knotenkunde, Schreiber→Code-Truhe, Steuermann→Schatzkarte). Brücke klein→gross explizit benannt. Story-Keywords dicht (Crew 34x, Schatztruhe 40x). Ich habe alles, was ich für ein hartes Urteil brauche. Jetzt der finale Check: Score-Felder im Schema und die Meta-Leiche.

Final schema correctness checks
Final schema correctness checks

Alles geprüft. Hier das Adversarial-Review nach Template.

Adversarial Re-Review — piraten-mittel.json (Stream B, 6–8 Jahre)
1. Score nach Rubrik
Dimension	Punkte	Begründung
Inhaltliche Tiefe	24/30	Steps sind echte Anleitungen (Code-Truhe mit 3-Ziffer-Mechanik, Reihum-Vorlesen), aber prepText ist in allen 9 Spielen leer und ageAdjust6/8 in allen 9 leer — Safari füllt beides.
Schema-Vollständigkeit	17/20	9 games mit steps[] (4–6) ✓, whyItWorks ✓, sos=8 ✓, prepWeeks=6 ✓, shoppingList[].category 100% ✓. Abzug: parentTips.structured nur 4 statt 5 (Safari hat 5).
Story-Konsistenz	15/15	Crew 34×, Schatztruhe 40×, Schiff 22×. Brücke klein→gross im introText explizit benannt. Keine Verkindischung.
Konkurrenz-Differenzierung	14/15	Zahlenschloss-Schatzsuche + Rollen-Andocken an Spiele (Bootsmann→Knoten, Schreiber→Code) ist echter Mehrwert. Knapp unter Safaris Buchstaben-Lösungswort-Quest.
Bolle-Ton	10/10	„Notiere dir selbst den Code — sonst bleibt der Schatz drin", „kein Spaß". Lakonisch, mama-respektierend, keine Schul-Sprache.
Schema-Korrektheit	9/10	Valid JSON ✓, motto/ageGroup/ageRange ✓. Abzug: _meta.purpose = „Dino 6-8 — Phase C #6 Elite-Slot (no ritual)" — Copy-Paste-Leiche aus Dino, plus „no ritual" obwohl es ein Ritual gibt.

TOTAL: 89/100

2. Drei stärkste Aspekte
Ritual rolesList — 8 Rollen, jede dockt an ein konkretes Spiel an (Steuermann→Schatzkarte, Schreiber→Code-Truhe, Bootsmann→Knotenkunde). Das ist keine Deko, das ist Mechanik. Stärker als ein generisches „alle sind Piraten".
Code-Truhe-Mechanik (standard[1]) — 7 Stationen → 3-Ziffern-Code → physisches Zahlenschloss. whyItWorks begründet das altersgerecht: „verwandelt Rätselraten in ein gemeinsames Ziel mit klarem Klick-Moment". Genau die kognitive Stufe für 6–8.
sosScenarios voll piratisiert — „Team Schwarzbart + Team Krummsäbel" beim Splitten, „Schatzkarten-Wärter" für das Kind, das nicht mitmacht. 8/8 mit Steps + Fallback, keine generischen Notfall-Floskeln.
3. Fünf schwächste Stellen + Fix
ageAdjust6 / ageAdjust8 in ALLEN 9 Spielen leer. Safari hat in keinem einzigen Spiel ein leeres ageAdjust. Das ist der größte einzelne Substanz-Gap und genau der Spread 6↔8, den die Altersgruppe braucht. Fix: Pro Spiel je 1 Satz — z.B. Code-Truhe: „6: 2-stelliger Code; 8: 3-stellig + ein Buchstaben-Hinweis."
prepText in allen 9 Spielen leer. Safari nutzt prepText für das Setting/Setup-Framing (vgl. Schatzsuche-Quest „Wilderer haben die Pläne gestohlen…"). Fix: Den Story-Aufhänger, der teils im step1 steckt, nach prepText hochziehen.
parentTips.structured = 4, Safari = 5. Ein Tipp fehlt schlicht. Fix: Fünften ergänzen, naheliegend „⏱️ Timing/Aufmerksamkeitsspanne 6-8" oder „🎁 Mitgebsel-Budget".
_meta.purpose Dino-Leiche + falsches „no ritual". Kein User-Impact, aber Pipeline-Hygiene und verrät den Copy-Paste-Ursprung. Fix: auf „Piraten 6-8 — Phase B Elite (Ritual: Crew-Aufnahme + Schatzkisten-Übergabe)".
safetyRule bei 5 von 9 leer (u.a. Seeungeheuer, Schiff beladen). Bei einem Wurf-/Tob-Spiel wie Seeungeheuer ist eine Sicherheitsregel kein Nice-to-have. Fix: Mindestens für die 2 Tob-Spiele (Seeungeheuer, Parcours) je eine Regel ergänzen.
4. Story-/Schema-Konsistenz-Check

Innerhalb der Datei konsistent: Rollen aus dem Ritual tauchen in den whyItWorks/steps wieder auf, Schatztruhe ist durchgängiger roter Faden. Die Brücke zwischen den Altersgruppen ist sauber gezogen — introText benennt explizit „zwischen Piraten-Versprechen der Kleinen und Crew-mit-Spezialisierung der 9-12". Das kann ich erst gegen die echten klein/gross-Dateien final verifizieren (nicht Teil dieses Streams), aber die Anschlussstellen sind angelegt. Gegen Safari: gleiche 17-Key-Game-Struktur, gleiche sos=8/prepWeeks=6 — strukturell deckungsgleich, bis auf die leeren prepText/ageAdjust-Felder, die Safari füllt.

5. Verdict

89/100 — ready. Über der 85-Schwelle, und das ohne Gnade: Story und Ritual tragen das.

Der eine Edit mit dem größten Hebel: ageAdjust6/ageAdjust8 in allen 9 Spielen füllen. Das ist allein ~4 Punkte (Inhaltliche Tiefe), schließt den einzigen echten Abstand zu Safari, und ist mechanisch simpel — je zwei kurze Sätze pro Spiel. Danach landet die Datei bei ~93 und ist auf Augenhöhe mit Safari.

6. Vergleich zu Safari-mittel (Score 92)

Knapp drunter, aber auf Augenhöhe in der DNA. Piraten gewinnt bei Ton (10/10) und Ritual-Integration (die Rollen-an-Spiel-Kopplung ist sauberer durchdacht als Safaris Stations-Buchstaben). Piraten verliert ausschließlich an Befüllungs-Disziplin: Safari hat ageAdjust und prepText durchgezogen, Piraten hat sie als Leerfelder gelassen. Es ist kein konzeptionelles Defizit, sondern ein Fleiß-Defizit beim Ausfüllen. Mit dem einen ageAdjust-Edit zieht Piraten an Safari vorbei.