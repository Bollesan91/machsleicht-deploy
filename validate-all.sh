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

# Ein FRISCH ANGELEGTES Log-Verzeichnis je Lauf, statt siebzehn fester /tmp-Pfade.
# Anlass (02.09., beides an einem Nachmittag belegt):
#   1. /tmp ist unter Git Bash schlicht %TEMP% — geteilt mit jeder anderen Session auf diesem
#      Rechner und mit dem halben Windows. Zwei gleichzeitige Laeufe ueberschrieben sich die
#      Zwischenlogs; die Stufen lesen mit tail/grep daraus und haetten eine fremde Messung als
#      ihre eigene gemeldet — ohne dass man es der Ausgabe ansieht. Ein ganzer Lauf ging so
#      verloren, weil eine fremde Aufraeumaktion das Log mittendrin entfernte.
#   2. Im Muster `if A && B > log; then … else <log zeigen>` laeuft B nie, wenn A scheitert —
#      also genau im Fehlerfall. Der else-Zweig belegte den Fehlschlag dann mit dem Inhalt vom
#      vorigen Lauf. In einem leeren Verzeichnis gibt es nichts Altes zu zeigen.
# Zeitstempel UND PID: PIDs werden wiederverwendet, Zeitstempel nicht.
# Bewusst KEIN Aufraeumen am Ende: ein `rm -rf` auf eine Variable, die leer sein kann, loescht
# im Zweifel das Arbeitsverzeichnis. Die Verzeichnisse sind winzig, liegen unter _dev/
# (netlify-ignoriert) und sind in .gitignore.
LOGDIR="$REPO/_dev/.lintlogs/$(date +%Y%m%d-%H%M%S)-$$"
mkdir -p "$LOGDIR" || { echo "ABBRUCH: Log-Verzeichnis $LOGDIR nicht anlegbar"; exit 2; }

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

echo ""
echo "── STUFE 31: Sichtbarer Text (Wortzahl, Buchstaben-Salat, Sortimentszahlen) ──"
# GSC-Audit 10.08.: Der alte Crawl-Zaehler zaehlte Script-/JSON-LD-Text mit —
# "keine Seite < 300 Woerter" war falsch, 13 Sitemap-Seiten lagen real drunter,
# darunter 9 Seiten mit 18.873 Einzelbuchstaben-<li> (String statt Liste
# iteriert), live unbemerkt seit 26.05. Diese Stufe zaehlt nur sichtbaren
# Text und haelt die drei Muster maschinell draussen: Duenn-Seite in der
# Sitemap, M4-Buchstaben-Salat/dict-Literale, M8-veraltete Sortimentszahlen
# (Soll dynamisch aus data/, nicht hartkodiert).
# || rc=…: das Skript laeuft unter set -e — ein nackter Aufruf mit Exit 2
# (nur Warnungen) wuerde das ganze Gate hier abbrechen, ohne ERGEBNIS-Block.
rc=0; python _dev/scripts/check-sichtbarer-text.py || rc=$?
case $rc in
  0) green "Sichtbarer Text: Wortzahlen ok, kein Render-Salat, Zahlen stimmen" ;;
  2) yellow "Stufe 31: Sitemap-Seiten unter 500 sichtbaren Woertern (Ausbau = 14-Tage-Plan)" ;;
  *) red "Stufe 31: Duenn-Seite in Sitemap, Buchstaben-Salat oder veraltete Sortimentszahl" ;;
esac

echo ""
echo "── STUFE 32: Beispielkinder-Namen in Druckdaten ──"
# Externes Audit 10.08.: 'Hanna, Felix, Sofie tauchen auf, obwohl die Gaeste
# Emma, Mats, Lina heissen.' 500+ Stellen wurden getilgt (Rollen-Zettel an
# echte Zusagen gebunden, [Name]-Platzhalter, Rollen-Sprecher). Diese Stufe
# haelt den 26er-Namens-Pool (inkl. Possessive) aus data/motto, elite-Quellen
# und gerenderten Altersseiten heraus; fiktive Figuren und Namens-Erfindungs-
# Tipps stehen auf der Whitelist im Skript.
if python _dev/scripts/check-beispielnamen.py; then
  green "Keine Beispielkinder in Druckdaten"
else
  red "Stufe 32: erfundenes Kind in druckrelevanten Daten — kollidiert mit echter Gaesteliste"
fi

echo ""
echo "── STUFE 33: Redaktions-/QA-Vokabular in Druckdaten ──"
# Re-Check 10.08. (M3+F5): QA-Notizen ("Halluzination!", "Berufsbild-
# Klarstellung") standen in gedruckten Stations-Texten und Vorleser-hints.
# Enge Muster-Liste ohne legitime Druck-Verwendung; _meta ist ausgenommen.
if python _dev/scripts/check-meta-vokabular.py; then
  green "Kein Redaktions-Vokabular in Druckdaten"
else
  red "Stufe 33: QA-/Meta-Notiz in druckrelevanten Daten — landet beim Kunden"
fi

echo ""
echo "── STUFE 34: Zahlen-Konsistenz (getippt vs. Datenlaenge) ──"
# Feld-Mechanik #110 (Bolle 11.08.): gedruckte Zaehlungen ("25 Quiz-Karten",
# "5 Verdaechtige", "4 Stationen") muessen aus den Daten beweisbar sein —
# die Klasse stellte in den Baustelle-/Feuerwehr-Gates die meisten MAJORs.
# FAIL nur fuer Mottos im Gate-Scope (FAIL_MOTTOS im Skript), Rest WARN.
if python _dev/scripts/check-feldkonsistenz.py; then
  green "Getippte Zahlen decken sich mit den Datenlaengen (Gate-Scope)"
else
  red "Stufe 34: getippte Zahl widerspricht der Datenlaenge — landet beim Kunden"
fi

