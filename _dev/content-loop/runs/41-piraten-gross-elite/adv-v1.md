Ich hole beide Dateien und prüfe sie gegen die JSON als Wahrheits-Anker.

Jetzt die HTML-Page im Detail.

**SCORE: 91/100 → BESTANDEN** (Schwelle 85). Ehrlicher Kontext vorweg: Die Seite ist inhaltlich stark, der Punktabzug kommt fast ausschließlich aus *einer* Achse — JSON-Treue. Das ist kein Qualitäts-, sondern ein Prozess-Problem (Anchor und Page sind auseinandergelaufen). Genau das musst du bewusst entscheiden, nicht ich.

**Einzelwertung (0–10):**

| # | Kriterium | Score |
|---|---|---|
| 1 | Eltern-Mehrwert | 9 |
| 2 | YMYL-Sicherheit | 9 |
| 3 | JSON-Treue | **6** |
| 4 | Marken-Sauberkeit | 10 |
| 5 | Struktur | 10 |
| 6 | Eltern-können-wegbleiben | 9 |
| 7 | Kognitive Forderung | 10 |
| 8 | Affiliate-Konvention | 10 |
| 9 | Schema.org valid | 10 |
| 10 | SEO | 8 |

**Stärken**

Echte Mechanik statt Themen-Anstrich: Codeknacker mit eingebautem Selbst-Check (Sortier-Regel ergibt echtes Wort), Koordinaten lesen, Beute gerecht teilen (Kopfrechnen mit Konflikt), Caesar-Chiffre als ageAdjust12. Das ist die anspruchsvollste Achse und sie sitzt.

Der kritische KOMPASS-Doppel-S-Fallstrick aus dem JSON ist sauber abgefangen ("die beiden S-Stationen … nicht über eindeutige Buchstaben"). Genau der Mechanik-Bug, an dem die Seite live hätte scheitern können — gefunden.

YMYL solide: Nacht-Route nur mit Eltern-Opt-In + vorher bei Licht abgehen, Stolperfallen-Hinweise, Knoten-Regel "nicht an Hälsen/Handgelenken", Handy-Schließfach, Heimweh-Handling, Allergen-Note an der Torte. Kosten durchgehend gehedged (~45/95/145 €, "Geschätzte Kosten").

Schema technisch sauber: 3 Blöcke (HowTo, BreadcrumbList, FAQPage) alle valide — und entscheidend: **sichtbare FAQ (6) == Schema-FAQ (6), exakt deckungsgleich.** Kein Rich-Result-Mismatch. Marke 100 % clean (0 Hook/Sparrow/Caribbean/Disney/Lego/Playmobil). Affiliate Lehrbuch: 10× `tag=machsleicht-21`, alle Such-URLs (kein hartcodiertes ASIN), `rel="noopener sponsored"`.

**Schwächen**

Die JSON-Treue ist real verletzt — zwei Punkte:

Erstens, die komplette H2 "Schatz-Krimi — Detektiv-Vertiefung" existiert *nicht* im Anchor-JSON. Inhaltlich ist sie gut (Indizienkette logisch durch Ausschluss lösbar, Bootsmann = Täter via fehlendes Alibi + Sand-Spur + Knopf — sauber konstruiert), aber sie ist erfunden gegenüber der Wahrheits-Quelle. "Gut erfunden" bleibt erfunden — der Sinn des Anchors ist Reproduzierbarkeit.

Zweitens, die FAQ wurde umgebaut, nicht gerendert. JSON hat 8 Fragen; die Seite zeigt 6 *andere*. Verschwunden: "Muss ich zeichnen können?", "…nach dem Schatz die Lust verliert?", "Geschwister einplanen?". Neu dazu (nicht im JSON): "Müssen Eltern bleiben?". Heißt konkret: dein Anchor-JSON ist jetzt veraltet/divergent gegenüber Live.

SEO, zwei Dings: Meta-Description ist **171 Zeichen** — über deinem 140–165-Fenster, Google kappt bei ~160, also Tail abgeschnitten. Und die Seite hat **0 Bilder** bei 6.437 Wörtern — kein Image-SEO, kein Alt-Text-Inventar, schwächeres Engagement-Signal. Kein Blocker, aber für eine Elite-Page auffällig nackt.

**Fix-Vorschläge**

1. Anchor-Entscheidung treffen (Pflicht, nicht kosmetisch): Entweder Schatz-Krimi + die neue Eltern-FAQ in `piraten-gross.json` **zurückspielen** (dann reconciled der Anchor) — oder beides aus der HTML raus. Aktuell lügt deine Wahrheits-Quelle. Empfehlung: backporten, der Krimi ist es wert.
2. FAQ-Set angleichen: Wenn 6 FAQ bleiben, die 8 im JSON auf dieselben 6 reduzieren (Schema bleibt ja schon konsistent — nur der Anchor muss nach).
3. Meta-Description auf ≤165 kürzen: "…Crew-Rollen, Schatz-Krimi, Zeitplan & realistischen Kosten" am Ende streichen, bei "…Codeknacker-Schatzsuche, Crew-Rollen und Schatz-Krimi." stoppen.
4. Optional 1–2 illustrative Grafiken (Beispiel-Quadrant der zerrissenen Karte, Spuren-Legende) mit beschreibendem Alt — hilft Verständnis *und* SEO. Niedrige Prio.

Kein MUST-FIX, der den Go-Live blockiert. Der einzige Punkt, den ich nicht durchwinken würde, ist #1 — solange Anchor und Page divergieren, ist der nächste Re-Review-Lauf gegen ein falsches JSON wertlos.