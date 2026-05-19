#!/bin/bash
# Build kindergeburtstag.js from JSX source
# Usage: bash _src/build.sh

set -e
REPO="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$REPO/_src"
OUT="$REPO/js"

echo "=== Build: kindergeburtstag.js ==="

# 1. Regenerate elite-motto-data bundle (concatenates 7 JSON files into JS module).
#    Skip if python3 nicht verfügbar (z.B. Netlify-Build) — committed _bundle.js wird verwendet.
if command -v python3 >/dev/null 2>&1; then
  echo "  Regenerating elite-motto-data/_bundle.js..."
  python3 "$SRC/elite-motto-data/_generate_bundle.py" > /dev/null
else
  echo "  Skipping bundle regen (python3 nicht verfügbar) — verwende committed _bundle.js"
fi

# 2. Compile JSX → JS with esbuild
echo "  Compiling JSX..."
npx esbuild "$SRC/kindergeburtstag.jsx" \
  --bundle=false \
  --jsx=transform \
  --jsx-factory=React.createElement \
  --jsx-fragment=React.Fragment \
  --target=es2020 \
  --outfile="$SRC/_compiled.js"

# 3. Concatenate: data + elite-bundle + compiled components
echo "  Concatenating..."
cat "$SRC/kindergeburtstag-data.js" "$SRC/elite-motto-data/_bundle.js" "$SRC/_compiled.js" > "$OUT/kindergeburtstag.js"

# 4. Cleanup
rm -f "$SRC/_compiled.js"

# 4. Stats
LINES=$(wc -l < "$OUT/kindergeburtstag.js")
SIZE=$(wc -c < "$OUT/kindergeburtstag.js" | awk '{printf "%.0f", $1/1024}')
echo "  Done: $LINES Zeilen, ${SIZE}KB → js/kindergeburtstag.js"
