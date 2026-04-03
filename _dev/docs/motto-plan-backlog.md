# Motto-Plan & Backlog

*Stand: 03.04.2026 — Bolle-Session*

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
- [ ] Landingpage `/schnitzeljagd/` erstellen (analog zu `/schatzsuche/`)
- [ ] SEO-Seiten: "Schnitzeljagd Kindergeburtstag", "Schnitzeljagd Ideen", "Schnitzeljagd draußen", "Schnitzeljagd drinnen"
- [ ] Meta/Title/H1 auf bestehenden Schatzsuche-Seiten um "Schnitzeljagd" ergänzen
- [ ] Interne Verlinkung zwischen Schatzsuche ↔ Schnitzeljagd Seiten

### Sprint-Prio 1b: Cross-Selling Schatzsuche → Einladung

**Problem:** Wer eine Schatzsuche/Schnitzeljagd erstellt, will höchstwahrscheinlich auch eine passende Einladung verschicken. Aktuell gibt es keinen Link/Button von der Schatzsuche zur Einladung (und umgekehrt). Die beiden Produkte leben komplett isoliert.

**Tasks:**
- [ ] CTA-Button auf jeder Schatzsuche-Ergebnis-Seite: "Passende Einladung erstellen →" (verlinkt auf `/einladung/erstellen/?motto=X`)
- [ ] CTA-Button auf Schatzsuche-Selector: Hinweis "Tipp: Erstelle auch gleich die passende Einladung!"
- [ ] CTA auf Einladungs-Endscreen (Won-Phase): "Schatzsuche zum Motto erstellen →" (verlinkt auf `/schatzsuche/X`)
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
