# Digitalpaket v2 — Blueprint (Agenten-Schwarm 11.08.2026, 15x Opus 5, adversarial verifiziert)

> Auftrag Bolle: Paket challengen — kein Schnipselkaese, einfach, Fotodruck fuer Urkunde + Einladung (optional aus dem Studio), alles aus Einladung/Plan/Partyseite. Statistik: {"findings": 48, "majors": 38, "bestaetigt": 6}

# Digitalpaket v2 — Blueprint (Ritter-Schiff)

> Grundlage: eigene Verifikation am Repo-Stand vom 11.08.2026 (`paket/_maschine/template.html`, `paket/core/paket.css`, `paket/core/paket-core.js`, `paket/_maschine/manifeste/*.json`, `data/motto/ritter-*.json`, `_dev/docs/RENDER-SPEC-HELDENKARTEN.md`, `_dev/druck-test/`), nicht auf Zuruf der Findings.
> Zwei Schienen, eine Wahrheit: **A4-Heimdruck ist und bleibt der Default** (Doktrin 3), **Fotodruck ist der optionale Veredelungs-Ring**. Kein Artefakt existiert doppelt gepflegt — beide Schienen essen dieselben Plan-Daten (Doktrin 1).

---

## 1. Artefakt-Zielbild

Alle 33 Inventar-Artefakte. Spalte „Heute" trägt den Schnipsel-Score von jetzt, Spalte „Begründung" sagt, **wodurch** der Score in der Zukunft 0 ist.

