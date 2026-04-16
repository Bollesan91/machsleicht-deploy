#!/usr/bin/env python3
"""
Upgrade für alle 8 Motto-Guides (ratgeber/*-fuer-eltern.html).
Fügt hinzu:
  - FAQPage-Schema mit 5 motto-spezifischen Fragen
  - HowTo-Schema (Motto-Party in 5 Schritten)
  - FAQ-Sektion visuell
  - HowTo-Sektion "Motto-Party in 5 Schritten"
  - Zusätzliche Planer-CTAs
Ergebnis: von ~450 W auf ~1200 W, Score von 47 auf ~85%.
"""
import re
from pathlib import Path

REPO = Path(__file__).parent.parent

# Motto-spezifischer Content: (slug, name, emoji, zielgruppe, faqs, howto, tipps)
MOTTOS = {
    "frozen": {
        "name": "Frozen / Eiskönigin",
        "emoji": "❄️",
        "farben": "Elsa-Blau, Weiß, Silber",
        "deko_basic": "Schneeflocken-Girlande, blaue Luftballons, silberne Sterne",
        "song": '"Let it go" / "Lass jetzt los"',
        "faqs": [
            ("Ab welchem Alter ist Frozen für Kinder geeignet?",
             "Frozen ist FSK 0, also für jedes Alter freigegeben. Für einen Frozen-Geburtstag sind 3–10 Jahre ideal. Die Kleinen lieben Olaf und die Musik, die Großen die Geschichte und die Magie. Ab 3 Jahre können Kinder dem Plot schon folgen."),
            ("Was sind gute Frozen-Spiele für einen Kindergeburtstag?",
             "Eis-Experimente (Eiswürfel mit Salz und Lebensmittelfarbe schmelzen lassen), Schneeballschlacht mit Wattebällchen, Elsa-Verwandlung mit Glitzerspray und ein Gefrier-Tanz zu 'Let it go' — Musik stoppt, alle frieren ein. Für die Kleinen reicht eine einfache Schneeflocken-Schatzsuche."),
            ("Welche Farben und Deko passen zu einem Frozen-Geburtstag?",
             "Elsa-Blau (Türkis), Weiß und Silber sind die Kernfarben. Schneeflocken als Papierformen oder Folie, blaue und weiße Luftballons, silberne Sterne an der Decke. Eisblaue Tischdecke und weiße Servietten runden den Look ab. Glitzer sparsam einsetzen — putzt sich schlecht weg."),
            ("Welcher Kuchen passt zu einem Frozen-Geburtstag?",
             "Einfach: Muffins mit weißem Frosting und blauen Zuckerstreuseln, dazu silberne Schneeflocken aus Esspapier. Mittel: Ein weißer Kastenkuchen mit blauer Glasur und einer Elsa-Figur obendrauf. Aufwändig: Eine Schloss-Torte — aber da braucht es Zeit und Geduld."),
            ("Welche Mitgebsel passen zu Frozen?",
             "Budget: Schneeflocken-Sticker, Elsa-Haarspangen vom 1-Euro-Shop, Süßigkeiten in kleinen blauen Tütchen. Mittel: Schneekugeln, Glitzer-Nagellack, kleine Olaf-Figuren. Bitte keine Plastik-Diademe, die gehen sofort kaputt."),
        ],
    },
    "harry-potter": {
        "name": "Harry Potter",
        "emoji": "⚡",
        "farben": "Gryffindor-Rot & Gold, Slytherin-Grün & Silber",
        "deko_basic": "Zauberstäbe, Hogwarts-Wappen, Kerzen-Attrappen",
        "song": "Hedwigs Theme",
        "faqs": [
            ("Ab welchem Alter ist Harry Potter geeignet?",
             "Die Bücher und Filme sind ab 6 Jahre (ab Film 4 ab 12). Für einen Kindergeburtstag passt Harry Potter am besten ab 7 Jahre, wenn Kinder die Charaktere schon kennen. Bei jüngeren Kindern reicht oft 'Zauberschule' als Konzept, ohne spezifische Handlungsreferenzen."),
            ("Was sind gute Harry-Potter-Spiele für einen Kindergeburtstag?",
             "Zaubertrank-Labor (Backpulver + Zitronensäure + Lebensmittelfarbe), Bertie Botts Bohnen-Quiz (welche Geschmacksrichtung?), Goldener Schnatz-Schatzsuche, Zauberspruch-Raten (wer errät 'Lumos', 'Accio'?) und der Hüttenzauberer-Hut, der die Kinder in Häuser einteilt."),
            ("Welche Farben und Deko passen zu einem Harry-Potter-Geburtstag?",
             "Gryffindor-Rot und Gold sind die klassische Wahl. Für Kontrast: Slytherin-Grün und Silber. Kerzen an die Decke hängen (per Schnur), Hogwarts-Wappen ausdrucken, Zauberstäbe aus Essstäbchen bemalen. Plattform 9¾-Schild am Eingang als Eyecatcher."),
            ("Welcher Kuchen passt zu einem Harry-Potter-Geburtstag?",
             "Einfach: Muffins mit Blitz-Narbe aus Zuckerguss, dazu Schokofrösche selber machen (Schokolade in Frosch-Silikonform). Mittel: Ein Hogwarts-Brief-Kuchen mit Pergament-Deko. Aufwändig: Die Goldene Schnatz-Torte oder der Sprechende Hut."),
            ("Welche Mitgebsel passen zu Harry Potter?",
             "Budget: Zauberstäbe aus bemalten Essstäbchen, Blitz-Narben-Tattoos, Hauswappen-Sticker. Mittel: Mini-Zauberbuch (Notizbuch), Bertie Botts Bohnen, kleine Goldene Schnatze. Keine echten Schokofrösche von Warner — überteuert und der Mehrwert stimmt nicht."),
        ],
    },
    "minecraft": {
        "name": "Minecraft",
        "emoji": "⛏️",
        "farben": "Grün, Braun, Grau — pixelig",
        "deko_basic": "Pixel-Luftballons, Creeper-Gesichter, TNT-Kästen aus Papier",
        "song": "Minecraft-Soundtrack (C418)",
        "faqs": [
            ("Ab welchem Alter ist Minecraft für Kinder geeignet?",
             "Minecraft ist ab 6 Jahre freigegeben (USK). Für einen Geburtstag passt es am besten ab 7 Jahre, wenn Kinder selbst spielen oder zuschauen. Die Gewaltdarstellung ist niedrigschwellig (Zombies, Skelette), aber für sensible Kinder unter 7 kann der Creeper-Jumpscare trotzdem erschreckend sein."),
            ("Was sind gute Minecraft-Spiele für einen Kindergeburtstag?",
             "Creeper-Explosion (Luftballon-Stopp), Diamanten-Schatzsuche (blaue Edelsteine verstecken), Pixel-Kunst mit Post-its, TNT-Wurfspiel (Kissen auf Kästen werfen), Block-Stapeln mit Karton-Würfeln. Wichtig: kein echtes Minecraft spielen während der Feier — das schließt die Gäste aus, die nicht dran sind."),
            ("Welche Farben und Deko passen zu Minecraft?",
             "Grün (Gras, Creeper), Braun (Erde, Holz), Grau (Stein, Eisen) sind die Grundfarben. Alles muss pixelig wirken. Luftballons aus kleinen Stoff-Schnipseln zusammenbauen, Pappkartons als Blöcke bemalen, Minecraft-Schriftzug ausdrucken. Keine Hochglanz-Optik — die wirkt 'zu perfekt' für Minecraft."),
            ("Welcher Kuchen passt zu einem Minecraft-Geburtstag?",
             "Einfach: Ein eckiger Kastenkuchen mit grünem Marzipan als Rasen-Oberfläche und braunen Seiten (Cornflakes + Schokolade). Mittel: Pixel-Muffins mit buntem Fondant-Raster. Aufwändig: Eine 3D-Creeper-Torte oder ein Diamant-Block aus blau gefärbtem Fondant."),
            ("Welche Mitgebsel passen zu Minecraft?",
             "Budget: Minecraft-Sticker, Papier-Schwerter (selber basteln), grüne Gummibärchen in Tütchen. Mittel: Mini-Figuren von Steve/Creeper, LED-Diamanten, Bauklötze. Keine Plastik-Spitzhacken vom Kiosk — brechen beim ersten Spiel."),
        ],
    },
    "ninjago": {
        "name": "Ninjago",
        "emoji": "🥷",
        "farben": "Grün (Lloyd), Rot (Kai), Blau (Jay), Schwarz (Cole), Weiß (Zane)",
        "deko_basic": "Ninja-Masken, Goldene Waffen aus Pappe, Drachen-Deko",
        "song": "Ninjago-Titelsong 'The Weekend Whip'",
        "faqs": [
            ("Ab welchem Alter ist Ninjago für Kinder geeignet?",
             "Ninjago (LEGO-Serie) ist ab 6 Jahre empfohlen. Für einen Geburtstag sind 5–10 Jahre das Sweet Spot. Die Kampfszenen sind LEGO-Style und nicht realistisch, also unproblematisch — aber die Serie ist komplex (viele Staffeln, Figuren), also gern vorher kurz ein YouTube-Trailer mit dem Geburtstagskind checken, welchen Ninja es am liebsten mag."),
            ("Was sind gute Ninjago-Spiele für einen Kindergeburtstag?",
             "Ninja-Parcours (über Stühle, unter Tisch durch, auf Kissen balancieren), Spinjitzu-Drehen (wer dreht sich am längsten), Goldene-Waffen-Suche, Ninja-Schleichen (bewegen nur wenn Musik läuft) und ein Dojo-Turnier mit Wattebällen-Wurf. Am Ende 'Ninja-Übergabe' mit echtem Ninja-Bandana."),
            ("Welche Farben und Deko passen zu Ninjago?",
             "Die Ninja-Farben: Grün (Lloyd — der Anführer), Rot (Kai — Feuer), Blau (Jay — Blitz), Schwarz (Cole — Erde), Weiß (Zane — Eis). Jeder Ninja ein Element. Meistens Lloyd als Hauptfarbe. Deko: goldene Waffen aus Pappe, Drachenbilder, Ninja-Silhouetten an Wänden."),
            ("Welcher Kuchen passt zu einem Ninjago-Geburtstag?",
             "Einfach: Muffins mit Fondant-Ninja-Augen in verschiedenen Farben. Mittel: Ein Ninjago-Logo-Kuchen (rechteckig, Logo ausgedruckt auf Esspapier). Aufwändig: Ein goldener Drache als Torten-Topper oder eine mehrstöckige Ninjago-City-Torte."),
            ("Welche Mitgebsel passen zu Ninjago?",
             "Budget: Ninja-Bandanas (selbst genäht aus farbigem Stoff), Ninjago-Sticker, goldene Münzen. Mittel: LEGO-Ninjago-Minifiguren, Shuriken aus Pappe, kleine Trainingswaffen. Keine Plastik-Schwerter mit Scharfkanten — Eltern beim Abschied sauer."),
        ],
    },
    "paw-patrol": {
        "name": "Paw Patrol",
        "emoji": "🐕",
        "farben": "Rot (Marshall), Blau (Chase), Gelb (Rubble), Rosa (Skye), Grün (Rocky)",
        "deko_basic": "Pfoten-Girlande, Hundehaus-Box, Paw-Patrol-Logo",
        "song": "Paw-Patrol-Titelsong",
        "faqs": [
            ("Ab welchem Alter ist Paw Patrol geeignet?",
             "Paw Patrol ist ab 3 Jahre gedacht und bei 3–6-Jährigen sehr beliebt. Ab 7 ist es meist 'zu babyish'. Für einen Geburtstag sind 3–6 Jahre perfekt. Die Serie ist sehr strukturiert (immer gleicher Ablauf: Notruf → Einsatz → Lösung), das gibt kleinen Kindern Sicherheit."),
            ("Was sind gute Paw-Patrol-Spiele für einen Kindergeburtstag?",
             "Rescue-Mission (Kuscheltiere retten aus 'Gefahrenzonen'), Pfoten-Parcours (Pfoten aus Pappe als Trittfläche), Welpenkörbchen-Wettkampf (wer sitzt am schnellsten im 'Körbchen'), Bellen auf Befehl (Simon sagt — Marshall sagt bell!) und Ryder-Ruf (Kinder kommen gerannt, wenn der Notruf ertönt)."),
            ("Welche Farben und Deko passen zu Paw Patrol?",
             "Jeder Welpe hat seine Farbe: Marshall rot, Chase blau, Rubble gelb, Skye rosa, Rocky grün, Zuma orange, Everest türkis. Am besten die Lieblings-Farbe des Geburtstagskindes als Hauptfarbe. Deko: Pfoten-Stanzformen, Welpen-Namen als Schilder, 'Adventure Bay'-Straßenschild aus Karton."),
            ("Welcher Kuchen passt zu einem Paw-Patrol-Geburtstag?",
             "Einfach: Pfoten-Cupcakes (ein großer Kreis + drei kleine aus Fondant). Mittel: Ein Kastenkuchen mit einem Welpen-Gesicht aus Fondant (Chase oder Marshall). Aufwändig: Eine Paw-Patrol-Ausguck-Torte oder ein mehrstöckiger Kuchen mit allen Welpen."),
            ("Welche Mitgebsel passen zu Paw Patrol?",
             "Budget: Paw-Patrol-Sticker, Pfoten-Tattoos, kleine Hundepfeifen. Mittel: Welpen-Figuren (Spielzeug), Paw-Patrol-Malbuch, Hunde-Halsband (Spielzeug). Keine billigen Plastik-Hundehütten — sehen nach einem Tag traurig aus."),
        ],
    },
    "pokemon": {
        "name": "Pokémon",
        "emoji": "⚡",
        "farben": "Gelb (Pikachu), Rot & Weiß (Pokéball)",
        "deko_basic": "Pokéball-Deko, Pikachu-Figuren, bunte Sammelkarten",
        "song": "Pokémon-Titelsong",
        "faqs": [
            ("Ab welchem Alter ist Pokémon für Kinder geeignet?",
             "Die Pokémon-Serie ist ab 6 Jahre empfohlen. Für einen Geburtstag sind 6–12 Jahre das Kern-Alter. Das Sammelkartenspiel kann echt teuer werden — deshalb lieber Sticker oder eigene selbst gedruckte Karten verschenken statt Booster-Packs. Einzelne Pokémon-Karten sind hochpreisig geworden."),
            ("Was sind gute Pokémon-Spiele für einen Kindergeburtstag?",
             "Pokéball-Wurfspiel (rot-weiße Bälle in Körbe), Pokémon-Ratequiz (welches Pokémon?), Schatzsuche nach 'Seltenen Pokémon' (Figuren verstecken), Evolutions-Memory (Entwicklungsstufen zusammenführen), Team-Rocket-Schnitzeljagd. Achtung: echtes Trading Card Game braucht Vorerfahrung — lieber vereinfachen."),
            ("Welche Farben und Deko passen zu einem Pokémon-Geburtstag?",
             "Pokéball-Design (rot oben, weiß unten, schwarz in der Mitte) ist die Signatur. Pikachu-Gelb als Akzentfarbe. Alle Pokémon-Figuren aufstellen, Typen-Symbole als Deko (Feuer, Wasser, Gras). Ein selbst gemalter Pokédex am Eingang für den 'Einstieg in die Welt'."),
            ("Welcher Kuchen passt zu einem Pokémon-Geburtstag?",
             "Einfach: Pikachu-Muffins (gelber Frosting, schwarze Ohrenspitzen aus Fondant). Mittel: Ein Pokéball-Kuchen (halbe Kugel mit rot-weißer Glasur und schwarzem Streifen). Aufwändig: Eine 3D-Pikachu-Torte oder ein Mewtu-Kuchen."),
            ("Welche Mitgebsel passen zu Pokémon?",
             "Budget: Pokémon-Sticker, selbst gedruckte Karten, gelbe Gummibärchen. Mittel: Kleine Pokémon-Figuren, Pokéball-Anhänger, Malbücher. KEINE echten Trading-Card-Booster — kosten 6–8€ pro Pack und lösen Sammelwahn aus. Verschenk lieber ein Set günstige Karten."),
        ],
    },
    "spider-man": {
        "name": "Spider-Man",
        "emoji": "🕷️",
        "farben": "Rot & Blau (klassischer Spidey), Schwarz (Venom)",
        "deko_basic": "Spinnennetze, Hochhaus-Silhouetten, rote Luftballons",
        "song": "Spider-Man-Theme",
        "faqs": [
            ("Ab welchem Alter ist Spider-Man für Kinder geeignet?",
             "Spider-Man-Filme sind FSK 12, die jüngeren Animationsserien (z.B. 'Spidey und seine Super-Freunde') ab 3 Jahre. Für einen Geburtstag passt Spider-Man am besten ab 5 Jahre — da kennen Kinder die Figur, ohne die (zu heftigen) Kinofilme gesehen zu haben. Thema 'Superhelden' statt konkreter Filmszenen."),
            ("Was sind gute Spider-Man-Spiele für einen Kindergeburtstag?",
             "Spinnennetz-Parcours (mit Wollfaden ein Netz zwischen Stühlen spannen), Web-Shooter-Zielscheibe (Luftballons mit Party-Wasserspritzpistolen treffen), Superhelden-Verkleidung, Spinnen-Schatzsuche (Plastikspinnen verstecken), Hochhaus-Sprungspiel (von Kissen zu Kissen). Am Ende: Superhelden-Vereidigung."),
            ("Welche Farben und Deko passen zu einem Spider-Man-Geburtstag?",
             "Rot und Blau sind die klassischen Spidey-Farben (mit schwarzem Netzmuster). Für 'Miles Morales' oder 'Venom' geht es in Schwarz und Rot. Deko: Spinnennetze aus Wolle (nicht die ekligen Halloween-Fäden), Hochhäuser aus Pappe an die Wand, rote Luftballons, ein großes Spider-Man-Logo am Eingang."),
            ("Welcher Kuchen passt zu einem Spider-Man-Geburtstag?",
             "Einfach: Rote Muffins mit schwarzem Netzmuster aus Schokolade. Mittel: Ein runder Kuchen mit Spider-Man-Maske aus Fondant. Aufwändig: Eine 3D-Spider-Man-Figur-Torte oder eine Stadt-Landschaft als Unterlage."),
            ("Welche Mitgebsel passen zu Spider-Man?",
             "Budget: Spider-Man-Masken aus Papier, Spinnen-Tattoos, rote Gummibärchen. Mittel: Spielzeug-Web-Shooter, Mini-Action-Figuren, Malbücher. Keine billigen Kostüme vom Discounter — reißen beim ersten Gebrauch. Besser einen guten Artikel als zehn schnell kaputte."),
        ],
    },
    "super-mario": {
        "name": "Super Mario",
        "emoji": "🍄",
        "farben": "Rot (Mario), Grün (Luigi), Gelb (Münzen)",
        "deko_basic": "Pilze aus Papier, Münzen (Goldfolie), Röhren aus Karton",
        "song": "Super-Mario-Soundtrack",
        "faqs": [
            ("Ab welchem Alter ist Super Mario für Kinder geeignet?",
             "Die Mario-Spiele sind ab 0 Jahre (USK), die Filme ab 6 Jahre. Für einen Geburtstag passt Mario super für 4–10 Jahre. Die Spielwelt ist fröhlich, nicht gewalttätig (Gegner 'plätten', nicht 'töten'), und die Ikonographie (Pilze, Röhren, Münzen) ist für Kinder sofort erkennbar — auch ohne jemals gespielt zu haben."),
            ("Was sind gute Super-Mario-Spiele für einen Kindergeburtstag?",
             "Münzen-Sammel-Rally (gelbe Goldfolie-Kreise durch die Wohnung verstecken), Pilz-Wurfspiel (rote Bälle in Eimer werfen), Yoshi-Hüpfen (auf Kissen hüpfen, Zunge nach Süßigkeiten strecken), Röhren-Parcours (durch Papp-Tunnel kriechen) und Bowser-Bossfight (großer Ballon muss 'besiegt' werden)."),
            ("Welche Farben und Deko passen zu Super Mario?",
             "Rot (Mario), Grün (Luigi und Yoshi), Gelb (Münzen), Blau (Himmel). Die vier Farben in Kombination sind der Mario-Look. Deko: Rot-weiße Pilze aus Pappe an den Wänden, große Goldmünzen aus Folie, grüne Röhren aus Karton als Durchgang, Frage-Block-Würfel aus gelben Kartons."),
            ("Welcher Kuchen passt zu einem Super-Mario-Geburtstag?",
             "Einfach: Rot-weiße Pilz-Muffins (rotes Frosting + weiße Zuckerstreusel-Punkte). Mittel: Ein Mario-Kuchen mit Fondant-Mario auf der Oberseite. Aufwändig: Eine 3D-Röhren-Torte oder ein Bowser-Castle-Kuchen."),
            ("Welche Mitgebsel passen zu Super Mario?",
             "Budget: Mario-Sticker, Goldmünzen-Schokolade, rote Party-Hüte als 'Mario-Mütze' (M aufmalen). Mittel: Mini-Mario-Figuren, Pilz-Spielzeug, Malbücher. Keine überteuerten Mario-Kostüme aus dem Spielwarenladen — 3x teurer als online, oft schlechte Qualität."),
        ],
    },
}


