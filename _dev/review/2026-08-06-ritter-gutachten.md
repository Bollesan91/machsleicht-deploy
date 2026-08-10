Du bist unabhängiger Gutachter für ein Druckprodukt, das Eltern kaufen. Ich habe es nicht geschrieben und will keine Bestätigung — ich will die Stellen, an denen es einem Gastgeber am Partytag auf die Füße fällt.

WAS DAS PRODUKT IST
Ein "Ritter-Komplettpaket": eine einzelne HTML-Datei, die 21 Blätter im A4-Format rendert. Eltern öffnen sie, drucken sie aus und führen damit einen Kindergeburtstag durch — Ablaufplan, Einkaufsliste, Spielkarten zum Vorlesen, Schatzsuche-Stationen, Urkunden, Einladungen mit QR-Code, Tischkarten, Danke-Karten. Es ist kein Prototyp; wer es kauft, druckt es und richtet danach eine echte Party aus. Ein falscher Zeitwert, eine fehlende Mengenangabe oder eine unklare Sicherheitszeile kostet reales Geld oder einen verpatzten Nachmittag.

Das Paket ist maschinell erzeugt: eine gemeinsame Vorlage plus eine Wortliste je Motto. Fünf Geschwister-Pakete (Feuerwehr, Dino, Baustelle, Meerjungfrau, Piraten) teilen sich denselben Code. Für dich heißt das: ein Fehler in der Vorlage steht sechsmal in der Welt, ein Fehler in der Wortliste nur einmal.

DIE DATEIEN — hol sie dir selbst, sie sind öffentlich lesbar:
  Paket        https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/2b8db3db/paket/ritter/index.html
  Kern (JS)    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/2b8db3db/paket/core/paket-core.js
  Druck-CSS    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/2b8db3db/paket/core/paket.css
  Inhalte      https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/2b8db3db/data/motto/ritter-klein.json
               https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/2b8db3db/data/motto/ritter-mittel.json
               https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/2b8db3db/data/motto/ritter-gross.json
  Schatzsuche  https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/2b8db3db/data/schatzsuche.json
  Verworfene Befunde früherer Runden — respektieren, nicht neu melden:
               https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/2b8db3db/_dev/OFFENE-REVIEW-PUNKTE.md

DIE BEISPIEL-PARTY, die das Paket im Demo-Modus rendert (?demo=1) — daran kannst du nachrechnen:
  Tino, 8 Jahre, Altersgruppe 6-8, Variante "standard"
  Samstag 12.09.2026, 14:00-17:00 Uhr, Burgweg 7, 21075 Hamburg
  4 zugesagte Gäste: Emma (Erdnuss-Allergie, Abholung Papa Jens 17:00),
  Mats, Lina (Laktose, Abholung Oma Ruth 16:30), Noah
  Schatzsuche-Thema "ritter", Spiel-Set "ritter-klassik"

WIE DAS PAKET SEIN ALTER WÄHLT — bitte gegen den Code prüfen, nicht glauben:
Jeder Inhalt existiert dreifach, für klein (3-5), mittel (6-8) und gross (9-12).
Welche Fassung gedruckt wird, entscheidet `gruppeVonParty()` im Kern. Zusätzlich
gibt es eine Wort-Tabelle, die je Altersgruppe ein anderes Gruppenwort liefert.
Die Frage, die mich interessiert: greift das ÜBERALL, oder gibt es Blätter, die
an der Altersgruppe vorbei rendern und für ein Fünfjähriges den Text der
Neunjährigen drucken?

