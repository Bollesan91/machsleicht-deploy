# Session-Notizen

## Letzte Session
**Datum:** 20.04.2026 (Session #4, Opus 4.7) — Workflow-Aufräumen, PBI-Impact-Check in CLAUDE.md verankert, P1-15 strategisch neu geschnitten

## Was wurde gemacht

### 1. Resultate der letzten Session geprüft (Code-Check)
- ✅ Social Proof im Hero (React + SEO-Fallback konsistent): "Von Eltern entwickelt · 17 Mottos · Ohne Anmeldung"
- ✅ 4 Demo-Cards auf Homepage (Plan mit ~47€, Schatzkarte mit 4 Stationen, Dino-Einladung, Partyseite mit RSVP-Liste)
- ✅ Partyseite `status:"live"` in js/index.js
- ✅ `validate-all.sh` grün (alle 6 Stufen bestanden)
- 🚩 **Lücke gefunden:** 8-Punkte PBI-Impact-Check war NICHT in CLAUDE.md, nur als Stichwort in SESSION-NOTES.md — jetzt behoben

### 2. CLAUDE.md komplett neu geschrieben
- Alter draft/main-Workflow war auskommentiert → zurückgeschrieben (Bolle arbeitet wieder vom Desktop)
- Git-Workflow explizit als "ÜBERSTEUERT den generischen git-sync Skill" markiert
  - "Start leicht" → pull auf `draft`
  - "Ende" → commit + push auf `draft` (kein Deploy)
  - "Ende deploy" → draft in main mergen + push (Deploy)
- **PBI-Impact-Check als harte Regel dokumentiert:** Nach jedem PBI wird geprüft, ob andere Stellen im Repo veraltet sind. Nicht Selbst-Check, sondern Downstream-Check. Die 8 Orte: Status-Badges, Texte, Demo-Vorschauen, Feature-Zahlen, Validator, interne Links, Sitemap+Redirects, SEO↔React-Konsistenz
- Deploy-Regel (Credits kosten Geld) explizit
- Alte Cowork-Artefakte (Elefanten-Memory-Test, strategie-status.docx) entfernt

### 3. P1-15 Email-Capture strategisch neu gedacht
**Ausgangsfrage:** Bolle hat PDF-per-Mail-Köder als zu schwach eingeschätzt. Stattdessen: "Eleganter Hebel pro CTA".

**Ergebnis der Diskussion:**
- PDF als Köder ist schwach → Plan ist eh sichtbar, kein Postfach-Wert
- **Link zum fertigen Asset** funktioniert gut für zeitversetzt genutzte Outputs (Einladung, Partyseite, Schatzsuche) — weil das Asset später gebraucht wird und "nicht verlieren" ein echtes Problem löst
- Planer selbst braucht anderen Hebel: **Erinnerungs-Mail 7 Tage vorher** (= Nurture-Flow, spätere Session)

**Scope-Revision festgehalten in BACKLOG-AUDIT.md:**
- Pilot auf **Einladung** (nicht Planer): höchster wahrscheinlicher Nutzen, simpler, Template wiederverwendbar für Partyseite + Schatzsuche
- Mini-MVP: Kein jsPDF, kein PDF-Attachment — nur Link + Datenbank-Token
- 3–4h Code statt 1–2 Tage
- Rollout: Einladung → 2 Wochen Daten sammeln → wenn Opt-In ≥15% auf Partyseite + Schatzsuche (je 1–2h wegen Template-Wiederverwendung)
- **Blockiert durch MailerLite-Account** (Bolle setzt am Desktop auf)

### 4. P1-15 Status & Prio
- Prio bleibt **P1** (unverändert)
- Status in Backlog-Tabelle auf 🚧 "blockiert durch Account-Setup"
- Detail-Spec in BACKLOG-AUDIT.md um Scope-Revision erweitert — damit nächste Session nicht bei Null diskutiert wird

## Nächste Schritte

**Sobald Bolle MailerLite-Account hat (macht er am Desktop):**
1. Account-Setup: EU-Rechenzentrum wählen, Domain machsleicht.de verifizieren, AV-Vertrag akzeptieren, API-Key generieren, Group "Einladungs-Interessenten" anlegen
2. API-Key als Cloudflare-Worker-Secret hinterlegen (Name: `MAILERLITE_API_KEY`)
3. Bolle sagt nur Bescheid dass der Key liegt — dann P1-15 Pilot bauen (Einladung)

**Alternative Prio-Kandidaten (nicht blockiert):**
1. **P2-20 Datenübergabe Planer → Tools** (4–6h, reines Frontend) — Top-5 in Prio, aber größer für Mobile-Session
2. **P1-8 Elite-Motto** (1–2h) — Einhorn oder Paw Patrol? Content-Arbeit, mobil gut machbar
3. **Cloudflare HTTPS+HSTS** für party.machsleicht.de — 5 Min Anleitung + Bolle klickt am Desktop

## Offene Fragen

- Einhorn oder Paw Patrol als nächstes Elite-Motto? (aus Vorsession offen)
- MailerLite vs. Brevo vs. Resend — Empfehlung war MailerLite (EU-Rechenzentrum, im PBI genannt, Nurture-Flows nativ)
- Awin-Freischaltung: Wann kommt die Publisher-ID? (aus Vorsession offen)
- Demo-Einladung: Welches Stock-Foto als Beispiel-Kind? (aus Vorsession offen)

## Status der Site nach dieser Session

Keine inhaltlichen Änderungen an der Site — nur Doku:
- CLAUDE.md von 24 auf 45 Zeilen (Workflow-Stand + PBI-Impact-Check)
- BACKLOG-AUDIT.md: P1-15 Status + Scope-Revision dokumentiert
- Produkte weiterhin: 8 live, 0 bald, 0 geplant
- Sitemap: 223 URLs (unverändert)
- Validator: grün (unverändert)
