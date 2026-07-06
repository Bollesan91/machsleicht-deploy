# Double-Review Befund: Set-weiter sharpen-Reveal-Defekt (06.07.2026)

**Quelle:** ChatGPT-Doppelcheck (gepackte Gist-Methode, s. LEKTIONEN L11) an rohre-baustelle → MAJOR 1 „Foto wird vor dem Finale schrittweise erkennbar, Twist kippt vorzeitig". Stufe-3-Grep über alle 10 gegateten Spiele bestätigt: **systematisch**, nicht rohre-spezifisch.

## Befund: sharpen()-Opacity-Kurve (game-<slug>.html)
| Kurve | Verhalten | Spiele |
|---|---|---|
| `opacity=(f<=0?0:(0.2+0.8*f*f))` **f²-verschleiert** ✓ | Gesicht bleibt bis kurz vor win() verhüllt | regenbogen, sternbild |
| `opacity=(f<=0?0:(0.XX+0.YY*f))` **LINEAR + Sockel** ✗ | Foto ab Spielstart 22–30 % sichtbar, mittig schon ~65 % | rohre (0.25), signal (0.22), tatort (0.30), uvschrift (0.25), spuren (0.30), lianen (0.30), huerden (0.30), gluehwuermchen (0.25) |
| kein sharpen | andere Reveal-Mechanik (Rubbeln) | loeschen |

## Warum ein echter Defekt
Reveal-Prinzip (Geil-Programm): Foto flutet als Höhepunkt AM win(), Gesicht vorher frei/verhüllt. Lineare Kurve + Sockel macht das Geburtstagskind schon während des Spiels erkennbar → Twist-Reveal ist vorweggenommen. regenbogen/sternbild wurden in ihren Einzel-Gates auf f² gezogen (regenbogen „U-1 sharpen f²-Kurve"), die anderen 8 nicht.

## Empfohlener Fix (set-weit, mechanisch, niedriges Risiko)
Alle 8 Linear-Kurven auf den f²-Veil harmonisieren: `opacity=(f<=0?0:(0.2+0.8*f*f))`. Blur ist bei den meisten schon `*(1-f*f)` (hinten gewichtet) — nur die Opacity-Zeile angleichen. **Wartet auf Bolle-Greenlight** (set-weite Code-Änderung).

## ZWEITE Methoden-Grenze: Fetch verschluckt EMOJIS -> False-Positive-„leer"-Funde
Der ‹-Fix rettet HTML-Tags, aber der Web-Extractor droppt manche EMOJIS (💎, 🛡️, 💥). Folge: ChatGPT sieht `it.c?'':it.e` statt `it.c?'💎':it.e` (tatort) und leere Signal-Pads (signal) → meldet MAJOR „Element leer / unsichtbar / unspielbar". **Alles Artefakte.** Diese Funde DEFLATIONIEREN zusätzlich den Score (tatort 58!). REGEL: jeden „leeres Element / unsichtbar"-Fund gegen den echten Code prüfen — Emojis sind fast immer da. (Optional-Fix: im Build Emojis durch ASCII-Token ersetzen wie `<`->‹.)

## Batch-Bilanz nach 5 Spielen (Stufe-3-verifiziert) — Muster stabil, Grind gestoppt
| Spiel | ChatGPT-Score | echte Funde (Stufe-3) |
|---|---|---|
| regenbogen | 84 | sauber (f²-Veil ok) |
| sternbild | 84 | MINOR Hinweis-Race; f²-Veil ok |
| rohre | 76 | **sharpen-linear (REAL)**; setPhoto (bekannt) |
| signal | 78 | pads-leer = FALSE-POS (emoji); Demo-Texte/Outro; sharpen-linear |
| tatort | 58 | jewels-leer = FALSE-POS (emoji, deflatiert Score); sharpen-linear |

**Fazit:** Genau EIN echter, neuer, systematischer Fund = der sharpen-Veil (8/10, via Grep über ALLE 10 belegt — ChatGPT-Reviews der restlichen 6 würden ihn nur bestätigen + weitere emoji-Artefakte liefern). Alles andere = bekannt (setPhoto) / Artefakt (emoji) / Einzel-MINOR. Chat-IDs: rohre 6a4bcfa0, signal 6a4bd00a, tatort 6a4bd076.

## KOMPLETTE 11er-Bilanz (alle Stufe-3-verifiziert, 06.07.)
| Spiel | claude.ai | ChatGPT | Verifizierter echter Befund |
|---|---|---|---|
| regenbogen | 84 | 84 | sauber (f²-Veil) |
| sternbild | 84 | 84 | Hinweis-Race MINOR; f²-Veil |
| rohre | 87 | 76 | **sharpen-linear** + setPhoto(bekannt) |
| signal | 88 | 78 | emoji-FP + Demo/Outro-MINOR + sharpen |
| tatort | 87 | 58 | emoji-FP (deflatiert Score) + sharpen |
| uvschrift | 87 | 82 | auto-no-fail(geparkt) + setPhoto |
| spuren | — | 91 | sauber |
| lianen | — | 78 | Attribution-Politur-MINOR |
| huerden | — | 84 | sauber (Symbol-MINOR) |
| gluehwuermchen | — | 73 | sharpen + setPhoto |
| loeschen | — | 72 | **kein tip()/No-Fail (NEU, verifiziert: 0 tip())** + Copy-MINOR |

## ZWEI echte, neue, verifizierte Fixes (Rest = bekannt/Artefakt/MINOR)
1. **Set-weiter sharpen-Veil** (8 Spiele linear → f²): rohre, signal, tatort, uvschrift, spuren, lianen, huerden, gluehwuermchen. sed-fertig.
2. **loeschen No-Fail**: kein `tip()` im Spiel → core.js injiziert keinen Tipp-Button → 4-6-Jährige können vor dem Reveal hängen. Fix: `tip()`-Funktion ergänzen (rubbelt automatisch Kreise frei) + optional Auto-Fallback-Timer.

## Empfehlung an Bolle
1. **Greenlight sharpen-Veil-Fix set-weit** (8 Spiele: opacity-Zeile → `0.2+0.8*f*f`). Niedriges Risiko, mechanisch.
2. Restliche 6 ChatGPT-Reviews: **überspringen** (sharpen schon via Grep belegt) ODER laufen lassen falls du Vollständigkeit willst.
3. setPhoto-Load-Check bleibt im Produktions-Pass (OFFENE-REVIEW-PUNKTE).
