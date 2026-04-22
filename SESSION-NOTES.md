# Session-Notizen

## Letzte Session
**Datum:** 22.04.2026

## Was wurde gemacht
- **Strategisches Sparring** mit Bolle zum „Freund-Memo" (Verzettelungs-Kritik). Ergebnis: Strategie ist scharf, aber React-Homepage hatte ein Implementierungs-Gap zum SEO-Fallback.
- **React-Homepage (`js/index.js`) an SEO-Fallback angeglichen:**
  - Hero H1: „Familienstress? Mach's leicht." → „Kindergeburtstag planen — kostenlos in 10 Minuten"
  - Hero-Subtitle auf Fallback-Wortlaut
  - Products-Array von 8 → 4 Kernmodule reduziert (Einschulung/Baby/Kreuzworträtsel/Spielkarten raus aus Hauptgrid)
  - Neue Pill-Cloud-Sektion „Weitere Planer & Tools" mit 8 Sekundär-Items (Einschulung, Baby, Kreuzworträtsel, Spielkarten, Schnitzeljagd-Aufgaben, Halloween, Oster-Eiersuche, Adventskalender)
  - „Ein Tool pro Familienanlass." → „Planer, Schatzsuche, Einladung, Partyseite."
  - Eyebrow „Unsere Tools" → „Alles für den Kindergeburtstag" (bewusst nicht „System" — Inside-Sprache vermieden)
  - Footer-Tagline + Idee-Card-Text auf Kindergeburtstag-Fokus umformuliert
- **`index.html` Meta-Tags aktualisiert:** description, og:description, twitter:description — alle Erwähnungen von „Einschulung, Baby & Wochenbett" durch Kindergeburtstag-Fokus ersetzt
- **Portfolio-Matrix als Abschnitt 0.9 in STRATEGIE.md verankert:** 4 Spalten (Kernwette / Testwette / Zukunftswette eingefroren / Optional-Legacy) mit Budget, Trigger-Kriterien und Homepage-Präsenz-Regel. ElevenLabs-Hinweis verweist auf Section 3 Tier-Sequenzierung (kein Konflikt).
- **P1-12 komplett umformuliert:** vom interaktiven Einschulungs-Planer (12-18h) zum reinen SEO-Content-Cluster (10-14h). Upgrade-Trigger zum Planer: ≥100 organische Visits/Woche im Juli auf Cluster-Seiten. Label `[TEST]`.
- **18 PBIs in der BACKLOG-AUDIT.md Prio-Tabelle etikettiert:** 14× `[KERN]`, 1× `[TEST]`, 3× `[ZUKUNFT]`, 2× `[LEGACY]`. Ticket-Disziplin um Grace-Clause für Bestands-Tickets ergänzt.
- **Flow-Audit-Template** unter `_dev/docs/flow-audit-template.md` — 15 Reibungs-Checkpoints für Bolle zum Selbst-Durchgehen.
- **15-Punkte-Verifikation** aller Änderungen vor dem Push: validate-all.sh PASSED, JS Syntax valid, alle Cross-References sauber, Pill-URLs existieren.

## Nächste Schritte
- **Bolle: Flow-Audit selbst durchgehen** (`_dev/docs/flow-audit-template.md`) → 3 dickste Reibungen als neue `[KERN]`-PBIs anlegen
- **OneDrive-Repo lokal reparieren** (alter Ordner gelöscht, dann `git pull` oder neu klonen außerhalb von OneDrive)
- **P1-16 Partyseite Follow-Ups** in nächster Laptop-Session (Cloudflare-Deploy + Email-Test + Foto-Crop + Reply-To)
- **P2-13 Gumroad-Digitalprodukte starten** (Piraten + Dino, je 4h)
- **P2-15 Awin-Anmeldung** (30 Min + 1-3 Tage Warten)
- **P1-8 Safari als nächstes Elite-Motto** (3 Altersgruppen)
- **P1-12 Einschulung-SEO-Cluster bauen** — Launch bis 31.05.

## Offene Fragen
- Reihenfolge Safari-Altersgruppen: auch mit 6-8 starten wie bei Einhorn?
- Awin-Publisher-ID Status?
- Visual-Check der React-Homepage im Browser steht aus (manuelle Verifikation durch Bolle nach Deploy)
