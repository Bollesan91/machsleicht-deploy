# machsleicht.de — Konsolidiertes Audit-Backlog

**Erstellt:** 11.04.2026
**Quellen:** Technisches Audit (Claude-Session) + Strategisches Audit (externes Dokument)
**Bewertung Ist-Stand:** 7,2/10 — starker Produktkern, Systemdisziplin fehlt

---

## P0 — SOFORT (vor dem nächsten Deploy)

### P0-1: Google Search Console einrichten + Sitemap einreichen

**Problem im Detail:**
machsleicht.de taucht bei keiner Google-Suche auf — nicht einmal bei einer direkten Suche nach "machsleicht.de kindergeburtstag". Die Seite existiert für Google praktisch nicht. Ihr habt 361 URLs in der Sitemap, 364 HTML-Seiten gebaut, aber ohne GSC-Verifizierung und manuelle Sitemap-Einreichung kann es Monate dauern, bis Google die Seite überhaupt entdeckt. Jeder Tag ohne GSC ist ein Tag, an dem eure 364 Seiten unsichtbar bleiben.

**Lösung — Schritt für Schritt:**
1. Google Search Console öffnen: https://search.google.com/search-console
2. Property hinzufügen → "URL-Präfix" → `https://machsleicht.de`
3. Verifizierung: DNS-TXT-Record bei eurem Domain-Registrar setzen (oder HTML-Datei hochladen)
4. Nach Verifizierung: Sitemaps → `https://machsleicht.de/sitemap.xml` einreichen
5. URL-Prüfung → Startseite manuell zur Indexierung anmelden
6. Die 5–10 wichtigsten Seiten einzeln zur Indexierung einreichen:
   - `/kindergeburtstag`
   - `/kindergeburtstag-checkliste`
   - `/kindergeburtstag-drinnen`
   - `/kindergeburtstag-draussen`
   - `/schatzsuche-kindergeburtstag`
   - `/einladung`
   - `/schnitzeljagd-aufgaben`
   - `/kindergeburtstag/detektiv`
   - `/kindergeburtstag/dino`
   - `/kindergeburtstag/piraten`

**Aufwand:** 20 Minuten
**Wirkung:** Ohne diesen Schritt sind alle anderen SEO-Maßnahmen wirkungslos.

---

### P0-2: "0 Spiele"-Bug in 16 Title-Tags fixen

**Problem im Detail:**
16 Altersgruppen-Seiten haben einen Bug in der Title-Generierung. Der Title enthält "0 Spiele" statt einer echten Zahl. Beispiel:

```
Zirkus-Show Kindergeburtstag 9–12 Jahre — 0 Spiele & Ideen | machsleicht
```

Google zeigt den Title als Snippet in den Suchergebnissen. "0 Spiele" signalisiert: leere Seite, kein Inhalt, nicht klickenswert. Das ist ein CTR-Killer und ein Qualitätssignal an Google, dass die Seite minderwertig ist.

**Betroffene Dateien (alle 16):**
```
kindergeburtstag/zirkus-6-8-jahre.html
kindergeburtstag/zirkus-3-5-jahre.html
kindergeburtstag/zirkus-9-12-jahre.html
kindergeburtstag/meerjungfrau-9-12-jahre.html
kindergeburtstag/meerjungfrau-6-8-jahre.html
kindergeburtstag/meerjungfrau-3-5-jahre.html
kindergeburtstag/pferde-6-8-jahre.html
kindergeburtstag/pferde-9-12-jahre.html
kindergeburtstag/pferde-3-5-jahre.html
kindergeburtstag/ritter-3-5-jahre.html
kindergeburtstag/ritter-6-8-jahre.html
kindergeburtstag/ritter-9-12-jahre.html
kindergeburtstag/detektiv-9-12-jahre.html
kindergeburtstag/detektiv-3-5-jahre.html
kindergeburtstag/detektiv-6-8-jahre.html
kindergeburtstag/baustelle-3-5-jahre.html
```

