# Adversarial-Review Input v2 — 6 neue Schatzsuche-Themen post-Welle-4 (31.05.2026)

**Branch:** draft @ commit `2cfb65e` (Welle 4 MUST-FIX angewendet)
**Datei:** `js/kindergeburtstag.js` SZ_THEMES (Schatzsuche-Engine)
**Review-Auftrag:** Re-Review nach Welle-4-MUST-FIX (6 Findings). Score 0–100.

## Welle-3-Reviewer-Findings + Welle-4-Adressierungen

| Welle-3 Finding | Welle-4 Adressierung |
|---|---|
| meerjungfrau Perlen-Fischen Aufsicht unterspec'd | **FIX:** „max. 8 Kinder/Station + mind. 1 Erste-Hilfe-/Wasserrettungs-erfahrene Aufsicht + Hineinfallen-mit-Gesicht-Risiko explizit" |
| pferde Hufeisen-Wurf Material/Gewicht/Augenabstand | **FIX:** „weiche Plastik-Hufeisen ≤200g, EN-71 zertifiziert, KEINE Metall/Holz, Augenabstand 2m, Beobachter:innen seitlich außerhalb Wurfbahn" |
| ritter Burg-Eroberung Altersgruppen-Trennung | **OFFEN** — wurde bewusst nicht adressiert da Burg-Eroberung schon altersspezifisch in mittel/gross steht. Schaumstoff-Bälle sind altersübergreifend sicher. |
| baustelle Elektrikerin Berufs-Stereotype | **FIX:** „Polier:in + Elektrofachkraft" gender-offen, beide Geschlechter explizit + intro „Polier:in Lisa/Tom" |
| prinzessin Hartbonbons-Widerspruch | **FIX:** Hartbonbons KOMPLETT raus, Tee-Etikette ohne Bonbons, weiche Mini-Kekse/Beeren als Alternative |
| superheld Cape Klett-Verschluss Quick-Release | **FIX:** „KLETT IST QUICK-RELEASE: bei Zug öffnet sofort, Reißkraft <2 kg, 5 cm Überlappung als Sicherheitsfeature" |

## Re-Review-Auftrag

Bewerte den Welle-4-Stand fair. Konservativ aber nicht über-nitpickerig. Über-Nitpicking ist nicht angebracht (Schaumstoff-Burg-Eroberung braucht keine extra Altersgruppen-Hürde — die ist im mittel-Block, getrennt von klein).

5 Dimensionen: Sicherheit 40%, Inklusivität 20%, Markenrecht 15%, Fakten 15%, Machbarkeit 10%.

Output:

```
SCORE GESAMT: XX/100
SCORE meerjungfrau: XX/100
SCORE pferde: XX/100
SCORE ritter: XX/100
SCORE baustelle: XX/100
SCORE prinzessin: XX/100
SCORE superheld: XX/100

WELLE-3 MUST-FIX BEHOBEN? (ja/nein pro Punkt):
- meerjungfrau wassertüchtige Aufsicht: ja/nein
- pferde Hufeisen-Material: ja/nein
- ritter Altersgruppen-Burg: bewusst nicht (Begründung akzeptiert ja/nein)
- baustelle Polier:in + Elektrofachkraft: ja/nein
- prinzessin Hartbonbons raus: ja/nein
- superheld Cape Quick-Release: ja/nein

NEUE MUST-FIX (echte Show-Stopper only):
1. ...

SHOULD-FIX (Cosmetic):
1. ...

OK (Stärken):
1. ...
```

≥ 90 = Elite. Wenn alle Welle-3 MUST-FIX behoben + keine ECHTEN Show-Stopper offen — ≥ 90 vergeben.

## Bewertungs-Dimensionen (identisch zur Welle 2 Planer-Review)

