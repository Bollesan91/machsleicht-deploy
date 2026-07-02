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

## Offene Produktions-Verdrahtung (nächste Session, braucht Bolle-Struktur-Entscheid)
1. **Wohin live?** Prototypen liegen in `_dev/prototypes/` — Ziel vermutlich `einladung/<motto>/spiel/<slug>/` oder Integration in die whatsapp-Gast-Apps; Worker-`gameUrl` entsprechend.
2. **Foto-Kontrakt:** `THEME.photo='/birthday-photo.jpg'` (lokaler Platzhalter) → photoRound-URL aus Party-Daten (Worker), setPhoto() ist bereit.
3. **?k=/?age=** aus Party-Daten in die Spiel-URL (kid()/ageNum() lesen sie schon).
4. **Privacy (mehrfach geflaggt):** Foto+Name+Adresse in forwardbarem Link → Ablauf-Link + Adresse erst nach Zusage.
5. RSVP-Button → echter WhatsApp-Deeplink (heute Demo-Stub).