echo "── STUFE 35: Planer-Kanal + Rechtsfooter-Pflicht ──"
# recheck5-M1/M4/M5 (11.08.): Age-Page-Regeneration loeschte den handgepatchten
# Rechtsfooter; Katalog-Sync trug "Teil I/II/III"-Paket-Verweise auf die freien
# Seiten. Beides ab jetzt maschinell gegatet.
if python _dev/scripts/check-planer-kanal.py; then
  green "Rechtsfooter ueberall, keine Paket-Verweise auf freien Seiten"
else
  red "Stufe 35: Rechtsfooter fehlt oder Paket-Verweis im Planer-Kanal"
fi

echo "── STUFE 36: Maschinen-Stand (generierte Seiten == Generator-Ergebnis) ──"
# Bolle 12.08.: "Maschine fixen, nicht das Paket." Ein Hand-Edit an einer
# generierten Datei verschwindet beim naechsten Lauf; eine nicht neu gebaute
# Seite traegt alte Wahrheit weiter (so ueberlebte die 5-cm-Regel drei Wellen).
if python _dev/scripts/check-maschinen-stand.py; then
  green "Generierte Seiten decken sich mit dem Generator"
else
  red "Stufe 36: generierte Seite weicht ab — Hand-Edit oder nicht neu gebaut"
fi

echo "── STUFE 37: Mengen decken die Kinderzahl der Variante ──"
# Maschinen-Pilot M2 (12.08.): eine Karte verspricht "je Kind 1 Pappschild",
# nennt aber 8 Stueck — bei 10 Kindern stehen zwei ohne da. Der Kaeufer merkt
# es am Spieltag. Kinderzahl kommt aus variants[].timeWindow.
if python _dev/scripts/check-mengen-kinderzahl.py; then
  green "Pro-Kind-Versprechen sind durch die genannten Mengen gedeckt"
else
  red "Stufe 37: Karte verspricht pro Kind mehr, als sie an Menge nennt"
fi

echo "── STUFE 38: Traegt das Zeitfenster das Programm der Variante? ──"
# Maschinen-Pilot M1 (12.08.): klein/minimal versprach im Intro "3 Stationen",
# das 90-Min-Fenster trug nach Ankunft und Kuchen genau EINE. Rechnet mit
# derselben Arithmetik wie buildTimeline(). Reserve-Spiele sind gewollt —
# Alarm erst, wenn unter 2 Spiele im Plan bleiben oder die Reserve ueberwiegt.
if python _dev/scripts/check-fenster-deckung.py; then
  green "Jede Variante traegt ihr eigenes Programm"
else
  red "Stufe 38: Variante verspricht mehr Programm, als ihr Fenster traegt"
fi

echo "── STUFE 39: Riskantes im Einkauf braucht eine gedruckte Regel ──"
# Re-Check-M1 (12.08.): 9-12 kauft echtes Werkzeug + Schutzbrillen, und im
# ganzen Dossier stand keine Regel — sie lag in faq/ageInsight, beide werden
# nicht gedruckt. Die Regel gehoert an den Posten (safetyNote), nicht in ein
# Feld, das niemand sieht.
if python _dev/scripts/check-sicherheit-einkauf.py; then
  green "Jeder riskante Einkaufsposten traegt seine Regel"
else
  red "Stufe 39: riskantes Material ohne gedruckte Sicherheitsregel"
fi

echo "── STUFE 41: Gedruckte Regel darf nur Ausruestung verlangen, die im Einkauf steht ──"
# Befund 12.08.: das Filmdosen-Raketen-Experiment druckt "Schutzbrille PFLICHT
# fuer alle in Reichweite (kein optional)" — und auf der Einkaufsliste stand
# keine. Eine Pflicht, die die Familie am Spieltag nicht erfuellen KANN, wird
# ignoriert und entwertet jede andere Regel gleich mit.
if python _dev/scripts/check-ausruestung-deckung.py; then
  green "Jede geforderte Schutzausruestung ist auch kaufbar"
else
  red "Stufe 41: gedruckte Regel verlangt Ausruestung, die niemand kauft"
fi

echo "── STUFE 42: Was die freie Seite verkauft, muss sie auch regeln ──"
# Befund 12.08. abends: data/motto trug 198 gedruckte Sicherheitsregeln, die
# freien Ratgeberseiten 0 — der Generator kannte das Feld nicht (behoben), und
# er erzeugt nur 3 der 15 Mottos. Die uebrigen Seiten sind eingefrorenes HTML
# und verkaufen dieselben Wunderkerzen und Ballons ohne ein Wort.
#
# 13.08. neu gebaut: die Stufe misst jetzt am Produkt statt am Katalog. Jeder
# Einkaufs- UND Deko-Posten der Seite, der nach riskantem Material klingt, braucht
# eine gedruckte Regel — egal ob data/motto denselben Artikel kennt. Die freien
# Seiten fuehren ein eigenes Sortiment (Ticket K6); die alte Fassung mass deshalb
# die falsche Groesse und zaehlte obendrein die CSS-Regel als "gedruckt" mit.
if python _dev/scripts/check-freie-seite-regeln.py; then
  green "Jede freie Seite druckt die Regeln zu dem, was sie verkauft"
else
  red "Stufe 42: freie Seite verkauft riskantes Material ohne die vorhandene Regel"
fi

echo "── STUFE 43: Die Regel muss von der Ware sprechen, an der sie steht ──"
# Befund 13.08.: der Posten "Luftballons (optional, ~5 Stueck)" trug die
# WUNDERKERZEN-Regel — Restschaden des Massen-Nachziehens vom 12.08. (replace in
# der Schleife, waehrend der neue Text den alten enthielt). Alle Zaehler standen
# auf gruen: 22 von 22 Wunderkerzen-Regeln gesetzt, zwei davon am falschen Posten.
# Die Stufe schlaegt an, wenn der ERSTE Satz von fremder Ware handelt, die ein
# anderer Posten derselben Variante verkauft.
if python _dev/scripts/check-regel-ware.py; then
  green "Jede Regel spricht von der Ware, an der sie steht"
else
  red "Stufe 43: Sicherheitsregel steht am falschen Posten"
