# QA-Gates machsleicht.de

**Stand:** 04.04.2026  
**Regel:** Jede Seite muss vor Livegang alle 6 Gates bestehen.

---

## Die 6 Gates

### 1. Intent-Fit
Trifft die Seite die tatsächliche Such- oder Nutzungserwartung sofort und eindeutig?
- Titel + H1 matchen die Suchintention
- Nutzer weiß in 3 Sekunden ob er richtig ist
- Kein Bait-and-Switch (versprechen was nicht da ist)

### 2. Utility
Bringt die Seite den Nutzer real näher ans Ergebnis oder redet sie nur über das Thema?
- Gibt es einen konkreten Output (Plan, Liste, Spiel, Download)?
- Kann der Nutzer nach dem Besuch etwas TUN was er vorher nicht konnte?
- "Brutal nützlich" statt "nett zu wissen"

### 3. Differenzierung
Ist die Seite besser und eigener als generische Konkurrenz?
- Würde man sie teilen oder bookmarken?
- Bietet sie was Google/Pinterest/ChatGPT nicht in 10 Sekunden liefern kann?
- Hat sie einen eigenen Dreh, Ton oder Mechanik?

### 4. Conversion-Klarheit
Ist der nächste Schritt sofort sichtbar und eindeutig priorisiert?
- 1 Primär-CTA pro sichtbarem Bereich (above the fold)
- Max 1 Sekundär-CTA als Alternative
- Nutzer muss nicht scrollen oder suchen um zu wissen was als nächstes kommt

### 5. Brand-Fit
Klingt und wirkt die Seite eindeutig nach machsleicht?
- Farben: Creme (#FFFAF5), Orange (#E8873D), Dunkel (#2D2319)
- Fonts: DM Sans (Body), Fraunces (Headlines)
- Ton: Eltern-Sprache, direkt, warmherzig, null Bullshit
- ACHTUNG: Einladungs-Tools nutzen Dark Theme — ist gewollt als Game-Kontext

### 6. Programmatic-Sauberkeit
Keine Nullwerte, Platzhalter, Fallback-Texte, Brüche oder peinliche Artefakte?
- Alle dynamischen Felder gefüllt?
- Keine "undefined", "null", "{{variable}}" sichtbar?
- Keine abgeschnittenen Texte oder leeren Sektionen?
- Breadcrumbs korrekt? Links funktional?

---

## Erstaudit 04.04.2026

| Seite | Intent | Utility | Diff | Conv | Brand | Clean | Urteil |
|-------|--------|---------|------|------|-------|-------|--------|
| index.html | ✅ | ✅ | ✅ | ⚠️ React-abhängig | ✅ | ✅ | **OK** |
| kindergeburtstag.html | ✅ | ✅ | ✅ | ⚠️ React-abhängig | ✅ | ⚠️ | **OK** |
| schatzsuche.html | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | **Stark** |
| einladung/erstellen/ | ❌ Meta | ⚠️ | ❌ Dark != Brand? | ❌ Kein klarer CTA-Text | ⚠️ Gewollt dark | ❌ HTML-Entities | **Überarbeiten** |
| kindergeburtstag/dino-6-jahre | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | **Vorbild** |

### Erkenntnisse
- **dino-6-jahre.html** ist das beste Beispiel — DAS ist der Standard für programmatic Seiten
- **einladung/erstellen/** braucht QA-Pass: HTML-Entities fixen, Meta-Description verbessern, CTA-Text klarer
- React-abhängige Seiten: CTA-Qualität kann nur im Browser beurteilt werden, nicht am HTML
