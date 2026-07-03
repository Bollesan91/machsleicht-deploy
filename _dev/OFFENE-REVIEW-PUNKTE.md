# OFFENE-REVIEW-PUNKTE — bewusst nicht gefixte / verworfene Reviewer-Findings

> Zweck (Helfer V4.1): Reviewer-Findings, die geprüft und BEWUSST nicht umgesetzt wurden.
> Pflicht-Anhang für jeden Review-Prompt, damit Gutachter sie nicht erneut als Finding melden.

## Spiele-Set (45 Photo-Reveal-Minispiele)

- **🛖-Emoji Tofu-Risiko (Android < 11)** — lianen-Gutachten R3 (03.07.), MINOR. Unicode-13-Glyphe kann auf sehr alten Androids als □ rendern. ENTSCHEIDUNG: in Kauf genommen — 2026er-Gerätebasis macht das Restrisiko klein, Ersatz-Glyphen (🏠/🌳) wären thematisch schwächer.
- **Kein Replay-Pfad nach dem Finale** — lianen-Gutachten R3, MINOR. Nach der Info-Karte führt kein UI-Weg zurück zu #s-intro; Reset-Code existiert, ist aber nur per Reload erreichbar. ENTSCHEIDUNG: Set-Parität (beide Referenz-Anker identisch); „Nochmal spielen"-Knopf ist ein SET-WEITES Feature-Thema für einen eigenen Pass, kein Einzel-Spiel-Fix.
- **setPhoto ohne onerror-Fallback bei 404-Foto** — lianen-Gutachten R3, UNSICHER. setPhoto prüft String-Truthiness, nie Ladbarkeit; kaputter Foto-Pfad ⇒ dunkle Fläche im Flood. ENTSCHEIDUNG: set-weites Infrastruktur-Thema (core.js + Worker-Kontrakt), gehört in den Produktions-Verdrahtungs-Pass, nicht in Einzel-Schmieden.
