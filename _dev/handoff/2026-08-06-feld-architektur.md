# Feld-Architektur — Ergebnis der 20-Agenten-Aufnahme (06.08.2026)

Erzeugt von Workflow `wf_24c4f2b6-8f8`: 10 Inventar-Agenten (je eine Oberflaeche),
6 Querschnitte (Zeit, Geld, Material, Spiele, Gast, Druck), 3 unabhaengige
Architektur-Entwuerfe, 1 Synthese. Alle read-only.

| Kennzahl | |
|---|---|
| belegte Felder aufgenommen | 1086 |
| Dubletten (handgepflegt, ableitbar) | 60 |
| fehlende Verbindungen | 78 |

**Wie mit diesem Dokument umzugehen ist:** Es ist eine Aufnahme, kein Beschluss.
Die Synthese markiert selbst, was sie nachgemessen hat (checkmark) und was sie aus den
Querschnitten uebernommen hat (kreis). Vor der Umsetzung eines Punktes gilt Stufe 3
des Helfer-Gates: selbst gegen die Primaerquelle pruefen.

**Von Haupt-Claude bereits nachgeprueft und bestaetigt (06.08.):**

- Der Alters-Transportfehler haelt. Kette selbst nachgelesen
  (`kindergeburtstag.html:1635/2913` -> `party-worker.js:340` -> `paket-core.js:80/334`)
  und im Browser gemessen: `ageGroup(null)` und `ageGroup('')` liefern beide `mittel`.
  Der Payload enthaelt kein Gruppenfeld.
- `preparationWeeks` wird in allen fuenf Paketen gerendert — meine fruehere Aussage
  "Preisversprechen sind ein reines Website-Thema" war falsch.
- `signatureRitual.setupSteps` wird gedruckt (`piraten/index.html:392`). Tot ist nur `subtitle`.
- `_dev/scripts/check-zeitplan.mjs` existiert und meldet "134 Varianten geprueft,
  123 ueberziehen ihr Fenster". Meine eigene Nachbau-Messung (100/134) zaehlte eine
  andere Frage und war ueberfluessig.

---

# Eine Wahrheit je Zahl — Architektur-Entscheidung für machsleicht

**Status:** Nichts geschrieben, nichts committet. Alle mit ✔ markierten Angaben habe ich in dieser Sitzung selbst am Code auf `draft` nachgelesen; ○ heißt: aus den drei Querschnitten übernommen und nicht erneut nachgemessen.

**Drei Zahlen aus dem Auftrag stimmen so nicht** (✔ selbst nachgemessen bzw. Gate selbst laufen lassen):
- Nicht „100 von 134 / 142 Spiele", sondern **`node _dev/scripts/check-zeitplan.mjs` → „134 Varianten geprueft, 123 ueberziehen ihr Fenster"**. Größenordnung stimmt, Zahl nicht.
- Die 44 Preisabweichungen stehen **nicht auf den Website-Hubs**, sondern 37× in `preparationWeeks` und 7× in `faq[].a`; `python _dev/scripts/check-preisversprechen.py` → „44 Preisversprechen weichen ab, in 17 von 45 Dateien". Gerendert wird das nur im Planer und im gekauften Paket.
- **`signatureRitual.setupSteps` wird sehr wohl gedruckt** — `paket/piraten/index.html:392` liest es (identisch in den vier anderen Paketen). Totes Feld ist nur `subtitle`.

**Dafür ein Fund, der im Auftrag fehlt und der die Reihenfolge bestimmt** (✔ Kette vollständig nachgelesen): Die Altersgruppe erreicht das Paket nie. `pickAge()` schreibt `state.age`, aber nicht `state.exactAge` (`kindergeburtstag.html:1636`); einziger Schreiber von `exactAge` ist das optionale Feld in `setExactAge()` (`:1419`). Der Payload sendet `age: (state.exactAge || '')` (`:2913`). Der Worker normalisiert `Math.min(Math.max(parseInt('')||0,0),18)||null` → **`null`** (`party-worker.js:340`). Das Paket ruft `ageGroup(null)` → `if(!isFinite(n)) return 'mittel'` (`paket/core/paket-core.js:80`). **Wer die Karte „3–5 Jahre" klickt und kein exaktes Alter tippt — der Normalweg — bekommt im gekauften Paket die `mittel`-Datei.** Damit fallen unter anderem die `klein`-Sicherheitszeilen weg (Verschluckungsgefahr, Reiskörner). Das ist ein Ein-Zeilen-Transportfehler, kein Datenmodellproblem, und es betrifft alle drei verkauften Mottos.

---

## 1. Das Zielbild

**Rückgrat: Entwurf SAUBER** — sein Datenmodell (`activities[]` + `supplies[]` + `needs[]` mit IDs, Varianten als Filter statt als Kopie) ist das einzige der drei, das Bolles Satz „alles matchen mit Feldnamen" wörtlich einlöst.

**Aufgepfropft:**
- von **MINIMAL** die Grenzregel und die Migrationsdisziplin: *über die Grenze Wizard → Worker → Paket geht der **Entscheid**, nie das Ergebnis*, und jeder Schritt hat ein maschinelles Grün-Kriterium, der erste sogar „gerendertes HTML byte-identisch". Außerdem MINIMALs Bilanz-Blick: der Umbau ist netto eine **Löschung**.
- von **RISIKO** die **Reihenfolge** (Sicherheit vor Eleganz), die R1-Kette oben, und den Filter „wo genügt ein Linter statt eines Umbaus".

