# Spiel-Rubrik & Helfer-v3-Regeln (Wizard-Migration P8-X)

**Eingeführt:** 01.06.2026 · **Zweck:** Einheitlicher Qualitäts-Maßstab für jedes Spiel, das in den Wizard (`js/motto-data.js`) wandert. Jedes Spiel muss **≥90** erreichen, bevor es eingetragen wird.

Diese Datei ist Living-Wahrheit. Bei Änderung: hier pflegen, nicht in Chat-Verlauf.

---

## 1. Auswahl-Regeln — Pool vs. Plan

**Pool ≠ Plan.** Der Pool ist die Auswahl, der Plan ist was tatsächlich gefeiert wird.

| Altersgruppe | Pool (auswählbar) | Empfohlen in den Plan |
|---|---|---|
| **3–5** | ~6–7 | 3–4 |
| **6–8** | ~8 | 4–5 |
| **9–12** | ~8 | 5–6 |

- **~12–15 distinkte Spiel-Konzepte pro Motto** reichen — weil Spiele über Alter hinweg geteilt werden (Variant-Modell, §2).
- Pool soll Varianz bieten: Typ (aktiv/ruhig/kreativ/wettkampf/rätsel), Gruppengröße, Indoor/Outdoor.
- **PBI-Impact:** Wizard-Alterskarten (`wizard.js`/`wizard.html`) versprechen Spiel-Zahlen — bei Pool-Änderung mitziehen.

---

## 2. Variant-Modell & Dopplungs-Regel

„Rad nicht neu erfinden — für höheres Alter erweitern."

| Art von Dopplung | Erlaubt? | Was es ist |
|---|---|---|
| Gleiches Spiel über **Altersgruppen desselben Mottos**, mit Alters-Upgrade | ✅ **erwünscht** | EIN gut skaliertes Spiel (`ages:['3-5','6-8','9-12']`) |
| Gleiches Spiel als **generischer Lückenfüller über Mottos** ohne Re-Skin | ❌ vermeiden | gedankenlose Kopie |

**Regel:** Innerhalb eines Mottos über Alter skalieren = gut. Zwischen Mottos gedankenlos kopieren = schlecht.

- `ages[]` **immer** — sagt, welche Pools das Spiel füllt.
- `variants{}` (eigener Text/Material pro Alter) **nur wo's wirklich upgradet** (wie die Hub-Spiele).
- Sonst: eine Anleitung + Zeile „für Ältere erschweren durch …".

---

## 3. Kanonisches Spiel-Schema (`js/motto-data.js`)

```js
{
  id: 'walk-the-plank',        // global eindeutig (Dedup-Schlüssel)
  motto: 'piraten',            // Motto-Slug, oder 'shared' für Skelett-Spiele
  emoji: '🪜',
  name: 'Walk the Plank',
  desc: 'Balance über die Planke ohne den Ball zu verlieren',  // Karten-Einzeiler
  ages: ['3-5','6-8','9-12'],  // welche Pools das Spiel füllt
  bestAge: '6-8',              // optional: "Top für diese Gruppe"-Highlight
  type: 'aktiv',               // aktiv | ruhig | kreativ | wettkampf | rätsel
  players: { min: 1, ideal: '4–10', max: null, solo: true },
  groupScaling: '4–6: nacheinander · 7–10: zwei Planken parallel · 11+: Stationen-Rotation',
  dauer: 10,                   // Minuten (oder Range "20–30")
  prep: 5,                     // Eltern-Vorbereitung in Minuten
  indoor: 'both',              // indoor | outdoor | both
  material: ['Kreppband (3 m Linie)','Esslöffel + Tischtennisball pro Kind','Eimer als Ziel'],
  anleitung: ['1. …','2. …','3. …'],   // Fremd-nachmachbare Schritte
  safety: 'Für 3-Jährige: Ball + Löffel mit Hand festhalten erlaubt.',
  mess: 'gering',              // gering | mittel | hoch (Wasser/Sand/Farbe ehrlich)
  variants: {                  // optional, nur wo's wirklich upgradet
    '3-5': { name:'Deck-Abenteuer', desc:'…', anleitung:['…'] },
    '9-12':{ name:'Piraten-Bootcamp', desc:'…', anleitung:['…'], safety:'…' }
  },
  source: 'wizard+generic+hub',  // Herkunft fürs Audit
  score: 0,                    // letzter Helfer-v3-Score
}
```

