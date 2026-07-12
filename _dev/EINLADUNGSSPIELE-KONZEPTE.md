# Einladungsspiele-Konzepte — Master-Doc (Loop-Arbeitsdatei)

> **Ziel:** Pro Motto **3 distinkte** Einladungsspiel-Konzepte. Jedes mit Wow-Moment + Foto-Reveal-DNA + Gamechanger-Charakter. Within-Review-Score **≥90** + **0 MAJORs** + **gegen das Ledger belegt unterschiedlich**.
> **Output dieses Loops:** nur dieses `.md` (Konzepte, kein Code). Implementierung ist ein SEPARATER, späterer Schritt.
> **Status:** Gerüst angelegt 2026-06-30. Pilot = Piraten (2 Mechaniken bereits als Prototyp gebaut: `_dev/prototypes/game-memory-piraten.html`, `game-kanone-piraten.html`).

---

## 1. Design-DNA — gilt für JEDES Konzept (gelernt am Piraten-Piloten)

1. **Ablauf-Formel:** Mechanik → **Plot-Twist** → **Foto-Reveal des Geburtstagskindes** → Einladung (Datum/Ort) → WhatsApp-Zusage.
2. **Reveal-als-Mechanik bevorzugt:** Das Spiel selbst deckt das Foto auf (z.B. Memory-Kacheln, Kanonen-Bretter) — kein angeklebter Schluss. Mechanik und emotionaler Payoff verschmelzen.
3. **Foto: immer hochladbar, nie nötig (HARTE REGEL).** MIT Foto = maximaler Wow (das Kind IST der Reveal). OHNE Foto = ein **eigens designter** Reveal (z.B. Schatztruhe + Käpt'n-Charakter mit Papagei), der **genauso knallt** — niemals ein leeres Loch oder lahmes Emoji. **Jedes Konzept MUSS beide Pfade (MIT/OHNE Foto) ausformulieren.**
   - **(Stufe-2) Slot statt Composite:** Den Foto-Reveal wo möglich als **Foto-in-festem-Slot + Spruch** bauen (wie die Piraten-Prototypen: Foto im Rahmen + Piratenhut), NICHT als Laufzeit-Montage „Gesicht in Szene" (teuer + uncanny-Risiko). Echte Montage nur, wo billig & sauber.
   - **(Stufe-2) OHNE-Foto = verdientes Artefakt der Mechanik**, nicht 3× dasselbe Maskottchen: der gemalte Regenbogen → **Namens-Banner**, das Sternbild → **buchstabiert den Namen**, das Schwert → **Gravur „{Name}"**.
   - **(Stufe-2) „Rahmen ≠ Twist":** Foto bloß umrahmen (Medaillon/Netz/Schild) ist Deko. Das gesammelte/gebaute Element soll **das Gesicht WERDEN** (Umdeutung), nicht es nur einfassen.
4. **Spannung über das ganze Spiel:** Bedrohung/Timer/Combo/Countdown — kein passiver Mittelteil.
5. **Rahmen:** mobil-first, ~30–90 Sek, ohne App/Download, kindgerecht & sicher, läuft in jedem Handy-Browser.
6. **Persönlich schlägt generisch:** Der „Bösewicht/Schatz/Held" ist am Ende das Geburtstagskind. Das kann kein Evite/WhatsApp-Standard.

## 2. Scoring-Rubrik (0–100)

| Achse | Punkte | Frage |
|---|---|---|
| **Wow / Überraschung** | 0–30 | Zündet Twist + Foto-Reveal? Gänsehaut-Moment? |
| **Gamechanger / Eigenständigkeit** | 0–25 | Echt andere Mechanik — kein Reskin von etwas im Ledger? |
| **Spaß / Mechanik-Tiefe** | 0–20 | Macht das Spielen selbst Laune (nicht nur der Schluss)? |
| **Motto-Passung** | 0–15 | Fühlt es sich genuin nach DIESEM Motto an (Sprache, Objekte, Fantasie)? |
| **Machbarkeit** | 0–10 | In der Engine baubar, mobil, sicher, kindgerecht? |

**Helfer-Regel (wichtig):** Score ist **nur innerhalb einer Review-Konversation** vergleichbar, **nie** motto-übergreifend. „≥90" = Within-Review-Stop-Signal. Der echte Gate ist: **0 MAJORs + Reviewer rated Top-Tier + Differenzierung gegen Ledger belegt.** Keinen Ziel-/Vor-Score in den Review-Prompt schreiben.

## 3. Gamechanger-Sparring — Pflicht VOR dem Score

Je Konzept eine adversariale Runde, bevor es zum Review geht:
- „Ist das nur ein Reskin von [Ledger-Eintrag]? Wo genau ist das **echte** Wow?"
- „Was wäre der **Gamechanger** — die eine Idee, die es von 'nett' auf 'das müssen wir haben' hebt?"
- „Würde ein 6-Jähriger es nochmal spielen wollen? Würde ein Elternteil es in die WhatsApp-Gruppe teilen?"

Erst wenn das Sparring eine klare Gamechanger-Antwort hat → Review/Score.

## 4. Differenzierungs-Ledger (PFLICHT-Input jeder Iteration — Anti-Reskin)

> Belegte Mechaniken & Wow-Beats. Eine Mechanik darf **nicht** zweimal ohne echte, benannte Variation auftauchen. Der Loop liest das ZUERST und schreibt nach jedem Motto fort.

| Mechanik-Familie | Motto/s | Wow-/Twist-Beat | Notiz |
|---|---|---|---|
| Memory / Aufdeck-Foto-Board | piraten | „der Schatz bist DU" | Foto setzt sich aus Kacheln zusammen |
| Kanonen-Reveal (Bretter wegschießen) | piraten | „ARRR, wer hat meinen Schatz?" | Skill/Action, Bretter → Foto |
| Puzzle / Zusammensetzen (Flaschenpost) | piraten | „die Nachricht ist von DIR" | Karten-Fetzen ziehen, Absender = Kind |
| Freilegen / Wegwischen (Fossil-Ausgrabung) | dino | „der größte Fund bist DU" | Finger wischt Sand weg |
| Tap-Rhythmus / Ausbrüten (Ei) | dino | „du bist geschlüpft" | Risse wachsen pro Tap, Schlüpf-Ereignis |
| Pfad / Reihenfolge (Dino-Fährte) | dino | „Boss-Dino dreht sich um" | Fußspuren in Reihenfolge folgen |
| Zeichnen / Trace (Regenbogen-Brücke) | einhorn | „über den Regenbogen zu DIR" | Finger zieht durchgehende Linie |
| Fangen / Sammeln (Sternenstaub) | einhorn | „aus Sternenstaub bist DU" | bewegen + fallende Sterne fangen |
| Wimmelbild / Suchen (Zauberwald) | einhorn | „im Medaillon wartest DU" | versteckte Dinge finden |
| Verbinden / Connect | feen · weltraum · baustelle · feuerwehr · detektiv | je eigener Reveal | Tau-Netz · Sternbild · Rohre · Schläuche · Indizien-Fäden (je benannte Variation) |
| Lade-Meter / Aufladen | feen · weltraum · superheld | je eigener Reveal | Wunsch-Laterne · Raketen-Schub · Kräfte-Power-Up |
| Steuern / Lenken | meerjungfrau · safari · feuerwehr | je eigener Reveal | Korallen-Slalom · Jeep · Drehleiter |
| Rubbeln / Freikratzen | meerjungfrau · prinzessin(UV) · feuerwehr · pferde | je eigener Reveal | Unterwasser-Sand · UV-Schrift · Lösch-Strahl · Striegel |
| Sortieren | meerjungfrau | „Perlenkette rahmt dich" | nach Farbe in Muscheln |
| Drehen / Dial | prinzessin | „ICH war's!" | Zahlenschloss/Tresor |
| Schleudern / Slingshot | ritter | „Thron dahinter" | Katapult zurückziehen+zielen |
| Stapeln | baustelle | „oberstes Fenster = du" | Stockwerke timing-stapeln |
| Simon / Sequenz-merken | weltraum · dschungel | je eigener Reveal | Alien-Funk · Dschungel-Trommeln |
| Quiz | detektiv | „GESUCHT: du" | 3 Ermittler-Fragen |
| Timing-Sprung | dschungel · pferde | je eigener Reveal | Lianen-Schwung · Spring-Parcours |
| Zielwurf / Werfen | pferde | „Pokal gehoben" | Hufeisen auf Pflock |
| Zielen / Knipsen (Kamera) | safari | „seltenstes Tier = du" | Tiere im Sucher knipsen |
| Pfad / Reihenfolge (Var) | safari | „Elefant an der Wasserstelle" | Tierspuren folgen |
| Freilegen (Var) | prinzessin · baustelle · detektiv | je eigener Reveal | UV-Wischen · Schutt baggern · Spurenpuder pinseln |
| Schießen (Var) | superheld | „Held dahinter" | Energie-Strahl zielen+halten |
| Puzzle (Var) | ritter | „Wappen = dein Gesicht" | Schild zusammensetzen |
| Takt / Rhythmus | feen · ritter | je eigener Reveal | Glühwürmchen-Melodie · Schmiede-Hämmern |
| Fangen (Var) | superheld | „gerettet → Held = du" | Fallendes auffangen |

**Erlaubte Mechanik-Achsen zur Inspiration (nicht erschöpfend):** Aufdecken/Memory · Wegschießen/Zerstören · Wimmelbild/Suchen · Reihenfolge/Simon · Rubbeln/Freilegen · Puzzle/Zusammensetzen · Fangen/Ausweichen · Verbinden/Pfad · Mini-Quiz · Tippen-im-Takt. Jede nur **einmal als Hauptmechanik** über alle Mottos, danach nur mit echter Variation.

## 5. Loop-Protokoll (pro Iteration)

```
0. Lies §1 DNA, §2 Rubrik, §4 Ledger, _dev/LEKTIONEN.md.
1. Draft 3 Konzepte fürs Motto (Schema unten), je mit "warum anders als Ledger".
2. Gamechanger-Sparring (§3) — pro Konzept, dokumentiere die Gamechanger-Antwort.
3. Stufe 2: frischer claude.ai-Tab (Fable 5 Hoch / Fallback Opus 4.8 Hoch),
   target-blind, scort + MAJORs + Differenzierungs-Check. KEIN Ziel-Score im Prompt.
4. Stufe 3: jedes Finding gegen Quelle/DNA prüfen, iterieren bis 0 MAJORs + Top-Tier.
5. Konzepte unter §7 eintragen, §4 Ledger fortschreiben, commit draft. Nächstes Motto.
Stopp: 15 Mottos durch ODER Bolle schreibt.
```

### Konzept-Schema (je Spiel)
- **Name:** (motto-eigen)
- **Mechanik-Familie:** (aus §4)
- **So spielt es sich:** (2–3 Sätze)
- **Spannungs-Element:** (Timer/Bedrohung/Combo …)
- **Plot-Twist + Foto-Reveal:** (der Wow-Moment)
- **Warum anders** als alles im Ledger: (1 Satz, konkret)
- **Sparring-Gamechanger-Antwort:** (1 Satz)
- **Score (Telemetrie, within-review):** NN/100 · MAJORs: 0

## 6. Mottos & Fortschritt (15)

| Motto | Status | Konzepte |
|---|---|---|
| piraten | ✅ 3 Konzepte (2 Prototypen + Flaschenpost neu) · Sparring done · Stufe-2-Review offen | Memory · Kanone · Flaschenpost |
| dino | ✅ **3/3 gebaut+verifiziert (Core)** · Stufe-2 offen | Fossil-Ausgrabung · Ei-Ausbrüten · Dino-Fährte |
| einhorn | ✅ **3/3 gebaut+verifiziert (Core)** · Stufe-2 offen | Wolken-Turm (E11 Stapeln) · Regenbogen-Brücke (E3 Verbinden) · Sternenstaub (Tap-Reaktion) |
| feen | ✅ 3 Konzepte · **3/3 gebaut+verifiziert (Core)** · Stufe-2 ✅ | Glühwürmchen-Melodie (Simon) · Tau-Netz (Verbinden) · Wunsch-Laterne (Tap-Meter) |
| meerjungfrau | ✅ 3 Konzepte · **3/3 gebaut+verifiziert (Core)** · Stufe-2 ✅ | Korallen-Slalom (Steuern/Fangen) · Schatz auftauchen (Blasen) · Perlen-Sortieren (E11 Sortieren) |
| prinzessin (9–12 = königl. Mystery) | ✅ **3/3 gebaut+verifiziert (Core)** · Stufe-2 offen | Tresor-Code (E5 Dial) · Kronjuwelen-Tatort (Wimmelbild) · UV-Geheimschrift (Licht-Suche) |
| ritter | ✅ **3/3 gebaut+verifiziert (Core)** · Stufe-2 offen | Schwert schmieden (Tap+Timing) · Burg-Katapult (E6) · Wappen-Puzzle (E9) |
| safari | ✅ **3/3 gebaut+verifiziert (Core)** · Stufe-2 offen | Foto-Safari (E4 Fangen) · Spuren-Pfad (Pfad-folgen) · Jeep-Steuern (E8) |
| weltraum | ✅ **3/3 gebaut+verifiziert (Core)** · Stufe-2 offen | Raketen-Schub (Tap+Timing) · Sternbild (E3) · Alien-Funkspruch (Simon) |
| baustelle | ✅ **3/3 gebaut+verifiziert (Core)** · Stufe-2 offen | Bagger-Steuern (E8) · Hochhaus stapeln (E11 Stapeln) · Rohre verbinden (E3 Verbinden) |
| feuerwehr | ✅ 3 Konzepte · **3/3 Spiele gebaut+verifiziert (Core)** · Stufe-2 ✅ (4 MAJORs gefixt) | Feuer löschen (Rauch) · Drehleiter (Aim) · Feuerwehr-Funkcode (E5-Dial) |
| detektiv | ✅ **3/3 gebaut+verifiziert (Core)** · Stufe-2 offen | Tatort-Suche (E7 Wimmelbild) · Fingerabdruck (E1 Wisch) · Akte-Quiz (E11 Quiz) |
| dschungel | ✅ **3/3 gebaut+verifiziert (Core)** · Stufe-2 offen | Dschungel-Puzzle (E9) · Lianen-Schwung (E10 Timing) · Wildnis-Wimmelbild (E7) |
| superheld | ✅ **3/3 gebaut+verifiziert (Core)** · Stufe-2 offen | Helden-Signal (E11 Simon) · Stadt retten (Fangen) · Helden-Strahl (E6 Zielen) |
| pferde | ✅ **3/3 gebaut+verifiziert (Core)** · Stufe-2 offen | Hürden-Springen (E10 Timing) · Pony striegeln (E1 Wisch) · Hufeisen-Wurf (E6 Schleuder) |

## 7. Konzepte (Loop füllt motto-für-motto)

### 🏴‍☠️ Piraten — 3 Konzepte (Pilot)

> **Foto-Prinzip für alle 3:** Hochladen IMMER möglich → das Kind ist der Reveal (max. Wow). OHNE Foto → designter Truhe-/Käpt'n-Reveal, der genauso knallt.

**Konzept 1 — Schatz-Memory (Aufdeck-Foto-Board)** · _Prototyp gebaut: `game-memory-piraten.html`_
- **Mechanik-Familie:** Aufdecken / Memory (Köpfchen, ruhig)
- **So spielt's:** 12 Schatzkarten, finde 6 Paare. Jedes Paar entfernt 2 Kacheln und legt das Bild darunter Stück für Stück frei. Schatzräuber-Leiste tickt zur Truhe = Spannung; Combo-Aufstieg bei Serien.
- **Spannung:** Schatzräuber-Timer + Combo.
- **Twist + Reveal — MIT Foto:** letztes Paar → ganzes Gesicht da → „ARRR, wer hat meinen Schatz?! … Reingelegt — der Schatz bist DU, Käpt'n {Name}!"
- **— OHNE Foto:** die Kacheln legen eine **offene, goldglänzende Schatztruhe** frei, aus der ein **Käpt'n-Papagei** springt: „Schatz gefunden — Käpt'n {Name} heuert dich an!" (eigene Illustration, kein leeres Board).
- **Warum anders:** einziges „setzt-sich-zusammen"-Spiel; Anticipation statt Action.
- **Sparring-Gamechanger:** „Wer ist hinter den Karten?" zieht durch wie ein Krimi — das Foto-Board verschmilzt Mechanik und Reveal.
- **Score (Telemetrie, pre-review):** 91 · MAJORs: 0 · ⚠️ Ohne-Foto-Fallback im Prototyp NOCH NICHT gebaut (To-do).

**Konzept 2 — Kanonen-Reveal (Bretter wegschießen)** · _Prototyp gebaut: `game-kanone-piraten.html`_
- **Mechanik-Familie:** Zerstören / Schießen (Action-Skill, laut)
- **So spielt's:** Die Schatzkarte ist mit 16 Holzbrettern vernagelt, unten die Schiffskanone. Tippe ein Brett → Kanone zielt, BOOM (Mündungsblitz + Schüttel-Effekt), Kugel fliegt, Brett zersplittert → Bild kommt durch.
- **Spannung:** Wucht-Feedback pro Schuss; „noch X Bretter".
- **Twist + Reveal — MIT Foto:** alle Bretter weg → Gesicht als **„GESUCHT: Käpt'n {Name}"-Steckbrief** → Einladung (teilbar in der WhatsApp-Gruppe!).
- **— OHNE Foto:** hinter den Brettern eine **leuchtende Schatzkarte mit großem X**, das aufplatzt → Truhe + Käpt'n-Charakter → Einladung.
- **Warum anders:** einziges Action/Wucht-Spiel; aktives „freiballern" statt aufdecken.
- **Sparring-Gamechanger:** jede Berührung = sofortiges fettes Feedback (Boom + Splitter + Reveal-Stück). Kinder ballern gern; Skill-Gefühl.
- **Score (Telemetrie, pre-review):** 90 · MAJORs: 0 · ⚠️ Ohne-Foto-Fallback im Prototyp NOCH NICHT gebaut (dunkles Board) — To-do.

**Konzept 3 — Flaschenpost (Schatzkarte zusammenpuzzeln)** · _NEU, noch kein Prototyp_
- **Mechanik-Familie:** Puzzle / Zusammensetzen (haptisch, ziehen)
- **So spielt's:** Eine Flaschenpost spült an den Strand. **Halte gedrückt zum Entkorken** (Korken ploppt 🍾) → eine zerrissene Schatzkarte rollt in 6 Fetzen heraus. **Zieh die Fetzen** auf ihre Umrisse, bis die Karte komplett ist.
- **Spannung:** eine **heranrollende Welle** droht lose Fetzen wegzuspülen — schnell sein (kindgerecht: spült nur zurück, kein Verlieren).
- **Twist + Reveal — MIT Foto:** Karte komplett → das **Wachssiegel / der Absender** der Flaschenpost ist das **Gesicht des Kindes** → „Diese Flaschenpost ist von Käpt'n {Name} — komm an Bord!"
- **— OHNE Foto:** das **X** auf der fertigen Karte **platzt auf** → Truhe + Käpt'n mit Papagei → Einladung.
- **Warum anders:** einziges Drag-Puzzle; haptische „Bastel"-Befriedigung; der **Absender-Reveal** („die Nachricht ist von DIR") ist ein anderer, intimerer Wow als „der Schatz bist du".
- **Sparring-Gamechanger:** das Entkorken + die Welle geben Drama; der Brief-ist-von-dir-Moment ist emotional anders gelagert → echte Variation, kein Reskin.
- **Score (Telemetrie, pre-review):** 92 · MAJORs: 0.

