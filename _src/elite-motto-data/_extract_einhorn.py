#!/usr/bin/env python3
"""
Extract Einhorn 6-8 Elite page to structured JSON.
Adapted from _extract.py (Feuerwehr-Template). Motto-specific changes inline.
"""
import re
import json
import sys
from html import unescape

SRC = 'kindergeburtstag/einhorn-6-8-jahre.html'

def clean_text(s):
    """HTML → plain text, preserving inline structure."""
    # Preserve links as markdown-style
    s = re.sub(r'<a[^>]*href="([^"]*)"[^>]*>([^<]*)</a>', r'[\2](\1)', s)
    # Line breaks
    s = re.sub(r'<br\s*/?>', '\n', s)
    s = re.sub(r'</li>\s*<li[^>]*>', '\n• ', s)
    s = re.sub(r'<li[^>]*>', '• ', s)
    s = re.sub(r'</li>', '', s)
    s = re.sub(r'</p>\s*<p[^>]*>', '\n\n', s)
    s = re.sub(r'</?p[^>]*>', '', s)
    s = re.sub(r'</h[1-6]>', '\n', s)
    s = re.sub(r'<h[1-6][^>]*>', '', s)
    # Remove all remaining tags
    s = re.sub(r'<[^>]+>', '', s)
    s = unescape(s)
    # Tidy whitespace
    s = re.sub(r' +', ' ', s)
    s = re.sub(r'\n[ \t]+', '\n', s)
    s = re.sub(r'\n{3,}', '\n\n', s)
    return s.strip()

def extract_links(s):
    """Pull all href= as list of {label, url}."""
    return [{'label': clean_text(m.group(2)).strip(), 'url': m.group(1)}
            for m in re.finditer(r'<a[^>]*href="([^"]*)"[^>]*>([^<]*)</a>', s)]


with open(SRC, encoding='utf-8') as f:
    html = f.read()

result = {
    "_meta": {
        "source_file": "kindergeburtstag/einhorn-6-8-jahre.html",
        "source_size_chars": len(html),
        "extracted": "2026-05-19",
        "purpose": "Phase C extraction — 2. Elite-Slot (Schema-Robustness-Test vs. feuerwehr-Template)",
        "extraction_method": "HTML parsed, content 1:1 transferred to structured fields. Anything not in source is marked TODO_PHASE_B."
    },
    "motto": "einhorn",
    "ageGroup": "mittel",
    "ageRange": [6, 8],
}

# ============================================================
# SECTION 1: H1 + page intro
# ============================================================
h1_match = re.search(r'<h1[^>]*>(.*?)</h1>', html)
result['title'] = clean_text(h1_match.group(1)) if h1_match else None

# Meta description
desc_match = re.search(r'<meta name="description" content="([^"]+)"', html)
result['metaDescription'] = desc_match.group(1) if desc_match else None

# Intro paragraph (everything between h1 close and first h2/h3)
intro_match = re.search(r'</h1>(.*?)<(?:h2|h3)', html, re.DOTALL)
result['introParagraph'] = clean_text(intro_match.group(1)) if intro_match else None

# ============================================================
# SECTION 2: ageInsight ("Was 6-8-Jährige ausmacht")
# ============================================================
age_match = re.search(
    r'<h3[^>]*>🧠 Was 6–8-Jährige ausmacht.*?</h3>(.*?)<h3',
    html, re.DOTALL)
if age_match:
    raw = age_match.group(1)
    # Pattern: <ul><li><strong>Topic:</strong> detail</li>...
    li_pairs = re.findall(r'<li[^>]*><strong>([^<]+?):?</strong>\s*(.*?)</li>', raw, re.DOTALL)
    structured_traits = []
    for topic, detail in li_pairs:
        structured_traits.append({
            'topic': clean_text(topic).rstrip(':').strip(),
            'detail': clean_text(detail)
        })

    # WhyMottoFits: usually in a <div class="tip"> after the ul
    why_m = re.search(r'<div class="tip"[^>]*>\s*<strong>([^<]+)</strong>\s*<p[^>]*>(.*?)</p>',
                      raw, re.DOTALL)

    result['ageInsight'] = {
        'headline': 'Was 6–8-Jährige ausmacht — und was das für die Einhorn-Party heißt',
        'traits': structured_traits if structured_traits else None,
        'rawFallback': clean_text(raw) if not structured_traits else None,
        'whyMottoFits': clean_text(why_m.group(2)) if why_m else None,
        'whyMottoFitsHeadline': clean_text(why_m.group(1)) if why_m else None,
    }

