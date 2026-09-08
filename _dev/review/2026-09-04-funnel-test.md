# Funnel-Test 04.09.2026 — live auf `main` (Stand `44abaf3e`)

**Auftrag:** explizite Funnel-Test-Session (Bolle). Gemessen wurde am ausgelieferten
Produkt, mobil (375×812), als frischer Nutzer ohne Konto — nicht am Repo-Stand.

**Testweg:** SEO-freier Direkteinstieg `/kindergeburtstag` → Motto → Alter/Eckdaten →
Einladung → **echte Partyseite erzeugt** → Gastseite → Zusage → viraler Loop → Plan →
Editor-Rückkehr → Einladungsspiel → Paket.

**Testartefakt (lebt):** `https://party.machsleicht.de/jkcqb4mcbrg4` — Kind „Mia", 7,
Piraten, 26.09.2026, Gastgeber „Familie Testlauf – Bolle", ein Gast („Lina Testkind",
zugesagt). Verwaltungs-Link liegt in dieser Datei nicht (Token). Die Party löscht sich
14 Tage nach dem Partydatum selbst. **Eine echte Verwaltungs-Mail ging an
`christian.bollweg@advergy.de`.**

---

## Stand nach beiden Runden (Kurzfassung)

**Hauptbefund ist nicht F1, sondern K1** (s. Runde 2): *„Der sichtbare Text verspricht etwas,
das keine Maschine tut"* — **vier** Fundstellen, von zwei Sessions unabhängig gefunden
(Magic-Link-Modal · 7-Tage-Erinnerung ohne Cron · Loop-CTA „+ kompletter Plan" · „Ruhemodus"
in FAQ/JSON-LD). Der schwerste Fall sammelt eine **Einwilligung** für eine Gegenleistung ein,
die es nicht gibt.

**Telemetrie-Score dieser Konversation: 62/100** — Handwerk stark (Funktion 85,
Datenschutz 85, Plan 80), Funnel undicht (Versprechenstreue 40, Wachstum/Loop 15,
Schlankheit 50, Design-Kohärenz 45). Nur innerhalb dieses Chats vergleichbar, entscheidet nie.

**Schlank-These in einem Satz:** Der Funnel ist nicht zu groß, er ist **zu früh** — 19 Felder,
von denen 3 nötig sind, und jedes optionale davon kann der Editor später nachpflegen
(`party-worker.js:2791-2798`).

**Arbeitsteilung:** diese Datei ist der EINE Ort (Bolle, 04.09.). `machsleicht-7b` (Prüfstand)
ist Haupt-Testinstanz und liefert Inhalte zu, die ich hier einpflege; Belege bleiben hier,
die Entscheidungsvorlage geht von dort an Bolle. Kein zweites Dokument.

**⚓ Anker für alle Zeilenangaben: Commit `2fd73ab3`** (Stand bei der Messung am 04.09.).
Seit dem 06.09. wird im selben Arbeitsbaum repariert — `kindergeburtstag.html`,
`party-worker.js`, `AUDIT.md` und 169 HTML-Dateien haben sich verschoben. Wer eine Fundstelle
nachschlägt, nimmt `git show 2fd73ab3:<datei>`, nicht das Arbeitsverzeichnis. (Stichprobe
06.09.: 7 von 8 meiner Zeilenangaben treffen am Anker exakt, eine war ein Off-by-one und ist
korrigiert.) Das ist R-C, angewandt auf den eigenen Bericht.

**Nachschlagen, nicht rechnen.** Der Versatz ist nicht konstant: jeder Eingriff erzeugt eine
eigene Zone (am 06.09. gemessen: +0 oberhalb, +7 in der Mitte, +17 unten — beide Sessions
unabhängig, acht bzw. fünf Stichproben, deckungsgleich). Wer einen einheitlichen Versatz
aufaddiert, landet im mittleren Bereich zehn Zeilen daneben — und zehn Zeilen daneben sieht in
einer 3.400-Zeilen-Datei noch plausibel aus. Die Zonen werden hier bewusst **nicht** als
Tabelle geführt: die nächste Reparatur macht eine vierte, und dann wäre die Tabelle der
nächste Beleg, der danebenzeigt. Aus demselben Grund wird **nicht umnummeriert** — der Anker
überlebt jeden Fix, jede nachgezogene Zahl nicht.

**Nummern-Zuordnung zur Befundseite des Prüfstands:** 01 Bestellweg · 02 7-Tage-Erinnerung ·
03 Magic-Link-Modal (= F9) · 04 Google Fonts (= F13) · 05 Loop-CTA (= F1) · 06 Ruhemodus ·
**07 Einladungs-Typ (= F5)** · 08 Foto-Finale · 09 paypalMe · 10 Wunschliste ·
11 Genitiv (= F10) · 12 Planer-Schriften (= Rest von F11) · 13 tote JS-Module ·
14 Tracker-Functions · 15 `.netlifyignore` (= F14) · 16 AUDIT.md · 17 Doku-Widersprüche ·
18–21 Einfachheit (= Ideen-Abschnitt).

---

## Befunde

| # | Schwere | Befund | Beleg |
|---|---|---|---|
| F1 | **MAJOR** | Der virale Loop führt am Funnel vorbei **und** verliert die Attribution | s.u. |
| F2 | **MAJOR (Copy)** | Geteilte Einladung nennt ein benanntes Kind mit falschem Possessivpronomen | live gemessen |
| F3 | MINOR | Deutsche Zahlen mit englischem Dezimalpunkt am Delight-Peak | live gemessen |
| F4 | MINOR | Ortshinweis des Gastgebers erreicht die Einladung nicht | live gemessen |
| F5 | MINOR (latent) | Unerreichbare Einladungs-Varianten mit hartcodiertem Ort | Code + erzwungener Render |
| F6 | MINOR | Spiel-Shell trägt im Echt-Modus die „Erstellen"-Metadaten | live gemessen |
| F7 | MINOR | Unvollständiger Verwaltungs-Link fällt still auf die Gästeansicht zurück | selbst erlebt |
| F8 | Beobachtung | Paket-Kopfzeile nennt ein anderes Zeitfenster als der gedruckte Plan | live gemessen |

---

### F1 — MAJOR: der Loop führt am Funnel vorbei und verliert die Attribution

Die Gästeseite trägt unten den einzigen K-Event des Produkts („Gast wird Host"):

    Planst du auch bald einen Geburtstag?
    Erstelle so eine Partyseite + den kompletten Plan — kostenlos, in 10 Minuten, ohne Anmeldung.
    [ Eigene Partyseite erstellen → ]   →  https://party.machsleicht.de/?ref=jkcqb4mcbrg4

Drei Messungen, jede einzeln nachgestellt:

1. **Das Ziel liefert keinen Plan.** Die ausgelieferte Creator-Seite (67.892 Bytes,
   `curl` auf `party.machsleicht.de/?ref=…`) enthält das Wort „Plan" **genau einmal —
   als „Planeten"**. Sie verlinkt den Planer nirgends: die einzigen Links auf
   `machsleicht.de` sind Logo, Impressum, Datenschutz. Der CTA verspricht „+ den
   kompletten Plan".
2. **Der Ref-Token stirbt beim Aufschlag.** Die Creator-Seite liest `?ref=` nicht
   (`get('ref')` / `params.ref` / `?ref=` = **0 Treffer** im ausgelieferten HTML; sie
   liest `URLSearchParams` dreimal, aber nur für `mottoColor` und `mottoId`). Der Worker
   hat das Feld: `party-worker.js:405` `ref: /^[a-z0-9]{6,12}$/.test(...) ? body.ref : null`.
   Über diesen Weg wird also **immer `null` gespeichert**.
3. **Der Planer könnte es — er wird nur nicht angesteuert.** `kindergeburtstag.html:3396`
   liest `?ref=` mit derselben Regex wie der Worker, `:3005` schickt es bei `/api/create`
   mit, `:3018` trackt `party_created {referred:'1'|'0'}`.

Dazu: der in `FUNNEL-KONZEPT.md:145` spezifizierte Klick-Zähler `loop_cta_click` kommt in
`party-worker.js` **0×** vor — auch der Klick auf den Loop-CTA ist unsichtbar.

**Vorgeschichte:** am 11.08. schon einmal gesehen und als „ref-Viralität zweifach
gebrochen" notiert (`SESSION-NOTES.md:1429`, Tribunal zum PAKET-DATENFLUSS) — der Punkt
ist nie in `BACKLOG-AUDIT.md` gelandet (dort 0 Treffer) und seither offen.

**Fix:** eine Zeile in `party-worker.js:2247` — Ziel auf
`https://machsleicht.de/kindergeburtstag?ref=${id}` (dort ist READ + SEND + Tracking
bereits gebaut). Optional zweite Zeile: `loop_cta_click`. Danach zeigt das Versprechen
„+ kompletter Plan" auf etwas, das einen Plan liefert.

### F2 — MAJOR (Copy): falsches Possessivpronomen für ein benanntes Kind

Die geteilte Einladung — WhatsApp **und** Mail, wörtlich aus dem Live-Planer entnommen:

    🏴‍☠️ Ahoi, kleiner Pirat!
    Mia wird 7 und feiert seinen Geburtstag als Piraten-Captain. Du bist Teil seiner Crew!

**Klasse gemessen:** von 15 Motto-Vorlagen tragen **2** ein Possessiv, das auf das Kind
zeigt — Piraten („seinen … seiner") und Weltraum („braucht Crew für **seine**
Weltraum-Mission"). Die anderen 13 sind pronomenfrei gebaut („wird 7 — komm mit auf große
Safari"). Ein Geschlechtsfeld existiert im Planer nicht (`gender|geschlecht|maedchen|junge`
= 0 Treffer), das Namensfeld schlägt selbst „z.B. **Mia**" vor.

Das ist **nicht** der Gender-Neutral-Zwang aus `OFFENE-REVIEW-PUNKTE` (dort: generisches
Framing wie „der Held/sein" — bleibt). Hier zeigt das Pronomen auf ein konkretes Kind,
dessen Namen der Gastgeber gerade eingetippt hat, auf dem Artefakt, das alle Gäste
bekommen. Fix = zwei Zeilen umformulieren, kein Sweep. **Copy-Entscheid Bolle.**

### F3 — MINOR: deutsche Zahlen mit englischem Dezimalpunkt

Live im Plan (Delight-Peak), bei 8 Gästen:

    🛒 Einkaufsliste · ca. 59 € · 7.4 €/Kind · 8 Kinder
    2.0 l Saftschorle

Quellen: `kindergeburtstag.html:2015` `perChild: Math.round(sum/guests*10)/10` und
`:1783` `(state.guests*0.25).toFixed(1)`.

**Klasse:** im ganzen Repo gibt es **keinen** Locale-Formatierer (`Intl.NumberFormat`,
`toLocaleString('de'` = 0 Treffer). Dieselbe Klasse steckt im Worker beim
Gemeinschaftsgeschenk: `collected+'€'` und `'Noch offen: '+remaining+'€'`
(`party-worker.js:2508/2516`) — dort **nicht live gemessen** (die Testparty hatte keine
Wunschliste), also als Code-Beleg geführt, nicht als Fund.

**Stufe daraus — ZURÜCKGEZOGEN (s. Korrekturtabelle Runde 2).** Mein erster Vorschlag war,
eine gerenderte `\d+\.\d+` vor `€`/` l`/` kg` im ausgelieferten Text zu verbieten. Das ist
nicht baubar: die Zahlen entstehen zur Laufzeit im Browser, im ausgelieferten HTML steht
keine einzige davon — die Stufe wäre dauerhaft grün. Sie muss am **Aufrufort** ansetzen
(`toFixed(`-Ergebnis, das vor eine Einheit gehängt wird) oder über einen echten Render-Pfad
laufen. Gefunden von `machsleicht-7b`.

### F4 — MINOR: der Ortshinweis des Gastgebers erreicht die Einladung nicht

Der Gastgeber tippt „Bei uns zuhause in Hamburg-Winterhude". Partyseite und
Einladungsspiel bekommen genau diesen Satz. Die WhatsApp-/Mail-Einladung druckt
stattdessen die Kategorie: `📍 zuhause` (bei Park: `📍 im Park`) —
`locationLabel()` in `kindergeburtstag.html:2142`, verwendet in `:2464`.

### F5 — MINOR (latent): unerreichbare Einladungs-Varianten mit hartcodiertem Ort

`kindergeburtstag.html:2442` (Karte) und `:2455` (Print) drucken fest `📍 Bei uns zuhause` —
unabhängig vom gewählten Ort. Erzwungener Render mit `state.location='park'` zeigt
weiterhin „Bei uns zuhause". *(Korrektur 06.09.: ich hatte zuerst `:2441` notiert — ein
Off-by-one, an `2fd73ab3` nachgezählt. Im Arbeitsstand vom 06.09. sind es `:2459` und `:2472`,
weil dieselbe Datei parallel repariert wird — s. Anker-Hinweis im Kopf.)*

**Der Zweig ist nicht nur unerreichbar, er ist auch falsch** (Zuarbeit `machsleicht-7b`): er
druckt „Bei uns zuhause" fest, während der Gastgeber seinen echten Grobort in `areaHint`
eingetragen hat (Feld `:848`, Platzhalter „z.B. Bei uns zuhause in Hamburg-Winterhude",
State `:1405`). Wer die Umschalt-Knöpfe nachbaut, ohne das zu bemerken, schaltet ein Feature
frei, das die Eingabe des Nutzers ignoriert.

**Aktuell folgenlos:** der Umschalter ist aus der Live-Seite verschwunden
(`.invite-type-btn` = 0, `[data-itype]` = 0, `setInviteType(` kommt genau 1× vor — die
Definition). Beide Zweige sind toter Code. Wer den Umschalter zurückbringt, liefert den
Fehler mit aus.

### F6 — MINOR: Spiel-Shell trägt im Echt-Modus die „Erstellen"-Metadaten

`/einladung/piraten/whatsapp/?name=Mia&date=…` rendert korrekt „Die Piratenschatzsuche
von Mia", trägt aber Titel „**Piraten-Einladung erstellen** — machsleicht.de" und
Description „Erstelle eine Piraten-Einladung …". `noindex` ist gesetzt, SEO also
unbetroffen — Tab-Titel und Link-Vorschau sehen eingeladene Eltern trotzdem.

### F7 — MINOR: unvollständiger Verwaltungs-Link fällt still auf die Gästeansicht zurück

Selbst erlebt: mit einem um 15 Zeichen gekürzten Token (der Link ist 95 Zeichen lang —
Mail-Zeilenumbruch ist der reale Fall) liefert der Worker die **Gästeansicht mit
Namens-Tor**, ohne Hinweis. Der Gastgeber sieht sein eigenes Tor und keine Erklärung.
Eine Meldung „Dein Verwaltungs-Link ist unvollständig" verrät nichts über die Party.

### F8 — Beobachtung: zwei Zeitfenster auf Seite 1 des Pakets

Kopfzeile: „Basis: **14:00–17:00** · an deine Zeiten angepasst" — der gedruckte Plan
darunter läuft **14:00–16:30** (die Zeiten der Party). „Basis" meint die Alters-Vorlage;
gelesen wird die erste Zahl.

---

## Was getragen hat (gemessen, nicht vermutet)

- **Aktivierung:** Pflichtfelder greifen sauber — Toast (`role=alert`, fixed, top 88),
  Fokus auf das fehlende Feld, rote Kante. Ohne Gastgeber-Name, ohne E-Mail, ohne Datum
  entsteht keine Party.
- **Adress-Gating:** vor der Zusage nur „Bei uns zuhause in Hamburg-Winterhude" + Begründung;
  nach der Zusage erscheint „Teststraße 1, 22299 Hamburg" mit Maps-Link.
- **Quittung:** „Wir freuen uns auf euch! Lina Testkind ist dabei! Deine Antwort liegt jetzt
  bei Familie Testlauf – Bolle in der Gästeliste."
- **Editor-Rückkehr:** Zusage angekommen, Status 1/0/0, Countdown 22 Tage,
  Sichtbarkeits-Labels („sehen die Gäste" / „erst nach Zusage") korrekt.
- **Wow-Latte (`FUNNEL-KONZEPT.md` §4a): 5/5** — „Mia's Piraten-Geburtstag" als Titel,
  echte Zeiten (14:00/14:15/14:25…), Motto-Spiele (Flaschenpost, Knotenkunde,
  Seeungeheuer), konkrete Kosten pro Kind, Spiel-Teaser als Überraschung.
- **WhatsApp-Text:** „Sa., 26.09.2026" — Wochentag nachgerechnet, stimmt.
- **Spiel bekommt Grobort, nicht die Adresse** (`ort=Bei uns zuhause in Hamburg-Winterhude`,
  keine Straße, keine Telefonnummer).
- **Namens-Tor im Seitentitel** ist bekannt und als dekorativ dokumentiert — kein Fund
  (`OFFENE-REVIEW-PUNKTE`, Runde 9).

## Grenzen dieser Messung (was NICHT geprüft ist)

- **Der Browser-Pane war ausgeblendet.** Echte Taps liefen in den Timeout; gearbeitet wurde
  mit Hit-Test (`elementFromPoint`) + echtem DOM-Event. Damit sind **nicht** gemessen:
  Scroll-Verhalten (`scrollIntoView({behavior:'smooth'})` läuft im versteckten Pane nicht),
  visuelle Darstellung, echter Spiel-Durchlauf.
- **Mail-Zustellung ungeprüft** — ms365 ist in dieser Session nicht eingeloggt. Offen:
  kam die Verwaltungs-Mail an, mit welchem Absender, wie sieht sie aus.
- **Kein zweiter Motto-Durchlauf**, keine Custom-Motto-Strecke, keine Wunschliste, keine
  persönlichen Einladungen, kein Studio-Autopilot.

## Zwei eigene Messfehler (damit sie niemand nachbaut)

1. **Token gekürzt:** eine Projektion auf 70 Zeichen schnitt den 48-stelligen edit-Token ab;
   der Aufruf landete auf der Gästeansicht. Kurzzeitig als „Gastgeber trifft auf das
   Namens-Tor" notiert — falsch. Der echte Fund daraus ist F7 (die stille Rückfallebene).
2. **Falscher Tab:** ein `javascript_tool`-Aufruf ohne `tabId` traf den Planer statt der
   Gästeseite. Seitdem wird jede Messung explizit adressiert.

---

# Runde 2 — Linse „schmaler, einfacher, Design" (04.09.2026, nachmittags)

**Auftrag Bolle:** „gehe das gleiche nochmal mit ner anderen Linse durch und gucke auch die
Admin- und Gästeseite an … gerne auch auf Design achten. Mir wäre wichtig rauszufinden ob das
alles schmaler und einfacher geht."

**Methode:** 7 parallele Blickwinkel als Kandidaten-Lieferanten (Workflow `wf_51bd68a6-42c`,
56 Messungen, 29 Ideen). **Der Gegenleser-Agent ist am Session-Limit gestorben** — es gibt also
keine maschinelle Gegenprüfung dieser Kandidaten. Stattdessen: (a) ich habe jede tragende Zahl
selbst nachgemessen, (b) `machsleicht-7b` (Prüfstand) hat sechs meiner Behauptungen unabhängig
geprüft und **zwei davon korrigiert**. Was ich nicht selbst gemessen habe, steht unten
ausdrücklich als **KANDIDAT (ungeprüft)**.

**Testartefakt weiterhin:** `party.machsleicht.de/jkcqb4mcbrg4` (Zugangsdaten lokal in `.tp3`,
gitignored wie `.testpartys`/`.tp2`).

## Korrekturen an meinen eigenen Zwischenzahlen

| Meine Behauptung | Korrektur | Quelle |
|---|---|---|
| „Adresse erst nach Zusage" steht 3× | **2×, beide wortgleich** — mein dritter Treffer war ein anderer Satz („Straße und Hausnummer sind nicht öffentlich"), mein Muster suchte drei Varianten gleichzeitig | Prüfstand, von mir nachgezählt |
| „ohne Anmeldung/kein Konto" 6× | **5×** | Prüfstand |
| 15 Vertrauens-Sätze / 247 Wörter / 9 % | **12 Blöcke / 365 Wörter** (DOM-Blöcke statt Satz-Split; der Satz-Split hatte Dubletten erzeugt) | eigene Neumessung |
| Linter-Stufe „gerenderte Dezimalzahl vor €/l/kg" | **Nicht baubar als Textsuche.** Die Zahlen entstehen zur Laufzeit im Browser — live steht auf `/kindergeburtstag` kein einziger solcher Treffer. Die Stufe wäre dauerhaft grün und prüfte nichts (L40: Form eingehalten, Zweck verfehlt). Ein naives Muster trifft zudem Datumsangaben (13.07 10×, 31.07 9×). Baubar nur am **Aufrufort** (`toFixed(`-Ergebnis vor einer Einheit) oder über einen echten Render-Pfad wie Stufe 60. | Prüfstand |
| F5 „0 `[data-itype]` im DOM" | **Schärfer:** `data-itype` existiert **im ganzen Repo nicht**. `kindergeburtstag.html:2374` liest `b.dataset.itype` — die Bedingung kann nie wahr werden. Trotzdem werden 6 CSS-Regeln für `.invite-type-btn` auf jeder Seite ausgeliefert. **Kein Fall für Stufe 66** (die misst Generator-Skripte ohne Aufrufer); eigene Klasse: *Renderpfad, den nichts erreichen kann, mit einer Nutzeraussage darin*. | Prüfstand |
| F1 Loop-Bruch | **HÄLT**, unabhängig gegengeprüft: kein zweiter Pfad. Creator liest weder Query (`get('ref')` 0) noch `document.referrer` (0) noch Cookie (0); der Worker liest keinen Referer-Header. `body.ref` (`:405`) ist der einzige Leser und wird nur vom Planer bedient. | Prüfstand |