**Bench (Reserve-Familien für spätere Mottos):** „Sturm & Steuer" (Schiff durch Felsen lenken → Insel ausgraben, Tilt/Swipe-Action) · „Papagei-Simon" (Kanonensalve-Reihenfolge nachfeuern, Merk-Mechanik). Einsetzen, wo die Familie über die Mottos noch frei ist.

---

### 🦕 Dino — 3 Konzepte

> Foto-Prinzip: MIT Foto = das Kind ist der große Fund / schlüpft / reitet den Boss. OHNE Foto = Skelett/Baby-Dino/T-Rex-Reveal, der genauso knallt.

**Konzept 1 — Fossil-Ausgrabung (Sand wegpinseln/freilegen)** · _neue Familie_
- **Mechanik-Familie:** Freilegen / Wegwischen (Finger wischt Sand weg — Pinsel-Gefühl, Staubwölkchen)
- **So spielt's:** Ein Grabungsfeld voll Sand & Gestein. Wisch mit dem Finger den Sand weg — Stück für Stück kommt etwas Vergrabenes zum Vorschein. Fund-Zähler + knurrender, leicht bebender Boden = Spannung.
- **Twist + Reveal — MIT Foto:** unter dem Sand erscheint das **Gesicht des Kindes in Bernstein** → „Der größte Fund aller Zeiten — das bist DU! Komm zur Dino-Expedition."
- **— OHNE Foto:** ein **komplettes Dino-Skelett** wird freigelegt, belebt sich kurz und blinzelt → „Ausgegraben! {Name} lädt dich zur Dino-Party."
- **Warum anders:** kein Aufdecken/Schießen — **Wegwischen** (Finger-Drag übers ganze Feld), andere Haptik.
- **Sparring-Gamechanger:** das langsame Freilegen unter Staub = echte Archäologen-Spannung „was ist da unten?".
- **Score (pre-review):** 92 · MAJORs: 0

