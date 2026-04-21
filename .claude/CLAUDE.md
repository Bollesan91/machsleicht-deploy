# machsleicht-deploy — Projekt-Notizen

## Projekt
- Website: machsleicht.de
- Repository: https://github.com/Bollesan91/machsleicht-deploy
- Hosting: Netlify (Deploy via main-Branch)

## Tech-Stack (Fakten, nicht ueberschreiben)
- **Email (Transactional + Marketing): Resend** — laeuft bereits im Cloudflare Worker fuer Edit-Link-Mails, API-Key als `RESEND_API_KEY` im Worker-Secret. Fuer Newsletter: Resend Audiences + Broadcasts. Double-Opt-In wird **selbst gebaut** im Worker (Resend hat kein built-in DOI). Kein MailerLite, kein ConvertKit, kein anderer Email-Tool-Silo. Begruendung: ein Tool, gemeinsame Sender-Reputation, ein API-Key, kein zweiter AV-Vertrag.
- **Hosting Partyseite + Raetsel:** Cloudflare Workers (`party-worker.js`), KV fuer State, eigene Subdomain `party.machsleicht.de`
- **Hosting Hauptseite:** Netlify (statisch + React-Hydrate)
- **Analytics:** Plausible (DSGVO-konform)
- **Affiliates:** Amazon PartnerNet (Tag `machsleicht-21`), Awin (in Anmeldung)

## Git-Workflow (ÜBERSTEUERT den generischen git-sync Skill)

Arbeitsbranch: `draft` | Deploy-Branch: `main`

### Verhalten je Umgebung

**Terminal (Desktop Claude Code, Mobile Termux/SSH):**
- **"Start leicht"** → `git checkout draft && git pull` + SESSION-NOTES.md lesen + Briefing
- **"Ende"** → `git add -A && git commit && git push` auf `draft` (KEIN Deploy, Netlify buildet `draft` nicht)
- **"Ende deploy"** → commit auf `draft` → `git checkout main && git merge draft && git push` (löst Netlify-Deploy aus)

**Cowork (Desktop-App, Agent-Mode):**

Cowork hat zwei harte Limitierungen, die Git-Operationen vollständig blockieren:
1. Mount erlaubt keine Dateilöschung ("Operation not permitted")
2. Linux-Git 2.34.1 im Sandbox kann den Windows-Git-Index nicht parsen ("unknown index entry format")

Konsequenz: **Claude führt in Cowork KEINE `git`-Befehle aus.** Nicht einmal `git status`. Alle Git-Operationen macht der User im Terminal.

- **"Start leicht"** → Claude liest SESSION-NOTES.md und gibt Briefing. Claude fragt NICHT nach Git-Status und macht KEIN pull. Der User soll vor der Cowork-Session im Terminal `git checkout draft && git pull` gemacht haben.
- **"Ende"** → Claude schreibt die aktualisierte SESSION-NOTES.md direkt (Datei-Write funktioniert im Mount) und gibt dem User einen kopierfertigen Commit-Block fürs Terminal:
  ```powershell
  cd C:\Users\Bolle\machsleicht-deploy
  git add -A
  git commit -m "<Beschreibung>

  Co-Authored-By: Claude <noreply@anthropic.com>"
  git push
  ```
- **"Ende deploy"** → Wie "Ende", plus zusätzlicher Terminal-Block:
  ```powershell
  git checkout main
  git merge draft
  git push
  ```

### Fehlerbehandlung (Cowork)

Falls eine frühere Session in kaputtem Zustand zurückgelassen wurde (z.B. `.git/index.lock` oder renamed `.git/index.broken-cowork`), repariert der User im Terminal:
```powershell
del .git\index.lock
del .git\index.broken-cowork  # falls vorhanden
del .git\index
git reset --hard origin/draft
```

### Gemeinsam (alle Umgebungen)
- Git-User: Bollesan91 / cbollweg@gmx.de
- Commit-Sprache: Deutsch
- Co-Author-Header: `Co-Authored-By: Claude <noreply@anthropic.com>`

### Hintergrund
Bolle arbeitet überwiegend vom Desktop (Claude Code / Terminal) und nutzt `draft` als Staging, um vor dem Deploy zu reviewen. Der generische `[skip netlify]`-Flow aus dem git-sync-Skill gilt hier nicht — auf `draft` baut Netlify ohnehin nicht.

## PBI-Impact-Check (PFLICHT nach jedem abgeschlossenen PBI)

Wenn ein PBI erledigt ist, wird **bevor** wir den nächsten anfangen geprüft, ob andere Stellen im Repo durch diese Änderung veraltet sind. Nicht "wurde die Arbeit gut gemacht", sondern "was hat diese Arbeit woanders veraltet gemacht".

Die 8 Orte, die potenziell betroffen sind:

1. **Status-Badges** — sind alle Produkt-Status (live/soon/planned) in `js/index.js` noch korrekt?
2. **Texte** — sprechen Copy-Passagen (Homepage, SEO-Fallback, Motto-Seiten, FAQ) noch von "bald" / "geplant" / alten Feature-Namen?
3. **Demo-Vorschauen** — zeigen die Homepage-Demo-Cards ("So sieht's aus") noch die aktuellen Features und Produkte?
4. **Feature-Zahlen** — stimmen Zahlen wie "17 Mottos / 153 Spiele / 9 Schatzsuche-Themen / 3 Altersgruppen" überall: Hero, Meta-Description, Schema.org (`featureList`, `description`, FAQ), Trust-Zeile, Footer, SEO-Fallback?
5. **Validator** — braucht `validate-all.sh` eine neue oder angepasste Regel, die den erledigten PBI dauerhaft absichert?
6. **Interne Links** — gibt es neue Seiten, die noch nirgends verlinkt sind? Oder tote Links zu entfernten/umbenannten Seiten?
7. **Sitemap + Redirects** — sind neue URLs in `sitemap.xml`, entfernte URLs via 301 in `_redirects`?
8. **SEO↔React-Konsistenz** — stimmen `index.html` (SEO-Fallback) und `js/index.js` (React-Variante) in Texten, Zahlen, Produktstatus und Trust-Signalen überein?

Ablauf: Nach dem PBI-Abschluss jeden der 8 Punkte laut durchgehen, betroffene Dateien benennen, korrigieren, dann `bash validate-all.sh` laufen lassen. Erst wenn der Check sauber ist, gilt der PBI als wirklich abgeschlossen.

## Zentrale Dokumente
Nur zwei Docs im Repo-Root:
- **STRATEGIE.md** — Master-Strategie
- **BACKLOG-AUDIT.md** — Backlog / PBIs

Keine parallelen Strategie-Docs in `_dev/docs/` oder sonstwo.

## Deploy-Regel (kritisch)
Netlify-Deploys kosten Credits. Außerhalb von "Ende deploy" wird niemals eigenständig auf `main` gemerged oder gepusht. Im Zweifel nachfragen.
