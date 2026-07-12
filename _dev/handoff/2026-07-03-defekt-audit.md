# Defekt-Audit aller 45 Spiele — 2026-07-03 (AUTORITATIV: Opus 4.8 Max)

Auslöser: Bolle-Feedback (03.07.) nach huerden-Fix — „guckt mal mehr, ob solche Logikfehler drin sind" + „Blickrichtung flächendeckend ändern". Zwei read-only Workflow-Audits gelaufen:
- **Haiku 4.5** (erster Lauf, `wpoa2afph`) — überaggressiv, viele False Positives. VERWORFEN.
- **Opus 4.8 Max** (`wu4jp341e`, model:opus + effort:max, 2,75 M Tokens) — **maßgeblich.** Prompt geschärft: Pflichtfeld `glyphIsSideProfile` (frontale Gesichter = nie Facing-Bug) + Attribution präzise (kid+Spiel-Verb = Fehler, kid-als-Reveal/Gastgeber/Rollentausch = ok).

Opus vs. Haiku: Facing **7 → 1**, Logik-MAJOR-Set korrigiert (Reveal-Fehlflags freigesprochen: ei-dino, lianen, huerden, laterne, striegeln, puzzle; unterschätzte MAJORs gefangen: sternenstaub, katapult, rohre, signal, turm, fingerabdruck, stadt).

---

## Defekt-Klasse 1 — BLICKRICHTUNG: praktisch kein set-weites Thema

Opus hat Haikus 6 anderen Kandidaten sauber widerlegt:
- **jeep 🚙 / bagger 🚜 / korallen 🧜 / stadt 🦸** = bidirektionale Spurwechsler/Steuer-Sprites (`travelDir: none/ambiguous`). Keine feste Laufrichtung → ein statischer Flip wäre die Hälfte der Zeit falsch → KEIN Bug. (Vorwärts = Welt scrollt vertikal entgegen.)
- **hufeisen** = 🤠 hat schon `scaleX(-1)`, Wurf-Objekt ist ein CSS-Ring (kein Emoji, symmetrisch).
- **spuren 🦁** = frontales Löwen-Gesicht (visuell widerlegt 03.07.).

**Einziger Kandidat: faehrte-dino 🦖** — hat `scaleX(-1)` in `.dino`-Basis, Trail netto L→R (16→86, aber gewunden: 1 Links-Segment 33→24). Opus meint, 🦖 schaue default nach RECHTS → das `scaleX(-1)` drehe es fälschlich nach links → Fix „scaleX(-1) entfernen". **ABER: Glyph-Default-Richtung ist plattformabhängig — VISUELL prüfen, wenn faehrte dran ist (Lehre aus 🦁, nicht der Modell-Annahme trauen).** Gewundener Pfad → ggf. dynamischer Flip statt statisch.

→ Fazit: Der Facing-„Flächenbrand" war ein Haiku-Artefakt. Real: 1 Spiel, und das erst nach Augenschein.

---

## Defekt-Klasse 2 — ATTRIBUTIONS-UMKEHR: 20 Spiele, EIN uniformes Muster

**Das Muster (mechanisch identisch über alle 20):** Die **NOFOTO**-Win-Zeile (`#winWho`, kein Foto vorhanden) schreibt dem Geburtstagskind `${kid()}` ein **Spiel-Verb** zu, das der GAST erbracht hat: „`${kid()} hat den Code geknackt / die Mission gelöst / die Burg erobert / den Zauber gewirkt / alle sortiert`". Der Foto-Pfad ist fast überall sauber (kid() = enthülltes Reveal-Subjekt). Am schärfsten also ohne Foto.

**Unabhängig bestätigt:** Der huerden-Opus-Gutachter nannte genau das ungefragt an signal-superheld/uvschrift-prinzessin als Schwäche.

**Fix-Prinzip (kanonisch, set-weit):** NOFOTO-`#winWho` das Spiel-Verb wegnehmen → kid() als **Gastgeber/Reveal-Subjekt** ODER Gast als Akteur:
- „…${kid()} lädt dich zur X-Party ein:" (kid als Einladender), oder
- „Du hast [Verb] — es ist ${kid()}!" (Gast Akteur, kid Reveal).
Foto-Pfad meist unverändert lassen (dort ist kid() schon Reveal-Subjekt).

### Die 20 (Opus-MAJOR, NOFOTO-Attribution) — Arbeitsliste
gluehwuermchen-feen · loeschen-feuerwehr · regenbogen-einhorn · rohre-baustelle · signal-superheld · sternbild-weltraum · tatort-prinzessin · uvschrift-prinzessin · wildnis-dschungel · strahl-superheld · katapult-ritter · korallen-meerjungfrau · stadt-superheld · drehleiter-feuerwehr · sternenstaub-einhorn · akte-detektiv · perlen-meerjungfrau · taunetz-feen · turm-einhorn · fingerabdruck-detektiv

(korallen + stadt haben NUR den Attributions-MAJOR, KEINEN Facing-Bug — trotz Haiku-Flag.)

### Sauber laut Opus (kein MAJOR)
ei-dino, fossil-dino, fotosafari-safari, memory-piraten, wappen-ritter, wimmel-detektiv, schwert-ritter, flaschenpost-piraten, schatz-meerjungfrau, kanone-piraten, huerden-pferde, lianen-dschungel, spuren-safari, hufeisen-pferde, jeep-safari, bagger-baustelle — plus einige nur mit MINOR/UNSICHER (funk-weltraum, rakete-weltraum, hochhaus-baustelle, notruf-feuerwehr, tresor-prinzessin, ei-dino grenzwertig ok).

---

## ENTSCHEIDUNG (Bolle, 03.07.): STRIKT EINZELN
Kein Sweep. Pro Spiel im jeweiligen Gate BEIDE Defekte mitnehmen. Diese Liste = Arbeitsliste. Jedes Gate-Prompt prüft ab sofort zusätzlich Blickrichtung (glyphIsSideProfile-Test) + Attribution (NOFOTO-winWho). Volloutput: `tasks/wu4jp341e.output`.

Rohdaten-Fundstellen je Spiel mit wörtlichem Code-Zitat + suggestedFix stehen in `wu4jp341e.output` (all[]). Beim Fixen den Eintrag als Ausgangsdiagnose nehmen, aber am echten Code + unabhängigem Gate verifizieren.