```
QUELLE — ein Mensch pflegt sie, genau einmal, an genau einem Ort
  Party (Worker-KV):  date, startTime, endTime, ageGroup, place, guestCountPlanned, guests[]
  Entscheid:          plan.ambition (minimal|standard|wow), plan.overrides[]
  Katalog je Datei:   activities[]  id, type(game|ritual|meal|hunt|handover|free), title, emoji,
                                    durationMin, changeoverMin, energy, space, slot, minAge,
                                    ambitionFrom, needs[{supplyId,qty,per}], materialNote,
                                    steps, safetyRule, prepText, tips, ageNotes{3,5,6,8,9,12}
                      supplies[]    id, label, unitPriceEur, packQty, necessity, source,
                                    url, hasAffiliate, note
                      texts{}       Prosa OHNE Zahlen, mit Platzhaltern
  Global:             /data/plan-blocks.json (Default-Dauern), /data/schatzsuche.json stations[].dauer

ABGELEITET — niemand pflegt sie; zwei reine Funktionen in /js/plan-core.js
  plan(katalog, entscheid, fenster) -> rows[], reserve[], budget{freeMin,fits}, warnings[]
  cost(katalog, plan, gaeste)       -> lines[]{qty,sumEur}, sumPflicht, sumOptional, perChild
  describe(plan, cost)              -> {{t.fenster}} {{t.dauer}} {{t.spielzahl}} {{p.standard}} …

  Beide Oberflächen laden dieselbe Datei und rufen dieselben Funktionen.
  Das Paket speichert kein Ergebnis — es rechnet denselben Plan noch einmal.
```

**Die zwei Regeln, die alles tragen:** Eine Zahl mit Rechtsfolge steht genau einmal. Eine Zahl in einem Satz ist ein Platzhalter, nie ein getippter Wert.

**Und eine dritte, die aus R1 folgt:** Ein Feld, das ein Kind schützt, darf nie eine Kopie sein, nie `null` sein dürfen und nie einen stillen Default haben.

### Wo die drei Entwürfe sich widersprechen — meine Entscheidung

| Streitpunkt | MINIMAL | SAUBER | RISIKO | Entschieden |
|---|---|---|---|---|
| 3 Varianten-Vollkopien je Datei auflösen? | nein, bleiben | ja, `ambitionFrom` | ja | **Auflösen** — die 20 innerhalb einer Datei divergierenden `safetyRule`-Fassungen sind nur durch Entfernen der Kopie zu heilen, nicht durch einen Linter. ○ |
| Kante Spiel ↔ Einkaufsposten | ausdrücklich draußen | drin | drin | **Drin** — ohne sie ist Bolles Satz auf der Geldachse unerfüllbar, und der Pool-Nudel-Fall ist ein echter Ausfall beim Kunden. ○ |
| Blockdauern: eigene Config oder typisierte Aktivitäten? | `plan-blocks.json` | `activities[type=…]` | `blocks{}` | **Beides gestaffelt**: Default-Werte in `/data/plan-blocks.json`, Überschreiben je Motto/Alter als `activities[type=…]`. Sonst muss die Redaktion vier Blöcke × 45 Dateien tippen. |
| Optional-Regex ersetzen? | ja, sofort | ja | Linter genügt vorerst | **Ersetzen, aber erst im `supplies`-Schritt** — RISIKO hat recht, dass es heute 0 Divergenzen sind; es fällt ohnehin mit ab. ○ |
| Wann die eine Engine? | Schritt 1 | Schritt 4 | Schritt 7 | **Nach den Sicherheits-Fixes, vor allem Datenmodell** — sie ist die Voraussetzung dafür, dass „Budget entscheidet" überhaupt formulierbar ist. |
| Plan im KV speichern? | nein | nein | nein | **Nein.** Ein gespeicherter Plan wäre die sechste Kopie derselben Wahrheit. |

---

## 2. Feld-Landkarte

Legende: ✔ = in dieser Sitzung selbst am Code geprüft · ○ = aus den Querschnitten übernommen

### A · Zeit und Ablauf