**Lösung:**
Der Bug steckt vermutlich in der Generierungslogik in `_src/kindergeburtstag-data.js` oder im Build-Skript. Es wird die Spiele-Anzahl für die Altersgruppen-Seiten gezählt, aber bei bestimmten Motto×Altersgruppen-Kombinationen gibt die Zählung 0 zurück — vermutlich weil die Spiele-Daten für diese Kombination fehlen oder falsch gemappt sind.

**Kurzfristiger Fix (sofort):** In jeder der 16 Dateien den Title manuell korrigieren — "0 Spiele &amp; Ideen" ersetzen durch den Motto-Namen + Altersgruppe ohne Spiele-Zahl:
```html
<!-- VORHER -->
<title>Zirkus-Show Kindergeburtstag 9–12 Jahre — 0 Spiele &amp; Ideen | machsleicht</title>
<!-- NACHHER -->
<title>Zirkus-Show Kindergeburtstag 9–12 Jahre — Spiele &amp; Ideen | machsleicht</title>
```

**Langfristiger Fix:** Root Cause in `_src/kindergeburtstag-data.js` finden und beheben, damit der Build die korrekte Anzahl erzeugt. Dann alle 16 Seiten neu generieren.

**Aufwand:** Kurzfristig 15 Min (Suchen+Ersetzen), langfristig 30–60 Min (Data-Bug finden)

---

### P0-3: Duplicate Titles bei 5 Motto-Hauptseiten fixen

**Problem im Detail:**
Bei 5 Mottos ist der Title der Hauptseite (z.B. `dino.html`) quasi identisch mit dem Title der Altersgruppen-Seite (z.B. `dino-3-5-jahre.html`), weil beide denselben Altersbereich im Title tragen. Zusätzlich mischen einige Titles HTML-Entities (`&ndash;`) mit echten UTF-8-Zeichen (`–`) im selben String — das ist zwar kein SEO-Killer, aber unsauber.

**Betroffene Paare:**

| Hauptseite | Title-Problem |
|---|---|
| `dino.html` | `(3–5–12 Jahre)` — doppelter Bindestrich, unklar |
| `einhorn.html` | `(3–5–12 Jahre)` — gleich |
| `weltraum.html` | `(5–6–12 Jahre)` — gleich |
| `safari.html` | `(3–5–12 Jahre)` — gleich |
| `feuerwehr.html` | `(3–5–12 Jahre)` — gleich |

Das `–5–12` sieht aus, als wären zwei Alters-Ranges (3–5 und 6–12) ohne Trennzeichen zusammengefügt worden.

**Lösung:**
Hauptseiten-Titles müssen den vollen Altersbereich klar zeigen:
```html
<!-- VORHER -->
<title>Dino-Abenteuer Kindergeburtstag &mdash; Spiele, Deko &amp; Ablauf (3–5&ndash;12 Jahre) | machsleicht</title>
<!-- NACHHER -->
<title>Dino-Abenteuer Kindergeburtstag — Spiele, Deko &amp; Ablauf (3–12 Jahre) | machsleicht</title>
```

Zusätzlich: Entity-Nutzung vereinheitlichen. Entweder überall `&ndash;` oder überall `–` (UTF-8). Empfehlung: UTF-8 direkt, da die Seiten eh UTF-8-encoded sind.

**Aufwand:** 15 Min

---

### P0-4: /_dev/ aus öffentlichem Zugriff sperren

**Problem im Detail:**
Der Ordner `_dev/` enthält 13 MB Dev-Artefakte, darunter eine 8,6 MB alte Deploy-Version (`deploy-v12-schatzsuche.html`), alte Skripte, Prototypen und Konfigurationen. Er ist nicht in der Sitemap und nicht intern verlinkt, ABER er ist über Netlify öffentlich aufrufbar (z.B. `machsleicht.de/_dev/deploy-v12-schatzsuche.html`). Es gibt keinen Schutz in robots.txt, keine noindex-Direktive und keinen Netlify-Header.

