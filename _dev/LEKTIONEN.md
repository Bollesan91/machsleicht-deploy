# LEKTIONEN — machsleicht.de (Findings-Gedächtnis)

> Pflichtlektüre vor jedem inhaltlichen/Funnel-Output (Helfer V4.1, Stufe 0). Muster aus Review-Wellen, damit sie nicht zweimal passieren. Verworfene False-Positives → `OFFENE-REVIEW-PUNKTE.md`.

## L1 — Wizard-Controls gegen den Worker-Payload-Vertrag prüfen (15.06.2026)
**Befund:** Im Kindergeburtstag-Wizard (`kindergeburtstag.html`) sammelte Stage 4 eine Reihe Bedienelemente ein — Einladungs-Typ, Überschrift/Aufruf-Text/Antwort-Frist, URL-Slug, WhatsApp-Nr, Gästeliste-/Wunschliste-Toggles —, die im `/api/create`-Payload (`party-worker.js`) **gar nicht vorkommen**. Der Worker vergibt eine Zufalls-ID (Slug ignoriert), kennt keine Toggle-Flags und nimmt keine Custom-Texte. → Diese Controls konnten das ausgelieferte Artefakt (die Partyseite) nie beeinflussen: Auswahl-Theater + UWG-Risiko (bepreister „Print-Karten €14,90"-Button ohne Checkout).

**Warum übersehen:** Unit-Reviews (und auch der Stage-4+5-Merge) prüften jedes Teil isoliert. Der Fehler lag **zwischen** Wizard und Worker — kein Review hatte die Wizard-Eingaben gegen den tatsächlichen Worker-Vertrag diffed.

**Regel:** Bei jedem Tool, das Daten an ein Backend schickt, beim Review die UI-Controls **1:1 gegen den echten Request-Payload + die Backend-Verarbeitung** abgleichen. Jedes Control, dessen Wert nicht im Payload landet (oder vom Backend nicht verarbeitet wird), ist entweder Deko (→ ehrlich kennzeichnen/entfernen) oder muss verdrahtet werden. „Erreicht die Eingabe das Artefakt?" ist eine Pflicht-Frage im Funnel-Review-Winkel-Katalog.

**Mechanisierbar (→ Linter, sobald portiert):** onclick-Handler→Funktion-Existenz, goStage/jumpStage-Ziel-Existenz, verwaiste IDs, Default-Werte mit Datum in der Vergangenheit, hartkodierte Fristen/Daten.

## L2 — Reviewer-Modell-Fallback (15.06.2026)
Helfer-V4.1-Stufe-2-Reviewer = frischer claude.ai-Tab, **Fable 5 Hoch**. Wenn Fable 5 „currently unavailable" ist (war es am 15.06.), Fallback = **Opus 4.8 Hoch** (das vorherige dokumentierte Modell). Nie WebFetch, nie Subagents als gate-entscheidender Reviewer.
