Ich hole mir zuerst das Briefing-Template und die Materialien.

Fetching site
Fetched: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/_dev/content-loop/runs/17-safari-adversarial/adv-prompt-template.md

Briefing klar. Ich hole jetzt alle vier Materialien für Stream C.

Running command
Alle vier Materialien per Raw-URL holen

Alle da. Sicherstellen, dass es valides JSON ist, dann Struktur ansehen.

JSON-Validität und Top-Level-Struktur prüfen
JSON-Validität und Top-Level-Struktur prüfen

schema_version fehlt auf Top-Level — liegt evtl. in _meta. Ich vergleiche die Struktur direkt mit den Vorbildern.

_meta und Strukturvergleich gegen Vorbilder
_meta und Strukturvergleich gegen Vorbilder

Top-Level-Keys identisch zu Feuerwehr. schema_version lebt korrekt in _meta (1.0), genau wie bei den Vorbildern — kein Schemafehler. Jetzt die Substanz: variants, games, Codeknacker-Wörter, Ritual.

3 Befehle ausgeführt
3 Befehle ausgeführt

Alle games haben steps, whyItWorks und indoorTip, shoppingList vollständig kategorisiert. Jetzt der kritische Check: Codeknacker-Wörter WASSER/FELS/TEMPEL/TOR — wirklich konsistent in den games[]?

Codeknacker-Wörter in den steps der relevanten Spiele tracken
Codeknacker-Wörter in den steps der relevanten Spiele tracken

Codeknacker-Logik ist sauber durchgerechnet. Jedes Wort wird durch eine nachvollziehbare Rätselmechanik erzeugt (Sortieren, Falsches-Tier-Finden, Alphabet). Ich prüfe jetzt die WASSER-Lösung im Detail (Sortier-Logik) und die TEMPEL-Wow-Mechanik, weil das die Stellen sind, wo Adversarial-Reviewer Bugs finden.

Codeknacker-Sortierlogik rechnerisch verifizieren
Codeknacker-Sortierlogik rechnerisch verifizieren

Alle vier Codewörter rechnerisch konsistent. Jetzt der Ritual-Check: Sorgfalt-Spezialist statt Tempo, und das Spezialisten-Ritual gegen die Hero-Botschaft im HTML.

SignatureRitual und ageInsight ansehen — Sorgfalt-Check
SignatureRitual und ageInsight ansehen — Sorgfalt-Check

Sorgfalt-Spezialist ist explizit und korrekt umgesetzt — sogar mit anti-Tempo-Begründung ("nicht dafür, schnell gewesen zu sein"). Jetzt prüfe ich die Hero-Botschaft im HTML gegen das Ritual und checke parentTips, sosScenarios, preparationWeeks, faq sowie den "habIchVielleicht / Mini-Tierfigur"-Check.

Hero-Botschaft im HTML + Mini-Tierfigur/habIchVielleicht im JSON
Hero-Botschaft im HTML + Mini-Tierfigur/habIchVielleicht im JSON

Hero-Botschaft im HTML ("zählt nicht, wer der Schnellste ist — sondern wer hinschaut") deckt sich exakt mit dem Ritual und dem Sorgfalt-Stempel. Mini-Tierfigur + habIchVielleicht vorhanden. Jetzt die Shopping-List-Struktur des habIchVielleicht-Felds und die letzten Schema-Sektionen.

Running command
ShoppingList-Item-Schema + Mini-Tierfigur als habIchVielleicht prüfen

Mini-Tierfigur ist als habIchVielleicht mit Altersgrenz-Hinweis ("Bei 11-12 weglassen") — genau wie das Briefing es verlangt. Schema-Item-Felder vollständig (category, categoryReasoning, hasAffiliate). Eine potentielle Schwäche: die Affiliate-URL B07SAFARIFIG sieht wie ein Platzhalter aus. Das prüfe ich, plus die restlichen Sektionen.

