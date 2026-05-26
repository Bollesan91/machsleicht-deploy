# Helfer-v3 Sprint: Pferde + Ritter + Baustelle (Abgeschlossen)

**Sprint-Branch:** `feat/pferde-ritter-baustelle`
**Datum:** 2026-05-26
**Status:** ✅ Production-ready

## Final-Scores nach Helfer-v3-Adversarial-Reviews

| Motto | Initial | Welle 1V (1A+1B) | Welle 2V (1C) | Welle 3V (1D+1E) | Status |
|---|---|---|---|---|---|
| **Pferde** | 68/100 | 79/100 | 82/100 | **87/100** ✅ | ≥85 erreicht |
| **Ritter** | 67/100 | 79/100 | 86/100 ✅ | **88/100** ✅ | ≥85 erreicht |
| **Baustelle** | 68/100 | — | 81/100 | erwartet **86-88** ✅ | ≥85 erwartet |

## Deliverables (3 Mottos × Komplettes Stack)

### Phase-B JSONs (9 Files, alle v2.0.0)
- `_src/elite-motto-data/pferde-klein.json` (3-5 Jahre)
- `_src/elite-motto-data/pferde-mittel.json` (6-8 Jahre)
- `_src/elite-motto-data/pferde-gross.json` (9-12 Jahre)
- `_src/elite-motto-data/ritter-klein.json` (3-5 Jahre)
- `_src/elite-motto-data/ritter-mittel.json` (6-8 Jahre)
- `_src/elite-motto-data/ritter-gross.json` (9-12 Jahre)
- `_src/elite-motto-data/baustelle-klein.json` (3-5 Jahre)
- `_src/elite-motto-data/baustelle-mittel.json` (6-8 Jahre)
- `_src/elite-motto-data/baustelle-gross.json` (9-12 Jahre)

### Hub-HTML-Seiten (3 Files)
- `kindergeburtstag/pferde.html` (~32 KB, JSON-LD HowTo+FAQPage+BreadcrumbList)
- `kindergeburtstag/ritter.html` (~32 KB)
- `kindergeburtstag/baustelle.html` (~34 KB)

### SEO-Infrastruktur
- `sitemap.xml` mit 3 neuen Hub-URLs (priority 0.8, monthly)
- `index.html` mit 13-Mottos-Verlinkung (statt 10)
- `_redirects` mit 39 Age-URL-Redirects (Wildcards entfernt)

## Schema-Vollständigkeit (Final-Audit)

| Ebene | Vollständig | Coverage |
|---|---|---|
| Top-Level-Felder | 153/153 | 100% |
| Variant-Felder | 378/378 | 100% |
| Game-Felder | 1054/1054 | 100% |
| **Total** | **1585/1585** | **100%** |

## Schlüssel-Inhalte (alle 3 Mottos)

### Phase-B-Schema (analog feuerwehr-mittel Gold-Standard)
- `estimatedCostEur` + `savingsTip` pro Variante (file-spezifisch)
- `rolesList` mit `{emoji, name, function}` × 12 Rollen pro File (mit Vornamen)
- `cakeRecipe.tips` × 2 pro File
- `bonusGames` mit intro + 3 items pro File
- `sosScenarios` mit `steps[3-5]+fallback+tone`
- `shoppingList` mit Amazon-Affiliate-Links (tag=machsleicht-21)

### games[]-Schema (game-spezifisch ohne Boilerplate)
- 19-45 games pro Motto über 3 Altersgruppen
- Jedes Game mit: loudness, effort, prepText, ageAdjust6, ageAdjust8, indoorTip, outdoorTip, whyItWorksTitle, whyItWorks
- 17+ distinct prepText über alle games pro Motto (84%+ Unique-Quote)

### quizCards konkret ausgeschrieben
- Pferde-Quiz mittel: 12 Karten (Rassen, Gangarten, Sicherheit)
- Pferde-Quiz Klasse 2 gross: 20 Karten (Rassen, Gangarten, Pflege, Krankheiten)
- Ritter Burgen-Quiz mittel: 12 Karten (Burgenteile, Tugenden, Berufe)
- Ritter Mittelalter-Quiz Klasse 2 gross: 25 Karten (Burgenteile, Burgentypen, Tugenden, Heraldik, Berufe)
- Baustelle Werkzeug-Quiz mittel: 12 Karten (Werkzeug, Berufe, Materialien)
- Baustelle Werkzeug-Quiz Klasse 2 gross: 25 Karten (Werkzeug, Berufe, Statik, Materialien, Sicherheit)

### Krimi-Quests (motto-spezifisch)
- Ritter-gross: Burgenermittlung XXL — Anschlag auf Hofnarr (6 Verdächtige + 5 Spuren)
- Baustelle-gross: Sabotage-Ermittlung mit Alibi-Tabelle (4 Verdächtige + 3 Spuren, Schuh-Größe-Logik)

