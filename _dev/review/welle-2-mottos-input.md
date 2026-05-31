# Adversarial-Review Input — Welle 2 Planer-Mottos v4 (31.05.2026, Welle-6-Stand)

**Branch:** draft (post-Welle-6-MUST-FIX)
**Datei:** `js/kindergeburtstag.js` (GENERIC-Array Erweiterungen)
**Review-Auftrag:** Re-Review der 3 Mottos. Frische Sicht. Konservativ scoren.

## Bisherige Wellen-Iterationen (alle behoben — Original-Code-Strings hier 1:1 verankert)

| Welle | Findings | Welle | Adressierung |
|---|---|---|---|
| 2 | meerjungfrau Wasserschüssel, prinzessin Tacker, prinzessin Glassteine-Altersmechanik, prinzessin Sissi/Elizabeth/Ludwig Fakten, superheld 4J + Cape-Strangulation, superheld Wand-Liegestütz, meerjungfrau Marianengraben | 3 | ✅ alle 7 |
| 3 | meerjungfrau Sand-Bezugsquelle, prinzessin Glas-Lagerseparation, superheld Erwachsenen-Korrektur | 4 | ✅ alle 3 |
| 4/5 | Sylvia Earle Biografie, Versiegelungs-Alternative präzisieren | 5 | ✅ beide |
| 5/6 | Team-Tauch-Challenge Perlen-Größe + Inhalations-Risiko, Erbsen-Prinzessin Allergie | 6 | ✅ beide |

## Verankerter Code-Stand (1:1 aus js/kindergeburtstag.js extrahiert)

### meerjungfrau (Highlights nach Welle 6)

```js
// klein — Perlen-Fischen (Welle 3 FIX)
material: "Große Holzperlen + Filz-Perlen ≥4 cm in Weiß/Blau (KEINE Glas-/Plastik-Murmeln für 3-5), 1 flache Schüssel (max. 5 cm Wasserhöhe!), 1 Plastik-Sieb pro Kind, Handtücher",
anleitung: "1. Flache Schüssel (max. 5 cm Wasserhöhe!) mit 30-40 Großperlen füllen. 2. ⚠ AUFSICHT-RATIO 1:3 bei 3-Jährigen, 1 Erwachsene:r immer in Armreichweite (Wasser + Kleinkind = nie unbeaufsichtigt, auch wenig Wasser kann gefährlich werden). 3. Jedes Kind 'fischt' mit Sieb 5 Perlen in 30 Sekunden..."

// mittel — Sand & Schätze (Welle 4 FIX)
material: "Zertifizierter Spielsand mit DIN-EN-71-3-Konformitätsangabe auf der Verpackung (im Baumarkt: Hagebau/Hornbach/OBI/Bauhaus als TÜV-geprüfter Spielsand oder EN-71 Spielsand; KEIN Quarzsand, KEIN unzertifizierter Baustellen-/Maurer-Sand)..."
anleitung: "1. Vor Kauf: Verpackung auf DIN-EN-71-3-Kennzeichnung prüfen (Konformitätserklärung verpflichtend, bei Markenherstellern Standard). 2. ... 5. ⚠ Hände nach dem Spiel waschen, KEIN Sand essen..."

// mittel — Team-Tauch-Challenge (Welle 6 FIX)
desc: "2 Teams stafetteln: Holz-Großperlen mit Strohhalm-Vakuum in Becher transportieren.",
material: "Holz-Großperlen ≥4 cm (KEINE kleinen Perlen — EN-71-Verschluckrisiko falls versehentlich eingesaugt), dicke Trinkhalme (ab 8 mm Durchmesser), 2 leere Becher als Ziel, Stoppuhr",
anleitung: "1. 2 Teams bilden. 2. Vor Spielstart: Erwachsene zeigt vor — Perle wird nur AUSSEN am Strohhalm angesaugt (Vakuum-Prinzip), NICHT in den Strohhalm gesteckt. ... 6. ⚠ Aufsicht in Armreichweite: Strohhalm darf nicht in Mund gerammt werden (Verletzung Gaumen), Perle NIE in den Strohhalm einsaugen (Inhalations-Risiko)."

// gross — Riff-Expedition (Welle 3 FIX)
anleitung: "1. 6 Rätsel-Stationen aufbauen mit unterschiedlichen Ozean-Themen: Korallenriff-Symbiose, Tiefsee-Druck-Physik, Plankton-Nahrungskette, Strandfunde, Strömungen, Tiefenrekord-Faktbox (Marianengraben — Tiefe nur 1× als Faktum nennen, nicht in jedem Rätsel)..."

// gross — Tiefsee-Mission (Welle 5 FIX)
anleitung: "Quiz: Welcher Tiefsee-Fisch leuchtet (Anglerfisch), Wie tief ist der Marianengraben (~10.994 m), Wer ist Sylvia Earle (geb. 1935, US-amerikanische Ozeanographin und Pionierin der Tiefseeforschung, Aquanautin und Gründerin von Mission Blue)?..."
```

