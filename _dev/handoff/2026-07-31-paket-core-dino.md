# Paket-Kern + Dino-Paket + Motto-Daten-Audit (31.07.2026)

**Status 01.08.: GATE GRÜN — 0 offene MAJORs.**
Runde 1 (Fable 5 Extra, target-blind): 66/100, 4 MAJORs + 9 MINORs → alle Stufe-3-verifiziert,
gefixt in `d21880b`. Runde 2 (Abnahme-Check, frischer Tab, Diff-basiert): **84/100, 0 MAJORs**,
3 MINORs → gefixt in `f4af098` (Spieße) + `a76beb8` (Herdenlauf-Widerspruch, Rest-Nähte).
Browser-Smoke nach allen Fixes grün (2 Mottos × 3 Alter + wow-Variante). Linter PASSED.
**Deploy wartet auf Bolle-Wort.** Deploy-Hinweis: `paket/core/*` MUSS mit den Motto-Files
und den `data/motto/*.json` zusammen auf main — Teilstände lassen das Piraten-Paket ins Leere laufen.

Gate-Runde-1-Kurzfassung (Details im Fix-Commit d21880b):
- **M4 (Ship-Blocker, nur durch Ausführen findbar):** Dino-Steps sind Strings, Renderer erwartete
  Objekte → alle Dino-Spielkarten druckten leer. String-Guard (Spiele + Vorleser + Countdown);
  dieselbe Drift druckte im Countdown einen Sicherheits-Check als „undefined".
- **M1:** Trauben/Popcorn/Spieße ohne Warnhinweis im 3-5-Paket + verworfenes cake.meta.safety.
- **M2:** Motto-Wechsel nach Aktivierung ließ Paket-Knopf (samt Token-URL) stehen → Refresh in
  pickMotto + pickCustomMotto. **M2b geparkt:** Server-mottoId wird beim Motto-Wechsel nie
  gePUTtet → Rollen-IDs der Party bleiben vom alten Motto (Worker-Welle).
- **M3:** Parcours minAge 6 im 3-5-Paket → 4, Bestzeit-Wettkampf raus.
- Deko-Welle vorgezogen und auf food/giveaways erweitert (m8): 376 Zeilen, 14 Dateien,
  0 Zeichen Verlust, Affiliate-Tags maschinell geprüft intakt.
- **Geparkt für Bolle/Wellen:** poss()-Divergenz Karte („Linas") vs. Worker („Lina's") — eine
  Linie wählen (m7); Seitennummern-Drift in foot() seit V2, betrifft auch Live-Piraten (m9);
  GAME_META/Rollen-Spiegel brauchen einen Validate-Schritt statt Handpflege (Winkel 10).

---

## 1. Warum der Kern extrahiert wurde

Das Piraten-Paket war der Pilot (1062 Zeilen). Für Motto 2..15 wäre Copy-Paste der
naheliegende Weg gewesen — und der falsche: In derselben Session steckten **vier Fehler
derselben Familie** allein im Crew-Sync, dazu ein Escaping- und ein Countdown-Bug. Jeder
davon hätte danach 15-mal gefixt werden müssen. Heute war der billigste Moment für die
Extraktion, weil es genau **einen** Bestandskunden zu migrieren gab.

### Was jetzt wo liegt

| Datei | Inhalt |
|---|---|
| `paket/core/paket-core.js` | Alles was rechnet, lädt oder abgleicht: `boot()`, Vorleser, QR, Zeitplan-Scheduler, `splitInvites()`, `guestUrl()`, Rollen-Auflösung, Varianten |
| `paket/core/paket.css` | Blatt-, Druck- und Bildschirm-CSS. **Enthält keine einzige Farbe** |
| `paket/core/PALETTE.md` | Vertrag: 30 `--`-Variablen, die jedes Motto-File deklarieren muss |
| `paket/core/umami-shim.js` | Der plausible→umami-Shim (war sonst 15-mal zu kopieren) |
| `paket/<motto>/index.html` | Nur noch Charakter: Palette, Wording, Rollen, Cover-Grafik, Blatt-Layouts |

**Faustregel für neue Änderungen:** Rechnet es / lädt es / gleicht es ab → Kern.
Liest es sich wie Produkttext → Motto-File.

### Beweis, dass die Migration verlustfrei war

Nicht „sieht gut aus", sondern gemessen: altes und neues Piraten-Paket unter **derselben
URL** gerendert (Datei-Tausch, damit auch die QR-Codes identische Eingaben bekommen) und
das erzeugte `#dossier`-HTML zeichenweise verglichen:

