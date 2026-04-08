# Session-Notizen

## Letzte Session
**Datum:** 08.04.2026

## Was wurde gemacht
- Party-Worker v2 komplett neu gebaut (811 Zeilen, party-worker.js)
  - 3-Step Ersteller-Flow (Kind → Wann/Wo → Wunschliste)
  - Code-Gate für Gäste (Vorname des Geburtstagskinds)
  - Foto-Upload (clientseitig komprimiert auf 800px, JPEG 0.7, max 500KB)
  - Wunschliste mit Claim/Unclaim + "Gemeinsam schenken" + PayPal-Integration
  - Affiliate-Redirect (/go/{partyId}/{wishId}) für 8 Shops: Amazon, myToys, Thalia, Otto, Jako-o, tausendkind, Smyths Toys, LEGO
  - PayPal.me-Integration: Ersteller gibt PayPal-URL an, Gäste sehen Anteil + PayPal-Button
  - OG Meta Tags, XSS-Escaping, localStorage RSVP-Check, .ics Download, mailto Edit-Link
  - Editor: Inline-Bearbeitung, Wünsche löschen, Allergien-Übersicht
  - Auto-Motto-Farbe, Zeitvalidierung, Shop-Labels, Affiliate-Hinweis, DSGVO
  - Max 30 Gäste, Max 20 Wünsche, Überspringen-Button, 404-Seite

## Nächste Schritte
1. Cloudflare: Worker deployen (party-worker.js), KV "PARTY", DNS party.machsleicht.de
2. Amazon PartnerNet anmelden → AMAZON_TAG env var
3. Awin anmelden → AWIN_PUBLISHER_ID env var
4. Handy-Test aller Flows
5. Rätsel nach Maß (höchste Prio Feature)
6. GitHub Token rotieren (25.04.)

## Offene Fragen
- homepage.js hat toten Partyseite-Code (aufräumen?)
- Partyseite-Card auf Homepage zeigt "live" aber Worker noch nicht deployed
