#!/usr/bin/env python3
"""Deep SEO: kindergeburtstag-kosten.html — FAQPage nur (kein HowTo, ist Budget-Ratgeber)."""
import re
from pathlib import Path

FILE = Path(__file__).parent.parent / "kindergeburtstag-kosten.html"
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
      "name": "Was kostet ein Kindergeburtstag im Durchschnitt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein klassischer Kindergeburtstag zu Hause kostet zwischen 15 Euro (Minimal) und 100 Euro (Premium). Die größten Kostenblöcke sind Mitgebsel (30–40% des Budgets), Essen und Deko. Eine Feier mit 6 Kindern ist im Minimal-Bereich für unter 20 Euro machbar — eine Premium-Feier mit 10 Kindern liegt bei 80–100 Euro."
      }
    },
    {
      "@type": "Question",
      "name": "Warum sind Kindergeburtstage oft teurer als gedacht?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Es sind die versteckten Kosten: Mitgebsel-Tüten und Aufkleber, Einweggeschirr, Batterien für Deko-Lichter, zusätzliche Getränke weil mehr Eltern mitkommen, und die Kleinigkeit beim Drogeriemarkt zur letzten Minute. Einzelbeträge sind klein, in Summe schnell 15–20 Euro extra. Wer einen Puffer von 20 Prozent einplant, erlebt weniger böse Überraschungen."
      }
    },
    {
      "@type": "Question",
      "name": "Wo kann ich beim Kindergeburtstag am meisten sparen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Am meisten sparst du bei Deko und Mitgebseln. Deko: Luftballons und Girlanden aus dem Discounter sind genauso gut wie Markenware — niemand erkennt den Unterschied. Mitgebsel: lieber eine etwas größere Sache (Bastelset, Buch) statt fünf kleine Plastikteile. Das kommt bei den Kindern besser an und ist günstiger. Am wenigsten lohnt sich Sparen beim Kuchen und bei der Zeit."
      }
    },
    {
      "@type": "Question",
      "name": "Wie viel Budget pro Kind ist angemessen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "2,50 bis 10 Euro pro Kind, je nach Stil. Im Minimal-Bereich: 2,50 Euro pro Kind. Standard: 5–7 Euro. Premium: 10 Euro. Das deckt jeweils Anteil an Deko, Essen, Snacks, Kuchen und Mitgebsel. Entscheidend ist nicht die Summe, sondern was dein Kind erlebt — wichtigere Hebel als Geld sind Zeit und Organisation."
      }
    },
    {
      "@type": "Question",
      "name": "Lohnt sich eine externe Location oder ist zu Hause billiger?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Externe Locations (Kletterhalle, Schwimmbad, Zoo, Indoor-Spielplatz) kosten meist 10–20 Euro pro Kind, oft plus Essenspaket. Für eine Gruppe von 8 Kindern sind das schnell 150–200 Euro — drei- bis zehnmal so teuer wie zu Hause. Vorteil: Du hast keinen Aufwand. Finanziell gewinnt fast immer die Feier zu Hause, wenn man die eigene Zeit nicht einrechnet."
      }
    },
    {
      "@type": "Question",
      "name": "Ab welchem Alter werden Kindergeburtstage teurer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ab etwa 8–9 Jahren. Die Kinder wollen dann konkretere Mottos, hochwertigere Mitgebsel, anspruchsvollere Spiele (Escape Room, Laser Tag) und manchmal eine externe Location. Für die Kleinen (3–6 Jahre) reichen Luftballons, Kuchen und zwei einfache Spiele — ab 8 Jahren steigt der Erwartungsdruck, und damit das Budget. Plane für die Altersgruppe 9–12 realistisch 50 Prozent mehr ein."
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
    print("✅ FAQPage zu Kosten hinzugefügt")
