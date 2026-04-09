# Session-Notizen

## Letzte Session
**Datum:** 09.04.2026

## Was wurde gemacht
- ARCHITECTURE.md angelegt: schlanke URL-Matrix (jede Seite mit Rolle + Funnel-Ziel) + 6 dokumentierte Entscheidungen (E1–E6)
- Homepage: Partyseite-CTA aktiv geschaltet (grüner Button in CTA-Reihe, "bald verfügbar" entfernt, aktiver Text + Link zu party.machsleicht.de)
- Structured Data FAQ um WhatsApp-Partyseite ergänzt
- Motto-Inkonsistenz geprüft: 17 Mottos stimmt (9 eigene + 8 Franchise), alle drei "neuen" (detektiv, dschungel, feen) waren bereits komplett in kindergeburtstag.js

## Nächste Schritte
1. **BLOCKER: Party-Worker deployen (Laptop nötig)** — Code ist in Cloudflare eingefügt, fehlt noch: KV Namespace "PARTY" erstellen, KV-Binding (Variable: PARTY), Custom Domain party.machsleicht.de
2. Nach Worker-Deploy: `ende deploy` ausführen damit Homepage-Änderungen live gehen
3. Rätsel nach Maß in den Planer integrieren (Schatzsuche-Block)
4. Rätsel-Worker bauen (Credit-System, Lemon Squeezy Webhook)
5. AMAZON_TAG als ENV var setzen (sobald Tag da)
6. GitHub Token rotieren (25.04. — DEADLINE)
7. Google Search Console einrichten
8. Awin anmelden

## Offene Fragen
- Franchise-Guides: Funnel in Planer oder eigenständige Affiliate-Seiten?
- Altersseiten-Konsolidierung: Wann starten? (Entscheidung E2 dokumentiert, Umsetzung offen)
