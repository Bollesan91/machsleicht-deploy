# Gegenpruefer-Auftrag — Vorlage fuer den session-internen Pruefer

Wird pro Ping ausgefuellt und als Prompt an einen **frischen Subagenten** gegeben
(`Agent`-Tool, `model: fable`, `subagent_type: general-purpose`). Platzhalter in
`<spitzen Klammern>` ersetzen, den Rest woertlich stehen lassen — die Formulierungen
sind der Mechanismus, nicht Deko.

## Zwei Spuren, und der Unterschied ist keine Formalie

| | **Spur A — Code / Daten / Maschine** | **Spur B — Inhalt / Text / Spielbarkeit** |
|---|---|---|
| Pruefling | `party-worker.js`, `_dev/scripts/*`, `data/motto/*.json`, Generatoren, Linter-Stufen | Motto-Seiten, Ablauf-Kaesten, FAQ, Spielanleitungen, Druckblaetter |
| Gegenpruefer | Subagent, falsifizierend | Subagent als **Vorfilter** |
| Was entscheidet | **deterministisch**: Stufe + Mutationsnachweis + Render-Smoke | **die Reviewer-Meinung selbst** |
| Gate | intern ausreichend | **extern noetig** (frischer claude.ai-Tab, staerkstes Modell auf Max) |

Der Grund steht in einem Satz: Bei Code ist der Pruefer nur **Kandidatenlieferant** —
entschieden wird von einem Gate, das rot werden kann. Bei Inhalt **ist** seine Meinung
das Gate; dort traegt die Unabhaengigkeit die ganze Last, und ein Subagent, der im
selben Repo sitzt wie der Autor, hat sie nicht.

**Solange Chrome-MCP nicht erreichbar ist**, ist Spur B damit nicht abgenommen, sondern
gestundet: Spur-B-Artefakte duerfen auf `draft`, aber der Prueftstand stempelt sie
`GATE: intern (vorlaeufig)` — nicht `fertig`. Das ist kein Formalismus: genau diese
Verwechslung („war schon da" = „war je reviewt") ist im Projekt schon zweimal teuer
gewesen.

---

## Der Auftrag

