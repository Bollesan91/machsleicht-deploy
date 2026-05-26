"""Merge v3 JSON blocks into _src/elite-motto-data/feuerwehr-mittel.json on draft branch."""
import io, json, sys, subprocess
sys.stdout.reconfigure(encoding='utf-8')

def extract_json(text):
    start = text.find('{')
    if start < 0: return None
    depth = 0; in_str = False; esc = False
    for i in range(start, len(text)):
        c = text[i]
        if esc: esc=False; continue
        if c=="\\": esc=True; continue
        if c=='"': in_str=not in_str; continue
        if in_str: continue
        if c=='{': depth+=1
        elif c=='}':
            depth-=1
            if depth==0: return text[start:i+1]
    return None

# Read v3 files
prep_text = io.open('_dev/content-loop/runs/04-elite-motto-data-phase-b/01-preparationWeeks/v3.md', encoding='utf-8').read()
sos_text = io.open('_dev/content-loop/runs/04-elite-motto-data-phase-b/02-sosScenarios/v3.md', encoding='utf-8').read()
shop_text = io.open('_dev/content-loop/runs/04-elite-motto-data-phase-b/03-shoppingList-categories/v3.md', encoding='utf-8').read()

prep = json.loads(extract_json(prep_text))
sos = json.loads(extract_json(sos_text))
shop = json.loads(extract_json(shop_text))

# Load current feuerwehr-mittel.json from draft branch via git show
result = subprocess.run(['git', 'show', 'draft:_src/elite-motto-data/feuerwehr-mittel.json'],
                       capture_output=True, text=True, encoding='utf-8')
data = json.loads(result.stdout)

# Update preparationWeeks
data['preparationWeeks'] = prep
# Update sosScenarios
data['sosScenarios'] = sos

# Merge shoppingList categories — match by label exactly
for variant in data['variants']:
    variant_id = variant['id']
    if variant_id in shop:
        shop_items = shop[variant_id]
        # Build map label → {category, reasoning}
        # Note: shop items have label like "💧 Wasserspritzpistolen (6er-Set) — 10€"
        # while original items have label like "Wasserspritzpistolen (6er-Set)" + separate emoji+price
        # Match by checking if shop label contains the original label
        for orig_item in variant['shoppingList']:
            orig_label = orig_item.get('label', '').strip()
            matched = None
            for shop_item in shop_items:
                shop_label = shop_item.get('label', '').strip()
                if orig_label in shop_label or shop_label in orig_label or orig_label[:20] in shop_label:
                    matched = shop_item
                    break
            if matched:
                orig_item['category'] = matched['category']
                orig_item['categoryReasoning'] = matched['reasoning']
            else:
                print(f'WARN: unmatched item "{orig_label}" in variant {variant_id}')

# Update _meta
data['_meta']['phase_b_complete'] = '2026-05-19'
data['_meta']['phase_b_streams'] = '3-Chat content-loop (writer/reviewer pipeline). preparationWeeks v3=88, sosScenarios v3=92, shoppingList.category v3=89. Adversarial-Phase skipped (alle Scores >=85 + Schema clean).'

# Write to checked-out draft branch path
# We're currently on content-loop-pipeline branch but need to write to draft. Just write to a temp file, then user can merge manually OR switch branches.
output_path = '_dev/content-loop/runs/04-elite-motto-data-phase-b/_FINAL-feuerwehr-mittel.json'
with io.open(output_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

# Stats
print(f'preparationWeeks: {len(prep)} sektionen, items: {[len(prep[k].get("items",[])) for k in prep]}')
print(f'sosScenarios: {len(sos)} szenarios')
print(f'shoppingList.category covered for {len(data["variants"])} variants')
print(f'TODO_PHASE_B markers remaining: {json.dumps(data).count("TODO_PHASE_B")}')
print(f'final file: {output_path}')
print(f'size: {len(json.dumps(data, ensure_ascii=False)):,} chars')
