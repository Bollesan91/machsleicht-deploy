# Re-Check 4 — Block 6 nach dem Live-Re-Check (Kindergeburtstags-Planer + Partyseiten-Worker, 07.09.2026)

Frischer Blick, Code, target-blind. Nach dem Deploy vom Abend lief ein Live-Re-Check des Funnels (Klick-Durchlauf, Worker-API Ende-zu-Ende, Content-Greps). Ergebnis: der Funnel hält; sechs kleine Befunde, davon fünf im Worker, einer im Planer. Block 6 soll sie schließen. Du prüfst NUR den Diff 4f250852..d95c997955612bf8ecf32ed5811f4ffde73c5d68 und suchst ausdrücklich nach fix-induzierten Fehlern — der Worker ist ein Cloudflare Worker, die Partyseite entsteht aus Template-Literalen mit `${…}`-Interpolation, jeder Tippfehler dort ist ein Totalausfall der Seite.

## Material (Branch draft = d95c997955612bf8ecf32ed5811f4ffde73c5d68; nichts davon ist live)
- Diff Block 6 (klein): https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/db0937a6fd09318d738c4e560c772b03c834750b/_dev/review/2026-09-07-block6.diff — party-worker.js, kindergeburtstag.html
- Volle Dateien bei Bedarf (groß): https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/d95c997955612bf8ecf32ed5811f4ffde73c5d68/party-worker.js · https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/d95c997955612bf8ecf32ed5811f4ffde73c5d68/kindergeburtstag.html
- Pflicht-Anhang (dort Verworfenes ist kein Finding): https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/d95c997955612bf8ecf32ed5811f4ffde73c5d68/OFFENE-REVIEW-PUNKTE.md · https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/d95c997955612bf8ecf32ed5811f4ffde73c5d68/_dev/OFFENE-REVIEW-PUNKTE.md

## Entscheidungen des Betreibers (kein Finding)
Gerader Apostroph überall (auch in Seitentiteln) · `og:site_name` bleibt ohne Leerzeichen („mach'sleicht", steht so auch auf der Startseite) · Meta-Description ≤ 160 Zeichen · unbekannte API-Pfade antworten JSON, unbekannte Seitenpfade HTML · Magic-Link trägt Eckdaten, nicht Plan-Zeilen · maskulines Framing.

## Was Block 6 behauptet — prüfe jedes: behoben / teilweise / nicht / neu kaputt
1. **F1, RSVP-Knopf:** im Erfolgspfad der Gäste-Zusage setzt `btn.textContent="✅ Gesendet!"` direkt nach dem Lesen der Antwort; der Knopf bleibt disabled. **Prüfe:** liegt die Zeile im selben Funktions-Scope wie `var btn` (Z. ~2558)? Ist der Escape im Template korrekt doppelt (`\\u2705` in der Quelle → `✅` im ausgelieferten Skript, wie `\\u23F3` daneben)? Was passiert im 409-Zweig und im catch (Knopf zurück auf „Absenden"?)?
2. **F2, Apostroph:** 7× `mach’s` → `mach's` (baseHead-Titel für Erstell-Seite, Party-Titel, `<title>`, `og:site_name`, „Nicht gefunden", DOI-Bestätigung ×2). **Prüfe:** steht jede Stelle in einem Kontext, in dem ein gerades `'` sicher ist (doppelt gequoteter String, Template-Literal, Attribut in doppelten Anführungszeichen)? Gibt es weitere `’` oder `’` im Worker, die Titel/Marke betreffen?
3. **F4, Foto-Fetch:** `loadPhoto()` (Gastseite) und die IIFE der Editor-Ansicht brechen sofort ab, wenn `${party.hasPhoto?"true":"false"}` false rendert. **Prüfe:** ist `party` an beiden Stellen die interpolierte Template-Variable (Funktion `partyPage(party, …)` ab Z. ~1983)? Wird `hasPhoto` bei Anlegen/Ändern/Löschen des Fotos konsistent gepflegt (Z. ~515, ~672–673)? Gibt es einen Pfad, auf dem ein vorhandenes Foto jetzt nicht mehr geladen wird (z. B. Altbestand ohne `hasPhoto`-Feld)?
4. **F5, 404:** der Fallthrough am Ende des Routers liefert für `/api/…` `json({error:"Nicht gefunden"},404,request)` und sonst `notFoundPage()` als HTML 404. **Prüfe:** sind `path`, `request`, `json`, `notFoundPage` dort im Scope? Gibt es Routen, die vorher absichtlich auf den Plain-404 fielen (z. B. HEAD/OPTIONS, statische Dateien, `/fonts/…`, Bots), für die HTML jetzt falsch ist? Setzt die HTML-404 die richtigen Header (Content-Type, keine Cache-Falle)?
5. **F6, Meta-Description:** „kompletter " gestrichen → 152 Zeichen. **Prüfe:** Aussage weiter wahr und vollständig; og:/twitter:description unverändert und konsistent.
6. **Nichts sonst:** der Diff enthält keine weiteren Änderungen (zähle die Hunks).

## Liefern
Je Punkt eine Zeile: Nr. · Status · wörtliches Zitat · wie festgestellt. Neue Fehler durch den Diff als MAJOR/MINOR mit Zitat und reproduzierbarem Weg. Score 0–100 nur als Telemetrie.
