# Session-Notizen

## Letzte Session
**Datum:** 16.04.2026 (Mobile-Session, Opus 4.6) — Bestandsaufnahme + Motto-Guide Fix

## Was wurde gemacht

### Stufe 1 — Deploy-Blocker gefixt ✅
`validate.js` meldete 4 echte Fehler (DEPLOY BLOCKED). Alle gefixt:
- `kindergeburtstag/dino-forscherpass.html`: Meta-Description + `noindex` (Druckvorlage, gehört nicht in Google-Index)
- `kindergeburtstag/dino-quiz.html`: Meta-Description + `noindex`
- `schatzsuche.html`: Meta-Description (Redirect bleibt in Sitemap indexierbar)
- `schnitzeljagd.html`: Meta-Description (dito)

**Status:** `validate.js` → 0 Fehler. `validate-all.sh` → PASSED.

### Stufe 2 — Ehrliches Audit über alle 366 Seiten ✅
Neues Skript `_build/audit-all-pages.py`:
- Kategorisiert seitentyp-bewusst: ratgeber, motto-guide, schatzsuche-motto, motto-matrix, motto-hub, guide-hub, schnitzeljagd, schatzsuche-hub, nachbarnische, tool, redirect, druckvorlage, legal, 404
- Canonical-Varianten-Erkennung: Einzel-Alter-Seiten (z.B. `piraten-5-jahre`) haben `canonical` auf Gruppen-Version (`piraten-3-5-jahre`). Diese werden NUR technisch gescored, nicht auf Content.
- Pro Kategorie eigenes Scoring-Profil.
- Aggregat + Top-20-Worst + Meta-Probleme.

**Ehrlicher Gesamtschnitt: 70,8 %** (vorher Session-Notes 92 %, galt nur für 18 Ratgeber).

### Stufe 3 — Fix 1: Motto-Guide Template (8 Seiten) ✅
Neues Skript `_build/upgrade-motto-guides.py`:
- FAQ-Schema mit 5 motto-spezifischen Fragen pro Guide
- HowTo-Schema "Motto-Party in 5 Schritten"
- Sichtbare FAQ-Sektion (5 Cards)
- Sichtbare HowTo-Sektion (5-Schritt-Liste)
- Motto-spezifischer Content für: frozen, harry-potter, minecraft, ninjago, paw-patrol, pokemon, spider-man, super-mario

**Ergebnis:** 47 % → 72 % (+25 Punkte), Content ~450 W → ~770 W über 8 Seiten.

## Audit-Stand nach dieser Session

| Kategorie | Seiten | Score | Kommentar |
|---|---:|---:|---|
| Ratgeber (Haupt) | 18 | 82 % | Bereits gepflegt |
| Motto-Hub | 23 | 77 % | Anständig |
| Schnitzeljagd | 2 | 76 % | OK |
| Schatzsuche-Motto | 8 | 75 % | Template-Fix offen |
| Schatzsuche-Hub | 2 | 74 % | OK |
| Motto-Matrix | 258 | 72 % | Canonical-Varianten sauber |
| Motto-Guide | 8 | **72 %** | diese Session: +25 Punkte |
| Guide-Hub | 8 | 60 % | Thin-Content-Dublette mit Motto-Guide (P2-2) |
| Tool/Planer | 16 | 54 % | 10 Einladungs-Tool-Seiten haben 3 W |
| Nachbarnische | 15 | 51 % | einschulung 31 %, baby 32 % — kritisch |

**Gesamtdurchschnitt: ~72 %** nach Motto-Guide-Fix.

## Was noch zu tun ist

### Kritisch zeitlich
- **GitHub-Token rotieren** — Deadline 25.04.2026 (noch ~9 Tage)
- **Google Search Console einrichten** (P0-1)
- **Cloudflare Worker deployen** (P1-10) — Laptop-Session

### Template-Fixes (nach Hebel sortiert)
1. **Einladungs-Tool-Seiten (10 Stück, 37 %)** — 3 Wörter Content, Meta + H1 fehlen. Template-Fix nötig.
2. **Nachbarnische-Flaggschiffe:**
   - `einschulung.html` (31 %, 77 W) — zentraler Hub, praktisch unsichtbar
   - `baby.html` (32 %, 89 W) — dito
3. **Schatzsuche-Motto (8 Seiten, 75 %)** — alle ~250 W, gleiche Struktur. FAQ+HowTo-Treatment wie Motto-Guides würde ~+10 Punkte bringen.
4. **Guide-Hub (8 Seiten, 60 %)** — Thin-Content-Dublette mit Motto-Guide. Besser strategisch konsolidieren (P2-2) als separat pflegen.

### Site-weite Baustellen
- **334 Titles > 65 Zeichen** — Google schneidet ab.
- **43 Meta-Descriptions > 160 Zeichen** — unsauber.
- **7 echte Broken Internal Links**: `/partyseite/`, `/kindergeburtstag/3`, `/kindergeburtstag/6`, `/kindergeburtstag/9`, `/schatzsuche/meerjungfrau`, `/kindergeburtstag/feen-3-5-jahre`, `/kindergeburtstag/dschungel-3-5-jahre`
- **~2100 False Positives in validate.js**: Favicons, utility.css, manifest.json werden als "ins Leere" gemeldet obwohl vorhanden. Validator-Bug.

### Motto-Guide Rest-Potential (72 % → 85 %)
Um auf 85 % zu kommen fehlen noch:
- Affiliate-Links (keiner auf den Motto-Guides) → +4 Punkte
- Content-Volume auf 1500+ W → +4 Punkte
- Partyseite-CTA (sobald live) → +3 Punkte

## Skripte (in `_build/`)
- **`audit-all-pages.py`** (neu) — Site-weites Audit, kategoriebewusst, Canonical-Variante-aware
- **`upgrade-motto-guides.py`** (neu) — Template-Fix für 8 Motto-Guides
- `audit-all-ratgeber.py` — Alt, nur 18 Haupt-Ratgeber
- `affiliate-sweep.py` + `affiliate-5-jahre.py`
- `upgrade-*.py` (8 Stück) — einzelne Ratgeber

## Validierung
- `bash validate-all.sh` — Basis-Gate (PASSED)
- `node validate.js` — Deep-Audit (0 Fehler nach Fix, ~400 echte Warnungen, ~2100 False Positives)
- `python3 _build/audit-all-pages.py` — **Site-weites Audit (NEU — empfohlen)**
- `python3 _build/audit-all-ratgeber.py` — Ratgeber-spezifisch (alt)

## Nächste Session Start-Empfehlung
Mit Einladungs-Tool-Seiten oder Nachbarnische-Flaggschiffen starten — beide haben extremen Hebel (37 % bzw. 31–32 %).
