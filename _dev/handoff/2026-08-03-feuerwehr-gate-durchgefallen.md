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

---

# STAND 04.08.2026 — Fix-Wellen 1 bis 2c

Alles auf `draft`, **nichts auf `main`**. Kette:
`d24c480` → `94d482d` → `858f4e7` → `28c8fea` → `b19e29e` → `72fbaa2`

| Welle | Commit | Inhalt | Re-Check |
|---|---|---|---|
| 1 | `94d482d` | T1 Havarie (22 Ersetzungen), S1, S2, L1, L2 | **62/100** — S1 halb, L1 zu kurz, L2 ins Leere |
| 1b | `858f4e7` | S1 wirklich geschlossen, Spüldauer ≥10 Min, `fallback` druckt | offen |
| 2a | `28c8fea` | V2 Atemschutz + echte Variantenleiter gross | offen |
| 2b | `b19e29e` | V1 Theorie-Briefing geschrieben, V4 Dublette raus | offen |
| 2c | `72fbaa2` | V5 6 Verdächtige / 6 Phasen in wow | offen |

**Der Re-Check zu 1b–2c steht noch aus.** Er muss über den Diff
`94d482d...72fbaa2` laufen, im frischen Tab, Opus 5 (Fable 5 leer bis 06.08.,
Opus-Wochenlimit stand zuletzt bei 75 %).

## Was in diesen Wellen strukturell gefunden wurde

1. **`sosScenarios[].fallback` wurde von keinem Paket gerendert** — die
   Eskalationszeile jeder SOS-Karte („Augenarzt", „Eltern entscheiden") war
   unsichtbar. Betrifft alle Mottos. In 1b behoben (`.sosfb`, CSS im Kern).
2. **Es gab in gross keine Variantenleiter** — alle drei Varianten trugen
   dieselbe 4er-Rotation, während die Intros drei Umfänge versprachen und
   Augenbinden für 8 € ungenutzt herumlagen. In 2a behoben (3/4/5 Stationen).
3. **Das Theorie-Briefing war load-bearing und existierte nicht** — die
   Brandermittlung sagt in `whyItWorks` „Die Lösung knüpft ans Theorie-Briefing
   an". In 2b geschrieben, die Fettbrand-Pointe verbindet jetzt Anfang und Ende.

## Eigene Fehler dieser Sitzung (für LEKTIONEN.md)

- **m8-Ton-Fix suchte stringgenau statt begriffsgenau** — „Brand-Panik" gefunden,
  „Brandgefahr-Panik" übersehen.
- **S1 nur an einer Stelle gefixt** — `material` umgestellt, `prepText` und
  Einkaufsliste stehen gelassen. Widerspruch verschoben statt behoben.
- **Ersetzung über beide Dateien laufen lassen** — `mittel` mitverändert, wo
  Rasierschaum für 6-8 bewusst gewollt ist. Zurückgedreht.
- **Fix-Skript schrieb `g['steps']` nie zurück** — halb angewandter Stand auf
  der Platte, per `git checkout` gerettet.
- **Smoke ohne `?fresh=N`** — Falsch-Negativ „0 fallback-Zeilen". HTML cacht.
- **Zweimal ASCII statt Umlaut/ß** selbst geschrieben („laenger", „grosse").

## Offen, in Reihenfolge

1. **Re-Check 1b–2c** (frischer Tab, Diff `94d482d...72fbaa2`)
2. **V3 Einsatz-Alarm** — 20 Nennungen in mittel, kein Spiel
3. **Z1** — Bewertete Zeremonie fällt in minimal/standard in die Reserve.
   Das ist der emotionale Abschluss; er darf dort nie landen. Braucht eine
   Änderung in der Scheduler-Reihenfolge, nicht in den Dauern.
4. **Strukturbefund mittel==klein** — `feuerwehr-mittel` trägt fünf der sechs
   `klein`-Spiele im Original. Das ist A1 auf struktureller Ebene und muss VOR
   der Zahlen-Welle entschieden werden (eigene Spiele schreiben oder Alters-
   Anpassung sauber ziehen).
