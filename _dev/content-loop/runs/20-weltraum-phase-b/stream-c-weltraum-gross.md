# Stream C — weltraum-gross.json bauen (Phase B Elite-Motto-Data)

Aufgabe: vollständige `_src/elite-motto-data/weltraum-gross.json` (Weltraum 9-12 Jahre) erstellen.

## Pflicht-Quellen (per Raw-URL)

1. **safari-gross.json (Pattern Score 95, MIT Codeknacker):** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/safari-gross.json
2. **piraten-gross.json (Pattern Score 90, MIT Codeknacker SCHATZ/INSEL/KOMPASS):** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/piraten-gross.json
3. **feuerwehr-gross.json + einhorn-gross.json:** als Referenz
4. **Schema:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/README.md
5. **Weltraum-HTML-Template:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/kindergeburtstag/weltraum-9-12-jahre.html

## Weltraum-Story-Anker für 9-12 (Mission-Tiefe!)

- **Setting:** Internationale Raumstation, Mars-Mission, Mond-Basis. Realistischer Sci-Fi-Frame.
- **Spezialisierungen analog Safari/Piraten:**
  - **Pilot** (Navigation, Sternen-Karten lesen)
  - **Wissenschaftler** (Proben analysieren, Codes entschlüsseln)
  - **Mechaniker** (Reparaturen, Tool-Logik)
- **Ritual:** "Die Mission-Aufnahme & Kommandanten-Übergabe"
- **Anerkennung:** "Sorgfalt-Spezialist"-Stempel (NICHT "1. Astronaut"-Tempo)
- **Schlafparty-Wow:** Nacht-Sternenbeobachtung, Mars-Rover-Simulation im Dunkeln, Eltern-Opt-In für Wach-Zeit

## KRITISCH: Codeknacker mit ECHTEN WÖRTERN (nicht Pseudo-Salat!)

Lerne aus den Vorgängern:
- Safari-Tier-1 Fehler: ELZA/HZEL/FEK (Pseudo-Wörter) → später WASSER/FELS/TEMPEL
- Piraten-Tier-1 Fehler: INSEL-Items hatten G-S-S-E-K als Buchstaben → später Inka-Maske/Nautischer-Sextant/Silberbeutel/Edelstein-Ring/Loggbuch = I-N-S-E-L

**Vorschlag für Weltraum-Codeknacker (3 Quadranten, alle echte deutsche Wörter):**

1. **Pilot-Quadrant → STERN** oder **RAKETE** (5-6 Items, eindeutige Sortier-Regel z.B. "nach Helligkeit absteigend" oder "nach Geschwindigkeit aufsteigend")
2. **Wissenschaftler-Quadrant → PLANET** (6 Items, "nach Entfernung von der Sonne sortiert" → Reihenfolge der Planeten — eindeutig, lehrreich!)
3. **Mechaniker-Quadrant → MOTOR** oder **NEBEL** (5 Items, "nach Werkzeug-Größe" oder Pfad-Reihenfolge)

**WICHTIG:** Items so wählen dass die Anfangsbuchstaben tatsächlich das Lösungswort ergeben! Konkret rechnen:
- STERN: Sonne, Tau, Erde, Roter Riese, Neutronenstern? — nach Helligkeit ergibt das S-?-E-R-N? — Sortier-Regel präzise wählen so dass es funktioniert!
- PLANET: P=Pluto/Phobos, L=Luna/Lapetus, A=?, N=Neptun, E=Erde, T=? — sortiert nach Sonnenabstand: Erde Mars Jupiter... → eindeutige Reihenfolge die PLANET ergibt

**Eingebauter Selbst-Check:** "Wenn das Lösungswort kein echtes deutsches Wort ergibt, war die Regel falsch angewendet."

**Mache die Math VORHER. Verifiziere dass jeder Quadrant tatsächlich aufgeht. Sonst hast du den INSEL-Bug aus Piraten wiederholt!**

## Schema-Pflicht

```json
{
  "motto": "weltraum",
  "ageGroup": "gross",
  "ageRange": [9,12],
  "title": "🚀 Weltraum-Kindergeburtstag — 9–12 Jahre",
  "signatureRitual": {"name":"Die Mission-Aufnahme & Kommandanten-Übergabe", ...},
  "variants": [
    {"id":"minimal","estimatedCostEur":50,...},
    {"id":"standard","estimatedCostEur":100,...},
    {"id":"wow","estimatedCostEur":150,...}
  ],
  ...
}
```

## shoppingList[].category 9-12

- **pflicht:** Lebensmittel (Kuchen, Schorle, Astronauten-Nahrung-Sticks), Codeknacker-Material (Karten, Umschläge), Lizenz-Vorlagen, Stempel "Sorgfalt-Spezialist"
- **sinnvoll:** Crew-Patches (Pilot/Wissenschaftler/Mechaniker), LED-Stirnlampen für Nacht-Sterne (Wow), Sternen-Karte, Walkie-Talkies
- **habIchVielleicht:** Stern-Projektor (eher Pinterest-Maximum), Mini-Astronauten-Figur (für jüngere Geschwister), Mars-Rover-Spielzeug

## Pflicht-Details

- **11 Spiele** über 3 Varianten (Minimal 2-3, Standard 5-6, Wow 6+ inkl Codeknacker, Schlafparty-Element)
- **steps[] avg 5+**, **whyItWorks 100%**, **safetyRule** wo sinnvoll
- **parentTips.educationalValue** 450-600c (Astronomie-Wissen, Mission-Verantwortung, Crew-Ethik)
- Score-Ziel: ≥85 (Vergleich: safari-gross 95, piraten-gross 90)

## Output

Vollständige `weltraum-gross.json` als Artifact mit Download-Button. Status-Report mit Codeknacker-Math-Verifikation.

## Anti-Patterns

- Pseudo-Wörter als Codeknacker-Lösungen (= INSEL-Wiederholung!)
- Verkindischende "kleine Astronauten"-Sprache für 9-12
- "1. Astronaut"-Tempo-Stempel
- Marketing-Sound ("Sweet Spot", "emotional wertvollsten")
- Anwärter-Lizenz-Konzept
- HTML-Tags ins JSON kopieren
