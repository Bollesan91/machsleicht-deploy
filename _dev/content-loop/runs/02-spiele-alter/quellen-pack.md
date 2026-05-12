# Quellen-Pack — Stream 2: Spiele × Alter

**Rolle**: Chat A (Writer) fuer machsleicht.de.

**Mission**: Pro Alter eine Best-of-Spiele-Sammlung, die strukturell tiefer ist als jede Konkurrenz-Liste — kuratierte Auswahl von 8-12 Spielen, jedes mit altersgerechter Anpassung und konkreter Anleitung.

**URL-Schema**: `/kindergeburtstag-spiele-<X>-jahre/` — z.B. `/kindergeburtstag-spiele-5-jahre/`

**Output-Format**: 1 Page pro Alter, ~1500-2000 Woerter, Markdown mit YAML-Front-Matter.

---

## Tonalitaet & Voice

Gleicher Brand wie Stream 1 — siehe `_dev/content-loop/runs/01-spiele-einzel/quellen-pack.md` Sektion 1. Wortverbote, Voice, Stil-Anker identisch. Hier ergaenzend:

**Alters-Realismus** als zentraler Stil-Anker. Eltern wollen wissen:
- "Was funktioniert mit 5-jaehrigen, was nicht?"
- "Mein Sohn ist 8 und langweilt sich bei Topfschlagen — was geht?"
- "10-jaehrige sind zu cool fuer Stille Post — gibt's was Aelteres?"

Du musst die Entwicklungsstufe kennen und ehrlich sagen, was im Alter UNNOETIG ist (nicht jedes Spiel passt zu jedem Alter — Mut zur Aussortierung).

---

## Page-Struktur (1500-2000 Woerter)

### 1. H1 + Intro (~100 Woerter)
- "Kindergeburtstag-Spiele fuer X-Jaehrige"
- Was in dem Alter funktioniert (Entwicklungsstufe: Motorik, Konzentration, Wettkampf-Empfindlichkeit, Lese-Status)
- Was du in diesem Artikel findest

### 2. "Was X-jaehrige bei Spielen brauchen" (~150 Woerter)
- 3-4 Saetze ueber das Alter (Motorik, Konzentration, Sozialverhalten)
- Konkrete Implikationen: Spieldauer, Erklaerungs-Tiefe, Schiedsrichter-Bedarf, Wettbewerb-Toleranz

### 3. "Die besten 8-12 Spiele" — Spiele-Liste
Pro Spiel (Block ~150-200 Woerter):

**[Spielname]**
- 1-2 Saetze warum es im Alter X passt
- Kompakt-Anleitung: Material, Ablauf (3-4 Saetze)
- Altersgerechte Anpassung: was anders ist als bei juengeren/aelteren
- **Internal Link** zur Einzel-Seite: `<a href="/spiel/<slug>/">Vollstaendige Anleitung: Topfschlagen</a>`

### 4. "Spiel-Reihenfolge fuer den Tag" (Zeitplan-Snippet)
- 3-5 Spiele in sinnvoller Reihenfolge (z.B. Ankuendigungs-Spiel → Aktivspiel → Ruhespiel → Hoehepunkt)
- Pro Spiel: Minutenzahl, Energie-Level

### 5. "Spiele, die du in diesem Alter VERMEIDEN solltest" (~150 Woerter)
- 2-3 Spiele, die NICHT passen, mit Begruendung
- Z.B. fuer 4-jaehrige: "Stille Post funktioniert noch nicht — Sprachfaehigkeit reicht meist nicht fuer 6+ Glieder"

### 6. "Material-Checkliste fuer alle Spiele" (Bullet-Liste)
- Konsolidierte Material-Liste fuer die empfohlenen Spiele
- Was du wirklich brauchst vs. was nur "nice-to-have" ist

### 7. "Was tun wenn ein Kind nicht mitmacht" (~100 Woerter)
- Konkrete Tipps (nicht: "rede mit ihm"), sondern: "biete Schiedsrichter-Rolle an", "Material-Helfer", "Foto-Beauftragter"

### 8. FAQ (5-7 Fragen, FAQPage-Schema)
- Z.B.: "Wie lange sollte ein X-jaehriger Kindergeburtstag dauern?", "Welche Spiele eignen sich drinnen vs. draussen?", "Brauche ich Preise fuer alle Kinder?"

### 9. CTA-Card
- "Plane den ganzen Tag" → `/kindergeburtstag`
- "Alle Spiele im Ueberblick" → `/kindergeburtstag-spiele/`

