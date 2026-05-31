// Helper-Skript: 6 fehlende SZ_THEMES (meerjungfrau/pferde/ritter/baustelle/prinzessin/superheld) hinzufügen.
// Liest line 1 (minified), parsed SZ_THEMES, fügt 6 hinzu, schreibt zurück mit JSON.stringify (JS-valid).

const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', '..', 'js', 'kindergeburtstag.js');
const code = fs.readFileSync(FILE, 'utf8');
const lines = code.split('\n');
const line1 = lines[0];

// Extract SZ_THEMES array literal via regex, evaluate as expression
const szMatch = line1.match(/^var SZ_THEMES\s*=\s*(\[.+?\]);/);
if (!szMatch) {
  console.error('FAIL: Could not extract SZ_THEMES array literal');
  process.exit(1);
}
const SZ_THEMES = new Function('return ' + szMatch[1])();

console.log('Before: SZ_THEMES count =', SZ_THEMES.length);
console.log('Existing IDs:', SZ_THEMES.map(t => t.id).join(', '));

// 6 neue Themen — generic Reskins für prinzessin/superheld, neue Themen für die anderen
const newThemes = [
  {
    id: "meerjungfrau",
    name: "Meerjungfrau-Schatzsuche",
    emoji: "\u{1F9DC}‍♀️",
    color: "#26C6DA",
    intro: {
      klein: "Die kleine Meerjungfrau hat ihre Muschelkrone verloren! {name}, hilf ihr, die magischen Schätze im Riff zu finden.",
      mittel: "Ein altes Schiff ist im Korallenriff gesunken. {name}, der Schatz wartet auf mutige Tiefseeforscher:innen — folge den Strömungen!",
      gross: "Im Marianengraben (ca. 10.994 m tief) liegt ein verschollener Schatz. {name}, knacke die Codes der Ozean-Pionierin Sylvia Earle und finde ihn."
    },
    stations: {
      klein: [
        { name: "Muschel-Großperlen finden", desc: "5 große Muscheln oder Holzperlen ≥4 cm (KEIN Glas!) im Garten/Raum verstecken — Schatztaucher:innen sammeln.", dauer: 8, typ: "suchen", hint: "Großteile ≥4 cm Pflicht für 3-5 J (EN-71-Schwelle ~3,17 cm)." },
        { name: "Perlen-Fischen aus flacher Schüssel", desc: "Mit Sieb Großperlen aus einer Wasserschüssel (max. 5 cm tief!) angeln — Aufsicht 1:3 in Armreichweite.", dauer: 8, typ: "geschick", hint: "Wasserhöhe MAXIMAL 5 cm, nie ohne Erwachsene neben Kind." },
        { name: "Meerjungfrau-Schwanz basteln", desc: "Aus altem Tuch eine Meerjungfrau-Flosse falten und mit Glitzer-Stickern ≥4 cm verzieren.", dauer: 12, typ: "basteln", hint: "Tuch flach falten, große Sticker, kein Heißkleber für Kinder." },
        { name: "Welle-im-Tuch", desc: "Bettlaken im Kreis halten, Stoffbälle als Fische darüber rollen lassen — wer schafft die Übergabe?", dauer: 8, typ: "geschick", hint: "Toller Gruppen-Moment, kann mehrfach wiederholt werden." },
        { name: "Schatzkiste im Korallenriff", desc: "Schuhkarton in Blau/Türkis, gefüllt mit Mitgebseln und Schoko-Muscheln — der finale Wow-Moment.", dauer: 5, typ: "finale", hint: "Schuhkarton vorher mit Blaupapier bekleben + Muschel-Streudeko." }
      ],
      mittel: [
        { name: "Sand & Schätze", desc: "In zertifiziertem DIN-EN-71-3 Spielsand (Hagebau/Hornbach/OBI Marke prüfen!) verborgene Holz-Schätze ausgraben — wie Tiefsee-Archäologin.", dauer: 15, typ: "suchen", hint: "KEIN Quarzsand mit Feinanteil. Hände nach Spiel waschen." },
        { name: "Team-Tauch-Challenge", desc: "Holz-Großperlen ≥4 cm mit dickem Strohhalm (8 mm) per VAKUUM transportieren — NIE in den Strohhalm einsaugen.", dauer: 15, typ: "geschick", hint: "Vorher Vakuum-Prinzip erklären (Perle außen ansaugen), Inhalations-Risiko vermeiden." },
        { name: "Ozean-Stopp-Tanz", desc: "Zu Meeres-Sounds tanzen wie Meerjungfrauen — bei Stopp Statue bleiben.", dauer: 10, typ: "geschick", hint: "Unterwasser-Musik aus Spotify/YouTube, 5-7 Runden." },
        { name: "Korallen-Riff-Memory", desc: "Memory mit Bildkarten von Riff-Bewohnern: Korallen, Anemonen, Clownfisch, Seestern, Krake.", dauer: 12, typ: "geschick", hint: "12 Karten-Paare, ggf. selbst gemalt oder ausgedruckt." },
        { name: "Schatzkiste mit Meerjungfrau-Mitgebseln", desc: "Truhe gefüllt mit kleinen Geschenken + Foto-Pose mit Flosse + Stempel-Pass.", dauer: 8, typ: "finale", hint: "Echte Pose-Möglichkeit machen — Eltern lieben die Fotos." }
      ],
      gross: [
        { name: "Riff-Expedition (6 Stationen)", desc: "6 Rätsel-Stationen: Korallenriff-Symbiose, Tiefsee-Druck-Physik, Plankton-Nahrungskette, Strandfunde, Strömungen, Marianengraben-Tiefe. Pro Rätsel Hinweis auf nächste Station.", dauer: 30, typ: "suchen", hint: "Marianengraben-Tiefe nur 1× als Faktum nennen — andere Rätsel diversifizieren." },
        { name: "Tiefsee-Mission-Quiz", desc: "Quiz: Welcher Tiefsee-Fisch leuchtet (Anglerfisch)? Wer ist Sylvia Earle (geb. 1935, US-Ozeanographin, Aquanautin, Gründerin Mission Blue)? Wie heißt das tiefste Meer (Marianengraben)?", dauer: 15, typ: "geschick", hint: "Fakten kindgerecht — keine Detail-Überforderung." },
        { name: "Choreo der Tiefsee", desc: "Eigene Tanz-Choreografie zu Unterwasser-Musik einstudieren und vorführen (Teams à 2-3 Kinder, 15 Min Einstudier-Zeit).", dauer: 25, typ: "geschick", hint: "Applaus-Abstimmung, alle bekommen Choreograph:in-Stempel." },
        { name: "Schatzkarten-Entschlüsselung", desc: "Schatzkarte mit Caesar-Verschlüsselung — Teams entschlüsseln die Koordinaten zum Schatz.", dauer: 20, typ: "suchen", hint: "Verschlüsselung um 3 Buchstaben verschoben — Hilfs-Tabelle bereitlegen." },
        { name: "Tiefsee-Schatz-Truhe öffnen", desc: "Finale: Truhe mit Mitgebseln + Foto-Shooting in voller Meerjungfrau-Montur + Urkunde mit echtem Sticker-Siegel.", dauer: 10, typ: "finale", hint: "Sticker-Siegel statt Heißwachs! Eltern fotografieren oder eigenes Stativ." }
      ]
    },
    material: {
      klein: [
        "Plastik-Muscheln + Holz-Großperlen ≥4 cm (KEIN Glas, KEIN <4 cm)",
        "Flache Wasserschüssel (max. 5 cm Wasserhöhe) + Plastik-Siebe + Handtücher",
        "Altes Tuch/Bettlaken + Glitzer-Sticker ≥4 cm + Klebepunkte",
        "Stoffbälle/Schaumstoffbälle als Fische + großes blaues Bettlaken",
        "Schuhkarton in Blau/Türkis + Mitgebsel + Schoko-Muscheln"
      ],
      mittel: [
        "Zertifizierter Spielsand (DIN-EN-71-3, Hagebau/Hornbach/OBI) + 10 Holz-Schätze + Pinsel + Schaufeln + flache Wanne",
        "Holz-Großperlen ≥4 cm + dicke Trinkhalme (8 mm Durchmesser) + 2 Becher + Stoppuhr",
        "Bluetooth-Box + Unterwasser-Musik + blaue Tücher (optional)",
        "12 Memory-Karten-Paare (Riff-Bewohner) + ggf. Stoppuhr",
        "Schatzkiste + Meerjungfrau-Mitgebsel + Stempel-Pass + Foto-Möglichkeit"
      ],
      gross: [
        "6 Rätsel-Karten + Stoff-Beutel pro Kind + UV-Stift (optional) + Schatzkiste",
        "Quiz-Karten zu Tiefsee-Themen + Hilfs-Tabellen",
        "Bluetooth-Box + ruhige Unterwasser-Musik + Spiegel (optional) + blaue Tücher",
        "Caesar-Code-Tabelle + Schatzkarte + Stifte + Papier",
        "Truhe + Mitgebsel + Foto-Stativ + Sticker-Siegel + Urkunden"
      ]
    },
    schatz: [
      "Mini-Meerjungfrau-Figuren",
      "Muschel-Ketten (Großperlen ≥4 cm)",
      "Tattoos mit Meeres-Motiven",
      "Glitzer-Aufkleber (Riff-Motive)",
      "Schoko-Goldmünzen (Schatz-Optik)"
    ]
  },
  {
    id: "pferde",
    name: "Pferde-Schatzsuche",
    emoji: "\u{1F434}",
    color: "#5D4037",
    intro: {
      klein: "Sternchen, das Lieblings-Pferd, hat seine goldenen Hufeisen verloren! {name}, hilf, sie wiederzufinden.",
      mittel: "Der Stallmeister hat eine verschollene Pokal-Schatulle im Reiterhof versteckt. {name}, folgt der Spur und löst die Stationen.",
      gross: "Beim FN-Lehrgang ist die Reiter:innen-Lizenz im Stall verschwunden. {name}, findet die Hinweise zwischen Sattelkammer und Reithalle."
    },
    stations: {
      klein: [
        { name: "Hufeisen-Wurf (Mini-Pokal)", desc: "3 Plastik-Hufeisen oder Frisbees auf einen Pfosten werfen — Top-3 bekommen Mini-Pokal aus Becher + Goldfolie.", dauer: 10, typ: "geschick", hint: "1,5 m Entfernung für 3-5 J, KEIN Eisen-Hufeisen, nur Plastik." },
        { name: "Pferde-Rasse-Memory", desc: "12 Karten-Paare: Schimmel/Rappe/Brauner/Falbe/Schecke/Haflinger zuordnen.", dauer: 10, typ: "geschick", hint: "Schimmel = Fellfarbe (nicht Rasse!), selbst gemalt OK." },
        { name: "Hufeisen aus Pappe basteln", desc: "Vorgeschnittene Pappe-Hufeisen mit Goldfarbe + Bändern + Großperlen ≥4 cm verzieren.", dauer: 12, typ: "basteln", hint: "KEINE Kleinteile <4 cm für 3-5 J." },
        { name: "Karotten-Snack-Station", desc: "Karotten in Sticks schneiden + verteilen — kleine Pferde-Häppchen für die Reiter:innen.", dauer: 5, typ: "basteln", hint: "Erwachsene schneidet! Allergie-Check vorher." },
        { name: "Sternchen-Stall finden", desc: "Schatzkiste als Stall (Schuhkarton mit Stroh-Optik aus Streifen) — gefüllt mit Mitgebseln.", dauer: 5, typ: "finale", hint: "Stroh aus gelbem Papier streifen, sicht-süß." }
      ],
      mittel: [
        { name: "Reiter:innen-Parcours", desc: "5 Stationen mit Pool-Nudel-Pferden: Slalom, niedriger Sprung (max. 10 cm!), Volte, Trab-Strecke, Galopp-Sprint mit Stoppuhr.", dauer: 20, typ: "geschick", hint: "Sprünge bodennah halten — KEINE echten Hindernisse. Pool-Nudel + Stoppuhr." },
        { name: "Stallmeister:innen-Quiz", desc: "10 Fragen: Hufrehe? Giftige Pflanzen (Jakobskreuzkraut/Eibe/Bergahorn)? Stockmaß (Pony bis 148 cm, darüber Pferd)?", dauer: 12, typ: "geschick", hint: "Quiz-Karten vorbereiten, Stempel pro richtiger Antwort." },
        { name: "Pferde-Pflege-Station", desc: "Plüsch-Pferd mit Bürste putzen, Halftern, Mähne flechten — Pflege-Workshop.", dauer: 15, typ: "basteln", hint: "Großes Plüschpferd ausleihen oder kaufen, Bürsten + Bänder." },
        { name: "Hufeisen-Wurf Team-Bonus", desc: "2 Teams treten gegeneinander an — 9 Hufeisen-Würfe pro Team, schnellstes + treffstärkstes Team bekommt Bonus-Stempel.", dauer: 12, typ: "geschick", hint: "KEIN Doppel-Pokal — Mini-Pokale gehen an Einzel-Top-3 in Klein-Variante." },
        { name: "Pokal-Schatulle finden", desc: "Versteckte Schatulle mit Mini-Pokal + Pferde-Mitgebseln — Finale der Schatzsuche.", dauer: 5, typ: "finale", hint: "Schatulle im Stall-Bereich verstecken, sichtbare Hinweise." }
      ],
      gross: [
        { name: "Reiter:innen-Lizenz-Quiz", desc: "12 Stationen: Anatomie, Versorgung, Pflege, Sicherheit, Pflanzenkunde, Recht. Pro Frage Stempel im Lizenz-Heft.", dauer: 25, typ: "suchen", hint: "10+ Stempel = Reiter:innen-Lizenz mit Datum + Unterschrift." },
        { name: "Großer Hindernisparcours", desc: "8 Stationen Pool-Nudel-Pferd: Slalom + 4 niedrige Sprünge + Volte + Wassergraben (blaues Tuch) + Zielsprint. Jury aus 2 Erwachsenen.", dauer: 25, typ: "geschick", hint: "Zeit + Stil-Noten. Top-3 bekommen Mini-Pokale." },
        { name: "Stall-Wissens-Olympiade", desc: "5 Disziplinen: Hufeisen-Wurf + Quiz + Parcours + Putz-Box-Sortierung + Pferde-Puzzle. Punkte addieren.", dauer: 30, typ: "geschick", hint: "Punktekarten + Top-3 Mini-Pokale + Bonus-Stempel im Lizenz-Heft." },
        { name: "Reiter:innen-Karte entschlüsseln", desc: "Versteckte Schatzkarte (Kaffee-gefärbt — KEINE Brand-Kante!) führt zur finalen Trophäe.", dauer: 15, typ: "suchen", hint: "Brandschutz: KEINE Brand-Kante, nur Kaffee/Tee-Färbung + leichtes Reiben." },
        { name: "Stallmeister:innen-Pokal", desc: "Finale: großer Wanderpokal-Cup + Reiter:innen-Lizenz-Heft + Mitgebsel.", dauer: 10, typ: "finale", hint: "Größerer Pokal aus dem 1€-Laden, mit Bändern verziert." }
      ]
    },
    material: {
      klein: ["Plastik-Hufeisen + Pfosten + Mini-Pokal-Becher + Goldfolie", "12 Memory-Karten (Pferderassen) selbst gemalt oder ausgedruckt", "Pappe-Hufeisen + Goldfarbe + Bänder + Großperlen ≥4 cm", "Karotten + Schneidbrett (Erwachsene schneidet)", "Schatzkiste als Stall (Schuhkarton + Stroh-Optik)"],
      mittel: ["5 Pool-Nudeln + 6 Hütchen + 2 Pappstreifen-Sprünge + Stoppuhr", "10 Quiz-Karten + Pferde-Sticker + Stempel-Pass", "Plüsch-Pferd + Bürsten + Bänder + Halftern", "9 Hufeisen + 2 Stoppuhren + Bonus-Stempel", "Versteckte Schatulle + Mini-Pokal + Pferde-Mitgebsel"],
      gross: ["12 Quiz-Karten + Lizenz-Heft (DIN A6) + Stempel + Stift pro Kind", "8 Pool-Nudeln + 10 Hütchen + 4 Pappsprünge + blaues Tuch + Stoppuhr", "Stationen-Material aus anderen Spielen + Punktekarten", "Schatzkarte (Kaffee-gefärbt) + Hinweis-Karten + Stifte", "Wanderpokal-Cup + Lizenz-Heft + Mitgebsel-Beutel"]
    },
    schatz: ["Mini-Pferdefiguren", "Pferde-Sticker", "Hufeisen-Magnete (Pappe + Goldfarbe)", "Reiter:innen-Pässe als Mitgebsel", "Schoko-Goldmünzen"]
  },
  {
    id: "ritter",
    name: "Ritter-Schatzsuche",
    emoji: "⚔️",
    color: "#37474F",
    intro: {
      klein: "Auf der Burg ist die goldene Krone des Königs verschwunden! {name}, zieh dein Wappen an und finde sie wieder.",
      mittel: "Die Tafelrunde sucht neue Ritter:innen. {name}, bestehe 5 Prüfungen — Schwertkampf, Bogen, Heraldik — und werde geschlagen.",
      gross: "Im alten Burgturm liegt ein Geheimnis. {name}, knacke die Heraldik-Codes von Jeanne d'Arc und Margarete von Anjou und finde das verschollene Wappenbuch."
    },
    stations: {
      klein: [
        { name: "Wappen-Malen (max. 2 Farben + 1 Metall)", desc: "Eigenes Familien-Wappen entwerfen mit Heraldik-Regel: max. 2 Farben + 1 Metall wirkt edel. Adler=Stärke, Eule=Weisheit (NICHT Adler=Weisheit!).", dauer: 12, typ: "basteln", hint: "Pappschilde vorgeschnitten + Buntstifte + Schablonen." },
        { name: "Pool-Nudel-Schwertkampf (Pflicht-Regeln!)", desc: "Sichere Pool-Nudel-Duelle: kein Schlag auf Kopf/Gesicht/Knie, max. Brusthöhe, 1:1 Aufsicht.", dauer: 12, typ: "geschick", hint: "Pool-Nudel = sicherstes Übungsschwert, KEIN Spielzeug-Pass für Holz/Plastik!" },
        { name: "Ritter-Tanz mit Trommeln", desc: "Zur Mittelalter-Musik tanzen + auf umgedrehten Eimern trommeln — Stopp-Tanz.", dauer: 10, typ: "geschick", hint: "Mittelalter-Spielmannsklänge aus YouTube/Spotify." },
        { name: "Marzipan-Snack-Station (Allergie-Check!)", desc: "Marzipan-Würfel oder Burg-Kekse — VOR Spielstart Mandel-/Nuss-Allergien abfragen.", dauer: 5, typ: "basteln", hint: "Bei Allergie: Brezel-Stangen-Alternative bereitstellen." },
        { name: "Burg-Schatz finden", desc: "Schatzkiste als Burg-Truhe (Schuhkarton mit Steinmauer-Druck) — gefüllt mit Mitgebseln.", dauer: 5, typ: "finale", hint: "Steinmauer aus grauem Papier oder Tonpapier-Streifen." }
      ],
      mittel: [
        { name: "Burg-Eroberung mit Schaumstoff-Bällen", desc: "2 Teams: 1 verteidigt Pappkarton-Burg, 1 erobert. 20 Schaumstoff-Bälle, 3-Min-Runden.", dauer: 20, typ: "geschick", hint: "Nur Schaumstoff-Bälle, KEINE harten. Aufsicht aktiv." },
        { name: "Bogenschießen ab 6 (Schutzbrille Pflicht!)", desc: "Kinder-Bogen mit Saugnapf-Pfeilen, Zielscheibe. Schutzbrille für ALLE in Reichweite, 1:1 Aufsicht.", dauer: 15, typ: "geschick", hint: "PFLICHT: Schutzbrille auch für Wartende. Pro Kind 3 Pfeile." },
        { name: "Ritter-Schlag-Zeremonie", desc: "Jedes Kind kniet vor König/Königin (Erwachsene:r) + bekommt Spruch + Urkunde + Ritter-Name (Sir/Lady + Vorname).", dauer: 10, typ: "basteln", hint: "Sehr wichtiger emotionaler Moment, Foto für Eltern." },
        { name: "Heraldik-Memory", desc: "12 Karten-Paare: Wappensymbole (Adler/Eule/Löwe/Drache/Lilie/Kreuz) zuordnen + Bedeutung erklären.", dauer: 12, typ: "geschick", hint: "Adler=Stärke, Eule=Weisheit, Löwe=Mut, Drache=Wachsamkeit." },
        { name: "Burg-Schatz-Truhe öffnen", desc: "Finale: Truhe mit Ritter:innen-Urkunde + Mitgebseln + Wappen-Kette zum Mitnehmen.", dauer: 8, typ: "finale", hint: "Truhe mit Steinmauer-Aufdruck, sicht-cool für Kinder." }
      ],
      gross: [
        { name: "Tafelrunde-Quiz (20 Fragen)", desc: "Fragen: Jeanne d'Arc (1412-1431)? Margarete von Anjou (1430-1482, Lancaster)? Höhenburg vs Niederungsburg (Wasserburg=Untertyp)? Tinkturregel max. 2 Farben + 1 Metall?", dauer: 25, typ: "geschick", hint: "Tinkturregel ist VERBINDLICH (Heraldik), nicht nur Stil!" },
        { name: "Heraldik-Werkstatt", desc: "Echtes Wappen entwerfen mit Heraldik-Lineal + Skizze + Reinzeichnung + Devise. Tinkturregel beachten.", dauer: 25, typ: "basteln", hint: "Farbe auf Farbe oder Metall auf Metall ist VERBOTEN (Tinkturregel)." },
        { name: "Ritter:innen-Olympiade", desc: "5 Disziplinen: Schwertkampf + Bogen + Heraldik-Quiz + Burgeroberung + Pool-Nudel-Pferd. Bronze/Silber/Gold-Urkunden.", dauer: 30, typ: "geschick", hint: "Alle bekommen mind. Teilnahme-Urkunde — niemand geht leer aus." },
        { name: "Wappenbuch entschlüsseln", desc: "Versteckte Schatzkarte mit Heraldik-Codes — Teams entschlüsseln und finden das verschollene Buch.", dauer: 20, typ: "suchen", hint: "Codes basieren auf Wappensymbol-Bedeutung." },
        { name: "Tafelrunde-Finale + Diplom", desc: "Großer Tisch mit Tafelrunde-Lagerschwert + Diplom + Wappen-Anhänger zum Mitnehmen.", dauer: 10, typ: "finale", hint: "Sehr feierlicher Abschluss — Eltern fotografieren." }
      ]
    },
    material: {
      klein: ["Pappschilde + Buntstifte (rot, blau, grün, schwarz, gold, silber) + Heraldik-Schablonen", "Pool-Nudeln (1 pro Kind, 80 cm) + ggf. Pappschilde", "Eimer-Trommeln + Bluetooth-Box + Mittelalter-Musik", "Marzipan-Würfel ODER Brezel-Stangen (Allergie-Alternative) + Pflicht-Allergie-Check vorher", "Schatzkiste als Burg-Truhe (Schuhkarton + grauer Papier-Steinmauer)"],
      mittel: ["2 Pappkartons als Burgmauer + 20 Schaumstoff-Bälle + Krepp-Markierungen", "Kinder-Bogen (CE) + Saugnapf-Pfeile + Zielscheibe + Schutzbrillen für ALLE + Absperrband", "Pool-Nudel als Zeremonien-Schwert + Ritter-Urkunden + Stempel", "12 Memory-Karten (Wappensymbole) + Erklärtafel zu Bedeutung", "Schatz-Truhe + Ritter:innen-Urkunden + Wappen-Kette + Mitgebsel"],
      gross: ["20 Quiz-Karten + Lizenz-Heft + Stempel + Schreibmaterial", "Pappschilde + Heraldik-Lineal + Buntstifte + Heraldik-Bild-Lexikon + Tinkturregel-Erklärung", "Stationen-Material aus anderen Spielen + Bronze/Silber/Gold-Urkunden", "Schatzkarte mit Heraldik-Codes + Decoder-Tabelle", "Tafelrunde-Lager + Diplome + Wappen-Anhänger"]
    },
    schatz: ["Mini-Ritter-Figuren", "Ritter-Sticker", "Wappen-Anhänger (Pappe + Goldfolie)", "Schaumstoff-Schwerter (Mitgebsel)", "Schoko-Goldmünzen"]
  },
  {
    id: "baustelle",
    name: "Baustellen-Schatzsuche",
    emoji: "\u{1F6A7}",
    color: "#E65100",
    intro: {
      klein: "Auf der Baustelle ist ein wichtiges Werkzeug verschwunden! {name}, zieh deinen Helm an und such mit dem Bautrupp.",
      mittel: "Polierin Lisa hat die Baupläne im Schuppen verloren. {name}, folgt den Stationen — vom Sandkasten bis zur Materialkammer.",
      gross: "Auf der Großbaustelle gab es Sabotage. {name}, mit 4 Hinweisen und 2 Verdächtigen (Polierin + Elektrikerin) löst ihr den Fall."
    },
    stations: {
      klein: [
        { name: "LKW-Parcours", desc: "Spielzeug-LKWs durch Hindernis-Parcours fahren — Slalom + niedrige Pappstreifen + Stoppuhr.", dauer: 10, typ: "geschick", hint: "Hindernisse niedrig (max. 5 cm), keine echten Bagger nötig." },
        { name: "Holzklötze-Turm bauen", desc: "Wer baut höchsten Turm in 2 Min? KEINE Lego/Duplo-Kleinteile für 3-5 J wegen Verschluckrisiko.", dauer: 8, typ: "geschick", hint: "Holzklötze ≥4 cm sind sicher. Lego erst ab 6 für ältere Variante." },
        { name: "Schaufel-Wettrennen (zertifizierter Spielsand!)", desc: "DIN-EN-71-3 Spielsand (Hagebau/OBI Marke prüfen) mit Mini-Schaufeln von A nach B transportieren — KEIN Quarzsand!", dauer: 10, typ: "geschick", hint: "Hände waschen nach Spielende. KEIN Baustellen-Sand essen." },
        { name: "Helm-Bastel-Station", desc: "Bauarbeiter-Spielhelm verzieren mit Stickern ≥4 cm + Name aufkleben — eigener Bautrupp-Helm.", dauer: 10, typ: "basteln", hint: "Spielhelme als Set kaufen (Amazon/1€-Laden), keine Schwerlast-Helme nötig." },
        { name: "Baustellen-Schatz finden", desc: "Schatzkiste mit Absperrband-Wickel + Mitgebseln — Bautrupp-Finale.", dauer: 5, typ: "finale", hint: "Schuhkarton + Absperrband (rot-weiß) = sehr authentisch." }
      ],
      mittel: [
        { name: "Bau-Plan-Werkstatt mit Lot/Senkblei", desc: "Schaumstoff-Bausteine + Senkblei (Schnur + Stein) + Wasserwaage — Mauer bauen + Lotrechte prüfen. Zug- vs Druckkräfte erklären (NICHT 'Tinkturregel' — das ist Heraldik!).", dauer: 20, typ: "basteln", hint: "Bauplan-Vorlage 5 Reihen × 6 Steine. Senkblei = einfaches Werkzeug." },
        { name: "Material-Sortier-Wettkampf", desc: "Box mit 50 Schrauben/Muttern/Nägeln ≥4 cm nach Größe sortieren — KEINE Kleinteile, KEINE Knopfzellen-LED in Reichweite!", dauer: 12, typ: "geschick", hint: "Schrauben ab M6 / 4 cm. Knopfzellen-LED = Verschluckungs-Risiko!" },
        { name: "Helm-Parcours (Helm-Pflicht!)", desc: "Mit Bauarbeiter-Spielhelm durch Hindernisparcours — über/unter/durch — Sicherheit zuerst.", dauer: 15, typ: "geschick", hint: "PFLICHT: alle tragen Helm. Lernanker = Helm ist nicht optional." },
        { name: "Bauarbeiter:innen-Quiz", desc: "10 Fragen: Welcher Helm? Welcher Schraubenschlüssel? Welche Maschine? Was ist eine Polierin?", dauer: 10, typ: "geschick", hint: "Inkl. Berufsbild-Klarstellung — Polierin/Elektrikerin = Frauen-Berufe-Sichtbarkeit." },
        { name: "Baustellen-Schatz: Bauplan-Truhe", desc: "Truhe mit Baupläne + Mitgebseln + Bauarbeiter:innen-Stempel-Pass.", dauer: 8, typ: "finale", hint: "Baupläne aus altem Papier mit Linien-Vorlage." }
      ],
      gross: [
        { name: "Architektur-Challenge (Brücken-Bau)", desc: "2 Teams bauen Brücke aus Kartons + Pappe + Heißkleber (Erwachsene!). Bewertet: Stabilität (5 Bücher draufstellen!), Spannweite, Detail-Treue.", dauer: 35, typ: "basteln", hint: "Brücken-Inspiration: Bogen-/Hänge-/Balken-Brücke. Erwachsene führt Heißkleber!" },
        { name: "Sabotage-Lösung (Krimi)", desc: "Mauer eingerissen — 2 Verdächtige (Polierin + Elektrikerin, KEIN 'Maurer Frank' — das ist Halluzination!), 4 Hinweise. Team löst gemeinsam.", dauer: 25, typ: "suchen", hint: "Erwachsene als Schauspielende für Befragungen. Lösung am Ende." },
        { name: "Polier:in-Prüfung (Bauarbeiter:innen-Lizenz)", desc: "12 Quiz-Stationen: Werkzeug, Material, Lot/Senkblei, Helmpflicht, DIN-EN-71-3-Sand, Schrauben-Größen.", dauer: 25, typ: "geschick", hint: "10+ Stempel = Bauarbeiter:innen-Lizenz mit Datum + Unterschrift." },
        { name: "Bauplan entschlüsseln", desc: "Versteckte Schatzkarte mit Baustellen-Codes (Symbole) — Teams entschlüsseln + finden den Schatz.", dauer: 20, typ: "suchen", hint: "Codes: Zahlen = Anzahl, Symbole = Werkzeug-Bedeutung." },
        { name: "Großbaustellen-Finale: Bauarbeiter:innen-Truhe", desc: "Große Truhe mit Bauarbeiter:innen-Lizenz + Mitgebseln + Mini-Bagger-Modell pro Kind.", dauer: 10, typ: "finale", hint: "Mini-Bagger aus Spielzeug-Set, sehr beliebt." }
      ]
    },
    material: {
      klein: ["5-8 Spielzeug-LKWs/Bagger + Krepp-Straße + niedrige Pappstreifen", "Holzklötze ≥4 cm (KEINE Lego für 3-5 J) + Zollstock", "Zertifizierter Spielsand (Hagebau/OBI mit DIN-EN-71-3) + Mini-Schaufeln + Eimer + Schüsseln", "Spielhelme (Set 6 Stk., Amazon) + Sticker ≥4 cm + Namens-Sticker", "Schatzkiste mit Absperrband-Wickel + Bauarbeiter:innen-Mitgebsel"],
      mittel: ["30 Schaumstoff-Bausteine + Senkblei (Schnur + Stein) + Wasserwaage + Bauplan-Vorlage", "Box mit 50 Schrauben/Muttern/Nägeln ≥4 cm + Sortier-Tabletts + Stoppuhr", "Spielhelme + 5 Hindernisse + Krepp-Bahn", "10 Quiz-Karten + Bauarbeiter:innen-Sticker + Stempel-Pass", "Truhe + Baupläne (auf altem Papier) + Mitgebsel + Stempel-Pass"],
      gross: ["Umzugskartons + Pappe + Heißklebepistole (Erwachsene!) + Stoff + Bücher als Belastungstest + Stoppuhr", "Hinweis-Karten (vorbereitete Story) + 2 Verdächtige-Karten + Notizblöcke", "12 Quiz-Karten + Bauarbeiter:innen-Lizenz-Heft + Stempel + Stift", "Schatzkarte mit Baustellen-Codes + Decoder-Tabelle + Stifte", "Truhe + Bauarbeiter:innen-Lizenz + Mini-Bagger-Modelle (Mitgebsel-Set)"]
    },
    schatz: ["Mini-Baufahrzeuge", "Bauarbeiter-Sticker", "Mini-Helm-Anhänger", "Bauarbeiter:innen-Lizenz-Hefte", "Schoko-Schraubenmuttern"]
  },
  {
    id: "prinzessin",
    name: "Königreich-Schatzsuche",
    emoji: "\u{1F451}",
    color: "#E91E63",
    intro: {
      klein: "Im Königreich ist die Hofstaat-Krone verloren gegangen! {name}, hilf bei der Suche durchs Schloss.",
      mittel: "Die Royals planen ein Krönungsfest, aber der Schmuck ist verschollen. {name}, folgt den Spuren durch Thronsaal und Rosengarten.",
      gross: "Im Schloss-Archiv liegt ein Geheimnis. {name}, mit Hilfe von Sissi (1837-1898), Queen Elizabeth II und Ludwig XIV könnt ihr die Krone wiederfinden."
    },
    stations: {
      klein: [
        { name: "Glitzer-Krönchen-Werkstatt", desc: "Goldkarton-Krönchen mit Großperlen ≥4 cm (KEIN Glas, KEINE Pailletten) + Glitzer-Streifen — Tacker AUSSCHLIESSLICH durch Erwachsene!", dauer: 15, typ: "basteln", hint: "Tacker = Quetsch-Risiko, nur Erwachsene benutzen." },
        { name: "Juwelen-Jagd ≥4 cm", desc: "Große bunte Plastik-Edelsteine + Holzperlen ≥4 cm im Raum verstecken — KEIN Glas/Murmeln/Pailletten für 3-5 J.", dauer: 12, typ: "suchen", hint: "EN-71-Kleinteilezylinder ~3,17 cm, 4 cm konservativer Puffer." },
        { name: "Höfische Aufgaben (inklusiv)", desc: "Höfische Verbeugung üben + Blumen-Hofgarten gestalten + sanfter Königinnen-Tanz — kein Gender-Split.", dauer: 12, typ: "basteln", hint: "Alle Aufgaben frei wählbar für alle Kinder." },
        { name: "Tee-Etikette-Snack", desc: "Mini-Tee-Service mit Bonbons (Hartbonbons NICHT für ≤4 J — Erstickungsrisiko!).", dauer: 8, typ: "basteln", hint: "Bei jüngsten Kindern: Bonbons klein klopfen oder weglassen." },
        { name: "Krönungs-Truhe finden", desc: "Schatzkiste mit goldenen Bändern + Mitgebseln + Krone als Mitgebsel pro Kind.", dauer: 5, typ: "finale", hint: "Schuhkarton mit Goldpapier + Glitzer = königlich." }
      ],
      mittel: [
        { name: "Kronen-Atelier (Alters-Check vor Spiel!)", desc: "Krone selbst zuschneiden + Federn + Glassteine (nur wenn homogen 6+ ohne jüngere Geschwister im Raum) — sonst Plastik-Edelsteine ≥4 cm.", dauer: 20, typ: "basteln", hint: "ALTERSGRUPPEN-CHECK vor Spielstart Pflicht!" },
        { name: "Schatzkarte zur Schlossruine (Kaffee, KEINE Brand-Kante!)", desc: "Alte Schatzkarte mit Kaffee-/Tee-Färbung + leichtem Reiben am Rand — KEINE Brand-Kante (Brandschutz konsistent LED-Linie).", dauer: 18, typ: "suchen", hint: "Brandschutz: NIEMALS Feuer für Kinder-Bastelei." },
        { name: "5 Königliche Prüfungen (Allergie-Check!)", desc: "Tisch-Etikette + Buch-Balance + Erbsen-Prinzessin (Allergie-Alternative: Holzkugel ≥4 cm bei Hülsenfrucht-Allergie!) + Pantomime + Memory.", dauer: 18, typ: "geschick", hint: "VOR Spielstart Allergien abfragen (Hülsenfrüchte/Pollen/Hausstaub)." },
        { name: "Hofstaat-Memory", desc: "12 Karten-Paare: Königin/König, Hofdame, Hofnarr, Ritter:in, Burgfräulein — Rollen frei wählbar.", dauer: 12, typ: "geschick", hint: "Memory-Karten selbst gemalt oder ausgedruckt." },
        { name: "Königliche Schatztruhe", desc: "Truhe mit Hofstaat-Mitgebseln + Krone + Diplom für jedes Kind.", dauer: 8, typ: "finale", hint: "Truhe groß genug für alle Mitgebsel, mit Goldpapier verziert." }
      ],
      gross: [
        { name: "Königliche Schmuck-Manufaktur (Tiara mit Glas ab 9!)", desc: "Tiara aus Silberdraht — Drahtschneiden AUSSCHLIESSLICH durch Erwachsene, ALLE in Reichweite mit Bastel-Brille, im Tuch/Becher schneiden. Glaselemente in Box GLAS-AB-9J separat!", dauer: 30, typ: "basteln", hint: "Nach Spielende SOFORT Glas-Box schließen + verstauen!" },
        { name: "Hofgeheimnis (Krimi)", desc: "Krimi am Königshof: Hofdame, Stallmeister, Hofnarr, Ritter:in, Burgfräulein — alle Rollen offen für alle (kein Gender-Split).", dauer: 30, typ: "suchen", hint: "Befragungen + Spurensuche + Rätselbuch — Team-Arbeit." },
        { name: "Elite-Hofschule (7 Stationen, frei wählbar)", desc: "Wissens-Quiz: Sissi (1837-1898 ermordet Genf), Queen Elizabeth II (1952-2022 = 70 Jahre), Ludwig XIV (1643-1715 = 72 Jahre), Neuschwanstein 1869. Walzer 3/4-Takt. Versiegelung: Gold-Sticker/Kaltleim+Stempel/Gold-Stift (KEIN Heißwachs!).", dauer: 35, typ: "geschick", hint: "Alle Stationen frei wählbar, kein Gender-Split." },
        { name: "Schloss-Schatzkarte entschlüsseln", desc: "Versteckte Karte mit Adel-Symbol-Codes — Teams entschlüsseln und finden die königliche Truhe.", dauer: 20, typ: "suchen", hint: "Symbole = Wappen-Tiere mit Bedeutung." },
        { name: "Königliches Finale: Krönung", desc: "Großer Tisch mit Krönungs-Schwert + Diplom + Krone + Schmuck-Set pro Kind.", dauer: 10, typ: "finale", hint: "Sehr emotionaler Moment, Foto-Pose-Möglichkeit." }
      ]
    },
    material: {
      klein: ["Goldkarton-Krönchen + Großperlen ≥4 cm + Glitzer-Streifen + Tacker (Erwachsenen-Werkzeug!)", "Großperlen ≥4 cm (Holz/Filz) + Samtbeutel pro Kind + Bonbon-Belohnung", "Spiegel + 5-6 Blumen + Gläser + klassische Musik (Bluetooth-Box) + Prinzessinnen-Pass", "Mini-Tee-Service + Bonbons (klein geklopft für ≤4 J) + Allergie-Check vorher", "Schatzkiste mit Goldpapier + Bändern + Mitgebseln (Krone als Beigabe)"],
      mittel: ["Goldkarton-Schablonen + Schere + Federn + Goldstift + Klebstoff + ALTERSGRUPPEN-CHECK-Anweisung", "Schatzkarte (Kaffee-/Tee-gefärbt) + 5 Rätsel-Karten + Schatzkiste mit Mitgebseln", "Teetasse + Buch + Erbsen + Allergie-Alternative (Holzkugel ≥4 cm) + Märchen-Karten + Memory-Karten", "12 Memory-Karten (Hofstaat-Rollen) + Erklärtafel", "Truhe + Hofstaat-Mitgebsel + Krone + Diplome"],
      gross: ["Silberdraht 0,8 mm + Glasperlen (NUR in Box GLAS-AB-9J!) + Bastel-Brille für ALLE + Seitenschneider + Tuch/Becher zum Schneiden", "Krimi-Story + Rollen-Karten + Hinweis-Karten + Notizblöcke + Schatzkiste", "Quiz-Karten + Walzer-Musik (3/4-Takt) + Tee-Set + Schaumstoff-Schwerter + Pergament-Rollen + Versiegelungs-Alternativen (Gold-Sticker / Kaltleim+Stempel / Gold-Stift)", "Schatzkarte mit Adel-Codes + Decoder-Tabelle", "Krönungs-Schwert + Diplome + Kronen + Schmuck-Set pro Kind"]
    },
    schatz: ["Mini-Kronen (Goldkarton)", "Prinzessinnen-Sticker", "Samtbeutel mit Goldschnur", "Schmuck-Set (Kette + Armreif)", "Schoko-Goldmünzen"]
  },
  {
    id: "superheld",
    name: "Held:innen-Schatzsuche",
    emoji: "\u{1F9B8}",
    color: "#1976D2",
    intro: {
      klein: "Ein Schurke hat das Geburtstagsgeschenk versteckt! {name}, zieh Cape und Maske an — die Held:innen-Akademie braucht dich.",
      mittel: "Die Held:innen-Akademie sucht neue Mitglieder. {name}, beweis dich in Bootcamp, Code-Knacken und Tugend-Quiz — du wirst zum/zur Held:in.",
      gross: "Erznemesis bedroht die Stadt. {name}, mit 6 Hinweisen und einem Zahlenschloss könnt ihr die Pläne durchkreuzen — Operation: Nemesis."
    },
    stations: {
      klein: [
        { name: "Helden-Starter-Set (ab 4 J, Klett-Verschluss!)", desc: "Cape aus Bettlaken mit Klett-Verschluss vorne (NICHT um Hals knoten — Strangulationsgefahr!) + Augenmaske aus Filz + große Sticker ≥4 cm.", dauer: 18, typ: "basteln", hint: "MINDESTALTER 4 Jahre wegen Cape-Strangulation. Cape abnehmen bei Verfangen-Gefahr." },
        { name: "Helden-Grundausbildung", desc: "3 Stationen: Tunnel-Lauf (Decken über Stühle) + niedriger Sprung (max. 10 cm!) + Ziel-Werfen mit Schaumstoffbällen.", dauer: 15, typ: "geschick", hint: "Bodennah halten, KEINE echten Sprünge. Schaumstoff-Bälle only." },
        { name: "Mission: Kuchen retten", desc: "Story-Mission: Schurke hat Kuchen entführt! 3 große Bildhinweise führen zum Versteck.", dauer: 12, typ: "suchen", hint: "Bilder vor Party verstecken — alle Kinder retten zusammen." },
        { name: "Helden-Pose-Foto-Station", desc: "Jedes Kind macht 3 Helden-Posen — Eltern fotografieren für Pose-Foto.", dauer: 8, typ: "basteln", hint: "Sehr beliebt, eigenes Stativ oder Eltern fotografieren." },
        { name: "Held:innen-Truhe öffnen", desc: "Schatzkiste in Cape-Farben mit Mitgebseln + Helden-Urkunde pro Kind.", dauer: 5, typ: "finale", hint: "Truhe mit Stern-/Blitz-Aufdruck — sehr beliebt." }
      ],
      mittel: [
        { name: "Helden-Design-Studio", desc: "Eigenes Helden-Logo + Cape designen + bemalen mit Stoff-Stiften + Held:innen-Name + Superkraft notieren.", dauer: 22, typ: "basteln", hint: "Stoff-Stifte aus Bastelladen, Capes vorbereiten." },
        { name: "Helden-Bootcamp (altersgerecht!)", desc: "Krafttraining: Wand-Liegestütz für 6-7 J (KEINE Boden-Liegestütz wegen Wirbelsäulen-Risiko!) — Erwachsene führt VOR + korrigiert Haltung.", dauer: 18, typ: "geschick", hint: "Bei Schmerz oder unsicher: pausieren, KEIN Druck." },
        { name: "Fall: Die verschwundene Stadt (Mini-Krimi)", desc: "5 Hinweise + 3 Verdächtige (Erwachsene als Schauspielende) — Team löst gemeinsam.", dauer: 20, typ: "suchen", hint: "Story spannend gestalten, alle Kinder mitnehmen." },
        { name: "Tugend-Quiz", desc: "Was tun Held:innen? helfen, ehrlich sein, mutig sein, andere verteidigen. Stempel pro richtiger Antwort.", dauer: 12, typ: "geschick", hint: "Pädagogisch wertvoll, Held:innen-Pass mit Stempeln." },
        { name: "Helden-Akademie-Truhe", desc: "Truhe mit Held:innen-Urkunde + Mitgebseln + Cape-Sticker zum Aufnähen.", dauer: 8, typ: "finale", hint: "Truhe mit Akademie-Logo, sehr offizielles Gefühl." }
      ],
      gross: [
        { name: "Heldenidentität-Kit (volles Set)", desc: "Cape + Augenmaske + Helden-Pass (Name, Superkraft, Schwäche, Tugend-Versprechen) + Origin-Story in 5 Sätzen + Vor-der-Gruppe-Vorstellen.", dauer: 30, typ: "basteln", hint: "Origin-Story = pädagogisch wertvoll, Identitäts-Aufbau." },
        { name: "Elite-Helden-Akademie (8 Stationen)", desc: "Krafttraining + Code-Knack (Caesar-Verschlüsselung) + Geschicklichkeits-Parcours + Tugend-Quiz + Pose-Foto für Akademie-Wand.", dauer: 32, typ: "geschick", hint: "Top-3 bekommen Bronze/Silber/Gold-Akademie-Urkunde." },
        { name: "Operation: Nemesis (Komplex-Krimi)", desc: "6 Hinweise mit aufbauender Logik + Zahlenschloss + Schatzkiste. Team das knackt, rettet die Stadt.", dauer: 35, typ: "suchen", hint: "Hinweise sollten Logik haben, Caesar-Verschlüsselung beliebt." },
        { name: "Held:innen-Manifest schreiben", desc: "Jedes Team schreibt ein 'Helden-Manifest' mit Tugend-Codex + Notfall-Plan für die Stadt.", dauer: 15, typ: "basteln", hint: "Pädagogisch reflektiv — Tugenden besprechen + niederschreiben." },
        { name: "Finale: Akademie-Auszeichnung", desc: "Großer Tisch mit Helden-Akademie-Urkunden + Mitgebseln + Cape-Sticker + Pose-Foto-Wall.", dauer: 12, typ: "finale", hint: "Sehr feierlich — Akademie-Mauer mit Posen-Fotos für Eltern-Foto." }
      ]
    },
    material: {
      klein: ["Bettlaken/Stoffe für Capes (1 pro Kind, mit Klett-Verschluss vorne!) + Filz-Augenmasken + Gummiband (2 Finger Abstand) + Stifte + Sticker ≥4 cm", "Decken + 2 Stühle als Tunnel + niedriger Pappstreifen + Schaumstoffbälle + Eimer als Ziel", "3 große Bildhinweise (vor Party verstecken) + Kuchen", "Eltern-Stativ oder Smartphone für Foto-Station", "Schatzkiste in Cape-Farben + Mitgebseln + Helden-Urkunden"],
      mittel: ["Weiße Capes + Stoff-Stifte + Schablonen (Blitz, Stern, Schild) + Papier für Skizze + Helden-Pass-Vorlage", "Yoga-Matten + Wand-Markierung + Hütchen für Slalom + Schaumstoffbälle + Code-Karten + Quiz-Karten", "5 Hinweis-Karten + 3 Verdächtige (Erwachsene) + Lösungs-Karte + Notizblöcke", "Tugend-Quiz-Karten + Held:innen-Pass + Stempel", "Truhe mit Akademie-Logo + Mitgebsel + Cape-Sticker"],
      gross: ["Capes + Filz-Masken + Helden-Pass (DIN A6) + Origin-Story-Vorlage + Stoff-Stifte", "Wie Bootcamp + Code-Karten (Caesar) + Foto-Kamera + Kostüm-Accessoires + Bronze/Silber/Gold-Urkunden", "6 Hinweis-Karten mit aufbauender Logik + Zahlenschloss (3-stellig) + Schatzkiste + Notizbuch pro Team", "Papier + Stifte + Vorlage für Manifest + Tugend-Codex-Vorlage", "Akademie-Urkunden + Mitgebsel + Cape-Sticker + Pose-Foto-Wall (Papier-Wand mit Akademie-Logo)"]
    },
    schatz: ["Cape + Maske Set 6 Stk.", "Helden-Sticker", "Held:innen-Pässe", "Mini-Helden-Figuren", "Schoko-Sterne"]
  }
];

