# J4-Briefing „Einladungs-Autopilot" — Deine Einladung ist fertig 🎉

**Erstellt:** 16.07.2026 abends · **Für:** eigene Claude-Session · **Priorität:** NÄCHSTE Bau-Session (Bolle 16.07.: M1/Dino geparkt, Autopilot zieht vor). Größter Conversion-Hebel im Backlog (J4/P8-1).

---

## 1. Ziel & Kernbefund

Umkehr von „hier ist ein Editor" zu „fertig — magst du's anders?": Nach dem Planer sieht die Familie sofort **3 fertige, kuratierte Einladungs-Varianten** aus ihren eigenen Daten, wischt/wechselt, teilt — und öffnet nur bei Bedarf „Fein anpassen" (= Studio).

**Kernbefund (verifiziert 16.07., macht J4 dringlicher als gedacht):** `kindergeburtstag.html` referenziert das Studio mit **keinem einzigen Wort** — der Funnel hat heute KEINEN Weg zur Bild-Einladung. Das Studio (Soft Launch, noindex) ist nur per Direkt-URL erreichbar. Der Autopilot ist also nicht Politur, sondern die fehlende Brücke Funnel → Einladung.

## 2. Technischer Unterbau (verifizierte Fakten)

- **Planer-State:** localStorage `mlplan_v4_state` (Studio-seitig als `PLANNER_KEY` gelesen). Studio hat bereits: `readPlannerState()`, `plannerStateReady(state)` (verlangt name + motto.id), `resolvePlannerAge()` (Guards gegen „WIRD 0!"), `plannerFingerprint()` (Invalidierung bei Planer-Änderung).
- **Wizard:** Scroll-Funnel in `kindergeburtstag.html` (stages 1/2/4/3/5), Partyseiten-Aktivierung via `activatePartyseite` → POST `/api/create` (E-Mail-Pflicht `psEmailInput`; Payload Z. ~2590 inkl. gameId, photoRound aus `state.invite.photo`).
- **Studio-Engine:** `einladung/studio/index.html` — `paintCard(ctx, scale)` (420×746 @3× Export), 3 Layouts über `applyLayout('classic'|'photo'|'clean')` (Buttons mit `data-layout`), Themes-Map (c1/c2/c3 + Pattern), Save-Kontrakt `STUDIO_KEY` („machsleicht-studio-v1", v2-Format: design/theme/layout/photoMode/photo/panelMode/form).
- **Foto:** `state.invite.photo` (gecroppt, dataURL) existiert im Planer-State, wenn die Familie eins hochgeladen hat.

## 3. Produkt-Konzept (3 kuratierte Varianten)

| Variante | Layout | Charakter | Bedingung |
|---|---|---|---|
| A „Klassisch" | classic | Theme-Gradient + Pattern, verspielt | immer |
| B „Mit Foto" | photo | Kinderfoto als Held, emotional | nur wenn `state.invite.photo` existiert; sonst Ersatz: classic mit alternativem Theme-Akzent |
| C „Clean" | clean | ruhig, modern, linksbündig | immer |

Kuration = **Preset-Matrix pro Motto** (Layout + Copy-Ton + ggf. Akzent-Abweichung), KEINE Zufälle, KEINE freie KI (Strategie-Prinzip „automatisch fertig, optional anpassbar"). Texte aus Planer-Daten: Headline (poss(childName) + Motto-Party), Datum/Zeit/Countdown, QR/Link zur Partyseite wenn aktiviert.

## 4. Architektur-Empfehlung: KEIN Engine-Fork

Der Autopilot rendert die Previews mit der **echten Studio-Engine**, nicht mit einer Kopie:

- **Variante A (empfohlen):** Studio bekommt einen **Autopilot-Modus** (`/einladung/studio/?autopilot=1`): statt Editor-UI ein Vollbild-Carousel der 3 Varianten (paintCard rendert je Preset), CTAs „📲 Teilen/Export" und „🎨 Fein anpassen" (setzt gewählte Variante als `STUDIO_KEY`-Startzustand und blendet den normalen Editor ein). Der Funnel verlinkt nach Abschluss der Einladungs-Stage prominent dorthin. Vorteil: 1 Engine, 1 Export-Pfad, Prefill/Fingerprint existieren schon.
- Variante B (nur falls A am Layout scheitert): eigener Screen im Funnel mit iframe-Previews — mehr Moving Parts, gleiche Engine.
- Explizit NICHT: Preview-Engine nachbauen (Doppelpflege, Drift — dieselbe Klasse Fehler wie die 45 Spiele-Shells ohne wDate-Ids).

## 5. Umsetzungsschritte

1. Preset-Matrix definieren (3 Presets × 15 Mottos als Daten, nicht Code; Copy-Töne je Motto aus bestehenden Templates ziehen).
2. `?autopilot=1`-Modus im Studio: Carousel (Swipe + Dots, mobile-first), Variante rendern = applyLayout + Theme + Preset-Copy → paintCard-Preview.
3. „Fein anpassen"-Übergabe: gewähltes Preset als STUDIO_KEY-Save schreiben, Editor-UI einblenden (kein Reload nötig).
4. Funnel-Brücke: In der Einladungs-Stage von `kindergeburtstag.html` nach Partyseiten-Aktivierung (bzw. auch ohne) der primäre CTA „🎉 Einladung ansehen" → Studio-Autopilot. Der bisherige Studio-Soft-Launch-Zustand (nur Direkt-URL) endet damit.
5. Tracking (J7-Anschluss): `autopilot_shown`, `autopilot_variant` (props: variant), `autopilot_share`, `autopilot_edit` — über den plausible()-Shim (NICHT umami.track direkt).

## 6. Gate & Abnahme

- Visueller Playtest mobil (375×812) + Desktop: alle 3 Varianten × mind. 3 Mottos (dino, prinzessin, custom-Freitext!), mit und ohne Foto, mit und ohne Party-URL.
- Grenzfälle: langer Name („Maximilian-Alexander"), kein Datum, Planer-State fehlt komplett (→ Autopilot muss sauber auf den normalen Studio-Start fallen).
- Frischer target-blinder Fable-Tab-Review (Regel: nie im selben Chat) + Playtest-Belege.
- Umami-Events im Dashboard sichtbar (J7 mind. für diese Events konfiguriert).
- 0 offene MAJORs vor Merge; Deploy nur via „Ende deploy".

## 7. Nicht-Ziele

Kein neuer Editor, keine neuen Layout-Typen, kein Payment, keine KI-Textgenerierung, kein Autopilot für die Partyseite (nur Einladung). Share-Paket-Texte (J5) sind eine eigene Session — aber der Autopilot-Share-CTA soll so gebaut sein, dass J5 dort nur noch Texte einhängt.

## 8. Aufwand

~1 Session Kern (Presets + Autopilot-Modus + Funnel-CTA) + Gate. Lebensdauer: Handoff löschen, sobald in SESSION-NOTES/BACKLOG kondensiert.