**Risiko:** Gering solange keine GSC aktiv ist. Mittel sobald Google anfängt zu crawlen — besonders die 8,6 MB HTML-Datei könnte indexiert werden und mit dem echten Planer konkurrieren. Das andere Audit bewertet das als "brandgefährlich" — ich sage: gefährlich, aber nicht die Nr. 1, weil Google die Seite aktuell eh nicht kennt.

**Lösung — 3 Schichten:**

1. **robots.txt erweitern:**
```
User-agent: *
Allow: /
Disallow: /_dev/
Disallow: /_build/
Disallow: /_src/
Sitemap: https://machsleicht.de/sitemap.xml
```

2. **Netlify _headers Datei erstellen** (im Repo-Root):
```
/_dev/*
  X-Robots-Tag: noindex, nofollow
/_build/*
  X-Robots-Tag: noindex, nofollow
/_src/*
  X-Robots-Tag: noindex, nofollow
```

3. **Langfristig:** `_dev/`, `_build/`, `_src/` in `netlify.toml` als Redirect auf 404 oder per Netlify-Plugin komplett aus dem Deploy ausschließen. Am saubersten: `.netlifyignore`-Datei:
```
_dev/
_build/
_src/
sparring-engine.jsx
party-worker.js
```

**Aufwand:** 10 Min (robots + headers), 5 Min (.netlifyignore)

---

## P1 — DIESE WOCHE

### P1-1: /schatzsuche als eigenständige Produktseite bauen

**Problem im Detail:**
`/schatzsuche` ist aktuell eine Meta-Refresh-Weiterleitung auf `/kindergeburtstag?modus=schatzsuche#planer`. Das Canonical zeigt auf `/kindergeburtstag`. Für Google sind `/schatzsuche` und `/kindergeburtstag` damit dieselbe Seite.

Gleichzeitig existieren 8 eigenständige Schatzsuche-Themenseiten (`/schatzsuche/detektiv`, `/schatzsuche/dino`, etc.) plus `/schatzsuche-kindergeburtstag` und `/schatzsuche-drinnen` — alle in der Sitemap. Diese Seiten verlinken auf ein Produkt, das keine eigene Landingpage hat.

Das ist das Architekturproblem, das beide Audits identifiziert haben: Die Schatzsuche wird nach außen als eigenständiges Produkt kommuniziert (eigene CTA auf Homepage, eigene Themenseiten, eigener Sitemap-Cluster), aber technisch existiert sie nicht als eigene Seite.

**Warum das kritisch ist:**
- "Schatzsuche Kindergeburtstag" ist ein High-Intent-Keyword mit eigenem Suchvolumen
- Google kann keine Seite ranken, die nur eine Weiterleitung ist
- Die 8 Themenseiten haben keinen Hub, auf den sie verlinken können
- Nutzer, die von einer Themenseite auf "Schatzsuche" klicken, landen im Kindergeburtstags-Planer — das ist verwirrend

**Lösung:**
`schatzsuche.html` muss eine vollwertige Landingpage werden:

- **Eigener Title:** `Schatzsuche Kindergeburtstag — 9 Themen, fertig in 5 Minuten | machsleicht`
- **Eigener H1:** `Schatzsuche für den Kindergeburtstag erstellen`
- **Eigene Meta Description**
- **Eigenes Canonical:** `https://machsleicht.de/schatzsuche`
- **Intro-Text:** Was die Schatzsuche kann, für wen sie ist, wie es funktioniert
- **Themen-Übersicht:** Links zu allen 8 Themenseiten mit Kurzvorschau
- **Direkt-Einstieg:** CTA zum Schatzsuche-Modus des Planers
- **FAQ-Block:** eigenes Schema
- **Ergebnis-Vorschau:** Beispiel-Schatzkarte, Beispiel-Stationen (Screenshot oder Live-Demo)

Die Weiterleitung (`meta http-equiv="refresh"`) muss raus. Die `_redirects`-Regel `/schatzsuche → /kindergeburtstag?modus=schatzsuche#planer 301` muss auf eine 200-Rewrite geändert werden: `/schatzsuche /schatzsuche.html 200`

