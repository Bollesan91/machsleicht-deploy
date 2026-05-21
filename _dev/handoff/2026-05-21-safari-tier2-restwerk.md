# Handoff: Safari Tier-2-Restwerk (3-Chat-Loop-Konsequenz)

**Datum:** 2026-05-21
**Branch:** claude/safari-elite-fixes-2026-05-21 (Tier-1 erledigt) → noch nicht in draft
**Quellen:** `_dev/content-loop/runs/11-safari-3-5-review/v3-edit-auftrag.md` + `_dev/content-loop/runs/12-safari-9-12-review/v3-edit-auftrag.md`

## Was bereits drin ist (Tier 1)

### Safari 3-5
- ✅ E1 Story-Phrase "Jede Pirsch beginnt leise." vor Pirsch-Anleitung Z.437
- ✅ E1b Urkunden-Phrase "Die Urkunde bekommt jeder Helfer — das schafft jedes Kind." in Z.213 / Z.360 / Z.569
- ✅ E2 Herde/Gruppe-Konsistenz: "fröhlichste Gruppe" → "fröhlichste Herde" (3×), "in der Gruppe" → "in der Herde"
- ✅ E3 Lizenz/Helfer-Fix: "Lizenz-Übergabe" → "Urkunden-Übergabe" (Z.376), "lauschen Ranger" → "lauschen Helfer ganz genau" (Z.614), "Junior-Helfer-Station" → "Helfer-Station" (2×)

### Safari 9-12
- ✅ E1 Line 1025 `/schatzsuche/safari` → `/kindergeburtstag?modus=schatzsuche&motto=safari`
- ✅ E2 "Sweet Spot" raus (2×: Z.353 + Z.892), Werbe-Versprechen "an die sie sich erinnern" → "von der sie auch nächstes Jahr noch erzählen"
- ✅ E3 Story-Phrase "Jede Pirsch beginnt leise." vor Tarnungs-Pirsch (Z.484)
- ✅ E4 Wasserloch im Zeitplan-Apparat raus (Z.225, 369, 659) — Story-Begriff bleibt nur im Reservat-Briefing
- ✅ E8 Z.152 paraphrasiert auf exakte Story-Doc-Phrase: "wer der Schnellste ist"

**Geschätzter Score nach Tier 1:** Safari 3-5: 79 → ~83 | Safari 9-12: 80 → ~83. Noch nicht auf 85.

## Was NICHT in Tier 1 ist — und WARUM

### Safari 3-5: Tier-2-Strukturfixes (substantielle Schreibarbeit)

**E4 — Wow-Variante ehrlich deklarieren** (Chat C Fund 1+2+3)
- *Größter Hebel.* Chat C: "Wow ist Pinterest-Theater im Tarnanzug", weil sie an einer 75m²-Solo-Mama-Realität nicht funktioniert.
- Edit: vor Z.528 (Wow-Zeitplan) eine `.tip-box` einbauen mit klarer Ansage "Wow braucht 80m²+ ODER Garten, zweite erwachsene Hand, mindestens 5-jähriges Geburtstagskind. Mit 3-Jährigen + Solo-Moderation: Standard nehmen."
- Warum nicht in Tier 1: erfordert konzeptionellen Mut — die Seite gibt zu, dass eine ihrer drei Varianten nicht für jede Familie ist. Das ist ein strategischer Pivot (Memory: "strategische Entscheidung" landet in OPEN-DECISIONS), nicht ein Polish-Edit. Bolle sollte vor dem Edit ja sagen.

**E5 — Aufblas-Kostüm auf 5-Jährige eingrenzen** (Chat C Fund 4 — Selbstwiderspruch zu Z.444)
- Edit: Z.628-635 Caveat schärfen, Kostüm explizit nicht für 3-/4-jährige Geburtstagskinder
- Warum nicht in Tier 1: berührt die Affiliate-Empfehlung (35-50€-Produkt), Bolle muss vermutlich auch die Affiliate-Strategie reviewen

**E6 — Ehrliche Vorbereitungs-Zeitsumme** (Chat C Fund 5 — "10-Minuten-Planer" wird vom Inhalt widerlegt)
- Edit: vor Wow-Einkaufsliste (vor Z.665) realistische 3-4h Basteln über 2 Abende benennen
- Warum nicht in Tier 1: könnte die Ankündigungs-Logik der Seite + Planer-Bridge-Texte beeinflussen, sollte konsistent über Page-Family gezogen werden

**E7 — Externe Ausmalbild-Links reduzieren** (Chat B NEU-1)
- Edit: Z.193, 238, 395 — 3× externe Quellen auf 1 reduzieren + Roadmap-Hinweis "bis P3-4 Druckvorlagen fertig sind"
- Warum nicht in Tier 1: braucht erst Entscheidung welcher Link bleibt + ob "Roadmap-Hinweis" stilistisch zur Seite passt

### Safari 9-12: KERN-FIX Codeknacker-Neukonstruktion

**E5 — Codeknacker komplett neu** (Chat A + Chat B + Chat C konvergent — ohne diese KEIN Go-Live)

