# machsleicht.de — STATUS-AUDIT v2 (KORRIGIERT)
# Stand: 23. März 2026, nach Live-Site-Check
# WICHTIG: Die Live-Site ist DEUTLICH weiter als die lokalen Dateien hier!
# Du hast heute offenbar vom anderen Rechner sehr viel deployed.

---

## LEGENDE

- ✅ LIVE — Auf machsleicht.de verifiziert
- ⚠️ BUG — Existiert aber funktioniert nicht richtig
- ❌ OFFEN — Nicht gefunden auf Live-Site
- 🔄 ÜBERHOLT — Durch spätere Arbeit überholt

---

## KORREKTUR: Was ist ANDERS als im ersten Audit

Das erste Audit basierte auf den LOKALEN Dateien (die veraltet sind).
Der Live-Check zeigt: **viel mehr ist schon implementiert**, insbesondere:

- Schatzsuche hat Kaufmoment-Box, Affiliate-Links, Rollen-System, Personalisierung
- Schatzkarten-Engine hat Komplettpaket-Druck, Undo, Watermark, Fertig-Check
- Retention ("Erinnerung in 11 Monaten") ist live
- Signature "Das reicht. Wirklich." ist live
- Deep-Links Code existiert (aber hat Bugs)

---

## MASTER-EXECUTION-PLAN v3 — KORRIGIERTER STATUS

### PHASE 0A: QUICK WINS

| Task | Status | Live-Check |
|------|--------|------------|
| 0A.1 Plausible Analytics | ✅ LIVE | Auf allen Seiten, Custom Events in React-SPAs |
| 0A.1b Google Search Console | ❌ | Manuell zu prüfen (außerhalb dieser Audit-Möglichkeit) |
| 0A.2 Tote Links fixen | 🔄 ÜBERHOLT | /einschulung + /baby existieren als SPAs |
| 0A.3 Shared CSS + JS | ✅ LIVE | v1.1 Module auf allen Content-Seiten |
| 0A.7 Backup-Strategie | ❌ | Nicht sichtbar |

### PHASE 0B: ENTSCHEIDUNGEN

| Task | Status | Live-Check |
|------|--------|------------|
| 0B.4 Performance-Baseline | ❌ | Nicht dokumentiert |
| 0B.5 Canonical/URL-Strategie | ✅ LIVE | / = Homepage, /kindergeburtstag = Planer (getrennt) |
| 0B.6 OG/Social-Meta | ⚠️ BUG | og:image URLs gesetzt (`og-home.png`) — aber Bilder existieren vermutlich nicht (404?) |

### PHASE 1: GELD

| Task | Status | Live-Check |
|------|--------|------------|
| 1.0 Affiliate-Kennzeichnung | ✅ LIVE | Footer-Disclaimer in Content-Seiten + Schatzsuche |
| 1.1 Affiliate KiGe-Fallback | ❌ | Statischer Fallback in kindergeburtstag.html hat keine Affiliate-Links |
| 1.2 Affiliate SZ-Fallback | ❌ | Statischer Fallback in schatzsuche.html hat keine Affiliate-Links |
| 1.3 Kaufmoment-Box SZ React | ✅ LIVE | "Material bestellen?" + "Piraten-Schatzsuche-Kit" mit Pflicht/Sinnvoll + Amazon-Links |
| 1.4 Kaufmomente auf /kindergeburtstag | ❌ | Nicht im Planer sichtbar |
| 1.5 Sequentielles Testen | ❌ | |

### PHASE 2: SICHTBARKEIT

| Task | Status | Live-Check |
|------|--------|------------|
| 2.1 SZ: 200→1.500+ Wörter | ❌ | Statischer Content immer noch kurz |
| 2.2 KiGe: Motto-Grid als Cards | ✅ LIVE | 14 Motto-Cards im Planer (Klassisch + Charaktere Tabs) |
| 2.3 KiGe: Snippet + Alter-Cards | ⚠️ TEILWEISE | "Was du bekommst" als Card-Grid existiert, aber keine Snippet-Box nach H1, keine Altersgruppen-Cards |
| 2.4 SZ: FAQ-Schema | ❌ | Kein FAQPage JSON-LD |
| 2.5 KiGe: FAQ-Schema konsolidieren | ⚠️ | 5 FAQs im Schema (statt empfohlene 8) |
| 2.6 Social-Proof bereinigen | ❌ | Noch nicht geprüft ob "4.700+" noch steht |

