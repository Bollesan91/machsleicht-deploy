# Gutachten: Quellen-Schicht, Zeitversprechen, Datumsangaben — 62/100

**Reviewer:** frischer claude.ai-Chat `3455d212`, **Opus 5 · Max**, target-blind, 18.08.2026
**Prüfling:** Stand `71e46a9d` · **Prüfauftrag:** `_dev/review/2026-08-18-pruefauftrag-quellen-und-versprechen.md`
**Arbeitsweise des Gutachters:** 43 Befehle, alle 45 Seiten über die Sitemap gezogen, Repo als
Tarball ausgepackt, **die drei Gates und `regeln-drucken.py` lokal ausgeführt** (zweiter Lauf
byte-identisch), die drei Quellen an der Primärquelle nachrecherchiert. Die drei Zahlen des
Prüfauftrags hat er nachgezählt und bestätigt: 45/38/32, 764/140, 85× PLAN mit 10 Minuten.

**Abweichung vom Verfahren:** Der Tab war *frisch*, aber **nicht inkognito** (L21) — die
Erweiterung kann kein Inkognito-Fenster öffnen. Ersatz: ausdrückliche Anweisung im Prompt,
Vorwissen zu ignorieren. Im Lauf ist keine Memory-Zeile aufgetaucht.

---

## Findings mit eigener Stufe-3-Prüfung

