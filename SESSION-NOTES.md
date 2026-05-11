# Session-Notiz — 11.05.2026

## Kontext der Session

Reine **Strategie- und Planungs-Session** zum Planer. Kein Code-Change am Tool selbst. Bolle hat den Planer zur Marktreife & „Spitze des Marktes" durchgesprochen — was fehlt, was wäre Gesprächsthema-Feature, wie wird aus Generator ein intelligentes Produkt ohne API-Kosten. Ergebnis: ein konkreter Frisur-Sprint mit 8 Hauptfeatures plus 2 große Wetten danach. Alle 10 PBIs sind in `BACKLOG-AUDIT.md` als **P3-12 bis P3-21** angelegt und in der Prio-Tabelle oben als „Planer-Frisur-Sprint" sichtbar.

## Was heute analysiert wurde

**Quellen:**
1. **Source-Read** komplett: `_src/kindergeburtstag.jsx` (1352 Z., Wizard + Plan-View + Schatzsuche-Block + alle Sub-Komponenten), `_src/kindergeburtstag-data.js` (LICENSE-Array seit 30.04. leer, aber UI noch nicht zurückgebaut)
2. **STRATEGIE.md** + **BACKLOG-AUDIT.md** als Leitplanken (Funnel-Axiom 0.1, Validierungs-Reihenfolge 0.7, Capacity-Update 30.04., P2-23 als Anker)
3. **Externe Konkurrenz-Recherche** (web_search 11.05.): Top-10 Google für „kindergeburtstag planen" = ausschließlich Blogs/Affiliate-Listen, kein interaktiver Planer. Eysoldt-Partyplaner-App (iOS) ist generischer Erwachsenen-Planer. Actionbound = Schatzsuche-only. **Strukturell keine Tool-Konkurrenz auf machsleicht-Niveau.**
4. **Drei Sparring-Dokumente** vom User eingebracht: eine eigene Lückenanalyse (15 Ideen) + zwei externe Inputs (10+20 Ideen). Ehrlich gegeneinander gestellt, konsolidiert.

## Architektur-Erkenntnis: „intelligent ohne API"

Bolle wollte kategorisch keine API-Kosten. Konsequenz: vier-schichtige Architektur entworfen, alle deterministisch:

1. **Reaktive Outputs mit Diff-Anzeige** — sichtbar machen, was sich durch Eingaben geändert hat (heute fehlt das — Logik ist da, Sichtbarkeit nicht)
2. **Constraint-Solver** — 15–20 Regeln über alle Eingaben (Alter × Gäste × Ort × Erwachsene × Dauer)
3. **Kuratierte Inhalts-Bibliothek** — pro Motto × Alter handgeschrieben, kein Halluzinations-Risiko, **kein Wettbewerber kann das ohne identischen Redaktions-Aufwand klauen**
4. **Templated Generators** — Slot-Filling mit Varianten-Bibliotheken (5 Slots × 3 Optionen = 243 Variationen, deterministisch)

**Einzige API-Ausnahme im Sprint:** Schatzsuche-Rätsel-Gedichte (P3-19), gecacht auf Input-Hash. Geschätzte Kosten 6–9€/Monat bei 1000 Plänen — Premium-Vehikel-fähig, ein expliziter Wow-Anker.

**Bestehende Code-Erkenntnis:** `calcScore()` (Z. 891–923) ist bereits ein primitiver Constraint-Solver, nur deskriptiv (gibt Zahlen aus), nicht handlungsleitend. Refactor zu `analyzeFeasibility()` mit Klartext-Output ist die zentrale Architektur-Investition in P3-14.

## Der Sprint (10 PBIs, P3-12 bis P3-21)

**Tier 0 (sofort, 2 Std):**
- **P3-12** — Sofort-Fixes: Lizenz-Tab raus, „Sieben Mottos" → „Neun Mottos" im SEO-Body, Performance-Baseline messen

**Tier 1 (Sprint-Hauptteil, ~7–9 Arbeitstage = 6–8 Wochen bei 6–8h/Woche):**
- **P3-13** — Cockpit-Header im Plan-View (Stand-Anzeige + Next-Actions, 1 Tag)
- **P3-14** — Machbarkeits-Box + Constraint-Solver-Fundament (1 Tag, zentrale Architektur-Schicht)
- **P3-15** — Datum + Erwachsene als neue Wizard-Inputs (½ Tag, Voraussetzung für P3-16)
- **P3-16** — Vorbereitungskarte (datums-getriebener Wochenplan, 1 Tag, **strukturell einzigartig im Markt**)
- **P3-17** — Drei-Gruppen-Einkaufsliste + „hab ich zuhause"-Inventar (1–2 Tage, Markenkern als Mechanik)
- **P3-18** — SOS-Button im Plan-View (1–2 Tage, einziges Live-Hilfe-Feature im Markt, Premium-fähig)
- **P3-19** — KI-Rätsel-Gedichte für Schatzsuche (1 Tag, einzige API-Ausnahme, Wow-Anker)