### PHASE 3: VERBINDUNG

| Task | Status | Live-Check |
|------|--------|------------|
| 3.1 Deep-Links KiGe | ⚠️ BUG | Code existiert (Zeile 803). `alter` + `gaeste` funktionieren. `motto` setzt State aber wechselt NICHT den Tab (License-Mottos wie Pokemon bleiben unsichtbar im "Klassisch"-Tab) |
| 3.2 Deep-Links SZ | ⚠️ BUG | Code existiert (Zeile 576). `alter` funktioniert. `thema` setzt State aber Card wird NICHT visuell highlighted — Nutzer muss nochmal klicken |
| 3.3 Motto-CTAs auf /kindergeburtstag | ❌ | Keine CTAs die von Content → Planer mit Motto führen |
| 3.4 Cross-Links SZ ↔ KiGe | ⚠️ TEILWEISE | "Schatzsuche erstellen" Banner auf /kindergeburtstag existiert, aber KEIN Thema-Context wird übergeben. Kein Rück-Link von SZ → KiGe im Plan-View |
| 3.5 Back-Link korrigieren | ✅ LIVE | "← Startseite" Link in der Schatzsuche |

### PHASE 4: PRODUKT

| Task | Status | Live-Check |
|------|--------|------------|
| 4.1 SZ: localStorage Persistence | ✅ LIVE | Code bestätigt (saveS/loadS Helper, Zeile 585-588) |
| 4.2 Schatzkarte aus Toggle → Hero | ✅ LIVE | Karte DIREKT sichtbar im Plan-View, kein Toggle |
| 4.3 Karteneditor: Undo | ✅ LIVE | "Rückgängig" Button sichtbar |
| 4.4 Checkliste: Checkboxen + Snippet | ❌ | Nicht geprüft auf Live-Site |

### PHASE 5: CONVERSION + GROWTH

| Task | Status | Live-Check |
|------|--------|------------|
| 5.1 Signature Layer | ✅ LIVE | "Das reicht. Wirklich." als grüner Closer in Schatzsuche Plan-View |
| 5.2 Sticky CTA Mobile | ❌ | Nicht gesehen |
| 5.3 WhatsApp-Share | ⚠️ TEILWEISE | "Teilen" Button existiert in SZ Plan-View (prominent, orange) — unklar ob WhatsApp oder generic |
| 5.4 Share-Prompt nach Druck | ❌ | Nicht gesehen |
| 5.5 Retention: Calendar-Reminder | ✅ LIVE | "Erinnerung in 11 Monaten →" Link sichtbar |

### PHASE 6: GOLDEN TEMPLATE + LAUNCH

| Task | Status | Live-Check |
|------|--------|------------|
| 6.1 Golden Template | ✅ LIVE | Alle 30 Content-Seiten live |
| 6.2 Link-Checker Script | ❌ | |
| 6.3 Week 3 Health Check | ❌ | |

---

## SCHATZKARTEN-ENGINE v3 — KORRIGIERTER STATUS

### Welle A: SOFORT

| Task | Status | Live-Check |
|------|--------|------------|
| A.1 Kindername auf Karte + Story | ✅ LIVE | "Personalisieren — Name, Ort" Button + Kindername-Input sichtbar |
| A.2 Gestrichelte Pfadlinie | ❌ | Nicht sichtbar auf leerer Karte (müsste mit platzierten Stationen getestet werden) |
| A.3 Auto-Stationsnummern | ❌ | Kein Vorschlags-Banner sichtbar |
| A.4 Text-Tool auf Karte | ⚠️ | Placeholder sagt "Emojis antippen, Stationen platzieren oder Text auf die Karte schreiben" — Text-Tool möglicherweise implementiert |
| A.5 Komplettpaket-PDF | ✅ LIVE | "Komplettpaket drucken" Button prominent sichtbar |
| A.6 Hinweis-Zettel ausschneidbar | ❌ | Unklar (wäre im Komplettpaket-PDF) |
| A.7 "Karte altern lassen" Tipps | ❌ | Nicht gesehen |
| A.8 Fertig-Check vor Druck | ✅ LIVE | 0/4 Fortschrittsbalken mit Checkpunkten (Name, Stationen, Deko, Mind. 3 Elemente) |

