# Prüfauftrag: Quellen-Schicht, Zeitversprechen, Datumsangaben (18.08.2026)

**Stand:** `71e46a9d` · **Prüfling:** die 45 freien Ratgeberseiten unter `kindergeburtstag/`,
die Startseite und drei neue Linter-Stufen. Alle Dateien liegen öffentlich als raw-URL —
**hol sie dir selbst**, arbeite nicht mit dem, was hier zusammengefasst ist.

## Worum es geht

machsleicht.de plant Kindergeburtstage. Die 45 Ratgeberseiten (je Motto × Altersgruppe)
verkaufen Material über Affiliate-Links und drucken dazu Sicherheitsregeln. Bis gestern
standen dort **764 gedruckte Einkaufsregeln** und **140 Spielregeln** — und **keine einzige
Quellenangabe**. Ein externer SEO-/E-E-A-T-Audit hat das als schwächste Dimension der Domain
benannt. Seit heute druckt die Maschine je Seite einen Quellen-Kasten.

Parallel wurden zwei Zahlen im Bestand korrigiert: ein falsches Beispieldatum im Planer und
ein Zeitversprechen, das sich selbst widersprach.

## Der Maschinen-Vertrag (das ist der Prüfgegenstand, nicht ein Diff)

1. **Regeltexte** leben in `data/motto/*.json`, **Quellen** in `data/quellen.json`. Die Seiten
   sind Ableitung; kein Text wird je Seite gepflegt.
2. Eine Quelle erscheint auf einer Seite **nur**, wenn deren *gedruckte* Regeln ihr Thema
   berühren (Trigger-Wörter) oder wenn der Block da ist, den sie belegt (`trigger_marke`).
3. Ein Thema **ohne** an der Primärquelle geprüften Beleg bekommt bewusst **keinen** Eintrag.
   Zehn solche Themen stehen in `quellen.json` unter `_offen`.
4. Zweiter Maschinenlauf = leerer Diff (bewiesen).

## Zahlen (nachgezählt am Stand 71e46a9d — zähl gegen, wenn dir etwas komisch vorkommt)

| | |
|---|---|
| Seiten mit Quellen-Kasten | 45 |
| Quellen in der Registry | 3 |
| „Erste Hilfe beim Verschlucken" erscheint auf | 45 Seiten |
| „Kleinteile und Erstickungsgefahr" | 38 Seiten |
| „Essen, das kleine Kinder nicht bekommen sollten" | 32 Seiten |
| Themen ohne Beleg (bewusst leer) | 10 |
| gedruckte Einkaufsregeln / Spielregeln | 764 / 140 |
| Zeitversprechen der Klasse PLAN | 85, alle „10 Minuten" |

## Die Dateien (raw, öffentlich)

**Datenwahrheit und Maschine**
- Quellen-Registry: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/71e46a9d/data/quellen.json
- Renderer: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/71e46a9d/_dev/scripts/regeln-drucken.py

**Drei Seiten zum Prüfen am Produkt** (verschiedene Altersgruppen und Risikoprofile)
- https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/71e46a9d/kindergeburtstag/dino-3-5-jahre.html
- https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/71e46a9d/kindergeburtstag/meerjungfrau-6-8-jahre.html
- https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/71e46a9d/kindergeburtstag/ritter-9-12-jahre.html

**Startseite (Zeitversprechen) und Planer (Datum)**
- https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/71e46a9d/index.html
- https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/71e46a9d/kindergeburtstag.html

**Die drei neuen Gates**
- https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/71e46a9d/_dev/scripts/check-datumsangaben.py
- https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/71e46a9d/_dev/scripts/check-zeitversprechen.py
- https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/71e46a9d/_dev/scripts/check-quellen.py

**Gedächtnis des Projekts — bitte respektieren**
- Bereits verworfene Findings (nicht erneut melden): https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/71e46a9d/_dev/OFFENE-REVIEW-PUNKTE.md
- Gelernte Muster: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/71e46a9d/_dev/LEKTIONEN.md

## Winkel-Katalog

**1. Stimmen die drei Quellen inhaltlich?** Recherchiere jede selbst an der Primärquelle,
verlass dich nicht auf die Wiedergabe in der Registry.
- 16 CFR 1501.4 (CPSC): **Rechne die Maße nach.** Die Registry behauptet 1,25 × 2,25 Zoll =
  31,7 mm Durchmesser bei 25,4–57,1 mm Tiefe. Stimmen Zoll und Millimeter überein? Ist der
  Satz „bildet den geweiteten Rachen eines Kindes unter drei Jahren nach" durch die Norm
  gedeckt oder ist das eine populäre Zuspitzung?
- DRK / German Resuscitation Council: Ist die Reihenfolge „Husten nicht unterbrechen →
  5 Rückenschläge → 5 Oberbauchkompressionen, Säuglinge Brustkorb statt Oberbauch" die
  aktuell gültige Empfehlung? Fehlt ein Glied, das ein Elternteil braucht?
