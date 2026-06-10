// Welle A: dino, einhorn, safari — kuratierte Copy (P6-1 Rollout, 2026-06-10)
// Spiel-Beschreibungen verifiziert gegen die App-Strings (siehe Session-Notes 10.06.):
// dino: Eier 3x klopfen, Baby-Dinos schlüpfen, "Das Ei bekommt Beine und will abhauen!" → einfangen; Foto: "{Name} hat das Ei geklaut!"
// einhorn: Regenbögen 3x tippen, "Ein freches Einhorn schnappt sich den Stern!" → einfangen
// safari: Büsche 3x tippen (Foto-Safari, Löwe/Elefant), "Ein frecher Affe klaut die Kamera!" → einfangen

module.exports = [
  {
    slug: 'dino',
    emoji: '🦕',
    mottoLabel: 'Dino',
    invName: 'Dino-Einladung',
    planerName: 'Dino-Geburtstag',
    szName: 'Dino-Schatzsuche',
    hasSchatzsuche: true,
    ogImage: 'og-dino.png',
    otherMottosLine: 'Piraten, Einhorn, Feuerwehr &amp; mehr — jede Karte mit eigenem Mini-Spiel.',
    h1: 'Dino-Einladung für den Kindergeburtstag',
    lead: 'Eine digitale Einladungskarte mit eingebautem Mini-Spiel: Deine Gäste helfen Baby-Dinos beim Schlüpfen — und sagen direkt per WhatsApp zu. Kostenlos, ohne Anmeldung, in 2 Minuten fertig.',
    metaDesc: 'Dino-Einladung für den Kindergeburtstag: digital per WhatsApp, mit Mini-Spiel zum Dino-Eier-Knacken. Kostenlos, ohne Anmeldung, in 2 Minuten fertig. Plus Einladungstexte zum Abschreiben.',
    ogDesc: 'Digitale Dino-Einladung mit Mini-Spiel: Gäste lassen Baby-Dinos schlüpfen und sagen direkt per WhatsApp zu. Kostenlos, ohne Anmeldung.',
    gameShort: 'Dino-Spiel',
    gameP1: 'Die Einladung beginnt nicht mit Datum und Uhrzeit, sondern im Dino-Land: Deine Gäste klopfen auf versteckte Dino-Eier — drei Mal tippen, und ein Baby-Dino schlüpft. Doch kurz vor dem Ziel bekommt eines der Eier plötzlich Beine und will abhauen! Erst wer es einfängt, hat die Mission geschafft. Dahinter stecken die Party-Infos: wer einlädt, wann, wo.',
    gameP2: 'Das Ganze dauert eine knappe Minute und funktioniert in jedem Handy-Browser — ohne App, ohne Download. Wenn du beim Erstellen ein Foto hochlädst, gibt es eine Extra-Pointe: Dann ist es das Geburtstagskind selbst, das mit dem Ei davonläuft und eingefangen werden muss.',
    quote: 'Roaaar! Forscher-Alarm: {Name} wird {Alter} und sucht mutige Dino-Forscher für eine wilde Expedition …',
    faq: [
      { q: 'Was kostet die Dino-Einladung?', a: 'Nichts. Die Einladung ist komplett kostenlos — keine Anmeldung, keine Kreditkarte, kein Abo.' },
      { q: 'Brauchen meine Gäste eine App?', a: 'Nein. Die Einladung ist ein normaler Link, der im Browser jedes Handys funktioniert. Nichts muss installiert werden.' },
      { q: 'Wie verschicke ich die Einladung?', a: 'Nach dem Erstellen bekommst du einen kurzen Link. Den teilst du per WhatsApp — einzeln oder in der Eltern-Gruppe. E-Mail oder andere Messenger funktionieren genauso.' },
      { q: 'Kann ich ein Foto vom Geburtstagskind einbauen?', a: 'Ja, optional. Mit Foto ist es im Spiel das Geburtstagskind selbst, das mit dem Dino-Ei davonläuft und von den Gästen eingefangen werden muss. Das Foto wird auf unserem Server gespeichert und nach 90 Tagen automatisch gelöscht.' },
      { q: 'Was passiert mit unseren Daten?', a: 'Name, Datum, Uhrzeit, Ort und WhatsApp-Nummer stecken direkt im Einladungslink — es gibt kein Konto und keine Datenbank dahinter. Nur ein optionales Foto liegt auf unserem Server und wird nach 90 Tagen automatisch gelöscht.' },
      { q: 'Kann ich die Dino-Einladung auch ausdrucken?',
        a: 'Diese Einladung ist für WhatsApp gebaut — das Mini-Spiel funktioniert nur digital. Für Papier-Einladungen findest du bei uns fertige <a href="/einladung/dino/vorlagen/" class="inline">Dino-Einladungstexte</a> zum Abschreiben oder Selbstgestalten.',
        aPlain: 'Diese Einladung ist für WhatsApp gebaut — das Mini-Spiel funktioniert nur digital. Für Papier-Einladungen findest du bei uns fertige Dino-Einladungstexte zum Abschreiben oder Selbstgestalten.' }
    ],
    vorlagenMetaDesc: '7 fertige Dino-Einladungstexte für den Kindergeburtstag: kurz, lang, gereimt, für WhatsApp, Kita und Last-Minute. Zum Kopieren mit einem Klick — plus Checkliste, was in jede Einladung gehört.',
    vorlagenOgDesc: 'Fertige Dino-Einladungstexte für den Kindergeburtstag: kurz, lang, gereimt, für WhatsApp und Kita. Kostenlos kopieren.',
    ctaBoxText: 'Statt Text zum Abschreiben: eine digitale Dino-Einladung, in der deine Gäste Baby-Dinos schlüpfen lassen — und direkt per WhatsApp zusagen. Kostenlos, ohne Anmeldung.',
    vorlagen: [
      { h: 'Kurz & klassisch', meta: 'Für Papier-Einladungen und alle, die es schnörkellos mögen.',
        text: `Roaaar! Forscher-Alarm: {Name} wird {Alter} und sucht mutige Dino-Forscher für eine wilde Expedition …

Wir feiern am {Datum} um {Uhrzeit} in {Ort}.

Sag uns bis zum {Zusage-Datum} Bescheid, ob du dabei bist: {Telefon}

Wir freuen uns auf dich!` },
      { h: 'Ausführlich — mit allen Infos für die Eltern', meta: 'Wenn du Abholzeit, Kleidung und Besonderheiten gleich mitklären willst.',
        text: `Achtung, Ausgrabung!

{Name} wird {Alter} Jahre alt und lädt dich herzlich zum Dino-Geburtstag ein.

🗓 Wann: {Datum}, {Uhrzeit}
📍 Wo: {Ort}
🦕 Was dich erwartet: Dino-Schatzsuche, Forscher-Spiele und Kuchen

Für die Eltern:
– Abholung um {Abholzeit}
– Bequeme Kleidung, die schmutzig werden darf (echte Forscher buddeln!)
– Verkleidung ist willkommen, aber kein Muss

Bitte gebt uns bis zum {Zusage-Datum} Bescheid, ob euer Kind dabei ist: {Telefon}

Wir freuen uns auf ein starkes Forscher-Team!
{Name der Eltern}` },
      { h: 'Gereimt', meta: 'Für alle, die es verspielt mögen — funktioniert auf Papier und im Messenger.',
        text: `Es stampft und brüllt durchs ganze Haus,
ein Riesen-Dino bricht hier aus!
{Name} wird {Alter} — komm vorbei,
beim Forscher-Fest ist viel los, juchhei!

Am {Datum} um {Uhrzeit} geht die Reise los,
in {Ort} wartet ein Dino — riesengroß!

Sag bis zum {Zusage-Datum} Bescheid, ob du mitforschst:
{Telefon}` },
      { h: 'WhatsApp-Version', meta: 'Kurz, mit Emojis — direkt in die Eltern-Gruppe oder als Einzelnachricht.',
        text: `🦖 ROAAAR! 🦖

{Name} wird {Alter} und feiert Dino-Geburtstag! 🎂

🗓 {Datum}
⏰ {Uhrzeit}
📍 {Ort}

Es gibt eine Dino-Schatzsuche, Forscher-Spiele und natürlich Kuchen. 🦕

Ist dein Kind dabei? Sag uns einfach kurz hier per WhatsApp Bescheid — am besten bis zum {Zusage-Datum}. 🙏` },
      { h: 'Für Kita oder Schule', meta: 'Neutraler Ton, richtet sich an die Eltern — gut zum Verteilen in der Gruppe.',
        text: `Liebe Eltern,

unser Sohn/unsere Tochter {Name} feiert am {Datum} seinen/ihren {Alter}. Geburtstag mit einer Dino-Party und möchte gern {Kind-Name} dazu einladen.

Wir feiern um {Uhrzeit} in {Ort}. Geplant sind eine Dino-Schatzsuche, Spiele und Kuchen — bitte geben Sie Ihrem Kind Kleidung mit, die schmutzig werden darf.

Über eine kurze Rückmeldung bis zum {Zusage-Datum} freuen wir uns: {Telefon}

Herzliche Grüße
{Name der Eltern}` },
      { h: 'Last-Minute', meta: 'Wenn die Einladung kurzfristig raus muss — ehrlich und charmant.',
        text: `Roaaar! Kurzfristiger Forscher-Funk: 📻

{Name} feiert schon am {Datum} Dino-Geburtstag ({Uhrzeit}, {Ort}) — und im Forscher-Team ist noch ein Platz frei!

Kannst du dabei sein? Gib uns einfach schnell per WhatsApp Bescheid: {Telefon}

Je eher, desto besser — die Dinos warten nicht ewig! 🦖` },
      { h: 'Mit Forscher-Aufruf', meta: 'Wenn die Party von der Expedition lebt — macht aus Gästen ein Forscher-Team.',
        text: `Gesucht: Das mutigste Dino-Forscher-Team aller Zeiten! 🔍🦴

{Name} wird {Alter} und stellt eine Expedition zusammen:

🗓 {Datum}, {Uhrzeit}
📍 {Ort}

Deine Mission: versteckte Dino-Eier finden, Spuren lesen und den großen Dino-Schatz heben. Lupe und Forscherhut kannst du gern mitbringen — wer nichts hat, bekommt vor Ort einen Forscher-Auftrag und gehört trotzdem zum Team.

Meldet euch bis zum {Zusage-Datum} bei uns: {Telefon}` }
    ]
  },

  {
    slug: 'einhorn',
    emoji: '🦄',
    mottoLabel: 'Einhorn',
    invName: 'Einhorn-Einladung',
    planerName: 'Einhorn-Geburtstag',
    szName: 'Einhorn-Schatzsuche',
    hasSchatzsuche: true,
    ogImage: 'og-einhorn.png',
    otherMottosLine: 'Piraten, Dino, Meerjungfrau &amp; mehr — jede Karte mit eigenem Mini-Spiel.',
    h1: 'Einhorn-Einladung für den Kindergeburtstag',
    lead: 'Eine digitale Einladungskarte mit eingebautem Mini-Spiel: Deine Gäste erforschen Regenbögen und fangen ein freches Einhorn — und sagen direkt per WhatsApp zu. Kostenlos, ohne Anmeldung, in 2 Minuten fertig.',
    metaDesc: 'Einhorn-Einladung für den Kindergeburtstag: digital per WhatsApp, mit Mini-Spiel voller Regenbögen und Einhorn-Zauber. Kostenlos, ohne Anmeldung, in 2 Minuten fertig. Plus Einladungstexte zum Abschreiben.',
    ogDesc: 'Digitale Einhorn-Einladung mit Mini-Spiel: Gäste fangen das freche Einhorn und sagen direkt per WhatsApp zu. Kostenlos, ohne Anmeldung.',
    gameShort: 'Einhorn-Spiel',
    gameP1: 'Die Einladung beginnt nicht mit Datum und Uhrzeit, sondern im Zauberland: Deine Gäste erforschen Regenbögen — drei Mal tippen, und magische Schätze wie Zauberstab und Stern tauchen auf. Doch kurz vor dem Ziel schnappt sich ein freches Einhorn den Stern! Erst wer es einfängt, rettet den Zauber. Dahinter stecken die Party-Infos: wer einlädt, wann, wo.',
    gameP2: 'Das Ganze dauert eine knappe Minute und funktioniert in jedem Handy-Browser — ohne App, ohne Download. Wenn du beim Erstellen ein Foto hochlädst, gibt es eine Extra-Pointe: Dann ist es das Geburtstagskind selbst, das den Stern stibitzt und gefangen werden muss.',
    quote: 'Zauberhafte Neuigkeiten: {Name} wird {Alter} und lädt dich ins Einhorn-Land ein …',
    faq: [
      { q: 'Was kostet die Einhorn-Einladung?', a: 'Nichts. Die Einladung ist komplett kostenlos — keine Anmeldung, keine Kreditkarte, kein Abo.' },
      { q: 'Brauchen meine Gäste eine App?', a: 'Nein. Die Einladung ist ein normaler Link, der im Browser jedes Handys funktioniert. Nichts muss installiert werden.' },
      { q: 'Wie verschicke ich die Einladung?', a: 'Nach dem Erstellen bekommst du einen kurzen Link. Den teilst du per WhatsApp — einzeln oder in der Eltern-Gruppe. E-Mail oder andere Messenger funktionieren genauso.' },
      { q: 'Kann ich ein Foto vom Geburtstagskind einbauen?', a: 'Ja, optional. Mit Foto ist es im Spiel das Geburtstagskind selbst, das den Stern stibitzt und von den Gästen gefangen werden muss. Das Foto wird auf unserem Server gespeichert und nach 90 Tagen automatisch gelöscht.' },
      { q: 'Was passiert mit unseren Daten?', a: 'Name, Datum, Uhrzeit, Ort und WhatsApp-Nummer stecken direkt im Einladungslink — es gibt kein Konto und keine Datenbank dahinter. Nur ein optionales Foto liegt auf unserem Server und wird nach 90 Tagen automatisch gelöscht.' },
      { q: 'Kann ich die Einhorn-Einladung auch ausdrucken?',
        a: 'Diese Einladung ist für WhatsApp gebaut — das Mini-Spiel funktioniert nur digital. Für Papier-Einladungen findest du bei uns fertige <a href="/einladung/einhorn/vorlagen/" class="inline">Einhorn-Einladungstexte</a> zum Abschreiben oder Selbstgestalten.',
        aPlain: 'Diese Einladung ist für WhatsApp gebaut — das Mini-Spiel funktioniert nur digital. Für Papier-Einladungen findest du bei uns fertige Einhorn-Einladungstexte zum Abschreiben oder Selbstgestalten.' }
    ],
    vorlagenMetaDesc: '7 fertige Einhorn-Einladungstexte für den Kindergeburtstag: kurz, lang, gereimt, für WhatsApp, Kita und Last-Minute. Zum Kopieren mit einem Klick — plus Checkliste, was in jede Einladung gehört.',
    vorlagenOgDesc: 'Fertige Einhorn-Einladungstexte für den Kindergeburtstag: kurz, lang, gereimt, für WhatsApp und Kita. Kostenlos kopieren.',
    ctaBoxText: 'Statt Text zum Abschreiben: eine digitale Einhorn-Einladung, in der deine Gäste das freche Einhorn fangen — und direkt per WhatsApp zusagen. Kostenlos, ohne Anmeldung.',
    vorlagen: [
      { h: 'Kurz & klassisch', meta: 'Für Papier-Einladungen und alle, die es schnörkellos mögen.',
        text: `Zauberhafte Neuigkeiten: {Name} wird {Alter} und lädt dich ins Einhorn-Land ein …

Wir feiern am {Datum} um {Uhrzeit} in {Ort}.

Sag uns bis zum {Zusage-Datum} Bescheid, ob du dabei bist: {Telefon}

Wir freuen uns auf dich!` },
      { h: 'Ausführlich — mit allen Infos für die Eltern', meta: 'Wenn du Abholzeit, Kleidung und Besonderheiten gleich mitklären willst.',
        text: `Ein Hauch von Magie liegt in der Luft …

{Name} wird {Alter} Jahre alt und lädt dich herzlich zum Einhorn-Geburtstag ein.

🗓 Wann: {Datum}, {Uhrzeit}
📍 Wo: {Ort}
🦄 Was dich erwartet: Einhorn-Schatzsuche, Glitzer-Spiele und Kuchen

Für die Eltern:
– Abholung um {Abholzeit}
– Kleidung, die Glitzer und Grasflecken verträgt
– Verkleidung ist willkommen, aber kein Muss

Bitte gebt uns bis zum {Zusage-Datum} Bescheid, ob euer Kind dabei ist: {Telefon}

Wir freuen uns auf einen zauberhaften Tag!
{Name der Eltern}` },
      { h: 'Gereimt', meta: 'Für alle, die es verspielt mögen — funktioniert auf Papier und im Messenger.',
        text: `Ein Regenbogen, bunt und breit,
führt dich zu uns — mach dich bereit!
{Name} wird {Alter}, komm geschwind,
wo Glitzer, Spiel und Kuchen sind!

Am {Datum} um {Uhrzeit} beginnt die Zauberei,
in {Ort} — und du bist mit dabei!

Sag bis zum {Zusage-Datum} Bescheid, ob du kommst:
{Telefon}` },
      { h: 'WhatsApp-Version', meta: 'Kurz, mit Emojis — direkt in die Eltern-Gruppe oder als Einzelnachricht.',
        text: `🦄✨ MAGISCHE EINLADUNG ✨🦄

{Name} wird {Alter} und feiert Einhorn-Geburtstag! 🎂

🗓 {Datum}
⏰ {Uhrzeit}
📍 {Ort}

Es gibt eine Einhorn-Schatzsuche, Glitzer-Spiele und natürlich Kuchen. 🌈

Ist dein Kind dabei? Sag uns einfach kurz hier per WhatsApp Bescheid — am besten bis zum {Zusage-Datum}. 🙏` },
      { h: 'Für Kita oder Schule', meta: 'Neutraler Ton, richtet sich an die Eltern — gut zum Verteilen in der Gruppe.',
        text: `Liebe Eltern,

unser Sohn/unsere Tochter {Name} feiert am {Datum} seinen/ihren {Alter}. Geburtstag mit einer Einhorn-Party und möchte gern {Kind-Name} dazu einladen.

Wir feiern um {Uhrzeit} in {Ort}. Geplant sind eine Schatzsuche, Spiele und Kuchen — bitte geben Sie Ihrem Kind Kleidung mit, die auch Glitzer und Grasflecken verträgt.

Über eine kurze Rückmeldung bis zum {Zusage-Datum} freuen wir uns: {Telefon}

Herzliche Grüße
{Name der Eltern}` },
      { h: 'Last-Minute', meta: 'Wenn die Einladung kurzfristig raus muss — ehrlich und charmant.',
        text: `✨ Magischer Eil-Brief! ✨

{Name} feiert schon am {Datum} Einhorn-Geburtstag ({Uhrzeit}, {Ort}) — und im Zauberland ist noch ein Platz frei!

Kannst du dabei sein? Gib uns einfach schnell per WhatsApp Bescheid: {Telefon}

Je eher, desto besser — der Einhorn-Zauber wartet nicht ewig! 🦄` },
      { h: 'Mit Glitzer-Aufruf', meta: 'Wenn die Party vom Funkeln lebt — macht aus Gästen eine Zauber-Gesellschaft.',
        text: `Aufgepasst, Zauberwesen! 🌈

{Name} wird {Alter} und ruft alle Einhorn-Freundinnen und -Freunde zusammen:

🗓 {Datum}, {Uhrzeit}
📍 {Ort}

Kommt so bunt und glitzernd, wie ihr mögt — Tüllrock, Einhorn-Haarreif oder Lieblings-Regenbogenshirt, alles zählt! Wer nichts Glitzerndes hat, bekommt vor Ort ein Glitzer-Tattoo und gehört trotzdem dazu.

Meldet euch bis zum {Zusage-Datum} bei uns: {Telefon}` }
    ]
  },

  {
    slug: 'safari',
    emoji: '🦁',
    mottoLabel: 'Safari',
    invName: 'Safari-Einladung',
    planerName: 'Safari-Geburtstag',
    szName: 'Safari-Schatzsuche',
    hasSchatzsuche: true,
    ogImage: 'og-safari.png',
    otherMottosLine: 'Piraten, Dino, Feuerwehr &amp; mehr — jede Karte mit eigenem Mini-Spiel.',
    h1: 'Safari-Einladung für den Kindergeburtstag',
    lead: 'Eine digitale Einladungskarte mit eingebautem Mini-Spiel: Deine Gäste gehen auf Foto-Safari und schnappen den frechen Affen — und sagen direkt per WhatsApp zu. Kostenlos, ohne Anmeldung, in 2 Minuten fertig.',
    metaDesc: 'Safari-Einladung für den Kindergeburtstag: digital per WhatsApp, mit Mini-Spiel als Foto-Safari durch die Steppe. Kostenlos, ohne Anmeldung, in 2 Minuten fertig. Plus Einladungstexte zum Abschreiben.',
    ogDesc: 'Digitale Safari-Einladung mit Mini-Spiel: Gäste gehen auf Foto-Safari und sagen direkt per WhatsApp zu. Kostenlos, ohne Anmeldung.',
    gameShort: 'Safari-Spiel',
    gameP1: 'Die Einladung beginnt nicht mit Datum und Uhrzeit, sondern mitten in der Steppe: Deine Gäste gehen auf Foto-Safari und durchsuchen die Büsche — drei Mal tippen, und wilde Tiere wie Löwe und Elefant tauchen auf. Doch kurz vor dem Ziel klaut ein frecher Affe die Kamera! Erst wer ihn fängt, rettet die Safari. Dahinter stecken die Party-Infos: wer einlädt, wann, wo.',
    gameP2: 'Das Ganze dauert eine knappe Minute und funktioniert in jedem Handy-Browser — ohne App, ohne Download. Wenn du beim Erstellen ein Foto hochlädst, gibt es eine Extra-Pointe: Dann ist es das Geburtstagskind selbst, das mit der Kamera davonflitzt und geschnappt werden muss.',
    quote: 'Safari-Alarm! Ranger {Name} wird {Alter} und ruft zur großen Expedition durch die Steppe …',
    faq: [
      { q: 'Was kostet die Safari-Einladung?', a: 'Nichts. Die Einladung ist komplett kostenlos — keine Anmeldung, keine Kreditkarte, kein Abo.' },
      { q: 'Brauchen meine Gäste eine App?', a: 'Nein. Die Einladung ist ein normaler Link, der im Browser jedes Handys funktioniert. Nichts muss installiert werden.' },
      { q: 'Wie verschicke ich die Einladung?', a: 'Nach dem Erstellen bekommst du einen kurzen Link. Den teilst du per WhatsApp — einzeln oder in der Eltern-Gruppe. E-Mail oder andere Messenger funktionieren genauso.' },
      { q: 'Kann ich ein Foto vom Geburtstagskind einbauen?', a: 'Ja, optional. Mit Foto ist es im Spiel das Geburtstagskind selbst, das mit der Kamera davonflitzt und von den Gästen geschnappt werden muss. Das Foto wird auf unserem Server gespeichert und nach 90 Tagen automatisch gelöscht.' },
      { q: 'Was passiert mit unseren Daten?', a: 'Name, Datum, Uhrzeit, Ort und WhatsApp-Nummer stecken direkt im Einladungslink — es gibt kein Konto und keine Datenbank dahinter. Nur ein optionales Foto liegt auf unserem Server und wird nach 90 Tagen automatisch gelöscht.' },
      { q: 'Kann ich die Safari-Einladung auch ausdrucken?',
        a: 'Diese Einladung ist für WhatsApp gebaut — das Mini-Spiel funktioniert nur digital. Für Papier-Einladungen findest du bei uns fertige <a href="/einladung/safari/vorlagen/" class="inline">Safari-Einladungstexte</a> zum Abschreiben oder Selbstgestalten.',
        aPlain: 'Diese Einladung ist für WhatsApp gebaut — das Mini-Spiel funktioniert nur digital. Für Papier-Einladungen findest du bei uns fertige Safari-Einladungstexte zum Abschreiben oder Selbstgestalten.' }
    ],
    vorlagenMetaDesc: '7 fertige Safari-Einladungstexte für den Kindergeburtstag: kurz, lang, gereimt, für WhatsApp, Kita und Last-Minute. Zum Kopieren mit einem Klick — plus Checkliste, was in jede Einladung gehört.',
    vorlagenOgDesc: 'Fertige Safari-Einladungstexte für den Kindergeburtstag: kurz, lang, gereimt, für WhatsApp und Kita. Kostenlos kopieren.',
    ctaBoxText: 'Statt Text zum Abschreiben: eine digitale Safari-Einladung, in der deine Gäste den frechen Affen schnappen — und direkt per WhatsApp zusagen. Kostenlos, ohne Anmeldung.',
    vorlagen: [
      { h: 'Kurz & klassisch', meta: 'Für Papier-Einladungen und alle, die es schnörkellos mögen.',
        text: `Safari-Alarm! Ranger {Name} wird {Alter} und ruft zur großen Expedition durch die Steppe …

Wir feiern am {Datum} um {Uhrzeit} in {Ort}.

Sag uns bis zum {Zusage-Datum} Bescheid, ob du dabei bist: {Telefon}

Wir freuen uns auf dich!` },
      { h: 'Ausführlich — mit allen Infos für die Eltern', meta: 'Wenn du Abholzeit, Kleidung und Besonderheiten gleich mitklären willst.',
        text: `Fernglas raus — Safari-Zeit!

{Name} wird {Alter} Jahre alt und lädt dich herzlich zum Safari-Geburtstag ein.

🗓 Wann: {Datum}, {Uhrzeit}
📍 Wo: {Ort}
🦁 Was dich erwartet: Safari-Schatzsuche, wilde Tier-Spiele und Kuchen

Für die Eltern:
– Abholung um {Abholzeit}
– Bequeme Kleidung, die schmutzig werden darf (wir sind auch draußen)
– Fernglas oder Sonnenhut gern gesehen, aber kein Muss

Bitte gebt uns bis zum {Zusage-Datum} Bescheid, ob euer Kind dabei ist: {Telefon}

Wir freuen uns auf eine mutige Ranger-Truppe!
{Name der Eltern}` },
      { h: 'Gereimt', meta: 'Für alle, die es verspielt mögen — funktioniert auf Papier und im Messenger.',
        text: `Der Löwe brüllt, der Affe lacht,
die Steppe ist schon aufgewacht!
{Name} wird {Alter} — pack deinen Hut,
auf Safari wird der Tag richtig gut!

Am {Datum} um {Uhrzeit} startet die Tour,
in {Ort} folgen wir der wilden Spur!

Sag bis zum {Zusage-Datum} Bescheid, ob du mitkommst:
{Telefon}` },
      { h: 'WhatsApp-Version', meta: 'Kurz, mit Emojis — direkt in die Eltern-Gruppe oder als Einzelnachricht.',
        text: `🦁 SAFARI-ALARM! 🦁

{Name} wird {Alter} und feiert Safari-Geburtstag! 🎂

🗓 {Datum}
⏰ {Uhrzeit}
📍 {Ort}

Es gibt eine Safari-Schatzsuche, wilde Tier-Spiele und natürlich Kuchen. 🐘

Ist dein Kind dabei? Sag uns einfach kurz hier per WhatsApp Bescheid — am besten bis zum {Zusage-Datum}. 🙏` },
      { h: 'Für Kita oder Schule', meta: 'Neutraler Ton, richtet sich an die Eltern — gut zum Verteilen in der Gruppe.',
        text: `Liebe Eltern,

unser Sohn/unsere Tochter {Name} feiert am {Datum} seinen/ihren {Alter}. Geburtstag mit einer Safari-Party und möchte gern {Kind-Name} dazu einladen.

Wir feiern um {Uhrzeit} in {Ort}. Geplant sind eine Schatzsuche, Spiele und Kuchen — bitte geben Sie Ihrem Kind Kleidung mit, die schmutzig werden darf.

Über eine kurze Rückmeldung bis zum {Zusage-Datum} freuen wir uns: {Telefon}

Herzliche Grüße
{Name der Eltern}` },
      { h: 'Last-Minute', meta: 'Wenn die Einladung kurzfristig raus muss — ehrlich und charmant.',
        text: `Safari-Funkspruch — kurzfristig! 📻

{Name} feiert schon am {Datum} Safari-Geburtstag ({Uhrzeit}, {Ort}) — und im Jeep ist noch ein Platz frei!

Kannst du dabei sein? Gib uns einfach schnell per WhatsApp Bescheid: {Telefon}

Je eher, desto besser — die Herde zieht weiter! 🐘` },
      { h: 'Mit Ranger-Aufruf', meta: 'Wenn die Party von der Expedition lebt — macht aus Gästen eine Ranger-Truppe.',
        text: `Gesucht: Die schärfsten Tier-Spurenleser der Savanne! 🔭

Ranger {Name} wird {Alter} und stellt eine Expedition zusammen:

🗓 {Datum}, {Uhrzeit}
📍 {Ort}

Deine Mission: Tiere entdecken, Spuren lesen und den Safari-Schatz finden. Khaki-Look, Sonnenhut oder Fernglas gern gesehen — wer nichts hat, bekommt vor Ort einen Ranger-Auftrag und gehört trotzdem zur Truppe.

Meldet euch bis zum {Zusage-Datum} bei uns: {Telefon}` }
    ]
  }
];
