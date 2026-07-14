# Briefing: Einladung Studio V12 → produktionsreif für machsleicht.de

**An:** den Studio-Entwickler · **Stand:** 14.07.2026 · **Basis:** dein V12-Prototyp (liegt bei uns als `_dev/prototypes/einladung-studio-v12.html`)

Dein Editor ist gesetzt — UI, Themes, Layouts und Mobile-Bedienung haben unseren Playtest bestanden und bleiben wie sie sind. Dieses Briefing beschreibt (1) den Datenkontrakt zu unserem Party-Planer, damit die Einladung **fertig befüllt** aufgeht statt leer, (2) die zwei Reparaturen (PNG-Export, QR) mit unseren Testbefunden, (3) die restlichen Produktions-Anpassungen. Ziel-URL: `https://machsleicht.de/einladung/studio/` (Standalone, self-contained wie bisher).

---

## 1) Anknüpfung an den Planer — die Einladung steht schon

Der Planer (machsleicht.de/kindergeburtstag.html) speichert seinen kompletten Zustand **same-origin** in `localStorage` unter dem Key **`mlplan_v4_state`** (JSON). Da das Studio auf derselben Domain liegt, kannst du direkt lesen. **Read-only: niemals in diesen Key schreiben** — dein eigener Save-State bleibt separat (nimm `machsleicht-studio-v1`).

### Relevante Felder und Mapping auf deine Inputs

| Dein Feld | Quelle in `mlplan_v4_state` | Hinweise |
|---|---|---|
| `kidName` | `state.name` | String, kann leer sein |
| `kidAge` | `state.exactAge` | Zahl oder `null`. Fallback: `state.age` ist die GRUPPE `'3-5'`/`'6-8'`/`'9-12'` → Mitte nehmen (5/7/10) |
| `partyDate` | `state.date` | ISO `YYYY-MM-DD` → formatieren: `new Date(d).toLocaleDateString('de-DE',{day:'numeric',month:'long',year:'numeric'})` |
| `partyTime` | `state.time` | `'14:00'` → `'14:00 Uhr'`. (`state.endTime` existiert auch, optional) |
| `partyPlace` | `state.adresse` | Echte Adresse, oft leer → Fallback `'Bei uns zuhause'`. **Volle Adresse nur auf die Einladung drucken, nie zusätzlich irgendwohin senden** |
| Theme | `state.motto.id` | Kanonische ID, siehe Mapping unten. `state.motto` ist ein großes Objekt — du brauchst nur `id`, `name`, `emoji` |
| **Foto** | `state.invite.photo` | **Bereits fertig gecropptes Kinderfoto als JPEG-dataURL** (oder `null`). Direkt als Editor-Foto setzen — die Mutter hat es im Planer schon hochgeladen und zugeschnitten. `null` → dein Demo-Foto |
| `partyUrl` | `state.partyseite.url` | Existiert **nur wenn** `state.partyseite.active === true`. Format `https://party.machsleicht.de/<id>` |
| Einladungstext | dein Theme-Default | Deine Motto-Messages sind gut; `state.partyMessage` ist die Nachricht für die Partyseite, NICHT für die Einladung — nicht übernehmen |

### Verhalten beim Öffnen

1. `mlplan_v4_state` vorhanden und `state.name` + `state.motto` gesetzt → Editor öffnet **komplett fertig**: richtiges Theme, Name/Alter/Datum/Zeit/Ort eingesetzt, Foto drin, Toast „Deine Party-Daten sind übernommen ✓". Kein einziges Feld muss neu getippt werden — das ist der Kernwert der Verzahnung.
2. Kein Planer-State → deine Demo-Defaults wie bisher (Matti/Dino), plus dezenter Hinweis-Link „Erst den Party-Planer ausfüllen? → /kindergeburtstag.html".
3. Änderungen im Studio bleiben im Studio (one-way). Ein „Neu aus Planer laden"-Button darf den Studio-State bewusst überschreiben.
4. URL-Parameter als Override vorsehen (wir verlinken ggf. mit `?motto=piraten`): `motto` > localStorage-Motto.

### Motto-Mapping (fast geschenkt)