- BfR / Kinderärzte-im-Netz: Deckt die Quelle wirklich „jeder zweite Erstickungsunfall geht
  auf Nüsse zurück"? Deckt sie die Altersgrenze **vier** — und deckt sie Popcorn und Trauben
  mit, oder wird hier eine Nuss-Aussage auf anderes Essen ausgedehnt?

**2. Deckung in beide Richtungen.** Nimm die drei verlinkten Seiten. Steht dort eine Quelle,
deren Aussage die auf DIESER Seite gedruckten Regeln gar nicht stützt? Und umgekehrt: Findest
du eine gedruckte Regel mit einer harten Zahl oder Altersgrenze, für die im Kasten keine
Quelle steht? Zitiere wörtlich.

**3. Strenger oder lockerer als die Quelle.** Der gefährliche Fall ist nicht die fehlende
Regel, sondern die gedruckte Regel, die **lockerer** ist als ihre Quelle — Eltern lesen die
Seite, nicht die Norm. Suche aktiv nach so einer Stelle.

**4. Widerspruch zwischen Kasten und Seiteninhalt.** Beispiel des Musters: Der Kasten sagt
„keine ganzen Nüsse unter vier", und dieselbe Seite verkauft für 3–5-Jährige etwas mit ganzen
Nüssen. Prüf das an allen drei Seiten, auch gegen Snack- und Mitgebsel-Tabellen.

**5. Zeitversprechen.** Die Startseite sagte bis heute „Kindergeburtstag planen kostenlos in
5 Minuten" (Title, H1, JSON-LD, FAQ-Antwort), 77 andere Stellen sagten 10 Minuten.
Vereinheitlicht auf **10**. Diffe `index.html` gegen sich selbst: Ist die Zahl in Title,
og:description, twitter:description, JSON-LD-`description`, FAQ-Antwort, H1, Subline und
Fließtext jetzt dieselbe? Findest du im Bestand noch eine Stelle, die 5 sagt und dieselbe
Leistung meint? Und: Ist „10 Minuten" gegenüber dem tatsächlichen Ablauf des Planers auf
`kindergeburtstag.html` plausibel oder immer noch ein Versprechen, das die Seite nicht hält?

**6. Datumsangaben.** Der Planer zeigte im Beispiel „Sa, 21.06.2026" — ein Sonntag, zwei
Monate alt. Jetzt stehen dort Platzhalter („Dein Wunschtermin, 14:00 Uhr" und „—"), die das
JavaScript ersetzt, sobald der Nutzer ein Datum eingibt. Wirkt das im Kontext, oder sieht die
Vorschau jetzt kaputt aus? Und: Findest du im Bestand ein weiteres gedrucktes Datum mit
falschem Wochentag?

**7. Sandbox-Angriff auf die Gates.** Lies die drei Gate-Skripte und **konstruiere einen
Fehler, der durchrutscht**: eine falsche Datumsangabe, die Stufe 50 nicht sieht; ein zweites
Zeitversprechen, das Stufe 53 nicht als Widerspruch erkennt; eine Quellenangabe ohne Deckung,
die Stufe 54 durchlässt. Ein Gate, das seinen eigenen Gründungsfall nicht mehr fängt, ist die
teuerste Sorte Fehler in diesem Projekt.

**8. E-E-A-T.** Nützt der Kasten einem Elternteil und einem Bewertungssystem — oder ist er
Deko? Was fehlt, damit erkennbar ist, wer die Aussagen verantwortet? Konkret: Der Kasten
nennt „Redaktion machsleicht" und verlinkt `/ueber-uns`, es gibt kein `Person`- und kein
`Article`-Schema auf diesen Seiten. Wie schwer wiegt das?

**9. Sprache.** Lies den Kasten als Mutter oder Vater, die auf dem Handy den Einkauf planen.
Verständlich oder Behördendeutsch? Ist „Wir sind Eltern und kein medizinischer Dienst" die
richtige Distanzierung — zu viel, zu wenig, falsch platziert?

**10. Was fehlt komplett?** Zehn Themen tragen gedruckte Regeln, aber keine Quelle: Wasser,
Luftballons, Strangulation, Sturzhöhe, Werkzeug, Sonne, Augenschutz, Chemie, Knopfzellen,
Allergenkennzeichnung. Welche zwei davon würdest du als Erstes belegen und warum genau die?

## Was ich von dir brauche

- **Wörtliches Zitat je Finding** — ohne Zitat ist es keine Fundstelle, sondern ein Eindruck.
- **Einstufung** je Finding: MAJOR (muss vor dem Livegang weg) / MINOR / UNSICHER.
- **Score 0–100** am Ende, als Zahl, mit einem Satz Begründung.
- Wo du **recherchiert** hast: nenne die Quelle, die du gezogen hast.
- Wenn du etwas nicht prüfen konntest, schreib das hin, statt es zu vermuten.
- Findings, die in `OFFENE-REVIEW-PUNKTE.md` bereits als False Positive verworfen sind,
  bitte nicht erneut melden — oder mit neuem Argument, das die alte Verwerfung entkräftet.
