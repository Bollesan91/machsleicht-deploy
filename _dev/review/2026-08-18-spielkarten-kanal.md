# Prüfauftrag — Sicherheitsregeln an Spielkarten (machsleicht.de)

Du prüfst eine Änderung an einer öffentlichen deutschen Elternratgeber-Website. Sie
druckt **Sicherheitshinweise zu Kinderspielen** in Ratgeberseiten für Kindergeburtstage.
Zielgruppe sind Eltern, die eine Party für Kinder von 3 bis 12 Jahren planen. Wenn ein
Hinweis falsch, zu lasch oder am falschen Spiel steht, plant ein Elternteil danach.

Du hast Websuche. Das Repo ist öffentlich; **hol dir alle Dateien selbst** per raw-URL
(unten). Verlass dich nicht auf meine Beschreibung — sie kann Fehler enthalten, und genau
die sollst du finden.

---

## 1. Der Stand vor der Änderung (kurz, damit du weißt, worauf sie aufsetzt)

Die Website hat zwei getrennt gewachsene Datenbestände für dieselben Partys:

* **`data/motto/<motto>-<gruppe>.json`** — der Datensatz. Enthält je Party-Variante
  (minimal/standard/wow) eine Einkaufsliste (`shoppingList[]`, jeder Posten mit
  optionalem `safetyNote`) und eine Spieleliste (`games[]`, jedes Spiel mit optionalem
  `safetyRule`).
* **`kindergeburtstag/<motto>-<alter>-jahre.html`** — 45 öffentliche, handgeschriebene
  Seiten. Sie sind kein Generator-Ergebnis, sondern eingefrorenes HTML.

Ein Renderer (`_dev/scripts/regeln-drucken.py`) druckte bisher **nur** `safetyNote` an
die Einkaufsposten der Seiten: 764 Regeln auf 45 Seiten. Das Feld `safetyRule` am Spiel
wurde **nie** gedruckt — es existierte nur im Datensatz, den kein Leser sieht.

Ein Linter (`validate-all.sh`) fährt rund 50 Prüfstufen. Stufe 49 misst, wie viele
Verbots-Sätze aus `games[].safetyRule` es auf die Seite schaffen; vor der Änderung
meldete sie **146 nicht angekommene Verbote**.

## 2. Was die Änderung behauptet

1. Ein **zweiter Kanal** druckt `games[].safetyRule` als `<p class="spiel-safe">` ans
   Ende der passenden Spielkarte (`<div class="game-detail">`) der öffentlichen Seite.
2. Die Zuordnung Karte↔Spiel steht **ausdrücklich** in `spielAnker` in
   `data/freie-seiten-regeln.json`, weil Seite und Datensatz dieselbe Tätigkeit
   verschieden benennen.
3. Drei Zuordnungen stehen zusätzlich in `spielAnkerOhneWortdeckung` mit Begründung,
   weil ein maschinischer Wortabgleich sie verwirft.
4. Zwei neue Prüfstufen: **52** (Brücke zeigt nirgends ins Leere) und **51** (keine
   C1-Steuerzeichen im HTML).
5. Auf einer Seite wurden 47 kaputte Steuerbytes entfernt, eines davon im `og:title`.

**Gezählte Zahlen, die du nachrechnen sollst** (sie stammen aus meinen eigenen Läufen und
können falsch sein):

| Größe | behauptet |
|---|---|
| Spielkarten auf den 45 Seiten | 225 |
| Spielregeln in `data/motto` | 655 |
| Einträge in `spielAnker` | 122, auf 26 Seiten |
| gedruckte `spiel-safe`-Absätze | 140 |
| Seiten ohne jede Spielkarte | 6 (dschungel, feen) |
| Spielkarten ohne Gegenstück im Datensatz | 52 |
| Stufe 49 vorher → nachher | 146 → 84 |

## 3. Material

Diff der Änderung (Code, Daten, Linter, dazu eine Seite vollständig):
https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/SHA/_dev/review/2026-08-18-spielkarten-kanal-diff.md

Der Renderer mit dem neuen Kanal:
https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/SHA/_dev/scripts/regeln-drucken.py

