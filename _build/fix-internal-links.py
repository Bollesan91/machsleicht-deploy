#!/usr/bin/env python3
"""
P2-11: Interne Links auf Ratgeber-Seiten fixen.
CTA-Buttons und inline "Planer erstellen"-Links gehen auf /kindergeburtstag#planer,
nicht mehr auf die Homepage.

Logo- und Breadcrumb-Links auf / bleiben erhalten (Homepage-Navigation ist korrekt).
"""
import re
from pathlib import Path

REPO = Path(__file__).parent.parent

# Ratgeber-Seiten (im Repo-Root, kindergeburtstag-*.html)
RATGEBER_PATTERNS = [
    "kindergeburtstag-*.html",
]

# Line-level patterns that clearly indicate a CTA/tool-link and should be rewritten
# Rule: if the <a href="/"> ends in a "cta" class or the link text mentions
# erstellen/Planer/Motto-Ideen/Einkaufsliste/Zeitplan/Checkliste, redirect to #planer
CTA_CLASS_RE = re.compile(r'<a href="/"\s+class="cta"')
RETURN_TO_PLANER_RE = re.compile(r'<a href="/">(← ?Zurück zum Planer)</a>')
INLINE_PLANER_RE = re.compile(
    r'<a href="/">([^<]*(?:Motto-Ideen|Einkaufsliste|Zeitplan|Planer|automatisch erstellen|machsleicht erstellt)[^<]*)</a>',
    re.IGNORECASE,
)

updated_files = 0
total_fixes = 0

ratgeber_files = []
for pattern in RATGEBER_PATTERNS:
    ratgeber_files.extend(REPO.glob(pattern))

for f in sorted(ratgeber_files):
    content = f.read_text(encoding="utf-8")
    original = content
    file_fixes = 0

    # 1) CTA class → /kindergeburtstag#planer
    new_content, n1 = CTA_CLASS_RE.subn('<a href="/kindergeburtstag#planer" class="cta"', content)
    file_fixes += n1

    # 2) "Zurück zum Planer" → /kindergeburtstag
    new_content, n2 = RETURN_TO_PLANER_RE.subn(r'<a href="/kindergeburtstag">\1</a>', new_content)
    file_fixes += n2

    # 3) Inline planer-referring text → /kindergeburtstag#planer
    new_content, n3 = INLINE_PLANER_RE.subn(r'<a href="/kindergeburtstag#planer">\1</a>', new_content)
    file_fixes += n3

    if file_fixes > 0:
        f.write_text(new_content, encoding="utf-8")
        updated_files += 1
        total_fixes += file_fixes
        print(f"  ✅ {f.name}: {file_fixes} Links gefixt (CTA:{n1}, Zurück:{n2}, Inline:{n3})")

print(f"\nGesamt: {updated_files} Dateien, {total_fixes} Links aktualisiert")
