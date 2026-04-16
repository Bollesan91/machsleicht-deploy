#!/usr/bin/env python3
"""
Tiefen-Audit aller Ratgeber-Seiten.
Pro Seite: 10 Dimensionen checken, Zufriedenheit in % ableiten.
"""
import re
import json
from pathlib import Path

REPO = Path(__file__).parent.parent

PAGES = [
    "kindergeburtstag-5-jahre.html",
    "kindergeburtstag-6-jahre.html",
    "kindergeburtstag-7-jahre.html",
    "kindergeburtstag-bei-regen.html",
    "kindergeburtstag-checkliste.html",
    "kindergeburtstag-draussen.html",
    "kindergeburtstag-drinnen.html",
    "kindergeburtstag-einladung-text.html",
    "kindergeburtstag-essen.html",
    "kindergeburtstag-kosten.html",
    "kindergeburtstag-last-minute.html",
    "kindergeburtstag-mitgebsel.html",
    "kindergeburtstag-spiele-draussen.html",
    "kindergeburtstag-spiele-drinnen.html",
    "kindergeburtstag-torte-einfach.html",
    "kindergeburtstag-wenig-aufwand.html",
    "kindergeburtstag-zeitplan.html",
    "kindergeburtstag-zuhause.html",
]

def analyze(path):
    content = (REPO / path).read_text(encoding="utf-8")
    stats = {}

    # Basics
    stats["size_kb"] = len(content) // 1024
    # Text content without HTML tags (rough estimate)
    text = re.sub(r'<script.*?</script>', '', content, flags=re.DOTALL)
    text = re.sub(r'<style.*?</style>', '', text, flags=re.DOTALL)
    text = re.sub(r'<[^>]+>', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    stats["word_count"] = len(text.split())

    # Structure
    stats["h1"] = len(re.findall(r'<h1[^>]*>', content))
    stats["h2"] = len(re.findall(r'<h2[^>]*>', content))
    stats["h3"] = len(re.findall(r'<h3[^>]*>', content))

    # Meta
    title_m = re.search(r'<title>(.*?)</title>', content)
    stats["title"] = title_m.group(1) if title_m else "MISSING"
    stats["title_len"] = len(stats["title"])
    desc_m = re.search(r'<meta name="description" content="(.*?)"', content)
    stats["desc"] = desc_m.group(1) if desc_m else "MISSING"
    stats["desc_len"] = len(stats["desc"])
    stats["has_canonical"] = 'rel="canonical"' in content
    stats["has_og_image"] = 'og:image' in content
    stats["custom_og_image"] = 'og:image' in content and 'og-home.png' not in content
    stats["has_plausible"] = 'plausible' in content.lower()

    # Schemas
    schema_types = set(re.findall(r'"@type":\s*"([^"]+)"', content))
    # Drop inner-types (Question, Answer, ListItem, HowToStep)
    core_types = {"FAQPage", "HowTo", "BreadcrumbList", "Article", "Recipe", "ItemList"}
    stats["schemas"] = sorted(schema_types & core_types)
    stats["has_faq"] = "FAQPage" in schema_types
    stats["has_howto"] = "HowTo" in schema_types
    stats["has_breadcrumb"] = "BreadcrumbList" in schema_types
    stats["faq_count"] = len(re.findall(r'"@type":\s*"Question"', content))
    stats["howto_count"] = len(re.findall(r'"@type":\s*"HowToStep"', content))

    # Links
    internal_links = len(re.findall(r'href="(?:/|https://machsleicht\.de)', content))
    stats["internal_links"] = internal_links

    # CTAs to planner
    stats["cta_to_planner"] = len(re.findall(r'href="[^"]*kindergeburtstag[^"]*#planer', content))
    stats["cta_to_einladung"] = len(re.findall(r'href="[^"]*einladung', content))
    stats["cta_to_partyseite"] = len(re.findall(r'href="[^"]*party\.machsleicht\.de', content))

    # Affiliate
    stats["affiliate_links"] = len(re.findall(r'amzn\.to|amazon\.de[^"]*tag=', content))

    # Content quality signals
    stats["has_tables"] = '<table' in content
    stats["has_lists"] = '<ul' in content or '<ol' in content
    stats["has_tip_boxes"] = 'class="tip"' in content or 'class="info"' in content
    stats["has_recipe_steps"] = 'recipe-step' in content
    stats["has_cost_box"] = 'cost-box' in content or 'cost-bar' in content
    stats["has_sticky_cta"] = 'position:fixed' in content.lower() or 'sticky' in content.lower()
    stats["has_footer"] = '<footer' in content
    stats["has_breadcrumb_visible"] = 'class="breadcrumb"' in content or 'breadcrumb">' in content

    # Scoring
    score = 0
    max_score = 0

    # Meta (10 pts)
    max_score += 10
    if stats["has_canonical"]: score += 2
    if 50 <= stats["title_len"] <= 65: score += 2
    elif stats["title_len"]: score += 1
    if 120 <= stats["desc_len"] <= 160: score += 2
    elif stats["desc_len"]: score += 1
    if stats["has_og_image"]: score += 2
    if stats["custom_og_image"]: score += 2

    # Structure (15 pts)
    max_score += 15
    if stats["h1"] == 1: score += 5
    if stats["h2"] >= 5: score += 5
    elif stats["h2"] >= 3: score += 3
    if stats["has_footer"]: score += 3
    if stats["has_breadcrumb_visible"]: score += 2

    # Schemas (25 pts)
    max_score += 25
    if stats["has_breadcrumb"]: score += 5
    if stats["has_faq"] and stats["faq_count"] >= 5: score += 10
    elif stats["has_faq"]: score += 6
    if stats["has_howto"] and stats["howto_count"] >= 5: score += 10
    elif stats["has_howto"]: score += 6

    # Content volume (15 pts)
    max_score += 15
    if stats["word_count"] >= 1500: score += 10
    elif stats["word_count"] >= 800: score += 6
    elif stats["word_count"] >= 400: score += 3
    if stats["has_tables"]: score += 3
    if stats["has_tip_boxes"]: score += 2

    # Monetization / Funnel (15 pts)
    max_score += 15
    if stats["cta_to_planner"] >= 2: score += 5
    elif stats["cta_to_planner"] >= 1: score += 3
    if stats["cta_to_einladung"] >= 1: score += 3
    if stats["cta_to_partyseite"] >= 1: score += 3
    if stats["affiliate_links"] >= 3: score += 4
    elif stats["affiliate_links"] >= 1: score += 2

    # Technical (10 pts)
    max_score += 10
    if stats["has_plausible"]: score += 3
    if stats["has_sticky_cta"]: score += 3
    if stats["internal_links"] >= 8: score += 4
    elif stats["internal_links"] >= 4: score += 2

    # Recipe-specific bonus (10 pts if applicable)
    if "torte" in path or "rezept" in path.lower():
        max_score += 10
        if stats["has_recipe_steps"]: score += 5
        if "Recipe" in stats["schemas"]: score += 5

    stats["score"] = score
    stats["max_score"] = max_score
    stats["pct"] = round(100 * score / max_score)

    return stats

results = []
for p in PAGES:
    s = analyze(p)
    s["page"] = p
    results.append(s)

# Sort by score ascending (worst first so we see what to fix)
results.sort(key=lambda x: x["pct"])

print("=" * 80)
print(f"{'Seite':<40} {'%':>4} {'Wörter':>7} {'Schemas':<30}")
print("=" * 80)
for r in results:
    schemas_str = ",".join(s[:4] for s in r["schemas"]) if r["schemas"] else "—"
    print(f"{r['page']:<40} {r['pct']:>3}% {r['word_count']:>7} {schemas_str}")

print("\n" + "=" * 80)
print("DETAILS pro Seite:\n")
for r in results:
    print(f"\n### {r['page']} — {r['pct']}% ({r['score']}/{r['max_score']})")
    print(f"  Title ({r['title_len']}): {r['title'][:80]}")
    print(f"  Desc ({r['desc_len']}): {r['desc'][:80]}")
    print(f"  Struct: H1={r['h1']} H2={r['h2']} H3={r['h3']} | Wörter: {r['word_count']} | Size: {r['size_kb']}KB")
    print(f"  Schemas: {','.join(r['schemas']) or 'KEINE'} | FAQs: {r['faq_count']} | HowTo-Steps: {r['howto_count']}")
    print(f"  Links: intern={r['internal_links']} | CTA-Planer={r['cta_to_planner']} | CTA-Einladung={r['cta_to_einladung']} | CTA-Party={r['cta_to_partyseite']}")
    print(f"  Affiliate: {r['affiliate_links']} | Custom-OG-Bild: {r['custom_og_image']} | Sticky: {r['has_sticky_cta']} | Footer: {r['has_footer']}")