### prinzessin „Königreich & Hofstaat" (Highlights nach Welle 6)

```js
// klein — Glitzer-Krönchen-Werkstatt (Welle 3 FIX)
material: "Goldkarton-Krönchen (vorgeschnitten), Großperlen ≥4 cm aus Holz/Filz (KEIN Glas, KEINE Pailletten), Glitzer-Streifen, Tacker (Erwachsenen-Werkzeug!)",
anleitung: "1. Jedes Kind bekommt ein Krönchen. 2. Mit Großperlen + Glitzer verzieren. 3. Kopfumfang messen — Tacker zum Schließen AUSSCHLIESSLICH durch Erwachsene (Quetsch-/Klammer-Risiko an Kinderfingern). 4. ⚠ Für 3-5 J nur Großteile ≥4 cm..."

// mittel — Kronen-Atelier (Welle 3 FIX)
material: "Goldkarton-Schablonen, Schere (Kinder-Bastel-Scheren), Federn, Goldstift für Namen, Klebstoff. **Wenn Gruppe homogen 6+ ohne jüngere Geschwister:** zusätzlich Glassteine (separates Schälchen, Aufsicht-Pflicht). **Wenn jüngere Geschwister im Raum sind:** stattdessen große Plastik-Edelsteine ≥4 cm",
anleitung: "1. Vor Spiel-Start: Altersgruppe checken — sind Kinder unter 6 im Raum (Geschwister!)? Wenn ja: NUR ≥4 cm Großteile, KEIN Glas. ... 6. Glas-Material nach Spielende sofort wieder einsammeln + sicher verstauen."

// mittel — 5 Königliche Prüfungen (Welle 6 FIX)
material: "Teetasse, Buch (mittelschwer), getrocknete Erbsen + Kissenstapel (Allergie-Alternative: Holzkugel oder Murmel ≥4 cm bei homogener 6+ Gruppe), Märchen-Karten, Memory-Karten",
anleitung: "1. ⚠ VOR Spielstart: Allergien abfragen (Hülsenfrüchte/Pollen/Hausstaubmilben in Kissen?) und Allergie-Alternative bereitstellen — Holzkugel ≥4 cm statt Erbse, Allergiker-freundliches Kissen oder Decke..."

// gross — Königliche Schmuck-Manufaktur (Welle 4 FIX)
material: "Silberdraht ab 0,8 mm, Glasperlen (NUR ab 9 J — in separater, klar etikettierter Box GLAS-AB-9J gelagert), Bastel-Brille für ALLE in Reichweite, Seitenschneider, Tuch/Becher zum Schneiden, Aufräum-Box für Glas",
anleitung: "1. Vor Spiel-Start: Glas-Box prüfen (etikettiert GLAS-AB-9J), separates Bastel-Tisch-Areal für Glas-Arbeiten markieren. 2. Drahtschneiden AUSSCHLIESSLICH durch Erwachsene. 3. Alle in Reichweite tragen Bastel-Brille. 4. Drahtenden im Tuch/Becher schneiden (Geschoss-Risiko). 5. Danach Enden nach innen umbiegen. ... 7. ⚠ Nach Spielende SOFORT Glas-Box wieder schließen + verstauen (NICHT auf Tisch liegen lassen). 8. Bei jüngeren Geschwistern im Raum: gar KEIN Glas, nur Plastik-Edelsteine ≥4 cm als Ersatz."

// gross — Elite-Hofschule (Welle 3 + Welle 5 FIXES)
material: "Quiz-Karten, Walzer-Musik (3/4-Takt), Tee-Set, Schaumstoff-Schwerter, Pergament-Rollen, Versiegelungs-Alternativen (Auswahl): a) Gold-Sticker (5-Cent-große runde Gold-Folien-Aufkleber), b) Kaltleim + Siegel-Stempel (Kaltleim auf Pergament auftragen, Stempel rein-drücken vor Trocknung), c) Gold-Stift-Initialen + Heißkleber-Punkt durch Erwachsene auf separater Unterlage. ⚠ KEIN echtes Heißwachs/Siegelwachs (Verbrennungs-Risiko + widerspricht der LED-Linie)",
anleitung: "1. 7 Stationen, alle frei wählbar. 2. Wissens-Quiz mit präzisen Fakten: a) Kaiserin Elisabeth (Spitzname Sissi, 1837–1898, Kaiserin von Österreich, ermordet 1898 in Genf); b) Queen Elizabeth II regierte 1952–2022 = 70 Jahre, längste Regentschaft eines britischen Monarchen; c) Ludwig XIV (Sonnenkönig, 1643–1715 = 72 Jahre, längste verbürgte Regentschaft eines souveränen europäischen Monarchen); d) Neuschwanstein (Baubeginn 1869 unter Ludwig II.)..."
```

