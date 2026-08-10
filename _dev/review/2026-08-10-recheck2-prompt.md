Du bist unabhängiger Gutachter für einen kleinen REPARATUR-Diff (Folgerunde). Das Vorgutachten fand drei gedruckte Zahl-Nester (Bastelanleitung „fünf leere Kreise", Kaufliste „5 Stations-Stempel", Rollen-Zettel „Vergibt die 5 Stations-Stempel") neben einer vom Renderer gerechneten Stationszahl, dazu Wächter-Blindstellen und kleinere Textpunkte. Die Fixes liegen vor. Prüfe NUR: (a) sind die Fixes korrekt und vollständig, (b) haben sie NEUE Fehler eingebaut. Fix-induzierte Fehler zuerst.

KONTEXT in einem Satz: Druckprodukt „Komplettpaket" (paket/_maschine/template.html rechnet die Stationszahl aus dem Ablaufplan; Daten in data/motto/*.json) + SEO-Seiten (kindergeburtstag/*.html aus _src/elite-motto-data/*.json) + Linter-Stufen in _dev/scripts/.

PRÜFOBJEKT (SHA f96c3592):
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/f96c3592/_dev/review/2026-08-10-recheck2.patch
  (der minifizierte _bundle.js-Anteil als Wort-Diff:)
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/f96c3592/_dev/review/2026-08-10-recheck2-bundle-wortdiff.txt
  After-States:
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/f96c3592/data/motto/dino-mittel.json
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/f96c3592/data/motto/dino-gross.json
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/f96c3592/data/motto/baustelle-mittel.json
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/f96c3592/paket/_maschine/template.html
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/f96c3592/_dev/scripts/check-harte-zahlenversprechen.py
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/f96c3592/_dev/scripts/check-sichtbarer-text.py
  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/f96c3592/kindergeburtstag-spiele.html
  Verworfene Befunde (respektieren): https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/f96c3592/_dev/OFFENE-REVIEW-PUNKTE.md

WINKEL:
 1. Die drei Zahl-Nester: sind die neuen Formulierungen wahr, verständlich
    und frei von neuen Widersprüchen (z. B. „je geplanter Station" in einer
    VOR-Party-Bastelanleitung — weiß der Elternteil da schon die Zahl? Der
    Countdown verweist auf die Ritual-Karte — trägt die Anleitung das mit?)?
 2. Wächter Stufe 27: lies die vier neuen Muster. Konstruiere je einen
    Durchrutscher und einen Fehlalarm. Prüfe besonders (?!-Kissen) und den
    Kreise-Lookahead ([^.]{0,60} — reicht der Abstand?).
 3. Stufe 31: neue Präpositionen + (?!-)-Kompositum-Guard + Rohtext-Scan +
    <title>-Scan + Schatzsuche-Themen-Restriktion + {0,3}-Salat. Je Regel:
    ein Durchrutscher, ein Fehlalarm — am Wortlaut, nicht vermutet.
 4. Template: Kommentar jetzt korrekt? n=1-Singular grammatisch sauber
    („wenn dieser eine Stempel da ist")? Motivlisten-Nachsatz in ritter-/
    baustelle-mittel: fügt er sich in den Satz?
 5. Klassiker-Liste (kindergeburtstag-spiele.html): stimmen die vier neuen
    Ablauf-/Material-Angaben fachlich (Topfschlagen, Stille Post, Reise nach
    Jerusalem, Schokoladen-Spiel)? Ist der Versprechens-Satz jetzt 10/10 wahr?
 6. Apostroph-Angleich (6 Seiten) + aufwand 90 Min.: Nebenwirkungen?

KEIN FUND: alles in OFFENE-REVIEW-PUNKTE.md; die 5 bekannten Wortzahl-
WARNUNGEN; maskuline Formen; dass ein untracktes prinzessin-Manifest als
„in Bau" übersprungen wird (bewusste Gate-Semantik, Datei deployt nie).

BERICHT: Je Fund wörtliches Zitat + Datei/Zeile; MAJOR/MINOR/UNSICHER;
Rechnungen zeigen. Ende: Score 0–100 „Fix-Diff sauber, bereit für Deploy",
ein Satz Begründung, wichtigster Restpunkt. Fang mit dem Diff an.
