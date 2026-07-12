# Stufe-2-Review: 9 neue Spiele (feuerwehr/meerjungfrau/feen) — 30.06.2026

**Reviewer:** frischer claude.ai-Tab (Bolle-Device), **Opus 4.8 Hoch**, target-blind, 6 Winkel. Volltext im Chat „Neun Mini-Spiele für digitale Geburtstagseinladungen prüfen". (Auslesen ging nur via `get_page_text` — `javascript_tool`-Outputs wurden vom DLP-Filter geblockt, sobald „112"/Schlussteil drin war.)

## Stufe-3-Verdikt (gegen Code verifiziert) + Fix-Status

### Echte MAJORs
1. **Flammen über dem Kind-Foto (Feuer löschen)** — 4-Jähriger sieht das Kind anfangs „brennend". **→ GEFIXT 30.06.:** `fillFlames()` malt jetzt neutralen **Rauch/Qualm** (grau, R≈G≈B verifiziert) statt Flammen über dem Slot; Glut nur am unteren Rand; Copy „Wisch den Qualm weg". Kind = Geretteter, nie Brandquelle.
2. **112 als belohntes Spiel (Notruf)** — koppelt echten Notruf mit Jubel/Reveal → untergräbt „112 nur im echten Notfall", Fehlanruf-Risiko. **→ OFFEN (nächster Fix):** echte 112 raus → nicht-realer **Feuerwehr-Code** (z. B. Nummer am Löschfahrzeug), Mechanik behalten; zusätzlich Klarheit (pulsierendes nächstes Ziel + große Tasten statt Wählscheibe) und kürzere Win-Copy.
3. **Feuer löschen + Schatz-Rubbeln = derselbe Wisch-Reskin** (+ Fossil = 3 Wisch-Spiele). **→ OFFEN:** Schatz-Rubbeln zu eigener Mechanik umbauen (Reviewer-Idee: „auftauchen lassen" — Foto steigt aus der Tiefe, aufsteigende Luftblasen wegtippen). Eigenes Verb, kein Wischen.
4. **Drehleiter-Timing zu hart für die Jüngsten** (7° in 62°-Schwung, nur „Wackeln"-Feedback). **→ OFFEN:** Annäherungs-Glühen des Zielfensters je näher der Winkel, größere Toleranz (~15°), langsamerer Schwung, optional Snap.

### MINOR/UNSICHER (niedrig)
- Notruf-Copy zu lang für Erstleser → mit Fix #2 kürzen.
- Wunsch-Laterne = nackter Fortschrittsbalken (Reveal angeklebt) → optional Skill (Funken in die Laterne tippen).
- Korallen-Slalom L/R-Buttons → Drag wäre intuitiver für Kleine (Tap-Hälften gibt's schon).
- Tau-Netz ≈ Notruf (Ziele in Reihenfolge) → entschärft sich, wenn Notruf-Mechanik (#2) verschoben wird.

### Bestätigt gut / False-Positives (gegen Code geprüft)
- Flacker ≤3 Hz: Glühwürmchen 540 ms (~1,85 Hz), Feuer-Canvas statisch → **erledigt**.
- Korallen perle vs koralle: Emoji 🦪 vs 🪸 = formdifferenziert → **erledigt**.
- Glühwürmchen (Position+Ton) & Perlen (Symbol+Farbe) multimodal/farbfehlsicht-tauglich → **vom Reviewer gelobt**.
- Tau-Netz Pulsier-Führung „vorbildlich", „kein Verlust"-Grundsatz gelobt, meerjungfrau+feen tonal sauber.

## Erledigt 30.06. — alle 4 MAJORs gefixt + re-verifiziert (MIT+OHNE) → **9er-Welle Stufe-2-grün ✅**
1. Flammen→Rauch (Feuer löschen): Overlay-Pixel grau (R≈G≈B) verifiziert.
2. 112→nicht-realer Funkcode `5-2-9` (Notruf→Funkcode): kein „112/Notruf"-Text mehr, pulsierendes Ziel-Loch, kürzere Copy.
3. Schatz-Rubbeln→„Schatz auftauchen" (Luftblasen poppen, Schatz steigt+hellt): kein „wisch" mehr, eigene Mechanik.
4. Drehleiter entschärft: Toleranz 7°→13°, langsamerer Schwung, Annäherungs-Glühen.

**Offen (niedrige MINORs, optional):** Wunsch-Laterne Skill-Komponente, Korallen Drag-Steuerung. Kein Gate-Blocker.
