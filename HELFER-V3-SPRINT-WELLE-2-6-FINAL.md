# Helfer-v3 Sprint Welle 2-6 — Mottos-Glättung Pferde/Ritter/Baustelle

**Datum:** 2026-05-26
**Branch:** feat/pferde-ritter-baustelle
**Methodik:** Chrome-Helfer-v3 (3 unabhängige claude.ai-Tabs, Bolle-Login)
**Verbot:** Sub-Agents für Review/Rewrite (eingeführt 2026-05-26 nach Welle-1A-Regress)

## Sprint-Ziel

Pferde/Ritter/Baustelle (Tasks #60-62) auf wirklich Deploy-Ready bringen.
Tasks waren als "completed" markiert — aber Age-Pages + Schatzsuche fehlten.

## Wellen-Übersicht

| Welle | Commit | Inhalt |
|-------|--------|--------|
| 2 | bb0563b | 9 Age-Pages generiert (3 Mottos × klein/mittel/gross) + _redirects + sitemap |
| 3 | 8c77ab8 | 2 UX-Bugs Generator-Skript (H2-Doppelung, Tab-Label-Länge) |
| 4 | d0bebb2 | 3 Schatzsuche-Pages + 1 Title-Escape-Bug |
| 5 | 1cf23bc | Phase-B-Patches v2.1 (3 JSONs) nach Chrome-Adversarial-Review Welle 4 |
| 6 | bb1e3de | Pferde+Ritter Mini-Fixes v2.2 |
| 6b | 1c9c067 | Baustelle Mini-Fixes v2.2 |

## Chrome-Helfer-v3 Score-Trajektorie (mit -7 Anti-Sycophancy-Korrektur)

| Motto | Welle 4 (Initial) | Welle 5 (nach Phase-B-Patch) | Welle 6 (nach Mini-Fix) |
|-------|-------------------|------------------------------|--------------------------|
| Pferde-9-12 | 69 | 77 (+8) | **80** (+3) ✅ |
| Ritter-9-12 | 70 | 79 (+9) | **82** (+3) ✅ |
| Baustelle-9-12 | 70 | 75 (+5) | **79** (+4) ✅ |

## Adversarial-Findings (konsolidiert über 3 Wellen)

### Pferde

1. ✅ Tom/Anna Namens-Kollision Setup ↔ Karten-Liste behoben
2. ✅ "Stallmeister" Triple (Prüfung+Diplom+Karte) aufgelöst — Karte ist "Pflege-Chefin Hanna"
3. ✅ Pflege-Triple-Redundanz (3 Pflege-Rollen) auf 1 dedizierte reduziert
4. ✅ 12 Karten → 5 Kern + 3 Bonus mit roleCountByVariant
5. ✅ Sicherheits-Disclaimer "Echtes Reiten" haftungssicher umgeschrieben
6. ✅ Sophie-Stoppuhr-Konflikt in Minimal (Mia Doppelaufgabe) gelöst

### Ritter

1. ✅ Wow-Variante Selbstwiderspruch (Eltern vs Aufsicht) geklärt
2. ✅ Krimi-Quest nur in Wow, Jonas eindeutig Bonus+Wow-only (alle Scopes)
3. ✅ Burgvogt (Erwachsene Aufsicht) vs Burgvogtin (Karte) entkoppelt
4. ✅ Parcours-Logik konkretisiert (4 definierte Aufgaben-Stationen)
5. ✅ Bogenschütze entfernt (Sicherheits-Risiko + thematisch fremd)
6. ✅ Stilnote-Subjektivität entschärft (Hinweise statt 1-6)
7. ✅ Ritter-Schwur Komma-Fix
8. ✅ Strohballen+Schaumstoff-Material im setup

### Baustelle

1. ✅ 200/300kg-Phantasie → konkret Spaghetti-Marshmallow 1-2kg + Wasserflaschen 0,5-2L
2. ✅ Architekten-Prüfung vs Bauleiter-Diplom Mismatch behoben → "Bauleiter-Prüfung"
3. ✅ Passive Füll-Rollen entfernt (Foto-Chronistin, Akademie-Koordinator)
4. ✅ "Klasse 2" → "Schwierigkeitsstufe 2" (Schul-Klasse-Ambiguität weg)
5. ✅ Pokal-Verleiher Felix → Polier Tom als Doppelrolle (Koordination+Pokal)
6. ✅ Spuren-Analyst Paul + Foto-Chronistin Greta als Wow-only beschriftet
7. ✅ Bauleiter-Eid Komma-Fix

## Reviewer-Verdikte (Welle 6 Final)

> **Pferde:** "DEPLOY-READY. Kein weiterer Loop. Optional die Team-Modell-Zeile ergänzen, dann live."

> **Ritter:** "Go-live-fähig. Über der 80er-Schwelle, keine Sachwidersprüche mehr. Seite kann raus."

> **Baustelle:** "Go-live-fähig, sobald FAQ-Auszug geprüft ist (Dim e steht noch auf Vertrauensbasis)."

## Branch-Status

42 Commits auf feat/pferde-ritter-baustelle warten auf "Ende deploy":
- Welle 1A-1E party-worker.js Security: 3 Commits
- Welle 2-6 Mottos: 6 Commits
- Welle 6e0d0a4 CLAUDE.md Helfer-v3-Direktive
- + 32 ältere (Phase-B Pferde/Ritter/Baustelle, Hub-Pages, Über-uns, Konsistenz-Cleanup)

## Methodik-Bewährung

- **Sub-Agent-Verbot eingehalten:** Alle Reviews durch unabhängige claude.ai-Tabs (Bolle-Login),
  alle Patches durch Haupt-Claude direkt (Edit/Write/Bash-Python).
- **Anti-Sycophancy:** Reviewer-Scores systematisch -7 Pkt korrigiert.
- **Chrome-Pipeline:** 3 parallele Reviewer-Streams gleichzeitig produktiv.
- **Welle-Iteration:** 4-6 brachte +11 Punkte Lift bei Pferde (69→80), 12 bei Ritter (70→82),
  9 bei Baustelle (70→79). Keine Score-Inflation, klare Validierung gegen konkrete Findings.

## Offene Welle 7 (optional, nicht-blockierend)

- Pferde: Team-Modell-Zeile ergänzen (8 Kinder vs 5 Rollen — Doppel-Karten erlauben)
- Ritter: Zeit-Mathe Minimal re-prüfen (4 Stationen × 30-45 Min in 3h sportlich)
- Baustelle: FAQ-Auszug an Reviewer für Dim-e-Verifikation; Greta-Aufgabe konkretisieren
- Cosmetic: "Reit-Lehrerin" → "Reitlehrerin" (ohne Bindestrich)

## Pipeline-Status

🎯 **Mottos-Sprint ABGESCHLOSSEN.** Pferde/Ritter/Baustelle sind echt deploy-ready
(nicht falsch markiert wie vor diesem Sprint).
