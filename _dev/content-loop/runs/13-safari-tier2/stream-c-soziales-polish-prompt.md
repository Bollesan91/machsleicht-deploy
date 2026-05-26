# Stream C — Safari 9-12 Tier 2: Soziales + Polish-Edits

Du bist **Writer-Subagent für die "weichen" Strukturfixes**. Modus: konkrete HTML-Edits liefern.

## Materialien

- **HTML zum Editieren** (aktueller Stand nach Tier-1): https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/kindergeburtstag/safari-9-12-jahre.html
- **v2-Adversarial-Review:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/_dev/content-loop/runs/12-safari-9-12-review/v2-adversarial.md
- **Story-Doc:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_dev/docs/safari-story.md

## Drei Tier-2-Edits in diesem Stream

### 1. Anwärter-Lizenz entschärfen (Chat C Fund 5 — sozialer Sprengstoff)

**Befund:** Z.522 etabliert "Anwärter-Lizenz" für Kinder, die Codeknacker-Station nicht bestehen. Chat C: *"Auf der Geburtstagsfeier eines anderen Kindes eine Urkunde zweiter Klasse mit 'Anwärter' drauf zu kriegen, ist das eine Foto, das die Eltern nicht machen wollen, und der eine Heimweg-Streit, den die einladende Mutter sich eingehandelt hat."*

**Bolle's Entscheidung:** Entschärfen. Anerkennung-First.

**Neukonzept:**
- ALLE Kinder bekommen die volle Spezialisten-Lizenz
- Codeknacker-Nicht-Geschaffte: erhalten Hilfe von einem Spezialisten der bestanden hat → gemeinsamer Erfolg
- Differenzierung anders: Wer als 1. Quadrant löst, bekommt **"1. Spezialist"-Stempel** auf seine Lizenz — Anerkennung ohne Abstufung

### 2. Mini-Tierfigur als Mitgebsel überdenken (Chat C Mein-Sohn-Check)

**Befund:** Z.320 "Mini-Tierfigur passend zur Spezialisierung" — Chat C: *"Ein 11-Jähriger, der gerade 'ernst genommen' wurde, kriegt zum Schluss ein Plastik-Spielzeugtier in die Tüte. Das ist das Mitgebsel für seinen 6-jährigen Bruder."*

**Fix:** Als Optional-Add markieren mit ehrlichem Hinweis:
- *"Mini-Tierfigur passend zur Spezialisierung — optional, eher für jüngere Geschwister oder bei 9-jährigen Gästen. Bei 11-12 lieber weglassen oder durch [bessere Alternative] ersetzen: kleine Notizbücher mit Tier-Sticker, kompakte Stirnlampe (Reservat-Tauglichkeit), Pin/Anstecker mit Spezialisierungs-Logo."*

### 3. Marketing-Sound restliche Treffer raus (Chat A Z.599 + 819 unfertig)

**Befund:** Z.599 + Z.819 "die emotional wertvollsten Stücke" — leicht Pinterest-Vokabular, von Chat A markiert aber in Tier 1 nicht behoben.

**Fix:** Bolle-Ton-Ersatz:
- *"emotional wertvollsten Stücke"* → *"die Stücke, die wirklich zur Party gehörten"* oder *"die Dinge, die nicht in der Schublade landen"*

## Konkrete EDITs

```
### EDIT 1: Anwärter-Lizenz-Konzept umbauen (Z.518-525)
**LOCATION:** Codeknacker-Block "Anwärter-Lizenz bei Nicht-Bestehen"
**ALTER BLOCK:** komplett kopieren
**NEUER BLOCK:** Neukonzept "alle bekommen volle Lizenz, 1. Spezialist Stempel als Anerkennung"
```

```
### EDIT 2: Anwärter-Lizenz-Erwähnung in FAQ (falls existiert)
**LOCATION:** FAQ-Block — suche nach "Anwärter" / "schafft nicht"
**ALTER BLOCK:** (falls existiert)
**NEUER BLOCK:** Konsistent zu Edit 1: Niemand geht ohne volle Lizenz
```

```
### EDIT 3: Mini-Tierfigur entschärfen (Z.320)
**LOCATION:** Mitgebsel-Liste Z.320 etwa
**ALTER BLOCK:** "Mini-Tierfigur passend zur Spezialisierung"
**NEUER BLOCK:** Als Optional-Add mit Eltern-Hinweis "eher für jüngere Geschwister"
```

```
### EDIT 4: Marketing-Sound Z.599
**LOCATION:** suche "emotional wertvollsten Stücke" 1. Vorkommen (Z.599 etwa, Standard-Variante Mitgebsel-Abschluss)
**ALTER BLOCK:** ganzer Absatz
**NEUER BLOCK:** mit Bolle-Ton-Ersatz
```

```
### EDIT 5: Marketing-Sound Z.819
**LOCATION:** zweites Vorkommen "emotional wertvollsten Stücke" (Z.819 etwa, Wow-Variante)
**ALTER BLOCK:** ganzer Absatz
**NEUER BLOCK:** mit Bolle-Ton-Ersatz
```

## Output-Format

Liefere genau 5 EDITs in obigem Format. Pro Edit: LOCATION (suchbarer Anker), ALTER BLOCK (exakter HTML), NEUER BLOCK (exakter HTML).

Wichtig:
- **9-12-Test:** keine Verkindischung
- **Bolle-Ton:** lakonisch, ehrlich
- **Konsistenz** über alle Edits — wenn Anwärter-Lizenz entfernt wird, muss das auch in FAQ + Schema reflektiert sein

## Anti-Patterns

- "Anwärter" durch Synonym ersetzen statt das Konzept zu eliminieren
- Mini-Tierfigur komplett rauswerfen (Affiliate-Relevanz!) statt ehrlich als Optional-Add zu framen
- Neue Marketing-Phrasen statt nüchterner Beobachtungen einbauen
