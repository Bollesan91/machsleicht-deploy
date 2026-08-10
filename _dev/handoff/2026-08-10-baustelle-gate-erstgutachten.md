# Baustelle-Paket: Erstgutachten 38/100 (10.08.2026) — Fahrplan

**Gutachten:** Opus 5 Max, frischer Tab, target-blind, Chat a52523cc, SHA 979d324e.
Methode des Reviewers: buildTimeline() in Node über alle 9 Ausprägungen + jsdom-Vollrender
(je 20 Blätter, 0 Renderfehler). **Kernbefund: Die Maschine ist sauber — die DATEN beschreiben
systematisch zwei verschiedene Partys** (Satellitenfelder + schatzsuche vs. games-Arrays).
20 MAJORs / ~20 MINORs. Score-Referenz: Feuerwehr startete bei 54 und brauchte 03.–10.08.

**SOFORT ERLEDIGT (d40898c3):** M10 Verschluckregel vereinheitlicht — 15 cm + Klopapierrollen-Test
überall (Countdown, Stations-Einkauf, FAQ; vorher 10 cm/4 cm-Unterläufe der einzigen 3-5-Regel).

## Die 20 MAJORs (kondensiert, Details im Gutachten-Chat)

**ZEIT (Scheduler):** M1 klein/minimal legt 2 von 3 Spielen in Reserve (Ritual-Karte erzählt genau
diese) · M2 Sabotage-Krimi fällt in gross/standard+wow in Reserve (das Kernstück der 9-12-Fassung!)
· M3 Baustellen-Mission (43/65/115 Min) hat in KEINER Ausprägung einen Slot · M4 Countdown-Pizza
„15:25 für 15:30" vs gerechnete Essenszeit 15:40 (und hart codiert gegen variable Startzeit).
**MENGEN/KOSTEN:** M5 Materialzahlen auf eine Gruppengröße eingefroren (Spiele byte-identisch über
Varianten — 10 Kinder, 8 Zeichenbretter) · M6 kostenKontext() ersetzt Musterzahl nur im Label,
nicht in Posten/Summe („266 € für 4 Kinder", kauft 8 Helme).
**VERSPROCHEN, NIE GELIEFERT:** M7 Verdächtigen-Karten gekauft+verlangt, nie gedruckt — dabei liegt
die fertige alibiTabelle (6,4 kB, konsistent!) ungerendert in den Daten · M8 Quiz-Karten DREIFACH
beschafft (gedruckt + gekauft + selbst erstellen) · M9 Decoder-Tabelle für Stations-Finale existiert
nicht (kein Code-System, nur dessen Beschreibung).
**SICHERHEIT:** M10 ✅ erledigt · M11 mittel kauft „50 Schrauben/Muttern/Nägel" — eigene Regel:
Metall erst ab 7, Gruppe beginnt bei 6; Nägel nirgends abgesichert · M12 Heißklebepistole 9-12 ohne
safetyRule/SOS (nur abschneidbarer hint) — das gefährlichste Werkzeug, dünnste Absicherung.
**STATIONEN:** M13 Stationskarten sind Organisator-Prosa mit Vorlese-Knopf („DIN-EN-71-3 Spielsand
(Hagebau/OBI Marke prüfen)… KEIN Quarzsand!" wird 3-Jährigen vorgelesen) — der Story-Umbau, den
piraten/dino haben, fehlt baustelle in allen 15 Stationen.
**PAKET↔DATEN:** M14 zwei unvereinbare Programm-Systeme (games vs schatzsuche: 2 Brücken, 2 Quiz-
Systeme, 2 Sabotagefälle) · M15 Rollen-Zettel drucken Autor-Notizen aufs Kind („KEINE passive
Rolle", „nicht ziehbar in Minimal/Standard") · M16 materialNote widerspricht dem Paket dreifach
(Spaghetti-Brücke existiert nicht; zwei Flaschensets im selben Absatz; 12 vs 4/6/8 Karten) ·
M17 Regen-SOS nennt Spiele, die die Gruppe nicht hat (identischer Text in allen 3 Dateien).
**KRIMI:** M18 zwei sich ausschließende Fall-Fassungen auf aufeinanderfolgenden Blättern
(Spielkarte: 4 Verdächtige, Täter Frank; Stationskarte: 2 Verdächtige Rita+Theo — beide laut
alibiTabelle unschuldig!) · M19 Verdächtigen-Zahl 4/5/6/2 je nach Blatt · M20 Spielkarte Schritt 4
ordnet Spuren falsch zu (Schritt 5 + alibiTabelle haben es richtig).

## Wellen-Plan (Empfehlung, nach Feuerwehr-Muster)

0. **K6 ENTSCHIEDEN (Bolle 10.08., Doktrin „Paket kommt aus dem Plan"):**
   **Die Mission wird eine PLAN-OPTION.** Steht die Schatzsuche/Mission im Plan der Familie,
   rechnet buildTimeline ihre Gesamtdauer als Slot ein UND das Stationsblatt wird gedruckt;
   steht sie NICHT im Plan, wird weder Blatt noch Material gedruckt. Nie wieder Druck ohne
   Zeitslot. Implementierung = KERN-Welle (betrifft alle Mottos, löst M1-M3 strukturell und
   ist identisch mit #75 Plan-Redundanz-Dedup): (a) Paket liest die Schatzsuche-Wahl aus dem
   Plan/PARTY-Payload, (b) shStations() + schatzMatBlock() nur bei Wahl, (c) buildTimeline
   bekommt einen Missions-Slot mit der Stations-Summendauer, (d) Doppel-Content (zweiter
   Krimi, zweite Brücke) wird in der Krimi-Kanon-Welle dedupliziert.
1. **Krimi-Kanon-Welle:** eine Fassung (4 Verdächtige, Täter Frank), alibiTabelle als Karten-Blatt
   RENDERN (Template-Arbeit, Daten liegen fertig), Schritt 4 nach alibiTabelle, Stations-Fassung
   angleichen oder (bei Option B) entfällt, Einkaufszeilen 4/5/6→4, SOS-Zeile.
2. **Sicherheits-Welle:** M11 (Metall/Nägel mittel), M12 (Heißkleber-safetyRule+SOS für gross).
3. **Zeit-Welle:** M1/M2-Scheduler (Kern-Spiele nie in Reserve — Prioritäts-Flag im Scheduler,
   gleiches Problem wie Feuerwehr-Z1!), M4 Pizza-Zeile variabel („zur Essenspause deiner Startzeit").
4. **Mengen/Versprechen-Welle:** M5 (Mengen variantenabhängig oder variantenneutral formulieren),
   M6 kostenKontext ehrlich, M7/M8/M9 (liefern oder streichen), M15/M16/M17 Satelliten.
5. **Story-Welle:** M13 Stationskarten kindgerecht umschreiben (piraten/dino als Vorbild).
Jede Welle einzeln durchs Gate, Re-Check im frischen Tab. Lektionen von heute anwenden:
begriffsgenaue Sweeps, Live-Seiten (kindergeburtstag/baustelle-*-jahre.html!) IMMER mitziehen,
Bundle nur per Abschnitts-Marker, Positions-Logik bei geteilten Strings.

## Quer-Tickets aus diesem Gutachten
- Scheduler-Prioritäts-Flag (Kern-Spiel/Zeremonie nie in Reserve) = gemeinsames Ticket mit Feuerwehr-Z1.
- kostenKontext()-Skalierung = Kern-Ticket (alle Mottos).
- wachName()-Hash-Kollision bei Danke-Karten (12 Beinamen) = Kern-Ticket.
- Sicherheits-Quer-Sweep-Idee: Kugel-/Perlen-Grenzen (≥4 cm) anderer Mottos gegen Fachstandard prüfen.
- M13-Klasse (Stationstexte = Organisator-Prosa) bei weiteren Mottos prüfen (ritter? pferde?).
