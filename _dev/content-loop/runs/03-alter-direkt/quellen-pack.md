# Quellen-Pack — Stream 3: Alter-Direkt-Pages

**Rolle**: Chat A (Writer) fuer machsleicht.de.

**Mission**: Pro Alter eine komplette "Kindergeburtstag-Anleitung-Page" — Mottos, Spiele, Essen, Deko, Zeitplan, Mitgebsel in einer Page, altersgerecht.

**URL-Schema**: `/kindergeburtstag-<X>-jahre/` — z.B. `/kindergeburtstag-4-jahre/`

**Output-Format**: 1 Page pro Alter, ~2000-2500 Woerter, Markdown mit YAML-Front-Matter.

**Wichtig — Abgrenzung zu Stream 2**: Stream 2 = "Spiele-Liste fuer X-Jaehrige" (Spiele-Fokus). Stream 3 = "kompletter Geburtstag fuer X-Jaehrige" (Gesamt-Plan: Spiele + Essen + Deko + Zeitplan). Nicht duplizieren.

---

## Tonalitaet & Voice

Identisch zu Stream 1/2. Hier ergaenzend:

**Gesamt-Plan-Perspektive**: Du schreibst fuer Eltern, die nicht nur ein Spiel suchen, sondern: "Wie organisiere ich den ganzen Tag fuer einen X-jaehrigen?". Heisst: Tagesablauf, Energie-Kurve, Mittagessen-Frage, Mitgebsel-Tueten — alles muss rein, aber nicht zu detailliert (Detail-Pages fuer Spiele etc. linken wir verlinkend).

---

## Page-Struktur (2000-2500 Woerter)

### 1. H1 + Intro (~120 Woerter)
- "Kindergeburtstag fuer X-Jaehrige planen"
- Was in dem Alter besonders ist (1-2 Saetze)
- Was du im Artikel findest (Inhaltsverzeichnis-artige Aufzaehlung)

### 2. "X-Jaehrige verstehen: Was Eltern wissen muessen" (~200 Woerter)
- Entwicklungsstufe: Motorik, Konzentration, Wettkampf-Toleranz, Sozial-Verhalten
- Implikationen: optimale Dauer (z.B. 4-jaehrige: 2-2.5h, 9-jaehrige: 3-4h), Gruppengroesse, Eltern-Begleitung
- Klassische Stolpersteine in dem Alter (z.B. 4-jaehrige: Streit ueber Mitgebsel-Tueten; 10-jaehrige: "ist zu kindisch")

### 3. "Passende Mottos fuer X-Jaehrige" (~250 Woerter)
- 4-6 Mottos, pro Motto 2-3 Saetze warum es passt
- **Internal Link** zur Motto-Hub-Page: `<a href="/kindergeburtstag/piraten">Piraten-Geburtstag</a>`
- Auswahl aus den 7 elite Mottos: detektiv, dino, einhorn, feuerwehr, piraten, safari, weltraum + generische (baustelle, pferde, ritter, zirkus, meerjungfrau)

### 4. "Spiele-Empfehlung mit Zeitplan" (~400 Woerter)
- 5-8 Spiele kompakt vorgestellt
- Spiele in sinnvoller Reihenfolge mit Zeit-Slots
- **Internal Links** zu Stream-1-Einzel-Spiel-Pages: `<a href="/spiel/topfschlagen/">Topfschlagen</a>`
- **Internal Link** zu Stream-2-Hub: `<a href="/kindergeburtstag-spiele-<X>-jahre/">Mehr Spiele fuer X-Jaehrige</a>`

### 5. "Essen und Kuchen fuer X-Jaehrige" (~250 Woerter)
- Was X-jaehrige wirklich essen (Realismus: Pizza-Schnecken vs. Gemuese-Schiff)
- Allergie-Frage (kurz angerissen)
- Kuchen-Idee: 1-2 konkrete Vorschlaege
- Snack-Liste fuer den Nachmittag
- **Internal Link**: `<a href="/kindergeburtstag-essen">Mehr Essens-Ideen</a>`

### 6. "Deko mit wenig Aufwand" (~150 Woerter)
- 3-4 konkrete Deko-Tipps fuer das Alter
- Was Aufwand lohnt vs. was Kinder eh nicht sehen
- DIY oder gekauft — pragmatischer Mittelweg

### 7. "Mitgebsel-Ideen fuer X-Jaehrige" (~150 Woerter)
- 3-5 konkrete Mitgebsel-Vorschlaege passend zum Alter
- Preis-Realismus (2-5€ pro Tuete typischer)
- Was vermeiden (z.B. fuer 4-jaehrige: Kleinteile = Erstickungsgefahr)
- **Internal Link**: `<a href="/kindergeburtstag-mitgebsel">Mitgebsel-Hub</a>`

### 8. "Zeitplan-Beispiel" (Tabelle oder Bullet, ~150 Woerter)
- Konkreter Stundenplan z.B. 14:00-17:00
- Energie-Kurve sichtbar (Ankunft Ruhe → Spiele aktiv → Essen Ruhe → Spiel-Hoehepunkt → Verabschiedung)

### 9. "Haeufige Pannen und wie du sie vermeidest" (~200 Woerter)
- 3-5 konkrete Pannen-Szenarien fuer das Alter
- Pro Panne: Praevention + Notfall-Plan

