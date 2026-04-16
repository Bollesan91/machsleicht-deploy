#!/usr/bin/env python3
"""P1-11 Seite 2: kindergeburtstag-7-jahre.html auf 85%."""
import re
from pathlib import Path

FILE = Path(__file__).parent.parent / "kindergeburtstag-7-jahre.html"
content = FILE.read_text(encoding="utf-8")

if '"FAQPage"' in content and '"HowTo"' in content:
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
      "name": "Wie lange sollte ein Kindergeburtstag mit 7 Jahren dauern?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Drei Stunden sind ideal. Siebenjährige halten länger durch als Kindergarten-Kinder, aber unter zwei Stunden fehlt der Flow, über vier Stunden kippen sie in Überforderung. Dreistündige Partys geben Raum für Ankommen, zwei bis drei Aktivitätsblöcke, Kuchen und Verabschiedung, ohne dass die Kinder müde werden."
      }
    },
    {
      "@type": "Question",
      "name": "Wie viele Kinder sollte man zu einem 7-Jährigen-Geburtstag einladen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Faustregel: Alter plus zwei — also sechs bis neun Kinder. Mehr als zehn wird organisatorisch aufwendig, weil Siebenjährige in Teams denken und bei zu großen Gruppen Cliquen bilden. Weniger als fünf Kinder ist möglich, aber einige Spiele (Staffel, Teams) funktionieren dann nicht. Sechs bis acht ist der Sweet Spot."
      }
    },
    {
      "@type": "Question",
      "name": "Was unterscheidet einen 7-Jährigen-Geburtstag vom 6-Jährigen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Siebenjährige können Regeln besser einhalten, verstehen Wettbewerbsspiele und wollen Challenges. Sie lesen schon, also funktionieren Schnitzeljagden mit geschriebenen Hinweisen. Sie ertragen Verlieren mit mehr Fassung als Sechsjährige, brauchen aber trotzdem Trostpreise oder Team-Strukturen. Mottos können komplexer sein: Detektiv, Wissenschaft, Sport-Challenge funktionieren alle."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Spiele funktionieren mit 7-Jährigen besonders gut?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Schatzsuche mit richtigen Rätseln (Zahlenschloss, Geheimschrift), Schnitzeljagd im Garten oder Park, Team-Challenges mit Zeitlimit, Escape-Room-Light für Zuhause, Detektiv-Spiele mit Hinweisen. Nicht geeignet: zu einfache Kreisspiele (langweilen schnell), reine Memory-Spiele ohne Bewegung. Siebenjährige wollen Herausforderung plus Bewegung."
      }
    },
    {
      "@type": "Question",
      "name": "Können die Eltern bei einem 7-Jährigen-Geburtstag schon gehen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bei den meisten Kindern ja. Mit sieben sind Absetzen und Abholen die Norm. Ausnahmen: Kinder mit Trennungsangst oder medizinischen Themen (Allergien, Diabetes) — da bleiben Eltern oft. Beim Einladen direkt kommunizieren: wer bleibt, wer setzt ab. Für Absetz-Partys den Abholzeitpunkt klar definieren, nicht \\"so gegen 17 Uhr\\" sondern \\"17 Uhr\\"."
      }
    },
    {
      "@type": "Question",
      "name": "Was kostet ein Kindergeburtstag für 7-Jährige?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Zuhause: 40 bis 70 Euro bei sieben bis acht Kindern. Externe Location (Indoor-Spielplatz, Schwimmbad): 150 bis 300 Euro. Kino-Geburtstag: 100 bis 180 Euro. Die größten Kostenfaktoren sind Mitgebsel (2 bis 5 Euro pro Kind) und Motto-Deko (10 bis 30 Euro). Wer clever plant, kommt mit Zuhause-Party und Supermarkt-Deko auf unter 50 Euro."
      }
    }
  ]
}
  </script>''')

if '"HowTo"' not in content:
    schemas.append('''  <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "7-Jährigen-Geburtstag in 3 Stunden planen (6 Phasen)",
  "description": "Ablauf für eine dreistündige Party mit sieben- bis achtjährigen Kindern — mit Wechsel zwischen Aktivität, Essen und Ruhe-Phase.",
  "totalTime": "PT3H",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Ankommen und Challenge-Einstieg (30 Min)",
      "text": "Erste 30 Minuten: Kinder kommen an, Schuhe aus, Geschenke ablegen. Direkt einen einfachen Challenge-Einstieg starten — Rätsel-Station, Detektiv-Auftrag oder thematisches Quiz. Nicht alle auf einmal da, deshalb Einzelaufgaben die flexibel andocken."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Hauptaktivität Schatzsuche oder Schnitzeljagd (45 Min)",
      "text": "Minute 30 bis 75: Das große Highlight. Schatzsuche mit fünf bis sechs Stationen, inklusive Rätseln und Zahlenschloss-Station. Siebenjährige wollen echte Herausforderung, nicht nur Bildrätsel. Finale mit Schatzkiste, die geknackt werden muss."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Kuchen und Geschenke (45 Min)",
      "text": "Minute 75 bis 120: Kuchen-Block mit Kerzen und Geburtstagslied. Geschenke öffnen — Siebenjährige wollen das öffentlich, das ist Teil der Party. Genug Zeit einplanen, nicht hetzen. Danach gibt es oft einen natürlichen Moment, wo Eltern eintrudeln."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Ruhige Aktivität (20 Min)",
      "text": "Minute 120 bis 140: Nach dem Zucker-Hoch eine ruhigere Phase. Bastel-Station mit motto-passendem Projekt (Detektiv-Badges, Schatz-Truhen-Bemalen, Rätsel-Buch gestalten). Bringt Pegel runter, Kinder nehmen etwas mit nach Hause."
    },
    {
      "@type": "HowToStep",
      "position": 5,
      "name": "Team-Challenge-Abschluss (25 Min)",
      "text": "Minute 140 bis 165: Letzter Energie-Peak. Team-Challenges mit Zeitlimit — Staffel, Quiz-Duell, Experiment-Show. Siebenjährige lieben Wettbewerb. Punkte nicht zu ernst nehmen: alle bekommen am Ende etwas."
    },
    {
      "@type": "HowToStep",
      "position": 6,
      "name": "Mitgebsel und Verabschiedung (15 Min)",
      "text": "Letzte 15 Minuten: Mitgebsel verteilen, Jacken ranholen, jedes Kind einzeln verabschieden. Eltern sind pünktlich da, einige kommen fünf Minuten früher. Klar kommunizieren: Party endet 17 Uhr, nicht 17 bis 17:30 Uhr."
    }
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
        print(f"✅ 7-jahre: {len(schemas)} Schema(s) eingefügt")
