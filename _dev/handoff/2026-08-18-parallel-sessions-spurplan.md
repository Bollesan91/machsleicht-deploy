# Drei Sessions parallel — Spurplan (18.08.2026)

Gleichzeitig aktiv: **Hannes** (Einladungsspiele), **Bolle** (SEO / Indexierbarkeit),
**diese Session** (Sicherheitsschicht / Gate A). Alle drei pushen auf `draft`.

## Spuren — wer fasst was an

| Spur | Ordner / Dateien | Kollision |
|---|---|---|
| Hannes — Einladungsspiele | `spiele/` (61), `einladung/` (20) | keine mit den anderen beiden |
| Bolle — SEO / Indexierbarkeit | `sitemap.xml`, `_redirects`, `robots.txt`, `netlify.toml`, `index.html`, `js/index.js`, `kindergeburtstag/<motto>.html` (Hubs), `kindergeburtstag/{3-5,6-8,9-12}-jahre.html` | **head/meta** der `*-jahre.html` — siehe unten |
| Sicherheitsschicht | `data/motto/*.json`, `_src/elite-motto-data/`, `data/freie-seiten-regeln.json`, `_dev/scripts/*.py`, **body** der 45 `kindergeburtstag/<motto>-<alter>-jahre.html` | dieselbe Datei wie SEO, andere Region |

Die 45 Ratgeberseiten sind die einzige echte Ueberschneidung: SEO arbeitet an
`<head>`, Canonicals, internen Links; die Sicherheitsschicht druckt ausschliesslich
in den Body (`class="shop-safe"`, `notfall-kasten`). `regeln-drucken.py` ist
idempotent und ruehrt nichts anderes an — Handarbeit im Head ueberlebt einen Lauf.

## ⚠️ Landmine: `_dev/scripts/generate-seo-pages.js` NICHT laufen lassen

Der Name laedt in einer SEO-Session zum Ausfuehren ein. Er ist auf dem Stand von
Mai und schreibt **sitemap.xml und `_redirects` neu**:

| Datei | heute | nach einem Lauf | Verlust |
|---|---|---|---|
| `sitemap.xml` | 136 URLs | 24 URLs | **112 URLs** |
| `_redirects` | 361 Zeilen / 25,8 kB | ~23 Zeilen | **~338 Regeln → 404** |

Ausserdem ueberschreibt er 14 Motto-Hubs + 3 Alters-Hubs + 3 Bonus-Seiten aus
seinen eigenen Templates — inklusive Rueckgaengigmachen des Gender-Sweeps vom
10.08. (`safari.html`) und der Audit-Welle vom 27.07. (`3-5-jahre.html`).

**Zustaendig fuer die Sitemap ist `_dev/scripts/generate-sitemap.js`** (scannt das
Dateisystem, 136 URLs, laeuft automatisch bei jedem „Ende"). Wenn der SEO-Strang
die Hub-Seiten wirklich neu erzeugen will, muss `generate-seo-pages.js` vorher
entschaerft werden: Sitemap- und Redirects-Schreiben raus (Punkt 4 und 5 in
`generate()`), MOTTOS-Liste gegen `data/motto` abgleichen.

Ticket dafuer: **S3** in BACKLOG-AUDIT.md.

## Gemeinsame Buchhaltung — Konflikt-Kandidaten

`SESSION-NOTES.md` (jede Session schreibt oben an), `BACKLOG-AUDIT.md`,
`AUDIT.md`, `sitemap.xml` (`lastmod` aendert sich bei jedem „Ende").
Harmlos, aber haeufig: **vor dem Commit `git pull --rebase`**, dann kollidiert
hoechstens der eigene Absatz.

## Reihenfolge-Empfehlung

Die offene Renderer-Entscheidung (druckt die Spielkarte ihre `safetyRule`?) aendert
den **Body aller 45 Ratgeberseiten**. Wenn der SEO-Strang diese Seiten misst oder
optimiert, sollte diese Aenderung davor liegen, nicht danach — sonst misst er einen
Stand, den die Maschine kurz darauf ersetzt.
