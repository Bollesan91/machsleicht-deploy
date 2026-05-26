# Stream A — Safari 3-5 Tier 2: Wow-Variante ehrlich + Kostüm-Caveat + Vorbereitungs-Zeit

Du bist **Writer-Subagent im Tier-2-Strukturfix**. Modus: konkrete HTML-Edits liefern (kein neuer Text-Brei, sondern alter Block → neuer Block).

## Materialien

- **HTML zum Editieren** (aktueller Stand mit Tier-1-Polish): https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/kindergeburtstag/safari-3-5-jahre.html
- **v2-Adversarial-Review** (deine Quelle der Wahrheit): https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/_dev/content-loop/runs/11-safari-3-5-review/v2-adversarial.md
- **Story-Doc:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_dev/docs/safari-story.md
- **Elite-Template:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_dev/docs/ELITE-SEITEN-TEMPLATE.md

## Bestätigte Befunde aus Chat-C-Adversarial (Score 71/100)

Die 5 strukturellen Schwächen, die du adressierst:

1. **Fund 1 — Pirsch durch "2-3 Räume" in 75m²** ist räumlich Wunschdenken (Z.442)
2. **Fund 2 — Eltern-Modell-Widerspruch:** Kaffee-Ecke (entspannt) vs. "Eltern dürfen mithelfen" (Aktiv-Rolle) — beide Versprechen heben sich auf
3. **Fund 3 — Wow-Variante 4 Material-Welten kollidieren räumlich** in normaler Küche (Tisch wechselt 4× Bestimmung in 60 Min)
4. **Fund 4 — Aufblas-Kostüm widerspricht Z.444** ("KEIN Löwen-Brüllen für 3-Jährige") und ist somit gegen die altersgruppen-eigene Regel
5. **Fund 5 — "10-Min-Planer"-USP wird vom Inhalt widerlegt:** echter Bastel-Aufwand 3-4h über 2 Abende, aber nirgends summiert

## Konkrete Edits — produziere für jeden Block:

```
### EDIT 1: Wow-Variante-Aufklärung
**LOCATION:** Direkt vor dem Wow-Block-Header (vor Z.528 etwa "Wow-Variante" Headline)
**ALTER BLOCK:** (kopiere aus HTML)
**NEUER BLOCK:**
<div class="tip" style="border-left-color:#E8873D">
  <strong>⚠️ Wow ist nicht für jede Familie ehrlich</strong>
  <p>Wow braucht: <strong>80m²+ Wohnfläche ODER Garten</strong>, <strong>eine zweite erwachsene Hand</strong> (Partner, Oma, befreundete Mama), und <strong>mindestens ein 5-jähriges Geburtstagskind</strong>. Mit 3-Jährigen + Solo-Moderation: <strong>Standard nehmen</strong>, nicht Wow. Wer Wow trotzdem will: vorher mit der zweiten Hand absprechen, wer Stationen führt und wer Trostkontakt für überreizte Kinder ist.</p>
</div>
```

```
### EDIT 2: Kostüm-Caveat schärfen (Fund 4)
**LOCATION:** Im Wow-Highlight-Block (suche "Aufblasbares Safari-Tier-Kostüm")
**ALTER BLOCK:** (kopiere komplett, inkl. der Marketing-Beschreibung "Pumpe macht Geräusch, ... begeistert sofort")
**NEUER BLOCK:** (mit klarer 5-Jahre-Empfehlung und ehrlicher 3-Jahre-Warnung)
```

```
### EDIT 3: Ehrliche Vorbereitungs-Zeitsumme (Fund 5)
**LOCATION:** Direkt vor "Einkaufsliste Wow" (vor der Wow-Einkaufsliste-Section)
**ALTER BLOCK:** (was unmittelbar davor steht)
**NEUER BLOCK:**
<div class="tip">
  <strong>🕐 Realistische Vorbereitungs-Zeit Wow</strong>
  <p>~3-4 Stunden Basteln über 2 Abende (Stirnbänder, Urkunden, Pfoten, Memory, Tarn-Quadrate schneiden + Kanten versiegeln, Geräusche-Karten, Foto-Ecke). Plus 1h Einkauf. Wer das in 1h schaffen will: Standard nehmen, das geht ehrlich in 2h Basteln + 30 Min Einkauf.</p>
</div>
```

```
### EDIT 4: Eltern-Modell entwirren (Fund 2)
**LOCATION:** im Block der die Kaffee-Ecke beschreibt (suche "ruhigen Kaffee-Ecke")
**ALTER BLOCK:** (Z.376 etwa, der ganze Absatz)
**NEUER BLOCK:** (Eltern-Erwartungs-Klarstellung: Kaffee-Ecke ist Bonus, aber bei Bastel-Stationen aktive Hilfe ehrlich angekündigt — kein Double-Promise)
```

```
### EDIT 5: Pirsch-Raumannahme entschärfen (Fund 1)
**LOCATION:** Z.442 etwa "Indoor: Spur in 2-3 Räume verteilen"
**ALTER BLOCK:**
**NEUER BLOCK:** (ehrlich: in 60-75m² ist 2-3 Räume schwer, Alternative anbieten: 1 Raum mit verschachtelten Verstecken, oder Garten)
```

## Output-Format

Liefere genau 5 EDITs in dem Format oben. Pro Edit: LOCATION (suchbarer Anker), ALTER BLOCK (exakter HTML-Code, der ersetzt wird), NEUER BLOCK (exakter HTML-Code).

Wichtig:
- **Bolle-Ton:** lakonisch, mama-respektierend, keine Schul-Sprache
- **Keine neuen Marketing-Phrasen** ("Sweet Spot", "an die sie sich erinnern" — Anti-Pattern aus Chat C)
- **Stilistisch passend** zu existierenden `.tip` / `.tip-box` CSS-Klassen
- **Konkret testbar:** wenn ein Edit gemacht wird, soll das Edit-Tool von Claude Code damit funktionieren

## Anti-Patterns

- Generische Empfehlungen ohne HTML-Code
- Kostüm-Empfehlung komplett rausstreichen statt verfeinern (Affiliate-Relevanz!)
- Vorbereitungs-Zeit als "ca." ohne konkrete Stundenzahl
- Neue Sub-Sections erfinden, die nicht zur bestehenden Struktur passen