**Aufwand:** 2–3 Stunden Content + Markup

---

### P1-2: /schnitzeljagd ebenfalls als eigenständige Seite bauen

**Problem im Detail:**
Identisches Problem wie /schatzsuche — ist auch nur eine Meta-Refresh-Weiterleitung. "Schnitzeljagd" und "Schatzsuche" sind unterschiedliche Keywords mit unterschiedlicher Suchintention. Aktuell werden beide auf dieselbe Seite geleitet.

**Lösung:**
`schnitzeljagd.html` als eigene Landingpage mit Fokus auf "Schnitzeljagd" als Keyword. Kann inhaltlich stark auf `/schatzsuche` verweisen, braucht aber eigenen Title, H1, Meta Description und Canonical.

Bereits existierende Seiten `/schnitzeljagd-aufgaben` und `/schnitzeljagd-draussen` können dann sauber auf diese Hub-Seite interlinken.

**Aufwand:** 1–2 Stunden

---

### P1-3: 9 Einladungs-Themenseiten — Canonical-Tags ergänzen

**Problem im Detail:**
Alle 9 Einladungs-Themenseiten (dino, einhorn, safari, feuerwehr, detektiv, prinzessin, weltraum, meerjungfrau, superheld) haben kein Canonical-Tag. Sie sind aber in der Sitemap.

Ohne Canonical kann Google frei entscheiden, welche Version einer Seite die "kanonische" ist. Im schlimmsten Fall werden Seiten gegeneinander ausgespielt oder als Duplicate markiert.

**Betroffene Dateien:**
```
einladung/dino/index.html
einladung/einhorn/index.html
einladung/safari/index.html
einladung/feuerwehr/index.html
einladung/detektiv/index.html
einladung/prinzessin/index.html
einladung/weltraum/index.html
einladung/meerjungfrau/index.html
einladung/superheld/index.html
```

**Lösung:**
In jeder Datei im `<head>` ergänzen:
```html
<link rel="canonical" href="https://machsleicht.de/einladung/[motto]">
```

**Aufwand:** 10 Min

---

### P1-4: Einladungs-Tool — Default-Motto neutralisieren

**Problem im Detail:**
Wenn ein Nutzer generisch auf `/einladung/erstellen` geht (z.B. von der Homepage), startet das Tool mit einem vorausgewählten Piraten-Motto. Das ist verwirrend, weil der Nutzer kein Motto gewählt hat. Es wirkt, als wäre das Tool ein Piraten-Tool statt ein universelles Einladungs-Tool.

**Lösung:**
- Generischer Einstieg (`/einladung/erstellen` ohne Parameter): kein Motto vorausgewählt, Nutzer wählt selbst
- Motto-spezifischer Einstieg (z.B. von `/einladung/dino`): Dino vorausgewählt
- Technisch: URL-Parameter `?motto=piraten` setzen, wenn von Themenseite kommend. Ohne Parameter → neutraler Zustand.

**Aufwand:** 30–60 Min (JS-Logik im Einladungs-Tool)

---

### P1-5: GitHub PAT rotieren (Deadline 25.04.)

**Problem im Detail:**
Der aktuelle Personal Access Token `ghp_V12E...` läuft am 25.04.2026 ab. Danach scheitern alle git push/pull-Operationen aus Claude-Sessions.

**Lösung:**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Neuen Token generieren: Scope `repo` (Full control), Laufzeit 90 Tage
3. Token in der git-sync Skill-Konfiguration aktualisieren
4. Alten Token widerrufen

**Aufwand:** 5 Min
**Deadline:** Spätestens 24.04.

---

## P2 — NÄCHSTE 2 WOCHEN

### P2-1: Homepage-Hero auf Kindergeburtstag-Cluster fokussieren

**Problem im Detail:**
Die Homepage listet im oberen Sichtbereich 4 CTAs (Kindergeburtstag, Schatzsuche, Einladung, Partyseite) und darunter 8 weitere Tools (Einschulung, Baby, Kreuzworträtsel, Spielkarten, etc.). Für eine Seite im Aufbau, die noch null organischen Traffic hat, ist das zu breit. Der stärkste Cluster — Kindergeburtstag + Schatzsuche + Einladung — wird verwässert.

