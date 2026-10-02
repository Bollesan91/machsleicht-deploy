# Faktenbasis Relaunch (Stand 01.10.2026) — fuer den Pruefer

> Auszug: Ist-Analyse und Referenzliste. Keine Vorgaben zum Planformat enthalten; der Pruefer kennt den Planauftrag nicht.

## 1. Ist-Analyse (Stand 01.10.2026, gemessen)

### 1.1 Was machsleicht.de heute ist

Statische Netlify-Site (publish = Repo-Root, kein Build-Command, Deploy bei Push auf `main`) hinter einer Cloudflare-Zone (Proxy an, `cf-cache-status: DYNAMIC`), plus Cloudflare Worker `party-machsleicht` auf `party.machsleicht.de` (3.180 Zeilen, 20 Routen, KV-Namespace, Cron täglich 08:00 UTC für Erinnerungsmails via Resend). 244 HTML-Seiten im Live-Baum, 136 davon in der Sitemap.

**Das Produkt ist im Code bereits ein System, kein Ratgeber-Blog.** Belegter Nutzer-Flow im Planer `/kindergeburtstag` (eine Datei, 378 KB, fünf Stufen): Motto wählen → Alter und Eckdaten → fertiger Plan → Einladung **und** Partyseite in einer Stufe (POST an den Worker, WhatsApp-Share des echten Links) → Fertig/Mitnahme. Die Partyseite trägt Rückmeldung (RSVP), Gästeliste, Wunschliste mit Affiliate-Weiterleitung, Foto, Edit-Link-Mail, Magic-Link (90 Tage), Erinnerungsmail 7 Tage vorher, und den viralen Rückweg „Eigene Partyseite erstellen" (`?ref=<id>`). Dazu: 60 Einladungsspiele unter `/spiele/` (45 Reveal-Spiele = 3 je Motto × 15 Mottos, plus 15 Schatzjagden), ein Karten-Studio (`/einladung/studio/`, rein clientseitig, PNG-Export), ein Standalone-Einladungs-Creator (`/einladung/erstellen/` → Netlify Function → `/e/<slug>`), sechs Motto-Pakete `/paket/<motto>/` (token-personalisiertes Druck-Komplettpaket aus Partyseiten-Daten, „Pilot, kostenlos testen"), ein Schatzsuche-Hub mit 15 statischen Themenseiten, und als Prototyp (nur Branch `draft`, nicht deployt) ein Einladungs-Trailer als MP4 komplett im Browser für 10 von 15 Mottos. Foto-Print (CEWE/dm, Selbstbedienung, 300-dpi-JPEG) ist entschieden, aber ohne Code.

**Das OS ist für Google unsichtbar.** Partyseite (Worker setzt `meta robots noindex,nofollow`), 60 Spiele, Studio, Creator, Pakete sind `noindex` (korrekt: App-Shells). Im Planer liegen die Stufen 2–5 zwar im DOM, aber per CSS verborgen — ohne eigene URL je Zustand hat das Werkzeug selbst kaum indexierbare Oberfläche. Die Startseite behauptet „75 Einladungsspiele · Fünf pro Motto"; im Repo liegen 60 (4 je Motto) — ein Beispiel für Zahlen, die auf der neuen Domain nicht ohne Beleg wiederholt werden dürfen. In der Sitemap stehen 1 Planer-Einstieg, 1 Startseite, 3 Einladungs-Tool-Seiten, 1 Schatzsuche-Hub, und dann 129 Text-Seiten: 15 Motto-Hubs, 45 Motto×Altersgruppen-Seiten, 3 Altersgruppen-Hubs, 15 Einladungs-Motto-Hubs, 15 Einladungstext-Vorlagen, 18 Kindergeburtstag-Ratgeber, 4 Schatzsuche-/Schnitzeljagd-Ratgeber, 1 Motto-Schatzsuche, 12 Nicht-Kindergeburtstag-Seiten, 2 Trust-Seiten.

