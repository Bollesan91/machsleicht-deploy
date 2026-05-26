Ich hole beide Dateien und prüfe sie gegeneinander.

Jetzt der Wahrheits-Anker:

Beide Dateien geholt und gegeneinander geprüft. Hier das adversariale Review:

---

**SCORE: 88/100** (über Deploy-Schwelle 85 — aber mit einem YMYL-MUST-FIX, der vor Go-Live rein sollte)

Block-Wertung: Eltern-Mehrwert 9 · YMYL 7 · JSON-Treue 9 · Encoding/Marken 10 · Struktur 9 · Eltern-bleiben 8 · Tonalität 10 · Affiliate 10 · Schema 8 · SEO-Hygiene 8

---

**STÄRKEN**

- **JSON-Treue nahezu lückenlos.** Timelines, Spiele-Steps, Kosten (35/55/80 €, 6/7/10 € pro Kind), Rezept (250 g Butter, 175 °C, 45–50 Min.), preparationWeeks und alle 9 SOS-Szenarien sind 1:1 belegt. Keine erfundenen Fakten gefunden. Die HTML hat sogar die Encoding-Artefakte des JSON repariert (JSON: „Lautstaerke/3-Jaehrige" im Sensorik-Trait → HTML korrekt „Lautstärke/3-Jährige").
- **Encoding/Marken sauber: 0 Treffer.** Kein Star Wars/Trek, kein Buzz/Toy Story, kein Disney/LEGO-Space, kein Bee-Bot. UTF-8 durchgängig korrekt. Auch die GF-Markennamen aus dem JSON (Schaer/Bauckhof) wurden vorsichtshalber rausgenommen.
- **Die drei explizit geforderten YMYL-Punkte sitzen.** Knicklicht-Schluck (Sternen-Sammeln-Safety: „verschluckbar … Flüssigkeit reizt Mund und Augen"), Wasser-/Druck-Raketen Augen (Raketen-Start: „können ins Gesicht oder in die Augen treffen"), Pappkarton-Helm Sehfeld (Parcours: „keine engen Augen-Schlitze … frei nach vorn und zur Seite sehen"). Sauber ausformuliert, altersgerecht.
- **Tonalität exakt richtig für 3–5er.** Anti-Wettbewerb wird konsequent durchgezogen (kein Gewinner, alle sammeln gemeinsam, Fangen als Begrüßung). Ruhig, pragmatisch, kein Hype.
- **Struktur vollständig.** 12 H2, 3 Varianten-Panels (minimal/standard/wow mit funktionierendem `showVariant`), signatureRitual mit 7 Helfer-Rollen + optOut, Affiliate-Konvention perfekt (`&tag=machsleicht-21`, `rel="noopener sponsored"`, doppelte Disclosure).

---

**KRITISCHE SCHWÄCHEN**

- **YMYL-Widerspruch Leucht-Sterne (gravierendster Punkt).** Das Sternen-Sammeln-Safety-Feld warnt korrekt, dass Leucht-Elemente/Knicklichter „bei 3-Jährigen nicht in Kinderhand" gehören und „verschluckbar" sind. Gleichzeitig stehen „Ein kleiner Leucht-Stern" (Standard-Mitgebsel), „Leucht-Sterne" (Wow-Mitgebsel) und „Sticker, Leucht-Sterne und Urkunde in die Weltraum-Tütchen füllen" (Prep 1-Tag-vorher) im Text — also Mitgabe genau dieser verschluckbaren Glüh-Elemente an dieselbe 3–5-Gruppe als Take-home. Ein Elternteil, das der Seite folgt, drückt einem 3-Jährigen ein verschluckbares Leuchtteil in die Hand. Das ist eine echte interne Sicherheits-Inkonsistenz auf einer YMYL-3-5-Seite. (Stammt nicht aus Fehlinterpretation — die `giveaways`-Felder im JSON sagen das auch so; der Fehler ist also schon in Phase B angelegt.)
- **FAQ JSON-LD ↔ sichtbares HTML weichen ab (Rich-Result-Risiko).** FAQ #5: JSON-LD-Answer schreibt „Wer gefangen wird, wird mit High-Five…", das sichtbare `<details>` schreibt „Wer ‚gefangen' wird…" (mit Anführungszeichen). Google verlangt für FAQ-Rich-Results identischen Answer-Text. Kleiner, aber genau die Mismatch-Klasse, die wir sonst flaggen.
- **Meta-Description ~169 Zeichen — über 165.** Verbatim aus dem JSON übernommen. Der Schwanz „Kostenlos planen." wird in der SERP wahrscheinlich abgeschnitten.
- **„Eltern-bleiben" fehlt in der FAQ.** In Intro ✓, Age-Intro ✓, Eltern-Tipps ✓, Einladung ✓ — aber keine der 6 FAQ-Fragen adressiert explizit „dürfen Eltern dabei bleiben?". Für die Altersgruppe wäre das die naheliegendste Elternfrage und ein leichter SEO-/Snippet-Gewinn.
- **HowTo-Schema rendert faktisch nicht mehr.** Google hat HowTo-Rich-Results seit Sept. 2023 deaktiviert. Schema ist valide, aber zieht keine SERP-Wirkung mehr — kein Fehler, nur tote Last (kein Abzug, nur Info).

---

**FIX-VORSCHLÄGE (priorisiert)**

1. **MUST-FIX (YMYL, vor Deploy):** Leucht-Sterne als Mitgebsel/Prep mit dem bestehenden Safety-Text konsistent machen. Entweder (a) im Mitgebsel-Eintrag und im Prep-Schritt einen Caveat ergänzen — „große, nicht verschluckbare Leucht-Sterne, nur ab 4–5 J. und unter Aufsicht" —, oder (b) Leucht-Sterne im Mitgebsel durch ungefährliche Alternative ersetzen (Stern-Sticker / Tonpapier-Stern). Gleicher Fix sollte parallel ins JSON `giveaways` (Standard + Wow), sonst kommt er beim nächsten Render-Lauf zurück.
2. **Description auf ≤165 trimmen.** Z. B. „… Mond-Kuchen und Einkaufsliste. Jetzt planen." oder „Kostenlos planen" am Ende streichen → landet bei ~152.
3. **FAQ-JSON-LD #5 an sichtbaren Text angleichen** (oder umgekehrt): in beiden „‚gefangen'" mit Anführungszeichen oder in beiden ohne — Hauptsache identisch.
4. **Eine FAQ ergänzen:** „Sollen/dürfen die Eltern dabei bleiben?" mit der ohnehin vorhandenen Helfer-Crew-Antwort. Hebt Block 6 auf 10 und gibt eine zusätzliche Snippet-Chance. (Achtung: dann 7. FAQ auch ins FAQPage-Schema spiegeln.)

Netto: solide 88, deploybar — aber Fix #1 ist eine echte Kinder-Sicherheitsfrage und sollte nicht in den nächsten Sprint geschoben werden. Würde ich blocken, bis #1 drin ist; #2–#4 können auch im selben Aufwasch.