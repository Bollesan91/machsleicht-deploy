#!/usr/bin/env python3
"""
P1-20: Interne Links pro Motto zählen.

Zählt, wie oft jedes Motto aus anderen Seiten im Repo verlinkt wird.
Normalisiert auf den Motto-Namen (Dino-3-Jahre, Dino-6-8-Jahre etc. zählen alle als "dino").
"""
import re
from pathlib import Path
from collections import defaultdict

REPO = Path(__file__).parent.parent

# 10 Tool-Mottos + 8 Marken-Mottos + 4 Content-Inseln
MOTTOS = {
    "tool": [
        "piraten", "safari", "dino", "weltraum", "feuerwehr",
        "einhorn", "meerjungfrau", "detektiv", "prinzessin", "superheld",
    ],
    "marke": [
        "ninjago", "harry-potter", "minecraft", "super-mario",
        "pokemon", "spider-man", "paw-patrol", "frozen",
    ],
    "insel": [
        "ritter", "zirkus", "pferde", "baustelle",
    ],
}

# Flach alle Mottos
ALL_MOTTOS = [m for cat in MOTTOS.values() for m in cat]
MOTTO_CAT = {m: cat for cat, ms in MOTTOS.items() for m in ms}

# Regex: href auf irgendeine Motto-Seite oder Anker auf Motto-Karte
# Beispiele, die zählen sollen:
#   href="/kindergeburtstag/dino.html"
#   href="/kindergeburtstag/dino-6-jahre.html"
#   href="/kindergeburtstag/dino-6-8-jahre"
#   href="/kindergeburtstag/dino-forscherpass.html" (Tool-Seite, zählt für dino)
#   href="kindergeburtstag/dino.html"
#   href="./dino-6-jahre.html" (innerhalb /kindergeburtstag/)
HREF_RE = re.compile(r'href="([^"#?]*)', re.IGNORECASE)

def motto_from_path(path: str):
    """Extrahiert das Motto aus einem href-Pfad, oder None."""
    # Normalize: Slashes trennen, letztes Segment
    path = path.strip().lower()
    if not path:
        return None
    # Nur Kindergeburtstag-Seiten
    if "kindergeburtstag/" not in path and not path.startswith("kindergeburtstag/"):
        # Check auch relative Links innerhalb /kindergeburtstag/
        pass
    # Letztes Segment holen
    segment = path.rsplit("/", 1)[-1]
    segment = segment.replace(".html", "")
    # Leer oder Index/Hub → nicht zählen
    if not segment or segment in ("index", "kindergeburtstag"):
        return None

    # Gegen alle Mottos matchen (längste zuerst, damit "super-mario" vor "super" matcht)
    for motto in sorted(ALL_MOTTOS, key=len, reverse=True):
        # Motto-Hub: exact "dino" oder "dino-3-5-jahre" oder "dino-forscherpass"
        if segment == motto or segment.startswith(motto + "-"):
            return motto
    return None

def page_in_kindergeburtstag(path: str) -> bool:
    """Ist der Pfad eine Motto-Page in /kindergeburtstag/?"""
    return "kindergeburtstag/" in path and path.rsplit("/", 1)[-1] not in ("", "index.html")

# Sammle alle HTML-Seiten (außer /_dev, /_build, /_src, /netlify)
SKIP_DIRS = {"_dev", "_build", "_src", "netlify", "node_modules", ".git"}

html_files = []
for p in REPO.rglob("*.html"):
    parts = p.relative_to(REPO).parts
    if any(skip in parts for skip in SKIP_DIRS):
        continue
    html_files.append(p)

print(f"Durchsuche {len(html_files)} HTML-Seiten nach Motto-Links...\n")

# Für jedes Motto: Zähle (a) Anzahl eingehender Links und (b) Anzahl verlinkender Seiten
motto_links = defaultdict(int)          # Gesamtzahl Links
motto_source_pages = defaultdict(set)   # Eindeutige verlinkende Seiten

for src_file in html_files:
    rel = src_file.relative_to(REPO).as_posix()
    # Eigene Motto-Page soll sich nicht selbst zählen
    own_motto = None
    if "kindergeburtstag/" in rel:
        own_motto = motto_from_path(rel)

    try:
        content = src_file.read_text(encoding="utf-8", errors="ignore")
    except Exception:
        continue

    # Finde alle hrefs
    for m in HREF_RE.finditer(content):
        href = m.group(1)
        motto = motto_from_path(href)
        if motto is None:
            continue
        if motto == own_motto:
            continue  # Selbstverlinkung zählt nicht
        motto_links[motto] += 1
        motto_source_pages[motto].add(rel)

# Ergebnis-Tabelle
print(f"{'Motto':20s} {'Links':>8s} {'Quellen':>9s} {'Kategorie':>10s}")
print("-" * 52)
for cat_name in ["tool", "marke", "insel"]:
    # Innerhalb Kategorie: nach Link-Anzahl absteigend
    mottos_in_cat = sorted(MOTTOS[cat_name], key=lambda m: -motto_links[m])
    for motto in mottos_in_cat:
        print(f"{motto:20s} {motto_links[motto]:>8d} {len(motto_source_pages[motto]):>9d} {cat_name:>10s}")
    print()

# Für Prinzessin und Superheld: Detaillierte Quell-Liste
print("\n=== Detail: Wer verlinkt Prinzessin? ===")
for src in sorted(motto_source_pages["prinzessin"]):
    print(f"  {src}")
print(f"  TOTAL: {len(motto_source_pages['prinzessin'])} Quellen, {motto_links['prinzessin']} Links")

print("\n=== Detail: Wer verlinkt Superheld? ===")
for src in sorted(motto_source_pages["superheld"]):
    print(f"  {src}")
print(f"  TOTAL: {len(motto_source_pages['superheld'])} Quellen, {motto_links['superheld']} Links")

print("\n=== Referenz: Wer verlinkt Meerjungfrau? (Ziel-Niveau 40+) ===")
for src in sorted(list(motto_source_pages["meerjungfrau"])[:15]):
    print(f"  {src}")
print(f"  ... (gekürzt auf 15)")
print(f"  TOTAL: {len(motto_source_pages['meerjungfrau'])} Quellen, {motto_links['meerjungfrau']} Links")
