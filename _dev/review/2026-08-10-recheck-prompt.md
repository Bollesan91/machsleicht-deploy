Du bist unabhängiger Gutachter für einen REPARATUR-Diff. Zwei frühere Gutachten haben Funde geliefert; die Fixes liegen jetzt vor. Deine Aufgabe ist NICHT, die alten Funde neu zu bewerten — sondern zu prüfen, ob die Fixes korrekt sind und ob sie NEUE Fehler eingebaut haben. Fix-induzierte Fehler sind die häufigste Quelle späterer Probleme; genau dorthin schau zuerst.

DAS SYSTEM in zwei Sätzen: machsleicht.de ist ein Kindergeburtstags-Planer (Live-SEO-Seiten unter kindergeburtstag/, generiert aus _src/elite-motto-data/*.json durch _src/generate-age-pages.py) plus ein Druckprodukt („Komplettpaket": paket/_maschine/template.html + Daten in data/motto/*.json, sechs Mottos teilen die Vorlage). Ein Linter (validate-all.sh, Stufen-Skripte in _dev/scripts/) ist das deterministische Gate.

DIE PRÜFOBJEKTE (SHA 8d8ce73a, öffentlich):

  Haupt-Diff (SEO-Seiten, Daten, Generator, Linter-Stufen):
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/8d8ce73a/_dev/review/2026-08-10-recheck-fixes.patch
  Vorlagen-Diff (stempelBlock-Gate im Druckprodukt):
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/8d8ce73a/_dev/review/2026-08-10-recheck-paket.patch
  Wort-Diff der minifizierten piraten-gross.json (2 Änderungen):
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/8d8ce73a/_dev/review/2026-08-10-recheck-piraten-gross-wortdiff.txt

  After-States zum Selbst-Ziehen:
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/8d8ce73a/kindergeburtstag/pferde-9-12-jahre.html
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/8d8ce73a/kindergeburtstag/baustelle-3-5-jahre.html
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/8d8ce73a/kindergeburtstag/pferde.html
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/8d8ce73a/_src/generate-age-pages.py
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/8d8ce73a/_src/elite-motto-data/pferde-gross.json
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/8d8ce73a/_dev/scripts/check-sichtbarer-text.py
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/8d8ce73a/data/motto/ritter-mittel.json
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/8d8ce73a/paket/_maschine/template.html
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/8d8ce73a/kindergeburtstag-spiele.html

  Verworfene Befunde — respektieren, nicht neu melden:
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/8d8ce73a/_dev/OFFENE-REVIEW-PUNKTE.md

WAS GEFIXT WURDE — prüfe je Punkt: (a) Fix korrekt und vollständig? (b) Nebenwirkung?

TEIL A — Druckprodukt (Ritter-Gutachten):
 A1. Grammatik-Reparatur auf 5 Live-Seiten: „zu echten Stallmeistern/
     Bauarbeitern/Entdeckern/Kapitänen", „zum Zauberhüter". Sind die Sätze
     jetzt korrekt? Wurde eine Stelle vergessen (such selbst nach dem
     Muster „zu echten …" in den After-States)?
 A2. stempelBlock: druckt nur noch bei Signal `stempelHeft` (Dativ-Phrase
     in signatureRitual, 6 Dateien: ritter/baustelle/dino-mittel,
     dino/meerjungfrau/piraten-gross). Lies das Template: Ist das Gate
     wasserdicht (falsy-Werte, leere Strings)? Passt jede der 6 Phrasen
     grammatisch in den Satz „Trag genau N Felder <PHRASE> ein"? Fehlt
     einem Motto mit echtem Sammelkonzept das Signal?
 A3. Harte Stempel-/Feld-Zahlen aus 7 Daten-Dateien entfernt; Countdown-
     Texte verweisen auf Ritual-Karte bzw. Ablaufplan. Widerspricht jetzt
     noch irgendein Text der gerechneten Zahl? Läuft ein Verweis ins
     Leere (Ritual-Karte ohne Stempel-Block)?
 A4. Bogenschießen ritter-mittel: Reihum-/1-Erwachsener-Regel jetzt in der
     immer gedruckten safetyRule; ageAdjust8 selbsttragend. Ist die Regel
     inhaltlich vollständig? Widerspricht sie einem step-Text?

TEIL B — SEO-Seiten (GSC-Gutachten, 72/100):
 B1. 62 leere Rezeptschritte gefüllt: Generator las title/text/description,
     Daten tragen {n, name?, content}. Hol dir pferde-9-12 UND baustelle-3-5
     und vergleiche die gefüllten <ol>-Schritte GEGEN cakeRecipe.steps im
     jeweiligen Quell-JSON (pferde-gross bzw. baustelle-klein): vollständig,
     richtige Reihenfolge, Escaping sauber, name-fett wo vorhanden?
 B2. Generator-Zeile neu (name/content-Mapping mit if/else). Lies den Code:
     erzeugt er für {n, content} ohne name ein sauberes <li> OHNE leeres
     <strong>? Für {name, content} das fette name?
 B3. Versprechens-Satz auf kindergeburtstag-spiele.html geerdet („Zu jedem
     stehen Altersangabe, Material und der Ablauf direkt hier in der
     Liste."). Stimmt diese Aussage gegen die tatsächlichen Listeneinträge?
 B4. Linter-Härtung in check-sichtbarer-text.py: Leerdruck-Regel, dict-Regel
     generisch auf sichtbarem Text, 2-Zeichen-Salat, Sortimentszahlen in
     Komposita + Meta-Descriptions. Konstruiere je Regel einen Durchrutscher
     und einen Fehlalarm-Kandidaten; beurteile am Regex-Wortlaut. Besonders:
     erzeugt die generische dict-Regel Fehlalarme auf legitimen sichtbaren
     Texten (Code-Beispiele, geschweifte Klammern in Prosa)?

WAS KEIN FUND IST:
 * Alles in OFFENE-REVIEW-PUNKTE.md (dort liegt frisch: die Zeichen-Array-
   These zu den elite-motto-JSONs — widerlegt, Felder sind Strings).
 * Die 5 bekannten Wortzahl-WARNUNGEN. Maskuline Formen. Zeitfenster-Überzug.
 * Dass ältere MINORs (Skript-Härtung S28-S30, Fugen-Komposita, Vorlesbarkeit
   der Ritter-Schatzsuche) noch offen sind — bekannter Runde-5-Stoff.

BERICHTSFORM: Je Fund wörtliches Zitat + Datei + möglichst Zeile;
MAJOR / MINOR / UNSICHER; bei Rechnungen die Rechnung zeigen. Am Ende:
Score 0–100 für „beide Fix-Sets sauber, bereit für Deploy", ein Satz
Begründung, die zwei wichtigsten Restpunkte.

Fang mit den Diffs an, nicht mit einer Einschätzung.
