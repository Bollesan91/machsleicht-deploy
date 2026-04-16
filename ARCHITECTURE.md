# Architektur machsleicht.de

Stand: April 2026

> **Verwandte Root-Dokumente:**
> - [STRATEGIE.md](./STRATEGIE.md) — Master-Strategie (Monetarisierung, Vision, Motto-Plan, Sprint-Plan)
> - [BACKLOG-AUDIT.md](./BACKLOG-AUDIT.md) — Priorisiertes Backlog mit PBIs
> - [SESSION-NOTES.md](./SESSION-NOTES.md) — Fortschritt der letzten Session

---

## Plattform-Kern

machsleicht ist eine anlassbasierte Familienplattform. Drei Produkte bilden den Kern, der Rest ist Beiwerk.

**Kernprodukte (Prio 1–3):**
1. Kindergeburtstag-Planer (17 Mottos, 3 Altersgruppen)
2. Schatzsuche-Builder (9 Themen, Schatzkarte, Stationen)
3. Einladungskarten-Tool (WhatsApp-Versand)

**Sekundär:** Baby/Wochenbett, Einschulung, Kreuzworträtsel, Spielkarten, Checklisten

**Regel:** Sekundäre Bereiche dürfen auf der Startseite sichtbar sein, aber nie den Kern verwässern.

---

## URL-Matrix

### Startseite

| URL | Rolle | Funnel-Ziel |
|-----|-------|-------------|
| `/` | Platform Home | → /kindergeburtstag, /schatzsuche, /einladung/erstellen |

### Core Hubs

| URL | Rolle | Funnel-Ziel |
|-----|-------|-------------|
| `/kindergeburtstag` | Planer-App (JSX) | Plan generieren → Einladung, Schatzsuche, PDF |
| `/schatzsuche` | Schatzsuche-Builder | Karte + Stationen → Drucken |
| `/einladung/erstellen` | Einladungs-Builder | Karte erstellen → WhatsApp-Share |

### Utility / Output (eigene Infrastruktur)

| URL | Rolle | Technik |
|-----|-------|---------|
| `party.machsleicht.de` | WhatsApp-Partyseite | Cloudflare Worker + KV |

### SEO Entry Pages — Motto × Alter

| Muster | Beispiel | Funnel-Ziel |
|--------|----------|-------------|
| `/kindergeburtstag/{motto}` | `/kindergeburtstag/piraten` | → Planer mit Motto vorausgewählt |
| `/kindergeburtstag/{motto}-{alter}` | `/kindergeburtstag/piraten-6-jahre` | → Planer |
| `/kindergeburtstag/{motto}-{altersgruppe}` | `/kindergeburtstag/piraten-6-8-jahre` | → Planer |
| `/schatzsuche/{theme}` | `/schatzsuche/detektiv` | → Builder |
| `/einladung/{motto}` | `/einladung/dino` | → Einladungs-Builder |

**20 Mottos mit SEO-Seiten:** safari, piraten, weltraum, dino, einhorn, feuerwehr, detektiv, meerjungfrau, pferde, ritter, zirkus, baustelle, frozen, harry-potter, minecraft, ninjago, paw-patrol, pokemon, spider-man, super-mario

**9 Schatzsuche-Themes:** piraten, dschungel, weltraum, detektiv, dino, feen, safari, einhorn, feuerwehr

**10 Einladungs-Mottos:** detektiv, dino, einhorn, feuerwehr, meerjungfrau, prinzessin, safari, superheld, weltraum + Erstellen-Hub

### Editorial / Funnel Content

