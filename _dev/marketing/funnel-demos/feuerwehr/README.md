# Tool-Karten für die Startseite

**Target-Layout für `index.html`:** Eine 4-Karten-Sektion „So funktioniert machsleicht", die die vier Kern-Tools mit *echten Tool-Screenshots* präsentiert. Ersetzt die früheren Mockup-Iterationen (Funnel-Demos, 5-Frame, Pinterest-Pin — alle gelöscht aus diesem Ordner).

## Dateien

| Datei | Inhalt |
|-------|--------|
| `tools-cards.html` | Drop-in-Sektion mit 4 Karten · Phone-Frames · Themen-Akzenten · CTAs |
| `tools-cards-mockup.png` | Render der Sektion mit aktuellen Platzhalter-Screenshots |
| `current-captures/01-planer-PLATZHALTER.png` | Live-Capture des Planer-Hero (FALSCHE STELLE — nicht der Wow-Moment) |
| `current-captures/02-schatzsuche-PLATZHALTER.png` | Live-Capture der Schatzsuche-Builder-Landing (FALSCHE STELLE — nicht der Wow-Moment) |
| `current-captures/03-einladung-spiel-PLATZHALTER.png` | Live-Capture des Spiel-Initialscreens (OK, aber Chase-Phase wäre besser) |

## ⚠️ Status: Layout fix, Screenshots noch falsch

Die Karten-Sektion ist visuell und strukturell wie sie auf der Startseite landen soll. **Was fehlt:** die richtigen Screenshots der „Wow-Momente" pro Tool — Bolle bestimmt sie, weil er weiß, wo die Magie sichtbar wird:

- **Karte 1 Planer:** zeigt aktuell die Eingabe-Maske. Zielzustand wäre vermutlich der *fertige Plan-Output* (Zeitablauf + Spiele + Einkaufsliste sichtbar).
- **Karte 2 Schatzsuche:** zeigt die Builder-Landing. Zielzustand wäre die *interaktive Schatzkarte* mit Emoji-Deko und Stations-Markern.
- **Karte 3 Einladungs-Spiel:** zeigt den Spiel-Start mit 9 Bränden. Funktioniert als Hook — aber die *Chase-Phase mit dem Funken-Runner* wäre der stärkere Wow-Moment.
- **Karte 4 Partyseite:** Platzhalter („Screenshot folgt"). Wird vom Cloudflare-Worker generiert, lokales Capture braucht Worker-Setup (wrangler) oder Demo-URL.

**Sobald Bolle die richtigen Screenshots liefert** (entweder als Datei-Upload oder per Anleitung „auf Page X klicke Y, warte bis Z"), tausche ich die Platzhalter aus und render die Sektion neu.

## Verworfener Pfad (gelöscht aus diesem Ordner, in Git-Historie nachlesbar)

Frühere Iterationen waren:
1. **2-Block-Mockup** (Einladung + Partyseite nebeneinander) — didaktisch korrekt aber redundant: die zwei sind kein separates Tool, sondern dieselbe Sache aus zwei Blickwinkeln.
2. **5-Frame-Story** (Planer → Schatzsuche → Einladungsspiel → Partyseite → Danke) — designerisch attraktiv, aber die UI war von mir gestaltet und nicht aus den echten Tools. Risiko Vertrauensbruch.
3. **Pinterest-Pin** mit Runner-Hero — schöne Optik, aber dasselbe Problem: Mockup-UI statt echte Screenshots.

**Erkenntnis:** Marketing-Assets, die wie Screenshots *aussehen* aber Designs *sind*, riskieren einen Bruch zwischen Werbeversprechen und tatsächlichem Tool-Erlebnis. Nur echte Tool-Screenshots, eingerahmt in Phone-Frames, sind deploy-würdig.

## Distribution-Plan (unverändert)

1. **Primär:** Drop-in als neue Sektion in `index.html`, ersetzt/ergänzt die bestehenden Tool-Sektionen
2. **Sekundär:** einzelne Karten als eigenständige Visuals für Social/Pinterest pro Motto
3. **Tertiär:** Motto-SEO-Hubs (P6-1) nutzen dasselbe Karten-Pattern

## Technisches

- Render via headless Chromium 131, deviceScaleFactor 3
- Fonts: Lilita One (Headlines) + Nunito (Body), als base64 ins HTML eingebettet
- Phone-Frame: 240px breit, `aspect-ratio:9/19.5`, `object-position:top` für sauberen Crop
- Karten-Akzent-Farben: Orange/Grün/Rot/Orange (Planer/Schatzsuche/Einladung/Partyseite)
- Liegt unter `.netlifyignore` → nicht öffentlich serviert
