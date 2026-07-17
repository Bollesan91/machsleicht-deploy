# OFFENE-REVIEW-PUNKTE — verworfene False-Positives (Reviewer-Gedächtnis)

> Zweck (Helfer V4.1): Findings, die nach Stufe-3-Verifikation bewusst NICHT gefixt wurden.
> Pflicht-Anhang für jeden Review-Prompt, damit dieselben Punkte nicht in jeder Welle neu aufschlagen.

| # | Datum | Artefakt | Finding (Reviewer) | Warum verworfen |
|---|-------|----------|--------------------|-----------------|
| 1 | 17.07.2026 | party-worker.js (Welle 8, Nr. 10) | og:site_name „mach'sleicht" → „mach's leicht" | „mach'sleicht" ist die site-weite og:site_name-Konvention (index.html Z. 19, einladung/index.html u. a.). Nur den Worker zu ändern würde Inkonsistenz ERZEUGEN. Falls Bolle die Leerzeichen-Schreibweise will: site-weiter Sweep als eigenes PBI. |
| 2 | 17.07.2026 | Studio-Autopilot (Welle A1, Nr. 11) | autopilot_open-Undercount bei Same-Tab-Navigation (fetch vom Unload gekillt) | Bekannte Grenze aller onclick-Tracker. Primärmetrik ist studio_open{autopilot:true} + autopilot_shown (verlustfrei im Studio-Boot). autopilot_open bleibt als Intent-Zusatz. |

Ältere False-Positive-Entscheidungen (vor Anlage dieser Datei) leben in SESSION-NOTES-Einträgen, u. a.: shareGuest-\n-Beifang (Design-Welle 6), poss()-Genitiv-Apostroph (Bolle-Stilentscheid, Memory), Umami auf ?g=-Gastseiten (bewusste Funnel-Entscheidung), /api/invphoto-403-Auth (anderes Produkt), KV-Read-modify-write-Race (dokumentierte Schuld, W10).
