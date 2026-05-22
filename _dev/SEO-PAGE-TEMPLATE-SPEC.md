# SEO-Page Elite-Template Spec (kindergeburtstag/<motto>-<age>.html)

**Living-Referenz** für alle Motto-Age-SEO-Pages. Stand: 22.05.2026, Welle 33.

**Lebendige Vorlage:** `kindergeburtstag/detektiv-6-8-jahre.html` — der konsolidierte Standard. Wenn diese Spec und die HTML auseinanderlaufen, ist die HTML die Wahrheit; diese Spec wird nachgezogen.

## Datenquelle

Jede SEO-Page hat genau **eine Phase-B JSON** als Quelle: `_src/elite-motto-data/<motto>-<size>.json`, wobei `<size>` = klein (3-5), mittel (6-8) oder gross (9-12).

Diese JSONs sind nach 32 Wellen Helfer-v3 sauber. Wenn etwas in der HTML steht, muss es im JSON belegt sein. Inhalte erfinden ist verboten.

## Section-Reihenfolge (12 H2-Sections + Header/Footer)

```
─── HEAD ────────────────────────────────────────────
1. <meta>-Block (title, description, og:*, twitter:*, theme-color, canonical)
2. Schema.org HowTo (totalTime in PT-Format der Standard-Variante, NICHT PT10M)
3. <style>-Block (motto-spezifische --a Color-Variable)

─── BODY ────────────────────────────────────────────
4. Header (Logo + Breadcrumb)
5. H1 + Intro-Paragraph
6. CTA "Planer starten"
7. Age-Intro-Box (ageInsight.traits → ul mit 7 Punkten)
8. Tip-Box "Warum [Motto] für [Alter] perfekt funktioniert"

─── 12 H2-SEKTIONEN ─────────────────────────────────
1.  3 [Thema]-Varianten — wähl dein Level
    └─ variant-tabs + 3 variant-panels (Minimal/Standard/Wow)
       Jeder Panel: Zeitplan-Timeline → Spiele-Detail-Cards (h4 mit „— Spielanleitung")
                  → Essen → Deko → Mitgebsel → Einkaufsliste → Cost-Box

2.  [Motto]-Ritual (Anker für alle 3 Varianten)              ← signatureRitual
    └─ ritual-box mit setupSteps, rolesList, optOutNote

3.  [Motto]-Kuchen / -Torte — Rezept                          ← cakeRecipe
    └─ 6 recipe-steps + Aufwand/Kosten/Allergiker-Note

4.  📚 Was die Kinder nebenbei lernen                         ← ageInsight + parentTips
    └─ Card mit Lead-Paragraph + 6 Kompetenzen mit Motto-Anker

5.  💡 Eltern-Tipps                                           ← parentTips.structured
    └─ 6 Tip-Boxen

6.  🗓️ Vorbereitungs-Fahrplan                                 ← preparationWeeks
    └─ 6 Etappen-Cards: 4Wo/2Wo/1Wo/2T/1T/Tag X
       Jede H3 mit ⏱ Aufwand-Angabe (45 Min / 30 Min / 1,5 Std / 2,5 Std / 1 Std / 45 Min)

7.  🆘 SOS-Plan / Notfall-Plan                                ← sosScenarios
    └─ sos-grid mit 5 Items (Regen, weniger Kinder, mehr Kinder, Kind verweigert, Kuchen misslungen)

8.  💌 Einladung für den [Motto]-Geburtstag                   ← invitationTemplate
    └─ Card mit Beispiel-Text + CTA "Einladung erstellen"

9.  [Motto] für andere Altersgruppen
    └─ 3 Buttons (Übersicht + 2 andere Altersgruppen)

10. 🎯 Ähnliche Mottos für [Alter]
    └─ 4 Buttons mit thematischer Gruppierung (z.B. "Rätsel" + "Abenteuer")

11. ❓ Häufige Fragen zum [Motto]-Geburtstag                  ← faq
    └─ 6-8 <details>-Blöcke + Schema.org FAQPage

12. Final-CTA "Kompletten [Motto]-Geburtstag planen — in 10 Min"

─── FOOTER ──────────────────────────────────────────
13. Footer (Impressum/Datenschutz/Transparenz-Links)
14. Sticky-CTA (Einladung / Partyseite / Planer)
15. Scripts (showVariant + Plausible/Umami-Tracking)
```

## Pflicht-Felder pro Section

### Variant-Panels (3x: Minimal / Standard / Wow)

- **Zeitplan-Timeline:** Header mit Uhrzeit-Fenster + Kinderzahl konsistent mit JSON `timeWindow`. Slots-Summe muss zum Header passen (keine Mathe-Drift).
- **Game-Detail-Cards (h4 + " — Spielanleitung"):** Material, Anleitung, Sicherheit (`game-safety` Box bei YMYL-relevanten Spielen wie Feuer/Hitze/Lebensmittel).
- **Cost-Box:** Geschätzte Kosten + Pro-Kind-Wert (24-Kinder-Annahme NICHT, sondern variant-spezifisch — Min: 6, Std: 8, Wow: 8-10).

### Affiliate-Links

- Format: `<a href="https://www.amazon.de/s?k=SUCHBEGRIFF&tag=machsleicht-21" target="_blank" rel="noopener sponsored">Link-Text*</a>`
- Disclosure am Variant-Ende: `* Affiliate-Links. Für dich ändert sich der Preis nicht.`
- AWIN-Links nur bei Bedarf (siehe `party-worker.js` AFFILIATE_RULES).

