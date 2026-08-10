Du bist unabhängiger Gutachter. Vor dir liegt ein SEO-Reparatursatz an einer Live-Website für Eltern (Kindergeburtstags-Planer). Die Site steckt in einer Google-Deindexierung (308 → 1 Seiten seit April); dieser Änderungssatz soll die aktiven Abwertungs-Signale beseitigen, BEVOR die Sitemap neu eingereicht wird. Ein Fehler hier kostet Monate — dorthin will ich, dass du schaust.

DIE VIER TEILE DES ÄNDERUNGSSATZES

 A) Chirurgische Reparatur: 9 Ratgeber-Seiten (pferde/ritter/baustelle ×
    3 Altersgruppen) renderten seit Mai 18.873 Einzelbuchstaben-<li>
    (ein Generator iterierte Strings statt Listen — jeder Buchstabe wurde
    ein Listenpunkt) plus rohe Python-dict-Literale im Text. Repariert
    wurde im Bestand (kein Neu-Rendern): Zeichen-Läufe konkateniert,
    echte Listen gebaut, dicts zu <strong>title</strong> body. Der
    Generator selbst wurde ebenfalls gefixt.
 B) Zahlen-Sweep: Die Site behauptete auf 15 Dateien drei Generationen
    veralteter Sortimentszahlen („7 Mottos", „9 Themen/Mottos",
    „12 Mottos") — Wahrheit ist 15. Dazu steckte auf 9 Schatzsuche-Seiten
    ein kaputtes verschachteltes <a>-in-<a> mit Streu-„rarr;". Und:
    /kindergeburtstag-spiele feuerte 20 tote Links (10 nie gebaute
    Alters-URLs, 10 nie gebaute /spiel/*-Seiten) und hatte 0 interne
    Inbounds.
 C) Sitemap-Diät: 16 dünne URLs raus (14 Template-Schatzsuche-Seiten mit
    248–317 sichtbaren Wörtern — meerjungfrau bleibt als einzige drin —
    plus 2 JS-App-Shells ohne Servertext). baby.html + einschulung.html
    (73–83 Wörter) auf noindex,follow. Zwei Redirects umgebogen. Der
    Sitemap-Generator hatte zusätzlich zwei stille Drifts, die ein
    blinder Lauf ausgelöst hätte — beide gefixt.
 D) Neue Prüf-Stufe: Ein Linter-Check zählt jetzt sichtbare Wörter
    (script/style/JSON-LD raus) und hält die Muster aus A und B
    maschinell draußen.

DAS PRÜFOBJEKT — hol es dir selbst, alles öffentlich lesbar (SHA 6c4a2148):

  Die drei Diffs:
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/6c4a2148/_dev/review/2026-08-10-gsc-sofort-code.patch
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/6c4a2148/_dev/review/2026-08-10-gsc-sofort-m4-probe.patch
      (eine der 9 reparierten Seiten als Muster — die übrigen 8 folgen
       demselben Verfahren; prüf das Verfahren am Muster und stichprobe
       die After-States)
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/6c4a2148/_dev/review/2026-08-10-gsc-sofort-sitemap.patch

  Der Stand NACH den Änderungen (After-State):
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/6c4a2148/kindergeburtstag/pferde-9-12-jahre.html
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/6c4a2148/kindergeburtstag/ritter-3-5-jahre.html
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/6c4a2148/kindergeburtstag/baustelle-6-8-jahre.html
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/6c4a2148/schatzsuche/dino.html
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/6c4a2148/schatzsuche-kindergeburtstag.html
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/6c4a2148/kindergeburtstag-spiele.html
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/6c4a2148/sitemap.xml
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/6c4a2148/_dev/scripts/generate-sitemap.js
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/6c4a2148/_dev/scripts/check-sichtbarer-text.py
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/6c4a2148/baby.html

  Die Datenwahrheit (Quelle der reparierten Listen + der Sortimentszahlen):
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/6c4a2148/_src/elite-motto-data/pferde-gross.json
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/6c4a2148/data/schatzsuche.json

  Verworfene Befunde früherer Runden — respektieren, nicht neu melden:
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/6c4a2148/_dev/OFFENE-REVIEW-PUNKTE.md

DEIN AUFTRAG — nummerierte Winkel, je Winkel mit Beleg:

 1. VERLUSTFREIHEIT (Teil A): Nimm im m4-probe-Diff einen kompletten
    entfernten Einzelzeichen-Block, konkateniere die Zeichen von Hand und
    vergleiche mit den neuen Listenzeilen UND mit dem passenden Feld in
    pferde-gross.json. Ist irgendwo Text verlorengegangen oder erfunden
    worden? Suche gezielt: Zeilen, die im Vorher-Stand als normaler Text
    standen und im Nachher fehlen. Prüfe die dict-Tipps: sind title UND
    body vollständig, ist das Escaping sauber (kein &amp;amp;, keine
    rohen <)?
 2. RENDER-KORREKTHEIT (Teil A): Öffne den After-State einer zweiten
    Seite (ritter-3-5 oder baustelle-6-8). Sind ALLE Listen jetzt echte
    Zeilen? Findest du noch Einzelzeichen-<li>, halbe Wörter, doppelte
    Zeilen, kaputte Emoji (Surrogate)?
 3. ZAHLEN-WAHRHEIT (Teil B): Rechne nach — wie viele Einträge hat
    data/schatzsuche.json wirklich? Stimmt „15" überall im After-State?
    Suche verbliebene „7/9/10/12/14 Mottos|Themen" in den After-States.
    schatzsuche-kindergeburtstag.html: Die neue H2-Sektion nennt 15
    Themen und listet 6 Klassiker — passt Überschrift, Intro-Satz und
    Kartenzahl jetzt zusammen?
 4. MARKUP (Teil B): Ist das <a>-in-<a> überall raus? Validiere die
    ersetzten Zeilen in schatzsuche/dino.html. Prüfe die zwei neuen
    Inbound-Links (kindergeburtstag.html Ratgeber-Nav, index.html
    Chipleiste) auf HTML-Validität und sinnvolle Anker-Texte.
 5. LINK-ZIELE (Teil B): Existieren die 3 neuen Alterskarten-Ziele
    (/kindergeburtstag/3-5-jahre …)? Ist das Entlinken der 10 Klassiker
    sauber (kein hängender Satz, kein „mehr dazu hier" ohne Link)?
 6. SITEMAP-DIFF (Teil C): Rechne den Set-Diff des sitemap-Patches nach:
    Sind es GENAU die 16 genannten URLs? Ist meerjungfrau noch drin?
    Ist eine URL rausgefallen, die substanziell ist (Stichprobe: hol dir
    eine der entfernten Seiten und zähle sichtbare Wörter selbst)?
 7. GENERATOR (Teil C): Lies generate-sitemap.js. Konstruiere je einen
    Fall, der durchrutscht: (a) eine neue dünne Seite ausserhalb der
    Ausschlussmuster, (b) ein neues Schatzsuche-Motto, (c) eine
    game-Datei, die nicht /spiele/game-* heißt. Was passiert beim
    nächsten blinden Lauf?
 8. NOINDEX (Teil C): baby.html — sitzt das noindex,follow richtig
    (Position, Syntax, kein Konflikt mit canonical)? Recherchiere kurz:
    ist noindex,follow hier die richtige Wahl gegenüber 301, wenn die
    Seiten intern kaum verlinkt sind?
 9. REDIRECTS (Teil C): /schnitzeljagd → /schatzsuche-kindergeburtstag
    und /schnitzeljagd-drinnen → /schatzsuche-drinnen — prüfe im
    code-patch: entstehen Ketten (301 auf 301) oder Loops mit den
    bestehenden Regeln im selben File?
10. PRÜF-STUFE (Teil D): Lies check-sichtbarer-text.py. Konstruiere
    Fälle, die durchrutschen: Umformulierungen („Themen: 9", „neun
    Themen"), 2er-Salat-Läufe, dict-Varianten. Erzeugt die Stufe
    Fehlalarme auf legitimen Inhalten (Komposita, Preise, Datumszahlen)?
    Ist die Wortzähl-Methode fair (was fehlt ihr noch: Alt-Texte,
    versteckte Accordions)?
11. GESAMTWIRKUNG: Aus SEO-Sicht — enthält dieser Satz irgendetwas, das
    die Erholung VERSCHLECHTERT (z. B. Signalverlust durch die
    Sitemap-Schrumpfung, noindex auf verlinkten Seiten, Anker-Text-
    Verluste durch das Entlinken)?

WAS KEIN FUND IST — bitte nicht melden:
 * Die 5 bekannten Linter-WARNUNGEN (2 About-Seiten + 3 Alters-Hubs
   unter 500 Wörtern) — eingeplanter 14-Tage-Ausbau, steht im Kommentar.
 * Dass die 14 Schatzsuche-Seiten dünn SIND — genau deshalb fliegen sie
   raus; der Ausbau ist ein separates Programm.
 * Maskuline Formen und ausgeschriebene Paarformen — bewusste
   Entscheidung des Auftraggebers.
 * Alles, was in OFFENE-REVIEW-PUNKTE.md als verworfen steht.

WIE DU BERICHTEST:
 * Je Fund ein WÖRTLICHES ZITAT aus Datei/Diff plus Dateiname, wo
   möglich Zeilennummer. Hol das Zitat aus der Datei, nicht aus dem
   Gedächtnis.
 * MAJOR (kostet Index-Erholung, Geld oder Vertrauen) / MINOR (Politur)
   / UNSICHER (Vermutung ohne Beleg). UNSICHER ist respektabel — eine
   erfundene Belegstelle nicht.
 * Bei Rechen-Fragen: zeig die Rechnung.
 * Am Ende ein Score 0–100 für „bereit für den GSC-Re-Submit", ein Satz
   Begründung, plus die zwei Funde, die du zuerst behoben sehen willst.

Fang mit den Diffs an, nicht mit einer Einschätzung.
