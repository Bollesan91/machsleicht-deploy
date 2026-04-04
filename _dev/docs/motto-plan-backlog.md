# Motto-Plan & Backlog

*Stand: 04.04.2026 — Bolle-Session*

---

## Einheitliche Motto-Liste (10 eigene IPs)

| # | Motto | Emoji | Schatzsuche/Schnitzeljagd | Einladungs-Game | Kindergeburtstag-SEO |
|---|-------|-------|---------------------------|-----------------|----------------------|
| 1 | Piraten | 🏴‍☠️ | ✅ vorhanden | ✅ Erstellen-Tool | ✅ vorhanden |
| 2 | Dino | 🦕 | ✅ vorhanden | ✅ fertig | ✅ vorhanden |
| 3 | Weltraum | 🚀 | ✅ vorhanden | ✅ fertig | ✅ vorhanden |
| 4 | Safari | 🦁 | ❌ fehlt (Dschungel ersetzen) | ✅ fertig | ✅ vorhanden |
| 5 | Superheld | 🦸 | ❌ fehlt | ✅ fertig | ❌ fehlt |
| 6 | Detektiv | 🔍 | ✅ vorhanden | ❌ fehlt | ✅ vorhanden |
| 7 | Prinzessin/Schloss | 👑 | ❌ fehlt | ❌ fehlt | ❌ fehlt komplett |
| 8 | Einhorn/Regenbogen | 🦄 | ❌ fehlt | ❌ fehlt | ✅ vorhanden |
| 9 | Meerjungfrau | 🧜‍♀️ | ❌ fehlt | ❌ fehlt | ✅ (nur SEO) |
| 10 | Feuerwehr | 🚒 | ❌ fehlt | ❌ fehlt | ✅ vorhanden |

### Raus/zusammengelegt:
- **Dschungel** → wird durch Safari ersetzt (konkreter, bessere Mechanik)
- **Feen/Feenzauber** → geht in Einhorn/Regenbogen auf (zu ähnlich)

### Lizenz-Mottos (nur SEO, keine eigenen Tools):
Paw Patrol, Pokemon, Minecraft, Frozen, Super Mario, Spider-Man, Harry Potter, Ninjago — bleiben als SEO-Seiten, bekommen aber KEINE Schatzsuchen/Einladungs-Games (Lizenzrisiko).

---

## Backlog

### Sprint-Prio 1: Naming & SEO-Lücke Schnitzeljagd

**Problem:** "Schatzsuche" passt nur für Piraten. Bei Detektiv, Weltraum etc. ist "Schnitzeljagd" oder "Mission" treffender. Außerdem ranken wir für "Schnitzeljagd Kindergeburtstag" aktuell NULL — kein einziger eigener Content dafür.

**Tasks:**
- [ ] Naming überarbeiten: Oberbegriff "Schatzsuche & Schnitzeljagd" oder mottoabhängig (Piraten = "Schatzsuche", Detektiv = "Schnitzeljagd", Weltraum = "Mission" etc.)
- [x] Landingpage `/schnitzeljagd/` erstellen (04.04.2026 — 403 Zeilen, FAQ-Schema, 6 Themen, vs-Box)
- [ ] SEO-Seiten: "Schnitzeljagd Kindergeburtstag", "Schnitzeljagd Ideen", "Schnitzeljagd draußen", "Schnitzeljagd drinnen"
- [ ] Meta/Title/H1 auf bestehenden Schatzsuche-Seiten um "Schnitzeljagd" ergänzen
- [x] Interne Verlinkung zwischen Schatzsuche ↔ Schnitzeljagd Seiten (04.04.2026 — schatzsuche-kindergeburtstag + schatzsuche-drinnen + sitemap)

### Sprint-Prio 1b: Cross-Selling Schatzsuche → Einladung

**Problem:** Wer eine Schatzsuche/Schnitzeljagd erstellt, will höchstwahrscheinlich auch eine passende Einladung verschicken. Aktuell gibt es keinen Link/Button von der Schatzsuche zur Einladung (und umgekehrt). Die beiden Produkte leben komplett isoliert.

**Tasks:**
- [x] CTA-Button auf jeder Schatzsuche-Ergebnis-Seite: "Passende Einladung erstellen →" (verlinkt auf `/einladung/erstellen/?motto=X`) — Won-Screen gebaut 04.04.2026
- [x] CTA-Button auf Schatzsuche-Selector: Hinweis "Tipp: Erstelle auch gleich die passende Einladung!" — im Won-Screen integriert
- [x] CTA auf Einladungs-Endscreen (Won-Phase): "Schatzsuche zum Motto erstellen →" (verlinkt auf `/schatzsuche/X`) — alle 10 Mottos, Plausible-Event
- [ ] Einladungs-Erstellen-Tool um Motto-Auswahl erweitern (aktuell nur Piraten-Default)
- [ ] Gemeinsame Übersichtsseite "Alles für deinen Kindergeburtstag" mit beiden Produkten pro Motto

### Sprint-Prio 2: Motto-Konsistenz herstellen

