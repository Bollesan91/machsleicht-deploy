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

Der Kindergeburtstags-Planer auf `machsleicht.de/kindergeburtstag` (Branch `draft` ab Commit
`2fd73ab3`, Stand = Branchspitze, keine obere Grenze). Er führt Eltern in fünf Schritten vom Motto zum fertigen Plan mit
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
   *Hinweis: drei bekannte Fälle sind gebaut, aber erst nach dem Worker-Deploy live (Grenzen unten) — melde sie, aber
   markiere sie als bekannt.*
10. **Fremde Verbindungen.** Öffne den Planer und die Datenschutzerklärung und prüfe die
    Netzwerkanfragen. Geht eine Anfrage an einen Server, den die Datenschutzerklärung nicht
    nennt? Umgekehrt: nennt die Erklärung etwas, das gar nicht mehr passiert?
11. **Der virale Knopf.** Öffne eine Gästeseite, scroll nach unten zu „Planst du auch bald
    einen Geburtstag?". **Folge dem Link.** Bekommst du, was der Text verspricht?
12. **Rückkehr.** Fang einen Plan an, lade die Seite neu. Was steht im Wiederaufnahme-Banner?
    **Nimm dafür ausdrücklich zwei Namen: einen auf Zischlaut (Mats, Max, Lars) und einen ohne
    (Mia, Lena) — und einmal gar keinen.** Alle drei Fälle müssen stimmen: „Mats’ Piraten-Plan",
    „Mia’s Piraten-Plan", und ohne Namen ein Satz ganz ohne Genitiv. *Mit „Mia" allein sieht man
    nicht, ob der Fall stimmt — das zeigt sich nur bei Zischlaut-Endung. Das ’s bei „Mia" ist die dokumentierte
   Stilentscheidung (poss(): Name’s, bei s/ß/x/z nur der Apostroph — `OFFENE-REVIEW-PUNKTE.md`) und
   kein Finding; der Planer setzt dabei den typografischen Apostroph ’.*
13. **Deep-Link.** Ruf den Planer mit `?motto=piraten&alter=9` auf. Kommt das Alter im Feld an,
    passen Gruppe und Plan dazu? Probier auch einen Wert am Rand (1, 14) und einen ungültigen (0).

14. **Der Plan liest sich zuerst.** Öffne den fertigen Plan. Siehst du Bearbeiten-Knöpfe (▲▼×)
    an den Zeilen, bevor du „Plan anpassen" gedrückt hast? Drück ihn, verschiebe ein Spiel,
    lies die Beschriftung des Knopfes danach — steht dort noch der richtige Zustand?
