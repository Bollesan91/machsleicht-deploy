#!/usr/bin/env python3
"""P1-11 Seite 4: wenig-aufwand."""
import re
from pathlib import Path
FILE = Path(__file__).parent.parent / "kindergeburtstag-wenig-aufwand.html"
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
      "name": "Was brauche ich wirklich mindestens für einen Kindergeburtstag?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fünf Dinge: Kuchen mit Kerzen, zwei bis drei einfache Spiele, Getränke, ein Mitgebsel pro Kind, und zwei Stunden Zeit. Alles andere ist Bonus. Pinterest-würdige Deko, Motto-Themenwelt, aufwändiges Essen — schön, aber nicht kritisch. Die Kinder merken vor allem, ob die Eltern entspannt und präsent sind. Das ersetzt jede Deko-Pracht."
      }
    },
    {
      "@type": "Question",
      "name": "Wie viel Budget brauche ich minimum?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mit 25 bis 40 Euro kommst du für sechs bis acht Kinder durch. Konkret: 5 Euro Kuchen, 8 Euro Getränke, 10 Euro Snacks, 12 Euro Mitgebsel (1,50 Euro pro Kind), 5 Euro Deko. Wer Kuchen selbst bäckt statt kauft, spart 2 Euro; wer auf Deko verzichtet, spart 5 Euro. Unter 20 Euro wird es eng, über 50 Euro ist für Minimal-Party ineffizient."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Spiele gehen ohne Vorbereitung?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stopptanz mit Handy-Musik: null Vorbereitung. Stille Post: null Material. Reise nach Jerusalem: nur Stühle nötig. Verstecken: geht überall. Topfschlagen: Topf plus Kochlöffel. Blinde Kuh: Tuch genügt. Alle sechs Spiele zusammen decken eine Stunde Party ab, Vorbereitungszeit unter zehn Minuten."
      }
    },
    {
      "@type": "Question",
      "name": "Kann ich Deko komplett weglassen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja. Minimum ist: ein Luftballon an der Tür, ein Geburtstags-Schild (aus Papier gebastelt reicht), Kerzen auf dem Kuchen. Mehr brauchen die Kinder nicht, und sie merken es kaum. Aufwändige Deko ist für Erwachsene — Kinder nehmen sie zehn Sekunden wahr und vergessen sie dann. Investiere die Zeit in Spiele stattdessen."
      }
    },
    {
      "@type": "Question",
      "name": "Was ist mit Einladungen — brauche ich welche?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eine WhatsApp-Nachricht an die Eltern reicht. Datum, Uhrzeit, Adresse, Abholzeit — das ist alles. Gebastelte Einladungskarten sind schön, aber null Pflicht. Wenn du doch etwas Digitales möchtest, gibt es kostenlose Einladungs-Tools, die in fünf Minuten fertig sind. Papierkarten basteln ist liebevoll, aber pure Zeitinvestition — nicht notwendig."
      }
    },
    {
      "@type": "Question",
      "name": "Wird mein Kind enttäuscht sein von einer Minimal-Party?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nein, wenn die Energie stimmt. Kinder messen Geburtstage nicht an Deko-Aufwand, sondern an Spaß. Eine gut organisierte zweistündige Party mit vier guten Spielen ist in Kindererinnerung besser als eine dreistündige Instagram-Party mit gestressten Eltern. Wichtiger als Aufwand: deine Präsenz, gute Laune, klare Struktur."
      }
    }
  ]
}
  </script>''')

schemas.append('''  <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Kindergeburtstag mit minimalem Aufwand planen (5 Schritte)",
  "description": "Fünfstufiger Ablauf für eine funktionierende Party in unter 90 Minuten Vorbereitung.",
  "totalTime": "PT1H30M",
  "step": [
    {"@type":"HowToStep","position":1,"name":"Einkauf in 30 Minuten","text":"Supermarkt-Einkauf: Fertigkuchen, Kerzen, Getränke, Mitgebsel-Süßigkeiten (Mischtüte), eine Packung Luftballons. Ein Gang. Nicht vergleichen, nicht überlegen."},
    {"@type":"HowToStep","position":2,"name":"Wohnung kindersicher (15 Min)","text":"Wertvolles wegräumen, Teppiche sichern, Tisch aus dem Weg. Keine Perfektion, nur Sicherheit. Küchenrolle griffbereit."},
    {"@type":"HowToStep","position":3,"name":"Deko in 10 Minuten","text":"Luftballons aufpusten, ein Geburtstags-Schild an die Tür, fertig. Mehr nicht."},
    {"@type":"HowToStep","position":4,"name":"Spiele-Material bereitlegen (10 Min)","text":"Musik-Playlist für Stopptanz, Kochlöffel für Topfschlagen, Löffel und Tischtennisbälle für Eierlauf. Alles in einer Kiste."},
    {"@type":"HowToStep","position":5,"name":"Durchatmen und loslegen (20 Min Puffer)","text":"Kuchen bereitstellen, Getränke kalt, Mitgebsel-Tüten packen. Eine halbe Stunde vor Start fertig sein. Hektik überträgt sich auf Kinder."}
  ]
}
  </script>''')

matches = list(re.finditer(r'<script type="application/ld\+json">.*?</script>', content, re.DOTALL))
if matches:
    insert_pos = matches[-1].end()
    content = content[:insert_pos] + "\n" + "\n".join(s.rstrip() for s in schemas) + content[insert_pos:]
    FILE.write_text(content, encoding="utf-8")
    print(f"✅ wenig-aufwand: {len(schemas)} Schemas")
