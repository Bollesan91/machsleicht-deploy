# Quellen-Pack — Stream 04.01 — `preparationWeeks` für Feuerwehr 6-8

## Was du machst

Du bist **Writer-Chat A** in einer 3-Chat-Pipeline (Writer / Reviewer / Adversarial). Deine Aufgabe: Schreibe die JSON-Sektion `preparationWeeks` für `_src/elite-motto-data/feuerwehr-mittel.json`.

`preparationWeeks` ist ein datums-getriebener Wochenplan, der im Planer-UI als P3-16 "Vorbereitungskarte" gerendert wird. Eltern sehen abhängig vom Party-Datum genau, was diese Woche dran ist.

## Output-Format (kritisch)

Gib am Ende deiner Antwort **genau ein** valides JSON-Objekt im folgenden Schema zurück. Kein Markdown-Wrapping um den JSON-Block. Direkt in `feuerwehr-mittel.json` an Schlüssel `preparationWeeks` einsetzbar.

```json
{
  "minus4Weeks": {
    "headline": "4 Wochen vorher — Grundgerüst stellen",
    "items": [
      {
        "icon": "📅",
        "title": "Datum + Uhrzeit final festlegen",
        "detail": "Konkrete Anleitung in 1-3 Sätzen. Lakonisch, mama-respektierend, Bolle-Ton."
      }
    ]
  },
  "minus2Weeks": { "headline": "...", "items": [...] },
  "minus1Week":  { "headline": "...", "items": [...] },
  "minus2Days":  { "headline": "...", "items": [...] },
  "minus1Day":   { "headline": "...", "items": [...] },
  "dayOf":       { "headline": "...", "items": [...] }
}
```

**Pflicht:**
- Alle 6 Keys vorhanden (`minus4Weeks`, `minus2Weeks`, `minus1Week`, `minus2Days`, `minus1Day`, `dayOf`)
- Jede Sektion hat `headline` (max 60 Zeichen) und `items` (Array, 3–6 Items pro Sektion)
- Jedes Item hat genau 3 Felder: `icon` (1 Emoji), `title` (max 70 Zeichen), `detail` (1–3 Sätze, max ~280 Zeichen)
- **Konsistente Konventionen:** `title` ist Imperativ ("Einladungen verschicken"), nicht Substantiv ("Einladungen-Versand")

## Was muss inhaltlich rein (Mindest-Anker pro Sektion)

### `minus4Weeks` — 4 Wochen vorher
- Datum + Uhrzeit + Treffpunkt festlegen
- Gästeliste klären (6 Kinder = Standard, Nachbarn-Lautstärke-Warnung wenn Mietwohnung)
- Variante auswählen (Minimal 53€ / Standard 99€ / Wow 159€)
- Einladungen verschicken (Hinweis: Allergie-Abfrage + Asthma-Abfrage bei Wow wegen Nebelmaschine)

### `minus2Weeks` — 2 Wochen vorher
- RSVPs einsammeln (Tipp: party.machsleicht.de statt WhatsApp-Chaos)
- Allergien & Unverträglichkeiten konsolidieren
- Bei 6+ Kindern: 1 Helfer organisieren (Oma / Partner / Teenager-Nachbarin 10€/3h)
- Pappkarton-Helme falls DIY-Route: Vorlage suchen + Bastel-Material besorgen

### `minus1Week` — 1 Woche vorher
- **Amazon-Bestellung** raus (Lieferzeit 2-5 Tage): Tattoo-Set, Helme, Wasserspritzen, ggf. Nebelmaschine
- Dienstausweis-Vorlage + Diplom drucken (DIN A4, kribbelbunt.de hat kostenlose)
- Bei Mietwohnung: Nachbarn vorwarnen (Sirene wird laut, Sonntag 14-17 Uhr)
- Plan B Regen: Räume innen freihalten

