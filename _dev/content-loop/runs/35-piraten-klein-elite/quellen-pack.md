# Welle 35 — piraten-3-5 Light → Elite (Writer-Brief)

**Ziel:** Eine vollständige Elite-SEO-Page `kindergeburtstag/piraten-3-5-jahre.html` schreiben — analog der bestehenden Elite-Pages, getrieben durch die existierende Phase-B-JSON.

## Schreibvertrag

- **Zielgruppe:** Eltern, die für ein 3–5-jähriges Kind einen Piraten-Kindergeburtstag planen
- **Tonfall:** ruhig, pragmatisch, mit YMYL-Sorgfalt (Schatzsuche-Pfade, Verschluck-Risiko bei Münzen/Edelsteinen, Wasser-Spiele)
- **KEIN Marketing-Gewäsch.** Konkrete Zahlen, konkrete Materialien, konkrete Minutenangaben
- **KEINE erfundenen Fakten** — jede inhaltliche Aussage muss in der JSON belegt sein
- **Anti-IP-Sanitisierung — strikt 0 Treffer für:** "Captain Hook", "Jack Sparrow", "Hook" (Film), "Pirates of the Caribbean", "Disney", "One Piece", "Pippi Langstrumpf" (kein Bezug), Tonie, Smyths. Generische Piraten-Begriffe (Käpt'n, Mannschaft, Schatzkarte, Augenklappe, Säbel-aus-Pappe, Goldmünzen-Schoko) sind alle frei.

## ⚠️ JSON-Encoding-Check (PFLICHT vor Übertrag)

Per früheren Welle-32-Sanitisierungs-Audits können in der JSON sanitisierte Strings stehen wie:
- "Schoko-Sandwich-Keks" (saubere Oreo-Ersatzform — bleibt so)
- "Schwur" → "Versprechen" (detektiv-Pattern, prüfen ob auch in piraten-klein angewandt)
- ASCII-Umlaut-Reste ("3-Jaehrige", "ae/oe/ue") → in HTML zu echten Umlauten

Falls weitere Encoding-Artefakte beim Lesen der JSON auffallen: durch sinnvolle Begriffe ersetzen, NICHT 1:1 übernehmen.

## Strukturbefehl

Siehe **SEO-PAGE-TEMPLATE-SPEC** (raw-URL unten). 12 H2-Sektionen + Header/Intro/Tip + Footer + Sticky-CTA.

**Theme-Color:** `--a: #8B4513` (klassisch braun-thematisch für Piraten, NICHT Indigo).

**Variant-Tab-Emojis:** 🌿 Minimal / 🎯 Standard / ✨ Wow (Standard-Set).

**Goldstandard-Referenz für Tonalität:** `piraten-6-8-jahre.html` ist schon Elite (Score >85). Übernimm Tonalität + signatureRitual-Ankerung 1:1 (aber 3-5-Anpassung: kein Wettbewerb, Eltern bleiben dabei, kürzere Programme, Aufkleber statt Tattoos).

## Affiliate-Linkstil (verbindlich)

```html
<a href="https://www.amazon.de/s?k=SUCHBEGRIFF&tag=machsleicht-21" target="_blank" rel="noopener sponsored">Link-Text*</a>
```

Disclosure am Variant-Ende: `* Affiliate-Links. Für dich ändert sich der Preis nicht.`

## Quellen (per raw-URL fetchen)

1. **JSON-Quelle (alle Inhalte hier — Spiele, Schedule, Ritual, Kuchen, Eltern-Tipps, FAQ, SOS, Preparation-Weeks):**
   `https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/_src/elite-motto-data/piraten-klein.json`

2. **Template-Spec (Section-Reihenfolge, Pflicht-Felder, Anti-Patterns):**
   `https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/_dev/SEO-PAGE-TEMPLATE-SPEC.md`

3. **Tonalitäts-Vorlage (piraten-Goldstandard für 6-8 — Stil/Wording/Ritual-Ankerung):**
   `https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/kindergeburtstag/piraten-6-8-jahre.html`

4. **Strukturelle Vorlage (Elite 3-5 Goldstandard — übernimm Header/Footer/Style-Block-Skeleton, nur Theme-Color tauschen):**
   `https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/kindergeburtstag/meerjungfrau-3-5-jahre.html`

5. **Light-Ist-Zustand (zeigt den vorhandenen Boilerplate — nicht 1:1 nehmen, nur als Referenz für Footer-Scripts):**
   `https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/kindergeburtstag/piraten-3-5-jahre.html`

## Ausgabe-Format

Eine einzige vollständige HTML-Datei, kein Markdown drumherum, keine Erklärungen — nur das HTML ab `<!DOCTYPE html>` bis `</html>`. **Inline-Style** wie in meerjungfrau-3-5. Schema.org HowTo + FAQPage als zwei separate JSON-LD-Blöcke.

## Qualitäts-Anker (Self-Check vor Abgabe)

- 12 H2-Sections in genau der Reihenfolge der Spec
- 3 Variant-Panels (Minimal/Standard/Wow) mit Tab-Switching
- signatureRitual als gemeinsamer Anker für alle 3 Varianten (3-5-Version: keine komplexen Rollen, Aufkleber statt Tattoo)
- FAQ-Schema enthält **alle** Q&A aus der JSON
- Anti-IP-Check: 0 Treffer Hook/Sparrow/Disney/One-Piece
- Sicherheits-Boxen (`game-safety`) bei: Schatzsuche-Wasser-Spiele (Verschlucken), kleine Goldmünzen-Schoko (Erstickungsrisiko bei 3-Jährigen), Säbel-aus-Pappe (Auge)
- Eltern-Bleiben-Anweisung in Intro UND Eltern-Tipps UND FAQ (3x — Pflicht bei 3-5)
- noindex-Meta entfernen (Elite = indexierbar)
- Word-Count: 5000–7000 Wörter (Light war ~700, Elite-Range)

## Definition-of-Done

Output-Länge: ≥ 5000 Wörter, ≤ 80 KB. Lesedauer für Eltern: 8–12 Min. Ein Eltern-Test-Leser muss nach dem Lesen sagen können: "Ich weiß jetzt, was ich am Samstag um 15:00 mache, und ich habe alle Materialien zusammen."
