# machsleicht.de — Site Architecture

**Stand:** 09.04.2026
**Typ:** Target Architecture v1 mit Ist-Abweichungen
**Regel:** Dieses Dokument beschreibt das Zielbild UND den aktuellen Stand. Abweichungen sind explizit markiert.

---

## Rollenmodell

Jede URL hat genau EINE Rolle. Keine Seite versucht mehrere Rollen gleichzeitig zu erfüllen.

---

### A. Platform Home

| URL | Rolle | Status |
|-----|-------|--------|
| `/` | Marken- und Orchestrierungsseite | ✅ Live |

**Dominant:** Kindergeburtstag + Schatzsuche — die zwei stärksten Produkte.
**Sekundär:** Weitere Tools als kleine Kacheln darunter (Einladung, Kreuzworträtsel, Spielkarten).
**Leise:** Neben-Hubs (Einschulung, Baby) findbar aber nicht prominent.
**Nicht auf der Startseite:** Geplante/nicht-live Produkte (Halloween, Ostern, Fasching, St. Martin).

**Primärer CTA:** "Kindergeburtstag planen" (Orange, groß).
**Sekundärer CTA:** "Schatzsuche erstellen" (Outline).

---

### B. Core Hubs (höchster Intent)

| URL | Rolle | Status |
|-----|-------|--------|
| `/kindergeburtstag` | Planer-Tool. Tool-first, SEO-Content unter dem Tool. | ✅ Live |
| `/schatzsuche` | Schatzsuche-Builder. | ⚠️ Zielbild: kanonischer Hub. Aktuell: Redirect auf Tool im Planer. Haupt-SEO-Landingpage derzeit `/schatzsuche-kindergeburtstag`. Theme-Seiten unter `/schatzsuche/{theme}` existieren. |
| `/einladung/erstellen` | Einladungskarten-Tool. | ✅ Live |

**Regel:** Jeder Core Hub ist ein Tool. Der Besucher landet dort und ist sofort im Tool. Kein Marketing-Scroll vor dem Tool. SEO-Content sitzt UNTER dem Tool in eigenem Container.

**Abweichung Schatzsuche:** Die URL-Struktur ist noch nicht final bereinigt. `/schatzsuche` ist aktuell ein Redirect, `/schatzsuche-kindergeburtstag` ist die SEO-Hauptseite. Ziel: `/schatzsuche` wird der kanonische Hub, `/schatzsuche-kindergeburtstag` wird 301-Redirect.

---

### C. SEO Entry Pages (Traffic → Core Hub)

| URL-Pattern | Beispiele | Rolle |
|-------------|-----------|-------|
| `/kindergeburtstag/{motto}` | `/kindergeburtstag/piraten`, `/kindergeburtstag/dino` | Motto-Landingpage → CTA in Planer |
| `/kindergeburtstag/{motto}-{altersgruppe}` | `/kindergeburtstag/piraten-6-8-jahre` | Longtail → CTA in Planer |
| `/kindergeburtstag/{motto}-{alter}` | `/kindergeburtstag/piraten-6-jahre` | Einzel-Alter-Longtail |
| `/schatzsuche/{theme}` | `/schatzsuche/piraten`, `/schatzsuche/dino` | Theme-Page → CTA in Builder |
| `/einladung/{motto}` | `/einladung/dino`, `/einladung/einhorn` | Motto-Einladung → CTA in Tool |

**Qualitätsgate:** Jede SEO Entry Page muss mindestens einen klaren Unique-Value-Punkt haben, der nicht Template-Füllung ist. Seiten die das nicht erfüllen, werden konsolidiert oder gelöscht.

**Konsolidierungs-Ziel (mittelfristig):**
Die Einzel-Alter-Seiten (`piraten-3-jahre`, `piraten-4-jahre`, ...) sollen mittelfristig als 301-Redirects auf die Altersgruppen-Seiten (`piraten-3-5-jahre`, `piraten-6-8-jahre`, `piraten-9-12-jahre`) zusammengeführt werden. Das halbiert die Seitenanzahl (~170 → ~85) und verdoppelt den Content pro URL. Der Planer arbeitet intern bereits mit diesen drei Altersgruppen.

**Risiko:** ~170 Motto-Alter-Seiten mit ähnlichem Template-Pattern. Google kann programmatische Seiten abstrafen wenn der Nutzwert pro URL nicht eigenständig ist. Qualitäts-Audit steht auf dem Backlog.

---

### D. Editorial / Funnel Content

| URL-Pattern | Beispiele | Rolle |
|-------------|-----------|-------|
| Ratgeber-Artikel | `/kindergeburtstag-spiele-drinnen`, `/kindergeburtstag-kosten`, `/kindergeburtstag-essen` | Suchintent abfangen → Funnel ins Tool |
| Checklisten | `/kindergeburtstag-checkliste`, `/kita-start-checkliste` | Standalone nützlich → CTA am Ende |
| How-to-Content | `/schnitzeljagd-aufgaben`, `/schnitzeljagd-draussen` | Themen-Tiefe → Funnel in Builder |
| Ratgeber-Hub | `/ratgeber` | Übersichtsseite für Franchise-Guides |
| Franchise-Guides | `/ratgeber/minecraft-fuer-eltern`, `/ratgeber/paw-patrol-fuer-eltern` | Eltern-Info → Funnel in Motto-Planer |

**Regel:** Jeder Ratgeber-Artikel hat einen klaren Funnel-CTA ins passende Tool. Kein Artikel existiert als isoliertes Content-Stück.