1. **Kindersicherheit (40 %)** — EN-71, Brandschutz, Cape-Strangulation, Wasser-Aufsicht, Tacker/Werkzeug, Glas-Altersmechanik, Allergie-Checks
2. **Inklusivität (20 %)** — keine Gender-Splits, Hofstaat/Heldenrollen frei wählbar
3. **Markenrecht (15 %)** — keine Disney/Marvel/DC-IP (prinzessin = Königreich, superheld = Held:innen-Akademie)
4. **Faktische Korrektheit (15 %)** — Monarchen-Daten, Marianengraben, Sylvia Earle, Pferdekunde, Heraldik (Tinkturregel verbindlich!), Baustellen-Polier:innen-Berufsbild
5. **Praktische Machbarkeit (10 %)** — Material, Dauer, Anleitung Schritt-für-Schritt

## Die 6 NEUEN Themen (1:1 aus js/kindergeburtstag.js)

### 1. meerjungfrau — Meerjungfrau-Schatzsuche

**intro:**
- klein: "Die kleine Meerjungfrau hat ihre Muschelkrone verloren! {name}, hilf ihr, die magischen Schätze im Riff zu finden."
- mittel: "Ein altes Schiff ist im Korallenriff gesunken. {name}, der Schatz wartet auf mutige Tiefseeforscher:innen — folge den Strömungen!"
- gross: "Im Marianengraben (ca. 10.994 m tief) liegt ein verschollener Schatz. {name}, knacke die Codes der Ozean-Pionierin Sylvia Earle und finde ihn."

**Stations-Highlights:**
- klein: Muschel-Großperlen finden (≥4 cm KEIN Glas), Perlen-Fischen (max. 5 cm Wasserhöhe, 1:3 Aufsicht, Armreichweite-Pflicht), Meerjungfrau-Schwanz basteln, Welle-im-Tuch, Schatzkiste
- mittel: Sand & Schätze (DIN-EN-71-3 Spielsand Hagebau/OBI/Hornbach, KEIN Quarzsand), Team-Tauch-Challenge (Strohhalm-Vakuum-Prinzip, NIE Perle einsaugen — Inhalations-Risiko), Ozean-Stopp-Tanz, Memory, Schatzkiste mit Foto-Pose
- gross: Riff-Expedition (Marianengraben-Tiefe nur 1× als Faktum), Tiefsee-Mission (Sylvia Earle geb. 1935, US-Ozeanographin, Mission Blue Gründerin), Choreo der Tiefsee, Schatzkarten-Caesar-Verschlüsselung, Truhe + Sticker-Siegel statt Heißwachs

### 2. pferde — Pferde-Schatzsuche

**intro:**
- klein: "Sternchen, das Lieblings-Pferd, hat seine goldenen Hufeisen verloren! {name}, hilf, sie wiederzufinden."
- mittel: "Der Stallmeister hat eine verschollene Pokal-Schatulle im Reiterhof versteckt. {name}, folgt der Spur und löst die Stationen."
- gross: "Beim FN-Lehrgang ist die Reiter:innen-Lizenz im Stall verschwunden. {name}, findet die Hinweise zwischen Sattelkammer und Reithalle."

**Stations-Highlights:**
- klein: Hufeisen-Wurf (Plastik-Hufeisen, 1,5 m Entfernung), Pferde-Rasse-Memory (Schimmel = Fellfarbe nicht Rasse!), Hufeisen aus Pappe basteln (≥4 cm Großperlen), Karotten-Snack (Allergie-Check + Erwachsene schneidet), Sternchen-Stall finden
- mittel: Reiter:innen-Parcours (Pool-Nudel-Pferde, niedrige Sprünge max. 10 cm), Stallmeister:innen-Quiz (Hufrehe, Stockmaß), Pferde-Pflege-Station, Hufeisen-Wurf Team-Bonus (kein Doppel-Pokal), Pokal-Schatulle
- gross: Reiter:innen-Lizenz-Quiz (12 Stationen), Großer Hindernisparcours (Jury aus 2 Erwachsenen), Stall-Wissens-Olympiade, Schatzkarte (Kaffee-gefärbt — KEINE Brand-Kante!), Stallmeister:innen-Pokal

