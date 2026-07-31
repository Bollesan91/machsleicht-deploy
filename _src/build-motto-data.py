#!/usr/bin/env python3
"""
Phase 1 — Datenschicht fuer den Wizard.
Liest die 39 Elite-Motto-JSONs aus _src/elite-motto-data/,
normalisiert ALLE Amazon-Affiliate-Tags auf 'machsleicht21-21'
(Quelle traegt faelschlich 'machsleicht-21'), und schreibt
minifizierte, servable JSONs nach /data/motto/<motto>-<age>.json.

Nachvollziehbar + idempotent. Aufruf:  python3 _src/build-motto-data.py

########################################################################
# ⛔ NICHT MEHR AUSFUEHREN — der Build ist ueberholt (Befund 31.07.2026)
#
# data/motto/ ist seit den Spiele-Merge-Wellen (PBI #34/#37/#41) HANDGEPFLEGT
# und damit die Wahrheit; _src/elite-motto-data/ ist der alte Stand von Mai.
# Ein Lauf dieses Skripts ueberschreibt die kuratierten Dateien mit dem
# Altstand — nachgemessen an piraten:
#     Spiele je Variante   data/motto: [4,5,6]   ->   Build-Ausgabe: [2,5,4]
#     Schema              neu (variants/games)   ->   alt (schedule/time/description)
# und alle 39 Motto-Dateien werden angefasst, nicht nur die bearbeiteten.
#
# Wer die Pipeline wiederbeleben will, muss ZUERST _src/elite-motto-data/ aus
# data/motto/ zurueckspielen (Rueckwaerts-Migration) und das Ergebnis gaten.
# Bis dahin: Aenderungen direkt in data/motto/ (validate-all.sh prueft sie).
########################################################################
"""
import sys as _sys
print("ABBRUCH: build-motto-data.py ist ueberholt — es wuerde die handgepflegten\n"
      "data/motto/-Dateien mit dem Mai-Stand ueberschreiben (siehe Kopfkommentar).\n"
      "Bewusst trotzdem laufen lassen?  python _src/build-motto-data.py --ich-weiss-was-ich-tue",
      file=_sys.stderr)
if "--ich-weiss-was-ich-tue" not in _sys.argv:
    raise SystemExit(2)
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
