# Alt-Livespiele -> core.js-Rebuild-Specs (11.07.2026)

Read-only aus den 15 alten React-Gast-Apps (einladung/<motto>/whatsapp/) extrahiert. Zweck: originalgetreuer core.js-Rebuild als 4. Spiel pro Motto - Mechanik/Charme bewahren, aber reveal-last-konform + No-Fail + Magic-Moment + 3 Alters-Stufen. Danach Doppelgate.

**Kern-Muster aller 15:** heute ist das Kind-Foto der fliehende Fang-Sprite (Gesicht die ganze Chase sichtbar = reveal-last verletzt). Rebuild: fliehende Figur = MOTTO-Sprite, Foto erst beim Fang scharf = Magic-Moment.

## 1. piraten
**Titel:** "Käpt'n Rotbarts Insel" — 2-Phasen-Piraten-Schatzsuche. React-Component `PiratenInsel` (Zeile 471), gerendert nach `#root` (Z. 1863). Datei: C:\Users\Bolle\OneDrive - ADVERGY GmbH\Dokumente\Claude\Projects\machsleicht\machsleicht-deploy\einladung\piraten\whatsapp\index.html (~190 KB, minifizierte React 18.3.1 im Kopf ignoriert; lesbarer Spielcode ab Z. 355). Props (Z. 471-478): childName="Mattis", partyDate, partyTime, partyPlace, rsvpPhone="491701234567", fotoUrl=null. URL-Param-Mapping (Z. 1854-1862): name, date, time, ort, tel, foto (foto nur akzeptiert wenn `https://party.machsleicht.de/api/invimg/…` ODER non-http → als base64-JPEG behandelt).

**Story / Rahmen:** Rahmen: Einladung als Mini-Abenteuer auf einer Pirateninsel. Der Titel-/Intro-Screen (phase==="intro", Z. 1185-1303) zeigt gestaffelt: Kicker "Einladung zu" (Z. 1210) → "Die Piratenschatzsuche von {childName}" (Z. 1218) → großes bobbing 🏴‍☠️-Emoji (Z. 1224) → H1 "Käpt'n Rotbarts Insel" (Z. 1232, wörtlich: "K\xE4pt'n Rotbarts Insel") → Aufgabe "Hilf **{childName}** die 3 Schätze zu finden!" (Z. 1241) → drei Belohnungs-Chips [🪙 Münze, 🪙 Münze, 💰 Schatz!] (Z. 1247-1255) → Bedien-Hinweis "👆 Halte gedrückt um auszugraben" (Z. 1289) → Start-Button "🗺️ Los geht's!" (Z. 1303, setzt phase="play", Z. 1290).

Der Spieler schlüpft implizit in die Rolle des Helfers, der für das Geburtstagskind {childName} die verbuddelten Schätze auf der Insel ausgräbt. Play-Kopfzeile: "🏴‍☠️ Finde den Schatz!", während der Jagd "🏴‍☠️ Piratenjagd!" (Z. 1518). Unten laufender Kontext-Hinweis (Z. 1548-1556): found 0 → "👆 Halte einen Gegenstand gedrückt zum Ausgraben!", found 1 → "🪙 Eine Münze! Finde noch 2 Schätze!", found 2 → "🔥 Noch einer! Wo ist die Truhe?", chase → "⚔️ Fang den Piraten!". Story-Twist zur Halbzeit: beim Ausgraben der Truhe klaut ein Pirat den Schatz — daraus wird die zweite Spielphase (Jagd).

**Mechanik (Schritt fuer Schritt):** Zwei Phasen, gekoppelt über eine feste Klick-Dramaturgie.

STATE: phase "intro"→"play"→"won" (Z. 482); chasePhase "idle"→"cinematic"→"chase" (Z. 531). revealed=Set gegrabener Item-IDs, found=Array ["coin","coin","treasure"], tapCount=Zähler erfolgreicher Grabungen (Z. 479-482).

ITEMS (Z. 364-418): 9 statische Fund-Objekte mit Emoji-Cover + fixen Prozent-Positionen: fass 🛢️(18,48), muschel 🐚(72,56), holz 🪵(48,64), stein 🪨(82,42), koralle 🪸(28,74), krabbe 🦀(62,80), anker ⚓(10,65), seetang 🌿(88,70), kompass 🧭(45,88). Nicht-gegrabene Items schweben ("gentle 3.5s"-Anim, Z. 1684) mit leichtem Blur-Schatten (Z. 1702).

PHASE 1 — GRABEN (Long-Press):
- Interaktion: onPointerDown auf ein Item → startPress (Z. 784). Gesperrt wenn phase≠"play", Item schon gegraben oder chasePhase≠"idle" (Z. 785-786).
- Halten: PRESS_DURATION=800 ms (Z. 492). pressProgress animiert via requestAnimationFrame (Z. 796-807); Fortschritt als goldener SVG-Kreisring (r=38, strokeDasharray 239, Z. 1704-1736). Loslassen/Verlassen vor Ablauf → cancelPress (Z. 809), Grabung abgebrochen.
- Bei pressProgress≥1 → doReveal (Z. 804/814): tapCount++ (Z. 822-823).
- DRAMATURGIE HIT_CLICKS (Z. 421-425): der wievielte erfolgreiche Grab-Vorgang zählt — {3:"coin", 5:"coin", 8:"treasure"}. Alle anderen Grabungen = leer.
  · coin (Grabung 3 & 5): playSfx("find"), found.push("coin"), addFx 🪙 (Z. 832-834), Item wird als 🪙 markiert (Z. 1745), vibrate 60 ms.
  · leer (alle übrigen): playSfx("empty"), Item wackelt (wobble, Z. 840-842), addFx 💨 (Z. 841), Item als 🕳️ ausgegraut (Z. 1741-1745).
  · treasure (Grabung 8): Schatz wird NICHT gezeigt (Kommentar Z. 836); stattdessen addFx 😱 (Z. 837) und setTimeout(spawnThief, 400) (Z. 838) → Phase 2.
- HINWEIS: THIEF_APPEARS_AT=6 (Z. 426) ist toter Code — der Trigger ist real Grabung 8 via HIT_CLICKS.
- Fortschritt: 3 HUD-Punkte (Z. 871), Himmel wechselt mit found.length (SKY[0..3]: Tag→Nachmittag→Sonnenuntergang→Nacht, Z. 430-470, 868).

PHASE 2 — PIRATENJAGD (Fang):
- spawnThief (Z. 535): chasePhase="cinematic", Musik-Tempo 0.55 (schneller/hektischer). 3-2-1-Countdown bei 0/800/1600/2400 ms (Z. 539-542; 0 zeigt "LOS!"). Nach 2900 ms (Z. 637) startet die Jagd: Pirat spawnt Bildmitte (0.5·W, 0.45·H), zufällige Startgeschwindigkeit, chasePhase="chase", requestAnimationFrame-Loop `pirateLoop`.
- pirateLoop-Physik (Z. 568-635): velocity-basiert, dt aus timestamp (geräteunabhängig). Speed-Stufen nach Frame-Zähler spdDecay: <180 Frames → 9.5, <480 → 6.5, sonst → 5 (Z. 587) — startet rasend, wird nach ~8 s fangbar. Ziel-Seeking (Beschl. 1.2/Frame Richtung Zufallsziel, Z. 594-595), Dämpfung 0.88 (Z. 598-599), erzwungene Mindest-/Maxgeschwindigkeit (Z. 601-610), Wand-Abprall (pirateSize 70, Bounce ×1.1, Z. 616-620), neues Zufallsziel + Velocity-Kick bei dist<35 (Z. 622-628). dir = Blickrichtung (nur Emoji-Pirat spiegelt via scaleX).
- Fangen: onPointerUp auf die Piratenfigur → catchThief (Z. 639/1622). Setzt caught=true, vibrate [30,40,90], playSfx("catch"), cancelAnimationFrame, found.push("treasure"), addFx 💰 am Tap-Punkt (Z. 652), Tempo zurück auf 1. Nach 1200 ms → thief=null, chasePhase="idle", phase="won" (Z. 654-658).

NO-FAIL (bereits vorhanden, Bolle 11.07., Z. 576-586): Nach 15000 ms Wall-Clock „gibt der Pirat auf" — velX/velY ×0.6 pro Frame, rollt sanft aus, thief.resting=true, bleibt stehen → garantiert fangbar. Kein Verlieren, kein Timer-Ende, keine Fail-Condition irgendwo im Code.

RESTART (Z. 853-865): setzt alle States zurück auf phase="intro".

TOTER CODE: Shake-Erkennung (Z. 494-526, devicemotion, force>28) ist verdrahtet aber shakeResolve wird von keinem Item genutzt — funktionslos.

**Reveal HEUTE (Referenz):** REVEAL HEUTE = reveal-last-WIDRIG. Das Kind-Foto (fotoUrl) wird nicht am Ende enthüllt, sondern IST die fliehende Piratenfigur und wird schon zur Spielhalbzeit VOLL SCHARF gezeigt:
- Im Cinematic-Break sofort als rundes, scharfes 70px-Foto (gold umrandet, bobbing) über dem Text „{childName} klaut den Schatz!" (Z. 1569, 1582).
- Während der gesamten Jagd (bis zu ~15 s) läuft das scharfe 60px-Kreisfoto (gold umrandet, bob-Animation) quer über den Screen und wird angetippt (Chase-Figur Z. 1621-1647; `src: fotoUrl || PIRATE_IMG`, Z. 1634; scharfe Foto-Variante Z. 1635-1640). Kein Blur, keine progressive Schärfung — das Gesicht ist die ganze Phase 2 offen sichtbar.
- Ohne fotoUrl: statt Foto der Cartoon-Pirat PIRATE_IMG (base64-SVG, Z. 427).
- Der WON-Screen zeigt KEIN Foto — nur 💰-Emoji + Party-Details (Z. 1352-1461). Es gibt also KEINE End-Enthüllung und KEINEN Magic-Moment-Foto-Hüpfer vor dem Win. Das Foto ist bereits „verbraucht", bevor der Sieg-Screen kommt.
Konsequenz für den Rebuild: Das Foto muss aus Phase 2 raus und für den Schluss aufgehoben werden.

**Win-/Reveal-Copy:** WON-Screen (phase==="won", Z. 1307-1490): 50-teiliges Konfetti (Z. 1308-1339). Zentral: 💰-Emoji bounceIn (Z. 1352-1358) → H1 "Schatz gefunden!" (Z. 1366) → "Du bist ein echter Pirat! 🏴‍☠️" (Z. 1374, wörtlich "Du bist ein echter Pirat!") → "Bereit für **den Piraten-Geburtstag von {childName}!**" (Z. 1381-1385).
Party-Karte (Glas-Panel, Z. 1385-1426): Label "📋 PARTY-DETAILS" (Z. 1404) → "📅 {partyDate}" (Z. 1416) → "🕑 {partyTime}" (Z. 1421) → "📍 {partyPlace}" (Z. 1426).
Zwei Buttons (Z. 1426-1461): "🔄 Nochmal" (restart, Z. 1432) und "✅ Bin dabei!" (Z. 1445) → öffnet WhatsApp-Deeplink `https://wa.me/{rsvpPhone}?text=…` mit vorbefülltem Text: "Ahoi! ⚓ Wir sind dabei bei {childName}s Piraten-Geburtstag am {partyDate} um {partyTime}! 🏴‍☠️" (Z. 1447-1448). Darunter Footer-Link zu https://machsleicht.de (Z. 1461-1463).

CINEMATIC-BREAK-Texte (Z. 1559-1598, Vollbild-Overlay wie Intro): mit Foto → rundes scharfes Kind-Foto oben (Z. 1569); Kicker "OH NEIN!" rot (Z. 1576); H2 fotoUrl ? "{childName} klaut den Schatz!" : "Ein Pirat klaut den Schatz!" (Z. 1582); Subline fotoUrl ? "Fang {childName} ein!" : "Schnapp ihn dir!" (Z. 1589); Countdown 3/2/1/„LOS!" (Z. 1598).
CHASE-Banner oben (Z. 1602-1618): "⚔️" + fotoUrl ? " Schnapp dir {childName}!" : " Schnapp dir den Piraten!" (Z. 1618).

