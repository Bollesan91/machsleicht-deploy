"""Validate + Merge feuerwehr-klein Phase B."""
import io, json, sys
sys.stdout.reconfigure(encoding='utf-8')

pb = json.load(io.open('_dev/content-loop/runs/06-feuerwehr-klein-phase-b/_feuerwehr_klein_phase_b.json', encoding='utf-8'))
prep, sos, shop_cats = pb['preparationWeeks'], pb['sosScenarios'], pb['shoppingListCategories']

errors = []

expected_prep = {'minus4Weeks','minus2Weeks','minus1Week','minus2Days','minus1Day','dayOf'}
if expected_prep - set(prep.keys()):
    errors.append(f'prep missing: {expected_prep - set(prep.keys())}')
for k, v in prep.items():
    if 'headline' not in v or 'items' not in v:
        errors.append(f'prep/{k}: missing fields')
    items_n = len(v.get('items', []))
    if not (3 <= items_n <= 6):
        errors.append(f'prep/{k}: items={items_n} out of range')

expected_sos = {'regen','weniger_kinder_als_erwartet','mehr_kinder_als_erwartet','kind_will_nicht_mitmachen',
                'kuchen_misslungen','spielzeug_kaputt_oder_fehlt','ein_kind_weint','eltern_kommen_frueh'}
if expected_sos - set(sos.keys()):
    errors.append(f'sos missing: {expected_sos - set(sos.keys())}')
for k, v in sos.items():
    if {'icon','label','headline','steps','fallback','tone'} - set(v.keys()):
        errors.append(f'sos/{k}: missing fields')
    for i, s in enumerate(v.get('steps', [])):
        if len(s) > 120:
            errors.append(f'sos/{k}/step[{i}]: {len(s)} chars')

fw = json.load(io.open('_src/elite-motto-data/feuerwehr-klein.json', encoding='utf-8'))
for variant in fw['variants']:
    vid = variant['id']
    cats = [c.get('category') for c in shop_cats.get(vid, [])]
    if len(cats) != len(variant['shoppingList']):
        errors.append(f'shop/{vid}: count mismatch {len(cats)} vs {len(variant["shoppingList"])}')
    pflicht_pct = cats.count('pflicht') * 100 // len(cats) if cats else 0
    if pflicht_pct >= 70:
        errors.append(f'shop/{vid}: pflicht={pflicht_pct}%')

print('=== VALIDATION ===')
if errors:
    for e in errors: print(f'  ✗ {e}')
else:
    print('  ✓ All checks passed')

# Merge
fw['preparationWeeks'] = prep
fw['sosScenarios'] = sos
for variant in fw['variants']:
    vid = variant['id']
    cat_items = shop_cats.get(vid, [])
    for orig in variant['shoppingList']:
        ol = orig.get('label', '').strip()
        for ci in cat_items:
            cl = ci.get('label', '').strip()
            if ol[:20] in cl or cl[:20] in ol:
                orig['category'] = ci['category']
                orig['categoryReasoning'] = ci['reasoning']
                break

fw['_meta']['phase_b_complete'] = '2026-05-19'
fw['_meta']['phase_b_method'] = 'Direct draft — klein-spezifika (Eltern Co-Aufsicht, max 5 Kinder, 1.5-2h, keine Sirene, keine Wunderkerze) durchgehend angewandt.'

with io.open('_src/elite-motto-data/feuerwehr-klein.json', 'w', encoding='utf-8') as f:
    json.dump(fw, f, ensure_ascii=False, indent=2)

print(f'\n=== STATS ===')
print(f'TODO markers: {json.dumps(fw).count("TODO_PHASE_B")}')
for v in fw['variants']:
    matched = sum(1 for i in v['shoppingList'] if 'category' in i)
    cats = [i.get('category') for i in v['shoppingList']]
    pp = cats.count('pflicht')*100//len(cats) if cats else 0
    print(f'  {v["id"]}: {matched}/{len(v["shoppingList"])} matched, pflicht {pp}%')
