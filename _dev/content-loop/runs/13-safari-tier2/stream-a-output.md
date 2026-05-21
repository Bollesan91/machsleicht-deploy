Ich hole mir den Briefing-Prompt.

Fetched: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/_dev/content-loop/runs/13-safari-tier2/stream-a-wow-ehrlichkeit-prompt.md
Fetched: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/_dev/content-loop/runs/13-safari-tier2/stream-a-wow-ehrlichkeit-prompt.md

Ich ziehe die referenzierten Materialien.

3 Befehle ausgeführt
3 Befehle ausgeführt

Jetzt die HTML lesen — ich brauche die exakten Zeilen für die 5 Anker.

Anker für alle 5 Edits lokalisieren
Anker für alle 5 Edits lokalisieren

Die Wow-Headline und Kaffee-Ecke fehlen noch in den Treffern. Ich präzisiere.

Kaffee-Ecke, Wow-Header, Einkaufsliste-Anker finden
Kaffee-Ecke, Wow-Header, Einkaufsliste-Anker finden

Jetzt habe ich alle Anker. Ich lese die exakten Blöcke für die 5 Edits — Wow-Header (um Z.519-529), Kostüm (631-632), die Section vor Einkaufsliste Wow (671), Kaffee-Ecke (376), Pirsch (442-444).

Wow-Header-Bereich für EDIT 1 lesen
Wow-Header-Bereich für EDIT 1 lesen

Der Wow-Block-Header ist Z.531 (✨ Wow — 2 Stunden...). EDIT 1 soll direkt davor. Der natürliche Ort: nach dem öffnenden <div class="variant-panel" id="panel-wow"> (Z.530), direkt vor dem <p>✨ Wow.... Jetzt lese ich die anderen Blöcke.

Kostüm-Block und Bereich vor Einkaufsliste Wow lesen
Kostüm-Block und Bereich vor Einkaufsliste Wow lesen

EDIT 3 (Vorbereitungs-Zeitsumme vor "Einkaufsliste Wow") soll vor Z.673 <h3>🛒 Einkaufsliste mit Links</h3>. Unmittelbar davor steht der <p style="font-size:13px">Alles in braune Papiertüte...</p> (Z.670). Jetzt EDIT 4 (Kaffee-Ecke Z.376) und EDIT 5 (Pirsch Z.442-444).

Kaffee-Ecke und Pirsch-Block lesen
Kaffee-Ecke und Pirsch-Block lesen

Ich habe alle 5 exakten Blöcke. Die .tip-Klasse ist bestätigt; .tip-box existiert nicht im File, also bleibe ich bei .tip. Hier sind die 5 EDITs.

EDIT 1: Wow-Variante-Aufklärung

LOCATION: Direkt nach dem öffnenden <div class="variant-panel" id="panel-wow">, unmittelbar vor dem Wow-Block-Header <p style="color:var(--d);font-weight:700;font-size:16px;margin-bottom:4px">✨ Wow — 2 Stunden... (Z.530–531)

ALTER BLOCK:

html
  <div class="variant-panel" id="panel-wow">
    <p style="color:var(--d);font-weight:700;font-size:16px;margin-bottom:4px">✨ Wow — 2 Stunden, der Tier-Helfer-Tag mit Bastel-Highlight</p>

NEUER BLOCK:

html
  <div class="variant-panel" id="panel-wow">
    <div class="tip" style="border-left-color:#E8873D">
      <strong>⚠️ Wow ist nicht für jede Familie ehrlich</strong>
      <p>Wow braucht: <strong>80 m²+ Wohnfläche ODER Garten</strong>, <strong>eine zweite erwachsene Hand</strong> (Partner, Oma, befreundete Mama), und <strong>mindestens ein 5-jähriges Geburtstagskind</strong>. Mit 3-Jährigen + Solo-Moderation: <strong>Standard nehmen</strong>, nicht Wow. Wer Wow trotzdem will: vorher mit der zweiten Hand absprechen, wer Stationen führt und wer Trostkontakt für überreizte Kinder ist.</p>
    </div>
    <p style="color:var(--d);font-weight:700;font-size:16px;margin-bottom:4px">✨ Wow — 2 Stunden, der Tier-Helfer-Tag mit Bastel-Highlight</p>
EDIT 2: Kostüm-Caveat schärfen (Fund 4)

