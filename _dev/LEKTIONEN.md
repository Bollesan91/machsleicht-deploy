# LEKTIONEN — machsleicht.de (Findings-Gedächtnis)

> Pflichtlektüre vor jedem inhaltlichen/Funnel-Output (Helfer V4.1, Stufe 0). Muster aus Review-Wellen, damit sie nicht zweimal passieren. Verworfene False-Positives → `OFFENE-REVIEW-PUNKTE.md`.

## L1 — Wizard-Controls gegen den Worker-Payload-Vertrag prüfen (15.06.2026)
**Befund:** Im Kindergeburtstag-Wizard (`kindergeburtstag.html`) sammelte Stage 4 eine Reihe Bedienelemente ein — Einladungs-Typ, Überschrift/Aufruf-Text/Antwort-Frist, URL-Slug, WhatsApp-Nr, Gästeliste-/Wunschliste-Toggles —, die im `/api/create`-Payload (`party-worker.js`) **gar nicht vorkommen**. Der Worker vergibt eine Zufalls-ID (Slug ignoriert), kennt keine Toggle-Flags und nimmt keine Custom-Texte. → Diese Controls konnten das ausgelieferte Artefakt (die Partyseite) nie beeinflussen: Auswahl-Theater + UWG-Risiko (bepreister „Print-Karten €14,90"-Button ohne Checkout).

**Warum übersehen:** Unit-Reviews (und auch der Stage-4+5-Merge) prüften jedes Teil isoliert. Der Fehler lag **zwischen** Wizard und Worker — kein Review hatte die Wizard-Eingaben gegen den tatsächlichen Worker-Vertrag diffed.

**Regel:** Bei jedem Tool, das Daten an ein Backend schickt, beim Review die UI-Controls **1:1 gegen den echten Request-Payload + die Backend-Verarbeitung** abgleichen. Jedes Control, dessen Wert nicht im Payload landet (oder vom Backend nicht verarbeitet wird), ist entweder Deko (→ ehrlich kennzeichnen/entfernen) oder muss verdrahtet werden. „Erreicht die Eingabe das Artefakt?" ist eine Pflicht-Frage im Funnel-Review-Winkel-Katalog.

**Mechanisierbar (→ Linter, sobald portiert):** onclick-Handler→Funktion-Existenz, goStage/jumpStage-Ziel-Existenz, verwaiste IDs, Default-Werte mit Datum in der Vergangenheit, hartkodierte Fristen/Daten.

## L2 — Reviewer-Modell-Fallback (15.06.2026)
Helfer-V4.1-Stufe-2-Reviewer = frischer claude.ai-Tab, **Fable 5 Hoch**. Wenn Fable 5 „currently unavailable" ist (war es am 15.06. UND 17.06.), Fallback = **Opus 4.8 Hoch** (das vorherige dokumentierte Modell). Nie WebFetch, nie Subagents als gate-entscheidender Reviewer.

## L3 — Affiliate-URLs in Motto-JSON: PLAIN `&tag=`, NICHT `&amp;tag=` (17.06.2026)
**Befund:** Beim Erstellen der Elite-Datensätze (superheld/prinzessin) hatte ich die Amazon-URLs mit HTML-entity `&amp;tag=machsleicht21-21` geschrieben. Der Wizard rendert sie via `href="${escA(s.url)}"`, und `escA→esc` ersetzt `&`→`&amp;`. Aus `&amp;tag=` wird so `&amp;amp;tag=`, der Browser dekodiert das im href zu wörtlich `&amp;tag=` → Amazon liest Parameter **`amp;tag`** statt `tag` → **Affiliate-Provision = 0**. Die 13 etablierten Dateien nutzen korrekt **plain `&tag=`** (escA macht daraus genau einmal `&amp;tag=` → Browser dekodiert zu `&tag=` ✓). Nebenbefund: `piraten-mittel.json` (live) war gemischt — 14 URLs ebenfalls kaputt, mitgefixt.

**Warum übersehen:** Mein erster Validierungs-Regex `/tag=machsleicht21-21/` matchte BEIDE Varianten. Erst der unabhängige Reviewer + die `escA`-Logik-Verifikation deckten es auf.

**Regel:** In Motto-JSON (und überall, wo eine URL durch einen HTML-Escaper in ein Attribut geht) Query-Parameter mit **rohem `&`** schreiben, nie HTML-encoded. Der Escaper kodiert genau einmal.

**Mechanisierbar (→ Linter):** `grep "&amp;tag=" data/motto/*.json` muss 0 Treffer liefern; jede `hasAffiliate`-URL muss `[?&]tag=machsleicht21-21` (plain) enthalten.

## L4 — costContext = Σ priceEur (Invariante in Elite-Datensätzen) (17.06.2026)
**Befund:** In den neuen Elite-Daten brach `costContext` ("ca. X € für N Kinder") in den wow-Varianten (und superheld-gross standard/minimal) von der Summe der `shoppingList.priceEur` ab — bis zu 40 € zu hoch. In minimal/standard stimmte es exakt → die unausgesprochene Invariante ist `costContext == Σ priceEur`, und das per-Kind = Summe/N. FAQ-Preiszeilen (dritte Zahlenebene) liefen ebenfalls auseinander.

**Regel:** `costContext`-Gesamtzahl = exakte Summe der gelisteten `priceEur`. Per-Kind = Summe/Kinderzahl. FAQ-Kostenzeile mit beiden synchron halten. Eltern müssen die Liste nachrechnen können.

**Mechanisierbar (→ Linter):** je Variante `parseInt(costContext) === Σ priceEur`; Zeitplan-Minuten-Summe === timeWindow-Spanne; `minAge ≤ Gruppen-Obergrenze` (klein 5 / mittel 8 / gross 12).

## L5 — „Fertig zum Vorlesen" muss WIRKLICH fertig sein (17.06.2026, 2. Welle)
**Befund:** Die gross-Escape-Spiele (superheld/prinzessin) waren als „fertiger Ablauf" deklariert, lieferten aber nur 1 von 3 Tresor-Ziffern konkret — Caesar-Code und Spiegelschrift sagten nur „→ erste/zweite Ziffer", ohne konkrete Botschaft, Schlüssel oder Ziffern-Mapping. Der Tresor ließ sich mit dem Ausgelieferten nicht öffnen → eltern-irreführend (MAJOR). Erste Welle hatte nur die Logik-Ziffer konkretisiert, die anderen zwei übersehen — fix-induzierte Teil-Lösung. Fix: pro Variante vollständigen Code (z. B. Caesar 'CZHL'→ZWEI→2, Spiegel-Ziffer, Logik) + Tresor-Code N-N-N ausformuliert. Caesar-Chiffren beim Schreiben SELBST nachrechnen (A→D/+3).

**Regel:** Bei einem Inhalt mit „fertig"-Versprechen: jeder Schritt, der eine Lösung *benennt* statt sie zu *liefern* (`→ erste Ziffer`, `Rätsel lösen`, `Hinweis kombinieren`), ist eine versteckte Lücke. Liefere das konkrete Material (Geheimtext, Schlüssel, Lösung, Endcode) inline.

**Mechanisierbar (→ Linter):** in gross-Escape-Steps darf kein `→ (erste|zweite|dritte) Ziffer` ohne danebenstehenden konkreten Wert stehen; je Escape-Spiel muss ein `Code \d-\d-\d` vorkommen.

## L6 — Motto-Spiele-Norm + #34-Methode (18.06.2026, piraten-Pilot)
Verbindlich für den Motto-für-Motto-Spiele-Merge (#34), erprobt an piraten:
- **Alignment vor Erfinden:** Der eigentliche „zu dünn"-Fix ist **`games[]` an `schedule` angleichen** — jedes im Tagesplan referenzierte Spiel MUSS eine Anleitung in `games[]` haben (keine Waisen). piraten-mittel-wow hatte schedule=8/games=2 → Anleitungen aus Geschwister-Varianten ziehen (verlustfrei), NICHT neue erfinden. Erst danach ggf. ergänzen.
- **Spiele-Zahl-Norm (Schatzsuche zählt als 1):** minimal **≥3** (Floor, nie unter 3) · standard **4–5** · wow **5–6** (muss ≥ standard sein). **gross = Quest-struktur** → zählt anders (eine Stations-Quest + 1–2 Aufwärmer reichen).
- **Schatzsuche-Dedup in DATEN, nicht Engine:** generische „Schatzsuche/Schatzspur" aus `games[]` weglassen (das Schatz-Modul deckt sie → sonst Doppel-Anzeige). ABER eigenständige Spiele wie gross-wow „Nacht-Schatzsuche mit Stirnlampen" BEHALTEN — deshalb kuratiert pro Motto, keine Engine-Regex (die traf „Nacht-Schatzsuche" fälschlich).
- **Orts-flexibel taggen:** Spiele wo möglich `indoor:true`+`outdoor:true` + `indoorTip`/`outdoorTip` — sonst dünnt der Ort-Filter aus. Nur echt gebundenes restriktiv (Flaggenraub = outdoor-only bewusst).
- **Wizard→Elite-Konversion (~10 Min/Spiel):** Wizard-`brief` in nummerierte `steps[]` zerlegen + `whyItWorks`, `indoorTip`/`outdoorTip`, `ageAdjust*`, `indoor/outdoor/loudness/effort/minAge` ergänzen. `material`-Array → String.
- **Safety-Lektion (Stufe-2-Befund):** Bei „Kampf"-Spielen reicht „kein Schlag auf Kopf" NICHT — **Stich/Vorstoß mit der Spitze (Augen!) explizit verbieten**, Brille sichern. **`safetyRule` darf nie schwächer sein als die `steps`** (Steps-Cap muss in die Regel). Renn-/Fangspiele: Kollisions-/Schubs-Regel ergänzen.

**Mechanisierbar (→ Linter):** je Variante `games.length`: minimal≥3, wow≥standard; jedes schedule-referenzierte Spiel hat ein `games[]`-Objekt; keine generische „Schatzsuche" in `games[]` wenn Schatz-Modul existiert.

## L7 — Reviewer-Findings aus gekürzter Spec systematisch zu hoch (18.06.2026, Batch-3 dschungel/detektiv/safari)
**Befund:** Die Stufe-2-Reviews bekommen NUR die gekürzte Spec (Varianten + abgekürzte SAFETY), nicht den vorlesefertigen JSON-Volltext. Folge: der Reviewer „erfindet" plausible MAJORs aus dem, was in der Kürzung fehlt — und liegt fast immer daneben, weil die Volldaten es längst abdecken. Batch-3-Bilanz nach Stufe-3-Verifikation gegen `data/motto/*.json`: **alle MAJORs = False Positives, 0 echte Fixes.**
- detektiv-mittel Geheimtinte „Wärmequelle kind-bedienbar" → Daten: steps sagen „Ein Erwachsener bügelt", material „(NUR Erwachsene)", safetyRule gated Bügeleisen + 1m-Abstand. Bereits sicher.
- detektiv-klein „Münzen → Echtgeld-Verschluckung" → Daten: bereits „Schoko-Münzen" + „Verschluckungsgefahr bei den Jüngsten begleiten". Reviewer hat „Echtgeld" halluziniert.
- dschungel-gross Gips „exotherm-Warnung fehlt" → Daten: bereits „Trocknender Gips wird heiß (bis 60°C) — nicht in der Hand halten".
- dschungel-gross Nacht-Insekten „heiße Lichtfalle/Brandgefahr" → Daten: 5€ LED-Schwarzlicht-Taschenlampe (keine heiße Netzlampe); Opt-In/Allergien/Stolperfallen/Wespen→indoor gedeckt.
- safari „Beobachtungsposten / Karte vermessen nicht definiert" (MAJOR) → beide SIND in `games[]` mit steps. Reviewer-Fehler in die andere Richtung.

**Regel:** Jedes Reviewer-MAJOR aus einem gekürzt-Spec-Review VOR jedem Fix gegen das volle Game-Objekt (`steps`+`material`+`safetyRule`) prüfen. „Fehlt"-Findings sind meist Kürzungs-Artefakte. Erst fixen, wenn die Volldaten die Lücke bestätigen. Count-Findings (`<3 quest`, `wow<std`) bleiben verworfen (Quest = 1). Der systemische Safety+Floor-Pass über alle 15 hat die echten Risiken bereits global geschlossen — die per-Motto-Welle fängt nur noch Motto-Spezifisches.

## L8 — Deutsches Schließ-Anführungszeichen als ASCII-" zerstört JSON-LD (23.06.2026)
**Befund:** 13 Motto-/Alters-Seiten hatten ungültiges JSON-LD: im strukturierten Daten-`text` war das Öffnungszeichen korrekt `„` (U+201E, literal ODER escaped `„`), das Schließzeichen aber ein ASCII-`"` (U+0022) statt `"` (U+201C). Das `"` beendet den JSON-String vorzeitig → `JSON.parse`/Google-Parser bricht ab → **Rich-Results (FAQPage/HowTo) gehen verloren.** Vorbestehend, NICHT von der aktuellen Änderung — aber Recovery-relevant (kaputte strukturierte Daten = Qualitätssignal genau während der De-Index-Erholung). Vom Deep-Validator `validate.js` (Gate 2) gefangen, nicht vom Standard-`validate-all.sh`.

**Warum übersehen:** Sichtbare Prosa rendert mit ASCII-`"` völlig normal — nur der JSON-Parser stolpert. Fällt im Browser nie auf, nur in einem echten JSON-LD-Parse-Test.

**Regel:** In JSON-LD-Blöcken deutsche Zitate immer `„…"` (U+201E … U+201C), NIE `„…"` mit ASCII-Schließer. Fixer: `_dev/scripts/fix-jsonld-quotes.py` (operiert nur in `<script type=application/ld+json>`, `json.loads`-Assert VOR jedem Write, behandelt literal-`„` UND escaped-`„`).

**Mechanisierbar (→ schon mechanisiert):** `node validate.js` Gate 2 parst jeden JSON-LD-Block — muss 0 „Ungültiges JSON-LD" liefern. Vor jedem Deploy mit JSON-LD-Edits laufen lassen.

## L9 — Review-Input + Keyword-Matching: zwei Fehlerquellen bei #34-Spiele-Safety (24.06.2026)
**Befund A (Reviewer-Input):** Konsolidierter claude.ai-Review für Spiele-Safety. Erste Runde gab nur Name+Beschreibung OHNE `safetyRule` → Reviewer flaggte „Ballons/Parkour MAJOR Sicherheit", obwohl die safetyRules existierten (Verschluckung/Aufsicht). **L7 in neuer Form.** Zweite Runde MIT safetyRules → echte, spezifische Funde (Gips-Handabdruck-Verbrennung >60°C, Parcours-Socken-Rutsch, Schleier-Strangulation, Reis-in-Nase). **Regel: bei Safety-Review IMMER die `safetyRule` mitgeben, sonst nur False-Positives.** Auch: Namens-Fehlalarme verifizieren („Tauch-Synchronisation" klang nach Luftanhalten, ist Signal-Reaktionsspiel → harmlos).

**Befund B (Keyword-Substring):** Systematische safetyRule-Härtung per Keyword über 654 Spiele. Substring-Matching feuerte falsch: `reis`→„K**reis**/**Reis**e/**Preis**", `tanz`→„Dis**tanz**", `tuch`→„Dreiecks**tuch**" (Verband!), `parcours`→„spuren-parcours"-Übergangstext in fremdem Spiel, `vulkan`→Vulkan-Hindernis-Prop ohne Essig. **Regel: Gefahr-Keywords NICHT als nackten Substring über steps/material — entweder am Spiel-NAMEN ankern (parcours/tanz/schleier) oder Wortkontext fordern (reisk/reis+wanne; vulkan+essig/natron).** Iterativ per „nicht-offensichtliche Matches"-Scan (Name ohne Keyword, aber Klausel da) verifizieren bis 0.

**Mechanisierbar:** `_dev/scripts/auto-curate-games.py` (Varianten std→5/wow→6 aus Datei-Pool, minAge-Filter, Format-erhalten) + `safety-harden-games.py` (keyword-/namens-gekoppelte Klauseln). Beide format-erhaltend (minified bleibt minified, s. schedule-Vorfall).

## L10 — Tap-getaktete Story-Outros im Playtest in EINEM async-Block prüfen, sonst feuern die Fallback-Timer im Test-Gap (06.07.2026, Schmiede #10/#11)
**Befund (korrigiert):** Beim Verifizieren des 2-Beat-Twist-Outros sah es aus, als würde EIN Tap zwei Beats überspringen (Beat 1 weg, direkt Karte). Erste Hypothese war ein Event-Bubbling-Bug (Gewinn-Tap bubbelt in den `#s-game`-Advance-Handler). **Das war eine Fehldiagnose.** Ursache war das TEST-VORGEHEN: Ich hatte den Spiel-Antrieb und die Outro-Taps auf ZWEI getrennte `javascript_tool`-Calls verteilt. Zwischen den Calls vergehen real oft >11 s Wall-Clock (mein Reasoning + Round-Trips) → der 11s-/14s-**Fallback-Auto-Advance-Timer** (`setTimeout(advanceOutro, 11000)`) feuerte im Gap von selbst und schob einen Beat weiter; mein expliziter Tap schob den nächsten → sieht aus wie Doppel-Advance. Beweis: dieselbe Sequenz in EINEM async-Block mit gewrapptem `advanceOutro`-Zähler ergab sauber **1 Tap = 1 Advance** (Beat 1 → Beat 2, kein Skip). Die Outro-Logik ist korrekt — Grace (1150 ms) + `outroStep` erst verzögert gesetzt schützen den Gewinn-Tap; Handler auf dem Spielcontainer (`#board`/`#field`) ist okay.

**Regel:** Tap-getaktete Outros IMMER als vollständige Sequenz (win → Beat 1 → Tap → Beat 2 → Tap → Karte) in EINEM `javascript_tool`-Call testen. Nie den Reveal-Zustand in Call A capturen und die Taps in Call B schicken — der Fallback-Timer verfälscht das. Bei Verdacht `advanceOutro` mit einem Aufruf-Zähler wrappen (globale `function`-Declaration → Reassign via `window.advanceOutro` greift) und asserten: 1 Tap ⇒ genau 1 Advance.

**Nebenbefund:** signal-superheld bekam unter der falschen Hypothese den Advance-Handler auf `#screen` (statt `#s-game`) verschoben — harmlos, funktioniert, blieb drin. Nicht als Muster verallgemeinern; der Grund war der Test-Artefakt, nicht Bubbling.

## L11 — ChatGPT-Zweitgutachter (Doppelcheck) korrekt anbinden: Gist mit Zeilen-Markern + Websuche + Trusted-Key-Send (06.07.2026)

**Kontext:** Zusätzlich zum claude.ai-Reviewer (Stufe 2) soll jeder Gate-Kandidat auch durch einen ChatGPT-Tab (GPT-5.5 „Hoch"/Thinking) laufen — Ziel: unabhängiger Blickwinkel. Der Aufbau hatte drei Fallstricke, alle empirisch geklärt (Bolle-Idee für die Lösung):

**Fallstrick 1 — ChatGPT fetcht gar nicht, HALLUZINIERT stattdessen.** Ohne aktives Web-Tool ruft GPT-5.5 keine URL ab; statt das zu sagen, rekonstruiert es plausiblen Code aus der Mechanik-Beschreibung (das war die frühere „tatort `it.c?''`-Halluzination" — es hatte den Code nie gelesen). **Ursache: „Websuche" ist ein per-Nachricht-Toggle im „+"-Menü und standardmäßig AUS.** → Vor jeder Review „Websuche" aktivieren (Pill „Websuche" muss im Composer sichtbar sein).

**Fallstrick 2 — selbst MIT Websuche liest ChatGPT rohen Quellcode nicht sauber.** `raw.githubusercontent.com` liefert `text/plain` → ChatGPTs Web-Renderer **kollabiert alle Zeilenumbrüche zu EINER Zeile** → echte Zeilennummern gehen verloren → geraten. `github.com/…/blob/…` ist noch schlimmer (nur ~24 statt 175 Zeilen, lazy-loaded). → **Lösung (Bolle): den Code als GitHub-Gist mit kollisions-sicheren Zeilen-Markern hosten** — jede Zeile mit einem Marker präfixiert (H=game-HTML, J=core.js, C=core.css). Die Marker überleben den Zeilen-Kollaps als Text → ChatGPT zitiert die Fundstelle über den Marker. **WICHTIG — Marker-Format: `@@H12@@`, NICHT `<H12>`.** Spitze Klammern werden von ChatGPTs Web-Renderer als **HTML-Tags interpretiert und ausgeblendet** (ChatGPT meldete das selbst: „die Webansicht interpretiert `<H..>` als HTML-Tags und blendet sie aus"). `@@Hn@@` ist reiner Text → bleibt erhalten. Bundle = Rubrik + markierter Code in EINER Gist-Datei, damit die gesendete Nachricht kurz bleibt (nur „Fetch + Review nach der Datei: <gist-raw-url>"). Bau-Skript: `awk '{printf "@@H%d@@ %s\n", NR, $0}' game.html` je Datei (J/C analog); Gist via `gh gist create`. Im Prompt explizit sagen: „die @@Hn@@ sind KEINE HTML-Tags, sondern Zeilen-Marker".

**Fallstrick 4 — GPT-5.5 „Hoch" stallt nach dem Plan-Satz.** Gibt oft nur „Ich hole zuerst das Bundle und prüfe dann …" aus und stoppt (streaming endet). → Im Prompt „gib SOFORT das vollständige Gutachten aus, keine Vorrede, kein Zwischenstand" fordern; falls es trotzdem stoppt, mit „Gib JETZT das vollständige Gutachten aus" nachschieben.

**Fallstrick 3 — Text ins ChatGPT-Eingabefeld bekommen.** ChatGPTs Composer ist ein **ProseMirror**-Editor; JEDE synthetische JS-Injektion (`execCommand('insertText')`, synthetic `paste`-Event, `form_input`) landet NICHT im PM-Modell (sichtbar im DOM, aber leer gesendet → ChatGPT bekommt eine leere Nachricht). **Nur echte (trusted) Tastenanschläge greifen.** Zuverlässige Sende-Recipe über die Chrome-Extension:
1. `computer screenshot` (bringt den Tab OS-**frontmost** — Pflicht, sonst geht `type` ins Leere)
2. `computer left_click` auf den Composer (Fokus)
3. `computer type` <kurze Nachricht> → verifizieren: `#prompt-textarea > p`.textContent-Länge muss passen (NICHT nur `innerText`; ein nackter Textknoten außerhalb `<p>` zählt nicht)
4. `computer key Return` (senden)
5. Ernte: JS-Extraktion aus `[data-message-author-role="assistant"]`, „GitHub"-Chip-Zeilen filtern, Query-String-Zeichen `[?&=;]` sanitisieren (sonst blockt das Tool die Ausgabe). GPT-5.5 stoppt oft nach einem Plan-Satz → mit „Gib JETZT das vollständige Gutachten aus, keine Vorrede" nachschieben.

**Fallstrick 5 (Extractor-Kürzung) + LÖSUNG (Bolle-Idee, 06.07.) — Code in WENIGE physische Zeilen PACKEN.** ChatGPTs Web-Extractor kürzt gefetchte Dateien auf **~66 physische Zeilen** (nicht inhaltsbasiert — es zählt Datei-Zeilen). Ein zeilenweise markiertes Bundle (~335 Zeilen) kommt so nur fragmentiert an → ChatGPT verweigert korrekt („66 extrahierte Zeilen … ohne Rohzeilen würde ich erfinden → NO-GO"; die „erfinde nichts"-Regel greift). **FIX: die `@@Hn@@`-markierten Code-Zeilen zu ~8 Einträgen pro PHYSISCHER Zeile packen** → alle ~337 Code-Zeilen passen in ~48 physische Zeilen < 66 → der Fetch liefert ALLES, die Marker halten die Zeilenstruktur. **Verifiziert 06.07.: regenbogen gepackt (48 Zeilen) → ChatGPT „Ich sehe @@H175@@, @@J92@@, @@C70@@, Code vollständig" → vollständiges code-genaues Gutachten (GO m. Auflage 84/100), fand u.a. den bekannten setPhoto-onload-Fehler unabhängig wieder.** Bau-Skript: markierten Stream mit `awk`/python in 8er-Gruppen je Zeile falten, Rubrik oben, als EINE Gist-Datei, `gh gist edit --add`. Damit ist der vollautomatische ChatGPT-Doppelcheck praktikabel — kein Tippen, kein Paste nötig.

**Regel (Stufe 3 unverändert):** ChatGPTs Score/Verdikt sind NIE gate-entscheidend (systematisch härter + gelegentlich falsche Zitate). Jeden ChatGPT-Fund gegen den echten Code verifizieren; Wert = der abweichende Blickwinkel, nicht die Präzision. claude.ai bleibt der maßgebliche Reviewer.

**Mechanisierbar:** Skript `build-review-gist.sh <spiel>` (markiertes Bundle bauen + `gh gist edit --add` + raw-URL ausgeben). Gilt sinngemäß für machsruhig (dort Helfer V4.1 `_dev/HELPER-V4.1.md` ergänzen, sobald das Repo in Session ist).

## L12 — Diff-Re-Check im selben Chat inflationiert ~+26 Punkte (12.07.2026, Einladungs-Entität)
**Befund:** Der Abnahme-Re-Check im SELBEN Fable-Chat wie das Erst-Audit bescheinigte der Entität „~72". Ein frischer, target-blinder Tab (gleicher Winkel-Katalog, gleicher Stand, keine Fix-Info) urteilte **46** — und bestätigte zugleich explizit, dass Technik/Verlinkung/Titles sauber sind. Der Kontext-Reviewer bewertete seine eigenen Empfehlungen als erfüllt (Checklisten-Modus), der frische maß die Substanz am Markt (45 Vorlagen bei sendasmile vs. unsere 10; 70-89 % Template-Anteil).
**Regel:** Diff-Re-Checks im selben Chat sind NUR für „wurde Finding X mechanisch korrekt umgesetzt + fix-induzierte Regressionen" zulässig (dafür sind sie stark: R1-Blocker-Fund!). Der GATE-SCORE kommt IMMER aus einem frischen, target-blinden Tab. Bolle-Catch 12.07.

## L13 — Live-Fetch-Reviewer sehen gecachte/gekürzte Stände: Zähl- und „fehlt"-Findings IMMER selbst gegen frisches curl verifizieren (13.07.2026, Funnel-Gate)
**Befund:** Frisches Fable-Gate direkt nach einem Deploy lieferte 4 MAJORs, die am echten Live-Stand widerlegt waren: „Tools zeigen 10 statt 15 Mottos" (gezählt wurden exakt die ERSTEN 10 im DOM — Truncation-/Cache-Muster), „Creator ohne Spielauswahl", zitierte Alt-H1 („Einladung erstellen") und Alt-Strings („In 30 Sekunden fertig!"), die Stunden zuvor ersetzt worden waren. Ursache: das Fetch-Tool des Reviewers cached bzw. kürzt — der Reviewer arbeitet dann korrekt, nur auf falscher Datenbasis. Der parallel laufende ChatGPT-Zweitgutachter zählte am frischen Stand korrekt 15/15 + 2 Spiele → Kreuz-Check deckte das Muster auf.
**Regel:** Nach Deploys gilt für Live-URL-Reviews: jedes Zahlen-, Zähl- oder „fehlt auf Seite X"-Finding VOR dem Fix per eigenem curl/grep am Live-HTML verifizieren (L7-Logik, auf Live-Fetches erweitert). Strukturelle Findings (Widersprüche IN einem Dokument, tote Pfade, fehlende Rechtstexte) sind davon meist unberührt — die waren alle echt. Zweiter unabhängiger Fetcher (ChatGPT) ist als Konsistenz-Kreuzcheck Gold wert.

## L14 — esbuild/wrangler prüft KEINE freien Bezeichner in Template-Literalen: Render-Smoke ist Pflicht nach jedem Template-Edit (17.07.2026, Welle 10)
**Befund:** Ein W9-Fix setzte `${(isEditor||invite)?…}` in den Gast-Head — `isEditor` existiert aber nur in `partyPage`, nicht in `guestPageFull`. Syntaktisch valide → `wrangler deploy --dry-run` GRÜN, aber zur Laufzeit ReferenceError → **jede Gastseite, jeder ?g=-Link, jede Preview wäre 500 gewesen** (das Kernprodukt tot). Gefunden hat es erst der frische Welle-10-Reviewer; wäre fast als „Fix" Richtung Deploy gelaufen.
**Regel:** Nach JEDEM Edit an Worker-Template-Literalen (Heads, Seiten-Funktionen): wrangler dev starten und ALLE Seitenvarianten echt rendern (Gast, Gast+?g=, Editor, Editor+preview, 404) — Status 200 + greifbarer Marker-String. Der Dry-Run-Build beweist NUR Syntax, nie Scope. Zusätzlich gerenderte `<script>`-Blöcke extrahieren und `node --check`en. wrangler dev crasht auf Windows gelegentlich (libuv) — dann neu versuchen statt den Smoke stillschweigend auszulassen (genau diese Auslassung hat den 500er kaschiert).

## L15 — claude.ai-Sends sterben still, wenn die Chrome-Tab-Gruppe während des Sends aufgelöst wird (17.07.2026, W10/A3)
**Befund:** Zwei Review-Prompts zeigten direkt nach dem Enter `streaming:true`, liefen aber NIE an — beim nächsten Öffnen stand „Your previous message wasn't sent" und der Prompt lag noch im Editor. Ursache: die MCP-Tab-Gruppe wurde unmittelbar nach dem Send aufgelöst (tabs_create/close-Kaskade), das killt den laufenden Request. Ein einmaliger streaming-Check direkt nach dem Send reicht als Beweis NICHT.
**Regel:** Nach jedem Send: streaming-Check. Nach JEDER späteren Tab-Gruppen-Operation (create/close/Neuaufbau): die laufenden Review-Chats erneut per URL öffnen und auf „wasn't sent" prüfen — der Prompt liegt dann noch im Editor und lässt sich mit focus+2×Enter direkt nachsenden.

## L16 — "Das Spiel gibt es gar nicht" ist erst bewiesen, wenn ALLE Felder durchsucht sind, nicht nur `variants[].games[]` (12.08.2026, Maschinen-Abnahme)
**Befund:** Ein Schwarm-Agent hing an `einhorn-gross` „Rotkohl + Essig + Natron + Waschsoda" eine Regel („jedes Kind trägt in der Mix-Phase eine Schutzbrille"). Ich prüfte `variants[].games[]`, fand keine Chemie-Station, erklärte die Regel für **erfunden und löschte sie** — inklusive der Feststellung, hier würden Eltern 5 € für nie benutzte Chemikalien zahlen. Beides falsch: die Station steht in `preparationWeeks.minus2Weeks/minus1Day` („Rotkohl-Saft + Essig (rot) / Natron (blau) / Waschsoda (grün) als Demo", „Rotkohl-Saft kochen … separat aufstellen"), und die Regel stand wörtlich in `faq[5]`: „deshalb gehört eine Schutzbrille … zur Mix-Phase Pflicht". Der Agent hatte sauber abgeleitet; mein Gegen-Check war der Fehler. Aufgefallen ist es nur, weil nach dem Löschen Stufe 39 anschlug und ich beim Formulieren einer Ersatz-Regel `grep Waschsoda` über die GANZE Datei laufen ließ.
**Regel:** Bevor eine gedruckte Aussage als „erfunden/ohne Grundlage" verworfen wird, ist eine Volltextsuche über die komplette Quelldatei Pflicht (JSON-Pfad-Dump, nicht nur die naheliegende Liste). Programm-Wahrheit verteilt sich hier über `games`, `preparationWeeks`, `faq`, `parentTips`, `signatureRitual`. Merksatz: **Der Reviewer irrt in beide Richtungen — der Gegen-Check auch.** Zweitbefund derselben Runde: `faq` wird vom Paket NICHT gedruckt, deshalb war die Pflicht-Schutzbrille für Käufer unsichtbar und stand auf keiner Einkaufsliste → daraus wurde Linter-Stufe 41 (gedruckte Regel darf nur Ausrüstung verlangen, die auch im Einkauf steht).

## L17 — Ein Gate, das die Quelle misst statt das Produkt, misst die falsche Größe (13.08.2026, freie Seiten)
**Befund:** Stufe 42 verglich die freien Ratgeberseiten gegen `data/motto` — „druckt die Seite die Regeln des Katalogs?" — und meldete 39 WARN. Die ehrliche Zahl war eine andere: die freien Seiten führen ein **eigenes Sortiment**. Gemessen am Produkt (jeder verkaufte riskante Posten braucht eine Regel) waren es 46 Fälle, darunter Ballons auf 29 Seiten, eine Wunderkerze in der Backanleitung einer 3–5-Seite und drei Seifenblasenmaschinen — Waren, für die der Katalog gar keinen Posten hat und die deshalb in der alten Zählung **unsichtbar** waren. Dieselbe Stufe zählte obendrein den Substring `shop-safe` und wertete damit die CSS-Regel im `<style>` als „gedruckt", und ihr Guard `'Einkaufsliste' in html` traf CTA-Fließtext auf vier Seiten ohne jede Liste.

**Regel:** Ein Gate fragt „hat das ausgelieferte Ding die Eigenschaft?", nie „stimmt es mit einer Quelle überein". Der Quellvergleich findet nur, was die Quelle schon kennt — das ist dieselbe Blindheit wie das Vokabular, das aus den gefundenen Fällen gebaut ist (Stufe 39, 12.08.). Zähl außerdem nie einen Substring, wenn du Markup meinst.

## L18 — Fuzzy-Matching hat bei Sicherheitstexten nichts zu suchen (13.08.2026)
**Befund:** Der Renderer ordnete Regeln per Teilstring zu, wenn kein wortgleicher Posten existierte. Ergebnis im Trockenlauf: die Ballon-Regel („Geplatzte und nicht aufgeblasene Ballons sofort einsammeln") landete unter dem Posten **„Atlantis-Girlande"** — weil dessen Name im Bündel „Girlande + Luftballons" steckt. Eine Regel am falschen Posten ist schlimmer als eine fehlende: die fehlende fällt im Gate auf, die falsche liest sich wie geprüfte Information.

**Regel:** Automatisch zugeordnet wird nur bei **normalisierter Gleichheit**. Alles andere braucht einen belegten Eintrag in einer Zuordnungsdatei, mit Fundstelle. Teilstring-Kandidaten dürfen im Bericht als Vorschlag erscheinen — nie als Zuweisung.

## L19 — Zwei eigene Fehler, beide sofort von der Maschine gefangen (13.08.2026)
**(a) Variablen-Shadowing:** In der Klassenregel-Schleife hieß die Regel-Variable `text` — genau wie das HTML-Dokument. Der Lauf schrieb daraufhin den Regeltext als ganze Seite: 46 Dateien auf 1,5 kB gekürzt. Gefangen hat es der **Idempotenz-Lauf im selben Atemzug** (198 offen statt 0, 60 statt 1488 Posten), Wiederherstellung per `git checkout` ohne Verlust. Ohne den zweiten Lauf wäre das committet worden.
**(b) Alternation ohne Klammer:** Der Schutz gegen „ohne Wunderkerze"-Labels lautete `r'ohne\s+\w{0,12}' + muster` — bei `muster = 'led-?kerze|teelicht|lichterkette'` zerfällt das in drei Alternativen, und „Lichterkette" traf sich selbst. Folge: genau die Deko-Posten blieben ungeregelt, die die Regel am nötigsten hatten. Gefangen von Stufe 42.

**Regel:** Jede zusammengesetzte Regex, die eine fremde Musterzeichenkette einbettet, wird geklammert (`(?:…)`). Und: der Idempotenz-Lauf ist kein Formalismus, sondern der billigste Selbsttest, den die Maschine hat — er läuft VOR dem Commit, nicht danach.

## L20 — Ein rate-limiteter Host beantwortet die Frage nicht, die man ihm stellt (17.08.2026, Gate B)
**Befund:** Im Gate-B-Prüfauftrag stand `kindergeburtstag/piratengeburtstag-6-8-jahre.html` als Beispielseite für den Gutachter. Die Datei heißt `piraten-6-8-jahre.html` — der Pfad hat nie existiert. Die Pflicht-Verifikation („jede raw-URL vor dem Absenden auf 200 prüfen") lief und schlug an, aber mit **429 für alle fünf URLs**, weil raw.githubusercontent.com den ganzen Ausgang gerade rate-limitete. Ein 429 sieht aus wie ein Infrastruktur-Problem und wurde auch so behandelt (warten, Fallback-Hosts testen). Erst ein `ls kindergeburtstag/ | grep pirat` aus einem ganz anderen Anlass zeigte den Tippfehler. Wäre der Host in dem Moment gesund gewesen, hätte er 404 geliefert und der Fehler wäre in derselben Minute aufgefallen; wäre der Auftrag so rausgegangen, hätte der Gutachter „Datei nicht gefunden" gemeldet und ein Fünftel des Materials wäre ungeprüft geblieben.

**Regel:** Eine Netz-Prüfung, die nicht 200 liefert, beweist **gar nichts** — weder dass der Pfad falsch ist noch dass er richtig ist. Existenz-Fragen werden lokal beantwortet, wo sie deterministisch sind: `git cat-file -e HEAD:<pfad>`. Daraus wurde Linter-**Stufe 45** (`check-review-urls.py`): jeder Pfad aus jeder raw-URL in `_dev/review/*.md` muss im Baum liegen, Platzhalter (`<motto>`) ausgenommen. Gegenprobe abgelegt: Buchstabe im Dateinamen geändert → FAIL, zurückgesetzt → grün. Die 200-Prüfung bleibt zusätzlich — sie beantwortet die andere Frage (kommt der Gutachter dran), nur eben nicht diese.

## L21 — Der Gutachter-Tab ist nicht target-blind, solange er Gedaechtnis hat (17.08.2026, Gate B)
**Befund:** Im frischen Opus-5-Max-Tab stand direkt nach dem Absenden „Recalled 2 memories" — fuenfmal im Lauf. Der Tab war neu, der Auftrag target-blind formuliert, das Konto aber nicht: claude.ai-Memory reicht Wissen aus frueheren Begutachtungen desselben Materials in den angeblich unabhaengigen Review hinein. Damit ist die Unabhaengigkeit nicht mehr behauptbar — ein Gutachter, der sich an seinen letzten Score erinnert, bestaetigt ihn eher, als dass er ihn neu bildet. Genau die Sycophancy, gegen die die Frischer-Tab-Regel gebaut wurde.

**Regel:** Reviewer-Tabs laufen ab sofort im **Inkognito-Modus** von claude.ai (Knopf „Inkognito verwenden" in der Seitenleiste) — kein Memory, kein Verlauf, kein Uebertrag. Der frische Tab allein reicht nicht; „frisch" heisst ohne Gedaechtnis, nicht ohne Scrollback. Vor dem Absenden pruefbar: `/Inkognito|Incognito/i.test(document.body.innerText)` bzw. der aktive Zustand des Knopfes. Fuer Gate B (bereits gestartet) wird der Effekt am Ende beziffert: Recall-Pillen aufklappen und protokollieren, was hereingereicht wurde.

## L22 — Ein Filter, der gute Formulierungen bestraft, macht das Gate blind (17.08.2026, Stufe 48)
**Befund:** Stufe 48 („dieselbe Ware, gegensaetzliches Urteil") stand nach zwei Schwarm-Runden auf 0 FAIL. Die Gegenprobe hat das widerlegt: Ich habe den Gruendungsfall kuenstlich wiederhergestellt — safari-9-12 Walkie-Talkies von Regel auf harmlos — und das Gate meldete weiter 0. Ursache war mein eigener Praezisions-Filter: Die Regel musste das Warenwort WIEDERHOLEN (`"walkie" in text`). Genau das taten die neu geschriebenen Regeln nicht mehr; sie sagten „Geraete", „Funkgeraet", „Batteriefaecher". Der Filter hat das Gate in dem Moment blind gemacht, in dem die Texte besser wurden. Schlimmer: Er lief von Anfang an, also war schon die erste Zahl („119 Widersprueche") eine Untererfassung — mit tragfaehigem Filter sind es nach 221 abgearbeiteten Entscheidungen immer noch 125.

**Regel:** Ein Gate wird gegen seinen eigenen Gruendungsfall gegengeprobt, und zwar **nach jeder Aenderung an seinen Filtern**, nicht nur bei der Einfuehrung. Filter, die an der FORMULIERUNG haengen statt an der Struktur, sind dabei besonders verdaechtig: Sie altern mit dem Text und werden lautlos schwaecher. Der tragfaehige Ersatz misst Struktur — hier das Gewicht des Warenkerns am Posten-Label („der Posten belegt nur den Kern, der ihn dominiert"). Und wo auch das nicht reicht, ist die Antwort kein dritter Filter, sondern ein Feld in den Daten (Ticket K8: `wareKern` je Einkaufsposten). Merksatz: **0 FAIL ist erst dann eine gute Nachricht, wenn die Gegenprobe im selben Lauf 1 FAIL erzeugt.**

## L23 — Dieselbe Falle zweimal am selben Tag: Regex per Heredoc (17.08.2026, Stufe 49)
**Befund:** Beim Bau von Stufe 49 ging die Skript-Filter-Regex **zweimal hintereinander** durch die Heredoc-Falle: `\b` wurde zum Backspace-Byte (0x08), `\1` zu 0x01. Der Regex `<(script|style)\x08[^>]*>.*?</\x01>` traf lautlos nichts — das Gate liess damit den JSON-LD-Inhalt im Seitentext stehen und wurde zu milde. Aufgefallen ist es nur, weil ich nach dem Einsetzen die Steuerzeichen gezaehlt habe.

Das ist L19(b) in Reinform, und ich hatte die Regel selbst aufgeschrieben: **Regex-Zeilen nur per Edit-Tool.** Beim dritten Anlauf war das Edit-Tool keine Option mehr (die kaputte Zeile liess sich nicht mehr woertlich matchen), also wurde die Regex aus `chr(92)` zusammengesetzt — im Quelltext steht jetzt kein einziger Backslash.

**Regel:** Nach jedem Schreiben einer Datei, die Regexe enthaelt, die Steuerzeichen zaehlen: `sum(1 for b in open(p,'rb').read() if b < 9 or b in (11,12))` muss 0 sein. Das kostet eine Zeile und faengt eine Fehlerklasse, die sonst nur durch Zufall auffaellt — ein Regex, der nichts trifft, wirft keinen Fehler, er macht das Gate leise blind. Und wenn eine Regex partout durch eine Schreiboperation muss: aus `chr(92)` bauen statt escapen.

## L24 — Ein Gate, das die Maschine nachbaut, prueft die Maschine nicht

Stufe 52 sollte die Spielkarten-Bruecke halten. Der erste Entwurf hatte Karten-Erkennung
und Normalform des Renderers **nachprogrammiert** — und meldete prompt Karten als fehlend,
die der Renderer problemlos findet: Seine `norm()` schneidet Klammerinhalte und Mengen weg,
meine nicht. Zwei Implementierungen derselben Regel driften garantiert auseinander, und
dann prueft das Gate seine eigene Kopie statt des Originals.

Richtig ist: Das Gate laedt den Renderer als Modul und benutzt SEINE Funktionen. Dann kann
es nur noch das messen, was die Maschine wirklich tut. (Helfer V5 R3, Wahrheit hat einen
Ort — gilt auch fuer Code, nicht nur fuer Daten.)

## L25 — Miss nie an dem Text, in den du gerade geschrieben hast

Dasselbe Gate prueft, ob eine Karte und ihr Spiel gemeinsame Woerter haben — als Beleg
dafuer, dass die Zuordnung stimmt. Es las den Kartentext **von der fertig gerenderten
Seite**, auf der die Regel des Spiels bereits gedruckt stand. Damit brachte die Regel die
Woerter des Spiels selbst mit, jede Zuordnung sah bestaetigt aus, und alle drei bewusst
dokumentierten Ausnahmen wurden als "veraltet" gemeldet.

Wer sein eigenes Ergebnis misst, misst nichts. Die eigene Ausgabe muss vor der Messung
herausgerechnet werden — hier: `SPIEL_WEG.sub()` vor dem Wortvergleich.

## L26 — Eine stille Null ist kein Ergebnis, sondern ein unbewiesener Zustand

Der Spielkarten-Kanal druckte zweimal hintereinander **0 Regeln**, ohne eine einzige
Fehlermeldung. Ursache eins: `lade_anker()` gibt ein festes Dictionary zurueck und filterte
den neuen Schluessel `spielAnker` weg. Ursache zwei: `lade_spielregeln()` schlug die
Altersgruppe falsch herum nach (`ALTER['klein']` statt `ALTER['3-5'] == 'klein'`) und
uebersprang damit lautlos jede einzelne Datei.

Beide Male sah der Lauf gruen aus: 45 Seiten, 0 geaendert, 0 offen. Gefunden habe ich es
nur, weil ich nach der Verteilung gefragt habe statt nach dem Exit-Code. Ergaenzung zu L22:
**0 ist erst dann eine Zahl, wenn im selben Lauf etwas anderes als 0 herauskommen kann.**

## L27 — Eine Normalform, die Dinge zusammenwirft, laesst die schwaechste Fassung gewinnen

`norm()` schneidet Klammerinhalte weg. Das ist beim Einkaufsposten richtig ("Lupen (6er-Set)"
= "Lupen 6er-Set") und am Spiel falsch: "Koeniglicher Tanz" und "Koeniglicher Tanz (mit
Einfrieren)" sind zwei Eintraege mit zwei verschiedenen Sicherheitsregeln. Wer sie in eine
Zuordnung schreibt, bekommt keinen Fehler — er bekommt den **zuletzt gelesenen** Wert.

Gemessen: 12 solcher Kollisionen, vier gedruckt, drei davon mit der **lockereren** Regel.
Einmal standen sogar zwei verschiedene Spiele unter einem Schluessel (safari: Futter gegen
Wurfbaelle).

Die Regel daraus: **Eine Normalform darf zum Suchen dienen, nie zum Speichern.** Wer unter
`norm(x)` ablegt, hat entschieden, dass alles, was gleich aussieht, dasselbe ist — und
merkt es nie. Richtig ist: exakt speichern, normalisiert suchen, und bei mehreren Treffern
laut abbrechen statt zu waehlen.

Verwandt mit L22 (ein Filter, der gute Formulierungen bestraft, macht das Gate blind) und
L26 (eine stille Null ist kein Ergebnis): alle drei sind Faelle, in denen die Maschine eine
Entscheidung getroffen hat, ohne sie als Entscheidung sichtbar zu machen.

## L28 — Der Pruefauftrag kann seine eigene SHA nicht enthalten

Ein raw-URL braucht einen Commit-SHA. Den kennt man erst NACH dem Commit — also schreibt
man den Auftrag, committet ihn, traegt die SHA ein und committet noch einmal. Ergebnis:
**Die Fassung, auf die man verlinkt, enthaelt die alte SHA.** Genau das hat der Gutachter
am 18.08. als Erstes gemeldet: "die Material-Links im Auftrag zeigen auf einen anderen
Commit (97bb947…) als dein Prompt (df1b7ff…)".

Hier ging es gut aus — er hat nachgefragt statt geraten, und beide Staende trugen dieselben
gepruefte Dateien. Es haette ihn aber genauso gut auf einen Stand schicken koennen, den ich
gar nicht gemeint habe.

Richtig ist: **Die Material-SHA ist nicht die SHA des Auftrags.** Erst den Inhalt
committen, dessen SHA in den Auftrag schreiben, dann den Auftrag committen. Dann stimmt die
Verlinkung in genau der Fassung, die der Gutachter liest. Stufe 45 faellt das nicht auf —
sie prueft, ob der Pfad existiert, nicht ob der Commit der gemeinte ist.

## L29 — Eine Ausnahme, die auf ein Wort irgendwo im Satz hoert, ist ein Freifahrtschein

Stufe 55 sollte verbieten, dass ein Notfallmedikament eingesammelt wird. Weil "Allergien
und Medikamente per WhatsApp einsammeln" die AUSKUNFT meint, baute ich eine Ausnahme:
Wenn ein Auskunfts-Wort im Satz steht (Liste, Zettel, Angaben, Info), zaehlt der Satz
nicht. Der Re-Check hat elf falsche Saetze durchgerechnet — **acht kamen durch**, darunter

    "Den Adrenalin-Pen bitte abgeben, wir fuehren eine Liste."

Die Ausnahme fragte, ob ein Wort VORKOMMT, nicht ob es das Objekt ist. Richtig ist die
Naehe: Steht das Medikament unmittelbar neben dem Verb des Wegnehmens, ist es dessen
Objekt — egal was sonst im Satz steht. Und Verben, die Auskunft einholen (abfragen,
einholen, notieren), gehoeren gar nicht erst in die Verbotsliste.

Danach: 11 von 11 gefangen, 0 Fehlalarme auf sechs richtigen Saetzen — inklusive
"Muecken-Spray ausser Reichweite der Kinder aufbewahren", das richtig ist und richtig
bleiben muss.

## L30 — Ein Schwellenwert, der knapp danebenliegt, ist eine Einladung

Die Dominanz-Pruefung in Stufe 52 erlaubte 0.15 Abstand: Ein anderes Spiel durfte etwas
besser passen, ohne dass die Stufe FAILt. Der Re-Check hat alle moeglichen
Anker-Vertauschungen durchgerechnet und 13 gefunden, die bestehen. Die gefaehrlichste
schob der Tanzkarte fuer 3- bis 5-Jaehrige die Schatzsuchen-Regel unter und verlor damit
"Nur kurze Tuecher, NIE um den Hals" — bei einem Abstand von 0.14 gegen die Schwelle
0.15. Es fehlte ein Hundertstel.

Toleranzbaender in Gates sind fast immer Bequemlichkeit: Sie ersparen es, die echten
Ausnahmen zu benennen. Richtig ist Toleranz null plus eine dokumentierte Liste — dann
steht jede Ausnahme mit Grund da, statt in einer Zahl zu verschwinden. Nach der
Umstellung: 0 von 311 Vertauschungen kommen durch, 3 Ausnahmen mit Begruendung.

## L31 — Backslash-b ist in diesem Repo dreimal zum Backspace geworden

L19 und L23 beschrieben es schon; am 18.08. passierte es ein drittes Mal, in
check-notfallmedikament.py. Die Wirkung ist jedes Mal dieselbe und jedes Mal lautlos:
Das Muster trifft nichts mehr, die Stufe meldet 0 FAIL, und niemand sieht es — gefunden
wurde es nur, weil die Gegenprobe einen eingeschleusten Fehler NICHT fand.

Konsequenz ab jetzt: In Skripten, die per Heredoc geschrieben werden, steht kein
Backslash im Quelltext. Muster werden aus `chr(92)` zusammengesetzt, und nach jedem
Schreiben laeuft eine Steuerzeichen-Pruefung ueber die Datei. Beides steht in den neuen
Stufen bereits drin.

## L32 — Eine Ausnahme in einer Pruefregel ist eine Behauptung ueber den Code, und sie veraltet

Runde 8 nahm die Ortszeile vom Versprechen-Muster aus, begruendet mit "hat serverseitig genau
EINE Quelle (addrLockLabel/addrLockHint)". Die Begruendung war schon beim Schreiben falsch: bei
gesetztem areaHint ist das Label Gastgeber-Freitext aus dem Editor. Der ausgeschnittene Bereich
war also kein fixierter Satz, sondern ein Eingabefenster — und ein Gutachter hat in Runde 9 genau
dort einen Satz untergebracht, an dem die Stufe gruen blieb.

Der eigentliche Fehler war aber die Reaktion auf den Fehlalarm. Die Regel schlug an ehrlichem
Text an, weil das Suchfenster ueber die KARTENGRENZE lief ("... Adresse." + Ueberschrift
"Zu- oder Absage"). Statt die Ursache zu suchen, habe ich den Bereich ausgeschnitten, in dem
das Symptom auftrat.

Konsequenz ab jetzt: Wer eine Regel entschaerft, weil sie Fehlalarm gibt, sucht die URSACHE des
Fehlalarms und behebt die. Ein ausgeschnittener Bereich ist die letzte Wahl, nie die erste — und
wenn er sein muss, dann so eng wie moeglich und mit einer Begruendung, die als Zusicherung im
Code steht. Hier war die Ursache eine fehlende Blockgrenze: ein Versprechen ist ein Satz, und ein
Satz ueberquert keinen Block. Zwei Zeilen, und die Regel wurde dabei schaerfer statt milder.

## L33 — "Regression" und "Vertragsbruch" sind zwei verschiedene Urteile

Runde 9 meldete als Blocker, der Fix der Vorrunde habe einen Angriff "verbilligt: vorher 90
Eintraege, jetzt 30". Nachgemessen an beiden Staenden stimmte das nicht — der LIVE-Stand prueft
guests.length ohne Statusbezug, dort sperren schon 30 Absagen. Die Zusagen-Achse lag immer bei 30.

Ein Gutachter sieht per Konstruktion nur den Entwurf. Ob ein Befund eine VERSCHLECHTERUNG ist,
kann er gar nicht wissen — das kann nur, wer beide Staende laufen laesst. Beides ist wichtig, aber
es sind verschiedene Fragen: "bricht das den Vertrag?" entscheidet, ob gefixt wird; "ist das
schlechter als das, was Nutzer heute haben?" entscheidet, ob deployt wird.

Konsequenz ab jetzt: Bei jedem Blocker, der an Bestandslogik haengt, wird der Angriff gegen
main UND draft ausgefuehrt, bevor er das Deploy aufhaelt. Vorlage: scratchpad/dos-vergleich.mjs.

## L34 — Eine Pruefmaschine kann beide Fakten in der Hand halten und sie nie vergleichen

Stufe 60 prueft an der Party mit neunzig Absagen, DASS eine Zusage durchkommt. Dieselbe Stufe
rendert dieselbe Party und sammelt den Kasten, der das GEGENTEIL behauptet ("nimmt unter einem
neuen Namen nichts mehr an — auch keine Absage"). Beide Fakten lagen in derselben Sammlung. Die
Stufe hat sie nie gegeneinander gehalten, und genau in dieser Luecke sass der Defekt.

Das ist eine andere Fehlerklasse als "eine Achse fehlt". Hier fehlte keine Achse — es fehlte die
VERBINDUNG zwischen zwei vorhandenen. Eine Stufe, die A prueft und B prueft, prueft nicht
automatisch A-gegen-B, und gerade Copy lebt von dieser Verbindung: jeder Satz auf einer Seite ist
eine Behauptung ueber das Verhalten des Servers.

Konsequenz ab jetzt: Wo eine Seite dem Leser sagt, was als naechstes geht oder nicht geht, wird
die AUSSAGE gegen das VERHALTEN gestellt — der naechste Schreibversuch muss sie bestaetigen. Kein
Wortlaut-Grep: der haengt an einer Formulierung und ist gegen die naechste Copy-Runde blind (die
alte Zusicherung hier hing an "steliste ist voll" und sah die neue Formulierung nicht).

## L35 — Eine Massenoperation braucht einen eindeutigen Schluessel, und ein Vorname ist keiner

removeGuests loeschte nach Namen. Dieselbe Party kann denselben Vornamen zweimal tragen — als
Walk-in ueber den Gruppenlink und als Token-Gast; das ist ein bewusster Entscheid, kein Zufall.
Der Editor rendert pro ZEILE einen Knopf, geschickt wurde aber nur der NAME. Ein Klick auf die
Bot-Zeile loeschte die echte Zusage samt Allergie-Hinweis mit.

Der Knopf wusste, welche Zeile er ist. Die Information war da und wurde auf dem Weg zum Server
weggeworfen — und weil der Hinweistext daneben im Singular formuliert war ("entfernst du den
Eintrag"), las sich die Oberflaeche wie eine Zusicherung, die der Server nicht einhielt.

Konsequenz ab jetzt: Wenn eine Oberflaeche pro Zeile handelt, adressiert die Anfrage die ZEILE,
nicht ihren Inhalt. Der Inhalt darf mitfahren — als Wache gegen eine veraltete Seite, nicht als
Schluessel. Und Loeschpfade werden gegen den Dubletten-Fall geprueft, nicht nur gegen den
Normalfall; in Stufe 60 steht er als namens_dublette.

## L36 — Eine geratene Zahl in einer Regel ist eine Regel, die man noch nicht verstanden hat

Die Versprechen-Regel sollte nicht mehr ueber Kartengrenzen springen. Erster Anlauf: an JEDER
Blockgrenze abbrechen — fing den Fehlalarm, verlor aber das Versprechen, das ueber ein Label und
seine Unterzeile verteilt ist. Zweiter Anlauf: "genau EINE Grenze darf ueberquert werden" — und
das fing gar nichts, weil ein Geschwisterwechsel </div><div> schon ZWEI Marken erzeugt. Die
naheliegende Reparatur waere gewesen, die Eins durch eine Zwei zu ersetzen. Sie haette
funktioniert und waere trotzdem falsch gewesen: die Zahl beschreibt nichts, was jemand nachlesen
kann, und der naechste Markup-Umbau haette sie lautlos entwertet.

Richtig war, die Grenze zu benennen, die man wirklich meint. Gemeint war nie "ein Tag", sondern
"eine KARTE": innerhalb einer Karte gehoert alles zusammen, zwischen zwei Karten nichts. Das
laesst sich in einem Satz begruenden, ueberlebt jeden Umbau, der Karten Karten laesst — und es ist
in beide Richtungen belegbar (sauberer Stand gruen, mit eingebautem Defekt rot an genau den
erwarteten Stellen).

Konsequenz ab jetzt: Taucht in einer Pruefregel eine Zahl auf, die nicht aus dem Produkt stammt
(30 Gaeste, 90 Eintraege, 14 Tage), ist das ein Warnzeichen. Dann fehlt der Begriff, den die Zahl
ersetzt.

## L37 — Ableiten macht konsistent mit der QUELLE, nicht mit der Seite

Nach acht NO-GO-Gutachten zu handgeschriebenen Ablauf-Kaesten war die Diagnose richtig: der
Zeitplan liegt als Datensatz vor (data/motto/*.json), buildTimeline() rechnet ihn seit dem
31.07., und Getipptes widerspricht ihm zwangslaeufig. Die Ableitung war gebaut, idempotent,
durch den Planer selbst gerechnet — und trotzdem nicht auslieferbar.

Denn machsleicht hat ZWEI Inhaltsquellen fuer dieselbe Sache. Die Motto-Seite fuehrt fuenf
Stationen mit je drei Altersvarianten; die JSON-Dateien fuehren eigene Spiele mit eigenen Namen.
Gemessen: von 244 Spielen im abgeleiteten Ablauf sind 176 auf ihrer eigenen Seite ueberhaupt
nicht auffindbar (72 %), weitere 28 nur ueber den Kopf-Begriff. Ein Elternteil liest
"0:20-0:55 Lupen-Basteln" und findet auf der Detektiv-Seite kein Lupen-Basteln.

Die Ableitung war also intern konsistent und nach aussen falsch — dieselbe Fehlerklasse wie
vorher, nur durch eine andere Tuer. Ein Ablauf, dessen Stationen die Seite nicht erklaert, ist
wieder ein Versprechen ohne Deckung.

Konsequenz: Vor dem Ableiten pruefen, ob Quelle und Ziel ueberhaupt dieselben Dinge benennen.
Ableiten loest Widersprueche zur Quelle, nicht Widersprueche zwischen zwei Quellen. Solange
"Wahrheit hat einen Ort" auf Projektebene nicht gilt, verschiebt jede Ableitung den Widerspruch
nur. Die Messung dafuer kostet zehn Minuten und haette hier einen halben Tag gespart.

## L38 — Ein Rewrite ist kein Hop, und ein Rohpfad ist keine URL

Am 02.09. haben zwei Sessions unabhaengig dieselbe Fehlerklasse produziert, in zwei
verschiedenen Dateien, innerhalb einer Stunde.

Der Pruefstand prueft JSON-LD `url`/`image` gegen `git ls-files` und meldet **116 Treffer**.
Alle falsch: Netlify liefert `/kindergeburtstag/piraten-6-8-jahre` aus `…-jahre.html`. Mit
sauberer Aufloesung (`p`, `p.html`, `p/index.html`, plus die 311 Regeln aus `_redirects`)
bleiben 20 — die dann echt sind.

Ich pruefe `_redirects` auf Weiterleitungsketten und melde **35 Ketten**. Alle falsch: ich hatte
`301 -> 200` gezaehlt. Eine `200`-Regel in `_redirects` ist ein **Rewrite** — gleiche URL, die
Datei wird direkt serviert. Kein zweiter Hop, kein Kettenglied. Dieselbe Ursache liess mich
zusaetzlich melden, **58 von 136 Sitemap-URLs** zeigten auf eine Weiterleitung; echt waren 0.
Es sind die 58 ganz normalen erweiterungslosen URLs der Seite.

Die gemeinsame Wurzel ist nicht Unachtsamkeit, sondern eine **Abstraktionsluecke**: Wir haben
gemessen, was im Repo steht, und gemeint, was der Server ausliefert. Zwischen beidem stehen
`_redirects`, die Extension-Aufloesung und der Unterschied zwischen Umleitung und Rewrite —
drei Uebersetzungsschritte, die keiner von uns im ersten Anlauf mitgerechnet hat.

Das ist die Verallgemeinerung von L-prinzessin (Arbeitsverzeichnis gemessen, versionierten
Stand gemeint): **Jede Stufe, die ueber ausgelieferte Seiten urteilt, muss die Auslieferung
nachbauen oder sie messen — nie den Rohpfad nehmen und hoffen.** Praktisch:

- `200` in `_redirects` ist NIE eine Umleitung. Nur `3xx`, `404!` und `410` leiten um.
- Ein interner Pfad loest zu `p`, `p.html` oder `p/index.html` auf, danach erst gilt "fehlt".
- Wer keinen der beiden Schritte nachbauen will, misst live (`check-sitemap-live.py`) statt
  im Repo — beides ist gueltig, die Mischung nicht.

Und ein Nebenbefund, der ohne diese Korrektur untergegangen waere: nach dem Aussortieren der
93 Fehlalarme blieb **ein** echter Fund uebrig — eine Karte auf
`schatzsuche-kindergeburtstag.html`, die ueber `/schnitzeljagd 301!` auf dieselbe Seite
zurueckfuehrt. Fehlalarme sind nicht nur Laerm; sie verdecken den einen Fund, um den es geht.

## L39 — Eine Pruefung versagt auf vier Weisen, und alle vier sehen wie Erfolg aus

Am 02.09. haben zwei Sessions binnen einer Stunde in zwei verschiedenen Dateien eine kaputte
Gegenprobe gebaut, und zwei weitere Proben meldeten "STUMPF" fuer Stufen, die in Ordnung waren.
Dazu kamen am selben Nachmittag zwei Laeufe, deren Zahl am Ende stimmte und deren Messung
nicht stimmte. Vier Versagensarten. Wer nur die erste kennt, baut die zweite.

**1. Sie prueft die Eingabe statt die Regel.**
`check-cache-buster.py --gegenprobe` prueft `"19700101" < stand` — also ob ueberhaupt ein Datum
aus `git log` kam. Ob der eigentliche Vergleich (`datum < stand`) stimmt, beruehrt sie nie. Sie
haette "beide Richtungen erkannt" gemeldet, auch wenn der Vergleich umgedreht oder geloescht
gewesen waere.

**2. Sie greift woanders an, als die Regel liest.**
Die Probe fuer Stufe 64 mutierte ein Spiel in der Variante `minimal`, waehrend das Gate nur
`standard` liest. Die Probe fuer Stufe 60 setzte `${…}` in einen doppelt gequoteten String
(Zeile 1855) statt ins Template-Literal (2094), wo es etwas bricht. Beide meldeten "STUMPF" —
kaputt war die Probe, nicht die Stufe. **Ein Treffer irgendwo ist kein Treffer dort, wo es
zaehlt.**

**3. Sie kann gar nicht scheitern.**
`check-linter-aufrufe.py` hatte kein argparse und schluckte jedes Flag: `--gegenprobe` und
`--voelliger-unsinn` liefen beide als Normallauf, Exit 1 wie Exit 1. Ein
`&& … --gegenprobe` daneben haette den Normallauf ein zweites Mal gestartet und wie ein Beweis
ausgesehen.

**4. Das Ergebnis ist echt, die Messung nicht.**
Nicht die Regel war kaputt und nicht die Gegenprobe — sondern die Umgebung, in der gemessen
wurde. Zwei Faelle am selben Nachmittag:

- Ein `bash validate-all.sh` lief, waehrend die Datei zweimal editiert wurde. Bash liest
  Skripte inkrementell nach; der Lauf haette am Ende trotzdem eine Zahl ausgegeben.
- Ein `TaskStop` beendete die Huelle eines Laufs, das darunterliegende `bash` schrieb weiter in
  dieselbe Logdatei wie der neue Lauf. Beide mit eigenem Schreibzeiger, also ueberschrieben sie
  sich gegenseitig Abschnitte. Ergebnis: **`LINTER-EXIT=0`, Abschlussbanner, "8 Warnungen"** —
  und darunter doppelte Stufenbloecke (62-65, 67-68 je zweimal), sechs fehlende (53, 54, 58, 59,
  60, 66) und eine zerhackte Zeile
  (`── STUFE 68: Gelesene Felder, die es in den Daten nichtStufe 66: 80 Generator-Skripte`).

Der Fehlschluss dabei war, das Log auf Doppellaeufe zu pruefen und sich beruhigen zu lassen:
eine `LINTER-EXIT`-Zeile, ein Banner, plausible Zeilenzahl. **Ein Banner beweist, dass EIN Lauf
das Ende erreicht hat, nicht dass nur einer geschrieben hat.** Der brauchbare Test ist die
Stufenliste selbst: kommt eine Nummer doppelt vor oder fehlt eine, ist das Log unbrauchbar,
egal was unten steht.

Pruefbar ist das an drei Merkmalen, alle im Log selbst: **keine doppelte Stufennummer, keine
zerhackte Kopfzeile, genau EIN Abschlussbanner.** Trifft eines nicht zu, ist das Log unbrauchbar
— unabhaengig davon, was unten steht. Der dritte Punkt ist der, an dem die Beruhigung passierte:
gezaehlt wurde "ein Banner", die Bedingung heisst "genau ein". Der Pruefstand hat die Pruefung
gebaut und in beide Richtungen getestet (sauberes Log Exit 0; zwei aneinandergehaengte Laeufe
Exit 1 mit `DOPPELT` und `MEHRERE BANNER`); sie kommt als Pruefpunkt an den bestehenden Fall
`linter-gruen`.

Konsequenz: **jeder Lauf in eine eigene, neue Logdatei** — nie in eine wiederverwendete. Dann
verdirbt ein Zombie hoechstens sein eigenes Log. Und: nicht editieren, solange ein Lauf laeuft;
eine Kopie unter `/tmp` ist KEIN Ausweg, weil `validate-all.sh` sein Repo aus
`dirname "$0"` bestimmt und dann ins Leere misst.

### Zwei Regeln, die daraus folgen

**Zwei Arme, immer.** Die verletzte Regel muss rot werden UND ein sauberer Fall muss durchgehen.
Nur der erste Arm erlaubt eine Regel, die auf alles anspringt; nur der zweite eine, die nie
feuert.

**Eine Entscheidung, eine Funktion.** Lauf und Gegenprobe muessen dieselbe Funktion rufen.
Solange die Gegenprobe die Regel *nachbaut*, kann sie von ihr wegdriften — genau das ist bei
Stufe 67 passiert, ohne dass jemand etwas falsch gemacht haette. Die anderen Regeln sind
Disziplin, diese ist Mechanik.

### Wie es richtig aussieht — Stufe 60 als Vorbild

`check-partyseite-render-gegenprobe.py` macht alles, was den vier Arten fehlt, und ist deshalb
die Fassung, an der sich die anderen messen sollten:

- **Sie verletzt die Regel, nicht die Eingabe.** 39 eingebaute Defekte, jeder ein echter Befund
  aus Welle 3, den zwei Kontaktpaket-Gutachten oder der Klasse aus L14. Jeder EINZELNE muss die
  Stufe rot machen, sonst faellt die Gegenprobe.
- **Sie greift dort an, wo die Regel liest.** 31 der 39 stammen woertlich von Gutachtern, die
  damit durch eine FRUEHERE Fassung dieser Stufe gekommen sind. Jeder Durchrutscher wurde zur
  Dauerregel — das ist der einzige Weg, auf dem eine Stufe waechst.
- **Sie kann den Baum nicht beschaedigen.** Die Defekte landen ausschliesslich in einer Kopie im
  Temp-Verzeichnis, `MACHSLEICHT_WORKER` zeigt die Stufe auf die Kopie. Im Klartext des Skripts:
  "Ein Abbruch mittendrin kann deshalb keinen Defekt hinterlassen." Nachgeprueft waehrend eines
  abgebrochenen Laufs — `git status party-worker.js` war leer.

Sie ist die langsamste Stufe im Linter (mehrere Minuten, weil sie 340 Dokumente je Mutation neu
rendert). Das ist der Preis, und er ist richtig herum bezahlt: langsam und beweisend statt
schnell und behauptend.

### Der unangenehme Rest

Eine Gegenprobe behauptet ihre eigene Schaerfe. Bei den Pruefstand-Proben ist das abgesichert —
eine Probe zaehlt nur, wenn sie die Stufe nachweislich rot macht. Bei den eingebauten
`--gegenprobe`-Modi gibt es diese Absicherung nicht: **zwei von zwei, die wir angesehen haben,
waren defekt**, und die fuenf aus dem Bestand (`check-datumsangaben`, `-mengen`, `-quellen`,
`-werbekennzeichnung`, `-zeitversprechen`) hat nie jemand geprueft. Offener Pruefauftrag beim
Pruefstand: eine Probenklasse `gegenprobe-beisst-<stufe>`, die die REGEL im Skript kaputtmacht
und erwartet, dass `--gegenprobe` rot wird. Dann gilt fuer Gegenproben dieselbe Beweispflicht
wie fuer Stufen.

### Die Klammer zu L38: zu breit meldet zu viel, zu schmal meldet nichts

Am selben Tag, sechster Fall. Der Pruefstand zaehlte gegen, wie viele else-Zweige nach dem
Umbau noch aus einer Datei belegen, und fand **0**, wo es **1** ist (Stufe 60, die dokumentierte
Ausnahme). Ursache: das Muster suchte `> $LOGDIR/…`, im Skript steht aber
`> "$LOGDIR/render-gegenprobe.log"` — in Anfuehrungszeichen. Ein fehlendes `"?` im Regex, und
die Antwort lautet "alles sauber".

Das ist dieselbe Wurzel wie die 116 Rohpfad-Fehlalarme aus L38, nur spiegelverkehrt:

    zu breites Muster  -> Fehlalarm  -> laut, kostet Zeit, faellt auf
    zu schmales Muster -> Fehlnull   -> leise, kostet nichts, faellt NICHT auf

Die zweite Richtung ist die gefaehrlichere, weil ihr Ergebnis wie Erfolg aussieht und niemand
eine Null nachprueft. Praktische Regel: **wer eine Null misst, muss zeigen, dass das Muster
ueberhaupt etwas findet** — ein bekannter Treffer als Kalibrierung, bevor die Null gilt. Bei
einer Zaehlung ohne bekannten Treffer ist "0" kein Ergebnis, sondern eine unbelegte Behauptung.

Zwei Schaerfungen, beide aus dem Fall selbst:

**Die Kalibrierung muss aus DERSELBEN Messung stammen, nicht danebenstehen.** "Das Muster
funktioniert, ich hab es vorhin geprueft" ist kein Beleg — der bekannte Treffer muss durch
denselben Lauf, dieselbe Funktion, dasselbe Muster. Genau daran scheiterte der Fall: das Muster
war anderswo gesehen und dann in eine neue Zeile getippt worden, in der das `"?` fehlte. Die
Kalibrierung existierte im Kopf, nicht im Lauf.

**Eine Wegwerf-Messung im Chat traegt denselben Anspruch wie eine Linter-Stufe — aber keine
ihrer Sicherungen.** Keine Gegenprobe, kein Review, keine Wiederholbarkeit. An diesem einen
Nachmittag wurden zwischen zwei Sessions gut ein Dutzend solcher Zahlen genannt; mindestens
vier waren falsch (35 Ketten, 58 Sitemap-Treffer, 116 Rohpfad-Verweise, 10 betroffene Stufen),
und zwei davon haette die jeweils andere Seite beinahe uebernommen. Wer so eine Zahl nennt,
sagt dazu, dass sie unkalibriert ist — oder kalibriert sie.

### Und die Verdrahtung gehoert dazu

Ein `&& … --gegenprobe` auf ein Flag, das ins Leere laeuft, ist schlechter als gar kein Aufruf.
Deshalb steht ueber Stufe 67 seit heute ausdruecklich, dass der Aufruf ABSICHTLICH fehlt, samt
der Bedingung, unter der er zurueckkommt — sonst "vervollstaendigt" ihn beim naechsten Mal
jemand blind.