| # | Finding | Stufe | Eigene Prüfung |
|---|---|---|---|
| 1.1 | „geweiteter Rachen" steht nicht in 16 CFR 1501.4, sondern im CPSC-Leitfaden; die Norm erklärt die Zoll-Maße für maßgeblich, die Millimeter nur als Bequemlichkeit | MINOR | **bestätigt.** CPSC-Leitfaden schreibt wörtlich „2.25 inches / 57.10 mm long by 1.25 inches / 31.70 mm wide that approximates the size of the fully expanded throat" — die Zahlen stimmen also, die Zuschreibung liegt eine Ebene zu hoch |
| 1.2 | Notfall-Kasten druckt „Stand 2026", verlinkt ist ein GRC-PDF von 2022/2021; ERC-Leitlinien 2025 existieren | MINOR→MAJOR | **bestätigt**, Dateiname trägt `15.08.2022` |
| 1.3 | `kern` wiederholt die Handlungskette verkürzt, **ohne 112** — wer nur den Kasten liest, bekommt eine Kette ohne Notruf | MINOR | **bestätigt.** Der `kern` soll belegen, nicht anleiten |
| 1.4a | `traegt` verspricht „Nüsse, **Popcorn und ganze Trauben**" — auf den beiden verlinkten Seiten kommen Popcorn und Trauben nicht vor | **MAJOR** | **bestätigt.** Die Aussage steht auf einer *anderen* BVKJ-Seite („Kleinkinder beim Essen nicht herumlaufen lassen"), nicht auf der verlinkten |
| 1.4b | Der Freistellungssatz der Quelle fehlt: „gegen **gemahlene** Nüsse bestehen keine Einwände, sofern keine Nussallergie" — dadurch ist der Kasten strenger als seine Quelle | **MAJOR** | **bestätigt.** Genau dieser Satz löst 3.3 auf |
| 1.4c | „Laut BfR jeder zweite Erstickungsunfall" steht so bei BVKJ mit Verweis auf BfR, nicht in der BfR-Mitteilung selbst | MINOR | **bestätigt**, ein Attributions-Hop zu weit |
| 2.1 | Auf **9 Seiten** zündet die Lebensmittel-Quelle ausschließlich über `nuss`/`mandel` in **Allergie-Sätzen** | **MAJOR** | **bestätigt und unabhängig vorher selbst gefunden.** Muster aus L9/L18 (Substring statt Kontext) |
| 2.2 | `knopfzelle` steht im Trigger der Kleinteile-Quelle, obwohl „Knopfzellen-Notfallkette" bewusst unter `_offen` geführt wird | MINOR | **bestätigt** — entschärft dadurch, dass Knopfzelle auf keiner Seite einziger Auslöser ist (selbst nachgezählt: 0 Seiten) |
| 2.3 | Der Renderer liest nur `shop-safe`; die **140 Spielregeln** in `spiel-safe` zählen für die Quellenzuordnung nicht | **MAJOR** | **bestätigt** — Regex-Inspektion, betrifft 140 von 904 gedruckten Regeln |
| 3.1 | Zwei Spüldauern für dasselbe Auge: Einkaufsregel „mindestens 10 Minuten", Spielkarte „sofort 5 Min" | **MAJOR** | **bestätigt:** 5-Min-Variante 5×, 10-Min-Variante 9×; die lockerere steht an der Spielkarte, wo im Ernstfall hingeschaut wird. Quelle: `data/motto/dino-{klein,mittel,gross}.json` |
| 3.2 | `weltraum-9-12`: Regel sagt „Ganze Nüsse … unter **fünf**", Kasten darüber „unter **vier**" | **MAJOR** | **bestätigt**, einzige Fundstelle im Bestand |
| 3.3 | Kasten verbietet Mandeln „auch nicht in Gebäck", die Seite verkauft Marzipankuchen (ritter-3-5); safari-3-5 weicht auf „lieber" auf | **MAJOR** | **bestätigt** durch Zitat auf beiden Seiten |
| 4.1 | Startseite sauber auf 10 vereinheitlicht, alle acht Stellen geprüft, kein Rest im Bestand | kein Finding | bestätigt |
| 4.1b | **Einladungs-Versprechen** widerspricht sich: 2 Minuten (feen-3-5, weltraum-9-12, piraten-9-12) gegen 3 Minuten (einhorn-3-5/9-12, feuerwehr-9-12, meerjungfrau-6-8) | MINOR | offen — dieselbe Klasse, ein Produkt weiter |
| 4.2 | Platzhalter mischt Register: Nachbarn sind Beispielwerte (6 Gäste, zuhause), „Dein Wunschtermin" ist eine Anrede | MINOR | bestätigt |
| 4.3 | `defaultDate()` nutzt `toISOString()` → zwischen 00:00 und 02:00 Ortszeit fällt das Datum einen Tag zurück, der „Samstag" wird zum Freitag | MINOR | plausibel, **selbst nachzufahren** |
| 5.1 | Stufe 53 fängt ihren eigenen Gründungsfall nicht: „In der Regel 5 Minuten oder weniger" rutscht durch (Präposition + drei Wörter Abstand). Weitere Durchrutscher: ausgeschriebene Zahl, „nach 5 Minuten", Zahl ohne Präposition, H1/Subline in getrennten Tags, „300 Sekunden". Zusätzlich: `AUSSCHLUSS` im ±50-Zeichen-Fenster schaltet die Prüfung ab, sobald „Deko" danebensteht | **MAJOR** | **bestätigt** — ausgeführt, nicht gelesen |
| 5.2 | Stufe 50 prüft im Bestand 0 Fundstellen; Durchrutscher: „Samstag, 21. Juni 2026", Wochentag und Datum in getrennten Tags, Datum ohne Jahr, **unmögliches Datum in Regel 2 still verworfen** | MINOR | bestätigt, der `except ValueError: continue` ist ein echter Logikfehler |
| 5.3 | Stufe 54 implementiert die Trigger-Regel **ein zweites Mal**, statt den Renderer zu laden → kann auf Maschinen-Output strukturell nicht failen. **L24, einen Tag alt** | **MAJOR** | **bestätigt.** Die Divergenz existiert bereits: der Renderer fällt bei fehlender `trigger_marke` auf Wort-Trigger zurück, das Gate kehrt vorher zurück |
| 6 | 45 Seiten: `author` = 0, `datePublished` = 0, `dateModified` = 0, kein `Person`/`Organization`/`Article`. `ueber-uns.html` hat all das bereits — eine Datei weiter, nicht verlinkt. „Redaktion machsleicht" ist ungenauer als die Wahrheit | MINOR | bestätigt |
| 7 | Die CPSC-Zeile ist die schwerste im Kasten (drei Zahlenpaare, „Haushaltsnäherung"); Vorschlag: Faustregel zuerst, Norm dahinter | MINOR | bestätigt |
| 8 | Nächste zwei Belege: **Knopfzellen** (auf 17 Seiten steht bereits eine Verätzungs-Aussage mit Zeitfenster, unbelegt; Laienreflex ist falsch) und **Luftballons** (Superlativ ohne Quelle auf meerjungfrau-9-12; normativ belegbar über CPSC 16 CFR 1500.19 + EN 71-1) | Empfehlung | übernommen |

**Was der Gutachter selbst nicht prüfen konnte:** das GRC-PDF (nur über den Suchindex),
ob das BVKJ-Zitat mit Trauben/Popcorn auf einer anderen Seite steht, den Innendurchmesser
einer Klopapierrolle, und die 10-Minuten-Plausibilität am laufenden Wizard.

## Score

**62 / 100.** Begründung des Gutachters: Die Maschine ist richtig gebaut — Idempotenz
nachgewiesen, `_offen` ehrlich geführt, `trigger_marke` statt „gilt überall", Zahlen stimmen.
Der Abzug kommt aus der letzten Meile: Quelle ohne Deckung auf 9 Seiten, Widerspruch
vier/fünf, zwei Spüldauern — und beide neuen Gates fangen ihren eigenen Gründungsfall nicht.
