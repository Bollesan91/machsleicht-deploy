# Session-Notiz — 31.05.2026 morgens (Wellen 3-8 pferde+ritter+baustelle ELITE-Sweep)

## 🚀 Deploy 31.05.2026 09:38 (Merge-Commit 5ba1b05 auf main)

Branch-Trick Chrome-MCP Multi-Chat-Reviewer brachte alle 3 letzten Hubs auf bzw. an die Elite-Schwelle. Anti-Sycophancy-Drift-Korrektur war dramatisch (pferde: kontaminiert 90 → frisch 74 = -16 Punkte).

| Page | W2 | W3 | W4 (kont.) | W5 frisch | W6 frisch | W7 frisch | W8 final |
|---|---|---|---|---|---|---|---|
| **pferde** | 61 | 88 | ~~90~~ | 74 | 84 | 88 | ✅ deployed |
| **ritter** | 48 | 86 | ~~94~~ | 84 | 88 | 89 | ✅ deployed |
| **baustelle** | — | 81 (W2) | — | 83 | 88 | 89 | ✅ deployed |

### ⚠ KRITISCHE LERNUNG: Anti-Sycophancy via FRISCHE TABS

Welle 4 pferde+ritter wurden im SELBEN Tab wie Welle 3 bewertet → Reviewer inflationierte 90/94 (vs. frisch 74/84 in neuen Tabs). **Regel ab jetzt: jeder Re-Verify in NEUEM claude.ai-Tab mit SHA-pinned URL** (raw.githubusercontent.com/.../<commit-sha>/...). Cache-Bust `?cb=welleX` reicht GitHub-CDN nicht.

### Behobene Blocker pro Page (Welle 3-8)

**pferde.html:**
- Age-Filter JS Pattern (.u-grid-cards selector)
- Pferde-ABC korrekt: Schimmel/Rappe als Fellfarbe, Kaltblut als Typklasse, Schimmel ergrauen über dunkle Grundfarbe
- Fake "4.700 Geburtstage" + "Beliebt bei Pferdefans" raus → "Komplett-Konzept 3-12 J", "3-12 J · drinnen & draußen"
- Sicherheits-Block PFLICHT (Pferd nicht von hinten, Reithelm, Allergie, Aufsicht 1:3-4, Stroh-Brand)
- Mini-Faktbox Hufrehe + 3 giftige Pflanzen (Jakobskreuzkraut/Eibe/Bergahorn) + FN-Stockmaß
- Kosten-Range 15-40 → 12-45 € (DOM+JSON-LD synchron mit Breakdown)
- HowTo PT15M → PT10M, Steps planungs-zentriert
- NEUE Sektionen: "5-Schritte-Block" (sichtbar matcht Schema), "Beispiel-Ablauf 2,5h" (erfüllt 'Ablauf'-Versprechen Title/H1), "Lizenz-Heft + Stallmeister:innen-Pokal-Box"
- Wanderpokal → Stallmeister:innen-Pokal (3 Stellen)
- Gendering konsequent: Stallmeister:innen-* + Reiter:innen-Lizenz/Anwärter:innen, Quiz-Leitung, Wettkampf-Jury, Sieger:in, Tierärzt:in
- Pokal-Mechanik klar: 3 Mini-Pokale Hufeisen-Wurf Einzel + Team-Bonus-Stempel Parcours (kein Doppel-Pokal)
- Breadcrumb-Sync, Sticky-Bar Planer primary, einheitliche Schatzsuche-URLs

