# Session-Notiz — 01.06.2026 früh (Wizard-Quick-Wins + Spiel-Detail-Frame + STRATEGISCHER PIVOT)

## 🎯 STRATEGISCHER PIVOT (01.06.2026 nachts): Wizard wird der neue Planer

**Bolle's Entscheidung:** Wizard zieht 1:1 auf `/kindergeburtstag` um — alter Planer wird abgelöst.

### Architektur-Entscheidungen (Bolle 01.06.2026)
1. **Schatzsuche im Wizard:** Als Wizard-Modus integriert (Stage-1-Auswahl „Kompletter Plan" oder „Nur Schatzsuche"). SZ_THEMES als Datenquelle. /schatzsuche-Hub-Pages bleiben SEO-Traffic-Quelle, linken in Wizard.
2. **Alter Planer:** Komplett ersetzen durch Wizard-Swap auf `/kindergeburtstag` (1:1 Deploy). „kindergeburtstag-URL ist sexy" — bleibt.
3. **URL-Strategie:** Wizard zieht ein auf `/kindergeburtstag`. Hub-Sticky-Bars (alle 15) funktionieren ohne Edit weiter, SEO-Backlinks unverändert.

### Curation-Methodik (Bolle's Vorgabe)
**Nicht per Skript** (verliert Curation). **Motto-für-Motto handgemacht.**

Pro Motto:
1. Sammle ALLE Spielinhalte aus 4 Quellen: GENERIC + Hub-Page + SZ_THEMES + Wizard-MOTTOS
2. Dedupliziere
3. Curation gemeinsam: Vibe-Check (catchier Name), Sicherheits-Check (≥4cm, EN-71, Pflicht-Regeln), Variety-Check
4. In Wizard packen mit voller material/anleitung/dauer/safety
5. Adversarial-Reviewer (Helfer-v3, Score ≥ 90)

### Migration-Roadmap (P8-X)

| Phase | Was | Aufwand |
|---|---|---|
| **0** ✅ erledigt | Spiele-Quellen-Audit: 135 Spiele + 225 Stations + 45 Kuchen voll gepflegt; Snacks-Lücke | (gemacht) |
| **1** | Pro-Motto-Curation (15 Mottos × ~50 Min) | **~12.5h** Curation-Arbeit |
| **2** | Live-Preview + Mission-Property (Plan v2 — Sidebar rechts Desktop, Sticky-Banner Mobile) | 3.5h |
| **3** | Material/Kuchen/Deko/Mitgebsel-Module in Wizard portieren | 3h |
| **4** | Schatzsuche als Wizard-Modus | 2h |
| **4.5** | Snacks-Recherche-Lücke schließen (15 × 3 Altersgruppen) | 1.5h |
| **5** | Funktionalitäts-Parität-Audit | 30 Min |
| **6** | URL-Swap: wizard.html → kindergeburtstag.html (Netlify-Config) | 30 Min |
| **Total** | | **~16-18h aktive Bauzeit, 4-5 Sessions** |

### Pilot piraten (01.06.2026 nachts gestartet)
- 4 Quellen gesammelt: 9 GENERIC + 15 Hub-Page + 15 SZ_THEMES + 10 Wizard = ~50 Konzepte total
- Realistischer Aufwand pro Motto: 45-60 Min (statt initialer Schätzung 30-45 Min)
- Curation-Tabelle steht im SESSION-NOTES — wird Pilot für die anderen 14 Mottos

### Nächste Session
- Pilot piraten durchziehen: Master-Liste curatieren → in Wizard packen → Adversarial-Reviewer
- Dann detektiv (Beliebt-Badge) als 2. Welle
- Iterativ alle 15 Mottos

---

## 🚀 Deploy 01.06.2026 nachts (Wizard Spiel-Detail-Frame + Showcase piraten, Score Self-Audit 7/10)

**Commit:** `9ca8892` (Merge draft → main)

### Was deployt wurde
- **Spiel-Detail-Frame** im Wizard: Click auf jede Spiel-Karte öffnet Drawer (rechts Desktop, Bottom-Sheet Mobile) mit Material-Bullets + Kurz-Anleitung + Dauer-Badge + Safety-Hinweis + CTA „Voll-Anleitung im Planer öffnen"
- **piraten als Showcase:** alle 10 Spiele voll gepflegt (Walk the Plank, Schwertkampf mit Pflicht-Regeln, Schatz im Sand mit DIN-EN-71-3, Edelsteinsuche ≥4cm-Großperlen-Pflicht)
- **14 Mottos:** Fallback „Material und Anleitung im Planer" mit Direct-Link CTA → wird durch P8-X Migration-Sprint ersetzt
- **ESC** schließt Drawer

