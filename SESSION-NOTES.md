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

## Nächste Schritte
- **Meerjungfrau finalisieren** (Zeitangaben, Spiel 5, Material-Check)
- **Ritter** als #3 expandieren
- **Pferde** als #4
- **Baustelle** als #5
- **Zirkus** als #6
- Dann 8 Franchise-Seiten (frozen, paw-patrol, pokemon, minecraft, ninjago, harry-potter, spider-man, super-mario)

## KRITISCH: Navigation-Bug auf /kindergeburtstag
Die Hauptseite `/kindergeburtstag` verlinkt nur 14 von 20 Mottos. **6 Motto-Seiten sind nicht erreichbar:**
- ❌ Detektiv
- ❌ Meerjungfrau
- ❌ Ritter
- ❌ Pferde
- ❌ Baustelle
- ❌ Zirkus

Diese Seiten existieren unter `/kindergeburtstag/detektiv` etc., tauchen aber weder im Motto-Grid noch in der Motto-Liste auf kindergeburtstag.html auf. Müssen in die Navigation eingepflegt werden.

## Offene Fragen
- Meerjungfrau Spiel-Mix: Braucht das auch ein Bewegungsspiel als Ersatz? (Unterwasser-Parcours ist schon drin)
- Franchise-Seiten: Gleiches Template oder eigene Struktur? (Lizenz-Themen haben andere Deko/Essen-Logik)
- Navigation: Alle 20 Mottos auf /kindergeburtstag aufnehmen, oder bewusst nur bestimmte zeigen?
