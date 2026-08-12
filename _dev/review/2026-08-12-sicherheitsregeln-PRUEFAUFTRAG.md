# Prüfauftrag: 156 gedruckte Sicherheitsregeln in einem Kindergeburtstags-Produkt

Du prüfst Sicherheitstexte, die Eltern auf Papier ausgedruckt neben einer
Bastel- oder Spielstation liegen haben, während zwischen sechs und zwölf Kinder
im Raum sind. Es gibt keine zweite Instanz nach dir: Was hier steht, wird
befolgt oder ignoriert — beides mit Folgen.

## Was du bekommst

Das vollständige Inventar aller 156 Regeln, je Eintrag in drei Zeilen:

```
<motto>-<altersgruppe> / <variante> / <Einkaufsposten>
<Regeltext>
```

Rohtext (bitte selbst laden):
https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/3afee75a/_dev/review/2026-08-12-sicherheitsregeln-inventar.txt

Die zugehörigen Quelldateien liegen unter
`https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/3afee75a/data/motto/<motto>-<gruppe>.json`
— dort stehen zu jedem Motto auch `games[]` (die Spielkarten mit `safetyRule`),
`faq`, `parentTips` und `preparationWeeks`. Lade sie, wo du einen Widerspruch
vermutest.

Altersgruppen: `klein` = 3–5 Jahre, `mittel` = 6–8, `gross` = 9–12.

## Prüfwinkel (nummeriert, bitte jeden einzeln beantworten)

**1. Sachlich falsch.** Enthält eine Regel eine Aussage, die medizinisch oder
physikalisch nicht stimmt? Recherchiere bei Stoffen (Natriumcarbonat,
Knopfzellen, Latex, Zitronensäure, Gips) die tatsächliche Gefahr. Nenne die
Quelle.

**2. Altersfalsch.** Passt die Regel zur Altersgruppe der Datei? Eine
3–5-Jahres-Datei, die Kindern selbst Werkzeug, Hitze oder Kleinteile in die
Hand gibt, ist ein Befund — auch wenn die Regel „mit Aufsicht" sagt.

**3. Nicht befolgbar.** Verlangt die Regel etwas, das die Familie nicht hat?
Schutzausrüstung, die auf keiner Einkaufsliste steht; ein zweiter Erwachsener,
den das Konzept nirgends vorsieht; ein Zeitfenster, das der Ablaufplan nicht
hergibt. Prüfe die `shoppingList` derselben Variante.

**4. Widerspruch im selben Dokument.** Sagt die Regel etwas anderes als die
`safetyRule` der Spielkarte, die `faq` oder die `steps[]`? Der Fall, auf den es
ankommt: Die Regel verbietet etwas, und die Anleitung drei Zeilen weiter weist
genau das an. Diffe die Felder gegeneinander, statt sie einzeln zu lesen.

**5. Falscher Adressat.** Steht klar, WER handelt? „Aufsicht!" oder „Vorsicht
bei X" ist keine Handlungsanweisung. Gut ist: „Du misst ab, die Kinder
mischen." Markiere jede Regel, die niemandem etwas zu tun gibt.

**6. Beruhigung statt Regel.** Verharmlost eine Formulierung („unproblematisch",
„eigentlich ungefährlich"), obwohl an anderer Stelle im selben Motto eine
strengere Regel steht?

**7. Ton.** Das Produkt ist ein Geburtstagsgeschenk, kein Beipackzettel.
Panikvokabular („Lebensgefahr", „verätzt binnen Stunden") ist ein Befund, wenn
die konkrete Handlungsanweisung fehlt. Umgekehrt ist Nüchternheit kein Mangel.

**8. Was fehlt.** Welcher Einkaufsposten hätte eine Regel gebraucht und hat
keine? Geh die `shoppingList` der Dateien durch, nicht nur das Inventar.

## Form deiner Antwort

Je Befund:
- **wörtliches Zitat** der beanstandeten Stelle (ohne Zitat zählt der Befund nicht)
- Datei / Variante / Posten
- **MAJOR** (jemand kann sich verletzen, oder die Aussage ist falsch) /
  **MINOR** (Formulierung, Klarheit) / **UNSICHER** (du kommst ohne
  Zusatzwissen nicht zu einem Urteil — sag was dir fehlt)
- die konkrete Ersatzformulierung, nicht nur die Kritik

Zum Schluss: eine Liste der Regeln, die du ausdrücklich für **gut** hältst, und
warum. Und eine Zahl 0–100 für den Gesamtstand.

Rate nicht. Wenn du eine Datei brauchst, lade sie.