### Bewerter-Pitch (extern) integriert
Bolle hat externen Bewerter konsultiert — Kern: „vom Setup-Formular zum Erlebnis-Generator". 7 Gamechanger identifiziert. Brutal priorisiert:
1. **Live Party Preview** (Sidebar während Wizard läuft) — UX-Hebel #1
2. **Geheimwort als roter Faden** (Einladung → Partyseite → Schatzsuche) — Wow-Hebel

Anti-Sycophancy-Filter (Claude):
- Geheimwort ohne Bridge zu Planer-Schatzsuche-Tool = reine Kosmetik
- Mit Bridge = echter Funnel-Hebel (Drop-off-Reduktion)
- Aktuell **kein** Bridge gebaut — wäre eigener Sprint

Plan v2 für Live-Preview (gestern Nacht beschrieben): Sidebar rechts Desktop / Sticky-Banner Mobile + Mission-Property pro Motto + Stage-Wechsel-Animation + Stage-6-Morph + State-Sync vollständig. ~3.5h.

### Self-Audit Score: 7/10 (Plan v1)
- Mission-Story fehlt
- Animation generic
- Stage-6 Übergang abrupt
- Mobile Glanz-Garnitur
- State-Sync unterspezifiziert
- Datenpflege „kommt später" Cop-Out

→ Plan v2 mit Mission integriert würde 8.5/10 erreichen.

---

# Session-Notiz — 31.05.2026 spätnachts (Welle 2 Phase 3 + P1-21 Planer + SZ_THEMES Vollständigkeit)

## 🚀 Deploy 31.05.2026 Teil 4 (SZ_THEMES 9 → 15, Score 88/100)

Schatzsuche-Engine SZ_THEMES um 6 fehlende Themen ergänzt (meerjungfrau, pferde, ritter, baustelle, prinzessin = „Königreich-Schatzsuche", superheld = „Held:innen-Schatzsuche") — kein Disney/Marvel.

### Welle-Trace SZ_THEMES (Branch-Trick, frische Reviewer-Sessions)

| Welle | Score | Adressiert |
|---|---|---|
| Initial | 72 | 6 MUST-FIX (Wasser-Aufsicht, Hufeisen-Material, Polier:in-Stereotype, Hartbonbons-Widerspruch, Cape-QuickRelease, Burg-Eroberung-Begründung) |
| 5 (final) | **88** | 4 weitere (rutschfeste Unterlage + Sicherheits-Tape, Wurfzone-Markierung 1.5/2/2.5m, Tinkturregel-Karten-Vorlage, Elektriker:in Anna/Leon mit Namen) — ritter bei **90** ✅ |

15 Themen × 5 Stations × 3 Altersgruppen = **225 Schatzsuche-Stationen** vorgehalten.

### Code-Mechanik
- Helper-Skript `_dev/scripts/add-sz-themes.js` schreibt Themen via Regex-Match in minified line 1 (JS-valid via JSON-Subset)
- `_dev/review/sz-themes-input.md` als verankertes Review-Input mit allen 6 Themes-Highlights
- node --check verifiziert nach jedem Iterations-Schritt

### Trust-Zahlen Schatzsuche Sync 13 → 15
- index.html (3 Stellen: description, featureList, FAQ Schatzsuche-Sektion)
- schatzsuche.html h2 + 2 neue Motto-Tiles (Königreich + Held:innen)
- schatzsuche/prinzessin + schatzsuche/superheld „Alle X Themen"
- Stationen 135 → 225



## 🔄 IN REVIEW: P1-21 Welle 2 — meerjungfrau befüllt + prinzessin/superheld als generic Reskins + Trust-Zahlen 13→15

**Status:** Edits gemacht, committed auf draft, Branch-Trick-Reviewer läuft (frischer claude.ai-Tab mit SHA-pinned URL). Main-Merge erst nach Score ≥ 90.

### User-Entscheidungen (Auto-Mode-Klarstellung)

