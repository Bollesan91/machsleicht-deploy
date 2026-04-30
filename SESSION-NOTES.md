# Session-Notiz — 30.04.2026

## Kontext der Session

Der Cut vom 29.04. (17→9 Mottos) war strategisch richtig, aber halbfertig: Lizenz-Mottos waren nur noindex-gestellt (Schrödinger-Status), 207 Pages enthielten noch „17 Mottos / 153 Spiele", Cross-Links zeigten auf nicht mehr existente Lizenz-Pages. Bolle war verunsichert, ob der Cut überhaupt richtig war, und hatte parallel einen 4-Tool-Verkettungs-Plan und ein externes Strategiedokument („machsleicht V3") im Kopf.

**Strategische Klärung in dieser Session:**
1. Cut vom 29.04. war richtig in der Richtung, falsch in der Begründung (als „Aufräumen" statt als „Funnel-Entscheid" verkauft).
2. Externes V3-Strategiedokument: 70% richtig in der Diagnose (Distribution+Fokus, North Star Partyseiten/Monat, Viral Loop), 50% richtig in der Therapie (1-Motto-Reduktion zu radikal, 14-Tage-Sprints unrealistisch, Feature-Bloat-Inkonsistenz).
3. **Funnel-Prototyp wird Feuerwehr** (nicht Piraten): bestes frisches Asset, Brandschutz-USP rankt niemand, Konkurrenz schwächer als bei Piraten.
4. **4-Tool-Verkettung wird später** (Q3 2026), erst Feuerwehr-Funnel als isolierte Strecke testen, dann Schatzsuche/Einladung als zusätzliche Eingänge in die Partyseite.

## Was heute gemacht wurde — Cut sauber abgeschlossen

- **121 Lizenz-Files gelöscht**: 8 Mottoseiten + 8×13 Altersseiten + 8 Guide-Seiten + 8 Ratgeber-für-Eltern-Pages
- **24 Wildcard-301-Redirects** in `_redirects` für alle Lizenz-URL-Patterns + 113 alte 200-Rewrites entfernt
- **Globaler Replace** `17 Mottos` → `9 Mottos`, `153 Spiele` → `81 Spiele`, `Alle 17 Mottos` → `Alle Mottos` über 95 Pages
- **Cross-Link-Sanierung** in 69 Pages: alle „Weitere Motto-Ideen"-Cards mit Lizenz-Mottos rausgepatcht (Python-Script). Drei Sonderfälle manuell gefixt: detektiv.html (Harry Potter, Ninjago), einhorn-9-12-jahre.html (Pokémon, Meerjungfrau-Zombie), kindergeburtstag.html (JSON-LD ItemList).
- **JSON-LD Hero ItemList** in kindergeburtstag.html: numberOfItems 14→9, alle 8 Lizenz-Mottos raus, Detektiv ergänzt, Schatzsuche/Dschungel + Schatzsuche/Feen ergänzt.
- **Validator Stufe 8 ergänzt**: Guard gegen veraltete Zahlen + Lizenz-Motto-Pages + Lizenz-Verlinkungen. Wenn das jemals wieder failt = Regression.
- **STRATEGIE.md Sektion 0.7** — Lizenz-Mottos-Cut als feststehendes Leitprinzip dokumentiert mit 4 Begründungen. Damit ist die Frage „war das richtig?" nicht mehr offen.
- **Validator** komplett grün, alle Stufen PASSED.

## Round 2 (Re-Check): weitere Inkonsistenzen gefixt

Beim manuellen Check fielen Stellen auf, die der erste Cut nicht abgedeckt hatte. Genau das Halb-fertig-Muster vom 29.04., das Bolle verunsichert hatte. Diesmal sauber zu Ende:

