# Geil-Programm — Reviewer-Bauplan + Umsetzungs-Checkliste (02.07.2026)

**Mandat (Bolle):** „Bitte mach die Spiele einfach geil. Frag den reviewer mehr aus."
**Quelle:** Fable-5-Max-Reviewer-Chat 885492ce (hat alle 45 Dateien aus Commit aa469c4 gelesen), Bauplan TEIL A–F, von Haupt-Claude Stufe-3-verifiziert gegen 23-Dateien-Inventar (Workflow wnv7va8l8).
**Score-Baseline dieser Welle:** Set-Ø 60,5; gekoppelte Spiele W~76 vs. angeklebte W~39.

## Ermessens-Abweichungen vom Bauplan (dokumentiert)
1. **KEIN core.js/core.css-Umbau** (Reviewer wollte sharpen(el,frac)+.mphoto zentral): bestehendes Muster in 12 Dateien ist inline; drittes Muster + 45-Dateien-Cache-Bump = mehr Risiko als Nutzen. Inline-sharpen pro Datei bleibt. → Kein Version-Bump nötig, solange core unangetastet.
2. **hufeisen-Twist:** „Wandernder Pfosten" (px-Flugbahn dynamisch) ersetzt durch **Wind-Twist** (Trefferzone wandert nach jedem Wurf) — gleicher Differenzierungs-Effekt (bewegtes Ziel), deutlich robuster. Zonenbreite altersgestaffelt 40/30/22.
3. GOAL-Staffeln huerden/lianen: Reviewer 4/5/6 übernommen (statt eigener 3/4/5).

## Standard-Muster pro Datei (alle Einbauten)
- Foto-Element in Spielszene: `position:absolute`, `background-image:var(--photo)`, opacity 0, `blur(16px)`, transition .5s, `pointer-events:none`, `.big`-Klasse (scale 1.3) für Win-Beat.
- `function sharpen(frac)`: opacity 0.3+0.7f, blur 16(1−f²), saturate 0.5+0.5f, brightness spiel-spezifisch.
- Aufruf im Erfolgszweig des Progress-Treibers; `sharpen(0)` + `.big`-Remove im startBtn-Reset.
- Win-Beat VOR show('s-win'), Delay auf 900–1000ms angehoben.
- Sichtbarer Tipp: Spielzustand so setzen, dass die NORMALE Erfolgsfunktion durchläuft (nie Counter direkt inkrementieren).
- Alters-Staffel als const mit ageNum()-Ternary; Zonen-/HUD-Anpassung im startBtn.

## Checkliste (Stand nach Batch 1+2)

### ✅ Fertig
- [x] **huerden-pferde**: .goalphoto Siegertafel (frac=cleared/GOAL in jump), GOAL 4/5/6, SPEED 1.7/2.4/3.0, SPAWN 1600/1300/1050, ZONE 22-46/26-40/28-38 (Zone-CSS im startBtn), tip=Hürde in Zone+jump(), Win-Beat Pferd galoppiert zu 52% + .big, winWho „Das Siegerbild überm Zieltor zeigt kid()"
- [x] **lianen-dschungel**: .hutphoto Baumhaus-Guckloch (rund, Holz-Rahmen), Staffel identisch huerden, tip=Liane in Zone+swing(), Win-Beat Affe schwingt zu 56% + .big, winWho „Durchs Baumhaus-Fenster strahlt der Dschungel-Boss"
- [x] **hufeisen-pferde**: .stallSign (frac=hits/3 in throwShoe), STEP 3.5/5/6.5, **Wind-Twist**: windZone() nach jedem Wurf (zLo=28+rand*(68-ZW), ZW 40/30/22), Flugbahn-Checks auf zLo umgestellt, tip=power=(zLo+zHi)/2+throwShoe(), Intro+hudHint erzählen Wind, winWho „am Stall-Schild strahlt kid()"
- [x] **strahl-superheld**: .skySignal top:6% right:7% (frac=hits/3 in fire), STEP+ZONE-Staffel (48-88/55-85/60-82, Zone-CSS in startGauge), tip=power=Mitte+fire(), Win-Beat Beam+.big+zap, winWho „am Himmel leuchtet das Helden-Signal mit kid()"
- [x] **katapult-ritter**: STEP+ZONE-Staffel wie strahl, tip=power=Mitte+fire() (Boulder fliegt echt). Kopplung existierte (Tor).

