# Re-Check 6 — Block 7c nach Re-Check 5 (Partyseiten-Worker + Startseite, 08.09.2026)

Frischer Blick, Code, target-blind. Re-Check 5 fand an Block 7 ein MAJOR (og-prinzessin.png ist byte-gleich og-frozen.png — fotolose Prinzessin-Partys hätten das Frozen-Banner als WhatsApp-Vorschau bekommen) und drei MINOR (Marke in Meta/JSON-LD der Startseite nur halb gedreht; Altersseiten-Generator schrieb die alte Marke zurück — in `649c4da5` bereits geschlossen; drei Wort-Knöpfe je Kind machten die Einladungszeile dreizeilig). Block 7c schließt MAJOR und die zwei offenen MINOR. Du prüfst NUR den Diff 649c4da5..bfdd41a92587508ba4570c2a4627b38d0fe9f55b und suchst ausdrücklich nach fix-induzierten Fehlern.

## Material (Branch draft = bfdd41a92587508ba4570c2a4627b38d0fe9f55b; nichts davon ist live)
- Diff Block 7c (3 Dateien): https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/9223c790661132de08ef19a09c225dbd16b6341a/_dev/review/2026-09-08-block7c.diff
- Volle Dateien bei Bedarf: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/bfdd41a92587508ba4570c2a4627b38d0fe9f55b/party-worker.js · https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/bfdd41a92587508ba4570c2a4627b38d0fe9f55b/index.html · https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/bfdd41a92587508ba4570c2a4627b38d0fe9f55b/einladung/index.html
- Pflicht-Anhang (dort Verworfenes ist kein Finding): https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/bfdd41a92587508ba4570c2a4627b38d0fe9f55b/OFFENE-REVIEW-PUNKTE.md · https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/bfdd41a92587508ba4570c2a4627b38d0fe9f55b/_dev/OFFENE-REVIEW-PUNKTE.md

## Entscheidungen des Betreibers (kein Finding)
Markenname „mach's leicht" (gerader Apostroph, mit Leerzeichen) in Meta, Titeln und strukturierten Daten; das sichtbare Logo-Markup `mach's<span>leicht</span>` ist Gestaltung und bleibt · Partyseiten ohne Foto zeigen das Motto-Bild, wenn es ein eigenes gibt, sonst og-home.png · Kinderfoto nur später als Opt-in · Hub-Generator-Syntaxfehler (vorbestehend) ist ein Ticket außerhalb dieses Blocks · maskulines Framing.

## Was Block 7c behauptet — prüfe jedes: behoben / teilweise / nicht / neu kaputt
1. **OG_MOTTOS ohne Dubletten:** das Set enthält nur Slugs, deren Datei einen eindeutigen Inhalt hat (30 Dateien, 26 eindeutig; `default`, `home`, `frozen`, `prinzessin` fehlen). **Prüfe:** md5 der 30 og-*.png im Repo — sind genau diese vier paarweise gleich? Ist die Liste im Worker exakt die 26 eindeutigen (Set-Diff)? Fällt `prinzessin` jetzt korrekt auf og-home.png zurück (Render mit `mottoId:"prinzessin"`, ohne Foto)? Gibt es unter den 26 ein weiteres Bild, das inhaltlich nicht zu seinem Slug passt (Stichprobe OCR/Sichtung von drei)?
2. **Marke in index.html / einladung/index.html:** acht Stellen `mach'sleicht` → `mach's leicht` (og:image:alt, twitter:title, Organization-Name, vier SoftwareApplication-Namen, WebSite-Name). **Prüfe:** alle JSON-LD-Blöcke beider Seiten parsen weiter (json.loads); bleibt in beiden Dateien irgendwo `mach'sleicht` außerhalb des Logo-Markups? Ist der Diff auf genau diese Zeilen beschränkt?
3. **F7, Knöpfe:** `"\u{1F4CB} Link"` / `"✅ Kopiert!"` (2000 ms) / `"\u{1F4AC} WhatsApp"` / `"✕ Entfernen"`, davor ein Umbruch-Element `<div style="flex-basis:100%;height:0">` zwischen Rollen-Dropdown und Knöpfen. **Prüfe:** rechnet die Zeile auf 375 px jetzt zweizeilig (Name + Dropdown / drei Knöpfe)? Passen die drei Knöpfe in ~300 px nebeneinander, oder bricht „Entfernen" weiter um (Schriftgröße/Padding aus dem CSS der Seite nehmen)? Stört das Umbruch-Element das `gap`/`border-bottom` der Zeile?
4. **Kommentar BRAND:** korrigiert auf „im Worker zwei Schreibweisen, seitenweit vier" — stimmt das mit dem Vorzustand (`4de6dcba`) überein?
5. **Nichts sonst:** der Diff enthält keine weiteren Änderungen (Hunks zählen).

## Liefern
Je Punkt eine Zeile: Nr. · Status · wörtliches Zitat · wie festgestellt. Neue Fehler durch den Diff als MAJOR/MINOR mit Zitat und reproduzierbarem Weg. Score 0–100 nur als Telemetrie.