**Audio/Visual-Charakter:** FARBEN: dynamische Himmel-Paletten je Fund-Stufe (SKY, Z. 430-470): 0 Funde heller Tag (#87CEEB), 1 goldener Nachmittag (#F4A460), 2 Sonnenuntergang (#D94F6B), 3/Sieg Nacht (#1a1a3e). Gold-Akzent #FFD700 durchgängig (Ringe, Ränder, Titel).
SPRITES/EMOJI: Item-Cover 🛢️🐚🪵🪨🪸🦀⚓🌿🧭; Belohnungen 🪙/💰; Fehl-Feedback 💨/😱/🕳️; Motto-Icon 🏴‍☠️; Cartoon-Pirat als base64-SVG PIRATE_IMG (roter Körper, Augenklappe, Dreispitz mit Totenkopf, Goldsack, Z. 427) als Fallback wenn kein Foto.
SOUND (prozedural WebAudio, muted-default true, Toggle Z. 742): Loop-Musik 16-Noten-Sea-Shanty (NOTES Z. 675) Sinus + Sinus-Bass 110 Hz; CHASE-Modus (tempoRef 0.55) schaltet auf Sawtooth, +15% Pitch, Bass 150 Hz, schnelleres Tempo (Z. 686-716) — sofortiger Umschalt via setMusicTempo (Z. 722). SFX (playSfx Z. 748-770): tap (triangle 440), find (523/659/784-Arpeggio), empty (247 dumpf), alarm (392/311/392 square), catch (523/659/784/1047 Triumph-Fanfare). Vibrations-Muster bei Münze/Truhe/Fang.
ANIMATIONEN: schwebende Items (gentle), Grabungs-Wackeln (digShake), Fehl-Wobble, bobbing Figuren, floatUp-Emoji-Effekte, Ripples, bounceIn-Countdown, 50-teiliges Konfetti beim Sieg.

**UNBEDINGT bewahren:** Der Kern-Spaß, der originalgetreu erhalten bleiben MUSS:
1. Die ZWEI-PHASEN-Dramaturgie mit Twist: erst ruhiges „Ausgraben" (Suchen/Long-Press), dann der Überraschungs-Bruch „ein Pirat klaut den Schatz!" → hektische Fang-Jagd. Dieser Wechsel von entspannt zu adrenalin ist der Charme.
2. Die LONG-PRESS-GRABE-MECHANIK mit sichtbarem goldenem Fortschrittsring (800 ms) und der Zufalls-Ausbeute (mal Münze 🪙, mal leer 🕳️/💨) — die kleine Spannung „was ist da drunter?".
3. Die 3-2-1-„LOS!"-Cinematic vor der Jagd (Countdown-Bounce, Musikwechsel) — baut Dramatik auf.
4. Die velocity-basierte, „lebendige" Pirat-Physik: flitzt erst rasend, wird spürbar langsamer/fangbarer, prallt an Wänden ab, wechselt Richtung mit Kick — fühlt sich wie ein echtes Fangen an, nicht wie ein statisches Ziel.
5. Der befriedigende Fang-Moment: Tap → 💰-Burst, Triumph-Sound, Vibration, Konfetti-Sieg.
6. Die Atmosphäre: Himmel-Verlauf Tag→Nacht mit jedem Fund, prozedurale Sea-Shanty-Musik die zur Jagd umschaltet, Vibrations- und Sound-Feedback pro Aktion.
7. Der No-Fail-Charakter: jedes Kind kommt garantiert zum Fang/Reveal (Pirat gibt nach 15 s auf).

**Rebuild-Hinweise (core.js):** Konkrete Umbau-Anweisungen für den schlanken core.js-Nachbau (Muster game-*.html):

(a) REVEAL-LAST-KONFORM MACHEN — die zentrale Änderung. Die fliehende Figur in Phase 2 darf NICHT mehr das Kind-Foto sein. Ersetze `src: fotoUrl || PIRATE_IMG` (Z. 1634) durch das MOTTO-Sprite (PIRATE_IMG bzw. 🏴‍☠️) — immer, unabhängig von fotoUrl. Auch Cinematic (Z. 1569) und Chase auf Sprite umstellen. Das Kind-Foto wird stattdessen ERST beim Fang enthüllt: beim catchThief-Erfolg lässt der Piraten-Sprite den „Schatz" fallen und das scharfe Foto platzt/hüpft als Magic-Moment heraus (magicFly-Muster aus core.js: Foto skaliert/rotiert/bounct einmalig ein), DANN erst Übergang zum Win-Screen. sharpen-Cap so setzen, dass das Foto zu keinem früheren Zeitpunkt scharf ist (während Grabung/Jagd max. stark unscharf oder gar nicht sichtbar) und erst im Fang-Frame 100% Schärfe erreicht (setPhoto-Aufruf erst in catchThief). Den WON-Screen (Z. 1352, aktuell nur 💰) um das jetzt scharfe Kind-Foto ergänzen.

(b) NO-FAIL absichern/vereinheitlichen: Die 15-s-Aufgabe-Logik (Z. 576-586) übernehmen (Pirat rollt aus, resting=true). Zusätzlich core.js-Standard: sichtbarer „Tipp"-Knopf (bei Idle einblenden) der den Piraten sofort ausbremsen/heranführen ODER nach ~5 s Idle Auto-Fang auslösen (_floorArm / Idle-Nudge-Muster). Ziel: garantierter Reveal ohne Frust, auch für die jüngsten Kinder.

(c) 3 ALTERS-STUFEN via ageNum (heute komplett fehlend — kein age-Param, keine Staffelung). ageNum aus URL lesen, Schwellen ageNum<=6 / <=9 / sonst. Parametrisiere: Phase-1-Grabungs-Zähler bis Truhe (HIT_CLICKS-Ziel niedriger für Kleine, z.B. Truhe bei Grabung 5 statt 8) und PRESS_DURATION (z.B. 500/650/800 ms); Phase-2-Speed-Stufen (Z. 587: für <=6 z.B. 6.5/4.5/3.5 statt 9.5/6.5/5), pirateSize/Trefferradius größer für Kleine, und Giveup-Zeit kürzer (z.B. 8 s statt 15 s).

(d) CORE.JS-BAUSTEINE, die passen: Zwei-Phasen-Struktur auf die generische Phasen-Engine mappen (Phase 1 = Long-Press-„Grab/Wimmel"-Interaktion mit Fortschrittsring; Phase 2 = Fang-Minispiel mit rAF-Bewegung). setPhoto (Foto-Injection erst am Ende), sharpen-Cap (verhindert frühe Schärfe), magicFly (Foto-Hüpfer beim Fang), _floorArm/Idle-Nudge (No-Fail + Tipp). Die velocity-Physik (Z. 568-635) 1:1 als Bewegungsmodul übernehmen — sie ist geräteunabhängig (timestamp-dt) und bereits fangbar-getunt. Toten Code weglassen: Shake-Modul (Z. 494-526) und THIEF_APPEARS_AT (Z. 426) nicht mitportieren. Prozedurale Audio-/Tempo-Umschaltung, SKY-Verlauf, Vibrations- und Konfetti-Juice übernehmen. Intro-/Win-Copy und WhatsApp-RSVP-Deeplink (Z. 1447) unverändert erhalten.

---

## 2. dino
**Titel:** "{Kind}s Dino-Expedition" — React-Component intern `DinoEier`. Nest-Feld-Suchspiel: 9 Nester absuchen, Eier warm-klopfen (3 Taps), Baby-Dinos schlüpfen lassen, und das letzte Ei bekommt Beine und flüchtet → Fang-Chase. Titel im Header/Intro-h1: "🥚 {childName}s Dino-Expedition"; Intro-h2: "Drei Baby-Dinos wollen schlüpfen!". Quelle: einladung/dino/whatsapp/index.html (Z.382 Component, Z.815/822 Titel). ACHTUNG Namenskollision: es existiert bereits ein core-Prototyp game-ei-dino.html — das ist aber ein ANDERES, simpleres Ein-Ei-Warm-Klopf-Spiel (Meter-Bar, kein Nest-Feld, kein Physik-Chase). Dieser Rebuild braucht einen eigenen Slug (z.B. `expedition-dino` bzw. `nest-dino`) oder muss game-ei-dino bewusst ablösen — für Bolle flaggen.

**Story / Rahmen:** Hook = "Hilf den Baby-Dinos rechtzeitig vor der Party beim Schlüpfen." Der Gast ist "Dino-Forscher", der dem Geburtstagskind hilft. Intro-Screen (phase "intro", Z.805–843), Texte wörtlich:
- Eyebrow (uppercase, weiß): "📨 Einladung zur Dino-Party"
- h1: "{childName}s Dino-Expedition"
- Datum-Chip: "📅 {partyDate} · 🕒 {partyTime}"
- Großes 🥚 (bob-Animation), darunter h2 (orange #FF7043): "Drei Baby-Dinos wollen schlüpfen!"
- Erklär-p: "Hilf {childName}, die Dino-Eier rechtzeitig vor der Party zum Schlüpfen zu bringen!"
- 3 Legenden-Badges: [🦕 "Schlüpft bald!"] [🦖 "Versteckt!"] [🥚 "Geheimnis!"]
- Anleitung-Zeile: "👆 Klopfe 3x auf ein Ei zum Schlüpfen!"
- Start-CTA (grüner Gradient): "🧬 Dino-Forscher starten!" → setPhase("play")
Params kommen aus Query (Z.1209–1216): name, date, time, ort, tel, foto. foto = entweder https://party.machsleicht.de/api/invimg/…-URL oder base64→data:image/jpeg. HTML-title "Dino-Einladung — machsleicht.de".

**Mechanik (Schritt fuer Schritt):** PHASE 1 — NEST-HUNT (tap-to-crack, Z.624–665):
- Spielfeld: 9 fest positionierte Nester (ITEMS, Z.358–368), x/y in %, VARIierende Cover-Emojis: 🥚/🌾/🌿/🥚/🦴/🌴/🥚/🍃/🥚. Idle: jedes Ei "gentle"-schwebt (Z.1106) mit Schatten-Ellipse drunter.
- TAPS_TO_CRACK = 3 (Z.369). Interaktion = onPointerDown auf ein Nest. Jeder Tap: currentTaps++, Ei wackelt (crackShake .35s), playSfx("tap") 440Hz triangle, FX-Emoji floatUp (Tap1 💥, Tap2 ✨). Riss-Marken (╱╲) akkumulieren bei crackLevel 1/2 (Z.1044–1075). 3 Fortschritts-Punkte unterm Ei füllen grün (Z.1076–1090).
- Beim 3. Tap cracked das Ei: crackedCount++ (Z.641), result = CRACK_RESULTS[crackedCount].
- ZUFALLS-VERTEILUNG (_rollResults, Z.370): a=2+floor(rand·2)∈{2,3}; b=a+2∈{4,5}; c=b+2∈{6,7}. Map {a:"dino1", b:"dino2", c:"runaway"}. D.h. der 1. Voll-Treffer (🦕 dino1) fällt aufs a-te gecrackte Ei, dino2 (🦖) aufs b-te, runaway aufs c-te. ALLE anderen gecrackten Eier (count nicht in {a,b,c}) → result undefined → "stone"-Zweig (Z.659–664): 🪨 rollt weg (stoneRoll-Anim), ausgegraut, playSfx("empty") 247Hz. = spielerische Nieten, KEINE Strafe.
- dino1-Treffer (Z.647): Ei→🦕, found+="dino1", playSfx("find") 523/659/784 aufsteigend, FX hatch 🦕 (floatUp + hatchBurst-Ring + 6 Schalen-Splitter), vibrate 60ms.
- dino2-Treffer (Z.651): Ei→🦖, found+="dino2", "find"-Sound, vibrate 60.
- runaway-Treffer (Z.655): Ei→😲, playSfx("alarm") 392/311/392 square, vibrate [40,60,40], nach 400ms → spawnRunner().
- ATMOSPHÄRE-ESKALATION (SKY-Array Z.372–381; sky=SKY[min(found.length,3)]): 0 Funde=tropischer Tag (blau) → 1=goldener Nachmittag (orange) → 2=Vulkan-Abendrot (rot) → 3=Sternennacht (dunkelblau + 20 funkelnde Sterne + Lava-Glow). Hintergrund-Transition 1.5s. Zusätzlich: driftende Wolken, Pterodactyls, am Horizont laufende Dino-Silhouetten.
- Fortschritt: Pill oben-rechts "{found.length}/3 🦖" (Z.950); 3 Header-Punkte füllen 🦕/🦖/Foto (Z.681–697); Coach-Text unten wechselt nach found.length (Z.959): 0="👆 Klopfe 3x auf ein Ei — hilf den Dinos!", 1="🦕 Erster Dino geschlüpft! Noch 2!", 2="🔥 Noch einer! Du schaffst das!".

PHASE 2 — CHASE/FANG (spawnRunner Z.406–495, catchRunner Z.496–516):
- "cinematic": dunkles Radial-Overlay, Musik-Tempo→0.55 (Chase-Modus: sawtooth + höhere Tonlage), Countdown 3→2→1→"LOS!" (je 800ms). Copy: Eyebrow "OH NEIN!", h2 "Das Ei bekommt Beine und will abhauen!", p "Nur echte Dino-Forscher fangen es ein!". (Mit Foto: h2 "{childName} hat das Ei geklaut!", p "Fang {childName} ein!".)
- Nach 2900ms → "chase". Runner spawnt Bildmitte (Z.416), zufällige Startgeschwindigkeit. requestAnimationFrame-eggLoop (Z.433–493): Steering-Physik — beschleunigt (accel 1.2·dt) zu Zufalls-Ziel, Velocity gedämpft ×0.88, Speed-gecappt. SPEED-DECAY (Z.438–439): spd=5 erste 180 Frames (~3s), 3.8 bis 480 Frames (~8s), dann 3 dauerhaft. Wand-Abprall Restitution 0.7. AUSWEICH-JINK: kommt der Finger/Ziel auf dist<35 heran, re-randomisiert das Ziel und es weicht aus (Z.481–486) → bewusst schwer zu stellen. Render = RUNNER_IMG (inline-SVG watschelndes Ei-mit-Beinen, eggWaddle-Anim, scaleX nach Richtung) ODER Kind-Foto wenn fotoUrl (Z.1012–1036).
- Banner "🏃 Schnapp dir das kleine Ausreißer-Ei!" (Z.1012), Bottom "🏃 Schnell, das Ei flüchtet!".
- catchRunner (onPointerUp aufs Ei, Z.496): caught=true, vibrate [30,40,90], playSfx("catch") 523/659/784/1047 aufsteigend, found+="dino3", FX hatch 🦖, Tempo→1, nach 1200ms → phase "won" + postMessage("gameComplete").

ZIEL/WIN-GATE: found.length=3 (2 Dinos aus Nestern + 1 aus Chase). Win NUR durch Fangen des Runners erreichbar. KEIN Timer, KEIN Lose-State. ABER: Chase hat KEIN Auto-Stop/Timeout → uncoordiniertes Kind kann ewig jagen (Rebuild-Fix nötig, s. rebuildNotes). Schwierigkeits-Parameter mit Werten: TAPS_TO_CRACK=3 (fix, keine Altersstaffel!); Runner-Speed 5/3.8/3 px/frame (Decay@180/480 Frames); Steering accel 1.2, Damping 0.88, Jink@dist<35, Restitution 0.7; Countdown 3×800ms; Spawn-Delay 2900ms.

**Reveal HEUTE (Referenz):** Foto (fotoUrl) wird HEUTE gezeigt:
1. WÄHREND des Chase — der fliehende Runner IST das SCHARFE Kind-Foto (64px-Kreis, wenn fotoUrl, Z.1020), plus 70px scharf im Pre-Chase-Cinematic-Overlay (Z.970). → REVEAL-LAST-BRUCH: Gesicht voll/scharf sichtbar BEVOR gewonnen wird, den ganzen Chase über. Copy dreht mit: "{childName} hat das Ei geklaut!" / "Fang {childName} ein!" / "Schnapp dir {childName}!".
2. Header-Fortschritts-Punkt #3 (28px-Thumbnail) sobald found.length≥3 (Z.696) — praktisch erst beim Win.
3. Win-Screen: 80px scharfer Kreis (Z.873).
Ohne Foto: Runner = RUNNER_IMG (Ei-mit-Beinen-SVG, Z.357), Win = 🦖.

**Win-/Reveal-Copy:** s.o. (winCopy-Feld gefüllt)

**Audio/Visual-Charakter:** Farben: Dino-Grün (#66BB6A/#2E7D32 Akzent), warme Erdtöne, eskalierende Himmel-Gradienten (SKY-Array Z.372–381). Emoji/Sprites: 🥚🦕🦖 (Sauropode+T-Rex), 🪨-Nieten, 😲-Runaway, 🦅-Pterodactyls, 🌿🌴-Farne/Palmen (sway), Vulkan-Dreieck mit lavaGlow, watschelndes Ei-mit-Beinen-SVG (RUNNER_IMG). Sounds (WebAudio, Z.596–618): tap=440Hz triangle, find=523/659/784 aufsteigend, empty=247Hz (Niete), alarm=392/311/392 square (Runaway!), catch=523/659/784/1047 Fanfare. MUSIK (Z.529–572): 16-Noten-Loop C-Dur mit Bass, sine im Normal-Modus, im Chase→sawtooth + Pitch×1.15 + Tempo 0.55 (schneller/gehetzter) — Tempo-Shift ist der Hauptthrill. Animationen: bob/sway/drift/eggWaddle/babyWalk/hatchBurst/stoneRoll/crackShake/pterodactyl/lavaGlow/starTwinkle/horizonWalk/cinematicPulse. Vibrate-Feedback an jedem Beat.

**UNBEDINGT bewahren:** Der Charme, den der core.js-Rebuild UNBEDINGT bewahren muss:
1. NEST-FELD-JAGD: 9 verstreute Nester auf prähistorischem Boden mit variierenden Covern (Ei/Farn/Knochen/Palme/Blatt) — Such-und-Klopf-Exploration, KEIN einzelnes Ziel. (Das unterscheidet es vom simplen game-ei-dino-Prototyp!)
2. Das 3-Tap "Ei-Wärmen"-Ritual pro Ei mit eskalierenden Riss-Marken + 3 Fortschritts-Punkten + Wackeln + aufsteigendem Ton.
3. Die NIETEN-STEINE: die meisten Eier sind leer (🪨 rollt weg, spielerisches "Ohh") — die Spannung, welches Ei einen Dino birgt. Diese Varianz IST die Tension.
4. Die SKY-ESKALATION: Tag → Gold → Vulkan-Rot → Sternennacht mit jedem geschlüpften Dino — sichtbares "die Welt reagiert auf deinen Fortschritt"-Payoff (+ funkelnde Sterne, Lava, Pterodactyls, Horizont-Dinos).
5. Das CHASE-FINALE: das letzte Ei "bekommt Beine und flüchtet" — cinematisches OH NEIN! + Countdown + ein echt ausweichendes frei-roamendes Physik-Ziel, das man treffen muss. Der Musik-Tempo-Wechsel (sine→sawtooth Chase-Theme) verkauft es.
6. Prozedurale WebAudio: Chase-Musik die schneller wird + Event-SFX (tap/find/alarm/catch).
7. Zwei distinkte geschlüpfte Dinos (🦕 Sauropode + 🦖 T-Rex) die danach watscheln (babyWalk).
Kern-Fun-Formel = "absuchen → Spannung welches Ei → Welt eskaliert → chaotisches Fang-Finale".

**Rebuild-Hinweise (core.js):** BUILD-FERTIGE core.js-Rebuild-Hinweise (Muster: game-ei-dino.html / core/core.js):

(a) REVEAL-LAST-KONFORM: Die fliehende Figur MUSS das DINO/EI-SPRITE sein (RUNNER_IMG Ei-mit-Beinen oder 🦖), NIE das scharfe Kind-Foto. Übernimm das magicFly-Muster aus game-ei-dino.html (Z.30–36, 99–104): Runner = `.magicFly`-Element mit `background-image:var(--photo)` ABER `filter:blur(20px)` + `background-color`-Overlay während `.flit` (fliegt/flitzt) → beim Fangen `.caught` → `filter:blur(0)` + scale 1.55 + `.joy`-Hüpfer = DER Magic-Moment. So IST das Chase-Ziel das unscharfe Foto ("wer ist das?!"), Fangen schärft es scharf (Herzstück). Entferne das scharfe Runner-Foto (Z.1020) UND das scharfe 70px-Cinematic-Foto (Z.970). Die 2 Nest-Dinos bleiben Emoji (🦕/🦖), nur der finale Runaway trägt das Blur-Foto.

(b) NO-FAIL: Chase hat aktuell KEIN Timeout → Kind kann ewig jagen. Ergänze: (i) Runner bleibt nach ~15s stehen / wird leicht antippbar; (ii) Auto-Catch nach 5s (wie game-ei-dino Z.100: `finT=setTimeout(()=>{if(magicPhase)catchMagic();},5000)`); (iii) globales `tip()` das im Chase auto-fängt (`if(magicPhase){catchMagic();return;}` Z.113) UND in Phase-1 das nächste Ei knackt/Richtung Dino schiebt → dann hängt core.js automatisch den "💡 Tipp"-Button (Z.98–104), Idle-Nudge (_idleArm 10s→8s Auto-Tipp, Z.128–139) und den harten No-Fail-Floor (_floorArm ~30s garantiert, Z.151–159) an. Phase-1 ist schon no-fail (Nieten ohne Strafe) — beibehalten. _idleStop() im Playtest aufrufen.

(c) 3 ALTERS-STUFEN: aktuell KEINE. Nutze `ageNum()` (core.js Z.61, ?age=, Default 8). Staffeln:
   - Tap-Menge: STEP/TAPS nach Alter wie game-ei-dino (`ageNum()<=6?13:<=9?9:7`, Z.86); hier z.B. TAPS_TO_CRACK=2 für <=6, 3 für <=9, 4 älter; ODER weniger Nieten-Steine für die Kleinen.
   - Runner: jünger = langsamer + größer + kürzerer Chase. Base-Speed 3/3.8/5 → für <=6 ~40% kappen, größere Hitbox, Auto-Catch früher (3s statt 5s), Ausweich-Jink (dist<35 re-target, Z.481) für die Kleinen deaktivieren; <=9 mittel; älter = volle Physik.

(d) PASSENDE ENGINE-BAUSTEINE (core.js):
   - `setPhoto(theme, NOPHOTO_SVG)` → HAS_PHOTO, setzt --photo, Broken-Link-Fallback + data-photo-failed (Win-Copy-Guard). Baby-Dino-NOPHOTO-SVG von game-ei-dino Z.81 wiederverwenden.
   - `ageNum()` für die 3 Stufen.
   - `.magicFly`/`.flit`/`.caught`/`.joy` + `catchMagic()` (der Reveal).
   - `tip()` global → Auto-Tipp-Button; `_idleArm`/`_idleStop`/`_floorArm` No-Fail-Netz (in show('s-game') scharf).
   - `show(id)` (#s-intro/#s-game/#s-win), `confetti(colors,opts)`, `note()/noise()/AC()` WebAudio-Helper (ersetzen die bespoke AudioContext-Loop; Chase-Tempo-Musik als simpler note-Loop nachbauen oder auf Core-SFX reduzieren), `vib()`, `kid()`/`guestName()`/`?g=`, `?nofoto`.
   - #s-win Replay-Button + RSVP-Wiring hängt core.js automatisch an.
   - Layout-Skelett aus core.css; das 9-Nest-Absolut-Feld + SKY-Eskalation als spiel-eigenes CSS portieren (die SKY-Gradienten Z.372–381 + Starfield sind DER Charme — als Klassen keyed to found-count, z.B. `[data-finds="2"]`).
   - Param-Contract beibehalten (name/date/time/ort/tel/foto); foto akzeptiert party.machsleicht.de/api/invimg ODER base64.
   - SLUG-WARNUNG: game-ei-dino.html ist ein ANDERES (simpleres Ein-Ei-Meter-)Spiel — diesen reicheren Nest+Chase-Rebuild unter eigenem Slug bauen oder game-ei-dino bewusst ablösen; für Bolle flaggen.

---

## 3. safari
**Titel:** "{childName}s Foto-Safari" (React-Component `SafariFoto`, Datei .../einladung/safari/whatsapp/index.html). Sub-Genre: Wimmel-Suche + Verfolgungsjagd-Fang. Ziel: 3 Tiere fürs Safari-Album "fotografieren" (🦁 Löwe, 🐘 Elefant, 🐒 Affe), das 3. per Fang-Minigame.

**Story / Rahmen:** Rahmen: Foto-Safari zum Kindergeburtstag. "Drei wilde Tiere verstecken sich!" — der Spieler soll dem Geburtstagskind helfen, sie zu finden und "fürs Safari-Album zu fotografieren".

Intro-Panel (Phase "intro", wörtlich, code-belegt Z.783-821):
- Eyebrow: "📨 EINLADUNG ZUR SAFARI-PARTY"
- H1: "{childName}s Foto-Safari"
- Datum-Chip: "📅 {partyDate} · 🕑 {partyTime}"
- H2 (orange): "Drei wilde Tiere verstecken sich!"
- Body: OHNE Foto → "Hilf {childName}, sie zu finden und fürs Safari-Album zu fotografieren!"  /  MIT Foto → "Fang {childName} ein!"
- Tier-Legende (3 Kreise): 🦁 "Löwe" · 🐘 "Elefant" · 🐒 "Geheimnis!"
- Anleitung: "👆 Durchsuche die Büsche — 3x tippen!"
- Start-Button: "📷 Safari starten!"

Zentraler Twist / Hook (Phase "cinematic", Z.948-976): Beim 3. (letzten) Fund raschelt kein normales Tier, sondern "Ein frecher Affe klaut die Kamera!" (mit Foto-Variante: "{childName} hat die Kamera geklaut!"). Overlay-Text: Eyebrow "HEY!", H2 wie eben, Body "Schnapp ihn dir und mach das letzte Foto!", dann 3-2-1-"LOS!"-Countdown → Verfolgungsjagd. Der Twist verwandelt das ruhige Such-Spiel in eine hektische Fang-Sequenz als Finale.

**Mechanik (Schritt fuer Schritt):** ZWEI PHASEN. Interaktion durchweg TAP (onPointerDown auf Büsche; onPointerUp auf fliehende Figur).

── PHASE 1: BÜSCHE DURCHSUCHEN (Wimmel-Tap) ──
Setup: 9 Büsche (ITEMS, Z.353-363) an festen %-Positionen im 9:16-Scene (maxWidth 420, aspectRatio 9/16), Cover-Emoji variiert (🌿🪨🌳🌿🌾🐾🌿🪵🌴). Konstante TAPS_TO_CRACK = 3 (Z.364).
Ablauf je Busch (tapBush, Z.619-660):
- Tap 1..2 (currentTaps < 3): playSfx("tap") (440Hz triangle), Float-Emoji (Tap1 = 🍃, danach ✨), rustleShake-Animation 350ms, 3-Punkt-Fortschritts-Indikator unter dem Busch füllt sich (Z.1022-1036). Kein Ergebnis.
- Tap 3 (== TAPS_TO_CRACK): Busch gilt als "searched", searchedCount++. Ergebnis = CRACK_RESULTS[searchedCount].
Treffer-Verteilung (_rollResults, Z.365-366): a = 2 + rand(0..1) → {2 od. 3}; b = a+2; c = b+2. Mapping {a:"animal1", b:"animal2", c:"runaway"}. D.h. exakt 3 der (in Reihenfolge des Aufdeckens gezählten) Büsche sind Preise, an fester Lücke von je 2; alle anderen sind leer. Beispiel a=2 → 2. Fund=Löwe, 4. Fund=Elefant, 6. Fund=Affe/Flucht.
Ergebnis-Typen:
- "animal1" → 🦁 in found[], Foto-FX 📸, playSfx("find") (523/659/784 Aufwärts-Arpeggio), vibrate 60ms.
- "animal2" → 🐘 analog.
- "runaway" → 🐒 Surprise-FX, playSfx("alarm") (392/311/392 square), vibrate [40,60,40]; nach 400ms spawnRunner() → Phase 2.
- leer → 🐦 fliegt weg (birdFlyAway 1200ms), playSfx("empty") (247Hz), Busch wird ausgegraut/💨.
Feedback global: found.length steuert (a) 3-Punkte-HUD oben (🦁🐘🐒), (b) Zähler "{n}/3 📷", (c) SKY-Palette (Z.367-376): 0 Funde=Savanne-Morgen, 1=Goldener Mittag, 2=Sonnenuntergang, 3=Sternennacht (+20 funkelnde Sterne). Bottom-Hinweis wechselt mit found.length (s. winCopy). Ab searchedCount>=4 & found<3: Topbar "🌿 Ein Busch raschelt verdächtig...".

── PHASE 2: AFFEN-FANGEN (Verfolgungsjagd-Finale) ──
spawnRunner (Z.401-490): chasePhase "cinematic", Musik-Tempo 0.55 (Chase-Variante), Countdown 3→2→1→0 in 800ms-Schritten (setTimeout 800/1600/2400). Nach 2900ms erscheint der Runner mittig (x=0.5·W, y=0.45·H), chasePhase "chase", requestAnimationFrame-Loop startet.
Physik (monkeyLoop, Z.428-488): dt = clamp(Δt/16.67, max 3). Beschleunigung Richtung eines Zufalls-Ziels (targetX/Y) mit 1.2·dt, Reibung velX/Y *= 0.88, Speed-Cap spd fällt mit Alter der Jagd: spdDecay<180 → 5, <480 → 3.8, sonst 3 (px/frame). Bei niedriger Geschwindigkeit (v<3) neues Ziel + Kick. Wand-Abpraller an allen Rändern (·0.7). Kommt der Punkt seinem Ziel zu nah (dist<35), springt Ziel neu + Jitter → wirkt wie "flüchtet". dir (links/rechts) aus x-Delta → scaleX-Flip des Sprites.
Fang (catchRunner, onPointerUp auf Runner, Z.491-511): runnerState.caught=true, vibrate [30,40,90], playSfx("catch") (523/659/784/1047), rAF cancel, found += "animal3", Foto-FX 📸 an Fingerposition, Musik-Tempo 1. Nach 1200ms → phase "won", window.parent.postMessage("gameComplete").
Chase-HUD: Topbar "🏃 Fang den Affen!", Banner oben "🏃 Fang den frechen Affen!", Bottom "🏃 Schnell, der Affe haut ab mit der Kamera!".

SCHWIERIGKEIT (Ist-Werte, ALLE FIX — keine Alters-Staffelung im Original): TAPS_TO_CRACK=3 konstant; Monster-Speed 5/3.8/3; kein Timer, kein Verlieren; Fang rein geschicklichkeitsabhängig (Tap muss den ~64-70px-Runner treffen). KEIN Auto-Fang, KEIN Idle-Nudge, KEIN Tipp-Knopf vorhanden.

**Reveal HEUTE (Referenz):** JETZIGE Version ist NICHT reveal-last-konform. Das Kind-Foto (fotoUrl) wird — wenn gesetzt — SOFORT und DAUERHAFT SCHARF gezeigt, an drei Stellen (Z.793 Intro-Avatar 80×80 grüner Rand; Z.998-1008 der FLIEHENDE RUNNER IST das runde Foto 64×64 statt des Affen-SVG; Z.851 Win-Avatar 80×80 orange). Es gibt KEINE Unschärfe→Schärfe-Progression, KEIN spätes Enthüllen, KEINEN Magic-Moment. Im Foto-Modus wird sogar die Story umgeschrieben ("{childName} hat die Kamera geklaut" / "Du hast {childName} gefangen"), sodass man buchstäblich das Kind jagt — das Foto ist von der ersten Sekunde (Intro) an voll sichtbar. Ohne fotoUrl gibt es gar kein Kind-Foto, nur Emoji 📷/📸 und das Affen-SVG als Runner. Fazit fürs Rebuild: der Foto-Reveal muss komplett neu und ans Fang-Ereignis gekoppelt gebaut werden.

**Win-/Reveal-Copy:** ── Bottom-Hinweis-Zeile (Phase play, dynamisch, Z.937): ──
- found 0: "👆 Durchsuche die Büsche — 3x tippen!"
- found 1: "🦁 Löwe fotografiert! Noch 2 Tiere!"
- found 2: "🔥 Noch eins! Du bist ein echter Safari-Profi!"
- found 3: "🎉 Safari-Album komplett!"
- Chase: OHNE Foto "🏃 Schnell, der Affe haut ab mit der Kamera!" / MIT Foto "🏃 Schnell, {childName} flüchtet!"

── Cinematic-Overlay (Twist, Z.948-976): ──
"HEY!" / OHNE Foto "Ein frecher Affe klaut die Kamera!" (MIT Foto "{childName} hat die Kamera geklaut!") / "Schnapp ihn dir und mach das letzte Foto!" / Countdown "3","2","1","LOS!"

── WIN-Screen (phase "won", Z.823-903): ──
- Foto/📸-Avatar (bounceIn), dann H1: OHNE Foto "Safari-Album komplett!" / MIT Foto "Du hast {childName} gefangen! 🎉"
- Body: "Alle Tiere fotografiert 🏆 Du bist jetzt offiziell zur Safari-Party von {childName} eingeladen!"
- Sub: "Pack dein Fernglas ein — wir brauchen dich auf der Expedition!"
- Party-Karte: "📅 {partyDate}", "🕑 {partyTime}", "📍 {partyPlace}"
- Primär-Button (WhatsApp-RSVP): "🦁 Ich komme zur Safari-Party!" → öffnet wa.me/{rsvpPhone}?text=… mit Text: "Safari-Alarm! 🦁 Ich komme zur Safari-Party! Wir sind dabei bei {childName}s Safari-Geburtstag am {partyDate} um {partyTime}! 📷🎉"
- Sekundär-Button: "🔄 Nochmal spielen" (restart, Z.661-674 — würfelt CRACK_RESULTS neu)
- Badge: "🏅 OFFIZIELLER SAFARI-FOTOGRAF"
- CTA-Link: "🦁 Schatzsuche für deinen Kindergeburtstag →" (→ machsleicht.de/schatzsuche/safari, plausible-Event "einladung-schatzsuche-cta")
- Footer: "Kostenlos · Sofort startklar · machsleicht.de"

Props/URL-Params (Z.1130-1138): name, date, time, ort, tel, foto (nur https://party.machsleicht.de/api/invimg/… ODER base64 erlaubt). Defaults: Mia / "Samstag, 15. Mai 2026" / "14:00 – 17:00 Uhr" / Stadtpark / 491701234567.

**Audio/Visual-Charakter:** Farbwelt: warme Savanne, Himmel-Palette staffelt mit Funden (SKY[0..3], Z.367-376): #87CEEB/#F0E68C Morgen → #FFB74D Mittag → #FF7043 Sonnenuntergang → #1A237E Sternennacht; Boden Sand→Braun-Gradient; Sonne mit Glow rechts oben, driftende Wolken, Silhouetten (🦒🦓🐘) am Horizont (horizonWalk), Gräser/Palmen, Heat-Shimmer über dem Boden. Akzent-Orange #FF9800/#FFB74D durchgängig (Buttons, HUD, Badges).
Sprites: Emoji-Tiere 🦁🐘🐒🐦, Emoji-Büsche 🌿🪨🌳🌾🐾🪵🌴; der Affen-Dieb ist ein handgezeichnetes Inline-SVG (RUNNER_IMG, Z.352) mit Kamera + Umhänge-Gurt.
Sound (WebAudio, synthetisiert, kein Asset): Loop-Melodie NOTES[16] (Triangle) + Sinus-Bass; Chase = Sawtooth, Frequenz ×1.15, Tempo 0.55 (schneller/aggressiver). SFX: tap 440, find 523/659/784 (Aufwärts-Fanfare), empty 247, alarm 392/311/392 (square), catch 523/659/784/1047. Default gemutet, Toggle-Button 🔇/🔊.
Animationen: bob/sway/drift, rustleShake (Busch), floatUp (Partikel steigen), sparkBurst/ripple (Foto-Blitz), birdFlyAway, confetti (50 Stück im Win), bounceIn, monkeyBounce (Runner wippt), starTwinkle. Haptik (navigator.vibrate): find 60ms, runaway [40,60,40], catch [30,40,90].

**UNBEDINGT bewahren:** 1) DER TWIST als emotionaler Kern: Das 3. "Tier" ist keine ruhige Aufdeckung, sondern ein frecher Affe, der die Kamera klaut und flieht — das ruhige Such-Spiel kippt per Cinematic-Overlay (HEY! → 3-2-1-LOS) in eine hektische Fangjagd. Dieser Wechsel Suchen→Jagen ist der Spaß-Höhepunkt; unbedingt behalten.
2) Zwei-Phasen-Rhythmus: entspanntes 3x-Tippen-Wimmeln (haptisch befriedigend: Raschel-Shake, 3-Punkt-Füll-Indikator, Blätter/Funken-Partikel) → adrenalingeladenes Verfolgen mit lebendiger, ausweichender Affen-Physik (beschleunigt weg, wenn man nah kommt).
3) Progressive Tageszeit-Belohnung: jeder Fund färbt den Himmel weiter (Morgen→Mittag→Sonnenuntergang→Sternennacht mit Funkelsternen). Sichtbarer, stiller Fortschritt = starker "weiter!"-Zug.
4) "Safari-Fotograf"-Fantasie mit Foto-FX (📸-Blitz + Ripple bei jedem Treffer/Fang), synthetischem Safari-Soundtrack (Triangle-Melodie + Bass, im Chase Sawtooth +15% / Tempo 0.55) und motivierenden Stufen-Texten ("echter Safari-Profi!").
5) Cheeky-Charakter des Affen (RUNNER_IMG: Inline-SVG-Äffchen mit Kamera um den Hals, großen Augen, freches Grinsen, hochgezogene Augenbrauen) — der Dieb muss knuffig-frech aussehen, nicht bedrohlich.

**Rebuild-Hinweise (core.js):** Ziel: schlankes game-*.html auf core.js-Engine, das (1) den Zwei-Phasen-Twist bewahrt, aber (2) reveal-last + No-Fail + Magic-Moment + 3 Alters-Stufen erfüllt.

(a) REVEAL-LAST-KONFORM MACHEN — die zentrale Umbaustelle:
- Die FLIEHENDE FIGUR muss der MOTTO-Sprite (das Affen-SVG RUNNER_IMG bzw. eine core-Sprite-Referenz) sein, NIEMALS das Kind-Foto. Das war der schlimmste Verstoß (Z.998: `src: fotoUrl || RUNNER_IMG`) — immer den Affen zeigen, unabhängig von fotoUrl.
- Intro-Avatar (Z.793) und Chase-Story dürfen das Kind-Gesicht NICHT vorab zeigen. Story bleibt im "Affe klaut Kamera"-Rahmen (nicht "jage {childName}").
- Das Kind-Foto erst BEIM FANG erstmals scharf enthüllen: Der gefangene Affe "gibt die Kamera zurück" → aus der Kamera springt das frisch geschossene Foto = Magic-Moment.

(b) MAGIC-MOMENT (Pflicht 08.07.): In catchRunner, VOR dem Win-Screen, das Kind-Foto als hüpfendes/heranfliegendes scharfes Bild in-game einblenden. core.js-Baustein: das magicFly-Muster (Foto fliegt aus Fangpunkt hoch, skaliert, "schnappt" scharf), gefolgt von setPhoto(). Die vorhandene Foto-FX (📸-Blitz + ripple + sparkBurst, Z.1086-1098) als Übergang wiederverwenden. Reveal-Timeline: Fang → Blitz → unscharfes Miniatur → sharpen bis Cap → Win. sharpen-Cap aus core.js nutzen (Foto nie 100% "perfekt", damit es echt/Kind-gemacht wirkt).

(c) NO-FAIL-GARANTIEN (fehlen komplett im Original):
- Fang-Phase 2: fliehende Figur bleibt nach ~15s von selbst stehen (spdDecay bereits vorhanden — Speed auf ~0 auslaufen lassen statt Floor 3), ODER Auto-Fang nach 5s, ODER sichtbarer Tipp-Knopf, der den Affen zum Spieler zieht. _floorArm-Baustein aus core.js für den Auto-Complete-Timer verwenden.
- Idle-Nudge in Phase 1 (Schmiede-Pass-Standard, Task #74): wenn X s kein Tap, hebt ein Busch subtil hervor.
- Phase 1 ist schon fail-frei (kein Timer) — beibehalten.

(d) 3 ALTERS-STUFEN (ageNum<=6 / <=9 / sonst — heute alles FIX, muss staffelbar werden):
- TAPS_TO_CRACK: <=6 → 1-2, <=9 → 2, sonst 3.
- Fang-Schwierigkeit: <=6 → Affe langsamer (Speed-Cap ~3/2.5/2 statt 5/3.8/3), größere Trefferfläche (~90px), Auto-Fang schon nach ~3-4s; ältere → schnellerer Affe, kleinere Fläche, Auto-Fang später/aus.
- Optional Anzahl leerer Büsche / Preis-Spread über ageNum skalieren (kürzere Suche für Jüngere).

(e) PASSENDE core.js-ENGINE-BAUSTEINE: setPhoto (Foto-Reveal), sharpen-Cap (Foto-Schärfe deckeln), magicFly-Muster (hüpfendes Reveal-Foto), _floorArm (No-Fail-Timer/Auto-Complete), Standard-Tipp-Knopf + Idle-Nudge, ageNum-Staffel-Helper. Die WebAudio-Synth-Engine (Musik-Loop + SFX + Chase-Tempo) und die requestAnimationFrame-Wander-Physik des Affen sind eigenständig und portierbar — als core-Modul "chase/runner" kapseln. postMessage("gameComplete") am Win beibehalten (Worker-Kontrakt).

---

## 4. weltraum
**Titel:** „[Name]s Weltraum-Expedition" — interne Mechanik-Kurzform: Krater-Suche + Alien-Fang (Two-Phase: Wimmel-Tap auf Krater → Verfolgungsjagd/Fang eines fliehenden Aliens).

**Story / Rahmen:** Rahmung als „Weltraum-Party-Einladung als Mission". Intro-Panel (phase==="intro", Z.789ff) baut auf: Kicker „📨 Einladung zur Weltraum-Party", H1 „[Name]s Weltraum-Expedition", Datum/Zeit-Chip „📅 [partyDate] · 🕑 [partyTime]", Avatar (Foto ODER 🚀), H2 „Geheimnisse im Weltraum entdecken!", Fließtext „Hilf [Name], die Krater zu erforschen und die kosmischen Schätze zu finden!", drei Icon-Chips 🚀 Rakete / ⭐ Stern / 👽 Geheimnis!, Hinweis „👆 Erforsche die Krater — 3x tippen!", CTA-Button „🚀 Expedition starten!". Kern-Hook: Das Kind ist „Forscher" auf einem fremden Planeten; jeder Krater kann einen kosmischen Schatz verstecken. Der emotionale Wendepunkt ist die ALARM-Cinematic (chasePhase==="cinematic", Z.816): Overlay-Text „ALARM!" (orange), H2 „Ein freches Alien schnappt sich den Stern!" (bzw. mit Foto: „[Name] hat den Stern geklaut!"), Zeile „Fang es ein — die Mission hängt davon ab!" (Foto: „Fang [Name] ein!"), gefolgt von 3-2-1-LOS!-Countdown. Erst danach kippt das Wimmelspiel in die Verfolgungsjagd. Ansprache durchgehend „du"/Imperativ, maskulines Framing okay. Progress-Storytelling in der Play-Phase: Kopfzeile wechselt kontextabhängig („🚀 [Name]s Weltraum-Expedition" → bei searchedCount≥4 & noch nicht alle gefunden „💫 Ein Krater leuchtet seltsam..." → bei Jagd „🏃 Fang das Alien!"), Fußzeile eskaliert „👆 Erforsche die Krater — 3x tippen!" → „🚀 Rakete entdeckt! Noch 2 Schätze!" → „🔥 Fast geschafft! Noch einer!" → bei Jagd „🏃 Schnell, das Alien düst ab!" → „🎉 Mission Complete!".

**Mechanik (Schritt fuer Schritt):** ZWEI-PHASEN-SPIEL, gesteuert über phase∈{intro,play,won} und chasePhase∈{idle,cinematic,chase}.

