# machsleicht-Pruefstand

Harte Testumgebung fuer machsleicht-Entwicklungen. Laeuft in einer eigenen Session, die
von den Bau-Sessions angepingt wird und **Befunde** zurueckgibt — nicht Meinungen.

Vorbild ist der ASKER-Pruefstand (Session `sandbox-7e`). Uebernommen ist sein Aufbau,
**nicht** sein Zuschnitt: machsleicht hat ein anderes Risiko, eine andere Naht und eine
Maschine, die es dort nicht gibt. Was warum anders ist, steht unten unter
„Was von ASKER nicht passt".

## Anpingen

Session-Name fuer `SendMessage`: **`machsleicht-7b`**
(Titel: „machsleicht-Pruefstand (Testumgebung, pingbar)"). Mit `ListAgents` findbar.

Ein brauchbarer Ping nennt vier Dinge:

1. **Was gebaut wurde** — Datei/Generator/Stufe, gern mit Commit.
2. **Was gelten soll** — die Zusage in einem Satz („jeder Ablauf-Kasten nennt nur Spiele,
   die dieselbe Seite auch erklaert").
3. **Wie es falsch laufen koennte** — der befuerchtete Fehlgriff. Daraus wird die Probe.
4. **Spur A oder B** — Code/Daten/Maschine (A) oder Inhalt/Text/Spielbarkeit (B). Der
   Unterschied entscheidet, ob der Pruefstand allein abnehmen darf. Siehe
   [`reviewer_auftrag.md`](reviewer_auftrag.md).

Zurueck kommt eine Befund-Tabelle: Pruefpunkt, gruen/rot, Beleg, plus ein **Stempel**
(`GATE: intern` / `GATE: intern (vorlaeufig)` / `GATE: extern`). Rote Punkte tragen ihren
Beleg mit, damit sie ohne Rueckfrage lesbar sind.

### So sieht ein Ping aus

```
SendMessage(to: "machsleicht-7b", message: """
PING PRUEFSTAND
Spur: A
Gebaut: _dev/scripts/check-ablauf-deckung.py (neue Stufe 65), Stand draft @ <sha>
Zusage: Jeder Beispiel-Ablauf nennt nur Spiele, die dieselbe Seite auch erklaert.
Befuerchteter Fehlgriff: Der Abgleich matcht auf Wortstaemme und haelt
  "Schatzsuche" fuer "Schatz-Station" — dann meldet die Stufe gruen, wo sie
  rot sein muesste.
Bitte: Stufe scharf pruefen + Mutationsnachweis, dann Befund-Tabelle zurueck.
""")
```

Was NICHT reicht: „schau mal drueber". Ohne Zusage gibt es keine Falsifikation, und
ohne befuerchteten Fehlgriff keine Probe — dann bleibt nur eine Meinung, und die ist
genau das, was dieser Pruefstand nicht liefert.

## Der Ping-Ablauf

Was nach jedem Ping passiert — in dieser Reihenfolge, ohne Abkuerzung.

1. **Deterministisch zuerst.** `bash validate-all.sh` (0 FAIL) → betroffene `check-*.py`
   → `python _dev/pruefstand/pruefstand.py`. Was hier rot wird, ist kein
   Gegenpruefer-Thema. Es geht sofort zurueck.
2. **Gegenpruefung.** Ein **frischer Subagent** (`model: fable`) bekommt den ausgefuellten
   [`reviewer_auftrag.md`](reviewer_auftrag.md) — genau eine Zusage, die brechen soll. Er
   schreibt nach `befunde/JJJJ-MM-TT-<pruefling>.md`.
3. **Triage.** Jeder Befund wird gegen die Primaerquelle nachgeprueft — Gegenpruefer irren
   in beide Richtungen. Dann bekommt er `Status:` und einen der drei Ausgaenge
   (`Stufe:` / `WIDERLEGT` + `Begruendung:` / `Einzelfall:` + `Klasse:`).
4. **Stufe bauen.** Jeder bestaetigte MAJOR, der eine Klasse ist, wird eine Linter-Stufe,
   und `proben.py` weist nach, dass sie beisst.
5. **Gate.** `pruefstand.py` + `selbstpruefung.py` + `befund_gate.py`. Erst dann Antwort an
   die Bau-Session — als Befund-Tabelle, nicht als Einschaetzung.

### Warum das ohne Schmeichelei auskommt

Drei Mechanismen, keiner davon auf Vertrauen gebaut:

- **Falsifikation statt Bewertung.** Der Auftrag lautet „zeig, wo diese Zusage bricht",
  nie „pruef das mal". Kein Score, kein Vor-Score, „sieht gut aus" ausdruecklich unzulaessig.
- **Der Pruefer schreibt in eine Datei, nicht in einen Bericht.** Der Bericht eines
  Subagenten geht an den Auftraggeber, nicht an Bolle — wer referiert, kann weichspuelen.
  `befunde/` kann er nicht.
- **Der Befund muss einen Ausgang finden.** Das entwaffnet beide Richtungen: Kritik, aus
  der keine rot-werdende Stufe wird, ist ein Verdacht; Lob, aus dem keine gruene Stufe
  wird, zaehlt nicht. `befund_gate.py` erzwingt es — und macht beim **zweiten** Einzelfall
  derselben Klasse ein Maschinen-Ticket daraus.

### Geltungsbereich — der Satz, der nicht wegdefiniert werden darf

Der interne Gegenpruefer gilt fuer **Spur A** (Code, Daten, Maschine, Stufen). Fuer
**Spur B** (Inhalt, Text, Spielbarkeit) ist er ein Vorfilter, kein Gate: dort **ist** die
Reviewer-Meinung das Gate, und die braucht echte Target-Blindheit — den frischen
claude.ai-Tab. Solange Chrome-MCP nicht erreichbar ist, gilt fuer Spur B: `draft` ja,
`main` nein, Stempel `GATE: intern (vorlaeufig)`. „Der Pruefstand war gruen" heisst dann
**nicht** „fertig".

## Kommandos

```bash
python _dev/pruefstand/pruefstand.py                    # alles, Kordon dicht
python _dev/pruefstand/pruefstand.py --gruppe maschine  # Linter + Idempotenz
python _dev/pruefstand/pruefstand.py --gruppe nachweis  # beissen die Stufen? Befunde offen?
python _dev/pruefstand/selbstpruefung.py                # Mutationsnachweis (schnelle Proben)
python _dev/pruefstand/selbstpruefung.py --voll         # auch die mit vollem Linter-Lauf
python _dev/pruefstand/befund_gate.py                   # jeder MAJOR: Stufe, widerlegt oder Einzelfall?
python _dev/pruefstand/kordon.py                        # nur den Kordon scharfschalten + Selbsttest
```

Exit 0 = alles gruen. Exit 1 = mindestens ein Pruefpunkt rot.

## Der Mutationsnachweis — das eigentlich neue Stueck

`validate-all.sh` hat 63 Stufen und meldet 0 FAIL. Das ist nur dann eine gute Nachricht,
wenn die Stufen einen echten Fehler auch sehen wuerden. Gemessen am 02.09.2026:
**5 von 63 Stufen** tragen eine eingebaute `--gegenprobe` (`check-datumsangaben`,
`check-mengen`, `check-quellen`, `check-werbekennzeichnung`, `check-zeitversprechen`).
Fuer die uebrigen 58 war „faengt die Regel einen echt eingebauten Fehler?" bis heute eine
Pflicht, die an Disziplin hing.

`selbstpruefung.py` macht daraus eine Maschine: Arbeitskopie anlegen, dort **eine** Zusage
brechen, das zustaendige Gate laufen lassen, ROT erwarten, zuruecksetzen, wieder GRUEN
erwarten. Vier Ausgaenge, alle ehrlich benannt — `BEISST`, `STUMPF`, `MUTATION-LEER`,
`BASIS-ROT`. **Uebersprungen ist grau, nie gruen.**

Der erste Lauf hat sofort gezeigt, warum der vierte Ausgang noetig ist: zwei von sechs
Proben meldeten `STUMPF` — und beide Male war die **Probe** kaputt, nicht die Stufe. Einmal
lag der Suchtext in der Variante `minimal`, waehrend das Gate nur `standard` liest; einmal
in einem doppelt gequoteten String (Zeile 1855) statt im Template-Literal (Zeile 2094),
wo `${...}` nur Text ist und nichts bricht. Beide Male lief der Mechanismus und sein
Ergebnis kam nie an. Konsequenz im Werkzeug statt im Kopf: eine Probe kann jetzt einen
`anker` und eine `erwartete_treffer`-Zahl verlangen; greift die Mutation woanders oder
anders oft, ist das `MUTATION-LEER` — **kein Beweis in irgendeine Richtung**.

## Der Kordon — was er garantiert und was nicht

Vier Schichten, jede beim Scharfschalten an einem echten Versuch nachgewiesen; jede
Luecke ist ein Abbruch:

| Schicht | Naht | faengt |
|---|---|---|
| 1 | `subprocess.run` / `Popen` | `git push`, `git merge`, `wrangler deploy/publish`, `netlify deploy`, `gh pr merge/release` |
| 2 | Branch-Wache | jeden Lauf auf `main` |
| 3 | `kordon.nur_kopie` | jede Mutation, die ins Repo statt in die Arbeitskopie zielt |
| 4 | `urllib` / `socket` / `asyncio` | jeden Netzzugriff ausser Loopback |

Loopback bleibt frei — sonst kommt auf Windows kein Event-Loop hoch (ProactorEventLoop
baut seine Self-Pipe ueber 127.0.0.1) und der lokale Render-Smoke waere tot.

**Was er nicht kann, benannt statt still:** Was Claude selbst ins Bash-Tool tippt, laeuft
an allen vier Schichten vorbei. Der Kordon schuetzt den **Pruefstand**, nicht die Sitzung.
Und ein Unterprozess wird an seiner Kommandozeile erkannt, nicht an seinem Verhalten.

## Was die Arbeitskopie NICHT messen kann

Die Arbeitskopie enthaelt die versionierten Dateien plus die noch nicht committeten
Pruefstand- und Skript-Dateien, und sie bekommt beim Anlegen ein eigenes `git init`
samt einem Commit. Das war noetig: ohne Git meldet Stufe 9 "0 Dateien geprueft", und
23/40/45 fallen aus Umgebungsgruenden — gemessen am 02.09. beim Konstanten-Auftrag,
vier rote Stufen, die mit der Mutation nichts zu tun hatten. Ein Pruefstand, dessen
Grundrauschen so laut ist, hoert die kleinen Signale nicht mehr.

Der frische Commit hat aber einen Preis, und der steht hier, damit ihn niemand fuer
ein Ergebnis haelt:

| Was | Folge in der Arbeitskopie |
|---|---|
| Git-Historie | jede Datei ist "von heute" — jede Stufe, die gegen `git log` misst, ist dort blind |
| Stufe 67 (Cache-Buster) | meldet in der Kopie 60 Referenzen als veraltet, die es real nicht sind |
| unversionierte Dateien | fehlen (Absicht: gemessen wird, was ausgeliefert wird) |
| `node_modules` | fehlt — Stufe 40 (`maschinen-abnahme.js`) braucht `jsdom` und ist in der Kopie dauerhaft rot. Beim Messen als Grundrauschen abziehen: rot ist nur, was ZUSAETZLICH zur Basis rot wird. |

Eine Probe, die aus so einem Grund nicht laufen kann, bekommt in `proben.py` das Feld
`nicht_beweisbar` mit der Begruendung und wird als **GRAU** gemeldet — nie gruen, nie
rot. Ein unbeweisbarer Fall darf weder wie ein bestandener aussehen noch wie ein
Defekt gezaehlt werden, den es nicht gibt.

## Was von ASKER nicht passt

| ASKER | machsleicht | Konsequenz |
|---|---|---|
| Netz-Kordon, weil die Nebenwirkung im Prozess entsteht (`proactive.send`) | Nebenwirkung entsteht im **Unterprozess** (`git push`, `wrangler deploy`) — genau ASKERs eigener blinder Fleck | Kordon-Schwerpunkt auf Schicht 1, nicht auf dem Netz |
| „Drehbuch": ein feindseliges Modell wird nachgespielt | kein Modell in der Laufzeit; die unfestnagelbare Schicht ist **der Browser und das Kind** | kein Drehbuch portiert — die Invarianten-Matrix in `check-partyseite-render.mjs` (Party-Form × Ansicht × Regel) ist die reifere Antwort und existiert schon |
| Faelle bauen das Backend nach | 63 Stufen + 50 Pruefskripte existieren bereits | der Pruefstand **orchestriert** statt nachzubauen; neu sind nur Mutationsnachweis und Befund-Gate |
| zwei Ausgaenge je MAJOR (Fall / WIDERLEGT) | die Haelfte der Befunde ist Inhalt und nicht mechanisierbar | dritter Ausgang `Einzelfall` — mit Sperre ab dem zweiten Mal derselben Klasse |
| Gegenpruefer scoped auf Code/Test | machsleichts Engpass ist gerade **Inhalt** | zwei Spuren; Spur B bleibt extern gegatet, sichtbar gestempelt statt still abgekuerzt |

## Stand

Stand 02.09.2026, alles gemessen, nichts geschaetzt:

- `selbstpruefung.py`: **16/16 laufbare Proben beissen nachweislich, 1 GRAU** (Stufe 67
  misst gegen die Git-Historie und ist in der frisch initialisierten Arbeitskopie blind —
  Begruendung steht in der Probe, nie als gruen gezaehlt).
- Nachgewiesene Stufen: **11 von 68** (18, 24, 30, 36, 58, 60, 62, 64, 65, 66 + interne
  Notizen) plus **5 Naehte des Kordons**. Die uebrigen 57 sind unbewiesen — grau, nicht gruen.
- `befund_gate.py`: gruen bei 9 Befunden (6 MAJOR, 3 MINOR); Selbsttest 7/7.
- Kordon Fassung 2: **13 Naehte**, Selbsttest bestanden.
- Neu gebaut am 02.09. auf Ping von `machsleicht-36`: Stufe **65** (Listen im Code gegen
  die Platte), **62 Fassung 2** (Allowlist statt Obergrenze), **63** (grau statt gruen bei
  leerer Menge), **66** (Waisen-Generatoren mit Sperrklinke), **67** (Cache-Buster, gelb bis
  die vier bekannten Faelle gefixt sind), **68** (Lese-Stellen ohne Datenquelle, Warnstufe).

### Die erste Gegenpruefung ging gegen den Kordon selbst

Und fand **sechs MAJOR** (`befunde/2026-09-02-kordon.md`): `os.system` umging die
Unterprozess-Sperre, ein zerhacktes Kommando (`g""it p""ush`) den Substring-Vergleich,
DNS und UDP verliessen den Rechner unter Profil `dicht`, `open(repo, "w")` schrieb ins
Repo (`nur_kopie` war eine freiwillige Funktion, kein Haken), Windows-Praefixpfade liefen
daran vorbei — und der Selbsttest meldete zu alldem „bestanden (4 Schichten)". Jeder der
sechs wurde vor dem Fix mit einem eigenen Lauf nachgestellt; keiner war ein Fehlalarm.

Das ist kein Betriebsunfall, sondern der Normalfall, den dieser Aufbau erwartet: die
erste Fassung eines Gates haelt selten, was sie zusagt. Wichtig ist, dass es AUFFAELLT,
bevor jemand sich darauf verlaesst.

### Was der Pruefstand an sich selbst gefunden hat

Vier Defekte in der eigenen Apparatur, alle im Lauf desselben Tages, alle mechanisiert
statt gemerkt:

| Defekt | Folge | Konsequenz im Werkzeug |
|---|---|---|
| Mutation griff an der falschen Stelle | zwei Stufen faelschlich als stumpf gemeldet | `anker` + `erwartete_treffer`, sonst `MUTATION-LEER` |
| Praefix-Kollision `stufe-5` in `stufe-58` | eine unbewiesene Stufe kam durchs Befund-Gate | Ziffern-Grenze, plus siebte Verletzung im Rot-Beleg |
| Arbeitskopie ohne Git | vier Stufen rot aus Umgebungsgruenden | `git init` + Commit beim Anlegen, Grenzen dokumentiert |
| `; _rc=$?` unter `set -e` | der Linter hoerte bei Stufe 63 auf zu messen | `|| _rc=$?`, mit Begruendung im Skript |
