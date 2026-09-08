# Re-Check 8 — Block 7g (Partyseiten-Worker + Startseiten-React, 08.09.2026)

Frischer Blick, Code, target-blind. Re-Check 7 fand an den Blöcken 7d–7f drei MINOR; 7g schließt sie. Du prüfst NUR den Diff 883af980..2ad071d65f43cc42bb9683b76228fcdab93552d6 und suchst ausdrücklich nach fix-induzierten Fehlern. Der Worker ist ein Cloudflare Worker; die Partyseite entsteht aus Template-Literalen, deren Inhalt teils selbst JavaScript für den Browser ist. `js/index.js` ist die React-Fassung der Startseite (ohne Build-Schritt, `React.createElement`).

## Material (Branch draft = 2ad071d65f43cc42bb9683b76228fcdab93552d6; nichts davon ist live)
- Diff 7g (2 Dateien): https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/e897f439675f585b53249b01676a6297644cfef5/_dev/review/2026-09-08-block7g.diff
- Volle Dateien bei Bedarf: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/2ad071d65f43cc42bb9683b76228fcdab93552d6/party-worker.js · https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/2ad071d65f43cc42bb9683b76228fcdab93552d6/js/index.js · https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/2ad071d65f43cc42bb9683b76228fcdab93552d6/index.html
- Pflicht-Anhang (dort Verworfenes ist kein Finding): https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/2ad071d65f43cc42bb9683b76228fcdab93552d6/OFFENE-REVIEW-PUNKTE.md · https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/2ad071d65f43cc42bb9683b76228fcdab93552d6/_dev/OFFENE-REVIEW-PUNKTE.md

## Entscheidungen des Betreibers (kein Finding)
Markenname „mach's leicht" in Meta, Titeln, strukturierten Daten und in der Prosa **nur der Startseite** (beide Fassungen: SEO-Fallback und React); die übrigen ~117 Prosazeilen, 30 Breadcrumbs und 8 Titles mit „machsleicht" bleiben bewusst und sind ein Ticket · Logo-Markup `mach's<span>leicht</span>` ist Gestaltung und bleibt · die Einladungs-Knöpfe im Editor tragen Wörter statt Emoji · Lizenzmarken-Slugs in OG_MOTTOS und die Prinzessin-Dublette sind bekannte Tickets · maskulines Framing.

## Was 7g behauptet — prüfe jedes: behoben / teilweise / nicht / neu kaputt
1. **Knöpfe ohne Emoji:** `bC.textContent="Link"` / bei Erfolg `"Kopiert!"` (2000 ms, dann zurück auf `"Link"`) / `bW.textContent="WhatsApp"` / `bX.textContent="Entfernen"` mit `bX.style.color="#C62828"`. **Prüfe mit Messung, wenn du einen Browser hast** (self-hosted `fonts/dmsans.woff2`, 600/12px, Knopf-Padding 8px 6px, Rand 2px, drei Knöpfe mit 6px Lücke in einer Zeile, Kartenbreite = Viewport − 74): auf 320/345/360/375/390/412 px je Kind genau zwei Zeilen und **kein** gekappter Knopf, auch während „Kopiert!". Ist die rote Farbe von „Entfernen" erhalten (`getComputedStyle` = rgb(198, 40, 40))? Bleiben `title`-Tooltips? Wird ein Emoji-Rest übersehen, der weiter kappen kann?
2. **Kommentar-Falle:** in der Zeile von `bX` steht der Erklär-Kommentar **hinter** `bX.style.color`. **Prüfe:** ist in den geänderten Zeilen irgendwo ein `//`-Kommentar VOR einer weiteren Anweisung derselben Zeile gelandet (das würde sie stillschweigend abschalten)? Parsen alle ausgelieferten Inline-Skripte?
3. **React-Zwilling:** `js/index.js` sagt in drei Sätzen „mach's leicht" statt „machsleicht" („Die Idee hinter …", „… beantwortet das in Minuten …", „… ist und bleibt kostenlos."). **Prüfe:** Datei parst (`node --check`), die drei Stellen sind Text und keine Bezeichner/Schlüssel; die gerenderte Startseite zeigt die Marke jetzt in beiden Fassungen gleich; kein Apostroph-Problem in einem JS-String (die Datei benutzt doppelte Anführungszeichen?).
4. **OG-Kommentar:** sagt jetzt „Gegenprobe: Paar OG_MOTTOS ↔ og-*.png ohne home/default mit benannten Ausnahmen in Stufe 65 (check-freischaltlisten.py, Prüfstand 08.09.2026)". **Prüfe:** existiert dieses Paar an diesem Stand? Wenn nicht: ist der Satz als Vorhaben lesbar oder behauptet er wieder einen Zustand?
5. **Nichts sonst:** der Diff enthält keine weiteren Änderungen (Hunks zählen); `OG_MOTTOS` unverändert 27 Einträge.

## Liefern
Je Punkt eine Zeile: Nr. · Status · wörtliches Zitat · wie festgestellt. Neue Fehler durch den Diff als MAJOR/MINOR mit Zitat und reproduzierbarem Weg. Score 0–100 nur als Telemetrie.
