# Re-Score-Welle: Simon-Klasse (Wow-Kopplung) — 2026-07-01

## Kontext
Nach Wow-Kopplung (Reveal an Mechanik: Foto schärft sich progressiv mit jedem richtigen Signal)
der 3 Simon-Spiele → unabhängiger claude.ai-Reviewer (Opus 4.8 Hoch, 3 frische target-blinde Tabs,
Bolle-Device). Rubrik: 4 Achsen (Einladung/Wow/Viral/Spielbarkeit) + Gates (Kindeswohl/kein-Scheitern/Deutsch).
Scores nur Telemetrie (nicht sessionübergreifend vergleichbar).

## Scores

| Spiel | Einladung | Wow | Viral | Spielbarkeit | Gesamt | Chat |
|---|---|---|---|---|---|---|
| Funk-Weltraum | 74 | 81 | 70 | 80 | 76 | ef439e4d |
| Signal-Superheld | 71 | 82 | 59 | 86 | 74 | 0e821f60 |
| Glühwürmchen-Feen | 80 | 82 | 66 | 88 | 79 | 5cc305b3 |

Kein Gate ausgelöst (alle: no-fail via Tipp+Endlos-Retry bestätigt, Deutsch sauber, Kindeswohl ok).

## Zentrale Befunde (von allen 3 Reviewern unabhängig)

1. **Wow-Kopplung VALIDIERT.** Wow 81–82. Wörtlich: „Reveal erwächst aus der Mechanik, nicht angeklebt",
   „kausal-verdient", „echter mechanischer Höhepunkt". A/B-Frage: **alle 3 → B (progressiv) schlägt A (Endkarte) klar.**
   → Der Hebel wirkt. Ausrollen lohnt.

2. **Der 90-Deckel ist jetzt VIRAL (Originalität), nicht mehr Wow.** Viral 59–70. Wörtlich:
   „Simon ist ein Reskin → harter Abzug (MAJOR für die Ceiling)"; „90+ nur bei herausragendem Wow UND
   Originalität — Originalität ist Reskin-Niveau." → **Wow-Kopplung allein bringt Simon-Spiele nicht auf 90;
   die Mechanik selbst müsste original sein.** Realistischer Deckel Simon-Klasse: ~80–83.

3. **Einladung 71–80** gedrückt durch: Party-Fakten als „Nachlieferung"/separate Karte + RSVP-Handoff ans
   Elternhandy = Funnel-Bruchstelle (produktweit, nicht spielspezifisch).

## Stufe-3-Verifikation der Findings

- **VALID → umgesetzt:** „Linearer Deblur macht den bekannten Freund schon bei ~60 % erkennbar → Schluss-Snap
  verpufft." Fix: Blur-Kurve auf `1−f²` (hinten gewichtet) in allen 3 sharpen(). Verifiziert Funk GOAL=4:
  14→13,1→10,5→6,1→0 (Snap 6,1→0 = größter Sprung); Deckkraft bleibt linear (frühes Feedback).

- **FALSE POSITIVE (Dossier-Artefakt, kein Code-Bug):** Funk-Reviewer flaggte „Blur-Leiter 14→10,5→7→3,5→0 auf
  N=4 hartkodiert → bei 3/5 Signalen kaputt (MAJOR)". Ursache: ich hatte im Dossier die konkrete GOAL=4-Leiter
  beschrieben. Echter Code: `sharpen(seq.length/GOAL)`, blur=`max*(1-f²)` → **teilt dynamisch durch GOAL, jede
  Altersgruppe landet beim letzten Signal auf blur 0.** Verifiziert diese Session: signal GOAL=3 →…→0, glühwürmchen
  GOAL=5 →…→0. Reviewer-„Fix" („Blur ÷ N") = genau was der Code tut. **Lektion: Dossier generisch beschreiben,
  nicht die eine konkrete Alters-Leiter** (signal/glühwürmchen-Dossiers taten das → kein Fehlalarm dort).

- **MINOR akzeptiert:** „Tipp-Spam verwässert das verdiente Gefühl" — Trade-off für den no-fail-Gate, bleibt.

- **UNSICHER produktweit:** Reveal-Foto in weiterleitbarem WhatsApp-Link = Privacy-Fläche (bekannt: Party-eigenes
  Foto, Opt-in). Nicht spielspezifisch.

## Strategische Konsequenz (ehrlich)
„Alle Spiele auf 90" ist für Simon-/Generik-Reskin-Klassen NICHT durch Politur erreichbar — Viral (Originalität)
deckelt strukturell bei ~60–70, und die Rubrik verlangt Wow UND Originalität für 90+. Wege zu echten 90:
- **(A) Elite-Subset:** Spiele mit motto-nativer Original-Mechanik, wo die Mechanik = der Reveal ist (Vorbild
  ei/fossil: Schlüpfen/Wischen). Diese auf 90; Reskins bewusst auf ~80–83 belassen. (passt zu Elite-Pool-Picker.)
- **(B) Reskin-Mechaniken motto-original neu erfinden** (großer per-Spiel-Aufwand).
- Wow-Kopplung + Back-Weight lohnt trotzdem flächig: hebt Reskins von ~74 auf ~79–83 und macht jeden Reveal „verdient".

## Nächste Schritte
- Wow-Kopplung + Back-Weight auf Connect + Wimmelbild ausrollen (Foto formt sich beim Verbinden/Finden).
- Bolle-Entscheidung: Elite-90 vs. Reskin-Redesign vs. „gut genug bei ~82 flächig".