| Feld heute | Beleg | Künftige Quelle | Altes Feld | |
|---|---|---|---|---|
| `state.time` / `state.endTime` | `kindergeburtstag.html:1387-1388` | **Quelle** → `party.startTime/endTime` | bleibt (umbenannt) | ○ |
| `variants[].games[].duration` (558 Zahlen, 97 Strings) | `data/motto/*.json` | **Quelle** → `activities[].durationMin`, nur Zahl | Format-Migration | ○ |
| `_parseDur` / `parseDur` / dritte Fassung im Linter | `html:1982` · `paket-core.js:231` · `check-zeitplan.mjs:20` | entfällt (Typ garantiert) | 3 Kopien löschen | ○ |
| Wechselpuffer `+5`, nur im Paket | `paket-core.js:273-274` ✔ | `activities[].changeoverMin`, Default aus `plan-blocks` | Konstante löschen | ✔ |
| Blockdauern **4×** in Code: Ankommen 15/20/20/15, Kuchen 25/40/30-60/25-30 | `html:1881/1885/1886/1891` ✔ · `paket-core.js:246` ✔ · `html:2092-2099` ○ · `_src/kindergeburtstag.jsx:1413-1432` ○ | `/data/plan-blocks.json` + `activities[type='ritual'\|'meal'\|'handover']` | alle 4 löschen | ✔ |
| `signatureRitual.durationMin` (1× gepflegt, 0 Leser) | `data/motto/dino-gross.json` | `activities[type='ritual'].durationMin` | wird erstmals gelesen | ○ |
| Schatzsuche: Literal `durationMin:30`; im Paket **kein Block** | `html:1885` ✔ · `paket-core.js:239-287` ohne Schatz-Treffer ✔ | `activities[type='hunt'].durationMin` = Σ `stations[gruppe][].dauer` (Summen 31–125 Min) | Literal löschen | ✔ |
| `variants[].timeWindow` (135×, 3 Formate, 1 unparsebar) | einziger Leser `paket/piraten/index.html:221` | `{{t.fenster}}` aus `startTime/endTime` | **löschen** | ○ |
| Dauer-Anteil in `variants[].label` (131×) — beide Renderer schneiden ihn mit `split('—')[0]` weg | `html:2041` · `paket-core.js:216` | `{{t.dauer}}` | Zahl aus Prosa raus | ○ |
| `variants[].headline` (135×, **0 Leser**) | grep 0 Treffer | — | **löschen** | ○ |
| `_planGameCount()` → 3/5/6 | `html:1862`, angewandt `:1869` ✔ | `plan().budget` | **löschen** | ✔ |
| `scale = span/total` (stille Streckung) | `html:1903-1909` ✔ | entfällt, Zeiten laufen monoton | **löschen** | ✔ |
| `planAddGame()` hart `durationMin:15` | `html:1929` | Katalog-Lookup per `id` | Literal löschen | ○ |
| `state.plan.acts[]` + `state.customEntries[]` (zwei Speicher, ein Zweck) | `html:1935` / `:2150` | `party.plan.overrides[]` | zweiter Speicher löschen | ○ |
| Plan-Header „…–HH:MM" (skalierte Zeit + unskalierte Dauer) | `html:1951/1966` | `party.endTime` | entfällt mit `scale` | ○ |
| `.ics`-Fallback `12:00` / Start+3 h | `party-worker.js:2198/2202` | dieselben `plan-blocks`-Defaults | Sonderannahme löschen | ○ |
| `DEMO_PARTY` time/endTime, 5× | 5 Manifeste in `paket/_maschine/manifeste/` | `/data/demo-party.json` | 4 Kopien löschen | ○ |
| 98 Zeitplan-Panels / 581 Zeilen / „N Min."-Prosa | `kindergeburtstag/*-jahre.html` | Build-Artefakt aus `describe()` | Handtabellen löschen | ○ |
| FAQ „30 / 60–90 / 30 / 30" **zweimal in derselben Datei** | `html:46` (JSON-LD) + `html:1138` | ein generierter Satz | zweite Stelle löschen | ○ |
| SEO-Beispielablauf (20/20/45/30/30) | `html:1038-1047` | `plan()` einer Demo-Party | Literale löschen | ○ |
| Alterskarten „Tagesplan 14:00–17:00", während `pickAge` keine Zeit schreibt | `html:1608-1610` vs. `:1635-1649` ✔ | `pickAge` setzt `endTime` aus `plan-blocks.endTimeDefault[age]` | Widerspruch aufgelöst | ✔ |

### B · Spiele und Aktivitäten

| Feld heute | Beleg | Künftige Quelle | Altes Feld | |
|---|---|---|---|---|
| **kein `games[].id`** (Census: 655 Spiele, keins hat id/slug) | `data/motto/*.json` | `activities[].id` — **die zentrale fehlende Kante** | neu | ○ |
| `games[].name` als faktischer Schlüssel; zwei verschiedene Normalisierer | `html:1861` `_cleanGameTitle` (Emoji + Suffix) ✔ vs. `paket-core.js:79` `stripEmojiLabel` (nur Suffix) ○ | `title` + `emoji` getrennt | Normalisierer entfallen | ✔/○ |
| `indoor` / `outdoor` (2 Booleans, Filter nur Website) | `html:1865` ✔ | `space: drinnen\|draussen\|beides` | zusammenführen | ✔ |
| `loudness` — 9 verschiedene Werte im Bestand | `html:1857` ✔, im Paket 0 Leser ○ | `energy: ruhig\|mittel\|laut` | normalisieren | ✔ |
| Array-**Position** als Rolle: Paket „letztes = Finale, erste zwei = vor dem Essen" vs. Website „Präfix `slice(0,target)`" | `paket-core.js:261-265` ✔ vs. `html:1870` ✔ | `activities[].slot: opener\|beliebig\|finale` | Reihenfolge wird bedeutungslos | ✔ |
| 3 Vollkopien je Datei — 655 Einträge für 345 verschiedene (Motto,Name); 184 Namen mehrfach, **35 mit abweichenden Feldern** | data-Census | ein Pool + `ambitionFrom` | Kopien löschen | ○ |
| `safetyRule` je Variante kopiert — **88× `null`, 20 Spiele mit divergentem Text in derselben Datei** | data-Census | am Spiel, `null` verboten, `false` = „geprüft, braucht keine" | Kopien löschen | ○ |
| `ageAdjust3/5/6/8/9/12`; Website-Map liest bei `9-12` die Stufen **8 und 6**, nie 9 oder 12 | `html:1986` ✔ vs. `paket-core.js:49` ✔ | `ageNotes{}` + `ageAdjustFor()` | Map löschen — 221 gepflegte Texte werden erreichbar | ✔ |
| `minAge` (655×, einziger Leser eine Anzeige) | `paket/piraten/index.html:346` | wird Filter statt Deko | bleibt | ○ |
| `MOTTOS[].games` (150) + `js/motto-data.js` + `state.games` | `html:1240-1336`, `:1342-1359` | Katalog | **löschen** | ○ |
| `#sumGames` „5 ausgewählt" vs. Plan-Überschrift „6 Spiele" | `html:985/3006` vs. `:1950/1966` | `plan().games.length` | eine Zahl | ○ |

