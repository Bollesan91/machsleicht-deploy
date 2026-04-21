# TASKS.md — Autoloop-Queue

Tickets werden von oben nach unten abgearbeitet. Status-Werte: `[ ]` offen, `[WIP]` blockiert, `[x]` erledigt.

---

## [ ] Einhorn 3-5 Jahre auf Elite-Niveau

**Branch:** `feat/einhorn-3-5`

**Briefing:** Baue `kindergeburtstag/einhorn-3-5-jahre.html` auf Elite-Niveau nach dem Blueprint `kindergeburtstag/einhorn-6-8-jahre.html`. Das Narrativ "Regenbogen-Wächter-Ausbildung" wird übernommen, aber altersgerecht adaptiert für 3-5 Jahre:

- **Keine Prüfungen.** Stattdessen "Entdeckungen" oder "Wunder" — die Kinder *sind* schon Wächter, sie müssen es nicht erst werden.
- **Kürzere Slots.** Maximal 15 Min pro Aktivität. 3-5-Jährige verlieren danach Konzentration.
- **Mehr Staunen, weniger Regeln.** Sensorische Erlebnisse stehen im Vordergrund (Farben, Glitzer, Weiches Anfassen, Musik).
- **Sternenstaub-Beutel-Ritual bleibt** als Signature-Element, aber: kein Wächter-Pass mit Schreibarbeit (können meist noch nicht schreiben). Stattdessen: **Aufkleber auf die Brust** mit "Einhorn-Wächter ___" oder vorgedruckte Namens-Karten zum Aussuchen.
- **Einhorn-Tattoo bleibt** — funktioniert auch für die Altersgruppe.
- **3 Varianten** (Minimal/Standard/Wow) wie bei 6-8.
- **Wow-Variante mit aufblasbarem Einhorn-Kostüm bleibt** — funktioniert für 3-5 sogar besser, weil größerer Wow-Faktor.
- **UV-Schwarzlicht-Variante streichen** — zu komplex, zu viel Setup, könnte Kinder dieser Altersgruppe sogar erschrecken.

**Abgenommen wenn:**
- `bash validate-all.sh` zeigt PASSED
- `python3 _build/audit-all-pages.py` zeigt für die Datei ≥80% Score (3-5 hat von Natur aus weniger Content-Tiefe als 6-8, daher etwas niedrigerer Threshold)
- Beide JSON-LD-Schemas valide
- 3 Varianten vollständig implementiert
- Sternenstaub-Beutel-Ritual altersgerecht adaptiert
- Kuchen-Fallback-Box drin (Fondant-Alternative)
- Feature-Branch `feat/einhorn-3-5` committed und gepusht

**Blueprint:** `kindergeburtstag/einhorn-6-8-jahre.html`

---

## [ ] Einhorn 9-12 Jahre auf Elite-Niveau

**Branch:** `feat/einhorn-9-12`

**Briefing:** Baue `kindergeburtstag/einhorn-9-12-jahre.html` auf Elite-Niveau nach dem Blueprint `kindergeburtstag/einhorn-6-8-jahre.html`. Das Narrativ wird in dieser Altersgruppe **anspruchsvoller und subversiver**:

- **Mystische Wächter statt süße Einhörner.** Kinder dieser Altersgruppe wollen nicht "rosa-niedlich". Die Ästhetik geht in Richtung "magisches Mysterium": tiefere Farben (Indigo, Smaragd, Violett, Gold), weniger Pastell.
- **Echte Rätsel.** Logik-Aufgaben, Knobelei, Verschlüsselungen. Wolkenwald-Rätselrallye wird komplexer (Caesar-Cipher light, mathematische Hinweise, mehrstufige Lösungen).
- **Einhorn-Wissens-Quiz prominenter.** Mindestens 15 Fragen in 3 Schwierigkeitsstufen. Echte Mythologie (griechisch, keltisch, asiatisch), nicht nur Disney.
- **Optional: Escape-Room-Element** als Wow-Variante — die Kinder sind in einem "verzauberten Raum gefangen" und müssen 4-5 Rätsel lösen, um herauszukommen.
- **Sternenstaub-Beutel-Ritual altersgerecht aufwerten.** Längere Hintergrundgeschichte zu jedem Namen (z.B. "Luna Mondsilber: Hüterin der nächtlichen Träume"). Wächter-Pass wird ernster, hat eigene Schreibplätze für selbst erfundene Wächter-Eide.
- **Kein UV-Schwarzlicht** in dieser Altersgruppe (zu kindlich-magisch wirkend), stattdessen: **Geheimschrift mit Zitronensaft** (Hitze-aktivierte Botschaft) als optionaler Bonus.
- **3 Varianten** (Minimal/Standard/Wow) wie bei 6-8.

**Abgenommen wenn:**
- `bash validate-all.sh` zeigt PASSED
- `python3 _build/audit-all-pages.py` zeigt für die Datei ≥85% Score
- Beide JSON-LD-Schemas valide
- 3 Varianten vollständig implementiert
- Einhorn-Wissens-Quiz mit ≥15 Fragen in 3 Schwierigkeitsstufen
- Wolkenwald-Rätselrallye mit echten Logik-Rätseln (nicht trivial)
- Sternenstaub-Beutel-Ritual ans Alter angepasst (mehr Story-Tiefe)
- Optional: Escape-Room-Konzept in Wow-Variante
- Feature-Branch `feat/einhorn-9-12` committed und gepusht

**Blueprint:** `kindergeburtstag/einhorn-6-8-jahre.html`

---

## ZUKÜNFTIGE TICKETS (nicht im aktuellen Autoloop-Lauf)

Die folgenden Tickets sind für spätere Läufe vorbereitet, aber NICHT im aktuellen 2-Ticket-Test enthalten. Der Autoloop stoppt nach den ersten zwei Tickets.

### [ ] Safari 6-8 Jahre auf Elite-Niveau
**Branch:** `feat/safari-6-8`
**Briefing:** Eigenes Signature-Ritual definieren (kein Copy von Einhorn-Sternenstaub).

### [ ] BACKLOG P3-8 Reparatur
**Branch:** `fix/backlog-p3-8`
**Briefing:** Vervollständige abgeschnittenes Ticket P3-8 in BACKLOG-AUDIT.md.

### [ ] Einhorn-Wächterpass als Druckvorlage
**Branch:** `feat/einhorn-waechterpass`
**Briefing:** Analog zu dino-forscherpass.html.

### [ ] Einhorn-Namens-Druckvorlage
**Branch:** `feat/einhorn-namensliste`
**Briefing:** A4-Print-Layout mit 12 Streifen für Sternenstaub-Beutel.

---

## ERLEDIGTE TICKETS

(wird gefüllt nach Abschluss)

---

## Queue-Leer-Verhalten

Wenn der Autoloop in Runde 4 entdeckt, dass keine `[ ]` Tickets mehr verfügbar sind: schreibe `AUTOLOOP_QUEUE_LEER` in Großbuchstaben oben in die Antwort. Das AutoHotkey-Tool stoppt dann.

Im aktuellen 2-Ticket-Test: Tool stoppt sowieso nach Ticket 2 (Hard-Cap MAX_TICKETS = 2 in der `.ahk`).
