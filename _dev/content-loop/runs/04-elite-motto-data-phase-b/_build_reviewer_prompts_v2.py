"""Compact reviewer prompts — drop verbose sections, embed only v1 JSON + concise rubric."""
import sys, io, base64, json
sys.stdout.reconfigure(encoding='utf-8')

def extract_json(text):
    start = text.find('{')
    if start < 0:
        return ""
    depth = 0
    in_str = False
    esc = False
    for i in range(start, len(text)):
        c = text[i]
        if esc:
            esc = False
            continue
        if c == "\\":
            esc = True
            continue
        if c == '"':
            in_str = not in_str
            continue
        if in_str:
            continue
        if c == '{':
            depth += 1
        elif c == '}':
            depth -= 1
            if depth == 0:
                return text[start:i+1]
    return text[start:]

TEMPLATE = """Du bist Reviewer-Chat B in einer 3-Chat-Pipeline fuer feuerwehr-mittel.json Phase B (Feuerwehr 6-8). Writer schrieb v1 fuer **{topic}**.

## v1 (vom Writer)

{v1_json}

## Score-Rubrik

{rubric}

Akzeptanz Final-Score >= 85.

## Stream-Hinweise (KRITISCH pruefen)

{hints}

## Dein Output (FORMAT STRIKT)

## Score-Card v1

| Dimension | Punkte | Begruendung (1 Satz) |
|---|---|---|
| ... | XX/XX | ... |

**Gesamt v1: XX/100**

## Konkrete Verbesserungen fuer v2 (4-8 Punkte)

1. **[Schluessel/Sektion]** — Was schwach + wie genau fixen. KONKRET wie "minus2Days/Helfer-Briefing: '5-Minuten' ist vage, schreib stattdessen: 'Stationen-Karte am Kuechentisch zeigen, Rollen ansagen, Notruf-Nummer geben.'" NICHT generisch.

2. ...

## Lob (1-3 starke Punkte)

- ...

## Sycophancy-Check

Wenn v1 >= 90 ehrlich sagen, nicht konfabulieren.

Direkt los, Score-Card als erstes."""

CFG = {
    1: {
        'topic': 'preparationWeeks (6 datums-Sektionen, P3-16)',
        'rubric': 'Substanz 30 | Motto-Kohaerenz 25 | Datums-/Material-Realismus 20 | Sprint-Tauglichkeit 15 | Mama-um-22:30-Test 10',
        'hints': '- Sind 5-6 items pro Sektion distinkt oder redundant?\n- Variant-Konsistenz: Wow/Standard/Minimal sinnvoll auf Timeline gemappt?\n- Bolle-Ton: lakonisch + konkret. Wo Ratgeber-Modus?',
    },
    2: {
        'topic': 'sosScenarios (8 Panik-Szenarien, P3-18 SOS-Button)',
        'rubric': 'Substanz 30 | Motto-Kohaerenz 25 | Crisis-Tauglichkeit 20 | Sprint-Tauglichkeit 15 | Mama-um-22:30-Test 10',
        'hints': '- Sind steps Imperativ-Saetze <=120 Zeichen oder Erklaerungen?\n- Motto-Anker (Disponentin, Wachen-Tafel, Tattoo, Sirene) in ALLEN 8 Szenarien?\n- headline beruhigt sofort + gibt Richtung?\n- fallback substantiell oder leer wo nicht noetig?',
    },
    3: {
        'topic': 'shoppingList[].category (40 Items × pflicht/sinnvoll/habIchVielleicht, P3-17)',
        'rubric': 'Klassifikations-Logik 30 | Bolle-Heuristik-Treue 20 | Variant-Konsistenz 20 | Reasoning-Substanz 15 | Pflicht-Inflation-Check 15',
        'hints': '**Validation gemessen:** Minimal 70%, Standard 69%, Wow 52% Pflicht-Anteil. Min+Std an/ueber 70%-Grenze. Was downgraden auf "sinnvoll"?\n- Items in mehreren Varianten (Wasserspritzen, Mini-Autos, Absperrband) konsistente Kategorie?\n- Writer behauptet 60/62/53% — Validation 70/69/52%. Diskrepanz aufmerksam machen.\n- Apfelschorle=Pflicht ok, Nebelmaschine=Sinnvoll ok? hasAffiliate KEIN Pflicht-Proxy.',
    },
}

streams = [
    (1, '_dev/content-loop/runs/04-elite-motto-data-phase-b/01-preparationWeeks/v1.md'),
    (2, '_dev/content-loop/runs/04-elite-motto-data-phase-b/02-sosScenarios/v1.md'),
    (3, '_dev/content-loop/runs/04-elite-motto-data-phase-b/03-shoppingList-categories/v1.md'),
]
folder_map = {1: '01-preparationWeeks', 2: '02-sosScenarios', 3: '03-shoppingList-categories'}

for n, path in streams:
    text = io.open(path, encoding='utf-8').read()
    js = extract_json(text)
    cfg = CFG[n]
    prompt = TEMPLATE.format(topic=cfg['topic'], v1_json=js, rubric=cfg['rubric'], hints=cfg['hints'])
    out_path = f'_dev/content-loop/runs/04-elite-motto-data-phase-b/{folder_map[n]}/v1-reviewer-prompt-v2.md'
    with io.open(out_path, 'w', encoding='utf-8') as f:
        f.write(prompt)
    b64 = base64.b64encode(prompt.encode('utf-8')).decode('ascii')
    print(f'STREAM {n}: raw={len(prompt)}, b64={len(b64)}')