fi

echo "── STUFE 44: Die freien Seiten sind abgeleitet, nicht getippt ──"
# Helfer V5 R2: reviewt wird, was aus der Maschine faellt. Laeuft der Renderer und
# aendert etwas, war die Seite handgepflegt — dann reviewt der Gutachter einen
# Stand, den der naechste Lauf ueberschreibt. Der Lauf beweist zugleich, dass jede
# Regel einen Anker hat (fail-loud statt stiller Verlust).
if python _dev/scripts/regeln-drucken.py --check > "$LOGDIR/regeln.log" 2>&1; then
  green "Jede gedruckte Regel stammt aus den Daten (Idempotenz bewiesen)"
else
  tail -3 "$LOGDIR/regeln.log"
  red "Stufe 44: freie Seiten weichen von der Datenwahrheit ab"
fi

echo "── STUFE 45: raw-URLs im Pruefauftrag zeigen auf existierende Dateien ──"
# Befund 17.08.: im Gate-B-Auftrag stand "piratengeburtstag-6-8-jahre.html", die
# Datei heisst "piraten-6-8-jahre.html". Die uebliche Netz-Verifikation (curl auf
# 200) konnte das nicht fangen, weil raw.githubusercontent.com gerade 429 statt
# 404 lieferte — ein rate-limiteter Host beantwortet die Frage "gibt es den Pfad?"
# ueberhaupt nicht. Der Gutachter haette "Datei nicht gefunden" gemeldet und ein
# Fuenftel des Auftrags waere verpufft. Diese Stufe prueft ohne Netz gegen HEAD.
if python _dev/scripts/check-review-urls.py; then
  green "Jede raw-URL im Pruefauftrag zeigt auf eine Datei, die es gibt"
else
  red "Stufe 45: Pruefauftrag verweist auf einen Pfad, den es nicht gibt"
fi

echo "── STUFE 48: Dieselbe Ware, kein gegensaetzliches Urteil ──"
# Zweitwichtigster Befund aus Gate B: Walkie-Talkies, LED-Deko, UV-Lampe,
# Fernrohre, Bandanas und Gummibaerchen trugen an einer Stelle eine gedruckte
# Regel und galten an anderer als harmlos — teils in derselben Altersgruppe. Der
# Leser sieht immer nur eine Seite und kann den Widerspruch nicht bemerken.
#
# Reifung nach oben ist erlaubt ("mit 9 kein Thema mehr"), nach unten nie.
# Warenkerne kommen mechanisch aus dem Label (kein Vokabular, L17); Behaelter-,
# Farb-, Material- und Kategoriewoerter sind keine Waren. Buendel-Faelle stehen
# einzeln und begruendet in NICHT_EINSCHLAEGIG, und eine Ausnahme, die nicht mehr
# greift, FAILt selbst.
if python _dev/scripts/check-ware-urteil.py; then
  green "Keine Ware wird an einer Stelle geregelt und an anderer freigegeben"
else
  red "Stufe 48: dieselbe Ware traegt gegensaetzliche Urteile"
fi

echo "── STUFE 57: Eine Augenspuelung dauert nie unter zehn Minuten ──"
# Re-Check 18.08.: Der erste Gutachter meldete die Fuenf-Minuten-Angabe auf dino-3-5;
# behoben wurde genau diese eine Stelle, weil nur sie gedruckt war. Der Re-Check fand
# die Klasse — data/motto/weltraum-gross.json trug sie weiter, im Paket, das Eltern
# kaufen. Im uebrigen Bestand steht 74-mal "mindestens 10 Minuten".
if python _dev/scripts/check-spuelzeit.py; then
  green "Jede Augenspuelung nennt mindestens zehn Minuten"
else
  red "Stufe 57: Augenspuelung unter zehn Minuten"
fi

echo "── STUFE 55: Ein Notfallmedikament wird nie eingesammelt ──"
# Gutachten 18.08., primaerverifiziert (DAAB, Deutsche Atemwegsliga): Auf allen vier
# Schlafparty-Mottos stand "Allergien, Asthma-Inhalator und Medikamente vorher
# einsammeln" — die Umkehrung der richtigen Anweisung, ausgerechnet fuer Naechte im
# abgedunkelten Raum. Das Notfallset muss erreichbar bleiben, ab passendem Alter beim
# Kind selbst. Die Stufe nimmt Saetze aus, die die AUSKUNFT einsammeln
# ("Allergien per WhatsApp abfragen") — sonst bestraft sie richtige Formulierungen.
if python _dev/scripts/check-notfallmedikament.py; then
  green "Kein Notfallmedikament wird eingesammelt oder weggeschlossen"
else
  red "Stufe 55: Notfallmedikament soll weggenommen werden"
fi

echo "── STUFE 56: Die Luecke im Spielkarten-Kanal waechst nicht ──"
# Gutachten 18.08. (W4): Stufe 52 prueft eingetragene Anker, nie fehlende. Ein roter
# Kasten, der Pruefung suggeriert, ist dort gefaehrlich, wo er FEHLT. Diese Stufe zaehlt
# die Karten, zu denen es ein passendes Spiel MIT Regel gibt und trotzdem keinen Anker,
# und haelt die Zahl je Seite in data/spielanker-deckung.json fest.
if python _dev/scripts/check-spielanker-deckung.py; then
  green "Keine neue Luecke zwischen Spielkarte und hinterlegter Regel"
else
  red "Stufe 56: mehr Spielkarten ohne Anker als festgehalten"
fi

