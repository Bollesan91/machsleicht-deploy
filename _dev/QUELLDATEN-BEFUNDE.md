# Quelldaten-Befunde — was beim Regeln-Schreiben über `data/motto` auffiel

> Laufendes Protokoll. Jede Zeile ist ein Defekt IN DEN QUELLDATEN, der beim Durchgehen
> der Einkaufsposten sichtbar wurde — nicht in der Maschine, nicht auf den Seiten.
> Angelegt 17.08.2026, nachdem Bolle zu Recht fragte, ob ich die Befunde festhalte
> (sie standen vorher nur verstreut in Commit-Messages).
>
> Spalte „Status": ✅ = beim Regeln-Schreiben mitbehoben · ⏳ = offen, braucht eine
> eigene Entscheidung · 📋 = bewusst nur dokumentiert.

## A. Anleitungen, die eine gefährliche Handlung beschreiben

| # | Motto | Fundstelle | Befund | Status |
|---|---|---|---|---|
| A1 | ritter | `ritter-*.json` FAQ | Die Pappkrone wird **direkt am Kopf des Kindes zusammengetackert** — bei 3- bis 5-Jährigen, mit Klammerspitzen an Stirn und Schläfe. | ⏳ Regel am Posten dreht den Ablauf um (auf dem Tisch tackern), **die FAQ selbst ist unverändert** |
| A2 | einhorn | `einhorn-mittel.json` prepText + game-safetyRule | Drei widersprüchliche Aussagen zur 60-°C-Seife auf einer Seite: „30 Sek. Mikrowelle → flüssig", „Kinder dürfen reingießen", daneben die Altersstaffel „Für 6-Jährige machst du alles Heiße". | ✅ Regel ist jetzt die strengste Fassung · ⏳ Anleitungstext bleibt die lockere Gegenstimme |
| A3 | dino | `dino-gross.json` Ausgrabungs-Spiel | Kinder klopfen Gips-Blöcke **mit Hammer und Meißel** auf; kein Wort zu Splitterflug oder Schutzbrille im Spieltext. | ✅ Regel am Zubehör-Posten |
| A4 | baustelle | `baustelle-gross.json` | Material-Fühlbeutel: blind in **Metallschrauben, Ziegel- und Betonsplitter** greifen. | ✅ Regel verlangt entgratet/geschliffen |
| A5 | baustelle | `baustelle-gross.json` wow | **Stroboskop** im Deko-Posten — Anfallsrisiko bei photosensitiven Kindern, nirgends erwähnt. | ✅ Regel verlangt Elternabfrage |
| A6 | detektiv | `detektiv-mittel.json` Ritual | Die Detektiv-Marke wird **an einer Schnur um den Hals** getragen, während im Spuren-Parcours gerannt und gekrochen wird. | ✅ Regel: anstecken statt umhängen · ⏳ Ritualtext unverändert |

## B. Regeln, die es gab — aber am falschen Ort

