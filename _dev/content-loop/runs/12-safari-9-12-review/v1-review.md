# Review: safari-9-12-jahre.html (Reviewer-Chat A)

## 1. Self-Score nach Rubrik

| Dimension | Punkte | Begründung |
|---|---|---|
| **Mehrwert** | 19 / 25 | Codeknacker-Beispiele sind nominell konkret (ELZA, HZEL, FEK), aber die Lösungslogik bröckelt bei genauem Hinsehen — siehe schwächste Stellen. Foto-Aufgaben und Spuren-Test sind dagegen wirklich umsetzbar. |
| **Lesefluss** | 16 / 20 | Bolle-Ton trifft 80% — "Topfschlag" im Intro sitzt, "verkindischend" wird viermal genutzt. Stellenweise Werbe-Marketing-Sound ("der Sweet Spot", "das ist die Party, an die sie sich nächstes Jahr noch erinnern"). |
| **Konkurrenz-Differenzierung** | 17 / 20 | Spezialisierungs-Mechanik ist substantiell echt (jeder Quadrant nur lösbar durch Spezialisierung X). Schlafparty-Anschluss + Nacht-Safari + Wahl-Reihenfolge sind drei echte Differentiatoren gegen kribbelbunt. Aber: die "Wow"-Variante kopiert in der Karten-Mission die Standard-Mission fast 1:1 — fühlt sich nach "doppelt vermessen" an. |
| **Schema-Korrektheit** | 13 / 15 | HowTo + Breadcrumb + FAQPage valide JSON. Aber: FAQPage-Schema-Antwort zu "Schlafparty" sagt "Maximale Schlafparty-Gruppe 6-8" — `<details>`-Antwort sagt erst "6-8" am Ende, aber im Frage-Text "Funktioniert ... als Schlafparty" ohne diese Klammer. Minor mismatch in Detail-Tiefe (Schema gekürzt) — akzeptabel, aber nicht strikt identisch. |
| **Mobile-Lesbarkeit** | 7 / 10 | Mobile erste 2 Screens: Logo + Breadcrumb + H1 + Intro + CTA + age-intro-Box (7 Punkte). Spezialisierungs-Idee, Zeitplan, Kosten erst weiter unten. Nicht schlecht, aber die `.age-intro` mit 7 bullet-points ist mobile recht lang und schiebt das eigentliche Differentiator-Element (Spezialisierungs-Grid) erst nach ca. 3. Scroll-Screen. |
| **Internal-Links** | 3 / 5 | Planer (mehrfach), Einladung, Partyseite, 3-5 + 6-8-Altersgruppen, Detektiv/Weltraum/Piraten/Sport-Verwandt-Mottos sind drin. **ABER:** Line 1025 verlinkt noch auf `/schatzsuche/safari` (alte Convention) statt `?modus=schatzsuche&motto=safari` — Inkonsistenz mit den 3 anderen korrekt umgestellten Links. |
| **CTA-Klarheit** | 5 / 5 | Sticky-Bar mit 3 klaren Buttons, mehrere primäre CTAs ("Safari-Expedition planen"), sekundäre Buttons am Ende eindeutig. |
| **Total** | **80 / 100** | |

Self-Audit war 96. Mein Score liegt 16 Punkte tiefer — Sycophancy-Verdacht ist berechtigt, vor allem in den Game-Detail-Texten (siehe unten).

---

## 2. 3 stärkste Sektionen

- **Line 156-168:** Age-Intro mit 7 Punkten — jeder Punkt ist 9-12-spezifisch, kein Copy-Paste-Ton. "Verkindischen wird sofort gemerkt und mit Augenrollen quittiert" ist genau der Bolle-Ton, der Mama um 22:30 erreicht.
- **Line 394-397:** "Brief der Reservat-Leitung" als wörtlich vorlesbare Mission-Setup-Passage. Ist konkret, kurz, ernsthaft — kein "Komm Ranger Mia"-Verkindischen. Müde Mutter kann es ablesen.
- **Line 484-501:** Tarnungs-Pirsch mit Wahl-Mechanik (leicht/mittel/hart). Echtes 9-12-Konzept: Selbst-Einschätzung wird zum Lern-Moment, die "Sicher, dass das eure Stufe ist?"-Reaktion bei 12-Jährigen ist pädagogisch klug formuliert.

---

## 3. 5 schwächste Stellen

