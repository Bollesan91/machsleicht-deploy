# Juwelensuche-Umbenennung — Kachelname + Beschreibung nachziehen

**Erstellt:** 2026-08-23 vom Prinzessin-Spiele-Chat (Hannes)
**Status:** Wartend auf Bolle
**Betrifft:** `party-worker.js`, `kindergeburtstag.html`, `einladung/erstellen/index.html`

## Worum geht's

Das Prinzessin-Spiel `tatort` heißt auf Hannes' Wunsch seit dem 23.08. **„Juwelensuche"**.
Im Spiel selbst ist das vollzogen (Commit `6bcae346` auf `draft`), **in der Spielauswahl
nicht** — dort steht weiter „Kronjuwelen-Tatort" samt einer Beschreibung, die das Spiel
falsch darstellt. Die drei Fundstellen liegen alle in Bolles Territorium (Worker +
Top-Level-HTML), deshalb wurden sie aus dem Spiele-Chat heraus nicht angefasst.

Der alte Name beschreibt das Spiel nicht: es gibt darin **weder Spurensicherung noch einen
Dieb, den man überführt**. Man sucht fünf Juwelen, die im Ballsaal zwischen der Deko
liegen; sind alle gefunden, flutet das Foto den Saal und die Einladung erscheint.

## Was bisher passiert ist

- Spiel ist durch: Stufe 2 GO 83, 0 offene MAJORs, von Hannes abgenommen („das Spiel passt").
- `6bcae346` — Umbenennung **im Spiel**: `<title>` → „Juwelensuche — Prinzessin",
  Intro-`<h1>` „Ein Fall im Schloss!" → „Juwelensuche im Schloss!", Start-Knopf-Emoji
  🔍 → 💎 (die Lupe war ein Detektiv-Rest), Kommentar zur Stuhl-/Rosen-Deko nachgezogen.
- Playtest age 4/8/12 bis zum Reveal, 0 Konsolenfehler, `node --check` grün.
- Geprüft und ausgeschlossen: `_dev/prototypes/_skin-gen.js` erzeugt **nur**
  Schatzjagd-Skins und fasst dieses Spiel nicht an — die Änderung ist nicht
  generator-gefährdet.

## Was als nächstes ansteht

**Bolle:** in drei Dateien Name und Untertitel ersetzen. Überall derselbe Datensatz,
von Hand dreifach gepflegt.

**ALT** (in allen drei identisch):

    "Kronjuwelen-Tatort"
    "Die Kronjuwelen sind weg! Sichere die Spuren am Tatort und überführe den Dieb."

**NEU:**

    "Juwelensuche"
    "Im Ballsaal des Schlosses liegen fünf Kronjuwelen zwischen all dem Prunk."

Der neue Untertitel ist aus dem Intro-Satz des Spiels abgeleitet — das ist die Konvention,
die der Worker-Kommentar selbst nennt („Subs stammen aus den Spiel-Intros selbst").

| Datei | Zeile | Zu ändernde Felder |
|---|---|---|
| `party-worker.js` | 1060 (`GAME_META`) | `"tatort-prinzessin":{"t":…,"s":…}` → **`t`** und **`s`** |
| `kindergeburtstag.html` | 2666 | `{"id":"tatort-prinzessin","n":…,"s":…}` → **`n`** und **`s`** |
| `einladung/erstellen/index.html` | 327 | identischer Datensatz → **`n`** und **`s`** |

### ⚠️ Was dabei NICHT angefasst werden darf

- **`id` / `p` / Dateiname bleiben `tatort-prinzessin` bzw.
  `spiele/game-tatort-prinzessin.html`.** Der Slug ist die `gameId`, die über `IND_GAMES`
  (`party-worker.js:1049`) in den `GAME_CATALOG` läuft und zur Laufzeit aufgelöst wird —
  eine Datei-Umbenennung bricht die Spielauswahl. Interner Slug und Anzeigename dürfen
  hier auseinanderlaufen, das ist Absicht.
- **`"g":"tatort"` bleibt.** Gruppierungsschlüssel; im Creator wird gegen `g === 'klassiker'`
  verglichen. Ändern bringt nichts und riskiert die Filterung.
- **`"e":"💎"` bleibt.** Passt zum neuen Namen besser als zum alten.

### Kosmetisch, kein Muss

- `_dev/EINLADUNGSSPIELE-KONZEPTE.md` nennt den alten Namen.
- `_dev/prototypes/game-tatort-prinzessin.html` ist ein Stand vom 17.07. (13,5 KB gegen
  22,3 KB produktiv) — Karteileiche, nicht als Vorlage benutzen.

## Open Questions (warten auf Bolle-Entscheidung)

**Die Klasse hinter dem Fall.** `_dev/docs/PAKET-DATENFLUSS.md:319` klagt genau das schon an:

> Spiele-Katalog dreifach hardcodiert: `GAMES_E` in /einladung/erstellen/, `GAME_META` im
> party-worker, `GAME_META_*` in jedem Paket — jede Spiel-Umbenennung ist ein
> 8-Dateien-Sweep mit garantiertem Drift.

Diese Umbenennung ist der Beleg dafür: eine Produktentscheidung zerfällt in drei
Handkopien in zwei getrennt deploybaren Artefakten (Netlify-HTML vs. Cloudflare-Worker).
Ein Deploy, der nur eine Seite mitnimmt, erzeugt den Drift. Hier sind es nur 3 statt 8
Dateien, weil es **kein Prinzessin-Paket** gibt — bei einem Motto mit Paket wären es mehr.

Frage an Bolle, im Sinne von Helfer V5 „Klasse vor Fall": generierter Katalog (wie
`_bundle.js` für die Motto-Daten), oder als billiger Zwischenschritt eine Linter-Regel,
die die drei Kopien gegeneinander diffed und bei Abweichung rot wird? Solange keins von
beidem existiert, ist jede weitere Umbenennung derselbe Handsweep.

## Nachverfolgung

Erledigt ist es, wenn diese Suche im Repo-Root keine Treffer mehr liefert:

    git grep -n "Kronjuwelen-Tatort" -- . ":(exclude)_dev"

Solange sie Treffer zeigt, ist die Umbenennung halb passiert und die Kachel widerspricht
dem Spiel.

## Wann dieses File löschen

Wenn die drei Fundstellen umgestellt sind (Gegenprobe oben ist leer) **und** die
Katalog-Dublette entweder mechanisiert oder als bewusst akzeptiert in AUDIT.md notiert
ist. Das Wissen fließt dann nach AUDIT.md (Datenwahrheit-Brüche) bzw. SESSION-NOTES.md.
