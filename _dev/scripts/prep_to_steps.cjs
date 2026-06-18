// #34: prepText -> nummerierte steps fuer die einfachen Spiele (Wave 1: Feuerwehr + Einhorn)
// Inhalt faithful aus prepText zerlegt. Nur Spiele OHNE steps werden befuellt. Safety/Material bleiben.
const fs = require("fs");
const A = (c, m) => { if (!c) { console.error("ASSERT FAIL: " + m); process.exit(1); } };
const load = f => JSON.parse(fs.readFileSync("./data/motto/" + f + ".json", "utf8"));
const save = (f, d) => fs.writeFileSync("./data/motto/" + f + ".json", JSON.stringify(d, null, 2));
const FN = (n, name, content) => ({ n, name, content });   // feuerwehr-Format
const EN = (name, content) => ({ name, content });          // einhorn-Format

// name-substring -> steps[] ; optional safetyAdd (nur setzen wenn safetyRule fehlt)
const FEUER = [
  { re: /Helm-Bilder ausmalen/, steps: [
    FN(1, "Aufbauen", "5–6 ausgedruckte Feuerwehr-Ausmalbilder und dicke Filzstifte am Tisch verteilen."),
    FN(2, "Aussuchen", "Jedes Kind sucht sich ein Bild aus."),
    FN(3, "Ausmalen", "10–15 Min. ausmalen — kein Wettbewerb, kein „schön malen\", einfach machen."),
    FN(4, "Alles ist richtig", "Manche kritzeln, andere malen ordentlich — beides ist okay. Diese ruhige Pause ist bewusst eingeplant (Ankommen, runterkommen).")
  ]},
  { re: /Schaum-Löschen/, steps: [
    FN(1, "Aufbau", "Spielzeug-Tiere in die leere Wanne legen, großzügig Rasierschaum drüber. Alte Tischdecke unterlegen."),
    FN(2, "Story ankündigen", "„Hier sind Tiere im Schaum — wir müssen sie retten! Wer hat einen Pinsel und macht mit?\""),
    FN(3, "Pinsel verteilen", "Jedes Kind bekommt einen Pinsel oder eine Bürste."),
    FN(4, "Retten", "Gemeinsam die Tiere freipinseln — kein Wettbewerb, alle helfen zusammen."),
    FN(5, "Begleiten", "Eltern helfen den Kleinsten, wenn nötig. Danach Hände waschen.")
  ]},
  { re: /Helm-Bemalen/, steps: [
    FN(1, "Ankunfts-Station", "Pappkarton-Helme und dicke Stifte liegen schon auf dem Tisch (Tischdecke drunter)."),
    FN(2, "Bemalen", "Jedes Kind nimmt einen Helm und gestaltet ihn: rote Streifen, „112\", Feuerwehr-Aufkleber, Glitzer — was es will. Keine Vorgabe, keine Bewertung."),
    FN(3, "Eltern helfen", "Gerade 3-Jährige tun sich mit dem Filzstift-Druck schwer — Eltern dürfen unterstützen."),
    FN(4, "Der eigene Helm", "Kein Helm muss „gut\" werden — der Wert ist, dass es seiner ist. Der Helm bleibt den ganzen Tag auf dem Kopf.")
  ]},
  { re: /Spritz-Probe/, steps: [
    FN(1, "Aufbau", "Plastikbecher umgekehrt auf eine niedrige Bank oder den Boden stellen, je mit aufgemaltem Flammen-Symbol."),
    FN(2, "Aufstellen", "Crew-Mitglieder stehen 1 m entfernt, jedes mit einer Wasserspritzpistole (niedrigste Stufe)."),
    FN(3, "Löschen", "„Wir löschen die Brände!\" — alle spritzen gemeinsam auf die Becher, kein Wettbewerb."),
    FN(4, "Weiter geht's", "Wer einen Becher umlegt, kommt zurück und nimmt sich einen neuen Versuch.")
  ]},
  { re: /Feuerwehr-Bilderbuch/, steps: [
    FN(1, "Timing", "Bewusst zwischen Helm-Bemalen (ruhig) und Spritz-Probe (laut) legen — die Kinder sind danach fokussiert."),
    FN(2, "Aufstellung", "Du sitzt vorn mit dem Buch, die Kinder im Halbkreis, mit ihren fertigen Helmen auf dem Kopf."),
    FN(3, "Vorlesen", "Langsam vorlesen und die Bilder zeigen."),
    FN(4, "Mitreden lassen", "Kinder zwischendurch reagieren lassen: „Was siehst du?\", „Das machen die Feuerwehrleute da, oder?\"")
  ]},
  { re: /Bewertete Zeremonie/, steps: [
    FN(1, "Aufstellung", "Kinder setzen sich in einer Reihe, du stehst vorn — formal, aber nicht steif. Feierliche Stimmung."),
    FN(2, "Einzeln aufrufen", "Jedes Kind einzeln mit seiner Funktion UND einem konkreten Satz, was es heute geleistet hat."),
    FN(3, "Beispiel", "„Hanna, Strahlrohrführerin — du hast bei der Zielspritzen-Station drei Brände gelöscht. Hier dein Diplom.\""),
    FN(4, "Beispiel", "„Tom, Schlauchführer — du hast beim Einsatz als Erster ein Tier gefunden. Hier dein Diplom.\""),
    FN(5, "Überreichen", "Diplom übergeben, alle applaudieren. Jedes Kind kommt dran — niemand wird vergessen.")
  ]}
];
const EINHORN = [
  { re: /Sternenstaub suchen/, steps: [
    EN("Vorbereitung", "Reis mit essbarem Glitzer mischen, in die Wanne füllen, Einhorn-Figuren darin vergraben — immer MEHR Figuren als Kinder (5 Kinder → 8 Figuren)."),
    EN("Graben", "Jedes Kind bekommt einen Löffel und gräbt vorsichtig im Sternenstaub."),
    EN("Finden & behalten", "Wer ein Einhorn findet, darf es behalten. Durch die Überzahl findet jedes Kind mindestens eins — kein Frust."),
    EN("Rhythmus-Tipp", "Beruhigt nach dem Kuchen-Zucker-Hoch — perfekter ruhiger Block.")
  ]},
  { re: /Einhorn-Horn basteln/, steps: [
    EN("Vorbereitung (Erwachsene)", "Pappteller zur Kegel-Form rollen und tackern — das ist das Horn. 3-Jährige können das nicht selbst, also vorab erledigen."),
    EN("Verzieren", "Jedes Kind verziert sein Horn mit Glitzer-Kleber und Stickern."),
    EN("Befestigen", "Horn mit Gummiband am Kopf befestigen oder auf einen Haarreif kleben."),
    EN("Tipp", "Tisch vorher mit alter Zeitung abdecken — Glitzer geht nicht mehr raus.")
  ]},
  { re: /Regenbogen-Tanz/, steps: [
    EN("Tanzen", "Musik an → alle tanzen, hüpfen und galoppieren wie Einhörner."),
    EN("Einfrieren", "Musik aus → alle frieren ein wie Eisskulpturen!"),
    EN("Belohnen statt rauswerfen", "Wer sich noch bewegt, bekommt einen Glitzer-Aufkleber auf die Hand — eine Belohnung, kein Ausscheiden."),
    EN("Variante Regenbogen-Farben", "Eine Farbe rufen — alle müssen schnell etwas in dieser Farbe berühren und weitertanzen. Bunte Tücher zum Schwenken machen es magischer.")
  ]},
  { re: /Regenbogen-Milch-Experiment/, steps: [
    EN("Aufbau", "Milch in einen flachen Teller gießen, bis der Boden komplett bedeckt ist."),
    EN("Farbe tropfen", "Jedes Kind tropft eine Lebensmittelfarbe in die Mitte."),
    EN("Die Magie", "Ein Wattestäbchen in Spülmittel tunken und mitten in die Milch stippen — die Farben „explodieren\" in Regenbogen-Spiralen."),
    EN("Erklärung", "Das Spülmittel zerstört die Oberflächenspannung, das Fett „flieht\" vor der Seife und nimmt die Farben mit. Echte Physik, sieht aus wie Zauberei."),
    EN("Wiederholen", "Mit frischem Teller 3–4 Runden möglich, dann ist der Effekt weg (Milch gesättigt).")
  ]},
  { re: /Einhorn füttern/, steps: [
    EN("Vorbereitung (Erwachsene)", "Ein Einhorn-Gesicht mit großem offenem Maul (ca. 20 cm) auf den Karton malen und das Maul ausschneiden."),
    EN("Aufstellen", "Karton an die Wand lehnen oder auf einen Stuhl stellen."),
    EN("Füttern", "Die Kinder werfen reihum bunte Bälle ins Maul — „Luna hat Hunger!\"")
  ]},
  { re: /Einhorn-Zauberstab basteln/, steps: [
    EN("Vorbereitung (Erwachsene)", "Sterne aus Glitzerpappe ausschneiden und mit Heißkleber oben auf die Holzstäbe kleben."),
    EN("Bänder knoten", "Die Kinder knoten bunte Bänder an den Stab (du hilfst beim Knoten)."),
    EN("Verzieren", "Stab mit Glitzer-Kleber verzieren — fertig ist der Zauberstab.")
  ]},
  { re: /Regenbogen-Parcours/, steps: [
    EN("Aufbau", "Sechs farbige Tücher in Regenbogen-Reihenfolge auf den Boden legen (je ca. 1 m Abstand), am Ende ein Einhorn-Kuscheltier."),
    EN("Galoppieren", "Jedes Kind „galoppiert\" über den Regenbogen zum Einhorn, begrüßt es mit einer Verbeugung und galoppiert zurück."),
    EN("Varianten", "Rückwärts, auf einem Bein, als Staffel in 2 Teams oder zu zweit Hand in Hand."),
    EN("Trost-Regel", "Verlierer bekommen einen „Trost-Stern\" (Gummibärchen) — kein Kind geht leer aus.")
  ]},
  { re: /Einhorn-Seife gießen/, steps: [
    EN("Vorbereitung (Erwachsene)", "Glycerin-Seife in Würfel schneiden."),
    EN("Schmelzen", "Pro Kind einen Würfel in den Becher, 30 Sek. in die Mikrowelle → flüssig. WICHTIG: Nur Erwachsene handhaben den heißen Becher (~60 °C)."),
    EN("Gestalten", "Das Kind wählt eine Farbe (2 Tropfen), streut Glitzer dazu und gießt die Masse in sein Silikon-Förmchen."),
    EN("Auskühlen", "15 Min. auskühlen lassen, dann vorsichtig aus der Form drücken."),
    EN("Mitgeben", "Fertige Einhorn-Seife in eine Tüte mit Bändchen — geht als „verpacktes\" Mitgebsel nach Hause.")
  ]},
  { re: /Schmuck-Workshop/, steps: [
    EN("Auffädeln", "Jedes Kind fädelt sein eigenes Armband: Buchstaben-Perlen für den (Code-)Namen, dazwischen bunte Perlen in Regenbogenfarben."),
    EN("Charm dran", "Am Ende einen Einhorn-Charm anhängen."),
    EN("Anti-Rutsch-Trick", "Das Elastikband-Ende mit Klebeband am Tisch fixieren, dann rutschen die Perlen nicht runter."),
    EN("Abschluss", "Doppelknoten ans Ende, ein Tropfen Kleber drauf — hält ewig. Selbstläufer-Spiel: 40 Min. ruhiges Basteln.")
  ], safetyAdd: "Kleinteile (Perlen) — bei jüngeren Geschwistern außer Reichweite halten (Verschluckungsgefahr). Schere nur durch Erwachsene." },
  { re: /Einhorn-Kurzfilm drehen/, steps: [
    EN("Teams bilden", "2 Teams (z. B. 4 gegen 4)."),
    EN("Planen", "10 Min. planen: Wer spielt wen? Was ist die Story? Impuls: „Ein Schüler der Akademie entdeckt ein Geheimnis — zeigt, was passiert.\""),
    EN("Drehen", "15 Min. drehen — maximal 60 Sekunden Film pro Team."),
    EN("Premiere", "Am Ende beide Filme gemeinsam ansehen. Versand nur nach Eltern-Einverständnis (siehe Sicherheit).")
  ]},
  { re: /Meister-Urkunden/, steps: [
    EN("Vorbereiten", "Urkunden mit Header „Akademie der Vergessenen Magie\", Platz für Code-Name, Datum und „Hiermit wird ___ zum Meister der Vergessenen Magie ernannt.\""),
    EN("Stimmung", "Feierliche Musik an (z. B. „epic orchestral fantasy\")."),
    EN("Verleihen", "Jedes Kind einzeln aufrufen, Urkunde überreichen, alle applaudieren."),
    EN("Tipp", "Pergament-Papier oder Teebeutel-Trick (Papier in kaltem Tee färben, trocknen); Wachssiegel (nur durch Erwachsene) = nächstes Level.")
  ]}
];

