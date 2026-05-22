#!/usr/bin/env python3
"""Top-30 SEO-Champions identifizieren — Output für sitemap.xml Reduktion."""
import os, re

pages = []
for root, dirs, files in os.walk('.'):
    if any(x in root for x in ['.git', '_dev', '_build', '_src', 'node_modules']):
        continue
    for f in files:
        if not f.endswith('.html'):
            continue
        p = os.path.join(root, f)
        try:
            t = open(p, encoding='utf-8', errors='ignore').read()
            if 'name="robots" content="noindex' in t:
                continue
            if 'http-equiv="refresh"' in t and len(t) < 5000:
                continue
            words = len(re.sub(r'<[^>]+>', '', t).split())
            schemas = re.findall(r'"@type":\s*"([^"]+)"', t)
            schema_types = sorted(set(schemas))
            schema_count = len(schemas)
            rel = p[2:].replace(os.sep, '/')
            url = '/' + rel.replace('/index.html', '').replace('.html', '')
            tm = re.search(r'<title>([^<]+)</title>', t)
            title_len = len(tm.group(1)) if tm else 0
            pages.append({
                'path': rel,
                'url': url,
                'words': words,
                'schema_count': schema_count,
                'schema_types': schema_types,
                'title_len': title_len,
                'has_howto': 'HowTo' in schemas,
                'has_faq': 'FAQPage' in schemas,
                'has_breadcrumb': 'BreadcrumbList' in schemas,
            })
        except Exception:
            pass

for p in pages:
    p['seo_score'] = (
        min(p['words'] / 100, 70) * 0.5
        + p['schema_count'] * 1.5
        + (10 if p['title_len'] <= 65 else 0)
        + (15 if p['has_howto'] else 0)
        + (8 if p['has_faq'] else 0)
        + (5 if p['has_breadcrumb'] else 0)
    )

pages.sort(key=lambda x: -x['seo_score'])

print('# Top-30 SEO-Champions — Sitemap-Reduktions-Basis')
print()
print('Sortiert nach SEO-Stärke: Wörter (cap 7000), Schema-Vielfalt, Title-Länge,')
print('HowTo (+15), FAQ (+8), BreadcrumbList (+5).')
print()
print('| # | URL | Wörter | Schemas | TitleOK | Score |')
print('|---|---|---|---|---|---|')
for i, p in enumerate(pages[:30], 1):
    title_ok = 'OK' if p['title_len'] <= 65 else str(p['title_len']) + 'ch'
    sc = ','.join(p['schema_types'][:4])
    print(f'| {i} | `{p["url"]}` | {p["words"]} | {sc} | {title_ok} | {p["seo_score"]:.0f} |')

print()
print('## Bottom-20: Kill/Noindex-Kandidaten')
print()
print('| URL | Wörter | Schemas | Score | Empfehlung |')
print('|---|---|---|---|---|')
low = sorted(pages, key=lambda x: x['seo_score'])[:20]
for p in low:
    emp = 'KILL' if p['seo_score'] < 15 else ('NOINDEX' if p['seo_score'] < 25 else 'BEHALTEN')
    print(f'| `{p["url"]}` | {p["words"]} | {p["schema_count"]} | {p["seo_score"]:.0f} | {emp} |')

print()
print(f'## Stats')
print(f'- Total Pages (indexierbar): {len(pages)}')
print(f'- Pages mit HowTo: {sum(1 for p in pages if p["has_howto"])}')
print(f'- Pages mit FAQ: {sum(1 for p in pages if p["has_faq"])}')
print(f'- Pages mit Title OK (<=65ch): {sum(1 for p in pages if p["title_len"] <= 65)}')
