#!/usr/bin/env python3
"""
Deep SEO: kindergeburtstag-drinnen.html
- FAQPage mit 6 echten Fragen (die Seite hat schon Q&A-Content — wir nutzen echten Ton)
- HowTo für den Indoor-Zeitplan 2 Stunden (5 Phasen)
Idempotent.
"""
import re
from pathlib import Path

FILE = Path(__file__).parent.parent / "kindergeburtstag-drinnen.html"
content = FILE.read_text(encoding="utf-8")

has_faq = '"FAQPage"' in content
has_howto = '"HowTo"' in content
if has_faq and has_howto:
    print("FAQPage + HowTo schon vorhanden — nichts zu tun")
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
      "name": "Wie viele Kinder passen für einen Kindergeburtstag in eine Wohnung?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Als Faustregel: maximal 8 Kinder bei unter 50 Quadratmeter Wohnfläche, 10 Kinder bei 50 bis 80 Quadratmetern. Bei mehr Platz können es entsprechend mehr sein. Der größte Fehler ist, 12 Kinder in ein 30-Quadratmeter-Wohnzimmer zu packen — das endet in Chaos. Lieber ein Kind weniger einladen und Spaß haben als zu viele und Stress."
      }
    },
    {
      "@type": "Question",
      "name": "Wie laut ist ein Kindergeburtstag drinnen wirklich?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mit einem durchdachten Ablauf ist drinnen nicht lauter als draußen — nur konzentrierter. Entscheidend ist der Wechsel zwischen lauten und ruhigen Spielphasen: Staffelspiel, dann Memory, dann Schatzsuche. Wer nur laute Spiele hintereinander plant, bekommt einen Pegel wie auf einem Volksfest. Ein Tipp: Nachbarn ein bis zwei Tage vorher kurz informieren — 95 Prozent der Probleme sind damit gelöst."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Spiele funktionieren drinnen am besten?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bewährt sind: Stopptanz (klassisch, braucht nur Musik), Memory-Turnier, Schatzsuche durch die Wohnung, Schokoladen-Essen mit Messer und Gabel, Eierlauf mit Löffel, und ein Zoom-Parcours im Flur. Nicht geeignet: Ballspiele (Scherben, zerbrochene Deko), Toben mit Wasserbomben, Wettrennen in der Wohnung. Alles was Geschwindigkeit plus harte Oberflächen kombiniert, fällt weg."
      }
    },
    {
      "@type": "Question",
      "name": "Wie lange sollte ein Indoor-Kindergeburtstag maximal dauern?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Zwei bis zweieinhalb Stunden, nicht länger. Nach dieser Zeit bekommen die meisten Kinder Lagerkoller: sie werden überdreht, fangen an zu streiten, werden müde und gleichzeitig hibbelig. Draußen hält die Motivation länger, drinnen ist der Pegel anders. Wer eine dreistündige Party plant, sollte entweder rausgehen oder eine klare Ruhephase (Vorlesen, Film) einbauen."
      }
    },
    {
      "@type": "Question",
      "name": "Was muss ich vor einer Indoor-Party vorbereiten?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "15 Minuten vor Ankunft: Teppiche sichern oder wegräumen, wertvolle Sachen in den Schrank, Tisch aus dem Weg schieben, Fernbedienungen und Elektronik aus Reichweite. Nicht: alles perfekt aufräumen. Nur: alles sicher machen. Dazu einen klaren Mitgebsel-Ablageplatz, damit am Ende nichts durcheinander geht, und Küchenrolle griffbereit."
      }
    },
    {
      "@type": "Question",
      "name": "Was tun, wenn es den Nachbarn zu laut wird?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Am besten: vorher vorbeugen. Ein kurzer Zettel im Treppenhaus oder eine schnelle Nachricht ein bis zwei Tage vorher. Falls trotzdem jemand klingelt: freundlich bleiben, kurz entschuldigen, und eine ruhige Phase einschieben. Laute Spiele direkt nach dem Klingeln zu starten ist keine gute Idee. Die meisten Nachbarn sind entspannt, wenn sie wissen, dass es Zeit hat — und wenn das Ende klar kommuniziert ist."
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
  "name": "Indoor-Kindergeburtstag planen in 6 Phasen (2 Stunden, 5–8 Kinder)",
  "description": "Sechs-Phasen-Ablauf für eine zweistündige Party in der Wohnung — mit Wechsel zwischen lauten und ruhigen Aktivitäten, damit der Lärmpegel beherrschbar bleibt.",
  "totalTime": "PT2H",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Ankommen und Quiz-Einstieg",
      "text": "Erste 15 Minuten: Kinder kommen an, ziehen Schuhe aus, legen Geschenke ab. Sofort einen ruhigen Einstieg starten — ein Quiz, eine Rätsel-Aufgabe oder freies Malen. Kein lautes Spiel gleich am Anfang, weil noch nicht alle da sind und die Kinder erst ankommen müssen."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Lautes Spiel im Flur",
      "text": "Minute 15 bis 35: Jetzt darf es laut werden. Staffel, Hindernis-Parcours oder Bewegungsspiel im Flur. Diese Phase ist der Lärm-Peak der Party — plane sie bewusst in die Mitte, nicht ans Ende. Nachbarn haben schon Bescheid bekommen."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Ruhige Schatzsuche oder Memory",
      "text": "Minute 35 bis 60: Runterfahren mit einem konzentrationslastigen Spiel. Schatzsuche durch die Wohnung, Memory-Turnier oder Bastel-Station. Das bringt den Pegel wieder nach unten, bevor der Kuchen kommt."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Kuchen und Kerzen",
      "text": "Minute 60 bis 80: Der klassische Kuchen-Block. 20 Minuten Zeit, nicht weniger. Geschenke auspacken kann hier stattfinden, falls das noch aussteht. Wichtig: vorher alle Hände waschen lassen, sonst gibt es Kuchenkrümel auf dem Sofa."
    },
    {
      "@type": "HowToStep",
      "position": 5,
      "name": "Letztes großes Spiel",
      "text": "Minute 80 bis 105: Noch eine aktive Runde. Kinder sind nach dem Kuchen wieder fit. Stopptanz, ein zweiter Parcours oder eine Team-Challenge. Das ist der letzte Energie-Peak, bevor die Party ausläuft."
    },
    {
      "@type": "HowToStep",
      "position": 6,
      "name": "Mitgebsel und Abholung",
      "text": "Letzte 15 Minuten: Ruhig auslaufen. Mitgebsel-Tüten verteilen, jedes Kind einzeln verabschieden, Jacken und Schuhe zurechtlegen. Eltern kommen tendenziell fünf Minuten zu früh — einplanen, nicht stressen lassen."
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
    print(f"✅ {len(schemas)} Schema(s) zu Drinnen hinzugefügt")
else:
    print("❌ kein JSON-LD gefunden")
