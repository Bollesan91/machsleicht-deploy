# Einladungs-Entität — Audit + Neubau (2026-07-12, draft)

## Gate-Verlauf (Fable 5 Max, target-blind, SEO-Audit mit SERP-Recherche)
| Stand | Score |
|---|---|
| Live-Ist (Start) | Top-Hub 58 · Motto-Hubs 44 · Vorlagen 61 · **Gesamt 52** — „echtes, konkurrenzloses Produkt hinter Seiten, die es nicht zeigen" |
| Nach P0+P1+Abnahme-Fixes | **~72** (Reviewer-Schätzung nach R1+R2; R3+R4 zusätzlich gefixt) |
| Lücke zu 85+ | Produkt-Visuals (kein Bild/Video des Spiels auf den Seiten) + fehlender `/einladung/whatsapp/`-Hub (Keyword-Keil #1) |

## Gebaut (Commits 6fcfcc9 → a707aeb, alle draft)
P0: Titles 3 Ebenen · Wochen-Widerspruch (3-4, Text+JSON-LD) · Geschwister-Verlinkung (Hubs 4→8 Links, Vorlagen +5, Top-Hub 1→16 Vorlagen-Inlinks) · Live-Demo-Link Top-Hub.
P1: `kindergeburtstag-einladung-text.html` → **`/einladung/text/`** (301 beide Varianten, Alt-Datei weg, 34 Referenzen, Pokémon→„Ohne Motto — mit Pep") · ItemList auf 15 Vorlagen-Seiten.
Abnahme-Fixes: R1 **Deploy-Blocker** (Pretty-Regel Z.141 schattete die 301 → Alt-URL wäre 404) · R2 Titles aufs Pixel-Budget (≤62c, „per WhatsApp"→Description) · R3 unsichtbares FAQ/HowTo-Schema auf text/ raus, ItemList rein · R4 sichtbarer Breadcrumb + og:title.

## False-Positives (verworfen, Stufe 3)
- „/einladung/erstellen/ = noindex-Leiche" → ist ein funktionierender 15-Motto-Schnell-Creator (erzeugt /e/-Slugs, Partyseiten-Upsell). Bleibt.
- „Editor: 5 Mottos fehlen im Picker" → Hubs verlinken auf erstellen/ (hat alle 15); der party-Creator hat seit Funnel-Build ebenfalls 15 (draft).

## Offen (P2, nächste Ausbaustufe)
1. **`/einladung/whatsapp/`-Hub** — Keyword-Keil „whatsapp einladung kindergeburtstag" (Intent passt zu 100 %, Konkurrenz = Listicles).
2. **Produkt-Visuals**: Screenshot/GIF des Spiels auf Top-Hub + Motto-Hubs (W6: „demonstrieren statt behaupten").
3. Design-Angleichung /einladung/text/ ans Entitäts-Designsystem.
4. Nach Deploy: GSC Sitemap-Re-Submit (sitemap.xml geändert: text/ rein, Alt-URL raus!) + neue Titles beobachten.