Amazon-ASINs auf Platzhalter prüfen, gegen Feuerwehr vergleichen
Amazon-ASINs auf Platzhalter prüfen, gegen Feuerwehr vergleichen

Wichtiger Befund: Alle 7 Affiliate-URLs in safari-gross sind Platzhalter-ASINs (B07FERNGLAS, B07SAFARIFIG etc. — keine echten 10-stelligen Amazon-ASINs). Das Vorbild Feuerwehr hat gar keine Amazon-Links. Das ist eine echte Schwäche, die ich im Review benennen muss. Jetzt die restlichen Sektionen für die Tiefen-Bewertung.

2 Befehle ausgeführt
2 Befehle ausgeführt

sosScenarios und die anderen Sektionen sind als Objekte (dicts) keyed, nicht als Listen. Sehe ich mir an.

SosScenarios + parentTips + preparationWeeks + faq als dicts inspizieren
SosScenarios + parentTips + preparationWeeks + faq als dicts inspizieren

Alle Sektionen sind voll: sosScenarios 8/8 mit je 500-700 Zeichen (icon/label/headline/steps), preparationWeeks 6 Sektionen, parentTips strukturiert + educationalValue, faq 5. Die Szenarien sind altersgerecht (codeknacker_frust, handy_abdriften — sehr 9-12-spezifisch). Ich vergleiche jetzt die Tiefe quantitativ gegen Feuerwehr/Einhorn und prüfe Bolle-Ton auf verbotene Marketing-Phrasen.

Quantitativer Vergleich Safari vs Vorbilder + Bolle-Ton Phrasen-Check
Quantitativer Vergleich Safari vs Vorbilder + Bolle-Ton Phrasen-Check

Safari-gross ist quantitativ über beiden Vorbildern (72k chars vs 60k/48k, 11 games, 41 shop items). Ton ist sauber bis auf 3× "perfekt" und 1× "highlight" — ich checke diese 4 Stellen, ob sie wirklich Marketing-Phrasen oder harmlos sind.

Kontext der perfekt/highlight-Stellen prüfen
Kontext der perfekt/highlight-Stellen prüfen

Diese Verwendungen sind alle funktional, nicht werblich — "perfekte Tarn-Kulissen" (Spielanleitung), "funktioniert perfekt als Schlafparty-Auftakt" (sachliche Eignung), "Highlight-Mitgebsel" als Produktkategorie. Kein leeres Marketing-Sprech. Der Ton ist sauber. Ich habe jetzt alle Daten für ein fundiertes Urteil. Letzter Check: HTML-Source-Abgleich für die Konkurrenz-Differenzierung — kommen die echten Mehrwerte aus dem HTML im JSON an?

HTML-zu-JSON Differenzierungs-Abgleich + Pirsch-Raum-Check
HTML-zu-JSON Differenzierungs-Abgleich + Pirsch-Raum-Check

Vollständige Daten erhoben. Alle HTML-Differenzierungselemente kommen im JSON an, Pirsch hat einen Indoor-Raum-Tip. Das Urteil ist fundiert. Ich erstelle das Review in den 6 geforderten Sektionen.

Adversarial Re-Review — safari-gross.json (Safari 9-12, Stream C)

Reality-Check gegen Feuerwehr/Einhorn-Vorbilder. Alle Codeknacker-Codes rechnerisch nachgerechnet, Schema strukturell gegen Feuerwehr verglichen, Ton-Phrasen gegrept.

