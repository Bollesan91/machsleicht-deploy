# Fortschritt Bolle

## Letzte Session: 22.04.2026 (Strategie-Refokus + Homepage-Umbau live + Build-Pipeline repariert)

### Was gemacht

**Strategisch:**
- Sparring zum Freund-Memo durchgespielt, Strategie verteidigt, echtes Implementierungs-Gap identifiziert
- STRATEGIE.md 0.9 Portfolio-Matrix (4 Spalten: Kernwette / Testwette / Zukunftswette / Legacy) als Ticket-Disziplin verankert
- P1-12 umformuliert: Einschulung nur noch als SEO-Cluster, Planer erst bei Traffic-Trigger ≥100 Visits/Woche im Juli
- 18 PBIs etikettiert in der Prio-Tabelle

**Homepage live:**
- React-Homepage `js/index.js` an SEO-Fallback angeglichen (Hero, 4-Module-Grid + Pill-Cloud für Sekundärtools, Eyebrow, Footer, Idee-Card)
- `index.html` Meta-Tags kindergeburtstag-fokussiert
- Vorschau-Block auf 2×2-Layout umgestellt („Vier Tools" Subheader)
- Plan-Vorschau-Karte orange getönt (war weiß, verschmolz mit Page-Background)
- Einladungskarten-Vorschau aufgehellt und lesbar (3 Navy-Iterationen bis es gepasst hat)
- Alle 4 Vorschau-CTAs bottom-aligned (flex column + marginTop:auto)

**Build-Infrastruktur:**
- Schwere Entdeckung: **8 Netlify-Builds seit gestern Mittag fehlgeschlagen** wegen abgeschnittener `serve-invite.mjs` (Zeile 54 truncated, fehlende 6 Zeilen). Einhorn-Deploy gestern Abend war nie live. Mein erster Deploy heute zunächst auch nicht.
- Hotfix deployed, Build-Pipeline grün
- `validate-all.sh` um STUFE 1b erweitert: `node --check` für alle Netlify-Functions — fängt Truncation-Bugs sofort

**Tools für dich:**
- `_dev/docs/flow-audit-template.md` — 15-Punkte-Checkliste für Selbstdurchgang des Kernflows

### Nächste Schritte
1. **Flow-Audit selbst durchgehen** (Inkognito-Tab, Rolle „Mutter von Leon, 7 Jahre, 6 Gäste"): `_dev/docs/flow-audit-template.md` — Top-3-Reibungen als KERN-PBIs ins Backlog
2. **OneDrive-Ordner reparieren** (heute session hat aus /tmp gearbeitet, OneDrive-Ordner war kaputt): alter Ordner löschen, neu klonen, idealerweise außerhalb von OneDrive
3. **Netlify-Notify-Hook einrichten** (Settings → Notifications → Deploy failed → Email) — nie wieder einen Tag gebrochener Build unentdeckt
4. **P1-16 Partyseite Follow-Ups** (Laptop-Session, Cloudflare + Email)
5. **P1-8 Safari** als nächstes Elite-Motto (analog zu Einhorn)
6. **P1-12 Einschulung-SEO-Cluster** bis 31.05.
7. **P2-13 Gumroad** (Piraten + Dino)
8. **P2-15 Awin-Anmeldung**

### Offene Fragen
- Safari-Altersgruppen-Reihenfolge: 6-8 zuerst?
- Awin-Publisher-ID Status?
- Welcher Plausible-Goal-Name für „Einschulung-Cluster Visits"?

### Lernpunkt aus dieser Session
Die Live-Site kann stundenlang oder tagelang einen alten Build ausspielen, wenn Netlify-Builds stumm fehlschlagen und niemand ins Dashboard schaut. Lösung läuft seit heute: (a) Validator prüft Function-Syntax lokal, (b) Notify-Hook sollte eingerichtet werden. Beide zusammen = Schutz vor Wiederholung.
