// Welle C: prinzessin, meerjungfrau, weltraum — kuratierte Copy (P6-1 Rollout, 2026-06-10)
// Spiel-Fakten aus App-Strings:
// prinzessin: Juwelen berühren 3x tippen (Krone, Zauber), "Eine freche Fee schnappt sich die Krone!" → fangen ("der Ball hängt davon ab")
// meerjungfrau: Muscheln öffnen 3x tippen (Dreizack, Juwel), "Eine freche Meerjungfrau schnappt sich das Juwel!" → fangen
// weltraum: Krater erforschen 3x tippen (Rakete, Stern), "Ein freches Alien schnappt sich den Stern!" → fangen ("die Mission hängt davon ab")

module.exports = [
  {
    slug: 'prinzessin',
    emoji: '👑',
    mottoLabel: 'Prinzessinnen',
    invName: 'Prinzessinnen-Einladung',
    planerName: 'Prinzessinnen-Geburtstag',
    szName: 'Prinzessinnen-Schatzsuche',
    hasSchatzsuche: true,
    ogImage: 'og-prinzessin.png',
    otherMottosLine: 'Einhorn, Meerjungfrau, Feen &amp; mehr — jede Karte mit eigenem Mini-Spiel.',
    h1: 'Prinzessinnen-Einladung für den Kindergeburtstag',
    lead: 'Eine digitale Einladungskarte mit eingebautem Mini-Spiel: Deine Gäste sammeln verzauberte Juwelen und fangen die freche Fee — und sagen direkt per WhatsApp zu. Kostenlos, ohne Anmeldung, in 2 Minuten fertig.',
    metaDesc: 'Prinzessinnen-Einladung für den Kindergeburtstag: digital per WhatsApp, mit Mini-Spiel rund um Krone und Schloss. Kostenlos, ohne Anmeldung, in 2 Minuten fertig. Plus Einladungstexte zum Abschreiben.',
    ogDesc: 'Digitale Prinzessinnen-Einladung mit Mini-Spiel: Gäste retten die Krone und sagen direkt per WhatsApp zu. Kostenlos, ohne Anmeldung.',
    gameShort: 'Prinzessinnen-Spiel',
    gameP1: 'Die Einladung beginnt nicht mit Datum und Uhrzeit, sondern im Schloss: Deine Gäste berühren funkelnde Juwelen — drei Mal tippen, und verzauberte Schätze wie die Krone kommen zum Vorschein. Doch kurz vor dem Ziel schnappt sich eine freche Fee die Krone! Erst wer sie einfängt, rettet den königlichen Ball. Dahinter stecken die Party-Infos: wer einlädt, wann, wo.',
    gameP2: 'Das Ganze dauert eine knappe Minute und funktioniert in jedem Handy-Browser — ohne App, ohne Download. Wenn du beim Erstellen ein Foto hochlädst, gibt es eine Extra-Pointe: Dann ist es das Geburtstagskind selbst, das die Krone stibitzt und gefangen werden muss.',
    quote: 'Königliche Botschaft: Prinzessin {Name} wird {Alter} und lädt zum großen Ball ins Schloss …',
    faq: [
      { q: 'Was kostet die Prinzessinnen-Einladung?', a: 'Nichts. Die Einladung ist komplett kostenlos — keine Anmeldung, keine Kreditkarte, kein Abo.' },
      { q: 'Brauchen meine Gäste eine App?', a: 'Nein. Die Einladung ist ein normaler Link, der im Browser jedes Handys funktioniert. Nichts muss installiert werden.' },
      { q: 'Wie verschicke ich die Einladung?', a: 'Nach dem Erstellen bekommst du einen kurzen Link. Den teilst du per WhatsApp — einzeln oder in der Eltern-Gruppe. E-Mail oder andere Messenger funktionieren genauso.' },
      { q: 'Kann ich ein Foto vom Geburtstagskind einbauen?', a: 'Ja, optional. Mit Foto ist es im Spiel das Geburtstagskind selbst, das die Krone stibitzt und von den Gästen gefangen werden muss. Das Foto wird auf unserem Server gespeichert und nach 90 Tagen automatisch gelöscht.' },
      { q: 'Was passiert mit unseren Daten?', a: 'Name, Datum, Uhrzeit, Ort und WhatsApp-Nummer stecken direkt im Einladungslink — es gibt kein Konto und keine Datenbank dahinter. Nur ein optionales Foto liegt auf unserem Server und wird nach 90 Tagen automatisch gelöscht.' },
      { q: 'Kann ich die Prinzessinnen-Einladung auch ausdrucken?',
        a: 'Diese Einladung ist für WhatsApp gebaut — das Mini-Spiel funktioniert nur digital. Für Papier-Einladungen findest du bei uns fertige <a href="/einladung/prinzessin/vorlagen/" class="inline">Prinzessinnen-Einladungstexte</a> zum Abschreiben oder Selbstgestalten.',
        aPlain: 'Diese Einladung ist für WhatsApp gebaut — das Mini-Spiel funktioniert nur digital. Für Papier-Einladungen findest du bei uns fertige Prinzessinnen-Einladungstexte zum Abschreiben oder Selbstgestalten.' }
    ],
    vorlagenMetaDesc: '7 fertige Prinzessinnen-Einladungstexte für den Kindergeburtstag: kurz, lang, gereimt, für WhatsApp, Kita und Last-Minute. Zum Kopieren mit einem Klick — plus Checkliste, was in jede Einladung gehört.',
    vorlagenOgDesc: 'Fertige Prinzessinnen-Einladungstexte für den Kindergeburtstag: kurz, lang, gereimt, für WhatsApp und Kita. Kostenlos kopieren.',
    ctaBoxText: 'Statt Text zum Abschreiben: eine digitale Prinzessinnen-Einladung, in der deine Gäste die Krone retten — und direkt per WhatsApp zusagen. Kostenlos, ohne Anmeldung.',
    vorlagen: [
      { h: 'Kurz & klassisch', meta: 'Für Papier-Einladungen und alle, die es schnörkellos mögen.',
        text: `Königliche Botschaft: Prinzessin {Name} wird {Alter} und lädt zum großen Ball ins Schloss …

Wir feiern am {Datum} um {Uhrzeit} in {Ort}.

Sag uns bis zum {Zusage-Datum} Bescheid, ob du dabei bist: {Telefon}

Wir freuen uns auf dich!` },
      { h: 'Ausführlich — mit allen Infos für die Eltern', meta: 'Wenn du Abholzeit, Kleidung und Besonderheiten gleich mitklären willst.',
        text: `Hört, hört — eine königliche Einladung!

{Name} wird {Alter} Jahre alt und lädt dich herzlich zum Prinzessinnen-Geburtstag ein.

🗓 Wann: {Datum}, {Uhrzeit}
📍 Wo: {Ort}
👑 Was dich erwartet: Schatzsuche im Schloss, königliche Spiele und Kuchen

Für die Eltern:
– Abholung um {Abholzeit}
– Festliche oder bequeme Kleidung — beides ist richtig
– Krönchen und Kleider sind willkommen, aber kein Muss

Bitte gebt uns bis zum {Zusage-Datum} Bescheid, ob euer Kind dabei ist: {Telefon}

Wir freuen uns auf eine glanzvolle Festgesellschaft!
{Name der Eltern}` },
      { h: 'Gereimt', meta: 'Für alle, die es verspielt mögen — funktioniert auf Papier und im Messenger.',
        text: `Die Krone funkelt, das Schloss ist bereit,
herbei, herbei, es ist soweit!
{Name} wird {Alter} — welch ein Fest,
das Schloss lädt ein die liebsten Gäst'!

Am {Datum} um {Uhrzeit} öffnet sich das Tor,
in {Ort} — der Ball steht kurz bevor!

Sag bis zum {Zusage-Datum} Bescheid, ob du zum Ball erscheinst:
{Telefon}` },
      { h: 'WhatsApp-Version', meta: 'Kurz, mit Emojis — direkt in die Eltern-Gruppe oder als Einzelnachricht.',
        text: `👑✨ KÖNIGLICHE EINLADUNG ✨👑

{Name} wird {Alter} und feiert Prinzessinnen-Geburtstag! 🎂

🗓 {Datum}
⏰ {Uhrzeit}
📍 {Ort}

Es gibt eine Schloss-Schatzsuche, königliche Spiele und natürlich Kuchen. 🏰

Ist dein Kind dabei? Sag uns einfach kurz hier per WhatsApp Bescheid — am besten bis zum {Zusage-Datum}. 🙏` },
      { h: 'Für Kita oder Schule', meta: 'Neutraler Ton, richtet sich an die Eltern — gut zum Verteilen in der Gruppe.',
        text: `Liebe Eltern,

unser Sohn/unsere Tochter {Name} feiert am {Datum} seinen/ihren {Alter}. Geburtstag mit einer Prinzessinnen-Party und möchte gern {Kind-Name} dazu einladen.

Wir feiern um {Uhrzeit} in {Ort}. Geplant sind eine Schatzsuche, Spiele und Kuchen — festliche Kleidung ist schön, aber kein Muss.

Über eine kurze Rückmeldung bis zum {Zusage-Datum} freuen wir uns: {Telefon}

Herzliche Grüße
{Name der Eltern}` },
      { h: 'Last-Minute', meta: 'Wenn die Einladung kurzfristig raus muss — ehrlich und charmant.',
        text: `Eilige Botschaft aus dem Schloss! 📜

{Name} feiert schon am {Datum} Prinzessinnen-Geburtstag ({Uhrzeit}, {Ort}) — und auf der Gästeliste ist noch ein Ehrenplatz frei!

Kannst du dabei sein? Gib uns einfach schnell per WhatsApp Bescheid: {Telefon}

Je eher, desto besser — der Ball beginnt pünktlich! 👑` },
      { h: 'Mit Ball-Aufruf', meta: 'Wenn die Party vom Festsaal lebt — macht aus Gästen eine Hofgesellschaft.',
        text: `Gesucht: Die festlichste Hofgesellschaft des Königreichs! 🏰

Prinzessin {Name} wird {Alter} und lädt zum großen Geburtstagsball:

🗓 {Datum}, {Uhrzeit}
📍 {Ort}

Kommt so festlich, wie ihr mögt — Kleid, Krönchen, Ritterhemd oder einfach Lieblingsoutfit, am Hof ist jede und jeder willkommen! Wer kein Kostüm hat, bekommt vor Ort ein Krönchen gebastelt.

Meldet euch bis zum {Zusage-Datum} bei uns: {Telefon}` }
    ]
  },

  {
    slug: 'meerjungfrau',
    emoji: '🧜‍♀️',
    mottoLabel: 'Meerjungfrau',
    invName: 'Meerjungfrau-Einladung',
    planerName: 'Meerjungfrau-Geburtstag',
    szName: 'Meerjungfrau-Schatzsuche',
    hasSchatzsuche: true,
    ogImage: 'og-meerjungfrau.png',
    otherMottosLine: 'Einhorn, Prinzessin, Piraten &amp; mehr — jede Karte mit eigenem Mini-Spiel.',
    h1: 'Meerjungfrau-Einladung für den Kindergeburtstag',
    lead: 'Eine digitale Einladungskarte mit eingebautem Mini-Spiel: Deine Gäste öffnen Muscheln tief im Ozean und fangen die freche Meerjungfrau — und sagen direkt per WhatsApp zu. Kostenlos, ohne Anmeldung, in 2 Minuten fertig.',
    metaDesc: 'Meerjungfrau-Einladung für den Kindergeburtstag: digital per WhatsApp, mit Mini-Spiel als Tauchgang zu den Meeresschätzen. Kostenlos, ohne Anmeldung, in 2 Minuten fertig. Plus Einladungstexte zum Abschreiben.',
    ogDesc: 'Digitale Meerjungfrau-Einladung mit Mini-Spiel: Gäste tauchen nach Meeresschätzen und sagen direkt per WhatsApp zu. Kostenlos, ohne Anmeldung.',
    gameShort: 'Meerjungfrau-Spiel',
    gameP1: 'Die Einladung beginnt nicht mit Datum und Uhrzeit, sondern tief im Ozean: Deine Gäste öffnen schimmernde Muscheln — drei Mal tippen, und Meeresschätze wie Dreizack und Juwel kommen zum Vorschein. Doch kurz vor dem Ziel schnappt sich eine freche Meerjungfrau das Juwel! Erst wer sie einfängt, rettet die Meeresschätze. Dahinter stecken die Party-Infos: wer einlädt, wann, wo.',
    gameP2: 'Das Ganze dauert eine knappe Minute und funktioniert in jedem Handy-Browser — ohne App, ohne Download. Wenn du beim Erstellen ein Foto hochlädst, gibt es eine Extra-Pointe: Dann ist es das Geburtstagskind selbst, das das Juwel stibitzt und gefangen werden muss.',
    quote: 'Flaschenpost aus der Tiefe: Meerjungfrau {Name} wird {Alter} und lädt in ihr Unterwasserreich ein …',
    faq: [
      { q: 'Was kostet die Meerjungfrau-Einladung?', a: 'Nichts. Die Einladung ist komplett kostenlos — keine Anmeldung, keine Kreditkarte, kein Abo.' },
      { q: 'Brauchen meine Gäste eine App?', a: 'Nein. Die Einladung ist ein normaler Link, der im Browser jedes Handys funktioniert. Nichts muss installiert werden.' },
      { q: 'Wie verschicke ich die Einladung?', a: 'Nach dem Erstellen bekommst du einen kurzen Link. Den teilst du per WhatsApp — einzeln oder in der Eltern-Gruppe. E-Mail oder andere Messenger funktionieren genauso.' },
      { q: 'Kann ich ein Foto vom Geburtstagskind einbauen?', a: 'Ja, optional. Mit Foto ist es im Spiel das Geburtstagskind selbst, das das Juwel stibitzt und von den Gästen gefangen werden muss. Das Foto wird auf unserem Server gespeichert und nach 90 Tagen automatisch gelöscht.' },
      { q: 'Was passiert mit unseren Daten?', a: 'Name, Datum, Uhrzeit, Ort und WhatsApp-Nummer stecken direkt im Einladungslink — es gibt kein Konto und keine Datenbank dahinter. Nur ein optionales Foto liegt auf unserem Server und wird nach 90 Tagen automatisch gelöscht.' },
      { q: 'Kann ich die Meerjungfrau-Einladung auch ausdrucken?',
        a: 'Diese Einladung ist für WhatsApp gebaut — das Mini-Spiel funktioniert nur digital. Für Papier-Einladungen findest du bei uns fertige <a href="/einladung/meerjungfrau/vorlagen/" class="inline">Meerjungfrau-Einladungstexte</a> zum Abschreiben oder Selbstgestalten.',
        aPlain: 'Diese Einladung ist für WhatsApp gebaut — das Mini-Spiel funktioniert nur digital. Für Papier-Einladungen findest du bei uns fertige Meerjungfrau-Einladungstexte zum Abschreiben oder Selbstgestalten.' }
    ],
    vorlagenMetaDesc: '7 fertige Meerjungfrau-Einladungstexte für den Kindergeburtstag: kurz, lang, gereimt, für WhatsApp, Kita und Last-Minute. Zum Kopieren mit einem Klick — plus Checkliste, was in jede Einladung gehört.',
    vorlagenOgDesc: 'Fertige Meerjungfrau-Einladungstexte für den Kindergeburtstag: kurz, lang, gereimt, für WhatsApp und Kita. Kostenlos kopieren.',
    ctaBoxText: 'Statt Text zum Abschreiben: eine digitale Meerjungfrau-Einladung, in der deine Gäste nach Meeresschätzen tauchen — und direkt per WhatsApp zusagen. Kostenlos, ohne Anmeldung.',
    vorlagen: [
      { h: 'Kurz & klassisch', meta: 'Für Papier-Einladungen und alle, die es schnörkellos mögen.',
        text: `Flaschenpost aus der Tiefe: Meerjungfrau {Name} wird {Alter} und lädt in ihr Unterwasserreich ein …

Wir feiern am {Datum} um {Uhrzeit} in {Ort}.

Sag uns bis zum {Zusage-Datum} Bescheid, ob du dabei bist: {Telefon}

Wir freuen uns auf dich!` },
      { h: 'Ausführlich — mit allen Infos für die Eltern', meta: 'Wenn du Abholzeit, Kleidung und Besonderheiten gleich mitklären willst.',
        text: `Eine Flaschenpost für dich!

{Name} wird {Alter} Jahre alt und lädt dich herzlich zum Meerjungfrau-Geburtstag ein.

🗓 Wann: {Datum}, {Uhrzeit}
📍 Wo: {Ort}
🧜‍♀️ Was dich erwartet: Unterwasser-Schatzsuche, Muschel-Spiele und Kuchen

Für die Eltern:
– Abholung um {Abholzeit}
– Kleidung, die Glitzer verträgt — und ggf. Wechselsachen bei Wasserspielen
– Meerjungfrauen-Outfit ist willkommen, aber kein Muss

Bitte gebt uns bis zum {Zusage-Datum} Bescheid, ob euer Kind dabei ist: {Telefon}

Wir freuen uns auf glitzernden Unterwasser-Besuch!
{Name der Eltern}` },
      { h: 'Gereimt', meta: 'Für alle, die es verspielt mögen — funktioniert auf Papier und im Messenger.',
        text: `Tief unten, wo die Wellen rauschen,
kannst du den Muscheln heimlich lauschen:
{Name} wird {Alter} — komm doch mit,
ins Meer hinab, Schritt für Schritt!

Am {Datum} um {Uhrzeit} ruft das weite Meer,
in {Ort} — wir freuen uns so sehr!

Sag bis zum {Zusage-Datum} Bescheid, ob du mittauchst:
{Telefon}` },
      { h: 'WhatsApp-Version', meta: 'Kurz, mit Emojis — direkt in die Eltern-Gruppe oder als Einzelnachricht.',
        text: `🌊🧜‍♀️ FLASCHENPOST! 🧜‍♀️🌊

{Name} wird {Alter} und feiert Meerjungfrau-Geburtstag! 🎂

🗓 {Datum}
⏰ {Uhrzeit}
📍 {Ort}

Es gibt eine Unterwasser-Schatzsuche, Muschel-Spiele und natürlich Kuchen. 🐚

Ist dein Kind dabei? Sag uns einfach kurz hier per WhatsApp Bescheid — am besten bis zum {Zusage-Datum}. 🙏` },
      { h: 'Für Kita oder Schule', meta: 'Neutraler Ton, richtet sich an die Eltern — gut zum Verteilen in der Gruppe.',
        text: `Liebe Eltern,

unser Sohn/unsere Tochter {Name} feiert am {Datum} seinen/ihren {Alter}. Geburtstag mit einer Meerjungfrau-Party und möchte gern {Kind-Name} dazu einladen.

Wir feiern um {Uhrzeit} in {Ort}. Geplant sind eine Schatzsuche, Spiele und Kuchen — bitte geben Sie Ihrem Kind Kleidung mit, die Glitzer verträgt.

Über eine kurze Rückmeldung bis zum {Zusage-Datum} freuen wir uns: {Telefon}

Herzliche Grüße
{Name der Eltern}` },
      { h: 'Last-Minute', meta: 'Wenn die Einladung kurzfristig raus muss — ehrlich und charmant.',
        text: `🌊 Eilige Flaschenpost! 🍾

{Name} feiert schon am {Datum} Meerjungfrau-Geburtstag ({Uhrzeit}, {Ort}) — und im Unterwasserreich ist noch ein Platz frei!

Kannst du dabei sein? Gib uns einfach schnell per WhatsApp Bescheid: {Telefon}

Je eher, desto besser — die Flut wartet nicht! 🧜‍♀️` },
      { h: 'Mit Unterwasser-Aufruf', meta: 'Wenn die Party vom Ozean-Flair lebt — macht aus Gästen ein Meeresvolk.',
        text: `Gesucht: Das schillerndste Meeresvolk der sieben Ozeane! 🐠

Meerjungfrau {Name} wird {Alter} und ruft zur großen Unterwasser-Feier:

🗓 {Datum}, {Uhrzeit}
📍 {Ort}

Kommt so schillernd, wie ihr mögt — Meerjungfrauen-Flosse, Glitzershirt oder Blau-Grün-Look, alles zählt! Wer nichts hat, bekommt vor Ort eine Muschelkette und gehört trotzdem zum Meeresvolk.

Meldet euch bis zum {Zusage-Datum} bei uns: {Telefon}` }
    ]
  },

  {
    slug: 'weltraum',
    emoji: '🚀',
    mottoLabel: 'Weltraum',
    invName: 'Weltraum-Einladung',
    planerName: 'Weltraum-Geburtstag',
    szName: 'Weltraum-Schatzsuche',
    hasSchatzsuche: true,
    ogImage: 'og-weltraum.png',
    otherMottosLine: 'Piraten, Superheld, Detektiv &amp; mehr — jede Karte mit eigenem Mini-Spiel.',
    h1: 'Weltraum-Einladung für den Kindergeburtstag',
    lead: 'Eine digitale Einladungskarte mit eingebautem Mini-Spiel: Deine Gäste erforschen Krater auf einem fremden Planeten und fangen das freche Alien — und sagen direkt per WhatsApp zu. Kostenlos, ohne Anmeldung, in 2 Minuten fertig.',
    metaDesc: 'Weltraum-Einladung für den Kindergeburtstag: digital per WhatsApp, mit Mini-Spiel als Weltraum-Expedition. Kostenlos, ohne Anmeldung, in 2 Minuten fertig. Plus Einladungstexte zum Abschreiben.',
    ogDesc: 'Digitale Weltraum-Einladung mit Mini-Spiel: Gäste retten die Mission und sagen direkt per WhatsApp zu. Kostenlos, ohne Anmeldung.',
    gameShort: 'Weltraum-Spiel',
    gameP1: 'Die Einladung beginnt nicht mit Datum und Uhrzeit, sondern auf einem fremden Planeten: Deine Gäste erforschen Krater — drei Mal tippen, und Entdeckungen wie eine Rakete und ein leuchtender Stern kommen zum Vorschein. Doch kurz vor dem Ziel schnappt sich ein freches Alien den Stern! Erst wer es einfängt, rettet die Mission. Dahinter stecken die Party-Infos: wer einlädt, wann, wo.',
    gameP2: 'Das Ganze dauert eine knappe Minute und funktioniert in jedem Handy-Browser — ohne App, ohne Download. Wenn du beim Erstellen ein Foto hochlädst, gibt es eine Extra-Pointe: Dann ist es das Geburtstagskind selbst, das den Stern stibitzt und gefangen werden muss.',
    quote: '3, 2, 1 — Liftoff! Astronaut:in {Name} wird {Alter} und sucht eine Crew für die nächste Mission …',
    faq: [
      { q: 'Was kostet die Weltraum-Einladung?', a: 'Nichts. Die Einladung ist komplett kostenlos — keine Anmeldung, keine Kreditkarte, kein Abo.' },
      { q: 'Brauchen meine Gäste eine App?', a: 'Nein. Die Einladung ist ein normaler Link, der im Browser jedes Handys funktioniert. Nichts muss installiert werden.' },
      { q: 'Wie verschicke ich die Einladung?', a: 'Nach dem Erstellen bekommst du einen kurzen Link. Den teilst du per WhatsApp — einzeln oder in der Eltern-Gruppe. E-Mail oder andere Messenger funktionieren genauso.' },
      { q: 'Kann ich ein Foto vom Geburtstagskind einbauen?', a: 'Ja, optional. Mit Foto ist es im Spiel das Geburtstagskind selbst, das den Stern stibitzt und von den Gästen gefangen werden muss. Das Foto wird auf unserem Server gespeichert und nach 90 Tagen automatisch gelöscht.' },
      { q: 'Was passiert mit unseren Daten?', a: 'Name, Datum, Uhrzeit, Ort und WhatsApp-Nummer stecken direkt im Einladungslink — es gibt kein Konto und keine Datenbank dahinter. Nur ein optionales Foto liegt auf unserem Server und wird nach 90 Tagen automatisch gelöscht.' },
      { q: 'Kann ich die Weltraum-Einladung auch ausdrucken?',
        a: 'Diese Einladung ist für WhatsApp gebaut — das Mini-Spiel funktioniert nur digital. Für Papier-Einladungen findest du bei uns fertige <a href="/einladung/weltraum/vorlagen/" class="inline">Weltraum-Einladungstexte</a> zum Abschreiben oder Selbstgestalten.',
        aPlain: 'Diese Einladung ist für WhatsApp gebaut — das Mini-Spiel funktioniert nur digital. Für Papier-Einladungen findest du bei uns fertige Weltraum-Einladungstexte zum Abschreiben oder Selbstgestalten.' }
    ],
    vorlagenMetaDesc: '7 fertige Weltraum-Einladungstexte für den Kindergeburtstag: kurz, lang, gereimt, für WhatsApp, Kita und Last-Minute. Zum Kopieren mit einem Klick — plus Checkliste, was in jede Einladung gehört.',
    vorlagenOgDesc: 'Fertige Weltraum-Einladungstexte für den Kindergeburtstag: kurz, lang, gereimt, für WhatsApp und Kita. Kostenlos kopieren.',
    ctaBoxText: 'Statt Text zum Abschreiben: eine digitale Weltraum-Einladung, in der deine Gäste die Mission retten — und direkt per WhatsApp zusagen. Kostenlos, ohne Anmeldung.',
    vorlagen: [
      { h: 'Kurz & klassisch', meta: 'Für Papier-Einladungen und alle, die es schnörkellos mögen.',
        text: `3, 2, 1 — Liftoff! Astronaut:in {Name} wird {Alter} und sucht eine Crew für die nächste Mission …

Wir starten am {Datum} um {Uhrzeit} in {Ort}.

Sag uns bis zum {Zusage-Datum} Bescheid, ob du dabei bist: {Telefon}

Wir freuen uns auf dich!` },
      { h: 'Ausführlich — mit allen Infos für die Eltern', meta: 'Wenn du Abholzeit, Kleidung und Besonderheiten gleich mitklären willst.',
        text: `Funkspruch von der Raumstation!

{Name} wird {Alter} Jahre alt und lädt dich herzlich zum Weltraum-Geburtstag ein.

🗓 Wann: {Datum}, {Uhrzeit}
📍 Wo (Startrampe): {Ort}
🚀 Was dich erwartet: Weltraum-Schatzsuche, Astronauten-Training und Kuchen

Für die Eltern:
– Abholung (Landung) um {Abholzeit}
– Bequeme Kleidung fürs Astronauten-Training
– Alien- oder Astronauten-Look gern gesehen, aber kein Muss

Bitte gebt uns bis zum {Zusage-Datum} Bescheid, ob euer Kind dabei ist: {Telefon}

Wir freuen uns auf eine mutige Raumfahrt-Crew!
{Name der Eltern}` },
      { h: 'Gereimt', meta: 'Für alle, die es verspielt mögen — funktioniert auf Papier und im Messenger.',
        text: `Die Rakete dampft, die Triebwerke glühen,
gleich siehst du tausend Sterne sprühen!
{Name} wird {Alter} — steig mit ein,
zum schönsten Fest im Sternenschein!

Am {Datum} um {Uhrzeit} zünden wir die Stufen,
in {Ort} — wo Spiele, Spaß und Kuchen rufen!

Sag bis zum {Zusage-Datum} Bescheid, ob du mitfliegst:
{Telefon}` },
      { h: 'WhatsApp-Version', meta: 'Kurz, mit Emojis — direkt in die Eltern-Gruppe oder als Einzelnachricht.',
        text: `🚀 3, 2, 1 — LIFTOFF! 🚀

{Name} wird {Alter} und feiert Weltraum-Geburtstag! 🎂

🗓 {Datum}
⏰ {Uhrzeit}
📍 {Ort}

Es gibt eine Weltraum-Schatzsuche, Astronauten-Training und natürlich Kuchen. 🪐

Ist dein Kind dabei? Sag uns einfach kurz hier per WhatsApp Bescheid — am besten bis zum {Zusage-Datum}. 🙏` },
      { h: 'Für Kita oder Schule', meta: 'Neutraler Ton, richtet sich an die Eltern — gut zum Verteilen in der Gruppe.',
        text: `Liebe Eltern,

unser Sohn/unsere Tochter {Name} feiert am {Datum} seinen/ihren {Alter}. Geburtstag mit einer Weltraum-Party und möchte gern {Kind-Name} dazu einladen.

Wir feiern um {Uhrzeit} in {Ort}. Geplant sind eine Schatzsuche, Bewegungsspiele und Kuchen — bequeme Kleidung reicht völlig aus.

Über eine kurze Rückmeldung bis zum {Zusage-Datum} freuen wir uns: {Telefon}

Herzliche Grüße
{Name der Eltern}` },
      { h: 'Last-Minute', meta: 'Wenn die Einladung kurzfristig raus muss — ehrlich und charmant.',
        text: `Dringender Funkspruch! 📡

{Name} feiert schon am {Datum} Weltraum-Geburtstag ({Uhrzeit}, {Ort}) — und in der Rakete ist noch ein Sitz frei!

Kannst du dabei sein? Gib uns einfach schnell per WhatsApp Bescheid: {Telefon}

Je eher, desto besser — das Startfenster schließt sich! 🚀` },
      { h: 'Mit Crew-Aufruf', meta: 'Wenn die Party von der Mission lebt — macht aus Gästen eine Raumfahrt-Crew.',
        text: `Missionsbefehl aus der Raumzentrale! 🪐

Astronaut:in {Name} wird {Alter} und stellt eine neue Mission zusammen:

🗓 {Datum}, {Uhrzeit}
📍 Startrampe: {Ort}

Deine Mission: fremde Planeten erkunden, Sterne sammeln und sicher zur Erde zurückkehren. Astronauten- oder Alien-Look gern gesehen — wer nichts hat, bekommt vor Ort einen Crew-Ausweis und fliegt trotzdem mit.

Meldet euch bis zum {Zusage-Datum} bei uns: {Telefon}` }
    ]
  }
];