---

## 4. Die Rubrik — was ein Spiel ≥90 macht

### K.O.-Gates (reißt eins → max. 70, egal wie gut der Rest)
- **G1 Sicherheit** — kein ungemildertes Risiko für die *getaggten* Alter (EN-71 ≥4 cm, Wasserhöhe, 1:1-Aufsicht, kein Heißwachs/Glas/Flamme für Kleine).
- **G2 Faktencheck** — keine falsche Behauptung (Historie, Quiz-Antworten).
- **G3 Inklusivität** — kein Gender-Split, kein demütigendes Früh-Aus, bei dem ein Kind lange am Rand sitzt.

### Bewertete Dimensionen (Σ 100)
| # | Dimension | Pkt | Enthält |
|---|---|---|---|
| 1 | **Sicherheit & Altersgerechtigkeit** | 15 | entwicklungsgerecht: Motorik, Aufmerksamkeit, Lese-Fähigkeit |
| 2 | **Machbarkeit zuhause** | 15 | Material leicht beschaffbar + Kosten + Aufbau + Eltern-Vorbereitungszeit |
| 3 | **Anleitungs-Klarheit & Vollständigkeit** | 15 | kann ein Fremder es ohne Rückfragen nachmachen? Keine Lücken |
| 4 | **Spaßfaktor & Engagement** | 15 | wenig Leerlauf, alle Kinder aktiv |
| 5 | **Gruppengröße-Skalierbarkeit** | 12 | explizit 4 / 8 / 12+ geregelt |
| 6 | **Motto-Immersion & roter Faden** | 11 | echt themenstark — nicht „Memory mit Sticker" |
| 7 | **Wow-/Erinnerungs-/Foto-Effekt** | 9 | bleibt im Gedächtnis |
| 8 | **Tagesplan-Fit** | 8 | Dauer realistisch + Energie-Level + Indoor/Outdoor + Wetter-Plan-B + Chaos-Ansage |

### Score-Bänder & gestuftes Gate (eingeführt 01.06.2026)

Nicht jedes Spiel kann ein Wow-Showstopper sein — manche sind solide Staples. Deshalb **zwei Gates je nach Spiel-Klasse**:

| Klasse | Gate | Was es ist | Beispiele |
|---|---|---|---|
| **Signature** | **≥90** | motto-prägend, hoher Wow/Immersions-Anspruch | Schwertkampf, Schatz im Sand, Flaschenpost-Geheimschrift |
| **Staple** | **≥85** | solides Standard-Spiel, Mechanik vor Spektakel | Eierlauf/Walk the Plank, Memory, Pantomime, Staffel, Stille Post |

**Klassifizierung beim Writer-Pass:** Spiel als `class: 'signature'` oder `class: 'staple'` taggen. Im Zweifel Staple (≥85). Ein Staple, das 90 reißt, ist ein Bonus — aber 85 genügt.

- **Score < Gate** = MUST-FIX-Welle, erneut reviewen.
- **Gate gerissen (G1/G2/G3)** = max. 70, egal welche Klasse.
- Grinch-Reviewer-Varianz beachten: der Score schwankt zwischen frischen Reviewern (±5). Wenn zwei aufeinanderfolgende frische Reviews ≥ Gate liegen → durch.

---

