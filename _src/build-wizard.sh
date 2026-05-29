#!/bin/bash
# Build wizard.js from JSX source (P7-1)
# Usage: bash _src/build-wizard.sh

set -e
REPO="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$REPO/_src"
OUT="$REPO/js"

echo "=== Build: wizard.js ==="
echo "  Compiling JSX..."
npx esbuild "$SRC/wizard.jsx" \
  --bundle=false \
  --jsx=transform \
  --jsx-factory=React.createElement \
  --jsx-fragment=React.Fragment \
  --target=es2020 \
  --outfile="$OUT/wizard.js"

LINES=$(wc -l < "$OUT/wizard.js")
SIZE=$(wc -c < "$OUT/wizard.js" | awk '{printf "%.0f", $1/1024}')
echo "  Done: $LINES Zeilen, ${SIZE}KB → js/wizard.js"