### `minus2Days` — 2 Tage vorher
- Kuchen backen (oder Plan B aus `cakeRecipe.tips`: Bäcker-Kasten + rote Glasur + Oreo-Reifen + "112")
- Helfer-Briefing: 5-Minuten-Erklärung "du machst Station X, ich Station Y"
- Wachen-Tafel-Plakat malen / drucken
- Goodie-Bags vorbereiten (Diplom-Rolle + Mini-Auto + Tattoo-Reste)

### `minus1Day` — 1 Tag vorher
- Kuchen verzieren (Glasur + Reifen + "112")
- Kuscheltiere für EINSATZ-ALARM verstecken (im Wow-Setup: auch Brandermittlung-Beweise platzieren)
- Tisch + Wachen-Pult dekorieren (Absperrband + Helm-Box + Tattoo-Stempelkissen)
- Sirenen-Sound auf Handy testen (YouTube "Feuerwehr Sirene 30 Sekunden")
- Rasierschaum-Dosen + Wanne griffbereit für Schaum-Löscheinsatz

### `dayOf` — Tag X (Party-Tag)
- Frühstück light für dich — Adrenalin reicht
- 30 Min vor Ankunft: Stationen aufbauen, Apfelschorle einkühlen, Würstchen warmstellen
- 15 Min vor Ankunft: Sirenen-Sound griffbereit, Tattoo-Stempelkissen offen, Helme an Helm-Box
- 5 Min vor Ankunft: tief durchatmen, Bluetooth-Box checken
- Bei Wow: Nebelmaschine 10 Min vorher anschalten zum Vorwärmen

## Kontext aus dem Quell-Material (echte Inhalte aus feuerwehr-mittel.json)

### Spielmaterial-Listen (woraus die Einkaufsfristen sich ergeben)
- **Minimal:** 6 Wasserspritzpistolen, Klorollen mit Flammen, Rasierschaum (2 Dosen), Spielzeug-Tiere, Backmischung, Pappkarton-Helm (DIY)
- **Standard:** wie Minimal + Plastik-Helme (6 Stk., ~25€), Erste-Hilfe-Spielset, Seile + Knoten-Karte, Wachen-Tafel-Plakat
- **Wow:** wie Standard + Nebelmaschine (~30€), Crew-Pins, Polaroid-Sofortdruck, Verdächtigen-Karten, Atemschutz-Augenbinden

### parentTips-Auszüge (Wortlaut direkt nutzbar)

**Allergien-Hinweis:**
> "Bei 6 Kindern hat statistisch mindestens eins eine Unverträglichkeit (Nüsse, Laktose, Gluten). In die Einladung schreiben: ‚Hat dein Kind Allergien oder Unverträglichkeiten?'"

**Helfer-Hinweis:**
> "Bis 5 Kinder schaffst du eine Standard-Party allein. Bei 6+ brauchst du Unterstützung — besonders für die Stationen-Rotation (4 Stationen parallel = 4 Augenpaare hilfreich) und beim Einsatz-Alarm (jemand bedient die Nebelmaschine, jemand begleitet die Crew). Oma, andere Elternteile, oder eine Teenager-Nachbarin (10 € für 3 Stunden) retten dir den Tag."

**Nachbarn-Hinweis:**
> "Sirene + 6 spritzende Kinder + Einsatz-Alarm ist laut. Wenn du in einer Mietwohnung bist, kurz vorab beim Nachbarn klingeln und sagen: ‚Sonntag von 14 bis 17 wird's lauter, mein Sohn wird 7.'"

**Plan B Regen:**
> "Alle Spiele in dieser Vorlage funktionieren auch drinnen. Zielspritzen ins Bad (Wanne!), Ausbildungs-Stationen ins Wohnzimmer + Flur, Einsatz-Alarm durch alle Zimmer der Wohnung. Wenn du draußen planst: Räume innen schon vorab freihalten, falls's umkippt. Nie ohne Plan B."

