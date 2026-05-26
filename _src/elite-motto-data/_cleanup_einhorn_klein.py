#!/usr/bin/env python3
"""
Phase A.5 v2 — Cleanup + Strukturierung (mit HTML-Re-Parse für komplexe Sektionen)

Da das initiale Extract bei signatureRitual und cakeRecipe zu früh "flattened" hat,
gehen wir für diese 2 Sektionen direkt nochmal in die HTML.
"""
import json
import re
from html import unescape

SRC_JSON = '_src/elite-motto-data/einhorn-klein.json'
SRC_HTML = 'kindergeburtstag/einhorn-3-5-jahre.html'


def clean_text(s):
    s = re.sub(r'<a[^>]*href="([^"]*)"[^>]*>([^<]*)</a>', r'[\2](\1)', s)
    s = re.sub(r'<br\s*/?>', '\n', s)
    s = re.sub(r'</li>\s*<li[^>]*>', '\n• ', s)
    s = re.sub(r'<li[^>]*>', '• ', s)
    s = re.sub(r'</li>', '', s)
    s = re.sub(r'</p>\s*<p[^>]*>', '\n\n', s)
    s = re.sub(r'</?p[^>]*>', '', s)
    s = re.sub(r'<[^>]+>', '', s)
    s = unescape(s)
    s = re.sub(r' +', ' ', s)
    s = re.sub(r'\n[ \t]+', '\n', s)
    s = re.sub(r'\n{3,}', '\n\n', s)
    return s.strip()


with open(SRC_JSON, encoding='utf-8') as f:
    data = json.load(f)
with open(SRC_HTML, encoding='utf-8') as f:
    html = f.read()


# ============================================================
# 1) MÜLL RAUS (vollständig, alle Stellen)
# ============================================================
GARBAGE_KEYS = {
    '_raw_size', '_scheduleRawFallback', 'allMarkersFound',
    'rawPriceLabel', 'rawHtml', 'ageAdjust7', 'rawFallback',
    'plainTextFallback',  # nur falls schon strukturiert ist
}

def strip_garbage(d, keep_plain_text_if_no_structured=False):
    if isinstance(d, dict):
        # Drop parentTips.plainText only if structured exists
        if 'plainText' in d and 'structured' in d and d.get('structured'):
            d = {k: v for k, v in d.items() if k != 'plainText'}
        return {k: strip_garbage(v) for k, v in d.items() if k not in GARBAGE_KEYS}
    if isinstance(d, list):
        return [strip_garbage(x) for x in d]
    return d

# Lean _meta
data['_meta'] = {
    'source_file': data['_meta']['source_file'],
    'extracted': data['_meta']['extracted'],
    'schema_version': '1.0',
    'purpose': 'Einhorn 3-5 (klein) — Phase C #4 Elite-Slot, H2-Ritual-Template',
}


# ============================================================
# 2) schedule[].block → {title, description}
# ============================================================
def split_block(block_text):
    if not block_text:
        return {'title': None, 'description': None}
    parts = block_text.split('\n', 1)
    return {
        'title': parts[0].strip(),
        'description': parts[1].strip() if len(parts) > 1 else None
    }

for v in data.get('variants', []):
    if not v.get('schedule'):
        continue
    new_schedule = []
    for slot in v['schedule']:
        parsed = split_block(slot.get('block', ''))
        new_schedule.append({
            'time': slot['time'],
            'title': parsed['title'],
            'description': parsed['description'],
        })
    v['schedule'] = new_schedule


# ============================================================
# 3) signatureRitual: re-parse from HTML for rolesList + setupSteps
# ============================================================
sig_html_match = re.search(
    r'<h2[^>]*>[^<]*Sternenstaub-Ritual[^<]*</h2>(.*?)<h2',
    html, re.DOTALL)
sig_html = sig_html_match.group(1) if sig_html_match else ''

# 3a) Intro paragraph (first <p>)
first_p = re.search(r'<p[^>]*>(.*?)</p>', sig_html, re.DOTALL)
intro_text = clean_text(first_p.group(1)) if first_p else ''

# 3b) Setup steps (<ul><li><strong>Title</strong> body</li>...</ul>)
ul_match = re.search(r'<ul>(.*?)</ul>', sig_html, re.DOTALL)
setup_steps = []
if ul_match:
    for li in re.finditer(r'<li[^>]*>(.*?)</li>', ul_match.group(1), re.DOTALL):
        li_body = li.group(1)
        # Try to split title (in <strong>) from rest
        title_m = re.match(r'\s*<strong>([^<]+?)</strong>\s*(.*)', li_body, re.DOTALL)
        if title_m:
            title = clean_text(title_m.group(1)).rstrip(':—→').strip()
            content = clean_text(title_m.group(2)).strip(' —→')
            setup_steps.append({'title': title, 'content': content})
        else:
            setup_steps.append({'title': None, 'content': clean_text(li_body)})

# 3c) Roles list — find the grid with role definitions
# Use the following <p> as terminator instead of </div> (which would match the first inner div)
roles_grid = re.search(
    r'<div\s+style="display:grid[^"]*">(.*?)</div>\s*<p',
    sig_html, re.DOTALL)
