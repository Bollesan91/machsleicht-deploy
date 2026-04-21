#!/bin/bash
# machsleicht Quality Gate — nach jedem Build ausführen
# Usage: bash validate-all.sh
set -e
REPO="$(cd "$(dirname "$0")" && pwd)"
ERRORS=0
WARNS=0

red() { echo -e "\033[0;31m  ❌ $1\033[0m"; ERRORS=$((ERRORS+1)); }
yellow() { echo -e "\033[0;33m  ⚠️  $1\033[0m"; WARNS=$((WARNS+1)); }
green() { echo -e "\033[0;32m  ✅ $1\033[0m"; }

echo "═══════════════════════════════════════════"
echo "  machsleicht Quality Gate"
echo "═══════════════════════════════════════════"
echo ""

# ── STUFE 1: JS SYNTAX ──
echo "── STUFE 1: JS Syntax ──"
for f in js/index.js js/homepage.js js/kindergeburtstag.js js/baby.js js/einschulung.js; do
  if [ -f "$REPO/$f" ]; then
    result=$(node -e "try{new Function(require('fs').readFileSync('$REPO/$f','utf8'));console.log('OK')}catch(e){console.log('FAIL:'+e.message)}" 2>&1)
    if [[ "$result" == "OK" ]]; then
      green "$f"
    else
      red "$f — $result"
    fi
  fi
done
echo ""

# ── STUFE 2: SOURCE OF TRUTH ──
echo "── STUFE 2: Zahlen aus Source of Truth ──"
DATA="$REPO/_src/kindergeburtstag-data.js"
if [ -f "$DATA" ]; then
  # Count mottos
  GENERIC_COUNT=$(grep -c 'id: "' "$DATA" 2>/dev/null | head -1)
  # More precise: count in GENERIC + LICENSE sections
  GENERIC_N=$(sed -n '/^var GENERIC/,/^var LICENSE/p' "$DATA" | grep -c 'id: "')
  LICENSE_N=$(sed -n '/^var LICENSE/,/^var ALL_MOTTOS/p' "$DATA" | grep -c 'id: "')
  TOTAL_MOTTOS=$((GENERIC_N + LICENSE_N))
  
  # Count SZ themes
  SZ_N=$(grep -oP 'id:"[^"]*",name:"[^"]*",emoji:' "$DATA" | wc -l)
  
  # Count SZ stations
  SZ_STATIONS=$(grep -oP 'name:"[^"]+",desc:"' "$DATA" | wc -l)
  
  # Count spiele (only in GENERIC + LICENSE, not SZ_THEMES)
  SPIELE=$(sed -n '/^var GENERIC/,/^var ALL_MOTTOS/p' "$DATA" | grep -oP 'dauer:\s*\d+' | wc -l)
  
  echo "  Source: $TOTAL_MOTTOS Mottos ($GENERIC_N generic + $LICENSE_N license), $SZ_N SZ-Themes, $SZ_STATIONS SZ-Stationen, $SPIELE Spiele"
  
  # Check these numbers appear correctly on key pages
  for f in index.html js/index.js; do
    if [ -f "$REPO/$f" ]; then
      if ! grep -q "$TOTAL_MOTTOS Motto" "$REPO/$f" 2>/dev/null; then
        red "$f: '$TOTAL_MOTTOS Mottos' nicht gefunden"
      else
        green "$f: $TOTAL_MOTTOS Mottos ✓"
      fi
    fi
  done
  
  # Check for STALE numbers
  STALE_14=$(find "$REPO" -name "*.html" -o -name "*.js" | grep -v "_dev\|node_modules" | xargs grep -l "14 Mottos" 2>/dev/null | wc -l)
  STALE_20=$(find "$REPO" -name "*.html" -o -name "*.js" | grep -v "_dev\|node_modules" | xargs grep -l "20 Mottos" 2>/dev/null | wc -l)
  STALE_90=$(find "$REPO" -name "*.html" -o -name "*.js" | grep -v "_dev\|node_modules" | xargs grep -l "90 Stationen" 2>/dev/null | wc -l)
  if [ "$STALE_14" -gt 0 ] || [ "$STALE_20" -gt 0 ] || [ "$STALE_90" -gt 0 ]; then
    red "Veraltete Zahlen: ${STALE_14}x '14 Mottos', ${STALE_20}x '20 Mottos', ${STALE_90}x '90 Stationen'"
  else
    green "Keine veralteten Zahlen gefunden"
  fi
fi
echo ""