const allThemes = [...SZ_THEMES, ...newThemes];
console.log('After: SZ_THEMES count =', allThemes.length);
console.log('Final IDs:', allThemes.map(t => t.id).join(', '));

// Serialize as JSON (which is valid JS subset)
const newThemesStr = 'var SZ_THEMES = ' + JSON.stringify(allThemes) + ';';

// Replace in line 1: from "var SZ_THEMES = [...];" to new
// SZ_THEMES ends at offset 45408 (";")  before "var" of next variable
const endOfSzThemes = line1.indexOf('}];') + 3;
const restOfLine1 = line1.slice(endOfSzThemes);
const newLine1 = newThemesStr + restOfLine1;

lines[0] = newLine1;
const newCode = lines.join('\n');

// Parse-only validation (don't evaluate due to React/JSX dependencies)
try {
  new Function(newCode);
  console.log('OK: Syntax parse valid after replacement');
} catch (e) {
  console.error('FAIL parse:', e.message);
  process.exit(1);
}

// Verify new themes are findable by parsing new line 1
const newMatch = newLine1.match(/^var SZ_THEMES\s*=\s*(\[.+?\]);/);
const TEST_SZ_THEMES = new Function('return ' + newMatch[1])();
console.log('Verify ALL 15 themes present:');
['piraten','dschungel','weltraum','detektiv','dino','feen','safari','einhorn','feuerwehr','meerjungfrau','pferde','ritter','baustelle','prinzessin','superheld'].forEach(id => {
  const t = TEST_SZ_THEMES.find(x => x.id === id);
  console.log('  '+id+':', t ? 'OK ('+t.stations.klein.length+'/'+t.stations.mittel.length+'/'+t.stations.gross.length+' stations)' : 'MISSING');
});

fs.writeFileSync(FILE, newCode);
console.log('Written to', FILE);