```
age4 : IDENTISCH (705.700 Zeichen)
age8 : IDENTISCH (705.789 Zeichen)
age10: IDENTISCH (707.165 Zeichen)
```

Das CSS wurde per Rück-Substitution geprüft (Tokens zurück in Hex → ergibt das Original).

**Der Vergleich hat sofort einen echten Fehler gefangen:** `const DEMO_PARTY` erzeugt im
klassischen Skript **keine** `window`-Eigenschaft — `boot()` im Kern fand die Demo-Daten
nicht und rendert ein Paket ohne Namen und Datum. Ohne den Diff wäre das live gegangen.
→ Deshalb steht in beiden Motto-Files `window.DEMO_PARTY = {...}` mit Kommentar.

---

## 2. Dino-Paket (`/paket/dino/`)

Eigene Identität statt umbenannter Piraten: **Expedition** statt Crew, **Feldküche** statt
Kombüse, **Forschertagebuch** statt Logbuch, **Fundstück-Beutel** statt Beute-Beutel,
**Expeditions-Post** statt Bordpost. Eigene Palette (Knochen-Pergament, Urwald-Nacht,
Vulkan-Bernstein), eigenes Titelbild (Vulkan-Tal mit Langhals), Fußabdruck als Blatt-Signet,
Fossil-Siegel auf der Urkunde.

Verifiziert: 20 Blätter, 12 QR-Codes, 10 Vorlese-Knöpfe, alle drei Altersgruppen, keine
Konsolenfehler, Possessiv-Regel greift (`Jonas' große Dino-Expedition`).

### Datenlücken, die dabei aufflogen und geschlossen wurden

- **`dino-klein` und `dino-mittel` hatten gar kein Ritual** (alle Felder `null`, mit interner
  Notiz „Dino-Mottoseiten haben keine eigene Ritual-Sektion im Quell-HTML"). Nur `gross`
  hatte eines. Das trifft die Mehrheit der Käufer — der Anker-Moment im Ablaufplan wäre leer
  geblieben. Redaktionell ergänzt: „Die kleine Dino-Verwandlung" (3-5, ohne Ränge, analog
  zur Piraten-Begründung) und „Der Forscher-Ausweis & die Dino-Rettung" (6-8, zwei
  Anker-Momente, Rollen exakt wie im `ROLE_CATALOG` des Workers).
- **`dino-mittel` `variants[0]` (minimal) hatte keine `decoration`** → leerer Deko-Block.
- **Sechsmal „Crew"** in den Dino-SOS-Daten (Piraten-Vokabular) → „Team".

---

## 3. Wizard rückwärts verbessert (auf Bolles Zuruf)

`kindergeburtstag.html` hatte **'piraten' an drei Stellen hart verdrahtet** — das Dino-Paket
wäre gebaut, aber unerreichbar gewesen. Jetzt eine einzige Freischalt-Stelle:

```js
const PAKET_MOTTOS = { piraten:{…}, dino:{…} };   // Eintrag hier = Freischaltung im Funnel
```

Link, Knopf-Beschriftung und Tracking-Prop ziehen mit. Funktional getestet:

| Motto | Partyseite | Ergebnis |
|---|---|---|
| dino | aktiv | `/paket/dino/?id=…&edit=…` |
| piraten | aktiv | `/paket/piraten/?id=…&edit=…` (unverändert) |
| einhorn | aktiv | kein Link (bleibt Warteliste) |
| `constructor` | aktiv | kein Link (Prototyp-Schutz greift) |
| dino | keine | kein Link |

Zusätzlich gefixt: Beim Wechsel **zwischen zwei Paket-Mottos** wurde vorher nur das Link-Ziel
nachgezogen, nicht die Beschriftung — es hätte „Piraten-Komplettpaket" über einem Dino-Link
gestanden.

---

## 4. OFFEN: Motto-Daten-Audit — 13 von 45 Dateien haben Löcher

Repo-weit geprüft (alle 15 Mottos × 3 Altersgruppen) auf die Felder, die Paket **und**
Mottoseite auslesen:

| Motto | Gruppen | Lücke |
|---|---|---|
| **prinzessin** | alle 3 | Ritual-Schritte, SOS-Regen |
| **superheld** | alle 3 | Ritual-Schritte, SOS-Regen |
| weltraum | gross | Deko fehlt in **allen drei** Varianten |
| einhorn, feen | klein | Ritual-Schritte + Deko (minimal) |
| detektiv, safari, dschungel | einzelne | Deko (minimal) |

### Der wichtigste Befund: prinzessin + superheld liegen im ALTEN Datenformat