LOCATION: Wow-Highlight-Block, <strong>🦁 Optional: Aufblasbares Safari-Tier-Kostüm fürs Geburtstagskind</strong> (Z.631–632)

ALTER BLOCK:

html
    <div class="tip">
      <strong>🦁 Optional: Aufblasbares Safari-Tier-Kostüm fürs Geburtstagskind</strong>
      <p>Wer einen echten Wow-Moment will: ein <a href="https://www.amazon.de/s?k=aufblasbares+tier+kost%C3%BCm+kinder+safari&tag=machsleicht-21" target="_blank" rel="noopener sponsored">aufblasbares Safari-Tier-Kostüm (Löwe, Elefant oder Zebra, ~35-50 €)*</a> für das Geburtstagskind. Es trägt das Kostüm bei der Lizenz-Übergabe und in der Foto-Ecke — Maximum-Erinnerung in einem einzigen Foto. Die Pumpe macht Geräusch, das "Größer-Werden" begeistert 3-5-Jährige sofort, und das Bild taucht garantiert in WhatsApp-Status der Eltern auf. Caveat: Bei sehr schüchternen Kindern vorher 1-2 Tage anprobieren lassen — manche lieben es sofort, andere brauchen Vorlauf. Nicht nötig, aber wenn Budget da ist: das markanteste Wow-Statement der ganzen Party.</p>
    </div>

NEUER BLOCK:

html
    <div class="tip" style="border-left-color:#E8873D">
      <strong>🦁 Optional: Aufblasbares Safari-Tier-Kostüm — nur für 5-Jährige</strong>
      <p>Ein <a href="https://www.amazon.de/s?k=aufblasbares+tier+kost%C3%BCm+kinder+safari&tag=machsleicht-21" target="_blank" rel="noopener sponsored">aufblasbares Safari-Tier-Kostüm (Löwe, Elefant oder Zebra, ~35-50 €)*</a> fürs Geburtstagskind kann bei der Urkunden-Übergabe und in der Foto-Ecke ein starkes Bild geben. Aber ehrlich: <strong>Das gehört nur auf ein 5-jähriges Kind, das das Kostüm vorher kennt und mag.</strong> Die Pumpe surrt laut und das Kostüm bläst sich am Körper auf — für viele 3- und 4-Jährige ist das Lärm plus Kontrollverlust am eigenen Körper, also Tränen statt Wow. Genau dieselbe Regel wie beim Löwen-Brüllen weiter unten: laute, plötzliche Veränderung = Meltdown-Risiko. Und ein Meltdown des Geburtstagskinds bei der Übergabe kippt die ganze Party. Für 3-Jährige: weglassen. Für 5-Jährige: <strong>2-3 Tage vorher in Ruhe anprobieren</strong> — wenn es dann lacht, mitnehmen; wenn nicht, lassen.</p>
    </div>
EDIT 3: Ehrliche Vorbereitungs-Zeitsumme (Fund 5)

LOCATION: Direkt vor <h3>🛒 Einkaufsliste mit Links</h3> in der Wow-Section (Z.673), also nach dem <p style="font-size:13px">Alles in braune Papiertüte...</p> (Z.670)

ALTER BLOCK:

html
    <p style="font-size:13px">Alles in braune Papiertüte (Stoff-Tuch separat, weil es noch feucht sein könnte!), beschriftet mit "Ausrüstung für Helfer ___". Kosten: <strong>~6 € pro Kind</strong>. Selbst bemaltes Tuch + Plüsch-Tier sind die Wow-Stücke — kein gekauftes Mitgebsel kommt da emotional ran.</p>

    <h3>🛒 Einkaufsliste mit Links</h3>

NEUER BLOCK:

html
    <p style="font-size:13px">Alles in braune Papiertüte (Stoff-Tuch separat, weil es noch feucht sein könnte!), beschriftet mit "Ausrüstung für Helfer ___". Kosten: <strong>~6 € pro Kind</strong>. Selbst bemaltes Tuch + Plüsch-Tier sind die Wow-Stücke — kein gekauftes Mitgebsel kommt da emotional ran.</p>

    <div class="tip">
      <strong>🕐 Realistische Vorbereitungs-Zeit Wow</strong>
      <p>~3-4 Stunden Basteln über 2 Abende (Stirnbänder, Urkunden, Pfoten, Memory, Tarn-Quadrate schneiden + Kanten versiegeln, Geräusche-Karten, Foto-Ecke). Plus 1 h Einkauf. Wer das in 1 h schaffen will: Standard nehmen, das geht ehrlich in 2 h Basteln + 30 Min. Einkauf. Die "10 Minuten" oben beziehen sich auf den Planer, der dir den Ablauf ausspuckt — nicht auf das Basteln.</p>
    </div>

    <h3>🛒 Einkaufsliste mit Links</h3>
