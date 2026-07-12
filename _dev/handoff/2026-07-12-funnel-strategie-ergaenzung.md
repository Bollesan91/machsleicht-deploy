# Funnel-Strategie — Ergänzung „der Rest" (88 → 95)

Ergänzt das Fable-5-Strategie-Dokument („Strategie: Alle Einladungsspiele in den Party-Funnel", geprüft gegen Commit 032d701) um das, was zur runden Umsetzbarkeit fehlte: **eine Default-Empfehlung je offener Entscheidung + ein verifizierter De-Risk-Schritt** für den 60-Skin-Pass. Stand 12.07.2026 (Haupt-Claude, gegen Code geprüft).

## Entscheidung 1 — Datei-Naming unter `/spiele/` → **1:1 Zero-Diff (nie normalisieren)**
Der `GAME_CATALOG` hält `path` als Source-of-Truth → der Dateiname auf Platte ist ein Implementierungs-Detail hinter der `gameId`. Normalisieren auf `<mottoId>-<spiel>.html` ist reine Kosmetik, kostet ~60 Edits **und** riskiert, ein relatives `core/`-Include zu brechen — für null funktionalen Gewinn. Also: Promotion bleibt echt zero-diff, Katalog abstrahiert den hässlichen Namen. Confidence hoch.

## Entscheidung 2 — RSVP-Button in der Core-Win-Karte (Embedded) → **postMessage-Scroll-Signal, embed-gated + origin-checked**
Die Win-Karte ist der emotionale Peak (Kind sieht den Reveal → will „bin dabei"). **Entfernen killt den Conversion-Moment.** Aber der Button darf im Spiel kein Fake-RSVP auslösen (das echte liegt auf der Elternseite). Lösung:
- Embedded erkennen (`window.parent !== window` **oder** `?embed=1` in der gameUrl).
- Button → `window.parent.postMessage({type:'ml-rsvp'}, 'https://party.machsleicht.de')`.
- Gästeseite lauscht mit **striktem Origin-Check** (nur `machsleicht.de`) → scrollt zu `#rsvpAnchor` (+ optional vorbefüllen).
- Standalone (nicht embedded): heutiges Verhalten unverändert.
Kleiner Zusatz-Kontrakt (1 Message-Typ + 1 Listener), aber es ist DER Übergabepunkt Spiel→Zusage. Lohnt sich.

## Entscheidung 3 — Die 5 Mottos ohne Chip (baustelle, dschungel, feen, pferde, ritter) → **Chips in P1 nachziehen, an Katalog-`status` gekoppelt**
~5 Zeilen in `createPage` (je ein `pickMotto(...)`-Button). **Nicht auf P3 schieben** (Fable-Vorschlag) — eine Galerie ausliefern, während 5 Mottos gar nicht wählbar sind, ist eine Lücke, die ein Elternteil sofort trifft. Regel: Chip nur zeigen, sobald das Motto ≥1 Spiel mit `status:"go"` im Katalog hat → keine leere/kaputte Galerie.

## De-Risk — der „60-Skin-Produktisierungs-Pass" (Fables Haupt-Unsicherheitstreiber) → **Engine/Template-Ebene, VERIFIZIERT**
Gegen den Code geprüft (Commit 032d701):
- `core.js` liest heute **kein** `?date/?time/?ort` → die vom Worker gebauten Params werden ignoriert, die Win-Karte zeigt hartkodiert „Samstag, 12. Juli / Bei uns".
- Das Demo-Datum steht in **allen 15 A&F-Skins identisch** = es kommt aus dem geteilten Template (`game-schatzjagd-piraten.html`), nicht je Datei.

**Daraus folgt:** Foto + Datum + Ort produktisieren für die A&F-Familie =
1. `core.js`: `?date/?time/?ort` lesen + in die Win-`<dl>` schreiben; `photoParam()` (https-Whitelist) für den Reveal — **eine Engine-Änderung**.
2. Template-Win-Karte: hartkodierte `<dd>`-Werte → Param-Werte — **ein Template-Edit** + `node _skin-gen.js`.
→ Die „15 A&F-Skins" kollabieren auf **~2 Edits + regenerieren**, nicht 15.

**Rest-Unsicherheit ehrlich:** die 45 Single-Prototypen sind eine eigene Familie (`game-<name>-<motto>.html`) — brauchen einen **einmaligen Struktur-Check** (teilen sie dieselbe Win-Karten-/Param-Mechanik?). Für die Funnel-MVP-Familie (A&F) ist die These bewiesen; für die 45 muss sie an 1 Beispiel bestätigt werden, bevor man sie generalisiert.

**Automatischer Abnahme-Check statt QA-pro-Skin:** ein Smoke-Skript lädt jeden Skin mit `?name=Test&date=2026-08-01&ort=Musterstr&foto=<demo>` und asserted, dass die Win-Karte den Param-Wert zeigt (nicht „Samstag, 12. Juli") + Foto/Avatar korrekt. So wird „hat die Produktisierung gegriffen?" über alle Skins maschinell geprüft (analog zu den dig-Log-Playtests), statt jeden manuell durchzuspielen.

## Netto
Damit hat jede offene Frage eine klare Default-Antwort, und der teuerste Posten der Roadmap (60-Skin-Pass) schrumpft von „60 × QA" auf „~3 Edits + 1 Smoke-Skript (A&F bewiesen, Single-Familie an 1 Beispiel zu bestätigen)". Das ist die fehlende Rundung von 88 auf ~95.