PHASE 1 — KRATER ERForschen (Wimmel-Tap). 9 Krater (ITEMS, Z.353-363) an festen %-Positionen mit variierten Cover-Emojis (🌑🪨☄️🌑🛰️🕳️🌑🛸🪨). Jeder Krater braucht TAPS_TO_CRACK=3 Taps (Z.364), um „aufzuknacken". Interaktion = onPointerDown auf Krater-Div → tapCrater (Z.617): Tap 1 & 2 → craterShake-Animation (400ms), SFX „tap" (440Hz triangle), Funken-FX (💫 dann ✨), Tap-Fortschritt-Punkte unter dem Krater (3 Dots, Z.829). Tap 3 → Krater „geknackt": searchedCount++ und das Ergebnis wird aus CRACK_RESULTS[searchedCount] gelesen. CRACK_RESULTS wird pro Spiel zufällig gewürfelt (_rollResults, Z.365): a=2 oder 3, b=a+2 (4/5), c=b+2 (6/7); Zuordnung {a:'find1', b:'find2', c:'runaway'}. Damit ist NICHT ein fixer Krater, sondern der a-te/b-te/c-te GEKNACKTE Krater der Treffer — Reihenfolge zufällig, Position egal. Treffer-Typen: find1 → 🚀 Rakete gefunden (SFX „find" Arpeggio 523/659/784, discover-FX 🚀, floatUp+ripple, found+='find1'); find2 → ⭐ Stern gefunden (found+='find2'); runaway → 👽 taucht auf (SFX „alarm" 392/311/392 square, surprise-FX 👽) und nach 400ms startet spawnRunner() → Übergang Phase 2; alle übrigen Krater → „empty": Staubwolke 💨 (dustPuff 1200ms, SFX „empty" 247Hz, Krater wird grau/gedimmt). Vibration: Treffer 60ms, runaway [40,60,40]. Sky-Hintergrund wechselt mit found.length (SKY[min(found.length,3)], Z.673): 0 Nebel-Lila → 1 Galaxie-Blau → 2 Supernova-Pink → 3 Tiefes All. Fortschritt oben rechts „found.length/3 🚀" plus 3 Progress-Dots (🚀 ⭐ 👾).

PHASE 2 — ALIEN FANGEN (Verfolgungsjagd, spawnRunner Z.401). Ablauf-Timing exakt: chasePhase='cinematic', Musik-Tempo→0.55 (Chase-Modus); Countdown 3 (t=0) → 2 (800ms) → 1 (1600ms) → 0/„LOS!" (2400ms); bei 2900ms startet der Physik-Loop (chasePhase='chase'). Cinematic-Overlay zeigt großes 👽, „ALARM!", die Story-Zeilen (s. winCopy) und den Countdown (Zahl 48px, „LOS!" 28px). Alien-Physik (alienLoop, requestAnimationFrame, Z.428-486): Start Szenen-Mitte (0.5·w, 0.45·h), zufällige Startgeschwindigkeit. Speed-Cap sinkt über die Zeit (No-Frust-Rampe): spdDecay<180 Frames → 5 px/f, <480 → 3.8, sonst 3 (≈ nach 3s langsamer, nach 8s am langsamsten). Steuerung: Beschleunigung Richtung Zufalls-Ziel (dx/dist·1.2·dt), Dämpfung velX*=0.88, Geschwindigkeit auf Cap begrenzt; bei v<3 neues Ziel + Kick; Wände clampen + Abprall *0.7 (x:10..w-70, y:0.15h..h-80); bei Ziel-Distanz<35 sofort neues Ziel + Zufalls-Kick (verhindert Einkesseln → das Alien „flitzt" weg). dir (1/-1) spiegelt das Sprite in Laufrichtung. Position wird als % gespeichert. FANG: onPointerUp auf das Alien-Div (Trefferfläche 70px Sprite bzw. 80px Foto-Kreis) → catchRunner (Z.489): caught=true, Vibration [30,40,90], SFX „catch" (523/659/784/1047), found+='find3', 👾-FX, Musik-Tempo→1; nach 1200ms → phase='won' + postMessage('gameComplete'). WICHTIG: In der jetzigen Version gibt es KEINEN Fehlschlag und KEINEN Timeout — das Alien bleibt bis zum Fang, wird aber nie langsam GENUG zum garantierten Fang (Min-Speed 3 px/f, aktives Neu-Zielen bei Nähe). Kleine Kinder können also theoretisch lange jagen. Restart (Z.659) würfelt CRACK_RESULTS neu und setzt allen State zurück.

SCHWIERIGKEITS-PARAMETER (Ist-Werte, Rebuild soll sie an ageNum staffeln): TAPS_TO_CRACK=3; 9 Krater, 3 Treffer; Alien Speed-Cap 5→3.8→3 px/f; Retarget-Radius 35px; Trefferfläche 70/80px; Countdown 3-2-1-LOS ≈2,4s; Fang→Win-Delay 1200ms.

**Win-/Reveal-Copy:** STORY-BEATS wörtlich (mit/ohne Foto):
• ALARM-Cinematic (Z.816): Kicker „ALARM!"; H2 ohne Foto „Ein freches Alien schnappt sich den Stern!" / mit Foto „[Name] hat den Stern geklaut!"; Zeile ohne Foto „Fang es ein — die Mission hängt davon ab!" / mit Foto „Fang [Name] ein!"; Countdown „3 · 2 · 1 · LOS!".
• Chase-Banner oben (Z.817): ohne Foto „🏃 Schnapp dir das freche Alien!" / mit Foto „🏃 Schnapp dir [Name]!". Chase-Fußzeile: ohne Foto „🏃 Schnell, das Alien düst ab!" / mit Foto „🏃 Schnell, [Name] flüchtet!".

WIN-SCREEN (phase==="won", Z.803-815): Konfetti (50 Teile, Palette #CE93D8/#9C27B0/#7B1FA2/#64B5F6/#FFD54F/#E1BEE7/#FFF), großes 👾 (bounceIn). H1 ohne Foto „Mission Complete!" / mit Foto „Du hast [Name] gefangen! 🎉". Untertitel „Alle Schätze gefunden 🏆 Du bist jetzt offiziell zur Weltraum-Party von [Name] eingeladen!". Zeile „Die Rakete startet pünktlich — sei an Bord!". Info-Card: „📅 [partyDate]", „🕑 [partyTime]", „📍 [partyPlace]". Primär-CTA (grün, WhatsApp): „🚀 Ich komme zur Weltraum-Party!" → öffnet wa.me/[rsvpPhone] mit Text „3, 2, 1... Liftoff! 🚀 Ich komme zur Weltraum-Party! Wir sind dabei bei [Name]s Weltraum-Geburtstag am [partyDate] um [partyTime]! ⭐🎉". Sekundär „🔄 Nochmal spielen" (restart). Badge-Pill „🏅 OFFIZIELLER WELTRAUM-FORSCHER". Footer-CTA „🚀 Schatzsuche für deinen Kindergeburtstag →" (Link machsleicht.de/schatzsuche/weltraum, Tracking-Event plausible('einladung-schatzsuche-cta',{motto:'weltraum'})) + „Kostenlos · Sofort startklar · machsleicht.de".

**UNBEDINGT bewahren:** 1) DER ZWEI-AKT-DRAMATURGIE-TWIST: ruhiges Wimmel-Suchen (3x-Tap-Krater) das plötzlich in eine hektische ALARM-Verfolgungsjagd kippt. Genau dieser Bruch (Cinematic-Blackout + „ALARM!" + 3-2-1-Countdown + Musik-Tempo-Wechsel auf Chase) ist der Wow-Moment und muss bleiben. 2) Das Aufknack-Gefühl der Krater: 3 Taps mit Shake + Funken + eskalierendem Fortschritts-Feedback (Dots, Sound-Arpeggio bei Treffer, dumpfer Ton + Staub bei Leer-Krater) — Treffer fühlen sich verdient an, weil nicht jeder Krater etwas hat (randomisierte CRACK_RESULTS pro Spiel → Wiederspielwert). 3) Das lebendige, physikbasierte Fliehen des Aliens (Trägheit, Abprallen an Wänden, Weg-Flitzen wenn der Finger nah kommt) — das „ich krieg dich gleich!"-Kribbeln. 4) Die stimmige Weltraum-Atmosphäre: 4-stufig immer tiefer werdender Sternenhimmel je Fortschritt, Twinkle-Sterne, Nebel-Pulse, treibendes UFO, WebAudio-Musik + eigene SFX pro Ereignis. 5) Der Einladungs-Payoff: Fang → Konfetti → Party-Card → 1-Klick-WhatsApp-Zusage.

**Rebuild-Hinweise (core.js):** (a) REVEAL-LAST-KONFORMITÄT (heute VERLETZT, wichtigster Fix): Das Kind-Foto wird derzeit ZU FRÜH und mehrfach scharf gezeigt — als 80px-Avatar im Intro (Z.790) UND als scharf durch die Szene fliehendes Runner-Foto während der Jagd (Z.817-821). Umbau: Intro-Avatar = Motto-Sprite (🚀 oder das eingebettete RUNNER_IMG-Alien-SVG, base64 in Z.352), NICHT das Foto. Fliehende Figur = das Alien-Sprite (RUNNER_IMG), NICHT das scharfe Foto. Das Foto wird erst BEIM FANG scharf enthüllt = Magic-Moment: fotosafari-Muster (game-fotosafari-safari.html) übernehmen — Foto als `.sfoto` mit `background-image:var(--photo)` und Start-`filter:blur(10px) saturate(.6) brightness(.82)`, beim Fang Klasse `.revealed` → `filter:none` mit `transition:filter .45s ease` (sanftes Scharfziehen). Konkrete Wahl: das gefangene Alien „verwandelt" sich am Fangpunkt in das enthüllte Foto (Alien-Sprite ausblenden → verwischtes Foto einblenden → Scharf-Transition → Win). Damit ist das Foto bis zum verdienten Moment nie klar sichtbar.

(b) NO-FAIL (heute fehlend — Alien bleibt fangbar, wird aber nie garantiert gefangen): core.js liefert das Netz bereits. tip() global definieren (z.B. verlangsamt/stoppt das Alien für ~2,5s bzw. rückt es zur Bildmitte + vergrößert Trefferfläche); core hängt automatisch den „💡 Tipp"-Button an #s-game (Z.98-103), den Idle-Nudge (10s Puls → +8s Auto-tip, Z.128-138) UND den harten No-Fail-Floor `_floorArm()` (garantiert tip() nach 30s im #s-game, danach alle 9s, aktivitäts-UNABHÄNGIG, Z.151-159). Zusätzlich Ist-Rampe beibehalten/verschärfen: Alien-Speed-Cap sinkt schon (5→3.8→3 px/f); für Rebuild eine Auto-Fang-/Stopp-Stufe ergänzen (z.B. nach ~15s Cap auf ~2 und Retarget-Radius runter, damit Fang sicher gelingt). _idleStop() beim Test/Szenenwechsel beachten.

(c) 3 ALTERS-STUFEN via ageNum() (core.js Z.61, `?age=`, Default 8, valide 3-14): Staffelung z.B. ageNum<=6 → 3-4 Krater, TAPS_TO_CRACK=2, Alien-Speed-Cap ~3→2, Trefferfläche ~100px, Auto-Fang früh; ageNum<=9 → 6 Krater, 3 Taps, Speed 4→3, Fläche 80px; sonst → 9 Krater (Ist), 3 Taps, Speed 5→3, Fläche 70px. CRACK_RESULTS-Würfel (a/b/c) an Krateranzahl anpassen (c darf Krateranzahl nicht übersteigen).

(d) ENGINE-MAPPING core.js: Szenen als `.scene`-Divs mit `show(id)` (Intro=#s-start, Spiel=#s-game, Win=#s-win) statt React-phase-State; setPhoto(theme,nophotoSvg) setzt `--photo` + HAS_PHOTO + onerror-Fallback aufs Alien-SVG (Z.65-92) — die Win-Copy „Du hast [Name] gefangen!" an `HAS_PHOTO && !data-photo-failed` koppeln (lade-basiert, kein onerror-Race). kid() für den Namen, confetti(colors) mit der Win-Palette, #startBtn (core baut Replay-Button automatisch, Z.108-116). WebAudio-Musik/SFX (tap/find/empty/alarm/catch) und das Tempo-Umschalten (normal sine tempo 1 ↔ chase sawtooth tempo 0.55) sind portierbar wie im Original (Z.522-611). RUNNER_IMG-Alien-SVG + SKY-4-Stufen + Krater-Positionen/Cover-Emojis 1:1 aus Z.352-376/353-363 übernehmen. postMessage('gameComplete') am Win beibehalten.

---

## 5. detektiv
**Titel:** Detektiv-Mission ("Spuren untersuchen & Dieb fangen") — React-Component `DetektivMission`, Datei einladung/detektiv/whatsapp/index.html, Zeilen 353–902. Slug-Kandidat für core.js: `spuren-detektiv`.

**Story / Rahmen:** Rahmung: Der Gast wird zur Detektiv-Party von {childName} eingeladen und soll als Nachwuchs-Detektiv den geheimnisvollen Fall lösen. Zwei narrative Akte: (1) am Tatort Spuren untersuchen und geheime Hinweise aufdecken, (2) ein Dieb schnappt sich im entscheidenden Moment die Akte und muss gefangen werden.

INTRO-Panel (phase==="intro", Z.804–816), wörtlich:
- Kicker: "📨 Einladung zur Detektiv-Party"
- H1: "{childName}s Detektiv-Mission"
- Datum/Zeit-Badge: "📅 {partyDate} · 🕑 {partyTime}"
- Zentral-Icon: 🔍 (Lupe, bob-Animation) — ODER das Kind-Foto als 80px-Kreis mit grünem Rand, WENN fotoUrl gesetzt
- H2: "Geheimnisvolle Spuren aufdecken!"
- Fließtext: "Hilf {childName}, die Spuren zu untersuchen und die geheimen Hinweise zu finden!"
- Drei Ziel-Chips (was gefunden wird): 📜 "Nachricht" · 🔎 "Abdruck" · 🦹 "Geheimnis!"
- How-to-Hinweis: "☝ Untersuche die Spuren — 3x tippen!"
- Start-Button: "🔍 Mission starten!" → setPhase("play")

Default-Props (Z.377–384, 890–898): childName="Mia", partyDate="Samstag, 15. Mai 2026", partyTime="14:00 – 17:00 Uhr", partyPlace="Stadtpark", rsvpPhone="491701234567", fotoUrl=null. Alle via URL-Query überschreibbar (name/date/time/ort/tel/foto).

**Mechanik (Schritt fuer Schritt):** Das Spiel hat GENAU ZWEI Phasen, gesteuert über state `phase` ("intro"→"play"→"won") und `chasePhase` ("idle"→"cinematic"→"chase"→"idle").

=== PHASE 1 — SPUREN UNTERSUCHEN (Tap-to-Crack), Z.617–658 ===
- 9 Spuren-Items an FIXEN Prozent-Positionen im Scene-Rechteck (ITEMS, Z.353–363): clue1(18,50,👣) clue2(72,48,📦) clue3(45,58,🗄️) clue4(84,55,👣) clue5(28,70,🚪) clue6(62,74,🧳) clue7(10,62,👣) clue8(88,65,🗑️) clue9(42,86,📚). x/y in %, transform translate(-50%,-50%).
- Interaktion = TIPPEN (onPointerDown → tapClue). Jede Spur braucht TAPS_TO_CRACK=3 Taps (Z.364).
  · Tap 1: playSfx("tap"), FX 💫 (floatUp), clueShake-Animation .35s, Tap-Punkte-Indikator (3 Dots unter Item) füllt 1. (Z.629–632)
  · Tap 2: gleich, aber FX ✨; Item skaliert leicht (scale 1.1). Dots füllt 2.
  · Tap 3 (currentTaps===TAPS_TO_CRACK): Item wird "searched", searchedCount++ (Z.634–637). Ergebnis kommt aus CRACK_RESULTS.
- ERGEBNIS-VERTEILUNG (Kernmechanik, Z.365–366): `_rollResults()` würfelt pro Spiel neu: a = 2 + floor(rand·2)  → 2 oder 3; b = a+2; c = b+2. CRACK_RESULTS = { [a]:"find1", [b]:"find2", [c]:"runaway" }. D.h. der a-te erfolgreiche Search liefert find1, der b-te find2, der c-te löst die Verfolgung aus. ALLE anderen Searches → "empty".
  · result==="find1" (Z.640–643): 📜, found+["find1"], FX "discover" (📜 floatUp + Ripple), sfx "find". Himmel wechselt zu Bernstein.
  · result==="find2" (Z.644–647): 🔎, found+["find2"], FX 📜→🔎, sfx "find". Himmel wechselt zu Alarm-Rot.
  · result==="runaway" (Z.648–651): FX "surprise" 🦹, sfx "alarm", nach 400ms → spawnRunner(). (Item selbst rendert danach 🕳️.)
  · sonst "empty" (Z.652–657): 💨 dust-puff, Item wird grau/verblasst (grayscale, opacity .25), sfx "empty".
- Himmel/Atmosphäre reagiert live auf found.length (SKY[min(found.length,3)], Z.367–376, 673): 0 Funde=Nebel-Grau, 1=Bernstein, 2=Alarm-Rot, 3=Dunkle-Nacht; background-transition 1.5s. Progress-Dots oben (📜 🔎 🦹, Z.674–689) füllen sich; Zähler "n/3 🔍".
- Kein Verlieren, kein Timer in Phase 1. Man tippt so lange Spuren, bis die 3 Funde durch sind — im Schnitt 6 Searches (find2 bei b=4/5, runaway bei c=6/7).

=== PHASE 2 — DIEB FANGEN (Chase-to-Catch), Z.401–509 ===
- spawnRunner (Z.401–488): chasePhase="cinematic", musicTempo 0.55; Countdown 3→2→1→0 in 800ms-Schritten (setTimeout 800/1600/2400/2900). Cinematic-Overlay (Z.843): "ALARM!" + H2 "Ein mysteriöser Dieb schnappt sich die Akte!" (Foto-Variante: "{childName} hat die Akte geklaut!") + "Fang ihn ein — der Fall hängt davon ab!" (Foto: "Fang {childName} ein!") + große Countdown-Zahl (bounceIn), "LOS!" bei 0. 🦹 bobbt.
- Nach 2900ms: Runner spawnt zentral (startX=0.5·W, startY=0.45·H), zufällige Startvelocity, chasePhase="chase", RAF-Loop `thiefLoop` (Z.428–486):
  · Physik: velocity-Steuerung auf zufälliges Ziel (targetX/Y), Reibung 0.88, Speed-Cap `spd` sinkt mit Frame-Alter: spdDecay<180 → 5, <480 → 3.8, sonst 3 (Z.434) — Dieb wird über ~3s/8s langsamer, hält aber NIE an.
  · Wände: bounce an allen 4 Rändern (Z.460–475). Bei v<3 neues Ziel + Kick.
  · EVASION: wenn Distanz Ziel<35, neues Zufallsziel + Jitter — Dieb flieht aktiv weiter (Z.476–481). Blickrichtung dir via scaleX (nur SVG, nicht Foto).
  · Render (Z.844–849): Dieb = RUNNER_IMG (eingebettetes SVG eines maskierten Einbrechers mit Lupe, base64 Z.352) ODER das Kind-FOTO (80px Kreis, grüner Rand, bob) wenn fotoUrl. onPointerUp=catchRunner.
- catchRunner (Z.489–509): setzt caught, vibrate [30,40,90], sfx "catch", cancelAnimationFrame, found+["find3"], FX "catch" 🦹, musicTempo 1; nach 1200ms → setPhase("won") + window.parent.postMessage("gameComplete","*").
- KEIN Fail-State, ABER auch keine Rettung: Dieb läuft via RAF unendlich bis getippt. Kein Auto-Fang, kein Timeout, kein Tipp-Button. Junge Kinder können hier hängenbleiben (bewegliches Ziel, nur langsamer werdend).

Difficulty-Parameter (fix, ohne Altersstufen): TAPS_TO_CRACK=3; Chase-Speed 5/3.8/3 px/frame; Fang-Radius = Fingertreffer auf 70–80px-Sprite; Evasions-Radius 35px; Countdown 3× 800ms; Fang→Win-Delay 1200ms.

**Reveal HEUTE (Referenz):** WIE das Kind-Foto HEUTE gezeigt wird (Referenz, fotoUrl-Zweig): Das Foto ist NICHT reveal-last und hat KEINEN Magic-Moment. Es wird von Anfang an voll scharf gezeigt:
1. INTRO (Z.805): statt der 🔍-Lupe erscheint das Foto als 80×80-Kreis mit grünem Rand (#66BB6A) und Glow — sofort scharf, ab Sekunde 0 sichtbar.
2. CHASE (Z.844–848): der FLÜCHTENDE Läufer IST das Kind-Foto (80×80-Kreis, grüner Rand, bob-Animation) statt des Einbrecher-SVGs RUNNER_IMG. Man jagt also ein scharfes Foto des Kindes und tippt es zum Fangen.
3. CINEMATIC/HUD-Texte wechseln auf "{childName} hat die Akte geklaut!" / "Fang {childName} ein!" / "Schnapp dir {childName}!".
4. WIN (Z.839): H1 wird "Du hast {childName} gefangen! 🎉" — aber es wird KEIN Foto auf dem Win-Screen gerendert (nur Datum/Zeit/Ort-Karte).
Fazit: Foto ist durchgehend scharf und wird schon im Intro geleakt → verstößt gegen reveal-last; es gibt keinen Blur→Scharf-Enthüllungsmoment.

**Win-/Reveal-Copy:** WIN-Screen (phase==="won", Z.818–842), Konfetti + 🕵️ (bounceIn):
- H1: fotoUrl ? "Du hast {childName} gefangen! 🎉" : "Fall gelöst!"
- Fließtext: "Alle Hinweise gefunden 🏆 Du bist jetzt offiziell zur Detektiv-Party von {childName} eingeladen!"
- Sub: "Die Ermittlung beginnt pünktlich — sei dabei!"
- Party-Karte: "📅 {partyDate}" / "🕑 {partyTime}" / "📍 {partyPlace}"
- Primär-CTA (grün, WhatsApp, Z.839–842): "🔍 Ich komme zur Detektiv-Party!" → window.open("https://wa.me/"+rsvpPhone+"?text="+msg). MSG wörtlich (Z.840): "Fall gelöst! 🔍 Ich komme zur Detektiv-Party! Wir sind dabei bei {childName}s Detektiv-Geburtstag am {partyDate} um {partyTime}! 🎉🔎"
- Sekundär: "🔄 Nochmal spielen" → restart() (Z.659–672: würfelt CRACK_RESULTS neu, resettet alle States, phase→"intro").
- Badge: "🏅 OFFIZIELLER MEISTERDETEKTIV"
- Footer-CTA (Z.842): Link "🔍 Schatzsuche für deinen Kindergeburtstag →" → https://machsleicht.de/schatzsuche/detektiv, Tracking plausible("einladung-schatzsuche-cta",{motto:"detektiv"}); darunter "Kostenlos · Sofort startklar · machsleicht.de".

Play-HUD-Copy (Z.843–844): Top-Titel wechselt kontextuell: "🏃 Fang den Dieb!" (Chase) / "💫 Eine Spur leuchtet seltsam..." (ab searchedCount≥4, noch <3 Funde) / "🔍 {childName}s Detektiv-Mission". Bottom-Tipp: found.length-abhängig "☝ Untersuche die Spuren — 3x tippen!" → "📜 Geheime Nachricht entdeckt! Noch 2 Hinweise!" → "🔥 Fast geschafft! Noch einer!" → "🎉 Fall gelöst!". Chase-Banner: "🏃 Schnapp dir den Dieb!" (Foto: "Schnapp dir {childName}!").

**Audio/Visual-Charakter:** Farben/Stimmung: dunkle Detektiv-Nacht, Orange-Bernstein-Akzent (#FF8F00/#FFB300/#E65100) auf tiefblau-schwarzen Gradients; 4 Himmel-Presets (SKY, Z.367–376) als Fortschritts-Feedback (Nebel-Grau→Bernstein→Alarm-Rot→Dunkle-Nacht). Ambient: 35 animierte Sterne (lampGlow), Nebel-Ellipsen (fogPulse), driftende Fledermaus 🦇, Mond 🌙, Boden-Straßenlaternen mit Glow, Pfoten-Spuren 🐾.
Emoji/Sprites: Spuren-Cover 👣📦🗄️🚪🧳🗑️📚; Funde 📜🔎; Dieb = eingebettetes Einbrecher-SVG (RUNNER_IMG, base64 Z.352: maskierte Figur mit Lupe/Handschuhen) bzw. Kind-Foto; Enthüllungs-Emoji 🦹🕵️🕳️; FX-Emoji 💫✨💨.
Sounds (WebAudio, Z.522–611): 16-Ton-Melodie-Loop (NOTES/BASE_DUR), im Chase auf sawtooth + 1.3× Pitch + Tempo 0.55 umgeschaltet (setMusicTempo) = spürbare Hetz-Musik, danach zurück auf Tempo 1. SFX (playSfx): "tap" (440Hz), "find" (Dur-Arpeggio 523/659/784), "empty" (247Hz dumpf), "alarm" (392/311/392 square), "catch" (Fanfare 523/659/784/1047). Vibration bei Fund (60), Runaway ([40,60,40]), Fang ([30,40,90]). Mute-Toggle 🔇/🔊 oben links. Animationen: bob, clueShake, dustPuff, floatUp+ripple (discover), bounceIn (Countdown/Win), confetti (50 Teile), thiefFloat (Dieb).

**UNBEDINGT bewahren:** Der Kern-Spaß, den der core.js-Rebuild bewahren MUSS:

1. ZWEI-AKT-DRAMATURGIE mit Twist: entspanntes Spuren-Absuchen (Detektiv-Fantasie, "was ist unter dieser Spur?") das im richtigen Moment in eine hektische Verfolgung kippt. Der ALARM-Schnitt + Countdown ("Ein Dieb schnappt sich die Akte! 3…2…1…LOS!") ist der emotionale Höhepunkt — MUSS erhalten bleiben.

2. TAP-TO-CRACK-SPANNUNG: 3 Taps pro Spur mit Shake + Punkte-Indikator + Sound-Eskalation (💫→✨→Fund/Staub) gibt jedem Tap taktiles Feedback und Erwartung. Die RANDOMISIERTE Fund-Verteilung (_rollResults: Funde an zufälligen Search-Positionen, dazwischen leere Staub-Treffer) macht jeden Durchlauf leicht anders und belohnt Weitersuchen.

3. LEBENDIGE ATMOSPHÄRE als Fortschritts-Feedback: Himmel färbt sich mit jedem Fund um (Grau→Bernstein→Rot→Nacht), Progress-Dots füllen sich, Sterne/Nebel/Fledermaus-Ambient. Das visuelle "es wird ernster" trägt die Dramaturgie ohne Text.

4. FANG- jagd: der flüchtende, evasive Dieb (weicht bei Annäherung aus, wird aber langsamer) — die Genugtuung des Fangens (Vibration, Fanfare, Konfetti) ist der Payoff.

5. Die Detektiv-Requisiten-Sprache (Lupe, Fußspuren, Akte, maskierter Einbrecher-SVG) und die durchgehend maskuline "Meisterdetektiv"-Rahmung (bei machsleicht ausdrücklich erlaubt).

**Rebuild-Hinweise (core.js):** Konkrete core.js-Rebuild-Anweisungen (game-*.html-Muster):

(1) REVEAL-LAST-KONFORM MACHEN — die fliehende Figur MUSS das MOTTO-Sprite sein, nicht das Foto. Nimm den Einbrecher-/Dieb-Sprite (Detektiv-Antagonist, entspricht RUNNER_IMG-Idee) als Chase-Ziel und ENTFERNE beide Foto-Leaks: kein Foto im Intro (Z.805 → immer 🔍/Motiv-Icon), kein Foto als Läufer (Z.844 → immer Dieb-Sprite). Das Kind-Foto wird ERST BEIM FANG scharf enthüllt = Magic-Moment: im Moment des catchRunner das Foto verpixelt/blurred an der Fang-Position einblenden und über ~800–1200ms scharf ziehen ("Der Dieb entpuppt sich als … {childName}!" bzw. Foto-Enthüllung), bevor der Win-Screen kommt. Engine: `setPhoto()` zum Laden, sharpen-Cap für die max. Schärfe, `magicFly`-Muster für das aufsteigend-scharf-werdende Foto (analog jeep/fotosafari, die laut MEMORY das Muster schon haben). Win-Screen bekommt zusätzlich das enthüllte scharfe Foto (heute fehlt es dort ganz).

(2) NO-FAIL HÄRTEN — der Chase-RAF läuft heute unendlich bis Tap (Z.428–486), das ist die einzige echte Sackgasse. Drei Rettungen einbauen: (a) fliehende Figur bleibt nach ~15s stehen / Speed→0 (Erweiterung der spdDecay-Staffel, die heute nur auf 3 sinkt, Z.434); (b) Auto-Fang nach ~5s ohne Treffer (oder wenn stehend), der die catch-Sequenz auslöst; (c) sichtbarer Tipp-/Hilfe-Knopf, der den Dieb heranzieht oder direkt fängt. Phase 1 ist bereits no-fail (kein Timer, kein Verlieren) — nur die `_floorArm`/Idle-Nudge-Konvention (MEMORY: Idle-Nudge in jedem Tipp-Knopf-Spiel) ergänzen, damit bei Inaktivität eine Spur pulsiert.

(3) 3 ALTERS-STUFEN (heute komplett fehlend) — ageNum aus Props/Query lesen, Staffel <=6 / <=9 / sonst:
  · <=6: TAPS_TO_CRACK=1–2 (statt 3), Chase langsam (Start-Speed ~3, früher Stopp/Auto-Fang nach ~4s), großer Fang-Radius/Sprite, evtl. weniger leere Staub-Treffer (Funde früher).
  · <=9: TAPS_TO_CRACK=2–3, Chase mittel (heutige 5/3.8/3), Auto-Fang später.
  · sonst: TAPS_TO_CRACK=3, Chase schnell, kleinerer Fang-Radius, evasiver.

(4) PASSENDE ENGINE-BAUSTEINE aus core.js: `setPhoto` (Foto laden statt inline-img), sharpen-Cap (Blur→Scharf begrenzen für den Reveal), `magicFly`-Muster (hüpfendes Foto vor Win-Screen — die MEMORY-Pflicht "Magic-Moment-Foto-Reveal in JEDEM Spiel"), `_floorArm`/Idle-Nudge (No-Fail-Anstupser). Die Zwei-Phasen-Struktur (search→chase) lässt sich auf das Standard-phase-State-Muster mappen; Himmel-Progress (SKY[found.length]) und Progress-Dots als billige, wirkungsvolle Feedback-Layer beibehalten. WhatsApp-RSVP-CTA + Schatzsuche-Footer-CTA + postMessage("gameComplete") unverändert aus Z.507/839–842 übernehmen. Tracking weiter über plausible()-Wrapper (Projekt-Konvention), NICHT umami.track direkt.

---

## 6. superheld
**Titel:** Superhelden-Mission (Titel im Spiel: "{childName}s Superhelden-Mission"). Datei: machsleicht-deploy/einladung/superheld/whatsapp/index.html, React-Component `SuperheldenMission` ab Zeile 390. Genre: 2-Phasen "Suchen → Fangen"-Minispiel mit Foto-Reveal.

**Story / Rahmen:** Rahmen = Superhelden-Party-Einladung. Der Spieler (das eingeladene Kind) soll {childName} helfen, die verlorene Superhelden-Ausrüstung zu finden und am Ende einen Schurken zu schnappen, um "offiziell eingeladen" zu werden.

INTRO-Panel (phase "intro", Z.775-787, wörtlich):
- Label: "📨 Einladung zur Superhelden-Party"
- H1: "{childName}s Superhelden-Mission"
- Datum-Chip: "📅 {partyDate} · 🕑 {partyTime}"
- Foto-/Emoji-Bubble (🦸 wenn kein Foto)
- H2: "Verdächtige Kisten untersuchen!"
- Text: "Hilf {childName}, die Kisten zu öffnen und die Superhelden-Ausrüstung zu finden!"
- 3 Ziel-Icons mit Labels: ⚡ "Blitz" · 🛡️ "Schild" · 🧹 "Geheimnis!"
- Hinweis: "👆 Öffne die Kisten — 3x tippen!"
- Start-Button: "🦸 Mission starten!" → setPhase("play")

STORY-TWIST (Übergang zur Jagd, chasePhase "cinematic", Z.803): Aus einer der Kisten springt statt Ausrüstung ein Schurke → Vollbild-ALARM-Overlay: "ALARM!" / H2 "Ein frecher Schurke klaut das Schild!" / "Fang ihn ein — die Stadt braucht dich!" (Foto-Variante: "{childName} hat das Schild geklaut!" / "Fang {childName} ein!"). Danach 3-2-1-LOS-Countdown, dann die Verfolgungsjagd.

Fortschritts-Framing: Himmel verdunkelt sich mit jedem Fund (Tag-Blau → Sonnenuntergang → dramatisches Rot → Nacht-Skyline), Skyline-Fenster leuchten bei Nacht — vermittelt "die Mission spitzt sich zu".

**Mechanik (Schritt fuer Schritt):** Kernkonstanten (Z.353-366): ITEMS = 9 Kisten mit fixen x/y-%-Positionen und Cover-Emoji (📦 🗑️ 🚗 📦 🏢 🛢️ 📦 🚧 🗄️). TAPS_TO_CRACK = 3. `_rollResults()` würfelt bei jedem Spielstart WELCHE geöffnete Kiste (gezählt nach Öffnungs-Reihenfolge, nicht Position) welches Ergebnis liefert: a = 2 + floor(random*2) → a∈{2,3}; b = a+2 → {4,5}; c = b+2 → {6,7}; Mapping `{[a]:"find1", [b]:"find2", [c]:"runaway"}`. Also: die a-te geöffnete Kiste = Fund1 (⚡ Blitz), die b-te = Fund2 (🛡️ Schild), die c-te = Schurke/Jagd; alle übrigen geöffneten Kisten = "empty" (🎊 Konfetti-Niete). Es gibt also immer genau 2 Ausrüstungs-Funde + 1 Schurke, Rest Nieten.

PHASE 1 – SUCHEN (phase "play", tapCrate Z.630-671): Spieler TIPPT Kisten an. Guard: nur wenn phase="play", Kiste nicht schon geöffnet, chasePhase="idle". Jeder Tap: crateTaps[id]++, crateShake-Animation (0.35s), setShakeId. Bei tap 1 → Effekt 💥, tap 2 → ✨ (+"tap"-Sound 440Hz), Kiste skaliert bei taps===2 auf 1.1. Bei tap 3 (currentTaps >= TAPS_TO_CRACK) öffnet die Kiste: searchedCount++, id in `searched`-Set, Ergebnis = CRACK_RESULTS[newCount]:
 • "find1" → ⚡, found+="find1", discover-Effekt ⚡, "find"-Arpeggio, Vibration 60
 • "find2" → 🛡️, found+="find2", discover-Effekt 🛡️, "find"-Arpeggio, Vibration 60
 • "runaway" → 🧹, surprise-Effekt, "alarm"-Sound, Vibration [40,60,40], dann `setTimeout(spawnRunner, 400)`
 • sonst empty → 🎊, confettiTrap-Animation 1.2s, "empty"-Sound
3 kleine Punkte unter jeder Kiste zeigen Tap-Fortschritt (0/1/2/3). Kopf-HUD zeigt "{found.length}/3 ⚡" + Fortschritts-Dots (⚡, 🛡️, 🧹/🦸). Bodentexte wechseln nach found.length.

PHASE 2 – FANGEN (spawnRunner Z.414-501, catchRunner Z.502-522): 
1) spawnRunner: setChasePhase("cinematic"), Musik-Tempo 0.55 (schneller/aggressiver), Countdown 3→2→1→0 (je +800ms), nach 2900ms Start der Jagd.
2) villainLoop (requestAnimationFrame-Physik): Läufer startet Mitte (0.5/0.45 der Szene), Steuert per Beschleunigung auf zufälliges Ziel zu (Kraft dx/dist*1.2*dt), Dämpfung velX*=0.88. Max-Speed sinkt über Zeit (spdDecay < 180 Frames → 5, < 480 → 3.8, sonst → 3) — wird also mit der Zeit langsamer/fangbarer. Prallt an Rändern ab (x∈[10, sceneW-70], y∈[sceneH*0.15, sceneH-80], Reflexion *0.7). AUSWEICH-VERHALTEN: wenn Läufer sein Ziel fast erreicht ODER Distanz<35 zum Zielpunkt → neues Zufallsziel + Zufalls-Impuls (±4) → flitzt weg. `dir` (Blickrichtung) = Vorzeichen der x-Bewegung, spiegelt Sprite (scaleX ±1). Position wird als %-Wert der Szene an React gepusht.
3) catchRunner (onPointerUp direkt auf der Läufer-Figur, Z.502): runnerState.caught=true, Vibration [30,40,90], "catch"-Fanfare, cancelAnimationFrame, found+="find3", catch-Effekt 🦸, Musik-Tempo zurück auf 1. Nach 1200ms → setPhase("won") + `window.parent.postMessage("gameComplete","*")`.

Es gibt KEINEN Timer, KEINE Leben, KEINEN Verlier-Zustand — man muss die Figur nur irgendwann treffen. Aber KEINEN garantierten Auto-Fang/Idle-Nudge/Tipp — theoretisch endlos jagbar (No-Fail-Lücke, s. rebuildNotes).

3 Alters-Stufen: KEINE vorhanden (keine ageNum-Logik im Code). Parameter (9 Kisten, Speed-Kurve, Ausweich-Radius 35) sind für alle gleich.

**Reveal HEUTE (Referenz):** HEUTE ist das Kind-Foto NICHT reveal-last, es ist von Anfang an scharf sichtbar an ZWEI Stellen: (1) Intro-Screen als runde 80x80-Foto-Bubble mit grünem Rand (Z.776, `fotoUrl ? <img …border 3px #66BB6A> : 🦸`); (2) während der Verfolgungsjagd IST die fliehende Figur selbst das scharfe Kind-Foto (Z.803-808) — das Foto rennt bobbing durchs Bild und wird gejagt. Auf dem Win-Screen wird das Foto NICHT gezeigt (nur 🦸-Emoji + Text "Du hast {childName} gefangen! 🎉", Z.798). Es gibt also gar keinen Enthüllungs-Moment — das Foto ist die ganze Zeit offen und verschwindet am Ende sogar. Ohne Foto-Param wird als Flucht-Figur der Villain-Sprite RUNNER_IMG (base64-SVG, Z.352) genutzt.

**Win-/Reveal-Copy:** WIN-SCREEN (phase "won", Z.789-801, wörtlich):
- 🦸-Emoji (bounceIn), KEIN Foto auf dem Win-Screen (nur Emoji)
- H1: mit Foto → "Du hast {childName} gefangen! 🎉" | ohne Foto → "Mission Complete!"
- Text: "Schurke geschnappt 🏆 Du bist jetzt offiziell zur Superhelden-Party von {childName} eingeladen!"
- Text: "Zieh dein bestes Kostüm an — die Stadt braucht dich!"
- Info-Karte: "📅 {partyDate}" / "🕑 {partyTime}" / "📍 {partyPlace}"
- WhatsApp-CTA-Button: "🦸 Ich komme zur Superhelden-Party!" → öffnet wa.me/{rsvpPhone} mit vorformulierter Nachricht: "Schurke geschnappt! 🦸⚡ Ich komme zur Superhelden-Party! Wir sind dabei bei {childName}s Superhelden-Geburtstag am {partyDate} um {partyTime}! 🛡️🎉"
- Sekundär-Button: "🔄 Nochmal spielen" (restart, Z.672-685)
- Badge: "🏅 OFFIZIELLER SUPERHELD"
- Footer-CTA-Link: "🦸 Schatzsuche für deinen Kindergeburtstag →" (zu machsleicht.de/schatzsuche, plausible-Event "einladung-schatzsuche-cta")
- Footer: "Kostenlos · Sofort startklar · machsleicht.de"

CHASE-Overlay-Beats (wörtlich, Z.803): oben "🏃 Schnapp dir den frechen Schurken!" (Foto: "🏃 Schnapp dir {childName}!"); unten "🏃 Schnell, der Schurke flüchtet!" (Foto: "🏃 Schnell, {childName} flüchtet!"). Cinematic: "ALARM!" + Countdown-Zahlen 3/2/1/"LOS!".

PLAY-Bodentexte nach Fortschritt: 0 Funde "👆 Öffne die Kisten — 3x tippen!" · 1 "⚡ Blitzkraft entdeckt! Noch 2 Gegenstände!" · 2 "🔥 Fast geschafft! Noch einer!" · Kopfzeile bei searchedCount>=4 & <3 Funden "💥 Eine Kiste vibriert verdächtig...".

**Audio/Visual-Charakter:** Farbwelt "Comic-Metropolis": 4 Himmel-Paletten (SKY, Z.380-389) je nach Fortschritt — 0 Funde Strahlend-Blau (#1565C0/#1E88E5/#90CAF9), 1 Sonnenuntergang-Orange (#E65100/#F57C00), 2 dramatisches Rot (#B71C1C/#D32F2F), 3 Nacht-Skyline (#0D1117/#1A1A2E) mit gelb leuchtenden, zeitversetzt flackernden Fenstern (windowGlow). Deko: radiale Sonne + rechts oben Glow, 2 driftende ☁️-Wolken (cloudFloat 35s/50s), 9 Hochhaus-Silhouetten (BUILDINGS), 2 Straßenlaternen mit warmem Lichtkegel, gestrichelte Straßenmarkierung. Akzentblau #42A5F5 für Texte, Grün #66BB6A für Foto-Rand. Emojis/Sprites: 📦🗑️🚗🏢🛢️🚧🗄️ (Kisten-Cover), ⚡🛡️🧹 (Ziele), 🦸 (Held/Win), 🦹/RUNNER_IMG-SVG (Schurke), 💥✨🎊🎉🏆🏅. Sound (WebAudio, startet gemutet, Toggle 🔇/🔊 oben-links): 8-bit-Chiptune-Loop (16 NOTES, square-Welle + Bass 98Hz); im Chase schaltet der Loop auf sawtooth, +15% Pitch, Tempo 0.55 (schneller) + Bass 130Hz = Verfolgungs-Musik, nach Fang zurück auf 1. SFX: tap 440Hz-triangle, find 523/659/784-Arpeggio, empty 247Hz, alarm 392/311/392-square, catch 523/659/784/1047-Fanfare. Haptik: Vibration bei Fund (60), Schurke (40/60/40), Fang (30/40/90). Animationen: crateShake beim Klopfen, bob/gentle-Schweben, villainDash-Wackeln der Flucht-Figur, bounceIn, floatUp/ripple-Fund-Effekte, 50-Partikel-Konfetti am Win.

**UNBEDINGT bewahren:** Der Charme, den der core.js-Rebuild bewahren MUSS:

1) DIE ZWEI-AKT-ESKALATION: erst ruhiges, befriedigendes "Kisten 3x klopfen bis sie aufplatzen" (taptile Tap-Punkte, Shake, 💥→✨-Eskalation, Kiste wächst bei tap 2) — dann der PLÖTZLICHE Bruch, wenn aus einer Kiste der Schurke springt und alles in Vollbild-ALARM + 3-2-1-LOS-Countdown kippt. Dieser Tempowechsel (ruhig → hektisch) ist der eigentliche Spaß.

2) DIE PHYSIK-JAGD: der Läufer fühlt sich "lebendig" an — er beschleunigt auf Ziele zu, prallt von Wänden ab, und WEICHT AKTIV AUS, sobald der Finger nah kommt (dist<35 → neuer Zufalls-Zielpunkt + Impuls). Das "fast erwischt — huscht weg"-Gefühl ist der Kick. Kombiniert mit der Speed-Decay-Kurve (wird mit der Zeit fangbarer) hält es Kinder bei Laune ohne endlose Frust.

3) DIE FANG-BELOHNUNG: Vibrations-Triple beim Fang + aufsteigende 4-Ton-Fanfare (523/659/784/1047) + 50 Konfetti-Partikel + Emoji-Bounce. Der Fang muss sich wie ein Sieg anfühlen.

4) DIE ATMOSPHÄRE: der Himmel verdunkelt sich mit jedem Fund über 4 Paletten (Tag→Sonnenuntergang→Rot→Nacht mit leuchtenden Skyline-Fenstern), Sonne/Wolken/Straßenlaternen. Plus der 8-bit-Chiptune-Loop, der in der Jagd auf Sawtooth + schneller + höher umschaltet (Verfolgungs-Musik).

5) 3 klar sichtbare Sammel-Ziele (⚡ Blitz, 🛡️ Schild, 🧹 Geheimnis) mit HUD-Dots — das lesbare "noch X übrig".

**Rebuild-Hinweise (core.js):** (a) REVEAL-LAST-KONFORM MACHEN — größter Umbau. HEUTE ist das Kind-Foto NICHT reveal-last: es steht scharf in der Intro-Bubble (Z.776) UND ist im Foto-Modus die scharf gerenderte, herumhüpfende Flucht-Figur während der Jagd (Z.803-808: `<img src={fotoUrl} …border 3px #66BB6A, animation bob>`). Fix nach neuem Muster: die fliehende Figur = MOTTO-Sprite, nämlich der Schurke `RUNNER_IMG` (base64-SVG-Villain, definiert Z.352) bzw. ein 🦹/🧹-Emoji — NIE das Kind-Foto. Das Kind-Foto bleibt bis zum Fang verborgen (gar nicht oder nur unscharf/verpixelt als "geheimnisvolle Figur"). ERST beim erfolgreichen Fang (catchRunner, Z.502) wird das Foto scharf enthüllt = Magic-Moment: Foto hüpft/skaliert in die Bildmitte (magicFly-Muster), sharpen-Übergang von blur → scharf, DANN erst der Win-Screen. Intro-Foto-Bubble entfernen oder durch generisches 🦸 ersetzen. H1 "Du hast {childName} gefangen!" bleibt, aber das Foto MUSS dort/davor sichtbar auftauchen (heute zeigt der Win-Screen nur 🦸-Emoji, kein Foto — Reveal fehlt komplett!).

