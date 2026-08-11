Du bist unabhängiger Gutachter für einen REPARATUR-Diff (Baustellen-Kindergeburtstagspaket, Diff-Re-Check Runde 5). Das Vorgutachten (62/100) fand 6 MAJORs — Kernbefund: die Datenfixes endeten an der Datenschicht, während die drei freien Planerseiten (statisch generiert) 15 Vorher-Strings weitertrugen, darunter das 5-cm-Sicherheitskriterium. Deine Aufgabe: (a) jede Fix-Behauptung am HEUTIGEN After-State verifizieren, (b) den Fix-Diff adversarial auf NEUE Fehler lesen.

KONTEXT: Druckprodukt „Komplettpaket" — paket/baustelle/index.html rendert client-seitig (paket/core/paket-core.js) aus data/motto/baustelle-{klein,mittel,gross}.json. Die freien Planerseiten kindergeburtstag/baustelle-{3-5,6-8,9-12}-jahre.html werden von _src/generate-age-pages.py aus einem ZWEITEN Katalog (_src/elite-motto-data/baustelle-*.json) statisch generiert. ARCHITEKTUR-ENTSCHEIDUNG (deklariert, kein Finding): Die elite-variants bleiben ein eigener Planer-Spielkatalog (z. B. 15er-Werkzeug-Quiz mit „10 von 15 richtig", Sand-Schatzsuche als klein-Spielname, eigene Einkaufslisten) — die Umstellung der Planerseiten auf data/motto ist ein separates Ticket. In dieser Welle wurden nur synchronisiert: faq, parentTips, preparationWeeks, sosScenarios, signatureRitual (aus data/motto kopiert) plus die Sicherheits-/Zahlenklasse in den elite-variants. Ebenfalls deklariert: Kuchenrezept-Gramm (300 g Mehl usw.), „1 Pkt pro 5 cm" (Bewertungsregel, kein Sicherheitskriterium), YouTube-Titel „Bau-Doku Hochhaus" sind legitim. rolesList-Filter: Rollen ohne abVariante drucken immer, abVariante standard|wow filtert. Schatzsuche generell abgeschaltet.

PRÜFOBJEKT (SHA 5e95aa798a757b142b9646803ec09fc75e21a26d):
  Fix-Diff: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/5e95aa798a757b142b9646803ec09fc75e21a26d/_dev/review/2026-08-11-recheck5-fixes.patch
  After-State:
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/5e95aa798a757b142b9646803ec09fc75e21a26d/data/motto/baustelle-klein.json
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/5e95aa798a757b142b9646803ec09fc75e21a26d/data/motto/baustelle-mittel.json
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/5e95aa798a757b142b9646803ec09fc75e21a26d/data/motto/baustelle-gross.json
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/5e95aa798a757b142b9646803ec09fc75e21a26d/kindergeburtstag/baustelle-3-5-jahre.html
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/5e95aa798a757b142b9646803ec09fc75e21a26d/kindergeburtstag/baustelle-6-8-jahre.html
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/5e95aa798a757b142b9646803ec09fc75e21a26d/kindergeburtstag/baustelle-9-12-jahre.html
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/5e95aa798a757b142b9646803ec09fc75e21a26d/paket/core/paket-core.js
  False-Positive-Liste: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/5e95aa798a757b142b9646803ec09fc75e21a26d/OFFENE-REVIEW-PUNKTE.md

