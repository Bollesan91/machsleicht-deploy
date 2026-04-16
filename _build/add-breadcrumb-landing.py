#!/usr/bin/env python3
"""
P1-6 Teil 3: BreadcrumbList JSON-LD auf weitere Landing-Pages.
Schatzsuche-Themen, Schnitzeljagd, weitere Planer (Einschulung, Baby, etc.)
"""
import re
from pathlib import Path

REPO = Path(__file__).parent.parent

# Seiten mit ihren Breadcrumb-Pfaden
# (relativer Pfad) -> (Breadcrumb-Items als Liste von (name, url))
PAGES = {
    # Schatzsuche-Themen: Start > Schatzsuche > <Thema>
    "schatzsuche/detektiv.html": [
        ("Schatzsuche", "https://machsleicht.de/schatzsuche"),
        ("Detektiv", "https://machsleicht.de/schatzsuche/detektiv"),
    ],
    "schatzsuche/dino.html": [
        ("Schatzsuche", "https://machsleicht.de/schatzsuche"),
        ("Dino", "https://machsleicht.de/schatzsuche/dino"),
    ],
    "schatzsuche/dschungel.html": [
        ("Schatzsuche", "https://machsleicht.de/schatzsuche"),
        ("Dschungel", "https://machsleicht.de/schatzsuche/dschungel"),
    ],
    "schatzsuche/einhorn.html": [
        ("Schatzsuche", "https://machsleicht.de/schatzsuche"),
        ("Einhorn", "https://machsleicht.de/schatzsuche/einhorn"),
    ],
    "schatzsuche/feen.html": [
        ("Schatzsuche", "https://machsleicht.de/schatzsuche"),
        ("Feen", "https://machsleicht.de/schatzsuche/feen"),
    ],
    "schatzsuche/piraten.html": [
        ("Schatzsuche", "https://machsleicht.de/schatzsuche"),
        ("Piraten", "https://machsleicht.de/schatzsuche/piraten"),
    ],
    "schatzsuche/safari.html": [
        ("Schatzsuche", "https://machsleicht.de/schatzsuche"),
        ("Safari", "https://machsleicht.de/schatzsuche/safari"),
    ],
    "schatzsuche/weltraum.html": [
        ("Schatzsuche", "https://machsleicht.de/schatzsuche"),
        ("Weltraum", "https://machsleicht.de/schatzsuche/weltraum"),
    ],
    # Schnitzeljagd/Schatzsuche-Varianten: Start > Kindergeburtstag > <Seite>
    "schnitzeljagd-aufgaben.html": [
        ("Kindergeburtstag", "https://machsleicht.de/kindergeburtstag"),
        ("Schnitzeljagd-Aufgaben", "https://machsleicht.de/schnitzeljagd-aufgaben"),
    ],
    "schnitzeljagd-draussen.html": [
        ("Kindergeburtstag", "https://machsleicht.de/kindergeburtstag"),
        ("Schnitzeljagd draußen", "https://machsleicht.de/schnitzeljagd-draussen"),
    ],
    "schatzsuche-drinnen.html": [
        ("Kindergeburtstag", "https://machsleicht.de/kindergeburtstag"),
        ("Schatzsuche drinnen", "https://machsleicht.de/schatzsuche-drinnen"),
    ],
    "schatzsuche-kindergeburtstag.html": [
        ("Kindergeburtstag", "https://machsleicht.de/kindergeburtstag"),
        ("Schatzsuche Kindergeburtstag", "https://machsleicht.de/schatzsuche-kindergeburtstag"),
    ],
    # Weitere Planer: Start > <Kategorie>
    "einschulung.html": [
        ("Einschulung", "https://machsleicht.de/einschulung"),
    ],
    "baby.html": [
        ("Baby", "https://machsleicht.de/baby"),
    ],
    "kreuzwortraetsel.html": [
        ("Kreuzworträtsel", "https://machsleicht.de/kreuzwortraetsel"),
    ],
    "spielkarten.html": [
        ("Spielkarten", "https://machsleicht.de/spielkarten"),
    ],
    # Hauptseite Kindergeburtstag: Start > Kindergeburtstag
    "kindergeburtstag.html": [
        ("Kindergeburtstag", "https://machsleicht.de/kindergeburtstag"),
    ],
    # Einladung-Tool
    "einladung/erstellen/index.html": [
        ("Einladung", "https://machsleicht.de/einladung"),
        ("Erstellen", "https://machsleicht.de/einladung/erstellen"),
    ],
}


def make_breadcrumb(items):
    """Generate BreadcrumbList JSON-LD. items is list of (name, url).
    Start is always position 1."""
    list_items = [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Start",
            "item": "https://machsleicht.de/",
        }
    ]
    for i, (name, url) in enumerate(items, start=2):
        list_items.append({
            "@type": "ListItem",
            "position": i,
            "name": name,
            "item": url,
        })

    import json as _json
    payload = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": list_items,
    }
    return f'''  <script type="application/ld+json">
{_json.dumps(payload, indent=2, ensure_ascii=False)}
  </script>
'''


updated = 0
skipped = 0
errors = []

for rel_path, items in PAGES.items():
    f = REPO / rel_path
    if not f.exists():
        errors.append(f"{rel_path}: Datei nicht gefunden")
        continue

    content = f.read_text(encoding="utf-8")

    if "BreadcrumbList" in content:
        skipped += 1
        continue

    bc = make_breadcrumb(items)

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
            errors.append(f"{rel_path}: kein </head> gefunden")
            continue
        new_content = content.replace("</head>", bc + "</head>", 1)

    f.write_text(new_content, encoding="utf-8")
    updated += 1
    print(f"  ✅ {rel_path}")

print(f"\nUpdated: {updated}, skipped: {skipped}")
if errors:
    print("ERRORS:")
    for e in errors:
        print(f"  ❌ {e}")
