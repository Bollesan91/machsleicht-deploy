# meerjungfrau — Pruefliste aus dem Lauf gegen 177a794

Der Lauf gilt nicht als Gate (veralteter SHA, Begruendung in
`2026-08-05-paket-gate-welle.md`). Seine Befunde sind trotzdem die beste
vorhandene Spur durch das Paket. Jeder Punkt ist gegen den HEUTIGEN Stand zu
pruefen, bevor er als Arbeit gilt — Reviewer irren in beide Richtungen, und
dieser hat gegen einen Stand von heute frueh gelesen.

Chat: `1d158ca0` · Score 15/100 (Telemetrie, nicht Ziel) · 16 MAJOR, 17 MINOR.

Spalte "Stand": `offen` = noch nicht nachgeprueft · `haelt` = selbst
verifiziert · `haelt nicht` = am Primaerbeleg widerlegt · `erledigt` = seit
dem Review gefixt.

## Inhalt & Spielbarkeit

| Nr | Befund | Stufe | Stand |
|---|---|---|---|
| 1.1 | gross-Spielkarten sind keine Anleitungen, sondern Hausaufgaben | MAJOR | offen |
| 1.2 | ATLANTIS-Station 2 auf Deutsch unloesbar, beantwortet sich selbst | MAJOR | offen |
| 1.3 | 4 von 8 ATLANTIS-Stationen liefern nur die Loesung, nicht die Aufgabe | MAJOR | offen |
| 1.4 | mittel-Wow-Quest verspricht fuenf Raetsel, liefert keins | MAJOR | offen |
| 1.5 | Verlieren ohne Trost — Tauch-Synchronisation | MINOR | offen |

## Ablaufplan & Zeit

| Nr | Befund | Stufe | Stand |
|---|---|---|---|
| 2.1 | 8 von 9 Varianten ueberziehen ihr eigenes Zeitfenster | MAJOR | offen |
| 2.2 | gross/standard schiebt die Station in die Reserve, die das Finale voraussetzt | MAJOR | offen |
| 2.3 | In zwei Varianten schuetzt FIN das falsche Spiel | MAJOR | offen |
| 2.4 | Sterne-Beobachtung widerspricht ihrer eigenen Uhrzeit um 2+ Stunden | MAJOR | offen |

## Geld

| Nr | Befund | Stufe | Stand |
|---|---|---|---|
| 3.1 | 6 von 9 Varianten: Liste und gedrucktes Preisversprechen widersprechen sich | MAJOR | offen (Bolle-Entscheidung, s. Gate-Doc) |
| 3.2 | gross/wow: das Highlight ist gleichzeitig drin und nicht drin | MAJOR | offen |
| 3.3 | Sparhinweis landet auf dem Preis der Vollausstattung | MINOR | offen |
| 3.4 | Kuchenkosten: 6 € auf der Liste, 10 € auf der Kuchenkarte | MINOR | offen |
| 3.5 | „Kosten pro Kind" in giveaways nirgends gedeckt | MINOR | offen |

## Sicherheit

| Nr | Befund | Stufe | Stand |
|---|---|---|---|
| 4.1 | Wunderkerze ohne Sicherheitszeile in jeder Altersgruppe | MAJOR | **erledigt** (`8eb1a4e3`, 14 Dateien) |
| 4.2 | Sicherheitsregel verbietet Glasperlen, die Einkaufsliste kauft sie | MAJOR | offen |
| 4.3 | Sicherheitsregel fordert Ausruestung fuer alle, die Liste kauft die Haelfte | MAJOR | offen |
| 4.4 | Drei Bewegungsspiele ohne jede Sicherheitszeile | MINOR | offen |

## Varianten-Konsistenz

| Nr | Befund | Stufe | Stand |
|---|---|---|---|
| 5.1 | Regen-Karte der gross-Minimal-Variante nennt vier Stationen, die es dort nicht gibt | MAJOR | offen (verwandt mit 6.8 der Feuerwehr-Welle) |
| 5.2 | Ein Spielschritt verweist auf ein Spiel, das der Variante fehlt | MINOR | offen |
| 5.3 | Sterne-Karte traegt die Altersanpassung eines anderen Spiels | MAJOR | offen |
| 5.4 | Feuerwehr-Reste im Meerjungfrau-Paket | MAJOR | offen — **zuerst pruefen**, gleiche Klasse wie der w86-Fehler im piraten-Manifest |
| 5.5 | klein-Minimal: die Perlenzahl geht nicht auf | MINOR | offen |
| 5.6 | Sparhinweis und Einkaufsliste widersprechen sich beim selben Artikel | MINOR | offen |
| 5.7 | Erfundene Arten in einem als „echte Biologen-Arbeit" verkauften Raetsel | UNSICHER | offen |

## Vertragsschicht

| Nr | Befund | Stufe | Stand |
|---|---|---|---|
| 6.1 | Rollen zeichengleich | SAUBER | — |
| 6.2 | GAME_META_F: IDs vollstaendig, ein Text abgeschnitten | MINOR | offen |

## Sprache

| Nr | Befund | Stufe | Stand |
|---|---|---|---|
| 7.1 | Ein Drittel des Produkts in Schweizer Orthografie (ss statt ß) | MAJOR | offen — mechanisierbar als Linter-Stufe |
| 7.2 | Grammatikfehler auf der SOS-Karte | MINOR | offen |
| 7.3 | Leeres Warnsymbol auf der Kuchenseite | MINOR | offen |
| 7.4 | Ton | SAUBER | — |

## Produkt

| Nr | Befund | Stufe | Stand |
|---|---|---|---|
| 8.1 | Rund ein Viertel der gepflegten Daten wird nie gedruckt | MAJOR | offen (deckt sich mit Linter-Stufe 14) |
| 8.3 | Seitennummern-Drift | MINOR | offen |
