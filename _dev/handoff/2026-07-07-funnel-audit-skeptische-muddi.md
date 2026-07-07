# Funnel-Audit „Skeptische Muddi" — 2026-07-07

**Anlass:** Bolle nicht überzeugt, dass die Seite reif für Traffic ist („bevor ich vermiete muss Bett drin stehen + Heizung an"). Claude ist als skeptische Erst-Mutter den kompletten Funnel live durchgegangen (machsleicht.de → Planer → Plan → Einladung/Partyseite), Piraten / 6–8 J. / 6 Gäste / zuhause.

## Gesamturteil
**Der Kern ist GUT — überraschend gut. Bett + Heizung sind drin.** Homepage sauber → Planer adaptiv → **Plan-Output genuinely stark** → Handoff natürlich. Echtes Produkt mit echter Wertlieferung, kein Affiliate-Trichter. Der Grund, noch keinen Lärm zu machen, ist real aber **mild**: kein schwaches Fundament, sondern **eine substanzielle Engine-Redundanz + eine Schludrigkeits-Schicht an sichtbaren Stellen.** Tage-Arbeit, nicht Wochen. **Hochwertigerer Hebel als 45 Spiele auf 90 zu polieren.**

## Befunde nach Stelle

### Startseite — gut, kleine Macken
- ✅ Sauber, warm, kein Werbe-Lärm, kein Popup, kein Login-Zwang, Value Prop sofort da. Vertrauenswürdig.
- ⚠️ **Zeitangabe dreifach widersprüchlich:** Tab-Titel „in 10 Minuten", Headline „in 60 Sekunden", Planer-Badge „in 5 Minuten". EINE wählen.
- ⚠️ **Geleakte interne Notiz** als User-Box: „Nimm nur Dinge die Stress senken, Rückfragen vermeiden oder Kaufentscheidungen vereinfachen. Alles andere ist Schmuck." — liest sich wie Design-Prinzip-Notiz, nicht wie Mutter-Ansprache. Raus oder umschreiben.
- ⚠️ **Motto-Zahl inkonsistent:** Homepage „13 Mottos", Planer zeigt **15**. (Altes STRATEGIE.md sagt 9–10.) Überall auf 15.

### Planer Schritt 1–3 — stark
- ✅ Motto-Grid (15 + Eigenes), Fortschritts-Punkte (kurzer Flow), Alterskarten zeigen **konkret** was sich ändert (Dauer, #Spiele, #Stationen) → beruhigt, dass der Plan echt adaptiert.
- ✅ Datenschutz-Zeile genau richtig: „Was du eingibst bleibt auf deinem Gerät … erst wenn du selbst etwas erstellst, verlässt es dein Gerät."
- ⚠️ Resume-Banner „zuletzt bearbeitet vor **336 h**" → menschlich machen („vor 2 Wochen").
- ⚠️ Endzeit zieht beim Alterswechsel nicht mit (6–8 gewählt → Ende blieb 16:30 statt 17:00-Preset).

### Plan-Output — DAS STÄRKSTE STÜCK des Produkts
- ✅ Jedes Spiel: exaktes Material + Schritt-für-Schritt-Ansage + **echte spezifische Sicherheitswarnung** (PET statt Glas; Seil nie um Hals; nur Pool-Nudeln, kein Stechen; Sockenbälle) + Ort-Anpassung + **„Warum das funktioniert"** mit echter Pädagogik (kein Verlierer, langsameres Kind blockiert nicht, stiller Vorleser kriegt Bühnenmoment). Kindername in die Schatzsuchen-Story eingewoben. **Das ist FAR über „hätt ich gegoogelt".**
- 🔴 **MAJOR (substanziell, wahrscheinlich Bolles Haupt-Nag): Plan-Redundanz.** Die Engine zieht Spiele in den Zeitstrahl, die schon in der Schatzsuche stecken: **Knotenkunde 14:25 UND Schatzsuche-Station 3; Seeungeheuer 15:35 UND Station 2; Flaschenpost 14:15 UND Station 1.** Kinder machen dieselbe Aktivität zweimal in einem Nachmittag. Macht exzellenten Plan „algorithmisch aufgefüllt". → **Fix: Dedup-Regel — was Schatzsuchen-Station ist, nicht nochmal als eigener Programmpunkt.**
- ⚠️ Header „5 Spiele" vs. tatsächlich mehr Blöcke im Zeitstrahl — Zählung prüfen.

### Einladung + Partyseite (Handoff) — natürlich, NICHT angeklebt
- ✅ Zusammengelegt in EINEN Schritt: „Einladung & Partyseite — ein Link für alles: Einladung, Mini-Spiel, Foto & Gästeliste in einem."
- ✅ **Die Mini-Spiele sind hier der „Einladungs-Hook"** — genau der Ort, wo sie ihren Wert abwerfen (machen aus 08/15-WhatsApp etwas Öffnenswertes). Schließt den Kreis: Spiele = Haken dieses Schritts, kein Selbstzweck.
- ✅ Datenschutz nochmal mitgedacht: Veranstaltungsort „🔒 erscheint erst nach Gast-Zusage". Kein Paywall im Gesicht (Partyseite gratis, Geld downstream via Wunschliste-Affiliate). Richtig gebaut.
- ⏳ **Nicht auditiert:** Wunschliste + echte Gast-Sicht liegen erst NACH Aktivieren (= echte Partyseite anlegen = Daten erzeugen). Braucht Test-Party mit Bolle-OK.

## AUFRÄUM-LISTE (nächste Schritte, priorisiert)
1. **[HOCH] Plan-Redundanz-Dedup** — Schatzsuchen-Stationen dürfen nicht nochmal als Zeitstrahl-Spiele auftauchen. Höchster Hebel, direkt am Kern. (Engine: `kindergeburtstag.html` → `buildPlanActivities`/`renderElitePlan`.)
2. **[MITTEL] Zahlen-/Konsistenz-Sweep** — eine Zeitangabe (60s/5min/10min), 15 Mottos überall, „336h"→menschlich, interne Notiz-Box weg, Endzeit-Sync beim Alterswechsel.
3. **[LAUFEND] Spiele nur SHIP-SAFE** — die ~15 real benutzten (Attribution + kein toter Reveal), Rest einfrieren. NICHT alle 45 auf 90.
4. **[SPÄTER] Test-Party durchspielen** — Wunschliste + Gast-Sicht auditieren (braucht echte Aktivierung).

## Kernaussage für Bolle
Bauchgefühl stimmt, aber Diagnose milder als befürchtet: **Produkt fundamental gesund, mit Schönheitsfehlern an genau den sichtbaren Stellen.** Redundanz + Sweep fixen → berechtigt, Lärm zu machen. Die Spiele-Grind auf 90 ist die produktiv-*fühlende* Arbeit; die Aufräum-Liste ist der echte Hebel.