---

## Schema-Pattern (YAML im Front-Matter)

```yaml
alter_jahre: 5
spiele_liste:
  - name: "Topfschlagen"
    slug: "topfschlagen"
    dauer_min: 10
    bewegungslevel: "mittel"
    ort: ["drinnen", "draussen"]
  - name: "Sackhuepfen"
    slug: "sackhuepfen"
    dauer_min: 15
    bewegungslevel: "hoch"
    ort: ["draussen"]
  # ... 6-10 weitere
faq:
  - frage: "..."
    antwort: "..."
```

Pilot rendert `ItemList` (Spiele) + `FAQPage` + `BreadcrumbList`.

---

## Topic-Liste (10 Pages)

| # | Alter | Slug | Suchvolumen (DE) | Priorisierung |
|---|---|---|---|---|
| 1 | 5 Jahre | `/kindergeburtstag-spiele-5-jahre/` | sehr hoch | Block 1 |
| 2 | 6 Jahre | `/kindergeburtstag-spiele-6-jahre/` | sehr hoch | Block 1 |
| 3 | 7 Jahre | `/kindergeburtstag-spiele-7-jahre/` | hoch | Block 1 |
| 4 | 4 Jahre | `/kindergeburtstag-spiele-4-jahre/` | hoch | Block 1 |
| 5 | 8 Jahre | `/kindergeburtstag-spiele-8-jahre/` | hoch | Block 2 |
| 6 | 3 Jahre | `/kindergeburtstag-spiele-3-jahre/` | mittel | Block 2 |
| 7 | 9 Jahre | `/kindergeburtstag-spiele-9-jahre/` | mittel | Block 2 |
| 8 | 10 Jahre | `/kindergeburtstag-spiele-10-jahre/` | mittel | Block 3 |
| 9 | 11 Jahre | `/kindergeburtstag-spiele-11-jahre/` | niedrig-mittel | Block 3 |
| 10 | 12 Jahre | `/kindergeburtstag-spiele-12-jahre/` | niedrig-mittel | Block 3 |

**Arbeits-Reihenfolge**: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10. Start mit Alter 5 (vertraut, Mehrheit der Spiele anwendbar — gute Eichung der Voice).

**Hinweis Cross-Stream**: Stream 1 (Einzel-Spiele) sollte parallel laufen — Stream 2 verlinkt zu Stream-1-Pages. Wenn ein Einzel-Spiel-Link noch 404 ist, kein Veto, Pilot prueft Verlinkungen am Sprint-Ende.

---

## Konkurrenz-Snapshot

Top-10 Google fuer "kindergeburtstag spiele 5 jahre" sind:
- familie.de mit 15-Spiele-Liste, je 2 Saetze
- kidsgo.de Listicle
- Mama-Blogs (~5) mit emotionaler Einleitung + 3-5 Spielen
- 2 Affiliate-Shop-Seiten mit Produkt-Push

**Niemand bietet**:
- Entwicklungsstufen-Analyse pro Alter
- "Spiele die NICHT passen" (= Mut zur Aussortierung)
- Spiel-Reihenfolge-Empfehlung fuer den Tag
- Einzel-Spiel-Detail-Links (weil niemand sonst Detail-Pages hat)

→ **Unsere Edge**: Tiefe + Hub-and-Spoke-Vernetzung.

---

## Akzeptanz-Kriterien (Score ≥ 85)

Gleiche Rubrik wie Stream 1 (siehe `01-spiele-einzel/quellen-pack.md` Sektion 8), plus zusaetzliche Veto-Punkte:

- **Veto bei Alters-Fakten-Fehler** (z.B. "Stille Post funktioniert ab 3 Jahren" — falsch, ab ~6) = -30 + Re-Write
- **Veto wenn Spiele-Liste keine Aussortierung enthaelt** (Sektion 5 fehlt oder ist generisch) = -15
- **Veto wenn Einzel-Spiel-Links fehlen** (mindestens 5 der genannten Spiele MUESSEN auf Stream-1-Pages linken) = -10

---

## Workflow-Erinnerung

1. Lies dieses Pack + Stream-1-Pack (fuer Voice)
2. Start: Topic 1 = "Kindergeburtstag-Spiele fuer 5-Jaehrige"
3. v1 schreiben, abschicken, Pilot uebernimmt Pipeline-Routing
4. Erwarte Review + Adversarial, dann v4-Final
5. Naechstes Topic startet automatisch nach Akzeptanz