| Artefakt | Heute (Score) | Zukunft | Begründung — wie Score 0 entsteht |
|---|---|---|---|
| **Deckblatt / Cover** (`shCover`) | Repräsentations-Blatt, volle Navy-Fläche, 0 | **bleibt A4** | Trägt künftig den Start-Block (§2). Kein Papier-Eingriff, war und bleibt 0. Tinten-Hebel ist `coverSvg()` (72 % Blatthöhe Volltonfläche, `paket.css:58` `.cover svg.sea{…height:72%}`), nicht der Verlauf — der ist Gate-Entscheidung vom 30.07. (`paket.css:262-263`). |
| **Ablaufplan Teil I** (`shTimeline`) | Kern-Blatt, gerechnet, 0 | **bleibt A4** | Unangetastet gut. Bekommt zwei neue gerechnete Zeilen: Karten auf die Teller (ersetzt Tischkärtchen) und Siegerehrung am Ende (`RENDER-SPEC:16` „Übergabe: **Partyende als Siegerehrung**"). |
| **Vorbereitungs-Countdown** (`shCountdown`) | ☐-Kästchen, 3 | **bleibt A4** | Score-Korrektur nach unten: Abhaken ist **kein** Ausfüll-Strich. Doktrin 2 nennt „Ausschneide-Bögen, Ausfüll-Striche, Papierfetzen" — ein gedrucktes ☐ auf einer Arbeitsliste verlangt keine Handschrift und keine Schere. Bleibt wie es ist → 0. |
| **Countdown-Poster** (`shPoster`) | 14 hardcodierte Nächte + ⬜ zum Eintragen, 6 | **bleibt A4** | `template.html:820` `for(var i=14;i>=1;i--)` wird zur Rechnung aus `PARTY.date` (dieselbe `base`/`today`-Logik wie `shCountdown`, `template.html:395-401`); `ritter.json` w97 `'<div class="big">Noch ⬜ Nächte bis zur Party!</div>'` bekommt die gerechnete Zahl. Ohne gültiges Datum: Blatt entfällt. Kein Stift mehr → 0. |
| **Einkaufsliste + Menü** (`shShopping`) | Kopf rechnet auf Zusagen um, Posten nicht, 1 | **bleibt A4** | Verifiziert: `ritter-mittel.json` standard = `costContext` „(Standard, 8 Kinder)" + Posten „8 Pappschilde | 22", „Pool-Nudel-Schwerter (8er) | 16", Σ = 106 €. Mengengerüst je Posten (`proKind`/`basisMenge`/`fix`) → Kopf, Menge, Preis und Σ kommen aus **einer** Zahl. |
| **Deko & Kuchen** (`shDecoCake`) | 0 | **bleibt A4** | Nur Text-Fix: Mitgebsel-Absatz „Etiketten aufkleben" → „Karte mit dem Band an die Tüte" (sonst verweist Fließtext auf ein gelöschtes Blatt). |
| **Spielkarten Teil III** (`shGameCards`) | Gastgeber-Lesestoff, 0 | **bleibt A4** | Bestes Blatt des Pakets. Nimmt zusätzlich die Rollen-Vorleseliste auf. |
| **Digitale Spielstation** (QR-Kachel) | 0 | **bleibt A4** | Scannen ist kein Papier-Eingriff. Unverändert. |
| **Quiz-Karten-Liste** (`quizBlock`) | „zum Vorlesen oder Ausschneiden" + Lösung daneben, 7 | **bleibt A4** | `template.html:292` verliert „oder Ausschneiden"; die Antwortzeile (`:288`) wandert in den bereits existierenden Host-Kasten-Stil (`template.html:274` „🗂️ Fall-Übersicht — **nur für dich** (enthält die Lösung!)"). Vorlese-Liste statt Bastelbogen → 0. |
| **Rollen-Zettel** (`rit.rolesList`) | „✂️ Zum Ausschneiden — ein Zettel je Kind" + `________`, 10 | **fliegt** (wird Vorlese-Liste) | `template.html:584` + Chips `:581-582`. Es wird nichts gezogen: die Rolle steht schon auf der Einladung (`15-*.html:29` „⚔️ Deine Rolle: Drachen-Späherin"). Bleibt als nummerierte Rolle→Name-Liste auf der Ritual-Karte; überzählige Kinder bekommen deterministisch ein `epithets`-Wort statt Schreiblinie. |
| **Stempel-Plan-Kasten** (`stempelBlock`) | 2 | **bleibt A4** | Score-Korrektur: das Heft ist ein **gekaufter** Posten (`ritter-mittel.json` „📜 Knappen-Hefte + Stempel | 14"), die Feldzahl kommt aus `buildTimeline()` (`template.html:210-216`). Unser Papier verlangt keine Handschrift → 0. |
| **Antwortbogen** (Lücke) | gefordert, nie gedruckt, 8 | **fliegt** | Verifiziert: „Antwortbogen" in 7 `data/motto/*.json` (ritter-mittel/gross, baustelle-mittel/gross, pferde-klein/mittel/gross), in `paket/**` **nur im Kommentar** (`template.html:192`). Wird **nicht gebaut** (neues Ausfüll-Blatt = Doktrin-2-Bruch), sondern gestrichen: Material-Zeile, Spielschritt und der 6-€-Einkaufsposten. |
| **Schatzsuche-Stationskarten** (`shStations`) | toter Code mit ✂️-Anweisung, 9 | **fliegt** | `paket-core.js:383` `const MISSION_IM_PAKET = false;` → `shStations()` liefert '', aber `render()` ruft sie weiter auf (`template.html:898`) und `:770` trägt weiter „✂️ Vor dem Aufhängen abschneiden". Funktion, Aufruf und Manifest-Wörter w42/w43/w52-w55/w85 raus. |
| **SOS-Karten Plan B** (`shSOS`) | 0 | **bleibt A4** | Unverändert stark. Nur die erfundene Fußzeile „Seite 9 · SOS" (`template.html:614`) geht. |
| **A4-Urkunde je Gast** (`shCertificates`) | Ausfüll-Linie „Datum & Ort" + Blanko-Reserve, 4 | **bleibt A4 · optional Fotodruck** | `template.html:627` `'<div class="ln">Datum &amp; Ort</div>'` — Datum und Ort kennt der Plan, also eindrucken. Blanko-Widerspruch (`:634` verspricht zwei, `:636` liefert eine) wird über den Text geschlossen, nicht über eine zweite Blanko-Seite. Veredelung = 15×20-Kombi (0,49 €), Default bleibt A4 (`RENDER-SPEC:102` „Heimdrucker + A4-Fotopapier … Urkunden-Großweg"). |
| **Tischkärtchen** (`shTableCards` tcells) | Schere + Falz + Leerzellen, 10 | **fliegt** | `template.html:661` ✂️-Hinweis, `:644` `while(names.length<6) names.push('');`, Falzmarke fest in `paket.css:169-170`. Inhalt (Name + Rolle) steht bereits gedruckt auf dem Kern-Artefakt (`08-*.html:31-32`). Platzfunktion = Karte liegt beim Essen auf dem Teller (neue Ablaufplan-Zeile). Spec sagt es selbst: `RENDER-SPEC:143` „Tischkarten als Fotoprint … **nicht v1**". |
| **Schatz-Etiketten** (`shTableCards` lcells) | Kleben + `________`, 10 | **fliegt** | `ritter.json` w32/w77. Fotodruck-Nachfolger gibt es bewusst nicht (`RENDER-SPEC:141-142` Foto-Etiketten „geprüft und VERWORFEN"). Die Tüte wird durch die Kombi-Karte am Geschenkband gekennzeichnet — dafür muss die **Punch-Zone** aus `RENDER-SPEC:39-40` in `08-*` und `13-*` nachgezogen werden (heute 0 Treffer auf `Punch|Loch|Band`). Kleber verschwindet vollständig aus dem Produkt. |
| **Küchen-Zettel** (`shGuestsWishes`) | 1 | **bleibt A4** | Das Kühlschrank-Blatt. Nimmt zusätzlich `abholNote()` auf (steht heute unter dem Handzettel-Schneidegitter, `template.html:853` — also Kindernamen + Abholzeiten auf dem Blatt, das an fremde Eltern verteilt wird). |
| **Burgpost-Einladungskarten** (`shInvitations`) | Ausschneiden + Blanko mit `________`, 8 | **bleibt A4 · optional Fotodruck** | Ticket #105. A4-Fassung verliert die Schneide-Rhetorik und die Unterstrich-Blankos; sie bekommt zusätzlich die **Endzeit** (`PARTY.endTime`), damit sie die komplette Eltern-Info trägt und den Handzettel überflüssig macht. Fotodruck-Veredelung = 10×15-Karte (0,27 €). |
| **Eltern-Handzettel 4×** (`shHandzettel`) | 4 identische Schnipsel, skaliert nicht, 8 | **wird digital** | `template.html:846-848` (`'+card+card+card+card+'`). Inhaltlich Dublette der Einladungskarte. Hauptweg wird der bereits gebaute WhatsApp-Text; physisch trägt die Einladung. |
| **WhatsApp-Text zum Handzettel** | 0, korrekt `screen-only` | **wird digital** (bleibt) | `template.html:854` + `paket.css:258`. Wird vom Anhängsel zum Hauptweg, mit Kopier-Knopf. |
| **Danke-Blatt** (`shDanke`) | `.wacopy` **ohne** `screen-only` → Kopierkasten landet auf Papier, 2 | **wird digital** | `template.html:799` vs. `:854` — Einzeiler-Fix, danach ist das Blatt reiner Bildschirm-Inhalt. Der große Dank ist ohnehin die Urkunde (`:798`). |
| **Burg-Chronik / Logbuch** (`shLogbuch`) | 12 gepunktete Ausfüll-Striche + tote Schatz-Frage, 10 | **fliegt** | `template.html:808` + `paket.css:226` `.lbline{border-bottom:1.5px dotted…}`. Verifiziert: `ritter.json`, `piraten.json`, `prinzessin.json` w46 fragen weiter „So haben wir den Schatz gefunden:", obwohl `MISSION_IM_PAKET=false` — baustelle/dino/feuerwehr/meerjungfrau sind längst motto-nativ migriert. Erinnerungs-Versprechen erfüllt das Crew-Poster ohne eine einzige Handschrift-Linie. |
| **Blatt-Fußzeile** (`foot()`) | erfundene Nummern, 0 | **bleibt A4** | Verifiziert: „Seite 1" (`:360`) → 2 → 3 → *unnummeriert* (Poster) → 4 → 5 → *unnummeriert* (Spielkarten) → **„Seite 9 · SOS"**, danach nur noch Wörter. Nummern raus; entweder nur Teil-Kennung oder gerechnetes „Blatt N von M" aus `render()`. |
| **Urkunden-Heldenkarte 15×20** (`08-*`) | Probe, hardcodiert (Emma), 0 | **wird Fotodruck (Kern)** | Das eine Objekt je Gast. Ersetzt Urkunde + Heldenkarte + Tischkärtchen + Etikett in einem (`RENDER-SPEC:122-126`). Speist sich aus Plan + Partyseite; keine Ausfüll-Striche, weil „Fotopapier nimmt keinen Stift an". |
| **Urkunden-Heldenkarte generisch `?g=0..7`** (`13-*`) | Renderer-Vorlage, CREW hardcodiert, 0 | **wird Fotodruck (der Renderer)** | Ist der Bauplan, nicht ein Artefakt: `13-*.html:50` `var k=CREW[parseInt(q.get('g')||'0',10)%8];` → `confirmedGuests()`. Beweist Serienfähigkeit inkl. Genus. |
| **Crew-Poster 20×30** (`14-*`) | Probe, Party-Kopf hardcodiert, 0 | **wird Fotodruck (1× je Party)** | Erbt die Kinderzimmerwand vom Countdown-Poster — im Dossier explizit als **vorher/nachher** benennen (Countdown hängt bis zur Party, Crew-Poster danach), sonst konkurrieren zwei Poster um denselben Platz. |
| **Burgpost-Fotokarte 10×15** (`15-*`) | 1200×1800 (203 dpi) statt 1800×2700; Emoji als Druck-Element; `_qr_demo.png` statisch, 0 | **wird Fotodruck (optional)** | Drei harte Spec-Abweichungen zu schließen: Zielpixel (`RENDER-SPEC:22`), `:54` „**NIE Emojis als Druck-Artwork**", und ein echter QR aus dem Gast-Token statt Platzhalter-PNG. |
| **Heldenkarte 10×15** (`01/02/03/06`) | Pflicht war, heute Extra, 0 | **Schublade** | `RENDER-SPEC:125-126` „vom Pflicht-Bestandteil zum OPTIONALEN Multi-Up-Extra". Text-Robustheit (Zoé-Marlène / Kräuter- und Tränke-Meisterin) bleibt als Beleg für den Auto-Fit im Kern-Renderer. |
| **Multi-Up-Bogen 10×15** (`04-*`) | Guillotine-Schnitt, 3 | **Schublade** | Score-Korrektur: kantendurchgehender Guillotine-Schnitt ist Konfektionierung, kein Bastelbogen (`RENDER-SPEC:35-38`, „nie Rand-Ticks", „Multi-Up strikt PRO GAST"). Trotzdem v1 nicht nötig — reines Kostenwerkzeug. |
| **Sticker-Ganzbogen 1536×2126** (`09/10`) | 2 | **Schublade** | Spezifiziert und geparkt (`RENDER-SPEC:130-135`). Nicht v1, weil Panini-Sticker mit Kinderfoto die Einwilligungs-Schärfe aus `:136-140` und damit #108 vorziehen würden. |
| **Sticker-Einzelmotiv 900×1200** (`11-*`) | 0, aber 107–149 KB | **Schublade** | Verletzt heute Assert 7 (`RENDER-SPEC:116` „200 KB < Größe < 16 MB"). Wenn der Bogen je aufwacht, ist das ein Renderer-Qualitätsparameter, kein Design-Thema. |
| **Foto-Etikett 12×9** (`12-*`) | verworfen, Datei liegt unmarkiert im Ordner, 0 | **fliegt** (Datei archivieren) | `RENDER-SPEC:141-142`. Nur Aufräumen — plus die überholten Proben `05-urkunde-*` (Solo-Urkunde vor dem Kombi-Beschluss) und `07-heldenkarte-foto-demo` (Foto-Schiene = V1.5) gehören mit einem `_archiv/`-Präfix aus dem aktiven Set. |

**Bilanz:** von 24 Dossier-Artefakten fliegen 6 (Rollen-Zettel-Schere, Tischkärtchen, Etiketten, Logbuch, Stationskarten-Leiche, Antwortbogen-Phantom), 3 werden digital, 15 bleiben A4. Kein einziges Artefakt mit Score > 0 überlebt.

---

## 2. Der Pfad

### 2.1 Der Start-Block — **auf** dem Cover, nicht davor

Ein eigenes Blatt vor `shCover()` bricht die hartcodierte Zählung (`template.html:360` `<span>Seite 1</span>`, `:386` `foot('Seite 2 · Ablaufplan')`). Der Block sitzt deshalb **im** Cover, zwischen `.meta` (`:357`) und `coverSvg()` (`:358`); die dekorative Ribbon-Zeile „Alles für den großen Tag — in deiner Hand" (`:359`) weicht dafür. Kosten: null zusätzliche Seiten, keine Renumbering-Welle.

Alle drei Zeilen sind gerechnet, keine erfundene Frist (kein „minus 7 Tage" — die Motto-Daten legen den Materialkauf auf `minus2Weeks`):

> **Dein Start in 3 Schritten**
>
> **1 · Jetzt dran:** *[erste Stufe aus `naechsteStufe()` — bei abgelaufenen Fristen „Jetzt sofort", sonst „bis 14. Sep."]* — die Liste steht auf **Teil I**
> **2 · Noch offen:** *[`splitInvites().open.length`]* **Einladungen verteilen — Teil IV** *(Zeile entfällt bei 0 offenen, statt zu lügen)*
> **3 · Am 22. August, 15:00 Uhr:** Ablaufplan an den Kühlschrank — **Teil I**
>
> *Ohne Datum:* „Trag dein Datum im Planer ein, dann rechnen wir die Termine aus." (wörtlich derselbe Satz wie `template.html:416` — kein zweiter Textbestand.)

`naechsteStufe()` wird **aus** `shCountdown` (`template.html:389-421`) herausgelöst und von beiden benutzt. Keine zweite Datums-Arithmetik im Repo.

### 2.2 Die Toolbar — ein Weg, drei Knöpfe

Heute steht in `paket/ritter/index.html:36-41` neben dem Varianten-Umschalter genau ein Knopf: „🖨️ Drucken / als PDF sichern" — über ~20 Blätter, ohne Mengenansage. Künftig:

| Knopf | Beschriftung | Was er druckt |
|---|---|---|
| primär | **🖨️ Deine 5 Arbeitsblätter drucken** | Cover/Start, Ablaufplan, Einkauf & Menü, Spielkarten, Küchen-Zettel |
| sekundär | *Später: Urkunden & Einladungen drucken (8 Blatt)* | erst sinnvoll, wenn Zusagen da sind — Zähler aus `confirmedGuests()` |
| Textlink | *Alles drucken (N Blätter)* | vollständiges Nachschlagewerk |

Der Varianten-Umschalter verliert seine Rolle als Format-Entscheidung: `paket-core.js:234` wirft heute die erklärende Hälfte des Labels weg (`v.label.split('—')[0].trim()` macht aus „Standard — 3 Stunden, voller Knappen-Ausbildungs-Tag" den nackten Knopf „Standard"). Künftig: **volles Label**, die gebuchte Fassung markiert („aus deinem Plan", sie steht ohnehin fest via `paket-core.js:373-375`), die anderen zwei hinter „Andere Fassung ansehen". Beim Wechsel eine Warnzeile: „Achtung — Einkaufsliste, Zeitplan und Rollen ändern sich."

### 2.3 Was hinter den Nachschlage-Vorhang wandert

Auf dem Bildschirm bleibt alles sichtbar, aber in zwei Blöcken: **„Deine 5 Blätter"** (oben, offen) und **„Nachschlagen — wenn du es brauchst"** (unten, zugeklappt). Im Default-Druck sind das die Blätter außerhalb der Fünf:

- **Countdown-Liste** (Teil I) und **Countdown-Poster** — Vorbereitungsphase, nicht Partytag
- **Deko & Kuchen** — wird am Vorabend einmal gelesen
- **SOS-Karten** — Notfall-Nachschlag, kein Vorbereitungsmaterial
- **Urkunden, Einladungen** — Spätdruck, an Zusagen gebunden (eigener Knopf)
- **Danke + WhatsApp-Texte** — reiner Bildschirm-Inhalt, druckt nicht mehr mit

**Nicht hinter den Vorhang, sondern weg:** Tischkärtchen, Etiketten, Handzettel-Gitter, Logbuch, Stationskarten. Ein Vorhang versteckt schlechte Artefakte nur.

---

## 3. Lücken

Nur was ich am Repo verifiziert habe:

1. **Kein Einstieg, kein Pfad** — `render()` (`template.html:888-907`) reiht 16 Sektionen ohne Rangfolge; die einzige Handlungsaufforderung ist der Druck-Knopf. Ring 2 ist ungebaut. (§2 schließt das.)
2. **Kein Druck-Spickzettel, keine Papier-Ansage** — `RENDER-SPEC:104-106` nennt ihn „**gedruckter Druck-Spickzettel** als festes Paket-Element (Dateiliste, Mengen, Schiene, Preisfalle)". Im Produkt: 0 Treffer auf `Spickzettel|Fotodruck|navigator.share` unter `paket/`. Folge heute real: Handzettel fix 4× (`:847`), Urkunde 1× je Gast (`:630`) — niemand sagt, wie oft was gedruckt wird.
3. **Keine Mengen-/Preis-Skalierung (M6)** — Kopf rechnet um (`kostenKontext`, `template.html:295-318`), Posten und Σ nicht. Belegt an ritter-mittel/standard: Kopf „5 Kinder", Posten für 8, Σ 106 €.
4. **Kein Renderer für die gesamte Fotodruck-Schiene** — alle Proben in `_dev/druck-test/` sind hardcodiert (`13-*.html` CREW-Array, `15-*.html` Ida). Es gibt keinen Pfad Plan-Daten → JPEG, keinen Web-Share-Export, keine Datei-Nummerierung.
5. **Kein echter QR auf der Fotokarte** — `15-*.html:35` `<img src="_qr_demo.png">`, ein statischer Platzhalter. Ohne Token-QR ist die physische Einladung funktionslos.
6. **`name_m`/`name_w` fehlen in den Rollendaten** — `RENDER-SPEC:64-67` verlangt beide Formen als Datenfelder, Assert 5 (`:114`) prüft sie. Die Proben lösen das per Hand („Banner-Trägerin", „Drachen-Späherin"); im Datenmodell existiert es nicht.
7. **Keine Zusatzrollen-Regel auf der Fotoschiene** — `RENDER-SPEC:68-69` verbietet identische Karten bei Gästezahl > Rollenzahl. Die A4-Schiene löst es heute mit `________` (also mit dem Defekt), die Fotoschiene gar nicht. Der `epithets`-Fallback aus `ritter.json` (heute nur von den Tischkärtchen genutzt) schließt beides.
8. **Punch-Zone fehlt in beiden Kern-Proben** — `RENDER-SPEC:39-40` spezifiziert 15×15 mm mit Lochpunkt-Marker; `grep 'Punch|Loch|Band'` in `08-*.html` und `13-*.html`: 0 Treffer. Ohne sie hat die Bindungsregel kein Artefakt und die Karte kommt nicht an die Tüte.
9. **Keine Paginierung** — halbe, teils falsche Nummern (§1, Fußzeile).
10. **Motto-Drift im Logbuch** — `prinzessin.json` w46 fragt wörtlich „**Meine Crew (alle Piraten an Bord)**" auf einer Prinzessinnen-Party; ritter/piraten/prinzessin fragen weiter nach dem Schatz. (Erledigt sich mit dem Streichen des Blattes; die Datei steht ohnehin auf der Klärliste — SESSION-NOTES vom 11.08.: `paket/_maschine/manifeste/prinzessin.json` untracked, „Herkunft unklar".)

---

## 4. Gamechanger

### 🥇 Hero-Moment: **Die Siegerehrung**

Am Partyende bekommt jedes Kind seine **Urkunden-Heldenkarte 15×20** überreicht: Abzeichen, sein Rollentitel in korrektem Genus, sein Name groß (`08-*.html:32`, 185 px), 5/5 Sterne, seine eigene Tat-Zeile („Hat das Burgtor bis zuletzt gehalten."), Datum und Ort eingedruckt. Ein Objekt aus dem Fotolabor, 0,49 €, kein Schnipsel, keine Handschrift. Es hängt am Geschenkband an der Mitgebsel-Tüte — und ist damit gleichzeitig **Urkunde, Heldenkarte, Tischkarte, Tüten-Etikett und Dankeschön**. Fünf Bastelbögen sterben an einem einzigen Objekt, das besser ist als alle fünf zusammen. Das ist der Satz, mit dem sich das Paket verkauft: *„Am Ende hält jedes Kind etwas in der Hand, das nach ihm benannt ist."*

### 🥈 Der gerade Weg

Aus dem 20-Seiten-Nachschlagewerk wird ein Pfad: Start-Block auf Blatt 1, **5 Arbeitsblätter** als Default-Druck, alles andere im zugeklappten Nachschlage-Block, Spätdruck an Zusagen gebunden. Ein Erstnutzer klickt einen Knopf und hält fünf Blätter, die er wirklich benutzt — statt zwanzig, von denen er sechs zerschneiden soll.

### 🥉 Die Liste, die mitrechnet

Die Einkaufsliste ist das Blatt, das Eltern tatsächlich in die Hand nehmen — und heute das einzige, das sich auf demselben Blatt selbst widerspricht. Mit dem Mengengerüst rechnet sie Menge **und** Preis **und** Σ aus den echten Zusagen. Danach stimmt die einzige Zahl im Paket, die direkt Geld kostet.

---

## 5. Bauplan

**Zwei laufende Blocker respektieren:**
- **Druck-Gate (Bolles Bestellung)** — `_dev/druck-test/beispiel-paket/` (8 Urkunden 15×20 + Crew-Poster 20×30, gerendert 11.08. 08:50). `RENDER-SPEC:150-151`: „**Hartes Gate vor Pipeline-Bau.**" ⇒ **Schritte 9–13 rühren sich nicht**, bis Beschnitt, Farben und Kassenbon da sind.
- **Baustelle-Stufe-2-Re-Check** — Artefakte liegen bereit (`_dev/review/2026-08-11-baustelle-recheck-prompt.md` + 597-Zeilen-Patch, `979d324e→HEAD`). Der Patch fasst `template.html` an. ⇒ **Schritte 1–7 fassen `template.html` erst an, wenn der Re-Check durch ist** — sonst begutachtet der Gutachter einen Stand, den es nicht mehr gibt.

| # | Schritt | Inhalt | Abhängig von |
|---|---|---|---|
| **1** | **Ent-Schnipseln I — die Schere** | `shTableCards` komplett raus (tcells + lcells, `paket.css:163-187` tent-Block, Manifest-Wörter w30/w31/w32/w75/w76/w77 in 7 Dateien); `shStations()` + Aufruf `template.html:898` + w42/w43/w52-w55/w85 löschen; `shLogbuch` + w46/w47/w92-w95 löschen; Rollen-Zettel von ✂️-Chips auf nummerierte Vorlese-Liste (`epithets`-Fallback statt `________`) | Baustelle-Re-Check durch |
| **2** | **Ent-Schnipseln II — der Stift** | Handzettel-Gitter raus, WhatsApp-Text wird Hauptweg; `abholNote()` von `:853` auf den Küchen-Zettel; `screen-only` an `template.html:799`; Quiz-Label auf „zum Vorlesen" + Lösung in den Host-Kasten; Urkunden-Ausfüll-Linie `:627` durch eingedrucktes Datum/Ort ersetzen + Blanko-Text auf die Wahrheit ziehen; „Antwortbogen" aus 7 `data/motto/*.json` + 6-€-Posten; Deko-Mitgebsel-Text auf „Band statt Kleber" | 1 |
| **3** | **Linter-Stufe 34 — Schnipsel-Wächter** | FAIL bei `✂️|zum Ausschneiden|Ausschneide|Antwortbogen|_{6,}` in `paket/**`, `data/motto/*.json`, `paket/_maschine/manifeste/*.json`. Macht Doktrin 2 maschinell und hätte den 318-Quiz-Karten-Fall vom 06.08. gefangen | 1, 2 |
| **4** | **Poster + Fußzeilen** | 14 hardcodierte Nächte → Rechnung (1..28), ⬜ → gerechnete Zahl in 7 Manifesten, kein Poster ohne Datum; `foot()`-Nummern raus bzw. gerechnetes „Blatt N von M" | 1 |
| **5** | **Start-Block auf dem Cover** | `naechsteStufe()` aus `shCountdown` herausziehen, drei Zeilen ins Cover, Ribbon weicht; motto-neutral direkt im Template (kein neuer `{{wNN}}`-Slot → keine 7 Manifest-Edits); alle Mottos neu generieren, `paket/ritter/index.html` diffen | 4 |
| **6** | **Druckplan + Toolbar** | Blattzähler in `render()`, drei Knöpfe (§2.2), Varianten-Switch mit vollem Label + gebuchter Fassung + Wechsel-Warnung; screen-only Druckplan-Tabelle mit A4-Fallback je Zeile | 5 |
| **7** | **Mengengerüst M6 (nur Ritter)** | `proKind`/`basisMenge`/`preisProKind`/`fix` in `ritter-{klein,mittel,gross}.json`, `shShopping()` rechnet Menge + Preis + Σ aus `confirmedGuests()`, `kostenKontext()` beschriftet keine fremden Zahlen mehr | 1 |
| **8** | **🚦 Gate A4-Schiene** | Stufe 2, frischer target-blinder Tab (Opus 5 Max), raw-SHA-URL-Diff über Schritte 1–7; Linter 0 FAIL (jetzt 34 Stufen); Browser-Smoke mit drei Datums- und drei Zusagen-Fällen. **0 MAJORs = Ritter-A4 verkaufbar** | 1–7 |
| **9** | **Rollen-Daten für die Foto-Schiene** | `name_m`/`name_w` je Rolle in `ritter.json` cfg.roles + Tat-Zeilen-Feld + Zusatzrollen-Regel (`epithets`); Linter-Regel „jede Rolle trägt beide Formen" (Assert 5) | Druck-Gate durch |
| **10** | **Renderer-Kern 15×20** | `13-urkunde-crew.html` von CREW-Array auf `confirmedGuests()`; Canvas-Export 1800×2400, Asserts 1–9 maschinell (Safe-Zone, 5/5, Auto-Fit, sRGB, >200 KB); Punch-Zone + Lochpunkt-Marker nachziehen | 9 |
| **11** | **Crew-Poster + Einladungs-Fotokarte** | `14-*` auf Gästeliste; `15-*` auf 1800×2700 korrigieren, Emoji durch game-icons-Glyph ersetzen (`RENDER-SPEC:54`), QR aus dem echten Gast-Token; „vorher/nachher"-Satz gegen die Poster-Kollision | 10 |
| **12** | **Auslieferung** | Web Share „In Fotos sichern" + nummerierte Dateinamen + Druck-Spickzettel-Blatt mit gerechneter Mengen-/Kostentabelle (0,27 / 0,49 / 2,95 €) und Preisfallen-Warnung; A4-Fallback in jeder Zeile | 11 |
| **13** | **🚦 Gate Fotodruck-Ring** | Stufe 2 im frischen Tab + maschinelle Asserts + ein echter Testabzug. **0 MAJORs = Ritter-Schiff komplett** | 10–12 |
| **14** | **Aufräumen** | `12-etikett-*` als VERWORFEN archivieren, `05-*`/`07-*` als überholt kennzeichnen; `prinzessin.json`-Drift + die 3 untrackten Fremd-Dateien klären; Rest-Wörter (w89-w91/w44) aus den Manifesten | jederzeit, parallel |

**Kritischer Pfad zum verkaufbaren Ritter-A4:** 1 → 2 → 4 → 5 → 6 → 8 (7 und 3 laufen parallel dazu). **Zum kompletten Schiff:** + Druck-Gate → 9 → 10 → 11 → 12 → 13.

---

## 6. Verworfen (Reviewer-Gedächtnis)

| Behauptung / Vorschlag | Warum er nicht hält |
|---|---|
| „`shStart()` als eigenes Blatt **vor** `shCover`" | Bricht die hartcodierte Zählung (`:360` „Seite 1", `:386` „Seite 2") — unnummeriertes Blatt vor Seite 1. Block gehört **auf** das Cover. |
| „Bis \<Datum minus 7 Tage\>: Einkauf" | Handerfundene Frist; die Motto-Daten legen „Material bestellen" auf `minus2Weeks`. Musterzahl-Dublette = Doktrin-1-Bruch. |
| „Cover im Druck hell/Pergament" | Kippt Gate-MAJOR 4 vom 30.07. (`paket.css:262-263`: Creme-Text auf Pergament war unlesbar). Tinten-Hebel ist `coverSvg()` (72 % Blatthöhe), nicht der Verlauf. |
| „`display:none` aufs Cover" | Dann trägt gedruckte Seite 1 die Fußnote „Seite 2" — nur zulässig, wenn Zählung + Start-Block vorher umziehen; das ist eine eigene Entscheidung, keine Nebenwirkung. |
| „randlos navyblaue Tintenfläche" | `@page{size:A4;margin:11mm}` (`paket.css:255`) — 188×272 mm mit weißem Rand. Befund bleibt, Formulierung war falsch. |
| „die einzige Handlungsaufforderung ist der Druck-Knopf" | Die Toolbar trägt zusätzlich den `vswitch` (`ritter/index.html:39`, gefüllt in `paket-core.js:233-236`). Verschärft den Befund, widerlegt den Satz. |
| „Cover trägt nur, was ich schon weiß" | `ritter.json` w15 druckt die gerechnete Zusagen-Zahl („**5** Ritter auf der Burg"). |
| „Antwortbogen bauen" | Ein neues Ausfüll-Blatt verletzt Doktrin 2. Die Lücke wird durch **Streichen** geschlossen (Material, Schritt, 6-€-Posten). |
| „zweite Blanko-Urkunde anhängen, damit der Text stimmt" | Vermehrt genau die Handbeschriftungs-Artefakte, die der 11.08.-Beschluss abschafft. Text auf die Wahrheit ziehen. |
| Countdown-☐ als Schnipsel (Score 3) | Doktrin 2 nennt Ausschneide-Bögen, Ausfüll-Striche, Papierfetzen — Abhaken ist keine Handschrift. Score real 0. |
| Stempel-Plan als Ausfüll-Artefakt (Score 2) | Das Heft ist ein gekaufter Posten, die Feldzahl kommt aus `buildTimeline()`. Unser Papier verlangt nichts. Score real 0. |
| Multi-Up-Bogen als Schnipsel (Score 3) | Kantendurchgehender Guillotine-Schnitt ist Konfektionierung, kein Bastelbogen (`RENDER-SPEC:35-38`). Bleibt trotzdem Schublade. |
| Cover-Befund als „Gamechanger" | Der Ring-2-Punkt ist protokolliert bekannt („Dossier ist 20-Seiten-Nachschlagewerk ohne Pfad"). Beitrag ist die Verortung auf Blatt 1, nicht die Entdeckung — MAJOR ja, Gamechanger nein. |