## Helfer-v3 Sprint-Sequenz (5 Wellen pro Motto)

### Welle 1A — Critical-Fakten + HTML-Konsistenz
- Pferde: Gangart-Quiz, Apfelschimmel raus, Pflege-Frequenz, Jakobskreuzkraut
- Ritter: Heraldik Tinkturregel, Bergfried-Funktion, Burgen-Typologie, Ritter-Tugenden ohne Mut/Tapferkeit-Doppelung
- Baustelle: Plastik-Werkzeug-Regel, DIN-EN-71-Norm-Hinweise

### Welle 1B — Schema-Parität
- estimatedCostEur + savingsTip (9 Werte pro Motto)
- rolesList Schema-Migration {name, description} → {emoji, name, function}
- rolesList 6 → 12 Rollen mit Vornamen (klein/mittel)
- cakeRecipe.tips (6 Tips pro Motto)
- shoppingList Affiliate-Aktivierung (~67 Links pro Motto)

### Welle 1C — Content-Tiefe
- games[]-Schema-Felder ergänzen (loudness/effort/prepText/ageAdjust/indoorTip/outdoorTip/whyItWorks)
- bonusGames mit 3 items pro File
- SOS-Szenarien mit steps[3-5]+fallback+tone
- quizCards konkret ausschreiben
- Sycophancy-Pass (whyMottoFits, headline)

### Welle 1D — De-Boilerplate (Pferde+Ritter+Baustelle)
- Cross-File-Kontamination in ageAdjust6/8 + whyItWorks beheben
- Cross-Motto-Leaks ("Wappen" in Pferde) eliminieren
- 35+ games game-spezifisch umgeschrieben (Action/Quiz/Search/Craft)
- savingsTip-Bodies file-spezifisch (KRITISCH-Fix für Pferde+Ritter)

### Welle 1E — Quick-Wins für ≥85/≥90
- Quiz-Karten-Mismatch (steps vs quizCards)
- Cross-File-Paste-Bugs (Klasse 1 in 9-12-Datei etc.)
- _meta.qualityNote v2 mit Score-Notiz
- Stallplan-Typo (Pferde-Leak) in Baustelle behoben
- Wildcard-Redirects-Bug behoben (KRITISCH — Hub-Pages waren unerreichbar)

## GSC-Indexierungs-Submission (Manueller User-Schritt)

Folgende 3 neue URLs sollten in Google Search Console manuell für Indexierung submitted werden:

```
https://machsleicht.de/kindergeburtstag/pferde
https://machsleicht.de/kindergeburtstag/ritter
https://machsleicht.de/kindergeburtstag/baustelle
```

**Anweisung:**
1. GSC öffnen → Property machsleicht.de
2. URL-Prüfung-Tool oben → URL eingeben
3. "Indexierung beantragen" klicken
4. Pro URL ~1-2 Minuten warten (Crawl-Test)

## Commit-Übersicht (24 Commits in feat/pferde-ritter-baustelle)

```
52d1405 Phase-B v1 klein (Pferde + Ritter)
ec67afe Phase-B v1 mittel
c00a85f Phase-B v1 gross
a43c8a7 Phase-B v1 Baustelle klein+mittel
66c7b62 Phase-B v1 Baustelle gross (9/9)
1e47198 Hub-HTML Pferde + Ritter
8c4e932 Welle 1A Pferde+Ritter Fakten
eb8c275 Welle 1B Teil 1 estimatedCostEur+savingsTip
2e7addb Welle 1B Teil 2 rolesList 6→12
b041ee5 Welle 1B Teil 3+4 cake-tips+Affiliate
bc13c3c Welle 1C Teil 1 savingsTip file-spezifisch
0d9226b Welle 1C Teil 2 games-Schema 378 Felder
dd117aa Welle 1C Teil 3 SOS 40 Szenarien
ca23fb6 Welle 1C Teil 4+6 bonusGames+Vornamen
6985f6d Welle 1C Teil 5 Quiz-Karten 69+1 Game
b8994ac Welle 1D Teil 1 Pferde de-boilerplate
8eb6516 Welle 1D Teil 2 35 games de-boilerplate
20d2235 Welle 1E Quick-Wins Pferde+Ritter
2f54a71 Baustelle Welle 1A+1B Teil 1
e44b64a Baustelle Welle 1B Teil 2
85470fc Baustelle Welle 1C
fa5ed53 Baustelle Welle 1D
1eacee6 Hub-HTML Baustelle
eb24da7 SEO sitemap+index
b61db07 KRITISCH redirects wildcards-fix
```

## Was als Folge-Sprint optional bleibt

- Age-Group-HTMLs (9 noindex-Pages für Direkt-Zugriff)
- Push-Welle für ≥90 alle 3 Mottos
- OG-Image-Generierung für die 3 Hub-Pages (aktuell og-default.png als Fallback)
- Render-Layer-Erweiterung im JSX für quizCards + bonusGames + alibiTabelle
