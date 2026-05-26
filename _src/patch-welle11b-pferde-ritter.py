#!/usr/bin/env python3
"""Welle 11b: Konsistenz-Sweep Pferde + Ritter."""
import json
from pathlib import Path
JD = Path(__file__).resolve().parent.parent / "_src" / "elite-motto-data"

# ─── PFERDE ────────────────────────────────────────
d = json.load(open(JD/"pferde-gross.json",encoding="utf-8"))

# In Welle 5 wurden Stallmeister Tom, Tierärztin Hanna, Diagnostikerin Anna aus rolesList entfernt.
# Aber variants/games/bonusGames nennen sie noch. Konsolidieren auf neue Karten-Liste:
# - Tom-Aufgaben → Reitlehrerin Mia (passt zu Reit-Themen) oder Quizmaster Lina
# - Tierärztin Hanna → Pflege-Chefin Hanna (gleicher Vorname, neuer Titel)
# - Diagnostikerin Anna → "Pflege-Chefin Hanna" (passt zu Krankheits-Wissen)

# Targeted replacements:
replacements = [
    ("Stallmeister Tom erklärt", "Quizmaster Lina erklärt"),
    ("Stallmeister Tom:", "Quizmaster Lina:"),
    ("Tierärztin Hanna gibt Note", "Pflege-Chefin Hanna gibt Note"),
    ("Tierärztin Hanna bewertet", "Pflege-Chefin Hanna bewertet"),
    ("Tierärztin Hanna", "Pflege-Chefin Hanna"),
    ("Diagnostikerin Anna", "Pflege-Chefin Hanna"),
]
def walk(obj, reps):
    if isinstance(obj, str):
        s = obj
        for old, new in reps:
            s = s.replace(old, new)
        return s
    elif isinstance(obj, dict):
        return {k: walk(v, reps) for k,v in obj.items()}
    elif isinstance(obj, list):
        return [walk(x, reps) for x in obj]
    return obj

d = walk(d, replacements)
d["_meta"]["version"] = "2.6.0"
d["_meta"]["lastUpdated"] = "2026-05-26"
d["_meta"]["qualityNote"] = (
    "v2.6 — Welle 11b Konsistenz-Sweep: Stallmeister Tom (Welle-5-Removed) → Quizmaster Lina. "
    "Tierärztin Hanna → Pflege-Chefin Hanna (gleicher Vorname, korrekter Titel aus rolesList). "
    "Diagnostikerin Anna → Pflege-Chefin Hanna (Krankheits-Wissen passt). "
    "Variants/games/bonusGames jetzt vollständig konsistent mit rolesList."
)
json.dump(d, open(JD/"pferde-gross.json","w",encoding="utf-8"), ensure_ascii=False, indent=2)
print("pferde-gross.json v2.6.0 — Konsistenz-Sweep")

# Sanity check
s = json.dumps(d, ensure_ascii=False)
for old, _ in replacements:
    c = s.count(old)
    if c: print(f"  STILL: {old} ({c}x)")

# ─── RITTER ────────────────────────────────────────
d = json.load(open(JD/"ritter-gross.json",encoding="utf-8"))

# "Burgvogtin" als Bewertende → "Wappen-Heroldin Hanna" (sie bewertet Wappen in der Karten-Liste)
# "Stallmeister-Tafel" Cross-Motto-Leak → "Akademie-Tafel"
ritter_reps = [
    ("Burgvogtin gibt Stilnote", "Wappen-Heroldin Hanna gibt Stilnote"),
    ("Burgvogtin bewertet", "Wappen-Heroldin Hanna bewertet"),
    ("Burgvogtin", "Wappen-Heroldin"),  # Verbleibende Vorkommen
    ("Stallmeister-Tafel", "Akademie-Tafel"),
]
d = walk(d, ritter_reps)
d["_meta"]["version"] = "2.6.0"
d["_meta"]["lastUpdated"] = "2026-05-26"
d["_meta"]["qualityNote"] = (
    "v2.6 — Welle 11b Konsistenz-Sweep: 'Burgvogtin' (Story-Person, in Welle 5 aus rolesList "
    "entfernt) → 'Wappen-Heroldin Hanna' (passt zur Wappen-Bewertung). "
    "'Stallmeister-Tafel' (Cross-Motto-Leak von Pferde) → 'Akademie-Tafel' (korrektes Brand). "
    "Variants/games jetzt vollständig konsistent."
)
json.dump(d, open(JD/"ritter-gross.json","w",encoding="utf-8"), ensure_ascii=False, indent=2)
print("ritter-gross.json v2.6.0 — Konsistenz-Sweep")

s = json.dumps(d, ensure_ascii=False)
for old, _ in ritter_reps:
    c = s.count(old)
    if c: print(f"  STILL: {old} ({c}x)")