(b) NO-FAIL GARANTIEREN — heute keine echte Verlier-Bedingung, ABER auch keine Fang-Garantie: der Läufer weicht endlos aus (Z.489-494), nur Speed-Decay hilft. Ergänzen: nach ~15s bleibt die Flucht-Figur stehen / Auto-Fang nach ~5s Stillstand / sichtbarer "Zeig mir!"-Tipp-Knopf, der die Figur langsamer macht oder heranholt. Der Idle-Nudge-Standard aus dem Schmiede-Pass gilt.

(c) 3 ALTERS-STUFEN via ageNum (heute komplett fehlend): ageNum<=6 → weniger/größere Kisten, größerer/langsamerer Schurke, größerer Fang-Toleranzradius, evtl. TAPS_TO_CRACK=2; ageNum<=9 → mittlere Werte (aktuell: 9 Kisten, Speed 5→3.8→3, Radius 35); älter → volle Schwierigkeit. Über `?age`/ageNum-Param wie in den anderen Core-Spielen.

(d) CORE.JS-BAUSTEINE, die passen: `setPhoto` (Foto laden), sharpen-Cap (blur→scharf begrenzt für den Reveal), `magicFly`-Muster (Foto fliegt/skaliert in die Mitte beim Win), `_floorArm`/Idle-Nudge-Timer (No-Fail-Auto-Fang + Tipp-Knopf). Die Physik-Jagd (villainLoop, Steuerung+Dämpfung+Ausweichen+Speed-Decay) und die Tap-3x-Crack-Logik (crateTaps, CRACK_RESULTS-Roll) sind eigenständig und 1:1 portierbar. postMessage("gameComplete") beim Win beibehalten. WhatsApp-CTA + Schatzsuche-CTA + plausible-Event beibehalten.

---

## 7. prinzessin
**Titel:** Königlicher Ball / Magische Juwelen (React-Component `PrinzessinBall`, Zwei-Phasen: Juwelen-Rubbeln → Fee-Fang)

**Story / Rahmen:** Rahmen: WhatsApp-Gruppen-Einladung zur „Prinzessinnen-Party". Der Gast wird zum Helfer der Prinzessin.

Intro-Panel (Code Z.804-816, phase==="intro"):
- Kicker: „📨 Einladung zur Prinzessinnen-Party"
- H1: „[childName]s Königlicher Ball" (childName Default „Mia", aus ?name=)
- Datum/Zeit-Chip: „📅 [partyDate] · 🕑 [partyTime]"
- Zentral-Avatar: 👑 (oder, WENN ?foto= gesetzt, das Kind-Foto rund 80px scharf — s. revealTodayHow)
- H2: „Magische Juwelen entdecken!"
- Body wörtlich: „Hilf [childName], die verzauberten Juwelen zu finden und das Geheimnis des Balls zu lüften!"
- 3 Ziel-Icons: „👑 Krone / ✨ Zauber / 🧚 Geheimnis!"
- Bedien-Hinweis: „☝ Berühre die Juwelen — 3x tippen!"
- Start-Button: „👑 Ball eröffnen!" (→ setPhase("play"))

