#!/usr/bin/env python3
"""Deep SEO: kindergeburtstag-draussen.html — FAQPage + HowTo."""
import re
from pathlib import Path

FILE = Path(__file__).parent.parent / "kindergeburtstag-draussen.html"
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
      "name": "Wo kann ich einen Kindergeburtstag draußen feiern, wenn ich keinen Garten habe?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Öffentliche Spielplätze sind die häufigste Lösung, vor allem große Anlagen mit Wiese daneben. Dazu kommen Parkwiesen, Waldlichtungen, Stadtwälder mit Grillplätzen und manche Schulhöfe am Wochenende. Für Grillplätze und reservierbare Flächen ist die Kommune zuständig. Bei öffentlichen Flächen ohne Reservierung einfach früh hinkommen, bevor andere die Stelle belegt haben."
      }
    },
    {
      "@type": "Question",
      "name": "Was tun, wenn es am Tag der Party regnet?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Immer einen Plan B haben — nicht erst am Morgen der Party. Optionen: Party nach drinnen verlegen, auf die überdachte Terrasse, in eine Turnhalle, oder bei schönem Vormittag vorziehen. Am besten schon in die Einladung schreiben: 'Bei Regen findet die Party bei uns zuhause statt.' Das reduziert späteren Stress. Regen-Entscheidung spätestens drei Stunden vor Start treffen und per WhatsApp kommunizieren."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Spiele funktionieren draußen besonders gut?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Klassiker: Schnitzeljagd mit versteckten Stationen, Wasserbomben-Schlacht (bei Wärme), Staffelspiele mit Eiern und Löffeln, Seifenblasen-Parcours, Fußball-Turnier mit gemischten Teams, Hindernis-Rennen. Draußen darf es motorisch anspruchsvoller sein — Kinder toben sich aus, ohne dass Möbel leiden. Wichtig bei allem mit Wasser: Wechselkleidung-Hinweis in die Einladung."
      }
    },
    {
      "@type": "Question",
      "name": "Muss ich bei einer Outdoor-Party mit Allergikern besonders aufpassen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja — draußen gibt es mehr Trigger: Pollen, Bienen- und Wespenstiche, Gras-Allergien. Vor der Party bei den Eltern nachfragen, ob jemand Allergiker ist und ob Notfallmedikamente mitgebracht werden sollten. Süßes und offene Getränke nicht unbeaufsichtigt stehen lassen, sonst kommen Wespen. Ein Erste-Hilfe-Set mit Kühlgel und Pflastern gehört bei jeder Outdoor-Party in die Tasche."
      }
    },
    {
      "@type": "Question",
      "name": "Wie lange sollte ein Outdoor-Kindergeburtstag dauern?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Zweieinhalb bis drei Stunden sind ideal, etwas länger als drinnen. An der frischen Luft halten die Kinder länger durch, und die Energie verteilt sich besser. Aber: Sonnencreme nicht vergessen, Schatten anbieten, regelmäßig trinken lassen. Bei über drei Stunden brauchen auch Outdoor-Kinder eine Ruhephase — sonst werden sie abends übermüdet und quengelig."
      }
    },
    {
      "@type": "Question",
      "name": "Was muss ich mitnehmen, wenn wir im Park feiern?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pflicht: Picknickdecken, Mülltüten, Feuchttücher, Getränke in ausreichender Menge, Becher, Sonnencreme, Erste-Hilfe-Set, Handy mit aufgeladener Batterie. Sinnvoll: Pavillon oder Sonnensegel für Schatten, kleine Bluetooth-Box leise, Spielmaterial (Bälle, Seil), Müllsack zum Aufsammeln am Ende. Essen am besten kühl transportieren und auf einer Bank oder einem Tisch servieren, nicht direkt auf der Wiese."
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
  "name": "Kindergeburtstag draußen planen in 6 Schritten (2,5 Stunden)",
  "description": "Von der Platzwahl bis zum Aufräumen — so planst du eine Outdoor-Party strukturiert, auch ohne eigenen Garten.",
  "totalTime": "PT2H30M",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Ort festlegen",
      "text": "Garten, Park, Spielplatz oder Grillplatz entscheiden. Bei öffentlichen Flächen früh da sein oder reservieren. In der Einladung die genaue Adresse inklusive Hinweisen (Treffpunkt: Spielplatz Nord, bei der Rutsche)."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Wetter-Backup kommunizieren",
      "text": "Schon in der Einladung schreiben, was bei Regen passiert — entweder Verschiebung oder Indoor-Alternative. Drei Stunden vor Start Entscheidung treffen und per WhatsApp an alle Eltern weitergeben. Nicht warten, bis es regnet."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Ausrüstung packen",
      "text": "Decken, Mülltüten, Getränke, Becher, Sonnencreme, Erste-Hilfe-Set, Handy mit Akku, Pavillon für Schatten. Alles in eine große Tasche — ein Gang zum Auto muss reichen. Kühlbox für Getränke und Kuchen ist Pflicht."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Spiele-Abfolge planen",
      "text": "Drei bis vier Outdoor-Spiele in logischer Reihenfolge: aktiv zum Einstieg (Staffel), dann Schatzsuche als Mittelblock, dann etwas Ruhigeres (Basteln auf der Decke), zum Schluss noch ein Toben-Spiel als Abschluss. Zwischen Spielen Trink-Pausen einbauen."
    },
    {
      "@type": "HowToStep",
      "position": 5,
      "name": "Essen servieren",
      "text": "Fingerfood statt Buffet: Obstspieße, belegte Brötchen, Müslis und Muffins. Alles was man ohne Besteck essen kann. Kuchen und Kerzen auf einem stabilen Tisch anzünden, nicht auf der wackligen Decke. Wespen fernhalten mit abgedeckten Süßigkeiten."
    },
    {
      "@type": "HowToStep",
      "position": 6,
      "name": "Aufräumen und abholen",
      "text": "Letzte 15 Minuten: Mitgebsel-Tüten verteilen, Müll einsammeln, Fundsachen einsammeln (Jacken, Trinkflaschen). Im Park gilt: keine Spuren hinterlassen. Abholort klar in der Einladung angegeben, damit Eltern wissen, wo sie ihre Kinder abholen."
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
    print(f"✅ {len(schemas)} Schema(s) zu Draussen hinzugefügt")
else:
    print("❌ kein JSON-LD gefunden")
