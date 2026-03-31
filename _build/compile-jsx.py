#!/usr/bin/env python3
"""
Build-Script: Extrahiert JSX aus HTML-Dateien und kompiliert es mit esbuild.
Entfernt Babel Standalone CDN (~800KB Einsparung pro Seite).
"""
import re, subprocess, os, sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

FILES = {
    "index.html": "js/index.js",
    "homepage.html": "js/homepage.js",
    "baby.html": "js/baby.js",
    "einschulung.html": "js/einschulung.js",
    "kindergeburtstag.html": "js/kindergeburtstag.js",
    "schatzsuche.html": "js/schatzsuche.js",
}

os.makedirs(os.path.join(REPO, "js"), exist_ok=True)

success = 0
errors = 0

for html_file, js_output in FILES.items():
    html_path = os.path.join(REPO, html_file)
    js_path = os.path.join(REPO, js_output)
    jsx_tmp = js_path.replace(".js", ".jsx")

    print(f"\n{'='*50}")
    print(f"Verarbeite: {html_file}")

    with open(html_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Extract JSX between <script type="text/babel"> and </script>
    pattern = r'<script\s+type="text/babel">(.*?)</script>'
    match = re.search(pattern, content, re.DOTALL)
    if not match:
        print(f"  SKIP: Kein text/babel Script gefunden")
        continue

    jsx_code = match.group(1)
    print(f"  JSX extrahiert: {len(jsx_code)} Bytes")

    # Write JSX to temp file
    with open(jsx_tmp, "w", encoding="utf-8") as f:
        f.write(jsx_code)

    # Compile with esbuild
    result = subprocess.run(
        ["npx", "esbuild", jsx_tmp,
         "--bundle=false",
         "--jsx=transform",
         "--jsx-factory=React.createElement",
         "--jsx-fragment=React.Fragment",
         "--target=es2020",
         "--minify",
         f"--outfile={js_path}"],
        capture_output=True, text=True
    )

    if result.returncode != 0:
        print(f"  FEHLER bei esbuild: {result.stderr}")
        errors += 1
        continue

    js_size = os.path.getsize(js_path)
    print(f"  Kompiliert: {js_size} Bytes ({js_size/1024:.1f}KB)")

    # Remove temp JSX
    os.remove(jsx_tmp)

    # Update HTML: replace inline babel script with compiled JS reference
    new_script = f'<script src="/{js_output}"></script>'
    content = re.sub(pattern, new_script, content, flags=re.DOTALL)

    # Remove Babel CDN lines (both unpkg and cdnjs versions)
    content = re.sub(
        r'\s*<script\s+src="https://unpkg\.com/@babel/standalone/babel\.min\.js"></script>',
        '', content
    )
    content = re.sub(
        r'\s*<script\s+src="https://cdnjs\.cloudflare\.com/ajax/libs/babel-standalone/[^"]+/babel\.min\.js"></script>',
        '', content
    )

    with open(html_path, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"  HTML aktualisiert: Babel entfernt, {js_output} eingebunden")
    success += 1

print(f"\n{'='*50}")
print(f"Fertig! {success} Dateien kompiliert, {errors} Fehler")
print(f"Babel Standalone entfernt — ca. 800KB pro Seitenaufruf gespart!")
