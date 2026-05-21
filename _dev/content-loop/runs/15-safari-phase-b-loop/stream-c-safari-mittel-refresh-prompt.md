# Stream C — safari-mittel.json Refresh & Konsistenz-Pass

Du bist **Writer-Subagent im Helfer-v3-Loop**. Aufgabe: existierende `_src/elite-motto-data/safari-mittel.json` (Safari 6-8 Jahre) auf den aktuellen Tier-2/4-Stand der HTML refreshen + Konsistenz mit den neuen safari-klein.json (Stream A) und safari-gross.json (Stream B).

## Output-Pfad
`_src/elite-motto-data/safari-mittel.json` (UPDATE existing — nicht von Null)

## Pflicht-Quellen (alle per Raw-URL ziehen)

1. **HTML-Quelle (aktuelle Tier-2/4-Edits):** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/kindergeburtstag/safari-6-8-jahre.html
2. **Aktuelle safari-mittel:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/safari-mittel.json
3. **Schema-Doku:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/README.md
4. **Pattern-Referenz mittel:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/feuerwehr-mittel.json + einhorn-mittel.json

## Aufgabe

Die safari-mittel.json wurde am 2026-05-19 erstellt, **bevor** die Tier-2/4-Edits am safari-6-8-jahre.html durchliefen. Konsistenz-Check + Refresh:

1. **Story-Anker:** Sind die neuen Phrasen "Jede Pirsch beginnt leise." und "Die Urkunde bekommt jeder Helfer" in der safari-mittel verankert? Falls nicht: einbauen.

2. **Wasserstelle vs. Wasserloch:** Reservat-Begriffe konsistent (Tier-Edit hat Wasserloch im Zeitplan-Apparat raus, nur im Briefing belassen).

3. **Tier-Helfer-Konsistenz:** Bei 6-8 mit Anwärter/Ranger statt nur "Helfer" — checken.

4. **Konsistenz mit klein + gross:** safari-mittel sollte die Brücke zwischen klein (Tier-Helfer pur) und gross (Reservat-Expedition mit Spezialisierungen) sein. Spezialisierungs-Mechanik in mittel ankündigen, ohne sie schon voll auszuspielen.

5. **shoppingList[].category** prüfen — falls Items noch ohne category, ergänzen.

6. **preparationWeeks + sosScenarios** prüfen ob vollständig + 6-8-spezifisch.

7. **Polish:** "Sweet Spot", "emotional wertvollsten" als Marketing-Sound raus (falls vorhanden).

## Anforderungen

- **Detailtiefe:** ~60-70 KB JSON (mittel ist die "Golden Template"-Zone)
- **Bolle-Ton:** lakonisch, mama-respektierend
- **Schema-strikt:** wie klein/gross
- **steps ≤120 Zeichen**

## Output

Schreibe die aktualisierte JSON-Datei direkt nach `_src/elite-motto-data/safari-mittel.json`. Encoding UTF-8. 

Liefere zusätzlich einen **Diff-Report** (5-10 Zeilen): Was wurde geändert vs. alt? Welche Sektionen sind unverändert geblieben? Konsistenz-Brücken zu klein/gross identifiziert?

## Anti-Patterns

- Komplett-Rewrite ohne den bestehenden Content zu nutzen (das wäre Verlust)
- Tier-Edits ignorieren (die sind genau das, was refreshed werden soll)
- Inkonsistenz mit den neuen klein/gross (parallel zu Stream A+B denken)
