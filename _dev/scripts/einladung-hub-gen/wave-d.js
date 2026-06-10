// Welle D: baustelle, dschungel, feen, pferde, ritter — kuratierte Copy (P6-1 Rollout, 2026-06-10)
// Spiel-Fakten aus App-Strings:
// baustelle: Schutt wegbuddeln 3x tippen (Bagger, Helm), "Ein frecher Bagger-Frechdachs buddelt überall!" → fangen; Foto: "{Name} ist mit dem Bagger losgefahren!"
// dschungel: Lianen durchsuchen 3x tippen (Frosch, Schlange), "Ein frecher Affe klaut die Kamera!" → fangen, "Expedition geschafft!"
// feen: Wiese erforschen 3x tippen (Blume, Zauberstaub), "Eine freche Fee schnappt sich den Zauberstab!" → fangen
// pferde: Im Stroh suchen 3x tippen (Pferd, Karotte), "Ein freches Pony schnappt sich das Hufeisen!" → fangen, "Reiterhof geschafft!"
// ritter: Truhen öffnen 3x tippen (Schwert, Schild), "Ein frecher Drache klaut das Schild!" → fangen ("die Burg braucht dich!")
// Schatzsuche-Seiten existieren für dschungel + feen, NICHT für baustelle/pferde/ritter.

