# Stufe-2-Review der 45 Einladungsspiele — Wave (Start 01.07.2026)

**Reviewer:** frischer claude.ai-Tab via Chrome-MCP, Bolle-Device, **Opus 4.8 Hoch** (Fable 5 weiter „Currently unavailable"), target-blind. Chat: `ec73876c` („Kritische Bewertung von vier Geburtstagseinladungs-Spielen").

**Status:** Charge 1 von 3 abgeschlossen + Stufe-3-verifiziert. 45/45 Spiele lokal gebaut/verifiziert, alles auf **draft, uncommitted**.

---

## ⚠️ ENTSCHEIDUNG FÜR BOLLE (systemisch, betrifft ALLE 45 Spiele)

**Befund (MAJOR, vom Reviewer als Top-1 priorisiert):** Die MIT-Foto-Schlusszeile sagt durchgängig „… **bist DU**!" (z. B. „der Captain bist DU", „die kostbarste Perle bist DU"). Das Reveal zeigt aber das **Foto des Geburtstagskindes** — während der spielende **Gast** liest (und per `?g=` mit „{Gastname}, …" angesprochen wird). → Referent-Bruch: Text adressiert den Gast, Bild zeigt eine andere Person. Am härtesten bei „der geheime **Party-Gastgeber** bist DU" (ein Gast ist per Definition NICHT der Gastgeber). Zusätzlich misgendert „Gastgeber/Stargast" (maskulin) weibliche Geburtstagskinder — inkonsistent zum eigenen Standard („HELD:IN", „Heldin oder Held").

**Warum nicht autonom gefixt:** Cross-cutting über alle 45 Spiele + mögliche neue Daten-Anforderung (Vorname des Geburtstagskindes für die Schlusszeile). Das ist eine Produkt-/UX-Entscheidung.

**Optionen:**
- **A)** Schlusszeile auf das abgebildete Kind beziehen, per Name: „… und der Captain ist **{Kindname}**! Komm zu seiner/ihrer Party:" → braucht Kind-Vorname-Feld (in der echten Motto-App ohnehin bekannt; im Prototyp nur `?g=` Gast).
- **B)** „DU" behalten, aber Gast korrekt feiern statt falsche Rolle: „So einen Captain wie **dich** braucht die Crew — komm zur Party!" (Foto bleibt als „Star des Tages"-Reveal).
- **C)** Status quo akzeptieren (Foto = freudiges „Ta-da", „DU" = Hype) — Reviewer hält das für den schwächsten Weg.

→ **Bis zur Bolle-Entscheidung bleibt die „bist DU"-Zeile unverändert.** Danach 1 Sweep über alle 45 Spiele + zugleich „Gastgeber/Stargast"→inklusiv/Name.

---

## Charge 1 — 4 Spiele (fingerabdruck · akte · stadt · strahl)

### A) Sofort gefixt + re-verifiziert (Stufe-3)
| # | Spiel | Finding | Fix |
|---|---|---|---|
| F2.1 MAJOR | akte | „Was knackt **jeder** Spürnase" (Deklination) | → „Was **löst jede** Spürnase" (löst zugleich F2.3 Idiom-Falle „Nuss knacken" → „den Fall" eindeutig richtig) |
| F1.4 MINOR | fingerabdruck | „mit dem **Pinsel-Finger**" (Werkzeug doppeldeutig) | → „mit dem **Finger**" |
| F4.3 MINOR | strahl (OHNE) | „**zerstiebt**" (Vokabular zu hoch 4–12) | → „**zerplatzt**" |
| F3.2 MINOR | stadt | „fang **alles** auf" widerspricht „Schutt vorbei" | → „fang die **guten Sachen** auf … bevor **sie** den Boden erreichen" |
| F3.4 UNSICHER | stadt | fallende 🐱 = „Tier in Gefahr" (sensible 4–6) | GOODS 🐱 → ⭐ |

