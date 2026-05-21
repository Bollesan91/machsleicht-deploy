# v3 Edit-Auftrag: safari-3-5-jahre.html

## Score-Konvergenz nach 3-Chat-Loop

| Reviewer | Score | Kernbefund |
|---|---|---|
| Chat A (v1) | 79/100 | Schatzsuche-Link fehlt, Story-Phrasen, Lizenz-Inkonsistenz |
| Chat B (v2 Challenger) | 82-83/100 | Chat A's Schatzsuche-Befund + Minimal-Zeitplan-Befund **halluziniert** |
| Chat C (v2 Adversarial) | 71/100 | **Wow-Variante ist Pinterest-Theater im Tarnanzug** |

**Realistischer Score: 73-78/100.** Über 85 nur mit Wow-Strukturfix.

## Verworfene Chat-A-Befunde (Chat B verifizierte gegen Quelltext)

| Chat-A-Behauptung | Status | Warum verworfen |
|---|---|---|
| "Schatzsuche-Link fehlt" als Internal-Links-Abzug (2 Punkte) | **VERWORFEN** | Quellen-Pack Z.45: "Safari 3-5 hat keine Schatzsuche-Variante per Story-Doc" — Chat A wertet gegen die eigene Rubrik ab |
| "Minimal-Zeitplan keine Atempause vor Z.200" | **VERWORFEN** | Z.193-198: Ausmalbilder als Wartezeit-Beschäftigung existieren bereits |
| "HowTo-Step 2 Schema-Inkonsistenz (Z.43)" | **VERWORFEN** | Phantom-Befund: HowTo beschreibt generisches Konzept, nicht Minimal-spezifisch |
| "Pirsch nur 5×" | **VERWORFEN** | Real ~13 Prosa-Treffer (Chat B grep) |

## Edits (konvergent, in dieser Reihenfolge)

### Tier 1 — Schnelle Polish-Edits (~30 Min, +3-5 Punkte)

**E1 — Story-Phrasen einbauen** (Chat A + Chat B übereinstimmend)
- *"Jede Pirsch beginnt leise."* als kursiver Standalone-Satz vor Z.437 (Pirsch-Anleitung Standard) UND vor Z.594 (Pirsch-Anleitung Wow)
- Adaptierte Urkunden-Phrase: *"Die Urkunde bekommt jeder Helfer — das schafft jedes Kind."* in Z.213, 360, 569 (Helfer-Urkunden-Übergaben)

**E2 — Herde/Gruppe-Konsistenz** (Chat B verifiziert: nur 3× "Herde" gegen 4× "Gruppe")
- Z.160 *"kippt selbst die fröhlichste Gruppe"* → *"kippt selbst die fröhlichste Herde"*
- Z.438 *"in der Gruppe"* → *"in der Herde"*
- Z.791 FAQ *"Gruppe in Müdigkeit"* → *"Herde in Müdigkeit"*
- Z.824 (JSON-LD-Pendant zu 791) entsprechend anpassen

**E3 — Lizenz/Helfer-Konsistenz** (Chat A verifiziert)
- Z.376 *"die Lizenz-Übergabe"* → *"die Urkunden-Übergabe"*
- Z.614 *"Im Reservat lauschen Ranger"* → *"Im Reservat lauschen Helfer"*
- Z.626 *"Junior-Helfer-Station"* → *"Reservat-Helfer-Station"*

### Tier 2 — Strukturelle Wahrheits-Edits (~1h, +5-8 Punkte, Chat-C-Hebel)

**E4 — Wow-Variante ehrlich deklarieren** (Chat C Fund 1+2+3)
- In den Wow-Block (Z.528-545) einen `.tip-box` vor dem Zeitplan einbauen:
  > **Wow ist nicht für jede Familie ehrlich.** Wow braucht: 80m²+ Wohnfläche oder Garten, eine zweite erwachsene Hand (Partnerin, Oma, befreundete Mama), und mindestens ein 5-jähriges Geburtstagskind. Mit 3-Jährigen + Solo-Moderation: **Standard nehmen**, nicht Wow. Wer Wow trotzdem will: vorher mit der zweiten Hand absprechen, wer Stationen führt und wer Trostkontakt für überreizte Kinder ist.

**E5 — Aufblas-Kostüm auf 5-Jährige eingrenzen** (Chat C Fund 4 — Selbstwiderspruch zu Z.444 "KEIN Löwen-Brüllen für 3-Jährige")
- Z.628-635 Wow-Highlight-Block: Caveat schärfen
- Vor "Pumpe macht Geräusch"-Vermarktung diesen Satz: *"Nur für 5-jährige Geburtstagskinder. Bei 3- oder 4-Jährigen ist das Risiko hoch, dass Lärm + Kontrollverlust am eigenen Körper im falschen Moment (Urkunden-Übergabe) einen Meltdown auslöst. Wer ein 3-jähriges Geburtstagskind hat: Wow ohne Highlight nehmen oder Highlight durch [zweites markantes Element] ersetzen."*

**E6 — Ehrliche Vorbereitungs-Zeitsumme** (Chat C Fund 5 — der "10-Minuten-Planer"-USP wird vom Inhalt widerlegt)
- Neuer Block vor "Einkaufsliste Wow" (vor Z.665): *"Realistische Vorbereitungs-Zeit Wow: ~3-4 Stunden Basteln über 2 Abende (Stirnbänder, Urkunden, Pfoten, Memory, Tarn-Quadrate, Geräusche-Karten, Foto-Ecke). Plus 1h Einkauf. Wer das in 1 Stunde schaffen will: Standard nehmen, das geht ehrlich in 2h Basteln + 30min Einkauf."*

### Tier 3 — NEUE Schwächen aus Chat B (~15 Min, +1-2 Punkte)

**E7 — Externe Ausmalbild-Links reduzieren** (Chat B NEU-1)
- Z.193, 238, 395: 3× mowoli.de/kinder-malvorlagen.com auf 1 zentrale Quelle reduzieren
- Begleitsatz: *"(Bis unsere eigenen Druckvorlagen fertig sind. Roadmap: P3-4)"*

**E8 — YouTube-Hinweis als "Eltern suchen vorab raus"** (Chat B NEU-2)
- Z.258, 611: YouTube-Deeplinks behalten, aber Eltern-Disclaimer:
  > *Eltern suchen die Geräusche vorab raus (Auto-Play-Werbung sonst möglich)*

**E9 — OG-Bild alters-differenziert** (Chat B NEU-3, kosmetisch)
- Z.10/14/20/22 OG/twitter:image → eigener `og-safari-3-5.png` (separates PBI)

## Was NICHT gemacht wird

- **Schatzsuche-Generator-Link einbauen** — Chat B verifiziert: Quellen-Pack schließt das explizit aus
- **"Minimal-Zeitplan vorher 5 Min basteln einbauen"** — bereits da (Chat A halluzinierte)
- **Title umbauen auf "3-4-5 Jahre"** — Chat A schlug vor, beide v2-Reviewer schweigen dazu = nicht prioritär

## Schwelle für Re-Review (v4-Adversarial)

Nach Tier 1+2: nochmal Chat C anwerfen mit Frage *"Sind Fund 1-5 jetzt adressiert oder nur verbal kaschiert?"*. Wenn ≥85 → Deploy-Ready. Sonst Iterationsrunde.
