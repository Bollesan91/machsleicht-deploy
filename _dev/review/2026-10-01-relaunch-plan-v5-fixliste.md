# Fixliste Plan v5 → v6 (Stufe 3, Koordinator, 01.10.2026)

Grundlage: Diff-Re-Check v4→v5 (drei frische Verifizierer, 51 Prüfpunkte, 30 OK, 21 Meldungen, 2 MAJOR-Meldungen). Nach Dedupe: **2 MAJOR und 12 MINOR**. Alle 18 Fixes aus v4→v5 sind im Text angekommen; die Cluster-Reihenfolge S10 → S11 → S12 → S22 → S45 (7) ist in allen fünf Belegen konsistent. Die beiden MAJORs sind Beleg-Wortlaute, keine Plan-Logik. Repo-Fakten vom Koordinator nachgemessen (`git show acebbc22:` / `git grep`). Nummern J1–J14.

## MAJOR

| Nr | Planstellen | Verifiziert | Anweisung für v6 |
|---|---|---|---|
| J1 (H1) | S11 Tun Satz 1, S11 Beleg, S12 Tun/Artefakt, S22 Kopf | Klasse 15 (1 + 65 Zeilen) steht mit Erwartung im Sweep-Log, wird in S11 nicht ersetzt → Zeile 66 \| 66 \| 0 verletzt „alle drei Zahlen je Zeile gleich"; S11 Tun Satz 1 sagt weiter „(a) muss nach dem Sweep 0 sein"; S12 nennt die Aufhebung der Ausnahme nicht als Handlung; S22 hängt formal nur an S11. | S11 Tun Satz 1: „(a) … muss nach dem Sweep bis auf Klasse 15 0 sein, Rest in S12". S11 Beleg: „alle drei Zahlen je Zeile gleich — Ausnahme Klasse 15 in S11: erwartet = gefunden (1 + 65), ersetzt = 0, Abschluss in S12". S12 Tun ergänzen: „befristete Ausnahme (Klasse 15) aus Stufe 73 in `validate-all.sh` entfernen"; S12 Artefakt: „… und `validate-all.sh` (Stufe 73 ohne Ausnahme)". S22 Kopf: „Hängt ab von: S11, S12 (Klasse 15 geschlossen)". |
| J2 (H15) | S11, S15, S23, S24, S25, S43 | `pruefstand.py` filtert `--gruppe` exakt und `--fall` als Teilstring im Fallnamen; v5 registriert nur die fünf S22-Fälle mit Gruppe und Namen. Ohne Gruppe/Namen liefert der S22-Beleg 5/5 statt 6/6, und `--gruppe stufe73-76` erfasst die 74/75/76-Fälle nicht (grep „stufe74\|stufe75\|stufe76" in v5 = 0). | S11 Tun: „Fall in `_dev/pruefstand/faelle_stufe73-76.py` (Datei entsteht hier), `gruppe="stufe73-76"`, Name `stufe73-sweep`"; S15: Name `stufe74-noindex`; S25: `stufe74-csp`; S23: `stufe75-ueberlappung`; S24: `stufe76-massenaenderung` — je „in derselben Datei, `gruppe="stufe73-76"`"; S43 Tun: „alle zehn Fälle liegen in dieser Datei mit `gruppe="stufe73-76"` und Namen `stufe7X-…`". |

## MINOR

| Nr | Planstellen | Anweisung für v6 |
|---|---|---|
| J3 (H2-F1) | S11 Klassen (2), (13), Beleg (b) | (2) und (13): „alle Vorkommen der Datei(en) laut Inventar — auch Marke in Kommentaren, Bannern, Docstrings, README". Beleg: „(b) nach dem Sweep = 0 Zeilen aus dem Inventar; verbleibende Treffer nur im in S11 neu geschriebenen Stufe-73-Code (Zahl notiert)". |
| J4 (K1) | S10 Übernahmeliste, S11 (14) | S10 „Nicht übernehmen: … `js/index.js`, `js/baby.js`, `js/einschulung.js` (Klasse-C-Werkzeuge, 0.2)"; S11 (14): „`js/index.js`, `js/baby.js`, `js/einschulung.js` kommen nicht mit — Inventar 0; `js/motto-data.js` 0 Treffer". (Alt-Stand: baby.js 4, einschulung.js 3, motto-data.js 0 Zeilen.) |
| J5 (K2) | S11 Klasse (6) | Zahlen aus dem Kommando: 23 Dateien mit `party.machsleicht.de` (nicht 28), 43 mit `tag=machsleicht21-21`, 37 Dateien mit Marken- oder Alt-Seiten-Nennung in Prosa und WhatsApp-Texten (59 Zeilen, auch URL-kodiert `https%3A%2F%2Fmachsleicht.de…`, Alt-Tag `machsleicht-21`) → drei Muster; Alt-Seiten-Links durch neue Werkzeug-Pfade ersetzen oder Satz streichen. |
| J6 (K3) | S11 Klassen (4), (9), (10), (12) | Je Klasse „alle Vorkommen laut Inventar — Footer, Kommentare, ogimg-URL, Umgebungsvariable `MACHSLEICHT_WORKER`, Tag-Regex, Fixtures, Assertions"; (12) um `gen-ablauf.mjs` (Bau-Skript, 1 Zeile) ergänzen; `check-partyseite-render.mjs` Z. 447 Assertion → `https://<neu>/planen/`. |
| J7 (K4) | S10, S11 (b), Klasse (16) | S10: „`_dev/prototypes/raketen-trailer/` (Quelle `draft e2f1d63a`, 43 Dateien, 23 mit Alt-Host) nur bei E14"; S11: Umfang (b) um `_dev/prototypes/raketen-trailer/` erweitern, Klasse (16) „Trailer-Drehbücher und core.js: Wasserzeichen und Hosts, Erwartung aus dem Inventar, nur bei E14". |
| J8 (H7) | S45 Artefakt, S42 Artefakt | S45 Artefakt: „ebenso `_dev/messungen/2026-11-XX-prelaunch-crawl.md` (S42) und das E2E-Protokoll des Go-Tags (S45 (5)): beide bleiben bis S46 uncommittet und gehen mit der Go-Datei nach S46 auf `main`"; S42 Artefakt: „Commit: siehe S45 Artefakt". |
| J9 (H9) | S26 Kopf, S25 Beleg (2) | S26 Kopf: „Hängt ab von: S21–S24, S25 (1)"; S25 Beleg (2): Shell-Messungen (`/planen/ritter/`, `/planen/ritter/6-8/`) „nach S31/S32", die Allowlist-Schleife „in S42 (1)" (letzte Allowlist-Seite entsteht in S37/S38). |
| J10 (H14) | G-Fußnote | „… die Gate-Zeilen 2/2027, 5/2027, 8/2027 und die Phase-6-Zeile 3/2027 ff. nennen nur den Zusatz der Lesung bzw. des Zyklus; S53 (0,33/0,33) kommt je Woche dazu". |
| J11 (H17) | S12 Tun, Protokoll H17 | „15 URL-Zeilen (17 Vorkommen, Z. 545 dreifach) — Ableitung 20 − 3 − 1 − 1 = 15"; Protokollzeile H17 angleichen. |
| J12 (H18) | S42 Beleg | Spalten: „Playwright (360×800 ohne Querscroll; Demo-iframes)" und „Crawl (0×404, Inlinks ≥ 2, Titles/Descriptions unique, alt, 0 verwaist)"; Zahl 9 bleibt. |
| J13 (H5) | S10 | „Zeilen 73 und 74 tragen den Alt-Host, Zeile 19 die Marke im Dateinamen; alle drei werden nicht übernommen". |
| J14 (Protokoll) | Protokoll v4 → v5 | Folgeänderungen v5, Spalte Stelle: „S46 Tun und Beleg"; H1 Stelle: „…, S12 Kopf und Beleg, S45 (7)". |

**Vorgehen für v6:** Kopie von v5 als `2026-10-01-relaunch-plan-v6.md`; nur J1–J14; Folgestellen per grep; Protokoll „Änderungsprotokoll v5 → v6" (14 J-Zeilen + Folgeänderungen v6); H neu abhaken; v6 nach der Fertigmeldung nicht mehr anfassen.
