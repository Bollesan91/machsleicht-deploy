# Prüfauftrag — Funnel-Umsetzung 07.09.2026

**Für den Reviewer:** frischer claude.ai-Tab, stärkstes Modell auf Max, target-blind.
Du bekommst das Produkt und den Vertrag beschrieben — **keine Diff-Archäologie, kein Vor-Score.**

## Pflicht-Anhang, vor dem Lesen der Aufgabe

Diese beiden Dateien sind Teil des Auftrags. Findings, die dort bereits verworfen sind,
gelten als False Positive und dürfen nicht erneut gemeldet werden:

- `OFFENE-REVIEW-PUNKTE.md` (Repo-Root)
- `_dev/OFFENE-REVIEW-PUNKTE.md`

Besonders relevant hier: **maskulines generisches Framing ist eine bewusste Entscheidung**
(Bolle 06.07.) — gemeldet werden darf nur ein Pronomen, das auf ein **konkret benanntes Kind**
zeigt. Das Namens-Tor der Gästeseite ist ausdrücklich dekorativ. Die E-Mail-Pflicht bei der
Aktivierung ist gesetzt (Bolle 13.07.).

## Was geprüft werden soll

Der Kindergeburtstags-Planer auf `machsleicht.de/kindergeburtstag` (Branch `draft`, Commits
`baaf3680` bis `a96fc8c6`). Er führt Eltern in fünf Schritten vom Motto zum fertigen Plan mit
Einladung und Partyseite. Am 04.–07.09. wurde er in zwei Runden getestet und danach umgebaut.

**Der Vertrag, gegen den du prüfen sollst:**

1. **Eine Altersfrage.** Der Planer fragt das Alter des Geburtstagskindes als **Zahl** ab und
   leitet daraus die Altersgruppe (3–5 / 6–8 / 9–12) ab. Die Gruppe steuert Spielauswahl,
   Tagesplan-Zeiten, die Variante des Komplettpakets und das, was auf der Partyseite landet.
   **Sie darf nie leer bleiben und nie zu einem anderen Alter gehören als der eingegebenen Zahl.**
2. **Drei Pflichtangaben.** Bis zur fertigen Partyseite verlangt das Produkt genau drei Dinge:
   wer einlädt, eine E-Mail (für den Verwaltungs-Link) und ein Datum. Alles andere ist optional
   und später über den Verwaltungs-Link nachpflegbar.
3. **Kein Versprechen ohne Maschine.** Was der sichtbare Text zusagt, muss tatsächlich passieren.
4. **Keine Verbindung zu Dritten.** Beim Aufruf einer Seite darf keine Anfrage an einen fremden
   Server gehen, den die Datenschutzerklärung nicht nennt.
5. **Der Weg gehört dem Handy.** Gemessen wird auf 375×812 Pixeln, mit dem Daumen.

## Nummerierter Winkel-Katalog

1. **Alters-Ableitung.** Trag nacheinander 3, 5, 6, 8, 9 und 12 ein. Prüfe für **jede** Zahl,
   ob die angezeigte Gruppe, die Tagesplan-Zeiten und die vorgeschlagenen Spiele zusammenpassen.
   **Rechne nach**, ob ein Neunjähriger andere Spiele bekommt als ein Sechsjähriger.
   Trag danach eine ungültige Zahl ein (0, 15, leer) — was passiert?
2. **Alterswechsel — zieht der Plan wirklich neu?** Stell 8 Jahre ein, sieh dir den Plan an,
   wechsle auf 9. **Ändern sich die vorgeschlagenen Spiele UND die Variante des Komplettpakets,
   oder bleibt der Plan derselbe?** Nenne drei konkrete Unterschiede — oder stell ausdrücklich
   fest, dass es keine gibt. *Hier entstünde der teuerste stille Fehler: ein Neunjähriger mit
   dem Programm für Sechsjährige, ohne dass irgendwo etwas rot wird.*
   Wähle danach ein Spiel ab und wechsle erneut das Alter: bleiben Abwahlen aus der alten
   Altersstufe stehen?
3. **Der eingeklappte Bereich.** Aktiviere die Partyseite, ohne „Mehr anpassen" zu öffnen.
   Kommt eine Partyseite zustande? Trag dann eine **ungültige Telefonnummer** in den
   eingeklappten Bereich ein und aktiviere erneut — **siehst du das Feld, auf das sich die
   Fehlermeldung bezieht?**