| URL | Thema | Funnel-Ziel |
|-----|-------|-------------|
| `/kindergeburtstag-checkliste` | Checkliste | → Planer |
| `/kindergeburtstag-spiele-drinnen` | Spiele-Ideen | → Planer |
| `/kindergeburtstag-spiele-draussen` | Spiele-Ideen | → Planer |
| `/kindergeburtstag-drinnen` | Indoor-Party | → Planer |
| `/kindergeburtstag-draussen` | Outdoor-Party | → Planer |
| `/kindergeburtstag-bei-regen` | Regenwetter | → Planer |
| `/kindergeburtstag-last-minute` | Schnell-Planung | → Planer |
| `/kindergeburtstag-essen` | Food-Ideen | → Planer |
| `/kindergeburtstag-kosten` | Budget-Rechner | → Planer |
| `/kindergeburtstag-mitgebsel` | Mitgebsel-Guide | → Planer |
| `/kindergeburtstag-torte-einfach` | Kuchen-Ideen | → Planer |
| `/kindergeburtstag-einladung-text` | Einladungstexte | → Einladung |
| `/kindergeburtstag-zeitplan` | Zeitplan-Vorlage | → Planer |
| `/kindergeburtstag-wenig-aufwand` | Low-Effort | → Planer |
| `/kindergeburtstag-zuhause` | Zuhause feiern | → Planer |
| `/schnitzeljagd` | SEO-Hub | → Schatzsuche |
| `/schnitzeljagd-aufgaben` | Aufgaben-Ideen | → Schatzsuche |
| `/schnitzeljagd-draussen` | Outdoor-Jagd | → Schatzsuche |
| `/schatzsuche-drinnen` | Indoor-Suche | → Schatzsuche |
| `/schatzsuche-kindergeburtstag` | Kombi-Seite | → Schatzsuche |
| `/{franchise}-guide` | Franchise-Guides (8×) | → Planer (Affiliate) |

### Franchise-Guides

| URL | Franchise |
|-----|-----------|
| `/frozen-guide` | Frozen |
| `/harry-potter-guide` | Harry Potter |
| `/minecraft-guide` | Minecraft |
| `/ninjago-guide` | Ninjago |
| `/paw-patrol-guide` | Paw Patrol |
| `/pokemon-guide` | Pokémon |
| `/spider-man-guide` | Spider-Man |
| `/super-mario-guide` | Super Mario |

### Secondary Hubs

| URL | Thema | Status |
|-----|-------|--------|
| `/baby` | Baby & Wochenbett | Live, eigenständig |
| `/einschulung` | Einschulung | Live, eigenständig |

### Standalone Utilities

| URL | Tool |
|-----|------|
| `/kreuzwortraetsel` | Kreuzworträtsel-Generator |
| `/spielkarten` | Spielkarten-Generator |
| `/oster-eiersuche` | Oster-Eiersuche |

### Checklisten (kein Funnel zum Kern)

| URL | Thema |
|-----|-------|
| `/baby-erstausstattung-checkliste` | Baby |
| `/kliniktasche-packen` | Baby |
| `/wochenbett-was-braucht-man` | Baby |
| `/babyparty-checkliste` | Baby |
| `/einschulung-checkliste` | Einschulung |
| `/schultuete-fuellen` | Einschulung |
| `/kita-start-checkliste` | Kita |
| `/familienreise-packliste` | Reise |
| `/autofahrt-kinder-checkliste` | Reise |
| `/umzug-mit-kind-checkliste` | Umzug |
| `/halloween-kinder-zuhause` | Halloween |
| `/adventskalender-fuellen` | Advent |

### Trust / Legal

| URL | Inhalt |
|-----|--------|
| `/impressum` | Impressum |
| `/datenschutz` | Datenschutz |
| `/transparenz` | So funktioniert machsleicht.de |

### Alter-Einstiegsseiten (Root-Level)

| URL | Funnel-Ziel |
|-----|-------------|
| `/kindergeburtstag-5-jahre` | → Planer |
| `/kindergeburtstag-6-jahre` | → Planer |
| `/kindergeburtstag-7-jahre` | → Planer |

---

## Getroffene Entscheidungen

### E1: Partyseite auf Subdomain

**Entscheidung:** `party.machsleicht.de` statt `/partyseite`

**Grund:** Cloudflare Worker braucht eigene Route. KV-Storage, RSVP-API, Foto-Upload — alles serverseitig. Passt nicht in den statischen Netlify-Build.

