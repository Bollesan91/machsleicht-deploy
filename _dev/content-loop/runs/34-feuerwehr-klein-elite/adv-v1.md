Ich hole beide Dateien und vergleiche sie kritisch.

Jetzt der Wahrheits-Anker (JSON).

SCORE: 93/100

**Verdict: Deploy-ready (Elite-Level). Threshold 85 klar übertroffen.** Die Seite hat den größten Stolperstein — den durchgehend in der JSON vergrabenen `Hand-Signal "Notruf!" + leiser Spruch.`-Bug — *vollständig* und *kontextuell korrekt* rekonstruiert. Das ist kein Copy-Paste-Job, sondern echte Reparatur.

---

STAERKEN (5 Punkte):

- **Encoding-Bug zu 100% getilgt.** Die JSON ist an mindestens 12 Stellen mit `Hand-Signal "Notruf!" + leiser Spruch.` korrumpiert (überall wo „Sirene"/„Sirenen-Symbol"/„Mini-Flamme" stehen müsste). Der Writer hat *jede einzelne* Stelle sinnrichtig rekonstruiert: SOS-Kuchen-Fallback → „Mini-**Flamme**", Lern-Sektion → „Eine **Sirene** ist nichts Bedrohliches", Mietwohnung-Check → „keine laute **Sirene** nötig", Sticker-Funktion → „**Sirenen-Symbol**". Null Leak in den HTML-Output. Auch markentechnisch sauber: Schoko-Sandwich-Keks statt Oreo, Gummibärchen statt Haribo, kein Disney/Lego/Tonie/Capri.

- **YMYL-Sicherheit redundant abgedeckt.** Schaum-Augen/Mund-Hinweis in allen 3 game-safety-Blöcken PLUS eigene Rasierschaum-Checkliste in den Eltern-Tipps. Würstchen-Erstickungsrisiko in Minimal/Standard/Wow + Eltern-Tipps + FAQ. Wasser-Sicherheit („nur auf den Becher", Rutschgefahr) bei Spritz-Probe und Lösch-Ballon. Sauber.

- **Eltern-Pflicht an 4 Stellen verankert** (Kriterium 6 verlangt 3): Intro, Alters-Intro, Eltern-Tipps-Box, FAQ-Frage. Über Soll.

- **Affiliate + Schema technisch korrekt.** `?tag=machsleicht-21` + `rel="noopener sponsored"` konsistent auf allen Amazon-Links; nicht-affiliate Externe (kribbelbunt, party.machsleicht) korrekt nur `noopener`; Disclosure mehrfach. FAQPage-JSON-LD = sichtbare FAQ (6/6, kein Rich-Result-Mismatch). HowTo + BreadcrumbList valide.

- **Variant-Headlines korrekt aus `headline` statt aus stale `label`.** JSON-`label` sagt fälschlich „2/3/3,5 Stunden", `headline` sagt korrekt „90 Min/2 Std/2,5 Std". Writer hat die richtigen Werte genommen — Falle erkannt.

---

KRITISCHE SCHWAECHEN (konkret):

- **[SOS-Sektion] 2 von 10 Szenarien fehlen.** JSON definiert 10 `sosScenarios`; HTML rendert nur 8. Gedroppt: `spielzeug_kaputt_oder_fehlt` und `wasser_chaos_im_wohnzimmer`. Intro sagt zwar konsistent „Acht typische Pannen" (kein interner Widerspruch), aber gegenüber dem Wahrheits-Anker sind 20% des Blocks verloren. Editorial verteidigbar (beide überschneiden sich mit Regen/Wasser-Content), bleibt aber eine Abweichung.

- **[Einladung] Inkonsistente Invitation-URL.** Die Einladungs-CTA in der „Einladung"-Sektion zeigt auf `/einladung/feuerwehr/`, der Final-CTA und die Sticky-Bottom-Nav auf `/einladung/erstellen?motto=feuerwehr`. Zwei verschiedene Ziele für dieselbe Aktion — eine davon ist vermutlich tot oder unkanonisch.

- **[<head>] Meta-Description ~175 Zeichen, über dem 165-Soll.** Sie ist JSON-treu (1:1 aus `metaDescription`), wird aber in der SERP wahrscheinlich abgeschnitten („…Tag-1-Feuerwehrkind-Urkunde" fällt hinten weg). Title dagegen mit 52 Zeichen perfekt.

- **[<head>] OG-Image generisch.** `og:image` = `/og-home.png` (Homepage-Fallback), kein motto-spezifisches Feuerwehr-Bild. Schwächt Social-Sharing-CTR. Kein Blocker.

- **[Schema HowTo] Kosmetisch:** Google hat HowTo-Rich-Results 2023 deprecated — das Markup ist valide und schadet nicht, bringt aber kein Rich-Snippet mehr. Nur erwähnt, kein Abzug.

---

FIX-VORSCHLAEGE (priorisiert):

1. **Invitation-URL vereinheitlichen** (1 Min, vor Deploy): Entscheide dich für `/einladung/erstellen?motto=feuerwehr` ODER `/einladung/feuerwehr/` und ersetze die abweichende Instanz. Tote interne Links sind das einzige hier, das aktiv schaden kann.

2. **2 fehlende SOS-Szenarien ergänzen ODER Intro lassen:** Wenn die JSON die Wahrheit ist, gehören `spielzeug_kaputt` und `wasser_chaos` rein → 10 Cards, Intro auf „Zehn typische Pannen" ändern. Wenn die Kürzung Absicht war: so lassen (8/„Acht" ist konsistent), aber dann im Phase-B-JSON als bewusste Auslassung dokumentieren, damit der nächste Re-Run sie nicht „fehlend" meldet.

3. **Meta-Description auf ≤165 trimmen:** z.B. `(Minimal/Standard/Wow)` raus oder `Tag-1-Feuerwehrkind-Urkunde` → `Urkunde`. Spart ~15 Zeichen, kein Truncation mehr.

4. **Motto-OG-Image** (optional, niedrige Prio): Feuerwehr-spezifisches 1200×630 statt og-home.png.

5. **Interne Alters-/Motto-Links verifizieren:** `feuerwehr-6-8-jahre`, `polizei-3-5-jahre`, `bagger-baustelle-3-5-jahre`, `weltraum-3-5-jahre` etc. existieren? Konnte ich von außen nicht prüfen — vor Deploy einmal gegen den Live-Tree checken, sonst 404-Crosslinks.

Keiner dieser Punkte ist ein Safety-, Marken- oder Encoding-Fehler. Die Page ist substanziell besser als die Roh-JSON, aus der sie stammt. **Go.**