WAS DER FIX-DIFF BEHAUPTET:
H1 (M-A) Die drei Planerseiten wurden aus den nachgezogenen elite-Daten REGENERIERT; keiner der 15 Vorher-Strings des Vorgutachtens steht noch auf ihnen (u. a. „4-6 Prüfungs-Stationen (Variant-abhängig)", Maurerin „Vibrations-Test", materialNote „Last-Steigerung"/„Werkzeug-Premium"-Aufzählung, „Sand-Schatzsuche durch Werkzeug-Memory ersetzen", dayOf-Stationszahlen).
H2 (M-B) Kein „mind. 5 cm"/„Mindestens 5 cm" als Schrauben-Sicherheitskriterium mehr auf der 3-5-Seite (sichtbare FAQ UND JSON-LD sprechen Kleinteile-Check/Klopapierrolle); Klötze einheitlich 15 cm.
H3 (M-C) mittel Schrauben-Karte kanonisch 25: material „25 Plastik-Schrauben…", prepText „25 XL-Plastik-Schrauben … im Sandkasten oder in der Wohnung verstecken" (Datei-Leak „(klein/mittel)…(mittel/groß)" weg), steps[0] „25 verschollen", steps[2] „min. 3 Schrauben" (8×3=24≤25); Einkaufsliste „Plastik-Schrauben (25)" unverändert. Gleiche Kohärenz in elite-mittel.
H4 (M-D) „Fassung" kommt in keiner der drei data/motto-Dateien mehr vor (gross introText „Anzahl je nach Variante").
H5 (M-E) klein Kran-Fahrer abVariante wow (Kran nur in Wow-Einkaufsliste); mittel Kran-Fahrer abVariante standard (Kran-Spielzeug ab Standard-Deko).
H6 (M-F) mittel regen.steps[3] beginnt „(Nur Wow-Variante) Beim Schubkarren-Lauf…"; gross SOS-Label „Brücke bricht zu schnell (Wow-Variante)".
H7 (MINORs) Eimer-Chef-Emoji 🪣; „(Haus/Brücke/Burg)" statt „…/Hochhaus" (4 Stellen inkl. elite); „Brücken tragen das Gewicht"; Maurerin „Misst beim Bauklotz-Wettbewerb die Höhe und macht den Wackel-Test" (kein Doppelpunkt im Chip); „nur die Wow-Variante braucht das Brücken-Bau-Set"; paket-core.js-Kommentar beschreibt jetzt exakt die kernPasstNoch-Maschine (Stufe 3 separat).
H8 (Generator) savingsTip/costContext als {title,body}-Objekte werden sauber gerendert — kein rohes dict-Literal im sichtbaren Text der drei Seiten.

PRÜFWINKEL:
R1 — Jede H-Behauptung am After-State wörtlich belegen (Datei + Zitat). Für H1/H2: die drei Planerseiten-HTMLs selbst durchsuchen (auch JSON-LD-Blöcke!), nicht nur die JSONs.
R2 — NEUE Fehler im Fix-Diff, Schwerpunkt Nachbarzeilen der angefassten Karten: mittel Schrauben-Karte komplett (ageAdjust6 „15 Schrauben"/ageAdjust8 „20 Schrauben" sind Alters-ANWEISUNGEN — bei 25 gekauften konsistent als Teilmenge?); klein-Rollenliste nach Kran-Fahrer-wow (bleibt in standard genug zu tun?); gross-Rollenchips Maurerin/Statikerin nebeneinander gedruckt; der Feld-Sync könnte elite-interne Querbezüge gebrochen haben (sprechen gesyncte preparationWeeks/sosScenarios von Spielen, die es im elite-Planer-Katalog der Seite nicht gibt — und umgekehrt: bleibt der deklarierte Katalog-Split an irgendeiner Stelle KUNDENSICHTBAR widersprüchlich auf EIN UND DERSELBEN Seite?).
R3 — Restlöcher: „5 cm" als Sicherheitskriterium irgendwo (Wortgrenze beachten, „15 cm" ist legitim), „Fassung", „Hochhaus" außerhalb des Videotitels, „min. 3-4", „15-20 große", Kran-Widersprüche, Stufe-31-Muster (rohes dict im sichtbaren Text).
NICHT PRÜFEN: kostenKontext-Skalierung (M6-Ticket) · estimatedCostEur gross/wow 635≠555 (Ticket) · elite-variants-Katalog-Identität mit dem Paket (deklariertes Ticket, s. o.) · Stufe-34-Blindstellen für Countdown-/Kategorien-Zahlen (Linter-Ticket) · ritter/pferde-Seiten · _bundle.js · schatzsuche.json · FP-Liste #13-15.

PFLICHTEN: Je Finding wörtliches Zitat + Datei + MAJOR/MINOR/UNSICHER; MAJOR nur wenn gedruckt beim Kunden (Paket ODER Planerseite). Score 0-100. Abschluss: „REVIEW ABGESCHLOSSEN".