**Offener Punkt:** Die Franchise-Guides (`/ratgeber/...`) brauchen eine Entscheidung: Funneln sie in den Planer ("Minecraft-Geburtstag planen → Planer starten") oder sind sie eigenständige Info-Seiten die über Affiliate verdienen? Aktuell: unklar.

---

### E. Secondary Hubs (eigenständig, aber nicht im Hauptfokus)

| URL | Rolle | Status |
|-----|-------|--------|
| `/baby` | Themen-Hub: Erstausstattung, Kliniktasche, Wochenbett, Gender Reveal | ✅ Live |
| `/einschulung` | Planer: Schultüte, Feier, Checkliste | ✅ Live |

**Warum separat von Utilities:** `/baby` ist ein echter Themen-Hub mit mehreren Unterproblemen. Das ist eine andere Gewichtsklasse als ein einzelnes Utility-Tool.

**Strategische Entscheidung:** Einschulung und Baby bleiben live und findbar, werden aber auf der Startseite nicht prominent beworben bis Kindergeburtstag als klarer Winner steht. Langfristig eigene Einstiegspunkte mit eigenem SEO-Kanal.

---

### F. Utilities (kleine Zusatztools)

| URL | Rolle | Status |
|-----|-------|--------|
| `/kreuzwortraetsel` | Generator: eigenes Rätsel mit Lösungswort | ✅ Live |
| `/spielkarten` | Generator: individuelle Spielkarten | ✅ Live |

**Unterschied zu Core Hubs:** Utilities lösen ein kleines, spezifisches Problem. Sie haben kein eigenes Ökosystem aus Unter-Seiten, Mottos oder Ratgebern.

**Upgrade-Pfad:** Kreuzworträtsel wird mittelfristig Premium-Upgrade bekommen (KI generiert Inhalte → Rätsel nach Maß).

---

### G. Output / Experience Layer

| URL | Rolle | Status |
|-----|-------|--------|
| `party.machsleicht.de/{id}` | WhatsApp-Partyseite (Gäste-Ansicht, Editor, RSVP) | 🔜 Worker gebaut, Deploy pending |
| `party.machsleicht.de` | Ersteller-Flow | 🔜 Worker gebaut, Deploy pending |

**Warum separater Layer:** Die Partyseite ist kein SEO-Hub und kein klassischer Funnel-Einstieg. Sie ist eine Share-/Experience-Oberfläche die nach der Planung entsteht. Nutzer kommen über WhatsApp-Links, nicht über Google.

**Warum Subdomain:** Technisch bedingt (Cloudflare Worker braucht eigene Domain). SEO-Impact: keiner (Seiten sind noindex). Branding-Impact: minimal (Eltern sehen "party.machsleicht.de" im WhatsApp-Chat → Markenberührung).

**Bewusster Trade-off:** Für Link-Equity wäre `/partyseite` besser. Geht aber nicht mit Worker-Architektur ohne Edge-Function-Workaround. Subdomain ist der pragmatische Weg.

---

### H. Trust / Legal

| URL | Rolle |
|-----|-------|
| `/impressum` | Pflichtseite |
| `/datenschutz` | Pflichtseite |
| `/transparenz` | Geschäftsmodell-Erklärung |

---

## Traffic-Fluss

```
Google-Suche
    ↓
SEO Entry Pages (C) ──→ Core Hubs (B) ──→ Output Layer (G)
    ↓                        ↓
Editorial (D) ───────→ Core Hubs (B)
    ↓
Secondary Hubs (E)
    ↓
Utilities (F)

WhatsApp-Share
    ↓
Output Layer (G) ──→ Platform Home (A) [via Footer-Link]
    ↓
8 Familien sehen machsleicht → virale Akquise
```

**Regel:** Traffic fließt immer Richtung Core Hubs. Nie andersrum. Jede Seite hat genau einen primären CTA der nach oben im Funnel zeigt.

---

## Bekannte Abweichungen (Ist vs. Ziel)

| Thema | Ist-Stand | Zielbild | Prio |
|-------|-----------|----------|------|
| Schatzsuche-Routing | `/schatzsuche` = Redirect, `/schatzsuche-kindergeburtstag` = Hauptseite | `/schatzsuche` = kanonischer Hub | Mittel |
| Einzel-Alter-Seiten | ~170 URLs (`piraten-3-jahre` etc.) | Konsolidierung auf ~85 Altersgruppen-URLs | Niedrig (großer Eingriff) |
| Partyseite | Worker gebaut, nicht deployed | `party.machsleicht.de` live | Hoch |
| Ratgeber-Funnel | Franchise-Guides ohne klaren CTA | Jeder Guide funnelt in Planer oder verdient via Affiliate | Mittel |
| Startseite CTA-Hierarchie | 8 Produkte sichtbar | Kindergeburtstag dominant, Rest gestaffelt | ✅ Umgesetzt (09.04.2026) |
| Motto-Zahlen-Konsistenz | Teilweise 14/17/20 auf verschiedenen Seiten | Eine Zahl, überall gleich | Hoch |

---

## Entscheidungen die noch offen sind

1. **Franchise-Guides:** Funnel in Planer oder eigenständige Affiliate-Seiten?
2. **Altersseiten-Konsolidierung:** Wann und wie? 301-Redirects oder Canonical Tags?
3. **Einschulung:** Bleibt Secondary Hub oder wird perspektivisch eigener Core Hub mit eigenem SEO-Kanal?
4. **Standalone /wunschliste:** Eigene SEO-Seite oder bleibt Wunschliste nur in der Partyseite integriert?

---

*Dieses Dokument wird bei jedem größeren Architektur-Eingriff aktualisiert.*
