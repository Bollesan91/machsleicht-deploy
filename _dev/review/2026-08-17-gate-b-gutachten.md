# Gate B — Gutachten (Opus 5 Max, frischer Tab, target-blind)

- **Datum:** 17.08.2026 · **Chat:** `91e499e4-4ae3-47e9-a57c-80fe125d0dd6`
- **Begutachteter Stand:** `a436b4d3c3cd8fc5f138bdd22b4ed7fb07bf755d`
- **Material:** Inventar Teil 1–3 (573 gedruckte Regeln), die 787 harmlos-Begründungen,
  Beispielseite `piraten-6-8-jahre.html`. Der Gutachter hat zusätzlich `einhorn-9-12`,
  `weltraum-6-8`, `feen-3-5`, `pferde-6-8` und `prinzessin-3-5` selbst live gezogen.
- **Score:** **72 / 100** (Telemetrie, nicht Gate)
- **Caveat:** Der Tab zeigte 5× „Recalled memories" — Konto-Gedächtnis reicht Wissen aus
  früheren Begutachtungen herein. Ab sofort Inkognito, s. `_dev/LEKTIONEN.md` L21.

## Die drei wichtigsten Findings des Gutachters

1. **Die Zwei-Stunden-Drohung ohne Notfallkette** — 13 Seiten drucken „eine verschluckte
   Knopfzelle verätzt die Speiseröhre schon nach zwei Stunden", aber nur 10 der 27
   Knopfzellen-Regeln (5 Seiten) tragen 112 / kein Erbrechen / Honig. Betroffen sind
   ausgerechnet die Schlafparty-Seiten mit Stirnlampen.
2. **Die harmlos-Datei hebt gedruckte Regeln wieder auf** — Walkie-Talkies, LED-Deko,
   UV-Lampe, Fernrohre, Bandanas, Gummibärchen. Gleiche Ware, gleiche Altersgruppe,
   gegenteilige Aussage. Der Leser sieht immer nur eine Seite.
3. **`feen-klein` „Beeren-Mix + Brezel-Sticks" als harmlos** — „keine klassischen
   Aspirations-Lebensmittel wie ganze Trauben oder Nüsse enthalten", dabei sind
   Heidelbeeren das Standardbeispiel für runde Aspirationsware. Jüngste Altersgruppe,
   und der eigene Bestand widerlegt es auf drei anderen Seiten.

## Stufe 3 — jedes Finding gegen die Quelle geprüft

Der Gutachter irrt in beide Richtungen; hier steht, was die Prüfung ergeben hat.

