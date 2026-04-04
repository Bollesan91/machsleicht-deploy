# Umsetzungsplan: Copy-Upgrade Homepage, /kindergeburtstag, /schatzsuche

**Datum:** 04.04.2026
**Regel:** SEO-Fallback-Content upgraden. React-Tools NICHT anfassen. Keine Strukturänderung, nur Copy-Verbesserung.

---

## Prinzip

Die 3 Seiten haben jeweils einen SEO-Fallback-Block (statisches HTML), der:
- Von Google indexiert wird
- Nutzern angezeigt wird bis React lädt
- Bei JS-Aus die einzige sichtbare Seite ist

**Was wir tun:** Den SEO-Fallback-Content mit den besten Elementen aus dem Wireframe upgraden.
**Was wir NICHT tun:** H1-Keywords ändern, React-Code anfassen, Seitenarchitektur umbauen.

---

## 1. Homepage (index.html)

### Ist-Zustand
- H1: "Kindergeburtstag und Familienfeste planen — kostenlos in 10 Minuten"
- Danach: Textblöcke mit Links zu allen Produkten (Kindergeburtstag, Schatzsuche, Einladung, weitere Planer, Ratgeber, Alter)
- Kein Trust-Element, kein "So funktioniert's"
- Viel Link-Katalog, wenig Führung

### Änderungen

**A) H1 upgraden (SEO behalten, Copy schärfen)**
- ALT: "Kindergeburtstag und Familienfeste planen — kostenlos in 10 Minuten"
- NEU: "Kindergeburtstag planen — kostenlos in 10 Minuten"
- Grund: "Familienfeste" overpromised. Die Site IST Kindergeburtstag.

**B) Subline upgraden**
- ALT: "mach'sleicht ist der kostenlose Online-Planer fuer Eltern..."
- NEU: "Motto wählen, Alter eingeben, fertigen Plan bekommen. Mit Zeitablauf, Spielen, Einkaufsliste und Schatzsuche. Ohne Anmeldung."
- Grund: Sofort klar was passiert, statt abstrakte Beschreibung.

**C) Trust-Zeile einfügen (nach Subline, vor den Produkt-Blöcken)**
NEU einfügen:
```
Nicht mehr Input. Mehr Klarheit. · In Minuten startklar · Ohne Anmeldung
```
Als einzeilige Microproof-Zeile. Kein eigener Block.

**D) Hauptentscheidung schärfen**
Die H2s "Kindergeburtstag planen" und "Schatzsuche und Schnitzeljagd" bleiben.
Aber der Text darunter wird ersetzt:
- Kindergeburtstag: "Motto, Zeitplan, Spiele, Einkaufsliste und Budget — passend zu Alter und Gästezahl. In 10 Minuten steht der Plan."
- Schatzsuche: "Thema wählen, Alter einstellen, Schatzkarte und Stationen drucken. In 5 Minuten startklar."

**E) "Warum machsleicht?" schärfen**
- ALT: "Andere Seiten geben dir Tipps — wir geben dir einen fertigen Plan..."
- NEU: "Wir zeigen dir nicht 100 Ideen. Wir führen dich zu einer Lösung, die wirklich umsetzbar ist. Statt 20 Tabs beantwortest du ein paar Fragen und bekommst alles auf einen Blick."
- Ergänzen: "Kein unnötiges Basteltheater. Keine überladene Pinterest-Perfektion. Keine 80 Optionen, die dich am Ende blockieren."

**F) NICHT ändern:**
- Link-Katalog (Ratgeber, Checklisten, Alter) — das ist SEO-Gold
- Die gesamte Linkstruktur
- Die React-App

---

## 2. /kindergeburtstag (kindergeburtstag.html)

### Ist-Zustand
- H1: "Kindergeburtstag planen in 10 Minuten — mit Zeitplan, Spielen und Einkaufsliste"
- Snippet-Box mit Feature-Liste
- Motto-Grid (14 Mottos)
- Motto-Teaser-Cards mit Beschreibungen
- Altersgruppen-Links
- Schatzsuche-Cross-Sell
- FAQ (7 Fragen)
- CTA "Das reicht. Wirklich."
- React-App darunter bei #planer

### Änderungen

**A) Snippet-Box upgraden**
- ALT: Feature-Liste (14 Mottos, 135 Spiele, Mengenberechnung, Druckbare Checkliste)
- NEU: "Du wählst Alter, Motto und Gästezahl. machsleicht erstellt den Plan: Ablauf mit Uhrzeiten, altersgerechte Spiele mit Anleitung, Einkaufsliste mit Preisen, Snack-Mengen und Kosten pro Kind."
- Darunter 3 Proof-Kacheln (inline, kompakt):
  "Weniger Grübeln · Weniger Vergessen · Weniger Übertreibung"

