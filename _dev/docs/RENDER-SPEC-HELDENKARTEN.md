# Render-Spec Heldenkarten-Set v1 (Stand 10.08.2026)

> Kanonische technische Referenz für den Karten-/Druck-Renderer (#107).
> Jede Regel hier ist eine Bolle-Entscheidung vom 10.08.2026 oder ein
> verifizierter Befund des 10-Agenten-Audits + der beiden Richter.
> Referenz-Implementierung der Optik: `_dev/preview/abzeichen-probe.html` (v3, abgenommen)
> + `_dev/druck-test/*.html` (Pipeline-Beweis, dm-Test-Set v1).

## 1. Produktdefinition

EIN physisches Objekt pro Gast — Danke + Mitgebsel + Erinnerung in einem
(„alles in einem", Bolle). Bestandteile pro Gast: Heldenkarte(n) im Fotoformat,
GROSSE Urkunde (jeder Gast!), Anteil an Crew-Übersicht; pro Party zusätzlich:
Crew-Poster 20×30 fürs Geburtstagskind, Danke-Karte mit QR-Sofortnutzen.
Framing: **„Heldenkarte/Orden", NIE „Sammelkarte"** (nichts zu tauschen).
Übergabe: **Partyende als Siegerehrung** (letzter Ablaufplan-Block, entschieden).

## 2. Formate & Auflösung

| Artefakt | Format | Pixel | Seitenverhältnis |
|---|---|---|---|
| Heldenkarte | 10×15 Foto | 1800×2700 | 2:3 |
| Multi-Up-Bogen | 10×15 Foto | 1800×2700 | 2:3 (2×2 Zellen à 900×1350) |
| Urkunde | 15×20 Foto | 1800×2400 | 3:4 (eigenes Layout!) |
| Crew-Poster | 20×30 | dieselbe 2:3-Datei trägt es (228dpi, ok für Wandabstand) |
| A4-Schiene | A4-PDF | bestehender Paket-Weg (Heimdrucker, auch auf A4-Fotopapier) |

- JPEG q95+ (Datei > 200 KB — Rossmann-Minimum; < 16 MB), **sRGB-ICC eingebettet**, 300dpi-Metadaten.
- Rasterung erzeugt exakt die Zielpixel (`--force-device-scale-factor=1`), kein Nachskalieren.

## 3. Beschnitt & Layoutzonen (Terminals drucken randlos, −1–2 mm je Kante)

- **Safe-Zone: 4–5 mm** (≈ 72–89 px bei 1800×2700) an allen vier Kanten — kein
  schneidrelevantes Element, kein Text, kein Lochpunkt darin.
- **Schnittlinien nur kantendurchgehend** (Guillotine-Prinzip) — nie Rand-Ticks;
  Zellen tragen innenliegende Eigenrahmen, damit ±2 mm Versatz unsichtbar bleibt.
- **Multi-Up strikt PRO GAST** (nie Teile mehrerer Kinder auf einem Abzug —
  eine Absage kostet dann einen Abzug, nicht das Set; keine Sortier-Orgie).
- **Punch-Zone** 15×15 mm, gleiche Ecke jeder Karte, mit gedrucktem Lochpunkt-Marker
  ≥12 mm vom Endformatrand (Bindung: Banderole/Geschenkband Default, Buchschraube Deluxe).

## 4. Abzeichen-System (ein Layout, 15 Motto-Häute)

Kartengrammatik (fix): Kopfzeile (Partyname) → Abzeichen → Rollentitel → Kindname →
Sterne → Tat-Zeile → Fußzeile (machsleicht.de dezent).

Motto-native Abzeichen-Form statt Einheits-Wappen (Bolle: „Wappen passt nicht überall"):
Ritter=Wappenschild · Weltraum=Missions-Patch (Ringtext!) · Feuerwehr=Ärmelabzeichen ·
Detektiv=Dienstmarke · Piraten=Siegel/Münze · Safari/Dschungel=Ranger-Patch ·
Superheld=Brust-Emblem · Prinzessin/Feen/Einhorn=Siegel/Medaillon · Baustelle=Helm-Plakette ·
Dino=Fossilien-Plakette oder Dino-Art der Rolle (Wesen-Rollen dürfen Figur zeigen).

- Zentrum-Icons: **game-icons.net** (CC BY 3.0 — Attribution im Impressum + Credits-Seite),
  NIE Emojis als Druck-Artwork (Psychologie-Befund „zu geringwertig").
- **KEINE Personen-Avatare** (Richter-Kill: Eingabezwang + Geschlechts-/Aussehens-Falle).
  Grundsatz: **Die Rolle trägt das Bild, nie das Kind.**

## 5. Personalisierung

- **Sterne: IMMER 5/5 für jedes Kind** (Assert; ersetzt jede Wertungs-/Summenlogik).
- **Tat-Zeile** aus Plan-Daten („Hat den Schatz-Code geknackt") — verankert die Karte
  in einem gelebten Moment.
- **Geschlecht:** optionales m/w-Feld (RSVP-Chip + Gästeliste, Host-Override).
  Rollen tragen `name_m`/`name_w` als DATENFELDER (keine „-in"-Automatik).
  Render-Regel HART: w → name_w, **m ODER keine Angabe → name_m**.
  Migration: heute feminin eingebackene Rollen → name_w, name_m neu befüllen.
  Linter-Stufe: jede Rolle trägt beide Formen.
- **Rollen-Dubletten:** Gästezahl > Rollenzahl darf NIE zwei identische Karten erzeugen
  (Blanko-/Zusatzrollen-Regel wie im Paket-Rollen-Zettel).
- Geburtstagskind bekommt ein eigenes Set (nicht nur die Gäste).

## 6. Text-Robustheit (Bolle: „alles vorausschauen")

- **Auto-Fit**: Name/Rollentitel/Tat-Zeile schrumpfen schrittweise (−2px) bis zur
  Passung bei max. 88 % Elternbreite, Mindestgröße, nowrap — nie Überlauf/Ellipse.
  Belegt: „Zoé-Marlène" + „Kräuter- und Tränke-Meisterin" (Stresskarte 06).
- **Zeichenvorrat**: Umlaute, ß, franz. Akzente belegt; Doppelnamen, Apostroph-Namen
  (D'Angelo), nicht-lateinische Namen (Systemfont-Fallback prüfen), Emoji in Namen strippen.
- **Escaping**: alle Plan-Strings laufen durch esc() — Namen sind Nutzereingaben (XSS-Klasse).

## 7. Foto-Schiene (V1.5, nach dm-Test)

- **Hauptquelle: RSVP-Anfrage** — Gast-Eltern laden das Foto ihres Kindes selbst
  (optionales Feld, Einwilligungs-Satz + Häkchen, Löschung 30 Tage nach Party).
  Bewusster Bruch der Client-only-Regel: Worker-Transit (KV/R2, TTL) — Wert > Preis;
  Datenschutz-Paket zusammen mit #108. Einladungsfoto-Worker-Flow als Vorlage.
- **Host-Upload an der Gästeliste ist PFLICHT-Feature**: jederzeit ergänzen/ersetzen/croppen,
  Host-Foto überschreibt RSVP-Foto (Host kuratiert, er druckt). UI-Hinweis bei Fremd-Upload:
  „nur mit Okay der Eltern".
- Rendering: Foto sitzt **im Abzeichen-Rahmen** (clipPath der Schildform), Rollen-Icon wird
  zum Siegel-Chip an der Abzeichen-Basis. Gemischte Sets bleiben dadurch einheitlich —
  kein Kind hat eine „schlechtere" Karte. Referenz: `_dev/druck-test/07-*` (lokal).

## 8. Druckwege (kettenneutral — keine dm-Abhängigkeit, Land-Abdeckung)

Default-Empfehlung rechnet der Wizard aus dem Partydatum:
1. **Labor-Frühbucher** (~0,12 €/Abzug + Pauschale, ~4 Werktage) — hält <1 €/Gast.
2. **dm Express** (Online-Upload, 2h-Filialabholung) — Komfortweg.
3. **Terminal-Sofortdruck** (0,22–0,27 €/Abzug; 20×30 ab 2,95 €) — Fallback, im
   Spickzettel als Preisfalle für Bögen >8 Stück markiert.
4. **Online-Labor mit Postversand** (CEWE/Pixum/Aldi) — deckt Regionen ohne Filiale.
5. **Heimdrucker + A4-Fotopapier** (Drogerie-Regal 10–20 Ct/Blatt) — Urkunden-Großweg.

Auslieferung NICHT als ZIP: Web Share API „In Fotos sichern" (iPhone-Galerie!) +
nummerierte Dateinamen (`01-cover-…`, `02-heldenkarte-<name>-…`) + gedruckter
**Druck-Spickzettel** als festes Paket-Element (Dateiliste, Mengen, Schiene, Preisfalle).

## 9. Asserts (maschinelle Abnahme, vor jedem Export)

1. Seitenverhältnis exakt 2:3 bzw. 3:4; Zielpixel exakt.
2. Safe-Zone frei (kein Glyph/Schnittelement in den äußeren 72 px).
3. Multi-Up: alle Zellen eines Bogens gehören EINEM Gast.
4. Sterne == 5/5 auf jeder Karte.
5. Jede Rolle hat name_m UND name_w; Render nutzt nie die falsche Form.
6. Kein Text überläuft (Auto-Fit-Ergebnis ≥ Mindestgröße, scrollWidth ≤ max).
7. JPEG: sRGB-ICC vorhanden, 200 KB < Größe < 16 MB.
8. Kein Pool-Beispielname (Stufe 32), kein QA-Vokabular (Stufe 33) auf Karten.
9. Allergien erscheinen NIE auf Gast-Artefakten (#108).

## 9b. UPDATE 11.08. — Kombi-Produkt + Sticker (Bolle-Entscheidungen, übersteuert §1/§2 punktuell)

- **Urkunde und Heldenkarte verschmelzen zu EINEM Kern-Artefakt je Gast:** die
  „Urkunden-Heldenkarte" 15×20 (3:4, 1800×2400) trägt die komplette Karten-
  Grammatik (Abzeichen → Rollentitel → Name → 5/5 Sterne → Tat-Zeile) im
  Urkunden-Rahmen + Verleihungs-Text. Die 10×15-Karte wird vom Pflicht-Bestandteil
  zum OPTIONALEN Multi-Up-Extra. Referenz: `_dev/druck-test/08-*.jpg`.
- **KEINE Ausfüll-Striche auf Fotodruck-Artefakten** (Fotopapier nimmt keinen
  Stift; Datum/Rolle/Ort kennt der Plan → alles eingedruckt). Handschrift-Felder
  sind nur auf der A4-Heimdruck-Schiene erlaubt. Finger-Signatur im Wizard = V2-Idee.
- **Sticker als Mitgebsel (Panini-Prinzip):** CEWE-Konfigurator primärverifiziert
  (11.08., Screenshot): Fotosticker 16 Stück Rechteck ca. 3×4 cm, Hochformat,
  3,49 €, EINZELMOTIV je Sticker-Slot; dm/Fotoparadies-Bogen 13×18 ab 1,95 €
  (ob Ganzbogen-Design akzeptiert wird → Bolles Bestell-Test). Renderer liefert
  BEIDES: Einzelmotiv 3:4 (900×1200, `11-*.jpg`) + Ganzbogen 1536×2126 (`09/10-*.jpg`,
  Guillotine-Innenrahmen). Crew-Bogen = jedes Kind bekommt die ganze Crew.
- **Foto-Panini = V1.5** (nach Foto-Schiene): Foto sitzt im Abzeichen-ClipPath,
  Misch-Bögen bleiben einheitlich (Foto wo vorhanden, Wappen wo nicht — belegt
  in `10-*.jpg`). Einwilligungs-SCHÄRFE: Sticker mit Kinderfoto gehen als
  Mitgebsel AN ALLE GÄSTE nach Hause — der Einwilligungstext muss genau das
  explizit decken (Verschärfung ggü. Heldenkarte, gehört ins #108-Paket).
- **Foto-Etiketten (CEWE 12×9/9×8,2):** geprüft und VERWORFEN (Bolle 11.08.
  „doch nicht spannend") — kein Produkt-Bestandteil.
- **Tischkarten als Fotoprint** (aus der Gästeliste): sinnvoller späterer Ring
  des Motto-Schiffs, nicht v1.
- **Urkunden-Format bleibt 15×20** (0,49 €) — NICHT 20×30 (2,95 € = Preisfalle;
  20×30 bleibt exklusiv der Crew-Poster-Slot fürs Geburtstagskind).

## 10. Offene Punkte (vor Renderer-Bau zu klären)

- **dm-Praxistest** (Bolle, Set v1 liegt vor): Beschnitt messen, Autokorrektur-Farben,
  Express vs. Terminal, Kassenbons = echte Preisdaten. **Hartes Gate vor Pipeline-Bau.**
- Kinder-Realitätstest: EIN handgebautes Set auf echter Party; Fake-Door im Wizard (Demand).
- iOS-Safari-Canvas: 12–16 Druck-JPEGs client-seitig machbar? (Speicherlimits, Font-Embedding)
- Stale-Download: Plan ändert sich nach JPEG-Download → „Dateien veraltet"-Erkennung.
- Rossmann-Parität des Express-Wegs (Klumpenrisiko dm).
- Fehldruck-Support-Policy (FAQ „so reklamierst du bei dm/CEWE", Kulanz-Regel).
- Conversion-Messpunkte (Set-Vorschau → Download → Druck als Funnel-Events via plausible()).
- MVP-Schnitt: v1 nur 2–3 Top-Mottos, Rest „kommt bald".
