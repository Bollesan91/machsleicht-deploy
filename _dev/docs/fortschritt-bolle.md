# Fortschritt Bolle

## Letzte Session: 08.04.2026

### Was gemacht wurde:

**Sprint 12 — Party-Worker v2 komplett gebaut (811 Zeilen):**
- 3-Step Ersteller-Flow (Kind → Wann/Wo → Wunschliste + PayPal.me)
- Code-Gate für Gäste (Vorname), Foto-Upload, OG-Tags, XSS-Schutz
- Wunschliste: Claim/Unclaim, Gemeinsam schenken, Anteil-Berechnung, PayPal-Button
- Affiliate-Redirect für 8 Shops (Amazon, myToys, Thalia, Otto, Jako-o, tausendkind, Smyths, LEGO)
- Editor: Inline-Edit aller Party-Daten, Wünsche löschen, Allergien-Übersicht
- Auto-Motto-Farbe (22 Mottos), Zeitvalidierung, Shop-Labels, Affiliate-Hinweis
- localStorage RSVP-Check, .ics Download, mailto Edit-Link-Backup, DSGVO
- Max 30 Gäste, Max 20 Wünsche, Überspringen-Button, 404-Seite
- Amazon PartnerNet angemeldet (Tag pending)
- Premium-Strategie-Dokument aktualisiert
- Deployed auf Netlify (party-worker.js liegt im Repo, Cloudflare Worker Deploy noch pending)

### Nächste Schritte:
1. Cloudflare: Worker deployen, KV "PARTY", DNS party.machsleicht.de, AMAZON_TAG setzen
2. Rätsel nach Maß (höchste Prio Revenue-Feature)
3. GitHub Token rotieren (25.04.)
4. Google Search Console einrichten
5. Awin anmelden (myToys, Thalia, Otto)
6. homepage.js aufräumen (toter Partyseite-Code)

---

## Session: 04.04.2026

### Was gemacht wurde:

**Sprint 7 — Bugfixes:**
- 5 unsichtbare Einladungsspiele in MOTTO_CONFIG freigeschaltet (4→10 Mottos)
- Won-Screen CTA aller 9 Spiele auf passende Schatzsuche geändert
- Homepage-Dopplung /homepage → 301 auf /
- Motto-Zahl auf Startseite vereinheitlicht (20 überall)
- Schatzsuche Cross-Sell-Banner dynamisch gemacht (war Piraten-only)

**Sprint 7 — Systemführung:**
- QA-Gates definiert + an 5 Seiten durchexerziert
- Seitentypen-Zuordnung (alle URLs → 5 Typen)
- CTA-Hierarchie-Standard dokumentiert
- Interne Linklogik dokumentiert

**Sprint 8 — SEO + Strukturarbeit:**
- Schnitzeljagd in alle Schatzsuche-Meta-Tags ergänzt
- Dschungel→Safari umbenannt + 301 + Sitemap
- Feen→Einhorn umbenannt + 301 + Sitemap
- 16 fehlende Altersseiten erstellt (Paw Patrol 6, Baustelle 5, Detektiv 2, Ritter 1, Zirkus 2)
- Sitemap: 336→350 URLs, alle validiert
- _redirects: 2 Duplikate entfernt, alle Regeln geprüft
- Performance-Baseline erstellt (Lighthouse-Bericht)
- Programmatic QA-Sweep: 290 Seiten, 0 Issues

**Sprint 9 — Linkpfade + Ratgeber:**
- Baby-Hub + Einschulung-Hub: Crosslink-Sektionen ergänzt
- 7 Baby/Einschulung-Unterseiten: Breadcrumbs mit Hub-Rücklinks
- 24 Lizenz-Motto Range-Seiten: Ratgeber + Guide Links ergänzt

**QA-Fixes (vor Deploy):**
- 16 neue Altersseiten: Body-Text Alter korrigiert (Template-Bug)
- Baustelle 6-8 Range: Vorbestehenden "0 Spiele" Bug gefixt
- 9 Seiten: Duplicate class-Attribute bereinigt

**Backlog:** 22 von 55 Tasks erledigt.

### Nächste Schritte:
- Task 3: 248 Kindergeburtstag-Detailseiten CTA zu Einladung (zurückgestellt)
- Task 11: Plausible prüfen — Schatzsuche-Traffic (Bolle manuell)
- Task 16: SEO-LP "Kindergeburtstag Einladung digital"
- Task 21-27: Neue Schatzsuchen + Verticals (Prinzessin, Superheld)
- Task 36-37: Kaufmoment-Boxen
- Homepage TTFB optimieren (2.5s → Ziel <1s)

### Offene Fragen:
- Plausible Schatzsuche-Daten checken vor Schnitzeljagd-LP
- Welches Motto als nächstes Vertical? (Prinzessin = höchste Prio)
