# Session-Notiz — 11.06.2026, Teil 2 (Bolles „1.": eigene Spiel-Mechaniken — Pilot Feuerwehr-Rubbeln + Randomisierung, auf draft)

## 🔥 Pilot Feuerwehr: Lösch-Rubbel-Mechanik (statt 3x-Tippen-Fiktionsbruch)
Finger über die Flamme reiben → alle ~60px (Throttle 140ms) eine Lösch-Stufe, Flamme **schrumpft** sichtbar (scale 1→.82→.6→gelöscht), 💧-FX statt ✨, `touchAction:"none"` gegen pointercancel beim Reiben (Seite ist eh overflow:hidden). Tippen bleibt als Fallback (pointerdown = 1 Stufe). Texte: „☝ Rubbel die Feuer aus — einfach drüberreiben!" (Intro+HUD), Hub-gameP1 in wave-b.js mitgezogen + regeneriert. **Live durchgespielt im Preview:** Rubbel-Sequenz löscht Flammen, Schrumpfen verifiziert, Löschzug-Fund, keine Konsolen-Fehler.

## 🎲 Treffer-Randomisierung (alle 14 Template-Apps)
CRACK_RESULTS fix {2,4,6} → randomisiert {2-3, 4-5, 6-7} pro Aufruf (IIFE) — Replay-Wert, Gutachter-Maßnahme #5. Hint-Banner (≥4) und 9-Spot-Limit (max 7) verifiziert kompatibel.

## ⚠️ Review-Status
Helfer-v3-Kurzreview der Mechanik wurde an frischen claude.ai-Tab (Fable 5 Hoch) GESENDET — **Antwort ungelesen: claude.ai-Session wurde mitten im Vorgang ausgeloggt** (Login durch Claude verboten). Chat-ID: `2436d839-0771-44dc-8248-ca6e2e0c55e5`. **Vor dem main-Merge: Bolle loggt claude.ai ein → Verdikt lesen → ggf. Fixes.** Nichts davon ist live.

---

# Session-Notiz — 11.06.2026 (Fast-Follow: Event-Sounds + Worker-gameUrl — auf draft, wartet auf Bolles Doppel-Go)

## 🔊 WebAudio-Event-Sounds (alle 15 Gast-Apps, Commit auf draft)
Tap-Pop (1 Osz.), Fund-Chime (3), Niete (1, leise), Alarm-Sting (3, square), Fang-Fanfare (4) — geroutet durch den bestehenden Master-Gain: **stumm bis der Gast den 🔇-Button aktiv einschaltet** (Opt-in bleibt). Lautstärken defensiv (0.04–0.11, Musiknoten-Niveau). Piraten: Fund+Fang (kein Tap-Pop — Long-Press hat eigenes Feedback). **Preview-verifiziert per Oszillator-Spy:** Tap→1, Tap→1, Crack→Fund-Chime exakt 3 Oszillatoren, empty→1, keine Konsolen-Fehler. **Klang-QA braucht Ohren → Bolles Go vor Merge auf main; hörbar erst nach Deploy (Demo öffnen, 🔊 einschalten).**

## 🔧 party-worker gameUrl (Commit auf draft, wrangler-Deploy wartet auf Go)
`gameUrl` → `/einladung/<motto>/whatsapp/` (spart Hub-Forwarding-Hop im Partyseiten-iframe) + GAME_MOTTOS 10→15 (Partyseiten mit baustelle/dschungel/feen/pferde/ritter betten jetzt auch das Spiel ein). `node --check` OK. wrangler ist eingeloggt (OAuth cbollweg@gmx.de) — Deploy-Befehl: `npx wrangler deploy` (Classifier verlangt explizites Bolle-Go).

---

# Session-Notiz — 10.06.2026 spätabends (Spiele-Uplift nach Bolles „Template-Spiel"-Stopp — Gutachten 60→70, Go-live-Gate erfüllt)

