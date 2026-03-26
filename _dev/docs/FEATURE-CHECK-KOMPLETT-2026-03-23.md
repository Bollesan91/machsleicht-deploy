# machsleicht.de — KOMPLETTER FEATURE-CHECK
# Stand: 23. März 2026, Live-Site Analyse
# Ergebnis: Die Site ist DEUTLICH weiter als die Planungsdokumente vermuten lassen

---

## KORREKTUR ZUM AUDIT v2

Nach dem vollständigen Durchklicken aller Features muss das Audit v2 an mehreren Stellen korrigiert werden:

### Neu als ✅ LIVE bestätigt:
- **OG-Images**: `og-home.png` und `og-schatzsuche.png` existieren (HTTP 200)! Im Audit als ⚠️ BUG markiert — ist KEIN Bug.
- **Kaufmomente auf /kindergeburtstag**: Im Plan-View gibt es MEHRERE Kaufmomente (Backdeko, Deko, Mitgebsel, Einkaufsliste) — alle mit Amazon-Affiliate-Links + echten Preisen. War als ❌ markiert.
- **WhatsApp-Share**: Existiert auf BEIDEN SPAs prominent (grüner Button "Teilen", "Plan an Helfer schicken", "Einkaufsliste per WhatsApp schicken"). Sogar auf der Checkliste ("Per WhatsApp teilen").
- **FAQ-Schema Schatzsuche**: HAT 5 FAQs (nicht 0 wie im Audit). War als ❌ markiert.
- **Cross-Links KiGe → SZ**: Existiert an DREI Stellen: Header ("Schatzsuche" Link), nach Config ("Schatzsuche erstellen" Banner), im Plan-View ("Noch eine Schatzsuche dazu?").

---

## WAS ALLES LIVE IST (vollständige Liste)

### Kindergeburtstag-Planer (/kindergeburtstag)
- ✅ 14 Motto-Cards (6 Klassisch + 8 Charaktere) mit Tabs
- ✅ Alter-Slider (3-12) mit Altersgruppen-Beschreibung
- ✅ Gästezahl-Auswahl (4-15)
- ✅ Dynamischer CTA mit Motto-Name ("Piraten-Abenteuer-Geburtstag planen — los geht's!")
- ✅ "Morgen ist Geburtstag!" Notfall-Button
- ✅ Bereitschafts-Check (80/100 Kreisdiagramm) mit 6 Kategorien
- ✅ Budget-Modi: Minimal / Standard / Wow
- ✅ Location-Modi: Drinnen / Garten / Park
- ✅ Kompletter Zeitplan mit Uhrzeiten + Dauer
- ✅ "Zu wild? Ruhige Spiele" Toggle
- ✅ Foto-Moment Markierungen im Zeitplan
- ✅ Expander: Material-Liste + "So geht's" pro Spiel
- ✅ Rezept-Expander mit "Keine Zeit zum Backen?" Alternativen
- ✅ Snack-Mengen-Kalkulation (dynamisch: 10 Kinder → 15 Muffins, 2kg Obst, 6L Saft)
- ✅ Deko-Liste mit Checkboxen + "Hab ich schon" (Kosten rausrechnen)
- ✅ Mitgebsel-Vorschläge mit Amazon-Links + echten Preisen
- ✅ "Backdeko bei Amazon →" Affiliate-Link
- ✅ "Plan an Helfer schicken" (WhatsApp)
- ✅ "Smarte Einkaufsliste" mit WhatsApp + Amazon-Sammellink
- ✅ Kaufen/Leihen/DIY Übersicht
- ✅ "Plan als PDF speichern" Button
- ✅ "Erinnerung nächstes Jahr?" E-Mail-Reminder (Browser-only, DSGVO)
- ✅ "Noch eine Schatzsuche dazu?" Cross-Link mit Motto-Context
- ✅ Signature "Das reicht. Wirklich." als Closer
- ✅ 3 JSON-LD Schemas (WebApplication, FAQPage, ItemList)
- ✅ OG-Meta + og:image (og-home.png existiert!)
- ✅ Canonical URL gesetzt
- ✅ "Was du bekommst" 6 Feature-Cards
- ✅ "Was du NICHT bekommst" Anti-Features
- ✅ Motto-Ratgeber Grid (8 Lizenz-Mottos → Guide lesen)
- ✅ Deep-Links für ?alter= und ?gaeste= (funktionieren)
- ⚠️ Deep-Link ?motto= setzt State aber wechselt NICHT den Tab (Bug)