### C · Material, Geld, Menge

| Feld heute | Beleg | Künftige Quelle | Altes Feld | |
|---|---|---|---|---|
| `shoppingList[]` 3× je Datei (1419 Posten, Keys exakt `emoji,label,url,priceEur,hasAffiliate,category,categoryReasoning`) | data-Census | **eine** `supplies[]` je Datei | entdoppeln | ○ |
| `priceEur` — das einzige Preis-Atom | `html:1998`, `paket/piraten/index.html:289-296` | `unitPriceEur` + `packQty` | bleibt, präzisiert | ○ |
| `games[].material` (Freitext, 655×, Menge+Alternative+Optionalität in einem String) | data-Census | `needs[]{supplyId,qty,per}` + `materialNote` | Freitext wird Notiz | ○ |
| `category` (pflicht 814 / sinnvoll 462 / habIchVielleicht 143) — **kein Live-Leser**, einziger Leser die tote JSX | `_src/kindergeburtstag.jsx:847` | `necessity` + `source: kaufen\|haushalt` | wird endlich gelesen | ○ |
| `_eliteOptional` / `_optional` — Label-Regex an **9 Stellen** (1 Website + 5 Pakete + Template + Linter) | `html:1997` ✔, `paket/piraten/index.html:288` ○, Kommentar `html:1992-1994` nennt selbst „drei Stellen, ein Massstab" | `necessity` | alle Regex-Kopien löschen | ✔/○ |
| Stückzahl als Text im Label (188 von 1419: „12 Stk.", „6er-Set") | data-Census | `needs[].qty` + `packQty` | aus Label raus | ○ |
| `estimatedCostEur` (108 von 135, **0 Live-Renderer**; gelesen nur vom Build-Skript) | grep über `*.html/*.js`: kein Treffer ✔; `_src/generate-age-pages.py:213` liest es ✔ | `cost().sumPflicht` | **löschen**, Build-Skript ruft `cost()` | ✔ |
| `costContext` Kinderzahl per Regex `/(\d+)\s*Kinder/`; in 27 von 45 Dateien schwankt sie zwischen den Varianten derselben Datei | `html:1998` | `party.guestCountPlanned` | Regex löschen | ○ |
| `perChild = sum/guests` — Gästezahl teilt nur, multipliziert nie; Ersatz ist der Textbaustein „Mengen ggf. erhöhen" | `html:1998` / `:2071`; Code-Kommentar `:1987` „qtyRule spaeter" | `lines[].qty = ceil(needs.qty × Gäste ÷ packQty)` | Textbaustein löschen | ○ |
| `cakeRecipe.meta.kosten` — gedruckt, geht in **keine** Σ ein; `meta` ist 39× Objekt / 6× String → `undefined`-Druck | `paket/piraten/index.html:324` | Kuchen als `supplies[]`-Posten | Sonderzahl löschen | ○ |
| `savingsTip` (74×, Eurozahlen in 65) — **nur im Gratis-Planer**, 0 Treffer in `paket/` | `html:2063` | `texts.savingsTip` ohne Zahl + `supplies[].note` | Zahl raus, überall drucken | ○ |
| Preisprosa in `preparationWeeks` (26 Dateien) — liegt auf **Dokument**-Ebene, nennt aber alle drei **Varianten**-Preise | `paket/piraten/index.html:235`, `html:2008/2075` | `{{p.minimal}}` `{{p.standard}}` `{{p.wow}}` | Zahlen löschen | ○ |
| Preisprosa in `faq[].a` (32 Dateien) | `html:2069` | dieselben Platzhalter | Zahlen löschen | ○ |
| SEO „rund 30–95 €, etwa 4–12 € pro Kind" — 53 von 133 Varianten liegen darüber, Maximum 55,5 €/Kind | `html:1090` | min/max über `cost()` | Literal löschen | ○ |
| `€14,90` **zweimal** hartkodiert | `html:1009` + `html:2574` | eine Konstante | zweite Stelle löschen | ○ |

### D · Transport über die Grenze (heute der Hauptbruch)

| Feld heute | Beleg | Künftige Quelle | | |
|---|---|---|---|---|
| `age: (state.exactAge \|\| '')` → Worker `null` → `ageGroup(null)` → **`'mittel'`** | `html:2913` ✔ · `party-worker.js:340` ✔ · `paket-core.js:80` ✔ | `party.ageGroup` als Pflichtfeld, validiert gegen `klein\|mittel\|gross` | **R1** | ✔ |
| `VARIANT='standard'` — die Wizard-Wahl steht nicht im Payload | `paket-core.js:86` ✔ · Payload `html:2912-2920` ○ | `party.plan.ambition` | | ✔ |
| `state.location`, `state.eliteOff`, `state.plan`, `state.guests` überqueren die Grenze nicht | Payload `html:2912-2920` | `party.place`, `party.plan.overrides[]`, `party.guestCountPlanned` | | ○ |

### E · Katalog- und Code-Dubletten