Live-Versprechen heute: Title „Kindergeburtstag planen kostenlos in 10 Minuten — machsleicht.de", H1 „Kindergeburtstag planen — in 10 Minuten statt einem ganzen Abend", Sub „Plan, Einladung, Schatzsuche und Partyseite — in einem Flow". Das Wort „Geburtstags-OS" kommt in 128 Doku-Dateien 0-mal vor; Bolles Wort dafür ist neu, die Sache seit Juli 2026 dokumentiert („Erlebnisplattform statt Canva-Klon", „Der Planer zeigt WIE, das Paket macht FERTIG", „Es kommt alles aus dem Plan. Punkt.").

### 1.2 Der Indexierungsabsturz — die Zahlen

Quelle: Bolles eigene GSC-Exporte (Domain-Property), Spalte „Indexiert":

| Datum | indexiert | Sitemap-URLs | Eingriff (Git) |
|---|---|---|---|
| 28.03. | 9 | 148 | 27.03.: Kill List 186 Dubletten → 301 |
| 01.04. | 144 | 336 | 31.03.: 189 Einzelalter-Seiten zurück + verlinkt — **einziger Eingriff mit positivem Effekt** |
| 07.–10.04. | **308** | 361 | Höchststand; Impressionen 27–32/Tag |
| 11.–13.04. | 262 | 361 | 11.04.: 16 Title-Fixes, robots/_headers; 12.04.: **198 Seiten Fremd-Canonical** auf Altersgruppe |
| 14.–17.04. | 122 | 361 | |
| 21.–24.04. | 59 | 223 | 19.04.: **138 Einzelalter-Seiten → 301**, Sitemap 361 → 223 |
| 28.04.–01.05. | 17 | 226 | |
| **02.05.** | **1** | 117 | 29./30.04.: **Lizenz-Cut**, 121 Dateien gelöscht, 24 Wildcard-301 auf `/kindergeburtstag`, Sitemap 226 → 117 |
| bis 28.08. | 1 | 136 | letzter Export-Wert; 01.09. und 18.09. per `site:` und Drilldown bestätigt |

Sitemap-Verlauf seit März: 271 → 148 → 336 → 361 → 223 → 117 → 172 → 95 → 126 → 110 → 128 → 137 → 152 → 136. Der Index folgte der Expansion (31.03.) nach oben und jedem Rückbau nach unten. 308 minus 198 wären 110 gewesen; es blieb 1. **Lesart (Hypothese, nicht Befund):** Google hat ein Qualitätsurteil auf die ganze Domain angewendet. Belegt ist nur die zeitliche Abfolge.

**Seit Mai rund 23 Gegenmaßnahmen, 0 Index-Effekt:** 410 statt 301, sieben Sitemap-Diäten, Einladungs-Hubs (+28 URLs), lastmod-Bumps (01.06. alle 126 auf ein Datum — später als schädlich erkannt), Generator-Fixes, 69 thin `.html`-Zwillinge gelöscht, Quellen-Kästen + Article-Schema auf 45 Seiten, Startseiten-Umbau, Sitemap-Re-Submit, **drei GSC-Validierungen (alle fehlgeschlagen)**, **vier Zehnerlisten „Indexierung beantragen" (58 URLs; 19 im September neu gecrawlt und erneut abgelehnt)**. GSC-Buckets 01.09.: 342 „Gecrawlt – zurzeit nicht indexiert", 44 „Gefunden – zurzeit nicht indexiert", 6 „Alternative Seite mit kanonischem Tag", je 1 noindex/5xx/Weiterleitung. Drilldown 18.09.: 345 URLs „gecrawlt – nicht indexiert", davon 189 zuletzt im April gecrawlt; 232 sind Karteileichen (410/301 seit Juni); **94 stehen in der heutigen Sitemap, darunter 14 der 15 Motto-Hubs, 38 der 45 Motto×Alter-Seiten und 19 Ratgeber — also genau die inhaltlich starken Seiten**. Das ist Googles Lesart „Qualitätszweifel an der ganzen Site", nicht ein technischer Defekt. Die 30 Einladungs-Hub-/Vorlagen-URLs tauchen in keinem Drilldown auf (Status unbekannt).

Leistung 20.03.–18.08.2026: **9 Klicks, 514 Impressionen** (283 davon im April). Backlinks: „0 echte Backlinks" (22.05.), kein Backlink-Sprint, kein Pinterest, kein Bing/IndexNow je umgesetzt. Umami nie ausgewertet. Bolle war Juni bis 08.09. nicht in der Search Console. Zwei Properties (Domain + URL-Präfix); Domain-Property gilt als Wahrheit.

**Vergleichsobjekt machsruhig.de** (gleicher Bauer, gleiche Infrastruktur, gleiche Bauweise, YMYL-Thema Bestattung): 162 gültige Seiten (29.08.–18.09.), 4.369 Impressionen in drei Monaten, monoton steigend, kein Massen-Rückbau. Damit scheiden Bauweise und „zu dünn" (machsruhig `/tools/danksagung/` mit 157 Wörtern ist indexiert) als Erklärung aus. Einschränkung: anderes Thema (lokale Bestatter-Suche), anderes Domainalter, Impressionen aus einem gefilterten Export, keine Klickzahlen — ein Vergleich, kein sauberes Kontrollobjekt.

**Zwei unbestätigte Hypothesen, keine Diagnose.** H1 (Befund 18.09.): Vertrauensverlust nach Selbstabriss — zwei Sitemap-Halbierungen und 198 Fremd-Canonicals binnen drei Wochen; Stütze ist allein die zeitliche Passung, ein Kausalbeweis existiert nicht. H2 (Doku 03.06.): domainweite Qualitätsabwertung durch die programmatische Altersseiten-Masse (189 Einzeljahr-Seiten aus Templates, 18–23 KB) und zu dünne Inhalte. Beide sind von außen nicht beweisbar; sie führen zu unterschiedlichen Konsequenzen für den neuen Start und bekommen im Plan je ein Prüfkriterium. Der Plan darf keine der beiden als Tatsache behandeln.

### 1.3 Inventar: was umzugswert ist, was nicht

Gemessen am sichtbaren Text (ohne head/script/style/nav), 8-Wort-Shingle-Überlappung innerhalb der Klasse:

| Klasse | n in Sitemap | Wörter min/median/max | Überlappung Median (max) | Urteil |
|---|---|---|---|---|
| Motto×Alter `/kindergeburtstag/<motto>-3-5|6-8|9-12-jahre` | 45 | 2.195 / 4.731 / 9.594 | 10,2 % (29,1 %) | stark; Ausnahme superheld/prinzessin (6 Seiten, 2.195–2.805 W, „die dünnsten im Bestand") |
| Motto-Hubs `/kindergeburtstag/<motto>` | 15 | 1.291 / 1.410 / 1.739 | 7,7 % (10,0 %) | stark, handgeschrieben, Eigenanteil ≥ 90 % |
| Ratgeber `/kindergeburtstag-*` | 18 | 798 / 1.428 / 2.268 | 1,5 % (3,2 %) | stark, unique |
| Planer-Hub `/kindergeburtstag` | 1 | 3.195 | — | Flaggschiff (Werkzeug + SEO-Basis in einem Dokument) |
| Schatzsuche-Ratgeber + Hub | 5 | 564 / 967 / 1.482 | 0,8 % | mittel |
| Einladungs-Motto-Hubs `/einladung/<motto>/` | 15 | 554 / 568 / 577 | **62,7 % (68,2 %)** | dupliziert (Spannweite 23 Wörter) |
| Einladungs-Vorlagen `/einladung/<motto>/vorlagen/` | 15 | 649 / 661 / 668 | **49,4 % (57,2 %)** | dupliziert; Cluster = 22 % der Sitemap |
| Altersgruppen-Hubs `/kindergeburtstag/3-5|6-8|9-12-jahre` | 3 | 416 / 510 / 513 | — | dünn |
| Trust `/transparenz`, `/ueber-uns` | 2 | 406 / 454 | — | dünn |
| **Nicht-Kindergeburtstag (Klasse C)** | **12** (+4 noindex/ohne Sitemap) | 933–1.835 | — | **fliegt raus**: Baby-Cluster (5: baby, erstausstattung, babyparty, kliniktasche, wochenbett), Einschulungs-Cluster (5: einschulung, einschulung-checkliste, kita-start, schultuete, umzug), Einzel: adventskalender, oster-eiersuche, autofahrt, familienreise, kreuzwortraetsel (0 Wörter, React von unpkg), spielkarten (105 Wörter) |

Klasse C ist 16 von 244 Seiten (6,6 %), 12 von 136 Sitemap-URLs, 15.745 von 375.620 Wörtern (4,2 %), ausschließlich von der Startseite und `ueber-uns` verlinkt; keine A/B-Seite verlinkt eine C-Seite. Dazu hängen an Klasse C: Lemon-Squeezy-Script + Webhook (nur baby/einschulung), cdnjs-React (baby/einschulung), unpkg-React (index.html, kreuzwortraetsel).

**Lesart für den Plan:** Die 45 Motto×Alter-Seiten und die Motto-Hubs sind Rohstoff (Spiele, Abläufe, Einkaufslisten, Zahlen), nicht ein URL-Muster, das wiederkehrt — die Matrix als eigene URLs ist auf der neuen Domain verboten (Abschnitt 6). Zwei Beobachtungen, die über die Wortzahl hinausgehen: (1) das h2-Skelett ist über Mottos hinweg identisch (gemessen: piraten-6-8 und dino-6-8 teilen 8 gleiche Abschnitte in gleicher Reihenfolge), ebenso FAQ-Fragen und HowTo-Schritte im JSON-LD. Ein gleiches Gerüst ist für Eltern nützlich und kein Spam-Beleg (G16 definiert Scaled Content über Masse ohne Nutzwert, nicht über Überschriften) — es wird nicht künstlich variiert; unterscheiden muss sich der Inhalt **unter** den Überschriften, und genau dort wird die Überlappung gemessen, je Abschnitt statt je Seite. (2) Die 45 `data/motto/*.json` treiben den gerenderten Planer — gleiche JSON = identischer gerenderter Text auf beiden Domains, auch wenn der HTML-Rahmen neu ist.

Nicht in der Sitemap, aber indexierbar: 14 `/schatzsuche/<motto>`-Themenseiten (236–311 Wörter, Template, bewusst ausgeschlossen), `/kreuzwortraetsel`, `/spielkarten`. 186 von 186 Nicht-index.html-Dateien sind doppelt erreichbar (`/x.html` und `/x` beide 200, kein 301); Schutz nur über 158 Self-Canonicals. 60 Spielseiten ohne Canonical/Meta, nur per `_headers`-X-Robots-Tag noindex (in keinem GSC-Drilldown, also kein Index-Risiko, aber Hygiene). `/paket/prinzessin/` enthält Piraten-Inhalt (WIP seit 12.08.). Fünf Motto-9-12-Seiten tragen je zwei HowTo- und zwei FAQPage-JSON-LD-Blöcke; die Startseite vier WebApplication-Blöcke.

### 1.4 Was ein Domainwechsel technisch anfasst

- `machsleicht.de` steht in **240 von 336 Live-Textdateien** (2.221 Vorkommen); 158 absolute Canonicals, 154 `og:url` + `og:image`, 90 JSON-LD-`@id` auf 45 Seiten, 209 absolute interne Links (gegen 4.201 relative), `sitemap.xml` 136×, `robots.txt`, 2 absolute `_redirects`-Ziele, 28 von 45 `data/motto/*.json` (Prosa nennt `party.machsleicht.de`), `spiele/core/core.js` (4 Footer-Links), `paket/core/paket-core.js` (API-Host, Partyseiten-URL), 7 Paket-Manifeste, `js/index.js`, Generatoren (`generate-sitemap.js` DOMAIN-Konstante, `generate-seo-pages.js` 22 Literale, `regeln-drucken.py`), Linter-Assert `validate-all.sh:266`.
- **Worker:** 60 Zeilen mit Hostnamen — CORS-Whitelist (3 Prod-Origins), `postMessage`-Origin-Check `e.origin !== "https://machsleicht.de"` (Spiele-iframes von einer anderen Domain scheitern daran), Root-302 zum Planer, iframe-src, og:image-Fallback, Favicon, Resend-Absender `kontakt@machsleicht.de` (3 Stellen), ICS-UID, Mail-Links (Edit, Magic, DOI, Erinnerung). Route/Custom Domain, KV-ID und sechs Secret-Namen (RESEND_API_KEY/FROM/REPLY_TO/AUDIENCE_ID, AMAZON_TAG, AWIN_PUBLISHER_ID) liegen im Cloudflare-Dashboard, nicht im Repo (`wrangler.toml` ohne `routes`). Deploy: `npx -y wrangler deploy` mit transientem Token von Bolle.
- **Konten/Dashboards (nur Bolle):** Registrar (für machsleicht.de aus dem Repo nicht feststellbar), Cloudflare-Zone + DNS, Netlify-Site + Custom Domain + Branch-Settings + `LS_WEBHOOK_SECRET`, Cloudflare Worker Custom Domain + Secrets, Resend-Sender-Domain (DKIM), Migadu-Mailrouting, Umami-Website (heute eine Website-ID auf 153 Seiten + 2 Worker-Stellen ohne `data-domains`), GSC-Property (DNS-TXT), Bing Webmaster Tools (heute keine Property), Amazon PartnerNet-Site-Liste, Lemon-Squeezy-Webhook-URL.
- **Bereits ausgelieferte Links, die weiterlaufen müssen:** Partyseiten-Links in WhatsApp (TTL Partydatum + 14 Tage, ohne Datum 30 Tage), Edit-/Gäste-Links in Mails, Magic-Links `?plan=<token>` (90 Tage), DOI-Links (7 Tage), Wartelisten-Einträge `wl:` (365 Tage, gesammelt für „Komplettpaket Print 14,90 €" unter alter Marke), Consent-Records (3 Jahre), `/e/<slug>` (stateless, kein Ablauf), ICS-Dateien, Studio-PNGs und Paket-Drucke mit QR auf `party.machsleicht.de`, Trailer-MP4 mit Wasserzeichen „machsleicht.de". Bestand im KV ist nie gezählt worden; Kommando dafür (Token von Bolle, CWD Repo-Root): `npx -y wrangler kv key list --binding PARTY --remote --prefix party:` (ebenso `wl:`, `plan:`, `consent:`, `extimg:`, `doi:`).
- **Konten-Grenzen, die niemand gerechnet hat (zu verifizieren):** Workers Free 100.000 Requests/Tag und KV 1.000 Writes/Tag account-weit (der Cron deckelt sich selbst mit `MAX_READS=200`), Resend Free eine verifizierte Domain und 100 Mails/Tag, Umami Hobby 3 Websites — eine zweite Site teilt sich diese Budgets mit der alten.
- **Repo:** öffentlich, SESSION-NOTES-Historie enthält frühere `cfut_`-/`re_`-Tokens (Rotation nicht belegt); ein Fork trägt sie weiter. Netlify hinter Cloudflare-Proxy: Zertifikatsausstellung für eine neue Domain braucht zunächst DNS-only (graue Wolke), Proxy erst danach.
- Externe Hosts auf der Live-Site: Umami (153 Seiten), unpkg (2), cdnjs (2), Lemon Squeezy (2), Amazon-Tag `machsleicht21-21` (87 Seiten, 816 Links, 45 JSON), wa.me (63), Fonts self-hosted (172 Seiten relativ), 0 Google Fonts, 0 Plausible-Script (obwohl `window.plausible` aufgerufen wird).

### 1.5 Qualitätssystem und Werkzeuge, die mitziehen

Linter `validate-all.sh` (72 Stufen, 0 FAIL Pflicht, u. a. Stufe 62 Eigenanteil ≥ 90 % gegen Schablonen, Stufe 72 JSON-LD parst), Deep-Audit `validate.js` (6 Gates), `check-sitemap-live.py`, Sitemap-Generator mit ehrlichem lastmod aus Git (Commits mit Präfix „Technisch:" stempeln nicht), Prüfstand (Mutationsnachweis), `OFFENE-REVIEW-PUNKTE.md` (False-Positive-Liste), `LEKTIONEN.md`. Deploy-Regel seit 09.07.: nichts auf `main` ohne unabhängigen Review in frischem Tab (kein WebFetch, kein Subagent als Gutachter). Branch-Trick: Arbeits-Branch, Commits `[skip netlify]`, Reviewer liest raw-SHA-URLs (Repo ist öffentlich).

### 1.6 Bindende Entscheidungen von Bolle (nicht neu verhandeln)

- Alles Gedruckte und Digitale leitet sich aus Plan + Partyseite ab („Paket kommt aus dem Plan. Punkt.", 4× bestätigt).
- Motto-für-Motto-Schiff-Modus: ein Motto komplett (Mottoseite, Einladung, Spiele, Paket, Trailer, Foto-Print) vor dem nächsten; erstes Schiff Ritter (11.08.). Trailer lebt im digitalen Paket (16.09.).
- Alle 45 Einladungsspiele bleiben, werden einzeln geschmiedet, „Streichen ist vom Tisch" (03.07.); Spiele werden per Playtest bewertet, nicht per Prosa-Score.
- Plan vor Einladung für alle Einstiege; Einladung + Partyseite = ein Schritt (08.09.). Partyseite ist Post-Planer, kein SEO-Einstieg.
- Lizenz-/Marken-Mottos (Frozen, Paw Patrol, Harry Potter, Minecraft, Ninjago, Pokémon, Spider-Man, Super Mario, Zirkus) sind final raus (30.04.). Live sind 15 generische Mottos: baustelle, detektiv, dino, dschungel, einhorn, feen, feuerwehr, meerjungfrau, pferde, piraten, prinzessin, ritter, safari, superheld, weltraum.
- „unique content, kein Doppelkram" (01.09.): Mottoseiten von Hand, nie generiert; Eigenanteil ≥ 90 %.
- Kinderfotos nie an KI-APIs; nur Vornamen; Partydaten verfallen 14 Tage nach Partydatum; Kinderfoto-Upload bleibt V1.5.
- Paket bleibt kostenlos, solange es keine Kasse gibt (08.09.); Preisfindung ist offen (Welle 1: 0 von 20 Eltern zahlen 14,90 €, Median 6 €).
- Marke „mach's leicht" mit Leerzeichen als eine Konstante (08.09.); „keine Umbenennung" galt am 19.04. für machsleicht.de — **der neue Name steht nicht fest und ist Bolles Entscheidung Nr. 1** (Abschnitt 4C), nicht deine. Verwende im Plan den Platzhalter `<neu>` für Domain und Marke; der Plan liefert Kriterien, Prüfweg (DENIC, DPMA/EUIPO) und Registrierungsweg, keine Namensvorschläge.
- Qualität: Helfer V4.1 für jedes Stück (Linter 0 FAIL, unabhängiger Review, Browser-Smoke, 0 offene MAJORs). „Fertig" ist maschinell.
- Kapazität: 20–30 h/Woche Claude-Leverage, Bolle 10–15 h/Woche; Bolle-Aktionen als „Ein-Klick-Pakete" bündeln. Durchsatz des Qualitätssystems als Anhaltspunkt: 71 Gate-Einträge in SESSION-NOTES zwischen 31.05. und 14.09. (15 Wochen), also 4–5 gegatete Stücke je Woche — jede Zeitachse im Plan muss aus dieser Größenordnung abgeleitet sein, nicht aus Wunsch.

### 1.7 Marktlage (Google.de, 01.10.2026, pws=0, Top 8 je Query)

- Einladungs-Intentionen („kindergeburtstag einladung whatsapp", „… online erstellen", „einladung kindergeburtstag digital") gehören Canva (Platz 1 bei drei Queries) und Verkäufern von Bild-Einladungen (ecardilly 5,60–10,15 €, anymator, herzensprojekt 7,50 €, digitale-kartenmanufaktur 8,90 €, jolicoon) sowie Druckkarten-Shops (meinekarten, sendmoments, sendasmile, kartenmacherei). **Kein RSVP-/Partyseiten-Werkzeug rankt dort.**
- Ratgeber-Intentionen („kindergeburtstag planen" mit AI Overview, „ideen 6 jahre", „schatzsuche", „spiele", „mottoparty piraten") gehören Händler-/Marken-Hubs (dm.de, grusskarten.unicef.de, famigros.migros.ch, ausgefuxt.de, eltern.de, party.de), Pinterest-Ideen-Seiten (in 3 von 8 Queries Top 6) und einmal dem urbia-Forum. Platz 1 für „kindergeburtstag planen" ist die reine Ratgeber-Site kindergeburtstag-planen.de (115 Spiele, Druckvorlagen, kein Werkzeug). machsleicht.de in keiner Google-Top-8; bei Bing DE für „schatzsuche kindergeburtstag" Platz 5 und 8.
- **Produkt-Lücke:** Kein DACH-Anbieter bündelt Planer + WhatsApp-Einladung + Partyseite mit Rückmeldung + Einladungsspiele + Motto-Paket + Trailer-Video. Nächste Nachbarn: Dayler (CH, kostenlos/werbefinanziert, Planer + 200 Spiele-Datenbank + Einladungsmanager mit Rückmeldung, aber keine digitalen Gästespiele, kein Motto-Download, kein Video), Party Navi (DE, gratis bis 15 Gäste, 5,99 €/Event, generische Eventseite + RSVP), Kartenliebe Eventportal (gratis RSVP, Hochzeitsfokus), eCardino (RSVP-Mini-Webseite 29,90 €, manuell gefertigt). Für den Plan heißt das: die Suchnachfrage läuft über Einladungs- und Ratgeber-Queries, die Differenzierung über das Werkzeug — jede indexierbare Seite muss beides tragen.
- Pinterest DE: ca. 19,4 Mio. monatlich aktive Nutzer (Agenturangabe Feb. 2026), 22,7 Mio. Werbereichweite (DataReportal). Pin-Outbound-Links sind im anonymen DOM `<button>` ohne `href` (kein crawlbarer Link); Profil-Website-Link ohne nofollow. Nutzen: Referral-Traffic und Marken-Signal, keine belegbare Link-Wirkung. Im Repo bisher geparkt („erst ab 5.000 Besucher/Monat").
- Erstverlinkung: urbia verbietet „jegliche Werbung"; gutefrage und Reddit nofollow/ugc; Presseportale und Gastbeiträge mit optimiertem Anker sind laut Google Link-Spam. Sauber: thematische Elternblog-Verzeichnisse (rakkers.org), Startup-Datenbanken (gruenderkueche.de, startbase.com, stuttgart-startups.de), echte Gastbeiträge mit nofollow/sponsored, redaktionelle Lokalpresse über Gründer-Aufhänger. Kita-/Schul-Netzwerke: keine belastbare Quelle, nur qualitativ.

## 3. Kanonische Referenzen (mitgebracht, abgerufen 01.10.2026 — zitiere sie, ergänze sie, widerlege sie nur mit Primärquelle)

### 3.1 Google (Primärquellen)

| Nr | Dokument | URL | Kernaussage für diesen Plan |
|---|---|---|---|
| G1 | Redirects and Google Search | https://developers.google.com/search/docs/crawling-indexing/301-redirects | 301/308 = Kanonisierungs-Signal fürs Ziel; 302/307 werden gefolgt, aber nicht als Kanonisierungs-Signal gewertet |
| G2 | Specify a canonical | https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls | Redirect stark, rel=canonical stark, Sitemap-Aufnahme schwach; ohne Vorgabe wählt Google selbst |
| G3 | What is URL canonicalization | https://developers.google.com/search/docs/crawling-indexing/canonicalization | **Seiten mit gleichem oder sehr ähnlichem Hauptinhalt werden zu einem Cluster zusammengefasst; Google wählt den Repräsentanten; die Betreiber-Präferenz ist ein Hint, keine Regel; keine Ähnlichkeitsschwelle dokumentiert** |
| G4 | Cross-domain content duplication (2009) | https://developers.google.com/search/blog/2009/12/handling-legitimate-cross-domain | Cross-Domain-Canonical als 301-Ersatz; bei Duplikaten über Domains filtert Google eine Version heraus |
| G5 | Demystifying the duplicate content penalty (2008) | https://developers.google.com/search/blog/2008/09/demystifying-duplicate-content-penalty | Keine Duplicate-Penalty, aber Cluster + eine gewählte URL; Duplikation über Domains kostet Sichtbarkeit |
| G6 | Site move with URL changes | https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes | Der dokumentierte Weg = 301 + Change of Address, Redirects mind. 1 Jahr; **ein Parallelbetrieb ohne Redirects ist nirgends beschrieben** |
| G7 | Change of Address tool | https://support.google.com/webmasters/answer/9370220 | Nur mit 301 Homepage→Homepage, gleiches Konto, 180-Tage-Fenster — hier bewusst NICHT genutzt |
| G8 | Page indexing report | https://support.google.com/webmasters/answer/7440203 | Definitionen „Crawled – currently not indexed" (Resubmit zwecklos), „Discovered – currently not indexed" (Crawl verschoben), „Duplicate, Google chose different canonical than user"; Validate fix prüft erst Stichprobe, ca. 2 Wochen+ |
| G9 | URL Inspection tool | https://support.google.com/webmasters/answer/9012289 | Request Indexing ohne Garantie, **Tageslimit existiert, Zahl nicht genannt**, Wirkung ca. 1 Tag bis 1–2 Wochen |
| G10 | Managing crawl budget | https://developers.google.com/search/docs/crawling-indexing/large-site-managing-crawl-budget | Crawl-Budget ist erst ab 10.000+ täglich wechselnden Seiten ein Thema — für diese Site keins |
| G11 | Build and submit a sitemap | https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap | Nur kanonische URLs; priority/changefreq werden ignoriert; lastmod nur, wenn überprüfbar korrekt |
| G12 | Sitemaps lastmod (2023) | https://developers.google.com/search/blog/2023/06/sitemaps-lastmod-ping | lastmod ist Crawl-Scheduling-Signal; bei wiederholt falschen Werten verliert es Glaubwürdigkeit |
| G13 | Indexing API quickstart | https://developers.google.com/search/apis/indexing-api/v3/quickstart | Nur JobPosting/BroadcastEvent — nicht für diese Site |
| G14 | SEO Starter Guide | https://developers.google.com/search/docs/fundamentals/seo-starter-guide | Entdeckung primär über Links von bereits gecrawlten Seiten; Wirkung Stunden bis Monate |
| G15 | How Search Works | https://developers.google.com/search/docs/fundamentals/how-search-works | Keine Garantie auf Crawl/Index/Ausspielung; ähnliche Seiten werden gruppiert |
| G16 | Spam policies | https://developers.google.com/search/docs/essentials/spam-policies | Expired domain abuse, scaled content abuse, doorway abuse (Beispiel: mehrere Sites mit leichten Varianten), site reputation abuse; Durchsetzung automatisch + manuell, Sites können ganz fallen |
| G17 | March 2024 core update + spam policies | https://developers.google.com/search/blog/2024/03/core-update-spam-policies | Helpful-Content-System in die Core-Systeme integriert; alter Domainname für neue originäre Site ist ok |
| G18 | Site reputation abuse policy update (Nov 2024) | https://developers.google.com/search/blog/2024/11/site-reputation-abuse | **Umzug auf eine neue Domain ohne etablierte Reputation ist „far less likely" ein Problem; von alt NICHT auf neu weiterleiten; Links alt→neu mit nofollow; stark abweichende Teilbereiche einer Site werden wie eigenständige Sites bewertet** |
| G19 | Helpful content update (2022) | https://developers.google.com/search/blog/2022/08/helpful-content-update | Sitewide Signal, kann Monate anliegen; Klassifikator läuft kontinuierlich, auch für neue Sites |
| G20 | Helpful content FAQ | https://developers.google.com/search/help/helpful-content-faq | Ranking primär auf Seitenebene, sitewide Signale/Klassifikatoren zusätzlich |
| G21 | Core updates and your website | https://developers.google.com/search/updates/core-updates | Erholung Tage bis mehrere Monate; bleibt sie aus, bis zum nächsten Core Update warten; keine Garantie |
| G22 | AI-generated content guidance (2023) | https://developers.google.com/search/blog/2023/02/google-search-and-ai-content | KI ok außer zur Ranking-Manipulation; Bylines, Entstehungs-Transparenz |
| G23 | Creating helpful, reliable, people-first content | https://developers.google.com/search/docs/fundamentals/creating-helpful-content | Who/How/Why; Trust als wichtigster E-E-A-T-Aspekt; **„Does your site have a primary purpose or focus?"** |
| G24 | Search Quality Rater Guidelines (11.09.2025) | https://static.googleusercontent.com/media/guidelines.raterhub.com/en//searchqualityevaluatorguidelines.pdf | **Main Content umfasst ausdrücklich Page Features wie Rechner und Spiele; Rater sollen Werkzeuge benutzen** (S. 13, 21); Verantwortlicher + Kontakt Pflicht (S. 16, 18, 35); Trust wichtigstes Element (S. 27) |
| G25 | Organization structured data | https://developers.google.com/search/docs/appearance/structured-data/organization | sameAs nur für Profile/Knowledge Panel; keine Aussage zu Domain-Verknüpfung |
| G26 | JavaScript SEO basics | https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics | Web-App-Zustände brauchen eigene URLs (History API, keine Fragmente) mit eigenem Title, sonst nicht indexierbar |
| G27 | Ranking updates (Status Dashboard) | https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history | 2026: Spam 24.03., Core 27.03., Core 21.05., Spam 24.06., Spam 18.08., Spam ab 24.09. — dichte Folge, neue Domain wird zügig vom aktuellen System bewertet |
| G28 | IndexNow FAQ | https://www.indexnow.org/faq | Teilnehmer Bing, Yandex, Naver, Seznam, Amazon, Yep — **nicht Google** |
| G29 | Bing: Import from Search Console (2019) | https://blogs.bing.com/webmaster/september-2019/Import-sites-from-Search-Console-to-Bing-Webmaster-Tools | GSC-Property + Sitemap ohne neue Verifikation nach Bing importieren |

### 3.2 Sekundärquellen (Aussagen von Googlern, nur Hinweis)

- Mueller 2019: gleiche Sites werden gleich behandelt, ein Kanonischer für die kombinierten Signale, **ein 301 ist dafür nicht nötig** (seroundtable.com/moving-google-penalty-28114.html).
- Mueller 2019: alte Domain auf völlig neue Site redirecten ist kein Site Move, sondern Link-Mitnahme (seroundtable.com/google-redirect-new-site-move-28402.html).
- Mueller 2023: neue Domain früh sichtbar starten senkt das Risiko, kein geheimer Nacht-Umzug (seroundtable.com/google-new-domain-before-migrating-content-seo-35574.html).
- Mueller/Splitt, Search Off the Record Juli 2026: bei starken Zweifeln an der Gesamtqualität verbringen Googles Systeme weniger Zeit auf der Site — „Crawled – currently not indexed" als sitewide Qualitätszweifel (seroundtable.com/google-crawled-not-indexed-quality-ai-content-41701.html).
- Mueller 2020: Google Analytics wird in der Suche nicht genutzt; private WHOIS ändert nichts; neue Sites: wenige Signale, Schätzung, keine klassische Sandbox (searchenginejournal.com, seroundtable.com).
- Sullivan 2024: der Helpful-Content-Klassifikator läuft immer; Verbesserung muss sich über Monate zeigen.
- Request-Indexing-Limit ca. 10–12/Tag/Property — Sekundärwert, Google nennt keine Zahl.

### 3.3 Signal-Matrix: verbindet Google zwei Domains darüber?

| Signal | Status | Beleg |
|---|---|---|
| 301/308 alt→neu | belegt, stark — **verboten** | G1, G6 |
| rel=canonical cross-domain | belegt, stark — **verboten** | G2, G3, G4 |
| gleicher/sehr ähnlicher Hauptinhalt | belegt: Cluster, Google wählt Repräsentanten; Mueller: auch ohne 301 — **verboten, messbar machen** | G3, G5, G15, Mueller 2019 |
| Links alt→neu / neu→alt | nur im Site-Reputation-Kontext dokumentiert (nofollow-Empfehlung) — **verboten** (konservativ) | G18 |
| Organization-JSON-LD / sameAs | keine Aussage — Spekulation, **trotzdem trennen** (kostet nichts) | G25 |
| Bilder, Templates, Fonts, Hosting-Stack | nirgends dokumentiert — Spekulation; konservativ: neue Bilder, neues Layout, keine geteilten Asset-URLs | G3 |
| Betreiber-Identität (Impressum), Google-/Netlify-/Cloudflare-Konto | keine Aussage; Mueller: GA/WHOIS kein Faktor — **erlaubt** | G7 (nur als Change-of-Address-Bedingung), Mueller 2020 |

**Konsequenz, die der Plan tragen muss:** Werden Planer-Seite, Motto-Seiten, Ratgeber oder Einladungstexte 1:1 auf die neue Domain gehoben, während machsleicht.de unverändert bleibt, landen beide in einem Cluster und Google darf die ältere, signalreichere alte URL als kanonisch wählen (GSC-Status „Duplicate, Google chose different canonical"). Also: jede indexierbare Seite der neuen Domain hat neuen Hauptinhalt (Winkel 3), und die App-Shells (Partyseite, Spiele, Studio, Pakete) bleiben wie heute noindex — die sind kein Cluster-Risiko. Die Alternative, auf machsleicht.de die Tool-Pfade auf noindex zu setzen, ist durch die Randbedingung ausgeschlossen und würde ein drittes Selbstabriss-Signal setzen.

### 3.4 Domain, Hosting, Verlinkung (Primärquellen, abgerufen 01.10.2026)

| Nr | Dokument | URL | Kernaussage |
|---|---|---|---|
| M1 | Cloudflare TLD Policies | https://www.cloudflare.com/tld-policies/ | **`.de` wird vom Cloudflare Registrar nicht unterstützt** — Registrierung extern, Nameserver auf Cloudflare |
| M2 | DENIC Startseite + Domainrichtlinien 01-2026 | https://www.denic.de/ · https://www.denic-services.de/denic-direct/denic-domainrichtlinien | Verfügbarkeit prüfen; 1–63 Zeichen, kein Bindestrich an 3./4. Stelle; Straßenanschrift Pflicht; Whois zeigt Inhaber nur bei juristischen Personen |
| M3 | DENIC Providerwechsel | https://www.denic.de/domains/de-domains/providerwechsel | AuthInfo 8–16 Zeichen, 30 Tage gültig |
| M4 | Registrar-Preise .de | INWX https://www.inwx.de/de/domain/pricelist · netcup https://www.netcup.com/de/domain/zusaetzliche-domain-de · united-domains https://www.united-domains.de/de-domain/ · IONOS https://www.ionos.de/domains/de-domain | INWX 4,71 € netto Reg./3,60 € Verl.; netcup 0,42 €/Monat inkl. MwSt.; united-domains 5 € dann 19 €/Jahr; IONOS 0,08 €/Monat dann 1,30 €/Monat (Folgepreis nur per Vergleichsportal) |
| M5 | Netlify: Assign a domain | https://docs.netlify.com/manage/domains/manage-domains/assign-a-domain-to-your-site-app/ | „Add a domain you already own", Netlify DNS oder External DNS; eine Domain gehört netlify-weit genau einer Site |
| M6 | Netlify: Branch deploys / Branch subdomains | https://docs.netlify.com/deploy/deploy-types/branch-deploys/ · https://docs.netlify.com/manage/domains/manage-domains/manage-domains-for-branch-deploys/ | Branch-Deploys je Branch aktivierbar; Branch-Subdomains auf eigener Domain nur mit Netlify DNS — mit Cloudflare-DNS bleiben sie auf *.netlify.app |
| M7 | Netlify Pricing | https://www.netlify.com/pricing/ | Free: Custom Domains + SSL, keine dokumentierte Site-Obergrenze |
| M8 | Cloudflare Workers Custom Domains | https://developers.cloudflare.com/workers/configuration/routing/custom-domains/ | `[[routes]] pattern = "party.<neu>" custom_domain = true`; mehrere Domains je Worker; kein bestehender CNAME auf dem Hostnamen; Zone im eigenen Account |
| M9 | Wrangler configuration | https://developers.cloudflare.com/workers/wrangler/configuration/ | `name` Pflicht; je `[env.x]` eigener Name möglich |
| M10 | Google Spam-Richtlinien, Abschnitt Link-Spam | https://developers.google.com/search/docs/essentials/spam-policies?hl=de | Gastbeiträge/Pressemitteilungen mit optimiertem Anker, Verzeichnisse geringer Qualität, Forenlinks = Link-Spam; nofollow/sponsored kennzeichnen |
| M11 | Pinterest: Claim your website | https://help.pinterest.com/en/business/article/claim-your-website | Verifikation per HTML-Tag/DNS-TXT; eine Website je Account; keine SEO-Aussage |
| M12 | urbia-Netiquette | https://www.eltern.de/services/urbia-netiquette-13857268.html | „Jegliche Werbung" und Aufrufe zu externen Gruppen verboten |
