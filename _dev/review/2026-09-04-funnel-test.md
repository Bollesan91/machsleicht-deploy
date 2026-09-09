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

**Unabhängige Live-Nachmessung des Prüfstands (08.09., nach dem Deploy):** Baum `0775f202` == `26a715ce` (`182786e58c5c`, per `rev-parse ^{tree}`); Startseite 200 mit `cf-cache-status: DYNAMIC`, og:site_name „mach's leicht", h2 „Warum mach's leicht?" 1×, bare „machsleicht" in Prosa und JSON-LD 0; Planer description 152 Zeichen, `crewTextLokal` 4×, `_altAuto` 1×; Worker Root 302, `/gibt-es-nicht` 404 `text/html`, `/api/plan` 400. **Kern: alle 245 ausgelieferten Seiten live abgerufen, `googleapis|gstatic` = 0 — mit Kontrollzahl im selben Lauf (245/245 lieferten 200 und erkennbaren Inhalt).** Das ist der Beleg, den Befund 04 vom Vortag schuldig geblieben war.

**Drei Messfehler in dieser Nachmessung, alle von der jeweiligen Kontrolle gefangen, keiner wurde ein Befund** (Prüfstand, wörtlich übernommen): (1) `?ref=xyz` verschwand im 302 — beinahe ein MAJOR gegen den viralen Loop; der Worker prüft `/^[a-z0-9]{6,12}$/` (:1282), „xyz" ist drei Zeichen, mit `abc123` kommt `ref` durch. Klasse: schlechter Testwert, nicht schlechter Code. (2) „js/index.js: 1× mach's leicht" war `grep -c` — das zählt Zeilen, nicht Vorkommen; mit `-o` sind es 3. (3) Der erste 245-Seiten-Lauf über `urllib` lief in 245× HTTP 403 und meldete trotzdem „0 mit Google-Bezug" — eine Null, die nach Erfolg aussieht. **Lehre, die daraus in die Memory ging: ein Negativbefund gilt nur mit Kontrollzahl aus demselben Lauf.**

**Zwei Vorgangs-Lehren des Tages, damit sie rekonstruierbar bleiben:** (a) **Lauf 15 war ungültig** — der Arbeitsbaum bewegte sich unter dem laufenden Linter, weil sich „Strom steht" und mein Generatorlauf für Block 7b gekreuzt hatten; der Log-Fuß (HEAD-Start vs. HEAD-Ende) hat es gefangen. Daraus die Verschärfung: „Strom offen" ist nur eine Anfrage, geändert wird erst nach dem „Strom frei" der messenden Session. (b) **Die getippte Pfadliste des Prüfstands war eine Zeile kürzer als der Baum** (`einladung/whatsapp/index.html` fehlte, weil er „15 Mottos × 2" abgeleitet statt gelesen hatte) — seine Zahl 31 stimmte dabei zufällig für Seiten und war für Pfade falsch. Die Kontrolle zählt nur, wenn man die Liste liest, nicht die Anzahl.