| Heute | Beleg | Morgen | | |
|---|---|---|---|---|
| `WIZ_GAMES` (75) + `GAME_CATALOG`/`GAME_META` (75) + `GAME_META_P/D/F/…` (5×5) — **6 von 25 Paket-Feldern driften bereits** | `html:2658` · `party-worker.js:1039/1048` · `paket/*/index.html:115-117` | `GAME_CATALOG` bleibt Quelle, Build kopiert | Handkopien löschen | ○ |
| `buildTimeline` + `buildPlanActivities` + V1-Fallback + tote JSX + Handkopie im Linter | `paket-core.js:239` ✔ · `html:1863` ✔ · `html:2092-2099` ○ · `check-zeitplan.mjs:22-54` ○ | **ein** `/js/plan-core.js` | 4 Fassungen löschen | ✔ |
| `_src/elite-motto-data/_bundle.js` (3,59 MB, 0 HTML-Einbindungen) | grep `_bundle` über `*.html`: 0 | — | **löschen** | ○ |
| `signatureRitual.subtitle` (39×, 0 Leser) — `setupSteps` dagegen **wird gedruckt** | `paket/piraten/index.html:392` liest `setupSteps`, `subtitle` kommt in der Datei nicht vor ✔ | — | `subtitle` löschen, `setupSteps` bleibt | ✔ |
| `PAKET_MOTTOS = {piraten, dino, feuerwehr}` — `paket/baustelle/` und `paket/meerjungfrau/` sind gebaut, aber unerreichbar | `html:3046-3048` ✔ | — | Beifang, eigenes Ticket | ✔ |

---

## 3. Wer bestimmt die Spielzahl — und was sich ändern muss

**Heute entscheidet sie dreimal, und der Plan ist keines der drei Male beteiligt.**

1. **Die Daten** legen fest, was angeboten wird: `variants[].games[]` trägt 3 (36×), 4 (10×), 5 (36×), 6 (48×), 7 (3×), 8 (1×) und 10 (1×) Spiele. ○
2. **Die Varianten-ID** legt fest, was die Website zeigt: `_planGameCount(variantId)` → `/wow|max/` = 6, `/min/` = 3, sonst 5 (`kindergeburtstag.html:1862`, angewandt `:1869`). ✔ Da die IDs im Bestand exakt `minimal/standard/wow` sind, gilt starr 3/5/6.
3. **Das Zeitfenster** legt es nur im Paket fest, und zwar hinten abschneidend: `need = dur+5 + (essenDone?0:25) + FIN; if(t+need<=endCap) push else reserve.push` (`paket-core.js:273-275`). ✔

Der entscheidende Beweis steht in der Signatur: **`buildPlanActivities(d, v)` nimmt Daten und Variante — keine Zeit.** ✔ (`html:1863`) Weder `state.time` noch `state.endTime` kommen in der Funktion vor; sie liest nur `state.location` (`:1864`). Die Zeit kommt erst danach ins Spiel, und nur als Multiplikator: `scale = span/total`, jeder Block wird gestreckt oder gestaucht (`:1907-1909`). ✔ Zusätzlich steht die Zeit **nicht** im Regenerationsschlüssel `_planKey()` (`:1895`) ✔ — eine Zeitänderung baut den Plan gar nicht neu, sie skaliert ihn.

Folge: Wer von 14:00–16:30 auf 14:00–18:00 verlängert, bekommt dieselben Spiele, weiter auseinandergezogen. Wer auf 14:00–15:00 kürzt, bekommt weiter 6 Spiele auf 54 % gestaucht — Kuchen fällt dann real auf 13,6 Minuten, ohne dass irgendetwas warnt. ○

**Sieben Änderungen, damit der Plan es tut** — in dieser Reihenfolge, jede einzeln unverzichtbar:

| # | Änderung | Warum ohne sie nichts geht |
|---|---|---|
| 1 | `ageGroup` überquert die Grenze | Sonst rechnet das Paket über eine **andere Spielliste** (R1, ✔) |
| 2 | `ambition` überquert die Grenze | Sonst rechnet das Paket immer `standard` (`paket-core.js:86` ✔) |
| 3 | Blockdauern als Daten | „Freie Minuten" ist sonst nicht definierbar — vier Kopien, vier Antworten ✔ |
| 4 | Schatzsuche bekommt echte Minuten (Σ `stations[].dauer`) | Sonst ist das Budget um 31–125 Min falsch ✔ |
| 5 | Wechselpuffer eine Zahl (`changeoverMin`) | Website ist sonst systematisch 5 Min/Spiel optimistischer als Paket ✔ |
| 6 | `_planGameCount` **und** `scale` löschen | Solange gestreckt wird, überschreibt die Streckung jede Budget-Entscheidung ✔ |
| 7 | `ambitionFrom` statt drei Spiellisten | Die Variante wird **Filter**, nicht Anzahl ○ |

**Danach lautet die Regel:**

```
freeMin = (endTime − startTime) − ritual − meal − handover − hunt
n       = größtes k, für das Σ(durationMin_i + changeoverMin_i) ≤ freeMin   (i = 1..k, slot-geordnet)
```

Für das typische 180-Min-Fenster: `endCap` 165, minus Ritual 20, minus Essen 40 = **105 freie Minuten**; bei Median-Spieldauer 20 + 5 Wechselminuten passen **4,2 Spiele**. ○ Die wow-Varianten tragen 6. Das heißt: **Nach dem Umbau druckt der Wizard bei knappem Fenster ehrlich weniger Spiele — und eine Reserve.** Das ist die sichtbarste Konsequenz des ganzen Programms und die einzige, die Bolle vorher freigeben muss.