1. Score nach Rubrik
Dimension	Punkte	Begründung
Inhaltliche Tiefe	28/30	Codeknacker-Steps sind echte, lösbare Rätsel (Sortier-Mechanik, Falsches-Tier, Alphabet) statt Platzhalter; sosScenarios 500-700 Zeichen mit altersgerechten Fällen (codeknacker_frust, handy_abdriften). −2 weil Standard-Spiel Tier-Identifikations-Test nur 3 steps hat (dünnste Station).
Schema-Vollständigkeit	20/20	Alle 11 games mit steps + whyItWorks + indoorTip; sosScenarios 8/8; preparationWeeks 6/6; alle 41 shoppingList-Items mit category + categoryReasoning. Keine Lücke gefunden.
Story-Konsistenz	15/15	Reservat/Spezialisierung/Pirsch/Pirsch-Code durchgezogen (70/61 Treffer); Codewörter WASSER→FELS→TEMPEL→TOR konsistent über alle drei Varianten; Ritual altersgerecht (Spezialisten-Lizenz statt Verkindischung).
Konkurrenz-Differenzierung	14/15	Selbst-gewählte Spezialisierung, ernster Reservat-Brief, Sorgfalt-statt-Tempo-Logik, Schlafparty-Anschluss — alle aus HTML korrekt übernommen. −1: kein Mehrwert, der über Feuerwehr hinausgeht außer dem Codeknacker-Kern.
Bolle-Ton	9/10	Keine echten Marketing-Phrasen (sweet spot/unvergesslich/magisch = 0). "perfekt"×3 und "Highlight"×9 sind alle funktional ("perfekte Tarn-Kulisse", "Highlight-Mitgebsel"-Kategorie), nicht werblich. −1 für leichte Häufung.
Schema-Korrektheit	9/10	Valides JSON, schema_version 1.0 in _meta (wie Feuerwehr/Einhorn), motto/ageGroup/ageRange korrekt. −1: Affiliate-URLs sind Platzhalter-ASINs (B07SAFARIFIG, B07FERNGLAS…) mit hasAffiliate: true — Schema sagt "echt", Daten sind fake.
TOTAL	95/100	
2. Drei stärkste Aspekte
Codeknacker rechnerisch wasserdicht (variants[0].games[0].steps[1-9]): Die WASSER-Lösung funktioniert — Warzenschwein 100 → Antilope 60 → Schakal 15 → Strauß 12 → Erdmännchen 1 → Ratte 0,3 ergibt W-A-S-S-E-R. Sogar die Strauß-Falle (12 kg leichter als Schakal 15 kg, step3) ist als bewusster Lerneffekt eingebaut. Ich habe alle vier Codes nachgerechnet — alle korrekt.
Sorgfalt-Logik konsequent gegen Tempo gestellt (signatureRitual.setupSteps[4] + ageInsight.traits[2]): "Anerkennung dafür, hingeschaut zu haben, nicht dafür, schnell gewesen zu sein" deckt sich 1:1 mit der HTML-Hero-Botschaft ("Im Reservat zählt nicht, wer der Schnellste ist — sondern wer hinschaut"). Briefing-Check bestanden.
sosScenarios echt altersspezifisch (sosScenarios.codeknacker_frust, .handy_abdriften): Statt generischer Regen/Streit-Fälle gibt es 9-12-reale Szenarien — Cross-Hilfe bei festsitzendem Team, Handy-Einsammeln zwischen Stationen. Das könnte ein Standard-Planer nicht.
3. Fünf schwächste Stellen + Fix
Platzhalter-Affiliate-ASINs mit hasAffiliate: true (alle 7 shoppingList-URLs, z.B. variants[0].shoppingList): B07SAFARIFIG, B08STIRNLAMP etc. sind keine echten Amazon-ASINs. Bei Deploy zeigen die Links 404. Fix: Entweder echte ASINs einsetzen oder url: null + hasAffiliate: false (so macht es Feuerwehr — gar keine Amazon-Links). Aktueller Zustand ist eine Live-Lüge im Schema.
Tier-Identifikations-Test nur 3 steps (variants[1].games[0]): Dünnste Station im Standard, während die anderen 4-5 haben. Fix: 1-2 steps ergänzen — z.B. Schwierigkeitsstufe (heimische vs. exotische Tiere) oder Selbst-Check-Step analog zum Minimal-Codeknacker.
Pirsch-Indoor-Tip nur bei Standard, nicht bei Wow (variants[2] Nacht-Safari hat indoorTip, aber die Wow-Schatzsuche Station 4 "6-Meter-Strecke" hat keinen Raum-Fallback): 6 Meter raschelfreie Strecke setzt Platz voraus. Fix: indoorTip mit Strecken-Verkürzung auf 60-75m²-Wohnung ergänzen, analog zum Briefing-Pirsch-Check.
B07SAFARIFIG doppelt mit unterschiedlicher Kategorie (minimal = habIchVielleicht, standard = sinnvoll): Gleiches Produkt, zwei Einstufungen. Inhaltlich begründbar (Mengenlogik), aber für einen Käufer verwirrend. Fix: categoryReasoning beim Standard-Item explizit auf "anders als Minimal weil…" beziehen.
"Highlight" 9× gehäuft (überwiegend rund um Filz-Buschhüte): Funktional korrekt, aber als Wort überstrapaziert. Fix: 3-4 Vorkommen durch "teuerstes Mitgebsel" / "Wow-Posten" ersetzen — senkt die Wiederholung.
4. Story-/Schema-Konsistenz-Check
Top-Level-Schema identisch zu Feuerwehr (16 Keys, exakt gleiche Reihenfolge inkl. ageInsight, das Einhorn fehlt). Keine fehlenden Pflichtfelder gegenüber den Vorbildern.
Codewort-Konsistenz über klein/mittel/gross: konnte ich nur für gross prüfen (Stream C). Innerhalb gross sind WASSER/FELS/TEMPEL (Minimal), TOR (Standard), TEMPEL (Wow, 5 Stationen) durchgezogen und in _meta.phase_b_method dokumentiert. Offene Lücke zu A/B: ob die Codewort-Schwierigkeit sauber von mittel zu gross eskaliert, kann nur ein Cross-Stream-Abgleich klären — das liegt außerhalb meines Reviews.
Einziger echter Schema-Defekt: die Platzhalter-ASINs (siehe 3.1). Feuerwehr umgeht das Problem, indem es null Amazon-Links setzt — Safari hat sich hier ein Risiko eingehandelt, das die Vorbilder nicht haben.
5. Verdict

