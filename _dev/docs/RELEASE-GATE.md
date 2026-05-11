# Release Gate (P1-33)

Stand: 2026-05-11. Verbindliche Checkliste vor jedem Deploy auf `main`. V5.1-Spec.

## Hard-Gates (Deploy stoppen wenn rot)

### 1. Build + Syntax
- [ ] `bash _src/build.sh` ohne Fehler. Output `js/kindergeburtstag.js` aktuell und syntax-valide:
      `node -e "try{new Function(require('fs').readFileSync('js/kindergeburtstag.js','utf8'));console.log('OK')}catch(e){console.log('FAIL:',e.message)}"`
- [ ] `node --check party-worker.js` → OK
- [ ] `node --check netlify/functions/*.mjs` und `*.js` → alle OK
- [ ] `bash validate-all.sh` → alle Stufen grün (oder Path-Bug bestätigt als nicht-blockierend)

### 2. Motto-Wahrheit
- [ ] `js/theme-registry.js` slugs identisch mit `einladung/erstellen/index.html` MOTTO_CONFIG
- [ ] Sichtbare Motto-Zahlen in `index.html` und `kindergeburtstag.html` stimmen mit Registry überein
- [ ] Keine Lizenz-Mottos in sichtbaren Texten/Listen/Schemas

### 3. Indexierungs-Schutz
- [ ] `_headers` enthält `X-Robots-Tag: noindex` für `/api/*`, `/.netlify/functions/*`, `/e/*`
- [ ] Worker-Output (party.machsleicht.de/*) hat `<meta name="robots" content="noindex,nofollow">` in baseHead
- [ ] Keine sensiblen Daten (Email-Adressen, editToken) in indexierbaren URLs

### 4. Canonical-Konsistenz
- [ ] `/schatzsuche` → Canonical zeigt auf `https://machsleicht.de/schatzsuche` (nicht mehr auf /kindergeburtstag!)
- [ ] `/einladung` → Canonical auf `/einladung`
- [ ] `/kindergeburtstag/<motto>` → Canonical auf gleiche URL
- [ ] Keine Canonical zeigt auf private/dynamische URL

## Soft-Gates (Empfehlung, nicht blockierend)

### 5. Funnel-Verifikation (manuell)
- [ ] **Mobile Chrome:** `/kindergeburtstag/feuerwehr` → Planer-CTA → Plan generieren → Cockpit sichtbar
- [ ] Cockpit-CTA „Schatzsuche" → scrollt zur SchnitzeljagdBlock
- [ ] Cockpit-CTA „Einladung" → `/einladung/erstellen?motto=feuerwehr&name=X&source=cockpit` (Banner sichtbar)
- [ ] Cockpit-CTA „Partyseite anlegen" → POST /api/create erfolgreich → Inline-Result mit Gäste-Link + WhatsApp-Share
- [ ] Gäste-Link in Vorschau funktioniert, Mini-Game spielbar, RSVP funktioniert

### 6. Worker-spezifisch (nach manuellem Deploy)
- [ ] CORS-Preflight: `curl -X OPTIONS https://party.machsleicht.de/api/create -H "Origin: https://machsleicht.de"` → 200 + CORS-Header
- [ ] Minimal-Create (siehe `_dev/docs/WORKER-CONTRACT.md` Test 2) → 200 + `{id, editToken, url, editUrl}`
- [ ] Partyseite-UI nach Erstellung: Gäste-Link sofort sichtbar (NICHT mehr gated hinter E-Mail)
- [ ] Rate-Limit-Test: 6× POST /api/create in <1h → 429 beim 6. Versuch
- [ ] Honeypot-Test: `POST /api/party/<id>/rsvp` mit `{"website":"x", "name":"Bot"}` → 200 OK, aber Gast wird NICHT angelegt

### 7. Tracking-Verifikation (Umami Debug)
- [ ] `planner_started`, `plan-created`, `cockpit_viewed` feuern auf `/kindergeburtstag`
- [ ] `cockpit_cta_clicked{target}` feuert beim Klick auf Cockpit-CTAs
- [ ] `party_create_started`, `party_created`, `party_share_clicked{channel}` feuern beim Partyseite-Flow
- [ ] `treasure_mvp_cta_*` feuern auf `/schatzsuche`
- [ ] `invitation_from_cockpit` feuert beim Einladungs-Tool aus Cockpit
- [ ] **KEINE** persönlichen Daten in Event-Parametern (keine Email, kein voller Name, keine Address)

### 8. Fehlerfälle (manuell simuliert)
- [ ] **localStorage blockiert** (DevTools → Application → Storage → Clear / Privacy-Mode): Planer funktioniert weiter, Cockpit fällt auf Default-Werte zurück, Partyseite-Erstellung baut Fallback-Payload
- [ ] **Worker down** (DevTools → Network → Block https://party.machsleicht.de): Cockpit-CTA "Partyseite anlegen" zeigt Fehler-Box + Retry-Button, Plan bleibt erhalten
- [ ] **CORS-Block** (sollte nicht passieren, da `Allow-Origin: *`): Falls doch → siehe Worker-Logs

### 9. SEO-Sanity
- [ ] `/schatzsuche` zurück bei Google? (manuelle Suche, kann Wochen dauern)
- [ ] Sitemap-Eintrag für `/schatzsuche` aktuell? (`sitemap.xml`)
- [ ] Pinterest-Preview-Test für Hero-Bilder

## Deploy-Reihenfolge

### Auf Netlify (machsleicht.de Hauptdomain)
1. Auf `draft` alle Commits prüfen: `git log --oneline origin/main..draft`
2. Hard-Gates 1-4 abhaken
3. „Ende deploy" via git-sync-Skill: merge draft → main → push origin main
4. Netlify-Dashboard: Build erfolgreich?
5. Live-Smoke-Test: `/kindergeburtstag/feuerwehr`, `/schatzsuche`, `/einladung/erstellen`

### Auf Cloudflare Worker (party.machsleicht.de)
**WICHTIG:** Kein wrangler.toml im Repo → Deploy manuell via Cloudflare-Dashboard.
1. `party-worker.js` aus dem Repo kopieren
2. Im Cloudflare Worker Dashboard einfügen
3. „Save and Deploy"
4. Smoke-Test gegen produktiven Worker (siehe Soft-Gate 6)

### Wenn nur Worker-Änderungen
- Netlify-Deploy ist nicht nötig (kein Build).
- Trotzdem `git push origin main` damit Code in History ist.

## Bekannte Issues / TODOs (nicht-blockierend)

- **Validator-Path-Bug:** STUFE 1 (JS-Syntax) failt unter Windows-Bash wegen `$REPO`-Path-Inkompatibilität. Pre-existing, nicht durch Sprint 1 verursacht. Workaround: relative Pfade nutzen oder validator von Linux/CI laufen lassen.
- **Worker-Deploy-Mechanismus:** Manuell. Backlog: wrangler.toml ergänzen, `npx wrangler deploy` als Build-Step in `_dev/scripts/`.
- **Worker-MOTTO_COLORS** weichen von Registry/Einladung-Tool ab (piraten/einhorn/dino/feuerwehr). Sichtbar auf der Partyseite. Backlog: Migration zu Registry-Farben.
- **Standalone Einkaufsliste-Page** `/einkaufsliste/<motto>` aus V5.1-Ticket 7: nicht gebaut. React-Planer hat Paketlogik schon.
- **OG-Bilder Feuerwehr-Cluster:** og-feuerwehr-3.png, og-feuerwehr-6.png, og-feuerwehr-9.png fehlen. Pinterest/WhatsApp-Share-Friction.
- **Geister-Files im Working Tree:** ~190 Lizenz-Motto-Files vom 29.04-Cut + 10× party-worker-FIXn-Backups. `git clean -fd` mit Whitelist möglich (eigenes Mini-Ticket).

## Messhypothesen für 30 Tage nach Deploy (V5.1-Ticket 8)

Erste-Messung-Werte (NICHT echte Benchmarks!):

| Metrik | Hypothese | Quelle |
|---|---|---|
| Planer-Start aus SEO-Landing | 20% | umami `planner_started` / Pageviews |
| Plan generiert nach Start | 50% | `plan-created` / `planner_started` |
| Cockpit-CTA Schatzsuche | 25% | `cockpit_cta_clicked{treasure}` / `cockpit_viewed` |
| Cockpit-CTA Einladung | 15% | `cockpit_cta_clicked{invitation}` / `cockpit_viewed` |
| **★ Partyseite erstellt (North Star)** | 3–5% | `party_created` / Plan-Generierungen |
| Einkaufsliste geöffnet | 10% | `shopping_package_selected` |
| Affiliate-Klick | 1–3% | `affiliate_click` |

Nach 30 Tagen: Hypothesen mit realen Daten ersetzen, Funnel-Lecks priorisieren.

## Sign-Off-Checkliste

Vor jedem „Ende deploy":
- [ ] Hard-Gates 1-4 ✓
- [ ] Mindestens Soft-Gates 5 manuell verifiziert
- [ ] Wenn Worker-Patch dabei: Soft-Gate 6 nach Cloudflare-Deploy
- [ ] AUDIT.md ggf. updaten wenn Repo-Struktur sich änderte
- [ ] SESSION-NOTES.md durch git-sync-Skill aktualisiert
