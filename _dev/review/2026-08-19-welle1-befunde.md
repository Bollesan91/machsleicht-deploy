# Welle 1 — 20 muerrische Eltern am Ritter-Paket (19.08.2026)

Methode: 20 Personas, jede geht `machsleicht.de/kindergeburtstag` → Einladung → Paket,
liest anschliessend den vollstaendigen Blatt-fuer-Blatt-Auszug des echten Pakets
(`_dev/review/2026-08-19-paket-inhalt-ritter.txt`, 18 Blaetter, Demo: Tino 7 J., 5 Zusagen).
Frage: zahlst du 14,90 EUR?

## Ergebnis
- **0x ja · 2x vielleicht · 18x nein**
- Median-Schmerzgrenze: **6 EUR** (Spanne 0–8). Aufgerufener Preis: 14,90 EUR.
- Kein einziger Kaeufer bei aktuellem Zuschnitt.

## Einwaende, geclustert (n von 20)
| n | Einwand |
|---|---|
| 20 | Mengen/Kosten sind auf 8 Kinder gerechnet, obwohl die echte Zusagenzahl bekannt ist |
| 20 | Countdown verlangt Vorbereitung fuer Spiele, die der Ablaufplan als Reserve fuehrt |
| 20 | Urkunden blaehen die Blattzahl (5 identische + 1 blanko), Datum bleibt leer obwohl bekannt |
| 20 | Keine Druck-Anweisung (farbig/sw, Seitenzahl, Kosten im Copyshop) |
| 20 | Papier wiederholt, was der Bildschirm schon zeigt |
| 19 | Zu viele Blaetter, gefuehlt gestreckt |
| 18 | Chronik fragt nach Ereignissen, die laut Ablaufplan gar nicht stattfinden |
| 16 | Allergien/Sonderbedarf tauchen nur als Warnung auf, nicht als Loesung |
| 15 | Wohnung/Garten/Wetter/Platz aendern nichts am Inhalt |
| 14 | Handzettel fragt Zusagen ab, die im selben Dokument namentlich stehen |
| 13 | Landing verspricht 4–12 EUR pro Kind, das Paket rechnet 106 EUR auf 8 = 13,25 EUR |
|  9 | Kein Gesamt-Zeitaufwand vor dem Kauf |
|  5 | Kein echter Vorher-Blick, Kauf fuehlt sich blind an |

## Als Code verifiziert (nicht nur Persona-Behauptung)
- `Die Mengen unten sind fuer 8 Kinder gerechnet, du hast 5 Zusagen` — steht so im Paket.
- 6x `wird verliehen an`, davon 1x ohne Namen. Absicht laut Kommentar in
  `paket/_maschine/template.html`: `immer 1 Blanko-Reserve fuer spontane Gaeste`.
  Auf dem Blatt steht diese Absicht nirgends → liest sich als Fehler.
- Urkunde druckt `Datum & Ort` als Leerzeile, obwohl das Datum auf 5 anderen Blaettern steht.
- `shHandzettel()` erzeugt fest `card+card+card+card` → 4 Abrisszettel bei 5 Gaesten.
- Chronik fragt `So haben wir den Schatz gefunden:` — die Drachen-Schatzsuche ist im
  selben Paket ein Reserve-Spiel.

## FALSCHALARM (mein Messfehler, nicht das Produkt)
19 von 20 zitieren den Party-Link `http://localhost/paket/ritter/index.html?demo=1` als
haertesten Satz. Der stammt aus meinem lokalen Render, nicht aus dem Produkt:
`paket/core/paket-core.js:424` setzt im Demo-Modus `PARTYURL = location.origin +
location.pathname + '?demo=1'`. Live steht dort `https://machsleicht.de/paket/ritter/?demo=1`,
bei echtem Kauf `https://party.machsleicht.de/<id>` (Zeile 432).
Rest-Befund bleibt: Wer die Demo druckt, verteilt einen Demo-Link.

## Blaetter, die Geld wert sind (Mehrfachnennung)
Kuechen-Zettel (Allergien + Abholzeiten) · Ablaufplan mit Minutentakt · SOS-/Plan-B-Karten ·
Kuchen mit Allergie-Umbau · Quiz-Karten mit Antworten · **eine** Urkunde.

## Blaetter, die als Fuellmaterial gelten
Countdown-Poster · 5 identische Urkunden · Danke-sagen-Blatt · Chronik · Eltern-Handzettel ·
Rollenkarten (10/20).
