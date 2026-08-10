#!/bin/bash
# machsleicht Quality Gate — nach jedem Build ausführen
# Usage: bash validate-all.sh
set -e

# UTF-8-Locale erzwingen. Ohne sie bricht jedes `grep -P` mit
# "grep: -P supports only unibyte and UTF-8 locales" ab — der Aufruf liefert
# dann 0 Treffer statt eines Fehlers, und das Gate meldet GRUEN, obwohl der
# Check nie gelaufen ist (auf einer Windows/Git-Bash-Umgebung am 26.07.2026
# aufgefallen: "0 Mottos", "0 live" statt der echten Zahlen).
# Verifikation, dass die Checks wirklich laufen: Stufe 5 muss "Products: 4 live"
# melden, nicht "0 live".
# Schreibweise variiert je System: Debian/Ubuntu melden "C.utf8", andere
# "C.UTF-8". Exakt auf "C.UTF-8" zu matchen verfehlt genau die Distributionen,
# auf denen die Locale vorhanden waere — deshalb tolerant gegen Bindestrich
# und Gross-/Kleinschreibung suchen und den GEFUNDENEN Namen uebernehmen.
_pick_locale() {
  locale -a 2>/dev/null | grep -iE '^(C|en_US)\.utf-?8$' | head -1
}
_loc="$(_pick_locale)"
if [ -n "$_loc" ]; then export LC_ALL="$_loc" LANG="$_loc"; fi

# Der Guard muss pruefen, ob grep -P im UTF-8-MODUS laeuft — nicht bloss, ob es
# ueberhaupt startet. Ein Match-Test taugt dafuer nicht: Im Unibyte-Locale
# arbeitet grep -P byteweise, und die zwei Bytes von "ä" (C3 A4) matchen sich
# dann selbst — der Test wuerde gruen melden, obwohl der UTF-8-Modus fehlt.
# Belastbar ist nur Zaehlen: "." trifft im UTF-8-Modus EIN Zeichen, im
# Unibyte-Modus ZWEI Bytes. Genau diese Differenz macht den Unterschied
# sichtbar, auf den es ankommt.
_mb=$(printf '\303\244' | grep -oP '.' 2>/dev/null | wc -l | tr -d ' ')
if [ "$_mb" != "1" ]; then
  echo -e "\033[0;31m  ❌ ABBRUCH: grep -P laeuft nicht im UTF-8-Modus (Zeichentest ergab ${_mb:-0} statt 1, LC_ALL='${LC_ALL:-leer}').\033[0m"
  echo "     In diesem Zustand liefern Muster ueber Umlaute stillschweigend falsche Treffer —"
  echo "     das Gate wuerde gruen melden, ohne korrekt geprueft zu haben."
  echo "     Verfuegbare UTF-8-Locales: $(locale -a 2>/dev/null | grep -ic 'utf-\?8') — eine davon setzen und erneut ausfuehren."
  exit 2
fi

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
for f in js/index.js js/homepage.js js/baby.js js/einschulung.js; do
  if [ -f "$REPO/$f" ]; then
    result=$(cd "$REPO" && node -e "try{new Function(require('fs').readFileSync('$f','utf8'));console.log('OK')}catch(e){console.log('FAIL:'+e.message)}" 2>&1)
    if [[ "$result" == "OK" ]]; then
      green "$f"
    else
      red "$f — $result"
    fi
  fi
done
echo ""