**Asthma + Nebelmaschine:**
> "Bei der Wow-Variante zusätzlich Asthma abfragen — die Nebelmaschine ist für Kinder ohne Asthma unproblematisch (Wasserbasis-Fluid), aber bei Asthma kann sie triggern."

### cakeRecipe.tips (Plan-B-Kuchen)
> "Fertigen Schoko-Kasten beim Bäcker kaufen, rote Glasur drüber, Oreo-Reifen ankleben, ‚112' mit weißem Zuckerstift draufschreiben. Sieht aus wie gewollt, dauert 10 Minuten, schmeckt den Kindern genauso gut."

## Stilvorgaben (Bolle-Ton)

- **Lakonisch, konkret, mama-respektierend.** Wir reden NICHT mit Eltern, die Pinterest-Perfektion brauchen — wir reden mit gestressten Müttern um 22:30, die morgens um 6 schon wieder ran müssen.
- **Imperativ, kein Hilfsverb-Geschwätz.** "Helfer holen" statt "Es ist empfehlenswert, einen Helfer zu organisieren."
- **Konkrete Materialien + Preise** wo möglich. "10€-Tattoo-Set von Amazon (Lieferung 2-5 Tage)" statt "Tattoos besorgen".
- **Keine Pinterest-Aufwand-Eskalation.** Wir wollen NICHT "Sie könnten zusätzlich eine handgenähte Stoff-Wachen-Tafel...".
- **Keine generischen Eltern-Tipps.** "Achten Sie auf Sicherheit" — raus. Wir wollen Feuerwehr-spezifische Konkretheit.
- **Variante-Bezug erlaubt:** "Wenn du Wow buchst, jetzt Nebelmaschine bestellen — Amazon braucht 2-5 Tage."

## Score-Rubrik (zur Selbst-Einschätzung am Ende)

| Dimension | Punkte | Was zählt |
|---|---|---|
| Substanz | 30 | Konkrete Items, keine Plattitüden |
| Motto-Kohärenz | 25 | Feuerwehr-Sprache, Wachen-Tafel, Tattoo-Stempelkissen, Sirene |
| Datums-/Material-Realismus | 20 | Amazon-Lieferzeiten, Backzeiten, Helfer-Timing realistisch |
| Sprint-Tauglichkeit | 15 | Schema strikt eingehalten, keine "siehe oben"-Verweise |
| Mama-um-22:30-Test | 10 | Versteht müde Mutter ohne Vorwissen, in 30 Sek |

**Akzeptanz:** Final-Score ≥ 85.

## Workflow

1. **Jetzt:** Schreibe v1 — kompletter `preparationWeeks`-JSON-Block plus 2-3 Sätze Self-Assessment am Schluss (Score-Estimat + 1 Schwäche, die du selbst siehst).
2. Reviewer-Chat B bekommt dein v1 als Input und schreibt v2-Review-Feedback.
3. Du integrierst Review-Feedback → v3.
4. Adversarial-Chat C macht den "müde Mutter um 22:30"-Stress-Test → v4-Adversarial.
5. Du baust v5-Final mit Score-Estimat.

Wenn v3-Adversarial unter 85 ist und konkrete Schwächen nennt → v4 mit Fixes. Wenn v4 plateau (gleicher Score wie v3) → halt mich auf, ggf. ist Adversarial-Feedback Sycophancy-Drift.

## Anti-Patterns (lehne aktiv ab)

- "Vergessen Sie nicht, die Kinder anzukündigen." → generisch
- "Es ist ratsam, Helfer zu engagieren." → Hilfsverb-Geschwätz
- "Eine schöne Wandtafel können Sie aus..." → Pinterest-Eskalation
- "Achten Sie auf Sicherheit." → leer
- "Die Einladungen sollten frühzeitig versendet werden." → no shit

## Output jetzt

Schreibe v1 — kompletter `preparationWeeks`-JSON-Block. Direkt los, ohne Vorrede. Am Ende 2-3 Sätze Self-Assessment.
