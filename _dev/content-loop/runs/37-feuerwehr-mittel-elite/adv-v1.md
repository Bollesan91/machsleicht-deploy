**SCORE: 91 / 100 — PASS (Schwelle 85)**

Einzelwertung (0–10):

| # | Kriterium | Score | Anmerkung |
|---|-----------|:---:|---|
| 1 | Eltern-Mehrwert | 9 | Fahrplan + SOS + 3 Budgets + echte Skills |
| 2 | YMYL-Sicherheit | 8 | Sirene/Nebel top, Schaum-Augen nicht am Spiel selbst |
| 3 | JSON-Treue | **6** | Zwei Abweichungen vom Anker (siehe unten) |
| 4 | Marken-Sauberkeit | 10 | 0 Disney/M&M/Smartie/Capri/Haribo |
| 5 | Struktur | 10 | 12 H2, 3 Varianten, FAQ + HowTo, Schicht-Appell |
| 6 | Eltern-Optional 6-8 | 10 | „telefonisch erreichbar reicht" explizit |
| 7 | Tonalität | 9 | Echte Crew, kein Infantil-Vokabular |
| 8 | Affiliate-Konvention | 10 | 15/15 Links sauber |
| 9 | Schema.org | 10 | 3 valide Blöcke, FAQ LD↔sichtbar deckungsgleich |
| 10 | SEO | 9 | Title 52, Desc 147, Canonical/OG/lang ok |

---

**Stärken (keine Schmeichelei, einfach Fakten):**

- **YMYL Nebel/Asthma ist vorbildlich.** „Asthma vorher mit Eltern absprechen — bei Verdacht NICHT durchführen", Wasserbasis-Fluid, Lüften + eigenes SOS-Szenario. Das ist die Sorte Realismus, die Rich-Result-tauglich UND haftungsarm ist.
- **Sirene sauber entschärft:** „Lautstärke moderat — nicht direkt am Ohr, bei Lärm-Sensibilität" + Nachbarn-SOS. Kein „30 Sek voll aufdrehen"-Quatsch.
- **FAQ-Schema = sichtbares HTML, 6 zu 6, identische Fragen.** Genau der Mismatch-Bug, den du sonst jagst, ist hier NICHT da. Sauber.
- **Affiliate + Marken makellos.** 15/15 Amazon mit `tag=machsleicht-21`, `rel="noopener sponsored"`, `target=_blank`. Null Fremdmarken.
- **educationalValue ist ehrlich** („keine Marketing-Versprechen", Verweis auf Deutsche Brandschutzerziehung ab 5). Kein Über-Versprechen → YMYL-konform.

**Schwächen (das, was den Score drückt):**

1. **Wow-Kosten widersprechen dem Wahrheits-Anker.** JSON `estimatedCostEur: 159`, HTML durchgängig **~135 €** (6×, inkl. costContext-Begründung „Nebelmaschine wiederverwendbar"). Intern konsistent, aber ein klarer Anker-Bruch von ~15 %. Einer von beiden lügt — und laut deinem Setup gewinnt das JSON.
2. **FAQ #4 wurde stillschweigend getauscht.** JSON-Frage 4 = „Funktioniert das Motto in gemischten Gruppen — auch für Mädchen?" → HTML macht daraus „Müssen Eltern bleiben?". Gut fürs Eltern-Optional-Kriterium, aber: du verlierst die SEO-relevante Query „feuerwehr geburtstag mädchen" und weichst vom Anker ab. Doppelter Treffer auf Kriterium 3.
3. **Schaum-Augen-Warnung sitzt nur in Eltern-Tipps + SOS, nicht am Spiel-Block.** Genau die 8-Jahre-Variante „mit verbundenen Augen ertasten" (Hände im Rasierschaum → Augenreiben) hat KEINEN Inline-Hinweis direkt an der Station. Die Warnung existiert, aber an der gefährlichsten Stelle fehlt sie im Blickfeld.

**Fix-Vorschläge (MUST-FIX = ❗):**

- ❗ **Wow-Kosten reconcilen:** Entweder JSON auf 135 ziehen ODER HTML auf 159 (+ costContext anpassen). Eine Quelle, eine Zahl. Empfehlung: JSON ist der Anker → HTML hat recht inhaltlich (wiederverwendbar), also JSON `estimatedCostEur` auf 135 korrigieren und Anker-Notiz setzen.
- ❗ **FAQ-Tausch dokumentieren oder rückgängig:** Wenn der Eltern-FAQ bewusst gewollt ist → JSON nachziehen. Besser: 7. FAQ ergänzen (Mädchen-Frage REIN, Eltern-Frage drin lassen) — kostet dich eine SEO-Query weniger und ist gendersauber.
- **Schaum-Sicherheit inline:** Ein `game-safety`-Span direkt am Schaum-Löscheinsatz-Block in allen 3 Varianten („Augen freihalten, bei Kontakt spülen"). Bei der Augenbinden-8er-Variante zusätzlich: „Augenbinde nur bei sauberen Händen / Schaum vorher abwischen".

Unterm Strich: solide Gold-Template-Qualität, geht live. Der einzige echte Blocker-Kandidat ist die Kosten-Inkonsistenz — die fixst du in 2 Minuten, dann ist's eine 94er Seite.