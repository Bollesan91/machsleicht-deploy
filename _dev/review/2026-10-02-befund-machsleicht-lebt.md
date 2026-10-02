# Befund 02.10.2026: machsleicht ist nicht tot, nur bei Google unsichtbar

Gemessen am 02.10.2026 in Umami, in der Resend-Zustellung, im KV des alten Workers und an den Live-Seiten. Der Befund widerspricht der Grundannahme, auf der der Relaunch-Plan v10 steht, und gehoert deshalb vor die naechste Entscheidung.

## 1. Es gibt Verkehr, und zwar erheblich

Umami, Website `machsleicht`, 24.04.–02.10.2026:

| Mass | Wert |
|---|---|
| Besucher | 2.500 |
| Besuche | 3.010 |
| Seitenaufrufe | 5.540 |
| Absprungrate | 63 % |
| Verweildauer | 2 min 11 s |

In den letzten 90 Tagen: 6.163 Ereignisse in 1.641 Sitzungen.

## 2. Der Verkehr kommt von Bing und Instagram, nicht von Google

| Quelle | Besucher | Anteil |
|---|---|---|
| bing.com | 425 | 31 % |
| l.instagram.com | 298 | 22 % |
| duckduckgo.com | 277 | 20 % |
| ecosia.org | 273 | 20 % |
| de.search.yahoo.com | 35 | 3 % |
| chatgpt.com | 25 | 2 % |
| google.com | 10 | 1 % |

DuckDuckGo, Ecosia, Yahoo und Startpage beziehen ihren Index von Bing. Zusammen mit Bing selbst sind das rund drei Viertel des Verkehrs aus einer Quelle, die die Seite normal indexiert. Bolle hat **kein** Instagram-Konto; `l.instagram.com` heisst nur, dass jemand den Link innerhalb von Instagram angetippt hat. Wer ihn dort gepostet hat, laesst sich aus Umami nicht beantworten (der Referrer-Filter der Oberflaeche liefert fuer `l.instagram.com` durchgehend Null — Fehler ihrer Oberflaeche, nicht der Daten).

## 3. Es sind keine Bots

Sitzungen der letzten 90 Tage nach Herkunft, „mit Interaktion" heisst mindestens ein eigenes Ereignis (nicht nur Seitenaufruf):

| Herkunft | Sitzungen | mit Interaktion | eine Seite, keine Interaktion |
|---|---|---|---|
| Deutschland | 1.404 | 496 (35 %) | 762 (54 %) |
| Oesterreich/Schweiz | 125 | 52 (42 %) | 63 (50 %) |
| sonstige | 77 | 24 (31 %) | 46 (60 %) |
| USA | 35 | 0 (0 %) | 34 (97 %) |

Das Bot-Muster existiert, aber es sind neun Sitzungen im Monat aus den USA, alle ohne Interaktion. Die 21 % USA aus der Gesamtuebersicht stammen aus der Zeit vor Juli.

Ereignisse der letzten 90 Tage: Planer-Schritt 836, Handlungsknopf 220, Studio geoeffnet 212, Spiel-Vorschau 183, **fertiger Plan 174**, Paket angesehen 146, Partyseite angesehen 110. Dazu Kopieren des Einladungstexts und Wiederherstellen eines gespeicherten Plans beim zweiten Besuch.

Harter Beleg ausserhalb von Umami: im KV des alten Workers liegen 12 Partyseiten, 4 gespeicherte Plaene (davon 3 von zwei fremden Leuten bei uni-jena.de und bruch-knauf.de), 12 Wartelisten-Eintragungen (10 extern: Gmail, Mail.de, Uni Jena, Web.de, Outlook, Yahoo). Resend zeigt die Mails an diese Adressen als zugestellt.

## 4. Die Seiten sind heute technisch sauber

13 der meistbesuchten Live-Seiten geprueft: alle 200, alle mit Self-Canonical, keine mit Fremd-Canonical, robots.txt sperrt nur interne Ordner, kein `X-Robots-Tag` auf den indexierbaren Seiten, Sitemap mit 136 URLs. Der Schaden vom April (198 Fremd-Canonicals, 138 Einzelalter-301) ist repariert.

**Und trotzdem steht Google seit fuenf Monaten bei einer indexierten Seite.** Saubere Technik, eingereichte Sitemap, 58 Indexierungsantraege, drei Validierungen, keine Erholung. Das ist kein Crawling-Problem, sondern eine Bewertung.

## 5. Was Google wahrscheinlich bewertet (Hypothese, nicht belegt)

Die 136 Sitemap-URLs nach Art:

| Art | Anzahl | Anteil |
|---|---|---|
| Motto × Alter, aus der Datentabelle erzeugt | 45 | 33 % |
| Einladungs-Hubs, aus Daten erzeugt | 33 | 24 % |
| Mottoseiten | 15 | 11 % |
| handgeschriebene Einzelseiten | 39 | 29 % |
| Altersseiten und Schatzsuche-Themen | 4 | 3 % |

**60 % des Index sind aus einer Tabelle erzeugt.** Google nennt das in den eigenen Spam-Richtlinien skalierten Missbrauch von Inhalten, wenn solche Seiten ueber die Schablone hinaus wenig eigenen Wert haben. Bing legt diese Latte sichtbar niedriger. Die Hypothese passt auf alle drei Beobachtungen: saubere Technik, keine Erholung nach der Reparatur, Bing unbeeindruckt. Beweisen laesst sie sich von aussen nicht.

**Entscheidungsrelevant:** unter den zehn meistbesuchten Seiten ist keine einzige dieser Matrix-Seiten. Der Verkehr sitzt auf `/kindergeburtstag` (585), dem Planer (363), der Startseite (260), `/schatzsuche` (176) und `/schnitzeljagd-aufgaben` (172).

## 6. Was das fuer den Relaunch bedeutet

Der Plan v10 ist gegen genau diese Ursache gebaut (keine Matrix, Werkzeug statt Textvolumen, jede Seite handgeschrieben, gemessene Ueberlappungsgrenze). Die Diagnose war also richtig. Falsch war die Annahme, es gaebe nichts zu verlieren.

Drei Punkte, die der Plan nicht abdeckt:

1. **Der Umzug kostet die funktionierende Haelfte.** <neu> startet bei Bing, DuckDuckGo und Ecosia genauso bei null wie bei Google. Ohne Weiterleitung — die der Plan verbietet — verliert die neue Marke drei Viertel der heutigen Besucherquelle.
2. **Zwei Seiten konkurrieren bei Bing** um dieselben Anfragen, solange machsleicht.de dort rankt und <neu> dieselben Themen neu schreibt.
3. **Instagram haengt an der Marke, nicht an der Domain.** Das ist der einzige Kanal, der einen Umzug ueberleben koennte, wenn er aktiv mitgenommen wird.

**Dritter Weg, bisher nicht betrachtet:** auf machsleicht.de die 82 erzeugten Seiten entfernen und nur Werkzeug plus handgeschriebene Seiten stehen lassen. Das greift die wahrscheinlichste Ursache an, kostet nach diesen Zahlen kaum Verkehr, laesst Bing und Instagram unberuehrt, und der Umzug bliebe als Rueckfallebene, falls Google in zwei Monaten nicht reagiert. Entscheidung liegt bei Bolle, offen seit 02.10.2026.
