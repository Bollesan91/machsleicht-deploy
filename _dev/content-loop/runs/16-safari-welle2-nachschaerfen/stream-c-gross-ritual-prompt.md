# Stream C — safari-gross.json Nachschärfen: Ritual ergänzen

Aufgabe: Existierende `_src/elite-motto-data/safari-gross.json` (Safari 9-12) anpassen — Ritual ergänzen + Konsistenz mit safari-mittel ("Der Ranger-Eid & die Lizenz-Übergabe") herstellen.

## Materialien (Raw-URLs)

- **Aktuelle safari-gross.json:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/safari-gross.json
- **safari-mittel.json (mit Ranger-Eid):** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/safari-mittel.json
- **HTML-Quelle:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/kindergeburtstag/safari-9-12-jahre.html
- **Schema:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/README.md

## Bug zu fixen

safari-gross hat `signatureRitual: null`, safari-mittel hat aber **"Der Ranger-Eid & die Lizenz-Übergabe"**. Inkonsistent. Für 9-12 brauchen wir ein altersgerechtes Spezialisten-Ritual.

## Neues Ritual für 9-12

Konzept: **"Die Spezialisten-Aufnahme & Lizenz-Übergabe"** (oder ähnlich). Bei 9-12 ist es:
- Echte Ritualtiefe: Brief der Reservat-Leitung wird vorgelesen
- Spezialisierungs-Wahl (Späher / Tierfotograf / Spurenleser) ist Teil des Rituals — analog Codeknacker-Konzept aus HTML
- Volle Lizenz für alle am Ende (nicht "Anwärter-Lizenz" — das wurde im Tier-Edit eliminiert)
- "Sorgfalt-Spezialist"-Stempel als Anerkennung (NICHT "1. Spezialist"-Tempo)
- Eltern als Beobachter, nicht aktive Begleiter

Struktur (aus safari-mittel kopiert + auf 9-12 adaptiert):
```json
"signatureRitual": {
  "name": "Die Spezialisten-Aufnahme & Lizenz-Übergabe",
  "subtitle": "Eröffnet die Mission + Lizenz-Vergabe am Ende",
  "introText": "Warum dieses Ritual für 9-12 wirkt: ernst genommen werden, eigene Wahl der Spezialisierung, echte Verantwortung statt Bespaßung. ...",
  "setupSteps": [{"title":"...","content":"..."}] x 5,
  "rolesList": [{"emoji":"...","name":"...","function":"..."}] x 9-12, 
    // 3 Spezialisierungen × 3-4 Rollen jeweils:
    // Späher: Adler-Beobachter, Reservat-Späher, Tier-Identifizierer
    // Tierfotograf: Foto-Späher, Bildausschnitt-Detektiv, Foto-Mission-Leader
    // Spurenleser: Fährten-Analyst, Karten-Vermesser, Pfad-Tracker
  "optOutNote": "Wenn ein Kind sich nicht entscheiden will: Spezialisten-Trio oder Beobachter-Rolle ohne Druck",
  "materialNote": "Spezialisten-Patches + Reservat-Karten + Lizenz-Vorlagen (Pflicht), Stempel 'Sorgfalt-Spezialist' (Sinnvoll)"
}
```

## Pflicht-Changes

1. `signatureRitual` von `null` auf vollwertiges Ritual-Objekt setzen
2. Konsistenz-Check mit gross-HTML: Spezialisierungs-Mechanik + "Sorgfalt-Spezialist" + Reservat-Brief-Mission
3. **Rest der Datei unverändert lassen**

## Output

Neue komplette safari-gross.json schreiben (Artifact + Download). ALLE bestehenden Felder erhalten + nur `signatureRitual` ersetzen.

## Anti-Patterns

- "Anwärter-Lizenz"-Konzept (eliminiert!)
- "1. Spezialist"-Stempel (Tempo, widerspricht Hero-Botschaft)
- Verkindischende Rollen-Namen ("Tier-Detektiv-Junior")
- Bestehende Felder ändern außer signatureRitual
- Marketing-Sound ("Sweet Spot", "emotional wertvollste")
