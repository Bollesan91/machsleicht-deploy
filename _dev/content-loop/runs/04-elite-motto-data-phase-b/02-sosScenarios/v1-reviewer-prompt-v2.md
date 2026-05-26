Du bist Reviewer-Chat B in einer 3-Chat-Pipeline fuer feuerwehr-mittel.json Phase B (Feuerwehr 6-8). Writer schrieb v1 fuer **sosScenarios (8 Panik-Szenarien, P3-18 SOS-Button)**.

## v1 (vom Writer)

{
  "regen": {
    "icon": "🌧️",
    "label": "Regen — alles draußen geplant",
    "headline": "Einsatz nach drinnen verlegen — die Wohnung ist jetzt die Wache.",
    "steps": [
      "Zielspritzen ins Bad: Wanne als Auffangbecken, Becherpyramiden auf den Wannenrand.",
      "Stationen-Rotation ins Wohnzimmer + Flur: 4 Ecken = 4 Stationen, Möbel an die Wand.",
      "Einsatz-Alarm durch alle Zimmer: Kuscheltiere in Schlaf-, Kinder- und Küchenversteck.",
      "Handtuch-Stapel an die Badtür legen, fertig. Crew rein, los."
    ],
    "fallback": "Keine Badewanne? Dusche reicht. Spritze nach unten, Becher auf den Duschboden — Kinder lieben's genauso.",
    "tone": "praktisch"
  },
  "weniger_kinder_als_erwartet": {
    "icon": "👥",
    "label": "Weniger Kinder als erwartet (2–3 fehlen)",
    "headline": "Weniger Crew, gleicher Einsatz — straffer, nicht ärmer.",
    "steps": [
      "Kuscheltiere für Einsatz-Alarm auf 5–6 reduzieren, Verstecke näher legen.",
      "Stationen-Rotation auf 3 statt 4 Stationen kürzen — z.B. Zielspritzen + Schlauch-Rollen + Sani-Verband.",
      "Rollen-Verteilung anpassen: Doppelrollen vergeben, Max·Wachleiter und Lina·Funkerin können kombiniert werden.",
      "Pufferzeit füllen mit zweiter Runde Zielspritzen oder freier Spielzeit am Wachen-Pult."
    ],
    "fallback": "Wenn's stockt: Tattoos & Crew-Pins-Verteilung nochmal feiern lassen, Foto-Session am Pumpenwagen-Tisch.",
    "tone": "ruhig"
  },
  "mehr_kinder_als_erwartet": {
    "icon": "🚨",
    "label": "Mehr Kinder als erwartet (Geschwister-Boom)",
    "headline": "Zweiten Trupp bilden — Wache hat ab jetzt zwei Schichten parallel.",
    "steps": [
      "Crew in 2 Trupps splitten: Trupp Rot + Trupp Blau, je ein älteres Kind als Trupp-Führer.",
      "Einsatz-Alarm verdoppeln: 2 parallele Routen, je 4–5 Kuscheltiere pro Trupp.",
      "Sofort Verstärkung anrufen: Oma, Nachbarin, anderer Elternteil — 10 € für 2 Stunden Stationsaufsicht.",
      "Tattoos & Helme verteilen vor allem anderen — Geschwister-Kinder NICHT leer ausgehen lassen.",
      "Kuchen-Stücke halbieren, Apfelschorle nachbestellen lassen (Lieferdienst oder Tankstelle nebenan)."
    ],
    "fallback": "Kein Helfer erreichbar? Stationen-Rotation auf eine große Gruppen-Aktion umstellen: Alle zusammen Einsatz-Alarm, du als einzige Aufsicht.",
    "tone": "praktisch"
  },
  "kind_will_nicht_mitmachen": {
    "icon": "🤷",
    "label": "Ein Kind will nicht mitmachen",
    "headline": "Kein Zwang. Off-Action-Rolle anbieten — am Wachen-Pult ist auch ein Platz.",
    "steps": [
      "Rolle anbieten: „Du bist heute Hannah·Disponentin — du sagst, wer wo hinmuss.\"",
      "Alternative: Lea·Wachen-Tafel-Schreiberin oder Noah·Foto-Reporter mit deinem Handy.",
      "Tattoo nicht auf die Hand? Aufs Dienstausweis-Kärtchen kleben, am Band um den Hals.",
      "Sitzplatz am Wachen-Pult mit eigener Apfelschorle — Beobachter-Posten, kein Außenseiter-Posten."
    ],
    "fallback": "Will gar nichts? Okay. Buch + Decke in die ruhige Ecke, alle 10 Min kurz reinschauen. Manche Kinder steigen nach 20 Min von selbst ein.",
    "tone": "ruhig"
  },
  "kuchen_misslungen": {
    "icon": "🎂",
    "label": "Kuchen ist misslungen",
    "headline": "Bäcker-Hack: Schoko-Kasten + rote Glasur + Oreos = Notfall-Kuchen in 10 Min.",
    "steps": [
      "Schoko-Kastenkuchen beim nächsten Bäcker holen (oder Edeka/Rewe-Kuchenecke).",
      "Rote Tortenguss-Glasur drüber (Tube, 1,50 €) — Feuerwehr-Rot, Volltreffer.",
      "4 Oreos seitlich ankleben als Reifen, weiße Zuckerstift-„112\" auf die Oberseite.",
      "8 Kerzen rein, Licht aus, Sirenen-Sound vom Handy, fertig — sieht aus wie gewollt."
    ],
    "fallback": "Bäcker zu? Muffins aus dem Vorrat, je ein Mini-Marshmallow + Zahnstocher mit roter Papierfahne reinstecken — Mini-Feuerwehr-Hütchen.",
    "tone": "motivierend"
  },
  "spielzeug_kaputt_oder_fehlt": {
    "icon": "🔧",
    "label": "Spielzeug kaputt oder vergessen",
    "headline": "Improvisieren mit Haushalts-Material — Crew merkt nichts.",
    "steps": [
      "Spritzpistole leak? Sprühflasche vom Fensterputzer (durchspülen!) oder Plastikflasche mit Loch im Deckel.",
      "Tattoo-Set vergessen? Filzstift-Strich auf Handrücken + Krone mit Sternchen = „Probe-Tattoo, hält nur heute\".",
      "Sirenen-Sound geht nicht? YouTube „Feuerwehrsirene 1 Stunde\" am Handy, Lautsprecher voll auf.",
      "Helme zu wenig? Pappkartons aus dem Keller, rot anmalen oder rotes Geschenkpapier drumkleben."
    ],
    "fallback": "Total katastrophal? Stationen-Rotation streichen, dafür Einsatz-Alarm zweimal — Kuscheltiere reichen immer.",
    "tone": "praktisch"
  },
  "ein_kind_weint": {
    "icon": "😢",
    "label": "Ein Kind weint",
    "headline": "Raus aus dem Trubel — 5 Min Pause am Wachen-Pult, dann sehen wir weiter.",
    "steps": [
      "Kind kurz aus der Gruppe nehmen — Küche oder Flur, weg vom Lärm.",
      "Apfelschorle im roten Becher + Tattoo auf den Handrücken kleben als Beruhigungs-Ritual.",
      "Rolle anbieten: „Magst du die Wachen-Tafel führen? Du schreibst, wer dran ist.\"",
      "Wenn's Heimweh ist: kurzer Anruf bei Mama/Papa — meistens reicht das, dann geht's weiter.",
      "Nach 5 Min sanft zurückführen, an die Hand nehmen zur nächsten Station — nicht fragen, einfach mitnehmen."
    ],
    "fallback": "Geht gar nicht mehr? Eltern anrufen, abholen lassen — kein Drama, lieber 30 Min früher als ein Trauma.",
    "tone": "ruhig"
  },
  "eltern_kommen_frueh": {
    "icon": "🚪",
    "label": "Eltern stehen 30 Min zu früh vor der Tür",
    "headline": "Übergang einleiten — „Schichtende in 10 Minuten\", offiziell und ruhig.",
    "steps": [
      "Eltern in den Flur bitten, Apfelschorle/Wasser anbieten — nicht ins Wohnzimmer, sonst kippt die Stimmung.",
      "Crew durchsagen: „Achtung Schichtende in 10 Minuten — Wachen-Pult-Foto jetzt!\"",
      "Gruppenfoto am Wachen-Pult mit allen Helmen + Tattoo-Hand in die Kamera.",
      "Wachen-Tafel zeigen, Crew-Pins als Abschiedsgeschenk in die Hände drücken, Mitgebsel-Tüte raus.",
      "Eltern + Kinder zur Tür — kurz, herzlich, nicht in lange Tür-Gespräche verheddern."
    ],
    "fallback": "Wenn's wirklich chaotisch wird: Mitgebsel-Tüten in den Flur stellen, jedes Kind nimmt im Rausgehen eine — Abschied auf der Treppe statt im Wohnzimmer.",
    "tone": "praktisch"
  }
}

