# Session-Notizen

## Letzte Session
**Datum:** 09.04.2026

## Was wurde gemacht
- Party-Worker v2 komplett gebaut (811 Zeilen): Wunschliste, PayPal, Affiliate 8 Shops, Code-Gate, Foto, OG-Tags, XSS, Editor-Inline-Edit, Wünsche löschen
- Rätsel nach Maß v5: Dual-Mode (Sofort + Geburtstag), Foto pro Station, Schwierigkeits-Regler, Lösungswort, echter Claude API Call
- Startseite fokussiert: 13 → 8 Produkte, geplante Features entfernt, "Kommt als nächstes"-Divider entfernt
- Emoji-Bug gefixt (D83dDcf1 → 📱)
- Planer CTA → "Bald verfügbar" (toter party.machsleicht.de Link behoben)
- Toter Code entfernt (homepage.html + js/homepage.js)
- Site Architecture v1 dokumentiert (Rollenmodell mit Ist-Abweichungen)
- Rätsel-Pricing finalisiert: 0,99€ einzeln, 3,99€ 5er-Pack, Credit-System via Cloudflare Worker
- Claude API Prompt-Template für Rätsel dokumentiert
- Backlog aktualisiert (58 Items, Sprint 13-15)
- Premium-Strategie aktualisiert
- ElevenLabs Account erstellt, deutsche Stimmen getestet → funktioniert
- Amazon PartnerNet angemeldet
- Conversion-Audit: Funnel steht, alle Wege führen zum Tool

## Nächste Schritte
1. Cloudflare: Party-Worker deployen (KV "PARTY", DNS party.machsleicht.de)
2. Rätsel nach Maß in den Planer integrieren (Schatzsuche-Block)
3. Rätsel-Worker bauen (Credit-System, Lemon Squeezy Webhook)
4. AMAZON_TAG als ENV var setzen (sobald Tag da)
5. GitHub Token rotieren (25.04. — DEADLINE)
6. Google Search Console einrichten
7. Motto-Zahlen konsistent machen (17 überall)
8. Awin anmelden

## Offene Fragen
- Partyseite-Card bleibt auf Startseite als "BALD" — entfernen oder lassen?
- Franchise-Guides: Funnel in Planer oder eigenständige Affiliate-Seiten?
- Altersseiten-Konsolidierung: Wann starten?
