#!/usr/bin/env python3
"""Deep SEO: kindergeburtstag-essen.html — FAQPage + HowTo."""
import re
from pathlib import Path

FILE = Path(__file__).parent.parent / "kindergeburtstag-essen.html"
content = FILE.read_text(encoding="utf-8")

if '"FAQPage"' in content:
    print("FAQPage schon vorhanden — skip FAQPage")
    has_faq = True
else:
    has_faq = False

if '"HowTo"' in content:
    print("HowTo schon vorhanden — skip HowTo")
    has_howto = True
else:
    has_howto = False

if has_faq and has_howto:
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
      "name": "Wie viel Essen brauche ich für einen Kindergeburtstag?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Weniger als du denkst. Die meisten Kinder essen pro Kopf eine Scheibe Pizza oder zwei Würstchen, dazu eine Handvoll Snacks und ein Stück Kuchen. Als Faustregel: Pro Kind 200g warmes Essen, 150g Snacks und ein Kuchenstück. Eltern unterschätzen, wie aufgeregt die Kinder sind — die essen auf einer Party deutlich weniger als zu Hause."
      }
    },
    {
      "@type": "Question",
      "name": "Was essen Kinder auf Geburtstagen am liebsten?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolute Klassiker sind Pizza, Würstchen mit Brötchen, Nuggets und Pommes. Unter den Snacks gewinnen Chips, Salzstangen, Gummibärchen und Obst (Weintrauben, Wassermelonenstücke, Erdbeeren). Neue oder experimentelle Gerichte bleiben fast immer liegen — auf einem Kindergeburtstag bekommst du keine Feinschmecker-Punkte."
      }
    },
    {
      "@type": "Question",
      "name": "Brauche ich warmes Essen oder reichen Snacks?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Hängt von der Tageszeit ab. Nachmittagsparty von 14 bis 17 Uhr: Snacks und Kuchen reichen. Party über die Essenszeit hinaus (16 bis 19 Uhr) oder länger als drei Stunden: warmes Essen einplanen. Pizza ist der klare Gewinner — günstig, bekannt, schmeckt fast allen und ist in 15 Minuten fertig."
      }
    },
    {
      "@type": "Question",
      "name": "Wie gehe ich mit Allergien bei Kindergästen um?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vor der Party bei den Eltern nachfragen — das ist Standard und niemand findet das übergriffig. Die häufigsten Baustellen: Nuss, Gluten, Laktose, Ei. Plane mindestens eine allergikerfreundliche Alternative ein (z.B. glutenfreie Kekse extra). Wenn mehrere Kinder betroffen sind, wähle von vornherein nussfreie Produkte für alle."
      }
    },
    {
      "@type": "Question",
      "name": "Lohnt sich ein selbstgebackener Kuchen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Kommt drauf an, wie viel Zeit du hast. Ein einfacher Blechkuchen mit Smarties ist in 45 Minuten gemacht und kommt bei Kindern besser an als eine aufwendige Motiv-Torte, die sie oft gar nicht erkennen. Wenn wenig Zeit bleibt, ist ein Supermarktkuchen völlig okay — Kinder achten mehr auf die Kerzen und das Lied als auf die Tortengüte."
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
  "name": "Kindergeburtstag-Essen planen in 5 Schritten",
  "description": "Vom Allergien-Check bis zur Einkaufsliste — so planst du das Essen für einen Kindergeburtstag stressfrei.",
  "totalTime": "PT30M",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Allergien abfragen",
      "text": "Mindestens eine Woche vorher bei allen Eltern nachfragen, ob es Allergien, Unverträglichkeiten oder religiöse Einschränkungen gibt. Eine kurze WhatsApp-Nachricht reicht. Notiere alle Antworten an einer Stelle."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Hauptgericht wählen",
      "text": "Entscheide dich für ein Hauptgericht, das möglichst alle essen. Pizza, Würstchen mit Brötchen oder Nudeln mit Tomatensauce sind sichere Bänke. Exotisches und Experimente vermeiden."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Snacks und Süßes festlegen",
      "text": "Zwei bis drei Snack-Kategorien reichen: etwas Salziges (Chips, Salzstangen), etwas Süßes (Gummibärchen, Kekse), etwas Frisches (Obstspieße, Weintrauben). Pro Kind eine Handvoll jeder Kategorie."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Getränke kalkulieren",
      "text": "Pro Kind 0,5 Liter alkoholfreies Getränk einplanen. Apfelschorle und Wasser sind immer gern gesehen, Cola und Limo nur in Maßen wegen Zucker und Koffein. Strohhalme bereitlegen — reduziert Kleckereien."
    },
    {
      "@type": "HowToStep",
      "position": 5,
      "name": "Einen Tag vorher einkaufen",
      "text": "Nie am Tag der Party selbst einkaufen. Mache den Großeinkauf am Vortag und teile die Zutaten nach Zeitpunkt auf: Snacks in Schalen bereitstellen, Kuchen backen oder auftauen lassen, Hauptgericht vorbereiten."
    }
  ]
}
  </script>''')

# Insert schemas after last existing JSON-LD
matches = list(re.finditer(
    r'<script type="application/ld\+json">.*?</script>',
    content, re.DOTALL
))
if matches:
    insert_pos = matches[-1].end()
    addition = "\n" + "\n".join(s.rstrip() for s in schemas)
    content = content[:insert_pos] + addition + content[insert_pos:]
    FILE.write_text(content, encoding="utf-8")
    print(f"✅ {len(schemas)} Schema(s) zu Essen hinzugefügt")
else:
    print("❌ kein JSON-LD gefunden")
