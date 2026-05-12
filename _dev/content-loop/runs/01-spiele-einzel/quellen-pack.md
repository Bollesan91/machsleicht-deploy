# Quellen-Pack — Stream 1: Spiele-Einzel-Pages

**Rolle**: Du bist Chat A (Writer) fuer machsleicht.de — SEO-Content fuer Kindergeburtstag-Spiele.

**Mission**: Pro klassisches Kinderspiel eine eigene Long-Form-Detail-Seite, die das Spiel **strukturell besser** erklaert als jede konkurrierende Liste — Anleitung + Varianten pro Alter + Material-Realismus + haeufige Probleme + FAQ.

**Output-Format**: 1 Page pro Topic, ~1200-1800 Woerter, ausgeliefert als komplettes Markdown mit Front-Matter (siehe Schema-Pattern unten). Pilot rendert spaeter in HTML.

**URL-Schema**: `/spiel/<spielname>/` — z.B. `/spiel/topfschlagen/`

---

## 1. Tonalitaet & Voice (machsleicht-Brand)

**JA**:
- Warm, kompetent, eltern-augenhoehe
- Pragmatisch: "wenn das passiert, mach X"
- Editorial-Tiefe: jeder Absatz haette auch wegfallen koennen, wenn er nicht haengen-bleibt
- Klartext: kurze Saetze, keine Schachtelsaetze ueber 3 Kommas
- Realismus: 6 Kinder, 30 m² Wohnzimmer, ein gestresster Elternteil — schreibe dafuer

**NEIN — Wortverbote (Auto-Cut bei Adversarial)**:
- "in diesem Artikel" / "wir alle wissen" / "natuerlich" / "selbstverstaendlich"
- "wundervolle Erinnerungen schaffen" / "magische Momente" / "unvergesslich"
- "ueberraschend einfach" / "supereinfach" / "ganz einfach"
- "Spass haben" / "viel Freude" / "Leuchten in den Augen" / "Kinderlachen"
- Diminuitive: "Kuechlein", "Spielchen", "Kleinkindern" (= "Kindern")
- "Inkluding" / "Inclusive" / Anglizismen wo Deutsch reicht

