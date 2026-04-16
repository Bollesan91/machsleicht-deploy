#!/usr/bin/env python3
"""Compare-Block für 5-jahre.html nachziehen."""
import sys
sys.path.insert(0, '.')
import re
from pathlib import Path

REPO = Path(__file__).parent.parent
FILE = REPO / "kindergeburtstag-5-jahre.html"
MARKER = 'data-affiliate-block="p2-14"'

content = FILE.read_text(encoding="utf-8")
if MARKER in content:
    print("schon da")
    raise SystemExit(0)

block = '''  <div class="u-compare-wrapper" data-affiliate-block="p2-14">
    <div class="u-compare-title">🎂 Top 3 Hits für 5-Jährigen-Party</div>
    <div class="u-compare-subtitle">Diese Produkte funktionieren bei Kindergarten-Kindern garantiert:</div>
    <div class="u-compare-grid">
    <div class="u-compare-card u-compare-best">
      <div class="u-compare-emoji">🎨</div>
      <div class="u-compare-name">Bastel-Set für Kleinkinder (Schere-fertig)</div>
      <div class="u-compare-price">ca. 15-25 €</div>
      <div class="u-compare-note">Altersgerecht, schon vorgeschnitten. Kinder basteln selbst, Eltern haben Ruhe.</div>
      <a href="https://www.amazon.de/s?k=bastelset+kinder+5+jahre&tag=machsleicht-21" class="u-compare-cta" rel="noopener sponsored" target="_blank">Bei Amazon ansehen *</a>
    </div>
    <div class="u-compare-card">
      <div class="u-compare-emoji">🎪</div>
      <div class="u-compare-name">Clown-Hüte-Set 8 Stück</div>
      <div class="u-compare-price">ca. 10-15 €</div>
      <div class="u-compare-note">Kostüm-Party im Kleinen. 5-Jährige lieben Verkleidung. Ein Klassiker.</div>
      <a href="https://www.amazon.de/s?k=kostüm+kinder+5+jahre+set&tag=machsleicht-21" class="u-compare-cta" rel="noopener sponsored" target="_blank">Bei Amazon ansehen *</a>
    </div>
    <div class="u-compare-card">
      <div class="u-compare-emoji">🎵</div>
      <div class="u-compare-name">Kinder-Musik-Instrumente-Set</div>
      <div class="u-compare-price">ca. 20-30 €</div>
      <div class="u-compare-note">Rhythmik-Spiele, laute Band-Runde. Funktioniert als Gruppenspiel für alle.</div>
      <a href="https://www.amazon.de/s?k=kinder+musikinstrumente+set&tag=machsleicht-21" class="u-compare-cta" rel="noopener sponsored" target="_blank">Bei Amazon ansehen *</a>
    </div>
    </div>
    <div class="u-compare-disclaimer">* Affiliate-Links. Für dich ändert sich der Preis nicht.</div>
  </div>
'''

for target in ['<div class="related">', '<div class="u-page-footer', '</main>']:
    idx = content.find(target)
    if idx > 0:
        content = content[:idx] + block + content[idx:]
        FILE.write_text(content, encoding="utf-8")
        print(f"✅ Eingefügt vor '{target}'")
        raise SystemExit(0)

print("❌ Kein Target gefunden")
