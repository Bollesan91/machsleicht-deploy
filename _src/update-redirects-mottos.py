#!/usr/bin/env python3
"""
Welle 2 Mottos-Glättung: _redirects updaten.

Vorher: einzelne Year-URLs (pferde-3-jahre, pferde-4-jahre, ...) → Hub (pferde)
Nachher: einzelne Year-URLs → konkrete Age-Range (pferde-3-jahre → pferde-3-5-jahre)
        + die Age-Range-URLs selbst werden durch .html-Files served (kein redirect)
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RF = ROOT / "_redirects"

text = RF.read_text(encoding="utf-8")
lines = text.splitlines()

new_lines = []
for line in lines:
    stripped = line.strip()
    skip = False
    replaced = None
    for motto in ["pferde","ritter","baustelle"]:
        # Year-URLs auf konkrete Age-Range umlenken
        for year in [3,4,5]:
            if f"/kindergeburtstag/{motto}-{year}-jahre" in stripped and f"/kindergeburtstag/{motto}" in stripped:
                replaced = f"/kindergeburtstag/{motto}-{year}-jahre    /kindergeburtstag/{motto}-3-5-jahre  301!"
                break
        if replaced: break
        for year in [6,7,8]:
            if f"/kindergeburtstag/{motto}-{year}-jahre" in stripped and f"/kindergeburtstag/{motto}" in stripped:
                replaced = f"/kindergeburtstag/{motto}-{year}-jahre    /kindergeburtstag/{motto}-6-8-jahre  301!"
                break
        if replaced: break
        for year in [9,10,11,12]:
            if f"/kindergeburtstag/{motto}-{year}-jahre" in stripped and f"/kindergeburtstag/{motto}" in stripped:
                replaced = f"/kindergeburtstag/{motto}-{year}-jahre   /kindergeburtstag/{motto}-9-12-jahre  301!"
                break
        if replaced: break
        # Age-Range-URLs selbst — KEIN redirect (Netlify served .html direkt)
        for ar in ["3-5-jahre","6-8-jahre","9-12-jahre"]:
            if stripped.startswith(f"/kindergeburtstag/{motto}-{ar}") and stripped.endswith(f"/kindergeburtstag/{motto}  301!"):
                skip = True
                break
        if skip: break

    if skip:
        continue
    if replaced:
        new_lines.append(replaced)
    else:
        new_lines.append(line)

# Add rewrites for the 3 hub pages + 9 age-pages (Netlify served via .html — no rewrite needed
# IF SPA-fallback isn't gobbling them. Add explicit 200-rewrites to be safe.)
# Find insertion point: nach den anderen /kindergeburtstag/<motto> 200-Rewrites
result = []
inserted = False
for line in new_lines:
    result.append(line)
    if not inserted and line.strip().startswith("/kindergeburtstag/detektiv  /kindergeburtstag/detektiv.html  200"):
        result.append("/kindergeburtstag/pferde  /kindergeburtstag/pferde.html  200")
        result.append("/kindergeburtstag/ritter  /kindergeburtstag/ritter.html  200")
        result.append("/kindergeburtstag/baustelle  /kindergeburtstag/baustelle.html  200")
        for motto in ["pferde","ritter","baustelle"]:
            for ar in ["3-5-jahre","6-8-jahre","9-12-jahre"]:
                result.append(f"/kindergeburtstag/{motto}-{ar}  /kindergeburtstag/{motto}-{ar}.html  200")
        inserted = True

RF.write_text("\n".join(result) + "\n", encoding="utf-8")
print(f"_redirects updated. {len(lines)} lines -> {len(result)} lines.")
print(f"Inserted hub+age 200-rewrites: {inserted}")
