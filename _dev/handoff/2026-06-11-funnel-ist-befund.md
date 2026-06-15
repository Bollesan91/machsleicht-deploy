# Funnel-IST-Befund + Repair-Plan — 11.06.2026

> Code-verifizierter Ist-Zustand des Kindergeburtstag-Funnels. Gegenstück zu `FUNNEL-KONZEPT.md` (das = SOLL/Konzept, nie gebaut). Dieses Doc = was wirklich live läuft + der beschlossene Repair.
> **Löschen:** wenn der Repair (unten) durch ist und in SESSION-NOTES/AUDIT kondensiert.

## Auslöser
Bolle: „es ist immer noch so viel unlogisch und doppelt im Funnel" → „man füllt auf dem Wizard Einladung aus, lädt Foto hoch, und muss das bei Einladung-Erstellen wieder machen". Einladungsspiele zurückgestellt.

## Der Funnel, wie er live ist
`Homepage → /kindergeburtstag (Wizard 6 Stages) → Partyseite (party.machsleicht.de) → Gast → ?ref-Loop`
Stages: 1 Motto · 2 Alter **+ komplette Eckdaten inline** · 3 Plan (Aha) · 4 Einladung · 5 Partyseite · 6 Fertig

## Befunde (code-verifiziert, mit Zeilen in kindergeburtstag.html)

### 🔴 SMOKING GUN: Foto wird nirgends echt benutzt
- Wizard Stage 4 Upload → `state.invite.photo` (Z.2171), füttert **nur lokale Vorschau**. **Kein Crop** (nur `readAsDataURL`).
- `activatePartyseite`-Payload (Z.2267–2272) sendet **kein Foto** → Partyseite kriegt es nie.
- Handoff `/einladung/erstellen?source=cockpit` (Z.820) überträgt **nur** `?source=cockpit`; das Tool liest aus localStorage nur **Name+Motto** (einladung/erstellen Z.456), hat **eigenes** Foto-Feld (Z.229, **mit** Crop `_cropX/Y/Scale`, CROP_SZ=120). → Foto + Datum/Zeit/Ort/WhatsApp **komplett neu eingeben**.

### 🔴 A — Doppelte Daten-Eingabe
- A1: Zwei komplette Eckdaten-UIs: **Inline** (`iq*`, Stage 2, Z.693–727) + **Drawer** (`q*`, 5-Step, Z.1108–1155). Sync nur einseitig (Inline→Drawer Z.698); Drawer→Inline fehlt → Desync. `liveUpdateName` liest nur `qName` (Z.1984), schreibt nie `iqName`. `resumeWork` füllt `iq*` nicht aus State.
- A2: Namensräume `iq*`/`q*`/`ps*` + 4. beim externen Tool.

### 🔴 B — Doppelte Verschick-Artefakte (Kern)
- B1: Stage 4 „Einladung" + Stage 5 „Partyseite" = zwei teilbare Dinge nacheinander (Z.817 vs 891).
- B2: 4 Verschick-Wege auf Stage 4 (Z.820–824): Einladung-erstellen, Text-WA, Text-Email, Text-kopieren.
- B3: Handoff verlässt Wizard → externes Tool, baut `/e/`-Link ohne RSVP-Verbindung.
- B4: `/e/`-Einladung ist Teilmenge der Partyseite (die das Spiel als iframe Z.1504 + RSVP + Wunschliste + Adress-Gating schon hat).

### 🟠 C — Tote Fake-Buttons (Stage 6, UWG)
- C1 „PDF runterladen" → showFlash „kommt im nächsten Update" (Z.953).
- C2 „Komplettpaket €14,90" → showFlash „in Vorbereitung" (Z.960). Einzige Monetarisierung, nicht funktional.

### 🟡 D — Flow/Benennung
- D1: Stage 2 heißt „Alter", enthält aber das ganze Eckdaten-Formular → Aha hinter Vollformular.
- D2: „Einladung"/„Partyseite" = derselbe Job, als zwei Schritte.

### 🟢 Schon gut
- Gast→Host-Loop `?ref=` existiert (Worker Z.1578) — Konzept hielt es für fehlend.
- Adress-Gating (Reveal nach Zusage). Partyseite-Reihenfolge: Titel → Spiel (Z.1504) → RSVP (Z.1522) → Wunschliste → Gästeliste.

## Warum „hat Helfer-v3 das gebaut?" — Nein.
Helfer-v3 = Unit-Review (prüft Einzel-Output isoliert), kein System-Architektur-Review. Jedes Teil bestand seinen Einzel-Review, weil jedes für sich funktioniert. Der Fehler liegt **zwischen** den Teilen (3 Tools aus 3 Phasen: /einladung/erstellen zuerst, dann Cockpit-Wizard mit eigenem Mini-Editor, dann Partyseite). FUNNEL-KONZEPT.md v3 hat es **korrekt diagnostiziert** (E1), wurde aber nie gebaut. Lücke: kein End-to-End-Funnel-Durchlauf-Review.

## Entscheidung (Bolle, 11.06.)
**NICHT E1-Literal (eine URL), sondern: ein Datensatz → die Partyseite ist das eine teilbare Artefakt.** Die Partyseite IST schon Einladung+Hub (Spiel oben, RSVP/Wunschliste unten). Der „zweite Link" (`/e/`) ist ein Phantom aus dem Handoff. Bolle priorisiert „ein Link, kein Jonglieren" über Blast-/Hub-Flächen-Trennung (Adresse eh gegated).

## Repair-Sequenz (alles client-seitig — Worker akzeptiert `photoRound` bereits, Z.333)
1. **Foto-Crop** aus einladung/erstellen in Wizard portieren; `activatePartyseite`-Payload + `photoRound` (gecropptes base64) → erscheint im Spiel der Partyseite.
2. **Handoff-Button raus** (Z.820); Text-Share zum Fallback degradieren.
3. **Stage 4+5 mergen** → „Einladung & Gästeliste", ein Output, ein Link.
4. **Tote Stage-6-Buttons** (C1/C2) ehrlich machen/entfernen.
5. **End-to-End-Funnel-Review** (Helfer-v3 ganzer-Weg, nicht Unit) + Live-Test → dann erst main.

`/einladung/erstellen` + SEO-`/einladung/*` bleiben als eigenständige Direkt-Einstiegstür (forken den Planer nicht mehr).
