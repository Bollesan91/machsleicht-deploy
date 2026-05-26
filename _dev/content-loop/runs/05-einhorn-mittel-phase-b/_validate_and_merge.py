"""Validate + Merge einhorn Phase B into einhorn-mittel.json."""
import io, json, sys
sys.stdout.reconfigure(encoding='utf-8')

# Load phase B draft
pb = json.load(io.open('_dev/content-loop/runs/05-einhorn-mittel-phase-b/_einhorn_phase_b.json', encoding='utf-8'))

# === Validation ===
prep = pb['preparationWeeks']
sos = pb['sosScenarios']
shop_cats = pb['shoppingListCategories']

errors = []

# prep validation
expected_prep = {'minus4Weeks','minus2Weeks','minus1Week','minus2Days','minus1Day','dayOf'}
prep_missing = expected_prep - set(prep.keys())
if prep_missing:
    errors.append(f'prep missing keys: {prep_missing}')
for k, v in prep.items():
    if 'headline' not in v or 'items' not in v:
        errors.append(f'prep/{k}: missing headline or items')
    items_n = len(v.get('items', []))
    if items_n < 3 or items_n > 6:
        errors.append(f'prep/{k}: items count={items_n} (range 3-6)')
    for i, item in enumerate(v.get('items', [])):
        for f in ['icon', 'title', 'detail']:
            if f not in item:
                errors.append(f'prep/{k}/item[{i}]: missing {f}')
        if len(item.get('title', '')) > 70:
            errors.append(f'prep/{k}/item[{i}]: title len={len(item["title"])} >70')

# sos validation
expected_sos = {'regen','weniger_kinder_als_erwartet','mehr_kinder_als_erwartet','kind_will_nicht_mitmachen',
                'kuchen_misslungen','spielzeug_kaputt_oder_fehlt','ein_kind_weint','eltern_kommen_frueh'}
sos_missing = expected_sos - set(sos.keys())
if sos_missing:
    errors.append(f'sos missing keys: {sos_missing}')
sos_extra = set(sos.keys()) - expected_sos
if sos_extra:
    errors.append(f'sos extra keys: {sos_extra}')
expected_fields = {'icon','label','headline','steps','fallback','tone'}
valid_tones = {'ruhig', 'praktisch', 'motivierend'}
for k, v in sos.items():
    missing = expected_fields - set(v.keys())
    if missing:
        errors.append(f'sos/{k}: missing {missing}')
    steps_n = len(v.get('steps', []))
    if steps_n < 3 or steps_n > 5:
        errors.append(f'sos/{k}: steps count={steps_n}')
    for i, s in enumerate(v.get('steps', [])):
        if len(s) > 120:
            errors.append(f'sos/{k}/step[{i}]: {len(s)} chars >120: {s[:80]}...')
    if v.get('tone') not in valid_tones:
        errors.append(f'sos/{k}: invalid tone {v.get("tone")}')

# shop validation
einhorn = json.load(io.open('_src/elite-motto-data/einhorn-mittel.json', encoding='utf-8'))
for variant in einhorn['variants']:
    vid = variant['id']
    orig_items = variant['shoppingList']
    cat_items = shop_cats.get(vid, [])
    if len(cat_items) != len(orig_items):
        errors.append(f'shop/{vid}: count mismatch — orig={len(orig_items)}, cats={len(cat_items)}')

    cats_seen = [c.get('category') for c in cat_items]
    valid_cats = {'pflicht','sinnvoll','habIchVielleicht'}
    invalid = set(cats_seen) - valid_cats
    if invalid:
        errors.append(f'shop/{vid}: invalid categories {invalid}')
    pflicht_pct = cats_seen.count('pflicht') * 100 // len(cats_seen) if cats_seen else 0
    if pflicht_pct >= 70:
        errors.append(f'shop/{vid}: pflicht_pct={pflicht_pct}% >=70%')

print('=== VALIDATION ===')
if errors:
    for e in errors:
        print(f'  ✗ {e}')
    print(f'\nTotal: {len(errors)} errors')
else:
    print('  ✓ All checks passed')

# Stats
print('\n=== STATS ===')
print(f'prep sections: {len(prep)}, items_per: {[len(prep[k]["items"]) for k in prep]}')
print(f'sos scenarios: {len(sos)}')
print(f'sos steps_max: {max(max(len(s) for s in v["steps"]) for v in sos.values())}')
for vid in ['minimal','standard','wow']:
    cats = [c['category'] for c in shop_cats[vid]]
    pcounts = {c: cats.count(c) for c in set(cats)}
    print(f'shop {vid}: {len(cats)} items, {pcounts}')

# === Merge ===
print('\n=== MERGE ===')
einhorn['preparationWeeks'] = prep
einhorn['sosScenarios'] = sos

# Merge shoppingList categories
for variant in einhorn['variants']:
    vid = variant['id']
    cat_items = shop_cats.get(vid, [])
    for orig in variant['shoppingList']:
        orig_label = orig.get('label', '').strip()
        for ci in cat_items:
            ci_label = ci.get('label', '').strip()
            if orig_label.startswith(ci_label[:20]) or ci_label.startswith(orig_label[:20]):
                orig['category'] = ci['category']
                orig['categoryReasoning'] = ci['reasoning']
                break

# Update meta
einhorn['_meta']['phase_b_complete'] = '2026-05-19'
einhorn['_meta']['phase_b_method'] = 'Direct draft (no content-loop pipeline) — heuristics from Phase B feuerwehr applied: steps <=120 chars, pflicht-Anteil <70%, motto-anchor per item.'

# Save final
with io.open('_src/elite-motto-data/einhorn-mittel.json', 'w', encoding='utf-8') as f:
    json.dump(einhorn, f, ensure_ascii=False, indent=2)

# Final stats
todos = json.dumps(einhorn).count('TODO_PHASE_B')
print(f'✓ Written einhorn-mittel.json — TODO markers: {todos}')
for v in einhorn['variants']:
    matched = sum(1 for i in v['shoppingList'] if 'category' in i)
    print(f'  shop {v["id"]}: {matched}/{len(v["shoppingList"])} items have category')
