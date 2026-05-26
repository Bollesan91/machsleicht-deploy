# Welle 37 — feuerwehr-6-8 Light → Elite (Writer-Brief)

**Ziel:** Eine vollständige Elite-SEO-Page `kindergeburtstag/feuerwehr-6-8-jahre.html` schreiben.

## Schreibvertrag

- **Zielgruppe:** Eltern, die für ein 6–8-jähriges Kind einen Feuerwehr-Kindergeburtstag planen
- **Tonfall:** ruhig, pragmatisch, mit YMYL-Sorgfalt (Brandermittlung-Rollen-Realismus, Wasser-Spiele mit echten Spritzpistolen, Werkzeug-Sicherheit)
- **Altersspezifika 6-8 (anders als 3-5):** Echte Brandermittlung-Rollen (kein Aufkleber-Tattoo mehr), Team-Aufgaben mit Wettbewerb (aber keine Eliminationsrunden), längeres Programm (2,5–3 h), Eltern können sich zurückziehen aber als Helfer bleiben, mehr Erklärung-Tiefe für Sirenen-/Notruf-/112-Realismus
- **KEIN Marketing-Gewäsch.** Konkrete Zahlen, konkrete Materialien, konkrete Minutenangaben
- **KEINE erfundenen Fakten** — jede inhaltliche Aussage muss in der JSON belegt sein

## ⚠️ JSON-Encoding-Check (PFLICHT)

Die feuerwehr-mittel.json hat (analog feuerwehr-klein.json) wahrscheinlich denselben Welle-32-Sanitisierungs-Artefakt:

> `Hand-Signal "Notruf!" + leiser Spruch.`

Beim Übertrag in HTML kontextrichtig ersetzen durch: **Sirene** (10 Sek. vom Handy), **Sirenen-Symbol** (Aufkleber-Funktion), **Mini-Flamme**, **Schicht-Begrüßung** — je nach Kontext.

Weitere mögliche Artefakte: "Schoko-Sandwich-Keks(s)" (saubere Oreo-Form, bleibt), "3-Jaehrige"/"6-8-Jaehrige" → echte Umlaute.

## Strukturbefehl

Siehe **SEO-PAGE-TEMPLATE-SPEC** (raw-URL unten). 12 H2-Sektionen.

**Theme-Color:** `--a: #D32F2F` (Feuerwehr-Rot, wie feuerwehr-3-5).

**Strukturelle Vorlage:** detektiv-6-8-jahre.html ist der **konsolidierte Elite-Goldstandard für 6-8** (Score 95). Übernimm Skeleton/Style/Footer, ersetze Theme + Content.

**Anti-IP-Sanitisierung:** 0 Treffer für Disney/Pixar/M&M/Smartie/Capri/Lego/Tonie. "Brandermittler" / "Feuerwehr-Kapitän" / "Schlauch-Profi" sind generische Rollen, frei.

## Affiliate-Linkstil

```html
<a href="https://www.amazon.de/s?k=SUCHBEGRIFF&tag=machsleicht-21" target="_blank" rel="noopener sponsored">Link-Text*</a>
```

## Quellen (per raw-URL fetchen)

1. **JSON-Quelle:**
   `https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/_src/elite-motto-data/feuerwehr-mittel.json`

2. **Template-Spec:**
   `https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/_dev/SEO-PAGE-TEMPLATE-SPEC.md`

3. **Strukturelle Vorlage (6-8 Goldstandard detektiv):**
   `https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/kindergeburtstag/detektiv-6-8-jahre.html`

4. **Tonalitäts-Referenz für Feuerwehr (3-5 Page als Tonalitäts-Anker):**
   `https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/kindergeburtstag/feuerwehr-3-5-jahre.html`

5. **Light-Ist-Zustand (Referenz für Footer-Scripts):**
   `https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/kindergeburtstag/feuerwehr-6-8-jahre.html`

## Ausgabe-Format

Vollständige HTML-Datei. Inline-Style wie meerjungfrau/feuerwehr 3-5. Schema.org HowTo + FAQPage + BreadcrumbList.

## Qualitäts-Anker

- 12 H2-Sections in genau der Reihenfolge der Spec
- 3 Variant-Panels (Minimal/Standard/Wow) — bei 6-8 längere Programme (2 h / 2,5 h / 3 h)
- signatureRitual als Anker (6-8-Version: echte Rollen-Vergabe mit Wachen-Tafel statt nur Aufkleber)
- FAQ-Schema enthält **alle** Q&A aus der JSON
- Anti-IP-Check: 0 Treffer
- Sicherheits-Boxen bei: Spritz-Probe (kein Augenkontakt), echte Sirenen-Lautstärke (Lärm-Sensibilität), Brandermittlung-Lebensmittel-Realismus
- noindex-Meta entfernen
- Eltern-Anwesenheit für 6-8 NICHT Pflicht (anders als 3-5), aber als Helfer empfohlen
- Word-Count: 5000–8000 W

## Definition-of-Done

Ein Eltern-Test-Leser muss nach dem Lesen sagen können: "Ich weiß genau, welche Variante ich nehme und habe alle Materialien."
