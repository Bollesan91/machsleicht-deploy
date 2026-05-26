# Welle 36 — weltraum-3-5 Light → Elite (Writer-Brief)

**Ziel:** Eine vollständige Elite-SEO-Page `kindergeburtstag/weltraum-3-5-jahre.html` schreiben — analog der bestehenden Elite-Pages, getrieben durch die existierende Phase-B-JSON.

## Schreibvertrag

- **Zielgruppe:** Eltern, die für ein 3–5-jähriges Kind einen Weltraum-Kindergeburtstag planen
- **Tonfall:** ruhig, pragmatisch, mit YMYL-Sorgfalt (Astronaut-Helm aus Pappe — keine Erstickungsgefahr; Wasser-Rakete-Spiele draußen; Knicklicht-Schluck-Risiko bei 3-jährigen)
- **KEIN Marketing-Gewäsch.** Konkrete Zahlen, konkrete Materialien, konkrete Minutenangaben
- **KEINE erfundenen Fakten** — jede inhaltliche Aussage muss in der JSON belegt sein
- **Anti-IP-Sanitisierung — strikt 0 Treffer für:** "Star Wars", "Star Trek", "Mandalorian", "Buzz Lightyear", "Toy Story", "NASA" als Markenname (allgemein "Astronaut" / "Raumfahrt" / "ESA-konformer Kontext" sind OK), "LEGO Space", "Among Us", "Stranger Things", Disney/Pixar generell. Generische Weltraum-Begriffe (Astronaut, Raumschiff, Rakete, Planet, Galaxie, Komet, Mond, Mars, Asteroid, Schwerelosigkeit, Sternwarte) sind alle frei.

## ⚠️ JSON-Encoding-Check (PFLICHT vor Übertrag)

Per früheren Welle-32-Sanitisierungs-Audits können in der JSON sanitisierte Strings stehen wie:
- "Schoko-Sandwich-Keks" (saubere Oreo-Ersatzform — bleibt so)
- ASCII-Umlaut-Reste ("3-Jaehrige", "ae/oe/ue") → in HTML zu echten Umlauten
- "Bee-Bot" sollte sanitisiert sein — falls als "Bee-Bot" noch drin: durch "Lern-Roboter" oder "Spielzeug-Rover" ersetzen
- Eventuelle Find/Replace-Artefakte (kaputte Sätze, halbe Wörter): durch sinnvolle Begriffe ersetzen

Falls weitere Encoding-Artefakte beim Lesen der JSON auffallen: durch sinnvolle Begriffe ersetzen, NICHT 1:1 übernehmen.

## Strukturbefehl

Siehe **SEO-PAGE-TEMPLATE-SPEC** (raw-URL unten). 12 H2-Sektionen + Header/Intro/Tip + Footer + Sticky-CTA.

**Theme-Color:** `--a: #1565C0` (Weltraum-Blau, NICHT Meerjungfrau-Cyan und NICHT Piraten-Braun).

**Variant-Tab-Emojis:** 🌿 Minimal / 🎯 Standard / ✨ Wow (Standard-Set).

**Strukturelle Vorlage:** Übernimm Header/Footer/Style-Block-Skeleton von meerjungfrau-3-5, ersetze nur Theme-Color und Section-Content.

## Affiliate-Linkstil (verbindlich)

```html
<a href="https://www.amazon.de/s?k=SUCHBEGRIFF&tag=machsleicht-21" target="_blank" rel="noopener sponsored">Link-Text*</a>
```

Disclosure am Variant-Ende: `* Affiliate-Links. Für dich ändert sich der Preis nicht.`

## Quellen (per raw-URL fetchen)

1. **JSON-Quelle (alle Inhalte hier — Spiele, Schedule, Ritual, Kuchen, Eltern-Tipps, FAQ, SOS, Preparation-Weeks):**
   `https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/_src/elite-motto-data/weltraum-klein.json`

2. **Template-Spec (Section-Reihenfolge, Pflicht-Felder, Anti-Patterns):**
   `https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/_dev/SEO-PAGE-TEMPLATE-SPEC.md`

3. **Strukturelle Vorlage (3-5 Goldstandard meerjungfrau):**
   `https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/kindergeburtstag/meerjungfrau-3-5-jahre.html`

4. **Light-Ist-Zustand (Referenz für Footer-Scripts):**
   `https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/kindergeburtstag/weltraum-3-5-jahre.html`

## Ausgabe-Format

Eine einzige vollständige HTML-Datei, kein Markdown drumherum, keine Erklärungen — nur das HTML ab `<!DOCTYPE html>` bis `</html>`. **Inline-Style** wie in meerjungfrau-3-5. Schema.org HowTo + FAQPage als zwei separate JSON-LD-Blöcke.

## Qualitäts-Anker (Self-Check vor Abgabe)

- 12 H2-Sections in genau der Reihenfolge der Spec
- 3 Variant-Panels (Minimal/Standard/Wow) mit Tab-Switching
- signatureRitual als gemeinsamer Anker für alle 3 Varianten (3-5-Version: keine komplexen Rollen, Aufkleber statt Tattoo, kein Wettbewerb)
- FAQ-Schema enthält **alle** Q&A aus der JSON
- Anti-IP-Check: 0 Treffer Star-Wars/Star-Trek/Buzz-Lightyear/Toy-Story/LEGO-Space
- Sicherheits-Boxen (`game-safety`) bei: Knicklicht-Schluck-Risiko (3-jährige), Wasser-Raketen draußen (Augen), Pappkarton-Helm (Sehfeld einschränken)
- Eltern-Bleiben-Anweisung in Intro UND Eltern-Tipps UND FAQ (3x — Pflicht bei 3-5)
- noindex-Meta entfernen (Elite = indexierbar)
- Word-Count: 5000–7000 Wörter (Light war ~700, Elite-Range — Goldstandards liegen aktuell bei 90–110 KB / 6000–8000 W, also lieber tendenziell mehr als zu wenig)

## Definition-of-Done

Ein Eltern-Test-Leser muss nach dem Lesen sagen können: "Ich weiß jetzt, was ich am Samstag um 15:00 mache, und ich habe alle Materialien zusammen."
