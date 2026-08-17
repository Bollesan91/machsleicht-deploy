# Gate A · ritter — Gutachten (Opus 5 Max, Inkognito-Tab, target-blind)

- **Datum:** 17.08.2026 · **Stand:** `35f44cb6a37a5079c6fe1f5a621736b361481b17`
- **Modus:** Inkognito bestätigt („Inkognito-Chats werden nicht gespeichert, zur Erinnerung
  hinzugefügt oder zum Trainieren von Modellen verwendet") — damit ist L21 erfüllt, anders als
  bei Gate B.
- **Material:** Prüfpaket + 3 Seiten + **3 Quell-JSONs mit den Spieldaten**
- **Score:** **54 / 100**
- Der Gutachter hat die Zahlen selbst nachgezählt und bestätigt: 54 Regeln (22 / 14 / 18),
  23 Begründungen, zusammen 77. Keine Abweichung.

## Der Kernbefund in einem Satz

> „Die Fehler liegen fast alle an einer Stelle: die Regeln wurden an den Einkaufsposten
> geschrieben, nicht an den Spieldaten. Deshalb behaupten mehrere Regeln eine Verwendung, die
> im Spiel nicht vorkommt — und erlauben teils, was die Spieldaten ausdrücklich verbieten."

Das ist die gefährliche Richtung: nicht eine fehlende Regel, sondern eine **gedruckte Regel, die
lockerer ist als das eigene Konzept.** Der Elternteil liest die Regel, nicht das JSON.

## Stufe 3 — die vier schwersten Findings selbst geprüft

| Finding | Prüfung an der Quelle | Ergebnis |
|---|---|---|
| **Schwert-Regel autorisiert Kind-gegen-Kind** | Das Konzept verbietet es vielfach: `KEIN Sparring zwischen Kindern` (1×), `Niemals auf Kind` (3×), `nie Kind gegen Kind` (2×), `Niemand schlägt auf Kinder` (2×), `trifft nur Polster` (6×), `nur am Strohballen` (9×). Gedruckt steht bei 9–12 in **allen drei Varianten**: „im Zweikampf gilt nur Körper und Schild" — und bei 3–5 in **allen drei**: „Geschlagen wird ausschließlich aufs Schild … Immer nur zwei Kinder gleichzeitig". | **BESTÄTIGT, MAJOR.** Die meistgedruckte Regel des Mottos erlaubt, was das Konzept viermal verbietet. |
| **Bogen-Regel ohne „nie auf Personen"** | Spieldaten: `Bogen NIE auf Personen richten — nur zur Zielscheibe` und `Immer nur EIN Kind schießt`. Von **vier gedruckten Bogen-Regeln enthält keine einzige** das Personen-Verbot; zwei erlauben zwei gleichzeitige Schützen. | **BESTÄTIGT, MAJOR.** Höchster Schadenserwartungswert des Mottos (Auge). |
| **Strohballen „keine Zündquelle im Konzept"** | Alle drei 6–8-Varianten servieren Stockbrot — und alle drei tragen am Strohballen-Posten eine Begründung, die die Abwesenheit einer Zündquelle behauptet. In wow sogar „Stockbrot vom Lagerfeuer". | **BESTÄTIGT, MAJOR.** Drei trockene Strohballen, ein Pappdrache, ein Stoffbanner. |
| **Ei fehlt in allen neun Kuchen-Regeln** | Rezepte enthalten 4 / 3 / 5 Eier. Alle **9** Regeln, die „gleich drei versteckte Allergene" abschließend aufzählen, nennen **kein Ei**. | **BESTÄTIGT, MAJOR.** Eine Aufzählung, die vollständig klingt und das häufigste Kinder-Allergen auslässt. |

Weitere Findings, die ich noch nicht einzeln geprüft habe, aber ernst nehme: fehlende
Trauben-Regel bei 3–5 wow, Karotten-Regel gegen den eigenen Vorbereitungsplan, FAQ die der
gedruckten Kronen-Regel widerspricht (und als JSON-LD-Snippet ohne die Regel ausgespielt werden
kann), Holzschwert im Ritterschlag gegen „niemals Holz", eine Schutzbrille für zehn Kinder bei
6–8 wow, Foto-Einwilligung fehlt komplett, „Sport als Strafe" im Spieltext für Dreijährige.

## Warum das den Plan ändert

Der Befund ist **keine ritter-Eigenheit**. Grobmessung über alle 15 Mottos: **209 von 567
Spielregeln (37 %) haben keine erkennbare Entsprechung in den gedruckten Regeln** derselben
Variante. Verteilung: piraten 25, safari 23, dschungel 21, dino 20, weltraum 20, prinzessin 15,
superheld 15, einhorn 14, pferde 12, detektiv 10, feen 10, ritter 9, baustelle 7,
meerjungfrau 7, feuerwehr 1.

Das Maß ist bewusst grob und überschätzt die Deckung eher — viele der 209 sind harmlos
(„Sitz-Spiel, keine Sicherheit nötig"). Die gefährliche Teilmenge ist die andere Richtung, die
bei ritter den Score gedrückt hat: gedruckte Regel **lockerer** als die Spielregel.

**Konsequenz: Die übrigen zwölf Reviews warten.** Sie würden dieselbe Klasse zwölfmal finden,
und jeder Fix danach macht ihre Befunde stale. Erst die Klasse schließen, dann Gate A fortsetzen
— genau die Reihenfolge, die bei Gate B funktioniert hat.