**B) "Was du nicht bekommst" einfügen (NEU, nach Motto-Teaser-Cards)**
```
Was der Planer bewusst nicht macht:
Kein unnötiges Basteltheater. Keine überladene Pinterest-Perfektion. 
Keine 80 Optionen, die dich am Ende blockieren.
```
Als kompaktes Tip-Element (1 Box, nicht eigene Sektion).

**C) Schatzsuche-Cross-Sell schärfen**
- ALT: "Komplette Schatzsuche in 5 Minuten — 6 Themen, 3 Altersgruppen, 90 einzigartige Stationen"
- NEU: "Wenn du ein Highlight willst, ergänze eine Schatzsuche. Für viele Geburtstage ist sie der einfachste Weg, aus einer netten Feier ein echtes Erlebnis zu machen."
- CTA bleibt: "→ Schatzsuche erstellen"

**D) CTA-Bereich upgraden**
- ALT: "Das reicht. Wirklich. / Wähl ein Motto. Wähl 2 Spiele aus. Der Rest ergibt sich."
- NEU: "Starte jetzt mit einem Plan, der wirklich machbar ist."
- CTA-Text bleibt: "🎂 Geburtstag jetzt planen →"

**E) NICHT ändern:**
- H1 (rankt gut)
- Motto-Grid und Motto-Teaser-Cards (SEO-Wert)
- FAQ (SEO-Wert)
- Altersgruppen-Links
- React-App

---

## 3. /schatzsuche (schatzsuche.html)

### Ist-Zustand
- H1: "Schatzsuche & Schnitzeljagd: in 5 Minuten fertig geplant"
- Hero mit 3 Checkmarks (Stationen, 6 Themen, Druckpaket)
- "Kennst du das?" Schmerz-Storytelling-Block (4 Absätze)
- "So funktioniert's" (4 Schritte)
- 6 Themen-Teaser mit CTAs
- SEO-Hauptblock "Was eine gute Schatzsuche wirklich ausmacht"
- React-App darunter bei #erstellen

### Änderungen

**A) Hero-Checkmarks upgraden**
- ALT: "Altersgerechte Stationen / 6 fertige Themen / Schatzkarte, Hinweise und Druckpaket"
- NEU:
  - "Schnell fertig — kein langes Selber-Ausdenken von Route und Hinweisen"
  - "Passend zum Alter — Aufgaben passen sich automatisch an"  
  - "Direkt druckbar — Schatzkarte, Stationen, Hinweise als fertiges Paket"
- Grund: Nutzen statt Features

**B) "Kennst du das?" kürzen**
Der Block ist 4 Absätze Storytelling. Gut geschrieben, aber zu lang für eine Tool-LP.
- NEU: 1 Absatz statt 4:
"Du sitzt abends am Küchentisch, der Geburtstag ist in zwei Tagen, und vor dir liegt: nichts. Kein Plan, keine Route, keine Hinweise. machsleicht baut dir die komplette Schatzsuche in 5 Minuten — mit Thema, Stationen und Schatzkarte. Du druckst nur noch aus."

**C) Einladungs-Cross-Sell einfügen (NEU, nach Themen-Teasern)**
```
Die passende Einladung direkt mitdenken
Wenn du willst, kombiniere die Schatzsuche mit einer passenden Einladung. 
So wirkt alles von Anfang an wie aus einem Guss.
CTA: → Passende Einladung erstellen
```

**D) Kindergeburtstag-Rücklink einfügen (NEU, nach FAQ/vor Footer)**
```
Du planst den ganzen Geburtstag?
Wenn du nicht nur die Schatzsuche, sondern den kompletten Geburtstag 
strukturieren willst, starte im Kindergeburtstags-Planer.
CTA: → Zum Kindergeburtstags-Planer
```

**E) NICHT ändern:**
- H1 (enthält "Schnitzeljagd" — unsere SEO-Arbeit von heute)
- "So funktioniert's" (4 Schritte — gut)
- 6 Themen-Teaser (starke Copy, gute CTAs)
- SEO-Hauptblock
- React-App

---

## Zusammenfassung der Änderungen

| Seite | Änderungen | Nicht anfassen |
|-------|-----------|---------------|
| Homepage | H1 kürzen, Subline, Trust-Zeile, Produkttexte, Warum-machsleicht | Link-Katalog, React |
| /kindergeburtstag | Snippet, Proof-Kacheln, "Was du nicht bekommst", Cross-Sell, CTA | H1, Motto-Grid, FAQ, React |
| /schatzsuche | Hero-Checkmarks, Kennst-du-das kürzen, Einladung-Cross-Sell, Planer-Rücklink | H1, Themen-Teaser, React |

**Geschätzte Umsetzungszeit:** 30–40 Minuten (nur SEO-Fallback-HTML, kein JS)
