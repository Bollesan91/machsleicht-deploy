# Session-Notizen

## Letzte Session
**Datum:** 04.04.2026

## Was wurde gemacht

### Template-Upgrade: Motto-Seiten auf Elite-Level
- **Piraten** komplett überarbeitet:
  - Title-Bug gefixt (4–5–12 → 4–12)
  - „Piraten-Abenteuer" überall durch natürliches „Piraten" ersetzt
  - Spiel 3 ersetzt: Flaschenpost-Rätsel → Piratenschiff bauen (echtes Teamwork/Bau-Spiel)
  - ⏱ Zeitangaben auf allen 5 Spielen
  - Material-Liste aktualisiert (Flaschenpost raus, Kartons + Schwämme rein)
  - Doppelte class-Attribute im HTML gefixt

- **Detektiv** komplett überarbeitet (von Cookie-Cutter 297 → Elite 542 Zeilen):
  - 5 unique Spiele: Tatort-Ermittlung, Fingerabdruck-Labor, Observation & Beschattung, Zeugenverhör, Detektiv-Ausbildung
  - Spiel 3 (Geheimcode) ersetzt durch Observation & Beschattung (Bewegungsspiel als Kontrast)
  - Spiel 5 Titel: generische „3 Prüfungen/5 Stationen/Akademie" → unique Namen
  - Eltern-Tipp bei Zeugenverhör (braucht Erwachsene als Mitspieler)
  - ⏱ Zeitangaben auf allen 5 Spielen
  - FAQ-Schema, Deko-Checkliste, Material-Liste, 6 Affiliate-Links, Age-Filter JS
  - Material-Liste aktualisiert (Glöckchen + Rollenkarten ergänzt, UV-Stifte als Spielmaterial entfernt)
  - Intro-Text angepasst (Geheimcodes → Verdächtige beschatten)
  - Meta description Entities bereinigt

- **Meerjungfrau** auf Elite expandiert (298 → 540 Zeilen) — ABER noch nicht final gefixt:
  - Zeitangaben fehlen noch
  - Spiel 5 (Akademie) Titel noch generisch
  - Material-Liste noch nicht gegen Spiele abgeglichen

### Template-Qualitätsstandard definiert
- 5 Spiele = 5 echte Aktivitätstypen (Puzzle, Bewegung, Bauen/Teamwork, Kreativ, Wettkampf/Sozial)
- ⏱ Zeitangabe pro Spiel
- Material-Liste muss zu den tatsächlichen Spielen passen
- Kein generisches „Akademie"-Pattern (3/5/7 Stationen)
- Natürliche Sprache statt Find-Replace-Naming

### Navigation Quick-Wins (ERLEDIGT)
- **Sticky 3-Button Action Bar** auf allen ~340 Seiten: Einladung / Schatzsuche / Planer (CSS-only, kein JS-Flackern)
- **Motto-Grid** auf /kindergeburtstag: 6 fehlende Mottos ergänzt (20/20 komplett)
- **Homepage CTA-Button** prominent unter Hero
- **"14 Mottos" → "20 Mottos"** global aktualisiert (~260 Dateien)
- CSS-Bug gefixt: doppeltes class-Attribut auf Sticky-CTA

### Planer-Redesign Konzept (Sparring + Wireframes)
- **Site-Architektur** visualisiert (IST vs SOLL) — site-architektur.jsx Artifact
- **Plan-Wireframe** erstellt: optimale Mobile-Reihenfolge 15→8 Screens — plan-wireframe.jsx Artifact
- **Teaser-Konzepte** v2: personalisiert, interaktiv, mit Killer-Hooks — teaser-v2.jsx Artifact
- 10-Punkte Sparring zur Produktdramaturgie durchgeführt
- Kerninsight: Choreografie-Problem, nicht Content-Problem

## Nächste Schritte
- **PRIORITÄT: Planer-Umbau (kindergeburtstag.html)**
  - Teaser-Konzept liegt als Referenz vor (teaser-v2.jsx Artifact)
  - Wireframe liegt vor (plan-wireframe.jsx Artifact)
  - Planer-JS-Code analysieren und Render-Output umbauen
  - Kernänderungen:
    1. Control Hub direkt nach Hero (Einladung / Schatzsuche / PDF)
    2. Einladung hochziehen: WhatsApp-Preview, personalisiert, interaktiv
    3. Schatzsuche-Teaser: Stationen-Explorer, "30 Min Abenteuer, du trinkst Kaffee"
    4. Zeitplan als Accordion statt Vollausklappung
    5. Affiliates IN den Zeitplan einweben statt separater Block
    6. Score-Completion-Loop: Aktionen erhöhen den Readiness-Score live
    7. Abschluss-Block: PDF + An Helfer schicken + Nächstes Jahr
- **Meerjungfrau finalisieren** (Zeitangaben, Spiel 5, Material-Check)
- **Ritter** als #3 expandieren, dann Pferde, Baustelle, Zirkus
- **Franchise-Seiten** (8 Stück) auf Elite-Level bringen

## ERLEDIGT: Navigation-Bug auf /kindergeburtstag
~~Die Hauptseite verlinkte nur 14 von 20 Mottos.~~ **GEFIXT** — alle 20 Mottos im Grid und in der Liste.

## Offene Fragen
- Meerjungfrau Spiel-Mix: Braucht das auch ein Bewegungsspiel als Ersatz? (Unterwasser-Parcours ist schon drin)
- Franchise-Seiten: Gleiches Template oder eigene Struktur? (Lizenz-Themen haben andere Deko/Essen-Logik)
- Planer-Umbau: JS-Code analysieren — wie komplex ist der Render-Output?
