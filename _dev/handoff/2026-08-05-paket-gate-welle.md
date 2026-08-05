# Paket-Gate 05.08.2026 — drei Reviews eingesammelt, vier Entscheidungen offen

Stand `draft` = c5b49667, `main` unberuehrt = 78450cb7. Nichts deployed.
Linter: 24 Stufen, 0 Fehler, 5 Warnungen (alle fuenf sind die offenen
Bolle-Entscheidungen weiter unten, keine ungeloesten Defekte).

## KRITISCH und behoben (56e16dd9): vier von fuenf Paketen rendern nichts

Im Browser nachgemessen (`?demo=1`, lokaler Server):

| Paket | Blaetter vorher | Blaetter nachher |
|---|---|---|
| feuerwehr, baustelle, dino, meerjungfrau | 0 | 20 |
| piraten | 20 | 20 |

`shShopping()` warf `ReferenceError: summe is not defined`. Der Summen-Block
vom selben Tag landete am Ende von `shSOS` statt in `shShopping`; `const` ist
funktions-skopiert. piraten blieb heil, weil der Block dort richtig lag —
deshalb war piraten die Vorlage fuer den Fix (reines Verschieben derselben 18
Zeilen, Assert auf gleiche Zeilenmenge).

**Linter-Stufe 22 (`check-scope-leck.py`).** Stufe 15 fragt "parst es?" — und
es parste tadellos. Stufe 22 fragt, ob eine funktionslokale Variable ausserhalb
ihrer Funktion benutzt wird. In beide Richtungen belegt: 0 Treffer auf dem
gefixten Stand, und auf dem kaputten Stand aus HEAD findet sie genau `summe`.
Die erste Fassung meldete 60 Fehlalarme (kurze Namen wie `s`, `sub`, `grp` sind
anderswo Parameter) — behoben, indem sie alle Bindungen der Zielfunktion kennt.
Das Template ist ausgenommen: dort stehen Platzhalter statt Deklarationen.

## Was durch ist

Zwei unabhaengige, target-blinde Reviews (getrennte Chats, kein gemeinsamer
Kontext) auf den Maschinen-Builds:

| Motto | SHA | Chat | Ergebnis |
|---|---|---|---|
| feuerwehr | 9aa4306 | 9b34d91e | 21 MAJOR / 15 MINOR / Score 12 |
| baustelle | 016d09f | c6065baf | 18 MAJOR / 18 MINOR / Score 13 |
| meerjungfrau | 177a794 | 1d158ca0 | 16 MAJOR / 17 MINOR / Score 15 — **SHA VERALTET** |

### Der meerjungfrau-Lauf gilt NICHT als Gate

Der Prompt entstand vormittags mit SHA `177a794` und ging erst Stunden spaeter
raus — da war der SHA rund 35 Commits alt. `177a794` ist ausgerechnet der
LETZTE Commit mit dem esclink-Parsefehler; der direkt folgende `e9f80c59` hat
ihn behoben. Der Reviewer meldete ihn folglich als Blocker und deckelte den
Score darauf. Selbst nachgeprueft mit `node --check`: bei `177a794` wirklich
SyntaxError, bei HEAD sauber. Der Reviewer hatte recht — ueber einen Stand von
heute frueh.

**Lehre, mechanisierbar:** den SHA erst unmittelbar vor dem Absenden in den
Prompt setzen, nie beim Schreiben. Ein Review gegen einen veralteten SHA kostet
eine volle Runde und liest sich trotzdem wie ein gueltiges Gate.

Seine 34 Befunde bleiben als PRUEFLISTE wertvoll (die JSONs haben sich weniger
bewegt als index.html), sind aber einzeln gegen den heutigen Stand zu
verifizieren — 4.1 (Wunderkerze ohne Sicherheitszeile) ist z.B. seit `8eb1a4e3`
erledigt. Aufgenommen in `_dev/handoff/2026-08-05-meerjungfrau-pruefliste.md`.

Scores sind Telemetrie, nicht Ziel — und nicht mit frueheren Wellen
vergleichbar.

### Repariert und committet

**Totalausfall (e9f80c59).** Beide Reviewer meldeten unabhaengig als ersten
Befund: das Paket parst nicht, der Kaeufer sieht nur den Ladetext. Zutreffend,
und zwar fuer ALLE FUENF Pakete plus Template. Beim Einbau von `esclink` kam
ein zweites `const` mitten in eine noch offene Deklarationsliste:

    const esc=_C.esc,
    const esclink = _C.esclink; poss=_C.poss, ...

