#!/usr/bin/env python3
"""P1-11 Seite 5: einladung-text."""
import re
from pathlib import Path
FILE = Path(__file__).parent.parent / "kindergeburtstag-einladung-text.html"
content = FILE.read_text(encoding="utf-8")

if '"FAQPage"' in content and '"HowTo"' in content:
    print("skip"); raise SystemExit(0)

schemas = []
schemas.append('''  <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was muss in einer Einladung zum Kindergeburtstag stehen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sieben Pflicht-Infos: Name des Geburtstagskindes, Alter wird wievielt, Datum, Uhrzeit von und bis, Adresse, Kontakt der Eltern fuer Rueckfragen, und Hinweis auf Mitbringsel oder spezielle Kleidung. Bei Motto-Partys das Motto. Bei besonderen Anlaessen (Schwimmbad, draussen, Uebernachtung) Hinweis auf Ausruestung. Abholzeit klar angeben — nicht 'gegen 17 Uhr' sondern '17 Uhr'."
      }
    },
    {
      "@type": "Question",
      "name": "WhatsApp oder Papier-Einladung — was ist besser?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "WhatsApp ist schneller, kostenlos, und erreicht alle Eltern direkt. Papier macht mehr Freude beim Kind und funktioniert gut wenn die Kinder sie in der Schule verteilen. Mischung ist oft am besten: Papier-Einladung zum Weitergeben plus WhatsApp-Nachricht an die Eltern mit den Details. Wichtig: Rueckmeldung per WhatsApp einfordern, damit du die Planung hast."
      }
    },
    {
      "@type": "Question",
      "name": "Wie frueh soll ich die Einladung verschicken?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Drei bis vier Wochen vorher ist optimal. Frueher wird vergessen, spaeter haben viele Familien schon Plaene. Bei Ferien-Zeiten noch frueher einplanen, weil Familien dann oft wegfahren. Faustregel: je groesser die Familien und je beliebter die Kinder, desto frueher. Letzter moeglicher Zeitpunkt: zehn Tage vorher, spaeter sagen viele schon ab."
      }
    },
    {
      "@type": "Question",
      "name": "Wie viele Kinder sollte ich einladen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Alter-plus-eins-Regel ist ein guter Startpunkt: fuenf Jahre = sechs Kinder, sieben Jahre = acht Kinder. Groesser wird organisatorisch aufwendig. Fuer zuhause ist acht bis zehn das Maximum. Bei Location-Partys (Schwimmbad, Bowling) sind zwoelf realistisch. Kinder der eigenen Klasse oder Kita — entweder alle oder nur die engsten Freunde einladen, nicht halb-halb, das gibt Stress."
      }
    },
    {
      "@type": "Question",
      "name": "Soll ich in der Einladung um Geschenke-Wuensche bitten?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, das entlastet die Eltern. Eine kurze Formulierung reicht: 'Wer moechte, kann sich am gemeinsamen Geschenk beteiligen — Details bei Nachfrage'. Oder konkret: 'Wir freuen uns ueber Buecher und Spielsachen fuer sieben bis acht Jahre'. Ohne Hinweise bekommen manche Kinder drei identische Geschenke. Dezent formulieren, keinen Zwang aufbauen."
      }
    },
    {
      "@type": "Question",
      "name": "Was tun, wenn Eltern nicht antworten?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nach fuenf Tagen einmal hoeflich nachfragen: 'Hi, kleine Erinnerung — Zusage bis [Datum] waere super fuer die Planung.' Wenn auch das unbeantwortet bleibt, davon ausgehen dass das Kind nicht kommt. Nicht vier Mal nachhaken, das wirkt verzweifelt. Als Geburtstagskind-Elternteil einplanen, dass ein bis zwei Kinder absagen koennen — beim Einkauf etwas Puffer lassen."
      }
    }
  ]
}
  </script>''')

schemas.append('''  <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Einladung zum Kindergeburtstag schreiben in 5 Schritten",
  "description": "Einladungstext formulieren und verschicken — komplett in unter 20 Minuten.",
  "totalTime": "PT20M",
  "step": [
    {"@type":"HowToStep","position":1,"name":"Pflicht-Infos sammeln (5 Min)","text":"Name, Alter, Datum, Uhrzeit (von-bis), Adresse, Kontakt-Nummer, Hinweis auf Motto oder Ausruestung. Alle sieben Punkte auf einen Zettel schreiben. Erst dann formulieren."},
    {"@type":"HowToStep","position":2,"name":"Tonalitaet waehlen (2 Min)","text":"WhatsApp = lockerer Ton, mit Emojis. Papier-Karte = etwas foermlicher. Motto-Party = thematische Sprache (Pirat: 'Ahoi!', Einhorn: 'Magische Einladung'). Nicht ueberdrehen, nicht zu nuechtern."},
    {"@type":"HowToStep","position":3,"name":"Text in unter 80 Woertern formulieren (8 Min)","text":"Begruessung, Anlass, Datum + Uhrzeit, Adresse, Mitbringsel-Info, Rueckmeldung erbitten. Nicht laenger — Eltern skimmen. Wichtige Infos in eine Zeile pro Punkt, gut lesbar auf Smartphone."},
    {"@type":"HowToStep","position":4,"name":"Rueckmeldung einfordern (2 Min)","text":"'Bitte kurz zusagen bis [Datum]' einbauen. Ohne Deadline antworten viele nicht. Deadline drei bis fuenf Tage vor Party setzen, nicht frueher."},
    {"@type":"HowToStep","position":5,"name":"Verschicken und dokumentieren (3 Min)","text":"WhatsApp-Verteiler aufsetzen, Papier-Karten verteilen, Liste anlegen mit Zusage-Status. Zwei Tage vor Party nochmal kurze Erinnerungs-Nachricht mit Adresse und Uhrzeit."}
  ]
}
  </script>''')

matches = list(re.finditer(r'<script type="application/ld\+json">.*?</script>', content, re.DOTALL))
if matches:
    insert_pos = matches[-1].end()
    content = content[:insert_pos] + "\n" + "\n".join(s.rstrip() for s in schemas) + content[insert_pos:]
    FILE.write_text(content, encoding="utf-8")
    print(f"✅ einladung-text: {len(schemas)} Schemas")