### B) Per Code widerlegt (Reviewer-Irrtum, kein Fix) → für OFFENE-REVIEW-PUNKTE
- **F3.1** (stadt, „verstecktes hartes Scheitern"): Code spawnt **dauerhaft** (`spawnT` alle 820 ms) bis 6 gefangen → kein unlösbarer Zustand. UNSICHER aufgelöst.
- **F3.3** (5 Emojis/6 Dinge): betraf nur die Inventar-Notiz im Review-Prompt, nicht den Spiel-Text. `GOODS` zieht zufällig — ok.

### C) Offen/weich (kein Fix nötig, dokumentiert)
- **F2.4** (akte Q1 „Fußspuren" schwach logisch): vertretbar playful, belassen.
- **F4.2** (strahl Timing für 4–6 schwer): Trefferzone 30 % breit + unendliche Versuche = fair; Auto-Assist optional.
- **F4.4 / F3.4-Ton** („Wehr ab", „Stadt in Gefahr"): explizit defensiv → grenzwertig ok.
- **Lowercase-Check** nach „{Name}, ": Reviewer bestätigt **alle sauber** (Artikel/Präposition/Interjektion) — der akte-Fix von letztem Tick hat gegriffen.

---

## Charge 2 — 5 Spiele (hochhaus · rohre · striegeln · hufeisen · lianen) — chat `8469947a`

### A) Sofort gefixt + verifiziert
| # | Spiel | Finding | Fix |
|---|---|---|---|
| F4.1 MAJOR | hufeisen | „Ringer" = im Deutschen **Wrestler** (engl. „ringer" = Pfosten-Treffer) | Intro+HUD „Ringer" → „**Treffer**" (verifiziert: HUD „Treffer 0/3", Win ok) |
| F3.1 MAJOR | striegeln | Intro „schau, **wer** da zum Vorschein kommt" bricht im OHNE-Pfad (Pony=„was") | → „was darunter zum Vorschein kommt" |
| F2.1 MAJOR | rohre | Intro „zeigt, **wer** Bauleiter ist" bricht OHNE | Intro person-neutral „…durch die ganze Leitung — und die Baustelle läuft!" |
| F2.2 MINOR | rohre | OHNE „Leitung … Leitung" Doppelung | → „… frische Leitung — alles dicht!" |
| F1.1 MINOR | hochhaus | „das **höchste** Hochhaus" (leerer Superlativ, fix 6 Etagen) | H1 → „Bau dein Hochhaus bis zum Richtfest!" |
| F1.2 MINOR | hochhaus | „Etage" vs „Stockwerke" gemischt | → durchgehend „Etagen" |
| F1.3 MINOR | hochhaus | OHNE „**Richtkrone**" (Kindern unbekannt) | → „Ganz oben weht die Fahne …" |
| F5.1 MINOR | lianen | OHNE „bezwungen" (martialisch/hoch) | → „Dschungel geschafft!" |

### B) Per Code widerlegt / mitigiert (kein Fix) → OFFENE-REVIEW-PUNKTE
- **Q1** (Name an Headline → Substantiv klein): `guestName()` schreibt **nur** `#winWho`, NIE `#winTitle` → kein Risiko.
- **Q2/F2.3** (verstecktes Feststecken): hochhaus `Math.max(12,…)` Mindestbreite; rohre/regenbogen nächster Knoten **dauerblinkt**; lianen/stadt spawnen endlos → kein Stuck.

### C) An die Bolle-„bist DU"-Entscheidung gekoppelt (MIT-Zeilen, NICHT gefixt)
- **F4.2** hufeisen „im Sattel sitzt DU" (Wurf-Mechanik, kein Reiten) · **F5.2/F5.3** lianen „Dschungel-Boss … wartet … das bist DU" (Anglizismus + „wartet auf sich selbst") · **F1.4** hochhaus „auf dem Dach stehst DU".
- **Systemisches Muster (Reviewer):** Sobald ein Intro „wer" verspricht, muss der OHNE-Pfad ein Ersatz-Subjekt liefern oder „wer" raus. → beim Bolle-Sweep alle Intro→OHNE-Paare gegenchecken.
- **⚠️ Charge-3-Vorgriff:** regenbogen „… wartet **DU**" + sternenstaub „… erscheint **DU**" haben Verb-Kongruenz-Fehler (müsste „wartest/erscheinst DU"). Korrekt NUR falls DU-Framing bleibt; bei Name-Framing („… wartet Lena") ist 3. Person richtig → daher an die Bolle-Entscheidung gekoppelt, nicht vorab gefixt.

## Catalog-Sweep „Intro verspricht *wer* → OHNE liefert nur *was*" (unabhängig, Charge-2-Reviewer empfohlen)

Grep über ALLE `game-*.html`-Intros + Gegencheck der OHNE-`winWho`-Zweige. **Treffer auch in bereits Stufe-2-grünen Spielen** — gehört zur Bolle-Reveal-Sweep-Zone, NICHT autonom in grünen Spielen geändert:

| Spiel (Status) | Intro verspricht Person | OHNE-Reveal liefert | Bruch |
|---|---|---|---|
| sternbild-weltraum (grün) | „zeigt, **wer** der Captain ist" | „Eine Rakete erstrahlt am Sternenhimmel" (Objekt) | **ja** |
| tatort-prinzessin (grün) | „die heimliche **Hauptperson**" | „Die Kronjuwelen funkeln wieder" (Objekt) | **ja** |
| wappen-ritter (grün) | „**wessen** Wappen das ist" | „Ein funkelndes Ritter-Wappen" (Objekt) | grenzwertig |
| loeschen-feuerwehr (grün) | „schau, **wer** … in Sicherheit" | „…hat alle in Sicherheit — Einsatz-Held!" | mild |
| memory-piraten (grün) | „decke auf, **wer** es ist" | Käpt'n-Papagei springt aus Truhe (Person-Ersatz) | ok ✓ |

**Fix-Richtung (für Sweep):** entweder Intro person-neutral, ODER OHNE ein Person-/Maskottchen-Subjekt geben (wie memory-piraten es vorbildlich macht). Letzteres erhält den MIT-„wer"-Hook. striegeln + rohre (neu) wurden bereits per Intro-Neutralisierung gefixt.

## Charge 3 — 4 Spiele (wildnis · regenbogen · sternenstaub · funk) — chat `ef31e583`

### A) Sofort gefixt + verifiziert
| # | Spiel | Finding | Fix |
|---|---|---|---|
| F2.1 MAJOR | regenbogen | „wartet **DU**" Verb-Kongruenz | → „**wartest** DU" (verifiziert) |
| F3.1 MAJOR | sternenstaub | „erscheint **DU**" Verb-Kongruenz | → „**erscheinst** DU" (verifiziert) |
| F1.1 MAJOR | wildnis | OHNE-Pfad ohne Figur am Baumhaus (MIT hat „Chef-Entdecker") | OHNE → „Im Baumhaus wartet schon der **Dschungel-Tiger** — alle Papageien gefunden!" (Parität zu S2–S4) |
| F2.2 MINOR | regenbogen | „Farben **stehen**" (unidiomatisch) | → „Farben **leuchten**" |
| F3.2 MINOR | sternenstaub | Flocken/Funken/Sternenstaub gemischt | Intro „Sternenstaub-**Funken**" |
| F1.3/C2 | wildnis | „der letzte" elidiert; „5 Papageien" | → „der letzte **Papagei**"; „**fünf** bunte Papageien" |
| F4.2 MINOR | funk | „Glyphen" zu hoch | → „**Zeichen**" |
| C3 (Ton) | mehrere | „vollbracht/vollendet/geglückt/Mission gelungen" gehoben | sternenstaub „Zauber **funkelt**"; regenbogen „Brücke **fertig**"; funk „**geschafft**"; wildnis „**gefunden**" |

### B) Bestätigt sauber (Reviewer + Code)
- `{Name}`-Transform bricht kein Substantiv — alle Schlusssätze starten mit Präposition/Pronomen/Artikel. Guardrail notiert: Schlusszeilen nie mit Substantiv beginnen.

### C) An Bolle gekoppelt (NICHT autonom)
- **F4.1 MAJOR (NEU, wichtig):** funk = Simon/Merkfolge bis Länge 5 → für 4–6-Jährige (Merkspanne ~2–3) **de-facto hartes Scheitern** (Endlosschleife ohne Reveal) — verletzt die „kein Scheitern"-Zusage. **Betrifft alle 3 Simon-Spiele** (funk · Helden-Signal · Glühwürmchen, alle GOAL=5). Optionen: Simon auf 7+ altersgaten ODER Länge 3–4 kappen ODER „tippe die leuchtende Glyphe"-Assist. → **kein Param-Alleingang über grüne Spiele.**
- **F4.3** funk „der Funkspruch kam von DIR" = Rollen-Inversion (Kind ist Empfänger/Echo, nicht Absender) — MIT-Zeile, an Reveal-Sweep gekoppelt.
- **C1/C4** Reveal-Muster vereinheitlichen (S1-Muster „… wartet der/die [Rolle] — und das bist DU!") + DU/DIR-Versalien-Stil-Entscheidung.

---

## ✅ Stufe-2-Wave-Status (01.07.2026)
**Alle 45 Spiele Stufe-2-abgedeckt:** Charge 1–3 (13 neue Spiele) heute reviewt; feuerwehr/meerjungfrau/feen + 14 Erstwellen-Spiele in früheren Wellen. **Detail-Fixes (Charge 1–3): 22 Stück gesetzt + verifiziert, 0 JS-Errors, alles auf draft.**

**4 systemische Entscheidungen für Bolle (blockieren Live, NICHT autonom):**
1. **„bist DU" vs. Foto des Geburtstagskindes** (Referent) + maskuline Rollenwörter → alle 45.
2. **Reveal-Person-Parität:** Intro verspricht „wer", OHNE-Pfad muss Person/Maskottchen liefern → Sweep-Liste oben (sternbild·tatort·wappen·loeschen + ggf. weitere).
3. **Simon-Schwierigkeit (F4.1):** Länge-5-Merkfolge zu hart für 4–6 → altersgaten/kappen/assist über funk·Helden-Signal·Glühwürmchen.
4. **Reveal-Stil:** S1-Muster vereinheitlichen + DU/DIR-Versalien.

Nach Bolles Calls: 1 Sweep über alle betroffenen Spiele, dann §6/§12 Stufe-2 grün setzen + Deploy-Vorbereitung.
- (feuerwehr/meerjungfrau/feen bereits Stufe-2-grün; die 14 Erstwellen-Spiele in `2026-06-30-*`-Handoffs)

**Sende-Rezept claude.ai (etabliert):** `execCommand('insertText')` in `.ProseMirror` → `computer left_click` in den Editor → `computer key "Return"` (React-Send-Button bleibt ausgeblendet, Enter sendet das echte ProseMirror-Doc; URL wechselt zu `/chat/…` = gesendet).