4. **Pflicht vs. optional.** Prüfe am ausgelieferten Code, welche Felder `activatePartyseite()`
   wirklich verlangt, und vergleiche mit dem, was die Oberfläche sichtbar fordert.
5. **Der geteilte Text.** Erzeuge eine Einladung für ein Mädchen (z.B. „Mia", 7) mit Motto
   Piraten und einmal Weltraum. **Zitiere den WhatsApp-Text wörtlich.** Stimmt jede Aussage
   darin — Wochentag, Datum, Ort, Anrede?
6. **Der Ortshinweis.** Trag bei „Wo ungefähr?" einen Satz ein. Erscheint er in der Einladung,
   auf der Partyseite und im Einladungsspiel — oder nur an manchen Stellen?
7. **Zahlen.** Such im Plan nach jeder Zahl mit Nachkommastelle (Kosten pro Kind, Mengen).
   Deutsche Schreibweise?
8. **Handy-Ansicht.** Wie viele Bildschirmhöhen füllt die Motto-Auswahl? Wie viele Kacheln
   siehst du gleichzeitig? Wie viele Wörter stehen zwischen dem Seitenanfang und der ersten
   Handlung?
9. **Versprechen gegen Maschine.** Sammle **jede** Zusage im sichtbaren Text („wir schicken
   dir…", „Erinnerung…", „automatisch…") und prüfe für jede einzeln, welcher Code sie einlöst.
   *Hinweis: drei bekannte Fälle sind dokumentiert und werden gerade gebaut — melde sie, aber
   markiere sie als bekannt.*
10. **Fremde Verbindungen.** Öffne den Planer und die Datenschutzerklärung und prüfe die
    Netzwerkanfragen. Geht eine Anfrage an einen Server, den die Datenschutzerklärung nicht
    nennt? Umgekehrt: nennt die Erklärung etwas, das gar nicht mehr passiert?
11. **Der virale Knopf.** Öffne eine Gästeseite, scroll nach unten zu „Planst du auch bald
    einen Geburtstag?". **Folge dem Link.** Bekommst du, was der Text verspricht?
12. **Rückkehr.** Fang einen Plan an, lade die Seite neu. Was steht im Wiederaufnahme-Banner?
    **Nimm dafür ausdrücklich zwei Namen: einen auf Zischlaut (Mats, Max, Lars) und einen ohne
    (Mia, Lena) — und einmal gar keinen.** Alle drei Fälle müssen stimmen: „Mats' Piraten-Plan",
    „Mias Piraten-Plan", und ohne Namen ein Satz ganz ohne Genitiv. *Mit „Mia" allein sieht man
    den Fehler nicht — er zeigt sich nur bei Zischlaut-Endung.*
13. **Deep-Link.** Ruf den Planer mit `?motto=piraten&alter=9` auf. Kommt das Alter im Feld an,
    passen Gruppe und Plan dazu? Probier auch einen Wert am Rand (1, 14) und einen ungültigen (0).

## Was du liefern sollst

Je Finding: **wörtliches Zitat** der Stelle, Einstufung **MAJOR / MINOR / UNSICHER**, und die
Angabe, wie du es festgestellt hast (welcher Klick, welche Eingabe, welche Messung). Ein
Finding ohne reproduzierbaren Weg ist ein Verdacht, kein Befund.

Am Ende ein Score 0–100 als Telemetrie — er entscheidet nichts und wird nirgends verglichen.

## Grenzen dieses Auftrags

Nicht Gegenstand: der alte Creator auf `party.machsleicht.de` (Stilllegung ist eine offene
Produktentscheidung), `generate-seo-pages.js` (eigenes Ticket seit Mai), und die drei
Versprechen aus Winkel 9, deren Funktionen gerade gebaut werden.

**Zwei Dinge, die dieser Auftrag ausdrücklich NICHT abdeckt — damit niemand sie für geprüft
hält:**
- **Der Bestellweg** (Lemon-Squeezy-Webhook, `netlify/functions/ls-webhook.js`). Er wurde am
  07.09. repariert und fail-closed gehärtet, ist aber im Browser nicht prüfbar: einen
  Webhook-Empfänger kann man nicht anklicken. Braucht einen eigenen, technischen Prüfweg.
- **`paypalMe`** (Gemeinschaftsgeschenk): lässt sich weiterhin nur im alten Creator setzen, im
  Planer gar nicht. Nicht Teil dieser Umsetzung — soll aber nicht dadurch aus dem Blick fallen.
