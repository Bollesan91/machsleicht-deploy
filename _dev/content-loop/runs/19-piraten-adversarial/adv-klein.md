Ich hole das Briefing-Template und die Materialien.

Fetching: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/_dev/content-loop/runs/19-piraten-adversarial/adv-template.md
Fetched: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/_dev/content-loop/runs/19-piraten-adversarial/adv-template.md

Briefing klar. Ich hole jetzt alle vier Materialien für Stream A (klein).

Fetching: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/piraten-klein.json
Failed to fetch: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/piraten-klein.json

Die Raw-URLs der Materialien sind im Template referenziert, aber web_fetch lässt nur exakt vom User gelieferte oder aus Suchergebnissen stammende URLs zu. Ich nehme stattdessen bash/curl — die raw.githubusercontent.com ist in den Allowed Domains.

Fetch all four klein JSONs via curl
Fetch all four klein JSONs via curl

All four fetched. Let me validate JSON and inspect structure.

Validate JSON and list top-level keys
Validate JSON and list top-level keys

Schema-parität bestätigt. Jetzt der inhaltliche Vergleich. Erst piraten-klein im Detail.

2 Befehle ausgeführt
2 Befehle ausgeführt

Note: variants use label/id not name (that's fine, consistent within file). Now the games — the core of "Inhaltliche Tiefe". Let me extract games structure across all variants and compare to safari.

Compare games structure piraten vs safari
Compare games structure piraten vs safari

Game key parity is identical to safari — strong. But I see two concerns: (1) piraten standard has a 3-step game ("Crew am Tau"), wow has only 3 games vs safari's 4; (2) "Kompass-Schiff" repeats in all 3 variants and "Schatzspur" repeats in all 3 — some repetition. Let me read the actual step content quality and check the unique games for depth.

Read all unique piraten game steps + whyItWorks
Read all unique piraten game steps + whyItWorks

Steps are richly structured (n/name/content objects), specific, story-coherent. This is high quality. Now let me check the remaining sections: parentTips, sosScenarios (must be 8), preparationWeeks (must be 6), faq, cakeRecipe, invitationTemplate. And compare counts vs safari.

Running command
Count required sections across all four files

Counts match the rubric exactly (prepWeeks 6, sos 8) and parity with vorbilder. parentTips=2 looks like it might be a category structure. Let me read sos, parentTips, faq content for quality, plus cake + invitation.

Read sosScenarios and parentTips content
Read sosScenarios and parentTips content

sosScenarios uses key-IDs (regen, etc.) — I need to see the full object to confirm they have problem/solution text, not just keys. Let me inspect one fully, plus the rest of parentTips and faq.

Inspect full sos object structure piraten vs safari
Inspect full sos object structure piraten vs safari

sosScenarios is a dict keyed by ID, not a list. Let me handle that.

Inspect sos dict content + safari parity
Inspect sos dict content + safari parity

sos structure is identical to safari (icon/label/headline/steps[4]/fallback/tone) and content is piraten-specific and realistic. Now the remaining: rest of parentTips, faq, cakeRecipe, invitationTemplate, preparationWeeks. Let me batch them.

Read parentTips edu value, faq, cake, invitation
Read parentTips edu value, faq, cake, invitation

Wait — cakeRecipe.name is None. Let me check whether safari has a name there too (parity check), and confirm cake structure and invitationTemplate format match safari (string vs object).

Compare cake + invitation structure piraten vs safari
Compare cake + invitation structure piraten vs safari

Confirmed: safari's cakeRecipe also has no name key — so piraten's missing name is schema parity, not a defect. invitationTemplate is a string in both (CTA to generator). Full structural parity confirmed. Now let me check the variants' schedule, shoppingList categories, and the cross-age story consistency — does the ritual bridge to mittel/gross? Let me quickly check whether piraten-mittel/gross exist for the bridge check, plus shoppingList category presence.

Inspect schedule, shoppingList categories, cost context
Inspect schedule, shoppingList categories, cost context

All shoppingList items have category (rubric requirement met), affiliate tags present (machsleicht-21), schedule is detailed with time slots. The crash was just savingsTip being None on this variant — minor, let me verify it's not systematically missing and confirm the affiliate tag is correct everywhere.

Running command
2 Befehle ausgeführt

savingsTip is a rich object (title+body) in all 3 variants — good, with realistic Grinch-mode cost numbers. Affiliate tag machsleicht-21 consistent. preparationWeeks is a list of strings. Let me see it and finalize the cross-age bridge check.

Read prep weeks + check sibling files exist for bridge
Read prep weeks + check sibling files exist for bridge

preparationWeeks is also a dict, not a list. Let me read it correctly and pull the ritual names from mittel/gross for the bridge check.

Read prep weeks dict + ritual bridge across all 3 ages
Read prep weeks dict + ritual bridge across all 3 ages

The ritual bridge is clean: klein "Versprechen" → mittel "Aufnahme" → gross "Crew-Aufnahme & Schatzkarten-Übergabe". Escalating sophistication, no infantilizing of older groups, consistent "Anfang+Ende klammern" framing. The 3-5 ritual correctly avoids the Eid/Schwur (briefing check ✓). I have everything needed. Let me do one final spot-check: the "gruseliges" anti-pattern (no skeletons/ghosts) and confirm intro/meta lengths against targets.

Check meta lengths + scan for scary/gruesome terms
Check meta lengths + scan for scary/gruesome terms

Two real findings here. Let me verify context: are skelett/geist/säbel used as negations (explicitly excluded) or present in the content? And totenkopf 5x — is that on the kid (acceptable Piraten-Symbol) or scary?

Get context around scary terms to see if negated
Get context around scary terms to see if negated

All confirmed clean: every skelett/geist/säbel mention is an explicit exclusion ("komplett weg", "ohne Säbel", "alles zu viel"). Totenkopf is used only as the friendly Piraten-flag symbol on stickers/flags/muffins — standard, not gruesome. The "no scary themes" check passes fully. I have everything. Writing the review.

Adversarial Re-Review — piraten-klein.json (Stream A, 3–5 Jahre)
1. Score nach Rubrik
Dimension	Punkte	Erreicht	Begründung (1 Satz)
Inhaltliche Tiefe	30	28	Steps sind durchweg {n/name/content}-Objekte mit konkreten Anleitungen, parentTips spezifisch (Kuchen-Slot nach 45 Min., 1 Erw./1–2 Kinder), sosScenarios realistisch — minus 2, weil Wow nur 3 Spiele hat und „Crew am Tau" mit 3 Steps dünner ist als der Rest.
Schema-Vollständigkeit	20	20	preparationWeeks 6 ✓, sosScenarios 8 ✓, alle 12 shoppingList-Items mit category ✓, games[].steps[] durchgängig 3–5, whyItWorks in jedem Spiel — volle Parität zu Safari.
Story-Konsistenz	15	15	Schiff/Crew/Schatzkiste/Kompass/Goldmünzen ziehen lückenlos durch; Anfang-Ende-Klammer (Versprechen → gemeinsames Öffnen) sauber; Ritual-Bridge zu mittel/gross stimmt; KEIN Eid/Schwur für 3–5 ✓.
Konkurrenz-Differenzierung	15	13	„Crew am Tau" als Logistik-zu-Spiel-Mechanik und die konsequent kooperative Schatzteilung sind echter Mehrwert über Standard-Planer hinaus; minus 2, weil das Spiel-Set zu ~50 % Standard-Kleinkind-Mechaniken (Kommando-Lauf, Greifschüssel) ist.
Bolle-Ton	10	10	Lakonisch, mama-respektierend („der Erwachsene ist der Kompass, nicht der Aufpasser"), Grinch-Kosten ehrlich (savingsTip: 35 €→20–25 €), keine Marketing-Phrasen, keine Schul-Sprache.
Schema-Korrektheit	10	10	Valides JSON, motto/ageGroup/ageRange [3,5] korrekt, Struktur deckungsgleich mit Safari (inkl. fehlendem cake name = Schema-Parität, kein Defekt).
TOTAL	100	96	
2. Drei stärkste Aspekte
„Crew am Tau" löst ein echtes 3-5-Problem. Das whyItWorks benennt es schonungslos: „Wie bringe ich sechs Dreijährige gemeinsam von A nach B, ohne dass drei abbiegen? Aus Logistik wird ein Spiel." Das ist genau der Mehrwert, den ein generischer Planer nicht liefert.
Anti-Wettbewerb ist nicht behauptet, sondern mechanisch verankert. Goldmünzen wandern in die gemeinsame Kiste, werden sichtbar gleich verteilt; ageInsight, FAQ („Wie verhindere ich Streit ums Gold?"), parentTip und sosScenario greifen alle ineinander. Konsistent statt nur Lippenbekenntnis.
Gruselig-Check bestanden — und zwar aktiv. Skelette/Geister/Säbel kommen ausschließlich als Ausschluss vor („komplett weg", „ohne Säbel"). Totenkopf nur als freundliches Flaggen-Symbol auf Stickern/Muffins. Das adressiert die größte Falle des Mottos für diese Altersgruppe direkt.
3. Fünf schwächste Stellen + Fix
Wow-Variante hat nur 3 Spiele, Safari-Wow hat 4. Bei ~80 € / 2 Std. wirkt das dünn besetzt. Fix: „Goldmünzen-Tauchen" (existiert bereits) zusätzlich in Wow einhängen — Null Mehraufwand, hebt auf 4.
„Crew am Tau" hat nur 3 Steps (alle anderen 4–5). Fix: Einen Step ergänzen, z. B. „Anlegen — Tau loslassen, an der Station angekommen", das schließt die Mechanik sauber ab und matcht den Step-Korridor.
„Kompass-Schiff" + „Schatzspur" wiederholen sich in allen 3 Varianten. Bei minimal→standard→wow sieht eine Familie, die alle drei liest, viel Redundanz. Fix: In Wow „Kompass-Schiff" durch „Goldmünzen-Tauchen" ersetzen (siehe #1), dann ist nur noch die Schatzspur das gewollte Anker-Spiel.
metaDescription mit 238 Zeichen weit über Target (140–165). Google schneidet bei ~160 ab — „Goldmuenzen-Tauchen und Piratenschiff-Kuchen" fällt aus dem SERP. Fix: Auf einen Satz kürzen, z. B. bis „…alle finden den Schatz zusammen. Drei Varianten von 35–80 €." (~150 Z.).
title mit 41 Zeichen unter Target (50–65). Verschenkt SEO-Realestate. Fix: „🏴‍☠️ Piraten-Kindergeburtstag 3–5 Jahre — Schatzsuche ohne Wettkampf" (~62 Z.).
4. Story-/Schema-Konsistenz-Check

Volle Schema-Parität zu Safari/Feuerwehr/Einhorn (alle 16 Top-Keys identisch, sos-dict, prepWeeks-dict, savingsTip-Objekt mit title/body). Ritual-Bridge sauber: Versprechen (klein) → Aufnahme (mittel) → Crew-Aufnahme & Schatzkarten-Übergabe (gross) — eskalierende Reife ohne Verkindischung der Älteren, durchgängiges „Anfang+Ende klammern"-Framing. Keine Schema-Lücke gefunden. Einzige inhaltliche Lücke ggü. Safari: Safari-Wow bietet 4 Spiele inkl. expliziter „Mini-Schatzsuche", piraten-Wow nur 3 (siehe Fix #1).

5. Verdict

96/100 — ready. Klar über 85. Die fünf Fixes sind Politur, kein Blocker. Wenn nur einer gemacht wird: #1 (Goldmünzen-Tauchen in Wow einhängen) — löst gleichzeitig die Spielzahl-Lücke ggü. Safari und die Redundanz und kostet keine neue Content-Erstellung.

6. Vergleich zu Safari-klein (Score 97)

Auf Augenhöhe, einen Hauch drunter. Gleiche Tiefe in Steps, parentTips, sos, savingsTip-Ehrlichkeit. Piraten gewinnt bei der Ritual-Logik (kooperative Schatzteilung mechanisch dichter als Safaris Tier-Quiz). Safari liegt knapp vorn, weil (a) jede Variante voll besetzt ist (Wow = 4 Spiele) und (b) Meta-Felder im Target liegen. Schließt man Fix #1 + #4 + #5, ist piraten-klein auf 97-Niveau.