# Seitentypen-Zuordnung machsleicht.de

**Stand:** 04.04.2026  
**Regel:** Jede URL hat genau EINEN Haupttyp und EINE Hauptaufgabe.

---

## Die 5 Seitentypen

| Typ | Aufgabe | Beispiel |
|-----|---------|----------|
| **Hub** | Thema bündeln, Orientierung, Unterseiten ansteuern | /kindergeburtstag |
| **Tool-LP** | Nutzer in Benutzung bringen, Friktion rausnehmen | /schatzsuche, /einladung/erstellen/ |
| **Programmatic Detail** | Konkrete Suchintention abholen → Kernprodukt weiterleiten | /kindergeburtstag/dino-6-jahre |
| **Ratgeber** | Informationssuche beantworten → konkrete Aktion überführen | /ratgeber/pokemon-fuer-eltern |
| **Kaufmoment** | Im Entscheidungszeitpunkt helfen, sauber monetarisieren | (noch nicht als eigener Typ gebaut) |

---

## Zuordnung aller URLs

### Hubs
| URL | Hauptaufgabe |
|-----|-------------|
| `/` (index.html) | Plattform-Einstieg: Alle Anlässe zeigen, in Verticals leiten |
| `/kindergeburtstag` | Motto+Alter wählen → Planer starten |
| `/baby` | Baby-Phase bündeln → Checklisten starten |
| `/einschulung` | Einschulung planen → Tagesablauf/Checkliste |
| `/einladung/` (index.html) | Alle Einladungsspiele zeigen → Erstellen-Tool |
| `/ratgeber/` (index.html) | Motto-Wissen Hub → Einzelne Ratgeber |
| `/kindergeburtstag/3-5-jahre` | Altersgruppen-Hub → Motto-Details |
| `/kindergeburtstag/6-8-jahre` | Altersgruppen-Hub → Motto-Details |
| `/kindergeburtstag/9-12-jahre` | Altersgruppen-Hub → Motto-Details |

### Tool-Landingpages
| URL | Hauptaufgabe |
|-----|-------------|
| `/schatzsuche` | Thema wählen → Schatzsuche erstellen |
| `/einladung/erstellen/` | Motto+Daten eingeben → Einladungslink generieren |
| `/spielkarten` | Spielkarten-Tool nutzen |

### Programmatic Detail (248+ Seiten)
| URL-Muster | Hauptaufgabe |
|------------|-------------|
| `/kindergeburtstag/{motto}` | Motto-Hub: Altersseiten ansteuern |
| `/kindergeburtstag/{motto}-{alter}-jahre` | Konkreter Plan für Motto+Alter → Planer-CTA |
| `/schatzsuche/{thema}` | Konkretes Schatzsuche-Thema → Builder-CTA |
| `/einladung/{motto}/` | Einladungsspiel spielen (ist eigentlich Tool, nicht Detail) |

### Ratgeber & Support
| URL | Hauptaufgabe |
|-----|-------------|
| `/ratgeber/{franchise}-fuer-eltern` | Franchise erklären → Kindergeburtstag-Motto verlinken |
| `/{franchise}-guide` | Schnell-Referenz Charaktere → Ratgeber/Kindergeburtstag |
| `/kindergeburtstag-checkliste` | Planungs-Checkliste → Planer-CTA |
| `/kindergeburtstag-einladung-text` | Einladungstexte → Einladungs-Tool-CTA |
| `/kindergeburtstag-essen` | Essen-Tipps → Planer (berechnet Mengen) |
| `/kindergeburtstag-spiele-drinnen` | Spiele-Ideen → Planer |
| `/kindergeburtstag-spiele-draussen` | Spiele-Ideen → Planer |
| `/kindergeburtstag-kosten` | Kosten-Guide → Planer (berechnet Kosten) |
| `/kindergeburtstag-mitgebsel` | Mitgebsel-Tipps → Affiliate |
| `/kindergeburtstag-zeitplan` | Zeitplan-Vorlage → Planer |
| `/kindergeburtstag-torte-einfach` | Kuchen-Tipps → Affiliate |
| `/kindergeburtstag-bei-regen` | Regen-Tipps → Drinnen-Spiele/Planer |
| `/kindergeburtstag-draussen` | Draußen-Tipps → Planer |
| `/kindergeburtstag-drinnen` | Drinnen-Tipps → Planer |
| `/kindergeburtstag-last-minute` | Last-Minute-Hilfe → Planer (Ruhemodus) |
| `/kindergeburtstag-wenig-aufwand` | Low-Effort-Tipps → Planer |
| `/kindergeburtstag-zuhause` | Zuhause-Tipps → Planer |
| `/kindergeburtstag-5-jahre` | Alters-Ratgeber → Motto wählen |
| `/kindergeburtstag-6-jahre` | Alters-Ratgeber → Motto wählen |
| `/kindergeburtstag-7-jahre` | Alters-Ratgeber → Motto wählen |
| `/schatzsuche-kindergeburtstag` | SEO-Ratgeber → Schatzsuche-Builder |
| `/schatzsuche-drinnen` | Drinnen-Tipps → Builder |
| `/baby-erstausstattung-checkliste` | Checkliste → Baby-Hub |
| `/kliniktasche-packen` | Checkliste → Baby-Hub |
| `/wochenbett-was-braucht-man` | Ratgeber → Baby-Hub |
| `/babyparty-checkliste` | Checkliste → Baby-Hub |
| `/einschulung-checkliste` | Checkliste → Einschulung-Hub |
| `/schultuete-fuellen` | Ratgeber → Einschulung |
| `/kita-start-checkliste` | Checkliste (standalone) |
| `/familienreise-packliste` | Checkliste (standalone) |
| `/autofahrt-kinder-checkliste` | Checkliste (standalone) |
| `/umzug-mit-kind-checkliste` | Checkliste (standalone) |
| `/adventskalender-fuellen` | Saisonal-Ratgeber → Affiliate |
| `/halloween-kinder-zuhause` | Saisonal-Ratgeber |
| `/oster-eiersuche` | Saisonal-Ratgeber → Schatzsuche-CTA? |

### Kaufmoment (noch nicht gebaut)
Geplant: Kontextuelle Affiliate-Boxen auf Tool-Ergebnisseiten (Schatzsuche fertig → Deko kaufen).

### Sonderseiten
| URL | Typ |
|-----|-----|
| `/impressum` | Legal |
| `/datenschutz` | Legal |
| `/transparenz` | Trust/About |
| `/homepage` | ~~Alt-Homepage~~ → 301 Redirect auf / |

---

## Erkenntnisse
1. **Guide vs Ratgeber Dopplung:** 8 Franchises haben ZWEI Seiten (z.B. `/frozen-guide` + `/ratgeber/frozen-fuer-eltern`). Klären: Zusammenlegen oder unterschiedliche Intents bedienen?
2. **Einladungsspiele** sind eigentlich Tools, keine Programmatic Detail — sollten als Tool-Typ geführt werden
3. **Saisonale Seiten** (Advent, Halloween, Ostern) haben keine Cross-Sells zu Kernprodukten
4. **Kaufmoment-Typ** existiert noch nicht als eigene Seitenart — kommt in Sprint 8
