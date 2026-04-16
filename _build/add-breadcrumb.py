#!/usr/bin/env python3
"""
P1-6: BreadcrumbList JSON-LD Schema zu allen Motto-Hauptseiten hinzufügen.
Idempotent: Wenn Breadcrumb schon da, wird nichts geändert.
"""
import re
import os
from pathlib import Path

REPO = Path(__file__).parent.parent
MOTTO_DIR = REPO / "kindergeburtstag"

# Name-Mapping für die Breadcrumbs (title case + Emojis weg)
MOTTO_NAMES = {
    "detektiv": "Detektiv",
    "dino": "Dino",
    "einhorn": "Einhorn",
    "feuerwehr": "Feuerwehr",
    "frozen": "Frozen",
    "harry-potter": "Harry Potter",
    "meerjungfrau": "Meerjungfrau",
    "minecraft": "Minecraft",
    "ninjago": "Ninjago",
    "paw-patrol": "Paw Patrol",
    "pferde": "Pferde",
    "piraten": "Piraten",
    "pokemon": "Pokémon",
    "ritter": "Ritter",
    "safari": "Safari",
    "spider-man": "Spider-Man",
    "super-mario": "Super Mario",
    "weltraum": "Weltraum",
    "zirkus": "Zirkus",
}

# Exclude: Druckvorlagen, keine echten Landingpages
EXCLUDE = {"dino-forscherpass.html", "dino-quiz.html", "dino-mitmachbuch.html"}

def make_breadcrumb(slug, display_name):
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
      "item": "https://machsleicht.de/kindergeburtstag/{slug}"
    }}
  ]
}}
  </script>
'''

updated = 0
skipped = 0
errors = []

for html_file in sorted(MOTTO_DIR.glob("*.html")):
    name = html_file.name
    if name in EXCLUDE:
        continue
    # Only main motto pages (no age suffixes)
    stem = html_file.stem
    # Skip if stem contains "-3-5-jahre", "-6-8-jahre", "-9-12-jahre", or "-<digit>-jahre"
    if re.search(r"-(3-5|6-8|9-12|[0-9]+)-jahre$", stem):
        continue
    # Skip baustelle-* variants
    if stem.startswith("baustelle-") or stem == "baustelle":
        continue

    slug = stem
    if slug not in MOTTO_NAMES:
        continue

    content = html_file.read_text(encoding="utf-8")

    # Idempotency check
    if "BreadcrumbList" in content:
        skipped += 1
        continue

    # Find insertion point: after the last </script> of the last JSON-LD block before </head>,
    # or if no JSON-LD exists, right before </head>
    # Strategy: insert right after the last existing application/ld+json block
    pattern = r'(</script>\s*)(\n\s*<link rel="icon"|\n\s*</head>)'
    bc = make_breadcrumb(slug, MOTTO_NAMES[slug])

    # Insert after the LAST </script> that closes a JSON-LD block
    # Find all JSON-LD script endings
    matches = list(re.finditer(r'<script type="application/ld\+json">.*?</script>', content, re.DOTALL))
    if matches:
        # Insert after the last JSON-LD block
        last = matches[-1]
        insert_pos = last.end()
        new_content = content[:insert_pos] + "\n" + bc.rstrip() + content[insert_pos:]
    else:
        # Fallback: insert right before </head>
        if "</head>" not in content:
            errors.append(f"{name}: kein </head> gefunden")
            continue
        new_content = content.replace("</head>", bc + "</head>", 1)

    html_file.write_text(new_content, encoding="utf-8")
    updated += 1
    print(f"  ✅ {name}")

print(f"\nUpdated: {updated}, skipped (already had BreadcrumbList): {skipped}")
if errors:
    print("ERRORS:")
    for e in errors:
        print(f"  ❌ {e}")