Die Seite scrollt auf Mobile extrem lang: Planer-Beschreibung, Schatzsuche-Beschreibung, Einladung, Partyseite, 8 weitere Tools, 17 Ratgeber-Links, Altersseiten, Warum-Block, Footer. Das sind gut 15 Screen-Scrolls auf einem Handy.

**Lösung:**
- Hero-Bereich: nur Kindergeburtstag + Schatzsuche + Einladung (die drei stärksten Produkte)
- Partyseite als Teil des Kindergeburtstag-Flows positionieren, nicht als eigenständiger CTA
- "Weitere Tools" (Einschulung, Baby, Kreuzworträtsel, etc.) in einen eingeklappten Bereich oder ans Ende
- "Warum machsleicht?"-Block NACH OBEN verschieben — direkt unter den Hero
- Ratgeber- und Altersseiten-Links als kompakteres Grid statt vertikale Listen

**Aufwand:** 2–3 Stunden

---

### P2-2: Thin Content bei Motto×Altersgruppen-Seiten nachschärfen

**Problem im Detail:**
Die 281 Seiten im `/kindergeburtstag/`-Ordner sind aus Kombinationen von 17 Mottos × (10 Einzel-Alter + 3 Altersgruppen + 1 Hauptseite) generiert. Die Altersgruppen-Seiten (3-5, 6-8, 9-12 Jahre) sind mit 16 KB deutlich dünner als die Einzelalter-Seiten (18–23 KB) und die Hauptseiten (20–36 KB).

Das Problem ist nicht die Datenmenge, sondern ob die Inhalte zwischen z.B. "Baustelle 6 Jahre" und "Baustelle 7 Jahre" wirklich inhaltlich differenziert sind. Wenn Google 10+ Seiten findet, die sich nur in der Altersangabe unterscheiden aber denselben Content haben, wertet es das als Thin/Duplicate Content — und das schadet der gesamten Domain.

**Lösung — Zwei Optionen:**

**Option A (konservativ):** Die Altersgruppen-Seiten (3-5, 6-8, 9-12) behalten, Einzel-Alter-Seiten (3, 4, 5, 6, 7, 8, 9, 10, 11, 12 Jahre) auf noindex setzen oder per Canonical auf die Gruppeseite verweisen. Das reduziert die indexierbaren Seiten von 281 auf ~70.

**Option B (selektiv):** Die Top-20-Seiten mit echtem Suchvolumen identifizieren (via GSC-Daten nach einigen Wochen) und nur diese auf Premium-Niveau heben. Rest auf noindex oder Canonical.

**Empfehlung:** Option A sofort, dann Option B mit echten Daten in 4–6 Wochen.

**Aufwand:** 2–4 Stunden (je nach Umsetzungsvariante)

---

### P2-3: Ergebnis-Vorschauen auf Produktseiten einbauen

**Problem im Detail:**
Die Seiten beschreiben, was die Tools erzeugen, zeigen aber kein konkretes Ergebnis. "Berechnet automatisch altersgerechte Spiele, Snack-Mengen pro Kind und die geschätzten Kosten" ist ein Versprechen. Ein Screenshot eines fertigen Plans mit Zeitablauf, Spielen und Einkaufsliste wäre ein Beweis.

Eltern, die gestresst sind und schnell entscheiden müssen, brauchen keinen Text, der erklärt was passiert — sie brauchen ein Bild, das zeigt "so sieht dein Ergebnis aus".

**Wo Vorschauen fehlen:**
- Homepage: Kein Beispiel-Output sichtbar
- `/kindergeburtstag`: Kein Beispiel-Zeitplan
- `/schatzsuche` (sobald umgebaut): Keine Beispiel-Schatzkarte
- `/einladung`: Keine Beispiel-Einladung
- Partyseite: Keine Beispiel-Partyseite

