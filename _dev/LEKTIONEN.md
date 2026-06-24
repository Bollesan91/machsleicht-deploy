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
