# Session-Notiz — 22.05.2026 (Marktreife-Audit + SEO-Cleanup + Meerjungfrau-Reaktivierung + Helfer-v3-Start)

**Übergabe:** Siehe `_dev/HANDOFF-2026-05-22.md` für nächste Session.

**Zusatz-Session (Nachmittag):**
- Meerjungfrau als 8. Voll-Motto reaktiviert (Strategie §0.7 updated, Disney-Vermeidungs-Richtlinie)
- Hub-Page neu (40KB, 2076W, 0 Disney) — Commit `5be5da9`
- Helfer-v3-Loop gestartet für 4 Streams (3 Altersgruppen + Schatzsuche-Theme)
- 4 von 5 Pages haben v1+ (Stream 1-4 generiert via Subagent, Stream 2+4 sind v3)
- Bolle's klare Anweisung: Adversarial-Reviews müssen in Chrome-Tabs laufen, NICHT als Subagent
- 4 Chrome-Tabs vorbereitet (claude.ai/new) — ID 1532776390/95/97/98
- Pivot zu Chrome-Adversarial wartet auf Deploy-Zwischenschritt (Live-URLs nötig)

**Score-Tabelle Helfer-v3 Stand 22.05. abends:**

| Stream | File | KB | Versionen | Reviews | Score | Status |
|---|---|---|---|---|---|---|
| Hub | meerjungfrau.html | 40 | v1 | 1 adv (Subagent) | 76 | FIXES (3 Schwächen) |
| 1 | meerjungfrau-3-5-jahre.html | 35 | v1 | 0 | self-est | READY-FOR-CHROME-ADV |
| 2 | meerjungfrau-6-8-jahre.html | 60 | v3 | 1 adv (Subagent) | 88 | READY (Chrome-v4 pending) |
| 3 | meerjungfrau-9-12-jahre.html | 50 | v1 | 0 | self-est | READY-FOR-CHROME-ADV |
| 4 | schatzsuche/meerjungfrau.html | 22 | v3 | 1 adv (Subagent) | 86 | READY (Chrome-v4 pending) |

---

# Session-Notiz — 22.05.2026 (Marktreife-Audit + SEO-Massive-Cleanup)

## Kontext der Session

Bolle: "Wir entwickeln und entwickeln, das Produkt wird nicht scharf, wir sind nicht am Markt. Mach ein tiefes Audit."

Reality-Check via GSC-Screenshot:
- **343 URLs gecrawlt, 1 indexiert** (nur Homepage)
- **301 Pages "Gecrawlt – zurzeit nicht indexiert"** (= Google sagt: nicht wertvoll genug)
- **36 Pages "Alternative Seite mit richtigem kanonischen Tag"** (verworfen)
- **0 Besucher**

## Diagnose: Crap-Ratio + Inkonsistenz + 0 Backlinks

Live-Site verifiziert via curl:
- Homepage zeigt **6× "17 Mottos"** + **3× "153 Spiele"** + **1× "135 Stationen"** (alles veraltet)
- Lizenz-Reste in JSON-LD (ItemList mit Pokemon/Frozen/Harry-Potter/etc. URLs → 301-Redirect-Chains)
- 22 Decision-Cards mit Lizenz-Mottos + 5 Strategie-gestrichenen Mottos in kindergeburtstag.html
- 147 Pages mit Title >65ch (Google-Snippet-Cutoff)
- 15 Files mit Lizenz-Cross-Links in Related-Cards
- 0 Backlinks (Pinterest 0, Reddit 0, GuteFrage 0, Blogs 0)
- Brand-Konfusion mit machdichleicht.de (Ursula Karven, hohe Authority)

## Was wurde gemacht (3 parallele Sweeps + 1 Audit)

### Sweep 1: Hero-Konsistenz "17 Mottos" → "9 Mottos"
- index.html: 6× "17 Mottos" + 3× "153 Spiele" gefixt (Hero + Schemas + FAQ + Featurelist)
- kindergeburtstag.html: ItemList 14 → 9 echte Mottos, FAQ neu geschrieben (keine Disney/Nintendo/WB-Marken mehr)
- einladung/index.html: 10 → 9 Mottos
- 17 weitere Files via Bulk-Replace

### Sweep 2: Lizenz-Marken-Reste raus
- kindergeburtstag.html Decision-Cards-Grid: 13 von 22 entfernt (Lizenz + strategie-gestrichene Mottos)
- kindergeburtstag.html Teaser-Cards: 13 entfernt
- 15 Motto-Pages Related-Cards: 23 Cross-Link-Blocks entfernt
- index.html Hero: tote Verweise zu /minecraft, /paw-patrol weg
- Verbleibend: nur noch Content-Kontext (FAQ-Antwort "warum keine Marken", Beispiel-Einladungstext-Vorlage) — strukturell sauber

### Sweep 3: Title-Längen-Sweep (147 → 29 Pages, -80%)
- 110 Pages: " | machsleicht" Suffix entfernt (Title nun ≤65ch)
- 39 Pages: Pattern-Vereinfachung
  - "— Spiele, Zeitplan und Einkaufsliste" → "— Spiele + Einkaufsliste"
  - "— Junior-Ranger-Konzept mit Zeitplan & Einkaufsliste" → "— Junior-Ranger-Plan"
  - "— 3 fertige Party-Konzepte mit Zeitplan" → "— 3 Party-Konzepte"
