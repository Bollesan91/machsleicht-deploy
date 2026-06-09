# FUNNEL-KONZEPT — machsleicht.de Kindergeburtstag

> **Version 3** · Stand: 2026-06-09 · Funnel-Experten-Team (Helfer-v3-Adaption): 4 Linsen (Conversion, Growth, Monetarisierung, Behavioral-UX) + Chef-Skeptiker, je frischer claude.ai/Opus-4.8-Hoch-Tab, target-blind, 3 Runden (Design → Cross-Critique → Code-Schärfung). v3 schließt die 4 Self-Audit-Lücken aus v2: UX-Runde-2 integriert · 3 %-Affiliate-Zahl korrigiert · Wow-Latte ergänzt · E1 entschieden.
> Zweck: Living-Truth, von der aus gebaut wird. **Noch nichts davon ist implementiert.**
> Selbst-Score v3 (Konzept-Qualität, ohne „0-User"-Abzug): **~9/10** (Rest-Schwächen §8).

---

## 0. TL;DR

0 User → Funnel-Optimierung ist „Division durch Null". Einzige Frage jetzt:
> **Macht ein echter Elternteil den Gratis-Plan fertig und teilt ihn freiwillig?**

Reihenfolge heilig: **erst Kern (Aha + echter teilbarer Link + „Gast wird Host"-Loop)**, dann Retention, dann Geld. Geld wandert weg vom Aha-Moment, hin zur Aktivierung — genau dahin zeigt auch die Margen-Korrektur.

---

## 1. Grundsatz-Entscheidungen

### E1 — Die Partyseite IST die Einladung *(Entscheidung: Option D — entkoppeln jetzt, mergen nach Daten)*
**Ziel-Architektur:** EIN teilbares Artefakt = die Partyseite (trägt Infos + RSVP + Wunschliste + Foto). Die statische `/e/<base64>`-Einladung wird Legacy/Fallback.
**Warum (UX-R2 liefert das stärkste Argument):** „Einladung verschicken" ist **Zwangsbedarf** (sonst kommt kein Gast) — „Partyseite mit RSVP/Wunschliste" ist eine **optionale** Verbesserung eines Problems, das der Elternteil im Setup-Moment noch nicht fühlt. Stehen beide nebeneinander, ist nach dem Verschicken des Textes der Job „Bescheid sagen" mental erledigt → die Partyseite fällt weg. **Lösung: die Partyseite MUSS die Versand-Mechanik sein**, nicht die Schwester daneben. Nur so trägt der Zwangsbedarf den optionalen Wert (RSVP/Wunschliste/Loop).
**Umsetzung — Option D (beschlossen, reversibel):** Phase 1 baut den Planer so, dass er die **Partyseite** erzeugt + sie ist das Geteilte. Das alte `/einladung/erstellen` + seine SEO-Seiten bleiben vorerst **unangetastet** daneben (wir routen den Planer nur nicht mehr dorthin). Nach Phase-1-Daten: formell ablösen (301, SEO-CTAs umhängen, Print-Karten migrieren).
**Mythos-Check:** „statische Einladung = datensparsamer" ist falsch — die base64-URL kodiert Name + **Telefon** + Adresse trivial dekodierbar (H1-Befund). Kein Argument fürs Behalten.

### E2 — Aha = Hypothese; Entscheidung: **durchbauen** (kein separater Wow-Test-Gate)
Bolle-Entscheidung: wir nehmen an, der personalisierte Plan ist Wow genug, und bauen Phase 1 in einem (kein 5-Eltern-Vortest). **Absicherung im Plan statt im Test → Wow-Latte (§4a).**

---

## 2. Vision & Geschäftsmodell

**Geld-Physik:** *Host zahlt, Gast trinkgeldet (Affiliate), nächstes Jahr zahlt wieder.*
- **Affiliate (Amazon):** Provision **kategorieabhängig & UNVERIFIZIERT** — eine Experten-Web-Recherche nannte ~3 % für Spielzeug, andere Quellen „bis zu 12 %" je Kategorie; exakte Spielzeug-Rate nur im eingeloggten PartnerNet-Vergütungskatalog. **Vor Affiliate-Entscheidungen selbst nachschlagen.** Strategisch unabhängig von der genauen Zahl: Affiliate = **variable Baseline auf Gratis-/viralem Traffic**, kein steuerbarer Motor.
- **Margen-Motor:** digitale Host-Produkte am Aktivierungs-Peak (personalisierte Schatzsuche/Rätsel 2,99/4,99 €, ~98 % Marge). Print nur als **PDF-Bündel** (kein Fulfillment).
- **LTV:** Retention via jährlichen Reminder + Geschwister (bekannte Mail, 0 € Akquise).
- **Freemium-Linie:** gratis = vollständiger Plan + Partyseite (muss begeistern). Bezahlt = spielbare Schatzsuche + Print-PDF. Geld-Ask NUR nach Gratis-Wertlieferung (nicht auf der Vorschau).

---

## 3. Kern-Erkenntnisse
1. **3 Tools = kein Funnel** (Fork). → E1.
2. **Loop OFFEN** — „Gast wird Host" existiert nicht im Code. K ≈ 0,1.
3. **K > 1 unmöglich** (×0,17-Jahres-Timing). → Geburtsmonat capturen + jährlich reaktivieren + **Cluster-Sättigung** (Kita/Klasse = 100 % Future-Hosts).
4. **Host-Share ≠ viral** (= Reichweite). K-Event = „Gast → neuer Host". Ohne **Ref-Token** blind.
5. **Kaltstart = Seeding** (Kitas), nicht SEO (6–18 Mon).
6. **Zwei Peaks NICHT verwechseln** (UX-R2): Delight-Peak (Aha, niedriges Commitment, Vertrauensaufbau) ≠ Kaufintent-Peak (Aktivierung, „mach ich richtig schön"). Geld gehört an den Kaufintent-Peak, nie an den Delight-Peak.

---

## 4. Perfekter Funnel-Flow (Soll, unter E1)

| # | Schritt | Ebene / Kern |
|---|---------|--------------|
| 0 | Akquise: SEO-Satellit + (Pre-Launch) **Seeding** → Planer | Hero-CTA bleibt |
| 1 | **3-Feld-Setup: Motto + Alter + Name** | minimaler Time-to-Aha (mobil!). Datum/Gäste/Ort kommen erst in Schritt 3 |
| 2 | **Sofort personalisierter Plan** „Mias Piraten-Geburtstag" (Zeiten default 14:00–16:30, editierbar) | **DELIGHT-Peak** (Wow-Latte §4a). **Kein Geld hier.** |
| 3 | **Aktivierung**: Eckdaten (Datum/Ort/Gäste) → EINE Partyseite (= Einladung) erzeugt → **wa.me-Share des echten Links** | **KAUFINTENT-Peak**: hier Edit-Link-Sicherung + (später) Upsell. Share-Text+OG+Ref-Token |
| 4 | **Gäste** auf der Partyseite: RSVP → Wunsch-Claim → **„Selbst so eine Seite erstellen" (`?ref=`)** | **der virale Loop** (Gast→Host) — der Slot gehört DEM, nicht der Geburtsmonat-DB |
| 5 | **Takeaway/Persistenz**: Magic-Link/Plan speichern + Print-PDF | Retention der bereits Aktivierten |
| 6 | **~6 Wochen vor Geburtstag des Gast-Kindes**: Reminder (.ics + Mail) | schwächere Retention (nach dem Loop) |

### 4a. Wow-Latte — was den Gratis-Plan zum Wow macht (de-risked E2 ohne User-Test)
Der Plan ist nur dann ein Aha, wenn er sich nach **DIESEM Kind** anfühlt, nicht nach Mail-Merge. Pflicht-Kriterien (im Build prüfen):
1. **Name + Motto überall** sichtbar — nie „Lukas"/Default.
2. **Echte Uhrzeiten** (default 14:00–16:30, in Schritt 3 aus Start/Ende skaliert).
3. **Motto-spezifische** Spiel-/Stations-Namen (z.B. „Krähennest"), nicht generisch „Station 1".
4. **Konkrete Kosten pro Kind** (Zahl, nicht Spanne).
5. **Ein Überraschungs-Element** — z.B. die Schatzsuche-Karte/Stationen-Vorschau als sichtbarer „oh, das ist ja schon fertig"-Moment.
Trifft der Plan 1–5 → plausibel Wow. Trifft er nur 1 → Mail-Merge, dann Plan inhaltlich stärken ODER Schatzsuche-Teaser gratis.

---

## 5. Aufgelöste Konflikte

| Streitpunkt | Auflösung |
|---|---|
| **Upsell-Timing** | NICHT Schritt 2 (Delight-Peak; Reaktanz vergiftet Gratis-Wahrnehmung + ankert gegen Print). → **Schritt 3/5 (Kaufintent-Peak), nach Share**, als Bundle 19,90 €. |
| **Default-Wunschliste** | KEIN Auto-Fill (Dark Pattern §5a-UWG, vergiftet Cluster). → **Default-SUGGEST**: leere Liste + Ein-Tap-Chips „Vorschläge für Piraten hinzufügen", Host bestätigt aktiv (überträgt Autorschaft Tool→Host). |
| **Gast-Capture (Geburtsmonat)** | besetzt den wertvollsten Slot (warmer Future-Host) mit einer kalten DB-Zeile. → **Slot gehört dem „Gast→Host"-Loop**; Geburtsmonat nur optional/später + Consent + .ics. |
| **Text-only-Share** | additiv ergänzt war falsch — **entfernen/degradieren**: geteilt werden darf nur der echte Link. |
| **Fake-Sterne + Notfall-`alert()`** | §5/Omnibus-UWG-Blocker → Phase 0 raus. `prompt()`/`alert()` = Friktion an kreativen/zahlungsnahen Stellen → vorziehen (separat von Fake-Sterne). |
| **Einladung ↔ Partyseite / Cross-Origin** | → E1 (ein Artefakt); Restprefill via POST-Body, nicht localStorage. |

---

## 6. Roadmap (aktivierungs-zuerst, UX-R2-Reihenfolge)

🟢 = Code-Fix (autonom, draft) · 🔵 = braucht Bolle

### PHASE 0 — Hygiene & Messung *(sofort, rechtlich Pflicht)*
- 🟢 Fake-5-Sterne raus (Z.671) · Notfall-`alert()` (Z.755) echt oder raus
- 🟢 **Aktivierungs-Metrik instrumentieren** (North Star, sonst blind): `plan_ready` (echter Name) → `invite_created` → `party_shared` (echter Link) → `rsvp_received`. Plus `loop_cta_click`, `party_created_ref`.

### PHASE 1 — Kern + Aktivierung beweisen
1. 🟢 **Aha-Bypass + Schritt-1-Trim**: `pickAge()`-`goStage(3)` raus; Schritt 1 nur **Motto+Alter+Name**; `name:'Lukas'` (Z.1321) → `''` + Ripple (Z.1865/1900/1924). Datum/Gäste/Ort nach Schritt 3.
2. 🟢 **Echter Share-Loop** (= das Aktivierungs-Ereignis): Aktivierung erzeugt die **Partyseite** (`/api/create` existiert), **wa.me-Share des echten `data.url`**, Text-only-Share entfernen, **`send-edit-link`-Wiring** (Token-Verlust-Fix reist HIER mit, nicht in Stage 6), Share-Text + Ref-Token.
3. 🔵 **OG-Image** (10 statische 1200×630 PNGs + `og:image` in `baseHead` — heute keins).
4. 🟢 **„Gast → Host"-CTA** auf der Gästeseite (`/?ref=<id>`) — **der eigentliche virale Loop, fehlte im alten Flow ganz**.
5. 🟢 **Stage-6-Persistenz**: Magic-Link + Partyseite verlinken (`renderDoneSummary` Z.2191), tote Print/PDF-Buttons raus.
→ DANN: vor 5–10 echte Eltern (durchbauen-Variante: parallel zum Bau, nicht als Gate).

### PHASE 2 — Retention
- 🟢 Host-Mail + Consent-Opt-in (mit Magic-Link) → Reminder (nächstes Jahr + Geschwister) + .ics · Wunschliste Default-Suggest · `prompt()`/`alert()`-Ersatz

### PHASE 3 — Geld & Wachstum *(wenn Traffic da)*
- 🔵 Stripe · 🟢/🔵 Peak-Upsell Bundle 19,90 € (Schritt 3/5) · 🔵 Seeding (Kitas) · 🟢 Geburtsmonat-Capture optional · 🔵 Amazon erst bei Traffic (180-Tage-Regel) · 🔵 Cluster-Social-Proof

---

## 7. Offene Entscheidungen (Bolle)
1. **Worker-Deploy** (Fixes nicht live bis Cloudflare-Deploy)
2. **OG-Image-Assets** (10 Motto-PNGs)
3. **Payment-Rail** (Stripe, Phase 3)
4. **Seeding** (Kitas abklappern — Zeit)
5. **E1-Endschnitt-Zeitpunkt** (wann `/einladung/erstellen` ablösen — nach Phase-1-Daten)
6. **3 %-Affiliate selbst prüfen** (PartnerNet-Vergütungskatalog)

---

## 8. Ehrliche Rest-Schwächen (v3)
- **Alles Vor-Daten-Hypothese.** Schwellen (≥3/5, ≥⅓) sind gesetzte Startwerte.
- **Aha bleibt eine Wette** (E2: durchbauen) — die Wow-Latte (§4a) senkt das Risiko, ersetzt aber keinen echten Eltern-Test.
- **Affiliate-Rate unverifiziert** (s.o.).
- **Loop-Messung braucht Worker-seitige Events** (`party_viewed` Host-vs-Gast via `?edit`) — Cockpit sieht „angekommen" nicht.
- **E1 ist beschlossen, aber als Pfad (D), nicht vollzogen** — die Koexistenz zweier Einlade-Dinge besteht bis zum Endschnitt.

---

## 9. Anhang — code-verifizierte Phase-1-Tech-Specs (`draft`)

### A) Aha-Bypass + Schritt-1-Trim (Conversion R3 + UX R2)
- `pickAge(age)` (~Z.1524): letzte Zeile `goStage(3)` löschen (einziger Caller, `resumeWork()` nutzt `goStage(state.stage)` → Blast-Radius 0).
- Schritt 1 nur Motto+Alter+**Name**; Datum/Gäste/Ort/Endzeit → Schritt 3. Zeiten default 14:00–16:30.
- `name: 'Lukas'` **Z.1321** → `''`; Ripple: `qName` Z.1865, `state.name||'Lukas'` Z.1900, `iqName` Z.1924; Anzeige `state.name||'dein Kind'`.
- Mitnehmen: `resumeWork()` schreibt `iq*`-Inputs NICHT aus State zurück.

### B) Share-Loop / Aktivierung (Conversion R3 + UX R2)
- wa.me: `https://wa.me/?text=${encodeURIComponent(__inviteShareText + '\n\n👉 ' + data.url)}`. **Text-only-Share (Stage 4, ohne Link) entfernen/degradieren.**
- `send-edit-link`: `id=url.split('/').pop()`, `token=new URL(editUrl).searchParams.get('edit')`, `POST /api/party/${id}/send-edit-link {editToken:token, email}` — gehört in den Aktivierungs-/Share-Block (Stage 5), nicht Stage 6.
- `renderDoneSummary` (Z.2191): „aktiv ✓" → klickbarer `state.partyseite.url` + wa.me-Button.
- **Test-Falle:** `send-edit-link` Origin `^https://(www\.|party\.)?machsleicht\.de$`, `/api/create`-CORS nur machsleicht.de/localhost → Netlify-Preview failt; gegen `*.machsleicht.de`/localhost testen.

### C) Ref-Token + „Gast→Host" + OG (Growth R3)
- Ref = Quell-Party-ID: SET `guestPageFull` `<a href="/?ref=${party.id}" onclick="umami.track('loop_cta_click')">Selbst eine kostenlose Partyseite</a>` · READ `creatorPage`-IIFE `window._ref=(new URLSearchParams(location.search).get("ref")||"").trim()` + Body `ref:window._ref||""` · PERSIST `/api/create` `ref:/^[a-z0-9]{6,12}$/.test(body.ref||"")?body.ref:null`.
- Grenze: statische `/e/`-Einladung hat keine KV-ID → Loop-CTA auf der Partyseite treiben.
- OG: `baseHead` hat **kein** `og:image`; 10 statische PNGs, `og:title` party-spezifisch. WhatsApp: absolute HTTPS, <300 KB, aggressives Caching (vor Seeding testen).

### D) Messung (North Star)
`plan_ready` → `invite_created` → `party_shared` → `rsvp_received` (+ `loop_cta_click`, `party_created_ref`). **K ≈ `party_created_ref` / `party_shared`** (untere Schranke; KV `party.ref` = exakte Kante). „Angekommen" = Worker-seitiges `party_viewed` (Host vs. Gast via `?edit`).

---

## Methodik
Funnel-Experten-Team (Helfer-v3, keine Sub-Agents/WebFetch als Gate — nur claude.ai/Opus-4.8-Hoch via Chrome-MCP; eine Web-Recherche zur Affiliate-Rate war Faktencheck, kein Review). Chats: Conversion `13666881`, Growth `7ed2412b`, Monetarisierung `14987251`, UX `12924cbc`, Skeptiker `8b9b4d0a`. Alle 5 in 3 Runden, UX-R2 in v3 integriert.
