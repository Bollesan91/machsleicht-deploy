# Paket-Maschine

Ein Renderer, N Manifeste — statt N Kopien desselben Renderers.

## Warum

Am 04.08.2026 kostete jede Renderer-Korrektur fünf Dateiänderungen. Vier solcher
Korrekturen an einem Tag ergaben zwanzig Edits, wo vier gereicht hätten. Bei den
geplanten fünfzehn Mottos wären es sechzig.

Teurer als die Tipparbeit war die Fehlerklasse dahinter. Baustelle und
Meerjungfrau entstanden als Kopie von Feuerwehr und erbten dabei nicht nur die
Korrekturen, sondern auch die ungefixten Defekte: die Demo-Rollen eines fremden
Mottos, das Wort „Rettungsmission", ein Stations-QR, der die Rätsel-Lösung an
das Kind auslieferte.

Und was keiner Kopie auffiel: `optOutNote`, `indoorTip`, `outdoorTip`,
`ageAdjust5/9/12` und `rolesList` lagen fertig in den Daten und wurden von
keinem Renderer gelesen. Über 1500 vorbereitete Inhalte, unsichtbar in einem
Produkt, für das Eltern zahlen.

## Was die Maschine dagegen tut

- **Ein Renderer.** Eine Korrektur wirkt überall, sofort.
- **Demo-Daten aus dem Manifest abgeleitet.** Ein Motto kann keine Rolle
  vorführen, die es nicht kennt — der Fehler wird strukturell unmöglich statt
  nur unwahrscheinlich.
- **Prüfungen beim Bauen statt danach:** Rollen gegen `party-worker.js`,
  Spiel-IDs gegen `IND_GAMES`, Kontraste gegen AA, keine Fremdmotto-Wörter.
- **Feld-gegen-Renderer-Abgleich.** Liegt ein Feld in den Daten, das kein
  Renderer liest, meldet der Generator es beim ersten Lauf.

## Was sie NICHT tut

Sie repariert keine Inhalte. Überfüllte Zeitpläne, unlösbare Rätsel,
Sicherheitswarnungen an der falschen Stelle — die stehen in `data/motto/*.json`
und bleiben davon unberührt. Die Maschine baut sauberere Pakete um dieselben
Inhalte herum.

## Stand

- **Stufe 1 (erledigt):** Manifeste mechanisch aus den fünf bestehenden Paketen
  extrahiert, nicht erfunden. `_dev/scripts/paket-manifest-extrahieren.py`
- **Stufe 2 (offen):** Template mit Platzhaltern, Generator, und der Beweis:
  Regenerierte Pakete müssen mit den heutigen identisch sein — bis auf die drei
  Signet-Funktionsnamen, die auf ihre Rolle normiert werden.

## Ein Fund aus Stufe 1

Die fünf Pakete sind keine Familie. Dieselben drei Signets heißen dreimal
anders:

| Rolle | piraten | dino | feuerwehr |
|---|---|---|---|
| Blatt-Signet | `compassSvg` | `footprintSvg` | `helmSvg` |
| Urkunden-Siegel | `sealSvg` | `fossilSealSvg` | `abzeichenSvg` |
| Titelbild | `shipCoverSvg` | `jungleCoverSvg` | `wacheCoverSvg` |

Das Manifest benennt sie nach Rolle: `signet`, `siegel`, `cover`.
