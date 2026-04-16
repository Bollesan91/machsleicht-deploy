#!/usr/bin/env python3
"""P1-11 Seite 8: 5-jahre. FAQ ausbauen + HowTo."""
import re
from pathlib import Path
FILE = Path(__file__).parent.parent / "kindergeburtstag-5-jahre.html"
content = FILE.read_text(encoding="utf-8")

# FAQ ist da aber nur 1 Q — ersetzen mit 6 Q Block
has_full_faq = content.count('"@type": "Question"') >= 5

if has_full_faq and '"HowTo"' in content:
    print("skip"); raise SystemExit(0)

# Replace 1-question FAQ block with 6-question block
full_faq = '''  <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Wie lange sollte ein Kindergeburtstag mit 5 Jahren dauern?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Zweieinhalb Stunden sind ideal. Fuenfjaehrige haben noch kurze Konzentrationsspannen und werden bei laengerer Dauer quengelig. Unter zwei Stunden fehlt Zeit fuer Kuchen, Spiele und Geschenke. Ueber drei Stunden kippt die Stimmung. Zwei bis zweieinhalb Stunden sind der Sweet Spot, in der Einladung klar kommunizieren."
      }
    },
    {
      "@type": "Question",
      "name": "Wie viele Kinder sollte ich zu einem 5-Jaehrigen-Geburtstag einladen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vier bis sechs Kinder. Fuer die Faustregel Alter-plus-eins waere es sechs. Mehr als acht wird bei Fuenfjaehrigen schnell chaotisch, weil sie noch nicht gut in Gruppen spielen. Weniger als drei Kinder funktioniert auch, aber Spiele werden schwierig wenn jemand weint und es keine Alternative gibt."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Spiele funktionieren mit 5-Jaehrigen besonders gut?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Einfache Kreisspiele wie Topfschlagen, Stopptanz und Blinde Kuh. Kurze Schatzsuche mit drei bis vier Stationen ohne komplizierte Raetsel — einfach Gegenstaende finden. Basteln mit vorbereiteten Materialien (Schere vermeiden wenn moeglich). Seifenblasen im Garten oder auf der Terrasse. Wichtig: kurze Spiele, nicht laenger als 15 Minuten pro Runde."
      }
    },
    {
      "@type": "Question",
      "name": "Was kostet ein Kindergeburtstag fuer 5-Jaehrige?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Zuhause: 30 bis 50 Euro fuer sechs Kinder. Externe Locations (Indoor-Spielplatz, kleiner Ausflug): 80 bis 150 Euro. Fuenfjaehrige brauchen weniger aufwendige Deko als aeltere Kinder, weil sie davon weniger wahrnehmen. Einsparpotenzial ist hier groesser als bei Schulkindern."
      }
    },
    {
      "@type": "Question",
      "name": "Soll ich ein Motto waehlen fuer 5-Jaehrige?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, aber einfach. Fuenfjaehrige haben meist eine Lieblingsfigur oder ein Lieblingstier — das ist das Motto. Einhorn, Dinosaurier, Feuerwehr, Piraten funktionieren universell. Nicht ueberfordern: zwei bis drei Motto-Elemente reichen (Tischdecke, Luftballons in einer Farbe, motto-passender Kuchen). Kein komplettes Themen-Universum noetig."
      }
    },
    {
      "@type": "Question",
      "name": "Muessen die Eltern bleiben oder kann man absetzen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mit fuenf Jahren ist das gemischt. Manche Kinder bleiben entspannt, andere brauchen einen Elternteil. Einfache Regel: in der Einladung fragen, ob die Eltern bleiben wollen oder absetzen. Zwei bis drei begleitende Eltern ergaenzen sich gut — nicht alle, das wird eng. Elterngetraenke und Platz einplanen, falls sie bleiben."
      }
    }
  ]
}
  </script>'''

howto = '''  <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "5-Jaehrigen-Geburtstag in 2,5 Stunden durchziehen",
  "description": "Ablauf fuer eine zweieinhalbstuendige Party mit fuenfjaehrigen Kindern.",
  "totalTime": "PT2H30M",
  "step": [
    {"@type":"HowToStep","position":1,"name":"Ankommen und Basteln (20 Min)","text":"Kinder kommen einzeln an. Ankommens-Aktivitaet: einfache Bastel-Station mit vorbereiteten Materialien. Gibt den Eltern Raum fuers Gehen und den Kindern sofortigen Einstieg."},
    {"@type":"HowToStep","position":2,"name":"Bewegungsspiel (20 Min)","text":"Topfschlagen oder Stopptanz. Eines dieser beiden funktioniert bei jedem Fuenfjaehrigen. Nicht ueber 20 Minuten hinziehen, sonst kippt die Aufmerksamkeit."},
    {"@type":"HowToStep","position":3,"name":"Kuchen mit Kerzen (25 Min)","text":"Alle am Tisch, Kerzen, Geburtstagslied, dann langsam essen. Dauert laenger als man denkt. Saft dazu, nicht zu viel Zucker auf einmal."},
    {"@type":"HowToStep","position":4,"name":"Schatzsuche (30 Min)","text":"Drei bis vier Stationen in der Wohnung oder im Garten. Einfache Aufgaben, keine Raetsel. Am Ende kleine Schatzkiste mit Schokomuenzen oder Stickern. Hoehepunkt der Party."},
    {"@type":"HowToStep","position":5,"name":"Geschenke auspacken (20 Min)","text":"Einzeln auspacken, Karte vorlesen, danken. Auch wenn das Kind alles auf einmal will — langsam fuehren. Gibt Wertschaetzung fuer jedes Geschenk."},
    {"@type":"HowToStep","position":6,"name":"Ruhige Abschluss-Aktivitaet (20 Min)","text":"Malen, Ausruhen auf dem Teppich, eine kurze Geschichte. Kinder kommen runter, Eltern trudeln ein. Mitgebsel bereitlegen."},
    {"@type":"HowToStep","position":7,"name":"Verabschiedung (15 Min)","text":"Jedes Kind einzeln verabschieden, Mitgebsel mitgeben, Jacke nicht vergessen. Eltern pruefen ob alles eingesammelt ist."}
  ]
}
  </script>'''

# Replace minimal FAQ with full FAQ, then add HowTo after BreadcrumbList
# First: find the old FAQPage block and replace
old_faq_pattern = re.compile(r'\s*<script type="application/ld\+json">\s*\{\s*"@context":\s*"https://schema\.org",\s*"@type":\s*"FAQPage",.*?\}\s*</script>', re.DOTALL)
m = old_faq_pattern.search(content)
if m and content.count('"@type": "Question"') < 5:
    content = content[:m.start()] + '\n' + full_faq + content[m.end():]

# Add HowTo after last schema
matches = list(re.finditer(r'<script type="application/ld\+json">.*?</script>', content, re.DOTALL))
if matches and '"HowTo"' not in content:
    insert_pos = matches[-1].end()
    content = content[:insert_pos] + "\n" + howto.rstrip() + content[insert_pos:]

FILE.write_text(content, encoding="utf-8")
print("✅ 5-jahre: FAQ erweitert (1 → 6), HowTo ergänzt")
