#!/usr/bin/env python3
"""
fix-jsonld-quotes.py — repariert ungültige JSON-LD durch falsch geschriebene
deutsche Anführungszeichen: Öffnung „ (U+201E) korrekt, Schließung aber als
ASCII-" (U+0022) -> beendet den JSON-String vorzeitig -> invalides JSON-LD.

Fix NUR innerhalb von <script type="application/ld+json">-Blöcken (sichtbare
Prosa bleibt unberührt). Ersetzt den ASCII-Schließer eines „...-Zitats durch
das deutsche Schließzeichen " (U+201C). Schreibt eine Datei NUR, wenn danach
ALLE ihre JSON-LD-Blöcke valide parsen (assert-before-write).
"""
import re, json, sys, os
try: sys.stdout.reconfigure(encoding='utf-8')
except Exception: pass

OPEN = "„"   # „
CLOSE = "“"  # "
RCLOSE = "”" # "
BLOCK_RE = re.compile(r'(<script[^>]*type=["\']application/ld\+json["\'][^>]*>)(.*?)(</script>)', re.S | re.I)
# Variante A: Literal-„ + (keine Anführungszeichen) + ASCII "  ->  „...“
FIX_RE = re.compile(OPEN + r'([^' + OPEN + CLOSE + RCLOSE + r'"]*)"')
# Variante B: escaptes „ + Inhalt + ASCII "  ->  „...“
FIX_RE_ESC = re.compile(r'\\u201e([^"]*?)"')

def fix_block(content):
    content = FIX_RE.sub(OPEN + r'\1' + CLOSE, content)
    content = FIX_RE_ESC.sub(r'\\u201e\1\\u201c', content)
    return content

def main(files):
    total_fixed = 0
    for fn in files:
        if not os.path.isfile(fn):
            print(f"  SKIP (fehlt): {fn}"); continue
        html = open(fn, encoding='utf-8').read()
        blocks = BLOCK_RE.findall(html)
        broken_before = sum(1 for _,c,_ in blocks if not _parses(c))
        if broken_before == 0:
            print(f"  OK (nichts zu tun): {fn}"); continue
        new_html = html
        repl_count = 0
        for open_t, content, close_t in blocks:
            if _parses(content):
                continue
            fixed = fix_block(content)
            if not _parses(fixed):
                print(f"  ✗ NICHT vollständig reparabel, NICHT geschrieben: {fn}")
                _show(content)
                break
            repl_count += content.count('"') - fixed.count('"')
            new_html = new_html.replace(open_t + content + close_t, open_t + fixed + close_t, 1)
        else:
            # alle Blöcke ok -> verifizieren + schreiben
            ok = all(_parses(c) for _,c,_ in BLOCK_RE.findall(new_html))
            if ok:
                open(fn, 'w', encoding='utf-8').write(new_html)
                print(f"  ✓ FIX ({repl_count} Zeichen): {fn}")
                total_fixed += 1
            else:
                print(f"  ✗ Nach-Validierung fehlgeschlagen, NICHT geschrieben: {fn}")
    print(f"\nDateien repariert: {total_fixed}/{len(files)}")

def _parses(s):
    try: json.loads(s); return True
    except Exception: return False

def _show(content):
    for b in [content]:
        try: json.loads(b)
        except Exception as e:
            pos = getattr(e,'pos',0)
            print(f"     Rest-Fehler: {e} | ...{b[max(0,pos-40):pos+15]!r}...")

if __name__ == '__main__':
    main(sys.argv[1:])
