**SCORE: 79/100 — DURCHGEFALLEN (Schwelle 85)**

| # | Kriterium | Score | Kurzbegründung |
|---|-----------|-------|----------------|
| 1 | Eltern-Mehrwert | 8 | 6.663 Wörter, 9 SOS-Szenarien, Spezialisierungs-System, echtes Halb-Erwachsenen-Framing |
| 2 | YMYL-Sicherheit | 8 | Saubere Sicherheitshinweise, aber kein Datumsstempel auf Kostenangaben |
| 3 | **JSON-Treue** | **6** | FAQ weicht ab: 1 erfundene, 1 grundlos gestrichene Frage |
| 4 | Marken-Sauberkeit | 9 | Kein machsruhig/Advergy-Bleed, Tag konsistent, kein NASA-Claim |
| 5 | Struktur | 9 | Exakt 12 H2, 3 Varianten, FAQ sichtbar == JSON-LD |
| 6 | Eltern wegbleiben | 9 | „OHNE Eltern, telefonisch erreichbar" — altersgerecht |
| 7 | **Kognitive Forderung** | **6** | Escape-Logik + Magnitude stark, aber Schwerelosigkeit fehlt komplett |
| 8 | Affiliate-Konvention | 9 | Nur Suchlinks, kein hartkodierter Preis/ASIN, Tag sauber |
| 9 | Schema.org valid | 8 | 3 Blöcke valide, kein Mismatch — aber HowTo bringt keine Rich Results mehr |
| 10 | SEO | 7 | Meta-Description 200 Zeichen → SERP-Truncation |

---

**Stärken (ehrlich):**
- Struktur ist sauber durchexerziert. Die kritischste Falle — JSON-LD FAQ vs. sichtbare FAQ — ist konsistent (6 == 6), **kein Rich-Result-Risiko**. Das ist die häufigste Schwachstelle und hier ist sie zu.
- Affiliate textbook: 19× `machsleicht-21`, ausschließlich Suchlinks. Kein Preis-Drift, kein DSGVO-Problem.
- Sicherheits-Layer für 9-12 ist da, wo er sein muss: Schraubendreher nur unter Aufsicht, Stirnlampen-Pflicht bei Dunkel-Stationen, Außen nur im einsehbaren Bereich, Schlafparty mit Eltern-Opt-In, Allergiker-Hinweis am Kuchen.
- Echte Astronomie statt Deko: Magnitude (Sonne −26,7 / Toliman), ISS-Überflug-Beobachtung, Planetenreihenfolge — und der Codeknacker ist über Rollen-Code-Splitting echte Escape-Room-Logik, kein Pseudo-Rätsel.

**Schwächen (die Punkte kosten):**
1. **JSON-Treue gebrochen.** Quelle hat 7 FAQs, Seite rendert 6. Davon: „Welche Mitgebsel passen" **grundlos gestrichen**, dafür „Müssen Eltern dabei bleiben?" **erfunden** (steht nicht im JSON). Die Wasser-Raketen-FAQ ist nachvollziehbar weg, weil die Aktivität komplett aus der Seite entfernt wurde — das ist verteidigbar, der Rest nicht.
2. **Schwerelosigkeit = 0 Treffer.** Der Brief verlangt explizit „echte Astronauten-Theorie ISS/Schwerelosigkeit". ISS taucht **genau 1×** auf (oberflächlich), Schwerelosigkeit/Schwerkraft/Gravitation als Theorie **gar nicht** — nur eine „Gravitations-Falle" als Rätsel-Gimmick. Hier ist die kognitive Tiefe halb geliefert.
3. **Meta-Description 200 Zeichen** (Ziel 140-165). Google schneidet bei ~155-160 ab → Tail wird gekappt. Wurzel: das JSON selbst hat 200 Zeichen, die Seite hat es treu kopiert. Treue gut, SEO schlecht — das JSON ist hier die Fehlerquelle.

**MUST-FIX (in Reihenfolge der Punktewirkung):**
1. **Schwerelosigkeit-Block einbauen** (+2-3 Pkt Kriterium 7). Z.B. ein Stations-Experiment: warum Astronauten auf der ISS „schweben" = freier Fall, nicht „keine Schwerkraft" — die ISS fällt um die Erde herum. Das ist das eine Konzept, das fast jedes Kind falsch hat. ISS-Mention von 1× auf substanziell ausbauen.
2. **FAQ-Treue herstellen** (+2 Pkt Kriterium 3): „Mitgebsel"-Frage aus JSON nachziehen ODER die erfundene „Eltern dabei bleiben?"-Frage ins JSON zurückschreiben. Eins von beiden — Author-Chat und Quelle müssen sich einig sein.
3. **Meta-Description auf ≤165 Zeichen** kürzen — **im JSON UND HTML synchron**, sonst reißt es beim nächsten Re-Render wieder auf.

**Nice-to-have:** Datumsstempel („Stand 2026") an die Kostenblöcke (39/78/148 €). „Lego" durch „Steck-/Klemmbaustein" ersetzen (Marken-Hygiene, kostet aktuell keinen Punkt). HowTo-Schema bringt seit Googles Deprecation 2023 keine Rich Results mehr — bleibt valide, aber erwarte dir keinen SERP-Effekt davon.

Mit Fix 1+2+3 landest du bei ~85-86. Knapp drüber, nicht komfortabel — die Seite ist solide gebaut, aber inhaltlich an der vom Brief geforderten Tiefe (Schwerelosigkeit) vorbei und die Author/Quelle-Synchronität ist auseinandergelaufen.