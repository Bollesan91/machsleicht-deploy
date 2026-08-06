Du bist unabhängiger Gutachter. Vor dir liegt ein Änderungssatz an einem Druckprodukt, das Eltern kaufen. Ich will wissen, ob diese Änderungen halten, was ihre eigenen Kommentare behaupten — und ob sie dabei etwas anderes kaputt gemacht haben.

WAS DAS PRODUKT IST
Ein „Ritter-Komplettpaket": eine HTML-Datei, die 21 Blätter im A4-Format rendert. Eltern öffnen sie, drucken sie aus und führen damit einen Kindergeburtstag durch — Ablaufplan, Einkaufsliste, Spielkarten zum Vorlesen, Schatzsuche-Stationen, Urkunden, Einladungen, Tischkarten, Danke-Karten. Wer es kauft, druckt es und richtet danach eine echte Party aus.

Es ist maschinell erzeugt: eine gemeinsame Vorlage (`paket/_maschine/template.html`) plus eine Wortliste je Motto (`paket/_maschine/manifeste/<motto>.json`, 100 Slots). Sechs Mottos teilen sich die Vorlage. Für dich heißt das: eine Änderung an der Vorlage steht sechsmal in der Welt, eine Änderung an einer Wortliste einmal.

DIE DATEIEN — hol sie dir selbst, sie sind öffentlich lesbar:

  Der Änderungssatz (das eigentliche Prüfobjekt, unified diff):
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/777726d4/_dev/review/2026-08-06-ritter-diff.patch

  Der Stand NACH den Änderungen:
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/777726d4/paket/ritter/index.html
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/777726d4/paket/core/paket-core.js
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/777726d4/paket/core/paket.css
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/777726d4/paket/_maschine/template.html

  Die Inhalte, aus denen gerendert wird:
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/777726d4/data/motto/ritter-klein.json
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/777726d4/data/motto/ritter-mittel.json
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/777726d4/data/motto/ritter-gross.json
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/777726d4/data/schatzsuche.json

  Ein Geschwister-Paket zum Quervergleich (dieselbe Vorlage, andere Wortliste):
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/777726d4/paket/dino/index.html

  Verworfene Befunde früherer Runden — respektieren, nicht neu melden:
    https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/777726d4/_dev/OFFENE-REVIEW-PUNKTE.md

DIE BEISPIEL-PARTY, die das Paket im Demo-Modus rendert (`?demo=1`):
  Tino, 8 Jahre, Altersgruppe 6-8, Variante „standard"
  Samstag 12.09.2026, 14:00-17:00 Uhr, Burgweg 7, 21075 Hamburg
  Zusagen: Emma (Erdnuss-Allergie, Abholung Papa Jens 17:00), Mats,
  Lina (Laktose, Abholung Oma Ruth 16:30), Noah, Ida — Ben hat abgesagt
  Mit `?demo=1&age=4` bzw. `&age=11` laden die klein- und gross-Fassungen.

DEIN AUFTRAG — in dieser Reihenfolge:

TEIL A — hält jede Änderung, was sie behauptet?
Die Änderungen tragen Kommentare, die begründen, was sie reparieren sollen.
Prüfe jede gegen die Datei, NICHT gegen ihren Kommentar. Ein Kommentar ist
eine Behauptung des Autors, kein Beleg. Konkret für jede Änderung:
  a) Tut der Code, was der Kommentar sagt?
  b) Tut er es in ALLEN Fällen — auch klein/mittel/gross, auch minimal/
     standard/wow, auch im Leerzustand (keine Zusagen), auch im öffentlichen
     Modus (Gästedaten gestrippt)?
  c) Gibt es einen Eingabewert, bei dem die Änderung Unsinn druckt?

TEIL B — was hat sie kaputt gemacht?
Fix-induzierte Fehler sind erfahrungsgemäß die häufigste Quelle späterer
schwerer Befunde. Suche gezielt:
 1. Neue Funktionen in der Vorlage (Namen stehen im Diff). Werden sie an
    Stellen aufgerufen, an denen ihre Variablen gar nicht im Sichtbereich
    liegen? Kollidieren Namen mit vorhandenen?
 2. Die Vorlage wird von SECHS Mottos geteilt. Welche der Änderungen ist für
    ritter richtig und für ein anderes Motto falsch oder sinnlos? Vergleich
    mit dem dino-Paket.
 3. Eine Änderung UNTERDRÜCKT Ausgabe unter einer Bedingung. Unterdrückt sie
    damit auch etwas, das gebraucht würde? Rechne durch, wann die Bedingung
    greift.
 4. Rechne die Zahlen nach, die jetzt berechnet statt geschrieben werden.
    Stimmen sie mit dem überein, was daneben steht?
 5. CSS: eine Regel verschiebt Inhalt und zeichnet eine Linie. Prüfe sie für
    A4-DRUCK, nicht nur für den Bildschirm — Seitenumbruch, Zeilenhöhen,
    Überlauf. Bleibt alles lesbar und passt es auf sein Blatt?
 6. Escaping und Sicherheit: nehmen die neuen Ausgabepfade Nutzereingaben
    (Namen, Allergietexte, Abholpersonen) ungeprüft entgegen?

TEIL C — die Prüfskripte
Drei neue Prüfskripte liegen im Diff, dazu eine Änderung an einem vorhandenen.
Sie sollen künftig Fehlerklassen fangen, damit kein Gutachter sie zweimal
findet. Frag für jedes:
  a) Fängt es wirklich die Klasse, die es zu fangen behauptet? Konstruier
     einen Fall, der durchrutscht.
  b) Erzeugt es Fehlalarme, die jemanden dazu bringen, es abzuschalten?
  c) Die Änderung am vorhandenen Skript macht es TOLERANTER. Macht sie es
     zu tolerant — welcher echte Fehler rutscht jetzt durch?

TEIL D — was ist am Produkt noch offen?
Unabhängig vom Diff: was fällt einem Gastgeber am Partytag noch auf die Füße?
Rechne die Zeiten, zähle die Mengen gegen die Gästezahl, lies eine
Vorlese-Karte so, wie ein Elternteil sie einem Kind vorliest.

WAS KEIN FUND IST — bitte nicht melden:
 * Männliche Formulierungen („der Ritter", „sein Schild"). Bewusste
   Entscheidung des Auftraggebers, kein Gender-Thema.
 * Text in Code-Kommentaren. Wird nicht gedruckt.
 * Der Possessiv-Apostroph nach Zischlaut („Mats' Urkunde") — korrektes
   Deutsch und Absicht.
 * Alles, was in OFFENE-REVIEW-PUNKTE.md als verworfen steht.

WIE DU BERICHTEST:
 * Je Fund ein WÖRTLICHES ZITAT aus der Datei plus Dateiname und, wo möglich,
   Zeilennummer. Keine Umschreibung.
 * Einstufung: MAJOR (kostet Geld, Zeit, Sicherheit oder Vertrauen) /
   MINOR (Politur) / UNSICHER (du vermutest, kannst es nicht belegen).
   UNSICHER ist eine respektable Antwort — eine erfundene Belegstelle nicht.
   Wenn du eine Stelle zitierst, hol sie wörtlich aus der Datei; Zitate aus
   dem Gedächtnis oder aus einem Geschwister-Paket sind wertlos.
 * Bei Rechen-Fragen: zeig die Rechnung, nicht nur das Ergebnis.
 * Am Ende ein Score 0-100 für die Auslieferungsreife, mit einem Satz
   Begründung, plus die zwei Funde, die du zuerst behoben sehen willst.

Fang mit dem Diff an, nicht mit einer Einschätzung.
