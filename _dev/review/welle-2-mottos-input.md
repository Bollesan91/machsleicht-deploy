# Adversarial-Review Input — Welle 2 Planer-Mottos (31.05.2026)

**Branch:** draft @ commit `5ff79c6`
**Datei:** `js/kindergeburtstag.js` (GENERIC-Array Erweiterungen)
**Review-Auftrag:** Adversarial-Review der 3 neuen/ersetzten Planer-Mottos im machsleicht-Tool. Score 0–100. Anti-Sycophancy-Modus: konservativ scoren. Stark unter 90, wenn Mängel da. Konkrete Zeilen-Findings mit Begründung.

## Review-Dimensionen

1. **Kindersicherheit** (40 % Gewicht):
   - EN-71-Kleinteilezylinder ~3,17 cm — alle Materialien für 3-5 J ≥4 cm?
   - Brandschutz: KEINE echten Flammen / Heißwachs / Brand-Kante (LED-Linie)?
   - Drahtarbeiten (Tiara): Erwachsenen-only + Bastel-Brille + im Tuch/Becher schneiden?
   - Allergene (Marzipan, Mandeln, Nüsse) gekennzeichnet?
   - Glas/Murmeln/Pailletten für 3-5 J ausgeschlossen?
   - DIN-EN-71-3 Spielsand (kein Quarzsand mit Feinanteil)?
   - Bogenschießen ab 6 mit Schutzbrille + 1:1 Aufsicht?
   - Pool-Nudel-Schwertkampf mit Pflicht-Regeln (kein Kopf, kein Knie, Brusthöhe max)?

2. **Inklusivität** (20 % Gewicht):
   - prinzessin / superheld: keine Gender-Splits (Mädchen=Etikette, Jungen=Schwert)?
   - Hofstaat / Held:innen-Rollen frei wählbar?
   - Gendering konsequent (Ritter:innen, Stallmeister:innen, Polier:innen)?

3. **Markenrechts-Sauberkeit** (15 % Gewicht):
   - prinzessin: keine Disney-Charaktere (Cinderella, Belle, Elsa, etc.)?
   - superheld: keine Marvel/DC-Charaktere (Spiderman, Avengers, Batman, etc.)?
   - Generic Story-Frames (historische Personen, eigene Helden-Identität)?

4. **Faktische Korrektheit** (15 % Gewicht):
   - Sissi 1837-1898 korrekt?
   - Queen Elizabeth II 70 Jahre Regentschaft (1952-2022) korrekt?
   - Ludwig XIV Sonnenkönig 72 Jahre korrekt?
   - Neuschwanstein ab 1869 korrekt?
   - Marianengraben ~10.994 m korrekt?
   - Sylvia Earle Meeresbiologin *1935 korrekt?

5. **Praktische Machbarkeit / Spielqualität** (10 % Gewicht):
   - Material-Listen realistisch?
   - Dauer-Angaben plausibel?
   - Anleitungen Schritt-für-Schritt klar?
   - Altersgerechtigkeit der Spiele zu Klein/Mittel/Gross?

---

## Motto 1 — meerjungfrau (Stub 0/0/0 → 3/3/3 ersetzt)

