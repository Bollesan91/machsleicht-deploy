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

Cowork-Sandbox kann den Windows-Git-Index NICHT direkt benutzen (Linux-Git 2.34.1 vs. Windows-Index-Format → "unknown index entry format"), und der Mount erlaubt keine Datei-Loeschung. Trotzdem kann Claude Git-Operationen durchfuehren — ueber den **PAT-Workaround**: frischer Clone in `/tmp` via HTTPS+PAT, geaenderte Dateien aus dem Mount in den Clone kopieren, von dort committen und pushen. So bleibt der gemountete Windows-Repo unberuehrt.

**PAT-Quelle:** Liegt in `.git/config` der Mount-Repo unter `[remote "origin"] url = https://Bollesan91:<PAT>@github.com/...`. Claude liest ihn vor jedem Push aus, nie hardcoden.

**Standard-Workflow je Trigger (Cowork):**

- **"Start leicht"** → Claude liest SESSION-NOTES.md aus dem Mount und gibt Briefing. KEIN `git pull` notwendig (User soll vor der Session im Terminal `git checkout draft && git pull` gemacht haben — Mount spiegelt aktuellen Stand).

- **"Ende"** → Claude schreibt die aktualisierte SESSION-NOTES.md in den Mount, dann fuehrt automatisch aus:
  ```bash
  PAT=$(grep -oP 'Bollesan91:\Kghp_[A-Za-z0-9]+' /sessions/<sess>/mnt/machsleicht-deploy/.git/config)
  WORK=/tmp/ml-push
  rm -rf "$WORK"
  git clone -q https://Bollesan91:${PAT}@github.com/Bollesan91/machsleicht-deploy.git "$WORK"
  cd "$WORK" && git checkout -q draft
  # Geaenderte Dateien aus Mount in Clone kopieren (rsync oder cp je nach Umfang)
  # commit + push:
  git add -A
  git commit -q -m "<Beschreibung>

  Co-Authored-By: Claude <noreply@anthropic.com>"
  git push -q origin draft
  ```

- **"Ende deploy"** → Wie "Ende", plus anschliessend:
  ```bash
  cd /tmp/ml-push
  git checkout -q main
  git pull -q origin main
  git merge -q --no-ff draft -m "Merge draft: <Kurzbeschreibung> (<Datum>)"
  git push -q origin main
  git checkout -q draft
  ```

**Wichtig:** Claude listet nach dem Push die Commit-Hashes (draft + ggf. main-merge) und bestaetigt dem User, dass durchgelaufen ist. Kein Terminal-Block fuer den User mehr noetig.

### Fehlerbehandlung (Cowork)

Falls eine fruehere Session den Mount-Index lokal kaputtgemacht hat (`.git/index.lock`, `.git/index.broken-cowork`), repariert der User im Terminal:
```powershell
del .git\index.lock
del .git\index.broken-cowork  # falls vorhanden
del .git\index
git reset --hard origin/draft
```
Das passiert nur wenn frueher mal direkt auf dem Mount-Repo Git-Operationen versucht wurden — mit dem PAT-Workaround in `/tmp` kann es nicht mehr auftreten.

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