echo "── STUFE 52: Die Bruecke Spielkarte -> Spieldaten zeigt nirgends ins Leere ──"
# Befund O (18.08.): 105 der 146 nicht angekommenen Spielregel-Verbote nennen gar
# keine Ware ("Sichtaufsicht", "Platz freiraeumen") und gehoeren deshalb an das
# Spiel, nicht an einen Einkaufsposten. Der Spielkarten-Kanal druckt sie dorthin.
# Die Zuordnung Karte <-> Spiel steht ausdruecklich in spielAnker, weil beide
# Kataloge getrennt gewachsen sind (K6) und eine geratene Zuordnung eine
# Sicherheitsregel unter das falsche Spiel setzen wuerde. Die Stufe benutzt die
# Karten-Erkennung des Renderers selbst — ein Gate, das anders misst als die
# Maschine, prueft die Maschine nicht.
if python _dev/scripts/check-spielanker.py; then
  green "Jeder Spielkarten-Anker trifft Karte und Spiel, Ausnahmen sind belegt"
else
  red "Stufe 52: Spielkarten-Anker zeigt ins Leere oder Ausnahme ist veraltet"
fi

echo "── STUFE 51: Keine C1-Steuerzeichen im ausgelieferten HTML ──"
# Beifang 18.08.: meerjungfrau-3-5 trug 47 Reste einer verungluecktem
# Emoji-Dekodierung, eines davon mitten im og:title — also in der Link-Vorschau,
# die WhatsApp und Facebook beim Teilen zeigen.
if python _dev/scripts/check-steuerzeichen.py; then
  green "Kein Steuerzeichen-Muell im HTML"
else
  red "Stufe 51: C1-Steuerzeichen im HTML"
fi

echo "── STUFE 47: Kein Verweis auf Text, den der Leser der freien Seite nie sieht ──"
# Befund 17.08. aus Gate B: 72 der 787 harmlos-Begruendungen argumentierten nicht,
# sondern verwiesen — "die Spielregel ist bereits gedruckt", "Allergie-Abfrage im
# Paket verankert". Gemessen: parentTips/cakeRecipe/faq stehen auf den freien
# Seiten, die Spiel-safetyRule steht dort NICHT (Stichprobe 0 von 8). Damit wurde
# eine Auslassung mit einem Beleg begruendet, den der Kaeufer nie sieht.
# Seit dem Aufraeumen prueft die Stufe BEIDE Felder: auch eine gedruckte Regel
# darf nicht auf Unsichtbares zeigen ("Die eigene Spielregel verlangt sechs
# Zentimeter" stand 7x auf den Seiten).
if python _dev/scripts/check-harmlos-verweis.py; then
  green "Jede Begruendung und jede Regel traegt aus sich heraus"
else
  red "Stufe 47: Text beruft sich auf eine Stelle, die der Leser nicht sieht"
fi

echo "── STUFE 46: Keine Kleinteil-Untergrenze unter der Pruefgroesse ──"
# Befund 17.08.: Neben der gedruckten Regel ("nichts, was durch eine Klopapierrolle
# passt") trugen die freien Seiten eine zweite, handgeschriebene Sicherheitsschicht
# mit FUENF verschiedenen Zahlen fuer dieselbe Gefahr — "ab 2 cm", "mindestens 3 cm",
# auf feen-3-5 sogar 3, 4 und 5 cm auf einer Seite. Primaerverifiziert (16 CFR 1501.4
# / CPSC): der Kleinteile-Pruefzylinder hat 31,7 mm Innendurchmesser. "Mindestens
# 3 cm" liegt darunter — die Zahl erlaubt genau das, wovor sie warnt. Alle Treffer
# standen auf 3-5-Seiten, der gefaehrdetsten Gruppe.
if python _dev/scripts/check-kleinteil-grenze.py; then
  green "Keine Groessenangabe unterschreitet die Kleinteile-Pruefgroesse"
else
  red "Stufe 46: Fliesstext nennt eine Kleinteil-Grenze unter der Pruefgroesse"
fi

echo "── STUFE 40: Maschinen-Abnahme (alle Pakete x Gruppen x Varianten gerendert) ──"
# Bolle 12.08.: "es geht nicht darum einzelne Mottos abzunehmen, sondern die
# Maschine". Rendert 6 Pakete x 3 Altersgruppen x 3 Varianten echt im DOM und
# prueft Invarianten, die fuer ALLE gelten. Braucht jsdom (npm i jsdom).
#
# Seit 12.08. BLOCKIEREND (vorher gelb). Solange die Stufe nur warnen konnte,
# nahm sie nichts ab — sie beschrieb den Zustand. Mit 54/54 ist der Zustand
# erreicht, und ab hier ist jeder Rueckfall ein Fehler, kein Hinweis.
if node _dev/scripts/maschinen-abnahme.js > "$LOGDIR/abnahme.log" 2>&1; then
  green "Alle 54 Ausprägungen erfuellen die Invarianten"
else
  grep -c FAIL "$LOGDIR/abnahme.log" | xargs -I{} echo "    {} Ausprägung(en) verletzen eine Invariante (Details: node _dev/scripts/maschinen-abnahme.js)"
  grep FAIL "$LOGDIR/abnahme.log" | head -5
  red "Stufe 40: Maschinen-Abnahme gebrochen"
fi

echo "── STUFE 50: Gedruckte Daten stimmen (Wochentag + Zeitrichtung) ──"
# Befund 18.08. aus dem externen SEO-/E-E-A-T-Audit, selbst nachgerechnet: Der Planer
# zeigte "Sa, 21.06.2026" — der 21.06.2026 war ein SONNTAG und lag zwei Monate in der
# Vergangenheit. Fuer ein Planungswerkzeug ist ein falscher Wochentag kein Schoenheits-
# fehler, sondern der Beweis, dass die Zahlen auf der Seite niemand nachrechnet.
# Googlebot sieht denselben Platzhalter — JavaScript ersetzt ihn erst im Browser.
#
# Die Stufe prueft wenige Stellen, deshalb laeuft die Gegenprobe (8 konstruierte Faelle)
# bei JEDEM Lauf mit: "0 FAIL" ist erst dann eine gute Nachricht, wenn im selben Lauf
# bewiesen ist, dass das Gate ueberhaupt noch etwas fangen kann (Lektion L22).
if python _dev/scripts/check-datumsangaben.py && python _dev/scripts/check-datumsangaben.py --gegenprobe > "$LOGDIR/datum-gegenprobe.log" 2>&1; then
  green "Jedes gedruckte Datum traegt den richtigen Wochentag, keine abgelaufene Vorschau"
