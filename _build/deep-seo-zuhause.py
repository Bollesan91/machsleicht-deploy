#!/usr/bin/env python3
"""Deep SEO: kindergeburtstag-zuhause.html — FAQPage (die Seite ist eher Übersicht, HowTo gibt es schon in drinnen/draussen, daher hier nur FAQ)."""
import re
from pathlib import Path

FILE = Path(__file__).parent.parent / "kindergeburtstag-zuhause.html"
content = FILE.read_text(encoding="utf-8")

if '"FAQPage"' in content:
    print("FAQPage schon vorhanden — skip")
    raise SystemExit(0)

faq = '''  <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Warum lohnt es sich, einen Kindergeburtstag zuhause zu feiern?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Zuhause ist die mit Abstand günstigste Variante — 80 Prozent weniger Kosten als eine externe Location. Das Kind ist in vertrauter Umgebung, die Eltern haben volle Kontrolle über Ablauf und Essen, und es gibt keine Zeitlimits oder Regeln, die eine Location vorgibt. Nachteile: mehr Aufwand vor und nach der Party, und die eigene Wohnung muss den Toben-Test überstehen."
      }
    },
    {
      "@type": "Question",
      "name": "Wie viel Platz brauche ich für einen Kindergeburtstag zuhause?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein großes Wohnzimmer (ab 20 Quadratmeter) plus Flur oder zweiter Raum reicht für 6 bis 8 Kinder. Wohnung unter 60 Quadratmeter: maximal 6 Kinder. Eigenes Haus mit Garten: kein Platzproblem. Wichtiger als die reine Quadratmeter-Zahl ist die Aufteilung — zwei kleinere Räume schlagen einen großen, weil man die Kinder thematisch aufteilen kann."
      }
    },
    {
      "@type": "Question",
      "name": "Sollte ich die Party drinnen oder im Garten feiern?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wenn Garten vorhanden und Wetter okay: draußen. Draußen heißt mehr Platz, mehr Toben, weniger Putzen danach. Drinnen hat den Vorteil, dass Essen und Kuchen einfacher organisiert sind und das Wetter egal ist. Optimal ist ein Mix: Spiele draußen, Kuchen drinnen. Bei Unsicherheit immer einen Indoor-Plan B haben."
      }
    },
    {
      "@type": "Question",
      "name": "Was brauche ich mindestens, um zuhause einen Kindergeburtstag zu feiern?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutes Minimum: Kuchen mit Kerzen, zwei bis drei Spiele, Getränke, Mitgebsel für jedes Kind. Mehr ist nicht zwingend nötig. Deko, Motto, aufwändiges Essen sind schön, aber optional. Die Kinder merken es vor allem, wenn die Eltern präsent und entspannt sind — das ersetzt jede Pinterest-Deko."
      }
    },
    {
      "@type": "Question",
      "name": "Wie schütze ich meine Wohnung vor Kinderhorden?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vor der Party: wertvolle Sachen in den Schrank, empfindliche Möbel abdecken oder in ein anderes Zimmer stellen, Teppiche sichern oder entfernen. Während der Party: Essen nur am Tisch, Getränke mit Deckel (oder Strohhalm) servieren, einen klaren Schuh-Ablageplatz definieren. Mal-Aktionen mit abwaschbaren Stiften, nicht mit dauerhaften Markern."
      }
    },
    {
      "@type": "Question",
      "name": "Kann ich eine Motto-Party auch zuhause umsetzen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolut. Motto-Partys lassen sich zuhause besser umsetzen als in externen Locations, weil du die Deko, Spiele und das Essen komplett selbst bestimmst. Piraten, Dino, Einhorn, Detektiv — alles machbar mit einfachen Mitteln. Entscheidend ist nicht die Deko-Pracht, sondern dass zwei bis drei zentrale Motto-Elemente wiederkehren: Motto-Kuchen, Motto-Spiel, Motto-Mitgebsel. Das reicht."
      }
    }
  ]
}
  </script>'''

matches = list(re.finditer(r'<script type="application/ld\+json">.*?</script>', content, re.DOTALL))
if matches:
    insert_pos = matches[-1].end()
    content = content[:insert_pos] + "\n" + faq.rstrip() + content[insert_pos:]
    FILE.write_text(content, encoding="utf-8")
    print("✅ FAQPage zu Zuhause hinzugefügt")
