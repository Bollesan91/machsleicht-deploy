# Feuerwehr-Paket: Gate DURCHGEFALLEN (03.08.2026)

**Stand:** `d24c480` auf `draft`. Nichts deployed. Score **54/100** (Ship-Floor 84).
**Gutachten:** Opus 5 · Hoch, target-blind, frischer Tab —
https://claude.ai/chat/faf0d344-364d-4f47-a1fd-e1eafd64abe8
(Fable 5 war mitten im Gate ohne Kontingent, Reset 06.08. 14:00 → Ausweichen auf Opus 5.)

**51 Befunde, ~33 MAJOR.** Der Reviewer hat `buildTimeline()` als Node-Simulation über alle
9 Varianten gefahren, Einkaufslisten summiert, WCAG gerechnet, Fakten recherchiert.

---

## Das Wichtigste: drei MAJORs sind BEREITS LIVE

Die Motto-JSONs werden vom Planer (`kindergeburtstag.html`) gerendert — unabhängig davon,
ob das Paket je ausgeliefert wird. Diese drei stehen heute auf machsleicht.de:

### T1 — Suchen-Ersetzen-Havarie, 21 Strings
Eine frühere Welle hat `Sirenen-Sound` global durch `Hand-Signal "Notruf!" + leiser Spruch.`
ersetzt — **inklusive Satzpunkt**, mitten in Sätzen, und semantisch falsch (der Inhalt
spricht weiter von „10 Sek. vom Handy").

Live verifiziert (`curl https://machsleicht.de/data/motto/feuerwehr-klein.json` → 15 Treffer):
```
material : 'Kurzer Hand-Signal "Notruf!" + leiser Spruch. NICHT 30 — bei 3-5 zu lang), 6–8 Kuscheltiere, …'
steps[0] : {'name': 'Hand-Signal "Notruf!" + leiser Spruch.', 'content': '10 Sek. vom Handy …'}
decoration: '📺 Kurzer Hand-Signal "Not…'
```
Verwaiste Klammer, verschluckte Mengenangabe („10 Sek.,"), Satzpunkt im Satz.
Verteilung: klein 15 · mittel 5 · gross 1.

**Fix ist NICHT „alles zurück":** Die Ersetzung war editorisch gewollt (bei 3–5 keine laute
Sirene, stattdessen Hand-Signal). Nur blind angewandt. Also Stelle für Stelle reparieren.

### S1 — Materialzeile kauft, was die Sicherheitsregel verbietet
`feuerwehr-klein.json`, alle drei Varianten, Spiel „🫧 Schaum-Löschen":
- `material`: „1–2 Dosen Rasierschaum (Drogerie-Eigenmarke, parfümfrei, ~3 € pro Dose)"
- `safetyRule`: „Für 3–4-Jährige Sahne oder Kinderschaum statt Rasierschaum (**Default!**)"

Beide Zeilen landen auf derselben gedruckten Spielkarte. Der Gastgeber kauft das Falsche.

### S2 — Einkaufsliste kauft Wunderkerze, die sie selbst verbietet
`feuerwehr-klein.json .variants[2].shoppingList[11]`:
- `label`: „Backmischung + Zuckerguss + Schoko-Sandwich-Keks + **Wunderkerze**"
- `categoryReasoning`: „Wunderkerze KEIN Wow-Standard für 3-5 … sicherer weglassen."

Widerspruch **im selben Objekt**.

---

## Vollständige Befundliste

### Winkel 1 — Zeit
- **Z1 MAJOR** In 8/9 Varianten fällt ≥1 Spiel in die Reserve, in 5 davon das **Kern-Spiel**,
  das das Intro namentlich verspricht (klein-minimal: Intro nennt „ein Hauptspiel
  (Schaum-Löschen)" — genau das landet in „⏳ Reserve-Einsätze").
- **Z2 MAJOR** Die Schatzsuche kommt im Zeitplan überhaupt nicht vor.
- **Z3 MAJOR** Vorbereitungstexte widersprechen dem Wow-Fenster derselben Datei.
- Z4 MINOR `label` ↔ `headline` ↔ `timeWindow` in 4/9 uneins · Z5 MINOR gross-Zeiten

### Winkel 2 — Mengen
- **M1 MAJOR** Spritzpistolen für 5 Kinder, Variante hat 6 bzw. 8 (Materialzeile wird gedruckt)
- **M2 MAJOR** Spielkarte will 5 bemalbare Pappkarton-Helme für 8 Kinder; Liste kauft
  Plastik-Helme (nicht bemalbar) — und drei zu wenig
- **M3 MAJOR** „1 Lupe pro Kind" versprochen, 4 für 8 Kinder gekauft
- **M4 MAJOR** Trupp-Einteilung passt zu keiner gedruckten Kinderzahl
- M5/M6 MINOR Erste-Hilfe-Material · Pizza-Mengen

### Winkel 3 — Kosten
7/9 Listen summieren exakt (Feuerwehr ist hier besser als Piraten 0/9 und Dino 1/9).
- **K1/K2 MAJOR** klein-wow 103 vs 111 € · mittel-wow 154 vs 159 €, Spar-Tricks rechnen falsch
- **K3 MAJOR** Nebelmaschine 30 € (Einkauf) vs 45 € (Vorbereitung) — beide Blätter gedruckt
- K4 MINOR weitere Countdown↔Einkauf-Divergenzen

### Winkel 4 — Alter
- **A1 MAJOR** 3–5-Anweisungen auf gedruckten 6–8- und 9–12-Karten
- **A2 MAJOR** umgekehrt 9–12-Anweisung im 6–8-Paket
- **A3 MAJOR** Schatzsuche klein verlangt Schreiben von 3-Jährigen
- A4 MINOR minAge formal ok, Feinjustage fehlt

### Winkel 5 — Versprochen, nie geschrieben
- **V1–V5 MAJOR** Theorie-Briefing · Atemschutz-Parcours · Einsatz-Alarm ·
  doppelt gedruckte Brandermittlung · Escape-Room mit 6 Verdächtigen —
  jeweils Material gekauft und referenziert, **Anleitung existiert nicht**
- V6 MINOR 0-€-Druckvorlagen, die es nicht gibt

### Winkel 6 — Sicherheit
- **S1/S2** siehe oben (live)
- **S3 MAJOR** Sicherheits-Kasten des Kuchenblatts kann in keiner Gruppe erscheinen
- **S4 MAJOR** Kind auf selbstgebauter Trage tragen
- **S5 MAJOR** Zielspritz-Station mit dem gekauften Material physikalisch unmöglich
- S6 MINOR Sturzrisiko im vorgelesenen Text bei 3–5

### Winkel 7/8 — Stationen & Finale
- **D1 MAJOR** Die **Lösungen stehen auf der Karte, die an der Station hängt**
- **D2/F3 MAJOR** gross-S3 verspricht Code-Stücke, `hint` liefert eine einzige Ziffer
- **F4 MAJOR** Kein einziges Schatzsuche-Material steht auf irgendeiner Einkaufsliste
- D3/D4/F2 MINOR Eigenrecherche · Buzzer-Einzelverlierer · Stelligkeit mittel

### Winkel 10 — Paket ↔ Daten
- **P1 MAJOR** Zwei unvereinbare Rollensysteme im selben Dossier
- **P2 MAJOR** Erhebliche Datenmengen werden nie gedruckt (u. a. Anti-Zwang-Regel)
- P3 MINOR Urkunde ↔ Mitgebsel · P4 UNSICHER GAME_META_F ↔ Wizard-Katalog

### Winkel 11/12 — Palette & Sprache
- Gold auf Papier **3,11** (AA-Text braucht 4,5). Betrifft `.tag.gold` + Blatt-Fuß.
  **Kein Feuerwehr-Regress:** Piraten 2,61 · Dino 3,00 · Feuerwehr 3,11 — geteiltes Muster
  im Kern-CSS, Feuerwehr ist das beste der drei. Eigene Welle über alle Pakete.
- **T1** siehe oben · T2/T3/T4 MINOR Trennzeichen · Sprachfehler · Ton gegenüber Eltern

### Winkel 13 — Was einer Gruppe fehlt
- **L1 MAJOR** `mittel` spielt Schaum-Löschen **ohne die Augen-SOS-Karte**, die `klein` hat —
  obwohl dort laut safetyRule echter Rasierschaum benutzt wird, das Risiko also höher ist
- **L2 MAJOR** `mittel` lässt Kinder mit Handys „112" spielen ohne die Karte, die `gross` hat
  („NIEMALS einfach auflegen — die Leitstelle schickt sonst Einsatzkräfte")

---

## Was NICHT gilt

- `estimatedCostEur` wird **nirgends gerendert** (Kunde sieht `eliteShop()`, das `priceEur`
  selbst summiert). K1/K2 sind damit Datenhygiene, kein Geld-Defekt am Kunden.
- Seitennummern-Drift: bereits als eigenes Ticket geparkt, vom Reviewer ausgeklammert.

## Eigener Fehler dieser Runde

Der m8-Ton-Fix hat „Brandgefahr-Panik" übersehen, weil exakt auf „Brand-Panik" gegrept
wurde. **Lektion: Ton-Fixes begriffsgenau suchen, nicht stringgenau.**

## Vorgeschlagene Wellen

1. **Live-Reparatur** (unabhängig vom Paket): T1 · S1 · S2 · L1 · L2 — Havarie + Sicherheit
2. **Versprechen einlösen**: V1–V5 (fehlende Anleitungen) oder Versprechen streichen
3. **Zahlen**: M1–M4, K1–K3, Z1–Z3 (Mengen, Kosten, Scheduler-Reserve)
4. **Stationen**: D1, D2, F4 (Lösungen verstecken, Material einkaufen)
5. **Quer, alle Pakete**: Gold-Kontrast, P1 Rollensysteme

Jede Welle einzeln durchs Gate, Re-Check im **frischen** Tab.
