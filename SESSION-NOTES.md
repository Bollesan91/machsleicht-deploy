# Session-Notizen

## Letzte Session
**Datum:** 04.04.2026

## Was wurde gemacht

### Planer-Umbau (kindergeburtstag.js + kindergeburtstag.html)

- **JS prettifyed:** 70 minifizierte Zeilen → 6.788 lesbare Zeilen (npx prettier)
- **Control Hub (Fixed Bottom Bar):** Einladung / Schatzsuche / PDF als permanente Aktions-Leiste am unteren Bildschirmrand (position:fixed, blur-backdrop, zIndex 100)
- **Einladungs-Block:** Dark Card mit WhatsApp-Preview-Bubble direkt nach Motto Badge. Verlinkt auf /einladung/erstellen/?motto=X. Copy: "8 Kinder einladen — in 30 Sekunden"
- **Visueller Connector:** "Die Einladung teast die Schatzsuche an" mit vertikalen Linien als narrativer Bogen
- **Schatzsuche-Teaser:** "30 Minuten Abenteuer. Du trinkst Kaffee." Block mit personalisierten Daten (Motto, Kinder, Alter, Ort). "Passt in deinen Zeitplan" Hinweis
- **Zeitplan auf Accordion umgebaut:** Jeder Schritt als details/summary mit kompakter Summary-Zeile (Zeit + Name + Dauer). Nur erster Schritt standardmäßig offen. Vertikale Timeline-Linie entfernt
- **Redundante CTAs entfernt:** Alte "Einladungskarte erstellen" und "Noch eine Schatzsuche dazu?" Blöcke unten raus — jetzt oben prominent + im Control Hub
- **CSS:** #root details > summary Marker ausgeblendet für sauberes Accordion-Design
- **PDF Scroll-Target:** data-action="pdf" auf PDF-Sektion fuer Control Hub Button

### Neue Plan-View Reihenfolge
Motto Badge → Einladung (NEU) → Connector (NEU) → Schatzsuche-Teaser (NEU) → Bereitschafts-Check → Mode-Toggles → Zeitplan (Accordion) → Snacks → Deko → Mitgebsel → WhatsApp Share → Einkaufsliste → PDF → Erinnerung → "Das reicht" → Upsell → Control Hub (fixed, NEU)

### Design-Referenz
Teaser-V2 Konzept (aus frueherer Session) als Vorlage verwendet. Kernprinzipien: Personalisierung, narrativer Bogen, Score-Motor, "Zeigen statt beschreiben"

## Nächste Schritte
- **Live testen:** Accordion-Verhalten auf Mobile prüfen, Control Hub Ueberlappung mit Sticky CTA checken (u-sticky-cta vs Control Hub — evtl. Sticky CTA im Plan-View ausblenden)
- **Score-Loop verdrahten:** Einladung verschickt → Score +11%, Schatzsuche erstellt → Score +X%
- **Einladungs-Block interaktiv machen:** Name-Buttons wie im Teaser-V2 (Kinder-Namen tippen → Live WhatsApp-Preview)
- **Schatzsuche-Teaser: Stationen-Explorer** — 5 Stationen anteasern mit locked/unlocked State
- **Affiliates in Zeitplan einweben** — Amazon-Links direkt bei Material-Listen
- **Meerjungfrau finalisieren** (Zeitangaben, Spiel 5, Material-Check)
- **Ritter** als naechstes Motto expandieren

## Offene Fragen
- Control Hub vs. bestehende Sticky CTA Bar (u-sticky-cta): Doppelt? Sticky CTA nur auf Config-View zeigen, Control Hub nur auf Plan-View?
- Accordion default-open: Nur erster Schritt oder alle offen auf Desktop?
- Einladungs-Block: Soll der Verschickt-Counter persistent sein (localStorage) oder nur Session?
