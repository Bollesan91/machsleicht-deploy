# machsleicht.de — Premium-Strategie & Feature-Roadmap

**Stand:** 04.04.2026
**Autor:** Bolle + Claude (Sparring-Session)

---

## Vision

machsleicht wird zur KI-gestützten Geburtstags-Plattform. Kostenlose Tools bringen Traffic, Premium-Features mit ElevenLabs und Claude API machen Umsatz. Jeder Geburtstag ist ein viraler Akquise-Kanal.

Der komplette Bogen: **Einladung → Party-Vorbereitung → Partytag → Nachbereitung**

---

## Revenue-Modell

| Stream | Beschreibung | Marge |
|--------|-------------|-------|
| **Premium (Pay-per-Feature)** | Eltern stellen sich ein Paket zusammen | ~80% |
| **Wunschliste-Affiliate** | Passives Revenue pro Geschenk-Klick | ~100% |
| **Subscription** | Sofort-Schatzsuche Abo, monatlich | ~90% |
| **SEO/Affiliate (bestehend)** | Amazon-Links in Deko/Mitgebsel | ~100% |

---

## Premium-Features (Pay-per-Feature)

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

| Paket | Inhalt | VK |
|-------|--------|-----|
| Einzeln | Jedes Feature separat wählbar | 1.99-4.99€ |
| **Sorglos-Paket** | Alle 7 Features | ~9.99€ |
| Gesamtkosten pro Bundle | API-Kosten | ~2.00€ |
| **Marge** | | **~80%** |

Konfigurator-Modell: Eltern klicken Features zusammen wie in einem Online-Shop. Jeder Klick erhöht den Warenkorb.

---

## Wachstums-Features (kostenlos, viraler Effekt)

### WhatsApp-Partyseite
- Jeder Geburtstag bekommt eine eigene Mini-Landingpage
- Inhalt: RSVP-Button, Adresse, Allergien-Formular, Abholzeit
- Eltern teilen einen Link statt 5 separate WhatsApp-Nachrichten
- **Viraler Effekt:** 8 Familien öffnen die Seite → 8 sehen machsleicht → 8 neue Leads
- **Kosten:** Null
- **Jeder Geburtstag = Akquise-Kanal**

### Wunschliste mit Affiliate (auf der Partyseite)
- Einladendes Elternteil trägt Geschenk-Links ein (Amazon, Otto, myToys, Thalia...)
- machsleicht erkennt Domain → setzt Affiliate-Tag dazwischen
- Gäste-Eltern sehen Liste → klicken "Ich kaufe das" → Artikel wird als vergeben markiert
- Keine doppelten Geschenke — alle happy
- **Revenue:** ~6-12€ Affiliate pro Geburtstag (8 Gäste × 15-30€ Geschenk × 5% Provision)
- **Kosten:** Null
- **Affiliate-Programme:** Amazon (vorhanden), Otto/AWIN, myToys/AWIN, Thalia, MediaMarkt, Smyths Toys

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
| Stimmen/Anrufe | ElevenLabs (Conversational AI + TTS) | Bolle testet selbst |
| Text-Generierung | Claude API (Anthropic) | Verfügbar |
| Affiliate-Links | Amazon (vorhanden), AWIN (Otto, myToys) | Amazon live, Rest TODO |
| Payment | Lemon Squeezy (vorhanden) | Live |
| Hosting | Netlify (vorhanden) | Live |
| Frontend | React CDN + Babel (vorhanden) | Live, JSX-Neuaufbau geplant |

---

## DSGVO-Leitplanken

- **Kinderfotos:** Niemals an KI-APIs senden → Foto-Erzähler gestrichen
- **Kindernamen:** Nur Vornamen in Prompts, kein PII (Vorname allein = kein personenbezogenes Datum)
- **Anrufe:** Immer an Eltern-Handy, nie direkt an Kinder
- **Audio-Nachrichten:** Eltern steuern Wiedergabe, kein kalter Kontakt
- **Partyseite:** Daten (RSVP, Allergien) nur auf der Seite, kein Export an Dritte

---

## Priorisierung (Empfehlung)

1. **Rätsel nach Maß** — niedrigster Aufwand, höchster Differentiator, ein API-Call
2. **WhatsApp-Partyseite** — kostenlos, viral, Grundlage für Wunschliste
3. **Wunschliste mit Affiliate** — passives Revenue auf der Partyseite
4. **KI-Spielleiter-Anrufe** — das Wow-Feature, braucht ElevenLabs-Test
5. **Einladungs-Audio** — günstig, viral, einfach
6. **Gute-Nacht-Geschichte** — emotional, runder Abschluss
7. **Sofort-Schatzsuche Abo** — recurring revenue, braucht Rätsel nach Maß als Basis
8. **Rest** — KI-Spielmoderation, Danke-Nachrichten, Eltern-Copilot
