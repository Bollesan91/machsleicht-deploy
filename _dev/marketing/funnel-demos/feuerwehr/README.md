# Funnel-Demos Feuerwehr

Marketing-Assets, die den vollständigen machsleicht-Funnel für das Motto Feuerwehr visualisieren. Alles aus dem echten Code gegroundet (Stationen, Spielmechanik, Worker-Farben, Runner-SVG).

## Dateien

### Aktueller Stand — 5-Frame-Story

| Datei | Beschreibung | Use-Case |
|-------|--------------|----------|
| `funnel-5frame-v2.html/.png` | **Empfohlen.** 5 Frames: Planer → Schatzsuche → Einladungs-**Spiel** mit Funken-Runner → Partyseite → Danke | Landingpage-Embed, Social, „So funktioniert's"-Section |
| `funnel-5frame-v1.html/.png` | Wie v2, aber Frame 3 = statisches Einladungs-Poster (kein Spiel) | Alternative für Kontexte, wo das Spiel-Konzept verwirrt |
| `funnel-pinterest.html/.png` | **2:3-Format** (1500×2250) für Pinterest-Pin. Runner-Chase als Hero + 4-Step-Strip | Pinterest-Distribution |

### Frühere Iteration

| Datei | Status |
|-------|--------|
| `feuerwehr-funnel-demo.html/.png` | Erste 2-Block-Variante (Einladung + Partyseite). Didaktisch korrekt aber konzeptuell überholt — die zwei sind kein eigenes Tool sondern eine Render-Funktion der Partyseite. |

## Was aus dem echten Code stammt

- **Hero-Copy Frame 1:** „Kindergeburtstag planen — kostenlos in 10 Minuten" aus `index.html`
- **Schatzsuche-Stationen Frame 2:** echte 5 aus `schatzsuche/feuerwehr.html`
- **Spielmechanik Frame 3:** dunkler Hintergrund `#1A0A00`, 9 Brand-Positionen aus dem `ITEMS`-Array, Glut-Rot-Palette aus dem `SKY[2]`-Eintrag, Runner-SVG direkt aus der `RUNNER_IMG`-Konstante in `einladung/feuerwehr/index.html`
- **Partyseite Frame 4:** Worker-Farbe `#D4812A`, Wunschlisten-Subtitle „Verhindert Doppelgeschenke" aus `party-worker.js`

## Was erfunden ist

- **Danke-Frame 5:** Konzept-Mockup. Feature existiert nicht. PNG zeigt „KONZEPT"-Stempel zur Markierung.
- **Wunschlisten-Items** in Frame 4: Platzhalter (Helm/Auto/T-Shirt), keine echten Amazon-Produkte verlinkt.
- **„Reserviert von Ben"** in Frame 4: plausibles Beispiel, nicht real.

## Status / Use

**Design-auf-Papier, nicht Bau-jetzt.** Bei 0 Planer-Traffic öffnet niemand die Partyseite. Das Asset hilft erst, wenn der Planer SEO-Traffic zieht. Funnel-Axiom unverändert: Hero = „Kindergeburtstag planen", Einladung sekundär.

## Geplante Distribution (offen, nicht entschieden)

1. **Primär:** Embed oben auf `schatzsuche/feuerwehr.html` als „Komplette Mission auf einen Blick"
2. **Sekundär:** Pinterest-Pin → motto-spezifisch (Pinterest ist motto-getrieben)
3. **Tertiär:** Motto-SEO-Hub später (P6-1 Einladungs-Refactor)

## Ausrollung auf 9 Mottos

Architektur soll parametrisiert werden: ein HTML-Template + 9 Motto-Daten-Objekte (Farben, SVG, Stationen, Spiel-Render, Wunschliste) → 9 PNGs via Batch-Render. Selbes Muster wie `_src/generate-schatzsuche-pages.py`. Feuerwehr ist der Goldstandard, daraus wird das Template extrahiert.

Pro weiteres Motto realistisch ~30 min Daten-Extraktion + Batch-Render. Nicht ein Nachmittag, sondern eine kleine Sprint-Aufgabe — und nur sinnvoll, wenn der Planer Traffic zieht.

## Tags / Tech

- Render via headless Chromium 131, deviceScaleFactor 3 (für Schärfe)
- Fonts (Lilita One + Nunito) als base64 ins HTML eingebettet (Google Fonts im Render-Container geblockt)
- Hochformat-Infographics: 1410×~10.000 px, Pinterest: 1500×2250 px (2:3)
- Liegt unter `.netlifyignore` → nicht öffentlich serviert
