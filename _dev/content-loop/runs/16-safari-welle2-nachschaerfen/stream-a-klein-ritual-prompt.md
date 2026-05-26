# Stream A — safari-klein.json Nachschärfen: Ritual + Konsistenz

Aufgabe: Existierende `_src/elite-motto-data/safari-klein.json` (Safari 3-5) anpassen — Ritual ergänzen + Konsistenz mit safari-mittel ("Der Ranger-Eid & die Lizenz-Übergabe") herstellen.

## Materialien (Raw-URLs)

- **Aktuelle safari-klein.json:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/safari-klein.json
- **safari-mittel.json (mit Ranger-Eid-Ritual):** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/safari-mittel.json
- **HTML-Quelle:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/kindergeburtstag/safari-3-5-jahre.html
- **Schema-Doku:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/_src/elite-motto-data/README.md

## Bug zu fixen

safari-klein hat `signatureRitual: null`, safari-mittel hat aber **"Der Ranger-Eid & die Lizenz-Übergabe"**, safari-gross ist `null`. Das ist Inkonsistenz. Für die 3-5-Altersgruppe brauchen wir ein altersgerechtes Helfer-Ritual als Brücke.

## Neues Ritual für 3-5 (entwerfen)

Konzept: **"Der kleine Helfer-Versprechen & die Urkunden-Übergabe"** (oder ähnlich altersgerecht). Bei 3-5 ist es:
- **Kein** komplexer Eid (Kinder verstehen den Begriff nicht)
- **Wohl** ein kurzer, ritueller Moment: Stirnband aufsetzen + "Heute helfe ich den Tieren" laut sagen
- Lizenz-Begriff vermeiden (siehe Tier-Edits in HTML), stattdessen **Urkunde**
- Eltern als aktive Begleiter (3-5 brauchen Eltern-Nähe)

Struktur (aus safari-mittel kopiert + adaptiert):
```json
"signatureRitual": {
  "name": "Das kleine Helfer-Versprechen",
  "subtitle": "Eröffnet die Party + Übergabe am Ende",
  "introText": "Warum dieses Ritual für 3-5 wirkt: ...",
  "setupSteps": [{"title":"...","content":"..."}] x 4-5,
  "rolesList": [{"emoji":"...","name":"...","function":"..."}] x 6-8,  // Tier-Helfer-Rollen (Löwen-Helfer, Affen-Helfer, etc.)
  "optOutNote": "Wenn ein Kind nicht will: ...",
  "materialNote": "Stirnband (Pflicht) + Urkunde-Vorlage"
}
```

## Pflicht-Changes

1. `signatureRitual` von `null` auf vollwertiges Ritual-Objekt setzen (Struktur wie oben, analog safari-mittel)
2. Konsistenz-Check mit klein-HTML: Story-Anker (Tier-Helfer, Reservat, Pirsch) im Ritual reflektieren
3. **Rest der Datei unverändert lassen** (alle anderen Sektionen sind valide)

## Output

Neue komplette safari-klein.json schreiben (im Code-Block / Artifact als JSON), Download-Button erzeugen. ALLE bestehenden Felder erhalten + nur `signatureRitual` ersetzen.

## Anti-Patterns

- "Lizenz"-Begriff für 3-5 verwenden (zu komplex, Tier-Edit hat das in HTML rausgenommen)
- Komplexe Rollen-Hierarchie wie bei 6-8 (3-5 brauchen einfache Helfer-Identität)
- Ritual als reines Stirnband-Anlegen ohne Versprechen-Substanz (das wäre Theater)
- Bestehende Felder ändern außer `signatureRitual`