---

## 4. Migrationsweg

Jeder Schritt ist für sich lauffähig und für sich deploybar. Reihenfolge nach Gefahr, nicht nach Eleganz.

---

**S0 — Gates bauen, nichts umbauen.**
*Ändert sich:* drei neue Linter in `_dev/scripts/`: `check-safety-vollstaendig` (kein `safetyRule: null`; kein abweichender Wortlaut für dasselbe Spiel innerhalb einer Datei), `check-allergen-blatt` (`cakeRecipe.meta` muss Objekt sein), `check-altersfallback` (kein Renderpfad darf eine Altersgruppe raten).
*Kann kaputtgehen:* nichts — keine Produktdatei wird angefasst.
*Woran man es merkt:* alle drei starten **rot** (erwartet ~88 + ~20 + 7 + 1 Treffer ○). Das ist der Zweck: ab hier kann es nicht mehr schlimmer werden.

**S1 — Transport reparieren (R1 + `VARIANT`).** *Der Schritt mit dem besten Schaden/Diff-Verhältnis im ganzen Programm.*
*Ändert sich:* Payload bekommt `ageGroup` und `plan:{ambition, place}` (`html:2913`); Worker whitelistet beides mit derselben Sanitization wie heute `age` (`party-worker.js:340` und PUT `:416`); `paket-core.js:80/86` liest sie bevorzugt. Der `'mittel'`-Default wird zum sichtbaren Hinweis statt zur stillen Annahme.
*Kann kaputtgehen:* Altpartys in KV haben die Felder nicht — deshalb bleibt die `age`-Ableitung als Rückfall, nur greift sie nur noch für sie. Zweites Risiko: der Worker lehnt bei zu strenger Validierung Wizard-Partys ab.
*Woran man es merkt:* Browser-Smoke — Testparty „3–5 Jahre, wow, Park" anlegen, Paket öffnen: es muss die `klein`-Datei und die wow-Variante zeigen. Gegenprobe mit einer vor dem Deploy erzeugten Party: sie darf nicht 500en. Linter: `check-altersfallback` wird grün.