**Lösung:**
Für jedes der 4 Kernprodukte einen "So sieht dein Ergebnis aus"-Screenshot erstellen:
1. Einmal das Tool mit realistischen Daten durchlaufen lassen
2. Screenshot des Ergebnisses machen
3. Als Bild auf der jeweiligen Landingpage einbinden — oberhalb des CTAs
4. `loading="lazy"` und aussagekräftigen `alt`-Text setzen

**Aufwand:** 2 Stunden (Screenshots + Einbindung)

---

### P2-4: robots.txt und _headers für Build-Ordner

Siehe P0-4 — dort beschrieben. Die eigentliche Implementierung kann in P2 fallen, solange der robots.txt-Teil sofort gemacht wird.

---

### P2-5: Performance — JS-Bundle und externe Abhängigkeiten

**Problem im Detail:**
- `kindergeburtstag.js` (307 KB) + `kindergeburtstag-data.js` (116 KB) = 423 KB JavaScript
- React 18 wird von unpkg.com geladen — externe CDN-Abhängigkeit, kein Fallback
- Kein Web App Manifest — kein "Add to Homescreen" auf Mobile
- Kein `loading="lazy"` auf Bildern der Homepage
- Netlify komprimiert automatisch per Brotli, daher ist die Transfer-Größe kleiner als 423 KB. Aber das Parsing bleibt.

**Lösung (schrittweise):**
1. **Kurzfristig:** `loading="lazy"` auf alle `<img>`-Tags setzen (5 Min)
2. **Kurzfristig:** `manifest.json` erstellen mit Icon-Referenzen (10 Min)
3. **Mittelfristig:** React von unpkg.com selbst hosten — Datei ins `/js/`-Verzeichnis kopieren
4. **Langfristig:** Code-Splitting evaluieren — die 307 KB werden nur auf `/kindergeburtstag` gebraucht, aber auf allen anderen Seiten nicht geladen. Prüfen ob der Data-Layer (116 KB) lazy nachgeladen werden kann.

**Aufwand:** Kurzfristig 15 Min, langfristig 2–4 Stunden

---

### P2-6: Encoding-Inkonsistenz in Title-Tags bereinigen

**Problem im Detail:**
Einige Title-Tags mischen HTML-Entities (`&mdash;`, `&ndash;`) mit echten UTF-8-Zeichen (`–`) im selben String:
```html
<title>Safari-Expedition Kindergeburtstag &mdash; Spiele, Deko &amp; Ablauf (3–5&ndash;12 Jahre)</title>
```
Hier steht `3–5` (UTF-8 Dash) direkt neben `&ndash;` (Entity Dash). Das erzeugt in manchen Kontexten (Suchergebnisse, Social Shares) unterschiedliche Darstellungen.

**Lösung:**
Alle Title-Tags auf einheitliches UTF-8 normalisieren. Da die Seiten `<meta charset="UTF-8">` haben, können die Entities durch echte Zeichen ersetzt werden:
```bash
# In allen HTML-Dateien:
&mdash; → —
&ndash; → –
&amp; → bleibt (muss als Entity bleiben in Attributen)
```

**Aufwand:** 15 Min (Skript über alle Dateien)

---

## P3 — NÄCHSTER MONAT

### P3-1: Repo aufräumen — Dev-Artefakte entfernen

**Problem im Detail:**
Das Repo enthält Dateien, die nicht zum produktiven Deploy gehören:
- `_dev/` (13 MB) — alte Prototypen, Configs, eine 8,6 MB Deploy-Version
- `sparring-engine.jsx` (167 KB) — im Root, Dev-Artefakt
- `party-worker.js` (56 KB) — Cloudflare Worker Code, gehört nicht ins Netlify-Deploy
- `Setup-Anleitung-machsleicht.docx` (14 KB) — Dokumentation, nicht für Production
- `prompt-fuer-claude-chat.txt` — internes Dokument

Diese Dateien machen den git clone langsamer, das Repo unübersichtlicher und werden unnötig von Netlify deployed.

