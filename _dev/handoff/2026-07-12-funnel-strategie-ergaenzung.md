# Funnel-Strategie — Ergänzung + Code-Verifikation (Stand 2026-07-12)

Ergänzt Fables Strategie-Dokument um Default-Empfehlungen je offener Entscheidung + De-Risk des 60-Skin-Passes — **und korrigiert die Punkte, die sich beim harten Abgleich gegen den echten Funnel-Code (`party-worker.js`, `core.js`, Live-Spiele) als falsch/unvollständig erwiesen haben.** Jede Zeile unten ist gegen den Code belegt (Zeilennummern in `party-worker.js` sofern nicht anders vermerkt).

## Entscheidung 1 — Datei-Naming unter `/spiele/` → **1:1 Zero-Diff (nie normalisieren)** ✅ gilt
Der geplante `GAME_CATALOG` hält `path` als Source-of-Truth → der Dateiname ist ein Implementierungs-Detail hinter `gameId`. Normalisieren = ~60 Edits + Risiko relative `core/`-Includes zu brechen, null Gewinn. **Bonus-Beleg für Fables „works by accident"-Bug:** `pickMotto` (Z.1246-1254) setzt nur `motto` (Freitext-Name) + `mottoEmoji`, **nicht** `mottoId`; `mottoId` wird ausschließlich aus der URL-Query gelesen (Z.1196). Chip-gewählte Mottos haben also leeres `mottoId` → Auflösung fällt auf Freitext-Fuzzy (Z.1354). Ein sauberer `gameId`-Kontrakt würde exakt dem `pickMotto`-Muster folgen (verstecktes Feld setzen).

