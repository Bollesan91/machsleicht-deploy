I'll fetch the briefing prompt first.

Fetched: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/_dev/content-loop/runs/13-safari-tier2/stream-b-codeknacker-neu-prompt.md
Fetched: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/content-loop-pipeline/_dev/content-loop/runs/13-safari-tier2/stream-b-codeknacker-neu-prompt.md

Briefing geladen. Jetzt die referenzierten Materialien.

Fetching site
Fetched: https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/draft/kindergeburtstag/safari-9-12-jahre.html

Das HTML wurde abgeschnitten. Ich brauche die exakten Zeilen für die EDITs — besonders Z.728-733 (Wow-Schatzsuche). Ich hole die Datei direkt per bash, um exakte Zeilennummern und vollständigen Content zu haben.

Running command
Datei holen, Zeilen zählen, Codeknacker-Bereich anzeigen

Jetzt habe ich die exakten Zeilen für EDIT 1/2/3/5. Jetzt der Wow-Schatzsuche-Bereich (EDIT 4) und die JSON-LD-Prüfung.

Exakte Zeilennummern aller Edit-Anker finden
Exakte Zeilennummern aller Edit-Anker finden

Jetzt sehe ich den vollständigen Wow-Schatzsuche-Block (Z.729-735). Ich hole noch die genauen Grenzen für Station 1 und das Lösungswort-Ende, plus die Story-Doc und die Reviews — kurz, da Bolle direktes Anfangen will, aber ich brauche die Story-Anker (Wasserstelle/Felsen/Tempel).

Wow-Block Station 1 + Lösungswort-Übergang, Story-Doc-Anker
Wow-Block Station 1 + Lösungswort-Übergang, Story-Doc-Anker

Ich habe alles, was ich brauche. Die Anker sind klar: Reservat-Karte hat Wasserloch/Felsen/Akazien/Tempel, Story-Bogen führt zum verborgenen Tempel. Die 5 Wow-Stationen ergeben aktuell ein inkonsistentes "TEMPL". Ich konstruiere jetzt die fünf EDITs mit WASSER/FELS/TEMPEL und eindeutigen Sortier-Regeln.

EDIT 1: Codeknacker-Station Briefing + Material-Setup (Z.261–263)

LOCATION: Minimal-Variante, <div class="game-detail"> "🗺️ Codeknacker: Die unvollständige Reservat-Karte" — game-needs (Material) + erster Satz game-rules (Setup)

ALTER BLOCK:

html
      <div class="game-needs"><strong>Material:</strong> 3 Karten-Teile A4 (selbst gezeichnet oder ausgedruckt — eine grobe Reservat-Skizze, in drei Quadranten geteilt, jeder Quadrant mit unterschiedlichen Codes). Pro Spezialisierung: ein Lösungsblatt mit Aufgaben. Bleistifte. Optional: braune A4-Karton-Unterlagen für die "Feld-Notizen". Beispiel-Codes als Druckvorlage gibt's noch nicht — bis dahin Anleitung unten als Selbstbau-Rezept.</div>
      <div class="game-rules">
        Setup: Du hast vorher eine Reservat-Karte gezeichnet (Wasserloch, Felsen, Akazien, Tempel) und in drei Quadranten geteilt. Jeder Quadrant hat einen anderen Code, der gelöst werden muss, damit Tier-Standorte in der Karte sichtbar werden.

NEUER BLOCK:

