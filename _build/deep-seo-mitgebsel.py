#!/usr/bin/env python3
"""Deep SEO: kindergeburtstag-mitgebsel.html — FAQPage."""
import re
from pathlib import Path

FILE = Path(__file__).parent.parent / "kindergeburtstag-mitgebsel.html"
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
      "name": "Sind Mitgebsel beim Kindergeburtstag überhaupt nötig?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja — Kinder erwarten sie fast automatisch. Mitgebsel sind eine kleine Geste zum Dank fürs Kommen und zum Ausgleich dafür, dass das Geburtstagskind Geschenke bekommen hat. Ohne Mitgebsel gibt es oft enttäuschte Gesichter beim Abholen. Was nicht nötig ist: aufwendige Giveaway-Tüten mit zehn Einzelteilen. Ein sinnvolles Teil reicht."
      }
    },
    {
      "@type": "Question",
      "name": "Wie viel sollten Mitgebsel pro Kind kosten?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1 bis 5 Euro pro Kind sind üblich und völlig ausreichend. Unter 1 Euro wirkt meist billig (Plastikteile, die kaputt gehen), über 5 Euro setzt einen Standard, der andere Eltern unter Druck setzt. Wichtiger als der Preis: dass das Teil tatsächlich benutzt wird und nicht nach drei Tagen im Müll landet."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Mitgebsel kommen bei Kindern wirklich an?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mitgebsel, die man benutzen oder verbrauchen kann. Bewährt: kleine Bastelsets, Seifenblasen, Stifte oder Buntstiftsets, Bücher aus dem 1-Euro-Sortiment, Süßigkeiten-Tüten mit ausgewählten (nicht zehn) Teilen. Weniger beliebt: Plastikfiguren aus dem Überraschungsei-Segment, laute Spielzeuge (Eltern hassen die), Traubenzucker-Tütchen."
      }
    },
    {
      "@type": "Question",
      "name": "Ein größeres Mitgebsel oder viele kleine?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein größeres. Fünf kleine Plastikteile in einer Tüte wirken auf den ersten Blick viel, landen aber oft direkt im Müll. Ein Bastelset, ein Buch oder ein schönes Stiftset hält länger, wird benutzt, und die Eltern sind dankbar, dass nicht fünf neue Einzelteile ins Haus kommen. Die Kinder merken den Unterschied — sie freuen sich mehr über eine gute Sache."
      }
    },
    {
      "@type": "Question",
      "name": "Kann man auch selbstgemachte Mitgebsel verschenken?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, und das kommt oft besser an als gekauftes. Klassiker: Kekse in Tütchen (wenn du eh backst), selbstgemachte Seifen, Badezusatz, Slime im Glas. Wichtig: Portionen klein halten (Kinder essen zehn Kekse nicht), und bei allem Essbaren vorher Allergien klären. Bastel-Mitgebsel sind auch gut, wenn die Kinder sie während der Party selbst herstellen."
      }
    },
    {
      "@type": "Question",
      "name": "Was tun, wenn ein Kind mit dem Mitgebsel unzufrieden ist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ruhig bleiben, nicht auf die Kommentare eingehen. Manche Kinder äußern sich direkt, das ist kein Beinbruch. Bedanke dich kurz, dass das Kind da war, und überlass die Reaktion den abholenden Eltern. Wichtiger ist, dass das Kind auf der Party Spaß hatte — das Mitgebsel ist Nachspeise, nicht Hauptgang."
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
    print("✅ FAQPage zu Mitgebsel hinzugefügt")
