# Relaunch-Plan v1 — machsleicht als Geburtstags-OS auf `<neu>`

Stand 01.10.2026 · Planer: Claude (Fable 5.1, Session „Relaunch-Plan") · Auftrag: `_dev/review/2026-10-01-relaunch-plan-prompt.md` · Faktenbasis: Ist-Analyse 1.1–1.7, Referenzen G1–G29 und M1–M12 des Auftrags · Repo-Stand für alle Messungen: `main acebbc22`, `draft e2f1d63a`.

## Lesehinweise

- Platzhalter: `<neu>` = neue Domain und Marke (E1/E2), `<neu-repo>` = GitHub-Repo, `<neu-site>` = Netlify-Projekt, `party.<neu>` = Worker-Host, `<alt-repo>` = lokaler Klon von machsleicht-deploy. Der Plan nennt keinen Domainnamen.
- ANNAHME = nicht aus einer Primärquelle belegt; jede trägt die Messung, die sie prüft. Alle URLs im Abschnitt „Quellen" wurden am 01.10.2026 abgerufen; Google-Aussagen sind sinngemäß wiedergegeben; SEO-Blogs sind Hinweis, nie Beleg.
- Zahlen ohne eigene Quelle stammen aus der Ist-Analyse (Abschnitt 1.x des Auftrags) oder sind heute im Alt-Repo gemessen; dann steht das Kommando dabei.
- Massenänderung auf `<neu>` (ab dem ersten Deploy, auf Staging ab S26): je Deploy > 3 Sitemap-URLs hinzugefügt, > 2 entfernt, Canonical oder Redirect auf > 3 URLs geändert, oder lastmod auf > 3 URLs ohne Inhaltsänderung. Darunter erlaubt, aber protokolliert in `SITEMAP-CHANGELOG.md`; Stufe 76 erzwingt es (S24).
- Deploy-Takt: Phase 4–5 höchstens ein Inhalts-Deploy je 14 Tage; Phase 6 ein Deploy je Motto-Zyklus (Beobachtung aus machsruhig, kein Google-Beleg).
- Review = frischer claude.ai-Tab nach Helfer V4.1 mit `LEKTIONEN.md` und `OFFENE-REVIEW-PUNKTE.md`; Subagents und WebFetch sind nie Gutachter.
- Zwei Abweichungen von der Ist-Analyse mit Primärquelle vom 01.10.2026: Resend Free erlaubt 3 verifizierte Domains, 100 Mails/Tag, 3.000/Monat (Preisseite) — nicht eine Domain; Umami-Hobby: Suchtreffer nennen 1 Website je Konto, die Ist-Analyse 3 → S18 misst es am Dashboard-Knopf, E11 hält Alternativen bereit.

## 0. Leitsätze vor Phase 0

### 0.1 Zwei Hypothesen, eine Messung (Winkel 1)

| | H1 „Selbstabriss" (Befund 18.09.) | H2 „Qualitätsklassifikator" (Doku 03.06.) |
|---|---|---|
| Kern | Google stuft die Domain nach zwei Sitemap-Halbierungen und 198 Fremd-Canonicals binnen drei Wochen als instabil ein | Googles Systeme werten die Site wegen programmatischer Altersseiten-Masse und dünner Inhalte sitewide ab (G19, G20) |
| Vorhersage für `<neu>` | Neue Domain ohne diese Historie mit kleinem, vollständigem Set wird in Wochen indexiert (Vergleich machsruhig: 162 gültige Seiten) | Auch `<neu>` landet trotz neuem Inhalt in „Gecrawlt – zurzeit nicht indexiert" (Mueller/Splitt 07/2026, Sekundärquelle) |
| Messung | Anteil der Sitemap-URLs mit Status „indexiert" (GSC Seiten-Bericht + URL-Prüfung je URL) zu T+6 Wochen nach Sitemap-Einreichung (S54) | Anteil „Gecrawlt – zurzeit nicht indexiert" zu T+6 und T+12 Wochen (S54, S55) |
| Schwelle | ≥ 6 von 9 indexiert → H1 gestützt (nicht bewiesen), Phase 6 startet | ≥ 5 von 9 „Gecrawlt – zurzeit nicht indexiert" zu T+12 → H2 wahrscheinlicher, Fallback S56 |
| Was keine der beiden beweist | Beide sind zeitliche Passung; Google nennt keine Fristen (G9, G21). Der Plan behandelt keine der beiden als Tatsache. | |

Das billigste Experiment, das die Hypothesen trennt, ist das Launch-Set selbst: 9 Sitemap-URLs, jede einmal angefragt, sechs Wochen gemessen, bevor der Motto-Ausbau Zeit frisst; ein Vorab-Test mit Startseite und Trust-Seiten allein scheidet aus (Regel E5: nur zeigen, was funktioniert). Die drei nie gemachten Messungen vor Tag 1 sind S1, S2 und S4. ANNAHME zur Zeitachse: Google nennt für neue Sites „a few weeks" (Get your website on Google) und für Indexierungsanfragen etwa einen Tag mit der Einschränkung, dass es deutlich länger dauern kann (G9); T+6 Wochen ist daraus abgeleitet, keine Google-Zusage — S54 prüft sie.

### 0.2 Zweck der Site in einem Satz (G23, Winkel 7)

`<neu>` ist das Werkzeug, mit dem Eltern einen Kindergeburtstag planen und ausliefern: Plan, WhatsApp-Einladung mit Partyseite und Rückmeldung, Einladungsspiele, Druckpaket — ausschließlich Kindergeburtstag.

Was deshalb auf `<neu>` nicht existieren darf: die 16 Klasse-C-Seiten (Baby, Einschulung, Advent, Ostern, Autofahrt, Familienreise, Kreuzworträtsel, Spielkarten), die 45 Motto×Alter-Seiten und jede Einzeljahr-Seite, die 30 Einladungs-Hub- und Vorlagen-Seiten (62,7 % und 49,4 % Überlappung), die 14 Schatzsuche-Themenseiten, jede Seite ohne Werkzeug-Element, jede Zahl ohne Repo-Beleg („75 Einladungsspiele" bei 60 Dateien — Ist-Analyse 1.1).

### 0.3 Doorway-Frage (G16, Winkel 12)

Der Nachweis steht in S21 (Abschnitt „Doorway-Nachweis" in `IA.md`, vor dem Livegang abgelegt, R2): keine Trichterung, kein Variantenklon, jede indexierbare Seite ist selbst das Werkzeug, die alte Domain wird nicht neu zugeschnitten. Ob Google den gemeinsamen Betreiber wertet, bleibt ANNAHME (S22).

### 0.4 Signal-Trennung alt/neu (Winkel 2)

Die Signal-Matrix (verboten / erlaubt / ANNAHME je Signal mit Beleg) ist die Spezifikation von Stufe 73 und steht in S22.

### 0.5 Was „neu geschrieben" messbar heißt (Winkel 3)

Metrik, Schwellen, Herleitung und Skripte stehen in S23. Die 45 `data/motto/*.json` bleiben Datenbasis des Werkzeugs; ihr Text erscheint nur in noindex-Zuständen (S31).

### 0.6 Verbote auf der neuen Domain, die der Linter erzwingt

Keine Motto×Alter-Matrix als URLs (Stufe 76: Allowlist), keine Einzeljahr-Seiten, keine programmatisch erzeugten Textseiten (`generate-seo-pages.js` existiert im neuen Repo nicht; Stufe 76 d), keine Seite ohne Werkzeug-Element (IA.md-Spalte, S21), keine Zahl ohne Repo-Beleg (Stufen 34/44 bestehen fort), kein unpkg/cdnjs (Stufe 73 Host-Allowlist), kein HowTo-JSON-LD, höchstens ein JSON-LD-Block je @type und Seite (Stufe 72 erweitert).

## A. Phasenübersicht

| Phase | KW | Eingangskriterium | Ausgangskriterium (messbar) |
|---|---|---|---|
| 0 Entscheidungen, Messungen, Schlüssel | 41 | Plan gelesen | E1–E18 protokolliert; Messdateien und KV-Zählung in `_dev/messungen/`; 0 gültige Alt-Schlüssel; Domain registriert |
| 1 Fundament | 42–43 | Domain registriert, E1–E18 | Zone Active; Netlify-Zertifikat erteilt; `party.<neu>` → 302 auf `/planen/`; GSC/Bing/Resend/Umami stehen; Staging liefert noindex; Altkunden-Nachweis 9/9 |
| 2 Positionierung und IA | 43–44 | Phase 1 | `IA.md` eingefroren (Tag `ia-final`), Allowlist = 9 URLs; Stufen 73–76 laufen mit Prüfstand-Fall |
| 3 Launch-Set | 44–47 | IA eingefroren | 9 Sitemap-URLs + Impressum/Datenschutz auf Staging: Linter 0 FAIL, Stufe 75 unter Grenze, 11 Stücke 0 offene MAJOR, Crawl 9×8 grün, E2E Exit 0 |
| 4 Livegang | 48–49 | Phase 3 | Go-Liste 12/12; Produktion 9×200, 0×X-Robots-Tag; 72 h Soft Launch 9/9 ohne Fehler; Sitemap „Erfolgreich/9"; 9 Anfragen genau einmal; Bing; ≥ 6 Erwähnungen |
| 5 Messen und Entscheiden | 49 – 8/2027 | Sitemap eingereicht | eine Zeile je Montag; Gate 1 am 11.01.2027; Abbruchlesung am 22.02.2027 |
| 6 Motto-für-Motto | ab 3/2027 | Gate 1 grün | je 14 Tage ein Motto; +1 Sitemap-URL je Zyklus; Stufe 76 grün |
| 7 Betrieb machsleicht.de | ab 41, laufend | — | eine Zeile je Monat; Eingriffe = 0; Erholungskriterium geprüft; Abschaltfrage nur bei 4/4 Bedingungen |

## Phase 0 — Entscheidungen, Messungen vor Tag 1, Schlüssel-Hygiene (KW 41, 05.–11.10.2026)

Eingang: Bolle hat den Plan gelesen. Ausgang: siehe Übersicht. Bolles Klicks sind in S1, S2, S5, S6, S7, S8 gebündelt; Claude liefert S3 und die Zählungen.

### S1 — GSC-Exporte der alten Domain ziehen
Phase: 0 · Wer: Bolle · Dauer: 1 h · Hängt ab von: — · KW: 41
Tun: search.google.com/search-console, Domain-Property `machsleicht.de`: (a) Indexierung → Seiten → Grund „Gefunden – zurzeit nicht indexiert" → Exportieren (CSV) sowie Export des Seiten-Berichts mit Diagrammdaten (Zeitraum bis heute); (b) Leistung → Suchergebnisse → Zeitraum 28.08.–01.10.2026 → Exportieren; (c) Links → „Externe Links exportieren" → „Neueste Links" und „Weitere Beispiellinks" (bis 100.000 Zeilen je Export laut Links-Bericht-Hilfe). Dateien in `Downloads`, Claude verschiebt sie in S3 nach `_dev/messungen/gsc/`.
Artefakt: 5 CSV-Dateien.
Beleg: `ls _dev/messungen/gsc | wc -l` = 5; Zeilenzahl je Datei in INDEX-LOG notiert. Ein Links-Export mit 0 Datenzeilen ist selbst der Befund „keine Linksignale" (Ist-Analyse: „0 echte Backlinks", 22.05.).
Stopp: Ein Bericht ist in der Property leer → Eintrag „leer, Datum", kein Blocker.

### S2 — Umami-Abzug der letzten 90 Tage
Phase: 0 · Wer: Bolle · Dauer: 0,5 h · Hängt ab von: — · KW: 41
Tun: cloud.umami.is → Website machsleicht.de → Zeitraum 03.07.–01.10.2026 → Exporte: Besucher je Tag, Referrer (Top 50), Events (alle, insbesondere Planer-Stufen, Partyseite erstellt, `game_complete`), Seiten (Top 100), je als CSV.
Artefakt: 4 CSV in `_dev/messungen/umami/`.
Beleg: Datei „Besucher je Tag" hat 91 Datenzeilen; Tagesmittel steht in der Baseline-Zeile von INDEX-LOG und ersetzt den unbelegten Wert „~80/Tag" vom 16.04.
Stopp: Umami bietet einen Export nicht an → Werte von Hand in eine Tabelle übertragen (Screenshot als Beleg); der Wert zählt, nicht das Format.

### S3 — Mess-Logbuch mit Baseline anlegen
Phase: 0 · Wer: Claude · Dauer: 1 h · Hängt ab von: S1, S2 · KW: 41
Tun: Ordner `_dev/messungen/` (ab S10 im `<neu-repo>`, bis dahin im Scratchpad) mit `gsc/`, `umami/` und `INDEX-LOG.md`. Spalten je Woche: Datum | KW | Sitemap-URLs | indexiert | gecrawlt-nicht | gefunden-nicht | Duplikat-anderes-Canonical | noindex-in-Sitemap | Impressionen 7 T | Klicks 7 T | Crawl-Anfragen 7 T | Hoststatus | verweisende Domains | Bing indexiert | Umami Besucher 7 T | Partyseiten erstellt 7 T | KV-Writes/Tag max | Resend Mails/Tag max | Deploys | Regel-Ergebnis. Abschnitt „Alt-Domain" je Monat: Datum | indexiert | Impressionen 28 T | Klicks 28 T | `party:` | `wl:` | `plan:` | Zertifikat bis | Eingriffe (= 0). Kopfzeile darüber: die Hypothesen-Tabelle aus 0.1 als Prä-Registrierung (Schwellen stehen fest, bevor die erste Messung kommt). Baseline-Zeile „Alt-Domain 01.09./18.09./01.10.": 136 Sitemap-URLs, 1 indexiert, 345 „Gecrawlt – zurzeit nicht indexiert" (94 davon in der Sitemap), 44 „Gefunden – zurzeit nicht indexiert", 9 Klicks / 514 Impressionen (20.03.–18.08.), Umami-Tagesmittel aus S2, Links aus S1. `site:machsleicht.de` einmal zählen (ANNAHME: `site:` ist eine Schätzung; nur als Trend geführt).
Artefakt: INDEX-LOG.md mit Kopf und Baseline-Zeile.
Beleg: `grep -c '^|' _dev/messungen/INDEX-LOG.md` ≥ 3; keine leere Zelle in der Baseline außer „Bing" (heute keine Property).
Stopp: Ein S1/S2-Wert fehlt → Zelle „fehlt (S1)" und Schritt bleibt offen, bis gefüllt.

### S4 — KV-Bestand des alten Workers zählen
Phase: 0 · Wer: beide · Dauer: 0,5 h · Hängt ab von: — · KW: 41
Tun: Bolle legt in Cloudflare (My Profile → API Tokens → Create Token → Vorlage „Edit Cloudflare Workers", Gültigkeit 1 Tag) einen Token an und gibt ihn Claude im Chat. Claude im `<alt-repo>`-Root mit `CLOUDFLARE_API_TOKEN` gesetzt: `for p in party: wl: plan: consent: extimg: doi:; do echo "$p $(npx -y wrangler kv key list --binding PARTY --remote --prefix "$p" | grep -c '"name"')"; done` (Syntax: Wrangler-KV-Kommandos). Nur lesen, nichts schreiben, nichts deployen.
Artefakt: Tabelle Präfix | Anzahl | spätestes Ablaufdatum (aus `metadata.date` + 14 Tage) als Abschnitt „Altbestand" in INDEX-LOG.
Beleg: 6 Zahlen; Token danach von Bolle gelöscht (S5 prüft, dass die Token-Liste leer ist).
Stopp: Auth-Fehler → Token-Recht „Workers KV Storage: Read" fehlt; Dashboard-Zählung (Workers KV → Namespace → Keys) ist der zulässige Ersatz.

### S5 — Schlüssel-Hygiene: alte Tokens widerrufen, Live-Key rotieren
Phase: 0 · Wer: Bolle (Claude zählt) · Dauer: 1,5 h · Hängt ab von: S4 · KW: 41
Tun: Claude zählt im `<alt-repo>` ohne Werte auszugeben: `git log -p --all | grep -oE '\b(cfut_|nfp_)[A-Za-z0-9_-]{8,}|\bre_[A-Za-z0-9_-]{20,}' | sort -u | wc -l` je Präfix (heute gezählt: `cfut_` in 33 Commits, `nfp_` in 5; `re_`-Muster unscharf, 111 Commits). Bolle je Dienst: Cloudflare → My Profile → API Tokens: jeden Token löschen, der nicht für den heutigen Worker-Deploy gebraucht wird; Resend → API Keys: neuen Key anlegen, im `<alt-repo>` `npx -y wrangler secret put RESEND_API_KEY` (Secret-Wechsel am alten Worker, kein Code-Deploy; `party.machsleicht.de` ist noindex), Testmail prüfen (S20), dann alle älteren Keys löschen; Netlify → User settings → Applications → Personal access tokens: alle löschen; S4-Token löschen.
Artefakt: `_dev/messungen/2026-10-XX-schluessel-hygiene.md`: je Präfix Dienst | Zahl in Historie | Status (gelöscht / war ungültig) — ohne Werte.
Beleg: Resend zeigt genau 1 aktiven Key; Cloudflare-Token-Liste zeigt 0 Tokens mit Erstelldatum vor 01.10.2026; Netlify 0 Tokens; Edit-Link-Mail über den alten Worker kommt mit dem neuen Key an (Resend-Log „delivered").
Stopp: Nach Rotation keine Mail (Resend-Log 401) → alten Key erst löschen, wenn die Testmail steht; Reihenfolge neu setzen → testen → alt löschen.

### S6 — Entscheidungen E1–E18 protokollieren
Phase: 0 · Wer: Bolle · Dauer: 2 h · Hängt ab von: S4 (E5 braucht die KV-Zahl) · KW: 41
Tun: Abschnitt C durchgehen; je Entscheidung eine Zeile „E<n>: Option <x> — Begründung in einem Satz" in `_dev/review/2026-10-XX-relaunch-entscheidungen.md`; bei Abweichung von der Empfehlung die Konsequenzzeile aus C mitkopieren.
Artefakt: Datei mit 18 Zeilen.
Beleg: `grep -c '^E[0-9]' <datei>` = 18; keine Zeile „offen".
Stopp: Eine Entscheidung bleibt offen → Phase 1 startet für alles, was nicht davon abhängt (Abhängigkeiten stehen je Schritt); E1/E2 blockieren S7–S9.

### S7 — Domainnamen-Kandidaten prüfen (Kriterien und Prüfweg, keine Namensvorschläge)
Phase: 0 · Wer: Bolle · Dauer: 1,5 h · Hängt ab von: S6 (E1) · KW: 41
Tun: Je Kandidat auf Bolles Liste: (1) Kriterien aus E1 abhaken: Kindergeburtstag erkennbar, kein Bestandteil „machsleicht" oder „leicht", `.de`, ≤ 15 Zeichen, am Telefon buchstabierfrei, keine Ziffern, DENIC-Regeln (1–63 Zeichen, kein Bindestrich am Anfang, am Ende oder an Stelle 3 und 4 — DENIC-Domainrichtlinien 01/2026); (2) webwhois.denic.de → Status „free"; (3) register.dpma.de → Basisrecherche Marken, Datenbestand „nationale Marken + Unionsmarken + internationale Marken", Wortbestandteil → 0 identische oder klanggleiche Marken in Klasse 41 (Unterhaltung, Veranstaltungen) und 35; (4) tmdn.org/tmview dieselbe Suche; (5) Google-Suche `"<kandidat>"` → keine aktive Site oder Marke mit demselben Wort (Lehre machdichleicht.de); (6) Handles frei: Pinterest, Instagram.
Artefakt: Tabelle Kandidat | DENIC | DPMA | TMview | Google | Handles | Urteil in der Entscheidungs-Datei.
Beleg: Gewählter Name hat 6/6 Spalten „frei / ohne Treffer"; DPMA-Trefferliste als Screenshot abgelegt.
Stopp: Treffer in Klasse 41/35 mit ähnlichem Wortstamm → Kandidat raus. Eine Markenanmeldung ist nicht Teil des Plans (Option in E1).

### S8 — Domain registrieren
Phase: 0 · Wer: Bolle · Dauer: 0,5 h · Hängt ab von: S7 · KW: 41
Tun: Cloudflare Registrar unterstützt `.de` nicht (M1, heute bestätigt), also externer Registrar nach M4: INWX (4,71 € netto Registrierung, 3,60 € Verlängerung), netcup (0,42 €/Monat), united-domains oder IONOS. Inhaber Marie-Therese Bollweg mit Straßenanschrift (DENIC: Postfach reicht nicht), E-Mail, Telefon. Nameserver zunächst Registrar-Standard (S9 ändert sie). Auto-Renew an. DNSSEC aus (Cloudflare: vor dem Nameserver-Wechsel am Registrar deaktivieren).
Artefakt: Registrar-Bestätigung; Zeile „E1 gewählt: `<neu>`, Registrar, Datum, Jahrespreis" in der Entscheidungs-Datei.
Beleg: webwhois.denic.de → Status „connect"; `dig NS <neu> +short` liefert die Registrar-Nameserver.
Stopp: Name zwischen S7 und S8 vergeben → zurück zu S7, nächster Kandidat.

## Phase 1 — Fundament (KW 42–43)

Eingang: Domain registriert, E1–E18, KV gezählt. Ausgang: siehe Übersicht. Bolles Klickstrecke in dieser Reihenfolge: S9 (Zone, Nameserver) → S18 (Umami, Amazon-Tracking-ID, AWIN) → S14 (Netlify, DNS-only, Zertifikat, dann Proxy) → S16 (GSC-TXT, Bing, Crawler Hints) → S17 (Resend, Migadu) → S13 (Secrets tippen). Claude: Repo, Sweep, Worker, Netlify-Kontexte, Quoten, Nachweis per CLI.

### S9 — Cloudflare-Zone anlegen und Nameserver umstellen (Klickstrecke A)
Phase: 1 · Wer: Bolle · Dauer: 1 h · Hängt ab von: S8 · KW: 42
Tun: dash.cloudflare.com → „Onboard a domain" → `<neu>` → Plan Free → vorgeschlagene DNS-Records alle löschen (Zone bleibt leer bis S14/S17) → zwei Cloudflare-Nameserver beim Registrar eintragen → warten bis Status „Active" (Cloudflare: bis 24 Stunden, Bestätigungsmail). Danach: SSL/TLS → Full (strict); Caching → Configuration → Crawler Hints noch aus (S16 schaltet es ein).
Artefakt: Zone `<neu>` Status Active.
Beleg: `dig NS <neu> +short` → zwei `*.ns.cloudflare.com`; Dashboard „Active".
Stopp: Nach 24 h nicht Active → Nameserver-Eintrag beim Registrar prüfen (Tippfehler, DNSSEC noch an).

### S10 — Neues Repo anlegen, Übernahme-Liste ausführen
Phase: 1 · Wer: Claude · Dauer: 3 h · Hängt ab von: S6 (E4) · KW: 42
Tun: `gh repo create Bollesan91/<neu-repo> --public --clone` (öffentlich, weil der Branch-Trick raw-SHA-URLs braucht). Aus dem `<alt-repo>` als Dateikopie ohne Git-Historie übernehmen: `validate-all.sh`, `_dev/scripts/check-*.py|mjs`, `_dev/pruefstand/`, `_dev/LEKTIONEN.md`, `_dev/OFFENE-REVIEW-PUNKTE.md` (Startstand des Gedächtnisses), `netlify.toml`, `_headers`, `_redirects` (nur die Sperrregeln für `_dev/`, `_src/`, Konfigdateien), `robots.txt`, `css/`, `fonts/` (self-hosted), `js/` (nur Werkzeug-Code), `spiele/` (60 Dateien + `core/`), `paket/_maschine`, `paket/core`, `paket/ritter`, `paket/piraten`, `data/motto/` (45 JSON), `party-worker.js`, `wrangler.toml`, `_dev/scripts/generate-sitemap.js`, `gen-ablauf.mjs`, `paket-bauen.py`, `mengen-ableiten.py`; `netlify/functions/create-invite.mjs|serve-invite.mjs` nur bei E9 „übernehmen"; `_dev/prototypes/raketen-trailer/` nur bei E14 „ja". Nicht übernehmen: alle HTML-Textseiten (Rohstoff, keine Datei), `index.html`, `kindergeburtstag.html` als Datei (Werkzeug-Code wird in S30 herausgelöst), `og-*.png`, `preview-*.png`, `bilder/`, `micha/`, SESSION-NOTES/AUDIT/STRATEGIE/TASKS/BACKLOG/HELFER-Sprint-Dateien, `_src/`, `_build/`, `generate-seo-pages.js`, `consolidate-age-pages.js`, `deploy-motto.js`, `ls-webhook.js`, `sparring-engine.jsx`, `prompt-fuer-claude-chat.txt`, `.docx`, `node_modules`. Erster Commit auf Branch `staging` mit `[skip netlify]`; `main` bleibt leer bis S46. `_dev/UEBERNAHME.md`: Datei | Quelle-SHA | Status (kopiert / neu / nicht übernommen + Grund).
Artefakt: `<neu-repo>` mit Branches `main` (leer) und `staging`; UEBERNAHME.md.
Beleg: `git -C <neu-repo> log --all -S'cfut_' --oneline | wc -l` = 0; `ls og-*.png micha 2>/dev/null | wc -l` = 0; `test ! -f _dev/scripts/generate-seo-pages.js && echo ok`; `git ls-files | wc -l` in UEBERNAHME.md notiert.
Stopp: Ein Werkzeug referenziert eine nicht kopierte Datei (Stufe 70-Analog „Skript nicht im Repo") → Datei nachziehen und in UEBERNAHME.md eintragen; nie pauschal alles kopieren.

### S11 — Hostnamen-Sweep klassenweise mit Asserts; Linter-Stufe 73 „Verbindungs-Check"
Phase: 1 · Wer: Claude · Dauer: 3 h · Hängt ab von: S10, S18 (Tracking-ID), S6 (E2) · KW: 42
Tun: Kein globales sed über 2.221 Vorkommen. Skript `_dev/scripts/sweep-hostnamen.py` mit je Klasse eigenem Muster und erwarteter Trefferzahl; alle Asserts vor dem einzigen Write (Bolle-Regel): (1) `generate-sitemap.js` DOMAIN → liest `_dev/config/site.json`; (2) Canonical-Asserts in `validate-all.sh` (im Alt-Stand Zeile 266 `https://machsleicht.de/einladung/`) → neuer Host; (3) `spiele/core/core.js` Footer (Alt-Zeilen 307–311) → neuer Host und neue Marke; (4) `paket/core/paket-core.js` API-Host und Partyseiten-URL (Alt-Zeilen 429, 433) → `party.<neu>`; (5) Paket-Manifeste; (6) `data/motto/*.json`: 28 Dateien mit `party.machsleicht.de` in Prosa → Satz neu formulieren, nicht nur Host tauschen; `tag=machsleicht21-21` → neue Tracking-ID aus S18 als rohes `&tag=` (Lektion L3); (7) `netlify/functions/*` nur bei E9; (8) `robots.txt` Sitemap-Zeile. Stufe 73 in `validate-all.sh`: `grep -rIl -i 'machsleicht' --exclude-dir=.git --exclude-dir=node_modules --exclude=UEBERNAHME.md --exclude=LEKTIONEN.md --exclude=OFFENE-REVIEW-PUNKTE.md .` muss leer sein; `grep -rl 'machsleicht21-21' .` leer; externe Hosts in HTML nur aus einer Allowlist (`cloud.umami.is`, `wa.me`, `amazon.de`, AWIN-Host). Prüfstand-Fall: eine Testdatei mit dem Alt-Host macht die Stufe rot.
Artefakt: Sweep-Skript, Sweep-Log, Stufe 73, Commit.
Beleg: Stufe 73 grün; Sweep-Log mit Klasse | erwartet | gefunden | ersetzt, alle drei Zahlen je Zeile gleich; `git diff --stat` enthält genau die acht Klassen.
Stopp: Erwartet ≠ gefunden in einer Klasse → kein Write, Muster nachschärfen (Lehre vom 08.09.: die Messfehler lagen im Muster, nicht in der Rechnung).

### S12 — Worker-Fassung für `party.<neu>` schreiben
Phase: 1 · Wer: Claude · Dauer: 3 h · Hängt ab von: S11, S6 (E5) · KW: 42
Tun: `party-worker.js` (3.180 Zeilen, 65 Zeilen mit Hostnamen, gezählt heute mit `grep -c machsleicht`): `CORS_ALLOWED_ORIGINS` (Zeilen 11–14) → `https://<neu>`, `https://www.<neu>`, `https://party.<neu>`, `https://staging--<neu-site>.netlify.app` (für S44), localhost; Konstante `CORS` (Zeile 32) gleich; `postMessage`-Origin-Regex (Zeilen 1018, 1082) → neuer Host; Root-302 (Zeile 1296) → `https://<neu>/planen/`; alle Literale `https://party.machsleicht.de/${id}` (416–417, 545, 757, 1120–1121, 1148, 1212, 2020, 2075) → Konstante `PARTY_HOST`; Mail-Footer und Zeile „Diese E-Mail wurde von … gesendet" (1168, 1689, 2040) → neue Marke und Host; Resend-Default-Absender `kontakt@machsleicht.de` (432–433, 970–971, 1177–1178) → `kontakt@<neu>` (RESEND_FROM/REPLY_TO werden als Secrets gesetzt, der Default bleibt Fallback); og:image-Fallback und Favicon (1438, 1442) → eigene Assets; Magic-Link (956) → `https://<neu>/planen/?plan=`; Spiele-iframe-Host (1958, 2132) → `https://<neu>`; Rückweg „Eigene Partyseite erstellen" → `https://<neu>/planen/?ref=`; ICS-UID-Domain; Gästeseiten senden `Referrer-Policy: no-referrer` (PII in URL, offener P1-Punkt). `wrangler.toml`: `name = "party-<neu-kurz>"`, `[[routes]] pattern = "party.<neu>" custom_domain = true` (Workers-Custom-Domains-Doku), Binding `PARTY` mit neuer id (S13), `keep_vars = true`, Cron unverändert `0 8 * * *`.
Artefakt: Worker-Fassung und wrangler.toml im `<neu-repo>`.
Beleg: `grep -c 'machsleicht' party-worker.js` = 0; `node --check party-worker.js`; `node _dev/scripts/check-partyseite-render.mjs` (Stufe 60) grün; `node _dev/scripts/check-cron-erinnerung.mjs` grün.
Stopp: Stufe 60 rot → kein Deploy; Template-Literal-Fehler sind die bekannte Klasse (L14).

### S13 — KV anlegen, Secrets setzen, Worker deployen, Custom Domain binden
Phase: 1 · Wer: beide · Dauer: 1 h · Hängt ab von: S9, S12, S17, S18 · KW: 43
Tun: Bolle legt bereit: Cloudflare-Token (Edit Workers, 1 Tag) und die sechs Werte: RESEND_API_KEY (neuer Key aus S17), RESEND_FROM (`<Marke> <kontakt@<neu>>`), RESEND_REPLY_TO (`kontakt@<neu>`), RESEND_AUDIENCE_ID (neue Audience, E12), AMAZON_TAG (S18), AWIN_PUBLISHER_ID (wie alt). Claude im `<neu-repo>`-Root: `npx -y wrangler kv namespace create PARTY` → ausgegebene id in `wrangler.toml`; `npx -y wrangler deploy` (legt Custom Domain `party.<neu>` samt DNS-Record und Zertifikat an; Voraussetzung: kein vorhandener Record auf `party.<neu>` — Workers-Custom-Domains-Doku); dann je Secret `npx -y wrangler secret put <NAME>`, Bolle tippt den Wert in die Eingabeaufforderung, Werte landen nie in Chat oder Dateien. Bolle löscht den Token danach.
Artefakt: Worker `party-<neu-kurz>` live mit 6 Secrets, eigenem KV-Namespace, einem Cron-Trigger.
Beleg: `npx -y wrangler secret list` zeigt 6 Namen; `curl -sI https://party.<neu>/ | grep -i '^location'` → `https://<neu>/planen/`; `curl -sI -X OPTIONS https://party.<neu>/api/create -H 'Origin: https://<neu>' | grep -i access-control-allow-origin` → `https://<neu>`; Dashboard Workers & Pages → Worker → Settings → Triggers zeigt 1 Cron.
Stopp: `wrangler deploy` meldet Routen-Konflikt → Zone aktiv (S9)? CNAME auf `party.<neu>` vorhanden? Erst dann erneut.

### S14 — Netlify-Projekt anlegen, Domain verbinden, Zertifikat (Klickstrecke B)
Phase: 1 · Wer: Bolle · Dauer: 1,5 h · Hängt ab von: S9, S10 · KW: 42
Tun: app.netlify.com → Add new project → Import from Git → `<neu-repo>`; Build command leer, Publish directory `.`; Production branch `main`. Project configuration → Developer settings → Continuous deployment → Branches and deploy contexts → Configure → Branch deploys: nur `staging`; Deploy Previews aus. Project configuration → General → Visitor access → Project visibility: „Public" (im Free-Plan sieht ein „Private"-Projekt nur der Team Owner — der Reviewer-Tab und Playwright kämen nicht hin; den Schutz liefert S15). Domain management → Add a domain → „Add a domain you already own" → `<neu>` → External DNS; Netlify legt `www.<neu>` dazu; Primary = `<neu>`. Cloudflare DNS: `CNAME @ → apex-loadbalancer.netlify.com` (Cloudflare flacht am Apex ab; Netlify-Alternative A `75.2.60.5`) und `CNAME www → <neu-site>.netlify.app`, beide DNS only (graue Wolke). Netlify empfiehlt bei externem DNS `www` als Primary; der Plan bleibt beim Apex wie machsleicht.de, weil Cloudflare das Flattening liefert. Netlify: „Pending DNS verification" → Verify → Domain management → HTTPS: Zertifikat abwarten (Netlify: Netlify muss TLS terminieren, ein vorgeschalteter Cloudflare-Proxy verhindert die Ausstellung). Erst wenn „Netlify certificate" steht: Proxy-Status nach E18 (Empfehlung orange wie bei machsleicht.de; ANNAHME: die Erneuerung läuft mit Proxy, weil die alte Site so läuft — S61 prüft monatlich das Ablaufdatum; scheitert eine Erneuerung, 24 h auf grau).
Artefakt: Netlify-Projekt `<neu-site>` ohne Produktions-Deploy, Domain verbunden, Zertifikat erteilt.
Beleg: `curl -sI https://<neu>/ | head -1` liefert eine Netlify-Antwort (404 „Not found" ohne Deploy ist erwartet); `curl -sI https://www.<neu>/ | grep -i location` → `https://<neu>/`; `echo | openssl s_client -connect <neu>:443 -servername <neu> 2>/dev/null | openssl x509 -noout -issuer -enddate` → Let's Encrypt, enddate > 60 Tage.
Stopp: Zertifikat nach 24 h nicht erteilt → Records grau? Flattening aktiv? DNSSEC am Registrar aus? Kein Proxy, bis es steht.

### S15 — Staging mit noindex per Deploy-Kontext; Linter-Stufe 74 „Produktion ohne noindex"
Phase: 1 · Wer: Claude · Dauer: 2 h · Hängt ab von: S14 · KW: 42
Tun: Netlify setzt `X-Robots-Tag: noindex` selbst nur auf Deploy Previews, unveröffentlichte Produktions-Deploys und alte Branch-Deploys; der jüngste Branch-Deploy ist indexierbar (Deploy-Übersicht). Deshalb `netlify.toml`: `[context.branch-deploy] command = "bash _dev/scripts/staging-headers.sh"`; das Skript stellt `/*` + `  X-Robots-Tag: noindex, nofollow` vor den Inhalt von `_headers` im Publish-Verzeichnis (Headers gelten per Deploy-Datei, nicht per Kontext — Netlify-Headers-Doku). `[context.production]` ohne command. `robots.txt` bleibt `Allow: /`, damit Googlebot das noindex lesen kann (Block-Indexing-Doku: noindex wirkt nur ohne robots.txt-Sperre). Stufe 74: (a) `_headers` im Repo enthält keine `/*`-Regel mit `noindex`; (b) `netlify.toml` hat unter `[context.production]` kein command mit `staging-headers`; (c) `robots.txt` enthält keine Zeile `Disallow: /`. Push auf `staging`.
Artefakt: Branch-Deploy `https://staging--<neu-site>.netlify.app` mit noindex; Stufe 74.
Beleg: `curl -sI https://staging--<neu-site>.netlify.app/ | grep -ic 'x-robots-tag: noindex'` = 1; Stufe 74 grün; Prüfstand-Fall: `_headers` mit `/*`-noindex macht Stufe 74 rot.
Stopp: Header fehlt auf Staging → Netlify-Build-Log lesen (Skript nicht gelaufen, Kontext falsch).

### S16 — Search Console, Bing Webmaster Tools, Crawler Hints
Phase: 1 · Wer: Bolle · Dauer: 0,5 h · Hängt ab von: S9 · KW: 43
Tun: search.google.com/search-console → Property hinzufügen → Domain `<neu>` → TXT-Wert → Cloudflare DNS `TXT @ google-site-verification=…` (DNS only) → Bestätigen (Google: Minuten bis Tage; Record dauerhaft lassen; Domain-Property deckt alle Subdomains ab, also auch `party.<neu>`). Bing: bing.com/webmasters → „Import from Google Search Console" → `<neu>` (Sitemaps werden mitimportiert, sobald sie existieren; S50 prüft). Cloudflare → Caching → Configuration → Crawler Hints: an (alle Pläne inkl. Free; wirkt nur bei Proxy an, E18).
Artefakt: GSC Domain-Property `<neu>` verifiziert, BWT-Site `<neu>`, Crawler Hints aktiv.
Beleg: GSC „Inhaberschaft bestätigt"; `dig TXT <neu> +short | grep -c google-site-verification` = 1; BWT zeigt `<neu>` als verifiziert.
Stopp: Verifikation „nicht gefunden" → 24 h warten; Wert ohne doppelte Anführungszeichen prüfen.

### S17 — Resend-Domain, Audience, Postfach `kontakt@<neu>`
Phase: 1 · Wer: Bolle · Dauer: 1 h · Hängt ab von: S9 · KW: 43
Tun: resend.com → Domains → Add Domain → `<neu>` (Region EU, wenn angeboten) → Records in Cloudflare DNS, alle DNS only: `MX send → <Resend-Wert> Prio 10`, `TXT send → v=spf1 …`, `TXT resend._domainkey → <DKIM>` (Resend-Cloudflare-Anleitung) → „Verify DNS Records" (Resend: bis 72 h, meist schneller). Zusätzlich `TXT _dmarc → v=DMARC1; p=none; rua=mailto:kontakt@<neu>`. Resend → API Keys → Key „party-<neu>" (Sending access, nur diese Domain) → Wert für S13. Resend → Audiences → neue Audience → ID für S13. Migadu → Admin → Domains → `<neu>` hinzufügen → Migadus MX/SPF/DKIM-Records in Cloudflare (DNS only; Resend sendet über `send.<neu>`, Migadu empfängt auf `@` — keine SPF-Kollision) → Alias `kontakt@<neu>` → Bolles Postfach. Migadu Micro: keine erzwungene Domain-Grenze, 20 ausgehende Mails je Tag (Preisseite) — reicht für Antworten; Versand läuft über Resend.
Artefakt: Resend-Domain „Verified", Key, Audience; Alias `kontakt@<neu>`.
Beleg: `dig TXT resend._domainkey.<neu> +short` nicht leer; Resend-Dashboard „Verified"; Testmail an `kontakt@<neu>` landet in Bolles Postfach.
Stopp: Resend „Pending" nach 72 h → Record-Namen vergleichen (Cloudflare ergänzt die Zone nicht, wenn der Name bereits voll qualifiziert eingegeben wurde).

### S18 — Umami-Website, Amazon-Tracking-ID, AWIN
Phase: 1 · Wer: Bolle · Dauer: 1 h · Hängt ab von: S6 (E11) · KW: 42
Tun: cloud.umami.is → Settings → Websites → „Add website" `<neu>`; lässt der Hobby-Plan keine zweite Website zu, gilt E11. Snippet mit `data-website-id`, `data-domains="<neu>"` (Staging zählt nicht) und `data-exclude-search="true"` (keine Query-Parameter mit Vornamen) in `_dev/config/site.json` eintragen. Amazon PartnerNet → Kontoeinstellungen → „Websites und Apps" → `<neu>` ergänzen; Tracking-IDs verwalten → neue ID (Format `<wort>-21`) → Wert für S11/S13. AWIN → Publisher-Profil → Website `<neu>` hinzufügen.
Artefakt: Umami-Website-ID, Amazon-Tracking-ID, AWIN-Eintrag; `site.json` (keine Secrets).
Beleg: Umami listet `<neu>` (0 Besucher); PartnerNet listet `<neu>`; `grep -c umamiId _dev/config/site.json` = 1.
Stopp: Umami-Limit erreicht → E11 Option b oder c; kein Tracker auf `<neu>` mit der alten Website-ID (Doppelzählung).

### S19 — Quoten-Rechnung beider Sites mit Dashboard-Zahlen
Phase: 1 · Wer: Claude (Zahlen von Bolle) · Dauer: 1 h · Hängt ab von: S13 · KW: 43
Tun: Bolle liest ab: Cloudflare → Workers & Pages → `party-machsleicht` → Metrics: Requests letzte 7 Tage; Workers KV → Namespace → Metrics: Writes je Tag; Resend → Emails: gesendet letzte 30 Tage; Umami: Events letzte 30 Tage. Claude schreibt `_dev/messungen/QUOTEN.md`: Limit (Quelle, 01.10.2026) | Alt-Verbrauch | Neu-Verbrauch erwartet | Alarmschwelle. Limits: Workers Free 100.000 Requests je Tag und Konto, 5 Cron-Trigger je Konto (2 belegt); KV Free 100.000 Reads und 1.000 Writes je Tag und Konto; Resend Free 100 Mails je Tag, 3.000 je Monat, 3 Domains (2 belegt); Umami Hobby 100.000 Events je Monat (Website-Zahl: S18). Alarmschwellen: KV-Writes 600/Tag, Resend 70/Tag, Workers 50.000/Tag, Umami 80.000/Monat; bei Überschreitung Upgrade (Workers Paid), nie Drosselung des Produkts. Phase-3-Tests erzeugen ≤ 50 KV-Writes und ≤ 20 Mails je Tag.
Artefakt: QUOTEN.md.
Beleg: Alle Zellen „Alt-Verbrauch" mit Zahl und Datum; Summe Alt+Neu unter der Alarmschwelle je Zeile.
Stopp: Alt-Verbrauch bereits > 50 % eines Limits → Upgrade vor Livegang (Bolle), sonst teilen sich zwei lebende Produkte eine Drossel.

### S20 — Altkunden-Funktionsnachweis auf dem Alt-Stack (vor dem Livegang)
Phase: 1 · Wer: beide · Dauer: 1,5 h · Hängt ab von: S5, S13 · KW: 43
Tun: Nach Schlüsselrotation und neuem Worker (am Alt-Stack ist nur der Resend-Key neu) legt Claude im Browser auf `machsleicht.de/kindergeburtstag` eine Testparty an (Vorname „Test", Datum +21 Tage, kein Foto) und prüft neun Linktypen: (1) Partyseite `party.machsleicht.de/<id>`, (2) Edit-Link `?edit=`, (3) Gast-Link `?g=`, (4) Edit-Link-Mail → Link klicken, (5) Magic-Link `machsleicht.de/kindergeburtstag?plan=<token>` per Mail → klicken, (6) `/e/<slug>` aus `einladung/erstellen`, (7) `paket/ritter/?id=…&tok=…` lädt mit Partydaten, (8) DOI-Mail → `api/newsletter-confirm` antwortet 200, (9) Cron: `node _dev/scripts/check-cron-erinnerung.mjs` im `<alt-repo>` (kein Deploy). Testparty per Edit-Link löschen.
Artefakt: `_dev/messungen/2026-10-XX-altkunden-nachweis.md`: Linktyp | URL-Muster | HTTP | Zeitstempel | TTL-Regel (Partyseite: Partydatum + 14 Tage, ohne Datum 30 Tage, Obergrenze 2 Jahre — `calcTTL`; `plan:` 90 Tage; `wl:` 365; `doi:` 7; `consent:` 3 Jahre; `extimg:` 90; `/e/` stateless).
Beleg: 9/9 Zeilen HTTP 200 oder Resend „delivered"; S48 wiederholt die Tabelle nach dem Livegang.
Stopp: Ein Linktyp bricht → Ursache liegt im Alt-Stack (S5-Rotation?) → vor Phase 3 beheben; kein Livegang mit roter Zeile.

## Phase 2 — Positionierung und Informationsarchitektur (KW 43–44)

Eingang: Phase 1 abgeschlossen. Ausgang: `IA.md` eingefroren, Stufen 73–76 laufen mit Prüfstand-Fällen.

### S21 — Zwecksatz, URL-Baum und `IA.md` endgültig
Phase: 2 · Wer: Claude · Dauer: 3 h · Hängt ab von: S6 (E6–E10, E14, E15) · KW: 43
Tun: `_dev/IA.md` mit (a) dem Zwecksatz aus 0.2; (b) einer Tabelle aller URLs: Pfad | indexierbar | Typ | Werkzeug-Element | Quelle | Canonical | Inlinks (≥ 2 je indexierbare Seite); (c) App-Shells mit noindex per Meta und per `X-Robots-Tag` plus Self-Canonical (Google: Meta und Header gleichwertig, bei Konflikt gilt die restriktivere Regel — Robots-Meta-Doku); (d) Abschnitt „Doorway-Nachweis" (Winkel 12, R2) mit vier nummerierten Punkten und je Punkt der Prüfstelle: (1) keine Trichterung — kein Link, Redirect oder Canonical in irgendeiner Richtung (Stufe 73, 0 Treffer); (2) kein Variantenklon — alt 136 Textseiten mit Motto×Alter-Matrix und Einladungs-Hubs, neu 9 Werkzeug-Seiten ohne beides, Hauptinhalt je Seite ≤ 3 % Überlappung, 0 identische Sätze, ≥ 50 % neue h2 (Stufe 75); (3) kein Zwischenziel — jede indexierbare Seite ist selbst das nutzbare Werkzeug (Planer-Zustand, Spiele-Demo, Rechner), keine Seite „vor" dem Werkzeug (IA.md-Spalte Werkzeug-Element); (4) die alte Domain wird nicht neu auf dieselben Suchanfragen zugeschnitten (Phase 7, Eingriffe = 0). Googles Doorway-Definition (G16): Sites oder Seiten für ähnliche Suchanfragen, die Nutzer auf weniger nützliche Zwischenseiten führen; Beispiele sind mehrere Websites mit leichten Varianten von URL und Startseite. Was der Nachweis nicht beweist: dass Google den gemeinsamen Betreiber nicht wertet (keine Primärquelle; G25 schweigt, Mueller 2020 ist Hinweis) — als ANNAHME markiert. Baum mit E7/E8 angewendet:
```
/                                   indexierbar  Startseite (System)
/planen/                            indexierbar  Flaggschiff, Stufe 1 „Motto wählen"
/planen/ritter/   /planen/piraten/  indexierbar  Werkzeug-Zustand „Motto gewählt" + Mottotext
/planen/<motto>/<alter>/            noindex      Zustand „Alter gewählt → Plan" (aus JSON), Canonical → /planen/<motto>/
/planen/<motto>/<alter>/einladung/  noindex      Stufe 4 (Einladung + Partyseite)
/planen/<motto>/<alter>/fertig/     noindex      Stufe 5
/einladung/                         indexierbar  Erklärseite Einladung + Partyseite
/spiele/                            indexierbar  Hub mit 8 Demos
/spiele/game-*.html                 noindex      Header + Meta, Referrer-Policy no-referrer
/paket/                             indexierbar  Produktseite
/paket/<motto>/                     noindex      token-personalisiert
/kosten/                            indexierbar  Rechner aus Daten
/ueber-uns/                         indexierbar
/impressum/  /datenschutz/          indexierbar, nicht in der Sitemap
/404.html  /410.html                Fehlerseiten
party.<neu>/*                       noindex (Worker-Meta), nicht in der Sitemap
```
Trailing-Slash-Politik: jede Seite als `<pfad>/index.html`, Canonical mit Slash, `.html`-Aufrufe → 301 (S25). Eine Property als Wahrheit: die GSC Domain-Property `<neu>`; keine URL-Präfix-Property.
Artefakt: IA.md, `_dev/config/sitemap-allowlist.json` mit den 9 Sitemap-Pfaden.
Beleg: 11 indexierbare Zeilen (9 Sitemap + Impressum + Datenschutz); jede indexierbare Zeile hat ein Werkzeug-Element oder einen eigenen Zweck; `node -e "console.log(require('./_dev/config/sitemap-allowlist.json').length)"` = 9; Abschnitt Doorway-Nachweis mit 4 Punkten und 4 Prüfstellen vorhanden.
Stopp: Eine Zeile ohne Werkzeug-Element → Seite streichen oder Element benennen; keine Zeile „kommt später".

### S22 — Signal-Trennungs-Matrix als Prüfungen: Stufe 73 erweitern
Phase: 2 · Wer: Claude · Dauer: 3 h · Hängt ab von: S11 · KW: 43
Tun: Fünf Prüfungen zusätzlich: (1) Bild-Hashes: `sha256sum` aller `png|jpg|webp|svg` im `<neu-repo>` gegen `_dev/config/alt-bild-hashes.txt` (einmal aus `main acebbc22` erzeugt: `git -C <alt-repo> ls-tree -r acebbc22 --name-only | grep -Ei '\.(png|jpe?g|webp|svg)$' | xargs -I{} sh -c 'git -C <alt-repo> show acebbc22:{} | sha256sum'`) → Schnittmenge 0; (2) JSON-LD: `Organization.name|url|logo`, `WebSite.url`, `sameAs[]` enthalten weder `machsleicht` noch alte Profil-URLs; (3) Footer, Impressum, Über-uns: externe Links nur aus der Host-Allowlist plus Pflichtnennungen der Datenschutzerklärung; (4) Worker, Mail-Templates, ICS: `grep -c machsleicht party-worker.js` = 0; (5) QR-Ziele: `paket-core.js` baut QR ausschließlich aus `PARTY_HOST`; Trailer-Build (nur bei E14): Wasserzeichen-String = neue Marke. Je Prüfung ein Prüfstand-Fall in `_dev/pruefstand/faelle_stufe73.py`.

Die Matrix, die Stufe 73 abbildet (Winkel 2):

| Signal | Status | Beleg | Prüfung |
|---|---|---|---|
| 301/302/308 alt↔neu | verboten | G1, G6 | `_redirects` beider Repos ohne fremden Host |
| rel=canonical cross-domain | verboten | G2, G3, G4 | jeder Canonical zeigt auf den eigenen Host |
| gleicher oder sehr ähnlicher Hauptinhalt | verboten, messbar | G3, G5, G15 | Stufe 75 + Playwright-DOM-Vergleich (S23) |
| Links alt→neu oder neu→alt (HTML, Footer, Impressum „weitere Projekte", Mails, ICS, Trailer-Wasserzeichen, QR, Paket-Drucke) | verboten (konservativ) | G18 dokumentiert Links nur im Site-Reputation-Kontext mit nofollow-Empfehlung | 0 Vorkommen „machsleicht" inkl. Worker, Mail-Templates, `paket-core.js`, Trailer-Build; QR-Ziele ausgelesen |
| Organization, sameAs, og:site_name identisch | ANNAHME (G25 ohne Aussage) | — | Prüfung (2) |
| identische Bilder und OG-Bilder | ANNAHME (nirgends dokumentiert) | — | Prüfung (1), Schnittmenge 0 |
| gleiches Template, CSS, Fonts, Spiel-Engine | ANNAHME (nirgends dokumentiert) | — | neues Layout und neue Klassenpräfixe für indexierbare Seiten; `core.js` und die 60 Spiele bleiben (Bolle 03.07.), sind noindex und damit kein Index-Signal |
| Amazon-Tag `machsleicht21-21` (816 Links, 45 JSON) | ANNAHME (Affiliate-Parameter als Verbindung nirgends dokumentiert) | — | neue Tracking-ID (S18), 0 Treffer |
| Betreiberidentität im Impressum, Netlify-, Cloudflare-, Google-Konto | erlaubt | G7 nennt das Konto nur als Change-of-Address-Bedingung; Mueller 2020 (Hinweis) | identisch, nie verfälscht (E13) |
| Umami-Website, Resend-Domain, KV-Namespace | kein Google-Signal belegt | Mueller 2020 (Hinweis) | trotzdem getrennt wegen Datenschutz, Quoten, Zählung (S13, S17, S18) |

Artefakt: Stufe 73 v2, Hash-Liste, 5 Prüfstand-Fälle.
Beleg: Linter-Zeile „Stufe 73: 0 Verbindungen (5 Prüfungen)"; `python _dev/pruefstand/pruefstand.py --stufe 73` → 5/5 Mutationen erkannt.
Stopp: Eine Prüfung erkennt ihre Mutation nicht (blindes Gate) → die Stufe gilt als nicht vorhanden, bis der Fall rot wird.

### S23 — Überlappungs-Skript (Stufe 75) und Playwright-DOM-Vergleich
Phase: 2 · Wer: Claude · Dauer: 4 h · Hängt ab von: S21 · KW: 43
Tun: `_dev/scripts/check-alt-neu-ueberlappung.py`: liest `_dev/config/quellen.json` (neue URL → alte Quellpfade + JSON-Dateien), holt Alt-Text per `git -C <alt-repo> show acebbc22:<pfad>`, extrahiert sichtbaren Text wie `check-sichtbarer-text.py`, normalisiert Hosts und Marken, segmentiert nach h2, bildet 8-Wort-Shingles, meldet je Abschnitt und je Seite den Anteil gemeinsamer Shingles, identische Sätze ≥ 35 Zeichen (minus Allowlist), identische FAQ-Strings im JSON-LD und den Anteil neuer h2. Grenzen und Herleitung: ≤ 5 % je Abschnitt, ≤ 3 % je Seite — die 15 alten Mottoseiten liegen untereinander bei 7,7 % Median und gelten mit Eigenanteil ≥ 90 % als unique (Stufe 62), die Einladungs-Hubs bei 62,7 % als Dubletten; alt↔neu muss deutlich unter dem Geschwister-Niveau liegen. Dazu 0 identische Sätze ≥ 35 Zeichen außer einer namentlichen Allowlist für Bedienelemente (analog Stufe 62), 0 identische FAQ-Fragen oder -Antworten im JSON-LD, keine HowTo-Blöcke, ≥ 50 % der h2 kommen in der Quellseite nicht vor. Das Gerüst wird nicht künstlich variiert (G16 definiert Scaled Content über Masse ohne Nutzwert, nicht über Überschriften); es ist anders, weil ein Werkzeug-Zustand anders aufgebaut ist als eine Ratgeberseite. Grenze der Metrik: Shingles messen Wortgleichheit, nicht Sinngleichheit; Paraphrasen fängt der Review-Winkel „Satz für Satz gegen die Quellseite" (S41, R20). Die JSON-Prosa der 45 Motto-Dateien (rund 444.000 Tokens, gezählt heute) zählt als Quelle: Fakten daraus sind Rohstoff, Sätze daraus sind Treffer. `_dev/scripts/compare-rendered.mjs`: Playwright/Chromium (`npx -y playwright install chromium`) öffnet je indexierbarem Werkzeug-Zustand das Alt-Pendant (`machsleicht.de/kindergeburtstag?motto=ritter`) und den Staging-Zustand, wartet auf `networkidle`, liest `document.body.innerText`, rechnet dieselbe Metrik; für noindex-Zustände prüft es `meta[name=robots]` und den Antwort-Header.
Artefakt: beide Skripte; Stufe 75 in `validate-all.sh` ruft das Python-Skript; der Playwright-Lauf steht im Deploy-Protokoll (S60), nicht im Linter (Laufzeit).
Beleg: Prüfstand: eine 1:1 kopierte alte Mottoseite unter neuem Pfad → Stufe 75 rot „Seite 100 %"; Allowlist-Sätze erzeugen keinen Treffer; Laufzeit < 60 s für 11 Seiten.
Stopp: `<alt-repo>` nicht erreichbar → Skript bricht laut ab, kein stilles Grün.

### S24 — Sitemap-Generator mit Allowlist, ehrliches lastmod, Stufe 76
Phase: 2 · Wer: Claude · Dauer: 2 h · Hängt ab von: S21 · KW: 44
Tun: `generate-sitemap.js` forken: `SITEMAP_EXCLUDE` (Blocklist, 18 Einträge) durch die Allowlist ersetzen; DOMAIN aus `site.json`; lastmod-Logik unverändert (Autor-Datum aus Git, Konvention „Technisch:", Abbruch bei Shallow-Clone); Abbruch, wenn eine Allowlist-URL keine Datei hat oder eine indexierbare Datei fehlt. Stufe 76: (a) Sitemap-URL-Zahl = Allowlist-Länge; (b) jede Sitemap-URL hat eine Datei mit Self-Canonical mit Slash; (c) keine noindex-Seite in der Sitemap; (d) `generate-seo-pages.js` existiert nicht (Alt-Landmine: schrieb eine Sitemap mit 24 URLs, Zeilen 821–824); (e) Diff gegen die Sitemap im HEAD: > 3 hinzugefügt, > 2 entfernt oder lastmod auf > 3 URLs ohne Inhalts-Diff → rot (Massenänderung); jede Einzelentfernung braucht eine Zeile in `SITEMAP-CHANGELOG.md`. Google ignoriert `priority` und `changefreq`, nutzt lastmod nur bei nachprüfbarer Richtigkeit (G11) — der Generator schreibt beides nicht.
Artefakt: Generator, Stufe 76, `SITEMAP-CHANGELOG.md` mit Kopf.
Beleg: `node _dev/scripts/generate-sitemap.js` → „9 URLs, 9 lastmod aus Git, 0 heute wegen Working Tree"; Stufe 76 grün; Prüfstand: Allowlist um 4 Einträge erweitert → rot „Massenänderung".
Stopp: lastmod uniform → Generator-Abbruch; nie von Hand stempeln (Lehre 01.06.: 126 URLs auf ein Datum).

### S25 — Doppel-Erreichbarkeit schließen, Header-Politik, 404/410
Phase: 2 · Wer: Claude · Dauer: 2 h · Hängt ab von: S21 · KW: 44
Tun: `_redirects` aus der Allowlist generiert: `/<pfad>.html /<pfad>/ 301` und, falls Netlify ohne Slash nicht selbst 301 liefert (Pretty URLs „forwards/rewrites" — auf Staging messen), `/<pfad> /<pfad>/ 301`; Netlify kennt kein Endungsmuster wie `/*.html`. Sperrregeln (`/_dev/* /404.html 404!` usw.) bleiben. `_headers` für `/*`: `Strict-Transport-Security: max-age=31536000; includeSubDomains`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`; `/spiele/*`: statt DENY `Content-Security-Policy: frame-ancestors https://party.<neu>`, `Referrer-Policy: no-referrer`, `X-Robots-Tag: noindex, nofollow`; `/paket/*`, `/api/*`, `/.netlify/functions/*`, `/planen/*/*/` noindex. `404.html`, `410.html` neu getextet mit Weg zu `/planen/`. `www.<neu>` → Apex übernimmt Netlify (S14).
Artefakt: `_redirects`, `_headers`, 404/410.
Beleg: Schleife über die Allowlist auf Staging: `curl -sI <url>` → 200; `<url ohne Slash>` → 301 auf die Slash-Form; `<url>.html` → 301; `/gibtesnicht` → 404 mit eigener Seite; je indexierbarer URL 4 Security-Header (`curl -sI | grep -cE 'strict-transport|nosniff|referrer-policy|x-frame'` = 4).
Stopp: `.html` und Slash-Form beide 200 → explizite 301-Zeilen bleiben Pflicht, erneut messen.

### S26 — IA abnehmen und einfrieren
Phase: 2 · Wer: Bolle · Dauer: 0,5 h · Hängt ab von: S21–S25 · KW: 44
Tun: IA.md lesen, je Zeile „ja" zum Werkzeug-Element, Zeile „IA eingefroren am <Datum>, 9 Sitemap-URLs" eintragen; Claude setzt Tag `ia-final`. Ab hier gilt die Massenänderungs-Grenze auch für Staging; URLs sind vor dem Livegang endgültig.
Artefakt: IA.md mit Freigabezeile; Tag `ia-final`.
Beleg: `git tag -l ia-final | wc -l` = 1; Stufe 76 vergleicht die Allowlist gegen den Tag (unverändert).
Stopp: Bolle streicht oder ergänzt → zurück zu S21, neuer Tag; nach dem Livegang keine URL-Änderung mehr.

## Phase 3 — Launch-Set bauen (KW 44–47)

Eingang: Tag `ia-final`. Ausgang: 9 Sitemap-URLs plus Impressum und Datenschutz auf Staging in Endqualität. Elf gegatete Stücke in vier Wochen (S29–S39) = 2,75 je Woche gegen belegte 4–5 (G). Pipeline-Regel: während ein Review läuft, wird das nächste Stück gebaut.

### S27 — Rohstoff-Inventar und Gerüst-Plan je Launch-Seite
Phase: 3 · Wer: Claude · Dauer: 2 h · Hängt ab von: S26 · KW: 44
Tun: `_dev/config/quellen.json` füllen (neue URL → alte Quellpfade, JSON-Dateien). Je Seite ein Brief `_dev/review/launch-set/<seite>.md`: Zweck in einem Satz, Werkzeug-Element, Zielwortzahl (D), Rohstoff-Fakten mit Datenquelle im Repo, Gerüst (h2-Liste, ≥ 50 % neu gegen die Quelle), Bilderliste (eigene), Inlinks (≥ 2), FAQ-Fragen neu (aus den Umami-Suchbegriffen aus S2 und den Playtests, nicht aus alter FAQ). `LEKTIONEN.md` und `OFFENE-REVIEW-PUNKTE.md` sind Pflichtteil jedes Schreib- und Review-Prompts.
Artefakt: 11 Briefs, quellen.json.
Beleg: `ls _dev/review/launch-set | wc -l` = 11; Stufe 75 im Trockenlauf meldet „Datei fehlt" je Seite, kein Abbruch.
Stopp: Brief ohne Werkzeug-Element oder ohne Datenquelle → Seite verlässt das Launch-Set.

### S28 — Eigene Fotos: Paket-Drucke, Portrait
Phase: 3 · Wer: Bolle · Dauer: 2 h · Hängt ab von: S27 · KW: 44
Tun: Pakete Ritter und Piraten aus `paket/<motto>/` drucken, je Motto 6–10 Fotos bei Tageslicht (Tisch, Hände, Urkunde, Spielkarte — keine Kindergesichter); ein Portrait Marie-Therese Bollweg für `/ueber-uns/`; JPEG ≥ 2.000 px nach `_dev/bilder-roh/`. Claude verkleinert (WebP ≤ 150 KB, Breiten 1200/600) und setzt `width`/`height` (CLS).
Artefakt: ≥ 13 Rohfotos.
Beleg: `ls _dev/bilder-roh | wc -l` ≥ 13; Stufe 73 Bild-Hash-Schnittmenge = 0.
Stopp: Keine Drucke, kein Licht → `/paket/` wird ohne eigene Fotos nicht veröffentlicht (E5), die anderen Seiten tragen Produkt-Screenshots aus S40.

### S29 — Startseite `/`
Phase: 3 · Wer: Claude · Dauer: 6 h · Hängt ab von: S27, S18 · KW: 44
Tun: Statisches HTML ohne React (alt: React 18 von unpkg). Aufbau: Zwecksatz (0.2); die Schritte Plan → Einladung + Partyseite → Spiele → Paket als Abfolge mit echten Screenshots (S40), jeder Schritt verlinkt den Werkzeug-Zustand; Motto-Wähler mit genau den Launch-Mottos als Buttons auf `/planen/<motto>/`; Zahlen nur mit Kommando-Beleg (z. B. „8 Einladungsspiele" = `ls spiele/game-*-{ritter,piraten}.html | wc -l`); kein Trailer, kein Preis, kein Foto-Print, kein „bald". Claim aus Bolles dokumentierten Formulierungen (1.1), ohne Zeitzusage, bis S47 eine Zeit misst. JSON-LD `Organization` (neu) und `WebSite`. Umami-Snippet mit `data-domains`.
Artefakt: `index.html`.
Beleg: Linter 0 FAIL; Stufe 75 gegen die alte `index.html`: Seite ≤ 3 %, 0 Sätze; PageSpeed Insights (Staging-URL) Performance mobil ≥ 90, CLS < 0,1 (Labordaten — CrUX liefert ohne Besucher „keine Daten", CWV-Bericht-Hilfe); `grep -c unpkg index.html` = 0; Review 0 MAJOR (S41).
Stopp: Zahl ohne Kommando-Beleg im Brief → Satz raus.

### S30 — `/planen/` Flaggschiff: Stufe 1 als indexierbare Seite
Phase: 3 · Wer: Claude · Dauer: 6 h · Hängt ab von: S27 · KW: 44
Tun: Werkzeug-Code aus `kindergeburtstag.html` (378.895 Byte, gemessen heute) in `planen/index.html`, `js/planen.js`, `css/planen.css` zerlegen. Stufe 1 server-seitig als Text: Motto wählen, ein Absatz je Launch-Motto, wie der Plan entsteht, was danach passiert — 900–1.400 sichtbare Wörter, neu geschrieben (Rohstoff: alter Planer-Text, 3.195 Wörter). `<title>` neu, Meta-Description neu, Self-Canonical, `robots index,follow`. JSON-LD `WebPage`; `WebApplication` nur mit ehrlichen Pflichtfeldern — Google verlangt für das Software-Rich-Result `aggregateRating` oder `review` (Software-App-Doku); ohne echte Bewertungen kein Block. Stufen 2–5 bleiben im DOM ohne Text-Dubletten (Inhalte kommen zur Laufzeit aus JSON).
Artefakt: `planen/index.html`, `js/planen.js`.
Beleg: Stufe 75 gegen `kindergeburtstag.html` Seite ≤ 3 %; `compare-rendered.mjs` Zustand „Start" ≤ 5 %; Linter 0 FAIL (Stufen 11–14, 60, 72 laufen wie heute); Review 0 MAJOR.
Stopp: DOM-Vergleich > 5 % → gelistete Shingle-Blöcke neu schreiben, keine Wort-Tauschereien.

### S31 — `/planen/` Zustände mit eigener URL (History API)
Phase: 3 · Wer: Claude · Dauer: 4 h · Hängt ab von: S30 · KW: 45
Tun: `history.replaceState` (eine Stelle, Alt-Zeile 4472) und `goStage` ersetzen durch `history.pushState` je Zustand auf `/planen/<motto>/`, `/planen/<motto>/<alter>/`, `…/einladung/`, `…/fertig/` mit eigenem `<title>` (Google: History API statt Fragmente, eigene Titel je Zustand — JavaScript-SEO-Doku); `popstate` stellt den Zustand her. Direktaufrufe bedient Netlify über statische Shells `planen/<motto>/<alter>/[einladung|fertig/]index.html` ohne sichtbaren Text: `meta robots noindex,follow`, Canonical auf `/planen/<motto>/`, Titel „Dein <Motto>-Plan für <Alter> — Entwurf", Start des Werkzeugs mit Parametern. Stufe 74b: jede Datei unter `planen/*/*/` trägt noindex und Canonical auf die Motto-Ebene.
Artefakt: 18 Shells (2 Mottos × 3 Alter × 3 Tiefen), aus einer Vorlage erzeugt.
Beleg: `curl -sI https://staging…/planen/ritter/6-8/ | grep -ic x-robots-tag` = 1 und `grep -c noindex planen/ritter/6-8/index.html` = 1; Playwright: Zurück-Taste vom Plan zur Motto-Ebene behält den Zustand; Umami erfasst Pfadwechsel.
Stopp: Ein Tiefenpfad ohne noindex → Stufe 74b rot, kein Deploy.

### S32 — `/planen/ritter/` Mottoseite als Werkzeug-Zustand
Phase: 3 · Wer: Claude · Dauer: 6 h · Hängt ab von: S31, S28 · KW: 45
Tun: Von Hand geschrieben (Bolle 01.09.: nie generiert, Eigenanteil ≥ 90 %). Oben das Werkzeug im Zustand „Ritter gewählt" (Alter wählen, Plan erzeugen); darunter 1.200–1.800 Wörter mit neuem Gerüst (zum Beispiel „Was der Plan für Ritter enthält", „Die vier Ritter-Spiele zum Ausprobieren", „Was Eltern vorbereiten — Einkaufsliste aus den Daten", „Fragen vor der Party"); Zahlen aus `data/motto/ritter-*.json` (Summe `priceEur` = `costContext`, Lektion L4); 4 Spiele-Demos (`spiele/game-{katapult,schwert,wappen,schatzjagd}-ritter.html`) mit dem einzigen zugelassenen Demo-Asset; Paket-Fotos aus S28; 5 neue FAQ-Fragen als `FAQPage` (erlaubt, Rich Result nicht erwartet — HowTo/FAQ-Änderung 08/2023), kein HowTo. Fehlt für ein Altersband eine Spiel-Staffel (Stufe 26 Altlast), steht das als Satz auf der Seite — kein stiller Abbruch.
Artefakt: `planen/ritter/index.html`.
Beleg: Stufe 75 gegen `kindergeburtstag/ritter.html` (1.419 Wörter), `ritter-3-5|6-8|9-12-jahre.html` (6-8: 3.900 Wörter) und `ritter-*.json`: Seite ≤ 3 %, Abschnitt ≤ 5 %, 0 Sätze, FAQ 0, neue h2 ≥ 50 %; Eigenanteil ≥ 90 % gegen `/planen/piraten/`; Linter 0 FAIL; Review 0 MAJOR.
Stopp: Ein Abschnitt > 5 % → Abschnitt neu schreiben, nicht Wörter tauschen.

### S33 — `/planen/piraten/` Mottoseite
Phase: 3 · Wer: Claude · Dauer: 6 h · Hängt ab von: S31, S28 · KW: 45
Tun: Verfahren S32 für Piraten: Spiele `flaschenpost`, `kanone`, `memory`, `schatzjagd`; Daten `piraten-*.json` (Pilotmotto, reifste Daten laut L6); eigenes Gerüst, das sich von `/planen/ritter/` unterscheidet (Eigenanteil gegen Ritter ≥ 90 %, 0 identische FAQ-Fragen zwischen den Mottoseiten — Struktur-Dubletten innerhalb der neuen Domain sind Risiko R3).
Artefakt: `planen/piraten/index.html`.
Beleg: Stufe 75 gegen `kindergeburtstag/piraten.html`, drei Altersseiten, `piraten-*.json` unter Grenze; Eigenanteil ≥ 90 %; Review 0 MAJOR.
Stopp: Wie S32.

### S34 — `/einladung/` Erklärseite
Phase: 3 · Wer: Claude · Dauer: 5 h · Hängt ab von: S27, S39 · KW: 45
Tun: Neu: wie Einladung und Partyseite in einem Schritt entstehen (Plan vor Einladung, bindend 08.09.), was die Partyseite kann (Rückmeldung, Gästeliste, Wunschliste mit Werbekennzeichnung Stufe 58, Foto, Erinnerungsmail 7 Tage vorher — der Cron existiert), WhatsApp-Share; echte Screenshots einer Testparty auf `party.<neu>`; Button → `/planen/`. Rohstoff: `/einladung/whatsapp/`, `/einladung/text/`; die 30 Hub- und Vorlagen-Seiten sind Negativbeispiel, nicht Quelle. 700–1.000 Wörter. Jeder Funktionssatz hat eine Worker-Route als Beleg (`/api/create`, `/api/party`, `/api/photo`, `/api/invphoto`, `/api/plan`, `/api/waitlist`, `/api/newsletter-confirm` — 7 Routen, gezählt heute).
Artefakt: `einladung/index.html`.
Beleg: Stufe 75 gegen `einladung/whatsapp/index.html`, `einladung/text/index.html`, `einladung/index.html` ≤ 3 %; Review 0 MAJOR; Funktionssätze ↔ Routen-Tabelle im Brief vollständig (Lektion L1).
Stopp: Funktionsversprechen ohne Route → Satz raus.

### S35 — `/spiele/` Hub, 8 Spiele nach Sweep, Playtest
Phase: 3 · Wer: Claude (Playtest: Bolle 1 h) · Dauer: 5 h · Hängt ab von: S11, S27 · KW: 46
Tun: Hub 600–900 Wörter neu: was Einladungsspiele sind, je Spiel eine Demo (iframe mit `?name=Demo&foto=/spiele/core/demo-kid.jpg`), Alterszuordnung aus den Daten, Ablauf Gast → Spiel → Zusage. 8 Spiele (Ritter 4, Piraten 4) auf Staging testen; Playtest-Protokoll je Spiel: Gerät, Dauer, Reveal erreicht ja/nein — Bewertung per Playtest, nicht Prosa (Bolle). In `core.js` den `setPhoto`-onerror-Fallback umsetzen (höchste Prod-Pass-Priorität laut OFFENE-REVIEW-PUNKTE, von 6 Gutachten geflaggt) mit Cache-Bump `?v=` für alle 60 Spiele.
Artefakt: `spiele/index.html`, Playtest-Protokoll, core.js-Fix.
Beleg: 8/8 Zeilen „Reveal erreicht"; `curl -sI …/spiele/game-wappen-ritter.html | grep -ic 'x-robots-tag: noindex'` = 1; Stufe 73 core.js 0 Alt-Host; Review Hub 0 MAJOR.
Stopp: Ein Spiel ohne Reveal → bleibt im Repo, erscheint nicht im Hub; der Text nennt dann die wahre Zahl.

### S36 — `/paket/` Produktseite und Pakete Ritter/Piraten
Phase: 3 · Wer: Claude · Dauer: 5 h · Hängt ab von: S28, S11 · KW: 46
Tun: Produktseite 500–800 Wörter neu: Inhalt des Pakets als Liste aus den Manifesten (Daten, nicht getippt — Stufe 34-Klasse), Fotos aus S28, „kostenlos im Pilot" ohne Preis und ohne „geplant" (E16), Entstehung aus der Partyseite (`/paket/<motto>/?id=&tok=`). `paket/ritter/`, `paket/piraten/` mit Testparty auf Staging rendern, PDF drucken, QR scannen. `paket/prinzessin/` (Piraten-Inhalt, WIP seit 12.08.) kommt nicht mit.
Artefakt: `paket/index.html`, zwei lauffähige Pakete, zwei Druck-PDFs in `_dev/druck-test/`.
Beleg: Stufen 15, 22, 23, 29, 35 grün; QR-Scan landet auf `party.<neu>/<id>`; Review 0 MAJOR.
Stopp: Stufe 23 rot (fremdes Motto gedruckt) → das Paket geht nicht live.

### S37 — `/kosten/` Rechner-Ratgeber
Phase: 3 · Wer: Claude · Dauer: 5 h · Hängt ab von: S27 · KW: 46
Tun: Der einzige Ratgeber im Launch-Set, weil er ein eigenes Datenwerkzeug hat: Rechner „Kosten je Kind" aus `shoppingList.priceEur` der Launch-Motto-JSON (Invariante L4), Eingaben Motto, Alter, Kinderzahl → Tabelle; 800–1.200 Wörter neu (Rohstoff `/kindergeburtstag-kosten`); FAQ neu; Werbekennzeichnung bei Affiliate-Links (Stufe 58).
Artefakt: `kosten/index.html`, `js/kosten.js`.
Beleg: Stufe 75 ≤ 3 %; Rechner-Ergebnis = Summe aus JSON in 3 Stichproben (Skript analog `check-kosten-prosa.py`); Review 0 MAJOR.
Stopp: Zahl im Fließtext ≠ Datenwahrheit (Stufe 44-Klasse) → Text korrigieren, nie die Daten.

### S38 — Trust: `/ueber-uns/`, `/impressum/`, `/datenschutz/`
Phase: 3 · Wer: Claude (Text), Bolle (Identität, AV-Verträge) · Dauer: 5 h · Hängt ab von: S28, S17, S18 · KW: 46
Tun: Über-uns mit echter Person (Marie-Therese Bollweg), Foto, Who/How/Why (Google: Urheberschaft, Entstehung, Zweck transparent, Einsatz von Automatisierung offenlegen — Helpful-Content-Doku), Kontakt `kontakt@<neu>`, keine Versprechen ohne Produkt, kein Hinweis auf andere Projekte. Impressum nach § 5 DDG: Name, Anschrift, E-Mail, Hinweis Kleinunternehmerin § 19 UStG — identische Identität ist Pflicht und erlaubt (E13). Datenschutz komplett neu: Netlify (Hosting, Logs), Cloudflare (DNS, Proxy, Worker, KV mit Fristen aus dem Code: Partydaten 14 Tage nach Partydatum, Magic-Link 90 Tage, DOI 7 Tage, Consent 3 Jahre, `extimg` 90 Tage), Resend (Versand, Audience, DOI), Umami (cookielos, Region aus S18), WhatsApp-Share (Nutzer teilt den Link selbst), Amazon/AWIN (Affiliate), keine Google Fonts (self-hosted; die alte Erklärung nennt Google Fonts, obwohl keine geladen werden), kein unpkg/cdnjs. AV-Verträge: Netlify, Cloudflare, Resend, Umami — von Bolle akzeptiert, Liste mit Datum in `_dev/RECHT.md`. Normen vor dem Schreiben primär geprüft (gesetze-im-internet.de, 01.10.2026): § 5 DDG, § 7 UWG, § 19 UStG.
Artefakt: drei Seiten, RECHT.md.
Beleg: Stufe 73: externe Hosts nur Pflichtnennungen; `grep -c 'Google Fonts' datenschutz/index.html` = 0; Review mit Rechtswinkel 0 MAJOR; RECHT.md listet 4 AV-Verträge mit Datum.
Stopp: Ein AV-Vertrag fehlt → Livegang erst mit Vertrag (Bolle-Klick), Dienst bleibt in der Erklärung genannt.

### S39 — Worker-Templates in neuer Marke: Partyseite, Mails, ICS
Phase: 3 · Wer: Claude · Dauer: 4 h · Hängt ab von: S13 · KW: 45
Tun: Sichtbare Texte in `guestPageFull()`, Editor, Mail-HTML (Edit-Link, Magic-Link, DOI, Erinnerung), ICS neu formulieren (noindex, kein Cluster-Risiko, aber Marke, Host, Footer); Footer-Links auf `/impressum/`, `/datenschutz/` von `<neu>`; Rückweg „Eigene Partyseite erstellen" → `/planen/?ref=`; Umami-Snippet mit neuer Website-ID an den 2 Worker-Stellen; `Referrer-Policy: no-referrer`. Deploy mit `npx -y wrangler deploy` (Token von Bolle, 1 Tag).
Artefakt: Worker-Version mit neuen Templates.
Beleg: Stufe 60 grün; Testparty im Staging-Flow → 4 Mails „delivered" im Resend-Log mit Absender `kontakt@<neu>`; `grep -c machsleicht party-worker.js` = 0; Zustellprobe an je ein Gmail-, Outlook- und GMX-Postfach landet im Posteingang (Risiko R16).
Stopp: Resend „domain not verified" → S17 unvollständig; Mail im Spam-Ordner → DMARC/SPF prüfen vor dem nächsten Schritt.

### S40 — Produkt-Screenshots und OG-Bilder per Playwright
Phase: 3 · Wer: Claude · Dauer: 2 h · Hängt ab von: S30–S36, S39 · KW: 47
Tun: `_dev/scripts/screenshots.mjs`: Playwright öffnet Staging-Zustände (Planer Stufe 1 und 3, Partyseite der Testparty, Spiel-Demo, Paket-Vorschau), schreibt PNG 1200×630 (OG) und 1200×800 (Inhalt), konvertiert zu WebP; nur echte Tool-Screenshots (Doku-Lehre: nur echte Screenshots sind deploy-würdig); `og:image` je Seite eine eigene Datei; `width`/`height` gesetzt.
Artefakt: `bilder/` mit ≥ 12 Dateien.
Beleg: Stufe 71 (Vorschaubild existiert) grün; Stufe 73 Hash-Schnittmenge 0; `curl -sI <og-url>` → 200 je Sitemap-URL.
Stopp: Screenshot zeigt Testnamen oder Platzhalter → Zustand neu aufnehmen.

### S41 — Review-Welle je Stück (Helfer V4.1, Stufen 2–4)
Phase: 3 · Wer: Claude bedient den Tab, Bolle liest Befunde · Dauer: 1 h je Stück, 11 Stücke · Hängt ab von: je Stück · KW: 44–47
Tun: Je Stück nach Linter 0 FAIL: frischer claude.ai-Tab (Chrome-MCP, Bolle-Device), target-blind; Prompt mit Ist-Analyse-Auszug, Quellseite (raw-SHA-URL alt), neuer Seite (raw-SHA-URL `<neu-repo>`, Commit `[skip netlify]`), Winkel-Katalog inkl. „Paraphrase Satz für Satz gegen die Quelle", „Zahl ohne Beleg", „Versprechen ohne Route", „Verbindung alt/neu", LEKTIONEN.md und OFFENE-REVIEW-PUNKTE.md; Reviewer liefert Zitat je Finding, MAJOR/MINOR/UNSICHER, Score nur Telemetrie. Stufe 3: jedes Finding gegen Primärquelle oder Repo prüfen, Fix deterministisch, Diff-Re-Check im selben Tab. Fallback-Modell nach L2.
Artefakt: `_dev/review/launch-set/<seite>-befunde.md`, SESSION-NOTES-Zeile, LEKTIONEN.md-Ergänzung je neuem Muster.
Beleg: 11/11 Stücke mit „0 offene MAJOR" und Re-Check-Zeile.
Stopp: Reviewer-Modell nicht verfügbar → L2-Fallback; nie WebFetch oder Subagent als Gutachter.

### S42 — Pre-Launch-Crawl auf Staging
Phase: 3 · Wer: Claude · Dauer: 3 h · Hängt ab von: S29–S40 · KW: 47
Tun: (1) `check-sitemap-live.py --sitemap <staging>/sitemap.xml --host-override staging--<neu-site>.netlify.app` (neue Option ersetzt den Host): Status, Redirects, Canonical = self, noindex-Konflikt, h1; (2) Screaming Frog (kostenlos bis 500 URLs) oder `_dev/scripts/crawl-staging.py`: allen internen Links folgen → 0 × 404, 0 Redirect-Ketten, Titles und Descriptions unique, Bilder mit alt, Inlinks ≥ 2 je Sitemap-URL, 0 verwaiste Seiten; (3) Rich Results Test je Sitemap-URL: 0 Fehler; Stufe 72 mit Zusatz „je @type höchstens ein Block" (alt: Startseite 4× WebApplication, fünf Seiten doppelte HowTo/FAQ); (4) PageSpeed Insights mobil je URL: Performance ≥ 90, LCP ≤ 2,5 s, CLS ≤ 0,1 (Laborwerte; CrUX-Schwellen aus der CWV-Bericht-Hilfe); (5) Playwright 360×800: kein horizontaler Scroll.
Artefakt: `_dev/messungen/2026-11-XX-prelaunch-crawl.md`.
Beleg: Tabelle 9 URLs × 8 Prüfspalten, alle grün.
Stopp: Eine rote Zelle → kein Go (S45 referenziert diese Datei).

### S43 — Prüfstand-Fälle für die Stufen 73–76; Entscheidung zum Prüfstand-Betrieb
Phase: 3 · Wer: Claude · Dauer: 2 h · Hängt ab von: S22–S25 · KW: 47
Tun: Der Prüfstand (`_dev/pruefstand/`, offline seit 11.09.) läuft vor dem Launch für die vier neuen Stufen (je eine Mutation, die rot werden muss) und für die bestehenden Fälle der Stufen 60 und 72. Der volle Prüfstand ist kein Launch-Gate; Inhalte gatet der frische Tab (S41). Nach dem Launch bekommt jede neue Stufe ihren Fall im selben Commit.
Artefakt: `_dev/pruefstand/faelle_stufe73-76.py`.
Beleg: `python _dev/pruefstand/pruefstand.py --stufen 60,72,73,74,75,76` → 6/6 Mutationen erkannt, 0 blinde Gates.
Stopp: Blindes Gate → Stufe reparieren vor Go; eine Stufe, die nichts findet, gilt als nicht vorhanden.

### S44 — Ende-zu-Ende-Skript und Cron-Test auf Staging
Phase: 3 · Wer: Claude · Dauer: 3 h · Hängt ab von: S31, S35, S36, S39 · KW: 47
Tun: `_dev/scripts/e2e-geburtstag.mjs` (Playwright): Staging `/planen/` → Ritter → 6–8 → Plan sichtbar → Einladung + Partyseite (POST `party.<neu>/api/create`, Staging-Origin steht in CORS seit S12) → Partyseite öffnen → Spiel starten → Reveal → Zusage „Ja" → Gästeliste zeigt 1 → `paket/ritter/?id&tok` rendert → Edit-Link-Mail „delivered" → `check-cron-erinnerung.mjs` gegen den neuen Worker (Erinnerung 7 Tage vorher) → Party löschen. Laufzeit je Schritt protokollieren; nur gemessene Zeit darf später als Zusage auf der Startseite stehen.
Artefakt: Skript, Protokoll mit 9 Zeitstempeln.
Beleg: Exit 0; Mail „delivered"; KV-Writes des Laufs ≤ 15 (QUOTEN.md).
Stopp: Ein Schritt scheitert → Fix → kompletter Neulauf (fix-induzierte Fehler sind die häufigste spätere MAJOR-Quelle).

## Phase 4 — Livegang (KW 48–49)

Eingang: Phase 3 abgeschlossen. Ausgang: siehe Übersicht. Launch-Praxis (Winkel 24): Google beschreibt für Umzüge ohne URL-Änderung den Test auf einem temporären Hostnamen, Log-Beobachtung und einen normalen Crawl-Rückgang danach → S15, S42, S44, S49. Google-Vertreter empfehlen für Staging Passwortschutz vor noindex (SEJ 07.04.2023, Sekundärquelle) → Abweichung: Netlifys Free-Plan-Schutz „Private" sperrt Reviewer-Tab und Playwright aus, deshalb noindex per Deploy-Kontext, Stufe 74 und Messung des Verschwindens (S46). Search Console und Analytics vor dem ersten Aufruf, Sitemap nach Verifikation (Semrush 17.08.2026, Sekundärquelle) → S16, S18, S50 nach 72 h. Redirects und Change of Address (G6, G7) → Abweichung per Entscheidung Bolle 01.10. Gestaffelter Ausbau (G21) → Phase 6 im 14-Tage-Takt.

### S45 — Go/No-Go-Checkliste mit 12 Kontrollzahlen
Phase: 4 · Wer: beide · Dauer: 1,5 h · Hängt ab von: S41–S44 · KW: 48 (Mo 23.11.2026)
Tun: `_dev/messungen/2026-11-23-go-nogo.md`, jede Zeile mit Kommando oder Pfad und Ist-Wert: (1) `bash validate-all.sh` → PASSED, 0 FAIL; (2) Stufe 75 je Sitemap-URL unter Grenze (Ausgabe angehängt); (3) 11/11 Review-Stücke 0 offene MAJOR; (4) Pre-Launch-Crawl 9×8 grün; (5) E2E Exit 0 am selben Tag; (6) Prüfstand 6/6; (7) `grep -rIl -i machsleicht . | wc -l` = 0; (8) `dig NS <neu>` Cloudflare, `dig CNAME www.<neu>`, Zertifikat enddate > 60 Tage; (9) `node _dev/scripts/generate-sitemap.js` = 9 URLs = Allowlist; (10) Staging liefert noindex (1), Repo-`_headers` ohne `/*`-noindex (Stufe 74); (11) Altkunden-Nachweis S20 9/9, höchstens 7 Tage alt; (12) `ROLLBACK.md` (S52) offen, Netlify-Lock-Knopf einmal gesehen, Cloudflare-Token (1 Tag) bereit. Bolle schreibt „GO: Datum Uhrzeit Bolle".
Artefakt: Go-Datei.
Beleg: 12/12 Zeilen grün mit Ist-Wert; GO-Zeile vorhanden.
Stopp: Eine rote Zeile = No-Go; nächster Versuch nach Fix und Diff-Re-Check; kein „Go mit Vorbehalt".

### S46 — Livegang: erster Produktions-Deploy, Verschwinden des noindex messen
Phase: 4 · Wer: Bolle (Klick), Claude (Prüfung) · Dauer: 1 h · Hängt ab von: S45 · KW: 48 (Di 24.11.2026, 09:00)
Tun: Im `<neu-repo>`: `git checkout main && git merge --ff-only staging && git push` (erster Push auf `main` = erster Produktions-Deploy; kein `[skip netlify]`). Netlify → Deploys → Produktions-Deploy „Published" → sofort „Lock to stop auto publishing" (bis S50). Claude: `for u in $(node -e "console.log(require('./_dev/config/sitemap-allowlist.json').join(' '))"); do curl -sI "https://<neu>$u" | grep -iE '^(HTTP|x-robots-tag)'; done` → 9 × 200, 0 × X-Robots-Tag; `curl -s https://<neu>/robots.txt | grep -c "Sitemap: https://<neu>/sitemap.xml"` = 1; `curl -s https://<neu>/sitemap.xml | grep -c '<loc>'` = 9; `curl -sI https://<neu>/planen/ritter/6-8/ | grep -ic x-robots-tag` = 1 (App-Shells bleiben noindex); GSC URL-Prüfung für `/` als Live-Test ohne Indexierungsantrag → „URL ist für Google verfügbar" (Prüfung zählt nicht gegen das Anfragelimit).
Artefakt: Produktion live; INDEX-LOG-Zeile „Livegang 24.11.2026, Deploy-SHA".
Beleg: Die vier Zahlen 9/0/9/1 in der Go-Datei nachgetragen; GSC-Live-Test grün.
Stopp: X-Robots-Tag auf einer Sitemap-URL oder ein Nicht-200 → sofort S52, kein „morgen".

### S47 — Ende-zu-Ende mit einem echten Elternteil
Phase: 4 · Wer: Bolle organisiert, Testperson führt aus · Dauer: 2 h · Hängt ab von: S46 · KW: 48 (Tag 1–2)
Tun: Ein Elternteil außerhalb des Projekts erhält nur `<neu>` und den Auftrag: „Plane einen Ritter-Geburtstag für ein 7-jähriges Kind bis zur Einladung, lade dich selbst ein, sag zu, spiel das Spiel, öffne das Paket." Bolle protokolliert ohne einzugreifen: Zeit je Schritt, Fragen, Abbrüche. Erinnerungsmail (7 Tage) wird nicht abgewartet; Beleg dafür ist der Cron-Test S44. Danach Party per Edit-Link löschen.
Artefakt: `_dev/messungen/2026-11-XX-e2e-elternteil.md`.
Beleg: 7/7 Schritte ohne Hilfe; Gesamtzeit gemessen — liegt sie über einer Zeitzusage auf der Site, wird die Zusage geändert, nicht die Messung; 0 Sackgassen (jede Lücke hat sichtbaren Text, Winkel 21).
Stopp: Ein Schritt ohne Hilfe nicht erreichbar → Fix, Diff-Re-Check, zweite Testperson vor S50.

### S48 — Altkunden-Nachweis nach dem Livegang wiederholen
Phase: 4 · Wer: Claude · Dauer: 0,5 h · Hängt ab von: S46 · KW: 48
Tun: Tabelle aus S20 erneut auf dem Alt-Stack mit neuer Testparty auf machsleicht.de (die S20-Party ist gelöscht); dieselben 9 Linktypen; danach löschen.
Artefakt: zweiter Zeitstempel in der Nachweis-Datei.
Beleg: 9/9 HTTP 200 oder „delivered".
Stopp: Ein Alt-Linktyp bricht → geteilte Komponenten prüfen (Konto-Quoten, Resend-Konto) → vor S50 beheben.

### S49 — Soft Launch: 72 Stunden ohne Bewerbung beobachten
Phase: 4 · Wer: Claude · Dauer: 2 h (3 × 20 min je Tag) · Hängt ab von: S46 · KW: 48 (Di–Fr)
Tun: Täglich 09:00, 14:00, 20:00: (a) curl-Schleife über 9 URLs → 200; (b) `npx -y wrangler tail party-<neu-kurz> --status error` 5 Minuten → 0 Einträge; (c) Netlify: Produktions-Deploy unverändert (Lock aktiv); (d) Umami Realtime: nur Testpersonen; (e) GSC → Einstellungen → Crawling-Statistiken: Lesung am Tag 4, Hoststatus „keine Probleme" (Google: direkt nach einem Umzug ist ein vorübergehender Rückgang der Crawl-Rate normal — Site-Move-ohne-URL-Änderung-Doku; hier erwartet: erste Anfragen nach der Sitemap-Einreichung). In diesen 72 h keine Links, keine Posts, keine Sitemap-Einreichung.
Artefakt: 9 Protokollzeilen in INDEX-LOG „Soft Launch".
Beleg: 9/9 Checks „0 Fehler"; `wrangler tail`-Auszug ohne `error`.
Stopp: 5xx oder Worker-Fehler → S52; Zähler beginnt nach dem Fix neu.

### S50 — Tag 4: Sitemap einreichen, URL-Prüfung genau einmal, Bing, IndexNow
Phase: 4 · Wer: Bolle · Dauer: 1 h · Hängt ab von: S49 · KW: 48 (Fr 27.11.2026)
Tun: (1) GSC → Sitemaps → `https://<neu>/sitemap.xml` → Senden → Status „Erfolgreich", „Gefundene URLs: 9" (Sitemaps-Bericht-Hilfe; Google liest die Sitemap danach in eigenem Takt neu). (2) GSC → URL-Prüfung je Sitemap-URL → „Indexierung beantragen": 9 URLs in einer Sitzung, jede genau einmal, nie wieder. Google nennt ein Tageslimit ohne Zahl (G9); eigene Messung 28.05.2026: 11 Anfragen, dann erschöpft (`_dev/GSC-INDEX-PLAN.md`); ANNAHME: 9 passen in einen Tag, sonst Rest am Folgetag. (3) Bing Webmaster Tools → Sitemaps: `<neu>/sitemap.xml` sichtbar (Import) oder manuell senden. (4) IndexNow: Crawler Hints läuft bei Proxy an (S16); bei DNS-only stattdessen `node _dev/scripts/indexnow-submit.mjs` mit Key-Datei `/<key>.txt` (8–128 Zeichen) und POST an `api.indexnow.org` mit 9 URLs — Google ist kein Teilnehmer (IndexNow-FAQ). (5) Netlify „Unlock to start auto publishing"; nächster Inhalts-Deploy frühestens 14 Tage später.
Artefakt: INDEX-LOG-Zeile „T0 = 27.11.2026: Sitemap eingereicht, 9 Anfragen, Bing, IndexNow".
Beleg: GSC Sitemaps „Erfolgreich / 9"; 9 Zeilen „Indexierung beantragt" mit Uhrzeit; BWT zeigt die Sitemap; IndexNow-Antwort 200 oder 202.
Stopp: „Konnte nicht abgerufen werden" → robots.txt und Header prüfen (kein Disallow, kein 404), erneut senden; kein zweiter Antrag für dieselbe URL.

### S51 — Erste echte Verlinkungen und Erwähnungen
Phase: 4 · Wer: Bolle · Dauer: 3 h · Hängt ab von: S50 · KW: 49
Tun: (1) Pinterest-Business-Konto, Website `<neu>` beanspruchen (HTML-Tag oder DNS-TXT, bis 72 h; eine Website wird von genau einem Konto beansprucht — Pinterest-Hilfe), 10 Pins mit eigenen Screenshots auf `/planen/ritter/`, `/planen/piraten/`, `/spiele/`, `/paket/` (Referral und Marke; Pin-Links sind keine crawlbaren Links — Ist-Analyse 1.7). (2) Eigene Profile (LinkedIn, Instagram-Bio) mit Link. (3) Verzeichnisse mit echtem Eintrag: gruenderkueche.de, startbase.com, rakkers.org; stuttgart-startups.de nur bei regionalem Bezug. (4) Eine redaktionelle Anfrage an Lokalpresse mit Gründer-Aufhänger — keine Pressemitteilung mit gezielt gesetztem Ankertext (Google Link-Spam, M10). (5) Eltern-Communities nur mit echtem Beitrag; urbia nicht (Netiquette M12); gutefrage und Reddit sind nofollow/ugc. Linktext ist der Markenname. Keine Ads als Index-Hebel (AdsBot ist nicht Googlebot).
Artefakt: `_dev/messungen/VERLINKUNG.md`: Quelle | Datum | URL | Art | Status.
Beleg: ≥ 6 Einträge „live" bis Ende KW 49; Kontrolle in S54: GSC Links → verweisende Websites ≥ 3 (ANNAHME zur Zeit, Google nennt keine Frist für die Link-Erfassung).
Stopp: Ein Verzeichnis verlangt Gegenlink oder Bezahlung → nicht eintragen (Link-Spam-Klasse).

### S52 — Rollback-Plan (steht vor dem Livegang, gilt 14 Tage danach)
Phase: 4 · Wer: Claude dokumentiert, Bolle entscheidet · Dauer: 0,5 h · Hängt ab von: S13, S14 (Komponenten existieren) · KW: 47
Tun: `_dev/ROLLBACK.md` mit dieser Tabelle; Bolle entscheidet binnen 60 Minuten nach Befund; Claude darf bei 5xx auf allen 9 URLs ohne Rückfrage locken.

| Komponente | Symptom | Kommando oder Pfad | Dauer |
|---|---|---|---|
| Netlify-Produktion | kaputte Seite, noindex auf Sitemap-URL, 5xx | Deploys → „Lock to stop auto publishing"; vorherigen erfolgreichen Deploy → „Publish deploy" (sofort wirksam — Netlify-Doku; Vorgänger werden im Free-Plan nach 30 Tagen gelöscht, der letzte erfolgreiche bleibt). Beim ersten Livegang gibt es keinen Vorgänger: Project visibility → „Private" sperrt die Site für alle außer dem Team Owner | 5 min |
| Worker | API-Fehler, falsche Mails | `npx -y wrangler rollback` (interaktiv, letzte 100 Versionen; nicht möglich, wenn eine KV-Bindung entfernt wurde — Rollbacks-Doku) oder Dashboard → Workers & Pages → Worker → Deployments → ⋮ → Rollback | 5 min |
| DNS/Proxy | Zertifikat oder Proxy-Problem | Cloudflare DNS: Proxy orange → grau; kein Rückweg zur alten Site, weil es keine Verbindung gibt | 5 min + TTL |
| GSC | fehlerhafte Sitemap | Sitemaps → entfernen (Google vergisst die URLs dadurch nicht) | 5 min |
| Daten | Testpartys im KV | Edit-Link löschen; TTL räumt den Rest | — |

Nie zurückgerollt: machsleicht.de (unberührt), Domain-Registrierung, Properties.
Artefakt: ROLLBACK.md.
Beleg: Datei existiert vor S45; Screenshot des Lock-Knopfs in der Datei.
Stopp: —

## Phase 5 — Messen und Entscheiden (KW 49/2026 – KW 8/2027)

Eingang: Sitemap eingereicht (T0 = 27.11.2026). Ausgang: Gate 1 entschieden (11.01.2027), Abbruchlesung (22.02.2027).

### S53 — Wöchentliche Messung, Montag 09:00 Berlin
Phase: 5 · Wer: Bolle 20 min (ablesen), Claude 20 min (eintragen, Regeln anwenden) · Dauer: 0,7 h je Woche · Hängt ab von: S50 · KW: ab 49 (30.11.2026)
Tun: Bolle liest in GSC `<neu>`: Indexierung → Seiten (indexiert; je Grund: „Gecrawlt – zurzeit nicht indexiert", „Gefunden – zurzeit nicht indexiert", „Duplikat – Google hat ein anderes Canonical gewählt", noindex); Leistung 7 Tage (Impressionen, Klicks); Einstellungen → Crawling-Statistiken (Gesamtanfragen, Hoststatus — der Bericht existiert für Domain-Properties); Sitemaps (gefundene URLs); Links (verweisende Websites); BWT indexierte Seiten; Umami Besucher und Event „Partyseite erstellt"; Cloudflare KV-Writes je Tag; Resend Mails je Tag. Je Sitemap-URL einmal im Monat URL-Prüfung (nur Prüfung, kein Antrag) → Statusspalte. Claude trägt die Zeile ein und schreibt darunter „Regel: weiter / Gate / Fallback" nach E.
Artefakt: eine Zeile je Montag in INDEX-LOG.
Beleg: Zeilendatum ist ein Montag; 0 leere Zellen; wiederkehrender Kalendertermin bei Bolle (Lehre: Juni bis 08.09. nicht in der GSC).
Stopp: Zwei Montage ohne Zeile → PushNotification an Bolle; die Messung ist Pflicht, nicht Vorsatz.

### S54 — Gate 1: T+6 Wochen (Lesung Mo 11.01.2027, KW 2/2027)
Phase: 5 · Wer: beide · Dauer: 1 h · Hängt ab von: S53 · KW: 2/2027
Tun: Aus INDEX-LOG: Zahl der Sitemap-URLs „indexiert" (Seiten-Bericht plus URL-Prüfung je URL). Regeln: ≥ 6 von 9 → Phase 6 startet KW 3/2027 (H1 gestützt, nicht bewiesen). 3–5 von 9 → warten, zweite Lesung Mo 01.02.2027 (KW 5): ≥ 6 → Phase 6, sonst S56. ≤ 2 von 9 oder ≥ 5 von 9 „Gecrawlt – zurzeit nicht indexiert" → sofort S56 (H2 wahrscheinlicher). Kein Resubmit, kein zweiter Indexierungsantrag, keine Validierung (Google: bei „Gecrawlt – zurzeit nicht indexiert" ist kein erneutes Einreichen nötig — G8; drei gescheiterte Validierungen auf der alten Domain).
Artefakt: Gate-Zeile in INDEX-LOG.
Beleg: Zahl und angewandte Regel in einer Zeile; Bolles Wort „Phase 6 frei" oder „Fallback".
Stopp: GSC-Daten verzögert → Lesung einmal um 7 Tage schieben.

### S55 — Abbruchlesung: T+12 Wochen (Mo 22.02.2027, KW 8/2027)
Phase: 5 · Wer: beide · Dauer: 0,5 h · Hängt ab von: S53 · KW: 8/2027
Tun: Regel E17: ≥ 50 % der Sitemap-URLs „Gecrawlt – zurzeit nicht indexiert" (bei 9 URLs: ≥ 5; in Phase 6 entsprechend mehr) → Stopp des Ausbaus, S56 wird Hauptpfad. Darunter: weiter nach S57.
Artefakt: Zeile mit Prozentwert und Entscheidung.
Beleg: Zeile vorhanden; bei Stopp keine Deploy-Zeile in INDEX-LOG danach außer Fixes aus S56.
Stopp: —

### S56 — Fallback, wenn die Schwelle nicht erreicht wird (nicht „mehr Content")
Phase: 5 · Wer: beide · Dauer: Entscheidung 1 h, Umsetzung 12 Wochen · Hängt ab von: S54 oder S55 · KW: nach Lesung
Tun: (1) Kein Deploy neuer Seiten; bestehende URLs bleiben (keine Massenänderung, kein noindex-Schwenk — der Fehler der alten Domain wird nicht wiederholt). (2) 10 Nutzertests mit Eltern nach S47-Protokoll → Produktfehler fixen (Werkzeug, nicht Text). (3) 12 Wochen echte Erwähnungen aus den S51-Kanälen plus Kita- und Schulumfeld persönlich; Ziel ≥ 5 verweisende Domains im GSC-Links-Bericht. (4) Je Seite die G23-Selbstprüfung dokumentieren (Zweck, Who/How/Why, „für Suchmaschinen gemacht?") und nur Befunde mit Beleg ändern. (5) Lesung nach dem nächsten Core Update (Status-Dashboard G27; Google: Wirkung Tage bis Monate, sonst bis zum nächsten Core Update — G21). (6) Danach Bolle-Entscheidung: Motto-Takt wieder aufnehmen / Produkt ohne Google-Ziel (Bing zeigt heute rund 50 alte URLs; WhatsApp-Viralität über `?ref=`; Pinterest) / Projektstopp. H2 gilt dann als wahrscheinlicher — mit der Konsequenz, dass die Qualität der Werkzeugseiten in Frage steht, nicht die Menge.
Artefakt: `_dev/review/<datum>-fallback.md` mit 6 Punkten, Datum, Verantwortlichen.
Beleg: Keine Deploy-Zeile in INDEX-LOG während der 12 Wochen außer Fixes aus (2); Links-Zahl zu Beginn und Ende.
Stopp: Versuchung „noch eine Seite" → Deploy-Takt aus den Lesehinweisen; Bolle entscheidet, nicht die Pipeline.

## Phase 6 — Motto-für-Motto-Ausbau (ab KW 3/2027, nur bei Gate grün)

Eingang: S54 „Phase 6 frei". Ausgang je Zyklus: ein Motto komplett, +1 Sitemap-URL, Stufe 76 grün. Sitemap 9 → 22 URLs nach 13 Zyklen (26 Wochen), je Deploy +1 URL — unter der Massenänderungs-Grenze.

### S57 — Motto-Zyklus (Vorlage, 14 Tage je Motto)
Phase: 6 · Wer: Claude 20–24 h, Bolle 3 h je Zyklus · Dauer: Teilschritte je ≤ 1 Tag · Hängt ab von: S54 · KW: ab 3/2027
Tun: Reihenfolge nach E8. Je Motto: (1) `/planen/<motto>/` nach S32-Verfahren (Stufe 75 gegen alte Motto- und drei Altersseiten, Eigenanteil ≥ 90 % gegen alle bisherigen Mottoseiten, 0 identische FAQ-Fragen); (2) 4 Spiele Playtest nach S35; (3) Paket aus `paket/<motto>/` (Stufen 15–35) oder Bau mit `paket-bauen.py`; (4) Trailer nur bei E14 „Phase 6": Build aus `_dev/prototypes/raketen-trailer/` (10 Mottos liegen vor, Stand draft e2f1d63a), Wasserzeichen neue Marke, MP4 im digitalen Paket; (5) Fotos (Bolle, S28-Verfahren); (6) 9 Zustands-Shells noindex (S31-Vorlage); (7) Review-Welle (S41); (8) ein Deploy: Allowlist +1, Motto-Wähler auf der Startseite +1, SITEMAP-CHANGELOG-Zeile; (9) Live-Verify: neue URL 200, Sitemap +1, Shells noindex; (10) S53 läuft weiter; (11) URL-Prüfung + Indexierungsantrag für genau die eine neue URL.
Artefakt: je Motto 1 Sitemap-URL, Befund-Tabelle, SESSION-NOTES-Zeile.
Beleg: Zyklusdauer ≤ 14 Tage im Log; Stufe 76 grün; ≤ 4 Gate-Einträge je Zyklus (Kapazität 4–5 je Woche, zwei Wochen = 8–10, Rest ist Puffer für Messung und Betrieb).
Stopp: Ein Zyklus > 21 Tage → nächster Zyklus startet nicht, Ursache in LEKTIONEN.md; Massenänderung nie, auch nicht zum Aufholen.

### S58 — Ratgeber nur mit Werkzeug-Element (Regel, kein Volumen)
Phase: 6 · Wer: Claude · Dauer: nach Bedarf, ≤ 1 Ratgeber je 2 Zyklen · Hängt ab von: S57 · KW: ab 5/2027
Tun: Eine Ratgeber-URL entsteht nur mit eigenem Datenwerkzeug wie `/kosten/`: Kandidaten mit Element sind Zeitplan-Generator (`gen-ablauf.mjs`-Daten) → `/zeitplan/` und Mengenrechner (`mengen-ableiten.py`) → `/essen/`. Die 18 alten Ratgeber sind Faktenrohstoff, nie Vorlage.
Artefakt: IA.md-Zeile mit Werkzeug-Element, Seite, Allowlist +1.
Beleg: Stufe 75 gegen den alten Ratgeber ≤ 3 %; Rechner-Ergebnis = Daten in 3 Stichproben.
Stopp: Ratgeber-Idee ohne Element → Backlog, nicht Sitemap.

### S59 — Trailer und Schatzsuche einbinden (nach E14, E10)
Phase: 6 · Wer: Claude · Dauer: 1 Zyklus · Hängt ab von: S57 (Zyklus 1) · KW: ab 5/2027
Tun: Trailer ins digitale Paket (`paket/<motto>/`): Render im Browser, kein Upload, Wasserzeichen neue Marke; die Startseite nennt den Trailer erst, wenn er für alle live geschalteten Mottos läuft (E5). Schatzsuche nur „aus dem Plan" (bindend: alles aus Plan + Partyseite): als Planer-Zustand, nicht als eigene Textseite; die alte Schatzkarten-Engine ist Code-Rohstoff.
Artefakt: Trailer je Motto im Paket; Playtest-Protokoll Render.
Beleg: Render < 60 s auf einem Mittelklasse-Android (Playtest-Protokoll); Stufe 73 Wasserzeichen-String = neue Marke.
Stopp: Render bricht auf Mobil → Trailer bleibt als „am Rechner erzeugen" im Paket, der Text sagt es.

### S60 — Deploy-Protokoll und Sitemap-Disziplin in Phase 6
Phase: 6 · Wer: Claude · Dauer: 0,5 h je Deploy · Hängt ab von: S57 · KW: je Zyklus
Tun: Vor dem Deploy: Linter (Stufen 73–76), `compare-rendered.mjs` für geänderte indexierbare Zustände, Diff generierte Sitemap gegen Live-Sitemap (nur erlaubte Deltas). Nach dem Deploy: Live-Verify mit curl auf neue und entfernte Strings, SITEMAP-CHANGELOG-Zeile, INDEX-LOG-Notiz. Kein lastmod-Bump ohne Inhaltsänderung (G11, G12).
Artefakt: eine CHANGELOG-Zeile je Deploy mit SHA und Live-Verify.
Beleg: Stufe 76 grün; Live-Sitemap = generierte Sitemap nach Deploy.
Stopp: Live-Sitemap weicht ab → Cloudflare-Cache für `/sitemap.xml` purgen, erneut messen; bleibt die Abweichung → S52.

## Phase 7 — Betrieb und Beobachtung von machsleicht.de (laufend ab KW 41)

Eingang: —. Ausgang: Zeile je Monat, Spalte „Eingriffe" = 0. Die alte Domain bleibt unverändert: gleiche Inhalte, gleiche Sitemap (136), gleicher Worker, keine Rückbauten, keine noindex-Welle, keine Validierungen, keine Indexierungsanträge.

### S61 — Monatliche Alt-Domain-Lesung (erster Montag im Monat, 09:20)
Phase: 7 · Wer: Bolle 15 min, Claude 15 min · Dauer: 0,5 h je Monat · Hängt ab von: S3 · KW: ab 45 (02.11.2026)
Tun: GSC `machsleicht.de`: indexierte Seiten, Impressionen 28 Tage, Grund-Buckets; Umami alt: Besucher, Partyseiten; KV-Zählung mit dem S4-Kommando (Token 1 Tag) für `party:`, `wl:`, `plan:`; Kosten (Domain, Verbrauch Resend/Worker aus QUOTEN.md); Zertifikats-Ablaufdatum beider Domains (`openssl`-Zeile aus S14). Nichts ändern.
Artefakt: Zeile in INDEX-LOG, Abschnitt „Alt-Domain".
Beleg: 12 Zeilen je Jahr; Spalte „Eingriffe" = 0.
Stopp: Vorschlag für einen Eingriff auf machsleicht.de → Randbedingung zitieren; nur Bolle hebt sie schriftlich auf.

### S62 — Erholung erkennen (Kriterium, keine Maßnahme)
Phase: 7 · Wer: Claude (Regel), Bolle (Lesung) · Dauer: 0 h zusätzlich · Hängt ab von: S61 · KW: laufend
Tun: Erholung = indexierte Seiten ≥ 30 (heute 1) in zwei aufeinanderfolgenden Monatslesungen und Impressionen ≥ 10 je Tag im 28-Tage-Mittel (April-Hoch: 27–32 je Tag bei 308 indexiert). Dann Frage an Bolle ohne Empfehlung im Plan: beide Domains parallel weiterführen (zwei Produkte, zwei Supports, geteilte Quoten) oder die alte in den Nur-Bestand-Betrieb (E3 neu entscheiden). Zusammenführen per 301 oder Canonical ist durch die Randbedingung ausgeschlossen.
Artefakt: Kriterium im INDEX-LOG-Kopf; Erfüllung als markierte Zeile.
Beleg: Zeile „Erholung erfüllt: Datum, Werte" oder nicht vorhanden.
Stopp: —

### S63 — Abschaltfrage (nur als Frage, mit vier Bedingungen)
Phase: 7 · Wer: Bolle · Dauer: 0 h bis Erfüllung · Hängt ab von: S61 · KW: laufend
Tun: Die Frage „machsleicht.de abschalten?" wird erst gestellt, wenn gemessen gilt: KV `party:` = 0 und `plan:` = 0; `wl:` abgelaufen (365 Tage nach letztem Eintrag) oder die Wartelisten-Kontakte unter alter Marke beantwortet (E12); 6 Monate 0 Klicks in GSC; 6 Monate keine Partyseiten-Erstellung in Umami. Bis dahin: Domain verlängern (Größenordnung M4), Worker und Netlify laufen im Free-Plan weiter.
Artefakt: vier Spalten in der Alt-Domain-Zeile.
Beleg: 4/4 Bedingungen „erfüllt" mit Datum, sonst keine Frage.
Stopp: Eine Bedingung offen → Frage wird nicht gestellt.

## C. Entscheidungsliste für Bolle (geschlossene Fragen; Empfehlung mit ★)

**E1 — Domainname: Kriterien und Prüfweg.** Kriterien: Kindergeburtstag erkennbar; kein Bestandteil „machsleicht" oder „leicht"; `.de`; ≤ 15 Zeichen; am Telefon ohne Buchstabieren; keine Ziffern; DENIC-Regeln (1–63 Zeichen, kein Bindestrich an Stelle 3–4, am Anfang oder Ende); frei bei DENIC, DPMA Klasse 41/35, TMview, Google-Exaktsuche, Pinterest- und Instagram-Handle (S7). (a) beschreibendes Wort mit Geburtstags-Bezug — eng am Markt, mehr Registerkollisionen; Keywords im Domainnamen haben laut Google kaum Wirkung (SEO Starter Guide). (b) ★ Kunstwort — freiere Register, Marke muss auf der Startseite erklärt werden. (c) wie (b) plus DPMA-Anmeldung Klasse 41/35 — nicht Teil dieses Plans.

**E2 — Marke.** (a) „mach's leicht" weiterführen — identische Marke, og:site_name und Organization auf beiden Domains (ANNAHME-Verbindung), Brand-Suche zeigt die alte Domain. (b) ★ neue Marke = Domainname — sauberste Trennung; zu verlieren ist nichts Messbares (9 Klicks, 0 Backlinks). (c) Marke plus Zusatz — halbe Trennung, beide Nachteile.

**E3 — Alte Domain im Betrieb.** (a) ★ Status quo, der Planer legt weiter Partys an — zwei lebende Produkte, doppelter Support, geteilte Quoten (S19); erfüllt „unverändert". (b) nur Bestand — braucht einen Deploy auf machsleicht.de und verletzt die Randbedingung; erst nach S62 neu bewerten.

**E4 — Repo.** (a) ★ neues öffentliches Repo ohne Historie — raw-URLs für den Branch-Trick, keine Token-Historie; alte Schlüssel werden trotzdem widerrufen (S5). (b) Fork — Token-Historie zieht mit. (c) Branch im Alt-Repo — Deploy-Verwechslung, eine Netlify-Site je Repo.

**E5 — Worker und KV.** (a) ★ neuer Worker mit eigenem KV unter `party.<neu>` — saubere Links in Cron-Mail und `/api/create` (Alt-Zeilen 416, 545 bauen `party.machsleicht.de` hart), eigene Löschpfade; Kosten: zweiter Cron (5 frei), geteilte Konto-Quoten. (b) zweite Custom Domain am alten Worker mit geteiltem KV — Links neuer Nutzer zeigen auf die alte Domain (Verbindung, Markenbruch), Kinderdaten zweier Domains in einem Namespace.

**E6 — Spiele indexierbar?** (a) ★ noindex wie heute plus indexierbarer Hub `/spiele/` mit Demos — Werkzeug ist Hauptinhalt (G24) ohne 60 URLs; Spiel-URLs tragen Vornamen und Foto-Parameter. (b) 60 Spiele indexierbar — 60 Seiten mit eigenem Text nötig, sonst Volumen (G16).

**E7 — Werkzeug-Zustände als URLs.** (a) ★ ja: Motto-Ebene indexierbar, tiefere Ebenen noindex mit Canonical auf die Motto-Ebene — G26-konform, keine Matrix. (b) nein, nur `/planen/` — das Werkzeug ist für Google eine Seite. (c) alle Ebenen indexierbar — 15 × 3 × 3 = 135 URLs aus JSON = Matrix (verboten).

**E8 — Launch-Mottos und Reihenfolge.** (a) ★ Ritter und Piraten — beide mit Paket, 4 Spielen, Trailer-Prototyp; Piraten ist das Pilotmotto mit den reifsten Daten. (b) nur Ritter — ein Wähler mit einem Eintrag wirkt wie eine Demo. (c) drei Mottos mit Dino — Livegang KW 49. Danach: Dino, Feuerwehr, Baustelle, Meerjungfrau (Paket vorhanden), dann Weltraum, Einhorn, Pferde, Detektiv, Dschungel, Safari, Feen, Superheld, zuletzt Prinzessin (Paket WIP).

**E9 — `/einladung/erstellen` und `/e/`.** (a) ★ nicht übernehmen — ein Backend weniger; „Plan vor Einladung für alle Einstiege" ohne Ausnahme; `/e/`-Links sind stateless und laufen auf der alten Domain unbegrenzt weiter. (b) übernehmen — Netlify Functions mitziehen, zweiter Einladungsweg ohne Plan.

**E10 — 14 Schatzsuche-Themenseiten und Builder.** (a) ★ nicht übernehmen; Schatzjagd lebt in den 15 Spielen und auf den Mottoseiten. (b) Builder als Planer-Zustand in Phase 6 (S59) — nur „aus dem Plan". (c) Themenseiten neu schreiben — 14 URLs ohne eigenes Werkzeug = Volumen.

**E11 — Umami.** (a) ★ neue Website im bestehenden Konto, wenn der Hobby-Plan es zulässt (S18 prüft am Knopf) — getrennte Zählung, 100.000 Events je Monat für beide Sites. (b) Umami Pro — Preis laut Preisseite (heute nicht lesbar). (c) Cloudflare Web Analytics — kostenlos, cookielos, keine Custom Events, also kein „Partyseite erstellt". Region: EU wählen, wenn angeboten (Umami: Server in US und EU), sonst in der Datenschutzerklärung nennen.

**E12 — Newsletter, DOI, Warteliste.** (a) ★ neue Audience und neuer DOI auf `<neu>`; `wl:`-Kontakte (365 Tage) werden von `<neu>` nicht angeschrieben — die Einwilligung galt für machsleicht.de; elektronische Post ohne vorherige ausdrückliche Einwilligung ist unzumutbare Belästigung (§ 7 Abs. 2 Nr. 2 UWG). (b) Audience übernehmen — UWG-Risiko und Verbindung über Mail-Inhalte. (c) `wl:`-Kontakte einmal von machsleicht.de über das dortige Pilot-Paket informieren, ohne Link auf `<neu>` — nur, wenn der alte DOI-Text das deckt.

**E13 — Impressum-Identität.** (a) ★ Marie-Therese Bollweg, Kleinunternehmerin nach § 19 UStG, identisch — Pflicht nach § 5 DDG, kein belegtes Google-Signal; kein Hinweis „weitere Projekte". (b) andere Identität — nur mit eigener Rechtsgrundlage; nicht empfohlen.

**E14 — Trailer im Launch-Set.** (a) ★ nein, Phase 6 (S59) — der Prototyp im draft-Branch ist nie gegatet; Startseite nennt ihn nicht (E5). (b) ja — zwei gegatete Stücke mehr, Livegang eine Woche später.

**E15 — „Geburtstags-OS" öffentlich?** (a) ★ interne Leitidee; öffentlich die Worte der Suchintentionen und Bolles dokumentierte Formulierungen — Suchnachfrage nach dem Begriff ist null (Ist-Analyse 1.7). (b) öffentlicher Claim — erklärt sich auf der Startseite nicht selbst.

**E16 — Preis und Kasse.** Nur Status quo festhalten (einzige Option, die E5 und die Entscheidung vom 08.09. erfüllt): Paket kostenlos als „Pilot", keine „geplant"-Preise, kein Lemon-Squeezy-Script und kein Webhook; Kleinunternehmer-Status bleibt bis zu einer Kasse Notiz.

**E17 — Abbruchkriterium.** (a) ★ N = 12 Wochen nach Sitemap-Einreichung, X = 50 % der Sitemap-URLs „Gecrawlt – zurzeit nicht indexiert" → Stopp; Zwischen-Gate nach 6 Wochen mit ≥ 6 von 9 indexiert — früh und billig. (b) N = 8 — knapp gegen „a few weeks". (c) N = 16 — ein Zyklus mehr Unsicherheit. Alle drei ANNAHME (G9, G21).

**E18 — Cloudflare-Proxy für `<neu>`.** (a) ★ Proxy an nach Zertifikatsausstellung, wie bei machsleicht.de — HTML-Cache, Crawler Hints (IndexNow), Analytics; ANNAHME: Erneuerung funktioniert mit Proxy, weil die alte Site so läuft; S61 misst das Ablaufdatum monatlich. (b) DNS only — Netlify erneuert ohne Umweg, kein Crawler Hints (IndexNow per Skript, S50), kein Cloudflare-Cache.

## D. Launch-Set-Tabelle (Phase 3)

| URL | Typ | Quelle | Pflicht-Bausteine | Zielwortzahl | Überlappungs-Grenze gegen alt | Abnahme-Gate |
|---|---|---|---|---|---|---|
| `/` | Werkzeug-Einstieg (System) | ganz neu; alte `index.html` nur Negativliste | Schritte mit echten Screenshots, Motto-Wähler (2), Organization + WebSite JSON-LD, Inlinks zu allen 8 Seiten, kein unpkg | 500–800 | ≤ 3 % Seite, 0 Sätze | Linter 0 FAIL, Stufe 75, Review 0 MAJOR, PSI mobil ≥ 90 |
| `/planen/` | Werkzeug (Flaggschiff) | neu aus Planer-Text (3.195 W) | Stufe 1 live, Zustands-URLs (S31), eigene Bilder, WebPage JSON-LD, Inlinks von `/` und Mottoseiten | 900–1.400 | ≤ 3 % Seite, ≤ 5 % Abschnitt; DOM-Diff Start ≤ 5 % | + `compare-rendered.mjs` |
| `/planen/ritter/` | Mottoseite = Werkzeug-Zustand | neu aus `/kindergeburtstag/ritter` (1.419 W), drei Altersseiten, `ritter-*.json` | Werkzeug-Zustand, 4 Spiele-Demos, Paket-Fotos, FAQ neu, Inlinks `/`, `/spiele/`, `/paket/` | 1.200–1.800 | ≤ 3 % / ≤ 5 %; 0 Sätze; FAQ 0; neue h2 ≥ 50 %; Eigenanteil ≥ 90 % gegen Piraten | Linter, Stufe 75, Review |
| `/planen/piraten/` | Mottoseite | wie Ritter mit `piraten-*` | wie Ritter | 1.200–1.800 | wie Ritter | wie Ritter |
| `/einladung/` | Werkzeug-Erklärseite | neu aus `/einladung/whatsapp/`, `/einladung/text/`; Hubs sind Negativbeispiel | echte Screenshots, Funktionssätze ↔ 7 Routen, Button → `/planen/` | 700–1.000 | ≤ 3 %, 0 Sätze | Linter, Stufe 75, Route-Tabelle, Review |
| `/spiele/` | Werkzeug-Hub | neu; 8 Spiele als Demo | iframe-Demo je Spiel, Alterszuordnung aus Daten, eigene Screens | 600–900 | ≤ 3 % | Playtest 8/8, Stufe 73 core.js |
| `/paket/` | Produktseite | neu aus `paket/_maschine`, Manifeste | Fotos der Drucke, Inhaltsliste aus Manifest, „kostenlos im Pilot" | 500–800 | ≤ 3 % | Stufen 15/22/23/29/35, QR-Scan, Drucktest |
| `/kosten/` | Ratgeber mit Werkzeug | neu aus `/kindergeburtstag-kosten`, `priceEur`-Daten | Rechner Kosten je Kind, Tabelle aus Daten, FAQ neu, Werbekennzeichnung | 800–1.200 | ≤ 3 % | Rechner = Daten (3 Stichproben), Review |
| `/ueber-uns/` | Trust | ganz neu | echte Person, Foto, Who/How/Why, Kontakt | 400–600 | ≤ 3 % | Review |
| `/impressum/`, `/datenschutz/` (nicht in Sitemap) | Pflicht | neu, nie kopiert | § 5 DDG; alle Dienste mit Fristen aus dem Code; AV-Verträge in RECHT.md | — / 1.500–2.500 | ≤ 3 % | Rechtswinkel-Review, RECHT.md 4/4 |

Sitemap = 9 URLs. Größe: (a) ein Elternteil zieht am Tag 1 einen kompletten Geburtstag für zwei Mottos durch — mehr Mottos erhöhen die Vollständigkeit nicht; (b) 9 Indexierungsanfragen passen in einen Tag (Google nennt kein Limit; eigene Messung 11 — ANNAHME); (c) 11 gegatete Stücke in 4 Wochen = 2,75 je Woche gegen belegte 4–5; (d) dass Google eine Site anhand ihres frühen Bestands erstbewertet, ist ANNAHME ohne Primärquelle und kein Grund für Volumen (R5).

Weglass-Probe (Winkel 18): ohne `/kosten/` kommt der Launch genauso ans Gate — die Seite bleibt als einzige Ratgeber-Intention mit eigenem Datenwerkzeug und rückt in Zyklus 1, falls S37 aus der Kapazität fällt; ohne `/paket/` fehlt die „FERTIG"-Hälfte der Produktzusage; ohne `/einladung/` der Einstieg für die größte Suchintention (1.7); ohne zweites Motto wirkt der Wähler wie eine Demo (E8). Gestrichen: 14 Schatzsuche-Seiten, 30 Einladungs-Hubs, 45 Matrix-Seiten, 17 Ratgeber ohne Werkzeug, 16 Klasse-C-Seiten, Trailer, Foto-Print, Transparenz-Seite.

## E. Index-Messplan

**Spalten:** definiert in S3 (Wochen- und Alt-Domain-Zeile, Hypothesen-Kopf).

**Kadenz:** Montag 09:00 Berlin (S53); Alt-Domain erster Montag im Monat 09:20 (S61); je Sitemap-URL einmal im Monat URL-Prüfung ohne Antrag.

| Phase | Erfolg | Abbruch oder Fallback |
|---|---|---|
| 4 Soft Launch (24.–27.11.2026) | 9/9 Checks × 3 Tage ohne 5xx und Worker-Fehler; Live-Test `/` grün | ein 5xx oder Worker-Fehler → S52, Zähler neu |
| 4 Tag 4 (27.11.) | Sitemap „Erfolgreich / 9"; 9 Anfragen protokolliert | „Konnte nicht abgerufen werden" → Fix, erneut senden |
| 5 Gate 1 (11.01.2027) | ≥ 6 von 9 indexiert → Phase 6 | 3–5 → zweite Lesung 01.02.; ≤ 2 oder ≥ 5 „gecrawlt-nicht" → S56 |
| 5 Abbruch (22.02.2027) | < 50 % „gecrawlt-nicht" → weiter | ≥ 50 % → Stopp des Ausbaus, S56 |
| 6 je Zyklus | neue URL binnen 4 Wochen indexiert; Gesamtanteil ≥ 67 % | zwei Zyklen in Folge ohne Indexierung → Pause, S56 (2)–(4) |
| 7 Alt-Domain | ≥ 30 indexiert in zwei Monatslesungen und ≥ 10 Impressionen je Tag → Frage S62 | kein Eingriff |

„Gecrawlt – zurzeit nicht indexiert" heißt: gelesen und nicht aufgenommen; kein erneutes Einreichen (G8). Bei einer einzigartigen Werkzeugseite stützt das H2 — Antwort ist S56, nicht mehr Seiten. „Duplikat – anderes Canonical" mit machsleicht.de-Canonical ist der Cluster-Fall (R1): Abschnitte der neuen Seite neu schreiben, nie Eingriff alt. Zeitangaben ohne Google-Quelle sind ANNAHME: 6 und 12 Wochen (E17), 4 Wochen je neuer URL, 3 verweisende Domains bis Gate 1.

## F. Risiko-Register

| Nr | Risiko | Eintrittsindikator (messbar) | Gegenmaßnahme | Wer |
|---|---|---|---|---|
| R1 | Google clustert alt und neu als Duplikate (G3, G5) | GSC `<neu>`: „Duplikat – anderes Canonical" mit machsleicht.de-URL | Stufe 75 vor jedem Deploy; bei Eintritt Abschnitte der neuen Seite neu, nie Eingriff alt | Claude |
| R2 | Zwei-Domain-Konstellation wird als Doorway gelesen (G16) | GSC → manuelle Maßnahmen zeigt eine Maßnahme; oder alle Sitemap-URLs fallen gleichzeitig | Doorway-Nachweis in IA.md (S21); Reconsideration nur mit diesem Beleg | beide |
| R3 | Struktur-Dubletten innerhalb der neuen Domain (h2, FAQ, JSON) | Eigenanteil zwischen Mottoseiten < 90 %; identische FAQ > 0 | Stufe-62-Analog je Motto; FAQ-Prüfung in Stufe 75; JSON-Text nur noindex | Claude |
| R4 | Alternativ-Hypothese H2 trifft zu | ≥ 5 von 9 „Gecrawlt – zurzeit nicht indexiert" zu T+12 | S56: Nutzertests, echte Links, Core-Update-Lesung; kein Volumen | beide |
| R5 | Erstbewertung einer wochenlang 9 Seiten großen Site (ANNAHME) | Gate 1 verfehlt bei vollständig gecrawlter Sitemap | Launch-Set vollständig statt groß; Phase 6 im 14-Tage-Takt | beide |
| R6 | Markenrechtskollision des neuen Namens | Treffer DPMA/TMview Klasse 41/35 mit ähnlichem Wortstamm; Abmahnung | S7 vor Registrierung mit Screenshots; E1 Option c | Bolle |
| R7 | Altkunden-Links brechen | S20/S48-Tabelle rot; Resend-Log 401 | S5-Reihenfolge neu → testen → alt löschen; Nachweis vor und nach Livegang | beide |
| R8 | Consent-Reichweite: Mails an `wl:`-Kontakte unter neuer Domain (§ 7 UWG) | eine Mail von `<neu>` an eine `wl:`-Adresse | E12 (a): keine Mails von `<neu>` an Altkontakte; neue Audience, neuer DOI | Bolle |
| R9 | Kinderdaten in geteiltem KV über zwei Domains | E5 (b) gewählt | E5 (a): eigener Namespace, Löschpfade je Host, Fristen aus `calcTTL` in der Erklärung | Bolle |
| R10 | Bolle-Kapazität | > 10 h je Woche oder ein Bolle-Schritt > 7 Tage offen | Klickstrecken A/B; 25 h in 8 Wochen (G); Pipeline-Regel | Claude |
| R11 | Sitemap-Generator-Drift (Alt-Landmine `generate-seo-pages.js` schrieb 24 URLs) | Stufe 76 d rot; Live-Sitemap ≠ generierte | Datei fehlt im neuen Repo; Allowlist statt Blocklist; S60 Live-Diff | Claude |
| R12 | Sweep trifft Resend-Absender, ICS-UIDs, CORS, postMessage-Origin | Sweep-Log erwartet ≠ gefunden; CORS-Fehler; Mails ohne Absender | S11 klassenweise mit Asserts; S12 mit Zeilennummern; Stufe 60 | Claude |
| R13 | Free-Plan-Quoten geteilt | QUOTEN.md-Alarmschwelle überschritten | S19 vor Livegang; Upgrade statt Drosselung | Bolle |
| R14 | Umami-Doppelzählung (Staging, alte ID) | Staging-Host in den Seiten; Besucher ohne Website `<neu>` | `data-domains`, eigene Website-ID (S18) | Claude |
| R15 | Netlify-Zertifikat erneuert sich hinter dem Proxy nicht (ANNAHME) | `openssl`-enddate < 30 Tage in S61 | Proxy 24 h auf grau; Netlify Domain management → HTTPS → Renew | Bolle |
| R16 | Resend-Zustellbarkeit der neuen Domain | Testmails im Spam (S39); Bounce-Rate > 2 % | SPF, DKIM, DMARC `p=none` (S17); nur Transaktionsmails | Bolle |
| R17 | Bing zeigt rund 50 alte URLs; beide Domains konkurrieren | BWT: beide Sites in denselben Query-Berichten | hingenommen; kein Eingriff alt; Bing-Import und IndexNow für `<neu>` | — |
| R18 | Launch mit noindex auf der Produktion | S46: X-Robots-Tag auf einer Sitemap-URL; GSC „durch noindex ausgeschlossen" | Kontext-Mechanik (S15), Stufe 74, Messung 0 Treffer (S46), S52 Lock | Claude |
| R19 | Massenänderung aus Versehen (Fix-Welle ändert Canonicals oder lastmod flächig) | Stufe 76 e rot; CHANGELOG ohne Eintrag | Grenze aus den Lesehinweisen; Konvention „Technisch:"; ein Deploy je 14 Tage | Claude |
| R20 | Paraphrasen unterlaufen die Shingle-Metrik | Reviewer-Finding „Paraphrase" trotz grüner Stufe 75 | Pflicht-Winkel „Satz für Satz gegen Quellseite" (S41); Fund → Abschnitt neu | Claude |

## G. Zeitleiste ab KW 41/2026 mit Kapazitätsrechnung

| KW | Datum | Meilenstein | Claude h | Bolle h |
|---|---|---|---|---|
| 41 | 05.–11.10. | Phase 0: Messungen, KV-Zählung, Schlüssel, E1–E18, Domain registriert | 1,5 | 7,5 |
| 42 | 12.–18.10. | Phase 1: Zone, Umami/Amazon, Repo, Sweep, Worker-Code, Netlify + Zertifikat, Staging-noindex | 11 | 3,5 |
| 43 | 19.–25.10. | Phase 1 Rest: Secrets, GSC/Bing, Resend/Migadu, Quoten, Altkunden-Nachweis; Phase 2: IA, Stufe 73 v2, Stufe 75 | 12 | 3 |
| 44 | 26.10.–01.11. | Generator, Redirects, IA eingefroren; Briefs, Fotos, Startseite, `/planen/` | 18 | 2,5 |
| 45 | 02.–08.11. | Zustands-URLs, Ritter, Piraten, `/einladung/`, Worker-Templates | 25 | 1 |
| 46 | 09.–15.11. | `/spiele/`, `/paket/`, `/kosten/`, Trust | 20 | 2 |
| 47 | 16.–22.11. | Screenshots, Reviews, Pre-Launch-Crawl, Prüfstand, E2E, Rollback-Plan | 21,5 | 1 |
| 48 | 23.–29.11. | Go/No-Go (Mo), Livegang (Di 09:00), Elternteil-Test, Altkunden-Nachweis, Soft Launch 72 h, Tag 4 Sitemap (Fr) | 3,5 | 4,5 |
| 49 | 30.11.–06.12. | erste Verlinkungen; erste Montagsmessung | 0,7 | 3,3 |
| 50–53, 1/2027 | 07.12.–10.01. | Messung je Montag; kein Inhalts-Deploy | 0,7 je Woche | 0,3 je Woche |
| 2/2027 | 11.01. | Gate 1 | 1 | 0,5 |
| 3/2027 ff. | ab 18.01. | Phase 6 Zyklus 1 (Dino), 14 Tage je Motto | 10–12 je Woche | 1,5 je Woche |
| 5/2027 | 01.02. | zweite Gate-Lesung (nur bei 3–5 von 9) | 1 | 0,5 |
| 8/2027 | 22.02. | Abbruchlesung T+12 | 0,5 | 0,3 |
| 29/2027 | Juli | 13 Zyklen, 22 Sitemap-URLs (nur bei durchgehend grünem Gate) | — | — |

Kapazität bis zum Livegang (KW 41–48): Claude 112,5 h geplant plus 30 % Reserve für Fix-Schleifen = 146 h in 8 Wochen = 18,3 h je Woche (Rahmen 20–30 h). Bolle 25 h in 8 Wochen = 3,1 h je Woche (Rahmen 10–15 h), Spitze KW 41 mit 7,5 h. Gegatete Stücke bis Livegang: 11 Inhalts-Stücke (S29–S39) plus 4 Werkzeug-Stücke (S22–S25) = 15 in 5 Wochen = 3 je Woche gegen 4–5 belegte (SESSION-NOTES 31.05.–14.09.). Phase 6: 20–24 h Claude je Zyklus = 10–12 h je Woche. Erstes hartes Gate: 11.01.2027 (S54), sechs Wochen nach Sitemap-Einreichung.

## Quellen (alle abgerufen am 01.10.2026)

Google, Primärquellen: Get your website on Google — https://developers.google.com/search/docs/fundamentals/get-on-google · SEO Starter Guide (G14) — https://developers.google.com/search/docs/fundamentals/seo-starter-guide · Search Essentials — https://developers.google.com/search/docs/essentials · Spam policies (G16) — https://developers.google.com/search/docs/essentials/spam-policies · Site reputation abuse update (G18) — https://developers.google.com/search/blog/2024/11/site-reputation-abuse · Site move with URL changes (G6) — https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes · Site move without URL changes — https://developers.google.com/search/docs/crawling-indexing/site-move-no-url-changes · Canonicalization (G3) — https://developers.google.com/search/docs/crawling-indexing/canonicalization · Consolidate duplicate URLs (G2) — https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls · Redirects (G1) — https://developers.google.com/search/docs/crawling-indexing/301-redirects · Block indexing — https://developers.google.com/search/docs/crawling-indexing/block-indexing · Robots meta tag — https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag · JavaScript SEO basics (G26) — https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics · URL structure — https://developers.google.com/search/docs/crawling-indexing/url-structure · Build and submit a sitemap (G11) — https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap · Sitemaps lastmod (G12) — https://developers.google.com/search/blog/2023/06/sitemaps-lastmod-ping (heute nicht abrufbar; Aussage aus G11 gedeckt) · Page indexing report (G8) — https://support.google.com/webmasters/answer/7440203 · URL Inspection (G9) — https://support.google.com/webmasters/answer/9012289 · Sitemaps report — https://support.google.com/webmasters/answer/7451001 · Verify site ownership — https://support.google.com/webmasters/answer/9008080 · Crawl stats report — https://support.google.com/webmasters/answer/9679690 · Links report — https://support.google.com/webmasters/answer/9049606 · Core Web Vitals report — https://support.google.com/webmasters/answer/9205520 · Software app structured data — https://developers.google.com/search/docs/appearance/structured-data/software-app · HowTo/FAQ changes — https://developers.google.com/search/blog/2023/08/howto-faq-changes · Core updates (G21) — https://developers.google.com/search/updates/core-updates · Creating helpful content (G23) — https://developers.google.com/search/docs/fundamentals/creating-helpful-content · Organization structured data (G25) — https://developers.google.com/search/docs/appearance/structured-data/organization · Ranking updates (G27) — https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history

Infrastruktur (Primärquellen der Anbieter): Cloudflare TLD policies (M1) — https://www.cloudflare.com/tld-policies/ · Cloudflare add a site — https://developers.cloudflare.com/fundamentals/manage-domains/add-site/ · Cloudflare full setup — https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/ · Cloudflare proxy status — https://developers.cloudflare.com/dns/proxy-status/ · Workers custom domains (M8) — https://developers.cloudflare.com/workers/configuration/routing/custom-domains/ · Wrangler configuration (M9) — https://developers.cloudflare.com/workers/wrangler/configuration/ · Wrangler Workers commands — https://developers.cloudflare.com/workers/wrangler/commands/workers/ · Wrangler KV commands — https://developers.cloudflare.com/workers/wrangler/commands/kv/ · Workers rollbacks — https://developers.cloudflare.com/workers/configuration/versions-and-deployments/rollbacks/ · Workers limits — https://developers.cloudflare.com/workers/platform/limits/ · KV limits — https://developers.cloudflare.com/kv/platform/limits/ · Crawler Hints — https://developers.cloudflare.com/cache/advanced-configuration/crawler-hints/ · IndexNow FAQ (G28) — https://www.indexnow.org/faq · Bing import from GSC (G29) — https://blogs.bing.com/webmaster/september-2019/Import-sites-from-Search-Console-to-Bing-Webmaster-Tools · Netlify assign a domain (M5) — https://docs.netlify.com/manage/domains/manage-domains/assign-a-domain-to-your-site-app/ · Netlify multiple domains — https://docs.netlify.com/manage/domains/manage-domains/manage-multiple-domains/ · Netlify external DNS — https://docs.netlify.com/manage/domains/configure-domains/configure-external-dns/ · Netlify HTTPS — https://docs.netlify.com/manage/domains/secure-domains-with-https/https-ssl/ · Netlify troubleshooting — https://docs.netlify.com/manage/domains/troubleshooting-tips/ · Netlify branch deploys (M6) — https://docs.netlify.com/deploy/deploy-types/branch-deploys/ · Netlify deploy overview — https://docs.netlify.com/deploy/deploy-overview/ · Netlify manage deploys — https://docs.netlify.com/deploy/manage-deploys/manage-deploys-overview/ · Netlify headers — https://docs.netlify.com/manage/routing/headers/ · Netlify file-based configuration — https://docs.netlify.com/build/configure-builds/file-based-configuration/ · Netlify redirect options — https://docs.netlify.com/manage/routing/redirects/redirect-options/ · Netlify project visibility — https://docs.netlify.com/manage/security/secure-access-to-sites/project-visibility/ · Netlify pricing (M7) — https://www.netlify.com/pricing/ · Resend pricing — https://resend.com/pricing · Resend Cloudflare DNS — https://resend.com/docs/dashboard/domains/cloudflare · Umami Cloud FAQ — https://docs.umami.is/docs/cloud/faq · Umami tracker configuration — https://docs.umami.is/docs/tracker-configuration · Migadu pricing — https://www.migadu.com/pricing/ · Screaming Frog SEO Spider — https://www.screamingfrog.co.uk/seo-spider/ · Pinterest claim website (M11) — https://help.pinterest.com/en/business/article/claim-your-website · DENIC Domainrichtlinien 01/2026 (M2) — https://www.denic-services.de/denic-direct/denic-domainrichtlinien · DENIC Providerwechsel (M3) — https://www.denic.de/domains/de-domains/providerwechsel · DENIC Domainabfrage — https://webwhois.denic.de/ · DPMA Markenrecherche — https://register.dpma.de/DPMAregister/marke/basis · TMview — https://www.tmdn.org/tmview/ (Web-App, als Suchwerkzeug zitiert) · § 5 DDG — https://www.gesetze-im-internet.de/ddg/__5.html · § 7 UWG — https://www.gesetze-im-internet.de/uwg_2004/__7.html · Registrar-Preise (M4): INWX https://www.inwx.de/de/domain/pricelist · netcup https://www.netcup.com/de/domain/zusaetzliche-domain-de · united-domains https://www.united-domains.de/de-domain/ · IONOS https://www.ionos.de/domains/de-domain

Sekundärquellen (nur Hinweis): Search Engine Journal, Google On Staging Sites (07.04.2023) — https://www.searchenginejournal.com/google-on-staging-sites-preventing-accidental-indexing/484257/ · Semrush, SEO for a new website: first 90 days (17.08.2026) — https://www.semrush.com/blog/seo-for-new-website/ · Mueller 2019/2020/2023, Mueller/Splitt 07/2026, Sullivan 2024 wie im Auftrag 3.2 · eigene Messungen: `_dev/GSC-INDEX-PLAN.md` (28.05.2026: 11 Anfragen, dann erschöpft), SESSION-NOTES (71 Gate-Einträge 31.05.–14.09.), heutige Zählungen mit Kommando.

## H. Selbstprüfung

| Prüfpunkt | Ergebnis | Zitat der Planstelle |
|---|---|---|
| Alle 24 Winkel adressiert oder begründet verworfen | ja | W1 → 0.1, S1, S2, S54; W2 → S22; W3 → S23; W4 → S7, S8, E1; W5 → S9–S19; W6 → S21, S25; W7 → 0.2, S29–S31, E15; W8 → D; W9 → Lesehinweise, S24, S60; W10 → S50, S51; W11 → S38, S40; W12 → S21 (d), R2; W13 → S25, S29, S42; W14 → S4, S20, E5, E9, E12, S63; W15 → S38, E12, E13, S7; W16 → S53, E; W17 → G, S43; W18 → D Weglass-Probe; W19 → S56; W20 → S62; W21 → S47; W22 → S20, S48; W23 → S45, S52; W24 → Phase-4-Einleitung |
| Kein Schritt ohne Beleg | ja | 63 Blöcke S1–S63 mit je einem Feld „Beleg:" samt Kommando oder Messung und Kontrollzahl (S46: „9 × 200, 0 × X-Robots-Tag") |
| Keine Google-Aussage ohne URL | ja | jede Aussage trägt G-Nummer oder Dokumentnamen, aufgelöst im Abschnitt Quellen; Sekundärquellen tragen „nur Hinweis" |
| Keine der beiden Hypothesen als Tatsache | ja | 0.1: „Der Plan behandelt keine der beiden als Tatsache."; S54: „H1 gestützt (nicht bewiesen)" |
| Keine verbotene Maßnahme aus Abschnitt 6 des Auftrags | ja | Phase 7: „keine Rückbauten, keine noindex-Welle, keine Validierungen, keine Indexierungsanträge"; S22-Matrix verbietet Redirects, Canonicals, Links, Bilder, Texte in beide Richtungen; S50: „jede genau einmal, nie wieder" |
| Jede Zahl mit Quelle | ja | Lesehinweise: Zahlen stammen aus der Ist-Analyse oder tragen das Kommando (S12: „65 Zeilen mit Hostnamen, gezählt heute mit `grep -c machsleicht`") |
| Jeder Bolle-Schritt gebündelt | ja | Phase 1: „Bolles Klickstrecke in dieser Reihenfolge: S9 → S18 → S14 → S16 → S17 → S13"; S50 bündelt Sitemap, Anfragen, Bing, IndexNow in einer Sitzung |
| Altkunden-Nachweis und Rollback vor dem Livegang | ja | S20 (Phase 1) und S52 („steht vor dem Livegang") sind Zeilen 11 und 12 der Go-Liste S45; S48 wiederholt den Nachweis danach |
| Keine Vagheitswörter, keine Score-Skala | ja | Verbotsliste aus Abschnitt 6 des Auftrags per grep geprüft: 0 Treffer; Score nur als Reviewer-Telemetrie (S41) |

## Was dieser Plan nicht garantieren kann

Google veröffentlicht weder Indexierungs- noch Erholungsfristen; T+6 und T+12 Wochen sind Setzungen aus zwei vagen Google-Aussagen und bleiben ANNAHME. Die Diagnose der Ist-Analyse ist eine zeitliche Passung, kein Kausalbeweis — weder H1 noch H2 lässt sich von außen beweisen, und ein grünes Gate 1 beweist H1 nicht, es macht sie wahrscheinlicher. Dass Google den gemeinsamen Betreiber nicht als Verbindung wertet, ist nicht dokumentiert; der Plan trennt alles Trennbare und nimmt die Identität als Pflicht hin. Ob die neue Domain Besucher bekommt, hängt an Suchintentionen, die heute Canva, Händler-Hubs und Pinterest halten (1.7) — kein Schritt verspricht Traffic mit Datum. Deshalb liegt das erste harte Gate am 11.01.2027: nach 9 URLs und rund 146 Claude-Stunden, bevor der Motto-Ausbau 26 Wochen bindet.