> Du bist Gegenpruefer. Deine Aufgabe ist **nicht** zu bewerten, ob die Arbeit gut ist,
> sondern zu zeigen, **wo die folgende Zusage bricht**.
>
> **Zusage, die brechen soll:**
> `<eine einzige, woertliche Zusage — z. B. "jeder Ablauf-Kasten nennt nur Spiele, die
> dieselbe Seite auch erklaert" oder "unter Adress-Gating steht die Adresse in KEINER
> Ansicht, auch nicht prozent-kodiert">`
>
> **Pruefling:**
> `<Dateien mit Pfad, gern mit Zeilenbereich; bei Seiten zusaetzlich die URL im lokalen
> Server, z. B. http://localhost:8766/kindergeburtstag/ritter.html>`
>
> **Kanonische Referenzen** (das ist die Wahrheit, nicht der Code):
> `<data/motto/<motto>-<alter>.json, _dev/docs/WORKER-CONTRACT.md, die Regel-Datei,
> das Gesetz, die Feld-Map — was hier gilt>`
>
> ### Nicht lesen — dort steht die Soll-Antwort
> `_dev/pruefstand/README.md`, `_dev/pruefstand/befunde/`, `_dev/LEKTIONEN.md`,
> `_dev/OFFENE-REVIEW-PUNKTE.md`, `SESSION-NOTES.md`, `AUDIT.md`, `_dev/review/`,
> `_dev/HELFER-V5-MASCHINE.md`. Wer die Loesung abliest, prueft nichts. Der uebrige
> Code und alle Daten sind ausdruecklich erlaubt und sollen gelesen werden.
>
> ### Winkel — jeden einzeln abarbeiten, nummeriert antworten
> 1. `<Winkel 1>`
> 2. `<Winkel 2>`
> 3. `<...>`
>
> Bei Spielen ist **einer** der Winkel Pflicht: *Kapiert ein Kind zwischen 4 und 9 in
> fuenf Sekunden, was es tun soll — ohne dass ein Erwachsener erklaert?* Eine Seite kann
> technisch fehlerfrei und trotzdem unspielbar sein; genau so ist ein Spiel mit 92
> Punkten durchs Gate gekommen und war unbenutzbar.
>
> ### Wie du arbeitest
> Lies den Pruefling. **Rechne nach. Ruf das Skript auf. Diffe die eine Stelle gegen die
> andere.** Eine Behauptung ohne Lauf ist kein Befund. Jeder Befund braucht ein
> reproduzierbares Kommando **mit seiner echten Ausgabe** im Abschnitt „Ablauf".
>
> Laeufe nur lesend. Erlaubt: `python _dev/scripts/check-*.py`, `bash validate-all.sh`,
> `node _dev/scripts/check-partyseite-render.mjs`, `git log/diff/show`. Verboten:
> alles, was pusht, merged, deployt oder gegen die Live-Seite schreibt.
>
> ### Ausgabeformat — je Befund
> ```
> ## N. klasse — datei:zeilen (funktion oder Abschnitt)
> **Schwere:** MAJOR | MINOR | UNSICHER
> **Zitat:** "<woertlich aus dem Pruefling, unveraendert>"
> **Befund:** <was bricht, konkret>
> **Ablauf:** <Kommando + echte Ausgabe, die es belegt>
> **Fix:** <was zu tun ist>
> ```
> Klassen (Hausformat): `stille-falschaussage`, `versprechen-ohne-deckung`,
> `hand-edit-an-generiertem`, `zwei-wahrheiten`, `unspielbar`, `datenleck`,
> `render-bruch`, `sonstiges`.
>
> ### Wenn du nichts findest
> Dann schreib, **was du geprueft hast und wo du unsicher bist** — Winkel fuer Winkel.
> Kein Lob, keine Qualitaets-Zusammenfassung, kein Score. „Sieht gut aus" ist keine
> zulaessige Ausgabe.
>
> ### Wohin
> Schreib das Ergebnis nach `_dev/pruefstand/befunde/JJJJ-MM-TT-<pruefling>.md`.
> Die Datei ist das Protokoll — dein Bericht an den Auftraggeber ist es nicht.

---

## Warum die Formulierungen so sind

- **„zeigen, wo die Zusage bricht"** statt „pruefen": Falsifikation liefert nachweisbare
  Ergebnisse, Bewertung liefert Hoeflichkeit.
- **genau eine Zusage** pro Auftrag: mehrere gleichzeitig, und der Pruefer priorisiert
  selbst — meist zugunsten der leichtesten.
- **Nicht-lesen-Liste**: der Unterschied zum frischen claude.ai-Tab ist nicht die Frische
  (die hat ein Subagent auch), sondern die **Target-Blindheit**. Ein Subagent sitzt im
  Repo und findet die Beweisfuehrung des Autors. Das muss ausgeglichen werden.
- **Verifikations-Verben**: „rechne nach", „ruf auf", „diffe" erzeugen Laeufe; „pruefe"
  erzeugt Prosa.
- **Ablauf mit echter Ausgabe**: trennt Befund von Vermutung, ohne Nachbohren.
- **kein Score** — und das ist eine bewusste Abweichung von der Projektregel „Scores
  einfordern und zeigen" (Bolle 09.07.). Die gilt weiter fuer die **externe** Stufe-2-Welle,
  wo der Score Telemetrie ueber Wellen hinweg ist. Ein *interner* Pruefer, der eine Zahl
  liefern soll, liefert sie — und die Zahl ersetzt dann den Befund. Hier zaehlt nur, was
  ein Gate rot macht.
- **Datei statt Bericht**: der Bericht eines Subagenten geht an den Auftraggeber, nicht an
  Bolle. Wer referiert, kann weichspuelen. Die Datei kann er nicht.