Die Brücken-Datei (`spielAnker`, `spielAnkerOhneWortdeckung`, und die ältere
Einkaufs-Brücke):
https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/SHA/data/freie-seiten-regeln.json

Die beiden neuen Prüfstufen:
https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/SHA/_dev/scripts/check-spielanker.py
https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/SHA/_dev/scripts/check-steuerzeichen.py

Die Stufe, deren Zahl sich ändern soll:
https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/SHA/_dev/scripts/check-spielregel-ankunft.py

Beispiel-Datensätze (Spiele mit `safetyRule`):
https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/SHA/data/motto/dino-klein.json
https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/SHA/data/motto/prinzessin-klein.json
https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/SHA/data/motto/superheld-mittel.json

Ergebnis-Seiten (öffentlich, so wie ein Elternteil sie sieht):
https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/SHA/kindergeburtstag/dino-3-5-jahre.html
https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/SHA/kindergeburtstag/prinzessin-3-5-jahre.html
https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/SHA/kindergeburtstag/superheld-6-8-jahre.html
https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/SHA/kindergeburtstag/meerjungfrau-3-5-jahre.html
https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/SHA/kindergeburtstag/dschungel-3-5-jahre.html

Gedächtnis des Projekts — **respektiere die Liste verworfener Findings**, ein dort schon
widerlegter Punkt zählt nicht:
https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/SHA/_dev/OFFENE-REVIEW-PUNKTE.md
https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/SHA/_dev/LEKTIONEN.md

---

## 4. Winkel — arbeite sie einzeln ab

**W1 — Sitzt jede Regel am richtigen Spiel?**
Nimm mindestens 20 Einträge aus `spielAnker`, verteilt über verschiedene Mottos und
Altersgruppen. Für jeden: Öffne die Seite, such die Karte mit dem genannten Titel, lies
ihren Text. Öffne den Datensatz, such das genannte Spiel, lies `material` und
`description`. **Beschreiben beide dieselbe Tätigkeit?** Wenn nicht: Welche Regel steht
jetzt unter welchem falschen Spiel, und was rät sie dem Elternteil fälschlich?

**W2 — Ist eine gedruckte Regel lockerer als das, was die Daten verlangen?**
Das ist die gefährliche Richtung: Der Elternteil liest die Seite, nicht das JSON. Such
Fälle, in denen die gedruckte `safetyRule` weniger verbietet als ein anderer Satz
desselben Datensatzes oder als eine gedruckte Einkaufsregel **auf derselben Seite**.
Diffe dazu die `spiel-safe`-Absätze gegen die `shop-safe`-Absätze derselben Seite:
widersprechen sich zwei gedruckte Regeln?

**W3 — Die drei dokumentierten Ausnahmen.**
`spielAnkerOhneWortdeckung` nennt drei Zuordnungen, bei denen Karten- und Spieltext kein
gemeinsames Inhaltswort haben und die trotzdem übernommen wurden, mit Begründung. Prüfe
jede einzeln gegen Karte und Datensatz: **Trägt die Begründung, oder ist das eine
Ausrede?** Wenn sie nicht trägt: Was steht dem Leser jetzt Falsches da?

**W4 — Täuscht die Seite Vollständigkeit vor?**
26 der 45 Seiten tragen jetzt Spielregeln, 19 nicht. Sechs Seiten (dschungel, feen) haben
gar keine Spielkarten. 52 Spielkarten haben im Datensatz kein Gegenstück und bekommen
deshalb nie eine Regel. Frage: **Erzeugt der neue rot umrandete Kasten den Eindruck, dass
ein Spiel ohne Kasten geprüft und unbedenklich sei?** Vergleiche `dino-3-5-jahre.html`
(viele Kästen) mit `dschungel-3-5-jahre.html` (keiner). Was denkt ein Elternteil?

**W5 — Doppelungen und Lesbarkeit.**
Manche Karten stehen auf derselben Seite mehrfach (in zwei Varianten-Abschnitten) und
bekommen die Regel jedes Mal. Zähle nach, wie oft derselbe Regeltext auf einer Seite
steht. Prüfe außerdem: Steht dieselbe Aussage schon in einer Einkaufsregel derselben
Seite? Ist der Text am Ende einer langen Spielkarte an der Stelle, an der ein Elternteil
ihn braucht — oder zu spät?

