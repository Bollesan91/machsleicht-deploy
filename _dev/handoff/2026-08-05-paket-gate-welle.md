# Paket-Gate 05.08.2026 — zwei Reviews eingesammelt, vier Entscheidungen offen

Stand `draft` = 5b6cff95, `main` unberuehrt = 78450cb7. Nichts deployed.

## Was durch ist

Zwei unabhaengige, target-blinde Reviews (getrennte Chats, kein gemeinsamer
Kontext) auf den Maschinen-Builds:

| Motto | SHA | Chat | Ergebnis |
|---|---|---|---|
| feuerwehr | 9aa4306 | 9b34d91e | 21 MAJOR / 15 MINOR / Score 12 |
| baustelle | 016d09f | c6065baf | 18 MAJOR / 18 MINOR / Score 13 |
| meerjungfrau | 177a794 | — | nicht gestartet (Sendemechanik, s.u.) |

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
zum Selberbasteln obwohl die Inhalte in den Daten liegen · V3
Feuerwehr-Restjargon im Baustellen-Paket · S1 Altersanpassung druckt auf
9-12-Karten "NICHT fuer 8".

## meerjungfrau-Reviewer: Sendemechanik

Nicht gestartet. Vier Erklaerungen fuer den fehlenden Sende-Knopf haben sich
nacheinander als falsch erwiesen. Gemessen ist:

- Bei leerem React-State zeigt die Leiste "Sprachmodus verwenden"; der
  Sende-Knopf existiert dann GAR NICHT im DOM.
- `insertContent`/`setContent` fuellen das DOM, wecken React aber nicht.
- Bildschirmkoordinaten sind ca. 1,2x kleiner als DOM-Koordinaten (Fenster
  1568x744). Immer aus dem Screenshot ablesen, nie aus `getBoundingClientRect`.
- `setContent` mit `<p>` je Zeile erhaelt die Absaetze; `insertContent` mit
  `\n` plattet alles auf einen Absatz.
- Tastenanschlaege landen an der KLICKPOSITION, nicht am Textende.

Naechster Anlauf: Tab 1532791063 (dort ging es) und einen frischen Tab im
gleichen Zustand nebeneinander vermessen, BEVOR geklickt wird.

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