## Neue Befunde Runde 2 (alle von mir selbst gemessen)

### F9 — MAJOR: „💾 Später" sammelt E-Mails mit einem Versprechen, das der Code nicht hält

Das Modal sagt wörtlich (`kindergeburtstag.html:1219`):

> „Wir schicken dir einen Link, mit dem du den Plan jederzeit weiterbearbeiten kannst — auch
> von einem anderen Gerät."

Der Code (`:3190-3192`) POSTet ausschließlich auf `/api/waitlist` mit `product:'magiclink'` und
meldet danach: „wir sagen dir per E-Mail Bescheid, **sobald der Link-Versand live ist**". Der
Nutzer gibt seine Adresse für einen Link her, den es nicht gibt; die Wahrheit erfährt er erst
NACH dem Absenden. Der Knopf steht im Header ab dem ersten Bildschirm, wo es noch nichts zu
sichern gibt.

**F9 ist kein Einzelfall — es ist der Hauptbefund des Tages, s. K1 unten.**

*Korrektur zur Begründung (von `machsleicht-7b` selbst gemeldet, von mir nachgeprüft):* eine
`wrangler.toml` **existiert sehr wohl** (369 Bytes, seit 10.06., versioniert) — sie hat nur
keinen `[triggers]`-Block (`grep -c triggers` = 0, Inhalt: name, main, compatibility_date,
keep_vars, `[observability]`, ein KV-Binding). Der Befund „keine Maschine verschickt diese
Mail" bleibt gültig, die ursprüngliche Begründung war falsch.

### F10 — MINOR, trifft jeden Wiederkehrer: „Dein's Piraten-Plan"

Live reproduziert (localStorage mit leerem Namen, Reload):

> 👋 Du hattest schon angefangen: **Dein's Piraten-Plan** · zuletzt bearbeitet vor 1 h

`:1504-1505` — `const _nm = saved.name || 'Dein'`, dann `${_nm}'s ...`.

**Größer als zuerst gemeldet** (gefunden von `machsleicht-7b`, von mir nachgerechnet): Zeile
1505 ist die **einzige handgetippte Possessiv-Stelle des Planers**. Der passende Helfer steht
drei Bildschirme tiefer in derselben Datei und im selben Scope — `poss()` in `:2278`, benutzt
in `:1790` und `:2281`, und **Stufe 18 prüft ihn bereits** gegen `paket/core/paket-core.js`
(dieselbe Funktion nochmal in `party-worker.js:221` und `:1666`). Was das für echte Namen
bedeutet, ausgeführt statt vermutet:

| Name | `poss()` (Bolles Regel) | Zeile 1505 (handgetippt) |
|---|---|---|
| Mia | Mia’s | Mia's |
| **Mats** | **Mats’** | **Mats's** ✗ |
| **Max** | **Max’** | **Max's** ✗ |
| **Lars** | **Lars’** | **Lars's** ✗ |
| *(leer)* | — | **Dein's** ✗ |

Also: jedes Kind mit Zischlaut-Endung bekommt die Form, die Bolles dokumentierte Regel
ausdrücklich ausschließt. Dazu ein drittes Detail: `poss()` setzt das typografische `’`
(U+2019), Zeile 1505 den ASCII-`'`.

**Der Fix ist NICHT einzeilig.** `poss('Dein')` ergäbe „Dein’s" — der Default ist der
eigentliche Defekt, ein Pronomen darf gar keinen Genitiv bekommen. Also: `poss()` für echte
Namen, und für den namenlosen Fall ein Satz ohne Possessiv.

**Klasse (V5-R1): „Possessiv handgetippt, obwohl `poss()` existiert."** Mechanisierbar;
Stufe 18 ist der natürliche Ort, weil sie diese Funktion schon kennt.

### F11 — Design: drei Schriftsysteme, drei Hintergründe auf einem Weg

`getComputedStyle` nach `document.fonts.ready`, drei Navigationen, selbst gemessen:

| Fläche | H1 | Fließtext | Hintergrund |
|---|---|---|---|
| Planer `machsleicht.de/kindergeburtstag` | **"Lilita One", cursive** | Nunito, system-ui, sans-serif | `rgb(255,248,240)` |
| Gastseite `party/<id>` | **"Baloo 2", "Comic Sans MS", cursive** | "DM Sans", system-ui, sans-serif | `rgb(234,240,246)` |
| Editor `party/<id>?edit=` | **Fraunces, Georgia, serif** | "DM Sans", system-ui, sans-serif | `rgb(255,252,247)` |

Quellen: `guestPageFull` (`party-worker.js:1979`) vs. `baseHead` (`:1238`) vs. Planer-`<style>`.
Distinkte Hex-Farben: Planer 100, Worker 124.

**F11 GRÖSSTENTEILS ZURÜCKGEZOGEN — meine Messung stimmte, meine Deutung nicht.**
Der Unterschied Gast ↔ Editor ist **dokumentierte Absicht**, kein Drift (gefunden von
`machsleicht-7b`, von mir an der Quelle nachgelesen):

- `SESSION-NOTES.md:2946` — „Gebaut (7 Bausteine, **nur guestPageFull — Editor bleibt
  nuechtern**): Baloo 2 statt Fraunces …"
- `SESSION-NOTES.md:2942` — die Welle davor: „kindliche Display-Font (Baloo 2/Fredoka)"
- `_dev/docs/PAKET-DATENFLUSS.md:278` — „Gastseite = Baloo 2, Creator/Editor/404 = Fraunces.
  Kein toter Font."

Die Trennung ist also gewollt: verspielt fürs Kind, nüchtern fürs Eltern-Werkzeug.
**Was als MINOR bleibt:** der **Planer** (Nunito + Lilita One) steht in keinem dieser
Dokumente — ein drittes Schriftsystem, das nie beschlossen wurde.

### F13 — Self-Hosting einmal gebaut, auf 170 Seiten nie angewandt

Fiel bei der Schriftprüfung ab und ist schwerer als F11 (Fund `machsleicht-7b`, Zahlen und
Live-Abrufe von mir nachgemessen):

| Messung | Wert |
|---|---|
| Ausgelieferte HTML-Seiten mit Google-Fonts-Abruf | **170** |
| Angeforderte Familien | DM Sans **180×** · Fraunces **167×** · Nunito 7× · Lilita One 7× |
| Worker (`party.machsleicht.de`) | **0** Google-Fonts-Referenzen — hostet `@font-face` selbst (`party-worker.js:1234`) |
| `party.machsleicht.de/fonts/dmsans.woff2` | **200**, 36.932 B, `font/woff2` |