- **Line 264-266: Codeknacker-Lösungslogik bricht zusammen.** "Lösungswort ELZA" — aber das ist die Reihenfolge von vier Tier-Anfangsbuchstaben "in Reihenfolge groß→klein sortiert" (E-L-Z-A). Dass das ein "Wort" sein soll, ist Quatsch. Ähnlich Line 265: "HZEL sortiert ergibt HELZ" — sortiert wonach? Alphabetisch wäre EHLZ. Das ist Pseudo-Logik. → **Fix:** Lösungswörter müssen entweder echte Wörter sein oder die Sortier-Regel muss eindeutig sein. Konkret: Tiere so wählen, dass die Anfangsbuchstaben in einer logischen Reihenfolge (Lebensraum-Höhe, Größe) ein echtes Wort wie "ZELT" oder "WIND" ergeben.

- **Line 730: Lösungswort der Wow-Schatzsuche ist mathematisch unmöglich.** "Station 2: Foto-Code → Antwort: das Tier dessen Auge gezeigt wird, ist nicht eindeutig (gehört z.B. zu mehreren) → E für 'Eindeutigkeit' oder konkret der Anfangsbuchstabe der finalen Tier-Auflösung." — Das ist zwei verschiedene Antworten in einem Satz. Eltern können das nicht umsetzen. → **Fix:** Eine Antwort. Empfehlung: "Auge gehört zum Elefanten → E". Punkt.

- **Line 731: Spuren-Code-Antwort schwammig.** "Schlangen-Kriechspur → M (für 'Mamba' als Beispiel)" — warum M und nicht S für Schlange? Müde Mutter scheitert hier. → **Fix:** Klare Zuordnung: "Schlangen-Spur → S".

- **Line 320: Mini-Tierfigur passend zur Spezialisierung — die Zuordnung ist arbiträr.** "Späher: Antilope, Foto: Zebra, Spur: Schlange". Warum kriegt der Fotograf das Zebra (Streifen-Foto-Klischee, ok), der Späher die Antilope (warum, beobachtet die mehr als andere?)? → **Fix:** Klare Story-Logik in Klammer: "Späher: Adler (Blickfeld), Foto: Zebra (markante Muster), Spurenleser: Schakal (Spurensucher)".

- **Line 1025: Schatzsuche-Link ignoriert die neue URL-Convention.** `/schatzsuche/safari` statt `/kindergeburtstag?modus=schatzsuche&motto=safari`. Inkonsistent mit Line 638, 675, 725, 738. → **Fix:** Link anpassen auf `/kindergeburtstag?modus=schatzsuche&motto=safari` für Konsistenz mit der gestern eingeführten Convention.

---

## 4. Story-Konsistenz-Check gegen safari-story.md

- **Expedition-Rolle / Spezialisierung — konsequent durchgezogen?** Ja, sehr konsequent. Spezialisierung wird in der Begrüßung gewählt (Line 175-186), zieht sich durch alle 5 Stationen (Sonder-Aufgabe pro Spezialisierung explizit ausgewiesen), kulminiert in der Karten-Vermessungs-Mission (Line 526-553) und der Lizenz-Vergabe nach Titel (Line 591). Das ist die Stärke der Seite.
- **Reservat-Sprache vs. generisch:** Konsequent. "Reservat-Karte", "Reservat-Leitung", "Wasserloch" (für Pizza-Pause), "Wilderer-Zonen", "Tempel". Keine generischen "Spiel 1, Spiel 2"-Bezeichner — Stationen heißen "Tier-Identifikations-Test (Späher-Hauptstation)" etc. Gut.
- **4 wiederverwendbare Story-Phrasen — wie viele sind drin?**
  - "Im Reservat zählt nicht, wer der Schnellste ist — sondern wer hinschaut." → **2× drin** (Line 152 + Line 247) ✓
  - "Jede Pirsch beginnt leise." → **fehlt** ✗
  - "Ein guter Ranger kennt seine Herde beim Namen." → **fehlt** ✗ (statt dessen "Mehrheits-Entscheidung der Herde" Line 231 — Herde-Begriff wird genutzt, aber nicht die Phrase)
  - "Die Lizenz bekommt, wer alle Stationen besteht — und das schafft jeder." → **abgewandelt** (Line 521-522 thematisiert das Gegenteil: "Anwärter-Lizenz" bei Nicht-Bestehen — bewusste Differenzierung zu 6-8, wo jeder besteht). Das ist eine Entscheidung, kein Fehler, aber die Wiedererkennungs-Phrase fehlt.

→ **Empfehlung:** Mindestens eine zweite Story-Phrase einbauen ("Jede Pirsch beginnt leise" passt z.B. an die Tarnungs-Pirsch-Station Line 484 oder Nacht-Safari Line 753).

---

## 5. Wortverbot-Check

- "in diesem Artikel" — **0 Treffer** ✓
- "wir alle wissen" — **0 Treffer** ✓
- "natürlich" — **0 Treffer** ✓
- "selbstverständlich" — **0 Treffer** ✓
- "überraschend" — **0 Treffer** ✓
- "Beute / Jagd / Erlegen" — **0 echte Treffer** (1 Falsch-Treffer "Beutel" / "Backofen" — beides ok)
- "es ist empfehlenswert / darüber hinaus" — **0 Treffer** ✓
- Mama-Buzzword-Bingo: keine "Wertschätzung", "Achtsamkeit", "Empowerment", "stärken-orientiert" — sauber.