### 3. ritter — Ritter-Schatzsuche

**intro:**
- klein: "Auf der Burg ist die goldene Krone des Königs verschwunden! {name}, zieh dein Wappen an und finde sie wieder."
- mittel: "Die Tafelrunde sucht neue Ritter:innen. {name}, bestehe 5 Prüfungen — Schwertkampf, Bogen, Heraldik — und werde geschlagen."
- gross: "Im alten Burgturm liegt ein Geheimnis. {name}, knacke die Heraldik-Codes von Jeanne d'Arc und Margarete von Anjou und finde das verschollene Wappenbuch."

**Stations-Highlights:**
- klein: Wappen-Malen (max. 2 Farben + 1 Metall — Adler=Stärke, Eule=Weisheit NICHT Adler=Weisheit), Pool-Nudel-Schwertkampf (Pflicht-Regeln: kein Kopf/Knie, max. Brusthöhe, 1:1 Aufsicht), Ritter-Tanz mit Trommeln, Marzipan-Snack mit ALLERGIE-CHECK (Brezel-Alternative), Burg-Schatz
- mittel: Burg-Eroberung mit Schaumstoff-Bällen (KEINE harten Bälle), Bogenschießen ab 6 (Schutzbrille für ALLE!), Ritter-Schlag-Zeremonie (Sir/Lady + Vorname), Heraldik-Memory, Burg-Schatz-Truhe
- gross: Tafelrunde-Quiz (Jeanne d'Arc 1412-1431, Margarete von Anjou 1430-1482, Höhenburg vs Niederungsburg, Tinkturregel VERBINDLICH), Heraldik-Werkstatt, Ritter:innen-Olympiade (Bronze/Silber/Gold), Wappenbuch entschlüsseln, Tafelrunde-Finale

### 4. baustelle — Baustellen-Schatzsuche

**intro:**
- klein: "Auf der Baustelle ist ein wichtiges Werkzeug verschwunden! {name}, zieh deinen Helm an und such mit dem Bautrupp."
- mittel: "Polierin Lisa hat die Baupläne im Schuppen verloren. {name}, folgt den Stationen — vom Sandkasten bis zur Materialkammer."
- gross: "Auf der Großbaustelle gab es Sabotage. {name}, mit 4 Hinweisen und 2 Verdächtigen (Polierin + Elektrikerin) löst ihr den Fall."

**Stations-Highlights:**
- klein: LKW-Parcours (niedrige Hindernisse max. 5 cm), Holzklötze-Turm (KEINE Lego/Duplo für 3-5 J), Schaufel-Wettrennen (zertifizierter Spielsand!), Helm-Bastel-Station (Sticker ≥4 cm), Baustellen-Schatz
- mittel: Bau-Plan-Werkstatt (Senkblei + Wasserwaage, Lot-Prinzip — NICHT "Tinkturregel"!), Material-Sortier (Schrauben ≥4 cm, KEINE Knopfzellen!), Helm-Parcours (Helm-Pflicht), Bauarbeiter:innen-Quiz (Polierin/Elektrikerin sichtbar), Bauplan-Truhe
- gross: Architektur-Challenge (Brücken-Bau, Heißkleber NUR Erwachsene), Sabotage-Lösung (Polierin + Elektrikerin als Verdächtige — KEIN "Maurer Frank"-Halluzination!), Polier:in-Prüfung (12 Quiz), Bauplan entschlüsseln, Großbaustellen-Truhe

### 5. prinzessin — Königreich-Schatzsuche (generic Reskin)

**intro:**
- klein: "Im Königreich ist die Hofstaat-Krone verloren gegangen! {name}, hilf bei der Suche durchs Schloss."
- mittel: "Die Royals planen ein Krönungsfest, aber der Schmuck ist verschollen. {name}, folgt den Spuren durch Thronsaal und Rosengarten."
- gross: "Im Schloss-Archiv liegt ein Geheimnis. {name}, mit Hilfe von Sissi (1837-1898), Queen Elizabeth II und Ludwig XIV könnt ihr die Krone wiederfinden."

**Stations-Highlights:**
- klein: Glitzer-Krönchen-Werkstatt (Großperlen ≥4 cm, Tacker AUSSCHLIESSLICH Erwachsene — Quetsch-Risiko), Juwelen-Jagd ≥4 cm (KEIN Glas für 3-5), Höfische Aufgaben (Gender-frei!), Tee-Etikette-Snack (Hartbonbons ≤4 J Erstickungsrisiko), Krönungs-Truhe
- mittel: Kronen-Atelier (ALTERSGRUPPEN-CHECK vor Spielstart!), Schatzkarte (Kaffee-gefärbt — KEINE Brand-Kante!), 5 Königliche Prüfungen mit ALLERGIE-CHECK (Holzkugel ≥4 cm bei Hülsenfrüchte-Allergie!), Hofstaat-Memory, Königliche Truhe
- gross: Königliche Schmuck-Manufaktur (Glas in Box GLAS-AB-9J, Drahtschneiden AUSSCHLIESSLICH Erwachsene, ALLE Bastel-Brille, im Tuch schneiden, sofort verstauen), Hofgeheimnis Krimi (alle Rollen offen für alle), Elite-Hofschule (Versiegelung: Gold-Sticker / Kaltleim / Gold-Stift — KEIN Heißwachs!), Schloss-Schatzkarte, Krönungs-Finale

### 6. superheld — Held:innen-Schatzsuche (generic Reskin)

**intro:**
- klein: "Ein Schurke hat das Geburtstagsgeschenk versteckt! {name}, zieh Cape und Maske an — die Held:innen-Akademie braucht dich."
- mittel: "Die Held:innen-Akademie sucht neue Mitglieder. {name}, beweis dich in Bootcamp, Code-Knacken und Tugend-Quiz — du wirst zum/zur Held:in."
- gross: "Erznemesis bedroht die Stadt. {name}, mit 6 Hinweisen und einem Zahlenschloss könnt ihr die Pläne durchkreuzen — Operation: Nemesis."

**Stations-Highlights:**
- klein: Helden-Starter-Set (MINDESTALTER 4 J!, Cape mit Klett-Verschluss vorne — NICHT um Hals knoten Strangulation, Cape abnehmen bei Verfangen), Helden-Grundausbildung (Sprung max. 10 cm), Mission: Kuchen retten, Helden-Pose-Foto, Held:innen-Truhe
- mittel: Helden-Design-Studio (Cape selbst bemalen), Helden-Bootcamp altersgerecht (Wand-Liegestütz 6-7 J — KEINE Boden-Liegestütz Wirbelsäulen-Risiko, Erwachsene führt VOR + korrigiert Haltung, bei Schmerz pausieren), Fall: verschwundene Stadt, Tugend-Quiz (helfen/ehrlich/mutig), Akademie-Truhe
- gross: Heldenidentität-Kit (Helden-Pass + Origin-Story), Elite-Helden-Akademie (Bronze/Silber/Gold), Operation: Nemesis (Zahlenschloss), Held:innen-Manifest schreiben, Akademie-Auszeichnung

---

## Output-Format

```
SCORE GESAMT: XX/100
SCORE meerjungfrau: XX/100
SCORE pferde: XX/100
SCORE ritter: XX/100
SCORE baustelle: XX/100
SCORE prinzessin: XX/100
SCORE superheld: XX/100

MUST-FIX (≥ 90 nicht erreicht ohne diese):
1. [Theme] [Station/Aspekt] — [Finding] — [Reasoning]
...

SHOULD-FIX:
1. ...

OK (Stärken):
1. ...
```

Konservativ scoren. ≥ 90 = Elite. Keine Show-Stopper überlesen.
