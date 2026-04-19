# Session-Notizen

## Letzte Session
**Datum:** 19.04.2026 (Laptop-Session #2, Opus 4.6) — Piraten-Fix, P2-19, GSC-Sitemap, Hero-Umbau

## Was wurde gemacht

### 1. Piraten-Einladungsspiel gefixt
- Sound: 31 schnelle Noten → 16 Standard-Tempo-Noten (wie alle anderen Themes)
- Foto-Support: fotoUrl durch gesamte Piraten-Einladung hinzugefügt (URL-Parsing, Cinematic, Chase)
- Deployed auf main → live

### 2. Bereinigte Sitemap in GSC eingereicht
- Über Chrome die Sitemap (223 URLs) in Google Search Console neu submitted
- GSC: 262 indexierte Seiten, 75 nicht indexierte

### 3. P2-19 HTML-Bug: Doppelte class-Attribute (ERLEDIGT)
- Pass 1: 2 Patterns in 317 Dateien gefixt (card/u-emoji-cell, u-page-footer/no-print)
- Pass 2 (nach 3-stufiger Prüfung): 3 weitere Patterns in 256 Dateien gefixt (game-card/u-card-sm, cta/u-btn-filter, cta/u-mt8)
- Insgesamt: 5 Patterns, ~1600 Vorkommen bereinigt
- validate-all.sh: alle Checks bestanden

### 4. P2-1 Hero-Umbau (Funnel-Axiom)
- 4 gleichwertige CTA-Buttons → 1 Primary CTA "Kindergeburtstag planen →" + 2 Textlinks
- Partyseite aus dem Hero entfernt (ist Post-Planer-Upsell, nicht Einstieg)
- Trust-Zeile ergänzt: "Kostenlos · Ohne Anmeldung · In 10 Minuten fertig"
- Umgesetzt in SEO-Fallback (index.html) UND React-Version (js/index.js)
- validate-all.sh an neues Hero-Format angepasst
- 3-Fach-Check bestanden: STRATEGIE.md-konform, Validator grün, SEO↔React konsistent

## Nächste Schritte

**Top-Prio für nächste Session:**
1. **P1-7 Social Proof** — Testimonials/Nutzerzahlen auf der Startseite
2. **P2-3 Ergebnis-Vorschauen** — klickbarer Beispiel-Plan
3. **Einhorn oder Paw Patrol** — nächstes Motto nach Piraten-Elite (Suchvolumen prüfen)

**Cloudflare Security:**
- "Always Use HTTPS" + HSTS für party.machsleicht.de aktivieren (Cloudflare Dashboard → SSL/TLS)

## Offene Fragen

- Reihenfolge nach Piraten-Elite: Einhorn oder Paw Patrol (höchstes Suchvolumen)?
- Email-Capture-Text: „Plan als PDF per Mail" aggressiv oder dezent platzieren?
- Awin-Freischaltung: Wann kommt die Publisher-ID?

## Status der Site nach dieser Session

- Sitemap: 223 URLs, in GSC eingereicht
- Hero: 1 Primary CTA + 2 Textlinks (Funnel-Axiom umgesetzt)
- P2-19: alle doppelten class-Attribute bereinigt (5 Patterns, ~1600 Stellen)
- Piraten-Einladung: Sound + Foto wie alle anderen Themes
- 301-Redirects: 144 aktiv
- party.machsleicht.de: Worker live
- GSC: verifiziert, 262 indexierte Seiten