| Nr | Finding | Prüfung | Ergebnis |
|---|---|---|---|
| **9.1** | „Die Rechenprobe geht nicht auf: 573 + 787 = 1360, nicht 1419" | 632 `safetyNote` + 787 `safetyChecked` = **1419**, geht auf. Die 573 sind die auf freien Seiten **gedruckten** Regeln — 59 Regeln gehören zu Katalogposten, die keine freie Seite verkauft. | **Mein Prüfauftrag war irreführend**, die Daten sind vollständig. Formulierung korrigieren, nicht die Daten. |
| **9.1b** | Deko-/Snack-/Mitgebsel-**Karten** sind in keinem der Pflichtfelder; `prinzessin-3-5` hat gar keine Einkaufsliste, 28 Karten, 4 erfasst | Deckt sich mit der eigenen Messung (Stufe-42-WARN, Befund G4: 51 Karten, davon ~34 echte Lebensmittelfälle). Der Gutachter beziffert den Geltungsbereich schärfer. | **BESTÄTIGT**, unabhängig doppelt gefunden |
| **2.3** | einhorn-9-12: Regel fordert Schutzbrille, kein Posten verkauft sie | Im Katalog steht sie („Rotkohl + Chemie-Zutaten + **10 Bastel-Schutzbrillen**") — deshalb ist Stufe 41 grün. Auf der **freien Seite** steht die Zeile nie: dort nennt die Material-Zeile „1 Rotkohl, 8 Becher, Essig, Natron, Zitronensaft, Spülmittel", keine Brille. „Schutzbrille" kommt auf der Seite **ausschließlich in den drei Hinweisen** vor. | **BESTÄTIGT für das Produkt** — und damit ein **Loch in Stufe 41**: die Stufe misst den Katalog statt die Seite. Das ist Lektion L17 in einer neuen Stufe. |
| **4.1** | `pferde-6-8-jahre.html`: 24 Posten, **0** gedruckte Regeln | Unabhängig vor Eintreffen des Gutachtens selbst gefunden: `pferde-mittel.json` hat 0 `safetyNote` und 24 `safetyChecked`. Die Wolle-Regel von `pferde-3-5` („um Hals oder Finger gewickelt schnürt sie ab") wird in der 6–8-Fassung auf den Drahtkern reduziert — das kleinere Risiko bleibt, das größere fällt weg. | **BESTÄTIGT**, unabhängig doppelt gefunden |
| **4.2** | Gips „erst ab 10" auf einer 9–12-Seite | Identisch mit eigenem Befund F1 (gemessen: 10 Altersgrenzen im eigenen Fenster, 9 korrekt abgestuft, diese eine defekt). | **BESTÄTIGT**, unabhängig doppelt gefunden |
| **1.1** | Knopfzelle / zwei Stunden / Honig-Kette | Gutachter bestätigt gegen BfR und Uniklinik Bonn. | Bestätigt |
| **1.2** | Mirror Glaze 30–32 °C zu kalt (Fachlage 32–35 °C) | Plausibel, betrifft Gelingen statt Sicherheit; Richtung bleibt konservativ. | Fix-Kandidat MINOR |
| **1.3** | „Popcorn ab etwa vier" nimmt die permissive Kante (Fachlage 4–5) | Deckt sich mit der eigenen Primärverifikation zur Kleinteil-Grenze: der Bestand nimmt mehrfach die weichere Zahl. | Fix-Kandidat: einheitlich fünf |
| **1.4** | Ballon-Statistik falsch dem Packungshinweis zugeschrieben | Inhaltlich richtig (AAP 29 %), die Zuschreibung nicht. | Fix: Halbsatz streichen |
| **1.5** | „Die häufigste Erstickungsursache" fünffach vergeben | Nachgezählt: fünf verschiedene Kombinationen tragen denselben Superlativ. | Fix: „gehören zu den häufigsten" |
| **1.6** | Gips „bis 60 °C" nicht belegt | Der Unfallmechanismus ist DGUV-belegt, die Zahl nicht. | Als UNSICHER offen, gegen die eigene Quelle prüfen |
| **9.2** | 54 Erstickungs-Warnungen, **kein einziges Mal** Erste Hilfe; nur die Knopfzellen-Regel nennt die 112 | Nachgezählt: 0 Treffer für Heimlich / Rückenschläge / Erste Hilfe. Für Augenspritzer existiert eine mustergültige Kette — für das häufigste Risiko nichts. | **BESTÄTIGT** — stärkstes Finding des Gutachtens, weil es eine Asymmetrie im ganzen Werk benennt |
| **6** | „Praktisch kein reiner Gefühlstransport, fast jede Regel endet mit einem ausführbaren Verb" | — | Bestätigung, kein Finding |

## Was der Gutachter nicht sehen konnte

Er bekam die Einkaufslisten-Regeln. Nicht im Material und deshalb hier nachgetragen
(eigene Messung, s. `_dev/QUELLDATEN-BEFUNDE.md`):

- **G**: 133 handgeschriebene Sicherheitsaussagen im Fließtext, außerhalb jeder Maschine —
  darunter fünf Kleinteil-Untergrenzen unter der Prüfgröße (31,7 mm, 16 CFR 1501.4).
- **H**: 72 der 787 harmlos-Begründungen berufen sich auf Text, den der Leser der freien
  Seite nie sieht (Spiel-`safetyRule`, „im Paket"). Das ist die Mechanik hinter den
  Widersprüchen, die der Gutachter unter 3.2–3.6 einzeln gefunden hat.