15. **Editor-Ansicht.** Öffne die Verwaltung einer Party mit mindestens zwei Gästen, einer mit
    Allergie. Wie oft steht dieselbe Zahl „X dabei" auf der Seite? Wo steht „Link teilen" —
    oben oder unten? **Entferne einen Gast: verschwindet genau die Zeile, die du gemeint hast?**
    (Ein „lädt neu" beweist nichts — es passiert auch, wenn still nichts gelöscht wurde.)
16. **Gemeinschaftsgeschenk.** Trag in der Verwaltung ein PayPal-Handle ein, speichere, lade neu.
    Steht es noch da? Erscheint es auf der Gästeseite bei einem „Gemeinsam"-Wunsch?
17. **„Was tun, wenn die Kinder zu wild werden?"** Lies die FAQ-Antwort und prüfe jede darin
    genannte Funktion am Planer nach. Gibt es alles, was dort steht?
18. **Newsletter-Häkchen.** Ist es beim Aktivieren vorangehakt? Was verspricht der Text daneben —
    und **rechne nach**, ob jede Zusage darin von einer Funktion gedeckt ist.
19. **„Später".** Klick oben rechts auf „Später", gib eine Adresse ein. Was sagt die Meldung
    danach — und stimmt sie mit dem überein, was das Modal vorher versprochen hat?
20. **Der fremde Plan** *(nach dem Worker-Deploy)*. Fang auf einem Gerät „Ben, Dino" an. Öffne
    dort einen Magic-Link zu „Mia, Piraten". **Kommt eine Rückfrage — und bleibt Bens Plan
    erhalten, wenn du sie ablehnst?** Öffne danach einen Link zum *selben* Plan (Ben, Dino) —
    kommt dann **keine** Rückfrage? Beides muss stimmen: Randfall geschützt, Normalfall
    ununterbrochen. **Dritter Fall:** fordere den Link an, *bevor* ein Name eingetragen ist, trag
    danach lokal einen Namen ein und öffne den Link auf demselben Gerät — die Rückfrage muss
    kommen (der Link bringt weniger mit, als lokal liegt). **Vierter Fall:** öffne erst
    `?motto=dino`, verlasse die Seite, öffne dann einen fremden Magic-Link — **keine** Rückfrage
    (ein Motto-Klick ist kein Plan; ein Plan zählt erst mit Name oder Datum). **Fünfter Fall:**
    gleicher Name, gleiches Motto, anderes Datum → Rückfrage, und **beide Daten stehen im Text**.

## Was du liefern sollst

Je Finding: **wörtliches Zitat** der Stelle, Einstufung **MAJOR / MINOR / UNSICHER**, und die
Angabe, wie du es festgestellt hast (welcher Klick, welche Eingabe, welche Messung). Ein
Finding ohne reproduzierbaren Weg ist ein Verdacht, kein Befund.

Am Ende ein Score 0–100 als Telemetrie — er entscheidet nichts und wird nirgends verglichen.

## Grenzen dieses Auftrags

Nicht Gegenstand: der alte Creator auf `party.machsleicht.de` (Stilllegung ist eine offene
Produktentscheidung), `generate-seo-pages.js` (eigenes Ticket seit Mai), und die drei
Versprechen aus Winkel 9, deren Funktionen gebaut, aber noch nicht deployt sind.

**Zwei Dinge, die dieser Auftrag ausdrücklich NICHT abdeckt — damit niemand sie für geprüft
hält:**
- **Der Bestellweg** (Lemon-Squeezy-Webhook, `netlify/functions/ls-webhook.js`). Er wurde am
  07.09. repariert und fail-closed gehärtet, ist aber im Browser nicht prüfbar: einen
  Webhook-Empfänger kann man nicht anklicken. Braucht einen eigenen, technischen Prüfweg.
- ~~**`paypalMe`**: nur im alten Creator setzbar~~ — **überholt am 07.09.:** das Feld ist seit
  Commit `9a7697a2` im Editor (Winkel 16 prüft es).

**Drei Bauteile vom 07.09. laufen im Worker und werden erst mit dem nächsten Worker-Deploy
live — im Browser gegen `machsleicht.de` sind sie bis dahin NICHT prüfbar:**
- **Die Umleitung** `party.machsleicht.de/` → Planer (302, `mottoId`→`motto`, `ref` durchgereicht).
- **Die Erinnerungsmail 7 Tage vor der Party** (`scheduled`-Handler, Cron 08:00 UTC). Sie lässt
  sich ohnehin nicht klicken — prüfbar nur über einen manuellen Trigger oder das Worker-Log
  (`reminder7: ziel=… per-index-uebersprungen=… gelesen=… nachgezogen=… gesendet=… fehler=… gecappt=…`).
- **Der Magic-Link** (`/api/plan`): Winkel 19 prüft die Meldung im Planer; ob die Mail ankommt und
  der Link den Stand wiederherstellt, ist erst nach dem Deploy messbar. **Dann bitte:** Plan
  anlegen, „Später" nutzen, auf einem **anderen Gerät** den Link öffnen — steht alles wieder da,
  und überschreibt ein Klick auf „Weitermachen" im Resume-Banner den Stand *nicht*?
