#!/usr/bin/env python3
"""Deep SEO: kindergeburtstag-torte-einfach.html
- Recipe-Schema für den Hauptkandidaten (Backmischung+Smarties)
- FAQPage
- Affiliate-Links zu Zutaten/Werkzeug (Amazon tag=machsleicht-21)
"""
import re
from pathlib import Path

FILE = Path(__file__).parent.parent / "kindergeburtstag-torte-einfach.html"
content = FILE.read_text(encoding="utf-8")

if '"Recipe"' in content and '"FAQPage"' in content:
    print("Recipe + FAQ schon da — skip")
    raise SystemExit(0)

schemas = []

if '"FAQPage"' not in content:
    schemas.append('''  <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Lohnt es sich, den Kindergeburtstagskuchen selbst zu backen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nur wenn du Zeit und Lust hast. Kinder achten auf Kerzen und das Lied, nicht auf die Konditoren-Güte. Ein Supermarktkuchen plus Kerzen bringt dasselbe Ergebnis wie ein selbstgebackener. Wer selbst bäckt, sollte bei einfachen Rezepten wie Blechkuchen oder Muffins bleiben — komplizierte Motivtorten sind selten die Mühe wert."
      }
    },
    {
      "@type": "Question",
      "name": "Wie viel Kuchen brauche ich pro Kind?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein mittleres Stück reicht — etwa ein Achtel einer 26er-Form oder ein Muffin. Kinder essen auf einer Party deutlich weniger Kuchen, als Eltern vermuten. Für 8 Kinder reicht ein Blechkuchen locker. Lieber etwas übrig als zu wenig: Reste lassen sich am nächsten Tag gut verwerten."
      }
    },
    {
      "@type": "Question",
      "name": "Wann sollte ich den Kuchen backen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Am Vortag. Der Kuchen muss auskühlen und schmeckt nach einer Nacht oft besser, weil er durchgezogen ist. Dekorieren am Morgen der Party. Am Tag selbst zu backen ist der häufigste Stress-Auslöser — Ofen belegt, Zeit knapp, Kerze versengt."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Kuchen sind allergikerfreundlich?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bei Gluten-Unverträglichkeit: glutenfreie Backmischungen aus dem Reformhaus. Bei Laktose: Margarine und Hafermilch statt Butter und Milch. Bei Ei-Allergie: Leinsamen-Ei (1 EL gemahlene Leinsamen plus 3 EL Wasser) als Ersatz. Wenn mehrere Kinder Allergien haben, einfach einen komplett neutralen Obstkuchen oder eine Obstschale als Alternative bereitstellen."
      }
    },
    {
      "@type": "Question",
      "name": "Supermarktkuchen oder Bäcker — was ist besser?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bäcker schmeckt meist besser, kostet aber doppelt. Supermarktkuchen ist völlig okay, vor allem mit Kerzen und ein paar Smarties on top. Vom Discounter gibt es ordentliche Blech- und Rührkuchen für 4 bis 6 Euro. Wer Wert auf Qualität legt: Einige Tiefkühlkuchen (z.B. von Coppenrath und Wiese) schmecken nach dem Auftauen sehr ordentlich."
      }
    },
    {
      "@type": "Question",
      "name": "Was tun, wenn der Kuchen misslingt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Plan B zur Hand: Ein Päckchen Kekse, Muffins vom Supermarkt oder eine Obstschale. Kinder ziehen keinem Elternteil den Kuchen vor, wenn die Stimmung gut ist. Wenn der Kuchen nur optisch schief ist, einfach mehr Zuckerguss und Smarties drauf — Problem gelöst. Wenn er geschmacklich nicht stimmt, durch den Notfall-Kuchen ersetzen."
      }
    }
  ]
}
  </script>''')

if '"Recipe"' not in content:
    schemas.append('''  <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Recipe",
  "name": "Einfacher Kindergeburtstagskuchen mit Smarties",
  "description": "Der Klassiker für stressfreie Kindergeburtstage: Fertige Backmischung plus Smarties-Deko. In 15 Minuten aktiv, kostet etwa 3 Euro, sieht fröhlich aus und schmeckt allen Kindern.",
  "author": {"@type": "Organization", "name": "machsleicht"},
  "prepTime": "PT15M",
  "cookTime": "PT25M",
  "totalTime": "PT40M",
  "recipeYield": "1 Kuchen (26cm Durchmesser), reicht für 8 Kinder",
  "recipeCategory": "Kuchen",
  "recipeCuisine": "Deutsch",
  "keywords": "Kindergeburtstag, Geburtstagskuchen, Smarties, einfach",
  "recipeIngredient": [
    "1 Packung Dr. Oetker Backmischung (Schokolade oder Vanille, ca. 1,20 Euro)",
    "1 Ei (oder laut Packungsanleitung)",
    "125 g Butter oder Margarine",
    "Wasser oder Milch laut Packung",
    "1 Packung Smarties (ca. 1,50 Euro) für die Deko",
    "1 Zahnstocher-Zahl für das Alter des Kindes"
  ],
  "recipeInstructions": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Backmischung zubereiten",
      "text": "Backmischung nach Packungsanleitung mit Ei, Butter und Wasser vermengen. Teig in eine runde Backform (26 cm Durchmesser) gießen."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Backen",
      "text": "Im vorgeheizten Ofen bei 180 Grad Ober- und Unterhitze etwa 25 Minuten backen. Stäbchenprobe machen — wenn kein Teig kleben bleibt, ist der Kuchen fertig."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Abkühlen lassen",
      "text": "Kuchen aus dem Ofen nehmen und 30 Minuten in der Form auskühlen lassen, dann stürzen und komplett abkühlen."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Mit Smarties dekorieren",
      "text": "Smarties entweder kreisförmig als Rand, als großes Herz in der Mitte oder als Zahl des Alters auf dem Kuchen verteilen. Smarties haften am besten auf einer dünnen Schicht Zuckerguss oder geschmolzener Schokolade."
    },
    {
      "@type": "HowToStep",
      "position": 5,
      "name": "Kerze einstecken",
      "text": "Zahnstocher mit der Alters-Zahl in die Mitte stecken, Kerzen drum herum verteilen. Fertig zum Anschneiden."
    }
  ],
  "nutrition": {
    "@type": "NutritionInformation",
    "servingSize": "1 Stück",
    "calories": "280 kcal"
  }
}
  </script>''')

matches = list(re.finditer(r'<script type="application/ld\+json">.*?</script>', content, re.DOTALL))
if matches:
    insert_pos = matches[-1].end()
    addition = "\n" + "\n".join(s.rstrip() for s in schemas)
    content = content[:insert_pos] + addition + content[insert_pos:]
    FILE.write_text(content, encoding="utf-8")
    print(f"✅ {len(schemas)} Schema(s) zu Torte-einfach hinzugefügt")