### 10. FAQ (7-10 Fragen, FAQPage-Schema)
Beispiele: "Wie viele Gaeste fuer X-Jaehrige?", "Wie lange soll der Geburtstag dauern?", "Brauche ich Hilfe von anderen Eltern?", "Was bei schlechtem Wetter?", "Wie viel kostet ein typischer X-Jaehriger-Geburtstag?", "Geschwister mit einladen oder nicht?"

### 11. CTA-Card
- **Haupt-CTA**: "Plane den kompletten Tag in 5 Minuten" → `/kindergeburtstag` (Tool)
- **Sekundaer**: "Checkliste runterladen" → `/kindergeburtstag-checkliste`

---

## Schema-Pattern

```yaml
alter_jahre: 4
dauer_empfohlen_min: 120
dauer_empfohlen_max: 150
gaeste_min: 4
gaeste_max: 8
mottos_passend: ["piraten", "einhorn", "feuerwehr", "safari"]
faq:
  - frage: "Wie viele Gaeste fuer einen 4-jaehrigen Kindergeburtstag?"
    antwort: "..."
```

Pilot rendert `Article` + `FAQPage` + `BreadcrumbList`.

---

## Topic-Liste (7 Pages)

| # | Alter | Slug | Suchvolumen (DE) | Saison? | Priorisierung |
|---|---|---|---|---|---|
| 1 | 4 Jahre | `/kindergeburtstag-4-jahre/` | sehr hoch | nein | Block 1 |
| 2 | 8 Jahre | `/kindergeburtstag-8-jahre/` | hoch | nein | Block 1 |
| 3 | 3 Jahre | `/kindergeburtstag-3-jahre/` | hoch | nein | Block 1 |
| 4 | 9 Jahre | `/kindergeburtstag-9-jahre/` | mittel-hoch | nein | Block 2 |
| 5 | 10 Jahre | `/kindergeburtstag-10-jahre/` | mittel-hoch | nein | Block 2 |
| 6 | 11 Jahre | `/kindergeburtstag-11-jahre/` | mittel | nein | Block 3 |
| 7 | 12 Jahre | `/kindergeburtstag-12-jahre/` | mittel | nein | Block 3 |

**Hinweis**: 5/6/7 Jahre haben bereits Pages (`kindergeburtstag-5-jahre.html` etc.) — diese sind tracked, werden nicht in diesem Stream produziert. Pilot prueft am Sprint-Ende, ob die bestehenden Pages konsistent mit den neuen sind (Internal-Linking, Cross-Sell).

**Arbeits-Reihenfolge**: 1 (4 Jahre) → 2 (8 Jahre) → 3 (3 Jahre) → 4 → 5 → 6 → 7. Start mit "4 Jahre" weil Suchvolumen Top + man die Voice an einem mittleren Alter eichen kann (nicht das aelteste/juengste Extrem).

---

## Konkurrenz-Snapshot

Top-10 fuer "kindergeburtstag 4 jahre":
- familie.de mit Generic-Page
- kidsgo.de
- mamablogs mit emotionaler Einleitung
- mytoys.de und otto.de mit Produkt-Push

**Niemand bietet**:
- Entwicklungsstufen-Realismus
- Konkreten Zeitplan mit Energie-Kurve
- "Pannen-Vermeidung pro Alter"
- Hub-and-Spoke-Vernetzung (zu Spiele-/Essen-/Mitgebsel-Sub-Pages)

→ **Unsere Edge**: Komplette Anleitung + Tool-Cross-Sell.

---

## Akzeptanz-Kriterien (Score ≥ 85)

Gleiche Rubrik wie Stream 1/2 (siehe `01-spiele-einzel/quellen-pack.md` Sektion 8), plus:

- **Veto bei Alters-Fakten-Fehler** = -30 + Re-Write
- **Veto bei Zeit-Plan-Unrealismus** (z.B. fuer 4-jaehrige 5-Stunden-Tag empfehlen) = -25
- **Veto bei Sub-Page-Link-Loch** (mindestens 5 Internal Links auf Stream-1/2-Pages + Hub-Pages) = -10
- **Veto bei "Mama-Blog-Drift"** (emotional-fluffige Einleitung statt Eltern-pragmatisch) = -15

---

## Workflow-Erinnerung

1. Lies dieses Pack + Stream 1+2 Quellen-Packs (fuer Voice + Verlinkung-Konsistenz)
2. Start: Topic 1 = "Kindergeburtstag fuer 4-Jaehrige planen"
3. v1 schreiben, abschicken, Pilot uebernimmt Pipeline-Routing
4. Erwarte Review + Adversarial, dann v4-Final
5. Naechstes Topic startet automatisch nach Akzeptanz

**Wichtig — Internal-Links validieren**:
Pilot prueft am Ende, ob alle in deinem Output erwaehnten Internal-Links zu existierenden Pages fuehren. Wenn z.B. `/spiel/topfschlagen/` zum Zeitpunkt deines Schreibens noch nicht existiert (weil Stream 1 noch nicht durch ist), trotzdem den Link einbauen — wir verlinken vorwaerts. Pilot validiert beim finalen Internal-Linking-Sweep.
