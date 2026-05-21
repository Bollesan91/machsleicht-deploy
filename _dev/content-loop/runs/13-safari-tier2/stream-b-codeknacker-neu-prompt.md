# Stream B — Safari 9-12 Tier 2: Codeknacker komplett neu

Du bist **Writer-Subagent für die strukturelle Codeknacker-Neukonstruktion**. Modus: konkrete HTML-Edits liefern (alter Block → neuer Block).

## Materialien

- **HTML zum Editieren** (aktueller Stand nach Tier-1): https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/kindergeburtstag/safari-9-12-jahre.html
- **v2-Adversarial-Review:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/_dev/content-loop/runs/12-safari-9-12-review/v2-adversarial.md
- **v2-Challenger-Review** (verifiziert HTML-Bug HZEL≠HELZ): https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/_dev/content-loop/runs/12-safari-9-12-review/v2-challenger.md
- **Story-Doc:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_dev/docs/safari-story.md

## Bestätigter Kern-Defekt

**Codeknacker-Station ist Pseudo-Mathematik** (Score 71 von Chat C):
- ELZA/HZEL/FEK sind keine echten Wörter — keine Selbst-Verifikation für Kinder möglich
- HZEL → "HELZ" ist **echter HTML-Selbstwiderspruch** in Z.265 (Chat B verifiziert)
- Z.268 "Mut zum Raten" = Selbst-Entlarvung: gutes Rätsel braucht Logik, nicht Mut
- Z.730/731 Wow-Schatzsuche-Antworten mehrdeutig ("E für Eindeutigkeit oder Anfangsbuchstabe")
- Z.261 "Beispiel-Codes als Druckvorlage gibt's noch nicht" = offenes TODO im Live-Content

## Bolle's Entscheidung (Option A)

Neue Lösungswörter mit echten deutschen Wörtern. Vorschlag:
- **Späher-Quadrant** → Lösungswort `WASSER` (passt zur Reservat-Karte "Wasserstelle")
- **Tierfotograf-Quadrant** → Lösungswort `FELS` (passt zur Reservat-Karte "Felsen")
- **Spurenleser-Quadrant** → Lösungswort `TEMPEL` (passt zum Wow-Mission-Anker "Verborgener Tempel")

**Drei Quadranten zusammen** ergeben den Pfad: WASSER → FELS → TEMPEL = der Weg zur finalen Karten-Mission.

## Anforderungen an die Neukonstruktion

1. **Echte Wörter** als Lösung, KEINE Pseudo-Buchstaben-Folgen
2. **Eindeutige Sortier-Regel** je Quadrant — eine, die im HTML explizit benannt wird
3. **Selbst-Verifikation**: Hinweis im HTML *"Wenn das Lösungswort kein echtes deutsches Wort ergibt, habt ihr die Regel anders angewendet — vergleicht mit dem Beispiel-Pfeil im Helfer-Heft."*
4. **Druckvorlage konkret**: mindestens 1 Vollbeispiel mit echten Tieren + echter Sortierung + echtem Lösungswort
5. **Mama-um-22:30-Test:** Müde Mutter muss in 2 Min verstehen, was sie vorbereiten und wie das Rätsel funktioniert
6. **9-12-Test:** Ein 11-jähriger Escape-Room-erfahrener Junge erkennt die Lösung als ableitbar, nicht "Mama hat den Zettel versteckt"

## Konzept-Skizze (du verfeinerst und HTMLisierst)

### Späher-Quadrant → WASSER
- Aufgabe: 6 Tiere in Reservat-Karte gezeichnet, alle haben unterschiedlichen Lebensraum (Boden, Baum, Wasser, Höhle, Fels, Luft)
- Aufgabe für Späher: Identifiziere die 6 Lebensräume + ordne sie nach Höhe (Boden ↓ → Luft ↑)
- Konkrete Tiere & Buchstaben: z.B. **W**ildschwein (Wasser-Suhle), **A**ntilope (Steppe), **S**chlange (Erde), **S**chmetterling (Luft) + 2 weitere
- Lösungswort: nimm die Anfangsbuchstaben der **Tiere am Wasser** in einer eindeutigen Reihenfolge (z.B. nach Sichtbarkeit, oder nach Karten-Position links→rechts) → ergibt **WASSER** (echtes Wort)

