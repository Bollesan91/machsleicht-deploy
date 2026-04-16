#!/usr/bin/env python3
"""
P1-6 Teil 4: BreadcrumbList auf die letzten Seiten (Checklisten, Guides, Einladungs-Themen).
"""
import re
import json
from pathlib import Path

REPO = Path(__file__).parent.parent

# Checklisten-Seiten: Start > <Seite>
CHECKLISTEN = {
    "adventskalender-fuellen.html": "Adventskalender füllen",
    "autofahrt-kinder-checkliste.html": "Autofahrt mit Kindern",
    "baby-erstausstattung-checkliste.html": "Baby-Erstausstattung",
    "babyparty-checkliste.html": "Babyparty",
    "einschulung-checkliste.html": "Einschulung Checkliste",
    "familienreise-packliste.html": "Familienreise Packliste",
    "halloween-kinder-zuhause.html": "Halloween zuhause",
    "kita-start-checkliste.html": "Kita-Start",
    "kliniktasche-packen.html": "Kliniktasche",
    "oster-eiersuche.html": "Oster-Eiersuche",
    "schultuete-fuellen.html": "Schultüte füllen",
    "umzug-mit-kind-checkliste.html": "Umzug mit Kind",
    "wochenbett-was-braucht-man.html": "Wochenbett",
}

# Guide-Seiten: Start > Ratgeber > <Guide>
GUIDES = {
    "frozen-guide.html": "Frozen für Eltern",
    "harry-potter-guide.html": "Harry Potter für Eltern",
    "minecraft-guide.html": "Minecraft für Eltern",
    "ninjago-guide.html": "Ninjago für Eltern",
    "paw-patrol-guide.html": "Paw Patrol für Eltern",
    "pokemon-guide.html": "Pokémon für Eltern",
    "spider-man-guide.html": "Spider-Man für Eltern",
    "super-mario-guide.html": "Super Mario für Eltern",
}

# Einladungs-Themen: Start > Einladung > <Motto>
EINLADUNG_THEMEN = {
    "einladung/dino/index.html": "Dino",
    "einladung/einhorn/index.html": "Einhorn",
    "einladung/safari/index.html": "Safari",
    "einladung/feuerwehr/index.html": "Feuerwehr",
    "einladung/detektiv/index.html": "Detektiv",
    "einladung/prinzessin/index.html": "Prinzessin",
    "einladung/weltraum/index.html": "Weltraum",
    "einladung/meerjungfrau/index.html": "Meerjungfrau",
    "einladung/superheld/index.html": "Superheld",
}


def make_breadcrumb(items_with_pos1_start=True, custom_items=None):
    """items: list of (name, url) tuples after Start."""
    list_items = [
        {"@type": "ListItem", "position": 1, "name": "Start",
         "item": "https://machsleicht.de/"}
    ]
    for i, (name, url) in enumerate(custom_items, start=2):
        list_items.append({
            "@type": "ListItem", "position": i,
            "name": name, "item": url,
        })
    payload = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": list_items,
    }
    return f'''  <script type="application/ld+json">
{json.dumps(payload, indent=2, ensure_ascii=False)}
  </script>
'''


def inject_breadcrumb(file_path, bc_html):
    """Insert breadcrumb into a file. Returns True if updated."""
    content = file_path.read_text(encoding="utf-8")
    if "BreadcrumbList" in content:
        return False
    matches = list(re.finditer(
        r'<script type="application/ld\+json">.*?</script>',
        content, re.DOTALL
    ))
    if matches:
        last = matches[-1]
        insert_pos = last.end()
        new_content = content[:insert_pos] + "\n" + bc_html.rstrip() + content[insert_pos:]
    elif "</head>" in content:
        new_content = content.replace("</head>", bc_html + "</head>", 1)
    else:
        return False
    file_path.write_text(new_content, encoding="utf-8")
    return True


updated = 0
skipped = 0

# Checklisten: Start > <Seite>
print("=== Checklisten ===")
for slug, name in CHECKLISTEN.items():
    f = REPO / slug
    if not f.exists():
        continue
    url = f"https://machsleicht.de/{slug.replace('.html', '')}"
    bc = make_breadcrumb(custom_items=[(name, url)])
    if inject_breadcrumb(f, bc):
        updated += 1
        print(f"  ✅ {slug}")
    else:
        skipped += 1

# Guides: Start > Ratgeber > <Guide>
print("\n=== Guides ===")
for slug, name in GUIDES.items():
    f = REPO / slug
    if not f.exists():
        continue
    url = f"https://machsleicht.de/{slug.replace('.html', '')}"
    bc = make_breadcrumb(custom_items=[
        ("Ratgeber", "https://machsleicht.de/ratgeber/"),
        (name, url),
    ])
    if inject_breadcrumb(f, bc):
        updated += 1
        print(f"  ✅ {slug}")
    else:
        skipped += 1

# Einladung-Themen: Start > Einladung > <Motto>
print("\n=== Einladung-Themen ===")
for rel_path, name in EINLADUNG_THEMEN.items():
    f = REPO / rel_path
    if not f.exists():
        continue
    # URL: /einladung/dino/ (ohne index.html)
    url_path = rel_path.replace("/index.html", "")
    url = f"https://machsleicht.de/{url_path}"
    bc = make_breadcrumb(custom_items=[
        ("Einladung", "https://machsleicht.de/einladung"),
        (name, url),
    ])
    if inject_breadcrumb(f, bc):
        updated += 1
        print(f"  ✅ {rel_path}")
    else:
        skipped += 1

# Einladung-Hub: Start > Einladung
print("\n=== Einladung-Hub ===")
f = REPO / "einladung/index.html"
if f.exists():
    bc = make_breadcrumb(custom_items=[
        ("Einladung", "https://machsleicht.de/einladung"),
    ])
    if inject_breadcrumb(f, bc):
        updated += 1
        print(f"  ✅ einladung/index.html")
    else:
        skipped += 1

print(f"\nUpdated: {updated}, skipped: {skipped}")