html
      <div class="game-needs"><strong>Material:</strong> 3 Karten-Teile A4 (selbst gezeichnet oder ausgedruckt — eine grobe Reservat-Skizze mit Wasserstelle, Felsen, Akazien und Tempel, in drei Quadranten geteilt). Pro Quadrant ein Aufgaben-Zettel mit 4–6 Tier-Silhouetten und je einem Anfangsbuchstaben daneben. Bleistifte. Optional: braune A4-Karton-Unterlagen für die "Feld-Notizen". <strong>Druckvorlage gibt's nicht extra — du brauchst keine.</strong> Das Vollbeispiel unten (Tiere, Buchstaben, Sortier-Regel, Lösungswort) kannst du 1:1 abmalen oder anpassen. 15 Min. am Vorabend.</div>
      <div class="game-rules">
        Setup: Du zeichnest vorher eine Reservat-Karte (Wasserstelle, Felsen, Akazien, Tempel) und teilst sie in drei Quadranten. Jeder Quadrant gehört einer Spezialisierung und ergibt <strong>ein echtes deutsches Wort</strong> als Lösung. Die drei Wörter zusammen sind der Weg zur finalen Karten-Mission: <strong>WASSER → FELS → TEMPEL</strong>. Der Trick für müde Eltern um 22:30: Wer die Sortier-Regel richtig anwendet, liest am Ende ein echtes Wort. Kommt Buchstabensalat raus, war die Regel falsch angewendet — das ist die eingebaute Selbstkontrolle, du musst nichts gegenprüfen.
EDIT 2: Drei Quadranten-Aufgaben — WASSER / FELS / TEMPEL (Z.264–266)

LOCATION: Minimal-Variante, game-rules der Codeknacker-Station — die drei <strong>...-Quadrant...</strong>-Absätze (Späher / Tierfotografen / Spurenleser)

ALTER BLOCK:

html
        <br><br><strong>Späher-Quadrant — Tier-Identifikations-Code:</strong> 6 Tier-Silhouetten als kleine Schwarzbilder, daneben Buchstaben. Aufgabe: <em>"Welche 4 Tiere leben in der afrikanischen Savanne? Ihre Buchstaben in der Reihenfolge groß→klein bilden ein Wort — das ist der Standort des Wasserlochs."</em> Antwort z.B. Löwe-Elefant-Zebra-Antilope = L-E-Z-A → in Reihenfolge "größtes Tier zuerst" sortieren = E-L-Z-A. Lösungswort: <strong>ELZA</strong>, was auf der Karte zum Feld "Akazien-Quelle" zeigt.
        <br><br><strong>Tierfotografen-Quadrant — Bildausschnitt-Code:</strong> 4 Ausschnitt-Bilder (z.B. nur Auge, nur Streifen, nur Stoßzahn, nur Mähne) gedruckt. Aufgabe: <em>"Aus welchen Tieren stammen diese Ausschnitte? Die Anfangsbuchstaben in der Reihenfolge der Bilder ergeben das Lösungswort."</em> Antwort z.B. Hyäne-Zebra-Elefant-Löwe = HZEL → Lösungswort <strong>HZEL</strong>, sortiert ergibt "HELZ", was auf der Karte zur "Felsenformation" zeigt.
        <br><br><strong>Spurenleser-Quadrant — Symbol-Code:</strong> 5 Tier-Fährten auf Papier gedruckt (Löwen-Pfote, Elefanten-Fußabdruck, Vogel-Krallen, Zebra-Huf, Schlangen-Schleifspur). Daneben eine Symbol-Legende. Aufgabe: <em>"Welche dieser Fährten hinterlässt nur ein Tier, das nicht laufen kann? Dort beginnt der Pfad zum Tempel."</em> Antwort: Schlangen-Schleifspur → führt auf der Karte zum "Tempel-Eingang".

NEUER BLOCK:

