# Stufe-2-Review der Einladungsspiele — 30.06.2026

**Reviewer:** frischer claude.ai-Tab via Chrome-MCP (Bolle-Device), **Opus 4.8 Hoch**, target-blind. Fable 5 war „Currently unavailable" → Opus = regelkonformer Fallback. (Bolle wollte „Max"; Aufwand-Toggle ließ sich per Automation nicht setzen — Radix-Submenu. Nicht gate-entscheidend.)
**Input:** Konzept + Safety-Flow + Mechanik-Inventar aller 14 Spiele + wörtliche Copy-Beispiele (Prosa, KEIN Code — wichtig für die False-Positive-Einordnung unten).
**Output:** „Gutachten: Digitale Einladungsspiele" (~18,5k Z.), 8 Winkel, MAJOR/MINOR/UNSICHER, 3 Top-MAJORs.

## Stufe-3-Verdikt je Finding (selbst gegen Code/Konzept verifiziert)

### ECHT + bereits gefixt (autonom, 30.06.)
- **Photosensitivität / `prefers-reduced-motion` (MAJOR, „muss über alle 14 greifen, nicht nur Konfetti").** → **GEFIXT** zentral in `core/core.css`: `@media (prefers-reduced-motion: reduce)` stoppt alle Dauer-Animationen, macht Transitions/Blitze quasi-instant, blendet Vollbild-Konfetti aus. Greift über den Core für alle 14. Verifiziert: Skelett parst weiter, Rule im CSSOM, per Default inert. Flash-Raten sind ohnehin <3 Hz (Simon-Pad ~286 ms an, Kanonen-Blitz one-shot).

### ECHT, aber Produkt-/Integrations-Ebene (Bolle-Entscheidung — gehört in den Integrations-Strang, NICHT in die Prototypen)
- **#1 DATENSCHUTZ-ZUSAGE-GATE (MAJOR, „ohne dieses Gate nicht ausliefern").** Foto + genaue Adresse + Termin stecken ungegated am Ende eines frei weiterleitbaren Links. Fix laut Reviewer: teilbarer Link enthält nur Motto + Anlass + „Wer bist du?"; **Adresse + Foto erst nach namentlicher Identifikation**; kryptografisches Token (≥128 bit, nicht durchzählbar, noindex, kein Referer-Leak); **Ablaufdatum** (Link verfällt nach Party); **Foto Default AUS** (Fallback existiert ja); **Eltern-Pflicht-Aufklärungsscreen** (nicht im Kleingedruckten). Auch der größte Conversion-Bremsklotz (Winkel 7: „du verlierst das informierte Drittel sofort"). → **Das ist die #1-Voraussetzung bevor irgendein Spiel live geht.** Betrifft Worker `serve-invite` + Creator-Flow, nicht die Prototyp-HTMLs.
- **Alters-Schalter:** Bedrohungs-Mechanik unter 6 J. komplett abschalten (beim Anlegen).
- **„GESUCHT"-Steckbrief mit echtem Foto (Detektiv/Wimmel):** Reviewer: „macht das Kind buchstäblich zum Fahndungsobjekt", Risiko = Vorlage für Hänseleien im Klassenchat. → Copy/Design-Call (z. B. weniger fahndungs-lastig framen). Betrifft `game-wimmel-detektiv.html` Reveal-Karte.

### ECHT, MINOR (optional, niedriges Risiko — noch offen)
- Bedrohungs-Leiste **Copy** entschärfen („bevor der Schatzräuber dich einholt"). **Stufe-3:** mechanisch ist es schon KEIN Fail-State (`robberStrike()` resettet nur die offene Einzelkarte + Botschaft, Spiel läuft bis Sieg) — der Reviewer schloss den Fail-State aus meiner Prosa, real existiert er nicht. Nur die Formulierung suggeriert Bedrohung.
- Intro-Texte für Erstleser zu lang → kürzen oder Vorlese-Audio-Button (MINOR, betrifft alle).
- Dino-Ei reines Tippen wird nach ~10 s zäh → Mikro-Entscheidung ergänzen. Fossil = Reveal-Effekt, kein vollwertiges Spiel (kurzer Auftakt, ok).
- OHNE-Foto bricht „verdientes Artefakt" genau bei foto-zentrierten Spielen (Puzzle/Memory/Fossil). Guter Reviewer-Vorschlag: dort über den **Namen** personalisieren (Sternbild bildet Anfangsbuchstaben, Puzzle ergibt Namens-Monogramm).

### FALSE-POSITIVES (Reviewer sah nur Prosa, nicht den Code — Code hat die Cues schon)
- **Sternbild „kein next-Hinweis" (als MAJOR gelistet):** Code hat **nummerierte Sterne (1–7) + pulsierenden weißen `.next`-Stern**. Bereits gelöst.
- **Simon „reine Farb-Codierung" (Teil des Barriere-MAJOR):** Pads haben **Emoji-Symbole (⚡🛡️⭐💥) + eigene Töne** je Pad, nicht nur Farbe. Bereits zweit-codiert.
- **Tresor „heiß/kalt unklar" (MAJOR):** zeigt **„X von 3 Stellen stimmen"** (expliziter Zähler), nicht nur Farbe.
- **Threat-Leiste „Fail-State" (MAJOR):** mechanisch nicht verlierbar (s. o.).
- Katapult/Hürden Onboarding: helle Ziel-Zone + Instruktions-Text + Button vorhanden; Timing-Bar-Schwierigkeit <7 J. bleibt ein valider *Design*-Hinweis, aber kein fehlender Cue.

### UNSICHER
- WhatsApp-Zusage-Mechanik (Datenfluss zur Eltern-Nummer) — nicht genug Info im Input.
- Kanone: Spieldauer hängt an Brett-Zahl (real 16 → trägt).

### DIFFERENZIERUNG (Winkel 8)
- Reviewer wittert Reskin-Paare (Geschicklichkeits-/Timing-Spiele). **Stufe-3:** Engines sind mechanisch eigenständig (Anti-Reskin-Ledger), aber die ehrliche Kommunikation, die er fordert („14 Spiele über X Mechanik-Familien" statt „14 Engines"), ist in MD §11 ohnehin schon so (11 Engines E1–E11 / 14 Spiele). Reveal ist „verdient" bei Memory/Fossil/Puzzle (Foto = Mechanik), „drangeklebt" bei Katapult/Hürden/Bagger — valider Hinweis.

### LOB (wörtlich)
- „Reveal als Mechanik" bei Memory/Fossil/Schiebepuzzle = konzeptionell stark, Foto ist das Spiel, nicht angeklebt.
- „der Schatz bist DU" = warmer Twist, echter emotionaler, teilbarer Kern.

## Offen für Bolle (Prioritäten)
1. **Datenschutz-Zusage-Gate bauen** (Worker/Creator) — Pflicht vor Live. Größter Hebel (Sicherheit UND Conversion).
2. GESUCHT-Steckbrief entschärfen + Threat-Copy + Alters-Schalter.
3. MINOR-Politur (Intro-Länge/Vorlese-Audio, Dino-Ei-Tiefe, OHNE-Foto-Namens-Personalisierung).

Voller Review-Text: claude.ai-Chat „Datenschutz- und Kindeswohl-Audit für digitale Geburtstagseinladungsspiele" (Bolle-Device).