else
  # Beleg aus DIESEM Lauf, nicht aus der Datei: scheitert der erste Befehl, laeuft der
  # zweite nie, der Redirect passiert nie — und ein `cat` zeigte dann den vorigen Lauf.
  python _dev/scripts/check-datumsangaben.py 2>&1 | grep -E "FAIL" | head -5
  python _dev/scripts/check-datumsangaben.py --gegenprobe 2>&1 | tail -3
  red "Stufe 50: Datumsangabe falsch — oder die Gegenprobe zeigt ein blindes Gate"
fi

echo "── STUFE 53: Ein Produkt, eine Zahl (Zeitversprechen) ──"
# Befund 18.08.: Die Startseite versprach den fertigen Plan "in 5 Minuten" (Title, H1,
# JSON-LD, FAQ), 77 andere Seiten "in 10 Minuten" — dieselbe Leistung, zwei Zahlen.
# Bolle-Entscheidung 18.08.: 10 Minuten gilt, fuer Plan UND Schatzsuche.
# Die Stufe schreibt keine Zahl vor, sie verlangt nur, dass es genau eine gibt.
if python _dev/scripts/check-zeitversprechen.py && python _dev/scripts/check-zeitversprechen.py --gegenprobe > "$LOGDIR/zeit-gegenprobe.log" 2>&1; then
  green "Das Zeitversprechen widerspricht sich nirgends"
else
  # Beleg aus DIESEM Lauf, nicht aus der Datei: scheitert der erste Befehl, laeuft der
  # zweite nie, der Redirect passiert nie — und ein `cat` zeigte dann den vorigen Lauf.
  python _dev/scripts/check-zeitversprechen.py 2>&1 | grep -E "FAIL" | head -5
  python _dev/scripts/check-zeitversprechen.py --gegenprobe 2>&1 | tail -3
  red "Stufe 53: Zwei verschiedene Zeitversprechen fuer dieselbe Leistung"
fi

echo "── STUFE 54: Keine Quelle ohne Beleg, kein Beleg ohne Fundstelle ──"
# Befund 18.08. (externer SEO-/E-E-A-T-Audit): 691 gedruckte Sicherheitsaussagen auf den
# freien Seiten, null Quellenangaben. Der Quellen-Kasten schliesst das — und diese Stufe
# bewacht beide Richtungen: keine Seite nennt eine Quelle, deren Thema sie nicht beruehrt,
# und keine beruehrt ein belegtes Thema, ohne die Quelle zu nennen. Eine erfundene Quelle
# waere schlimmer als gar keine, weil sie Sicherheit vortaeuscht.
if python _dev/scripts/check-quellen.py && python _dev/scripts/check-quellen.py --gegenprobe > "$LOGDIR/quellen-gegenprobe.log" 2>&1; then
  green "Jede gedruckte Quelle ist gedeckt, jedes belegte Thema nennt sie"
else
  # Beleg aus DIESEM Lauf, nicht aus der Datei: scheitert der erste Befehl, laeuft der
  # zweite nie, der Redirect passiert nie — und ein `cat` zeigte dann den vorigen Lauf.
  python _dev/scripts/check-quellen.py 2>&1 | grep -E "FAIL" | head -5
  python _dev/scripts/check-quellen.py --gegenprobe 2>&1 | tail -3
  red "Stufe 54: Quellen-Kasten und Registry stimmen nicht ueberein"
fi

echo "── STUFE 58: Keine Provisionslinks ohne Kennzeichnung ──"
# Befund 18.08., selbst gebaut und selbst gefangen: einkauf-drucken.py hat sechs Seiten je
# 19 Affiliate-Links gegeben — auf Seiten, die vorher keine hatten — und die Kennzeichnung
# vergessen. Aufgefallen ist es durch eine Handpruefung, nicht durch ein Gate. Der erste
# Lauf dieser Stufe fand ausserdem drei ALTE Faelle (schatzsuche/baustelle, /pferde,
# /ritter), die niemand auf dem Zettel hatte. Genau die Sorte Fehler, die eine Maschine
# multipliziert: ein vergessener Satz im Generator, sechs Seiten ohne Hinweis.
if python _dev/scripts/check-werbekennzeichnung.py && python _dev/scripts/check-werbekennzeichnung.py --gegenprobe > "$LOGDIR/werbe-gegenprobe.log" 2>&1; then
  green "Jede Seite mit Partnerlinks kennzeichnet sie auch sichtbar"
else
  # Beleg aus DIESEM Lauf, nicht aus der Datei: scheitert der erste Befehl, laeuft der
  # zweite nie, der Redirect passiert nie — und ein `cat` zeigte dann den vorigen Lauf.
  python _dev/scripts/check-werbekennzeichnung.py 2>&1 | grep -E "FAIL" | head -5
  python _dev/scripts/check-werbekennzeichnung.py --gegenprobe 2>&1 | tail -3
  red "Stufe 58: Partnerlinks ohne sichtbare Werbekennzeichnung"
fi

echo "── STUFE 59: Die Einkaufsliste rechnet — und hoert nicht heimlich damit auf ──"
# Seit 19.08. leiten sich die Mengen aus der Gaesteliste ab. Das haengt an zwei Feldern
# (basisKinder je Variante, skaliert je Posten). Wer einen Posten ohne skaliert eintraegt,
# macht keinen sichtbaren Fehler: die Variante hoert einfach auf zu rechnen und das Blatt
# entschuldigt sich wieder ("Die Mengen unten sind fuer 8 Kinder gerechnet"). Genau der
# Satz, den 20 von 20 Testeltern als Kaufhindernis Nummer 1 nannten. Diese Stufe macht
# den lautlosen Rueckfall laut.
if python _dev/scripts/check-mengen.py && python _dev/scripts/check-mengen.py --gegenprobe > "$LOGDIR/mengen-gegenprobe.log" 2>&1; then
  green "Jede Menge leitet sich ab, keine Variante ist zurueckgefallen"