### ✅ Fertig (Batch 3+4)
- [x] **bagger-baustelle**: .goalPhoto im #goal-Banner, frac=progress/100 in setProg() (Bump macht unschärfer), Goal fährt ab 55% ein, Staffel ADV/FALL/SPAWN/MALUS, Win-Beat Bagger fährt hoch (bottom 72%) + .big, Delay 1000
- [x] **jeep-safari**: wie bagger + **Foto-Stopps-Twist** (ANIMALS 🦒🦓🐘 Quote 0.2, snapAnimal() Blitz #flash + sfx.snap + HUD 📸-Zähler), winWho „Der ganze Weg führte zum Camp-Schild"
- [x] **korallen-meerjungfrau**: .locket am Meeresgrund (70px), frac=collected/GOAL, flyToLocket()-Animation, Staffel FALL/SPAWN/RADIUS/PQUOTE, tip=Meerjungfrau unter Perle/spawn(mermaidX), Win-Beat Glissando+.big, Delay 900
- [x] **stadt-superheld**: .billboard am Himmel (104×72), frac=saved/GOAL, Staffel wie korallen (GQUOTE), tip=Held unter Teil/spawn(heroX), Win-Beat Held fliegt hoch (bottom 42%)+.big, Delay 900

### ✅ Fertig (Batch 5+6)
- [x] **hochhaus**: .rf Richtfest-Plakat (top-right, Kran bleibt mittig), frac in drop(), SPEED/PERF/MINW-Staffel, Win-Beat .big+perfect, Delay 1000
- [x] **turm**: .rbPhoto unterm Regenbogen, **Windböen-Twist** (SPEED*(0.78+sin(t/400)*0.44) + jede 2. Wolke von rechts), rainbow.pulse-Beat, Staffel wie hochhaus
- [x] **faehrte**: .nestPhoto hinter 🥚 (in build() erzeugt!), frac in tap(), Win-Beat 🥚→🐣+Knack+.big, Delay 900, **tip() NEU** (tap(next))
- [x] **spuren**: .mirror Wasserloch-Spiegelung + **Schleich-Twist** (Gazelle 🦌 watch/away-Loop, WATCH 900/1200/1500, AWAY 2300/1800/1400, bei watch kein Fortschritt/kein Rückschritt), tip()=watching aus+tap(next), Delay 900
- [ ] **schwert-ritter**: .mphoto #mirror Klingen-Spiegelung in #forge (78px, hinter #blade), frac=forge/100 in strike(), Win-Beat Pop+Dampf-noise, Delay 800 bleibt, winWho „Blank poliert — in der Klinge spiegelt sich kid()". Staffel: hot-Schwelle glow>=45/58/66.
- [ ] **rakete-weltraum**: .rwindow 38→56px + in boost() brightness(0.6+thrust*0.004) — Bullauge hellt mit Schub auf. Staffel: hot 45/58/66.
- [ ] **drehleiter-feuerwehr**: .mphoto #gable Giebelfenster top:4px mittig am Haus (62px), frac=rescued/3 in extend(), Win-Beat ang=78+renderLadder() (Leiter richtet sich zum Giebel), Delay 650→1000, winWho „oben im Giebelfenster winkt kid()". Staffel: Schwung 0.85/1.2/1.55, TOL 17/13/9.
- [ ] **notruf-feuerwehr**: #monitor nach #slots (120px, border #7a8aa8) mit .mphoto + .mstatic Scanline-Overlay (Muster funk), frac=pos/3 in dial(), Win-Beat .mstatic→0 + sharpen(1), Delay 900→1000, winWho „Mit jeder Zahl wurde das Funkbild klarer — am anderen Ende jubelt kid()".
- [ ] **sternenstaub-einhorn**: .mphoto #dustPhoto mittig 42% (110px), frac=collected/GOAL in collect(), Funke fliegt per animate() 260ms zum Foto vor pop(), Win-Beat Pop+Wand-Glow max+✦-Spans, Delay 600→800, winWho „der Sternenstaub formt ein Bild: kid()". Staffel: GOAL 6/8/10, spawnT 500/650/800, Lebenszeit 2400/1700/1200.
- [ ] **fingerabdruck-detektiv**: Foto ALS Board-Hintergrund (statt SVG-Print), SVG als .printLayer (opacity .35, multiply) DRÜBER, **.faceguard aus fossil übernehmen** (Gesicht-zuletzt-Pflicht!, Farbe rgba(44,46,56,.92)) + .board.fade .faceguard{opacity:0}, frac=erased existiert, Win-Beat Kamera-Blitz+Shutter, Delay 700→950, winWho „das Beweisfoto zeigt kid()". Staffel: GOAL_ER 0.55/0.68/0.8 statt fix 0.7.
- [ ] **akte-detektiv**: #dossier (110px) mit .mphoto + 3 Zensur-Balken .bar; in pick() Korrekt-Zweig: bars[qi] kippt weg + sharpen(solved/3), Win-Beat 3. Balken + „GELÖST"-Stempel, vor show 800ms (aktuell 0!), winWho „Drei richtige Spuren, drei Balken weg — in der Akte steckt kid()". **+ tip() NEU** (fehlt komplett): richtige Antwort markieren+klicken.
- [ ] **flaschenpost-piraten**: nur Staffel prog+=13/9/7.
- [ ] **laterne-feen**: nur Staffel prog+=12/8/6.
- [ ] **schatz-meerjungfrau**: Staffel Blasen 1.8/2.4/3.0, spawnT 430/520/650, GOAL 8/10/12, Blasengröße 32/24/20+.
- [ ] **kanone-piraten**: Planken-Raster 3×3/3×4/4×4.
- [ ] **taunetz-feen** Twist „Licht folgen": order=shuffle, Nummern-Texte raus, Führung nur .next-Puls+Ton → einziges Connect ohne Zahlen (4 J.).
- [ ] **perlen-meerjungfrau** (TEIL E): #bigShell unten mittig (120×96): .shTop/.shBot Halbschalen + .pearlPhoto (VERDECKT bis Finale = Guard); pro sorted: shTop rotate(−(sorted/GOAL)*26deg) + wachsender Glow (Foto bleibt verdeckt); Win-Beat: shTop −75°, shBot 10°, .pearlPhoto Pop + Glissando + ✦, Delay 650→1000, winWho „die große Schatz-Muschel öffnet sich, und darin schimmert kid()". Staffel GOAL 5/8/8? (Bauplan: keine — eigenes Ermessen: GOAL 6/8/10 + sortInto-Timeout).

### 🔲 TEIL F Juice (nach A/B/C)
signal Blackout-Snap+Bass; uvschrift Runen-Kaskade+Wärmer-vib; memory Herzschlag vorm letzten Paar; wappen Einrast-Beat+goldene tip-Kachel; kanone letzte Planke Zeitlupe; fossil Doppel-Herzschlag+brush-freq; loeschen Dampf-Finale+Balken grün; funk Static-Flacker+Antwort-Blips.

### Gate danach (Task #59)
45er-iframe-Playtest (localhost:8765, k/g/age, tip-drive, 0 JS-Fehler; huerden/lianen/hufeisen/strahl/katapult mit age=5 UND age=11 testen — Zonen/GOAL variieren jetzt), Commit draft, frische Stufe-2-Welle auf raw-SHA der geänderten Dateien, Stufe 3, Befund-Tabelle. KEIN Deploy (nur „Ende deploy").

## LIVE-STATUS (wird fortgeschrieben; maßgeblich bei Konflikt mit Checkliste oben)
FERTIG (18): huerden, lianen, hufeisen, strahl, katapult, bagger, jeep, korallen, stadt, hochhaus, turm, faehrte, spuren, drehleiter, notruf, sternenstaub, schwert, rakete
- drehleiter: #gable + SW_STEP 0.85/1.2/1.55 + TOL 17/13/9, Win ang=78
- notruf: #monitor (monPhoto+mstatic), frac=pos/3, Win mstatic→0
- sternenstaub: #dustPhoto + flyToPhoto, GOAL 6/8/10, SPAWN 500/650/800, DRIFT 2400/1700/1200, tip NEU
- schwert: #mirror, HOT 45/58/66, tip NEU (glow=100+strike)
- rakete: .rwindow 56px + brightness/blur an thrust gekoppelt, HOT 45/58/66, tip NEU
NOCH OFFEN: fingerabdruck (Foto unter Puder + faceguard PFLICHT + GOAL_ER 0.55/0.68/0.8), akte (Dossier-Zensurbalken + tip NEU), perlen (Muschel-Beat TEIL E), taunetz (Licht-Twist), Staffel-only: flaschenpost 13/9/7, laterne 12/8/6, schatz (Blasen 1.8/2.4/3.0, spawnT 430/520/650, GOAL 8/10/12), kanone (Raster 3×3/3×4/4×4). Danach: Juice TEIL F + 45er-Playtest + Commit draft + Stufe-2-Welle.