**W6 — Fachliche Richtigkeit der gedruckten Regeln.**
Die Regeln stammen aus dem Datensatz und wurden mit dieser Änderung erstmals öffentlich.
Damit sind sie neuer Live-Inhalt und noch nie geprüft worden. **Recherchiere** die
sicherheitsrelevanten Aussagen, die dir auffallen, gegen belastbare Quellen (BfR, DGUV,
BVKJ/Kinderärzte im Netz, DRK, EN 71, 16 CFR 1501.4 für Kleinteile). Melde jede Aussage,
die fachlich falsch, veraltet oder gefährlich unvollständig ist — mit Quelle.

**W7 — Greifen die neuen Prüfstufen wirklich?**
Lies `check-spielanker.py` und `check-steuerzeichen.py`. **Konstruiere einen Fall, der
die Stufe besteht und trotzdem falsch ist.** Stufe 52 prüft unter anderem, ob Karten- und
Spieltext ein gemeinsames Inhaltswort haben. Reicht das? Was ist mit zwei verschiedenen
Spielen, die zufällig dasselbe Material nennen? Prüfe auch, ob die Stufe die Karten
genauso findet wie der Renderer — oder ob es einen Weg gibt, an ihr vorbeizukommen.

**W8 — Der Renderer selbst.**
`spiel_regeln_setzen()` entfernt alte Absätze und fügt neue ein, von hinten nach vorn.
Die Kartengrenze wird per `<div>`-Klammerzählung bestimmt. Such Fälle, in denen das
schiefgeht: unbalanciertes HTML, `<div>` in Attributwerten oder Kommentaren, eine Karte
ohne schließendes `</div>`, verschachtelte Karten. Was passiert dann — und merkt es
jemand?

**W9 — Der Steuerzeichen-Fix.**
Auf `meerjungfrau-3-5-jahre.html` wurden 47 C1-Zeichen gelöscht. Prüfe am Ergebnis, ob
alle Emoji-Sequenzen jetzt gültig sind (besonders `og:title`, `twitter:title`, `<title>`
und die Überschriften) — oder ob durch das Löschen etwas anderes kaputtgegangen ist.
Prüfe außerdem, ob Stufe 51 zu breit greift und legitime Zeichen verbieten würde.

**W10 — Was fehlt?**
Was hätte diese Änderung mitmachen müssen und hat es nicht? Denk an: Sitemap/SEO,
strukturierte Daten (JSON-LD auf den Seiten — trägt es die Spiele? müsste die Regel
dort auch stehen?), Druckansicht, Screenreader (ist ein `<p>` mit rotem Rand als Warnung
erkennbar?), Übersetzungen, die Paketseiten hinter der Bezahlschranke.

---

## 5. Wie du berichtest

* Je Finding: **wörtliches Zitat** der beanstandeten Stelle plus Datei und, wenn möglich,
  Zeile. Ohne Zitat kann ich es nicht nachprüfen und werte es nicht.
* Einstufung **MAJOR** (falsch, gefährlich oder irreführend für den Leser) / **MINOR**
  (stört, aber führt niemanden in die Irre) / **UNSICHER** (du vermutest etwas, kannst es
  nicht belegen — sag dazu, was dir zum Beleg fehlt).
* Bei Sicherheitsaussagen: **Quelle mitliefern**, nicht aus dem Gedächtnis urteilen.
* Wenn du eine Formulierung ersetzen willst: **schreib den Ersatztext hin.** Ein
  Einwand ohne Ersatz ist halbe Arbeit.
* Am Ende eine **Zahl von 0 bis 100** für den Gesamtzustand dieser Änderung, mit einem
  Satz, was die Zahl nach unten zieht.

Sei streng. Ein Gutachten, das nichts findet, ist für mich wertlos — aber erfinde nichts:
Jeder Punkt muss am Material belegbar sein.
