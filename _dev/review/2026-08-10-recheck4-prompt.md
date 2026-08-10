Du bist unabhängiger Gutachter für einen kleinen REPARATUR-Diff (Folgerunde 2). Das Vorgutachten fand an einem Fix-Commit drei MAJORs und sechs behebenswerte Minors; die Reparaturen liegen als ein Commit vor. Prüfe NUR: (a) schließt jede Reparatur ihr Finding wirklich, (b) haben die Reparaturen NEUE Fehler eingebaut. Fix-induzierte Folgefehler zuerst.

KONTEXT in einem Satz: Druckprodukt „Komplettpaket" für Kindergeburtstage (paket/_maschine/template.html rendert client-seitig aus Partydaten; sechs paket/*/index.html sind daraus GENERIERT und tragen denselben Template-Diff) + Schatzsuche-Daten (data/schatzsuche.json) + Linter-Stufe in _dev/scripts/check-beispielnamen.py.

PRÜFOBJEKT (SHA {SHA}):
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/_dev/review/2026-08-10-recheck4-fixes.patch
  (data/schatzsuche.json separat als Wort-Diff, die Zeilen sind lang:)
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/_dev/review/2026-08-10-recheck4-wortdiff.txt
  False-Positive-Liste (geprüfte Nicht-Findings, NICHT erneut melden — v. a. Einträge 13+14):
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/OFFENE-REVIEW-PUNKTE.md

WAS DIE REPARATUREN BEHAUPTEN (verifiziere am Diff):
1. (war MAJOR) allergieTausch(): Leere Allergie-Angaben werden VOR dem Join gefiltert (`.trim().toLowerCase()).filter(Boolean).join(' , ')`) — die Fallback-Box kann bei 0 gemeldeten Allergien nicht mehr rendern; bei echten Angaben ohne Standard-Regel rendert sie weiter.
2. (war MAJOR) Linter-Max-Regex: Die Alternative `Max\.(?!\w)` ist gestrichen — nur noch `Max\.?\s*\d` (Ziffer Pflicht). „Der Ritter heißt Max." würde wieder FAILen, „Max. 5 Minuten" bleibt still.
3. (war MAJOR) Schatzsuche Baustelle: QA-Notizen („Berufsbilder gender-offen … KEIN 'Maurer Frank' — Halluzination!") aus dem gedruckten desc entfernt; Intro nennt jetzt die Kanon-Besetzung „Polierin Rita + Elektriker Theo" statt „Polierin + Elektrikerin"; dasselbe im Generator-Skript _dev/scripts/add-sz-themes.js nachgezogen.
4. Ei-Zeile: „je Ei ½ zerdrückte Banane oder 3 EL Apfelmus, dazu je ½ TL Backpulver — bei mehr als 2 Eiern nur die Hälfte ersetzen."
5. Laktose-Zeile: Gegenprobe ergänzt „(jeweils 1:1; steht auch Gluten oder Soja auf der Liste, glutenfreien Hafer- bzw. einen anderen Drink wählen)".
6. Whitelist-Check des Linters deckt Possessive der eigenen Einträge (`wort.endswith('s') and wort[:-1] in w`).
7. Toter `huhnereiweiss`-Zweig entfernt (vom `huhnerei`-Präfix gedeckt).
8. Blanko-Zettel: Bei Überhang-Zusagen erscheint am Schneideblock der Zusatz „Auf den Zetteln mit Schreiblinie tragt ihr beim Rollen-Ziehen gemeinsam eine Wunschrolle ein." (nur dann).
9. Fallback-Box verweist auf „die Eltern der betroffenen Kinder (siehe Allergie-Zeile oben)".

PRÜFWINKEL:
V1 — FÜHRE DEN JS-PFAD GEDANKLICH ODER REAL AUS: allergieTausch() mit (a) 0 Zusagen, (b) 2 Zusagen ohne Allergien, (c) 1× „Erdnüsse", (d) 1× „Sellerie" (keine Standard-Regel). Erwartung: leer / leer / Nuss-Zeile / Fallback-Box. Stimmt der neue Guard in allen vier Fällen?
V2 — REGEX-GEGENPROBE: `Max\.?\s*\d` gegen „Max 2h", „Max. 5 Minuten", „Der Ritter heißt Max.", „Ich bin Max, der Schlauchführer" — und die Possessiv-Erweiterung gegen „Old Toms Hütte" (wort='Toms'), „Prinzessin Linas Krone" (wort='Linas'), „Mats' Schwert" (wort='Mats' — Pool-Name endet selbst auf s!). Entschuldigt `wort[:-1] in w` bei 'Mats' fälschlich etwas, wenn 'Mat' in einem Whitelist-Eintrag vorkäme? Prüfe die reale Whitelist im Patch-Kontext.
V3 — PROPAGATION: Tragen alle 6 generierten paket/*/index.html byte-gleich dieselben Template-Hunks?
V4 — WORT-DIFF LESEN: Ist der neue Schatzsuche-Stationstext in sich stimmig (2 Verdächtige genannt, keine Redaktionsreste, Anführungszeichen/JSON heil)? Widerspricht das Intro jetzt noch irgendeinem anderen Feld im Wort-Diff-Ausschnitt?
V5 — DEUTSCH: Die neuen Sätze (Ei-Zeile, Laktose-Klammer, Blanko-Zusatz, Fallback-Box) laut lesen — vollständig, kongruent, beim ersten Lesen verständlich?

PFLICHTEN:
- Je Finding: wörtliches Zitat + Dateipfad + MAJOR / MINOR / UNSICHER.
- MAJOR nur, wenn es gedruckt beim Kunden landet oder den Wächter blind macht.
- Am Ende: Score 0-100 für den Reparatur-Diff und das Wort „REVIEW ABGESCHLOSSEN".