```js
{
  id: "meerjungfrau",
  name: "Meerjungfrau-Welt",
  emoji: "🧜‍♀️",
  color: "#26C6DA",
  cat: "generic",
  spiele: {
    klein: [
      {
        name: "Bunte Muschel-Jagd",
        desc: "Große Muscheln und Holz-Perlen ≥4 cm im Raum verstecken — Schatztaucher:innen sammeln.",
        material: "Große Plastik-Muscheln und Holz-/Filz-Perlen ≥4 cm (KEIN Glas, KEINE Mini-Pailletten), Stoff-Beutel pro Kind",
        anleitung: "1. Muscheln + Holzperlen im Raum/Garten verstecken (sichtbar genug für 3-Jährige). 2. Jedes Kind bekommt einen Beutel und sammelt 5 Stück. 3. Wer 5 hat, bekommt einen Meerjungfrau-Stempel. 4. ⚠ Großteile ≥4 cm verbindlich für 3-5 J, Erstickungsgefahr-Schwelle EN-71 ~3,17 cm.",
        dauer: 15,
      },
      {
        name: "Perlen-Fischen",
        desc: "Mit Sieb große Holz-/Filz-Perlen aus einer Wasserschüssel angeln.",
        material: "Große Holzperlen + Filz-Perlen ≥4 cm in Weiß/Blau (KEINE Glas-/Plastik-Murmeln für 3-5), 1 Wasserschüssel, 1 Plastik-Sieb pro Kind, Handtücher",
        anleitung: "1. Wasserschüssel mit 30-40 Großperlen füllen. 2. Jedes Kind 'fischt' mit Sieb 5 Perlen in 30 Sekunden. 3. Top-Fischer bekommt Perlentaucher:in-Stempel. 4. ⚠ KEINE Glas- oder kleine Plastik-Murmeln für 3-5 J.",
        dauer: 10,
      },
      {
        name: "Tuch-Wellen",
        desc: "Großes blaues Tuch hoch und runter bewegen — Stoffbälle als Fische darüber rollen.",
        material: "Großes blaues Tuch (Bettlaken), 8-10 Stoffbälle/Schaumstoffbälle als 'Fische'",
        anleitung: "1. Alle stehen im Kreis und halten Bettlaken am Rand. 2. Tuch hoch und runter bewegen = Meereswellen. 3. Stoffbälle drauflegen — sie 'schwimmen' wie Fische. 4. Wer schafft es, Fische über die Welle in die Hände eines anderen zu rollen? Toller Kreis-Moment.",
        dauer: 10,
      },
    ],
    mittel: [
      { name: "Sand & Schätze", desc: "Im DIN-EN-71-3 Spielsand verborgene Holz-Schätze ausgraben — wie Tiefsee-Archäologin.", material: "DIN-EN-71-3 Spielsand in flacher Wanne (KEIN Quarzsand mit Feinanteil), 10 versteckte Holz-Schätze (Holzperlen ≥4 cm, Holz-Anhänger), Pinsel + Kinder-Schaufeln", anleitung: "1. Schätze im Sand vergraben. 2. Kinder graben mit Pinsel + Schaufel (wie Archäolog:innen). 3. Gefundene Schätze in Stoffbeutel. 4. ⚠ Nur DIN-EN-71-3 Spielsand, kein Quarzsand-Feinanteil (Lungen-Risiko).", dauer: 20 },
      { name: "Team-Tauch-Challenge", desc: "2 Teams stafetteln: Holz-Perlen mit Strohhalm in Becher transportieren.", material: "Großperlen (Holz, ≥4 cm), Trinkhalme (dick), 2 leere Becher als Ziel, Stoppuhr", anleitung: "1. 2 Teams bilden. 2. Jedes Kind transportiert 1 Perle mit Strohhalm (saugen!) von A nach B. 3. Übergabe per Strohhalm an nächstes Team-Mitglied. 4. Welches Team hat in 3 Min. mehr Perlen drüben? 5. ⚠ Strohhalm darf nicht in Mund gerammt werden — Aufsicht.", dauer: 20 },
      { name: "Ozean-Stopp", desc: "Tanzen zu Meeres-Musik — bei Stopp Statue bleiben.", material: "Bluetooth-Box, Meeres-/Unterwasser-Sounds, evtl. blaue Tücher", anleitung: "1. Musik anschalten. 2. Kinder tanzen wie Meerjungfrauen/Schwimmer. 3. Bei Stopp: Statue bleiben. 4. Wer wackelt, scheidet aus. 5. Sieger:in wird Wellen-Champion. 6. 5-7 Runden.", dauer: 15 },
    ],
    gross: [
      { name: "Riff-Expedition (Schatzsuche)", desc: "6 Stationen-Schatzsuche mit Ozean-Rätseln — vom Marianengraben bis zum Korallenriff.", anleitung: "Rätsel-Themen: Marianengraben ~10.994 m tief, Korallenriff-Symbiose, Tiefsee-Druck. Team-Arbeit — Top-3 bekommen Tiefsee-Forscher:innen-Stempel.", dauer: 30 },
      { name: "Tiefsee-Mission", desc: "Wettkampf-Olympiade: 5 Disziplinen mit Tiefsee-Theme.", anleitung: "Quiz: Welcher Tiefsee-Fisch leuchtet (Anglerfisch), Wie tief ist der Marianengraben (~10.994 m), Wer war Sylvia Earle (Meeresbiologin, *1935)? Punkte addieren, Top-3 bekommen Mini-Pokale.", dauer: 30 },
      { name: "Choreo der Tiefsee", desc: "Eigene Tanz-Choreografie zu Unterwasser-Musik einstudieren und vorführen.", dauer: 25 },
    ],
  }
}
```