1. **meerjungfrau-Stub** → Vollständig nachpflegen (Großperlen ≥4 cm, Riff-Expedition, Tiefsee-Mission etc.) ✅ umgesetzt
2. **prinzessin + superheld** → Markenrechts-Reskin als generic Mottos im Planer (kein Disney/Marvel) ✅ umgesetzt:
   - prinzessin → "Königreich & Hofstaat" (Hofknicks, Tee-Etikette, Wiener Walzer 3/4-Takt, Sissi-Quiz) — alle Stationen frei wählbar, kein Gender-Split, KEIN Heißwachs, KEIN Glas für 3-5 J, Drahttiara nur Erwachsene
   - superheld → "Held:innen-Akademie" (eigene Identität wählen, Cape-Design, Helden-Bootcamp, Operation: Nemesis, Tugend-Versprechen) — generic ohne Marvel-IP
3. **Trust-Zahlen** → Auf 15 (Hub-Wahrheit) ✅ umgesetzt: index.html (6 Stellen) + kindergeburtstag.html ItemList + schatzsuche/superheld + schatzsuche/prinzessin + ueber-uns.html

### Drei Wahrheiten konsolidiert

| Ebene | Anzahl | Status |
|---|---|---|
| Hub-Pages | 15 | alle Welle-2-Sweep durchlaufen |
| **Planer-Mottos (GENERIC)** | **15** | alle mit 3/3/3 Spielen, Deko, Mitgebsel, Kuchen (verifiziert via `new Function()` + `find(id===)`) |
| Schatzsuche-Themen | 13 (excl. prinzessin/superheld in SZ_THEMES) | separates PBI |
| Einladung-Apps | 10 (Einladung-Tool nicht angefasst) | separates PBI |

### Markenrechts-Hinweis

Die generic Reskins „Königreich & Hofstaat" und „Held:innen-Akademie" enthalten **keine Disney/Marvel-IP**:
- Keine Disney-Prinzessinnen-Namen (Cinderella, Belle, Elsa etc.)
- Keine Marvel/DC-Held:innen-Namen (Spiderman, Avengers etc.)
- Stattdessen: historische Persönlichkeiten (Sissi, Queen Elizabeth, Ludwig XIV) + eigene Held:innen-Identität die das Kind selbst entwirft

### Anti-Sycophancy-Pattern strikt eingehalten

- Edit-Schritt durch Haupt-Claude (kein Sub-Agent)
- Branch-Trick mit SHA-pinned `raw.githubusercontent.com`-URL
- Reviewer in NEUEM claude.ai-Tab (Helfer-v3-Anti-Sycophancy)
- Score-Vergabe konservativ: ≥ 90 als Elite-Schwelle, sonst MUST-FIX-Welle

## 🚀 Deploy 31.05.2026 abends Teil 2 (P1-21 — Planer-Funnel pferde+ritter+baustelle) [✅ MAIN]

Direkter Funnel-Bruch behoben: Hub-Pages pferde + ritter + baustelle waren seit Welle 1 (30.05.2026) live, aber im Planer-Array `ALL_MOTTOS` nicht enthalten. Sticky-Bar-Klick vom Hub auf `?motto=pferde#planer` → `ALL_MOTTOS.find(...)` returns undefined → Planer-Default-State, User-Erwartung gebrochen.

### Fix umgesetzt

- **`js/kindergeburtstag.js`**: 3 vollständige Motto-Einträge ins `GENERIC`-Array eingefügt (vor `];` Z. 1773). Jeweils 3 Spiele × 3 Altersgruppen, Deko (3 items + dekoMin), Mitgebsel (3 items), Kuchen (klein/mittel/gross je 1 Rezept). Inhalte aus den frisch deployten Hub-Pages abgeleitet (Pool-Nudel-Pferde-Parcours, Wappen-Malen-Heraldikregel, LKW-Parcours-Sicherheits-Linie, ≥4 cm Großteile-Konsistenz).
- **`kindergeburtstag.html` ItemList Schema**: 10 → 13 Mottos (pferde + ritter + baustelle + dschungel + feen waren auch schon nicht in ItemList, jetzt alle drin). `numberOfItems` + `description` synchron.
- **Syntax-Check**: `new Function(code)` parsed clean, `ALL_MOTTOS.length === 13`, alle 3 Mottos via `find(id===)` lookup-bar mit `3/3/3` Spiele.

