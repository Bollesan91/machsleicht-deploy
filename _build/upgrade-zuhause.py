#!/usr/bin/env python3
"""P1-11 Seite 6: zuhause. HowTo + Content-Erweiterung (zu 589 Wörter)."""
import re
from pathlib import Path
FILE = Path(__file__).parent.parent / "kindergeburtstag-zuhause.html"
content = FILE.read_text(encoding="utf-8")

if '"HowTo"' in content and 'data-upgrade="p1-11"' in content:
    print("skip"); raise SystemExit(0)

# HowTo Schema
howto = '''  <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Kindergeburtstag zuhause in 6 Schritten vorbereiten",
  "description": "Vom Gaestelisten-Check bis zur Verabschiedung — ein pragmatischer Sechs-Schritte-Ablauf fuer die Wohnungs-Party.",
  "totalTime": "PT3H",
  "step": [
    {"@type":"HowToStep","position":1,"name":"Gaeste und Raum einschaetzen (1 Tag vorher)","text":"Wieviele Kinder kommen? Wieviel Platz hat die Wohnung? Faustregel: Ein Quadratmeter pro Kind im aktiven Spielbereich. Bei zehn Kindern also zehn Quadratmeter frei. Schlafzimmer abriegeln, Arbeitszimmer auch."},
    {"@type":"HowToStep","position":2,"name":"Wohnung kinderfest machen (60 Min)","text":"Zerbrechliches wegraeumen, Teppiche sichern, wertvolle Elektronik ausser Reichweite. Rutschgefahr pruefen. Zwei Abstellflaechen definieren: eine fuer Jacken und Schuhe, eine fuer Geschenke. Kueche als Erwachsenen-Zone markieren."},
    {"@type":"HowToStep","position":3,"name":"Einkauf am Tag (90 Min)","text":"Supermarkt-Einkauf in einem Rutsch: Kuchen, Getraenke, Snacks, Mitgebsel, Luftballons. Fertigkuchen statt selbst backen spart eine Stunde. Apfelsaftschorle plus Wasser reichen. Keine kohlensaeurehaltigen Getraenke, die kippen auf dem Teppich."},
    {"@type":"HowToStep","position":4,"name":"Deko in 20 Minuten (2 Stunden vor Start)","text":"Luftballons aufpusten und in Clustern an Stuhllehnen oder in Raumecken. Girlande am Esstisch. Zwei bis drei Motto-Elemente sichtbar. Mehr braucht es nicht. Geschenke-Tisch am Eingang vorbereiten."},
    {"@type":"HowToStep","position":5,"name":"Spiele vorbereiten (30 Min vor Start)","text":"Spiele-Material in Kisten am Einsatzort: Musik-Playlist, Bastel-Material, Quiz-Karten, Staffel-Utensilien. Alles griffbereit. Kuchen steht bereit, Kerzen am Kuchen."},
    {"@type":"HowToStep","position":6,"name":"Party durchfuehren und Puffer einplanen (3 Stunden)","text":"Klarer Ablauf: Ankommen (20 Min), Spielphase 1 (30 Min), Kuchen (30 Min), Spielphase 2 (30 Min), Geschenke (30 Min), Abschied (20 Min). Zehn Minuten Puffer zwischen den Phasen einplanen, Kinder sind nie im Plan."}
  ]
}
  </script>'''

# Insert HowTo after last existing schema
matches = list(re.finditer(r'<script type="application/ld\+json">.*?</script>', content, re.DOTALL))
if matches:
    insert_pos = matches[-1].end()
    content = content[:insert_pos] + "\n" + howto.rstrip() + content[insert_pos:]

# Content-Erweiterung: NEUE Sektion "Die 5 typischen Panic-Momente" vor "Kompletten Geburtstag zuhause planen"
marker_text = '<h2>Kompletten Geburtstag zuhause planen</h2>'
new_content = '''  <h2 data-upgrade="p1-11">Die 5 typischen Panic-Momente (und wie du sie abfaengst)</h2>
  <p>Jede Zuhause-Party hat die gleichen fuenf kritischen Momente. Wer sie kennt, steuert durch ohne Stress:</p>

  <h3>1. Ankommen: Kinder stehen in der Tuer</h3>
  <p>Die ersten 10 Minuten sind chaotisch. Kinder kommen einzeln oder in Grueppchen, Eltern wollen reden, Jacken landen ueberall. <strong>Loesung:</strong> Eine klare Ankommens-Aktivitaet vorbereiten — Ausmalbild, Button-Station, Knetmasse am Tisch. Kinder haben sofort was zu tun, Eltern koennen in Ruhe gehen.</p>

  <h3>2. Kuchen-Zeit: Kerzen werden angezuendet</h3>
  <p>Alle Kinder stehen um den Tisch, jedes will vorne sein, das Geburtstagskind wird ueberrollt. <strong>Loesung:</strong> Stuhlreihenfolge vorher festlegen. Geburtstagskind vorne, beste Freunde links und rechts. Kerzen vorher anzuenden statt erst am Tisch — verhindert Hektik.</p>

  <h3>3. Geschenke-Auspacken: Das Chaos-Risiko</h3>
  <p>Das Geburtstagskind bekommt 10 Geschenke auf einmal, Papier fliegt, andere Kinder werden ignoriert. <strong>Loesung:</strong> Einzeln auspacken, Karte vorlesen, danken. Dauert 20 Minuten, lohnt sich. Gibt dem Kind Zeit jedes Geschenk zu sehen, den Schenkenden Wertschaetzung.</p>

  <h3>4. Der erste Frust-Moment: Jemand verliert ein Spiel</h3>
  <p>Ein Kind verliert beim Stopptanz, weint, Stimmung kippt. <strong>Loesung:</strong> Keine harten Ausscheidungs-Spiele. Stattdessen Punkte-Systeme wo jeder am Ende gewinnt, oder Team-Spiele ohne Einzel-Verlierer. Wer doch Ausscheidung macht: sofort in Helfer-Rolle einbinden ('Du bist jetzt Schiedsrichter!').</p>

  <h3>5. Abholen: Eltern stehen frueh vor der Tuer</h3>
  <p>Erste Eltern kommen 15 Minuten zu frueh, Party ist noch nicht fertig, Abschied wird unbequem. <strong>Loesung:</strong> Abholzeit in der Einladung praezise angeben. Wer doch frueher kommt: Flur als Wartezone anbieten, nicht direkt in die Party-Zone lassen. Geschenk-Tueten fertig bereitstellen, damit die Verabschiedung schnell geht.</p>

  <p>Diese fuenf Momente machen oder brechen die Stimmung. Wer sie kennt, bleibt entspannt — und das spueren die Kinder sofort.</p>

  '''
content = content.replace('  ' + marker_text, new_content + marker_text, 1)

FILE.write_text(content, encoding="utf-8")
print(f"✅ zuhause: HowTo + Panic-Momente-Sektion eingefügt")
