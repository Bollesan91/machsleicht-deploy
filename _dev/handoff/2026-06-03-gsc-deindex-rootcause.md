# GSC De-Indexing — Root-Cause-Diagnose + Recovery-Plan

**Datum:** 2026-06-03 · **Status:** Diagnose abgeschlossen, Recovery offen · **Prio:** P0

## TL;DR
Massen-De-Indexing **308 indexierte Seiten (8. April) → 1 indexiert (heute)**, 350 „Nicht indexiert". GSC-Hauptgrund: **„Gecrawlt – zurzeit nicht indexiert" (310 Seiten)**. **Ursache ist KEIN technischer Defekt** (kein 5xx, kein noindex, keine kaputten Canonicals als Massenphänomen), sondern **Googles Site-Quality-Abwertung** wegen der Phase-1-Masse an dünnen, template-generierten Programmatic-Seiten (Lizenzmarken × jedes Einzelalter). Recovery ist ein **Reputations-Wiederaufbau über 2–4 Monate**, kein Quick-Fix.

## Belege (live geprüft 2026-06-03)
- **GSC Seiten-Report:** Indexiert 1, Nicht indexiert 350 (5 Gründe). Dominanter Grund „Gecrawlt – zurzeit nicht indexiert" = **310 Seiten**. Validierung am 26.05 gestartet, **30.05 fehlgeschlagen**.
- **GSC-Kurve:** Peak 308 indexiert am 8.4., dann Kollaps über April–Mai auf ~1.
- **Technik ist sauber (live):** Origin <0,7s (auch 20× parallel kalt, 0× 504), Cloudflare-Cache HIT/max-age=7200, robots.txt offen, Sitemap 200/valide (126 URLs), PSI Desktop 98 / Mobil 87, SEO 100. → Die Ahrefs-„504/Slow-Page"-Issues sind **Crawler-Artefakte** (Umami-Beacon-Render-Timeout + Crawl-Burst), NICHT die De-Index-Ursache.
- **Aktuelle Content-Qualität ist GUT:** Die 37 Alters-Gruppen-Seiten (z.B. weltraum-6-8-jahre) sind **6.000–8.700 Wörter, 0% Template-Duplikat** (weltraum-9-12 vs ritter-9-12: 1/1951 Wortblöcke gleich). 48 echte Unique-Ratgeber + Planer-Tool. **Keine Lizenzmarken mehr in der Sitemap.** → Inhaltlich ist der aktuelle Stand solide; NICHT wegwerfen.

## Warum es HEUTE noch blutet (3 Faktoren)
1. **Site-Quality-Reputation ist klebrig.** Einmal als „viel Dünn-Content" eingestuft, hebt Google die Abwertung erst nach Wochen–Monaten sustained Qualität + Re-Crawl. Die fehlgeschlagene Validierung (30.05) ist dafür normal.
2. **Legacy-Redirect = Soft-404-Muster (DER fixbare Hebel).** Hunderte entfernte Thin-/Lizenz-URLs (super-mario, harry-potter, pokemon, minecraft, frozen-guide, zirkus-*, …) **301-redirecten ALLE stumpf auf `/kindergeburtstag`** (generischer Master-Hub), nicht auf relevante Äquivalente. Google wertet Masse-Redirect-auf-generisch als Soft-404 → behält sie in „crawled-not-indexed" UND misstraut dem `/kindergeburtstag`-Hub.
3. **Crawl-Rate gedrosselt** nach dem Schock → langsame Neu-Bewertung.

