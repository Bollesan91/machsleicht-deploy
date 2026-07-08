# Brief: Einladungs­maschine machsleicht.de (bestandsbewusste v1)

> Verbesserte Fassung des Ursprungs-Prompts. Ziel unverändert: **eine** Einladungs­maschine mit **zwei Gesichtern** — im Planer „ist schon vorbereitet", standalone „in 2 Minuten fertig" — aus **einem** Datenmodell, **einer** Theme-Logik.
> Was sich ändert: Der Auftrag ist **Konsolidieren + Aufwerten von Vorhandenem**, kein Greenfield-Neubau. Tech an den echten Stack angepasst. v1 auf die reale Lücke gekürzt.

---

## 0. Was an dieser Fassung anders ist (Changelog gegenüber dem Ursprungs-Brief)

1. **Bestand-&-Delta-Vorspann** vorangestellt (§1) — der Ursprungs-Brief tat so, als gäbe es nichts. ~70 % existieren.
2. **Tech korrigiert:** kein React/Next.js. Der Live-Planer ist bewusst statisches HTML + Vanilla-JS **ohne Build-Step**. React würde die tote 3,8-MB-Altlast wiederbeleben oder eine Parallel-Codebasis forken.
3. **v1 rücksichtslos gekürzt:** v1 = die vorhandenen Teile zu **einer** kohärenten Maschine zusammenziehen + die 3 Outputs sauber trennen. Dev-Modus, Tonalitäts-Wähler, Gast-Personalisierung, Foto-Upload → v2+.
4. **Innerer Widerspruch entfernt:** Tonalitäts-Dropdown gestrichen (widerspricht „keine Entscheidungen, keep it simple"). Ein guter Default pro Motto.
5. **Reale Constraints ergänzt** (§4): Foto passt nicht in die URL, „Adresse erst nach Zusage" braucht Worker/KV (nicht local-only), Tracking über `plausible()`-Wrapper.
6. **Traffic-Realität benannt** (§16): Dieses Feature bewegt den North Star nicht allein — der dokumentierte Engpass ist Traffic/SEO-Recovery.

---

## 1. BESTAND & DELTA (zuerst lesen — hier wird gebaut, nicht neu erfunden)

### Was heute schon existiert
| Baustein | Datei(en) | Zustand |
|---|---|---|
| **Standalone-Creator** | `einladung/erstellen/index.html` (~587 Z.) | Motto-Auswahl + WhatsApp-Output + Karten-Preview. **Das ist der „Standalone-Generator" aus dem Brief — er existiert.** |
| **15 SEO-Hubs** | `einladung/<motto>/index.html` | Ratgeber-/Landing-Seiten je Motto (piraten ~253 Z.) |
| **15 Vorlagen-Seiten** | `einladung/<motto>/vorlagen/index.html` | Fertige Einladungs­**texte** je Motto (SEO + Copy-Quelle) |
| **15 WhatsApp-Apps** | `einladung/<motto>/whatsapp/index.html` | „<Motto>-Einladung erstellen" mit `wa.me`-Share (Z. ~1437) + eingebettetem Mini-Spiel als Hook |
| **Planer-Funnel** | `kindergeburtstag.html` + `js/motto-data.js` | Der Live-Planer (Wizard). Hat bereits einen Einladungs-Schritt. **SSOT für Motto-Daten = `js/motto-data.js`, kein Build-Step.** |
| **Party-Backend** | `party-worker.js` (Cloudflare Worker + KV) | Kann `RSVP`, `claim`, `photoRound`, `gameUrl`. Adresse-nach-Zusage-Logik hier verortet. |
| **SEO-Textseite** | `kindergeburtstag-einladung-text.html` (~689 Z.) | Einladungstext-Beispiele (Traffic-Anker) |
| **45 Mini-Spiele** | `_dev/prototypes/game-*.html` + `core/core.js` | Foto-Reveal-Spiele = der virale Payload der WhatsApp-Einladung |

### Die ECHTE Lücke (= der Auftrag)
Es gibt **kein einheitliches System**. Standalone-Creator, WhatsApp-Apps und Planer-Einladungsschritt sind **drei separat gewachsene Implementierungen** mit je eigener Text-/Theme-/Feldlogik. Es fehlt:

1. **Eine gemeinsame Datenschicht** (`InvitationData`) + **eine** Theme-Config + **eine** Platzhalter-Engine, die alle drei Einstiege speisen. Heute driftet die Copy zwischen den Kanälen auseinander.
2. **Saubere Abgrenzung der 3 Outputs** (WhatsApp-Text ≠ Karte ≠ Party-Embed) aus demselben Zustand.
3. **Die Planer→Einladung-Datenbrücke** ohne Doppel-Abfrage (heute fühlt sich der Einladungs-Schritt wie ein neues Formular an).
4. **Grammatik-sichere Textlogik** (keine `undefined`-Sätze, keine leeren Platzhalter) — als geteilte Engine, nicht 3× nachgebaut.

> **Regel für den Umsetzer:** Jede neue Zeile ersetzt oder speist Vorhandenes. Wer einen zweiten Standalone-Creator neben `einladung/erstellen/` baut, hat den Auftrag verfehlt. Erst refactoren die drei Bestandsteile auf die gemeinsame Engine, dann erweitern.

---

## 2. Produktstrategie & Kernversprechen (unverändert stark — behalten)

**Marke:** schnelle Ergebnisse, wenig Aufwand, mobil zuerst, keine Anmeldehürde, klare Schrittführung. **Kein Canva-Ersatz** — die Maschine übernimmt Design, Struktur, Textlogik, Motto-Tonalität, Ausgabeformat. Eltern gestalten **nicht**, sie geben Daten ein und bekommen ein fertiges Paket.

**Versprechen standalone:** „Digitale Einladung in 2 Minuten. Motto wählen, Daten eintragen — WhatsApp-Text, Karte und Partyseite bekommen."
**Versprechen im Planer:** „Deine Einladung ist schon vorbereitet. Motto, Alter, Datum und Zeit haben wir aus deinem Plan übernommen."

**Die drei Outputs sind ein System, keine Designvarianten:**
- **WhatsApp-Text** → schnelles Teilen zwischen Eltern.
- **Digitale Karte** → emotionale, mobile Präsentation.
- **Party-Embed** → Organisation: Zusage, Allergien, Wunschliste, Adresse-nach-Zusage.

Die Einladung ist der **Einstieg in den ganzen Party-Flow**, nicht ein Einzeltool.

---

## 3. Die eine Architektur-Regel: zwei Gesichter, ein Kern

```
                    ┌─────────────────────────────┐
   Planer-Funnel ──▶│                             │──▶ Output: WhatsApp-Text (3 Varianten)
 (Daten übernehmen) │   InvitationData (1 Modell) │──▶ Output: Mobile Karte (HTML/CSS)
                    │   + ThemeConfig (15)        │──▶ Output: Party-Embed (Worker)
   Standalone    ──▶│   + Platzhalter-Engine      │
 (Daten abfragen)   │                             │
                    └─────────────────────────────┘
```

**Nicht verhandelbar:** beide Einstiege schreiben in **dasselbe** `InvitationData`; alle Outputs lesen daraus. Kein kanalspezifischer Text-Sonderweg mehr.

---

## 4. Tech-Rahmen (KORRIGIERT — das ist der teuerste Fix)

**Stack = der Bestand:**
- **Statisches HTML + Vanilla-JS, kein Build-Step.** So läuft `kindergeburtstag.html` und `einladung/erstellen/`. `js/kindergeburtstag.js` (React, 3,8 MB) ist **tot** — nicht anfassen, nicht wiederbeleben.
- Gemeinsame Logik als **ein JS-Modul** (z. B. `js/invite-engine.js`), das von allen drei Einstiegen per `<script src>` eingebunden wird — dasselbe Muster wie `core/core.js` bei den Spielen. Cache-Bust-Versionierung (`?v=YYYYMMDD`) beibehalten.
- **Theme-Tokens** als CSS-Variablen; Motto-Daten aus/synchron mit `js/motto-data.js` (SSOT). Keine zweite Motto-Wahrheit anlegen.
- **Persistenz nur bei Partyseite:** `party-worker.js` + KV. Lokal (localStorage) für Entwurf/Vorschau ohne Account.
- **Share:** `navigator.share` (Web Share API) mit `wa.me`-Deeplink-Fallback (existiert schon in den whatsapp-Apps); Clipboard API zum Kopieren.
- **Tracking ausschließlich über den `plausible(name, {props})`-Wrapper** (mappt intern auf Umami) — nie direkt `umami.track`.

**Reale Constraints, die der Ursprungs-Brief nicht kennt:**
1. **Foto passt NICHT in die URL.** base64 sprengt die iframe/Deeplink-URL (bekannter, gefixter Bug). `photoUrl` heißt: Worker-Upload oder gar-nicht-in-v1. Karte muss **ohne Foto** vollwertig aussehen.
2. **„Adresse erst nach Zusage" ist server-seitig.** Erfordert Worker + KV (Adresse erst nach RSVP ausliefern), **nicht** local-only. Der Brief verkauft es fälschlich als lokale Option.
3. **WhatsApp-Textlänge am echten Deeplink verifizieren** (Zeichen-Limits/Encoding), nicht nur theoretisch 450/700.

**Wenn irgendwann ein Build-Step nötig wird:** isoliert halten, den No-Build-Vertrag von `kindergeburtstag.html` **nicht** brechen.

---

## 5. Scope-Schnitt (was v1 ist — und was bewusst wartet)

**v1 — die Konsolidierung (der eigentliche Wert):**
- [ ] Gemeinsame Engine: `InvitationData` + `ThemeConfig` (15) + Platzhalter-Engine + Validierung.
- [ ] `einladung/erstellen/` auf die Engine heben (Standalone, Schnellmodus 7 Pflichtfelder).
- [ ] Die 15 `whatsapp/`-Apps auf die Engine heben (statt 15 Einzel-Logiken).
- [ ] Planer→Einladung-Brücke: `mapPlannerDataToInvitationData`, keine Doppel-Abfrage, Einladung sofort sichtbar.
- [ ] 3 saubere Outputs: WhatsApp-Text (3 Varianten), Mobile Karte, Party-Embed-Block.
- [ ] Grammatik-sichere Texte (keine leeren Platzhalter/kaputten Sätze) — als geteilte Engine.
- [ ] Party-Embed nutzt den bestehenden `party-worker.js` (RSVP/claim/photoRound).
- [ ] Feinmodus als **einfacher** „Mehr Optionen"-Aufklapp (keine Pflicht).

**v2 — Organisation vertiefen:**
Gastname-Personalisierung · Adresse-nach-Zusage (Worker) · Wunschliste · Allergien-Abfrage · Planer-Zustand server-speichern · Antwort-Status („3 Zusagen").

**v3 — Reichweite/Politur:**
Foto-Upload · Bild-Export (PNG) · QR-Code · mehrere Gäste einzeln personalisieren · Link-Vorschau (OG).

**v4 — Retention:**
Erinnerungen · Dankesnachricht · Nach-der-Party-Gruß · Mini-Spiel als Einladungs-Hook fest verdrahten.

**Explizit NICHT in v1** (bewusste Cuts): Dev/Admin-JSON-Modus, Tonalitäts-Wähler, Foto-Upload, Bild-Export, Mehrsprachigkeit. Alle sauber in v2+ eingeplant, keiner blockiert v1.

---

## 6. Datenmodell (aus dem Brief — gut, an Vanilla-JS angepasst als JSDoc-Shapes)

```js
/**
 * @typedef {Object} PlannerEventData   // kommt aus kindergeburtstag.html / motto-data.js
 * @property {string}  theme
 * @property {string}  childName
 * @property {number}  age
 * @property {'3-4'|'5-6'|'7-10'} ageGroup
 * @property {string}  date            // ISO
 * @property {string}  startTime       // "15:00"
 * @property {string}  endTime
 * @property {number}  [guestCount]
 * @property {'zuhause'|'park'|'halle'|'restaurant'|'sonstiges'} [locationType]
 * @property {string}  [locationLabel]
 * @property {string[]}[selectedGames]
 * @property {string}  [mainActivity]
 * @property {boolean} [treasureHuntEnabled]
 * @property {boolean} [indoorOutdoor]  // true = outdoor
 */

/**
 * @typedef {PlannerEventData & Object} InvitationData
 * @property {string}  id
 * @property {'start'|'end'|'pickup'} timeMode
 * @property {string}  [location]
 * @property {'visible'|'hidden'} locationVisibility
 * @property {string}  [rsvpDeadline]
 * @property {string}  [rsvpPhone]
 * @property {string}  [parentName]
 * @property {string}  [notes]
 * @property {boolean} [askAllergies]
 * @property {boolean} [askPickup]
 * @property {string}  [costumeHint]
 * @property {boolean} [dirtyClothesOk]
 * @property {string}  [giftHint]
 * @property {string}  [wishlistUrl]
 * @property {string}  [partyPageUrl]
 * @property {string}  [photoUrl]       // v3 (Worker-Upload) — v1: leer
 * @property {string}  [guestName]      // v2
 * @property {string}  createdAt
 * @property {'planner'|'standalone'} source
 */

/**
 * @typedef {Object} ThemeConfig
 * @property {string}  id, label, emoji, symbol
 * @property {string}  headlinePattern     // "{childName}s {label}-Party"
 * @property {string}  shortIntro          // Karten-Einstiegssatz
 * @property {string}  whatsappOpening
 * @property {string}  ctaLabel
 * @property {Object}  colorTokens         // CSS-Var-Werte
 * @property {string}  backgroundPattern
 * @property {string[]}iconSet, toneWords, avoidWords
 * @property {Object}  ageAdaptation       // 3-4 / 5-6 / 7-10 → Sprach-Overrides
 */
```

**Feld-Zuständigkeit (Akzeptanzkriterium):** Geteilt & synchron = theme/childName/age/date/Zeiten/Ort. Nur-Einladung/Partyseite = RSVP/Wunschliste/Allergien/Hinweise/Foto. **Diese gehören NIE in den Tagesplan.** Planänderung aktualisiert die Einladung; Einladungs-Zusatzfelder ändern den Plan nicht.

---

## 7. Planer→Einladung-Brücke (der Funnel-Kern)

`mapPlannerDataToInvitationData(planner)` → vorausgefüllte `InvitationData`, Felder als `prefilled: true` markiert. Übergang-Copy: **„Der Plan steht. Jetzt fehlt nur noch die Einladung."** → sofort sichtbare Vorschau → „Wir haben Motto, Alter, Datum und Zeit übernommen." Nur echte Lücken werden abgefragt, nie Vorhandenes. Kontext-Anreicherung aus Planer-Daten (Beispiele): Schatzsuche aktiv → „Nach Kuchen wartet eine kleine Schatzsuche."; outdoor → „Wir feiern draußen — wetterfeste Kleidung."; Alter 3–5 → „Sagt bitte kurz, wer abholt."

---

## 8. Theme-Modell (15 Mottos — Struktur aus dem Brief behalten)

Pro Motto: Theme-ID · Anzeigename · Emoji · Farbwelt · Muster · Icon-Ideen · typische Wörter · **Tabu-Wörter** · Headline-Muster · WhatsApp-Einstieg · Karten-Einstieg · CTA · Hinweissprache. **Quelle = `js/motto-data.js`** (nur ergänzen/erweitern, keine Zweitwahrheit). Mottos: Piraten, Dino, Einhorn, Safari, Weltraum, Feuerwehr, Detektiv, Meerjungfrau, Dschungel, Feen, Pferde, Ritter, Baustelle, Prinzessin, Superheld. **Wichtig quer über alle:** Motto-Sprache verständlich halten, nicht übertreiben (kein Vollzeit-Piratensprech), maskulines Framing = unisex-ok, aber Ansprache nicht auf ein Geschlecht verengen.

---

## 9. Platzhalter-Engine + Grammatik-Regeln (das Kronjuwel — mit echten Bug-Lektionen)

Diese Engine verhindert genau die Fehlerklasse, die machsleicht in den Spielen einzeln jagen musste. **Härteste Anforderung im ganzen Projekt.**

Pflicht-Platzhalter: `{childName} {age} {date} {startTime} {endTime} {location} {locationVisibility} {rsvpDeadline} {rsvpPhone} {parentName} {partyPageUrl} {guestName} {notes} {giftHint} {wishlistUrl} {costumeHint} {dirtyClothesHint} {allergyQuestion}`

**Regeln:**
- Fehlt ein Feld → der ganze abhängige Satz wird **entfernt**, nie „bis undefined". (Real erlebt: `bis undefined`, leere Klammern.)
- `rsvpDeadline` fehlt → kein Fristsatz. `rsvpPhone` fehlt aber `partyPageUrl` da → Zusage über Partyseite. Beides fehlt → neutral: „Sag uns bitte kurz Bescheid, ob du dabei bist."
- `locationVisibility = hidden` → „Die genaue Adresse bekommt ihr nach der Zusage." (Adress-Feld wird NICHT gerendert.)
- `guestName` da → persönliche Ansprache („Hallo Mia, …").
- Deutsches Datums-/Zeitformat. Keine `undefined`/`null`, keine leeren Klammern, **keine doppelten Leerzeichen, kein Leerzeichen vor Satzzeichen, keine doppelten Satzzeichen.**
- **Achtung Kommentar-Bug (Projektlektion):** Einzeiler-Funktionen + `//` mitten in der Zeile kommentieren den Rest inkl. `}` aus → Syntaxfehler. Inline nur `/* */`.
- **Achtung Case-Bug:** `guestName`/`childName` nicht global lowercasen (macht aus „Fall" → „fall"). Nur gezielt normalisieren.

`validateInvitation()` läuft **vor** jeder Ausgabe: Pflichtfelder da? Sätze vollständig? Zeiten plausibel? Datum in Zukunft? Telefon plausibel? Text zu lang? Leere Platzhalter übrig? Doppelte Leer-/Satzzeichen? Ort sichtbar oder bewusst versteckt?

---

## 10. Die drei Outputs — präzise abgegrenzt

**Output 1 · WhatsApp-Text (3 Varianten aus einem Zustand):**
- **A Kurz** ≤ 450 Zeichen, direkt verschickbar, keine Ausschmückung.
- **B Verspielt** ≤ 700, mit Motto-Einstieg, kindlich aber nicht peinlich.
- **C Praktisch** ≤ 700, klare Infos + Zusage + Hinweise/Allergien/Kleidung/Wunschliste.
- Jede enthält: Name, Alter, Datum, Start, Ende/Abholung, Ort (außer hidden), Frist (falls da), Zusage-Kontakt/Party-Link.
- Regeln: keine kaputten Platzhalter, ≤ 4 Emojis, keine peinlichen Reime, kein Marketing-Sprech, kein Motto-übergreifend gleicher Generik-Text.

**Output 2 · Mobile Karte (HTML/CSS):** Mobile-first 360–430 px, Desktop zentriert, keine externen Bild-Pflichtabhängigkeiten, Theme über CSS-Variablen, Tap-Ziele ≥ 44 px, **kein horizontales Scrollen, kein abgeschnittener Text bei langen Namen.** Aufbau: Hero (Symbol + Headline) · Motto-Einstieg · Info-Chips (Datum/Zeit/Ort/Frist) · Hinweise · CTA (Partyseite / WhatsApp-Zusage / Link kopieren) · Foto-Bereich optional (v3; ohne Foto genauso hochwertig via Motto-Illustration).

**Output 3 · Party-Embed (Worker):** kompakter emotionaler Block oben auf der Partyseite; überleitet in Zusage/Adresse/Mitbringen/Allergien/Wunschliste/Ablauf/Mini-Spiel. Nutzt `party-worker.js`. Status optional („3 Zusagen", „Antwort bis 12. März") = v2.

---

## 11. Beispieltexte (Piraten · Dino · Weltraum · Prinzessin)

Je Motto liefern: WhatsApp kurz / verspielt / praktisch · Karten-Headline · Karten-Intro · Party-Embed-Text · Theme-Farben · CTA. **Copy-Quelle = die bestehenden `einladung/<motto>/vorlagen/`-Seiten** (nicht neu erfinden, angleichen). Beispiel Piraten-kurz (Muster): „Ahoi! {childName} wird {age} und lädt dich zur Piraten-Party ein. 🏴‍☠️ {date}, {startTime}–{endTime}, {location}. Sag bis {rsvpDeadline} kurz Bescheid!" — mit voller Grammatik-Engine (fehlt `rsvpDeadline`, fällt der letzte Satz weg).

---

## 12. UX & Microcopy

Mobile zuerst · Schnellmodus immer zuerst sichtbar · „Mehr Optionen" klappt Feinmodus auf · Sofort-Vorschau (Mobile: Karte direkt unterm Formular; Desktop: rechts) · große Buttons · einfache Sprache · keine Anmeldung vor Ergebnis · jederzeit zurück/bearbeiten. **Im Planer: keine erneute Abfrage, keine Flow-Unterbrechung, Einladung sofort da, „zurück zum Plan" jederzeit.**
Microcopy: „Füll kurz die Eckdaten aus." · „Trag noch ein, wo die Party startet." · „Einladung erstellen." · „Per WhatsApp teilen." · „Mehr Optionen." · „Kopiert. Du kannst die Einladung jetzt einfügen." · Planer: „Deine Einladung ist schon vorbereitet."
**Gestrichen ggü. Brief:** Tonalitäts-Wähler (Choice-Overload). Ein Default pro Motto: warm, praktisch, mottospezifisch — nicht albern.

---

## 13. QA & Akzeptanzkriterien (aus dem Brief — konkret & testbar, behalten)

Elternteil erstellt Einladung in < 2 min · Schnellmodus ohne Zusatzoptionen · 3 Outputs aus einem Datenmodell · jedes Motto eigener Look + Sprache · WhatsApp-Texte direkt verschickbar · Karte bei 360 px sauber · **keine leeren Platzhalter, keine kaputten Satzteile** · Optionalfelder intelligent eingebaut/entfernt · funktioniert ohne Foto/Wunschliste/Party-Link · kein Account-Zwang · Datenschutz verständlich · **aus dem Planer sind alle vorhandenen Daten vorausgefüllt, nichts wird doppelt abgefragt** · Planänderung aktualisiert Einladung · Einladungs-Zusatz ändert den Plan nicht · geteilte Felder synchron · Party-CTA erst nach erstem sichtbaren Nutzen · Standalone bleibt möglich · Maschine fühlt sich wie Maschine an, nicht wie Formular · **kein zweiter Parallel-Creator neben `einladung/erstellen/`.**

---

## 14. Conversion & Datenschutz

**Conversion:** vor Ergebnis kein Druck; während Ergebnis sofort Nutzen; nach Ergebnis Partyseite als **Organisationserleichterung** (nicht Werbung): „Noch einfacher mit einer Partyseite: dort sammeln deine Gäste Zusagen, Allergien und Geschenkideen." Im Planer ist der CTA stärker, weil ein konkreter Plan existiert. Einladung muss **auch ohne** Partyseite voll nutzbar sein.
**Datenschutz:** Standard lokal, kein Account, keine Speicherung ohne aktive Entscheidung. Erst bei Partyseite → Worker-Speicherung + teilbarer Link + Löschmöglichkeit. **Kinderfotos nur optional + sensibel + erklärt.** Adresse optional versteckt (server-seitig, s. §4).

---

## 15. Landingpage-Positionierung (Standalone)

Headline: „Digitale Kindergeburtstags-Einladung in 2 Minuten." · Sub: „Motto wählen, Daten eintragen, per WhatsApp verschicken." · CTA: „Einladung erstellen." · plus SEO-Title / Meta-Description / OG-Text. Im Planer: „Deine Einladung ist schon vorbereitet." / „Wir haben Motto, Alter, Datum und Zeit übernommen — direkt teilen oder Details ergänzen."

---

## 16. Kritische Risiken & Gegenmaßnahmen

| Risiko | Gegenmaßnahme |
|---|---|
| **Parallel-Wahrheit** (zweiter Creator neben `einladung/erstellen/`) | v1 = Refactor der 3 Bestandsteile auf **eine** Engine, erst dann erweitern. Akzeptanzkriterium hart. |
| **Tote React-Altlast wiederbeleben** | Vanilla-JS-Modul (`invite-engine.js`), No-Build-Vertrag von `kindergeburtstag.html` schützen. `js/kindergeburtstag.js` nicht anfassen. |
| **Scope-Explosion** | v1 auf Konsolidierung + 3 Outputs begrenzt; Dev-Modus/Tone/Foto/Export nach v2+. |
| **Foto-in-URL-Bug** | Karte ohne Foto vollwertig; Foto erst v3 über Worker-Upload. |
| **„Adresse nach Zusage" als local-only missverstanden** | Server-seitig über Worker/KV spezifiziert (§4). |
| **Feature bewegt North Star nicht allein** | **Ehrlich benennen:** dokumentierter Engpass ist Traffic/SEO-Recovery (De-Index-Ereignis), North Star „Partyseite erstellt" ist **unmessen**. Vor großem Ausbau erst Umami-Baseline dieses Schritts messen, sonst optimiert man einen Schritt, den kaum jemand erreicht. |

---

## 17. Lieferauftrag an den Umsetzer

1. Lies §1. Öffne `einladung/erstellen/`, eine `einladung/<motto>/whatsapp/`-App, den Einladungs-Schritt in `kindergeburtstag.html`, `party-worker.js`. **Verstehe den Bestand vor der ersten Zeile.**
2. Baue `invite-engine.js`: `InvitationData` · 15 `ThemeConfig` (aus `motto-data.js`) · `resolveTemplate` · `validateInvitation` · `generateWhatsAppTexts` · `generateInvitationCard` · `generatePartyEmbed` · `mapPlannerDataToInvitationData` · `buildShareUrl` · `syncInvitationWithPlanner`.
3. Hebe die 3 Bestandsteile auf die Engine (kein Neubau daneben).
4. Verdrahte die Planer-Brücke ohne Doppel-Abfrage.
5. QA gegen §13. Grammatik-Engine mit leeren/Teil-Feldern brutal testen.

**Arbeite konkret, triff Entscheidungen. Was zu groß für v1 ist: benannt in §5, sauber für später eingeplant — aber v1 nicht damit aufblähen.**