**S2 — `safetyRule` entdoppeln.**
*Ändert sich:* pro (Motto, Altersgruppe, Spielname) **eine** Fassung — die vollständigste, redaktionell entschieden, nicht per Skript gewählt. Die 88 `null` werden gefüllt oder ausdrücklich zu `false` („geprüft, braucht keine Regel"). Der Unterschied zwischen *ungefährlich* und *ungeprüft* muss im Datenmodell existieren.
*Kann kaputtgehen:* Ein Skript, das automatisch die längere Fassung wählt, kann eine bewusst gekürzte Altersanpassung überschreiben — deshalb Handentscheidung.
*Woran man es merkt:* `check-safety-vollstaendig` grün. **Stufe-2-Review Pflicht**, weil es YMYL-Text ist.

**S3 — Allergene und `cakeRecipe.meta` härten.**
*Ändert sich:* `meta` in allen 45 Dateien Objekt; `allergens[]` strukturiert; Typ-Guard im Renderer, damit „⚠️" nie ohne Inhalt gedruckt wird (heute besteht ein String die Prüfung `c.meta?` in `paket/piraten/index.html:324` ○).
*Kann kaputtgehen:* wenig — betrifft heute nur prinzessin/superheld, die kein Paket haben.
*Woran man es merkt:* `check-allergen-blatt` grün. **Vor** Ticket #97 (meerjungfrau-Paket), sonst wandert der Defekt mit.

**S4 — IDs vergeben, rein additiv.**
*Ändert sich:* `activities[].id` (655) und `supplies[].id` (1419) werden geschrieben, nichts entfernt, kein Renderer angefasst.
*Kann kaputtgehen:* Kollidierende oder instabile Slugs.
*Woran man es merkt:* neuer `check-ids.py` (eindeutig je Datei, Slug-Format); **gerendertes HTML byte-identisch zu vorher** — das ist das harte Kriterium, kein Screenshot.

**S5 — Typen härten, mit Fallback.**
*Ändert sich:* `durationMin` als Zahl neben `duration`; `necessity` aus `category`; `space` aus `indoor/outdoor`; `energy` aus den 9 `loudness`-Werten; `changeoverMin`; `guestCountPlanned` aus `costContext`.
*Kann kaputtgehen:* Ein falsch abgeleiteter `energy`-Wert verschiebt die Pacing-Reihenfolge.
*Woran man es merkt:* Zähler im Testlauf — die drei `parseDur`-Fassungen dürfen **null** Mal in den Fallback laufen; Plan-Ausgabe über alle 135 Varianten unverändert.

**S6 — `plan-blocks.json` + Schatzsuche als Aktivität.**
*Ändert sich:* die acht Blockzahlen einmal in Daten; `pickAge()` schreibt künftig `state.endTime` aus `endTimeDefault[age]` und macht damit das Versprechen der Alterskarte (`html:1608-1610` ✔) wahr; `type:'hunt'` mit Σ `stations[].dauer`.
*Kann kaputtgehen:* **Die Reserve wird deutlich größer**, weil die Schatzsuche erstmals echte Minuten belegt (31–125 statt pauschal 30 ○). Das ist die sichtbar werdende Wahrheit, kein Regress — aber es sieht wie einer aus.
*Woran man es merkt:* `grep` findet keine Blockkonstante mehr im Code; Browser-Smoke: Alterskarte und erzeugter Plan nennen dasselbe Fenster; Paket-Ablaufplan enthält die Schatzsuche (heute null Minuten ✔).

**S7 — Eine Engine.**
*Ändert sich:* `/js/plan-core.js` als Extraktion aus `paket-core.js` (alle Modul-Globals `PARTY`/`DATA`/`VARIANT` werden Parameter); `kindergeburtstag.html`, `paket/core/paket-core.js` und `check-zeitplan.mjs` importieren sie. Rechnung zunächst **exakt** die des Pakets.
*Kann kaputtgehen:* Ab hier trifft ein Fehler in einer Datei sofort Wizard, Paket, SEO-Seiten und Linter — der Preis für eine Wahrheit. Das Gate um dieses Modul muss härter sein als alles Bisherige.
*Woran man es merkt:* Diff-Skript über 135 Varianten × 3 Fenster (eigenes `timeWindow`, 150 Min, 180 Min): **0 Divergenzen** alt gegen neu. Danach Browser-Smoke: derselbe Motto/Alter/Variante ergibt im Wizard und im Paket **zeilengleiche Uhrzeiten**.

**S8 — Das Budget entscheidet.** *Erster Schritt mit gewollter Verhaltensänderung.*
*Ändert sich:* `_planGameCount` und `scale` fallen; die Anzahl fällt aus `budget.freeMin`; der Wizard zeigt eine Reserve statt stumm zu stauchen; `planAddGame` liest die echte Dauer.
*Kann kaputtgehen:* Der Kunde sieht bei knappem Fenster **weniger Spiele als bisher**. Das ist eine Produktentscheidung, keine technische — sie gehört vor dem Deploy freigegeben.
*Woran man es merkt:* Browser-Smoke — 14:00–18:00 liefert mehr Spiele als 14:00–16:30 (heute identisch ✔). Linter: `check-zeitplan.mjs` meldet 0 Überzieher, weil Überziehen strukturell unmöglich wird (heute: **123 von 134** ✔). **Stufe-2-Review Pflicht.**

**S9 — `needs[]` verdrahten und `supplies[]` entdoppeln.** *Der teuerste Schritt, reine Handarbeit.*
*Ändert sich:* `needs[]{supplyId,qty,per}` je Spiel; eine `supplies[]` je Datei statt drei; `optional` als Feld statt neunfachem Label-Regex.
*Kann kaputtgehen:* Der Vollständigkeits-Linter produziert Rauschen, weil `material` kein Haushalts-Flag kennt — „Stoppuhr fehlt zu Recht" ist von „Pool-Nudeln fehlen zu Unrecht" ohne gepflegte Ausnahmeliste nicht zu trennen.
*Woran man es merkt:* `check-bedarf.py` — 0 dangling refs; für alle 1419 Posten liefert `optional` denselben Wert wie der alte Regex, und **keine gedruckte Summe ändert sich um einen Cent**. Der Pool-Nudel-Fall (`piraten-mittel/standard` plant „Schwertkampf (Pool-Nudel)", keine der 9 piraten-Listen kauft sie, alle 9 ritter-Listen schon ○) fällt als FAIL an — statt beim Elternteil am Partymorgen.

**S10 — Einkauf aus dem Plan.**
*Ändert sich:* `cost(plan, katalog, guests)` ersetzt `eliteShop(v.shoppingList, …)` und `shShopping()`; Mengen aus `needs.qty × per × Gäste ÷ packQty`.
*Kann kaputtgehen:* Preise ändern sich sichtbar — nach oben, weil Mengen erstmals hochskalieren.
*Woran man es merkt:* Browser-Smoke — ein Spiel aus dem Plan entfernen **senkt** die Summe (heute: 0 € Änderung ○); Gäste 6→12 erhöht Mengen **und** Summe (heute sinkt der ausgewiesene Pro-Kind-Preis ○).

**S11 — Prosa auf Platzhalter, tote Felder löschen.**
*Ändert sich:* `fill(text, ctx)`; ein Skript ersetzt Zahlen **nur dort, wo sie heute mit `cost()`/`plan()` übereinstimmen**, und schreibt die Abweichler (die 44 aus dem Preis-Gate ✔ plus die 13 label/timeWindow-Widersprüche ○) in eine Liste, die ein Mensch einzeln entscheidet — automatisch überschreiben wäre eine stille Inhaltsänderung. Dann löschen: `estimatedCostEur`, `timeWindow`, `headline`, `subtitle`, Dauer im `label`, Zahl im `costContext`.
*Kann kaputtgehen:* Ein Platzhalter an falscher Stelle druckt `{{p.standard}}` ins gekaufte Paket.
*Woran man es merkt:* `check-preisversprechen.py` hat nichts mehr zu prüfen (heute: 44 Abweichungen in 17 von 45 Dateien ✔); `check-kosten-prosa.py` wird gegenstandslos; neuer `check-eine-wahrheit.py` verbietet rohe Euro- und Minutenzahlen in `faq[].a`, `preparationWeeks`, `savingsTip`, `costContext`, `intro` — mit dokumentierter Allowlist für legitime Beratungssätze, im Stil von `OFFENE-REVIEW-PUNKTE.md`.

**S12 — Statische Flächen generieren, tote Pfade löschen.**
*Ändert sich:* `_src/generate-age-pages.py` ruft `plan()` und `cost()` über node und erzeugt die 98 Panels, die 581 Zeilen, den SEO-Ablauf, den doppelten FAQ-Satz. Danach löschen: `_src/kindergeburtstag.jsx`, `_src/elite-motto-data/_bundle.js`, `MOTTOS[].games`, `js/motto-data.js`, `WIZ_GAMES`, `GAME_META_P/D/F`, V1-Fallback.
*Kann kaputtgehen:* Der V1-Fallback ist **kein toter Code** — er ist der Live-Plan für jedes Freitext-Motto (`pickCustomMotto` vergibt `custom-<Date.now()>`, `getElite()` cached den 404 ○). Löschen erst, nachdem `data/motto/custom-{klein,mittel,gross}.json` existiert.
*Woran man es merkt:* Panel-Uhrzeiten = Engine-Uhrzeiten (Diff 0); jedes Panel endet an seinem angekündigten Fensterende (heute: 83 von 98 nicht ○); `grep` findet keine zweite Fassung eines Spielkatalogs mehr; Browser-Smoke auf dem Freitext-Motto-Pfad.

**Reihenfolge-Regel:** S0–S3 sind kleine Diffs mit dem größten Schadensabwehr-Hebel und hängen ausdrücklich **nicht** vom Datenmodell-Umbau ab. Wenn das Programm nach S3 stoppt, ist trotzdem der teuerste Live-Schaden weg. `check-ungelesene-felder.py:27` muss spätestens bei S11 seine INTERN-Whitelist verlieren — sie schirmt heute ausgerechnet `category`, `estimatedCostEur`, `priceEur` und `duration` ab. ○

---

## 5. Was NICHT Teil dieses Umbaus ist

**Redaktionelle Richtigkeit.** Die Engine rechnet, sie prüft nicht. Ein `durationMin: 20`, das real 35 dauert, produziert einen perfekt konsistenten, perfekt falschen Plan. Ein `unitPriceEur: 8`, das im Laden 14 kostet, summiert sich sauber zu einem falschen Gesamtpreis. Das Modell verhindert **Widersprüche**, nicht **Irrtümer** — Stufe 0 und Stufe 2 bleiben unverzichtbar.

**Ob eine Sicherheitsregel fachlich stimmt.** S2 erzwingt *eine* Fassung und verbietet `null`. Ob „Steine min. handtellergroß" die richtige Schwelle ist, entscheidet kein Feld. Das bleibt Primärquellen-Arbeit.

**Die Haushalts-/Kauf-Grenze auf der Bedarfsseite.** `supplies[].category` kennt „habIchVielleicht", `material` hat kein Gegenstück. Ohne ein Flag am Bedarf kann kein Gate „Stoppuhr fehlt zu Recht" von „Pool-Nudeln fehlen zu Unrecht" trennen. Der Linter aus S9 braucht dauerhaft eine gepflegte Ausnahmeliste.

**Dass der Bestand nicht in seine Fenster passt.** 123 von 134 Varianten überziehen ihr eigenes `timeWindow` ✔. Nach S8 wird das sichtbar statt still — es verschwindet nicht. Spiele kürzen oder Fenster ehrlicher schneiden ist redaktionelle Arbeit.

**Die 184 mehrfach abgelegten Spieltexte** außerhalb von `safetyRule`. Ein Linter kann künftig die abweichenden `duration` melden; `material`, `steps`, `prepText`, `indoorTip` bleiben Kopien mit heute 27/21/24/20 Divergenzen ○.

**Datendrift nach dem Kauf.** Weil der Plan bei jedem Aufruf neu abgeleitet wird, ändert eine Redaktionsänderung den bereits gekauften Plan rückwirkend. Ein KV-Snapshot würde das lösen und exakt die Doppelwahrheit wieder einführen, die der Umbau abschafft. Falls es je stört: versionierter Datenstand, kein zweiter Speicher.

**Die redaktionellen Ratgeberseiten.** `kindergeburtstag-kosten.html` deklariert eigene Marktrecherche mit Herkunft und Stand (`:640` ○); `kindergeburtstag-zeitplan.html` hat eigene Altersempfehlungen. Generieren kann man Zahlen, nicht Argumente. Diese Seiten brauchen einen Zahlen-Sweep (bestehendes Ticket #76), keinen Datenmodell-Umbau — nur der **Planer**-Satz, der einen konkurrierenden Rahmen verspricht (`html:1090`), wird generiert.

**Zwei fremde Geldkreise.** `wishes[].price` (`party-worker.js:1495`, vom Gast getippt ○) hat mit der Einkaufsliste sachlich nichts zu tun — eine Kopplung wäre falsch, nicht fehlend.

**Die Einladungsspiele.** `GAME_CATALOG` (75 IDs, `party-worker.js:1039` ○) und die 655 Partyspiele beschreiben verschiedene Dinge. Eine gemeinsame ID wäre eine Scheinverbindung; die Kopien werden per Build-Skript synchron gehalten, nicht per Schema.

**Die Altersdreiteilung.** Ein 6- und ein 8-Jähriger teilen weiter dieselbe `-mittel`-Datei; `ageNotes` mildert das, hebt es nicht auf.

**Beifang, der einzeln erledigt gehört und nicht in dieses Programm gehört:** `PAKET_MOTTOS` kennt `baustelle` und `meerjungfrau` nicht, obwohl beide Pakete gebaut sind ✔ (darunter `baustelle-gross/wow` mit 555 € Pflichtsumme, der höchsten im Bestand ○); `guests[].pickupTime` wird nie gegen `party.endTime` geprüft ○.
