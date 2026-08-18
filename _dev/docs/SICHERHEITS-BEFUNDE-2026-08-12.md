# Sicherheits- und Konsistenz-Befunde aller Mottos (Schwarm 12.08.2026)

> 14 Opus-Agenten, read-only, je Motto die Gate-Treffer an der Quelle verifiziert.
> 105 echte Befunde, 29 von den Agenten als Fehlalarm der Regeln markiert.
> Stufe-3-Stichprobe durch Haupt-Claude: Karotten-Widerspruch (pferde-klein),
> Hammer in der 3-5-Datei (dino-klein), Gluehbirnen-Anweisung (detektiv-gross)
> und Streichholzschachtel als Versteck (feuerwehr-gross) woertlich bestaetigt.

# Bündelung: 74 verifizierte Befunde, 11 Mottos

---

## 1. SICHERHEIT — nach Schwere

Sortierkriterium: (A) Regel/Ausrüstung existiert nirgends oder ist nicht kaufbar → (B) die gedruckte Anleitung bricht die Regel, die daneben steht → (C) Gefahrstoff im Einkauf, Regel nur auf einem anderen Blatt → (D) Verschlucken in den 3–5-Dateien → (E) Wunderkerze (Regel wird gedruckt, nur nicht am Posten).

### A — Kauf-Blocker: Schutzausrüstung ist Pflicht und steht auf keiner Liste (6)

| # | Motto/Datei | Zitat | Warum oben |
|---|---|---|---|
| A1 | **weltraum-gross** standard, games[6] | „Das ist das mit Abstand sicherheitskritischste Spiel im Programm" / „NUR Erwachsene bedienen die Pumpe — der Druck kann den Korken mit Wucht in unvorhersehbare Richtung schleudern." | Druckrakete; die 14-Posten-Einkaufsliste enthält **weder Pumpe noch Stopfen noch Schutzbrille noch Starter-Set**. Riskantestes Spiel des Dossiers, im Kaufkanal unsichtbar. |
| A2 | **weltraum-mittel** standard+wow | „Schutzbrille PFLICHT für alle in Reichweite (kein optional). Mindestabstand 2 m, nicht 2 Schritte." | „Schutzbrille" trifft in der Datei 4× — **nie in einem shoppingList-Label**. Käufer kauft die Druck-Rakete, liest am Partytag „PFLICHT", hat keine Brille. Alter 6–8. |
| A3 | **einhorn-gross** alle 3 Varianten | faq[5]: „Waschsoda (Natriumcarbonat) ist reizend für Augen und Haut — deshalb gehört eine Schutzbrille … zur Mix-Phase Pflicht." | Reizstoff ist Pflicht-Posten, Schutzbrille auf **keiner** Liste (0 Treffer). Dritter Bruch: das „Chemie-Labor" existiert in **keinem** `variants[].games` mehr — gekaufter Reizstoff ohne jedes Spiel und ohne jede Regel. |
| A4 | **ritter-mittel** wow, shoppingList[3] | Karte: „Schutzbrille pro Kind" + „Schutzbrille Pflicht." — Einkauf: „2 Bogen + Saugnapf-Pfeile + Schutzbrille" (Singular, 25 €) bei **10 Kindern** | Eine Brille für zehn Schützen. Gegenprobe ritter-gross macht es richtig („10 Schutzbrillen"). |
| A5 | **feuerwehr-gross** (4 Karten) | material: „6 'Beweise' zum Verstecken: eine Streichholzschachtel …" + prep: „Streichholzschachtel auf Fensterbank"; `safetyRule: null` in allen vier | Eltern verstecken eine **potenziell volle** Schachtel in der Wohnung und schicken 6–12-Jährige mit Lupen danach suchen. Bei der Papier-Zigarette steht die Attrappen-Ansage dabei, bei der Schachtel nicht. |
| A6 | **detektiv-gross** sosScenarios.spielzeug_kaputt.steps[2] | „Geheimschrift mit Zitronensaft schreiben und **über einer Glühbirne (Aufsicht!)** sichtbar machen." | Papier über heißer Glühbirne = Brandanweisung, und sie widerspricht dem Wärme-Default, den dasselbe Motto in der 6–8-Datei ausdrücklich setzt (Föhn/Backofen max. 80 Grad). |

