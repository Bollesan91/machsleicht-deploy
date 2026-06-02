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
      class: "staple",
      scope: "standalone für 2–5 + Baustein im Piraten-Parcours für 6–12",
      bestAge: "3-5",
      class_gate: 85,
      score: 85, // unter fun-first-Rubrik (Foto = Bonus statt Abzug) — der Foto-Drag (~3 Pkt) entfällt; sicheres, spaßiges Staple. Kein Neu-Grind, Maßstab-Korrektur.
      status: "DURCH als fun-first-Staple. Sicher + komplett + spaßig. Foto-Drag entfernt (Rubrik 01.06.2026: Foto = Bonus). Doku könnte noch verschlankt werden (optional). Spec: _dev/review/staging/piraten-walk-the-plank.md (v17). Frühere WebFetch-Scores waren inflationär.",
      reviews_strict_age_calibrated: [83, 85, 83, 78],
      reviews_webfetch_inflationaer: [64, 79, 75, 83, 78, 86, 85],
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
    {
      id: "papagei-sagt",
      motto: "piraten",
      class: "staple",
      scope: "standalone für alle Alter (Ruhe-/Sammel-Block)",
      emoji: "🦜",
      name: "Papagei sagt",
      desc: "Piraten-Simon-Says: nur wenn der Käpt'ns-Papagei „Papagei sagt …\" ruft, wird mitgemacht",
      ages: ["3-5", "6-8", "9-12"],
      bestAge: "3-5",
      type: "ruhig",
      players: { min: 3, ideal: "3–20+", max: null, solo: false },
      groupScaling: "3 bis 20+ ohne Umbau, alle gleichzeitig, keine Stationen. Bei 20+ erhöht stehen / Co-Papagei mit-ansagen.",
      dauer: "5–10",
      prep: 0,
      indoor: "both",
      material: "Keins. Optional: Papageien-Handpuppe.",
      anleitung: [
        "0. Erklären: „Nur bei ‚Papagei sagt' machen wir mit!\"",
        "1. Papagei ruft piratige Bewegungs-Befehle (12er-Liste, alles Pantomime an Ort und Stelle).",
        "2. Befehl OHNE „Papagei sagt\" → stehenbleiben. Wer falsch mitmacht: einmal „Krääh!\" rufen und SOFORT wieder dabei — kein Rauswurf.",
        "3. Tempo steigern, Geburtstagskind als Papagei. Ende: Papagei ruft „Landgang!\"",
      ],
      safety: "Armabstand zwischen Kindern. ALLE Befehle Pantomime — kein echtes Klettern/Balancieren auf Möbeln, kein Springen, kein Hinlegen auf hartem Boden. Risikoarm (kein Material, kein Tempo-Zwang).",
      inclusion: "Kein Ausscheiden, keine Wartebank, Sitz-/Rollstuhl-Varianten (Arm-/Kopf-Befehle), geschlechtsneutral. Mixed-Age: auf Niveau der Jüngsten, Ältere als Co-Papageien.",
      mess: "keiner",
      source: "wizard+neu",
      class_gate: 85,
      score: 87,
      foto_bonus: 1,
      reviews_strict_fun_first: [89, 87], // v1 88+1, v2 86+1 → zwei aufeinanderfolgende ≥85
    },
    {
      id: "piratenschiff-bauen",
      motto: "piraten",
      class: "bastel-aktion", // Kreativ-/Bastel-Block, KEIN Lauf-/Wettkampf-Spiel → eigene Kategorie, vom ≥90-Spiel-Gate ausgenommen (Gate 85). Machbarkeit ist bei DIY-Karton-Bau strukturell gedeckelt.
      scope: "eigenständiger Bastel-Block + danach Foto-Kulisse/Safe-Zone-Basis für Folge-Spiele",
      emoji: "⛵",
      name: "Piratenschiff bauen",
      desc: "Die Crew baut aus Kartons ihr eigenes begehbares Piratenschiff — danach Foto-Kulisse und Basis für die ganze Party",
      ages: ["3-5", "6-8", "9-12"],
      bestAge: "6-8",
      type: "kreativ",
      players: { min: 3, ideal: "4–8", max: 12, solo: true },
      groupScaling:
        "4–8 ideal an einem Schiff (feste Bau-Stationen: Maler-/Bullaugen-/Takel-/Namens-Crew) · " +
        ">8: zwei parallele Bau-Teams (braucht zweite Aufsicht — Schneiden ist am Vortag erledigt) ODER ein größeres Schiff mit mehr Stationen, so wartet auch bei 10–12 niemand · " +
        "Solo/2 geht (kleineres Schiff), lebt aber vom Team.",
      dauer: "20–30 (6-8); 3-5 Kissen-Floß ~10–15; 9-12 Wettbewerb ~20",
      prep: "15–25 (ungeübt 30–40), am Vortag: Rumpf bauen + Bullaugen/Tür schneiden",
      teardown: "5–10 (flach falten, Papiertonne)",
      indoor: "both",
      material: [
        "2–3 große Umzugskartons (kostenlos sammeln 1–2 Wochen vorher, oder Baumarkt ~2 €/Stück als Fallback), reichlich Kreppband + Paketband. KEIN Heißkleber nötig.",
        "Buntstifte/Wachsmalstifte/abwaschbare Farbe + Pinsel, altes Bettlaken (Segel), Pappreste (Steuerrad/Flagge), schwarzer Stift/Tonpapier (Jolly Roger), Pappteller (Bullaugen).",
        "Eltern-Werkzeug: Schere/Cutter NUR für Erwachsene (Bullaugen/Schlitze/Tür vorschneiden).",
        "Optional (Foto-/Wow-Bonus): Augenklappen/Bandanas für die Crew aufs Foto.",
      ],
      anleitung: [
        "0. „Jede Crew braucht ein Schiff — lasst es uns bauen, Matrosen!“",
        "1. Vortag (Erwachsene): Rumpf zusammenbauen (größter Karton = Wanne zum Reinsteigen, mind. ~60×40×40 cm; zwei Kartons mit ~10 cm Überlappung innen+außen je 2× quer tapen), Bullaugen + Tür vorschneiden; untere Tür-Kante niedrig+breit schneiden und separat umkleben (Stolperstelle).",
        "2. Feste Bau-Stationen, jedes Kind aktiv: Maler-Crew (Planken/Wellen), Bullaugen-Crew (Pappteller aufkleben), Takel-Crew (Steuerrad + Flagge), Namens-Crew (Schiffsname + Schlachtruf + Augenklappen). Wer fertig ist, wechselt die Station.",
        "3. Mast optional (Default = keiner, Segel an Rückwand): wenn, dann nur stumpfe weiche Stange (Pappröhre/Pool-Nudel) fest unter Schulterhöhe in einem beschwerten Karton — nie hart/spitz, nie über Kinderköpfen.",
        "4. Segel + Deko gemeinsam mit Paketband (Kinder dürfen tapen). Farbe antrocknen lassen.",
        "5. Aufrichten + taufen: Geburtstagskind wählt den Schiffsnamen, „Ich taufe dich …!“.",
        "6. 🚢 Jungfernfahrt-Finale (3 Min): Crew steigt ein (bei großen Gruppen nacheinander / Hälfte außen), Käpt'n ruft Mini-Story (Sturm-ducken / rudern / Ausschau / Schatz-Arrr) → Crew-Foto auf dem Schiff.",
      ],
      safety:
        "Schneiden/Cutter ausschließlich Erwachsene — Kinder kleben/malen/tapen. Schnittkanten innen umkleben. Abwaschbare/lösungsmittelfreie Farben. KEIN Heißkleber (Paketband reicht). Schiff auf Teppich/rutschfeste Unterlage (Karton schiebt auf Laminat weg). NICHT draufklettern/-stehen (Karton trägt nicht) — Kulisse, kein Klettergerüst; vorab ansagen. Stolperfallen (Bänder) sichern.",
      inclusion:
        "Viele Stationen → jedes Kind findet eine aktive Aufgabe (malen, kleben, tapen, Name, Segel halten). Sitz-Aufgaben mit echtem Output (Steuerrad, Flagge). Kein Tempo, kein Rauswurf, kein „falsch“. Geschlechtsneutral.",
      mess: "mittel (Farbe/Pappe). Tisch/Boden mit Decke/Folie schützen; danach Schiff flach falten → Papiertonne (Wohnung: vorab einplanen).",
      variants: {
        "3-5": {
          name: "Kissen-Floß (auch Universal-Fallback ohne Vorbereitung)",
          desc: "Kein Schneiden/Kleben — Kissen/Decken-Floß mit Mini-Struktur",
          detail:
            "Kissen + Decken zu einem Floß stapeln, weiche Fahne flach reinlegen. 3 Reihum-Aufgaben (Kissen dazulegen / Decken-Segel hochhalten / Wellen aufmalen) + 1-Min-Finale (alle rudern + „Arrr!“ + Foto). Auch der Fallback, wenn die Bau-Vorbereitung nicht geklappt hat.",
        },
        "9-12": {
          name: "Konstruktions-Wettbewerb",
          desc: "Zwei Teams bauen um die Wette, kein Verlierer",
          detail:
            "Zwei Teams, gleiches Material, 20 Min: Jury (Erwachsene + Geburtstagskind) wertet Stabilität/Design/Teamwork — kein Verlierer, beide Schiffe bleiben Kulisse, jedes Team kriegt einen „Werft-Orden“. Nur mit zweiter Aufsicht.",
        },
      },
      source: "wizard+generic+hub",
      class_gate: 85,
      score: 87,
      foto_bonus: 3,
      reviews_strict_fun_first: [84, 87, 87], // R1 84, R2 84+3, R3 84+3 → Plateau. Bewusst als Bastel-Aktion (kein Spiel-Gate) bei 87 gelockt: Machbarkeit 11/15 ist bei DIY-Karton-Bau strukturell gedeckelt, nicht wegformulierbar.
      status: "DURCH als Bastel-Aktion (eigene Kategorie ≥85, entschieden 02.06.2026). 3 strenge Opus-Reviews (Branch-Trick, target-blind): 84/87/87, Plateau durch struktureller Machbarkeits-Deckel. Spec: _dev/review/staging/piraten-piratenschiff-bauen.md.",
    },
    {
      id: "hai-tag",
      motto: "piraten",
      class: "aktiv-spiel", // Lauf-/Fangspiel; Gate 85 + Best-of-3-Median (strukturelle Machbarkeits-/Sicherheits-Deckel, s. Rubrik). Machbarkeit-Reframe angewandt.
      scope: "eigenständiges Komplettspiel; alters-relativ",
      emoji: "🦈",
      name: "Hai-Tag",
      desc: "Goldmünzen von der Schatzinsel aufs Schiff retten — vorbei am Hai. Erwischt = du treibst über Bord, bis ein Kamerad dich rettet; hilft keiner, wirst du selbst zum Hai",
      ages: ["3-5", "6-8", "9-12"],
      bestAge: "6-8",
      type: "aktiv",
      players: { min: 6, ideal: "8–12", max: 15, solo: false },
      groupScaling:
        "Start-Hai-Zahl ~1 pro 5 Kinder (6–8→1, 9–12→2, 13–15→3) · " +
        "gestaffelter Start (2–3 Farb-Wellen) gegen Gedränge · " +
        "ab ~12 Vollversion (Kanone+Ziel-Zahl) = Zwei-Personen-Spiel; allein nur Fangen+Retten · " +
        "16+ zwei Felder parallel (je 1 Hai + 1 Aufsicht) · unter 6 nur Mini-Variante · Platz ~4 m²/Kind",
      dauer: "10–14",
      prep: 5,
      teardown: 2,
      indoor: "outdoor bevorzugt, Indoor-Fallback (Gehen statt Rennen, kleineres Feld)",
      space: "~6×6 m bei 8 Kindern, ~8×8 m bei 15 (Faustregel ~4 m²/Kind)",
      material: [
        "„Schiff\" (Safe-Zone am Rand): Decke/Reifen/Kreppband-Kreis.",
        "„Treib-Zone\": markierter Streifen an einem Feldrand mit festem Münz-Sammelpunkt, wo über-Bord-Kinder knien.",
        "„Schatzinsel\" in der Mitte: Reifen/Tuch + Goldmünzen (Schoko ab 6 J / Holz-Plastik-Großteile ≥4,5 cm für Kleine), genau 1 pro Kind auslegen.",
        "„Kanonen-Insel\": zweiter kleiner Reifen/Teppichfliese am Feldrand. Optional: Hai-Stirnband, blaues Tuch als Hai-Wasser.",
      ],
      anleitung: [
        "Gestaffelt einführen: R1 nur Fangen+Retten (OHNE Hai-Umwandlung, gefangen = nach Zählen-bis-5 selbst auf); R2 mit Umwandlung + Kanonen-Insel; R3+ zusätzlich Ziel-Zahl.",
        "1. Feld abstecken: Schiff am Rand, Schatzinsel Mitte, Hai-Wasser dazwischen, Treib-Zone + Kanonen-Insel an den Rändern.",
        "2. Start-Hai-Zahl ~1 pro 5 Kinder. Sanftes Abklatschen (Schulter/Rücken) = erwischt — kein Schubsen/Festhalten/Reißen.",
        "3. Gestaffelter Start (Farb-Wellen): rennen zur Insel, eine Münze schnappen, aufs Schiff bringen. Im Wasser darf der Hai abklatschen.",
        "4. Mann über Bord: in die Treib-Zone, Münze am Sammelpunkt ablegen, knien. Freier Pirat tippt an = gerettet. Geschützt bis zur echten Rettungschance (Hai darf nicht lauern, ~2 m Abstand). Ab R2: ungerettet + erneut getippt → wird Hai.",
        "5. Kanonen-Insel (ab R2): „Feuer!\" friert alle Haie 5 Sek ein (1×/Kind/Runde, danach Insel verlassen).",
        "6. Münz-Regel: getragene Münzen immer an den Treib-Zonen-Sammelpunkt (nie im Korridor); Schiri legt sie beim Reset zurück auf die Insel. Aufs Schiff = dauerhaft gerettet.",
        "7. Einheitliche 5-Sek-Regel (Safe-Zone + Freeze), Erwachsene:r zählt laut. Keine weiteren Timer.",
        "8. Siegbedingung (ab R3): Ziel-Zahl = Hälfte der ausgelegten Münzen aufgerundet.",
        "9. Rundenende (ohne Live-Zählen, was zuerst eintritt): feste ~3 Min ODER Ziel-Zahl erreicht ODER sichtbar mehr Haie als Piraten. Neue Runde, neue Start-Hai(e). Kein Ausscheiden.",
      ],
      safety:
        "Ebener, hindernisfreier Boden, klare Grenzen weg von Möbelkanten/Straße. Nur sanftes Abklatschen (vorher ansagen, am Hai demonstrieren) — kein Reißen/Schubsen. Kniende sitzen am Feldrand in der Treib-Zone, NICHT im Lauf-Korridor (vorher ansagen, nicht drüberlaufen). Indoor nur mit genug Fläche + rutschfestem Boden. Pausen + Wasser bei Hitze. Schoko-Münzen nur sammeln, erst NACH dem Spiel essen (Erstickungsrisiko).",
      inclusion:
        "Kein Ausscheiden (über Bord = Rettung möglich, sonst Rollenwechsel). Bewegungseinschränkung: aktive Schlüsselrolle „Schatzmeister:in\" (gibt Münzen frei) ODER „Kanonier:in\" auf der Kanonen-Insel. Geschlechtsneutral.",
      mess: "gering — Münzen + Markierungen. Outdoor bevorzugt; Indoor rutschfest + Möbelkanten sichern.",
      variants: {
        "3-5": {
          name: "Stapf-Hai",
          desc: "Langsamer Geh-Hai, nur Fangen + Retten, kein Eskalations-/Endgame-Teil",
          detail:
            "Kleines Feld, langsamer „Stapf-Hai\" (Gehen statt Rennen), großzügige Safe-Zonen, tollpatschiger Erwachsenen-Hai. Nur R1-Regeln; gefangen = nach Zählen-bis-5 selbst aufstehen (keine Umwandlung); keine Kanone, keine Ziel-Zahl.",
        },
        "9-12": {
          name: "Hai-Rudel",
          desc: "Größeres Feld, kooperierende Haie, strengerer Kanonen-Cooldown",
          detail:
            "Größeres Feld, nur kurze/wandernde Safe-Zone, „Hai-Rudel\"-Taktik (Haie kooperieren), Kanonen-Insel-Cooldown 1× pro Spiel statt pro Runde.",
        },
      },
      source: "wizard+generic+hub",
      class_gate: 85,
      score: 85,
      foto_bonus: 2,
      reviews_aktiv_bestof3: [84, 85, 88], // reframte Rubrik (Machbarkeit-Baseline), target-blind Opus, JS-Paste; Median 85
      status: "DURCH als aktiv-spiel (Gate 85, Best-of-3-Median, entschieden 02.06.2026). Finale Spec nach 4 Fix-Runden; reframte Rubrik 84/85/88 → Median 85. Spec: _dev/review/staging/piraten-hai-tag.md.",
    },
  ],
};
