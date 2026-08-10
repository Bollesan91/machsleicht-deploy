Du bist unabhängiger Gutachter für einen kleinen REPARATUR-Diff (Folgerunde 3). Das Vorgutachten fand zwei MAJORs (eine mehrdeutige Backanweisung bei Ei-Allergie; eine gedruckte Redaktionsnotiz) und fünf Minors; die Reparaturen liegen als ein Commit vor. Prüfe NUR: (a) schließt jede Reparatur ihr Finding, (b) haben die Reparaturen NEUE Fehler eingebaut.

KONTEXT in einem Satz: Druckprodukt „Komplettpaket" für Kindergeburtstage (paket/_maschine/template.html rendert client-seitig; sechs paket/*/index.html sind GENERIERT und tragen denselben Template-Diff) + Schatzsuche-Daten (data/schatzsuche.json) + Linter-Stufen in _dev/scripts/.

PRÜFOBJEKT (SHA {SHA}):
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/_dev/review/2026-08-10-recheck5-fixes.patch
  (data/schatzsuche.json separat als Wort-Diff:)
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/_dev/review/2026-08-10-recheck5-wortdiff.txt
  False-Positive-Liste (geprüfte Nicht-Findings, NICHT erneut melden):
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/OFFENE-REVIEW-PUNKTE.md

WAS DIE REPARATUREN BEHAUPTEN (verifiziere am Diff):
1. (war MAJOR) Ei-Zeile neu: „je Ei ½ zerdrückte Banane oder 3 EL Apfelmus, dazu je ½ TL Backpulver. Verlangt das Rezept mehr als 2 Eier, lieber Ei-Ersatzpulver aus der Drogerie verwenden oder ein Rezept mit weniger Eiern wählen." — die gefährliche Lesart „Eier teilweise drin lassen" ist restlos weg.
2. (war MAJOR) Bauarbeiter-Quiz-hint: Redaktionsnotiz („Berufsbild-Klarstellung … Frauen-Berufe-Sichtbarkeit") → Handlungsanweisung: „Lösungshilfe für die letzte Frage: Eine Polierin leitet die Baustelle und teilt die Arbeit ein — den Beruf machen Frauen und Männer." (Die Station fragt in desc: „Was ist eine Polierin?")
3. Laktose-Zeile: Klammer aufgelöst — „(jeweils 1:1) — schmeckt im Kuchen niemand raus. Steht auch Gluten auf der Liste, glutenfreien Haferdrink nehmen; steht Soja drauf, den Haferdrink."
4. Blanko-Zusatz: „beim Rollen-Ziehen" → „beim Verteilen".
5. Verneinungen zählen nicht als Allergie-Meldung: `.filter(s => s && !/^(keine[rs]?|nein|nichts|ohne|n\.?a\.?|[-–—.\/]+)$/.test(s))`.
6. Linter Stufe 32: Docstring an die gestrichene Max.-Alternative angeglichen; Possessiv-Strip nur noch, wenn die Basis ein echter Pool-Name ist (POOL_BASIS-Set — „Mats"→„Mat"-Falle geschlossen).
7. Totes Generator-Skript add-sz-themes.js nach _dev/archive/ verschoben (schrieb in nicht existierende Datei, 14 Divergenzen).
8. Hängende „Elektrikerin" in baustelle-9-12 (Live-Seite + Quelle + Bundle) entfernt: „…Materialien, Statik). 30 Min."
9. NEUE Linter-Stufe 33 (_dev/scripts/check-meta-vokabular.py): enge Muster-Liste (Halluzination, gender-offen, Berufsbild-Klarstellung, …) über data/motto + elite + schatzsuche + kindergeburtstag/*.html, _meta ausgenommen; in validate-all.sh verdrahtet.

PRÜFWINKEL:
V1 — LIES DIE NEUE EI-ZEILE ADVERSARIAL: Gibt es noch IRGENDEINE Lesart, bei der ein Ei im Kuchen landet? Ist „Ei-Ersatzpulver aus der Drogerie" ein real existierendes Produkt (kurz verifizieren)?
V2 — HINT-KONTEXT: Passt die neue Lösungshilfe zur Quizfrage in desc („Was ist eine Polierin?")? Ist sie fachlich richtig (Polier/in = ?)?
V3 — REGEX DER VERNEINUNGS-LISTE zeichengenau: Frisst `[-–—.\/]+` oder `n\.?a\.?` fälschlich echte Meldungen (z. B. „n. A. auf Nüsse"? „Milch."? „-laktosefrei bitte-")? Konstruiere Angriffsfälle.
V4 — STUFE 33 GEGENPROBE: Hätte sie M3 und F5 gefangen (die Original-Strings gegen die Muster halten)? Schlägt eines der 12 Muster auf legitimen Druck-Text an (z. B. „Sichtbarkeit" ist bewusst NICHT in der Liste — fehlt dadurch etwas Kritisches)?
V5 — PYTHON-LOGIK POOL_BASIS: `basis = wort[:-1] if (wort.endswith('s') and wort[:-1] in POOL_BASIS) else None` — durchdenke „Linas", „Mats", „Jonas", „Sophias". Bleibt „Old Toms Hütte" still (wort='Toms', basis='Tom')? FAILt „Mats' Schwert" weiter korrekt?
V6 — PROPAGATION: Tragen alle 6 generierten paket/*/index.html byte-gleich dieselben Template-Hunks?
V7 — DEUTSCH: Alle neuen Sätze laut lesen — vollständig, kongruent, erstes-Lesen-verständlich?

PFLICHTEN:
- Je Finding: wörtliches Zitat + Dateipfad + MAJOR / MINOR / UNSICHER.
- MAJOR nur, wenn es gedruckt beim Kunden landet oder einen Wächter blind macht.
- Am Ende: Score 0-100 für den Reparatur-Diff und das Wort „REVIEW ABGESCHLOSSEN".
