#!/bin/bash
# Build kindergeburtstag.js from JSX source
# Usage: bash _src/build.sh

set -e
REPO="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$REPO/_src"
OUT="$REPO/js"

echo "=== Build: kindergeburtstag.js ==="

# 1. Compile JSX → JS with esbuild
echo "  Compiling JSX..."
npx esbuild "$SRC/kindergeburtstag.jsx" \
  --bundle=false \
  --jsx=transform \
  --jsx-factory=React.createElement \
  --jsx-fragment=React.Fragment \
  --target=es2020 \
  --outfile="$SRC/_compiled.js"

# 2. Concatenate: data + compiled components
echo "  Concatenating..."
cat "$SRC/kindergeburtstag-data.js" "$SRC/_compiled.js" > "$OUT/kindergeburtstag.js"

# 3. Cleanup
rm -f "$SRC/_compiled.js"

# 4. Stats
LINES=$(wc -l < "$OUT/kindergeburtstag.js")
SIZE=$(wc -c < "$OUT/kindergeburtstag.js" | awk '{printf "%.0f", $1/1024}')
echo "  Done: $LINES Zeilen, ${SIZE}KB → js/kindergeburtstag.js"