**Lösung:**
1. `.netlifyignore` erstellen (verhindert Deploy, bleibt aber im Repo):
```
_dev/
_build/
_src/
sparring-engine.jsx
party-worker.js
Setup-Anleitung-machsleicht.docx
prompt-fuer-claude-chat.txt
validate.js
validate-all.sh
```

2. Langfristig: `_dev/` in ein separates Repo oder Branch auslagern, um die Repo-Größe von 33 MB auf ~18 MB zu reduzieren.

**Aufwand:** 10 Min (.netlifyignore), 30 Min (Repo-Cleanup)

---

### P3-2: Monetarisierung starten — Amazon Affiliate Tag setzen

**Problem im Detail:**
Der Affiliate-Disclaimer steht im Footer jeder Seite, aber es gibt keinen aktiven Affiliate-Tag. Die Kaufmoment-Blöcke (`.kaufmoment` CSS-Klasse) existieren im CSS, aber ohne funktionierenden Tag generiert kein Klick Einnahmen.

**Lösung:**
1. Amazon PartnerNet-Konto erstellen/aktivieren
2. Tag als Umgebungsvariable in Netlify setzen: `AMAZON_TAG=machsleicht-21` (o.ä.)
3. Im Build-Prozess den Tag in alle Affiliate-Links injizieren
4. Awin-Anmeldung für weitere Affiliate-Netzwerke starten

**Aufwand:** 30 Min (Amazon Tag), 1–2 Stunden (Awin-Bewerbung + Integration)

---

### P3-3: Sichtbare Ergebnis-Beweisführung ausbauen

**Problem im Detail (Erweiterung von P2-3):**
Über Screenshots hinaus fehlt auf den Seiten jede Form von Social Proof: keine Nutzerzahlen, keine Testimonials, keine "X Pläne erstellt"-Counter. Für ein Tool, das Vertrauen braucht ("Soll ich meinen Kindergeburtstag wirklich einem Online-Tool anvertrauen?"), ist das ein Conversion-Hemmnis.

**Lösung:**
- Plausible-Analytics auswerten: wie viele Pläne wurden erstellt? Diesen Counter auf die Seite bringen
- Nach den ersten Nutzern aktiv Feedback einholen und als Zitat auf die Seite setzen
- "Von Eltern für Eltern" stärker mit echten Beispielen unterlegen

**Aufwand:** Variabel, abhängig von verfügbaren Daten

---

## Zusammenfassung — Reihenfolge

| Prio | Ticket | Aufwand | Wirkung |
|------|--------|---------|---------|
| P0-1 | Google Search Console | 20 Min | Ohne das existiert die Seite nicht |
| P0-2 | "0 Spiele"-Bug fixen | 15 Min | 16 kaputte Titles reparieren |
| P0-3 | Duplicate Titles fixen | 15 Min | 5 Motto-Seiten sauber machen |
| P0-4 | /_dev/ sperren | 10 Min | Dev-Inhalte vor Index schützen |
| P1-1 | /schatzsuche als eigene Seite | 2–3 Std | Eigenes Keyword-Cluster erschließen |
| P1-2 | /schnitzeljagd als eigene Seite | 1–2 Std | Zweites Keyword-Cluster |
| P1-3 | Einladung Canonicals | 10 Min | 9 Seiten Index-sauber machen |
| P1-4 | Einladung Default neutralisieren | 30–60 Min | UX-Fix |
| P1-5 | GitHub PAT rotieren | 5 Min | Deployment absichern |
| P2-1 | Homepage-Hero fokussieren | 2–3 Std | Conversion + Klarheit |
| P2-2 | Thin Content nachschärfen | 2–4 Std | Domain-Qualität schützen |
| P2-3 | Ergebnis-Vorschauen | 2 Std | Conversion steigern |
| P2-5 | JS-Performance | 15 Min–4 Std | Ladezeit verbessern |
| P2-6 | Encoding-Normalisierung | 15 Min | Sauberkeit |
| P3-1 | Repo aufräumen | 10–30 Min | Build-Hygiene |
| P3-2 | Amazon Tag setzen | 30 Min | Erste Einnahmen |
| P3-3 | Social Proof | variabel | Langfristig Conversion |

