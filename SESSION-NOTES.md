# Session-Notizen

## Letzte Session
**Datum:** 19.04.2026 (Mobile-Session, Opus 4.7) — Audit-Durcharbeitung + Backlog-Neu-Sortierung

## Was wurde gemacht

### Teil 1 — 2 externe Audits durchgearbeitet

Zwei externe Audits (Grinch-Mode SEO-Audit + Elite-Produktaudit) gegen bestehenden Backlog- und Strategie-Stand abgeglichen.

**Widerlegt / nicht mehr aktuell (keine Aktion):**
- „Sitemap fehlt" — existiert (2169 Zeilen), robots.txt verweist drauf
- „OG-Bilder fehlen" — 338 von 356 Seiten haben og:image
- „14 vs 17 Mottos Inkonsistenz" — im Repo aktuell keine veralteten Zahlen
- „SPA ohne SSR" — Motto-Seiten rendern korrekt im initialen HTML

**4 neue PBIs aufgenommen:**
- **P1-15** — Email-Capture am Planer-Output (1–2 Tage, größter Retention-Hebel, nach P1-10)
- **P2-20** — Datenübergabe Planer → Einladung/Schatzsuche/Partyseite (4–6 Std.)
- **P2-21** — Seiten-Rollen-Matrix (1 Tag, nach P1-11)
- **P3-11** — Pinterest-Präsenz (geparkt, Trigger bei 5.000+ Besuchern/Monat)

**2 bestehende PBIs erweitert:**
- **P2-3** um klickbaren Beispiel-Plan (nicht nur Screenshots) — Audit-Kernkritik „Demo vor Copy"
- **P3-5** um Verweis auf P1-15 als konkreten Opt-In-Trigger

**2 neue Strategie-Notizen in STRATEGIE.md:**
- **0.5** Brand-Kollisions-Risiko (machsleicht vs. machdichleicht.de/machsleiser.de) — keine Umbenennung, aber immer „machsleicht.de" als Brand-Einheit kommunizieren
- **0.6** Pinterest-Frage als offene Entscheidung (Trigger bei 5k+ Besuchern)

### Teil 2 — Prio-Tabelle komplett neu sortiert

Alte Tabelle war nach Ticket-Nummer sortiert, neue Tabelle ist echte **Ausführungs-Roadmap** mit Sequenz 1–36 und 5 Clustern:
1. **Jetzt (1–2 Wochen):** Top-7 inklusive Token-Rotation, GSC, Cloudflare-Deploy, Hero-Umbau
2. **Unmittelbar danach (2–4 Wochen):** Email-Capture, Datenübergabe, Gumroad, Awin, Motto-Elite, Einschulung
3. **Mittelfristig (Mai–Juli):** Wunschliste, Lizenz-Mottos, /einladung-Hub, Ratgeber-Pflege, Mitgebsel, Rollen-Matrix
4. **Vor dem Herbst-Peak (Juli–September):** Adventskalender, Geschenkeberater, machsruhig-Launch
5. **Später (Q4 + Q1 2027):** Newsletter-Verwertung, virale Tools, Pinterest-Trigger, Premium-Features

**Prio-Hochstufungen:**
- P1-5 → **P0-5** (Token-Deadline, inkonsistente Nummerierung korrigiert)
- P2-1 → **P1** (Hero-Funnel, finalisierte Entscheidung)
- P2-19 → **P1** (HTML-Bug auf 300 Dateien, 30-Min-Fix)
- P2-3 → **P1** (Ergebnis-Vorschauen, Audit-Kernbefund)

**Prio-Runterstufungen:**
- P1-9 → **P2** (hat harte Dependency auf P2-10)
- P1-11 → **P2** (Ratgeber-Pflege, evergreen ohne Deadline)

## Nächste Schritte

**Top-Prio für nächste Session (Reihenfolge bindend):**
1. **P0-5 GitHub Token rotieren** — Deadline 25.04., noch 6 Tage
2. **P0-1 Google Search Console** — 20 Min, Basis für alles weitere
3. **P1-10 Cloudflare Worker deployen** — Laptop-Session nötig, entsperrt 4 weitere PBIs + Revenue
4. Danach: P2-1 (Hero), P1-7 (Social Proof), P2-19 (HTML-Bug), P2-3 (Ergebnis-Vorschauen)

**Entscheidung offen:** Ob/wann Pinterest-Strategie aktiviert wird (Trigger dokumentiert in STRATEGIE.md 0.6).

## Offene Fragen

- Reihenfolge nach Piraten-Elite: Einhorn oder Paw Patrol (höchstes Suchvolumen bei Lizenz-Mottos)?
- Cloudflare Worker Deploy: manuell im Dashboard oder wrangler CLI?
- Email-Capture-Text: „Plan als PDF per Mail" aggressiv oder dezent platzieren?

## Status der Site nach dieser Session

- Gesamtdurchschnitt Audit-Score: ~72 % (unverändert seit 16.04., keine Content-Arbeit heute)
- Doku-Zustand: STRATEGIE.md + BACKLOG-AUDIT.md beide auf 19.04.2026 aktualisiert
- `validate-all.sh`: Kein Lauf nötig — reine Doku-Änderungen
