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

### Backlog erweitert (+211 Zeilen in BACKLOG-AUDIT.md)
- P2-1 als FUNNEL-AXIOM (✅ ENTSCHIEDEN, nicht mehr diskutieren)
- P1-6 Schema.org Markup
- P1-7 Social Proof auf Homepage
- P1-8 Motto-Seiten Elite-Upgrade mit 14-Punkte-Checkliste
- P1-9 /einladung als SEO-Hub
- P2-8 Kreuzworträtsel pre-rendern
- P2-9 Schatzsuche "6 Themen"-Inkonsistenz
- P2-10 Einladungstool: 7 fehlende Mottos
- P2-11 Interne Links broken/zirkulär fixen
- P2-12 Abhängigkeit P1-9 ↔ P2-10

### Umgesetzt (deployed)
- **P1-6 Teil 1:** BreadcrumbList JSON-LD auf 19 Motto-Hauptseiten
  (detektiv, dino, einhorn, feuerwehr, frozen, harry-potter, meerjungfrau,
  minecraft, ninjago, paw-patrol, pferde, piraten, pokemon, ritter, safari,
  spider-man, super-mario, weltraum, zirkus)
- **P2-6:** Encoding normalisiert auf 4 Elite-Seiten (Dino 3-5/6-8/9-12 + Piraten 6-8)
  — 193 HTML-Entities zu UTF-8-Zeichen
- **P2-11:** 26 interne CTA-Links auf 12 Ratgeber-Seiten korrigiert
  — href="/" → /kindergeburtstag#planer bzw. /kindergeburtstag

### 3-Stufen-Validierung
- ✅ Stufe 1: `validate-all.sh` PASSED
- ✅ Stufe 2: Alle Motto-Seiten haben BreadcrumbList, keine Encoding-Artefakte,
  keine verwaisten CTAs
- ✅ Stufe 3: 363 JSON-LD-Blöcke valide, Breadcrumb-URLs passen zum Slug,
  Homepage unangetastet

### Build-Skripte (neu)
- _build/add-breadcrumb.py
- _build/fix-internal-links.py

## Nächste Schritte

### Kritisch / Zeitlich bindend
1. **GitHub Token rotieren** (Deadline 25.04. — 9 Tage!)
2. **P0-Tickets offen:**
   - Google Search Console einrichten + Sitemap einreichen (20 Min)

### P1-8 Piraten Elite-Upgrade (nächstes PBI)
Nach Dino-Template (6-8 → 3-5 → 9-12).
Vorher Dino-Nacharbeiten:
- Dino 6-8: Header/Breadcrumb/Footer nachrüsten
- Dino 3-5: CSS-Klassen angleichen (game-tag, deko-grid, recipe-step)
- Dino Hauptseite: Social Proof Counter ergänzen (BreadcrumbList ✅ schon da)

### Weitere P1-Tickets
- P1-1: /schatzsuche als eigene Seite
- P1-2: /schnitzeljagd als eigene Seite
- P1-9: /einladung als SEO-Hub (abhängig von P2-10)
- P1-7: Social Proof auf Homepage (brauche echte Zahl aus Plausible)

### Cloudflare Worker
- KV Namespace "PARTY" + Custom Domain (LAPTOP-SESSION nötig)

## Offene Fragen
- Reihenfolge nach Piraten: Einhorn oder Paw Patrol (Lizenz-Motto mit höchstem Suchvolumen)?
- Amazon PartnerNet-Tag machsleicht21-21 verifizieren
- Skalierung: 60 Elite-Seiten manuell oder Content-Generator mit Claude API?