def build_faq_schema(faqs):
    """Baut FAQPage JSON-LD."""
    items = []
    for q, a in faqs:
        # JSON-safe: Anführungszeichen escapen
        q_esc = q.replace('"', '\\"')
        a_esc = a.replace('"', '\\"')
        items.append(
            '{"@type":"Question","name":"' + q_esc + '","acceptedAnswer":{"@type":"Answer","text":"' + a_esc + '"}}'
        )
    return '''<script type="application/ld+json">
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[''' + ','.join(items) + ''']}
</script>'''


def build_howto_schema(motto_name):
    """Baut HowTo JSON-LD für 5-Schritte-Planung."""
    return f'''<script type="application/ld+json">
{{"@context":"https://schema.org","@type":"HowTo","name":"{motto_name}-Kindergeburtstag planen in 5 Schritten","description":"So planst du einen {motto_name}-Geburtstag von Null bis fertig.","totalTime":"PT30M","step":[
  {{"@type":"HowToStep","position":1,"name":"Alter des Kindes prüfen","text":"Stell sicher, dass dein Kind im richtigen Alter für {motto_name} ist. Ab 3 Jahre ist die Regel — aber jedes Kind ist anders."}},
  {{"@type":"HowToStep","position":2,"name":"3 Lieblings-Figuren mit Kind wählen","text":"Lass dein Kind 3 Figuren aussuchen, die ihm am wichtigsten sind. Das wird die Basis für Deko und Spiele."}},
  {{"@type":"HowToStep","position":3,"name":"Deko-Farben festlegen","text":"Wähle 2–3 Kernfarben aus dem Motto. Konsistente Farben wirken viel stärker als viele bunte Details."}},
  {{"@type":"HowToStep","position":4,"name":"3 Spiele planen","text":"Drei Spiele reichen für 2 Stunden Party. Ein Bewegungsspiel, ein Kreativspiel, ein Sucheelement — das ist die erprobte Mischung."}},
  {{"@type":"HowToStep","position":5,"name":"Kuchen und Mitgebsel vorbereiten","text":"Ein einfacher Motto-Kuchen (Muffins mit Themen-Deko) reicht. Mitgebsel im Budget 2–3€ pro Kind halten."}}
]}}
</script>'''