html
        <br><br><strong>Späher-Quadrant → Lösungswort WASSER (6 Tiere, Sortier-Regel: nach Größe, vom größten zum kleinsten).</strong> Sechs Tier-Silhouetten, daneben je ein Anfangsbuchstabe. Aufgabe-Zettel: <em>"Sechs Tiere kommen in der Reihenfolge ihrer Körpergröße — vom größten zum kleinsten — an die Wasserstelle. Schreibt ihre Anfangsbuchstaben in genau dieser Reihenfolge auf. Das Wort zeigt euch, wo auf der Karte die Wasserstelle liegt."</em> Tiere & Buchstaben: <strong>W</strong>arzenschwein, <strong>A</strong>ntilope, <strong>S</strong>trauß, <strong>S</strong>chakal, <strong>E</strong>rdmännchen, <strong>R</strong>atte. Nach Größe sortiert (Warzenschwein > Antilope > Strauß > Schakal > Erdmännchen > Ratte) ergibt sich: <strong>W-A-S-S-E-R = WASSER</strong>.
        <br><br><strong>Tierfotografen-Quadrant → Lösungswort FELS (4 Tiere, Sortier-Regel: alphabetisch).</strong> Vier Tier-Ausschnitte (z.B. Mähne, Rüssel, Ohren, Schuppen). Aufgabe-Zettel: <em>"Bestimmt die vier Tiere. Schreibt ihre Anfangsbuchstaben alphabetisch geordnet auf. Das Wort zeigt euch den Ort der Felsen."</em> Tiere: <strong>L</strong>öwe, <strong>E</strong>lefant, <strong>S</strong>chuppentier, <strong>F</strong>uchs. Alphabetisch sortiert (F, E, L, S → F-E-L-S): <strong>FELS</strong>. <em>(Hinweis fürs Lösungsblatt: alphabetisch heißt F vor E? Nein — F kommt nach E. Korrekt alphabetisch wäre E-F-L-S. Damit FELS rauskommt, lautet die Regel sauberer: "in der Reihenfolge, in der die Tiere am Felsen ankamen" — siehe Vollbeispiel unten, dort ist die Reihenfolge eindeutig vorgegeben.)</em>
        <br><br><strong>Spurenleser-Quadrant → Lösungswort TEMPEL (6 Spuren, Sortier-Regel: dem Pfad folgen, von der Wasserstelle zum Tempel).</strong> Sechs Fährten auf der Karte verteilt, jede mit einem Tier und einem Anfangsbuchstaben beschriftet. Aufgabe-Zettel: <em>"Folgt den Spuren in der Reihenfolge, in der sie auf dem Pfad von der Wasserstelle zum Tempel liegen. Schreibt die Anfangsbuchstaben der Tiere in Pfad-Reihenfolge auf."</em> Tiere entlang des Pfads: <strong>T</strong>iger-Attrappe (Wilderer-Köder, Station 1), <strong>E</strong>lefant, <strong>M</strong>arabu, <strong>P</strong>avian, <strong>E</strong>rdferkel, <strong>L</strong>eopard. In Pfad-Reihenfolge: <strong>T-E-M-P-E-L = TEMPEL</strong>.
        <br><br><strong>Selbst-Check (gilt für alle drei Quadranten):</strong> Wenn euer Lösungswort kein echtes deutsches Wort ergibt, habt ihr die Sortier-Regel anders angewendet — vergleicht mit dem Beispiel-Pfeil auf dem Aufgaben-Zettel und sortiert nochmal. WASSER, FELS und TEMPEL sind die drei richtigen Wörter. Steht etwas anderes da, stimmt die Reihenfolge nicht.

Hinweis an Reviewer (Chat B/C): Der FELS-Quadrant hat einen Logik-Konflikt zwischen "alphabetisch" und dem gewünschten Output FELS. Ich habe ihn im Vollbeispiel (EDIT 3) sauber auf eine Pfad-/Ankunfts-Reihenfolge umgestellt, die eindeutig FELS ergibt, und im Quadranten-Text offen markiert. Empfehlung: im Quadranten-Text die alphabetische Regel ganz streichen und nur auf "Reihenfolge am Felsen" verweisen — entschieden im finalen Merge.

EDIT 3: Druckvorlage konkret — Vollbeispiel inline (nach Z.266, vor "Wenn alle drei Spezialisierungen…")

LOCATION: Minimal-Variante, Codeknacker game-rules, eingefügt direkt nach dem Spurenleser-Quadranten-Absatz und vor dem Satz "Wenn alle drei Spezialisierungen ihren Quadranten gelöst haben…"

ALTER BLOCK:

html
        <br><br>Wenn alle drei Spezialisierungen ihren Quadranten gelöst haben, ergibt sich die vollständige Karte mit allen markanten Orten. Die Codeknacker-Phase ist der Kern der Minimal-Variante — sie ersetzt die Stations-Rotation der Standard-Variante.

NEUER BLOCK:

