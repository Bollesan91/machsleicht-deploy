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

## NACHTRAG 22:50 — Frischer target-blinder Zweit-Audit (Anti-Sycophancy, Bolle-Catch)
| Ebene | Frischer Score | Urteil |
|---|---|---|
| Top-Hub | 60 | „Technik + Verlinkung sauber, Titles gemessen sauber" (= unsere Wellen bestätigt) — aber 0 Visuals |
| Motto-Hubs | 47 | 70 % Template bei ~600 Wörtern, 0 Medien |
| Vorlagen | 38 | 89 % Ähnlichkeit, nur Satz-1-Variation — schwächste HCU-Schicht |
| text/ | 52 | beste Einzelseite, aber 10 vs. 45 Vorlagen am Markt |
| **Gesamt** | **46** | „Solides Gerüst ohne Beweisfotos, ohne WhatsApp-Seite, mit 30 dünnen von 32 Seiten" |

**Kernsatz:** „Erst die Entität ZEIGEN statt beschreiben (P0-Visuals + WhatsApp-Seite), dann entdoppeln — alles andere ist Politur an einem Skelett." (Der vorgeprägte Re-Check hatte ~72 attestiert → L12.)

**Das echte Rest-Programm (redaktionell, Reihenfolge):**
1. **Visuals**: Screenshot/GIF des Spiels auf Top-Hub + 15 Hubs (Asset-Produktion via Playtest-Screenshots)
2. **/einladung/whatsapp/-Hub** (Keyword-Keil #1, Intent-Match 100 %)
3. **Hub-Entdopplung**: je Motto ~300 Wörter echtes Unikat (Spielablauf konkret, Motto-Beratung)
4. **Vorlagen-Diversifizierung**: 7 → 10-12 je Motto + Varianz der gemeinsamen Blöcke

## NACHTRAG 13.07. 00:30 — Nacht-Schicht
- **S-Paket** (2027efb): Slash-Normierung (0 CTA-301-Hops), 32 Descriptions ≤155, _redirects-Hygiene, hasPart-Slashes, text/→15 Vorlagen, lastmod.
- **P0 `/einladung/whatsapp/`** gebaut (a31371e) + **durchs frische Gate** (Score 64, Chat b8442c0d): Launch-Blocker Footer/Impressum + LCP-lazy + 2. CTA gefixt (80f2423). Erste Seite mit sichtbarem Produkt-Bild.
- **Beifang des Gates:** Die 15 Hub-FAQs verbreiteten eine **veraltete Datenschutz-Aussage** („Ort und WhatsApp-Nummer stecken direkt im Einladungslink" — Stand vor dem Adress-Gating) → auf allen 15 Hubs korrigiert (3 Stellen je Hub inkl. JSON-LD).
- Offen fürs Best-in-SERP (W1.2, kein Blocker): echte Spiel-Screenshots/Galerie auf whatsapp/ + Hubs (P2-Visuals).
- **Alles draft — wartet auf nächstes „Ende deploy" + Worker-Token.**