## 5. Helfer-v3 — Reviewer-Regeln (HART)
1. **Unabhängig & extern + STARKES Modell** — **Kein Sub-Agent** (CLAUDE.md Hard-Rule nach Welle-1A-Regress). Kanal: **frischer claude.ai-Tab via Chrome-MCP mit starkem Modell (Opus 4.8 High)** — das ist der einzige gate-entscheidende Kanal. **WebFetch ist VERBOTEN für Gate-Entscheidungen** (nutzt ein kleines/schnelles Modell → milderer Gutachter → Score-Inflation; das untergräbt den Sinn von Helfer-v3). Lokales Grep/Read durch Haupt-Claude nur ergänzend.
2. **Branch-Trick (Pflicht):** Spiel-Spec in Staging-File (`_dev/review/staging/`) → `commit + push` auf `draft` → der claude.ai-Reviewer-Tab bekommt die **SHA-gepinnte** `https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/<SHA>/<pfad>`-URL (SHA, nicht Branch-Name — CDN-Cache). Reviewer liest den **kanonischen Artefakt aus Git**.
3. **Reviewer kennt KEINE Score-Targets** — kein Gate (85/90), keine Klasse (Staple/Signature), kein „sollte bestehen". Nur Rubrik-Dimensionen + K.O.-Gates + Anti-Sycophancy-Auftrag. Das Gate wendet der Orchestrator (Haupt-Claude) **danach geheim** an.
4. **Bewertet EIN Spiel isoliert** — Punkte pro Dimension mit Begründung, keine Bauch-Gesamtzahl.
5. **Konkret** — jedes Finding mit Stelle (z.B. „Anleitung Schritt 3 fehlt die Wurfdistanz").
6. **Skeptiker-Default** — fühlt sich's „fertig" an oder Score >90 sofort → −7 korrigieren und nochmal.
7. **Pflicht-Checks:** Safety gegen die getaggten Alter · Faktencheck · ist Gruppen-Skalierung wirklich da · Dauer vs. Schritte plausibel.
8. **Ehrlichkeits-Limit:** Spaßfaktor per Mechanik (Aktiv-Anteil, Leerlauf, Überraschung), nicht per Playtest — der Reviewer benennt das.
9. **Output:** Rubrik-Tabelle mit Punkten + Gate-Check + spezifische MUST-FIX-Liste + Endscore /100.
10. **Varianz-Schutz:** durch ist ein Spiel erst, wenn **zwei aufeinanderfolgende frische Reviews ≥ Gate** liegen.

## 6. Writer-Regeln (Haupt-Claude, kein Sub-Agent)
1. **Dedup-Vorabcheck** — existiert das Spiel schon im Wizard/in der Library?
2. **Volles Schema** — inkl. `ages[]`, `players`, `groupScaling`, `safety` pro Alter.
3. **Fremd-nachmachbare Anleitung** — nummerierte Schritte, keine implizite Annahme.
4. **Nur MUST-FIX abarbeiten** — kein Punkte-Schinden über 90 hinaus.
5. **Ein Spiel nach dem anderen** — ≥90-Gate, dann Eintrag in `js/motto-data.js`.

## 7. Workflow pro Spiel (Branch-Trick + Chrome-MCP-Reviewer)
1. **Writer** (Haupt-Claude) schreibt Spiel-Spec → Staging-File `_dev/review/staging/<motto>-<game>.md` (nur Spec, KEINE Rubrik/Gate).
2. `git add … && commit && push origin draft` (draft baut nicht auf Netlify → kostenlos).
3. SHA holen (`git rev-parse HEAD`), **frischer claude.ai-Tab (Chrome-MCP, Opus 4.8 High)** bekommt die SHA-URL + Reviewer-Prompt (ohne Target/Klasse). KEIN WebFetch.
4. Review lesen → MUST-FIX einarbeiten → Staging-File updaten → zurück zu 2.
5. **Zwei aufeinanderfolgende frische Reviews ≥ Gate** → Spiel ist durch → in `js/motto-data.js` (`score`, `class` setzen).
Variant-Spiel: jede getaggte Alters-Stufe einzeln auf Safety + Schwierigkeit prüfen.
