Ich hole mir beide Dateien.

Die Datei wurde abgeschnitten. Ich hole sie vollständig per Bash und dazu das JSON.

Jetzt das JSON prüfen und die H2-Liste + JSON-Treue checken.

**SCORE: 93 / 100 — bestanden (Schwelle 85 klar gerissen).**

Brutal-Modus vorweg: Das ist eine der saubersten Elite-Seiten, die durch diesen Loop gegangen sind. Kein Blocker, keine Halluzination, keine Marken-Leiche. Die Abzüge sind Feinschliff, kein Substanzproblem. Trotzdem unten die ehrlichen Macken.

**Einzelscores**

| # | Kriterium | Score |
|---|---|---|
| 1 | Eltern-Mehrwert | 9 |
| 2 | YMYL-Sicherheit | 9 |
| 3 | JSON-Treue | 8 |
| 4 | Marken-Sauberkeit | 10 |
| 5 | Struktur (12 H2 / 3 Var. / FAQ-Schema) | 10 |
| 6 | Eltern-Optional bei 6–8 | 10 |
| 7 | Tonalität (Mission-Modus) | 9 |
| 8 | Affiliate-Konvention | 9 |
| 9 | Schema.org valid | 9 |
| 10 | SEO | 9 |

**Stärken**

Struktur ist exakt auf Spec: genau 12 H2, drei vollständige Tab-Varianten (26/80/120 €, Schedule 6/7/8 Zeilen — deckungsgleich mit JSON), valides FAQPage. Markencheck komplett leer — kein Star Wars, Buzz, Toy Story, kein NASA/SpaceX/Disney. „Astronauten-Crew" trägt das ganze Motto generisch. YMYL ist erwachsen gelöst: zwei rote Boxen (Raketen-Experiment + Knicklicht-Schluck), Schutzbrille 2× als PFLICHT, „2 m, nicht 2 Schritte", Blindgänger-Protokoll, keine Hängelampe, Wasser-Rakete explizit als Projektil benannt. Eltern-Optional ist mehrfach korrekt verankert (absetzbar + telefonisch erreichbar, Nacht-Beobachtung und Pizza-Station hinter Opt-In). Affiliate: alle 9 Links `tag=machsleicht-21`, durchgängig `rel="noopener sponsored"`, 3× Disclosure, Optional-Produkte sauber aus der Basiskalkulation rausgerechnet.

**Schwächen**

Die FAQ-JSON-LD und das sichtbare HTML stimmen überein (6 = 6) — die klassische Rich-Result-Falle ist also vermieden. ABER: Die Quell-JSON hat nur 5 FAQ. Die 6. Frage („Müssen Eltern bleiben") wurde über die Quelle hinaus ergänzt. Inhaltlich verteidigbar (stützt Kriterium 6), aber es ist eine Abweichung vom Source — daher JSON-Treue 8, nicht 10.

Tonaler/sicherheitstechnischer Mini-Widerspruch: Die FAQ nennt die Essig-Natron-Reaktion „harmlos", während die rote YMYL-Box zu Recht Schutzbrille + Druck + unvorhersehbare Richtung betont. „Harmlos" untergräbt die ernste Box leicht.

Zwei Affiliate-URLs enthalten ein rohes „ü" (`aufblasbares+kostüm`), nicht URL-encoded. Browser fangen das ab, sauber wäre `%C3%BC`.

Kosmetik: Title nutzt En-Dash „6–8", Description nutzt Bindestrich „6-8". HowTo-Schema hat kein `image` (empfohlen, nicht Pflicht).

**Fixes (alle optional, kein Go-Live-Blocker)**

1. JSON-Treue: 6. FAQ entweder in die Quell-JSON (`weltraum-mittel.json`) nachtragen oder bewusst als Page-Enrichment dokumentieren — damit Source und Output nicht auseinanderlaufen.
2. „harmlos" in der Raketen-FAQ ersetzen durch z.B. „ungefährlich bei Aufsicht und Schutzbrille" — Konsistenz mit der YMYL-Box.
3. `kostüm` → `kost%C3%BCm` in den zwei Amazon-Links.
4. Description auf En-Dash „6–8" angleichen.

Soll ich die vier Fixes als chirurgische str_replace direkt auf die Datei anwenden und committen (`Ende deploy`), oder erstmal nur die JSON-Treue-Entscheidung von dir?