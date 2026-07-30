# Premium-Geburtstagspaket — Piraten-Pilot (Handoff, 2026-07-30)

Bolle-Auftrag: Plan fürs Premium-Geburtstagspaket, Pirat zuerst. „Muss je nach Spielauswahl + Funnel + Einladungsgäste-Infos automatisiert und hochwertig erstellt werden." Konzept-Artifact gebaut (claude.ai/code/artifact/f236ab1c-a0d7-4f20-8544-bb6eddf26436).

## Produkt in einem Satz
Der Planer zeigt WIE, das Paket macht FERTIG: ein ~18-seitiges druckfertiges Piraten-Dossier + digitale Partyseite, auto-generiert aus vorhandenen Daten. Löst die bestehenden `SL_MODES`-Warteliste-Platzhalter (PDF + „Komplettpaket Print — Urkunden, Spielkarten, Einladungen, 15+ Seiten") in kindergeburtstag.html:2728 ein.

## Bolle-Entscheidungen (2026-07-30, fix)
1. **MVP-Schnitt: GLEICH MIT SCHICHT C** — von Anfang an echte Gästenamen/Urkunden aus dem party-worker (nicht erst A+B).
2. **Preis: 9–14 €** Digital-Dossier, Einzelkauf (kein Abo). Print-Paket 29–49 € erst später.
3. **Print: SPÄTER entscheiden** — MVP + V2 (digital) bauen, Fulfillment-Frage vertagen bis Digital-Zahlen da sind.
4. **Illustrationen: KI-generiert + kuratiert** → Umsetzung als saubere Vektor-/SVG-Illustrationen (print-safe, self-contained, ein konsistenter Stil über alle 15 Mottos).

## Datenfundament (Stufe-0 verifiziert am Worker)
`/api/party?id=<id>` (+ `editToken` für private Felder) liefert das volle Party-Objekt:
- **Schicht A (Plan):** `party.childName, date, time, endTime, address, age, motto, mottoId, mottoEmoji, notes`
- **Schicht B (Spiel):** `party.gameId` (gewähltes Einladungsspiel, GAME_CATALOG) + motto/alter-Standardspiele aus der Plan-Engine (data/motto/*.json, deterministisch)
- **Schicht C (Gäste):** `party.guests[]` (rsvpName/childName, `rsvpAllergies`, rsvpPickupTime/Person), `party.wishes[]` (Wunschliste)
→ **Kein Worker-Umbau nötig zum LESEN.** Generator liest die Party und füllt Templates.

## Bau-Architektur
- Generator-Seite (Vorschlag Route `/paket/piraten` bzw. auf party.machsleicht.de) fetcht die Party → merged mit Plan-Engine-Defaults → füllt Komponenten-Vorlagen (HTML/CSS print-optimiert, `@page`/A4) → Browser-Print-to-PDF (client-seitig, kein Server-Render nötig für MVP) + digitale Partyseite.
- **1 Design-System pro Motto** (Farb-/Schrift-/Ornament-/Illustrationstokens) → jede Komponente nutzt dasselbe → sieht aus wie EIN Produkt. Piraten = Blaupause, dann 14 Motto-Reskins (nur Look/Illustration, Inhaltslogik bleibt).
- Illustrationen als Inline-SVG (unendliche Druckauflösung, self-contained, CSP-safe).
- Checkout: `SL_MODES`-„Komplettpaket"-Button → Lemon Squeezy → Generierung/Freischaltung.

## Paket-Inhalt Piraten (~18 S., Details im Artifact)
Teil I Ablauf (Titelblatt, Minuten-Ablaufplan, Countdown) · Teil II Einkauf/Deko/Menü (Einkaufsliste+Amazon-Warenkorb, DIY, Menükarte) · Teil III Spiele (Schatzsuche-Set, Spielkarten+QR zu Digital-Spielen, Material-Checkliste) · Teil IV Gäste (Namens-Urkunden, Tischkärtchen/Etiketten, Wunschlisten-Blatt+Allergien, Namens-Einladungen).

## Roadmap (jeder Schnitt einzeln durchs Helfer-V4.1-Gate)
- **MVP (Piraten, A+B+C):** Generator + Piraten-Design-System + alle Komponenten aus dem Party-Objekt, client-PDF. Bolle-Entscheid: Schicht C von Anfang an.
- **V2:** Politur + Checkout-Verdrahtung (Lemon Squeezy) + Umsatz-Test.
- **V3:** 15 Motto-Reskins + (Entscheidung offen) Print-on-Demand-Fulfillment.

## Nächster Schritt (offen)
Piraten-Design-System + gerendertes Sample-Dossier (Titelblatt + Ablaufplan + Urkunde) mit authored SVG-Piratenkunst als „hochwertig"-Beweis → Bolle-Design-Freigabe VOR Pipeline-Verdrahtung.