else
  python _dev/scripts/check-mengen.py 2>&1 | tail -6
  # Beleg aus DIESEM Lauf, nicht aus der Datei: scheitert der erste Befehl, laeuft der
  # zweite nie, der Redirect passiert nie — und ein `cat` zeigte dann den vorigen Lauf.
  python _dev/scripts/check-mengen.py --gegenprobe 2>&1 | tail -3
  red "Stufe 59: Mengenrechnung unvollstaendig oder zurueckgefallen"
fi

echo ""
echo "── STUFE 60: Die Gaesteseite rendert — und haelt ihre Zusagen ──"
# L14 (17.07.) machte den Render-Smoke nach jedem Worker-Template-Edit zur Pflicht: ein freier
# Bezeichner in einem Template-Literal ist syntaktisch gueltig, faellt in keinem Build auf und
# macht zur Laufzeit JEDE Gaesteseite zu einem 500er. Eine Pflicht an Disziplin ist keine Pflicht.
# Welle 3 (19.08.) brachte die zweite Klasse dazu: oeffentliche Versprechen ohne Deckung
# (Wunschliste ohne Wunschliste, Rohdatum neben formatiertem Datum, Adresse in der Spiel-URL).
if node _dev/scripts/check-partyseite-render.mjs && python _dev/scripts/check-partyseite-render-gegenprobe.py > "$LOGDIR/render-gegenprobe.log" 2>&1; then
  green "Alle Seitenvarianten rendern, Adress-Gating haelt, kein ungedecktes Versprechen"
else
  # AUSNAHME, mit Absicht: diese Gegenprobe rendert 340 Dokumente je eingebautem Defekt (39
  # davon) und braucht Minuten — ein Neulauf allein fuer den Beleg waere unverhaeltnismaessig.
  # Sie darf aus der Datei lesen, weil $LOGDIR je Lauf NEU angelegt wird: dort kann nichts
  # Altes und nichts Fremdes stehen. Bitte nicht mit den anderen "vereinheitlichen".
  tail -6 "$LOGDIR/render-gegenprobe.log" 2>/dev/null
  red "Stufe 60: Gaesteseite rendert nicht sauber, verspricht etwas ohne Deckung — oder die Gegenprobe schlaegt nicht mehr an"
fi

echo ""
echo "── STUFE 62: Die Motto-Seiten bleiben einander unaehnlich ──"
# Anlass (01.09.): 14 von 15 Motto-Seiten versprechen im Titel einen "Ablauf" und liefern ihn
# nicht. Der naheliegende Fix — einen Beispiel-Ablauf ergaenzen — ist genau der, der alles
# schlimmer machen KANN: generische Bloecke ("Ankommen, Begruessung") waeren auf allen 15 Seiten
# derselbe Text, aus einer Luecke wuerde ein Dublettenfeld. Diese Stufe friert den gemessenen
# Ausgangsstand ein (Eigenanteil 93-96 %, 6 geteilte Saetze) und laesst nur Ergaenzungen durch,
# die je Seite eigener Text sind. Sie prueft nicht, ob ein Text gut ist — nur, ob er neu ist.
if python _dev/scripts/check-motto-eigenanteil.py > "$LOGDIR/motto-eigenanteil.log" 2>&1; then
  green "Jede Motto-Seite traegt ihren eigenen Text (Eigenanteil >= 90 %)"
else
  tail -8 "$LOGDIR/motto-eigenanteil.log" 2>/dev/null
  red "Stufe 62: eine Motto-Seite hat Eigenanteil verloren — eine Ergaenzung, die alle Seiten gleich macht, ist keine Ergaenzung"
fi

echo ""
echo "── STUFE 63: Der Beispiel-Ablauf ist abgeleitet, nicht getippt ──"
# Anlass (01.09.): vier unabhaengige Gutachten zu vier Ablauf-Kaesten, vier Mal NO-GO. Kein
# einziger Befund war "schlecht geschrieben" — alle waren Widersprueche zum Rest derselben Seite:
# Zeiten gegen gedruckte Spannen, Summe gegen Ueberschrift, Altersgruppe verschwiegen (die Seiten
# haben einen Filter, der Karten ausblendet, den Kasten aber nicht) und Materialien, die die Seite
# fuer 3-5 verbietet. Alles vier ist entscheidbar, also faellt es hier auf und nicht erst im
# Gutachten. Was die Stufe NICHT sehen kann (Dramaturgie, Ton, Begruendung der Reihenfolge)
# bleibt Sache des unabhaengigen Reviews.
# `; _rc=$?` ist unter `set -e` toedlich: der nackte Befehl beendet bei Exit != 0 das
# GANZE Skript, und der Linter hoerte am 02.09. genau hier auf zu messen (Stufen 64-68
# liefen nicht mehr). Mit `|| _rc=$?` ist der Befehl Teil einer Liste und darf scheitern.
_rc63=0
node _dev/scripts/gen-ablauf.mjs --pruefe > "$LOGDIR/ablauf-repro.log" 2>&1 || _rc63=$?
if [ $_rc63 -eq 2 ]; then
  # Exit 2 = grau: es gab nichts zu pruefen. Das ist KEIN Erfolg, und es steht hier als
  # Warnung statt als Haekchen — sonst liest die naechste Session "Idempotenz bewiesen",
  # wo "nichts vorhanden" gemessen wurde.
  grep -E "GRAU|nicht gedeckt" "$LOGDIR/ablauf-repro.log" | head -3
  yellow "Stufe 63: nichts zu pruefen (0 erzeugte Ablauf-Kaesten) — ungeprueft, nicht bestanden"
elif [ $_rc63 -eq 0 ]; then
  green "Jeder Beispiel-Ablauf ist reproduzierbar aus data/motto/ (Idempotenz-Beweis)"