## Motto 2 — prinzessin (NEU: generic Reskin "Königreich & Hofstaat")

```js
{
  id: "prinzessin",
  name: "Königreich & Hofstaat",
  emoji: "👑",
  color: "#E91E63",
  cat: "generic",
  spiele: {
    klein: [
      { name: "Glitzer-Krönchen-Werkstatt", material: "Goldkarton-Krönchen, Großperlen ≥4 cm aus Holz/Filz (KEIN Glas, KEINE Pailletten), Glitzer-Streifen, Tacker", anleitung: "⚠ Für 3-5 J nur Großteile ≥4 cm — EN-71-Kleinteilezylinder ~3,17 cm Schwelle.", dauer: 15 },
      { name: "Juwelen-Jagd (≥4 cm)", material: "Plastik-Edelsteine + Holzperlen ≥4 cm (KEINE Glasperlen, KEINE Murmeln für 3-5)", anleitung: "⚠ Glaselemente erst ab 6 J + nur in homogener Altersgruppe.", dauer: 15 },
      { name: "Höfische Aufgaben (inklusiv)", anleitung: "Aufgaben frei wählbar (kein Gender-Split). Höfische Verbeugung, Blumen-Hofgarten, sanfter Königinnen-Tanz. Pro Aufgabe 1 Stempel — am Ende Krönung.", dauer: 15 },
    ],
    mittel: [
      { name: "Kronen-Atelier", anleitung: "Krone aus Schablone selbst zuschneiden. Federn, kleine Blumen, Glassteine (ab 6 J!). Glaselemente ab 6 OK.", dauer: 25 },
      { name: "Schatzkarte zur Schlossruine", anleitung: "Karte mit Kaffeebeutel betupfen + leicht am Rand reiben (KEINE Brand-Kante — Brandschutz konsistent LED-Linie).", dauer: 25 },
      { name: "5 Königliche Prüfungen", anleitung: "Tisch-Etikette, Buch-Balance, Erbsen-Prinzessin, Märchen-Pantomime, Rosen-Memory. Urkunde und Krönung für alle.", dauer: 25 },
    ],
    gross: [
      { name: "Königliche Schmuck-Manufaktur (Tiara)", material: "Silberdraht ab 0,8 mm, Glasperlen (ab 9 J), Bastel-Brille für ALLE in Reichweite, Seitenschneider, Tuch/Becher zum Schneiden", anleitung: "1. Drahtschneiden AUSSCHLIESSLICH durch Erwachsene. 2. Alle in Reichweite tragen Bastel-Brille. 3. Drahtenden im Tuch/Becher schneiden (Geschoss-Risiko). 4. Danach Enden nach innen umbiegen. ⚠ Glaselemente erst ab 9, nicht für jüngere Geschwister im Raum lassen.", dauer: 30 },
      { name: "Hofgeheimnis (Krimi)", anleitung: "Hofdame, Stallmeister, Hofnarr, Ritter:in, Burgfräulein — alle Rollen offen für alle (kein Gender-Split).", dauer: 35 },
      { name: "Elite-Hofschule", material: "Schaumstoff-Schwerter, Pergament-Rollen + Gold-Sticker (KEIN Heißwachs!), Sticker-Siegel statt Siegelwachs", anleitung: "7 Stationen, alle frei wählbar. Wissens-Quiz: Sissi (1837-1898), Queen Elizabeth II 70 Jahre Regentschaft, Ludwig XIV 72 Jahre, Neuschwanstein ab 1869. Wiener Walzer 3/4-Takt. ⚠ KEIN echtes Heißwachs/Siegelwachs — Gold-Sticker als Siegel-Ersatz.", dauer: 35 },
    ],
  }
}
```

