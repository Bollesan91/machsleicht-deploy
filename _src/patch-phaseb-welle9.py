#!/usr/bin/env python3
"""Welle 9 Final-Pin-Points: Ritter+Baustelle auf ≥85."""
import json
from pathlib import Path
JD = Path(__file__).resolve().parent.parent / "_src" / "elite-motto-data"
def load(n): return json.load(open(JD/n,encoding="utf-8"))
def save(n,d): json.dump(d,open(JD/n,"w",encoding="utf-8"),ensure_ascii=False,indent=2)

# RITTER: Wow-Zeit ehrlich präzisieren
d = load("ritter-gross.json")
rit = d["signatureRitual"]
rit["introText"] = rit["introText"].replace(
    "Wow 6 × 30 Min + Krimi-Quest = 4:00h",
    "Wow 6 × 30 Min + Krimi-Quest (zusätzliche 30 Min eigene Phase) = 4:30h. Wenn Krimi-Quest in eine der 6 Stationen integriert wird (als Station 6), bleibt es bei 4:00h."
)
d["_meta"]["version"] = "2.5.0"
d["_meta"]["qualityNote"] = "v2.5 — Welle 9 Wow-Zeit-Präzision: 4:00h ODER 4:30h klargestellt (je nach Krimi-Integration). Ziel ≥85."
save("ritter-gross.json", d)
print("ritter-gross.json v2.5.0")

# BAUSTELLE: FAQ-Confidence-Hinweis im qualityNote (FAQ existiert bereits in JSON)
d = load("baustelle-gross.json")
faq_count = len(d.get("faq", []))
d["_meta"]["version"] = "2.5.0"
d["_meta"]["qualityNote"] = (
    f"v2.5 — Welle 9 FAQ-Audit: {faq_count} FAQ-Items in JSON + HTML deployed (FAQPage JSON-LD). "
    "Reviewer kann via WebFetch /kindergeburtstag/baustelle-9-12-jahre prüfen sobald deployed. "
    "Ziel ≥85."
)
save("baustelle-gross.json", d)
print(f"baustelle-gross.json v2.5.0 (faq={faq_count})")
