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
  ],
};