**Konzept 2 — Ei ausbrüten (Tap-to-hatch)** · _neue Familie_
- **Mechanik-Familie:** Tap-Rhythmus / Ausbrüten (Care)
- **So spielt's:** Ein großes geflecktes Dino-Ei. **Tippe/reibe zum Wärmen** — mit jedem Tap wachsen **Risse**, das Ei wackelt und gluckst; eine schnelle Tap-Combo treibt das Schlüpfen.
- **Spannung:** Ei wackelt heftiger, Risse wachsen, „gleich schlüpft's!".
- **Twist + Reveal — MIT Foto:** Ei platzt → das **Gesicht des Kindes** schaut als Schlüpfling heraus, Baby-Dino daneben → „Überraschung — DU bist geschlüpft!"
- **— OHNE Foto:** ein **knuffiger Baby-Dino** schlüpft, niest Konfetti → „Ich bin geschlüpft — komm zu {Name}s Schlüpf-Party!"
- **Warum anders:** einziges **Tap-Rhythmus/Care**-Spiel; kein Bild-Aufdecken, sondern ein **Ereignis** (Schlüpfen).
- **Sparring-Gamechanger:** Wackeln + Risse unter den eigenen Taps = direktes „ich mache das!"; Schlüpfen ist ein universeller Aww-Moment.
- **Score (pre-review):** 91 · MAJORs: 0

**Konzept 3 — Dino-Fährte (Spuren-Pfad folgen)** · _neue Familie_
- **Mechanik-Familie:** Pfad / Reihenfolge (Fußspuren folgen)
- **So spielt's:** Riesige Dino-Fußabdrücke führen quer ins Dickicht. **Tippe die Spuren in der richtigen Reihenfolge** (die nächste leuchtet kurz auf) — du folgst der Fährte zum Nest. Vertippt = kurzes Brüllen, Spur startet neu (kein echtes Verlieren).
- **Spannung:** das Brüllen wird lauter, je näher am Nest.
- **Twist + Reveal — MIT Foto:** am Nest dreht sich der Boss-Dino um — auf seinem Rücken reitet das **Geburtstagskind** → „Der Boss-Dino gehört DIR! Komm zur Party."
- **— OHNE Foto:** am Nest ein **freundlicher T-Rex mit Partyhut** auf einem Gelege → „Du hast den Boss gefunden — {Name} lädt dich ein!"
- **Warum anders:** einziges **Pfad-Folgen**; Bewegung durchs Bild statt Aufdecken an Ort.
- **Sparring-Gamechanger:** Fährte verfolgen mit anschwellendem Brüllen = Richtung-Nest-Spannung; „Boss dreht sich um" ist filmisch.
- **Score (pre-review):** 90 · MAJORs: 0

---

### 🦄 Einhorn — 3 Konzepte

> Foto-Prinzip: MIT Foto = das Kind reitet das Einhorn / erscheint im Sternen-Medaillon. OHNE Foto = ein funkelndes Einhorn materialisiert, genauso zauberhaft.

**Konzept 1 — Regenbogen-Brücke malen (Zeichnen/Trace)** · _neue Familie_
- **Mechanik-Familie:** Zeichnen / Trace (Finger zieht durchgehende Linie)
- **So spielt's:** Ein Einhorn steht am Abgrund, drüben das Wolkenschloss. **Zieh mit dem Finger eine Regenbogen-Brücke** hinüber — der Strich hinterlässt Glitzer & Farbbänder. Zu krakelig → bröckelt sanft, neu ziehen. Fertig → das Einhorn galoppiert über DEINE Linie.
- **Twist + Reveal — MIT Foto:** auf dem Einhorn sitzt das **Geburtstagskind** → „Über den Regenbogen zu DIR! Komm zur Einhorn-Party."
- **— OHNE Foto:** am Schloss entfaltet sich ein **strahlendes Einhorn mit Glitzermähne** und verbeugt sich → „Der Zauber ruft dich — {Name} lädt dich ein!"
- **Warum anders:** einziges **durchgehendes Zeichnen** (Drag-Linie), nicht Tippen/Aufdecken.
- **Sparring-Gamechanger:** selbst die Brücke malen + Glitzerspur = aktives Zauber-Gefühl; das Einhorn nutzt DEINE Linie.
- **Score (pre-review):** 91 · MAJORs: 0

