# Brief: Einladungs­maschine machsleicht.de (v2 — nach tiefem Funnel-/Plan-/Worker-Audit)

> Ziel unverändert: **eine** Einladungsmaschine mit **zwei Gesichtern** — im Planer „ist schon vorbereitet", standalone „in 2 Minuten fertig" — aus **einem** Datenmodell, **einer** Theme-Logik.
> **v2-Kernbefund:** Die Maschine existiert nicht nur teilweise — sie existiert **doppelt und fragmentiert**. Zwei getrennte Persistenz-Backends, ~5 Theme-Quellen, drei Einladungs-Implementierungen. Der Auftrag ist **Vereinheitlichung + gezielte Lückenfüllung**, kein Neubau. Alle Aussagen unten mit echtem Datei:Zeile-Beleg aus dem Repo-Audit (08.07.).

---

## 0. Changelog v1 → v2 (was der Deep-Dive geändert hat)

- **Zwei Persistenz-Backends entdeckt** (§1): Standalone `erstellen/` → Netlify `create-invite` → `/e/<slug>`; Funnel Stage 4 → Worker `/api/create` → `party.machsleicht.de/:id`. Das ist die zentrale Architektur-Entscheidung, die v1 nicht sah.
- **Echte `state`-Shape** ersetzt das erfundene `PlannerEventData` (§8) — inkl. `state.invite` + `state.partyseite`, die im Funnel **schon existieren** (Stage 4).
- **Echter `/api/create`- + RSVP-Vertrag** dokumentiert (§2) — inkl. Adress-Gating (nur bei RSVP „ja"), `askAllergies`/`askPickup` bereits vorhanden, Foto-Bug-Lösung via `/api/invimg`.
- **~5 Theme-Quellen** statt „einer SSOT" (§10) — Korrektur meiner v1-Aussage „Theme aus motto-data.js" (motto-data.js ist **Spieldaten**).
- **Freitext-Datum/Zeit** im Creator vs. strukturiert im Funnel (§8) — echte Reibung benannt.
- **v1-Scope neu:** von „konsolidieren" zu **konkret**: EIN Backend wählen, EIN Theme-SSOT, Standalone-Creator auf Funnel-Niveau heben, echte Karte bauen (fehlt komplett).

---

## 1. BESTAND: die ECHTE Architektur (zuerst lesen)

### Die zwei parallelen Wege durch das System heute

```
STANDALONE-WEG (SEO/Direktzugriff):
  einladung/erstellen/index.html  ──POST /api/invphoto (Foto→fid)
     (7 Freitext-Felder)          ──POST /.netlify/functions/create-invite ({name,date,time,ort,tel,motto}→slug)
                                  ──▶ Einladungs-Viewer /e/<slug>?fid=…   [Netlify-Backend]

FUNNEL-WEG (Planer):
  kindergeburtstag.html            state{…} in localStorage 'mlplan_v4_state'
   5-Stage-Scroll-Funnel:          Stage1 Motto → Stage2 Alter+Eckdaten →
                                   Stage3 Plan → Stage4 EINLADUNG+PARTYSEITE → Stage5 Fertig
   Stage4 activatePartyseite() ──POST party.machsleicht.de/api/create ({childName,age,motto,…})→{url,editUrl}
                                  ──▶ Partyseite party.machsleicht.de/<id>   [Cloudflare-Worker + KV]

GEMEINSAMER PAYLOAD (Gast-Erlebnis):
  Worker baut gameUrl ──▶ einladung/<motto>/whatsapp/index.html   (Mini-Spiel, 15×, per URL-Params gefüttert)
                                  foto = party.machsleicht.de/api/invimg/<id>  (JPEG-Bytes, löst URL-Limit)
```

### Was existiert (mit Beleg)
| Baustein | Datei | Was es real tut |
|---|---|---|
| **Funnel** | `kindergeburtstag.html` | 5-Stage-Scroll-Funnel; **Stage 4 = „Einladung + Partyseite" (gemergt 15.06.)**; State in `localStorage['mlplan_v4_state']` (`:1334`), debounced autoSave + Resume-Banner |
| **Stage-4-Aktivierung** | `kindergeburtstag.html:2471` | `activatePartyseite()` → POST `party.machsleicht.de/api/create` → `{url, editUrl}` → `showPartyShare()` |
| **Standalone-Creator** | `einladung/erstellen/index.html` | 7 Freitext-Felder → **Netlify `create-invite`** (`:517`) + Foto `/api/invphoto` (`:509`) → Viewer `/e/<slug>` |
| **Worker-Backend** | `party-worker.js` | 14 Routen: `/api/create`, `/api/party/:id` (GET/PUT/DELETE), `/rsvp`, `/wish/:wid/claim`, `/api/invphoto`+`/api/invimg/:id`, `/send-edit-link`, `/go/:p/:w`, `/newsletter-confirm`; KV mit TTL |
| **15 Gast-Spiele** | `einladung/<motto>/whatsapp/index.html` | Mini-Spiel-Viewer, per URL-Params gefüttert (name/date/time/ort/tel/foto); hardcodiertes Motto-Theme; RSVP-Zusage an `rsvpPhone` |
| **15 SEO-Hubs + Vorlagen** | `einladung/<motto>/index.html`, `…/vorlagen/` | Ratgeber-Landing + fertige Einladungs­**texte** (Copy-Quelle) |
| **Plan-Daten** | `data/motto/*.json` | Elite-Plan pro Motto/Alter — enthält bereits Feld **`invitationTemplate`** |
| **Motto-Spiele** | `js/motto-data.js` | **Nur Spieldaten** (7 Mottos), **kein Theme** |

### Die ECHTE Lücke (= der Auftrag)
1. **Zwei Persistenz-Backends** (Netlify `create-invite`/`/e/<slug>` vs. Worker `/api/create`/`:id`) tun dasselbe. **Entscheidung nötig: eins wird kanonisch.** Empfehlung: **Worker** (kann RSVP, Adress-Gating, Wunschliste, Foto-Bytes, DOI, Ablauf-TTL — die Netlify-Funktion kann nichts davon).
2. **~5 Theme-Quellen**, keine SSOT (§10).
3. **Standalone-Creator ist deutlich schwächer als der Funnel:** 1 WhatsApp-Text mit **kaputter Grammatik** (naive Konkatenation, `:572`), keine 3 Varianten, **keine echte Karte**, Freitext-Datum/-Zeit.
4. **Eine echte teilbare „digitale Karte" fehlt in BEIDEN Wegen** — Funnel produziert eine Partyseite, Standalone einen `/e/<slug>`-Link; ein poliertes, WhatsApp-taugliches Karten-Artefakt existiert nirgends.
5. **Keine geteilte Platzhalter-/Grammatik-Engine** — jeder der drei Wege baut Text selbst.

> **Regel für den Umsetzer:** Kein zweiter Creator, kein drittes Backend, keine sechste Theme-Tabelle. v1 = die vorhandenen Wege auf **eine** Engine + **ein** Backend + **einen** Theme-SSOT ziehen, DANN die echte Karte + 3 WhatsApp-Varianten ergänzen.

---

## 2. Die echten Datenverträge (verbatim aus dem Code)

### `state` im Funnel (`kindergeburtstag.html:1335`, localStorage `mlplan_v4_state`)
```js
state = {
  stage, step, _maxStage,                 // Wizard-Position (Stages 1–5)
  motto,                                   // MOTTO-OBJEKT (nicht String)
  age,                                     // AltersGRUPPE: '3-5' | '6-8' | '9-12'
  exactAge,                                // echtes Alter 1–14 (optional, fürs Einladungs-Wording)
  name,                                    // Kindname
  date,                                    // ISO 'YYYY-MM-DD'
  time, endTime,                           // 'HH:MM'
  guests,                                  // int 2–20
  location,                                // 'zuhause' | 'drinnen' | 'park' | 'halle'
  adresse,                                 // optional, Adress-Gating auf Partyseite
  partyMessage,                            // persönliche Nachricht (→ Partyseite)
  games, eliteOff,                         // gewählte / abgewählte Spielnamen
  eliteVariant,                            // 'minimal' | 'standard' | 'wow'
  plan: { key, acts:[…] },                 // generierter Plan (buildPlanActivities)
  invite:   { type:'minispiel', title, body, deadline, sent, photo, whatsapp },   // EXISTIERT SCHON
  partyseite:{ slug, rsvp, photos, wish, chat, active, url, editUrl },             // EXISTIERT SCHON
  ref                                      // virale Attribution
}
// TOT: customEntries, partyseite.photos, partyseite.chat, invite.photo
```

### `POST /api/create` (party-worker.js:300) — der kanonische Erstell-Vertrag
```js
// Request (Pflicht fett):  childName, age, date, time, address,
//   + motto, mottoId, mottoEmoji, mottoColor(#RRGGBB, def #D4812A),
//     endTime, notes, askAllergies(def true), askPickup(def true),
//     paypalMe, photo(≤500KB), photoRound(≤500KB), wishes[≤20], ref
// Response: { url, editUrl }
// KV: party:{id} (+ photo:{id}, invphoto:{id}) — TTL = party.date + 90d (min 1d, max 90d)
```

### `POST /api/party/:id/rsvp` (:451) — Gäste-Vertrag
```js
// Request: name, status('ja'|'nein'|'vielleicht'), allergies, pickupTime, pickupPerson
// ADDRESS-GATING (:472): address + addressIcs NUR wenn status==='ja', sonst '' — serverseitig hart
```

### `gameUrl` (Worker → Gast-Spiel, :1351)
```
https://machsleicht.de/einladung/<mottoId|Textmatch|'piraten'>/whatsapp/
   ?name=…&date=…&time=…&ort=&tel=&foto=https://party.machsleicht.de/api/invimg/<id>
// ort + tel ABSICHTLICH LEER — Adresse nie vor Zusage
```

### Deep-Link-Params in den Funnel (`kindergeburtstag.html:2767`)
`?motto` · `?thema` (von SEO-Seiten) · `?alter` (3–12) · `?gaeste` (2–20) · `?modus=schatzsuche` · `?ref`

### Was der Worker NICHT kann (echte Lücken, mit Beleg)
- **Keine Mitbring-Abfrage** — nur `allergies` + `pickup` im RSVP (`:466`). „Was soll ich mitbringen?" fehlt komplett.
- **Kein konfigurierbares Adress-Visibility-Flag** — Gating ist hart auf `status==='ja'` (`:472`), nicht auf „immer öffentlich/immer privat" stellbar.
- **Standalone-Netlify-Backend kann nichts davon** (kein RSVP, kein Gating, keine Wunschliste).

---

## 3. Strategie & Kernversprechen (kurz)

Marke: schnell, wenig Aufwand, mobil, keine Anmeldehürde, klare Schrittführung. **Kein Canva-Ersatz** — die Maschine übernimmt Design/Struktur/Textlogik/Tonalität/Ausgabe. Eltern geben Daten ein, bekommen ein fertiges Paket.
Versprechen standalone: „Digitale Einladung in 2 Minuten." · im Planer: „Deine Einladung ist schon vorbereitet — Motto, Alter, Datum, Zeit aus deinem Plan übernommen."
Die drei Outputs = ein System: **WhatsApp-Text** (Teilen) · **Karte** (Emotion) · **Party-Embed** (Organisation: Zusage/Allergien/Adresse-nach-Zusage).

---

## 4. Zwei Gesichter, ein Kern

```
   Planer Stage 4 (state{}) ─┐
                             ├─▶ InvitationData (1 Modell) + ThemeConfig (15) + Platzhalter-Engine
   Standalone erstellen/  ───┘        │
                                      ├─▶ WhatsApp-Text (3 Varianten)
                                      ├─▶ Mobile Karte (NEU zu bauen)
                                      └─▶ Party-Embed (Worker /api/create, existiert)
```
Beide Einstiege schreiben in **dasselbe** `InvitationData`; alle Outputs lesen daraus. Ein Backend (Worker). Ein Theme-SSOT.

---

## 5. Tech-Rahmen

- **Vanilla-JS, kein Build-Step** (wie `kindergeburtstag.html`, `erstellen/`). `js/kindergeburtstag.js` (React, tot) nicht anfassen.
- Gemeinsame Logik als **ein Modul** `js/invite-engine.js`, per `<script src>` in Funnel + Standalone eingebunden (Muster wie `core/core.js`), Cache-Bust `?v=`.
- **Ein Backend: der Cloudflare-Worker** (`/api/create` + KV). Netlify `create-invite`/`/e/<slug>` migrieren/deprecaten (kann kein RSVP/Gating/Wunschliste). Standalone-Creator postet künftig an `/api/create` statt an die Netlify-Funktion.
- **Ein Theme-SSOT** (§10): neue Datei `js/theme-config.js` (15 `ThemeConfig`), von Funnel, Standalone, Karten-Output UND den Gast-Spielen gelesen. `js/motto-data.js` bleibt Spieldaten.
- **Reale Constraints (schon gelöst/zu beachten):** Foto NICHT als Base64 in URL — über `/api/invphoto`→`/api/invimg/:id` (JPEG-Bytes), ≤500 KB (`party-worker.js:35`). Adresse-nach-Zusage = serverseitig (Worker `:472`), nicht local. Tracking nur über `plausible()`-Wrapper. Freitext-Datum/-Zeit (Standalone) auf strukturiert normalisieren, damit es mit dem Funnel-State kompatibel wird.

---

## 6. Scope-Schnitt

**v1 — Vereinheitlichung + echte Lückenfüllung:**
- [ ] `js/invite-engine.js`: `InvitationData` · Platzhalter-Engine · Validierung · 3-Varianten-WhatsApp · Karten-Renderer.
- [ ] `js/theme-config.js`: 15 `ThemeConfig` als **einziger** Theme-SSOT; die ~5 Streuquellen darauf umbiegen.
- [ ] **Ein Backend:** Standalone-Creator auf Worker `/api/create` umstellen; Netlify `create-invite` deprecaten (Redirect `/e/<slug>` → Worker-Seite oder beibehalten als Reines-Anzeigen-Alias).
- [ ] Standalone-Creator auf Funnel-Niveau: strukturierte Felder, Grammatik-Engine, 3 WhatsApp-Varianten.
- [ ] **Mobile Karte bauen** (fehlt in beiden Wegen) — teilbares HTML-Artefakt.
- [ ] Funnel-Brücke: Stage 4 nutzt dieselbe Engine für den Einladungstext (heute `state.invite.body` naiv).
- [ ] Party-Embed-Block aus `InvitationData` (Worker existiert).

**v2 — Organisation vertiefen:** Gastname-Personalisierung · **Mitbring-Abfrage** (Worker-RSVP erweitern — fehlt heute) · Wunschliste-UI (Worker kann's schon) · konfigurierbares Adress-Visibility-Flag · Status-Anzeige („3 Zusagen").
**v3 — Reichweite:** Foto-Upload-Politur · Bild-Export (PNG der Karte) · QR-Code · mehrere Gäste einzeln · OG-Link-Vorschau.
**v4 — Retention:** Erinnerungen · Dankesnachricht · Nach-der-Party-Gruß.
**NICHT v1 (bewusste Cuts):** Dev/Admin-JSON-Modus, Tonalitäts-Wähler (widerspricht „keine Entscheidungen"), Foto-Upload-Neubau, Mehrsprachigkeit.

---

## 7. Datenmodell: `InvitationData` = Ableitung der echten `state`-Shape

```js
/** @typedef {Object} InvitationData
 *  // aus state{} (Funnel) ODER erstellen/-Formular (Standalone) — gemappt auf EIN Modell
 *  @property {string}  childName            // state.name
 *  @property {'3-5'|'6-8'|'9-12'} ageGroup  // state.age
 *  @property {number}  [exactAge]           // state.exactAge (fürs Wording „wird 7")
 *  @property {string}  mottoId              // kanonische ID (Theme-Lookup)
 *  @property {string}  date                 // ISO — Standalone-Freitext hierauf normalisieren
 *  @property {string}  startTime,endTime
 *  @property {string}  [address]            // = state.adresse; Gating via Worker
 *  @property {string}  [notes]              // = state.partyMessage
 *  @property {boolean} [askAllergies=true], [askPickup=true]
 *  @property {string}  [rsvpDeadline], [rsvpPhone], [parentName], [wishlistUrl], [giftHint], [costumeHint]
 *  @property {string}  [photoRoundId]       // Worker /api/invimg-ID, NIE base64 in URL
 *  @property {string}  [guestName]          // v2
 *  @property {'planner'|'standalone'} source
 *  @property {string}  [partyId], [editToken]  // nach /api/create
 */
```
`ThemeConfig` (15): `id, label, emoji, mottoColor, headlinePattern, shortIntro, whatsappOpening, ctaLabel, colorTokens{}, iconSet[], toneWords[], avoidWords[], ageAdaptation{'3-5','6-8','9-12'}`.
**Feld-Zuständigkeit:** geteilt+synchron = childName/ageGroup/mottoId/date/Zeiten/address. Nur-Einladung = rsvp/wunschliste/hinweise/foto — **nie in `state.plan`.**

---

## 8. Planer→Einladung-Brücke (existiert als Stage 4 — aufwerten, nicht neu bauen)

Stage 4 sammelt schon Foto (`iPhoto`→`state.invite.photo`), Nachricht (`psMessage`→`state.partyMessage`), Adresse (`psAddress`→`state.adresse`) und postet an `/api/create`. **Aufwerten:**
- `mapStateToInvitationData(state)` statt der heutigen ad-hoc-Felder; Einladungstext aus der geteilten Engine statt `state.invite.body`-Konkatenation.
- Kontext-Anreicherung aus dem Plan (real verfügbar): `state.games[0..2]` als Teaser („mit Walk the Plank…"), Schatzsuche steckt im Plan (`acts` mit `kind:'schatz'`), `location` → outdoor/indoor-Hinweis, `exactAge`/`ageGroup` → Alterston.
- Übergang-Copy: „Der Plan steht. Jetzt fehlt nur noch die Einladung." → sofortige Vorschau → „Motto, Alter, Datum, Zeit übernommen." Keine Doppel-Abfrage.

---

## 9. Theme-SSOT: die ~5 Streuquellen einsammeln

| Heute | Ort | v1-Ziel |
|---|---|---|
| `MOTTO_CONFIG` (emoji/label/color) | `erstellen/:397` | → `theme-config.js` |
| hardcodierte Farben/Emojis je Spiel | `einladung/<motto>/whatsapp/` | → aus `theme-config.js` lesen |
| `mottoColor` pro Party (#D4812A def) | `party-worker.js:320` | Wert kommt aus `theme-config.js` |
| inline `MOTTOS[]` (15) | `kindergeburtstag.html:1194` | Theme-Teil → `theme-config.js` |
| `js/motto-data.js` | — | bleibt **Spieldaten**, kein Theme |

Ein Motto = ein `ThemeConfig`. Ändert sich Piraten-Gold, wird **eine** Zeile angefasst, nicht fünf.

---

## 10. Platzhalter-Engine + Grammatik (Kronjuwel — mit echtem Anlass)

Der Standalone-Creator zeigt heute den Fehler live: `cfg.emoji + ' … zu ' + name + 's ' + cfg.label + '-Geburtstag!'` (`erstellen/:572`) → bei leerem Namen „…zu s -Geburtstag!". Die Engine muss das strukturell verhindern.

Pflicht-Platzhalter: `{childName} {age} {date} {startTime} {endTime} {location} {rsvpDeadline} {rsvpPhone} {parentName} {partyPageUrl} {guestName} {notes} {giftHint} {wishlistUrl} {costumeHint}`.
**Regeln:** fehlt ein Feld → ganzer abhängiger Satz **entfernt** (nie `undefined`, nie leere Klammern). `rsvpDeadline` fehlt → kein Fristsatz. `rsvpPhone` fehlt, `partyPageUrl` da → Zusage über Partyseite. Beides fehlt → „Sag uns bitte kurz Bescheid, ob du dabei bist." Adresse hidden → „Die genaue Adresse bekommt ihr nach der Zusage." (Feld nicht rendern — deckt sich mit Worker-Gating). Deutsches Datum/Zeit. Keine doppelten Leer-/Satzzeichen, kein Leerzeichen vor Satzzeichen.
**Projektlektionen (hart gelernt):** kein `//` mitten in Einzeiler-Funktionen (kommentiert `}` aus → Syntaxfehler; inline `/* */`). Kein globales Lowercasing von Namen (macht „Fall"→„fall").
`validateInvitation()` vor jeder Ausgabe: Pflichtfelder? Datum in Zukunft? Zeiten plausibel? Telefon plausibel? Text zu lang? Leere Platzhalter? Doppelte Zeichen? Adresse sichtbar/versteckt konsistent?

---

## 11. Drei Outputs — abgebildet auf den Bestand

- **WhatsApp-Text (3 Varianten, NEU aus einem Zustand):** A kurz ≤450, B verspielt ≤700, C praktisch ≤700. Heute existiert nur je 1 naiver Text (Standalone + Gast-App). Jede enthält Name/Alter/Datum/Start/Ende/Ort(außer hidden)/Frist/Zusage-Weg. ≤4 Emojis, keine Reime, kein Marketing-Sprech. **Am echten `wa.me`-Deeplink Länge/Encoding testen.**
- **Mobile Karte (NEU — fehlt komplett):** 360–430 px, Desktop zentriert, Theme über CSS-Vars, Tap-Ziele ≥44 px, kein horizontales Scrollen, kein Umbruch bei langen Namen, ohne Foto vollwertig. Hero · Motto-Einstieg · Info-Chips · Hinweise · CTA. Das ist das teilbare Artefakt, das heute niemand hat.
- **Party-Embed (Worker existiert):** kompakter Block über `/api/create`; Zusage/Allergien/Abholung/Adresse-nach-Zusage sind serverseitig da. Wunschliste kann der Worker schon. **Mitbring-Abfrage fehlt → v2 (Worker-RSVP um `bring` erweitern).**

---

## 12. Beispieltexte (Piraten · Dino · Weltraum · Prinzessin)

Je Motto: WhatsApp kurz/verspielt/praktisch · Karten-Headline · Karten-Intro · Party-Embed-Text · Theme-Farben · CTA. **Copy-Quelle = bestehende `einladung/<motto>/vorlagen/`-Seiten + `invitationTemplate` in `data/motto/*.json`** (angleichen, nicht neu erfinden). Alles durch die Grammatik-Engine (leere Felder → Satz fällt weg).

---

## 13. UX & Microcopy

Mobile zuerst · Schnellmodus zuerst sichtbar · „Mehr Optionen" klappt Feinmodus · Sofort-Vorschau · große Buttons · keine Anmeldung vor Ergebnis · jederzeit zurück/bearbeiten. Im Planer: keine erneute Abfrage, Stage 4 fließt aus Stage 3, „zurück zum Plan" jederzeit. Microcopy: „Füll kurz die Eckdaten aus." · „Trag noch ein, wo die Party startet." · „Einladung erstellen." · „Per WhatsApp teilen." · „Kopiert. Du kannst die Einladung jetzt einfügen." · Planer: „Deine Einladung ist schon vorbereitet." **Kein Tonalitäts-Dropdown** (ein Default pro Motto: warm, praktisch, mottospezifisch).

---

## 14. QA & Akzeptanzkriterien

< 2 min zur Einladung · Schnellmodus ohne Zusatz · 3 Outputs aus einem Modell · jedes Motto eigener Look+Sprache · WhatsApp-Texte direkt verschickbar · Karte bei 360 px sauber · **keine leeren Platzhalter/kaputten Sätze** · funktioniert ohne Foto/Wunschliste/Party-Link · kein Account-Zwang · aus dem Planer alles vorausgefüllt, nichts doppelt · Planänderung aktualisiert Einladung, Einladungs-Zusatz ändert den Plan nicht · geteilte Felder synchron · Party-CTA erst nach erstem Nutzen · Standalone bleibt möglich · **kein zweiter Creator, kein zweites Backend, kein sechster Theme-Store** · Adress-Gating bleibt serverseitig erhalten.

---

## 15. Conversion & Datenschutz (mit echtem Backend-Verhalten)

**Conversion:** kein Druck vor Ergebnis; Nutzen sofort; danach Partyseite als **Organisationserleichterung** (nicht Werbung). Im Planer stärker, weil konkreter Plan existiert. Einladung auch ohne Partyseite voll nutzbar.
**Datenschutz (real im Worker):** Party-Daten per KV-TTL = Datum + 90 Tage (auto-Ablauf), Adresse serverseitig erst nach RSVP „ja", DELETE-Endpoint (DSGVO) räumt party/photo/invphoto, Newsletter nur per Double-Opt-In (7-Tage-Token) mit Consent-Audit (3 Jahre). Kinderfotos optional, ≤500 KB, als Bytes über `/api/invimg`. Standard ohne Account (localStorage); Server-Persistenz erst bei aktiver Partyseite.

---

## 16. Risiken & Gegenmaßnahmen

| Risiko | Gegenmaßnahme |
|---|---|
| **Zwei Backends bleiben parallel** | v1 entscheidet: Worker kanonisch, Netlify `create-invite` deprecaten. |
| **Theme-Fragmentierung wächst weiter** | `theme-config.js` als einzige Quelle, die 5 Streustellen darauf umbiegen. |
| **Dritter Creator / Parallel-Wahrheit** | Akzeptanzkriterium hart: refactor vor Neubau. |
| **Tote React-Altlast** | Vanilla-JS, No-Build-Vertrag schützen. |
| **Foto-in-URL-Regression** | `/api/invimg`-Weg beibehalten, nie base64 in Query. |
| **Scope-Explosion** | v1 = Vereinheitlichung + Karte + 3 Varianten; Rest v2+. |
| **Feature bewegt North Star nicht allein** | Dokumentierter Engpass ist Traffic/SEO-Recovery (De-Index-Ereignis); North Star „Partyseite erstellt" ist **unmessen** (Umami nie ausgewertet). Vor großem Ausbau `party_created`/`plan_ready`-Trichter in Umami messen — der Worker feuert die Events bereits. |

---

## 17. Lieferauftrag an den Umsetzer

1. Lies §1–§2. Öffne `kindergeburtstag.html` (Stage 4 + `state`), `einladung/erstellen/`, eine `…/whatsapp/`-App, `party-worker.js`. **Verstehe die zwei Wege, bevor du eine Zeile schreibst.**
2. Entscheide/bestätige: **Worker = kanonisches Backend.**
3. Baue `js/theme-config.js` (15 `ThemeConfig`) + `js/invite-engine.js` (`mapStateToInvitationData` · `resolveTemplate` · `validateInvitation` · `generateWhatsAppTexts` · `generateInvitationCard` · `generatePartyEmbed` · `buildShareUrl`).
4. Hebe Standalone-Creator + Funnel-Stage-4 auf die Engine (kein Neubau daneben); Standalone postet an `/api/create`.
5. Baue die fehlende **Mobile Karte**.
6. QA gegen §14; Grammatik-Engine mit leeren/Teil-Feldern brutal testen; Adress-Gating verifizieren.

**Konkret arbeiten, Entscheidungen treffen. Was zu groß für v1 ist: in §6 benannt und für später eingeplant — v1 nicht damit aufblähen.**
