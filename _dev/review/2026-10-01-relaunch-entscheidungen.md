# Relaunch-Entscheidungen (Plan S6) — Stand 01.10.2026

Format je Zeile: `E<n>: Option — Begründung in einem Satz`. Offene Zeilen tragen „offen".

E1: heyhurra (Bolle, 01.10.2026) — Kunstwort mit Geburtstagsbezug, kein Bestandteil „machsleicht"/„leicht", 8 Zeichen, keine Ziffern; Prüfweg S7 teilweise durch Claude erledigt (Tabelle unten), DPMA/TMview/Google/Instagram = Bolle-Klick offen.
E2: offen
E3: offen
E4: offen
E5: offen
E6: offen
E7: offen
E8: offen
E9: offen
E10: offen
E11: offen
E12: offen
E13: offen
E14: offen
E15: offen
E16: offen
E17: offen
E18: offen
E19: offen (laut Plan v3 voraussichtlich „entfällt — kein Resend-Leak-Commit", Messung 01.10.: 0 Treffer scharfes Muster)
E20: offen

## S7-Prüftabelle für „heyhurra" (Claude, 01.10.2026)

| Prüfung | Ergebnis | Beleg / Kommando | Status |
|---|---|---|---|
| DENIC `heyhurra.de` | **frei** | webwhois.denic.de: „Die Domain heyhurra.de ist frei und steht zur Registrierung zur Verfügung." | geprüft |
| DNS `.com .at .ch .net .app`, `hey-hurra.de` | keine Nameserver (Hinweis auf frei, kein Registrarbeleg) | `nslookup -type=NS <domain>` je 0 NS-Antworten; Kontrolle: `hurra.de` → NS awsdns (vergeben) | geprüft |
| Bing-Exaktsuche `"heyhurra"` | 0 Ergebnisse („keine Ergebnisse") | `curl bing.com/search?q=%22heyhurra%22&cc=DE` | geprüft (Google: Bolle-Klick) |
| Pinterest-Handle `/heyhurra/` | frei („not found") | curl, Seitentext | geprüft |
| TikTok `@heyhurra` | frei („isn't available") | curl, Seitentext | geprüft |
| Instagram `@heyhurra` | nicht prüfbar ohne Login (Login-Wand) | curl | **Bolle** |
| GitHub `heyhurra` | frei (404) | curl | geprüft |
| DPMA Basisrecherche, Klassen 41 + 35, Wortbestandteile „heyhurra" und „hurra" | — | https://register.dpma.de/DPMAregister/marke/basis (Browser-Zugriff in der Claude-Sitzung verweigert) | **Bolle** |
| TMview, gleiche Suche | — | https://www.tmdn.org/tmview/ (Browser-Zugriff verweigert) | **Bolle** |
| Google-Exaktsuche `"heyhurra"` und `"hey hurra"` | — | https://www.google.de/search?q=%22heyhurra%22 (Browser-Zugriff verweigert) | **Bolle** |

Hinweis zur Markenrecherche: `hurra.de` ist vergeben, und „Hurra" ist ein gebräuchliches Wort; die Suche nach dem Bestandteil „hurra" in Klasse 41 (Unterhaltung, Veranstaltungen) ist deshalb der entscheidende Blick — nicht nur nach dem Ganzwort.

Nächster Schritt nach grüner Tabelle: S8 (Registrierung bei INWX, netcup, united-domains oder IONOS; Cloudflare Registrar kann kein `.de`), Inhaberin mit Straßenanschrift, Auto-Renew an, DNSSEC aus.

## E21 (neu, Bolle 01.10.2026): Visuelle Sprache — illustrierte Kacheln statt Emojis und Icon-SVGs

**Entscheidung:** Auf der neuen Domain keine Emojis und keine generischen SVG-Icons als Bildsprache. Motto-Kacheln, Hero, Schritte und Feature-Karten bekommen hochwertig erstellte Illustrationen. Das Mockup `2026-10-01-heyhurra-startseite-mockup.png` ist nur ein Beispiel für die Qualität und die Kachel-Logik — Claim, Logo, gezeigte Mottos und Seitenaufbau darin sind keine Vorgabe (Mottos folgen aus E8, Marke aus E2).

**Folgen für den Plan (v7, nach dem Re-Check von v6):**
- S28 (Bilder) erweitern: ein Illustrations-Set je Launch-Motto plus Hero/Schritte; Erzeugungsweg nach Bolles Entscheidung vom 30.07. (KI-generiert + kuratiert), Format PNG/WebP mit `width`/`height`, eigene Dateien (Bild-Hash-Prüfung Stufe 73 greift ohnehin).
- S29 (Startseite) und S32/S33 (Mottoseiten): Illustration statt Emoji/Icon je Motto-Kachel und je Schritt.
- Neue Linter-Stufe 77 (deterministisch): kein Emoji-Codepoint (U+1F300–U+1FAFF, U+2600–U+27BF, U+FE0F) im sichtbaren Text und in `<title>`/`og:*` der indexierbaren Seiten; keine Inline-SVG-Icon-Sets außerhalb Logo/Favicon. Prüfstand-Fall: ein Emoji in einer Allowlist-Seite → rot.

**Messung zum Geltungsbereich von E21 (Koordinator, 01.10.2026, `git show acebbc22:`, Python-Regex U+1F300–U+1FAFF, U+2600–U+27BF):** Der übernommene Werkzeug-Code trägt heute Emojis als Bedienelemente — `kindergeburtstag.html` 496 Codepoints in 259 Zeilen und 2 `<svg>` (u. a. Ort-Buttons „🏠 Zuhause / 🛋️ Drinnen / 🌳 Park / 🏟️ Halle", „💾 Später", CSS `content:'✓'`), `js/motto-data.js` 6 `emoji:`-Felder (die Motto-Kachel des Planers), 60 Spiel-Shells 1.289 Codepoints + 109 `<svg>`, `party-worker.js` 89 + 2 `<svg>`, Paket-Shells je ~64 + 3 `<svg>`, `data/motto/*.json` 6.127 Codepoints in 45/45 Dateien (Laufzeittext des Plans). Stufe 77, wie in Plan v7 definiert (Seiten-Dokumente der L + 2 indexierbaren Seiten), wäre auf `/planen/` rot, sobald S30 den Werkzeug-Code übernimmt — ohne geplante Stunden. **E21a (Bolle, 01.10.2026, entschieden): Geltungsbereich = indexierbare Seiten + Bedienoberfläche des Planers (Werkzeug-Code in S30, `js/motto-data.js`, CSS-`content`). Spiele, Partyseite, Paket und JSON-Laufzeittexte bleiben zunächst und werden Motto für Motto in Phase 6 bereinigt (S57). Aufwand vor Livegang grob 6–10 h extra; keine Woche über 30 h mit Reserve.**

**E21b (Setzung des Koordinators, 01.10.2026 — von Bolle zu bestätigen oder zu ändern):** (1) Die 6 Spiel-Karten im Planer (`js/motto-data.js`, kuratierte Piraten-Spiele mit `emoji:`-Feld) werden text-only; Spiel-Illustrationen kommen mit der Spiele-Bereinigung in Phase 6. (2) Die Launch-Mottos Ritter und Piraten (Spiele, Paket, Motto-JSON) werden in Zyklus 1 von Phase 6 zusätzlich bereinigt (+6 h Claude); Alternative: eigener „Zyklus 0" vor Dino. (3) Stufe 77 erkennt Emojis deterministisch über die ausgeschriebene Bereichsliste aus S24 (U+1F000–U+1F2FF, U+1F300–U+1FAFF, U+2600–U+27BF, U+2B50, U+2B55, U+231A–231B, U+2328, U+23CF, U+23E9–23FA, U+25AA–25AB, U+25B6, U+25C0, U+25FB–25FE, U+2194–21AA, U+2934–2935, U+2B05–2B07, U+2B1B–2B1C, U+2139, U+203C, U+2049, U+2122, U+24C2, U+3030, U+303D, U+3297, U+3299, dazu U+FE0F und Keycap U+20E3) — die Liste deckt Extended_Pictographic (Unicode 15) bis auf © und ® (Impressum/Datenschutz), U+2388 und den reservierten Block U+1FC00–U+1FFFD ab und ist innerhalb ihrer Blöcke eine Obermenge; kein Python-Zusatzmodul. Die alte Erkennung nur über U+1F300–U+1FAFF/U+2600–U+27BF ließ im Planer 16 Zeichen durch (⭐ ▶ ⏱ ⏰ ⏳ ℹ). (Nachgezogen 01.10.2026 abends nach Fixliste v9 → v10, P7/P8.)