EDIT 4: Eltern-Modell entwirren (Fund 2)

LOCATION: Standard-Section, Kaffee-Ecke-Block <strong>💡 Eltern bleiben dabei — und sind willkommen</strong> (Z.374–377)

ALTER BLOCK:

html
    <div class="tip">
      <strong>💡 Eltern bleiben dabei — und sind willkommen</strong>
      <p>Bei 3–5 ist Absetzen keine Option. Sag das aktiv vor der Party: <em>"Wir freuen uns, wenn ihr Eltern bei einem Kaffee bleibt."</em> Stell Kaffee/Tee, Wasser, 2 Stühle in einer ruhigen Ecke. Eltern reden untereinander, das nimmt dir Druck, und wenn ein 4-jähriges Kind plötzlich nach Mama fragt, ist sie schon da. Foto-Bonus: Eltern fotografieren die Urkunden-Übergabe, du musst nicht parallel filmen.</p>
    </div>

NEUER BLOCK:

html
    <div class="tip">
      <strong>💡 Eltern bleiben dabei — und packen bei zwei Stationen mit an</strong>
      <p>Bei 3–5 ist Absetzen keine Option. Sag das aktiv vor der Party: <em>"Wir freuen uns, wenn ihr Eltern bei einem Kaffee bleibt — und bei zwei Spielen kurz mithelft."</em> So weiß jeder vorher Bescheid und keiner fühlt sich überfallen. Die Kaffee-Ecke (Kaffee/Tee, Wasser, 2 Stühle in einer ruhigen Ecke) ist die Default-Position: dort sitzen die Eltern, reden untereinander, das nimmt dir Druck. Bei <strong>Memory und Tarn-Tuch-Basteln</strong> brauchen die 3-Jährigen aber je eine Hand — dann setzt sich jeweils das eigene Elternteil kurz zu seinem Kind, nicht zu fremden. Das ist kein Dauer-Einsatz, sondern zweimal ~15 Min. Danach geht's zurück in die Kaffee-Ecke. Ehrlich angekündigt funktioniert das; unangekündigt bleibt sonst alles an dir hängen. Foto-Bonus: Eltern fotografieren die Urkunden-Übergabe, du musst nicht parallel filmen.</p>
    </div>
EDIT 5: Pirsch-Raumannahme entschärfen (Fund 1)

LOCATION: Pirsch-Anleitung, Zeile <strong>Indoor:</strong> Spur in 2-3 Räume verteilen... (Z.443)

ALTER BLOCK:

html
        <br><strong>Indoor:</strong> Spur in 2-3 Räume verteilen, Türen geschlossen halten — sieht nach mehr "Reservat" aus als es ist. Schlafzimmer-Tür auch zu, sonst rennen sie aufs Bett.

NEUER BLOCK:

html
        <br><strong>Indoor:</strong> In einer großen Wohnung kannst du die Spur über 2-3 Räume legen. In 60-75 m² ist das schwer — dann mach es ehrlich anders: <strong>ein Raum mit verschachtelten Verstecken</strong> (Spur einmal um Sofa, hinter Vorhang, unter den Tisch, am Regal vorbei zum Endpunkt) wirkt für 3-5-Jährige genauso nach "weiter Weg" wie drei Räume — und du musst keine fremden Kinder durch Schlafzimmer und Bad lassen. Wer einen Garten hat: dort ist die Pirsch ohnehin am schönsten. Türen zu Räumen, die nicht zur Spur gehören, geschlossen halten — beim Pirschen drücken die Kinder sonst jede Klinke.

Alle 5 EDITs adressieren genau Fund 1–5, nutzen die bestehende .tip-Klasse (orangefarbener Akzent 
#E8873D als Warn-Variante wie bei EDIT 1 vorgegeben), enthalten keine der Anti-Pattern-Phrasen, und sind als exakte String-Replacements für das Edit-Tool von Claude Code verwertbar (jeder ALTER BLOCK kommt verbatim im File genau einmal vor).