module.exports = [
  {
    slug: 'baustelle',
    emoji: '🚧',
    mottoLabel: 'Baustellen',
    invName: 'Baustellen-Einladung',
    planerName: 'Baustellen-Geburtstag',
    szName: '',
    hasSchatzsuche: false,
    ogImage: 'og-baustelle.png',
    otherMottosLine: 'Feuerwehr, Piraten, Dino &amp; mehr — jede Karte mit eigenem Mini-Spiel.',
    h1: 'Baustellen-Einladung für den Kindergeburtstag',
    lead: 'Eine digitale Einladungskarte mit eingebautem Mini-Spiel: Deine Gäste buddeln Werkzeuge frei und stoppen den frechen Bagger-Frechdachs — und sagen direkt per WhatsApp zu. Kostenlos, ohne Anmeldung, in 2 Minuten fertig.',
    metaDesc: 'Baustellen-Einladung für den Kindergeburtstag: digital per WhatsApp, mit Mini-Spiel auf der Baustelle. Kostenlos, ohne Anmeldung, in 2 Minuten fertig. Plus Einladungstexte zum Abschreiben.',
    ogDesc: 'Digitale Baustellen-Einladung mit Mini-Spiel: Gäste fangen den Bagger-Frechdachs und sagen direkt per WhatsApp zu. Kostenlos, ohne Anmeldung.',
    gameShort: 'Baustellen-Spiel',
    gameP1: 'Die Einladung beginnt nicht mit Datum und Uhrzeit, sondern auf der Baustelle: Deine Gäste buddeln den Schutt weg — drei Mal tippen, und Fundstücke wie Bagger und Bauhelm kommen zum Vorschein. Doch kurz vor dem Ziel taucht ein frecher Bagger-Frechdachs auf und buddelt überall dazwischen! Erst wer ihn fängt, schließt die Schicht ab. Dahinter stecken die Party-Infos: wer einlädt, wann, wo.',
    gameP2: 'Das Ganze dauert eine knappe Minute und funktioniert in jedem Handy-Browser — ohne App, ohne Download. Wenn du beim Erstellen ein Foto hochlädst, gibt es eine Extra-Pointe: Dann ist es das Geburtstagskind selbst, das mit dem Bagger losfährt und gestoppt werden muss.',
    quote: 'Achtung, Baustelle! Polier {Name} wird {Alter} und sucht eine starke Bau-Crew für das nächste Großprojekt …',
    faq: [
      { q: 'Was kostet die Baustellen-Einladung?', a: 'Nichts. Die Einladung ist komplett kostenlos — keine Anmeldung, keine Kreditkarte, kein Abo.' },
      { q: 'Brauchen meine Gäste eine App?', a: 'Nein. Die Einladung ist ein normaler Link, der im Browser jedes Handys funktioniert. Nichts muss installiert werden.' },
      { q: 'Wie verschicke ich die Einladung?', a: 'Nach dem Erstellen bekommst du einen kurzen Link. Den teilst du per WhatsApp — einzeln oder in der Eltern-Gruppe. E-Mail oder andere Messenger funktionieren genauso.' },
      { q: 'Kann ich ein Foto vom Geburtstagskind einbauen?', a: 'Ja, optional. Mit Foto ist es im Spiel das Geburtstagskind selbst, das mit dem Bagger losfährt und von den Gästen gestoppt werden muss. Das Foto wird auf unserem Server gespeichert und nach 90 Tagen automatisch gelöscht.' },
      { q: 'Was passiert mit unseren Daten?', a: 'Name, Datum, Uhrzeit, Ort und WhatsApp-Nummer stecken direkt im Einladungslink — es gibt kein Konto und keine Datenbank dahinter. Nur ein optionales Foto liegt auf unserem Server und wird nach 90 Tagen automatisch gelöscht.' },
      { q: 'Kann ich die Baustellen-Einladung auch ausdrucken?',
        a: 'Diese Einladung ist für WhatsApp gebaut — das Mini-Spiel funktioniert nur digital. Für Papier-Einladungen findest du bei uns fertige <a href="/einladung/baustelle/vorlagen/" class="inline">Baustellen-Einladungstexte</a> zum Abschreiben oder Selbstgestalten.',
        aPlain: 'Diese Einladung ist für WhatsApp gebaut — das Mini-Spiel funktioniert nur digital. Für Papier-Einladungen findest du bei uns fertige Baustellen-Einladungstexte zum Abschreiben oder Selbstgestalten.' }
    ],
    vorlagenMetaDesc: '7 fertige Baustellen-Einladungstexte für den Kindergeburtstag: kurz, lang, gereimt, für WhatsApp, Kita und Last-Minute. Zum Kopieren mit einem Klick — plus Checkliste, was in jede Einladung gehört.',
    vorlagenOgDesc: 'Fertige Baustellen-Einladungstexte für den Kindergeburtstag: kurz, lang, gereimt, für WhatsApp und Kita. Kostenlos kopieren.',
    ctaBoxText: 'Statt Text zum Abschreiben: eine digitale Baustellen-Einladung, in der deine Gäste den Bagger-Frechdachs stoppen — und direkt per WhatsApp zusagen. Kostenlos, ohne Anmeldung.',
    vorlagen: [
      { h: 'Kurz & klassisch', meta: 'Für Papier-Einladungen und alle, die es schnörkellos mögen.',
        text: `Achtung, Baustelle! Polier {Name} wird {Alter} und sucht eine starke Bau-Crew für das nächste Großprojekt …

Wir feiern am {Datum} um {Uhrzeit} in {Ort}.

Sag uns bis zum {Zusage-Datum} Bescheid, ob du dabei bist: {Telefon}

Wir freuen uns auf dich!` },
      { h: 'Ausführlich — mit allen Infos für die Eltern', meta: 'Wenn du Abholzeit, Kleidung und Besonderheiten gleich mitklären willst.',
        text: `Baustellen-Freigabe erteilt!

{Name} wird {Alter} Jahre alt und lädt dich herzlich zum Baustellen-Geburtstag ein.

🗓 Wann: {Datum}, {Uhrzeit}
📍 Wo: {Ort}
🚧 Was dich erwartet: Buddel-Spiele, Bau-Stationen und Kuchen

Für die Eltern:
– Abholung um {Abholzeit} (Schichtende)
– Kleidung, die richtig schmutzig werden darf — hier wird gebuddelt!
– Bauhelm oder Warnweste gern gesehen, aber kein Muss

Bitte gebt uns bis zum {Zusage-Datum} Bescheid, ob euer Kind dabei ist: {Telefon}

Wir freuen uns auf eine fleißige Bau-Crew!
{Name der Eltern}` },
      { h: 'Gereimt', meta: 'Für alle, die es verspielt mögen — funktioniert auf Papier und im Messenger.',
        text: `Der Bagger rollt, der Kran dreht sich,
die Baustelle wartet schon auf dich!
{Name} wird {Alter} — zieh Stiefel an,
auf unsrer Baustelle bist du dran!

Am {Datum} um {Uhrzeit} beginnt die Schicht,
in {Ort} — und ohne dich geht's nicht!

Sag bis zum {Zusage-Datum} Bescheid, ob du mitbaust:
{Telefon}` },
      { h: 'WhatsApp-Version', meta: 'Kurz, mit Emojis — direkt in die Eltern-Gruppe oder als Einzelnachricht.',
        text: `🚧 ACHTUNG, BAUSTELLE! 🚧

{Name} wird {Alter} und feiert Baustellen-Geburtstag! 🎂

🗓 {Datum}
⏰ {Uhrzeit}
📍 {Ort}

Es gibt Buddel-Spiele, Bau-Stationen und natürlich Kuchen. 🏗️

Ist dein Kind dabei? Sag uns einfach kurz hier per WhatsApp Bescheid — am besten bis zum {Zusage-Datum}. 🙏` },
      { h: 'Für Kita oder Schule', meta: 'Neutraler Ton, richtet sich an die Eltern — gut zum Verteilen in der Gruppe.',
        text: `Liebe Eltern,

unser Sohn/unsere Tochter {Name} feiert am {Datum} seinen/ihren {Alter}. Geburtstag mit einer Baustellen-Party und möchte gern {Kind-Name} dazu einladen.

Wir feiern um {Uhrzeit} in {Ort}. Geplant sind Buddel- und Bau-Spiele und Kuchen — bitte geben Sie Ihrem Kind unbedingt Kleidung mit, die schmutzig werden darf.

Über eine kurze Rückmeldung bis zum {Zusage-Datum} freuen wir uns: {Telefon}

Herzliche Grüße
{Name der Eltern}` },
      { h: 'Last-Minute', meta: 'Wenn die Einladung kurzfristig raus muss — ehrlich und charmant.',
        text: `Eil-Durchsage von der Baustelle! 📢

{Name} feiert schon am {Datum} Baustellen-Geburtstag ({Uhrzeit}, {Ort}) — und in der Bau-Crew ist noch ein Helm frei!

Kannst du dabei sein? Gib uns einfach schnell per WhatsApp Bescheid: {Telefon}

Je eher, desto besser — der Beton wird sonst hart! 🚧` },
      { h: 'Mit Bau-Crew-Aufruf', meta: 'Wenn die Party vom Anpacken lebt — macht aus Gästen eine Bau-Crew.',
        text: `Gesucht: Die stärkste Bau-Crew der Stadt! 🏗️

Polier {Name} wird {Alter} und eröffnet eine neue Großbaustelle:

🗓 {Datum}, {Uhrzeit}
📍 {Ort}

Deine Mission: buddeln, bauen, stapeln und am Ende das Richtfest feiern. Warnweste, Bauhelm oder Arbeitshandschuhe gern gesehen — wer nichts hat, bekommt vor Ort einen Bauauftrag und gehört trotzdem zur Crew.

Meldet euch bis zum {Zusage-Datum} bei uns: {Telefon}` }
    ]
  },

  {
    slug: 'dschungel',
    emoji: '🌴',
    mottoLabel: 'Dschungel',
    invName: 'Dschungel-Einladung',
    planerName: 'Dschungel-Geburtstag',
    szName: 'Dschungel-Schatzsuche',
    hasSchatzsuche: true,
    ogImage: 'og-home.png',
    otherMottosLine: 'Safari, Dino, Piraten &amp; mehr — jede Karte mit eigenem Mini-Spiel.',
    h1: 'Dschungel-Einladung für den Kindergeburtstag',
    lead: 'Eine digitale Einladungskarte mit eingebautem Mini-Spiel: Deine Gäste durchsuchen die Lianen und schnappen den frechen Affen — und sagen direkt per WhatsApp zu. Kostenlos, ohne Anmeldung, in 2 Minuten fertig.',
    metaDesc: 'Dschungel-Einladung für den Kindergeburtstag: digital per WhatsApp, mit Mini-Spiel als Dschungel-Expedition. Kostenlos, ohne Anmeldung, in 2 Minuten fertig. Plus Einladungstexte zum Abschreiben.',
    ogDesc: 'Digitale Dschungel-Einladung mit Mini-Spiel: Gäste retten die Expedition und sagen direkt per WhatsApp zu. Kostenlos, ohne Anmeldung.',
    gameShort: 'Dschungel-Spiel',
    gameP1: 'Die Einladung beginnt nicht mit Datum und Uhrzeit, sondern tief im Dschungel: Deine Gäste durchsuchen die Lianen — drei Mal tippen, und versteckte Tiere wie Frosch und Schlange tauchen auf. Doch kurz vor dem Ziel klaut ein frecher Affe die Kamera! Erst wer ihn fängt, schafft die Expedition. Dahinter stecken die Party-Infos: wer einlädt, wann, wo.',
    gameP2: 'Das Ganze dauert eine knappe Minute und funktioniert in jedem Handy-Browser — ohne App, ohne Download. Wenn du beim Erstellen ein Foto hochlädst, gibt es eine Extra-Pointe: Dann ist es das Geburtstagskind selbst, das sich mit der Kamera ins Dickicht schlägt und geschnappt werden muss.',
    quote: 'Die Trommeln rufen: Entdecker:in {Name} wird {Alter} und startet eine Expedition tief in den Dschungel …',
    faq: [
      { q: 'Was kostet die Dschungel-Einladung?', a: 'Nichts. Die Einladung ist komplett kostenlos — keine Anmeldung, keine Kreditkarte, kein Abo.' },
      { q: 'Brauchen meine Gäste eine App?', a: 'Nein. Die Einladung ist ein normaler Link, der im Browser jedes Handys funktioniert. Nichts muss installiert werden.' },
      { q: 'Wie verschicke ich die Einladung?', a: 'Nach dem Erstellen bekommst du einen kurzen Link. Den teilst du per WhatsApp — einzeln oder in der Eltern-Gruppe. E-Mail oder andere Messenger funktionieren genauso.' },
      { q: 'Kann ich ein Foto vom Geburtstagskind einbauen?', a: 'Ja, optional. Mit Foto ist es im Spiel das Geburtstagskind selbst, das sich mit der Kamera ins Dickicht schlägt und von den Gästen geschnappt werden muss. Das Foto wird auf unserem Server gespeichert und nach 90 Tagen automatisch gelöscht.' },
      { q: 'Was passiert mit unseren Daten?', a: 'Name, Datum, Uhrzeit, Ort und WhatsApp-Nummer stecken direkt im Einladungslink — es gibt kein Konto und keine Datenbank dahinter. Nur ein optionales Foto liegt auf unserem Server und wird nach 90 Tagen automatisch gelöscht.' },
      { q: 'Kann ich die Dschungel-Einladung auch ausdrucken?',
        a: 'Diese Einladung ist für WhatsApp gebaut — das Mini-Spiel funktioniert nur digital. Für Papier-Einladungen findest du bei uns fertige <a href="/einladung/dschungel/vorlagen/" class="inline">Dschungel-Einladungstexte</a> zum Abschreiben oder Selbstgestalten.',
        aPlain: 'Diese Einladung ist für WhatsApp gebaut — das Mini-Spiel funktioniert nur digital. Für Papier-Einladungen findest du bei uns fertige Dschungel-Einladungstexte zum Abschreiben oder Selbstgestalten.' }
    ],
    vorlagenMetaDesc: '7 fertige Dschungel-Einladungstexte für den Kindergeburtstag: kurz, lang, gereimt, für WhatsApp, Kita und Last-Minute. Zum Kopieren mit einem Klick — plus Checkliste, was in jede Einladung gehört.',
    vorlagenOgDesc: 'Fertige Dschungel-Einladungstexte für den Kindergeburtstag: kurz, lang, gereimt, für WhatsApp und Kita. Kostenlos kopieren.',
    ctaBoxText: 'Statt Text zum Abschreiben: eine digitale Dschungel-Einladung, in der deine Gäste den frechen Affen schnappen — und direkt per WhatsApp zusagen. Kostenlos, ohne Anmeldung.',
    vorlagen: [
      { h: 'Kurz & klassisch', meta: 'Für Papier-Einladungen und alle, die es schnörkellos mögen.',
        text: `Die Trommeln rufen: Entdecker:in {Name} wird {Alter} und startet eine Expedition tief in den Dschungel …

Wir feiern am {Datum} um {Uhrzeit} in {Ort}.

Sag uns bis zum {Zusage-Datum} Bescheid, ob du dabei bist: {Telefon}

Wir freuen uns auf dich!` },
      { h: 'Ausführlich — mit allen Infos für die Eltern', meta: 'Wenn du Abholzeit, Kleidung und Besonderheiten gleich mitklären willst.',
        text: `Willkommen im Dschungelcamp!

{Name} wird {Alter} Jahre alt und lädt dich herzlich zum Dschungel-Geburtstag ein.

🗓 Wann: {Datum}, {Uhrzeit}
📍 Wo: {Ort}
🌴 Was dich erwartet: Dschungel-Schatzsuche, Dschungel-Spiele und Kuchen

Für die Eltern:
– Abholung um {Abholzeit}
– Bequeme Kleidung, die schmutzig werden darf (wir sind auch draußen)
– Verkleidung als Dschungeltier ist willkommen, aber kein Muss

Bitte gebt uns bis zum {Zusage-Datum} Bescheid, ob euer Kind dabei ist: {Telefon}

Wir freuen uns auf eine wilde Expeditions-Truppe!
{Name der Eltern}` },
      { h: 'Gereimt', meta: 'Für alle, die es verspielt mögen — funktioniert auf Papier und im Messenger.',
        text: `Die Lianen schwingen hin und her,
ein Brüllen hallt durchs Blättermeer!
{Name} wird {Alter} — sei bereit,
zur wilden Dschungel-Geburtstagszeit!

Am {Datum} um {Uhrzeit} geht's ins Grüne rein,
in {Ort} wird das Abenteuer sein!

Sag bis zum {Zusage-Datum} Bescheid, ob du mitkommst:
{Telefon}` },
      { h: 'WhatsApp-Version', meta: 'Kurz, mit Emojis — direkt in die Eltern-Gruppe oder als Einzelnachricht.',
        text: `🌴 DSCHUNGEL-ALARM! 🌴

{Name} wird {Alter} und feiert Dschungel-Geburtstag! 🎂

🗓 {Datum}
⏰ {Uhrzeit}
📍 {Ort}

Es gibt eine Dschungel-Schatzsuche, Dschungel-Spiele und natürlich Kuchen. 🐒

Ist dein Kind dabei? Sag uns einfach kurz hier per WhatsApp Bescheid — am besten bis zum {Zusage-Datum}. 🙏` },
      { h: 'Für Kita oder Schule', meta: 'Neutraler Ton, richtet sich an die Eltern — gut zum Verteilen in der Gruppe.',
        text: `Liebe Eltern,

unser Sohn/unsere Tochter {Name} feiert am {Datum} seinen/ihren {Alter}. Geburtstag mit einer Dschungel-Party und möchte gern {Kind-Name} dazu einladen.

Wir feiern um {Uhrzeit} in {Ort}. Geplant sind eine Schatzsuche, Spiele und Kuchen — bitte geben Sie Ihrem Kind Kleidung mit, die schmutzig werden darf.

Über eine kurze Rückmeldung bis zum {Zusage-Datum} freuen wir uns: {Telefon}

Herzliche Grüße
{Name der Eltern}` },
      { h: 'Last-Minute', meta: 'Wenn die Einladung kurzfristig raus muss — ehrlich und charmant.',
        text: `Trommel-Eilmeldung aus dem Dschungel! 🥁

{Name} feiert schon am {Datum} Dschungel-Geburtstag ({Uhrzeit}, {Ort}) — und in der Expedition ist noch ein Platz frei!

Kannst du dabei sein? Gib uns einfach schnell per WhatsApp Bescheid: {Telefon}

Je eher, desto besser — der Dschungel ruft! 🐒` },
      { h: 'Mit Expeditions-Aufruf', meta: 'Wenn die Party vom Abenteuer lebt — macht aus Gästen eine Expeditions-Truppe.',
        text: `Gesucht: Die wildeste Expeditions-Truppe des Regenwalds! 🐍

Entdecker:in {Name} wird {Alter} und bricht auf ins Dickicht:

🗓 {Datum}, {Uhrzeit}
📍 Basislager: {Ort}

Deine Mission: Tiere aufspüren, Lianen überwinden und den Dschungel-Schatz finden. Safari-Hut, Tier-Kostüm oder grünes Shirt gern gesehen — wer nichts hat, bekommt vor Ort eine Expeditions-Aufgabe und gehört trotzdem zur Truppe.

Meldet euch bis zum {Zusage-Datum} bei uns: {Telefon}` }
    ]
  },

  {
    slug: 'feen',
    emoji: '🧚',
    mottoLabel: 'Feen',
    invName: 'Feen-Einladung',
    planerName: 'Feen-Geburtstag',
    szName: 'Feen-Schatzsuche',
    hasSchatzsuche: true,
    ogImage: 'og-home.png',
    otherMottosLine: 'Einhorn, Prinzessin, Meerjungfrau &amp; mehr — jede Karte mit eigenem Mini-Spiel.',
    h1: 'Feen-Einladung für den Kindergeburtstag',
    lead: 'Eine digitale Einladungskarte mit eingebautem Mini-Spiel: Deine Gäste erforschen die Zauberwiese und fangen die freche Fee — und sagen direkt per WhatsApp zu. Kostenlos, ohne Anmeldung, in 2 Minuten fertig.',
    metaDesc: 'Feen-Einladung für den Kindergeburtstag: digital per WhatsApp, mit Mini-Spiel auf der Zauberwiese. Kostenlos, ohne Anmeldung, in 2 Minuten fertig. Plus Einladungstexte zum Abschreiben.',
    ogDesc: 'Digitale Feen-Einladung mit Mini-Spiel: Gäste retten den Feen-Zauber und sagen direkt per WhatsApp zu. Kostenlos, ohne Anmeldung.',
    gameShort: 'Feen-Spiel',
    gameP1: 'Die Einladung beginnt nicht mit Datum und Uhrzeit, sondern auf einer Zauberwiese: Deine Gäste erforschen die Wiese — drei Mal tippen, und magische Schätze wie Blume und Zauberstaub kommen zum Vorschein. Doch kurz vor dem Ziel schnappt sich eine freche Fee den Zauberstab! Erst wer sie einfängt, rettet den Zauber. Dahinter stecken die Party-Infos: wer einlädt, wann, wo.',
    gameP2: 'Das Ganze dauert eine knappe Minute und funktioniert in jedem Handy-Browser — ohne App, ohne Download. Wenn du beim Erstellen ein Foto hochlädst, gibt es eine Extra-Pointe: Dann ist es das Geburtstagskind selbst, das den Zauberstab stibitzt und gefangen werden muss.',
    quote: 'Feenstaub-Post: {Name} wird {Alter} und lädt dich auf die Zauberwiese ein …',
    faq: [
      { q: 'Was kostet die Feen-Einladung?', a: 'Nichts. Die Einladung ist komplett kostenlos — keine Anmeldung, keine Kreditkarte, kein Abo.' },
      { q: 'Brauchen meine Gäste eine App?', a: 'Nein. Die Einladung ist ein normaler Link, der im Browser jedes Handys funktioniert. Nichts muss installiert werden.' },
      { q: 'Wie verschicke ich die Einladung?', a: 'Nach dem Erstellen bekommst du einen kurzen Link. Den teilst du per WhatsApp — einzeln oder in der Eltern-Gruppe. E-Mail oder andere Messenger funktionieren genauso.' },
      { q: 'Kann ich ein Foto vom Geburtstagskind einbauen?', a: 'Ja, optional. Mit Foto ist es im Spiel das Geburtstagskind selbst, das den Zauberstab stibitzt und von den Gästen gefangen werden muss. Das Foto wird auf unserem Server gespeichert und nach 90 Tagen automatisch gelöscht.' },
      { q: 'Was passiert mit unseren Daten?', a: 'Name, Datum, Uhrzeit, Ort und WhatsApp-Nummer stecken direkt im Einladungslink — es gibt kein Konto und keine Datenbank dahinter. Nur ein optionales Foto liegt auf unserem Server und wird nach 90 Tagen automatisch gelöscht.' },
      { q: 'Kann ich die Feen-Einladung auch ausdrucken?',
        a: 'Diese Einladung ist für WhatsApp gebaut — das Mini-Spiel funktioniert nur digital. Für Papier-Einladungen findest du bei uns fertige <a href="/einladung/feen/vorlagen/" class="inline">Feen-Einladungstexte</a> zum Abschreiben oder Selbstgestalten.',
        aPlain: 'Diese Einladung ist für WhatsApp gebaut — das Mini-Spiel funktioniert nur digital. Für Papier-Einladungen findest du bei uns fertige Feen-Einladungstexte zum Abschreiben oder Selbstgestalten.' }
    ],
    vorlagenMetaDesc: '7 fertige Feen-Einladungstexte für den Kindergeburtstag: kurz, lang, gereimt, für WhatsApp, Kita und Last-Minute. Zum Kopieren mit einem Klick — plus Checkliste, was in jede Einladung gehört.',
    vorlagenOgDesc: 'Fertige Feen-Einladungstexte für den Kindergeburtstag: kurz, lang, gereimt, für WhatsApp und Kita. Kostenlos kopieren.',
    ctaBoxText: 'Statt Text zum Abschreiben: eine digitale Feen-Einladung, in der deine Gäste den Feen-Zauber retten — und direkt per WhatsApp zusagen. Kostenlos, ohne Anmeldung.',
    vorlagen: [
      { h: 'Kurz & klassisch', meta: 'Für Papier-Einladungen und alle, die es schnörkellos mögen.',
        text: `Feenstaub-Post: {Name} wird {Alter} und lädt dich auf die Zauberwiese ein …

Wir feiern am {Datum} um {Uhrzeit} in {Ort}.

Sag uns bis zum {Zusage-Datum} Bescheid, ob du dabei bist: {Telefon}

Wir freuen uns auf dich!` },
      { h: 'Ausführlich — mit allen Infos für die Eltern', meta: 'Wenn du Abholzeit, Kleidung und Besonderheiten gleich mitklären willst.',
        text: `Eine Prise Feenstaub für dich!

{Name} wird {Alter} Jahre alt und lädt dich herzlich zum Feen-Geburtstag ein.

🗓 Wann: {Datum}, {Uhrzeit}
📍 Wo: {Ort}
🧚 Was dich erwartet: Feen-Schatzsuche, Zauber-Spiele und Kuchen

Für die Eltern:
– Abholung um {Abholzeit}
– Kleidung, in der man über die Wiese toben kann
– Flügel und Tüllrock sind willkommen, aber kein Muss

Bitte gebt uns bis zum {Zusage-Datum} Bescheid, ob euer Kind dabei ist: {Telefon}

Wir freuen uns auf zauberhaften Besuch!
{Name der Eltern}` },
      { h: 'Gereimt', meta: 'Für alle, die es verspielt mögen — funktioniert auf Papier und im Messenger.',
        text: `Auf leisen Flügeln, still und sacht,
hat dir die Fee dies hergebracht:
{Name} wird {Alter} — flieg herbei,
zur Zauberwiesen-Feierei!

Am {Datum} um {Uhrzeit} beginnt der Zauberreigen,
in {Ort} wird sich die Feenwelt dir zeigen!

Sag bis zum {Zusage-Datum} Bescheid, ob du dabei bist:
{Telefon}` },
      { h: 'WhatsApp-Version', meta: 'Kurz, mit Emojis — direkt in die Eltern-Gruppe oder als Einzelnachricht.',
        text: `🧚✨ FEENSTAUB-POST! ✨🧚

{Name} wird {Alter} und feiert Feen-Geburtstag! 🎂

🗓 {Datum}
⏰ {Uhrzeit}
📍 {Ort}

Es gibt eine Feen-Schatzsuche, Zauber-Spiele und natürlich Kuchen. 🌸

Ist dein Kind dabei? Sag uns einfach kurz hier per WhatsApp Bescheid — am besten bis zum {Zusage-Datum}. 🙏` },
      { h: 'Für Kita oder Schule', meta: 'Neutraler Ton, richtet sich an die Eltern — gut zum Verteilen in der Gruppe.',
        text: `Liebe Eltern,

unser Sohn/unsere Tochter {Name} feiert am {Datum} seinen/ihren {Alter}. Geburtstag mit einer Feen-Party und möchte gern {Kind-Name} dazu einladen.

Wir feiern um {Uhrzeit} in {Ort}. Geplant sind eine Schatzsuche, Spiele und Kuchen — bitte geben Sie Ihrem Kind Kleidung mit, in der es draußen toben kann.

Über eine kurze Rückmeldung bis zum {Zusage-Datum} freuen wir uns: {Telefon}

Herzliche Grüße
{Name der Eltern}` },
      { h: 'Last-Minute', meta: 'Wenn die Einladung kurzfristig raus muss — ehrlich und charmant.',
        text: `✨ Feen-Eilpost! ✨

{Name} feiert schon am {Datum} Feen-Geburtstag ({Uhrzeit}, {Ort}) — und auf der Zauberwiese ist noch ein Platz frei!

Kannst du dabei sein? Gib uns einfach schnell per WhatsApp Bescheid: {Telefon}

Je eher, desto besser — der Feenstaub verfliegt! 🧚`},
      { h: 'Mit Zauber-Aufruf', meta: 'Wenn die Party vom Zauber lebt — macht aus Gästen ein Feenvolk.',
        text: `Gesucht: Das zauberhafteste Feenvolk der Wiese! 🌷

{Name} wird {Alter} und ruft alle Feen und Elfen zusammen:

🗓 {Datum}, {Uhrzeit}
📍 {Ort}

Kommt so verzaubert, wie ihr mögt — Flügel, Blumenkranz oder Lieblings-Glitzershirt, alles zählt! Wer nichts hat, bekommt vor Ort Feenstaub und gehört trotzdem zum Feenvolk.

Meldet euch bis zum {Zusage-Datum} bei uns: {Telefon}` }
    ]
  },

  {
    slug: 'pferde',
    emoji: '🐴',
    mottoLabel: 'Pferde',
    invName: 'Pferde-Einladung',
    planerName: 'Pferde-Geburtstag',
    szName: '',
    hasSchatzsuche: false,
    ogImage: 'og-pferde.png',
    otherMottosLine: 'Einhorn, Prinzessin, Safari &amp; mehr — jede Karte mit eigenem Mini-Spiel.',
    h1: 'Pferde-Einladung für den Kindergeburtstag',
    lead: 'Eine digitale Einladungskarte mit eingebautem Mini-Spiel: Deine Gäste suchen im Stroh nach Schätzen und fangen das freche Pony — und sagen direkt per WhatsApp zu. Kostenlos, ohne Anmeldung, in 2 Minuten fertig.',
    metaDesc: 'Pferde-Einladung für den Kindergeburtstag: digital per WhatsApp, mit Mini-Spiel auf dem Reiterhof. Kostenlos, ohne Anmeldung, in 2 Minuten fertig. Plus Einladungstexte zum Abschreiben.',
    ogDesc: 'Digitale Pferde-Einladung mit Mini-Spiel: Gäste fangen das freche Pony und sagen direkt per WhatsApp zu. Kostenlos, ohne Anmeldung.',
    gameShort: 'Pferde-Spiel',
    gameP1: 'Die Einladung beginnt nicht mit Datum und Uhrzeit, sondern auf dem Reiterhof: Deine Gäste suchen im Stroh — drei Mal tippen, und Fundstücke wie ein Pferd und eine Karotte kommen zum Vorschein. Doch kurz vor dem Ziel schnappt sich ein freches Pony das Hufeisen! Erst wer es einfängt, rettet den Reiterhof. Dahinter stecken die Party-Infos: wer einlädt, wann, wo.',
    gameP2: 'Das Ganze dauert eine knappe Minute und funktioniert in jedem Handy-Browser — ohne App, ohne Download. Wenn du beim Erstellen ein Foto hochlädst, gibt es eine Extra-Pointe: Dann ist es das Geburtstagskind selbst, das das Hufeisen stibitzt und gefangen werden muss.',
    quote: 'Hufgetrappel! Stallchef:in {Name} wird {Alter} und lädt auf den Reiterhof ein …',
    faq: [
      { q: 'Was kostet die Pferde-Einladung?', a: 'Nichts. Die Einladung ist komplett kostenlos — keine Anmeldung, keine Kreditkarte, kein Abo.' },
      { q: 'Brauchen meine Gäste eine App?', a: 'Nein. Die Einladung ist ein normaler Link, der im Browser jedes Handys funktioniert. Nichts muss installiert werden.' },
      { q: 'Wie verschicke ich die Einladung?', a: 'Nach dem Erstellen bekommst du einen kurzen Link. Den teilst du per WhatsApp — einzeln oder in der Eltern-Gruppe. E-Mail oder andere Messenger funktionieren genauso.' },
      { q: 'Kann ich ein Foto vom Geburtstagskind einbauen?', a: 'Ja, optional. Mit Foto ist es im Spiel das Geburtstagskind selbst, das das Hufeisen stibitzt und von den Gästen gefangen werden muss. Das Foto wird auf unserem Server gespeichert und nach 90 Tagen automatisch gelöscht.' },
      { q: 'Was passiert mit unseren Daten?', a: 'Name, Datum, Uhrzeit, Ort und WhatsApp-Nummer stecken direkt im Einladungslink — es gibt kein Konto und keine Datenbank dahinter. Nur ein optionales Foto liegt auf unserem Server und wird nach 90 Tagen automatisch gelöscht.' },
      { q: 'Kann ich die Pferde-Einladung auch ausdrucken?',
        a: 'Diese Einladung ist für WhatsApp gebaut — das Mini-Spiel funktioniert nur digital. Für Papier-Einladungen findest du bei uns fertige <a href="/einladung/pferde/vorlagen/" class="inline">Pferde-Einladungstexte</a> zum Abschreiben oder Selbstgestalten.',
        aPlain: 'Diese Einladung ist für WhatsApp gebaut — das Mini-Spiel funktioniert nur digital. Für Papier-Einladungen findest du bei uns fertige Pferde-Einladungstexte zum Abschreiben oder Selbstgestalten.' }
    ],
    vorlagenMetaDesc: '7 fertige Pferde-Einladungstexte für den Kindergeburtstag: kurz, lang, gereimt, für WhatsApp, Kita und Last-Minute. Zum Kopieren mit einem Klick — plus Checkliste, was in jede Einladung gehört.',
    vorlagenOgDesc: 'Fertige Pferde-Einladungstexte für den Kindergeburtstag: kurz, lang, gereimt, für WhatsApp und Kita. Kostenlos kopieren.',
    ctaBoxText: 'Statt Text zum Abschreiben: eine digitale Pferde-Einladung, in der deine Gäste das freche Pony fangen — und direkt per WhatsApp zusagen. Kostenlos, ohne Anmeldung.',
    vorlagen: [
      { h: 'Kurz & klassisch', meta: 'Für Papier-Einladungen und alle, die es schnörkellos mögen.',
        text: `Hufgetrappel! Stallchef:in {Name} wird {Alter} und lädt auf den Reiterhof ein …

Wir feiern am {Datum} um {Uhrzeit} in {Ort}.

Sag uns bis zum {Zusage-Datum} Bescheid, ob du dabei bist: {Telefon}

Wir freuen uns auf dich!` },
      { h: 'Ausführlich — mit allen Infos für die Eltern', meta: 'Wenn du Abholzeit, Kleidung und Besonderheiten gleich mitklären willst.',
        text: `Die Stalltür steht offen!

{Name} wird {Alter} Jahre alt und lädt dich herzlich zum Pferde-Geburtstag ein.

🗓 Wann: {Datum}, {Uhrzeit}
📍 Wo: {Ort}
🐴 Was dich erwartet: Reiterhof-Spiele, Hufeisen-Suche und Kuchen

Für die Eltern:
– Abholung um {Abholzeit}
– Bequeme Kleidung, die Stroh und Matsch verträgt
– Reiterhose oder Pferde-Shirt gern gesehen, aber kein Muss

Bitte gebt uns bis zum {Zusage-Datum} Bescheid, ob euer Kind dabei ist: {Telefon}

Wir freuen uns auf eine fröhliche Stall-Truppe!
{Name der Eltern}` },
      { h: 'Gereimt', meta: 'Für alle, die es verspielt mögen — funktioniert auf Papier und im Messenger.',
        text: `Es klappern Hufe, hört doch nur,
ein Pony trabt schon auf der Spur!
{Name} wird {Alter} — sattle auf,
der Geburtstag nimmt jetzt seinen Lauf!

Am {Datum} um {Uhrzeit} steht das Stalltor weit,
in {Ort} — mach dich fürs Hoffest bereit!

Sag bis zum {Zusage-Datum} Bescheid, ob du dabei bist:
{Telefon}` },
      { h: 'WhatsApp-Version', meta: 'Kurz, mit Emojis — direkt in die Eltern-Gruppe oder als Einzelnachricht.',
        text: `🐴 HUFGETRAPPEL! 🐴

{Name} wird {Alter} und feiert Pferde-Geburtstag! 🎂

🗓 {Datum}
⏰ {Uhrzeit}
📍 {Ort}

Es gibt Reiterhof-Spiele, eine Hufeisen-Suche und natürlich Kuchen. 🥕

Ist dein Kind dabei? Sag uns einfach kurz hier per WhatsApp Bescheid — am besten bis zum {Zusage-Datum}. 🙏` },
      { h: 'Für Kita oder Schule', meta: 'Neutraler Ton, richtet sich an die Eltern — gut zum Verteilen in der Gruppe.',
        text: `Liebe Eltern,

unser Sohn/unsere Tochter {Name} feiert am {Datum} seinen/ihren {Alter}. Geburtstag mit einer Pferde-Party und möchte gern {Kind-Name} dazu einladen.

Wir feiern um {Uhrzeit} in {Ort}. Geplant sind Reiterhof-Spiele, eine Hufeisen-Suche und Kuchen — bitte geben Sie Ihrem Kind Kleidung mit, die schmutzig werden darf.

Über eine kurze Rückmeldung bis zum {Zusage-Datum} freuen wir uns: {Telefon}

Herzliche Grüße
{Name der Eltern}` },
      { h: 'Last-Minute', meta: 'Wenn die Einladung kurzfristig raus muss — ehrlich und charmant.',
        text: `Eil-Botschaft vom Reiterhof! 🏇

{Name} feiert schon am {Datum} Pferde-Geburtstag ({Uhrzeit}, {Ort}) — und im Stall ist noch eine Box frei!

Kannst du dabei sein? Gib uns einfach schnell per WhatsApp Bescheid: {Telefon}

Je eher, desto besser — die Ponys scharren schon! 🐴` },
      { h: 'Mit Reiterhof-Aufruf', meta: 'Wenn die Party vom Hof-Flair lebt — macht aus Gästen eine Stall-Truppe.',
        text: `Gesucht: Die beste Stall-Truppe weit und breit! 🥕

Stallchef:in {Name} wird {Alter} und sucht Verstärkung auf dem Reiterhof:

🗓 {Datum}, {Uhrzeit}
📍 {Ort}

Deine Mission: Ponys striegeln, Hufeisen suchen und das große Hof-Turnier gewinnen. Reiterhose, Pferde-Shirt oder Gummistiefel gern gesehen — wer nichts hat, bekommt vor Ort eine Stallaufgabe und gehört trotzdem zur Truppe.

Meldet euch bis zum {Zusage-Datum} bei uns: {Telefon}` }
    ]
  },

  {
    slug: 'ritter',
    emoji: '⚔️',
    mottoLabel: 'Ritter',
    invName: 'Ritter-Einladung',
    planerName: 'Ritter-Geburtstag',
    szName: '',
    hasSchatzsuche: false,
    ogImage: 'og-ritter.png',
    otherMottosLine: 'Piraten, Detektiv, Superheld &amp; mehr — jede Karte mit eigenem Mini-Spiel.',
    h1: 'Ritter-Einladung für den Kindergeburtstag',
    lead: 'Eine digitale Einladungskarte mit eingebautem Mini-Spiel: Deine Gäste öffnen Schatztruhen in der Burg und bändigen den frechen Drachen — und sagen direkt per WhatsApp zu. Kostenlos, ohne Anmeldung, in 2 Minuten fertig.',
    metaDesc: 'Ritter-Einladung für den Kindergeburtstag: digital per WhatsApp, mit Mini-Spiel in der Ritterburg. Kostenlos, ohne Anmeldung, in 2 Minuten fertig. Plus Einladungstexte zum Abschreiben.',
    ogDesc: 'Digitale Ritter-Einladung mit Mini-Spiel: Gäste bändigen den Drachen und sagen direkt per WhatsApp zu. Kostenlos, ohne Anmeldung.',
    gameShort: 'Ritter-Spiel',
    gameP1: 'Die Einladung beginnt nicht mit Datum und Uhrzeit, sondern in einer Burg: Deine Gäste öffnen schwere Truhen — drei Mal tippen, und Ritter-Ausrüstung wie Schwert und Schild kommt zum Vorschein. Doch kurz vor dem Ziel klaut ein frecher Drache das Schild! Erst wer ihn fängt, rettet die Burg. Dahinter stecken die Party-Infos: wer einlädt, wann, wo.',
    gameP2: 'Das Ganze dauert eine knappe Minute und funktioniert in jedem Handy-Browser — ohne App, ohne Download. Wenn du beim Erstellen ein Foto hochlädst, gibt es eine Extra-Pointe: Dann ist es das Geburtstagskind selbst, das das Schild klaut und gestellt werden muss.',
    quote: 'Hört, hört! Ritter:in {Name} wird {Alter} und ruft zum großen Burgfest …',
    faq: [
      { q: 'Was kostet die Ritter-Einladung?', a: 'Nichts. Die Einladung ist komplett kostenlos — keine Anmeldung, keine Kreditkarte, kein Abo.' },
      { q: 'Brauchen meine Gäste eine App?', a: 'Nein. Die Einladung ist ein normaler Link, der im Browser jedes Handys funktioniert. Nichts muss installiert werden.' },
      { q: 'Wie verschicke ich die Einladung?', a: 'Nach dem Erstellen bekommst du einen kurzen Link. Den teilst du per WhatsApp — einzeln oder in der Eltern-Gruppe. E-Mail oder andere Messenger funktionieren genauso.' },
      { q: 'Kann ich ein Foto vom Geburtstagskind einbauen?', a: 'Ja, optional. Mit Foto ist es im Spiel das Geburtstagskind selbst, das das Schild klaut und von den Gästen gestellt werden muss. Das Foto wird auf unserem Server gespeichert und nach 90 Tagen automatisch gelöscht.' },
      { q: 'Was passiert mit unseren Daten?', a: 'Name, Datum, Uhrzeit, Ort und WhatsApp-Nummer stecken direkt im Einladungslink — es gibt kein Konto und keine Datenbank dahinter. Nur ein optionales Foto liegt auf unserem Server und wird nach 90 Tagen automatisch gelöscht.' },
      { q: 'Kann ich die Ritter-Einladung auch ausdrucken?',
        a: 'Diese Einladung ist für WhatsApp gebaut — das Mini-Spiel funktioniert nur digital. Für Papier-Einladungen findest du bei uns fertige <a href="/einladung/ritter/vorlagen/" class="inline">Ritter-Einladungstexte</a> zum Abschreiben oder Selbstgestalten.',
        aPlain: 'Diese Einladung ist für WhatsApp gebaut — das Mini-Spiel funktioniert nur digital. Für Papier-Einladungen findest du bei uns fertige Ritter-Einladungstexte zum Abschreiben oder Selbstgestalten.' }
    ],
    vorlagenMetaDesc: '7 fertige Ritter-Einladungstexte für den Kindergeburtstag: kurz, lang, gereimt, für WhatsApp, Kita und Last-Minute. Zum Kopieren mit einem Klick — plus Checkliste, was in jede Einladung gehört.',
    vorlagenOgDesc: 'Fertige Ritter-Einladungstexte für den Kindergeburtstag: kurz, lang, gereimt, für WhatsApp und Kita. Kostenlos kopieren.',
    ctaBoxText: 'Statt Text zum Abschreiben: eine digitale Ritter-Einladung, in der deine Gäste den Drachen bändigen — und direkt per WhatsApp zusagen. Kostenlos, ohne Anmeldung.',
    vorlagen: [
      { h: 'Kurz & klassisch', meta: 'Für Papier-Einladungen und alle, die es schnörkellos mögen.',
        text: `Hört, hört! Ritter:in {Name} wird {Alter} und ruft zum großen Burgfest …

Wir feiern am {Datum} um {Uhrzeit} in {Ort}.

Sag uns bis zum {Zusage-Datum} Bescheid, ob du dabei bist: {Telefon}

Wir freuen uns auf dich!` },
      { h: 'Ausführlich — mit allen Infos für die Eltern', meta: 'Wenn du Abholzeit, Kleidung und Besonderheiten gleich mitklären willst.',
        text: `Die Zugbrücke ist unten!

{Name} wird {Alter} Jahre alt und lädt dich herzlich zum Ritter-Geburtstag ein.

🗓 Wann: {Datum}, {Uhrzeit}
📍 Wo (Burg): {Ort}
⚔️ Was dich erwartet: Ritterprüfung, Drachen-Spiele und Kuchen

Für die Eltern:
– Abholung um {Abholzeit}
– Bequeme Kleidung, die Action verträgt (Ritterprüfung!)
– Ritter-Kostüm oder Umhang gern gesehen, aber kein Muss

Bitte gebt uns bis zum {Zusage-Datum} Bescheid, ob euer Kind dabei ist: {Telefon}

Wir freuen uns auf eine tapfere Ritterrunde!
{Name der Eltern}` },
      { h: 'Gereimt', meta: 'Für alle, die es verspielt mögen — funktioniert auf Papier und im Messenger.',
        text: `Die Fanfaren schallen über Land,
ein Bote reitet, Brief in Hand:
{Name} wird {Alter} — drum komm herbei,
beim Burgfest bist auch du dabei!

Am {Datum} um {Uhrzeit} fällt die Zugbrück' nieder,
in {Ort} erklingen Ritterlieder!

Sag bis zum {Zusage-Datum} Bescheid, ob du zur Tafelrunde stößt:
{Telefon}` },
      { h: 'WhatsApp-Version', meta: 'Kurz, mit Emojis — direkt in die Eltern-Gruppe oder als Einzelnachricht.',
        text: `⚔️🛡️ HÖRT, HÖRT! 🛡️⚔️

{Name} wird {Alter} und feiert Ritter-Geburtstag! 🎂

🗓 {Datum}
⏰ {Uhrzeit}
📍 {Ort}

Es gibt eine Ritterprüfung, Drachen-Spiele und natürlich Kuchen. 🏰

Ist dein Kind dabei? Sag uns einfach kurz hier per WhatsApp Bescheid — am besten bis zum {Zusage-Datum}. 🙏` },
      { h: 'Für Kita oder Schule', meta: 'Neutraler Ton, richtet sich an die Eltern — gut zum Verteilen in der Gruppe.',
        text: `Liebe Eltern,

unser Sohn/unsere Tochter {Name} feiert am {Datum} seinen/ihren {Alter}. Geburtstag mit einer Ritter-Party und möchte gern {Kind-Name} dazu einladen.

Wir feiern um {Uhrzeit} in {Ort}. Geplant sind eine Ritterprüfung mit Bewegungsspielen, Drachen-Spiele und Kuchen — bitte geben Sie Ihrem Kind bequeme Kleidung mit.

Über eine kurze Rückmeldung bis zum {Zusage-Datum} freuen wir uns: {Telefon}

Herzliche Grüße
{Name der Eltern}` },
      { h: 'Last-Minute', meta: 'Wenn die Einladung kurzfristig raus muss — ehrlich und charmant.',
        text: `Eilbote von der Burg! 🏇

{Name} feiert schon am {Datum} Ritter-Geburtstag ({Uhrzeit}, {Ort}) — und an der Tafelrunde ist noch ein Platz frei!

Kannst du dabei sein? Gib uns einfach schnell per WhatsApp Bescheid: {Telefon}

Je eher, desto besser — die Zugbrücke geht bald hoch! ⚔️` },
      { h: 'Mit Ritterprüfungs-Aufruf', meta: 'Wenn die Party von der Prüfung lebt — macht aus Gästen eine Tafelrunde.',
        text: `Burgtor auf — die Ritterprüfung beginnt! 🏰

Ritter:in {Name} wird {Alter} und ruft zum großen Burgturnier:

🗓 {Datum}, {Uhrzeit}
📍 Burg: {Ort}

Deine Mission: Mut beweisen, den Drachen bändigen und den Ritterschlag verdienen. Umhang, Schwert aus Pappe oder Ritterhelm gern gesehen — wer nichts hat, bekommt vor Ort einen Knappen-Auftrag und gehört trotzdem zur Tafelrunde.

Meldet euch bis zum {Zusage-Datum} bei uns: {Telefon}` }
    ]
  }
];