---

## GREMIUM-TODO-schatzsuche — EXTRAS auf Live-Site (NICHT in Docs)

Folgende Features sind LIVE aber standen NICHT in den Planungsdokumenten:

1. **Rollen-Zuteilung** — "Jedes Kind bekommt eine Rolle" mit Kapitän, Navigator, Schatzmeister, Ausguck, Bootsmann
2. **Station-spezifische Affiliate-Links** — Bei jeder Station ein passender Amazon-Link (z.B. "Glasflaschen mit Korken ~€9")
3. **"Das perfekte Piraten-Schatzsuche-Kit"** — Separate Kaufmoment-Box mit allen Materialien + Preisen
4. **"Urkunden für die Kids drucken"** — Separater Button
5. **Live-Modus Button** — "Live-Modus starten (am Partytag)" prominent platziert
6. **Eltern-Tipps Toggle** — "Eltern-Tipps zeigen" bei den Stationen

---

## ZUSAMMENFASSUNG: WAS HAT ECHTE BUGS

### 🐛 Bug 1: Deep-Link Motto in Kindergeburtstag
**URL:** `/kindergeburtstag?motto=pokemon&alter=7&gaeste=10`
**Problem:** Alter (7) und Gäste (10) werden korrekt gesetzt. Aber Pokémon wird NICHT visuell selektiert weil der Tab auf "Klassisch" bleibt statt auf "Charaktere" zu wechseln.
**Fix:** Im useEffect nach `setMottoId(m)` auch `setTab(found.cat === "license" ? "license" : "generic")` aufrufen.
**Impact:** Hoch — jeder Deep-Link zu einem Lizenz-Motto (8 von 14) ist defekt.

### 🐛 Bug 2: Deep-Link Thema in Schatzsuche
**URL:** `/schatzsuche?thema=piraten&alter=7`
**Problem:** Alter (7) korrekt. Piraten-Card wird NICHT visuell highlighted. Nutzer muss manuell nochmal klicken.
**Vermutung:** `setThemeId` setzt den State, aber das Thema-Antippen löst normalerweise sofort den Plan-View aus. Beim Deep-Link bleibt man im Config-View.
**Fix:** Im useEffect nach setThemeId auch die View-Transition triggern die normalerweise beim Thema-Klick passiert.
**Impact:** Mittel — Nutzer muss einmal extra klicken, aber sieht zumindest das richtige Alter.

---

## WAS WIRKLICH NOCH OFFEN IST (priorisiert)

### 🔴 Bugs fixen (1-2 Stunden):
1. Deep-Link Tab-Wechsel in Kindergeburtstag
2. Deep-Link Auto-Select in Schatzsuche

### 🟠 Funnel-Verbindung vervollständigen (2-3 Stunden):
3. Motto-CTAs auf /kindergeburtstag statischem Content (→ /?motto=...)
4. Cross-Link von Schatzsuche Plan-View → Kindergeburtstag mit Theme-Übergabe
5. Schatzsuche-CTAs bei überlappenden Mottos (Piraten, Dschungel, etc.)

### 🟡 SEO-Content (3-4 Stunden):
6. Schatzsuche statischer Content 200 → 1.500+ Wörter
7. FAQ-Schema für Schatzsuche
8. KiGe FAQ-Schema auf 8 erweitern

### 🟢 Nice-to-have:
9. OG-Preview-Images erstellen
10. Sticky CTA Mobile
11. Checkliste echte Checkboxen
12. Stadt-Schatzsuchen (10 neue Seiten — eigenes Projekt)
