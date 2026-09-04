# Stufe-2-Prompt: ritter-Ablauf (Stand dfa4aafb)

> Bereit zum Einfügen in einen **frischen** claude.ai-Tab, stärkstes Modell auf Max, target-blind.
> Chrome-MCP war beim Erstellen nicht erreichbar — deshalb liegt der Prompt hier statt schon
> gelaufen zu sein. Sobald die Verbindung steht, wird er unverändert abgeschickt.

---

Du bist Gutachter für eine deutschsprachige Ratgeberseite zum Thema Kindergeburtstag. Du bewertest **eine einzelne Ergänzung**, nicht die ganze Seite. Sei scharf: die Vorrunden dieses Projekts haben zehnmal in Folge einen Folgefehler im Fix der jeweiligen Vorrunde gefunden.

REIHENFOLGE: zuerst Urteil GO/NO-GO und Blockerliste, dann die Details, Score zuletzt.

## Das Produkt

machsleicht.de hilft Eltern, einen Kindergeburtstag zu planen. Die Seite `/kindergeburtstag/ritter` ist eine von 15 Motto-Seiten: Spielideen nach Alter (3–5, 6–8, 9–12), Deko, Kuchen, Material, Sicherheit, FAQ. Zielgruppe ist ein Elternteil, das in drei Wochen 8 Kinder im Wohnzimmer hat und wissen will, was es tun soll.

## Der Befund, der zu dieser Änderung führte

14 von 15 Motto-Seiten tragen **„Ablauf"** im Titel. Genau **eine** (`pferde`) liefert einen. Die übrigen verweisen für den Zeitplan auf ein kostenloses Planer-Tool. Ein Titel, der etwas verspricht und es nicht liefert, ist ein Muster — und es steht auf 14 Seiten gleichzeitig.

## Was diese Änderung tut

`ritter` bekommt einen **Beispiel-Ablauf (2,5 Stunden)** mit acht Blöcken, in **relativen** Zeiten (`0:00–0:15`) statt Uhrzeiten. Er ist von Hand geschrieben und ausschließlich aus Elementen gebaut, die schon vorher auf der Seite standen. Dazu: ein versprengter Begriff vereinheitlicht („Knappen-Brief" → „Knappen-Heft").

## Zu lesen (öffentliches Repo, bitte selbst holen)

- **Diff dieser Änderung:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/dfa4aafb84512333ab7b95e9320acad82852eea6/_dev/review/2026-09-01-ritter-ablauf.diff
- **Die Seite komplett:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/dfa4aafb84512333ab7b95e9320acad82852eea6/kindergeburtstag/ritter.html
- **Die Vorlage, an der ich mich orientiert habe:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/dfa4aafb84512333ab7b95e9320acad82852eea6/kindergeburtstag/pferde.html
- **Bewusste Entscheide, bitte respektieren:** https://raw.githubusercontent.com/Bollesan91/machsleicht-deploy/dfa4aafb84512333ab7b95e9320acad82852eea6/_dev/OFFENE-REVIEW-PUNKTE.md

## Dein Auftrag

**A — Deckt der Ablauf, was die Seite sagt?** Geh ihn Block für Block gegen den Rest der Seite durch. Jedes genannte Material, jede Station, jeder Begriff muss oben belegt sein. Erfindet der Ablauf irgendwo etwas, das die Seite nicht hergibt? Widerspricht er einer Altersangabe, einer Sicherheitsregel oder einer Mengenangabe?

**B — Stimmt die Zeitrechnung?** Rechne die Blöcke zusammen. Passen sie in 2,5 Stunden? Sind die Einzelzeiten realistisch für die genannte Altersspanne — 30 Minuten Basteln mit Dreijährigen, 25 Minuten Quiz im Sitzen? Der Schlussabsatz macht Anpassungsvorschläge für 3–5 und ab 6; gehen die auf, wenn man sie tatsächlich einsetzt?

**C — Ist es ein Ablauf oder eine Aufzählung?** Ein Zeitplan taugt nur, wenn die Reihenfolge begründet ist: Toben vor Ruhe, Essen vor dem Höhepunkt, Sicherheitsbriefing vor der Ausgabe der Ausrüstung. Wo ist die Reihenfolge willkürlich? Was würde ein Elternteil an dieser Stelle vermissen — Aufräumzeit, Klopausen, Puffer, Was-wenn-es-regnet?

**D — Der Sicherheitsblock hat einen eigenen Zeitslot bekommen (0:45–0:50).** Ist das die richtige Stelle? Reichen fünf Minuten? Fehlt etwas, das vor dem ersten Spiel statt vor dem zweiten gehört?

**E — Sprache.** Für Eltern geschrieben, nicht für Kinder. Zu viel Ton? Zu wenig? Unklare Stellen? Wo müsste man zweimal lesen?

**F — Und die Gegenfrage:** Ist diese Ergänzung überhaupt richtig? Gibt es ein Argument dafür, den Ablauf NICHT auf die Seite zu nehmen und stattdessen das Versprechen aus dem Titel zu streichen? Wenn ja, welches — und was wiegt schwerer?

## Ausgabe

Urteil, dann je Finding: wörtliches Zitat, Schweregrad (MAJOR/MINOR/UNSICHER), konkrete Begründung, Vorschlag. Zum Schluss, was du nachgerechnet hast und in Ordnung war. Dann Score 0–100.

Stilentscheide des Betreibers, keine Findings: Possessiv-Apostroph in der Marke (Lina's; bei Zischlaut-Endung nur Apostroph: Mats'), maskulines Framing in Kindertexten, Affiliate-Blöcke.
