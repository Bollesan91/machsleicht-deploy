# Welle 34 — feuerwehr-3-5 Light → Elite (Writer-Brief)

**Ziel:** Eine vollständige Elite-SEO-Page `kindergeburtstag/feuerwehr-3-5-jahre.html` schreiben — analog der bestehenden Elite-Pages (meerjungfrau-3-5 / detektiv-3-5 als Goldstandards), getrieben durch die existierende Phase-B-JSON.

## Schreibvertrag

- **Zielgruppe:** Eltern, die für ein 3–5-jähriges Kind einen Feuerwehr-Kindergeburtstag planen
- **Tonfall:** ruhig, pragmatisch, mit YMYL-Sorgfalt (Sicherheit bei Schaum, Wasser, Würstchen)
- **KEIN Marketing-Gewäsch.** Konkrete Zahlen, konkrete Materialien, konkrete Minutenangaben
- **KEINE erfundenen Fakten** — jede inhaltliche Aussage muss in der JSON belegt sein (Quelle siehe unten)
- **Marken-Sanitisierung:** keine Disney/Pixar, kein "Hatchimal", kein "Tonie", keine Trillerpfeifen-Marke. "Schoko-Sandwich-Keks" bleibt (sanitisierte Form von Oreo). Affiliate-Links auf Amazon-Suche mit `tag=machsleicht-21`.

## ⚠️ JSON-Encoding-Bug aus Phase-B (PFLICHT zu fixen beim Übertrag)

In der JSON-Quelle steht an mehreren Stellen wörtlich der String:

> `Hand-Signal "Notruf!" + leiser Spruch.`

Das ist ein Artefakt eines früheren find/replace-Fehlers — der ursprüngliche Begriff war vermutlich **"Sirene"** oder **"Tatütata"**. Beim Übertrag in HTML ersetzen durch sinnvolle Begriffe je nach Kontext:

- Im Schicht-Appell als **Schicht-Begrüßung** ohne komische Quasi-Anführung
- Bei Mini-Einsatz als **Sirene** (10 Sek. vom Handy)
- In Aufkleber-Liste als **Sirenen-Symbol**
- Generell: prüfen, was an der Stelle inhaltlich gemeint ist, nicht 1:1 übernehmen

Ebenso: "Schoko-Sandwich-Keks**s**" (doppelt-s) → "Schoko-Sandwich-Kekse"; "3-Jaehrige"/"Augennah/mundnah" sind ASCII-Encoding-Artefakte → "3-Jährige" / "Augennähe / Mundnähe".

## Strukturbefehl (Section-für-Section, exakt diese Reihenfolge)

Siehe **SEO-PAGE-TEMPLATE-SPEC** (raw-URL unten). 12 H2-Sektionen + Header/Intro/Tip + Footer + Sticky-CTA. Color-Variable `--a: #D32F2F`. Variant-Tab-Emojis: 🌿 Minimal / 🎯 Standard / ✨ Wow.

**Wichtig — Variant-Header:** Im JSON heißen Minimal/Standard/Wow teils widersprüchlich (z.B. `"label": "Standard — 3 Stunden"` aber `"headline": "🎯 Standard — 2 Stunden"`). Die **headline** ist die korrigierte Version aus den späteren Welle-32-Fixes — die ist Wahrheit. timeWindow ebenfalls vertrauen (Standard: 15:00–17:00 = 2h, Wow: 14:30–17:00 = 2,5h, Minimal: 15:00–16:30 = 1,5h).

## Affiliate-Linkstil (verbindlich)

```html
<a href="https://www.amazon.de/s?k=SUCHBEGRIFF&tag=machsleicht-21" target="_blank" rel="noopener sponsored">Link-Text*</a>
```

Disclosure am Variant-Ende: `* Affiliate-Links. Für dich ändert sich der Preis nicht.`

## Quellen (per raw-URL fetchen)

1. **JSON-Quelle (alle Inhalte hier — Spiele, Schedule, Ritual, Kuchen, Eltern-Tipps, FAQ, SOS, Preparation-Weeks):**
   `https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/_src/elite-motto-data/feuerwehr-klein.json`

2. **Template-Spec (Section-Reihenfolge, Pflicht-Felder, Anti-Patterns):**
   `https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/_dev/SEO-PAGE-TEMPLATE-SPEC.md`

3. **Strukturelle Vorlage (Elite 3-5 Goldstandard — übernimm Header/Footer/Style-Block 1:1, nur Theme-Color tauschen):**
   `https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/kindergeburtstag/meerjungfrau-3-5-jahre.html`

4. **Light-Ist-Zustand (zeigt den vorhandenen Boilerplate-Rahmen — nicht 1:1 nehmen, nur als Referenz für Footer-Scripts):**
   `https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/kindergeburtstag/feuerwehr-3-5-jahre.html`

## Ausgabe-Format

Eine einzige vollständige HTML-Datei, kein Markdown drum herum, keine Erklärungen — nur das HTML ab `<!DOCTYPE html>` bis `</html>`. **Inline-Style** wie in meerjungfrau-3-5 (keine externen CSS-Links außer `/css/utility.css`). Schema.org HowTo + FAQPage als zwei separate JSON-LD-Blöcke im Head bzw. Body.

## Qualitäts-Anker (Self-Check vor Abgabe)

- 12 H2-Sections in genau der Reihenfolge der Spec
- 3 Variant-Panels (Minimal/Standard/Wow) mit Tab-Switching
- Schicht-Appell-Ritual als gemeinsamer Anker für alle 3 Varianten
- FAQ-Schema enthält **alle** 6 FAQ-Q&A aus der JSON
- Anti-IP-Check: 0 Treffer für "Disney", "Pixar", "M&M", "Smartie", "Capri", "Lego", "Tonie"
- Sicherheits-Boxen (`game-safety`) bei: Schaum-Löschen (Augen/Mund), Spritz-Probe (Wasser-aufs-Kind), Mini-Würstchen (Erstickungsrisiko)
- Eltern-Bleiben-Anweisung in Intro UND Eltern-Tipps UND FAQ (3x — Pflicht bei 3-5)
- Word-Count: 5000–7000 Wörter (Light war ~700, Elite-Range)

## Definition-of-Done

Output-Länge: ≥ 5000 Wörter, ≤ 80 KB. Lesedauer für Eltern: 8–12 Min. Ein Eltern-Test-Leser muss nach dem Lesen sagen können: "Ich weiß jetzt, was ich am Samstag um 15:00 mache, und ich habe alle Materialien zusammen."
