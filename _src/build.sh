#!/bin/bash
# Build kindergeburtstag.js from JSX source
# Usage: bash _src/build.sh

set -e
REPO="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$REPO/_src"
OUT="$REPO/js"

echo "=== Build: kindergeburtstag.js ==="

# 1. Regenerate elite-motto-data bundle aus data/motto (single source of truth, alle 15 Mottos).
#    ACHTUNG: Quelle ist data/motto/, NICHT mehr _src/elite-motto-data/*.json (deprecated, stale).
#    Der node-Generator schreibt _bundle.js (Build-Intermediate) + patcht js/kindergeburtstag.js.
#    Skip nur wenn node fehlt (z.B. minimaler Netlify-Build) — committed _bundle.js wird verwendet.
if command -v node >/dev/null 2>&1; then
  echo "  Regenerating elite-motto-data bundle aus data/motto..."
  node "$REPO/_src/gen-elite-bundle.cjs" > /dev/null
else
  echo "  Skipping bundle regen (node nicht verfügbar) — verwende committed _bundle.js"
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
