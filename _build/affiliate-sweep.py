#!/usr/bin/env python3
"""
P2-14 + P2-18: Affiliate-Sweep + Vergleichstabellen für 14 Ratgeber-Seiten.

Strategie:
- Vergleichstabellen (3 Produkte) für Seiten mit klarem Kauf-Intent
- Affiliate-Einzel-Boxen für kontextuelle Hilfsmittel
- Platziert VOR der "Related"/"Weiter lesen" Sektion (am Ende, aber noch im Content)
- Idempotent: erkennt bestehende Affiliate-Boxen und überspringt

Alle Links: Amazon mit tag=machsleicht-21
Produkte kuratiert auf Einmalkauf-Qualität (keine Verbrauchsware).
"""
import re
from pathlib import Path

REPO = Path(__file__).parent.parent

# Marker für idempotency
MARKER = 'data-affiliate-block="p2-14"'

# Pro Seite: entweder 'compare' (3er-Vergleich) oder 'box' (Bulletliste)
PAGES = {
    "kindergeburtstag-drinnen.html": {
        "type": "compare",
        "title": "🏠 Indoor-Party-Basics",
        "subtitle": "Drei Sachen, die aus einer spontanen Indoor-Party eine funktionierende machen:",
        "products": [
            {
                "emoji": "🎈",
                "name": "Luftballon-Pack (100 Stück)",
                "price": "ca. 10 €",
                "note": "Reicht für mehrere Partys, 100 verschiedene Farben. Pflichtausstattung für Wohnungsparty.",
                "url": "https://www.amazon.de/s?k=luftballons+bunt+100+stk&tag=machsleicht-21",
            },
            {
                "emoji": "🔊",
                "name": "Bluetooth-Box klein",
                "price": "ca. 25-40 €",
                "note": "Für Stopptanz, Musik-Spiele. Läuft jahrelang, auch im Alltag nutzbar.",
                "url": "https://www.amazon.de/s?k=bluetooth+lautsprecher+klein&tag=machsleicht-21",
                "best": True,
            },
            {
                "emoji": "🪑",
                "name": "Sitzkissen-Set (4 Stück)",
                "price": "ca. 20 €",
                "note": "Falls zu wenig Stühle — Stuhlkreise, Sitzen beim Basteln, flexibel einsetzbar.",
                "url": "https://www.amazon.de/s?k=kinder+sitzkissen+set&tag=machsleicht-21",
            },
        ],
    },
    "kindergeburtstag-draussen.html": {
        "type": "compare",
        "title": "🌳 Outdoor-Party-Ausrüstung",
        "subtitle": "Drei Dinge, die eine Park- oder Garten-Party entspannt machen:",
        "products": [
            {
                "emoji": "⛺",
                "name": "Pavillon 3×3 m (faltbar)",
                "price": "ca. 60-80 €",
                "note": "Sonnen- und Regenschutz, aufgebaut in 5 Min. Einmalkauf für jeden Kindergeburtstag draußen.",
                "url": "https://www.amazon.de/s?k=pavillon+faltbar+3x3&tag=machsleicht-21",
                "best": True,
            },
            {
                "emoji": "🧺",
                "name": "Picknickdecke XL wasserdicht",
                "price": "ca. 20-30 €",
                "note": "2×2 m mindestens, unten beschichtet. Übersteht Gras, Krümel, Saft-Flecken.",
                "url": "https://www.amazon.de/s?k=picknickdecke+wasserdicht+xxl&tag=machsleicht-21",
            },
            {
                "emoji": "🧊",
                "name": "Kühltasche / Kühlbox",
                "price": "ca. 25-40 €",
                "note": "Getränke und Kuchen bleiben frisch. Kritisch bei Sommer-Partys im Park.",
                "url": "https://www.amazon.de/s?k=kühlbox+picknick&tag=machsleicht-21",
            },
        ],
    },
    "kindergeburtstag-zuhause.html": {
        "type": "compare",
        "title": "🏡 Zuhause-Party-Essentials",
        "subtitle": "Drei Basics für die stressfreie Feier daheim:",
        "products": [
            {
                "emoji": "🎨",
                "name": "Kindergeburtstag-Deko-Set neutral",
                "price": "ca. 15-25 €",
                "note": "Girlande, Luftballons, Konfetti — funktioniert zu jedem Motto als Basis.",
                "url": "https://www.amazon.de/s?k=kindergeburtstag+deko+set+neutral&tag=machsleicht-21",
            },
            {
                "emoji": "🎂",
                "name": "Springform 26 cm Antihaft",
                "price": "ca. 20 €",
                "note": "Klassische Runde Form, einmal kaufen. Funktioniert für jedes Kuchenrezept.",
                "url": "https://www.amazon.de/s?k=springform+26cm+antihaft&tag=machsleicht-21",
                "best": True,
            },
            {
                "emoji": "🕯️",
                "name": "Zahlen-Kerzen 0-9",
                "price": "ca. 5-8 €",
                "note": "Einmal kaufen statt jedes Jahr neue. Jahrelange Nutzung.",
                "url": "https://www.amazon.de/s?k=geburtstagskerzen+zahlen+0-9&tag=machsleicht-21",
            },
        ],
    },
    "kindergeburtstag-last-minute.html": {
        "type": "compare",
        "title": "🚨 Last-Minute-Notfall-Kit",
        "subtitle": "Drei Sachen, die jede Party retten — auch wenn du nur 48 Stunden hast:",
        "products": [
            {
                "emoji": "📦",
                "name": "Party-Komplettset für 8 Kinder",
                "price": "ca. 20-30 €",
                "note": "Teller, Becher, Servietten, Girlande, Tischdecke. In einer Bestellung alles abgehakt.",
                "url": "https://www.amazon.de/s?k=kindergeburtstag+party+set+8+kinder&tag=machsleicht-21",
                "best": True,
            },
            {
                "emoji": "🎁",
                "name": "Mitgebsel-Mixset (12 Stück)",
                "price": "ca. 15-20 €",
                "note": "Fertig verpackt, keine Bastelei. Spart 1 Stunde Planung.",
                "url": "https://www.amazon.de/s?k=mitgebsel+kindergeburtstag+set&tag=machsleicht-21",
            },
            {
                "emoji": "🎈",
                "name": "Helium-Luftballon-Set",
                "price": "ca. 25-35 €",
                "note": "Mit Helium-Flasche und 20 Ballons. Deko in 10 Min. aufgehangen.",
                "url": "https://www.amazon.de/s?k=helium+luftballon+set+kindergeburtstag&tag=machsleicht-21",
            },
        ],
    },
    "kindergeburtstag-wenig-aufwand.html": {
        "type": "compare",
        "title": "⚡ Minimaler Aufwand, maximale Wirkung",
        "subtitle": "Drei Produkte, die dir viele Stunden Vorbereitung abnehmen:",
        "products": [
            {
                "emoji": "📦",
                "name": "Party-Komplettset (Teller, Becher, Deko)",
                "price": "ca. 20-30 €",
                "note": "Alles dabei, ein Karton. Kein Einzelkauf nötig.",
                "url": "https://www.amazon.de/s?k=kindergeburtstag+komplettset&tag=machsleicht-21",
                "best": True,
            },
            {
                "emoji": "🎨",
                "name": "Bastel-Set fertig (8 Kinder)",
                "price": "ca. 15-25 €",
                "note": "Alle Materialien vorbereitet. Einfach auspacken, Kinder loslegen lassen.",
                "url": "https://www.amazon.de/s?k=bastelset+kinder+party+8&tag=machsleicht-21",
            },
            {
                "emoji": "🎁",
                "name": "Fertig-Mitgebsel-Tüten",
                "price": "ca. 15-20 €",
                "note": "Schon gefüllt. Kein Verpacken, kein Nachdenken.",
                "url": "https://www.amazon.de/s?k=mitgebsel+tüten+gefüllt+kinder&tag=machsleicht-21",
            },
        ],
    },
    "kindergeburtstag-mitgebsel.html": {
        "type": "compare",
        "title": "🎁 Top 3 Mitgebsel-Sets ohne Plastikmüll",
        "subtitle": "Nachhaltige Alternativen zu Ramsch-Tüten — einmal kaufen, für mehrere Partys:",
        "products": [
            {
                "emoji": "✏️",
                "name": "Stift- und Mal-Set (12er)",
                "price": "ca. 18-25 €",
                "note": "Buntstifte, Radiergummi, Spitzer. Hält lange, Kinder nutzen es wirklich.",
                "url": "https://www.amazon.de/s?k=bunstifte+set+kinder+12er&tag=machsleicht-21",
                "best": True,
            },
            {
                "emoji": "🌱",
                "name": "Saatband / Mini-Garten-Set",
                "price": "ca. 12-18 €",
                "note": "Kresse, Sonnenblumen oder Basilikum zum Selberziehen. Nachhaltig + Lerneffekt.",
                "url": "https://www.amazon.de/s?k=saatband+kinder+mitgebsel&tag=machsleicht-21",
            },
            {
                "emoji": "📖",
                "name": "Mini-Rätselbücher Set",
                "price": "ca. 10-15 €",
                "note": "8 kleine Rätsel-/Malbücher. Viel Beschäftigung, landet nicht sofort im Müll.",
                "url": "https://www.amazon.de/s?k=kinder+rätselheft+set+8&tag=machsleicht-21",
            },
        ],
    },
    "kindergeburtstag-essen.html": {
        "type": "compare",
        "title": "🍽️ Fingerfood-Helfer für Kinderparty",
        "subtitle": "Drei Sachen, die das Essen-Setup massiv vereinfachen:",
        "products": [
            {
                "emoji": "🍕",
                "name": "Muffin-Form Silikon 12er",
                "price": "ca. 10-15 €",
                "note": "Für Muffins, herzhafte Mini-Aufläufe, Fingerfood. Einmal kaufen, für jede Party.",
                "url": "https://www.amazon.de/s?k=muffinform+silikon+12+fach&tag=machsleicht-21",
                "best": True,
            },
            {
                "emoji": "🥤",
                "name": "Kinder-Trinkflaschen 8er-Set",
                "price": "ca. 20-25 €",
                "note": "Wiederverwendbar, keine Pappbecher. Kinder verwechseln nicht mehr.",
                "url": "https://www.amazon.de/s?k=kinder+trinkflasche+set+8&tag=machsleicht-21",
            },
            {
                "emoji": "🍎",
                "name": "Obstspieße / Picks (50er)",
                "price": "ca. 5-10 €",
                "note": "Obstspieße, Snack-Spieße, Muffin-Topper. Vielseitig einsetzbar.",
                "url": "https://www.amazon.de/s?k=obstspieße+kinder+party&tag=machsleicht-21",
            },
        ],
    },
    "kindergeburtstag-kosten.html": {
        "type": "compare",
        "title": "💰 Spar-Basics (einmal kaufen, jahrelang nutzen)",
        "subtitle": "Drei Investitionen, die langfristig Kosten sparen:",
        "products": [
            {
                "emoji": "🎂",
                "name": "Springform 26 cm hochwertig",
                "price": "ca. 20 €",
                "note": "15 Jahre nutzbar. Pro Kuchen 1,30€ amortisiert — rechnet sich nach 2 Partys.",
                "url": "https://www.amazon.de/s?k=springform+26cm+antihaft&tag=machsleicht-21",
            },
            {
                "emoji": "🕯️",
                "name": "Zahlen-Kerzen-Set 0-9",
                "price": "ca. 8 €",
                "note": "Jedes Jahr wiederverwendbar. Spart jedes Jahr 3-5€.",
                "url": "https://www.amazon.de/s?k=zahlenkerzen+set+0-9&tag=machsleicht-21",
                "best": True,
            },
            {
                "emoji": "🎈",
                "name": "Helium-Flasche (mehrfach nutzbar)",
                "price": "ca. 35-50 €",
                "note": "Reicht für 30+ Ballons. Pro Party deutlich günstiger als Einzel-Helium-Set.",
                "url": "https://www.amazon.de/s?k=helium+flasche+ballons+kinder&tag=machsleicht-21",
            },
        ],
    },
    "kindergeburtstag-zeitplan.html": {
        "type": "box",
        "title": "🛒 Nützlich für den Ablauf:",
        "items": [
            ("⏱️ Laute Küchen-Timer für Spiele", "https://www.amazon.de/s?k=küchentimer+laut+kinder&tag=machsleicht-21"),
            ("🎵 Bluetooth-Box für Musik-Spiele", "https://www.amazon.de/s?k=bluetooth+lautsprecher+klein&tag=machsleicht-21"),
            ("📋 Moderations-Karten-Set", "https://www.amazon.de/s?k=moderationskarten+kinder&tag=machsleicht-21"),
        ],
    },
    "kindergeburtstag-checkliste.html": {
        "type": "box",
        "title": "🛒 Alle Checklisten-Sachen in wenigen Klicks:",
        "items": [
            ("📦 Kindergeburtstag-Komplettset (Teller/Becher/Deko)", "https://www.amazon.de/s?k=kindergeburtstag+komplettset&tag=machsleicht-21"),
            ("🎁 Fertig-Mitgebsel für 8-12 Kinder", "https://www.amazon.de/s?k=mitgebsel+set+kindergeburtstag&tag=machsleicht-21"),
            ("🎂 Springform + Backmischung-Pack", "https://www.amazon.de/s?k=springform+backmischung+kinder&tag=machsleicht-21"),
            ("🕯️ Zahlen-Kerzen 0-9 Set", "https://www.amazon.de/s?k=zahlenkerzen+set&tag=machsleicht-21"),
        ],
    },
    "kindergeburtstag-einladung-text.html": {
        "type": "box",
        "title": "🛒 Für die Einladungs-Umsetzung:",
        "items": [
            ("✉️ Einladungskarten-Set 20 Stück (motto-neutral)", "https://www.amazon.de/s?k=einladungskarten+kindergeburtstag+set&tag=machsleicht-21"),
            ("✏️ Bunte Gelstifte zum Beschriften", "https://www.amazon.de/s?k=gelstifte+kinder+set&tag=machsleicht-21"),
            ("📮 Briefumschläge bunt 25er", "https://www.amazon.de/s?k=briefumschläge+bunt+kinder&tag=machsleicht-21"),
        ],
    },
    "kindergeburtstag-spiele-draussen.html": {
        "type": "compare",
        "title": "🎯 Outdoor-Spiele-Material",
        "subtitle": "Drei Sets, die viele Outdoor-Spiele abdecken:",
        "products": [
            {
                "emoji": "🎯",
                "name": "Garten-Spiele-Set (Wurf/Ziel)",
                "price": "ca. 25-35 €",
                "note": "Wurfringe, Boule, Sackhüpfen in einem Set. Hält jahrelang.",
                "url": "https://www.amazon.de/s?k=garten+spielzeug+set+kinder+wurf&tag=machsleicht-21",
                "best": True,
            },
            {
                "emoji": "💧",
                "name": "Wasserbomben-Nachfüll-Set",
                "price": "ca. 10-15 €",
                "note": "Für Sommer-Partys. Hunderte Bomben in Minuten gefüllt.",
                "url": "https://www.amazon.de/s?k=wasserbomben+set+kinder&tag=machsleicht-21",
            },
            {
                "emoji": "🪁",
                "name": "Seifenblasen-Set XXL",
                "price": "ca. 15-20 €",
                "note": "Riesen-Seifenblasen. Funktioniert bei jeder Altersgruppe, Foto-Gold.",
                "url": "https://www.amazon.de/s?k=seifenblasen+xxl+kinder&tag=machsleicht-21",
            },
        ],
    },
    "kindergeburtstag-7-jahre.html": {
        "type": "compare",
        "title": "🎂 Top-Geschenke & Ausstattung für 7-Jährige",
        "subtitle": "Dinge, die 7-Jährige bei der Party lieben:",
        "products": [
            {
                "emoji": "🔍",
                "name": "Detektiv-Set (Lupe, Notizbuch, Fingerabdruck)",
                "price": "ca. 15-20 €",
                "note": "Perfekt für Schatzsuche oder Detektiv-Motto. Ab 7 Jahre ideal.",
                "url": "https://www.amazon.de/s?k=detektiv+set+kinder+7+jahre&tag=machsleicht-21",
                "best": True,
            },
            {
                "emoji": "🧪",
                "name": "Experimentier-Kasten ab 7",
                "price": "ca. 20-30 €",
                "note": "Wissenschafts-Partys oder als Geschenk. 7-Jährige lieben das.",
                "url": "https://www.amazon.de/s?k=experimentierkasten+kinder+7&tag=machsleicht-21",
            },
            {
                "emoji": "🎨",
                "name": "Kreativ-Set (Perlen, Armbänder, DIY)",
                "price": "ca. 15-25 €",
                "note": "Für Basteln mit Ergebnis. Länger fokussiert als reine Malaktionen.",
                "url": "https://www.amazon.de/s?k=perlen+bastelset+kinder+7&tag=machsleicht-21",
            },
        ],
    },
    "kindergeburtstag-6-jahre.html": {
        "type": "compare",
        "title": "🎂 Top-Material für 6-Jährigen-Party",
        "subtitle": "Produkte, die bei Erstklässler-Geburtstagen funktionieren:",
        "products": [
            {
                "emoji": "🏴‍☠️",
                "name": "Piraten-Verkleidungs-Set 8 Kinder",
                "price": "ca. 20-30 €",
                "note": "Augenklappen, Hüte, Ketten für 8. Hit bei 6-Jährigen. Einmal kaufen, oft nutzen.",
                "url": "https://www.amazon.de/s?k=piraten+verkleidung+kinder+8+set&tag=machsleicht-21",
            },
            {
                "emoji": "🎨",
                "name": "Bastel-Set ab 6 (gemischt)",
                "price": "ca. 15-25 €",
                "note": "Masken, Kronen, Armbänder zum Selbermachen. Alles vorbereitet.",
                "url": "https://www.amazon.de/s?k=bastelset+kinder+6+jahre&tag=machsleicht-21",
                "best": True,
            },
            {
                "emoji": "🎲",
                "name": "Einfache Brettspiele ab 6 (Mini-Set)",
                "price": "ca. 15-20 €",
                "note": "Regen-Tag-Retter. Memory, Würfelspiele, schnelle Runden.",
                "url": "https://www.amazon.de/s?k=brettspiele+kinder+6+jahre&tag=machsleicht-21",
            },
        ],
    },
}