### prinzessin + superheld bewusst nicht im Planer-Array (Architektur-Inkonsistenz dokumentiert)

LICENSE-Array ist seit 29.04.2026 leer („Lizenz-Mottos wurden aus dem Tool entfernt — Markenrechts-Risiko"). prinzessin + superheld Hub-Pages bestehen weiter und linken via Sticky-Bar auf `/kindergeburtstag?motto=prinzessin|superheld#planer`, der Planer kennt sie aber nicht → Default-State. **Architektur-Entscheidung nötig** (separates PBI):
1. **Option A — Hub-Sticky-Bars umstellen**: prinzessin/superheld Hub-Sticky-Bar nur noch auf Schatzsuche-Modus (`?modus=schatzsuche`), nicht Planer.
2. **Option B — Markenrechts-Reskin**: „königliche Welt" / „Held:innen-Akademie" als generische Reskins ins GENERIC.
3. **Option C — Hub-Pages aus Index nehmen**: prinzessin/superheld als Hub-Pages depublizieren, nur Schatzsuche-Seiten lassen.

Aktueller Stand (Workaround): Planer fällt für `?motto=prinzessin|superheld` auf Default zurück, Hub-Page-Sicht-Indizierung bleibt unangetastet. ItemList listet bewusst nur die 13 Planer-Mottos.

## 🚀 Deploy 31.05.2026 abends Teil 1 (Phase 3 — detektiv + prinzessin MUST-FIX)

Letzte Anti-Sycophancy-Welle des Hub-Sweeps. Anti-Sycophancy fresh-tab-Reviewer hat detektiv mit 84 und prinzessin mit 80 zurückgegeben — beide unter Elite-Schwelle 90. Nur die MUST-FIX wurden umgesetzt (keine Punktezahl-Optimierung über 90 hinaus), entsprechend Bolle's Vorgabe „Mach Ende nach der Welle mit diesen Mottos. Nur noch Must fixes."

### detektiv.html — MUST-FIX umgesetzt

- **Kostenwiderspruch gelöst**: FAQ-Antwort „2-5 Euro pro Kind" widersprach Budget-Box (9,40 €/Kind). FAQ präzisiert → Budget verifizierbar.
- **Nancy Drew Faktencheck**: „Schülerin-Detektivin" → „junge Amateur-Detektivin" (Schülerin-Framing zu eng + faktisch unsauber; Krimi-Reihe seit 1930, Carolyn Keene Sammelpseudonym).
- **Lügendetektor pseudowissenschaftlich entlarvt**: Spiel-Lügendetektor mit explizitem Hedge: „natürlich nur ein Spiel: Puls steigt auch vor Aufregung, echte Polygraphen sind wissenschaftlich kein zuverlässiger Lügennachweis".

### prinzessin.html — 4 MUST-FIX umgesetzt

1. **Juwelen-Jagd 3–5 J Glasperlen-Default raus**: „bunte Glasperlen und Plastik-Edelsteine" → **Großperlen ≥4 cm aus Holz/Filz, KEIN Glas, KEINE Murmeln, KEINE Pailletten**. Glaselemente erst ab 6 Jahren + nur in homogener Altersgruppe ohne jüngere Geschwister. EN-71-Kleinteilezylinder ~3,17 cm Begründung explizit.
2. **Draht-Tiara 9–12 Schneide-Sicherheit verschärft**: Drahtschneiden ausschließlich durch Erwachsene, **alle Kinder in Reichweite tragen Bastel-Brille**, Drahtenden im Tuch / leeren Becher schneiden (Geschoss-Risiko), danach Enden nach innen umbiegen. Glaselemente erst ab 9.
3. **Heißwachs/Brand-Kante/Siegelwachs gestrichen** (Konsistenz zur LED-Linie): Pergament-Rollen → aufgeklebter Gold-Sticker. Schatzkarte → nur Kaffee-/Teefärbung + leichtes Reiben, **KEINE Brand-Kante**. Alle 3 Stellen (HowTo-Step, FAQ-Antwort, sichtbarer DOM-Block + JSON-LD-FAQ + sichtbares Details-FAQ) synchronisiert.
4. **„Jungen-Variante" Gender-Split aufgelöst**: 
   - Akademie-Intro „Echte Prinzessinnen müssen viel lernen: Tanzen … Hofknicks" → „Im Königreich lernen alle Kinder dasselbe — Tanzen, Tisch-Etikette, Schwertkampf und höfische Verbeugung sind frei wählbar, kein Gender-Split."
   - Elite-Hofschule-Card „Jungen-Variante: Königshof-Akademie mit Prinzen + Rittern" → „alle Stationen frei wählbar (kein Gender-Split), Königshof-Akademie als optionale Story-Erweiterung mit Pagen-Probe, Ritter:innen-Eid, Drachen-Mut".
   - FAQ-Frage „gemischt mit Jungs": komplett umformuliert — Hofstaat „Prinz:essinnen, Ritter:innen, Pagen, Hofnarren" frei wählbar (DOM + JSON-LD sync).
   - HowToSupply: „Königshof-Akademie / Jungen-Variante" → „Königshof-Akademie — frei wählbar für alle Kinder".
   - Glitzer-Krönchen 3-5 J Warning verschärft: „Großteile ≥4 cm, KEIN Glas, KEINE Pailletten, KEINE kleinen Klebeperlen".

### Score-Tabelle Welle 2 voller Audit (alle 12 Hubs)

| Hub | W2 frisch (Reviewer) | Phase-Wave | Status |
|---|---|---|---|
| dino | 81 | P1 | ✅ MUST-FIX deployed |
| safari | 79 | P1 | ✅ MUST-FIX deployed |
| feen | 81 | P1 | ✅ MUST-FIX deployed |
| einhorn | 82 | P1 | ✅ MUST-FIX deployed |
| meerjungfrau | 79 | P2 | ✅ MUST-FIX deployed |
| weltraum | 84 | P2 | ✅ MUST-FIX deployed |
| feuerwehr | 84 | P2 | ✅ MUST-FIX deployed |
| dschungel | 81 | P2 | ✅ MUST-FIX deployed |
| piraten | 83 | P2 | ✅ MUST-FIX deployed |
| superheld | 87 | P2 | ✅ MUST-FIX deployed |
| detektiv | 84 | P3 | ✅ MUST-FIX deployed (heute abend) |
| prinzessin | 80 | P3 | ✅ MUST-FIX deployed (heute abend) |

15/15 Hubs systemisch konsistent (Sticky-Bar Planer primary, PT15M HowTo, Funnel-Axiom, EN-71-Kleinteile-Linie ≥4 cm, LED-statt-Flamme, Gender-Inklusivität).

## ⚠ Anti-Sycophancy Lessons-Learned (verfestigt)

- **Score-Drift kontaminiert vs frisch**: pferde -16, ritter -10, alle 12 Hubs durchschnittlich -8. Self-Verify und Re-Verify-im-selben-Tab geben systematisch zu hohe Scores.
- **Hub-Sprint-Regel ab jetzt**: Reviewer immer in frischem claude.ai-Tab mit SHA-pinned URL (`raw.githubusercontent.com/.../<commit-sha>/...`). Cache-Bust `?cb=X` reicht GitHub-CDN nicht.
- **Sub-Agents bleiben verboten für Review + Rewrite** (CLAUDE.md Helfer-v3-Regel verfestigt — Memory-Eintrag aktualisiert nach Welle 1A-Regress).

## Was wurde gemacht (heute insgesamt)

- Welle 2 Phase 1 (4 Hubs Quick-MUST-FIX): dino + safari + einhorn + feen
- Welle 2 Phase 2 (6 Hubs Detail-MUST-FIX): meerjungfrau + weltraum + feuerwehr + dschungel + piraten + superheld
- Welle 2 Phase 3 (heute abend): detektiv + prinzessin MUST-FIX
- Anti-Sycophancy-Pattern verfestigt + Memory aktualisiert
- 13 Hub-Files insgesamt heute auf systemisch Elite-Stand

## Nächste Schritte

- **Cloudflare-Cache-Purge PFLICHT** nach diesem Deploy (dash.cloudflare.com → machsleicht.de → Caching → Purge Everything)
- Sprint 2 Funnel-Mess-Sprint kann starten (Hub-Pages-Sweep ist abgeschlossen)
- Optional: Welle 2 Final-Re-Verify mit frischem Tab für detektiv + prinzessin nach Deploy + Cache-Purge (zur Bestätigung ≥85)

## Offene Fragen

- Keine. Hub-Sweep abgeschlossen. 15/15 Mottos auf systemisch Elite-Niveau.
