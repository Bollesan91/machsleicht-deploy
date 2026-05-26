# Session-Notiz — 26.05.2026 (Mottos-Sprint Welle 2-11 + Konsistenz-Audit DEPLOYED)

**Branch:** `feat/pferde-ritter-baustelle` → `main` (Ende deploy)

## Sprint-Ergebnis

**3 neue Mottos auf Elite-Niveau** (Score ≥85 nach Anti-Sycophancy-Korrektur):

| Motto | Welle 4 Start | Welle 10 Final | Welle 11 Konsistenz | Lift |
|-------|---------------|-----------------|----------------------|------|
| 🐴 Pferde | 69 | 85 ELITE | Dim-f 93 → erwartet 95 nach Full-Grep-Beleg | +16 |
| ⚔️ Ritter | 70 | 85 ELITE | Dim-f 90, "letzter Strukturriss zu" | +15 |
| 🏗️ Baustelle | 70 | 85 ELITE | Dim-f 90, "0× Architekten-Prüfung, 17× Bauleiter" | +15 |

## Methodik: Chrome-Helfer-v3

3 unabhängige claude.ai-Tabs (Bolle-Login) als Adversarial-Reviewer mit -7 Anti-Sycophancy-Korrektur.
**Sub-Agent-Verbot konsequent eingehalten** — alle Reviews + Patches durch Haupt-Claude direkt.

## Welle-Übersicht

| Welle | Inhalt |
|-------|--------|
| 2-4 | 9 Age-Pages + 3 Schatzsuche + _redirects + sitemap |
| 5 | Phase-B v2.1 — 5 KRITISCHE Naming-Kollisionen |
| 6 | v2.2 — Mini-Fixes Pferde+Ritter, Baustelle |
| 7 | v2.3 — Reitlehrerin/Team-Modell/2L-Flasche/Sofakissen |
| 8 | v2.4 — 6 Druckvorlagen pro Motto (Differenzierungs-Asset) |
| 9 | v2.5 — Wow-Zeit-Präzision + FAQ-Audit |
| 10 | ELITE-Final (alle 3 erreichten 85) |
| 11 | **Konsistenz-Sweep — User-Audit deckte 30+ Welle-5-Stale-Vorkommen auf** |

## User-Audit Welle 11 (KRITISCH)

User-Frage "ist alles homogen gelöst?" deckte auf:

- **Pferde:** 7 Vorkommen entfernter Karten-Personen (Stallmeister Tom, Tierärztin Hanna, Diagnostikerin Anna) in variants/games/bonusGames blieben nach Welle 5/6 stehen
- **Ritter:** 4× "Burgvogtin" als Bewertende + 1× "Stallmeister-Tafel" (Cross-Motto-Leak)
- **Baustelle:** 25+ "Architekten-Prüfung/Briefing/Wettbewerb/..." (Welle 5 hatte NUR signatureRitual.name geändert)

**Welle 11 Konsistenz-Sweep:** Global-Replace in 3 JSONs, Story-Rollen erhalten (Architektin Mia, Architekt Klaus, Reitlehrerin Mia, Hofnarr Tom).

**Full-Grep-Beleg:** Alle 3 Mottos jetzt 0 Stale-Vorkommen (außer _meta.qualityNote Dokumentation).

## Reviewer-Erkenntnis Welle 11

> _"Mein 'FIXED ✅' in Welle 5 war auf Auszug-Basis zu früh. Dein Audit hat recht, ich lag oberflächlich richtig, real falsch."_ — Baustelle-Reviewer

## Was live geht

- 3 neue Hub-Pages: pferde, ritter, baustelle
- 9 neue Age-Group-Pages
- 3 neue Schatzsuche-Pages
- Erweiterte sitemap.xml (+12 URLs)
- Saubere _redirects (Year-URLs → konkrete Age-Range)
- party-worker.js Security-Hardening (Welle 1A-1E, 5 KRITISCH-Fixes)
- CLAUDE.md Helfer-v3-Direktive (Sub-Agent-Verbot)

## Nächste Schritte

- GSC-Indexing-Push für die 12 neuen URLs
- Reality-Check 7 Tage nach Deploy (Task #19)
- Welle 33 Phase 2/3 (8 Light-Pages auf Elite + 14 Elite-Pages nachrüsten)
- party-worker.js auf Cloudflare deployen (Task #15) — Phase-B Worker-Side-Logic ist die andere Seite vom Security-Sprint