def build_compare_html(cfg):
    products_html = ""
    for p in cfg["products"]:
        best_class = " u-compare-best" if p.get("best") else ""
        products_html += f'''
    <div class="u-compare-card{best_class}">
      <div class="u-compare-emoji">{p["emoji"]}</div>
      <div class="u-compare-name">{p["name"]}</div>
      <div class="u-compare-price">{p["price"]}</div>
      <div class="u-compare-note">{p["note"]}</div>
      <a href="{p["url"]}" class="u-compare-cta" rel="noopener sponsored" target="_blank">Bei Amazon ansehen *</a>
    </div>'''
    return f'''  <div class="u-compare-wrapper" {MARKER}>
    <div class="u-compare-title">{cfg["title"]}</div>
    <div class="u-compare-subtitle">{cfg["subtitle"]}</div>
    <div class="u-compare-grid">{products_html}
    </div>
    <div class="u-compare-disclaimer">* Affiliate-Links. Für dich ändert sich der Preis nicht.</div>
  </div>
'''

def build_box_html(cfg):
    items = "\n".join(
        f'      <li><a href="{url}" rel="noopener sponsored" target="_blank">{label} *</a></li>'
        for label, url in cfg["items"]
    )
    return f'''  <div class="tip" style="background:#FFF3E8;border-color:#E8873D;margin:24px 0" {MARKER}>
    <strong>{cfg["title"]}</strong>
    <ul class="u-clr-d" style="margin-top:6px">
{items}
    </ul>
    <div style="font-size:11px;color:#8B7D72;margin-top:8px">* Affiliate-Links. Für dich ändert sich der Preis nicht.</div>
  </div>
'''

