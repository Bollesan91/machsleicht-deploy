# Abschlussstand 11.09. an den Prüfstand — Ping ging nicht durch, Inhalt liegt hier

**Erstellt:** 2026-09-14 von der Bau-Session (`machsleicht-ab`)
**Status:** Wartend auf den Prüfstand (`machsleicht-7b`) — Session war beim Senden nicht erreichbar
**Betrifft:** `party-worker.js`, `_dev/marketing/funnel-demos/anim_bauen.py`, Deploy-Skript

## Warum diese Datei existiert

Der Abschlussbericht zum 11.09. sollte per `SendMessage` an `machsleicht-7b` gehen — so
sieht es `_dev/pruefstand/README.md` vor. Die Session ist nicht mehr erreichbar
(„No agent named 'machsleicht-7b' is reachable", beide Namensvarianten probiert; letzte
Aktivität 11.09.). Damit der Bericht nicht verloren geht, liegt er hier: Handoff-Dateien
sind der zweite der drei Kanäle, und `AUDIT.md`/`SESSION-NOTES.md` sind die Zone des
Prüfstands und aktuell uncommitted — die fasse ich nicht an.

**Für den Prüfstand beim nächsten Start:** Punkt 2 unten ist der einzige, der eine neue
Stufe verdient. Der Rest ist Bericht.

## Stand

| | |
|---|---|
| `main` | **acebbc22** (live seit 11.09. 19:06) |
| Worker | Version **26f92666** |
| `draft` | **b78359a4** — nur das Befund-Doc obendrauf, nichts Deploybares offen |

## 1. Der Emoji-Befund des Prüfstands ist behoben und ausgerollt

`e: asStr(a.e).slice(0, 4)` im Ablaufplan-Versand zerschnitt zusammengesetzte Emoji:
🏴‍☠️ 🦸‍♀️ 🧜‍♀️ brauchen fünf UTF-16-Einheiten, nicht vier. Kein theoretischer Fall — 🏴‍☠️
steht 11× im Planer.

Jetzt `firstEmoji(a.e)` — **dieselbe Funktion, die vier Zeilen darüber schon stand**,
eingeführt mit dem Kommentar „slice(0,4) zerschnitt ZWJ-Emojis … → kaputtes Hero-Emoji".
Derselbe Fehler war schon einmal da, wurde behoben und dokumentiert; als der Ablaufplan
dazukam, wurde trotzdem wieder `slice(0,4)` getippt. Der Einzelfall war erledigt, die
Klasse nicht.

Commit `cdfee8bc`, Worker-Version `26f92666`. Live geprüft: im Editor „15:00 🦄 Ankommen &
Einhorn-Schminken", keine zerschnittenen Emoji, Gast-Ansicht liest den Schlüssel 0×.
Repoweit gegengeprüft: keine dritte Stelle.

## 2. Der Fehler, den keine Messung von mir gefunden hat — hier lohnt eine Stufe

Bolle hat auf seinem iPhone gesehen, dass der Chat unten aus dem Telefonrahmen läuft.

```
.gw__phone  { aspect-ratio:9/18.6; padding:11px }   Höhe kommt NUR aus aspect-ratio
.gw__screen { width:100%; height:100%; overflow:hidden }
```

Eine Prozenthöhe braucht eine auflösbare Elternhöhe. Stammt die allein aus
`aspect-ratio`, löst Safari sie nicht zuverlässig auf: der Bildschirm hat dann keine
Höhe, und `overflow:hidden` schneidet vertikal nichts ab.

Fix: `position:absolute;inset:11px` (dasselbe Maß wie das bisherige Polster) plus
`isolation:isolate`, weil die Chat-Blasen `transform` tragen. Geometrie nachgemessen:
identisch — 326×674 / 304×652, 11 px ringsum. Commit `ca660f6d`, Deploy `acebbc22`,
von Bolle am Gerät bestätigt.

**Ich konnte den Fehler nicht reproduzieren** — der In-App-Browser ist Chromium und
clippt auch mit der alten Regel korrekt. Gefunden hat ihn Bolle in zehn Sekunden am
eigenen Gerät.

Zusammen mit `aspect-ratio` gegen das `height`-Attribut und der Nur-375-px-Messung ist
das der dritte Fall in drei Tagen, in dem **eine Umgebung, in der es funktioniert, kein
Nachweis war, dass es funktioniert.**

Der prüfbare Kern ist statisch greifbar und eine Klasse, kein Einzelfall:
*eine Prozenthöhe, deren Elternhöhe allein aus `aspect-ratio` stammt.* Der befürchtete
Fehlgriff für die Probe: die Stufe matcht `height:100%` und `aspect-ratio` im selben
Block und meldet grün, weil die beiden Regeln in verschiedenen Blöcken stehen — sie
gehören ja zu Eltern und Kind, nie zu demselben Selektor.

## 3. Am Deploy-Skript repariert

Die Sperre „Worker geändert → Netlify liefert ihn nicht aus" kannte den Fall „schon per
wrangler ausgerollt" nicht und blockierte. Sie greift weiter, lässt sich aber mit
`--worker-ist-ausgerollt` und genannter Version übergehen — kein stummes Abschalten.

## 4. Befund-Doc nachgetragen

`_dev/review/2026-09-04-funnel-test.md`, 3.263 → 3.324 Zeilen, Commit `b78359a4`.
Der Satz des Prüfstands zur geräteunabhängigen Kopie steht darin: der Plan liegt im
localStorage des Geräts, auf dem er gebaut wurde — die Partyseite ist von überall
abrufbar; die Karte ist damit die einzige geräteunabhängige Kopie des Ablaufs.

## Benannte Grenze, nicht geschlossen

Ändert der Gastgeber seinen Plan später, bleibt auf der Partyseite der Stand vom Anlegen.
Der Text sagt das ehrlich („so, wie du ihn beim Anlegen der Partyseite hattest"), aber es
gibt keinen Aktualisierungsweg — der bräuchte wieder einen Schreibweg vom Planer zur
Partyseite, und genau den hat die Brücke aus guten Gründen nicht bekommen.

## Offen bei Bolle, nicht bei uns

- **Search Console:** Sitemap einreichen, URL-Prüfung für `/` und `/kindergeburtstag`
  (beide `lastmod 2026-09-11`).
- **unpkg-Ticket:** React + React-DOM kommen seit dem 25.03. von `unpkg.com`, `unpkg`
  steht 0× in der Datenschutzerklärung. Empfehlung: lokal hosten wie bei den Schriften.
- **Linter-Stufe für Fremd-Hosts** (Vorschlag des Prüfstands: Erlaubnisliste +
  Positivkontrolle als Abbruch) — wartet auf Bolles Wort.