### Schema.org

- **HowTo:** name + description + 5 HowToSteps + tool (machsleicht-Planer) + `totalTime` als ISO-8601 (PT3H typisch, NICHT PT10M).
- **FAQPage:** mainEntity[] mit 6-8 Q&A (kann eine Teilmenge der visible FAQ sein).

### Variant-Tab-Emojis

- **Standard:** 🌿 Minimal / 🎯 Standard / ✨ Wow
- **Motto-thematisch erlaubt** bei stark thematischen Mottos:
  - Meerjungfrau: 🌊 Minimal
  - Einhorn: ⚡ Minimal
- Einheitlich Unicode-Emoji, NICHT HTML-Entities (`&#x1F33F;` → 🌿).

## Motto-Color-Map

Aus `party-worker.js` THEMES:

| Motto | --a Color | Hex |
|-------|-----------|-----|
| piraten | Indigo | #5C6BC0 oder klassisch #8B4513 (braun-thematisch) |
| dino | Grün | #4CAF50 |
| safari | Orange | #F57F17 |
| weltraum | Blau | #1565C0 |
| detektiv | Blue-Gray | **#546E7A** ← Pilot |
| feuerwehr | Rot | #D32F2F |
| einhorn | Violett | #AB47BC |
| meerjungfrau | Cyan | #00ACC1 |

## Anti-Patterns (vermeiden)

- ❌ `0 altersgerechte Spiele` (Build-Bug — Quelle JSON prüfen)
- ❌ `<ul></ul>` leer (Build-Bug)
- ❌ HTML-Entities statt Unicode-Emoji
- ❌ `totalTime: PT10M` (Plan-Dauer ≠ Party-Dauer)
- ❌ `onclick="showVariant('id')"` ohne explizites event-Argument
- ❌ Marken-IP (Sherlock Holmes, TKKG, Drei Fragezeichen, BBC, Disney, M&Ms — siehe Welle-32-Sanitization-Liste)
- ❌ „Bügeleisen" bei 6–8 Geheimtinte (Verbrennungsgefahr — Föhn mittel oder Backofen-Restwärme stattdessen)
- ❌ Erfundene Fakten ohne JSON-Beleg

## Quality-Gate

Vor jedem Push:
1. **Helfer-v3 Adversarial-Review:** Score ≥ 90/100
2. **JSON-LD valid:** beide Blöcke (HowTo + FAQPage) durch `json.loads()` ohne Fehler
3. **PAT clean:** kein `ghp_*` oder `github_pat_*` in `.git/config`
4. **Anti-IP-grep:** alle Welle-32-Marken sind 0 Treffer

## Page-Status-Matrix (Stand 22.05.2026 Nacht)

| Motto | 3-5 | 6-8 | 9-12 | Status |
|-------|-----|-----|------|--------|
| einhorn | 🟢 | 🟢 | 🟢 | Elite, Ritual fehlt 6-8 + 9-12 |
| safari | 🟢 | 🟢 | 🟢 | Elite, Ritual fehlt überall |
| dino | 🟢 | 🟢 | 🟢 | Elite, Ritual fehlt überall |
| meerjungfrau | 🟢 | 🟢🌟 | 🟢 | Elite, 6-8 = inoffizieller Goldstandard mit Lernen+Fahrplan+SOS |
| detektiv | 🔴 | 🟢🌟 | 🔴 | 6-8 ist NEUER Goldstandard (Pilot Welle 33). 3-5 + 9-12 sind echte Bugs („0 Spiele") |
| piraten | 🟡 | 🟢 | 🟡 | 6-8 Elite, 3-5+9-12 Light-Template |
| feuerwehr | 🟡 | 🟡 | 🟡 | Alle Light-Template (befüllt, aber einfach) |
| weltraum | 🟡 | 🟡 | 🟡 | Alle Light-Template (befüllt, aber einfach) |

**🌟 = konsolidierter Goldstandard (Vorlage)**

## Rollout-Reihenfolge (Welle 33+)

1. ✅ **Welle 33 Phase 0:** Detektiv-6-8 als Spec-Anker (DONE, commit `0cadef1`, Score 95/100)
2. **Phase 1:** 2 echte Bugs retten (detektiv-3-5 + detektiv-9-12) — ~6h
3. **Phase 2:** 8 Light-Pages auf Elite heben (piraten 3-5/9-12, feuerwehr 3x, weltraum 3x) — ~24h
4. **Phase 3:** 14 bestehende Elite-Pages mit fehlenden Sektionen nachrüsten (Ritual + Lernen + Fahrplan + SOS) — ~14h

Total ~44h für 24/24 Pages auf konsolidiertem Standard.

## Pro-Page-Workflow (Standard 2-3h)

1. JSON-Quelle inspizieren (`_src/elite-motto-data/<motto>-<size>.json`)
2. Detektiv-6-8 als Template kopieren
3. Section-für-Section Content aus JSON übertragen
4. Color-Variable + Variant-Tab-Emojis + Schema.org HowTo anpassen
5. Anti-IP-Grep + Schema-Validate
6. Helfer-v3 Adversarial-Review (general-purpose Agent, nicht Explore — Explore-Budget zu klein)
7. Fixes iterieren bis Score ≥ 90
8. Commit auf `feat/<motto>-<size>-elite` (oder bei Bulk: `feat/seo-rollout-phase-N`)
9. PAT clean prüfen
10. Push + PR

Diese Spec wird bei Bedarf nach Phase-1-Erfahrungen aktualisiert.