**Linter-Stufe 15 (cc91c7ec, erweitert in 5b6cff95).** `node --check` ueber
alle Paket-Skripte. Vierzehn Stufen liefen gruen gegen ein totes Paket — alle
pruefen Text, keine hat je gefragt, ob die Datei ueberhaupt JavaScript ist.
Die erste Fassung der Stufe hatte selbst dieselbe Luecke (nur inline-Scripts,
nicht `paket/core/*.js`); 5b6cff95 schliesst sie.

**Linter-Stufe 16 (fe6f2e4d).** Markdown/URL in Feldern, die roh durch `esc()`
gedruckt werden. Haelt fest, welche Felder durch `esclink()` laufen und
Markdown deshalb duerfen.

### Was sich beim Nachpruefen ANDERS darstellte als gemeldet

- **Zeitplan.** `buildTimeline()` liest `timeWindow` gar nicht — es rechnet mit
  den echten Partyzeiten (Vorgabe 14:00 + 180 Min). Ueberhang landet in
  `reserve[]`, und `reserve` WIRD gedruckt, mit Name und Dauer je Spiel. Das
  Blatt verschweigt also nicht, was nicht passt. Das Finale ist seit Gate Z1
  ausdruecklich geschuetzt. Bleibt ein echter Widerspruch — die Daten
  versprechen ein `timeWindow`, in das ihr Programm nicht passt — aber es ist
  eine Datenfrage, keine Rendererfrage.
- **feuerwehr 6.1** (gross-Ritual druckt rohes Markdown samt Affiliate-URL):
  auf dem geprueften Pfad nicht reproduzierbar. `introText` laeuft durch
  `esc()`, enthaelt aber in allen 45 Dateien kein Markdown. NICHT widerlegt —
  nur dieser eine Pfad ist geprueft.

### Eigene Befunde, noch nicht gefixt

- **Schatzsuche ohne Slot** (deckt feuerwehr 2.2 und baustelle Z3).
  `buildTimeline()` nennt Schatzsuche/Station/Mission mit keinem Wort. Das
  Paket druckt die Blaetter trotzdem (11 Fundstellen in feuerwehr),
  `data/schatzsuche.json` traegt 15 Themen. Der Ablaufplan weist null Minuten
  fuer etwas aus, das dasselbe Paket ausdruckt — in ALLEN Mottos.
- **`signatureRitual.setupSteps`** liegt in 37 von 45 Dateien,
  **`subtitle`** in 39 — der Renderer druckt beide nie. Stufe 14 liess sie
  durch, weil sie nur prueft, ob der Feldname irgendwo im Code vorkommt,
  nicht ob er auf ein Blatt gelangt.

## Vier Entscheidungen, die Bolle gehoeren

1. **AA-Kontraste.** `--gold` als Textfarbe auf Papier: feuerwehr 3,11 ·
   dino 3,00 · piraten 2,61 (AA verlangt 4,5). Farben aendern heisst
   Aussehen aendern — deshalb nicht eigenmaechtig.
2. **Zeitfenster gegen Programmlaenge.** 123 von 134 Varianten passen nicht
   in ihr eigenes `timeWindow`. Fenster verlaengern oder Programme kuerzen?
3. **Schatzsuche im Ablaufplan.** Einplanen (schiebt Spiele in die Reserve)
   oder als ausdrueckliche Alternative zum Spielblock kennzeichnen?
4. **`setupSteps` / `subtitle` drucken?** Sind das Elterntexte fuers
   Ritual-Blatt oder Bau-Metadaten?

Dazu weiter offen: Quiz-Felder `frage`/`antwort`/`kategorie` je 318x
ungelesen · Daten-Gate ueber alle 45 Dateien vorziehen?

## Offene MAJORs

**feuerwehr (20):** 3.1 gross/standard 136 EUR gedruckt vs 148 Liste · 3.2
klein/wow 111 vs 103 · 3.3 Nebelmaschine 30/30/45 an drei Stellen · 4.1
Augen-Spueldauer 5 Min Spielkarte vs 10 Min SOS-Karte · 4.2 Wunderkerze 6-8
ohne Sicherheitszeile · 4.3 Schutzbrille zweimal als Absicherung genannt, auf
keiner Einkaufsliste · 6.2 Crew-Abzeichen minAge 9 traegt Text der 3-5-Gruppe
· 6.4 Nebelmaschine gekauft, kein Spiel benutzt sie · 6.5 0-EUR-Posten
versprechen fehlende Druckvorlagen · 6.7 "Sanitaeterin Emma" auf klein-Karte
ohne dass es in klein eine Emma gibt · 5.1/5.2 Kontraste (s. Entscheidung 1).

