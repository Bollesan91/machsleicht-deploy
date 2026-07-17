# M1-Pilot „Dino komplett" — Briefing Design-Gesamtpaket (Druckpaket)

**Erstellt:** 16.07.2026 · **Für:** eigene Claude-Session (kein Externer — paintCard-Kontext liegt im Repo)
**Status:** GEPARKT (Bolle 16.07. abends: „Dino machen wir später") — Autopilot (J4) zieht vor. **Fable-Review geerntet 17.07. → Abschnitt 0 unten ist jetzt PFLICHT-Input für die Bau-Session.** · **Vorgehen beschlossen:** erst 1 Motto vertikal (alle Formate), dann Format-Kontrakt, DANN Skill für die 14er-Serie. Kein Custom GPT (Layout-Code + Druck-Pipeline, keine Prosa-Aufgabe).

---

## 0. Review-Findings (Fable 5 Max, target-blind, 17.07.2026) — VOR Schritt 1 einarbeiten

**Bogen-Mathe nachgerechnet:** Namensschilder 8/A4 ✓ (Block 160×200 mm, Ränder üppig). Tischkarten 2/A4 quer ✓ (konservativ korrekt). **A6 4-auf-A4 und A5 2-auf-A4 gehen NUR randlos auf (2×148 = 296 von 297 mm)** — Heimdrucker haben ~5 mm Rand → Kanten würden abgeschnitten.

**8 MAJORs (alle vor Baustart lösbar):**
1. **Steg-/Beschnittkonzept fehlt:** Vollflächen-Gradient bis zur Schnittkante = weiße Blitzer bei ±1 mm. Regel in den Format-Kontrakt: 3–4 mm weißer Innenrahmen auf JEDER Schnittkarte, Gradient nur innen; durchgehende Schnittlinien (8 Lineal-Schnitte statt 32 Einzelkanten).
2. **A6-Falle (s. o.):** Danke-Karten auf ~100×141 mm, 2×2 zentriert mit Stegen.
3. **Tent-Fold:** obere Tischkarten-Hälfte muss 180° rotiert rendern → `rotation`-Feld ins Slot-Schema (sonst strukturell eingebauter Fehler).
4. **A5-Stationskarten ohne Bogenlogik:** festlegen — 1× A5 zentriert auf A4 mit Schnittmarken ODER 2× ~143×202 mm.
5. **Dateigröße 5–15× unterschätzt:** 12-Kinder-Szenario ≈ 28 Seiten = 56–170 MB als PNG. Fix: Hintergrund je Format EINMAL rendern → PDF-Image-XObject wiederverwenden, Personalisierung als kleines Overlay; Vollflächen als JPEG q88–92; **Ziel <20 MB bei 12 Kindern** festschreiben. → **pdf-lib** (nicht jsPDF — re-encodiert intern).
6. **Mobile-Speicher:** 28 Canvases + toDataURL = iOS-Safari-Tab-Kill. EIN wiederverwendeter Offscreen-Canvas, `toBlob` statt toDataURL, Blobs inkrementell an pdf-lib, canvas.width=0 am Ende. **Gate um echten iPhone-Erzeugungs-Test erweitern** (Bolles Desktop-Probedruck deckt das nicht).
7. **Die Einladung selbst fehlt im Paket** — wer 9,90 € zahlt, erwartet sie gedruckt (Kita-Fach). paintCard 420×746 ≈ 9:16 → als Format 0 auf A6 einpassen (~83×148 mm, 11-mm-Balken bewusst als Rahmen, effektiv ~385 dpi) — oder als begründetes Nicht-Ziel dokumentieren. Empfehlung: rein.
8. **Schritt 0 (30 min) VOR jeder Code-Zeile:** (a) Ist die Spiele-/Stationsauswahl im Planner-State wirklich persistiert? (b) Existiert ein Auth-sauberer Pfad Studio→Worker für `party.invites` (editToken darf nie in Gast-Kontexte)? Antwort entscheidet, ob die Differenzierungsformate (3+5) im Kern-Durchstich bleiben.

**Wichtige MINORs:** `await document.fonts.ready` vor jedem Offscreen-Render (sonst System-Font im Druckprodukt); Pixel-Diff der Einladung vor/nach paintFormat-Refactor ins Gate; Deckblatt mit „Tatsächliche Größe wählen"-Hinweis + 5-cm-Kontrollstrecke (Eltern drucken sonst mit „An Seite anpassen" ≈ 96 %); **Druckformate hell/weißgrundig anlegen** (Tintenverbrauch = Produkt-Risiko; löst zugleich #1 und #5); Danke-Karte personalisieren („Danke, dass du bei Mattis Dino-Party warst") + Blanko-Reservebogen; Tischkarten ans Ende der Prio, stattdessen **Wimpelkette** (Name als Girlande) für die Paketdefinition vor M4 erwägen.

**9,90-€-Verdikt:** Vergleich sind Etsy-Sets 5–15 € mit mehr Formaten, aber ohne Sofort-Personalisierung. Verteidigbare Vorteile: (a) sofortige Personalisierung aller Namen/Rollen, (b) Design = Einladung, (c) Stationskarten = tatsächlicher Spielplan — (a)+(c) hängen an MAJOR 8. Werttest des Piloten sind die Formate 2/3/5 mit ECHTEN Planner-Daten, nicht das generische Willkommensschild.

**Aufwand-Korrektur:** Kern = **2 Sessions** (nicht 1) — paintFormat muss rein datengetrieben werden + Shrink-to-fit-Textlayout je Slot (measureText, „Maximilian-Alexander" auf 80 mm). Härtetest ist Format 2, nicht Format 1.

---

## 1. Ziel & Geschäftsfrage

Aus EINEM Studio-Design entsteht ein **druckfähiges PDF-Gesamtpaket** fürs Dino-Motto. Der Pilot beantwortet vor jedem Payment-Bau (M4) die Fragen: (a) Kriegen wir Druckqualität aus der Canvas-Engine? (b) Wie viel Aufwand ist ein Format wirklich? (c) Sieht das Paket nach 9,90 € aus? **Abnahme = Bolle druckt es echt aus und legt es auf den Tisch.**

## 2. Technischer Unterbau (verifizierte Fakten, Stand 16.07.)

- **Engine:** `einladung/studio/index.html` → `paintCard(ctx, scale)` (Z. ~1837): zeichnet die Einladung in **420×746 logischen Einheiten**, skaliert via `ctx.scale` (PNG-Export nutzt 3× = 1260×2238). Aufbau: `roundedRectPath`-Clip → 3-Stop-Gradient (`themes[currentTheme].c1/c2/c3` über `gradientPoints`) → deko-Ellipsen → `paintPattern(ctx, t)` → DOM-Elemente des `card`-Nodes werden nachgezeichnet.
- **Design-Kontrakt:** `serializeDesign()`/`rebuildDesign()` mit `STYLE_KEYS`-Liste (Z. 1456 ff.) — Elemente sind `[data-key]`-Nodes (headline, invite, …) mit Inline-Styles. LocalStorage-Save `STUDIO_KEY` v2 inkl. `theme`, `layout` (classic/photo/clean), `photo`, `form`.
- **Planner-Prefill:** localStorage-Kontrakt vom Wizard (`readPlannerState()` + `plannerFingerprint` über name|date|motto.id|partyUrl). Liefert: childName, Alter, Datum/Zeit, Ort/Adresse, Motto, Party-URL (→ QR via lokalem Encoder, V6/EC-M, mathematisch verifiziert).
- **Themes:** Studio-eigene `themes`-Map (c1/c2/c3 + Pattern). Der Worker hat parallel `THEMES` per mottoId — für den Piloten zählt die Studio-Map (Dino).
- **Fonts:** Baloo 2 / DM Sans / Fraunces liegen als Variable-WOFF2 self-hosted in `_dev/fonts/` (SIL OFL). Für PDF-Druck ggf. TTF-Instanzen nachziehen — ODER (Empfehlung unten) bildbasiert arbeiten, dann entfällt Font-Embedding komplett.
- **Party-Pass-Synergie:** `party.invites` (Vorname + Rolle + Mission je Kind, ROLE_CATALOG dino: Spurenleser, Vulkanforscher, Eierwächter, …) existiert seit heute im Worker → personalisierte Namensschilder/Urkunden sind ein Datenzugriff, kein neues Feature.
- **Plan-Engine:** Der Dino-Partyplan (Stationen) existiert parametrisiert im Funnel → Stationskarten-Titel kommen von dort, nicht neu erfinden.

## 3. Formate (Reihenfolge = Priorität; 1–3 sind der Kern-Durchstich)

| # | Format | Druckmaß | Bogen-Logik | Personalisierung |
|---|--------|----------|-------------|------------------|
| 1 | Willkommensschild | A4 hoch | 1 Seite | „Willkommen zu Mattis Dino-Party!" |
| 2 | Namensschilder | 80×50 mm | **8 pro A4-Bogen** + Schnittmarken | Vorname (+ Rolle aus Party-Pass, wenn invites existieren; sonst Blanko-Linie) |
| 3 | Urkunde | A4 hoch | 1 Seite, N Kopien | „…hat die Dino-Expedition bestanden" — Namens-Slot personalisiert oder Blanko |
| 4 | Tischkarten | 105×74 mm Faltkarte | A4 quer, 2 Stück + **Falzlinie** | Vorname/Blanko |
| 5 | Stationskarten | A5 | 1 pro Station (Titel aus Plan-Engine) | — |
| 6 | Danke-Karte | A6 | 4 pro A4-Bogen | — |

Alle Formate erben das Studio-Design-Erbgut: Theme-Gradient, Pattern, Motto-Emoji, Typo-Hierarchie (Baloo-Display + DM-Sans-Text). **Kein neues Design erfinden — die Einladung ist der Stil-Master.**

### Pflicht: Kopplung an die Planer-Auswahl (Bolle-Vorgabe 16.07.)

Die Designs müssen zu den **konkret im Planer gewählten Spielen/Stationen** passen — keine generischen Motto-Karten:

- **Stationskarten** werden aus dem tatsächlich gewählten Partyplan erzeugt (Plan-Engine-Stationen der Party, nicht ein fixer Dino-Katalog). Jede Karte trägt Titel + Kurzanleitung + Story-Framing des jeweiligen Spiels (Story-Muster v2 der Spiele wiederverwenden — z. B. „Spuren lesen", „Vulkan-Sprint"), damit Druckkarte und digitales Spiel dieselbe Sprache sprechen.
- **Urkunde** nimmt Bezug auf das Erlebte: „…hat die Dino-Expedition bestanden" + optional die 2–3 Stations-/Spielnamen aus dem Plan; bei Party-Pass-Invites zusätzlich die Rolle des Kindes („als mutiger Spurenleser").
- **Datenquellen** (verifizieren, nicht raten): Planner-localStorage-State (Motto, gewählte Spiele/Plan-Variante), `party.gameId` (gewähltes Einladungsspiel), Plan-Engine-Stationsdaten, `party.invites` (Rollen). Erster Pilot-Schritt: exakt klären, WAS der Planer davon heute persistiert — fehlt die Spiele-/Stationsauswahl im gespeicherten State, ist DAS die erste kleine Vorarbeit (Kontrakt erweitern), bevor Stationskarten gebaut werden.
- Konsequenz für den Format-Kontrakt (Abschnitt 5): Stationskarten sind **datengetrieben** (N Karten aus Plan-Array), nicht statisch — der Kontrakt braucht ein `source: plan.stations`-Feld.

## 4. Druck-/PDF-Pipeline (Empfehlung)

**Bildbasiert:** je Seite ein Offscreen-Canvas in **300 DPI** (A4 = 2480×3508 px), gerendert mit einer verallgemeinerten `paintCard`-Ableitung (`paintFormat(ctx, formatSpec, themeTokens, data)`), dann PNG → PDF-Seite via **selbst-gehosteter** Mini-PDF-Lib (pdf-lib oder jsPDF, MIT/Apache; im Repo bundeln — CDN-Verbot wie bei den Fonts). Warum bildbasiert: 100 % WYSIWYG-treu zur Canvas-Engine, kein Font-Embedding, keine Umlaut-Fallen. Kosten: Dateigröße (~5–10 MB fürs Paket) — für einen Download akzeptabel. Vektor-PDF ist bewusst NICHT Pilot-Scope.
Wichtig fürs Drucken: 3 mm Beschnittzugabe bei randabfallenden Formaten ODER bewusst weißer Rand (Heimdrucker!) — **Pilot-Entscheid: weißer Rand + „randlos nicht nötig"-Design**, das ist die Heimdrucker-Realität der Zielgruppe.

## 5. Format-Kontrakt (Schritt 2, aus dem Pilot destillieren)

Nach dem Durchstich ein JSON-Schema festziehen: `{format: {pageSize, perSheet, slots:[{key,type,x,y,w,h,font,align}], marks:[cut|fold]}}` + Theme-Tokens — analog zur parametrisierten Plan-Engine. Das ist die Grundlage für den Serien-Skill (Schritt 3, alle 15 Mottos, Schmiede-Muster: 1 Motto pro Welle durchs Gate).

## 6. Session-Ablauf Pilot

1. `paintFormat`-Verallgemeinerung aus `paintCard` ziehen (Gradient/Pattern/Typo als wiederverwendbare Bausteine).
2. Formate 1–3 bauen (Schild, Namensschilder-Bogen, Urkunde) → einzelne PNGs @300dpi als Zwischenabnahme.
3. PDF-Bundling (Lib ins Repo, Seiten zusammensetzen, Deckblatt mit Inhaltsliste).
4. Formate 4–6 nachziehen.
5. UI-Anschluss minimal: ein „Druckpaket (Vorschau)"-Button im Studio hinter `?dev=1`-Flag — KEIN öffentlicher Launch im Pilot.

## 7. Gate & Abnahme (Pflicht)

- Visueller Playtest: Screenshot-Serie aller Seiten (Desktop + Mobile-Erzeugung).
- **Frischer Fable-Tab-Review, target-blind** (Regel 16.07.: Re-Checks NIE im selben Chat); Winkel: Druckmaß-Mathematik nachrechnen, Schnittmarken-Positionen, Typo-Konsistenz zur Einladung, Umlaute/lange Namen (Übernahme-Grenzfälle: „Maximilian-Alexander"), leere Datenfelder.
- **Bolle: echter Probedruck** (Heimdrucker, 100 %-Skalierung prüfen!) — das ist das eigentliche Abnahmekriterium.
- 0 offene MAJORs vor Merge.

## 8. Nicht-Ziele des Piloten

Kein Payment (M4 separat), keine 14 weiteren Mottos, kein Vektor-PDF, kein öffentlicher Button, keine Kinderfotos auf Druckprodukten (Datensparsamkeit — Vorname reicht, Strategie-Prinzip).

## 9. Aufwand & Lebensdauer

Kern (Schritte 1–3): ~1 Session inkl. Gate. Rest (4–6 + PDF-Polish): ~1 weitere. Dieses Handoff löschen, sobald der Pilot in SESSION-NOTES/BACKLOG kondensiert ist (Anti-Akkumulation).
