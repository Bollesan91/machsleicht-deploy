# Prüfauftrag: Sicherheitshinweise für einen Meerjungfrau-Kindergeburtstag

Du bist Gutachter. Prüf einen fertigen, noch nicht veröffentlichten Text-Datenbestand, bevor er
live geht. Sei streng: Was du durchwinkst, lesen Eltern als Anleitung — und befolgen es an einem
Tag, an dem acht fremde Kinder im Haus sind.

## Worum es geht

Eine deutsche Website gibt Eltern fertige Kindergeburtstags-Pläne. Du bekommst **ein** Motto,
Meerjungfrau, in drei Altersgruppen (3–5, 6–8, 9–12) mit je drei Aufwands-Varianten
(minimal / standard / wow). Zu jedem Plan gehört eine Einkaufsliste.

Unter Einkaufsposten, bei denen etwas passieren kann, steht ein **gedruckter Sicherheitshinweis**
— ein bis drei Sätze, direkt an der Ware, in der Sprache der Seite (Du-Form, kein Behördenton).
Jeder Posten **ohne** Hinweis trägt stattdessen eine Begründung, warum keiner nötig ist.

Meerjungfrau: **103 Einkaufsposten — 56 mit Regel, 47 mit Begründung.** Zusammen alle 103. Auf den drei öffentlichen Seiten stehen 72 Regeln — mehr als 56, weil ein Bündel-Posten mehrere Regeln tragen kann und die Seiten eigene Posten führen. (Diese Zahlen sind nachgezählt; wenn deine
Zählung abweicht, sag es — dann stimmt etwas nicht.)

## Was du zu prüfen hast

Hol dir die Dateien selbst (raw-URLs, öffentlich, kein Login). Kommt ein Abruf mit HTTP 429
zurück: kurz warten und erneut versuchen, das ist ein Ratelimit und kein kaputter Link.

**Das Prüfpaket** — alle Regeln und alle Begründungen, nach Alter und Variante sortiert:
1. https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/SHA/_dev/review/gate-a/meerjungfrau.md

**Die drei Seiten, wie sie beim Leser ankommen:**
2. https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/SHA/kindergeburtstag/meerjungfrau-3-5-jahre.html
3. https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/SHA/kindergeburtstag/meerjungfrau-6-8-jahre.html
4. https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/SHA/kindergeburtstag/meerjungfrau-9-12-jahre.html

**Die Quelldaten mit den Spielen** — hier steht, was tatsächlich gespielt wird:
5. https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/SHA/data/motto/meerjungfrau-klein.json
6. https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/SHA/data/motto/meerjungfrau-mittel.json
7. https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/SHA/data/motto/meerjungfrau-gross.json

## Prüfwinkel — arbeite sie nummeriert ab

**1. Passt die Regel zum Spiel?** Das ist der wichtigste Winkel und der Grund, warum du die
Quelldaten bekommst. Lies in den JSONs die Felder `games`, `preparationWeeks`, `parentTips`,
`cakeRecipe` und `signatureRitual` — **im ganzen File, nicht nur in der naheliegenden Liste**.
Vergleich dann, was dort passiert, mit dem, was die Regel am Einkaufsposten sagt. Such nach:
eine Regel, die eine andere Verwendung annimmt als das Spiel vorsieht; ein Spielschritt, der
etwas Riskantes verlangt, ohne dass der zugehörige Posten eine Regel trägt; eine Regel, die
etwas verbietet, das der Ablauf ausdrücklich vorsieht.

**2. Die Altersstufen gegeneinander.** Du hast dieselbe Party in drei Altern. Geh die Waren
durch, die in mehreren Altersgruppen vorkommen, und prüf die Abstufung: Wird die Regel mit
steigendem Alter sinnvoll lockerer — oder springt sie ohne Grund? Findest du eine Ware, die bei
9–12 eine Regel trägt und bei 3–5 nicht? Das wäre der schwerste Fehler dieses Winkels.

