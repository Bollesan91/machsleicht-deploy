# Quellen-Pack — Stream 04.02 — `sosScenarios` für Feuerwehr 6-8

## Was du machst

Du bist **Writer-Chat A** in einer 3-Chat-Pipeline (Writer / Reviewer / Adversarial). Deine Aufgabe: Schreibe die JSON-Sektion `sosScenarios` für `_src/elite-motto-data/feuerwehr-mittel.json`.

`sosScenarios` ist ein Panik-Button für die häufigsten Party-Pannen. Im Planer-UI (P3-18 SOS-Button) klickt die Mama mitten in der Party auf das Szenario und kriegt sofort eine 30-Sekunden-Rettungs-Anleitung — Feuerwehr-spezifisch wo möglich.

## Output-Format (kritisch)

Gib am Ende deiner Antwort **genau ein** valides JSON-Objekt im folgenden Schema zurück. Kein Markdown-Wrapping um den JSON-Block. Direkt in `feuerwehr-mittel.json` an Schlüssel `sosScenarios` einsetzbar.

```json
{
  "regen": {
    "icon": "🌧️",
    "label": "Regen — alles draußen geplant",
    "headline": "Schaum-Löscheinsatz ins Bad, Stationen ins Wohnzimmer.",
    "steps": [
      "1-Satz-Anweisung als Imperativ.",
      "Nächster Schritt."
    ],
    "fallback": "Optional: Wenn auch das nicht klappt, Plan C in 1 Satz.",
    "tone": "ruhig" 
  },
  "kind_will_nicht_mitmachen": { ... },
  ...
}
```

**Pflicht:**
- **8 Szenario-Keys** in dieser Reihenfolge:
  1. `regen`
  2. `weniger_kinder_als_erwartet`
  3. `mehr_kinder_als_erwartet`
  4. `kind_will_nicht_mitmachen`
  5. `kuchen_misslungen`
  6. `spielzeug_kaputt_oder_fehlt`
  7. `ein_kind_weint`
  8. `eltern_kommen_frueh`
- Jedes Szenario hat genau diese 6 Felder:
  - `icon` (1 passendes Emoji)
  - `label` (max 60 Zeichen, das Klick-Label im Button)
  - `headline` (1 Satz, max 100 Zeichen, der erste Atemzug — das beruhigt sofort)
  - `steps` (Array, **3–5 Items**, jeder Schritt ein Imperativ-Satz max 120 Zeichen)
  - `fallback` (1 Satz, max 150 Zeichen — der Notnagel-Plan-C; darf `""` sein wenn nicht sinnvoll)
  - `tone` — genau einer von: `"ruhig"` / `"praktisch"` / `"motivierend"` (Hinweis fürs UI-Rendering)

## Was muss inhaltlich rein

Jedes Szenario MUSS Feuerwehr-spezifisch verankert sein — wo immer möglich Rollen, Material oder Sprache aus dem Motto verwenden. Generische Eltern-Ratschläge sind NICHT akzeptabel.

### 1. `regen`
Schaum-Löscheinsatz fällt draußen aus, alle Wasserspiele drinnen. Konkrete Räume nennen.
**Anker aus parentTips:** "Zielspritzen ins Bad (Wanne!), Ausbildungs-Stationen ins Wohnzimmer + Flur, Einsatz-Alarm durch alle Zimmer der Wohnung."

### 2. `weniger_kinder_als_erwartet`
2-3 Kinder weniger erschienen. Crew-Größe runter, EINSATZ-ALARM mit weniger Kuscheltieren, Stationen-Rotation komprimieren.

### 3. `mehr_kinder_als_erwartet`
Geschwister-Boom: 2-3 mehr als RSVP. Doppel-Crew bilden? 2 Trupps parallel? Helfer kurzfristig holen?

### 4. `kind_will_nicht_mitmachen`
**Anker aus signatureRitual.optOutNote:** "Kein Zwang. Eigener Name behalten — passt. Tattoo verweigern (Hautempfindlichkeit, Abneigung): aufs Dienstausweis-Kärtchen kleben statt auf die Hand. Niemand wird ausgeschlossen, niemand wird gedrängt." → Rolle "Disponent" anbieten, Wachen-Tafel-Schreiber, Foto-Reporter.

### 5. `kuchen_misslungen`
Brennt an, fällt zusammen, sieht hässlich aus. **Anker aus cakeRecipe.tips:** "Fertigen Schoko-Kasten beim Bäcker kaufen, rote Glasur drüber, Oreo-Reifen ankleben, ‚112' mit weißem Zuckerstift draufschreiben. Sieht aus wie gewollt, dauert 10 Minuten."

### 6. `spielzeug_kaputt_oder_fehlt`
Wasserspritzpistole leak, Tattoo-Set zuhause vergessen, Sirenen-Sound geht nicht. Pragmatische Improvisation.

### 7. `ein_kind_weint`
Heimweh, Reizüberflutung, Streit. Tattoo auf Handrücken kleben (Beruhigungs-Ritual), Rolle "Wachen-Tafel-Schreiber" (ruhig, weg vom Trubel), 5 Min raus mit Trinken.

### 8. `eltern_kommen_frueh`
Eltern stehen 30 Min vor Ende vor der Tür. Crew-Foto am Wachen-Pult, Wachen-Tafel zeigen, "in 10 Min ist Schichtende" als Übergang.

