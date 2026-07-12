# Handoff: Magic-Moment-Rollout — Audit-Arbeitsliste (2026-07-09)

Quelle: Read-only Explore-Audit aller 45 Spiele (Workflow wj92nz4o8, 09.07.). Task #80 (Magic-Moment-Foto-Reveal in ALLE Spiele) postdatet die alten Schmiede-Gates → viele „done"-Spiele haben Story/Twist/Reveal-Guard, aber NICHT den magicFly-Catch.

## Kanonisches Muster (jedes Spiel gleich)
`.magicFly` (base `opacity:0;filter:blur(8px)`, `background:var(--photo)`) + `.flit` (sichtbar-unscharf, quer-flitzen) + `.caught` (`opacity:1;blur(0);scale~1.5;glow`) + `.caught.joy` (Hop) + `::after` Motto-Emoji. `magicPhase`-Flag, `catchMagic()`, 5s-No-Fail `finT`. **Das scharfe Gesicht erscheint AUSSCHLIESSLICH auf `.caught` + dem post-catch `#s-win .hero`.** Alle Tap-Handler bekommen `if(magicPhase){catchMagic();return;}` zuerst. Restart resettet magicPhase/finT/Klassen.

## PFLICHT-Playtest (hart gelernt 09.07.)
`--photo` per JS auf `/_dev/prototypes/birthday-photo.jpg` überschreiben, SONST 404 → dunkler Fallback → JEDER Blur sieht safe aus. Schwellwerte: großes Vollflächen-Foto blur(20px)/brightness(.66); Teaser ~130px blur(15px)/brightness(.6); kleines Element (72px, opacity~.45, dunkler BG) safe ab blur(12px). Reveal-last-Phase (Solved/Teaser VOR Catch) einzeln screenshotten.

## STATUS RITTER-MOTTO — FERTIG (diese Session)
- katapult-ritter ✓ (b8b4391, Gate-Teaser blur11→blur15 nach Real-Foto-Leak)
- schwert-ritter ✓ (9c12f37, mirror blur12/opacity.45 = safe, kein Fix nötig)
- wappen-ritter ✓ (6106e6a, Kacheln blur11→blur20 nach Real-Foto-Leak)

## 14 SPIELE OFFEN — alle mit AKTIVEM Hard-Leak (sharp face vor/ohne Catch)
Reihenfolge nach Audit (Snippet erst am einfachsten Fall festzurren):

**Welle A — Standard (ein progressives Foto, kein Flood, kein storyMusterV2)**
1. `strahl-superheld` — kein Play-Leak, nur Gate+Cap (`#skySignal`+`.big`). SAUBERSTER Referenz-Build.
2. `hufeisen-pferde` — Power-Gauge, `#stallSign`+`.big`. `sharpen(1)` aus winSeq löschen.
3. `drehleiter-feuerwehr` — Aim/Timing, `#gable`+`.big` (darf auf NOPHOTO-Silhouette zeigen).
4. `notruf-feuerwehr` — Dial, `#monPhoto`; Flit im `#s-game` (NICHT im winzigen `#monitor`).
5. `stadt-superheld` — Steer/Catch, `#billboard`+`.big`.
6. `wildnis-dschungel` — Wimmelbild, `#fieldphoto`; Gotcha: `#field overflow:hidden` → Flit-Host `#s-game` oder `overflow:visible`.

**Welle B — ⚑ Full-Board-`.flood` + storyMusterV2 (Catch zwischen Outro-Beats einfädeln)**
7. `huerden-pferde` — `.goalphoto.flood`.
8. `lianen-dschungel` — `.hutphoto.flood`.
9. `spuren-safari` — `.mirror.flood` (Mirror ggf. auf neutralen Wasser-Shimmer umstellen).

**Welle C — ⚑ storyMusterV2, kein Flood, Reveal eng am Gameplay**
10. `tatort-prinzessin` — Wimmelbild, `.field.revealed`-Fade.
11. `uvschrift-prinzessin` — UV-Lampe, `.sheet.revealed`-Fade.
12. `feuer-feuerwehr` — ⚑⚑ Wisch-Reveal IST das Gameplay; zusätzlich imperfekten `.faceguard` härten (Kern opacity 1 + größer).

**Welle D — Sonderfälle**
13. `tresor-prinzessin` — Total-Leak beim Safe-Öffnen; Vault-`.pic` entschärfen (leer/blurry), Flit „aus dem Tresor".
14. `puzzle-dschungel` — ⚑⚑⚑ Foto IST das Puzzle. Re-Theme Kacheln auf neutrale Dschungel-Grafik (wie NOPHOTO-SVG), bevor Catch Sinn ergibt. (Analog wappen-ritter, aber wappen durfte Kacheln blurren statt re-themen — hier Audit-Empfehlung Re-Theme; Alternative: blur(20px) wie wappen.)

## LATENTE Leaks in „DONE"-Spielen (separater Fix, nicht Teil der 14)
- **kanone-piraten**: imperfekter radialer Faceguard → Kern opaker `#0d2a40`-Stop Richtung ~90%, Breite >86%.
- **schatz-meerjungfrau**: dormante `.treasure.up{…blur(0) brightness(1)}` (CSS ~Z.15) → `blur(0) brightness(1)` entfernen.
- **perlen-meerjungfrau**: totes `.pearlPhoto`-Element+CSS+stale reset → löschen (Foot-Gun).
- **fossil-dino**: minor Rest-Periphery (non-blocking) → optional Vollkern weiter nach außen.
- **Robustheit (kein scharfes Gesicht heute)**: sternenstaub/turm/regenbogen-einhorn, hochhaus-baustelle, taunetz-feen setzen in winSeq nur `opacity=0`, nicht `filter` → weicher Cross-Fade-Glimpse. Im selben Tick auch `filter='blur(16px)'` setzen.

## Reviews
Jedes gebaute Spiel EINZELN durchs Gate: Real-Foto-Playtest (Reveal-last + Flit + Caught Screenshots) → Einzel-Commit auf draft → unabhängiger Review (claude.ai Opus Max + ChatGPT via Chrome-MCP) → 0 MAJORs. Kein Deploy (nur „Ende deploy").