## Motto 3 — superheld (NEU: generic Reskin "Held:innen-Akademie")

```js
{
  id: "superheld",
  name: "Held:innen-Akademie",
  emoji: "🦸",
  color: "#1976D2",
  cat: "generic",
  spiele: {
    klein: [  // 4-5 Jahre (NICHT 3-5)
      { name: "Helden-Starter-Set basteln", material: "Bettlaken oder Stoffe für Capes, Filz-Augenmasken vorgeschnitten, Gummiband, Stifte, große Sticker ≥4 cm", anleitung: "Jedes Kind wählt eigene Held:innen-Identität (Name, Superkraft). Cape um Schulter knoten (NICHT um Hals — Strangulationsgefahr). ⚠ Sticker ≥4 cm, keine Kleinteile für 4-5 J.", dauer: 20 },
      { name: "Helden-Grundausbildung", anleitung: "Tunnel (Decke über Stühle), niedriger Sprung (max. 10 cm!), Ziel-Werfen mit Schaumstoffbällen. Held:innen-Urkunde am Ende.", dauer: 20 },
      { name: "Mission: Kuchen retten", anleitung: "Story-Mission — 'Schurke hat Kuchen entführt!' 3 große Bildhinweise nacheinander. Held:innen retten den Tag.", dauer: 15 },
    ],
    mittel: [
      { name: "Helden-Design-Studio", anleitung: "Logo-Skizze + Cape selbst designen + bemalen mit Stoff-Stiften. Helden-Name + Superkraft.", dauer: 25 },
      { name: "Helden-Bootcamp", anleitung: "5 Stationen: Liegestütz (5 für Klein-Mittel, 10 für Mittel-Gross), Slalom, Ziel-Werfen, Geheim-Code, Tugend-Quiz (Was tun Held:innen? helfen, ehrlich sein, mutig sein).", dauer: 25 },
      { name: "Fall: Die verschwundene Stadt", anleitung: "Mini-Krimi. 5 Hinweise + 3 Verdächtige (Erwachsene als Schauspielende).", dauer: 30 },
    ],
    gross: [
      { name: "Heldenidentität-Kit (volles Set)", anleitung: "Cape + Augenmaske + Helden-Pass (Name, Superkraft, Schwäche, Tugend-Versprechen) + Origin-Story in 5 Sätzen.", dauer: 35 },
      { name: "Elite-Helden-Akademie", anleitung: "8 Stationen: Krafttraining (Liegestütz/Plank), Code-Knack (Caesar-Verschlüsselung), Geschicklichkeit, Tugend-Quiz, Pose-Foto. Top-3 bekommen Bronze/Silber/Gold-Akademie-Urkunde.", dauer: 35 },
      { name: "Operation: Nemesis", anleitung: "Komplexer Krimi mit 6 Hinweisen + Zahlenschloss + Schatzkiste. Team das knackt, rettet die Stadt.", dauer: 40 },
    ],
  }
}
```

---

## Output-Format

```
SCORE GESAMT: XX/100
SCORE meerjungfrau: XX/100
SCORE prinzessin: XX/100
SCORE superheld: XX/100

MUST-FIX (≥ 90 nicht erreicht ohne diese):
1. [Motto] [Zeile/Spiel] — [konkretes Finding] — [Reasoning]
2. ...

SHOULD-FIX (Score-Lift):
1. ...

OK (Stärken):
1. ...
```

Konservativ scoren. Score ≥ 90 nur wenn keine Sicherheits-/Inklusivitäts-/Faktenmängel.
