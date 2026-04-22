# Session-Notizen

## Letzte Session
**Datum:** 22.04.2026

## Was wurde gemacht

### Strategie-Block (Vormittag/Mittag)
- **Sparring zum Freund-Memo** (Verzettelungs-Kritik): Strategie ist scharf, React-Homepage hatte Implementierungs-Gap zum SEO-Fallback.
- **Portfolio-Matrix als Abschnitt 0.9 in STRATEGIE.md** verankert: 4 Spalten (Kernwette / Testwette / Zukunftswette eingefroren / Optional-Legacy) mit Budget, Trigger-Kriterien und Homepage-Präsenz-Regel.
- **P1-12 komplett umformuliert:** vom interaktiven Einschulungs-Planer (12–18h) zum reinen SEO-Content-Cluster (10–14h). Upgrade-Trigger zum Planer: ≥100 organische Visits/Woche im Juli.
- **18 PBIs in der BACKLOG-AUDIT.md Prio-Tabelle etikettiert:** 14× `[KERN]`, 1× `[TEST]`, 3× `[ZUKUNFT]`, 2× `[LEGACY]`. Grace-Clause für Bestands-Tickets.
- **Flow-Audit-Template** unter `_dev/docs/flow-audit-template.md` — 15 Reibungs-Checkpoints für Selbst-Durchgang.

### Homepage-Refokus + Deploy-Bug (Nachmittag)
- **React-Homepage (`js/index.js`) an SEO-Fallback angeglichen:**
  - Hero „Familienstress? Mach's leicht." → „Kindergeburtstag planen — kostenlos in 10 Minuten"
  - Products-Array von 8 → 4 Kernmodule (Einschulung/Baby/Kreuzworträtsel/Spielkarten raus aus Hauptgrid)
  - Pill-Cloud „Weitere Planer & Tools" mit 8 Sekundär-Items eingefügt
  - „Ein Tool pro Familienanlass." → „Planer, Schatzsuche, Einladung, Partyseite."
  - Eyebrow „Unsere Tools" → „Alles für den Kindergeburtstag"
  - Footer-Tagline + Idee-Card auf Kindergeburtstag-Fokus
- **`index.html` Meta-Tags** (description, og, twitter) auf Kindergeburtstag-Fokus — keine „Einschulung, Baby & Wochenbett"-Reste mehr.
- **Deploy-Katastrophe aufgedeckt:** Nach „Ende deploy" zeigte Live-Site weiterhin alten Code. Diagnose: 8 Netlify-Builds seit gestern Mittag fehlgeschlagen mit `Build script returned non-zero exit code: 2`. Ursache: `netlify/functions/serve-invite.mjs` war seit Commit 4af3456 bei Zeile 54 mitten im Statement abgeschnitten (fehlende 6 Zeilen). Live-Site lief auf altem Cache-Build, alle Zwischencommits (inkl. Einhorn-Komplettierung gestern Abend) waren nie live.
- **Hotfix:** `serve-invite.mjs` repariert, Netlify-Build grün, alle ausstehenden Commits live.
- **validate-all.sh um STUFE 1b erweitert:** `node --check` auf alle `netlify/functions/*.{js,mjs}` — fängt Truncation-Bugs wie diesen sofort ab. Negativ-Test erfolgreich.

### Live-Bugfixes (Abend, nach Sichtkontrolle)
- **„Drei Tools" Subheader** → „Vier Tools, ein Ziel" (hatte sich versteckt seit Partyseite als 4. Vorschau dazukam)
- **Vorschau-Grid 3+1 → 2×2:** `minmax(280px, 1fr)` → `minmax(320px, 1fr)`, Desktop zeigt jetzt sauber 2 Reihen × 2 Karten
- **Plan-Vorschau-Karte getönt:** reines `#fff` → `linear-gradient(145deg, #fef8f0, #fde8d0)`, passend zur Orange-Brand-Familie (verschmolz vorher mit Page-Background)
- **Einladungskarten-Vorschau lesbarer:** Navy in drei Iterationen aufgehellt (finaler Stand `#4a4a6e → #3a3a5a`), Text-Opacities angehoben (Eyebrow 0.4→0.55, Datum/Ort 0.6→0.78, Inner-Box bg 0.08→0.15 + text 0.5→0.78)
- **CTAs aller 4 Vorschau-Karten bottom-aligned:** Karten jetzt `display:flex, flexDirection:column` + CTAs `marginTop:auto` → Buttons bündig am Kartenfuß, unabhängig von Content-Höhe
- **Mobile-Kontrolle:** Bolle hat alles gesichtet, bestätigt „PASST ALLES"

### Deploy-Chronologie
1. `4c92ff7` Strategie-Refokus (Homepage + Meta + Portfolio-Matrix + P1-12)
2. `859747b` Merge auf main — fehlgeschlagen
3. `ce414f2` Trigger-Commit — auch fehlgeschlagen (gleiche Ursache)
4. `1577c8f` Hotfix serve-invite.mjs Truncation
5. `b2b2200` Hotfix-Merge auf main — **ab hier baut Netlify wieder**
6. `4128014` validate-all.sh STUFE 1b (draft only, skip netlify)
7. `334c85b` / `4f1617e` „Vier Tools" + 2x2 Grid
8. `2369613` / `43ab0f3` Plan-Karten-Tint
9. `80eb404` / `3a31761` Einladung-Lesbarkeit
10. `52f5add` / `738de80` CTAs bottom-aligned + Einladung dritte Navy-Stufe

## Nächste Schritte
- **Bolle: Flow-Audit selbst durchgehen** (`_dev/docs/flow-audit-template.md`) → 3 dickste Reibungen als neue `[KERN]`-PBIs
- **OneDrive-Repo lokal reparieren** (alle heutigen Session-Edits liefen aus /tmp, OneDrive-Ordner war kaputt). Alter Ordner löschen, neu klonen — idealerweise außerhalb von OneDrive.
- **Netlify-Notify-Hook einrichten** (Settings → Notifications → Deploy failed → Email an cbollweg@gmx.de). Nie wieder einen Tag lang unbemerkt gebrochene Builds.
- **P1-16 Partyseite Follow-Ups** in nächster Laptop-Session (Cloudflare-Deploy + Email-Test + Foto-Crop + Reply-To)
- **P2-13 Gumroad-Digitalprodukte starten** (Piraten + Dino, je 4h)
- **P2-15 Awin-Anmeldung** (30 Min + 1–3 Tage Warten)
- **P1-8 Safari als nächstes Elite-Motto** (3 Altersgruppen)
- **P1-12 Einschulung-SEO-Cluster** — Launch bis 31.05.

## Offene Fragen
- Reihenfolge Safari-Altersgruppen: auch mit 6-8 starten wie bei Einhorn?
- Awin-Publisher-ID Status?
- Welcher Plausible-Goal-Name für „Einschulung-Cluster Visits" (für P1-12 Trigger-Messung)?