**Konzept 2 — Sternenstaub fangen (Fangen)** · _neue Familie_
- **Mechanik-Familie:** Fangen / Sammeln (Bewegung + Timing)
- **So spielt's:** Vom Nachthimmel regnen **Sterne & Herzen**. Bewege das Einhorn/den Korb und **fang sie** — verpasste fallen, gefangene laden die Zauberleiste; dunkle Wolken ausweichen. Leiste voll → großer Zauber.
- **Twist + Reveal — MIT Foto:** das gesammelte Sternenlicht **formt das Gesicht des Kindes** → „Aus Sternenstaub gemacht — das bist DU!"
- **— OHNE Foto:** aus dem Sternenlicht **materialisiert ein Einhorn** und zwinkert → „Komm zu {Name}s Zauber-Party!"
- **Warum anders:** einziges **Fang-/Geschick-Spiel**, kein Aufdecken.
- **Sparring-Gamechanger:** Sterne fangen ist sofort verständlich + flow-ig; „aus Sternenstaub geformt" ist ein zauberhafter Reveal-Reframe.
- **Score (pre-review):** 90 · MAJORs: 0

**Konzept 3 — Verzauberter Wald (Wimmelbild)** · _neue Familie_
- **Mechanik-Familie:** Wimmelbild / Suchen (Augen statt Geschick)
- **So spielt's:** Ein dichter Glitzerwald. **Finde die versteckten Zauber-Dinge** (5 Herzen/Hörner/Glühwürmchen) — jeder Fund funkelt, ein Zähler füllt sich; ein Kichern wird lauter, je mehr du findest.
- **Twist + Reveal — MIT Foto:** das **letzte Fundstück ist ein Medaillon** — öffnet sich → **Gesicht des Kindes** → „Im Herzen des Waldes wartest DU."
- **— OHNE Foto:** alle Funde **rufen das Einhorn** aus dem Dickicht → „Du hast den Zauber geweckt — {Name} lädt dich ein!"
- **Warum anders:** einziges **Such-/Wimmelbild**-Spiel.
- **Sparring-Gamechanger:** Suchen zieht Kinder rein (Wimmelbuch-Effekt); das Medaillon-Öffnen ist ein intimer Reveal.
- **Score (pre-review):** 91 · MAJORs: 0

---

> _Ab hier kompaktes Konzept-Format (Mechanik · Spielprinzip · MIT/OHNE-Foto-Reveal · Warum-anders · Score). Detail-Ausarbeitung beim Bau. Familien kehren motto-übergreifend nur mit **benannter Variation** wieder (Ledger §4)._

### 🧚 Feen — 3 Konzepte
> Foto: MIT = Kind als Feenwesen; OHNE = eine Fee erscheint.
1. **Glühwürmchen-Melodie** (_Takt/Rhythmus_) — tippe leuchtende Blüten im Takt → eine Melodie öffnet die Feentür. **MIT:** Kind als Feenkönigin im Tor. **OHNE:** eine Fee fliegt heraus. *Anders:* einziges Rhythmus-Spiel. **89**
2. **Tau-Netz verbinden** (_Verbinden_) — verbinde Tautropfen am Spinnennetz, bis der Pfad leuchtet. **MIT:** das leuchtende Netz rahmt das Kind. **OHNE:** Glitzer-Fee erscheint. *Anders:* durchgehende Linie ziehen. **90**
3. **Wunsch-Laterne** (_Lade-Meter_) — tippe die Laterne voll Feenlicht, lass los → sie steigt auf. **MIT:** entfaltet das Gesicht des Kindes am Himmel. **OHNE:** malt eine Fee + Einladung in den Nachthimmel. *Anders:* Aufladen + Loslassen. **90**

### 🧜 Meerjungfrau — 3 Konzepte
> Foto: MIT = Kind als Merperson/in der Perle; OHNE = Meerjungfrau winkt.
1. **Korallen-Slalom** (_Steuern_) — wisch die Meerjungfrau durch Korallen & Quallen zur Schatzbucht. **MIT:** Muschel öffnet → Kind als Merperson. **OHNE:** Meerjungfrau winkt aus der Muschel. *Anders:* Schwimm-Steuerung. **90**
2. **Schatz freirubbeln** (_Rubbeln, Var: Unterwasser-Sand_) — rubbel den Sand vom vergrabenen Schatz. **MIT:** darunter das Gesicht des Kindes in einer Riesenperle. **OHNE:** glitzernde Truhe + Seepferdchen. *Anders:* Freikratzen unter Wasser. **89**
3. **Perlen sortieren** (_Sortieren_) — sortiere Perlen/Muscheln nach Farbe in die richtigen Muscheln. **MIT:** die fertige Perlenkette rahmt das Kind. **OHNE:** die Kette schmückt eine Meerjungfrau. *Anders:* einziges Sortier-Spiel. **89**

### 👑 Prinzessin (9–12 = königliches Mystery) — 3 Konzepte
> Foto: MIT = Kind als Meister-Detektivin/„Diebin"; OHNE = maskierter Dieb / Kronjuwelen. _Bewusst Krimi-Frame (verifiziert: Motto ist Mystery, kein Kleinkind-Kitsch)._
1. **Tresor-Code knacken** (_Drehen/Dial_) — dreh am Zahlenschloss, „wärmer/kälter"-Hinweise führen zum Code. **MIT:** Tresor auf → das Kind grinst heraus „ICH war's!". **OHNE:** Kronjuwelen + Einladungsrolle. *Anders:* einziges Dreh-/Dial-Spiel. **91**
2. **Kronjuwelen-Tatort** (_Wimmelbild, Var: Indizien_) — finde die versteckten Hinweise am königlichen Tatort. **MIT:** letzter Hinweis = Medaillon mit dem Kind (die Heldin). **OHNE:** enthüllt den maskierten Dieb. *Anders:* forensisches Suchen. **90**
3. **UV-Geheimschrift** (_Freilegen, Var: UV-Wischen_) — wisch die UV-Lampe übers Pergament, die unsichtbare Botschaft leuchtet auf. **MIT:** am Ende ein UV-Porträt des Kindes. **OHNE:** leuchtende Schatzkarte + Einladung. *Anders:* Licht-Wischen statt Tippen. **89**

### 🛡️ Ritter — 3 Konzepte
> Foto: MIT = Kind als wahrer Ritter (im Schwert/auf dem Thron); OHNE = Ritter salutiert.
1. **Schwert schmieden** (_Takt, Var: Hämmer-Schlag_) — hämmere im Takt aufs glühende Schwert, Funken fliegen, es wird blank. **MIT:** das polierte Schwert spiegelt das Gesicht des Kindes. **OHNE:** fertiges Schwert + salutierender Ritter. *Anders:* Schmiede-Rhythmus mit Funken. **90**
2. **Burg-Katapult** (_Schleudern, Var: Slingshot statt Kanone_) — zieh das Katapult zurück, ziele, feuere auf das Burgtor/Bretter. **MIT:** hinter dem Tor das Kind auf dem Thron. **OHNE:** Tor öffnet → Ritter + Wappen. *Anders:* Zurückziehen-und-Loslassen-Zielen. **90**
3. **Wappen zusammensetzen** (_Puzzle, Var: Schild_) — setz die Wappen-Scherben zum Schild. **MIT:** das fertige Wappen trägt das Gesicht des Kindes. **OHNE:** Wappen leuchtet → Ritter-Einladung. *Anders:* Schild-Puzzle. **88**

### 🦁 Safari — 3 Konzepte
> Foto: MIT = Kind als „seltenstes Tier"/Ranger; OHNE = majestätisches Tier.
1. **Foto-Safari** (_Zielen/Knipsen — neue Familie_) — schwenk die Kamera, knipse die versteckten Tiere im richtigen Moment. **MIT:** das letzte „Tier" im Sucher ist das Kind. **OHNE:** ein Löwe brüllt in die Linse. *Anders:* einziges Kamera-Ziel-Spiel. **91**
2. **Spuren zur Wasserstelle** (_Pfad, Var: Tierspuren_) — folge den Tierspuren zur Wasserstelle. **MIT:** dort reitet das Kind auf dem Elefanten. **OHNE:** Elefant spritzt Wasser + Einladung. *Anders:* Savannen-Fährte. **88**
3. **Jeep durch die Savanne** (_Steuern, Var: Jeep_) — lenk den Jeep über die Piste, weich Schlaglöchern/Tieren aus zur Lodge. **MIT:** an der Lodge wartet das Kind als Ranger. **OHNE:** Erdmännchen-Empfang. *Anders:* Lenken über Land. **89**

