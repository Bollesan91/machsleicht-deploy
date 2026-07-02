# Deploybar-Programm: alle 45 Einladungs-Spiele „funktion, viral, geil" — 2026-07-02

**Mandat (Bolle):** „Mach alle Spiele deploybar, Funktion, viral und geil" + „zieh durch im Loop".
**Mess-Methodik:** Playtest am laufenden Spiel (Bolle-Umstellung 02.07.); Score-Reviews für Spiele abgeschafft.

## Spur 1 — FUNKTION ✅
- 45er-Smoke-Sweep (iframe-Harness, k/g/age): Start → Spiel → Reveal → Copy „Mats, … Lena", 0 JS-Fehler.
- **Echter Bugfix notruf-feuerwehr:** `const dial=$('#dial')` in buildDial shadowte die Funktion `dial(n)` → jeder
  Loch-Klick warf TypeError, Spiel war unspielbar. Fix: lokale Var → `dialEl`. Per Playtest verifiziert (5 Tipps → Reveal).
- 28 statische DU/DIR/DICH-Platzhalter neutralisiert (assert-first-Skript + 3 manuelle Nachzügler „wartest DU"/„Du bist der Captain"/„du bist der Bauleiter"). Rest-Grep: nur DEMO-Files (bleiben lokal).

## Spur 2 — GEIL ✅ (Reveal = verdientes Crescendo)
Mechanik-Kopplung (Foto baut sich mit dem Spielfortschritt auf, back-weighted 1−f²: Silhouette früh, Erkennbarkeit erst am Schluss):
- **Elite 5:** ei (Deckel-Peek + Schlüpf-Burst, „Schlüpf-Tag"), fossil (Erwecken-Beat + Face-Guard), löschen (Qualm-lichtet-sich + Face-Guard + Held-Framing statt Opfer), striegeln (Fell-glänzt + Face-Guard), uvschrift (Geheimschrift IST ein Porträt).
- **Simon 3:** funk (Funkmonitor klärt sich), signal (Identität tritt hervor), glühwürmchen (Bild aus Licht).
- **Connect 4:** regenbogen, sternbild, rohre, taunetz (.cphoto-Layer, schärft je Knoten).
- **Wimmelbild 3:** tatort, wildnis, wimmel (**Beweisfoto entwickelt sich** — .fieldphoto je Fund).
= **15 Spiele gekoppelt**, alle im iframe-Playtest verifiziert (op 0 → mid ~0,5/blur ~14 → final blur 0/op 1 → Reveal).
- **Tipp-Vollausbau:** +9 stall-anfällige (memory Paar-Aufdecken, kanone Planke, tresor Rädchen, notruf Ziffer, perlen Sortieren, fotosafari Knipsen, drehleiter Ausrichten, hochhaus/turm Perfekt-Drop) → **jedes Skill-Spiel garantiert abschließbar**; 30 Spiele mit tip(), Rest = No-Stall-Mechaniken.
- Alters-Varianten: Simon 3/4/5, Puzzle 2×2/3×3, Wisch-Schwelle 55/68/80 %, ei-Taps 13/9/7, uv-Runen 3/4/5.

## Spur 3 — VIRAL ✅ (bewusst Framing-Schicht)
Tellbarer Twist je Spiel über Kopplung + eigene Story/Reveal/CTA („ich hab meinen Freund geschlüpft/erweckt/entschlüsselt/aus dem Qualm geholt"). Twins (jeep≈bagger, huerden≈lianen, hochhaus≈turm, katapult≈hufeisen≈strahl) bleiben mechanische Varianten mit getrennten Stories — Mechanik-Neubau bewusst nicht (Reviewer-Erkenntnis: Originalitäts-Decke sitzt in der Gattung; unreviewtes Redesign im Loop = Risiko).

## Spur 4 — DEPLOY
- **core.js/core.css → `?v=20260702`** in allen 45 (Cache-Bust; Fund: Browser hielt stale core.js — Live hätten Rückkehrer alte Version gesehen). Bei jedem Core-Update Version hochziehen!
- Final-45-Sweep als Deploy-Gate (Ergebnis s. SESSION-NOTES).
- Commit auf **draft** (birthday-photo.jpg + *-DEMO.html bleiben lokal/untracked). **Kein Produktions-Deploy** — nur auf „Ende deploy".

## Helfer-V4.1-Stufe-2-Welle über das ganze Paket (02.07., „Alles mit Helfer")
**Reviewer: 3 frische claude.ai-Tabs, Fable 5 · Max** (wieder verfügbar → neue Standing-Regel; Fallback Opus 4.8 Max), target-blind, lasen die ECHTEN Commit-Dateien via raw-SHA-URLs (Branch-Trick; löst L7/L9 „Reviewer braucht Volltext"). A=Core+10 Klassen-Vertreter Code-tief · B=16 Geschwister · C=Copy-Pass alle 45. **Ausbeute außergewöhnlich gut — alle Kern-MAJORs Stufe-3-bestätigt und gefixt:**
- **memory:** Restart resettete found/combo/first/lock nicht (2. Durchlauf unspielbar) ✔ gefixt; hartkodierter „Käpt'n Mats" im H1 ✔; „Reingelegt!"-Titel über dem Kinderfoto ✔ („Schatz gefunden!"); Räuber „holt dich ein"→„findet die Truhe"; Overlay-Race; Alters-Threat-Tempo 0.7/1.05/1.4.
- **tresor:** kein done-Guard → Doppel-Win + doppelter „Lena, lena,…"-Prefix ✔ cracked-Flag; Party-Name vereinheitlicht (Mystery→Prinzessinnen-Party); grünes Stellen-Feedback (Rätsel für 4-6 lösbar); Buttons 40px.
- **kanone:** Intro „versteckt sich jemand … schieß sie frei" (Kanone auf Person!) → Bretter/Schatzkarte-Framing ✔; „Reingelegt!" ✔.
- **fotosafari:** „seltenstes Tier = Kind" (Hänsel-Screenshot-Risiko) → „seltenste Entdeckung" inkl. Polaroid-Caption ✔; Restart-Reste; tip() ruft bei Lücke sofort Tier; Alters-Reaktionsfenster 1500/1100/900.
- **spuren/faehrte:** „Fährte gefolgt/gelöst!" (ungrammatisch/schief) → „Spur verfolgt/entschlüsselt!"; spuren-Ort war „Garten-Dschungel" (Zwillings-Copy-Paste) → „Garten-Savanne".
- **perlen:** Flug-Animation war von pbob-Keyframes maskiert (CSS-Animation schlägt Inline-Transform) → animation:none auf .fly + transform-Reset.
- **8 weitere statische DU-Reste** (wartest/stehst/sitzt/erscheinst DU + jeep-Kongruenzbruch „wartet schon DU") ✔; OHNE-Zweig-Attribution (Gast-Leistung ans Kind) in 5 Zeilen entdreht; Diverses (Baken→Schilder, Büsche→Kakteen, hinleuchtest, Danebentippen, Wunsch-Versprechen entschärft, „kämpft"→mild, Chef-Entdecker→Entdeckung, Zauberperlen vereinheitlicht).
- **Systemisch:** core.css touch-action:manipulation auf alle Tap-Ziele (iOS-Double-Tap-Zoom) → **Version ?v=20260702b**; Connect-tip()-Null-Guards; Touch-Radien sternbild/taunetz 9→12; Wimmelbild-Deko-Mindestabstand (verdeckte kein Ziel mehr); SHUF 40→24 (A*-Tipp Low-End).
- **Re-Check nach Fixes: 44/45 automatisiert grün + memory/tresor-REPLAY-Test grün, 0 JS-Fehler.** (1 = Harness-Limit schatz, Code-verifiziert.)
- **Bewusst NICHT umgesetzt (Ermessen, dokumentiert):** fossil „versteinertes Wesen" bleibt (Erwecken = Wow-Kern); user-scalable=no bleibt (touch-action deckt Double-Tap); Vertrag präzisiert: Nominativ ODER formgleicher Neutrum-Akkusativ ok; „kein UI-Rückweg von s-win" = bekanntes Design (Restart-Fixes trotzdem drin für künftigen Nochmal-Button); Intro-Sprache 4-J. braucht Vorlesehilfe (konzeptbedingt).

## Offene Produktions-Verdrahtung (nächste Session, braucht Bolle-Struktur-Entscheid)
1. **Wohin live?** Prototypen liegen in `_dev/prototypes/` — Ziel vermutlich `einladung/<motto>/spiel/<slug>/` oder Integration in die whatsapp-Gast-Apps; Worker-`gameUrl` entsprechend.
2. **Foto-Kontrakt:** `THEME.photo='/birthday-photo.jpg'` (lokaler Platzhalter) → photoRound-URL aus Party-Daten (Worker), setPhoto() ist bereit.
3. **?k=/?age=** aus Party-Daten in die Spiel-URL (kid()/ageNum() lesen sie schon).
4. **Privacy (mehrfach geflaggt):** Foto+Name+Adresse in forwardbarem Link → Ablauf-Link + Adresse erst nach Zusage.
5. RSVP-Button → echter WhatsApp-Deeplink (heute Demo-Stub).