**baustelle (17):** SI1 vier verschiedene Mindestgroessen fuer denselben
Bauklotz (Verschluck-Grenze!) · SI2 "echtes Werkzeug" fuer 9-12 ohne Spiel und
ohne Sicherheitszeile · W1 Sabotage-Ermittlung loest sich zweifach auf · W2
vier/sechs/zwei Verdaechtige an drei Stellen · W3 material sagt Lego, prepText
sagt KEINE LEGO · W4 Schrauben-Schatzsuche verspricht mehr als das Material
hergibt · W10 zwoelf Zettel mit fremden Vornamen an fuenf Kinder · W12 schickt
zum Selberbasteln obwohl die Inhalte in den Daten liegen · ~~V3 Feuerwehr-Restjargon im Baustellen-Paket~~ ERLEDIGT (`aab6a49b`, 7 Slots, Stufe 23) · S1 Altersanpassung druckt auf
9-12-Karten "NICHT fuer 8".

## meerjungfrau-Reviewer: Sendemechanik — GELOEST

Gestartet. Chat `53aa172e` gegen `aab6a49b`.

**Die hier vorher notierte Messung war falsch und ist ersetzt.** Sie besagte
"Bildschirmkoordinaten sind ca. 1,2x kleiner als DOM-Koordinaten" — geraten aus
der angezeigten Bildbreite. Richtig ist der GEMESSENE Faktor:

    Screenshot-Breite / window.innerWidth  =  1568 / 2400  =  0,6533
    Bildschirm-Koordinate = DOM-Koordinate x 0,6533

Mit 1,2 landete jeder Klick plausibel nah am Ziel und nie darin — deshalb die
vier falschen Erklaerungen davor. Zwei Fehlversuche mit demselben Faktor heissen:
der Faktor ist falsch, nicht die Position.

**Wichtiger: der Klick-Weg war der falsche Weg.** Der Fiber-Submit braucht gar
keine Koordinaten und griff im ersten Versuch:

1. `ed.commands.setContent(<p>-je-Zeile)` — fuellt den Editor, Absaetze bleiben.
2. SEPARATER Call: vom `.ProseMirror` hochwalken bis zum ersten Vorfahren mit
   `__reactProps$.onKeyDownCapture`, diesen mit einem gefaelschten Enter-Event
   aufrufen (`nativeEvent.isTrusted: true`).
3. `location.pathname` wird `/chat/<id>` = gesendet.

Reihenfolge fuer den naechsten Reviewer: Fiber-Submit zuerst, Klick nur als
Rueckfall — und dann mit gemessenem Faktor.

---

## Nachtrag 05.08. — Neuordnung der offenen baustelle-Befunde

