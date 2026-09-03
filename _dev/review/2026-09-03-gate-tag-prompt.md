# Prüfauftrag 03.09.2026 — Tagesarbeit vor dem Deploy

Reviewer: frischer claude.ai-Tab, stärkstes Modell auf Max, target-blind.
Gedächtnis-Pflicht: `_dev/OFFENE-REVIEW-PUNKTE.md` (bereits widerlegte Befunde) und
`_dev/LEKTIONEN.md` (L38/L39) gehören in den Prompt — wer einen Befund meldet, der dort
als WIDERLEGT steht, kostet eine Runde.

Diff: `_dev/review/2026-09-03-gate-tag-diff.md`, als raw-SHA-URL an den Reviewer.

## Winkel-Katalog (nummeriert, jeder einzeln zu beantworten)

1. **Datums-Vertrag core vs. legacy.** `spiele/core/core.js` formatiert ab jetzt nur noch
   strenges `JJJJ-MM-TT` selbst. `netlify/functions/serve-invite.mjs` gibt core ISO und
   legacy fertigen deutschen Text. Rechne nach: gibt es eine Eingabe, bei der ein Nutzer
   jetzt schlechter dasteht als vorher? Insbesondere alte Kurzlinks mit Freitext.
2. **Der eigene Kalender in `serve-invite.mjs`.** Wochentag und Monat werden aus eigenen
   Arrays gebildet, mit `getUTC*`. Prüfe auf Zeitzonen- und Schaltjahrfehler; nenne ein
   Datum, an dem es kippt, oder bestätige, dass es keins gibt.
3. **`type="date"` im Creator.** Was passiert mit Nutzern, die vorher Freitext getippt
   haben? Mit `?datum=`-Vorbelegung? Auf iOS/Android? Ist `required` noch erfüllbar?
4. **Interne Verlinkung `/schnitzeljagd`.** Sieben Links wurden umgehängt, eine Karte zeigte
   über eine 301 auf die eigene Seite. Diffe die sichtbaren Krümelpfade gegen das JSON-LD
   der beiden Kinderseiten — stimmen sie jetzt überein, und ist der neue Elternteil der
   richtige? `schnitzeljagd.html` wurde gelöscht: prüfe, ob dadurch eine URL 404 wird.
5. **Vorschaubilder.** 21 fehlende Bilder wurden ersetzt. Ist die Zuordnung inhaltlich
   ehrlich (ein Detektiv-Bild auf einer Detektiv-Seite, `og-default` sonst)? Wo ist
   `og-default.png` ein sichtbarer Rückschritt gegenüber „kaputt"? Prüfe auch, ob
   `favicon-192x192.png` als `publisher.logo` den schema.org-Anforderungen genügt
   (Mindestgröße, Seitenverhältnis).
6. **Cache-Buster.** Recherchiere, ob `?v=JJJJMMTT` gegenüber Netlify/Cloudflare überhaupt
   das tut, was der Commit behauptet — oder ob eine Ebene davor den alten Stand hält.
7. **Spielbarkeit/Verständlichkeit.** Ändert sich für ein Kind zwischen 4 und 9 etwas an
   dem, was es auf einer Einladung sieht? Kapiert es die Seite in fünf Sekunden ohne
   Erklärung? (Der Datumswechsel ist sichtbar: „Samstag, 12. September" statt „Mittwoch".)
8. **Was fehlt?** Welche Datei hätte mitgeändert werden müssen und wurde es nicht?

## Pflichten des Reviewers

- Wörtliches Zitat je Befund, mit Datei und Zeile.
- Einstufung MAJOR / MINOR / UNSICHER.
- Verifikations-Verben: nachrechnen, recherchieren, diffen — nicht „wirkt plausibel".
- Score 0–100 nur als Telemetrie; er entscheidet nichts.
