#!/usr/bin/env python3
"""P1-11 Seite 3: kindergeburtstag-spiele-draussen.html auf 85%."""
import re
from pathlib import Path

FILE = Path(__file__).parent.parent / "kindergeburtstag-spiele-draussen.html"
content = FILE.read_text(encoding="utf-8")

if '"FAQPage"' in content and '"ItemList"' in content:
    print("Schon komplett — skip")
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
      "name": "Welche Outdoor-Spiele funktionieren ohne viel Platz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eierlauf braucht nur drei Meter Strecke, Seifenblasen-Wettbewerb geht auf jeder Terrasse, Zapfen-Zielwerfen funktioniert im kleinsten Garten. Für beengten Outdoor-Raum sind stationäre Spiele besser als Lauf-Spiele. Ein Tipp: Mal-Station mit Straßenkreide auf Terrasse oder Hof belegt wenig Fläche und beschäftigt länger als jedes Renn-Spiel."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Spiele eignen sich für gemischte Altersgruppen draußen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Schnitzeljagd mit altersgemischten Teams funktioniert besonders gut — ältere helfen jüngeren. Natur-Bingo ist universell, weil es nicht auf Geschwindigkeit basiert. Mal-Stationen, Seifenblasen und Capture-the-Flag mit angepassten Teams gehen von fünf bis zwölf Jahren. Vermeiden sollte man: reine Staffel-Spiele (Ältere dominieren), Eierlauf-Wettbewerbe (Frustration bei Jüngeren)."
      }
    },
    {
      "@type": "Question",
      "name": "Was mache ich mit Wasserspielen ohne Pool?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wasserbomben reichen komplett. Wasserstaffel mit zwei Eimern und einem Schwamm — Kinder transportieren Wasser von A nach B, Schwamm-Wettbewerb. Sprühflaschen mit Lebensmittelfarbe für Spritz-Kunst auf weißen T-Shirts (Vorsicht, hinterher Wechselsachen nötig). Rutsche im Garten mit Gartenschlauch-Bewässerung. Grundsatz: Wechselkleidung in die Einladung schreiben."
      }
    },
    {
      "@type": "Question",
      "name": "Wie viele Outdoor-Spiele brauche ich für eine 2,5-Stunden-Party?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Drei bis vier reichen. Outdoor-Spiele ziehen länger als Indoor-Spiele, weil die Kinder sich austoben können und nicht so schnell Lagerkoller bekommen. Rechne pro Spiel 20 bis 30 Minuten inklusive Erklären und Pause. Plus Kuchen plus Ankommen plus Abschied sind zweieinhalb Stunden realistisch gefüllt. Zwei Reserve-Spiele im Hinterkopf haben, falls etwas floppt."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Spiele funktionieren bei Hitze am besten?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Alles mit Wasser: Wasserbomben-Schlacht, Wasser-Staffel, Eimer-Sprühflaschen. Bei extremen Temperaturen über 30 Grad: Aktivitäten in den Schatten verlegen, Wasser anbieten alle 20 Minuten, Sonnencreme-Pause einplanen. Keine intensiven Laufspiele in der Mittagssonne, das endet in überhitzten Kindern. Schatten-Tipps: Pavillon, Bäume, Terrassendach, Hängematten."
      }
    },
    {
      "@type": "Question",
      "name": "Was tun, wenn ein Kind im Outdoor-Spiel nicht mitmachen will?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nicht zwingen. Anbieten, aber Raum geben. Manche Kinder brauchen eine Beobachter-Rolle: Schiedsrichter, Punktezähler, Foto-Dokumentator. Gibt ihnen Funktion ohne direkte Teilnahme. Nach ein paar Minuten wollen die meisten dazu stoßen. Ein ruhiges Backup-Angebot (Buch, Malpapier) parat haben. Party-Spaß messen sich nicht an hundertprozentiger Teilnahme."
      }
    }
  ]
}
  </script>''')

if '"ItemList"' not in content:
    # 15 games
    games = [
        ("Eierlauf", "aktion"),
        ("Sackhüpfen", "aktion"),
        ("Fangen mit Varianten", "aktion"),
        ("Staffel-Olympiade", "team"),
        ("Wasser-Staffel", "wasser"),
        ("Schatzsuche im Garten", "abenteuer"),
        ("Schnitzeljagd", "abenteuer"),
        ("Capture the Flag", "strategie"),
        ("Foto-Rallye", "kreativ"),
        ("Parcours bauen", "kreativ"),
        ("Natur-Bingo", "ruhig"),
        ("Zapfen-Zielwerfen", "geschick"),
        ("Mal-Station im Freien", "kreativ"),
        ("Seifenblasen-Wettbewerb", "ruhig"),
        ("Schätzen & Raten", "denken"),
    ]
    items = []
    for i, (name, cat) in enumerate(games, start=1):
        items.append(f'''    {{
      "@type": "ListItem",
      "position": {i},
      "item": {{
        "@type": "Thing",
        "name": "{name}",
        "description": "Outdoor-Spiel der Kategorie {cat}"
      }}
    }}''')
    schemas.append('''  <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "15 Outdoor-Spiele für den Kindergeburtstag",
  "description": "Sortiert nach Kategorie: Bewegungsspiele, Team-Spiele, Wasser-Spiele, Abenteuer, Kreativ-Stationen und ruhige Beobachter-Spiele.",
  "numberOfItems": 15,
  "itemListElement": [
''' + ",\n".join(items) + '''
  ]
}
  </script>''')

if schemas:
    matches = list(re.finditer(r'<script type="application/ld\+json">.*?</script>', content, re.DOTALL))
    if matches:
        insert_pos = matches[-1].end()
        addition = "\n" + "\n".join(s.rstrip() for s in schemas)
        content = content[:insert_pos] + addition + content[insert_pos:]
        FILE.write_text(content, encoding="utf-8")
        print(f"✅ spiele-draussen: {len(schemas)} Schema(s)")
