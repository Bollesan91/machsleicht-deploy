# machsleicht.de — Premium-Strategie & Feature-Roadmap

**Stand:** 08.04.2026
**Autor:** Bolle + Claude (Sparring-Session)

---

## Vision

**In einem Satz:** machsleicht wird die Plattform auf der deutsche Eltern Kindergeburtstage organisieren — von der ersten Idee bis zum letzten Danke.

**Kernprinzip:** Jedes Tool ist ein eigenständiger Einstieg mit eigenem SEO-Kanal. Jedes Tool funktioniert standalone, ohne Anmeldung, ohne die anderen Tools zu kennen. Aber sobald du eines benutzt, entdeckst du die anderen. Und alles kann in einer Partyseite zusammenfließen — muss aber nicht.

Der komplette Bogen: **Einladung → Party-Vorbereitung → Partytag → Nachbereitung**

Skalierung über Kindergeburtstag hinaus: Erwachsenengeburtstage, Einschulung, Taufe, Weihnachten, Advent — die Plattform ist anlassunabhängig.

---

## Die fünf Säulen (alle standalone)

| Säule | URL | Status | Standalone? |
|-------|-----|--------|-------------|
| **Planer** | `/kindergeburtstag` | LIVE | ✅ Ja |
| **Partyseite** | `party.machsleicht.de/{id}` | ✅ MVP gebaut (party-worker.js v2, 811 Zeilen), Deploy auf Cloudflare pending | ✅ Ja — auch ohne Planer erstellbar |
| **Wunschliste** | In Partyseite integriert | ✅ MVP gebaut (Claim, Beteiligen, PayPal, Affiliate 8 Shops), standalone /wunschliste Phase 2 | ✅ Ja — auch ohne Partyseite, auch für Weihnachten/Einschulung |
| **Rätsel nach Maß** | `/raetsel` | Phase 3 | ✅ Ja — auch für Lehrer, Erzieher, ohne Schatzsuche |
| **Kreuzworträtsel** | `/kreuzwortraetsel` | Phase 3 | ✅ Ja — Freebie ohne KI, Premium mit KI-Inhalten |

**Die Magie passiert in der Verbindung:** Wer den Planer benutzt → "Partyseite erstellen?" (Daten vorausgefüllt) → "Wunschliste hinzufügen?" → "Rätsel nach Maß?" in der Schnitzeljagd. Aber jeder Einstieg funktioniert solo.

---

## Premium-Features: Die Top-Kandidaten

### Tier 1 — Höchste Prio (bauen wir als erstes)

| Feature | Tech | Kosten | VK | Warum zuerst |
|---------|------|--------|-----|-------------|
| **Rätsel nach Maß** | Claude API (1 Call) | ~5ct | 2.99€ | Niedrigster Aufwand, höchster Differentiator |
| **Kreuzworträtsel** | Clientseitig (Grid-Algo) | 0ct | Freebie / 2.99€ mit KI | SEO-Kanal + Lead-Magnet + Rätsel-nach-Maß-Upgrade |

### Tier 2 — ElevenLabs-Features (brauchen API-Test)