Drei verifizierte Defekte:
1. ELZA/HZEL/FEK sind keine echten Wörter → keine Selbst-Verifikation für Kinder möglich
2. HZEL → "HELZ" HTML-Selbstwiderspruch in Z.265
3. "Mut zum Raten" Z.268 = Selbst-Entlarvung (Chat C): gutes Rätsel braucht Logik, nicht Mut

Vorgabe:
- **Echte Wörter als Lösungen.** Z.B. drei Codeknacker → `WASSER` + `FELS` + `TEMPEL` ergeben zusammen die finale Karten-Mission-Lokation
- **Eindeutige Sortier-Regel** je Quadrant: alphabetisch ODER Lebensraum-Höhe ODER Tierfamilie — eine eindeutige, im HTML benannte Regel
- **Selbst-Verifikation**: Hinweis im HTML *"Wenn das Lösungswort kein echtes deutsches Wort ist, habt ihr die Regel anders angewendet — vergleicht mit dem Beispiel-Pfeil."*
- **Druckvorlage** (Z.261 "Beispiel-Codes gibt's noch nicht" muss WEG): mindestens ein konkretes Vollbeispiel im HTML

**Warum nicht in Tier 1:** ~3-4h Konzeptarbeit + neue Tier-Daten + Rätsel-Test. Nicht "drüber drüber im Polish-Pass". Wenn Konzept nicht aufgeht, muss Codeknacker-Station als Ganze verworfen werden — was die ganze Minimal-Variante umschreibt.

**E6 — Anwärter-Lizenz entschärfen** (Chat C Fund 5 — sozialer Sprengstoff)
- Edit: Z.522+ "Anwärter-Lizenz Spurenleser" → alle bekommen volle Lizenz, Differenzierung anders (z.B. "1. Spezialist"-Stempel für den schnellsten Code-Knacker)
- Warum nicht in Tier 1: ändert das pädagogische Konzept — Bolle muss zustimmen

**E7 — Mini-Tierfigur als Mitgebsel überdenken** (Chat C Mein-Sohn-Check)
- Edit: Z.320 — als Optional-Add markieren ("für jüngere Geschwister")
- Warum nicht in Tier 1: Affiliate-relevant

**E2 (Marketing-Sound noch nicht 100% raus)** — "emotional wertvollsten Stücke" Z.599 + Z.819 noch im HTML. Habe ich in Tier 1 ausgelassen, weil unklar ob ohne Ersatz oder durch "die Stücke, die wirklich zur Party gehörten" — Bolle's Bauchgefühl entscheiden lassen.

## OPEN-DECISIONS

1. **Wow-Variante Safari 3-5: ehrlich als "nicht für jede Familie" deklarieren?** (E4 Stream 11)
   - **Pro:** Chat-C-Adversarial einstimmig, hebt Score von ~83 auf ~88
   - **Contra:** Eingeständnis dass 1 von 3 Varianten engere Zielgruppe hat → Conversion-Risk für Wow
   - **Claude's Vorschlag:** ja, ehrlich deklarieren. Eltern, die sich aktiv für Wow entscheiden, sind dann committed; die anderen kriegen Standard ohne Frust. Funnel-tauglicher als verheimlichte Komplexität.

2. **Codeknacker komplett neu bauen oder Konzept wechseln?** (E5 Stream 12)
   - **Option A:** Neue Lösungswörter (WASSER/FELS/TEMPEL) mit eindeutiger Sortier-Regel → ~3-4h
   - **Option B:** Codeknacker-Station ganz weg, Ersatz durch andere Spezial-Aufgabe (z.B. Tierspur-Vermessung mit echten Maßangaben, Geo-Caching mit Kompass-Bearings)
   - **Claude's Vorschlag:** A erst probieren. Wenn beim Re-Test mit Chat C die Wörter immer noch als willkürlich auffliegen → B.

3. **Anwärter-Lizenz entschärfen?** (E6 Stream 12)
   - **Pro:** Chat-C-Sozialsprengstoff-Befund ernst nehmen
   - **Contra:** pädagogisches Differenzierungsmerkmal gegenüber kribbelbunt/balloonas
   - **Claude's Vorschlag:** entschärfen. Anerkennung-First ist konvertierungs-stärker als Mini-Abstufung.

## Next Steps für Bolle / nächste Session

1. Tier 2 Stream 11 (Wow-Ehrlichkeit + Kostüm-Caveat) durchziehen — kann ein Subagent im Single-Chat machen, kein Loop nötig
2. Tier 2 Stream 12 Codeknacker-Neukonstruktion — Loop nötig: Schreib-Subagent + Chat-C Re-Test
3. Re-Review-Loop: gleiche 4-Tab-Pipeline mit Frage "Sind Fund 1-5 (Stream 11) / Codeknacker-Defekte (Stream 12) jetzt adressiert oder verbal kaschiert?"
4. Wenn ≥85 in Chat C → merge claude-Branch → draft → main-Deploy

## Was committed wird in claude/safari-elite-fixes-2026-05-21

- Tier 1 Edits (siehe oben) auf beiden HTMLs
- DIESES Handoff-File
- Nicht in dieser Branch: v2/v3-Reviews (sind separat auf content-loop-pipeline)
