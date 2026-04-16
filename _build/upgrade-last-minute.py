#!/usr/bin/env python3
"""P1-11 Seite 7: last-minute. Content-Verdopplung."""
import re
from pathlib import Path
FILE = Path(__file__).parent.parent / "kindergeburtstag-last-minute.html"
content = FILE.read_text(encoding="utf-8")

if 'data-upgrade="p1-11"' in content:
    print("skip"); raise SystemExit(0)

# NEUE SEKTIONEN vor "Was du NICHT brauchst"
marker = '<h2>Was du NICHT brauchst</h2>'
new_sections = '''  <h2 data-upgrade="p1-11">3 Szenarien: Wie viel Zeit hast du wirklich?</h2>
  <p>Last-Minute ist nicht gleich Last-Minute. Je nach Restzeit funktioniert etwas anderes. Die drei realistischen Szenarien:</p>

  <h3>48 Stunden: Das komfortable Last-Minute</h3>
  <p>Du hast zwei Tage. Das reicht fuer einen kompletten Plan. Heute: Einladungen per WhatsApp, Zusagen einholen, Einkaufsliste schreiben. Morgen: Einkauf, Kuchen (Fertigkuchen oder einfaches Rezept), Deko-Minimum. Am Party-Tag nur noch aufbauen und los. Hier passt alles, wenn du strukturiert vorgehst.</p>

  <h3>24 Stunden: Der Sprint</h3>
  <p>Du hast einen Tag. Fokus auf das Nowendige: WhatsApp-Nachricht raus (jetzt sofort), Einkauf im grossen Supermarkt (Kuchen, Getraenke, Mitgebsel, Luftballons — in einem Gang), Wohnung aufraeumen. Keine Selbstgebackenes, keine aufwendige Deko, keine Motto-Party ausser das Kind hat eins im Kopf. Spiele: drei reichen, alle ohne Vorbereitung.</p>

  <h3>6 Stunden: Der Notfall</h3>
  <p>Party startet heute Nachmittag. Hoechste Prioritaet: Kinder einladen (geht telefonisch schneller als WhatsApp), Kuchen oder Muffins kaufen (nicht backen), Getraenke aus dem Kuehlschrank plus Wasser aus der Leitung, Mitgebsel aus der Suessigkeitenschublade plus Papiertueten. Spiele: Schatzsuche durch die Wohnung improvisieren, Stopptanz mit Handy-Musik, Topfschlagen mit Kochloeffel. Kann stressig werden, aber es funktioniert.</p>

  <h2>Last-Minute-Einkaufsliste (fuer alle drei Szenarien)</h2>
  <p>Was im Einkaufswagen landen muss, unabhaengig vom Zeitbudget:</p>
  <ul>
    <li><strong>Kuchen oder Muffins:</strong> 1,5 Stueck pro Kind. Fertig aus dem Supermarkt reicht vollkommen. Kerzen dazu.</li>
    <li><strong>Getraenke:</strong> Apfelsaft plus Wasser. Kein Cola, keine Limo mit Kohlensaeure — kippt auf Teppiche.</li>
    <li><strong>Snacks:</strong> Chips, Salzstangen, Obst-Mix. Eine Schale pro Kategorie reicht.</li>
    <li><strong>Mitgebsel:</strong> Acht bis zehn Tueten. Inhalt: zwei Suessigkeiten pro Tuete, ein kleines Spielzeug aus der Ein-Euro-Ecke, ein Buntstift.</li>
    <li><strong>Luftballons:</strong> 20 Stueck. Aufgeblasen an Stuhlleenen oder in Raumecken gruppieren.</li>
    <li><strong>Servietten und Pappteller:</strong> Wenn du Pappgeschirr willst statt Geschirr-Marathon danach.</li>
  </ul>
  <p>Gesamt-Budget: 35 bis 55 Euro fuer acht Kinder. Unter 30 Euro wird es eng, ueber 70 Euro ist fuer Last-Minute unnoetig.</p>

  <h2>Die 5 haeufigsten Last-Minute-Fehler</h2>

  <h3>1. Zu ambitioniert planen</h3>
  <p>Der Klassiker: Du denkst, du kriegst doch noch eine Pinterest-Party hin. Klappt nicht in 24 Stunden. Runterskalieren: eine Farbe, einfache Deko, Standard-Spiele. Kinder merken den Aufwand nicht so sehr wie du denkst.</p>

  <h3>2. Allein einkaufen wollen</h3>
  <p>Bei 6-Stunden-Sprint ist Teamwork kritisch. Partner oder Freund uebernimmt Einkauf, du machst Wohnung. Parallele Aufgaben sparen eine Stunde. Wenn niemand da ist: Lieferdienst-Supermarkt (Getter, Flink, Rewe Lieferservice) ist die Rettung.</p>

  <h3>3. Eltern nicht informieren</h3>
  <p>Last-Minute-Parties haben eine Besonderheit: die Gaeste wissen oft nicht, worauf sie sich einlassen. Eine klare WhatsApp mit Uhrzeit, Adresse, Abholzeit, eventuellem Dresscode und Hinweis auf das Format ('Ganz entspannt, zuhause') nimmt den Eltern Unsicherheit.</p>

  <h3>4. Keine Puffer-Zeit</h3>
  <p>Du denkst, du bist um 14:45 fertig, Party startet um 15:00. Dann kommt zwischendurch: Kerzen fehlen, der Kuchen ist noch im Auto, ein Kind klingelt schon um 14:50. Plane 30 Minuten Puffer, sonst startet die Party im Stress-Modus.</p>

  <h3>5. Post-Party nicht bedacht</h3>
  <p>Wenn die Party um 17 Uhr endet und du alles in einer Stunde zusammenwaehrst, brichst du zusammen. Pack Muelltuete, Essbeutel fuer Reste, Spielsack fuer herumfliegende Teile vor der Party bereit. Am Abend gehst du einmal im Kreis durch die Wohnung, nicht mehr. Richtig aufraeumen am naechsten Tag.</p>

  '''
content = content.replace('  ' + marker, new_sections + marker, 1)

FILE.write_text(content, encoding="utf-8")
print("✅ last-minute: 2 neue H2 Sektionen + 5 Fehler-H3")
