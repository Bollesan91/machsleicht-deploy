Du bist unabhängiger Gutachter für einen REPARATUR-Diff (Folgerunde). Das Vorgutachten fand sechs Defektklassen in einem Druckprodukt für Kindergeburtstage; die Fixes liegen als ein Commit vor. Prüfe NUR: (a) ist jeder Fix korrekt und vollständig, (b) haben die Fixes NEUE Fehler eingebaut. Fix-induzierte Fehler sind erfahrungsgemäß die häufigste spätere MAJOR-Quelle — such danach zuerst.

KONTEXT in einem Satz: Druckprodukt „Komplettpaket" (paket/_maschine/template.html rendert aus data/motto/*.json; sieben paket/*/index.html sind daraus GENERIERT und tragen denselben Template-Diff) + SEO-Seiten (kindergeburtstag/*.html aus _src/elite-motto-data/*.json, gebündelt in _bundle.js) + Linter-Stufen in _dev/scripts/.

PRÜFOBJEKT (SHA {SHA}):
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/_dev/review/2026-08-10-recheck3-fixes.patch
  (zwei Dateien sind minifiziert/einzeilig — deren Änderungen als Wort-Diff:)
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/_dev/review/2026-08-10-recheck3-wortdiff.txt
  False-Positive-Liste (bereits geprüfte Nicht-Findings, NICHT erneut melden):
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/OFFENE-REVIEW-PUNKTE.md

WAS DIE FIXES BEHAUPTEN (verifiziere jede Behauptung am Diff, nicht an meiner Zusammenfassung):
1. Eine Kuchen-Deko-Sammelzeile „(Hufeisen aus Zuckerguss / Pappschild als Wappen / Bagger drauf)" stand wörtlich auf Pferde- UND Ritter-Seiten; jetzt motto-spezifisch aufgeteilt.
2. Eine Krimi-Geschichte hatte drei einander widersprechende Verdächtigen-Besetzungen; jetzt überall Maurer Frank, Polierin Rita, Elektriker Theo, Architekt Klaus.
3. Bei einem 3-5-Jahre-Spiel mit Spritzpistole beaufsichtigte ein KIND statt eines Elternteils; zurückgedreht.
4. Hängende feminine Relativsätze nach dem [Name]-Platzhalter („Forscher [Name], die heute …") → Gedankenstrich-Form.
5. Eine „Tierärztin" bewertete, die als Rolle nirgends existiert → „Ein Erwachsener".
6. Der Allergie-Austauschblock im Template wurde gehärtet: Bindestrich im Token-Split, mehr Allergen-Schreibweisen (kuhmilch, cashew, pistaz…, hühnereiweiß), Ei-Ersatz jetzt „3 EL Apfelmus", Margarine-Hinweis „Zutaten prüfen — viele Margarinen enthalten Milch", Spuren-Formulierung „Spuren von Erdnüssen/Schalenfrüchten", neue Fallback-Box mit Eltern-Rückfrage wenn keine Standard-Regel greift.
7. Rollen-Zettel: Mehr Zusagen als Rollen ließ Kinder stillschweigend wegfallen → jetzt Blanko-Zettel je Überhang-Kind + Tausch-Hinweis-Satz.
8. Linter-Stufe 32 (Beispielnamen-Wächter): Whitelist-Eintrag muss den Treffer selbst enthalten, „Max."-Abkürzung, erweiterter Scope.

PRÜFWINKEL (nummeriert, alle abarbeiten):
V1 — RECHNE NACH: Ist „je Ei ½ zerdrückte Banane oder 3 EL Apfelmus + ½ TL Backpulver" backfachlich korrekt? Recherchiere die übliche Ei-Ersatz-Menge.
V2 — RECHERCHIERE: Ist „Spuren von Erdnüssen/Schalenfrüchten" die korrekte LMIV-nahe Formulierung für Packungsaufdrucke? Und stimmt fachlich „Marzipan ist Mandelmasse" als Nuss-Allergie-Warnung (Mandel = Schalenfrucht im Allergen-Sinn)?
V3 — LIES DEN JS-DIFF ZEICHENGENAU: allergieTausch() — Token-Split-Regex, die indexOf-Ketten, der neue Fallback-Zweig (erreichbar? richtige Bedingung? HTML valide?). Ebenso der Blanko-Chips-concat im Rollen-Block: stimmt die Slice-Logik, kann ein Kind doppelt oder gar nicht erscheinen?
V4 — DIFFE Template gegen die 6 generierten paket/*/index.html im Patch: tragen alle exakt denselben Diff, oder ist eine Propagation schiefgegangen?
V5 — GRAMMATIK NACH UMBAU: Lies jede neue Gedankenstrich-Formulierung im Wort-Diff laut — ist der Satz danach vollständig und korrekt (Kongruenz, Kommas)?
V6 — PYTHON-DIFF Stufe 32: Entschuldigt die neue Whitelist-Logik (`w in umfeld and wort in w`) noch alle legitimen Fälle (z.B. Possessiv „Toms" gegen Eintrag „Old Toms Hütte")? Fängt der Max-Regex „Max. Teilnehmer" UND „Max 2h", ohne echte Kinder namens Max zu entschuldigen?
V7 — KONSISTENZ: Erzeugt Fix 1 (motto-spezifische Deko-Zeile) auf irgendeiner Seite eine Zeile, die zum Motto NICHT passt? Prüfe die betroffenen Dateipfade im Patch gegen ihren Motto-Namen.
V8 — SPIELBARKEIT/VERSTÄNDLICHKEIT: Versteht ein Gastgeber ohne Vorwissen die neue Fallback-Box und den Tausch-Satz beim ersten Lesen?

PFLICHTEN:
- Je Finding: wörtliches Zitat aus dem Diff + Dateipfad + Einordnung MAJOR / MINOR / UNSICHER.
- MAJOR nur für Fehler, die gedruckt beim Kunden landen oder den Wächter blind machen.
- Findings aus der False-Positive-Liste nicht wiederholen.
- Am Ende: Score 0-100 für den Reparatur-Diff (100 = alle Fixes korrekt, keine Folgefehler) und das Wort „REVIEW ABGESCHLOSSEN".