Unsere 15 kanonischen IDs: `piraten, einhorn, weltraum, dino, prinzessin, superheld, feuerwehr, safari, detektiv, meerjungfrau, dschungel, feen, pferde, ritter, baustelle`.
**14 deiner Keys stimmen exakt — nur `pirat` → `piraten` umbenennen.** Bitte die Keys kanonisch machen (nicht mappen), dann bleibt alles kompatibel.

Kleinigkeit: In deiner Piraten-Message ist „Kapitän **Matti**" hardcoded → `Kapitän {name}` und beim Einsetzen ersetzen, sonst lädt Lena als Matti ein.

---

## 2) Reparatur A: PNG-Export (aktuell defekt — unsere Testbefunde)

Wir haben den Export im Playtest reproduzierbar zerlegt, zwei Ebenen:

1. **`clone.outerHTML` erzeugt kein wohlgeformtes XML.** Das `<br>` im Foto-Platzhalter (`📷<br>Foto hochladen`) bricht den SVG-Parser: „Opening and ending tag mismatch: br". `img.onerror` feuert **immer** → dein Alert-Pfad ist der Normalfall. (Nachweis: `DOMParser.parseFromString(svg,'image/svg+xml')` → parsererror; mit `new XMLSerializer().serializeToString(clone)` ist er weg.)
2. **Auch mit XMLSerializer-Fix bleibt das Fundament kaputt:** SVG-`foreignObject` → `drawImage` **taintet den Canvas auf Safari/iOS** (in unserem Test-Browser ebenfalls: schon ein foreignObject-SVG mit reinem Text taintet; `toBlob`/`getImageData` werfen `SecurityError`). Unsere Zielgruppe sind Mütter am iPhone — „Bitte in Chrome öffnen" ist für sie ein Totalausfall.

**Anforderung: Export auf direktes Canvas-Zeichnen umstellen** (kein foreignObject, keine Fremd-Lib nötig):

- Eine Funktion `paintCard(ctx, scale)` zeichnet die Karte nativ: 420×746-Koordinatensystem, Export mit `scale=3` auf 1260×2238.
- **Hintergrund:** `createLinearGradient` mit deinen 3 Stops (Winkel 160° über Start-/Endpunkt), darüber die 2 Blobs (Kreise/Ellipsen, weiß mit Alpha), darüber das Theme-Pattern. Die CSS-Patterns (Punkte/Streifen je Theme) als kleine Zeichenroutinen nachbauen — pro Theme Typ `dots`/`stripes`/`grid` + Parameter statt CSS-Strings.
- **Info-Panel:** rounded rect mit Alpha-Füllung. Das echte `backdrop-filter: blur()` gibt es im Canvas nicht — halbtransparentes Weiß auf dem Gradient sieht praktisch identisch aus. (Glas/Transparent-Modus berücksichtigen.)
- **Elemente:** über `card.querySelectorAll('.design-el')` iterieren, aus `style.left/top/width/fontSize/fontWeight/color/textAlign/opacity/zIndex` und dem Textinhalt zeichnen (nach zIndex sortiert). Mehrzeilige Texte: eigene Wrap-Messung via `ctx.measureText` (deine `fitWrappedText`-Breiten gelten). Emojis rendert `fillText` nativ farbig.
- **Foto:** `drawImage` mit Cover-Crop-Berechnung + `roundRect`-Clip (Radius aus dem Element). Quelle ist eine dataURL → kein Taint.
- **QR:** als Bild/Canvas aus Reparatur B übernehmen, plus weißes Trägerkästchen + „PARTYSEITE"-Label.
- Vor dem Zeichnen `await document.fonts.ready`. Font-Stack im Canvas identisch angeben; akzeptiert, dass „Arial Rounded MT Bold" auf Android auf den Fallback geht.
- `exportPNG`/`shareInvitation` nutzen beide `paintCard`. Der Alert-Pfad darf nur noch echte Ausnahmen fangen.

**Akzeptanz:** Export UND Teilen liefern auf iOS Safari (real getestet), Android Chrome und Desktop ein 1260×2238-PNG, das der Editor-Vorschau in allen 3 Layouts × mit/ohne Foto entspricht.

---

## 3) Reparatur B: QR-Code lokal statt quickchart.io

