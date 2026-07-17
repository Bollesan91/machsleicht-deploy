# OFFENE-REVIEW-PUNKTE — verworfene False-Positives (Reviewer-Gedächtnis)

> Zweck (Helfer V4.1): Findings, die nach Stufe-3-Verifikation bewusst NICHT gefixt wurden.
> Pflicht-Anhang für jeden Review-Prompt, damit dieselben Punkte nicht in jeder Welle neu aufschlagen.

| # | Datum | Artefakt | Finding (Reviewer) | Warum verworfen |
|---|-------|----------|--------------------|-----------------|
| 1 | 17.07.2026 | party-worker.js (Welle 8, Nr. 10) | og:site_name „mach'sleicht" → „mach's leicht" | „mach'sleicht" ist die site-weite og:site_name-Konvention (index.html Z. 19, einladung/index.html u. a.). Nur den Worker zu ändern würde Inkonsistenz ERZEUGEN. Falls Bolle die Leerzeichen-Schreibweise will: site-weiter Sweep als eigenes PBI. |
| 2 | 17.07.2026 | Studio-Autopilot (Welle A1, Nr. 11) | autopilot_open-Undercount bei Same-Tab-Navigation (fetch vom Unload gekillt) | Bekannte Grenze aller onclick-Tracker. Primärmetrik ist studio_open{autopilot:true} + autopilot_shown (verlustfrei im Studio-Boot). autopilot_open bleibt als Intent-Zusatz. |
| 3 | 17.07.2026 | party-worker.js (Welle 10, Nr. 8) | 409-Existenz-Orakel: unbestätigter rsvp-POST verrät pro Name, ob ein Walk-in geantwortet hat | Designbedingt am Kollisionsschutz (Namens-Vertrauensmodell wie RSVP selbst, 90/h gedrosselt). Als akzeptiert im Code kommentiert (W10-8); Alternative würde den Warn-Dialog kosten. |
| 4 | 17.07.2026 | Studio-Autopilot (Welle A4, Nr. 1, Foto-Teil) | „Foto-Fokus deckelt auf 38/12/27" | Am Code widerlegt: die applyLayout-Fits kennen nur die Weiche `name==="clean"?x:y` — photo nutzt exakt die classic-Maxima (42/14/30). Nur der Clean-Teil des Findings war echt (gefixt in A4-1). |
| 5 | 17.07.2026 | party-worker.js (Welle 11, Nr. 2) | Invite-Gast kann Allergie/Abholung vom Zweitgerät nicht LEEREN (Erben greift) | Bewusster Trade-off statt Reviewer-Fix: dessen 409+leer→null-Weg würde den häufigen Fall (Statuswechsel vom Zweitgerät, Felder dort systembedingt leer) nach einem harmlos klingenden Confirm in VERSEHENTLICHES Löschen verwandeln — Erben ist die sicherere Vorgabe. Löschen geht übers Erstgerät oder den Host-Editor. Sauberer Fix (Server-Prefill der eigenen Werte für Token-Gäste, Identität ist tokensicher) → Backlog. |

Ältere False-Positive-Entscheidungen (vor Anlage dieser Datei) leben in SESSION-NOTES-Einträgen, u. a.: shareGuest-\n-Beifang (Design-Welle 6), poss()-Genitiv-Apostroph (Bolle-Stilentscheid, Memory), Umami auf ?g=-Gastseiten (bewusste Funnel-Entscheidung), /api/invphoto-403-Auth (anderes Produkt), KV-Read-modify-write-Race (dokumentierte Schuld, W10).