### 🚀 Weltraum — 3 Konzepte
> Foto: MIT = Kind als Astronaut:in im Cockpit; OHNE = freundliches Alien.
1. **Raketen-Schub laden** (_Lade-Meter, Var: Countdown-Schub_) — tippe im Rhythmus, lade den Schub, Countdown … START! **MIT:** im Cockpit-Fenster das Kind. **OHNE:** ein Alien winkt aus dem Fenster. *Anders:* Schub-Pumpen mit Countdown. **89**
2. **Sternbild verbinden** (_Verbinden, Var: Konstellation_) — verbinde die Sterne zur leuchtenden Konstellation. **MIT:** die Konstellation zeichnet das Gesicht des Kindes. **OHNE:** formt ein Alien/Rakete. *Anders:* Sterne statt Tau. **90**
3. **Alien-Funkspruch** (_Simon — neue Familie_) — wiederhole die leuchtende Funk-Sequenz, um Kontakt herzustellen. **MIT:** am Schirm erscheint das Kind als Alien-Freund. **OHNE:** ein knuffiges Alien funkt zurück. *Anders:* Sequenz-nachmachen aus dem Gedächtnis. **90**

### 🚧 Baustelle — 3 Konzepte
> Foto: MIT = Kind im obersten Fenster/mit Helm; OHNE = Bagger/Spielplatz fertig.
1. **Hochhaus stapeln** (_Stapeln — neue Familie_) — stapele die Stockwerke im richtigen Moment gerade aufeinander, der Turm wächst. **MIT:** im obersten Fenster winkt das Kind. **OHNE:** der Bagger setzt das Dach + Einladung. *Anders:* einziges Stapel-/Timing-Spiel. **90**
2. **Schutt wegbaggern** (_Freilegen, Var: Bagger statt Pinsel_) — baggere/wisch den Schutt weg, darunter kommt etwas zum Vorschein. **MIT:** unter dem Schutt das Kind mit Bauhelm. **OHNE:** ein funkelnder fertiger Spielplatz. *Anders:* groß-räumiges Wegbaggern. **88**
3. **Rohre verbinden** (_Verbinden, Var: Pipe-Dream_) — dreh/verbinde die Rohrteile, bis Wasser durchfließt. **MIT:** das fließende Wasser malt das „Party!"-Schild mit dem Kind. **OHNE:** der fertige Brunnen spritzt Konfetti. *Anders:* Rohr-Routing. **88**

### 🚒 Feuerwehr — 3 Konzepte
> Foto: MIT = Kind als Feuerwehr-Held; OHNE = gerettetes Tier + Löschfahrzeug.
1. **Feuer löschen** (_Rubbeln, Var: Lösch-Strahl-Wischen — kanonisches Feuerwehr-Mechanik_) — wisch mit dem Wasserstrahl übers Feuer, bis es aus ist. **MIT:** hinter dem gelöschten Feuer das Kind als Held. **OHNE:** ein gerettetes Kätzchen. *Anders:* Strahl-Wischen mit Dampf. **90**
2. **Drehleiter zum Fenster** (_Steuern/Zielen, Var: Leiter_) — fahr die Drehleiter aus und triff das richtige Fenster zur Rettung. **MIT:** im Fenster das Kind. **OHNE:** ein gerettetes Tier am Fenster. *Anders:* Ausfahren+Zielen. **88**
3. **Notruf-Wählscheibe** (_Dreh/Dial — ERSETZT Schlauch-Routing (Duplikat zu Baustelle-Rohre, Stufe-3)_) — wähl am alten Feuerwehr-Drehtelefon die Notruf-Nummer (Ziffer für Ziffer drehen), die Leitstelle schaltet das Einsatz-Foto frei. **MIT:** am Leitstellen-Schirm das Kind als Einsatzleiter:in. **OHNE:** ein Dalmatiner bellt den Alarm. *Anders:* Dreh-Wähl-Mechanik. **neu**

