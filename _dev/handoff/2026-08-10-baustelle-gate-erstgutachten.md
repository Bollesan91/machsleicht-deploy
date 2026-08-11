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

0. **K6 FINAL ENTSCHIEDEN + UMGESETZT (Bolle 10.08. spät, 9e86e8c5):** „Schatzsuche kommt —
   wenn überhaupt — später." Die Mission ist im Paket GENERELL zurückgestellt:
   MISSION_IM_PAKET=false in paket-core.js → kein Stationsblatt, kein Schatz-Material,
   für ALLE Mottos; Content bleibt in data/schatzsuche.json; ?s=N (gedruckte QR-Codes
   verkaufter Pakete) funktioniert weiter; Cache-Bust v=20260810. Damit sind M3, M9,
   M13, M14, M17-Stationsteil und die Stations-Hälfte von M18/M19 STRUKTURELL GELÖST.
   Rückkehr später als Plan-Option (BirthdayProject modules.treasure + Timeline-Slot).
   Browser-Smoke: Ritter 20 Seiten, 0 Fehler, ?s=1 rendert.
1. **✅ Krimi-Kanon-Welle ERLEDIGT (11.08., db3c1dcd):** M20 step3 als Ermittlungs-Auftrag
   mit erhaltenem Red-Herring (druckt keine falsche Zuordnung mehr als Fakt), Auflösungs-
   Klammer präzisiert (Schuhgröße 44 + Maurer-Werkzeug + Handschrift), alibiBlock() im
   Template rendert alibiTabelle generisch (Verdächtige/Spuren/Auflösung als Gastgeber-
   Material), Shop-Labels standard/wow auf 4+3 (Preise 25/35 unangetastet), SOS „statt 6"
   ersetzt. Linter 0 FAIL, Smoke gross-Demo 12/12, Ritter-Gegenprobe ohne Block.
   Rest-Schuld: _bundle.js trägt alte Strings (nicht live, → U1-Regenerierungs-Ticket).
2. **✅ Sicherheits-Welle STRUKTURELL GELÖST (11.08. verifiziert):** „50 Schrauben/Muttern/
   Nägel" (M11) und „Heißklebepistole" (M12) existieren AUSSCHLIESSLICH in
   data/schatzsuche.json (Grep über alle 3 Varianten + kindergeburtstag/ = 0 Treffer) —
   seit MISSION_IM_PAKET=false wird davon nichts mehr gedruckt. Rest-Schuld im dormanten
   Content vermerkt: VOR jeder Schatzsuche-Reaktivierung M11/M12 dort fixen.
3. **✅ Zeit-Welle ERLEDIGT (11.08., fcfa672f):** kern-Freihaltung in buildTimeline()
   (kern:true wie Essen+Finale freigehalten; Flags Sabotage gross ×3, Schrauben-Schatzsuche
   klein+mittel ×3; Simulation 9/9 Ausprägungen: Kern-Spiele im Plan), M4 Pizza relativ,
   Cache-Bust v=20260811. Löst die Feuerwehr-Z1-KLASSE — Feuerwehr braucht nur noch kern-Flags.
4. **✅ Mengen/Versprechen-Welle ERLEDIGT (11.08., 6be2f1c5 + b7dd521d):** M15 abVariante-
   Datenfeld + Template-Filter (4/6/8 Rollen, Autor-Prosa weg), M16 materialNote-Widersprüche,
   M17 Regen-SOS je Gruppe, M8 Quiz-Dedupe, M5 je-Kind-Material. M7 durch alibiBlock gelöst,
   M9 strukturell (K6). **Offen bleibt allein M6** (kostenKontext-Skalierung = Kern-Ticket
   alle Mottos; dort auch intro/timeWindow-Musterzahlen).
5. **Story-Welle:** M13 strukturell gelöst (Stationskarten werden nicht mehr gedruckt).
6. **NÄCHSTER SCHRITT — Stufe-2-Re-Check (vorbereitet, noch nicht gestartet, Bolle-Cut 11.08.):**
   Prompt `_dev/review/2026-08-11-baustelle-recheck-prompt.md` ({SHA} einsetzen) +
   Patch `2026-08-11-baustelle-wellen.patch`. Frischer Tab, Opus 5 Max, target-blind.
Jede Welle einzeln durchs Gate, Re-Check im frischen Tab. Lektionen von heute anwenden:
begriffsgenaue Sweeps, Live-Seiten (kindergeburtstag/baustelle-*-jahre.html!) IMMER mitziehen,
Bundle nur per Abschnitts-Marker, Positions-Logik bei geteilten Strings.

## Quer-Tickets aus diesem Gutachten
- Scheduler-Prioritäts-Flag (Kern-Spiel/Zeremonie nie in Reserve) = gemeinsames Ticket mit Feuerwehr-Z1.
- kostenKontext()-Skalierung = Kern-Ticket (alle Mottos).
- wachName()-Hash-Kollision bei Danke-Karten (12 Beinamen) = Kern-Ticket.
- Sicherheits-Quer-Sweep-Idee: Kugel-/Perlen-Grenzen (≥4 cm) anderer Mottos gegen Fachstandard prüfen.
- M13-Klasse (Stationstexte = Organisator-Prosa) bei weiteren Mottos prüfen (ritter? pferde?).