# ── STUFE 3: CROSS-SYSTEM KONSISTENZ ──
echo "── STUFE 3: Cross-System Konsistenz ──"
if [ -f "$DATA" ]; then
  # Planer IDs
  PLANER_IDS=$(sed -n '/^var GENERIC/,/^var LICENSE/p' "$DATA" | grep -oP 'id: "([^"]+)"' | sed 's/id: "//;s/"//' | sort)
  # SZ Theme IDs
  SZ_IDS=$(grep -oP 'id:"([^"]+)",name:"[^"]*",emoji:' "$DATA" | grep -oP 'id:"([^"]+)"' | sed 's/id:"//;s/"//' | sort)
  # MAP_THEME IDs
  MAP_IDS=$(grep -oP '^\s+(\w+):\{parchment' "$REPO/_src/kindergeburtstag.jsx" | sed 's/.*\b\(\w\+\):{parchment/\1/' | sort)
  # SZ_LABELS IDs
  LABEL_IDS=$(grep -oP 'SZ_LABELS\s*=\s*\{[^}]+\}' "$DATA" | grep -oP '(\w+):' | sed 's/://' | sort)
  # SZ_SHOP IDs
  SHOP_IDS=$(grep -oP 'SZ_SHOP_ITEMS\s*=\s*\{.+?\};' "$DATA" | grep -oP '(\w+):\[' | sed 's/:\[//' | sort)
  
  # Check SZ ↔ Planer
  ONLY_PLANER=$(comm -23 <(echo "$PLANER_IDS") <(echo "$SZ_IDS"))
  ONLY_SZ=$(comm -13 <(echo "$PLANER_IDS") <(echo "$SZ_IDS"))
  if [ -n "$ONLY_PLANER" ]; then yellow "Nur im Planer (kein SZ): $ONLY_PLANER"; fi
  if [ -n "$ONLY_SZ" ]; then yellow "Nur in SZ (kein Planer): $ONLY_SZ"; fi
  if [ -z "$ONLY_PLANER" ] && [ -z "$ONLY_SZ" ]; then green "Planer ↔ SZ: identisch ($SZ_N Mottos)"; fi
  
  # Check SZ ↔ MAP_THEMES
  ONLY_SZ_NO_MAP=$(comm -23 <(echo "$SZ_IDS") <(echo "$MAP_IDS"))
  if [ -n "$ONLY_SZ_NO_MAP" ]; then red "SZ ohne MAP_THEME: $ONLY_SZ_NO_MAP"; else green "SZ ↔ MAP_THEMES: alle vorhanden"; fi
  
  # Check SZ ↔ Labels
  ONLY_SZ_NO_LABEL=$(comm -23 <(echo "$SZ_IDS") <(echo "$LABEL_IDS"))
  if [ -n "$ONLY_SZ_NO_LABEL" ]; then red "SZ ohne Label: $ONLY_SZ_NO_LABEL"; else green "SZ ↔ SZ_LABELS: alle vorhanden"; fi
  
  # Check SZ ↔ Shop
  ONLY_SZ_NO_SHOP=$(comm -23 <(echo "$SZ_IDS") <(echo "$SHOP_IDS"))
  if [ -n "$ONLY_SZ_NO_SHOP" ]; then red "SZ ohne Shop: $ONLY_SZ_NO_SHOP"; else green "SZ ↔ SZ_SHOP_ITEMS: alle vorhanden"; fi
fi
echo ""

# ── STUFE 4: FARB/EMOJI UNIQUENESS ──
echo "── STUFE 4: Farb/Emoji Uniqueness ──"
if [ -f "$DATA" ]; then
  # Check SZ theme colors
  COLORS=$(grep -oP 'color:"([^"]+)"' "$DATA" | head -20 | sort)
  DUPES=$(echo "$COLORS" | uniq -d)
  if [ -n "$DUPES" ]; then red "Doppelte SZ-Farben: $DUPES"; else green "SZ-Farben: alle eindeutig"; fi
  
  # Check SZ theme emojis
  EMOJIS=$(grep -oP 'emoji:"([^"]+)"' "$DATA" | head -20 | sort)
  EMOJI_DUPES=$(echo "$EMOJIS" | uniq -d)
  if [ -n "$EMOJI_DUPES" ]; then red "Doppelte SZ-Emojis: $EMOJI_DUPES"; else green "SZ-Emojis: alle eindeutig"; fi
fi
echo ""