**ritter.html:**
- Age-Filter JS Pattern-Fix
- RITTERINNEN-VARIANTE komplett (Title/Meta/Hero/HowTo/FAQ DOM+JSON-LD, Jeanne d'Arc 1412-1431 + Margarete von Anjou 1430-1482 mit Wikipedia-Links, OG/Twitter ent-männlicht)
- Margarete-Framing historisch korrekt: "treibende politische Kraft des Hauses Lancaster, nicht selbst Ritterin"
- Adler=Stärke + Eule=Weisheit (Adler=Weisheit war falsch)
- Höhenburg/Niederungsburg-Hierarchie (Wasserburg=Untertyp)
- Heraldik "max 2 Farben + 1 Metall" als Stilempfehlung (Tinkturregel bleibt verbindliche Regel)
- Marzipan-Allergen-Warnung 3x (Mandeln)
- Pool-Nudel-Overclaim entschärft (Hero/Card/FAQ): "sicherstes Übungs-Schwert, kein Spielzeug-Pass" + Pflicht-Regeln
- Sicherheits-Block PFLICHT (Schwert-Briefing, 1:1 Aufsicht, Bogen ab 6 + Schutzbrille, Marzipan, LED, Pappkarton-Helm)
- FAQ DOM↔JSON-LD verbatim sync (Q1-Q5)
- "Met-Schorle" alkohol-codiert → "Burg-Schorle"
- HowTo Steps planungs-only, totalTime PT10M jetzt korrekt
- Breadcrumb sync, Sticky-Bar Planer primary

**baustelle.html:**
- Breadcrumb DOM Start/Kindergeburtstag sync
- Hero Schatzsuche-URL einheitlich (?motto=baustelle&modus=schatzsuche#planer)
- Fake-Stat 4.700 raus
- Bauarbeiter:innen-Variante komplett (Hero/Badge/HowTo/FAQ-JSON-LD/Kuchen/Snacks/Mittagspause/Lizenz)
- Sicherheits-Block PFLICHT vor FAQ (Knopfzellen-LED, DIN-EN-71-3-Spielsand, Schrauben-Größe, Helm) + NEUER Nuss-/Marzipan-Allergen-Bullet
- "Tinktur-Regel" Halluzination → "Lot/Senkblei-Prinzip, Zug- vs Druckkräfte"
- Sabotage-Lösung "Maurer Frank" raus, Verdächtige 3:1 → 2:2 (Polierin/Elektrikerin)
- "KEINE Lego" Logik umformuliert (3x)
- HowTo PT10M (war PT15M), sichtbarer 5-Schritte-Block
- Hybrid "Bauarbeiterinnen- & Bauarbeiter:innen-Lizenz" konsolidiert → "Bauarbeiter:innen-Lizenz"
- H2 "Baustelle-Bauarbeiter nach Alter" → "Baustelle nach Alter"
- Age-Filter JS Pattern, Sticky-Bar Planer primary, Einladung ?thema=baustelle

### Methodik-Bestätigung Anti-Sycophancy

- **Drift-Korrektur diesmal: -16 Punkte** (pferde 90 kontaminiert → 74 frisch). Dramatischer als jedes vorher dokumentierte Pattern.
- **Cache-Bug**: `?cb=welleX` reicht GitHub-CDN nicht — SHA-pinned URLs (`/<commit-sha>/...`) sind die einzige zuverlässige Methode für unkontaminierte Re-Audits.
- **Composer-Submit-Bug** in Chrome-MCP: Type direkt nach Tab-Switch geht teils ins Leere — Pattern "click + wait 1s + click + type" zuverlässiger.

### NACHSCHRITTE PFLICHT

1. **Cloudflare-Cache-Purge** ([dash.cloudflare.com](https://dash.cloudflare.com) → machsleicht.de → Caching → Configuration → Purge Everything) — sonst bis 2h alte Version auf Edge.
2. **GSC URL-Inspection** für die 3 Pages (Re-Crawl):
   - `https://machsleicht.de/kindergeburtstag/pferde`
   - `https://machsleicht.de/kindergeburtstag/ritter`
   - `https://machsleicht.de/kindergeburtstag/baustelle`
3. **og-Images dediziert** generieren (alle 3 nutzen og-default.png als Platzhalter)
4. **15/15 ELITE Status: erreicht für 12 Hubs voll, 3 (baustelle/pferde/ritter) bei 89-90 nach Welle 8 Final-MUST-FIX-Sweep** — alle dokumentierten MUST-FIX behoben, restliche NICE-TO-HAVE (og-images, Mottenstraße-Schild, Eleonore "um 1122", Olympiade-Begriff) bleiben Politur für Future-Sprint.

### Commits dieser Sprint-Welle (31.05.2026 morgens)

- `413ed49` Welle 3 pferde+ritter Branch-Trick-Fixes (61/48→90+ Ziel)
- `858657c` Welle 4 pferde 2 Micro-Fixes (88→≥90 Elite kontaminiert)
- `821b236` Welle 4 ritter 2 Blocker-Fixes (86→≥90 kontaminiert)
- `a057227` Merge draft→main Welle 3+4 (kontaminierte 90/94)
- `d9a0322` Welle 5 (Anti-Sycophancy-Korrektur 74/84/81)
- `4b91d4c` Welle 6 (HowTo+Inklusivität+Präzision)
- `e17f030` Welle 7 (Letzte Mini-Fixes 88/87/87)
- `f423d31` Welle 8 Final-MUST-FIX (89/88/89 → Elite)
- `5ba1b05` Merge draft→main Welle 5+6+7+8 Final