**Aber:** Marketing-Sound-Treffer (kein hartes Verbot, aber Bolle-Ton-Verstoß):
- Line 353: "Der Sweet Spot für 9–12" — Anglizismus-Marketing
- Line 353: "Das ist die Party, an die sie sich nächstes Jahr noch erinnern" — Werbeversprechen
- Line 599 + 819: "die emotional wertvollsten Stücke" — leichtes Pinterest-Vokabular

→ Nicht harte Verstöße, aber stilistisch nicht ideal. 2-3 Wortverwerfungs-Kandidaten.

---

## 6. Kosten-Konsistenz-Check

- **Cost-Box-Werte:**
  - Minimal 41 € (Line 342)
  - Standard 92 € (Line 622)
  - Wow 142 € (Line 849, ohne Highlights)
- **Einkaufslisten-Summen nachgerechnet:**
  - Minimal: 5+3+5+10+3+5+6+0+4+0 = **41 €** ✓
  - Standard: 5+5+5+7+0+5+12+14+6+9+4+5+3+12 = **92 €** ✓
  - Wow (ohne Highlights = nur Standard-Items + Bandanas + Marker + A3-Karte + Logbuch): 6+5+12+5+5+7+7+18+20+8+10+5+6+6+4+18+0 = **142 €** ✓
- **FAQ "Kosten":** Line 956 sagt "41 €", "142 €", "92 €" — matcht Cost-Box. ✓
- **FAQPage-Schema:** Line 994-995 sagt identisch "41 €... 142 €... 92 €". ✓
- **Mitgebsel-pro-Kind:**
  - Minimal "~3 €" (Line 323), Standard "~6 €" (Line 599), Wow "~12 €" (Line 819) — werden in den Einkaufslisten nicht explizit als Subsumme aufgeführt, sind aber plausibel-konsistent mit den Listen.

→ **Kosten-Konsistenz: vorbildlich.** Keine Inkonsistenzen.

---

## 7. Empfehlung & Score-Bewertung

**Self-Audit war 96 — mein Score: 80. Das ist ein 16-Punkte-Gap und sycophancy-typisch.**

Wo Sycophancy beim Self-Audit:
- Codeknacker-Logik wurde nicht stress-getestet. "ELZA / HZEL sortiert ergibt HELZ" ist Pseudo-Mathematik, die ein 12-Jähriger in 30 Sekunden zerlegt — und damit die Selbstverantwortlich-Mission ad absurdum führt. Self-Audit hätte das fangen müssen.
- Die zwei Wow-Story-Beats ("Karte vermessen" → "Wilderer haben die Karte abgefangen") werden präsentiert, ohne zu reflektieren, dass es eine inhaltliche Wiederholung der Karten-Mission ist. Die Mission-Briefing-Story ist clever ("frisch erworbene Skills im echten Einsatz"), aber die ausgeführten Schatzsuche-Stationen (Line 728-733) sind im Kern dieselben Test-Aufgaben wie die 5 Standard-Stationen.
- Schatzsuche-Convention-Link Line 1025 wurde übersehen.

**Score 80 — unter 85 → 3 konkrete Edits, die Score über 85 heben würden:**

1. **Codeknacker-Logik fixen (Line 264-266 + 730-731).** Lösungswörter müssen echte Wörter sein oder die Logik muss eindeutig sein. Müde Mutter muss in 2 Minuten verstehen können, was die Lösung ist. → **+5 Punkte Mehrwert.**

2. **Schatzsuche-Link Line 1025 angleichen** an die neue `?modus=schatzsuche&motto=safari`-Convention. → **+2 Punkte Internal-Links.**

3. **Mindestens eine 2. Story-Phrase einbauen** ("Jede Pirsch beginnt leise" passt an Line 484 Tarnungs-Pirsch oder Line 753 Nacht-Safari). → **+1 Punkt Konkurrenz-Differenzierung** (Wiedererkennung der Safari-Reihe stärken).

→ Nach diesen 3 Edits: ~88 Punkte. Ready for Chat C.

**Wichtigster 1 Edit:** Codeknacker-Lösungslogik fixen. Wenn ein 12-Jähriger die Codes-Aufgaben löst und merkt, dass die "Lösung" nur durch erzwungenes Sortieren funktioniert, kippt die Glaubwürdigkeit der ganzen "Wir behandeln euch ernst"-Mission. Das ist der einzige strukturelle Schwachpunkt — alles andere ist Polish.
