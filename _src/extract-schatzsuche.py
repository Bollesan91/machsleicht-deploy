#!/usr/bin/env python3
"""
Phase 4 — Schatzsuche-Datenschicht.
Extrahiert SZ_THEMES aus dem gebauten Bundle js/kindergeburtstag.js
(dort JSON-quoted) und schreibt sie als /data/schatzsuche.json.
Nachvollziehbar + verifizierbar. Aufruf: python3 _src/extract-schatzsuche.py
"""
import json, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC  = os.path.join(ROOT, "js", "kindergeburtstag.js")
OUT  = os.path.join(ROOT, "data", "schatzsuche.json")

s = open(SRC, encoding="utf-8").read()
marker = "SZ_THEMES"
i = s.find(marker)
if i < 0:
    print("SZ_THEMES nicht gefunden"); sys.exit(1)
# Erstes '[' nach dem Marker finden, dann balanciert bis zum passenden ']'
start = s.find("[", i)
depth = 0; end = -1; in_str = False; esc = False
for j in range(start, len(s)):
    c = s[j]
    if in_str:
        if esc: esc = False
        elif c == "\\": esc = True
        elif c == '"': in_str = False
    else:
        if c == '"': in_str = True
        elif c == "[": depth += 1
        elif c == "]":
            depth -= 1
            if depth == 0: end = j + 1; break
if end < 0:
    print("Kein balanciertes Array gefunden"); sys.exit(1)

literal = s[start:end]
data = json.loads(literal)  # Bundle ist JSON-quoted -> direkt parsebar

os.makedirs(os.path.dirname(OUT), exist_ok=True)
with open(OUT, "w", encoding="utf-8") as fh:
    json.dump(data, fh, ensure_ascii=False, separators=(",", ":"))

# Verifikation
themes = [t.get("id") for t in data]
sizes_ok = all(isinstance(t.get("stations"), dict) and {"klein","mittel","gross"} <= set(t["stations"].keys()) for t in data if "stations" in t)
total_stations = sum(len(v) for t in data for v in (t.get("stations") or {}).values())
nbytes = os.path.getsize(OUT)
print(f"Themen: {len(data)} -> {themes}")
print(f"stations klein/mittel/gross je Theme vollstaendig: {sizes_ok}")
print(f"Stationen gesamt: {total_stations} | Datei: {nbytes//1024} KB")
sys.exit(0 if len(data) >= 4 else 1)