# ============================================================
# SECTION 3: signatureRitual
# ============================================================
sig_match = re.search(
    r'<h3[^>]*>[^<]*Das Signature-Ritual[^<]*</h3>(.*?)<h2',
    html, re.DOTALL)
if sig_match:
    raw = sig_match.group(1)
    result['signatureRitual'] = {
        'name': 'Der Sternenstaub-Beutel',
        'subtitle': 'für alle 3 Varianten',
        'rawHtml': raw.strip()[:200] + '...[truncated]',
        'plainText': clean_text(raw),
    }

# ============================================================
# SECTION 4: 3 Variants (Minimal, Standard, Wow)
# ============================================================
def extract_variant(variant_id, variant_label):
    """Extract one variant panel."""
    pat = rf'<div class="variant-panel[^"]*" id="panel-{variant_id}">(.*?)(?=<div class="variant-panel|<!--\s*/panel-{variant_id}\s*-->)'
    m = re.search(pat, html, re.DOTALL)
    if not m:
        # Fallback: find by id and grab until next variant-panel or section end
        start = html.find(f'id="panel-{variant_id}"')
        if start == -1: return None
        # Back up to <div
        div_start = html.rfind('<div', 0, start)
        # Forward to next variant-panel div or close-section
        next_panel = html.find('<div class="variant-panel', div_start + 100)
        section_close = html.find('</section>', div_start)
        candidates = [c for c in [next_panel, section_close] if c > 0]
        end = min(candidates) if candidates else len(html)
        body = html[div_start:end]
    else:
        body = m.group(1)

    variant = {'id': variant_id, 'label': variant_label, '_raw_size': len(body)}

    # Headline + intro paragraph
    first_p = re.search(r'<p[^>]*style="[^"]*"[^>]*>(.*?)</p>', body)
    variant['headline'] = clean_text(first_p.group(1)) if first_p else None
    # Second p = description
    second_p = re.search(r'</p>\s*<p[^>]*>(.*?)</p>', body)
    variant['intro'] = clean_text(second_p.group(1)) if second_p else None

    # Zeitplan
    zp_match = re.search(
        r'<h3[^>]*>⏱️ Zeitplan\s*\(([^)]+)\)[^<]*</h3>(.*?)(?=<h3|<h4)',
        body, re.DOTALL)
    if zp_match:
        variant['timeWindow'] = zp_match.group(1).strip()
        zp_body = zp_match.group(2)
        # Extract time-slot rows. Pattern in HTML: <div class="zeit"> 14:00 </div><div><b>title</b><p>desc</p></div>
        # Simpler: find pairs of "<time-like-pattern>" then block
        time_blocks = re.findall(
            r'<(?:div|td)[^>]*>\s*(\d{1,2}:\d{2})\s*</(?:div|td)>(.*?)(?=<(?:div|td)[^>]*>\s*\d{1,2}:\d{2}\s*<|$)',
            zp_body, re.DOTALL)
        slots = []
        for time, content in time_blocks:
            slots.append({
                'time': time,
                'block': clean_text(content)
            })
        variant['schedule'] = slots if slots else None
        variant['_scheduleRawFallback'] = clean_text(zp_body) if not slots else None

    # Games (H4 blocks within the variant)
    games = []
    # Split variant body on h4 markers
    h4_starts = [(m.start(), m) for m in re.finditer(r'<h4[^>]*>(.*?)</h4>', body)]
    for i, (h4_pos, h4_m) in enumerate(h4_starts):
        name = clean_text(h4_m.group(1))
        # Game body is between this h4 end and next h4 OR next h3 OR variant end
        block_start = h4_m.end()
        block_end = h4_starts[i+1][0] if i+1 < len(h4_starts) else len(body)
        # Cut at next h3 if earlier
        next_h3 = re.search(r'<h3', body[block_start:block_end])
        if next_h3:
            block_end = block_start + next_h3.start()
        game_body = body[block_start:block_end]

        # game-meta: badges
        meta_m = re.search(r'<div class="game-meta">(.*?)</div>', game_body, re.DOTALL)
        badges_text = clean_text(meta_m.group(1)) if meta_m else ''

        indoor = 'Drinnen' in badges_text
        outdoor = 'Draußen' in badges_text or 'Drauß' in badges_text
        dur_match = re.search(r'(\d{1,3})\s*Min\.', badges_text)
        duration = int(dur_match.group(1)) if dur_match else None
        min_age_match = re.search(r'Ab\s+(\d+)\s+Jahre', badges_text)
        min_age = int(min_age_match.group(1)) if min_age_match else None
        loud = None
        if 'Sehr laut' in badges_text: loud = 'sehr_laut'
        elif 'Laut' in badges_text: loud = 'laut'
        elif 'Ruhig' in badges_text: loud = 'ruhig'
        elif 'Mittel' in badges_text or '🔉' in badges_text: loud = 'mittel'
        effort = None
        for level, marker in [('leicht','Aufwand: leicht'),('mittel','Aufwand: mittel'),('hoch','Aufwand: hoch')]:
            if marker in badges_text:
                effort = level
                break

        # game-needs: Material
        needs_m = re.search(r'<div class="game-needs">(.*?)</div>', game_body, re.DOTALL)
        material_raw = None
        if needs_m:
            mat_text = clean_text(needs_m.group(1))
            # Strip leading "Material:" label
            material_raw = re.sub(r'^Material:\s*', '', mat_text).strip()

        # game-rules: full ablauf + special markers
        rules_m = re.search(r'<div class="game-rules">(.*?)</div>', game_body, re.DOTALL)
        rules_html = rules_m.group(1) if rules_m else ''

        # Parse rules_html into 3 parts:
        # 1) Prep text — everything before "<strong>Ablauf:</strong>" (or first <strong> if no Ablauf marker)
        # 2) Steps — numbered list after Ablauf
        # 3) Markers — labeled paragraphs after steps (Tipp, Für X-Jährige, Indoor-Tipp, Sicherheit, Warum X)

        prep_text = None
        steps = []
        markers = {}

        ablauf_m = re.search(r'<strong>Ablauf:?\s*</strong>', rules_html)
        if ablauf_m:
            prep_text = clean_text(rules_html[:ablauf_m.start()]).strip()
            after_ablauf = rules_html[ablauf_m.end():]
            # Find next non-step marker (Tipp, Für X-Jährige, Indoor-Tipp, Sicherheit, Warum, Outdoor)
            stop_pat = re.compile(
                r'<strong>(Tipp|Für \d+-Jährige|Indoor-Tipp|Outdoor-Tipp|Outdoor-Vorteil|Sicherheit(?:\s*\([^)]+\))?|Warum [^<:]+?|Tieferer Sinn|Material(?:\s+gesamt)?:?|Was [^<]+?)[:.]?</strong>',
                re.IGNORECASE)
            stop_m = stop_pat.search(after_ablauf)
            steps_html = after_ablauf[:stop_m.start()] if stop_m else after_ablauf
            tail_html = after_ablauf[stop_m.start():] if stop_m else ''

            # Parse numbered steps. Pattern: "N. <strong>step_name[:]</strong> ... <br>" until next "M." or end
            # First, split steps_html on the "N." anchors that precede <strong>
            step_chunks = re.split(r'(?=<br[^>]*>\s*\d+\.\s*<strong>)', steps_html)
            for chunk in step_chunks:
                step_m = re.search(
                    r'(\d+)\.\s*<strong>([^<]+?)</strong>\s*(.*)',
                    chunk, re.DOTALL)
                if step_m:
                    num = int(step_m.group(1))
                    step_name = clean_text(step_m.group(2)).rstrip(':').strip()
                    content = clean_text(step_m.group(3)).strip(' —–-')
                    if step_name:
                        steps.append({'n': num, 'name': step_name, 'content': content})

            # Parse trailing markers
            for sm in re.finditer(r'<strong>([^<]+?)[:.]?</strong>\s*([^<]+?)(?=<br|<strong|$)',
                                  tail_html, re.DOTALL):
                label = clean_text(sm.group(1)).rstrip(':').strip()
                content = clean_text(sm.group(2)).strip(' —–-')
                if label and content:
                    markers[label] = content
        else:
            # No "Ablauf:" anchor — split on first <strong> for prep, parse all strongs as markers
            first_strong = re.search(r'<strong>', rules_html)
            if first_strong:
                prep_text = clean_text(rules_html[:first_strong.start()]).strip()
            else:
                prep_text = clean_text(rules_html).strip()
            for sm in re.finditer(r'<strong>([^<]+?)[:.]?</strong>\s*([^<]+?)(?=<br|<strong|$)',
                                  rules_html, re.DOTALL):
                label = clean_text(sm.group(1)).rstrip(':').strip()
                content = clean_text(sm.group(2)).strip(' —–-')
                if label and content:
                    markers[label] = content

        # Map markers
        age6 = age8 = age7 = indoor_tip = outdoor_tip = safety_rule = warum_label = warum_text = None
        for key, val in markers.items():
            k = key.lower()
            if 'für 6' in k or '6-jährig' in k: age6 = val
            elif 'für 7' in k or '7-jährig' in k: age7 = val
            elif 'für 8' in k or '8-jährig' in k: age8 = val
            elif 'indoor' in k: indoor_tip = val
            elif 'outdoor' in k: outdoor_tip = val
            elif 'sicherheit' in k: safety_rule = val
            elif k.startswith('warum') or 'tieferer sinn' in k:
                warum_label = key
                warum_text = val

        games.append({
            'name': name,
            'indoor': indoor,
            'outdoor': outdoor,
            'duration': duration,
            'minAge': min_age,
            'loudness': loud,
            'effort': effort,
            'material': material_raw,
            'prepText': prep_text,
            'steps': steps,
            'safetyRule': safety_rule,
            'ageAdjust6': age6,
            'ageAdjust7': age7,
            'ageAdjust8': age8,
            'indoorTip': indoor_tip,
            'outdoorTip': outdoor_tip,
            'whyItWorksTitle': warum_label,
            'whyItWorks': warum_text,
            'allMarkersFound': list(markers.keys()),
        })
    variant['games'] = games

    # Essen
    food = re.search(r'<h3[^>]*>🍿 Essen[^<]*</h3>(.*?)(?=<h3)', body, re.DOTALL)
    if food:
        variant['food'] = clean_text(food.group(1))

    # Deko
    deko = re.search(r'<h3[^>]*>🎨 Deko[^<]*</h3>(.*?)(?=<h3)', body, re.DOTALL)
    if deko:
        variant['decoration'] = clean_text(deko.group(1))

    # Mitgebsel
    mit = re.search(r'<h3[^>]*>🎁 Mitgebsel[^<]*</h3>(.*?)(?=<h3)', body, re.DOTALL)
    if mit:
        variant['giveaways'] = clean_text(mit.group(1))

    # Einkaufsliste with affiliate links — extract items as flex-div rows
    shop = re.search(r'<h3[^>]*>🛒 Einkaufsliste[^<]*</h3>(.*?)(?=<h3|<!--\s*===|<div class="variant-panel)',
                     body, re.DOTALL)
    if shop:
        shop_body = shop.group(1)
        items = []
        # Each row is <div style="display:flex...">...<span>label_or_link</span>...<span>price</span></div>
        for row_m in re.finditer(
                r'<div style="display:flex[^"]*">\s*<span>(.*?)</span>\s*<span[^>]*>([^<]+)</span>\s*</div>',
                shop_body, re.DOTALL):
            left = row_m.group(1)
            right = row_m.group(2).strip()
            # Try to extract link inside left side
            link_m = re.search(r'<a[^>]*href="([^"]+)"[^>]*>([^<]+)</a>', left)
            # Emoji is everything before the <a> or first word
            if link_m:
                pre_link = left[:link_m.start()].strip()
                emoji = clean_text(pre_link)
                label = clean_text(link_m.group(2)).replace('*', '').strip()
                url = link_m.group(1)
                hasAffiliate = True
            else:
                # No link — emoji + label inline
                clean_left = clean_text(left)
                # First char(s) before space = emoji
                parts = clean_left.split(' ', 1)
                emoji = parts[0] if parts else ''
                label = parts[1] if len(parts) > 1 else clean_left
                url = None
                hasAffiliate = False

            # Price
            price = None
            if 'kostenlos' in right.lower():
                price = 0
            else:
                p_m = re.search(r'(\d+)', right)
                if p_m:
                    price = int(p_m.group(1))

            items.append({
                'emoji': emoji,
                'label': label,
                'url': url,
                'priceEur': price,
                'hasAffiliate': hasAffiliate,
                'rawPriceLabel': right,
            })
        variant['shoppingList'] = items

        # Total cost from <div class="cost-bar"><span class="cost-value">~XX €</span></div>
        cost_m = re.search(r'<div class="cost-bar">.*?<span class="cost-value">([^<]+)</span>',
                           shop_body, re.DOTALL)
        if cost_m:
            cv = cost_m.group(1)
            cv_n = re.search(r'(\d+)', cv)
            variant['estimatedCostEur'] = int(cv_n.group(1)) if cv_n else None
        # Also pull the cost-label for context (e.g. "Geschätzte Kosten (Minimal, 6 Kinder)")
        cost_lbl_m = re.search(r'<span class="cost-label">([^<]+)</span>', shop_body)
        variant['costContext'] = clean_text(cost_lbl_m.group(1)) if cost_lbl_m else None

        # Spar-Trick or Warum kostet — explanation tip box
        tip_m = re.search(r'<div class="tip">(.*?)</div>', shop_body, re.DOTALL)
        if tip_m:
            tip_html = tip_m.group(1)
            tip_title_m = re.search(r'<strong>([^<]+)</strong>', tip_html)
            tip_body_m = re.search(r'</strong>\s*<p[^>]*>(.*?)</p>', tip_html, re.DOTALL)
            variant['savingsTip'] = {
                'title': clean_text(tip_title_m.group(1)) if tip_title_m else None,
                'body': clean_text(tip_body_m.group(1)) if tip_body_m else clean_text(tip_html),
            }

    return variant


