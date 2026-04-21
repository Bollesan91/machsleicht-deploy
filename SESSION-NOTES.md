# Session-Notizen

## Letzte Sessions (20.04.2026)

Heute zwei Sessions parallel: Desktop morgens (#4), Mobile abends (#2). Reihenfolge in der Repo-Historie war Mobile zuerst (auf main), dann Desktop (auf draft). Beim „ende" zusammengeführt mit `merge main into draft`.

## Was wurde gemacht

### Mobile-Session #2 (abends, Opus 4.7) — Bugfix + Strategie

**1. Partyseite-Bugfix (Commit `a694178`)** — Mobile-Live-Test deckte 2 Bugs auf:
- `null is not an object ('mailtoLink')` beim Erstellen → Legacy-Zeile aus dem Resend-Redesign entfernt
- iOS Uhrzeit-Feld kollabiert in Flex-Container → `min-width:0` + `box-sizing:border-box` gefixt
- **Status: Bug ist im Repo, NICHT auf Cloudflare deployed** — wartet auf P1-16 Laptop-Session

**2. Backlog-Update (Commit `75bdb2c`)** — P1-16 „Partyseite Follow-Ups" als Sequenz #8 aufgenommen:
- Cloudflare-Deploy des Bugfix
- Email-End-to-End-Test mit Resend
- Reply-To-Handling
- Alte `guestView()` Cleanup
- Live-Test mit verschiedenen Mottos
- Foto-Crop-Verbesserung (Slider + Drag, aus Mobile-Test)
- Beteiligen custom amount
- Kill List + Internal Linking Audit

**3. Strategie 0.7 + 0.8 (Commit `41e7e17`)** — Nach Durcharbeiten der Produkt-Matrix:
- **0.7 Monetarisierungs-Validierungs-Reihenfolge** (4 Stufen): Zahlungsbereitschaft → Mittlerer Preispunkt → Retention → Abo (Q4 2026 frühestens)
- **0.8 Was wir bewusst NICHT bauen** (9 Ideen explizit verworfen mit Re-Evaluation-Trigger): Zwangs-Kopplung, Familien-Anlass-Abo, WhatsApp-Business-API, B2B-White-Label, Kind-Profil-Standalone, Marketplace, Standalone-Mikro-Tools, Notfall-Modus, Concierge

**4. Token rotiert** — Neuer GitHub PAT in lokaler Remote-URL eingebaut.

### Desktop-Session #4 (morgens, Opus 4.7) — Workflow + P1-15-Schliff (Commit `6740467`)

**1. Resultate der vorherigen Session geprüft (Code-Check):**
- ✅ Social Proof im Hero, 4 Demo-Cards auf Homepage, Partyseite `status:"live"`
- ✅ `validate-all.sh` grün
- 🚩 **Lücke gefunden:** 8-Punkte PBI-Impact-Check war nicht in CLAUDE.md — jetzt behoben

**2. CLAUDE.md neu geschrieben:**
- draft/main-Workflow als „ÜBERSTEUERT generischen git-sync Skill" markiert
- PBI-Impact-Check als harte Regel: nach jedem PBI 8 Downstream-Orte prüfen (Status-Badges, Texte, Demo-Vorschauen, Feature-Zahlen, Validator, interne Links, Sitemap+Redirects, SEO↔React-Konsistenz)
- Deploy-Regel explizit (Credits kosten Geld)

**3. P1-15 strategisch neu gefasst:**
- PDF als Köder ist schwach → ersetzt durch **Link zum fertigen Asset** für zeitversetzt genutzte Outputs (Einladung, Partyseite, Schatzsuche)
- Pilot auf Einladung (nicht Planer): höchster wahrscheinlicher Nutzen, simpler, Template wiederverwendbar
- Mini-MVP: kein jsPDF, nur Link + Token (3–4h statt 1–2 Tage)
- Status auf 🚧 (blockiert durch MailerLite-Account, Bolle setzt am Desktop auf)

## Nächste Schritte (Laptop-Session bevorzugt)

**Priorität 1 (kritisch — Erstellen-Flow auf Production aktuell kaputt):**
1. Cloudflare Quick Editor öffnen → `party-worker` Worker
2. `party-worker.js` (1570 Zeilen) aus Repo rein kopieren → „Save and deploy"
3. Test auf `party.machsleicht.de`: Erstellen-Flow läuft ohne Crash, Uhrzeit bündig mit Datum auf iOS

**Direkt danach (P1-16 Follow-Ups, siehe Backlog Sequenz #8):**
- Email-End-to-End-Test mit Resend
- Foto-Crop-Umbau (Slider + Drag, ~45–60 Min)
- Reply-To, alte `guestView()` Cleanup, Mottos-Test

**Parallel/nebenher:**
- MailerLite-Account-Setup (entblockt P1-15 Sequenz #9)
- API-Key als Cloudflare-Worker-Secret `MAILERLITE_API_KEY` hinterlegen
- Sobald Key liegt: P1-15 Pilot auf Einladung bauen

**Roadmap-Folge nach P1-16/P1-15:**
- #10 P2-20 Datenübergabe Planer → Tools (4–6 Std, reines Frontend)
- #11 P2-13 Gumroad-Produkte (Piraten + Dino, 4h pro Produkt)
- #14 P1-12 Einschulungs-Planer (**Launch bis 31.05.!** SEO-Vorlauf)

## Offene Fragen
- Einhorn oder Paw Patrol als nächstes Elite-Motto (P1-8)?
- Awin-Freischaltung: Wann kommt die Publisher-ID?
- Demo-Einladung: Welches Stock-Foto als Beispiel-Kind?
- Reply-To: `party@machsleicht.de` über Cloudflare Email Routing oder Resend?

## Status der Site nach diesen beiden Sessions
- **Partyseite-Erstellung in Production: BROKEN** bis Cloudflare-Deploy erfolgt (Fix ist im Repo, nicht live)
- Alles andere: unverändert zum Stand 19.04. abends
- Repo: 37 PBIs in Roadmap, 8 davon erledigt, 1 in Arbeit (P1-15 🚧)
- STRATEGIE.md hat jetzt 8 Leitplanken-Abschnitte (0.1 bis 0.8)
- Sitemap: 223 URLs (unverändert)
