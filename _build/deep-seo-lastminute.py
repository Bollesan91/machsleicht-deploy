#!/usr/bin/env python3
"""Deep SEO: kindergeburtstag-last-minute.html — FAQPage + HowTo (Last-Minute-Ablauf)."""
import re
from pathlib import Path

FILE = Path(__file__).parent.parent / "kindergeburtstag-last-minute.html"
content = FILE.read_text(encoding="utf-8")

has_faq = '"FAQPage"' in content
has_howto = '"HowTo"' in content
if has_faq and has_howto:
    print("Beide da — skip")
    raise SystemExit(0)

schemas = []

if not has_faq:
    schemas.append('''  <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Kann ich einen Kindergeburtstag wirklich in zwei Stunden vorbereiten?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, wenn du die richtigen Abkürzungen nimmst: Supermarktkuchen statt selbstbacken, Luftballons plus eine Girlande als Deko, zwei bis drei einfache Spiele, Pizza oder Würstchen zum Essen. Das Ergebnis ist nicht Pinterest-würdig, aber die Kinder werden keinen Unterschied merken. Die wichtigste Regel: weniger perfekt planen, mehr präsent sein während der Party."
      }
    },
    {
      "@type": "Question",
      "name": "Was sind die drei wichtigsten Dinge bei einer Last-Minute-Party?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Erstens: Kerzen für den Kuchen — ohne Kerzen ist es kein Geburtstag. Zweitens: zwei gute Spiele — das trägt zwei Stunden. Drittens: Mitgebsel — auch nur eine kleine Sache, damit kein Kind enttäuscht geht. Alles andere ist Bonus. Luftballons, Deko und aufwändiges Essen sind schön, aber nicht kritisch."
      }
    },
    {
      "@type": "Question",
      "name": "Kann ich auf die Einladungskarten verzichten?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja — bei Last-Minute reicht eine WhatsApp-Nachricht an die Eltern. Das ist heute Standard und niemand findet das unpassend. Wichtig ist, dass Datum, Uhrzeit, Adresse und Abholzeit klar drinstehen. Wer es etwas schicker möchte, nutzt ein kostenloses Einladungs-Tool — dauert fünf Minuten und sieht deutlich besser aus als eine reine Textnachricht."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Spiele funktionieren ohne Vorbereitung?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stopptanz braucht nur Musik und eine Play-Pause-Taste. Topfschlagen braucht einen Kochlöffel und eine Überraschung im Topf. Eierlauf braucht Löffel und Tischtennisbälle. Alle drei sind in zehn Minuten erklärt und halten eine Party zwanzig bis dreißig Minuten am Laufen. Zusammen sind das schon eineinhalb Stunden ohne große Vorbereitung."
      }
    },
    {
      "@type": "Question",
      "name": "Was mache ich, wenn der Kuchen nicht rechtzeitig fertig wird?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Supermarkt, Bäcker oder Tankstelle. Fast jeder größere Supermarkt hat Geburtstagskuchen im Angebot — oft sogar mit Motto-Motiven. Der Kuchen ist nicht der Teil der Party, an den Kinder sich erinnern. Sie erinnern sich an die Kerzen, das Lied und die Geschenke. Also: Stress rausnehmen, fertigen Kuchen holen, Kerzen drauf, fertig."
      }
    },
    {
      "@type": "Question",
      "name": "Wie reduziere ich den Stress am Tag selbst?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein realistischer Plan. Nicht alles selbst machen wollen. Aufgaben an Partner oder Großeltern delegieren. Einen klaren Zeitplan vor Augen haben, aber flexibel bleiben, wenn etwas länger dauert. Und: eine halbe Stunde früher fertig sein als gedacht — dann bleibt Zeit, durchzuatmen, bevor die Kinder kommen. Hektik überträgt sich."
      }
    }
  ]
}
  </script>''')

if not has_howto:
    schemas.append('''  <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Last-Minute-Kindergeburtstag in 2 Stunden vorbereiten",
  "description": "Minimaler Ablauf, wenn die Zeit knapp ist — priorisiert auf die fünf Dinge, die wirklich zählen.",
  "totalTime": "PT2H",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Supermarkt-Großeinkauf",
      "text": "Erste 30 Minuten: Fertigkuchen, Kerzen, Luftballons, Snacks, Getränke, Pizza oder Würstchen, eine Packung Mitgebsel-Süßigkeiten. Alles in einem Gang erledigen. Nicht überlegen, nicht vergleichen — greifen, bezahlen, raus."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Wohnung kindersicher machen",
      "text": "Minute 30 bis 45: Wertvolles wegräumen, Teppiche sichern, Tisch aus dem Weg schieben. Nicht perfekt aufräumen — nur sicher. Küchenrolle und Putzlappen griffbereit legen, eine Mülltüte in der Küche bereitstellen."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Deko in 15 Minuten",
      "text": "Minute 45 bis 60: Luftballons aufpusten (Pump aus dem Supermarkt oder notfalls per Mund), eine Girlande aufhängen, ein Geburtstags-Schild an die Eingangstür. Mehr braucht es nicht. Ein Kind achtet zehn Sekunden auf Deko — mehr nicht."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Spiele-Material bereitstellen",
      "text": "Minute 60 bis 75: Für Stopptanz eine Playlist am Handy vorbereiten. Für Topfschlagen Kochlöffel, Topf und eine Überraschung rauslegen. Für Eierlauf Löffel und drei Tischtennisbälle bereitstellen. Alles in einer Kiste im Wohnzimmer."
    },
    {
      "@type": "HowToStep",
      "position": 5,
      "name": "Essen vorbereiten",
      "text": "Minute 75 bis 90: Snacks in Schalen füllen, Getränke kalt stellen, Kuchen aus der Verpackung nehmen und Kerzen einstecken. Pizza oder Würstchen erst kurz bevor die Kinder kommen in den Ofen beziehungsweise ins Wasser."
    },
    {
      "@type": "HowToStep",
      "position": 6,
      "name": "Durchatmen und loslegen",
      "text": "Letzte 30 Minuten: Kaffee trinken, Mitgebsel-Tüten füllen, Handy für Fotos laden, einmal durch den Ablauf gehen. Wenn die Kinder kommen, bist du entspannt — und das überträgt sich auf die Party."
    }
  ]
}
  </script>''')

matches = list(re.finditer(r'<script type="application/ld\+json">.*?</script>', content, re.DOTALL))
if matches:
    insert_pos = matches[-1].end()
    addition = "\n" + "\n".join(s.rstrip() for s in schemas)
    content = content[:insert_pos] + addition + content[insert_pos:]
    FILE.write_text(content, encoding="utf-8")
    print(f"✅ {len(schemas)} Schema(s) zu Last-Minute hinzugefügt")
