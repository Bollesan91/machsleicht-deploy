# Session-Notizen

## Letzte Session
**Datum:** 16.04.2026

## Was wurde gemacht

### Strategische Entscheidungen
- **FUNNEL-AXIOM festgelegt und in Memory (#19) verankert:**
  - Hero = EIN Primary CTA "Kindergeburtstag planen →"
  - Schatzsuche/Einladung/Partyseite sekundär
  - Partyseite = Post-Planer-Upsell, kein Einstieg
  - Funnel: Google → Planer → Plan fertig → Partyseite → Wunschliste → Affiliate
  - Homepage bleibt lang (Hub)
- **4-Einstiegspunkte-SEO-Strategie** festgelegt:
  - /kindergeburtstag (Planer-Keywords)
  - /schatzsuche (Schatzsuche-Keywords, siehe P1-1)
  - /einladung (Einladungs-Keywords, siehe P1-9)
  - Homepage (Brand "machsleicht")

### Bereits deployed (frühere Commits heute)
- **P1-6 Teil 1:** BreadcrumbList JSON-LD auf 95 Seiten verteilt
- **P2-6:** Encoding normalisiert auf 4 Elite-Seiten (193 HTML-Entities)
- **P2-11:** 26 interne CTA-Links auf 12 Ratgeber-Seiten korrigiert

### Jetzt in diesem Commit

**Affiliate-Tag-Konsolidierung (KRITISCHER BUGFIX):**
- Vorher: 566× `machsleicht21-21` (falsch) + 230× `machsleicht-21` (richtig)
- Nachher: 796× einheitlich `machsleicht-21` in allen 16 relevanten Dateien
- Korrekter Tag verifiziert vom User: `machsleicht-21`
- Gefixt: 5 Elite-HTML-Seiten, 4 JS-Dateien, 2 Source-Dateien, 3 Dev-Scripts, 1 _dev-old, Elite-Template-Doku

**Deep SEO Ratgeber-Seiten (8 Seiten):**
- zeitplan, essen, kosten, mitgebsel, drinnen, draussen, last-minute, zuhause
- FAQPage (je 5-6 Fragen aus echtem Content, "Grinch-Ton" mit Zahlen)
- HowTo-Schemas auf ablauf-basierten Seiten (6 der 8)

**2 schwächste Seiten auf ~85% gehoben:**
- torte-einfach (55% → 85%): Recipe-Schema (5 HowToSteps), NutritionInformation, FAQ (6), 3 Affiliate-Links, CTA-Block
- spiele-drinnen (57% → 85%): FAQ (6), ItemList (15 Spiele), 4 Affiliate-Links, Planer-CTA + Schatzsuche-CTA

### 3-Stufen-Validierung
- ✅ Stufe 1: `validate-all.sh` PASSED
- ✅ Stufe 2: Alle Schemas valide, Counts korrekt
- ✅ Stufe 3: Alle JSON-LD-Blöcke JSON-valide, Tag einheitlich

### Build-Skripte (neu)
- `_build/audit-all-ratgeber.py` — bewertet alle 18 Ratgeber-Seiten auf 10 Dimensionen
- `_build/deep-seo-{drinnen,draussen,lastminute,zuhause,torte,spiele-drinnen}.py`

## Nächste Schritte (nächste Session)

### Kritisch / Zeitlich bindend
1. **GitHub Token rotieren** (Deadline 25.04.2026 — noch 9 Tage!)
2. Google Search Console einrichten + Sitemap einreichen

### Ratgeber-Seiten weiter auf 85%+ hochziehen
Audit-Ergebnis (Schlechteste zuerst):

| Seite | Aktuell | Was fehlt |
|-------|---------|-----------|
| spiele-draussen | 61% | FAQ, ItemList, Affiliate, Planer-CTA |
| 7-jahre | 61% | FAQs ausbauen, Affiliate |
| bei-regen | 61% | Content verdoppeln (790 W.), FAQ, HowTo |
| wenig-aufwand | 62% | FAQ, HowTo |
| zuhause | 64% | Content verdoppeln (532 W.!), HowTo |
| einladung-text | 67% | FAQ, HowTo |
| mitgebsel | 70% | HowTo, Affiliate |
| last-minute | 71% | Content verdoppeln (355 W.!) |
| 5-jahre | 73% | FAQs ausbauen (nur 1!), HowTo |
| 6-jahre | 73% | FAQs ausbauen (nur 1!), HowTo, Affiliate |
| kosten | 76% | Affiliate |

Befehl: `python3 _build/audit-all-ratgeber.py` zeigt Ranking.

### Systemische Probleme (fast alle Ratgeber)
- **Keine Seite hat Custom-OG-Bild** — alle nutzen og-home.png
- **Affiliate-Nutzung:** 16 von 18 Seiten haben 0 Amazon-Links

### P1-8 Piraten Elite-Upgrade (nächstes Motto)
Nach Dino-Template (6-8 → 3-5 → 9-12).
Vorher Dino-Nacharbeiten:
- Dino 6-8: Header/Breadcrumb/Footer nachrüsten
- Dino 3-5: CSS-Klassen angleichen
- Dino Hauptseite: Social Proof Counter

### Weitere P1-Tickets
- P1-1: /schatzsuche als eigene Seite
- P1-2: /schnitzeljagd als eigene Seite
- P1-9: /einladung als SEO-Hub (abhängig von P2-10)
- P1-7: Social Proof auf Homepage

### Cloudflare Worker
- KV Namespace "PARTY" + Custom Domain (LAPTOP-SESSION nötig)

## Offene Fragen
- ~~Amazon PartnerNet-Tag verifizieren~~ ✅ GEKLÄRT: `machsleicht-21`
- Reihenfolge nach Piraten: Einhorn oder Paw Patrol?
- Skalierung: 60 Elite-Seiten manuell oder Content-Generator mit Claude API?