**Trade-off:** Kein SEO-Vorteil durch Subdomain. Akzeptiert, weil die Partyseite kein SEO-Ziel ist — sie wird per WhatsApp geteilt, nicht gegoogelt.

**Status:** Worker gebaut (810 Zeilen), Deploy ausstehend.

### E2: Altersseiten-Konsolidierung

**Entscheidung:** Einzelalter-Seiten (`/piraten-3-jahre`, `/piraten-4-jahre`, ...) werden mittelfristig zu Altersgruppen konsolidiert (`/piraten-3-5-jahre`, `/piraten-6-8-jahre`, `/piraten-9-12-jahre`).

**Grund:** 20 Mottos × 10 Alter = 200 Seiten. Zu dünn pro Seite, kannibalisieren sich gegenseitig. Gruppierte Seiten haben mehr Content, stärkere Signale, bessere Rankings.

**Umfang:** ~200 Redirects (301), neue Inhalte für ~60 Gruppen-Seiten. Kein Nebenbei-Job, eigenes Projekt.

**Status:** Geplant, noch nicht gestartet. Altersgruppen-Seiten existieren bereits parallel (z.B. `piraten-3-5-jahre.html`).

### E3: Lizenz-Mottos ohne eigene Tools

**Entscheidung:** Franchise-Mottos (Frozen, Pokémon, Minecraft, etc.) bekommen SEO-Seiten und Planer-Daten, aber keine eigenen Einladungen oder Schatzsuche-Themes.

**Grund:** Lizenzrechtlich heikel, eigene Designs/Illustrationen für geschützte Marken zu bauen. Die SEO-Seiten sind reine Ratgeber mit Affiliate-Links. Der Planer nutzt generische Spielvorschläge.

**Status:** 8 Franchise-Mottos live mit SEO-Seiten + Planer-Daten + Franchise-Guides.

### E4: Kein Content ohne Funnel-Logik

**Entscheidung:** Jede Content-Seite muss entweder in ein Kernprodukt überführen oder einen eigenständigen Monetarisierungszweck haben.

**Konsequenz:** Keine Ratgeber "weil man das halt hat". Jede Seite braucht einen klaren CTA zum Planer, zur Schatzsuche, zur Einladung oder zu Affiliate-Produkten.

**Prüfung:** Neue Content-Seiten werden vor Erstellung gegen diese Regel geprüft.

### E5: Homepage zeigt nur fertige Produkte

**Entscheidung:** Kein "Coming Soon" oder "Bald verfügbar" auf der Startseite. Was auf der Homepage steht, muss funktionieren.

**Grund:** Ankündigungen ohne Produkt verwässern Vertrauen. Eltern wollen Lösungen, keine Roadmap.

**Ausnahme:** Partyseite wird erst auf die Homepage genommen, wenn der Worker live ist.

### E6: 17 Mottos als feste Planer-Zahl

**Entscheidung:** Der Planer hat 17 Mottos. Diese Zahl wird überall konsistent kommuniziert.

**Zusammensetzung:** 9 eigene (safari, piraten, weltraum, dino, einhorn, feuerwehr, detektiv, dschungel, feen) + 8 Franchise (paw-patrol, pokemon, minecraft, frozen, mario, spiderman, harry-potter, ninjago).

**Erweiterung:** Neue Mottos nur wenn vollständige Daten (Spiele × 3 Altersgruppen, Deko, Food, Mitgebsel) vorliegen. Keine halben Mottos.

---

## Ist-Abweichungen vom Zielbild

| Abweichung | Zielbild | Status |
|------------|----------|--------|
| Partyseite nicht live | Worker deployed, CTA auf Homepage | Worker-Deploy ausstehend |
| Einzelalter-Seiten noch live | Konsolidiert auf Altersgruppen | Geplant, eigenes Projekt |
| `/schatzsuche-kindergeburtstag` existiert parallel zu `/schatzsuche` | Eine kanonische URL | Redirect geplant |
| Checklisten ohne Funnel | Jede Seite mit CTA | Nachrüsten |
| Einladungs-Mottos (10) ≠ Planer-Mottos (17) | Gleiche Abdeckung | Ausbau möglich |