### Schatzsuche (/schatzsuche)
- ✅ 6 Themen-Cards (Piraten, Dschungel, Weltraum, Detektiv, Dino, Feen)
- ✅ Alter-Slider (3-12)
- ✅ Kindername-Personalisierung
- ✅ 5 Stationen mit thematischen Rätseln + Zeitangaben + Tags
- ✅ Rollen-Zuteilung (Kapitän, Navigator, Schatzmeister, Ausguck, Bootsmann)
- ✅ Station-spezifische Affiliate-Links (Amazon, echte Preise)
- ✅ Eltern-Tipps Toggle pro Station
- ✅ Live-Modus Button
- ✅ Schatzkarte als Hero (direkt sichtbar, kein Toggle)
- ✅ 4 Karten-Hintergründe (Pergament, Dschungel, Nacht, Eis)
- ✅ Thematische Emoji-Paletten (Piraten, Natur, Gebäude, Marker, Wege)
- ✅ Auto-Stationsnummern ("①②③ Stationen auto-platzieren")
- ✅ Gestrichelte Pfadlinie zwischen Stationen (automatisch!)
- ✅ Text-Tool ("✏️ Text" mit Eingabefeld + "Platzieren")
- ✅ Undo-Button ("Rückgängig")
- ✅ Fertig-Check (0/4 Fortschrittsbalken: Name, Stationen, Deko, Mind. 3 Elemente)
- ✅ "Nur Karte" + "Komplettpaket drucken" Buttons
- ✅ "Urkunden für die Kids drucken" Button
- ✅ Watermark "machsleicht.de" auf Karte
- ✅ "Das perfekte Piraten-Schatzsuche-Kit" Kaufmoment-Box (5 Produkte)
- ✅ "Was du brauchst" Station-pro-Station Materialliste
- ✅ "Material bestellen?" mit Pflicht/Sinnvoll/zuhause Kategorisierung
- ✅ "Schatz-Ideen" für die Schatzkiste
- ✅ "Teilen" Button (prominent, grün)
- ✅ "Drucken" Button
- ✅ "Erinnerung in 11 Monaten →" Retention-Link
- ✅ Signature "Das reicht. Wirklich." (dynamisch: "5 Stationen, ca. 38 Minuten")
- ✅ localStorage Persistence (ml_sz_ Prefix)
- ✅ "← Startseite" Back-Link
- ✅ 2 JSON-LD Schemas (HowTo, FAQPage mit 5 FAQs)
- ✅ OG-Meta + og:image (og-schatzsuche.png existiert!)
- ✅ Canonical URL gesetzt
- ✅ Deep-Link ?alter= (funktioniert)
- ⚠️ Deep-Link ?thema= setzt State aber Card nicht visuell selektiert (Bug)

### Content-Seiten (30 Stück)
- ✅ Alle 30 live mit v1.1 Shared CSS
- ✅ Plausible Analytics auf allen Seiten
- ✅ Affiliate-Disclaimer im Footer
- ✅ Print-Stylesheets
- ✅ Copy-Button mit iOS Fallback
- ✅ Breadcrumbs + Related Content Links

### Checkliste (/kindergeburtstag-checkliste)
- ✅ Zeitlicher Ablauf (2-3 Wochen, 1 Woche, 1-2 Tage, Am Tag)
- ✅ Interne Links (Motto-Ideen, Schatzsuche, Planer)
- ✅ "Automatische Checkliste erstellen" CTA → Planer
- ✅ "Per WhatsApp teilen" Button
- ✅ "Weiter lesen" Related Content
- ⚠️ Unicode ☐ statt echte HTML-Checkboxen (Nice-to-have)

---

## 🐛 ECHTE BUGS (nur 2!)

### Bug 1: Deep-Link Tab-Wechsel KiGe
**URL:** `/kindergeburtstag?motto=pokemon&alter=7&gaeste=10`
**Problem:** Pokémon (License-Motto) wird nicht selektiert weil Tab auf "Klassisch" bleibt.
**Fix:** 1 Zeile — nach `setMottoId(m)` auch `setTab(found.cat)` aufrufen.
**Impact:** 8 von 14 Mottos betroffen (alle License-Mottos).

### Bug 2: Deep-Link Theme-Selektion SZ
**URL:** `/schatzsuche?thema=piraten&alter=7`
**Problem:** Piraten-Card nicht visuell highlighted, Plan-View öffnet sich nicht.
**Fix:** Nach `setThemeId(t)` die View-Transition triggern.
**Impact:** Mittel — Nutzer muss einmal extra klicken.