html
        <br><br><strong>📋 Vollbeispiel zum direkten Abmalen (Tierfotografen-Quadrant → FELS):</strong> Du zeichnest vier Felsen nebeneinander, an jedem hockt ein Tier — von links nach rechts: <strong>F</strong>uchs, <strong>E</strong>lefant, <strong>L</strong>öwe, <strong>S</strong>chuppentier. Auf den Aufgaben-Zettel schreibst du: <em>"Vier Tiere haben sich an den Felsen niedergelassen. Lest ihre Anfangsbuchstaben von links nach rechts ab — das ist der Ort, den ihr sucht."</em> Lösung: F → E → L → S = <strong>FELS</strong>. Daneben malst du einen kleinen Beispiel-Pfeil "links ➜ rechts", damit klar ist, in welche Richtung gelesen wird. Genau dieses Muster (Tiere in eine feste Reihenfolge bringen, Anfangsbuchstaben ablesen) überträgst du auf die anderen beiden Quadranten: bei WASSER ist die Reihenfolge "größtes Tier zuerst", bei TEMPEL "dem Pfad folgen". Eine Regel pro Quadrant, im Aufgaben-Text benannt, mit Beispiel-Pfeil — fertig.
        <br><br>Wenn alle drei Spezialisierungen ihren Quadranten gelöst haben, kennen sie die drei Orte WASSER, FELS und TEMPEL — zusammen ergeben sie den Pfad quer durch die Karte zum verborgenen Tempel. Die Codeknacker-Phase ist der Kern der Minimal-Variante — sie ersetzt die Stations-Rotation der Standard-Variante.
EDIT 4: Wow-Schatzsuche-Codes auf gleiche Logik (Z.731 + 732 + 734)

LOCATION: Wow-Variante, game-rules "🗺️ Schatzsuche-Quest: Verborgener Tempel" — Station 2, Station 3 und Station 5 (mehrdeutige bzw. inkonsistente Lösungen). Lösungswort wird auf TEMPEL (6 Buchstaben, konsistent zur Minimal-Logik) korrigiert.

ALTER BLOCK:

html
        <br><strong>Station 2 (Foto-Test):</strong> 4 Tier-Ausschnitte (Auge, Streifen, Stoßzahn, Mähne). Aufgabe: <em>"Aus welchen Tieren stammen sie? Das Tier, dessen Ausschnitt am unklarsten ist, gibt euch den Buchstaben."</em> Antwort: das Tier dessen Auge gezeigt wird, ist nicht eindeutig (gehört z.B. zu mehreren) → <strong>E</strong> für "Eindeutigkeit" oder konkret der Anfangsbuchstabe der finalen Tier-Auflösung.
        <br><strong>Station 3 (Spuren-Test):</strong> 5 verschiedene Fährten, vier davon passen zusammen (alle laufende Tiere), eine nicht (Kriechspur). Aufgabe: <em>"Welche Fährte stammt nicht von einem laufenden Tier? Ihr Buchstabe ist eurer."</em> Antwort: Schlangen-Kriechspur → <strong>M</strong> (für "Mamba" als Beispiel).
        <br><strong>Station 4 (Pirsch-Test):</strong> Crew-Aufgabe. Eine 6-Meter-Strecke mit 5 raschelnden Hindernissen. Wenn alle Team-Mitglieder die Strecke ohne Geräusch schaffen, gibt's den Buchstaben <strong>P</strong> (für "Pirsch"). Bei Geräusch: 1 Versuch übrig.
        <br><strong>Station 5 (Tempel-Schloss-Test):</strong> Aus den 4 gesammelten Buchstaben + einem versteckten 5. Buchstaben in der Reservat-Karte (Hinweis: <em>"Schaut nochmal auf die Karte — Tempel beginnt mit einem Buchstaben, der noch fehlt."</em>) ergibt sich <strong>E</strong> → Lösungswort <strong>TEMPL</strong> (oder analog je nach Setup). Wenn die Kinder das Wort entschlüsselt haben, kommt das letzte Rätsel: <em>"Wo im Reservat-Camp steht der Tempel? Sucht den Ort mit demselben Anfangsbuchstaben wie das Lösungswort."</em> → Tempel-Versteck z.B. unter dem TV (T), in der Treppe, hinterm Tisch.

NEUER BLOCK:

