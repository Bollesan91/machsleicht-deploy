# machsleicht-deploy — Projekt-Notizen

## Projekt
- Website: machsleicht.de
- Repository: https://github.com/Bollesan91/machsleicht-deploy
- Hosting: Netlify (Deploy via main-Branch)

## Git-Workflow (ÜBERSTEUERT den generischen git-sync Skill)

Arbeitsbranch: `draft` | Deploy-Branch: `main`

- **"Start leicht"** → `git checkout draft && git pull` + SESSION-NOTES.md lesen
- **"Ende"** → `git add -A && git commit && git push` auf `draft` (KEIN Deploy, Netlify buildet `draft` nicht)
- **"Ende deploy"** → commit auf `draft` → `git checkout main && git merge draft && git push` (löst Netlify-Deploy aus)
- Git-User: Bollesan91 / cbollweg@gmx.de
- Commit-Sprache: Deutsch
- Co-Author-Header: `Co-Authored-By: Claude <noreply@anthropic.com>`

Hintergrund: Bolle arbeitet überwiegend vom Desktop (Claude Code / Terminal) und nutzt `draft` als Staging, um vor dem Deploy zu reviewen. Der generische `[skip netlify]`-Flow aus dem git-sync-Skill gilt hier nicht — auf `draft` baut Netlify ohnehin nicht.

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