- index.html: 84ch → 60ch
- 137 von 166 Pages haben jetzt OK-Title-Längen (vorher 19)

### Audit: Top-30 SEO-Champions identifiziert
- Neu: `_dev/seo-top30-audit.py` (Score-Formel: Wörter, Schemas, Title-Länge, HowTo/FAQ/BreadcrumbList)
- Neu: `_dev/SEO-TOP30-AUDIT.md` (Output)
- **Top-10**: Safari 9-12 (Score 108) > Safari 3-5 (107) > Spiele-Draussen (104) > Spiele-Drinnen (103) > Checkliste (102) > Zeitplan (94) > Drinnen (94) > 7-jahre (92) > /kindergeburtstag (92) > Safari 6-8 (90)
- **Bottom-Kandidaten** (KILL/NOINDEX): /transparenz, /schnitzeljagd-draussen, /kindergeburtstag/9-12-jahre, /umzug-mit-kind-checkliste, /einschulung-checkliste, /babyparty-checkliste, /kindergeburtstag/3-5-jahre

## Audit-Score-Verbesserung

| Kategorie | Vorher | Nachher | Δ |
|---|---|---|---|
| MOTTO-MATRIX | 74.4% | **76.9%** | +2.5 |
| MOTTO-HUB | 78.7% | **79.5%** | +0.8 |
| SCHATZSUCHE-MOTTO | 74.4% | **76.0%** | +1.6 |
| RATGEBER (neu sichtbar) | — | **83.1%** | — |
| Pages mit Title >65ch | 147 | **29** | -118 (-80%) |

## Vor diesem Session-Sweep: Triage-Cleanup

- 208 Zombie-Files aus früherem Lizenz-Sprint gelöscht (kindergeburtstag/{frozen,harry-potter,etc}-*.html + ratgeber/ + *-guide.html + party-worker-FIX*.js + Test-Reste)
- `.gitignore` erweitert (LibreOffice-Lock, *.tmp/*.bak)
- Loop-Archiv Welle 23 (detektiv adv-reviews) committed

## Was als nächstes ansteht (Masterplan-2-Wochen-Indexierungs-Bootstrap)

### Woche 1 (23.-29.05.) — Existenz-Bestätigung
1. **GSC URL-Prüfung Top-10** + "Indexierung beantragen" (manuell, 30 Min) — siehe SEO-TOP30-AUDIT.md
2. **Bottom-8 noindex setzen** (kleiner Code-Sweep, 30 Min)
3. **Pinterest-Profil + 3 Boards + 9 Pins** (2h, Pinterest hat hohe Authority → sofortiger Trust-Hint)
4. **GuteFrage-Sweep**: 5 Antworten auf Kindergeburtstag-Fragen mit Verweis (1h)
5. **Über-uns-Page mit echter Person + Foto** (Author-Schema, E-E-A-T-Signal)

### Woche 2 — Indexierungs-Push
1. **Sitemap reduzieren auf ~40 Top-Pages** (Top-30 + Strategie-Survivors)
2. **Reddit r/Eltern**: 2 hilfreiche Posts
3. **5 Mama-Blogger Outreach** (kostenloses Piraten/Dino-Komplett-PDF gegen Backlink)
4. **Google Business Profile anlegen**
5. **Organization-Schema im Footer**

### Was vorerst PAUSIERT ist (Auto-Mode-Empfehlung Sparring-Agent)
- P3-19 KI-Rätsel-Gedichte → bei 80 Visitors/Tag Vehikel-Vermeidung
- P3-20 RSVP-Bridge + P3-21 Live-Party-Navigator → disqualifiziert nach Strategie 0.7 bis Stufe 1 bestanden
- Phase-B-Ausbauten für weitere Mottos → kein weiterer Content bis Email-Capture live + erste Indexierungs-Erfolge

## Commit-Trail Stand

- draft: 47da083 (SEO-Massive-Cleanup) + c13b5cf (.gitignore + Loop-Archiv) — 2 commits ahead of origin/draft
- main: 3f1f284 (letzter Deploy 21.05.)

## Self-Audit der Session

- **Diagnose-Qualität:** 9/10 — GSC-Screenshot + curl-Verifikation + Audit-Tool kombiniert → keine Halluzinationen, harte Fakten
- **Cleanup-Reichweite:** 9/10 — 110+39 Pages Title-Fix, 13 Decision-Cards, 23 Cross-Links, 19 Files mit "17 Mottos" — substanziell
- **Strategische Klarheit:** 8/10 — 4-Wochen-Plan zu 2-Wochen-Indexierungs-Bootstrap pivotiert nach GSC-Reality. Top-30-Liste als Indexierungs-Anker.
- **Marktreife-Beitrag:** 7/10 — Konsistenz scharf, aber 0 Backlinks bleibt der echte Engpass. Indexierungs-Durchbruch noch nicht bewiesen.
