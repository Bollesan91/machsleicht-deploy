"""Build reviewer prompts for each stream, base64-encode for browser paste."""
import sys, io, base64, json
sys.stdout.reconfigure(encoding='utf-8')

REVIEWER_HEADER = """Du bist **Reviewer-Chat B** in einer 3-Chat-Pipeline (Writer / Reviewer / Adversarial) für `_src/elite-motto-data/feuerwehr-mittel.json` Phase B (Feuerwehr 6-8).

Writer-Chat A hat v1 für **{stream_topic}** geschrieben. Deine Aufgabe: liefere konkretes, kritisches Review.

## Was zu reviewen ist (v1)

{v1_content}

---

## Score-Rubrik (verwende diese, jede Dimension Score 0–{max_per_dim})

{rubric_table}

**Akzeptanz-Threshold:** Final-Score ≥ 85.

## Anti-Patterns (markiere, falls in v1 vorhanden)

{anti_patterns}

{stream_specific_hints}

## Dein Output (Format strikt einhalten)

```
## Score-Card v1

| Dimension | Punkte | Begründung (max 1 Satz) |
|---|---|---|
| ... | XX/XX | ... |

**Gesamt-Score v1:** XX/100

## Konkrete Verbesserungen für v2 (priorisiert, 4-8 Punkte)

1. **[Schlüssel/Sektion]** — Was ist konkret schwach + wie genau fixen. NICHT generisch wie "mehr Konkretheit", sondern: "minus2Days/Helfer-Briefing — `5-Minuten-Erklärung` ist vage. Schreib stattdessen: 'Zeig dem Helfer die Stationen-Karte am Küchentisch, sag wer welche Station übernimmt, gib Notruf-Nummer für den Notfall.'"

2. **[...]** — ...

## Ausdrückliches Lob (1-3 Punkte was richtig stark ist)

- ...

## Sycophancy-Check

Wenn v1 schon ≥ 90 ist und du Schwierigkeiten hast Schwächen zu finden — sag das ehrlich, statt zu konfabulieren. Writer-Pushback gegen erfundene "Verbesserungen" ist erlaubt.
```

Direkt los, ohne Vorrede. Reviewer muss die Score-Card als ERSTES bringen — Writer sieht oben sofort den Score-Estimat.
"""