function apply(motto, table) {
  let filled = 0, safety = 0;
  for (const age of ["klein", "mittel", "gross"]) {
    const f = motto + "-" + age; const d = load(f); let changed = false;
    for (const vk of Object.keys(d.variants || {})) for (const g of d.variants[vk].games || []) {
      if (g.steps && g.steps.length) continue;          // nur Prosa-Spiele
      const hit = table.find(t => t.re.test(g.name));
      if (!hit) continue;
      g.steps = JSON.parse(JSON.stringify(hit.steps));
      filled++; changed = true;
      if (hit.safetyAdd && !g.safetyRule) { g.safetyRule = hit.safetyAdd; safety++; }
    }
    if (changed) save(f, d);
  }
  return { filled, safety };
}

const fr = apply("feuerwehr", FEUER);
const er = apply("einhorn", EINHORN);
console.log("FEUERWEHR steps gefuellt:", fr.filled, "| EINHORN steps gefuellt:", er.filled, "Safety-add:", er.safety);

// Verify: 0 prepText-only mehr in feuerwehr+einhorn
let rest = 0;
for (const motto of ["feuerwehr", "einhorn"]) for (const age of ["klein", "mittel", "gross"]) {
  const d = load(motto + "-" + age);
  for (const vk of Object.keys(d.variants || {})) for (const g of d.variants[vk].games || [])
    if (!(g.steps && g.steps.length) && g.prepText) { console.log("  REST prepText-only:", motto + "/" + age, g.name); rest++; }
}
A(rest === 0, "0 prepText-only Spiele verbleibend (war " + rest + ")");
console.log("✅ Alle Wave-1-Prosa-Spiele haben jetzt nummerierte steps.");