- **`ratgeber/index.html` killed**: Page verlinkte 8 Lizenz-Mottos in 2 Sektionen (Card-Grid + Quick-Guides). Da nach Lizenz-Cut leer wäre → Page gelöscht, Ordner gelöscht, 301 in `_redirects` zu `/kindergeburtstag`, Sitemap-Eintrag entfernt.
- **`spielkarten.html` EXTRA-Block**: 95-Zeilen-JS-Objekt mit Spielmechaniken für alle 8 Lizenz-Mottos (Pokéball-Werfen, Block-Stapeln, Pokemon-Escape etc.) → komplett entfernt. Motto-Grid-Selector reduziert auf 6 Voll-Mottos.
- **`kindergeburtstag-6-jahre.html`**: Decision-Cards Pokémon/Minecraft/Frozen → Detektiv/Feuerwehr/Einhorn. 4 Body-Text-Stellen neutralisiert (Pokemon-Tischdecke, Minecraft-Block-Bauen, Sammelkarten-Station, Pokemon-Quiz-Beispiele).
- **`kindergeburtstag-7-jahre.html`**: Komplette Sektion „Mottos für 7-Jährige" mit 4 Decision-Cards (Minecraft, Spider-Man, Harry Potter, Super Mario) + 4 Detail-Absätzen ersetzt durch Detektiv/Feuerwehr/Weltraum/Safari mit echten Spielmechaniken statt Lizenz-Inhalten. Quiz-Beispiel-Fragen, Deko-Hack neutralisiert.
- **`kindergeburtstag-5-jahre.html`**: Paw-Patrol-Decision-Card → Safari, Tischdecken-Beispiel neutralisiert.
- **`kindergeburtstag.html` FAQ-Schema**: 3 Stellen (Schema.org JSON-LD + sichtbare FAQ-Details) erwähnten alle 7 Lizenz-Mottos als „beliebteste Mottos 2026" — das wäre direkt von Google indexiert worden. Ersetzt durch die 7 Voll-Mottos mit Altersangaben.
- **`js/index.js` (compiled React Homepage)**: Ratgeber-Block (1.050 Zeichen mit „Pokémon, Minecraft, Ninjago — was ist das eigentlich?") komplett entfernt + Footer-Ratgeber-Link weg + Trust-Badge „Von Piraten bis Frozen" → „Von Piraten bis Detektiv".
- **`js/kindergeburtstag-data.js` (tote Datei) gelöscht**: 2.409 Zeilen, wurde nirgends importiert. Build-Output `js/kindergeburtstag.js` ist die einzige genutzte Datei. Build neu ausgeführt nach Source-Änderung.
- **`party-worker.js`**: Zwei Lizenz-Farb-Mappings (MOTTO_COLORS und embedded MC) enthielten alle Lizenz-Mottos + 5 Zombie-Mottos (Meerjungfrau, Ritter, Zirkus, Baustelle) → reduziert auf 9 Voll-Mottos + Halloween. THEMES analog.
- **`einhorn-9-12-jahre.html`**: 2 redaktionelle Lizenz-Vergleiche entfernt („Fantasy-Welten wie Harry Potter, Percy Jackson", „spielen Minecraft und Roblox"). Rechtlich nominative Markennutzung wäre zulässig, aber strategisch konsistent: ganz raus.
- **Validator Stufe 8 erweitert**: Vierter Sub-Check „Keine Lizenz-Markennamen im Body-Text mehr". Verhindert, dass Texte mit Lizenz-Marken künftig wieder reinrutschen.

**Final-Status:** Alle 4 Sub-Checks in Stufe 8 grün. Validator PASSED ohne Warnungen. **Diff Round 1+2 zusammen:** ~242 Files, ca. -45.500 Zeilen netto.

## Was als nächstes ansteht

**Nicht jetzt strategisch nachdenken.** STRATEGIE.md ist aktualisiert, Cut ist abgeschlossen, alle Inkonsistenzen weg. Nächste Sessions:

1. **Funnel-Prototyp Feuerwehr** (4 Wochen): Page → Planer → Partyseite → RSVP als isolierte Strecke. Tracking („Partyseite erstellt") muss zuerst live.
2. **Safari-Cluster** ergänzen (3-5, 9-12 fehlen) — kann parallel laufen, braucht aber niedrigere Prio als Feuerwehr-Funnel.
3. **Migadu-Entscheidung 08.05.**: Mini $90/J vs. Micro $19/J.
4. **Vier-Tool-Verkettung** als Architektur-Entscheidung steht, aber Umsetzung erst nach Feuerwehr-Funnel-Validierung. Partyseite als Knotenpunkt designen.

## Capacity-Update

Bolle investiert deutlich mehr als 10h/Woche in machsleicht. machsruhig bleibt Hauptprojekt, machsleicht aber kein Nebenprojekt mehr — beide priorisiert. Strategie-Beratung soll nicht mehr mit „nur 6-8h" rechnen.

## Offene Fragen / Risiken

- **Cross-Link-Hygiene auf 2 Mottos:** Die meisten Pages haben jetzt nur noch 2 statt 4 Cross-Links unten („Weitere Motto-Ideen"). UX-Defekt, sollte irgendwann durch ein Auto-Generation-Script ersetzt werden, das aus den 9 verbleibenden Mottos auswählt. **Nicht jetzt** — funktional ok.
- **OG-Bilder Feuerwehr fehlen** (`og-feuerwehr-3/6/9.png`) — bleibt offen.
- **P1-15 Newsletter-DOI Smoke-Test** durch Bolle — bleibt offen.
- **P1-17 DSGVO-Partyseite A+C, P1-12 Einschulung-SEO 31.05.** — bleibt offen.
- **Backdoor Tracker** (~07.04 angefangen) — Status weiter unklar, niemand hat ihn wiedergefunden.