### 🕵️ Detektiv — 3 Konzepte
> Foto: MIT = Kind als Meisterdetektiv/„Gesuchter"; OHNE = Täter-Phantombild. _Flavor bewusst anders als Prinzessin-Mystery (Fingerabdruck/Pinnwand/Akte statt Krone/Tresor/UV)._
1. **Fingerabdrücke pinseln** (_Freilegen, Var: Spurenpuder_) — pinsle Spurenpuder über die Oberfläche, Abdrücke erscheinen. **MIT:** der Schlüssel-Abdruck führt zum Foto des Kindes (der „Meisterdetektiv"). **OHNE:** die Lupe enthüllt den maskierten Täter. *Anders:* forensisches Pinseln. **89**
2. **Indizien-Pinnwand** (_Verbinden, Var: Fäden_) — spann die Fäden zwischen den Indizien, bis das Muster den Täter zeigt. **MIT:** im Zentrum der Fäden das Foto des Kindes. **OHNE:** das Phantombild. *Anders:* Verdachts-Netz spannen. **89**
3. **Akte entschlüsseln** (_Quiz — neue Familie_) — beantworte 3 Ermittler-Fragen, um die Geheimakte zu öffnen. **MIT:** die Akte zeigt „GESUCHT: {Kind}". **OHNE:** gelöste Akte + Einladung. *Anders:* einziges Frage-Antwort-Spiel. **87**

### 🌴 Dschungel — 3 Konzepte
> Foto: MIT = Kind als Dschungel-Häuptling; OHNE = Affe/Tiger mit Partyhut.
1. **Lianen-Schwung** (_Timing-Sprung — neue Familie_) — tippe im richtigen Moment, um von Liane zu Liane zum Baumhaus zu schwingen. **MIT:** am Baumhaus das Kind als Häuptling. **OHNE:** ein Affe mit Partyhut. *Anders:* einziges Timing-Schwung-Spiel. **89**
2. **Wildnis-Wimmelbild** (_Wimmelbild, Var: Augen im Dickicht_) — finde die versteckten Tier-Augen im dichten Laub. **MIT:** das letzte Augenpaar gehört dem Kind (versteckt im Grün). **OHNE:** ein Tiger lugt hervor. *Anders:* Augen-Suche im Dickicht. **88**
3. **Liane-Knoten lösen** (_Ziehen/Entwirren — ERSETZT Trommel-Simon (Duplikat zu Weltraum-Alien-Funk, Stufe-3)_) — zieh die verknoteten Lianen am richtigen Ende auseinander, bis sich der grüne Vorhang zum Baumhaus teilt. **MIT:** der Liane-Vorhang öffnet → das Kind als Häuptling. **OHNE:** ein Gorilla schwingt mit Partyhut herein. *Anders:* Entwirr-/Zieh-Mechanik, kein Simon. **neu**

### 🦸 Superheld — 3 Konzepte
> Foto: MIT = Kind im Helden-Kostüm; OHNE = Sidekick/Helden-Emblem.
1. **Stadt retten** (_Fangen, Var: Fallendes auffangen_) — fang die fallenden Gegenstände/rette die Bürger rechtzeitig. **MIT:** gerettet → das Kind als Held auf dem Dach. **OHNE:** ein dankbarer Sidekick-Roboter. *Anders:* Rette-Fang mit Tempo. **88**
2. **Helden-Strahl** (_Schießen, Var: Energie-Strahl_) — ziele und feuere Energiestrahlen auf den Roboter-Schurken, bis die Panzerung bricht. **MIT:** dahinter das Kind als Held, der den Tag rettet. **OHNE:** der Schurke wird entlarvt. *Anders:* zielen+halten statt tap-fire. **89**
3. **Kräfte aufladen** (_Lade-Meter, Var: Power-Up_) — tippe schnell, lade die Heldenkraft → Verwandlungs-BOOM. **MIT:** aufgeladen → Verwandlung → das Kind im Kostüm. **OHNE:** ein leuchtendes Helden-Emblem. *Anders:* schnelles Aufladen → Transformation. **88**

### 🐴 Pferde — 3 Konzepte
> Foto: MIT = Kind im Sattel/auf dem Siegerpodest; OHNE = geschmücktes Pony mit Schleife.
1. **Spring-Parcours** (_Timing-Sprung, Var: Reiten_) — tippe im richtigen Moment, damit das Pony über die Hindernisse springt. **MIT:** nach dem Zielsprung sitzt das Kind im Sattel. **OHNE:** ein Pony macht eine Ehrenrunde mit Schleife. *Anders:* Sprung-Timing zu Pferd. **89**
2. **Pony striegeln** (_Rubbeln, Var: Striegel_) — striegel das verschmutzte Pony sauber, das Fell glänzt auf. **MIT:** im blank geputzten Sattel-Schild das Foto des Kindes. **OHNE:** ein wunderschön geschmücktes Pony. *Anders:* Striegel-Wischen mit Glanz. **87**
3. **Hufeisen-Wurf** (_Zielwurf — neue Familie_) — wirf die Hufeisen mit Zielen + Kraft auf den Pflock. **MIT:** Volltreffer → das Kind hebt den Pokal. **OHNE:** ein Pony mit Siegerschleife. *Anders:* einziges Wurf-/Kraft-Ziel-Spiel. **88**

---
## 8. Loop-Abschluss

**15/15 Mottos durch · 45 Konzepte.** Jedes mit MIT/OHNE-Foto-Reveal (harte DNA-Regel §1.3), interner Mechanik-Verschiedenheit und motto-nativem Flavor. Familien-Recurrence nur mit benannter Variation (Ledger §4).

**Mechanik-Basisfamilien genutzt (~18):** Memory · Schießen · Puzzle · Freilegen · Tap-Ausbrüten · Pfad · Zeichnen · Fangen · Wimmelbild · Verbinden · Lade-Meter · Steuern · Rubbeln · Sortieren · Drehen/Dial · Schleudern · Stapeln · Simon · Quiz · Timing-Sprung · Zielwurf · Zielen-Knipsen.

**Status der Scores:** Telemetrie / **pre-review** (Eigen-Bewertung nach Sparring, within-doc vergleichbar — NICHT motto-übergreifend absolut). **Echter 90+-Gate = Stufe-2-claude.ai-Review, noch ausstehend** (Batch, nach Bolle-Freigabe). Erst danach gelten Konzepte als „abgenommen".

**Nächste Schritte (nach Loop):** (1) ~~Stufe-2-Review~~ ✅ erledigt (s. §9). (2) Ohne-Foto-Fallback in den 2 Prototypen ✅ (Memory + Kanone done). (3) Engine-Bibliotheksplan. (4) Bau-Priorisierung.

---
## 9. Stufe-2-Review (claude.ai, Opus 4.8 Hoch, Grinch-kalibriert) + Stufe-3-Verarbeitung

**Verdikt:** Konzept-Set solide, aber 3 systemische Schwächen + ehrlichere Scores als meine pre-review. Reviewer-Telemetrie lag **7–15 Pkt unter** meinen Eigen-Scores (erwartete Anti-Sycophancy-Korrektur). Stufe-3: gegen Quelle geprüft, **fast keine False-Positives — der Review sitzt.**

### Drei systemische Befunde (übernommen)
- **A) Composite-Falle (wichtigste Bauentscheidung):** ~halbe „MIT Foto"-Reveals sind *Composites* (Kind reitet Einhorn / im Cockpit / als Merperson) → Gesicht zur Laufzeit in eine Szene montieren = teuer + Risiko „uncanny/billig". **Regel: wo möglich Foto-in-Slot + Spruch (wie die Piraten-Prototypen: Foto im Rahmen + Piratenhut), nicht echte Montage.** Composite nur wo billig+sauber.
- **B) „Rahmen ≠ Twist":** Reveal-Gattung „Foto im Medaillon/Netz/Kette/Schild/Fenster" ist Deko, keine Umdeutung. Betroffen: Einhorn-3, Feen-2, Meerjungfrau-3, Pferde-2, Detektiv-2, tw. Ritter-3, Baustelle-1. **Fix: das gesammelte Element WIRD das Gesicht/der Reveal** (Perlen bilden die Foto-Pixel; das Netz „fängt" das Kind), nicht nur rahmen.
- **C) Datenschutz-Flag (höher als jede Mechanik):** Link = Kindergesicht + Adresse + Datum im WhatsApp-Verteiler. Pflicht: nicht-erratbare IDs (✅ Worker `generateId`), noindex (✅), Foto-TTL 90 Tage (✅). Bei Gamechanger-Sharepic/Bestenliste: **nur Vorname, NIE Adresse aufs teilbare Bild.**

### OHNE-Foto-Fallback verschärft (Reviewer-Prinzip übernommen)
Der Charakter-Reveal soll **das verdiente Artefakt der Mechanik** sein, nicht 3× dasselbe Maskottchen: der gemalte Regenbogen wird zum **Namens-Banner**, das Sternbild **buchstabiert den Namen**, das geschmiedete Schwert trägt die **Gravur „Ritter/in {Name}"**. → ergänzt §1.3.

### Echte Duplikate gefixt (Stufe 3)
- **Weltraum-3 = Dschungel-3** (beide Simon) → Dschungel-3 ersetzt durch **„Liane-Knoten lösen"** (Zieh-Mechanik).
- **Baustelle-3 ≈ Feuerwehr-3** (beide Pipe-Routing) → Feuerwehr-3 ersetzt durch **„Notruf-Wählscheibe"** (Dreh/Dial).

### Schwache Konzepte (<62, Fix-Prinzip B/Composite) — zum Bau überarbeiten
Feen-2 (55) · Meerjungfrau-3 (56) · Einhorn-3 (58) · Pferde-2 (58) · Feuerwehr-3 (58, ersetzt) · Ritter-3 (60) · Baustelle-3 (60, ersetzt) · Dschungel-3 (60, ersetzt) · Detektiv-3 (60, Quiz→Indiz-Ziehen). **Stärkste 5 (Reviewer):** Piraten-Memory 82 · Safari-Foto-Safari 80 · Prinzessin-Tresor 80 · Dino-Ei 80 · Piraten-Kanone 78.

