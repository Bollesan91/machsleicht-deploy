# Session-Notizen

## Letzte Session
**Datum:** 24.04.2026 (Chat-Session, Opus 4.7) — Mail-Infrastruktur komplett live für machsleicht.de + machsruhig.de

## Was wurde gemacht

### Mail-Infrastruktur komplett aufgesetzt (kein Code-Commit — reine Infra-Session)

**Kontext-Korrektur zum Start:** Bolle hatte sich versehentlich bei Mailjet registriert (Transactional-Service, nicht Inbox-Hosting). Korrekt: Migadu für Business-Inbox. Mailjet-Free-Account ignoriert, kein Risiko.

**machsleicht.de:**
- Migadu-Domain hinzugefügt, 7 DNS-Records in Cloudflare angelegt:
  - 1× Verification TXT (`hosted-email-verify=mabu9bj7`)
  - 2× MX (`aspmx1.migadu.com` Prio 10, `aspmx2.migadu.com` Prio 20)
  - 3× DKIM CNAME (`key1/2/3._domainkey`, Target ohne Underscore wegen Cloudflare-Restriktion)
  - 1× SPF TXT (`v=spf1 include:spf.migadu.com -all` auf `@`)
- DMARC bereits vorhanden (`p=none`), unverändert gelassen
- Domain aktiv seit 2026-04-24T06:36:43Z
- **Mailbox `kontakt@machsleicht.de`** angelegt (Display Name "Machsleicht Kontakt")
- Send + Receive getestet, beide Richtungen OK
- **Impressum-Konformität wiederhergestellt** — kontakt@ ist die gelistete Adresse

**machsruhig.de:**
- Domain lag bei INWX (Nameservers ns.inwx.de, ns2.inwx.de, ns3.inwx.eu)
- **Komplett auf Cloudflare migriert:**
  - Cloudflare-Site angelegt (Free-Plan)
  - AI-Crawler: "Do not block (allow)" — Entscheidung für max. AI-Referral-Traffic bei Lead-gen-Geschäftsmodell
  - DNS-Scan importierte 2 bestehende Records: A `machsruhig.de → 75.2.60.5` (Netlify) + CNAME `www → machsruhig.netlify...`
  - 8 Migadu-Records hinzugefügt (analog machsleicht, zusätzlich DMARC):
    - 1× Verification TXT (`hosted-email-verify=eoc7sc2t`)
    - 2× MX (Prio 10/20)
    - 3× DKIM CNAME
    - 1× SPF TXT
    - 1× DMARC TXT (`v=DMARC1; p=quarantine;` — strenger als machsleicht, Migadu-Default akzeptiert)
  - Nameserver-Switch bei INWX auf `luciane.ns.cloudflare.com` + `vick.ns.cloudflare.com`
  - DNSSEC-Check via viewdns.info: war nicht aktiv, keine Reparatur nötig
  - Propagation < 10 Min (sehr schnell für .de)
- Migadu-Domain validiert, aktiv
- **Mailbox `kontakt@machsruhig.de`** angelegt
- Empfang getestet, OK

**Weiterleitung beide Mailboxen:**
- `kontakt@machsleicht.de` → `christian.bollweg@advergy.de` (Modus A: Keep a copy)
- `kontakt@machsruhig.de` → `christian.bollweg@advergy.de` (Modus A: Keep a copy)
- **Grund:** Übergangslösung bis GMX-IMAP-Einbindung läuft. So sieht Bolle eingehende Mails in seiner Advergy-Inbox, die er täglich checkt. Originale bleiben in Migadu erhalten für spätere IMAP-Einbindung und korrekte Antwort-Absenderadresse.
- Forwarding-Tests beidseitig erfolgreich

### Resend-Kollisions-Analyse

Resend läuft auf Subdomain `send.machsleicht.de` (MX + SPF dort isoliert, DKIM via `resend._domainkey`). Migadu läuft auf Hauptdomain `@`. **Zero Overlap** — kein Record-Update bei Resend nötig, System funktioniert unverändert.

## Aktueller Stand der Mail-Infrastruktur

| Domain | Business-Inbox | Transactional | Status |
|---|---|---|---|
| machsleicht.de | `kontakt@` via Migadu | Resend auf `.send` | ✅ live, Forward an Advergy |
| machsruhig.de | `kontakt@` via Migadu | — (noch nicht nötig) | ✅ live, Forward an Advergy |
| advergy.de | bestehende Infra | — | unverändert |

## Nächste Schritte

### Kurzfristig (Mail-bezogen)

- **🗓️ 08.05.2026:** Migadu-Trial-Ende. Entscheidung **Mini ($90/Jahr) vs. Micro ($19/Jahr)** fällig. Micro reicht vermutlich (Business-Solo-Usage), aber "some features unavailable" — im Trial Features testen, dann entscheiden.
- **GMX-IMAP-Einbindung** für beide Mailboxen (~15 Min Session) — damit Mails direkt in GMX-Interface statt Advergy-Forwarding
- **Mailjet-Account:** Option A (ignorieren) bleibt — kostenloses Free-Tier, kein Risiko
- **Spam-Check in Advergy-Inbox:** Erste Mails kurz beobachten, falls SPF-Alignment-Issue

### machsleicht-Entwicklung (aus letzter Session)

- **#10 P1-15** Email-Capture Pilot Einladung (4–5 Std) — jetzt Top-Prio
- **#11 P1-17** DSGVO-Hygiene Partyseite A+C (1,5 Std Laptop)
- **#16 P1-12** Einschulung SEO-Cluster — Launch bis 31.05.!

### Extern (Bolle allein, aus letzter Session offen)

1. **Cloudflare Worker** `party-worker.js` deployen (P1-16 Foto-Crop + Beteiligen-amount im Repo, nicht live)
2. ~~**Migadu Mini** einrichten~~ ✅ erledigt (Trial läuft bis 08.05.)
3. Browser-Test Partyseite auf Mobile

## Offene Fragen

- **Feature-Gap Micro vs. Mini:** Im Trial konkret testen, was bei Micro fehlt (Migadu-Default gibt nur "some features unavailable" an, keine Liste)
- **DMARC auf machsleicht.de:** Aktuell `p=none`, langfristig auf `p=quarantine` ziehen sobald Warmup durch ist?
- **Spam-Filter Advergy:** Werden Forwards von Migadu über Wochen hinweg stabil eingeliefert, oder Reputation-Probleme? → In 2 Wochen evaluieren.

## Status der Site nach diesem Deploy

- **Keine Code-Änderungen** — reine Infrastruktur-Session
- **Live auf machsleicht.de:** unverändert seit P1-20 Deploy vom 23.04.
- **Live auf party.machsleicht.de (Cloudflare Worker):** weiterhin unverändert — P1-16-Änderungen warten auf Bolles manuellen Cloudflare-Deploy
- **Live auf machsruhig.de:** unverändert (Netlify-Deploy), nur DNS jetzt via Cloudflare
- **Repo:** 40 PBIs in Roadmap, P1-20 zuletzt erledigt, nächstes aktives Ticket P1-15