---

### P2-7: Einladungs-Hub mit ?motto=X-Links ausstatten

**Problem im Detail:**
Der URL-Parameter `?motto=X` auf `/einladung/erstellen` funktioniert (wählt Motto automatisch vor), wird aber nirgends verlinkt. Die Einladungs-Themenseiten (`/einladung/dino`, etc.) sind Fullscreen-React-Apps mit `overflow:hidden` — ein Floating-CTA überlappt dort immer Content. Der Einladungs-Hub (`/einladung/index.html`) ist ebenfalls eine React-App und verlinkt aktuell nicht auf `/einladung/erstellen`.

Zusätzlich: Der Hub-Title zeigt "Piraten-Einladung erstellen" statt einen neutralen Titel.

**Lösung:**
Beim nächsten Umbau des Einladungs-Hubs die Motto-Karten mit Links auf `/einladung/erstellen?motto=X` versehen. Hub-Title neutralisieren.

**Aufwand:** 30–60 Min (React-Code im Hub)

---

### P4-1: PDF-Partybücher pro Motto (nach Rätsel nach Maß Launch)

**Idee:**
Pro Motto ein "Forscher-Partybuch" / "Abenteuer-Partybuch" als PDF-Download: Ausmalseiten + Rätsel + Quiz + Steckbrief + Urkunde + Blanko-Felder ("Paläontologe: ___"). 20–30 Seiten. Nicht nur Malbuch, sondern Party-Activity-Book. Eltern kaufen 6–8 Exemplare, drucken selbst.

**Monetarisierung:** 2,99€ über Lemon Squeezy (selber Stack wie Rätsel nach Maß). ~95% Marge.
**Alternativ:** Amazon KDP als physisches Buch (5,99€, ~25% Marge) oder Print-on-Demand (Gelato/Peecho, ~40-50%).

**Integration auf machsleicht.de:**
- Auf jeder Motto×Altersgruppe-Seite unter "Mitgebsel" und "Basteln" verlinken
- Im Planer-Output als "Partybuch dazubuchen" einbauen

**Voraussetzung:** Erst Traffic aufbauen (Content-Seiten), dann zusammen mit Rätsel nach Maß launchen.
**Start mit:** Top-5-Mottos (Dino, Piraten, Einhorn, Feuerwehr, Detektiv).
**Aufwand:** 1 Tag pro Motto (Illustrationen + Layout).

---

### P4-2: Rätsel nach Maß + PDF-Partybuch gemeinsamer Launch

**Idee:** Beide Produkte teilen denselben Lemon Squeezy + KV Credit-Tracking Stack. Ein Setup, zwei Produkte. Rätsel nach Maß (0,99€/2,99€) + Partybuch-PDF (2,99€). Gemeinsamer Launch spart Implementierungsaufwand.

---

### P3-4: Druckvorlagen pro Motto (Ausweise, Urkunden, Masken)

**Idee:**
Jedes Motto braucht druckbare Vorlagen für die Wow-Variante. Beispiele:
- Dino: Forscherausweis + Paläontologen-Urkunde
- Piraten: Kapitänspatent + Schatzkarte-Blanko
- Detektiv: Detektivausweis + Geheimdienstakte
- Einhorn: Zauberdiplom + Regenbogen-Pass
- Feuerwehr: Dienstausweis + Einsatzbericht

Format: HTML-Seite mit Drucken-Button, 4 Stück pro A4. Blanko-Felder zum Ausfüllen.
Wird in der Wow-Variante der jeweiligen Motto×Altersgruppe-Seite verlinkt.

**Aufwand:** ~30 Min. pro Motto
**Voraussetzung:** Content-Seiten fertig, dann die Vorlagen als Ergänzung.
**Start mit:** Top-5-Mottos (Dino, Piraten, Einhorn, Feuerwehr, Detektiv)