Der narrative Twist mitten im Spiel (Z.844, chasePhase "cinematic"-Overlay): eines der Juwelen ist verhext — „OH NEIN!" / „Eine freche Fee schnappt sich die Krone!" (bzw. mit Foto: „[childName] hat die Krone geklaut!") / „Fang sie ein — der Ball hängt davon ab!" (bzw. „Fang [childName] ein!"), dann Countdown 3-2-1-LOS!. Danach Fang-Phase.

**Mechanik (Schritt fuer Schritt):** Zwei-Phasen-Spiel, gesteuert über zwei States: phase (intro→play→won, Z.389) und chasePhase (idle→cinematic→chase→idle, Z.397).

=== SETUP-DATEN ===
- ITEMS = 9 Juwelen an FIXEN x/y-%-Positionen mit Cover-Emojis: 💎🏺🎁💎🕯️📜💎🪞🌹 (Z.353-363). Verteilt über die untere Szenenhälfte (y 48-86%).
- TAPS_TO_CRACK = 3 (Z.364): jedes Juwel braucht 3 Taps zum „Aufbrechen".
- CRACK_RESULTS = _rollResults() (Z.365-366, bei jedem Restart neu Z.660): a=2+floor(rand*2) → a∈{2,3}; b=a+2 → {4,5}; c=b+2 → {6,7}. Ergibt Mapping {a:"find1", b:"find2", c:"runaway"} — indiziert über searchedCount (das wievielte Juwel geknackt wird). Das a-te geknackte Juwel = find1 (Krone 👑), das b-te = find2 (Zauber ✨), das c-te = runaway (löst Fang aus). ALLE anderen Knacks = "empty" (Staub, graues Juwel). Randomisierung sorgt dafür, dass Fund-Juwelen jedes Mal woanders sitzen.
- SKY: 4 Paletten, Himmel verdunkelt mit Fortschritt: SKY[min(found.length,3)] (Z.673).

=== PHASE 1 — Suchen/Rubbeln (tapJewel, Z.617-658) ===
Spieler tippt Juwelen. Interaktion = pointerdown. Guard: nur phase "play" UND chasePhase "idle" UND Juwel nicht bereits in searched-Set (Z.618-619).
- Pro Tap: jewelTaps[id]++, Shake-Animation (jewelShake .35s), 3-Punkt-Indikator unter dem Juwel füllt sich (Z.856).
- Tap 1 (<TAPS_TO_CRACK) → 💫-Fx + Sound „tap" (Z.629-632); Tap 2 → ✨-Fx, Juwel scale 1.1 (Z.631, Z.873); Tap 3 (==TAPS_TO_CRACK) → „knackt": searchedCount++, ins searched-Set (Z.634-636).
- Ergebnis beim Knacken = CRACK_RESULTS[newCount] (Z.637-657):
  · "find1" → Juwel wird 👑, found+="find1", discover-Fx (👑 + Ripple), Sound „find", Vibration 60 (Z.640-643)
  · "find2" → Juwel wird ✨, found+="find2", discover-Fx, Sound „find" (Z.644-647)
  · "runaway" → 🧚 surprise-Fx, Sound „alarm", Vibration [40,60,40], Juwel wird 🕳️, nach 400ms → spawnRunner() (Z.648-651)
  · sonst "empty" → Staub-Puff, Juwel ausgegraut/💫, Sound „empty" (Z.652-657)
- Fortschritt: found[] max 3 → 3-Punkt-Tracker oben (👑 ✨ 🧚, Z.674-689) + Zähler „found.length/3 👑".
- Bottom-Hinweis staffelt nach found.length: 0→„☝ Berühre die Juwelen — 3x tippen!", 1→„👑 Krone entdeckt! Noch 2 Schätze!", 2→„✨ Fast geschafft! Noch einer!", 3→„🎉 Der Ball ist eröffnet!" (Z.843).

=== PHASE 2 — Fangen (spawnRunner Z.401-488, catchRunner Z.489-509) ===
- spawnRunner: chasePhase "cinematic", Musik-Tempo 0.55 (Chase-Modus), Countdown 3→2→1→0 im 800ms-Takt (Z.404-407), bei 2400ms „LOS!", bei 2900ms Runner spawnen + chasePhase "chase" (Z.408-427).
- Runner-Physik (goblinLoop, Z.428-486, requestAnimationFrame): steuert per Beschleunigung (1.2*dt) auf ein Zufallsziel zu, Reibung 0.88, Geschwindigkeits-Cap DECAYt über Framezahl: spdDecay<180→5, <480→3.8, sonst 3 (Z.433-434). Prallt von Wänden ab (x 10..sceneW-70, y 15%..sceneH-80, Z.460-475). AUSWEICHEN: kommt der Finger/Zielpunkt näher als dist<35 ODER wird v<3, wählt der Runner ein NEUES Zufallsziel + Zufalls-Geschwindigkeitsstoß (Z.449-455, 476-481). → flieht aktiv vor dem Finger.
- Runner-Sprite: ?foto? Kind-Foto (rund 80px, bob) : RUNNER_IMG (Fee-SVG, Z.352). Fang per onPointerUp auf dem Runner-Element (Z.844).
- catchRunner (Z.489-509): caught=true, Vibration [30,40,90], Sound „catch", 👑-Fx, found+="find3", Tempo→1, nach 1200ms → phase "won" + window.parent.postMessage("gameComplete","*").

SCHWIERIGKEIT (Ist-Werte): Rubbeln 3 Taps/Juwel fix. Fang: Runner-Speed 5→3.8→3 (Frame-decay), Ausweich-Radius 35px, keine Alters-Staffelung, KEIN harter Stopp, KEIN Auto-Fang, KEIN Tipp-Knopf (No-Fail fehlt komplett).

**Reveal HEUTE (Referenz):** Foto-Reveal in der JETZIGEN Version (Referenz — und der Kern-Bruch): Das Kind-Foto (fotoUrl aus ?foto=, validiert Z.898 nur party.machsleicht.de/api/invimg/ oder base64) wird NICHT zuletzt enthüllt, sondern durchgängig SCHARF gezeigt:
1. Intro-Avatar: rund 80px, scharf, statt der 👑 (Z.805, `fotoUrl ? React.createElement("img",{src:fotoUrl,...border:'3px solid #66BB6A'})`).
2. Während der GESAMTEN Fang-Phase IST die fliehende Figur das scharfe Kind-Foto (rund 80px, bob-Animation, Z.844 `img src={fotoUrl||RUNNER_IMG}`). Das Gesicht ist also die ganze Jagd über offen sichtbar.
3. Won-Screen: H1 „Du hast [childName] gefangen! 🎉" (Z.839) — aber KEIN separates großes Polaroid; das Foto war schon die ganze Zeit da.
→ Es gibt heute keinen „verwischt bis zum Schluss"-Moment. Ohne ?foto= läuft alles über die generische Fee-SVG (RUNNER_IMG Z.352) und Fee-Copy. Genau dieser fehlende Blur-bis-Fang-Reveal ist im Rebuild durch das fotosafari-Muster (blur→revealed→joy→win) zu ersetzen.

**Win-/Reveal-Copy:** Won-Screen (Z.818-842, phase==="won"), mit Konfetti + 👑-bounceIn:
- H1: WENN Foto → „Du hast [childName] gefangen! 🎉"; SONST → „Der Ball ist eröffnet!" (Z.839)
- Body wörtlich: „Alle Juwelen gefunden 🏆 Du bist jetzt offiziell zum Königlichen Ball von [childName] eingeladen!"
- Sub: „Die Kutsche fährt pünktlich vor — sei dabei!"
- Info-Karte: „📅 [partyDate]" / „🕑 [partyTime]" / „📍 [partyPlace]"
- WhatsApp-Zusage-Button: „👑 Ich komme zum Königlichen Ball!" → öffnet wa.me/[rsvpPhone]?text= mit Nachricht (Z.840): „Einladung angenommen! 👑 Ich komme zum Königlichen Ball! Wir sind dabei bei [childName]s Prinzessinnen-Geburtstag am [partyDate] um [partyTime]! 🎉✨"
- Sekundär: „🔄 Nochmal spielen" (restart, Z.659-672)
- Badge: „🏅 OFFIZIELLE PRINZESSIN DES BALLS"
- Cross-Sell-CTA: „👑 Schatzsuche für deinen Kindergeburtstag →" → machsleicht.de/schatzsuche, trackt plausible("einladung-schatzsuche-cta",{motto:"prinzessin"}) (Z.842)
- Fußzeile: „Kostenlos · Sofort startklar · machsleicht.de"

Story-Beats vor dem Win (Cinematic-Overlay Z.844): Kicker „OH NEIN!" / H2 „Eine freche Fee schnappt sich die Krone!" (Foto: „[childName] hat die Krone geklaut!") / „Fang sie ein — der Ball hängt davon ab!" (Foto: „Fang [childName] ein!") / Countdown 3-2-1-„LOS!". Chase-Banner: „🏃 Schnapp dir die freche Fee!" (Foto: „Schnapp dir [childName]!").

**Audio/Visual-Charakter:** Farben: Prinzessinnen-Palette Lila/Pink/Gold — 4 Himmel-Paletten SKY (Z.367-376) eskalieren mit Fortschritt: 0 Morgen-Rosa (#F8BBD0/#F48FB1/#CE93D8), 1 Schloss-Gold, 2 Zauber-Lila, 3 Sternennacht (#2E0854/#0D001A). Akzent Pink #E91E63/#F48FB1, Gold #FFD700. Szene 9:16, maxWidth 420, Sonne oben rechts, ~35 funkelnde Sterne (STAR_POS Z.690-703, sparkleGlow-Animation), Schimmer-Wolken, treibender Schmetterling 🦋 (butterflyFloat 30s), Bodendeko Blüten 🌸🌺.

Emoji/Sprites: Juwel-Cover 💎🏺🎁🕯️📜🪞🌹; Funde 👑(Krone)/✨(Zauber); Fliehende = Fee-SVG (RUNNER_IMG, inline base64 Z.352, lila Fee mit Gold-Krönchen) bzw. 🧚; leere Juwelen 💫; Fang-Fx 👑.

Sounds (WebAudio, muted-by-default, Toggle-Button 🔇/🔊): Ambient-Loop 16-Noten-Melodie (Z.522-523), sine im Normal-, sawtooth +1.15× und schneller im Chase-Modus (Tempo-State 0.55, Z.542-543). SFX (Z.606-610): tap=440 triangle, find=523/659/784-Arpeggio, empty=247, alarm=392/311/392 square, catch=523/659/784/1047 aufsteigend. Musik beschleunigt beim Fang, normalisiert (Tempo 1) beim catch.

Animationen (CSS-Keyframes Z.705-723): bob, jewelShake (Rubbel-Wackeln), dustPuff (leeres Juwel zerstäubt), floatUp/ripple/sparkBurst (Fund-Fx), goblinFloat (Fee wackelt beim Fliehen), bounceIn (Countdown-Zahlen + Win-Krone), confetti (Win, 50 Teile), findIdle (gefundene Juwelen wippen). Countdown-Zahlen groß mit Glow, „LOS!" in Pink. Haptik: Vibration bei find (60), runaway [40,60,40], catch [30,40,90].

**UNBEDINGT bewahren:** Der Charme, den der core.js-Rebuild bewahren MUSS:

1. Der ZWEI-AKT-Aufbau mit narrativem Twist: erst ruhiges Entdecken (Juwelen 3× rubbeln bis sie aufbrechen), dann die Überraschung, dass ein Fund davonläuft, gefolgt vom aktiven Fang. Dieser Umschlag von „Sammeln" zu „Jagen" ist der Kern-Kick — nicht wegvereinfachen.

2. Das RUBBEL-Gefühl in Phase 1: 3 Taps mit steigendem Feedback (💫→✨→Aufbruch), 3-Punkt-Progress-Indikator pro Juwel, Shake bei jedem Tap, unterschiedliche Ergebnisse (Krone/Zauber/Staub) → Spannung „was ist drin?".

3. Die RANDOMISIERUNG (CRACK_RESULTS neu pro Runde): Fund-Juwelen sitzen jedes Mal woanders → Wiederspielwert, kein Auswendiglernen.

4. Der FANG als Höhepunkt mit Cinematic-Countdown (3-2-1-LOS!), fliehender Figur die aktiv vor dem Finger ausweicht, und dem befriedigenden „catch"-Moment (Vibration + aufsteigender Sound + 👑).

5. Die eskalierende ATMOSPHÄRE: Himmel verdunkelt mit Fortschritt (Morgen-Rosa → Sternennacht), Musik wechselt in schnelleren Chase-Modus, Konfetti-Finale.

6. Die durchgängige Prinzessinnen-STIMMIGKEIT (Lila/Pink/Gold-Palette, Juwelen/Krone/Zauber-Motive) und das schmeichelnde Framing „Du bist jetzt offizielle Prinzessin des Balls".

**Rebuild-Hinweise (core.js):** Ziel: schlankes core.js-Spiel (Skelett #s-intro/#s-game/#s-win + `<script src="core/core.js">`) mit der Zwei-Akt-Mechanik, aber reveal-last-konform + No-Fail + Magic-Moment + 3 Alters-Stufen.

(a) REVEAL-LAST-KONFORM machen (der zentrale Bruch heute):
- HEUTE zeigt die Ist-Version das Kind-Foto SCHARF im Intro-Avatar (Z.805) UND als fliehende Figur während der GESAMTEN Jagd (Z.844) — Gesicht ist von Sekunde 1 sichtbar. Das verletzt reveal-last.
- REBUILD: Intro-Avatar = generisches 👑/Fee-Motiv (NIE Foto). Die fliehende Figur = MOTTO-Sprite (die „freche Fee" — schon als RUNNER_IMG-SVG Z.352 vorhanden, wiederverwenden als NOPHOTO). Das Kind-Foto ist während der Jagd NICHT sichtbar.
- Übernimm exakt das fotosafari-Muster (game-fotosafari-safari.html Z.106-133): Die Figur, die man fängt, trägt das Foto als `background:var(--photo)` mit `filter:blur(10px) saturate(.6) brightness(.82)` — VERWISCHT. Erst beim erfolgreichen Fang: Klasse `.revealed` (filter:none, transition .45s) → Foto wird scharf → Klasse `.joy` (Hüpfen/bounce) ~1.9s → dann `show('s-win')` mit scharfem Polaroid. Das ist der Magic-Moment: Foto-Enthüllung genau im Fang-Beat gekoppelt, nicht vorher.
- setPhoto(THEME,NOPHOTO) aus core.js nutzen (Z.65-92): setzt --photo, HAS_PHOTO-Flag, onerror→NOPHOTO-Fallback, data-photo-failed pessimistisch. Win-Copy dann verzweigen auf `HAS_PHOTO && !documentElement.hasAttribute('data-photo-failed')` (fotosafari Z.130-131) — sonst generische Fee-Copy.

(b) NO-FAIL nachrüsten (fehlt heute komplett — Runner läuft nur langsamer, stoppt nie, kein Tipp):
- Globale `tip()` definieren → core.js hängt automatisch „💡 Tipp"-Button in #s-game (core Z.97-104) UND aktiviert die zwei No-Fail-Netze: _idleArm (Idle-Nudge nach 10s, Auto-tip nach +8s) und _floorArm (harter Floor: tip() garantiert nach 30s, dann 9s-Takt — fängt das aktive-aber-erfolglose „Mashen", core Z.119-159).
- tip() muss self-guarden (`if(done)return`) und einen deterministischen Schritt Richtung Reveal machen. Konkret für dieses Spiel: In Phase 1 das nächste noch nicht geknackte Juwel voll-knacken (bis zum nächsten Fund); in Phase 2 die fliehende Figur um einen großen Schritt zum aktuellen Fingerbereich ziehen ODER direkt fangen. Vorbild fotosafari tip() Z.135.
- Zusätzlich für den Fang eine harte No-Fail-Bremse einbauen (die Ist-Physik hat keine): fliehende Figur bleibt nach ~15s stehen (Speed→0) ODER Auto-Fang nach ~5s im „chase". So kommt jedes Kind zum Reveal. _idleStop() beim Szenenwechsel wird von show() automatisch gehandhabt.

(c) 3 ALTERS-STUFEN (heute keine — Werte fix):
- ageNum() aus core.js (Z.61, ?age=, Default 8) verwenden und Schwierigkeit staffeln nach dem fotosafari-Muster (Z.94): z.B. Fang-Ausweichradius/Runner-Speed/Auto-Fang-Fenster: ageNum()<=6 → langsam+großes Fenster (Speed ~3, Auto-Fang ~4s), <=9 → mittel, sonst → schneller (heutige Werte 5→3.8→3). Auch die Rubbel-Phase kann staffeln (jüngere: 2 statt 3 Taps, oder mehr Fund-Juwelen). Werte konkret setzen, keine Magic-Numbers hardcoden ohne ageNum()-Ableitung.

(d) PASSENDE ENGINE-BAUSTEINE aus core.js:
- show(id) — Szenen #s-intro/#s-game/#s-win (armt idle+floor automatisch).
- setPhoto(THEME,NOPHOTO) — Foto-System + --photo + onerror-Fallback (s. a).
- kid() (?k=/#kname, Held-Name 3. Person), guestName() (?g=/#gname, Gast-Anrede voranstellen auf #winWho), ageNum() (?age=, s. c).
- AC()/note()/noise()/vib() — die WebAudio-SFX der Ist-Version (tap 440-triangle, find-Arpeggio 523/659/784, empty 247, alarm 392/311/392-square, catch 523/659/784/1047, Z.606-610) 1:1 auf note()/noise() portieren; ambient Chase-Loop optional.
- confetti(colors,opts) — für den Win (Palette z.B. E91E63/F48FB1/FFD700/fff/AD1457).
- tip() global → aktiviert Tipp-Button + _idleArm/_floorArm (s. b).
- Auto-Replay-Button auf #s-win (core Z.108-117, klickt #startBtn) ersetzt die manuelle restart()-Logik.

(e) COPY & TWIST erhalten: Intro-/In-Game-/Win-Texte (siehe storyFraming/winCopy-Felder) wörtlich übernehmen, ABER Foto-abhängige Zeilen so umschreiben, dass VOR dem Fang nie der Kind-Name als Fliehende genannt/gezeigt wird (heute Z.844 „[childName] flüchtet"/Foto-Runner bricht reveal-last). Stattdessen bis zum Fang durchgängig „die freche Fee"; erst im Win die Foto-Variante „Du hast [kid()] gefangen! 🎉" + scharfes Polaroid. WhatsApp-Zusage-Flow (wa.me-Deeplink) und Schatzsuche-CTA + plausible-Tracking übernehmen.

---

## 8. einhorn
**Titel:** „{childName}s Einhorn-Zauber" (React-Component-Name `EinhornZauber`, Z.377). Default childName='Mia'. URL-Params (Z.845-853): name/date/time/ort/tel/foto. foto akzeptiert nur https://party.machsleicht.de/api/invimg/… ODER base64 (→ data:image/jpeg). Untertitel-Framing: „Magische Regenbögen entdecken!"

**Story / Rahmen:** EIN Intro-Screen (kein Multi-Panel), Z.771-783, Aufbau von oben nach unten:
- Eyebrow: „📨 Einladung zur Einhorn-Party"
- H1: „{childName}s Einhorn-Zauber"
- Datum-Pille: „📅 {partyDate} · 🕑 {partyTime}"
- Bob-Figur: fotoUrl ? 80×80 rundes Foto mit grünem Rand (#66BB6A) : 🦄  ← HIER wird das Foto AKTUELL schon im Intro gespoilert (reveal-last-Bruch, s. rebuildNotes)
- H2: „Magische Regenbögen entdecken!"
- Para: „Hilf {childName}, die Regenbögen zu erforschen und die magischen Schätze zu finden!"
- 3 Chips: 🪄 Zauberstab / ⭐ Stern / 🦄 Geheimnis!
- Hint: „👆 Erforsche die Regenbögen — 3x tippen!"
- Button: „🦄 Zauber starten!" → setPhase('play')

Narrativer Bogen: Kind erforscht 9 Regenbögen/Wolken/Blumen (je 3× tippen). Die meisten sind leer (Staubwölkchen), zwei bergen Schätze (🪄 Zauberstab, ⭐ Stern). Beim dritten Fund SCHNAPPT sich ein freches Einhorn den Stern und flieht → Cinematic-Beat (Z.799): Eyebrow „OH NEIN!", H2 (foto)„{childName} hat den Stern geklaut!" / (nofoto)„Ein freches Einhorn schnappt sich den Stern!", Para (foto)„Fang {childName} ein!" / (nofoto)„Fang es ein — der Zauber hängt davon ab!", Countdown „3"/„2"/„1"/„LOS!". Dann Jagd → Fang → Gewinn.

Erklärung ans Kind erfolgt rein über HUD-Hints, die mit dem Fortschritt wechseln (Z.799): oben-Titel: Jagd→„🏃 Fang das Einhorn!" / searchedCount≥4&&found<3→„💫 Ein Regenbogen glitzert besonders…" / sonst „🦄 {childName}s Einhorn-Zauber". oben-rechts Zähler „{found}/3 🪄". unten: Jagd→(foto)„🏃 Schnell, {childName} flüchtet!"/(nofoto)„🏃 Schnell, das Einhorn galoppiert davon!"; found0→„👆 Erforsche die Regenbögen — 3x tippen!"; found1→„🪄 Zauberstab entdeckt! Noch 2 Schätze!"; found2→„🔥 Fast geschafft! Noch einer!"; found3→„🎉 Zauber vollbracht!". Chase-Banner (Z.799): (foto)„🏃 Schnapp dir {childName}!"/(nofoto)„🏃 Schnapp dir das freche Einhorn!".

**Mechanik (Schritt fuer Schritt):** Zwei-Phasen-Spiel. State-Machine: phase 'intro'→'play'→'won' (Z.389) + chasePhase 'idle'→'cinematic'→'chase'→'idle' (Z.397). Gewinn = found erreicht 3 Einträge (find1, find2, find3), 3 Fortschritts-Dots 🪄⭐🦄 (Z.656).

═ PHASE 1 — SUCHEN/RUBBELN (tapCrater, Z.599-640) ═
- 9 feste Items ITEMS (Z.353-363), je {id, x%, y%, cover-emoji}: rainbow1(18,50)🌈, rainbow2(72,48)☁️, rainbow3(45,58)🌸, rainbow4(84,55)🌈, rainbow5(28,70)🍄, rainbow6(62,74)💫, rainbow7(10,62)🌈, rainbow8(88,65)🌷, rainbow9(42,86)☁️.
- Interaktion: onPointerDown auf ein Item (Z.812). Guard: phase==='play' && !searched && chasePhase==='idle'.
- TAPS_TO_CRACK=3 (Z.364). Jeder Tap: craterTaps[id]++, Shake-Animation 'craterShake' 0.35s (shakeId, 400ms cleared), 3-Punkte-Tap-Indikator füllt sich (Z.811). Tap 1→FX 💫, Tap 2→FX ✨, sfx 'tap' (440Hz triangle).
- Beim 3. Tap: searchedCount++ (newCount), Item als searched markiert, Ausgang = CRACK_RESULTS[newCount].
- ERGEBNIS-ROLL (_rollResults, Z.365): a=2+floor(rand*2) → a∈{2,3}; b=a+2; c=b+2. Mapping {a:'find1', b:'find2', c:'runaway'}. Heißt: der a-te vollständig gerubbelte Item = 🪄 find1, der b-te = ⭐ find2, der c-te = 🦄 runaway; ALLE anderen = leer (Staub). Reihenfolge zufällig pro Runde, aber immer Abstand 2 (z.B. 2/4/6 oder 3/5/7).
- Ausgänge (Z.621-639): find1→results[id]='find1', found+='find1', FX 🪄 'discover'+ripple, sfx 'find', vib 60. find2→⭐ analog. runaway→FX 🦄 'surprise', vib [40,60,40], sfx 'alarm', setTimeout(spawnRunner, 400). empty→results[id]='empty', dustPuff (💨, grayscale-Item, 1200ms), sfx 'empty' (247Hz).
- Himmel eskaliert: SKY[min(found.length,3)] (Z.655) — 4 Paletten, dunkeln mit jedem Fund: 0 Morgen-Rosa → 1 Regenbogen-Schimmer → 2 Zauber-Lila → 3 Sternennacht (1.5s Transition).

═ PHASE 2 — JAGD/FANG (spawnRunner Z.401-476, catchRunner Z.477-497) ═
- spawnRunner: chasePhase='cinematic', Musik-Tempo 0.55 (Chase-Modus, sawtooth), Countdown 3→2→1→0 in 800ms-Schritten (Z.404-407). Bei 2900ms: Szenen-Maße lesen, Start = Mitte/45% Höhe, chasePhase='chase', RAF-Loop starten.
- PHYSIK-LOOP unicornLoop (Z.428-473): dt normiert auf 16.67ms-Frame, cap 3. spdDecay-Zähler; spd = spdDecay<180 ?5 : <480 ?3.8 : 3 (Einhorn wird langsamer, stoppt aber NIE). Steuerung: Beschleunigung Richtung Zufallsziel (dx/dist*1.2*dt), Reibung ×0.88, Velocity-Clamp auf spd. Wenn v<3 → neues Zufallsziel + Zufalls-Kick (Umherirren). Bewegung; Wand-Abprall x∈[10, W-70], y∈[15%H, H-80] mit Dämpfung 0.7. Wenn dist<35 (Ziel fast erreicht) → neues Ziel + Jitter. dir (links/rechts) spiegelt Sprite. setRunner speichert x,y als %.
- FANG catchRunner (onPointerUp auf Läufer-Div, Z.799): Guard runner && !caught. Markiert caught, vib [30,40,90], sfx 'catch' (523/659/784/1047), RAF stoppt, found+='find3', FX 🦄, Musik-Tempo 1. Nach 1200ms: runner=null, chasePhase='idle', phase='won', window.parent.postMessage('gameComplete','*') (Z.495).
- Läufer-Sprite (Z.799-804): fotoUrl ? 80×80 rundes Foto grüner Rand (bob-Anim) : RUNNER_IMG (72px Einhorn-SVG, unicornFloat-Anim, dir-Flip).

SCHWIERIGKEITS-PARAMETER (Ist-Werte): TAPS_TO_CRACK=3; Fund-Schwellen a∈{2,3}, Abstand fix 2; Chase-Speed 5→3.8→3 px/frame bei Frame 180/480; Fang = 1 Tap auf 70-80px-Sprite; kein Zeitlimit, kein Verlieren, aber auch KEIN Auto-Ende der Jagd.

**Reveal HEUTE (Referenz):** AKTUELL NICHT reveal-last-konform. Das Kind-Foto (fotoUrl) erscheint an DREI Stellen sichtbar/scharf, beginnend im Intro: (1) Intro-Screen Z.772 — 80×80 rundes Foto mit grünem Rand, bobbend, statt 🦄 (also von der ersten Sekunde gespoilert). (2) Während der Jagd IST der fliehende Läufer das scharfe Foto, Z.799-804 (`src: fotoUrl || RUNNER_IMG`) — man jagt also ein rundes Foto des Kindes. (3) Win-Screen Z.785: H1 „Du hast {childName} gefangen! 🎉" + Cinematic „{childName} hat den Stern geklaut!". Es gibt KEINE unscharf→scharf-Enthüllung; das Foto ist durchgehend voll sichtbar.

**Win-/Reveal-Copy:** Won-Screen (Z.785-797), wörtlich:
- Icon 🦄 (bounceIn) + 50 Konfetti-Partikel (7 Farben)
- H1: fotoUrl ? „Du hast {childName} gefangen! 🎉" : „Zauber vollbracht!"
- Para: „Alle Schätze gefunden 🏆 Du bist jetzt offiziell zur Einhorn-Party von {childName} eingeladen!"
- Sub: „Der Regenbogen leuchtet schon — sei dabei!"
- Details-Card: „📅 {partyDate}" / „🕑 {partyTime}" / „📍 {partyPlace}"
- WhatsApp-Button (grün 25D366→128C7E): „🦄 Ich komme zur Einhorn-Party!" → öffnet https://wa.me/{rsvpPhone}?text=… mit vorbefüllter Nachricht (Z.795): „🦄✨ Wie magisch! Ich komme zur Einhorn-Party! Wir sind dabei bei {childName}s Einhorn-Geburtstag am {partyDate} um {partyTime}! 🌈🎉"
- Restart-Button: „🔄 Nochmal spielen" (restart() Z.641: würfelt CRACK_RESULTS neu)
- Badge: „🪄 OFFIZIELLE EINHORN-ZAUBERIN"
- CTA-Link (Tracking plausible('einladung-schatzsuche-cta',{motto:'einhorn'})): „🦄 Schatzsuche für deinen Kindergeburtstag →" → https://machsleicht.de/schatzsuche
- Footer: „Kostenlos · Sofort startklar · machsleicht.de"

Cinematic-/Story-Beats beim Runaway (Z.799, Teil des Übergangs zur Jagd): Eyebrow „OH NEIN!"; H2 (foto)„{childName} hat den Stern geklaut!"/(nofoto)„Ein freches Einhorn schnappt sich den Stern!"; Para (foto)„Fang {childName} ein!"/(nofoto)„Fang es ein — der Zauber hängt davon ab!"; Countdown „3"→„2"→„1"→„LOS!".

**Audio/Visual-Charakter:** FARBEN: Pastell-Einhorn — Rosa/Flieder (#F48FB1, #CE93D8, #F8BBD0, #9C27B0) auf 4-stufigem Himmel-Gradient der mit dem Fortschritt dunkelt (Morgen-Rosa → Regenbogen-Schimmer → Zauber-Lila → Sternennacht #1A0033). Szene 9:16, max 420px, runde Ecken, Sonne mit Glow + 35 twinkelnde Sterne + treibende Wolken.
EMOJI/SPRITES: Cover 🌈☁️🌸🍄💫🌷; Schätze 🪄⭐; Läufer detailliertes Einhorn-SVG (RUNNER_IMG, Z.352, mit Regenbogen-Mähne, Horn, Wimpern) oder Foto.
SOUNDS: WebAudio — Ambient-Melodie-Loop (C-Dur-Motiv, Z.508) die im Chase-Modus von sine auf sawtooth (Pitch ×1.2) + Bass 82→140Hz + Tempo 0.55 umschaltet (Z.522-548); SFX tap(440 triangle)/find(523-659-784 Arpeggio)/empty(247)/alarm(392-311-392 square)/catch(523-659-784-1047). Mute-Toggle default AN (🔇), Z.501.
ANIMATIONEN (Z.672-689): bob, unicornFloat, craterShake (beim Rubbeln), dustPuff (Nieten), floatUp+ripple (Funde), bounceIn (Countdown/Win), confetti, starTwinkle, cloudFloat, rainbowPulse. Vibration an Schlüsselmomenten (find 60, runaway [40,60,40], catch [30,40,90]).

**UNBEDINGT bewahren:** Der Kern-Spaß, den der Rebuild bewahren muss:
1. DER 2-PHASEN-BOGEN: ruhiges Erforschen (9 Regenbögen rubbeln) → Überraschung („OH NEIN, Einhorn klaut den Stern!") → Adrenalin-Jagd. Der Kontrast ruhig→hektisch ist der Reiz.
2. DAS FREI UMHERFLIEGENDE PHYSIK-EINHORN (Z.428-473) — das Alleinstellungsmerkmal dieser App: das Einhorn zuckt/juckt mit Beschleunigung+Reibung+Wandabprall weg, ist bewusst schwer zu tippen, verlangsamt sich aber (5→3.8→3), sodass es fair fangbar bleibt. Das ist echtes, unberechenbares „das flieht ja wirklich!"-Gefühl — kein Core-Spiel hat das bisher.
3. DAS 3×-RUBBELN pro Item mit haptischem Feedback: Shake, Tap-Progress-Dots (0/3), Staubwölkchen bei Nieten, ✨-Eskalation Tap1→Tap2. Das Erforschen-Gefühl (nicht jeder Fleck ist ein Treffer).
4. DER ESKALIERENDE HIMMEL (4 Paletten, dunkeln von Morgen-Rosa zu Sternennacht mit jedem Fund) — sichtbarer Fortschritt.
5. DER CINEMATIC-COUNTDOWN-BEAT (OH NEIN → 3-2-1-LOS) als Spannungsbrücke zwischen den Phasen.
6. DIE MUSIK, die in den Chase-Modus schaltet (sine→sawtooth, Tempo 0.55, Bass 82→140Hz).
Der Rebuild darf die Mechanik NICHT durch das bereits existierende Brücken-Bau-Spiel ersetzen — das ist ein anderes Spielgefühl.

**Rebuild-Hinweise (core.js):** Ziel: schlankes Core-Spiel (Muster wie _dev/prototypes/game-*.html auf core/core.js, 168 Z.), das die Such+Physik-Jagd-Mechanik erhält, aber 4 Pflicht-Upgrades erfüllt. WICHTIG: nicht das existierende game-regenbogen-einhorn.html überschreiben (anderes Spiel) — als 2. Einhorn-Spiel bauen (z.B. game-fang-einhorn.html) oder mit Bolle klären, welches den Slot bekommt.

(a) REVEAL-LAST-KONFORM (aktuell HART verletzt):
- Ist-Zustand (revealTodayHow): Foto wird im Intro (Z.772) gezeigt UND ist die fliehende Figur während der Jagd (Z.799) UND im Win-Titel. Gesicht ist von Sekunde 1 sichtbar.
- Soll: fliehende Figur = 🦄-MOTTO-Sprite (RUNNER_IMG-SVG aus Z.352 oder Emoji), NIE das Foto. Foto nur als unscharfe Silhouette hinter der Szene während des Spiels, scharf ERST beim Fang.
- Engine-Bausteine: `setPhoto(THEME, NOPHOTO)` setzt --photo (Z.65-92, mit onload-Bestätigung + data-photo-failed-Guard). Eine `.cphoto`-Div (background:var(--photo)) hinter der Szene. `sharpen(frac)` GEDECKELT nach Muster game-regenbogen-einhorn.html Z.131: opacity≤0.28, blur≥15px, + magicPhase-Guard → Gesicht bleibt Silhouette bis zum Fang. Beim Fang: `.magicFly`-Pattern (Z.34-40): unscharfes Foto flattert per @keyframes mflit heraus (.flit), Fang → .caught (filter:blur(0), scale 1.7, Glow) → .joy (Hüpf-Anim) = Magic-Moment.

(b) NO-FAIL (aktuell fehlt Auto-Ende — Jagd läuft ewig):
- Ist: Einhorn verlangsamt nur (Z.434), stoppt/fängt sich aber nie selbst → ein Kind das nicht trifft, hängt fest.
- Soll (3-fach-Netz, Muster Z.168-176): (1) Auto-Fang nach 5s: `finT=setTimeout(()=>{if(magicPhase)catchMagic();},5000)` beim Start der Fang-Phase. Alternativ/zusätzlich fliehende Figur bleibt nach ~15s stehen (spd→0). (2) globale `tip()`-Funktion definieren → im magicPhase fängt sie das Foto (`if(magicPhase){catchMagic();return;}`) — Core hängt dann automatisch einen „💡 Tipp"-Button in #s-game (Z.97-104). (3) Core-Netze greifen automatisch, SOBALD tip() existiert: `_idleArm` pulsiert Tipp nach 10s + Auto-tip() nach 18s (Z.128-138); `_floorArm` feuert tip() GARANTIERT nach 30s auch bei aktivem-aber-erfolglosem „Mashing" (Z.149-159). Beide werden von show() scharf gestellt.

(c) 3 ALTERS-STUFEN via `ageNum()` (Z.61, Default 8; Schwelle ≤6 / ≤9 / sonst):
- Muster wie game-regenbogen-einhorn.html Z.106-108: `const HARD=(ageNum()<=6?…:ageNum()<=9?…:…)`.
- Konkrete Staffel-Vorschläge: jüngste (≤6): langsameres Einhorn (spd-Start 3 statt 5), größere Trefferfläche/Sprite, Auto-Fang schon nach 3.5s, evtl. weniger Items vor dem Runaway (Fund-Schwelle a=2 fix); mittel (≤9): Ist-Werte (spd 5→3.8→3, Auto-Fang 5s); älteste (>9): schnelleres/wendigeres Einhorn (spd 6, kürzere Wander-Cooldowns), Auto-Fang 6-7s. Optional Rubbel-Taps 3 konstant lassen (Einfachheit) und nur Jagd-Tempo staffeln.

(d) PASSENDE ENGINE-BAUSTEINE aus core.js:
- Szenen-Gerüst: #s-intro / #s-game / #s-win, `show(id)` (Z.25) schaltet + armt idle/floor.
- Namen: `guestName()` (Z.52, Gast-Ansprache aus ?g=/#gname vor #winWho), `kid()` (Z.58, Geburtstagskind 3. Person, Fallback „das Geburtstagskind").
- Audio: `note()/noise()/vib()` (Z.31-48) — die 5 SFX (tap/find/empty/alarm/catch) + die tempo-schaltende Ambient-Loop nachbauen; iOS-Unlock per AC() im Start-Handler.
- `confetti(colors, opts)` (Z.162) am Reveal statt der 50 manuellen Divs.
- Auto-injizierter „🔄 Nochmal spielen"-Button auf #s-win (Z.108-117) und Tipp-Button (Z.97) — nur tip() + Standard-IDs (#startBtn) bereitstellen.
- Tracking-Konvention: plausible('einladung-schatzsuche-cta',{props:{motto:'einhorn'}}) beibehalten (Z.797).
- CSS-Vars pro Spiel (:root): --bg1/--bg2/--fg/--accent/--accent-dk/--ink; Einhorn-Palette z.B. accent #ff8fd0, accent-dk #c24f9a (wie existierendes Spiel Z.10). Konfetti-Farben CC=['#ff8fd0','#ffd24d','#4ec46e','#4ea0ff','#b06ad0'].
- Reveal-last-Win-Copy an data-photo-failed koppeln (Muster Z.178-181): `HAS_PHOTO && !documentElement.hasAttribute('data-photo-failed')` → Foto-Text, sonst nofoto-Text mit kid() als Gastgeber.

Aufwand-Hinweis: Die frei-fliegende Physik-Jagd (Z.428-473) ist der einzige nicht-triviale Teil — als kleiner RAF-Loop portierbar, aber Positionierung sollte in einer relativen .sky-Box (aspect-ratio) statt window-Maßen laufen, damit sie ins Core-Layout passt.

---

## 9. meerjungfrau
**Titel:** Meerjungfrau-Abenteuer — „Geheimnisvolle Muscheln öffnen" (2-Phasen: Muschel-Rubbeln → Meerjungfrau fangen). Component-Name im Code: MeerjungfrauAbenteuer. Datei: machsleicht-deploy/einladung/meerjungfrau/whatsapp/index.html (React, ~190KB self-contained).

**Story / Rahmen:** Unterwasser-Wimmelbild am Meeresgrund. Der Gast hilft dem Geburtstagskind, geheimnisvolle Muscheln zu öffnen und die „Schätze des Meeres" zu bergen. Narrativer Twist in der Mitte: eine der Muscheln enthält KEINEN Schatz, sondern eine „freche Meerjungfrau", die das Juwel klaut und wegschwimmt → der Gast muss sie fangen. Erklärung ans Kind erfolgt komplett über Intro-Panel + laufende Bottom-Hint-Zeile, kein Tutorial nötig.

Intro-Panel (verbatim, Zeile 771–783):
- Eyebrow: „📨 Einladung zur Meerjungfrau-Party"
- H1: „[childName]s Meerjungfrau-Abenteuer"
- Datum-Pill: „📅 [partyDate] · 🕑 [partyTime]"
- H2: „Geheimnisvolle Muscheln öffnen!"
- Fließtext: „Hilf [childName], die Muscheln zu öffnen und die Schätze des Meeres zu finden!"
- 3 Ziel-Icons mit Label: 🔱 Dreizack · 💎 Juwel · 🧜‍♀️ Geheimnis!
- Anleitung: „👆 Öffne die Muscheln — 3x tippen!"
- Start-Button: „🌊 Abtauchen!"

Laufende Bottom-Hints im Spiel (Zeile 799): found=0 „👆 Öffne die Muscheln — 3x tippen!" · found=1 „🔱 Dreizack entdeckt! Noch 2 Schätze!" · found=2 „🔥 Fast geschafft! Noch einer!" · Chase „🏃 Schnell, die Meerjungfrau schwimmt davon!" · fertig „🎉 Meeresschätze geborgen!". Top-Bar-Titel wechselt: Chase→„🏃 Fang die Meerjungfrau!", 4+ Muscheln offen & <3 Schätze→„💫 Eine Muschel schimmert besonders...".

Cinematic-Übergang zwischen den Phasen (Zeile 799, chasePhase==='cinematic'): Vollbild-Dunkel-Overlay, 🧜‍♀️ (bob), „SPLASH!", H2 „Eine freche Meerjungfrau schnappt sich das Juwel!", Text „Fang sie ein — die Meeresschätze hängen davon ab!", dann Countdown 3→2→1→„LOS!".

URL-/Props-Parameter (Zeile 845–853): name, date, time, ort (Default „Stadtpark"), tel, foto (foto nur akzeptiert wenn party.machsleicht.de/api/invimg-URL ODER reines base64→data:jpeg). Defaults childName „Mia".

**Mechanik (Schritt fuer Schritt):** ZWEI PHASEN.

PHASE 1 — MUSCHELN ÖFFNEN (Wimmelbild/Tap-to-crack):
- 9 feste Fundstellen (ITEMS, Zeile 353–363), an %-Koordinaten am Meeresgrund verteilt, Cover-Emojis variiert: 🐚🦀💧🐚🌿🪨🐚⚓🏺.
- TAPS_TO_CRACK = 3 (Zeile 364): jede Muschel braucht 3 Taps zum Öffnen. Interaktion = einfaches Antippen (onPointerDown, Zeile 812), NICHT Long-Press, NICHT Wischen.
- Feedback pro Tap (tapCrater, Zeile 599–640): Tap1 → 💫-fx + „tap"-Sfx + craterShake; Tap2 → ✨-fx, Muschel skaliert auf 1.1; Tap-Indikator = 3 kleine Punkte unter der Muschel füllen sich (Zeile 811). Tap3 → Muschel „gecrackt".
- Treffer-Verteilung randomisiert (_rollResults, Zeile 365–366): a = 2+floor(rand·2) ∈ {2,3}; b = a+2 ∈ {4,5}; c = b+2 ∈ {6,7}. Gekeyt auf searchedCount (Reihenfolge der geöffneten Muscheln, nicht Position): die a-te geöffnete Muschel = „find1" (🔱 Dreizack), b-te = „find2" (💎 Juwel), c-te = „runaway" (Meerjungfrau flieht). Alle anderen geöffneten Muscheln = „empty" (💫, ausgegraut + 🫧 Staubpuff). Der Spieler muss also weiter-öffnen bis alle 3 Schlüssel-Events getriggert sind (reine Suche, kein Verlieren).
- Jeder Schatz (find1/find2) → in `found`-Array, Himmel-Palette verdunkelt sich pro Fund (SKY[min(found.length,3)], Zeile 655/367–376: Morgen-Lagune→Korallen-Schimmer→Tiefsee→Abgrund-Nacht). HUD: 3 Progress-Dots [🔱💎🧜‍♀️] + Zähler „found.length/3 🔱".

PHASE 2 — MEERJUNGFRAU FANGEN (Chase/Fang):
- Getriggert wenn die „runaway"-Muschel öffnet (Zeile 630–633): 400ms später spawnRunner().
- Cinematic-Vorlauf (spawnRunner, Zeile 401–407): chasePhase='cinematic', Musik-Tempo→0.55 (Chase-Sound), Countdown 3(0ms)→2(800ms)→1(1600ms)→0/LOS(2400ms).
- Ab 2900ms (Zeile 408–475): Runner spawnt Mitte (0.5·W, 0.45·H), Bewegung per requestAnimationFrame-Loop `mermaidLoop`. Physik: Steering auf zufälliges Ziel, Velocity-Dämpfung ·0.88/Frame, Max-Speed sinkt über Zeit (spdDecay<180→5, <480→3.8, sonst→3, Zeile 434), Wand-Abpraller (x 10..W-70, y 15%..H-80), neues Ziel bei Nähe/Stillstand, FLUCHT-Impuls wenn Finger dist<35 (Zeile 464–469). dir flippt Sprite horizontal.
- FANG (catchRunner, Zeile 477–497): onPointerUp direkt auf dem Runner-Div (Zeile 799). Setzt caught, vibrate [30,40,90], „catch"-Sfx (Arpeggio 523/659/784/1047), Musik-Tempo→1, find3 in `found`, 🧜‍♀️-Burst-fx; nach 1200ms → phase='won' + window.parent.postMessage('gameComplete','*').

SCHWIERIGKEIT / NO-FAIL-STAND HEUTE: Es gibt KEINE Alters-Staffelung (TAPS_TO_CRACK, Speeds, Radius alle fix). Es gibt KEINEN Tipp-Knopf, KEINEN Auto-Fang, KEINEN Timeout — die Meerjungfrau schwimmt unbegrenzt weiter bis getippt; man kann nicht verlieren, aber auch nicht „gerettet" werden wenn ein kleines Kind sie nicht trifft (Frust-Risiko). Speed-Decay (5→3) ist die einzige Erleichterung. → Rebuild MUSS No-Fail-Netze + Alters-Stufen nachrüsten (s. rebuildNotes).

**Reveal HEUTE (Referenz):** Foto wird HEUTE NICHT reveal-last gezeigt — es ist von Anfang an offen (Reveal-Bruch): (1) Intro-Panel zeigt bei gesetztem fotoUrl das scharfe Kind-Foto 80×80 rund (bob-Animation) statt des 🧜‍♀️-Emojis (Zeile 772). (2) In der Chase-Phase IST die fliehende Figur selbst das scharfe Kind-Foto — der Runner-Img rendert src=fotoUrl||RUNNER_IMG, 80×80 rund mit grünem Rand (Zeile 799–803); ohne Foto wird stattdessen ein Cute-Meerjungfrau-SVG (RUNNER_IMG, Zeile 352) angezeigt. (3) Win-Screen bestätigt „Du hast [childName] gefangen! 🎉". Das Gesicht ist also bereits im Intro und die ganze Jagd über sichtbar; es gibt keinen finalen Enthüllungs-Moment. Genau das ersetzt der Rebuild durch magicFly (blur→scharf erst beim Fang).

**Win-/Reveal-Copy:** (siehe unten — Feld winCopy)

**Audio/Visual-Charakter:** Farben/Szene: Unterwasser-Meeresgrund im Hochformat (9/16, maxWidth 420). 4-stufige Himmel-Palette die pro Fund verdunkelt (SKY Zeile 367–376): #E0F7FA Morgen-Lagune → #4DD0E1 Korallen-Schimmer → #006064 Tiefsee → #001419 Abgrund-Nacht; Boden-Gradient Teal→dunkel. Deko: Sonne+Glow oben rechts, 35 twinkelnde Sterne/Bläschen, 2 wave-pulse-Glows, schwimmender Fisch 🐟 (fishSwim 30s linear), 🐙, Boden-Krater, 🪸 Seegras, aufsteigende Bubbles. Muschel-Cover variiert 🐚🦀💧🌿🪨⚓🏺. Akzentfarbe #4DD0E1/#00ACC1.

Sound (WebAudio, startet gemutet, 🔇/🔊-Toggle Zeile 752): Loop-Melodie 16 Noten pentatonisch (NOTES Zeile 508), Sine + Bass 82Hz; im Chase → Sawtooth, Pitch ×1.2, Tempo 0.55, Bass 140Hz (Zeile 522–547). SFX (Zeile 588–592): tap=triangle440; find=523/659/784 Aufwärts-Arpeggio; empty=247 dumpf; alarm=392/311/392 square; catch=523/659/784/1047 Sieg-Arpeggio. Vibration: find 60ms, runaway [40,60,40], catch [30,40,90].

Animationen (CSS Zeile 672–689): bob, sway, drift, floatUp (fx steigen auf), sparkBurst/ripple (Fund-Ringe), craterShake (Muschel-Tap), dustPuff (leere Muschel), starTwinkle, mermaidFloat, bubbleRise, wavePulse, fishSwim, confetti (Win, 50 Teile), bounceIn. Tap-Emojis 💫→✨, Fund 🔱/💎 mit Ripple, leer 🫧.

**UNBEDINGT bewahren:** Der Charme sitzt in 4 Dingen, die der Rebuild NICHT verlieren darf:
1. Der Mid-Game-TWIST als Herzstück: Erst brave Schatzsuche (Muscheln öffnen), dann kippt es überraschend — eine Muschel enthält eine freche Meerjungfrau, die das Juwel klaut und flüchtet. Dieser „SPLASH!"-Cinematic-Bruch mit Countdown (3-2-1-LOS!) ist der Wow-Moment und muss bleiben.
2. Die zwei distinkten Spiel-Gefühle: ruhiges, befriedigendes 3-Tap-Muschel-Cracken (mit füllenden Tap-Dots + Shake + 💫→✨→Fund) UND danach die hektische Fang-Jagd nach einer flitzenden, ausweichenden Figur, die vor dem Finger wegzuckt (Flucht-Impuls bei Nähe).
3. Die progressive Meeres-Atmosphäre: Himmel verdunkelt sich pro Fund von Morgen-Lagune bis Abgrund-Nacht — visuelles Fortschritts-Signal, das Spannung aufbaut.
4. Die adaptive Musik: entspannte pentatonische Sine-Melodie → im Chase Sawtooth, höher, schneller (Tempo 0.55) — sofort spürbarer Dringlichkeits-Wechsel.
Nicht bewahrenswert (bewusst ersetzen): das scharfe Kind-Foto als fliehende Figur (Reveal-Bruch) und das Fehlen jeder Assistenz.

**Rebuild-Hinweise (core.js):** Ziel: schlankes core.js-Spiel wie game-korallen-meerjungfrau.html (nutzt bereits fast alle nötigen Bausteine). Engine: machsleicht-deploy/_dev/prototypes/core/core.js.

(A) REVEAL-LAST-KONFORM MACHEN — der eine echte Bruch heute:
- HEUTE: Foto sichtbar ab Intro (Zeile 772, 80×80 rund statt 🧜‍♀️) UND die fliehende Figur IST das scharfe Kind-Foto (Zeile 799: src=fotoUrl||RUNNER_IMG). Gesicht also die ganze Chase über offen. Muss weg.
- REBUILD: fliehende Figur = MOTTO-Sprite (🧜‍♀️/🧜 Emoji bzw. der vorhandene RUNNER_IMG-SVG als Deko), NIE das Foto. Übernimm exakt das magicFly-Muster aus korallen (core-Game Zeile 19–25): das magicFly-Element trägt background:var(--photo) aber startet blur(20px)+scale(.5) mit 🧜-Emoji-Badge (::after) → liest als „Meerjungfrau-Schemen im Wasser". Erst .caught (Zeile 22) macht filter:blur(0)+scale(1.75)+Glow = das scharfe Foto-Reveal in der Mitte = Magic-Moment.
- Teaser während Phase 1: pro gefundenem Schatz ein Boden-Medaillon (.locket, background:var(--photo)) minimal schärfen via sharpen(frac) — GECAPPT bei ~0.28 Opacity / 15px Blur (korallen Zeile 88), Gesicht bleibt verhüllt. winSeq blendet locket aus (opacity 0), magicFly liefert das scharfe Reveal.

(B) NO-FAIL nachrüsten (heute komplett fehlend):
- Auto-Fang: finT=setTimeout(()=>{ if(magicPhase) catchMagic(); }, 4000–5000) analog korallen Zeile 105 — Meerjungfrau ergibt sich nach einigen Sekunden.
- Fliehende Figur soll nach ~15s stehenbleiben/langsamer werden (heute läuft mermaidLoop unbegrenzt; entweder spdDecay so verschärfen dass Speed gegen ~0 geht, oder nach Timeout in einen ruhigen Hover wechseln).
- Sichtbarer 💡-Tipp-Knopf: core.js hängt ihn automatisch an wenn eine globale `tip()`-Funktion existiert und kein eigener #tippBtn da ist (core.js Zeile 96–100). tip() während magicPhase → catchMagic() (wie korallen Zeile 116). Plus _idleArm/_floorArm-Nudge (core Zeile 128/151) automatisch aktiv.

(C) 3 ALTERS-STUFEN via ageNum() (core.js Zeile 61, ?age=, Default 8) — heute alles fix. Muster wie korallen Zeile 86:
- TAPS_TO_CRACK: ageNum()<=6 → 2, <=9 → 3, sonst → 3 (ggf. 4 mit mehr Decoy-Muscheln).
- Chase-Speed (heutiges 5/3.8/3-Decay): <=6 → langsamer (z.B. 3.5/2.8/2.2) + Fang-Radius größer; <=9 → mittig; sonst heutige Werte.
- Auto-Fang-Timeout kürzer für jüngere (<=6 → 4s, sonst 5s).

(D) ENGINE-BAUSTEINE aus core.js, die passen (viel ist in game-korallen-meerjungfrau.html schon verdrahtet — als Vorlage nehmen):
- setPhoto(THEME, NOPHOTO) → HAS_PHOTO, setzt --photo, pessimistisches data-photo-failed bis onload (core Zeile 65–92) → Win-Copy immer über `HAS_PHOTO && !data-photo-failed` gaten.
- sharpen(frac) capped-Teaser (korallen Zeile 88); winSeq() (Zeile 101) blendet locket aus + startet magicFly-flit; catchMagic() (Zeile 107) scharfes Reveal + Win-Copy; No-Fail-Auto-Catch (Zeile 105).
- note()/noise()/AC() für Sfx (core Zeile 29–50) — heutige Sounds nachbauen (tap triangle440, find 523/659/784, catch 523/659/784/1047, alarm 392/311/392 square). confetti() (core Zeile 162). show()/.scene-System, _idleArm/_floorArm, kid()/guestName()/ageNum().
- Struktur-Vorschlag: 3 Szenen (s-intro, s-game, s-win). Phase 1 = Wimmelbild-Klasse (feste Muschel-Divs, tap→count, 2 Treffer schärfen locket). Phase 2 = magicFly-Reveal (flit→catch). Damit deckt EIN core-Game beide Phasen ab.

WICHTIG: game-korallen-meerjungfrau.html ist bereits die reveal-last+no-fail+magicFly-Referenz für dieses Motto — die whatsapp-App liefert das FEHLENDE: den 2-Phasen-Aufbau (Muschel-Suche → Twist → Chase), die Cinematic-„SPLASH!"-Countdown-Sequenz, die verdunkelnde Himmel-Progression und die exakte Copy. Beides kombinieren.

---

## 10. feuerwehr
**Titel:** Feuerwehr-Einsatz (React-Component `FeuerwehrEinsatz`). Angezeigter Titel: „{childName}s Feuerwehr-Einsatz". Intro-Claim: „Brände löschen und Helden retten!". Datei: C:\Users\Bolle\OneDrive - ADVERGY GmbH\Dokumente\Claude\Projects\machsleicht\machsleicht-deploy\einladung\feuerwehr\whatsapp\index.html (lesbarer Spiel-Code Z.351–931). Genre: Rubbel-Lösch-Wimmelspiel mit Chase-Finale. Slug für Rebuild-Analogie: notruf/loeschen/drehleiter-feuerwehr (core.js).

**Story / Rahmen:** Drei Phasen: intro → play → won (State `phase`, Z.389). 

INTRO (phase="intro", Z.824–836), Text wörtlich:
- Overline: „📨 Einladung zur Feuerwehr-Party"
- H1: „{childName}s Feuerwehr-Einsatz"
- Datum/Zeit-Chip: „📅 {partyDate} · 🕑 {partyTime}"
- Avatar: fotoUrl als 80px-Kreis (grüner Rand) ODER 🚒-Emoji, bobbing
- H2: „Brände löschen und Helden retten!"
- Body: „Hilf {childName}, die Feuer zu löschen und die versteckten Schätze zu finden!"
- 3 Ziel-Chips: „🚒 Löschzug" · „🏅 Medaille" · „🧯 Geheimnis!"
- Instruktion: „☝ Rubbel die Feuer aus — einfach drüberreiben!"
- Start-Button: „🚒 Einsatz starten!"

Die Erklärung, WAS zu tun ist, steht ausschließlich im Intro + im wandernden Bottom-Hint (Z.864). Kein Story-Charakter/Erzähler in der React-Version — anders als das core.js-Muster (loeschen-feuerwehr hat „Fips"-Panels). Props (Z.377–383, URL-Parse Z.919–927): childName(name), partyDate(date), partyTime(time), partyPlace(ort), rsvpPhone(tel), fotoUrl(foto; nur akzeptiert wenn party.machsleicht.de/api/invimg/-URL oder base64).

**Mechanik (Schritt fuer Schritt):** PHASE 1 — FEUER LÖSCHEN (rubbeln), Z.617–678:
- 9 Feuer-Items an festen x/y-%-Positionen (ITEMS, Z.353–363), Cover-Emojis variiert: 🔥/💨/🪟/🚪/🪜 (Feuer, Rauch, Fenster, Tür, Leiter).
- TAPS_TO_CRACK=3 (Z.364): jedes Feuer braucht 3 „Treffer" bis gelöscht.
- Treffer-Eingabe ZWEI Wege: (a) RUBBELN primär — Finger über Feuer wischen; rubFire (Z.668–678) akkumuliert Bewegung, alle rb.acc>=60px UND >140ms seit letztem → 1 Treffer; pointerId-gebunden + setPointerCapture (Multi-Touch-sicher, Z.662–666). (b) TAP-Fallback — onPointerDown ruft direkt tapFire (Z.877).
- Pro Treffer (Z.629–632): Shake (fireShake .35s), Wasser-FX 💧, Sound „tap"(440Hz triangle), Vibration; Emoji schrumpft (taps1→scale.82, taps2→scale.6, Z.902); 3-Punkt-Fortschrittsindikator unter Feuer füllt rot (Z.876).
- Nach 3 Treffern: Feuer gelöscht, searchedCount++ (Z.634), Ergebnis aus CRACK_RESULTS-Map bestimmt.

TREFFER-VERTEILUNG (Randomisierung, `_rollResults` Z.365): a=2+rand(0..1) → a∈{2,3}; b=a+2; c=b+2. Also: der a-te gelöschte Brand liefert „find1" (🚒 Löschzug), der b-te „find2" (🏅 Medaille), der c-te „runaway" (Feuerteufelchen flüchtet). Alle übrigen = „empty" (💫, Staub-Puff, ausgegraut, Z.652–657). c ist der 6. oder 7. Brand → Finale kommt nach 6–7 Löschungen.
- SKY-Gradient verdunkelt mit found.length (4 Stufen Rauch-Grau→Flammen-Orange→Glut-Rot→Asche-Nacht, Z.367–376/693). Fortschritt „{found.length}/3 🚒" oben rechts. Bottom-Hint wechselt mit found.length (Z.864).

PHASE 2 — CHASE-FINALE (spawnRunner→catchRunner), Z.401–509 — das ist der 3. „Schatz":
- Ausgelöst wenn „runaway"-Brand gelöscht (Z.648–651, nach 400ms spawnRunner).
- spawnRunner (Z.401–488): chasePhase="cinematic", Musik-Tempo→0.55 (Chase-Sound). Countdown-Overlay 3→2→1→„LOS!" (je 800ms, Z.404–407). Cinematic-Text (Z.864): „ALARM!" / „Ein freches Feuerteufelchen zündelt herum!" (mit Foto: „{childName} hat den Schlauch geklaut!") / „Fang es ein — der Einsatz hängt davon ab!" (Foto: „Fang {childName} ein!"). Ab 2900ms startet die Jagd.
- Runner-Physik (flameLoop, requestAnimationFrame, Z.428–486): Geschwindigkeit steuert auf zufälliges Ziel zu, Speed-Cap sinkt über Zeit (spdDecay<180→5, <480→3.8, sonst→3, Z.434), prallt an Wänden ab (0.7-Dämpfung), wechselt Ziel bei Nähe(<35px)/geringer Geschwindigkeit; blickt in Bewegungsrichtung (scaleX dir, Z.482/864).
- Runner-Sprite (Z.864): fotoUrl → SCHARFES Kind-Foto (80px-Kreis grüner Rand, bobbing) ODER RUNNER_IMG (SVG-Feuerteufelchen mit Kulleraugen, Z.352, flameFloat-Animation).
- catchRunner (Z.489–509): Tap/pointerUp auf Runner → gefangen. Vibration [30,40,90], Sound „catch"(523/659/784/1047 rising), FX 🧯, Musik→1, found+="find3". Nach 1200ms → phase="won" + postMessage("gameComplete") (Z.507).
- Header/Banner/Hint im Chase (Z.864): „🏃 Fang das Feuerteufelchen!" / „🏃 Schnapp dir das Feuerteufelchen!" / „🏃 Schnell, das Feuerteufelchen flüchtet!".

SCHWIERIGKEITS-PARAMETER (Ist-Werte, keine Alters-Staffelung vorhanden): TAPS_TO_CRACK=3 fix; Rubbel-Schwelle 60px/140ms; Runner-Speed 5→3.8→3; Runner-Größe 70–80px; Countdown 2.4s; Spawn-Delay 2.9s. Es gibt KEINEN Fail-State (man kann nur weiterjagen), aber auch keinen Auto-Fang/Tipp — theoretisch endloses Jagen möglich.

**Reveal HEUTE (Referenz):** JETZIGE Version (Referenz, reveal-last-VERLETZEND): Das Kind-Foto (fotoUrl) wird an DREI Stellen SCHARF/voll sichtbar gezeigt: (a) Intro als 80px-Kreis mit grünem Rand (Z.825, bobbing); (b) — der Problemfall — als fliehende Figur WÄHREND der GESAMTEN Chase-Finale-Phase (Z.864: img src=fotoUrl, 80px, umherfliegend, scharf); (c) implizit auf dem Win-Screen über den Copy-Text „Du hast {childName} gefangen!" (Z.859). Es gibt KEINE progressive Enthüllung, KEIN Blur→Scharf, KEIN in-game hüpfendes Foto vor dem Win. Das Gesicht ist ab dem Intro komplett offen — genau das muss der Rebuild auf „erst beim Fang enthüllen" umstellen. Ohne Foto (RUNNER_IMG-Fallback) flieht das Feuerteufelchen-SVG (Z.352) — dieser Fall ist bereits reveal-neutral und liefert die Sprite-Vorlage.

**Win-/Reveal-Copy:** WON-Screen (phase="won", Z.838–862), Text wörtlich:
- 🚒 bounceIn + Konfetti.
- H1: „Einsatz geschafft!" (mit Foto: „Du hast {childName} gefangen! 🎉")
- Body: „Alle Brände gelöscht 🏆 Du bist jetzt offiziell zur Feuerwehr-Party von {childName} eingeladen!"
- Subtext: „Der Löschzug fährt pünktlich los — sei an Bord!"
- Party-Karte: „📅 {partyDate}" / „🕑 {partyTime}" / „📍 {partyPlace}"
- WhatsApp-Button: „🚒 Ich komme zur Feuerwehr-Party!" → wa.me/{rsvpPhone} mit Prefill (Z.860): „Alarm, Alarm! 🚒 Ich komme zur Feuerwehr-Party! Wir sind dabei bei {childName}s Feuerwehr-Geburtstag am {partyDate} um {partyTime}! 🎉🔥"
- „🔄 Nochmal spielen" (restart, Z.679–692: würfelt CRACK_RESULTS neu).
- Badge: „🏅 OFFIZIELLER FEUERWEHRHELD"
- CTA: „🚒 Schatzsuche für deinen Kindergeburtstag →" (→ machsleicht.de/schatzsuche, Umami-Event `einladung-schatzsuche-cta` props{motto:feuerwehr}, Z.862)
- Footer: „Kostenlos · Sofort startklar · machsleicht.de"

STORY-BEATS für den Rebuild (aus core.js-Muster loeschen-feuerwehr Z.119–122 übernehmbar): Beat 1 = Identität enthüllen („Der geheime Feuerwehr-Star ist {kid()}!"), Beat 2 = Rollenumkehr/Gast-Gutschrift mit guestNow()-Name.

**Audio/Visual-Charakter:** FARBEN (Z.367–376, Z.724): Feuer-Palette — Orange #FF6D00/#FF3D00, Rot #BF360C/#B71C1C/#C62828, Gold #FFD600/#FFAB00, dunkle Böden #1B1210/#0D0805. SKY 4-Stufen-Verdunkelung an found.length gekoppelt: 0 Rauch-Grau → 1 Flammen-Orange → 2 Glut-Rot → 3 Asche-Nacht (1.5s ease-Transition).

EMOJI/SPRITES: Feuer-Cover 🔥/💨/🪟/🚪/🪜; Fund-Belohnungen 🚒 Löschzug, 🏅 Medaille, 🧯 Extinguisher; empty→💫; runaway-Sprite = RUNNER_IMG (inline SVG-Feuerteufelchen mit weißen Kulleraugen + Flammen-Körper, Z.352); Deko: Glut-Punkte (EMBER_COLORS #FF6D00/#FF3D00/#FFD600, emberGlow-Puls), Rauchschwaden (smokePulse), Funkenflug ✨ (sparkFloat 25s), Mond 🌙, Pfotenabdrücke 🐾, angedeutete Häuser.

SOUNDS (WebAudio, Z.522–611): Loop-Chiptune 16-Noten-Melodie [262,330,392,523,...] square-wave + sine-Bass 82Hz; im Chase (tempo 0.55) → sawtooth, Pitch ×1.2, Bass 147Hz (hektisch). SFX: tap=440 triangle; find=523/659/784 Arpeggio; empty=247 sine; alarm=392/311/392 square; catch=523/659/784/1047 rising. Mute-Toggle 🔇/🔊 oben links, startet STUMM (muted=true, Z.515; iOS-Audio erst per Geste).

ANIMATIONEN (CSS Z.725–743): bob/gentle/sway (Feuer wippen), fireShake (Treffer), dustPuff (empty), floatUp+ripple (Fund-FX), flameFloat (Runner), bounceIn (Countdown/Win), confetti, sparkBurst. VIBRATION: Treffer 60ms, runaway [40,60,40], Fang [30,40,90].

**UNBEDINGT bewahren:** DER SPASS-KERN, den der Rebuild bewahren MUSS:
1. Zwei-Phasen-Dramaturgie: erst ruhiges, befriedigendes RUBBELN/Löschen mehrerer Feuer (haptisch, Wasser-Tropfen, Schrumpf-Feedback, 3-Punkt-Progress pro Feuer) — DANN eskalierender Bruch: ein Brand „flüchtet" und wird zur wilden Fang-Jagd. Dieser Bruch (ruhig→hektisch) ist der Charme.
2. Das JAGEN selbst: eine quirlige, physikalisch umherflitzende Figur (Feuerteufelchen), die abprallt, Richtung wechselt, wegzuckt wenn man nah dran ist — kindgerecht schwer-aber-schaffbar, weil der Speed über Zeit sinkt. Der Fang ist der Triumph-Moment (Vibration-Burst + Rising-Arpeggio + 🧯-FX).
3. Cinematic-Anticipation vor der Jagd: ALARM-Overlay + Countdown „3-2-1-LOS!" + Tempo-Wechsel der Musik auf hektisch (sawtooth, 1.2× Pitch). Baut Spannung auf.
4. Fortschritts-Belohnung: Himmel verdunkelt sichtbar mit jedem Fund; 3 Trophäen-Dots füllen sich (🚒/🏅/🧯); jede Fund-Art hat eigenen Sound + Emoji-Reveal mit Ripple.
5. Überraschungs-Varianz: nicht jedes Feuer ist ein Treffer (viele „empty" mit Staub-Puff) — das Suchen bleibt spannend, weil man nicht weiß, welches Feuer den Schatz/Flüchtling birgt. Positionen der Treffer sind randomisiert.
6. Reiche Kulisse: Glut-Partikel, Rauchschwaden, Funkenflug, Mond — die brennende Nachtszene fühlt sich lebendig an.

**Rebuild-Hinweise (core.js):** Ziel: schlankes core.js-Spiel (Muster wie _dev/prototypes/game-loeschen-feuerwehr.html + game-jeep-safari.html), Szenen #s-intro / #s-game / #s-win, `<script src="core/core.js">`. Engine-Bausteine, die passen: setPhoto(THEME,NOPHOTO), sharpen(frac), confetti(CC), note()/noise(), kid()/ageNum()/guestNow(), show('s-win'), vib(), plus der automatische Tipp-Button + Idle-Nudge (_idleArm) + Hard-Floor (_floorArm) — alle GRATIS, sobald eine globale tip()-Funktion existiert (core.js Z.97–159).

(1) REVEAL-LAST-KONFORM (kritischer Fix — der aktuelle Bug): In der React-Version wird bei Foto das SCHARFE Kind-Foto als Flucht-Figur benutzt und die GANZE Jagd + Intro lang gezeigt (Z.864 img src=fotoUrl) → Gesicht ist von Anfang an sichtbar. STATTDESSEN: fliehende Figur = IMMER das Feuerteufelchen-Sprite (das RUNNER_IMG-SVG aus Z.352 existiert schon als no-photo-Fallback — jetzt als EINZIGE Flucht-Figur, egal ob Foto da ist). Kind-Foto bleibt bis zum Fang verborgen/geblurrt (core.js --photo per CSS gesetzt, aber via faceguard/blur verdeckt wie loeschen-feuerwehr Z.17 bzw. jeep-safari .goalPhoto blur(16px), Z.26/103). Erst beim FANG scharf enthüllen.

(2) MAGIC-MOMENT (hüpfendes Foto in-game VOR Win-Screen — Bolle-Pflicht Task #80): Fang → jeep-safari-Muster snapSpecial→winSeq (Z.131–139/153) 1:1 übernehmen: beim Fang wird das Feuerteufelchen durch das Kind-Foto ersetzt, das (a) von blur→scharf zieht (sharpen 0→1), (b) „vor Freude hüpft" (CSS-Klasse .joy, ~1.9s in-game), (c) dann erst show('s-win')+confetti. Das ist das Herzstück — nicht wegoptimieren.

(3) NO-FAIL härten: Jagd endlos-vermeidbar machen. Konkret: (a) fliehende Figur bleibt nach ~15s stehen / wird groß+langsam (spdDecay bereits vorhanden Z.434 — bis Stillstand ausbauen); (b) tip() definieren, das im Chase die Figur automatisch fängt bzw. in Phase 1 ein weiteres Feuer Richtung Finale löscht → dann hängt core.js automatisch „💡 Tipp" an + Idle-Nudge nach 10s + Hard-Floor-Auto-Fang nach 30s (core.js Z.126/151). tip() muss self-guarden (if(done)return).

(4) 3 ALTERS-STUFEN via ageNum() (core.js Z.61): analog loeschen-feuerwehr GOAL_ER (Z.88). Vorschlag: ageNum<=6 → 3 Feuer bis Flüchtling + langsamer/großer Runner (spd 3, 90px) + Auto-Fang ~8s + TAPS_TO_CRACK=2; ageNum<=9 → 5 Feuer + mittlerer Runner (spd 4) + TAPS=3; sonst → 7 Feuer + schneller/kleiner Runner (spd 5, 60px). Rubbel-Schwelle für Kleine lockerer (40px statt 60).

(5) STORY-MUSTER v2 ergänzen (React-Version hat es NICHT, core.js-Set schon): 3 tippbare Intro-Panels mit Erzähler (analog „Fips" in loeschen-feuerwehr Z.74–83) + optionaler Gastname-Twist (guestNow), der die falsche Fährte „geheimer Feuerwehr-Star" im Finale auflöst.

(6) Beibehalten aus React ohne Änderung: WhatsApp-RSVP-Prefill-Text, Schatzsuche-CTA + Umami-Event, Feuer-Palette/SKY-Verdunkelung, WebAudio-SFX-Kennlinien (tap/find/alarm/catch) + Tempo-Wechsel-Chase-Musik, Cinematic-Countdown „3-2-1-LOS!", Konfetti, Vibrationsmuster. postMessage('gameComplete') beim Win beibehalten (Z.507) — Worker-Kontrakt.

---

## 11. baustelle
**Titel:** Bagger-Einsatz / „Bagger fangen und Werkzeuge bergen" (Slug in der Prototypen-Namenskonvention am ehesten `game-baggereinsatz-baustelle` bzw. `game-schutt-baustelle` — NICHT identisch mit dem bereits existierenden `game-bagger-baustelle.html`, das eine völlig andere Lane-Race-Mechanik hat)

**Story / Rahmen:** Zwei-Phasen-Buddel-und-Fang-Story, eingebettet als WhatsApp-Einladung (React-App, index.html Z.377–902).

INTRO-Panel (Z.804–816), wörtlich:
- Kicker: „📨 Einladung zur Baustelle-Party"
- H1: „{childName}s Baustelle-Einsatz"
- Datum-Chip: „📅 {partyDate} · 🕑 {partyTime}"
- Avatar: Kind-Foto (falls fotoUrl) ODER 🚜, mit bob-Animation
- H2 (oranger Hook): „Bagger fangen und Werkzeuge bergen!"
- Fließtext: „Hilf {childName}, den Bagger einzufangen und die versteckten Werkzeuge zu finden!"
- 3 Icon-Chips: 🚜 „Bagger" / ⛑️ „Helm" / 🦡 „Geheimnis!"
- Instruktion: „☝ Buddel den Schutt weg — 3x tippen!"
- Start-Button: „🚧 Einsatz starten!"

Kern-Narrativ: Auf der Baustelle liegen 9 Schutt-/Material-Haufen. Das Kind buddelt sie weg (je 3 Tipps). Darunter versteckt sind 2 Werkzeuge (🚜 Bagger, ⛑️ Helm) und — als Twist — ein „frecher Bagger-Frechdachs" (🦡 Dachs), der beim Freilegen aufschreckt und über die Baustelle flieht. Das Kind muss ihn fangen. Fängt es ihn, ist es „offiziell zur Party eingeladen".

CINEMATIC/ALARM-Übergang beim Aufschrecken (Z.844), wörtlich:
- „ALARM!"
- H2: „Ein frecher Bagger-Frechdachs buddelt überall!" (mit Foto-Variante: „{childName} ist mit dem Bagger losgefahren!")
- p: „Fang ihn ein — die Baustelle hängt davon ab!" (Foto-Variante: „Fang {childName} ein!")
- Countdown 3 → 2 → 1 → „LOS!" (je 800ms)

Der ganze Ton ist „Baustellen-Einsatz/Alarm" — Alarm-Rot, Glut-Orange, Rauch. Kind ist am Ende „OFFIZIELLER BAULEITER".

**Mechanik (Schritt fuer Schritt):** ZWEI PHASEN. Parameter mit exakten Source-Werten.

PHASE 1 — BUDDELN (Tap-to-clear, Z.617–658):
- 9 Schutt-Haufen an festen Positionen (ITEMS, Z.353–363): x/y in % + cover-Emoji: fire1(18,50,🪨) fire2(72,48,🧱) fire3(45,58,🛢️) fire4(84,55,🪨) fire5(28,70,🪵) fire6(62,74,🚧) fire7(10,62,🧱) fire8(88,65,📦) fire9(42,86,🪨). Leichte „gentle"-Schwebe-Animation je Haufen.
- TAPS_TO_CRACK = 3 (Z.364): jeder Haufen braucht 3 Tipps zum Wegräumen. Tap-Indikator = 3 Punkte unter dem Haufen (Z.856), füllen sich rot. Tap 1→💫, Tap 2→✨ Partikel + Shake (400ms), Tap 3 = aufgedeckt.
- Ergebnis pro aufgedecktem Haufen aus CRACK_RESULTS (Z.365–366, PRO SPIEL RANDOMISIERT): `a=2+floor(rand*2)` → a∈{2,3}; b=a+2; c=b+2. D.h. der a-te aufgedeckte Haufen = find1 (🚜 Bagger), der b-te = find2 (⛑️ Helm), der c-te = „runaway" (Dachs schreckt auf). a∈{2,3}, b∈{4,5}, c∈{6,7}. Alle anderen Haufen = „empty" (leer → 💨 Staub, Haufen wird grau/ausgegraut, Z.652–657/871–872).
- Feedback (Z.637–639): Vibration runaway=[40,60,40] sonst 60; SFX runaway=„alarm", Fund=„find", leer=„empty". find1→🚜 discover-FX + floatUp; find2→⛑️ discover-FX; runaway→💨 surprise-FX, dann nach 400ms spawnRunner().
- Fortschritt: 3 HUD-Dots (🚜 ⛑️ 🦡) + Counter „{found}/3 🚧". Himmel wird mit jedem Fund dunkler (SKY[min(found.length,3)], 4 Stufen Rauch-Grau→Flammen-Orange→Glut-Rot→Asche-Nacht, Z.367–376/673).

PHASE 2 — FANGEN (Chase, Z.401–509):
- Trigger: der c-te aufgedeckte Haufen (runaway). spawnRunner: chasePhase=„cinematic", Musik-Tempo 0.55 (schneller), Countdown 3/2/1/0 (800ms-Takt), dann nach 2900ms Runner-Spawn in Szenenmitte (0.5·W, 0.45·H) mit zufälliger Startgeschwindigkeit, chasePhase=„chase".
- Runner-Bewegung (flameLoop, requestAnimationFrame, Z.428–486): steuert auf zufällige Zielpunkte zu (Beschleunigung dx/dist·1.2·dt, Reibung ·0.88), Geschwindigkeitskappe sinkt über Zeit: spdDecay<180 → spd 5; <480 → 3.8; sonst 3 (Z.434) — Fangbarkeit steigt automatisch. Prallt an Rändern ab (·0.7). Bei Annäherung (dist<35, Z.476–481) wählt Runner neues Ziel + Zufalls-Impuls = „weicht aus". Richtung dir flippt scaleX des Sprites.
- Fangen (catchRunner, Z.489–509): onPointerUp auf den Runner. Setzt caught, Vibration [30,40,90], SFX „catch", found += find3 (🦡), catch-FX 🦡, Musik-Tempo →1, nach 1200ms phase=„won" + postMessage(„gameComplete").
- Runner-Sprite HEUTE (Z.844–848): fotoUrl (Kind-Foto, 80px, grüner Rand, SCHARF) ODER RUNNER_IMG (🦡-Dachs-SVG, 70px). ⚠️ Reveal-last-Bruch: bei Foto-Party fliegt das SCHARFE Kind-Foto herum (s. rebuildNotes).

SCHWIERIGKEIT: KEIN ?age-Param im Source (Props nur name/date/time/ort/tel/foto, Z.890–898) → Alters-Staffel ist NEU im Rebuild. Fixe Werte heute: 3 Taps, 9 Haufen, Runner-Speed-Decay 5/3.8/3.

**Reveal HEUTE (Referenz):** HEUTE (Referenz-Verhalten, index.html):
- Bei Foto-Party (fotoUrl gesetzt) wird das Kind-Foto an DREI Stellen gezeigt: (a) im Intro als runder Avatar (Z.805, 80px grüner Rand); (b) WÄHREND der Chase ALS der fliehende Runner selbst — SCHARF, ungeblurrt, 80px grüner Rand, bob-Animation (Z.844–848: `img src=fotoUrl` mit `filter:drop-shadow` aber KEIN blur); (c) implizit im Win über die Copy „Du hast {childName} gefangen".
- Ohne Foto ist der Runner der 🦡-Dachs-SVG (RUNNER_IMG, base64 in Z.352), und der Win zeigt nur 🚜 + „Baustelle gewuppt!".
- ⚠️ Es gibt HEUTE KEINEN geblurrten→scharfen Magic-Moment und KEIN „Foto erst beim Fang enthüllt". Das Foto ist von Anfang an sichtbar. Das ist der zentrale reveal-last-Bruch, den der Rebuild beheben muss.

**Win-/Reveal-Copy:** WON-Screen (Z.818–842), wörtlich:
- Konfetti (50 Stück) + 🚜 (bounceIn)
- H1: mit Foto „Du hast {childName} gefangen! 🎉" / ohne Foto „Baustelle gewuppt!"
- Fließtext: „Alle Werkzeuge geborgen 🏆 Du bist jetzt offiziell zur **Baustelle-Party von {childName}** eingeladen!"
- Sub: „Die Baustelle startet pünktlich — sei dabei!"
- Party-Karte: „📅 {partyDate}" / „🕑 {partyTime}" / „📍 {partyPlace}"
- Primär-Button (WhatsApp-RSVP, Z.839–841): „🚧 Ich komme zur Baustelle-Party!" → öffnet `https://wa.me/{rsvpPhone}?text=` mit Text: „Schicht im Schacht! 🚧 Ich komme zur Baustelle-Party! Wir sind dabei bei {childName}s Baustelle-Geburtstag am {partyDate} um {partyTime}! 🎉🚧"
- Sekundär: „🔄 Nochmal spielen" (restart, Z.659–672 — würfelt CRACK_RESULTS neu)
- Badge: „🏅 OFFIZIELLER BAULEITER"
- Footer-CTA-Link: „🚧 Schatzsuche für deinen Kindergeburtstag →" → machsleicht.de/schatzsuche (plausible-Event „einladung-schatzsuche-cta", props motto:„baustelle") + „Kostenlos · Sofort startklar · machsleicht.de"

HUD-Zwischentexte (Bottom-Hint, Z.844):
- found 0: „☝ Buddel den Schutt weg — 3x tippen!"
- found 1: „🚧 Erstes Werkzeug! Noch 2 finden!"
- found 2: „🔨 Fast geschafft! Noch eins!"
- found 3: „🎉 Baustelle gewuppt!"
- chase: „🏃 Schnell, der Bagger-Frechdachs flüchtet!" (Foto: „Schnell, {childName} flüchtet!")
Chase-Banner oben: „🏃 Schnapp dir den Bagger-Frechdachs!" (Foto: „Schnapp dir {childName}!")
Top-Titel: chase „🏃 Fang den Bagger-Frechdachs!" / searchedCount>=4&&found<3 „💫 Da rumpelt was Komisches..." / sonst „🚧 {childName}s Baustelle-Einsatz".

**Audio/Visual-Charakter:** FARBEN: durchgehend Baustellen-Alarm-Palette. Akzent Glut-Orange #FF6D00 / #FF3D00, Tiefrot #BF360C / #B71C1C. 4-stufiger Himmel-Verlauf (SKY, Z.367–376) von Rauch-Grau (#37474F/#455A64) über Flammen-Orange (#BF360C/#E64A19) und Glut-Rot (#B71C1C) bis Asche-Nacht (#1A0A00), Boden #3E2723→#1B1210. Sonne/Glow passt sich je Stufe an.

EMOJI/SPRITES: Schutt-Cover 🪨🧱🛢️🪵🚧📦; Funde 🚜 (Bagger) ⛑️ (Helm); Twist-Figur 🦡 (Frechdachs, als 70px SVG RUNNER_IMG); Baustellen-Deko 🚧. FX-Partikel 💫 ✨ 💨 (Staub) 🎉 (Konfetti, 50 Stück, 7 Farben CONF_COLORS).

ANIMATIONEN (CSS-Keyframes Z.705–723): bob (Schweben), gentle (Haufen-Wiegen), fireShake (Tap-Ruckeln), dustPuff (Staub-Weg), floatUp (Fund-Partikel steigt), sparkBurst/ripple (Fund-Ring), bounceIn (Countdown/Win-Pop), confetti, flameFloat (Runner-Wackeln), emberGlow (Glut-Partikel pulsieren), smokePulse/smokeDrift (Rauch), sparkFloat (Funke zieht durch). Fliegende Glut-Partikel (STAR_POS, 35 Stück) im Hintergrund.

SOUND (WebAudio, standardmäßig STUMM, Toggle 🔇/🔊 Z.585–588): 16-Ton-Melodie-Loop (NOTES Z.522) mit Bass; Tempo-Modulation — normal square-Welle Tempo 1, Chase sawtooth + Pitch·1.2 + Tempo 0.55 (schneller/hektischer, Z.542–543). SFX (Z.606–610): tap (440Hz triangle), find (aufsteigend 523/659/784), empty (247Hz dumpf), alarm (392/311/392 square), catch (523/659/784/1047 aufsteigender Jingle). Vibration-Feedback an mehreren Stellen.

**UNBEDINGT bewahren:** Der Charme, den der core.js-Rebuild ZWINGEND bewahren muss:

1. DIE ZWEI-PHASEN-DRAMATURGIE mit dem TWIST: erst ruhiges, befriedigendes Weg-Buddeln (9 Haufen, 3 Tipps, Staub-Partikel, Haufen schrumpfen/ausgrauen) — dann der plötzliche „ALARM!"-Bruch, wenn statt Werkzeug ein Frechdachs aufschreckt. Der Überraschungsmoment (surprise-FX 💨 + Alarm-Sound + Countdown 3-2-1-LOS) ist das Herz des Spaßes.

2. DAS FANG-GEFÜHL: eine flinke, ausweichende Figur, die auf zufälligen Bahnen über die Szene flitzt und bei Annäherung wegspringt (dist<35 → retarget + Zufalls-Impuls), aber deren Fangbarkeit über die Zeit automatisch steigt (Speed-Decay 5→3.8→3). Das „endlich erwischt!"-Payoff mit Vibration [30,40,90] + aufsteigendem catch-Jingle.

3. PROGRESSIVE ATMOSPHÄRE: der Himmel/Hintergrund verdunkelt sich mit jedem Fund über 4 Stufen (Rauch-Grau → Flammen-Orange → Glut-Rot → Asche-Nacht) + Glut-Partikel (embers) + Rauch-Schwaden. Gibt dem Fortschritt spürbares Gewicht.

4. DER 3-TIPP-RUBBEL-RHYTHMUS mit klarem Feedback: Tap-Punkte füllen sich, Shake, eskalierende Partikel (💫→✨), unterschiedliche Sounds für Fund/Leer/Alarm. Kind versteht in 5s ohne Erklärung: „ich tippe 3x, dann kommt was zum Vorschein."

5. DIE BAULEITER-BELOHNUNG: „🏅 OFFIZIELLER BAULEITER" + „Du hast {childName} gefangen! 🎉" — die persönliche, stolz machende Win-Copy.

6. RANDOMISIERUNG: welcher Haufen Bagger/Helm/Dachs birgt, ist jedes Spiel anders (CRACK_RESULTS neu gewürfelt) → Wiederspielwert.

**Rebuild-Hinweise (core.js):** Rebuild als schlankes core.js-Spiel (Muster `game-*.html`, Engine `_dev/prototypes/core/core.js`). Die Zwei-Phasen-Mechanik bildet sich sauber auf die vorhandenen Engine-Bausteine ab — vor allem auf das magicFly-Catch-Muster aus `game-bagger-baustelle.html`.

(1) REVEAL-LAST-KONFORM MACHEN (Kernumbau):
- Phase 1 (Buddeln) bleibt fast 1:1: 9 Haufen (`.item` divs, feste x/y%), TAPS_TO_CRACK=3, CRACK_RESULTS-Randomisierung (a∈{2,3},b=a+2,c=b+2) für find1/find2/runaway. Funde 🚜/⛑️ sind reine Emoji — kein Foto. Kein Foto in Phase 1 sichtbar.
- Die FLIEHENDE FIGUR darf NICHT das scharfe Kind-Foto sein. Nutze das `.magicFly`-Element (core-Muster): ein runder Div mit `background-image:var(--photo)` aber `filter:blur(20px)` + `::after`-Motto-Emoji-Aufkleber (in bagger-baustelle ist es 👷 bzw. 🦡 für dieses Spiel). Während der Chase flitzt `.magicFly.flit` als UNSCHARFE Silhouette mit Dachs-Emoji obenauf. Optional Ziel-Silhouette via `sharpen(frac)` — GEKAPPT (Blur bleibt bis Fang, s. `sharpen`-Cap Z.97 in bagger-baustelle: opacity ≤ 0.12+0.33·f², Blur nie unter Rest → nur erahnbar).
- MAGIC-MOMENT beim Fang: `catchMagic()` → `.magicFly.caught` schaltet `filter:blur(0)` + scale(1.5) + Glow (Muster Z.114–117 bagger-baustelle). DAS ist die erstmalige scharfe Foto-Enthüllung. Danach `.joy`-Wackler, dann nach ~2s `winReveal()` → `show('s-win')`.
- Win-Text an `data-photo-failed` koppeln (core setPhoto-Härtung): `HAS_PHOTO && !data-photo-failed` → „Du hast {childName} gefangen! 🎉", sonst Ohne-Foto-Copy „Baustelle gewuppt!". guestName()/kid() aus core für Namen.

(2) NO-FAIL (heute fehlt es — Runner ist theoretisch endlos):
- `catchMagic` als globale `tip()` verdrahten: definiere `function tip(){ if(magicPhase){catchMagic();return;} /* sonst: nächsten Haufen auto-aufdecken bzw. Fortschritt */ }`. Core hängt dann automatisch den „💡 Tipp"-Button in #s-game (Z.94–104) + Idle-Nudge (Puls nach ~10s, Auto-tip nach ~8s weiter, Z.119–139) + harten `_floorArm()`-No-Fail-Floor (aktivitätsunabhängig, Z.141–170).
- Zusätzlich Auto-Fang-Timer im Chase wie bagger-baustelle Z.110: `finT=setTimeout(()=>{ if(magicPhase)catchMagic(); },5000)`. Runner-Speed-Decay (5→3.8→3) als weiche Fangbarkeits-Rampe beibehalten.
- Phase 1 braucht keinen Fail-Zustand (leere Haufen sind folgenlos) — nur sicherstellen, dass tip() Richtung runaway-Haufen führt, damit die Chase garantiert startet.

(3) DREI ALTERS-STUFEN (`ageNum()` aus core, Z.61 — NEU, im Source nicht vorhanden):
- Muster wie bagger-baustelle Z.94–95: `ageNum()<=6 ? … : ageNum()<=9 ? … : …`.
- Vorschlag Staffelung: TAPS_TO_CRACK = ageNum<=6?2 : ageNum<=9?3 : 3. Runner-Speed-Cap = ageNum<=6?{4,3,2.5} : ageNum<=9?{5,3.8,3} : {6,4.5,3.5}. Auto-Fang-Timeout = ageNum<=6?3500 : ageNum<=9?5000 : 6500. Retarget-Ausweich-Distanz (dist<35) kleiner für Kleine (fängt leichter).

(4) PASSENDE ENGINE-BAUSTEINE aus core.js:
- `setPhoto(THEME,NOPHOTO)` → setzt `--photo`, liefert HAS_PHOTO, härtet gegen tote Foto-Links (onload/onerror, data-photo-failed). NOPHOTO = per-Spiel Baustellen-SVG (Bagger/Bauschild, wie Z.88 bagger-baustelle).
- `.magicFly` + `sharpen()` + `catchMagic/winReveal`-Muster (aus game-bagger-baustelle.html direkt übernehmbar) = fertiges Magic-Moment-Gerüst.
- `ageNum()` für Staffel; `kid()`/`guestName()`/`?g=` für Namen; `show(id)` für Scene-Wechsel (ruft intern `_idleArm`+`_floorArm`).
- `tip()`-Hook → Auto-Tipp-Button + Idle-Nudge + No-Fail-Floor gratis.
- SFX/`note()`/`noise()`/`confetti()`/`vib()` aus core statt der handgerollten WebAudio-Engine (Source Z.516–611) — spart ~120 Zeilen.
- Standard #s-intro/#s-game/#s-win-Szenen + #startBtn (core hängt „🔄 Nochmal spielen" automatisch an #s-win, Z.108).
- Beim Testen `_idleStop()` aufrufen und Cache-Bust `?fresh=N` (Pflicht-Playtest-Regel).

(5) COPY & CTA 1:1 aus Source übernehmen (winCopy-Feld) inkl. WhatsApp-RSVP-Text „Schicht im Schacht! 🚧…", Badge „🏅 OFFIZIELLER BAULEITER" und Schatzsuche-CTA mit plausible-Event motto:„baustelle".

---

## 12. dschungel
**Titel:** DschungelExpedition (Datei: einladung/dschungel/whatsapp/index.html, React-Component `DschungelExpedition`, Zeile 377). Untertitel in-App: „{childName}s Dschungel-Expedition". Zwei-Phasen-Spiel: Büsche durchsuchen → Affen fangen.

**Story / Rahmen:** Rahmen: eine WhatsApp-Einladung, verpackt als „Dschungel-Expedition mit Fotoauftrag". Kind ist Forscher/Fotograf. HOOK (Intro, Z.782-821): Eyebrow „📨 Einladung zur Dschungel-Party" → H1 „{childName}s Dschungel-Expedition" → Datums-Chip „📅 {partyDate} · 🕑 {partyTime}" → H2 „Drei Dschungel-Tiere verstecken sich!" → Body (MIT Foto) „Fang {childName} ein!" / (OHNE Foto) „Hilf {childName}, sie zu finden und fürs Dschungel-Tagebuch zu entdecken!". Darunter 3 Zielkreise: {🐸 Frosch}{🐍 Schlange}{🐵 Geheimnis!} — das dritte Tier ist bewusst als „Geheimnis!" verschleiert (Cliffhanger auf das Affen-Finale). Erklärung der Steuerung woertlich: „👆 Durchsuche die Büsche — 3x tippen!" + Start-Button „🌿 Expedition starten!". MITTE (Chase-Cinematic, Z.948-971): großer 🐵, Eyebrow „HEY!", H2 (MIT Foto) „{childName} hat die Kamera geklaut!" / (OHNE) „Ein frecher Affe klaut die Kamera!", Body „Schnapp ihn dir und mach das letzte Foto!" + Countdown 3/2/1/LOS!. Der narrative Twist: das letzte, wichtigste Foto ist auf der geklauten Kamera — deshalb muss man den Dieb fangen. Erklärung ist rein diegetisch (Panels/Sprechzeilen), kein Tutorial-Overlay.

**Mechanik (Schritt fuer Schritt):** ZWEI-PHASEN-SPIEL. Konstanten: TAPS_TO_CRACK=3 (Z.364); 9 Büsche `ITEMS` mit festen x/y-%-Positionen und Emoji-Cover 🌿🍃🪵🌿🌺🪨🍃🌴🌿 (Z.353-363).

PHASE 1 — SUCHEN (tapBush, Z.619-660): Aktiv nur wenn phase==='play' && !searched && chasePhase==='idle'. Jeder Tap auf einen Busch erhöht bushTaps[id] und triggert 350-400ms rustleShake + tapIndicator (3 Punkte, Z.1022-1036). Tap 1 → sfx('tap', 440Hz) + FX 🍃; Tap 2 → sfx('tap') + FX ✨ + Busch scale 1.1; erst Tap 3 „knackt" den Busch: searchedCount++, Busch in `searched`-Set. Ergebnis = CRACK_RESULTS[searchedCount]. RANDOMISIERTE REVEAL-REIHENFOLGE (_rollResults, Z.365): a=2+rand(0|1)∈{2,3}, b=a+2∈{4,5}, c=b+2∈{6,7}; {[a]:'animal1',[b]:'animal2',[c]:'runaway'}. Heißt: der a-te geknackte Busch → 🐸 Frosch (sfx 'find', vib 60, FX 🐸), der b-te → 🐍 Schlange (sfx 'find', vib 60, FX 🐍), der c-te → RUNAWAY (Affe, sfx 'alarm' square, vib [40,60,40], FX 🐵, dann setTimeout(spawnRunner,400)). Alle übrigen geknackten Büsche = leer → 🐦 Vogel fliegt weg (birdFlyAway 1.2s, sfx 'empty' 247Hz, Rest-Emoji 💨 grau). Konsequenz-Schwelle: Finale startet erst nach 6-7 vollständig durchsuchten Büschen = bis zu 18-21 Taps in Phase 1. found[] sammelt animal1+animal2 (=2). Sky-Palette + Fortschritts-Dots 🐸/🐍/🐵 richten sich nach found.length (0-3, Z.675-690).

PHASE 2 — FANGEN (spawnRunner Z.401-490, catchRunner Z.491-511): (a) Cinematic: chasePhase='cinematic', Musik-Tempo 0.55 (Sawtooth, tenser), Countdown 3→2→1→0 in 800ms-Schritten, Büsche werden ausgeblendet (opacity .3). (b) Bei 2900ms: Läufer spawnt Mitte (0.5·w, 0.45·h), chasePhase='chase', requestAnimationFrame `monkeyLoop`. Bewegung: Steering zu zufälligem Target, velX/velY *=0.88 Dämpfung, Max-Speed sinkt mit Zeit — spdDecay<180 → 5 px/frame, <480 → 3.8, sonst 3 (Spiel wird LEICHTER je länger; Z.434). Wand-Bounce ×0.7, Retarget bei dist<35 oder v<3. dir = Blickrichtung (scaleX bei OHNE-Foto). (c) Fang: onPointerUp auf den Läufer (Z.990-1013) → runnerState.caught=true, vib [30,40,90], sfx 'catch' (523/659/784/1047 Arpeggio), rAF stop, found+='animal3', FX 📸, Musik-Tempo 1. Nach 1200ms → setPhase('won') + window.parent.postMessage('gameComplete','*') (Z.509). KEINE Verlier-Bedingung; ABER auch KEIN Auto-Ende der Jagd (läuft endlos bis getippt) — genau das ist die No-Fail-Lücke fürs Rebuild. Schwierigkeits-Parameter (Werte): TAPS_TO_CRACK=3, Läufer-Speeds 5/3.8/3, Countdown 3×800ms, Fang-Delay 1200ms, Retarget-Radius 35px, Damping 0.88.

**Reveal HEUTE (Referenz):** Heute (Referenz, reveal-last-WIDRIG): Das Kind-Foto ist an DREI Stellen scharf sichtbar, keine davon ist ein Fang-gekoppelter Magic-Moment. (1) INTRO Z.793-800: wenn fotoUrl gesetzt, wird das Foto sofort als 80×80 runder, grün gerahmter Kreis mit Bob-Animation gezeigt (sonst 📷-Emoji). (2) CHASE Z.998-1008: der fliehende Läufer SELBST ist das Kind-Foto, 64×64 rund, grün gerahmt, bobbing, die ganze Jagd über voll scharf (ohne Foto: RUNNER_IMG-Affen-PNG, Z.352, mit scaleX-Blickrichtung). (3) WON Z.851: Foto 80×80 rund, 4px oranger Rahmen, bounceIn. Der eigentliche Fang (catchRunner Z.491-511) erzeugt nur einen 📸-Emoji-Partikel (addFx 'photo') + Vibration + Sound und schaltet nach 1200ms auf 'won' — es gibt KEINEN Blur→Scharf-Übergang, das Foto ist vorher schon überall scharf. Genau deshalb muss der Rebuild die Reveal-Logik neu bauen (Foto weg aus Intro + Chase-Sprite, scharf erst beim Fang).

**Win-/Reveal-Copy:** WON-SCREEN (Z.823-903), woertlich: Foto/Emoji hüpft rein (bounceIn) → H1 (MIT Foto) „Du hast {childName} gefangen! 🎉" / (OHNE) „Expedition geschafft!" → Body „Alle Tiere entdeckt 🏆 Du bist jetzt offiziell zur Dschungel-Party von {childName} eingeladen!" → Sub „Pack dein Fernglas ein — der Dschungel wartet auf dich!" → Detail-Karte „📅 {partyDate}" „🕑 {partyTime}" „📍 {partyPlace}". PRIMÄR-CTA (grüner WhatsApp-Button) „🌿 Ich komme zur Dschungel-Party!" → öffnet wa.me/{rsvpPhone} mit Text woertlich: „Dschungel-Alarm! 🌿 Ich komme zur Dschungel-Party! Wir sind dabei bei {childName}s Dschungel-Geburtstag am {partyDate} um {partyTime}! 🐸🎉". Sekundär „🔄 Nochmal spielen" (restart). Badge „🏅 OFFIZIELLER DSCHUNGEL-FORSCHER". Fuß-CTA „🌴 Schatzsuche für deinen Kindergeburtstag →" (→ machsleicht.de/schatzsuche/dschungel, plausible-Event 'einladung-schatzsuche-cta') + „Kostenlos · Sofort startklar · machsleicht.de". IN-GAME Bottom-Hints (Z.937), progressiv: found0 „👆 Durchsuche die Lianen — 3x tippen!" · found1 „🐸 Frosch entdeckt! Noch 2 Tiere!" · found2 „🔥 Noch eins! Du bist ein echter Dschungel-Profi!" · Chase (MIT Foto) „🏃 Schnell, {childName} flüchtet!" / (OHNE) „🏃 Schnell, der Affe haut ab mit der Karte!" · found3 „🎉 Expedition geschafft!". HUD-Titel (Z.916): Chase „🏃 Fang den Affen!" · Zwischenstand „🌿 Ein Blatt raschelt verdächtig..." · sonst „🌴 {childName}s Dschungel-Expedition". Chase-Banner (Z.990) „🏃 Fang den frechen Affen!" / „Schnapp dir {childName}!".

**Audio/Visual-Charakter:** FARBEN: 4-stufige Himmels-Palette nach found.length (SKY Z.367-376) — 0 Funde Savanne-Morgen (#87CEEB→#F0E68C, Sonne #FFD54F), 1 Goldener Mittag (#FFB74D→#FFA726), 2 Sonnenuntergang (#FF7043→#E64A19), 3/Win Sternennacht (#1A237E→#0D1B3E, 20 Twinkle-Sterne). Boden erd-braun (#C8A96E→#6D4C41), Akzent Orange #FF9800/#FFB74D, Grün-Rahmen #66BB6A ums Foto. Szene 9:16, max 420px, runde Ecken, Hitze-Shimmer am Horizont. EMOJI/SPRITES: Büsche 🌿🍃🪵🌺🪨🌴, Tiere 🐸🐍🐵, Deko ☁️🦅🌳🐌🐛🐘🌾🐾, Fang-Partikel 📸/✨/🍃, Vogel 🐦/💨. SOUNDS (WebAudio, default gemutet, Toggle 🔇/🔊): Hintergrund-Loop 16 Noten Triangle+Sine-Bass; im Chase Sawtooth +15% Pitch, Tempo 0.55 (Jagd-Musik) → zurück auf 1 beim Fang. SFX: tap 440, find-Arpeggio 523/659/784, empty 247, alarm-Square 392/311/392, catch-Arpeggio 523/659/784/1047. ANIMATIONEN (Charme): bob/sway/drift (Deko), rustleShake (Busch beim Tippen), birdFlyAway (leerer Busch), monkeyBounce/animalIdle (Figuren), floatUp+photoFlash+ripple (Fang-Partikel), bounceIn (Reveals), confetti (50 Teile, Win), cinematicPulse + Countdown-Zoom, starTwinkle, heatShimmer. HAPTIK: vib 60 (Fund), [40,60,40] (Affen-Alarm), [30,40,90] (Fang), [20,40,20,40,80] (Win). Fortschritt: 3 Dots 🐸🐍🐵 + Zähler „{n}/3 📷".

**UNBEDINGT bewahren:** Der SPASS liegt in vier Dingen, die der Rebuild erhalten MUSS: (1) Der Zwei-Phasen-Bogen mit Twist: erst gemütliches „Verstecke aufdecken" (9 Büsche, 3x-Tippen, Raschel-Feedback), dann die überraschende Eskalation, wenn ein Busch statt eines Tiers einen KAMERA-DIEB freilässt und die Musik in Jagd-Tempo umschaltet (Musik 0.55, Sawtooth) — dieser Tonwechsel + Countdown-Cinematic „HEY! …" ist der Adrenalin-Kick. (2) Die frei umherflitzende Fang-Figur mit physikalischem Steering (Dämpfung, Wand-Bounce, Retarget) — sie fühlt sich „lebendig/flink" an, ist aber durch die zeitliche Speed-Abnahme (5→3.8→3) fair fangbar. (3) Die dichte Juice-Schicht: Raschel-Shake, Tap-Punkte-Indikator, 🍃/✨/📸-Partikel mit floatUp+Ripple+Flash, Vogel-Wegflug bei leerem Busch, Konfetti, Vibrations-Muster, WebAudio-SFX pro Event, und die durch found.length fortschreitende Himmels-Palette (Savanne-Morgen → Goldener Mittag → Sonnenuntergang → Sternennacht mit Twinkle-Sternen). (4) Das „Geheimnis!"-Ziel als Cliffhanger + der Foto-Fang als Höhepunkt. Ebenfalls erhalten: die drei Fortschritts-Dots 🐸🐍🐵, der Mute-Toggle, die WhatsApp-RSVP-Zeile und der Schatzsuche-CTA.

**Rebuild-Hinweise (core.js):** Rebuild als schlankes core.js-Spiel (Muster game-lianen-dschungel.html) auf den vorhandenen Engine-Bausteinen in _dev/prototypes/core/core.js:

(A) REVEAL-LAST-KONFORM MACHEN — heute wird das Kind-Foto 3× VOR dem Sieg gezeigt (Intro Z.793-800, Chase-Läufer IST das scharfe Foto Z.998-1008, Won Z.851) → das verletzt reveal-last. Fix nach exakt dem fotosafari-Muster (game-fotosafari-safari.html Z.26-31,114-134): Die fliehende Figur bleibt IMMER das MOTTO-Sprite (🐵 Affe / RUNNER_IMG-Analog), NICHT das Foto. Der Foto-Kreis erscheint erst beim Fang: Läufer trägt einen `.sfoto`-Span mit `background-image:var(--photo)` und startet BLUR (`filter:blur(10px) saturate(.6) brightness(.82)`); on-catch Klasse `.revealed` → `filter:none;transition:filter .45s ease` = die Schärfung ist der Magic-Moment „Foto im Sucher wird scharf". `HAS_PHOTO=setPhoto(THEME,NOPHOTO)` setzt --photo (Foto ODER per-Spiel-NOPHOTO-SVG bei ?nofoto/404, pessimistisches data-photo-failed-Netz, Z.65-92). Intro-Foto-Bob ENTFERNEN; Won-Copy an `HAS_PHOTO && !data-photo-failed` koppeln.

(B) MAGIC-MOMENT — nach `.revealed` die Figur `.joy`-hüpfen lassen (sjoy-Keyframe), kurz halten (~450ms), sfx('catch') + vib([20,40,20,40,80]) + confetti(CC), DANN show('s-win'). So hüpft das frisch-scharfe Foto in-game vor dem Win-Screen (Bolle-Pflicht Task #80).

(C) NO-FAIL — heute läuft die Jagd endlos bis getippt (kein Auto-Ende). Lösung set-weit über core.js: Spiel definiert globale `tip()`, die einen Schritt Richtung Lösung macht (in Phase 1: einen Rest-Busch auto-knacken bzw. bei erreichter Schwelle das Finale triggern; in Phase 2: den Läufer festhalten/langsam stellen bis Auto-Fang). core.js hängt automatisch den „💡 Tipp"-Button an #s-game (Z.97-104), den Idle-Nudge (~10s Puls → +8s Auto-tip, Z.128-139) und den harten No-Fail-Floor (garantiert tip() nach 30s, dann 9s-Takt, aktivitäts-UNABHÄNGIG, Z.151-159). Zusätzlich Läufer nach ~15s stehenbleiben lassen / Auto-Fang nach 5s (die vorhandene Speed-Decay 5→3.8→3 auf 0 erweitern). Beim Testen `_idleStop()` nutzen.

(D) 3 ALTERS-STUFEN via `ageNum()` (Z.61, ?age=, Default 8): a<=6 → einfachste Stufe (z.B. TAPS_TO_CRACK=2, Finale-Schwelle senken auf ~4 Büsche, Läufer-Speed-Cap 3.8, längere Countdown-Lesezeit, früher Auto-Fang); a<=9 → mittel (TAPS_TO_CRACK=3, Schwelle 6, Speeds wie heute 5/3.8/3); sonst → schneller Läufer + Schwelle 7. Steuert Fang-Schwierigkeit ohne je unfair zu werden (No-Fail bleibt).

(E) ENGINE-MAPPING core.js: $/show/scene-System statt React-Phasen (s-intro/s-game/s-win); AC()/note()/noise()/vib() ersetzen die Inline-WebAudio-SFX (tap→note 440, find→523/659/784, empty→247, alarm→square 392/311/392, catch→523/659/784/1047); confetti(colors) für Won; guestName()/kid() für Gast+Kind-Ansprache; setPhoto für den Foto-Kreis. Musik-Tempowechsel (0.55 Chase) als optionaler Loop beibehalten. postMessage('gameComplete') beim Win erhalten (Party-Worker-Kontrakt). Props/URL-Params heute: name/date/time/ort/tel/foto (foto = invimg-URL oder base64→data-URI, Z.1130-1138) → im core.js-Muster analog ?k=/?g=/?age=/--photo.

---

## 13. feen
**Titel:** Feen-Zauber — "Zauberblumen entdecken & Fang die Fee!" (React-Component-Name im Quellcode: FeenZauber, Zeile 377). Rebuild-Slug-Vorschlag: game-zauberwiese-feen.html (Zwei-Phasen: Wimmel-Rubbeln + Chase-Fang).

**Story / Rahmen:** Rahmen: WhatsApp-Gast-Einladung zur Feen-Party. Kind wird zur Helferin/zum Helfer gemacht, das die verzauberte Wiese absucht. Intro-Screen (Z.771-783, wörtlich): Eyebrow "📨 Einladung zur Feen-Party"; H1 "{childName}s Feen-Zauber"; Datums-Chip "📅 {partyDate} · 🕑 {partyTime}"; H2 "Zauberblumen entdecken!"; Fließtext "Hilf {childName}, die Zauberblumen zu finden und die Feen-Schätze zu entdecken!"; 3-Icon-Legende der Sammelziele: 🌺 "Blume" · ✨ "Zauberstaub" · 🧚 "Geheimnis!"; Bedien-Hinweis "👆 Erforsche die Wiese — 3x tippen!"; Start-Button "🧚 Zauber starten!". Der Hook ist ein Twist mitten im Spiel: Beim vorletzten Schatz taucht statt Beute eine FRECHE FEE auf, die den Zauberstab klaut und wegfliegt — Cinematic-Overlay (Z.799) Eyebrow "OH NEIN!", H2 "Eine freche Fee schnappt sich den Zauberstab!" (mit Foto: "{childName} hat den Zauberstab geklaut!"), Aufforderung "Fang es ein — der Zauber hängt davon ab!" (mit Foto: "Fang {childName} ein!"), dann Countdown 3·2·1·"LOS!". Erklärung ans Kind erfolgt rein über kurze, ständig aktualisierte Bodentext-Hinweise (Z.799): found=0 "👆 Erforsche die Wiese — 3x tippen!", found=1 "🌼 Zauberblume entdeckt! Noch 2 Schätze!", found=2 "🔥 Fast geschafft! Noch einer!", während Chase "🏃 Schnell, die Fee schwebt davon!" — nie ein Erklär-Wall, immer 1 Zeile.

**Mechanik (Schritt fuer Schritt):** ZWEI PHASEN. Setup: 9 fixe "cover"-Spots (ITEMS, Z.353-363: rainbow1…rainbow9, Emojis 🌸🍄🌷🌼☘️🌸🌻🌿🌸) auf %-Koordinaten über der Wiese verstreut. Konstante TAPS_TO_CRACK=3 (Z.364).

PHASE 1 — WIMMEL/RUBBELN (tapCrater, Z.599-640): Spieler TIPPT einzelne Blumen an. Jeder Spot braucht 3 Taps zum "Aufknacken" (currentTaps<3 → sfx "tap" 440Hz + Funken-FX 💫/✨ + craterShake-Wackeln 0.35s, Z.611-614; ein 3-Punkte-Indikator unter dem Spot zeigt den Fortschritt, Z.811). Beim 3. Tap wird der Spot "gecrackt": searchedCount++ und das Ergebnis wird aus einer pro-Spiel gewürfelten Verteilung gelesen. Verteilung _rollResults() (Z.365): a=2+floor(rnd*2) → a∈{2,3}; b=a+2 → {4,5}; c=b+2 → {6,7}; ergibt {a:"find1", b:"find2", c:"runaway"}. D.h. der 2./3. gecrackte Spot liefert find1 (🌺 "Blume", Z.622-625), der 4./5. find2 (✨ "Zauberstaub", Z.626-629), der 6./7. "runaway" (🧚 die fliehende Fee, Z.630-633). ALLE übrigen gecrackten Spots = "empty": Staubwolke 💨 + graues 💫, sfx "empty" 247Hz (Z.634-639). Feedback pro Fund: Vibration (find=60ms, runaway=[40,60,40]), sfx "find" (Arpeggio 523/659/784) bzw. "alarm" (392/311/392 square). Sammelfortschritt: found[]-Länge treibt (1) 3 HUD-Dots 🌺✨🧚 (Z.656-670), (2) Zähler "{found}/3 🌼" (Z.799) und (3) die Himmel-Palette SKY[min(found.length,3)] (Z.655/367-376: 0 Morgen-Rosa → 1 Regenbogen → 2 Zauber-Lila → 3 Sternennacht), Hintergrund-Crossfade 1.5s. Soft-Guide: sobald searchedCount≥4 und found<3 wechselt der HUD-Titel auf "💫 Eine Blume funkelt besonders…" (Z.799). Kein Timer, keine Fail-Bedingung in Phase 1 — man crackt so lange, bis runaway (Slot 6/7) fällt; da 9 Spots existieren, immer erreichbar.

PHASE 2 — CHASE/FANG (spawnRunner Z.401-476, catchRunner Z.477-497): 400ms nach dem runaway-Crack (Z.633) startet die Jagd. chasePhase="cinematic", musicTempo→0.55 (Chase-Musik: sawtooth, +20% Pitch, Z.522/528-529). Countdown-Overlay: 3 (t=0) → 2 (t=800ms) → 1 (t=1600ms) → "LOS!" (t=2400ms) (Z.404-407). Bei t=2900ms (Z.408) startet der requestAnimationFrame-Loop "unicornLoop" (Z.428-473): Fee startet Bildmitte (x=0.5·W, y=0.45·H), zufällige Startvelocity ±3.5, wandert per Steering (Beschleunigung 1.2·dt Richtung Zufallsziel, Reibung 0.88, Geschwindigkeitscap spd, Z.439-448). spd DEKAYT über Frames: spdDecay<180 → 5px/f, <480 → 3.8, sonst 3 (Z.434) — Fee wird also mit der Zeit langsamer, bleibt aber IMMER ≥3 in Bewegung. Wall-Bounce mit 0.7-Dämpfung (Z.460-463), bei Zielnähe (dist<35) neues Zufallsziel + Jitter (Z.464-469), dir-Flip je Laufrichtung (Z.470/799 scaleX). FANG-Interaktion: onPointerUp auf das Fee-Element = 1 Tap/Tap-drauf (Z.799 onPointerUp:catchRunner). catchRunner (Z.477): caught=true, Vibration [30,40,90], sfx "catch" (523/659/784/1047 aufsteigend), RAF-Stop, found+="find3", FX 🧚, Tempo→1; nach 1200ms setPhase("won") + postMessage("gameComplete") (Z.492-496). Ziel-Anzahl gesamt: 3 Schätze (find1, find2, gefangene Fee=find3).

WICHTIGE DEFIZITE (Rebuild-relevant): (1) KEIN No-Fail in Phase 2 — die Fee bleibt endlos in Bewegung (Speed-Floor 3px/f), es gibt kein Auto-Fang, kein Idle-Stopp, keinen Tipp-Knopf; ein Kind das nicht trifft, hängt fest. (2) KEINE Alters-Stufen — TAPS_TO_CRACK, Fee-Speed und alle Timings sind hart codiert, unabhängig von ?age.

**Reveal HEUTE (Referenz):** Heute (Referenz, NICHT reveal-last): Wenn ?foto gesetzt ist (nur erlaubt via party.machsleicht.de/api/invimg/ oder base64, Z.845-853), wird das Kind-Foto durchgängig SCHARF gezeigt: (1) im Intro als 80px-Kreis mit grünem Rand (Z.772), (2) als die fliehende Figur während der GESAMTEN Chase — statt der Fee-SVG wird das scharfe Foto herumgejagt (Z.799-803: 80px Kreis, grüner 3px-Rand, drop-shadow, bob-Animation), (3) im Win-Screen nur noch textlich referenziert ("Du hast {childName} gefangen! 🎉", Z.794). Es gibt KEIN Blur→Scharf, KEINEN Enthüllungs-Ploppmoment. Ohne ?foto: fliehende Figur = RUNNER_IMG (Fee/Einhorn-SVG, Z.352), Intro-Emoji 🧚 — Foto spielt gar keine Rolle. Genau dieser "Foto von Anfang an scharf sichtbar"-Zustand ist der Reveal-Bruch, den der Rebuild heilen muss.

**Win-/Reveal-Copy:** CINEMATIC-BEATS (Z.799, wörtlich, {childName}=Vorname): Eyebrow "OH NEIN!"; H2 ohne Foto "Eine freche Fee schnappt sich den Zauberstab!" / mit Foto "{childName} hat den Zauberstab geklaut!"; P ohne Foto "Fang es ein — der Zauber hängt davon ab!" / mit Foto "Fang {childName} ein!"; Chase-Banner oben "🏃 Schnapp dir die freche Fee!" / mit Foto "🏃 Schnapp dir {childName}!".

WIN-SCREEN (phase "won", Z.785-797, wörtlich): 50 Konfetti-Partikel + 🧚 bounceIn; H1 ohne Foto "Zauber vollbracht!" / mit Foto "Du hast {childName} gefangen! 🎉"; P1 "Alle Schätze gefunden 🏆 Du bist jetzt offiziell zur Feen-Party von {childName} eingeladen!"; P2 "Die Wiese funkelt schon — sei dabei!"; Info-Karte "📅 {partyDate}" / "🕑 {partyTime}" / "📍 {partyPlace}"; Primär-CTA WhatsApp-Button "🧚 Ich komme zur Feen-Party!" → öffnet wa.me/{rsvpPhone} mit Text "🧚✨ Wie magisch! Ich komme zur Feen-Party! Wir sind dabei bei {childName}s Feen-Geburtstag am {partyDate} um {partyTime}! 🌼🎉" (Z.795-796); Sekundär "🔄 Nochmal spielen" (restart, Z.794); Badge "🌼 OFFIZIELLE FEEN-ZAUBERIN"; Footer-CTA "🧚 Schatzsuche für deinen Kindergeburtstag →" → machsleicht.de/schatzsuche/feen (Umami-Event "einladung-schatzsuche-cta", props motto:"feen"); Kleintext "Kostenlos · Sofort startklar · machsleicht.de".

**Audio/Visual-Charakter:** Farben/Palette (SKY, Z.367-376): 4 Feen-Himmel die mit dem Fortschritt wechseln — Morgen-Rosa (#F8BBD0/#F48FB1/#CE93D8) → Regenbogen-Schimmer (Lila-Töne) → Zauber-Lila (#9C27B0/#7B1FA2/#4A148C) → Sternennacht-Traum (#1A0033, Sterne). Akzent durchgehend Rosa/Magenta #F48FB1. Deko-Layer: Sonne mit Glow, 35 twinkelnde Sterne, driftende Wolke ☁️, pulsierende Regenbogen-Nebel, Feen-Ring-Kreise am Boden, Mini-Blumen 🌼🌺. Emojis/Sprites: Sammelziele 🌺 (Blume) / ✨ (Zauberstaub) / 🧚 (Geheimnis/Fee); cover-Spots 🌸🍄🌷🌼☘️🌻🌿; Staub 💨/💫; fliehende Fee = detaillierte Inline-SVG (RUNNER_IMG, Z.352: lila Feen-Körper mit Regenbogen-Krönchen, Flügeln, großen Augen). Animationen (CSS @keyframes, Z.672-690): bob, sway, floatUp, sparkBurst, ripple, confetti (50 Partikel), bounceIn, craterShake (Tap-Wackeln), dustPuff, starTwinkle, unicornFloat (fliehende Fee), findIdle, cloudFloat, rainbowPulse. Sounds (WebAudio, default gemutet, Toggle 🔇/🔊 oben links): 16-Ton-Dur-Melodie-Loop mit Bass; Chase-Modus schaltet auf sawtooth +20% Pitch, Tempo 0.55 (hetzige Chase-Musik, Z.522-542); SFX tap=440Hz triangle, find=Arpeggio 523/659/784, empty=247Hz, alarm=392/311/392 square, catch=aufsteigende Fanfare 523/659/784/1047 (Z.588-592). Haptik: Vibration bei Fund (60ms), runaway ([40,60,40]) und Fang ([30,40,90]).

**UNBEDINGT bewahren:** 1) DER ZWEI-PHASEN-BOGEN mit Twist: erst ruhiges, belohnendes Absuchen/Rubbeln der Wiese (jeder 3er-Tap ein Mini-Erfolg, meist "leer", selten Schatz — das macht die Funde wertvoll), DANN der überraschende Bruch, wenn beim vorletzten Schatz eine freche Fee auftaucht, den Zauberstab klaut und flieht → Adrenalin-Chase. Dieser Rhythmus (Sammeln → Schreck "OH NEIN!" → Hetzjagd → Fang) ist der Kern-Spaß und muss bleiben. 2) DER LEBENDIGE HINTERGRUND: die 4-stufige Himmel-Verwandlung (Rosa→Regenbogen→Lila→Sternennacht) synchron zu den 3 Funden gibt spürbaren Fortschritt ohne Worte — beibehalten. 3) DIE FRECHE-FEE-PERSÖNLICHKEIT: der Charme lebt vom "freche Fee klaut den Zauberstab"-Framing, dem Countdown 3·2·1·LOS und der davonschwebenden, unberechenbar wandernden Fee (Steering + Speed-Decay = sie wird fangbar, wirkt aber quicklebendig). 4) DIE JUICE-DICHTE: 3-Punkte-Tap-Indikator, craterShake, Funken/Staub-FX, aufsteigende WebAudio-Fanfare beim Fang, Konfetti, Vibrations-Pattern — die taktile Belohnung bei jedem Tap. 5) DIE KLAREN 1-ZEILEN-HINWEISE, die das Kind ohne Erklärung durchs Spiel tragen.

**Rebuild-Hinweise (core.js):** Rebuild als schlankes core.js-Spiel (Muster game-*.html, Referenz-Reveal in _dev/prototypes/game-gluehwuermchen-feen.html):

(a) REVEAL-LAST + MAGIC-MOMENT: Heute NICHT reveal-last — das Kind-Foto wird bereits im Intro (Z.772, 80px scharfer Kreis) UND während der ganzen Chase als scharfes fliehendes Runner-Bild gezeigt (Z.799-803, fotoUrl scharf, grüner Rand). FIX: Die fliehende Figur ist der MOTTO-Sprite (Fee 🧚 / RUNNER_IMG-artige SVG), NICHT das Foto. Foto bleibt bis zum Fang verborgen. Beim Fang das core.js-`.magicFly`-Muster nutzen (game-gluehwuermchen-feen.html Z.26-30): Element mit background-image:var(--photo), Start opacity:0/blur(20px)/scale(.5); Fang → Klasse `.caught` setzt filter:blur(0) + großer Glow + scale(1.7) = scharfes Foto "ploppt" erst im Sieg-Moment heraus (setPhoto(THEME,NOPHOTO) setzt --photo, Z.65). Optional Zwischenschritt wie in gluehwuermchen: verschwommenes Foto flieht mit 🧚-Badge und schärft beim Fang — auch reveal-last-konform. sharpen()-Cap beachten (max. Schärfe erst final).

(b) NO-FAIL (heute fehlt komplett): Fee muss von selbst fangbar werden. core.js-Netz verdrahten: (i) globale `tip()`-Funktion definieren, die die Fee sofort fängt bzw. zum Spieler zieht — _sgameOn() hängt dann automatisch den "💡 Tipp"-Button an (core.js Z.94-100) und _idleArm(10000) pulsiert ihn nach 10s Inaktivität, löst nach weiteren ~8s tip() selbst aus (Z.120-132). (ii) Auto-Fang-Timeout wie gluehwuermchen (Z.123: finT=setTimeout(catchMagic,5000)) — nach ~5s Flucht fängt sich die Fee von selbst. (iii) Alternativ/zusätzlich: Fee bleibt nach ~15s stehen (Speed→0), dann Riesen-Trefferfläche. tip()/catch self-guarden (if(done)return). _idleStop() beim Fang und im Test aufrufen.

(c) 3 ALTERS-STUFEN (heute keine): Muster ageNum() (core.js Z.61, Default 8) → gestaffelte Parameter à la gluehwuermchen Z.88 `const X=(ageNum()<=6?..:ageNum()<=9?..:..)`. Empfohlene Staffel: TAPS_TO_CRACK = ageNum()<=6?2:3 (Kleine: 2 Taps/Blume); Fee-Speed-Floor = <=6?2.2 : <=9?3 : 3.8 (px/frame); Auto-Fang-Timeout = <=6?4000 : <=9?6000 : 8000ms; ggf. Spot-Anzahl reduzieren für Kleine. Alle heute hartcodierten Werte (TAPS_TO_CRACK Z.364, spd-Decay Z.434, Countdown-Timings) durch age-abhängige Konstanten ersetzen.

(d) PASSENDE core.js-BAUSTEINE: show()/scene-System (core.js Z.25, ruft automatisch _idleArm(10000)+_floorArm()); setPhoto() für --photo + HAS_PHOTO + NOPHOTO-Avatar; ageNum() für Schwierigkeit; magicFly-Muster (.magicFly/.flit/.caught + catchMagic) für die fliehende Fee + Foto-Reveal; _floorArm() für sichere Boden-/Sicht-Garantie; tip()+_sgameOn()+_idleArm/_idleStop für No-Fail-Tipp-Netz; sharpen()-Cap für gestufte Schärfe. Phase-1-Wimmeln (9 Spots × 3 Taps, _rollResults-Slots 2/3·4/5·6/7) 1:1 als Tap-Handler nachbauen; Himmel-4-Stufen-Crossfade (SKY[min(found,3)]) als CSS-Variable-Wechsel; WebAudio-SFX (tap/find/empty/alarm/catch) und Chase-Tempo-0.55 aus sfx-Modul von core.js. Deploy-Ziel bleibt einladung/feen/whatsapp/ (postMessage "gameComplete" beibehalten, Z.495).

---

## 14. pferde
**Titel:** "[Name]s Reiterhof-Tag" — Stroh-durchsuchen-und-Pony-fangen. React-Component-Name im Quellcode: PferdeReiterhof (Datei: machsleicht-deploy/einladung/pferde/whatsapp/index.html, Zeilen 353-857). Zweiphasiges Wimmel-plus-Fang-Spiel.

**Story / Rahmen:** Wer/Was: Der Spieler ist Gast auf [Name]s Reiterhof und soll beim Striegeln der Pferde helfen und im Stroh versteckte Hufeisen/Schätze finden. Hook: Beim Suchen büxt plötzlich ein freches Pony mit dem Hufeisen aus und muss eingefangen werden.

Intro-Panel (Phase "intro", ab Zeile 771, wörtlich):
- Eyebrow: "📨 Einladung zur Pferde-Party"
- H1: "[Name]s Reiterhof-Tag"
- Datum-Chip: "📅 [partyDate] · 🕑 [partyTime]"
- H2: "Hufeisen finden und Pferde striegeln!"
- Erklärtext: "Hilf [Name], die Pferde zu striegeln und die Hufeisen zu finden!"
- 3 Ziel-Icons mit Label: 🐴 "Pferd" · 🥕 "Karotte" · 🐎 "Geheimnis!"
- Anleitungs-Zeile: "👆 Suche im Stroh — 3x tippen!"
- Start-Button: "🐎 Reiterhof starten!"

Ausbüx-Cinematic (chasePhase "cinematic", Zeile 799, wörtlich, MIT und OHNE Foto):
- Eyebrow: "OH NEIN!"
- H2 ohne Foto: "Ein freches Pony schnappt sich das Hufeisen!" / H2 mit Foto (heute): "[Name] hat das Hufeisen geklaut!"
- Text ohne Foto: "Fang es ein — der Reiterhof hängt davon ab!" / mit Foto (heute): "Fang [Name] ein!"
- Countdown 3 → 2 → 1 → "LOS!"

Play-HUD-Zeilen (Zeile 799): oben-links Status "🐴 [Name]s Reiterhof-Tag" / bei Suche-Fortschritt "💫 Stroh raschelt verdächtig..." / bei Jagd "🏃 Fang das Pony!"; oben-rechts Zähler "[found.length]/3 🏇". Unten-Hinweis wechselt mit Fortschritt: 0 Funde "👆 Suche im Stroh — 3x tippen!", 1 "🏇 Hufeisen entdeckt! Noch 2 Schätze!", 2 "🔥 Fast geschafft! Noch einer!", Jagd "🏃 Schnell, das Pony galoppiert davon!". Jagd-Banner: "🏃 Schnapp dir das freche Pony!".

**Mechanik (Schritt fuer Schritt):** Zwei Phasen, gesteuert über state `phase` (intro→play→won) und `chasePhase` (idle→cinematic→chase→idle).

PHASE 1 — SUCHEN (Wimmel/Rubbel-Hybrid), Zeile 599-640 `tapCrater`:
- 9 Suchstellen `ITEMS` (Zeile 353) mit fixen %-Positionen und Cover-Emoji: 4× 🌾 Stroh, 🪣 Eimer, 🧺 Korb, 🪵 Holz, 🍎 Apfel, 🪨 Stein.
- Interaktion: TIPPEN (onPointerDown). Jede Stelle braucht `TAPS_TO_CRACK = 3` (Zeile 364) Taps, bis sie "aufgeht". Tap-Fortschritt als 3 Punkte unter der Stelle; Emoji skaliert bei 2. Tap auf scale(1.1); craterShake-Animation je Tap.
- Beim 3. Tap: `searchedCount++`, Ergebnis = `CRACK_RESULTS[searchedCount]`.
- Zufalls-Verteilung `_rollResults` (Zeile 365): a = 2 + floor(rand*2) → a ist 2 ODER 3; b=a+2; c=b+2. Belohnungen liegen also an der a-ten, (a+2)-ten und (a+4)-ten erfolgreichen Suche; alle anderen Stellen sind leer (💨 Staubwolke, `dustPuff`).
  • find1 → 🐴 (Pferd/Hufeisen), addFx "discover" 🐴, in `found[]` gepusht.
  • find2 → 🥕 (Karotte), addFx "discover" 🥕.
  • runaway → 🐎 (freches Pony bricht aus), addFx "surprise" 🐎, nach 400ms `spawnRunner()`.
- `found.length` (0-3) treibt: 3 Fortschritts-Dots (🐴/🥕/🐎) UND Himmel-Verdunkelung `SKY[min(found,3)]` (4 Paletten: Morgen-Rosa → Regenbogen-Schimmer → Zauber-Lila → Sternennacht-Traum, Zeile 367). Während Jagd/Cinematic sind Suchstellen auf opacity .3 gedimmt und nicht tappbar (`hideIfChase`, `chasePhase!=='idle'`-Guard Zeile 601).

PHASE 2 — FANGEN (Verfolgungs-Finale), Zeile 401-497:
- `spawnRunner` (Zeile 401): chasePhase "cinematic", Musik-Tempo 0.55 (verlangsamt/bedrohlich), Countdown-Setzung 3 (0ms)→2 (800ms)→1 (1600ms)→0="LOS!" (2400ms).
- Nach 2900ms: Pony spawnt Bildmitte (0.5·W, 0.45·H), Zufalls-velX/velY (±3.5), chasePhase "chase", `requestAnimationFrame`-Loop `unicornLoop` startet.
- Physik `unicornLoop` (Zeile 428): dt = clamp((ts−last)/16.67, max 3). `spdDecay++` je Frame. Geschwindigkeits-Cap sinkt über Zeit → LEICHTER mit Zeit: spd = spdDecay<180 ? 5 : spdDecay<480 ? 3.8 : 3 (also nach ~3s und ~8s Frames langsamer). Steering: Beschleunigung dir/dist·1.2·dt Richtung Zufalls-Ziel; Dämpfung velX/velY·0.88; Cap auf spd. Bei v<3 neues Ziel + Kick. Wände: Bounce ·0.7 (bleibt im Bild). Nähert sich das Pony seinem Ziel (dist<35): neues Zufallsziel + Jitter ±2 — dadurch flitzt es unruhig umher. `dir` = bewegt-sich-rechts?1:-1 (spiegelt Sprite).
- Fangen `catchRunner` (Zeile 477, onPointerUp auf dem Pony-Element): setzt caught, vib([30,40,90]), sfx "catch", RAF-Cancel, pusht "find3" in `found`, addFx "catch" 🐎, Musik-Tempo zurück auf 1. Nach 1200ms → Runner null, chasePhase idle, `phase="won"`, `postMessage("gameComplete")`.
- Pony-Rendering (Zeile 799): OHNE Foto → RUNNER_IMG (data-URI-SVG des 🐎, Zeile 352), unicornFloat-Animation, scaleX per dir. MIT Foto (HEUTE) → 80×80 rundes Kinderfoto mit grünem Rand, bob-Animation — das ist der Reveal-Bruch (s. rebuildNotes).

SCHWIERIGKEITS-PARAMETER heute (alle FIX, keine Alters-Staffel): TAPS_TO_CRACK=3; Pony-Spawn-Delay 2900ms; Countdown-Schritte 800ms; Speed-Cap-Stufen 5/3.8/3 bei Frame-Schwellen 180/480; Fang-Toleranz = ganze Sprite-Fläche (70px bzw. 80px), onPointerUp. KEIN Auto-Fang, KEIN Stopp, KEIN Tipp-Knopf.

**Reveal HEUTE (Referenz):** HEUTE dreifach gespoilt (NICHT reveal-last): (1) Intro (Zeile 772) zeigt das Kinderfoto sofort als 80×80-Kreis mit grünem Rand statt des 🐎-Emojis. (2) Während der Jagd (chasePhase "chase", Zeile 799) IST das fliehende Element das scharfe 80×80-Kinderfoto (bob-Animation) — man jagt buchstäblich das erkennbare Gesicht. (3) Cinematic-/Jagd-Copy nennt bei vorhandenem Foto das Kind namentlich als Dieb ("[Name] hat das Hufeisen geklaut!", "Fang [Name] ein!", "Schnapp dir [Name]!"). Der einzige „Reveal" ist der Win-H1 "Du hast [Name] gefangen! 🎉" (Zeile 794) — kommt aber zu spät, weil das Foto längst durchgehend sichtbar war. Es gibt KEINEN Magic-Moment (kein hüpfendes/aufblitzendes Foto vor dem Win-Screen); der Übergang Fang→Win ist ein simpler 1.2s-Timeout ohne Foto-Enthüllungs-Beat.

**Win-/Reveal-Copy:** Win-Screen (phase "won", Zeile 785-797, wörtlich):
- Icon: 🐎 (bounceIn)
- H1 mit Foto (heute): "Du hast [Name] gefangen! 🎉" / H1 ohne Foto: "Reiterhof geschafft!"
- Absatz 1: "Alle Schätze gefunden 🏆 Du bist jetzt offiziell zur Pferde-Party von [Name] eingeladen!"
- Absatz 2: "Die Pferde warten schon — sei dabei!"
- Info-Karte: "📅 [partyDate]" / "🕑 [partyTime]" / "📍 [partyPlace]"
- WhatsApp-Button: "🐎 Ich komme zur Pferde-Party!" → öffnet wa.me/[rsvpPhone] mit Text: "🐎 Auf zum Reiterhof! Ich komme zur Pferde-Party! Wir sind dabei bei [Name]s Pferde-Geburtstag am [partyDate] um [partyTime]! 🏇🎉"
- Sekundär-Button: "🔄 Nochmal spielen" (ruft `restart`, würfelt CRACK_RESULTS neu, Zeile 641)
- Badge: "🏇 OFFIZIELLE/R REITER/IN"
- Footer-CTA (Link machsleicht.de/schatzsuche, trackt plausible "einladung-schatzsuche-cta" motto:pferde): "🐎 Schatzsuche für deinen Kindergeburtstag →" + Kleintext "Kostenlos · Sofort startklar · machsleicht.de"

Konfetti-Beat: 50 Konfetti-Stücke in 7 Farben (#F48FB1,#CE93D8,#FFD54F,#B39DDB,#FF80AB,#E1BEE7,#FFF) beim Win-Eintritt.

**Audio/Visual-Charakter:** Farben: Rosa/Lila-Pastell, Akzent #F48FB1 + #CE93D8, dynamischer Himmel-Verlauf der mit Fortschritt von Morgen-Rosa über Zauber-Lila zu Sternennacht kippt (SKY-Array, Zeile 367; 35 funkelnde Sterne, driftende Wolke ☁️, pulsierende Regenbogen-Schleier, Sonne mit Glow). Sprites/Emoji: 🐴🐎🥕🍎 + Cover 🌾🪣🧺🪵🪨, Deko 🌼🌺🌟. Sound (WebAudio, default stumm, Mute-Toggle 🔇/🔊 oben-links): Hintergrund-Loop 16 Sine-Noten (Melodie C-D-E-G…), der in der Jagd auf Sawtooth×1.2-Frequenz + Bass 140Hz umschaltet und Tempo 0.55 fährt (bedrohlicher „Chase"-Score) — Tempo-Wechsel via setMusicTempo ist ein zentraler Dramaturgie-Trick. SFX (Zeile 571): tap=440Hz Triangle, find=523/659/784 aufsteigend, empty=247Hz dumpf, alarm=392/311/392 Square (Pony büxt aus!), catch=523/659/784/1047 Triumph-Arpeggio. Haptik: vibrate bei jedem Fund (60ms), Ausbruch ([40,60,40]) und Fang ([30,40,90]). Animationen: craterShake je Tap, dustPuff für Nieten, floatUp/sparkBurst/ripple für Funde, unicornFloat/bob für das Pony, bounceIn + 50-teiliges 7-Farben-Konfetti beim Sieg. Charme = kippende Tageszeit + Musik-die-zur-Hatz-wird + freche Pony-Physik.

**UNBEDINGT bewahren:** Der Kern-Spaß ist die ZWEI-AKT-DRAMATURGIE mit Überraschungs-Twist: (1) ruhiges, taktil-befriedigendes Stroh-Durchsuchen (3-Tap-„Aufplatzen" pro Stelle, mit Staub-Nieten und Fund-Jubel dazwischen — Spannung durch Ungewissheit welche Stelle etwas birgt), das (2) unerwartet in eine adrenalin-getriebene Verfolgungsjagd kippt, wenn ein freches Pony ausbüxt. Dieser „Oh nein!"-Bruch mit Countdown (3-2-1-LOS) und Tempo-Wechsel der Musik ist der emotionale Höhepunkt und MUSS erhalten bleiben.

Konkret bewahren:
- Der Twist-Moment: Suchen → plötzlicher Ausbruch → Cinematic-Countdown → Jagd. Nicht wegvereinfachen zu reinem Wimmelbild.
- Das flitzende, unruhig-ausweichende Pony (springt zu neuen Zielen sobald man nah kommt, dist<35 → Neuziel + Jitter) — das „fast-gefangen-doch-entwischt"-Gefühl.
- Die selbsterklärende 3-Tap-Mechanik ohne Text (Kind versteht in 5s: „tippen bis was passiert").
- Der Fortschritts-Bogen über den Himmel (Morgen-Rosa → Sternennacht) und die 3 Sammel-Dots 🐴🥕🐎 als sichtbares Ziel.
- Die haptische/akustische Belohnung je Fund (vibrate + aufsteigende Sine-Arpeggios) und der triumphale Catch-Sound (523/659/784/1047 Hz).
- Die freche, kindgerechte Story-Stimme ("Ein freches Pony schnappt sich das Hufeisen!", "Fang es ein!").

**Rebuild-Hinweise (core.js):** Rebuild als schlankes core.js-Spiel (Muster wie machsleicht-deploy/_dev/prototypes/game-*.html; Engine: _dev/prototypes/core/core.js). Referenz-Bauplan liegt schon vor: game-hufeisen-pferde.html demonstriert exakt reveal-last + magicFly + No-Fail für dasselbe Motto — daran orientieren. Vier Umbauten:

(a) REVEAL-LAST-KONFORM (heutiger Bruch: Foto ist schon im Intro als 80×80-Kreis sichtbar UND das fliehende Pony IST das scharfe Foto, Zeile 772/799 — spoilt den Reveal komplett):
- Intro-Foto-Kreis entfernen bzw. durch 🐎-Sprite ersetzen. Foto NIE vor dem Fang scharf.
- Fliehende Figur = MOTTO-Sprite 🐐/🐎 (RUNNER_IMG-SVG bleibt), NICHT das Kinderfoto.
- Cinematic-/Jagd-Copy IMMER die OHNE-Foto-Variante nehmen ("Ein freches Pony schnappt sich das Hufeisen!" / "Fang es ein" / "Schnapp dir das freche Pony!") — nicht "[Name] hat…/Fang [Name]". Der Name/das Foto taucht erst beim Fang auf.
- Alternativ (in hufeisen bewährt): fliehende Figur = `.magicFly`-Element mit `background-image:var(--photo)` aber GECAPPT unscharf (blur≥20, opacity gedeckelt) → beim Fang `.caught` = blur(0)+scale(1.5)+joy-Animation. Beide Wege sind reveal-last-gültig; für die WhatsApp-Version primär den Sprite-Weg nehmen (klarste Trennung, da heute grob gespoilt).
- Reveal-Enthüllung heute NUR im Win-H1 ("Du hast [Name] gefangen!") — das bleibt, aber der scharfe Foto-Reveal wird an den Fang-Moment gekoppelt (s. Magic-Moment).

(b) MAGIC-MOMENT (Pflicht laut Task #80): Beim Fang morpht das Pony-Sprite → scharfes, hüpfendes Kinderfoto-Polaroid IN-GAME, bevor der Win-Screen kommt. Muster aus game-hufeisen-pferde.html `catchMagic()` (Zeile 137): `.caught` entfernt blur, scale(1.5), `mjoy`-Animation ×4, dann erst `show('s-win')`. Also: Fang → 🐎 friert → Foto „springt hervor"/hüpft (bob/joy) mit Aufblitz-Ring + confetti-Vorschuss → nach ~1.2s Win-Screen.

(c) NO-FAIL (heute nur Speed-Decay, kein echtes Netz): drei Ebenen wie im core-Muster:
- Fliehende Figur bleibt nach ~15s stehen / verlangsamt bis Stillstand (heute sinkt Cap nur auf 3, nie 0 — auf 0 auslaufen lassen oder „müde"-Stopp).
- Auto-Fang nach 5s: `finT=setTimeout(()=>{if(magicPhase)catchMagic();},5000)` (game-hufeisen-pferde.html Zeile 133) — Jagd-Fläche ODER Auto-Timeout löst Fang aus.
- Tipp-Knopf: globale `tip()`-Funktion definieren → core.js hängt automatisch „💡 Tipp" an #s-game und trägt via Idle-Nudge (~10s) + Hart-Floor (~30s, mashing-fest) das Kind bis zum Reveal (core.js Zeile 94-159). In Phase 1 macht tip() einen Schritt (öffnet die nächste Belohnungs-Stelle); in Jagd-Phase ruft tip() `catchMagic()`.

(d) 3 ALTERS-STUFEN (heute KEINE — alles fix): über `ageNum()` aus core.js (?age=, Default 8) staffeln, Muster game-hufeisen-pferde.html Zeile 106 `(ageNum()<=6?…:ageNum()<=9?…:…)`. Konkrete Kandidaten:
  • TAPS_TO_CRACK: ≤6 → 2, ≤9 → 3, sonst 3-4.
  • Pony-Speed-Cap / Ziel-Sprung-Häufigkeit: ≤6 langsamer + größere Fang-Toleranz + früherer Auto-Fang (~3-4s), älter schneller/wuseliger (~5-6s).
  • Anzahl Leer-Nieten vor Belohnung ggf. reduzieren für Jüngste.

ENGINE-BAUSTEINE aus core.js die passen: `setPhoto(THEME,NOPHOTO)` → HAS_PHOTO + `--photo` (mit onload/onerror-Fallback auf NOPHOTO-SVG, kein leeres Polaroid); `sharpen(frac)`-Cap-Muster (Foto bleibt Silhouette bis Fang); `magicFly`/`catchMagic`-Muster (fliegendes Foto-Element, `.flit`→`.caught`); `_idleArm`/`_floorArm`/`_idleStop` (No-Fail-Netze, automatisch via `show('s-game')`); `tip()`-Konvention (Auto-Tipp-Button); `kid()`/`guestName()`/`ageNum()`; `note()`/`noise()`/`vib()`/`confetti()` für Sound/Haptik/Konfetti (Farben #F48FB1,#CE93D8,#FFD54F,#B39DDB,#FF80AB,#E1BEE7,#FFF); Szenen `#s-game`/`#s-win` + `show()`. Beim Reset/Test `_idleStop()` aufrufen. Foto-URL-Regel beibehalten: nur https://party.machsleicht.de/api/invimg/ ODER base64 (Zeile 853).

Datei-Referenzen: Quelle C:\Users\Bolle\OneDrive - ADVERGY GmbH\Dokumente\Claude\Projects\machsleicht\machsleicht-deploy\einladung\pferde\whatsapp\index.html (Zeilen 351-857 lesbar); Ziel-Muster …\_dev\prototypes\game-hufeisen-pferde.html + …\_dev\prototypes\core\core.js. Achtung: hufeisen-pferde ist ein ANDERES Spiel (Hufeisen-Werfen/Zielen), NICHT dieselbe Mechanik — nur als reveal-last/magicFly/no-fail-STRUKTUR-Vorlage nutzen; die Such-plus-Fang-Mechanik dieses WhatsApp-Spiels ist eigenständig nachzubauen.

---

## 15. ritter
**Titel:** Intern im Code: "RitterMission" (React-Component, index.html Zeile 390). Nutzer-Titel: "{childName}s Ritter-Mission" (Intro-H1 Z.776, HUD Z.803). Motto-Slug: ritter. Rebuild-Zielname im core.js-Muster: game-truhen-ritter.html (Truhen-Durchsuchen + Drachen-Fang) — passt zur game-<mechanik>-<motto>.html-Konvention der _dev/prototypes.

**Story / Rahmen:** Zweiphasiges "Suchen -> Fangen"-Spiel in einer 9:16-Burg/Metropolis-Szene. RAHMUNG (Intro, Z.775-787): Eyebrow "📨 Einladung zur Ritter-Party", H1 "{childName}s Ritter-Mission", Datums-Badge "📅 {partyDate} · 🕒 {partyTime}". Avatar bobbt (bob 2.5s) — im Original ist das FOTO des Kindes (80x80 Kreis, gruener Rand) ODER 🦸-Emoji ohne Foto. H2 "Burg-Truhen durchsuchen!". Erklaertext: "Hilf {childName}, die Truhen zu oeffnen und die Ritter-Ausruestung zu finden!". Drei Ziel-Chips: ⚔️ Schwert / 🛡️ Schild / 🐉 Geheimnis!. Hinweis "👆 Oeffne die Truhen — 3x tippen!". Start-Button "🦸 Mission starten!". PHASE-1-STORY: 9 Kisten/Truhen liegen in der Szene; das Kind tippt sie auf und findet nacheinander Schwert und Schild (die anderen sind leer = 🎊-Ueberraschung). PHASE-2-HOOK (cinematic, Z.803): Beim Aufdecken der dritten Belohnung springt statt Ausruestung ein Drache heraus, der das Schild klaut — Vollbild-ALARM-Cinematic mit 🐉, Eyebrow "ALARM!", H2 "Ein frecher Drache klaut das Schild!", "Fang ihn ein — die Burg braucht dich!", 3-2-1-LOS-Countdown. Dann jagt das Kind den fliehenden Drachen durch die Szene und faengt ihn per Tap. WICHTIG/REVEAL-BRUCH: Im Original wird bei vorhandenem Foto die Story-Copy umgeschrieben, sodass das KIND selbst der Dieb/Fluechtling ist ("{childName} hat das Schild geklaut!", "Fang {childName} ein!", "Schnapp dir {childName}!") und das scharfe Kind-Foto die Flucht-Figur IST — d.h. die Story enthuellt das Kind schon waehrend der Jagd (nicht reveal-last).

**Mechanik (Schritt fuer Schritt):** PHASE 1 — TRUHEN DURCHSUCHEN (tapCrate, Z.630-671):
- 9 Kisten (ITEMS, Z.353-363) auf FESTEN Positionen (x/y in %), Cover-Emojis variiert: 📦 🏺 🛢️ 📦 ⚱️ 🕯️ 📦 🪵 🪨. Kisten "atmen" (gentle 3.5s, gestaffelt per item.x*25ms).
- TAPS_TO_CRACK = 3 (Z.364): jede Kiste braucht 3 Taps zum Aufbrechen. Tap 1 -> 💥, Tap 2 -> ✨ (+ scale 1.1), jeder Tap = crateShake .35s + sfx('tap') + Tap-Punkt-Indikator (3 Dots unter der Kiste fuellen sich blau). Erst der 3. Tap oeffnet.
- TREFFER-VERTEILUNG (CRACK_RESULTS via _rollResults, Z.365-366): a = 2+rand(0..1) (=2 oder 3), b=a+2, c=b+2. Die a-te geoeffnete Kiste = find1 (⚔️ Schwert), die b-te = find2 (🛡️ Schild), die c-te = runaway (🐉 Drache). ALLE anderen geoeffneten Kisten = leer (result "empty"). Zaehlung ueber searchedCount (Reihenfolge des Oeffnens, NICHT welche Kiste) -> jede Runde andere Kisten "gewinnen" (Randomisierung).
- Ergebnis-Feedback (Z.653-670): find1 -> ⚔️ + floatUp+ripple-FX + sfx('find'); find2 -> 🛡️; empty -> 🎊 confettiPop + sfx('empty') (Kiste graut aus, opacity .25); runaway -> 🐉 surprise-FX + sfx('alarm') + vibrate + nach 400ms spawnRunner().
- HUD (Z.803): oben Titel wechselt (runner aktiv "🏃 Fang den Drachen!" / searchedCount>=4 && found<3 "💥 Eine Truhe rappelt verdaechtig..." / sonst "🏰 {childName}s Ritter-Mission"); 3 Fortschritts-Dots ⚔️🛡️🐉 fuellen sich; Zaehler "{found}/3 ⚔️". Unten Hinweise nach found-Zahl: 0 "👆 Oeffne die Truhen — 3x tippen!", 1 "⚔️ Schwert entdeckt! Noch 2 Gegenstaende!", 2 "🔥 Fast geschafft! Noch einer!". Waehrend Chase sind Kisten opacity 0.3 + nicht tappbar (hideIfChase).
- AMBIENTE-STAFFELUNG (Z.686, SKY[min(found.length,3)]): Himmel wandelt sich mit jedem Fund Blau-Tag -> Orange-Sonnenuntergang -> Rot -> Nacht-Skyline; bei found>=3 leuchten Fenster der Skyline-Gebaeude (windowGlow).

PHASE 2 — DRACHEN FANGEN (spawnRunner Z.414-501, catchRunner Z.502-522):
- Cinematic (chasePhase "cinematic"): setMusicTempo(0.55) (Chase-Musik), Countdown setCountdown(3) -> (2 @800ms) -> (1 @1600ms) -> (0/"LOS!" @2400ms). Runner spawnt @2900ms. Vollbild-Overlay 🐉 + "ALARM!" + H2 + Aufruf + grosse Countdown-Zahl.
- Runner-Physik (villainLoop, requestAnimationFrame, dt-normalisiert auf 16.67ms, cap 3): Start Mitte (0.5w, 0.45h), Zufalls-Startgeschwindigkeit. Steuert erratisch zufaellige Zielpunkte an (Beschleunigung dx/dist*1.2*dt, Reibung *0.88). SPEED-DECAY (Z.447): spdDecay<180 Frames -> spd 5, <480 -> 3.8, sonst 3 (wird also mit der Zeit langsamer). Wand-Abprall mit 0.7-Daempfung. Naehe zum eigenen Ziel (dist<35) -> neues Ziel + Jitter = "wegzucken"-Effekt. Groesse sz=70px. Position wird als % gerendert (Z.496). WICHTIG: Der Drache flieht NICHT vom Finger weg — er wandert nur erratisch; Schwierigkeit = das bewegte Ziel treffen.
- Fangen (catchRunner, onPointerUp auf dem Runner-Element Z.803): caught=true, cancelAnimationFrame, vibrate [30,40,90], sfx('catch'), setMusicTempo(1), 🦸-FX, nach 1200ms -> phase "won" + postMessage("gameComplete").
- Runner-Darstellung (Z.803-808): <img src={fotoUrl || RUNNER_IMG}>. RUNNER_IMG = 🐉-SVG (Z.352). MIT Foto = scharfes Kind-Gesicht als Jagd-Ziel (villainDash/bob-Anim). <- REVEAL-LAST-BRUCH.

NO-FAIL-STATUS im Original: kein Verlieren moeglich, ABER der Drache kann sehr schwer zu treffen sein (erratisches Zucken), es gibt KEINEN Auto-Fang, KEINEN Stopp-Timeout und KEINEN Tipp-Knopf -> ein Kind kann de facto haengenbleiben. Muss im Rebuild ergaenzt werden.

SCHWIERIGKEITS-PARAMETER Original: TAPS_TO_CRACK=3 (alle Alter gleich), Speed-Decay 5/3.8/3 zeit- (nicht alters-)abhaengig. KEINE ageNum()-Staffel vorhanden — muss im Rebuild ergaenzt werden.

**Reveal HEUTE (Referenz):** Im JETZIGEN Original wird das Kind-Foto NICHT reveal-last behandelt — es ist an drei Stellen schon vor/waehrend des Spiels sichtbar (scharf): (a) Intro-Avatar (Z.776): bei vorhandenem fotoUrl rendert der bobbende 80x80-Kreis das scharfe Kind-Foto (sonst 🦸). (b) Jagd-Ziel (Z.803-808): die fliehende Figur ist <img src={fotoUrl || RUNNER_IMG}> — mit Foto also das scharfe Kind-Gesicht, das durch die Szene gejagt wird (kein Blur, kein Aufscharf-Effekt). Zusaetzlich benennt die Chase-Copy das Kind ("{childName} hat das Schild geklaut!"/"Fang {childName} ein!"). (c) Win-Screen (Z.789-801) zeigt hingegen KEIN Foto, sondern ein 🦸-Emoji; die Ueberschrift lautet "Du hast {childName} gefangen! 🎉". Es gibt also KEINEN Blur->Scharf-Magic-Moment und kein huepfendes Foto — das Foto ist, wo vorhanden, durchgehend scharf und schon vor dem Sieg zu sehen. Genau diese Luecke schliesst der Rebuild (Drache statt Foto als Fluechtling; Foto erst beim Fang als magicFly-Reveal).

**Win-/Reveal-Copy:** CINEMATIC/CHASE-TEXTE (verbatim, Z.803):
- Eyebrow: "ALARM!"
- H2: ohne Foto "Ein frecher Drache klaut das Schild!" / mit Foto "{childName} hat das Schild geklaut!"
- p: ohne Foto "Fang ihn ein — die Burg braucht dich!" / mit Foto "Fang {childName} ein!"
- Countdown: 3 / 2 / 1 / "LOS!"
- Chase-Banner: "🏃 " + (ohne Foto "Schnapp dir den frechen Drachen!" / mit Foto "Schnapp dir {childName}!")
- Chase-Bottom-Hint: ohne Foto "🏃 Schnell, der Drache fluechtet!" / mit Foto "🏃 Schnell, {childName} fluechtet!"

WIN-SCREEN (phase "won", Z.789-801):
- Win-Avatar: 🦸-Emoji (fontSize 60, bounceIn) — Foto wird hier NICHT nochmal gezeigt.
- H1: mit Foto "Du hast {childName} gefangen! 🎉" / ohne Foto "Mission Complete!"
- p: "Drachen gebaendigt 🏆 Du bist jetzt offiziell zur Ritter-Party von {childName} eingeladen!"
- p2: "Zieh deine Ruestung an — die Burg braucht dich!"
- Party-Details-Karte: "📅 {partyDate}", "🕒 {partyTime}", "📍 {partyPlace}"
- WhatsApp-Button: "⚔️ Ich komme zur Ritter-Party!"
- WhatsApp-Nachricht (encodeURIComponent, Z.799): "Drache gebaendigt! ⚔️🛡️ Ich komme zur Ritter-Party! Wir sind dabei bei {childName}s Ritter-Geburtstag am {partyDate} um {partyTime}! 🐉🎉" -> wa.me/{rsvpPhone}?text=...
- Replay-Button: "🔄 Nochmal spielen"
- Badge: "🏅 OFFIZIELLE/R RITTER/IN"
- CTA (Z.801): "⚔️ Schatzsuche fuer deinen Kindergeburtstag →" (Link machsleicht.de/schatzsuche, plausible-Event "einladung-schatzsuche-cta", props.motto:"ritter"), Sub "Kostenlos · Sofort startklar · machsleicht.de"

INTRO-TEXTE (Z.776): Eyebrow "📨 Einladung zur Ritter-Party" · H1 "{childName}s Ritter-Mission" · H2 "Burg-Truhen durchsuchen!" · "Hilf {childName}, die Truhen zu oeffnen und die Ritter-Ausruestung zu finden!" · Chips ⚔️ Schwert / 🛡️ Schild / 🐉 Geheimnis! · "👆 Oeffne die Truhen — 3x tippen!" · Start "🦸 Mission starten!".

**Audio/Visual-Charakter:** FARBEN: Blau-dominant (Metropolis/Burg bei Tag), --accent #42A5F5, Buttons Gradient #1565C0->#0D47A1. Dynamischer Himmel in 4 Stufen (SKY Z.380-389): Strahlend-Blau -> Sonnenuntergang-Orange -> Dramatisch-Rot -> Nacht-Skyline; Gold-Sonne mit Glow; parallax-artige Skyline-Silhouette (BUILDINGS Z.367-377) mit Fenstern, die nachts einzeln aufleuchten (windowGlow, WINDOW_DELAYS/DURS). Bodenlaternen mit warmem Schein. SPRITES/EMOJI: Cover 📦🏺🛢️⚱️🕯️🪵🪨, Belohnungen ⚔️🛡️, Twist 🐉, Held 🦸, Fund-FX ⚔️/🛡️ floatUp + Ripple-Ring, leere Truhe 🎊 confettiPop, Wolken ☁️ cloudFloat. SOUND (WebAudio, playSfx Z.602-624): tap = 440Hz triangle-Klick; find = aufsteigender Sinus-Dreiklang 523/659/784; empty = dumpfer 247Hz; alarm = 392/311/392 square (Gefahr); catch = 523/659/784/1047 Triumph. MUSIK (startMusic Z.537-579): geloopte 16-Ton-Melodie (square, ruhig) mit Bass; im Chase setMusicTempo(0.55) -> schneller + sawtooth + 1.15x Pitch = Hetz-Musik, nach Fang zurueck auf 1.0. ANIMATIONEN: bob/gentle (Atmen), crateShake (Aufbrechen), villainDash (Drachen-Flucht), bounceIn (Sieg), Konfetti-Regen (50 Stueck) im Win. Vibration bei Tap-Crack/Alarm/Fang.

**UNBEDINGT bewahren:** 1) DER "3X TIPPEN ZUM AUFBRECHEN"-KERNSPASS: 9 Truhen, jede braucht 3 Taps mit eskalierender Rueckmeldung (Tap1 💥, Tap2 ✨ + leichtes Groesserwerden, Shake bei jedem Tap, sich fuellende 3-Dot-Anzeige). Das taktile "ich haue die Kiste auf" ist der Reiz.
2) DIE SUCH-SPANNUNG durch Randomisierung: Welche Truhen Schwert/Schild/Drache enthalten, wechselt jede Runde (CRACK_RESULTS neu gewuerfelt). Leere Truhen = spielerische 🎊-Enttaeuschung ("nix drin!"), kein Strafgefuehl.
3) DER TWIST-MOMENT: Beim dritten Fund springt STATT Ausruestung ein Drache raus und klaut das Schild -> Cinematic-ALARM mit 3-2-1-LOS -> Jagd. Dieser Bruch der Erwartung ("ich sammle Ausruestung" -> "oh nein, ein Dieb!") ist der dramaturgische Hoehepunkt und muss bleiben.
4) DAS FANG-FINALE: eine bewegte Figur durch die Szene jagen und per Tap schnappen (Verfolgungs-Kick, Vibration + Triumph-Sound beim Fang).
5) DIE AMBIENTE-PROGRESSION: Himmel und Skyline wandeln sich mit jedem Fund vom Tag zur beleuchteten Nacht-Burg — belohnt Fortschritt visuell.
6) DIE WARME WIN-EINLADUNG mit Party-Daten + WhatsApp-Zusage + "OFFIZIELLE/R RITTER/IN"-Badge.

**Rebuild-Hinweise (core.js):** Zielgeruest: game-truhen-ritter.html im _dev/prototypes-Muster (3 Scenes #s-intro/#s-game/#s-win, core.css + core.js via <script src="core/core.js">, per-Spiel :root --bg1/--bg2/--fg/--accent/--accent-dk Blautoene, THEME={photo}, NOPHOTO-SVG, sfx-Objekt via note()/noise(), CC-Palette fuer confetti()). Referenz-Vorbilder: game-jeep-safari.html (Foto-Kopplung + Alters-Staffel) und game-akte-detektiv.html (magicFly-Reveal + Auto-Catch).

(1) REVEAL-LAST-KONFORM machen — der Kern-Fix. Im Original ist das scharfe Kind-Foto der Intro-Avatar UND die Flucht-Figur; die Chase-Copy nennt/zeigt das Kind. Rebuild:
- Intro-Avatar NICHT mehr das Foto zeigen -> Motto-Sprite 🦸/🏰 (oder das NOPHOTO-Avatar-SVG), nie das echte Foto.
- Flucht-Figur = IMMER der 🐉-Drache (RUNNER_IMG-SVG als Sprite), foto-unabhaengig. Die fotoUrl?-Zweige, die {childName} zum Dieb machen ("...hat das Schild geklaut!", "Fang {childName} ein!", "Schnapp dir {childName}!", "{childName} fluechtet!"), ERSATZLOS streichen — die Jagd ist immer "der freche Drache".
- Foto bleibt die ganze Jagd verborgen. MAGIC-MOMENT beim Fang: den Drachen antippen -> Drache "pooft" weg und an der Fangstelle beamt die magicFly-Foto-Scheibe heraus (blur 20px) -> sofort .caught (filter blur:0 + goldener Glow + scale 1.7) -> .joy (mjoy2/joyhop, 4x huepfen vor Freude) -> nach ~2s show('s-win') + confetti. Genau das etablierte magicFly-Muster (akte-detektiv Z.35-40 CSS, Z.141-153 JS): "Hinter dem Drachen versteckte sich {kid}!". So sind KEINE Foto-Pixel vor dem Fang sichtbar (echtes reveal-last) UND es gibt den huepfenden Foto-Magic-Moment.
- sharpen()-Cap-Muster nur noetig, falls ein Teaser-Foto schon in Phase 1 mitlaufen soll — hier NICHT: Foto erst beim Fang. Also kein waehrend-des-Spiels-sichtbares Foto; magicFly liefert das komplette Reveal.

(2) NO-FAIL (Original hat keins in der Jagd): drei Netze wie set-weit:
- tip() global definieren -> core.js haengt automatisch "💡 Tipp"-Knopf an #s-game. In Phase 1 oeffnet tip() die naechste Ziel-Truhe einen Tap weiter; in der Jagd faengt tip() den Drachen sofort (wie akte tip()->catchMagic()).
- Drache-Auto-Fang nach 5s (finT=setTimeout(catch,5000) wie akte Z.145) — faengt von selbst.
- Zusaetzlich Drache nach ~15s Bewegungsstopp (Speed auf 0 rampen -> sitzendes Ziel), damit jedes Kind trifft. core.js _floorArm() feuert tip() garantiert nach 30s (harter Floor) + _idleArm() nudged passiv nach ~10s.

(3) DREI ALTERS-STUFEN via ageNum() (fehlt im Original ganz), Muster wie jeep Z.101 (ageNum()<=6 ? .. : ageNum()<=9 ? .. : ..):
- Drachen-Tempo/Erratik: <=6 langsam + grosse Trefferflaeche (z.B. Hitbox 90px, spd 3), <=9 mittel (spd 4, 78px), sonst schnell (spd 5, 70px).
- Auto-Fang-Timeout gestaffelt: <=6 ~3.5s, <=9 ~5s, sonst ~7s.
- Optional TAPS_TO_CRACK staffeln (<=6: 2 statt 3) fuer schnelleres Phase-1-Tempo. 3 Funde (Schwert/Schild/Drache) fuer alle beibehalten.

(4) ENGINE-BAUSTEINE aus core.js, die passen: setPhoto(THEME,NOPHOTO)->HAS_PHOTO (Foto/Fallback + onerror-Haertung, data-photo-failed); Win-Copy set-weit-Muster `HAS_PHOTO && !document.documentElement.hasAttribute('data-photo-failed')` fuer die kid()-benennende Zeile, sonst generisch; guestName() (Gast-Ansprache aus ?g=/#gname), kid() (Held-Name 3. Person aus ?k=/#kname), ageNum() (?age=); note()/noise()/vib() fuer sfx (tap/find/empty/alarm/catch/win nachbauen — Frequenzen der Original-playSfx Z.619-623 uebernehmbar); confetti(CC); _idleArm/_floorArm/tip()-No-Fail; show()/#s-intro/#s-game/#s-win-Szenenwechsel; #gname/#kname-Prefill; core.js haengt Replay- und Tipp-Buttons selbst an. WhatsApp-Zusage, Party-Daten-DL und Schatzsuche-CTA aus dem Original-Win uebernehmen. Die schoene SKY/Skyline-Progression ist optionaler Ambiente-Bonus (per-Spiel-CSS/JS), kein Core-Baustein.

---
