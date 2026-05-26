# Content-Loop Pipeline — machsleicht.de

3-Chat-Pipeline (Writer + Reviewer + Adversarial) für SEO-Content-Produktion. Pilot = Claude Code orchestriert via `/loop dynamic` + ScheduleWakeup 240s.

## Streams (60h-Sprint Mai 2026)

| # | Stream | Modus | Topics | Pilot |
|---|---|---|---|---|
| 1 | Spiele-Einzel-Pages | 3-Chat | 15 klassische Spiele (Topfschlagen → Wasserbomben) | Quellen-Pack + Merge |
| 2 | Spiele × Alter | 3-Chat | `-3-jahre` bis `-12-jahre` (10 Pages) | Quellen-Pack + Merge |
| 3 | Alter-Direkt-Pages | 3-Chat | `kindergeburtstag-3/4/8/9/10/11/12-jahre` (7 Pages) | Quellen-Pack + Merge |
| 4 | Programmatic-Uplift | Pilot-Solo | 5 generische Mottos × ~14 Alter-Varianten + 20 Geschenk-Listicles + 7 fehlende Motto×Alter Long-Tails fuer 7 elite Mottos | Vollstaendig |

## Folder-Struktur

```
_dev/content-loop/
├── README.md                          (diese Datei)
├── runs/
│   ├── 01-spiele-einzel/
│   │   ├── quellen-pack.md            (Briefing fuer Chat A)
│   │   ├── topics.md                  (15 Spiele mit SERP-Notiz)
│   │   └── outputs/<spielname>/v{1..4}.{md,html}
│   ├── 02-spiele-alter/
│   ├── 03-alter-direkt/
│   └── 04-programmatic-uplift/
└── templates/
    └── tier2-motto-age.html.tmpl       (Programmatic-Template)
```

## Score-Standard

- **Final-Adversarial ≥ 85/100** = Merge-Akzeptanz
- v3 < 85 → v4 mit **konkreten** Schwaechen-Adressen
- Plateau v4 → v5 ohne Verbesserung: Sycophancy-Drift pruefen, Writer-Pushback ernst nehmen
- Programmatic-Uplift (Stream 4): Stichprobe 1:10 Sanity-Check, kein Score-Threshold

## Akzeptanz-Gates fuer Tier-1 (Elite, ≥85)

1. **Score-Rubrik:** Mehrwert (25), Lesefluss (20), Konkurrenz-Differenzierung (20), Schema-Korrektheit (15), Mobile-Lesbarkeit (10), Internal-Links zum Hub (5), CTA-Klarheit (5)
2. **Wortverbote:** "in diesem Artikel", "wir alle wissen", "natuerlich", "selbstverstaendlich", "ueberraschend", Mama-Buzzword-Bingo
3. **Schema-Pflicht:** HowTo + FAQPage (5+) + BreadcrumbList
4. **Internal-Link-Pflicht:** Hub-Page der Achse + Tool-Cross-Sell
5. **Mobile-Test:** <500ms Largest-Contentful-Paint, <320px keine horizontale Scroll

## Workflow (pro Stream)

1. **Pilot** schreibt `quellen-pack.md` + `topics.md` mit Top-Topic-Priorisierung
2. **Pilot** pushed auf `content-loop-pipeline`-Branch
3. **Pilot** gibt Bolle die Raw-URL: `https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/_dev/content-loop/runs/<stream>/quellen-pack.md`
4. **Bolle** oeffnet 3 claude.ai-Tabs (Chat A=Writer, B=Reviewer, C=Adversarial) und pastet die URL in Chat A
5. **Chat A** schreibt v1 zum ersten Topic aus dem quellen-pack
6. **Pilot** /loop wakeup 240s checked alle Streams, downloaded v1, committed → `runs/01-spiele-einzel/outputs/topfschlagen/v1.md`, triggert Chat B mit Raw-URL zu v1
7. **Chat B** schreibt v2-Review
8. **Pilot** committet, triggert Chat C
9. **Chat C** schreibt v3-Adversarial (Konkurrenz-Vergleich, "muede Mutter um 22:30?"-Check)
10. **Chat A** Round 5: v4-Final mit Score-Estimat
11. **Pilot** Score-Check → if ≥85: HTML rendern, in draft mergen, Cleanup Topic-Folder
12. Naechstes Topic im quellen-pack startet automatisch in Chat A

## Anti-Patterns

- Reviewer/Adv-Tab im selben Chat wiederverwenden → IMMER neuer Tab pro Stream
- `type` mit `\n\n` in claude.ai → Auto-Submit, statt dessen `shift+Enter` ODER `insertText`
- Adv-"Fix" blind uebernehmen → Sycophancy-Drift, Writer-Pushback pruefen
- Chunked-Paste 50KB+ HTML in Chat → Token-Killer, statt dessen Raw-URL nutzen
- Lizenz-Mottos (frozen/paw-patrol/super-mario/etc.) IN Stream 4 — MARKENRECHTS-RISIKO, raus

## Branch-Strategie

- `content-loop-pipeline` = Generation + Quellen-Packs + v1..v4 Outputs (alles, was Chat-A/B/C lesen oder Pilot generieren muss)
- `draft` = nur akzeptierte v4-Finals (>= 85) als finale `.html` im Repo-Root
- `main` = Deploy (nur via "Ende deploy")
