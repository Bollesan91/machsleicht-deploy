import sys, io, json
sys.stdout.reconfigure(encoding='utf-8')

def extract_json(text):
    start = text.find('{')
    if start < 0:
        return None
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
    return None

streams = [
    (1, '01-preparationWeeks/v1.md'),
    (2, '02-sosScenarios/v1.md'),
    (3, '03-shoppingList-categories/v1.md'),
]
for n, rel in streams:
    path = '_dev/content-loop/runs/04-elite-motto-data-phase-b/' + rel
    text = io.open(path, encoding='utf-8').read()
    js = extract_json(text)
    if not js:
        print(f'Stream {n}: NO JSON FOUND')
        continue
    try:
        d = json.loads(js)
    except json.JSONDecodeError as e:
        print(f'Stream {n}: PARSE ERROR at pos {e.pos}: {e.msg}')
        print(f'  context: ...{js[max(0,e.pos-50):e.pos+50]}...')
        continue
    if n == 1:
        keys = list(d.keys())
        items_per = {k: len(d[k].get('items', [])) for k in keys if isinstance(d[k], dict)}
        print(f'Stream 1: keys={keys}')
        print(f'  items_per_section={items_per}')
        expected = {'minus4Weeks','minus2Weeks','minus1Week','minus2Days','minus1Day','dayOf'}
        missing = expected - set(keys)
        extra = set(keys) - expected
        print(f'  missing={missing} | extra={extra}')
    elif n == 2:
        keys = list(d.keys())
        print(f'Stream 2: keys={keys}')
        expected_fields = {'icon','label','headline','steps','fallback','tone'}
        for k, v in d.items():
            if not isinstance(v, dict):
                print(f'  {k}: NOT AN OBJECT')
                continue
            fields = set(v.keys())
            missing = expected_fields - fields
            steps_n = len(v.get('steps', []))
            tone = v.get('tone', '?')
            print(f'  {k}: missing={missing or "ok"} | steps={steps_n} | tone={tone}')
    else:
        keys = list(d.keys())
        counts = {k: len(d[k]) for k in keys if isinstance(d[k], list)}
        print(f'Stream 3: keys={keys}')
        print(f'  counts={counts}')
        valid = {'pflicht','sinnvoll','habIchVielleicht'}
        for vk in keys:
            cats_list = [i.get('category') for i in d[vk]]
            cats = set(cats_list)
            invalid = cats - valid
            pflicht_n = cats_list.count('pflicht')
            total = len(cats_list)
            pflicht_pct = pflicht_n * 100 // total if total else 0
            print(f'  {vk}: invalid={invalid or "none"} | pflicht_pct={pflicht_pct}%')