STREAM_CONFIGS = {
    1: {
        'topic': '`preparationWeeks` (datums-getriebener Wochenplan, 6 Sektionen, P3-16 Vorbereitungskarte)',
        'max_per_dim': '30/25/20/15/10 (sum 100)',
        'rubric_table': """| Dimension | Punkte | Was zählt |
|---|---|---|
| Substanz | 30 | Konkrete Items, keine Plattitüden |
| Motto-Kohärenz | 25 | Feuerwehr-Sprache, Wachen-Tafel, Tattoo-Stempelkissen, Sirene |
| Datums-/Material-Realismus | 20 | Amazon-Lieferzeiten, Backzeiten, Helfer-Timing realistisch |
| Sprint-Tauglichkeit | 15 | Schema strikt, keine "siehe oben"-Verweise |
| Mama-um-22:30-Test | 10 | Versteht müde Mutter ohne Vorwissen, in 30 Sek |""",
        'anti_patterns': """- Generische Eltern-Tipps ("Achten Sie auf Sicherheit", "Vergessen Sie nicht...")
- Hilfsverb-Geschwätz ("Es ist empfehlenswert, dass...", "Sollte beachtet werden")
- Pinterest-Aufwand-Eskalation ("handgenähte Stoff-Wachen-Tafel")
- Truismen ("Einladungen sollten frühzeitig versendet werden") → no shit""",
        'stream_specific_hints': """## Stream-spezifische Schwächen, die du PRÜFEN sollst

- **Schema-Validation:** v1 hat 5-6 items pro Sektion (Range 3-6 erlaubt). Sind die Items wirklich distinkt oder sind 2 davon Redundanz?
- **Variant-Konsistenz:** Wird die Wow/Standard/Minimal-Differenzierung sinnvoll auf die Vorbereitungs-Timeline gemappt (z.B. Nebelmaschine nur in -1W wenn Wow gebucht)?
- **Bolle-Ton:** Lakonisch + konkret + nicht-belehrend. Wo rutscht v1 in Ratgeber-Modus?
"""
    },
    2: {
        'topic': '`sosScenarios` (8 Panik-Szenarien für Party-Pannen, P3-18 SOS-Button)',
        'max_per_dim': '30/25/20/15/10 (sum 100)',
        'rubric_table': """| Dimension | Punkte | Was zählt |
|---|---|---|
| Substanz | 30 | Konkrete Handlungen, keine Beruhigungs-Plattitüden |
| Motto-Kohärenz | 25 | Rollen / Sprache / Material aus Feuerwehr-Universum |
| Crisis-Tauglichkeit | 20 | In 30 Sek lesbar und ausführbar, im Stress |
| Sprint-Tauglichkeit | 15 | Schema strikt, 8 Szenarien, alle 6 Felder pro Szenario |
| Mama-um-22:30-Test | 10 | Versteht müde Mutter ohne Vorwissen |""",
        'anti_patterns': """- "Bleiben Sie ruhig" → leer, keine Anweisung
- "Beruhigen Sie das Kind" → kein Handlungs-Schritt
- "Improvisieren Sie kreativ" → no shit
- Lange Erklärungen WARUM etwas wichtig ist → kein Krisen-Modus
- Pathos statt Praktisch ("Wir wissen, dass das stressig ist...")""",
        'stream_specific_hints': """## Stream-spezifische Schwächen, die du PRÜFEN sollst

- **Crisis-Mode-Sprache:** sind `steps` wirklich Imperativ-Sätze max 120 Zeichen? Oder ratgeberhafte Erklärungen?
- **Motto-Kohärenz pro Szenario:** Stechen Rollen (Disponentin, Wachen-Tafel-Schreiberin) und Material (Tattoo, Wachen-Pult) konkret durch ALLE 8 Szenarien oder nur in 2-3?
- **headline-Qualität:** der "erste Atemzug" muss SOFORT beruhigen + Richtung geben. Wo ist eine headline schwach formuliert?
- **fallback-Substanz:** Sind die fallbacks echte Plan-C-Alternativen oder leere `""` wo sie nicht sein dürften?
"""
    },
    3: {
        'topic': '`shoppingList[].category` (40 Items × pflicht/sinnvoll/habIchVielleicht, P3-17 Gruppen-Liste)',
        'max_per_dim': '30/20/20/15/15 (sum 100)',
        'rubric_table': """| Dimension | Punkte | Was zählt |
|---|---|---|
| Klassifikations-Logik | 30 | Pflicht/Sinnvoll/habIchVielleicht-Regeln konsistent angewandt |
| Bolle-Heuristik-Treue | 20 | HANDOFF-Startpunkt eingehalten; Abweichungen begründet |
| Variant-Konsistenz | 20 | Gleiche Items über Varianten haben Logik (gleich oder begründet anders) |
| Reasoning-Substanz | 15 | Begründungen konkret, kein "ist halt so" |
| Pflicht-Inflation-Check | 15 | <70% Pflicht-Anteil pro Variante |""",
        'anti_patterns': """- "Sicherheit ist Pflicht" → bedeutet nichts
- "Wegen Atmosphäre" → leer, gib konkrete Funktion
- Affiliate-Items pauschal als pflicht behandeln → UNABHÄNGIG vom Affilate-Status
- Pflicht-Inflation: Pflicht-Anteil pro Variante MUSS < 70% sein""",
        'stream_specific_hints': """## Stream-spezifische Schwächen, die du PRÜFEN sollst (KRITISCH)

- **Pflicht-Inflation:** Validation-Tool hat **Minimal 70%, Standard 69%, Wow 52%** Pflicht-Anteil gemessen — Minimal ist GENAU auf der 70%-Grenze, Standard knapp drunter. Welche Items in Minimal+Standard sollten realistisch auf "sinnvoll" downgegradet werden?
- **Variant-Konsistenz:** Items wie "Wasserspritzpistolen", "Mini-Feuerwehrautos", "Absperrband" kommen in ALLEN 3 Varianten vor. Haben sie konsistente Kategorien? Wo nicht — ist die Abweichung begründet?
- **Self-Assessment-Konsistenz:** Writer behauptet Pflicht-Anteile Min 60% / Std 62% / Wow 53%. Validation sagt 70/69/52%. Writer hat sich verzählt oder nutzt andere Definition. Aufmerksam machen.
- **Heuristik-Anker:** Apfelschorle = Pflicht (HANDOFF: ja), Nebelmaschine = Sinnvoll (HANDOFF: ja, weil nur in Wow). Wird das respektiert?
"""
    }
}

streams = [
    (1, '_dev/content-loop/runs/04-elite-motto-data-phase-b/01-preparationWeeks/v1.md'),
    (2, '_dev/content-loop/runs/04-elite-motto-data-phase-b/02-sosScenarios/v1.md'),
    (3, '_dev/content-loop/runs/04-elite-motto-data-phase-b/03-shoppingList-categories/v1.md'),
]

for n, path in streams:
    v1 = io.open(path, encoding='utf-8').read()
    cfg = STREAM_CONFIGS[n]
    prompt = REVIEWER_HEADER.format(
        stream_topic=cfg['topic'],
        v1_content=v1,
        max_per_dim=cfg['max_per_dim'],
        rubric_table=cfg['rubric_table'],
        anti_patterns=cfg['anti_patterns'],
        stream_specific_hints=cfg['stream_specific_hints'],
    )
    # save reviewer-prompt
    out_path = f'_dev/content-loop/runs/04-elite-motto-data-phase-b/0{n}-*/v1-reviewer-prompt.md'.replace('0{n}-*', '0{n}-prep'.format(n=n) if n == 1 else '0{n}-sos'.format(n=n) if n == 2 else '0{n}-shop'.format(n=n))
    # fix path
    folder_map = {
        1: '01-preparationWeeks',
        2: '02-sosScenarios',
        3: '03-shoppingList-categories',
    }
    out_path = f'_dev/content-loop/runs/04-elite-motto-data-phase-b/{folder_map[n]}/v1-reviewer-prompt.md'
    with io.open(out_path, 'w', encoding='utf-8') as f:
        f.write(prompt)
    b64 = base64.b64encode(prompt.encode('utf-8')).decode('ascii')
    print(f'=== STREAM {n} === ({len(prompt)} chars, {len(b64)} b64)')
    print(b64)
    print()
