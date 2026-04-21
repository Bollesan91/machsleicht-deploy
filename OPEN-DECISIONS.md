# OPEN-DECISIONS.md — Entscheidungen, die auf den Menschen warten

Diese Datei wird von Claude im Autoloop gefüllt, wenn eine Entscheidung erforderlich ist, die Claude nicht selbst trifft. Der Mensch liest sie, wenn er zurückkommt, entscheidet, und setzt den Status auf ERLEDIGT.

Format pro Eintrag siehe unten.

---

## Leer-Zustand

Wenn diese Datei keine OFFENEN Einträge hat, läuft der Autoloop sauber durch. Wenn sie sich füllt, bedeutet das: Claude stößt an strategische Grenzen und braucht dich.

---

## Beispiel-Eintrag (zum Orientieren — wird überschrieben, wenn echte Einträge kommen)

### [2026-04-21 22:30] Reply-To-Adresse für Partyseite-Emails

**Ticket:** `feat/dsgvo-reply-to`
**Blocker?** Ja

**Kontext:** In DSGVO-Hygiene-Arbeit kommt die Frage, welche Reply-To-Adresse Resend für transactional Emails nutzen soll. Aktuell ist `noreply@machsleicht.de` gesetzt, aber User-Feedback-E-Mails landen im Nirvana.

**Optionen, die Claude sieht:**
- A: `party@machsleicht.de` über Cloudflare Email Routing → leitet an `kontakt@machsleicht.de` weiter. Vorteil: saubere Trennung. Nachteil: 20 Min Setup in Cloudflare.
- B: `kontakt@machsleicht.de` direkt als Reply-To. Vorteil: null Setup. Nachteil: Party-Emails und Kontakt-Anfragen vermischen sich.
- C: `reply@machsleicht.de` mit Resend-Inbound. Vorteil: sehr sauber, Resend-Native. Nachteil: Resend-Inbound kostet ggf. extra, muss geprüft werden.

**Claude's Vorschlag:** A, weil separate Adresse für Party-Kontext sinnvoll ist und Cloudflare Email Routing kostenlos ist.

**Status:** OFFEN

---