else
  tail -8 "$LOGDIR/ablauf-repro.log" 2>/dev/null
  red "Stufe 63: ein Ablauf ist nicht das, was die Daten ergeben — von Hand geaendert oder nach einer Datenaenderung nicht neu erzeugt"
fi

echo ""
echo "── STUFE 64: Die zwei Spielkataloge laufen nicht weiter auseinander ──"
# Historie (02.09. nachgeschlagen): generate-seo-pages.js erzeugte die Motto-Seiten am 25.03. aus
# Daten IM SKRIPT, wurde am 26.03. verwaist (Zielpfad existiert nicht, kein Build ruft ihn auf)
# und die Seiten wurden fuenf Monate von Hand gepflegt. Am 05.06. entstand data/motto/ NEU fuer
# den Wizard — mit eigenen Spielen, weil aus dem toten Generator nichts abzuleiten war. Das
# Ergebnis sind zwei Kataloge: 56 % der Spiele in data/motto haben auf ihrer Seite ueberhaupt
# keine Entsprechung. Diese Stufe entscheidet nichts, sie haelt den Stand fest.
if python _dev/scripts/check-katalog-deckung.py > "$LOGDIR/katalog-deckung.log" 2>&1; then
  green "$(grep -m1 'Deckung:' "$LOGDIR/katalog-deckung.log" | sed 's/^ *//')"
else
  tail -6 "$LOGDIR/katalog-deckung.log" 2>/dev/null
  red "Stufe 64: die Kataloge laufen weiter auseinander — siehe BACKLOG M-4"
fi

echo ""
echo "── STUFE 65: Listen im Code gegen die Wirklichkeit auf der Platte ──"
# Anlass (02.09.): paket/prinzessin/index.html liegt fertig im Repo (87.944 Bytes) und ist
# nicht freigeschaltet — sechs Eintraege in PAKET_MOTTOS, sieben Verzeichnisse. Keine der 64
# Stufen sah das, weil keine eine Liste gegen ein Verzeichnis hielt. Geprueft wird die KLASSE:
# drei Listen (Pakete, Spielkatalog, Motto-Daten) in BEIDE Richtungen. Bekannte, begruendete
# Luecken stehen namentlich im Skript und werden bei jedem Lauf mitgemeldet.
if python _dev/scripts/check-freischaltlisten.py && python _dev/scripts/check-freischaltlisten.py --gegenprobe > "$LOGDIR/freischalt-gegenprobe.log" 2>&1; then
  green "Jede Liste im Code deckt sich mit dem, was auf der Platte liegt"
else
  python _dev/scripts/check-freischaltlisten.py 2>&1 | grep -E "FAIL|BEKANNT" | head -6
  # Beleg aus DIESEM Lauf, nicht aus der Datei: scheitert der erste Befehl, laeuft der
  # zweite nie, der Redirect passiert nie — und ein `cat` zeigte dann den vorigen Lauf.
  python _dev/scripts/check-freischaltlisten.py --gegenprobe 2>&1 | tail -3
  red "Stufe 65: eine Liste im Code weicht von der Platte ab"
fi

echo ""
echo "── STUFE 66: Kein Skript schreibt ins Repo, das niemand mehr aufruft ──"
# Anlass (02.09., HERKUNFT.md): es gibt nicht zwei auseinandergelaufene Quellen, es gibt EIN
# Muster — einmal erzeugen, Generator liegenlassen, von Hand weiterpflegen — und es ist
# mindestens siebenmal passiert. Die Stufe entscheidet NICHTS ueber den Bestand; sie haelt
# fest, dass keine NEUE Waise dazukommt. Kategorie C ("unklar") wird ausdruecklich als
# Unwissen ausgewiesen und nicht als Erfolg gezaehlt.
if python _dev/scripts/check-waisen-generatoren.py && python _dev/scripts/check-waisen-generatoren.py --gegenprobe > "$LOGDIR/waisen-gegenprobe.log" 2>&1; then
  green "Keine neue Waise mit Schreibzugriff (Bestand unter Sperrklinke)"
else
  python _dev/scripts/check-waisen-generatoren.py 2>&1 | grep -E "FAIL|!" | head -6
  red "Stufe 66: eine neue Waise mit Schreibzugriff ist dazugekommen"
fi

echo ""
echo "── STUFE 67: Cache-Buster nicht aelter als die Datei ──"
# Die Stufe war beim Einbau eine Warnung, solange die vier bekannten Faelle offen waren:
# core.js?v=20260802 (Datei vom 27.08., 60 Referenzen), core.css?v=20260708 (12.07., 45),
# paket.css + paket-core.js ?v=20260804 (12.08., 9). Der schwerste davon: die 60 Spiele luden
# eine core.js von vor den fuenf gegateten Blocker-Fixes — wer die Seite schon einmal offen
# hatte, bekam die Blocker aus dem Browser-Cache zurueck. Am 02.09. alle 114 Referenzen
# gesetzt, das Datum je aus `git log` der Zieldatei statt getippt; danach Stufe 67 Exit 0.
# Damit ist die im Einbau vorgesehene Umstellung faellig: aus `yellow` wird `red`.
# Die Gegenprobe wurde hier zeitweise NICHT gerufen: ihre erste Fassung pruefte nur, ob
# ueberhaupt ein Datum aus git kommt (`"19700101" < stand`), nie die Vergleichsregel selbst.
# Ein `&& --gegenprobe` darauf haette wie ein Beweis ausgesehen und keiner sein koennen.
# Seit e30f5fdb teilen Lauf und Gegenprobe eine Entscheidungsfunktion und die Probe prueft
# drei Faelle (zu altes Datum -> veraltet, Aenderungsdatum -> in Ordnung, Zukunft -> in
# Ordnung). Deshalb wird sie hier wieder gerufen — im selben Zug, in dem sie versioniert ist.
if python _dev/scripts/check-cache-buster.py && python _dev/scripts/check-cache-buster.py --gegenprobe > "$LOGDIR/cache-buster-gegenprobe.log" 2>&1; then
  green "Jeder Cache-Buster ist mindestens so neu wie seine Datei"
