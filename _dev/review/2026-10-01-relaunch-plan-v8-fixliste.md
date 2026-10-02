# Fixliste Plan v8 → v9 (Stufe 3, Koordinator, 01.10.2026)

Grundlage: Diff-Re-Check v7→v8 (ein frischer Verifizierer): M1–M5 umgesetzt, aber 2 MAJOR + 4 MINOR — beide MAJORs gehen auf Annahmen der Fixliste v7→v8 zurück, nicht auf den Planautor. Vom Koordinator nachgemessen (`git show acebbc22:`): (1) die 6 `emoji:`-Felder in `js/motto-data.js` sind **Spiel-Karten** (🪜 walk-the-plank, ⚓, 🏴‍☠️, 🦜, ⛵, 🦈 — kuratierte Piraten-Spiele), nicht Motto-Kacheln; die Motto-Kacheln liegen in `const MOTTOS` (`kindergeburtstag.html` Alt-Zeile 1959 ff., gerendert Zeile 2343 `motto-card__emoji`) und wandern mit S30 nach `js/planen.js`; (2) der Planer trägt 16 Emoji-Codepoints außerhalb der Stufe-77-Bereiche (U+2B50 ⭐ 5×, U+25B6 ▶ 4×, U+23F1 ⏱ 4×, U+23F0, U+23F3, U+2139), darunter Bedientexte („▶ Jetzt spielen!", „⏱ Dauer flexibel") — die Regex würde sie durchlassen. Nummern N1–N6.

## MAJOR

| Nr | Planstellen | Anweisung für v9 |
|---|---|---|
| N1 (M1 b) | S11 Klasse (17), S11 Beleg, S28, S30, S24 Beleg, Prüfstand-Arm 2 | Klasse (17) neu: „`js/motto-data.js`: 8 Codepoints in 7 Zeilen (6 `emoji:`-Felder der kuratierten Piraten-Spiel-Karten + 1 Laufzeittext Alt-Zeile 268 „🚢 Jungfernfahrt-Finale") — Erwartung aus `check-emoji-icons.py --inventar`, nachher 0; **Setzung E21b (Koordinator, von Bolle zu bestätigen): Spiel-Karten im Planer werden text-only (Feld `emoji` entfällt), Spiel-Illustrationen kommen mit der Spiele-Bereinigung in Phase 6 (S57 (12))**". S11 Beleg: `grep -c 'emoji:' js/motto-data.js` = 0, `check-emoji-icons.py` auf der Datei = 0. S28/S30: Motto-Kachel-Illustrationen an `MOTTOS` in `js/planen.js` hängen (Feld `illu`, Pfad `bilder/illustrationen/<motto>-kachel.webp`), nicht an `motto-data.js`. S24 Beleg: `js/motto-data.js` zählt ab KW 43 mit Erwartung 0 (die Datei existiert seit S10). Prüfstand-Arm 2: „Schlüssel `emoji:` **oder** Codepoint in `js/motto-data.js` → rot". |
| N2 (Z1) | S24 Stufe 77, S30 Beleg, E21a-Zahlen in S24/S30 | Erkennung erweitern: `\p{Extended_Pictographic}` (Python-Modul `regex`) plus Variation Selector U+FE0F und Keycap U+20E3, zusätzlich die Bereiche U+1F000–U+1F2FF, U+2B50, U+2B55, U+231A–231B, U+23E9–23FA, U+25AA–25AB, U+25B6, U+25C0, U+25FB–25FE, U+2194–21AA, U+2139, U+203C, U+2049, U+2122, U+24C2, U+3030, U+303D, U+3297, U+3299; Ausnahmeliste bleibt (✓ ★ ⚠ nur Mess-/Protokolltexte). Alle Alt-Stand-Zahlen in S24/S30 mit dem Gate-Skript neu messen und so kennzeichnen (Koordinator-Vormessung: `kindergeburtstag.html` 496 im alten Bereich + 16 außerhalb = 512 ohne / 588 mit U+FE0F). |

## MINOR

| Nr | Planstellen | Anweisung für v9 |
|---|---|---|
| N3 (M1 c) | S28, Phase-3-Kopf | Reihenfolge-Zeile für KW 44: „S30-Inventar (Mo) → Motivliste S28 (Mo) → Bolle erzeugt Illustrationen (Di–Mi) → Konvertierung und Einbau S29/S30 (Do–So)"; Fallback aus S28 Stopp nennen (Text ohne Bild, nie Emoji). |
| N4 (F1) | S25 Beleg | „Repo-Beleg in KW 43" und „in KW 43 noch nicht existieren" (Kopf sagt KW 43). |
| N5 (F2) | S24, S30 Beleg, S45 (1) | Ausgabeformat wie Stufe 73: „Stufe 77: 0 Treffer (N geprüfte Dateien, F fehlend)"; S24 Beleg in KW 43 ehrlich: N = 1 (`js/motto-data.js`), F = L + 2 + 3; S30 Beleg: F = 0 für die Planer-Dateien; S45 (1): „F = 0, N = L + 2 + 3"; Regel: F > 0 nach S38 → rot. |
| N6 (F3) | S57, G 3/2027, Kapazitätsabsatz | **Setzung (Koordinator, von Bolle zu bestätigen):** Zyklus 1 bereinigt zusätzlich die Launch-Mottos Ritter und Piraten (Spiele `game-*-ritter|piraten.html`, `paket/ritter`, `paket/piraten`, `data/motto/ritter-*|piraten-*.json`) nach S57 (12) — Bestand aus dem Inventar, +6 h Claude in Zyklus 1 (32–36 h; bei E20 b 38–42 h); G 3/2027 und Kapazitätsabsatz nachziehen; Alternative als Option nennen: eigener Posten „Zyklus 0" vor Dino (eine Woche, ohne neue Sitemap-URL). |

**Vorgehen für v9:** Kopie von v8 als `2026-10-01-relaunch-plan-v9.md`; nur N1–N6; Folgestellen per grep (Stufe-77-Zahlen an allen Stellen, `motto-data` vs. `MOTTOS`, S57/G 3/2027); Protokoll „Änderungsprotokoll v8 → v9" (6 N-Zeilen + Folgeänderungen v9); H neu abhaken; nichts committen; v9 nach der Fertigmeldung nicht mehr anfassen.