Alle Audio-Features laufen über **ElevenLabs** (https://elevenlabs.io):

| Feature | Tech | Kosten | VK | Wow-Faktor |
|---------|------|--------|-----|-----------|
| **KI-Spielleiter-Anrufe** | ElevenLabs Conversational AI | ~1.00€ (9×60s) | 4.99€ | Extrem — kein Konkurrent hat das |
| **Einladungs-Audio** | ElevenLabs TTS | ~2-3ct | Im Bundle | Viral — Kind erzählt eine Woche in der Kita davon |
| **KI-Spielmoderation** | ElevenLabs TTS | ~wenige ct | Im Bundle | Eltern drücken Play statt selbst zu moderieren |
| **Gute-Nacht-Geschichte** | Claude API + ElevenLabs TTS | ~30ct | 2.99€ | Emotionalster Moment — das Kind hört SEIN Abenteuer |

ElevenLabs liefert motto-spezifische Stimmen (Pirat, Astronaut, Fee). Deutsche Stimmenqualität muss getestet werden. Bolle testet selbst.

**Klumpenrisiko:** 4 von 7 Premium-Features hängen an ElevenLabs. Wenn deren deutsche Stimmen nicht überzeugen oder Pricing sich ändert, ist die Hälfte des Premium-Lineups betroffen. Kein Blocker, aber bewusst halten.

### Tier 3 — Text-only (kein Audio nötig)

| Feature | Tech | Kosten | VK |
|---------|------|--------|-----|
| **Danke-Nachrichten** | Claude API (nur Text) | ~0ct | 1.99€ / Bundle |
| **Eltern-Copilot** | Claude API (Chat) | ~50ct/Session | 3.99€ |

### Bundle-Pricing

| Paket | Inhalt | VK |
|-------|--------|-----|
| Einzeln | Jedes Feature separat wählbar | 1.99-4.99€ |
| **Sorglos-Paket** | Alle Features | ~9.99€ |
| Gesamtkosten pro Bundle | API-Kosten | ~2.00€ |
| **Marge** | | **~80%** |

Konfigurator-Modell: Eltern klicken Features zusammen wie in einem Online-Shop.

### GESTRICHEN / BACKLOG

| Feature | Status | Grund |
|---------|--------|-------|
| Foto-Erzähler | ❌ Gestrichen | Kinderfotos an KI-API = DSGVO-Problem. Endgültig raus. |
| Geburtstagssong | 🔜 Backlog | Deutsche Musik-AI (Suno/Udio) klingt aktuell nicht gut genug. Komplett geparkt, re-evaluieren wenn Qualität stimmt. |

---

## MVP-Phasen

### Phase 1: Rätsel nach Maß + Kreuzworträtsel (schneller Win)

**Rätsel nach Maß:** UI im Schnitzeljagd-Block: Eltern beschreiben Ort → Button "Rätsel generieren" → Claude API Call → 5 personalisierte Rätsel. VK 2.99€ via Lemon Squeezy.
**Kreuzworträtsel-Generator:** Standalone-Seite `/kreuzwortraetsel`. Freebie: eigene Fragen+Antworten+Lösungswort eingeben. Premium: KI füllt automatisch.
**Lerneffekt:** Claude-API-Integration die für Gute-Nacht-Geschichte und Copilot wiederverwendet wird.
**Sofort Revenue:** Ab Tag 1.

### Phase 2: Partyseite (das Fundament) — ✅ MVP GEBAUT (08.04.2026)

`party-worker.js` (811 Zeilen) — Cloudflare Worker, All-in-One (Frontend + API + OG-Tags):

**Was gebaut ist:**
- 3-Step Ersteller-Flow (Kind → Wann/Wo → Wunschliste + PayPal.me)
- Code-Gate für Gäste (Vorname des Geburtstagskinds)
- Foto-Upload (clientseitig komprimiert auf 800px, JPEG 0.7, max 500KB, Base64 in KV)
- Wunschliste: Claim/Unclaim, "Gemeinsam schenken" mit auto-berechneten Anteilen
- PayPal.me-Integration: Gäste sehen "Dein Anteil: ~X€" + PayPal-Button mit vorausgefülltem Betrag
- Affiliate-Redirect (/go/{partyId}/{wishId}) für 8 Shops: Amazon, myToys, Thalia, Otto, Jako-o, tausendkind, Smyths Toys, LEGO
- Shop-Labels ("bei Amazon" statt generisch "Ansehen")
- Dynamische OG Meta Tags pro Party (WhatsApp-Preview: "Emma wird 6! 🦄")
- XSS-Escaping überall (esc() + escJson())
- localStorage RSVP-Check ("Du hast bereits für Lina geantwortet")
- .ics Kalender-Download nach RSVP
- mailto-Link für Edit-Link-Backup (Edit-Link verlieren = Party verloren)
- Editor: Inline-Bearbeitung aller Party-Daten, Wünsche löschen
- Auto-Motto-Farbe (22 Mottos → automatische Akzentfarbe)
- Zeitvalidierung (Ende nach Start)
- Affiliate-Hinweis + DSGVO-Hinweis + Impressum/Datenschutz-Links
- Max 30 Gäste, Max 20 Wünsche, 404-Seite
- Überspringen-Button für Wunschliste
- Spam-Schutz: Max-Gäste-Limit
- Pre-Fill aus Planer via URL-Params

**Was zum Deploy fehlt:**
1. Cloudflare: Worker anlegen + party-worker.js deployen
2. KV Namespace "PARTY" erstellen + binden
3. DNS: party.machsleicht.de → Worker
4. Environment Variables: AMAZON_TAG, AWIN_PUBLISHER_ID (optional)

**Was noch NICHT gebaut ist (Phase 2+):**
- Standalone /wunschliste als eigene SEO-Seite
- OpenGraph-Previews für Geschenk-Links (Bild + Titel + Preis)
- Push-Notifications bei neuer Zusage
- Multi-Party-Dashboard (Ersteller sieht alle seine Partys)

### Phase 3: Wunschliste

**Auf der Partyseite:** Geschenk-Links eintragen, Domain-Erkennung + Affiliate-Tag, "Ich kaufe das", "Beteiligen" (reine Koordination)
**Standalone /wunschliste:** Eigene Erstellungsseite, eigener SEO-Content, gleiche Technik
**Affiliate-Programme:** Amazon (vorhanden), Otto/AWIN, myToys/AWIN, Thalia, MediaMarkt, Smyths Toys

### Phase 4: Premium-Integration

**Planer → Partyseite:** Daten-Übergabe vorausgefüllt
**Schnitzeljagd → Rätsel nach Maß:** Premium-Add-on
**ElevenLabs-Features:** Nach erfolgreichem Stimmen-Test

### Was das MVP bewusst NICHT hat

- Kein User-Account, kein Login (Token-basiert)
- Keine OpenGraph-Previews für Geschenk-Links (Bild + Titel + Preis) — kommt Phase 2+
- Kein Payment für Premium-Features (kommt mit Lemon Squeezy)
- Kein Echtzeit-Update (Page Reload reicht)
- Keine Push-Notifications bei neuer Zusage
- Kein Multi-Party-Dashboard
| **Wunschliste-Affiliate** | Passives Revenue pro Geschenk-Klick | ~100% |
| **Subscription** | Sofort-Schatzsuche Abo, monatlich | ~90% |
| **SEO/Affiliate (bestehend)** | Amazon-Links in Deko/Mitgebsel | ~100% |

---

## Premium-Features — Detailspezifikation

> Übersicht und Pricing: siehe "Premium-Features: Die Top-Kandidaten" weiter oben.
> Hier folgen die ausführlichen Specs pro Feature.

### 1. KI-Spielleiter-Anrufe (via ElevenLabs Conversational AI)
- **Was:** Pro Schatzsuche-Station ruft eine KI-Stimme an und gibt den Hinweis im Charakter (Pirat, Astronaut, Fee...)
- **Flow:** Intro-Anruf → 5 Station-Anrufe → Hilfe-Hotline (2x) → Finale-Anruf
- **Budgetierung:** Max 9 Anrufe × 60 Sekunden, danach Button ausgegraut
- **Zeitlimit:** 60s pro Anruf, KI-Prompt: "Halte dich kurz, max 4-5 Sätze"
- **Playbook:** Dynamischer System-Prompt mit Motto, Alter, Station, Kindername, Ort
- **Kosten:** ~1.00€ pro Schatzsuche (9 Anrufe × ~0.10-0.15$)
- **VK:** 4.99€
- **Differentiator:** Kein deutscher Konkurrent hat das. Nicht kopierbar mit besserer PDF.
- **DSGVO:** Anruf geht an Eltern-Handy, nicht direkt ans Kind. Nur Vorname im Prompt (kein PII).
- **Skalierung:** Playbook pro Motto = ~20 Zeilen Text. 14 Mottos an einem Nachmittag machbar.

### 2. Rätsel nach Maß
- **Was:** Eltern beschreiben ihren Ort (Garten mit Apfelbaum, Sandkasten, rotes Gartenhaus...), KI generiert 5 Rätsel die exakt zu DIESEM Ort passen
- **Beispiel:** "Ich trage eine rote Mütze und stehe im Garten. Wer bin ich?" → das Gartenhaus
- **Tech:** Ein Claude API-Call
- **Kosten:** ~5 Cent
- **VK:** 2.99€
- **Prio:** HÖCHSTE — das macht die Schatzsuche von Template zu echtem personalisierten Erlebnis
- **Aufwand:** Gering. Prompt-Engineering + UI für Ort-Beschreibung

#### Output-Formate für Rätsel nach Maß
Die KI liefert den Inhalt, verschiedene Darstellungsformate machen das Feature wertvoller:

1. **Text-Rätsel** (Standard) — Klassische Rätsel als druckbare Stationskarten
2. **Kreuzworträtsel mit Lösungswort** — Eltern geben Lösungswort vor (z.B. Kindername oder Motto-Wort). KI generiert passende Fragen + Antworten rund ums Kind/Ort/Motto. Generator baut daraus ein druckfertiges Schwedenrätsel, bei dem die markierte Spalte das Lösungswort ergibt. Grid-Algorithmus komplett clientseitig, KI liefert nur den Inhalt.
3. **Weitere Formate denkbar:** Rebus, Bilderrätsel, Zahlencode

**Kreuzworträtsel-Generator auch standalone als Freebie/Lead-Magnet:** Eltern geben eigene Fragen + Antworten + Lösungswort ein (ohne KI). Premium-Upgrade = KI generiert die Inhalte automatisch passend zum Geburtstag. Guter SEO-Kanal ("Kreuzworträtsel für Kinder erstellen").

### 3. Gute-Nacht-Geschichte (nach der Party)
- **Was:** Abends generiert die KI eine personalisierte Geschichte: Sophie und ihre 7 Freunde erleben die Piraten-Schatzsuche nochmal — als Märchen
- **Personalisierung:** Echte Kindernamen, echte Stationen, echtes Motto
- **Audio:** ElevenLabs liest vor (3-4 Minuten)
- **Kosten:** ~30 Cent (Claude + ElevenLabs TTS)
- **VK:** 2.99€
- **Timing:** Am emotionalsten Punkt — das Kind hört SEIN Abenteuer als Gute-Nacht-Geschichte
- **DSGVO:** Nur Vornamen, kein PII

### 4. Einladungs-Audio
- **Was:** Personalisierte Audio-Nachricht statt Anruf: "Ahoi Emma, Käpt'n Schwarzbart hier. Sophie braucht dich am Samstag für eine geheime Mission!"
- **Flow:** Einladendes Elternteil generiert Audio → schickt Link per WhatsApp → empfangendes Elternteil drückt Play → Kind hört zu
- **Wichtig:** KEIN kalter Anruf! Eltern steuern die Wiedergabe. Kein Angst-Risiko für schüchterne Kinder.
- **Kosten:** 2-3 Cent (ElevenLabs TTS, kein Conversational AI nötig)
- **VK:** Im Bundle
- **Viraler Effekt:** Das Kind erzählt eine Woche in der Kita davon

### 5. KI-Spielmoderation
- **Was:** ElevenLabs Audio erklärt Spielregeln, macht Countdowns, sagt Ergebnisse an
- **Beispiel:** "Achtung Piraten! Gleich startet der Eierlauf über die Planke!" ... "Und der schnellste Pirat ist... BEN!"
- **Flow:** Eltern drücken Play statt selbst zu moderieren
- **Kosten:** Wenige Cent pro Audio
- **VK:** Im Bundle
- **Effekt:** Eltern werden vom Animateur zum Zuschauer

### 6. Danke-Nachrichten
- **Was:** Am Tag nach der Party generiert die KI für jedes Kind eine persönliche WhatsApp-Nachricht
- **Beispiel:** "Liebe Linas Mama, danke dass Lina dabei war! Die Schatzsuche wäre ohne sie nicht dasselbe gewesen."
- **Kosten:** Praktisch null (nur Text-Generierung)
- **VK:** 1.99€ oder im Bundle
- **Löst echtes Problem:** Eltern wissen dass sie Danke sagen sollten und machen es trotzdem nie

### 7. Eltern-Copilot am Partytag
- **Was:** Chat/WhatsApp-Bot der durch den Tag lotst
- **Beispiel:** "14:00 — Kinder kommen an. 14:20 — starte Spiel 1. Tipp: Lass sie erst 5 Min ankommen."
- **Interaktiv:** "Die sind komplett überdreht, was mache ich?" → KI gibt Ruhemodus-Empfehlung basierend auf dem Plan
- **Kosten:** ~50 Cent pro Session
- **VK:** 3.99€

### GESTRICHEN: Foto-Erzähler
- Kinderfotos an KI-API = DSGVO-Problem. Nicht machbar ohne explizite Einwilligung aller abgebildeten Eltern.

### GESTRICHEN: Geburtstagssong
- Deutsche KI-Songs klingen aktuell nicht gut genug. Risiko dass es billig wirkt und das Gesamtprodukt beschädigt. Kann später re-evaluiert werden wenn Musik-AI besser wird.

---

## Bundle-Pricing

→ Siehe "Premium-Features: Die Top-Kandidaten" → Bundle-Pricing weiter oben.

---

## Partyseite — Das Fundament (Feature-Spec)

Die Partyseite vereint WhatsApp-Partyseite + Wunschliste als EIN integriertes Produkt. Jeder Geburtstag bekommt eine eigene Seite, auf der ALLES zusammenläuft.

### Was die Gäste-Eltern sehen
1. **PIN-Eingabe** — Vorname des Geburtstagskindes (case-insensitive, Umlaute normalisiert)
2. **Einladung** — Motto, Datum, Uhrzeit, Adresse, ggf. Hinweise ("Gummistiefel mitbringen")
3. **Zusage/Absage** — RSVP pro Kind mit Name
4. **Allergien/Unverträglichkeiten** — Freitext-Feld pro Kind
5. **Abholzeit** — Wann wird das Kind abgeholt?
6. **Wunschliste** — Geschenk-Links mit "Ich kaufe das" + "Beteiligen"-Funktion
7. **machsleicht-Branding** — Dezenter Footer: "Auch einen Geburtstag planen? → machsleicht.de"

### Was das einladende Elternteil sieht (Admin-View)
- Übersicht: Wer hat zu/abgesagt, welche Allergien, Abholzeiten
- Wunschliste befüllen: Links eintragen (Amazon/Otto/myToys/Thalia etc.)
- Einladungstext bearbeiten
- Link teilen (WhatsApp-Share-Button)

### Wie kommt man zur Partyseite? (User Flow)

**Weg 1 — Aus dem Planer (innen):**
Planer fertig → Won-Screen: "Dein Plan steht! Jetzt teilen?" → Button "Partyseite erstellen" → Daten (Datum, Motto, Alter) sind vorausgefüllt → Eltern ergänzen Adresse, Uhrzeit, Hinweise → Link generiert → WhatsApp-Share

**Weg 2 — Direkteinstieg (außen):**
`/party/erstellen` als eigenständige Seite. Eltern die nur eine Partyseite wollen ohne den ganzen Planer. Simples Formular: Kindername, Datum, Uhrzeit, Adresse, optionaler Freitext. SEO: "Kindergeburtstag Einladung online", "Party Zusage Absage organisieren".

**Weg 3 — Aus der Wunschliste:**
Wer auf `/wunschliste` eine Liste erstellt bekommt die Option: "Willst du auch Zu/Absagen und Allergien sammeln? → Partyseite erstellen" (Wunschliste wird automatisch verknüpft).

Alle drei Wege landen auf derselben Partyseite. Der Unterschied ist nur, wieviel schon vorausgefüllt ist.

### URL + Zugang
- **URL:** `machsleicht.de/party/{random-token}` — z.B. `/party/a7x9k2`
- **PIN:** Vorname des Geburtstagskindes (case-insensitive)
- **URL enthält NIEMALS den Kindernamen** — sonst ist der PIN geleakt
- **Token:** 6-8 Zeichen alphanumerisch, zufällig generiert
- **Bedrohungsmodell:** Schutz gegen zufälliges Finden, nicht gegen gezielten Angriff

### Wunschliste mit Affiliate (auf der Partyseite)
- Einladendes Elternteil trägt Geschenk-Links ein (Amazon, Otto, myToys, Thalia...)
- **"Ich kaufe das"** → Artikel als vergeben markiert → keine doppelten Geschenke
- **"Beteiligen":** Mehrere Familien beteiligen sich an einem teuren Geschenk. Der Ersteller gibt seine PayPal.me-URL an. Gäste sehen "Dein Anteil: ~X€" (auto-berechnet: Preis ÷ Beteiligte) und einen PayPal-Button mit vorausgefülltem Betrag. Der Ersteller kauft das Geschenk, Gäste zahlen ihren Anteil per PayPal. **Kein Geldfluss über machsleicht** — PayPal.me macht die Arbeit.
- **Revenue:** ~6-12€ Affiliate pro Geburtstag (8 Gäste × 15-30€ × 5% Provision)

#### Affiliate-Link-Konvertierung (KRITISCH für Revenue)

Jeder Link den ein Elternteil einträgt MUSS vor der Anzeige an Gäste-Eltern in einen Affiliate-Link umgewandelt werden. Der Original-Link wird gespeichert, der Gäste-Klick geht durch den Affiliate-Link.

**Technischer Flow:**
1. Elternteil fügt Produktlink ein (z.B. `amazon.de/dp/B08XYZ...`)
2. Backend/Frontend parst die Domain aus der URL
3. Domain-Mapping prüft ob Affiliate-Programm vorhanden:

| Domain | Affiliate-Netzwerk | Tag/Parameter | Status |
|--------|-------------------|---------------|--------|
| `amazon.de` | Amazon PartnerNet | `?tag=machsleicht-21` | ✅ Angemeldet, Tag pending → als ENV var AMAZON_TAG setzen |
| `otto.de` | AWIN | AWIN-Deeplink mit Publisher-ID | TODO (Awin anmelden) |
| `mytoys.de` | AWIN | AWIN-Deeplink mit Publisher-ID | TODO (Awin anmelden) |
| `thalia.de` | AWIN / Thalia Partner | Deeplink mit Partner-ID | TODO (Awin anmelden) |
| `mediamarkt.de` | AWIN | AWIN-Deeplink | TODO |
| `saturn.de` | AWIN | AWIN-Deeplink | TODO |
| `smythstoys.com` | eigenes Programm / AWIN | Deeplink | ✅ Im Worker vorbereitet |
| `jako-o.de` | AWIN | AWIN-Deeplink | ✅ Im Worker vorbereitet |
| `tausendkind.de` | AWIN | AWIN-Deeplink | ✅ Im Worker vorbereitet |
| `lego.com` | AWIN | AWIN-Deeplink | ✅ Im Worker vorbereitet |
| Unbekannte Domain | Kein Affiliate | Original-Link durchreichen | — |

4. Gäste-Eltern sehen den Artikel (Bild, Titel, Preis via OpenGraph)
5. Klick auf "Kaufen" → leitet über Affiliate-Link zum Shop weiter
6. **Original-Link wird NICHT an Gäste angezeigt** — nur der Affiliate-Link

**Implementierung:** URL-Parser im Worker (~30 Zeilen). Domain extrahieren, Mapping nachschlagen, Affiliate-Parameter anhängen oder AWIN-Deeplink bauen. Unbekannte Domains unverändert durchlassen.

### Standalone /wunschliste (eigene Kategorie-Seite)
- Auch für Eltern die den Geburtstag NICHT über machsleicht planen
- Universell nutzbar: Geburtstag, Weihnachten, Einschulung, Taufe
- SEO-Keywords: "Wunschliste Kind", "Geschenke-Wunschliste", "Wunschzettel online"
- Funnel in den Planer: "Du planst auch den Geburtstag? → machsleicht.de/kindergeburtstag"
- Verdient an Geburtstagen die gar nicht über machsleicht gefeiert werden

### Backend-Architektur
- **Stack:** Cloudflare Workers + KV (bereits vorhanden für TeamPulse)
- **Ein Worker, ein KV-Namespace**
- **Key:** `party:{token}` → JSON-Blob mit allem (Gastliste, RSVPs, Allergien, Wunschliste, Abholzeiten)
- **Frontend:** Statische HTML auf Netlify, Worker-API für Reads/Writes
- **Flow:** Planer generiert Party-ID + PIN → schreibt via Worker in KV → Partyseite rendert State
- **Free Tier:** 100k Reads/Tag, 1k Writes/Tag — reicht für tausende Partys/Tag
- **Skalierung:** Upgrade auf D1 (Cloudflare SQLite) wenn Queries nötig werden
- **Null neue Infrastruktur — alles im bestehenden Stack**

### Datenschutz
- Nur Vornamen — kein personenbezogenes Datum im DSGVO-Sinne
- Allergien + Vorname in geschlossener 8-Personen-Gruppe = identisch mit WhatsApp-Status-quo
- **Automatische Löschung nach 90 Tagen** nach dem Party-Datum (KV expirationTtl)
- Kurze Datenschutzinfo auf der Seite
- Kein Tracking, keine Cookies, kein Login

### Viraler Effekt
- 1 Geburtstag = 1 Link → 8 Familien öffnen die Seite → 8 sehen machsleicht → 8 potenzielle Neukunden
- Kosten: Null
- **Jeder Geburtstag ist ein Akquise-Kanal**

### Strategische Bedeutung
Die Partyseite ist das FUNDAMENT für fast alle weiteren Features:
- Premium-Features (Einladungs-Audio, Danke-Nachrichten) leben auf der Partyseite
- Wunschliste braucht die Partyseite als Zuhause
- Multiplayer-Schatzsuche verlinkt von der Partyseite
- Ohne Partyseite sind alle Wachstums-Features isolierte Inseln

---

## Subscription-Modell

### Sofort-Schatzsuche Abo
- **Was:** 2.99€/Monat für unbegrenzte spontane Schatzsuchen
- **Use Case:** Sonntag, 14 Uhr, es regnet, Kind langweilt sich. Ein Button: "Sofort-Schatzsuche starten"
- **KI generiert:** In 10 Sekunden eine 15-Minuten-Wohnungsschatzsuche mit Rätsel nach Maß
- **Kosten pro Generation:** Unter 10 Cent
- **Strategischer Wert:** Wandelt machsleicht von "1x im Jahr" (Geburtstag) zu "jeden Monat" (Sonntagsrettung)
- **Retention:** Eltern die das einmal testen, kündigen nicht

---

## Ideen-Backlog (nicht priorisiert)

| Idee | Beschreibung | Status |
|------|-------------|--------|
| **Countdown** | 7 Tage vor Party: tägliche Nachricht an Kind ("Noch 3 Tage, Pirat!"). Viral weil Kind in Kita erzählt | Idee |
| **Wetter-Autopilot** | Freitag Abend automatischer Wetter-Check → Push: "Regen morgen, Plan B ist fertig" | Idee |
| **Allergie-Manager** | Gäste-Eltern tragen Allergien auf Partyseite ein → Einkaufsliste passt sich an | Idee, kostenlos |
| **Nachbar-Nachricht** | Generierter Zettel: "Liebe Nachbarn, am Sa feiert Sophie..." mit machsleicht.de Logo | Idee, kostenlos, branding |
| **Urkunden/Diplome** | Personalisierte Zertifikate nach der Party: "Emma wird zur Piratin ernannt" | Idee |

---

## Technologie-Stack

| Komponente | Technologie | Status |
|-----------|-------------|--------|
| **Backend (Partyseite)** | Cloudflare Workers + KV | ✅ Gebaut (party-worker.js v2), Deploy pending |
| **Stimmen/Anrufe** | ElevenLabs — https://elevenlabs.io (Conversational AI + TTS) | Bolle testet deutsche Stimmen |
| **Text-Generierung** | Claude API (Anthropic) — Rätsel, Geschichten, Copilot | Verfügbar |
| **Musik-AI** | Suno / Udio — für Geburtstagssong (re-evaluieren) | Nicht getestet |
| **Affiliate-Links** | Amazon PartnerNet (angemeldet), AWIN (geplant) | Amazon angemeldet, Awin TODO, 8 Shops im Worker vorbereitet |
| **Payment** | Lemon Squeezy (vorhanden) | Live |
| **Hosting** | Netlify + Cloudflare CDN/DNS | Live |
| **Frontend** | React 18 CDN + Babel Standalone | Live, JSX-Neuaufbau aktiv |

---

## DSGVO-Leitplanken

- **Kinderfotos:** Niemals an KI-APIs senden → Foto-Erzähler gestrichen
- **Kindernamen:** Nur Vornamen in Prompts, kein PII (Vorname allein = kein personenbezogenes Datum)
- **Anrufe:** Immer an Eltern-Handy, nie direkt an Kinder
- **Audio-Nachrichten:** Eltern steuern Wiedergabe, kein kalter Kontakt
- **Partyseite:** Daten (RSVP, Allergien) nur auf der Seite, kein Export an Dritte

---

## Wettbewerber-Analyse (Stand 05.04.2026)

### Wunschlisten-Tools (Deutschland)
| Tool | Stärke | Schwäche vs. machsleicht |
|------|--------|--------------------------|
| **Wunschbiber** | 200k+ reservierte Wünsche, 80+ Shops, Preisvergleich | Kein RSVP, kein Affiliate-Revenue für uns, keine Party-Integration |
| **EzWL** | Einfach, kostenlos, mehrere Anlass-Designs | Kein RSVP, kein Affiliate |
| **MyWishlists** | Multi-Anlass (Geburt, Hochzeit, Weihnachten) | Kein RSVP, kein Affiliate |
| **Wishbob / Wisheezy** | Einfach, ohne Anmeldung | Feature-arm, kein Affiliate |

### RSVP/Event-Tools
| Tool | Stärke | Schwäche vs. machsleicht |
|------|--------|--------------------------|
| **Partiful** | Google Best App 2024, extrem einfach, viral | US-fokussiert, keine Wunschliste, kein Affiliate, nicht für Kindergeburtstage |
| **Whocan.org** | Deutsche Geburtstags-Einladungen mit RSVP | Keine Wunschliste, kein Affiliate, keine Schatzsuche |
| **Joy** | Hochzeitswebsites mit RSVP + Wunschliste | Nur Hochzeit/Baby, kein Kindergeburtstag |
| **Jotform RSVP** | Flexibel, Formulare | Generisch, kein Kindergeburtstags-Kontext |

### Die Lücke
**Keiner kombiniert:** RSVP + Allergien + Wunschliste mit Affiliate + Kindergeburtstags-Planer + Schatzsuche + KI-Premium-Features in einer Plattform. Die Wunschlisten-Tools haben kein RSVP. Die RSVP-Tools haben keine Wunschliste. Keiner verdient an den Geschenken der Gäste. Keiner hat KI-Features.

machsleicht macht alles einzeln "gut genug" (nicht besser als Wunschbiber bei Wunschlisten), gewinnt aber durch die Integration und das Affiliate-Modell.

---

## Priorisierung (Empfehlung)

1. **Rätsel nach Maß + Kreuzworträtsel** — schnellster Win, sofort Revenue (2.99€), ein Nachmittag Arbeit. Claude-API-Integration lernen die du für alles Weitere brauchst.
2. ~~**Partyseite (Backend + Frontend)**~~ — ✅ DONE (08.04.2026). party-worker.js v2 gebaut. Deploy auf Cloudflare pending.
3. ~~**Wunschliste auf Partyseite**~~ — ✅ DONE (08.04.2026). In Partyseite integriert: Claim, Beteiligen, PayPal, Affiliate für 8 Shops.
4. **Cloudflare Worker deployen** — NÄCHSTER SCHRITT: KV "PARTY" anlegen, DNS party.machsleicht.de, AMAZON_TAG setzen
5. **Google Search Console einrichten** — Traffic-Quellen verstehen (83 Unique Visitors/Tag, Herkunft unbekannt)
6. **Awin anmelden** — für myToys, Thalia, Otto, Jako-o, tausendkind Affiliate
7. **KI-Spielleiter-Anrufe** — das Wow-Feature, braucht ElevenLabs-Test
8. **Einladungs-Audio** — günstig, viral, einfach. Lebt auf der Partyseite.
9. **Gute-Nacht-Geschichte** — emotional, runder Abschluss
10. **Sofort-Schatzsuche Abo** — recurring revenue, braucht Rätsel nach Maß als Basis
11. **Standalone /wunschliste** — eigene SEO-Kategorie, Funnel in den Planer
12. **GitHub Token rotieren** — 25.04.2026, MUSS vorher passieren
13. **Homepage.js aufräumen** — toter Partyseite-Code drin
14. **Rest** — KI-Spielmoderation, Danke-Nachrichten, Eltern-Copilot

---

## Wunschliste — Details

→ Vollständig dokumentiert unter "Partyseite — Das Fundament (Feature-Spec)" weiter oben.
Kernfunktion, Standalone /wunschliste, Beteiligen-Funktion und Affiliate-Programme sind dort beschrieben.

---

## Multiplayer-Schatzsuche (8-12 Jährige) — LANGFRIST-VISION

> Eigenständiges Produkt, nicht ein normales Feature. WebSockets, Rollen-Management, Echtzeit-Sync, Mobile-first — mehrere Monate Arbeit. Frühestens nach stabilem Revenue aus den Basis-Features.

- Kinder in dieser Altersgruppe haben oft eigene Handys
- Jedes Kind bekommt einen eigenen **Rollen-Link**: Navigator (sieht die Karte), Codeknacker (löst Rätsel), Späher (bekommt Hinweise)
- Kein Kind kann die Schatzsuche allein lösen — sie MÜSSEN zusammenarbeiten
- **Live-Rangliste** während der Party auf jedem Handy sichtbar
- **QR-Code Bonus-Stationen** versteckt im Garten — Extra-Aufgaben, digitale Abzeichen
- **Abstimmung nach der Party:** "Mutigster Pirat", "Bestes Teamwork" — Urkunde wird generiert
- **VK:** 4.99€
- **Kosten:** Minimal (clientseitig, Websockets oder Polling, kein AI-Call nötig)
- **Viral:** 8 Kinder haben machsleicht auf dem Handy = 8 neue Touchpoints

---

## Weitere Wachstums-Ideen

| Idee | Beschreibung | Viral | Cash |
|------|-------------|-------|------|
| **Klassen-Geburtstagskalender** | Ein Kalender für die ganze Klasse, 25 Kinder, Wunschliste pro Kind. Ein Link in die Klassen-WhatsApp-Gruppe = 25 Familien sehen machsleicht | 9 | 1 |
| **KI-Geschenkeberater** | "Junge, 7, mag Dinos" → 5 Geschenke mit Affiliate-Links. SEO: "Geschenk Junge 7 Jahre" | 6 | 7 |
| **Einschulungs-Planer** | Gleicher Motor, anderer Anlass. Schultüte, Feier, Geschenke. Jedes Jahr August = Peak | 5 | 5 |
| **Adventskalender-Builder** | 24 Türchen mit KI-Rätsel. November = enormes Suchvolumen | 4 | 5 |
| **Mitgebsel-Generator** | "8 Kinder, 6 Jahre, Budget 3€/Kind" → KI-Liste mit Affiliate-Links | 3 | 6 |
| **Countdown (7 Tage)** | Tägliche Nachricht vor der Party. Kind erzählt in der Kita davon | 8 | 1 |
| **Wetter-Autopilot** | Automatischer Wetter-Check → Plan B Push-Benachrichtigung | 2 | 3 |
| **Allergie-Manager** | Gäste tragen Allergien auf Partyseite ein → Einkaufsliste passt sich an | 3 | 0 |
| **Nachbar-Nachricht** | Generierter Zettel mit machsleicht-Branding | 2 | 0 |
| **Urkunden/Diplome** | Personalisierte Zertifikate nach der Party | 3 | 3 |

---

## Feature-Ranking: Viral × Cash (Top 14)

| # | Feature | Viral | Cash | Kombi |
|---|---------|-------|------|-------|
| 1 | **Wunschliste + Beteiligen** | 8 | 10 | **18** |
| 2 | **WhatsApp-Partyseite** | 10 | 7 | **17** |
| 3 | **KI-Spielleiter-Anrufe** | 7 | 9 | **16** |
| 4 | **Multiplayer-Schatzsuche** | 9 | 7 | **16** |
| 5 | **Standalone /wunschliste** | 8 | 8 | **16** |
| 6 | **Rätsel nach Maß** | 4 | 9 | **13** |
| 7 | **KI-Geschenkeberater** | 6 | 7 | **13** |
| 8 | **Sofort-Schatzsuche Abo** | 5 | 7 | **12** |
| 9 | **Einladungs-Audio** | 7 | 4 | **11** |
| 10 | **Gute-Nacht-Geschichte** | 4 | 6 | **10** |
| 11 | **Klassen-Kalender** | 9 | 1 | **10** |
| 12 | **KI-Spielmoderation** | 3 | 5 | **8** |
| 13 | **Danke-Nachrichten** | 3 | 3 | **6** |
| 14 | **Eltern-Copilot** | 2 | 4 | **6** |

---

## Revenue-Projektion (optimistisch-konservativ)

> **Ehrlichkeits-Check:** 5% Premium-Conversion ist am oberen Ende (Industrie: 2-4%). 30% aktive Wunschlisten ist großzügig. Bei echten konservativen Zahlen eher 60-70% der Projektion. Trotzdem als Orientierung nützlich.

**Annahmen:**
- 20% der Besucher nutzen den Planer
- 5% der Planer-Nutzer kaufen Premium (7% bei 20k wegen reifem Produkt)
- 10% erstellen eine Wunschliste
- Wunschliste generiert im Schnitt 4€ Affiliate (nicht jeder Gast klickt durch)
- Standalone /wunschliste bringt zusätzlichen SEO-Traffic

### Bei 5.000 Besuchern/Monat

| Stream | Rechnung | Monat |
|--------|----------|-------|
| Premium-Features | 1.000 Planer × 5% × 7€ | ~350€ |
| Wunschliste Affiliate | 500 Listen × 30% aktiv × 4€ | ~600€ |
| Amazon-Affiliates (bestehend) | Deko/Mitgebsel-Klicks | ~100€ |
| **Gesamt** | | **~1.050€** |

### Bei 10.000 Besuchern/Monat

| Stream | Rechnung | Monat |
|--------|----------|-------|
| Premium-Features | 2.000 × 5% × 7€ | ~700€ |
| Wunschliste Affiliate | 1.000 × 30% × 4€ | ~1.200€ |
| Standalone /wunschliste | +2.000 SEO-Besucher × 10% × 4€ | ~800€ |
| Sofort-Abo | 30 Abonnenten × 2.99€ | ~90€ |
| Amazon-Affiliates | | ~200€ |
| **Gesamt** | | **~2.990€** |

### Bei 20.000 Besuchern/Monat

| Stream | Rechnung | Monat |
|--------|----------|-------|
| Premium-Features | 4.000 × 7% × 7€ | ~1.960€ |
| Wunschliste Affiliate | 2.000 × 30% × 4€ | ~2.400€ |
| Standalone /wunschliste | +5.000 SEO × 10% × 4€ | ~2.000€ |
| Geschenkeberater | +3.000 SEO × Affiliate-Klicks | ~600€ |
| Sofort-Abo | 80 Abonnenten × 2.99€ | ~240€ |
| Amazon-Affiliates | | ~400€ |
| **Gesamt** | | **~7.600€** |

**Erkenntnis:** Die Wunschliste überholt Premium-Features ab 10k Besuchern. Bei 20k macht sie mehr als die Hälfte des Umsatzes — weil sie passiv skaliert ohne API-Kosten.

**Jahresumsatz bei 20k Besuchern: ~91.000€** bei praktisch null laufenden Kosten (nur Netlify Hosting + gelegentliche API-Calls).

---

## Landingpage-Wireframes (Sparring-Session 04.04.2026)

Wireframe-Entwürfe für die drei Kernseiten wurden in einer Sparring-Session erarbeitet. Claude hat die Wireframes anschließend kritisch bewertet.

### Homepage (index.html) — Wireframe

1. **Hero:** "machsleicht — Weniger Grübeln. Mehr machen." / Sub: "Digitale Tools für Eltern, die keine Lust auf Chaos haben." / CTAs: Kindergeburtstag planen, Schatzsuche erstellen / Microproof: Kostenlos. Ohne Anmeldung. Direkt nutzbar.
2. **Proof-Kacheln:** "Nicht mehr Input. Mehr Klarheit." / "In Minuten startklar" / "Ohne Anmeldung, direkt los"
3. **Hauptentscheidung:** Zwei große Karten — Kindergeburtstag-Planer + Schatzsuche
4. **So funktioniert's:** 3 Steps (Was → Ergebnis → Nutzung)
5. **Vertrauens-Elemente:** Sofort-Ergebnisse, Kostenlos, Kein Login
6. **Zwei stärkste Produkte:** Planer + Schatzsuche als Feature-Blöcke
7. **Weitere Tools:** Einschulung, Baby, Halloween, Ostern, Fasching (Karten)
8. **Philosophie:** "Wir bauen nur Dinge, die Stress senken, Rückfragen vermeiden oder Entscheidungen vereinfachen."
9. **FAQ**
10. **Final CTA:** "Womit willst du jetzt starten?"

### /kindergeburtstag — Wireframe

1. **Hero:** "Kindergeburtstag planen, ohne Chaos im Kopf" / Sub: Plan mit Motto, Zeitablauf, Spielen, Einkaufsliste, Snacks, Budget.
2. **Proof-Kacheln:** Weniger Grübeln / Weniger Vergessen / Weniger Übertreibung
3. **So funktioniert's:** 3 Steps
4. **Motto-Auswahl:** Piraten, Dino, Feen, Weltraum, Detektiv, Dschungel
5. **Alterslogik:** 4-5 / 6-7 / 8-10 Blöcke
6. **Schatzsuche als Add-on:** CTA zum Ergänzen
7. **Was du bekommst:** Ablauf, Spiele, Einkaufsliste, Snacks, Budget
8. **Was du nicht bekommst:** Kein Basteltheater, keine Pinterest-Perfektion, keine 80 Optionen
9. **FAQ**
10. **Final CTA**

### /schatzsuche — Wireframe

1. **Hero:** "Schatzsuche für Kinder in 5 Minuten fertig"
2. **Themenwahl-Preview:** 6 Theme-Karten
3. **So funktioniert's:** 3 Steps
4. **Output-Preview:** Karte + Stationen + Hinweise
5. **Alters-Anpassung**
6. **Was du bekommst**
7. **Was du nicht bekommst**
8. **Einladung als Cross-Sell**
9. **FAQ**
10. **Planer-Rücklink**
11. **Final CTA**

---

### Claude's Kritik an den Wireframes

**Problem 1: Tool-Seiten werden wie Marketing-Seiten behandelt.** /kindergeburtstag und /schatzsuche SIND React-Apps. Der Nutzer landet dort und ist sofort im Tool. Die Wireframes schieben 8-10 Scroll-Sektionen VOR das Tool. Das ist Friktion, kein Value. Für SEO-Ratgeber perfekt, für Tool-Landingpages Gift.

**Problem 2: SEO-Keyword-Verwässerung.** Emotionale H1s ("ohne Chaos im Kopf") sind bessere Copy aber schlechteres SEO. Bei den wichtigsten Seiten nicht experimentieren.

**Problem 3: "Familienfeste" overpromised.** Die Site ist 90%+ Kindergeburtstag. "Familienfeste planen" suggeriert Hochzeiten, Taufen, Jubiläen.

**Problem 4: Stärkste Differenziatoren fehlen.** Live-Modus, Schatzkarten-Builder, mottoabhängige Stationen, Rollen-System werden nicht erwähnt. Stattdessen generische Aussagen.

**Problem 5: Repetition auf Homepage.** Kindergeburtstag + Schatzsuche wird in 4 Sektionen gepitcht.

### Was übernommen werden sollte (Goldstücke)

1. **"Was du nicht bekommst"** — Positionierungs-Gold. Als kompaktes Element neben dem Tool, nicht als eigene Sektion.
2. **Trust-Kacheln** ("Nicht mehr Input. Mehr Klarheit." / "In Minuten startklar" / "Ohne Anmeldung") — 3er-Zeile unter dem Hero.
3. **Philosophie-Satz** — "Wir bauen nur Dinge, die Stress senken, Rückfragen vermeiden oder Entscheidungen vereinfachen."

### Entscheidung

Die Tool-Seiten (/kindergeburtstag, /schatzsuche) bleiben Tool-first. SEO-Content sitzt UNTER dem Tool in eigenem Container (bereits umgesetzt mit Container-Separation). Die Wireframe-Copy wird als Inspiration für Microcopy und Trust-Elemente innerhalb des bestehenden Layouts verwendet, nicht als kompletter Seitenumbau.