def build_faq_html(faqs, motto_name):
    """Baut sichtbaren FAQ-Block."""
    html = f'\n  <h2>Häufige Fragen zum {motto_name}-Geburtstag</h2>\n'
    for q, a in faqs:
        html += f'''  <div class="card" style="padding:16px;margin-bottom:10px">
    <h3 style="margin:0 0 8px;font-size:16px">{q}</h3>
    <p style="margin:0;font-size:14px">{a}</p>
  </div>
'''
    return html


def build_howto_html(motto_name, farben, deko_basic):
    """Baut sichtbare HowTo-Sektion."""
    return f'''
  <h2>{motto_name}-Party planen in 5 Schritten</h2>
  <ol style="padding-left:20px;margin-bottom:16px">
    <li style="margin-bottom:10px;font-size:15px;color:var(--d)"><strong>Alter prüfen.</strong> Stell sicher, dass dein Kind im richtigen Alter für {motto_name} ist — bei Unsicherheit lieber eine Alters-Kategorie runtergehen.</li>
    <li style="margin-bottom:10px;font-size:15px;color:var(--d)"><strong>Die 3 wichtigsten Figuren vom Kind aussuchen lassen.</strong> Nicht alle Figuren sind gleich wichtig — die 3 Lieblinge werden deine Deko-Anker und Spiel-Ideen.</li>
    <li style="margin-bottom:10px;font-size:15px;color:var(--d)"><strong>Farben festlegen.</strong> Typisch für {motto_name}: {farben}. 2–3 Farben reichen. Konsistenz schlägt Vielfalt.</li>
    <li style="margin-bottom:10px;font-size:15px;color:var(--d)"><strong>3 Spiele planen.</strong> Ein Bewegungsspiel, ein Kreativspiel, ein Sucheelement — das deckt 2 Stunden Party. Mehr brauchst du nicht.</li>
    <li style="margin-bottom:10px;font-size:15px;color:var(--d)"><strong>Kuchen & Mitgebsel.</strong> Basis-Deko: {deko_basic}. Kuchen einfach halten, bei Mitgebseln auf Qualität statt Quantität setzen.</li>
  </ol>
  <p class="u-clr-d" style="font-style:italic">Machsleicht macht das alles automatisch für dich — inkl. Einkaufsliste, Zeitplan und altersgerechter Spiele. <a href="/kindergeburtstag?motto={motto_name.lower().replace(' / ', '-').replace(' ', '-')}#planer">Jetzt {motto_name}-Geburtstag planen &rarr;</a></p>
'''


