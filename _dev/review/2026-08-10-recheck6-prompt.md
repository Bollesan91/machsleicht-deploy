Du bist unabhängiger Gutachter für einen sehr kleinen REPARATUR-Diff (Folgerunde 4, Abschlussrunde). Das Vorgutachten (84/100) fand zwei gedruckte Bestands-QA-Notizen und sieben Minors; alle liegen als ein Commit repariert vor. Prüfe NUR: (a) schließt jede Reparatur ihr Finding, (b) haben die Reparaturen NEUE Fehler eingebaut. Halte dich kurz — der Diff ist klein, gezielte Prüfung statt Breitensuche.

KONTEXT: Druckprodukt „Komplettpaket" (paket/_maschine/template.html client-seitig; sechs paket/*/index.html GENERIERT, gleicher Diff) + data/schatzsuche.json + Linter _dev/scripts/check-meta-vokabular.py.

PRÜFOBJEKT (SHA {SHA}) — der komplette Diff:
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/{SHA}/_dev/review/2026-08-10-recheck6-fixes.patch

BEHAUPTUNGEN:
1. QA-Notiz "(NICHT 'Tinkturregel' — das ist Heraldik!)" aus Stationskarte entfernt → "Zug- und Druckkräfte erklären."
2. "FAQ-VOLLTEXT VERFÜGBAR: FAQPage-JSON-LD ist in HTML deployed. " und " (NICHT 200kg-Marketing)" aus materialNote/Live-Seite entfernt (Motto+Elite+Bundle+HTML).
3. Ei-Zeile: "…oder ein Rezept mit weniger Eiern wählen — und auch diese wie oben ersetzen." (Restlesart "Ei bleibt drin" zu?)
4. Laktose: "; steht Soja drauf, ebenfalls den Haferdrink nehmen."
5. hint: "Lösungshilfe zur Polierin-Frage: …"
6. Gemeinsame Konstante ALLERGIE_NEGATION = /^(kein(e[rs]?)?( allergien| bekannt)?|nein|nichts|nix|ohne|[kn]\.?\s?a\.?|n\/a|[-–—.\/]+)[.!]*$/i — jetzt in allergieZeile UND allergieTausch (beide Funktionen einer Meinung).
7. Stufe 33 erweitert: \bTODO\b, (?-i:NICHT ') (nur GROSS — kleingeschriebenes "nicht '…'" ist Elterntext), FAQ-VOLLTEXT, JSON-LD, \bdeployed\b, -Marketing\).

PRÜFWINKEL (nur diese):
V1 — ALLERGIE_NEGATION adversarial: Frisst sie eine ECHTE Meldung? („Ohne Gluten backen"? „Keine Nüsse"? „Nickel"? „nussfrei"?) Und: Ist die Konstante im Template VOR beiden Funktionen definiert (Hoisting/Reihenfolge im Diff prüfen)?
V2 — Ei-Zeile final laut lesen: restlos eindeutig?
V3 — Stufe-33-Erweiterung: false-positive-Risiko von \bdeployed\b/JSON-LD/-Marketing\) auf legitimen Seiten-Text? (?-i:…)-Scoping syntaktisch korrekt für Python re?
V4 — Propagation 6/6 byte-gleich?

PFLICHTEN: Je Finding wörtliches Zitat + Pfad + MAJOR/MINOR/UNSICHER. Am Ende Score 0-100 und „REVIEW ABGESCHLOSSEN".