| # | Motto | Befund | Status |
|---|---|---|---|
| B1 | feuerwehr | Fast alle Sicherheitsaussagen standen als `game.safetyRule` im **Spielablauf** („nie ins Gesicht spritzen", „Rasierschaum nicht in Augen/Mund", „Verband nie um den Hals") — der Einkaufende liest sie nie. | ✅ 16 Texte an die Posten gezogen |
| B2 | pferde | Die Spiele verbieten ausdrücklich das Rohessen der Futter-Karotten; der Einkaufsposten „Karotten-Sticks + Snacks" schwieg. | ✅ |
| B3 | meerjungfrau | Der Food-Text fordert seit jeher, Fruchtgummi für 3-Jährige klein zu schneiden; der Posten „Gummi-Fische" trug kein Wort. | ✅ |
| B4 | feen | Die Spielregel nennt **6 cm als Verschluckgrenze** für 3-Jährige; die gekauften Mini-Figuren-Sets liegen darunter, der Posten schwieg. | ✅ |

## C. Einkaufsposten, die zum falschen Produkt führen

| # | Motto | Befund | Status |
|---|---|---|---|
| C1 | pferde | Affiliate-Suchlink hinter „Hufeisen / Wurfringe" lautet **`hufeisen glücksbringer`** und liefert echte Metall-Hufeisen — die in diesem Spiel von 3- bis 5-Jährigen geworfen werden. | ✅ Regel verlangt Stoff/Schaum · ⏳ **Suchlink selbst ist unverändert** |
| C2 | prinzessin | „Zauberstäbe 6er" ohne Materialangabe; die Suche liefert harte Plastikstäbe, mit denen gerannt wird. | ✅ Regel · ⏳ Link/Label unverändert |
| C3 | ritter | „Mittelalter-Deko" / „Premium-Deko" verleiten zu echten Kerzen und Fackeln — neben Pappschilden, Strohballen, Kartondrachen. | ✅ Regel legt LED fest |
| C4 | piraten | „Spielzeug-Kompass": billige Gehäuse springen auf und legen die Magnetnadel frei (verschluckte Magnete = chirurgischer Notfall). | ✅ |
| C5 | ritter | „Plüsch-Drache" mit ausdrücklicher Second-Hand-Empfehlung — gebrauchte Plüschtiere haben lose Knopfaugen. | ✅ Regel verlangt Zugprobe |

## D. Struktur- und Konsistenzprobleme

| # | Befund | Größe | Status |
|---|---|---|---|
| D1 | **Kein Feld verbindet Spiel und Material.** `games[].material` ist Freitext, `shoppingList[]` eine handgepflegte Parallel-Liste. Messung 17.08.: nur **36 %** der Material-Nennungen sind in der Einkaufsliste derselben Variante wiederzufinden (dino 18 %, einhorn 20 %, ritter 50 %). | 3791 Nennungen | ⏳ **Ticket K7** in BACKLOG-AUDIT |
| D2 | Drei Parallel-Kataloge (`data/motto`, `_src/elite-motto-data`, eingefrorene Seiten) — Grund für die Existenz der Brückendatei. | 45 Dateien | ⏳ **Ticket K6** |
| D3 | Der Generator liest `price`, die Daten führen `priceEur` — das Preis-Fragment war seit jeher tot, seine Interpolation zusätzlich kaputt. | 3 Seiten | 📋 Reparieren hieße Einzelpreise auf Live-Seiten drucken = Produktentscheidung |
| D4 | Freie Seiten und Katalog benennen dieselbe Ware verschieden (Lupen 8 Stk. ↔ 3 Stk., Saftpäckchen ↔ Capri-Sun, Mähnen-**Stilling** ↔ Styling). | 60+ Anker nötig | ⏳ verschwindet mit K6 |
| D5 | 15 Mottos, aber nur **57 Warenkerne** kommen in mehr als einem Motto vor — ein globales Waren-Register würde wenig sparen (gemessen 17.08.). | — | 📋 gegen Umbau entschieden |

## E. Inhaltliche Altlasten (bereits behoben, zur Erinnerung)

| # | Befund | Fundtag |
|---|---|---|
| E1 | Knopfzellen-Notfallzeile schloss die **Honig-Erste-Hilfe aus** („nichts zu essen oder trinken geben") — einzige Stelle, die eine wirksame Sofortmaßnahme aktiv ausschloss. | 15.08., primärverifiziert |
| E2 | Wunderkerzen-Regel klebte an zwei **Ballon**-Posten (Fix-Skript-Restschaden vom 12.08.). | 13.08. |
| E3 | „Nur Perlen kaufen, die NICHT durch eine Klopapierrolle passen (unter 4,5 cm)" — das wäre ein Tischtennisball; die Regel verbot faktisch ihren eigenen Posten. | 15.08. |
| E4 | dschungel-klein druckte die widerlegte Absolutbehauptung „Latex ist das häufigste Erstickungsmaterial". | 15.08. |
| E5 | Eine Sicherheitsregel verwies auf die **Spielkarte im Bezahlpaket** („Für die UV-Lampe gilt die Regel auf der Spielkarte"). | 15.08. |
