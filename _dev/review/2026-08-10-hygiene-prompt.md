Du bist unabhängiger Gutachter. Vor dir liegt eine Hygiene-Welle an einem gekauften Druckprodukt für Kindergeburtstage (HTML→Print, 6 Mottos aus einer geteilten Vorlage + Daten je Motto/Altersgruppe) und an den zugehörigen SEO-Seiten. Anlass war ein externes Audit: Das PDF erfand Kinder („Burg-Wächter Hanna", „Ich bin Tom, Schlauchführer"), die mit der echten Gästeliste kollidierten, eine Kuchen-Anleitung nannte Butter/Milch trotz gemeldeter Laktose-Allergie, und eine Ritter-Seite trug „Bagger drauf".

WAS GEBAUT WURDE — vier Werkstücke:
 A) GÄSTEBINDUNG: rolesList-Daten tragen jetzt nackte Rollentitel; die
    Vorlage ordnet beim Rendern die Zusagen der Reihe nach zu
    („Wappen-Meister: Emma") und druckt ohne/bei zu wenigen Namen eine
    Schreiblinie.
 B) NAMENS-SWEEP: ~500 Stellen in 60+ Dateien. Politik: [Name]-Platzhalter,
    wo ein Satz „Name + Rolle" lehrt („Ich bin [Name], Schlauchführer");
    nackte Rolle als Sprecher („Die Architektin bewertet"); fiktive
    ERWACHSENE Spielfiguren bleiben (Krimi-Verdächtige, umbenannt wo sie
    mit dem Kinder-Pool kollidierten: Anna→Rita, Tom→Theo); Namens-
    ERFINDUNGS-Tipps bleiben (prinzessin: „Eigene Namen statt Elsa").
 C) ALLERGIE-KOPPEL: allergieTausch() druckt am Kuchen-Rezept zielgenaue
    Standard-Austausche NUR für real gemeldete Allergien der Zusagen
    (Laktose/Ei/Gluten/Nuss) + Eltern-Rückfrage-Zeile.
 D) MASCHINE: Stufe 32 (26-Namen-Pool + Possessive, Whitelist) hält die
    Klasse künftig draußen; K1-Sammelzeile („Hufeisen/Wappen/Bagger")
    je Motto aufgelöst.

PRÜFOBJEKT (SHA b5b7cf21):
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/b5b7cf21/_dev/review/2026-08-10-hygiene-code.patch
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/b5b7cf21/_dev/review/2026-08-10-hygiene-daten.patch
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/b5b7cf21/_dev/review/2026-08-10-hygiene-stichprobe.patch
  (7 minifizierte Dateien als Wort-Diff, fast leer:)
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/b5b7cf21/_dev/review/2026-08-10-hygiene-minified-wortdiff.txt
  After-States:
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/b5b7cf21/paket/_maschine/template.html
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/b5b7cf21/paket/ritter/index.html
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/b5b7cf21/data/motto/ritter-mittel.json
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/b5b7cf21/data/motto/feuerwehr-gross.json
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/b5b7cf21/data/motto/baustelle-gross.json
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/b5b7cf21/_dev/scripts/check-beispielnamen.py
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/b5b7cf21/kindergeburtstag/feuerwehr-6-8-jahre.html
  Verworfene Befunde (respektieren):
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/b5b7cf21/_dev/OFFENE-REVIEW-PUNKTE.md

DIE BEISPIEL-PARTY (?demo=1): Tino 8, Gruppe 6-8, Sa 12.09.2026 14:00–17:00.
Zusagen: Emma (Erdnüsse, Abholung 17:00), Mats, Lina (Laktose, 16:30),
Noah, Ida — Ben hat abgesagt.

DEIN AUFTRAG — je Winkel mit wörtlichem Beleg:
 1. GÄSTEBINDUNG: Lies den stempel-/rollesList-Teil der Vorlage. Rechne die
    Demo durch: welche 5 Zusagen landen auf welchen Rollen, was passiert
    mit überzähligen Rollen, was OHNE Gästedaten (kein Token)? Ist die
    Reihenfolge-Zuordnung fair kommuniziert (der Gastgeber darf tauschen)?
    Datenschutz: dürfen Gastnamen auf diesem Blatt stehen, wo andere
    Blätter Namen token-gaten?
 2. SWEEP-KONSISTENZ: Stichprobe 15+ geänderte Stellen quer durch die
    Patches: Ist die [Name]-Politik konsequent? Liest sich jeder Satz nach
    der Ersetzung grammatisch sauber (gesuchte Fehlerklasse: hängende
    Bezüge wie „die heute im Dschungel..." nach Namens-Entfernung,
    doppelte Rollen „Forscher, Forscher", Genus-Brüche)? Sind die
    Krimi-Umbenennungen (Rita/Theo) ÜBERALL konsistent (Karten, Alibis,
    Spuren, Auflösung)?
 3. ALLERGIE-KOPPEL — der heikelste Teil, prüfe fachlich: Sind die vier
    Austausch-Ratschläge sachlich sicher und üblich (Laktose: Margarine/
    Hafer-Soja 1:1; Ei: ½ Banane oder 1 EL Apfelmus + ½ TL Backpulver je
    Ei; Gluten: 1:1-Mischung + Backpulver prüfen; Nuss: Marzipan/Nuss-Deko
    weg + Spuren-Hinweis)? Recherchiere kurz, ob einer davon riskant oder
    irreführend ist. Greift die Erkennung (Demo: Erdnüsse+Laktose → genau
    2 Zeilen)? Konstruiere Durchrutscher (Schreibweisen: „lactosefrei
    bitte", „Nussallergie", „Hühnereiweiß", „Zöliakie") und Fehlalarme
    („mag keine Milch", „Eierlauf ok").
 4. STUFE 32: Lies Pool, Whitelist, Max-vor-Zahl-Guard. Konstruiere je
    einen Durchrutscher (neuer Name ausserhalb des Pools?) und Fehlalarm
    (legitimer Text mit Pool-Wort). Ist die Whitelist eng genug begründet?
 5. K1: Ist die Sammelzeile überall je Motto richtig aufgelöst (pferde=
    Hufeisen, ritter=Wappen)? Suche Reste des Musters.
 6. GESAMT: Hat der Sweep irgendwo INHALT zerstört (Spielanleitung
    unverständlich geworden, fehlender Akteur im Satz)?

KEIN FUND: alles in OFFENE-REVIEW-PUNKTE.md; maskuline Formen und bewusst
gemischte weibliche Rollentitel; Zeitfenster-Überzug; dass K5 (Asset-
Vollständigkeit) und K6 (Parallel-Spielsysteme) als Folgearbeit offen sind;
die 6 bekannten Linter-WARNUNGEN.

BERICHT: Je Fund wörtliches Zitat + Datei/Zeile; MAJOR/MINOR/UNSICHER;
Rechnungen zeigen. Ende: Score 0–100 „Welle sauber, bereit für Deploy",
ein Satz Begründung, die zwei wichtigsten Funde. Fang mit den Diffs an.