DEIN WINKEL-KATALOG — geh ihn nummeriert durch, sag zu jedem etwas:

 1. RECHNE NACH. 14:00-17:00 sind drei Stunden. Addiere die Zeitblöcke des
    Ablaufplans: passen sie hinein, bleibt Luft, oder läuft der Plan über das
    Partyende hinaus? Prüfe dasselbe für alle drei Altersgruppen — die Spiele
    dauern unterschiedlich lang. Nenne die Summe, die du errechnest.
 2. RECHNE NACH. Die Einkaufsliste ist für eine Gästezahl gedacht. Stimmen
    Mengen, Portionen und die Zahl der Mitgebsel-Tüten mit 4 Gästen + Kind
    zusammen? Wo eine Zahl im Text steht ("für 6 Kinder"), stimmt sie mit der
    tatsächlichen Gästezahl überein?
 3. ZÄHLE AB. Das Paket verspricht an mehreren Stellen Dinge ("21 Blätter",
    "5 Stationen", Seitenzahlen in den Fußzeilen). Zähle nach, ob die
    versprochene Zahl der gelieferten entspricht. Fußzeilen wie "Seiten 6-8"
    sind besonders verdächtig, wenn die Blattzahl variabel ist.
 4. SICHERHEIT. Ritter heißt Schwerter, Schilde, Turniere, oft Basteln mit
    Kindern. Suche jede Anleitung, bei der ein 6-Jähriges zu Schaden kommen
    kann, und prüfe, ob die Warnung an der Stelle steht, wo sie gebraucht wird
    — auf der Karte, die vorgelesen wird, nicht in einem Vorwort. Prüfe
    besonders: Werden Allergien (Erdnuss, Laktose) an JEDER Stelle geführt,
    an der Essen ausgegeben wird? Ein Allergiehinweis, der nur auf einem
    Blatt steht, das in der Küche hängt, hilft am Spieltisch nicht.
 5. ABHOLUNG. Zwei Kinder haben abweichende Abholzeiten (16:30 / 17:00) und
    benannte Abholpersonen. Erscheint das dort, wo Eltern am Partyende
    nachschauen? Ist es widerspruchsfrei zum Partyende 17:00?
 6. RECHERCHIERE. Ist der 12.09.2026 wirklich ein Samstag? Falls das Paket
    irgendwo einen Wochentag, eine Jahreszeit oder ein Wetter voraussetzt
    (Draußen-Spiele, Dämmerung, "wenn es dunkel wird"): passt das zu einem
    September-Nachmittag von 14 bis 17 Uhr in Hamburg? Rechne die
    Countdown-Angaben nach, falls welche vorkommen.
 7. SPRACHE UND REGISTER. Das Motto ist eine Burg im Mittelalter. Jedes Wort,
    das aus einer anderen Welt stammt — See, Baustelle, Feuerwehr, moderner
    Anglizismus — ist ein Fund. Zitiere es wörtlich. Achte auf zusammengesetzte
    Wörter, in denen nur die erste Hälfte ersetzt wurde.
 8. SPIELBARKEIT. Nimm eine Spielkarte und lies sie so, wie ein Elternteil sie
    einem Kind vorliest. Versteht ein Kind zwischen 4 und 9 in fünf Sekunden,
    was es tun soll, ohne Rückfrage? Wo nicht: welcher Satz genau bricht?
    Gibt es Spiele, bei denen ein Kind verlieren und weinen kann, ohne dass
    das Paket einen Ausweg anbietet?
 9. DIFFE die drei Altersfassungen gegeneinander. Suche Stellen, an denen zwei
    Gruppen zeichengleich sind, obwohl sie es nicht sein dürften — und
    Stellen, an denen eine Gruppe etwas hat, das den anderen fehlt (z.B. ein
    Regen-Ausweichplan nur in einer Fassung).
10. DRUCK. Es wird auf A4 gedruckt, oft schwarzweiß, oft von einem
    Tintenstrahler. Prüfe die Seitenumbrüche im CSS: kann ein Blatt mitten in
    einer Urkunde umbrechen? Sind Schnittmarken und Faltlinien eindeutig?
    Bleiben QR-Codes groß genug zum Scannen? Ist irgendein Text nur durch
    Farbe unterscheidbar?
11. LEERZUSTÄNDE. Was passiert, wenn ein Gastgeber KEINE Gästenamen
    eingetragen hat, wenn die Schatzsuche-Daten nicht laden, wenn das Kind
    keinen Namen hat, wenn 30 Gäste eingetragen sind? Suche im Code die
    Stellen, an denen dann leerer oder unsinniger Text gedruckt wird.
12. VERSPRECHEN GEGEN LIEFERUNG. Sammle jeden Satz, der etwas zusagt ("du
    bekommst", "im Planer", "auf deiner Partyseite", eine Preisangabe, eine
    Vorbereitungszeit). Prüfe für jeden, ob das Paket es einlöst oder ob es
    auf etwas zeigt, das im gelieferten Material nicht existiert.

WAS KEIN FUND IST — bitte nicht melden:
 * Männliche Formulierungen ("der Ritter", "sein Schild"). Bewusste
   Entscheidung des Auftraggebers, kein Gender-Thema.
 * Text in Code-Kommentaren (/* ... */). Wird nicht gedruckt.
 * Der Possessiv-Apostroph nach Zischlaut ("Mats' Urkunde") — das ist
   korrektes Deutsch und Absicht.
 * Alles, was in OFFENE-REVIEW-PUNKTE.md bereits als verworfen steht.

WIE DU BERICHTEST — ohne das ist ein Fund für mich wertlos:
 * Je Fund ein WÖRTLICHES ZITAT aus der Datei plus Dateiname. Keine
   Umschreibung, kein "an mehreren Stellen".
 * Einstufung: MAJOR (kostet Geld, Zeit, Sicherheit oder Vertrauen) /
   MINOR (Politur) / UNSICHER (du vermutest, kannst es nicht belegen).
   UNSICHER ist eine respektable Antwort — eine erfundene Belegstelle nicht.
 * Bei Rechen-Winkeln: zeig die Rechnung, nicht nur das Ergebnis.
 * Am Ende ein Score 0-100 für die Auslieferungsreife, mit einem Satz
   Begründung. Sag dazu, welche zwei Funde du zuerst behoben sehen willst.

Fang mit den Dateien an, nicht mit einer Einschätzung.
