#!/usr/bin/env python3
"""
P1-11 Seite 1: kindergeburtstag-bei-regen.html auf 85%
- FAQPage mit 6 echten Fragen aus Content
- HowTo für Regen-Zeitplan (6 Steps)
- Content-Erweiterung: Ruhige-Aktivitäten-Sektion (Bastel-Ideen, Koch-mit-Kindern)
- Idempotent via Marker
"""
import re
from pathlib import Path

FILE = Path(__file__).parent.parent / "kindergeburtstag-bei-regen.html"
content = FILE.read_text(encoding="utf-8")

has_faq = '"FAQPage"' in content
has_howto = '"HowTo"' in content
has_upgrade = 'data-upgrade="p1-11"' in content

if has_faq and has_howto and has_upgrade:
    print("Schon komplett — skip")
    raise SystemExit(0)

# Schemas
schemas = []

if not has_faq:
    schemas.append('''  <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was mache ich, wenn es am Geburtstag regnet und wir eigentlich draußen feiern wollten?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Drei-Minuten-Check: Gibt es einen überdachten Bereich (Terrasse, Carport)? Dann teilweise draußen. Ist die Wohnung groß genug für 6 oder mehr Kinder? Dann komplett drinnen. Nichts davon? Dann verschieben oder eine Halle in der Nähe anmieten. Wichtig ist: Entscheidung drei Stunden vor Partybeginn treffen und per WhatsApp kommunizieren — nicht erst wenn Kinder schon auf dem Weg sind."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Spiele funktionieren bei Regen drinnen am besten?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bewährt sind: Schatzsuche durch die Wohnung, Quiz-Rallye mit Stationen, Bastel-Station, Kinderdisco mit Stopptanz und Musik-Spiele. Alle brauchen wenig Platz und Material. Vermeiden solltest du: Laufspiele mit Anlauf, Ballspiele (Scherben-Risiko) und alles mit viel Geschwindigkeit drinnen."
      }
    },
    {
      "@type": "Question",
      "name": "Kann ich bei Regen trotzdem draußen feiern?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, mit Einschränkungen. Wenn es leicht regnet und du einen Pavillon oder eine überdachte Terrasse hast, geht es. Ab Starkregen oder Gewitter bricht die Stimmung. Als Faustregel: bei Temperaturen über 15 Grad und leichtem Niesel okay, darunter wird es für Kinder unangenehm. Regenkleidung und Wechselsachen als Empfehlung an Gäste in die WhatsApp schicken."
      }
    },
    {
      "@type": "Question",
      "name": "Wie informiere ich die anderen Eltern über die Regen-Planänderung?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eine kurze WhatsApp-Nachricht an alle eingeladenen Eltern: \\"Wegen Regen feiern wir heute bei uns zuhause statt im Park. Adresse: [...]. Bringt gerne Wechselsachen mit.\\" Das reicht. Nicht stundenlange Erklärungen, nicht mehrere Nachrichten hintereinander. Eine klare Info, am besten drei Stunden vor Start."
      }
    },
    {
      "@type": "Question",
      "name": "Was, wenn ich keine Zeit hatte, einen Indoor-Plan vorzubereiten?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Der klassische Notfall-Dreisatz: Luftballons aufpusten (10 Min Beschäftigung beim Spielen), Schatzsuche durch die Wohnung improvisieren (30 Min, keine Vorbereitung nötig — einfach Süßigkeiten verstecken), Film als Backup (30 Min). Zusammen sind das über eine Stunde Programm, ohne irgendwas gekauft zu haben. Den Rest der Zeit decken Kuchen und freies Spielen ab."
      }
    },
    {
      "@type": "Question",
      "name": "Werden die Kinder bei Regen-Party weniger Spaß haben?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nein — oft ist es sogar intensiver. Kinder sitzen näher zusammen, es ist weniger laut, man muss nicht aufpassen, wer verloren geht. Viele Eltern berichten, dass Regen-Geburtstage entspannter waren als die im Garten. Stimmung macht das Essen, die Musik und die Eltern-Energie — nicht die Sonne. Das Wichtigste: bleib gelassen, die Kinder spiegeln deine Stimmung."
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
  "name": "Regen-Notfall-Plan in 6 Schritten (2 Stunden Indoor-Party)",
  "description": "Was tun, wenn es am Geburtstag-Morgen plötzlich regnet? Dieser Sechs-Schritte-Ablauf verwandelt eine geplante Gartenparty in eine funktionierende Wohnungsparty.",
  "totalTime": "PT2H",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Drei-Stunden-Check und Entscheidung",
      "text": "Drei Stunden vor Start Wetter checken, Entscheidung treffen: komplett drinnen, teilweise überdacht, oder verschieben. Nicht hin und her überlegen — entscheiden und dabei bleiben."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Eltern informieren",
      "text": "WhatsApp-Gruppennachricht mit neuem Ablauf, Adresse falls geändert, und Hinweis auf Wechselsachen. Alle gleichzeitig informieren, nicht einzeln — das vermeidet Rückfragen."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Wohnung kinderfest machen",
      "text": "15 Minuten vor Ankunft: Teppiche sichern, wertvolle Deko wegstellen, Tisch aus dem Weg schieben. Einen klaren Bereich für Schuhe und nasse Jacken definieren — sonst tropft es überall durch."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Erste Spielphase (Schatzsuche)",
      "text": "Erste 30 Minuten nach Ankommen: Schatzsuche durch die Wohnung. Einfache Variante ohne Vorbereitung reicht — Süßigkeiten in Schränken verstecken, Kinder suchen. Bindet beschäftigt, fordert Bewegung."
    },
    {
      "@type": "HowToStep",
      "position": 5,
      "name": "Kuchen und ruhige Phase",
      "text": "Minute 60 bis 90: Kuchen, Kerzen, Geschenke auspacken. Danach eine ruhige Bastel-Aktivität oder Film als Ruhepol. Kinder brauchen nach dem Toben einen Anker."
    },
    {
      "@type": "HowToStep",
      "position": 6,
      "name": "Abschluss-Spiel und Abholung",
      "text": "Letzte 30 Minuten: Stopptanz mit Musik als Energie-Schub, Mitgebsel-Verteilung, Verabschiedung. Eltern kommen oft zu früh — einplanen, nicht stressen."
    }
  ]
}
  </script>''')

