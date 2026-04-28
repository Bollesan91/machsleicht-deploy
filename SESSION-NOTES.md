# Session-Notizen

## Letzte Session
**Datum:** 28.04.2026 (Opus 4.7) — P1-8 Feuerwehr **alle 3 Altersgruppen Elite live** (parallel zu Safari-Session)

## Was wurde gemacht

### Feuerwehr 3-5 / 6-8 / 9-12 Jahre — drei Elite-Motto-Seiten (P1-8, alle Altersgruppen in einer Parallel-Session)

**Ergebnis:**
- `kindergeburtstag/feuerwehr-3-5-jahre.html` — 82 KB, valide, alle 7 validate-all.sh-Stufen grün
- `kindergeburtstag/feuerwehr-6-8-jahre.html` — 101 KB, valide, alle 7 Stufen grün
- `kindergeburtstag/feuerwehr-9-12-jahre.html` — 97 KB, valide, alle 7 Stufen grün
- `_dev/docs/feuerwehr-story.md` — Story-Framing-Doc (~8 KB) als Konsistenz-Anker

**Story-Framing festgelegt** (Konsistenz-Anker für alle 3 Altersgruppen):
- Leitnarrativ: „Echte Crew werden — Mini-Feuerwache mit Schichtdienst" (nicht „so tun als ob")
- Signature-Ritual durch alle Altersgruppen: **Schicht-Appell** mit Helm + Aufkleber/Tattoo + Foto + gemeinsamer Schichtbeginn-Spruch („Wir helfen, wo Hilfe gebraucht wird. Los geht\'s!")
- 12 Dienstausweise mit Vorname + Funktion (Max·Wachleiter, Lina·Funkerin, etc.) — bei 3-5 auf 5 vereinfacht
- Bewusst NICHT: Verniedlichung, Gewalt-Romantik, Männlichkeits-Klischees, Lizenz-Maskottchen

**Drei Altersgruppen-Konzepte:**

- **3-5-Jahre** (52 €/78 €/111 €, 5 Kinder, 1,5/2/2,5 h): 5 vereinfachte Crew-Funktionen, Aufkleber statt Tattoo, kein Wettbewerb, Eltern-bleiben-Pflicht (8× betont mit Aufgabenverteilung), Schaum-Löschen + Mini-Einsatz „Tiere retten" + (Wow:) eigener bemalbarer Pappkarton-Helm + Bilderbuch-Vorlesemoment + Tier-Rettungs-Parcours. Atemschutz, Brandermittlung, Nebelmaschine bewusst gestrichen — zu komplex/riskant. Bildungswert: „Vertrauen statt Angst, Sirene = jemand hilft, Fundament für später" (ehrlich, statt zu behaupten Kinder lernen 112 in dem Alter). Eigene Tip-Box „Tränen-Plan" (in dem Alter weint mindestens ein Kind in 90 Min.). 18 Affiliate-Links, alle compliant.

- **6-8-Jahre** (53 €/99 €/159 €, 6 Kinder, 2,5/3/3,5 h): Alle 12 Crew-Funktionen, Trupp-gegen-Trupp-Wettbewerb erlaubt, 4er-Stationen-Rotation (Zielspritzen, Knoten, Atemschutz-Parcours, Schlauch-Slalom), Einsatz-Alarm, Brandermittlung mit 4 Verdächtigen (Lösung: Köchin mit Fett-Pfanne, knüpft narrativ an Theorie-Briefing über Brandklassen an), (Wow:) Theorie-Briefing mit 5 W beim Notruf + Brandklassen + Rauchgefahr, Nebelmaschine, Polaroid-Ehrentafel, Crew-Pins. 22 Affiliate-Links. Erste Variante mit prominenter „Was die Kinder wirklich mitnehmen"-Bildungswert-Box, mit Verweis auf Deutsche Brandschutzerziehung.

- **9-12-Jahre** (106 €/136 €/196 €, 7-8 Kinder, 2,5/3/4 h): Eigenständigste Stimme der drei Seiten. Halb-erwachsene Tonalität, alle 12 Crew-Funktionen, Wettbewerb mit Stoppuhr, Eltern weg. **Brandermittlung als HAUPT-Mechanik** (60-90 Min., nicht Nebenrolle wie bei 6-8): Standard mit 4 Verdächtigen + Vernehmungs-Phase (Eltern als Schauspieler), Wow mit 6 Verdächtigen + 6 Beweisen + 8-Phasen-Struktur + UV-Taschenlampe für versteckten Hinweis + Plot-Twist (Wagner hat Akten vernichtet, ist aber NICHT Brandstifterin — Multi-Verbrechen-Logik). Wow-Bonus: Notruf-Simulation am Smartphone im Flugmodus, 5 W praktisch geprüft. Eigene Tip-Boxen: Smartphone-Regel (Aus/Foto-only/Sammelbox), Vorbereitungs-Realismus („4 Std vor dem Tag"). 24 Affiliate-Links.

**Methodik (alle 3 Seiten):**
- Iterativer Block-Aufbau: Hero+Age-Intro → Minimal → Standard → Wow → Block 5 (Kuchen, Eltern-Tipps, FAQ, etc.)
- HTML-Parse-Validation nach jedem Block (Python HTMLParser)
- Story-Doc-Konsistenz-Checks: Schicht-Appell-Box, Crew-Funktionen-Verankerung, Schichtbeginn-Spruch, Affiliate-Compliance, Schatzsuche-NICHT-in-Sticky-Bar (Feuerwehr hat keine eigene Schatzsuche)
- Drei Bolle-Reviews mit echten Korrekturen verarbeitet:
  - Crew-Namen vereinfacht (Vorname+sprechender Nachname → nur Vorname + Funktion)
  - Atemschutzträgerin ausgeschrieben (war zu kurz „Atemschutz" )
  - „Schicht beginnt!"-Spruch zu militärisch → ersetzt durch „Los geht\'s!"
- Vor 9-12-Start: 4 Logik-Fixes auf 3-5 (Bilderbuch-Halluzination raus, Helm-aus-Box-Logikbruch raus, Mitgebsel-Kosten korrigiert weil Helm im Standard nicht eingerechnet war, Wow-Helm-Bemalen-Dauer 25→20 Min für Timeline-Konsistenz)

**Affiliate-Compliance perfekt:** Alle 64 Affiliate-Links über die 3 Seiten haben `tag=machsleicht-21` und `rel="noopener sponsored"`. Keine Schatzsuche-Links in den Sticky-Bars (Story-Doc-Versprechen).

**Pflichtelemente alle erfüllt:** HowTo-Schema, FAQPage-Schema (4-5 Q&As pro Seite), OG/Twitter, Canonical ohne .html, Breadcrumb, Sticky-Bar, Final-CTA, WhatsApp-Share.

### Git-Workflow zwischen Parallel-Sessions

Bolle hat während meiner Session sein Safari-6-8-Update gepusht (`1d1694a`, parallele Session). Ich habe sauber synchronisiert:
1. Sicherheitskopien meiner 3 Files + Story-Doc nach `/home/claude/feuerwehr-backup/`
2. `git fetch + git reset --hard origin/draft` auf Safari-Stand
3. Backups zurückkopiert
4. Diff-Check: 0 Überlapp zwischen Feuerwehr- und Bolles Safari-Dateien

Pattern für künftige Parallel-Sessions: **Backup-vor-Reset → Reset → Restore → Diff-Verifikation**.

## Was bleibt als Nächstes

### Sofort offen (P1-8 fortsetzen)
- **safari-3-5-jahre.html** + **safari-9-12-jahre.html** (~3 h gesamt) — Bolles Parallel-Session
- **safari.html Mainseite** ggf. nachziehen (~30 Min)
- **Weltraum** (3 Altersgruppen) — als nächstes Motto nach Safari, ~4,5–5 h
- **Feuerwehr-Mainseite** `kindergeburtstag/feuerwehr.html` ggf. nachziehen, falls noch dünn (~30 Min)

### Mittelfristig im Backlog
- P1-8 nächstes Motto-Cluster: Detektiv → Meerjungfrau → Prinzessin/Superheld
- P3-4 Druckvorlagen pro Motto — Feuerwehr braucht: Crew-Diplom-Vorlage, 12 Dienstausweise zum Ausdrucken, Verdächtigen-Karten + Fall-Akte für 9-12 Brandermittlung, Theorie-Briefing-Plakate (5 W, Brandklassen, Rauch-am-Boden)
- P2-23 Planer-Output auf Elite-Niveau heben (Voraussetzung für P3 eingewebte CTAs)

### Aus vorheriger Session weiter offen
- **🗓️ 08.05.2026:** Migadu-Trial-Ende — Mini ($90/J) vs. Micro ($19/J) entscheiden
- **GMX-IMAP-Einbindung** für beide Business-Mailboxen (~15 Min)
- **#11 P1-17** DSGVO-Hygiene Partyseite A+C (1,5h)
- **#16 P1-12** Einschulung SEO-Cluster — Launch bis 31.05.
- **P1-15 Smoke-Test** (Newsletter-DOI-Flow) durch Bolle ausstehend

## Offene Fragen

- **Feuerwehr-Mainseite-Status:** Ich habe nur die 3 Altersgruppen-Seiten gebaut. Ob `kindergeburtstag/feuerwehr.html` als Übersichts-Mainseite noch dünn ist und nachgezogen werden muss, ist nicht geprüft. Quick-Check beim nächsten Mal.
- **OG-Bilder fehlen:** `og-feuerwehr-3.png`, `og-feuerwehr-6.png`, `og-feuerwehr-9.png` werden referenziert, müssen aber noch erstellt werden (analog zu Einhorn/Safari).
- **Sub-Tipp im 9-12-Wow zur UV-Taschenlampe:** Tonic-Wasser oder UV-Stifte zum Schreiben versteckter Hinweise — funktioniert in der Praxis. Eltern, die das machen, bestätigen das. Hat aber keine Quellen-Referenz, ist Erfahrungs-Hinweis.

## Status der Site nach diesem Deploy

- **Feuerwehr-Cluster komplett:** alle 3 Altersgruppen Elite-Niveau, kohärentes Story-Framing, Schicht-Appell als Signature-Ritual über alle Altersstufen, Bildungswert mit Bezug zu Deutscher Brandschutzerziehung
- **Brandschutz-Erziehung als USP:** Diese Seiten unterscheiden sich von Konkurrenten dadurch, dass sie echten Lehrwert haben (5 W beim Notruf, Brandklassen-Theorie, Rauch-am-Boden) — verpackt in Krimi-Mechanik, nicht als Schulstunde
- **Multi-Verdächtigen-Krimi für 9-12:** Plot-Twist mit „Wagner-Akten-Vernichtung" hebt die Brandermittlung über reine Detektiv-Standard hinaus — Eigenleistung, nicht aus Vorlage übernommen
- **Repo:** P1-8 Fortschritt: Einhorn ✅, Feuerwehr ✅, Safari (in Arbeit, 6-8 ✅), Weltraum/Detektiv/Meerjungfrau/Prinzessin/Superheld offen
