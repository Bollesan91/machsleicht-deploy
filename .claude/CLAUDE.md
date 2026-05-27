# machsleicht-deploy — Projekt-Notizen

## Projekt
- Website: machsleicht.de
- Repository: https://github.com/Bollesan91/machsleicht-deploy
- Hosting: Netlify (Deploy via main-Branch)

## Tech-Stack (Fakten, nicht ueberschreiben)
- **Email Routing-Layer: Migadu Micro Plan** ($19/Jahr, almost-unlimited Domains via soft limit) — **NICHT primäres Postfach, sondern reines Mail-Routing** für `machsleicht.de` UND `machsruhig.de`. Domains konfiguriert ~9. Mai 2026, Subscription bezahlt 26./27.05.2026 (vorher Trial expired 8. Mai → 19 Tage suspended → alle Replies an party@... gebounced). Migadu empfängt Mails an **`kontakt@machsleicht.de`** (zentrale Adresse — `party@...` existiert NICHT) und **forwarded sie an `christian.bollweg@advergy.de`** (echtes Postfach via Microsoft 365 / Advergy). Storage bleibt deshalb ~0 GB. Migadu stellt SPF/DKIM/DMARC für beide Domains. **Bewusste Plan-Wahl Micro statt Mini ($71/Jahr gespart):** Multi-Admin, API-Access, Domain-Health-Monitoring werden nicht gebraucht — Solo-Setup ohne aktive Webmail-Nutzung. **Upgrade-Trigger:** wenn Worker programmatisch Mailboxen anlegen muss oder >20 Replies/Tag aus Migadu-SMTP rausgehen. **Bekanntes Caveat:** Antworten aus Outlook/Advergy zeigen Absender `christian.bollweg@advergy.de`, nicht `kontakt@machsleicht.de` — für markenkonforme Replies aus Migadu-Webmail antworten oder SMTP-Send-As in Outlook konfigurieren.
- **Email Transactional (API): Resend** — laeuft im Cloudflare Worker fuer Edit-Link-Mails + Newsletter-Versand. API-Key als `RESEND_API_KEY` Worker-Secret. FROM=`kontakt@machsleicht.de` (Migadu-Domain, Resend nutzt DKIM-Signing der via Resend-Domain-Verification eingerichteten Sender). **Cloudflare Worker Env-Vars** `RESEND_FROM`/`RESEND_REPLY_TO` muessen ebenfalls auf `kontakt@machsleicht.de` gesetzt sein, sonst nutzt der Code seinen Default (heute auch `kontakt@...` ab Commit 27.05.2026). Fuer Newsletter: Resend Audiences + Broadcasts. Double-Opt-In **selbst gebaut** im Worker (Resend hat kein built-in DOI). Kein MailerLite, kein ConvertKit. Begruendung: zwei Tools mit klarer Trennung — Migadu fuer Inbox + Identity, Resend nur als API-Send-Schicht. Sender-Reputation gemeinsam ueber DNS.
- **Hosting Partyseite + Raetsel:** Cloudflare Workers (`party-worker.js`), KV fuer State, eigene Subdomain `party.machsleicht.de`
- **Hosting Hauptseite:** Netlify (statisch + React-Hydrate)
- **Analytics:** Umami (Cloud, DSGVO-konform, ohne Cookies; Website-ID `72b5eb12-dfde-4333-9bc7-0c2880864df2` auf `cloud.umami.is`). **Code-Konvention:** Tracking-Calls verwenden den `plausible(name, {props: {...}})`-API-Wrapper, der intern auf `umami.track(name, {...})` mappt (Provider-Abstraktion in jedem HTML-Snippet). Wenn neuer Tracking-Code geschrieben wird: weiter `plausible(...)` aufrufen, NICHT direkt `umami.track`. So bleibt Provider-Wechsel = 1 Zeile Shim-Edit statt 30 Call-Sites. Kein Google Analytics, kein gtag, kein Fathom.
- **Affiliates:** Amazon PartnerNet (Tag **`machsleicht21-21`** — verifiziert per PartnerNet-Screenshot 26.05.2026; vorher fälschlich als `machsleicht-21` dokumentiert und im Code, 2234 Vorkommen wurden korrigiert), Awin (in Anmeldung)

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
  # NUL-Padding-Check je kopierter Datei (Windows-Mount-Bug), dann commit + push:
  git add -A
  git -c user.name="Bollesan91" -c user.email="cbollweg@gmx.de" commit -q -m "<Beschreibung>

  Co-Authored-By: Claude <noreply@anthropic.com>"
  git push -q origin draft
  ```

- **"Ende deploy"** → Wie "Ende", plus anschliessend:
  ```bash
  cd /tmp/ml-push
  git checkout -q main
  git pull -q origin main
  git -c user.name="Bollesan91" -c user.email="cbollweg@gmx.de" merge --no-ff draft -m "Merge draft: <Kurzbeschreibung> (<Datum>)"
  # NACH dem merge: Exit-Code pruefen oder Log gegenchecken — nicht nur auf "push OK" verlassen\!
  git push -q origin main
  git checkout -q draft
  # Abschluss-Verifikation:
  git log --oneline -3 main  # Merge-Commit muss oben stehen
  ```

**Kritisch — zwei wiederkehrende Fehlerquellen:**

1. **`-c user.name/email` ist PFLICHT bei commit UND merge.** Die Cowork-Sandbox hat kein konfiguriertes Git-Identity. Ohne die `-c`-Flags failt `git commit`/`git merge` mit `fatal: unable to auto-detect email address`, aber ein nachfolgender `git push` meldet trotzdem "OK" (weil nichts zu pushen ist). Fehler wird stillschweigend verschluckt. Deshalb: immer mit `git -c user.name="Bollesan91" -c user.email="cbollweg@gmx.de" commit/merge ...` arbeiten, UND nach dem Push per `git log --oneline -3 main` gegenchecken, dass der Merge-Commit wirklich oben steht.

2. **NUL-Padding via Windows-Mount.** Das `Write`-Tool hinterlaesst Dateien auf dem Mount gelegentlich mit NUL-Bytes am Ende (Dateigroesse = alte Groesse, echter Content davor). Nach jedem Write-Tool-Einsatz auf den Mount verifizieren: `python3 -c "import sys; d=open(sys.argv[1],'rb').read(); print(len(d.rstrip(b'\x00')), len(d))" <file>` — wenn Werte differieren, via `head -c <real-size>` truncaten. Bei laengeren/komplexeren Dateien lieber gleich via bash-heredoc direkt auf Mount schreiben und den Write-Tool-Umweg sparen.

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
Im Repo-Root als Living-Wahrheiten:
- **STRATEGIE.md** — Master-Strategie (Monetarisierung, Vision, Cut-Begründungen)
- **BACKLOG-AUDIT.md** — Priorisierte PBI-Liste
- **AUDIT.md** — Repo-/Routing-/Datenwahrheit-Grundwahrheit (Live-Dokument)
- **SESSION-NOTES.md** — Letzter Session-Stand
- **ARCHITECTURE.md** — Architektur-Übersicht (**aktuell veraltet**, Fix P1-45)

Keine parallelen Strategie-Docs in `_dev/docs/` (außer WORKER-CONTRACT.md, RELEASE-GATE.md, ENV-VARS.md als technische Referenz).

## Deploy-Regel (kritisch)
Netlify-Deploys kosten Credits. Außerhalb von "Ende deploy" wird niemals eigenständig auf `main` gemerged oder gepusht. Im Zweifel nachfragen.

## Knowledge-Transfer zwischen Sessions

Wissen fließt über **Git** zwischen Chats, nicht über Claude-Memory (das ist Backup, nicht primäre Quelle). Drei Transfer-Kanäle:

### Kanal 1: AUDIT.md (Living-Dokument, persistent)
Erste Anlaufstelle für jeden neuen Chat. Sollte beim „Start leicht" zusätzlich zu SESSION-NOTES + CLAUDE.md gelesen werden — **mindestens die kuratierten Sektionen**:
- §1 Repo + Branches
- §4 URL-Param-Konvention
- §5.2 Motto-Datenwahrheit-Brüche (aktive Issues)
- §13 Fix-PBI-Liste (P1-NN)
- §15 Offene Strategie-Entscheidungen

Lange Sektionen (Worker-Vertrag, Tracking-Events) bei Bedarf on-demand.

### Kanal 2: `_dev/handoff/*.md` (Session-spezifische Übergaben)

Für aktive Diskussionen die **noch nicht** in AUDIT/SESSION-NOTES kondensiert sind. Beispiele:
- „Diskussion zu Halloween-Strategie in Schwebe — Vor-/Nachteile gesammelt"
- „Stratege-Doc V5.4 in Arbeit, nächster Schritt: Adversarial-Review"
- „Funnel-Messung gestartet 2026-05-15, erste Daten am 2026-06-15 erwartet"

**Format:** Datum-Topic-Slug (`2026-05-12-sprint-1-abschluss.md`)
**Inhalt:** TEMPLATE siehe `_dev/handoff/TEMPLATE.md`
**Lebensdauer:** Wenn ein Handoff-Thema in AUDIT.md oder SESSION-NOTES.md kondensiert ist, **handoff-File löschen**. Nicht akkumulieren — sonst wird es Archive-Spam.

### Kanal 3: BACKLOG-AUDIT.md (Sprint-Backlog)

Was sind die aktiv offenen P1-NN-Tickets? Beim „Start leicht" mindestens die Top-10 lesen, damit der neue Chat weiß was als nächstes ansteht.

### Anti-Patterns

- **Skill-Files editieren** (`AppData/Roaming/Claude/...`) — diese sind generisch für beide Projekte (machsleicht + machsruhig). Projektspezifisches gehört in `.claude/CLAUDE.md` im Repo.
- **Alle Docs auto-laden** — Token-Explosion. Kuratierte Sektionen + on-demand reicht.
- **Parallel-Wahrheiten** — wenn etwas in AUDIT/SESSION-NOTES steht, gehört es NICHT zusätzlich in Handoff oder Memory.
- **Memory als primärer Speicher** — Memory ist Claude-Profile-Wissen (Bolles Workflow, Patterns), nicht Projekt-Wissen. Projekt-Wissen lebt in Git.

## Self-Audit-Methodik (eingeführt 2026-05-12)

Nach jedem nicht-trivialen Output (z.B. AUDIT.md, größere Code-Diffs, Strategie-Docs):

1. **Challenge** — Behauptungen identifizieren, nicht abnicken
2. **Verify** — gegen echten Code/State per Grep/Read prüfen
3. **Fix** — gefundene Fehler in eine v2 schreiben
4. **Re-bewerten** — neue Version selbst challengen, bis Self-Assessment ≥ 8/10

Nicht inflationär — nur wenn der Output „Living-Wahrheit" werden soll (Audit, Architektur, Master-Strategie). Code-Diffs reichen normalerweise mit einem Self-Pass.

## Helfer-v3 Regeln (verbindlich, eingeführt 2026-05-26)

Helfer-v3 ist das Adversarial-Review-Pattern mit Anti-Sycophancy-Korrektur (Subagent-Scores systematisch -7 Pkt zu hoch).

### Pflicht-Anwendung

Bei JEDEM inhaltlichen Output (Phase-B-JSONs, Hub-/Age-/Schatz-Pages, Worker-Code, Hub-HTML, neue Mottos) — vor commit/deploy.

### KRITISCHE EINSCHRÄNKUNG (eingeführt 2026-05-26 nach Welle-1A-Regress)

**Sub-Agents (Agent-Tool, TaskCreate) sind EXPLIZIT VERBOTEN für:**
1. **Reviewen** — Adversarial-Reviews, Re-Verifies, Score-Vergaben, Sicherheits-Audits
2. **Rewriten** — Content-Generation, HTML-Page-Generation aus Templates, JSON-Massen-Edits, Code-Fixes

**Begründung:** Welle 1A (party-worker.js) wurde via Python-Skript durch Sub-Agent angeblich korrekt gefixt — war aber fundamental kaputt (json(x, request) statt json(x, 200, request)). Sub-Agents geben oft "looks-OK"-Status ohne den End-to-End-Effekt zu prüfen. Score-Inflation von +7 Pkt ist symptomatisch.

**Stattdessen erlaubt für Review:**
- **Chrome-MCP live** — direkt auf machsleicht.de oder localhost-Preview navigieren, JS-Tool für DOM-Inspektion, JSON-LD-Validierung, h1/meta-Checks
- **WebFetch** — Live-Page mit Markdown-Extract und harter Q&A-Liste
- **Lokales Grep + Read durch Haupt-Claude** — eigene Augen, keine Delegation

**Stattdessen erlaubt für Rewrite:**
- **Haupt-Claude direkt** — Edit/Write-Tools, file-by-file, mit Verify-Reads
- **Heredoc-Skripte ausgeführt durch Bash-Tool** — wenn das Skript klein und nachvollziehbar ist, Haupt-Claude schreibt es selbst und führt es aus
- **NICHT** ein Agent der "machst-du-mal-das-Skript-und-führs-aus" delegiert

### Welche Sub-Agent-Nutzung bleibt erlaubt

- **Read-only Exploration** (Explore-Agent für "wo ist X definiert" / "welche Files referenzieren Y") — keine inhaltliche Bewertung
- **Codebase-Search** — Suchen nach Patterns ohne Rewrite
- **Plan-Agent** — Architektur-Plan, OHNE direkte Code-Generierung

### Score-Korrektur

Selbst bei Chrome-MCP-Reviews: eigene Bewertung kritisch hinterfragen. Wenn Output sich "fertig" anfühlt nach Runde 1 — vermutlich falsch. Erst nach 3 echten Verbesserungsrunden ehrliche Score-Vergabe ≥85.

### Anti-Sycophancy-Indikatoren

Score wahrscheinlich zu hoch wenn:
- Score >90 nach erster Runde
- Reviewer findet "alles greift sauber"
- Keine konkreten Zeilennummern bei "Findings"
- Findings sind allgemein ("könnte besser sein") statt spezifisch ("Line 285 hat Bug X")

Bei diesen Indikatoren: Score um -7 bis -15 Pkt nach unten korrigieren und erneut prüfen.
