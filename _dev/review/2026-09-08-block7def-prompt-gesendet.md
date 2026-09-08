# Re-Check 7 — Blöcke 7d, 7e, 7f (Partyseiten-Worker + Startseite, 08.09.2026)

Frischer Blick, Code, target-blind. Nach Re-Check 6 (Block 7c) blieben drei kleine Nachzügler; sie sind als 7d/7e/7f umgesetzt. Du prüfst NUR den Diff 9223c790..48ecc3ec1358103ebdfee98c162ab283b30885a3 und suchst ausdrücklich nach fix-induzierten Fehlern. Der Worker ist ein Cloudflare Worker; die Partyseite entsteht aus Template-Literalen mit `${…}`-Interpolation, deren Inhalt teils selbst JavaScript für den Browser ist.

## Material (Branch draft = 48ecc3ec1358103ebdfee98c162ab283b30885a3; nichts davon ist live)
- Diff 7d+7e+7f: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/883af980895ed53f2adfd3aaadf8020d4fd6f31a/_dev/review/2026-09-08-block7def.diff
- Volle Dateien bei Bedarf: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/48ecc3ec1358103ebdfee98c162ab283b30885a3/party-worker.js · https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/48ecc3ec1358103ebdfee98c162ab283b30885a3/index.html
- Pflicht-Anhang (dort Verworfenes ist kein Finding): https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/48ecc3ec1358103ebdfee98c162ab283b30885a3/OFFENE-REVIEW-PUNKTE.md · https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/48ecc3ec1358103ebdfee98c162ab283b30885a3/_dev/OFFENE-REVIEW-PUNKTE.md

## Entscheidungen des Betreibers (kein Finding)
Markenname „mach's leicht" (gerader Apostroph, mit Leerzeichen) in Meta, Titeln, strukturierten Daten und jetzt auch in der sichtbaren Prosa der Startseite; das Logo-Markup `mach's<span>leicht</span>` ist Gestaltung und bleibt · Partyseiten ohne Foto zeigen das Motto-Bild, wenn es ein eigenes gibt; og-home/og-default sind Rückfallbilder, keine Mottos; `prinzessin` ist eine benannte Ausnahme (Datei ist eine Kopie des Frozen-Banners, echtes Bild ist ein Design-Ticket) · Lizenzmarken-Slugs im Set sind ein bekanntes Ticket (Sanitizer lässt sie durch, Creator ist per 302 unerreichbar) · maskulines Framing.

## Was die drei Blöcke behaupten — prüfe jedes: behoben / teilweise / nicht / neu kaputt
1. **7d, OG_MOTTOS:** Set = alle og-*.png-Slugs ohne `home`/`default` und ohne `prinzessin` = 27 Einträge, `frozen` wieder enthalten. **Prüfe:** Set-Diff gegen die Dateien im Repo (30 Dateien → 27); Render ohne Foto mit `mottoId:"frozen"` → og-frozen.png, `"prinzessin"` → og-home.png, `"piraten"` → og-piraten.png, fehlend/leer → og-home.png; Kommentar stimmt mit dem Code überein.
2. **7e, Knöpfe:** die drei Knöpfe je Kind liegen in einem eigenen Container (`flex-basis:100%;display:flex;gap:6px;min-width:0`) und tragen `display:block;text-align:center;flex:1 1 0;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:12px;padding:8px 6px`. **Prüfe (mit Messung, nicht Rechnung, wenn du Chromium hast):** auf 360/375/390/412 px genau zwei Zeilen je Kind; kein Knopf wird abgeschnitten (Ellipse darf erst unter ~330 px greifen); während „✅ Kopiert!" (2 s) verschiebt sich nichts; `cssText+=` erhält die vorher gesetzte Farbe von „Entfernen" (#C62828); das frühere Null-Höhen-Umbruchelement ist weg.
3. **7f, Prosa:** index.html `<h2>Warum mach's leicht?</h2>` (vorher ohne Apostroph). **Prüfe:** gibt es einen React-/JS-Zwilling der Startseite (`js/index.js`), der denselben Text trägt und mitziehen müsste (SEO↔React-Konsistenz)? Bleibt sonst irgendwo sichtbare Prosa mit „machsleicht" als Marke (außer Domain, Logo-Markup, E-Mail)?
4. **Kommentare:** BRAND-Kommentar („im Worker zwei Schreibweisen; seitenweit kamen Logo-Markup und die apostrophlose Form dazu") und der Zeile-2-Kommentar — belegbar am Vorzustand?
5. **Nichts sonst:** der Diff enthält keine weiteren Änderungen (Hunks zählen).

## Liefern
Je Punkt eine Zeile: Nr. · Status · wörtliches Zitat · wie festgestellt. Neue Fehler durch den Diff als MAJOR/MINOR mit Zitat und reproduzierbarem Weg. Score 0–100 nur als Telemetrie.
