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
| **Workers-Plan** | Bolle: **Free-Plan** | 1.000 KV-Reads/Tag für Cron **und** Live-Seite zusammen; jede Gästeseite ist ein Read. Deshalb `MAX_READS = 200` je Lauf, Rest morgen (`gecappt` im Log). Trifft praktisch nur den Altbestand — der schrumpft mit jedem Schreibvorgang | s.u. |
| **Magic-Link-Rückfrage** | Bolle: „Nachfragen, wenn anderer Plan da ist — was sagst du?" · ich: ja | `confirm()` **nur**, wenn lokal ein Plan mit anderem Namen **oder** anderem Motto liegt. Quelle ist der Resume-Snapshot bzw. localStorage — nicht `state`, das ist vor „Weitermachen" noch der Default. Normalfall ohne Unterbrechung | s.u. |
| MINOR | `poss("")` → Doppelleerzeichen im Betreff | „bis zur Piraten-Party" / „die Piraten-Party" ohne Namen | `f6edb5f1` |

**Ein Ablauffehler, zum zweiten Mal:** Die Positivkontrolle meldete `partyOpts-Aufrufe=9 (soll 8)` — und der Commit war schon durch, weil die Kontrolle nur als Echo in der `node --check && git commit`-Kette lief. Aufgeklärt: 8 Aufrufe + 1 Definition, mein Muster `partyOpts(party` traf die Funktionsdefinition mit. Inhaltlich korrekt. **Konsequenz:** Kontrollzahlen gehören in einen Assert, der die Kette bricht — nicht in ein Echo, das man nach dem Commit liest.

**Vom Prüfstand bestätigt (alle vier Fragen halten):** Datumsformat `YYYY-MM-DD` auf beiden Seiten des Vergleichs (`validDate` :336 vs. `toLocaleDateString("en-CA")`) — das war die stille Null, vor der er Angst hatte · `calcTTL`-Form identisch mit allen anderen Schreibpfaden · keine Präfix-Route fängt `/api/plan/` ab · `saveEdit()` liest per ID, `edPaypal` ist vorbefüllt (kein Bestandsverlust beim Speichern) · kein Doppelversand (Flag erst nach `res.ok`).