**Stil-Anker** (3 Beispiel-Saetze die's treffen):
- "Topfschlagen funktioniert nur dann, wenn der Topf wirklich versteckt ist — und das schaffst du mit Augenbinde + Drehung."
- "Bei vier-, fuenfjaehrigen Kindern ist die Sackhuepfen-Strecke 3 Meter, nicht 10. Sonst stuerzen sie."
- "Die haeufigste Pinata-Panne: Du haengst sie zu hoch. Auf Schulterhoehe der Kinder, sonst schlagen sie ins Leere."

---

## 2. Page-Struktur (1200-1800 Woerter)

Jede Spiel-Page hat exakt diese Sektionen, in dieser Reihenfolge:

### 1. H1 + Einleitungs-Paragraph (~80 Woerter)
- Spielname + 1-2 Saetze warum es funktioniert
- Fuer welches Alter + Gruppengroesse
- Drinnen/Draussen, Material-Aufwand-Tag (z.B. "Material: 5 Minuten")

### 2. "Was du brauchst" (Material-Liste)
- Bullet-Liste, konkret mit Mengen
- Pro Item Alternativen falls Material nicht da ist
- Affiliate-Links (Amazon) wenn passend, aber 1-2 max, nicht spammen

### 3. "So spielst du es" (Anleitung)
- Nummerierte Schritte, je 1-3 Saetze
- Jeden Schritt mit konkretem Detail (Zahl, Zeit, Position)
- Wenn moeglich: 1 Foto-Beschreibung (Pilot ergaenzt Image-Slot)

### 4. "Anpassungen je Alter" (3 Bloecke)
- **3-5 Jahre**: Was vereinfachen? Zeitlimit? Hilfestellung?
- **6-8 Jahre**: Original-Variante, Standard-Schwierigkeit
- **9-12 Jahre**: Was schwieriger machen? Strategie-Element? Wettbewerb?

### 5. "Haeufige Probleme & Loesungen" (3-5 Punkte)
- Konkret: "Kind X mag nicht mitspielen — was tun?"
- Konkret: "Spiel ist nach 5 Min zu Ende — wie verlaengern?"
- Konkret: "Streit ueber Regeln — Schiedsrichter-Trick"

### 6. "Varianten" (2-4 Varianten)
- Z.B. Topfschlagen ohne Augenbinde / mit Geraeuschen / als Team / im Wasser

### 7. "Passt zu diesen Mottos" (Cross-Sell)
- 3-5 Motto-Verknuepfungen (Piraten, Detektiv, Einhorn, etc.)
- Jeweils 1 Satz wie das Motto in die Spielmechanik einflechtet
- **Internal Link** zur Motto-Page

### 8. "FAQ" (5-7 Fragen, FAQPage-Schema)
- Echte Eltern-Fragen, kein Filler
- Beispiele: "Ab wann koennen Kinder das?", "Was wenn keiner mitmachen will?", "Wie lange dauert es?"

### 9. CTA-Card am Ende
- "Plane den kompletten Kindergeburtstag" → Link zu `/kindergeburtstag`
- "Mehr Spiele fuer drinnen" → Link zu `/kindergeburtstag-spiele-drinnen` (oder Hub `/kindergeburtstag-spiele/`)

---

## 3. Schema.org-Pattern (Pflicht)

Im `<head>` der Page (Pilot fuegt es ein, aber im Markdown-v4 musst du Daten-Tabelle liefern):

```yaml
schema_data:
  spielname: "Topfschlagen"
  alter_min: 3
  alter_max: 10
  spieler_min: 3
  spieler_max: 20
  dauer_min: 5
  dauer_max: 15
  material:
    - "Topf (Edelstahl, mittel)"
    - "Holzloeffel (Kochloeffel)"
    - "Augenbinde (Schal oder Tuch)"
    - "Schokolade oder kleine Suessigkeit als Schatz"
  ort: ["drinnen", "draussen"]
  schwierigkeit: "einfach"
  bewegungslevel: "mittel"
  faq:
    - frage: "Ab wann koennen Kinder Topfschlagen?"
      antwort: "Ab 3 Jahren mit Hilfe, ab 4 Jahren selbststaendig."
    - frage: "..."
      antwort: "..."
```

Pilot rendert HowTo + FAQPage + BreadcrumbList Schema daraus.

---

## 4. Internal-Linking-Pflicht

Jede Spiel-Page MUSS verlinken zu:
1. **Hub-Page** `/kindergeburtstag-spiele/` (1× im Text-Body, 1× im CTA)
2. **Tool** `/kindergeburtstag` (1× im CTA als "Plane den ganzen Tag")
3. **Mindestens 1 verwandtes Spiel** im Text-Body als "Wenn dir X gefaellt, probier auch Y"
4. **Mindestens 1 Motto-Page** wo das Spiel reinpasst (im Cross-Sell-Block)

Format: `<a href="/kindergeburtstag-spiele/">Hub-Page Titel</a>` (Pilot validiert).

---

## 5. Konkurrenz-Snapshot (Top-10 Google fuer "topfschlagen kindergeburtstag")

(Stand 12.05.2026 aus Pilot-Recherche — wird pro Topic im naechsten Iteration-Schritt mit ScraperAPI aktualisiert)

**Was die Konkurrenz macht** (Pattern, allgemein, alle Spiele):
- ~80% sind Listen-Artikel ("Die 10 besten Spiele"): jedes Spiel kriegt 2-3 Saetze, keine Tiefe
- ~15% sind Mama-Blogs mit 1 Spiel + emotionalem Wrap, aber 0 Struktur
- ~5% Tool-Listen ohne Eltern-Augenhoehe
- **NIEMAND** macht: dedizierte Spiel-Page mit Alter-Anpassungen + Probleme + Varianten + Motto-Cross-Sell + Schema

**Unsere Edge**:
- Pro Spiel eigene URL = Long-Tail-Authority
- Anpassungen pro Alter = Mehrwert ueber Listenartikel hinaus
- Motto-Cross-Sell = einzigartig wegen unseres Tools
- Schema-Korrektheit = Rich-Snippets-tauglich

---

## 6. Topic-Liste & Priorisierung (15 Pages)

Reihenfolge nach **Suchvolumen-Schaetzung (DE)** + Whitespace:

| # | Topic | Slug | Suchvolumen (DE) | Saison? | Prio-Block |
|---|---|---|---|---|---|
| 1 | Topfschlagen | `/spiel/topfschlagen/` | sehr hoch | nein | 1 |
| 2 | Reise nach Jerusalem | `/spiel/reise-nach-jerusalem/` | sehr hoch | nein | 1 |
| 3 | Sackhuepfen | `/spiel/sackhuepfen/` | hoch | nein | 1 |
| 4 | Stille Post | `/spiel/stille-post/` | hoch | nein | 1 |
| 5 | Pinata | `/spiel/pinata/` | wachsend | nein | 1 |
| 6 | Eierlauf | `/spiel/eierlauf/` | mittel-hoch | nein | 2 |
| 7 | Mumie wickeln | `/spiel/mumie-wickeln/` | mittel (Halloween-Cross) | Herbst-Peak | 2 |
| 8 | Schokoladen-Spiel mit Wuerfel | `/spiel/schokoladen-spiel/` | mittel | nein | 2 |
| 9 | Stuhltanz | `/spiel/stuhltanz/` | mittel | nein | 2 |
| 10 | Limbo | `/spiel/limbo/` | mittel | nein | 2 |
| 11 | Bombenspiel | `/spiel/bombenspiel/` | mittel | nein | 3 |
| 12 | Hot Potato (Heisse Kartoffel) | `/spiel/heisse-kartoffel/` | mittel-niedrig | nein | 3 |
| 13 | Apfeltauchen | `/spiel/apfeltauchen/` | niedrig | Herbst-Peak | 3 |
| 14 | Pantomime fuer Kinder | `/spiel/pantomime/` | mittel | nein | 3 |
| 15 | Wasserbomben-Spiele | `/spiel/wasserbomben/` | mittel | Sommer-Peak | 3 |

**Arbeits-Reihenfolge**: 1 → 2 → 3 → 4 → 5 (Block 1) → 6..10 (Block 2) → 11..15 (Block 3). Topic-1 ist Pilot-Test um Style + Schema zu eichen, danach hat Chat B/C bessere Vergleichs-Vorlagen.

**Du startest jetzt mit Topic 1: Topfschlagen.**

---

## 7. Erstes Topic — Topfschlagen — konkreter Briefing

**Such-Intent**: Eltern, die ein klassisches Kindergeburtstag-Spiel suchen, wissen "Topfschlagen" als Begriff, brauchen aber: konkrete Anleitung, Material-Liste, was mit verschiedenen Altern, was wenn das Kind unter der Augenbinde nicht mitmacht.

**SERP-Lueche**: Top-10 sind Listenartikel mit 2-3 Saetzen Erwaehnung. Niemand erklaert die Drehbewegung (3× um sich selbst vor Augenbinde), niemand sagt wie hoch der Topf liegen soll, niemand sagt was bei aengstlichen Kindern tun (Augenbinde halb-durchsichtig).

**Schluesselsaetze** (musst nicht woertlich, aber zeigt Tiefe):
- "Der Topf liegt umgekehrt auf dem Boden, der Schatz darunter — nicht im Topf."
- "Augenbinde MUSS dicht sein, sonst lernen Kinder schummeln in 5 Sekunden."
- "Drehe das Kind 2-3 Mal um die eigene Achse, bevor es losgeht — sonst ist die Orientierung zu einfach."
- "Bei sehr jungen Kindern (3-4): Augenbinde nur teilweise oder mit Tuch ueber den Kopf, das nicht ganz blickdicht ist."
- "Verstecke den Topf nicht im selben Bereich nochmal — Kinder beobachten und merken sich."

**FAQ (Beispiel-Fragen die in die Page sollen)**:
- "Ab welchem Alter eignet sich Topfschlagen?"
- "Wie lange dauert Topfschlagen?"
- "Was tun wenn ein Kind Angst vor der Augenbinde hat?"
- "Was kann ich als Schatz unter den Topf legen?"
- "Wie viele Kinder koennen mitspielen?"
- "Topfschlagen drinnen oder draussen?"
- "Muss der Topf aus Edelstahl sein?"

**Material-Realismus**: Eltern haben Edelstahl-Topf zuhause, Holzloeffel auch. Augenbinde improvisieren mit Schal/Halstuch (1 Satz Empfehlung welche Stoffdicke). Schatz: kleines Sackerl Gummibaerchen oder eine Schokoladentafel (nicht teuer machen).

**Cross-Sell-Mottos**: 
- **Piraten**: "Du suchst nicht einen Topf, du suchst die Schatztruhe — Schatzkarte mit X-Markierung dazu."
- **Detektiv**: "Augenbinde wird zur Detektiv-Tarnung, der Topf zum verborgenen Beweisstueck."
- **Feuerwehr**: "Topf = Feuerloescher, Kind muss zum Brand-Hotspot finden."

**Internal Links die rein muessen**:
- `<a href="/kindergeburtstag-spiele/">Alle Kindergeburtstag-Spiele im Ueberblick</a>` (1× im Text-Body)
- `<a href="/kindergeburtstag">Plane den kompletten Geburtstag in 5 Minuten</a>` (CTA-End)
- `<a href="/kindergeburtstag/piraten">Piraten-Geburtstag mit Topfschlagen-Variante</a>` (Motto-Cross-Sell)
- `<a href="/spiel/sackhuepfen/">Wenn dir Topfschlagen gefaellt, probier auch Sackhuepfen</a>` (verwandtes Spiel — beachte, Sackhuepfen wird Topic 3, vorerst kann der Link noch 404 sein, Pilot prueft im Internal-Linking-Sweep am Sprint-Ende)

---

## 8. Akzeptanz-Kriterien — Score-Rubrik (Final-Adversarial ≥ 85/100)

| Kriterium | Max | Beschreibung |
|---|---|---|
| **Mehrwert ueber SERP** | 25 | Page enthaelt 3+ Informationen, die NIEMAND in den Top-10 von Google liefert |
| **Lesefluss** | 20 | Lautes Vorlesen ohne Stolpern, keine Schachtelsaetze, kein Buzzword-Bingo |
| **Konkurrenz-Differenzierung** | 20 | Klar erkennbar, warum Eltern lieber HIER lesen als bei familie.de oder kidsgo |
| **Schema-Korrektheit** | 15 | HowTo + FAQPage + BreadcrumbList — alle Pflichtfelder, keine Spam-Properties |
| **Mobile-Lesbarkeit** | 10 | Saetze unter 25 Woerter im Mittel, Bullet-Listen statt Block-Paragraphen wo moeglich |
| **Internal-Links** | 5 | Hub + Tool + verwandtes Spiel + Motto-Cross-Sell vorhanden, alle slug-korrekt |
| **CTA-Klarheit** | 5 | End-CTA hat 1 klare Aktion ("plane den Tag") nicht 3 |

**Veto-Kriterien** (instant Fail trotz hohem Score):
- Ein einziges verbotenes Wort (siehe Sektion 1) = -10 Punkte je Vorkommen
- Schema-Bruch (falsche Property, missing required field) = -20
- Faktischer Fehler in Anleitung = -30 + Re-Write
- Inkonsistente Mengen-Angaben (z.B. "5-10 Kinder" im Header, "ab 12 Kindern" im Body) = -15

---

## 9. Workflow-Erinnerung fuer Chat A

1. **Lies dieses Quellen-Pack vollstaendig**
2. **Beginne mit Topic 1: Topfschlagen** — produziere v1 nach Page-Struktur (Sektion 2)
3. **Output-Format**: Komplettes Markdown mit YAML-Front-Matter fuer schema_data
4. **Sende v1 ab**, Pilot uebernimmt: Download, Commit, weiter mit Chat B (Reviewer)
5. **Erwarte spaeter** Reviewer- und Adversarial-Feedback per Raw-URL, dann Round 5 = v4-Final
6. **Nach Akzeptanz** des Topic 1: naechstes Topic (Reise nach Jerusalem) starten — Workflow wiederholt sich

**Wichtige Pipeline-Hygiene**:
- Schreibe Markdown, nicht HTML (Pilot rendert)
- Halte dich an Section-Reihenfolge (Sektion 2 oben)
- Bei Unsicherheit: Pilot fragen statt halluzinieren