def upgrade_file(filepath, motto_key, motto_data):
    content = filepath.read_text(encoding="utf-8")

    # Check: FAQ schon drin?
    if '"@type":"FAQPage"' in content or '"@type": "FAQPage"' in content:
        print(f"  SKIP (FAQ bereits vorhanden): {filepath.name}")
        return False

    # 1) FAQ + HowTo Schema nach BreadcrumbList einfügen
    faq_schema = build_faq_schema(motto_data["faqs"])
    howto_schema = build_howto_schema(motto_data["name"])

    # Finde das Ende des BreadcrumbList-Schemas
    # Pattern: </script> gefolgt von <link rel="icon"
    marker = '</script>\n  <link rel="icon" type="image/x-icon"'
    if marker not in content:
        print(f"  WARN: Kein Schema-Anker gefunden in {filepath.name}")
        return False
    replacement = '</script>\n  ' + faq_schema + '\n  ' + howto_schema + '\n  <link rel="icon" type="image/x-icon"'
    content = content.replace(marker, replacement, 1)

    # 2) Sichtbare FAQ + HowTo-Sektion vor "Jetzt den ... -Geburtstag planen" einfügen
    faq_html = build_faq_html(motto_data["faqs"], motto_data["name"])
    howto_html = build_howto_html(motto_data["name"], motto_data["farben"], motto_data["deko_basic"])

    # Marker: "<h2>Jetzt den" (das ist die Haupt-CTA-Überschrift)
    marker2 = '<h2>Jetzt den'
    if marker2 in content:
        content = content.replace(marker2, howto_html + faq_html + '\n  <h2>Jetzt den', 1)
    else:
        # Fallback: vor Mehr Ratgeber
        marker2 = '<h2>Mehr Ratgeber</h2>'
        if marker2 in content:
            content = content.replace(marker2, howto_html + faq_html + '\n  ' + marker2, 1)
        else:
            print(f"  WARN: Kein Einfüge-Anker in {filepath.name}")
            return False

    filepath.write_text(content, encoding="utf-8")
    return True


def main():
    changed = 0
    for slug, data in MOTTOS.items():
        path = REPO / "ratgeber" / f"{slug}-fuer-eltern.html"
        if not path.exists():
            print(f"FEHLT: {path}")
            continue
        if upgrade_file(path, slug, data):
            print(f"  OK: {path.name}")
            changed += 1
    print(f"\n{changed}/8 Motto-Guides upgegraded")


if __name__ == "__main__":
    main()