# Einfügen vor <div class="related"> oder vor </main> oder vor Footer-Script
INSERTION_TARGETS = [
    '<div class="related">',
    '<div class="u-page-footer',
    '</main>',
]

updated = 0
skipped = 0
not_found = 0

for filename, cfg in PAGES.items():
    path = REPO / filename
    if not path.exists():
        print(f"❌ Datei nicht gefunden: {filename}")
        not_found += 1
        continue

    content = path.read_text(encoding="utf-8")

    if MARKER in content:
        print(f"⏭️  {filename}: Affiliate-Block schon da, skip")
        skipped += 1
        continue

    if cfg["type"] == "compare":
        block = build_compare_html(cfg)
    else:
        block = build_box_html(cfg)

    inserted = False
    for target in INSERTION_TARGETS:
        idx = content.find(target)
        if idx > 0:
            content = content[:idx] + block + content[idx:]
            inserted = True
            break

    if not inserted:
        print(f"❌ {filename}: Kein Insertion-Target gefunden")
        continue

    path.write_text(content, encoding="utf-8")
    print(f"✅ {filename}: {cfg['type']}-Block eingefügt")
    updated += 1

print(f"\n=== BILANZ ===")
print(f"Updated: {updated}")
print(f"Skipped: {skipped}")
print(f"Not found: {not_found}")