for v_id, v_label in [('minimal', 'Minimal — 2 Stunden, minimaler Aufwand'),
                       ('standard', 'Standard — 3 Stunden, vollständige Schicht'),
                       ('wow', 'Wow — 3,5 Stunden, die volle Schicht')]:
    v = extract_variant(v_id, v_label)
    if v:
        if 'variants' not in result:
            result['variants'] = []
        result['variants'].append(v)

# ============================================================
# SECTION 5: Cake recipe
# ============================================================
cake = re.search(r'<h2[^>]*>🎂\s+[^<]*</h2>(.*?)<h2', html, re.DOTALL)
if cake:
    result['cakeRecipe'] = clean_text(cake.group(1))

# ============================================================
# SECTION 6: Eltern-Tipps
# ============================================================
elt = re.search(r'<h2[^>]*>💡 Eltern-Tipps[^<]*</h2>(.*?)<h2', html, re.DOTALL)
if elt:
    raw = elt.group(1)
    # Pattern: <strong>EMOJI Topic-Title</strong> followed by content until next <strong> with emoji
    # Capture each tip block: <strong>(.+?)</strong>(.+?)(?=<strong>[^<]*\S\s|$)
    # But many tips are wrapped in their own divs/details — use details/summary first
    detail_pat = re.findall(r'<details[^>]*>\s*<summary[^>]*>(.*?)</summary>(.*?)</details>', raw, re.DOTALL)
    parsed = []
    if detail_pat:
        for summary, body_ in detail_pat:
            parsed.append({'topic': clean_text(summary), 'detail': clean_text(body_)})
    else:
        # Fallback: split by <strong>EMOJI...</strong> headers
        # Find emoji-prefixed strongs (not numbered "1.", "2.", "3.")
        chunks = re.split(r'<strong>((?:[\U0001F000-\U0001FFFF]|[\u2600-\u27BF])[^<]+)</strong>', raw)
        # chunks[0] is text before any topic. Then pairs: topic, content
        for i in range(1, len(chunks)-1, 2):
            topic = clean_text(chunks[i])
            content = clean_text(chunks[i+1])
            if topic and content:
                parsed.append({'topic': topic, 'detail': content})

    # Also extract the leading "🧠 Was die Kinder wirklich mitnehmen" block if present
    intro_strong = re.search(r'<strong>🧠 Was die Kinder wirklich mitnehmen[^<]*</strong>\s*<p[^>]*>(.*?)</p>',
                             raw, re.DOTALL)

    result['parentTips'] = {
        'structured': parsed if parsed else None,
        'educationalValue': clean_text(intro_strong.group(1)) if intro_strong else None,
        'plainText': clean_text(raw) if not parsed else None,
    }