roles_list = []
if roles_grid:
    # Einhorn-Style: <div>EMOJI Name</div> (no · separator, no function)
    # Feuerwehr-Style: <div>EMOJI Name · Funktion</div>
    for role_m in re.finditer(r'<div>([^<]+)</div>', roles_grid.group(1)):
        text = clean_text(role_m.group(1)).strip()
        if not text:
            continue
        # Check for · separator (feuerwehr-style)
        if '·' in text:
            parts = text.split('·', 1)
            name_part = parts[0].strip()
            func = parts[1].strip()
        else:
            name_part = text
            func = None
        emoji_m = re.match(r'^(\S+)\s+(.+)$', name_part)
        if emoji_m:
            emoji = emoji_m.group(1)
            name = emoji_m.group(2).strip()
        else:
            emoji = None
            name = name_part
        roles_list.append({
            'emoji': emoji,
            'name': name,
            'function': func,
        })

# 3d) Optional: "Wenn ein Kind nicht will" + "Material" paragraphs
optout_m = re.search(
    r'<p[^>]*><strong>Wenn ein Kind nicht will:?</strong>\s*(.*?)</p>',
    sig_html, re.DOTALL)
optout_note = clean_text(optout_m.group(1)) if optout_m else None

material_m = re.search(
    r'<p[^>]*><strong>Material für alle 3 Varianten:?</strong>\s*(.*?)</p>',
    sig_html, re.DOTALL)
material_note = clean_text(material_m.group(1)) if material_m else None

data['signatureRitual'] = {
    'name': 'Das Sternenstaub-Ritual',
    'subtitle': 'Für alle 3 Varianten',
    'introText': intro_text,
    'setupSteps': setup_steps,
    'rolesList': roles_list,
    'optOutNote': optout_note,
    'materialNote': material_note,
}

print(f"--- signatureRitual ---")
print(f"  setupSteps: {len(setup_steps)}")
print(f"  rolesList: {len(roles_list)}")
for r in roles_list[:3]:
    print(f"    - {r['emoji']} {r['name']} · {r['function']}")
print(f"    ... +{len(roles_list)-3} weitere")
print(f"  optOutNote: {(optout_note or '')[:60]}…")
print(f"  materialNote: {(material_note or '')[:60]}…")


# ============================================================
# 4) cakeRecipe: re-parse from HTML
# ============================================================
cake_html_match = re.search(
    r'<h2[^>]*>🎂\s+[^<]*</h2>(.*?)<h2',
    html, re.DOTALL)
cake_html = cake_html_match.group(1) if cake_html_match else ''

# Intro <p>
cake_intro_m = re.search(r'<p[^>]*>(.*?)</p>', cake_html, re.DOTALL)
cake_intro = clean_text(cake_intro_m.group(1)) if cake_intro_m else None

# Recipe steps: <div class="recipe-step"><div class="recipe-num">N</div><div class="recipe-text">...</div></div>
cake_steps = []
for step_m in re.finditer(
        r'<div class="recipe-step">\s*<div class="recipe-num">(\d+)</div>\s*<div class="recipe-text">(.*?)</div>\s*</div>',
        cake_html, re.DOTALL):
    cake_steps.append({
        'n': int(step_m.group(1)),
        'content': clean_text(step_m.group(2)),
    })

# Footer paragraph with Aufwand/Kosten/Allergiker
footer_m = re.search(
    r'<p[^>]*>\s*<strong>Aufwand:\s*</strong>\s*([^<]+?)\s*<strong>Kosten:\s*</strong>\s*([^<]+?)\s*<strong>Allergiker:\s*</strong>\s*([^<]+?)</p>',
    cake_html, re.DOTALL)
cake_meta = None
if footer_m:
    cake_meta = {
        'aufwand': footer_m.group(1).strip().rstrip('.').strip(),
        'kosten': footer_m.group(2).strip().rstrip('.').strip(),
        'allergiker': footer_m.group(3).strip().rstrip('.').strip(),
    }

# Extra cake tips (after the recipe card, before next h2): <div class="tip"><strong>...</strong><p>...</p></div>
cake_tips = []
for tip_m in re.finditer(
        r'<div class="tip">\s*<strong>([^<]+)</strong>\s*<p[^>]*>(.*?)</p>\s*</div>',
        cake_html, re.DOTALL):
    cake_tips.append({
        'title': clean_text(tip_m.group(1)),
        'body': clean_text(tip_m.group(2)),
    })

data['cakeRecipe'] = {
    'intro': cake_intro,
    'steps': cake_steps,
    'meta': cake_meta if cake_meta else None,
    'tips': cake_tips if cake_tips else None,
}

print(f"\n--- cakeRecipe ---")
print(f"  steps: {len(cake_steps)}")
for s in cake_steps:
    print(f"    {s['n']}. {s['content'][:75]}")
print(f"  meta: {cake_meta}")
print(f"  tips: {len(cake_tips)}")
for t in cake_tips:
    print(f"    - {t['title']}")


# ============================================================
# 5) Strip garbage everywhere
# ============================================================
data = strip_garbage(data)

# Simplify TODO markers
for k in ['preparationWeeks', 'sosScenarios']:
    if k in data and data[k].get('_status') == 'TODO_PHASE_B':
        data[k] = {
            '_status': 'TODO_PHASE_B',
            '_note': data[k].get('_note'),
        }


# ============================================================
# Write
# ============================================================
with open(SRC_JSON, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"\n✓ Written: {SRC_JSON}")
print(f"  Size: {len(json.dumps(data, ensure_ascii=False))} chars")
