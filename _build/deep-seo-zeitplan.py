#!/usr/bin/env python3
"""
Deep SEO Upgrade: Zeitplan-Seite
- FAQPage-Schema mit 6 echten Fragen aus dem Content
- HowTo-Schema mit 7 Phasen eines 2,5-h-Plans (der meistgesuchte)
Idempotent: prüft ob FAQPage/HowTo schon da.
"""
import re
from pathlib import Path

FILE = Path(__file__).parent.parent / "kindergeburtstag-zeitplan.html"
content = FILE.read_text(encoding="utf-8")

# Idempotency
if '"FAQPage"' in content:
    print("FAQPage schon vorhanden — skip")
else:
    faq_schema = '''  <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Wie lange sollte ein Kindergeburtstag dauern?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Je nach Alter: 3–5 Jahre brauchen 2 Stunden, 6–8 Jahre 2,5 Stunden, 9–12 Jahre 3 Stunden. Länger ist fast immer kontraproduktiv — Kinder werden übermüdet und die Stimmung kippt. Kürzer wirkt abgehackt, weil Essen und zwei Spiele schon fast eine Stunde fressen."
      }
    },
    {
      "@type": "Question",
      "name": "Wann sollte der Geburtstagskuchen im Ablauf stehen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Idealerweise in der zweiten Hälfte, nach dem ersten aktiven Spieleblock. Nicht ganz am Anfang (Kinder sind noch nicht angekommen) und nicht ganz am Ende (sorgt für Zucker-Crash kurz vor Abholung). Plane mindestens 15 Minuten fürs Kuchenessen ein — kürzer funktioniert nie."
      }
    },
    {
      "@type": "Question",
      "name": "Wie viele Spiele schaffe ich in 2 Stunden?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Maximal 3 bis 4 Spiele. Rechne pro Spiel 15–20 Minuten inklusive Erklären, Aufbauen und Jubel. Dazu Ankommen, Kuchen essen, Mitgebsel verteilen — das frisst schon eine knappe Stunde. Weniger ist hier mehr. Lieber drei gute Spiele als sieben hastige."
      }
    },
    {
      "@type": "Question",
      "name": "Brauche ich einen Puffer im Zeitplan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, mindestens 15 Minuten. Kinder kommen selten pünktlich, Spiele dauern oft länger als geplant, jemand weint, jemand muss aufs Klo. Der Puffer verhindert, dass du am Ende hektisch wirst. Plane ihn am besten in der Mitte ein — nicht am Ende, dort wird er von der Realität sowieso gefressen."
      }
    },
    {
      "@type": "Question",
      "name": "Was tun wenn ein Spiel floppt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sofort abbrechen und zum nächsten Spiel wechseln. Keine Kinder dazu zwingen, ein Spiel zu Ende zu spielen, das nicht zieht. Halte 1–2 Backup-Spiele bereit (Stopptanz geht immer, ein Kartenspiel auch) und streiche stattdessen ein anderes geplantes Spiel. Lieber drei begeisterte Spiele als fünf halbherzige."
      }
    },
    {
      "@type": "Question",
      "name": "Ab wann sollten die Eltern wieder auftauchen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "15 Minuten vor Ende — genug Zeit, um Mitgebsel zu verteilen, zu verabschieden und noch kurz mit den Eltern zu sprechen. Abholzeit klar auf der Einladung kommunizieren und nicht flexibel halten. Sonst sitzt du in einer Stunde alleine mit zwei Übriggebliebenen und dem Chaos."
      }
    }
  ]
}
  </script>
'''

    howto_schema = '''  <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Kindergeburtstag-Zeitplan für 2,5 Stunden (6–8 Jahre) erstellen",
  "description": "Sieben-Phasen-Ablauf für einen Kindergeburtstag von 2,5 Stunden bei Kindern zwischen 6 und 8 Jahren — erprobt und mit Puffer.",
  "totalTime": "PT2H30M",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Ankommen und erstes Spiel",
      "text": "Erste 10 Minuten: Kinder kommen nach und nach an, legen Geschenke ab, begrüßen sich. Sofort ein einfaches Warmlauf-Spiel starten, damit keine Leerläufe entstehen — Namensrunde mit Bewegung, Luftballon-Klopfen oder ähnlich. Kein Spiel mit komplexen Regeln, weil noch nicht alle da sind."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Erstes Hauptspiel",
      "text": "Minute 10 bis 30: Das erste geplante Hauptspiel. Idealerweise etwas Aktives — Schatzsuche-Einstieg, Stopptanz mit Motto-Aufgaben, Parcours. Energie ist jetzt hoch, das nutzen."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Kuchen und Kerzen",
      "text": "Minute 30 bis 50: Runterkommen bei Kuchen und Saft. Kerzen auspusten, Happy Birthday singen, Geschenke auspacken. 20 Minuten einplanen — kürzer fühlt sich gehetzt an, länger fangen die Kinder an rumzuzappeln."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Zweites Hauptspiel",
      "text": "Minute 50 bis 80: Das zweite große Spiel. Jetzt kann es ruhiger sein — Basteln, Schatzsuche-Auflösung, Kreativ-Station. Kinder sind nach dem Kuchen oft weniger motorisch-wild, dafür konzentrationsfähiger."
    },
    {
      "@type": "HowToStep",
      "position": 5,
      "name": "Pufferzeit und freies Spiel",
      "text": "Minute 80 bis 95: 15 Minuten Puffer. Entweder hat alles länger gedauert als geplant — dann fängt dieser Block alles auf. Oder es gab keinen Verzug — dann spielen die Kinder frei, essen nochmal, gehen aufs Klo. Beides ist gut."
    },
    {
      "@type": "HowToStep",
      "position": 6,
      "name": "Drittes Spiel oder Rausholaktion",
      "text": "Minute 95 bis 130: Letztes Spiel oder eine größere Aktion. Bei Schatzsuche ist das oft der Schatz-Fund. Energie-Peak nochmal einplanen — die Kinder wissen, dass es bald endet, und wollen einen Höhepunkt."
    },
    {
      "@type": "HowToStep",
      "position": 7,
      "name": "Mitgebsel und Verabschiedung",
      "text": "Letzte 20 Minuten: Mitgebsel-Tüten verteilen, jedes Kind einzeln verabschieden, kurz mit Eltern sprechen. Nicht vergessen: Jacken, Schuhe, vergessene Trinkflaschen rauskramen. Diese Phase braucht mehr Zeit, als man denkt."
    }
  ]
}
  </script>
'''

    # Insert both schemas after the last existing JSON-LD
    matches = list(re.finditer(
        r'<script type="application/ld\+json">.*?</script>',
        content, re.DOTALL
    ))
    if matches:
        insert_pos = matches[-1].end()
        content = (
            content[:insert_pos]
            + "\n" + faq_schema.rstrip()
            + "\n" + howto_schema.rstrip()
            + content[insert_pos:]
        )
        FILE.write_text(content, encoding="utf-8")
        print("✅ FAQPage + HowTo zu Zeitplan hinzugefügt")
    else:
        print("❌ kein JSON-LD gefunden")