**3. Die Varianten gegeneinander.** Minimal, Standard und Wow derselben Altersgruppe. Wo führt
Wow eine Station ein, deren Risiko in der Regel nicht ankommt? Wo trägt Minimal eine Regel, die
in Wow verschwindet, obwohl dieselbe Ware noch da ist?

**4. Falsch beruhigt.** Geh die 47 Begründungen durch und such die, die du für ein Fehlurteil
hältst — Ware, die sehr wohl eine Regel braucht. Achte besonders auf Posten, deren Name harmlos
klingt, deren Verwendung im Spiel aber nicht harmlos ist. Prüf jede Begründung außerdem darauf,
ob sie sich auf etwas stützt, das niemand wissen kann („die Party läuft ohne kleine
Geschwister"). Zitier den Posten wörtlich.

**5. Sachlich falsch.** Recherchier jede Aussage, die eine Zahl, eine Temperatur, ein Alter oder
eine Frist behauptet, und rechne nach. Prüf gegen aktuelle Quellen (BfR, BVKJ /
Kinderärzte-im-Netz, DGUV, DRK, Herstellerangaben). Nenn mir jede Zahl, die du nicht bestätigt
bekommst — auch wenn sie nur ungenau statt falsch ist.

**6. Gefährlich unvollständig.** Wo verfehlt ein Hinweis das eigentliche Risiko der Ware oder
nennt nur die halbe Miete? Ein Hinweis, der beruhigt ohne zu schützen, ist schlimmer als keiner.
Die eigenen Regeln dieses Mottos drehen sich am häufigsten um: Allergien, Kleinteile, runde feste Lebensmittel, Baender und Schnuere am Hals, Luftballons, Hitze und offene Flamme. Genau dort lohnt der
schärfste Blick — und genau dort ist eine Lücke am teuersten.

**7. Handlungsanweisung statt Warnschild.** Jeder Hinweis soll sagen, **was zu tun ist**, und mit
einer ausführbaren Handlung enden. Markier jeden, der nur ein Gefühl transportiert. Umgekehrt:
Markier jeden, der etwas verlangt, das ein normaler Erwachsener am Partytag nicht leisten kann
oder das gar nicht auf der Einkaufsliste steht.

**8. Ton und Länge.** Zielgruppe sind gestresste Eltern, die die Liste beim Einkaufen
überfliegen. Zu lang, zu belehrend, zu ängstlich → wird überlesen, und dann wirkt auch der
wichtige Hinweis nicht. Nenn die Hinweise, die du kürzen oder streichen würdest, weil sie das
Feld verwässern. Und nenn Panikmache, falls du welche findest.

**9. Sprache.** Deutsche Rechtschreibung und Grammatik, konsequente Du-Anrede, keine
Wortwiederholungs-Ketten. Mit wörtlichem Zitat.

**10. Der Blick von außen.** Was fehlt diesem Motto, das du als Gutachter erwartet hättest und
das in keinem der neun Winkel oben vorkommt? Die Frage ist ernst gemeint — nenn mindestens einen
Punkt oder begründe, warum dir keiner einfällt.

## Form deiner Antwort

Für jedes Finding: **wörtliches Zitat** der beanstandeten Stelle plus Altersgruppe und Variante;
Einstufung als **MAJOR** (geht so nicht live: sachlich falsch, gefährlich unvollständig, falsch
beruhigt), **MINOR** (stört, blockiert nicht) oder **UNSICHER** (dein Verdacht, den ich
nachprüfen soll); und was konkret hin soll — bei MAJOR bitte einen fertigen Ersatzsatz.

Am Ende: eine Zahl von 0 bis 100 für dieses Motto mit einem Satz Begründung, und die drei
Findings, die du für die wichtigsten hältst, in Reihenfolge.

Erfinde nichts. Wenn du eine Stelle nicht in den Dateien findest, sag das, statt sie zu
rekonstruieren. Wenn du eine Zahl nicht verifizieren konntest, schreib „nicht verifiziert" statt
sie zu bestätigen.