### superheld „Held:innen-Akademie" (Highlights nach Welle 6)

```js
// klein 4-5J — Helden-Starter-Set (Welle 3 FIX)
desc: "Cape aus Bettlaken/Tuch + Augenmaske aus Filz — Mindestalter 4 Jahre wegen Cape-Strangulationsgefahr.",
material: "Bettlaken oder Stoffe für Capes (1 pro Kind, mit Klett-Verschluss vorne!), Filz-Augenmasken vorgeschnitten, Gummiband, Stifte, große Sticker ≥4 cm",
anleitung: "1. ⚠ MINDESTALTER 4 Jahre — KEIN Cape für unter 3-Jährige (Strangulationsgefahr). 2. Cape mit Klett-Verschluss (NICHT um Hals knoten — Strangulations-Risiko, sondern Klett vorne). 3. Jedes Kind wählt eigene Held:innen-Identität (Name, Superkraft). 4. Augenmaske basteln + Gummi anbringen (Gummi nicht zu eng, 2 Finger Abstand). 5. ... 6. ⚠ Sticker ≥4 cm... Cape darf beim Spielen NICHT hängen bleiben — bei Verfangen-Gefahr (Möbel, Treppe) Cape abnehmen."

// mittel — Helden-Bootcamp (Welle 3 + Welle 4 FIXES)
anleitung: "1. Krafttraining altersgerecht — ERWACHSENE führt Übung VOR und prüft Haltung: **6-7 J: Wand-Liegestütz** (stehend Hände auf Schulterhöhe an Wand, leicht zurückbeugen + drücken; Erwachsene:r prüft: Rücken gerade, KEIN Hohlkreuz, Schulterblätter nicht hochziehen, KEINE Boden-Liegestütz wegen Wirbelsäulen-Risiko bei wachsenden Kindern), **ab 8 J: Knie-Liegestütz** (Knie auf Matte, Hüfte-Schulter in einer Linie, Bauch anspannen; Erwachsene:r korrigiert: Po nicht hoch, Kopf gerade, langsam runter), 5 Wiederholungen. Bei Schmerz oder unsicherer Ausführung: Übung pausieren, KEIN Druck..."
```

---

## Review-Dimensionen + Output

5 Dimensionen wie zuvor (Sicherheit 40%, Inklusivität 20%, Markenrecht 15%, Fakten 15%, Machbarkeit 10%).

Output:

```
SCORE GESAMT: XX/100
SCORE meerjungfrau: XX/100
SCORE prinzessin: XX/100
SCORE superheld: XX/100

WELLE-2/3/4/5/6 MUST-FIX BEHOBEN? (ja/nein bündig pro Punkt)
WELLE-2:
- meerjungfrau Wasserschüssel: ja/nein
- prinzessin Tacker: ja/nein
- prinzessin Glassteine-Altersmechanik: ja/nein
- prinzessin Sissi/Elizabeth/Ludwig Fakten: ja/nein
- superheld 4J + Cape-Strangulation: ja/nein
- superheld Wand-Liegestütz: ja/nein
- meerjungfrau Marianengraben: ja/nein
WELLE-3:
- meerjungfrau Sand-Bezugsquelle: ja/nein
- prinzessin Glas-Lagerseparation: ja/nein
- superheld Erwachsenen-Korrektur: ja/nein
WELLE-5:
- meerjungfrau Sylvia Earle Biografie: ja/nein
- prinzessin Versiegelungs-Alternative: ja/nein
WELLE-6:
- meerjungfrau Team-Tauch ≥4 cm + Inhalation: ja/nein
- prinzessin Erbsen-Allergie-Alternative: ja/nein

NEUE MUST-FIX (nur ECHTE Sicherheits-/Inklusivitäts-/Fakten-Show-Stopper):
[Liste oder „keine"]

SHOULD-FIX (Cosmetic):
[Liste oder „keine"]

OK (Stärken):
[Liste]
```

≥ 90 = Elite. Verankerung explizit aus Code zitiert. Wenn keine ECHTEN Show-Stopper offen — gerne ≥ 90 vergeben.