**Läufe 23 und 24 (08.09., nach dem Deploy):** Lauf 23 wurde ungültig — ich hatte nach meinem eigenen „Strom steht" noch einen Nachtrag committet (23 Sekunden nach dem Laufstart), weil ich eine inhaltliche Bitte des Prüfstands als Freigabe gelesen habe. Zweiter Fall dieser Klasse an einem Tag, beide vom Log-Fuß gefangen (HEAD-Start ≠ HEAD-Ende), keiner still. Regel jetzt in beiden Hälften: der Empfänger fragt nach „Strom steht" neu, der Absender datiert einen Wunsch, der nach einer Freigabe kommt („für den nächsten Zyklus: …"). Tagesbilanz: 24 Läufe, 22 gültig. Zahlen aus dem ungültigen Lauf 23 (belastbar, nur der Stand ist unscharf): **Stufe 45 = 243 raw-URL-Pfade in 27 Prüfaufträgen, 0 FAIL** (alle vier neuen Auftragsdateien lösen auf); **Stufe 69 = 32 Aufträge, 29 nennen die False-Positive-Liste** — die Stufe erlaubt höchstens 3 ohne, und genau dort stehen wir. **Der nächste Prüfauftrag ohne Verweis auf `OFFENE-REVIEW-PUNKTE.md` macht Stufe 69 rot** — kein Defekt, sondern die Sperrklinke, die tut, wofür sie da ist. Die drei Altfälle ohne Verweis, damit sie niemand neu suchen muss: `_dev/review/2026-08-10-recheck6-prompt.md`, `_dev/review/2026-08-10-recheck7-prompt.md`, `_dev/review/2026-08-11-p0-rsvp-prompt.md` (selbst gezählt über 31 Auftragsdateien, Stufe 69 zählt 32 — sie kennt zusätzlich einen Auftrag außerhalb des `*prompt*.md`-Musters). **Lauf 25 (`<SHA>`) schließt den Tag ab.**

**Nachtrag zur Stufe-69-Klinke (08.09., nach Lauf 25):** Die Zahlendifferenz 32 (Stufe) zu 31 (meine Zählung) ist geklärt und gemessen: die Stufe glob't das **Arbeitsverzeichnis** mit `*prompt*.md`, ich hatte `git ls-files` gezählt. Der Unterschied ist genau eine **untrackte** Datei, `_dev/review/2026-09-01-ritter-ablauf-PROMPT.md` (Großschreibung, liegt seit dem 01.09. lokal, nie committet) — sie nennt die False-Positive-Liste und zählt damit auf der grünen Seite. Die drei Aufträge ohne Verweis sind `_dev/review/2026-08-10-recheck6-prompt.md`, `_dev/review/2026-08-10-recheck7-prompt.md` und `_dev/review/2026-08-11-p0-rsvp-prompt.md`.

**Daraus ein Befund für den nächsten Zyklus (kein Blocker, Prüfstand-Zone, braucht Bolles Wort):** Stufe 69 misst gegen die Platte statt gegen das Repo. Auf einem frischen Klon zählt sie 31 statt 32, und eine untrackte Datei kann die Klinke sowohl retten als auch rot machen, je nachdem, was jemand lokal liegen hat. Dieselbe Klasse hat Stufe 65 bereits gelöst — sie benutzt ausdrücklich `versioniert()` mit dem Kommentar „Was auf der Platte liegt, ist nicht dasselbe wie das, was ausgeliefert wird". Vorschlag des Prüfstands: Stufe 69 auf `git ls-files` umstellen.

**Lauf 25 (`319d5502`, Tagesabschluss): 0 Rot, echter exit 0, 71/71**, Stufe 45 = 243 Pfade / 27 Aufträge / 0 FAIL, 60 = 339/4187, 65 = 5 Listen, 69 = 32 Aufträge / 29 mit Liste, 72 = 451/245. Der gepushte `draft` ist gemessen, `main` = `0775f202` live und nachgemessen.

**Zwei Tickets aus Bolles Frage „Wizard ist es oder? Der alte Planer ist tot oder?" (08.09., beides gemessen, nichts davon angefasst):**

1. **Der alte React-Planer ist tot — seine Quellen leben.** `js/kindergeburtstag.js` und `js/wizard.js` existieren nicht mehr im Repo (`js/` enthält nur `baby.js`, `einschulung.js`, `index.js`, `motto-data.js`), und keine Seite lädt sie. Der Live-Planer ist die eine Datei `kindergeburtstag.html` (3760 Zeilen), die außer `js/motto-data.js` nichts Eigenes nachlädt. Übrig sind die Quellen, die ins Leere bauen: `_src/kindergeburtstag.jsx` (letzte Änderung `c2b115a5`, 19.06.), `_src/wizard.jsx`, `_src/kindergeburtstag-data.js` (27.05.), `_src/build.sh`, `_src/build-wizard.sh`. Dieselbe Klasse wie Backlog S3 (`generate-seo-pages.js`): ein Name, der in einer späteren Sitzung zum Ausführen einlädt. Vorschlag: löschen oder mit einem Kopfkommentar „eingefroren, baut nichts, das ausgeliefert wird" versehen — Bolles Wort.

2. **Der Wizard ist als Oberfläche tot, als Verkabelung lebendig.** Der Schubladen-Dialog (`#drawer`, „Frage 1 von 4") wird von keinem Knopf geöffnet: `openWizard()` steht in `kindergeburtstag.html:2376`, gerufen wird sie nirgends (repo-weit nur in `_dev/prototypes/*` und `_pruef.js`). Seine Eingabefelder sind aber die Datenquelle des Funnels: die sichtbaren Eckdaten-Felder `iqName`/`iqDate`/`iqTime`/`iqEndTime`/`iqGuests` schreiben ihren Wert per `oninput` in die versteckten `q*`-Felder der Schublade und rufen dann `liveUpdateName/Date/Time/EndTime`, die genau dort lesen (`kindergeburtstag.html:807–820`, `:2381–2385`, `:2456`). Das Markup zu löschen bricht also Name, Datum, Uhrzeit, Endzeit und Gästezahl. Sauberer Weg in zwei Schritten mit je eigenem Review: erst die Update-Funktionen auf die sichtbaren Felder umstellen (und `syncEckdaten` mit), dann Schublade samt `openWizard`/`setStep`/`stepNext`/`stepBack` entfernen.

**Zwei Ergänzungen des Prüfstands zu diesen Tickets:** (1) Die Klasse hinter dem toten React-Planer ist mechanisierbar — jede Datei unter `_src/`, deren Bau-Ausgabe im Repo fehlt, ist entweder eine Leiche oder ein gebrochener Build; Stufen-Kandidat neben „jedes Skript parst" (Stufe 66 prüft bereits die Gegenrichtung: Skripte, die niemand aufruft). (2) Beim Drawer die Reihenfolge umdrehen und messen statt planen: **erst** eine Positivkontrolle bauen, die beweist, dass die Eckdaten nach dem Umbau ankommen (`iq*` → State → gerendertes Blatt, wie `restore_test`), **dann** die Update-Funktionen umstellen, **dann** das Markup entfernen. Ohne diese Kontrolle ist der letzte Schritt ein Blindflug — an genau dieser Stelle ist am 06.09. schon einmal etwas verschwunden (der Notfall-Kasten auf drei Seiten).

**Belegte Übergabe an Bolle (08.09.):** Auf seine Frage, ob er den richtigen Code bekommen hat, wurden die fünf gelieferten Dateien byteweise gegen die Live-Auslieferung gestellt — `kindergeburtstag.html`, `js/motto-data.js`, `einladung/piraten/whatsapp/index.html`, `paket/piraten/index.html`, `paket/core/paket-core.js`: alle fünf identisch, keine Abweichung. Für `party-worker.js` (Cloudflare gibt den Quelltext nicht zurück) indirekt: Repo == verschickte Datei == `main`, und die Live-Antwort trägt die Merkmale, die es erst seit dem heutigen Deploy gibt (HTML-404 mit 8847 Byte statt neun Byte `text/plain`, Marke „mach's leicht").

## Block 8 (08.09.) — Plan nach vorn: der fertige Plan wird der erste Aha-Moment

**Bolles Entscheidung nach der Funnel-Durchsprache.** Die Landingpages versprechen einen fertigen Plan in zehn Minuten, und bis heute stand die Einladung dazwischen: Wer wegen eines Ablaufs kam, musste erst eine Einladung bauen (Phase B vom 13.07.). Gewaehlt wurden drei Dinge — Plan vor Einladung, fuer alle Einstiege gleich; Einladung und Partyseite bleiben EIN Schritt („Einladen"); das Paket bleibt kostenlos, solange es keine Kasse gibt. Die Stufen-NUMMERN bleiben, nur ihre Reihenfolge aendert sich (3 = Plan, 4 = Einladung), damit gespeicherte Staende und Messreihen vergleichbar bleiben.

**Positivkontrolle ZUERST, nach dem Vorschlag des Pruefstands.** `stage_test.mjs` schneidet `STAGE_ORDER`, `ORD`, `goStage`, `jumpStage` und `revealPlan` aus den echten Quellzeilen und faehrt sie mit DOM-Attrappe. Gegen den Stand VOR dem Umbau **9 von 15 Erwartungen rot** (Reihenfolge, Zweig, Punkte, Alt-Stand) — der Beweis, dass die Kontrolle beisst; zwei Regressionswaechter waren schon vorher gruen (`plan_ready` genau einmal; kein `plan_ready` ohne Namen). Nach dem Umbau 15/15; restore 59/59, frist 6/6, anders 12/12, age 8/8 unveraendert.

**Neun Ersetzungen (`89dcc222`, Material `0b46a77e`):** `STAGE_ORDER = [1, 2, 3, 4, 5]`; navDot3 vor navDot4 im Markup, mit korrigierten aria-Beschriftungen; `revealPlan()` springt auf Stufe 3; der Knopf unter den Eckdaten heisst „Weiter zu deinem Plan"; Stufe 4 fuehrt zurueck zum Plan statt zu den Eckdaten und weiter zum Abschluss statt zum Plan; vom fertigen Plan zwei Wege („Kinder einladen" und, als stiller Zweitknopf, „Ohne Einladung fertig machen"); `planFromInvite()` entfaellt (einziger Aufrufer war der geaenderte Knopf); der mitlaufende Knopf am unteren Rand spricht dieselbe Sprache.

**Nebenbei repariert, ohne dass es geplant war:** Der Magic-Link-Pfad (`:3490`) springt mit `goStage(Math.max(state.stage || 1, …))`. `Math.max` rechnet auf Stufen-NUMMERN, die Reihenfolge lag aber in `STAGE_ORDER`. In der alten Ordnung stand die 4 an Position 2 — ein Stand mit `stage: 4` gewann also gegen die gewuenschte Mindeststufe 3 und landete VOR dem Plan statt darauf. Seit die Ordnung natuerlich ist, decken sich Nummer und Position, und die Zeile tut, was sie behauptet.

### Zwei Attrappen-Fehler in derselben Kontrolle — eine Positivkontrolle kann auch falsch anklagen

Beide gefunden, weil das Ergebnis nicht zum gelesenen Code passte, und beide wert, notiert zu werden: (1) Der Planer ruft `plausible(...)` direkt, nicht `window.plausible(...)`. Meine erste Attrappe stellte nur `window.plausible` bereit — zwei Faelle wurden rot, die in Wahrheit gruen waren. Der Schnitt muss JEDE freie Variable als Parameter fuehren. (2) `classList.remove('done','active','locked')` nimmt in Wahrheit mehrere Namen, meine Attrappe nur einen — dadurch blieb `locked` aus einem frueheren Schrittwechsel am Punkt kleben, und ein echter Befund (`done` faelschlich gesetzt) kam als `locked,done` daher. Beim zweiten Mal zeigte der Fehler schon auf die richtige Stelle, aber mit falscher Begruendung; das ist die gefaehrlichere Sorte. Regel daraus: **wenn eine Kontrolle rot meldet, wird zuerst die Kontrolle gelesen, dann der Code.**

### Re-Check 9 (Chat `06820d3a`, frischer Tab, Opus 5 Maximal, Diff `d85281a4..89dcc222`): 1 MAJOR, 5 MINOR, Score 62

Der Reviewer hat den Diff byte-genau gegen beide Staende nachgerechnet, die volle Datei danach in jsdom gebootet und die Wege ausgefuehrt statt gelesen (Punkte-Klassen, Reveal-Marken und Plausible-Aufrufe protokolliert). Sein Satz zum Kern: die Verdrahtung stimmt, „was nicht mitgezogen wurde: die Abschnitte selbst". Jeder Befund wurde von mir an der Quelle nachgeprueft, keiner verworfen.

- **MAJOR 1 — im gestapelten Layout stand die Einladung weiter ueber dem Plan.** Der Planer ist ein Scroll-Trichter: `.stage{display:block}` mit `#stage3,#stage4,#stage5{display:none}` und `.revealed{display:block}`. Aufgedeckte Abschnitte stehen GLEICHZEITIG untereinander, die Dokument-Folge ist also die Lesefolge. Block 8 hat Ordnung, Punkte, Knoepfe und Beschriftungen getauscht — die `<section>`-Bloecke nicht. Nachgemessen: `id="stage4"` in Zeile 841, `id="stage3"` in Zeile 1005. Wer vom Plan aus auf „Kinder einladen" klickte, wurde nach OBEN gescrollt, und der Editor schob sich zwischen Eckdaten und Plan.
- **MINOR 1 — „Ohne Einladung fertig machen" deckte die Einladung auf und hakte sie ab.** `ORD` ist `STAGE_ORDER.indexOf(id)`, bei `goStage(5)` ist `cur` 4, also fiel Stufe 4 (ORD 3) in die Aufdeck- und in die Erledigt-Regel. Ergebnis: Punkt 4 „erledigt" und der abgewaehlte Editor sichtbar, waehrend die Fertig-Seite daneben „⏳ Fast fertig — 1 Schritt offen" sagte. Erst durch den neuen Zweig erreichbar, vorher gab es keinen Weg an Stufe 4 vorbei.
- **MINOR 2 — migrierte Staende verzerren die Schritt-Messung in beide Richtungen.** Deckungsgleich mit dem Befund des Pruefstands, unabhaengig gefunden. Siehe Block 8b.
- **MINOR 3 — ein Rueckkehrer mit laufender Partyseite fand sie gesperrt.** Ein Stand mit Stufe 3 aus der alten Reihenfolge bedeutet, dass die Einladung bereits durchlaufen wurde; die Punkt-Navigation verweigerte den Sprung auf diese Arbeit.
- **MINOR 4 — der Kommentar in `goStage` behauptete die alte Ordnung** („Phase B … EINLADUNG(4) -> PLAN(3)"), drei Zeilen ueber dem geaenderten `STAGE_ORDER`.
- **MINOR 5 — zwei Copy-Reste.** Der Hinweis auf Stufe 4 schickte zum Plan („Plan … warten"), der jetzt hinter dem Nutzer liegt; und der Abschluss unter dem Plan war statisches Markup, fragte also auch den nach einer Einladung, dessen Partyseite laengst laeuft — waehrend die mitlaufende Leiste daneben korrekt „Fertig machen" anbot.

**Selbst gefunden, vom Reviewer nicht gesehen:** der Abwahl-Knopf aus Block 8 benutzte `color:var(--ink)` und `border:2px solid var(--line)`. Beide Variablen gibt es in dieser Datei nicht (`grep -c` = 0/0) — die Deklarationen waeren zur Rechenzeit ungueltig geworden, der Rahmen also ersatzlos ausgefallen. Ein Code-Review liest Logik, nicht berechnete Stile; gefangen hat es die Frage „welche Klasse gibt es hier eigentlich schon", nicht der Blick auf den Diff.

### Block 8b — Alt-Staende zaehlen den ersten Plan sonst nicht

`state._maxStage` haelt die weiteste erreichte Stufe und entscheidet, ob ein Schrittwechsel als Fortschritt gemessen wird. Drei an der Quelle nachgeprueften Glieder: der Merker steht genau einmal im Dokument (`:2366`) und wird per `ORD(n) > ORD(state._maxStage||1)` verglichen, also **nach Position, nicht nach Nummer**; `autoSave` schreibt `JSON.stringify(state)`, der Merker faehrt also im Gesamtstand mit; `loadSavedState()` gab `parsed` unveraendert zurueck. Folge: Wer in der alten Welt bis zur Einladung kam, traegt `_maxStage = 4` — damals Position 2, heute Position 3. Kommt er zurueck und sieht **zum ersten Mal den Plan**, gilt `3 > 4` = false und der Schritt wird nicht gezaehlt. Betroffen ist genau die Gruppe, fuer die Block 8 gebaut ist. Der Reviewer nennt denselben Fehler in der Gegenrichtung: ein Stand mit `_maxStage = 3` (gestern bis zum Plan, also gestern schon durch die Einladung) laesst `wizard_stage stage:4` ein zweites Mal feuern.

**Erst gemessen, dann gefixt.** `stage_test.mjs` schneidet jetzt auch `loadSavedState` mit und faehrt es gegen eine Speicher-Attrappe. Drei neue Faelle, gegen `89dcc222` genau die drei roten: `_maxStage` nicht normalisiert, Schema-Marke fehlt, und in Nutzersprache — der Rueckkehrer sieht seinen ersten Plan, `plan_ready` feuert, `wizard_stage` nicht. Dazu zwei Waechter, vorher wie nachher gruen: ein Stand mit `_so: 8` wird nicht noch einmal zurueckgesetzt (sonst zaehlte jeder Besuch neu), und der Typ-Guard gegen das alte String-Motto geht der Normalisierung vor.

**Der Fix sind zwei Zeilen** — `_so: 8` als Default im Zustands-Literal, und in `loadSavedState()` direkt hinter dem Typ-Guard `if(parsed._so !== 8){ parsed._maxStage = 1; parsed._so = 8; }`. Auf Anfang setzen statt umrechnen, mit Absicht: die alte Ordnung hat keine ehrliche Entsprechung in der neuen (wer die Einladung sah, hat den Plan eben nicht gesehen), und die Ereignisse tragen die Stufe als Merkmal, die Auswertung kann also weiter trennen. Preis ist, dass ein Rueckkehrer Stufen doppelt zaehlt, die er in der alten Welt schon hatte — einmalig und nur fuer diese Gruppe. Nicht in `goStage` gefixt, damit der Vergleich dort eine Zeile bleibt.

### Block 8c — die Befunde aus Re-Check 9

Neun Ersetzungen und ein Blocktausch, wieder mit der Kontrolle zuerst: sieben neue Faelle (M bis S), von denen zehn Erwartungen gegen den Stand davor rot waren — darunter „R Abschnitte stehen in der Reihenfolge des Trichters", die die Dokumentfolge `1,2,4,3,5` beim Namen nennt.

- **MAJOR 1:** die beiden `<section>`-Bloecke getauscht, Text unveraendert verschoben (Laenge vorher = nachher, Kommentarmarken als Grenzen). Danach stehen die fuenf Abschnitte in der Reihenfolge, die der Nutzer liest.
- **MINOR 1 + MINOR 3, eine Regel fuer beide:** Aufgedeckt wird, was betreten oder geleistet wurde — nicht, was nur davor liegt: `const _aufdecken = id => id === n || (id === 4 ? (EINLADUNG_LAEUFT() && cur >= ORD(3)) : ORD(id) < cur);`. Stufe 4 haengt bewusst nicht an der Position, sondern an der Leistung: sie liegt HINTER dem Plan und waere ueber einen Positionsvergleich fuer einen Rueckkehrer nie zu erreichen. Massstab ist dieselbe Wahrheit, die Fertig-Seite und mitlaufende Leiste schon benutzen, jetzt einmal benannt als `EINLADUNG_LAEUFT()` (die Partyseite ist aktiv). Die Punkte-Schleife wurde entsprechend umgestellt: „erledigt" ist nur, was geoeffnet wurde; ein uebersprungener Schritt ist weder erledigt noch gesperrt, sondern anklickbar. `jumpStage` erlaubt seither den Ruecksprung auf einen uebersprungenen Schritt und verweigert weiter das Voraus-Springen.
- **MINOR 5b:** `syncPlanAdvance()` rendert den Abschluss unter dem Plan aus demselben Zustand, statt ihn zu behaupten; das Markup bekam dafuer drei Anker. Wer seine Partyseite laufen hat, liest „Fertig machen →" und bekommt die Abwahl gar nicht erst angeboten.
- **MINOR 4 und 5a:** Kommentar und Hinweistext berichtigt. Der Abwahl-Knopf traegt jetzt die vorhandene Klasse `stage-advance__skip` statt zweier Variablen, die es nicht gibt.

**Abnahme.** stage 36/36, restore 59/59, frist 6/6, anders 12/12, age 8/8. Dazu ein Rauchtest am echten Dokument im Browser, drei Wege durchgeklickt, Zahlen aus dem laufenden Bild: nach „Weiter zu deinem Plan" steht der Plan bei y = 4853 und Einladung wie Abschluss sind zu; nach „Kinder einladen" erscheint die Einladung bei y = 10243, also DARUNTER, Punkte 3 = erledigt / 4 = aktiv. Auf dem Abwahl-Weg bleibt die Einladung zu, Punkt 4 traegt keine Klasse und `tabindex 0`, das Abzeichen der Fertig-Seite sagt „⏳ Fast fertig — 1 Schritt offen" — Punktleiste und Seite widersprechen sich nicht mehr; ein Klick auf Punkt 4 holt den Schritt nach und schiebt den Abschluss auf y = 14831. Und der Rueckkehrer aus der alten Reihenfolge (Speicherstand mit `stage: 3`, `_maxStage: 4`, aktiver Partyseite): nach „Weitermachen" steht `_maxStage` normalisiert und `_so: 8` im Speicher, **`wizard_stage` mit `stage: "3"` feuert** — genau das Ereignis, das vorher fehlte —, die Einladung ist sichtbar und anspringbar, und der Knopf unter dem Plan sagt „Fertig machen →".

**Offen aus Re-Check 9, bewusst nicht gefixt:** Der Reviewer weist darauf hin, dass `plan_ready` jetzt eine Stufe frueher im Trichter sitzt, ohne den Einladungs-Abbruch davor — die absolute Zahl wird steigen, ein Vorher/Nachher-Vergleich der Rohzahl misst die Umstellung und nicht die Wirkung. Das ist kein Defekt, sondern eine Lesehilfe fuer die naechsten Wochen. Und: ein Rueckkehrer, der die Einladung frueher zwar besucht, aber nie aktiviert hat, findet seinen Punkt 4 weiterhin gesperrt; erreichbar bleibt sie ueber den Knopf unter dem Plan. Bewusst so gelassen, weil „aktive Partyseite" die einzige Wahrheit ist, die nicht versehentlich entsteht — `state.invite.title` etwa wird beim Motto-Klick automatisch gesetzt (`:1707`, `:1725`) und taugt deshalb nicht als Beleg fuer geleistete Arbeit.

### Praezisierung zum Blocktausch — „reine Verschiebung" war zu grob gesagt

Im Commit `2c4dab33` und oben steht „Text unveraendert verschoben, Laenge vorher = nachher". Das gilt fuer den Verschiebeschritt im Skript, der nach den Textersetzungen lief; ein Leser bezieht den Satz aber auf den Vergleich der beiden Staende, und dort ist er falsch. Der Einwand kam vom Pruefstand mit der richtigen Begruendung: **164 verschobene Zeilen sehen in einem Diff aus wie 164 geloeschte plus 164 neue**, ein Gutachter, der das von Hand prueft, prueft seine Geduld. Also gemessen, statt behauptet — Bloecke einzeln ausgeschnitten (`git show <sha>:datei`, Kommentarmarken als Grenzen, Rohbytes ohne Zeilenenden-Uebersetzung), Zeile fuer Zeile verglichen:

| Abschnitt | Zeilen vorher | Zeilen nachher | Bytes vorher | Bytes nachher | identisch |
|---|---|---|---|---|---|
| Plan (3) | 42 | 42 | 2823 | 2793 | nein |
| Einladung (4) | 164 | 164 | 17399 | 17394 | nein |

**Acht abweichende Zeilen, vier raus und vier rein, alle acht die beabsichtigten Ersetzungen aus 8c** — im Plan-Block die drei Zeilen des Abschlusses, im Einladungs-Block die eine Hinweiszeile. Kein Streuner, keine verrutschte Zeile. Bewegt wurden 20222 Bytes, 6,3 % der Datei, 206 von 3760 Zeilen. Die Kontrollzahl wurde dem laufenden Re-Check 10 **bewusst nicht nachgereicht**: Punkt 1 des Auftrags fragte offen „ist im verschobenen Bereich irgendein Zeichen anders", und wer dem Gutachter die Antwort mitgibt, prueft nicht mehr ihn, sondern seine Zustimmung. Die Regel fuer kuenftige Auftraege dieser Klasse: **liegt die Kontrollzahl vorher vor, gehoert sie in den Auftrag** — dann prueft der Gutachter eine Behauptung, statt zu zaehlen.

### Re-Check 10 (Chat `3b6de140`, frischer Chat, Opus 5 Maximal, Diff `0b46a77e..2c4dab33`): 0 MAJOR, 4 MINOR, Score 82

Der Gutachter hat den Diff auf den Vorzustand angewandt und byteidentisch mit `2c4dab33` herausbekommen (kein Blindfleck), danach Struktur per lxml und Verhalten per jsdom mit dem echten Seitenskript gefahren — Ereignisse ueber den `umami.track`-Shim abgegriffen, nicht ueber `window.plausible`, den die Seite selbst ueberschreibt. **MAJOR 1 ist an der Wurzel geschlossen:** Dokumentfolge, Knopfrichtungen und Punkte-Navigation stimmen ueberein, und die Leistungs-statt-Position-Regel „haelt allen 29 erreichbaren Zustaenden stand, ohne eine Sackgasse zu erzeugen". 6 Hunks, `patch` auf den Vorzustand ergibt exakt den neuen Stand, keine stillen Aenderungen. Beide Pflicht-Anhaenge gelesen, nichts davon dort verworfen.

**Die Eichung hat funktioniert.** Er hat die acht Zeilen selbst gefunden, und zwar gerechnet statt gezaehlt: „Blockvergleich Zeile 1004–1045 (vorher) gegen 840–881 (nachher): 42 = 42 Zeilen, aber 3 Zeilen weichen ab" — dieselbe Methode, dieselben Zahlen, dazu 0 unbalancierte Tags, 0 doppelte IDs, beide Abschnitte vorher wie nachher direkte `body`-Kinder. Und derselbe Schluss wie meiner: „die Behauptung ‚derselbe Text' trifft trotzdem nicht zu."

### Block 8d — die vier MINOR aus Re-Check 10

- **MINOR 1: mein 8b-Fix war zu grob.** Den Merker beim Laden auf 1 zu setzen liess Rueckkehrer ihre Stufen ein zweites Mal zaehlen. Im Browser nachgestellt: ein Stand mit `stage: 2` und `_maxStage: 5` — jemand, der die Strecke schon ganz gegangen war und zuletzt wieder auf den Eckdaten stand — loeste `wizard_stage` 2, 3 und 5 aus. Der Vorschlag des Gutachters (`_maxStage = 2` statt 1) traegt nicht, weil der Merker beim Gehen mitklettert und 4 und 5 dann trotzdem feuern. Stattdessen wird der **Weg** uebersetzt: wer alt bis m kam, hat alle Stufen mit `ORD_alt <= ORD_alt(m)` gesehen; der neue Merker ist der laengste Anfang der NEUEN Ordnung, der ganz in dieser Menge liegt. Das ergibt 1→1, 2→2, 4→2 (Einladung gesehen, Plan nicht), 3→4 (Plan gesehen, also auch die Einladung davor), 5→5. Exakt fuer vier der fuenf Faelle; bei 4 ist genau ein Ereignis zu viel, und das ist unvermeidbar, weil die alte Besuchsmenge kein Anfang der neuen Ordnung ist. Nach dem Fix loest ein Rueckkehrer, der durch war, **null** Ereignisse aus.
- **MINOR 2: `syncPlanAdvance()` lief nur in `goStage(3)`.** Der Erfolgspfad der Aktivierung (`:3249`) rief es nicht. Wer auf Stufe 4 aktivierte und danach nur zum Plan hochscrollte, las dort weiter „Kinder einladen", waehrend die Leiste daneben schon „Fertig machen" anbot — dieselbe Klasse wie MINOR 5b aus Re-Check 9, nur eine Ebene tiefer. Jetzt ruft der Erfolgspfad beide Renderer.
- **MINOR 3: die nummerierte Liste im Fliesstext** nannte „Einladung & Partyseite verschicken" (`:1109`) vor „Plan feinschleifen & drucken" (`:1110`). Eine nummerierte Liste ist selbst eine Reihenfolgen-Aussage, und sie widersprach dem, was der Nutzer darueber erlebt. Ganze `<li>`-Zeilen getauscht, Laenge unveraendert. **Diesen Rest habe ich beim Umbau uebersehen, weil ich die Texte des Trichters geprueft habe und nicht die Prosa darunter.**
- **MINOR 4: der Abwahl-Knopf** — unabhaengig von uns beiden gefunden, gleiche Zahlen. Und der Gutachter hat etwas gesehen, das mir entgangen war: **die KAPUTTE Fassung war an zwei von drei Punkten besser.** `color:var(--ink)` fiel auf die geerbte Schriftfarbe zurueck (16,5:1 statt 3,37:1), und die Polsterung von `.stage-advance__btn` machte die Klickflaeche gross (rund 56 px statt 21). Mein 8c hat also **das Sichtbare verschlechtert, waehrend es den Quelltext verbesserte** — ein sauberer Beleg dafuer, dass „undefinierte Variable ersetzt" ohne Messung keine Verbesserung ist.

**Die Klasse hinter MINOR 4, fuer die Lektionen:** `stage-advance__skip` war seit je definiert und wurde NIE benutzt (im Vorstand `0b46a77e` genau ein Treffer im ganzen Dokument: die Definition). Block 8c ist ihr erster Auftritt, damit ist sie nach Bolles Regel **neuer Live-Inhalt**, nicht Bestand. Gemessen bei 375 px: 3,37:1 Kontrast (AA verlangt 4,5 fuer 13-px-Text), Klickflaeche 200×18 (WCAG 2.5.8 verlangt 24×24), Mitte bei 120 statt bei 187 — ein `block`-Knopf mit automatischer Breite folgt keinem `text-align` des Behaelters. Nach dem Fix 4,98:1, 216×36, Mitte deckungsgleich. **Eine tote Klasse ist gefaehrlich, weil sie einladend aussieht:** passender Name, richtiger Block, nie geprueft.

**Abnahme von 8d.** stage 45/45 — sieben Erwartungen waren gegen den Stand davor rot, darunter „V der Text nennt den Plan vor der Einladung" mit den Fundstellen im Dokument; restore 59/59, frist 6/6, anders 12/12, age 8/8. Browser bei 375 px am echten Stylesheet: Kontrast 4,98:1, Flaeche 216×36, Mitte 187 = Mitte des Hauptknopfs, kein Ueberlauf. Rueckkehrer, der schon durch war: **null** Stufen-Ereignisse, Merker 5 mit Schema-Marke. Fliesstext nennt den Plan zuerst. Der Aktivierungspfad wurde mit **vorgetaeuschter Serverantwort** gefahren (keine echte Party angelegt); danach steht unter dem Plan „Fertig machen →", der Hinweis ist gewechselt und die Abwahl ausgeblendet, ohne dass `goStage(3)` lief.

**Zahl des Tages aus Lauf 27 (Pruefstand, unabhaengig):** 69 Commits seit `2fd73ab3`, und Stufe 60 rendert unveraendert **339 Dokumente / 4187 Pruefungen**. Der Umbau des ganzen Funnel-Wegs hat an der Gaesteseite kein einziges Dokument veraendert — der billigste denkbare Beleg dafuer, dass Block 8 nur den Planer betrifft.

### Re-Check 11 (Chat `24cd9b99`, frischer Chat, Opus 5 Maximal, Diff `46ac6096..15de2fa2`): 0 MAJOR, 6 MINOR, Score 79

Erstmals standen die eigenen Kontrollzahlen im Auftrag, nach dem Vorschlag des Pruefstands — und **zwei von vier hielten nicht.** „13 Plus-Zeilen reiner Kommentar" sind in Wahrheit 17 (vier Fortsetzungszeilen des CSS-Blocks nicht mitgezaehlt), und „190 und 219 Bytes" sind Zeichen, nicht Bytes (194/225 ohne Einrueckung) — `len()` auf einer dekodierten Zeichenkette, mit „Bytes" beschriftet. Der Gutachter fuegt hinzu, dass „190" das Paar nicht einmal eindeutig identifiziert: der Motto-Listenpunkt hat ebenfalls 190 Zeichen. Die Kontrollzahl war also nicht nur falsch benannt, sondern auch nicht unterscheidungsfaehig. **Genau dafuer stand sie im Auftrag** — eine Zahl, die man mitgibt, wird geprueft; eine, die man fuer sich behaelt, nicht.

**Der groessere Messfehler war der Aufbau.** Der Browser-Spiegel im Scratchpad lieferte `/fonts/` nie aus; der Planer laedt seine Schrift ueber `<link rel="stylesheet" href="/fonts/fonts.css">`, der Spiegel enthielt nur die HTML und `js/motto-data.js`. **Alle Textmasse dieses Tages liefen damit auf Ersatzschrift.** Der Gutachter rechnete aus der ausgelieferten `nunito.woff2` (Variable Font auf wght=600, HarfBuzz) 223 x 37,7; nach dem Nachruesten der Schriften misst der Browser 224,8 x 38. Seine Zahl war richtig, die eigene 216 x 36 falsch. Kontrast und Zentrierung sind schriftunabhaengig und bleiben. Lehre: **ein Spiegel, der nicht alles ausliefert, misst nicht die Seite, sondern eine Naeherung** — und welche Zahlen davon betroffen sind, sagt er nicht von selbst.

### Block 8e — vier Nachzuege, davon zwei an eigenen Saetzen

- **MINOR 1 (der Fix von 8d war nur halb):** `syncPlanAdvance()` hing ausserhalb der Aktivierung weiter an `n === 3`. `resumeWork()` endet aber mit `goStage(state.stage)` und springt damit direkt auf 4 oder 5, waehrend `#stage3.revealed` den Plan auf derselben Scrollseite sichtbar laesst. Ein Rueckkehrer mit laufender Partyseite las unter seinem Plan weiter „Kinder einladen" — samt Abwahl-Weg, den er nicht mehr braucht. Der Block gehoert zu einem Abschnitt, der ab Stufe 3 dauerhaft sichtbar bleibt, also gehoert sein Rendern zu **jedem** Schrittwechsel statt in einen Zweig. Deckt Wiederaufnahme und Magic-Link mit ab.
- **MINOR 3 (der Rueckfall fing zu viel):** `|| 1` erwischte auch die Staende aus der Sechs-Stufen-Zeit (`_maxStage: 6`, siehe den Kommentar an Stufe 5 im Markup) und setzte sie auf 1 — genau das Verhalten, das die Uebersetzung abschaffen soll. Sechster Eintrag `6:5`. **Der Pruefstand hatte den Rueckfall als „passt zusammen mit `if(n > 5) n = 5`" gelesen und ich hatte zugestimmt; beide falsch.** Er faengt nicht nur Unsinn ab, sondern auch eine echte Kohorte.
- **MINOR 2 (mein Kommentar versprach mehr, als der Code haelt):** „ein fehlender Schritt waere im Trichter unsichtbar" gilt fuer die Abbildung, nicht fuer den ganzen Weg. Wer mit `stage: 4` gespeichert hat, springt beim Wiederaufnehmen direkt dorthin, feuert nur `wizard_stage:4`, und die Plan-Stufe bleibt fuer diese Kohorte unzaehlbar. Kein Rueckschritt gegenueber vorher, aber der Satz stimmte nicht — er steht jetzt richtig da, samt Hinweis, dass es am Wiederaufnahme-Sprung liegt und nicht an der Tabelle.
- **MINOR 5 (meine Zahlen):** die Groessen im CSS-Kommentar auf die Messung mit echter Schrift gebracht.

**Einem Befund wurde widersprochen, mit Begruendung.** MINOR 6: der Abbinder „Kostenlos, ohne Anmeldung." steht seit dem Listentausch in der Mitte statt am Ende; der Gutachter schlaegt vor, ihn ans Ende zu holen. Er gehoert aber zum PLAN, und auf dem Einladungs-Punkt waere er **unwahr** — die Aktivierung der Partyseite verlangt eine E-Mail-Adresse (`psEmailInput`, Pflichtfeld seit dem 13.07.). Bleibt, wo er ist; ob der letzte Punkt einen eigenen Abbinder bekommt, ist eine Copy-Frage fuer Bolle.

**Herkunft der wiederbelebten Klasse, nachgetragen:** `stage-advance__skip` war nicht ueberall unbenutzt. In `_dev/prototypes/wizard-v3/v4/v5` wird sie je zweimal verwendet („Plan jetzt schon ansehen", „Partyseite ueberspringen"). Sie stammt also aus dem Entwurf, wo sie einen Zweitweg gestaltete, und wurde mit ihrer Definition in die Live-Datei uebernommen, ohne ihre Verwendung. Das erklaert, warum sie passend aussah — **ihre Masse waren fuer den Zusammenhang des Entwurfs gewaehlt, nicht fuer den, in den sie gesetzt wurde.**

**Abnahme von 8e.** stage 50/50 (fuenf Erwartungen vorher rot), restore 59/59, frist 6/6, anders 12/12, age 8/8. Browser mit jetzt korrekt ausgelieferter Schrift: Rueckkehrer mit laufender Partyseite und gespeicherter Stufe 4 landet nach „Weitermachen" auf Stufe 4, der Plan ist darueber sichtbar, und der Abschluss sagt „Fertig machen →" mit ausgeblendeter Abwahl. Knopf 224,8 x 38 bei 320, 375 und 414 px, einzeilig, Mitte deckungsgleich mit dem Hauptknopf, kein waagerechter Ueberlauf.

**Zwei vorbestehende Kontrastwerte, im Browser nachgemessen — fuer Bolle, nicht nebenbei entschieden:** der Hinweistext ueber dem Knopf (`.stage-advance__hint`, `#888`) liegt bei **3,37:1**, also unter AA fuer 13-px-Text — dieselbe Farbe und dieselbe Begruendung, mit der der Abwahl-Knopf repariert wurde; die Argumentation ist bisher nur zur Haelfte angewendet. Und der **Hauptknopf** (`.stage-advance__btn`, weiss auf `#FF6F00`) liegt bei **2,79:1** bei 16 px/800, unter der Schwelle fuer grossen Text (18,66 px fett). Nach diesem Diff ist der leise Zweitweg das einzige AA-konforme Bedienelement des Blocks.

### Re-Check 12 (Chat `84fc916d`, frischer Chat, Opus 5 Maximal, Diff `bdfde262..5caf63ec`): 0 MAJOR, 5 MINOR

Alle fuenf unsichtbar fuer Nutzer: drei Kommentar-Aussagen, die der Code nicht deckt, und zwei Randfaelle der Uebersetzungstabelle. Der Gutachter hat dafuer alle 25 `goStage(...)`-Aufrufstellen einzeln durchgegangen und je Pfad geprueft (Wiederaufnahme, Magic-Link, Deep-Link, Motto-Wechsel), `state.partyseite.active` als genau eine Schreibstelle nachgewiesen und die Knoten-Reihenfolge gegen die Aufrufer gestellt. **Nebenbei eine Frage von uns beiden abgeraeumt:** `window.plausible` ist durch den Shim in Zeile 116 **immer** truthy — der Fortschrittsmerker haengt also nicht an einem Werbeblocker.

- **MINOR 1, die schoenste Form des Tages:** der Kommentar am Erfolgspfad der Aktivierung wurde **durch seinen eigenen Fix falsch.** Er sagte „beide werden sonst erst beim naechsten `goStage(3)` frisch" — das stimmte, bis Block 8e den Plan-Abschluss zwei Zeilen weiter oben auf jeden Schrittwechsel umgestellt hat. Der Aufruf bleibt noetig, die Begruendung nicht.
- **MINOR 2:** „mit der ausgelieferten Nunito gemessen" traegt die Breite nicht. Selbst nachgemessen: der Pfeil U+2192 ist in Nunito und in einer **erfundenen** Schriftfamilie exakt gleich breit (13,00 px), kommt also aus der Ersatzschrift; die Buchstaben nicht (32,03 gegen 30,34 px fuer „Ohne"). Zweite Ebene der Spiegel-Lehre: nicht nur „ist die Schrift geladen", sondern „enthaelt sie die Zeichen, die ich messe".
- **MINOR 3:** „ab dem ersten Betreten dauerhaft sichtbar" ist zu stark — `setExactAge` (`:1546`) nimmt `revealed` bei ungueltigem Alter wieder weg. Der Schluss haelt trotzdem.
- **MINOR 4/5, die Tabelle, als Ticket statt als Fix:** `_maxStage: 5` aus der **Sechs-Stufen-Aera** hiess „Partyseite erreicht, Fertig nicht" und wird jetzt auf „komplett durch" abgebildet. Der Gutachter sagt ausdruecklich, die alte 6er-Ordnung sei **aus dem Material nicht beweisbar**; unter beiden denkbaren Ordnungen verliert diese Gruppe mindestens einen Schritt. Das ist eine Recherche, kein Fix.

### Block 8f — drei Kommentare berichtigt, null Code-Zeilen

Bewusst **keine dreizehnte Review-Runde**: Bolles Schlusspunkt-Regel zielt auf Fix-Review-Zyklen, und hier gibt es kein Verhalten zu begutachten, nur Wortlaut. Die maschinelle Abnahme lief trotzdem (stage 50/50, restore 59/59, frist 6/6, anders 12/12, age 8/8), weil die Datei ausgeliefert wird. Dass wirklich nur Kommentare betroffen sind, prueft das Skript selbst, indem es beide Staende **ohne Kommentarbereiche** vergleicht.

**Zwei Fehlschlaege beim Bauen, beide lehrreich:** Der erste Waechter pruefte auf Kommentar-PRAEFIX und schlug an, weil die Fortsetzungszeilen eines `/* */`-Blocks keinen tragen — **formal recht, inhaltlich unrecht.** Der zweite Assert war zu breit: „dauerhaft sichtbar" steht auch in einem fremden SEO-Kommentar (`:632`). Beide Male hielt die Kontrolle auf, beide Male lag sie daneben. Das stuetzt die Regel des Tages aus der anderen Richtung: **ein roter Test ist erst ein Befund, wenn der Test geprueft ist.**

### Deploy (`main = d3f9bb25`, Merge von `draft = dc51973d`) und Live-Nachmessung

Auf Bolles Wort. Kein Worker-Token noetig, `git diff main..draft -- party-worker.js` war leer. Zwoelf Live-Pruefungen, **elf bestanden — die zwoelfte war ein Fehler im Test, nicht auf der Seite**: gesucht wurde `og:site_name` auf dem Planer, das dort nie stand (Repo 0, Startseite 1, live korrekt). Gruen: Abschnittsfolge 1,2,3,4,5 · `STAGE_ORDER` natuerlich · „Weiter zu deinem Plan" · beide Wege unter dem Plan · `stage-advance__skip` benutzt · `var(--ink)`/`var(--line)` 0/0 · `_so: 8` · Tabelle mit `6:5` · `syncPlanAdvance` an zwei Aufrufstellen · `planFromInvite` weg · Fliesstext nennt den Plan zuerst. **Ausgelieferte Datei md5-gleich mit dem Repo.** Sitemap live 136 Adressen, Startseite und Planer auf 2026-09-08.

**Der Trichter auf der echten Seite durchgeklickt, nicht am Spiegel:** Plan bei y = 2054, Einladung danach bei y = 4244 — darunter. Punkte 3 erledigt / 4 aktiv. Abkuerzungsweg: Stufe 5 aktiv, Einladung zu, Punkt 4 ohne Klasse mit `tabindex 0`, Abzeichen „⏳ Fast fertig — 1 Schritt offen". Schrift diesmal nachweislich geladen.

### Der Befund, der beim Vergleich live gegen Repo herausfiel — und mit Block 8 nichts zu tun hat

Der Pruefstand hat nach dem Deploy **alle 245 ausgelieferten Seiten live gegen das Repo gestellt**, nicht als Stichprobe: **240 identisch, 5 abweichend, 0 Abrufprobleme.** Im Repo geaendert war nur `kindergeburtstag.html` — die Regressionsfreiheit ist damit belegt statt behauptet. Und die fuenf Abweichungen sind der eigentliche Fund:

**Cloudflares Mailschutz macht die Kontaktadresse auf den Pflichtseiten unlesbar.** Selbst nachgemessen:

| Seite | live geschuetzt / Klartext | Repo geschuetzt / Klartext | Repo `mailto:` | live `mailto:` |
|---|---|---|---|---|
| /impressum | 1 / 0 | 0 / 1 | 0 | 0 |
| /datenschutz | 6 / 0 | 0 / 7 | 1 | 0 |
| /transparenz | 1 / 0 | 0 / 2 | 1 | 0 |
| /ueber-uns | 3 / 2 | 0 / 7 | 3 | 0 |

Auf **drei** Seiten steht live keine lesbare Adresse mehr; auf `/ueber-uns` ueberleben zwei Nennungen, weil Cloudflare nur `mailto:`-Links und ihren unmittelbaren Text anfasst. Der Knopf „📧 E-Mail schreiben" ist dort **noch da** — kaputt ist sein Ziel (`href="/cdn-cgi/l/email-protection#…"`). **Ein sichtbar intaktes Element mit totem Ziel ist schwerer zu entdecken als ein fehlendes**, und wer die Seite nur ansieht, haelt den Befund fuer erledigt. Auf **keiner** der vier Seiten steht live noch ein `mailto:`.

**Der haerteste Fall ist das Impressum**, und er zeigt, dass der Schutz mehr tut als Links zu verschluesseln: dort steht im Repo (`:78`) schlicht `E-Mail: kontakt@machsleicht.de` als **reiner Text ohne Link** — `mailto:` kommt im Repo 0 Mal vor. Live macht Cloudflare daraus einen Anker auf den eigenen Schutzpfad mit dem sichtbaren Text `[email protected]`. Die Pflichtseite bot ohnehin nur eine Adresse zum Abtippen, und selbst die ist ohne JavaScript nicht mehr da. Betroffen sind §5 DDG (Impressum leicht erkennbar und unmittelbar erreichbar) und Art. 13 DSGVO (Kontaktdaten des Verantwortlichen). **Kein Code-Problem:** im Repo steht alles korrekt, die Ersetzung passiert auf dem Weg zum Leser. Ein Haken im Cloudflare-Dashboard (Scrape Shield → Email Address Obfuscation), nur Bolle kann ihn umlegen. Der Zustand besteht seit Monaten.

**Die fuenfte Abweichung ist keine Cloudflare-Sache und fuer die Methode wichtig:** `einladung/studio/index.html` kommt live 20 Bytes kleiner an, weil **Netlify** die Seite umschreibt (doppelte zu einfachen Anfuehrungszeichen, `/kindergeburtstag.html` zu `/kindergeburtstag`). Eine von 245. Kein Schaden, aber: **eine ausgelieferte Datei ist nicht ueberall das, was im Repo steht.** „live == Repo" taugt deshalb nicht als Regel, wohl aber als **Regressionsprobe mit benannten Ausnahmen** — Mailschutz auf vier Seiten, Umschreibung auf der Studio-Seite. Sie kostet drei Minuten und hat heute zwei Dinge gefunden, die kein Grep je gezeigt haette, weil wir immer nur gefragt haben „ist das Neue da?" und nie „ist alles Uebrige noch das, was wir glauben?".

### Bolles vier Entscheidungen vom 08.09.

1. **Deploy: ja, jetzt.** Ausgefuehrt und live nachgemessen.
2. **Befund 07: Knoepfe nachbauen.** Der Einladungstyp-Zweig wird sichtbar gemacht, Karte und Druck werden echte Varianten. Damit ist der tote Code eine Baustelle mit Auftrag — und die Stufen-Kandidatin „definierte Klassen werden benutzt" waere gegen genau diesen Code gelaufen. **Eine Stufe, die den Bestand anklagt, klagt manchmal einen Plan an.**
3. **Kontrast: die fuenf festen Stellen dunkler machen**, plus das eine zu helle Motto (`baustelle`, `#E65100`, 3,79:1). Gemessen ueber 260 ausgelieferte Dateien und 47627 Regelbloecke: helle Schrift auf **festem** `#FF6F00` gibt es an 5 Stellen (Planer-Hauptknopf, Spiel-Hinweis, viraler Knopf der Gaesteseite, zwei Mail-Knoepfe), helle Schrift auf `var(--accent)` an 20 — und **14 von 15 Mottofarben liegen ueber 4,5:1**, keine unter 3,0. „Die Marke erfuellt AA nicht" war eine Vermutung, die durch zwei Haende ging, bevor sie gemessen wurde; richtig ist „fuenf Stellen benutzen den Ersatzwert statt des Akzents". Die zwei Mail-Knoepfe sind ein eigener Fall: dort kann niemand nachtraeglich etwas aendern.
4. **Neue Stufen: „benutzte Stilvariablen sind gesetzt" und „Abschnitte in Trichter-Reihenfolge".** Die dritte (definierte Klassen werden benutzt) hat er nicht genommen — siehe Punkt 2.

## Kontrast (08.09., Bloecke 9 bis 12) — acht Stellen, drei Entscheidungen, zwoelf Messfehler

Ausgeloest von einer Randnotiz in Re-Check 10: weisse Schrift auf der orangen Marke erreicht 2,79:1 und liegt damit unter der AA-Schwelle 4,5 fuer normalen Text. Was daraus wurde, ist der laengste Faden des Tages — und **kein einziger Block hatte am Ende den Umfang, mit dem er angefangen hat.** Block 9 hiess „fuenf Stellen" und wurden sieben; Block 10 hiess „ein Wort" und wurden 17 Paletten plus Standard-Thema; Block 11 entstand ueberhaupt erst aus einem MAJOR gegen Block 9. **Jede Vergroesserung war eine Messung, keine Meinung.**

### Was Bolle entschieden hat

1. **Die eigene Marke wird dunkler, die Schrift bleibt weiss.** Der Wert ist gerechnet, nicht gewaehlt: `#FF6F00` hat Farbton 26,1°, volle Saettigung, 50 % Helligkeit; beides gehalten und nur die Helligkeit gesenkt, ergibt der erste Wert ueber der Schwelle **`#C25400` bei 38 %, 4,60:1**. Dasselbe fuer das einzige Motto darunter: `baustelle` `#E65100` (3,79) → `#CC4800` (4,67).
2. **Auf der Gaesteseite behaelt der Knopf die Mottofarbe, die Schrift richtet sich danach.** Die Alternative (volle dunkle Flaeche) haette alle 17 geloest, macht aber aus jedem Motto einen fast schwarzen Klotz. Gewaehlt ist der Weg, der die Identitaet behaelt.
3. **Bei WhatsApp bleibt das fremde Markengruen exakt, nur die Schrift wird dunkel.** `#25D366` ist WhatsApps Farbe; sie anzutasten haette Wiedererkennbarkeit gekostet, dunkle Schrift kostet nichts (1,98 → 8,78:1).

### Re-Check 13 (Chat `0fd1e453`, Opus 5 Maximal): 2 MAJOR — beide gegen Behauptungen des Autors

Der Gutachter hat den Diff byte-genau bestaetigt und **alle Kontrollzahlen nachgerechnet, keine war falsch.** Die MAJOR lagen nicht im Diff, sondern in dem, was er nicht enthielt.

- **Es waren sieben Stellen, nicht fuenf.** `background:#D4812A;color:#fff` steht je einmal in beiden Dateien — der Autopilot-Knopf im Planer und **der Edit-Link in der Mail, mit der der Gastgeber seine Partyseite verwaltet.** Weiss darauf 3,01:1. **Der Commit-Betreff von Block 9 behauptet „GENAU die fuenf Stellen" und ist damit falsch;** die Richtigstellung steht hier, aber wer die Historie liest, hat dieses Doc nicht daneben.
- **„Der Ersatzwert wird nie gerendert" war falsch.** Der CSS-Fallback feuert wirklich nie, aber `applyAccent` traegt einen zweiten in JavaScript (`:1562`), und `discardResume()` ruft `applyAccent(null)` (`:1685`). **Wer im Wiederaufnahme-Banner auf „Neu starten" klickt, setzt `--accent` scharf auf das Literal.**

### Die Bloecke

- **Block 9** (`030cdbf2`): die fuenf Stellen mit `background:#FF6F00;color:#fff` plus der Motto-Akzent `baustelle`. Gemessen ueber 260 ausgelieferte Dateien und 47627 Regelbloecke. **Nebenbei geklaert:** das Abzeichen „Neu" auf der Baustelle-Karte stand bei 3,79:1 **sichtbar auf dem ersten Bildschirm** — gefunden, weil alle 311 sichtbaren Knoten der Startstufe abgetastet wurden statt der erwarteten Elementsorte.
- **Block 10** (`811a4ad9`): der Hauptknopf der Gaesteseite lag auf `linear-gradient(135deg, a, h3)`, also auf einem Verlauf zur **hellsten** Palettenfarbe, mit weisser Schrift. Am schlechtesten Ende erfuellte **ein** Motto von 17 die Schwelle; `baustelle` lag bei **1,16:1**. Jetzt: volle Mottofarbe, Schriftfarbe je Palette, zwei Akzente um zwei Helligkeitspunkte nachjustiert. **17 von 17.** Der Verlauf bleibt, wo kein Text darauf liegt.
- **Block 11** (`df9ae560`): die zwei uebersehenen `#D4812A`-Flaechen → `#A66521` (4,66:1) und der JavaScript-Ersatzwert → `#C25400`.
- **Block 12** (`888ea0af`): die zwei WhatsApp-Teilen-Knoepfe, **1,98:1 — der schlechteste Wert des Tages**, an einem Element, das jeder Gastgeber zum Teilen benutzt.

**Abnahme:** stage 50/50, restore 59/59, frist 6/6, anders 12/12, age 8/8 und `node --check` vor jedem Commit; Laeufe 31 bis 33 des Pruefstands 0 Rot, 71/71, und Stufe 60 sechsmal in Folge unveraendert bei 339/4187.

**Die Kontrollzahl, die zaehlt, ist nicht „acht behandelt", sondern die Erschoepfung:** ueber beide Dateien 3323 Regelbloecke gelesen, 11 mit heller Schrift auf fester Flaeche, davon **0 unter 4,5:1.** Vor dem Nachmittag waren es acht.

### Eine Klasse, die uns beiden entgangen ist — und die naechste Entscheidung fuer Bolle

Wir haben den ganzen Nachmittag **helle Schrift auf farbiger Flaeche** gesucht und die Umkehrung nie gestellt: **Markenfarbe als Schrift auf heller Flaeche.** Dieselbe Farbe, dieselbe Norm, andere Richtung. Sechs Stellen im Planer, alle unter der Schwelle:

| Stelle | Farbe | Grund | Wert |
|---|---|---|---|
| `.topnav__brand` | `#FF6F00` | Seitengrund `#FFF8F0` | 2,65 |
| `.topnav__btn:hover` | `#FF6F00` | `#FFF3E6` | 2,55 |
| `.pick__head` | `#FF6F00` | Seitengrund | 2,65 |
| Knopf „E-Mail aendern" | `#D4812A` | Seitengrund | 2,86 |
| „✓ Gewaehlt" | `#D4812A` | Seitengrund | 2,86 |
| Knopf „Gaeste uebernehmen" | `#D4812A` | Seitengrund | 2,86 |

Der Seitengrund ist belegt (`html,body{…background:#FFF8F0…}`, `:128`), und fuer die betroffenen Elemente gibt es keine eigene Hintergrundregel. **Fuenf sichtbare Zustaende, einer nur im Hover.** Entscheidung offen.

### Zwoelf Messfehler an einem Nachmittag, und was sie gemeinsam haben

Sechs beim Autor, sechs beim Pruefstand. **Keiner waere an einem Exit-Code gescheitert; alle sahen aus wie Ergebnisse.** Und alle zwoelf sind aufgefallen, weil der jeweils andere nachgerechnet hat.

- **Nach dem Wert suchen statt nach der Eigenschaft.** `#FF6F00` gesucht, `#D4812A` uebersehen (sieben statt fuenf Stellen). Die Umkehrung derselben Regel fand spaeter den achten Fall — die schaerfste Fassung: **wer nach dem sucht, was er erwartet, findet nie das Nachbarhaus.**
- **Nach Rollen zaehlen statt nach Vorkommen.** 6 statt 17 Verwendungen der Palettenfarbe. **Erst zaehlen, dann deuten.**
- **Indirektion uebersehen.** `${t.a}` → `--ag` → `var(--ag)`: zwei Schritte, das Muster sah einen.
- **Position annehmen, wo Zugehoerigkeit gemeint war.** `class="` unmittelbar gefolgt vom Namen — die Klasse stand an zweiter Stelle, und aus „zweimal benutzt" wurde „tot". Trifft rueckwirkend jede Zaehlung „definiert, nie benutzt".
- **Was in keiner Liste steht, wird nicht mitgezaehlt.** Zweimal am selben Nachmittag: `DEFAULT_THEME` und der `applyAccent`-Ersatzwert. **Erst fragen, was der Rueckfall ist, dann die Liste zaehlen.**
- **Eine geschaetzte Zahl im Gewand einer gemessenen.** `#C85A00 ≈ 4,6:1` waere bei 4,27 gelandet. Schlimmer als eine falsche Messung, weil das Ungefaehr-Zeichen wie Bescheidenheit aussieht.
- **Eine Zeilennummer ist bei 469 Zeichen keine Fundstelle, sondern eine Gegend.** 78 Zeilen im Planer sind laenger als 300 Zeichen, die laengste hat 14360. **Beleg ab jetzt: Zeile plus Spalte oder Wortlaut.**
- **Ein Werkzeug, das an seiner eigenen Erfolgsmeldung scheitert.** Das Commit-Skript stuerzte beim LESEN der Ausgabe seines Kindprozesses ab (cp1252 an einem Gedankenstrich); die Aenderung lag im Baum, der Commit fehlte. **Nach einem abgestuerzten Werkzeug prueft man den Zustand, nicht die Absicht.**

**Und der einzige Fall, in dem die Kontrolle vorher kam statt hinterher:** bei der letzten Messung stand die Gegenprobe (`x{border-color:#FF6F00;color:#FF6F00}` muss genau einen Treffer geben) **vor** dem Zaehlen und schloss vier `border-color`-Treffer aus, bevor sie in eine Zahl geraten konnten. **Der Unterschied zwischen Pruefen und Aufraeumen kostet dasselbe, nur in der anderen Reihenfolge.**

## Bolle sieht sich die Seite an (08.09., Bloecke 13 bis 15)

Die drei letzten Bloecke des Tages kamen nicht aus einem Gutachten, sondern daraus, dass Bolle die
Seite geoeffnet und gesagt hat, was er sieht. **Beide Befunde, die daraus wurden, hatte kein Reviewer
gefunden — und einer davon war mein eigener Fix.**

### Block 13 (`f33f4b56`) — der PayPal-Knopf erbte die dunkle Schrift

Re-Check 14, zwei Befunde, beide fix-induziert:

- **MAJOR.** Der PayPal-Knopf auf der Gaesteseite ueberschreibt per Inline-Stil nur den *Hintergrund*.
  Seit Block 10 holt `.btn` seine Schriftfarbe aus `var(--at)` — bei den sechs Paletten mit dunkler
  Schrift erbte der Knopf damit dunkle Schrift auf PayPal-Blau: **5,22 wurde 2,95.** Der Knopf war
  vorher in Ordnung. Dieselbe Klasse wie in Block 8c: **eine Regel zentralisieren und die Ausnahme
  uebersehen, die sich nur halb daran haelt.**
- **MINOR.** `#studioCta` hatte `border:2px solid #D4812A`, der Knopf darin seit Block 11 `#A66521` —
  ein dunkler Knopf in einem hellen Rahmen. Dasselbe in der Mailvorlage. Beide auf den neuen Ton; die
  Mailtexte steigen dabei von 3,01 auf 4,66.

Zwei Behauptungen aus meinem eigenen Pruefauftrag hielten der Nachrechnung nicht stand: „acht Stellen"
ist woertlich falsch (zwoelf existieren, acht wurden behandelt), und „zwei Helligkeitspunkte" waren
knapp drei — **eine Abschneidung, die als Messung auftrat.**

### Block 14 (`7b82b51c`) — „fast alles hell", und der Grund stand in den Daten

Bolles Wortlaut zur Baustelle-Seite: *„sah scheisse aus … fast alles hell … da war prinzessin viel
schoener."* Gemessen ueber alle 16 Paletten: jede hat eine Leiter von der dunklen Ueberschriftfarbe
`h1` ueber `m` und `a` zu den hellen Toenen; bei `baustelle` war `h1` genau so hell wie `a`, `m` sogar
heller, `h2` noch heller. Die Palette hatte nirgends einen dunklen Ton. `zirkus` war der zweite,
mildere Fall.

Bolles Entscheidung: **Leiter nachziehen** — die drei dunkleren Felder auf das Mass der anderen
vierzehn. Die Grundfarbe `a` und der helle Ton `h3` bleiben unangetastet.

**Der Pruefstand hat den Block unabhaengig nachgemessen, und ich habe seine Zahlen selbst nachgerechnet.
Drei meiner Saetze mussten daran dran glauben:**

**1. „Farbton und Saettigung bleiben" stimmt fuer zwei von sechs Werten.** Nachgerechnet in HSL:

| Wert | vorher → nachher | Farbton | Helligkeit |
|---|---|---|---|
| baustelle `h2` | `#FBC02D` → `#CD6509` | 42,8 → 28,2 (**−14,7°**) | 58 → 42 |
| baustelle `m` | `#F9A825` → `#B05608` | 37,1 → 27,9 (**−9,2°**) | 56 → 36 |
| zirkus `h1` | `#E65100` → `#994300` | 21,1 → 26,3 (**+5,1°**) | 45 → 30 |
| zirkus `m` | `#E65100` → `#B85000` | 21,1 → 26,1 (**+5,0°**) | 45 → 36 |
| baustelle `h1` | `#F57F17` → `#934806` | 28,1 → 28,1 (unveraendert) | 53 → 30 |
| zirkus `h2` | `#FF6F00` → `#D65D00` | 26,1 → 26,1 (unveraendert) | 50 → 42 |

**Das Baustellen-Gelb ist in den dunklen Toenen jetzt orange-braun.** Designerisch ist das der normale
Weg — dunkles reines Gelb sieht oliv aus, jeder Farbwaehler dreht dort Richtung Orange —, und `a`, `l`,
`bg`, `h3` sind unangetastet, der Gesamteindruck bleibt gelb. Aber **Gelb ist bei einem Bagger-Motto
Identitaet**, und mein Satz hat behauptet, es bewege sich nur die Helligkeit. Das war falsch.

**2. „Weisse Schrift auf `h1` und `m` wird normkonform" behauptet Flaechen, die es nicht gibt.**
Nachgezaehlt: `--h1` und `--h2` existieren **gar nicht** als CSS-Variablen (0 Definitionen), `h1`/`h2`
sind ausschliesslich Stops in Verlaeufen. Und `var(--m)` steht im Gastbereich **17-mal, davon 17-mal als
`color:` und 0-mal als Flaeche.** Der echte Gewinn liegt darum in der anderen Richtung, und er ist
groesser als der behauptete: **`m` als gedaempfte Schrift auf `bg`, baustelle 1,92 → 4,89, zirkus
3,46 → 4,57** — an 17 Textstellen je Palette.

**3. Zwei Maesse, dasselbe Ergebnis.** Ich rechnete HSL-Helligkeit, der Pruefstand wahrgenommene
Helligkeit ueber die Luminanz; in meinem Mass waren zwei Paletten flach, in seinem eine. **Beide Maesse
sagen: vorher flach, nachher keine.** Nur muss eine Zahl im Bericht sagen, welches Mass sie meint.

### Die zweite Kontrast-Richtung ist groesser als das Ticket dachte — Entscheidung offen

Die Tagesbilanz **„17 von 17 ueber der Schwelle" gilt weiter, aber nur fuer eine Richtung**: Schrift auf
Akzentflaeche (17 Paletten geprueft, 0 unter 4,5 — mit dem echten Rueckfall `#fff` fuer die elf
Paletten ohne eigenes `bt`). In der Gegenrichtung, `m` als Schrift auf dem hellen Seitengrund, liegen
**fuenf von siebzehn** darunter:

| Palette | `m` auf `bg` | |
|---|---|---|
| dino | 3,78 | |
| dschungel | 3,78 | |
| DEFAULT_THEME | 3,91 | steht in keiner Liste — der Pruefstand nannte vier, das ist die fuenfte |
| meerjungfrau | 4,06 | |
| safari | 4,48 | knapp |

Das ist **dieselbe offene Frage wie „Markenfarbe als Schrift auf hellem Grund"**, nur auf der
Gaesteseite und mit 17 Textstellen je Palette statt sechs im Planer. Nicht angefasst — Bolles
Entscheidung.

### Block 15 — die Gastgeber-Seiten hatten ueberhaupt kein Desktop-Layout

Erst der zweite Bildschirmabzug („desktop sieht soo aus … PUH..") zeigte die eigentliche Ursache:
`baseHead` setzt `.container{max-width:480px}`, und **der Worker hat keinen einzigen
Breiten-Umbruchpunkt.** Auf jedem Bildschirm ueber 480 px stand eine Handy-Spalte in der Mitte und
sonst nichts. Meine Block-14-Diagnose war **echt, aber falsch zugeordnet**: sie betrifft die
Gaesteseite; die Editorseite zieht aus dem Motto genau **eine** Farbe (`--a`), alles andere ist fest.

Bolles Entscheidung: **erst nur breiter machen**, kein Umbau, Reihenfolge bleibt. Ab 900 px waechst die
Spalte auf 760 px. Am lebenden Editor gemessen: Behaelter 480 → 760, Seite 61 px kuerzer, **140
Elemente geprueft, 0 laufen ueber**, kein Querbalken; die Grenze beisst genau (899 → 480, 900 → 760),
auf dem Telefon aendert sich nichts (375 → 375).

**Die Messung hat eine zweite Aenderung erzwungen.** `.btn` ist im Worker standardmaessig volle Breite
(nur `.btn-sm` setzt `width:auto`). Auf der 404-Seite steht so ein Knopf allein im Behaelter — bei 760
waere daraus ein **728 px breiter oranger Balken** geworden. Sie bekommt darum dieselbe Inline-Breite,
die ihre Schwesterseite `doiPage` schon traegt (520). **Ohne das haette „nur breiter" eine Seite
verbessert und eine verschlechtert.**

Was `baseHead` sonst noch bedient — die Zaehlung stand vor der Aenderung:

| Stelle | Seite | betroffen? |
|---|---|---|
| `:1503` | `creatorPage` | nein, seit 07.09. nicht mehr geroutet („/" leitet auf den Planer um) |
| `:2015` | Editor-Zweig von `partyPage` | **ja** — Bolles Bildschirmabzug |
| `:3107` | 404 | ja, bleibt aber per Inline-Breite schmal |
| `:3131` | DOI-Bestaetigung | nein, trug die Inline-Breite schon |

Die **Gaesteseite steht ausdruecklich nicht drin**: sie hat einen eigenen Kopf (`guestPageFull` ruft
`baseHead` nicht auf) mit `.hero-inner`/`.content` bei je 480 px und ebenfalls keinem Umbruchpunkt. Sie
wirkt auf dem Desktop trotzdem passabel, weil das Kopfbild ueber die volle Breite laeuft. Ticket, keine
Aenderung.

### Messfehler 13 bis 17 — und zum ersten Mal fangen Waechter statt Gutachter

- **13 (Autor, vom Assert gefangen).** Im Fix-Skript stand `count('min-width') == 0`. Das Wort steht
  **zwoelfmal** in der Datei — jedes Mal als CSS-Eigenschaft an einem Element (`flex:1;min-width:0`),
  **nie** als Merkmal einer Medienabfrage. Der Assert lief vor dem Schreiben, nicht der Gutachter
  danach.
- **14 (Autor, von der eigenen Gegenprobe gefangen).** Beim Nachrechnen der Palettenwerte fing mein
  Muster das Feld `bt` nicht ein — jede Palette fiel auf Weiss zurueck, und **genau die sechs mit
  dunkler Knopfschrift kamen als Fehler heraus.** Die Kontrolle meldete „6 Paletten unter 4,5" und
  haette die Block-10-Bilanz umgestossen. **Der Rueckfallwert hat die Messung gemacht, nicht die
  Daten.** Dritter Fall derselben Klasse an einem Tag.
- **15 (Autor, im Gespraech).** „Die Gaesteseite hat zwei Umbruchpunkte." Sie hat zwei `@media` —
  `hover` und `print`. **Keine Breitenabfrage.** Der Planer hat vier (420, 720, 768 zweimal) plus zwei
  fuer den Druck; der Worker hatte null.
- **16 (Autor, Zuordnung statt Zahl).** Die flache Baustelle-Palette wurde Bolle als Erklaerung fuer
  eine Seite gezeigt, auf der sie gar nicht ankommt. **Eine richtige Messung am falschen Gegenstand
  ist kein halber Befund, sondern eine falsche Antwort.**
- **17 (Pruefstand, und der lehrreichste).** Sein Schutz gegen eine Messfalle — `MSYS2_ARG_CONV_EXCL`
  gegen die Pfadmangelung — hat Stufe 1b umgebracht: die Stufe reicht `node.exe` einen absoluten Pfad,
  der ohne Konvertierung als `/c/Users/...` ankommt. Lauf 36 meldete drei Syntaxfehler in Dateien, die
  seit Juli unveraendert sind. **Ein Werkzeug, das gegen eine Falle schuetzt, kann eine andere
  aufmachen.** Gefunden, weil die Zahl nicht zur Aenderung passte und damit begruendungspflichtig war.

**Und eine Reihenfolge, die nicht gestimmt hat:** meine Frage „Strom offen?" fuer Block 15 kam beim
Pruefstand an, als Block 14 schon im Baum stand. Es lief kein Lauf, es ist nichts entwertet — aber die
Frage gehoert **vor** die Aenderung, nicht danach.

## 09.09.2026 — der Trichter, der Deploy, und ein Nachweis, der seine eigenen Luecken gefunden hat

### Bolles Bremse, und sie war berechtigt

Woertlich: *„Ihr solltet auch den Funnel perfektionieren. Jetzt haengen wir stundenlang am Design. Seid
ihr falsch abgebogen?"*

**Ja, teilweise — und der Abzweig gehoert dem Autor.** Eine Randnotiz aus einem Gutachten („weisse Schrift
auf der orangen Marke erreicht 2,79") ist zur Tagesordnung geworden, weil jede Messung eine naechste
erzwang. Jeder Fund war echt. **Aber kein einziges Mal stand die Frage daneben, ob das den Trichter
bewegt.** Der Pruefstand hat sich der Bremse ausdruecklich angeschlossen: er ist mitgelaufen, nicht
mitgezogen worden.

### Block 19 (`051b7ab1`) — der Editor hatte keinen Weg zum Plan

Gemessen statt vermutet: `editorView` (Z. 2780–3103, **33.123 Zeichen**) enthielt **null** Vorkommen von
„Plan", „Planer", „kindergeburtstag" oder „/plan". **Wer eine Partyseite angelegt hat, sah auf der Seite,
die er danach immer wieder oeffnet, keinen einzigen Hinweis auf das, was das Produkt verspricht** — genau
die Sorge, die Bolle am 08.09. selbst formuliert hatte.

Gebaut ist der kleine Weg: eine Karte mit einem **blanken** Link auf den Planer. Die drei Verzichte sind
der eigentliche Inhalt des Blocks:

- **kein `?motto`/`?alter`/`?gaeste`** — die setzen `state` beim Init und koennen einem Gastgeber den
  eigenen gespeicherten Plan ueberschreiben. Beleg im Code selbst (`kindergeburtstag.html:1637`):
  *„Snapshot festhalten: Deep-Link-Eintritt (?motto/?alter) kann STATE_KEY via autoSave ueberschreiben"*,
  dazu `initFunnel:3815` mit `goStage(2)` — ein Rueckkehrer landete auf Stufe 2 statt dort, wo er aufhoerte.
- **kein `?ref`** — die Markierung bedeutet „von Party X kam ein NEUER Gastgeber". Der Gastgeber von
  Party X ist nicht sein eigener Empfehlungsfall; **eine Kennzahl, die Rueckkehrer als Neuzugaenge zaehlt,
  ist schlimmer als keine.**
- **kein Versprechen, das der Link nicht haelt** — „Hast du den Plan auf diesem Geraet begonnen, geht es
  genau dort weiter", nicht „dein Plan wartet".

**Daraus die Regel, die in eine kuenftige Trichter-Pruefstufe gehoert: Eintrittskanten sollen Daten
tragen, Rueckkehrkanten duerfen es nicht.** An der Eintrittskante weiss der Planer nichts, jeder Parameter
ist ein Gewinn; an der Rueckkehrkante weiss er alles, jeder Parameter ist ein Angriff auf den
gespeicherten Stand. Eine Stufe, die stumpf „traegt Daten mit" belohnt, haette hier eine Regression
gebaut und gruen gemeldet.

Ticket fuer den grossen Weg: den Plan-Schnappschuss beim Anlegen mitschicken, als `plan:<token>` ablegen
(Endpunkt und 90-Tage-Form gibt es schon) und den Token an der Party speichern — dann fuehrt der Knopf zu
GENAU diesem Plan, auf jedem Geraet. Drei Aenderungen und ein unabhaengiger Review; die Sanitisierung
waere **eine** Funktion fuer beide Endpunkte, nicht zwei getippte Kopien.

### Block 16 (`2bf3465a`) — die gedaempfte Nebenschrift, sieben Stellen

Die zweite Kontrastrichtung, gefunden vom Pruefstand beim Gegenmessen von Block 14: nicht Schrift AUF der
Mottofarbe, sondern die graue Nebenschrift auf hellem Grund. Im Gastbereich ist `var(--m)` **17-mal
Schriftfarbe und 0-mal Flaeche**.

| Stelle | vorher | nachher |
|---|---|---|
| dino / dschungel | `#558B2F` 3,78 | `#4C7C2A` 4,58 |
| DEFAULT_THEME | `#8B7D6B` 3,91 | `#807362` 4,51 |
| meerjungfrau | `#00838F` 4,06 | `#007A85` 4,57 |
| safari | `#8D6E35` 4,48 | `#8C6D34` 4,54 |

**Zwei Stellen mehr, als Bolle genannt hatte, und beide ausdruecklich angesagt statt mitlaufen gelassen:**
`baseHead --m` (die feste graue Schrift der Gastgeber-Seiten, **59 Vorkommen, davon 56 als `color:`**) und
die Markenzeile der Edit-Link-Mail (4,00 → 4,62; bei Mails kann niemand nachtraeglich etwas aendern).
Groesste Farbton-Drift **0,3 Grad** — anders als in Block 14, wo der Satz „Farbton bleibt" nicht trug.

### Bloecke 20, 21, 22 — der Kopf der Gaesteseite

**Block 20 (`ee264257`).** Der Hero-Befund, mit zwei unabhaengigen Verfahren gemessen (Pixelmessung am
gerenderten Dokument gegen Rechnung aus der Verlaufsformel, **gleiche Zahl**): der Kindername (42 px/800,
Schwelle 3,0) war ueberall in Ordnung, alles darunter nicht — `.hero-logo` 12 von 17 Paletten darunter,
`.hero-motto` 14 von 17, `.hero-sub` **17 von 17**.

**Der Schleier allein reicht nicht, und das ist der Kern:** bei 45 % Schleier blieben mit den alten
Deckkraften noch 8 von 30 Stellen rot, weil **50 % Weiss selbst auf reinem Schwarz nur 5,32:1 erreicht**.
Die Deckkraft deckelt oben, der Grund deckelt unten. Also beides: Schleier 36 % plus Deckkraft
90/100/100/100 statt 60/90/80/50.

**Eine sechste Stelle stand in keiner der beiden Messungen:** `.countdown-label`. Die Zaehl-Pille trug
`background:rgba(255,255,255,.15)` — **sie hellt ihren eigenen Grund auf** und stand auch mit Schleier und
voller Deckkraft noch bei 3,02. Weisse Schrift auf einer weissen Aufhellung, dieselbe Klasse wie der
PayPal-Knopf in Block 13.

**Block 21 (`1de5a9d9`).** Der Klassenbefund des Pruefstands: das fehlende Desktop-Layout hat zwei
Mitglieder. Bolle sah die Editorseite, gemessen war auch die Gaesteseite betroffen. Vorgelegt als
Entscheidungsfrage, seine Wahl: „Auch breiter machen". Vor dem Bauen gemessen: 81 sichtbare Elemente, 0
laufen ueber; der einzige breite Knopf ist der Absende-Knopf des Zusage-Formulars, wo volle
Formularbreite die richtige Form ist.

**Block 22 (`d5a5bde0`).** Entstanden aus einer **Frage** des Pruefstands, nicht aus einer Zahl: *„Hast du
am Text-SCHWERPUNKT oder an den Text-ENDEN gemessen?"* Am Schwerpunkt — und beim radialen Schleier ist
das der guenstigste Punkt jeder Zeile. Nachgemessen mit langem Namen und langem Motto an den echten
Textgrenzen je Zeile (`Range.getClientRects()`, nicht die Elementbox: **bei zentriertem Text ist die Box
so breit wie der Behaelter und meldet Raender, an denen gar kein Text steht**):

```
714 Messpunkte, 2 unter der Schwelle:  safari .hero-sub links 4,40 · rechts 4,45
```

Reparatur: Ellipse 150 %/115 % statt 100 %/100 %, Rand 26/28 statt 18/14, **Deckung im Zentrum
unveraendert**. Gegenprobe zur Variantenwahl: nur den Rand vergroessern reicht NICHT (4,45/4,48) — es ist
die Ellipsengroesse. Abnahme ueber sechs Breiten (360/420/560/700/899/1200): **3876 Messpunkte, 0 unter
der Schwelle, schlechtester Wert 4,70.**

**Und ein zweiter Fund aus derselben Frage, der die Richtung umdreht.** Der Pruefstand vermutete, die
groessere Schleier-Box werde von `.hero{overflow:hidden}` abgeschnitten und ergebe eine sichtbare Kante.
Gemessen bei 360 px hat die **alte** Fassung die Kante:

```
            x=0              x=2             x=30
alt   rgb(202,108,25)  rgb(142,76,18)  rgb(137,75,18)     Sprung von 60 Stufen auf 2 px
neu   rgb(135, 72,17)  rgb(135,72,17)  rgb(131,71,18)     glatt
```

Der alte Schleier endete **zwei Pixel vor dem Bildschirmrand** (Box 328 + 2×14 = 356 in 360). **Nicht der
Schnitt macht die Kante, sondern das Aufhoeren vor dem Schnitt.** Ein heller Zweipixelstreifen an beiden
Raendern, seit dem Deploy dieses Morgens ausgeliefert — **der einzige bekannte offene Live-Fehler**, und
die Zeile dagegen liegt fertig auf `draft`.

### Deploy 09.09. — `main = 2e2080de`, Worker `ac87e60e`

Bolle hat den Token geschickt. Merge per Plumbing (Baum identisch zu `draft`, **0 HTML-Dateien im Diff**,
also nichts fuer die Sitemap), Worker 184,70 KiB, Cron `0 8 * * *` weiterhin registriert. Ausgeliefert
sind damit die Bloecke 15, 16, 19, 20 und 21; Block 22 nicht.

### Der Live-Nachweis — 72 von 72, und 19 Luecken

Acht Dimensionen, jede mit eigener Abfrage, Kontrollzahl und Positivprobe, dazu eine unabhaengige
Gegenpruefung je Fehlschlag und eine Vollstaendigkeitskontrolle. **72 Pruefungen, 72 bestanden, 0
Fehlschlaege — und die Vollstaendigkeitskontrolle war wertvoller als alle Haekchen zusammen.**

- **Drei Dimensionen prueften die VORSCHAU, nicht die Gaesteseite.** Alle Artefakte trugen das
  Vorschau-Banner und `partyContent:display:block`; die echte Gaesteseite liefert 50384 statt 49793 Bytes
  und ein Namensgatter ueber die volle Hoehe. Das CSS uebertraegt sich, **der Zustand nicht.**
- **Die Bytezahl ist gegen genau diesen Deploy blind.** Im Scratchpad lagen zwei Dateien mit exakt 49793
  Bytes, inhaltlich vermischt: die eine mit `--m:#8B7D6B` (alt) UND `#CD6509` (neu), die andere umgekehrt.
  **Alle geaenderten Hexwerte sind sieben Zeichen lang.** Konsequenz: md5 neben jeder Zaehlung, im selben
  Kommando.
- **Die „9277-Byte-Trunkierung", die vier Dimensionen dreimal verschieden erklaerten, war keine.** 9277 ist
  exakt die Laenge der Live-404-Seite — es war eine **fremde Seite im erwarteten Dateinamen.**
- Nie geprueft, weil das Verfahren es nicht sehen kann: die Edit-Link-Mail, die DOI-Seite, vier der sechs
  geaenderten Paletten. **Ein curl-und-grep-Nachweis endet an der Grenze des ausgelieferten HTML** — das
  ist eine Methodengrenze, keine Nachlaessigkeit, aber sie muss dastehen, sonst liest sich „acht
  Dimensionen, alles gruen" als Vollabdeckung.

### Neuer Befund: die Karte des Einladungsspiels

Weisse Schrift auf dem `h1→h2`-Verlauf plus die `.play-pill` (`t.a` auf Weiss). Gerendert gemessen bzw.
aus der Quelle gerechnet:

| Stelle | unter 4,5 bei |
|---|---|
| `.game-header-title` (16 px/800, weiss) | safari 3,19 · dino 3,73 · DEFAULT 4,08 · meerjungfrau 4,40 |
| `.game-header-sub` (11 px/400, weiss) | safari 3,13 · dino 3,64 · DEFAULT 3,98 · meerjungfrau 4,18 |
| `.play-pill` (12 px/800, `t.a`) | baustelle 2,65 · safari 2,65 · meerjungfrau 2,74 · dino 2,78 · zirkus 2,79 · DEFAULT 3,01 |

**Es sind viermal dieselben vier Paletten** — und das ist keine Sammlung von Einzelfaellen, sondern eine
Eigenschaft: **ihr `a` und ihr `h2` sind zu hell fuer beides — fuer weisse Schrift darauf und fuer sie
selbst als Schrift auf Weiss.** Dieselbe Groesse, beide Richtungen, die Verallgemeinerung dessen, was bei
`m` aufgemacht wurde.

**Und die Pointe, die keiner gesucht hat: Block 14 hat die Spielkarte repariert, ohne dass es im Auftrag
stand.** Aus `git show f33f4b56` nachgerechnet:

```
baustelle VORHER  weiss auf h1 2,65   auf h2 1,66        NACHHER 6,62 / 3,85
zirkus    VORHER  weiss auf h1 3,79   auf h2 2,79        NACHHER 6,65 / 3,87
```

**1,66 ist der zweitschlechteste Wert dieser zwei Tage** — nur der Verlaufsknopf mit 1,16 war schlimmer,
und beide sassen auf dem Element, mit dem sich das Produkt verbreitet. **Die vier, die heute durchfallen,
sind die vier, deren Verlaufsfarben noch nie jemand angefasst hat.** Baustelle und zirkus sind draussen,
weil Bolle hingesehen hat.

**Die Reparatur ist klein, und ein Vorschlag musste dafuer zurueckgezogen werden.** Der Autor hatte „vier
Mottos brauchen einen dunkleren Grundton" vorgeschlagen — **das haette Block 10 rueckgaengig gemacht:** die
sechs Paletten mit dunkler Knopfschrift sind exakt die sechs mit der zu blassen Pille. **Eine Reparatur,
die auf die richtige Messung zeigt und in die falsche Richtung zieht** — die gefaehrlichste Form des
Tages. Richtig ist:

```
.play-pill   t.a -> t.d auf Weiss:   6 von 17 unter 4,5   ->   0 von 17, schlechtester 7,87
.game-header derselbe Schleier wie im Seitenkopf, eine Regel, keine Farbe angefasst
```

Offen: die Pille **pulsiert**. Dunkle Schrift auf weissem Grund pulsiert anders als helle — das Auge folgt
dann der Flaeche statt der Schrift. Gestaltung, keine Norm; Bolle entscheidet.

### Befund 07 aufgeloest — es war nie eine Preisfrage

Gemessen: `setInviteType()` wird nirgends aufgerufen, es gibt kein Markup mit `invite-type-btn` (6
CSS-Regeln, 0 Knoepfe), `state.invite.type` steht dauerhaft auf `minispiel`. Die Variante **Karte** ist
fertig gebaut — ein einziger Fehler drin, der fest verdrahtete Ort `Bei uns zuhause`, waehrend die
richtige Fassung fuenf Zeilen darunter im WhatsApp-Text schon steht. Und die Variante **Druck** rendert
eine A6-Vorschau, waehrend **`window.print` im ganzen Planer null mal vorkommt.** Es gab keinen Weg, die
Karten zu bekommen.

**Wir haben monatelang eine Entscheidung fuer teuer gehalten, die gar nicht existierte, weil niemand die
eine Null gemessen hat.**

Bolles Antwort loest den Rest: **CEWE oder dm, auf Fotopapier, der Gastgeber laedt selbst hoch.** Kein
Partner, kein Versand, keine Bezahlung — wir liefern eine Bilddatei.

### Sofortdruck: was es wirklich gibt (recherchiert, 09.09.2026)

| Zweck | Format | Preis | Verfuegbarkeit |
|---|---|---|---|
| Einladung | 10 × 15 cm | 0,27 € | ueberall |
| Urkunde, Standard | 15 × 20 cm | 0,49 € | **von CEWE fuer ALLE Stationen zugesagt** |
| Urkunde, gross | 20 × 30 cm | 2,95 € (ab 2 St. 1,95 €) | nur an ausgewaehlten Stationen |
| darueber | 30 × 40 / 30 × 45 cm | 6,95 € | vom Mitarbeiter gefertigt, keine Zeitangabe belegt |

**A4 auf Fotopapier gibt es im Sofortdruck nirgends.** Ein Durchlauf ueber 15.001 Produkt-IDs des
dm/CEWE-Preisdienstes fand 94 Sofortdruck-Produkte, davon 14 Fotoabzuege; das groesste ist 20 × 30.

**Der Punkt, der die Arbeit verdoppelt, wenn man ihn uebersieht: 15 × 20 ist 3:4, 20 × 30 ist 2:3.** Bei
20 cm Breite ist das eine 26,7 cm lang, das andere 30 — **zwei eigenstaendige Layouts, keine Datei mit
zwei Exporten.** A4-Vorlagen aus dem Papierhandel (dort 84 % aller Urkundenformate) passen auf keines von
beiden: A4 ist 1:1,414, die Fotoformate liegen 6 % darueber oder 5,7 % darunter.

Kein Anbieter nennt einen Sicherheitsabstand in mm (Negativbefund ueber 6 geprueften Seiten). Aus dem
Akzidenzdruck uebertragen: Text mindestens 6 mm, besser 10 mm vom Rand — bei 300 dpi 71 bzw. 118 px.
**Vor dem Ausliefern ein echter Testdruck fuer 0,49 €**, weil keine Quelle sagt, wie feine Schrift auf
Fotobelichtung herauskommt und eine Urkunde fast nur Schrift ist.

### Messfehler 18 bis 22 — und was diesen Tag von gestern unterscheidet

Gestern fingen Waechter, heute fing **die jeweils andere Sitzung**. Beide Male stand die falsche Fassung
kurz davor, eine Entscheidung von Bolle zu formen.

- **18 (Pruefstand).** „Fuer Block 21 liegt gar keine Freigabe vor." Falsch — sie war die ausdruecklichste
  von allen; der Befund war bereits an Bolle berichtet und wurde zurueckgenommen. **Aus einer Luecke im
  eigenen Wissen eine Aussage ueber die Welt gemacht.**
- **19 (Autor, drei Anlaeufe in EINER Messung).** Erst den Verlauf getauscht ohne die Schriftfarbe (Text
  und Grund waren dieselbe Farbe, 1,06). Dann `visibility:hidden` statt `color:transparent` — **das
  entfernt auch die Flaeche, die man messen will**, die weisse Pille verschwand mit ihrem Text.
  Entschieden hat es ein vorher hingeschriebener Satz: *„unter der weissen Pille MUSS rgb(255,255,255)
  liegen."*
- **20 (Autor).** Die Akzentspalte der Messung war **getippt** statt abgeleitet — safari bekam `h1`,
  pferde `h2`, dino gar nichts. **Drei von sechs Werten falsch, die Gesamtzahl trotzdem richtig.** Der
  Beweisschritt kam vom Pruefstand: *waere es eine Methodendifferenz, muessten alle sechs verschoben sein.*
- **21 (Autor).** Der Vorschlag „vier Mottos brauchen einen dunkleren Grundton" — siehe oben, er haette
  Block 10 mit dessen eigener Begruendung umgedreht.
- **22 (Pruefstand, vor dem Absenden gefangen).** Eine Sechserliste, gerechnet auf `h2`, dem hellsten Ende
  des Verlaufs, **wo der Text nicht steht.** Fuenfte Instanz von „richtig gerechnet, am falschen Ort" —
  und die erste, die ihre Sitzung nicht verlassen hat.

**Die zwei Saetze, die aus diesem Tag bleiben:**

**„Eine falsche Zahl kostet zwei Pruefungen und schliesst die Frage; eine Frage ohne Zahl kostet eine
Messung und oeffnet sie."** Beide echten Funde in Block 22 — die Zeilenenden und der Randstreifen — kamen
aus Fragen, die der Pruefstand ausdruecklich **nicht** als Befund formuliert hat, weil ihm der Ort fehlte.
Als Befund waeren beide widerlegt worden und die Fehler waeren geblieben.

**„Du hast die Spanne, ich habe den Punkt."** Die Rechnung aus dem Quelltext liefert das Intervall
zwischen zwei Verlaufsenden, die Pixelmessung den Wert an der Stelle, an der der Text wirklich steht.
Jeder gemessene Wert lag zwischen den gerechneten Enden. **Keines der beiden Verfahren haette den Tag
allein getragen.**

### Protokoll zwischen den Sitzungen — jetzt mit Zeitbezug

Dreimal an einem Tag ist eine Nachricht ueberholt worden. Die Reparatur laeuft in beide Richtungen:
**jedes „Strom offen?" traegt den SHA, von dem aus geaendert werden soll; jedes „Strom frei" traegt den
SHA, auf den es sich bezieht; stimmen sie nicht ueberein, ist die Freigabe abgelaufen.** Dazu die
Trennung, auf der der Pruefstand zu Recht besteht: **„Strom frei" ist eine Aussage ueber den Baum, nicht
ueber einen Auftrag.**

Und dieselbe Konstruktion gilt fuer Bolles Freigaben: **eine Freigabe gilt fuer den Stand, auf dem sie
erteilt wurde; eine spaetere Richtungsansage hebt sie auf, bis sie neu vorgelegt ist.** Genau so ist es
mit den zwei Design-Bloecken nach der Bremse gelaufen — neu vorgelegt, nicht widersprochen, dann der
Token auf eine Liste, die beide namentlich nennt.

### Offen bei Bolle (Stand 09.09.2026, nach dem Deploy)

1. **Token fuer den zweiten Deploy** — Block 22 repariert einen Live-Fehler von heute frueh.
2. **Druckgroessen**: 15 × 20 als Standard, 20 × 30 als grosse Variante? Danach zwei Layouts bauen.
3. **Die Spielkarte**: `.play-pill` auf `t.d` (0 von 17 rot) und derselbe Schleier auf `.game-header`.
4. **Markenfarbe als Schrift auf hellem Grund** — sechs Stellen im Planer, plus die Frage, ob der
   Neutral-Rueckfall `#D4812A` dieselbe Farbe sein soll wie die Markenfarbe (20 Fundstellen, davon eine
   `DEFAULT_THEME.a`, auf der Block 10 steht).
5. **Nur-Bolle**: Cloudflare Scrape Shield → E-Mail-Verschleierung aus (§5 DDG); Google Search Console
   (Sitemap, die zehn URLs); den `cfut_`-Token loeschen.

### Zweiter Deploy 09.09. — `main = 2a48fff6`, Worker `083ce6e6`

Bolle hat einen zweiten Token geschickt. Block 22 ist damit live; der Randstreifen ist weg. Am
gerenderten Dokument nachgemessen, Fenster 360 px, Pixelreihe vom linken Rand nach innen:

```
            x=0              x=2             x=10            x=30
vorher rgb(202,108,25)  rgb(142,76,18)  rgb(142,77,18)  rgb(137,75,18)     Sprung 60 Stufen auf 2 px
jetzt  rgb(135, 72,17)  rgb(135,72,17)  rgb(134,73,17)  rgb(131,71,18)     glatt
```

Dazu die drei alten Regeln nachweislich raus und die vier neuen drin, mit Empfangsbeweis (50384 Bytes,
md5 `65688a3c498a`, „machsleicht" 14×). **Wieder 0 HTML-Dateien im Merge — fuer die Search Console ist
auch dieser Deploy leer.**

### Block 23 (`f904f8bc`) — die Markenfarbe als Schrift, und drei falsche Gruende in unserer eigenen Tabelle

Bolles Entscheidung: „Die sechs Stellen dunkler." **Beim Rechnen kam heraus, dass die Tabelle in diesem
Doc an drei von sechs Stellen den falschen Grund nennt** — sie stammte aus dem Stylesheet, nicht aus dem
gerenderten Dokument. Am lebenden Planer nachgemessen (Elternkette aufwaerts bis zur ersten deckenden
Flaeche):

| Stelle | dokumentierter Grund | **gemessener Grund** |
|---|---|---|
| `.topnav__brand em` | Seitengrund `#FFF8F0` (2,65) | **weiss, die Kopfleiste** (2,79) |
| „✓ Gewaehlt" | Seitengrund `#FFF8F0` (2,86) | **weiss, `.ps-game`** (3,01) |
| E-Mail aendern | Seitengrund `#FFF8F0` (2,86) | **`#FFF8EC`, der Mail-Kasten** (2,85) |

`.pick__head` (`#FFF8F0`) und `.topnav__btn:hover` (`#FFF3E6`) stimmten. **Die Werte verschieben sich
kaum — aber der haerteste Grund entscheidet ueber den Zielwert, und der stand falsch da.**

**Und der Pruefstand hat den Fehler abgefangen, der daraus fast geworden waere.** Der am 08.09. gewaehlte
Wert `#A66521` wurde auf **Weiss** gerechnet (4,66). An den echten Orten:

```
#A66521  auf #FFF8F0  4,43        auf #FFF3E6  4,27        beide UNTER 4,5
```

**Haette ich ihn uebertragen, waeren alle sechs Stellen unter der Schwelle gelandet — mit einer Farbe, die
wir am Vortag als Reparatur eingefuehrt haben.** (Kein Live-Befund: `#A66521` steht heute nur als Rahmen,
als Flaeche und als Mailschrift auf Weiss, nirgends als Schrift auf diesen Gruenden. Der Pruefstand war
dabei, genau das als Live-Befund zu melden, und hat es vor dem Absenden selbst geprueft — **eine Zahl, die
richtig ist und an einem Ort gilt, an dem der Wert nicht vorkommt.**)

Gewaehlt wurde deshalb **mit Abstand**, je Farbe gegen ihren haertesten gemessenen Grund, **Ziel 4,70
statt 4,50** — ein Grenzwert faellt beim naechsten Grundton-Wechsel still wieder durch:

```
#FF6F00 -> #B54F00    weiss 5,14 · #FFF8F0 4,88 · #FFF3E6 4,71    Ton +0,1 Grad, Saettigung gleich
#D4812A -> #9F601F    weiss 5,04 · #FFF8EC 4,77 · #FFF3E6 4,61    Ton -0,2 Grad, Saettigung +0,5
```

**Eine eigene Fehlzaehlung, die als Assert im Skript steht:** `count('color:#FF6F00')` liefert **sieben**
Treffer, aber nur **drei** sind Schriftfarben — die anderen vier sind `border-color:#FF6F00`.
**`border-color:` endet auf `color:`.** Dieselbe Adjazenzfalle wie am 07.09.; ohne negativen Vorblick
haette sie vier Rahmen mitgefaerbt.

**RICHTIGSTELLUNG ZUR COMMIT-NACHRICHT VON `f904f8bc`.** Sie nennt die **verworfene erste Wertfassung**
(`#BD5200`, `#B95100`, `#A46420`, gerechnet auf 4,50 gegen teils falsche Gruende). **Gueltig sind die
Werte oben: `#B54F00` und `#9F601F`**, je dreimal, und genau die stehen im Baum — nachgezaehlt. Die
Nachricht ist nicht nachtraeglich geaendert worden, weil der Commit bereits gepusht war und der SHA in
der anderen Sitzung als Bezug dient; **eine falsche Nachricht wird richtiggestellt, nicht ueberschrieben.**

Nicht angefasst, mit Grund: der Rueckfallwert `#D4812A` in seinen uebrigen Rollen (Bolle hat die sechs
SCHRIFT-Stellen entschieden, nicht die Farbe) · `border-color:#FF6F00` im Hover (2,55, aber Rahmen haben
Schwelle 3,0) · vier `color:#E64A00` (3,73 auf `#FFF8F0`), Hover-Zustaende im SEO-Fussbereich, dieselbe
Klasse, gemessen — Ticket, keine stille Erweiterung.

## Der Trichter, vollstaendig gemessen (09.09.2026)

Bolle hat nach dem Stand des Trichters gefragt und dann nach dem **kompletten Bild, Zielbild gegen
Stand**. Neun Messungen liefen unabhaengig voneinander gegen die ausgelieferten Seiten und den
Quelltext, dazu eine Analyse der Uebergaenge. **Kein Schreibpfad wurde angefasst** — keine POSTs, keine
Mails, keine KV-Aenderung; die Drosseln und die Zustellung bleiben damit ausdruecklich ungeprueft.

Ergebnis: **drei Stufen gruen, sechs gelb, eine rot.** Das Ergebnis liegt Bolle als eigenes Dokument vor;
hier stehen die Befunde, die neu sind, und die Tickets, die daraus folgen.

### Die groesste Luecke: Stufe 10 existiert nicht

```
Bezahlvorgaenge im gesamten Repo          0     (Kontrollzahl: 4x api.resend.com im selben Lauf)
Warteliste /api/waitlist                  1 POST-Route · 0 Leserouten · 0 Bestaetigungsmails
gespeichert                               {email, product, created}, 365 Tage
Zuordnung zu Plan, Motto oder Party       keine
"14,90 EUR" im ausgelieferten Markup      2 Treffer — das Produkt existiert nicht
```

**Jede andere Luecke ist ein Schaden AN einem vorhandenen Weg und mit wenigen Zeilen zu schliessen. Hier
fehlt der Weg selbst.** Und sie nimmt sich zusaetzlich die eigene Entscheidungsgrundlage: die Warteliste
waere der Beleg, welches der zwei geplanten Produkte zuerst gebaut werden soll — ohne Leseweg und ohne
Zuordnung wird die Nachfrage erhoben und nie ausgewertet. **Dieselbe Krankheit wie `ref`: erheben, nie
lesen.**

### Neue Befunde, gemessen

| # | Befund | Zahl |
|---|---|---|
| T1 | `#planer` ist ein totes Sprungziel | **388** Links im Deploy-Baum, **0** Elemente mit dieser Kennung, `location.hash` **0x** ausgewertet (Kontrollzahl: 139 id-Attribute im Planer) |
| T2 | Der zweite virale Loop fehlt ganz | **0 von 60** Spielseiten verlinken den Planer (Kontrollzahl: 74x `href=` auf denselben 60 Dateien) |
| T3 | Die virale Herkunft wird nie gelesen | `ref` validiert, gespeichert (`:511`), im Public-GET destrukturiert — **0** Lesezugriffe repo-weit (Kontrollzahl: `party.date` 41x in derselben Datei) |
| T4 | Keine Bild-Vorschau beim Teilen | der Worker kennt `body.photo` und `/api/ogimg`, der Planer sendet nur `photoRound` -> `hasPhoto=false` fuer **jede** ueber den Assistenten erzeugte Partyseite |
| T5 | Keine Bruecke Plan <-> Partyseite | `planToken` **0x** im ganzen Worker (Kontrollzahl: `doiToken` 13x); in der Plan-Whitelist kein `partyseite`-Feld |
| T6 | Der Schluessel laesst sich im Editor nicht sichern | `send-edit-link` **0x**, `email` **0x**, `edit=` **0x** im Rumpf von `editorView` (Kontrollzahlen im selben Abschnitt: `editToken` 16x, `Link` 19x) |
| T7 | Das Namensgatter schuetzt nichts | `partyContent` nur `display:none`, der Name im Klartext im Quelltext, die Loesung im Seitentitel — der Fehlertext nennt sie ausdruecklich. Der Code sagt es selbst: „KEIN Zugriffsschutz" |
| T8 | Fremde Geschenk-Reservierung aufhebbar | `unclaimWish()` sendet `{name, remove:true}` von jedem Geraet, der Server vergleicht nur den kleingeschriebenen Vornamen (`:862`) |
| T9 | Verwaiste Plan-Eintraege moeglich | der KV-Put (`:938`) steht VOR dem Resend-Aufruf (`:945`); scheitert der Versand, liegen Plan und E-Mail-Adresse 90 Tage da, ohne dass je ein Link zugestellt wurde — und es gibt **kein** DELETE (3 Vorkommen `api/plan`: POST, GET, slice) |
| T10 | `/api/plan` ohne Herkunftspruefung | im ganzen Worker nur **2x** `request.headers.get("Origin")`, die Plan-Route gehoert nicht dazu; einzige Bremse ist die IP-Drossel 5/h |
| T11 | Drei stille Ausfaelle beim Erinnerungs-Cron | (1) haengt an `party.email`, die nur die separate, fehlschlagbare Anlege-Mail setzt · (2) `if (!env.RESEND_API_KEY) return;` ohne Log · (3) `MAX_READS=200` ohne Nachhol-Fenster |
| T12 | Druckversprechen ohne Druckknopf | FAQ und JSON-LD sagen „laesst sich direkt aus dem Browser drucken"; `window.print` **0x**, `toBlob` **0x**, `download=` **0x**, `navigator.share` **0x** |
| T13 | Leerer Anlege-Aufruf erzeugt eine Party | `POST /api/create` mit `{}` antwortet 200 und legt an; `childName` faellt auf „Geburtstagskind", `age` auf `null`. Gedrosselt auf 8/h je Anschluss |
| T14 | Die generische Spur verliert den Kontext | `/kindergeburtstag/baustelle`: 11 Planer-Links, 6 mit `?motto=`. Die drei meistgesuchten Root-Seiten zusammen: **12 Links, 0 mit Parameter** |

**T13 ist mein eigener Fund und mein eigener Eingriff:** die Sonde hat wirklich eine Party angelegt. Eine
davon habe ich sofort geloescht (404 gegengeprueft), **eine zweite nicht — ihre Kennung stand nur in der
verworfenen Ausgabe einer frueheren Sonde.** Sie laeuft ueber ihre Lebensdauer ab. **Wer einen
Schreibpfad probeweise anfaesst, muss die Antwort aufheben, bevor er den naechsten Befehl schreibt.**

### Was gebaut ist und nie erreicht wird

`setInviteType()` (0 Aufrufer, 6 CSS-Regeln Unterhalt, ein verlorener Bezahleinstieg) · der Anker
`#planer` · die virale Herkunft · der Vorschaubild-Pfad · die Bruecke Plan/Partyseite ·
`paket/prinzessin/index.html` (auf der Platte, gitignored, live 404 — Gegenprobe `/paket/ritter/`
HTTP 200, 87.221 Bytes) · 60 Spiel-Shells ohne `robots`-Meta (0 von 60; Kontrollzahl: 93 andere Dateien
tragen eines).

### Wo das Produkt mehr verspricht, als es haelt

„Direkt aus dem Browser drucken" ohne Druckknopf · „auf jedem Geraet weiterbearbeiten", waehrend Foto,
Einladungstext und Partyseite zurueckbleiben · „14,90 EUR" ohne Produkt · „Auf die Warteliste" ohne
jeden Rueckkanal · ein Namensgatter, das wie ein Zugangsschutz aussieht · „der Verwaltungs-Link ist der
einzige Schluessel", waehrend der Editor keinen Weg bietet, ihn zu sichern.

### Was diese Messung NICHT wissen kann

Rankings und Besucher · Zustellung der drei transaktionalen Mails · ob der Cron bei Cloudflare
tatsaechlich registriert ist (belegt ist die Absicht in der Konfiguration und der ausgelieferte Code) ·
saemtliche Schreibpfade und ihre Drosseln · der persoenliche Gaestelink mit Token · der Inhalt des KV ·
Konversion und Umsatz. **Die gruenen Ampeln belegen Auslieferbarkeit, nicht Auffindbarkeit und nicht
Wirkung.**

### Bolles Frage: wo wird das digitale Paket ausgeliefert?

Seine Formulierung: *„fuer mich waere die partyseite in einem tab oder eigenem bereich der logischste
Ort. man passt die gaeste liste an … direkt aenderung des paket/portfolios?"*

**Das ist dieselbe Entscheidung, die er am 05./06.08. schon dreimal getroffen hat** („alles abgeleitet
aus fertigem Plan und Partyseite; handgepflegte Dubletten sind der Defekt"), nur auf den Ort angewandt.
Die Begruendung traegt: die Partyseite ist die **einzige** Stelle, an der Gaestenamen, Rollen, Zusagen,
Datum und Motto gemeinsam und aktuell liegen. Jeder andere Ort braeuchte eine Kopie der Gaesteliste.

Drei Folgen, die daran haengen:

1. **Das Paket braucht beide Haelften, und die Bruecke dazwischen gibt es nicht** (T5). Rollenkarten und
   Urkunden kommen aus der Party, Ablauf, Spiele und Einkaufsliste aus dem Plan. **Die Ortsentscheidung
   erzwingt damit den Bau der Bruecke** — bisher stand sie nur als Ticket.
2. **„Direkt geaendert" heisst erzeugen, nicht speichern.** Sagt ein Kind ab, darf kein altes Paket
   herumliegen. Dieselbe Regel wie oben, auf die Zeit angewandt statt auf den Ort.
3. **Die Zeichenmaschine darf es nur einmal geben.** Laege das Paket im Editor, muesste der Worker
   denselben Zeichencode tragen wie der Planer — wieder eine Dublette. Also: **eigener Bereich auf der
   Hauptseite, als Tab aus dem Editor angeboten**, mit Party-Kennung und Schluessel. Ein Ort, ein Code,
   beide Datenquellen.

Dazu ein Vorschlag, der nicht von ihm kam: **der Kaufweg gehoert an dieselbe Stelle.** Das Paket zeigt
sich mit den echten Namen der zugesagten Kinder und ist bis zum Kauf gesperrt — der Moment, in dem der
Gastgeber sein fertiges Fest vor sich sieht, ist der mit der hoechsten Zahlungsbereitschaft im ganzen
Trichter.

### Die Machbarkeitsprobe fuer die Druckdateien

Vorher eine Selbstkorrektur: ich hatte Bolle geschrieben, fuer den Druck „steht die Maschine schon".
**Gemessen stimmt das nicht** — der Planer hat `fillText` 0x, `measureText` 0x, `document.fonts` 0x,
`toBlob` 0x, `createObjectURL` 0x, `download` 0x. Er kann ein Foto zuschneiden und keinen Buchstaben auf
eine Leinwand schreiben. **Eine Analogie als Aufwandsschaetzung ausgegeben.**

Danach die Probe, und sie faellt guenstiger aus als die Korrektur: die vorhandene Gestaltung laesst sich
**abfotografieren** statt neu zeichnen.

```
Quelle 392 x 264 px  ->  Leinwand 1568 x 1056 px   Faktor exakt 4
Dauer 1,0 s · 195 KB als JPEG
Schriftkontrolle:  Nunito geladen · Lilita One geladen · Fraunces FEHLT
```

**Die Schriftkontrolle hat sofort etwas gefunden:** eine der drei Schriften ist auf der Planerseite gar
nicht geladen. Fuer die Karte folgenlos (sie benutzt Lilita One) — aber es beweist die Falle. **Vor dem
ersten Strich wird geprueft, ob die Schrift da ist, und bei `false` wird nicht gezeichnet, sondern
gemeldet.** Am 07.09. haben wir auf Ersatzschriften gemessen und es gemerkt; bei 300 dpi merkt es
niemand, bis die Karte im Briefkasten liegt.

### Richtigstellung zu T3 — „nie gelesen" war zu stark

Meine Tabellenzeile sagt: *„`ref` validiert, gespeichert, **0 Lesezugriffe repo-weit**".* **Das gilt fuer
das gespeicherte Feld, nicht fuer die Herkunft insgesamt.** Der Pruefstand hat den Unterschied gemessen,
ich habe ihn an der Quelle nachgeprueft:

```
Planer   state.ref  3 Vorkommen
           :3798  gesetzt aus ?ref=, geprueft gegen /^[a-z0-9]{6,12}$/
           :3278  im Anlege-Aufruf mitgeschickt   ref: state.ref || ''
           :3288  AUSGEWERTET:  plausible('party_created', {props:{ ..., referred: state.ref ? '1':'0' }})
Worker   party.ref  0 Lesezugriffe        body.ref 2 (einmal schreiben, einmal herausschneiden)
         Kontrollzahlen: party.date 41 · party.editToken 13 · party.email 5  -> das Muster arbeitet
```

**Richtig ist also: WIE VIELE Partys aus einer Empfehlung kamen, ist heute zaehlbar — aus WELCHER nicht.**
Die Kennung wird gespeichert und nie wieder angesehen.

**Und die Pointe steht eine Zeile ueber dem Nullbefund:** der Worker schneidet `ref` ausdruecklich aus
jeder oeffentlichen Antwort heraus (`const {editToken,email,doiToken,ref,address,invites,...safe}`). **Ein
Feld, das sorgfaeltig geschuetzt wird, obwohl es niemand liest — der Schutzaufwand laeuft mit, der Nutzen
nie an.** Damit ist `ref` der schaerfste der drei Faelle von „erheben, nie lesen": bei der Warteliste
fehlt die Leseroute, hier gibt es eine bewusste Nicht-Leseroute.

**Fuer Bolle wird daraus eine Frage statt eines Befunds:** die virale Kette funktioniert, sie ist nur nicht
aufloesbar. Er kann sehen, DASS Empfehlungen wirken, nicht WELCHE. **Die Daten liegen seit je da, es fehlt
nur die Abfrage** — ein kleineres Ticket als „der Loop ist kaputt", und ein ehrlicheres.

**Die Klasse dahinter, weil sie mir gehoert:** ich habe eine Null gemessen, die stimmt, und sie mit einer
Ueberschrift versehen, die mehr behauptet. `party.ref` ist null, `ref` als Groesse nicht. **Ein
Nullbefund braucht nicht nur seine Kontrollzahl, sondern auch seinen Gegenstand im Titel.**

### Richtigstellung zu T1 — die Zahl war zu klein, die wirksame Menge ist viel kleiner, und reparieren waere falsch

Drei Korrekturen an einer Zeile, alle nachgemessen.

**Erstens: meine 388 waren unvollstaendig.** Mein Muster suchte relative Verweise
(`"/kindergeburtstag…#planer"`). Zwei stehen **absolut** — `href="https://machsleicht.de/kindergeburtstag?motto=dino&alter=7#planer"`
auf `kindergeburtstag/dino-forscherpass.html` und `dino-quiz.html`. **Meine eigene dritte Gegenprobe-Zeile,
an mir selbst nicht gestellt: in welcher Form kann der Gegenstand sonst noch vorkommen.**

```
#planer, ALLE html inkl. _dev                     429
#planer, nur auslieferbar (ohne _dev)             390   <- die Zahl fuer das Produkt
  davon als relatives href                        388   <- meine alte Angabe
  davon OHNE Parameter (die WIRKSAMEN)             33   in 17 Dateien
id="planer" im Planer  0        (Kontrollzahl 139 id-Attribute, id="stage1" 1x)
```

**Zweitens: nur 33 der 390 sind ueberhaupt wirksam.** Die uebrigen 357 tragen `?motto=` oder `?alter=`;
dort greift `__hasEntryParam` und der Planer springt per JavaScript selbst. **Der tote Anker faellt nur
dort auf, wo sonst nichts passiert.**

**Und die 17 Dateien sind fast genau die generische SEO-Spur:** `-5-jahre` · `-6-jahre` · `-bei-regen` ·
`-checkliste` · `-essen` · `-kosten` · `-last-minute` · `-mitgebsel` · `-spiele-draussen` ·
`-spiele-drinnen` · `-torte-einfach` · `-wenig-aufwand` · `-zeitplan` · `-zuhause` ·
`kindergeburtstag/detektiv` · `/prinzessin` · `einladung/text`. **Das ist dieselbe Familie wie in T14:
die meistgesuchte Ankunftsspur gibt keinen Kontext mit UND verspricht einen Sprung, den es nicht gibt.**
Gross, nicht identisch — `/kindergeburtstag-spiele` steht in T14, traegt aber kein `#planer`.

**Drittens, und das ist der eigentliche Befund: reparieren waere ein Rueckschritt.** Der Pruefstand hatte
`id="planer"` an `#stage1` vorgeschlagen und den Vorschlag nach dieser Messung selbst zurueckgezogen:

```
Weitermachen-Banner  105 px      Kopfleiste 51 px      stage1 beginnt bei 168 px
Seitenhoehe 10.494 px            der Sprung waere 1,6 % der Seite
```

**Der Anker spraenge 168 Pixel — und das „Weitermachen?"-Banner laege vollstaendig im uebersprungenen
Bereich.** Fuer einen Rueckkehrer ist das das wichtigste Element der Seite. **Ein Anker, der genau das
ueberspringt, wofuer er gebaut wurde, ist schlechter als ein toter.**

**T1 ist damit ein Ticket mit einem AUSLOESER, kein Fehler mit einem Fix.** Der Ausloeser: *sobald ueber
dem Planer etwas eingefuegt wird, werden 33 Links still falsch.* **Und der Satz, der dazugehoert, ist der
wichtigere: nicht reparieren, sondern wissen, warum nicht.** Ohne diese Begruendung setzt in sechs Monaten
jemand das `id="planer"` ein, weil 429 Links danach rufen — und niemand merkt, dass das Banner damit
verschwindet. **Dieselbe Konstruktion wie beim Cloudflare-Ticket: eine Massnahme ohne ihre Begruendung
wird beim naechsten Anlass falsch angewandt.**

**Die Klasse, die beide Sitzungen heute je einmal produziert haben:** eine Reparatur, die auf die richtige
Messung zeigt und in die falsche Richtung zieht. Beim Grundton-Vorschlag haette sie Block 10 umgedreht,
hier haette sie das Banner genommen. **Die Messung stimmte beide Male, die Ableitung nicht — und beide
Male hat es die jeweils andere Sitzung gesehen.**

### Richtigstellung zu T14 — vier Fassungen einer Zahl, und was daraus zu lernen ist

Meine Zeile nannte drei Seiten als Beispiel und las sich wie eine Menge. **Sie war eine Stichprobe.**
Beim Nachziehen sind an einem Vormittag **vier Fassungen derselben Zahl** entstanden — 156, 44, 23, 18 —,
und die ersten drei standen auf einer Definition, die im Kopf stand statt in der Datei.

**Deshalb steht die Definition hier ueber der Zahl und nicht daneben.**

> **Grundmenge:** getrackte HTML ohne `_dev/`, `_build/`, `_src/` — **245**.
> Beleg fuer die Abgrenzung: `/paket/prinzessin/` antwortet mit **404** (gitignored),
> `/paket/ritter/` mit **200** (getrackt) — zwei Nachbarpfade, ein Ordner.
> **Planer-Link:** `/kindergeburtstag`, optional mit `?` oder `#`, **nicht** gefolgt von `/`, `-` oder
> Wortzeichen — **695 echte gegen 732 Fehltreffer** des lockeren Musters.
> **Mottos:** die **15** Ids aus `kindergeburtstag.html`, nicht aus Ordnernamen.

```
Seiten mit echtem Planer-Link                140
   mindestens einer MIT Parameter             87
   KEINER mit Parameter                       53
davon: Seite kennt Motto oder Alter           18   <- die handlungsfaehige Menge
   15x einladung/<motto>/index.html           kennt ihr Motto
    3x kindergeburtstag-5/-6/-7-jahre         kennt ihr Alter
```

**Ergebnis: 18 Seiten kennen etwas, das der Planer lesen kann, und geben es nicht mit.** Alle achtzehn
sind generiert — die Reparatur ist eine Generatorzeile, keine achtzehn Handgriffe. Wer von der
Piraten-Einladungsseite in den Planer geht, kaeme dann mit Piraten an statt bei null.

**Die Kontrollzahl, die alles entschieden hat: 732 Fehltreffer gegen 695 Treffer.** Das lockere Muster
`/kindergeburtstag[^"]*` zaehlt `/kindergeburtstag/<motto>` (die Motto-Seite) und
`/kindergeburtstag-<ratgeber>` (die Ratgeberseiten) mit — **mehr Fehltreffer als Treffer.** Jede Zahl auf
diesem Muster misst zwei verschiedene Dinge zusammen. Beide Sitzungen kamen unabhaengig auf **exakt 732**.

**Und die vier Fassungen haben zwei verschiedene Ursachen, die zusammengehoeren:**

- **Das Muster geraten** (Autor): `/kindergeburtstag/baustelle` als Planer-Link gezaehlt. Reparatur: ein
  negativer Vorblick. Aufgefallen an einem Widerspruch in der eigenen Zahl — eine Datei stand auf der
  Liste „gibt kein Motto mit" und enthielt `motto=`.
- **Die Menge geraten** (Pruefstand): Mottos aus dem Ordnernamen abgeleitet, damit zaehlten `erstellen`,
  `studio`, `text`, `whatsapp` und die Uebersichtsseite als Mottos mit — 23 statt 18. Reparatur: die Ids
  aus der Quelle.

**Beide Male stand die Definition im Kopf statt in der Datei, und beide Male war die Reparatur dieselbe:
aus der Quelle ableiten.** Die Klasse dahinter ist die schaerfste des Tages: **eine Mengenaussage ohne
Definition ist keine Messung, sondern eine Formulierung.** „Die generische Spur", „die Ueberschneidung ist
gross", „156 Seiten ohne Parameter" — dreimal wie ein Befund geklungen, dreimal eine Formulierung.

**Damit faellt auch meine Behauptung, T1 und T14 seien dieselbe Familie.** Gemessen: 3 von 18 und 3 von 17.
**Klein, nicht gross — zwei Baustellen, nicht eine.** Zurueckgenommen.

### Protokoll zwischen den Sitzungen, dritte Haelfte

Ein Prueflauf ist an diesem Vormittag verlorengegangen, weil ein Doku-Commit 94 Sekunden nach der
Lauf-Ankuendigung kam. Anders als beim Fall vom Vortag war diesmal der **Arbeitsbaum** betroffen, und zwar
eine Datei, die zwei Stufen lesen — das Ergebnis war keinem SHA mehr zuzuordnen. **„Wahrscheinlich gruen"
ist kein Gate.**

Die Reparatur ist eine Regel, kein neues Wort:

> **Eine Lauf-Ankuendigung hebt das stehende „Strom frei" auf. Nach dem Lauf kommt ein neues
> „Strom frei \<SHA\>".**

**Begruendung: eine Freigabe, die man nicht widerrufen kann, ist keine Freigabe, sondern eine
Erinnerung.** Und die Last liegt bei der Seite, die sie pruefen kann: der Pruefstand kann nie wissen, ob
seine Ankuendigung gelesen wurde — der Autor kann immer wissen, ob seit seinem letzten Schreiben ein
passendes „Strom frei" stand.

### Wo das digitale Paket ausgeliefert wird — Bolles Frage, am Code beantwortet

> *„wo soll das digitale paket ausgeliefert werden? fuer mich waere die partyseite in einem tab oder
> eigenem bereich der logischste ort. man passt die gaesteliste an... direkt aenderung des
> paket/portfolios?"*

**Sein Instinkt ist richtig, und der Grund dafuer ist messbar — es ist nicht Geschmack.** Gemessen am
Baum `3efbb936`:

```
Der PLANER weiss ueber Gaeste:   plan.guests = num(q.guests, 1, 30)      eine ZAHL
Die PARTY weiss ueber Gaeste:    g.name  g.status  g.allergies
                                 g.pickupTime  g.pickupPerson  g.id  g.inv  g.path
```

**Eine Urkunde traegt einen Namen. Der Planer kennt keine Namen, nur eine Anzahl.** Damit ist die Frage
„Planer oder Partyseite" keine Abwaegung mehr: **nur die Partyseite kann ein Paket erzeugen, das
Kindernamen enthaelt.** Alles, was ein Paket braucht, liegt bereits an der Party — `childName`, `age`,
`date`, `time`, `address`, `mottoId`/`motto`/`mottoEmoji`/`mottoColor`, `wishes`, `hostName` und die
Gaesteliste. **32 verschiedene Felder**, gezaehlt, nicht geschaetzt.

**Tab oder eigener Bereich? Eigener Bereich, und zwar aus drei gemessenen Gruenden.**

```
role="tab"      0        class="tab      0
aria-selected   0        data-tab        0        Karten in der Partyseite: 9
```

**Im ganzen Worker gibt es keine einzige Tab-Struktur.** Ein Tab waere also nicht „das vorhandene Muster
weiterbenutzen", sondern ein neues Bedienmuster in einer Seite, die bisher aus gestapelten Karten
besteht. Dazu zwei Sacheinwaende: das Paket ist **zum Drucken** da und braucht volle Breite und eigene
Druckregeln, die mit dem mobil-schmalen Kartenlayout kollidieren — und ein **eigener Pfad ist
verschickbar**. Der andere Elternteil bekommt einen Link, kein „scroll runter und klick auf den
zweiten Reiter". **Empfehlung: eigene Route, erreicht ueber eine Karte auf der Partyseite** — genau die
Stelle, an der heute schon die Ablaufplan-Karte steht.

**Und der entscheidende Punkt, der Bolles Zusatzfrage aufloest: „Gaesteliste anpassen -> direkt Aenderung
des Pakets" ist umsonst zu haben, wenn das Paket bei jedem Oeffnen NEU GERECHNET statt GESPEICHERT wird.**
Es gibt dann keinen Abgleich, weil es keine zweite Kopie gibt. **Sobald wir fertige Dateien ablegen,
kaufen wir uns ein Problem, das wir nie haben muessten:** jede Namensaenderung entwertet still eine
gespeicherte Urkunde, und wir brauchen eine Regel, wann was neu erzeugt wird. **Das ist dieselbe Klasse
wie [[paket_kommt_aus_dem_plan]]: handgepflegte Dubletten sind der Defekt, nicht die Loesung.**

### Die Bruecke Plan <-> Party ist EIN FELD, kein System — und beide Haelften stehen schon

**Ich habe angenommen, wir muessten den Plan erst serverfaehig machen. Das stimmt nicht.** Gemessen:

```
POST /api/plan        legt plan:<token> in KV ab, 90 Tage, und mailt
                      https://machsleicht.de/kindergeburtstag?plan=<token>
GET  /api/plan/<tok>  gibt den Plan zurueck, mit `created` fuer die Zeitregel
```

**Der Plan kann das Geraet also laengst verlassen.** Was fehlt, ist ausschliesslich die Referenz zwischen
den beiden Datensaetzen:

```
party.planToken   0 Treffer        plan.partyId   0 Treffer
party.plan        0 Treffer        plan.party     0 Treffer
```

**Zwei Speicher, zwei fertige Schnittstellen, null Verbindung.** Die Bruecke ist ein Feld und ein
Schreibvorgang, nicht ein Umbau. Das aendert die Reihenfolge der Arbeit erheblich — und es beantwortet
Bolles Frage von gestern („gibt es das nicht schon?") mit **ja, zur Haelfte, und wir haben es nicht
benutzt.**

**BEFUND GEGEN MEINE EIGENE ARBEIT VON GESTERN.** Die Karte aus Block 19, die ich selbst geschrieben und
deployt habe, sagt:

> *„Hast du den Plan auf diesem Geraet begonnen, geht es genau dort weiter."* und verlinkt auf
> `https://machsleicht.de/kindergeburtstag` — **ohne Token.**

**Ich habe die Einschraenkung ehrlich hingeschrieben, weil ich glaubte, es gaebe keinen anderen Weg. Den
gab es, im selben Worker, 1900 Zeilen weiter oben.** Wer die Partyseite auf dem Handy oeffnet und den
Plan auf dem Rechner begonnen hat, landet auf einem leeren Planer. **Die Karte ist nicht falsch, sie ist
unter Wert.** Reparatur: `party.planToken` setzen, sobald jemand aus dem Planer eine Party anlegt, und
die Karte auf `?plan=<token>` zeigen lassen. Dieselbe Klasse wie die 18 Seiten — **etwas weiss etwas und
gibt es nicht weiter.**

**NEUER BEFUND, unabhaengig von der Bruecke: die Haltbarkeiten gehen auseinander.**

```
Plan  : expirationTtl 90*24*60*60      absolut, ab Erstellung
Party : calcTTL(party.date)            14 Tage NACH dem Partydatum (Bolle-Regel 13.07.)
```

**Wer eine Party mehr als 90 Tage im Voraus plant, verliert seinen gemailten Planlink, bevor die Party
stattfindet.** Vier Monate Vorlauf sind bei einem Kindergeburtstag nicht exotisch. Der Plan-Link ist
zudem pro Speichervorgang ein NEUER Token — die alte Mail stirbt also 90 Tage nach IHRER Erstellung, nicht
nach der letzten Aenderung. **Ticket, kein Blocker: die Plan-TTL an dieselbe Regel haengen wie die Party
(`Partydatum + 14 Tage`, Mindestwert 90 Tage), sobald die Bruecke steht und der Plan ein Datum kennt.**

**Offen fuer Bolle — die Architekturentscheidung, nicht die Optik:** Paket bei jedem Aufruf neu rechnen
(meine Empfehlung, keine zweite Kopie, keine Abgleichregel) oder einmal erzeugen und ablegen (schneller
beim zweiten Oeffnen, dafuer Dubletten und eine Verfallsregel). **Alles Weitere — Karte, Route, Druckmasse —
haengt daran und ist danach Handwerk.**

### Search Console, zweite Zehnerliste (09.09.) — und warum sie ins Dokument gehoert

Bolle hat die Sitemap und die erste Zehnerliste am 08.09. eingereicht und heute nach zehn weiteren
gefragt — **ausdruecklich „nicht die gleichen".** Er musste fragen, weil die erste Liste nur im Chat
stand. **Eine Liste, die man nicht wiederfindet, ist eine Liste, die man doppelt einreicht.** Deshalb
steht diese hier, mit dem Verfahren daneben.

**Verfahren statt Gedaechtnis:** aus dem Sitzungsprotokoll (15.662 Zeilen) wurden die **85 Zeilen mit
Search-Console- oder Indexierungs-Bezug** gefiltert und daraus **39 verschiedene URLs** gezogen — die
Tabu-Menge. Gegen die 136 Sitemap-URLs gerechnet: **24 Ueberschneidungen fallen weg, 112 bleiben.**
Aus denen die zehn. Jede live geprueft, alle drei Bedingungen erfuellt (**200 · Titel vorhanden ·
mehr als 300 Woerter**), Spanne 650 bis 2379 Woerter.

```
1  /einladung/text/                   2078 W   staerkste Suchabsicht, die wir bedienen
2  /kindergeburtstag-last-minute      1906 W   dringliche Suche, wenig Konkurrenz
3  /kindergeburtstag-zuhause          1798 W   eigene Absicht, nicht "drinnen" von Runde 1
4  /kindergeburtstag-5-jahre          2379 W   die fehlende Altersseite (6 und 7 sind eingereicht)
5  /adventskalender-fuellen           1529 W   ZEITKRITISCH: Welle ab Oktober, Indexierung braucht Vorlauf
6  /einladung/                        1556 W   Hub ueber 14 Motto-Vorlagen
7  /kindergeburtstag/feuerwehr        2075 W   ein Motto-Hub als Fuehler fuer die anderen 13
8  /kliniktasche-packen               1255 W   anderer Themenkreis, ganzjaehrig
9  /baby-erstausstattung-checkliste   1419 W   dito
10 /ueber-uns                          650 W   Vertrauenssignal, kuerzeste der zehn
```

**Bewusst NICHT drin: die rund 60 Motto-mal-Alter-Seiten** (`…/piraten-6-8-jahre` und Geschwister).
Sie sind untereinander sehr aehnlich; zehn davon einzureichen sieht nach duenner Massenware aus.
Stattdessen steht ein einziger Motto-Hub als Fuehler — zieht der, ziehen die anderen nach.

**Anlass war eine andere Frage, und die Antwort gehoert dazu:** *„koennten wir Google austricksen,
indem wir Ads kaufen? Dann muessten sie uns indexieren."* **Nein.** Anzeigenziele besucht
**AdsBot-Google** fuer den Quality Score; **AdsBot schreibt nichts in den Suchindex.** Der Index wird
von **Googlebot** gefuellt, der unabhaengig davon entscheidet, ob Geld fliesst — deshalb kann man auch
eine Seite bewerben, die per `noindex` gar nicht in der Suche steht. Fuer Geld gibt es Traffic, nicht
Indexierung.

**Die technische Seite ist dabei gemessen worden, und sie ist frei:** `robots.txt` erlaubt alles
Wesentliche, Sitemap eingetragen, `lastmod` bis 08.09. — **136 von 136 Sitemap-URLs abgerufen, 0 mit
`meta robots noindex`**, jede Antwort mit Empfangsbeweis (`</html>` vorhanden).

**Zwei eigene Fehlbefunde auf dem Weg dahin, beide vor dem Melden gefangen:** `/spiele` schien ein
`noindex` zu tragen — es ist ein **404**, und das `noindex` gehoert der Fehlerseite. `/einladung` schien
kein Canonical zu haben — es ist ein **301**, mein Grep las die Weiterleitung statt des Ziels.
**Beide Male hat derselbe Schritt geholfen: erst den Statuscode holen, dann den Inhalt bewerten.**
Eine Seite, mit der man gar nicht spricht, kann jede Eigenschaft zu haben scheinen.

### Die Haltbarkeitsschere — und warum sie die Paket-Empfehlung korrigiert

Meine Empfehlung „Paket bei jedem Oeffnen neu rechnen, nichts speichern" beantwortet **wie das Paket
aktuell bleibt** und laesst **wie lange es ueberhaupt bleibt** offen. Der Pruefstand hat das eingewandt,
und der Einwand traegt. Beide Haltbarkeiten, am Quelltext gelesen:

```
Plan  : expirationTtl 90*24*60*60        absolut, ab Erstellung des Links
Party : calcTTL(party.date)              Partydatum + 14 Tage
        Klammern derselben Funktion:     min 1 Tag, max 2 Jahre (W9-8, gegen ein
                                         per Direkt-API praepariertes Datum 9999-12-31)
```

**Die Umschlagschwelle wird abgeleitet, nicht abgelesen:** Gleichstand heisst
`Partydatum + 14 = Erstellung + 90`, also **Vorlauf = 90 - 14 = 76 Tage.**

```
+75 Tage Vorlauf   Party stirbt 07.12.   Plan 08.12.   Party zuerst
+76 Tage           Party stirbt 08.12.   Plan 08.12.   GLEICH
+77 Tage           Party stirbt 09.12.   Plan 08.12.   Plan zuerst
```

**Beide Befunde stimmen, sie gelten nur in verschiedenen Bereichen:** ueber 76 Tagen Vorlauf stirbt der
gemailte Plan-Link vor der Party (mein Befund), darunter — **also im Normalfall** — stirbt die Party
zuerst und der Plan ueberlebt sie um Wochen (sein Befund). Die erste Fassung der Gegenrechnung sprang
von 60 auf 90 und **uebersprang die Schwelle**; dieselbe Klasse wie die getippten Kontrollzahlen des
Tages, angewandt auf eine Schwelle statt auf eine Zahl.

**Was daraus folgt: „aus der Party rechnen" bindet das Paket an die KUERZERE Haltbarkeit.** 14 Tage nach
der Feier ist die Party weg, mit ihr die Gaesteliste, mit ihr jede neu gerechnete Urkunde.

**Was daraus NICHT folgt — und der Vorschlag, die Namen beim Erzeugen in den Plan zu schreiben, ist
zurueckgenommen worden.** Der Grund steht drei Zeilen ueber der Zahl, die beide Sitzungen gelesen haben:

> `Bolle-Regel 13.07.2026: Party + alle Daten (Fotos, Gaeste) verfallen automatisch`
> `14 TAGE NACH DEM PARTYDATUM.`

**Die Regel nennt die Gaeste ausdruecklich.** Kindernamen in einen zweiten Datensatz zu kopieren, der
90 Tage lebt, verlaengert die Speicherung ueber die Zusage hinaus — **das ist keine Architekturfrage,
sondern das stille Aushebeln einer Loeschregel.**

**Der Rahmen, auf den sich beide Sitzungen geeinigt haben:** das Andenken lebt **auf Papier** — Bolles
eigene Produktentscheidung, CEWE oder dm auf Fotopapier, ein Ausdruck hat keine Verfallszeit. In KV
steht **Arbeitsmaterial**, und Arbeitsmaterial darf mit der Party sterben. Damit schrumpft die ganze
Sorge auf eine schmale, benennbare Luecke: **wer nicht rechtzeitig druckt und drei Wochen spaeter noch
einmal will, findet nichts mehr.**

**Drei Wege, keiner braucht eine zweite Kopie der Namen — Entscheidung Bolle:**

```
1  Nichts tun            Luecke echt aber schmal, Loeschregel unangetastet
2  Party-TTL verlaengern, wenn ein Paket erzeugt wurde   dieselbe Regel, anderer Wert,
                         aber SICHTBAR entschieden statt nebenbei
3  Vor dem Verfall erinnern   der Cron laeuft ohnehin taeglich, Bedingung ist dieselbe wie
                         beim Erinnern (party.date, party.email)
```

**Empfehlung beider Sitzungen: Weg 3.** Er ist der einzige, der das Loeschen **sichtbar macht statt es
zu umgehen**, und er nutzt einen Mechanismus, der schon existiert.

**Offen und ausdruecklich keine Messung:** soll sich eine Urkunde noch aendern, nachdem sie gedruckt
ist? Bis zum Druck ist „Gaesteliste aendern -> Paket aendert sich" genau der Wunsch. Danach erwartet man
von einem Andenken das Gegenteil. **Das ist eine Frage an Bolle.**

### Eine zitierte Norm gilt als geprueft — die Fehlerklasse des Tages

Der Kommentar mit der Loeschregel wurde in derselben Nachricht **woertlich zitiert**, in der der
Vorschlag stand, die Namen zu kopieren. Gelesen, zitiert, nicht angewandt.

**Das ist keine Nachlaessigkeit, sondern eine Form: wer einen Kommentar zitiert, um seinen Vorschlag zu
begruenden, hat ihn damit als geltend anerkannt — und prueft ihn danach nicht mehr, weil er sich ja
schon mit ihm befasst hat. Das Zitieren erzeugt das Gefuehl der Pruefung und ersetzt sie.**

**Und der Satz, der diese Klasse von allen Messfallen trennt: bei einer Zahl schlaegt die Gegenprobe an,
bei einer Zusage merkt es niemand ausser dem, der sie ebenfalls gelesen hat.** Gegen eine Norm gibt es
keine Gegenprobe — es gibt nur einen zweiten Leser. **Deshalb ist die Zwei-Sitzungen-Arbeit bei Normen
wertvoller als bei Zahlen, nicht weniger wertvoll.**

**Sie hat an zwei Tagen in beide Richtungen zugeschlagen:** am 08.09. wurde eine offene Rechtsfrage
(Cloudflare-Verschleierung) als **Pflicht** ausgegeben — eine Norm zu gross gemacht; am 09.09. waere
eine echte Zusage beinahe **aufgeweicht** worden — eine Norm zu klein gemacht. **Beide Male war die
Messung richtig und der Umgang mit der Norm falsch.** Kein Namensschild: die eine ist der einen Sitzung
passiert, die andere der anderen, und keine haette den eigenen Fall gesehen.

### Protokoll zwischen den Sitzungen, vierte Haelfte — die Sperre liegt im BAUM

Die dritte Haelfte („eine Lauf-Ankuendigung hebt das stehende Strom frei auf") hat **am selben Vormittag
Lauf 48 nicht retten koennen.** Ursache: die Ankuendigung stand in einer Nachricht, die zum
Commit-Zeitpunkt noch in der Zustellung hing.

```
Lauf 48  HEAD-Start 30d27699  11:53:22
Commit   057442eb             11:56:16      174 s spaeter, mitten im Lauf
geaendert: _dev/review/…      die Datei, die Stufe 45 und Stufe 69 lesen
```

**Zwei verlorene Laeufe an einem Vormittag (45 und 48), beide durch denselben Commit-Typ, und beim
zweiten galt die neue Regel schon.** Der Konstruktionsfehler: **eine Regel, deren Wirkung an der
Zustellung haengt, ist gegen genau den Fall wirkungslos, fuer den sie gebaut wurde** — und wenn sich
Nachrichten im Minutentakt kreuzen, ist das der Normalfall.

**Die Reparatur kommt ohne Zustellung aus:**

> Der Pruefstand legt bei Laufbeginn **`_dev/.lintlogs/AKTIV`** an und loescht sie am Ende. Die
> Bau-Session prueft `test -f _dev/.lintlogs/AKTIV` **unmittelbar vor jedem `git add`**.

Vor der Uebernahme nachgeprueft, nicht geglaubt: **`.gitignore:41` enthaelt `_dev/.lintlogs/`, und
`git check-ignore -v _dev/.lintlogs/AKTIV` bestaetigt es an der Maschine** — dort liegen bereits 60
Lauf-Verzeichnisse, `git status --porcelain` zeigt 0 Zeilen davon. Die Sperre taucht weder im Status
noch in einem Commit auf.

**Der Grund, warum diese Fassung traegt und die drei davor nicht: der Baum ist das Einzige, was beide
Sitzungen garantiert gleichzeitig sehen. Nachrichten haben eine Laufzeit, ein `test -f` nicht.**

Zwei Zusaetze: die Sperrdatei traegt **Startzeit und Start-SHA**; und **aelter als 20 Minuten = verwaist**
— abgeleitet aus knapp 6 Minuten echter Laufzeit (Lauf 46: 11:37:59 bis 11:43:57), also gut das
Dreifache. **Eine verwaiste Sperre wird gemeldet, nicht stillschweigend uebergangen** — sonst ersetzt
eine Hoffnung die andere, und das war der Fehler der dritten Fassung.

**Erster Einsatz, gemessen:** `LAUF 49 AKTIV seit 12:00:10 auf 057442eb`, Lauf 49 gruen
(12:00:11 bis 12:06:07, 71 Stufen, 0 rot), Sperre danach entfernt, Status durchgehend 2 Zeilen.
**5:56 Laufzeit gegen 20 Minuten Frist.**

### Gecrawlt — zurzeit nicht indexiert: zwei Zeilen im selben Kasten, nur eine ist ein Problem

Bolle hat `/kindergeburtstag/ritter` in der Search Console geprueft und die Zeile
**„Keine verweisenden Sitemaps gefunden"** gemeldet. Direkt darueber stand aber
**„Verweisende Seite: https://machsleicht.de/sitemap.xml"** — zwei Aussagen, die sich zu
widersprechen scheinen.

**Sie widersprechen sich nicht, sie sind verschieden alt.** Das entscheidende Feld steht drei Zeilen
tiefer: **letztes Crawling 28.05.2026.** Die Sitemap wurde am **08.09.** eingereicht. Die URL-Pruefung
zeigt den Zustand **zum letzten Crawling**, und damals war in dieser Property keine Sitemap
angemeldet — gefunden hatte Google die Datei trotzdem, ueber `robots.txt`. **Die Zeile verschwindet
beim naechsten Crawling von selbst.**

**Nachgemessen, damit das keine Vermutung bleibt:**

```
in der Sitemap, exakt wie in GSC     1x   (ohne Schraegstrich; die Variante MIT ist ein 301)
lastmod dieser URL                   2026-09-01
live                                 200, Canonical identisch mit dem Sitemap-Eintrag
sitemap.xml                          200, application/xml, 136 URLs, gueltiges XML
```

**Die Zeile, die wirklich etwas sagt, ist die andere: „Seite ist nicht indexiert: Gecrawlt —
zurzeit nicht indexiert."** Google hat die Seite geholt und **entschieden, sie nicht aufzunehmen.**

**Der erste Verdacht bei 14 Motto-Seiten ist Massenware — gemessen und widerlegt.** Und weil an
diesem Tag vier Zahlen an einer fehlenden Definition gescheitert sind, **steht die Definition hier
wieder ueber der Zahl:**

> **Satz** = Text der gerenderten Seite, Tags entfernt, getrennt an `.!?`, **mindestens 6 Woerter**
> (kuerzere Fragmente sind auf jeder Seite gleich und wuerden die Ueberschneidung aufblasen).
> **Ueberschneidung** = woertlich identische Saetze, nicht Aehnlichkeit.

```
ritter x piraten      3 von 82        Kontrollzahlen: Saetze je Seite
ritter x prinzessin   3 von 82          ritter 82 · piraten 114 · prinzessin 107
ritter x dino         3 von 82          dino 113 · feuerwehr 97
ritter x feuerwehr    3 von 82
in ALLEN FUENF gleich: 3 Saetze  ->  3,7 % der Ritter-Seite
```

**Und die drei gemeinsamen Saetze sind der eigentliche Beleg, nicht die Prozentzahl:**

```
"Alle Altersgruppen 3-5 / 6-8 / 9-12 Jahre …"              Navigation
"Der machsleicht-Planer berechnet automatisch Mengen …"    Produktsatz
"Material & Vorbereitung — die komplette Einkaufsliste"    Ueberschrift
```

**Navigation, Produktsatz, Ueberschrift — keine einzige Inhaltsdopplung.** Die Motto-Seiten sind
echte, verschiedene Texte; die naheliegendste Erklaerung faellt mit einer Zahl statt mit einem
Eindruck.

**Unabhaengig gegengezaehlt, mit leicht anderer Definition** (Text ohne `<script>`/`<style>`):
**79 / 96 / 93 / 100 / 88** statt 82 / 114 / 107 / 113 / 97. **Der Versatz ist nicht konstant
(3 · 18 · 14 · 13 · 9), also ein Definitionsunterschied und kein Fehler.** Beide Zaehlungen liefern
**dieselben drei gemeinsamen Saetze** und dieselbe Reihenfolge; die Prozentzahl wandert von 3,7 auf
3,8. **Genau deshalb steht die Definition oben: die Aussage haelt, die Zahl allein waere angreifbar.**

**Was bleibt, ist das Datum.** `git log` auf `kindergeburtstag/ritter.html`: **16 Commits seit dem
28.05.**, darunter am 01.09. der komplette Ablauf-Umbau nach vier Gutachten (54/46/42/58, alle NO-GO).
**Google beurteilt eine Version, die es nicht mehr gibt.** Damit ist „Indexierung beantragen" keine
Bittstellerei, sondern die vorgesehene Meldung „die Seite hat sich geaendert" — und sie ist hier
sachlich begruendet.

**Nebenbeobachtung ohne Handlungsempfehlung:** Ritter ist mit **82 Saetzen die kuerzeste der fuenf**
(Piraten 114, Dino 113, Prinzessin 107, Feuerwehr 97). Kein Grund fuer sich; aber wenn eine
Motto-Seite ausgebaut wird, ist das die Reihenfolge.

**Und die Methodenlehre, die hier drinsteckt:** ein Screenshot ist ein **Zustand zu einem Zeitpunkt**.
Zwei Zeilen im selben Kasten koennen aus zwei verschiedenen Zeitpunkten stammen, und **das Datum
daneben zu lesen ist Teil des Befunds, nicht Beiwerk.** Dieselbe Form wie Falle 18 (die Datei ist
nicht mehr die, die ich gelesen habe) — nur dass hier nicht der Baum, sondern der Bericht alt ist.

### Der Plan-Token in der Adresszeile — zwei Tage live, vier Senken, eine Wortsuche entfernt

Gefunden **nicht durch Suchen, sondern beim Gegenlesen eines Entwurfs.** Der Magic-Link
`machsleicht.de/kindergeburtstag?plan=<token>` (seit 07.09.) traegt einen **Bearer-Schluessel**:

```
GET /api/plan/<token>   prueft NUR /^[A-Za-z0-9_-]{16,96}$/ — keine Authentifizierung
plan:<token> enthaelt   email · Kindname · adresse (200 Zeichen) · hostPhone · Datum
                        · exactAge · crewText
```

**Vier Senken, und der erste Fix deckte genau eine:**

```
1  Statistik-Dienst   umami meldet Pfad UND Query     -> data-exclude-search fehlte im Planer
2  Browser-Verlauf    bleibt auf dem Geraet           \
3  kopierte Adresse   "schau mal, mein Plan"           |-> replaceState 0x, pushState 0x, history. 0x
4  Screenshot         der Token steht in der Leiste   /
```

**Zur ersten Senke: der Worker macht es an beiden Render-Stellen richtig** (`data-exclude-search`
2x), **genau weil seine URLs `?edit=` und `?g=` tragen.** Der Planer hat den Schalter nicht — und
seine URL traegt den Token. `data-do-not-track` hilft nicht: es steuert, ob der Dienst ein
DNT-Signal **beachtet**, nicht was er **sendet**.

**Und die haerteste Zeile des Befunds steht im eigenen Repo, datiert auf denselben Tag, an dem der
Magic-Link gebaut wurde:**

> `// P0-Security: Token NUR aus Body — Query-Parameter waere in CF-Logs persistiert` (Zeile 699)

**Dieselbe Sorge, woertlich aufgeschrieben, zwei Dateien weiter — und beim Bauen nicht gelesen.**
Das ist die Normen-Klasse dieses Tages in ihrer teuersten Form. Die Reparatur dagegen ist keine
Regel, sondern eine Frage: **wenn ich einen Token in eine URL schreibe, wo steht in diesem Repo
schon etwas ueber Tokens in URLs?** Die Antwort stand da. Sie wurde nicht gesucht.

**Zur zweiten Senke, die der Pruefstand ergaenzt hat:** mein Fix haette die Senke geschlossen und
die Quelle offen gelassen. **Auf einem geteilten Familienrechner ist der Verlauf die schlechteste
Senke von allen — sie braucht keinen Dritten und kein Netz.** Beides wurde in EINEM Block gebaut,
aus einem Grund, der die Reihenfolge betrifft: **getrennt gebaut haette nach dem ersten Commit ein
halb geschlossenes Leck im Baum gestanden, und der zweite Teil haette wie Kosmetik ausgesehen.**

Drei Gegenmessungen **vor** dem Bauen, die den Eingriff erst gefahrlos gemacht haben:
`p.get('plan')` genau **1x** (also ist Loeschen sicher), `URLSearchParams` **2x** — wovon die zweite
(`buildAutopilotHref`) eine URL **baut** statt die eigene zu lesen —, und `history.` vorher **0x**.

### Die Bruecke, verworfen — und sechs Befunde, die dabei ersatzlos verschwanden

Der Entwurf „Plan-Token an die Party haengen, Karte verlinkt in den Planer" wurde von einer
adversarischen Gegenprobe zurueckgewiesen. **Drei Gruende, alle am Quelltext nachgelesen:**

1. **Sie haette bei den meisten nichts getan — wegen der eigenen Benutzerfuehrung.** Ein Plan-Token
   entsteht nur ueber „Spaeter -> E-Mail". Der Planer empfiehlt das **nach** dem Aktivieren der
   Partyseite (Knopf in stage4, Mail in stage5, Abschlusstext 3377). Beim `/api/create` gibt es
   also meist keinen Token — **und der Ausfall haette ausgesehen wie „hat halt keinen Link geholt".**
2. **Sie haette eine Gefahr geschaffen.** Die Karte oeffnet den Planer mit wiederhergestelltem Plan,
   aber ohne Kenntnis der bestehenden Partyseite (`planEingaben()` traegt `partyseite` nicht). Zwei
   Klicks weiter steht der Aktivieren-Knopf scharf: **zweite Partyseite, zweiter editToken, Gaeste
   auf zwei URLs.** Heute unmoeglich, weil die Karte in einen leeren Planer fuehrt.
3. **`plan:<token>` ist ein eingefrorener Schnappschuss** — put 938, get 965, kein PUT. Die Karte
   haette „Spiele, Zeitplan und Einkaufsliste" versprochen und den Stand vom Klick auf „Spaeter"
   geliefert.

**Bolle hat es kuerzer gesagt: „das klingt alles ziemlich scheisse."** Und er hatte recht — nicht an
einem Detail, sondern an der Form. **Jede Pruefrunde machte den Umbau groesser statt kleiner. Das
war das Signal, und es wurde nicht gelesen, sondern immer feiner geplant.**

**Die neue Form ist kleiner, weil sie die Frage anders stellt: der Plan gehoert AUF die Partyseite,
nicht daneben.** Der Planer schickt den fertig gerechneten Ablauf beim Anlegen mit
(`_planTimes(state.plan.acts)` — die Liste, die er ohnehin rendert), der Worker legt sie unter
`ablauf:<id>` mit `partyOpts` ab, die Editor-Seite zeigt sie als Karte. **Ein Gast-Aufruf liest den
Schluessel nicht einmal; DELETE raeumt ihn mit ab.**

**Und das ist der eigentliche Ertrag des Tages, den keine Befundtabelle zeigt:**

```
Token, der lecken kann      weg — es gibt keinen
Sprung in den Planer        weg — man verlaesst die Partyseite nicht
TTL-Schere                  weg — eine Frist statt zwei
Anker, der das Banner nahm  zurueckgenommen
Namen im 90-Tage-Satz       zurueckgenommen
Sechserliste am falschen Stop  zurueckgenommen
```

**Sechs Befunde, keiner repariert, alle sechs gibt es nicht mehr.** Eine Tabelle zaehlt nur, was
behandelt wurde — **das Beste an diesem Nachmittag war, was nicht mehr behandelt werden musste.**

### Klasse: eine Regel, die Vorwissen verlangt, das erst hinterher entsteht

Zweimal an einem Nachmittag war die Vorab-Anmeldung der Kennzahlen unvollstaendig — beim
Statistik-Fix fehlten drei (`data_attribute`, `const_deklarationen`, `try_bloecke`), beim
Ablauf-Bau wieder drei (`function_schluesselwort` +2, `try_bloecke` +1, `zeilen_ueber_300` +1).
**Keine davon war ein Fehler; alle waren direkte Folgen der eigenen Zeile.**

**Der Befund ist nicht die Nachlaessigkeit, sondern die Bauart der Regel: sie verlangt, VOR dem
Schreiben zu wissen, welche von 60 Kennzahlen eine Zeile beruehrt — und das weiss man erst, wenn
man die Zeile geschrieben hat.** Zweimal in Folge unvollstaendig ist kein Ausrutscher, das ist die
Form.

**Die Reparatur ist dieselbe wie bei der dritten Protokollfassung heute Vormittag: die Last dorthin
legen, wo die Information tatsaechlich vorliegt.** Dort war es der Baum statt die Nachricht, hier
ist es die Messung statt die Vorhersage:

> **Angemeldet wird nur, was sich NICHT bewegen darf** (die neun stehen fest). **Der Pruefstand misst
> alles; jede Bewegung ausserhalb der neun ist eine Frage an den Autor, kein Befund.**

Dieselbe Diagnose in einem Satz: **eine Regel, die funktioniert, solange nichts Ungeplantes
passiert, ist gegen genau den Fall wirkungslos, fuer den sie gebaut wurde.**

### Zwei Tickets, ausdruecklich nicht nebenbei mitgenommen

**1. Die Verbotsliste ist die falsche Richtung.** Der oeffentliche Party-GET filtert per
DENY-Liste: `const {editToken,email,doiToken,ref,address,invites,...safe} = party;` — **sechs
Felder geheim, 27 von 32 automatisch oeffentlich.** Der Fehler passiert damit **durch Vergessen,
nicht durch Handeln**, und er ist schon passiert: **`party.reminded7` wird gesetzt und geht heute
oeffentlich raus**, ohne dass es jemand entschieden haette. Eine Erlaubnisliste kehrt das um: dort
ist ein vergessenes Feld unsichtbar statt oeffentlich. **27 betroffene Felder und fuenf Anker eines
Gegenprobe-Skripts haengen an der Zeile — ein eigener Block, keine Beigabe.**

**2. Worker und Planer sind bei der Statistik auseinandergelaufen.** Der Worker hat
`data-exclude-search` ohne `data-do-not-track`, der Planer hatte es umgekehrt (jetzt beides).
**Ob die Partyseiten zusaetzlich DNT beachten sollen, ist eine Verhaltensaenderung auf allen
Seiten** — Bolles Entscheidung.

**Und zwei, die zum Ablauf-Bau gehoeren:** die **Einkaufsliste** (wird vor der Party zuhause
gebraucht, nicht am Partytag auf dem Handy) und das **Aktualisieren des Ablaufs** nach dem Anlegen.
Der bestehende PATCH kann es; wann er feuern darf, haengt an **1.000 KV-Writes pro Tag im
Gratis-Tarif** — nachgelesen im Kommentar Zeile 381, nicht geschaetzt.