### Scores rekalibriert
Reviewer-Telemetrie (55–82) ist die **ehrlichere** Zahl als meine pre-review (87–92). Beim Bau gilt die Reviewer-Spalte. (Score bleibt Telemetrie, kein Gate — der echte Gate ist „0 systemische Befunde offen + Top-Tier + differenziert".)

---
## 10. Gamechanger (Stufe-2-Review — simpel, billig, viral; nutzt vorhandenen Worker+KV+WhatsApp)

> Bolle-Auftrag: einfache Booster für Spielspaß / Erlebnis / Viralität. Alle ohne großen Build.

1. **Gast-Name im Reveal** — **optionales Namensfeld am Spielstart** (das Kind tippt selbst) → Reveal sagt „Mia, du bist eingeladen!". Vorbefüllt aus `?g=Mia` (für individuell verschickte Links). **Leer = generischer Reveal** → der **WhatsApp-Gruppen-Dump-Fall ist abgedeckt** (kein Name nötig, nichts bricht). Der eingegebene Name ist zugleich die spätere RSVP-Angabe. *Wirkung:* 1:1-Gefühl auch ohne individuelle Links. *Simpel:* 1 Input-Feld, kein Backend. **✅ in allen 5 Top-Games gebaut + verifiziert (getippt UND `?g=`).**
2. **Party-Bestenliste (KV)** — Gast-Score in KV-Key pro Party → Rangliste. *Wirkung:* Wettbewerb → Wiederspiel, Kinder drängeln Eltern. *Simpel:* 1 KV-Key (KV läuft schon).
3. **Teilbares Reveal-Sharepic** — Canvas-Bild „Ich feiere — komm zur Party!" zum Speichern/Teilen. *Wirkung:* organische Reichweite. *Simpel:* canvas-to-image. ⚠️ Adresse NICHT aufs Bild.
4. **„Lade einen Freund"-Button** — `wa.me`-Deeplink mit vorbefülltem Text + Link. *Wirkung:* Eltern reichen weiter. *Simpel:* null Build.
5. **Reveal-Varianz** — 1 von ~5 zufälligen Sprüchen + Easter-Egg bei Perfect-Score. *Wirkung:* Wiederspiel-Anreiz. *Simpel:* Random-Array.
6. **Haptik + Konfetti + Sound im Reveal** — `navigator.vibrate` + CSS-Konfetti + kurzer Ton. *Wirkung:* aus „nett" wird „knall". *Simpel:* schon in den Prototypen drin → überall ausrollen.
7. **Zusage-Zähler / Social Proof** — „Schon 12 Freunde kommen!" aus dem RSVP-KV-Key. *Wirkung:* FOMO treibt Zusage. *Simpel:* count auf bestehendem Key.
8. **Countdown bis zur Party** — „noch 4 Tage". *Wirkung:* Vorfreude + Wiederbesuch. *Simpel:* Datums-Diff.

**Datenschutz-Leitplanke (für 2/3/7):** Bestenliste & Sharepic nur Vorname, nie Nachname/Adresse aufs teilbare Bild — gleiche konservative Linie wie machsruhig.

---
## 11. Engine-Bibliotheksplan — welche Familien teilen Code

**Kern-Erkenntnis:** Die 45 Konzepte kollabieren auf **~11 Mechanik-Engines + 1 geteilten Core**. Jedes Spiel = Engine + THEME-Config + Reveal-Texte. So wird aus „45 Einzel-Apps" eine Bibliothek.

### Shared Core (in JEDEM Spiel identisch — einmal bauen)
- **Szenen-System** (`intro → game → reveal → invitation`, `show()`, fade-CSS)
- **Sound-Engine** (`note`/`noise`/`sfx`) + **Konfetti** + **`vib()`**
- **Foto-System:** `HAS_PHOTO` + `?nofoto` + **NOPHOTO-SVG-Fallback** + **Slot-Reveal-Rahmen** (Foto in festen Slot, KEIN Composite — Befund A) + Einladungskarte
- **Gamechanger-Layer:** `guestName()` (`?g=`) · Reveal-Varianz (Spruch-Array) · Share-Pic (canvas) · „Lade-Freund" (`wa.me`) · [Worker/KV:] Bestenliste · Zusage-Zähler · Countdown
- **THEME-Objekt** je Motto (Farben, Symbole, Foto, Texte)

### Mechanik-Engines (geteilter Code je Cluster)
| # | Engine | Prinzip | Spiele die sie trägt |
|---|---|---|---|
| **E1** | **Reveal-Board** ⭐ größter Share | Foto unter Hülle → Hülle per Input entfernen → Foto setzt sich zusammen | Memory · Kanone · Fossil-Ausgrabung · Schatz-Rubbeln · UV-Schrift · Fingerabdrücke · Pony-Striegeln · Feuer-Löschen (~8) |
| **E2** | **Tap-Meter** | Tippen → Leiste füllt → Ereignis bei 100% | Ei-Ausbrüten · Raketen-Schub · Wunsch-Laterne · Kräfte-laden (4) |
| **E3** | **Verbinden/Trace** | Linie zwischen Knoten ziehen / Pfad nachzeichnen | Sternbild · Tau-Netz · Indizien-Pinnwand · Regenbogen · Rohre (5) |
| **E4** | **Fangen/Sammeln** | bewegte Ziele tippen/fangen, Zähler | Sternenstaub · Stadt-retten · Foto-Safari (Knips-Variante) (3) |
| **E5** | **Dial/Code** | Werte einstellen + prüfen (heiß/kalt) | Tresor-Code · Notruf-Wählscheibe (2) |
| **E6** | **Schleuder/Zielen** | zielen + loslassen auf Ziel | Katapult · Hufeisen-Wurf · Helden-Strahl · Drehleiter (4) |
| **E7** | **Wimmelbild** | N Verstecktes in Szene finden | Zauberwald · Kronjuwelen-Tatort · Wildnis-Augen (3) |
| **E8** | **Steuern** | durch Hindernisse lenken | Korallen-Slalom · Jeep (2) |
| **E9** | **Puzzle/Assemble** | Teile in Slots ziehen | Flaschenpost · Wappen (2) |
| **E10** | **Timing-Tap** | im richtigen Moment tippen | Lianen-Schwung · Spring-Parcours (2) |
| **E11** | **Klein-Engines** | je 1–2 Spiele | Sortieren (Perlen) · Stapeln (Hochhaus) · Simon (Alien-Funk) · Quiz (Akte) · Pfad-folgen (Dino-Fährte · Safari-Spuren) · Ziehen (Liane-Knoten) |

### Bau-Reihenfolge (max. Hebel zuerst)
1. **Shared Core** (Szenen+Sound+Foto-Slot+Gamechanger) — die 5 Prototypen sind schon der Beleg, jetzt als Modul extrahieren.
2. **E1 Reveal-Board** (deckt ~8 Spiele) → größter Multiplikator. Memory + Kanone sind bereits E1-Instanzen.
3. **E2 Tap-Meter** (Ei gebaut) · **E4 Fangen** (Foto-Safari gebaut) · **E5 Dial** (Tresor gebaut) → mit E1 sind damit **4 Engines pilotiert**.
4. Rest E3/E6/E7… nach Motto-Bedarf.

---
## 12. Stand: Engine-Piloten gebaut (alle 10 Engines abgedeckt)

| Spiel | Motto | Engine | Foto MIT/OHNE | Gast-Name | Verifiziert |
|---|---|---|---|---|---|
| Schatz-Memory | piraten | E1 Reveal-Board | ✅ / ✅ | ✅ | end-to-end |
| Kanonen-Reveal | piraten | E1 (Schieß-Variante) | ✅ / ✅ | ✅ | end-to-end |
| Foto-Safari | safari | E4 Fangen | ✅ / ✅ | ✅ | end-to-end |
| Tresor-Code | prinzessin | E5 Dial | ✅ / ✅ | ✅ | end-to-end |
| Dino-Ei | dino | E2 Tap-Meter | ✅ / ✅ | ✅ | end-to-end |
| Fossil-Ausgrabung | dino | E1 (Wisch-Variante, Canvas) | ✅ / ✅ | ✅ | end-to-end |
| Sternbild | weltraum | E3 Verbinden (Connect-the-dots) | ✅ / ✅ | ✅ | end-to-end |
| Burg-Katapult | ritter | E6 Schleuder/Zielen (Power-Gauge) | ✅ / ✅ | ✅ | end-to-end |
| Tatort-Suche | detektiv | E7 Wimmelbild (5 Hinweise finden) | ✅ / ✅ | ✅ | end-to-end |
| Bagger-Fahrt | baustelle | E8 Steuern (3-Spur-Dodge, Strecke) | ✅ / ✅ | ✅ | end-to-end |
| Dschungel-Puzzle | dschungel | E9 Puzzle (3×3-Schiebe, Foto IST Spielfeld) | ✅ / ✅ | ✅ | end-to-end |
| Hürden-Springen | pferde | E10 Timing-Tap (Sprung-Fenster, 5 Hürden) | ✅ / ✅ | ✅ | end-to-end |
| Helden-Signal | superheld | E11 Simon/Sequenz (5er-Folge) · **auf Shared Core gebaut** | ✅ / ✅ | ✅ | end-to-end |
| Wolken-Turm | einhorn | E11 Stapeln (Drop+Trim, 6 Etagen) · **auf Shared Core** | ✅ / ✅ | ✅ | end-to-end |
| Feuer löschen | feuerwehr | E1 Wisch (Canvas, Flammen) · Core | ✅ / ✅ | ✅ | end-to-end |
| Drehleiter | feuerwehr | Aim (schwingende Leiter, 3 Fenster) · Core | ✅ / ✅ | ✅ | end-to-end |
| Notruf-Wählscheibe | feuerwehr | E5 Dial (112 wählen) · Core | ✅ / ✅ | ✅ | end-to-end |
| Perlen-Sortieren | meerjungfrau | E11 Sortieren (Symbol+Farbe) · Core | ✅ / ✅ | ✅ | end-to-end |
| Schatz auftauchen | meerjungfrau | Auftauchen (Blasen poppen, war Wisch — Stufe-2-Fix) · Core | ✅ / ✅ | ✅ | end-to-end |
| Korallen-Slalom | meerjungfrau | Steuern/Fangen (Perlen fangen) · Core | ✅ / ✅ | ✅ | end-to-end |
| Wunsch-Laterne | feen | E2 Tap-Meter (Laterne füllen) · Core | ✅ / ✅ | ✅ | end-to-end |
| Tau-Netz | feen | E3 Verbinden (Tautropfen) · Core | ✅ / ✅ | ✅ | end-to-end |
| Glühwürmchen-Melodie | feen | E11 Simon (Position+Ton) · Core | ✅ / ✅ | ✅ | end-to-end |
| Flaschenpost | piraten | E2 Tap-Meter (Kork poppen, Pergament rollt) · Core | ✅ / ✅ | ✅ | end-to-end |
| Dino-Fährte | dino | Pfad-folgen (Fußspuren, Dino läuft) · Core | ✅ / ✅ | ✅ | end-to-end |
| Kronjuwelen-Tatort | prinzessin | E7 Wimmelbild (5 Juwelen) · Core | ✅ / ✅ | ✅ | end-to-end |
| UV-Geheimschrift | prinzessin | Licht-Suche (Lampe ziehen, Runen) · Core | ✅ / ✅ | ✅ | end-to-end |
| Schwert schmieden | ritter | Tap-Meter + Timing-Bonus (glühen) · Core | ✅ / ✅ | ✅ | end-to-end |
| Wappen-Puzzle | ritter | E9 Puzzle (Foto = Wappen) · Core | ✅ / ✅ | ✅ | end-to-end |
| Spuren-Pfad | safari | Pfad-folgen (Pfotenspur, Löwe) · Core | ✅ / ✅ | ✅ | end-to-end |
| Jeep-Steuern | safari | E8 Steuern (3-Spur, ins Camp) · Core | ✅ / ✅ | ✅ | end-to-end |
| Raketen-Schub | weltraum | Tap-Meter + Timing-Bonus (zünden) · Core | ✅ / ✅ | ✅ | end-to-end |
| Alien-Funkspruch | weltraum | E11 Simon (Glyphen, Position+Ton) · Core | ✅ / ✅ | ✅ | end-to-end |
| Hochhaus stapeln | baustelle | E11 Stapeln (Drop+Trim, 6 Etagen, Richtfest) · Core | ✅ / ✅ | ✅ | end-to-end |
| Rohre verbinden | baustelle | E3 Verbinden (Rohrknoten, Wasser fließt) · Core | ✅ / ✅ | ✅ | end-to-end |
| Pony striegeln | pferde | E1 Wischen (Schlamm-Canvas, Foto-Board) · Core | ✅ / ✅ | ✅ | end-to-end |
| Hufeisen-Wurf | pferde | E6 Schleuder/Zielen (Power-Gauge, 3 Ringer) · Core | ✅ / ✅ | ✅ | end-to-end |
| Fingerabdruck | detektiv | E1 Wischen (Spurenpuder → gezeichneter Abdruck) · Core | ✅ / ✅ | ✅ | end-to-end |
| Akte-Quiz | detektiv | E11 Quiz (3 Tap-Choice-Fragen, kein Fail-State) · Core | ✅ / ✅ | ✅ | end-to-end |
| Lianen-Schwung | dschungel | E10 Timing-Tap (Liane im Fenster greifen, 5×) · Core | ✅ / ✅ | ✅ | end-to-end |
| Wildnis-Wimmelbild | dschungel | E7 Wimmelbild (5 Papageien, warmes Framing) · Core | ✅ / ✅ | ✅ | end-to-end |
| Stadt retten | superheld | Steuern/Fangen (6 fallende Dinge auffangen) · Core | ✅ / ✅ | ✅ | end-to-end |
| Helden-Strahl | superheld | E6 Schleuder/Zielen (Power-Gauge, 3 Meteore) · Core | ✅ / ✅ | ✅ | end-to-end |
| Regenbogen-Brücke | einhorn | E3 Verbinden (7 Bogen-Steine, Regenbogen) · Core | ✅ / ✅ | ✅ | end-to-end |
| Sternenstaub | einhorn | Tap-Reaktion (8 schwebende Funken antippen) · Core | ✅ / ✅ | ✅ | end-to-end |

**= alle 15 Mottos belegt; ALLE 15 Mottos komplett 3/3** (piraten·dino·prinzessin·ritter·safari·weltraum·feuerwehr·meerjungfrau·feen·baustelle·pferde·detektiv·dschungel·superheld·einhorn) über **45 verifizierte Prototypen** — **Auffüll-Phase #41 abgeschlossen, 45/45 erreicht.** Nächste Phase: gebündelte Stufe-2-Review aller „Stufe-2 offen"-Spiele (frischer claude.ai-Tab) vor Live. (feuerwehr/meerjungfrau/feen bereits Stufe-2-grün) (piraten · safari · prinzessin · dino · weltraum · ritter · detektiv · baustelle · dschungel · pferde · superheld · einhorn), E1 über 3 Input-Arten (Kacheln · Schießen · Wischen) + Foto-Slot-Prinzip (kein Composite) + Ohne-Foto-Fallback (verdientes Artefakt, nie generisches Maskottchen) + Gast-Name-Gamechanger (`?g=` / Intro-Feld, WhatsApp-Gruppen-tauglich) überall. Prototypen in `_dev/prototypes/game-*.html` (`?nofoto` = Ohne-Foto, `?g=Name` = personalisiert). Personal-Foto + `*-DEMO.html` bleiben lokal.

**Stopp-Kriterium erreicht:** je Engine ≥1 end-to-end verifiziertes Spiel. **Offen (für Bolle / nächste Welle):** ~~(1) Shared Core~~ → **erledigt, s. §13**; ~~(2) E11 Klein-Engines (Sortieren/Stapeln/Simon/Quiz)~~ → **alle 4 pilotiert** (Perlen-Sortieren · Wolken-Turm+Hochhaus · Helden/Glühwürmchen/Funk · Akte-Quiz); ~~(3) gebündelte Stufe-2-Review~~ → **Wave gelaufen 01.07. (Charge 1–3, alle 13 neuen Spiele, Opus 4.8 Hoch), 22 Detail-Fixes gesetzt+verifiziert.** Offen: **4 systemische Bolle-Entscheidungen** (s. Handoff `2026-07-01-stufe2-spiele-review.md`): „bist DU" vs. Foto-Referent · Reveal-Person-Parität (Intro „wer"→OHNE) · Simon-Schwierigkeit Länge-5 (funk/Helden-Signal/Glühwürmchen) · Reveal-Stil-Vereinheitlichung. Erst nach diesen Calls §6/§12 Stufe-2 grün; (4) Integration in echte Motto-Apps + Worker-Gamechanger (Bestenliste/Zusage-Zähler/Countdown).