**Tier 2 (große Würfe danach, 7–14 Tage):**
- **P3-20** — RSVP-Bridge: Partyseite-Zusagen verändern den Plan (2–3 Tage MVP / 5–7 Tage Vollausbau). Voraussetzung: P3-14 muss stehen.
- **P3-21** — Live-Party-Navigator: Tool führt am Tag durch die Party (5–7 Tage). Größter Wurf, größter Aufwand. Setzt P3-13/14/16/18 voraus.

## Was bewusst nicht im Sprint ist

In `BACKLOG-AUDIT.md` Sprint-Sektion eine Tabelle „Nicht-aufgenommene Vorschläge" mit ~13 Items aus den Sparring-Dokumenten + Begründung + Re-Evaluation-Trigger. Wichtigste Ausschlüsse: Stress-Chips als Wizard-Step (bricht Funnel-Axiom 0.1), Audio-Geschichte (Premium-Stufe 4), Eltern-Stats (braucht Traffic), Plan-B-Generator (Architektur-Bruch). Nicht „nie" — mit klaren Re-Eval-Triggern.

## P2-23 ist mit dem Sprint erfüllt

Bolle hatte in P2-23 bereits dokumentiert: „Motto-Seiten überholen den Planer inhaltlich → Funnel-Versprechen wackelt." Sprint P3-13 bis P3-19 ist die **operative Umsetzung** von P2-23. P2-23-Tabellen-Status auf 🔄 gesetzt, Verweis auf Sprint im Kommentar.

Nach Sprint-Abschluss freigeschaltet: **P2-24** (eingewebte Leckerli-CTAs auf Motto-Seiten) — Trigger laut Backlog war „wenn Planer-Output Elite-Niveau hat".

## Eine Mini-Inkonsistenz beim Schreiben

Sprint-PBIs als `### P3-XX` geschrieben, nicht `#### P3-XX` wie alle anderen PBIs im Doc. Innerhalb der Sprint-Sektion konsistent, doc-weit nicht. Bewusst so gelassen — Fix wäre Frickelei ohne Mehrwert.

## Was als nächstes ansteht

**Bolle hat klar gesagt: „Als Nächstes frisieren wir tagelang den Planer."** Heißt: Sprint-Start mit **P3-12 (Tier 0 Sofort-Fixes)** und dann P3-13/14 in dieser Reihenfolge, weil P3-14 das Constraint-Solver-Fundament ist, auf dem alle nachfolgenden PBIs aufsitzen.

Empfohlene Reihenfolge erste 3 Sessions:
1. **Session 1 (2 Std):** P3-12 komplett — Tier 0 ist erledigt, sauberer Stand
2. **Session 2 (8 Std):** P3-13 Cockpit-Header
3. **Session 3 (8 Std):** P3-14 Constraint-Solver mit Klartext-Box — **wichtigste Architektur-Entscheidung im ganzen Sprint**, alle nachfolgenden Features brauchen das saubere Fundament

**Parallel weiterlaufend (nicht im Sprint, aber auf Bolle-Liste):**
- P1-8 Safari (3-5, 9-12) und Weltraum
- P1-12 Einschulung SEO-Cluster bis 31.05. — **deadline ist überfällig** (heute 11.05., bleibt 20 Tage)
- P1-15 Email-Capture Extern-Tasks (Resend-Audience, Worker-Deploy) — Laptop-Session
- P1-17 DSGVO-Hygiene A+C — Laptop-Session
- Migadu-Entscheidung (Trial endete 08.05., heute 11.05.) — **3 Tage überfällig**

## Offene Fragen / Risiken

- **Capacity-Konflikt machsruhig.** Bolle hat dezidiert „beide Projekte primär" gesagt. 6–8 Wochen Sprint am Planer parallel zu machsruhig bei 6–8h/Woche Capacity ist eng. Wenn der Sprint priorisiert wird, muss machsruhig in der Zeit auf Sparflamme.
- **Inhalts-Aufwand P3-16/17/18 unterschätzbar.** Pro Motto sind das echte Schreib-Aufgaben (Vorbereitungs-Items, Kategorisierung der Einkaufsliste, SOS-Szenarien). Stub-Lösung möglich (Feuerwehr ausgebaut, Rest generisch), echter Vollausbau parallel zu P1-8.
- **P3-19 API-Kosten verifizieren.** 6–9€/Monat ist Schätzung. Vor produktivem Einsatz: 1–2 Tage Cache-Hit-Rate echt messen.
- **P3-20 RSVP-Bridge braucht Plan↔Partyseite-Verknüpfung.** Heute keine durchgehende ID-Brücke. Wenn das nicht erst sauber gelegt wird, ist die Bridge fragil.
- **OG-Bilder Feuerwehr** (`og-feuerwehr-3/6/9.png`) — bleibt offen aus 30.04.
- **Backdoor Tracker** (~07.04 angefangen) — Status weiter unklar.

## Strategie-Updates

Keine Änderungen an `STRATEGIE.md` heute. Sprint-Anker für „Planer als intelligentes Produkt" hängt sich an Strategie 0.7 (Monetarisierungs-Validierungs-Reihenfolge): P3-18 (SOS) und P3-19 (KI-Reime) sind beide Stufe-1-Validierungs-Vehikel (zahlen Eltern für digitale Mikro-Upsells?). Aufschreiben in STRATEGIE.md fällig, sobald erster Mikro-Upsell live geht.
