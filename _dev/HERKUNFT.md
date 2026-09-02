# HERKUNFT — woher jedes Artefakt kommt, wem es gehört, was daran hängt

> Erstellt 02.09.2026. Anlass: Bolle korrigierte eine Fehlbenennung von mir („Hannes macht
> **Einladungsspiele**, nicht Spiele an sich") und verlangte, den Gesamtkontext ein für alle Mal
> glattzuziehen — Worker, Wizard und alles, was daran hängt.
>
> Jede Aussage hier ist belegt (Datei:Zeile oder git-Commit). Wo etwas unbelegt blieb, steht das
> ausdrücklich. Erhoben von vier parallelen Kartierungs-Läufen, gegengeprüft durch den Prüfstand
> (`machsleicht-7b`) mit Mutationsproben.

---

## 1. Der Befund in einem Satz

Es gibt keine zwei auseinandergelaufenen Quellen. Es gibt **ein Muster**: *einmal erzeugen,
Generator liegenlassen, von Hand weiterpflegen* — und es ist **mindestens siebenmal** passiert.
Die zwei Spielkataloge sind nur der sichtbarste Fall.

---

## 2. Die zwei Einladungsspiel-Familien (Hannes' Zone)

**Korrektur meiner Fehlbenennung:** `spiele/` ist kein allgemeiner Spielekatalog. Die Dateien
werden ausschließlich von `einladung/*/whatsapp/`, `einladung/erstellen/` und dem Worker
eingebunden. Das ist die **Einladungsspiel-Maschinerie**.

| | **core** | **legacy** |
|---|---|---|
| Ort | `spiele/game-*.html` (60) | `einladung/<motto>/whatsapp/index.html` (15) |
| Aufbau | schlanke Datei + gemeinsames `spiele/core/core.js` | 200 KB Einzeldatei mit inline React |
| Mottos | 15 × 4 Spiele | 15 × 1 |
| Alter | nur über `?age=` (`core.js:72`) | **nur 4 von 15 lesen `?age=`** (piraten, detektiv, safari, einhorn) |
| **Datum** | erwartet **ISO** `YYYY-MM-DD` (`core.js:204`) | erwartet **fertigen deutschen Text**, wird roh gerendert |

Der Worker kennt den Unterschied und bedient beide korrekt (`party-worker.js:1877–1885`).
Die Familienunterscheidung ist durch **Stufe 60 gesichert** — der Prüfstand hat den Guard
zweimal mutiert (tot und invertiert), beide Male Exit 1.

**Kein Generator erzeugt die 60 core-Spiele.** Sie sind Serve-Kopien handgepflegter Prototypen
aus `_dev/prototypes/`. Die Zwillingspaare werden von **keiner Stufe** verglichen
(`validate-all.sh` enthält 0 Treffer für „prototypes").

---

## 3. Zwei lebende Einladungswege — kein Widerspruch, ein Produktschnitt

| | **Partyseite** (Worker) | **`/e/`-Kurzlink** (Netlify) |
|---|---|---|
| Route | `party.machsleicht.de/<id>` | `_redirects:226` → `netlify/functions/serve-invite.mjs` |
| Zusagekanal | Formular auf der Seite | **wa.me**, deshalb ist `tel` dort Pflicht |
| `tel=` an das Spiel | **nie** (`party-worker.js:1911`) | **immer** (`serve-invite.mjs:38`) |
| `age=` an das Spiel | ja | **nein** |
| Adresse | nur `areaHint`, nie die genaue | wie eingegeben |

Der `tel`-Unterschied ist **richtig so**: auf der Partyseite wäre ein wa.me-Knopf ein Kanal am
Formular vorbei (der Gastgeber verlöre Gästeliste und Allergie-Angaben); auf dem `/e/`-Weg gibt
es kein Formular, dort *ist* wa.me der einzige Kanal.

### ⚠ Offener Defekt auf dem `/e/`-Weg

Das Formular unter `einladung/erstellen/index.html:239` fragt das Datum als **Freitext** ab
(Platzhalter: „z.B. Samstag, 15. Mai"). `serve-invite.mjs:35` reicht ihn unverändert durch — auch
an **core**-Spiele, die ISO erwarten. Ausgeführt:

```
"Samstag, 12. September"  ->  "Mittwoch, 12. September"   (Jahr 2001)   ← falscher Wochentag
"Samstag, 15. Mai"        ->  Rohtext                                    harmlos
```

Es hängt am Monatsnamen. Das ist dieselbe Klasse, für die der **Worker** im August repariert
wurde; der Netlify-Weg nicht. → BACKLOG.

### ⚠ Cache-Buster älter als der Code

Alle 60 core-Spiele laden `core/core.js?v=20260802`. `core.js` wurde am **27.08.** geändert
(`280d82e9`, „Gutachten 46/100 abgearbeitet: fünf Blocker zu"). Beim CSS dasselbe bei 45 von 60
(`?v=20260708`, Datei zuletzt 12.07.). Wer ein Spiel im August geöffnet hat, bekommt die alte
Datei — fünf gegatete Blocker-Fixes erreichen ihre Nutzer möglicherweise nicht. → BACKLOG.

---

## 4. Herkunft je Artefakt

| Artefakt | erzeugt von | Generator lebt? | Wächter |
|---|---|---|---|
| `sitemap.xml` | `generate-sitemap.js` | **ja** — einziger mit automatischem Aufruf (git-sync-Skill) | — |
| `paket/<motto>/index.html` (7) | `paket-bauen.py` aus Manifest + Template | **ja**, manuell; Rebuild-Beweis 20.08. | Stufen 29, 40, `maschinen-abnahme.js` |
| `kindergeburtstag/baustelle-*-jahre.html` (3) | `_src/generate-age-pages.py` | **ja**, als Orakel | Stufe 36 (Byte-Identität) |
| Sicherheitsregel-Spans auf 45 Seiten | `regeln-drucken.py` | **ja**, idempotent | Stufe :754 (`--check`) |
| `data/motto/*.json` (45) | `build-motto-data.py` | **stillgelegt** — trägt seit 31.07. „⛔ NICHT MEHR AUSFÜHREN"; die Daten sind heute die Wahrheit | — |
| `kindergeburtstag/<motto>.html` (15) | `generate-seo-pages.js`, **einmal am 25.03.** | **nein** | Stufen 62, 64 |
| `kindergeburtstag/<motto>-<alter>-jahre.html` (45) | `consolidate-age-pages.js`, einmal am 27.03. | **nein** | nur baustelle (3 von 48) |
| `einladung/<motto>/index.html` (15) | `einladung-hub-gen/`, einmal am 10.06. | **nein** | — |
| `einladung/<motto>/whatsapp/` (15) | Hand seit dem Erst-Commit | — | — |
| `spiele/game-*.html` (60) | Hand, Kopien aus `_dev/prototypes/` | — | **keiner** |
| `schatzsuche/<motto>.html` (15) | 12 Hand, 3 einmalig am 26.05. | **nein** | — |
| `ratgeber/` | **existiert nicht mehr** | — | Rest-Prüfung `validate-all.sh:285` |

### Artefakte mit zwei konkurrierenden Erzeuger-Ansprüchen

`sitemap.xml` · `_redirects` · `kindergeburtstag/<motto>.html` · `baustelle-*-jahre.html`
(bewusst konvergent per Vertrag) · `prinzessin-/superheld-*-jahre.html` (bewusst entkoppelt) ·
`data/motto/*.json` · `kindergeburtstag-zuhause/-last-minute/-checkliste.html`

Bei den meisten ist der zweite Anspruch tot — und **genau das ist die Gefahr**: ein totes Skript,
das noch schreiben *könnte*, überschreibt Monate Handarbeit, wenn es jemand ausführt.
`build-motto-data.py` warnt selbst davor. `worker-type-harden.py` tut es nicht: es überschreibt
`party-worker.js` **in place** (`Zeile 30`) und wird von nichts aufgerufen.

---

## 5. Gespiegelte Verträge — was auseinanderlaufen kann

| Vertrag | Fundstellen | Stufe? |
|---|---|---|
| **Spiel-Katalog** | `party-worker.js:1151` · `create-invite.mjs:21` · `serve-invite.mjs:59` · `einladung/erstellen:327` · `kindergeburtstag.html:2682` | **keine** |
| **15-Motto-Liste** | Worker (2×) · `serve-invite` · Creator-Chips · Wizard · `theme-registry.js` | **keine** |
| **`ROLE_CATALOG`** | `party-worker.js:1171` · Paket-Manifeste · `paket-core.js:222` | **keine** |
| **Farben/Emojis** | `party-worker.js:133` · `theme-registry.js:41` — dort selbst als „bekannte Inkonsistenz, user-sichtbar" dokumentiert | **keine** |
| `MAX_GUESTS = 30` | `party-worker.js:33` · `kindergeburtstag.html:2720` · `check-partyseite-render.mjs:91` | Stufe 60 (indirekt) |
| Spiel-URL-Params | Worker ↔ `core.js:62` ↔ legacy inline | **Stufe 60 (bewiesen)** |
| Helfer-Zwillinge `poss`/`parseDur`/`fmtHM`/`esc` | Wizard ↔ `paket-core.js` | **Stufe 18 (bewiesen)** |

Bei Drift verhält sich alles **fail-soft**: unbekannte `gameId` → Legacy-Klassiker, unbekannte
Rolle → kapitalisierter Rohstring, Farbdrift → sieht nur falsch aus. Nichts schlägt an.

---

## 6. Lese-Stellen ohne Datenquelle

`kindergeburtstag.html:1896` liest `d.signature || v.signature` — der Schlüssel `signature`
existiert in **0 von 45** `data/motto`-Dateien (`signatureRitual` ist ein anderer). Der Fallback
feuert immer und fällt nie auf, weil er sich wie ein Default verhält.

`js/motto-data.js` enthält **6 Spiele, alle piraten**. 14 Mottos fallen auf dünne Inline-Daten
zurück, obwohl die Datei wie ein Katalog aussieht.

---

## 7. Listen, die gegen die Wirklichkeit driften — KORRIGIERT

**Erste Fassung dieses Abschnitts war falsch.** Ich hatte gemeldet, `PAKET_MOTTOS` schalte 6
Mottos frei, während unter `paket/` 7 fertige Pakete lägen — `prinzessin` sei unerreichbar und
das koste Geld. Der Prüfstand hat widersprochen und recht behalten:
`paket/prinzessin/index.html` steht in **`.gitignore` Zeile 33**. Die Datei liegt nur auf einer
lokalen Platte, ist nicht versioniert und war nie deployt.

**Versioniert sind 6 Pakete, `PAKET_MOTTOS` listet 6 — sie decken sich exakt.** Es gibt hier
keinen Drift. Offen bleibt allein die Produktfrage, ob prinzessin fertiggebaut und freigeschaltet
werden soll (das Manifest steht seit 12.08. als WIP).

**Die Lehre daran ist die wertvollere:** Ich habe das Arbeitsverzeichnis gemessen und den
versionierten Stand gemeint. Auf einem anderen Rechner hätte dieselbe Messung etwas anderes
ergeben. Stufe 65 misst deshalb ausdrücklich `git ls-files` statt der Platte — sonst meldet sie
je nach Maschine ein anderes Ergebnis, und eine Stufe, die vom Rechner abhängt, ist keine.

---

## 8. Was daraus folgt

1. **Der Ursprung ist nicht Nachlässigkeit, sondern ein Muster.** „Einmal erzeugen, Generator
   liegenlassen" ist mindestens siebenmal passiert. Wer es abstellen will, braucht keine
   Aufräumaktion, sondern einen Mechanismus, der neue Waisen beim Entstehen meldet.
2. **Ein toter Generator ist gefährlicher als gar keiner** — er sieht aus wie die Wahrheit und
   überschreibt sie.
3. **Was zwei Generatoren beansprucht, braucht einen Vertrag oder eine Stilllegung.**
   `build-motto-data.py` zeigt, wie eine gute Stilllegung aussieht: ⛔-Vermerk mit Begründung.