## Recovery-Plan (Reihenfolge = Hebelwirkung)
1. **Legacy-Redirect-Strategie fixen (höchster Hebel). ✅ UMGESETZT auf `draft` (03.06.2026, noch nicht deployed).** In `_redirects` umgestellt: `/kindergeburtstag/{frozen,harry-potter,minecraft,ninjago,paw-patrol,pokemon,spider-man,super-mario}*` + die 8 `*-guide`-Seiten + `/kindergeburtstag/zirkus*` → jetzt **`/410.html  410`** (vorher `301 → /kindergeburtstag` = Soft-404). Neue `410.html` (noindex, freundlich, CTA → /kindergeburtstag) erstellt. Die korrekten Einzeljahr→Alters-Gruppe-301s behaltener Themen (safari/piraten/pferde/ritter/baustelle …) bleiben unverändert. **Offen (Deploy):** via „Ende deploy" live schalten + Cloudflare-Cache purgen. **Mini-Follow-up:** `/ratgeber/{lizenz}*`-Regeln (Zeilen ~226–233) sind tot (von `/ratgeber/* → checkliste 301!` Zeile 3 geschattet); die Lizenz-Ratgeber gehen aktuell auf /kindergeburtstag-checkliste (reale Seite, geringer Schaden) — optional später auch auf 410.
2. **`/einladung`-Sektion sauber machen. ✅ UMGESETZT auf `draft` (03.06.2026, Strang 1).** Alle 17 Canonicals (16 Subpages + Index) von non-slash auf **Trailing-Slash** gezogen (= echte 200-URL; vorher canonical → 301-redirectende URL). Sitemap-`/einladung/*`-Einträge ebenfalls auf Trailing-Slash. **Zusätzlich:** `/ratgeber/*` (nur tote Lizenz-Guides, kein echtes Verzeichnis) von `301→checkliste` auf **`410 Gone`** umgestellt + toten Lizenz-Block in `_redirects` entfernt. **✅ DEPLOYED (03.06. + 08.06.), Cloudflare-Purge offen.** **Mini-Rest — GEKLÄRT 08.06.2026:** Die 5 nicht-gelisteten einladung-Pages (baustelle/dschungel/feen/pferde/ritter) **bewusst NICHT in die Sitemap aufgenommen.** Verifiziert via HTML-Parser: alle 16 `/einladung/<motto>/`-Seiten sind JS-Shells mit nur 4–5 server-gerenderten Wörtern (auch die 10 bereits gelisteten + piraten); die 5 sind zusätzlich von 0 Seiten intern verlinkt (orphaned). Sie hinzuzufügen wäre der Dünn-Content-Fehler, vor dem diese Diagnose warnt. → Sauberer Hebel = SEO-Refactor des ganzen Clusters: **PBI P6-1/G7, hochgestuft auf P1/nächste-Prio (Bolle 08.06.), Helfer-v3-Pflicht.**
3. **Keine neuen Dünn-Seiten.** Jede neue Seite muss „würde ein Mensch das einzeln nützlich finden?" bestehen. Wert verdoppeln: Planer + kuratierte Qualitäts-Spiele (motto-data.js, Helfer-v3-Arbeit).
4. **Erst NACH dem Cleanup:** Sitemap neu einreichen, 5–10 Flaggschiff-Seiten manuell zur Indexierung anstoßen (GSC „URL prüfen → Indexierung beantragen"), GSC-Validierung neu starten.
5. **Geduld 2–4 Monate** + konstant echten Wert nachlegen.

## Was NICHT tun (Zeitfallen)
- NICHT die 37 Alters-Gruppen-Seiten löschen/noindexen (sind unique + lang — das wäre Selbstschaden).
- NICHT an 5xx/Cache/Origin schrauben als De-Index-Fix (das ist gesund; die Ahrefs-504 sind Crawler-Artefakte).
- NICHT erwarten, dass eine GSC-Validierung sofort greift (Site-Quality-Recovery ist langsam).

## Offene Mini-Optimierungen (separat, nicht De-Index-relevant)
- ✅ **ERLEDIGT 08.06.2026:** `gstatic`-Preconnect (`<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`) site-weit auf **205 Seiten** ergänzt (direkt vor dem Google-Fonts-Stylesheet, idempotent). Mobile-LCP-Lever.
- Umami via Cloudflare-Worker proxyen (First-Party-Beacon) → beruhigt Ahrefs-Render-Timeouts. Kür.
- **Validator-Staleness (gefunden 08.06.):** `validate-all.sh` STUFE 2 liest Motto-Zahl aus `_src/kindergeburtstag-data.js` (10) — nach dem Wizard-Pivot ist SSOT aber `js/motto-data.js` (15). Validator-Source-Pointer post-Pivot anpassen (eigene PBI). Einladung-Canonical-Regel (Trailing-Slash) wurde 08.06. korrigiert.
