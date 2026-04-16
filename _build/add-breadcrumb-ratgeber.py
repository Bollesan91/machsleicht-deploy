#!/usr/bin/env python3
"""
P1-6 Teil 2: BreadcrumbList JSON-LD auf alle Ratgeber-Seiten hinzufügen.
Idempotent: Wenn Breadcrumb schon da, wird nichts geändert.
"""
import re
from pathlib import Path

REPO = Path(__file__).parent.parent

# Ratgeber-Seiten mit ihren Anzeigenamen (was in Breadcrumb steht)
RATGEBER = {
    "kindergeburtstag-5-jahre.html": "5 Jahre",
    "kindergeburtstag-6-jahre.html": "6 Jahre",
    "kindergeburtstag-7-jahre.html": "7 Jahre",
    "kindergeburtstag-bei-regen.html": "Bei Regen",
    "kindergeburtstag-checkliste.html": "Checkliste",
    "kindergeburtstag-draussen.html": "Draußen",
    "kindergeburtstag-drinnen.html": "Drinnen",
    "kindergeburtstag-einladung-text.html": "Einladungstexte",
    "kindergeburtstag-essen.html": "Essen",
    "kindergeburtstag-kosten.html": "Kosten",
    "kindergeburtstag-last-minute.html": "Last Minute",
    "kindergeburtstag-mitgebsel.html": "Mitgebsel",
    "kindergeburtstag-spiele-draussen.html": "Spiele draußen",
    "kindergeburtstag-spiele-drinnen.html": "Spiele drinnen",
    "kindergeburtstag-torte-einfach.html": "Torte einfach",
    "kindergeburtstag-wenig-aufwand.html": "Wenig Aufwand",
    "kindergeburtstag-zeitplan.html": "Zeitplan",
    "kindergeburtstag-zuhause.html": "Zuhause",
}

def make_breadcrumb(slug, display_name):
    """Generate BreadcrumbList JSON-LD: Start > Kindergeburtstag > <Seite>."""
    url = f"https://machsleicht.de/{slug.replace('.html', '')}"
    return f'''  <script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {{
      "@type": "ListItem",
      "position": 1,
      "name": "Start",
      "item": "https://machsleicht.de/"
    }},
    {{
      "@type": "ListItem",
      "position": 2,
      "name": "Kindergeburtstag",
      "item": "https://machsleicht.de/kindergeburtstag"
    }},
    {{
      "@type": "ListItem",
      "position": 3,
      "name": "{display_name}",
      "item": "{url}"
    }}
  ]
}}
  </script>
'''

updated = 0
skipped = 0
errors = []

for slug, name in RATGEBER.items():
    f = REPO / slug
    if not f.exists():
        errors.append(f"{slug}: Datei nicht gefunden")
        continue

    content = f.read_text(encoding="utf-8")

    if "BreadcrumbList" in content:
        skipped += 1
        continue

    bc = make_breadcrumb(slug, name)

    # Insert after the last existing JSON-LD block, or before </head>
    matches = list(re.finditer(
        r'<script type="application/ld\+json">.*?</script>',
        content, re.DOTALL
    ))
    if matches:
        last = matches[-1]
        insert_pos = last.end()
        new_content = content[:insert_pos] + "\n" + bc.rstrip() + content[insert_pos:]
    else:
        if "</head>" not in content:
            errors.append(f"{slug}: kein </head> gefunden")
            continue
        new_content = content.replace("</head>", bc + "</head>", 1)

    f.write_text(new_content, encoding="utf-8")
    updated += 1
    print(f"  ✅ {slug} ({name})")

print(f"\nUpdated: {updated}, skipped: {skipped}")
if errors:
    print("ERRORS:")
    for e in errors:
        print(f"  ❌ {e}")
