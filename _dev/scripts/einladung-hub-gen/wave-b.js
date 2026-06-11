// Welle B: feuerwehr, detektiv, superheld — kuratierte Copy (P6-1 Rollout, 2026-06-10)
// Spiel-Fakten aus App-Strings:
// feuerwehr: Feuer löschen 3x tippen (Löschzug, Medaille), "freches Feuerteufelchen" klaut den Schlauch → fangen, "Einsatz geschafft!"
// detektiv: Spuren untersuchen 3x tippen (Nachricht, Abdruck), "Ein mysteriöser Dieb schnappt sich die Akte!" → fangen ("der Fall hängt davon ab")
// superheld: Kisten öffnen 3x tippen (Blitz, Schild), "Ein frecher Schurke klaut das Schild!" → fangen ("die Stadt braucht dich!")

module.exports = [
  {
    slug: 'feuerwehr',
    emoji: '🚒',
    mottoLabel: 'Feuerwehr',
    invName: 'Feuerwehr-Einladung',
    planerName: 'Feuerwehr-Geburtstag',
    szName: 'Feuerwehr-Schatzsuche',
    hasSchatzsuche: true,
    ogImage: 'og-feuerwehr.png',
    otherMottosLine: 'Piraten, Dino, Detektiv &amp; mehr — jede Karte mit eigenem Mini-Spiel.',
    h1: 'Feuerwehr-Einladung für den Kindergeburtstag',
    lead: 'Eine digitale Einladungskarte mit eingebautem Mini-Spiel: Deine Gäste rubbeln Feuer aus und schnappen das freche Feuerteufelchen — und sagen direkt per WhatsApp zu. Kostenlos, ohne Anmeldung, in 2 Minuten fertig.',
    metaDesc: 'Feuerwehr-Einladung für den Kindergeburtstag: digital per WhatsApp, mit Mini-Spiel als Löscheinsatz. Kostenlos, ohne Anmeldung, in 2 Minuten fertig. Plus Einladungstexte zum Abschreiben.',
    ogDesc: 'Digitale Feuerwehr-Einladung mit Mini-Spiel: Gäste löschen den Einsatz und sagen direkt per WhatsApp zu. Kostenlos, ohne Anmeldung.',
    gameShort: 'Feuerwehr-Spiel',
    gameP1: 'Die Einladung beginnt nicht mit Datum und Uhrzeit, sondern mitten im Einsatz: Deine Gäste rubbeln die Flammen aus — Finger aufs Feuer und reiben, Stufe für Stufe schrumpft die Flamme, und darunter kommen Fundstücke wie Löschzug und Medaille zum Vorschein. Doch kurz vor dem Ziel klaut ein freches Feuerteufelchen den Schlauch! Erst wer es einfängt, schließt den Einsatz ab. Dahinter stecken die Party-Infos: wer einlädt, wann, wo.',
    gameP2: 'Das Ganze dauert eine knappe Minute und funktioniert in jedem Handy-Browser — ohne App, ohne Download. Wenn du beim Erstellen ein Foto hochlädst, gibt es eine Extra-Pointe: Dann ist es das Geburtstagskind selbst, das mit dem Schlauch davonflitzt und geschnappt werden muss.',
    quote: 'Alarm, Alarm! Feuerwehrkind {Name} wird {Alter} und braucht Verstärkung für den großen Einsatz …',
    faq: [
      { q: 'Was kostet die Feuerwehr-Einladung?', a: 'Nichts. Die Einladung ist komplett kostenlos — keine Anmeldung, keine Kreditkarte, kein Abo.' },
      { q: 'Brauchen meine Gäste eine App?', a: 'Nein. Die Einladung ist ein normaler Link, der im Browser jedes Handys funktioniert. Nichts muss installiert werden.' },
      { q: 'Wie verschicke ich die Einladung?', a: 'Nach dem Erstellen bekommst du einen kurzen Link. Den teilst du per WhatsApp — einzeln oder in der Eltern-Gruppe. E-Mail oder andere Messenger funktionieren genauso.' },
      { q: 'Kann ich ein Foto vom Geburtstagskind einbauen?', a: 'Ja, optional. Mit Foto ist es im Spiel das Geburtstagskind selbst, das mit dem Schlauch davonflitzt und von den Gästen geschnappt werden muss. Das Foto wird auf unserem Server gespeichert und nach 90 Tagen automatisch gelöscht.' },
      { q: 'Was passiert mit unseren Daten?', a: 'Name, Datum, Uhrzeit, Ort und WhatsApp-Nummer stecken direkt im Einladungslink — es gibt kein Konto und keine Datenbank dahinter. Nur ein optionales Foto liegt auf unserem Server und wird nach 90 Tagen automatisch gelöscht.' },
      { q: 'Kann ich die Feuerwehr-Einladung auch ausdrucken?',
        a: 'Diese Einladung ist für WhatsApp gebaut — das Mini-Spiel funktioniert nur digital. Für Papier-Einladungen findest du bei uns fertige <a href="/einladung/feuerwehr/vorlagen/" class="inline">Feuerwehr-Einladungstexte</a> zum Abschreiben oder Selbstgestalten.',
        aPlain: 'Diese Einladung ist für WhatsApp gebaut — das Mini-Spiel funktioniert nur digital. Für Papier-Einladungen findest du bei uns fertige Feuerwehr-Einladungstexte zum Abschreiben oder Selbstgestalten.' }
    ],
    vorlagenMetaDesc: '7 fertige Feuerwehr-Einladungstexte für den Kindergeburtstag: kurz, lang, gereimt, für WhatsApp, Kita und Last-Minute. Zum Kopieren mit einem Klick — plus Checkliste, was in jede Einladung gehört.',
    vorlagenOgDesc: 'Fertige Feuerwehr-Einladungstexte für den Kindergeburtstag: kurz, lang, gereimt, für WhatsApp und Kita. Kostenlos kopieren.',
    ctaBoxText: 'Statt Text zum Abschreiben: eine digitale Feuerwehr-Einladung, in der deine Gäste den Einsatz löschen — und direkt per WhatsApp zusagen. Kostenlos, ohne Anmeldung.',
    vorlagen: [
      { h: 'Kurz & klassisch', meta: 'Für Papier-Einladungen und alle, die es schnörkellos mögen.',
        text: `Alarm, Alarm! Feuerwehrkind {Name} wird {Alter} und braucht Verstärkung für den großen Einsatz …

Wir feiern am {Datum} um {Uhrzeit} in {Ort}.

Sag uns bis zum {Zusage-Datum} Bescheid, ob du dabei bist: {Telefon}

Wir freuen uns auf dich!` },
      { h: 'Ausführlich — mit allen Infos für die Eltern', meta: 'Wenn du Abholzeit, Kleidung und Besonderheiten gleich mitklären willst.',
        text: `Tatütata — hier kommt die Einladung!

{Name} wird {Alter} Jahre alt und lädt dich herzlich zum Feuerwehr-Geburtstag ein.

🗓 Wann: {Datum}, {Uhrzeit}
📍 Wo: {Ort}
🚒 Was dich erwartet: Löscheinsatz-Spiele, Feuerwehr-Schatzsuche und Kuchen

Für die Eltern:
– Abholung um {Abholzeit}
– Kleidung, die nass und schmutzig werden darf (wir löschen wirklich!)
– Verkleidung ist willkommen, aber kein Muss

Bitte gebt uns bis zum {Zusage-Datum} Bescheid, ob euer Kind dabei ist: {Telefon}

Wir freuen uns auf eine starke Einsatz-Truppe!
{Name der Eltern}` },
      { h: 'Gereimt', meta: 'Für alle, die es verspielt mögen — funktioniert auf Papier und im Messenger.',
        text: `Die Sirene heult — mach dich bereit,
die Wache ruft zur Einsatzzeit!
{Name} wird {Alter} — rück mit aus,
mit Blaulicht geht's zum Festtagsschmaus!

Am {Datum} um {Uhrzeit} beginnt der Einsatz hier,
in {Ort} — Wasser marsch, wir feiern mit dir!

Sag bis zum {Zusage-Datum} Bescheid, ob du mit anpackst:
{Telefon}` },
      { h: 'WhatsApp-Version', meta: 'Kurz, mit Emojis — direkt in die Eltern-Gruppe oder als Einzelnachricht.',
        text: `🚒 TATÜTATA! 🚒

{Name} wird {Alter} und feiert Feuerwehr-Geburtstag! 🎂

🗓 {Datum}
⏰ {Uhrzeit}
📍 {Ort}

Es gibt Löscheinsatz-Spiele, eine Feuerwehr-Schatzsuche und natürlich Kuchen. 🔥➡️💧

Ist dein Kind dabei? Sag uns einfach kurz hier per WhatsApp Bescheid — am besten bis zum {Zusage-Datum}. 🙏` },
      { h: 'Für Kita oder Schule', meta: 'Neutraler Ton, richtet sich an die Eltern — gut zum Verteilen in der Gruppe.',
        text: `Liebe Eltern,

unser Sohn/unsere Tochter {Name} feiert am {Datum} seinen/ihren {Alter}. Geburtstag mit einer Feuerwehr-Party und möchte gern {Kind-Name} dazu einladen.

Wir feiern um {Uhrzeit} in {Ort}. Geplant sind Löschspiele, eine Schatzsuche und Kuchen — bitte geben Sie Ihrem Kind Kleidung mit, die nass und schmutzig werden darf.

Über eine kurze Rückmeldung bis zum {Zusage-Datum} freuen wir uns: {Telefon}

Herzliche Grüße
{Name der Eltern}` },
      { h: 'Last-Minute', meta: 'Wenn die Einladung kurzfristig raus muss — ehrlich und charmant.',
        text: `Einsatz-Funk — kurzfristig! 🚨

{Name} feiert schon am {Datum} Feuerwehr-Geburtstag ({Uhrzeit}, {Ort}) — und auf dem Löschfahrzeug ist noch ein Platz frei!

Kannst du dabei sein? Gib uns einfach schnell per WhatsApp Bescheid: {Telefon}

Je eher, desto besser — der Einsatz wartet nicht! 🚒` },
      { h: 'Mit Einsatz-Aufruf', meta: 'Wenn die Party vom Einsatz lebt — macht aus Gästen eine Löschtruppe.',
        text: `Gesucht: Die schnellste Löschtruppe der Stadt! 🧯

Feuerwehrkind {Name} wird {Alter} und stellt eine neue Einsatz-Mannschaft auf:

🗓 {Datum}, {Uhrzeit}
📍 {Ort}

Deine Mission: Feuer löschen, Hindernisse überwinden und die Einsatz-Medaille verdienen. Feuerwehrhelm oder rotes Shirt gern gesehen — wer nichts hat, bekommt vor Ort einen Einsatzauftrag und gehört trotzdem zur Truppe.

Meldet euch bis zum {Zusage-Datum} bei uns: {Telefon}` }
    ]
  },

  {
    slug: 'detektiv',
    emoji: '🔍',
    mottoLabel: 'Detektiv',
    invName: 'Detektiv-Einladung',
    planerName: 'Detektiv-Geburtstag',
    szName: 'Detektiv-Schnitzeljagd',
    hasSchatzsuche: true,
    ogImage: 'og-detektiv.png',
    otherMottosLine: 'Piraten, Superheld, Weltraum &amp; mehr — jede Karte mit eigenem Mini-Spiel.',
    h1: 'Detektiv-Einladung für den Kindergeburtstag',
    lead: 'Eine digitale Einladungskarte mit eingebautem Mini-Spiel: Deine Gäste untersuchen Spuren und schnappen den mysteriösen Dieb — und sagen direkt per WhatsApp zu. Kostenlos, ohne Anmeldung, in 2 Minuten fertig.',
    metaDesc: 'Detektiv-Einladung für den Kindergeburtstag: digital per WhatsApp, mit Mini-Spiel als Ermittlungsfall. Kostenlos, ohne Anmeldung, in 2 Minuten fertig. Plus Einladungstexte zum Abschreiben.',
    ogDesc: 'Digitale Detektiv-Einladung mit Mini-Spiel: Gäste lösen den Fall und sagen direkt per WhatsApp zu. Kostenlos, ohne Anmeldung.',
    gameShort: 'Detektiv-Spiel',
    gameP1: 'Die Einladung beginnt nicht mit Datum und Uhrzeit, sondern an einem Tatort: Deine Gäste untersuchen Spuren — drei Mal tippen, und Hinweise wie eine geheime Nachricht und ein Abdruck kommen ans Licht. Doch kurz vor der Lösung schnappt sich ein mysteriöser Dieb die Fall-Akte! Erst wer ihn fängt, löst den Fall. Dahinter stecken die Party-Infos: wer einlädt, wann, wo.',
    gameP2: 'Das Ganze dauert eine knappe Minute und funktioniert in jedem Handy-Browser — ohne App, ohne Download. Wenn du beim Erstellen ein Foto hochlädst, gibt es eine Extra-Pointe: Dann ist es das Geburtstagskind selbst, das als Dieb mit der Akte verschwindet und überführt werden muss.',
    quote: 'Streng geheim! Meisterdetektiv:in {Name} wird {Alter} und braucht Unterstützung bei einem kniffligen Fall …',
    faq: [
      { q: 'Was kostet die Detektiv-Einladung?', a: 'Nichts. Die Einladung ist komplett kostenlos — keine Anmeldung, keine Kreditkarte, kein Abo.' },
      { q: 'Brauchen meine Gäste eine App?', a: 'Nein. Die Einladung ist ein normaler Link, der im Browser jedes Handys funktioniert. Nichts muss installiert werden.' },
      { q: 'Wie verschicke ich die Einladung?', a: 'Nach dem Erstellen bekommst du einen kurzen Link. Den teilst du per WhatsApp — einzeln oder in der Eltern-Gruppe. E-Mail oder andere Messenger funktionieren genauso.' },
      { q: 'Kann ich ein Foto vom Geburtstagskind einbauen?', a: 'Ja, optional. Mit Foto ist es im Spiel das Geburtstagskind selbst, das als Dieb mit der Akte verschwindet und von den Gästen überführt werden muss. Das Foto wird auf unserem Server gespeichert und nach 90 Tagen automatisch gelöscht.' },
      { q: 'Was passiert mit unseren Daten?', a: 'Name, Datum, Uhrzeit, Ort und WhatsApp-Nummer stecken direkt im Einladungslink — es gibt kein Konto und keine Datenbank dahinter. Nur ein optionales Foto liegt auf unserem Server und wird nach 90 Tagen automatisch gelöscht.' },
      { q: 'Kann ich die Detektiv-Einladung auch ausdrucken?',
        a: 'Diese Einladung ist für WhatsApp gebaut — das Mini-Spiel funktioniert nur digital. Für Papier-Einladungen findest du bei uns fertige <a href="/einladung/detektiv/vorlagen/" class="inline">Detektiv-Einladungstexte</a> zum Abschreiben oder Selbstgestalten.',
        aPlain: 'Diese Einladung ist für WhatsApp gebaut — das Mini-Spiel funktioniert nur digital. Für Papier-Einladungen findest du bei uns fertige Detektiv-Einladungstexte zum Abschreiben oder Selbstgestalten.' }
    ],
    vorlagenMetaDesc: '7 fertige Detektiv-Einladungstexte für den Kindergeburtstag: kurz, lang, gereimt, für WhatsApp, Kita und Last-Minute. Zum Kopieren mit einem Klick — plus Checkliste, was in jede Einladung gehört.',
    vorlagenOgDesc: 'Fertige Detektiv-Einladungstexte für den Kindergeburtstag: kurz, lang, gereimt, für WhatsApp und Kita. Kostenlos kopieren.',
    ctaBoxText: 'Statt Text zum Abschreiben: eine digitale Detektiv-Einladung, in der deine Gäste den Fall lösen — und direkt per WhatsApp zusagen. Kostenlos, ohne Anmeldung.',
    vorlagen: [
      { h: 'Kurz & klassisch', meta: 'Für Papier-Einladungen und alle, die es schnörkellos mögen.',
        text: `Streng geheim! Meisterdetektiv:in {Name} wird {Alter} und braucht Unterstützung bei einem kniffligen Fall …

Wir ermitteln am {Datum} um {Uhrzeit} in {Ort}.

Sag uns bis zum {Zusage-Datum} Bescheid, ob du dabei bist: {Telefon}

Wir freuen uns auf dich!` },
      { h: 'Ausführlich — mit allen Infos für die Eltern', meta: 'Wenn du Abholzeit, Kleidung und Besonderheiten gleich mitklären willst.',
        text: `Akte {Name}: Ein neuer Fall!

{Name} wird {Alter} Jahre alt und lädt dich herzlich zum Detektiv-Geburtstag ein.

🗓 Wann: {Datum}, {Uhrzeit}
📍 Wo: {Ort}
🔍 Was dich erwartet: Schnitzeljagd mit Geheimcode, Detektiv-Spiele und Kuchen

Für die Eltern:
– Abholung um {Abholzeit}
– Bequeme Kleidung (Ermittler sind viel unterwegs)
– Lupe oder Detektiv-Hut gern gesehen, aber kein Muss

Bitte gebt uns bis zum {Zusage-Datum} Bescheid, ob euer Kind dabei ist: {Telefon}

Wir freuen uns auf ein scharfsinniges Ermittler-Team!
{Name der Eltern}` },
      { h: 'Gereimt', meta: 'Für alle, die es verspielt mögen — funktioniert auf Papier und im Messenger.',
        text: `Psst! Ein Fall ist zu klären, ganz diskret,
nur wer schlau ist, weiß, worum es geht.
{Name} wird {Alter} — schau genau,
wer löst den Fall? Bist du so schlau?

Am {Datum} um {Uhrzeit} beginnt die heiße Spur,
in {Ort} ermitteln wir auf Geburtstags-Tour!

Sag bis zum {Zusage-Datum} Bescheid, ob du mitermittelst:
{Telefon}` },
      { h: 'WhatsApp-Version', meta: 'Kurz, mit Emojis — direkt in die Eltern-Gruppe oder als Einzelnachricht.',
        text: `🔍 STRENG GEHEIM! 🔍

{Name} wird {Alter} und feiert Detektiv-Geburtstag! 🎂

🗓 {Datum}
⏰ {Uhrzeit}
📍 {Ort}

Es gibt eine Schnitzeljagd mit Geheimcode, Detektiv-Spiele und natürlich Kuchen. 🕵️

Ist dein Kind dabei? Sag uns einfach kurz hier per WhatsApp Bescheid — am besten bis zum {Zusage-Datum}. 🙏` },
      { h: 'Für Kita oder Schule', meta: 'Neutraler Ton, richtet sich an die Eltern — gut zum Verteilen in der Gruppe.',
        text: `Liebe Eltern,

unser Sohn/unsere Tochter {Name} feiert am {Datum} seinen/ihren {Alter}. Geburtstag mit einer Detektiv-Party und möchte gern {Kind-Name} dazu einladen.

Wir feiern um {Uhrzeit} in {Ort}. Geplant sind eine Schnitzeljagd, Rätsel-Spiele und Kuchen — bequeme Kleidung reicht völlig aus.

Über eine kurze Rückmeldung bis zum {Zusage-Datum} freuen wir uns: {Telefon}

Herzliche Grüße
{Name der Eltern}` },
      { h: 'Last-Minute', meta: 'Wenn die Einladung kurzfristig raus muss — ehrlich und charmant.',
        text: `Geheim-Depesche — dringend! 📨

{Name} feiert schon am {Datum} Detektiv-Geburtstag ({Uhrzeit}, {Ort}) — und im Ermittler-Team ist noch ein Platz frei!

Kannst du dabei sein? Gib uns einfach schnell per WhatsApp Bescheid: {Telefon}

Je eher, desto besser — sonst verwischt die Spur! 🔍` },
      { h: 'Mit Ermittler-Aufruf', meta: 'Wenn die Party vom Fall lebt — macht aus Gästen ein Ermittler-Team.',
        text: `Gesucht: Die cleversten Nachwuchs-Detektive der Stadt! 🕵️

Meisterdetektiv:in {Name} wird {Alter} und eröffnet eine neue Ermittlung:

🗓 {Datum}, {Uhrzeit}
📍 {Ort}

Deine Mission: Spuren sichern, Geheimcodes knacken und den Täter überführen. Lupe, Notizblock oder Detektiv-Hut gern gesehen — wer nichts hat, bekommt vor Ort einen Ermittlerausweis und gehört trotzdem zum Team.

Meldet euch bis zum {Zusage-Datum} bei uns: {Telefon}` }
    ]
  },

  {
    slug: 'superheld',
    emoji: '🦸',
    mottoLabel: 'Superhelden',
    invName: 'Superhelden-Einladung',
    planerName: 'Superhelden-Geburtstag',
    szName: 'Superhelden-Schatzsuche',
    hasSchatzsuche: true,
    ogImage: 'og-home.png',
    otherMottosLine: 'Piraten, Detektiv, Weltraum &amp; mehr — jede Karte mit eigenem Mini-Spiel.',
    h1: 'Superhelden-Einladung für den Kindergeburtstag',
    lead: 'Eine digitale Einladungskarte mit eingebautem Mini-Spiel: Deine Gäste suchen Helden-Ausrüstung und schnappen den frechen Schurken — und sagen direkt per WhatsApp zu. Kostenlos, ohne Anmeldung, in 2 Minuten fertig.',
    metaDesc: 'Superhelden-Einladung für den Kindergeburtstag: digital per WhatsApp, mit Mini-Spiel als Helden-Mission. Kostenlos, ohne Anmeldung, in 2 Minuten fertig. Plus Einladungstexte zum Abschreiben.',
    ogDesc: 'Digitale Superhelden-Einladung mit Mini-Spiel: Gäste schnappen den Schurken und sagen direkt per WhatsApp zu. Kostenlos, ohne Anmeldung.',
    gameShort: 'Superhelden-Spiel',
    gameP1: 'Die Einladung beginnt nicht mit Datum und Uhrzeit, sondern mitten in der Stadt: Deine Gäste öffnen verdächtige Kisten — drei Mal tippen, und Helden-Ausrüstung wie Blitz und Schild kommt zum Vorschein. Doch kurz vor dem Ziel klaut ein frecher Schurke das Schild! Erst wer ihn schnappt, rettet die Stadt. Dahinter stecken die Party-Infos: wer einlädt, wann, wo.',
    gameP2: 'Das Ganze dauert eine knappe Minute und funktioniert in jedem Handy-Browser — ohne App, ohne Download. Wenn du beim Erstellen ein Foto hochlädst, gibt es eine Extra-Pointe: Dann ist es das Geburtstagskind selbst, das als Schurke das Schild klaut und geschnappt werden muss.',
    quote: 'Heldenalarm! {Name} wird {Alter} und stellt ein neues Superhelden-Team zusammen …',
    faq: [
      { q: 'Was kostet die Superhelden-Einladung?', a: 'Nichts. Die Einladung ist komplett kostenlos — keine Anmeldung, keine Kreditkarte, kein Abo.' },
      { q: 'Brauchen meine Gäste eine App?', a: 'Nein. Die Einladung ist ein normaler Link, der im Browser jedes Handys funktioniert. Nichts muss installiert werden.' },
      { q: 'Wie verschicke ich die Einladung?', a: 'Nach dem Erstellen bekommst du einen kurzen Link. Den teilst du per WhatsApp — einzeln oder in der Eltern-Gruppe. E-Mail oder andere Messenger funktionieren genauso.' },
      { q: 'Kann ich ein Foto vom Geburtstagskind einbauen?', a: 'Ja, optional. Mit Foto ist es im Spiel das Geburtstagskind selbst, das als Schurke das Schild klaut und von den Gästen geschnappt werden muss. Das Foto wird auf unserem Server gespeichert und nach 90 Tagen automatisch gelöscht.' },
      { q: 'Was passiert mit unseren Daten?', a: 'Name, Datum, Uhrzeit, Ort und WhatsApp-Nummer stecken direkt im Einladungslink — es gibt kein Konto und keine Datenbank dahinter. Nur ein optionales Foto liegt auf unserem Server und wird nach 90 Tagen automatisch gelöscht.' },
      { q: 'Kann ich die Superhelden-Einladung auch ausdrucken?',
        a: 'Diese Einladung ist für WhatsApp gebaut — das Mini-Spiel funktioniert nur digital. Für Papier-Einladungen findest du bei uns fertige <a href="/einladung/superheld/vorlagen/" class="inline">Superhelden-Einladungstexte</a> zum Abschreiben oder Selbstgestalten.',
        aPlain: 'Diese Einladung ist für WhatsApp gebaut — das Mini-Spiel funktioniert nur digital. Für Papier-Einladungen findest du bei uns fertige Superhelden-Einladungstexte zum Abschreiben oder Selbstgestalten.' }
    ],
    vorlagenMetaDesc: '7 fertige Superhelden-Einladungstexte für den Kindergeburtstag: kurz, lang, gereimt, für WhatsApp, Kita und Last-Minute. Zum Kopieren mit einem Klick — plus Checkliste, was in jede Einladung gehört.',
    vorlagenOgDesc: 'Fertige Superhelden-Einladungstexte für den Kindergeburtstag: kurz, lang, gereimt, für WhatsApp und Kita. Kostenlos kopieren.',
    ctaBoxText: 'Statt Text zum Abschreiben: eine digitale Superhelden-Einladung, in der deine Gäste den Schurken schnappen — und direkt per WhatsApp zusagen. Kostenlos, ohne Anmeldung.',
    vorlagen: [
      { h: 'Kurz & klassisch', meta: 'Für Papier-Einladungen und alle, die es schnörkellos mögen.',
        text: `Heldenalarm! {Name} wird {Alter} und stellt ein neues Superhelden-Team zusammen …

Wir feiern am {Datum} um {Uhrzeit} in {Ort}.

Sag uns bis zum {Zusage-Datum} Bescheid, ob du dabei bist: {Telefon}

Wir freuen uns auf dich!` },
      { h: 'Ausführlich — mit allen Infos für die Eltern', meta: 'Wenn du Abholzeit, Kleidung und Besonderheiten gleich mitklären willst.',
        text: `Die Stadt braucht dich!

{Name} wird {Alter} Jahre alt und lädt dich herzlich zum Superhelden-Geburtstag ein.

🗓 Wann: {Datum}, {Uhrzeit}
📍 Wo: {Ort}
🦸 Was dich erwartet: Helden-Training, Superhelden-Schatzsuche und Kuchen

Für die Eltern:
– Abholung um {Abholzeit}
– Bequeme Kleidung, die Action verträgt
– Umhang oder Helden-Shirt gern gesehen, aber kein Muss

Bitte gebt uns bis zum {Zusage-Datum} Bescheid, ob euer Kind dabei ist: {Telefon}

Wir freuen uns auf ein unschlagbares Helden-Team!
{Name der Eltern}` },
      { h: 'Gereimt', meta: 'Für alle, die es verspielt mögen — funktioniert auf Papier und im Messenger.',
        text: `Ein Blitz, ein Knall, ein lauter Schall —
ein Superheld fliegt überall!
{Name} wird {Alter}, die Stadt ruft dich:
„Ein Held wie du — der fehlt uns sicherlich!"

Am {Datum} um {Uhrzeit} startet das Training hier,
in {Ort} — Umhang an und ab zu mir!

Sag bis zum {Zusage-Datum} Bescheid, ob du zum Team gehörst:
{Telefon}` },
      { h: 'WhatsApp-Version', meta: 'Kurz, mit Emojis — direkt in die Eltern-Gruppe oder als Einzelnachricht.',
        text: `🦸⚡ HELDENALARM! ⚡🦸

{Name} wird {Alter} und feiert Superhelden-Geburtstag! 🎂

🗓 {Datum}
⏰ {Uhrzeit}
📍 {Ort}

Es gibt Helden-Training, eine Superhelden-Schatzsuche und natürlich Kuchen. 💥

Ist dein Kind dabei? Sag uns einfach kurz hier per WhatsApp Bescheid — am besten bis zum {Zusage-Datum}. 🙏` },
      { h: 'Für Kita oder Schule', meta: 'Neutraler Ton, richtet sich an die Eltern — gut zum Verteilen in der Gruppe.',
        text: `Liebe Eltern,

unser Sohn/unsere Tochter {Name} feiert am {Datum} seinen/ihren {Alter}. Geburtstag mit einer Superhelden-Party und möchte gern {Kind-Name} dazu einladen.

Wir feiern um {Uhrzeit} in {Ort}. Geplant sind Bewegungsspiele, eine Schatzsuche und Kuchen — bitte geben Sie Ihrem Kind bequeme Kleidung mit, die Action verträgt.

Über eine kurze Rückmeldung bis zum {Zusage-Datum} freuen wir uns: {Telefon}

Herzliche Grüße
{Name der Eltern}` },
      { h: 'Last-Minute', meta: 'Wenn die Einladung kurzfristig raus muss — ehrlich und charmant.',
        text: `Notruf aus der Heldenzentrale! 🚨

{Name} feiert schon am {Datum} Superhelden-Geburtstag ({Uhrzeit}, {Ort}) — und im Team ist noch ein Platz frei!

Kannst du dabei sein? Gib uns einfach schnell per WhatsApp Bescheid: {Telefon}

Je eher, desto besser — die Stadt wartet auf ihre Helden! 🦸` },
      { h: 'Mit Helden-Aufruf', meta: 'Wenn die Party von der Mission lebt — macht aus Gästen ein Helden-Team.',
        text: `Gesucht: Das mutigste Superhelden-Team der Stadt! 💥

{Name} wird {Alter} und eröffnet die Helden-Akademie:

🗓 {Datum}, {Uhrzeit}
📍 {Ort}

Deine Mission: Superkräfte trainieren, den Schurken schnappen und die Stadt retten. Kommt gern als eure Lieblingshelden — Umhang, Maske oder selbst erfundener Held, alles zählt! Wer keine Verkleidung hat, bekommt vor Ort eine Helden-Maske und gehört trotzdem zum Team.

Meldet euch bis zum {Zusage-Datum} bei uns: {Telefon}` }
    ]
  }
];