Beim Abarbeiten von W2/W4 zeigte sich, dass ein grosser Teil der offenen
MAJORs gar nicht das Paket betrifft, sondern die Schatzsuche — und die hat
Bolle ausdruecklich geparkt ("wollen wir eh erst nachgelagert entwickeln,
die ist noch zu schlecht").

Von 18 gemeldeten baustelle-MAJORs:

  ERLEDIGT (2)   B1 Parse-Totalausfall · W3 Lego-Widerspruch
  SCHATZSUCHE (5) S2 QA-Notizen auf Stationskarten · Z3 kein Slot im Plan ·
                  W1 Sabotage loest sich zweifach auf · W2 Verdaechtigen-Zahl ·
                  W4 Schrauben-Schatzsuche
  ECHT OFFEN (11) S1 Altersanpassung "NICHT fuer 8" · S3 Sieger-Spiele ohne
                  Trostpfad · Z1 Zeitfenster · Z2 Reserve reisst das Ritual-Finale
                  raus · SI1 Mindestmasse (Bolle-Entscheidung) · SI2 "echtes
                  Werkzeug" ohne Spiel · SI6 zwei Last-Systeme · W10 zwoelf
                  Zettel an fuenf Kinder · W11 QA-Notizen auf der Ritual-Karte ·
                  W12 Selberbasteln trotz vorhandener Daten · V3 Feuerwehr-Jargon

### W2 loest sich anders auf als gemeldet

Die Spielkarte ist IN SICH stimmig: material, prepText, steps und der
Einkaufsposten nennen uebereinstimmend 4 Verdaechtige, die Alibi-Tabelle
rechnet mit "die anderen 3" auf. Die gemeldeten "sechs auf der Einkaufsliste"
sind nicht auffindbar.

Der echte Widerspruch: die Schatzsuche-Station erzaehlt denselben Sabotage-Fall
ein zweites Mal — mit 2 Verdaechtigen und anderen Namen (Lisa/Tom, Anna/Leon
statt Frank/Anna/Tom/Klaus). Zwei Quellen, nicht drei. Gehoert in die geparkte
Schatzsuche-Ueberarbeitung.

### Nebenbefund: Gender-Doppelformen in gedruckten Daten

72 Vorkommen der Doppelpunkt-Schreibweise: schatzsuche.json 39
("Bauarbeiter:innen", "Held:innen", "Reiter:innen"), feen-gross.json 32
("Hueter:innen", "Elfenkrieger:innen"), prinzessin-gross.json 1.

Bolles Regel sagt "lass das komische Gendern" UND "kein Retro-Sweep". 72
Stellen waeren ein Sweep. Deshalb nicht angefasst, sondern vorgelegt.

---

## Stand 05.08. abends — baustelle vollstaendig sortiert (18 MAJORs)

  GEFIXT (3)          B1 Parse-Totalausfall · W3 Lego-Widerspruch ·
                      S1 Altersanpassung beschriftete sich falsch
  NICHT REPRODUZIERT (4)
                      W10 "zwoelf Zettel an fuenf Kinder" — rolesList hat 8
                          Eintraege, die Party 8-10 Kinder, und die Eintraege
                          sind variantengesteuert (4 Grund + 2 ab Standard +
                          2 nur Wow). Weniger Rollen als Kinder, nicht mehr.
                      W11 "QA-Notizen auf der Ritual-Karte" — der Kandidat
                          printablesNote wird nirgends gedruckt (0 Treffer).
                      W12 "schickt zum Selberbasteln" — printables wird
                          ebenfalls nicht gedruckt. Der Kaeufer wird nicht zum
                          Basteln geschickt, er erfaehrt gar nichts davon.
                      SI2 "echtes Werkzeug, kein Spiel benutzt es" — stimmt,
                          ist aber ein MITGEBSEL. Kein Defekt.
  SCHATZSUCHE (5)     S2 · Z3 · W1 · W2 · W4 — von Bolle zurueckgestellt
  BOLLE (1)           SI1 Mindestmasse / Verschluck-Grenze
  ECHT OFFEN (5)      S3 Sieger-Spiele ohne Trostpfad · Z1 Zeitfenster ·
                      Z2 Reserve reisst das Ritual-Finale raus ·
                      SI6 zwei Last-Systeme · V3 Feuerwehr-Jargon

### Muster, das dabei sichtbar wurde

Von den 12 selbst nachgeprueften baustelle-Befunden hielten 8 stand und 4
nicht. Die vier Fehlalarme haben eine gemeinsame Ursache: der Reviewer hat
eine Erklaerung uebersehen, die im Nachbarfeld stand — das Mitgebsel-Feld beim
Werkzeug, die Varianten-Markierung bei den Rollen, der fehlende Renderer bei
printables. Das spricht nicht gegen den Reviewer (er hat den Totalausfall
gefunden, den 14 Linter-Stufen verschlafen haben), aber es begruendet, warum
jeder Befund einzeln gegen die Primaerquelle geht, bevor jemand etwas aendert.

### Nebenbefund: printables

18 Vorlagen-Beschreibungen (Diplom, Funktionskarten, Bauplan-Raster,
Werkzeug-Quiz, Beweiswand, Baustellentafel) in 3 von 45 Dateien —
baustelle-gross, pferde-gross, ritter-gross. Keine wird gerendert.
printablesNote verspricht dazu ein PDF-Pack "in Vorbereitung — manuell auf
Anfrage". Klein und lokal, keine systemische Familie.

---

## 4.3 Schutzausruestung — praezisiert, eine Entscheidung offen

Der Reviewer: "Schutzbrille zweimal als Absicherung genannt, steht auf keiner
Einkaufsliste."

Ausgezaehlt ueber alle 45 Dateien: 49 Nennungen von Schutzausruestung
(Schutzbrille, Atemschutz, Warnweste, Knieschoner ...), 16 davon nicht auf der
Einkaufsliste der jeweiligen Variante. Davon sind 13 BEDINGT formuliert und
damit kein Defekt:

    feuerwehr   "Nie ins Gesicht zielen, bei Bedarf Schutzbrille."
    weltraum-gross "Schutzbrille empfohlen."
    dino        "Gipsstaub nicht einatmen (Atemschutz/Tuch vor Mund)"
                — nennt die Haushaltsalternative gleich mit.

ECHT OFFEN sind zwei Stellen, beide weltraum-mittel (standard + wow):

    material: "... Brausetablette oder Natron + Essig, etwas Wasser.
               Schutzbrille PFLICHT fuer alle in Reichweite."

PFLICHT — und die Einkaufsliste der Variante fuehrt keine Brille. Ein
Elternteil liest das am Partytag und hat keine im Haus.

WARUM NICHT SELBST GEFIXT: Der Posten braucht einen Preis. Die Hausdaten
fuehren Schutzbrillen ausschliesslich gebuendelt (baustelle "Helme +
Warnwesten + Schutzbrillen" 40-70 EUR, ritter "Bogen + Pfeile + Schutzbrille"
25 EUR) — es gibt keinen Einzelpreis, den ich uebernehmen koennte. Eine
ausgedachte Zahl ausgerechnet in das Feld zu schreiben, dessen Familie gerade
47 offene Abweichungen hat, waere nachlaessig.

BOLLE: Schutzbrillen-Set als eigener Posten in weltraum-mittel standard + wow
— welcher Preis? (Ein 8er-Set Kinder-Schutzbrillen liegt real bei etwa 12-15
EUR, aber das ist meine Schaetzung, kein Katalogwert.)

---

## 6.4 haelt nicht · 6.5 haelt und ist groesser

### 6.4 Nebelmaschine — kein Defekt

"Nebelmaschine gekauft, kein Spiel benutzt sie." Stimmt fuer Spiele, aber sie
wird in `decoration` benutzt — und einhorn-gross weist sie sogar als
"(optional)" aus. Zwei Faelle (einhorn-gross wow, feuerwehr-mittel wow, je
30 EUR), beide legitim. Derselbe Fehlschluss wie bei SI2 (Werkzeug-Guertel =
Mitgebsel): der Reviewer schaut nur in die Spiele.

### 6.5 Null-Euro-Posten — bestaetigt, 72 Stueck in drei Sorten

    33  DRUCKVORLAGE VERSPROCHEN   "Quiz (Druckvorlage)", "Forscherpass +
                                    Quiz", "Ausmalbilder", "Lizenzen ausdrucken"
    23  KOSTET ABER GELD           "Walkie-Talkies fuer die Schatzsuche",
                                    "Pluesch-Tropentiere", "Pflanzen fuer Quest"
    16  HAT MAN ZUHAUSE            alte Hemden, Karton, Bibliotheksbuch,
                                    "GPS Coordinates (kostenlos)"  — legitim

Entscheidender Beleg zur ersten Sorte: **im Repo existiert keine einzige
Druckvorlagen-Datei.** Kein `downloads/`-Verzeichnis, keine `printable`-Datei.
Dazu passt printablesNote in drei Dateien: "PDF-Pack ... in Vorbereitung —
manuell auf Anfrage".

Die zweite Sorte haengt direkt an der Summen-Arbeit von heute: ein Posten mit
priceEur 0, der real Geld kostet, drueckt die gerechnete Summe nach unten. Der
Kaeufer sieht eine Zahl, die zu niedrig ist.

### Zwei Entscheidungen fuer Bolle

1. **33 versprochene Druckvorlagen** — herstellen, oder umformulieren
   ("selbst gestalten", "Vorlage auf Anfrage")? Solange beides nicht passiert,
   steht auf einem bezahlten Blatt ein Versprechen ohne Deckung.
2. **23 Posten mit 0 EUR, die Geld kosten** — bepreisen (macht die Summen
   ehrlicher, aber teurer) oder als "aus dem Bestand" kennzeichnen (dann ist
   die 0 richtig und die Erwartung klar)?

Beides aendert entweder den Produktumfang oder den Preis — deshalb nicht
eigenmaechtig.

---

## Feuerwehr-Welle abgeschlossen · 6.8 als Strukturbefund

### Gefixt in dieser Welle

    4.1  Augen-Spueldauer     Spielkarte 5 Min gegen SOS-Karte "mindestens 10"
                              — 12 Stellen, auf den vorsichtigeren Wert des
                              Produkts selbst gezogen
    4.2  Wunderkerze          14 Dateien nannten sie ohne Sicherheitszeile
    3.3  Nebelmaschine        drei Stellen 30 EUR, eine 45 — samt der
                              Geraeteklasse, die 30 nicht kauft
    1.3  Zielspritzen         prepText (kooperativ, 1 m) gegen steps
                              (Wettkampf, 3/5/7 m) — Kopie aus mittel
    5.2  --sea                dino 4,10 / piraten 3,93 auf AA gezogen;
                              Generator prueft jetzt BEIDE Textrollen

### Nicht reproduziert

    6.1  rohes Markdown im Ritual  — auf ALLEN Ritual-Pfaden geprueft, 0 Treffer
    6.2  Crew-Abzeichen minAge     — minAge 9 in der 9-12-Datei ist richtig;
                                     katalogweit 0 Spiele mit minAge UEBER Band
    6.4  Nebelmaschine ungenutzt   — wird in decoration benutzt, einhorn weist
                                     sie sogar als "(optional)" aus
    6.7  Sanitaeterin Emma         — Beispielzitate in gross, nicht klein
    4.3  Schutzbrille (13 von 16)  — bedingt formuliert ("bei Bedarf")

### 6.8 SOS-Karten nennen Spiele der falschen Variante — STRUKTUR

sosScenarios liegt auf DOKUMENT-Ebene: ein Satz Notfallkarten fuer alle drei
Varianten. Die Texte nennen aber konkrete Spiele. Wer minimal kauft, liest
eine Notfallkarte ueber ein Spiel, das sein Paket nicht enthaelt:

    baustelle-klein minimal   SOS "weniger_kinder_als_erwartet" nennt die
                              Bau-Olympiade (Schubkarren) — nur in wow
    detektiv-gross minimal    SOS "spielzeug_kaputt" nennt die
                              Geheimschrift-Station — nur in hoeheren Varianten

Grobmessung: 173 Treffer in 39 von 45 Dateien, davon 112 in minimal. ACHTUNG:
die Zahl ist zu hoch gegriffen — meine Wortsuche faengt auch generische
Begriffe ("material", "stationen"). Aussagekraeftig sind die eigentuemlichen
Spielnamen. Das Strukturproblem ist belegt, die Groessenordnung nicht.

NICHT GEFIXT: Es gibt drei Wege — sosScenarios je Variante fuehren
(Datenumbau), die Texte generisch umschreiben (redaktionell, viele Dateien),
oder beim Drucken filtern (geht nicht, die Referenz ist Freitext ohne ID).
Alle drei sind Produktentscheidungen. Gehoert in dieselbe Familie wie die
fehlende Verbindung zwischen Spiel und Einkaufsposten.

---

## 6.3 Theorie-Briefing: verspochen, nicht geliefert (INHALTSLUECKE)

feuerwehr-mittel, Wow-Variante. Vier Stellen sprechen vom Theorie-Briefing:

    variants[2].intro          "Auf der Standard-Variante aufbauend.
                                Theorie-Briefing wie an einer echten Wache ..."
    games[3].steps[4].content  "... weil das mit dem Theorie-Briefing ueber
                                Brandklassen zusammenhaengt"
    games[3].whyItWorks        "Die Loesung knuepft ans Theorie-Briefing an"
    parentTips + faq           "Theorie-Briefing der Wow-Variante"

Die Spieleliste der Variante enthaelt aber keins:

    Spritz-Probe · Ausbildungs-Stationen · Mini-Einsatz · Brandermittlung ·
    Schaum-Loeschen · Bewertete Zeremonie

Als eigene Karte existiert das Briefing nur in feuerwehr-GROSS
("Theorie-Briefing an der Wache").

Der Gastgeber liest also viermal davon und hat keine Karte dafuer — und die
Brandermittlung, deren Aufloesung ausdruecklich daran anknuepft, haengt in
der Luft.

NICHT GEFIXT: Das ist eine fehlende Spielkarte, kein Wortfehler. Zwei Wege —
das Briefing aus gross fuer mittel/wow adaptieren (neue Karte, redaktionell),
oder die vier Verweise streichen und die Brandermittlungs-Aufloesung anders
begruenden. Beides ist Produktarbeit, keine Reparatur.

Gehoert in dieselbe Familie wie 6.8 (SOS-Karten nennen Spiele der falschen
Variante): Texte verweisen aufeinander, ohne dass irgendetwas die Verweise
prueft.