`fetch("https://quickchart.io/qr?...")` schickt die Partyseiten-URL an einen US-Drittdienst. Das kollidiert mit unserem Datenschutz-Versprechen („bleibt auf deinem Gerät" steht wörtlich in deinem UI-Text) und unserer Datenschutzerklärung.

- **Lokale QR-Generierung** einbetten: z. B. `qrcode-generator` (MIT, ~5–10 KB minified) **inline ins HTML** — kein CDN-Load, die Seite bleibt self-contained. ECLevel M, Margin 1, Ausgabe auf Canvas/dataURL.
- **QR + „HIER ZUSAGEN" + Link-Zeile nur rendern, wenn eine echte Partyseite existiert** (`state.partyseite.active && state.partyseite.url`). Sonst: Bereich komplett ausblenden und im Panel dezent anbieten: „Partyseite im Planer aktivieren — dann kommen Zusagen automatisch". Eine gedruckte Karte mit totem Link/Platzhalter-QR ist der schlimmste Fall.
- **Sicherheit:** Ausschließlich `state.partyseite.url` (Gäste-URL) codieren. **Niemals `state.partyseite.editUrl`** — die enthält das Edit-Token und gibt Vollzugriff auf die Partyseite.
- Der manuelle `partyUrl`-Input darf bleiben (Power-User), aber Vorbefüllung + Gating wie oben.

---

## 4) Restliche Produktions-Anpassungen

1. **Demo-Foto:** dein inline-base64 raus; beim Start `/spiele/core/demo-kid.jpg` per `fetch` → `FileReader.readAsDataURL` laden (liegt auf unserer Domain; dataURL ist Pflicht, damit der Export-Weg sauber bleibt). Unser Testbuild macht das schon so — Code gern übernehmen.
2. **Analytics:** wir nutzen Umami hinter einem `plausible(name, {props})`-Wrapper (Shim liefern wir beim Einbau). Bitte Events feuern: `studio_open` (props: `{prefilled: true/false}`), `studio_theme` `{id}`, `studio_export`, `studio_share`.
3. **Seitenrahmen:** `<title>`/Meta-Description/`<link rel="canonical" href="https://machsleicht.de/einladung/studio/">`, Footer mit Links auf `/impressum.html` und `/datenschutz.html`, Topbar-Link zurück zum Planer (`/kindergeburtstag.html`). Lang bleibt `de`.
4. **localStorage-Key** für deinen Save-State: `machsleicht-studio-v1`.
5. **Datenschutz-Text präzisieren:** „Bleibt nur in deinem Browser" stimmt nach Reparatur B — bitte genau so lassen und nirgends eine Upload-Formulierung einführen.
6. Buttons „Speichern" → „Entwurf speichern" (klar: lokal), Toast entsprechend.

## 5) Was auf unserer Seite passiert (nicht dein Scope)

Wizard-CTA im Einladungs-Schritt („🖼️ Bild-Einladung gestalten →" neben Spiel-Einladung/Partyseite), Verlinkung von den Motto-Vorlagen-Seiten, finale Umami-Verdrahtung, unabhängiges Review-Gate und Deploy. Liefergegenstand von dir: **eine** self-contained HTML-Datei (wie V12), wir hängen sie unter `/einladung/studio/` ein.

## 6) Abnahme-Checkliste

- [ ] Öffnen mit ausgefülltem Planer-State → Einladung steht komplett (Theme, Name, Alter, Datum, Zeit, Ort, Foto), 0 Felder nötig
- [ ] Öffnen ohne State → Demo-Modus wie bisher
- [ ] `pirat` → `piraten`; alle 15 Keys == kanonische IDs; `{name}` statt „Matti" in Theme-Texten
- [ ] PNG-Export + Teilen auf **iOS Safari real**, Android Chrome, Desktop — 1260×2238, entspricht Vorschau (3 Layouts × mit/ohne Foto)
- [ ] Kein Request an quickchart.io oder sonstige Dritt-Hosts (Netzwerk-Tab leer bis auf eigene Domain)
- [ ] QR/„HIER ZUSAGEN" nur bei aktiver Partyseite; codiert nie die editUrl
- [ ] `mlplan_v4_state` wird nie beschrieben
- [ ] Footer/canonical/Events drin