---

## 📈 VERBESSERUNGSPOTENTIAL (priorisiert)

### 🔴 HOCH — Schnelle Wins mit großem Impact

**1. Deep-Link Bugs fixen (30 Min.)**
Beides sind 1-3 Zeilen Fixes. Danach funktionieren alle Deep-Links perfekt und der gesamte Funnel von Content-Seiten → SPAs wird nutzbar.

**2. Motto-CTAs in Content-Seiten (2-3 Std.)**
Die 30 Content-Seiten haben KEINE CTAs die direkt in den Planer mit Motto verlinken. Z.B. sollte /kindergeburtstag-piraten einen Button haben "Piraten-Party planen →" der zu /kindergeburtstag?motto=piraten führt. Das ist der größte Hebel für Conversion aus organischem Traffic.

**3. Schatzsuche → KiGe Cross-Link im Plan-View (30 Min.)**
KiGe hat "Noch eine Schatzsuche dazu?" aber SZ hat KEINEN Rück-Link zu KiGe. Umgekehrt wäre logisch: "Den ganzen Geburtstag planen? → Kindergeburtstag planen" mit Theme-Context.

### 🟠 MITTEL — SEO-Hebel

**4. Schatzsuche statischer Content zu kurz (3-4 Std.)**
Der gerenderte Content ist nur ~613 Wörter. Laut Plan sollen es 1.500+ werden. Mehr Text = bessere SEO-Sichtbarkeit für "Schatzsuche Kindergeburtstag". Fehlt: ausführliche Themen-Beschreibungen, Piraten-Beispiel als Teaser, Alters-Tipps.

**5. FAQ-Schema Schatzsuche auf 8 erweitern (1 Std.)**
Hat aktuell 5 FAQs (gut!), Plan sagt 8. Drei weitere relevante Fragen hinzufügen (z.B. "Wie lange dauert eine Schatzsuche?", "Brauche ich eine Schatzkarte?", "Was kosten die Materialien?").

**6. KiGe FAQ-Schema auf 8 erweitern (1 Std.)**
Ebenfalls derzeit unter 8 FAQs. Mehr FAQs = mehr Rich Results in Google.

### 🟡 NICE-TO-HAVE — Polish

**7. Echte Checkboxen auf Checkliste (1 Std.)**
Unicode ☐ → `<input type="checkbox">` mit localStorage-Persistence. Nutzer können abhaken und der Fortschritt bleibt.

**8. Sticky CTA Mobile (2 Std.)**
Auf Mobile verschwindet der "Geburtstag planen" CTA beim Scrollen. Ein sticky Footer-Button würde die Conversion erhöhen.

**9. Statische Fallbacks für Google (3-4 Std.)**
Beide SPAs haben KEIN `<noscript>` Tag. Googlebot rendert zwar JS, aber ein statischer Fallback wäre Absicherung. Besonders für die Affiliate-Links die sonst für Bots unsichtbar sind.

**10. Snippet-Box nach H1 auf Checkliste (30 Min.)**
Ein kurzes "Das Wichtigste in 30 Sekunden" Snippet direkt nach der H1 auf der Checkliste-Seite.

### 🟢 EIGENE PROJEKTE

**11. Stadt-Schatzsuchen (5+ Tage)**
10 Leuchtturm-Seiten mit parkspezifischen Presets. Komplett neues Content-Vertical — eigenes Projekt.

---

## ZUSAMMENFASSUNG

Die Site ist in einem **hervorragenden Zustand**. Der Kindergeburtstag-Planer ist ein vollwertiges Produkt mit Bereitschafts-Check, Budget-Modi, Location-Modi, Zeitplan, Einkaufsliste, WhatsApp-Share, PDF-Export und Retention. Die Schatzsuche hat eine beeindruckende Karten-Engine mit Auto-Stationen, Pfadlinien, Text-Tool und Komplettpaket-Druck.

**Was WIRKLICH noch fehlt** ist primär die **Funnel-Verbindung**: Content-Seiten → SPA mit Deep-Links. Die Deep-Link Bugs fixen + Motto-CTAs in Content-Seiten einbauen würde den größten Unterschied machen für Conversion und SEO.

**Geschätzter Aufwand für alle "HOCH" Items:** ~4 Stunden
**Geschätzter Aufwand für alle "MITTEL" Items:** ~5-6 Stunden
**Geschätzter Aufwand für alle Items:** ~15-20 Stunden