## 🎮 Game-Design-Gutachten (Fable 5 Hoch, am echten App-Code Piraten vs. Template)
Bolles Stopp („alle Mottos zeigen nur ein Template-Spiel — Katastrophe") führte zu Code-Forensik: **13 Apps 84–91 % skelett-identisch mit dino** (reine Skins), Piraten 56 % (eigenes Spiel). Gutachten: Piraten 68/100 (inkl. restart()-Crash-Fund!), Template 60/100, Urteil „okay, nicht peinlich — Risiko sind Demo-Hopper auf den Hubs". **Schlimmer: die 5 neuen Mottos waren rohe Klone mit FALSCHEN Assets** — baustelle zeigte 🔥-Cover + 🚒/🏅-Funde + Feuerteufelchen-Sprite (Feuerwehr!), pferde/feen 🌈-Cover + 🦄-Assets (Einhorn!), dschungel 🦁/🐘-Funde (Safari), ritter ⚡-Funde + 🦹-Schurke statt Drache.

## ✅ Uplift umgesetzt (alle 14 + piraten, ~250 Patches via geprüfte Skripte in `.wrangler/uplift*.js`)
1. **Cover-Varianz:** Render nutzte `item.cover` gar nicht (hardcoded Emoji!) → auf item.cover umgestellt + kuratierte 9er-Sets je Motto (Theme-Objekt dominant + Umgebung). Fixt zugleich die falschen baustelle/pferde-Skins.
2. **Pacing:** CRACK_RESULTS {3,5,8}→{2,4,6} (erste Belohnung nach 6 statt 9 Taps), Hint-Schwelle ≥6→≥4. **Live durchgespielt:** Fund bei Crack 2 + 4, ALARM-Cinematic bei 6 ✓. (Piraten bleibt bewusst auf {3,5,8} — eigene Long-Press-Dramaturgie.)
3. **navigator.vibrate** bei Fund/Runaway/Fang (guarded; iOS unterstützt es nicht — bekannt).
4. **Entklonung komplett:** Funde/HUD-Dots/Intro-Legenden/RSVP-Dots/Header/Won-Screens/FX je Motto korrekt (baustelle 🚜/⛑️/🦡, dschungel 🐸/🐍, feen 🌺/✨/🧚, pferde 🐴/🥕/🐎, ritter ⚔️/🛡️/🐉). Runner-Sprites: feen erbt Prinzessin-Fee-SVG; baustelle/pferde/ritter = Emoji-SVG-Sprites (🦡/🐎/🐉, Canvas-Pixel-Probe ✓).
5. **Piraten-Bugfix:** restart()-Crash (thiefInterval→cancelAnimationFrame(thiefRaf)).
6. **Gate-Punkte aus Re-Verdikt:** Cover/Niete-Kollisionen entschärft (dino 🪨→🌾, safari/dschungel empty-Reveal 🌿→💨), Emoji-14-Tofu getauscht (🪺🪻🪸🫧 → 🍃🌻🦀💧 für Alt-Geräte), feen-CTA auf /schatzsuche/feen. Tracking-Props + postMessage in allen 14 verifiziert korrekt.

**Re-Verdikt: Template 60 → 70/100, „SEO-Hubs live nehmen: Ja"** (Traffic=0, jede Woche Warten kostet nur Indexierungszeit). Fast-Follow-Backlog: Event-Sounds (WebAudio, ~3-4h, größter offener Hebel), Hit-Randomisierung, Badge-Rollout, per-Motto-Mechaniken erst nach Umami-Daten.

## ⚠️ Bolle-Punkte vor/nach Deploy
- **iPhone-Test (5 Min):** Demo baustelle/pferde/ritter auf echtem iOS öffnen — sitzen die Emoji-Sprites (🦡/🐎/🐉) mittig in der Schatten-Ellipse? (Apple-Emoji-Baseline weicht ab; einziger Punkt, den kein Skript prüfen kann.)
- GitHub-Token: weiterhin **Contents: Read and write** nötig (Push blockiert).
- og-Images superheld/dschungel/feen fehlen weiterhin (og-home-Fallback).

---

# Session-Notiz — 10.06.2026 abends (P6-1 KOMPLETT: Rollout auf alle 15 Mottos, auf draft — Deploy blockiert an GitHub-Token)

## 🏁 P6-1/G7 Voll-Rollout: 14 weitere Mottos nach Piraten-Muster (Helfer-v3 final: A 93 / B 91 / C 90 / D 92)

**Bolle-Ansage: „wir haben 15 mottos — mach weiter."** Umgesetzt in 4 Wellen (A: dino/einhorn/safari, B: feuerwehr/detektiv/superheld, C: prinzessin/meerjungfrau/weltraum, D: baustelle/dschungel/feen/pferde/ritter):

1. **Generator gebaut:** `_dev/scripts/einladung-hub-gen/generate.js` + kuratierte Daten-Files `wave-a..d.js` (Template = Piraten-Pilot; FAQ wird aus EINEM Array sichtbar + als JSON-LD gerendert → Drift konstruktiv unmöglich). Spiel-Beschreibungen je Motto gegen App-Strings extrahiert + verifiziert (alle 14 Foto-Pointen per Grep bestätigt: `fotoUrl ? childName + " hat das X geklaut!"`).
2. **Alle 14 Apps → `/whatsapp/`** (git mv, noindex), SEO-Hub + `vorlagen/`-Seite je Motto generiert. Sitemap: +28 URLs (15 Hubs + 15 Vorlagen + Top-Hub = 31 einladung-URLs).
3. **Creator + Functions 10→15:** `erstellen` (5 neue Motto-Buttons + MOTTO_CONFIG), `create-invite.mjs` + `serve-invite.mjs` VALID_MOTTOS auf 15; serve-invite leitet ALLE Mottos auf `/whatsapp/` (MIGRATED-Liste entfällt). **braucht Netlify-Deploy (functions), KEIN Worker-Deploy.**
4. **Top-Hub `/einladung/`:** 15 Karten, alle „10 Mottos"-Claims → 15 (Title/Desc/OG/JSON-LD/hasPart/Lead), Smartphone→Handy.
5. **Pre-existing Funnel-Bug gefixt:** ~30 Motto-Hub-CTAs übergeben `?thema=`, erstellen las nur `?motto=` → Preselect lief leer. Jetzt `motto || thema` (verifiziert: ?thema=pferde → Pferde-Preselect).
6. **Sitemap-Generator Windows-Bug gefixt** (`29e97ef`): Backslash-URLs + Trailing-Slash für Ordner-URLs. ABER: Generator stempelt lastmod=heute auf alles + sortiert um → für Deploys weiterhin kuratierte Sitemap, Generator-lastmod-Design = Backlog-Punkt.

**Helfer-v3 (frischer Tab, Fable 5 Hoch — neue Bolle-Ansage 10.06.):** W1: A 74 / B 79 / C 76 / D 73 (Hauptbefund: 7/14 Gereimt-Vorlagen mit Reim-/Grammatikfehlern; „Schatzsuche"-Erwähnung bei pferde/ritter ohne Tool-Seite; 1 False-Positive einhorn-Zauberstab gegen App-Code widerlegt). Fix-W2 (61 Edits) → A 93 / C 90, B 80 / D 82 (3 von Fixes neu erzeugte Fehler gefunden). Fix-W3 (11 Edits) → **final A 93 / B 91 / C 90 / D 92, „den Rest kann man shippen"**. SYS-Klärungen dokumentiert: {Abholzeit}/{Name der Eltern}/{Kind-Name} sind bewusst freie Platzhalter (kein Parser existiert); „2 Minuten"-Claim = etablierter Site-Claim; Liftoff = wörtlicher App-RSVP-Text.

**Offen/Nits:** og-Images fehlen für superheld/dschungel/feen (og-home-Fallback, Asset-Task Bolle). Worker-`gameUrl` kann jetzt direkt auf `/whatsapp/` (spart Redirect-Hop, braucht wrangler-Deploy — separater Schritt). Generator-lastmod-Design.

## 📋 Nach Deploy PFLICHT (sitemap.xml stark geändert!)
- **GSC: Sitemap re-submit + Indexierung für die neuen Hub-/Vorlagen-URLs anfragen** (max 10/Tag — priorisiere piraten/dino/einhorn/feuerwehr/ritter).
- Funnel-Smoke: Test-Einladung mit neuem Motto (z. B. ritter) erstellen, /e/-Link öffnen → muss auf `/whatsapp/` landen.

## 🔴 Deploy-Blocker (Stand Session-Ende)
GitHub-Push 403: Browser-OAuth lief erst als falscher Account „Bollesan", nach Switch als Bollesan91 → Token hat nur **Read**. Bolle muss am PAT **Contents: Read and write** für `machsleicht-deploy` setzen, dann push draft + merge main.

---

# Session-Notiz — 10.06.2026 nachmittags (P6-1 Einladungs-SEO-Refactor: Pilot Piraten, auf draft — NICHT deployed)

## 🏗️ P6-1/G7 Pilot Piraten umgesetzt (Helfer-v3: Hub 95/100, Vorlagen 96/100, keine Blocker)

**Architektur-Umbau gemäß G7-Spec (Bolle 08.06.):**
1. **Stop-the-bleeding site-weit:** Alle 16 `/einladung/<motto>/`-App-Shells + `/einladung/erstellen/` auf `noindex` (Canonical raus — Konflikt-Signal bei noindex). Sitemap: 10 App-URLs + erstellen entfernt. `/einladung/` + `/einladung/piraten/` (+ neu `vorlagen/`) bleiben drin, lastmod 2026-06-10.
2. **Gast-App umgezogen:** `einladung/piraten/index.html` → `einladung/piraten/whatsapp/` (git mv, noindex). `serve-invite.mjs`: `MIGRATED=["piraten"]` → /e/-Kurzlinks landen auf `/whatsapp/`; nicht-migrierte Mottos unverändert.
3. **Neuer SEO-Hub `/einladung/piraten/`** (index,follow): Hero + Demo-CTA, So-funktioniert's, Spiel-Beschreibung (faktentreu gegen Code verifiziert), Vorlagen-Teaser, Privat-Block (90-Tage-Foto-TTL aus party-worker.js:536 verifiziert), FAQ + wortgleiches FAQPage-JSON-LD, BreadcrumbList, 4 interne Linkcards.
4. **NEU `/einladung/piraten/vorlagen/`:** 7 Einladungstexte (kurz/lang/gereimt/WhatsApp/Kita-Sie-Form/Last-Minute/Verkleidung) mit Copy-Buttons + Umami-Event `vorlage-copy`, Checkliste, CTA-Box. Verlinkt von Hub + `kindergeburtstag-einladung-text.html` (nach Vorlage 7).
5. **Top-Hub `/einladung/`:** „Zum Ausdrucken"-Overpromise raus (→ Link Einladungstexte), neue Ratgeber-Sektion (Wann verschicken / Was rein muss / Vorlagen-Links).

**⚠️ Kritischer Eigenfund (vor Review):** party-worker `gameUrl` (Z.1337) bettet das Spiel als iframe mit **absichtlich leeren `ort=`/`tel=`** ein (Adress-Gating). Hub-Forwarding-Script deshalb auf **Präsenz-Check `p.has()`** statt truthy — sonst hätte das Partyseiten-iframe den Hub statt des Spiels gezeigt. End-to-end verifiziert (leere Params → App rendert). **Langfristig:** Wenn alle Mottos migriert sind, Worker-gameUrl direkt auf `/whatsapp/` stellen (spart Redirect-Hop, braucht Worker-Deploy).

**Helfer-v3 (frischer claude.ai-Tab, Opus 4.8 Hoch, 2 Wellen):** W1: 80/84 — KRITISCH „jede Karte mit eigenem Mini-Spiel" → gegen Code verifiziert WAHR (10/10 Mottos eigene Komponente: DinoEier, EinhornZauber, SafariFoto, FeuerwehrEinsatz, DetektivMission, SuperheldenMission, PrinzessinBall, MeerjungfrauAbenteuer, WeltraumExpedition, PiratenInsel). Gefixt: „für jedes Motto"-Overclaim, Breadcrumb-Trailing-Slashes, t1/t5 „von→um {Uhrzeit}", „eure→deine". W2: **95/96, „beide Seiten live-fähig"**.

**Verifiziert lokal (Preview-Server):** Hub rendert, Alt-Param-Links forwarden zur App (inkl. iframe-Fall), Demo ohne Params = Mattis, JSON-LD parsen, `node --check serve-invite.mjs` OK, validate-all.sh nur pre-existing Fails (JS-Pfad-Bug + „10 Mottos"-index.html, beide per stash-Test als pre-existing bestätigt).

## 📋 Nach Deploy („Ende deploy") PFLICHT
- **GSC:** sitemap.xml geändert → Sitemap re-submit + `/einladung/piraten/` + `/einladung/piraten/vorlagen/` Indexierung anfragen.
- Funnel-/e/-Kurzlinks-Smoke: 1 Test-Einladung erstellen, /e/-Link öffnen → muss auf `/whatsapp/` landen.

## 🧭 Nächste Schritte P6-1
- Restliche 9 Mottos nach Piraten-Muster (Hub + whatsapp-Move + ggf. vorlagen), je ~1 Tag lt. Ticket. Bei jedem: `MIGRATED`-Array in serve-invite.mjs erweitern + Sitemap.
- 5 Orphan-Mottos (baustelle/dschungel/feen/pferde/ritter): Entscheidung Hub bauen vs. App abschalten (sind weiter noindex, nicht in Sitemap).

---

# Session-Notiz — 10.06.2026 mittags (Einladungs-Foto serverseitig — DEPLOYED, aus Commits rekonstruiert)

**Deployed auf main (`d504f00`, Helfer-v3 85/100):** Einladungs-Foto server-seitig in KV statt base64-in-URL (POST `/api/invphoto`, GET `/api/invimg/:id`, 90-Tage-TTL, Rate-Limit) + Piraten-Einladungsseite repariert + Funnel-Footer (Impressum/Datenschutz/Transparenz — rechtliche Pflicht, fehlte). Härtung nach Review 68→85 (`cf9fa49`). serve-invite: `?fid` → Worker-KV-Foto-URL, base64-Fallback für Alt-Links. *(Notiz nachgetragen 10.06. abends — Session hatte SESSION-NOTES nicht aktualisiert.)*

---

# Session-Notiz — 09.06.2026 (Gästeliste + Adresse-nach-Zusage Feature, site-weiter RSVP-Rename, Quality-Lektorat, Strategie-Audit-Triage)

## 🚀 DEPLOYED diese Session (main)
1. **Adresse-nach-Zusage-Feature** (Partyseite) — `aed4ac1`. Party-Adresse erscheint auf der öffentlichen Worker-Partyseite **nur nach RSVP-„ja"** (vorher öffentlich). Funnel: optionales `#psAddress`→`state.adresse`→`/api/create`. Worker: Adresse nicht ins öffentliche HTML gebacken (info-row=Platzhalter, ICS-LOCATION via Client-Var, gameUrl-ort leer, address aus public-GET gestrippt); rsvp-Handler liefert `address`+`addressIcs` nur bei `status==="ja"`; `revealAddr()`/`hideAddr()` client; localStorage+checkPrev Reload-Persistenz. **P0 Stored-XSS** in ICS SUMMARY/DESCRIPTION (childName/motto `</script>`-Breakout) mitgefixt (`<>`→`</>`). **Helfer-v3: 63→90/100, go-live ja.** Copy ehrlich („nicht öffentlich sichtbar, erscheint nach Zusage" — kein Auth-Overpromise; rsvp-Endpoint hat keine Per-Gast-Auth → bewusst).
2. **Site-weiter Rename RSVP→Gästeliste/Zusagen** — `ddc9967` + Funnel/Worker/36 Motto-JSONs. Funnel-Toggle „Gästeliste", Host-Dashboard „👥 Gästeliste", 32 SEO-Landingpages + Homepage-JSON-LD. „RSVP versteht kein Mensch" (Bolle).
3. **Quality-Lektorat + 4700-Fix + Trust-Modul** — `459991e`. drinnen+spiele-drinnen: Vulgärsprache/Denglisch/Grammatik/Schema-Drift raus (4 Helfer-v3-Runden 76→80→82→alle Blocker gefixt). `schatzsuche.html` „Über 4.700 Geburtstage geplant" (erfunden) → „15 Themen · 3 Altersstufen · druckfertige Schatzkarte — Material hast du meist zuhause". Trust-Modul im Wizard-Eckdaten: „Privat & ohne Konto … erst wenn du eine Partyseite oder Einladung erstellst, verlässt es dein Gerät" (code-verifiziert: localStorage, nur /api/create + Einladungs-Handoff senden).

## ✅ NACHGEZOGEN 10.06.2026 früh (am Rechner)
- **Worker-Deploy ERLEDIGT** via `wrangler deploy` (Version `14964ffc`). Setup: `wrangler.toml` (commit `95d811c`, secret-frei, `keep_vars=true` + KV `PARTY`=`92b9c66fe812421aa9e7a2522ae1b7f1`, Worker-Name `party-machsleicht`, compat `2026-04-07`). **Künftige Worker-Deploys = `CLOUDFLARE_API_TOKEN=... wrangler deploy`** (Einzeiler). CF-Token war „Edit Workers"-scoped, in Chat geteilt → ggf. rotieren/sicher ablegen.
- **Leak-Lücke ZU + Gating live-verifiziert** (Test-Party end-to-end, danach gelöscht): öffentliche Seite=Platzhalter, Public-GET-JSON=address gestrippt, RSVP „ja"→Adresse geliefert, RSVP „nein"→leer. Route+KV intakt (nichts gebrochen).
- **Cache-Purge = NICHT nötig** für Content-Deploys: Setup nutzt `max-age=7200, must-revalidate` → Cloudflare revalidiert selbst gegen Origin; neue Inhalte waren schon live (Cf-Cache-Status MISS/EXPIRED, empirisch geprüft). Manueller Purge nur Sonderfall (z.B. GSC-410 am 03.06). Cache-Purge-Permission bewusst NICHT in den Token genommen.
- **⚠️ `RESEND_API_KEY` liegt als plain_text-Var** (nicht Secret) im Worker — sichtbar in Settings. Auf Secret umstellen + rotieren.
- **Nit:** workers.dev-Preview-URL (`party-machsleicht.cbollweg.workers.dev`) wurde beim Deploy aktiviert (war evtl. schon an). Optional via `preview_urls = false` + redeploy abschalten.

## ⚠️ OFFEN — bei Bolle
- **🔴 PAT widerrufen** — `github_pat_11CATQ…` mehrfach im Chat geteilt → verbrannt.
- **🔴 Tracker/Consent-Entscheidung offen:** `schatzsuche.html` lädt Ahrefs (Pilot 27.05.) **+** Umami **pre-consent** auf einer „Privat"-Funnel-Seite → Helfer-v3: Verstoß gegen eigene „CDN-before-consent"-Disziplin. Bolle's Pilot — Entscheidung: bis Consent zurückhalten oder lassen?

## 📋 Background-Tasks (chips gesetzt)
- **DSGVO:** Kindername landet via Einladungs-Handoff (`?name=` in URL) in Umami-Analytics → auf Hash-Fragment umstellen ODER Analytics-Query-Param-Stripping.
- **create `time`/`endTime` validieren** wie PUT (`.slice(0,20)`) — Low, nur ICS-Datenqualität.
- **Fast-Follow-Lektorat** (nicht go-live-blockend): `Setup/Level/Rating`-Labels in Spielblöcken, `Pivots/Backup/Play-Pause` im JSON-LD, Anführungszeichen-Stil zwischen Seiten, Copy-Block-Doppelbinding (drinnen).

## 🧭 Strategie-Audit-Triage (externes Audit, verifiziert gegen echten Code)
- **Markenrisiko GEGENSTANDSLOS:** Harry Potter/Ninjago/Frozen-Seiten existieren NICHT — alle Mottos schon generisch (baustelle/detektiv/dino/…/superheld/weltraum). Audit las alte Snippets.
- **Interne Verlinkung schon erledigt:** Planer extensionslos (`/kindergeburtstag`, teils `?motto=…#planer`) auf 132/134 Motto-Seiten + allen Ratgeber-Seiten verlinkt. Nur 2 Dino-Print-Tools ohne Link (bewusst).
- **Mojibake = 0** (Audit-„kaputte Emojis" war Terminal-Artefakt). **„2014 Eltern"** = False-Positive (Doku-Jahreszahl).
- **Wizard NICHT umgebaut** (Bolle's klare Ansage — „Wann ist die Feier?"-Reorder verworfen, Kern bleibt wie gehärtet).
- Strategie-Großbaustellen (Homepage-1-CTA, Monetarisierung, Print-Vorschau) = Bolle's Produktentscheidung, nicht angefasst.

## ⚠ Methodik-Lessons (diese Session)
- **Helfer-v3 fing 2 von MIR eingebaute Regressionen** ab vor Live: `Q:→Frage:`-replace_all verschluckte das Leerzeichen (`Frage:Ist…` 5×); Foto-Booth-„Fix" war nur die Überschrift (Body+Schema 11× weiter „Foto-Booth/Props"). → **replace_all sorgfältig: Trailing-Space, Vollständigkeit über Body+JSON-LD, nicht nur H3.** Genau der Wert des unabhängigen Gates.
- **Verifikation gegen echten Code** rettete vor stundenlangem Audit-Rauschen (s. Triage oben).
- claude.ai Default-Modell sprang auf **„Fable 5"** — für Gate-Konsistenz zurück auf **Opus 4.8 Hoch** gestellt.
- **Session-Notes diese Session schleifen lassen** (User-Reminder 09.06.) — wieder aufgenommen.

---

# Session-Notiz — 03.06.2026 (GSC-De-Index Root-Cause + 410-Fix DEPLOYED + Piraten-Spiel-Kuratierung)

## 🚨 GSC-Massen-De-Indexing diagnostiziert + erster Fix deployed
- **Befund:** Indexiert 308 (8.4.) → **1 heute**, 350 „nicht indexiert". GSC-Grund **„Gecrawlt – zurzeit nicht indexiert" (310)**. **Ursache = Google-Site-Quality-Abwertung wegen Phase-1-Dünn-Content-Masse** (Lizenzmarken × Einzelalter). **KEIN technischer Defekt** (Origin <0,7s, Cache HIT, robots/Canonical/Sitemap sauber, PSI 98/87). Ahrefs-„504/Slow-Page" = Crawler-Artefakte (Umami-Beacon-Render-Timeout).
- **Aktueller Content ist GUT:** 37 Alters-Gruppen-Seiten = 6–8k Wörter, 0% Template-Dup → behalten. 48 Unique-Ratgeber + Planer.
- **DEPLOYED (Ende deploy 03.06., main 5e15e81):** P0-GSC — 25 Lizenz-/Zirkus-Legacy-Redirects von `301→/kindergeburtstag` (Soft-404-Muster) auf **`410 Gone`** umgestellt + `410.html`. Netlify-Origin liefert 410 (cache-bust-verifiziert). **⚠️ OFFEN: Cloudflare „Purge Everything" durch Bolle** (Edge serviert noch gecachte 301), DANN GSC: Sitemap neu einreichen + Flaggschiff-Seiten Index-anfragen. Voll-Diagnose: `_dev/handoff/2026-06-03-gsc-deindex-rootcause.md` · Ticket P0-GSC. Recovery = 2–4 Monate.
- **Mini-Follow-ups offen:** `/einladung`-Sitemap listet 12 redirecting URLs + Canonical-auf-Redirect; gstatic-Preconnect (Mobile-LCP); `/ratgeber/{lizenz}*` (tot, → checkliste, optional 410).

## 🎮 Piraten-Spiel-Kuratierung (js/motto-data.js = neue SSOT)
- **6 Spiele gelockt:** walk-the-plank(85), kanonenkugeln(89*), schatz-im-sand(91*), papagei-sagt(87), **piratenschiff-bauen(87, class bastel-aktion)**, **hai-tag(85, class aktiv-spiel, Best-of-3-Median 84/85/88)**. *(* = kanonenkugeln+schatz-im-sand noch WebFetch-Scores, strikt-re-verify offen.)*
- **Schwertkampf GESTRICHEN** (Säbel-Kontakt strukturell sicherheits-gedeckelt, Median 83 + Haftung; in Rubrik als gestrichene Klasse vermerkt).
- **Rubrik erweitert** (`_dev/review/game-rubric.md`): Kategorien `bastel-aktion` (Gate 85) + `aktiv-spiel` (Gate 85, Best-of-3-Median) + **Machbarkeit-Reframe** (gebundene Aufsicht = Baseline, kein Abzug — analog Foto-Reframe). Review-Methodik: JS-Paste in frische Opus-Tabs (keine Screenshots, kein GitHub-Push nötig).
- **Offen:** kanonenkugeln+schatz-im-sand strikt-verify; restliche Piraten-Spiele + 14 andere Mottos.

---

# Session-Notiz — 01.06.2026 früh (Wizard-Quick-Wins + Spiel-Detail-Frame + STRATEGISCHER PIVOT)

## 🎯 STRATEGISCHER PIVOT (01.06.2026 nachts): Wizard wird der neue Planer

**Bolle's Entscheidung:** Wizard zieht 1:1 auf `/kindergeburtstag` um — alter Planer wird abgelöst.

### Architektur-Entscheidungen (Bolle 01.06.2026)
1. **Schatzsuche im Wizard:** Als Wizard-Modus integriert (Stage-1-Auswahl „Kompletter Plan" oder „Nur Schatzsuche"). SZ_THEMES als Datenquelle. /schatzsuche-Hub-Pages bleiben SEO-Traffic-Quelle, linken in Wizard.
2. **Alter Planer:** Komplett ersetzen durch Wizard-Swap auf `/kindergeburtstag` (1:1 Deploy). „kindergeburtstag-URL ist sexy" — bleibt.
3. **URL-Strategie:** Wizard zieht ein auf `/kindergeburtstag`. Hub-Sticky-Bars (alle 15) funktionieren ohne Edit weiter, SEO-Backlinks unverändert.

### Curation-Methodik (Bolle's Vorgabe)
**Nicht per Skript** (verliert Curation). **Motto-für-Motto handgemacht.**

Pro Motto:
1. Sammle ALLE Spielinhalte aus 4 Quellen: GENERIC + Hub-Page + SZ_THEMES + Wizard-MOTTOS
2. Dedupliziere
3. Curation gemeinsam: Vibe-Check (catchier Name), Sicherheits-Check (≥4cm, EN-71, Pflicht-Regeln), Variety-Check
4. In Wizard packen mit voller material/anleitung/dauer/safety
5. Adversarial-Reviewer (Helfer-v3, Score ≥ 90)

### Migration-Roadmap (P8-X)

| Phase | Was | Aufwand |
|---|---|---|
| **0** ✅ erledigt | Spiele-Quellen-Audit: 135 Spiele + 225 Stations + 45 Kuchen voll gepflegt; Snacks-Lücke | (gemacht) |
| **1** | Pro-Motto-Curation (15 Mottos × ~50 Min) | **~12.5h** Curation-Arbeit |
| **2** | Live-Preview + Mission-Property (Plan v2 — Sidebar rechts Desktop, Sticky-Banner Mobile) | 3.5h |
| **3** | Material/Kuchen/Deko/Mitgebsel-Module in Wizard portieren | 3h |
| **4** | Schatzsuche als Wizard-Modus | 2h |
| **4.5** | Snacks-Recherche-Lücke schließen (15 × 3 Altersgruppen) | 1.5h |
| **5** | Funktionalitäts-Parität-Audit | 30 Min |
| **6** | URL-Swap: wizard.html → kindergeburtstag.html (Netlify-Config) | 30 Min |
| **Total** | | **~16-18h aktive Bauzeit, 4-5 Sessions** |

### Pilot piraten (01.06.2026 nachts gestartet)
- 4 Quellen gesammelt: 9 GENERIC + 15 Hub-Page + 15 SZ_THEMES + 10 Wizard = ~50 Konzepte total
- Realistischer Aufwand pro Motto: 45-60 Min (statt initialer Schätzung 30-45 Min)
- Curation-Tabelle steht im SESSION-NOTES — wird Pilot für die anderen 14 Mottos

### Nächste Session
- Pilot piraten durchziehen: Master-Liste curatieren → in Wizard packen → Adversarial-Reviewer
- Dann detektiv (Beliebt-Badge) als 2. Welle
- Iterativ alle 15 Mottos

---

## 🚀 Deploy 01.06.2026 nachts (Wizard Spiel-Detail-Frame + Showcase piraten, Score Self-Audit 7/10)

**Commit:** `9ca8892` (Merge draft → main)

### Was deployt wurde
- **Spiel-Detail-Frame** im Wizard: Click auf jede Spiel-Karte öffnet Drawer (rechts Desktop, Bottom-Sheet Mobile) mit Material-Bullets + Kurz-Anleitung + Dauer-Badge + Safety-Hinweis + CTA „Voll-Anleitung im Planer öffnen"
- **piraten als Showcase:** alle 10 Spiele voll gepflegt (Walk the Plank, Schwertkampf mit Pflicht-Regeln, Schatz im Sand mit DIN-EN-71-3, Edelsteinsuche ≥4cm-Großperlen-Pflicht)
- **14 Mottos:** Fallback „Material und Anleitung im Planer" mit Direct-Link CTA → wird durch P8-X Migration-Sprint ersetzt
- **ESC** schließt Drawer

### Bewerter-Pitch (extern) integriert
Bolle hat externen Bewerter konsultiert — Kern: „vom Setup-Formular zum Erlebnis-Generator". 7 Gamechanger identifiziert. Brutal priorisiert:
1. **Live Party Preview** (Sidebar während Wizard läuft) — UX-Hebel #1
2. **Geheimwort als roter Faden** (Einladung → Partyseite → Schatzsuche) — Wow-Hebel

Anti-Sycophancy-Filter (Claude):
- Geheimwort ohne Bridge zu Planer-Schatzsuche-Tool = reine Kosmetik
- Mit Bridge = echter Funnel-Hebel (Drop-off-Reduktion)
- Aktuell **kein** Bridge gebaut — wäre eigener Sprint

Plan v2 für Live-Preview (gestern Nacht beschrieben): Sidebar rechts Desktop / Sticky-Banner Mobile + Mission-Property pro Motto + Stage-Wechsel-Animation + Stage-6-Morph + State-Sync vollständig. ~3.5h.

### Self-Audit Score: 7/10 (Plan v1)
- Mission-Story fehlt
- Animation generic
- Stage-6 Übergang abrupt
- Mobile Glanz-Garnitur
- State-Sync unterspezifiziert
- Datenpflege „kommt später" Cop-Out

→ Plan v2 mit Mission integriert würde 8.5/10 erreichen.

---

# Session-Notiz — 31.05.2026 spätnachts (Welle 2 Phase 3 + P1-21 Planer + SZ_THEMES Vollständigkeit)

## 🚀 Deploy 31.05.2026 Teil 4 (SZ_THEMES 9 → 15, Score 88/100)

Schatzsuche-Engine SZ_THEMES um 6 fehlende Themen ergänzt (meerjungfrau, pferde, ritter, baustelle, prinzessin = „Königreich-Schatzsuche", superheld = „Held:innen-Schatzsuche") — kein Disney/Marvel.

### Welle-Trace SZ_THEMES (Branch-Trick, frische Reviewer-Sessions)

| Welle | Score | Adressiert |
|---|---|---|
| Initial | 72 | 6 MUST-FIX (Wasser-Aufsicht, Hufeisen-Material, Polier:in-Stereotype, Hartbonbons-Widerspruch, Cape-QuickRelease, Burg-Eroberung-Begründung) |
| 5 (final) | **88** | 4 weitere (rutschfeste Unterlage + Sicherheits-Tape, Wurfzone-Markierung 1.5/2/2.5m, Tinkturregel-Karten-Vorlage, Elektriker:in Anna/Leon mit Namen) — ritter bei **90** ✅ |

15 Themen × 5 Stations × 3 Altersgruppen = **225 Schatzsuche-Stationen** vorgehalten.

### Code-Mechanik
- Helper-Skript `_dev/scripts/add-sz-themes.js` schreibt Themen via Regex-Match in minified line 1 (JS-valid via JSON-Subset)
- `_dev/review/sz-themes-input.md` als verankertes Review-Input mit allen 6 Themes-Highlights
- node --check verifiziert nach jedem Iterations-Schritt

### Trust-Zahlen Schatzsuche Sync 13 → 15
- index.html (3 Stellen: description, featureList, FAQ Schatzsuche-Sektion)
- schatzsuche.html h2 + 2 neue Motto-Tiles (Königreich + Held:innen)
- schatzsuche/prinzessin + schatzsuche/superheld „Alle X Themen"
- Stationen 135 → 225



## 🔄 IN REVIEW: P1-21 Welle 2 — meerjungfrau befüllt + prinzessin/superheld als generic Reskins + Trust-Zahlen 13→15

**Status:** Edits gemacht, committed auf draft, Branch-Trick-Reviewer läuft (frischer claude.ai-Tab mit SHA-pinned URL). Main-Merge erst nach Score ≥ 90.

### User-Entscheidungen (Auto-Mode-Klarstellung)

1. **meerjungfrau-Stub** → Vollständig nachpflegen (Großperlen ≥4 cm, Riff-Expedition, Tiefsee-Mission etc.) ✅ umgesetzt
2. **prinzessin + superheld** → Markenrechts-Reskin als generic Mottos im Planer (kein Disney/Marvel) ✅ umgesetzt:
   - prinzessin → "Königreich & Hofstaat" (Hofknicks, Tee-Etikette, Wiener Walzer 3/4-Takt, Sissi-Quiz) — alle Stationen frei wählbar, kein Gender-Split, KEIN Heißwachs, KEIN Glas für 3-5 J, Drahttiara nur Erwachsene
   - superheld → "Held:innen-Akademie" (eigene Identität wählen, Cape-Design, Helden-Bootcamp, Operation: Nemesis, Tugend-Versprechen) — generic ohne Marvel-IP
3. **Trust-Zahlen** → Auf 15 (Hub-Wahrheit) ✅ umgesetzt: index.html (6 Stellen) + kindergeburtstag.html ItemList + schatzsuche/superheld + schatzsuche/prinzessin + ueber-uns.html

### Drei Wahrheiten konsolidiert

| Ebene | Anzahl | Status |
|---|---|---|
| Hub-Pages | 15 | alle Welle-2-Sweep durchlaufen |
| **Planer-Mottos (GENERIC)** | **15** | alle mit 3/3/3 Spielen, Deko, Mitgebsel, Kuchen (verifiziert via `new Function()` + `find(id===)`) |
| Schatzsuche-Themen | 13 (excl. prinzessin/superheld in SZ_THEMES) | separates PBI |
| Einladung-Apps | 10 (Einladung-Tool nicht angefasst) | separates PBI |

### Markenrechts-Hinweis

Die generic Reskins „Königreich & Hofstaat" und „Held:innen-Akademie" enthalten **keine Disney/Marvel-IP**:
- Keine Disney-Prinzessinnen-Namen (Cinderella, Belle, Elsa etc.)
- Keine Marvel/DC-Held:innen-Namen (Spiderman, Avengers etc.)
- Stattdessen: historische Persönlichkeiten (Sissi, Queen Elizabeth, Ludwig XIV) + eigene Held:innen-Identität die das Kind selbst entwirft

### Anti-Sycophancy-Pattern strikt eingehalten

- Edit-Schritt durch Haupt-Claude (kein Sub-Agent)
- Branch-Trick mit SHA-pinned `raw.githubusercontent.com`-URL
- Reviewer in NEUEM claude.ai-Tab (Helfer-v3-Anti-Sycophancy)
- Score-Vergabe konservativ: ≥ 90 als Elite-Schwelle, sonst MUST-FIX-Welle

## 🚀 Deploy 31.05.2026 abends Teil 2 (P1-21 — Planer-Funnel pferde+ritter+baustelle) [✅ MAIN]

Direkter Funnel-Bruch behoben: Hub-Pages pferde + ritter + baustelle waren seit Welle 1 (30.05.2026) live, aber im Planer-Array `ALL_MOTTOS` nicht enthalten. Sticky-Bar-Klick vom Hub auf `?motto=pferde#planer` → `ALL_MOTTOS.find(...)` returns undefined → Planer-Default-State, User-Erwartung gebrochen.

### Fix umgesetzt

- **`js/kindergeburtstag.js`**: 3 vollständige Motto-Einträge ins `GENERIC`-Array eingefügt (vor `];` Z. 1773). Jeweils 3 Spiele × 3 Altersgruppen, Deko (3 items + dekoMin), Mitgebsel (3 items), Kuchen (klein/mittel/gross je 1 Rezept). Inhalte aus den frisch deployten Hub-Pages abgeleitet (Pool-Nudel-Pferde-Parcours, Wappen-Malen-Heraldikregel, LKW-Parcours-Sicherheits-Linie, ≥4 cm Großteile-Konsistenz).
- **`kindergeburtstag.html` ItemList Schema**: 10 → 13 Mottos (pferde + ritter + baustelle + dschungel + feen waren auch schon nicht in ItemList, jetzt alle drin). `numberOfItems` + `description` synchron.
- **Syntax-Check**: `new Function(code)` parsed clean, `ALL_MOTTOS.length === 13`, alle 3 Mottos via `find(id===)` lookup-bar mit `3/3/3` Spiele.

### prinzessin + superheld bewusst nicht im Planer-Array (Architektur-Inkonsistenz dokumentiert)

LICENSE-Array ist seit 29.04.2026 leer („Lizenz-Mottos wurden aus dem Tool entfernt — Markenrechts-Risiko"). prinzessin + superheld Hub-Pages bestehen weiter und linken via Sticky-Bar auf `/kindergeburtstag?motto=prinzessin|superheld#planer`, der Planer kennt sie aber nicht → Default-State. **Architektur-Entscheidung nötig** (separates PBI):
1. **Option A — Hub-Sticky-Bars umstellen**: prinzessin/superheld Hub-Sticky-Bar nur noch auf Schatzsuche-Modus (`?modus=schatzsuche`), nicht Planer.
2. **Option B — Markenrechts-Reskin**: „königliche Welt" / „Held:innen-Akademie" als generische Reskins ins GENERIC.
3. **Option C — Hub-Pages aus Index nehmen**: prinzessin/superheld als Hub-Pages depublizieren, nur Schatzsuche-Seiten lassen.

Aktueller Stand (Workaround): Planer fällt für `?motto=prinzessin|superheld` auf Default zurück, Hub-Page-Sicht-Indizierung bleibt unangetastet. ItemList listet bewusst nur die 13 Planer-Mottos.

## 🚀 Deploy 31.05.2026 abends Teil 1 (Phase 3 — detektiv + prinzessin MUST-FIX)

Letzte Anti-Sycophancy-Welle des Hub-Sweeps. Anti-Sycophancy fresh-tab-Reviewer hat detektiv mit 84 und prinzessin mit 80 zurückgegeben — beide unter Elite-Schwelle 90. Nur die MUST-FIX wurden umgesetzt (keine Punktezahl-Optimierung über 90 hinaus), entsprechend Bolle's Vorgabe „Mach Ende nach der Welle mit diesen Mottos. Nur noch Must fixes."

### detektiv.html — MUST-FIX umgesetzt

- **Kostenwiderspruch gelöst**: FAQ-Antwort „2-5 Euro pro Kind" widersprach Budget-Box (9,40 €/Kind). FAQ präzisiert → Budget verifizierbar.
- **Nancy Drew Faktencheck**: „Schülerin-Detektivin" → „junge Amateur-Detektivin" (Schülerin-Framing zu eng + faktisch unsauber; Krimi-Reihe seit 1930, Carolyn Keene Sammelpseudonym).
- **Lügendetektor pseudowissenschaftlich entlarvt**: Spiel-Lügendetektor mit explizitem Hedge: „natürlich nur ein Spiel: Puls steigt auch vor Aufregung, echte Polygraphen sind wissenschaftlich kein zuverlässiger Lügennachweis".

### prinzessin.html — 4 MUST-FIX umgesetzt

1. **Juwelen-Jagd 3–5 J Glasperlen-Default raus**: „bunte Glasperlen und Plastik-Edelsteine" → **Großperlen ≥4 cm aus Holz/Filz, KEIN Glas, KEINE Murmeln, KEINE Pailletten**. Glaselemente erst ab 6 Jahren + nur in homogener Altersgruppe ohne jüngere Geschwister. EN-71-Kleinteilezylinder ~3,17 cm Begründung explizit.
2. **Draht-Tiara 9–12 Schneide-Sicherheit verschärft**: Drahtschneiden ausschließlich durch Erwachsene, **alle Kinder in Reichweite tragen Bastel-Brille**, Drahtenden im Tuch / leeren Becher schneiden (Geschoss-Risiko), danach Enden nach innen umbiegen. Glaselemente erst ab 9.
3. **Heißwachs/Brand-Kante/Siegelwachs gestrichen** (Konsistenz zur LED-Linie): Pergament-Rollen → aufgeklebter Gold-Sticker. Schatzkarte → nur Kaffee-/Teefärbung + leichtes Reiben, **KEINE Brand-Kante**. Alle 3 Stellen (HowTo-Step, FAQ-Antwort, sichtbarer DOM-Block + JSON-LD-FAQ + sichtbares Details-FAQ) synchronisiert.
4. **„Jungen-Variante" Gender-Split aufgelöst**: 
   - Akademie-Intro „Echte Prinzessinnen müssen viel lernen: Tanzen … Hofknicks" → „Im Königreich lernen alle Kinder dasselbe — Tanzen, Tisch-Etikette, Schwertkampf und höfische Verbeugung sind frei wählbar, kein Gender-Split."
   - Elite-Hofschule-Card „Jungen-Variante: Königshof-Akademie mit Prinzen + Rittern" → „alle Stationen frei wählbar (kein Gender-Split), Königshof-Akademie als optionale Story-Erweiterung mit Pagen-Probe, Ritter:innen-Eid, Drachen-Mut".
   - FAQ-Frage „gemischt mit Jungs": komplett umformuliert — Hofstaat „Prinz:essinnen, Ritter:innen, Pagen, Hofnarren" frei wählbar (DOM + JSON-LD sync).
   - HowToSupply: „Königshof-Akademie / Jungen-Variante" → „Königshof-Akademie — frei wählbar für alle Kinder".
   - Glitzer-Krönchen 3-5 J Warning verschärft: „Großteile ≥4 cm, KEIN Glas, KEINE Pailletten, KEINE kleinen Klebeperlen".

### Score-Tabelle Welle 2 voller Audit (alle 12 Hubs)

| Hub | W2 frisch (Reviewer) | Phase-Wave | Status |
|---|---|---|---|
| dino | 81 | P1 | ✅ MUST-FIX deployed |
| safari | 79 | P1 | ✅ MUST-FIX deployed |
| feen | 81 | P1 | ✅ MUST-FIX deployed |
| einhorn | 82 | P1 | ✅ MUST-FIX deployed |
| meerjungfrau | 79 | P2 | ✅ MUST-FIX deployed |
| weltraum | 84 | P2 | ✅ MUST-FIX deployed |
| feuerwehr | 84 | P2 | ✅ MUST-FIX deployed |
| dschungel | 81 | P2 | ✅ MUST-FIX deployed |
| piraten | 83 | P2 | ✅ MUST-FIX deployed |
| superheld | 87 | P2 | ✅ MUST-FIX deployed |
| detektiv | 84 | P3 | ✅ MUST-FIX deployed (heute abend) |
| prinzessin | 80 | P3 | ✅ MUST-FIX deployed (heute abend) |

15/15 Hubs systemisch konsistent (Sticky-Bar Planer primary, PT15M HowTo, Funnel-Axiom, EN-71-Kleinteile-Linie ≥4 cm, LED-statt-Flamme, Gender-Inklusivität).

## ⚠ Anti-Sycophancy Lessons-Learned (verfestigt)

- **Score-Drift kontaminiert vs frisch**: pferde -16, ritter -10, alle 12 Hubs durchschnittlich -8. Self-Verify und Re-Verify-im-selben-Tab geben systematisch zu hohe Scores.
- **Hub-Sprint-Regel ab jetzt**: Reviewer immer in frischem claude.ai-Tab mit SHA-pinned URL (`raw.githubusercontent.com/.../<commit-sha>/...`). Cache-Bust `?cb=X` reicht GitHub-CDN nicht.
- **Sub-Agents bleiben verboten für Review + Rewrite** (CLAUDE.md Helfer-v3-Regel verfestigt — Memory-Eintrag aktualisiert nach Welle 1A-Regress).

## Was wurde gemacht (heute insgesamt)

- Welle 2 Phase 1 (4 Hubs Quick-MUST-FIX): dino + safari + einhorn + feen
- Welle 2 Phase 2 (6 Hubs Detail-MUST-FIX): meerjungfrau + weltraum + feuerwehr + dschungel + piraten + superheld
- Welle 2 Phase 3 (heute abend): detektiv + prinzessin MUST-FIX
- Anti-Sycophancy-Pattern verfestigt + Memory aktualisiert
- 13 Hub-Files insgesamt heute auf systemisch Elite-Stand

## Nächste Schritte

- **Cloudflare-Cache-Purge PFLICHT** nach diesem Deploy (dash.cloudflare.com → machsleicht.de → Caching → Purge Everything)
- Sprint 2 Funnel-Mess-Sprint kann starten (Hub-Pages-Sweep ist abgeschlossen)
- Optional: Welle 2 Final-Re-Verify mit frischem Tab für detektiv + prinzessin nach Deploy + Cache-Purge (zur Bestätigung ≥85)

## Offene Fragen

- Keine. Hub-Sweep abgeschlossen. 15/15 Mottos auf systemisch Elite-Niveau.