## Entscheidung 2 — RSVP-Handshake → **KORRIGIERT: Infra existiert schon; A&F muss den bestehenden Kontrakt adoptieren + Origin-Check nachrüsten**
Meine erste Fassung („baue postMessage `{type:'ml-rsvp'}` + `#rsvpAnchor`") war **falsch** — das ist zu 90 % schon gebaut:
- Partyseite lauscht bereits auf `window.addEventListener("message", e => e.data==="gameComplete")` (Z.1727-1733) → blendet das Spiel aus, Konfetti, scrollt nach 1,2 s zu `#rsvpAnchor` (existiert, Z.1542).
- Die RSVP ist eine **eigene Karte auf der Partyseite** (Z.1543), **kein** Button im Spiel-Win-Screen. Es gibt also nichts „umzurouten".
- **Der echte Kontrakt ist der String `"gameComplete"`**, den 14 der 15 Live-Spiele bereits posten (grep-Count je 1) — nicht mein erfundenes `{type:'ml-rsvp'}`.

Korrekte Empfehlung:
1. Die A&F-Familie muss denselben `parent.postMessage("gameComplete", "https://party.machsleicht.de")` beim Win senden (siehe De-Risk unten — core.js postet heute gar nichts).
2. **Härtung (MINOR):** Der Listener (Z.1727) prüft **keinen Origin** — akzeptiert `"gameComplete"` von jeder Quelle. Effekt ist nur Scroll+Konfetti (kein Datenabfluss), aber der Origin-Check (`e.origin==="https://machsleicht.de"`) gehört rein.

## Entscheidung 3 — Die 5 Mottos ohne Chip → **Chips in P1 nachziehen** ✅ gilt, exakt bestätigt
10 Chips im Creator (Z.900-909: Piraten, Dino, Safari, Weltraum, Detektiv, Superheld, Prinzessin, Einhorn, Meerjungfrau, Feuerwehr) vs. 15 in `GAME_MOTTOS` (Z.1352). **Fehlende 5 = baustelle, dschungel, feen, pferde, ritter** — bestätigt. ~5 Zeilen `pickMotto(...)` in `createPage`, gated auf Katalog-`status:"go"`. Nicht auf P3 schieben.

## De-Risk — 60-Skin-Pass → **These hält (Engine-Ebene, ~1 Datei), Inhalt aber KORRIGIERT & größer**
Die A&F-Produktisierung ist **kein** „read date/time/ort", sondern ein **Parameter-Kontrakt-Mismatch** zwischen dem, was der Worker sendet, und dem, was `core.js` liest. Belege:

**Was der Worker sendet** (gameUrl, Z.1357): `?name=<Kind>&date=<..>&time=<..>&ort=&foto=<invimg-URL>`
— **`ort` bewusst LEER** (Z.1355-1357: „Adress-Gating: ort NICHT in die Spiel-URL … Leak vor Zusage"); Adresse erscheint erst nach RSVP-„ja" (Z.1539).

**Was die LIVE-Familie liest** (`einladung/<motto>/whatsapp/index.html`, Z.1855-1862): `name→childName`, `date→partyDate`, `time→partyTime`, `ort→partyPlace`, `foto→fotoUrl` (mit `https://party.machsleicht.de/api/invimg/`-Whitelist). **Die Live-Spiele sind voll verdrahtet — sie sind die Referenz-Implementierung zum Abkupfern.**

**Was die A&F-Familie (`core.js`) liest:** nur `g` (Gast), `k` (Kind), `age`, `nofoto` (Z.51-68). Das Foto kommt aus einer **per-Skin-Konstante** `theme.photo` (core.js Z.67), **nicht** aus `?foto`. Win-Karten-Datum/Ort **hartkodiert** im Template (`game-schatzjagd-piraten.html` Z.106: `wDate=„Samstag, 12. Juli" / wTime=„15:00 Uhr" / wPlace=„Bei uns"`), identisch in allen 15 Skins. `core.js` postet **kein** `gameComplete` (grep leer).

**⇒ Die 4-teilige core.js-Angleichung (alles in EINER Datei + 1 Template-Zeile):**
1. **Kindname:** Worker sendet `?name=`, core.js liest `?k=` → Mismatch. `kid()` zusätzlich `name` als Fallback lesen.
2. **Foto (Magic Moment):** `?foto=` mit derselben invimg-`https`-Whitelist lesen (core.js hat schon einen CSS-url-safe-Sanitizer, Z.66) → als `photo` nutzen, sonst per-Skin-Demo. **Ohne das kann A&F das echte Kind nie zeigen.**
3. **Datum/Zeit (NICHT Ort):** `?date`/`?time` → `wDate`/`wTime` schreiben. `wPlace` bleibt **gated** (Platzhalter „Ort erfährst du nach der Zusage" oder ausblenden) — Adresse NIE ins Spiel (Privacy-Design, s.o.).
4. **Handshake:** `parent.postMessage("gameComplete", "https://party.machsleicht.de")` beim Win → löst den Party-Seiten-Scroll (Z.1728) aus.

**Abnahme-Check statt QA-pro-Skin:** Smoke-Skript lädt jeden Skin mit `?name=Test&date=2026-08-01&time=15:00&foto=<demo-invimg>`, asserted: Win-Karte zeigt `2026-08-01`/`15:00` (nicht das Demo-Datum), Foto/Avatar korrekt, `wPlace` zeigt **keine** Adresse, und ein `postMessage("gameComplete")` feuert.

## 🔴 NEUER LIVE-BUG (nicht in Fables Doc, nicht in meiner ersten Fassung)
**Das piraten-Live-Spiel postet KEIN `gameComplete`** (grep-Count: piraten=0; baustelle/dino/… je =1). Da piraten das **Default-Fallback-Motto** ist (Z.1354 `|| "piraten"`) und jedes Custom-Motto auf piraten fällt, feuert der **Auto-Scroll-zur-Zusage beim traffic-stärksten Motto NIE**. No-Fail bleibt (Gast kann manuell scrollen), aber der Konversions-Nudge ist genau dort tot.
**Fix:** die eine `postMessage("gameComplete", …)`-Zeile beim Win ins piraten-Live-Spiel einbauen (die anderen 14 haben sie). Klein, unabhängig, hoch-wirksam — Kandidat für einen schnellen Einzel-Fix (mit unabhängigem Review vor Deploy).

## Go-Live-Sweep (Web-Experten-Blick, 2026-07-12) — was VOR „live" zählt
Für ein WhatsApp-geteiltes Produkt ist die Reihenfolge nicht „Spiele fertig → live", sondern: **fängt die virale Schleife überhaupt an, und kann man sie messen?** Ranking nach Hebel:

1. **🔴 `og:image` fehlt komplett — der WhatsApp-Vorschau-Card hat kein Bild.** Gästeseite-Head (Z.1365-1374): og:title/description/url/locale/site_name vorhanden, **kein `og:image`, kein `twitter:card`**. Wenn ein Elternteil den Link in WhatsApp pastet, zeigt WA nur eine Text-Karte → wirkt unfertig/spammy → weniger Klicks. Das ist der **Top-of-Funnel** eines Share-Produkts. Fix ist billig: `og:image` = das gespeicherte Einladungsbild; der `/api/invimg/<id>`-Endpoint ist schon **crawler-ready** (Z.561-566: `image/jpeg`, `Cache-Control: public, max-age=31536000, immutable`, `Access-Control-Allow-Origin: *`). Ideal ein 1200×630-Hero-Crop für die große Karte + `twitter:card=summary_large_image`. **Höchster Einzel-Hebel vor Go-Live.**
2. **🟠 Konversions-Funnel nicht messbar.** `plausible()` feuert nur bei `party_created` (Z.1211) + Edit-Link/Newsletter (Z.1227). **Kein Tracking bei den zwei Events, die zählen: `gameComplete` (Z.1727) und RSVP-Absenden (`sendRsvp`, ~Z.1688).** Bolle baut einen Funnel, den er nicht sehen kann (öffnen→spielen→zusagen). Fix: `plausible("game_complete")` im Message-Handler + `plausible("rsvp_sent",{props:{status}})` in sendRsvp. Ohne das ist jede spätere Optimierung blind.
3. **🟠 iframe-Hygiene (Perf + A11y).** Das Spiel-iframe (Z.1533) hat **kein `loading="lazy"`** → das 200-KB-Spiel lädt eager und konkurriert mit den Party-Details, die der Gast zuerst braucht; **kein `title`** → A11y-Fehler (Screenreader). Höhe ist per CSS gesetzt (Z.1417 `min(85vh,700px)`) → kein CLS. Quick Wins: `loading="lazy"` + `title="Einladungsspiel"` (+ optional `sandbox`).
4. **🟡 postMessage-Listener ohne Origin-Check** (Z.1727) — s. Entscheidung 2. Härtung vor Live.
5. **🔴 piraten-`gameComplete`-Bug** (s.o.) — Default-Motto ohne RSVP-Handshake.
6. **🟡 Manuell testen:** abgelaufene/gelöschte Party (KV-TTL) aus Gast-Sicht — was sieht der Gast? (deckt sich mit offenem Task „Test-Party auditieren").

**Experten-Merksatz:** #1 und #2 zuerst — der Vorschau-Card entscheidet, ob die Schleife startet, und Tracking entscheidet, ob man sie je verbessern kann. Beides ist billiger als jedes weitere Spiel-Polish.

## ✅ GEBAUT (2026-07-12, draft — NICHT deployed, Stufe-2-Review offen)
Der komplette Plan oben ist umgesetzt und per Browser-Smoke + Greps belegt:
1. **Engine (`core.js`, wirkt auf alle 60 Prototypen + 15 /spiele/-Skins):** `?name`-Fallback in `kid()`; `?foto`-Override in `setPhoto()` (strikte invimg-Whitelist, Runtime-getestet: invimg ✓ / Fremd-URL ✗ / Subdomain-Trick ✗); Party-Modus-Block (Real-Erkennung: iframe ODER name/k/foto/date-Param → `#wDate/#wTime` aus Params (deutsch formatiert) sonst ausgeblendet, `#wPlace` = Neugier-Teaser statt Adresse, Demo-Note weg, `#rsvpBtn`-Klick = `postMessage("gameComplete")`-Brücke). Demo-Modus (Standalone ohne Params) verifiziert unverändert.
2. **/spiele/ (Zero-Diff-Promotion):** 15 A&F-Skins + core/ als Kopie aus `_dev/prototypes` (diff-identisch), `_headers` noindex.
3. **Worker (`party-worker.js`):** `GAME_CATALOG` (15 Mottos × 2 = 30 Einträge, status-Kill-Switch) + `gameById()`; gameId-Kontrakt in create (Z.319) + PATCH (Z.392) + Serve-Auflösung mit Legacy-Fallback; **Spiel-Galerie im Creator** (Karten je Motto, Default vorselektiert = 0 Extra-Klicks, „▶ Ausprobieren" = spielbare Modal-Vorschau via bestehendem modalFrame); 15 Motto-Chips (5 neue: baustelle/dschungel/feen/pferde/ritter) mit `data-mid` → mottoId-Bug (Fable) gefixt; **og:image + twitter:card** via neuem `/api/ogimg/:id` (Hero-Foto raw, `hasPhoto`-Flag in create/PATCH); **Tracking:** `game_complete`, `rsvp_sent{status}`, `game_selected`, `game_preview`; **Härtung:** Origin-Check im message-Listener, iframe `loading="lazy"` + `title`, `&age=` in gameUrl (adaptive Schwierigkeit).
4. **piraten-Legacy-Fix:** `postMessage("gameComplete")` bei `setPhase("won")` (Muster von dino) — 15/15 Spiele posten jetzt.

**Verifikation:** `node --check` Worker+Core grün; Browser-Smoke (echtes DOM): Party-Modus, Demo-Modus, kid()-Auflösung, gameComplete-Empfang beim Parent, Foto-Whitelist. Validator: 2 Bestands-FAILs (js/-ENOENT-Pfadbug + veraltete „10 Mottos"-Regel) — per git-stash-Gegenprobe als vor-existierend belegt, gehören zu Task #76.

**Vor Deploy offen:** unabhängige Stufe-2-Review (claude.ai Fable 5 Max + ChatGPT) über party-worker.js-Diff + core.js + 1 Skin; Worker-Deploy via wrangler (separater Schritt, nur auf Bolle-Anweisung); Editor-UI zum nachträglichen Spiel-Wechsel = P2.

## Netto (verifiziert)
- Entscheidung 1 & 3: bestätigt. Entscheidung 2: Infra existiert, A&F muss den bestehenden `"gameComplete"`-Kontrakt adoptieren + Origin-Check.
- De-Risk hält (Engine-Ebene), aber die A&F-Angleichung ist **4 Params (name-Fallback, foto, date/time, postMessage) — NICHT ort** — mit den Live-Spielen als 1:1-Referenz.
- Bonus: 1 echter Live-Bug (piraten-Handshake) gefunden, der ohne den Code-Abgleich unsichtbar geblieben wäre.

## Gate-Ergebnis (2026-07-12, Stufe 2+3 abgeschlossen)
| Gutachter | Stand | Urteil |
|---|---|---|
| Fable 5 Max (target-blind) | bd398be | **64/100** — 3 MAJORs (demoTag, DSGVO-Foto-Lifecycle, Demo-Foto-Gate) |
| Fable 5 Max (Diff-Re-Check) | ec79c0e | **84/100 — „Ship-fähig für den Katalog-Launch"**; 2 neue MINORs (invimg-Cache, Badge-Flash) → beide gefixt in 849236d/Folge-Commit |
| ChatGPT Hoch (frisch, 12m Reasoning) | ec79c0e | „Geschlossene Beta vertretbar" — W2.1 Cache (gefixt), W9.1 og:image-Platzierung (**False-Positive**, widerlegt: guestPageFull baut eigenen Head), W10.1 Funnel-Nenner (gefixt: party_view + game-Props) |

**0 offene MAJORs.** Promotion-Regel NEU: `/spiele/`-Kopien = Template-Kopie **plus demoTag-Strip** (Serve-Variante ohne PROTOTYP-Badge; _dev-Prototypen behalten es). Rest-Punkte fuer nach dem Deploy: realer WhatsApp-Vorschau-Test (og:image), optional 1200×630-Derivat + og:image:alt, optional game_loaded-Event.