# ============================================================
# SECTION 7: Invitation
# ============================================================
inv = re.search(r'<h2[^>]*>💌 Einladung[^<]*</h2>(.*?)<h2', html, re.DOTALL)
if inv:
    result['invitationTemplate'] = clean_text(inv.group(1))

# ============================================================
# SECTION 8: FAQ
# ============================================================
faq = re.search(r'<h2[^>]*>❓ Häufige Fragen[^<]*</h2>(.*?)<h2', html, re.DOTALL)
if faq:
    raw = faq.group(1)
    qas = re.findall(r'<details[^>]*>\s*<summary[^>]*>(.*?)</summary>(.*?)</details>', raw, re.DOTALL)
    if qas:
        result['faq'] = [{'q': clean_text(q), 'a': clean_text(a)} for q, a in qas]
    else:
        result['faq'] = {'plainText': clean_text(raw)}

# ============================================================
# Phase B placeholders — explicitly TODO
# ============================================================
result['preparationWeeks'] = {
    '_status': 'TODO_PHASE_B',
    '_note': 'Datums-getriebener Wochenplan ist im Quell-HTML nicht vorhanden. Muss in Phase B geschrieben werden.',
    '_promptForPhaseB': 'Schreibe 6 Zeitfenster (minus4Weeks, minus2Weeks, minus1Week, minus2Days, minus1Day, dayOf) mit konkreten Action-Items für Einhorn-6-8-Party.'
}
result['sosScenarios'] = {
    '_status': 'TODO_PHASE_B',
    '_note': 'SOS-Pannen-Antworten sind im Quell-HTML nicht vorhanden. Müssen in Phase B geschrieben werden.',
    '_promptForPhaseB': 'Schreibe 6-8 SOS-Szenarien (Regen, weniger Kinder, mehr Kinder, Kind weint, Spielzeug kaputt, Kuchen misslungen, Eltern erscheinen früh)'
}

# ============================================================
# Write result
# ============================================================
out_path = '_src/elite-motto-data/einhorn-mittel.json'
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(result, f, ensure_ascii=False, indent=2)

print(f"Written: {out_path}")
print(f"Size: {len(json.dumps(result, ensure_ascii=False))} chars")
print(f"Top-level keys: {list(result.keys())}")
print()
print("Variant details:")
for v in result.get('variants', []):
    print(f"  {v['id']:10s}: {len(v.get('games',[]))} games, "
          f"{len(v.get('schedule',[]) or [])} time slots, "
          f"{len(v.get('shoppingList',[]) or [])} shopping items, "
          f"cost ~{v.get('estimatedCostEur')}€")
