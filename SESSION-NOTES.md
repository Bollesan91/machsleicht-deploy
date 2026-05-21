# Session-Notiz — 21.05.2026 (Safari 3-5 + 9-12 Elite-Build via 2 parallele Streams, Schwächen-Fixes, Helfer-v3 Review-Setup)

## Kontext der Session

"Start leicht" 21.05.2026 (Cloud-Web-Session). Beim Sync-Check kam raus: ein ungelivter Commit auf draft (`d5ef702` Piraten-mittel von Bolle 20.05. vormittags) plus stale Branches. Sync auf draft-Stand, dann Weiter-Arbeit am Planertool (P1-8 Elite-Ausbau, Reihenfolge: Safari).

## Was wurde gemacht

### 1. Piraten-mittel auf draft synchronisiert (von gestern Vormittag)
Commit `d5ef702` (Bolle lokal 20.05. 09:58) hing auf draft, war nicht im 20.05.-abend-Merge mit drin. Heute mit deployed (11. Elite-Slot im Bundle).

### 2. Safari-HTML-Sprint: 2 parallele Streams (Pattern: "Helfer v3 mit Worktree-Isolation")
Aus `_dev/docs/safari-story.md` (Junior-Ranger-Story) + `_dev/docs/ELITE-SEITEN-TEMPLATE.md` (14-Punkte-Checkliste) + safari-6-8 als Golden-Template, zwei Subagents parallel gespawnt mit isolation=worktree:

**Stream A — Safari 3-5 (Commit `a2455f7`):**
- Self-Score 91/100
- 291 → 893 Zeilen, 19 → 88 KB
- Story-Anker: "Helfer" 56× / "Pirsch" 24× / "Reservat" 16×
- Eltern-bleiben-Hinweis + Meltdown-Plan + Wow-Bastel-Highlight (Tarn-Tuch)

**Stream B — Safari 9-12 (Commit `b7aa161`):**
- Self-Score 96/100
- 309 → 1.049 Zeilen, 19,5 → 114 KB
- Spezialisierungs-Logik (Späher/Tierfotograf/Spurenleser mit `.spec-grid` CSS)
- Codeknacker-Station mit 3 spezialisierungs-spezifischen Rätseln
- Wow-Schlafparty mit Nacht-Safari (Stirnlampen + Eltern-Opt-In)

### 3. Schwächen-Fixes nach User-Review

**Safari 9-12 — Schatzsuche-URL-Convention (Commit `0753170`):**
4 Generator-Links umgestellt von `/schatzsuche/safari` (Themenseite) auf `/kindergeburtstag?modus=schatzsuche&motto=safari` (interaktiver Generator). Cross-Sell-Pille im Final-CTA bleibt auf Themenseite.

**Safari 3-5 — 3 Designer-Schwächen (Commit `5513e3c`):**
- Wow-Highlight: Plüsch-Set (30 €) → Aufblasbares Safari-Tier-Kostüm (~35-50 €) — konsistent mit 6-8 Filz-Buschhut
- Tier-Doktor-Station komplett ersetzt durch 🎧 Tier-Lauscher (Geräusche raten per Smartphone) — Trigger-Risiko Mullbinden weg, Material 0 €
- Foto-Opt-In bewusst nur textlich (Designer-Entscheidung)
- Folgeanpassungen: Mullbinden + Mini-Verband raus, ersetzt durch Tier-Geräusche-Karten-Set zum Selber-Drucken. Wow-Summe: 83 → 76 € (überall konsistent: Cost-Box + FAQ + FAQPage-Schema)

### 4. Content-Loop-Pipeline Setup für Helfer-v3-Review (Commit `51bcbfc` auf content-loop-pipeline)

Bolle wechselt zurück zum klassischen Branch-Trick für Review beider Safari-Seiten:
- `_dev/content-loop/runs/11-safari-3-5-review/quellen-pack.md`
- `_dev/content-loop/runs/12-safari-9-12-review/quellen-pack.md`

Beide als REVIEW-Mode-Packs (nicht Neu-Schreiben). Input via Raw-URL auf `claude/start-leicht-v8dqS`. Score-Rubrik etabliert (Mehrwert 25 / Lesefluss 20 / Konkurrenz-Diff 20 / Schema 15 / Mobile 10 / Links 5 / CTA 5 = 100). Akzeptanz ≥85. Bei Stream 12 explizit Sycophancy-Warnung gegen den 96-Self-Score.

