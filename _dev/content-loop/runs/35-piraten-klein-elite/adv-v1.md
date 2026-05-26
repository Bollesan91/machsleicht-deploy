Beide Quellen geprüft (HTML 56,8 KB / ~4.107 sichtbare Wörter; JSON als Anker). Hier die ehrliche Bewertung — kein Schönreden.

---

**SCORE: 93/100**

Schwelle 85 klar bestanden. Go-live-fähig, mit zwei kosmetischen Fixes davor.

---

**Einzelwertung (0–10)**

| # | Kriterium | Pkt | Begründung |
|---|---|---|---|
| 1 | Eltern-Mehrwert | 9 | SOS-Plan, Vorbereitungs-Fahrplan, per-Spiel-`prepText`, Opt-Out-Hinweise — konkret, nicht generisch |
| 2 | YMYL-Sicherheit | 9 | Ersticken 3×, Wasser „nie unbeaufsichtigt", Seil nie um Hals, rutschfest. Kleine Lücke s.u. |
| 3 | JSON-Treue | 8 | Inhalt treu, aber Title + MetaDesc bewusst neu geschrieben (zurecht — JSON-Werte waren defekt) |
| 4 | Marken-Sauberkeit | 10 | 0 Treffer auf Hook/Sparrow/Disney/One-Piece/Störtebeker. Sauber. |
| 5 | Struktur | 10 | 12 H2 ✓, 3 variant-tabs + 3 variant-panels ✓, FAQ-Schema ✓, signatureRitual ✓, Breadcrumb ✓ |
| 6 | Eltern-bleiben | 10 | „Pflicht bei 3-5" sichtbar (FAQ) + im HowTo + im Intro Z.150 |
| 7 | Tonalität | 10 | „ohne Wettkampf, alle finden gemeinsam", ruhig, Opt-Out — vorbildlich |
| 8 | Affiliate | 10 | 15 Links, alle `tag=machsleicht-21`, alle `rel` mit `noopener sponsored` |
| 9 | Schema.org | 10 | HowTo valide (5 Steps, totalTime, Tool); FAQPage 6 Q/6 A = deckungsgleich mit sichtbarem HTML |
| 10 | SEO | 10 | Title 50 Z., Desc 161 Z., `index,follow`, canonical, OG-Image liefert HTTP 200 |

---

**STÄRKEN**

1. **FAQ-Schema ohne Rich-Result-Risiko.** 6 sichtbare Fragen = exakt 6 im JSON-LD. Kein Mismatch — der typische Stolperstein aus deiner Pipeline ist hier sauber.
2. **YMYL ist nicht abstrakt, sondern pro Spiel verdrahtet.** Schoko-Goldmünzen-Erstickungsrisiko an 3 Stellen, davon einmal explizit „nur EINE ins Tauch-Spiel". Wasserschüssel „nie unbeaufsichtigt", Seil nie um Hals/Handgelenk, Inseln rutschfest.
3. **Säbel-Risiko komplett umgangen statt entschärft** — „ohne Säbel, ohne Wettkampf" zieht sich durch Title, Desc und Intro. Sicherste Lösung für 3-5.
4. **Eltern-Anwesenheit als Pflicht** dreifach abgesichert (Intro Z.150, FAQ, HowTo-Step „Piraten-Versprechen einsprechen"). Die FAQ #6 wurde gegenüber dem JSON (nur 5) ergänzt — richtige Entscheidung.
5. Affiliate- und OG-Hygiene tadellos; OG-Image existiert real im Repo.

---

**KRITISCHE SCHWÄCHEN** (mit Zeilen)

1. **Säbel-aus-Pappe-Fall nicht abgedeckt (Z.57, Z.150).** Die Seite entfernt Säbel komplett — gut. Aber dein Review-Kriterium nennt „Säbel-aus-Pappe" explizit. Eltern, die *trotzdem* einen Pappsäbel basteln (häufig bei Piraten), bekommen null Guidance (keine spitzen Enden, nicht ins Gesicht). Lücke ist verteidigbar, aber sie existiert.
2. **Kosten ohne Datierung (Z.30, Z.150, Z.249).** 35/55/80 € stehen ohne „Stand 2026". Bei Geburtstag unkritisch (illustrativ, nicht reguliert), aber ein „Preis-Richtwert, Stand Mai 2026" erhöht Trust und ist deine eigene YMYL-Konvention aus dem ruhig-Projekt.
3. **JSON-Anker vs. HTML divergiert bei Title/Desc (JSON-Title 41 Z. / Desc 237 Z. → HTML 50 / 161).** Das HTML hat es korrekt gefixt (JSON-Desc war 72 Z. über Limit). Aber: das JSON ist damit *stale*. Prozess-Flag, kein Seitenfehler — sonst läuft der Anker bei der nächsten Page der Wahrheit hinterher.

---

**FIX-VORSCHLÄGE (priorisiert)**

1. **P2 — Pappsäbel-Satz ergänzen** (in FAQ #2 oder im Eltern-Tipp): Ein Halbsatz „Wenn doch ein Säbel sein soll: nur weicher Schaumstoff/Pappe ohne spitze Enden, nicht ins Gesicht." Schließt die einzige echte YMYL-Lücke.
2. **P3 — Kosten datieren:** „~35 €" → „~35 € (Richtwert, Stand 2026)" einmalig pro cost-box (Z.249 ff.). Reiner Trust-Gewinn, kein Inhaltsrisiko.
3. **P4 — JSON-Anker nachziehen:** `title` und `metaDescription` in `piraten-klein.json` auf die HTML-Werte angleichen, damit der Wahrheits-Anker nicht das Falsche behauptet. Betrifft nicht diese Page, aber die Pipeline-Integrität.

Keiner dieser Punkte ist ein Blocker. Die Seite ist eine der saubersten 3-5-Pages, die durch diesen Loop gelaufen sind — die Punkte oben sind Feinschliff, kein MUST-FIX.