### B — Die Anleitung bricht die Regel, die in derselben Karte steht (10)

Eltern lesen am Spieltag die `steps`/`prepText`/`ageAdjust`, nicht die `safetyRule`. In dieser Klasse gewinnt immer der Defekt.

| # | Motto | Regel | Anleitung, die sie bricht |
|---|---|---|---|
| B1 | **pferde-klein** std+wow, Karotten-Schatzsuche | „WICHTIG: rohe Karotten sind ein Erstickungsrisiko … werden NICHT gegessen" | steps[4]: „… **isst eine vor Ort**." Zweiter Fundort: Hufeisen-Werfen steps[3] „… und darf sie selber essen." |
| B2 | **weltraum-klein** wow, Mondsteine | „Mondsteine mindestens FAUSTGROSS, **nicht mundgängig**." | material: „Indoor-Alternative: **Walnüsse oder Korken** in Folie." |
| B3 | **pferde-klein** std+wow, Steckenpferd-Parcours | „Sprung-Stangen NICHT höher als 10 cm" (3× in der Datei) | `ageAdjust5`: „Sprung 15-20 cm" — **über** dem Limit der 6–8-Datei (max 15 cm). |
| B4 | **pferde-klein** min+std, Hufeisen-Werfen | „Wurfdistanz max 2 Meter." | prepText: „3 Pflöcke in verschiedenen Distanzen (1m, 2m, **3m**)" — plus Pflock-Zahl widerspricht dem eigenen material (1 bzw. 2). |
| B5 | **dschungel-mittel** wow | cakeRecipe: „mindestens 30 cm Abstand zu Haaren, Kleidung und **Deko**" | prep: „grünen Krepppapier-Rand am Tellerrand … Wunderkerze in Vulkan-Krater" — auf demselben Gugelhupf, keine 30 cm. |
| B6 | **ritter-mittel** wow, food | parentTips: „Niemals echte Kerzen / Fackeln bei einer Kinderparty." | food: „Stockbrot vom **Lagerfeuer** (oder Pfannen-Imitat)" — offenes Feuer als Erst-Variante für 6–8. Andere Varianten derselben Datei kommen ohne aus. |
| B7 | **einhorn-gross** prep | „nie mit Kindern allein lassen" | „Schuhkarton-Truhe mit Zahlenschloss, drinnen: … + **Wunderkerze**" — die Truhe schließen die Kinder selbst auf. |
| B8 | **feuerwehr-gross** prep | — | „Bei 9- bis 12-Jährigen ist eine Wunderkerze **unproblematisch** — sie halten von selbst Abstand." Einzige Bewertung der Datei, und sie redet das Risiko klein. Schwester-Datei formuliert es verantwortlich. |
| B9 | **piraten-gross** faq[7] | Karten-Regel deckt nur Dunkelheit ab | „Will ein Kind nicht mitlaufen: am **Lagerfeuer**/Lichtspot bleiben" — ausgerechnet das Kind, das ohne die Gruppe zurückbleibt, während der Erwachsene laut derselben Antwort mitläuft. |
| B10 | **dino-klein** (3–5!) | — | `ageAdjust8`: „Kinder müssen mit **Hammer**/Holzstäbchen den Gips aufbrechen" — steht 2× in der 3-5-Datei (Z. 312/441), sachfremd. In dino-mittel fehlt dazu jede Schutzbrillen-Regel (0 Treffer im ganzen Motto). |

### C — Gefahrstoff/Werkzeug im Einkauf, Regel nur auf einem anderen Blatt (≈20 Posten)

Alle mit wörtlichem Ersatztext aus derselben Datei belegt — reine Copy-Arbeit, kein Recherchebedarf.