### Tierfotograf-Quadrant → FELS
- Konzept: 4 Tiere haben in der Karte versteckte Spuren. Tierfotograf muss die Spuren zuordnen.
- Lösungswort entsteht aus den Anfangsbuchstaben der Tiere, die an einer bestimmten Stelle leben (z.B. **F**uchs, **E**lefant, **L**öwe, **S**chakal — alle haben Spuren bei FELS-Position) → ergibt **FELS**

### Spurenleser-Quadrant → TEMPEL
- Konzept: 6 Spuren auf der Karte verteilt. Spurenleser ordnet jede Spur dem richtigen Tier zu + dem Ort.
- Lösungswort: 6 Buchstaben der Tiere, die am Tempel-Ort gefunden wurden → ergibt **TEMPEL**

(Du kannst die konkrete Tier-Wahl + Sortier-Regel selbst feinjustieren — Anforderung ist nur dass Lösung ableitbar bleibt und ein echtes deutsches Wort ergibt.)

## Konkrete EDITs

```
### EDIT 1: Codeknacker-Station Briefing (Z.250-270)
**LOCATION:** Block "Codeknacker-Station" Standard-Block
**ALTER BLOCK:** komplett kopieren ab "Setup: Du hast vorher eine Reservat-Karte gezeichnet..."
**NEUER BLOCK:** mit neuer Sortier-Regel + Selbst-Check-Hinweis
```

```
### EDIT 2: Drei Quadranten-Aufgaben (Z.260-290)
**LOCATION:** Späher / Tierfotograf / Spurenleser Quadranten-Beschreibung
**ALTER BLOCK:** ELZA/HZEL/FEK-Beschreibung
**NEUER BLOCK:** WASSER/FELS/TEMPEL mit eindeutiger Logik je Quadrant
```

```
### EDIT 3: Druckvorlage konkret machen (Z.261 "Beispiel-Codes gibt's noch nicht")
**LOCATION:** Material-Liste der Codeknacker-Station
**ALTER BLOCK:** "Beispiel-Codes als Druckvorlage gibt's noch nicht"
**NEUER BLOCK:** Vollbeispiel inline im HTML, mit konkreten Tieren/Buchstaben/Lösungswort
```

```
### EDIT 4: Wow-Schatzsuche-Codes (Z.728-733) auf gleiche Logik umstellen
**LOCATION:** Wow-Variante Schatzsuche-Stationen
**ALTER BLOCK:** Z.728-733 mit mehrdeutiger "E für Eindeutigkeit"-Antwort
**NEUER BLOCK:** klare Lösungsantworten konsistent zur Standard-Codeknacker-Logik
```

```
### EDIT 5: "Mut zum Raten" raus (Z.268)
**LOCATION:** Satz Z.268 etwa
**ALTER BLOCK:** "Mut zum Raten"-Formulierung
**NEUER BLOCK:** "Mut zur Selbst-Kontrolle: Wenn euer Lösungswort kein echtes Wort ist, prüft die Sortier-Regel nochmal" (oder ähnlich)
```

## Output-Format

Liefere genau 5 EDITs in obigem Format. Pro Edit: LOCATION (suchbarer Anker), ALTER BLOCK (exakter HTML), NEUER BLOCK (exakter HTML).

Wichtig:
- **9-12-Test:** keine Verkindischung, kein Plastikspielzeug-Ton
- **Bolle-Ton:** lakonisch, kein Schul-Deutsch
- **Schema bleibt valide:** wenn du HowTo-Steps oder FAQs anfasst, JSON-LD-Syntax beachten

## Anti-Patterns

- Pseudo-Wörter behalten "weil cool klingt"
- Sortier-Regel nicht im HTML benennen (=Halluzinations-Risiko bleibt)
- Druckvorlage als externes TODO behalten
- Mehrdeutige Antworten ("E ODER der Anfangsbuchstabe")