Kein fehlender Text, sondern ein **Schema-Bruch**:

| | 13 Mottos | prinzessin / superheld |
|---|---|---|
| `sosScenarios` | Objekt mit benannten Fällen (`regen`, `ein_kind_weint`, …), je `{icon,label,headline,steps[]}` | **Liste** von `{problem, solution}` |
| `signatureRitual` | `{name, introText, setupSteps[], rolesList[], materialNote, …}` | nur `{name, description}` |

Der Code liest `sos.regen` → bei diesen beiden ist das `undefined`, der Regen-Plan-B
verschwindet **still**. Betrifft auch die Live-Mottoseiten, nicht nur künftige Pakete.

**Empfehlung:** eigene redaktionelle Welle (6 Dateien), nicht an eine Paket-Lieferung
anhängen — die dünneren 4 Szenarien müssten auf die 8 des neuen Schemas aufgestockt und die
Ritual-Schritte geschrieben werden. Jede Datei braucht ihr eigenes Gate.

---

## 5. Nächste Schritte

1. **Stufe 2**: unabhängiger Reviewer (frischer claude.ai-Tab, Fable 5 Max, target-blind,
   raw-SHA-URLs) über Kern-Extraktion + Dino-Paket + Wizard-Registry. Erst danach Deploy.
2. Deploy-Reihenfolge unkritisch (kein Worker-Anteil), aber `paket/core/*` muss **mit** den
   Motto-Files gehen — sonst lädt das Piraten-Paket ins Leere.
3. Danach: Motto-Daten-Welle aus Abschnitt 4.
4. Offen aus Vorsession: Käpt'n-Stimme (ElevenLabs vs Azure) — nur Bolle-Entscheid,
   siehe `2026-07-31-kaeptn-stimme-entscheid.md`.

## Gesamt-Gutachten 02.08. (Dino als Produkt, ee2c2f4): 81/100 → Fixes → Politur-Tickets

Frische Voll-Runde (Fable 5 Extra, target-blind, echter jsdom-Render 9/9 Kombinationen,
XSS-Payloads, Token-Leak-Scan 0 Treffer, QR-Roundtrip 6/6, Vulkan-Chemie nachgerechnet):
**1 MAJOR + 12 MINORs**. Sofort gefixt: M1 roher Markdown-Link auf der Quiz-Karte (4 Stellen,
Ziel-URL live verifiziert HTTP 200) → Klartext-URL; m1 ⚓-Glyphe aus dem Kern-CSS auf jedem
Dino-Blatt → `--mk-glyph`-Paletten-Variable (dino 🦴, piraten ⚓, Vertrag ergänzt);
m2 „Wache-Pult"-Jargon (mittel) → Forscher-Pult + „Sirenen"→„Sound" (gross);
m3 33 ASCII-Umlaut-Reste in safetyRules/Einkauf (pruefen/juengeren/Haende/Saftpaeckchen).

**Offene Politur-Tickets (Dino-Politur-Welle, kein Blocker):**
m4 Countdown „Max 2,5h" vs. Standard-3h-Variante · m5 Eier-Mengen 15-20 vs. 30 (mittel)
· m6 toter Verweis „Wie in der Minimal-Variante" (klein/gross-Karten) · m7 Vulkan-Gieß-Hand-
Formel auch im mittel-Stations-Hint · m8 „(Brand-Panik-Eltern)"-Ton auf klein-Kuchenblatt
· m9 gross-Ritual: Stempel-Motive auf Schatzsuche-Stationen mappen + Anführungszeichen
· m10 Copy-Bündel (Mirror-Glaze-Kompositum, „6-8er"-Jargon, „Bei 8-Jährigen" im 3-5-Paket,
gemischte Anführungszeichen) · m11 wow-gross Escape-Kette vs. Scheduler-Reserve bei 3h
(Hinweissatz) · m12 gross-S2-Hint braucht Lösungswort-Konstruktionsbeispiel.
UNSICHER geblieben: echter Gerätetest Vorleser, physischer Probedruck, Mehrseiten-Fluss
bei 20+ Gästen (hängt am Seitennummern-Ticket).

## Kleinere Notizen

- Die CSS-Klasse für das Titelbild heißt noch `.sea` (Piraten-Erbe) und wird jetzt von allen
  Mottos benutzt. Umbenennen wäre sauberer, ändert aber die Ausgabe → eigener Mini-Commit
  mit erneutem Identitäts-Diff.
- Der Vergleichs-Harness (altes vs. neues Paket unter derselben URL rendern und `#dossier`
  diffen) lohnt sich bei jeder weiteren Kern-Änderung.
