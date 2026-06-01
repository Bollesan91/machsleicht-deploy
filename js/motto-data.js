/*
 * motto-data.js — Single Source of Truth für die Wizard-Spieldaten (P8-X Migration).
 * Geladen via <script src="/js/motto-data.js"> → window.MOTTO_DATA (kein Build-Step).
 * Schema + Review-Regeln: _dev/review/game-rubric.md
 *
 * Jedes Spiel durchläuft Helfer-v3 (Branch-Trick + unabhängiger No-Target-Reviewer)
 * und braucht zwei aufeinanderfolgende frische Reviews >= Gate (Signature 90 / Staple 85),
 * bevor es hier eingetragen wird.
 */
window.MOTTO_DATA = {
  games: [
    {
      id: "walk-the-plank",
      motto: "piraten",
      class: "staple",
      emoji: "🪜",
      name: "Walk the Plank",
      desc: "Über die schmale Planke balancieren — den goldenen Schatz auf dem Löffel, vorbei am Hai-Wasser zur Schatzkiste",
      ages: ["3-5", "6-8", "9-12"],
      bestAge: "6-8",
      type: "aktiv",
      players: { min: 1, ideal: "4–10", max: null, solo: true },
      groupScaling:
        "4–6: 2–3 Bahnen parallel (Material pro Kind), kaum Wartezeit · " +
        "7–10: zwei Bahnen, zwei Teams als Staffel gleichzeitig — sobald ein Kind abgeliefert hat, startet das nächste; es gewinnt das Team, dessen Crew zuerst komplett+sauber abgeliefert hat · " +
        "11+: Faustregel ~1 Planke pro 6 Kinder (12→2, 18→3) ODER 3-Wellen-Modus à ~5 Min; als Stationen-Rotation auf ~5 Min/Welle takten",
      dauer: "10–15",
      prep: 7,
      teardown: 5,
      indoor: "both",
      material: [
        "Kreppband, 1 Rolle — zwei parallele Linien als schmale Planke. Bahnbreite altersabhängig: 3-5 = 20–30 cm, 6-8 = 15–18 cm, 9-12 = 10–12 cm. Länge 3 m (Kompakt-Variante ab 2 m, wenn der Platz fehlt).",
        "1 Löffel pro Kind als Schwierigkeits-Hebel: 3-5 großer Servier-/Esslöffel (leicht), 6-8 Esslöffel, 9-12 Teelöffel (schwer). Plastik oder Holz — KEIN Metall (Sturzrisiko).",
        "1 weicher Schaumball ≥4,5 cm pro Kind als Goldschatz (rollt nicht weg, EN-71-konform für 3-5 über der 44,5-mm-Klein-Ball-Schablone). Fertig gelber Tischtennisball (40 mm) nur ab 6 J UND nur indoor; outdoor immer Schaum-/Flummiball ≥4,5 cm (Wind). Nicht selbst anmalen.",
        "1 niedriger Eimer/Schatzkiste als Ziel, auf knie- bis hüfthoch (knapp unter Löffelhöhe), damit der Schatz ohne Bücken hineinfällt.",
        "Hai-Wasser sichtbar: indoor blaues Tuch/Kreppstreifen beidseits; outdoor auch mit Kreide (Kreide NUR outdoor). Optional Papp-Flossen.",
        "Piraten-Stempel + hautfreundliches/abwaschbares Stempelkissen ODER allergiearmer Crew-Aufkleber (Fallback: Filzstift-Punkt auf den Handrücken).",
        "Optional: Augenklappe/Bandana pro Kind. Für echten Foto-Wow ein stabiles Holzbrett (~20–30 cm breit, 2–3 cm dick) flach am Boden statt der Klebebahn (+~15 €, +3 Min).",
        "Belohnung nur ab 6 J: Schoko-Goldmünzen NACH dem Lauf (nicht auf dem Löffel). Für 3-5 ist der Stempel die Crew-Bestätigung.",
      ],
      anleitung: [
        "0. Optional (10 Sek, hebt die Immersion): kurze Crew-Vereidigung — „Wer den Goldschatz über die Planke bringt, ohne ihn an die Haie zu verlieren, gehört zur Crew!\"",
        "1. Zwei parallele Kreppband-Linien (15–18 cm Abstand, 3 m) kleben — der Streifen dazwischen ist die Planke. Beidseits blaues Tuch/Kreppstreifen als Hai-Wasser.",
        "2. Jedes Kind bekommt einen Löffel mit seinem Goldschatz (Ball) drauf.",
        "3. Auf „Leinen los!\" ruhig über die Planke gehen (kein Rennen — Hektik kostet den Schatz) und ihn in die Schatzkiste fallen lassen.",
        "4. Fehler = der Ball fällt ODER ein Fuß setzt sein Gewicht seitlich aufs Hai-Wasser (beide Füße müssen zwischen den Linien bleiben; Rand berühren ist ok). Dann: Ball aufheben, neu vom Start — KEINE Elimination. Jedes Kind hat 3 Fehlversuche pro Lauf (vorab eine:n Schiri bestimmen — Erwachsene:r oder ältestes Kind — der/die zählt und Linie/Wasser entscheidet), danach darf der Ball festgehalten werden.",
        "5. Siegbedingung: Wer abliefert, ist Crew-Mitglied + Stempel + (ab 6 J) Schoko-Goldmünze. Alle Lieferer gewinnen; im Wettlauf zählt nur der Team-Sieg, kein Einzel-Ranking.",
        "6. Schwierigkeit justieren über Löffelgröße (kleiner = schwerer) und Bahnbreite (schmaler = schwerer).",
      ],
      safety:
        "Ebener, rutschfester Boden. Indoor mit Schuhen oder Anti-Rutsch-Socken (Strümpfe rutschen auf Kreppband). Outdoor nur trocken/eben — feuchtes Gras ist rutschig (Matte drunter oder reinverlegen). Plastik-/Holzlöffel, kein Metall. Für 3-5: enge Aufsicht + ausschließlich Schaumball ≥4,5 cm, keine Münze auf dem Löffel. Hautfreundliche Stempeltinte. Erhöhte Planke nur ab 6 J (Variante), max. ~10 cm, rutschfeste Matte Pflicht + Erwachsene:r als Spotter in Armreichweite.",
      inclusion:
        "Kinder mit Bewegungs-/Koordinationseinschränkung: breitere Bahn + Festhalten jederzeit (auch ≥6) ODER Rolle als Schiri/Schatzmeister:in — niemand ist struktureller Team-Verlierer.",
      mess: "gering-mittel — Bälle rollen weit (Sammelzone + Ball-Sammler:in). Abbau: Kreppband langsam abziehen, Rückstände mit warmem Wasser lösen.",
      variants: {
        "3-5": {
          name: "Deck-Abenteuer",
          desc: "Breite Planke flach am Boden — ehrlich ein Lauf-/Erlebnisspiel, kein Geschick-Anspruch",
          detail:
            "Breite Bahn 20–30 cm oder flaches Brett; Schaumball ≥4,5 cm; großer Servierlöffel; Ball+Löffel jederzeit festhalten erlaubt; kein Tempo, kein Rauswurf, mehrere Bahnen parallel; jedes Kind kommt ans Ziel und bekommt den Crew-Stempel.",
        },
        "9-12": {
          name: "Piraten-Bootcamp",
          desc: "Schmale, leicht erhöhte Planke + Mutprobe mit verbundenen Augen",
          detail:
            "Bahn 10–12 cm, Teelöffel (schwer), leicht erhöht (max. ~10 cm) auf stabiler durchgehender Unterlage (niedrige breite Bank oder stabiles Brett — KEINE Hocker-Reihe mit Lücken, keine Bücherstapel) + rutschfeste Matte (Pflicht) + Spotter. Zwei Bahnen im Wettlauf auf Zeit. Profi-Stufe: zweiter Durchgang mit verbundenen Augen, ein Crew-Mitglied ruft klare Kommandos (Links! / Rechts! / Stopp!), max. 2 Durchläufe. Augenbinde NUR auf der flachen Bahn (0 cm), NIE auf der erhöhten Planke.",
        },
      },
      source: "wizard+generic+hub",
      class_gate: 85,
      score: 85,
      reviews: [64, 79, 75, 83, 78, 86, 85],
    },
    {
      id: "kanonenkugeln",
      motto: "piraten",
      class: "staple",
      emoji: "⚓",
      name: "Kanonenkugeln",
      desc: "Feindliche Schiffe versenken — wirf die Kanonenkugeln in die Fässer; je weiter das Ziel, desto mehr Beute",
      ages: ["3-5", "6-8", "9-12"],
      bestAge: "6-8",
      type: "wettkampf",
      players: { min: 1, ideal: "4–10", max: null, solo: true },
      groupScaling:
        "4–6: zwei Wurfstationen im Abstand ~3 m (halbe Wartezeit) · " +
        "7–10: zwei Stationen, zwei Teams gleichzeitig, Team-Summen vergleichen · " +
        "11+: ~1 Station pro 6 Kinder; konkret z.B. 12 = 2 Stationen à 6, 3 Runden à ~1,5 Min; 18 = 3 Stationen ODER 3er-Gruppen-Rotation à ~2 Min. Bei <12 m² nur eine Station, Runden nacheinander.",
      dauer: "8–12",
      prep: 5,
      teardown: 3,
      indoor: "both",
      space: "min. ~3 m Tiefe × 4 m Breite; Fenster/Regale ~2 m seitlich frei (Wand hinter den Eimern ok).",
      material: [
        "Kanonenkugeln: AUSSCHLIESSLICH weiche Wurfobjekte — Schaumstoffbälle ab ~5 cm ODER Sockenknäuel. KEINE harten Bälle (kein Tennis-/Gummi-/Flummiball, Augenrisiko). Für 3-5 nur Sockenknäuel. 5–8 Stück pro Kind/Runde (10 Kinder × 2 Runden ≈ 100 Knäuel — 3 Sammelkörbe hinter den Eimern, 1 Sammler:in lädt nach jeder Runde nach).",
        "3 Ziele (Eimer/Wäschekorb/Karton) — für 3-5 große weite Öffnungen, für 9-12 kleiner. Abstände altersabhängig: 3-5 = 1/1,5/2 m · 6-8 = 2/3/4 m · 9-12 = 3/4/5 m.",
        "Wurflinie aus Kreppband + 2 Hütchen als Wurfzonen-Begrenzung.",
        "Pirate-Look (Standard): schwarzes Tuch/Tonpapier-Totenkopf an jeden Eimer = feindliches Schiff. Optional Augenklappe/Bandana.",
        "Punkte-Tafel + Stift. Stempel + hautfreundliches Kissen ODER Crew-Aufkleber. Belohnung ab 6 J: Schoko-Goldmünzen nach dem Spiel.",
      ],
      anleitung: [
        "0. Optional (10 Sek): „Feindschiffe voraus — Kanonen laden, Kanonier:innen!\" Ein Erwachsene:r spielt den Kapitän/Schiri.",
        "1. 3 Ziel-Eimer (mit Totenkopf-Tuch) in 2/3/4 m aufstellen, Wurflinie + Hütchen kleben.",
        "2. Jedes Kind bekommt 5 Kanonenkugeln, stellt sich hinter die Wurflinie.",
        "3. Werfen — nur auf die Schiffe. Naher Eimer 1 Pkt, mittel 2, fern 3. Pro Runde alle 5 Kugeln; je nach Zeit 2–3 Runden. Team-Modus: jedes Kind max. 15 Pkt/Runde, Team-Summen vergleichen (Bsp. Team A 12 / Team B 9 → A gewinnt).",
        "4. Sicherheits-Ablauf laut ansagen: nur auf die Schiffe, nie auf Personen/Köpfe. Nach „Feuer einstellen!\" legen alle ab — erst auf Sammler:in-Signal (Blickkontakt) wird die Wurfzone zum Einsammeln frei.",
        "5. Siegbedingung: Punkte zählen; jede:r Treffer:in ist Kanonier:in-Crew + Stempel; Team-Modus = höhere Summe gewinnt, kein Einzel-Aussieb, niemand fliegt raus.",
        "6. Schwierigkeit über Distanz + Eimergröße.",
        "7. Abschluss-Ritual: Kapitän ruft „Schatz-Kasse öffnen!\", alle „Arrr!\", Münzen werden verteilt (ab 6 J).",
      ],
      safety:
        "Nur weiche Wurfobjekte (Schaum ab ~5 cm / Sockenknäuel) — nichts Hartes. Eiserne Regel: nur auf Ziele werfen, nie auf Menschen/Gesicht. Wurfzone (Hütchen) während des Werfens frei; Sammeln nur auf Signal. Parallele Stationen ≥3 m seitlich, alle werfen in dieselbe Richtung. Indoor ~2 m Abstand zu Fenstern/Regalen. Für 3-5: nur Sockenknäuel, enge Aufsicht.",
      inclusion:
        "Wurfdistanz frei wählbar (näher treten erlaubt), sitzend möglich. Kein Rauswurf, kein Einzel-Ranking nötig — wer mitmacht, ist Crew.",
      mess: "gering-mittel — Kugeln rollen weg (Sammelzone hinter den Eimern, Ball-Sammler:in pro Station). Wartende laden Nachschub oder üben den Crew-Schlachtruf.",
      variants: {
        "3-5": {
          name: "Kleine Kanoniere",
          desc: "Große Körbe, kurze Distanz, kein Punktedruck",
          detail:
            "Große Wäschekörbe, Distanz 1–2 m, nur Sockenknäuel; jedes Kind tritt so nah es mag. Keine Siegbedingung, kein Zählen — jeder Treffer wird laut bejubelt. Der Stempel ist Teilnahme-Diplom (alle bekommen ihn), kein Leistungs-Abzeichen.",
        },
        "9-12": {
          name: "Scharfschütz:innen",
          desc: "Kleinere Ziele, weitere Distanz, Bonus-Schiff",
          detail:
            "Ziele kleiner, Distanz 3/4/5 m, Bonus-Ziel „Kapitänsschiff\" (kleiner Eimer, 5 Punkte). Team-Modus auf Zeit oder mit begrenzter Kugelzahl; Profi-Option: ein Wurf mit der schwächeren Hand zählt doppelt.",
        },
      },
      source: "wizard+hub",
      class_gate: 85,
      score: 89,
      reviews: [70, 89, 89],
    },
    {
      id: "schatz-im-sand",
      motto: "piraten",
      class: "staple",
      emoji: "🏴‍☠️",
      name: "Schatz im Sand",
      desc: "Mit Sieb und Schaufel den vergrabenen Piratenschatz aus dem Sand buddeln — jede:r findet sein Gold",
      ages: ["3-5", "6-8", "9-12"],
      bestAge: "6-8",
      type: "ruhig",
      players: { min: 1, ideal: "3–8", max: null, solo: true },
      groupScaling:
        "3–6: eine große flache Wanne, alle buddeln am Rand verteilt · " +
        "7–10: zwei Wannen ODER Stationen-Rotation (5–6/Welle à ~5 Min), Wartende malen Schatzkarte/Muschel-Memory · " +
        "11+: ~6 Buddel-Plätze pro Wanne → 1 Wanne pro 6 Kinder. Sandfläche ist der Engpass.",
      dauer: "8–12",
      prep: 10,
      teardown: "15–30 (Sand verteilt sich)",
      indoor: "outdoor bevorzugt, indoor mit Plane",
      material: [
        "Flache Wanne (min. ~60×40 cm, Tischhöhe für sitzendes Spielen) / Sandkasten.",
        "Zertifizierter Spielsand nach DIN EN 71-3 (gewaschen) — KEIN Bausand/Quarzsand mit Feinanteil (Staub-/Lungenrisiko). Sandhöhe ~10 cm. Outdoor-Sand vor Nutzung sichtbar auf Fremdstoffe/Schimmel prüfen.",
        "Schätze: für 3-5 ausschließlich Großteile ≥4,5 cm (Holz-/Filz-Münzen, große Plastik-Edelsteine, Gummifiguren) — KEINE kleinen Schoko-Münzen im Sand (Verschluck + sandiges Schoko). Pro Kind 3–5. Optional mit Piraten-Namen beschriften ('Goldkrone von Blackbeard').",
        "Pro Kind Sieb + Sammel-Eimer; 1–2 Schaufeln. Wasser/Seife/Handtuch. Stempel/Crew-Aufkleber. Schoko-Belohnung separat, erst nach Händewaschen, ab 6 J.",
        "Optional: Schatzkarte mit 'X', Totenkopf-Fähnchen markiert die Buddel-Zone.",
      ],
      anleitung: [
        "0. Optional: „Die alte Schatzkarte sagt — hier ist das Piratengold vergraben! Grabt es aus, Crew!\"",
        "1. Vorab: Schätze gleichmäßig vergraben (3–5/Kind), Buddel-Zone mit Fähnchen markieren.",
        "2. Jedes Kind bekommt Sieb + Eimer und einen Platz am Wannenrand.",
        "3. Auf „Schatzsuche — los!\" buddeln und sieben, Funde in den eigenen Eimer.",
        "4. Faire Verteilung (Schiri aktiv): nach ~5–6 Min jeden Eimer prüfen; Kinder mit 0–1 Stücken → Schiri deutet auf eine vorab markierte leichte Stelle, Kind gräbt dort. Kinder mit vollem Eimer werden „Schatzmeister:in\" und helfen — niemand geht leer aus.",
        "5. Siegbedingung: keine — alle Gräber sind Crew + Stempel.",
        "6. Abschluss: Gruppenfoto mit Sieben + Eimern, DANN Hände waschen (Seife) — erst danach Snacks/essbare Belohnung.",
      ],
      safety:
        "Nur zertifizierter Spielsand (DIN EN 71-3), kein Quarz-/Bausand (Feinstaub). Nicht pusten, kein Sand werfen. Hände nach dem Spiel mit Seife waschen, vor jedem Essen; nicht in Augen/Mund fassen. Für 3-5: enge Aufsicht ~1:4 (für 6er-Gruppe mind. 1 Betreuer:in + 1 Assistenz), ständiger Sichtkontakt; Sand an Mund/Lippen → sofort unterbrechen + ausspülen; nur Großteile ≥4,5 cm. Sand in den Augen: mit klarem Wasser spülen. Allergie/Outdoor: Sand auf Fremdstoffe prüfen.",
      inclusion:
        "Ruhiges, nicht-kompetitives Buddeln — gut für Kinder, die wilde Spiele meiden. Sitzend/Rollstuhl an Tisch-Wanne möglich. Kein Tempo, kein Rauswurf, jede:r findet.",
      mess: "HOCH (Sand). Outdoor bevorzugt. Indoor: große Plane/Bettlaken unter die Wanne, Besen/Handfeger/Staubsauger bereit; Abbau realistisch 15–30 Min (Plane an Ecken zusammenfassen). Schürzen/alte Kleidung.",
      variants: {
        "3-5": {
          name: "Kleine Schatzgräber",
          desc: "Flach/teils sichtbar vergraben, schnelles Erfolgserlebnis",
          detail:
            "Schätze flach und teils sichtbar vergraben, nur Großteile ≥4,5 cm, große Siebe, enge Aufsicht ~1:4. Kein Zählen — jedes gefundene Stück wird bejubelt.",
        },
        "9-12": {
          name: "Karten-Expedition",
          desc: "Schatzkarte mit Himmelsrichtungen + Teams",
          detail:
            "Schätze tiefer vergraben. Schatzkarte mit Himmelsrichtungs-Icons führt zu den ergiebigsten Stellen; Buddel-Zone in 4 Felder (N/O/S/W) teilen, jedes Team gräbt sein Feld, optional kurzes Zeitlimit. Edelsteine eintauschbar gegen eine „Schatzgräber:in-Urkunde\".",
        },
      },
      source: "wizard+generic+hub",
      class_gate: 85,
      score: 91,
      reviews: [88, 91],
    },
  ],
};