# ── STUFE 1b: NETLIFY FUNCTIONS SYNTAX ──
# Wichtig: fehlgeschlagene Netlify-Builds bei truncated Functions (z.B. serve-invite.mjs)
# blockieren alle Deploys. Hier proaktiv prüfen.
echo "── STUFE 1b: Netlify Functions Syntax ──"
if [ -d "$REPO/netlify/functions" ]; then
  found_any=0
  for f in "$REPO"/netlify/functions/*.mjs "$REPO"/netlify/functions/*.js; do
    [ -f "$f" ] || continue
    found_any=1
    name="netlify/functions/$(basename "$f")"
    if err=$(node --check "$f" 2>&1); then
      green "$name"
    else
      # Nur die letzte relevante Zeile aus dem Fehler zeigen
      msg=$(echo "$err" | grep -E "SyntaxError|Unexpected" | head -1)
      red "$name — ${msg:-Syntax-Fehler}"
    fi
  done
  [ $found_any -eq 0 ] && yellow "Keine Functions in netlify/functions/ gefunden"
else
  yellow "Kein netlify/functions/ Verzeichnis"
fi
echo ""

# ── STUFE 2: SOURCE OF TRUTH ──
echo "── STUFE 2: Zahlen aus Source of Truth ──"
DATA="$REPO/_src/kindergeburtstag-data.js"
if [ -f "$DATA" ]; then
  # Count mottos
  GENERIC_COUNT=$(grep -c 'id: "' "$DATA" 2>/dev/null | head -1)
  # More precise: count in GENERIC + LICENSE sections
  GENERIC_N=$(sed -n '/^var GENERIC/,/^var LICENSE/p' "$DATA" | grep -c 'id: "' 2>/dev/null) || GENERIC_N=0
  LICENSE_N=$(sed -n '/^var LICENSE/,/^var ALL_MOTTOS/p' "$DATA" | grep -c 'id: "' 2>/dev/null) || LICENSE_N=0
  TOTAL_MOTTOS=$(( $(ls "$REPO"/data/motto/*.json 2>/dev/null | wc -l) / 3 ))   # Wahrheitsquelle: data/motto (15 Mottos x 3 Gruppen); alte GENERIC/LICENSE-Zaehlung war stale (10)
[ "$TOTAL_MOTTOS" -lt 1 ] && TOTAL_MOTTOS=$((GENERIC_N + LICENSE_N))
  
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
# Hub muss vorhanden sein und Canonical auf die echte 200-URL mit Trailing-Slash zeigen
# (GSC-Recovery 03.06.2026: alle /einladung-Canonicals auf Trailing-Slash gezogen, sonst Canonical -> 301).
# Darf KEIN Canonical auf /einladung/piraten haben (sonst wär's die alte Piraten-Seite).
if [ -f "$REPO/einladung/index.html" ]; then
  HUB_CAN=$(grep -aoP 'rel="canonical" href="\K[^"]+' "$REPO/einladung/index.html" 2>/dev/null | head -1)
  if [ "$HUB_CAN" = "https://machsleicht.de/einladung/" ]; then
    green "/einladung/index.html (Hub mit korrektem Canonical, Trailing-Slash)"
  else
    red "/einladung/index.html Canonical falsch: '$HUB_CAN' (erwartet: https://machsleicht.de/einladung/)"
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

echo ""
echo "── STUFE 8: Veraltete Motto-Zahlen (Cut 30.04.2026) ──"
# Nach Lizenz-Cut: keine Refs auf "17 Mottos", "153 Spiele", "Alle 17 Mottos" mehr
# Auch keine Lizenz-Motto-Pages oder -Verlinkungen
STALE_NUMBERS=$(grep -rlE "17 Mottos|153 Spiele|Alle 17 Mottos" --include="*.html" --include="*.js" "$REPO" 2>/dev/null | grep -v "_dev/" | wc -l)
if [ "$STALE_NUMBERS" -eq 0 ]; then
  green "Keine veralteten Zahlen (17 Mottos / 153 Spiele) gefunden"
else
  red "Veraltete Motto-Zahlen in $STALE_NUMBERS Pages — bitte 9 Mottos / 81 Spiele setzen"
fi

# Lizenz-Mottos dürfen keine eigene Page-File mehr haben
LICENSE_FILES=$(find "$REPO/kindergeburtstag" -maxdepth 1 -type f \( -name "frozen*.html" -o -name "harry-potter*.html" -o -name "minecraft*.html" -o -name "ninjago*.html" -o -name "paw-patrol*.html" -o -name "pokemon*.html" -o -name "spider-man*.html" -o -name "super-mario*.html" \) 2>/dev/null | wc -l)
if [ "$LICENSE_FILES" -eq 0 ]; then
  green "Keine Lizenz-Motto-Pages mehr im Repo"
else
  red "$LICENSE_FILES Lizenz-Motto-Files noch da — sollten gelöscht sein"
fi

# Verlinkungen auf Lizenz-Mottos sollten nicht mehr existieren (außer in _redirects, _dev, .git)
# Pattern deckt ab: /kindergeburtstag/<motto>, /<motto>-guide, /ratgeber/<motto>-fuer-eltern
LICENSE_LINKS=$(grep -rlE "/kindergeburtstag/(frozen|harry-potter|minecraft|ninjago|paw-patrol|pokemon|spider-man|super-mario)|/(frozen|harry-potter|minecraft|ninjago|paw-patrol|pokemon|spider-man|super-mario)-guide|/ratgeber/(frozen|harry-potter|minecraft|ninjago|paw-patrol|pokemon|spider-man|super-mario)-fuer-eltern" --include="*.html" --include="*.js" "$REPO" 2>/dev/null | grep -v "_dev/" | wc -l)
if [ "$LICENSE_LINKS" -eq 0 ]; then
  green "Keine Lizenz-Motto-Verlinkungen mehr in Pages"
else
  yellow "$LICENSE_LINKS Pages verlinken noch auf Lizenz-Mottos (werden via 301 abgefangen, aber sollten gefixt werden)"
fi

# Body-Text: Lizenz-Marken nicht mehr erwähnen (auch nicht als Vergleich)
# Nominative Markennutzung wäre rechtlich ok, aber strategisch konsistent: ganz raus
LICENSE_BRANDS=$(grep -rliP "\b(pok[eé]mon|minecraft|frozen|harry potter|spider-man|super mario|paw patrol|ninjago|eiskönigin|olaf)\b" --include="*.html" --include="*.js" "$REPO" 2>/dev/null | grep -v "_dev/" | wc -l)
if [ "$LICENSE_BRANDS" -eq 0 ]; then
  green "Keine Lizenz-Markennamen im Body-Text mehr"
else
  yellow "$LICENSE_BRANDS Pages erwähnen noch Lizenz-Markennamen im Body-Text"
fi

# ── STUFE 9: Sperrliste in _redirects gegen Drift ──
# Netlify liefert bei publish = "." ALLES aus, was im Repo-Root liegt. Die
# Sperrung erfolgt in _redirects per Aufzaehlung (Endungs-Globs funktionieren
# dort nicht zuverlaessig) — eine Aufzaehlung ist aber nur zum Zeitpunkt ihrer
# Erstellung vollstaendig. Ohne diesen Check landet die naechste interne Datei
# im Root still im Netz. robots.txt allein genuegt nicht: das verhindert nur
# das Crawlen, nicht den Abruf.
echo ""
echo "── STUFE 9: Interne Dateien im Publish-Root gesperrt? ──"
# Auf $REPO festgenagelt, nicht CWD-relativ: sonst liefert git ls-files ausserhalb
# des Repos eine leere Liste und der Check meldet gruen, ohne etwas geprueft zu haben.
if [ ! -f "$REPO/_redirects" ]; then
  red "Stufe 9 kann nicht pruefen: $REPO/_redirects fehlt"
else
_unblocked=0
_checked=0
# .js gehoert ZWINGEND in die Liste: party-worker.js — die Datei, deren
# oeffentlicher Abruf diese ganze Sperr-Runde ausgeloest hat — ist eine .js.
# Ein Waechter, der ausgerechnet die Vorfallsklasse auslaesst, ist wertlos.
# NUL-getrennt lesen, damit Dateinamen mit Leerzeichen nicht per Word-Splitting
# in Phantomdateien zerfallen.
while IFS= read -r -d '' _f; do
  case "$_f" in
    robots.txt|manifest.json|sitemap.xml) continue ;;   # oeffentlich gewollt
  esac
  _checked=$((_checked+1))
  # Vergleich ohne Regex: jede _redirects-Zeile aufs erste Feld reduzieren und
  # exakt gegen "/<datei>" halten. Damit entfallen alle Escaping-Fallen —
  # Dateinamen mit + ( ) | ? { } oder Punkt koennen weder falsch-gruen noch
  # falsch-rot ausloesen. Zusaetzlich wird der Zielstatus geprueft: eine
  # 301-Weiterleitung auf dieselbe Datei ist KEINE Sperre.
  # Das Ausrufezeichen ist PFLICHT, nicht optional: Ohne Force-Flag laesst
  # Netlify eine Regel fallen, sobald am Quellpfad eine echte Datei liegt
  # (Shadowing) — und bei publish = "." liegt dort IMMER eine. Eine Zeile
  # "/party-worker.js  /404.html  404" ohne "!" sieht aus wie eine Sperre,
  # ist aber wirkungslos. Muster daher /^(404|410)!$/, nicht !?.
  if ! awk -v want="/$_f" '
        /^[[:space:]]*#/ {next} { if ($1 == want && $3 ~ /^(404|410)!$/) found=1 }
        END { exit(found ? 0 : 1) }' "$REPO/_redirects"; then
    red "Nicht gesperrt: /$_f — Zeile ergaenzen (/$_f  /404.html  404!)"
    _unblocked=$((_unblocked+1))
  fi
done < <(cd "$REPO" && git ls-files -z 2>/dev/null | tr '\0' '\n' | grep -v "/" | grep -iE '\.(md|sh|js|jsx|mjs|cjs|txt|docx|toml|json|yml|yaml|map|bak|orig|swp|env)$' | tr '\n' '\0')
if [ $_unblocked -eq 0 ]; then
  if [ $_checked -eq 0 ]; then
    red "Stufe 9 hat 0 Dateien geprueft — Check greift nicht (git ls-files leer?)"
  else
    green "Alle $_checked internen Root-Dateien haben eine Sperrzeile"
  fi
fi
# Verzeichnis-Sperren. _build gehoert dazu: _redirects sperrt es bereits, ohne
# diesen Check koennte die Regel unbemerkt wegfallen.
for _d in _dev _src _build netlify; do
  if [ -d "$REPO/$_d" ] && ! grep -qE "^/$_d/\*[[:space:]]" "$REPO/_redirects" 2>/dev/null; then
    red "Verzeichnis /$_d/ nicht gesperrt (/$_d/*  /404.html  404!)"
  fi
done
fi

# ── STUFE 10: Keine duennen Einzeljahr-Zwillinge (kindergeburtstag/<motto>-N-jahre.html) ──
# Am 29.07.2026 wurden 69 solcher Dateien geloescht: sie lieferten thin-200 auf einer
# gerade deindex-erholten Domain, waehrend ihre extensionslose URL bereits per 301! auf
# die reiche Range-Seite (<motto>-N-M-jahre) weiterleitet. Dieser Waechter verhindert,
# dass ein Template-Lauf sie still neu erzeugt. Range-Seiten (zwei Zahlen) sind erlaubt.
# Definition Thin-Zwilling = Dateiname endet auf GENAU EINE Jahreszahl vor -jahre.html.
# Die Range-Ausschluss-Zeile '(.*-)?[0-9]+-[0-9]+-jahre.html' entfernt sowohl <motto>-N-M-jahre
# (mit Motto-Praefix) als auch die generischen Alters-Hubs 3-5/6-8/9-12-jahre.html (leerer
# (.*-)?-Zweig). So werden auch Mottos mit Bindestrich/Umlaut/Grossbuchstabe UND zifferninitiale
# Slugs erfasst (unter-wasser-7-, raeuber-6-, Dino-6-, 90er-party-7-jahre.html), ohne Range-Seiten
# oder Hubs falsch-rot zu treffen (Reviewer-Catch 29.07. + verankerte Exclusion statt Start-Guard).
# Restblindstelle: benachbarte Zahlgruppen wie top-10-6-jahre.html (Pseudo-Range) — akzeptiert,
# solches Slug-Schema existiert nicht. Doppel-Grep in _KG_THIN() gekapselt (kein Pattern-Drift).
_LS_KG() { (cd "$REPO" && ls kindergeburtstag/ 2>/dev/null); }
_KG_THIN() { _LS_KG | grep -Ex '.*-[0-9]+-jahre\.html' | grep -Evx '(.*-)?[0-9]+-[0-9]+-jahre\.html'; }
echo ""
echo "── STUFE 10: Keine duennen Einzeljahr-Zwillinge? ──"
_thin=$( _KG_THIN | wc -l | tr -d ' ')
if [ "${_thin:-0}" -gt 0 ]; then
  red "Stufe 10: $_thin duenne Einzeljahr-.html wieder da (thin-200-Leak; Range-Seiten -N-M-jahre.html bleiben erlaubt)"
  _KG_THIN | sed 's/^/    /'
else
  green "Keine duennen Einzeljahr-Zwillinge (Range-Seiten unberuehrt)"
fi

echo ""
echo "── STUFE 11: Kostenzahl im Feld == Kostenzahl auf dem gedruckten Blatt? ──"
if python _dev/scripts/check-kosten-prosa.py; then
  green "estimatedCostEur deckt sich mit der Countdown-Prosa (2 bekannte Altlasten)"
else
  red "Stufe 11: estimatedCostEur weicht von der gedruckten Countdown-Zahl ab"
fi

echo ""
echo "── STUFE 12: Passt das Programm in sein eigenes Zeitfenster? ──"
if node _dev/scripts/check-zeitplan.mjs; then
  green "Jede Variante passt in ihr timeWindow"
else
  yellow "Stufe 12: Varianten ueberziehen ihr Fenster — Spiele landen im Reserve-Kasten"
fi

echo ""
echo "── STUFE 13: Ergeben die Sortier-Raetsel ihr Loesungswort? ──"
if node _dev/scripts/check-sortier-raetsel.mjs; then
  green "Alle Sortier-Raetsel gehen auf (Regel, Zahlen und Loesungswort passen)"
else
  red "Stufe 13: Ein Raetsel ergibt nach seiner eigenen Regel ein anderes Wort"
fi

echo ""
echo "── STUFE 14: Liest ueberhaupt jemand diese Motto-Felder? ──"
if python _dev/scripts/check-ungelesene-felder.py; then
  green "Keine neuen ungelesenen Felder (10 bekannte Altlasten)"
else
  red "Stufe 14: Motto-Daten liegen vor, die kein Renderer druckt"
fi

echo ""
echo "── STUFE 15: Parst das Paket ueberhaupt? ──"
if python _dev/scripts/check-paket-parst.py; then
  green "Alle Paket-Dateien parsen als JavaScript"
else
  red "Stufe 15: Ein Paket parst nicht — Kaeufer sieht nur den Ladetext"
fi

echo ""
echo "── STUFE 16: Redaktionelles auf Blaettern, die vorgelesen werden ──"
if python _dev/scripts/check-interne-notizen.py; then
  green "Kein Markdown/keine URL in Feldern, die roh gedruckt werden"
else
  red "Stufe 16: Redaktionsspuren auf einem gedruckten Blatt"
fi

echo ""
echo "── STUFE 17: Halten die gedruckten Preisversprechen? ──"
# WARNUNG, nicht Fehler — und das ist eine bewusste Entscheidung, kein Nachlassen:
# die Stufe findet 49 Altlasten in 20 Dateien. Als roter Fehler waere das Gate ab
# sofort dauerhaft rot, und ein dauerhaft rotes Gate bringt allen bei, es zu
# ignorieren. Sobald die Altlast abgetragen ist, wird aus `yellow` ein `red`.
if python _dev/scripts/check-preisversprechen.py; then
  green "Jedes genannte Preisversprechen deckt sich mit seiner Einkaufsliste"
else
  yellow "Stufe 17: Preisversprechen weichen von der Einkaufsliste ab (Altlast, Bolle entscheidet die Richtung)"
fi

echo ""
echo "── STUFE 18: Verhalten sich doppelte Helfer gleich? ──"
if python _dev/scripts/check-doppelte-helfer.py; then
  green "Doppelt implementierte Helfer liefern identische Ergebnisse"
else
  red "Stufe 18: Zwei Fassungen derselben Funktion rechnen verschieden"
fi

echo ""
echo "── STUFE 19: Widerspruechliche Mindestmasse auf einer Spielkarte ──"
# WARNUNG statt Fehler, und zwar nur solange Bolle die Formulierung noch nicht
# entschieden hat: die Zahlen betreffen eine Verschluck-Grenze bei 3-5-Jaehrigen.
# Eine Norm-Zahl mit Sicherheitsfolge setzt kein Skript und kein Automat —
# sie gehoert primaerverifiziert und von einem Menschen gesetzt. Sobald das
# passiert ist, wird aus `yellow` ein `red`.
if python _dev/scripts/check-groessenangaben.py; then
  green "Keine widerspruechlichen Mindestmasse auf einer Karte"
else
  yellow "Stufe 19: Eine Spielkarte nennt mehrere Mindestmasse (Bolle entscheidet die Formulierung)"
fi

echo ""
echo "── STUFE 20: Feldnamen aus dem Datenmodell in gedruckten Texten ──"
if python _dev/scripts/check-internes-vokabular.py; then
  green "Kein Repo-Vokabular in Texten, die Eltern lesen"
else
  red "Stufe 20: Ein Feldname steht in einem Text, den Eltern lesen"
fi

echo ""
echo "── STUFE 21: Ankunfts-Spiel an letzter Stelle (wird zum Finale) ──"
if python _dev/scripts/check-ankunft-am-ende.py; then
  green "Kein Ankunfts-Spiel steht am Ende des Ablaufplans"
else
  red "Stufe 21: Der Ablaufplan setzt eine Ankunfts-Aktivitaet ans Partyende"
fi

echo ""
echo "── STUFE 22: Greift eine Funktion auf fremde lokale Variablen zu? ──"
# Die Ergaenzung zu Stufe 15: die fragt "parst es?", diese fragt "laeuft es?".
# Am 05.08. parste alles tadellos, aber vier von fuenf Paketen zeigten NULL
# Blaetter — const summe lag in shSOS, gebraucht wurde es in shShopping.
if python _dev/scripts/check-scope-leck.py; then
  green "Keine funktionslokale Variable wird von aussen benutzt"
else
  red "Stufe 22: ReferenceError zur Laufzeit — das Paket rendert nichts"
fi

echo ""
echo "── STUFE 23: Motto-fremdes Vokabular in einem Manifest? ──"
# Die Manifeste entstehen, indem feuerwehr Slot fuer Slot uebersetzt wird.
# Bleibt einer liegen, parst alles und der Rundlauf ist gruen — gedruckt steht
# dann "Danke fuer den Einsatz!" auf einem Meerjungfrau-Produkt (05.08.,
# sechs Slots in meerjungfrau UND baustelle, plus w32 in beiden).
if python _dev/scripts/check-motto-fremdwort.py; then
  green "Kein Manifest traegt das Vokabular eines anderen Mottos"
else
  red "Stufe 23: Ein Paket druckt die Woerter eines fremden Mottos"
fi

echo ""
echo "── STUFE 24: ss, wo ein Eszett stehen muss ──"
# Aus dem meerjungfrau-Review (7.1). Nachgemessen war es nicht "Schweizer
# Orthografie", sondern schlicht inkonsistent: derselbe Satz trug beides.
# 138 Stellen in 19 Dateien, quer ueber 12 Mottos.
if python _dev/scripts/check-eszett.py; then
  green "Eszett-Schreibung durchgaengig"
else
  red "Stufe 24: ss statt Eszett in gedrucktem Text"
fi

# ─────────────────────────────────────────────────────────────────────────────
# Stufen 25-27 kommen aus dem ritter-Gate vom 06.08. Bolles Regel dazu:
# "Die Majors muessten ja Maschinen-Majors sein" — jeder Befund, den ein
# Gutachter findet, gehoert danach in eine Regel, sonst findet ihn der naechste
# Gutachter noch einmal und wir bezahlen zweimal fuer dieselbe Erkenntnis.
# ─────────────────────────────────────────────────────────────────────────────

echo ""
echo "── STUFE 25: Pflicht-Bloecke in der PAKET_CFG ──"
# ritter war das einzige der sechs Mottos ohne `timeline`-Block. Der Kern faellt
# dann auf motto-neutrale Defaults zurueck: Blatt 2 eines Ritter-Pakets sagte
# "Ankommen & Aufnahme" und "Kuchen & Snacks", und der Name des Signatur-Rituals
# kam im ganzen Zeitplan nicht vor. Es parste, der Rundlauf war gruen.
if python _dev/scripts/check-cfg-pflichtbloecke.py; then
  green "Jedes Manifest traegt seine Pflicht-Bloecke"
else
  red "Stufe 25: Manifest ohne Pflicht-Block — Ablaufplan faellt auf neutrale Defaults"
fi

echo ""
echo "── STUFE 26: ageAdjust-Staffeln decken ihr Altersband ──"
# Das gross-Paket druckte "Bei 8-Jaehrigen: NICHT fuer 8 — siehe oben", weil nur
# 6er- und 8er-Staffeln existieren. Die Vorlage unterdrueckt den Block seit dem
# 06.08., wenn die Stufe nicht ins Band passt — damit ist die Falschaussage weg,
# die LUECKE aber nicht. WARNUNG statt Fehler: 105 Spiele in 45 Dateien brauchen
# geschriebene 3er/9er/12er-Staffeln, das ist ein Inhalts-Projekt, kein Fix.
if python _dev/scripts/check-altersstaffeln.py; then
  green "Alle Altersstaffeln liegen in ihrem Band"
else
  yellow "Stufe 26: Spiele ohne Staffel im eigenen Altersband (Altlast — klein/gross bekommen keinen Alters-Rat)"
fi

echo ""
echo "── STUFE 27: Feste Zahlen, die der Renderer variabel erzeugt ──"
# "Seiten 6-8" stand in allen sechs Manifesten fest, waehrend die Kartenzahl
# zwischen 3 und 6 schwankt. "Die 5 Stationen" ebenso, obwohl die Liste aus
# schatzsuche.json kommt. Solche Zahlen fallen nie auf: sie stimmen fuer den
# Testfall, unter dem sie geschrieben wurden.
if python _dev/scripts/check-harte-zahlenversprechen.py; then
  green "Keine festen Zahlen, wo der Renderer zaehlt"
else
  red "Stufe 27: feste Zahl in einem Slot, den der Renderer variabel fuellt"
fi

echo ""
echo "── STUFE 28: Sagt der ageAdjust-Schluessel dasselbe wie sein Text? ──"
# Die Regel, an der die Altersstaffel-Architektur haengt. 40 Schluessel
# widersprachen am 06.08. ihrem eigenen Inhalt (ageAdjust8 trug "Bei
# 5-Jaehrigen"), weil klein-Dateien 6/8 als Slot-Nummern benutzt haben. Als die
# Zahl erstmals gelesen wurde, verschwanden dadurch die Sicherheitszeilen aus
# den bezahlten 3-5-Paketen. Stufe 26 haette das Umbenennen kosmetisch gruen
# gemeldet — diese Stufe prueft die Zahl gegen den Text.
if python _dev/scripts/check-altersschluessel-wahrheit.py; then
  green "Jeder Altersschluessel sagt dasselbe wie sein Text"
else
  red "Stufe 28: ageAdjust-Schluessel widerspricht seinem eigenen Text"
fi

echo ""
echo "── STUFE 29: Traegt jedes Paket den aktuellen Vorlagen-Stand? ──"
# Der eine MAJOR des dritten Gutachtens: paket/piraten/index.html stand zwei
# Fix-Wellen zurueck, weil der Generator eine harte Sperre trug. Der
# piraten-Kaeufer druckte deshalb keine Allergie-Zeile am Essen, keine
# Abholzeiten und die Kosten-Widerspruchszeile — und dieser Zustand passierte
# FUENF gruene Stufen. Keine einzige prueft, ob ein erzeugtes Paket zu der
# Vorlage gehoert, aus der es stammt. Diese schon.
if python _dev/scripts/check-paket-generation.py; then
  green "Alle Pakete tragen die Funktionen der aktuellen Vorlage"
else
  red "Stufe 29: erzeugtes Paket haengt hinter der Vorlage zurueck — neu bauen"
fi

echo ""
echo "── STUFE 30: Doppelpunkt-/Stern-Genderformen in Produkt-Texten ──"
# Bolle 06.08.: "Set-weit nicht gendern!" Anlass war ein Vorlese-Text — "Die
# Tafelrunde sucht neue Ritter:innen" — bei dem das Kind "Ritter Doppelpunkt
# innen" hoert. 759 Formen in 39 Dateien sind raus, diese Stufe haelt sie
# draussen. Doku und Historie sind bewusst ausgenommen: sie zitieren die
# Formen teils als Befund. Ausgeschriebene Paarformen sind KEIN Fund.
if python _dev/scripts/check-gendersprache.py; then
  green "Keine Doppelpunkt-/Stern-Genderformen in Produkt-Texten"
else
  red "Stufe 30: Genderform in einem Text, den Eltern oder Kinder lesen"
fi

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