## Kontext aus dem Quell-Material (direkt nutzbar)

### Rollen aus signatureRitual.rolesList (12 Stück)
Max·Wachleiter, Lina·Funkerin, Tom·Schlauchführer, Mia·Sanitäterin, Lukas·Atemschutz, Emma·Pumpenfahrerin, Felix·Maschinist, Hannah·Disponentin, Paul·Brandermittler, Lea·Wachen-Tafel-Schreiberin, Noah·Foto-Reporter, Sophie·Logistik

→ Rolle "Disponentin" und "Wachen-Tafel-Schreiberin" sind die natürlichen Off-Action-Rollen für scheue/weinende Kinder.

### signatureRitual.optOutNote (Wortlaut)
> "Kein Zwang. Eigener Name behalten — passt. Tattoo verweigern (Hautempfindlichkeit, Abneigung): aufs Dienstausweis-Kärtchen kleben statt auf die Hand. Niemand wird ausgeschlossen, niemand wird gedrängt."

### parentTips["Plan B Regen"] (Wortlaut)
> "Alle Spiele in dieser Vorlage funktionieren auch drinnen. Zielspritzen ins Bad (Wanne!), Ausbildungs-Stationen ins Wohnzimmer + Flur, Einsatz-Alarm durch alle Zimmer der Wohnung. Wenn du draußen planst: Räume innen schon vorab freihalten, falls's umkippt. Nie ohne Plan B."

### parentTips["Helfer"] (Wortlaut)
> "Bei 6+ brauchst du Unterstützung — besonders für die Stationen-Rotation (4 Stationen parallel = 4 Augenpaare hilfreich) und beim Einsatz-Alarm (jemand bedient die Nebelmaschine, jemand begleitet die Crew). Oma, andere Elternteile, oder eine Teenager-Nachbarin (10 € für 3 Stunden) retten dir den Tag."

### cakeRecipe.tips["Plan B Kuchen"]
> "Fertigen Schoko-Kasten beim Bäcker kaufen, rote Glasur drüber, Oreo-Reifen ankleben, ‚112' mit weißem Zuckerstift draufschreiben. Sieht aus wie gewollt, dauert 10 Minuten, schmeckt den Kindern genauso gut. Kein Kind hat jemals gesagt: ‚Der Kuchen war nicht selbstgemacht.'"

### EINSATZ-ALARM-Spiel-Kontext
8-10 Kuscheltiere im Wald/Haus versteckt, Crew rettet sie. Bei weniger Kindern → weniger Kuscheltiere und kürzere Distanzen. Bei mehr Kindern → 2 parallele Trupps mit je 4-5 Kuscheltieren.

## Stilvorgaben (Bolle-Ton)

- **Crisis-Mode-Sprache:** kurz, klar, Imperativ. "Pappkarton-Helm einsetzen. Tattoo dazu. Crew-Pin draufstecken — fertig."
- **Mama-Empathie ohne Pathos:** "Atme. Dann mach Schritt 1." statt "Wir wissen, dass das stressig ist."
- **Feuerwehr-Sprache wo's passt:** "Crew", "Schicht", "Einsatz", "Wachen-Pult", "Tattoo", "Wachen-Tafel"
- **Material-konkret:** "Apfelschorle in roten Bechern" statt "Getränk anbieten"
- **Nicht-belehrend.** Keine "Sie sollten beachten, dass..."-Konstruktionen

## Score-Rubrik (zur Selbst-Einschätzung)

| Dimension | Punkte | Was zählt |
|---|---|---|
| Substanz | 30 | Konkrete Handlungen, keine Beruhigungs-Plattitüden |
| Motto-Kohärenz | 25 | Rollen / Sprache / Material aus Feuerwehr-Universum |
| Crisis-Tauglichkeit | 20 | In 30 Sek lesbar und ausführbar, im Stress |
| Sprint-Tauglichkeit | 15 | Schema strikt, 8 Szenarien, alle 6 Felder pro Szenario |
| Mama-um-22:30-Test | 10 | Versteht müde Mutter ohne Vorwissen |

**Akzeptanz:** Final-Score ≥ 85.

## Workflow

1. **Jetzt:** v1 — kompletter `sosScenarios`-JSON-Block + 2-3 Sätze Self-Assessment.
2. Reviewer-Chat B → v2-Review.
3. Du → v3 mit Review-Fix.
4. Adversarial-Chat C → v4 ("Würde eine Mama mitten in der Krise das wirklich lesen?")
5. Du → v5-Final mit Score-Estimat.

## Anti-Patterns (lehne aktiv ab)

- "Bleiben Sie ruhig." → leer, keine Anweisung
- "Beruhigen Sie das Kind." → kein Handlungs-Schritt
- "Improvisieren Sie kreativ." → no shit
- "Eine flexible Haltung ist wichtig." → Hilfsverb-Geschwätz
- "Plan B sollte immer vorbereitet sein." → Truisme
- Lange Erklärungen WARUM etwas wichtig ist → kein Krisen-Modus

## Output jetzt

Schreibe v1 — kompletter `sosScenarios`-JSON-Block mit allen 8 Szenarien. Direkt los, ohne Vorrede. Am Ende 2-3 Sätze Self-Assessment.
