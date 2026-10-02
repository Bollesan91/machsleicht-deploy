# Relaunch-Plan v6 — machsleicht als Geburtstags-OS auf `<neu>`

Stand 01.10.2026, v6 (Fixlisten v1→v2 bis v5→v6 eingearbeitet, Änderungsprotokolle am Ende) · Planer: Claude (Fable 5.1, Session „Relaunch-Plan") · Auftrag: `_dev/review/2026-10-01-relaunch-plan-prompt.md` · Faktenbasis: Ist-Analyse 1.1–1.7, Referenzen G1–G29 und M1–M12 des Auftrags · Repo-Stand für alle Messungen: `main acebbc22`, `draft e2f1d63a`.

## Lesehinweise

- Platzhalter: `<neu>` = neue Domain und Marke (E1/E2), `<neu-repo>` = GitHub-Repo, `<neu-site>` = Netlify-Projekt, `party.<neu>` = Worker-Host, `<alt-repo>` = lokaler Klon von machsleicht-deploy. Der Plan nennt keinen Domainnamen.
- ANNAHME = nicht aus einer Primärquelle belegt; jede trägt die Messung, die sie prüft. Alle URLs im Abschnitt „Quellen" wurden am 01.10.2026 abgerufen; Google-Aussagen sind sinngemäß wiedergegeben; SEO-Blogs sind Hinweis, nie Beleg.
- Zahlen ohne eigene Quelle stammen aus der Ist-Analyse (Abschnitt 1.x des Auftrags) oder sind heute im Alt-Repo gemessen; dann steht das Kommando dabei.
- Massenänderung auf `<neu>` (ab dem ersten Deploy, auf Staging ab S26): je Deploy > 3 Sitemap-URLs hinzugefügt, > 2 entfernt, Canonical oder Redirect auf > 3 URLs geändert, oder lastmod auf > 3 URLs ohne Inhaltsänderung. Darunter erlaubt, aber protokolliert in `SITEMAP-CHANGELOG.md`; Stufe 76 erzwingt es (S24).
- L = Länge der Sitemap-Allowlist: 9 bei E20 (a), 8 bei E20 (b). Kontrollzahlen stehen als „= L"; Gate-Schwellen als Anteile von L: ≥ 2/3 indexiert (6 bei L = 9 und bei L = 8), ≤ 1/4 (2 bei beiden), ≥ 50 % „gecrawlt-nicht" (5 bei L = 9, 4 bei L = 8).
- Deploy-Takt: Phase 4–5 höchstens ein Inhalts-Deploy je 14 Tage; Phase 6 ein Deploy je Motto-Zyklus (Beobachtung aus machsruhig, kein Google-Beleg).
- Review = frischer claude.ai-Tab nach Helfer V4.1 mit `LEKTIONEN.md` und `OFFENE-REVIEW-PUNKTE.md`; Subagents und WebFetch sind nie Gutachter.
- Zwei Abweichungen von der Ist-Analyse mit Primärquelle vom 01.10.2026: Resend Free erlaubt 3 verifizierte Domains, 100 Mails/Tag, 3.000/Monat (Preisseite) — nicht eine Domain; Umami-Hobby: Suchtreffer nennen 1 Website je Konto, die Ist-Analyse 3 → S18 misst es am Dashboard-Knopf, E11 hält Alternativen bereit.

## 0. Leitsätze vor Phase 0

### 0.1 Zwei Hypothesen, eine Messung (Winkel 1)

| | H1 „Selbstabriss" (Befund 18.09.) | H2 „Qualitätsklassifikator" (Doku 03.06.) |
|---|---|---|
| Kern | Google stuft die Domain nach zwei Sitemap-Halbierungen und 198 Fremd-Canonicals binnen drei Wochen als instabil ein | Googles Systeme werten die Site wegen programmatischer Altersseiten-Masse und dünner Inhalte sitewide ab (G19, G20) |
| Vorhersage für `<neu>` | Neue Domain ohne diese Historie mit kleinem, vollständigem Set wird in Wochen indexiert (Vergleich machsruhig: 162 gültige Seiten) | Auch `<neu>` landet trotz neuem Inhalt in „Gecrawlt – zurzeit nicht indexiert" (Mueller/Splitt 07/2026, Sekundärquelle) |
| Messung | Anteil der Sitemap-URLs mit Status „indexiert" (GSC Seiten-Bericht + URL-Prüfung je URL) zu T+6 Wochen nach Sitemap-Einreichung (S54) | Anteil „Gecrawlt – zurzeit nicht indexiert" zu T+12 Wochen (S55); bei T+6 nur beobachtet |
| Schwelle | ≥ 2/3 von L indexiert (6 von 9 oder 6 von 8) → H1 gestützt (nicht bewiesen), Phase 6 startet | ≥ 50 % von L „Gecrawlt – zurzeit nicht indexiert" (5 von 9, 4 von 8) zu T+12 → H2 wahrscheinlicher, Fallback S56 |
| Was keine der beiden beweist | Beide sind zeitliche Passung; Google nennt keine Fristen (G9, G21). Der Plan behandelt keine der beiden als Tatsache. | |

Das billigste Experiment, das die Hypothesen trennt, ist das Launch-Set selbst: L Sitemap-URLs (9 oder 8, E20), jede einmal angefragt, sechs Wochen gemessen, bevor der Motto-Ausbau Zeit frisst; ein Vorab-Test mit Startseite und Trust-Seiten allein scheidet aus (Leitsatz 0.7: nur zeigen, was funktioniert). Die drei nie gemachten Messungen vor Tag 1 sind S1, S2 und S4. ANNAHME zur Zeitachse: Google nennt für neue Sites „a few weeks" (Get your website on Google) und für Indexierungsanfragen etwa einen Tag mit der Einschränkung, dass es deutlich länger dauern kann (G9); T+6 Wochen ist daraus abgeleitet, keine Google-Zusage — S54 prüft sie.

### 0.2 Zweck der Site in einem Satz (G23, Winkel 7)

`<neu>` ist das Werkzeug, mit dem Eltern einen Kindergeburtstag planen und ausliefern: Plan, WhatsApp-Einladung mit Partyseite und Rückmeldung, Einladungsspiele, Druckpaket — ausschließlich Kindergeburtstag.

Was deshalb auf `<neu>` nicht existieren darf: die 16 Klasse-C-Seiten (Baby, Einschulung, Advent, Ostern, Autofahrt, Familienreise, Kreuzworträtsel, Spielkarten), die 45 Motto×Alter-Seiten und jede Einzeljahr-Seite, die 30 Einladungs-Hub- und Vorlagen-Seiten (62,7 % und 49,4 % Überlappung), die 14 Schatzsuche-Themenseiten, jede indexierbare Seite, die weder Werkzeug-Zustand noch Produkt-/Trust-Seite mit eigenem Zweck ist, jede Zahl ohne Repo-Beleg („75 Einladungsspiele" bei 60 Dateien — Ist-Analyse 1.1).

### 0.3 Doorway-Frage (G16, Winkel 12)

Der Nachweis steht in S21 (Abschnitt „Doorway-Nachweis" in `IA.md`, vor dem Livegang abgelegt, R2): keine Trichterung, kein Variantenklon, jede indexierbare Seite ist selbst das Werkzeug, die alte Domain wird nicht neu zugeschnitten. Ob Google den gemeinsamen Betreiber wertet, bleibt ANNAHME (S22).

### 0.4 Signal-Trennung alt/neu (Winkel 2)

Die Signal-Matrix (verboten / erlaubt / ANNAHME je Signal mit Beleg) ist die Spezifikation von Stufe 73 und steht in S22.

### 0.5 Was „neu geschrieben" messbar heißt (Winkel 3)

Metrik, Schwellen, Herleitung und Skripte stehen in S23. Die 45 `data/motto/*.json` bleiben Datenbasis des Werkzeugs; ihr Text erscheint nur in noindex-Zuständen (S31).

### 0.6 Verbote auf der neuen Domain, die der Linter erzwingt

Keine Motto×Alter-Matrix als URLs (Stufe 76: Allowlist), keine Einzeljahr-Seiten, keine programmatisch erzeugten Textseiten (`generate-seo-pages.js` existiert im neuen Repo nicht; Stufe 76 d), jede indexierbare Seite ist Werkzeug-Zustand oder Produkt-/Trust-Seite mit eigenem Zweck (IA.md-Spalten Werkzeug-Element/Zweck, S21), keine Zahl ohne Repo-Beleg (Stufen 34/44 bestehen fort), kein unpkg/cdnjs (Stufe 73 Host-Allowlist), kein HowTo-JSON-LD, höchstens ein JSON-LD-Block je @type und Seite (Stufe 72 erweitert).

### 0.7 Nur zeigen, was funktioniert (Architekturregel E5 der alten Site)

Jede Seite und jeder Satz auf `<neu>` nennt nur, was im Code existiert und im Test gelaufen ist: kein „bald", kein Trailer vor S59, kein Foto-Print, kein Preis, keine Zahl ohne Repo-Beleg. Die Regel stammt aus der alten Site (dort „E5" neben E4 „jede Seite führt in ein Werkzeug"); in Abschnitt C steht unter E5 die Worker/KV-Entscheidung — Verweise auf die Regel heißen in diesem Plan 0.7.

## A. Phasenübersicht

| Phase | KW | Eingangskriterium | Ausgangskriterium (messbar) |
|---|---|---|---|
| 0 Entscheidungen, Messungen, Schlüssel | 41 | Plan gelesen | E1–E20 protokolliert; Messdateien und KV-Zählung in `_dev/messungen/`; `cfut_` aus der Historie widerrufen (1), `nfp_`-Status dokumentiert (1), Resend-Key-Status nach S5 (a) dokumentiert; Domain registriert |
| 1 Fundament | 42–43 | Domain registriert, E1–E20 | Zone Active; Netlify-Zertifikat erteilt; `party.<neu>` → 302 auf `/planen/`; GSC/Bing/Resend/Umami stehen; Staging liefert noindex; Altkunden-Nachweis 9/9 |
| 2 Positionierung und IA | 43–44 | Phase 1 | `IA.md` eingefroren (Tag `ia-final`), Allowlist = L URLs (9 bei E20 a, 8 bei E20 b); Stufen 73–76 laufen mit Prüfstand-Fall |
| 3 Launch-Set | 44–47 | IA eingefroren | L Sitemap-URLs + Impressum/Datenschutz auf Staging: Linter 0 FAIL, Stufe 75 unter Grenze, L + 2 Stücke 0 offene MAJOR, Crawl L×9 grün, E2E Exit 0 |
| 4 Livegang | 48–49 | Phase 3 | Go-Liste 13/13; Produktion L×200, 0×X-Robots-Tag; 72 h Soft Launch 9 Checks ohne Fehler; Sitemap „Erfolgreich/L"; L Anfragen genau einmal; Bing; ≥ 6 Erwähnungen |
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
Tun: Ordner `_dev/messungen/` (ab S10 im `<neu-repo>`, bis dahin im Scratchpad) mit `gsc/`, `umami/` und `INDEX-LOG.md`. Spalten je Woche: Datum | KW | Sitemap-URLs | indexiert | gecrawlt-nicht | gefunden-nicht | Duplikat-anderes-Canonical | noindex-in-Sitemap | Impressionen 7 T | Klicks 7 T | Crawl-Anfragen 7 T | Hoststatus | verweisende Domains | Bing indexiert | Umami Besucher 7 T | Partyseiten erstellt 7 T | KV-Writes/Tag max | Resend Mails/Tag max | Deploys | Regel-Ergebnis. Abschnitt „Alt-Domain" je Monat: Datum | indexiert | Impressionen 28 T | Klicks 28 T | Bing indexiert (BWT, S16) | `party:` | `wl:` | `plan:` | Zertifikat bis | Eingriffe (= 0). Kopfzeile darüber: die Hypothesen-Tabelle aus 0.1 als Prä-Registrierung mit genau diesen Regeln (L = Allowlist-Länge, 9 oder 8 nach E20): T+6 (11.01.2027) ≥ 2/3 von L indexiert (6 bei L = 9 und bei L = 8) → Phase 6, zwischen 1/4 und 2/3 (3–5) → zweite Lesung 01.02., ≤ 1/4 (2) → zweite Lesung und S56 vorbereiten; T+12 (22.02.2027) ≥ 50 % von L „Gecrawlt – zurzeit nicht indexiert" (5 von 9, 4 von 8) → Stopp (E17). Die Schwellen stehen fest, bevor die erste Messung kommt. Baseline-Zeile „Alt-Domain 01.09./18.09./01.10.": 136 Sitemap-URLs, 1 indexiert, 345 „Gecrawlt – zurzeit nicht indexiert" (94 davon in der Sitemap), 44 „Gefunden – zurzeit nicht indexiert", 9 Klicks / 514 Impressionen (20.03.–18.08.), Umami-Tagesmittel aus S2, Links aus S1. `site:machsleicht.de` einmal zählen (ANNAHME: `site:` ist eine Schätzung; nur als Trend geführt).
Artefakt: INDEX-LOG.md mit Kopf und Baseline-Zeile.
Beleg: `grep -c '^|' _dev/messungen/INDEX-LOG.md` ≥ 3; keine leere Zelle in der Baseline außer „Bing" (heute keine Property).
Stopp: Ein S1/S2-Wert fehlt → Zelle „fehlt (S1)" und Schritt bleibt offen, bis gefüllt.

### S4 — KV-Bestand des alten Workers zählen
Phase: 0 · Wer: beide · Dauer: 0,5 h (Claude 0,25 / Bolle 0,25) · Hängt ab von: — · KW: 41
Tun: Bolle legt in Cloudflare (My Profile → API Tokens → Create Token → Vorlage „Edit Cloudflare Workers", Gültigkeit 1 Tag) einen Token an und gibt ihn Claude im Chat. Claude im `<alt-repo>`-Root mit `CLOUDFLARE_API_TOKEN` gesetzt: `for p in party: wl: plan: consent: extimg: doi:; do echo "$p $(npx -y wrangler kv key list --binding PARTY --remote --prefix "$p" | grep -c '"name"')"; done` (Syntax: Wrangler-KV-Kommandos). Nur lesen, nichts schreiben, nichts deployen.
Artefakt: Tabelle Präfix | Anzahl | spätestes Ablaufdatum (aus `metadata.date` + 14 Tage) als Abschnitt „Altbestand" in INDEX-LOG.
Beleg: 6 Zahlen; Token danach von Bolle gelöscht (S5 prüft, dass die Token-Liste leer ist).
Stopp: Auth-Fehler → Token-Recht „Workers KV Storage: Read" fehlt; Dashboard-Zählung (Workers KV → Namespace → Keys) ist der zulässige Ersatz.

### S5 — Schlüssel-Hygiene: alte Tokens widerrufen, Resend-Key-Status prüfen
Phase: 0 · Wer: Bolle (Claude zählt) · Dauer: 1,5 h (Claude 0,25 / Bolle 1,25) · Hängt ab von: S4; Weg (b) zusätzlich S6 (E19) · KW: 41
Tun: Claude zählt im `<alt-repo>` mit scharfem Muster, ohne Werte auszugeben: `git log -p --all | grep -oE '\b(cfut_|nfp_)[A-Za-z0-9_-]{8,}' | sort -u | wc -l` und `git log -p --all | grep -oE '\bre_[A-Za-z0-9_-]{20,}' | sort -u | wc -l`. Stand 01.10.2026 (Messung des Koordinators): `cfut_` = 1 eindeutiger Token (Cloudflare), `nfp_` = 1 (Netlify) — zusammen 2, real; `re_` = 0 Treffer — das frühere „111 Commits" war ein Substring-Artefakt von `-S're_'`; es gab nie einen Resend-Key in der Historie. (a) 0 Treffer → kein Resend-Leak → Weg (a): nichts zu rotieren, kein Eingriff am Alt-Worker, der aktive Resend-Key bleibt. Nur bei einem künftigen Treffer: `git log --all -P -G're_[A-Za-z0-9_-]{20,}' --format=%cs | head -1` liefert das Datum des Leak-Commits; ist der aktive Key (Resend → API Keys, Erstelldatum) jünger, werden nur ältere Keys gelöscht. (b) Nur bei Treffer und älterem Key: Rotation nach E19 als einzige, von Bolle schriftlich freigegebene Ausnahme von „kein Deploy auf dem Alt-Stack" — `wrangler secret put` erzeugt eine neue Worker-Version und deployt sie sofort (Cloudflare-Secrets-Doku); die Version ändert nur das Secret, `party.machsleicht.de` ist noindex, die Google-Wirkung ist null. Ausführung durch Bolle selbst, weil Claudes Shell nicht interaktiv ist: Terminal-Sitzung der App vorher per `npx -y wrangler login` (OAuth im Browser) oder `$env:CLOUDFLARE_API_TOKEN="<Token>"` (PowerShell 5.1 braucht die Anführungszeichen; im Git-Bash-Tab `export CLOUDFLARE_API_TOKEN="<Token>"`) in derselben Sitzung authentifizieren (Claude liefert die Kommandozeile ohne Token-Wert); dann im `<alt-repo>`-Root `npx -y wrangler secret put RESEND_API_KEY` (Wert auf Nachfrage eintippen) oder Dashboard → Workers & Pages → `party-machsleicht` → Settings → Variables and Secrets → RESEND_API_KEY bearbeiten → Deploy; Testmail (S20) abwarten, dann alte Keys löschen. (c) Cloudflare → My Profile → API Tokens: den `cfut_`-Token aus der Historie (1) und jeden weiteren Token löschen, der nicht für den heutigen Worker-Deploy gebraucht wird; S4-Token löschen. (d) Netlify → User settings → Applications → Personal access tokens: der `nfp_`-Token aus der Historie (1) — Status nach Bolles bereits getroffener Entscheidung; der Plan hält nur den Status fest.
Artefakt: `_dev/messungen/2026-10-XX-schluessel-hygiene.md`: je Präfix Dienst | eindeutige Treffer in Historie (`cfut_` 1, `nfp_` 1, `re_` 0) | Datum letzter Leak-Commit (oder „keiner") | Erstelldatum aktiver Key | Status (gelöscht / behalten / rotiert nach E19) — ohne Werte; die Datei liegt in `_dev/messungen/` und ist von Stufe 73 ausgenommen (S11).
Beleg: `re_`-Zählung = 0 und Zeile „Weg (a), nichts zu rotieren"; Cloudflare-Token-Liste zeigt 0 Tokens mit Erstelldatum vor 01.10.2026; Netlify-Zeile mit Bolles Entscheidung; Edit-Link-Mail über den alten Worker kommt an (Resend-Log „delivered"); E19 steht in der Entscheidungs-Datei („entfällt — kein Leak-Commit, geprüft <Datum>" oder Option a/b/c).
Stopp: `re_`-Zählung > 0 → Datumsvergleich; Weg (b) ohne E19-Zeile → keine Rotation; nach Rotation keine Mail (Resend-Log 401) → alten Key erst löschen, wenn die Testmail steht.

### S6 — Entscheidungen E1–E20 protokollieren
Phase: 0 · Wer: Bolle · Dauer: 2 h · Hängt ab von: S4 (E5 braucht die KV-Zahl), S5 (a) (E19-Zeile braucht die `re_`-Zählung mit Datum) · KW: 41
Tun: Abschnitt C durchgehen; je Entscheidung eine Zeile „E<n>: Option <x> — Begründung in einem Satz" in `_dev/review/2026-10-XX-relaunch-entscheidungen.md`; bei Abweichung von der Empfehlung die Konsequenzzeile aus C mitkopieren. E19 immer als Zeile: „E19: entfällt — kein Leak-Commit, geprüft <Datum>" oder Option a/b/c (nach S5 a, vor S5 b); E20 (`/kosten/`) vor S21 (IA-Baum und Allowlist hängen daran); das OK zur Abweichung vom 11.08. als Teil der E8-Zeile („E8: a — OK zur Abweichung vom 11.08.").
Artefakt: Datei mit 20 Zeilen (E1–E20, eine je Entscheidung in Abschnitt C — abgeleitet, nicht getippt).
Beleg: `grep -c '^E[0-9]' <datei>` = 20; keine Zeile „offen".
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
Artefakt: Registrar-Bestätigung; die Wahl an die E1-Zeile der Entscheidungs-Datei angehängt („E1: b — …; gewählt: `<neu>`, Registrar, Datum, Jahrespreis"), keine zweite Zeile mit „E1" am Anfang (sonst zählte `grep -c '^E[0-9]'` 21).
Beleg: webwhois.denic.de → Status „connect"; `dig NS <neu> +short` liefert die Registrar-Nameserver.
Stopp: Name zwischen S7 und S8 vergeben → zurück zu S7, nächster Kandidat.

## Phase 1 — Fundament (KW 42–43)

Eingang: Domain registriert, E1–E20, KV gezählt. Ausgang: siehe Übersicht. Bolles Klickstrecke in dieser Reihenfolge: S9 (Zone, Nameserver) → S18 (Umami, Amazon-Tracking-ID, AWIN; erst nach S10, weil die Werte in `site.json` landen) → S28-Demo-Foto (`demo-hand.jpg`, 15 min, vor S11) → S14 (Netlify, DNS-only, Zertifikat, dann Proxy) → S16 (GSC-TXT, Bing, Crawler Hints) → S17 (Resend, Migadu) → S13 (Secrets tippen). Claude: Repo, Sweep, Worker, Netlify-Kontexte, Quoten, Nachweis per CLI.

### S9 — Cloudflare-Zone anlegen und Nameserver umstellen (Klickstrecke A)
Phase: 1 · Wer: Bolle · Dauer: 1 h · Hängt ab von: S8 · KW: 42
Tun: dash.cloudflare.com → „Onboard a domain" → `<neu>` → Plan Free → vorgeschlagene DNS-Records alle löschen (Zone bleibt leer bis S14/S17) → zwei Cloudflare-Nameserver beim Registrar eintragen → warten bis Status „Active" (Cloudflare: bis 24 Stunden, Bestätigungsmail). Danach: SSL/TLS → Full (strict); Caching → Configuration → Crawler Hints noch aus (S16 schaltet es ein).
Artefakt: Zone `<neu>` Status Active.
Beleg: `dig NS <neu> +short` → zwei `*.ns.cloudflare.com`; Dashboard „Active".
Stopp: Nach 24 h nicht Active → Nameserver-Eintrag beim Registrar prüfen (Tippfehler, DNSSEC noch an).

### S10 — Neues Repo anlegen, Übernahme-Liste ausführen
Phase: 1 · Wer: Claude · Dauer: 3 h · Hängt ab von: S6 (E1, E2, E4) · KW: 42
Tun: `gh repo create Bollesan91/<neu-repo> --public --clone` (öffentlich, weil der Branch-Trick raw-SHA-URLs braucht). Aus dem `<alt-repo>` als Dateikopie ohne Git-Historie übernehmen: `validate-all.sh`, `_dev/scripts/check-*.py|mjs`, `_dev/pruefstand/`, `_dev/LEKTIONEN.md`, `_dev/OFFENE-REVIEW-PUNKTE.md` (Startstand des Gedächtnisses), `netlify.toml`, `_headers`, `_redirects` (nur die Sperrregeln für `_dev/`, `_src/`, Konfigdateien; die Zeilen 73 und 74 des Alt-Stands tragen den Alt-Host, Zeile 19 die Marke im Dateinamen; alle drei werden nicht übernommen), `.netlifyignore` (ohne die Zeile `Setup-Anleitung-machsleicht.docx`), `robots.txt`, `css/`, `fonts/` (self-hosted), `js/` (nur Werkzeug-Code), `spiele/` (60 Dateien + `core/`, ohne `spiele/core/demo-kid.jpg` — die einzige Bilddatei unter `spiele/` und `paket/`; eine 1:1-Kopie macht die Hash-Prüfung in S22 rot), `paket/_maschine`, `paket/core`, `paket/ritter`, `paket/piraten`, `data/motto/` (45 JSON), `party-worker.js`, `wrangler.toml`, `_dev/scripts/generate-sitemap.js`, `gen-ablauf.mjs`, `paket-bauen.py`, `mengen-ableiten.py`; `netlify/functions/create-invite.mjs|serve-invite.mjs` nur bei E9 „übernehmen"; `_dev/prototypes/raketen-trailer/` (Quelle `draft e2f1d63a`, 43 Dateien, 23 mit Alt-Host) nur bei E14 „ja". Neu anlegen: `_dev/config/site.json` mit dem Feldschema `domain`, `brand`, `umamiId`, `amazonTag`, `partyHost`, `stagingHost` (Werte: Domain und Marke aus E1/E2, `partyHost` = `party.<neu>`, `stagingHost` = `staging--<neu-site>.netlify.app`; `umamiId` und `amazonTag` bleiben leer bis S18; keine Secrets). Nicht übernehmen: alle HTML-Textseiten (Rohstoff, keine Datei), `index.html`, `kindergeburtstag.html` als Datei (Werkzeug-Code wird in S30 herausgelöst), `og-*.png`, `preview-*.png`, `bilder/`, `micha/`, SESSION-NOTES/AUDIT/STRATEGIE/TASKS/BACKLOG/HELFER-Sprint-Dateien, `_src/`, `_build/`, `generate-seo-pages.js`, `consolidate-age-pages.js`, `deploy-motto.js`, `ls-webhook.js`, `sparring-engine.jsx`, `prompt-fuer-claude-chat.txt`, `.docx`, `node_modules`, `spiele/core/demo-kid.jpg`, `js/index.js`, `js/baby.js`, `js/einschulung.js` (Klasse-C-Werkzeuge, 0.2), `paket/_vergleich/`. Erster Commit auf `main`: `git commit --allow-empty -m "init"` — ohne `[skip netlify]`, denn der Marker am jüngsten Commit eines Pushs überspringt den ganzen Push (Netlify manage-deploys-Doku), und der leere Produktions-Deploy muss existieren: er liefert 404 und ist der Rollback-Vorgänger (S52); dann `git checkout -b staging` und der Fundament-Commit dort mit `[skip netlify]`; `main` bleibt beim init-Commit bis S46 (Git kennt keinen Branch ohne Commit, Netlify bietet nur existierende Branches als Production branch an). `_dev/UEBERNAHME.md`: Datei | Quelle-SHA | Status (kopiert / neu / nicht übernommen + Grund).
Artefakt: `<neu-repo>` mit Branches `main` (nur init-Commit) und `staging`; UEBERNAHME.md.
Beleg: `git -C <neu-repo> log --all -S'cfut_' --oneline | wc -l` = 0; `ls og-*.png micha 2>/dev/null | wc -l` = 0; `test ! -f _dev/scripts/generate-seo-pages.js && echo ok`; `node -e "const s=require('./_dev/config/site.json');['domain','brand','umamiId','amazonTag','partyHost','stagingHost'].forEach(k=>{if(!(k in s))throw k})"` läuft ohne Fehler; `git ls-files | wc -l` in UEBERNAHME.md notiert.
Stopp: Ein Werkzeug referenziert eine nicht kopierte Datei (Stufe 70-Analog „Skript nicht im Repo") → Datei nachziehen und in UEBERNAHME.md eintragen; nie pauschal alles kopieren.

### S11 — Hostnamen-Sweep klassenweise mit Asserts; Linter-Stufe 73 „Verbindungs-Check"
Phase: 1 · Wer: Claude · Dauer: 4 h · Hängt ab von: S10, S18 (Tracking-ID), S28 (Demo-Foto `demo-hand.jpg`), S6 (E2) · KW: 42
Tun: Zuerst das Inventar über den kopierten Baum in zwei Umfängen: (a) der Stufe-73-Umfang (Erlaubnisliste unten; muss nach dem Sweep bis auf Klasse 15 0 sein, Rest in S12) und (b) der Sweep-Zusatz = `validate-all.sh`, `_dev/pruefstand/` und, nur bei E14, `_dev/prototypes/raketen-trailer/` (werden gesweept, aber von Stufe 73 nicht geprüft — Klassen (2), (13), (16); `*.md` unter `paket/` und `fonts/` liegen in (a), Klassen (10), (11), und müssen nach dem Sweep 0 sein); je Umfang `grep -rIl -i machsleicht <Umfang> | while read f; do echo "$f $(grep -ci machsleicht "$f")"; done` → Tabelle Umfang | Datei | Vorkommen | Klasse in `_dev/messungen/sweep-inventar.md`. Die Klassen-Erwartungen kommen aus diesem Inventar (a)+(b) des kopierten Baums; die Messung des Prüfers im Alt-Baum (draft, 01.10.: `paket/` 19 von 23 Dateien, `css/` 1/1, `fonts/` 2/7, `js/` 3/4, `spiele/` 2/63, `_dev/scripts` 23/119, `_dev/pruefstand` 9/19) ist Orientierung, keine Erwartung. Kein globales sed über 2.221 Vorkommen. Skript `_dev/scripts/sweep-hostnamen.py` mit je Klasse eigenem Muster und erwarteter Trefferzahl aus dem Inventar; alle Asserts vor dem einzigen Write (Bolle-Regel): (1) `_dev/config/site.json` (angelegt in S10) vervollständigen und lesen; `generate-sitemap.js` DOMAIN → liest `site.json`; (2) `validate-all.sh`: alle Vorkommen laut Inventar — Canonical-Asserts (im Alt-Stand Zeile 266 `https://machsleicht.de/einladung/`) sowie Marke in Kommentaren, Bannern und Meldungen → neuer Host und neue Marke; (3) `spiele/core/core.js` Footer (Alt-Zeilen 307–311) → neuer Host und neue Marke; Alt-Zeile 83 trägt zwei Fundstellen: den Demo-Foto-Pfad → `/spiele/core/demo-hand.jpg` (Datei aus S28, KW 42) und die invimg-Host-Regex `party\.machsleicht\.de/api/invimg/` → `party.<neu>` — sonst lehnt das Spiel echte Partyfotos ab; (4) `paket/core/paket-core.js`: alle Vorkommen laut Inventar — API-Host und Partyseiten-URL (Alt-Zeilen 429, 433), Kommentare, ogimg-URL → `party.<neu>`; (5) Paket-Manifeste; (6) `data/motto/*.json`, drei Muster mit Zahlen aus dem Kommando (Alt-Stand, Messung des Koordinators 01.10.2026): 23 Dateien mit `party.machsleicht.de` in Prosa (Ist-Analyse nannte 28) → Satz neu formulieren, nicht nur Host tauschen; 43 Dateien mit `tag=machsleicht21-21` → neue Tracking-ID aus S18 als rohes `&tag=` (Lektion L3); 37 Dateien mit Marken- oder Alt-Seiten-Nennung in Prosa und WhatsApp-Texten (59 Zeilen, auch URL-kodiert `https%3A%2F%2Fmachsleicht.de…` und der Alt-Tag `machsleicht-21`) → Alt-Seiten-Links durch neue Werkzeug-Pfade ersetzen oder den Satz streichen; (7) `netlify/functions/*` nur bei E9; (8) `robots.txt` Sitemap-Zeile; (9) Paket-Shells `paket/<motto>/index.html`: alle Vorkommen laut Inventar — `<title>… — machsleicht</title>`, Footer, Kommentare → neue Marke (`paket/_vergleich/` wird in S10 nicht übernommen); (10) `paket/_maschine/template.html`, `paket/_maschine/slots-inventar.json`, `paket/core/PALETTE.md`: alle Vorkommen laut Inventar — Footer, Kommentare, Umgebungsvariable `MACHSLEICHT_WORKER`, Tag-Regex; (11) Kommentare in `css/utility.css`, `fonts/fonts.css`, `fonts/README.md`, `spiele/core/core.css`; (12) Prüf- und Bau-Skripte unter `_dev/scripts/`: alle Vorkommen laut Inventar — Host-Defaults (z. B. `check-sitemap-live.py --sitemap`) → Default aus `site.json`, `gen-ablauf.mjs` (Bau-Skript, 1 Zeile), Fixtures und Assertions (`check-partyseite-render.mjs` Alt-Zeile 447 → `https://<neu>/planen/`); (13) `_dev/pruefstand/`: alle Vorkommen laut Inventar — Alt-Host in Erwartungswerten, Marke in Docstrings, Kommentaren und README; (14) `js/index.js`, `js/baby.js`, `js/einschulung.js` kommen nicht mit (S10) — das Inventar muss dafür 0 zeigen; `js/motto-data.js` hat 0 Treffer (Alt-Stand: baby.js 4, einschulung.js 3, motto-data.js 0 Zeilen); (15) `wrangler.toml` (`name`, `routes`) und `party-worker.js` liegen im Stufe-73-Umfang (a), werden aber erst in S12 umgeschrieben — Erwartung aus dem Inventar (Alt-Stand: 1 Zeile und 65 Zeilen), in S11 nicht gesweept, Stufe 73 läuft in S11 mit befristeter Ausnahme für diese zwei Dateien, S12 hebt sie auf; (16) nur bei E14: `_dev/prototypes/raketen-trailer/` — Trailer-Drehbücher und core.js, Wasserzeichen und Hosts, Erwartung aus dem Inventar. Stufe 73 in `validate-all.sh` mit Erlaubnisliste statt Verbotsliste: geprüft werden alle ausgelieferten Dateien (`html|js|mjs|json|css|xml|txt` unter dem Publish-Root außer `_dev/`) plus die Dateinamen `_redirects`, `_headers`, `netlify.toml`, `wrangler.toml`, `.netlifyignore` und `*.md` unter dem Publish-Root außer `_dev/` (Alt-Stand: `_redirects` 3 Treffer, `wrangler.toml` 1 — Messung des Koordinators 01.10.2026) plus `_dev/scripts/*.py|mjs|js` (Host-Defaults der Prüfskripte) plus `netlify/functions/*`; ausgenommen sind `validate-all.sh`, `_dev/scripts/sweep-hostnamen.py`, `_dev/pruefstand/`, `_dev/messungen/`, `_dev/review/`, `_dev/ROLLBACK.md`, `_dev/IA.md`, `UEBERNAHME.md`, `LEKTIONEN.md`, `OFFENE-REVIEW-PUNKTE.md` — sie nennen den Alt-Host als Mess- oder Regelgegenstand (`validate-all.sh` 4×, `LEKTIONEN.md` 7×, `OFFENE-REVIEW-PUNKTE.md` 1×; Messung des Koordinators 01.10.2026), ebenso die Dateien, die der Plan selbst anlegt (Sweep-Inventar, Altkunden-Nachweis, Go-Datei, ROLLBACK.md, INDEX-LOG Alt-Domain). Ausgabe im Format „Stufe 73: 0 Verbindungen (N geprüfte Dateien, P Prüfungen)" mit P = Zahl der im Skript registrierten Zusatzprüfungen (S11: 0, ab S22: 5) — dasselbe Format in S11, S22 und S45 (7). `grep -rl 'machsleicht21-21'` über denselben Umfang leer; externe Hosts in HTML nur aus einer Allowlist (`cloud.umami.is`, `wa.me`, `amazon.de`, AWIN-Host). Prüfstand-Fall mit zwei Armen in `_dev/pruefstand/faelle_stufe73-76.py` (die Datei entsteht hier), `gruppe="stufe73-76"`, Name `stufe73-sweep`: Alt-Host in einer HTML-, JS-, JSON- oder `_redirects`-Datei → rot; Alt-Host in `_dev/messungen/` → bleibt grün (Fallzahl Stufe 73 bleibt 6).
Artefakt: Sweep-Skript, Sweep-Log, Stufe 73, Commit.
Beleg: Stufe 73 grün mit befristeter Ausnahme für `party-worker.js` und `wrangler.toml` (Klasse 15, Aufhebung in S12); Sweep-Log mit Klasse | erwartet | gefunden | ersetzt, alle drei Zahlen je Zeile gleich — Ausnahme Klasse 15 in S11: erwartet = gefunden (1 + 65), ersetzt = 0, Abschluss in S12; Inventar (a)+(b) vor dem Sweep = Summe der Klassen-Erwartungen; (a) nach dem Sweep = genau `party-worker.js` und `wrangler.toml` (Zahl der Alt-Host-Zeilen notiert; Abschluss in S12); (b) nach dem Sweep = 0 Zeilen aus dem Inventar; verbleibende Treffer nur im in S11 neu geschriebenen Stufe-73-Code (Zahl notiert); Ausgabe „Stufe 73: 0 Verbindungen (N geprüfte Dateien, 0 Prüfungen)" mit N > 0 (P = 0, weil S22 die Zusatzprüfungen erst registriert).
Stopp: Erwartet ≠ gefunden in einer Klasse → kein Write, Muster nachschärfen (Lehre vom 08.09.: die Messfehler lagen im Muster, nicht in der Rechnung).

### S12 — Worker-Fassung für `party.<neu>` schreiben
Phase: 1 · Wer: Claude · Dauer: 3 h · Hängt ab von: S11 (Klasse 15 offen), S6 (E5) · KW: 42
Tun: `party-worker.js` (3.180 Zeilen, 65 Zeilen mit Hostnamen, gezählt heute mit `grep -c machsleicht`): `CORS_ALLOWED_ORIGINS` (Zeilen 11–14) → `https://<neu>`, `https://www.<neu>`, `https://party.<neu>`, `https://staging--<neu-site>.netlify.app` (für S44), localhost; Konstante `CORS` (Zeile 32) gleich; `postMessage`-Origin-Regex (Zeilen 1018, 1082) → neuer Host; Root-302 (Zeile 1296) → `https://<neu>/planen/`; alle Treffer von `git -C <alt-repo> show acebbc22:party-worker.js | grep -c 'party\.machsleicht\.de'` = 20 Zeilen (22 Vorkommen; Messung des Koordinators 01.10.2026): davon 3 Kommentare (2, 10, 1077), CORS (14) und ICS (2677) separat behandelt, 15 URL-Zeilen (17 Vorkommen, Zeile 545 dreifach; Ableitung 20 − 3 − 1 − 1 = 15) inkl. 1326 invimg-URL als Gegenstück zur core.js-Regex, 1523 baseHead, 2178/2182 ogimg, 3068 INV_BASE → Konstante `PARTY_HOST`; Mail-Footer und Zeile „Diese E-Mail wurde von … gesendet" (1168, 1689, 2040) → neue Marke und Host; Resend-Default-Absender `kontakt@machsleicht.de` (432–433, 970–971, 1177–1178) → `kontakt@<neu>` (RESEND_FROM/REPLY_TO werden als Secrets gesetzt, der Default bleibt Fallback); og:image-Fallback und Favicon (1438, 1442) → eigene Assets; Magic-Link (956) → `https://<neu>/planen/?plan=`; Spiele-iframe-Host (1958, 2132) → `https://<neu>` und Demo-Foto-Pfad (1958) → `/spiele/core/demo-hand.jpg`; Rückweg „Eigene Partyseite erstellen" → `https://<neu>/planen/?ref=`; ICS-UID → `UID:<id>@party.<neu>` (Alt-Zeile 2677); Gästeseiten senden `Referrer-Policy: no-referrer` (PII in URL, offener P1-Punkt); Partyseiten-CSP (Alt-Zeile 1334, der Header — 1328 ist der Kommentar dazu: `Content-Security-Policy: frame-ancestors 'self'`) → `frame-ancestors 'self' https://<neu> https://staging--<neu-site>.netlify.app`, sonst blockiert der Browser die Live-Demo-Partyseite im iframe auf `/einladung/` (S34; der Origin-Vergleich ist exakt). `wrangler.toml`: `name = "party-<neu-kurz>"`, `[[routes]] pattern = "party.<neu>" custom_domain = true` (Workers-Custom-Domains-Doku), Binding `PARTY` mit neuer id (S13), `keep_vars = true`, Cron unverändert `0 8 * * *`. Danach die befristete Ausnahme (Klasse 15) aus Stufe 73 in `validate-all.sh` entfernen.
Artefakt: Worker-Fassung, wrangler.toml und `validate-all.sh` (Stufe 73 ohne Ausnahme) im `<neu-repo>`.
Beleg: `grep -c 'machsleicht' party-worker.js` = 0; Stufe 73 ohne Ausnahme grün, Inventar (a) = 0 Dateien (Klasse 15 geschlossen); `grep -c 'Content-Security-Policy.*staging--<neu-site>' party-worker.js` = 1 (die Header-Zeile, nicht der Kommentar); `node --check party-worker.js`; `node _dev/scripts/check-partyseite-render.mjs` (Stufe 60) grün; `node _dev/scripts/check-cron-erinnerung.mjs` grün.
Stopp: Stufe 60 rot → kein Deploy; Template-Literal-Fehler sind die bekannte Klasse (L14).

### S13 — KV anlegen, Secrets setzen, Worker deployen, Custom Domain binden
Phase: 1 · Wer: beide · Dauer: 1 h (Claude 0,5 / Bolle 0,5) · Hängt ab von: S9, S12, S17, S18 · KW: 43
Tun: Bolle legt bereit: Cloudflare-Token (Vorlage „Edit Cloudflare Workers" plus Zone → DNS → Edit für `<neu>`, weil die Custom Domain einen DNS-Record anlegt; Gültigkeit 1 Tag) und die sechs Werte: RESEND_API_KEY (neuer Key aus S17), RESEND_FROM (`<Marke> <kontakt@<neu>>`), RESEND_REPLY_TO (`kontakt@<neu>`), RESEND_AUDIENCE_ID (neue Audience, E12), AMAZON_TAG (S18), AWIN_PUBLISHER_ID (wie alt). Claude im `<neu-repo>`-Root: `npx -y wrangler kv namespace create PARTY` → ausgegebene id in `wrangler.toml`; `npx -y wrangler deploy` (legt Custom Domain `party.<neu>` samt DNS-Record und Zertifikat an; Voraussetzung: kein vorhandener Record auf `party.<neu>` — Workers-Custom-Domains-Doku); dann setzt Bolle die sechs Secrets selbst — Claudes Shell ist nicht interaktiv: im Terminal-Tab der App im `<neu-repo>`-Root, nach Authentifizierung der Sitzung per `npx -y wrangler login` (OAuth im Browser) oder `$env:CLOUDFLARE_API_TOKEN="<Token>"` (PowerShell 5.1 braucht die Anführungszeichen; im Git-Bash-Tab `export CLOUDFLARE_API_TOKEN="<Token>"`) in derselben Sitzung, je Secret `npx -y wrangler secret put <NAME>` (Claude liefert Kommandozeile und CWD ohne Token-Wert, Bolle tippt den Wert auf Nachfrage) oder im Dashboard → Workers & Pages → Worker → Settings → Variables and Secrets → Add → Secret → Deploy; Werte landen nie in Chat oder Dateien. Bolle löscht den Token danach.
Artefakt: Worker `party-<neu-kurz>` live mit 6 Secrets, eigenem KV-Namespace, einem Cron-Trigger.
Beleg: `npx -y wrangler secret list` zeigt 6 Namen; `curl -sI https://party.<neu>/ | grep -i '^location'` → `https://<neu>/planen/`; `curl -sI -X OPTIONS https://party.<neu>/api/create -H 'Origin: https://<neu>' | grep -i access-control-allow-origin` → `https://<neu>`; Dashboard Workers & Pages → Worker → Settings → Triggers zeigt 1 Cron.
Stopp: `wrangler deploy` meldet Routen-Konflikt → Zone aktiv (S9)? CNAME auf `party.<neu>` vorhanden? Erst dann erneut. „Permission denied" beim Anlegen der Custom Domain → im Dashboard anlegen: Workers & Pages → Worker → Settings → Domains & Routes → Add → Custom Domain.

### S14 — Netlify-Projekt anlegen, Domain verbinden, Zertifikat (Klickstrecke B)
Phase: 1 · Wer: Bolle · Dauer: 1,5 h · Hängt ab von: S9, S10 · KW: 42
Tun: app.netlify.com → Add new project → Import from Git → `<neu-repo>`; Build command leer, Publish directory `.`; Production branch `main`. Project configuration → Developer settings → Continuous deployment → Branches and deploy contexts → Configure → Branch deploys: nur `staging`; Deploy Previews aus. Project configuration → General → Visitor access → Project visibility: „Public" (im Free-Plan sieht ein „Private"-Projekt nur der Team Owner — der Reviewer-Tab und Playwright kämen nicht hin; den Schutz liefert S15). Domain management → Add a domain → „Add a domain you already own" → `<neu>` → External DNS; Netlify legt `www.<neu>` dazu; Primary = `<neu>`. Cloudflare DNS: `CNAME @ → apex-loadbalancer.netlify.com` (Cloudflare flacht am Apex ab; Netlify-Alternative A `75.2.60.5`) und `CNAME www → <neu-site>.netlify.app`, beide DNS only (graue Wolke). Netlify empfiehlt bei externem DNS `www` als Primary; der Plan bleibt beim Apex wie machsleicht.de, weil Cloudflare das Flattening liefert. Netlify: „Pending DNS verification" → Verify → Domain management → HTTPS: Zertifikat abwarten (Netlify: Netlify muss TLS terminieren, ein vorgeschalteter Cloudflare-Proxy verhindert die Ausstellung). Erst wenn „Netlify certificate" steht: Proxy-Status nach E18 (Empfehlung orange wie bei machsleicht.de; ANNAHME: die Erneuerung läuft mit Proxy, weil die alte Site so läuft — S61 prüft monatlich das Ablaufdatum; scheitert eine Erneuerung, 24 h auf grau).
Artefakt: Netlify-Projekt `<neu-site>` mit leerem Produktions-Deploy (init-Commit, liefert 404), Domain verbunden, Zertifikat erteilt.
Beleg: `curl -sI https://<neu>/ | head -1` liefert eine Netlify-Antwort (404 vom leeren init-Deploy ist erwartet); Netlify → Deploys zeigt den init-Deploy als „Published"; `curl -sI https://www.<neu>/ | grep -i location` → `https://<neu>/`; `echo | openssl s_client -connect <neu>:443 -servername <neu> 2>/dev/null | openssl x509 -noout -issuer -enddate` → Let's Encrypt, enddate > 60 Tage.
Stopp: Zertifikat nach 24 h nicht erteilt → Records grau? Flattening aktiv? DNSSEC am Registrar aus? Kein Proxy, bis es steht.

### S15 — Staging mit noindex per Deploy-Kontext; Linter-Stufe 74 „Produktion ohne noindex"
Phase: 1 · Wer: Claude · Dauer: 2 h · Hängt ab von: S14 · KW: 42
Tun: Netlify setzt `X-Robots-Tag: noindex` selbst nur auf Deploy Previews, unveröffentlichte Produktions-Deploys und alte Branch-Deploys; der jüngste Branch-Deploy ist indexierbar (Deploy-Übersicht). Deshalb `netlify.toml`: `[context.branch-deploy] command = "bash _dev/scripts/staging-headers.sh"`; das Skript stellt `/*` + `  X-Robots-Tag: noindex, nofollow` vor den Inhalt von `_headers` im Publish-Verzeichnis (Headers gelten per Deploy-Datei, nicht per Kontext — Netlify-Headers-Doku). `[context.production]` ohne command. `robots.txt` bleibt `Allow: /`, damit Googlebot das noindex lesen kann (Block-Indexing-Doku: noindex wirkt nur ohne robots.txt-Sperre). Stufe 74: (a) `_headers` im Repo enthält keine `/*`-Regel mit `noindex`; (b) `netlify.toml` hat unter `[context.production]` kein command mit `staging-headers`; (c) `robots.txt` enthält keine Zeile `Disallow: /`; Prüfpunkt (d) zur CSP kommt mit `_headers` in S25 dazu. Push auf `staging` ohne `[skip netlify]` am jüngsten Commit (sonst kein Branch-Deploy).
Artefakt: Branch-Deploy `https://staging--<neu-site>.netlify.app` mit noindex; Stufe 74.
Beleg: `curl -sI https://staging--<neu-site>.netlify.app/ | grep -ic 'x-robots-tag: noindex'` = 1; Stufe 74 (a)–(c) grün; Prüfstand-Fall `stufe74-noindex` (in derselben Datei `_dev/pruefstand/faelle_stufe73-76.py`, `gruppe="stufe73-76"`): `_headers` mit `/*`-noindex macht Stufe 74 rot.
Stopp: Header fehlt auf Staging → Netlify-Build-Log lesen (Skript nicht gelaufen, Kontext falsch).

### S16 — Search Console, Bing Webmaster Tools, Crawler Hints
Phase: 1 · Wer: Bolle · Dauer: 0,5 h · Hängt ab von: S9 · KW: 43
Tun: search.google.com/search-console → Property hinzufügen → Domain `<neu>` → TXT-Wert → Cloudflare DNS `TXT @ google-site-verification=…` (DNS only) → Bestätigen (Google: Minuten bis Tage; Record dauerhaft lassen; Domain-Property deckt alle Subdomains ab, also auch `party.<neu>`). Bing: bing.com/webmasters → „Import from Google Search Console" → `<neu>` und machsleicht.de (die alte Domain nur lesend, für die Bing-Vergleichszahl in R17 — kein Eingriff an der alten Site; Sitemaps werden mitimportiert, sobald sie existieren; S50 prüft). Cloudflare → Caching → Configuration → Crawler Hints: an (alle Pläne inkl. Free; wirkt nur bei Proxy an, E18).
Artefakt: GSC Domain-Property `<neu>` verifiziert; BWT-Sites `<neu>` und machsleicht.de (die alte nur lesend — der Import legt eine Bing-Property mit der 136er-Sitemap an, Lesezugriff, kein Eingriff an der Site); Crawler Hints aktiv.
Beleg: GSC „Inhaberschaft bestätigt"; `dig TXT <neu> +short | grep -c google-site-verification` = 1; BWT zeigt `<neu>` und machsleicht.de als verifiziert; Bing-Zahl „indexierte Seiten" für machsleicht.de in die Alt-Domain-Zeile (S3) übertragen.
Stopp: Verifikation „nicht gefunden" → 24 h warten; Wert ohne doppelte Anführungszeichen prüfen.

### S17 — Resend-Domain, Audience, Postfach `kontakt@<neu>`
Phase: 1 · Wer: Bolle · Dauer: 1 h · Hängt ab von: S9 · KW: 43
Tun: resend.com → Domains → Add Domain → `<neu>` (Region EU, wenn angeboten) → Records in Cloudflare DNS, alle DNS only: `MX send → <Resend-Wert> Prio 10`, `TXT send → v=spf1 …`, `TXT resend._domainkey → <DKIM>` (Resend-Cloudflare-Anleitung) → „Verify DNS Records" (Resend: bis 72 h, meist schneller). Zusätzlich `TXT _dmarc → v=DMARC1; p=none; rua=mailto:kontakt@<neu>`. Resend → API Keys → Key „party-<neu>" (Sending access, nur diese Domain) → Wert für S13. Resend → Audiences → neue Audience → ID für S13. Migadu → Admin → Domains → `<neu>` hinzufügen → Migadus MX/SPF/DKIM-Records in Cloudflare (DNS only; Resend sendet über `send.<neu>`, Migadu empfängt auf `@` — keine SPF-Kollision) → Alias `kontakt@<neu>` → Bolles Postfach. Migadu Micro: keine erzwungene Domain-Grenze, 20 ausgehende Mails je Tag (Preisseite) — reicht für Antworten; Versand läuft über Resend.
Artefakt: Resend-Domain „Verified", Key, Audience; Alias `kontakt@<neu>`.
Beleg: `dig TXT resend._domainkey.<neu> +short` nicht leer; Resend-Dashboard „Verified"; Testmail an `kontakt@<neu>` landet in Bolles Postfach.
Stopp: Resend „Pending" nach 72 h → Record-Namen vergleichen (Cloudflare ergänzt die Zone nicht, wenn der Name bereits voll qualifiziert eingegeben wurde).

### S18 — Umami-Website, Amazon-Tracking-ID, AWIN
Phase: 1 · Wer: Bolle · Dauer: 1 h · Hängt ab von: S6 (E11), S10 (`site.json` existiert) · KW: 42
Tun: cloud.umami.is → Settings → Websites → „Add website" `<neu>`; lässt der Hobby-Plan keine zweite Website zu, gilt E11. Snippet mit `data-website-id`, `data-domains="<neu>"` (Staging zählt nicht) und `data-exclude-search="true"` (keine Query-Parameter mit Vornamen) in `_dev/config/site.json` eintragen (`umamiId`); die Amazon-Tracking-ID als `amazonTag` ebenfalls dort. Amazon PartnerNet → Kontoeinstellungen → „Websites und Apps" → `<neu>` ergänzen; Tracking-IDs verwalten → neue ID (Format `<wort>-21`) → Wert für S11/S13. AWIN → Publisher-Profil → Website `<neu>` hinzufügen.
Artefakt: Umami-Website-ID, Amazon-Tracking-ID, AWIN-Eintrag; `site.json` (keine Secrets).
Beleg: Umami listet `<neu>` (0 Besucher); PartnerNet listet `<neu>`; `grep -oE '"(umamiId|amazonTag)": *"[^"]+"' _dev/config/site.json | wc -l` = 2.
Stopp: Umami-Limit erreicht → E11 Option b oder c; kein Tracker auf `<neu>` mit der alten Website-ID (Doppelzählung).

### S19 — Quoten-Rechnung beider Sites mit Dashboard-Zahlen
Phase: 1 · Wer: Claude (Zahlen von Bolle) · Dauer: 1 h (Claude 0,75 / Bolle 0,25) · Hängt ab von: S13 · KW: 43
Tun: Bolle liest ab: Cloudflare → Workers & Pages → `party-machsleicht` → Metrics: Requests letzte 7 Tage; Workers KV → Namespace → Metrics: Writes je Tag; Resend → Emails: gesendet letzte 30 Tage; Umami: Events letzte 30 Tage. Claude schreibt `_dev/messungen/QUOTEN.md`: Limit (Quelle, 01.10.2026) | Alt-Verbrauch | Neu-Verbrauch erwartet | Alarmschwelle. Limits: Workers Free 100.000 Requests je Tag und Konto, 5 Cron-Trigger je Konto (2 belegt); KV Free 100.000 Reads und 1.000 Writes je Tag und Konto; Resend Free 100 Mails je Tag, 3.000 je Monat, 3 Domains (2 belegt); Umami Hobby 100.000 Events je Monat (Website-Zahl: S18). Alarmschwellen: KV-Writes 600/Tag, Resend 70/Tag, Workers 50.000/Tag, Umami 80.000/Monat; bei Überschreitung Upgrade (Workers Paid), nie Drosselung des Produkts. Phase-3-Tests erzeugen ≤ 50 KV-Writes und ≤ 20 Mails je Tag.
Artefakt: QUOTEN.md.
Beleg: Alle Zellen „Alt-Verbrauch" mit Zahl und Datum; Summe Alt+Neu unter der Alarmschwelle je Zeile.
Stopp: Alt-Verbrauch bereits > 50 % eines Limits → Upgrade vor Livegang (Bolle), sonst teilen sich zwei lebende Produkte eine Drossel.

### S20 — Altkunden-Funktionsnachweis auf dem Alt-Stack (vor dem Livegang)
Phase: 1 · Wer: beide · Dauer: 1,5 h (Claude 1 / Bolle 0,5) · Hängt ab von: S5, S13 · KW: 43
Tun: Nach S5 (Weg a: Alt-Stack unverändert; Weg b: nur der Resend-Key neu) und neuem Worker legt Claude im Browser auf `machsleicht.de/kindergeburtstag` eine Testparty an (Vorname „Test", Datum +21 Tage, kein Foto) und prüft neun Linktypen: (1) Partyseite `party.machsleicht.de/<id>`, (2) Edit-Link `?edit=`, (3) Gast-Link `?g=`, (4) Edit-Link-Mail → Link klicken, (5) Magic-Link `machsleicht.de/kindergeburtstag?plan=<token>` per Mail → klicken, (6) `/e/<slug>` aus `einladung/erstellen`, (7) `paket/ritter/?id=…&tok=…` lädt mit Partydaten, (8) DOI-Mail → `api/newsletter-confirm` antwortet 200, (9) Cron: `node _dev/scripts/check-cron-erinnerung.mjs` im `<alt-repo>` (kein Deploy). Testparty per Edit-Link löschen.
Artefakt: `_dev/messungen/2026-10-XX-altkunden-nachweis.md`: Linktyp | URL-Muster | HTTP | Zeitstempel | TTL-Regel (Partyseite: Partydatum + 14 Tage, ohne Datum 30 Tage, Obergrenze 2 Jahre — `calcTTL`; `plan:` 90 Tage; `wl:` 365; `doi:` 7; `consent:` 3 Jahre; `extimg:` 90; `/e/` stateless); liegt in `_dev/messungen/` (von Stufe 73 ausgenommen, S11).
Beleg: 9/9 Zeilen HTTP 200 oder Resend „delivered"; S48 wiederholt die Tabelle nach dem Livegang.
Stopp: Ein Linktyp bricht → Ursache liegt im Alt-Stack (S5 Weg b?) → vor Phase 3 beheben; kein Livegang mit roter Zeile.

## Phase 2 — Positionierung und Informationsarchitektur (KW 43–44)

Eingang: Phase 1 abgeschlossen. Ausgang: `IA.md` eingefroren, Stufen 73–76 laufen mit Prüfstand-Fällen.

### S21 — Zwecksatz, URL-Baum und `IA.md` endgültig
Phase: 2 · Wer: Claude · Dauer: 3 h · Hängt ab von: S6 (E6–E10, E14, E15, E20) · KW: 43
Tun: `_dev/IA.md` mit (a) dem Zwecksatz aus 0.2; (b) einer Tabelle aller URLs: Pfad | indexierbar | Typ | Werkzeug-Element | Zweck (bei Produkt-/Trust-Seite) | Quelle | Canonical | Inlinks (≥ 2 je indexierbare Seite); (c) App-Shells mit noindex per Meta und per `X-Robots-Tag` plus Self-Canonical (Google: Meta und Header gleichwertig, bei Konflikt gilt die restriktivere Regel — Robots-Meta-Doku); (d) Abschnitt „Doorway-Nachweis" (Winkel 12, R2) mit vier nummerierten Punkten und je Punkt der Prüfstelle: (1) keine Trichterung — kein Link, Redirect oder Canonical in irgendeiner Richtung (Stufe 73 über HTML, JS, JSON, `_redirects`, `wrangler.toml`: 0 Treffer; Alt-`_redirects` einmal gegen `<neu>` gemessen, S22); (2) kein Variantenklon — alt 136 Textseiten mit Motto×Alter-Matrix und Einladungs-Hubs, neu L (8–9) Werkzeug-Seiten ohne beides, Hauptinhalt je Seite ≤ 3 % Überlappung, 0 identische Sätze, ≥ 50 % neue h2 (Stufe 75); (3) kein Zwischenziel — jede indexierbare Seite ist selbst das nutzbare Werkzeug (Planer-Zustand, Spiele-Demo, Rechner) oder eine Produkt-/Trust-Seite mit eigenem Zweck, keine Seite „vor" dem Werkzeug (IA.md-Spalten Werkzeug-Element/Zweck); (4) die alte Domain wird nicht neu auf dieselben Suchanfragen zugeschnitten (Phase 7, Eingriffe = 0). Googles Doorway-Definition (G16): Sites oder Seiten für ähnliche Suchanfragen, die Nutzer auf weniger nützliche Zwischenseiten führen; Beispiele sind mehrere Websites mit leichten Varianten von URL und Startseite. Was der Nachweis nicht beweist: dass Google den gemeinsamen Betreiber nicht wertet (keine Primärquelle; G25 schweigt, Mueller 2020 ist Hinweis) — als ANNAHME markiert. Baum mit E7/E8 angewendet:
```
/                                   indexierbar  Startseite (System)
/planen/                            indexierbar  Flaggschiff, Stufe 1 „Motto wählen"
/planen/ritter/   /planen/piraten/  indexierbar  Werkzeug-Zustand „Motto gewählt" + Mottotext
/planen/<motto>/<alter>/            noindex      Zustand „Alter gewählt → Plan" (aus JSON), noindex,follow per Meta und Header, Self-Canonical
/planen/<motto>/<alter>/einladung/  noindex      Stufe 4 (Einladung + Partyseite)
/planen/<motto>/<alter>/fertig/     noindex      Stufe 5
/einladung/                         indexierbar  Erklärseite Einladung + Partyseite
/spiele/                            indexierbar  Hub mit 8 Demos
/spiele/game-*.html                 noindex      Header + Meta, Referrer-Policy no-referrer
/paket/                             indexierbar  Produktseite
/paket/<motto>/                     noindex      token-personalisiert
/kosten/                            indexierbar  Rechner aus Daten (E20: Launch-Set oder Zyklus 1)
/ueber-uns/                         indexierbar
/impressum/  /datenschutz/          indexierbar, nicht in der Sitemap
/404.html  /410.html                Fehlerseiten
party.<neu>/*                       noindex (Worker-Meta), nicht in der Sitemap
```
Trailing-Slash-Politik: jede Seite als `<pfad>/index.html`, Canonical mit Slash, `.html`-Aufrufe → 301 (S25). Eine Property als Wahrheit: die GSC Domain-Property `<neu>`; keine URL-Präfix-Property.
Artefakt: IA.md, `_dev/config/sitemap-allowlist.json` mit den L Sitemap-Pfaden (9 bei E20 a, 8 bei E20 b).
Beleg: L + 2 indexierbare Zeilen (Sitemap + Impressum + Datenschutz); jede indexierbare Zeile ist Werkzeug-Zustand oder Produkt-/Trust-Seite mit eigenem Zweck; `node -e "console.log(require('./_dev/config/sitemap-allowlist.json').length)"` = L; Abschnitt Doorway-Nachweis mit 4 Punkten und 4 Prüfstellen vorhanden.
Stopp: Eine indexierbare Zeile, die weder Werkzeug-Zustand noch Produkt-/Trust-Seite mit eigenem Zweck ist → Seite streichen oder Zweck benennen; keine Zeile „kommt später".

### S22 — Signal-Trennungs-Matrix als Prüfungen: Stufe 73 erweitern
Phase: 2 · Wer: Claude · Dauer: 3 h · Hängt ab von: S11, S12 (Klasse 15 geschlossen) · KW: 43
Tun: Fünf Prüfungen zusätzlich: (1) Bild-Hashes: `sha256sum` aller `png|jpg|webp|svg` im `<neu-repo>` gegen `_dev/config/alt-bild-hashes.txt` (einmal aus `main acebbc22` erzeugt: `git -C <alt-repo> ls-tree -r acebbc22 --name-only | grep -Ei '\.(png|jpe?g|webp|svg)$' | xargs -I{} sh -c 'git -C <alt-repo> show acebbc22:{} | sha256sum'`) → Schnittmenge 0; (2) JSON-LD: `Organization.name|url|logo`, `WebSite.url`, `sameAs[]` enthalten weder `machsleicht` noch alte Profil-URLs; (3) Footer, Impressum, Über-uns: externe Links nur aus der Host-Allowlist plus Pflichtnennungen der Datenschutzerklärung; (4) Worker, Mail-Templates, ICS: `grep -c machsleicht party-worker.js` = 0; (5) QR-Ziele: `paket-core.js` baut QR ausschließlich aus `PARTY_HOST`; Trailer-Build (nur bei E14): Wasserzeichen-String = neue Marke. Je Prüfung ein Prüfstand-Fall in `_dev/pruefstand/faelle_stufe73-76.py` (dieselbe Datei wie S43), registriert mit `gruppe="stufe73-76"` und Namen `stufe73-<prüfung>`.

Die Matrix, die Stufe 73 abbildet (Winkel 2):

| Signal | Status | Beleg | Prüfung |
|---|---|---|---|
| 301/302/308 alt↔neu | verboten | G1, G6 | Stufe 73 liest `_redirects` und `wrangler.toml` mit (Alt-Host im `<neu-repo>`: 0 Treffer); Alt-Seite: `git -C <alt-repo> show acebbc22:_redirects` ohne `<neu>` (0 Treffer, einmal in S22 gemessen) |
| rel=canonical cross-domain | verboten | G2, G3, G4 | jeder Canonical zeigt auf den eigenen Host |
| gleicher oder sehr ähnlicher Hauptinhalt | verboten, messbar | G3, G5, G15 | Stufe 75 + Playwright-DOM-Vergleich (S23) |
| Links alt→neu oder neu→alt (HTML, Footer, Impressum „weitere Projekte", Mails, ICS, Trailer-Wasserzeichen, QR, Paket-Drucke) | verboten (konservativ) | G18 dokumentiert Links nur im Site-Reputation-Kontext mit nofollow-Empfehlung | 0 Vorkommen „machsleicht" inkl. Worker, Mail-Templates, `paket-core.js`, Trailer-Build; QR-Ziele ausgelesen |
| Organization, sameAs, og:site_name identisch | ANNAHME (G25 ohne Aussage) | — | Prüfung (2) |
| identische Bilder und OG-Bilder | ANNAHME (nirgends dokumentiert) | — | Prüfung (1), Schnittmenge 0 |
| gleiches Template, CSS, Fonts, Spiel-Engine | ANNAHME (nirgends dokumentiert) | — | neues Layout und neue Klassenpräfixe für indexierbare Seiten; `core.js` und die 60 Spiele bleiben (Bolle 03.07.), sind noindex und damit kein Index-Signal |
| Affiliate-Kennungen: Amazon-Tag `machsleicht21-21` (816 Links, 45 JSON) und AWIN-Publisher-ID (`awinaffid` in Deep-Links) | ANNAHME, kein Google-Beleg für beide | — | Amazon: neue Tracking-ID (S18), weil PartnerNet die Site-Liste ohnehin verlangt; AWIN: ID bleibt wie alt (S13), ein zweites Publisher-Konto ist unverhältnismäßig; Stufe 73 prüft `machsleicht21-21` = 0 |
| Betreiberidentität im Impressum, Netlify-, Cloudflare-, Google-Konto | erlaubt | G7 nennt das Konto nur als Change-of-Address-Bedingung; Mueller 2020 (Hinweis) | identisch, nie verfälscht (E13) |
| Umami-Website, Resend-Domain, KV-Namespace | kein Google-Signal belegt | Mueller 2020 (Hinweis) | trotzdem getrennt wegen Datenschutz, Quoten, Zählung (S13, S17, S18) |

Artefakt: Stufe 73 v2, Hash-Liste, 5 Prüfstand-Fälle.
Beleg: Linter-Zeile „Stufe 73: 0 Verbindungen (N geprüfte Dateien, 5 Prüfungen)" (P = 5 registrierte Zusatzprüfungen); `python _dev/pruefstand/pruefstand.py --gruppe stufe73-76 --fall stufe73` → 6/6 Mutationen erkannt (5 S22-Fälle plus der S11-Fall mit zwei Armen; S43 zählt dieselben 6; `pruefstand.py` kennt `--gruppe/--fall/--profil/--laut/--streng`, keine `--stufe`-Option — Alt-Stand 109 Zeilen); `git -C <alt-repo> show acebbc22:_redirects | grep -c '<neu>'` = 0 (einmalig, Datum notiert).
Stopp: Eine Prüfung erkennt ihre Mutation nicht (blindes Gate) → die Stufe gilt als nicht vorhanden, bis der Fall rot wird.

### S23 — Überlappungs-Skript (Stufe 75) und Playwright-DOM-Vergleich
Phase: 2 · Wer: Claude · Dauer: 4 h · Hängt ab von: S21 · KW: 43
Tun: `_dev/scripts/check-alt-neu-ueberlappung.py`: liest `_dev/config/quellen.json` (neue URL → alte Quellpfade + JSON-Dateien), holt Alt-Text per `git -C <alt-repo> show acebbc22:<pfad>`, extrahiert sichtbaren Text wie `check-sichtbarer-text.py`, normalisiert Hosts und Marken, segmentiert nach h2, bildet 8-Wort-Shingles, meldet je Abschnitt und je Seite den Anteil gemeinsamer Shingles, identische Sätze ≥ 35 Zeichen (minus Allowlist), identische FAQ-Strings im JSON-LD und den Anteil neuer h2 — zusätzlich gegen alle 136 Sitemap-Seiten der alten Domain (Liste aus `git -C <alt-repo> show acebbc22:sitemap.xml`), mit Ausgabe des Maximalwerts und der zugehörigen Alt-URL je neuer Seite ((L + 2) × 136 Vergleiche); Grenzen unverändert. Grenzen und Herleitung: ≤ 5 % je Abschnitt, ≤ 3 % je Seite — die 15 alten Mottoseiten liegen untereinander bei 7,7 % Median und gelten mit Eigenanteil ≥ 90 % als unique (Stufe 62), die Einladungs-Hubs bei 62,7 % als Dubletten; alt↔neu muss deutlich unter dem Geschwister-Niveau liegen. Dazu 0 identische Sätze ≥ 35 Zeichen außer einer namentlichen Allowlist für Bedienelemente (analog Stufe 62), 0 identische FAQ-Fragen oder -Antworten im JSON-LD, keine HowTo-Blöcke, ≥ 50 % der h2 kommen in der Quellseite nicht vor. Das Gerüst wird nicht künstlich variiert (G16 definiert Scaled Content über Masse ohne Nutzwert, nicht über Überschriften); es ist anders, weil ein Werkzeug-Zustand anders aufgebaut ist als eine Ratgeberseite. Grenze der Metrik: Shingles messen Wortgleichheit, nicht Sinngleichheit; Paraphrasen fängt der Review-Winkel „Satz für Satz gegen die Quellseite" (S41, R20). Die JSON-Prosa der 45 Motto-Dateien (rund 444.000 Tokens, gezählt heute) zählt als Quelle: Fakten daraus sind Rohstoff, Sätze daraus sind Treffer. `_dev/scripts/compare-rendered.mjs`: Playwright/Chromium (`npx -y playwright install chromium`) öffnet je indexierbarem Werkzeug-Zustand das Alt-Pendant (`machsleicht.de/kindergeburtstag?motto=ritter`) und den Staging-Zustand, wartet auf `networkidle`, liest `document.body.innerText`, rechnet dieselbe Metrik; für noindex-Zustände prüft es `meta[name=robots]` und den Antwort-Header.
Artefakt: beide Skripte; Stufe 75 in `validate-all.sh` ruft das Python-Skript; der Playwright-Lauf steht im Deploy-Protokoll (S60), nicht im Linter (Laufzeit).
Beleg: Prüfstand-Fall `stufe75-ueberlappung` (in derselben Datei `_dev/pruefstand/faelle_stufe73-76.py`, `gruppe="stufe73-76"`): eine 1:1 kopierte alte Mottoseite unter neuem Pfad → Stufe 75 rot „Seite 100 %"; Allowlist-Sätze erzeugen keinen Treffer; Laufzeit < 120 s für (L + 2) × 136 Vergleiche.
Stopp: `<alt-repo>` nicht erreichbar → Skript bricht laut ab, kein stilles Grün.

### S24 — Sitemap-Generator mit Allowlist, ehrliches lastmod, Stufe 76
Phase: 2 · Wer: Claude · Dauer: 2 h · Hängt ab von: S21 · KW: 44
Tun: `generate-sitemap.js` forken: `SITEMAP_EXCLUDE` (Blocklist, 18 Einträge) durch die Allowlist ersetzen; DOMAIN aus `site.json`; lastmod-Logik unverändert (Autor-Datum aus Git, Konvention „Technisch:", Abbruch bei Shallow-Clone); Abbruch, wenn eine Allowlist-URL keine Datei hat oder eine indexierbare Datei fehlt. Stufe 76: (a) Sitemap-URL-Zahl = Allowlist-Länge; (b) jede Sitemap-URL hat eine Datei mit Self-Canonical mit Slash; (c) keine noindex-Seite in der Sitemap; (d) `generate-seo-pages.js` existiert nicht (Alt-Landmine: schrieb eine Sitemap mit 24 URLs, Zeilen 821–824); (e) Diff gegen die Sitemap im HEAD: > 3 hinzugefügt, > 2 entfernt oder lastmod auf > 3 URLs ohne Inhalts-Diff → rot (Massenänderung); jede Einzelentfernung braucht eine Zeile in `SITEMAP-CHANGELOG.md`. Google ignoriert `priority` und `changefreq`, nutzt lastmod nur bei nachprüfbarer Richtigkeit (G11) — der Generator schreibt beides nicht.
Artefakt: Generator, Stufe 76, `SITEMAP-CHANGELOG.md` mit Kopf.
Beleg: `node _dev/scripts/generate-sitemap.js` → „L URLs, L lastmod aus Git, 0 heute wegen Working Tree" (L = Allowlist-Länge); Stufe 76 grün; Prüfstand-Fall `stufe76-massenaenderung` (in derselben Datei `_dev/pruefstand/faelle_stufe73-76.py`, `gruppe="stufe73-76"`): Allowlist um 4 Einträge erweitert → rot „Massenänderung".
Stopp: lastmod uniform → Generator-Abbruch; nie von Hand stempeln (Lehre 01.06.: 126 URLs auf ein Datum).

### S25 — Doppel-Erreichbarkeit schließen, Header-Politik, 404/410
Phase: 2 · Wer: Claude · Dauer: 2 h · Hängt ab von: S21 · KW: 44 (Repo-Beleg); Staging-Messung nach S31/S32, spätestens in S42 (1)
Tun: `_redirects` aus der Allowlist generiert: `/<pfad>.html /<pfad>/ 301` und, falls Netlify ohne Slash nicht selbst 301 liefert (Pretty URLs „forwards/rewrites" — auf Staging messen), `/<pfad> /<pfad>/ 301`; Netlify kennt kein Endungsmuster wie `/*.html`. Sperrregeln (`/_dev/* /404.html 404!` usw.) bleiben. `_headers` wie `_redirects` aus Allowlist und Dateiliste generiert (`_dev/scripts/generate-headers.js`): für `/*` `Strict-Transport-Security: max-age=31536000; includeSubDomains`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`; je indexierbarem Pfad eine eigene Regel `Content-Security-Policy: frame-ancestors 'none'`; je Spieldatei eine Regel `/spiele/game-<name>.html` mit `Content-Security-Policy: frame-ancestors 'self' https://party.<neu>` (die Demo-iframes auf `/spiele/`, `/planen/ritter/`, `/planen/piraten/` laden vom eigenen Origin, die Partyseite von `party.<neu>`; der Origin-Vergleich ist exakt, Apex ≠ Subdomain), `Referrer-Policy: no-referrer`, `X-Robots-Tag: noindex, nofollow`; kein `X-Frame-Options` (kollidiert mit CSP; die Netlify-Headers-Doku dokumentiert kein Überschreiben einer `/*`-Regel für Unterpfade); `/paket/<motto>/`, `/api/*`, `/.netlify/functions/*` noindex; die Zustands-Shells über `/planen/:motto/:alter/*` mit `X-Robots-Tag: noindex, follow` (Netlify-Headers-Doku: Platzhalter nur am Segmentanfang und ohne `/`; Wildcards matchen jedes Zeichen, auch `/` — `/planen/*/*/` griffe mehrdeutig; Wirkung auf Staging messen: `/planen/ritter/` bekommt den Wert „noindex, follow" nicht, `/planen/ritter/6-8/` bekommt ihn). Stufe 74 (d), ab hier geprüft: jede Sitemap-URL hat in `_headers` eine eigene Regel `Content-Security-Policy: frame-ancestors`; Prüfstand-Fall `stufe74-csp` für 74 (d) (in derselben Datei `_dev/pruefstand/faelle_stufe73-76.py`, `gruppe="stufe73-76"`): eine Allowlist-URL ohne `frame-ancestors`-Regel → rot (Stufe 74 damit 2 Fälle). `404.html`, `410.html` neu getextet mit Weg zu `/planen/`. `www.<neu>` → Apex übernimmt Netlify (S14).
Artefakt: `_redirects`, `_headers`, 404/410.
Beleg: (1) Repo-Beleg in KW 44: generierte `_redirects` und `_headers` liegen vor; Stufe 74 (d) grün: jede Allowlist-URL hat eine `frame-ancestors`-Regel (Treffer = L von L); Regeln `'none'` = L + 2 (Allowlist + Impressum + Datenschutz); Spielregeln `'self' https://party.<neu>` = `ls spiele/game-*.html | wc -l` (60). (2) Staging-Messung, weil die gemessenen Seiten in KW 44 noch nicht existieren — die Shell-Messungen (`/planen/ritter/`, `/planen/ritter/6-8/`) nach S31/S32, die Allowlist-Schleife in S42 (1), weil die letzte Allowlist-Seite erst in S37/S38 entsteht: Schleife über die Allowlist: `curl -sI <url>` → 200; `<url ohne Slash>` → 301 auf die Slash-Form; `<url>.html` → 301; `/gibtesnicht` → 404 mit eigener Seite; je indexierbarer URL 4 Header (`curl -sI <url> | grep -ciE 'strict-transport|nosniff|referrer-policy|content-security-policy'` = 4 — mit `-i`, HTTP/1.1 liefert Großschreibung) und 0 × `x-frame-options`; `curl -sI https://staging…/spiele/game-wappen-ritter.html | grep -i content-security-policy` enthält `'self' https://party.<neu>`; `curl -sI https://staging…/planen/ritter/ | grep -ic 'noindex, follow'` = 0 (der Staging-`/*`-Wert „noindex, nofollow" aus S15 enthält den String nicht) und `curl -sI https://staging…/planen/ritter/6-8/ | grep -ic 'noindex, follow'` = 1.
Stopp: `.html` und Slash-Form beide 200 → explizite 301-Zeilen bleiben Pflicht, erneut messen.

### S26 — IA abnehmen und einfrieren
Phase: 2 · Wer: Bolle · Dauer: 0,5 h · Hängt ab von: S21–S24, S25 (1) · KW: 44
Tun: IA.md lesen, je indexierbarer Zeile „ja" zu Werkzeug-Zustand oder Produkt-/Trust-Zweck, Zeile „IA eingefroren am <Datum>, L Sitemap-URLs (E20: 9 oder 8)" eintragen; Claude setzt Tag `ia-final`. Ab hier gilt die Massenänderungs-Grenze auch für Staging; URLs sind vor dem Livegang endgültig.
Artefakt: IA.md mit Freigabezeile; Tag `ia-final`.
Beleg: `git tag -l ia-final | wc -l` = 1; Stufe 76 vergleicht die Allowlist gegen den Tag (unverändert).
Stopp: Bolle streicht oder ergänzt → zurück zu S21, neuer Tag; nach dem Livegang keine URL-Änderung mehr.

## Phase 3 — Launch-Set bauen (KW 44–47)

Eingang: Tag `ia-final`. Ausgang: L Sitemap-URLs plus Impressum und Datenschutz auf Staging in Endqualität. L + 2 gegatete Stücke (11 bei E20 a, S29–S39) in vier Wochen = 2,75 je Woche gegen belegte 4–5; S34 liegt in KW 46 und S37 in KW 47, damit keine Woche mit Reserve über 30 h steigt (G). Pipeline-Regel: während ein Review läuft, wird das nächste Stück gebaut.

### S27 — Rohstoff-Inventar und Gerüst-Plan je Launch-Seite
Phase: 3 · Wer: Claude · Dauer: 2 h · Hängt ab von: S26 · KW: 44
Tun: `_dev/config/quellen.json` füllen (neue URL → alte Quellpfade, JSON-Dateien). Je Seite ein Brief `_dev/review/launch-set/<seite>.md`: Zweck in einem Satz, Werkzeug-Element oder Produkt-/Trust-Zweck, Zielwortzahl (D), Rohstoff-Fakten mit Datenquelle im Repo, Gerüst (h2-Liste, ≥ 50 % neu gegen die Quelle), Bilderliste (eigene), Inlinks (≥ 2), FAQ-Fragen neu (aus den Umami-Suchbegriffen aus S2 und den Playtests, nicht aus alter FAQ). `LEKTIONEN.md` und `OFFENE-REVIEW-PUNKTE.md` sind Pflichtteil jedes Schreib- und Review-Prompts.
Artefakt: L + 2 Briefs (11 bei E20 a), quellen.json.
Beleg: `ls _dev/review/launch-set | wc -l` = L + 2; Stufe 75 im Trockenlauf meldet „Datei fehlt" je Seite, kein Abbruch.
Stopp: Brief ohne Werkzeug-Zustand oder Produkt-/Trust-Zweck oder ohne Datenquelle → Seite verlässt das Launch-Set.

### S28 — Eigene Fotos: Paket-Drucke, Portrait
Phase: 3 · Wer: Bolle · Dauer: 2 h (davon 0,25 h Demo-Foto in KW 42) · Hängt ab von: S27 (Demo-Foto: S10) · KW: 42 (Demo-Foto) / 44 (Rest)
Tun: Zuerst, bereits in KW 42: ein Demo-Foto für die Spiele-Vorschau ohne Kindergesicht (z. B. Hände mit Papierkrone) → `spiele/core/demo-hand.jpg`, Ersatz für das nicht übernommene `demo-kid.jpg` (S10, S11 (3), S35). Dann in KW 44: Pakete Ritter und Piraten aus `paket/<motto>/` drucken, je Motto 6–10 Fotos bei Tageslicht (Tisch, Hände, Urkunde, Spielkarte — keine Kindergesichter); ein Portrait Marie-Therese Bollweg für `/ueber-uns/`; JPEG ≥ 2.000 px nach `_dev/bilder-roh/`. Claude verkleinert (WebP ≤ 150 KB, Breiten 1200/600) und setzt `width`/`height` (CLS).
Artefakt: ≥ 13 Rohfotos plus `spiele/core/demo-hand.jpg`.
Beleg: `ls _dev/bilder-roh | wc -l` ≥ 13; `test -f spiele/core/demo-hand.jpg`; Stufe 73 Bild-Hash-Schnittmenge = 0.
Stopp: Keine Drucke, kein Licht → `/paket/` wird ohne eigene Fotos nicht veröffentlicht (0.7), die anderen Seiten tragen Produkt-Screenshots aus S40.

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
Tun: `history.replaceState` (eine Stelle, Alt-Zeile 4472) und `goStage` ersetzen durch `history.pushState` je Zustand auf `/planen/<motto>/`, `/planen/<motto>/<alter>/`, `…/einladung/`, `…/fertig/` mit eigenem `<title>` (Google: History API statt Fragmente, eigene Titel je Zustand — JavaScript-SEO-Doku); `popstate` stellt den Zustand her. Direktaufrufe bedient Netlify über statische Shells `planen/<motto>/<alter>/[einladung|fertig/]index.html` ohne sichtbaren Text: `meta robots noindex,follow` plus `X-Robots-Tag: noindex, follow` (S25-Regel `/planen/:motto/:alter/*`) und Self-Canonical — kein Canonical auf die Motto-Ebene, weil Google davon abrät, noindex zur Steuerung der Canonical-Wahl innerhalb einer Site einzusetzen, und noindex plus Fremd-Canonical ein gemischtes Signal ist (G2); Titel „Dein <Motto>-Plan für <Alter> — Entwurf", Start des Werkzeugs mit Parametern. Stufe 74b: jede Datei unter `planen/*/*/` trägt `noindex,follow` und einen Self-Canonical; ein Canonical auf einen anderen Pfad macht die Stufe rot.
Artefakt: 18 Shells (2 Mottos × 3 Alter × 3 Tiefen), aus einer Vorlage erzeugt.
Beleg: `curl -sI https://staging…/planen/ritter/6-8/ | grep -ic 'noindex, follow'` = 1 (nach Header-Wert, weil Staging zusätzlich die `/*`-Zeile „noindex, nofollow" aus S15 trägt) und `grep -c noindex planen/ritter/6-8/index.html` = 1; `grep -c 'rel="canonical" href="https://<neu>/planen/ritter/6-8/"' planen/ritter/6-8/index.html` = 1; Playwright: Zurück-Taste vom Plan zur Motto-Ebene behält den Zustand; Umami erfasst Pfadwechsel.
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
Phase: 3 · Wer: Claude · Dauer: 5 h · Hängt ab von: S27, S39, S12 (Partyseiten-CSP) · KW: 46
Tun: Neu: wie Einladung und Partyseite in einem Schritt entstehen (Plan vor Einladung, bindend 08.09.), was die Partyseite kann (Rückmeldung, Gästeliste, Wunschliste mit Werbekennzeichnung Stufe 58, Foto, Erinnerungsmail 7 Tage vorher — der Cron existiert), WhatsApp-Share; echte Screenshots einer Testparty auf `party.<neu>`; Werkzeug-Element: eine eingebettete Live-Demo-Partyseite (Testparty mit Vorname „Demo", Datum weit in der Zukunft, ohne Foto, auf `party.<neu>` angelegt und per iframe eingebunden; `calcTTL` deckelt die Lebensdauer auf 2 Jahre — einmal messen, dass `expiration` gesetzt ist (Claude im `<neu-repo>`-Root, Cloudflare-Token von Bolle wie S4, 1 Tag): `npx -y wrangler kv key list --binding PARTY --remote --prefix "party:<demo-id>"` zeigt `expiration` (Unix-Sekunden) = Partydatum + 14 Tage, höchstens 2 Jahre; Erneuerungstermin im INDEX-LOG-Kopf, Lesung in S61); Button → `/planen/`. Rohstoff: `/einladung/whatsapp/`, `/einladung/text/`; die 30 Hub- und Vorlagen-Seiten sind Negativbeispiel, nicht Quelle. 700–1.000 Wörter. Jeder Funktionssatz hat eine Worker-Route als Beleg (`/api/create`, `/api/party`, `/api/photo`, `/api/invphoto`, `/api/plan`, `/api/waitlist`, `/api/newsletter-confirm` — 7 Routen, gezählt heute).
Artefakt: `einladung/index.html`.
Beleg: Stufe 75 gegen `einladung/whatsapp/index.html`, `einladung/text/index.html`, `einladung/index.html` ≤ 3 %; Demo-iframe rendert ohne CSP-Fehler (S42 (6)); Review 0 MAJOR; Funktionssätze ↔ Routen-Tabelle im Brief vollständig (Lektion L1).
Stopp: Funktionsversprechen ohne Route → Satz raus.

### S35 — `/spiele/` Hub, 8 Spiele nach Sweep, Playtest
Phase: 3 · Wer: Claude (Playtest: Bolle) · Dauer: 6 h (Claude 5 / Bolle 1) · Hängt ab von: S11, S27, S28 (Demo-Foto) · KW: 46
Tun: Hub 600–900 Wörter neu: was Einladungsspiele sind, je Spiel eine Demo (iframe mit `?name=Demo&foto=/spiele/core/demo-hand.jpg` — eigenes Foto aus S28; `demo-kid.jpg` wird nicht übernommen), Alterszuordnung aus den Daten, Ablauf Gast → Spiel → Zusage. 8 Spiele (Ritter 4, Piraten 4) auf Staging testen; Playtest-Protokoll je Spiel: Gerät, Dauer, Reveal erreicht ja/nein — Bewertung per Playtest, nicht Prosa (Bolle). In `core.js` den `setPhoto`-onerror-Fallback umsetzen (höchste Prod-Pass-Priorität laut OFFENE-REVIEW-PUNKTE, von 6 Gutachten geflaggt) mit Cache-Bump `?v=` für alle 60 Spiele.
Artefakt: `spiele/index.html`, Playtest-Protokoll, core.js-Fix.
Beleg: 8/8 Zeilen „Reveal erreicht"; `curl -sI https://staging…/spiele/game-wappen-ritter.html | grep -ic 'x-robots-tag: noindex'` ≥ 1 (Staging: zwei passende Regeln — die `/*`-Zeile aus S15 und die Spielregel; Produktionswert = 1 in S46) und Repo-Beleg `grep -c '^/spiele/game-wappen-ritter.html' _headers` = 1; Stufe 73 core.js 0 Alt-Host; Review Hub 0 MAJOR.
Stopp: Ein Spiel ohne Reveal → bleibt im Repo, erscheint nicht im Hub; der Text nennt dann die wahre Zahl.

### S36 — `/paket/` Produktseite und Pakete Ritter/Piraten
Phase: 3 · Wer: Claude · Dauer: 5 h · Hängt ab von: S28, S11 · KW: 46
Tun: Produktseite 500–800 Wörter neu: Inhalt des Pakets als Liste aus den Manifesten (Daten, nicht getippt — Stufe 34-Klasse), Fotos aus S28, „kostenlos im Pilot" ohne Preis und ohne „geplant" (E16), Entstehung aus der Partyseite (`/paket/<motto>/?id=&tok=`); Werkzeug-Element: die Paket-Vorschau der Maschine (`/paket/<motto>/?demo=1`) eingebettet auf der Produktseite. `paket/ritter/`, `paket/piraten/` mit Testparty auf Staging rendern, PDF drucken, QR scannen. `paket/prinzessin/` (Piraten-Inhalt, WIP seit 12.08.) kommt nicht mit.
Artefakt: `paket/index.html`, zwei lauffähige Pakete, zwei Druck-PDFs in `_dev/druck-test/`.
Beleg: Stufen 15, 22, 23, 29, 35 grün; QR-Scan landet auf `party.<neu>/<id>`; Review 0 MAJOR.
Stopp: Stufe 23 rot (fremdes Motto gedruckt) → das Paket geht nicht live.

### S37 — `/kosten/` Rechner-Ratgeber
Phase: 3 · Wer: Claude · Dauer: 5 h · Hängt ab von: S27, S6 (E20: Launch-Set oder Zyklus 1) · KW: 47
Tun: Der einzige Ratgeber im Launch-Set, weil er ein eigenes Datenwerkzeug hat: Rechner „Kosten je Kind" aus `shoppingList.priceEur` der Launch-Motto-JSON (Invariante L4), Eingaben Motto, Alter, Kinderzahl → Tabelle; 800–1.200 Wörter neu (Rohstoff `/kindergeburtstag-kosten`); FAQ neu; Werbekennzeichnung bei Affiliate-Links (Stufe 58).
Artefakt: `kosten/index.html`, `js/kosten.js`.
Beleg: Stufe 75 ≤ 3 %; Rechner-Ergebnis = Summe aus JSON in 3 Stichproben (Skript analog `check-kosten-prosa.py`); Review 0 MAJOR.
Stopp: Zahl im Fließtext ≠ Datenwahrheit (Stufe 44-Klasse) → Text korrigieren, nie die Daten.

### S38 — Trust: `/ueber-uns/`, `/impressum/`, `/datenschutz/`
Phase: 3 · Wer: Claude (Text), Bolle (Identität, AV-Verträge) · Dauer: 6 h (Claude 5 / Bolle 1) · Hängt ab von: S28, S17, S18 · KW: 46
Tun: Über-uns mit echter Person (Marie-Therese Bollweg), Foto, Who/How/Why (Google: Urheberschaft, Entstehung, Zweck transparent, Einsatz von Automatisierung offenlegen — Helpful-Content-Doku), Kontakt `kontakt@<neu>`, keine Versprechen ohne Produkt, kein Hinweis auf andere Projekte. Impressum nach § 5 DDG: Name, Anschrift, E-Mail, Hinweis Kleinunternehmerin § 19 UStG — identische Identität ist Pflicht und erlaubt (E13). Datenschutz komplett neu: Netlify (Hosting, Logs), Cloudflare (DNS, Proxy, Worker, KV mit Fristen aus dem Code: Partydaten 14 Tage nach Partydatum, Magic-Link 90 Tage, DOI 7 Tage, Consent 3 Jahre, `extimg` 90 Tage), Resend (Versand, Audience, DOI), Umami (cookielos, Region aus S18), WhatsApp-Share (Nutzer teilt den Link selbst), Amazon/AWIN (Affiliate), keine Google Fonts (self-hosted; die alte Erklärung nennt Google Fonts, obwohl keine geladen werden), kein unpkg/cdnjs. AV-Verträge: Netlify, Cloudflare, Resend, Umami — von Bolle akzeptiert, Liste mit Datum in `_dev/RECHT.md`. Normen vor dem Schreiben primär geprüft (gesetze-im-internet.de, 01.10.2026): § 5 DDG, § 7 UWG, § 19 UStG.
Artefakt: drei Seiten, RECHT.md.
Beleg: Stufe 73: externe Hosts nur Pflichtnennungen; `grep -c 'Google Fonts' datenschutz/index.html` = 0; Review mit Rechtswinkel 0 MAJOR; RECHT.md listet 4 AV-Verträge mit Datum.
Stopp: Ein AV-Vertrag fehlt → Livegang erst mit Vertrag (Bolle-Klick), Dienst bleibt in der Erklärung genannt.

### S39 — Worker-Templates in neuer Marke: Partyseite, Mails, ICS
Phase: 3 · Wer: Claude · Dauer: 4 h · Hängt ab von: S13 · KW: 44–45 (1 h Template-Inventar in KW 44, 3 h in KW 45)
Tun: Sichtbare Texte in `guestPageFull()`, Editor, Mail-HTML (Edit-Link, Magic-Link, DOI, Erinnerung), ICS neu formulieren (noindex, kein Cluster-Risiko, aber Marke, Host, Footer); Footer-Links auf `/impressum/`, `/datenschutz/` von `<neu>`; Rückweg „Eigene Partyseite erstellen" → `/planen/?ref=`; Umami-Snippet mit neuer Website-ID an den 2 Worker-Stellen; `Referrer-Policy: no-referrer`. Deploy mit `npx -y wrangler deploy` (Token von Bolle, 1 Tag).
Artefakt: Worker-Version mit neuen Templates.
Beleg: Stufe 60 grün; Testparty im Staging-Flow → 4 Mails „delivered" im Resend-Log mit Absender `kontakt@<neu>`; `grep -c machsleicht party-worker.js` = 0; Zustellprobe an je ein Gmail-, Outlook- und GMX-Postfach landet im Posteingang (Risiko R16).
Stopp: Resend „domain not verified" → S17 unvollständig; Mail im Spam-Ordner → DMARC/SPF prüfen vor dem nächsten Schritt.

### S40 — Produkt-Screenshots und OG-Bilder per Playwright
Phase: 3 · Wer: Claude · Dauer: 2 h · Hängt ab von: S30–S37 (S37 nur bei E20 a: OG-Bild für `/kosten/`), S39 · KW: 47
Tun: `_dev/scripts/screenshots.mjs`: Playwright öffnet Staging-Zustände (Planer Stufe 1 und 3, Partyseite der Testparty, Spiel-Demo, Paket-Vorschau), schreibt PNG 1200×630 (OG) und 1200×800 (Inhalt), konvertiert zu WebP; nur echte Tool-Screenshots (Doku-Lehre: nur echte Screenshots sind deploy-würdig); `og:image` je Seite eine eigene Datei; `width`/`height` gesetzt.
Artefakt: `bilder/` mit ≥ 12 Dateien.
Beleg: Stufe 71 (Vorschaubild existiert) grün; Stufe 73 Hash-Schnittmenge 0; `curl -sI <og-url>` → 200 je Sitemap-URL.
Stopp: Screenshot zeigt Testnamen oder Platzhalter → Zustand neu aufnehmen.

### S41 — Review-Welle je Stück (Helfer V4.1, Stufen 2–4)
Phase: 3 · Wer: Claude bedient den Tab, Bolle liest Befunde · Dauer: 1 h je Stück, L + 2 Stücke (11 bei E20 a; KW 44: 2, KW 45: 3, KW 46: 3, KW 47: 3; Bolle liest Befunde 0,5/1/1/0,5 h) · Hängt ab von: je Stück · KW: 44–47
Tun: Je Stück nach Linter 0 FAIL: frischer claude.ai-Tab (Chrome-MCP, Bolle-Device), target-blind; Prompt mit Ist-Analyse-Auszug, Quellseite (raw-SHA-URL alt), neuer Seite (raw-SHA-URL `<neu-repo>`; Review-Commits auf `staging` dürfen `[skip netlify]` tragen, der Branch-Deploy ist für den Reviewer nicht nötig — nur der letzte Push vor S45 muss ohne Marker erfolgen, S42), Winkel-Katalog inkl. „Paraphrase Satz für Satz gegen die Quelle", „Zahl ohne Beleg", „Versprechen ohne Route", „Verbindung alt/neu", LEKTIONEN.md und OFFENE-REVIEW-PUNKTE.md; Reviewer liefert Zitat je Finding, MAJOR/MINOR/UNSICHER, Score nur Telemetrie. Stufe 3: jedes Finding gegen Primärquelle oder Repo prüfen, Fix deterministisch, Diff-Re-Check im selben Tab. Fallback-Modell nach L2.
Artefakt: `_dev/review/launch-set/<seite>-befunde.md`, SESSION-NOTES-Zeile, LEKTIONEN.md-Ergänzung je neuem Muster.
Beleg: L + 2 von L + 2 Stücken mit „0 offene MAJOR" und Re-Check-Zeile.
Stopp: Reviewer-Modell nicht verfügbar → L2-Fallback; nie WebFetch oder Subagent als Gutachter.

### S42 — Pre-Launch-Crawl auf Staging
Phase: 3 · Wer: Claude · Dauer: 3 h · Hängt ab von: S29–S40; (1)–(2) nach dem letzten Push von S41, S43, S44, S52 · KW: 47
Tun: Vorbedingung: der letzte Push auf `staging` vor S45 erfolgt ohne `[skip netlify]` am jüngsten Commit, damit der Branch-Deploy den aktuellen Stand zeigt (Netlify: der Marker am jüngsten Commit gilt für den ganzen Push). S42 (1)–(2) laufen nach dem letzten `staging`-Push vor S45 — S41, S43, S44 und S52 pushen vorher — oder werden nach jedem weiteren Push wiederholt; S45 (4) trägt die Branch-Deploy-SHA ein und vergleicht sie mit `git rev-parse staging`. (1) `check-sitemap-live.py --sitemap <staging>/sitemap.xml --host-override staging--<neu-site>.netlify.app` (neue Option ersetzt den Host): Status, Redirects, Canonical = self, noindex-Konflikt, h1; (2) Screaming Frog (kostenlos bis 500 URLs) oder `_dev/scripts/crawl-staging.py`: allen internen Links folgen → 0 × 404, 0 Redirect-Ketten, Titles und Descriptions unique, Bilder mit alt, Inlinks ≥ 2 je Sitemap-URL, 0 verwaiste Seiten; (3) Rich Results Test je Sitemap-URL: 0 Fehler; Stufe 72 mit Zusatz „je @type höchstens ein Block" (alt: Startseite 4× WebApplication, fünf Seiten doppelte HowTo/FAQ); (4) PageSpeed Insights mobil je URL: Performance ≥ 90, LCP ≤ 2,5 s, CLS ≤ 0,1 (Laborwerte; CrUX-Schwellen aus der CWV-Bericht-Hilfe); (5) Playwright 360×800: kein horizontaler Scroll; (6) Playwright: Demo-iframes rendern mit sichtbarem Inhalt und 0 CSP-Konsolenfehlern auf `/spiele/`, `/planen/ritter/`, `/planen/piraten/` (Spiele), `/einladung/` (Partyseiten-iframe von `party.<neu>`) und `/paket/` (`?demo=1`-iframe).
Artefakt: `_dev/messungen/2026-11-XX-prelaunch-crawl.md` (Commit: siehe S45 Artefakt).
Beleg: Branch-Deploy-SHA = `git rev-parse staging`; Tabelle L URLs × 9 Prüfspalten — Status, Redirect, Canonical = self, noindex-Konflikt, h1, Crawl (0 × 404, Inlinks ≥ 2, Titles/Descriptions unique, alt, 0 verwaist), Rich Results, PSI mobil, Playwright (360×800 ohne Querscroll; Demo-iframes) → 9 —, alle grün.
Stopp: Eine rote Zelle → kein Go (S45 referenziert diese Datei).

### S43 — Prüfstand-Fälle für die Stufen 73–76; Entscheidung zum Prüfstand-Betrieb
Phase: 3 · Wer: Claude · Dauer: 1 h · Hängt ab von: S22–S25 · KW: 47
Tun: Der Prüfstand (`_dev/pruefstand/`, offline seit 11.09.) läuft vor dem Launch nur für die vier neuen Stufen 73–76 (je definiertem Fall eine Mutation, die rot werden muss: Stufe 73 sechs Fälle — `stufe73-sweep` aus S11 mit zwei Armen und die fünf S22-Prüfungen `stufe73-<prüfung>` —, Stufe 74 zwei Fälle — `stufe74-noindex` aus S15 und `stufe74-csp` aus S25 —, Stufe 75 `stufe75-ueberlappung` aus S23 und Stufe 76 `stufe76-massenaenderung` aus S24; alle zehn Fälle liegen in `_dev/pruefstand/faelle_stufe73-76.py` mit `gruppe="stufe73-76"` und Namen `stufe7X-…`, damit `--gruppe stufe73-76` sie alle erfasst und `--fall stufe73` die sechs der Stufe 73); die Stufen 60 und 72 laufen im Linter ohnehin. Der volle Prüfstand ist kein Launch-Gate; Inhalte gatet der frische Tab (S41). Nach dem Launch bekommt jede neue Stufe ihren Fall im selben Commit.
Artefakt: `_dev/pruefstand/faelle_stufe73-76.py`.
Beleg: `python _dev/pruefstand/pruefstand.py --gruppe stufe73-76` → erkannte Mutationen = Zahl der Fälle in den Prüfstand-Dateien (73: 6, 74: 2, 75: 1, 76: 1 → 10/10), 0 blinde Gates.
Stopp: Blindes Gate → Stufe reparieren vor Go; eine Stufe, die nichts findet, gilt als nicht vorhanden.

### S44 — Ende-zu-Ende-Skript und Cron-Test auf Staging
Phase: 3 · Wer: Claude · Dauer: 3 h · Hängt ab von: S31, S35, S36, S39 · KW: 47
Tun: `_dev/scripts/e2e-geburtstag.mjs` (Playwright): Staging `/planen/` → Ritter → 6–8 → Plan sichtbar → Einladung + Partyseite (POST `party.<neu>/api/create`, Staging-Origin steht in CORS seit S12) → Partyseite öffnen → Demo-iframe auf `/einladung/` rendert (Partyseite von `party.<neu>` sichtbar, 0 CSP-Fehler) → Spiel starten → Reveal → Zusage „Ja" → Gästeliste zeigt 1 → `paket/ritter/?id&tok` rendert → Edit-Link-Mail „delivered" → `check-cron-erinnerung.mjs` gegen den neuen Worker (Erinnerung 7 Tage vorher) → Party löschen. Laufzeit je Schritt protokollieren; nur gemessene Zeit darf später als Zusage auf der Startseite stehen.
Artefakt: Skript, Protokoll mit einem Zeitstempel je Pfeil des Ablaufs (15 Knoten → 14 Laufzeiten; die Zahl gibt das Skript aus).
Beleg: Exit 0; Mail „delivered"; KV-Writes des Laufs ≤ 15 (QUOTEN.md).
Stopp: Ein Schritt scheitert → Fix → kompletter Neulauf (fix-induzierte Fehler sind die häufigste spätere MAJOR-Quelle).

## Phase 4 — Livegang (KW 48–49)

Eingang: Phase 3 abgeschlossen. Ausgang: siehe Übersicht. Launch-Praxis (Winkel 24): Google beschreibt für Umzüge ohne URL-Änderung den Test auf einem temporären Hostnamen, Log-Beobachtung und einen normalen Crawl-Rückgang danach → S15, S42, S44, S49. Google-Vertreter empfehlen für Staging Passwortschutz vor noindex (SEJ 07.04.2023, Sekundärquelle) → Abweichung: Netlifys Free-Plan-Schutz „Private" sperrt Reviewer-Tab und Playwright aus, deshalb noindex per Deploy-Kontext, Stufe 74 und Messung des Verschwindens (S46). Search Console und Analytics vor dem ersten Aufruf, Sitemap nach Verifikation (Semrush 17.08.2026, Sekundärquelle) → S16, S18, S50 nach 72 h. Redirects und Change of Address (G6, G7) → Abweichung per Entscheidung Bolle 01.10. Gestaffelter Ausbau (G21) → Phase 6 im 14-Tage-Takt.

### S45 — Go/No-Go-Checkliste mit 13 Kontrollzahlen
Phase: 4 · Wer: beide · Dauer: 1,5 h (Claude 0,5 / Bolle 1) · Hängt ab von: S41–S44 · KW: 48 (Mo 23.11.2026)
Tun: `_dev/messungen/2026-11-23-go-nogo.md`, jede Zeile mit Kommando oder Pfad und Ist-Wert: (1) `bash validate-all.sh` → PASSED, 0 FAIL; (2) Stufe 75 je Sitemap-URL unter Grenze (Ausgabe angehängt); (3) L + 2 Review-Stücke, alle 0 offene MAJOR; (4) Pre-Launch-Crawl L×9 grün, Branch-Deploy-SHA eingetragen = `git rev-parse staging`; (5) E2E Exit 0 am selben Tag; (6) Prüfstand 10/10 (= Zahl der Fälle, S43); (7) Stufe-73-Lauf im Vollumfang ohne Ausnahme: „Stufe 73: 0 Verbindungen (N geprüfte Dateien, 5 Prüfungen)", N > 0, P = 5; (8) `dig NS <neu>` Cloudflare, `dig CNAME www.<neu>`, Zertifikat enddate > 60 Tage; (9) `node _dev/scripts/generate-sitemap.js` = L URLs = Allowlist-Länge; (10) Staging liefert noindex (1), Repo-`_headers` ohne `/*`-noindex (Stufe 74); (11) Altkunden-Nachweis S20 9/9, höchstens 7 Tage alt; (12) `ROLLBACK.md` (S52) offen, Netlify-Lock-Knopf einmal gesehen, Cloudflare-Token (1 Tag) und Netlify-Token (Ablaufdatum ≥ 09.12.2026: Rollback-Fenster 24.11. + 14 Tage = 08.12.; ein Token vom 23.11. mit 14 Tagen endete am 07.12.) für `lockDeploy` im Soft-Launch- und Rollback-Fenster bereit; (13) `git log -1 --format=%s staging` enthält kein `[skip` (= S42-Vorbedingung; Ist-Wert = die Message); der Merge-Commit in S46 entsteht ohne Marker. Bolle schreibt „GO: Datum Uhrzeit Bolle".
Artefakt: Go-Datei `_dev/messungen/2026-11-23-go-nogo.md`; sie wird nach S46 auf `main` committet, nicht vor dem Livegang auf `staging` (sonst verschöbe ihr Push den HEAD nach den Messungen (4) und (13)); ebenso `_dev/messungen/2026-11-XX-prelaunch-crawl.md` (S42) und das E2E-Protokoll des Go-Tags (S45 (5)): beide bleiben bis S46 uncommittet und gehen mit der Go-Datei nach S46 auf `main`.
Beleg: 13/13 Zeilen grün mit Ist-Wert; GO-Zeile vorhanden.
Stopp: Eine rote Zeile = No-Go; nächster Versuch nach Fix und Diff-Re-Check; kein „Go mit Vorbehalt".

### S46 — Livegang: erster Produktions-Deploy, Verschwinden des noindex messen
Phase: 4 · Wer: Bolle (Klick), Claude (Prüfung) · Dauer: 1 h (Claude 0,5 / Bolle 0,5) · Hängt ab von: S45 · KW: 48 (Di 24.11.2026, 09:00)
Tun: Im `<neu-repo>`: `git merge-base --is-ancestor main staging && echo ok` (= ok, weil `staging` vom init-Commit abzweigt), dann `git checkout main && git merge --no-ff staging -m "Livegang <Datum>" && git push` (Merge-Commit ohne Marker = erster Produktions-Deploy mit Inhalt; ein `--ff-only` setzte `main` auf den `staging`-HEAD, und trägt der `[skip netlify]`, gäbe es keinen Deploy — Netlify: der Marker am jüngsten Commit gilt für den ganzen Push). Netlify → Deploys → Produktions-Deploy „Published" → sofort „Lock to stop auto publishing" (bis S50). Claude: `for u in $(node -e "console.log(require('./_dev/config/sitemap-allowlist.json').join(' '))"); do curl -sI "https://<neu>$u" | grep -iE '^(HTTP|x-robots-tag)'; done` → L × 200, 0 × X-Robots-Tag; `curl -s https://<neu>/robots.txt | grep -c "Sitemap: https://<neu>/sitemap.xml"` = 1; `curl -s https://<neu>/sitemap.xml | grep -c '<loc>'` = L; `curl -sI https://<neu>/planen/ritter/ | grep -ic x-robots-tag` = 0 und `curl -sI https://<neu>/planen/ritter/6-8/ | grep -ic x-robots-tag` = 1 (Produktion ohne `/*`-Regel: App-Shells bleiben noindex, Mottoseiten frei); `curl -sI https://<neu>/spiele/game-wappen-ritter.html | grep -ic 'x-robots-tag: noindex'` = 1 (Spielregel, S35); GSC URL-Prüfung für `/` als Live-Test ohne Indexierungsantrag → „URL ist für Google verfügbar" (der Live-Test hat ein eigenes Tageslimit je Property und zählt nicht als Indexierungsantrag — G9; Zahlen nennt Google nicht).
Artefakt: Produktion live; INDEX-LOG-Zeile „Livegang 24.11.2026, Deploy-SHA".
Beleg: `merge-base` = ok; `git log -1 --format=%s main` = „Livegang <Datum>", kein `[skip`; Netlify-Deploy-Log zeigt den Build für den Push-SHA (`git rev-parse main`); die sechs Zahlen L (200) / 0 (X-Robots-Tag Sitemap-URLs) / 1 (robots.txt) / L (loc) / 0 (`/planen/ritter/`) / 1 (`/planen/ritter/6-8/`) in der Go-Datei nachgetragen; Spielregel-Zähler `/spiele/game-wappen-ritter.html` = 1; GSC-Live-Test grün.
Stopp: X-Robots-Tag auf einer Sitemap-URL oder ein Nicht-200 → sofort S52, kein „morgen".

### S47 — Ende-zu-Ende mit einem echten Elternteil
Phase: 4 · Wer: Bolle organisiert, Testperson führt aus · Dauer: 2 h · Hängt ab von: S46 · KW: 48 (Tag 1–2)
Tun: Ein Elternteil außerhalb des Projekts erhält nur `<neu>` und sieben nummerierte Schritte: (1) Motto Ritter wählen, (2) Alter 6–8 wählen, (3) Plan ansehen, (4) Einladung und Partyseite erzeugen, (5) sich selbst zusagen, (6) ein Spiel bis zum Reveal spielen, (7) das Paket öffnen. Bolle protokolliert ohne einzugreifen: Zeit je Schritt, Fragen, Abbrüche. Erinnerungsmail (7 Tage) wird nicht abgewartet; Beleg dafür ist der Cron-Test S44. Danach Party per Edit-Link löschen.
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
Phase: 4 · Wer: Claude · Dauer: 3 h (9 × 20 min) · Hängt ab von: S46 · KW: 48 (Di–Fr)
Tun: Täglich 09:00, 14:00, 20:00: (a) curl-Schleife über die L Sitemap-URLs → 200; (b) `npx -y wrangler tail party-<neu-kurz> --status error` 5 Minuten → 0 Einträge; (c) Netlify: Produktions-Deploy unverändert (Lock aktiv); Netlify-Token aus S45 gültig (Ablauf ≥ 09.12.2026) — Claudes Lock-Recht aus S52 ist damit im ganzen Fenster ausführbar; (d) Umami Realtime: nur Testpersonen; (e) GSC → Einstellungen → Crawling-Statistiken: Lesung am Tag 4, Hoststatus „keine Probleme" (Google: direkt nach einem Umzug ist ein vorübergehender Rückgang der Crawl-Rate normal — Site-Move-ohne-URL-Änderung-Doku; hier erwartet: erste Anfragen nach der Sitemap-Einreichung). In diesen 72 h keine Links, keine Posts, keine Sitemap-Einreichung.
Artefakt: 9 Protokollzeilen in INDEX-LOG „Soft Launch".
Beleg: 9/9 Checks „0 Fehler"; `wrangler tail`-Auszug ohne `error`.
Stopp: 5xx oder Worker-Fehler → S52; Zähler beginnt nach dem Fix neu.

### S50 — Tag 4: Sitemap einreichen, URL-Prüfung genau einmal, Bing, IndexNow
Phase: 4 · Wer: Bolle · Dauer: 1 h · Hängt ab von: S49 · KW: 48 (Fr 27.11.2026)
Tun: (1) GSC → Sitemaps → `https://<neu>/sitemap.xml` → Senden → Status „Erfolgreich", „Gefundene URLs: L" (Sitemaps-Bericht-Hilfe; Google liest die Sitemap danach in eigenem Takt neu). (2) GSC → URL-Prüfung je Sitemap-URL → „Indexierung beantragen": L URLs (9 oder 8) in einer Sitzung, jede genau einmal, nie wieder. Google nennt drei getrennte Tageslimits je Property ohne Zahl — URL-Prüfung, Live-Test, Indexierungsantrag (G9); eigene Messung 28.05.2026: 11 Anfragen, dann erschöpft (`_dev/GSC-INDEX-PLAN.md`); ANNAHME: L ≤ 9 passen in einen Tag, sonst Rest am Folgetag. (3) Bing Webmaster Tools → Sitemaps: `<neu>/sitemap.xml` sichtbar (Import) oder manuell senden. (4) IndexNow: Crawler Hints läuft bei Proxy an (S16); bei DNS-only stattdessen `node _dev/scripts/indexnow-submit.mjs` mit Key-Datei `/<key>.txt` (8–128 Zeichen) und POST an `api.indexnow.org` mit den L URLs — Google ist kein Teilnehmer (IndexNow-FAQ). (5) Netlify „Unlock to start auto publishing"; nächster Inhalts-Deploy frühestens 14 Tage später.
Artefakt: INDEX-LOG-Zeile „T0 = 27.11.2026: Sitemap eingereicht, L Anfragen, Bing, IndexNow".
Beleg: GSC Sitemaps „Erfolgreich / L"; L Zeilen „Indexierung beantragt" mit Uhrzeit; BWT zeigt die Sitemap; IndexNow-Antwort 200 oder 202.
Stopp: „Konnte nicht abgerufen werden" → robots.txt und Header prüfen (kein Disallow, kein 404), erneut senden; kein zweiter Antrag für dieselbe URL.

### S51 — Erste echte Verlinkungen und Erwähnungen
Phase: 4 · Wer: Bolle · Dauer: 3 h · Hängt ab von: S50 · KW: 49
Tun: (1) Pinterest-Business-Konto, Website `<neu>` beanspruchen (HTML-Tag oder DNS-TXT, bis 72 h; eine Website wird von genau einem Konto beansprucht — Pinterest-Hilfe), 10 Pins mit eigenen Screenshots auf `/planen/ritter/`, `/planen/piraten/`, `/spiele/`, `/paket/` (Referral und Marke; Pin-Links sind keine crawlbaren Links — Ist-Analyse 1.7). (2) Eigene Profile (LinkedIn, Instagram-Bio) mit Link. (3) Verzeichnisse mit echtem Eintrag: gruenderkueche.de, startbase.com, rakkers.org; stuttgart-startups.de nur bei regionalem Bezug. (4) Eine redaktionelle Anfrage an Lokalpresse mit Gründer-Aufhänger — keine Pressemitteilung mit gezielt gesetztem Ankertext (Google Link-Spam, M10). (5) Eltern-Communities nur mit echtem Beitrag; urbia nicht (Netiquette M12); gutefrage und Reddit sind nofollow/ugc. Linktext ist der Markenname. Keine Ads als Index-Hebel (AdsBot ist nicht Googlebot).
Artefakt: `_dev/messungen/VERLINKUNG.md`: Quelle | Datum | URL | Art | Status.
Beleg: ≥ 6 Einträge „live" bis Ende KW 49; Kontrolle in S54: GSC Links → verweisende Websites ≥ 3 (ANNAHME zur Zeit, Google nennt keine Frist für die Link-Erfassung).
Stopp: Ein Verzeichnis verlangt Gegenlink oder Bezahlung → nicht eintragen (Link-Spam-Klasse).

### S52 — Rollback-Plan (steht vor dem Livegang, gilt 14 Tage danach)
Phase: 4 · Wer: Claude dokumentiert, Bolle entscheidet · Dauer: 0,5 h · Hängt ab von: S13, S14 (Komponenten existieren) · KW: 47
Tun: `_dev/ROLLBACK.md` mit dieser Tabelle; Bolle entscheidet binnen 60 Minuten nach Befund. Lock: Bolle-Klick Netlify → Deploys → „Lock to stop auto publishing", oder Claude mit dem Netlify-Token aus S45 (Ablauf ≥ 09.12.2026, gültig im ganzen Rollback-Fenster): `npx -y netlify-cli api lockDeploy --data '{"deploy_id":"<id>"}'` (Deploy-ID aus `npx -y netlify-cli api listSiteDeploys --data '{"site_id":"<site>"}'`; Methode laut Netlify-OpenAPI, heute nicht abgerufen — ANNAHME, der Klick ist der Primärweg); Claude darf bei 5xx auf allen L Sitemap-URLs ohne Rückfrage locken, wenn der Token bereitliegt.

| Komponente | Symptom | Kommando oder Pfad | Dauer |
|---|---|---|---|
| Netlify-Produktion | kaputte Seite, noindex auf Sitemap-URL, 5xx | Deploys → „Lock to stop auto publishing"; vorherigen erfolgreichen Deploy → „Publish deploy" (sofort wirksam — Netlify-Doku; Vorgänger werden im Free-Plan nach 30 Tagen gelöscht, der letzte erfolgreiche bleibt). Beim ersten Livegang ist der Vorgänger der leere init-Deploy (S10, ohne Marker deployt, in Netlify „Published"): „Publish deploy" darauf liefert überall 404; zusätzlich Project visibility → „Private" sperrt die Site für alle außer dem Team Owner | 5 min |
| Worker | API-Fehler, falsche Mails | `npx -y wrangler rollback` (interaktiv, letzte 100 Versionen; nicht möglich, wenn eine KV-Bindung entfernt wurde — Rollbacks-Doku) oder Dashboard → Workers & Pages → Worker → Deployments → ⋮ → Rollback | 5 min |
| DNS/Proxy | Zertifikat oder Proxy-Problem | Cloudflare DNS: Proxy orange → grau; kein Rückweg zur alten Site, weil es keine Verbindung gibt | 5 min + TTL |
| GSC | fehlerhafte Sitemap | Sitemaps → entfernen (Google vergisst die URLs dadurch nicht) | 5 min |
| Daten | Testpartys im KV | Edit-Link löschen; TTL räumt den Rest | — |

Nie zurückgerollt: machsleicht.de (unberührt), Domain-Registrierung, Properties.
Artefakt: `_dev/ROLLBACK.md` (nennt den Alt-Host als Randbedingung, nicht als Verbindung — von Stufe 73 ausgenommen, S11).
Beleg: Datei existiert vor S45; Screenshot des Lock-Knopfs in der Datei.
Stopp: —

## Phase 5 — Messen und Entscheiden (KW 49/2026 – KW 8/2027)

Eingang: Sitemap eingereicht (T0 = 27.11.2026). Ausgang: Gate 1 entschieden (11.01.2027), Abbruchlesung (22.02.2027).

### S53 — Wöchentliche Messung, Montag 09:00 Berlin
Phase: 5 · Wer: Bolle 20 min (ablesen), Claude 20 min (eintragen, Regeln anwenden) · Dauer: 0,67 h je Woche (Claude 0,33 / Bolle 0,33) · Hängt ab von: S50 · KW: ab 49 (30.11.2026)
Tun: Bolle liest in GSC `<neu>`: Indexierung → Seiten (indexiert; je Grund: „Gecrawlt – zurzeit nicht indexiert", „Gefunden – zurzeit nicht indexiert", „Duplikat – Google hat ein anderes Canonical gewählt", noindex); Leistung 7 Tage (Impressionen, Klicks); Einstellungen → Crawling-Statistiken (Gesamtanfragen, Hoststatus — der Bericht existiert für Domain-Properties); Sitemaps (gefundene URLs); Links (verweisende Websites); BWT indexierte Seiten; Umami Besucher und Event „Partyseite erstellt"; Cloudflare KV-Writes je Tag; Resend Mails je Tag. Je Sitemap-URL einmal im Monat URL-Prüfung (nur Prüfung, kein Antrag; die Prüfung hat ein eigenes Tageslimit — G9; ANNAHME: L bis 22 Prüfungen passen an einem Tag, sonst Rest am Folgetag; die Zahl der an einem Tag möglichen Prüfungen wird in der Montagszeile notiert) → Statusspalte. Claude trägt die Zeile ein und schreibt darunter „Regel: weiter / Gate / Fallback" nach E.
Artefakt: eine Zeile je Montag in INDEX-LOG.
Beleg: Zeilendatum ist ein Montag; 0 leere Zellen; wiederkehrender Kalendertermin bei Bolle (Lehre: Juni bis 08.09. nicht in der GSC).
Stopp: Zwei Montage ohne Zeile → PushNotification an Bolle; die Messung ist Pflicht, nicht Vorsatz.

### S54 — Gate 1: T+6 Wochen (Lesung Mo 11.01.2027, KW 2/2027)
Phase: 5 · Wer: beide · Dauer: 1 h (Claude 0,5 / Bolle 0,5) · Hängt ab von: S53 · KW: 2/2027
Tun: Aus INDEX-LOG: Zahl der Sitemap-URLs „indexiert" (Seiten-Bericht plus URL-Prüfung je URL). Regeln (L = Allowlist-Länge, 9 oder 8 nach E20): ≥ 2/3 von L indexiert (6) → Phase 6 startet KW 3/2027 (H1 gestützt, nicht bewiesen). Zwischen 1/4 und 2/3 (3–5) → zweite Lesung Mo 01.02.2027 (KW 5): ≥ 6 → Phase 6, sonst S56. ≤ 1/4 (2) → ebenfalls zweite Lesung 01.02. und parallel S56 vorbereiten (Fallback-Datei anlegen, noch nicht ausführen). Die H2-Schwelle (≥ 50 % von L „Gecrawlt – zurzeit nicht indexiert": 5 von 9, 4 von 8) gilt allein bei T+12 (E17, S55) (Status-Definition: G8; dass der Status nach sechs Wochen nicht von einem Qualitätsurteil unterscheidbar ist, ist ANNAHME des Plans). Kein Resubmit, kein zweiter Indexierungsantrag, keine Validierung (Google: bei „Gecrawlt – zurzeit nicht indexiert" ist kein erneutes Einreichen nötig — G8; drei gescheiterte Validierungen auf der alten Domain).
Artefakt: Gate-Zeile in INDEX-LOG.
Beleg: Zahl und angewandte Regel in einer Zeile; Bolles Wort „Phase 6 frei" oder „Fallback".
Stopp: GSC-Daten verzögert → Lesung einmal um 7 Tage schieben.

### S55 — Abbruchlesung: T+12 Wochen (Mo 22.02.2027, KW 8/2027)
Phase: 5 · Wer: beide · Dauer: 0,5 h (Claude 0,25 / Bolle 0,25) · Hängt ab von: S53 · KW: 8/2027
Tun: Regel E17: ≥ 50 % der Sitemap-URLs „Gecrawlt – zurzeit nicht indexiert" (bei L = 9: ≥ 5, bei L = 8: ≥ 4; in Phase 6 entsprechend mehr) → Stopp des Ausbaus, S56 wird Hauptpfad. Darunter: weiter nach S57.
Artefakt: Zeile mit Prozentwert und Entscheidung.
Beleg: Zeile vorhanden; bei Stopp keine Deploy-Zeile in INDEX-LOG danach außer Fixes aus S56.
Stopp: —

### S56 — Fallback, wenn die Schwelle nicht erreicht wird (nicht „mehr Content")
Phase: 5 · Wer: beide · Dauer: Entscheidung 1 h (Claude 0,5 / Bolle 0,5), Umsetzung 12 Wochen · Hängt ab von: S54 oder S55 · KW: nach Lesung
Tun: (1) Kein Deploy neuer Seiten; bestehende URLs bleiben (keine Massenänderung, kein noindex-Schwenk — der Fehler der alten Domain wird nicht wiederholt). (2) 10 Nutzertests mit Eltern nach S47-Protokoll → Produktfehler fixen (Werkzeug, nicht Text). (3) 12 Wochen Erwähnungen als Wochenliste in `VERLINKUNG.md`: je Woche 2 neue Erwähnungen aus den S51-Kanälen oder dem Kita- und Schulumfeld (Quelle, Datum, URL, Status), Zählziel 24 Erwähnungen und ≥ 5 verweisende Domains im GSC-Links-Bericht nach 12 Wochen; eine Woche ohne Eintrag ist rot im Log. (4) Je Seite die G23-Selbstprüfung dokumentieren (Zweck, Who/How/Why, „für Suchmaschinen gemacht?") und nur Befunde mit Beleg ändern. (5) Lesung nach dem nächsten Core Update (Status-Dashboard G27; Google: Wirkung Tage bis Monate, sonst bis zum nächsten Core Update — G21). (6) Danach Bolle-Entscheidung: Motto-Takt wieder aufnehmen / Produkt ohne Google-Ziel (Bing zeigt ≈ 50 alte URLs — Bing `site:machsleicht.de`, 01.10.2026, Schätzung; der BWT-Wert ersetzt sie, sobald machsleicht.de in S16 mit importiert ist; WhatsApp-Viralität über `?ref=`; Pinterest) / Projektstopp. H2 gilt dann als wahrscheinlicher — mit der Konsequenz, dass die Qualität der Werkzeugseiten in Frage steht, nicht die Menge.
Artefakt: `_dev/review/<datum>-fallback.md` mit 6 Punkten, Datum, Verantwortlichen.
Beleg: Keine Deploy-Zeile in INDEX-LOG während der 12 Wochen außer Fixes aus (2); 12 Wochenzeilen in VERLINKUNG.md, 0 rot; Links-Zahl zu Beginn und Ende.
Stopp: Versuchung „noch eine Seite" → Deploy-Takt aus den Lesehinweisen; Bolle entscheidet, nicht die Pipeline.

## Phase 6 — Motto-für-Motto-Ausbau (ab KW 3/2027, nur bei Gate grün)

Eingang: S54 „Phase 6 frei". Ausgang je Zyklus: ein Motto komplett, +1 Sitemap-URL, Stufe 76 grün. Sitemap L (9 oder 8) → 22 URLs nach 13 Zyklen (26 Wochen; bei E20 b kommt `/kosten/` in Zyklus 1 dazu), je Deploy +1 URL — unter der Massenänderungs-Grenze.

### S57 — Motto-Zyklus (Vorlage, 14 Tage je Motto)
Phase: 6 · Wer: Claude 20–24 h (Zyklus 1 bei E20 b: 26–30 h), Bolle 3 h je Zyklus · Dauer: Teilschritte je ≤ 1 Tag · Hängt ab von: S54 · KW: ab 3/2027
Tun: Reihenfolge nach E8. Je Motto: (1) `/planen/<motto>/` nach S32-Verfahren (Stufe 75 gegen alte Motto- und drei Altersseiten, Eigenanteil ≥ 90 % gegen alle bisherigen Mottoseiten, 0 identische FAQ-Fragen); (2) 4 Spiele Playtest nach S35; (3) Paket aus `paket/<motto>/` (Stufen 15–35) oder Bau mit `paket-bauen.py`; (4) Trailer nur bei E14 „Phase 6": Build aus `_dev/prototypes/raketen-trailer/` (10 Mottos liegen vor, Stand draft e2f1d63a), Wasserzeichen neue Marke, MP4 im digitalen Paket; (5) Fotos (Bolle, S28-Verfahren); (6) 9 Zustands-Shells noindex (S31-Vorlage); (7) Review-Welle (S41); (8) ein Deploy: Allowlist +1, Motto-Wähler auf der Startseite +1, SITEMAP-CHANGELOG-Zeile; (9) Live-Verify: neue URL 200, Sitemap +1, Shells noindex; (10) S53 läuft weiter; (11) URL-Prüfung + Indexierungsantrag für genau die eine neue URL; bei E20 (b) in Zyklus 1 zusätzlich S37 `/kosten/` — Allowlist +2, zwei Anträge in (11), +6 h (S37 5 h plus Review 1 h).
Artefakt: je Motto 1 Sitemap-URL, Befund-Tabelle, SESSION-NOTES-Zeile.
Beleg: Zyklusdauer ≤ 14 Tage im Log; Stufe 76 grün; ≤ 4 Gate-Einträge je Zyklus (Zyklus 1 bei E20 b: ≤ 5; Kapazität 4–5 je Woche, zwei Wochen = 8–10, Rest ist Puffer für Messung und Betrieb).
Stopp: Ein Zyklus > 21 Tage → nächster Zyklus startet nicht, Ursache in LEKTIONEN.md; Massenänderung nie, auch nicht zum Aufholen.

### S58 — Ratgeber nur mit Werkzeug-Element (Regel, kein Volumen)
Phase: 6 · Wer: Claude · Dauer: nach Bedarf, ≤ 1 Ratgeber je 2 Zyklen · Hängt ab von: S57 · KW: ab 5/2027
Tun: Eine Ratgeber-URL entsteht nur mit eigenem Datenwerkzeug wie `/kosten/`: Kandidaten mit Element sind Zeitplan-Generator (`gen-ablauf.mjs`-Daten) → `/zeitplan/` und Mengenrechner (`mengen-ableiten.py`) → `/essen/`. Die 18 alten Ratgeber sind Faktenrohstoff, nie Vorlage.
Artefakt: IA.md-Zeile mit Werkzeug-Element, Seite, Allowlist +1.
Beleg: Stufe 75 gegen den alten Ratgeber ≤ 3 %; Rechner-Ergebnis = Daten in 3 Stichproben.
Stopp: Ratgeber-Idee ohne Element → Backlog, nicht Sitemap.

### S59 — Trailer und Schatzsuche einbinden (nach E14, E10)
Phase: 6 · Wer: Claude · Dauer: 1 Zyklus · Hängt ab von: S57 (Zyklus 1) · KW: ab 5/2027
Tun: Trailer ins digitale Paket (`paket/<motto>/`): Render im Browser, kein Upload, Wasserzeichen neue Marke; die Startseite nennt den Trailer erst, wenn er für alle live geschalteten Mottos läuft (0.7). Schatzsuche nur „aus dem Plan" (bindend: alles aus Plan + Partyseite): als Planer-Zustand, nicht als eigene Textseite; die alte Schatzkarten-Engine ist Code-Rohstoff.
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

Eingang: —. Ausgang: Zeile je Monat, Spalte „Eingriffe" = 0. Die alte Domain bleibt unverändert: gleiche Inhalte, gleiche Sitemap (136), gleicher Worker, keine Rückbauten, keine noindex-Welle, keine Validierungen, keine Indexierungsanträge. Lese-Ausnahme: die in S16 angelegte BWT-Property für machsleicht.de (Import aus GSC; Bing liest die 136er-Sitemap) — Lesezugriff für die Vergleichszahl, kein Eingriff an der Site.

### S61 — Monatliche Alt-Domain-Lesung (erster Montag im Monat, 09:20)
Phase: 7 · Wer: Bolle 15 min, Claude 15 min · Dauer: 0,5 h je Monat (Claude 0,25 / Bolle 0,25; Erstlesung in G KW 45) · Hängt ab von: S3 · KW: ab 45 (02.11.2026)
Tun: GSC `machsleicht.de`: indexierte Seiten, Impressionen 28 Tage, Grund-Buckets; BWT `machsleicht.de`: indexierte Seiten (ersetzt die Schätzung ≈ 50 in R17); Demo-Party auf `party.<neu>` (S34): Ablaufdatum aus KV lesen — Kommando im `<neu-repo>`-Root, die Alt-Zählung dagegen im `<alt-repo>`-Root; beide Bindings heißen PARTY, die Auflösung läuft über das CWD — (`npx -y wrangler kv key list --binding PARTY --remote --prefix "party:<demo-id>"` → Feld `expiration` in Unix-Sekunden; `kv key get` liefert nur den Wert, nicht die Expiration; `expirationTtl` ist auf 2 Jahre gedeckelt), < 60 Tage → neu anlegen und iframe-Ziel in S34 aktualisieren; Umami alt: Besucher, Partyseiten; KV-Zählung mit dem S4-Kommando (Token 1 Tag) für `party:`, `wl:`, `plan:`; Kosten (Domain, Verbrauch Resend/Worker aus QUOTEN.md); Zertifikats-Ablaufdatum beider Domains (`openssl`-Zeile aus S14). Nichts ändern.
Artefakt: Zeile in INDEX-LOG, Abschnitt „Alt-Domain".
Beleg: 12 Zeilen je Jahr; Spalte „Eingriffe" = 0.
Stopp: Vorschlag für einen Eingriff auf machsleicht.de → Randbedingung zitieren; nur Bolle hebt sie schriftlich auf. Leere KV-Liste beim Demo-Party-Kommando = falsches CWD oder Key abgelaufen → prüfen, nie als „gültig" werten.

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

**E4 — Repo.** (a) ★ neues öffentliches Repo ohne Historie — raw-URLs für den Branch-Trick, keine Token-Historie; der `cfut_`-Token aus der Historie wird widerrufen (1), der `nfp_`-Status dokumentiert (1), der Resend-Key-Status nach S5 (a). (b) Fork — Token-Historie zieht mit. (c) Branch im Alt-Repo — Deploy-Verwechslung, eine Netlify-Site je Repo.

**E5 — Worker und KV.** (a) ★ neuer Worker mit eigenem KV unter `party.<neu>` — saubere Links in Cron-Mail und `/api/create` (Alt-Zeilen 416, 545 bauen `party.machsleicht.de` hart), eigene Löschpfade; Kosten: zweiter Cron (5 frei), geteilte Konto-Quoten. (b) zweite Custom Domain am alten Worker mit geteiltem KV — Links neuer Nutzer zeigen auf die alte Domain (Verbindung, Markenbruch), Kinderdaten zweier Domains in einem Namespace.

**E6 — Spiele indexierbar?** (a) ★ noindex wie heute plus indexierbarer Hub `/spiele/` mit Demos — Werkzeug ist Hauptinhalt (G24) ohne 60 URLs; Spiel-URLs tragen Vornamen und Foto-Parameter. (b) 60 Spiele indexierbar — 60 Seiten mit eigenem Text nötig, sonst Volumen (G16).

**E7 — Werkzeug-Zustände als URLs.** (a) ★ ja: Motto-Ebene indexierbar, tiefere Ebenen noindex mit Self-Canonical (S21 c, S31; G2 rät von noindex plus Fremd-Canonical ab) — G26-konform, keine Matrix. (b) nein, nur `/planen/` — das Werkzeug ist für Google eine Seite. (c) alle Ebenen indexierbar — 15 × 3 × 3 = 135 URLs aus JSON = Matrix (verboten).

**E8 — Launch-Mottos und Reihenfolge.** (a) ★ Ritter und Piraten — beide mit Paket, 4 Spielen (Trailer-Prototyp vorhanden, Einbau erst S59); Piraten ist das Pilotmotto mit den reifsten Daten. (b) nur Ritter — ein Wähler mit einem Eintrag wirkt wie eine Demo. (c) drei Mottos mit Dino — Livegang KW 49. Danach: Dino, Feuerwehr, Baustelle, Meerjungfrau (Paket vorhanden), dann Weltraum, Einhorn, Pferde, Detektiv, Dschungel, Safari, Feen, Superheld, zuletzt Prinzessin (Paket WIP). Abweichung von der Entscheidung 11.08. (ein Schiff komplett vor dem nächsten): zwei Mottos parallel, Schiff zunächst ohne Trailer und Foto-Print — braucht Bolles OK in S6.

**E9 — `/einladung/erstellen` und `/e/`.** (a) ★ nicht übernehmen — ein Backend weniger; „Plan vor Einladung für alle Einstiege" ohne Ausnahme; `/e/`-Links sind stateless und laufen auf der alten Domain unbegrenzt weiter. (b) übernehmen — Netlify Functions mitziehen, zweiter Einladungsweg ohne Plan.

**E10 — 14 Schatzsuche-Themenseiten und Builder.** (a) ★ nicht übernehmen; Schatzjagd lebt in den 15 Spielen und auf den Mottoseiten. (b) Builder als Planer-Zustand in Phase 6 (S59) — nur „aus dem Plan". (c) Themenseiten neu schreiben — 14 URLs ohne eigenes Werkzeug = Volumen.

**E11 — Umami.** (a) ★ neue Website im bestehenden Konto, wenn der Hobby-Plan es zulässt (S18 prüft am Knopf) — getrennte Zählung, 100.000 Events je Monat für beide Sites. (b) Umami Pro — Preis laut Preisseite (heute nicht lesbar). (c) Cloudflare Web Analytics — kostenlos, cookielos, keine Custom Events, also kein „Partyseite erstellt". Region: EU wählen, wenn angeboten (Umami: Server in US und EU), sonst in der Datenschutzerklärung nennen.

**E12 — Newsletter, DOI, Warteliste.** (a) ★ neue Audience und neuer DOI auf `<neu>`; `wl:`-Kontakte (365 Tage) werden von `<neu>` nicht angeschrieben — die Einwilligung galt für machsleicht.de; elektronische Post ohne vorherige ausdrückliche Einwilligung ist unzumutbare Belästigung (§ 7 Abs. 2 Nr. 2 UWG). (b) Audience übernehmen — UWG-Risiko und Verbindung über Mail-Inhalte. (c) `wl:`-Kontakte einmal von machsleicht.de über das dortige Pilot-Paket informieren, ohne Link auf `<neu>` — nur, wenn der alte DOI-Text das deckt.

**E13 — Impressum-Identität.** (a) ★ Marie-Therese Bollweg, Kleinunternehmerin nach § 19 UStG, identisch — Pflicht nach § 5 DDG, kein belegtes Google-Signal; kein Hinweis „weitere Projekte". (b) andere Identität — nur mit eigener Rechtsgrundlage; nicht empfohlen.

**E14 — Trailer im Launch-Set.** (a) ★ nein, Phase 6 (S59) — der Prototyp im draft-Branch ist nie gegatet; Startseite nennt ihn nicht (0.7). (b) ja — zwei gegatete Stücke mehr, Livegang eine Woche später.

**E15 — „Geburtstags-OS" öffentlich?** (a) ★ interne Leitidee; öffentlich die Worte der Suchintentionen und Bolles dokumentierte Formulierungen — Suchnachfrage nach dem Begriff ist null (Ist-Analyse 1.7). (b) öffentlicher Claim — erklärt sich auf der Startseite nicht selbst.

**E16 — Preis und Kasse.** Nur Status quo festhalten (einzige Option, die 0.7 und die Entscheidung vom 08.09. erfüllt): Paket kostenlos als „Pilot", keine „geplant"-Preise, kein Lemon-Squeezy-Script und kein Webhook; Kleinunternehmer-Status bleibt bis zu einer Kasse Notiz.

**E17 — Abbruchkriterium.** (a) ★ N = 12 Wochen nach Sitemap-Einreichung, X = 50 % der Sitemap-URLs „Gecrawlt – zurzeit nicht indexiert" → Stopp; Zwischen-Gate nach 6 Wochen mit ≥ 2/3 von L indexiert (6 von 9 oder 6 von 8) — früh und billig. (b) N = 8 — knapp gegen „a few weeks". (c) N = 16 — ein Zyklus mehr Unsicherheit. Alle drei ANNAHME (G9, G21).

**E18 — Cloudflare-Proxy für `<neu>`.** (a) ★ Proxy an nach Zertifikatsausstellung, wie bei machsleicht.de — HTML-Cache, Crawler Hints (IndexNow), Analytics; ANNAHME: Erneuerung funktioniert mit Proxy, weil die alte Site so läuft; S61 misst das Ablaufdatum monatlich. (b) DNS only — Netlify erneuert ohne Umweg, kein Crawler Hints (IndexNow per Skript, S50), kein Cloudflare-Cache.

**E19 — Schlüssel-Rotation am Alt-Worker (einzige Ausnahme).** Stand 01.10.2026 gibt es keinen Leak-Commit mit Resend-Key (S5 a: 0 Treffer mit scharfem Muster); E19 wird trotzdem immer als Zeile geführt — „E19: entfällt — kein Leak-Commit, geprüft <Datum>" oder Option a/b/c — und greift nur bei einem künftigen Treffer, wenn der aktive Key älter ist als der Leak-Commit. (a) ★ Rotation als einzige, schriftlich freigegebene Ausnahme von „kein Deploy auf dem Alt-Stack" — `wrangler secret put` erzeugt eine neue Worker-Version und deployt sie (Cloudflare-Secrets-Doku); nur das Secret ändert sich, `party.machsleicht.de` ist noindex, die Google-Wirkung ist null; Begründung: ein Key in öffentlicher Git-Historie bleibt sonst gültig. (b) keine Rotation — der geleakte Key bleibt gültig, Risiko Missbrauch des Mailversands unter alter Marke. (c) Rotation über das Dashboard statt CLI — gleiche Wirkung (neue Version), gleiche Ausnahme. Freigabe als Zeile „E19: Option, Datum" in S6.

**E20 — `/kosten/` im Launch-Set oder in Zyklus 1.** (a) ★ im Launch-Set (S37, KW 47, 5 h plus Review) — einzige Ratgeber-Intention mit eigenem Datenwerkzeug am Tag 1; Sitemap = 9. (b) in Zyklus 1 von Phase 6 — Folgeliste: Allowlist 8 (L = 8); Gate-Schwellen gelten als Anteile von L (0.1, S3, S54, E17, E, R4); Kontrollzahlen in A, S21, S24, S26, S42, S45, S46, S50, D stehen als „= L"; Stücke = L + 2 = 10; KW 47 um 6 h leichter (S37 5 h plus 1 h Review in S41); S37 und die D-Zeile `/kosten/` wandern in S57 Zyklus 1; die Weglass-Probe in D zeigt, dass das Gate auch ohne `/kosten/` erreicht wird. Frist: vor S21 (IA-Baum und Allowlist).

## D. Launch-Set-Tabelle (Phase 3)

| URL | Typ | Quelle | Pflicht-Bausteine | Zielwortzahl | Überlappungs-Grenze gegen alt | Abnahme-Gate |
|---|---|---|---|---|---|---|
| `/` | Werkzeug-Einstieg (System) | ganz neu; alte `index.html` nur Negativliste | Schritte mit echten Screenshots, Motto-Wähler (2), Organization + WebSite JSON-LD, Inlinks zu allen übrigen L − 1 Sitemap-Seiten, kein unpkg | 500–800 | ≤ 3 % Seite, 0 Sätze | Linter 0 FAIL, Stufe 75, Review 0 MAJOR, PSI mobil ≥ 90 |
| `/planen/` | Werkzeug (Flaggschiff) | neu aus Planer-Text (3.195 W) | Stufe 1 live, Zustands-URLs (S31), eigene Bilder, WebPage JSON-LD, Inlinks von `/` und Mottoseiten | 900–1.400 | ≤ 3 % Seite, ≤ 5 % Abschnitt; DOM-Diff Start ≤ 5 % | + `compare-rendered.mjs` |
| `/planen/ritter/` | Mottoseite = Werkzeug-Zustand | neu aus `/kindergeburtstag/ritter` (1.419 W), drei Altersseiten, `ritter-*.json` | Werkzeug-Zustand, 4 Spiele-Demos, Paket-Fotos, FAQ neu, Inlinks `/`, `/spiele/`, `/paket/` | 1.200–1.800 | ≤ 3 % / ≤ 5 %; 0 Sätze; FAQ 0; neue h2 ≥ 50 %; Eigenanteil ≥ 90 % gegen Piraten | Linter, Stufe 75, Review |
| `/planen/piraten/` | Mottoseite | wie Ritter mit `piraten-*` | wie Ritter | 1.200–1.800 | wie Ritter | wie Ritter |
| `/einladung/` | Werkzeug-Erklärseite | neu aus `/einladung/whatsapp/`, `/einladung/text/`; Hubs sind Negativbeispiel | Live-Demo-Partyseite (iframe, S34; Worker-CSP S12), echte Screenshots, Funktionssätze ↔ 7 Routen, Button → `/planen/` | 700–1.000 | ≤ 3 %, 0 Sätze | Linter, Stufe 75, Route-Tabelle, Review |
| `/spiele/` | Werkzeug-Hub | neu; 8 Spiele als Demo | iframe-Demo je Spiel, Alterszuordnung aus Daten, eigene Screens | 600–900 | ≤ 3 % | Playtest 8/8, Stufe 73 core.js |
| `/paket/` | Produktseite | neu aus `paket/_maschine`, Manifeste | Paket-Vorschau (`?demo=1`) eingebettet, Fotos der Drucke, Inhaltsliste aus Manifest, „kostenlos im Pilot" | 500–800 | ≤ 3 % | Stufen 15/22/23/29/35, QR-Scan, Drucktest |
| `/kosten/` | Ratgeber mit Werkzeug (E20: Launch-Set ★ oder Zyklus 1) | neu aus `/kindergeburtstag-kosten`, `priceEur`-Daten | Rechner Kosten je Kind, Tabelle aus Daten, FAQ neu, Werbekennzeichnung | 800–1.200 | ≤ 3 % | Rechner = Daten (3 Stichproben), Review |
| `/ueber-uns/` | Trust | ganz neu | echte Person, Foto, Who/How/Why, Kontakt | 400–600 | ≤ 3 % | Review |
| `/impressum/`, `/datenschutz/` (nicht in Sitemap) | Pflicht | neu, nie kopiert | § 5 DDG; alle Dienste mit Fristen aus dem Code; AV-Verträge in RECHT.md | — / 1.500–2.500 | ≤ 3 % | Rechtswinkel-Review, RECHT.md 4/4 |

Sitemap = L URLs: 9 bei E20 (a), 8 bei E20 (b). Größe: (a) ein Elternteil zieht am Tag 1 einen kompletten Geburtstag für zwei Mottos durch — mehr Mottos erhöhen die Vollständigkeit nicht; (b) L ≤ 9 Indexierungsanfragen passen in einen Tag (Google nennt kein Limit; eigene Messung 11 — ANNAHME); (c) L + 2 gegatete Stücke (11 bei E20 a) in 4 Wochen = 2,75 je Woche gegen belegte 4–5; (d) dass Google eine Site anhand ihres frühen Bestands erstbewertet, ist ANNAHME ohne Primärquelle und kein Grund für Volumen (R5).

Weglass-Probe (Winkel 18): ohne `/kosten/` kommt der Launch genauso ans Gate — E20 stellt die Wahl: Launch-Set (★, einzige Ratgeber-Intention mit eigenem Datenwerkzeug) oder Zyklus 1; ohne `/paket/` fehlt die „FERTIG"-Hälfte der Produktzusage; ohne `/einladung/` der Einstieg für die größte Suchintention (1.7); ohne zweites Motto wirkt der Wähler wie eine Demo (E8). Gestrichen: 14 Schatzsuche-Seiten, 30 Einladungs-Hubs, 45 Matrix-Seiten, 17 Ratgeber ohne Werkzeug, 16 Klasse-C-Seiten, Trailer, Foto-Print, Transparenz-Seite.

## E. Index-Messplan

**Spalten:** definiert in S3 (Wochen- und Alt-Domain-Zeile, Hypothesen-Kopf).

**Kadenz:** Montag 09:00 Berlin (S53); Alt-Domain erster Montag im Monat 09:20 (S61); je Sitemap-URL einmal im Monat URL-Prüfung ohne Antrag.

| Phase | Erfolg | Abbruch oder Fallback |
|---|---|---|
| 4 Soft Launch (24.–27.11.2026) | 9 Checks in 3 Tagen ohne 5xx und Worker-Fehler; Live-Test `/` grün | ein 5xx oder Worker-Fehler → S52, Zähler neu |
| 4 Tag 4 (27.11.) | Sitemap „Erfolgreich / L"; L Anfragen protokolliert | „Konnte nicht abgerufen werden" → Fix, erneut senden |
| 5 Gate 1 (11.01.2027) | ≥ 2/3 von L indexiert (6) → Phase 6 | 1/4–2/3 (3–5) → zweite Lesung 01.02.; ≤ 1/4 (2) → zweite Lesung 01.02. und S56 vorbereiten; H2-Schwelle erst bei T+12 |
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
| R4 | Alternativ-Hypothese H2 trifft zu | ≥ 50 % von L „Gecrawlt – zurzeit nicht indexiert" (5 von 9, 4 von 8) zu T+12 | S56: Nutzertests, echte Links, Core-Update-Lesung; kein Volumen | beide |
| R5 | Erstbewertung einer wochenlang L (9 oder 8) Seiten großen Site (ANNAHME) | Gate 1 verfehlt bei vollständig gecrawlter Sitemap | Launch-Set vollständig statt groß; Phase 6 im 14-Tage-Takt | beide |
| R6 | Markenrechtskollision des neuen Namens | Treffer DPMA/TMview Klasse 41/35 mit ähnlichem Wortstamm; Abmahnung | S7 vor Registrierung mit Screenshots; E1 Option c | Bolle |
| R7 | Altkunden-Links brechen | S20/S48-Tabelle rot; Resend-Log 401 (nur bei S5 Weg b) | S5 Weg a lässt den Alt-Stack unverändert; bei Weg b Reihenfolge neu → testen → alt löschen; Nachweis vor und nach Livegang | beide |
| R8 | Consent-Reichweite: Mails an `wl:`-Kontakte unter neuer Domain (§ 7 UWG) | eine Mail von `<neu>` an eine `wl:`-Adresse | E12 (a): keine Mails von `<neu>` an Altkontakte; neue Audience, neuer DOI | Bolle |
| R9 | Kinderdaten in geteiltem KV über zwei Domains | E5 (b) gewählt | E5 (a): eigener Namespace, Löschpfade je Host, Fristen aus `calcTTL` in der Erklärung | Bolle |
| R10 | Bolle-Kapazität | > 10 h je Woche oder ein Bolle-Schritt > 7 Tage offen | Klickstrecken A/B; 25,5 h in 8 Wochen (G); Pipeline-Regel | Claude |
| R11 | Sitemap-Generator-Drift (Alt-Landmine `generate-seo-pages.js` schrieb 24 URLs) | Stufe 76 d rot; Live-Sitemap ≠ generierte | Datei fehlt im neuen Repo; Allowlist statt Blocklist; S60 Live-Diff | Claude |
| R12 | Sweep trifft Resend-Absender, ICS-UIDs, CORS, postMessage-Origin | Sweep-Log erwartet ≠ gefunden; CORS-Fehler; Mails ohne Absender | S11 klassenweise mit Asserts; S12 mit Zeilennummern; Stufe 60 | Claude |
| R13 | Free-Plan-Quoten geteilt | QUOTEN.md-Alarmschwelle überschritten | S19 vor Livegang; Upgrade statt Drosselung | Bolle |
| R14 | Umami-Doppelzählung (Staging, alte ID) | Staging-Host in den Seiten; Besucher ohne Website `<neu>` | `data-domains`, eigene Website-ID (S18) | Claude |
| R15 | Netlify-Zertifikat erneuert sich hinter dem Proxy nicht (ANNAHME) | `openssl`-enddate < 30 Tage in S61 | Proxy 24 h auf grau; Netlify Domain management → HTTPS → Renew | Bolle |
| R16 | Resend-Zustellbarkeit der neuen Domain | Testmails im Spam (S39); Bounce-Rate > 2 % | SPF, DKIM, DMARC `p=none` (S17); nur Transaktionsmails | Bolle |
| R17 | Bing zeigt ≈ 50 alte URLs (Bing `site:machsleicht.de`, 01.10.2026, Schätzung; BWT-Wert nach S16 ersetzt sie); beide Domains konkurrieren | BWT: beide Sites in denselben Query-Berichten | hingenommen; kein Eingriff alt; Bing-Import und IndexNow für `<neu>` | — |
| R18 | Launch mit noindex auf der Produktion | S46: X-Robots-Tag auf einer Sitemap-URL; GSC „durch noindex ausgeschlossen" | Kontext-Mechanik (S15), Stufe 74, Messung 0 Treffer (S46), S52 Lock | Claude |
| R19 | Massenänderung aus Versehen (Fix-Welle ändert Canonicals oder lastmod flächig) | Stufe 76 e rot; CHANGELOG ohne Eintrag | Grenze aus den Lesehinweisen; Konvention „Technisch:"; ein Deploy je 14 Tage | Claude |
| R20 | Paraphrasen unterlaufen die Shingle-Metrik | Reviewer-Finding „Paraphrase" trotz grüner Stufe 75 | Pflicht-Winkel „Satz für Satz gegen Quellseite" (S41); Fund → Abschnitt neu | Claude |

## G. Zeitleiste ab KW 41/2026 mit Kapazitätsrechnung

| KW | Datum | Meilenstein | Claude h (Schritte) | Claude mit Reserve +30 % | Bolle h |
|---|---|---|---|---|---|
| 41 | 05.–11.10. | Phase 0: Messungen, KV-Zählung, Schlüssel, E1–E20, Domain registriert | 1,5 (S3 1, S4 0,25, S5 0,25) | 2,0 | 7,0 (S1 1, S2 0,5, S4 0,25, S5 1,25, S6 2, S7 1,5, S8 0,5) |
| 42 | 12.–18.10. | Phase 1: Zone, Umami/Amazon, Demo-Foto, Repo, Inventar + Sweep, Worker-Code, Netlify + Zertifikat, Staging-noindex | 12 (S10 3, S11 4, S12 3, S15 2) | 15,6 | 3,75 (S9 1, S14 1,5, S18 1, S28 0,25) |
| 43 | 19.–25.10. | Phase 1 Rest: Secrets, GSC/Bing, Resend/Migadu, Quoten, Altkunden-Nachweis; Phase 2: IA, Stufe 73 v2, Stufe 75 | 12,25 (S13 0,5, S19 0,75, S20 1, S21 3, S22 3, S23 4) | 15,9 | 2,75 (S13 0,5, S16 0,5, S17 1, S19 0,25, S20 0,5) |
| 44 | 26.10.–01.11. | Generator, Redirects, IA eingefroren; Briefs, Fotos, Startseite, `/planen/`, Template-Inventar, 2 Reviews | 21 (S24 2, S25 2, S27 2, S29 6, S30 6, S39 1, S41 2) | 27,3 | 2,75 (S26 0,5, S28 1,75, Befunde 0,5) |
| 45 | 02.–08.11. | Zustands-URLs, Ritter, Piraten, Worker-Templates, 3 Reviews, Alt-Domain-Erstlesung | 22,25 (S31 4, S32 6, S33 6, S39 3, S41 3, S61 0,25) | 28,9 | 1,25 (Befunde 1, S61 0,25) |
| 46 | 09.–15.11. | `/einladung/`, `/spiele/`, `/paket/`, Trust, 3 Reviews | 23 (S34 5, S35 5, S36 5, S38 5, S41 3) | 29,9 | 3 (S35 1, S38 1, Befunde 1) |
| 47 | 16.–22.11. | `/kosten/` (E20), Screenshots, 3 Reviews, Pre-Launch-Crawl, Prüfstand, E2E, Rollback-Plan | 17,5 (S37 5, S40 2, S41 3, S42 3, S43 1, S44 3, S52 0,5) | 22,75 (E20 b: 11,5 → 14,95) | 0,5 (Befunde) |
| 48 | 23.–29.11. | Go/No-Go (Mo), Livegang (Di 09:00), Elternteil-Test, Altkunden-Nachweis, Soft Launch 72 h, Tag 4 Sitemap (Fr) | 4,5 (S45 0,5, S46 0,5, S48 0,5, S49 3) | 5,85 | 4,5 (S45 1, S46 0,5, S47 2, S50 1) |
| 49 | 30.11.–06.12. | erste Verlinkungen; erste Montagsmessung | 0,33 (S53) | 0,43 | 3,33 (S51 3, S53 0,33) |
| 50–53, 1/2027 | 07.12.–10.01. | Messung je Montag; kein Inhalts-Deploy; S61-Monatslesung am 07.12. (KW 50) und 04.01. (KW 1) | 0,33 je Woche (+0,25 in KW 50 und KW 1) | 0,43 (0,75 in KW 50 und KW 1) | 0,33 je Woche (+0,25 in KW 50 und KW 1) |
| 2/2027 | 11.01. | Gate 1 | 0,5 | 0,65 | 0,5 |
| 3/2027 ff. | ab 18.01. | Phase 6 Zyklus 1 (Dino), 14 Tage je Motto | 10–12 je Woche (Zyklus 1 bei E20 b: 13–15) | 13–15,6 (16,9–19,5) | 1,5 je Woche |
| 5/2027 | 01.02. | zweite Gate-Lesung (nur bei < 2/3 von L indexiert); S61-Monatslesung 01.02. | 0,75 | 0,98 | 0,75 |
| 8/2027 | 22.02. | Abbruchlesung T+12 | 0,25 | 0,33 | 0,25 |
| 29/2027 | Juli | 13 Zyklen, 22 Sitemap-URLs (nur bei durchgehend grünem Gate) | — | — | — |

Fußnote zur Tabelle: der S53-Wochenanteil (0,33 h Claude, 0,33 h Bolle) ist in allen Wochen ab KW 49 enthalten; die Gate-Zeilen 2/2027, 5/2027, 8/2027 und die Phase-6-Zeile 3/2027 ff. nennen nur den Zusatz der Lesung bzw. des Zyklus; S53 (0,33/0,33) kommt je Woche dazu.

Kapazität bis zum Livegang (KW 41–48), Stunden aus den Schritt-Feldern mit Teilung der „beide"-Schritte: Claude 114,0 h geplant (1,5 + 12 + 12,25 + 21 + 22,25 + 23 + 17,5 + 4,5), mit 30 % Reserve je Woche 148,2 h in 8 Wochen = 18,5 h je Woche; höchste Woche KW 46 mit 23 h, mit Reserve 29,9 h (Rahmen 20–30 h eingehalten; KW 45 28,9 h, KW 44 27,3 h); wählt Bolle E20 (b), sinkt KW 47 auf 11,5 h (14,95 h mit Reserve). Bolle 25,5 h in 8 Wochen (7 + 3,75 + 2,75 + 2,75 + 1,25 + 3 + 0,5 + 4,5) = 3,2 h je Woche (Rahmen 10–15 h), Spitze KW 41 mit 7 h. Gegatete Stücke bis Livegang: L + 2 Inhalts-Stücke (11 bei E20 a, S29–S39) plus 4 Werkzeug-Stücke (S22–S25) = 15 in 5 Wochen = 3 je Woche gegen 4–5 belegte (SESSION-NOTES 31.05.–14.09.). Phase 6: 20–24 h Claude je Zyklus = 10–12 h je Woche; Zyklus 1 bei E20 (b) 26–30 h = 13–15 h je Woche (16,9–19,5 h mit Reserve). Erstes hartes Gate: 11.01.2027 (S54), sechs Wochen nach Sitemap-Einreichung.

## Quellen (alle abgerufen am 01.10.2026)

Google, Primärquellen: Get your website on Google — https://developers.google.com/search/docs/fundamentals/get-on-google · SEO Starter Guide (G14) — https://developers.google.com/search/docs/fundamentals/seo-starter-guide · Search Essentials — https://developers.google.com/search/docs/essentials · Spam policies (G16) — https://developers.google.com/search/docs/essentials/spam-policies · Site reputation abuse update (G18) — https://developers.google.com/search/blog/2024/11/site-reputation-abuse · Site move with URL changes (G6) — https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes · Site move without URL changes — https://developers.google.com/search/docs/crawling-indexing/site-move-no-url-changes · Canonicalization (G3) — https://developers.google.com/search/docs/crawling-indexing/canonicalization · Consolidate duplicate URLs (G2) — https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls · Redirects (G1) — https://developers.google.com/search/docs/crawling-indexing/301-redirects · Block indexing — https://developers.google.com/search/docs/crawling-indexing/block-indexing · Robots meta tag — https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag · JavaScript SEO basics (G26) — https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics · URL structure — https://developers.google.com/search/docs/crawling-indexing/url-structure · Build and submit a sitemap (G11) — https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap · Sitemaps lastmod (G12) — https://developers.google.com/search/blog/2023/06/sitemaps-lastmod-ping (heute nicht abrufbar; Aussage aus G11 gedeckt) · Page indexing report (G8) — https://support.google.com/webmasters/answer/7440203 · URL Inspection (G9) — https://support.google.com/webmasters/answer/9012289 · Sitemaps report — https://support.google.com/webmasters/answer/7451001 · Verify site ownership — https://support.google.com/webmasters/answer/9008080 · Crawl stats report — https://support.google.com/webmasters/answer/9679690 · Links report — https://support.google.com/webmasters/answer/9049606 · Core Web Vitals report — https://support.google.com/webmasters/answer/9205520 · Software app structured data — https://developers.google.com/search/docs/appearance/structured-data/software-app · HowTo/FAQ changes — https://developers.google.com/search/blog/2023/08/howto-faq-changes · Core updates (G21) — https://developers.google.com/search/updates/core-updates · Creating helpful content (G23) — https://developers.google.com/search/docs/fundamentals/creating-helpful-content · Organization structured data (G25) — https://developers.google.com/search/docs/appearance/structured-data/organization · Ranking updates (G27) — https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history

Infrastruktur (Primärquellen der Anbieter): Cloudflare TLD policies (M1) — https://www.cloudflare.com/tld-policies/ · Cloudflare add a site — https://developers.cloudflare.com/fundamentals/manage-domains/add-site/ · Cloudflare full setup — https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/ · Cloudflare proxy status — https://developers.cloudflare.com/dns/proxy-status/ · Workers custom domains (M8) — https://developers.cloudflare.com/workers/configuration/routing/custom-domains/ · Wrangler configuration (M9) — https://developers.cloudflare.com/workers/wrangler/configuration/ · Wrangler Workers commands — https://developers.cloudflare.com/workers/wrangler/commands/workers/ · Workers secrets — https://developers.cloudflare.com/workers/configuration/secrets/ (`secret put` erzeugt und deployt eine neue Version; Dashboard: Settings → Variables and Secrets) · Wrangler KV commands — https://developers.cloudflare.com/workers/wrangler/commands/kv/ · Workers rollbacks — https://developers.cloudflare.com/workers/configuration/versions-and-deployments/rollbacks/ · Workers limits — https://developers.cloudflare.com/workers/platform/limits/ · KV limits — https://developers.cloudflare.com/kv/platform/limits/ · Crawler Hints — https://developers.cloudflare.com/cache/advanced-configuration/crawler-hints/ · IndexNow FAQ (G28) — https://www.indexnow.org/faq · Bing import from GSC (G29) — https://blogs.bing.com/webmaster/september-2019/Import-sites-from-Search-Console-to-Bing-Webmaster-Tools · Netlify assign a domain (M5) — https://docs.netlify.com/manage/domains/manage-domains/assign-a-domain-to-your-site-app/ · Netlify multiple domains — https://docs.netlify.com/manage/domains/manage-domains/manage-multiple-domains/ · Netlify external DNS — https://docs.netlify.com/manage/domains/configure-domains/configure-external-dns/ · Netlify HTTPS — https://docs.netlify.com/manage/domains/secure-domains-with-https/https-ssl/ · Netlify troubleshooting — https://docs.netlify.com/manage/domains/troubleshooting-tips/ · Netlify branch deploys (M6) — https://docs.netlify.com/deploy/deploy-types/branch-deploys/ · Netlify deploy overview — https://docs.netlify.com/deploy/deploy-overview/ · Netlify manage deploys — https://docs.netlify.com/deploy/manage-deploys/manage-deploys-overview/ · Netlify headers — https://docs.netlify.com/manage/routing/headers/ · Netlify file-based configuration — https://docs.netlify.com/build/configure-builds/file-based-configuration/ · Netlify redirect options — https://docs.netlify.com/manage/routing/redirects/redirect-options/ · Netlify project visibility — https://docs.netlify.com/manage/security/secure-access-to-sites/project-visibility/ · Netlify pricing (M7) — https://www.netlify.com/pricing/ · Resend pricing — https://resend.com/pricing · Resend Cloudflare DNS — https://resend.com/docs/dashboard/domains/cloudflare · Umami Cloud FAQ — https://docs.umami.is/docs/cloud/faq · Umami tracker configuration — https://docs.umami.is/docs/tracker-configuration · Migadu pricing — https://www.migadu.com/pricing/ · Screaming Frog SEO Spider — https://www.screamingfrog.co.uk/seo-spider/ · Pinterest claim website (M11) — https://help.pinterest.com/en/business/article/claim-your-website · DENIC Domainrichtlinien 01/2026 (M2) — https://www.denic-services.de/denic-direct/denic-domainrichtlinien · DENIC Providerwechsel (M3) — https://www.denic.de/domains/de-domains/providerwechsel · DENIC Domainabfrage — https://webwhois.denic.de/ · DPMA Markenrecherche — https://register.dpma.de/DPMAregister/marke/basis · TMview — https://www.tmdn.org/tmview/ (Web-App, als Suchwerkzeug zitiert) · § 5 DDG — https://www.gesetze-im-internet.de/ddg/__5.html · § 7 UWG — https://www.gesetze-im-internet.de/uwg_2004/__7.html · Registrar-Preise (M4): INWX https://www.inwx.de/de/domain/pricelist · netcup https://www.netcup.com/de/domain/zusaetzliche-domain-de · united-domains https://www.united-domains.de/de-domain/ · IONOS https://www.ionos.de/domains/de-domain

Sekundärquellen (nur Hinweis): Search Engine Journal, Google On Staging Sites (07.04.2023) — https://www.searchenginejournal.com/google-on-staging-sites-preventing-accidental-indexing/484257/ · Semrush, SEO for a new website: first 90 days (17.08.2026) — https://www.semrush.com/blog/seo-for-new-website/ · Mueller 2019/2020/2023, Mueller/Splitt 07/2026, Sullivan 2024 wie im Auftrag 3.2 · eigene Messungen: `_dev/GSC-INDEX-PLAN.md` (28.05.2026: 11 Anfragen, dann erschöpft), SESSION-NOTES (71 Gate-Einträge 31.05.–14.09.), heutige Zählungen mit Kommando.

## H. Selbstprüfung

| Prüfpunkt | Ergebnis | Zitat der Planstelle |
|---|---|---|
| Alle 24 Winkel adressiert oder begründet verworfen | ja | W1 → 0.1, S1, S2, S54; W2 → S22; W3 → S23; W4 → S7, S8, E1; W5 → S9–S19; W6 → S21, S25; W7 → 0.2, S29–S31, E15; W8 → D; W9 → Lesehinweise, S24, S60; W10 → S50, S51; W11 → S38, S40; W12 → S21 (d), R2; W13 → S25, S29, S42; W14 → S4, S20, E5, E9, E12, S63; W15 → S38, E12, E13, S7; W16 → S53, E; W17 → G, S43; W18 → D Weglass-Probe; W19 → S56; W20 → S62; W21 → S47; W22 → S20, S48; W23 → S45, S52; W24 → Phase-4-Einleitung |
| Kein Schritt ohne Beleg | ja | 63 Blöcke S1–S63 mit je einem Feld „Beleg:" samt Kommando oder Messung und Kontrollzahl (S46: „L × 200, 0 × X-Robots-Tag") |
| Keine Google-Aussage ohne URL | ja | jede Aussage trägt G-Nummer oder Dokumentnamen, aufgelöst im Abschnitt Quellen; Sekundärquellen tragen „nur Hinweis" |
| Keine der beiden Hypothesen als Tatsache | ja | 0.1: „Der Plan behandelt keine der beiden als Tatsache."; S54: „H1 gestützt (nicht bewiesen)" |
| Keine verbotene Maßnahme aus Abschnitt 6 des Auftrags | ja | Phase 7: „keine Rückbauten, keine noindex-Welle, keine Validierungen, keine Indexierungsanträge"; S22-Matrix verbietet Redirects, Canonicals, Links, Bilder, Texte in beide Richtungen; S50: „jede genau einmal, nie wieder"; einzige Ausnahme S5 (b) nur mit schriftlicher Freigabe E19 — Stand 01.10.2026 greift Weg (a), der Alt-Stack bleibt unverändert |
| Jede Zahl mit Quelle | ja | Lesehinweise: Zahlen stammen aus der Ist-Analyse oder tragen das Kommando (S12: „65 Zeilen mit Hostnamen, gezählt heute mit `grep -c machsleicht`") |
| Jeder Bolle-Schritt gebündelt | ja | Phase 1: „Bolles Klickstrecke in dieser Reihenfolge: S9 → S18 → S28-Demo-Foto → S14 → S16 → S17 → S13"; S50 bündelt Sitemap, Anfragen, Bing, IndexNow in einer Sitzung |
| Altkunden-Nachweis und Rollback vor dem Livegang | ja | S20 (Phase 1) und S52 („steht vor dem Livegang") sind Zeilen 11 und 12 der Go-Liste S45; S48 wiederholt den Nachweis danach |
| Keine Vagheitswörter, keine Score-Skala | ja | Verbotsliste aus Abschnitt 6 des Auftrags per grep geprüft: 0 Treffer; Score nur als Reviewer-Telemetrie (S41) |
| Kontrollzahlen abgeleitet, nicht getippt | ja | S6 „Datei mit 20 Zeilen (E1–E20, eine je Entscheidung in Abschnitt C)"; S43 „erkannte Mutationen = Zahl der Fälle … 10/10"; G aus den Dauer-Feldern (114,0 h, Summenterm im Kapazitätsabsatz); „= L" statt „9" in A, S21, S24, S26, S42, S45, S46, S50, D |
| Jede Kontrollzahl in einem Beleg nennt die Ableitung (Kommando oder Summe) | ja | S43 „= Zahl der Fälle (73: 6, 74: 2, 75: 1, 76: 1 → 10/10)"; S25 „Treffer = L von L; `'none'` = L + 2; Spielregeln = `ls spiele/game-*.html | wc -l` (60)"; S44 „15 Knoten → 14 Laufzeiten, die Zahl gibt das Skript aus"; S22 „6/6 = 5 S22-Fälle plus S11-Fall"; S6 „20 Zeilen = E1–E20 aus Abschnitt C"; S42 „9 Prüfspalten benannt → 9"; S43 „zehn Fälle mit `gruppe="stufe73-76"` und Namen, 6/6 und 10/10 ableitbar"; S46 „sechs Zahlen benannt"; S12 „20 Zeilen aus `git show … | grep -c`"; G Summenterm im Kapazitätsabsatz |
| Fixliste v5 → v6 vollständig eingearbeitet | ja | 14 Punkte J1–J14 plus eine Zeile Folgeänderungen im Änderungsprotokoll v5 → v6; Beleg-Wortlaute Klasse 15 und Prüfstand-Namen durchgängig (S11, S12, S15, S22, S23, S24, S25, S43) |
| Fixliste v4 → v5 vollständig eingearbeitet | ja | 18 Punkte H1–H18 plus eine Zeile Folgeänderungen im Änderungsprotokoll v4 → v5; der Cluster S11/S12/S22/S45 (7) wurde zusammenhängend gelesen (Klasse 15, Format mit P, befristete Ausnahme bis S12) |
| Fixliste v3 → v4 vollständig eingearbeitet | ja | 18 Punkte (G1–G17, G20; G18 in G5 enthalten, G19 Prozesshinweis) plus eine Zeile Folgeänderungen im Änderungsprotokoll v3 → v4; Folgestellen je Punkt per grep gesucht |
| Fixliste v2 → v3 vollständig eingearbeitet | ja | 24 Punkte F1–F24 plus eine Zeile Folgeänderungen im Änderungsprotokoll v2 → v3; je Punkt Folgestellen per grep gesucht (Schrittnummer, Zahl, Begriff) und mitgezogen |
| Fixliste v1 → v2 vollständig eingearbeitet | ja | 20 Punkte (1–19, K1), je eine Zeile im Änderungsprotokoll unten; S5 (b) als E19-Ausnahme, S25 CSP per Pfad, S11 Inventar, Demo-Foto neu, Shells mit Self-Canonical, H2-Schwelle nur T+12, init-Commit auf `main`, Secrets durch Bolle, Leitsatz 0.7, E8-Abweichung, 0.6 präzisiert, Stufe 75 gegen 136 Alt-Seiten, G neu summiert |

## Was dieser Plan nicht garantieren kann

Google veröffentlicht weder Indexierungs- noch Erholungsfristen; T+6 und T+12 Wochen sind Setzungen aus zwei vagen Google-Aussagen und bleiben ANNAHME. Die Diagnose der Ist-Analyse ist eine zeitliche Passung, kein Kausalbeweis — weder H1 noch H2 lässt sich von außen beweisen, und ein grünes Gate 1 beweist H1 nicht, es macht sie wahrscheinlicher. Dass Google den gemeinsamen Betreiber nicht als Verbindung wertet, ist nicht dokumentiert; der Plan trennt alles Trennbare und nimmt die Identität als Pflicht hin. Ob die neue Domain Besucher bekommt, hängt an Suchintentionen, die heute Canva, Händler-Hubs und Pinterest halten (1.7) — kein Schritt verspricht Traffic mit Datum. Deshalb liegt das erste harte Gate am 11.01.2027: nach L Sitemap-URLs (9 oder 8) und rund 148 Claude-Stunden, bevor der Motto-Ausbau 26 Wochen bindet.

## Änderungsprotokoll v1 → v2

| Nr | Stelle | Was geändert |
|---|---|---|
| 1 | S5, E19 (neu), S6, H | S5 in (a) Datumsvergleich aktiver Key gegen letzten Leak-Commit (nur ältere Keys löschen, kein `secret put`), (b) Rotation nur als schriftlich freigegebene Ausnahme E19 mit Begründung (neue Worker-Version ändert nur das Secret, `party.machsleicht.de` noindex), (c) Cloudflare-Tokens, (d) Netlify-Token-Löschung als Bolles Entscheidung; Artefakt und Beleg mit Datumsspalten; S6 auf 20 Zeilen; H-Zeile ergänzt |
| 2 | S25, S42 (6), S15 Stufe 74 (d), S45 (4), Übersicht Phase 3 | `_headers` aus Allowlist generiert: `frame-ancestors 'none'` je indexierbarem Pfad, `frame-ancestors 'self' https://party.<neu>` je Spieldatei, kein `X-Frame-Options`; Beleg mit CSP-Grep; Playwright-Prüfung Demo-iframes und 0 CSP-Fehler; Stufe 74 prüft CSP je Sitemap-URL; Crawl-Tabelle 9×9 |
| 3 | S11 | Inventar `grep -rIl` vor dem Sweep mit Tabelle Datei/Vorkommen/Klasse (Prüfer-Messung draft); Klassen 9–14 (Paket-Shells, Maschine-Template, slots-inventar, PALETTE.md, CSS-/Fonts-Kommentare, Prüfskripte mit Host-Default, Prüfstand-Fälle, `js/index.js`); Stufe 73 ausdrücklich ohne `_dev/`-Ausnahme; Beleg „Inventar nach Sweep = 0" statt „acht Klassen"; Dauer 4 h |
| 4 | S10, S11 (3), S12, S28, S35 | `demo-kid.jpg` nicht übernommen; neues Demo-Foto `spiele/core/demo-hand.jpg` (S28, bereits KW 42, kein Kindergesicht); Default-Pfade in `core.js` (Alt-Zeile 83) und Worker (Alt-Zeile 1958) umgestellt; S35-Demo-URL angepasst |
| 5 | S21 Baum, S31, Stufe 74b, E7 | Shells tragen `noindex,follow` per Meta und Header plus Self-Canonical; kein Canonical auf die Motto-Ebene (G2); Stufe 74b prüft Self-Canonical |
| 6 | S54, 0.1 Messung-Zeile, S3, E-Tabelle | H2-Schwelle einheitlich T+12 (E17/S55); bei T+6: ≥ 6/9 → Phase 6, 3–5 → zweite Lesung 01.02., ≤ 2 → zweite Lesung und S56 vorbereiten; „sofort S56" gestrichen; Prä-Registrierung in S3 nennt genau diese Regeln |
| 7 | S10, S14, S46, S52 | `git commit --allow-empty -m "init [skip netlify]"` auf `main`, `staging` davon; Netlify-Produktion liefert bis S46 404; S46 prüft `git merge-base --is-ancestor main staging`; Rollback-Zeile nennt den init-Deploy als Vorgänger |
| 8 | S13, S5 | Bolle setzt Secrets selbst im Terminal-Tab der App (`wrangler secret put`, Claude liefert Kommando und CWD) oder im Dashboard (Settings → Variables and Secrets); Claude belegt mit `wrangler secret list` |
| 9 | 0.7 (neu), 0.1, S28, S59, E14, E16 | Leitsatz 0.7 „Nur zeigen, was funktioniert (Architekturregel E5 der alten Site)" angelegt; fünf Verweise von „E5" auf „0.7" umgehängt; Abschnitt-C-E5 bleibt Worker/KV |
| 10 | E8, S6 | Satz zur Abweichung von der Entscheidung 11.08. (zwei Mottos parallel, Schiff ohne Trailer und Foto-Print) ergänzt; OK als Zeile in S6 |
| 11 | 0.6, S34, S36, D | 0.6 präzisiert auf „Werkzeug-Zustand oder Produkt-/Trust-Seite mit eigenem Zweck"; `/einladung/` mit Live-Demo-Partyseite (iframe, TTL-Hinweis), `/paket/` mit Paket-Vorschau `?demo=1`; D-Zeilen entsprechend |
| 12 | S23 | Stufe 75 zusätzlich gegen alle 136 Alt-Sitemap-Seiten mit Maximalwert und Alt-URL je neuer Seite; Laufzeit-Beleg angepasst |
| 13 | G, Kapazitätsabsatz, Phase-3-Einleitung, S4/S13/S19/S20/S45/S46/S53/S54/S55/S56, S34, S37, S41, Schluss | S34 → KW 46, S37 → KW 47; „beide"-Schritte mit Stundenteilung Claude/Bolle; S41 je Woche verteilt; Tabelle G mit Spalte „mit Reserve +30 %" neu summiert (Claude 112,75 h, 146,6 h mit Reserve, Max-Woche 29,9 h; Bolle 25,25 h); Schlussabsatz „rund 147" |
| 14 | S52, S12, S56 (3), S47, S45 (12) | Lock als Bolle-Klick oder `netlify-cli api lockDeploy` mit 1-Tag-Token (S45 hält ihn bereit); ICS-UID `UID:<id>@party.<neu>`; S56 (3) als Wochenliste mit Zählziel (2 je Woche, 24 gesamt, ≥ 5 Domains); S47 mit sieben nummerierten Schritten |
| 15 | S46, S50, S53 | Live-Test mit eigenem Tageslimit (G9), zählt nicht als Antrag; drei getrennte Limits (Prüfung, Live-Test, Antrag) genannt, Zahlen als ANNAHME |
| 16 | S43, S45 (6), E20 (neu), D, S37 | Prüfstand nur Stufen 73–76 (4/4, 1 h); `/kosten/` als E20 „Launch-Set ★ oder Zyklus 1" mit Kapazitätsfolge in G; D-Zeile und Weglass-Probe verweisen auf E20 |
| 17 | S13 | Token-Vorlage „Edit Cloudflare Workers" plus Zone → DNS → Edit für `<neu>`; Stopp-Zeile „Permission denied → Custom Domain im Dashboard anlegen (Pfad)" |
| 18 | S56 (6), R17, S16 | „≈ 50 (Bing `site:machsleicht.de`, 01.10.2026, Schätzung)" mit Ersatz durch den BWT-Wert; S16 importiert machsleicht.de lesend mit |
| 19 | S22 Matrix | Beide Affiliate-Kennungen als ANNAHME ohne Google-Beleg; Amazon-ID neu (PartnerNet-Site-Liste), AWIN-ID bleibt (zweites Publisher-Konto unverhältnismäßig) |
| K1 | S11 (1) | Schema von `_dev/config/site.json`: `domain`, `brand`, `umamiId`, `amazonTag`, `partyHost`, `stagingHost` |
| Folgeänderungen v2 | Kopfzeile, A, Phase-1-Eingang, S6-Titel, G KW 41, S25, G 5/2027, Quellen, S10 | Kopfzeile „v2"; „E1–E18" → „E1–E20" in A, Phase-1-Eingang, S6-Titel und G KW 41; S25 `/paket/<motto>/` statt `/paket/*` (ein Splat hätte die indexierbare `/paket/` erfasst); G 5/2027 „nur bei ≤ 5 von 9"; Quellen um Workers-secrets ergänzt; S10 `js/index.js` in die Nicht-übernehmen-Liste |

## Änderungsprotokoll v2 → v3

| Nr | Stelle | Was geändert |
|---|---|---|
| F1 | S12, S34, S42 (6), S44, D `/einladung/` | Worker-CSP (Alt-Zeilen 1328/1334) → `frame-ancestors 'self' https://<neu> https://staging--<neu-site>.netlify.app`; S34 hängt an S12 und belegt den iframe; S42 (6) prüft zusätzlich `/einladung/` (Partyseiten-iframe) und `/paket/` (`?demo=1`); S44 mit Schritt „Demo-iframe auf /einladung/ rendert" (10 Zeitstempel); D-Zeile nennt die Worker-CSP |
| F2 | S5 (a)/(b), E19, S6, S20, A Phase 0, E4, R7, H (Weg a) | S5 (a) mit scharfem Muster und vorweggenommenem Ergebnis (`re_` = 0 Treffer, cfut_/nfp_ 2 Tokens): Weg (a), nichts zu rotieren; (b)/E19 nur als Regel für einen künftigen Treffer; E19 immer als Zeile; S20 „Weg a: Alt-Stack unverändert; Weg b: nur Resend-Key"; A Phase 0 und E4 „0 gültige Schlüssel aus der Git-Historie (cfut_/nfp_: 2 geprüft), Resend-Key-Status nach S5 (a)"; R7 „401 nur bei Weg b" |
| F3 | S11 Stufe 73, S45 (7), S22 Beleg, S20 Artefakt, S52 Artefakt, S5 Artefakt | Stufe 73 als Erlaubnisliste (ausgelieferte Dateien + `_dev/scripts/*.py|mjs|js` + `netlify/functions/*`; Ausnahmen aufgezählt) mit Ausgabe „0 Verbindungen (N geprüfte Dateien)"; Prüfstand-Fall mit zwei Armen; S45 (7) auf den Stufe-73-Lauf; S22-Beleg mit N; Messdateien und ROLLBACK.md als ausgenommen markiert |
| F4 | S10, S14, S46, S45 (13), S41, S42, S15, S52, A Phase 4 (Go-Liste 13/13) | init-Commit ohne Marker (`git commit --allow-empty -m "init"`), leerer Produktions-Deploy als Rollback-Vorgänger („Published" in S14); S46 `git checkout main && git merge --no-ff staging -m "Livegang <Datum>" && git push` mit Deploy-Log-Beleg; S45 Zeile (13) HEAD-Message ohne `[skip`; S41 Review-Commits dürfen den Marker tragen; S42 Vorbedingung letzter Staging-Push ohne Marker; S15 Push ohne Marker; S52 nennt den init-Deploy als „Published" |
| F5 | Lesehinweise, 0.1, S3, S54, E17, E, R4, A, S21, S24, S26, S42, S45 (3)(4)(9), S46, S50, D, E20, S6, Phase-3-Einleitung, S27, S41, Phase-6-Einleitung, S55, S49, G 5/2027, Schluss | L = Allowlist-Länge (9 bei E20 a, 8 bei E20 b) als Lesehinweis; Gate-Schwellen als Anteile von L (≥ 2/3, ≤ 1/4, ≥ 50 %) in 0.1, S3, S54, E17, E, R4; Kontrollzahlen „= L" in A, S21, S24, S26, S42, S45, S46, S50, D; „11 Stücke" → „L + 2"; E20 (b) mit vollständiger Folgeliste (KW 47 −6 h inkl. Review, S37/D-Zeile in Zyklus 1); S6 Frist „E20 vor S21"; S21 hängt an E20 |
| F6 | 0.2, S21 Stopp, S26, S27 Stopp | Formel „Werkzeug-Zustand oder Produkt-/Trust-Seite mit eigenem Zweck" an allen vier Stellen; `/ueber-uns/` bleibt im Launch-Set |
| F7 | S6 Artefakt/Beleg | E19 immer als Zeile; E8-OK als Teil der E8-Zeile; „Datei mit 20 Zeilen (E1–E20, eine je Entscheidung in Abschnitt C)" abgeleitet; grep = 20 |
| F8 | S15 Stufe 74 (d), S25 | Prüfpunkt (d) von S15 nach S25 verschoben und dort belegt (Zähler der CSP-Regeln = L); S15-Beleg auf (a)–(c) |
| F9 | S25, S31 | Shell-Regel `/planen/:motto/:alter/*` mit `X-Robots-Tag: noindex, follow` statt `/planen/*/*/`, Staging-Messung nach Header-Wert „noindex, follow" für `/planen/ritter/` (0) und `/planen/ritter/6-8/` (1), weil Staging zusätzlich die `/*`-Zeile aus S15 trägt; Produktion in S46 nach Header-Zahl (0/1); S31-Beleg mit Self-Canonical-Grep |
| F10 | S13, S5 (b) | Authentifizierung der Terminal-Sitzung per `npx -y wrangler login` oder `$env:CLOUDFLARE_API_TOKEN=<Token>`; Claude liefert die Kommandozeile ohne Token-Wert |
| F11 | S16, S3, S61, Phase-7-Einleitung | BWT-Property machsleicht.de als Lese-Ausnahme (Import legt Bing-Property mit 136er-Sitemap an); S3 Alt-Domain-Zeile mit Spalte „Bing indexiert"; S61 liest den BWT-Wert; Phase-7-Einleitung nennt die Ausnahme |
| F12 | S10, S11 (1), S18 | `site.json` mit Feldschema in S10 angelegt (Werte, Leerfelder bis S18, Schema-Check im Beleg); S11 (1) „vervollständigen und lesen"; S18 trägt `umamiId` und `amazonTag` ein (Beleg = 2) |
| F13 | S11, S35, Phase-1-Klickstrecke, H | S28 als Abhängigkeit in S11 und S35; Demo-Foto als Punkt in Bolles Klickstrecke vor S11 (auch in H) |
| F14 | S11 (3) | invimg-Host-Regex in core.js Alt-Zeile 83 als eigene Fundstelle → `party.<neu>` |
| F15 | S10, S11 (9), S11 Inventar | `paket/_vergleich/` nicht übernommen (S10) und aus Klasse (9) gestrichen; Klassen-Erwartungen allein aus dem Inventar des kopierten Baums, Prüfer-Zahlen als Orientierung |
| F16 | S35, S38, S49, S53, S61, S39, G, Kapazitätsabsatz, R10, E, A Phase 4 (9 Checks), Schluss | S35/S38 „6 h (Claude 5 / Bolle 1)"; S49 „3 h (9 × 20 min)" → KW 48 Claude 4,5 (5,85); S53 „0,67 h (0,33 / 0,33)"; S61-Erstlesung 0,25/0,25 in KW 45; S39 1 h nach KW 44; G neu summiert (Claude 114,0 h, 148,2 h mit Reserve, Max-Woche KW 46 29,9 h; Bolle 25,5 h); R10 25,5 h (Fixliste nannte 25,25; abgeleitet aus G inkl. S61-Erstlesung Bolle 0,25); E-Tabelle „9 Checks in 3 Tagen"; Schluss „rund 148" |
| F17 | S43, S45 (6) | Kontrollzahl abgeleitet: erkannte Mutationen = Zahl der Fälle (73: 6, 74: 1, 75: 1, 76: 1 → 9/9); S45 (6) „Prüfstand 9/9 (= Zahl der Fälle, S43)" |
| F18 | S54 | Klammer getrennt: Status-Definition G8; Nichtunterscheidbarkeit nach sechs Wochen als ANNAHME des Plans |
| F19 | E8 (a) | „(Trailer-Prototyp vorhanden, Einbau erst S59)" |
| F20 | S45 (12), S52, S49 (c), S56 Beleg | Netlify-Token 14 Tage gültig für `lockDeploy` im Soft-Launch- und Rollback-Fenster; S49 prüft die Gültigkeit; S56-Beleg „12 Wochenzeilen in VERLINKUNG.md, 0 rot" |
| F21 | S53 | ANNAHME ergänzt: „sonst Rest am Folgetag; Zahl der an einem Tag möglichen Prüfungen in der Montagszeile notieren" |
| F22 | S40 | „Hängt ab von" um S37 ergänzt (OG-Bild für `/kosten/`, nur bei E20 a) |
| F23 | S61 | Zeile „Demo-Party auf party.<neu> (S34): Ablaufdatum aus KV lesen, < 60 Tage → neu anlegen" (TTL-Deckel 2 Jahre) |
| F24 | Änderungsprotokoll v1 → v2 | Zeile „Folgeänderungen v2" nachgetragen (Kopfzeile, E-Zahl in A/Phase-1-Eingang/S6-Titel/G KW 41, S25 `/paket/<motto>/`, G 5/2027, Quellen Workers-secrets, S10 `js/index.js`) |
| Folgeänderungen v3 | Kopfzeile, Lesehinweise, 0.1, S14 Beleg, S15, S21 Baum und Doorway-Text, S27, S41, S49 (a), S52 Tun, S55, Phase-6-Einleitung, G 5/2027, R10, Schluss, H | Kopfzeile „v3"; Lesehinweis „L"; 0.1 „L Sitemap-URLs (9 oder 8, E20)"; S14-Beleg „init-Deploy Published"; S15 Push ohne Marker; S21 Baum `/kosten/` mit E20-Hinweis und Doorway-Text „L (8–9) Werkzeug-Seiten"; S27 „L + 2 Briefs"; S41 Marker-Hinweis; S49 (a) und S52 „die L Sitemap-URLs"; S55 „bei L = 8: ≥ 4"; Phase-6-Einleitung „L → 22, `/kosten/` in Zyklus 1 bei E20 b"; G 5/2027 „< 2/3 von L"; R10 „25,5 h"; Schluss „L Sitemap-URLs (9 oder 8), rund 148"; H-Zeilen „Kontrollzahlen abgeleitet" und „Fixliste v2 → v3" neu, Klickstrecke und S46-Zitat angepasst |

## Änderungsprotokoll v3 → v4

| Nr | Stelle | Was geändert |
|---|---|---|
| G1 | S11 Erlaubnisliste, S11 Inventar, S11 Prüfstand-Arm, S11 Beleg, S22 Matrix und Beleg, S21 (d)(1), S45 (7) | Erlaubnisliste um `_redirects`, `_headers`, `netlify.toml`, `wrangler.toml`, `.netlifyignore`, `*.md` (Publish-Root außer `_dev/`); Inventar in zwei Umfängen (a) Stufe-73-Umfang und (b) Sweep-Zusatz mit getrenntem Beleg; Prüfstand-Arm 1 um `_redirects` (Fallzahl 6 bleibt); Matrix-Zeile 301/302/308 mit Stufe-73-Lesung und einmaliger Alt-Messung; Ausgabe-String identisch in S11, S22, S45 (7) |
| G2 | S45 (13), S45 (4), S42 Vorbedingung, S46 Beleg, Protokoll F4 | (13) misst `git log -1 --format=%s staging` ohne `[skip` (= S42-Vorbedingung, Ist-Wert = Message); S46-Beleg `git log -1 --format=%s main` = „Livegang <Datum>"; S42 (1)–(2) nach dem letzten Staging-Push (S43/S44/S52 vorher) oder wiederholt; S45 (4) trägt die Branch-Deploy-SHA ein; F4-Zeile um „A Phase 4 (Go-Liste 13/13)" |
| G3 | S25 Beleg und Klammer, S31 Beleg, S46 Tun und Beleg, Protokoll F9 | Messung nach Header-Wert „noindex, follow" auf Staging (Staging trägt die `/*`-Zeile aus S15); Produktion in S46 nach Header-Zahl (`/planen/ritter/` 0, `/planen/ritter/6-8/` 1 → fünf Zahlen L/0/L/0/1); Netlify-Doku-Klammer auf den Wortlaut gekürzt (Platzhalter am Segmentanfang, Wildcards matchen auch `/`); F9-Zeile präzisiert |
| G4 | S5 Tun (c)/(d), S5 Artefakt, A Phase 0, E4, Protokoll F2 | „2 Tokens" aufgeschlüsselt: `cfut_` 1 (Cloudflare, widerrufen), `nfp_` 1 (Netlify, Status nach Bolles Entscheidung); A Phase 0 und E4 entsprechend; F2-Zeile um „H (Weg a)" |
| G5 | R5, D `/`, S23 Tun und Beleg, S57 (11) | R5 „L (9 oder 8) Seiten"; D `/` „Inlinks zu allen übrigen L − 1 Sitemap-Seiten"; S23 „(L + 2) × 136 Vergleiche"; S57 bei E20 (b): Zyklus 1 zusätzlich `/kosten/` (Allowlist +2, zwei Anträge, +6 h) |
| G6 | S21 (d)(3), S27 Tun | Formel „Werkzeug … oder Produkt-/Trust-Seite mit eigenem Zweck" in (d)(3) und im Brief-Feld |
| G7 | S6 Kopf, S8 Artefakt | S6 hängt an S5 (a) (`re_`-Zählung mit Datum); S8 hängt die Wahl an die E1-Zeile an (keine zweite „E1"-Zeile, grep bleibt 20) |
| G8 | S25 Tun und Beleg, S43 Tun und Beleg, S45 (6), H | Stufe 74 (d) mit abgeleiteten Zählern (Treffer L von L, `'none'` = L + 2, Spielregeln = 60) und eigenem Prüfstand-Fall; Stufe 74 = 2 Fälle → 10/10 in S43, S45 (6), H |
| G9 | S13, S5 (b) | `$env:CLOUDFLARE_API_TOKEN="<Token>"` mit Anführungszeichen (PowerShell 5.1); Git-Bash-Variante `export CLOUDFLARE_API_TOKEN="<Token>"` |
| G10 | S10 Kopf, S18 Kopf, Klickstrecke, S18 Beleg | S10 hängt an E1, E2, E4; S18 hängt an S10 (`site.json`); Klickstrecke „S18 erst nach S10"; S18-Beleg `grep -oE … | wc -l` = 2 |
| G11 | Protokoll F16, G 8/2027, G KW 50–53/1-2027 | F16 nennt die Herleitung von R10 25,5 h; Reserve 8/2027 = 0,25 × 1,3 = 0,33; S61-Monatslesung am 07.12. und 04.01. je +0,25 h Claude und Bolle in der Zeile 50–53/1-2027 |
| G12 | S22 Tun und Beleg | Dateiname `_dev/pruefstand/faelle_stufe73-76.py` wie S43; Beleg „6/6 (5 S22-Fälle plus S11-Fall mit zwei Armen; S43 zählt dieselben 6)" |
| G13 | S45 (12), S52, S49 (c) | Netlify-Token mit Ablaufdatum ≥ 09.12.2026 (Rollback-Fenster bis 08.12.; 14 Tage ab 23.11. endeten am 07.12.) |
| G14 | S61, S34 | Expiration über `wrangler kv key list --prefix` (Feld `expiration`, Unix-Sekunden) statt `kv key get`; S34 misst einmal, dass `expiration` gesetzt ist |
| G15 | S44 Artefakt | „ein Zeitstempel je Pfeil des Ablaufs (15 Knoten → 14 Laufzeiten; Zahl aus dem Skript)" statt „10 Zeitstempeln" |
| G16 | S12 Tun und Beleg | Zeilenliste der `party.machsleicht.de`-Literale durch `grep -n 'party\.machsleicht\.de' party-worker.js` (20 Zeilen / 22 Vorkommen im Alt-Stand — die v4-Zeile nannte 13, korrigiert in v5 H17; inkl. 1326, 1523, 2178/2182, 3068) ersetzt; Beleg `grep -c "frame-ancestors 'self' https://<neu> https://staging--<neu-site>.netlify.app"` = 1 |
| G17 | Änderungsprotokoll v2 → v3 | Nachträge: F4 „A Phase 4 (Go-Liste 13/13)", F16 „A Phase 4 (9 Checks)", F2 „H (Weg a)" |
| G20 | H | Neue Zeile „Jede Kontrollzahl in einem Beleg nennt die Ableitung (Kommando oder Summe)" mit Belegstellen, abgehakt |
| Folgeänderungen v4 | Kopfzeile, S5 Artefakt, S45 (4), S46 Tun und Beleg, S43 Tun, H | Kopfzeile „v4"; S5-Artefakt mit Treffer-Aufschlüsselung (`cfut_` 1, `nfp_` 1, `re_` 0); S45 (4) Branch-Deploy-SHA (aus G2); S46 Mottoseite 0 × `x-robots-tag` und „fünf Zahlen" (aus G3); S43 Tun nennt die zwei 74-Fälle (aus G8); H-Zeilen „Kontrollzahlen abgeleitet" (10/10) und „Fixliste v3 → v4" |

## Änderungsprotokoll v4 → v5

| Nr | Stelle | Was geändert |
|---|---|---|
| H1 | S11 Tun (15), S11 Beleg, S12 Kopf und Beleg, S45 (7) | Klasse (15) `wrangler.toml` und `party-worker.js` (im Umfang (a), Umschreibung erst in S12, Erwartung 1 + 65 Zeilen); S11-Beleg „(a) nach dem Sweep = genau diese zwei Dateien, Stufe 73 mit befristeter Ausnahme"; S12 hängt an „S11 (Klasse 15 offen)" und belegt „Stufe 73 ohne Ausnahme grün, Inventar (a) = 0"; S45 (7) bleibt Vollumfang |
| H2 | S11 Tun (b) | Sweep-Zusatz (b) nur `validate-all.sh` und `_dev/pruefstand/` (Klassen (2), (13)); `*.md` unter `paket/` und `fonts/` in (a) (Klassen (10), (11)), nach dem Sweep 0 |
| H3 | S11 Tun und Beleg, S22 Beleg, S45 (7) | Ausgabe als Format „(N geprüfte Dateien, P Prüfungen)" mit P aus dem Skript (S11: 0, ab S22: 5); S22 und S45 (7) erwarten P = 5; „derselbe String" auf das Format bezogen |
| H4 | S22 Matrix, S22 Beleg, Protokoll G1 | Matrix-Klammer „(Alt-Host im `<neu-repo>`: 0 Treffer)"; Beleg `git -C <alt-repo> show acebbc22:_redirects | grep -c '<neu>'` = 0 (einmalig, Datum); G1-Zeile „S22 Matrix und Beleg" |
| H5 | S10 Übernahmeliste | `.netlifyignore` übernehmen ohne die Zeile `Setup-Anleitung-machsleicht.docx`; `_redirects` ohne die Alt-Host-Zeilen 19, 73, 74 |
| H6 | S42 Kopf und Tun | „Hängt ab von: S29–S40; (1)–(2) nach dem letzten Push von S41, S43, S44, S52"; Vorher-Liste um S41 |
| H7 | S45 Artefakt | Go-Datei wird nach S46 auf `main` committet, nicht vor dem Livegang auf `staging` |
| H8 | S35 Beleg, S46 Tun | Staging-Zähler ≥ 1 (zwei passende Regeln), Repo-Beleg `grep -c '^/spiele/game-wappen-ritter.html' _headers` = 1; Produktionswert = 1 in S46 gemessen |
| H9 | S25 Kopf und Beleg | Beleg in Repo-Beleg (KW 44) und Staging-Messung (nach S31/S32, spätestens S42 (1)) getrennt; KW-Feld entsprechend |
| H10 | S46 Beleg | „die sechs Zahlen L (200) / 0 / 1 / L / 0 / 1" benannt |
| H11 | S25 Beleg | 4-Header-Zähler mit `grep -ciE` (HTTP/1.1 liefert Großschreibung) |
| H12 | S57 Kopf und Beleg, G 3/2027, Kapazitätsabsatz | E20-(b)-Variante: Zyklus 1 26–30 h, ≤ 5 Gate-Einträge, G „13–15 (16,9–19,5)", Kapazitätsabsatz entsprechend |
| H13 | S21 (b), 0.6 | IA.md-Spalte „Zweck (bei Produkt-/Trust-Seite)"; 0.6 „(IA.md-Spalten Werkzeug-Element/Zweck, S21)" |
| H14 | G 5/2027, G-Fußnote | 5/2027 mit S61-Monatslesung 01.02. (0,75 / 0,98 / 0,75); Fußnote: S53-Wochenanteil in allen Wochen ab KW 49 enthalten, Gate-Zeilen nennen nur den Zusatz |
| H15 | S22 Tun und Beleg, S43 Beleg | Fälle mit `gruppe="stufe73-76"` und Namen `stufe73-…` registriert; `pruefstand.py --gruppe stufe73-76 --fall stufe73` → 6/6, `--gruppe stufe73-76` → 10/10 (`pruefstand.py` kennt `--gruppe/--fall/--profil/--laut/--streng`, keine `--stufe`-Option) |
| H16 | S34, S61 Tun und Stopp | S34: Messung durch Claude im `<neu-repo>`-Root mit 1-Tag-Token wie S4; S61: Demo-Party-Kommando im `<neu-repo>`-Root, Alt-Zählung im `<alt-repo>`-Root (gleicher Binding-Name, Auflösung über das CWD); Stopp „leere Liste = falsches CWD oder Key abgelaufen" |
| H17 | S12 Tun und Beleg, Protokoll G16 | `git -C <alt-repo> show acebbc22:party-worker.js | grep -c 'party\.machsleicht\.de'` = 20 Zeilen (22 Vorkommen; 3 Kommentare, CORS 14, ICS 2677 separat, 15 URL-Zeilen, 17 Vorkommen — 20 − 3 − 1 − 1, Zeile 545 dreifach — inkl. 1523 baseHead; die v5-Zeile nannte 16, korrigiert in v6 J11); Alt-Zeile 1334 als Header, 1328 als Kommentar; Beleg `grep -c 'Content-Security-Policy.*staging--<neu-site>'` = 1; G16-Zeile korrigiert („13" → 20/22) |
| H18 | S42 Beleg | Die 9 Prüfspalten benannt (Status, Redirect, Canonical = self, noindex-Konflikt, h1, Inlinks ≥ 2, Rich Results, PSI mobil, Playwright-iframe); A Phase 3 und S45 (4) bleiben „L×9" |
| Folgeänderungen v5 | Kopfzeile, S12 Kopf, S22 Tun, S46 Tun und Beleg, G-Fußnote, H | Kopfzeile „v5"; S12 „Hängt ab von: S11 (Klasse 15 offen)" (aus H1); S22 Tun Registrierung der Fälle (aus H15); S46 Tun Spielregel-Zähler (aus H8); G-Fußnote (aus H14); H-Zeilen „Jede Kontrollzahl …" ergänzt und „Fixliste v4 → v5" neu |

## Änderungsprotokoll v5 → v6

| Nr | Stelle | Was geändert |
|---|---|---|
| J1 | S11 Tun Satz 1, S11 Beleg, S12 Tun und Artefakt, S22 Kopf | „(a) muss nach dem Sweep bis auf Klasse 15 0 sein, Rest in S12"; Beleg „alle drei Zahlen gleich — Ausnahme Klasse 15: erwartet = gefunden (1 + 65), ersetzt = 0"; S12 entfernt die befristete Ausnahme aus Stufe 73 in `validate-all.sh` (Artefakt ergänzt); S22 hängt an „S11, S12 (Klasse 15 geschlossen)" |
| J2 | S11, S15, S23, S24, S25, S43 Tun | Prüfstand-Fälle mit Datei, `gruppe="stufe73-76"` und Namen: `stufe73-sweep` (S11, Datei entsteht dort), `stufe74-noindex` (S15), `stufe74-csp` (S25), `stufe75-ueberlappung` (S23), `stufe76-massenaenderung` (S24); S43 nennt alle zehn Fälle mit Gruppe und Namen, damit 6/6 und 10/10 ableitbar sind |
| J3 | S11 Klassen (2), (13), Beleg (b) | (2) und (13) „alle Vorkommen laut Inventar — auch Marke in Kommentaren, Bannern, Docstrings, README"; Beleg „(b) nach dem Sweep = 0 Zeilen aus dem Inventar; verbleibende Treffer nur im neu geschriebenen Stufe-73-Code (Zahl notiert)" |
| J4 | S10 Nicht-übernehmen, S11 (14) | `js/baby.js`, `js/einschulung.js` (Klasse-C-Werkzeuge) nicht übernommen; S11 (14) mit Inventar 0 für die drei Dateien und `js/motto-data.js` 0 Treffer (Alt-Stand baby.js 4, einschulung.js 3) |
| J5 | S11 Klasse (6) | Drei Muster mit Zahlen aus dem Kommando: 23 Dateien `party.machsleicht.de` (Ist-Analyse nannte 28), 43 Dateien `tag=machsleicht21-21`, 37 Dateien Marken-/Alt-Seiten-Nennung (59 Zeilen, URL-kodiert, Alt-Tag `machsleicht-21`); Alt-Seiten-Links → neue Werkzeug-Pfade oder Satz streichen |
| J6 | S11 Klassen (4), (9), (10), (12) | „alle Vorkommen laut Inventar" je Klasse (Footer, Kommentare, ogimg-URL, `MACHSLEICHT_WORKER`, Tag-Regex, Fixtures, Assertions); (12) um `gen-ablauf.mjs` und `check-partyseite-render.mjs` Alt-Zeile 447 → `https://<neu>/planen/` |
| J7 | S10, S11 (b), Klasse (16) | Trailer-Prototyp mit Quelle `draft e2f1d63a` (43 Dateien, 23 mit Alt-Host) nur bei E14; Umfang (b) um `_dev/prototypes/raketen-trailer/`; Klasse (16) Trailer-Drehbücher und core.js, Wasserzeichen und Hosts |
| J8 | S45 Artefakt, S42 Artefakt | Pre-Launch-Crawl-Datei und E2E-Protokoll des Go-Tags bleiben bis S46 uncommittet und gehen mit der Go-Datei auf `main`; S42 verweist auf S45 |
| J9 | S26 Kopf, S25 Beleg (2) | S26 hängt an „S21–S24, S25 (1)"; Shell-Messungen nach S31/S32, Allowlist-Schleife in S42 (1) (letzte Allowlist-Seite entsteht in S37/S38) |
| J10 | G-Fußnote | Gate-Zeilen und Phase-6-Zeile 3/2027 ff. nennen nur den Zusatz; S53 (0,33/0,33) kommt je Woche dazu |
| J11 | S12 Tun, Protokoll H17 | „15 URL-Zeilen (17 Vorkommen, Zeile 545 dreifach) — Ableitung 20 − 3 − 1 − 1 = 15"; H17-Zeile angeglichen |
| J12 | S42 Beleg | Spalten „Crawl (0 × 404, Inlinks ≥ 2, Titles/Descriptions unique, alt, 0 verwaist)" und „Playwright (360×800 ohne Querscroll; Demo-iframes)"; Zahl 9 bleibt |
| J13 | S10 | „Zeilen 73 und 74 tragen den Alt-Host, Zeile 19 die Marke im Dateinamen; alle drei werden nicht übernommen" |
| J14 | Protokoll v4 → v5 | Folgeänderungen v5: Stelle „S46 Tun und Beleg"; H1: Stelle „…, S12 Kopf und Beleg, S45 (7)" |
| Folgeänderungen v6 | Kopfzeile, S11 (b) Klassenliste, H | Kopfzeile „v6"; S11 (b) nennt Klasse (16) in der Klassenliste (aus J7); H-Zeile „Jede Kontrollzahl …" um S43 ergänzt, H-Zeile „Fixliste v5 → v6" neu |
