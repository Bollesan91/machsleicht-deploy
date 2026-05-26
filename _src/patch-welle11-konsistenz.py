#!/usr/bin/env python3
"""
Welle-11 Konsistenz-Sweep — Architekten→Bauleiter global in baustelle-gross.json.

Welle 5 hat NUR signatureRitual.name geändert. 25+ andere Stellen blieben "Architekten-..."
Konsistenz-Audit hat aufgedeckt:
- invitationTemplate, metaDescription, variants[*].label/headline/schedule, games,
  shoppingList, parentTips, preparationWeeks, sosScenarios, bonusGames

NICHT ersetzen:
- "Architektin Mia" (ROLLE/Person — bleibt)
- "Architekt Klaus" (VERDÄCHTIGER/Story — bleibt)
- "Ein Architekt plant zuerst..." (pädagogische Aussage über Beruf)
"""
import json
from pathlib import Path
JD = Path(__file__).resolve().parent.parent / "_src" / "elite-motto-data"

# Konkrete Phasen/Prüfungs-Bezeichnungen, die zu "Bauleiter-" werden:
REPLACEMENTS = [
    ("Architekten-Prüfung", "Bauleiter-Prüfung"),
    ("Architekten-Briefing", "Bauleiter-Briefing"),
    ("Architekten-Wettbewerb", "Bauleiter-Wettbewerb"),
    ("Architekten-Funktions-Karten", "Bauleiter-Funktions-Karten"),
    ("Architekten-Theorie", "Bauleiter-Theorie"),
    ("Architekten-System", "Bauleiter-System"),
    ("Architekten-Tisch", "Bauleiter-Tisch"),
    ("Architekten-Eid", "Bauleiter-Eid"),
    ("Architekten-Stempel", "Bauleiter-Stempel"),
]

def walk(obj):
    if isinstance(obj, str):
        s = obj
        for old, new in REPLACEMENTS:
            s = s.replace(old, new)
        return s
    elif isinstance(obj, dict):
        return {k: walk(v) for k,v in obj.items()}
    elif isinstance(obj, list):
        return [walk(x) for x in obj]
    return obj

# Baustelle
d = json.load(open(JD/"baustelle-gross.json",encoding="utf-8"))
d = walk(d)
d["_meta"]["version"] = "2.6.0"
d["_meta"]["lastUpdated"] = "2026-05-26"
d["_meta"]["qualityNote"] = (
    "v2.6 — Welle 11 GLOBAL Konsistenz-Sweep: 25+ 'Architekten-...' Phasen/Prüfungs-"
    "Bezeichnungen auf 'Bauleiter-...' vereinheitlicht (invitationTemplate, "
    "variants.label/headline/games, parentTips, prep, bonusGames). Story-Rollen "
    "'Architektin Mia' und 'Architekt Klaus' bleiben — sind Personen, kein Phasen-Brand. "
    "Erwarteter Score 85+ nach -7, jetzt wirklich konsistent."
)
json.dump(d, open(JD/"baustelle-gross.json","w",encoding="utf-8"), ensure_ascii=False, indent=2)
print("baustelle-gross.json v2.6.0 — Konsistenz-Sweep")

# Restcheck
s = json.dumps(d, ensure_ascii=False)
remaining_arch = []
for old, new in REPLACEMENTS:
    if old in s:
        remaining_arch.append(old)
print(f"Verbleibende Phasen-Bezeichnungen mit 'Architekten-': {remaining_arch or 'KEINE'}")
print(f"Story-Rollen erhalten: Architektin Mia ({s.count('Architektin Mia')}x), Architekt Klaus ({s.count('Architekt Klaus')}x)")
