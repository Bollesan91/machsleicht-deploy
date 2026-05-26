Ich hole mir beide Dateien und prüfe Live-HTML gegen die JSON-Vorgabe.

Jetzt das HTML. Struktur, Schema, Affiliate, und Abgleich gegen JSON.

# Helfer-v3 Adversarial-Review — `feuerwehr-9-12-jahre.html`

**SCORE: 89/100 — PASS (Schwelle 85), aber knapp und mit einem klaren Schwachpunkt: JSON-Treue.**

| # | Kriterium | Pkt |
|---|---|---|
| 1 | Eltern-Mehrwert (halb-erwachsen) | 9 |
| 2 | YMYL-Sicherheit (Wunderkerze, Sirene) | 8 |
| 3 | JSON-Treue | **6** |
| 4 | Marken-Sauberkeit | 9 |
| 5 | Struktur (12 H2, 3 Varianten, FAQ-Schema) | 10 |
| 6 | Eltern-können-wegbleiben (9-12) | 10 |
| 7 | Kognitive Forderung (Brandermittlung, 5W) | 8 |
| 8 | Affiliate-Konvention | 10 |
| 9 | Schema.org valid | 10 |
| 10 | SEO | 9 |

## Stärken
- **Struktur tadellos:** exakt 12 H2, saubere H1→H2→H3-Hierarchie, 3 Varianten mit Kosten/Zeit. Drei valide JSON-LD-Blöcke (HowTo `totalTime` PT3H + Tool, BreadcrumbList, FAQPage). **Sichtbare FAQ = Schema-FAQ (6=6), kein Rich-Result-Mismatch** — genau der Fehler, der sonst gern durchrutscht, hier sauber.
- **Affiliate textbook:** alle 8 Amazon-Links mit `tag=machsleicht-21` *und* `rel="noopener sponsored"`. Kein nackter Link.
- **Eltern-wegbleiben perfekt kalibriert:** "absetzen in Standard, völlig weg in Wow, Kinder wollen Party OHNE Eltern" — altersgerecht, mehrfach, ohne Schwurbel.
- **Kognitiver Anker echt:** 5W beim Notruf, Brandklassen, Rauchgefahr, 4 Beweise, Verdächtige, Vernehmung, Indizien. Der "Pinterest-Geburtstag wäre peinlich"-Ton trifft die Zielgruppe.
- **Ein YMYL-Detail überdurchschnittlich:** Brandermittlung nutzt **Pappe-Attrappen statt echte Streichhölzer** — explizit. Das ist mehr Sorgfalt als die JSON liefert.

## Schwächen
1. **JSON-Treue (der Hauptpunkt, −4):** Die komplette `bonusGames`-Sektion (Intro + **5 Spiele**: Lego-Lösch-Roboter, Walkie-Talkie-Großeinsatz, Brandschutz-Detektive, Hydraulische Presse, Feuerwehr-Dokumentar) fehlt restlos auf der Seite. Das ist kein Wording-Drift, das ist ein gelöschter Content-Block — und ausgerechnet die *anspruchsvollsten* Extras (Physik-Experiment, Video-Bericht) für genau die Zielgruppe. Zieht auch Krit. 1 und 7 mit runter.
2. **Wunderkerze widerspricht der JSON (YMYL + Treue):** HTML sagt *"Wunderkerze in die Mitte — alle Kinder herumstehen lassen"*. JSON sagt explizit *"nicht in die Mitte"*. Die HTML-Variante stellt Kinder rund um eine offene Flamme — die schlechtere Wahl. Der nachgeschobene Sicherheits-Block (Abstand Vorhänge, Stabfeuerzeug, ablöschen) ist gut, aber die Positionierungs-Anweisung selbst ist eine Regression.
3. **Sirene/Lautstärke nur halb abgedeckt (YMYL):** Im HTML nur *Nachbar*-Lautstärke ("runter, 10 Sek."). Der Gehörschutz-Hinweis fürs Kind ("Volume-Limits, sonst Ohrenpein") lag in der gestrichenen Walkie-Talkie-Bonusgame — mit dem Block verloren gegangen. Ohren ≠ Nachbarn.
4. **7. FAQ gedroppt:** "Welche Mitgebsel passen..." existiert in der JSON, nicht in der FAQ (nur indirekt im Mitgebsel-Block). Kein Schema-Risiko, aber Long-Tail verschenkt.
5. **Wow-Kosten weichen ab:** HTML ~180 €, JSON `estimatedCostEur: 196`. −16 €/~8 %. Intern konsistent (180/8=22,50 €), aber von der Quelle abweichend — du entscheidest, welche Zahl kanonisch ist. Standard 140 vs. 136 = trivial.
6. **Kein Datums-Stempel an Kosten** — bei Party-Budgets weniger kritisch als bei Gebühren, aber für Konsistenz mit der Bundesland-Linie fehlt ein "Stand 2026".

## MUST-FIX (chirurgisch)
1. **bonusGames-Block einfügen.** Mindestens als 13. H2 ("🧰 Bonus-Spiele zum Reinmischen") oder als `<details>` unter den Varianten. Ohne den Block ist die Seite ärmer als ihre eigene Datenquelle. **Mit der Walkie-Talkie-Karte kommt der Ohren-Lautstärke-Hinweis automatisch zurück** (löst gleichzeitig Schwäche 3).
2. **Wunderkerze-Positionierung an JSON angleichen:** "in die Mitte" → *am Rand/hinten, nicht zentral; Erwachsener zündet, Kinder mit Abstand*. Sicherheits-Block bleibt.
3. **Wow-Kosten entscheiden:** entweder HTML auf 196 € + Pro-Kind-Math auf 24,50 € korrigieren, oder JSON auf 180 senken. Aktuell widersprechen sich Quelle und Seite.

## SHOULD-FIX
- 7. FAQ (Mitgebsel) in den FAQ-Block + Schema nachziehen (paarweise, sonst Mismatch).
- "Stand 2026"-Hinweis an die Kostenblöcke.

**Verdict:** Bestanden, aber die 89 sind geschönt durch eine starke Hülle (Struktur/Schema/Affiliate je 10). Inhaltlich ist ein ganzer JSON-Block verloren gegangen und eine YMYL-Anweisung verschlechtert worden. Fix 1 + 2 sind nicht optional — danach realistisch 93–94.