Loop läuft danach lokal über Bolle's Chrome-Extension — Cloud-Pilot kann nur Vor-Pilot sein, hat keinen Browser-Zugriff.

### 5. Sonstiges
- `.claude/worktrees/` in `.gitignore` aufgenommen (Subagent-Worktrees)
- Stale Remote-Branch `claude/start-leicht-50vMS` Delete-Versuch schlug fehl (HTTP 403, Cloud-Sandbox erlaubt keine Branch-Deletes) — muss Bolle manuell machen

## Commits (Reihenfolge auf claude/start-leicht-v8dqS, dann nach draft + main gemerged)

| Commit | Inhalt |
|---|---|
| `f77b835` | chore(gitignore): .claude/worktrees/ ignorieren |
| `a2455f7` | Safari 3-5: Tier-Helfer-Konzept (893 Zeilen, 88 KB) |
| `6e0c3fb` | Merge Stream A: Safari 3-5 Elite-HTML (Score 91) |
| `b7aa161` | Safari 9-12: Reservat-Expedition mit Spezialisierung |
| `9c15c32` | Merge Stream B: Safari 9-12 Elite-HTML (Score 96) |
| `0753170` | fix(safari-9-12): Schatzsuche-Links auf Generator-Convention |
| `5513e3c` | fix(safari-3-5): 3 Designer-Schwächen (Aufblas-Kostüm, Tier-Lauscher) |

Plus auf `content-loop-pipeline`:

| Commit | Inhalt |
|---|---|
| `51bcbfc` | Stream 11+12 Setup: Review-Quellen-Packs für Safari 3-5 + 9-12 |

## Was als Nächstes ansteht

### Helfer-v3 Review-Loop (lokal an Bolle's Rechner)
- Chrome-Extension öffnet 3 claude.ai-Tabs (Writer/Reviewer/Adversarial) je Stream
- Stream 11 + 12 Quellen-Pack-Raw-URLs sind ready:
  - `https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/_dev/content-loop/runs/11-safari-3-5-review/quellen-pack.md`
  - `https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/_dev/content-loop/runs/12-safari-9-12-review/quellen-pack.md`
- v1-Review → v2-Challenger → v3-Adversarial. Score-Ziel ≥85
- Wenn Reviews durchgelaufen: ggf. v4-Edit-Auftrag für Subagent oder Inline-Edits

### Mittelfristig (aus BACKLOG-AUDIT, weiter unverändert)
- **P1-15 Email-Capture** Extern-Tasks (Resend-Audience anlegen + RESEND_AUDIENCE_ID setzen + Worker deployen)
- **P1-17 DSGVO-Hygiene Partyseite** Sub-Tasks A+C (1,5h Laptop)
- **P1-60 Reminder-System** (5–7h Laptop, bündeln mit P1-17/C)
- **P3-15 Datum + Erwachsene als Planer-Inputs** (½ Tag)
- **P3-19 KI-Rätsel-Gedichte Schatzsuche** (1 Tag)
- **P1-8 Motto-Elite**: weitere Mottos analog Safari-Pattern (Piraten klein/gross direkt eligible, Weltraum/Detektiv/Meerjungfrau brauchen HTML-Elite-Ausbau zuerst)

## Self-Audit der Session

- **Substanz:** 9/10 — 2 komplette Elite-Seiten gebaut (Score 91 + 96), Schwächen sauber identifiziert + adressiert, Review-Workflow-Setup für lokale Helfer-v3-Pipeline.
- **Workflow-Methodik:** 8/10 — Pattern "2 parallele Streams mit Worktree-Isolation" funktioniert sauber. Branch-Trick (worktrees) gut, Subagent-Self-Reviews mit konkreten Rubrik-Scores. Selbstgewählter Hand-Off zur lokalen Pipeline für die Review-Phase.
- **Risiko-Management:** 7/10 — Stop-Hook-Warnungen während laufendem Subagent korrekt adressiert. Cloud-vs-Lokal-Grenzen klar kommuniziert (Chrome-Extension geht nicht aus Cloud-Web-Session).
- **Knowledge-Transfer:** 8/10 — SESSION-NOTES inkl. aller Raw-URLs für lokalen Loop-Start, Self-Scores als Sycophancy-Verdacht-Anker, Pattern für künftige Elite-Sprints dokumentiert.