## Score-Rubrik

Substanz 30 | Motto-Kohaerenz 25 | Crisis-Tauglichkeit 20 | Sprint-Tauglichkeit 15 | Mama-um-22:30-Test 10

Akzeptanz Final-Score >= 85.

## Stream-Hinweise (KRITISCH pruefen)

- Sind steps Imperativ-Saetze <=120 Zeichen oder Erklaerungen?
- Motto-Anker (Disponentin, Wachen-Tafel, Tattoo, Sirene) in ALLEN 8 Szenarien?
- headline beruhigt sofort + gibt Richtung?
- fallback substantiell oder leer wo nicht noetig?

## Dein Output (FORMAT STRIKT)

## Score-Card v1

| Dimension | Punkte | Begruendung (1 Satz) |
|---|---|---|
| ... | XX/XX | ... |

**Gesamt v1: XX/100**

## Konkrete Verbesserungen fuer v2 (4-8 Punkte)

1. **[Schluessel/Sektion]** — Was schwach + wie genau fixen. KONKRET wie "minus2Days/Helfer-Briefing: '5-Minuten' ist vage, schreib stattdessen: 'Stationen-Karte am Kuechentisch zeigen, Rollen ansagen, Notruf-Nummer geben.'" NICHT generisch.

2. ...

## Lob (1-3 starke Punkte)

- ...

## Sycophancy-Check

Wenn v1 >= 90 ehrlich sagen, nicht konfabulieren.

Direkt los, Score-Card als erstes.