# Schemas einfügen
if schemas:
    matches = list(re.finditer(r'<script type="application/ld\+json">.*?</script>', content, re.DOTALL))
    if matches:
        insert_pos = matches[-1].end()
        addition = "\n" + "\n".join(s.rstrip() for s in schemas)
        content = content[:insert_pos] + addition + content[insert_pos:]

# Content-Erweiterung: Ruhige-Aktivitäten-Sektion vor "Die schnelle Mindset-Shift"
CONTENT_MARKER = 'data-upgrade="p1-11"'
if CONTENT_MARKER not in content:
    # Einfügen vor der Mindset-Shift-Überschrift
    marker_text = '<h2>Die schnelle Mindset-Shift</h2>'
    new_section = '''  <h2 data-upgrade="p1-11">Ruhige Aktivitäten für Regentage</h2>
  <p class="u-clr-d">Zwischen den wilden Spielen brauchen Kinder Inseln zum Runterkommen. Das ist bei Indoor-Partys sogar wichtiger als bei Outdoor — die Energie bleibt im Raum und staut sich schnell an. Drei Aktivitäten, die erprobt funktionieren:</p>

  <h3>Bastel-Station (30 Minuten)</h3>
  <p class="u-clr-d">Ein Tisch, vier bis fünf Materialarten ausgelegt: Buntpapier, Klebstoff, Glitzer, Stifte, Perlen. Kein vorgegebenes Ergebnis, jedes Kind macht was es will. Warum das funktioniert: Kinder haben bei offenem Basteln oft länger Ausdauer als bei Anleitungen. Material kostet etwa 15 bis 20 Euro als einmalige Investition.</p>

  <h3>Koch-Station (20 Minuten)</h3>
  <p class="u-clr-d">Eine einfache Rezept-Station, die die Kinder selbst umsetzen — zum Beispiel Obstspieße, Mini-Pizza aus Toastbrot belegen oder Cake-Pops fertig dekorieren. Gibt ihnen das Gefühl, etwas Echtes zu machen, und nimmt gleichzeitig Druck vom Eltern-Buffet. Achtung: Hände waschen vor dem Start, ein Elternteil am Tisch beaufsichtigen.</p>

  <h3>Vorlese-Pause (15 Minuten)</h3>
  <p class="u-clr-d">Klassiker, funktioniert bei allen Altersgruppen. Kurze Geschichte, alle sitzen auf dem Teppich. Am besten thematisch zum Motto der Party — bei Detektiv-Geburtstag eine kurze Detektivgeschichte, bei Piraten eine Piraten-Anekdote. Bücher aus der eigenen Sammlung reichen, nichts extra kaufen.</p>

  <p class="u-clr-d"><strong>Zusammen mit aktiven Spielen:</strong> Der Mix aus laut und leise verhindert den typischen Regen-Party-Meltdown. Rechne mit zwei Aktivitätsblöcken (je 30 Minuten) plus Kuchen plus einer Ruhephase — damit sind zwei Stunden komfortabel gefüllt.</p>

  '''
    content = content.replace('  ' + marker_text, new_section + marker_text, 1)

FILE.write_text(content, encoding="utf-8")
print(f"✅ bei-regen: {len(schemas)} Schema(s), Content-Erweiterung eingefügt")