95/100 → ready. Liegt klar über der 85er-Schwelle und über beiden Vorbildern.

Der eine Edit mit dem größten Hebel ist trotzdem die Platzhalter-ASINs: nicht weil er Punkte hebt (kostet nur 1), sondern weil er der einzige Defekt ist, der bei Live-Schaltung sichtbar bricht. Alles andere ist Politur. Entweder echte ASINs oder auf das Feuerwehr-Muster (url: null) zurückgehen — vor Deploy zwingend, nicht optional.

6. Vergleich zu Feuerwehr/Einhorn

Quantitativ drüber: 72.3k chars vs. Feuerwehr 59.7k vs. Einhorn 47.8k. 11 games (vs. 10/8), 41 shoppingList-Items (vs. 39/30), sosScenarios 8 bei allen gleich.

Qualitativ auf Augenhöhe bis leicht drüber: Der Codeknacker-Kern ist ein echter inhaltlicher Mehrwert, den weder Feuerwehr noch Einhorn in dieser durchgerechneten Tiefe haben — vier funktionierende Rätsel-Codes mit Selbst-Check-Mechanik ist mehr als ein Stations-Durchlauf. Die Sorgfalt-statt-Tempo-Logik ist altersgerecht schärfer ausgearbeitet als ein generisches Ritual.

Der eine Punkt, wo Safari unter den Vorbildern liegt: Datenhygiene bei Affiliate-Links. Feuerwehr hat das Problem durch Verzicht gelöst; Safari hat fake ASINs mit hasAffiliate: true drin. Das ist der einzige Bereich, in dem das Vorbild sauberer ist als die neue Datei.