---
## 13. Shared Core extrahiert (alle 12 Spiele auf core.js + core.css)

Vorgehen: Helfer-V4-Gate — **read-only Audit-Workflow** (12 parallele Explore-Agenten + Opus-Synthese, Sub-Agenten NUR Analyse, kein Code) → Haupt-Claude schreibt Core + refactort + verifiziert jedes Spiel im Preview-DOM (MIT + OHNE Foto + Mechanik-Negativtests, 0 JS-Fehler).

**`_dev/prototypes/core/core.js`** (PLAIN `<script>`, kein Module/IIFE — sonst stirbt der Ton lautlos): `$` · `show` · `AC`/`note`/`noise`/`vib` · `guestName` + `?g=`-Prefill · `setPhoto(theme,nophoto)→HAS_PHOTO` · `confetti(colors,opts)`.
- `note(f,t0,dur,{type,vol,glideTo,detune,attack})` = Superset (Default vol 0.15).
- `noise(t0,dur,{vol,freq,q,filter})` = Superset, `filter` Default `bandpass`; **bagger + huerden** übergeben `filter:'lowpass'`, **kanone** ebenfalls (vorher via `o.lp`-Boolean).

**`_dev/prototypes/core/core.css`** = Skelett (Reset · Body-Gradient via `--bg1/--bg2/--fg` · `.wrap` · `.scene/.on`+fade · `h1/.sub/.big/.flag`+bob · `.btn`+`.ja` · `.hud/.pill` · `.confetti`+fall · `.note/.demoTag`).

**Pro Spiel bleibt lokal:** `:root`-Theme (`--bg1 --bg2 --fg --accent --accent-dk --ink` + Extras), `THEME`, `NOPHOTO`-SVG, `sfx`, Field-/Karten-CSS (Karte variiert: invite/frame/poster/sign/rosette), Spiellogik+State, Spiel-`@keyframes`. Divergenzen bewahrt: Memory/Kanone eigenes `.hud`(2 Pills)/`.pill`(hell) + 90er-Konfetti via `confetti(CC,{count:90,timeout:3400,durSpread:1.5})`; Fossil-Canvas (`#sand`); ei-dino `.wrap/.scene{gap:16px}` + `window._w`; sternbild `--ink:#04122e` + SCALE beim sfx; puzzle/wimmel `--fg` ≠ #fff.

**Dedup:** ~100 Zeilen (JS+CSS) × 12 Dateien zentralisiert; neue Spiele starten ab Core. **`*-DEMO.html` (lokal, eingebettetes Foto) NICHT angefasst** — laufen weiter mit Inline-Code.