- **ritter-gross** std+wow: Bogen + Pfeile, `safetyNote` fehlt (Regel: „AUSSCHLIESSLICH Saugnapf-Pfeile … Bogen NIE auf Personen").
- **pferde-gross** ×3: „Hufschmied-Material (… Gravurwerkzeug)" — Bastelhammer hinter Sammelbegriff versteckt.
- **pferde-gross** wow: „Mähnen-Styling-Set Wow + **Glitzer-Spray**" — Aerosol für 10 Kinder; eigene Regel: „NIE im geschlossenen Raum sprühen".
- **dschungel-gross** wow: Gips-Pulver (FFP2, >60 °C, „**Nicht für unter 10-Jährige**") — in der 9–12-Datei; der Ausschluss für 9-Jährige steht nicht am Kaufort.
- **dino-mittel** std+wow: Gipspulver („Verbrennung beim Abbinden >60 °C"); **dino-klein** ×2: Vulkan-Material Essig/Natron (3–5, augenreizend); **dino-gross**: Countdown lässt 8 Gips-Blöcke anrühren, **Gips steht auf keiner gross-Liste**.
- **einhorn-mittel** std+wow: Glycerin-Seife („flüssig-warm aus der Mikrowelle ~60 °C"), Pflicht-Posten, Alter 6–8.
- **detektiv-mittel** std+wow: Geheimtinte-Posten ohne Wärmeregel („BÜGELEISEN … >150 Grad = hohes Verbrennungsrisiko"); **detektiv-mittel** minimal: Zitronen gekauft, **Spiel existiert in der Variante nicht** → keine einzige Wärme-Regel in der ganzen Variante.
- **detektiv-gross** std+wow ×3: UV-Stifte/-Lampen; Augenregel existiert nur in wow.
- **meerjungfrau-gross** ×3: Sushi-Station. „Heißer Reis und Sushi-Messer sind das Hauptrisiko, nicht das Tauchen." — **und `parentTips` wird vom Paket überhaupt nicht gerendert** (kein Render-Aufruf in `paket/meerjungfrau/index.html`).

### D — Verschlucken in den *-klein-Dateien (ageRange 3–5) — heute komplett ungeprüft (≈14 Posten)

| Motto | Posten | Belastung |
|---|---|---|
| **piraten-klein** ×3 | „Schoko-Goldmünzen (Beutel)", Pflicht | Eigene Regel: „Schoko-Goldmünzen NUR am Esstisch … **NICHT im Such-Spiel der 3-Jährigen**" — und der Posten, den die Regel verlangt („Plastik-Goldmünzen"), steht auf **keiner** der drei Listen. Wer die Liste abarbeitet, kann die Regel nicht befolgen. |
| **pferde-klein** wow | „Reiter-Pins (10er)" als Mitgebsel | Offene Nadel + Kleinteil für 3–5; **an den Pins hängt keine Spielkarte** → in der ganzen Datei keine Regel. |
| **detektiv-klein** ×3 | „Schoko-Münzen (Spur + Beweismittel)", Pflicht | Regel existiert (`safetyRule`: „wegen Verschluckungsgefahr … begleiten"), steht an keinem Posten. |
| **weltraum-klein** ×3 | „Silberne Luftballons" | Regel steht im Countdown („Latex-Fetzen sind die häufigste Erstickungsursache"), nicht am Posten. |
| **dschungel-klein** ×3 | „Dschungel-Tierfiguren (12er/24er-Set)" | Gehen als Mitgebsel mit nach Hause, wo jüngere Geschwister drankommen. |
| **ritter-klein** minimal | „Wurfsäckchen 6er (**oder DIY mit Reis**)" | Aufgeplatztes DIY-Säckchen bei 3-Jährigen; Karte regelt nur die Härte, nicht die Nähte. |

### E — Wunderkerzen-`safetyNote` (15 Posten, 7 Mottos) — niedrigste Stufe

feuerwehr ×4 · dschungel ×3 · safari ×3 · einhorn ×2 · dino ×1 · weltraum ×1 · detektiv ×1. Wortlaut überall identisch, überall aus `cakeRecipe.meta.safety` derselben Datei. **Die Regel wird gedruckt** (`template.html:483`, ⚠️-Kasten auf „Seite 5 · Deko & Kuchen"), nur nicht auf dem Blatt, das man in den Laden mitnimmt. → Kein Sicherheitsloch, ein Redundanzloch. Nicht 15× von Hand.

---

## 2. KLASSEN — dieselbe Mechanik in mehreren Mottos

| # | Klasse | Umfang | Lösung |
|---|---|---|---|
| **K1** | **Wunderkerzen-`safetyNote` fehlt am Posten** | 15 Posten, 7 Mottos, identischer Wortlaut | **Generator/Renderer.** Posten-Typ „Wunderkerze/Kerze" automatisch mit `cakeRecipe.meta.safety` verheiraten. Handkopie driftet garantiert auseinander (dschungel hat sie 3×). |
| **K2** | **90-Min-minimal-Fenster trägt rechnerisch 1 Spiel, das intro verkauft 3** | **10 Mottos** (dino, dschungel, einhorn, feen, feuerwehr, meerjungfrau, pferde, ritter, safari, superheld) | **Generator, nicht 10 Handkorrekturen.** Ursache ist die fixe Last: 20 Ritual + 25 Essen-Minimum + 15 Übergabe = 60 von 90 Min. Mehrere Prüfer haben nachgerechnet, dass **Kürzen nicht hilft** — nur das Fenster löst es. Nebenbefund unabhängig vom Gate: 40 Min Essen in einer 90-Min-Party ist ohnehin unehrlich. Entscheidung gehört auf Produktebene: klein/minimal generell auf 120 Min + Copy ableiten. |
| **K3** | **Label-Stundenzahl ≠ `timeWindow`** | 11 Stellen: feuerwehr-klein ×3, feuerwehr-gross ×2, dino-klein ×3, dino-gross ×1, einhorn-mittel, feen-mittel | **Reiner Maschinen-Fix, 0 Handarbeit.** Label-Strings sind unveränderte Boilerplate aus der jeweiligen mittel-Datei (dort stimmen sie). Dauer aus `timeWindow` ableiten; Übergangs-Linter: `|Label-Dauer − Fensterdauer| ≥ 15 min = FAIL`. |
| **K4** | **Mengen driften zwischen Kanälen** (`material` ↔ `prepText` ↔ `shoppingList` ↔ `giveaways` ↔ `preparationWeeks`) | ≥8 Fälle: ritter-klein Schilde (10 gekauft/8 in der Karte/6 im prepText), ritter-mittel Schutzbrillen, pferde-klein Ponys (6 vs 10) + Steckenpferde (**6/8/10 für dasselbe Ding in einer Variante**), pferde-gross Hufeisen (8 vs 10), dino-klein Plastik-Eier (**4 verschiedene Zahlen**), safari-klein Bälle, weltraum-mittel Patches, weltraum-gross Taschenlampen | **Generator.** Ursache ist immer dieselbe: Karte aus einer kleineren Variante kopiert, Kinderzahl nicht mitgezogen. Menge als `{n:kinder}` ableiten. Einzelfix behandelt das Symptom und lässt die nächste Kopie durch. |
| **K5** | **Programmpunkt ohne Kaufposten** (Material im Spiel, nichts in der Liste) | weltraum-gross Wasserrakete, weltraum-mittel Schutzbrillen, weltraum-gross Taschenlampen, einhorn-gross Schutzbrillen, dino-klein Vulkan-Material, dino-gross Gips, piraten Plastik-Goldmünzen | **Neue Gate-Stufe — die produktivste.** Sie fängt 3 der 6 Tier-A-Fälle: ein Programmpunkt, dessen Material nirgends kaufbar ist, trägt auch nirgends eine gedruckte Regel. |
| **K6** | **Kaufposten ohne Spiel** (Gegenrichtung von K5) | detektiv-mittel minimal (Zitronen), einhorn-gross (Waschsoda, Chemie-Labor gestrichen) | Dieselbe Stufe, andere Richtung. Beide Fälle sind zugleich Sicherheitsbefunde, weil mit dem Spiel auch die Regel verschwand. |
| **K7** | **Top-level-Satelliten nennen variantenspezifische Zahlen** | dino-gross „4 Stationen" + „8 Gips-Blöcke" (minimal hat 3 Spiele und keine Ausgrabung), weltraum-mittel „6-8 Patches" bei wow=10, ritter-klein Drachen-Wurf 5× als Programm verkauft (metaDescription, Rollenkarte „Drachen-Jäger") **obwohl er in jeder Variante in der Reserve liegt** | **Renderer.** Satelliten variantenabhängig rendern oder Zahlen ableiten. Der ritter-Fall ist der ärgerlichste: ein Kind bekommt die Rolle für ein Spiel, das der gedruckte Plan nie ansetzt. |
| **K8** | **Karte kopiert, Alterskontext nicht** | dino ageAdjust8-Hammer 2× in der 3-5-Datei; pferde-klein ageAdjust5 über dem Limit der eigenen **und** der 6-8-Datei | **Gate, mechanisch:** Zahl in `ageAdjust*` darf ein in der `safetyRule` genanntes Limit nie überschreiten; `ageAdjust`-Keys müssen im `ageRange` der Datei liegen. |
| **K9** | **Verschlucken-Klasse in *-klein** (Abschnitt D) | 6 Mottos, ≈14 Posten | **Gate**, altersgekoppelt (siehe 3c). Ohne Alterskopplung rauscht die Regel in den 9-12-Dateien. |
| **K10** | **Regel steht in einem Feld, das gar nicht gedruckt wird** | `parentTips` hat in `paket/meerjungfrau/index.html` **keinen Render-Aufruf** (nur Kommentar Z. 512-513). Betrifft mindestens: meerjungfrau (Sushi-Hauptrisiko), ritter (Bogen-Backup), pferde (Glitzer-Spray). Zusatz: piraten-klein Schluck-Trait trägt als einziger `name` statt `topic` | **Renderer-Bug mit Sicherheitsfolge — vor allen Content-Fixes prüfen.** Solange das offen ist, ist jede „Regel existiert ja"-Entwarnung, die auf `parentTips` verweist, wertlos. |

---

## 3. GATE-KALIBRIERUNG

**Zuerst, weil alles andere darauf steht:**

**(0) Gate-Integrität — `_dev/scripts/check-mengen-kinderzahl.py` meldet über ALLE Mottos „0 FAIL, 0 WARN"** — auch für baustelle, wo der eigene Docstring zwei konkrete Fälle beschreibt („8 Pappschilde bei 10 Kindern; 25 Schrauben bei 10 Kindern à 3"). Die Vorfassung (137 Zeilen) rief in Z. 90 `RX_PRO_KIND_OHNE_ZAHL` auf — ein **nirgends definierter Name**, also NameError bei der ersten Karte. Die aufgeräumte Fassung (119 Zeilen) läuft durch und fängt nichts.
→ **Eine Stufe, die überall 0 meldet, ist kein grünes Gate, sondern ein blindes.** Regressionstest mit den beiden Docstring-Fällen als Fixture; kein Gate darf grün melden, bevor es seine eigenen Docstring-Beispiele fängt. Alle „0 FAIL"-Meldungen der Stufe 37 sind bis dahin ungültig.

**(a) Stufe 39 — Meldetext ist faktisch falsch.** „ohne eine einzige gedruckte Regel" stimmt für Kuchen-/Kerzen-Posten nicht: `cakeRecipe.meta.safety` **wird** gerendert (`template.html:483`). Von 5 Mottos unabhängig beanstandet.
→ Meldetext auf **„ohne Regel am Posten selbst"**, und Kerzen-/Kuchen-Posten nur noch **MINOR**. Sonst erzeugt jedes Motto mit Geburtstags-Wunderkerze einen Dauer-WARN, der die echten Werkzeug- und Klingen-Funde zudeckt. Die Stufe **nicht** entschärfen — nur den Satz.

**(b) `RX_RISIKO` triggert auf Schutzwörter statt Gefahrwörter — invertierter Blindfleck.** dschungel-gross Gips traf nur wegen „Schutzbrillen" im Label; ritter-gross Bogen genauso. **Je vollständiger die PSA eingekauft ist, desto lauter meldet die Stufe; fehlt die PSA komplett, schweigt sie** — also genau im gefährlicheren Fall. Ein Posten „Gips-Pulver + Joghurt-Becher" ohne Brille rutscht heute durch.
→ Gefahr-Token führen; Schutz-Token („Schutzbrille", „LED", „Imitat", Anführungszeichen um „Feuerstelle") nur als **Entwarnung** werten.

**(c) `RX_RISIKO` — konsolidierte Erweiterung** (aus allen Befunden, jeweils mit belegtem Fund):

| Klasse | Token | belegt durch |
|---|---|---|
| Wurf/Schuss | `Bogen(schießen)?\|Pfeil` | ritter ×3 |
| Hitze/Flamme | `Lagerfeuer\|Feuerstelle\|Fackel\|Grill\|F(ö\|oe)hn\|B(ü\|ue)geleisen\|Backofen\|W(ä\|ae)rmequelle\|Glühbirne\|Mikrowelle` | ritter, detektiv ×3, piraten |
| Chemie | `Gips\|Gipspulver\|Modellgips\|Essig\|Natron\|Waschsoda\|Natriumcarbonat\|Alaun\|Brausetablette\|Filmdose` | dino ×4, dschungel, einhorn, weltraum |
| Schmelzen/Gießen | `Glycerin-Seife\|Seife gieß\|Wachs\|Heißluft` | einhorn |
| Aerosol | `Spray\|Sprühlack\|Aerosol\|Haarlack` | pferde |
| Klinge/Küche | `Messer\|Klinge\|Schneidebrett\|heiße?r?` | meerjungfrau — **Gegenprobe vor Scharfschalten** (Buttermesser/Plastikmesser → Flächen-Fehlalarm) |
| Optik | `UV-Lampe\|UV-Stift\|UV-Taschenlampe` | detektiv |
| Sammelbegriffe | `Hufschmied\|Bastelhammer\|Gravur\|\wwerkzeug` | pferde (heutiges `Werkzeug` matcht nur als eigenes Wort/Präfix) |
| **nur `ageRange`-Obergrenze ≤ 5** | `Luftballon\|Ballon\|M(ü\|ue)nze\|Murmel\|Perle\|Knopf\|Knopfzelle\|Magnet\|Kleinteil\|Figuren\|Wackelaugen\|Pin\|Anstecknadel\|Walnuss\|Korken\|Reis\|Bohnen\|DIY` | piraten, detektiv, dschungel, weltraum, pferde, ritter |

**(d) Stufe 39 — Scan-Scope zu eng.** Liest nur `variants[].shoppingList[].label`. Gedruckte Felder außerhalb: `food`, `decoration`, `games[].material/steps/prepText/ageAdjust*`, `preparationWeeks`, `sosScenarios`, `faq`. **Sechs Befunde lagen ausschließlich dort**: ritter-Stockbrot (`food`), feuerwehr-Streichholz (`material`+`prep`), detektiv-Glühbirne (`sosScenarios`), piraten-Lagerfeuer (`faq`), pferde-Karotten (`steps`), weltraum-Mondsteine (`material`). Zusätzlich: Label gegen `games[].material` derselben Variante auflösen — sonst schützt jeder Sammelbegriff („Hufschmied-Material") den Posten vor der Stufe.

**(e) Stufe 37 — vier Lücken:**
1. `RX_PRO_KIND` kennt nur „pro/je Kind N X". Fehlend und mindestens ebenso häufig: **„N pro Kind"** (dino: „5 Eier pro Kind"), **„<Ding> pro Kind"** (ritter: „Schutzbrille pro Kind"), **„Jedes Kind hat/bekommt N X"** (safari).
2. `gesamtzahl_fuer()` nimmt bei Spannen den **Maximalwert** („15–20" → 20). Der Käufer entscheidet am Regal und nimmt im Zweifel die kleinere Packung. → **an der Untergrenze prüfen.**
3. Arbeitet kartenintern (`karte = json.dumps(g)`). Die Pro-Kind-Versprechen stehen aber in `giveaways`, `shoppingList[].categoryReasoning` und `preparationWeeks`, die zu kleine Menge in `games[].material`. → **kanalübergreifend prüfen**, top-level-Felder gegen die **größte** Kinderzahl aller Varianten.
4. Jeden „pro Kind X"-Anspruch zusätzlich gegen die `shoppingList` derselben Variante prüfen — „pro Kind X" ohne jeden passenden Posten ist derselbe Spieltag-Schaden wie eine zu kleine Zahl (weltraum-gross Taschenlampen).

**(f) Stufe 38 — stille Übersprünge.** weltraum-gross wow hat `timeWindow: "15:00–open end (Schlafparty), 10–12 Kinder"`. `RX_FENSTER` matcht nicht, `plan_und_reserve()` liefert `None`, **keine WARN-Zeile**. Damit prüft die Datei nur 2 von 3 Varianten, und die (b)-Regel („liegt in JEDER Variante in der Reserve") rechnet auf unvollständigem Variantensatz.
→ Unparsebare Fenster als **eigene Zeile** melden („Fenster nicht messbar — Variante ungeprüft, (b)-Regel unvollständig"), Feld parsebar schreiben.

**(g) Neue Stufen, die sich aus den Befunden ergeben:**
- `material`/`prepText`-Kaufdinge ↔ `shoppingList` derselben Variante diffen (K5/K6) — höchster Ertrag.
- Label-Dauer ↔ Fensterdauer (K3).
- Größte Zahl vor „cm"/„m" je Karte ↔ Obergrenze in der `safetyRule` (K8, fängt pferde B3+B4 mechanisch).
- Wenn eine `safetyRule` „nicht mundgängig"/„Kleinteile" fordert, darf das `material` derselben Karte nichts Mundgängiges nennen (fängt weltraum B2).
- Renderer-Deckung: jedes Feld, das als Regelquelle zitiert wird, muss im Template einen Render-Aufruf haben (K10).

---

## 4. WELCHES MOTTO IST AM NÄCHSTEN AM GATE

| Motto | Roh-Befunde | davon K1 (Wunderkerze) | K2 (Fenster) | K3 (Label) | **Rest nach den 3 Maschinen-Fixes** | schwerster Rest |
|---|---|---|---|---|---|---|
| **safari** | 6 | 3 | 2 | 0 | **1** | Bälle-Untergrenze (37) |
| **meerjungfrau** | 2 | 0 | 1 | 0 | **1** | Sushi ×3 (Tier C) |
| **piraten** | 2 | 0 | 0 | 0 | **2** | Goldmünzen 3–5 (Tier D) |
| **dschungel** | 6 | 3 | 1 | 0 | **2** | Gips (Tier C) |
| **einhorn** | 4 | 2 | 0 | 0 | **2** | **Waschsoda (Tier A)** |
| **feuerwehr** | 9 | 4 | 2 | 1 | **2** | **Streichholzschachtel (Tier A)** |
| detektiv | 7 | 1 | 1 | 0 | 5 | Glühbirne (Tier A) |
| ritter | 9 | 0 | 2 | 0 | 7 | Bogen/Schutzbrille (Tier A) |
| weltraum | 8 | 1 | 0 | 0 | 7 | **Wasserrakete (Tier A)** |
| dino | 10 | 1 | 1 | 1 | 7 | Gips + Hammer in 3-5 |
| pferde | 11 | 0 | 1 | 0 | 10 | Karotten/Sprunghöhe (Tier B) |

**Antwort: piraten.** Kleinste Rohzahl (2), **keine** Fenster-, Zahlen- oder Mengen-Klasse, kein Wunderkerzen-Posten, kein Tier-A-Befund. Beide Restbefunde sind punktuell und mit Wortlaut aus der eigenen Datei fixbar — plus **ein fehlender Posten** („Plastik-Goldmünzen"), ohne den die eigene Regel unbefolgbar ist.

Rechnerisch näher liegen **safari** und **meerjungfrau** (je 1 Rest nach den Maschinen-Fixes), aber mit Vorbehalt:
- **safari** trägt den Gate-Integritätsbefund (Punkt 3.0). Solange Stufe 37 überall 0 meldet, ist „safari grün" nicht belastbar.
- **meerjungfrau** hängt am nicht gerenderten `parentTips` (K10) — der Sushi-Fall ist erst gelöst, wenn das Renderer-Problem gelöst ist.
- **einhorn** und **feuerwehr** sehen mit „Rest 2" gut aus, tragen aber je einen Tier-A-Befund. Niedrige Zahl ≠ nah am Gate.

**Reihenfolge zum Schiffen:** piraten → meerjungfrau (nach K10) → safari (nach 3.0) → dschungel → einhorn → feuerwehr → detektiv → ritter → weltraum → dino → pferde.

**Ehrlicher Vorbehalt zur Zählung:** Befundzahl ist Prüfdichte, nicht Qualität. **piraten-mittel und meerjungfrau-mittel tauchen in keinem einzigen Befund auf** — vor jeder Freigabe klären, ob diese Dateien geprüft wurden oder nur nicht gemeldet haben. Ebenso sind baustelle, feen und superheld nur als Klassen-Nebenerwähnung präsent (feen-mittel wow: Label-Bruch; superheld: 90-Min-Fenster) und haben keinen eigenen Befundsatz.