5. **Zahlen-Welle** M1–M4, K1–K3 · **Stationen** D1, D2, F4
6. **Paketübergreifend**: Gold-Kontrast (Piraten 2,61 · Dino 3,00 ·
   Feuerwehr 3,11 — alle unter AA 4,5 für Kleintext), P1 zwei Rollensysteme

---

# STAND 10.08.2026 abends — Re-Check 1b-2c geerntet (58/100) + Schub A gefixt

**Re-Check** (frischer Tab, Opus 5 Max, Chat 8f1694a9, SHA 69405b03): **58/100, 7 MAJOR / 8 MINOR.**
Kernbefund: Wellen 1b-2c reparierten die games-Objekte, ließen aber die Satellitenfelder
(preparationWeeks, sosScenarios, parentTips, decoration, shoppingList-reasonings) auf der
alten Welt — „verschoben statt geschlossen" eine Ebene höher. fallback-Render „mustergültig"
(33/33 Szenarien), Theorie-Briefing „bestes Stück Text im Paket" (Fettbrand quellen-bestätigt).

**Schub A ERLEDIGT** (`23f0fe39` + `1692469e`, Linter 0 FAIL):
- M1: Rasierschaum-Kaufauftrag aus klein-Countdown/SOS/Sensorik getilgt (5-Jährigen-Ausnahme bleibt als Regel)
- M2: whyItWorks klein neu (Sprühsahne-Default, „erst direkt vorm Spiel aufsprühen"); mittel nur Sprachfix
- M7 komplett: ALLE „5 Min"-Spüldauern → „mindestens 10 Minuten" (DGUV) + Spülrichtung innen→außen
  (data + elite + bundle, Null-Kontrolle über alle 7 Träger)
- Bundle-Falle dokumentiert: gleicher String in klein- UND mittel-Sektionen — Ersetzungen im
  Bundle IMMER per Abschnitts-Marker trennen (Eigenfang dieser Runde, repariert)

**Schub B OFFEN** (exakte Pfade aus dem Gutachten):
- M3 gross: preparationWeeks (dayOf.items[0], minus1Day.items[2], minus1Week.items[3]) +
  sosScenarios.regen.steps[1] + ein_kind_weint.steps[2] variantenneutral formulieren
  (kennen die 3/4/5-Leiter nicht; Erste-Hilfe nur wow, Atemschutz fehlt minimal)
- M4 gross wow: UV-Track verwaist (shoppingList[7] UV-Lampe 10 €, decoration, minus2Days.items[4]
  alte Phasen-Nummern, minus1Day.items[4] UV-Stifte ohne Einkauf, dayOf.items[1], SOS spielzeug.steps[2])
  → EMPFEHLUNG: UV in Phase 3 (Spurensicherung) INTEGRIEREN statt tilgen (Wow-Versprechen + gekaufter Artikel)
- M5 gross wow: Phase-4-Alibis ohne material/prepText (6 Alibi-Karten-Vorlage nötig, 4 halten/2 nicht, Köchin bleibt)
- M6: Standard-Brandermittlung == minimal, verkauft aber „Vernehmung" (intro + minus4Weeks.items[3])
  → Vernehmungs-Schritt ergänzen (2 Erwachsene als Verdächtige)
- MINORs: Merksätze 4↔5 (prepText/whyItWorks vs steps[5]), duration 12→10 (Briefing),
  Brandklassen-Verweis mittel .variants[1].games[4].steps[4] (Briefing lehrt keine Brandklassen),
  TOTE ageAdjust6/8-Keys in gross (Template druckt nur Staffeln im Altersband 9-12! Keys prüfen/umziehen),
  Seil-Satz wow games[3].steps[4], Artikel „ist die Crew Ermittler-Team", Verb-Satz Briefing steps[2],
  categoryReasoning-Redaktionsvokabular (UV-Zeile inzwischen falsch)
- Danach: Re-Check Schub A+B im FRISCHEN Tab (Opus 5 Max), dann Wellen 3-5 laut Plan oben
  (V3 Einsatz-Alarm = zugleich Antwort auf mittel==klein-Differenzierung — nur noch 1 Spiel identisch,
  „Mini-Einsatz: Tiere retten", Rest bereits altersdifferenziert; Analyse 10.08.)