**Problem:** Jeder Bereich (Schatzsuche, Einladung, Kindergeburtstag) hat eine andere Motto-Auswahl. Nutzer, die z.B. eine Superheld-Schatzsuche suchen, finden nichts.

**Tasks:**
- [ ] Schatzsuche-Selector (schatzsuche.html) auf alle 10 Mottos erweitern
- [ ] Fehlende Schatzsuchen erstellen: Safari, Superheld, Prinzessin, Einhorn, Meerjungfrau, Feuerwehr
- [ ] Dschungel-Schatzsuche → Safari umbenennen/migrieren (Redirect setzen)
- [ ] Feen-Schatzsuche → Einhorn/Regenbogen umbenennen/migrieren
- [ ] Fehlende Einladungs-Games erstellen: Detektiv, Prinzessin, Einhorn, Meerjungfrau, Feuerwehr, Piraten (richtiges Game statt nur Erstellen-Tool)
- [ ] Einladungs-Erstellen-Tool (`/einladung/erstellen/`) um alle 10 Mottos erweitern
- [ ] Fehlende Kindergeburtstag-SEO: Superheld, Prinzessin ergänzen

### Sprint-Prio 3: Prinzessin-Motto aufbauen

**Problem:** Prinzessin ist eins der Top-3 beliebtesten Kindergeburtstag-Mottos und fehlt komplett auf machsleicht.de.

**Tasks:**
- [ ] Kindergeburtstag-SEO-Seite "Prinzessin" erstellen
- [ ] Schatzsuche "Prinzessin/Schloss" erstellen
- [ ] Einladungs-Game "Prinzessin" erstellen
- [ ] In alle Selektoren/Übersichten aufnehmen

---

## Status Einladungs-Games (gebaut in dieser Session)

| Game | Status | Datei |
|------|--------|-------|
| Dino | ✅ live-ready | `/einladung/dino/index.html` |
| Safari | ✅ live-ready | `/einladung/safari/index.html` |
| Weltraum | ✅ live-ready | `/einladung/weltraum/index.html` |
| Superheld | ✅ live-ready | `/einladung/superheld/index.html` |

Alle nutzen URL-Parameter: `?name=&date=&time=&ort=&tel=`

---

## Sprint-Prio 4: Universelles Fangspiel-Einladungs-Template

**Idee:** Das Matti-Fangspiel funktioniert standalone als Einladung — ohne Motto. Kind rennt über den Bildschirm, versteckt sich hinter Hindernissen, 3x fangen → "Du bist eingeladen!" Passt für JEDEN Geburtstag.

**Prototyp:** `_dev/prototypen/fangspiel-matti-original.html` (funktionsfähig, aber hardcoded für Matti)

**Was gebaut werden muss:**

1. **Erstellen-Formular** auf `/einladung/fangen/erstellen/`:
   - Name des Kindes
   - Alter (wird als Ballon-Zahl angezeigt)
   - Datum, Uhrzeit, Ort
   - WhatsApp-Nummer
   - **Foto-Upload** (wird als Gesicht im Fang-Kreis verwendet)
   - Foto → Base64 → in URL kodiert (oder localStorage als Fallback)

2. **Mobile-Optimierung** (Hauptproblem):
   - 7 SVG-Hindernisse (Baum, Haus, Busch, Felsen, Auto, Zaun, Lok) überlappen auf kleinen Screens
   - Fix: Responsive Obstacle-Platzierung (%-basiert statt px)
   - Auf Screens <400px: nur 5 Hindernisse statt 7
   - SVG-Größen relativ zum Viewport skalieren

3. **Platzhalter-System** (aktuell alles hardcoded):
   - `FACE_SRC` → aus URL-Parameter oder Upload
   - Name "Matti" → `{childName}`
   - Alter "3" → `{childAge}`
   - Datum/Uhrzeit/Ort → URL-Parameter wie bei Motto-Games
   - WhatsApp-Nr/Text → dynamisch
   - Google Maps Link → dynamisch aus Ort

4. **Template-Bibliothek** auf `/einladung/`:
   - Übersichtsseite mit zwei Kategorien:
     - **Motto-Einladungen:** Dino, Safari, Weltraum, Piraten (+ weitere)
     - **Universelle Einladungen:** Fangspiel (mottolos, Foto-basiert)
   - Später erweiterbar: Konfetti-Tap, Scratch-Card, Ballon-Pop etc.

**Technische Notizen zum Original-Code:**
- 462 Zeilen, single-file HTML
- SVG-Hindernisse inline generiert (svgTree, svgHouse, svgBush, svgRock, svgCar, svgFence, svgLoco)
- Obstacle-Platzierung: 3 Reihen x 2-3 Spalten, Pixel-basiert mit Collision-Nudge
- Chase-Mechanik: State-Machine (running → hiding → peeking → provoking → running)
- Audio: Web Audio API procedural (Triangle-Wave Melodie)
- Invite-Screen: Konfetti-Canvas, Girlande, Ballons, Rainbow-Stripe