else
  # Beleg aus DIESEM Lauf, nicht aus der Datei.
  python _dev/scripts/check-cache-buster.py 2>&1 | grep -E "FAIL|Fix:" | head -8
  python _dev/scripts/check-cache-buster.py --gegenprobe 2>&1 | tail -3
  red "Stufe 67: ein Cache-Buster ist aelter als seine Datei — Besucher mit Cache bekommen die alte Fassung"
fi

echo ""
echo "── STUFE 68: Gelesene Felder, die es in den Daten nicht gibt ──"
# WARNUNG mit Leseliste, nicht Fehler — bewusst. Der Wizard liest vieles optional; eine
# Regel, die auf alles anspringt, bringt bei, sie zu ignorieren. Belegter Anlass:
# kindergeburtstag.html:1896 liest `d.signature`, die 45 Datendateien tragen aber
# `signatureRitual` — der Fallback feuert immer und sieht dabei aus wie ein Default.
if python _dev/scripts/check-lesestellen.py --streng > "$LOGDIR/lesestellen.log" 2>&1; then
  green "Jedes gelesene Motto-Feld kommt in den Daten vor"
else
  grep -A20 "LESELISTE" "$LOGDIR/lesestellen.log" | head -12
  yellow "Stufe 68: gelesene Felder ohne Datenquelle — je Eintrag entscheiden (tot oder optional)"
fi

echo ""
echo "── STUFE 69: Kein Pruefauftrag ohne das Gedaechtnis der letzten Runden ──"
# Anlass (02.09.): ein Gutachten meldete "Creator kennt nur 10 Mottos, Ritter fehlt" — live
# sind es 15, und genau dieser Fehlalarm steht seit dem 13.07. als F8 WIDERLEGT in
# _dev/OFFENE-REVIEW-PUNKTE.md. Die Datei war im Prompt nur nicht erwaehnt. Eine ganze Runde
# fuer eine Frage, die vor sieben Wochen beantwortet war. Sperrklinke auf dem Bestand (3),
# damit die Regel niemanden Aufraeumarbeit kostet und trotzdem jeden neuen Auftrag faengt.
if python _dev/scripts/check-pruefauftrag-gedaechtnis.py && python _dev/scripts/check-pruefauftrag-gedaechtnis.py --gegenprobe > "$LOGDIR/auftrag-gegenprobe.log" 2>&1; then
  green "Jeder neue Pruefauftrag nennt die False-Positive-Liste"
else
  python _dev/scripts/check-pruefauftrag-gedaechtnis.py 2>&1 | grep -E "FAIL|ohne Gedaechtnis" | head -5
  red "Stufe 69: ein Pruefauftrag schickt den Gutachter gegen bereits verworfene Befunde"
fi

echo ""
echo "── STUFE 70: Der Linter ruft nichts auf, das es im Repo nicht gibt ──"
# Anlass (02.09.): dieser Linter wurde committet, waehrend zwei der von ihm gerufenen
# Pruefskripte nur untracked im gemeinsamen Arbeitsbaum lagen. Lokal lief alles gruen; auf
# einem frischen Klon waere Stufe 69 rot geworden — mit der Meldung, ein Pruefauftrag
# schicke den Gutachter gegen verworfene Befunde. Inhaltlich Unsinn: in Wahrheit fehlte nur
# die Datei. Eine Stufe, die aus dem falschen Grund rot wird, ist schlimmer als eine, die
# schweigt — sie schickt jeden an die falsche Stelle.
if python _dev/scripts/check-linter-aufrufe.py && python _dev/scripts/check-linter-aufrufe.py --gegenprobe > "$LOGDIR/linter-aufrufe-gegenprobe.log" 2>&1; then
  green "Jedes aufgerufene Pruefskript ist versioniert"
else
  # Beleg aus DIESEM Lauf, nicht aus der Datei (s. LOGDIR-Kommentar oben).
  python _dev/scripts/check-linter-aufrufe.py 2>&1 | grep -E "FAIL" | head -5
  python _dev/scripts/check-linter-aufrufe.py --gegenprobe 2>&1 | tail -3
  red "Stufe 70: der Linter ruft ein Skript auf, das nicht im Repo liegt — auf einem frischen Klon laeuft er nicht durch"
fi

echo ""
echo "── STUFE 71: Jedes Vorschaubild, auf das eine Seite zeigt, liegt auch im Repo ──"
# Anlass (03.09.): 21 Bilddateien wurden in 51 Zeilen auf 29 Seiten referenziert, ohne zu
# existieren — in og:image, twitter:image und JSON-LD image/publisher.logo. Ein 404 dort
# faellt niemandem auf, der die Seite besucht; er faellt dem auf, der sie TEILT, und der
# bekommt dann gar keine Vorschaukarte. Eine engere erste Messung ueber JSON-LD allein sah
# nur 5 der 21 — die Meta-Tags fehlten im Muster (LEKTIONEN L38, zu schmales Muster meldet
# eine Null). Die Stufe hat deshalb drei Arme: Phantom, sauberer Fall, und den echten
# Vorher-Stand aus e26b93c2^ als Korpus — sie muss dort alle 21 wiederfinden.
if python _dev/scripts/check-vorschaubilder.py && python _dev/scripts/check-vorschaubilder.py --gegenprobe > "$LOGDIR/vorschaubilder-gegenprobe.log" 2>&1; then
  green "Jedes referenzierte Vorschaubild liegt im Repo"
else
  # Beleg aus DIESEM Lauf, nicht aus der Datei.
  python _dev/scripts/check-vorschaubilder.py 2>&1 | grep -E "FAIL" | head -6
  python _dev/scripts/check-vorschaubilder.py --gegenprobe 2>&1 | tail -4
  red "Stufe 71: eine Seite zeigt auf ein Vorschaubild, das es nicht gibt — geteilte Links haetten keine Karte"
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
