# Session-Notizen

## Letzte Session
**Datum:** 13.04.2026

## Was wurde gemacht
- **Planer Flow komplett umgebaut** — Plan first, Actions second:
  - Mode Toggles nach oben (steuern alles darunter)
  - Zeitplan sofort sichtbar (Kernversprechen)
  - Schatzsuche direkt danach (optionaler Add-on)
  - Snacks → Deko → Mitgebsel → "Das reicht" + Kosten
  - Dann erst: "Plan steht — jetzt einladen & teilen" → Einladung → Partyseite → Share → PDF
- **Score entfernt** — Vanity-UX ohne echten Nutzen, "Das reicht" liefert die Beruhigung besser
- **Partyseite-Optimierungen aus Produkt-Audit:**
  - Planer: "Bald verfügbar" → aktiver CTA mit Prefill-Params (childName, age, motto, mottoEmoji)
  - Worker: Wunschliste "(optional)" → "Verhindert Doppelgeschenke — Gäste reservieren direkt."
  - Worker: Share-Text konditional (mit/ohne Wunschliste)
  - Worker: Gäste-Hero Subtext konditional
- Bug gefunden und gefixt: motto.icon → motto.emoji
- Share-Text "inkl. Wunschliste" nur wenn tatsächlich Wünsche vorhanden
- 3-Stufen-Validierung komplett, alle Checks bestanden

## Nächste Schritte
1. **Party Worker in Cloudflare re-deployen** (party-worker.js Änderungen nur im Git!)
2. P1-5: GitHub Token rotieren (Deadline 25.04.!)
3. Planer→Partyseite End-to-End testen (Prefill-Params)
4. Erste echte Test-Party durchlaufen lassen
5. Dino 3-5 + Dino 9-12 nach Master-Template
6. Nächstes Motto (Piraten oder Einhorn)
7. ScoreCheck-Funktion + calcScore als Dead Code aufräumen (optional)

## Offene Fragen
- Party Worker Cloudflare re-deploy: manuell oder wrangler CLI?
- Skalierung: 60 Seiten manuell oder Content-Generator?
- Amazon PartnerNet-Tag machsleicht21-21 verifizieren