Die Hauptseite holt also 167–180× von Google genau die zwei Familien, die das eigene Produkt
nebenan selbst ausliefert. Dazu: `datenschutz.html` erklärt den Transfer („Beim Aufruf einer
Seite lädt dein Browser die benötigten Fonts direkt von Google-Servern … Dabei wird deine
IP-Adresse an Google übermittelt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO") — **und
lädt in Zeile 20–22 selbst Google Fonts**, live bestätigt. Der Abfluss ist damit nicht
verschwiegen; der wunde Punkt ist die Rechtsgrundlage, weil dasselbe Repo beweist, dass
Self-Hosting für genau diese Schriften funktioniert. **Keine juristische Bewertung von mir —
Faktenlage für Bolle.**

**Aufwands-Korrektur (mein Einwand gegen die Ersteinschätzung):** der Fix ist **nicht** „Link
gegen `@font-face` auf vorhandene Dateien tauschen". Die woff2 liegen in `_dev/fonts/`, und
`_dev/` steht in `.netlifyignore` — live gegengeprüft: `machsleicht.de/fonts/dmsans.woff2`
liefert **404**, während `party.machsleicht.de/fonts/dmsans.woff2` **200** liefert (der Worker
zieht sie aus KV, s. `PAKET-DATENFLUSS.md:278` „KV-Keys `font:baloo2|dmsans|fraunces`").
Die Dateien müssen also erst auf die Netlify-Seite gelangen (aus `_dev/` heraus oder
`.netlifyignore` anpassen), danach erst der Link-Tausch. `git ls-files | grep .woff2` findet
ausschließlich die drei Dateien unter `_dev/fonts/`. Für Nunito/Lilita One (je 7 Seiten) gibt
es zusätzlich noch gar keine lokale Datei — die sieben Seiten könnte man alternativ auf die
zwei vorhandenen Familien ziehen, statt zwei weitere zu beschaffen.

**Beide Sessions haben diese Korrektur unabhängig voneinander gemessen** (gleiche 404/200-Probe,
gleiche Schlussfolgerung) — die erste, zu billige Aufwandsschätzung stammte von
`machsleicht-7b` und wurde von dort selbst zurückgezogen. Realistisch: **eine eigene Session
mit Gate** (drei Schritte: Dateien an einen publizierten Pfad, `<link>` → `@font-face` in ~170
Dateien skriptgesteuert, Live-Verify). Der teure Teil ist erledigt — die Schriften sind
bereits subsettet und im Repo.

**Das ist K1 eine Ebene höher:** ein Text behauptet etwas, das die Maschine daneben widerlegt.

**Stand 06.09.: zu 169/170 erledigt, aber NICHT geschlossen.** `machsleicht-7b` hat den Sweep
gefahren — 169 Dateien, 506 entfernte Google-Zeilen (169 css2 + 168 + 169 preconnect, die Summe
geht exakt auf), Schriften aus `_dev/fonts/` an einen ausgelieferten Pfad verschoben. **Übrig
bleibt genau eine Seite: `kindergeburtstag.html`** — ausgerechnet das Kernprodukt, weil es als
einzige Lilita One + Nunito nutzt und diese zwei Dateien nicht im Repo liegen. Drei Wege,
Entscheid Bolle:
1. **Beschaffen und selbst hosten** — zwei neue woff2, Frage vollständig geschlossen
   (Empfehlung beider Sessions; das Herunterladen von Dateien aus dem Netz ist eine Aktion, die
   Bolle freigeben muss — keine Session tut das von allein).
2. **Auf DM Sans + Fraunces ziehen** — null neue Dateien, aber der Planer sieht danach anders
   aus. Design-Entscheidung, keine Aufräumarbeit.
3. **So lassen** — dann bleibt der Google-Abruf auf genau der Seite, die das Produkt ist.

Solange Weg 3 gilt, bleibt die Datenschutz-Frage aus diesem Befund formal offen.

### F12 — Der Alt-Creator ist der einzige Newsletter-Fang des Produkts

`newsletter` kommt im Worker **23×** vor (Creator-Formular, DOI-Flow), im Planer **1×** — und das
ist der Satz „kein Newsletter, keine Werbung". Wer den Alt-Creator stilllegt, ohne vorher das
Opt-in in den Planer zu portieren, schaltet die Newsletter-Gewinnung auf null.

### K1 — HAUPTBEFUND: „Der sichtbare Text verspricht etwas, das keine Maschine tut"

Aus der Zusammenlegung meiner Befunde mit denen von `machsleicht-7b` entsteht keine Sammlung
von Einzelfehlern, sondern **eine Klasse mit vier Fundstellen**. Beide Sessions sind unabhängig
voneinander in dieselbe Wand gelaufen:

| # | Versprechen im sichtbaren Text | Was die Maschine tut | Quelle |
|---|---|---|---|
| 1 | „Wir schicken dir einen Link, mit dem du den Plan jederzeit weiterbearbeiten kannst" | POST auf `/api/waitlist`, kein Versand | F9, ich |
| 2 | „Erinnerung 7 Tage vor der Party" (3 Stellen, u. a. direkt an der Opt-in-Checkbox) | kein Cron: `scheduled\|cron\|[triggers]` im Worker = 0, `wrangler.toml` ohne `[triggers]` | `machsleicht-7b` |
| 3 | „Erstelle so eine Partyseite **+ den kompletten Plan**" | Ziel liefert keinen Plan (Wort „Plan" dort 1×, als „Planeten") | F1, ich |
| 4 | FAQ + JSON-LD bewerben einen „Ruhemodus" | existiert nicht, kein Toggle (2 Fundstellen) | `machsleicht-7b` |

Nr. 2 ist dabei der schwerste Fall, weil dort eine **Einwilligung** gegen eine Gegenleistung
eingesammelt wird, die es nicht gibt.

**Vorschlag `machsleicht-7b`: Stufe 72 — Versprechen-Register.** Jede Zusage im ausgelieferten
Text bekommt eine Nachweis-Spalte („welche Maschine löst das ein?"); ohne Nachweis wird das
Gate rot. Das ist grep-bar und trifft genau die Klasse, die heute zweimal unabhängig gefunden
wurde. **Entscheid Bolle**, ob die Stufe gebaut wird.

### F14 — Das gesamte Repo liegt auf dem CDN; was es unerreichbar macht, testet niemand

Fiel bei der Ursachensuche zu F13 ab. **Dieser Befund hat drei Korrekturrunden gebraucht** —
er ist das Lehrstück des Tages und steht deshalb mit allen Fehlleistungen drin:
ich schrieb zuerst, `_dev/` sei wegen `.netlifyignore` nicht ausgeliefert (falsche Ursache);
`machsleicht-7b` schrieb, `_redirects` mache „die ganze Arbeit" (richtig, aber an 6 statt 11
Dateien belegt — inzwischen nachgeholt, 11/11); dann meldete ich zwei angeblich ungeschützte
Dateien, die in Wahrheit gar nicht versioniert sind (s.u.). Der tragende Teil hat alle drei
Runden überlebt.

**Ausgangspunkt:** `netlify.toml` → `[build] publish = "."`. Damit liegt **jede versionierte
Datei physisch auf dem CDN**; unerreichbar wird sie nur durch Guard-Zeilen (`/pfad
/404.html 404!`) in `_redirects`.

**Deckungsgrad der beiden Listen, ausgezählt** (versionierte Root-Dateien ohne
Unterstrich-Präfix, ohne Web-Assets — 20 Stück, `robots.txt` ausgenommen):

| Liste | deckt ab |
|---|---|
| `_redirects` | **20 von 20** |
| `.netlifyignore` | **9 von 20** |

`.netlifyignore` ist also nicht nur redundant, sondern **unvollständig**: elf Dateien stehen
nur in `_redirects` — darunter `STRATEGIE.md`, `FUNNEL-KONZEPT.md`, `OFFENE-REVIEW-PUNKTE.md`,
`OPEN-DECISIONS.md`, `ARCHITECTURE.md`, `TASKS.md`, `netlify.toml`, `wrangler.toml`. Wer
`.netlifyignore` für das Inventar „das darf nicht öffentlich" hält, arbeitet mit der falschen
Liste. Live-Gegenprobe an dreien: `SESSION-NOTES.md`, `STRATEGIE.md`, `FUNNEL-KONZEPT.md` →
alle **404**. Die Sicherung trägt heute, sie ist nur ungetestet.

**ZURÜCKGEZOGEN — mein „dritter Mechanismus" war ein Phantom.** Ich hatte `_pruef.js`
(170 KB) und `_vorschau_test.html` (316 KB) als Dateien gemeldet, die in keiner der beiden
Listen stehen und trotzdem 404 liefern — und daraus auf eine undokumentierte
Netlify-Konvention geschlossen. Falsch:

    git ls-files --error-unmatch _pruef.js           -> NICHT versioniert
    git ls-files --error-unmatch _vorschau_test.html -> NICHT versioniert
    .gitignore:27-28                                 -> beide eingetragen

Netlify deployt aus Git; die beiden Dateien liegen nur auf der lokalen Platte und waren nie
im Deploy. Ihr 404 sagt über keinen Schutzmechanismus etwas aus. **Mein Messfehler:** ich habe
in einer zweiten Schleife Dateinamen hart eingetippt und nur die `_redirects`-Deckung geprüft,
ohne zu fragen, ob die Datei überhaupt versioniert ist — während meine erste Schleife
(`git ls-files`) sie völlig korrekt nie aufgeführt hatte.

**Die Lehre stand längst im Repo**, wörtlich im Docstring von Stufe 71
(`_dev/scripts/check-vorschaubilder.py:12`): *„GEMESSEN WIRD DER VERSIONIERTE STAND, nicht das
Arbeitsverzeichnis"* — dieselbe Klasse wie beim prinzessin-Paket, das lokal existierte und in
`.gitignore` stand. Die Maschine kannte den Fehler; ich bin trotzdem hineingelaufen, weil ich
live gemessen habe statt versioniert.

**Was ohne das Phantom stehen bleibt — und das ist der tragende Teil:** elf versionierte
Root-Dokumente hängen allein an `_redirects`, darunter `STRATEGIE.md` und
`OFFENE-REVIEW-PUNKTE.md`. Der Befund braucht die beiden Phantom-Dateien nicht.

**Stufen-Kandidat 74** (Entwurf `machsleicht-7b`, zwei Zusätze aus dieser Runde):
jede Datei, die nicht öffentlich sein darf, braucht einen `_redirects`-Guard, mit Live-Probe
als Gegenprobe. Dazu:
1. **Die Liste wird abgeleitet, nicht gepflegt** (alles Versionierte, das kein Web-Asset ist,
   gegen die Guard-Zeilen) — sonst prüft die Stufe genau die Liste, die schon einmal elf
   Einträge verloren hat, und zementiert die Lücke statt sie zu finden. Das ist V5-R4.
2. **Sie fragt `git ls-files`, nicht das Dateisystem** — sonst meldet sie eines Tages eine
   untracked Datei als ungeschützt und schickt jemanden auf die Jagd nach einem Phantom.
   Genau das ist hier gerade passiert.

**Nebenwirkung auf F13:** weil `publish = "."` gilt, liegen die woff2 bereits im Deploy — sie
sind weggeleitet, nicht ausgeschlossen. Der Asset-Teil des Schrift-Umzugs ist damit ein
`git mv` an einen ausgelieferten Pfad, keine Beschaffung; der Aufwand steckt allein in den
~170 `<link>`-Tauschen. (Dritte und belegte Fassung dieser Kostenzeile — die ersten beiden
waren zu billig und zu teuer.)

## Die Wortlast, gemessen

| Fläche | sichtbare Wörter | Emoji | Emoji/100 W |
|---|---|---|---|
| Planer (ganze Seite, alle Stages) | 2.855 | 77 | 2,7 |
| Gastseite | 234 | 27 | **11,5** |
| Alt-Creator | 461 | 35 | 7,6 |

Eingabefelder: **stage2 = 6**, **stage4 = 13** (9 sichtbar vor dem Aktivieren-Knopf),
Editor-Formular = 11. Echte Pflicht bei der Aktivierung: **3** (Gastgeber-Name, E-Mail, Datum).
Also **19 Felder auf dem Hauptweg, 3 davon nötig.**

**Vertrauens-/Datenschutztext nach dem Kriterium des Prüfstands** („streichbar ist, was nicht an
einem Feld hängt"): 12 Blöcke, 365 Wörter — davon **5 am Feld** (verdient, Welle-3-Lehre) und
**7 freistehend mit 136 Wörtern**. Allein „kostenlos · ohne Anmeldung" steht 3× frei auf
derselben Seite.

**Motto-Grid mobil (375×812, live):** 1 Spalte, 16 Karten à 148 px = **2.578 px Grid = 3,2
Bildschirmhöhen**, nur 2 Karten gleichzeitig voll sichtbar. Ursache: `minmax(180px,1fr)` bei
347 px nutzbarer Breite. Alle 15 Motto-Karten tragen dieselbe Alterszeile „3–12 Jahre" (1
einziger Wert).

## Ideen — nach Hebel pro Aufwand

**Legende:** ✅ = von mir selbst gemessen · ⚪ = Kandidat aus der Fächerung, **ungeprüft**
(der Gegenleser starb; vor Umsetzung selbst verifizieren).

### Sofort (Minuten, kein Produktentscheid)

| # | Idee | Beleg |
|---|---|---|
| S1 ✅ | **Possessiv an `poss()` übergeben** (`:1505`) — echte Namen über den vorhandenen Helfer, namenloser Fall ohne Possessiv. Nicht einzeilig: `poss('Dein')` gäbe „Dein’s". Heilt zugleich „Mats's/Max's/Lars's". | F10 |
| S2 ✅ | **Loop-CTA auf den Planer umhängen** (`party-worker.js:2247` → `machsleicht.de/kindergeburtstag?ref=${id}`). **Beide Sessions empfehlen das jetzt einvernehmlich** — `machsleicht-7b` hatte zuerst für die kleinere Heilung (Creator liest `?ref`) plädiert und ist nach eigener Messung umgeschwenkt: der Planer erfüllt **beide** Hälften des Versprechens, weil er die Partyseite selbst anlegt (`kindergeburtstag.html:3009` POST `/api/create`) **und** den Plan liefert, `ref` bereits validiert liest (`:3396`), mitschickt (`:3005`) und die Attribution trackt (`:3018`). Umhängen ist damit nicht die teurere Option, sondern die einzige, die den Satz wahr macht. Die Creator-Variante bleibt als Alternative auf dem Tisch (kleinerer Eingriff, lässt aber das Plan-Versprechen gebrochen) — **Entscheid Bolle**. | F1, K1 |
| S3 ✅ | **„3–12 Jahre" von allen 15 Motto-Karten streichen** (identischer Wert, ~20 px pro Karte, 15× oranger Versalien-Störer) — Spanne einmal in die Kopfzeile. | eigene Messung |
| S4 ✅ | **Pronomen in 2 von 15 Einladungstexten** (Piraten, Weltraum) pronomenfrei formulieren — wie die anderen 13 es schon sind. | F2 |

### Klein (1–2 Stunden)

| # | Idee | Beleg |
|---|---|---|
| M1 ✅ | **Motto-Grid mobil zweispaltig** — eine CSS-Zeile im bestehenden ≤768px-Block. Halbiert 3,2 Bildschirmhöhen auf ~1,6. | eigene Messung |
| M2 ✅ | **„💾 Später" aus dem Ersteinstieg nehmen**, bis der Link-Versand existiert — oder die Modal-Copy auf die Wahrheit ziehen („Wir merken dich vor"). | F9 |
| M3 ✅ | **7 freistehende Vertrauens-Blöcke auf 2 eindampfen** (136 Wörter), die 5 feldgebundenen unangetastet lassen. „kostenlos · ohne Anmeldung" 3× → 1×. | eigene Messung |
| M4 ✅ | **Doppelte Privacy-Passage in stage4 zusammenziehen** — „Ohne Gästeliste heißt das …" steht wortgleich 2× (`:849`, `:853`) an zwei aufeinanderfolgenden Feldern. Ein gemeinsamer Block für Grobort + Adresse. | `grep -c` = 2 |
| M5 ✅ | **GEKIPPT am 06.09.: markieren statt löschen.** Ursprünglich „toten Einladungs-Zweig entfernen". `machsleicht-7b` fand Preis-Etiketten im Zweig — das ist kein toter Code, sondern ein **unfertiges Bezahl-Feature**. Also: als unerreichbar markieren, Entscheidung bei Bolle. **Bedingung, falls die Knöpfe je zurückkommen:** zwingend `areaHint` einsetzen, sonst ignoriert das Feature die Eingabe des Nutzers. | F5 |

### Mittel (halbe bis ganze Session, Copy-Entscheid Bolle)

| # | Idee | Beleg |
|---|---|---|
| G1 ⚪ | **stage4-Minimalpfad:** 5 optionale Felder (Nachricht, Telefon, Grobort, Adresse, Crew) hinter einen Aufklapper „Mehr anpassen — geht auch später über deinen Verwaltungs-Link". Trägt, weil ✅ **jedes** dieser Felder im Editor nachpflegbar ist (`party-worker.js:2791-2798` PUT-Body: childName, age, motto, date, time, endTime, address, hostName, hostPhone, areaHint, notes). | Feldliste ✅, Wortzahl ⚪ |
| G2 ⚪ | **Crew-Block ganz in den Editor** (größter Einzelblock, 1.509 Zeichen Markup mit 4 Begleitabsätzen) — beim Erstdurchlauf nie nötig. | ⚪ |
| G3 ⚪ | **Alters-Doppelabfrage zusammenlegen:** Gruppen-Karten + „Genaues Alter" fragen dasselbe zweimal; die Ableitung Zahl→Gruppe existiert bereits (`:1434-1436`). Laut Linse sendet der Pfad „nur Gruppe getippt" `age=''` und der Worker rendert „feiert Geburtstag!" ohne Alter — **nicht nachgestellt**, wäre aber der stärkste Teil. | ⚪ |
| G4 ⚪ | **Plan im Lese-Modus starten**, Bearbeiten-Chrome (▲▼×, 26×26 px, unter Touch-Norm) hinter einen Toggle „Plan anpassen". | ⚪ |
| G5 ⚪ | **Editor entdoppeln:** Gästeliste in die Status-Karte ziehen (gleiche Zahlen aus denselben Arrays), „Link teilen" nach oben (ist der Tag-1-Job), Wunschliste + persönliche Einladungen im Leerzustand auf Einzeiler kollabieren. | ⚪ |

### Groß (Produktentscheidung)

| # | Idee | Stand |
|---|---|---|
| P1 | **Alt-Creator stilllegen** (302 auf den Planer, Param-Mapping). ✅ belegt: 487 Zeilen = 44.039 Bytes = **17,3 %** des Workers; nur **7** eingehende Links im Repo. ⚠️ Vorbedingung (F12): Newsletter-Opt-in vorher in den Planer portieren. Prüfstand stimmt **nicht ungeprüft** zu: belegt ist nur, dass der Creator `ref` nicht liest; ob er weg kann, hängt an Traffic + E1/Option D. | Entscheid Bolle |
| P2 | **Ein Schriftsystem über alle drei Flächen** (F11). Die Marke bleibt verspielt — es geht um EINE Display-Schrift statt drei. | Entscheid Bolle |
| P3 | **Zahlenformat-Klasse** (F3): kein Locale-Formatierer im Repo. Fix = eine `eur()`/`num()`-Hilfe an ~3 Aufrufstellen. Die Stufe dazu muss am **Aufrufort** ansetzen, nicht am ausgelieferten Text. | Bau + Stufe |

### F15 — Ein Skriptlauf entfernt die einzige Sicherung der internen Dokumente (= Befund 23)

Gefunden am 06.09. beim Auszählen der Generator-Klasse, an der Quelle verifiziert. **Das ist
der Punkt, an dem F13 und F14 zu einem Risiko zusammenfallen: derselbe Doppelklick kippt beide.**

`_dev/scripts/generate-seo-pages.js:901`
`fs.writeFileSync(path.join(SITE, '_redirects'), buildRedirects(), 'utf8')` — ein
**Vollüberschreiben**, kein Anhängen. Was `buildRedirects()` (`:843-855`) erzeugt, ist eine
hartcodierte Liste aus drei Zeilen + Mottos + Altersgruppen + drei Zeilen.

| | heute im Repo | nach einem Lauf |
|---|---|---|
| Zeilen in `_redirects` | **370** | ~24 |
| **Guard-Zeilen (`404!`)** | **27** | **0** |
| 301-Weiterleitungen | **189** | 0 |

**Folge:** Die 27 Guard-Zeilen sind nach F14 die **einzige** wirksame Schicht, die
`STRATEGIE.md`, `AUDIT.md`, `SESSION-NOTES.md`, `party-worker.js` und 16 weitere Dokumente vom
CDN fernhält (`publish = "."` legt sie physisch dorthin, `.netlifyignore` deckt nachweislich
nur 9 von 20 und trägt die Last nicht). Ein Entwickler, der „mal die SEO-Seiten neu baut",
stellt sie ins Netz — **und zusätzlich sterben 194 Weiterleitungen**, also SEO-Schaden im selben
Lauf. Keine der 62 Stufen ist dafür zuständig.

Das Skript heißt einladend, ist versioniert und stammt vom Mai; es steht seit damals als
`BACKLOG-AUDIT.md` S3 im Rückstand. **Keine Session hat es angefasst** — die Reparatur
(Sitemap 136→24, Redirects) ist eigene Arbeit mit eigenem Gate, kein Nebenbei-Fix.

*Zwei Zahlenkorrekturen, je eine pro Session:* `machsleicht-7b` sprach von „338 Guard-Zeilen" —
das ist der Gesamt-Zeilenverlust aus dem alten Ticket; sicherheitsrelevant sind **27**.
Ich wiederum zählte 194 Weiterleitungen — `grep -c ' 301'` hatte **6 Kommentarzeilen**
mitgezählt; echte Regelzeilen sind **189** (`^/… … 301`). Beide Zahlen standen kurzzeitig in
Berichten, beide sind hier korrigiert. Die kleinere Zahl ist in beiden Fällen die richtige,
und in beiden Fällen wäre die größere beim ersten Nachzählen gekippt.

**F15 ist der stärkere Gründungsbeleg für die vorgeschlagene Stufe** als der Notfall-Kasten:
der Verlust wäre still, sicherheitsrelevant, und keine Stufe ist zuständig.

## Sieben Arbeitsregeln, die dieser Tag freigelegt hat

Acht Korrekturen an einem Tag, **keine einzige aus einem Exit-Code** — vier vom Prüfstand an
mir, drei von mir am Prüfstand, eine durch unabhängige Doppelmessung. Sie hatten alle dieselbe
Signatur: *ein Nulltreffer oder eine plausible Zahl löst keinen Alarm aus.* Die drei Regeln
darunter sind gratis und hätten je zwei bis vier der acht verhindert.

**R-A — Was ich ändere, tippe ich. Was existiert, leite ich ab.**
Die bestehende Commit-Regel dieses Repos verlangt ausdrücklich getippte Pfadlisten (eine aus
`git status` berechnete Liste ist `git add -A` in Verkleidung — drei Vorfälle in zwei Tagen).
Wer diese Regel auf **Messen** überträgt, baut den Fehler aus F14 nach: ich hatte
`git ls-files` in der ersten Schleife und tippte in der zweiten Dateinamen von Hand — dabei
sind zwei Dateien in den Befund geraten, die es im Deploy nie gab. **Commit und Messung haben
entgegengesetzte Disziplinen:** beim Ändern schützt die getippte Liste vor dem Zuviel, beim
Messen schützt die abgeleitete Liste vor dem Erfundenen. Beide Fehlerrichtungen sind heute
eingetreten. (Formuliert von `machsleicht-7b` aus meinem Fehler.)

**R-B — Ein Nulltreffer braucht eine Positivkontrolle. Ein grüner Haken auch.**
Zweimal hat ein `grep`-Muster `0` gemeldet, und zweimal war nicht das Produkt sauber, sondern
das Muster falsch: der Prüfstand suchte „nach/erst … Zusage" statt die Aussage, ich suchte mit
einer ODER-Kette und verschmolz drei Sätze zu einem Befund. Ein Nulltreffer ist erst ein
Befund, wenn dasselbe Muster an einer bekannten Fundstelle nachweislich anschlägt.

**Die Erweiterung ist die eigentliche Nachricht** (Protokoll `machsleicht-7b`, beim Fixen der
eigenen Befunde): drei Fehlgrüns hintereinander entstanden nicht beim Messen, sondern beim
**Verifizieren** — ein Python-Skript starb an der Konsolen-Kodierung und schrieb 0 Zeilen;
`node --check` sagte auf der so entstandenen **leeren** Datei „OK"; und Python schrieb nach
`C:\tmp`, während Bash aus dem MSYS-Temp las. Aufgefallen ist jedes Mal nur eine Kontrollzahl,
die nicht passte. Für ein Qualitätssystem, das auf Maschinen-Urteilen ruht (Helfer V5), ist das
die unangenehmste Beobachtung dieser Runde: **ein grüner Haken auf einem Artefakt, das die
Prüfung nie gesehen hat, ist schlimmer als keine Prüfung** — er beendet das Nachsehen. Jede
Abnahme braucht deshalb eine Größe, die beim Fehlschlag NICHT grün aussieht (Zeilenzahl,
Byte-Größe, Trefferzahl), nicht nur einen Exit-Code.

**R-C — Gemessen wird der versionierte Stand, nicht das Arbeitsverzeichnis.**
Steht seit dem prinzessin-Paket wörtlich im Docstring von Stufe 71
(`_dev/scripts/check-vorschaubilder.py:12`) — und genau dieser Fehler ist heute erneut
passiert (F14-Phantom). Eine Stufe zu haben genügt nicht, wenn ihre Lehre beim Messen von Hand
nicht angewandt wird. Für Live-Messungen gilt die Ergänzung: `curl` beweist, was Nutzer sehen,
`git ls-files` beweist, was überhaupt ausgeliefert wird — beides ist nötig, keins ersetzt das
andere.

**R-D — `git grep` verschluckt jedes Muster mit führendem `/`. Lautlos.**
Entdeckt von `machsleicht-7b` (sein eigener, funktionierender Schrift-Sweep meldete 0 Treffer
und widersprach damit seinem `git diff --stat`), danach von mir isoliert. MSYS wandelt
pfadartige Argumente um, bevor sie den **nativen** `git.exe` erreichen — die MSYS-eigene
`grep` ist nicht betroffen. Getestete Matrix (Treffer-Dateien im Repo):

| Muster | `git grep` | `git grep` + `MSYS2_ARG_CONV_EXCL='*'` | MSYS-`grep` |
|---|---|---|---|
| `/STRATEGIE.md` | **0** | 3 | 1 |
| `STRATEGIE.md` | 13 | 13 | 12 |
| `src="/js/motto-data.js"` | **0** | 2 | 2 |
| `href="/fonts/fonts.css"` | **0** | 169 | 169 |
| `/js/motto-data.js` | **0** | 4 | 4 |
| `js/motto-data.js` | 11 | 11 | 11 |

**Die Regel ist damit schärfer als „Muster mit Slash sind gefährlich":** betroffen ist jedes
Muster, das einen **führenden** `/` enthält — auch eingebettet nach `="`. Muster ohne führenden
Slash sind unauffällig, und die MSYS-`grep` ist es in allen Fällen. Praxis:
`export MSYS2_ARG_CONV_EXCL='*'` zu Beginn jeder Messrunde, Muster ohne führenden Slash
formulieren, und bei jedem Nulltreffer die Positivkontrolle aus R-B.

**Wie knapp das war, gehört dazu:** die Positivkontrolle, die den Befund gerettet hat, lief nur
deshalb korrekt, weil der `export` zufällig eine Zeile darüber im selben Block stand. Zwei
Zeilen höher gesetzt, hätte sie ebenfalls `0` geliefert — und ein richtiger Befund wäre als
widerlegt verworfen worden. Eine Positivkontrolle muss also in **derselben** Umgebung laufen
wie die Messung, sonst kontrolliert sie etwas anderes.

*Für diesen Bericht geprüft:* die F14-Zählungen (`grep -c -F "/$f" _redirects`) liefen über die
MSYS-`grep` und sind mit und ohne Schutz identisch (2 = 2 an drei Stichproben) — **F14 steht**.

**R-F — Vor jedem Generatorlauf sichern und danach diffen. Die Erfolgsmeldung ist kein Beleg.**
Der schärfste Fall des Tages, und er betraf Kinder-Sicherheitsinhalt. Beim Reparieren von
Befund 04 lief `_src/generate-age-pages.py` — der Lauf meldete brav „WROTE … 793 lines" und war
grün, **entfernte dabei aber auf drei Live-Seiten den Notfall-Kasten „Wenn ein Kind sich
verschluckt"**. Ursache: `check-maschinen-stand.py` lädt **zwei** Module — den Generator UND
`_dev/scripts/regeln-drucken.py`, das die Notfall-Kästen nachträgt. Wer nur den ersten fährt,
erzeugt eine Seite, die Stufe 36 besteht und trotzdem Inhalt verloren hat.

Gemerkt wurde es ausschließlich, weil `machsleicht-7b` vor dem Lauf eine Sicherung der 48
Dateien angelegt und danach gediffed hatte — der Diff zeigte „4 Zeilen", und in diesen vier
Zeilen stand Erste Hilfe für erstickende Kinder. **Von mir unabhängig nachgeprüft
(06.09.):** alle drei Seiten tragen den Kasten wieder, Vorkommen deckungsgleich mit dem
Anker `2fd73ab3` (5 / 2 / 1); repoweit 57 Seiten mit dem Inhalt. Nichts verloren.

Zwei Regeln daraus:
1. **Sicherung vor dem Lauf, Diff danach** — nicht die Erfolgsmeldung lesen. Eine Zeilenzahl
   im Diff ist der Beleg, „WROTE 793 lines" ist keiner.
2. **Der Generator allein ist nicht die Maschine.** Sie ist Generator **+** `regeln-drucken.py`.
   Wer die halbe Pipeline fährt, produziert grünes Gate bei verlorenem Inhalt.

**R-G — Eine Zahl, die größer ist als erwartet, ist genauso begründungspflichtig wie eine Null.**
Der letzte Befund des Abends, und er erklärt die anderen. Wir haben den ganzen Tag die
**Fehlnull** gejagt (R-B) — und dabei übersehen, dass sie einen Zwilling hat, der leichter
durchschlüpft: die **Fehlmenge**. Vier Fälle an einem Abend, alle in dieselbe Richtung:

| behauptet | tatsächlich | Ursache |
|---|---|---|
| 338 Guard-Zeilen | **27** | Zahl aus einem alten Ticket übernommen |
| 194 Weiterleitungen | **189** | `grep -c ' 301'` zählte Kommentarzeilen mit |
| 48 generierte Dateien | **9** | falsche Menge gezählt (alle statt der erzeugten) |
| 69 gefundene Stufen | **70** | Muster `Stufe` gegen Protokoll `STUFE` |

Und noch beim *Korrigieren* derselben Zahl passierte es erneut: „6 Kommentarzeilen" statt **5**
— wieder ein zu weites Muster (`^\s*#` + `301` irgendwo statt `' 301'`). Die Arithmetik
entschied: 194 − 189 = 5.

**Warum die Fehlmenge gefährlicher ist als die Fehlnull:** ein zu weites Muster fängt zu viel
und **sieht dabei gründlich aus**. Eine Null macht sofort misstrauisch („habe ich richtig
gesucht?"), eine zu große Zahl wirkt wie Sorgfalt und wird weitergereicht.

**KORRIGIERTE FASSUNG (07.09.) — die erste war eine Übergeneralisierung aus vier Fällen.**
Am 06.09. zeigten alle vier Fehlmengen nach oben, und wir schlossen daraus „wir übertreiben
nach oben". Am 07.09. kamen drei Fälle in die Gegenrichtung, alle beim Gegenlesen:
ein `focus()`-Muster fand **1 statt 9** Treffern (und der eine war zufällig der richtige — mit
einem zweiten Fall im eingeklappten Bereich wäre eine falsche Entwarnung herausgekommen);
ein `grep '^2\.'` traf die falsche von zwei Nummerierungen desselben Dokuments; und meine
Kommentarzeilen-Zählung lag bei 6 statt 5. **Die Richtung hängt am Muster, nicht an uns.**

> **Jede Zahl, die zur Erwartung passt, ist begründungspflichtig — die nach oben fällt nur
> schneller auf.**

Der Unterschied hat Folgen: Die erste Fassung hätte dazu erzogen, große Zahlen misstrauisch
zu prüfen und kleine durchzuwinken — genau falsch herum für die drei Fälle vom 07.09. Praxis
bleibt: eine Zahl, die man weitergibt, vorher gegenrechnen (Differenz aufschlüsseln, nicht nur
zählen), und bei einem Ergebnis, das die eigene Vermutung bestätigt, **einmal mehr** nachsehen
statt einmal weniger.

**R-E — Belege mit Adressen, nicht mit Zuständen. Dann verfällt Doku hörbar statt still.**
Die Synthese des Tages, und sie erklärt fast jeden Doku-Befund rückwirkend. „Produktives
Working-Repo" (`AUDIT.md:55`) ist ein **Zustand** — er war drei Monate falsch, ohne dass etwas
knirschte. „Kein `wrangler.toml` im Repo" war ein Zustand. Der „Ruhemodus" in FAQ und JSON-LD
ist ein Zustand. Jedes Mal war der Verfall unsichtbar, weil nichts dagegen prüfbar war.

Dieser Bericht hat denselben Fehler gemacht — nach zwei Stunden zeigten Zeilennummern daneben,
weil nebenan repariert wurde. Der Unterschied liegt **nicht in der Sorgfalt**, sondern in der
Form: `datei:zeile` ist eine **Adresse**, und eine Adresse kann man gegen einen Commit halten.
Deshalb fiel es nach zwei Stunden auf statt nach drei Monaten.

**Konsequenz, die über diesen Bericht hinausgeht (Vorschlag an Bolle, gemeinsam von beiden
Sessions):** Wo `AUDIT.md` einen Zustand behauptet, gehört eine Adresse daneben, gegen die man
ihn halten kann — Pfad, Commit, Zeile, Messkommando. Das ist V5-R4 („Gedrucktes leitet sich
ab") für Dokumentation statt für Zahlen, und es wäre die mechanisierbare Antwort auf einen
Befund, den wir heute an vier Stellen unabhängig gefunden haben.

> Diese sieben Regeln stehen hier, weil dies der eine Ort ist. Ob sie zusätzlich nach
> `_dev/LEKTIONEN.md` wandern, ist Bolles Entscheidung — keine Session schreibt hier
> ungefragt ins Repo-Gedächtnis.

## Was Runde 2 NICHT geprüft hat

- Die Linsen **Gastseite** und **Design** sowie der **Gegenleser** sind am Session-Limit
  gestorben (3 von 8 Agenten). Die Gastseiten- und Design-Zahlen oben stammen daher aus meiner
  eigenen Messung, nicht aus der Fächerung.
- Alle mit ⚪ markierten Ideen sind unverifizierte Kandidaten.
- Weiterhin offen aus Runde 1: Mail-Zustellung (ms365 nicht eingeloggt), echter Spiel-Durchlauf,
  visuelle Prüfung außerhalb der aufgenommenen Screenshots.

---

# Umsetzung 07.09.2026 — Bolles Freigaben abgearbeitet

Bolle hat am 07.09. in zwei Fragerunden entschieden. Was daraufhin gebaut wurde, mit
Beleg je Zeile. **Alles auf `draft`, nichts auf `main`, kein Deploy.**

| # | Befund | Entscheidung | Umsetzung |
|---|---|---|---|
| B13/B14 | toter Code | „Ja, und den Kleinkram gleich mit" | 6 Dateien gelöscht (`hit.js`, `event.js`, `dashboard.js`, `js/wizard.js`, `js/theme-registry.js`, `js/birthday-project.js`); die zwei `sendBeacon`-Definitionen in `baby.js`/`einschulung.js` stillgelegt — die **Aufrufe** bleiben (1× bzw. 4×), sonst brechen sie. `node --check` grün |
| F1 | Loop-CTA | „wenn Planer der Wizard ist, dann ja" | `party-worker.js` → `machsleicht.de/kindergeburtstag?ref=${id}`. Dort sind READ + SEND + Tracking gebaut |
| F2 | Pronomen | „beide umformulieren" | Piraten: „feiert Geburtstag als Piraten-Captain. Du gehörst zur Crew!" · Weltraum: „braucht Crew für die große Weltraum-Mission!" |
| F3 | Zahlenformat | Kleinkram | `num()` + `eur()` als Hilfen; „7,40 €/Kind" und „2,0 l" statt englischem Punkt |
| F4 | Ortshinweis | Kleinkram | Der getippte Grobort schlägt jetzt die Kategorie; „zuhause" nur noch als Fallback |
| F6 | Spiel-Shell | Kleinkram | **Einzelfall, nicht Klasse**: nur `piraten` trug „erstellen" im Titel, die anderen 14 waren korrekt |
| F8 | Paket-Kopfzeile | Kleinkram | „Basis: 14:00–17:00" → „Vorlage: … — der Plan unten läuft in euren Zeiten" (8 Pakete) |
| M1 | Motto-Grid mobil | „Alles kürzen" | Unter 420px zwei Spalten — halbiert 3,2 Bildschirmhöhen auf ~1,6 |
| S3 | „3–12 Jahre" 15× | „Alles kürzen" | Von den Kacheln entfernt, steht einmal in der Kopfzeile |
| M4 | doppelte Privacy-Passage | „Alles kürzen" | Wortgleiche Regel stand 2× untereinander → einmal, am Adressfeld, wo sie zählt (−281 Bytes) |
| G1+G3 | Formular | „optionales einklappen und Alter nur das richtige Alter abfragen" | s.u. |
| F13 | Google Fonts | „Schriften holen und selbst hosten" | s.u. |

## Der Alters-Umbau — der riskanteste Eingriff, mit Gegenprobe

**Warum riskant:** `state.age` (die Gruppe) wird an **18 Stellen** gelesen und steuert
Spielauswahl (`gamesForAge` 3×), Plan-Cache (`_planKey`), Paket-Variante (`eliteAgeAdjust`),
`isShort` und den Worker-Payload `ageGroup`. Fällt die Gruppenwahl weg, ohne dass jemand sie
setzt, greift überall still der Default `'6-8'` — **ein Neunjähriger bekommt die Spiele für
Sechsjährige, ohne dass ein Gate anschlägt.** Gefunden von `machsleicht-7b` als Gegenprüfung.

**Was beim Nachmessen dazukam (von mir):**
- `setExactAge` leitete die Gruppe **schon** ab (Zeile 1437) — die Ableitung musste nicht
  erfunden, nur herausgezogen werden (`gruppeAusAlter()`).
- `renderPlanPreview` **heilt sich selbst**: passt keins der gemerkten Spiele zum Pool, füllt
  es neu (Zeile 1717). Der Deep-Link-Pfad hatte das schon gebraucht.
- Aber: `pickAge` setzte `state.eliteOff = []` bei jedem Gruppenwechsel, `setExactAge` nicht —
  Spiel-Abwahlen wären über einen Alterswechsel hinweg stehengeblieben. Ergänzt.
- Und: der Deep-Link `?alter=9` setzte nur die Gruppe. Mit dem neuen Feld wäre die Zahl leer
  geblieben. Jetzt setzt er beides.

**Ein Fehler in meinem eigenen Entwurf, vor dem Schreiben gefangen:** die erste Fassung rief
bei jeder Eingabe `renderAges()` — das hätte das Eingabefeld selbst ersetzt und den Fokus nach
der ersten Ziffer zerstört. Getrennt in `renderAges()` (einmal) und `renderAgeInfo()` (bei jeder
Eingabe).

**Positivkontrolle über alle Jahrgänge** (ein „läuft durch" beweist hier nichts, weil der
Default immer greift):

    Alter  3  4  5 | 6  7  8 | 9 10 11 12
    Gruppe 3-5     | 6-8     | 9-12
    → 10/10 korrekt, Randfälle 0 und 15 → kein Wert (kein stiller Default)

## Formular: 19 Felder → 3 sichtbare Pflichtangaben

Die fünf optionalen Felder (Nachricht, Telefon, Grobort, Adresse, Gästeliste) liegen jetzt in
einem `<details id="psMehr">` — „Mehr anpassen — optional, geht auch später über deinen
Verwaltungs-Link". Sie bleiben im DOM, `activatePartyseite()` liest sie unverändert.

**Der Fallstrick, den `machsleicht-7b` angekündigt hat, ist behandelt:** ein `focus()` auf ein
Feld in einem geschlossenen `<details>` scrollt nirgendwohin — die Fehlermeldung zur
Telefonnummer stünde über einem Bildschirm ohne das Feld. Genau diese Sackgasse war Runde 6 des
Welle-3-Gutachtens schon einmal. Der Aufklapper öffnet sich jetzt vor dem Fokus.

## Schriften: die letzte Google-Verbindung ist weg

- `lilitaone.woff2` (10.672 B) und `nunito.woff2` (39.128 B) geholt, **woff2-Signatur geprüft**
  (`774f4632`), beide SIL Open Font License.
- Nunito ist ein **Variable Font**: Google liefert für 400, 600, 700 und 800 dieselbe Datei —
  per CSS-API nachgeprüft, eine Deklaration mit Bereich reicht.
- Im Planer sind **beide preconnect-Zeilen mit raus**, nicht nur der Stylesheet-Link. Ein
  preconnect baut DNS/TCP/TLS auf und überträgt die IP auch ohne Schrift (Warnung stand in
  `fonts/fonts.css`).
- **Messung: 0 ausgelieferte Seiten mit Google-Fonts-Bezug, 172 mit dem lokalen Stylesheet.**
- **`datenschutz.html` nachgezogen** — sie beschrieb eine Übermittlung, die es nicht mehr gibt.
  Abschnitt 5 heißt jetzt „Schriftarten", nennt die Selbst-Auslieferung und hält den
  historischen Stand fest (bis 07.09. wurde über Google geladen). Das ist K1 in Gegenrichtung:
  ein Text, der mehr behauptet, als die Maschine tut.

## Noch offen (nicht angefasst)

- **Die drei Versprechen** (Magic-Link-Versand, 7-Tage-Erinnerung, Ruhemodus): Bolle hat
  „Funktionen bauen" entschieden, **nicht** Texte streichen. Das ist eine eigene Session mit
  eigenem Gate (Resend-Anbindung, `[triggers]` in `wrangler.toml`, DOI) — bis dahin steht das
  Versprechen weiter da.
- **F15/Befund 23** (`generate-seo-pages.js` überschreibt `_redirects`): eigene Arbeit mit
  eigenem Gate, Ticket S3 seit Mai.
- **F14/.netlifyignore**: erst die abgeleitete Prüfstufe, dann löschen.

---

# Umsetzung 07.09.2026, zweite Runde — die Versprechen bekommen ihre Maschine

Bolles Entscheidungen der zweiten Fragerunde, Commits `964ad987` und `9a7697a2`.

| Befund | Entscheidung | Umsetzung | Beleg |
|---|---|---|---|
| K1-4 Ruhemodus | Text auf das ziehen, was es gibt | FAQ **und JSON-LD** — beide beschrieben einen Knopf, den es nicht gibt. Ich hatte K1-4 am 06.09. fälschlich abgehakt (im Worker gesucht, im Planer stand es). Jetzt: Spiele einzeln tauschen/verschieben, Aufwand „Minimal" | `Ruhemodus` 2→0, JSON-LD geparst |
| F12 Newsletter | Ja, Checkbox beim Aktivieren | `psNewsletter` am E-Mail-Feld, unangehakt, `newsletterOptIn` im bestehenden `send-edit-link`-Body. **Werbetext des Alt-Creators bewusst nicht übernommen** — der verspricht die Erinnerungsmail | 3 Assert-Fehlschläge auf dem Weg, s.u. |
| G4 Plan-Lesemodus | Beide jetzt | `.plan-mod:not(.plan-mod--edit)` versteckt ▲▼×/Chips; Umschalter aus `window.__planEdit` abgeleitet (überlebt Re-Render); print-Regel um den Umschalter ergänzt — **meine eigene Kommentar-Behauptung war ungeprüft** | 31→10 sichtbare Knöpfe |
| G5 Editor | Beide jetzt | 11 Karten → 8 + 2 Aufklapper. Gästeliste in die Status-Karte, **unsortiert** (Server löscht nach Index mit Namens-Wache — Sortierung = stilles No-op). „Link teilen" nach oben. Allergien-Karte weg (3× dieselben Daten). Wunschliste/Einladungen im Leerzustand zu | Gegenprobe 7b: `removeGuest` :551/:555 |
| P2 Schriften | „Das dritte System beenden" | Planer behält Lilita One + Nunito, Beschluss in `fonts/fonts.css` festgehalten. **Nicht auf Fraunces gezogen** — die Serif aus der Sommer-Diagnose „SaaS-Event-Tool statt Kinderwelt" | Einspruch 7b, `SESSION-NOTES:2941` |
| P1 Alt-Creator | „umleiten! Sind da wertvolle Infos drin?" | **Ja:** `paypalMe` 11×/`sharedGift` 4× nur dort, 0× im Planer, 0× im Editor-PUT — obwohl der Server es annimmt (:517). Erst `edPaypal` in den Editor, **dann** `/` → 302 auf den Planer (`mottoId`→`motto`, `ref` durchgereicht). Wirksam erst mit Worker-Deploy | Feature-Inventar 22 Felder |
| K1-2 Erinnerung | **Funktionen bauen** | `[triggers] crons=["0 8 * * *"]` (gab es nicht) + `async scheduled()` (gab es nicht): prefix-Lauf über `party:`, `date===heute+7 && email && !reminded7` → Resend → Flag. Empfänger `party.email`, transaktional. **Offen:** kein Datums-Index, ab tausenden Partys nötig | Signatur + TTL-Form geprüft |
| K1-1 Magic-Link | **Funktionen bauen** | `POST /api/plan` speichert nur Eingaben (kein Motto-Objekt: 4.604 Zeichen bleiben draußen) 90 Tage, mailt `?plan=<token>`; `GET /api/plan/<token>`; Planer stellt nach dem lokalen Resume wieder her. **Fund beim Selbstprüfen:** `resumeWork()` ersetzt den State komplett — „Weitermachen" nach dem Link-Restore hätte ihn überschrieben. Snapshot wird verworfen, Banner geschlossen | `planEingaben()`: genau 1× `state.motto`, und das ist `.id` |

**Drei Assert-Fehlschläge bei der Newsletter-Checkbox, alle vom selben Typ:** `'psNewsletter' not in t` traf meinen eigenen Payload-Verweis; `'Erinnerung 7 Tage' not in text` traf meinen Erklär-Kommentar; `'Erinnerung' not in text` traf „Erinnerungsmail" im Kommentar. Lösung: **der Assert prüft den sichtbaren Text, der Kommentar darf erklären** — und der Kommentar zitiert den Werbesatz nicht im Wortlaut, damit ihn niemand zurückkopiert. Eigenständige Lehre neben R-B: *ein Assert muss zwischen der Zusage und der Erklärung, warum die Zusage fehlt, unterscheiden können.*

**Beim Editor-Umbau hätte ich zweimal den falschen Block getroffen:** `finde('Wunschliste</h2>')` fand Zeile 1427 im Alt-Creator statt 2700 im Editor; `addWish()` hieß `addWishEd()`. Beide Male hat der Assert vor dem Write gestoppt. Seitdem: alle Suchen ab dem Editor-Anker.

**Nicht live prüfbar heute:** die Umleitung, die Erinnerung und `/api/plan` laufen erst mit dem nächsten Worker-Deploy. Der Prüfauftrag nennt das unter „Grenzen".

## Nachtrag 07.09., dritte Runde — aus der Gegenprüfung des Prüfstands

| Punkt | Was kam | Was gebaut wurde | Commit |
|---|---|---|---|
| **Datums-Index** | „KV liefert je Key `metadata` — der Index existiert schon, du hast ihn nicht benutzt" | `partyOpts(party)` = `{expirationTtl, metadata:{date}}`, ersetzt **acht** `party:`-Puts in drei Schreibweisen (Regex, Assert auf genau 8). Der Cron filtert über `seite.keys` und liest nur Treffer + Altbestand ohne metadata. Log trennt `per-index-uebersprungen` von `gelesen` | `f6edb5f1` |
| **Workers-Plan** | Bolle: **Free-Plan** | ~~1.000 KV-Reads/Tag~~ **korrigiert 07.09. abends:** laut Cloudflare-Doku 100.000 Reads/Tag, 1.000 Writes/Tag, 1.000 KV-Operationen je Aufruf. `MAX_READS = 200` je Lauf bleibt (Herleitung: Operationen je Aufruf), aber „Rest morgen" stimmte nicht — s. Nachtrag „Der Deckel hatte ein Loch" | s.u. |
| **Magic-Link-Rückfrage** | Bolle: „Nachfragen, wenn anderer Plan da ist — was sagst du?" · ich: ja | `confirm()` **nur**, wenn lokal ein Plan mit anderem Namen **oder** anderem Motto liegt. Quelle ist der Resume-Snapshot bzw. localStorage — nicht `state`, das ist vor „Weitermachen" noch der Default. Normalfall ohne Unterbrechung | s.u. |
| MINOR | `poss("")` → Doppelleerzeichen im Betreff | „bis zur Piraten-Party" / „die Piraten-Party" ohne Namen | `f6edb5f1` |

**Ein Ablauffehler, zum zweiten Mal:** Die Positivkontrolle meldete `partyOpts-Aufrufe=9 (soll 8)` — und der Commit war schon durch, weil die Kontrolle nur als Echo in der `node --check && git commit`-Kette lief. Aufgeklärt: 8 Aufrufe + 1 Definition, mein Muster `partyOpts(party` traf die Funktionsdefinition mit. Inhaltlich korrekt. **Konsequenz:** Kontrollzahlen gehören in einen Assert, der die Kette bricht — nicht in ein Echo, das man nach dem Commit liest.

**Vom Prüfstand bestätigt (alle vier Fragen halten):** Datumsformat `YYYY-MM-DD` auf beiden Seiten des Vergleichs (`validDate` :336 vs. `toLocaleDateString("en-CA")`) — das war die stille Null, vor der er Angst hatte · `calcTTL`-Form identisch mit allen anderen Schreibpfaden · keine Präfix-Route fängt `/api/plan/` ab · `saveEdit()` liest per ID, `edPaypal` ist vorbefüllt (kein Bestandsverlust beim Speichern) · kein Doppelversand (Flag erst nach `res.ok`).

**Positivkontrolle für den Cron ohne Deploy:** `party-worker.js` als byte-identische Kopie (272.499 Bytes, Assert) unter `.mjs` geladen,
`env.PARTY` und `fetch` als Attrappen mit fünf Partys: heute+7 mit `metadata.date` (P1), heute+7 **ohne**
metadata = Altbestand (P2), heute+3 (P3), heute+7 mit `reminded7` (P4), heute+7 ohne E-Mail (P5).
Zwölf Erwartungen, **12/12 erfüllt:** Mails nur an P1+P2, P3 per Index übersprungen und **nie gelesen**,
P2 gelesen und beim Rückschreiben mit `metadata.date` versehen, P1 behält seine metadata, `reminded7`
gesetzt, Gästezahl 1 (ja/nein getrennt), Edit-Link in der Mail, jeder Put mit positiver TTL,
Log `reminder7: ziel=… per-index-uebersprungen=1 gelesen=4 gesendet=2 fehler=0 gecappt=false`.

**Der erste Lauf war 11/12 — und die rote Zeile war meine Erwartung, nicht der Worker.** Ich hatte
„Mias Piraten-Party" als Soll getippt; `poss()` liefert nach Bolles Stilentscheid „Mia's" (Name's, bei
s/ß/x/z nur der Apostroph — `OFFENE-REVIEW-PUNKTE.md`:25). R-A, wieder: getippt statt abgeleitet.
Derselbe Fehler stand als Soll in **Winkel 12 des Prüfauftrags** und hätte dem Reviewer ein falsches
MAJOR eingebaut — korrigiert (`2026-09-07-funnel-umsetzung-prompt.md`), zusammen mit der dort getippten
Logzeile (`geprueft=` gibt es nicht, der Worker schreibt `gelesen=`; jetzt aus `party-worker.js`:420
abgeleitet), dem Commit-Bereich (Prüfstand: „`draft` ab `2fd73ab3`", keine obere Grenze) und zwei
Stellen „wird gerade gebaut" → „gebaut, nicht deployt".

**Beobachtung, nicht angefasst:** die Worker-`poss()` (`party-worker.js`:230 und :1828) setzt den geraden
Apostroph `'`, die Planer-`poss()` (`kindergeburtstag.html`:2403) den typografischen `’`. Mail-Betreff
und Gäste-Teilen-Text sagen „Mia's", das Resume-Banner „Mia’s". Kosmetisch; Stufe 18 vergleicht nur
Planer gegen `paket/core/paket-core.js`. Kandidat für die Prüfstand-Liste, keine Handlung ohne Bolle.

**Der Deckel hatte ein Loch (Befund Prüfstand, 07.09. abends):** `MAX_READS = 200` brach den Lauf nach 200 Reads ab,
„der Rest morgen" — aber morgen ist `ziel` ein anderer Tag, und `list()` liefert jeden Tag dieselbe
Reihenfolge: Altbestand hinter Position 200 wäre an seinem Tag nie geprüft worden, still, mit
`gecappt=true` als scheinbar korrektem Log. Bolle hatte den Deckel auf diese Zusage hin genehmigt.
Zweiter Fehler im selben Kommentar: „Free-Plan = 1.000 KV-Reads/Tag" — aus dem Gedächtnis getippt.
Die Primärquelle (developers.cloudflare.com/kv/platform/limits, 07.09. abgerufen) sagt **100.000
Reads/Tag, 1.000 Writes/Tag, 1.000 KV-Operationen je Aufruf**. Der Deckel bleibt richtig, aber aus
anderem Grund: Operationen je Aufruf; die Writes je Tag teilt sich der Cron mit RSVP und Edit.

**Fix (`20202411`):** Kommentar mit Herleitung aus der Primärquelle und Nennung der falschen Fassung
statt stiller Korrektur; der Zähler zählt den Read, nicht den Parse; **Selbstheilung:** jeder
gelesene Altbestand-Key ohne Treffer wird mit `raw` + `partyOpts` zurückgeschrieben (Inhalt
unverändert, nur Metadata) — ab dem nächsten Lauf kostet er keinen Read mehr; Log `nachgezogen=`.
Positivkontrolle auf **23 Erwartungen** in zwei Szenarien erweitert: A wie gehabt plus Altbestand
ohne Treffer (nachgezogen, Inhalt byte-gleich, kein Doppel-Put beim Treffer); B = 205 Altbestand,
drei Läufe: `gelesen=200 nachgezogen=200 gecappt=true` → `uebersprungen=200 gelesen=5 nachgezogen=5`
→ `uebersprungen=205 gelesen=0`. Der Rest kommt jetzt wirklich im nächsten Lauf dran.

**Bleibt — Bolles Entscheidung:** die Übergangslücke. Bis der Altbestand nachgezogen ist
(⌈N/200⌉ Läufe), wird eine Altbestand-Party hinter dem Deckel an ihrem Tag nicht geprüft. Bei
N ≤ 200 gibt es die Lücke nicht (der erste Lauf liest alles). N kennt nur das Cloudflare-Dashboard.
Optionen: nichts weiter (N ≤ 200) — oder ein Nachhol-Zweig beim ersten Read (0 < Tage ≤ 7 → Mail
mit echter Tageszahl), der von selbst stirbt, sobald kein Altbestand mehr da ist.

**Zwei Ablauffehler dabei, beide vom Typ der Newsletter-Checkbox:** der Assert `'Rest morgen' not in out`
traf mein eigenes Zitat der alten Zusage im neuen Kommentar — erklären ja, wörtlich zitieren nein, auch
in Code-Kommentaren. Und eine getippte Vorab-Kontrollzahl (`grep -c == 2`, tatsächlich 3: die Kopfzeile
fehlte) brach die Kette, bevor etwas lief. Fail-safe — aber R-A, wieder.

**Rückfrage-Prädikat (MINOR Prüfstand, `6d453704`):** `_anders` verlangte einen Namen auf *beiden* Seiten;
lokal „Mia", Link ohne Namen (vor der Namenseingabe angefordert) → keine Rückfrage, stiller Ersatz —
genau der Randfall, für den die Rückfrage gebaut ist. Jetzt: Rückfrage, sobald lokal ein Name oder
Motto liegt, das der Link nicht identisch mitbringt (auch: gar nicht). Beide Skriptblöcke `node --check`
sauber; Winkel 20 um diesen dritten Fall ergänzt.

**Entschieden (Bolle, 07.09. abends, wörtlich: „Nur testpartys...keine sorge"):** im KV liegen nur Testpartys, N ≪ 200 — der erste Cron-Lauf liest alles nach, die Übergangslücke existiert nicht. Kein Nachhol-Zweig, keine 6–7-Tage-Variante, der Checkbox-Text bleibt. Außerdem: `draft` gepusht (`4181893a`, kein Deploy) und der unabhängige Review gestartet — Material sind zwei Diff-Dateien im Repo (Planer 62536 Bytes, Worker+Rest 45237 Bytes, jeweils `2fd73ab3..4181893a`) per raw-SHA-URL, weil das Voll-File (309.405 Bytes) den Abruf des Reviewers sprengt. Nichts davon ist live: der Reviewer liest Code, Klick-Winkel beantwortet er aus dem Code oder meldet sie als nicht prüfbar.

**Review gestartet 07.09., 12:36 Uhr:** frischer claude.ai-Tab auf Bolles Device, Modell **Fable 5.1 · Aufwand Maximal** (per DOM aus dem Picker gewählt, Label zurückgelesen), Prompt = Prüfauftrag + Material-Block, wörtlich abgelegt als `_dev/review/2026-09-07-funnel-umsetzung-prompt-gesendet.md` (12.279 Zeichen, 165 Absätze im Editor, 10 raw-URLs auf `620a332a`). Gesendet über den „Nachricht senden"-Knopf, Kontrolle: URL wechselte auf `https://claude.ai/chat/b247fa6f-1b5c-4481-a9db-8e22e811a78c`, Editor leer, Stop-Knopf aktiv. Ergebnis wird nach Stufe 3 (jedes Finding selbst an der Quelle verifizieren) hier eingetragen; Re-Check nach Fixes in einem frischen Tab, nie im selben Chat.

## Review 07.09. abends — Ergebnis, Stufe 3, Fixes

Reviewer: frischer claude.ai-Tab, Fable 5.1 · Maximal, target-blind, Stand `620a332a` (Diffs per raw-SHA-URL).
Zwei Durchgänge (Tool-Limit nach dem ersten, „Weiter" gedrückt): erst Code-Lesen, dann hat er den Stand selbst in
Chromium 375×812 gerendert und `party-worker.js` in Node mit KV-Attrappe ausgeführt. Score 58 → 52 (Telemetrie).
Jedes Finding wurde vor dem Fix am Code bei `620a332a` verifiziert (Stufe 3); der Prüfstand misst parallel.

| Nr. | Befund (Kurzform) | Stufe 3 | Fix |
|---|---|---|---|
| M1 | Link-Restore setzt Felder auf den Default-State, wirft den reicheren Gerätestand weg (Partyseite, Plan, Einladungstext, Foto) | bestätigt | `547868d3` — lokaler Stand als Basis, wenn nicht ausdrücklich ersetzt; gleiche Identität bleibt Basis auch nach „Ersetzen"; nur nicht-leere Link-Werte überschreiben |
| M2 | Crew nach Restore angezeigt, aber `state.crew` leer → keine persönlichen Links | bestätigt | `547868d3` — `setCrew(state.crewText)` |
| M3 | Motto-Wechsel nach Stage 4: WhatsApp-Text trägt altes Motto (Textareas nie neu geschrieben) | bestätigt | `547868d3` — pickMotto schreibt #iTitle/#iBody; Titel hängt am Motto, nicht am Namen |
| M4 | Info-Box verspricht Tagesplan-Ende je Gruppe, nichts setzt es | bestätigt (`endTime` Default 16:30, nie von der Gruppe) | `547868d3` — Ende folgt der Gruppe, solange nicht selbst gesetzt; Info-Zeile aus dem State abgeleitet |
| M5 | DSE §2 verneint Speicherung, /api/plan speichert 90 Tage | bestätigt | `37c3ae09` — §2 Ausnahme benannt, §11 Absatz Plan-Link (Felder, Ort, Frist, lit. b) |
| M6 | Erinnerung ohne Einwilligung, drei widersprüchliche Texte | bestätigt; **Bolle: Service-Mail** | `37c3ae09` — §11 trennt Newsletter und Erinnerung; E-Mail-Feld sagt, was kommt; DOI-Texte ohne Erinnerungs-Versprechen |
| M7 | „Später"-Modal: Laufzeittext „sobald die Funktion live ist", Knopf „Vormerken" | bestätigt (`SL_MODES.save`) | `547868d3` — Text, Knopf, Flash, Checkout-Knopf |
| m1 | Ungültiges Alter lässt Gruppe und Plan-Knopf stehen | bestätigt | `547868d3` — ungültig = kein Alter; revealPlan verweigert |
| m2 | Alt-Speicher ohne Zahl umgeht die Altersfrage | bestätigt | `547868d3` — Rückkehrer ohne Zahl: kein Knopf, zurück auf die Eckdaten |
| m3 | 1–2 / 13–14 still als 3–5 / 9–12 beschriftet | bestätigt; **Bolle: annehmen, aber sagen** | `547868d3` — Info-Box benennt den Sprung |
| m4 | „genau da, wo du aufgehört hast" trägt der Link nicht (Plan-Zeilen, Einladungstext, Foto) | bestätigt | `547868d3` — Flash ohne Überversprechen; Payload-Erweiterung als Ticket (s. u.) |
| m5 | Antwortfrist nur einmal gesetzt | bestätigt | `547868d3` — `fristAuto()`, Datumswechsel zieht die automatische Frist nach |
| m6–m9 | „zuhause" ohne Bezug · Preis roh · „Dein" nach Doppelpunkt · Werkzeuge 26 px | bestätigt | `547868d3` |
| m10 | Mobile-Regeln stehen vor den Basisregeln → tot | bestätigt | `547868d3` — Block hinter die Basisregeln |
| m11 | „Kosten passt der Planer an die Gästezahl an" — teilt feste Summe durch Gäste | bestätigt; **Bolle: ehrlich rechnen** | `547868d3` — pro Kind konstant, Summe skaliert, „Liste für N Kinder gerechnet", FAQ (2 Stellen) |
| m12 | PayPal nur bei Wünschen mit Preis, Label sagt es nicht; „30€" | bestätigt | `37c3ae09` |
| m13 | Apostroph Worker `'` vs Planer `’` | **Bolle: gerader Strich überall** | `547868d3` Planer, `37c3ae09` paket-core; Worker hatte ihn schon |
| m14 | Keycap-Emoji doppelt (🎮 1️⃣) | bestätigt | `547868d3` — `_EMO_GRAB` kennt Keycaps |
| m15 | DSE §10 verortet das Tool auf der Subdomain-Startseite (nach Deploy nur 302) | bestätigt | `37c3ae09` |
| m16 | Fehler-Flash verschwindet nach 2,2 s | bestätigt | `547868d3` — 6,5 s für ⚠️-Meldungen |

**Bestätigt sauber (vom Reviewer ausgeführt):** Altersableitung 3/5/6/8/9/12, 8→9 zieht neu und Abwahlen fallen,
Aktivierung ohne „Mehr anpassen", Telefon-Fehler öffnet das Feld, Grobort in Text/Gästeseite/Spiel-URL, deutsche
Zahlen, nur cloud.umami.is als Fremdverbindung, Schriften lokal (5× woff2 200), Umleitung 302 mit motto/ref,
drei Genitiv-Fälle, Deep-Link, Lese-Modus zuerst, Gästeliste „1 dabei" einmal, PayPal-Handle bleibt, Newsletter
unangehakt, Rückfrage Fall 1 und 3. Nicht prüfbar: „jederzeit abbestellbar" (Resend), Zustellung, Bestellweg.

**Positivkontrollen zu den Fixes (alle aus den echten Quellzeilen):** `restore_test.mjs` schneidet
`restorePlanFromLink` aus dem HTML und fährt sie mit Attrappen — 29 Erwartungen in 7 Fällen; `anders_test.mjs`
10 Fälle für Wache und Rückfrage; `check-cron-erinnerung.mjs` 23/23; Emoji-Regex und `poss()`-Gleichheit
Planer/Paket direkt aus den Dateien; alle Skriptblöcke, Worker, paket-core und Generator `node --check`; JSON-LD parst.

**Sitemap (Bolle: nur Inhaltsseiten stempeln):** `7de1cb98`. Auf dem Weg zwei Werkzeugfehler: `git log --format=%H|%cs`
lief durch `cmd.exe` (`|` wurde Pipe, `%..%` Variable), und der Generator stempelte bei leerer Antwort **still**
alle 136 URLs auf heute — genau die Klasse „stiller Fallback". Jetzt `execFileSync` ohne Shell und Abbruch bei
Git-Fehler. Ergebnis: 51 URLs auf ihr echtes Datum (01.–03.09.), `/kindergeburtstag` 07.09., der Schrift-Sweep zählt nicht.

**Offen / Tickets:** (1) Magic-Link-Payload um Plan-Zeilen, Einladungstext und Partyseiten-Referenz erweitern
(Worker-Allowlist + Größen; Foto bleibt draußen) — dann darf der Text wieder mehr versprechen. (2) `check-cron-erinnerung.mjs`
als Linter-Stufe mit Gegenprobe (Prüfstand-Zone, Bolles Wort). (3) Lauf 7 nach diesem Commit-Block. (4) Re-Check der
Fixes im frischen Tab (Bolles Konto bei 90 % Sitzungslimit — Bolle: jetzt versuchen). (5) Nach Review: „ende deploy"
+ Worker-Deploy; danach GSC (Sitemap neu einreichen, URL-Prüfung `/kindergeburtstag`, `/datenschutz`).

## Follow-up nach dem Gegenlesen des Prüfstands und Re-Check

**Follow-up `3eee06e9`** (nach dem Gegenlesen des Prüfstands, mit Harness-Gegenprobe gegen den alten Baum):
- **Zeitregel im Link-Merge:** auf demselben Gerät ist der Magic-Link immer älter als der lokale Stand — „nicht-leer
  überschreibt" drehte eine frisch geänderte Telefonnummer zurück. Jetzt gibt `GET /api/plan` `created` mit, der Planer
  vergleicht mit `lastSaved`: Link jünger → überschreibt nicht-leere Werte; sonst füllt er nur Lücken; ohne Zeitstempel
  gilt die Überschreib-Regel. Harness-Fall H (Gerät jünger) war vorher rot, H2 (Link jünger) prüft die Gegenrichtung.
- **Geteilte Motto-Referenz nicht mehr mutiert:** der M1-Merge aus `547868d3` verschmolz Sub-Objekte per `Object.assign`
  in bestehende Objekte — war `state.motto` schon die Live-`MOTTOS`-Referenz (`?motto=…&plan=…`), wurde das geteilte
  Motto mit der gespeicherten Kopie überschrieben. **Selbst eingebauter Fehler**, gefunden durch den eigenen Harness-Fall I
  (rot gegen 76807ab9: `MOTTOS[dino].name === "Dino (gespeichert)"`). Jetzt wie `resumeWork`: invite/partyseite/plan als
  neue Objekte über die Defaults, alles andere ersetzt, Motto an die Live-Referenz gebunden.
- **Generator:** Commits mit Betreff `Technisch:` zählen nicht als Inhaltsänderung (abgeleitete Regel, SHA-Liste bleibt
  Seed); Kontrollzahl: Neulauf byte-identisch zur committeten Sitemap. `e26b93c2` bleibt bewusst ungesperrt (gemischter
  Commit — Prüfstand: 24 Seiten drei Wochen zu frisch ist ehrlicher als ein verstecktes echtes Datum).
- Harness danach **37/37 in 10 Fällen**; die Commit-Nachricht von `3eee06e9` nennt „33/33" — die Zahl war getippt, nicht
  aus dem Lauf gelesen (R-A). Der Commit bleibt, die Korrektur steht hier.

**Ablauf-Kollision:** der Prüfstand startete Lauf 7 gegen `76807ab9`, während `3eee06e9` in den Baum kam — mein
„Strom steht" hatte er für den früheren Stand gelesen. Regel ab jetzt: nach „Strom steht" kein Commit ohne vorheriges
„Strom offen" an den Prüfstand. Ob Lauf 7 wertlos war, entscheidet der Startzeitpunkt (seine Messung).

**Stufe 72 (Prüfstand, ld+json parst):** 484/484 Blöcke bei HEAD, der FAQ-Block war seit `964ad987` kaputt und ab
`547868d3` heil; Gegenprobe zweiarmig. Kopplung: die Probe sucht den String `"name": "Was tun, wenn die Kinder zu wild
werden?"` im Planer-JSON-LD — ändert sich die FAQ-Frage, meldet der Prüfstand MUTATION-LEER.

**Re-Check (frischer Tab, Fable 5.1 · Maximal, Diff `620a332a..1b1a01ed` per raw-URL auf `76807ab9`):** der erste Anlauf
(Chat `1c49d96b`) ging verloren — der Tab verließ die Automations-Gruppe, im Chat blieb kein Assistenten-Beitrag, keine
Limit-Meldung; zweiter Anlauf in neuem Chat `2bd801b2`, Tab unangetastet gelassen. Ergebnis:

| Nr. | Reviewer-Status (gegen `76807ab9`) | Stufe 3 | Erledigt in |
|---|---|---|---|
| M1 | teilweise / **neu kaputt**: `Object.assign(state.motto, kopie)` korrumpierte den Live-Motto-Katalog (`state.motto` ist ab Init die MOTTOS-Referenz) | bestätigt = Harness-Fall I | `3eee06e9` |
| M1 | Wache „Name oder Datum" filtert nichts — `state.date` ist per Default immer gesetzt; Datumsklausel fragte beim SEO-Phantom sogar häufiger | bestätigt (mein Denkfehler, vom Prüfstand mitgetragen) | Block 3: Wache = getippter Name oder aktive Partyseite, Datumsklausel raus, Zeitregel entscheidet Feldkonflikte |
| M1 | „Ersetzen startet vom Default" ohne Reset — nach „Weitermachen" während des Fetch legt sich ein fremder Link über den vollen Plan | bestätigt | Block 3: `_STATE_DEFAULT`-Reset im Ersetzen-/Kein-lokal-Pfad, Harness-Fall K |
| M2 | behoben, **Folgefehler**: älterer eigener Link → `setCrew` → Crew-Sync löscht später ergänzte Gast-Links | bestätigt | `3eee06e9` (Zeitregel: älterer Link füllt nur Lücken), Harness-Fall J |
| M3 | behoben; Eigentext wird beim Motto-Wechsel überschrieben; führendes Leerzeichen bei leerem Namen | Ticket `invite.userEdited`; Leerzeichen Block 3 (3 Stellen) | Block 3 |
| M4 | **nicht** (Hauptpfad): Planer startet mit `age='6-8'`/16:30, der Vergleich mit der „alten Gruppe" griff beim ersten Eintrag nie; Deep-Link ohne Ende | bestätigt | Block 3: `endeNachGruppe()` + `endTimeManuell`, auch für `?alter=`, Harness `age_test` 7 Fälle |
| M5 | teilweise: eliteVariant/eliteOff/created und der IP-Drosselschlüssel `rl:plan:` fehlten in §11 | bestätigt | Block 3: §11 ergänzt, §10 „Missbrauchsschutz" für alle Drossel-Schlüssel |
| M6 | behoben (grep über Planer, Worker, DSE: keine Restzusage) | — | `37c3ae09` |
| M7 | teilweise: `· geplant` neben dem Live-Knopf (:1075) | bestätigt | Block 3 |
| m1 | behoben; enthüllter Plan blieb bei ungültiger Eingabe sichtbar (6-8-Fallback); `aria-invalid` nie entfernt | bestätigt | Block 3 (revealed einklappen, aria-invalid aufheben) |
| m2, m3, m5, m6–m13, m15, JSON-LD, Sitemap-Kern | behoben | — | `547868d3` / `37c3ae09` / `7de1cb98` |
| m14 | **neu kaputt**: `_EMO_LEAD` kannte keine Keycaps → „1️⃣ 1️⃣ Navigations-Test" | bestätigt | Block 3 |
| m16 | teilweise: Kriterium war das Präfix, nicht die Fehlerklasse | bestätigt | Block 3: Dauer nach Textlänge |
| Sitemap | Kern behoben; stille Pfade: geänderte/ungetrackte Datei → Datum des vorherigen Commits, Shallow-Clone → uniform, rein technische Historie → TODAY, %cs vs %as | bestätigt (1–3), (4) bewusst bei %cs belassen | Block 3: `git status` je Datei → TODAY, Shallow → Abbruch, ältester Commit statt TODAY |
| vorbestehend | `#iDeadline` nach Reload nie aus dem State befüllt; `sendMagicLinkModal` prüft nur `@` | mitgenommen | Block 3 |

Score 61 (Telemetrie): „Zwei fix-induzierte MAJORs auf genau dem Pfad, den M1 heilen sollte, plus M4 im Hauptpfad unwirksam; der Rest ist sauber umgesetzt." Beide MAJORs waren zum Zeitpunkt der Lieferung bereits in `3eee06e9` behoben — gefunden durch den eigenen Harness (Fälle H/I gegen den alten Baum rot), bevor der Reviewer fertig war. Tool-Limit am Ende erreicht, Liste vollständig.

**Block 3 committet:** `bb52e0d4` (Planer, paket-core, Datenschutz), `aeb5ccf9` (Sitemap-Generator), `25f7844b` (Technisch: Paket-Maschine — Manifeste w17, Cache-Buster, Rundlauf-Beweis grün). Lauf 7 = `3eee06e9`: 3 Rot (Stufe 18 → `bb52e0d4`, Stufe 67 → `25f7844b`, Stufe 70 = Stufe-72-Skript untracked, Bolles Entscheidung).

## Abschluss 07.09. — Block 4, Stufe 72, Läufe 8–10, Re-Check 2 und 3, Block 5

**Lauf 8 (`ea9f4d9e`):** genau ein Rot — Stufe 70, weil das Stufe-72-Skript des Prüfstands noch untracked war; Stufe 18 und 67 grün, Stufe 72 erstmals im Verbund grün (451 Blöcke / 245 Seiten).

**Stufe 72 committet (`152ba7b6`, Bolles Wort per AskUserQuestion):** exakt die drei Pfade und der Text des Prüfstands (`validate-all.sh` +19, `_dev/scripts/check-ldjson-parst.py` +169, `_dev/pruefstand/proben.py` 41/−10); jeder ld+json-Block muss parsen, Gegenprobe zweiarmig, zwei Proben im Prüfstand. Kopplung: die Probe sucht den FAQ-Fragestring im Planer-JSON-LD.

**Block 4 (`87a58a61`, aus dem Gegenlesen des Prüfstands zu Block 3):** (A) `_STATE_DEFAULT` wird vor der Init-Motto-Zuweisung kopiert (`motto: null`) — im Reset-Pfad mit nicht auflösbarem Motto (Custom-Motto von Gerät A, der Worker-Sanitizer lässt `custom-…` durch) lasen 17 Stellen `state.motto.*` auf null; jetzt Piraten-Fallback wie beim Init plus Flash („dein eigenes Motto trägst du auf diesem Gerät bitte neu ein"). (B) `endTimeManuell` reist nicht im Link — ein Link-Ende abseits der Gruppenvorgabe gilt als von Hand gesetzt. (C) Die Crew-Vereinigung nutzt `parseCrew()` beidseitig (ein Feld, ein Parser; `parseCrew` trimmt, fasst Leerraum zusammen, dedupliziert case-insensitiv, behält die Rohform). Harness `restore_test` 53/53 in 17 Fällen (N Custom-Motto, O Flag aus dem Link, P Semikolon-Namen), `age_test` 8/8, Wache 12/12. Zwei Klarstellungen des Prüfstands am Code beantwortet: der Fallback steht vor `_mottoVorher` (:3437 → :3445) und greift nur ohne auflösbares Link-Motto; die angehängten Crew-Namen sind der Anzeigetext.

**Lauf 9 (`87a58a61`):** **0 Rot, echter exit 0**, 71/71 Stufenköpfe, Banner „PASSED MIT WARNUNGEN: 8" (dieselben acht wie seit Lauf 5), Stufe 60 = 339 / 4187 unverändert, Stufe 70 grün (61 Skript-Aufrufe versioniert), 72 grün, 18 und 67 grün. Der gepushte `draft` ist damit maschinell abgenommen; Arbeitsbaum nur noch `AUDIT.md` + `SESSION-NOTES.md` (Prüfstand, „Ende").

**Ablauf-Vorfall beim Re-Check 2:** Der erste Lauf gegen `ea9f4d9e` (Chat `1a2c1624`, vom Prüfstand als Blindtest gedacht: findet der Reviewer A ohne Hinweis?) ging verloren — Bolle schickte versehentlich ein „?" in den Reviewer-Tab; der Prompt verschwand aus der Ansicht, kein Zweig-Umschalter, keine Antwort. Der Blindtest ist damit nicht messbar. Neustart in einem eigenen Tab gegen `87a58a61` (Block 3+4, Diff `76807ab9..87a58a61` auf dem Seitenzweig `review-material` = `10081791`, per Git-Plumbing ohne Berührung von HEAD/Arbeitsbaum), Chat `aa91931c`, Fable 5.1 · Maximal, mit Punkt 11 („gibt es noch einen Pfad, auf dem `state.motto` nach dem Restore null ist?"). Regel daraus: der Reviewer-Tab bekommt einen sprechenden Namen, und niemand außer der steuernden Session tippt hinein, bis das Ergebnis gelesen ist. Kuriosum: das claude.ai-Konto antwortete auf das „?" mit „Hallo Hannes" — Konto-Gedächtnis, an Bolle gemeldet.

**Was für „fertig" im V5-Sinn noch fehlt (nicht bei den Sessions):** 0 offene MAJOR aus dem laufenden Re-Check 2; Bolle liest Datenschutz §2/§10/§11; „ende deploy" (Netlify) **und** Worker-Deploy (`wrangler`, Bolles `cfut_`-Token — sonst bleiben Umleitung, Erinnerungsmail und Magic-Link tot); Live-Nachweis (302 auf `party.machsleicht.de/`, `/api/plan` POST/GET, `cf-cache-status`, Grep auf neue und entfernte Strings); danach GSC: Sitemap neu einreichen (51 lastmod-Änderungen) und URL-Prüfung für `/kindergeburtstag` und `/datenschutz`.

**Tickets aus diesem Tag (offen, nicht gebaut):** Magic-Link-Payload um Plan-Zeilen, Einladungstext, `endTimeManuell` und Partyseiten-Referenz erweitern (Sicherheitsabwägung editToken in 90-Tage-KV: Bolle); `invite.userEdited`-Flag, damit Motto-/Alterswechsel keinen Eigentext überschreiben; Restore bei aktiver Partyseite: geänderte Eckdaten müssen die Partyseite nachziehen oder fragen; Cron-Prüfskript als Stufe 73 (Prüfstand-Zone, Bolles Wort); `timeWindow` aus den Motto-Daten als Quelle für das Gruppen-Ende; Klassifikation je (Datei, Commit) für lastmod statt Sperrliste; Commit-Hygiene (ein Anliegen je Commit, technische Sweeps mit `Technisch:`) in LEKTIONEN (Prüfstand entwirft, Bolle sagt ja).

**Re-Check 2 (Chat `aa91931c`, Fable 5.1 · Maximal, gegen `87a58a61`, Diff `76807ab9..87a58a61`):** kein MAJOR; 12/12 Behauptungen im Kern belegt (Punkte 1–5, 7, 11, 12 behoben; 6, 8, 9 teilweise; 10 mit stillem Restpfad); fünf MINOR, ein Nebenbefund; Score 76 (Telemetrie). Stufe 3 am Code: alle fünf bestätigt, keiner verworfen.

| Nr. | Finding (Reviewer) | Stufe 3 | Block 5 |
|---|---|---|---|
| MINOR 1 | Crew-Vereinigung verlangt `state.crewText`; Alt-Stände (vor dem 31.07., `crew` ohne `crewText`) laufen in den Ersetzen-Zweig → der Sync streicht einen früher synchronisierten Namen samt Gast-Link | bestätigt (die Hydrierung :2821 hatte den Fallback, die Vereinigung nicht; der Sync-Kommentar :3011 benennt die Folge selbst) | `crewTextLokal()` = die Hydrierungsformel, von beiden Lesern benutzt; Harness Q/Q2 |
| MINOR 2 | `liveUpdateDate` prüft das DOM-Feld `#iDeadline`, das bis Stufe 4 leer ist → Reload + Datumswechsel auf Stufe 2 überschreibt den Eigentext | bestätigt (Resume und Link-Restore landen auf Stufe ≤ 3) | Entscheidung aus dem State; „war automatisch" = Merker oder Auto-Frist des alten Datums (`_altAuto`, vor dem Überschreiben berechnet); neuer Harness `frist_test` 6/6, gegen alt Fall 1 und 3 rot; Browser-Smoke |
| MINOR 3 | §10 nennt `rl:editmail` (IP/Stunde, ≤8, 2 h) und `rl:editmail:party` (je Party/Tag, ≤10, ohne IP, 48 h) nicht; §11 „Zwei-Stunden-Fenster" ≠ Stundenfenster mit 2 h Speicherdauer | bestätigt (grep `rl:` gegen den Text) | beide Sätze; **Rechtstext, Bolle liest** |
| MINOR 4a | Working-Tree-Regel kennt den `Technisch:`-Marker nicht; der git-sync-Skill ruft den Generator bei „Ende" VOR dem Commit → technischer Sweep = alle berührten Seiten heute | bestätigt, `.claude/skills/git-sync/SKILL.md:36` | Flag `--technisch` + sichtbarer Zähler und Hinweis in der Ausgabezeile; Reihenfolge im Skill = Ticket (Bolles Zone) |
| MINOR 4b | `%cs` (Committer-Datum) wandert bei Rebase/Amend ohne Inhaltsänderung | bestätigt als Risiko; Datenprobe `lastmod_as_vs_cs.py`: 244/244 Seiten heute gleich | `%as`; Generator im Baum idempotent (ohne und mit Flag, git-diff leer) |
| MINOR 5 | Block-4-(B) setzt das Flag auch für den Startwert 16:30 → jeder Alt-Stand der Gruppe 6-8 wird beim Restore auf demselben Gerät „manuell" | bestätigt (state-Literal :1468, Payload trägt endTime); dazu selbst gefunden: das Flag griff auch, wenn der lokale Wert gegen einen älteren Link gewann | Flag nur für ein Link-Ende, das jetzt gilt (`state.endTime === d.endTime`) und weder Gruppenvorgabe noch `_STATE_DEFAULT.endTime` ist; Harness R/R2/R3 |
| Nebenbefund | `_gleicherPlan` tot (`_ersetzt ⇒ _anders`), Kommentar „nur Datum anders" veraltet | bestätigt | entfernt; `anders_test` ohne `gleich` 12/12 |
| Notiz | Uhr-Skew Server-ISO vs. Geräte-`Date.now()` | bekannte Grenze | — |

Punkt 8 selbst nachgesehen: „· geplant" nur noch bei PDF light (:1081), Komplettpaket Print (:1088) und dessen origPrice-Restore (:2787).

**Block 5 (`7b808b93`):** 8 + 2 + 5 Ersetzungen (Planer, Datenschutz, Generator) per `block5_fix.py` (Asserts mit abgeleiteten Kontrollzahlen, ein Write je Datei, Spiegel-Trockenlauf vorab). Positivkontrollen: `restore_test` 59/59 in 22 Fällen (gegen `87a58a61`: Q, Q-setCrew, R, R2 rot), `frist_test` 6/6 (gegen alt: 1 und 3 rot), `anders_test` 12/12, `age_test` 8/8. Browser-Smoke im lokalen Server (Port 8766): 7 → 17:00, 10 → 18:00, manuell 17:30 bleibt; Eigentext-Frist überlebt Reload + Datumswechsel auf Stufe 2 und steht auf Stufe 4 im Feld; Auto-Frist ohne Merker zieht mit (13.11. → 28.11.); Konsole ohne Fehler. Review-Material `_dev/review/2026-09-07-block5.diff` (`dd7cf573`).

**Lauf 10 (Prüfstand, gegen `dd7cf573`):** **0 Rot, echter exit 0**, 71/71 Stufenköpfe, Banner „PASSED MIT WARNUNGEN: 8“ (dieselben acht wie seit Lauf 5), 102 grüne Zeilen; Stufe 18 (4 Paare, 0 Abweichungen), 60 (339/4187), 67 (152 Referenzen), 70 (alle versioniert), 72 (451/245) grün; HEAD-Ende = HEAD-Start, Arbeitsbaum nur AUDIT.md + SESSION-NOTES.md. Block 5 vom Prüfstand an der Quelle bestätigt: `crewTextLokal()` :2920 an :2821 und :3459, `_altAuto` :2467, Ende-Flag :3469 mit `state.endTime === d.endTime && d.endTime !== _STATE_DEFAULT.endTime`, `_gleicherPlan` weg, §10/§11 gegen die ungekürzte Schlüsselliste (8 Schlüssel: create/guestwrite×2/plan/wl/invphoto/editmail je 7200 s, editmail:party 172800 s ohne IP) deckungsgleich, Generator `%as`, `--technisch`, Zähler.

**Re-Check 3 (Chat `8e45240e`, frischer Tab, Fable 5.1 · Maximal, nur Diff `87a58a61..7b808b93`):** alle sechs Behauptungen halten am Code, **kein neuer MAJOR, kein neuer MINOR**. Der Reviewer hat die echten Funktionen (restorePlanFromLink, liveUpdateDate, crewTextLokal, parseCrew, fristAuto) in einen eigenen Node-Harness geladen und die Fälle ausgeführt, den Generator in einem Fixture-Repo (Author ≠ Committer, `Technisch:`-Commit, staged/unstaged/untracked) laufen lassen, die `_gleicherPlan`-Äquivalenz bewiesen und alle acht `rl:`-Stellen gegen §10/§11 gehalten. Score 90 (Telemetrie). Vier Restpfade, alle vorbestehend oder Folge eines Betreiber-Entscheids, keine Fix-Induktion — Stufe 3 am Code nachvollzogen, bewusst NICHT mehr im Block gefixt, damit der gepushte Stand exakt der reviewte bleibt; als Tickets:

- **R1 (vorbestehend):** der dritte Leser, der `_uebernimm`-Lückentest `!state.crewText`, hält einen Alt-Stand (crew ohne crewText) bei INAKTIVER Partyseite für leer → ein älterer Fremdgerät-Link mit weniger Namen ersetzt die lokale Liste (keine Gast-Links betroffen; Population: Saves vor dem 31.07. ohne Partyseite plus Link von einem zweiten Gerät). Fix: Lückentest über `crewTextLokal()`, Harness Q3.
- **R2 (Kehrseite des Maßstabs):** ein Alt-Stand ohne Merker, dessen Auto-Frist schon vor dem Diff veraltet war, gilt jetzt als Eigentext und friert ein — sichtbar und editierbar im Feld; vorher heilte das nur bei leerem Feld, um den Preis des Eigentext-Verlusts.
- **R3 (Folge des Entscheids „Startwert ist kein Beleg“):** ein von Hand gesetztes 16:30 bei 6-8/9-12 überlebt den Fremdgerät-Restore, stirbt aber beim nächsten Tastendruck im Altersfeld, weil das Flag nicht im Link reist. Schließt sich nur mit dem Flag-im-Link-Ticket (Payload-Erweiterung, Bolles Sicherheitsabwägung).
- **R4 (Rechnung für „Generator vor Commit“):** `--technisch` gilt pro Sitzung, nicht pro Datei (eine Inhaltsänderung in einer technischen Sitzung behält mit Flag still das alte Datum), und schützt nur diesen Lauf — folgt ein Commit ohne `Technisch:`-Betreff, stempelt der nächste Lauf alle berührten Seiten auf dessen Author-Datum. Beides löst nur die Reihenfolge im git-sync-Skill (Bolles Zone). Nits: `TODAY` ist UTC (`toISOString`), `%as` Ortszeit — zwischen 00:00 und 02:00 springt ein lastmod um einen Tag (dieselbe Lehre wie `defaultDate`); der Hinweis zählt neue Seiten als „falsches Datum“ mit; `setCrew` nach jedem Restore löst bei Neu-Ständen auch ohne neue Namen einen idempotenten Sync aus (ein POST).

**Stand „fertig“ im V5-Sinn (07.09., 21:00):** 0 offene MAJOR (Re-Check 3), Linter Lauf 10 grün (0 Rot, exit 0, 71/71), Browser-Smoke grün → `draft` = `dd7cf573` plus dieser Doku-Commit ist deploybar. Offen nur bei Bolle: Datenschutz §2/§10/§11 lesen, „ende deploy“ (Netlify) **und** Worker-Deploy (`npx -y wrangler deploy`, transienter `cfut_`-Token), Live-Nachweis (302 auf `party.machsleicht.de/`, `/api/plan` POST/GET, `cf-cache-status`, Grep auf neue und entfernte Strings), danach GSC (Sitemap neu einreichen, URL-Prüfung `/kindergeburtstag` und `/datenschutz`, Seiten- und 5xx-Bericht seit Juni ansehen).

**Review-Verlauf (Telemetrie, nur innerhalb dieses Tages vergleichbar):** Review 1 gegen `76807ab9` = 61 (2 fix-induzierte MAJOR, M4 unwirksam) → Block 3/4 → Re-Check 2 gegen `87a58a61` = 76 (0 MAJOR, 5 MINOR) → Block 5 → Re-Check 3 gegen `7b808b93` = 90 (0 MAJOR, 0 MINOR). Läufe 7 → 8 → 9 → 10: 3 Rot → 1 Rot → 0 Rot → 0 Rot.

**Tickets neu:** Reihenfolge im git-sync-Skill („Ende": Generator vor dem Commit) — nach dem Commit generieren oder das Skill fragt nach `--technisch`; Linter-Stufe „jeder `rl:`-Schlüssel im Worker hat einen Satz in der Datenschutzerklärung" (Prüfstand-Zone, Bolles Wort); das Frist-Feld lässt sich nicht leeren (renderInvitePreview :2586 füllt aus dem State nach) — vorbestehend, nicht angefasst.

## Deploy 07.09. — main, Worker, Live-Nachweis, GSC

**Bolles Wort:** „Ende deploy“ mit transientem `cfut_`-Token (07.09., ca. 21:15). Der Token wurde nur als Umgebungsvariable des einen wrangler-Aufrufs benutzt, nirgends gespeichert; Bolle löscht ihn im Cloudflare-Dashboard.

**Merge:** `main` = `f1edcfb4` (Merge-Commit per Plumbing `merge-tree` / `commit-tree` / `update-ref`, kein Checkout — ein Worktree im Scratchpad scheiterte an Windows „Filename too long“ unter `_dev/content-loop/runs/…`). Baum des Merges == Baum von `draft` `ef385c18`, main hatte nichts Eigenes. Der Arbeitsbaum des Prüfstands (AUDIT.md, SESSION-NOTES.md, ungecommittet) blieb unberührt; seine zwei Dateien kommen mit dem nächsten Deploy. Nebenbefund: `git worktree prune` kann `.git/worktrees/mlm` nicht löschen (Permission denied, Altlast).

**Netlify (Live-Nachweis auf der echten URL):** live nach 15 s, `cf-cache-status: DYNAMIC`, `Age: 0`. Neu vorhanden: `crewTextLokal` 4, `_altAuto` 1, „Plan-Link per E-Mail“ 3, `endeNachGruppe` 3. Weg: `_gleicherPlan` 0, Altersgruppen-Karten (`pickAge`) 0. Datenschutz live: §10 „erneute Zusenden des Bearbeitungs-Links“ 1, „Missbrauchsschutz“ 1, „Erinnerung 7 Tage vor der Party“ 1, „Zwei-Stunden-Fenster“ 0. Sitemap live: `/kindergeburtstag` lastmod 2026-09-07, genau eine URL mit dem heutigen Datum (nur Inhaltsseiten gestempelt).

**Worker:** `npx -y wrangler deploy` (wrangler 4.129.1), Version `e3bd7ec8-6a90-46e3-927e-d764afd829c1`, Upload 181 KiB, KV `PARTY` gebunden, Cron `0 8 * * *` registriert (erste Erinnerungsprüfung 08.09. 08:00 UTC), `keep_vars` hält die Secrets. Live: `GET party.machsleicht.de/` → 302 auf `machsleicht.de/kindergeburtstag`; `POST /api/plan` mit ungültiger Mail → 400 „Bitte gueltige E-Mail angeben“; `GET /api/plan/kein-token` → 400 „Ungueltiger Link“ (Formprüfung vor dem KV-Zugriff). Kein Test-Link mit echter Adresse angelegt (hätte eine Mail ausgelöst).

**GSC (Bolle, seit Juni nicht mehr drin):** Sitemap neu einreichen — sitemap.xml hat sich gegenüber dem Deploy vom 04.09. geändert (lastmod aus git, technische Commits übersprungen); URL-Prüfung `/kindergeburtstag` und `/datenschutz` mit „Indexierung beantragen“; Seiten-Bericht und 5xx-Zeile seit Juni ansehen. Erinnerung an Bolle gegeben; Klicks in seinem Chrome nur auf ausdrückliches Ja.

**Offen nach dem Deploy:** Prüfstands „Ende“ (seine zwei Dateien auf draft); Tickets aus dem Abschluss (R1 dritter crewText-Leser, `endTimeManuell` als Boolean im Payload, „Datum = Ortszeit, überall“ mit Grep-Stufe samt Gegenprobe, Skill-Reihenfolge Generator/Commit, `rl:`-Schlüssel-Stufe für die Datenschutzerklärung); erster Cron-Lauf 08.09. im Worker-Log prüfen (`reminder7:`-Zeile mit `ziel= gelesen= nachgezogen= gesendet= fehler= gecappt=`).

## Live-Re-Check 07.09. — Funnel hält; Block 6, Lauf 13, Re-Check 4

**Bolles Auftrag nach dem Deploy (07.09., ca. 21:30):** „Live Recheck des Funnels — du live durchklicken und parallel Agenten losjagen. Mal gucken ob der Funnel hält. Sollte es Befunde und Verbesserungen geben: schlank, einfach, geil, mit der Testsession abarbeiten im Loop."

**Eigener Live-Durchlauf** (Browser-Pane des Desktop-Clients, echte DOM-Events und input/click-Ereignisse, Testparty `78f89xfcbh5q` „Testlauf", 17.10., Crew Mia/Tim): Motto Piraten → Stufe 2; Alter 7 → endTime 17:00 mit Info-Box „Tagesplan 14:00–17:00", 10 → 18:00; Name/Datum/Gäste; „Weiter zur Einladung" → Stufe 4 (STAGE_ORDER 1, 2, 4, 3, 5); Einladung mit Titel „Ahoi, kleiner Pirat!", Body mit Name und Alter, Auto-Frist „bis 10.10.", zwei geschlossene <details>; Partyseite ohne E-Mail nur Flash (Pflichtfeld), mit kontakt@machsleicht.de → POST /api/create → live, Crew synchronisiert, Verwaltungs-Mail raus; Plan mit 9 Punkten 14:00–16:55 und shopMeta „ca. 78 € für 8 Kinder · 9,80 €/Kind · Liste für 6 Kinder gerechnet"; Checkout-Karten korrekt, Plan-Link-Modal, Versand an kontakt@machsleicht.de mit Flash „Dein Link ist unterwegs"; Resume nach Reload mit Banner „Testlauf's Piraten-Plan" und vollständigem State; Gästeseite mit Namens-Gate, Absender, Grobort, Datum, RSVP; Admin mit Zählern, Code-Hinweis, zwei persönlichen Einladungen mit Rollen, Wunschliste; Mias ?g=-Link mit Crew-Pass, RSVP „Dabei!" + Abholung → „Status: ✅ Du bist dabei!", Admin 1 dabei mit „Mia 🎟️ 🚗 Papa, 17 Uhr", Reload hält den Status; Paket-Pilot `/paket/piraten/?id=…&edit=…` mit Kopfzeile „Vorlage: 14:00–17:00 — der Plan unten läuft in euren Zeiten", Testlauf ×11, Mia in Rollenzettel/Urkunde/Küchen-Zettel (nur Zusagen), kein 16:30-Rest, Konsole leer. Grenzen der Methode: die Pane war versteckt (innerHeight 0) — Screenshots liefen in Timeouts, das Spiel-iframe maß 0×0 (85vh von 0), Layout-Messungen nach CSS-Transitionen sind dort unzuverlässig (Folge: F1, s. u.). Der Magic-Link-Restore wartet auf den Link aus der Mail (ms365-Connector nicht eingeloggt) — die Restore-Logik ist über `restore_test` 59/59 gegen die Live-Kopie und den Browser-Smoke vom Nachmittag belegt.

**Drei Subagenten als Messhelfer (kein Gate, Selbstmeldung zählt nicht — jede Zeile hat Kommando + Ausgabe im Bericht unter `scratchpad/live-recheck/`):** Agent 1 Integrität PASS 15/15 echt (Live-Planer byte-gleich mit main, Datenschutz bis auf Cloudflare-E-Mail-Obfuskation, Sitemap identisch; vier Positivkontrollen gegen die LIVE-Kopie grün; check-sitemap-live.py 0 Befunde; 136/136 Sitemap-URLs 200, 1× lastmod heute; 7 Assets 200; JSON-LD 6/6, FAQ HTML == FAQPage; alle rl:-Schlüssel in der DSE; formaler „FAIL": googleapis nur in drei Kommentarzeilen von /fonts/fonts.css). Agent 2 Worker-API PASS 34/34 (eigene Testparty `fmvqajqq3qt6` ohne E-Mail: create, Gastseite/?g=/Public-JSON, RSVP mit guestCount, Wunsch claim/unclaim, invites +Ben/−Ben, PUT, falscher editToken 403, /api/plan ungültig 400 / unbekannt 404 / zu kurz 400, waitlist ungültig 400, unbekannte Party 404, DELETE 200 → 404 ×3; Beobachtung: `_dev/docs/WORKER-CONTRACT.md` Stand 11.05. veraltet). Agent 3 Content-Regression PASS 15 / FAIL 2 (poss() gerade, ’s in Code 0, „· geplant" 3, Plan-Link 3, keine Gruppen-Karten, shopMeta + FAQ-Satz, Privacy-Sätze außerhalb Footer 1, 2 <details>, keine Google Fonts, Umami 1/gtag 0, Magic-Link-Zähler, DSE, Paket-Seiten mit Buster und Kopfzeile; FAIL erwartet: /paket/prinzessin/ 404 = gitignorierte Werkstatt; FAIL echt: Meta-Description > 160).

**Befunde (alle klein), Stufe 3 des Prüfstands an `f1edcfb4` bestätigt:** F1 Gäste-RSVP-Knopf bleibt nach Erfolg auf „⏳ Wird gesendet..." (Z. 2558 setzt, Erfolgspfad setzt nicht zurück) · F2 7× `mach’s` in Worker-Titeln/og:site_name/404/DOI trotz „gerader Apostroph überall" · F4 jede Partyseite holt /api/photo/<id> ohne Foto (404 pro Aufruf) · F5 unbekannter Pfad auf party.machsleicht.de = 9 Byte text/plain statt der HTML-Seite „Nicht gefunden" · F6 Meta-Description /kindergeburtstag 163 Zeichen. Kein Befund: fonts.css-Kommentar, prinzessin-404, Spiel-iframe (Pane-Artefakt), `nameReqHint` (statisch versteckt).

**Block 6 (`d95c9979`, Review-Material `db0937a6`):** F1 `btn.textContent="✅ Gesendet!"` im Erfolgspfad (disabled bleibt); F2 7× `mach's` (og:site_name nur Apostroph, Leerzeichen = Bolles Frage); F4 Guards `if(!${party.hasPhoto?"true":"false"})return;` in loadPhoto() und der Editor-IIFE; F5 Fallthrough: `/api/…` → JSON 404, sonst `notFoundPage()` als HTML 404; F6 „kompletter" gestrichen → 152 Zeichen. Zähler aus dem Baum, vom Prüfstand aus den Git-Objekten gegengezählt: `’` 7 → 0, `mach's` 11 → 18, hasPhoto-Guards +2, `notFoundPage(` 2 → 3, `"Not found"` 6 → 5, „Gesendet!" 1 → 2; node --check grün; Spiegel-Trockenlauf byte-gleich. **Lauf 13 (`db0937a6`): 0 Rot, echter exit 0, 71/71, Stufe 60 339/4187, 18 4/0, 72 451/245.** **Re-Check 4 (Chat `7c84f448`, frischer Tab, Fable 5.1 · Maximal, nur Diff `4f250852..d95c9979`): alle sechs Behauptungen halten, 0 MAJOR / 0 MINOR, Score 95** — Prüfweg: beide Worker-Stände als ESM syntaxgeprüft, alle Seitenvarianten (Gast mit/ohne/ohne-Feld Foto, Invite, Preview, Editor, 404, DOI, Creator) mit dem echten Template in Node gerendert, jedes Inline-Script geparst, Router mit Mock-KV gegen 19 Pfad/Methoden-Kombinationen. Hinweise ohne Schwere: (a) der 404-Text spricht von einer Party, auch für /impressum o. ä.; (b) `Cache-Control: no-store` am HTML-404 wäre konsistent zu json(); (c) F1 ist im Normalfall nur während des 0,4-s-Ausblendens von #rsvpFields sichtbar — meine Live-Beobachtung „Knopf bleibt stehen" war wahrscheinlich ein Layout-Artefakt der versteckten Pane, der Fix ist harmlos und richtig, aber kein Nutzerproblem. Altbestand-Kante F4: Partys mit Hero-Foto von vor dem 12.07. ohne `hasPhoto`-Feld lüden das Foto nicht mehr — KV enthält nur Testpartys, der Planer sendet nie `photo`.

**Testparty gelöscht:** DELETE /api/party/78f89xfcbh5q mit editToken → 200 `deleted:true` (20:24 UTC), danach Gastseite, Mias ?g=-Link und Public-JSON je 404 (Log `scratchpad/live-recheck/testparty-delete.log`). Agent 2 hatte seine Party `fmvqajqq3qt6` selbst gelöscht (Log Nr. 31–34). Der Cron am 08.09. 08:00 UTC zielt auf Partys am 15.09. — keine Testparty im Ziel.

**Offen nach diesem Nachtrag:** Deploy von Block 6 (Netlify-Merge + Worker mit NEUEM `cfut_`-Token) nur auf Bolles Wort; danach Live-Greps: Titel mit geradem Apostroph, kein /api/photo-404 auf einer Gastseite ohne Foto, `curl -sI party.machsleicht.de/gibt-es-nicht` → text/html, Description 152; Magic-Link-Restore live sobald Bolle den Link liefert (Frisch-Gerät-Pfad; Same-Device-Pfad ist über Harness + Smoke belegt); Bolles Fragen: og:site_name mit Leerzeichen als EINE `BRAND`-Konstante (Prüfstand-Empfehlung), 404-Text für Nicht-Party-Pfade; Tickets: WORKER-CONTRACT.md aktualisieren, fonts.css-Kommentar (Prüfstand-Zone), Cron-Log 08.09. prüfen.

## Block 7 (08.09.) — Marke, Editor-Knöpfe, Motto-Vorschaubild, Rolle im WhatsApp-Text; Läufe 14–22; Re-Checks 5–8; Deploy

**Bolles Antworten am Morgen des 08.09. (per AskUserQuestion und Chat, strukturiert):**
1. Block 6 jetzt deployen; Token kommt im Chat (Bolle lässt ihn gültig, bis „Token kann weg" gesagt ist — ein Token für Block 6 und 7).
2. Markenname „mach's leicht" mit Leerzeichen, als EINE Konstante (Prüfstand-Empfehlung übernommen).
3. Plan-Link-Test: der Link aus der Mail kommt im Chat.
4. Neu (Screenshot WhatsApp): die Vorschau einer persönlichen Einladung soll persönlich sein — Kinderfoto, wenn hochgeladen, sonst Motto-Bild. Rückfrage „wird der Link dann lang?": nein, das Bild steht in den Meta-Tags, nicht im Link. Entscheidung: Motto-Bild jetzt (F8), Kinderfoto nur als Opt-in im Editor („Lass uns trotzdem fragen") in einem eigenen Block — der Planer schickt heute nur `photoRound` (Spiel-Foto), nie `photo`; das Opt-in braucht also auch den Weg vom Spiel-Foto zum 1200×630-Vorschaubild.
5. Neu (Screenshot Editor): die drei Knöpfe je Kind („📋 💬 ✕") versteht selbst Bolle nicht → F7, Wort dazu.
6. Neu, drei Produktpunkte: (a) der Plan kommt erst nach Einladung und Partyseite, im Editor gar nicht — „fühlt sich an, als würden wir das Versprechen brechen, wenn die über SEO kommen und nur 'n Plan wollen"; Bolle will die Entscheidung nach hinten stellen und hat meine Einschätzung bekommen (Plan direkt nach den Eckdaten + Knopf „Zum Plan" im Editor; die Partyseite verlängert den Plan, ersetzt ihn nicht). Offen. (b) Rollen werden vergeben, aber nicht in der Einladung genutzt → Entscheidung: Rolle im persönlichen WhatsApp-Text nennen (F9); die Gruppen-Einladung im Planer ist nicht pro Kind, dort geht keine Rolle. (c) Rollen im digitalen Paket: ja — Rollen-Zettel und Urkunde (Paket Teil IV) sowie Crew-Pass auf der persönlichen Gästeseite.
7. Meta: „Wichtig, dass du nichts vergisst. Strukturier meine Antworten … stelle Fragen … arbeite mit der Testsession ab."

**Block 7 (`142ece9f`, „Technisch:", Review-Material `68bf9089`):** `const BRAND = "mach's leicht"` im Worker (12 Vorkommen: Definition, 3 Mail-Absender-Fallbacks, 5 Titel, 2× og:site_name); og:site_name auf 66 statischen Seiten und im Hub-Generator vereinheitlicht (vorher vier Schreibweisen, u. a. 21 Motto-Seiten ohne Apostroph), index.html og:title dazu; F7 Editor-Knöpfe „📋 Link kopieren" / „✅ Kopiert" / „💬 WhatsApp" / „✕ Entfernen"; F8 og:image ohne Foto = `https://machsleicht.de/og-<mottoId>.png` aus `OG_MOTTOS` (30 Slugs, aus den og-*.png im Repo-Root abgeleitet), sonst og-home.png, plus 1200×630 und twitter:card; F9 WhatsApp-Text „Mila, du bist als Kronen-Wächter eingeladen: …". Positivkontrollen: Spiegel aus `git archive` (245 Seiten, 30 og), Baum byte-gleich, node --check grün, Zähler: mach's leicht im Worker 1, mach'sleicht 0, ’ 0, BRAND 12, og:site_name 66/66. Messfalle des Tages: der vermeintliche Backslash-Apostroph („mach\\'sleicht") in 44 Dateien war ein repr()-Artefakt der Anzeige, nicht der Datei — Muster statt Abschrift hat es aufgelöst. Betreff „Technisch:", weil kein sichtbares Wort geändert wurde (lastmod bleibt).

**Läufe des Prüfstands:** Lauf 14 (`4de6dcba`, gestern spät, 0 Rot) · Lauf 15 (`68bf9089`) **ungültig** — mein Generatorlauf für Block 7b und sein Lauf haben sich gekreuzt (Log-Fuß: HEAD-Ende ≠ HEAD-Start, wie gebaut); daraus die Protokoll-Verschärfung: „Strom offen" ist eine Anfrage, geändert wird erst nach seinem „Strom frei". Lehrreich: Stufe 36 war in dem Lauf rot („baustelle-*-jahre.html weicht vom Maschinen-Ergebnis ab") — die Stufe hat den R2-Fall selbst gefangen. · **Lauf 16 (`649c4da5`): 0 Rot, echter exit 0, 71/71**, Stufe 36 3/0, Stufe 60 339/4187, Stufe 65 4 Listen, Stufe 71 325 Bild-Verweise (og:image-Block zählt mit), Stufe 72 451/245.

**Block 7b (`649c4da5`, Prüfstand-Befund V5-R2 zu Block 7):** `_src/generate-age-pages.py:678` schrieb weiter `og:site_name` „machsleicht" — die drei baustelle-Seiten (GATE_SCOPE der Maschine) waren nur von Hand gedreht. Generatorzeile auf die Marke, Maschinenlauf blank (3 Seiten) + `regeln-drucken.py` (45 Seiten, 850 Regeln, 3 Seiten wieder vollständig), Kontrollzahl `git diff --stat -- kindergeburtstag/` LEER, `--check` 0 Seiten geändert. Die übrigen 18 Altersseiten sind eingefrorene Hand-Seiten (pferde/ritter nur mit `--motto`), dort bleibt der Sweep die Wahrheit. `OFFENE-REVIEW-PUNKTE.md` Nr. 1 (17.07., og:site_name) als erledigt markiert. Repo-weit kein weiterer Generator mit og:site_name (Messfalle: mein erster Grep lief nur über `_dev/scripts`, nicht `_src`).

**Re-Check 5 (Chat `59d759a6`, frischer Tab, Fable 5.1 · Maximal, Diff `4de6dcba..142ece9f`):** Code-Handwerk sauber (beide Worker-Stände node --check, 8 Render-Varianten, beide Generatoren real ausgeführt, alle 30 og-PNG per Header + OCR), **aber 1 MAJOR + 4 MINOR, Score 72.** MAJOR: `og-prinzessin.png` ist byte-gleich `og-frozen.png` (md5, OCR „Frozen-Eiskönigin") — F8 hätte jede fotolose Prinzessin-Party mit dem Frozen-Banner in WhatsApp gezeigt. MINOR: (1) index.html halb gedreht (og:image:alt, twitter:title, 5 JSON-LD-Namen) + einladung/index.html WebSite-Name; (2) Altersseiten-Generator schreibt zurück — in 7b bereits zu; (3) Hub-Generator `einladung-hub-gen/generate.js` parst nicht (SyntaxError Z. 78) — Ursache laut Prüfstand sein Template-Sweep `a96fc8c6` vom 07.09., er repariert in seiner Zone, Beweis: Rundlauf muss die 43 Hub-Seiten byteidentisch liefern; (4) drei Wort-Knöpfe machen die Einladungszeile auf 375 px dreizeilig. Produkt-Hinweise: Motto-Bilder sind SEO-Banner („Spiele, Deko & Ablauf … Kostenlos"), als Party-Vorschau lesen sie sich als Werbung; dschungel/feen/superheld ohne Bild (og-home); Logo-Markup `mach's<span>leicht</span>` auf ~83 Seiten ist Gestaltung. Stufe 3 (ich + Prüfstand): MAJOR bestätigt, und schwerer — `og-prinzessin.png` wird HEUTE schon von drei Prinzessin-SEO-Seiten referenziert (einladung/prinzessin, /vorlagen, kindergeburtstag/prinzessin; Datei am 30.05. per Hand als Kopie angelegt, `41e58176`), die zeigen beim Teilen seit Mai das Frozen-Banner; zweite Dubletten-Gruppe `og-default.png` == `og-home.png` (wohl Absicht, eine redundant); kein Banner-Generator im Repo.

**Block 7c (`bfdd41a9`, „Technisch:", Review-Material `9223c790`):** `OG_MOTTOS` enthält nur Slugs mit eindeutigem Bildinhalt (md5-Gruppen abgeleitet: 30 → 26; default/home/frozen/prinzessin fallen auf og-home.png zurück, Kommentar nennt den Grund); index.html 7× und einladung/index.html 1× „mach'sleicht" → „mach's leicht" (Meta + JSON-LD); F7 kürzer „📋 Link" / „💬 WhatsApp" / „✕ Entfernen", „✅ Kopiert!" 2000 ms wie die Nachbar-Knöpfe, fester Umbruch nach Name+Rolle (immer zwei Zeilen); BRAND-Kommentar korrigiert. Spiegel-Trockenlauf, node --check grün, Zähler aus Vor-/Nachzustand. Hub-Seiten und `generate.js` bewusst unberührt (Prüfstand-Zone während der Reparatur). Abstimmung Stufe 65: Paar „Set == eindeutige og-*.png"; Dubletten selbst als eigene Klasse (b), zu Recht rot bis Bolle entscheidet.

**Bolles Antworten, zweite Runde (08.09.):** Prinzessin → echtes Bild gestalten (Design-Ticket), keine Löschung; Google-Rest (31 Seiten, Prüfstand) → „Ja, heute mit raus" (Wort direkt an den Prüfstand nötig); Hub-Generator → „guck mal tiefer rein, das muss doch 'n Grund haben". **Git-Archäologie:** letzter echter Generatorlauf `285937e5` (10.06., P6-1 Rollout); seitdem 68 Commits direkt auf den 30 Hub-/Vorlagen-Seiten — Audit-Welle 1e (34 Seiten), Welle 2/2b (14), P0/P0b (15), UX-Wellen, Gutachten-Fixes, Schrift-Sweep (46), Marken-Sweep (31); je Seite klein (piraten 18+/15−: Titel, Description, FAQ-Antworten, Rechtsfooter). Grund: Arbeitsmodus „Welle korrigiert die Ausgabe" (Helfer v3/v4), die Regel R2 „Maschine statt Ausgabe" kam erst im August; die `wave-*.js`-Daten wurden nie nachgezogen. Empfehlung: zurückportieren als eigener Block (Sweeps → Template, Copy → wave-Daten, Abnahme = byte-gleicher Rundlauf), sonst driften 15 Hubs bei jeder Welle weiter. Entscheidung Bolle.

**Lauf 17 (Prüfstand, gegen `9223c790` + seine Zone):** genau ein Rot, Stufe 65 (sein neues Paar OG_MOTTOS ↔ og-*.png): „frozen ohne Slug" (7c-Set) und „prinzessin ohne Slug" (Dublette); sonst 71/71, Stufe 36 3/0, 70 61 versioniert, 71 325, 72 451/245 — ohne das neue Paar wäre der Lauf grün, das Rot ist kein Block-6/7-Defekt, sondern zeigt genau den 7c-Fehler.

**Block 7d (`8762204c`, Prüfstand-Einwand zu 7c):** „eindeutiger Bildinhalt" war zu stumpf — bei einer Dublette ist EINES der Bilder echt; frozen wäre stillschweigend auf og-home gefallen. Jetzt: OG_MOTTOS = alle og-*.png-Slugs ohne home/default (Rückfallbilder, keine Mottos) und ohne prinzessin als benannte Ausnahme mit Grund und Datum (Kopie von og-frozen.png seit 41e58176; Design-Ticket Bolle 08.09.) = 27. Prüfstand trägt die Ausnahme in BEKANNTE_LUECKEN seines Paars ein (Grund + Datum, Bolles Wort via mich). Lehre: Dubletten-Regeln brauchen eine Richtung — welches Bild ist echt? — sonst verliert man das Original mit der Kopie.

**Lauf 18 (`95a857ae` + Zone): 0 Rot, 71/71**, Stufe 65 OG_MOTTOS 27 / Platte 28 mit prinzessin als bekannte Lücke 0 FAIL, 36 3/0, 70 61 versioniert (generate.js-Reparatur + 31 Hub-Seiten des Prüfstands inklusive), 71 325, 72 451/245. **Lauf 19 (`ff643a0e` + Zone, nach 7e): 0 Rot, 71/71**, Stufe 60 rendert die Editor-Variante mit dem Zeile-2-Container, 65 = 5 Listen / 0 FAIL.

**Bolles dritte Runde (08.09.):** Re-Check 7 für 7d+7e JA (Deploy-Regel ohne MINOR-Ausnahme — der Prüfstand hatte zu Recht angemahnt, dass „kein Re-Check für 7e" eine stille Abkürzung wäre); Startseiten-Prosa „Warum mach's leicht?" JA; sein Wort für die drei Commit-Gruppen des Prüfstands (Doku; Stufe-65-Paar; „Technisch:" generate.js + 31 Google-Zeilen) gibt er direkt in dessen Session. **Block 7f (`48ecc3ec`):** index.html h2 „Warum machsleicht?" → „Warum mach's leicht?" — einzige sichtbare Prosa-Stelle, kein React-Zwilling in js/index.js (geprüft). Sammel-Diff 7d+7e+7f als `_dev/review/2026-09-08-block7def.diff` (`883af980`).

**Lauf 20 (`883af980` + Zone, Endstand für Re-Check 7): 0 Rot, echter exit 0, 71/71**, Stufe 5 „Products: 4 live", 60 339/4187, 65 5 Listen / 0 FAIL, 72 451/245. Damit sind Block 6, 7, 7b, 7c, 7d, 7e und 7f maschinell grün; Deploy-Gate = Re-Check 7 + Bolles Token (+ sein Wort an den Prüfstand für dessen drei Commit-Gruppen, damit die 31 Google-Zeilen mit in den Merge kommen).

**Re-Check 7 (Chat `a36e44c3`, frischer Tab, Fable 5.1 · Maximal — der letzte auf Fable, Kontingent 99 %; Diff `9223c790..48ecc3ec` = 7d+7e+7f):** Messaufbau Playwright-Chromium mit dem echten `fonts/dmsans.woff2` und Noto Color Emoji, Editor aus dem Worker in Node-vm gerendert, blobloser Clone am Stand. **0 MAJOR, 3 MINOR, Score 82.** 7d behoben (Set 27 = Dateien minus home/default/prinzessin, Set-Diff leer; Render frozen → og-frozen, prinzessin → og-home, leer/undefined/„__proto__" → og-home; Blob-Historie: prinzessin seit 41e58176 mit dem Frozen-Blob). 7e zweizeilig auf 300–412 px, Klick → „✅ Kopiert!" ohne Geometrie-Änderung, Farbe #C62828 erhalten, 0 Konsolenfehler — ABER MINOR 1: „💬 WhatsApp" (79 px Text) wird auf 360-px-Androids zu „WhatsA…" (Inhalt 75 px; Grenze ≤ 369 px), „✕ Entfernen" ab ≤ 345 px — fix-induziert (vorher Umbruch, jetzt Kappung); meine „~330 px"-Erwartung stammte aus einer Rechnung ohne Emoji-Glyph. MINOR 2: die neue h2 steht im SEO-Fallback in `#root`, den React 18 beim ersten Render leert — sichtbar ist `js/index.js`, und dort steht dreimal „machsleicht" in Prosa; site-weit ~117 sichtbare Prosazeilen in 70 Dateien, 30 Breadcrumbs, 8 Titles mit bare „machsleicht" (Vorbestand, Bolle-Frage zum Umfang). MINOR 3: mein OG-Kommentar behauptet ein Stufe-65-Paar, das an HEAD nicht existiert (Prüfstand-Zone uncommittet) — bis zu seinem Commit driftet das Set beim nächsten og-Bild still. Nebenbei: 20-Zeichen-Namen brechen Zeile 1 ab ≤ 350 px (Vorbestand); die Kommentarzeilen im Template-Literal werden ins Browser-Skript ausgeliefert (Praxis der Datei). Sammel-Diff war gefiltert (ohne die zwei Diff-Dateien), nicht falsch.

**Block 7g:** Knopf-Labels ohne Emoji („Link", „WhatsApp", „Entfernen", passt bis ~300 px), `js/index.js` drei Sätze auf „mach's leicht" (React-Zwilling der Startseite), OG-Kommentar ehrlich („Gegenprobe: Stufe 65, Paar OG_MOTTOS ↔ og-*.png, Prüfstand 08.09."). Lauf 21 + Re-Check 8 (Opus 5 Max).

**Block 7g (`2ad071d6`, Review-Material `e897f439`):** Knopf-Beschriftungen ohne Emoji („Link" / „Kopiert!" / „WhatsApp" / „Entfernen"), `js/index.js` trägt die Marke in denselben drei Sätzen wie der SEO-Fallback (Bolle: „nur Startseite, beide Fassungen"), OG-Kommentar als Gegenprobe benannt. **Selbst gemessen statt geschätzt** (Canvas, `document.fonts.load('600 12px "DM Sans"')` auf der Live-Seite, also die echte selbst gehostete Schrift): „Link" 23,7 px, „Entfernen" 56,9 px, „WhatsApp" 61,3 px, „Kopiert!" 45,7 px; alt: „💬 WhatsApp" 80,7 px, „✅ Kopiert!" 65,1 px. Inhaltsbreite je Knopf = ((Viewport − 74) − 12)/3 − 16: 320 px → 62, 345 → 70, 360 → 75, 375 → 80. Engpass „WhatsApp" passt ab 319 px; unter 320 px greift die Ellipse, das Layout bleibt zweizeilig. **Eigener Trockenlauf-Fang:** mein Erklär-Kommentar stand zuerst mitten in der Mehr-Anweisungs-Zeile von `bX` und hätte `bX.style.color="#C62828"` verschluckt — der Spiegel zeigte es, der Kommentar steht jetzt hinter der Farbe. (Klasse: `//` in einer Zeile mit mehreren Anweisungen schaltet den Rest still ab.)

**Modellwechsel:** Bolles Fable-Kontingent war nach Re-Check 7 bei 99 % (Reset 10.09.). Ab Re-Check 8 läuft der unabhängige Reviewer auf **Opus 5 Maximal** (Bolles Wort, im Model-Picker gesetzt und verifiziert).

**Lauf 21 (`e897f439` + Zone): 0 Rot, 71/71**, Stufe 60 339/4187, 65 5 Listen / 0 FAIL, 72 451/245.

**Re-Check 8 (Chat `44a31d36`, **Opus 5 Maximal**, Diff `883af980..2ad071d6` = 7g): 0 MAJOR, 1 MINOR, Score 88.** Der Reviewer hat den Worker als ES-Modul geladen, den Editor in jsdom ausgeführt und `js/index.js` mit echtem React 18 gerendert: Knöpfe „Link"/„WhatsApp"/„Entfernen" ohne Emoji, beide Tooltips erhalten, `getComputedStyle(bX).color = rgb(198,40,40)` überlebt das spätere `cssText+=`, Klick → „Kopiert!" → nach 2000 ms zurück, 12 Inline-Skripte parsen, sichtbar 3× „mach's leicht" und 0× bare „machsleicht" (Rest: Logo-Spans, party-URL). Seine Geometrie aus dem echten `dmsans.woff2` (HarfBuzz, wght 600, 12 px, mit Kerning) deckt sich mit meiner Canvas-Messung auf 0,03 px: „WhatsApp" 61,27 px, passt bei 320 px mit 0,73 px Reserve; alle sechs Breiten zweizeilig; genau eine Stelle im Editor-HTML hat `text-overflow`, die übrigen Emoji-Knöpfe brechen um statt zu kappen. **MINOR (mein Fehler):** der „ehrliche" OG-Kommentar aus 7g gab der unbelegten Behauptung Dateiname und Prüfdatum — `check-freischaltlisten.py` hatte vier Paare, keins für OG_MOTTOS, `BEKANNTE_LUECKEN` leer. Klasse: ein Beleg, der präziser klingt als die Messung dahinter (dieselbe Klasse wie „0 Seiten mit Google-Bezug", während 31 den Preconnect trugen). **Block 7h (`65010ebd`)** schreibt den Satz als offenes Ticket, in der Fassung des Prüfstands: „heute prüft keine Stufe, ob dieses Set zu den og-*.png passt — ein neues Motto-Bild fällt still auf og-home."

**Commits des Prüfstands unter meinem Mandat** (Bolle: „nur fun macht deployments du bist test session" + sein „Ja, beides committen"): **`2056c826`** = Stufe 65, fünftes Paar OG_MOTTOS ↔ og-`<motto>`.png mit `prinzessin` als benannter Lücke (sein Betreff und Rumpf wörtlich, 2 Pfade); **`26a715ce`** = „Technisch: letzter Google-Kontakt raus (www.gstatic.com auf 31 Einladungsseiten), Hub-Generator parst wieder" (32 Pfade). Seine Gruppe C (SESSION-NOTES, AUDIT) bleibt liegen bis zu Bolles „Ende". **Zwei Lehren aus dem Übergabe-Vorgang:** (1) seine getippte Pfadliste war eine Zeile kürzer als der Baum (`einladung/whatsapp/index.html` fehlte, weil er „15 Mottos × 2" abgeleitet statt gelesen hatte) — seine Zahl 31 stimmte für Seiten und war für Pfade falsch; (2) ich hatte die Pfade aus `git status` erzeugt, was „git add -A in Verkleidung" ist — richtig ist: seine Liste lesen, Abweichung melden, dann committen. Nachkontrolle danach: seine korrigierte Liste abgetippt und gegen `git show --name-only` gestellt, A 2/2 und B 32/32, nichts fehlt, nichts zu viel; Inhalt belegt (31× +0/−1, überall dieselbe preconnect-Zeile; generate.js 1+/1−).

**Ticket aus Re-Check 8 (Kosmetik, Bolles Schlusspunkt-Regel):** 0,73 px Reserve bei 320 px — `font-size:11px` oder `gap:4px` senkt die Grenze auf ~300 px.

**Lauf 22 (`26a715ce`, Deploy-Gate): 0 Rot, echter exit 0, 71/71**, Stufe 60 339/4187, **Stufe 65 = 5 Listen** (das neue Paar liegt jetzt im Repo statt in der Arbeitskopie), Stufe 70 = 61 Skript-Aufrufe alle versioniert (auch `generate.js` und `check-freischaltlisten.py`), Stufe 72 451/245. 59 Commits seit `2fd73ab3`, 22 Läufe (21 gültig).

**Deploy 08.09. (Bolles Token, „nimm den"):** `main` = **`0775f202`** (Merge per Plumbing, Baum == `draft` `26a715ce`), Worker-Version **`2ca726e6-b220-4dc1-9d5e-89eb265eff56`** (183,17 KiB, KV gebunden, Cron `0 8 * * *`). Netlify live nach 15 s, `cf-cache-status: DYNAMIC`. **Live-Nachweis:** Startseite `og:site_name` „mach's leicht", Prosa-h2 „Warum mach's leicht?" 1×, bare „machsleicht" in JSON-LD 0, `js/index.js` 3× „mach's leicht"; Planer description 152 Zeichen, `crewTextLokal` 4×; Hub piraten `gstatic|googleapis` 0; Worker Root 302, `/gibt-es-nicht` 404 `text/html`, `/api/plan` 400. Zwei fotolose Testpartys angelegt und gelöscht (DELETE 200 → 404): **piraten → `og-piraten.png` 1200×630 + `twitter:card summary_large_image`**, **prinzessin → `og-home.png`** (benannte Ausnahme greift live), Editor-Knöpfe je 3 ohne Emoji, Rolle im WhatsApp-Text vorhanden. Token danach als „kann weg" gemeldet.

**Offen für Bolle (Tickets, nichts davon eilig):** echtes `og-prinzessin.png` (Design; bis dahin zeigen die drei Prinzessin-SEO-Seiten weiter das Frozen-Banner, die Partyseiten das neutrale); Plan-Link-Test auf fremdem Gerät (Link aus der Mail); Plan-Fokus im Funnel (Plan erst nach Einladung/Partyseite, im Editor gar nicht — meine Empfehlung: Plan direkt nach den Eckdaten plus „Zum Plan" im Editor); Kinderfoto als Vorschaubild nur mit Einwilligung im Editor; Hub-Generator zurückportieren oder als eingefroren markieren (32/32 Seiten weichen ab, 68 Commits seit dem letzten Lauf am 10.06.); Marken-Prosa site-weit (~117 Zeilen, 30 Breadcrumbs, 8 Titles) bewusst unverändert; `og-default.png` == `og-home.png` (eine Datei redundant); Lizenzmarken- und Nicht-Party-Slugs in OG_MOTTOS (Klasse „Set ⊆ erlaubte Partymottos"); Knopf-Reserve 0,73 px bei 320 px (`font-size:11px` oder `gap:4px` → Grenze ~300 px); Stufen-Kandidaten des Prüfstands: „jedes Skript in `_dev/scripts` parst" und „kein Google-Host in ausgelieferten Dateien"; `_dev/docs/WORKER-CONTRACT.md` (Stand 11.05.) veraltet; GSC: Sitemap neu einreichen + zehn URLs prüfen (Liste im Chat).

**Re-Check 6 (Chat `76e48879`, frischer Tab, Fable 5.1 · Maximal, Diff `649c4da5..bfdd41a9` = 7c):** MAJOR aus Re-Check 5 geschlossen und nachgemessen (md5 über 30 Dateien: 28 Hashes, zwei Paare; Set-Diff leer; Render prinzessin → og-home, mit Foto → /api/ogimg; OCR aller 30: jede eindeutige Datei trägt ihren Slug-Text), Marke vollständig (JSON-LD 6+3 parsen, Stufe 72 451/0; Randnotiz: die Blöcke heißen WebApplication, nicht SoftwareApplication), **0 MAJOR, 3 MINOR, Score 84.** Blindtest: den 7c-Ausschluss von frozen hat der Reviewer gesehen und als folgenlos eingestuft (Lizenzmarken über Chips nicht erreichbar) — das Stufe-65-Paar des Prüfstands war strenger. MINOR-1: F7 in headless Chromium mit den echten Fonts (DM Sans, Noto Color Emoji) auf 375/390/412/414/430 px gemessen — die drei Knöpfe brauchen 325 px, verfügbar sind 301 px → auf 375/390/393 px deterministisch DREIZEILIG, zweizeilig erst ab 412 px; mein Kommentar „geschlossen in Zeile 2" war eine Behauptung ohne Messung. MINOR-2: während „✅ Kopiert!" (103 px, 2 s) springt „Entfernen" auf 412/414 px in Zeile 3 und zurück. MINOR-3: BRAND-Kommentar „seitenweit vier" am Vorzustand nicht belegbar (im ganzen Baum nur gerader Apostroph; zwei Literal-Schreibweisen, dazu Logo-Markup und apostrophloses „machsleicht"). Nebenbefunde: OG_MOTTOS führt 7 Lizenzmarken- und 8 Nicht-Party-Slugs (mottoId-Sanitizer lässt jeden Slug durch; Creator liest `?mottoId=`, ist aber per 302 unerreichbar) — Ticket; der Kommentar „Paar in Stufe 65" beschreibt die noch uncommittete Prüfstand-Zone; index.html `<h2>Warum machsleicht?</h2>` nennt die Marke in sichtbarer Prosa apostrophlos (Bolle-Frage). Lehre (wieder): Layout-Aussagen nur mit Messung — der Reviewer hatte Chromium, ich nicht.

**Block 7e (nur party-worker.js):** die drei Knöpfe in einem eigenen Zeile-2-Container (flex-basis 100 %, display flex, gap 6 px) mit `flex:1 1 0; min-width:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-size:12px; padding:8px 6px` — Umbruch ist damit per Konstruktion ausgeschlossen, auf jeder Breite zwei Zeilen; das Null-Höhen-Umbruchelement (doppelter row-gap) entfällt; BRAND-Kommentar auf den belegten Wortlaut. Kein weiterer externer Re-Check (MINOR-Klasse, Layout + Kommentar); Abnahme: node --check, Lauf 19, Live-Smoke im Editor nach dem Deploy.

**Tickets neu:** Kinderfoto als Vorschaubild (Opt-in im Editor, Spiel-Foto → 1200×630, Text in der DSE); Plan-Fokus/Reihenfolge (Bolles Entscheidung, Empfehlung dokumentiert); **Prinzessin-Banner** (Bolle: echtes `og-prinzessin.png` gestalten ODER Dublette löschen und die drei SEO-Seiten + `wave-c.js` auf og-home stellen — bis dahin zeigen die drei Seiten das Frozen-Banner, seit 30.05.); `og-default.png` == `og-home.png` — eine Datei redundant; Motto-Bilder als echte Party-Vorschau (ohne SEO-Claims) statt SEO-Banner; Stufen-Kandidaten (Bolles Wort): (a) „jedes Skript in `_dev/scripts` parst" (node --check / py_compile), (b) „keine zwei og-*.png byteidentisch" (Ausnahme nur mit Grund und Ablaufdatum), Stufe-65-Paar OG_MOTTOS ↔ eindeutige og-*.png (Prüfstand baut); Hub-Generator: vom Prüfstand repariert (1 Zeile, sein Sweep `a96fc8c6` hatte den schließenden Backtick von HEAD_COMMON erwischt; 15/15 Skripte parsen), aber VERALTET — Rundlauf im Klon weicht in 32/32 Hub-/Vorlagen-Seiten ab (Monate Redaktion, die `wave-*.js` nicht kennen) → die Hubs sind eingefrorene Hand-Seiten, Bolle entscheidet „zurückportieren oder einfrieren", bis dahin nie laufen lassen; **Google-Rest** (Prüfstand, 08.09.): 31 einladung/*-Seiten trugen noch `<link rel="preconnect" href="https://www.gstatic.com">` — Kontakt zu Google beim Aufruf, DSE §5 verspricht das Gegenteil; entfernt (+0/−31, uncommittet in seiner Zone, Commit auf Bolles Wort — sollte mit dem nächsten Deploy raus); Stufen-Kandidat „kein Google-Host in ausgelieferten HTML/CSS/JS" (Agent 3 prüfte nur Font-Links, nicht preconnect); Kinderfoto-Weg im Planer (`photo` vs. `photoRound`) dokumentieren; Rollen-Namen „Schutzschild"/„Funk-Zentrale" klingen als Personenrolle schief (vorbestehend).
