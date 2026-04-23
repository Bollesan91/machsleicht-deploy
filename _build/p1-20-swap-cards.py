#!/usr/bin/env python3
"""
P1-20 v2: Internal-Linking-Fix für Prinzessin und Superheld.

v2-Änderung gegenüber v1:
- KEIN Tausch von Marken-Mottos (harry-potter, minecraft, etc.) mehr.
  Grund: Marken-Mottos stehen unter P1-21 zur Kill-Entscheidung im Mai — 
  bis dahin sollen ihre Link-Profile unverändert bleiben.
- Nur Fallback-Tausch: Ersetze die schwächste thematisch passende Karte
  in thematisch passenden Cluster-Seiten.

Strategie:
1. Prinzessin-Cluster (einhorn, meerjungfrau, frozen, pferde, zirkus, harry-potter):
   Auf jeder dieser Seiten: tausche die thematisch schwächste Card gegen Prinzessin.
2. Superheld-Cluster (feuerwehr, ninjago, spider-man, paw-patrol, detektiv, piraten):
   Analog für Superheld.

Fallback-Tausch-Prio pro Cluster:
- In Prinzessin-Cluster-Seiten tausche zuerst "feuerwehr" raus (passt nicht magisch),
  dann "piraten", dann "dino", dann "safari", dann "weltraum", dann "detektiv".
- In Superheld-Cluster-Seiten: zuerst "einhorn", "meerjungfrau", "safari",
  "dino", "weltraum", "feuerwehr".

Dry-Run standardmäßig. Mit --apply tatsächliche Änderung.
"""
import re
import sys
from pathlib import Path

REPO = Path(__file__).parent.parent
PAGES_DIR = REPO / "kindergeburtstag"

PRINZESSIN_CLUSTER = {"einhorn", "meerjungfrau", "frozen", "harry-potter", "pferde", "zirkus"}
SUPERHELD_CLUSTER = {"feuerwehr", "ninjago", "spider-man", "paw-patrol", "detektiv", "piraten"}

# Tausch-Prio (was rauskann): Nur Tool-Mottos + Content-Inseln, keine Marken
PRINZESSIN_FALLBACK = ["feuerwehr", "piraten", "dino", "safari", "weltraum", "detektiv"]
SUPERHELD_FALLBACK = ["einhorn", "meerjungfrau", "safari", "dino", "weltraum", "feuerwehr"]

PRINZESSIN_CARD = '''<a href="/kindergeburtstag/prinzessin" class="u-link">
        <div class="card u-emoji-cell">
          <span class="u-fs28">👑</span>
          <p class="u-emoji-label">Prinzessinnen-Party</p>
          <span class="u-fs12 u-clr-m">3–12 Jahre</span>
        </div>
      </a>'''

SUPERHELD_CARD = '''<a href="/kindergeburtstag/superheld" class="u-link">
        <div class="card u-emoji-cell">
          <span class="u-fs28">🦸</span>
          <p class="u-emoji-label">Superhelden-Mission</p>
          <span class="u-fs12 u-clr-m">3–12 Jahre</span>
        </div>
      </a>'''

def card_pattern(motto_slug: str) -> re.Pattern:
    """Pattern, das eine Card zu einem Motto matcht."""
    safe = re.escape(motto_slug)
    return re.compile(
        r'<a href="/kindergeburtstag/' + safe + r'(?:-[^"]*)?"\s+class="u-link">\s*'
        r'<div class="card u-emoji-cell">\s*'
        r'<span class="u-fs28">[^<]+</span>\s*'
        r'<p class="u-emoji-label">[^<]+</p>\s*'
        r'(?:<span class="u-fs12 u-clr-m">[^<]+</span>\s*)?'
        r'</div>\s*'
        r'</a>',
        re.DOTALL
    )

def page_motto(filename: str) -> str:
    stem = filename.replace(".html", "")
    for multi in ("super-mario", "paw-patrol", "harry-potter", "spider-man"):
        if stem == multi or stem.startswith(multi + "-"):
            return multi
    parts = stem.split("-")
    return parts[0]

def card_exists(content: str, target_slug: str) -> bool:
    return bool(re.search(
        r'href="/kindergeburtstag/' + re.escape(target_slug) + r'(?:-[^"]*)?"\s+class="u-link"',
        content
    ))

def process_page(path: Path, cluster: str, apply: bool) -> dict:
    content = path.read_text(encoding="utf-8")
    target_card = PRINZESSIN_CARD if cluster == "prinzessin" else SUPERHELD_CARD
    target_slug = cluster
    fallback_prio = PRINZESSIN_FALLBACK if cluster == "prinzessin" else SUPERHELD_FALLBACK

    if card_exists(content, target_slug):
        return {"status": "skipped_already_present", "path": path.name}

    own_motto = page_motto(path.name)
    for fb_motto in fallback_prio:
        if fb_motto == own_motto:
            continue  # Eigene Motto-Card nicht tauschen
        pat = card_pattern(fb_motto)
        m = pat.search(content)
        if m:
            new_content = content[:m.start()] + target_card + content[m.end():]
            if apply:
                path.write_text(new_content, encoding="utf-8")
            return {"status": "swapped", "path": path.name, "swapped": fb_motto, "to": target_slug}

    return {"status": "no_swap_candidate", "path": path.name}

def main():
    apply = "--apply" in sys.argv
    print(f"Mode: {'APPLY' if apply else 'DRY-RUN'}\n")

    prinzessin_results = []
    superheld_results = []

    for path in sorted(PAGES_DIR.glob("*.html")):
        motto = page_motto(path.name)
        if motto in PRINZESSIN_CLUSTER:
            prinzessin_results.append(process_page(path, "prinzessin", apply))
        elif motto in SUPERHELD_CLUSTER:
            superheld_results.append(process_page(path, "superheld", apply))

    for name, results in [("Prinzessin", prinzessin_results), ("Superheld", superheld_results)]:
        print(f"\n=== {name} ===")
        by_status = {}
        for r in results:
            by_status.setdefault(r["status"], []).append(r)
        for status, rs in sorted(by_status.items()):
            print(f"  {status}: {len(rs)}")
            if status == "no_swap_candidate":
                for r in rs:
                    print(f"    - {r['path']}")
        print(f"  TOTAL: {len(results)}")

if __name__ == "__main__":
    main()