# ── STUFE 5: HOMEPAGE PRODUCT CHECK ──
echo "── STUFE 5: Homepage Products ──"
INDEX_JS="$REPO/js/index.js"
if [ -f "$INDEX_JS" ]; then
  LIVE_COUNT=$(grep -oP 'status:"live"' "$INDEX_JS" | wc -l)
  SOON_COUNT=$(grep -oP 'status:"soon"' "$INDEX_JS" | wc -l)
  PLANNED_COUNT=$(grep -oP 'status:"planned"' "$INDEX_JS" | wc -l)
  echo "  Products: ${LIVE_COUNT} live, ${SOON_COUNT} bald, ${PLANNED_COUNT} geplant"
  
  # Check key pages have product cards
  for page in kindergeburtstag schatzsuche einladung einschulung baby kreuzwortraetsel spielkarten; do
    if grep -q "\"/$page" "$INDEX_JS" 2>/dev/null || grep -q "href:\"/$page" "$INDEX_JS" 2>/dev/null; then
      green "Product card: $page"
    else
      yellow "Kein Product card: $page"
    fi
  done
  
  # Check hero CTAs (Funnel-Axiom: 1 Primary CTA + 2 sekundäre Textlinks)
  HERO_PRIMARY=$(grep -cP 'Kindergeburtstag planen' "$INDEX_JS")
  HERO_SECONDARY=$(grep -oP 'Schatzsuche erstellen|Einladung gestalten' "$INDEX_JS" | sort -u | wc -l)
  if [ "$HERO_PRIMARY" -ge 1 ] && [ "$HERO_SECONDARY" -ge 2 ]; then green "Hero: 1 Primary CTA + $HERO_SECONDARY Textlinks"; elif [ "$HERO_PRIMARY" -ge 1 ]; then yellow "Hero: Primary CTA da, aber nur $HERO_SECONDARY/2 Textlinks"; else warn "Hero: Primary CTA fehlt!"; fi

  # Check: Partyseite ist live (Worker deployed)
  if grep -q 'id:"partyseite".*status:"live"' "$INDEX_JS" 2>/dev/null; then green "Partyseite: status live"; else yellow "Partyseite: status ist NICHT live (Worker ist deployed!)"; fi
fi
echo ""

# ── STUFE 6: SEO FALLBACK ──
echo "── STUFE 6: SEO Fallback (index.html) ──"
INDEX_HTML="$REPO/index.html"
if [ -f "$INDEX_HTML" ]; then
  # Check for key links
  for link in kreuzwortraetsel spielkarten schnitzeljagd-aufgaben einladung/erstellen schatzsuche einschulung baby; do
    if grep -q "href=\"/$link" "$INDEX_HTML" 2>/dev/null; then
      green "Link: /$link"
    else
      yellow "Fehlender Link: /$link"
    fi
  done
  
  # Check Schema.org
  SCHEMA_COUNT=$(grep -c '@type.*WebApplication' "$INDEX_HTML" 2>/dev/null)
  green "Schema.org: $SCHEMA_COUNT WebApplication-Schemas"
fi
echo ""

# ── STUFE 7: EINLADUNGS-MOTTOS (Regression-Schutz Piraten-404) ──
echo "── STUFE 7: Einladungs-Mottos (jedes Motto braucht eigene Landing) ──"
EINLADUNG_MOTTOS=(piraten dino safari weltraum detektiv superheld prinzessin einhorn meerjungfrau feuerwehr)
for m in "${EINLADUNG_MOTTOS[@]}"; do
  if [ -f "$REPO/einladung/$m/index.html" ]; then
    green "/einladung/$m/index.html"
  else
    red "Fehlendes Einladungs-Motto: /einladung/$m/index.html (Partyseiten-Vorschau liefert 404!)"
  fi
done
# Hub muss vorhanden sein und darf KEIN Canonical auf /einladung/piraten haben (sonst wär's die alte Piraten-Seite)
if [ -f "$REPO/einladung/index.html" ]; then
  HUB_CAN=$(grep -aoP 'rel="canonical" href="\K[^"]+' "$REPO/einladung/index.html" 2>/dev/null | head -1)
  if [ "$HUB_CAN" = "https://machsleicht.de/einladung" ]; then
    green "/einladung/index.html (Hub mit korrektem Canonical)"
  else
    red "/einladung/index.html Canonical falsch: '$HUB_CAN' (erwartet: https://machsleicht.de/einladung)"
  fi
fi
# serve-invite.mjs darf keine Piraten-Sonderregel mehr enthalten
if [ -f "$REPO/netlify/functions/serve-invite.mjs" ]; then
  if grep -q 'motto === "piraten" ? "/einladung/"' "$REPO/netlify/functions/serve-invite.mjs"; then
    red "serve-invite.mjs enthält noch Piraten-Sonderregel (basePath-Sonderfall)"
  else
    green "serve-invite.mjs: einheitliches URL-Schema /einladung/<motto>/"
  fi
fi
echo ""

# ── ERGEBNIS ──
echo "═══════════════════════════════════════════"
if [ $ERRORS -gt 0 ]; then
  echo -e "\033[0;31m  FAILED: $ERRORS Fehler, $WARNS Warnungen\033[0m"
  echo "  → Nicht deployen bis alle Fehler behoben!"
  exit 1
elif [ $WARNS -gt 0 ]; then
  echo -e "\033[0;33m  PASSED MIT WARNUNGEN: $WARNS Warnungen\033[0m"
  echo "  → Deploy möglich, aber Warnungen prüfen"
  exit 0
else
  echo -e "\033[0;32m  PASSED: Alle Checks bestanden ✓\033[0m"
  exit 0
fi
