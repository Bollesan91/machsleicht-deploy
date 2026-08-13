# Prüfauftrag: Sicherheitsregeln auf den freien Ratgeberseiten von machsleicht.de

Du begutachtest den Stand `4627c0ac` eines Kinderparty-Portals. Alle Dateien holst du dir
selbst über die Roh-URLs (öffentliches Repo). Du bewertest ausschließlich das, was du dort
liest — nicht, was dir hier beschrieben wird.

## Was der Gegenstand ist

Unter `kindergeburtstag/*-jahre.html` liegen 48 kostenlose Ratgeberseiten (Motto × Altersgruppe
3–5 / 6–8 / 9–12). Jede verkauft Material: Einkaufslisten mit Preisen und Amazon-Links, dazu
ein Deko-Raster. Bis gestern stand auf diesen Seiten **keine einzige Sicherheitsregel**, obwohl
29 der 48 Luftballons führen, 17 Wunderkerzen und drei 3–5-Seiten eine Seifenblasenmaschine.

Die geprüften Regeln lagen in `data/motto/<motto>-<klein|mittel|gross>.json` unter
`variants[].shoppingList[].safetyNote` und wurden nur in einem kostenpflichtigen Paket
gedruckt. Neu ist ein Renderer, der sie auf die freien Seiten zieht: 234 Regeln auf 42 Seiten.

## Die Dateien

- Stellen-Inventar (was steht ab jetzt an welchem Posten — dein Hauptgegenstand):
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/4627c0ac/_dev/review/2026-08-13-regeln-inventar.md
- Der Renderer:
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/4627c0ac/_dev/scripts/regeln-drucken.py
- Die Zuordnungs- und Klassenregel-Datei:
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/4627c0ac/data/freie-seiten-regeln.json
- Die drei Gates:
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/4627c0ac/_dev/scripts/check-freie-seite-regeln.py
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/4627c0ac/_dev/scripts/check-regel-ware.py
- Beispielseiten, jede mit einem anderen Listen-Markup:
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/4627c0ac/kindergeburtstag/meerjungfrau-3-5-jahre.html
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/4627c0ac/kindergeburtstag/feen-9-12-jahre.html
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/4627c0ac/kindergeburtstag/prinzessin-3-5-jahre.html
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/4627c0ac/kindergeburtstag/ritter-6-8-jahre.html
- Eine Quelldatei zum Gegenlesen:
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/4627c0ac/data/motto/meerjungfrau-klein.json

## Prüfwinkel (nummeriert, alle bearbeiten)

**V1 — Steht die Regel am richtigen Posten?** Nimm mindestens 25 Einträge aus dem Inventar,
quer über die Mottos, und prüfe für jeden: Handelt der Regeltext von der Ware, die dieser
Posten verkauft? Eine Regel über Wunderkerzen unter einem Ballon-Posten wäre ein MAJOR — und
genau diese Klasse gab es hier schon. Achte besonders auf Sammelposten („Girlande + Ballons",
„Backmischung + … + Wunderkerze"): Ist die Regel für den riskanten Teil des Bündels gemeint?

**V2 — Stimmt der Text für diese Altersgruppe?** 3–5, 6–8 und 9–12 bekommen unterschiedliche
Wortlaute. Rechne nach, ob das zusammenpasst: Bekommt eine 9–12-Seite eine Regel, die von
Kleinkindern spricht? Steht auf einer 3–5-Seite die entschärfte Fassung? Bei Folienballons
(prinzessin, superheld) wurde bewusst ein anderer Text gewählt als bei Latexballons —
**recherchiere selbst**, ob die Unterscheidung fachlich trägt (platzen Folienballons in
Fetzen? worin besteht dort das Risiko?), und ob der gewählte Text die reale Gefahr trifft.

**V3 — Was NICHT gedruckt wird.** In `data/freie-seiten-regeln.json` steht unter `keinPosten`,
welche Regeln bewusst weggelassen wurden, mit Begründung. Lies jede einzeln und prüfe die
Begründung gegen die zugehörige Seite: Verschweigt eine dieser Entscheidungen eine echte
Gefahr, weil die Seite die Ware doch führt (auch außerhalb der Einkaufsliste, z. B. in einer
Bastel-Anleitung oder im Zeitplan)?

**V4 — Die Waren-Klassenregeln.** Unter `warenRegeln` bekommt jede Ware EINEN Wortlaut je
Altersgruppe, wörtlich aus dem Katalog übernommen, und der Renderer hängt ihn an jeden
passenden Posten. Prüfe die Muster (reguläre Ausdrücke!) auf Über- und Untertreffer: Welcher
reale Postenname würde fälschlich eine Regel bekommen? Welcher riskante Posten rutscht durch?
Prüfe auch die Übernahme über Altersgruppen hinweg (`herkunft` nennt sie), wo ein Wortlaut
mangels eigener Fassung aus einer anderen Altersgruppe stammt.

**V5 — Der Maschinen-Vertrag.** Der Renderer behauptet drei Eigenschaften: idempotent (zweiter
Lauf ändert nichts), fail-loud (eine Regel ohne Anker bricht ab), konvergent mit dem
Generator `_src/generate-age-pages.py` (gleiches Markup). Lies den Code und suche die Fälle,
in denen eine dieser Zusagen bricht — etwa Regeltexte mit HTML-Sonderzeichen, verschachtelte
Spans, Seiten mit mehreren Deko-Rastern, ein Posten, der in zwei Blöcken identisch heißt.

**V6 — Blindstellen der Gates.** `check-freie-seite-regeln.py` (jeder riskante Posten braucht
eine Regel) und `check-regel-ware.py` (die Regel muss von ihrer Ware sprechen) sollen künftig
verhindern, dass die Klasse zurückkommt. Konstruiere je Gate mindestens einen konkreten
Fehler, der durchginge, und benenne ihn als Testfall.

**V7 — Fachliche Richtigkeit der Aussagen.** Greif dir die Regeln zu Luftballons,
Knopfzellen/LED-Teelichtern, Wunderkerzen, Nebelmaschine und Gips. Recherchiere die
Sachlage (BfR, DGUV, Herstellerangaben, Fachliteratur) und sag, wo eine Aussage falsch,
veraltet oder gefährlich unvollständig ist. Zahlen (Abstände, Zeiten, Altersgrenzen) rechne
oder belege nach.

**V8 — Wirkung auf den Leser.** Diese Seiten liest ein gestresstes Elternteil auf dem Handy.
Sind 10+ Regeln auf einer Seite noch lesbar oder ertrinkt die wichtigste im Rauschen? Ist
eine Regel so formuliert, dass sie im Laden oder am Partytag tatsächlich befolgbar ist?
Wo ist sie bloß Absicherung statt Hilfe?

## Wie du berichtest

- Jedes Finding mit **wörtlichem Zitat** aus der Datei plus Datei und Fundstelle. Ohne Zitat
  zählt es nicht.
- Einstufung **MAJOR** (falsch, gefährlich oder irreführend) / **MINOR** (stört, aber nicht
  gefährlich) / **UNSICHER** (du vermutest, kannst es nicht belegen — sag, was fehlt).
- Wenn du etwas prüfst und es in Ordnung ist, sag das ebenfalls kurz — ich brauche zu wissen,
  was abgedeckt wurde.
- Am Ende: **eine Zahl von 0 bis 100** für den Gesamtstand dieses Artefakts, plus in einem Satz,
  woran die Zahl hängt.

Du musst nichts schonen. Der Gegenstand ist Kindersicherheit auf Seiten, die täglich Eltern
erreichen — ein übersehener Fehler ist teurer als ein Fehlalarm.
