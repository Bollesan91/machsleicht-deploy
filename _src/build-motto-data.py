#!/usr/bin/env python3
"""
Phase 1 — Datenschicht fuer den Wizard.
Liest die 39 Elite-Motto-JSONs aus _src/elite-motto-data/,
normalisiert ALLE Amazon-Affiliate-Tags auf 'machsleicht21-21'
(Quelle traegt faelschlich 'machsleicht-21'), und schreibt
minifizierte, servable JSONs nach /data/motto/<motto>-<age>.json.

Nachvollziehbar + idempotent. Aufruf:  python3 _src/build-motto-data.py
"""
import json, glob, os, collections, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC  = os.path.join(ROOT, "_src", "elite-motto-data")
OUT  = os.path.join(ROOT, "data", "motto")
GOOD = "machsleicht21-21"
BAD  = "machsleicht-21"

os.makedirs(OUT, exist_ok=True)

def fix_url(u):
    if not isinstance(u, str) or not u:
        return u
    # 1) falschen Tag korrigieren
    u = u.replace("tag=" + BAD, "tag=" + GOOD)
    # 2) Amazon-Links ohne jeden Tag bekommen den richtigen
    if "amazon." in u and "tag=" not in u:
        u += ("&" if "?" in u else "?") + "tag=" + GOOD
    return u

def walk(o):
    if isinstance(o, dict):
        return {k: (fix_url(v) if (k == "url") else walk(v)) for k, v in o.items()}
    if isinstance(o, list):
        return [walk(x) for x in o]
    if isinstance(o, str):
        # Affiliate-Links koennen auch in Freitext stehen (z.B. materialNote)
        return o.replace("tag=" + BAD, "tag=" + GOOD)
    return o

written = 0
for f in sorted(glob.glob(os.path.join(SRC, "*.json"))):
    name = os.path.basename(f)
    with open(f, encoding="utf-8") as fh:
        data = json.load(fh)
    data = walk(data)
    with open(os.path.join(OUT, name), "w", encoding="utf-8") as fh:
        json.dump(data, fh, ensure_ascii=False, separators=(",", ":"))
    written += 1

# Verifikation
c = collections.Counter()
total_bytes = 0
for f in glob.glob(os.path.join(OUT, "*.json")):
    s = open(f, encoding="utf-8").read()
    total_bytes += len(s.encode("utf-8"))
    c["bad_tag"]  += s.count("tag=" + BAD)
    c["good_tag"] += s.count("tag=" + GOOD)
    try:
        json.loads(s)
    except Exception as e:
        c["invalid_json"] += 1
        print("INVALID:", f, e)

print(f"geschrieben: {written} Dateien nach /data/motto/")
print(f"groesse gesamt: {total_bytes//1024} KB")
print(f"falsche Tags uebrig: {c['bad_tag']}  |  korrekte Tags: {c['good_tag']}  |  kaputte JSON: {c['invalid_json']}")
sys.exit(0 if c["bad_tag"] == 0 and c["invalid_json"] == 0 and written == 39 else 1)