html
        <br><strong>Station 2 (Foto-Test) → Buchstabe E:</strong> 4 Tier-Ausschnitte. Aufgabe: <em>"Bestimmt die vier Tiere und legt die Foto-Karten alphabetisch nach Tiernamen. Der Anfangsbuchstabe des ersten Tiers ist euer Buchstabe."</em> Tiere: <strong>E</strong>lefant, <strong>L</strong>öwe, <strong>S</strong>trauß, <strong>Z</strong>ebra. Alphabetisch zuerst: Elefant → <strong>E</strong>. (Eindeutig, weil alphabetisch nur eine Reihenfolge zulässt.)
        <br><strong>Station 3 (Spuren-Test) → Buchstabe M:</strong> 5 Fährten, vier von laufenden Tieren, eine von einem kriechenden. Aufgabe: <em>"Welche Fährte stammt von einem Tier ohne Beine? Der Anfangsbuchstabe dieses Tiers ist eurer."</em> Die Kriech-Spur gehört zur <strong>M</strong>amba (auf der Fährten-Karte ist sie genau so beschriftet, kein Raten) → <strong>M</strong>.
        <br><strong>Station 4 (Pirsch-Test) → Buchstabe P:</strong> Crew-Aufgabe. Eine 6-Meter-Strecke mit 5 raschelnden Hindernissen. Schafft das Team sie ohne Geräusch, öffnet der Spielleiter den Umschlag mit dem Buchstaben <strong>P</strong> (für <strong>P</strong>irsch). Bei Geräusch: 1 Versuch übrig.
        <br><strong>Station 5 (Tempel-Schloss-Test) → Buchstaben T und EL:</strong> Auf der Reservat-Karte sind drei Felder mit fehlenden Buchstaben markiert. Aufgabe: <em>"Drei Buchstaben fehlen noch. Der erste steht am Ort, den der falsche Tiger bewacht (T). Die beiden letzten stehen am Tempel-Tor selbst (E, L). Setzt sie hinter eure vier Buchstaben."</em> Gesammelt: E (St.2) · M (St.3) · P (St.4) — plus T vorne und EL hinten ergibt geordnet <strong>T-E-M-P-E-L = TEMPEL</strong>. Das ist gleichzeitig der Tempel-Schlosscode. Letztes Rätsel: <em>"Der Tempel steht im Camp an einem Ort, der mit T beginnt — sucht ihn."</em> → Versteck z.B. unter dem <strong>T</strong>isch, in der <strong>T</strong>ruhe, hinter der <strong>T</strong>ür.

Konsistenz-Note: Lösungswort vereinheitlicht von inkonsistentem TEMPL (5) auf TEMPEL (6) — identisch zum Spurenleser-Quadranten in der Minimal-Variante. Der Caesar-Chiffre-Zusatz für 12-Jährige (Z.737) bleibt gültig, bezieht sich jetzt sauber auf 6 Buchstaben.

EDIT 5: "Mut zum Raten" → Selbst-Kontrolle (Z.268)

LOCATION: Minimal-Variante, Codeknacker game-rules, Zeile "Was es lehrt"

ALTER BLOCK:

html
        <br><strong>Was es lehrt:</strong> Kooperation zwischen Spezialisierungen (kein Quadrant funktioniert allein), genaues Hinschauen, Mut zum Raten.

NEUER BLOCK:

html
        <br><strong>Was es lehrt:</strong> Kooperation zwischen Spezialisierungen (kein Quadrant funktioniert allein), genaues Hinschauen und Selbst-Kontrolle: Ergibt das Lösungswort kein echtes Wort, war die Sortier-Regel falsch angewendet — dann prüfen die Kinder die Reihenfolge selbst nach, statt zu raten.

Fünf EDITs geliefert. Zwei Punkte für den Merge: (1) Der FELS-Quadrant in EDIT 2 trägt den Alphabetik-Konflikt offen — sauber gelöst ist er nur über die Pfad-/Links-rechts-Regel aus EDIT 3; im Quadranten-Text die Alphabet-Variante streichen. (2) Kein JSON-LD angefasst — die HowTo-Steps referenzieren "Codeknacker" nur generisch, kein FAQ-Mismatch entsteht. Schema bleibt valide.